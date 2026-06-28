# Segurança Simples

## 21 Segurança Simples

A JMX API usa protocolos de segurança existentes para proteger suas conexões. Este exemplo fornece uma implementação de segurança simples. O código-fonte contido nesta seção é usado para criar arquivos correspondentes no diretório `examples/` especificado no procedimento de configuração apropriado e inclui:

  * arquivo README
  * Server
  * Client
  * ClientListener
  * access.properties
  * password.properties
  * SimpleStandard
  * SimpleStandardMBean

Para executar o exemplo, um keystore e um truststore também são necessários. Se você ainda não os tem em seu sistema, consulte [comando keytool](<https://docs.oracle.com/en/java/javase/25/docs/specs/man/keytool.html#importing-the-keystore>) e [Customizing the Default Keystores and Truststores, Store Types, and Store Passwords](<https://docs.oracle.com/en/java/javase/18/security/java-secure-socket-extension-jsse-reference-guide.html#GUID-7D9F43B8-AABF-4C5B-93E6-3AFB18B66150>) para obter informações sobre como criar um keystore e um truststore.

### examples/Security/simple/README
```
    # ==============================================================================
    #
    #  Exemplo de um conector RMI seguro.
    #
    #  Este exemplo usa:
    #
    #  - as fábricas de socket RMI SSL para criptografia,
    #  - o autenticador de senha baseado na interface JMXAuthenticator para
    #    autenticação de usuário,
    #  - o controlador de acesso a arquivos baseado na interface MBeanServerForwarder
    #    para autorização de nível de acesso do usuário.
    #
    # ==============================================================================
    #
    # Para compilar e executar o exemplo, faça uma cópia deste arquivo README e
    # então simplesmente copie e cole todos os comandos conforme necessário em uma janela de terminal.
    #
    # Todos os comandos abaixo são definidos usando a sintaxe do shell korn do Unix.
    #
    # Se você não estiver usando Unix e korn shell, espera-se que você seja capaz de
    # adaptar esses comandos ao seu sistema operacional e ambiente de shell favoritos.
    #
    
    # Compilar classes Java
    #
    # * Server.java: cria um MBeanServer e cria e inicia um servidor de conector RMI
    #                seguro (JRMP).
    #
    # * Client.java: cria um conector RMI seguro (JRMP), cria e registra
    #                um MBean padrão Simple e executa operações nele.
    #
    # * ClientListener.java: implementa um listener de notificação genérico.
    #
    # * SimpleStandard.java: implementa o MBean padrão Simple.
    #
    # * SimpleStandardMBean.java: a interface de gerenciamento exposta pelo MBean
    #                             padrão Simple.
    #
    
    javac mbeans/SimpleStandard.java \
          mbeans/SimpleStandardMBean.java \
          server/Server.java \
          client/Client.java \
          client/ClientListener.java
    
    # Iniciar o registro RMI:
    #
    
    export CLASSPATH=server ; rmiregistry 9999 &
    
    # Iniciar o Server:
    #
    
    java -classpath server:mbeans \
         -Djavax.net.ssl.keyStore=config/keystore \
         -Djavax.net.ssl.keyStorePassword=password \
         Server &
    
    # Iniciar o Client:
    #
    
    java -classpath client:server:mbeans \
         -Djavax.net.ssl.trustStore=config/truststore \
         -Djavax.net.ssl.trustStorePassword=trustword \
         Client
    
    # ==============================================================================
    
```

### examples/Security/simple/server/Server.java
```java
    import java.io.File;
    import java.util.HashMap;
    import javax.management.MBeanServer;
    import javax.management.MBeanServerFactory;
    import javax.management.remote.JMXConnectorServer;
    import javax.management.remote.JMXConnectorServerFactory;
    import javax.management.remote.JMXServiceURL;
    import javax.management.remote.rmi.RMIConnectorServer;
    import javax.rmi.ssl.SslRMIClientSocketFactory;
    import javax.rmi.ssl.SslRMIServerSocketFactory;
    
    public class Server {
    
        public static void main(String[] args) {
            try {
                // Instancia o MBean server
                //
                System.out.println("\nCria o MBean server");
                MBeanServer mbs = MBeanServerFactory.createMBeanServer();
    
                // Mapa de ambiente
                //
                System.out.println("\nInicializa o mapa de ambiente");
                HashMap env = new HashMap();
    
                // Fornece fábricas de socket RMI baseadas em SSL.
                //
                SslRMIClientSocketFactory csf = new SslRMIClientSocketFactory();
                SslRMIServerSocketFactory ssf = new SslRMIServerSocketFactory();
                env.put(RMIConnectorServer.RMI_CLIENT_SOCKET_FACTORY_ATTRIBUTE,csf);
                env.put(RMIConnectorServer.RMI_SERVER_SOCKET_FACTORY_ATTRIBUTE,ssf);
    
                // Fornece o arquivo de senha usado pelo servidor do conector para
                // realizar a autenticação do usuário. O arquivo de senha é um arquivo de texto
                // baseado em properties que especifica pares de nome de usuário/senha. Este
                // autenticador de senha baseado em properties foi implementado
                // usando a interface JMXAuthenticator e é passado para o
                // conector através da propriedade "jmx.remote.authenticator"
                // no mapa.
                //
                // Esta propriedade é dependente da implementação e pode não ser
                // suportada por todas as implementações da JMX Remote API.
                //
                env.put("jmx.remote.x.password.file",
                        "config" + File.separator + "password.properties");
    
                // Fornece o arquivo de nível de acesso usado pelo servidor do conector para
                // realizar a autorização do usuário. O arquivo de nível de acesso é um arquivo de texto
                // baseado em properties que especifica pares de nome de usuário/nível de acesso, onde
                // o nível de acesso é "readonly" ou "readwrite" para as operações do MBeanServer.
                // Este verificador de controle de acesso baseado em properties foi implementado
                // usando a interface MBeanServerForwarder, que envolve o MBean server real dentro de um
                // MBean server controlador de acesso que realiza as verificações de controle de acesso
                // antes de encaminhar as requisições para o MBean server real.
                //
                // Esta propriedade é dependente da implementação e pode não ser
                // suportada por todas as implementações da JMX Remote API.
                //
                env.put("jmx.remote.x.access.file",
                        "config" + File.separator + "access.properties");
    
                // Cria um servidor de conector RMI
                //
                System.out.println("\nCria um servidor de conector RMI");
                JMXServiceURL url = new JMXServiceURL(
                  "service:jmx:rmi:///jndi/rmi://localhost:9999/server");
                JMXConnectorServer cs =
                    JMXConnectorServerFactory.newJMXConnectorServer(url, env, mbs);
    
                // Inicia o servidor de conector RMI
                //
                System.out.println("\nInicia o servidor de conector RMI");
                cs.start();
                System.out.println("\nServidor de conector RMI iniciado com sucesso");
                System.out.println("\nAguardando conexões de entrada...");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
    
```

### examples/Security/simple/client/Client.java
```java
    import java.util.HashMap;
    import javax.management.Attribute;
    import javax.management.JMX;
    import javax.management.MBeanServerConnection;
    import javax.management.ObjectName;
    import javax.management.remote.JMXConnector;
    import javax.management.remote.JMXConnectorFactory;
    import javax.management.remote.JMXServiceURL;
    
    public class Client {
    
        public static void main(String[] args) {
            try {
                // Mapa de ambiente
                //
                System.out.println("\nInicializa o mapa de ambiente");
                HashMap env = new HashMap();
    
                // Fornece as credenciais exigidas pelo servidor para realizar
                // a autenticação do usuário com sucesso
                //
                String[] credentials = new String[] { "username" , "password" };
                env.put("jmx.remote.credentials", credentials);
    
                // Cria um cliente de conector RMI e
                // o conecta ao servidor de conector RMI
                //
                System.out.println("\nCria um cliente de conector RMI e " +
                                   "o conecta ao servidor de conector RMI");
                JMXServiceURL url = new JMXServiceURL(
                  "service:jmx:rmi:///jndi/rmi://localhost:9999/server");
                JMXConnector jmxc = JMXConnectorFactory.connect(url, env);
    
                // Obtém uma MBeanServerConnection
                //
                System.out.println("\nObtém uma MBeanServerConnection");
                MBeanServerConnection mbsc = jmxc.getMBeanServerConnection();
    
                // Obtém domínios do MBeanServer
                //
                System.out.println("\nDomínios:");
                String domains[] = mbsc.getDomains();
                for (int i = 0; i < domains.length; i++) {
                    System.out.println("\tDomain[" + i + "] = " + domains[i]);
                }
    
                // Cria o MBean SimpleStandard
                //
                ObjectName mbeanName = new ObjectName("MBeans:type=SimpleStandard");
                System.out.println("\nCria o MBean SimpleStandard...");
                mbsc.createMBean("SimpleStandard", mbeanName, null, null);
    
                // Obtém a contagem de MBeans
                //
                System.out.println("\nContagem de MBeans = " + mbsc.getMBeanCount());
    
                // Obtém o atributo State
                //
                System.out.println("\nState = " +
                                   mbsc.getAttribute(mbeanName, "State"));
    
                // Define o atributo State
                //
                mbsc.setAttribute(mbeanName,
                                  new Attribute("State", "changed state"));
    
                // Obtém o atributo State
                //
                // Outra forma de interagir com um determinado MBean é através de um
                // proxy dedicado em vez de ir diretamente através da conexão do MBean
                // server
                //
                SimpleStandardMBean proxy = JMX.newMBeanProxy(
                        mbsc, mbeanName, SimpleStandardMBean.class);
                System.out.println("\nState = " + proxy.getState());
    
                // Adiciona um listener de notificação no MBean SimpleStandard
                //
                ClientListener listener = new ClientListener();
                System.out.println("\nAdiciona um listener de notificação...");
                mbsc.addNotificationListener(mbeanName, listener, null, null);
    
                // Invoca "reset" no MBean SimpleStandard
                //
                // Chamar "reset" faz com que o MBean SimpleStandard emita uma
                // notificação que será recebida pelo ClientListener registrado.
                //
                System.out.println("\nInvoca reset() no MBean SimpleStandard...");
                mbsc.invoke(mbeanName, "reset", null, null);
    
                // Dorme por 2 segundos para ter tempo de receber a
                // notificação antes de remover o listener de notificação.
                //
                System.out.println("\nAguardando notificação...");
                Thread.sleep(2000);
    
                // Remove o listener de notificação no MBean SimpleStandard
                //
                System.out.println("\nRemove o listener de notificação...");
                mbsc.removeNotificationListener(mbeanName, listener);
    
                // Desregistra o MBean SimpleStandard
                //
                System.out.println("\nDesregistra o MBean SimpleStandard...");
                mbsc.unregisterMBean(mbeanName);
    
                // Fecha a conexão do MBeanServer
                //
                System.out.println("\nFecha a conexão com o servidor");
                jmxc.close();
                System.out.println("\nTchau! Tchau!");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
    
```

### examples/Security/simple/client/ClientListener.java
```java
    import javax.management.Notification;
    import javax.management.NotificationListener;
    
    public class ClientListener implements NotificationListener {
        public void handleNotification(Notification notification, Object handback) {
            System.out.println("\nNotificação recebida: " + notification);
        }
    }
    
```

### examples/Security/simple/config/access.properties
```properties
    # access.properties
    
    # Arquivo de controle de acesso para acesso da JMX Remote API a recursos do MBeanServer.
    # Este arquivo define o acesso permitido para diferentes roles.
    
    # O formato do arquivo de acesso é sintaticamente o mesmo que o
    # formato de arquivo Properties. A sintaxe é descrita na página JavaDoc para
    # java.util.Properties.load.
    
    # Um arquivo de acesso típico tem múltiplas linhas, onde cada linha é em branco,
    # um comentário (como este), ou uma entrada de controle de acesso.
    
    # Uma entrada de controle de acesso consiste em um nome de role e um nível de acesso
    # associado. O nome da role é qualquer string que não contenha espaços ou
    # tabulações. Ele corresponde a uma entrada no arquivo de senha. O nível de acesso
    # é um dos seguintes:
    #
    #       "readonly"  concede acesso para ler atributos de MBeans.
    #                   Para monitoramento, isso significa que um cliente remoto nesta
    #                   role pode ler medições, mas não pode realizar nenhuma ação
    #                   que altere o ambiente do programa em execução.
    #
    #       "readwrite" concede acesso para ler e escrever atributos de MBeans, para
    #                   invocar operações neles e para criá-los ou removê-los.
    #                   Este acesso deve ser concedido apenas a clientes confiáveis,
    #                   já que eles podem potencialmente interferir na operação suave
    #                   de um programa em execução.
    
    # O nível de acesso "readwrite" pode ser opcionalmente seguido pelas palavras-chave "create"
    # e/ou "unregister". A palavra-chave "unregister" concede acesso para
    # desregistrar (excluir) MBeans. A palavra-chave "create" concede acesso para criar
    # MBeans de uma classe específica ou de qualquer classe que corresponda a um padrão específico.
    # O acesso deve ser concedido apenas para criar MBeans de classes conhecidas e confiáveis.
    
    # Uma determinada role deve ter no máximo uma entrada neste arquivo. Se uma role não tiver
    # nenhuma entrada, ela não tem acesso.
    # Se múltiplas entradas forem encontradas para o mesmo nome de role, então a última entrada de
    # acesso é usada.
    
    # Direitos de acesso concedidos à identidade autenticada pelo conector RMI
    # neste exemplo.
    #
    username readwrite \
      create SimpleStandard \
      unregister
    
```

### examples/Security/simple/config/password.properties
```properties
    # password.properties
    
    # Arquivo de senha para autenticação da JMX Remote API. Este arquivo define
    # as diferentes roles e suas senhas.
    
    # O formato do arquivo de senha é sintaticamente o mesmo que
    # o formato de arquivo Properties. A sintaxe é descrita na página JavaDoc
    # para java.util.Properties.load.
    
    # Um arquivo de senha típico tem múltiplas linhas, onde cada linha é em branco,
    # um comentário (como este), ou uma entrada de senha.
    
    # Uma entrada de senha consiste em um nome de role e uma senha associada.
    # O nome da role é qualquer string que não contenha espaços
    # ou tabulações. A senha é novamente qualquer string que não contenha espaços
    # ou tabulações. Note que as senhas aparecem em texto claro neste arquivo, então é
    # uma boa ideia não usar senhas valiosas.
    
    # Uma determinada role deve ter no máximo uma entrada neste arquivo. Se uma role
    # não tiver nenhuma entrada, ela não tem acesso.
    # Se múltiplas entradas forem encontradas para o mesmo nome de role, então a última
    # é usada.
    
    # Em uma instalação típica, este arquivo pode ser lido por qualquer pessoa na
    # máquina local, e possivelmente por pessoas em outras máquinas.
    # Para segurança, você deve restringir o acesso a este arquivo,
    # ou especificar outro arquivo menos acessível no arquivo de configuração de gerenciamento
    # conforme descrito acima.
    
    # Role e senha usadas para autenticação pelo conector RMI neste exemplo.
    #
    username password
    
```

### examples/Security/simple/mbeans/SimpleStandard.java
```java
    /**
     * Definição simples de um MBean padrão, chamado "SimpleStandard".
     *
     * O MBean padrão "SimpleStandard" mostra como expor atributos
     * e operações para gerenciamento, implementando sua interface de gerenciamento
     * "SimpleStandardMBean" correspondente.
     *
     * Este MBean possui dois atributos e uma operação expostos
     * para gerenciamento por um agente JMX:
     *      - o atributo "State" de leitura/escrita,
     *      - o atributo "NbChanges" somente leitura,
     *      - a operação "reset()".
     *
     * Este objeto também possui uma propriedade e um método não expostos
     * para gerenciamento por um agente JMX:
     *      - a propriedade "NbResets",
     *      - o método "getNbResets()".
     */
    
    import javax.management.AttributeChangeNotification;
    import javax.management.MBeanNotificationInfo;
    import javax.management.NotificationBroadcasterSupport;
    
    public class SimpleStandard
        extends NotificationBroadcasterSupport
        implements SimpleStandardMBean {
    
        /*
         * -----------------------------------------------------
         * CONSTRUTORES
         * -----------------------------------------------------
         */
    
        /* "SimpleStandard" não fornece nenhum construtor específico.
         * No entanto, "SimpleStandard" é compatível com JMX em relação aos
         * construtores porque o construtor padrão SimpleStandard()
         * fornecido pelo compilador Java é público.
         */
    
        /*
         * -----------------------------------------------------
         * IMPLEMENTAÇÃO DA INTERFACE SimpleStandardMBean
         * -----------------------------------------------------
         */
    
        /**
         * Getter: obtém o atributo "State" do MBean padrão "SimpleStandard".
         *
         * @return o valor atual do atributo "State".
         */
        public String getState() {
            return state;
        }
    
        /**
         * Setter: define o atributo "State" do MBean padrão "SimpleStandard".
         *
         * @param <VAR>s</VAR> o novo valor do atributo "State".
         */
        public void setState(String s) {
            state = s;
            nbChanges++;
        }
    
        /**
         * Getter: obtém o atributo "NbChanges" do MBean padrão "SimpleStandard".
         *
         * @return o valor atual do atributo "NbChanges".
         */
        public int getNbChanges() {
            return nbChanges;
        }
    
        /**
         * Operação: redefine para seus valores iniciais os atributos "State" e "NbChanges"
         * do MBean padrão "SimpleStandard".
         */
        public void reset() {
            AttributeChangeNotification acn =
                new AttributeChangeNotification(this,
                                                0,
                                                0,
                                                "NbChanges reset",
                                                "NbChanges",
                                                "Integer",
                                                new Integer(nbChanges),
                                                new Integer(0));
            state = "initial state";
            nbChanges = 0;
            nbResets++;
            sendNotification(acn);
        }
    
        /*
         * -----------------------------------------------------
         * MÉTODO NÃO EXPOSTO PARA GERENCIAMENTO POR UM AGENTE JMX
         * -----------------------------------------------------
         */
    
        /**
         * Retorna a propriedade "NbResets".
         * Este método não é um Getter no sentido JMX porque não é
         * exposto na interface "SimpleStandardMBean".
         *
         * @return o valor atual da propriedade "NbResets".
         */
        public int getNbResets() {
            return nbResets;
        }
    
        /**
         * Retorna um array indicando, para cada notificação que este MBean
         * pode enviar, o nome da classe Java da notificação e
         * o tipo de notificação.</p>
         *
         * @return o array de possíveis notificações.
         */
        public MBeanNotificationInfo[] getNotificationInfo() {
            return new MBeanNotificationInfo[] {
                new MBeanNotificationInfo(
                new String[] { AttributeChangeNotification.ATTRIBUTE_CHANGE },
                AttributeChangeNotification.class.getName(),
                "Esta notificação é emitida quando o método reset() é chamado.")
            };
        }
    
        /*
         * -----------------------------------------------------
         * ATRIBUTOS ACESSÍVEIS PARA GERENCIAMENTO POR UM AGENTE JMX
         * -----------------------------------------------------
         */
    
        private String state = "initial state";
        private int nbChanges = 0;
    
        /*
         * -----------------------------------------------------
         * PROPRIEDADE NÃO ACESSÍVEL PARA GERENCIAMENTO POR UM AGENTE JMX
         * -----------------------------------------------------
         */
    
        private int nbResets = 0;
    }
    
```

### examples/Security/simple/mbeans/SimpleStandardMBean.java
```java
    /**
     * Esta é a interface de gerenciamento explicitamente definida para o
     * MBean padrão "SimpleStandard".
     *
     * O MBean padrão "SimpleStandard" implementa esta interface
     * para ser gerenciável através de um agente JMX.
     *
     * A interface "SimpleStandardMBean" mostra como expor para gerenciamento:
     * - um atributo de leitura/escrita (nomeado "State") através de seus métodos getter e setter,
     * - um atributo somente leitura (nomeado "NbChanges") através de seu método getter,
     * - uma operação (nomeada "reset").
     */
    public interface SimpleStandardMBean {
    
        /**
         * Getter: define o atributo "State" do MBean padrão "SimpleStandard".
         *
         * @return o valor atual do atributo "State".
         */
        public String getState();
    
        /**
         * Setter: define o atributo "State" do MBean padrão "SimpleStandard".
         *
         * @param <VAR>s</VAR> o novo valor do atributo "State".
         */
        public void setState(String s);
    
        /**
         * Getter: obtém o atributo "NbChanges" do MBean padrão "SimpleStandard".
         *
         * @return o valor atual do atributo "NbChanges".
         */
        public int getNbChanges();
    
        /**
         * Operação: redefine para seus valores iniciais os atributos "State" e "NbChanges"
         * do MBean padrão "SimpleStandard".
         */
        public void reset();
    }
    
```