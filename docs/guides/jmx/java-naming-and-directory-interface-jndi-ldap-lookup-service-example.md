# Serviço de Pesquisa (Lookup Service) JNDI (Java Naming and Directory Interface)/LDAP

## 20 Serviço de Pesquisa (Lookup Service) JNDI (Java Naming and Directory Interface)/LDAP

AVISO:

O suporte a CORBA foi removido do JDK, no JDK 11, incluindo a ferramenta `orbd`. Consulte [JEP 320](<https://openjdk.java.net/jeps/320>) para detalhes. Este exemplo é mantido para referência.

A JMX API define três bindings para serviços de pesquisa (lookup services), utilizando tecnologias de pesquisa existentes. Estes exemplos fornecem uma implementação de amostra do Serviço de Pesquisa JNDI/LDAP. O código-fonte contido nesta seção é usado para criar os arquivos correspondentes no diretório `examples/` especificado no procedimento de configuração apropriado e inclui:

*   arquivo README
*   Server
*   Client
*   jmx-schema.txt
*   60jmx-schema.ldif

### examples/Lookup/ldap/README
```
    # ==============================================================================
    #
    # Exemplo de uso de JNDI/LDAP como serviço de pesquisa (Lookup service) -
    # registrando e pesquisando um RMI Connector (IIOP/JRMP)
    #
    # ==============================================================================
    #
    # Requisitos:
    #
    # Antes de executar este exemplo, você precisará:
    # ---------------------------------------------
    #
    # * Obter acesso (ou instalar e iniciar) um servidor de diretório LDAP que
    #   implementará o serviço de pesquisa.
    # * Certificar-se de que o Java Schema (RFC 2713: http://www.ietf.org/rfc/rfc2713.txt)
    #   é conhecido por esse servidor.
    # * Atualizar o servidor de diretório com o JSR 160 LDAP Schema
    #   - arquivo 60jmx-schema.ldif fornecido
    #   Este arquivo ldif corresponde ao schema descrito em jmx-schema.txt
    #   e pode ser copiado como está no diretório config/schema do
    #   Sun ONE Directory Server.
    # * Certificar-se de que você tem acesso de escrita ao servidor para que possa
    #   criar contextos nos quais o servidor registrará sua URL.
    #
    # Os nomes usados neste exemplo assumem que você
    # criou um novo suffix, um database e um root node (por exemplo, dc=Test)
    # para o propósito do exemplo. Você pode, no entanto, usar quaisquer nomes / localização
    # que desejar - apenas certifique-se de fornecer os nomes e URLs corretos
    # ao iniciar os exemplos Server e Client.
    #
    # Além disso, se você deseja usar um diretório externo para os RMI JMX
    # Connectors (URLs do formato jmx:service:[rmi|iiop]:/host:port/jndi/jndi-url)
    # então:
    #
    #   o Se você deseja usar rmiregistry em conjunto com o RMI/JRMP
    #     JMX Connector, você terá que iniciar um rmiregistry (veja abaixo).
    #
    #   o Se você deseja usar o CORBA Naming Service em conjunto com o RMI/IIOP
    #     JMX Connector, você terá que iniciar um ORB daemon (veja abaixo).
    #
    #   o Se você deseja usar LDAP em conjunto com os RMI JMX Connectors
    #     você terá que instalar/configurar um servidor de diretório (você pode usar o
    #     mesmo servidor que o usado para Lookup, ou outro).
    #
    # Para compilar e executar o exemplo, faça uma cópia deste arquivo README e
    # então simplesmente recorte e cole todos os comandos conforme necessário em uma janela de terminal.
    #
    # Este README assume que você está executando em Java SE 6 no Unix,
    # você está familiarizado com a tecnologia JMX, com LDAP e JNDI, e com
    # a sintaxe do bourne shell ou korn shell.
    #
    # Todos os comandos abaixo são definidos usando a sintaxe do korn shell do Unix.
    #
    # Se você não estiver executando Unix e korn shell, espera-se que você seja capaz de
    # adaptar esses comandos ao seu sistema operacional e ambiente de shell favoritos.
    #
    
    #-------------------------------------------------------------------------------
    # O servidor de diretório deve ser iniciado primeiro.
    #       Você terá
    #       que garantir que o Java Schema (RFC 2713: 
    #       http://www.ietf.org/rfc/rfc2713.txt) seja conhecido por esse servidor.
    
    #-------------------------------------------------------------------------------
    # Iniciar um rmiregistry
    #
    rmiregistry 9999 &
    
    #-------------------------------------------------------------------------------
    # Iniciar um ORB daemon:
    #
    rm -rf ./orb.db
    orbd -ORBInitialPort 7777 &
    
    #-------------------------------------------------------------------------------
    # Compilar Server.java e Client.java
    #
    # * Server.java: cria um MBeanServer, cria e inicia um
    #                RMI connector (JRMP/IIOP)
    # * Client.java: pesquisa um connector em JNDI
    #                lista todos os MBeans.
    
    javac -d . Server.java Client.java
    
    #-------------------------------------------------------------------------------
    # Parâmetros LDAP:
    #
    
    # Forneça o hostname apropriado abaixo e defina esta variável:
    #
    ldaphost=gigondas
    
    # Forneça o número da porta apropriado abaixo e defina esta variável:
    #
    ldapport=6666
    
    # Forneça o principal apropriado abaixo e defina esta variável:
    #
    principal="cn=Directory Manager"
    
    # Forneça as credenciais apropriadas abaixo e defina esta variável:
    #
    credentials=
    
    # Forneça o root apropriado sob o qual o Server tentará
    # registrar sua URL...
    #
    provider="ldap://$ldaphost:$ldapport/dc=Test"
    
    #-------------------------------------------------------------------------------
    # URLs JNDI
    #
    jndirmi="rmi://localhost:9999"
    jndiiiop="iiop://localhost:7777"
    jndildap="ldap://$ldaphost:$ldapport"
    
    #-------------------------------------------------------------------------------
    # URLs de Serviço JMX
    #
    jmxiiopurl="service:jmx:iiop:///jndi/${jndiiiop}/server"
    jmxrmiurl="service:jmx:rmi:///jndi/${jndirmi}/server"
    jmxiiopldapurl="service:jmx:iiop:///jndi/${jndildap}/cn=x,dc=Test"
    jmxrmildapurl="service:jmx:rmi:///jndi/${jndildap}/cn=x,dc=Test"
    jmxstuburl="service:jmx:rmi://"
    jmxiorurl="service:jmx:iiop://"
    
    #-------------------------------------------------------------------------------
    # Abaixo ilustramos os diferentes JMX Connector Servers
    # que você tem a opção de iniciar. 
    # Existem sete casos rotulados de (a) a (f):
    #
    #   * RMI Connectors
    #       + sobre JRMP
    #           - sem nenhum diretório externo (a)
    #           - usando rmiregistry como diretório externo (b)
    #           - usando LDAP como diretório externo (c)
    #       + sobre IIOP
    #           - sem nenhum diretório externo (d)
    #           - usando CORBA Naming Service como diretório externo (e)
    #           - usando LDAP como diretório externo (f)
    
    # NOTA-1: Conforme definido na seção 6.1 "Terminologia" do documento "JMX Remote API 1.0
    # Specification", um agent é composto por um MBean Server e por
    # um ou mais Connector Servers. Pode haver vários agents executando em uma JVM.
    # Para flexibilidade deste exemplo, a classe jndi.Server cria um agent que
    # é composto por um MBean Server e por apenas um Connector Server. A classe
    # jndi.Server decide qual tipo de Connector Server criar dependendo do
    # valor dado à propriedade de sistema "url" quando você inicia o exemplo.
    
    # NOTA-2: O valor da propriedade de sistema "agent.name" é o valor que a
    # classe jndi.Server dará ao atributo de pesquisa "AgentName" quando ela
    # registrar a URL do connector no lookup service. Conforme definido na Tabela 6.1
    # "Lookup attributes for connectors" do documento "JMX Remote API 1.0 Specification":
    # o atributo de pesquisa "AgentName" é um nome simples usado para identificar
    # o *AGENT* ao qual o connector está anexado. Ele possibilita
    # pesquisar, com uma query ao lookup service, por todos os connectors registrados
    # por um dado agent.
    
    # (a) Você pode iniciar um agent com um RMI Connector Server sobre JRMP
    #     sem usar nenhum diretório externo
    #
    java -classpath . -Ddebug=true \
         -Dagent.name=test-server-a \
         -Durl="service:jmx:rmi://" \
         -Djava.naming.provider.url="$provider" \
         -Djava.naming.security.principal="$principal" \
         -Djava.naming.security.credentials="$credentials" \
         jndi.Server &
    
    # (b) Ou você pode iniciar um agent com um RMI Connector Server sobre JRMP
    #     usando rmiregistry como diretório externo
    #     (Inicie o rmiregistry primeiro, se ainda não estiver iniciado)
    #
    java -classpath . -Ddebug=true \
         -Dagent.name=test-server-b \
         -Durl="service:jmx:rmi:///jndi/${jndirmi}/server" \
         -Djava.naming.provider.url="$provider" \
         -Djava.naming.security.principal="$principal" \
         -Djava.naming.security.credentials="$credentials" \
         jndi.Server &
    
    # (c) Ou você pode iniciar um agent com um RMI Connector Server sobre JRMP
    #     usando LDAP como diretório externo
    #     (Primeiro inicie um servidor LDAP e crie o suffix dc=Test)
    #
    java -classpath . -Ddebug=true \
         -Dagent.name=test-server-c \
         -Durl="service:jmx:rmi:///jndi/${jndildap}/cn=x,dc=Test" \
         -Djava.naming.provider.url="$provider" \
         -Djava.naming.security.principal="$principal" \
         -Djava.naming.security.credentials="$credentials" \
         jndi.Server &
    
    # (d) Ou você pode iniciar um agent com um RMI Connector Server sobre IIOP
    #     sem usar nenhum diretório externo
    #
    java -classpath . -Ddebug=true \
         -Dagent.name=test-server-d \
         -Durl="service:jmx:iiop://" \
         -Djava.naming.provider.url="$provider" \
         -Djava.naming.security.principal="$principal" \
         -Djava.naming.security.credentials="$credentials" \
         jndi.Server &
    
    # (e) Ou você pode iniciar um agent com um RMI Connector Server sobre IIOP
    #     usando CORBA Naming Service como diretório externo
    #     (Inicie o ORBD primeiro se ainda não estiver iniciado).
    #
    java -classpath . -Ddebug=true \
         -Dagent.name=test-server-e \
         -Durl="service:jmx:iiop:///jndi/${jndiiiop}/server" \
         -Djava.naming.provider.url="$provider" \
         -Djava.naming.security.principal="$principal" \
         -Djava.naming.security.credentials="$credentials" \
         jndi.Server &
    
    # (f) Ou você pode iniciar um agent com um RMI Connector Server sobre IIOP
    #     usando LDAP como diretório externo
    #     (Primeiro inicie um servidor LDAP e crie o suffix dc=Test)
    #
    java -classpath . -Ddebug=true \
         -Dagent.name=test-server-f \
         -Durl="service:jmx:iiop:///jndi/${jndildap}/cn=x,dc=Test" \
         -Djava.naming.provider.url="$provider" \
         -Djava.naming.security.principal="$principal" \
         -Djava.naming.security.credentials="$credentials" \
         jndi.Server &
    
    # Depois de iniciar um ou mais agents, você pode iniciar o Client.
    #
    java -classpath . -Ddebug=true \
         -Djava.naming.provider.url="$provider" \
         -Djava.naming.security.principal="$principal" \
         -Djava.naming.security.credentials="$credentials" \
         jndi.Client
    
    #-------------------------------------------------------------------------------
    
```

### examples/Lookup/ldap/Server.java
```java
    package jndi;
    
    import javax.naming.InitialContext;
    import javax.naming.Context;
    import javax.naming.NamingEnumeration;
    import javax.naming.NameNotFoundException;
    import javax.naming.NamingException;
    
    import javax.naming.directory.DirContext;
    import javax.naming.directory.Attribute;
    import javax.naming.directory.BasicAttribute;
    import javax.naming.directory.Attributes;
    import javax.naming.directory.BasicAttributes;
    import javax.naming.directory.DirContext;
    import javax.naming.directory.Attribute;
    import javax.naming.directory.Attributes;
    import javax.naming.directory.SearchResult;
    import javax.naming.directory.SearchControls;
    
    import javax.naming.ldap.InitialLdapContext;
    
    import javax.management.*;
    import javax.management.remote.*;
    import javax.management.remote.rmi.*;
    
    import java.text.SimpleDateFormat;
    
    import java.util.Date;
    import java.util.Map;
    import java.util.HashMap;
    import java.util.Hashtable;
    import java.util.List;
    import java.util.ArrayList;
    import java.util.Locale;
    import java.util.Vector;
    import java.io.IOException;
    import java.io.Serializable;
    import java.net.InetAddress;
    import java.net.MalformedURLException;
    
    /**
     * Esta classe demonstra como usar um diretório LDAP como um serviço de pesquisa
     * para connectors JSR 160. Ela mostra como registrar um
     * JMXConnectorServer no diretório LDAP através de JNDI.
     * <p>
     * Consulte o arquivo README e {@link #main(String[])} para mais detalhes.
     * <p>
     * Certifique-se de ler a seção "Binding with Lookup Services" da
     * JMX Remote API 1.0 Specification antes de analisar este exemplo.
     */
    public class Server {
    
        // A URL permanecerá registrada por 60 segundos.
        //
        public final static int JMX_DEFAULT_LEASE = 60;
    
        private static boolean debug = false;
    
        /**
         * O MBeanServer local.
         */
        private final MBeanServer mbs;
    
        /**
         * Constrói um objeto Server. Cria um novo MBeanServer.
         */
        public Server() {
            mbs = MBeanServerFactory.createMBeanServer();
        }
    
        /**
         * Obtém um ponteiro para o root context da árvore de diretórios
         * sob a qual este servidor deve se registrar.
         * Todos os DNs LDAP serão considerados relativos a esse root.
         * <p>
         * Observe que este root não faz parte da especificação JSR 160,
         * uma vez que a localização real onde um JMX Agent registrará
         * seus connectors é deixada completamente aberta pela especificação.
         * A especificação discute apenas o que o JMX Agent deve/pode
         * colocar no diretório - mas não onde.
         * <p>
         * Este método assume que o root do diretório
         * será passado na propriedade de sistema {@link Context#PROVIDER_URL
         * Context.PROVIDER_URL}.
         * <p>
         * Este método transferirá um conjunto fixo de System Properties para
         * o Hashtable fornecido ao JNDI InitialContext:
         * <ul><li>{@link Context#INITIAL_CONTEXT_FACTORY
         *           Context.INITIAL_CONTEXT_FACTORY} - o padrão é
         *         <code>"com.sun.jndi.ldap.LdapCtxFactory"</code></li>
         *     <li>{@link Context#PROVIDER_URL
         *           Context.PROVIDER_URL}</li>
         *     <li>{@link Context#SECURITY_PRINCIPAL
         *           Context.SECURITY_PRINCIPAL} - o padrão é
         *         <code>"cn=Directory Manager"</code></li>
         *     <li>{@link Context#SECURITY_CREDENTIALS
         *           Context.SECURITY_CREDENTIALS}</li>
         * </ul>
         *
         * @return um ponteiro para o Diretório LDAP.
         */
        public static DirContext getRootContext() throws NamingException {
            // Prepara o ambiente
            //
            final Hashtable env = new Hashtable();
    
            // O Initial Context Factory deve ser fornecido e
            // deve apontar para um LDAP Context Factory
            //
            final String factory =
                System.getProperty(Context.INITIAL_CONTEXT_FACTORY,
                                   "com.sun.jndi.ldap.LdapCtxFactory");
    
            // A LDAP Provider URL deve ser fornecida e
            // deve apontar para um servidor de diretório LDAP em execução
            //
            final String ldapServerUrl =
                System.getProperty(Context.PROVIDER_URL);
    
            // O usuário LDAP deve ser fornecido e
            // deve ter acesso de escrita à subparte do diretório
            // onde o agent será registrado.
            //
            final String ldapUser =
                System.getProperty(Context.SECURITY_PRINCIPAL,
                                   "cn=Directory Manager");
    
            // As credenciais devem ser fornecidas, para que o usuário possa
            // escrever no diretório.
            //
            final String ldapPasswd =
                System.getProperty(Context.SECURITY_CREDENTIALS);
    
            // Informações de debug: imprime os valores fornecidos:
            //
            debug(Context.PROVIDER_URL + "=" + ldapServerUrl);
            debug(Context.SECURITY_PRINCIPAL + "=" + ldapUser);
            if (debug) {
                System.out.print(Context.SECURITY_CREDENTIALS + "=");
                final int len = (ldapPasswd==null)?0:ldapPasswd.length();
                for (int i=0;i<len;i++) System.out.print("*");
                System.out.println();
            }
    
            // Coloca o valor fornecido na tabela de ambiente.
            //
            env.put(Context.INITIAL_CONTEXT_FACTORY,factory);
            env.put(Context.SECURITY_PRINCIPAL, ldapUser);
            if (ldapServerUrl != null)
                env.put(Context.PROVIDER_URL, ldapServerUrl);
            if (ldapPasswd != null)
                env.put(Context.SECURITY_CREDENTIALS, ldapPasswd);
    
            // Cria o initial context
            //
            InitialContext root = new InitialLdapContext(env,null);
    
            // Agora retorna o root directory context.
            //
            return (DirContext)(root.lookup(""));
        }
    
        /**
         * Registra uma JMX Connector URL no diretório LDAP.
         * <p>
         * Este método espera encontrar o DN LDAP onde registrará
         * a JMX Connector URL na propriedade de sistema "dn". Se essa
         * propriedade não for definida, então "cn=<var>name</var>" é assumido.
         * <p>
         * Se o DN fornecido não apontar para um nó existente no
         * diretório, então este método tentará criá-lo. No entanto,
         * o nó pai já deve existir nesse caso.
         * <p>
         * Se o DN apontar para um nó que já é da classe <var>jmxConnector</var>,
         * então este método simplesmente sobrescreverá seus atributos <var>jmxServiceURL</var>
         * ,<var>jmxAgentName</var>, <var>jmxProtocolType</var>,
         * <var>jmxAgentHost</var> e <var>jmxExpirationDate</var>.
         *
         * @param root      Um ponteiro para o root context que estamos usando,
         *                  conforme retornado por {@link #getRootContext()}.
         * @param jmxUrl    Uma JMX Connector Server URL, que deveria ter
         *                  sido obtida de
         *                  {@link JMXConnectorServer#getAddress()
         *                  JMXConnectorServer.getAddress()};
         * @param name      O AgentName com o qual a URL deve ser registrada
         *                  no diretório LDAP.
         */
        public static void register(DirContext root,
                                    JMXServiceURL jmxUrl,
                                    String name)
            throws NamingException, IOException {
    
            // Obtém o DN LDAP onde registrar
            //
            final String mydn = System.getProperty("dn","cn="+name);
    
            debug("dn: " + mydn );
    
            // Primeiro verifica se <mydn> já existe
            //
            Object o = null;
            try {
                o = root.lookup(mydn);
                // Já existe um nó em <mydn>
                //
            } catch (NameNotFoundException n) {
                // <mydn> não existe! tenta criá-lo.
                //
    
                // Prepara atributos para criar um javaContainer
                // com a classe auxiliar jmxConnector.
                //
                Attributes attrs = new BasicAttributes();
    
                // Prepara o atributo objectClass: vamos criar
                // um javaContainer com a classe auxiliar jmxConnector.
                //
                Attribute objclass = new BasicAttribute("objectClass");
                objclass.add("top");
                objclass.add("javaContainer");
                objclass.add("jmxConnector");
                attrs.put(objclass);
                attrs.put("jmxAgentName", name);
                o = root.createSubcontext(mydn,attrs);
            }
    
            // Isso não deveria acontecer, mas quem sabe...
            //
            if (o == null) throw new NameNotFoundException();
    
            // Verifica se a entrada contém a objectClass jmxConnector
            // antes de modificar os atributos.
            //
            final Attributes attrs = root.getAttributes(mydn);
            final Attribute oc = attrs.get("objectClass");
            if (!oc.contains("jmxConnector")) {
                // O nó não possui a classe jmxConnector.
                //
                final String msg = "O nó fornecido [" + mydn + "] não " +
                    "contém a objectclass jmxConnector";
                throw new NamingException(msg);
            }
    
            // Agora precisa substituir os atributos jmxConnector.
            //
            final Attributes newattrs = new BasicAttributes();
            newattrs.put("jmxAgentName",name);
            newattrs.put("jmxServiceURL",jmxUrl.toString());
            newattrs.put("jmxAgentHost",InetAddress.getLocalHost().getHostName());
            newattrs.put("jmxProtocolType",jmxUrl.getProtocol());
            newattrs.put("jmxExpirationDate",
                         getExpirationDate(JMX_DEFAULT_LEASE));
            root.modifyAttributes(mydn,DirContext.REPLACE_ATTRIBUTE,newattrs);
        }
    
        /**
         * Cria um RMI Connector Server, o inicia e o registra
         * no diretório LDAP.
         * <p>
         * Este método transferirá um conjunto fixo de System Properties para
         * o Map fornecido ao construtor RMIConnectorServer. Algumas
         * propriedades JNDI, se definidas, são transferidas para o Map para
         * que possam ser usadas quando LDAP é utilizado como diretório externo
         * para registrar o RMI Stub (consulte {@link javax.management.remote.rmi}
         * JavaDoc). Observe que, mesmo que LDAP seja usado como diretório externo,
         * as propriedades {@link Context#INITIAL_CONTEXT_FACTORY
         *            Context.INITIAL_CONTEXT_FACTORY} e
         * {@link Context#PROVIDER_URL Context.PROVIDER_URL}
         * geralmente não precisam ser passadas.
         * <p>
         * As seguintes System properties, se definidas, são transferidas para
         * o Map fornecido ao construtor RMIConnectorServer.
         * <ul><li>{@link Context#INITIAL_CONTEXT_FACTORY
         *           Context.INITIAL_CONTEXT_FACTORY}</li>
         *     <li>{@link Context#PROVIDER_URL
         *           Context.PROVIDER_URL}</li>
         *     <li>{@link Context#SECURITY_PRINCIPAL
         *           Context.SECURITY_PRINCIPAL}</li>
         *     <li>{@link Context#SECURITY_CREDENTIALS
         *           Context.SECURITY_CREDENTIALS}</li>
         *     <li>{@link RMIConnectorServer#JNDI_REBIND_ATTRIBUTE
         *           RMIConnectorServer.JNDI_REBIND_ATTRIBUTE} - o padrão
         *           é <code>true</code>.</li>
         * </ul>
         *
         * @param url Uma representação em string da JMXServiceURL.
         * @return o RMIConnectorServer criado.
         */
        public JMXConnectorServer rmi(String url)
            throws IOException, JMException,
                   NamingException, ClassNotFoundException {
    
            // Cria uma JMXServiceURL a partir da string url.
            //
            JMXServiceURL jurl = new JMXServiceURL(url);
    
            // Prepara o Map de ambiente
            //
            final HashMap env = new HashMap();
            final String rprop = RMIConnectorServer.JNDI_REBIND_ATTRIBUTE;
            final String rebind=System.getProperty(rprop,"true");
            final String factory =
                System.getProperty(Context.INITIAL_CONTEXT_FACTORY);
            final String ldapServerUrl =
                System.getProperty(Context.PROVIDER_URL);
            final String ldapUser =
                System.getProperty(Context.SECURITY_PRINCIPAL);
            final String ldapPasswd =
                System.getProperty(Context.SECURITY_CREDENTIALS);
    
            // Transfere algumas propriedades de sistema para o Map
            //
            if (factory!= null) // isso não deveria ser necessário
                env.put(Context.INITIAL_CONTEXT_FACTORY,factory);
            if (ldapServerUrl!=null) // isso não deveria ser necessário
                env.put(Context.PROVIDER_URL, ldapServerUrl);
            if (ldapUser!=null) // isso é necessário quando LDAP é usado
                env.put(Context.SECURITY_PRINCIPAL, ldapUser);
            if (ldapPasswd != null) // isso é necessário quando LDAP é usado
                env.put(Context.SECURITY_CREDENTIALS, ldapPasswd);
            env.put(rprop,rebind); // o padrão é true.
    
            // Cria um RMIConnectorServer
            //
            System.out.println("Criando RMI Connector: " + jurl);
            JMXConnectorServer rmis =
                JMXConnectorServerFactory.newJMXConnectorServer(jurl, env, mbs);
    
            // Obtém o AgentName para registrar o Connector no Lookup Service
            //
            final String agentName = System.getProperty("agent.name",
                                                        "DefaultAgent");
    
            // Inicia o connector e o registra no diretório LDAP.
            //
            start(rmis,env,agentName);
    
            return rmis;
        }
    
        /**
         * Inicia um JMXConnectorServer e o registra no diretório LDAP.
         *
         * @param server o JMXConnectorServer a ser iniciado e registrado.
         * @param env   o Map de ambiente.
         * @param agentName o AgentName com o qual a URL deve ser registrada
         *                  no Diretório LDAP. Este não é um DN LDAP, mas
         *                  o valor do atributo jmxAgentName.
         */
        public void start(JMXConnectorServer server, Map env, String agentName)
            throws IOException, NamingException {
    
            // Inicia o JMXConnectorServer
            //
            server.start();
    
            // Obtém um ponteiro para o diretório LDAP.
            //
            final DirContext root = getRootContext();
    
            // Cria uma JMX Service URL para registrar no diretório LDAP
            //
            final JMXServiceURL address = server.getAddress();
    
            // Registra a URL no diretório LDAP
            //
            register(root,address,agentName);
        }
    
        /**
         * Retorna uma string X.208 representando a data GMT em agora + sec.
         *
         * @param sec Número de segundos a partir de agora.
         * @return um X.208 GMT GeneralizedTime (terminando com Z).
         */
        public static String getExpirationDate(long sec) {
            final SimpleDateFormat fmt =  new SimpleDateFormat("yyyyMMddHHmmss.S");
            final Date date = new Date();
            final Date gmtDate;
            if (fmt.getCalendar().getTimeZone().inDaylightTime(date))
                gmtDate = new Date(System.currentTimeMillis() -
                                   fmt.getCalendar().getTimeZone().getRawOffset() -
                                   fmt.getCalendar().getTimeZone().getDSTSavings() +
                                   1000*sec);
            else
                gmtDate =
                    new Date(System.currentTimeMillis() -
                             fmt.getCalendar().getTimeZone().getRawOffset() +
                             1000*sec);
            return ((fmt.format(gmtDate))+"Z");
        }
    
        /**
         * Rastreia uma mensagem de debug.
         */
        private static void debug(String msg) {
            if (debug) System.out.println(msg);
        }
    
        /**
         * Programa Principal (Main)
         * <p>
         * Cria um objeto server, obtém a JMX Service URL e chama
         * o método que criará e registrará o
         * JMX Connector Server apropriado para essa URL.
         * <p>
         * Você pode querer usar as seguintes propriedades na linha de comando Java:
         * <ul>
         * <li><code>-Durl=&lt;jmxServiceURL&gt;</code>: especifica a URL do
         *     JMX Connector Server que você deseja usar. Consulte o arquivo README para mais
         *     detalhes.</li>
         * <li><code>-Dagent.name=&lt;AgentName&gt;</code>: especifica um
         *     AgentName para registrar.</li>
         * <li><code>-Djava.naming.factory.initial=&lt;initial-context-factory&gt;
         *     </code>: O initial context factory a ser usado para acessar o
         *     diretório LDAP (consulte {@link Context#INITIAL_CONTEXT_FACTORY
         *     Context.INITIAL_CONTEXT_FACTORY}) - o padrão é
         *     <code>"com.sun.jndi.ldap.LdapCtxFactory"</code>.</li>
         * <li><code>-Djava.naming.provider.url=&lt;provider-url&gt;</code>:
         *     A LDAP Provider URL (consulte {@link Context#PROVIDER_URL
         *     Context.PROVIDER_URL}).</li>
         * <li><code>-Djava.naming.security.principal=&lt;ldap-principal&gt;
         *     </code>: O security principal (login) a ser usado para conectar com
         *     o diretório LDAP (consulte {@link Context#SECURITY_PRINCIPAL
         *     Context.SECURITY_PRINCIPAL} - o padrão é
         *     <code>"cn=Directory Manager"</code>.</li>
         * <li><code>-Djava.naming.security.credentials=&lt;ldap-credentials&gt;
         *     </code>: As security credentials (senha) a serem usadas para
         *     conectar com o diretório LDAP (consulte
         *     {@link Context#SECURITY_CREDENTIALS
         *     Context.SECURITY_CREDENTIALS}).</li>
         * <li><code>-Ddebug="true|false"</code>: liga/desliga o flag de debug do Server
         *     (o padrão é "false")</li>
         * </ul>
         */
        public static void main(String[] args) {
            try {
                // Obtém o valor do flag de debug.
                //
                debug = (Boolean.valueOf(System.getProperty("debug","false"))).
                    booleanValue();
    
                // Cria um novo objeto Server.
                //
                final Server s = new Server();
    
                // Obtém a JMXConnector URL
                //
                final String url =
                    System.getProperty("url", "service:jmx:rmi://");
    
                // Constrói uma JMXServiceURL
                //
                final JMXServiceURL jurl = new JMXServiceURL(url);
    
                // Cria um JMX Connector Server
                //
                final JMXConnectorServer server;
                debug("Criando Connector: " + jurl);
    
                final String p = jurl.getProtocol();
                if (p.equals("rmi"))        // Cria um RMI Connector
                    s.rmi(url);
                else if (p.equals("iiop"))  // Cria um RMI/IIOP Connector
                    s.rmi(url);
                else                        // Protocolo não suportado
                    throw new MalformedURLException("Protocolo não suportado: " + p);
    
                System.out.println("\nService URL registrada com sucesso " +
                                   "no LDAP Lookup Service");
    
            } catch (Exception x) {
                System.err.println("Exceção inesperada capturada em main: " + x);
                x.printStackTrace(System.err);
            }
        }
    }
    
```

### examples/Lookup/ldap/Client.java
```java
    package jndi;
    
    import javax.naming.InitialContext;
    import javax.naming.Context;
    import javax.naming.NamingEnumeration;
    import javax.naming.NameNotFoundException;
    import javax.naming.NamingException;
    
    import javax.naming.directory.DirContext;
    import javax.naming.directory.Attribute;
    import javax.naming.directory.BasicAttribute;
    import javax.naming.directory.Attributes;
    import javax.naming.directory.BasicAttributes;
    import javax.naming.directory.DirContext;
    import javax.naming.directory.Attribute;
    import javax.naming.directory.Attributes;
```
```java
    import javax.naming.directory.SearchResult;
    import javax.naming.directory.SearchControls;
    
    import javax.naming.ldap.InitialLdapContext;
    
    import javax.management.remote.*;
    import javax.management.*;
    
    import java.text.SimpleDateFormat;
    
    import java.util.Date;
    import java.util.Map;
    import java.util.List;
    import java.util.ArrayList;
    import java.util.HashMap;
    import java.util.Hashtable;
    import java.util.Set;
    import java.util.Iterator;
    import java.util.Locale;
    import java.util.Vector;
    
    import java.io.IOException;
    import java.io.Serializable;
    
    /**
     * Esta classe demonstra como usar um diretório LDAP como um serviço de lookup
     * para conectores JSR 160. Ela mostra como buscar uma JMXServiceURL
     * do diretório LDAP.
     * <p>
     * Consulte o arquivo README e {@link #main(String[])} para mais detalhes.
     * <p>
     * Certifique-se de ler a seção "Binding with Lookup Services" da
     * Especificação JMX Remote API 1.0 antes de analisar este exemplo.
     */
    public class Client {
    
        private static boolean debug = false;
    
        /**
         * Lista todos os atributos de um nó LDAP.
         *
         * @param root O DirContext raiz.
         * @param dn   O DN do nó, relativo ao DirContext raiz.
         */
        public static void listAttributes(DirContext root, String dn)
            throws NamingException {
            final Attributes attrs = root.getAttributes(dn);
            System.out.println("dn: " + dn);
            System.out.println("attributes: " + attrs);
        }
    
        /**
         * Obtém um ponteiro para o contexto raiz da árvore de diretórios
         * sob a qual este servidor deve se registrar.
         * Todos os DNs LDAP serão considerados relativos a essa raiz.
         * <p>
         * Note que esta raiz não faz parte da especificação JSR 160,
         * uma vez que o local real onde um JMX Agent registrará
         * seus conectores é deixado completamente em aberto pela especificação.
         * A especificação discute apenas o que o JMX Agent deve/pode
         * colocar no diretório - mas não onde.
         * <p>
         * Este método assume que a raiz do diretório será passada
         * na propriedade de sistema {@link Context#PROVIDER_URL
         * Context.PROVIDER_URL}.
         * <p>
         * Este método transferirá um conjunto fixo de System Properties para
         * a Hashtable fornecida ao JNDI InitialContext:
         * <ul><li>{@link Context#INITIAL_CONTEXT_FACTORY
         *           Context.INITIAL_CONTEXT_FACTORY} - o padrão é
         *         <code>"com.sun.jndi.ldap.LdapCtxFactory"</code></li>
         *     <li>{@link Context#PROVIDER_URL
         *           Context.PROVIDER_URL}</li>
         *     <li>{@link Context#SECURITY_PRINCIPAL
         *           Context.SECURITY_PRINCIPAL} - o padrão é
         *         <code>"cn=Directory Manager"</code></li>
         *     <li>{@link Context#SECURITY_CREDENTIALS
         *           Context.SECURITY_CREDENTIALS}</li>
         * </ul>
         *
         * @return um ponteiro para o Diretório LDAP.
         */
        public static DirContext getRootContext() throws NamingException {
            // Prepara o ambiente
            //
            final Hashtable env = new Hashtable();
    
            // A Initial Context Factory deve ser fornecida e
            // deve apontar para uma LDAP Context Factory
            //
            final String factory =
                System.getProperty(Context.INITIAL_CONTEXT_FACTORY,
                                   "com.sun.jndi.ldap.LdapCtxFactory");
    
            // A URL do Provedor LDAP deve ser fornecida e
            // deve apontar para um servidor de diretório LDAP em execução
            //
            final String ldapServerUrl =
                System.getProperty(Context.PROVIDER_URL);
    
            // O usuário LDAP deve ser fornecido e
            // deve ter acesso de escrita à subparte do diretório
            // onde o agente será registrado.
            //
            final String ldapUser =
                System.getProperty(Context.SECURITY_PRINCIPAL,
                                   "cn=Directory Manager");
    
            // Credenciais devem ser fornecidas, para que o usuário possa
            // escrever no diretório.
            //
            final String ldapPasswd =
                System.getProperty(Context.SECURITY_CREDENTIALS);
    
            // Informações de depuração: imprime os valores fornecidos:
            //
            debug(Context.PROVIDER_URL + "=" + ldapServerUrl);
            debug(Context.SECURITY_PRINCIPAL + "=" + ldapUser);
            if (debug) {
                System.out.print(Context.SECURITY_CREDENTIALS + "=");
                final int len = (ldapPasswd==null)?0:ldapPasswd.length();
                for (int i=0;i<len;i++) System.out.print("*");
                System.out.println();
            }
    
            // Coloca o valor fornecido na tabela de ambiente.
            //
            env.put(Context.INITIAL_CONTEXT_FACTORY,factory);
            env.put(Context.SECURITY_PRINCIPAL, ldapUser);
            if (ldapServerUrl != null)
                env.put(Context.PROVIDER_URL, ldapServerUrl);
            if (ldapPasswd != null)
                env.put(Context.SECURITY_CREDENTIALS, ldapPasswd);
    
            // Cria o contexto inicial
            //
            InitialContext root = new InitialLdapContext(env,null);
    
            // Agora retorna o contexto do diretório raiz.
            //
            return (DirContext)(root.lookup(""));
        }
    
        /**
         * Analisa a expirationDate para determinar se
         * a URL associada expirou.
         *
         * @param expirationDate um X.208 GeneralizedTime, local ou GMT.
         *        Apenas os formatos yyyyMMddHHmmss.S (hora local) e  yyyyMMddHHmmss.SZ
         *        (hora GMT) são reconhecidos.
         * @return true se a expirationDate pôde ser analisada e está no passado,
         *         false caso contrário.
         */
        public static boolean hasExpired(String expirationDate) {
            if (expirationDate == null) return false;
            try {
                final Date localExpDate = getLocalDate(expirationDate);
                final Date now = new Date();
                if (localExpDate.before(now)) return true;
            } catch (java.text.ParseException x) {
                x.printStackTrace(System.out);
            }
            return false;
        }
    
        /**
         * Retorna uma data no fuso horário local analisada a partir de uma data
         * formatada em X.208. Apenas os formatos yyyyMMddHHmmss.S (hora local) e
         * yyyyMMddHHmmss.SZ (hora GMT) são reconhecidos.
         *
         * @param expirationDate um X.208 GeneralizedTime, local ou GMT.
         * @return a Date correspondente no fuso horário local.
         */
        public static Date getLocalDate(String expirationDate)
            throws java.text.ParseException {
            final SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMddHHmmss.S");
            Date localDate = fmt.parse(expirationDate);
            if (expirationDate.endsWith("Z")) {
                final Date date = new Date();
                if (fmt.getCalendar().getTimeZone().inDaylightTime(date))
                    localDate =
                        new Date(localDate.getTime() +
                                 fmt.getCalendar().getTimeZone().getRawOffset() +
                                 fmt.getCalendar().getTimeZone().getDSTSavings());
                else
                    localDate =
                        new Date(localDate.getTime() +
                                 fmt.getCalendar().getTimeZone().getRawOffset());
            }
            return localDate;
        }
    
        /**
         * Busca JMXConnectors no diretório LDAP.
         *
         * @param root Um ponteiro para o diretório LDAP,
         *        retornado por {@link #getRootContext()}.
         * @param protocolType O tipo de protocolo dos JMX Connectors
         *        que queremos recuperar. Se <var>protocolType</var> for null,
         *        o atributo jmxProtocolType será ignorado. Caso contrário,
         *        apenas os agentes que registraram um atributo jmxProtocolType
         *        correspondente serão retornados.
         * @param name o AgentName dos JMXConnectors que devem
         *        ser retornados. Se <var>name</var> for null,
         *        os JMXConnectors para todos os agentes serão retornados
         *        (null é equivalente a um curinga).
         * @return A lista de JMXConnectors correspondentes recuperados do
         *         diretório LDAP.
         */
        public static List lookup(DirContext root, String protocolType, String name)
            throws IOException, NamingException {
    
            final ArrayList list = new ArrayList();
    
            // Se protocolType não for null, inclua-o no filtro.
            //
            String queryProtocol =
                (protocolType==null)?"":"(jmxProtocolType="+protocolType+")";
    
            // Define a string de consulta LDAPv3
            //
            // Apenas os nós que possuem a classe de objeto jmxConnector nos
            // interessam, então especificamos (objectClass=jmxConnector)
            // no filtro.
            //
            // Especificamos o atributo jmxAgentName no filtro para que a
            // consulta retorne apenas os serviços para os quais o atributo AgentName
            // foi registrado. Como a JSR 160 especifica que
            // o atributo AgentName é obrigatório, isso torna possível
            // filtrar todos os serviços que não estão em conformidade
            // com a especificação.
            // Se <name> for null, ele é substituído por "*", de modo que todos
            // os serviços para os quais o atributo AgentName foi especificado correspondam,
            // independentemente do valor desse atributo.
            // Caso contrário, apenas os serviços para os quais o AgentName corresponde ao
            // nome ou padrão especificado por <name> serão retornados.
            //
            // Também especificamos (jmxServiceURL=*) para que apenas os nós
            // para os quais o atributo jmxServiceURL está presente sejam
            // retornados. Assim, filtramos todos os nós correspondentes
            // a agentes que não estão atualmente disponíveis.
            //
            String query =
                "(&" + "(objectClass=jmxConnector) " +
                "(jmxServiceURL=*) " +
                queryProtocol +
                "(jmxAgentName=" + ((name!=null)?name:"*") + "))";
    
            System.out.println("Looking up JMX Agents with filter: " + query );
    
            SearchControls ctrls = new SearchControls();
    
            // Queremos obter todos os objetos jmxConnector, onde quer que tenham sido
            // registrados.
            //
            ctrls.setSearchScope(SearchControls.SUBTREE_SCOPE);
    
            // Queremos obter apenas jmxServiceUrl e jmxExpirationDate
            // (comente estas linhas e todos os atributos serão retornados).
            //
            // ctrls.setReturningAttributes(new String[] {
            //           "jmxServiceURL",
            //           "jmxExpirationDate"
            //           });
    
            // Busca...
            //
            final NamingEnumeration results = root.search("", query, ctrls);
    
            // Obtém a URL...
            //
            while (results.hasMore()) {
    
                // Obtém o nó...
                //
                final SearchResult r = (SearchResult) results.nextElement();
                debug("Found node: " + r.getName());
    
                // Obtém os atributos
                //
                final Attributes attrs = r.getAttributes();
    
                // Obtém o atributo jmxServiceURL
                //
                final Attribute  attr = attrs.get("jmxServiceURL");
                if (attr == null) continue;
    
                // Obtém jmxExpirationDate
                //
                final Attribute  exp = attrs.get("jmxExpirationDate");
    
                // Verifica se a URL não expirou.
                //
                if ((exp != null) && hasExpired((String)exp.get())) {
                    System.out.print(r.getName() + ": ");
                    System.out.println("URL expired since: " + exp.get());
                    continue;
                }
    
                // Obtém a string da URL
                //
                final String urlStr = (String)attr.get();
                if (urlStr.length() == 0) continue;
    
                debug("Found URL: " + urlStr);
    
                // Cria uma JMXServiceURL
                //
                final JMXServiceURL url  = new JMXServiceURL(urlStr);
    
                // Cria um JMXConnector
                //
                final JMXConnector conn =
                    JMXConnectorFactory.newJMXConnector(url,null);
    
                // Adiciona o conector à lista de resultados
                //
                list.add(conn);
                if (debug) listAttributes(root,r.getName());
            }
    
            return list;
        }
    
        /**
         * Lista todos os MBeans e seus atributos.
         */
        public static void listMBeans(MBeanServerConnection server)
            throws IOException {
            final Set names = server.queryNames(null,null);
            for (final Iterator i=names.iterator(); i.hasNext(); ) {
                ObjectName name = (ObjectName)i.next();
                System.out.println("Got MBean: "+name);
                try {
                    MBeanInfo info =
                        server.getMBeanInfo((ObjectName)name);
                    MBeanAttributeInfo[] attrs = info.getAttributes();
                    if (attrs == null) continue;
                    for (int j=0; j<attrs.length; j++) {
                        if (attrs[j].isReadable()) {
                            try {
                                Object o =
                                    server.getAttribute(name,attrs[j].getName());
                                System.out.println("\t\t" + attrs[j].getName() +
                                                   " = "+o);
                            } catch (Exception x) {
                                System.err.println("JmxClient failed to get " +
                                                   attrs[j].getName());
                                x.printStackTrace(System.err);
                            }
                        }
                    }
                } catch (Exception x) {
                    System.err.println("JmxClient failed to get MBeanInfo: "  + x);
                    x.printStackTrace(System.err);
                }
            }
        }
    
        /**
         * Rastreia uma mensagem de depuração.
         */
        private static void debug(String msg) {
            if (debug) System.out.println(msg);
        }
    
        /**
         * Principal do Programa.
         * <p>
         * Busca todos os agentes JMX no Diretório LDAP e lista
         * seus MBeans e atributos.
         * <p>
         * Você pode querer usar as seguintes propriedades na linha de comando Java:
         * <ul>
         * <li><code>-Dagent.name=&lt;AgentName&gt;</code>: especifica um
         *     AgentName para buscar (o padrão é null, significando qualquer agente).</li>
         * <li><code>-Dprotocol=&lt;ProtocolType&gt;</code>: restringe o cliente
         *     a buscar por um tipo de protocolo específico (o padrão é null,
         *     significando qualquer tipo).</li>
         * <li><code>-Djava.naming.factory.initial=&lt;initial-context-factory&gt;
         *     </code>: A fábrica de contexto inicial a ser usada para acessar o
         *     diretório LDAP (consulte {@link Context#INITIAL_CONTEXT_FACTORY
         *     Context.INITIAL_CONTEXT_FACTORY}) - o padrão é
         *     <code>"com.sun.jndi.ldap.LdapCtxFactory"</code>.</li>
         * <li><code>-Djava.naming.provider.url=&lt;provider-url&gt;</code>:
         *     A URL do Provedor LDAP (consulte {@link Context#PROVIDER_URL
         *     Context.PROVIDER_URL}).</li>
         * <li><code>-Djava.naming.security.principal=&lt;ldap-principal&gt;
         *     </code>: O principal de segurança (login) a ser usado para conectar-se
         *     ao diretório LDAP (consulte {@link Context#SECURITY_PRINCIPAL
         *     Context.SECURITY_PRINCIPAL}) - o padrão é
         *     <code>"cn=Directory Manager"</code>.</li>
         * <li><code>-Djava.naming.security.credentials=&lt;ldap-credentials&gt;
         *     </code>: As credenciais de segurança (senha) a serem usadas para
         *     conectar-se ao diretório LDAP (consulte
         *     {@link Context#SECURITY_CREDENTIALS
         *     Context.SECURITY_CREDENTIALS}).</li>
         * <li><code>-Ddebug="true|false"</code>: liga/desliga a flag de depuração
         *     do Servidor (o padrão é "false")</li>
         * </ul>
         */
        public static void main(String[] args) {
            try {
                // Obtém o valor da flag de depuração.
                //
                debug = (Boolean.valueOf(System.getProperty("debug","false"))).
                    booleanValue();
    
                // Obtém um ponteiro para o Diretório LDAP.
                //
                final DirContext root = getRootContext();
                debug("root is: " + root.getNameInNamespace());
    
                final String protocolType=System.getProperty("protocol");
                final String agentName=System.getProperty("agent.name");
    
                // Busca todos os agentes correspondentes no Diretório LDAP.
                //
                List l = lookup(root,protocolType,agentName);
    
                // Tenta conectar-se aos agentes recuperados
                //
                System.out.println("Number of agents found : " + l.size());
                int j = 1;
                for (Iterator i=l.iterator();i.hasNext();j++) {
                    JMXConnector c1 = (JMXConnector) i.next();
                    if (c1 != null) {
    
                        // Conecta
                        //
                        System.out.println(
                          "----------------------------------------------------");
                        System.out.println("\tConnecting to agent number "+j);
                        System.out.println(
                          "----------------------------------------------------");
                        debug("JMXConnector is: " + c1);
    
                        // Prepara o Map de ambiente
                        //
                        final HashMap env = new HashMap();
                        final String factory =
                            System.getProperty(Context.INITIAL_CONTEXT_FACTORY);
                        final String ldapServerUrl =
                            System.getProperty(Context.PROVIDER_URL);
                        final String ldapUser =
                            System.getProperty(Context.SECURITY_PRINCIPAL);
                        final String ldapPasswd =
                            System.getProperty(Context.SECURITY_CREDENTIALS);
    
                        // Transfere algumas propriedades de sistema para o Map
                        //
                        if (factory!= null) // this should not be needed
                            env.put(Context.INITIAL_CONTEXT_FACTORY,factory);
                        if (ldapServerUrl!=null) // this should not be needed
                            env.put(Context.PROVIDER_URL, ldapServerUrl);
                        if (ldapUser!=null) // this is needed when LDAP is used
                            env.put(Context.SECURITY_PRINCIPAL, ldapUser);
                        if (ldapPasswd != null) // this is needed when LDAP is used
                            env.put(Context.SECURITY_CREDENTIALS, ldapPasswd);
    
                        try {
                            c1.connect(env);
                        } catch (IOException x) {
                            System.err.println("Connection failed: " + x);
                            x.printStackTrace(System.err);
                            continue;
                        }
    
                        // Obtém MBeanServerConnection
                        //
                        MBeanServerConnection conn =
                            c1.getMBeanServerConnection();
                        debug("Connection is:" + conn);
                        System.out.println("Server domain is: " +
                                           conn.getDefaultDomain());
    
                        // Lista todos os MBeans
                        //
                        try {
                            listMBeans(conn);
                        } catch (IOException x) {
                            System.err.println("Failed to list MBeans: " + x);
                            x.printStackTrace(System.err);
                        }
    
                        // Fecha o conector
                        //
                        try {
                            c1.close();
                        } catch (IOException x) {
                            System.err.println("Failed to close connection: " + x);
                            x.printStackTrace(System.err);
                        }
                    }
                }
            } catch (Exception x) {
                System.err.println("Unexpected exception caught in main: " + x);
                x.printStackTrace(System.err);
            }
        }
    }
    
```

### examples/Lookup/ldap/jmx-schema.txt
```
    -- Esquema LDAP para Lookup JSR 160
    -- ------------------------------
    
    -- Tipos de Atributo:
    -----------------
    
    -- O atributo jmxServiceURL é uma String IA5
    
    ( 1.3.6.1.4.1.42.2.27.11.1.1 NAME 'jmxServiceURL' 
      DESC 'Representação em String de uma JMX Service URL' 
      SYNTAX 1.3.6.1.4.1.1466.115.121.1.26 
      SINGLE-VALUE )
    
    -- O atributo jmxAgentName é uma String IA5
    
    ( 1.3.6.1.4.1.42.2.27.11.1.2 NAME 'jmxAgentName' 
      DESC 'Nome do JMX Agent' 
      SYNTAX 1.3.6.1.4.1.1466.115.121.1.26 
      SINGLE-VALUE )
    
    -- O atributo jmxProtocolType é uma String IA5
    
    ( 1.3.6.1.4.1.42.2.27.11.1.3 NAME 'jmxProtocolType' 
      DESC 'Protocolo usado pelo conector registrado' 
      SYNTAX 1.3.6.1.4.1.1466.115.121.1.26 
      SINGLE-VALUE )
    
    -- O atributo jmxAgentHost é uma String IA5
    
    ( 1.3.6.1.4.1.42.2.27.11.1.4 NAME 'jmxAgentHost' 
      DESC 'Nomes ou Endereços IP do host onde o agente está em execução. 
            Quando múltiplos valores são fornecidos, eles devem ser aliases para o mesmo host.'
      SYNTAX 1.3.6.1.4.1.1466.115.121.1.26  )
    
    -- O atributo jmxProperty é uma String IA5
    
    ( 1.3.6.1.4.1.42.2.27.11.1.5 NAME 'jmxProperty' 
      DESC 'Propriedade tipo Java que caracteriza o objeto registrado. 
            O formato de cada valor deve ser: "<nome-da-propriedade>=<valor>". 
            Por exemplo: "com.sun.jmx.remote.tcp.timeout=200"' 
      SYNTAX 1.3.6.1.4.1.1466.115.121.1.26 )
    
    -- O atributo jmxExpirationDate é um Generalized Time
    -- veja [RFC 2252] - ou X.208 para uma descrição de
    -- Generalized Time
    
    ( 1.3.6.1.4.1.42.2.27.11.1.6 NAME 'jmxExpirationDate' 
      DESC 'Data em que a JMX Service URL será considerada obsoleta 
            e poderá ser removida da árvore de diretórios' 
      SYNTAX 1.3.6.1.4.1.1466.115.121.1.24 
      SINGLE-VALUE )
    
    
    -- Classes de Objeto:
    -----------------
    
    -- Classe jmxConnector - representa um JMX Connector.
    -- deve conter a JMX Service URL
    -- e o JMX Agent Name
    
    ( 1.3.6.1.4.1.42.2.27.11.2.1 NAME 'jmxConnector' 
      DESC  'Uma classe que representa um JMX Connector, e contendo uma 
             JMX Service URL. A jmxServiceURL não está presente se o servidor 
             não estiver aceitando conexões' 
      AUXILIARY 
      MUST  ( jmxAgentName  ) 
      MAY   ( jmxServiceURL $ jmxAgentHost $ jmxProtocolType $ jmxProperty $ 
              jmxExpirationDate $ description ) )
    
    
```

### examples/Lookup/ldap/60jmx-schema.ldif
```
    dn: cn=schema
    attributeTypes: ( 1.3.6.1.4.1.42.2.27.11.1.1 NAME 'jmxServiceURL' 
         DESC 'Representação em String de uma JMX Service URL'
         SYNTAX 1.3.6.1.4.1.1466.115.121.1.26 
         SINGLE-VALUE )
    attributeTypes: ( 1.3.6.1.4.1.42.2.27.11.1.2 NAME 'jmxAgentName' 
         DESC 'Nome do JMX Agent' 
         SYNTAX 1.3.6.1.4.1.1466.115.121.1.26 
         SINGLE-VALUE )
    attributeTypes: ( 1.3.6.1.4.1.42.2.27.11.1.3 NAME 'jmxProtocolType' 
         DESC 'Protocolo usado pelo conector registrado'
         SYNTAX 1.3.6.1.4.1.1466.115.121.1.26 
         SINGLE-VALUE )
    attributeTypes: ( 1.3.6.1.4.1.42.2.27.11.1.4 NAME 'jmxAgentHost' 
         DESC 'Nomes ou Endereços IP do host onde o agente está em execução. 
      Quando múltiplos valores são fornecidos, eles devem ser aliases para o mesmo host.'
         SYNTAX 1.3.6.1.4.1.1466.115.121.1.26 )
    attributeTypes: ( 1.3.6.1.4.1.42.2.27.11.1.5 NAME 'jmxProperty' 
         DESC 'Propriedade tipo Java que caracteriza o objeto registrado. 
      O formato de cada valor deve ser: "<nome-da-propriedade>=<valor>". 
      Por exemplo: "com.sun.jmx.remote.tcp.timeout=200"'
         SYNTAX 1.3.6.1.4.1.1466.115.121.1.26 )
    attributeTypes: ( 1.3.6.1.4.1.42.2.27.11.1.6 NAME 'jmxExpirationDate' 
         DESC 'Data em que a JMX Service URL será considerada 
      obsoleta e poderá ser removida da árvore de diretórios'
         SYNTAX 1.3.6.1.4.1.1466.115.121.1.24 
         SINGLE-VALUE )
    objectClasses: ( 1.3.6.1.4.1.42.2.27.11.2.1 NAME 'jmxConnector'
         DESC  'Uma classe que representa um JMX Connector, e contendo uma 
      JMX Service URL. A jmxServiceURL não está presente se o servidor não estiver 
      aceitando conexões'
         AUXILIARY
         MUST  ( jmxAgentName  ) 
         MAY   ( jmxServiceURL $ jmxAgentHost $ jmxProtocolType $ 
                 jmxProperty $ jmxExpirationDate $ description ) )
    
```