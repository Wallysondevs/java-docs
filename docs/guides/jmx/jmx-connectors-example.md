# Conectores JMX

## 18 Conectores JMX

Este exemplo fornece uma implementação de amostra de como conectar-se a MBeans e realizar operações neles remotamente. O código-fonte contido nesta seção é usado para criar os arquivos correspondentes no diretório `examples/` especificado no procedimento de configuração apropriado e inclui:

  * README file
  * Server
  * SimpleStandardMBean
  * SimpleStandard
  * SimpleDynamic
  * ClientListener
  * Client

### examples/Basic/README
```
    #
    # Copyright (c) 2004, Oracle e/ou suas afiliadas. Todos os direitos reservados.
    # PROPRIETÁRIO/CONFIDENCIAL DA ORACLE. O uso está sujeito aos termos da licença.
    #
    
    # ==============================================================================
    # 
    #  Exemplo de Tutorial JMX
    #
    #  O objetivo deste exemplo é demonstrar o uso básico da tecnologia JMX. Ele
    #  mostra o uso de MBeans padrão e dinâmicos, e como realizar operações
    #  localmente e remotamente, através do conector RMI. Neste exemplo, tanto o
    #  SimpleStandard MBean quanto o SimpleDynamic MBean expõem a mesma interface de
    #  gerenciamento.
    #
    # ==============================================================================
    #
    # Para compilar e executar o exemplo, faça uma cópia deste arquivo README e,
    # em seguida, simplesmente recorte e cole todos os comandos conforme necessário
    # em uma janela de terminal.
    #
    # Este README assume que você está executando sob Java SE 6 em Unix,
    # que você está familiarizado com a tecnologia JMX e com a sintaxe do
    # bourne shell ou korn shell.
    #
    # Todos os comandos abaixo são definidos usando a sintaxe do korn shell do Unix.
    #
    # Se você não estiver executando Unix e korn shell, espera-se que você seja capaz de
    # adaptar esses comandos ao seu sistema operacional e ambiente de shell favoritos.
    #
    
    # Compilar classes Java
    #
    # * Server.java: cria um MBeanServer,
    #                registra um SimpleStandard MBean no MBeanServer local,
    #                registra um SimpleDynamic MBean no MBeanServer local,
    #                realiza operações locais em ambos os MBeans,
    #                cria e inicia um RMI connector server (JRMP).
    #
    # * Client.java: cria um RMI connector (JRMP),
    #                registra um SimpleStandard MBean no MBeanServer remoto,
    #                registra um SimpleDynamic MBean no MBeanServer remoto,
    #                realiza operações remotas em ambos os MBeans,
    #                fecha o RMI connector.
    #
    # * ClientListener.java: implementa um listener de notificação genérico.
    #
    # * SimpleStandard.java: implementa o Simple standard MBean.
    #
    # * SimpleStandardMBean.java: a interface de gerenciamento exposta
    #                             pelo Simple standard MBean.
    #
    # * SimpleDynamic.java: implementa o Simple dynamic MBean.
    #
    
    javac *.java
    
    # Iniciar o RMI registry:
    #
    
    rmiregistry 9999 &
    
    # Iniciar o Server (siga os passos de execução do server
    #                   até que ele solicite que você inicie o
    #                   client em uma janela de shell diferente)
    #
    
    java -classpath . Server
    
    # Iniciar o Client (em uma janela de shell diferente)
    #
    
    java -classpath . Client
    
    # ==============================================================================
    
```

### examples/Basic/Server.java
```java
    /*
     * Copyright (c) 2004, Oracle e/ou suas afiliadas. Todos os direitos reservados.
     *
     * A redistribuição e o uso nas formas de código-fonte e binária, com ou sem
     * modificações, são permitidos desde que as seguintes condições sejam atendidas:
     *
     *   - As redistribuições do código-fonte devem reter o aviso de copyright acima,
     *     esta lista de condições e a seguinte isenção de responsabilidade.
     *
     *   - As redistribuições em formato binário devem reproduzir o aviso de copyright acima,
     *     esta lista de condições e a seguinte isenção de responsabilidade na
     *     documentação e/ou outros materiais fornecidos com a distribuição.
     *
     *   - Nem o nome da Oracle nem os nomes de seus
     *     contribuidores podem ser usados para endossar ou promover produtos derivados
     *     deste software sem permissão prévia por escrito específica.
     *
     * ESTE SOFTWARE É FORNECIDO PELOS DETENTORES DOS DIREITOS AUTORAIS E CONTRIBUIDORES "COMO
     * ESTÁ" E QUAISQUER GARANTIAS EXPRESSAS OU IMPLÍCITAS, INCLUINDO, MAS NÃO SE LIMITANDO A,
     * AS GARANTIAS IMPLÍCITAS DE COMERCIALIZAÇÃO E ADEQUAÇÃO A UM PROPÓSITO ESPECÍFICO SÃO
     * REJEITADAS. EM NENHUM CASO O PROPRIETÁRIO DOS DIREITOS AUTORAIS OU OS
     * CONTRIBUIDORES SERÃO RESPONSÁVEIS POR QUAISQUER DANOS DIRETOS, INDIRETOS, INCIDENTAIS,
     * ESPECIAIS, EXEMPLARES OU CONSEQUENCIAIS (INCLUINDO, MAS NÃO SE LIMITANDO A,
     * AQUISIÇÃO DE BENS OU SERVIÇOS SUBSTITUTOS; PERDA DE USO, DADOS OU LUCROS;
     * OU INTERRUPÇÃO DE NEGÓCIOS) CAUSADOS E EM QUALQUER TEORIA DE
     * RESPONSABILIDADE, SEJA EM CONTRATO, RESPONSABILIDADE ESTRITA OU ATO ILÍCITO (INCLUINDO
     * NEGLIGÊNCIA OU OUTRO) DECORRENTES DE QUALQUER FORMA DO USO DESTE
     * SOFTWARE, MESMO QUE AVISADO DA POSSIBILIDADE DE TAIS DANOS.
     */ 
    
    import java.io.IOException;
    import javax.management.Attribute;
    import javax.management.MBeanAttributeInfo;
    import javax.management.MBeanConstructorInfo;
    import javax.management.MBeanInfo;
    import javax.management.MBeanNotificationInfo;
    import javax.management.MBeanOperationInfo;
    import javax.management.MBeanServer;
    import javax.management.MBeanServerFactory;
    import javax.management.ObjectName;
    import javax.management.remote.JMXConnectorServer;
    import javax.management.remote.JMXConnectorServerFactory;
    import javax.management.remote.JMXServiceURL;
    
    public class Server {
    
        public static void main(String[] args) {
            try {
                // Instanciar o MBean server
                //
                echo("\n>>> Criar o MBean server");
                MBeanServer mbs = MBeanServerFactory.createMBeanServer();
                waitForEnterPressed();
    
                // Obter domain padrão
                //
                echo("\n>>> Obter o domain padrão do MBean server");
                String domain = mbs.getDefaultDomain();
                echo("\tDomain Padrão = " + domain);
                waitForEnterPressed();
    
                // Criar e registrar o SimpleStandard MBean
                //
                String mbeanClassName = "SimpleStandard";
                String mbeanObjectNameStr =
                    domain + ":type=" + mbeanClassName + ",name=1";
                ObjectName mbeanObjectName =
                    createSimpleMBean(mbs, mbeanClassName, mbeanObjectNameStr);
                waitForEnterPressed();
    
                // Obter e exibir as informações de gerenciamento expostas pelo
                // SimpleStandard MBean
                //
                printMBeanInfo(mbs, mbeanObjectName, mbeanClassName);
                waitForEnterPressed();
    
                // Gerenciar o SimpleStandard MBean
                //
                manageSimpleMBean(mbs, mbeanObjectName, mbeanClassName);
                waitForEnterPressed();
    
                // Criar e registrar o SimpleDynamic MBean
                //
                mbeanClassName = "SimpleDynamic";
                mbeanObjectNameStr =
                    domain + ":type=" + mbeanClassName + ",name=1";
                mbeanObjectName =
                    createSimpleMBean(mbs, mbeanClassName, mbeanObjectNameStr);
                waitForEnterPressed();
    
                // Obter e exibir as informações de gerenciamento expostas pelo
                // SimpleDynamic MBean
                //
                printMBeanInfo(mbs, mbeanObjectName, mbeanClassName);
                waitForEnterPressed();
    
                // Gerenciar o SimpleDynamic MBean
                //
                manageSimpleMBean(mbs, mbeanObjectName, mbeanClassName);
                waitForEnterPressed();
    
                // Criar um RMI connector server
                //
                echo("\nCriar um RMI connector server");
                JMXServiceURL url = new JMXServiceURL(
                          "service:jmx:rmi:///jndi/rmi://localhost:9999/server");
                JMXConnectorServer cs =
                    JMXConnectorServerFactory.newJMXConnectorServer(url, null, mbs);
    
                // Iniciar o RMI connector server
                //
                echo("\nIniciar o RMI connector server");
                cs.start();
                echo("\nO RMI connector server foi iniciado com sucesso");
                echo("e está pronto para lidar com conexões de entrada");
                echo("\nInicie o client em uma janela diferente e");
                echo("pressione <Enter> assim que o client terminar");
                waitForEnterPressed();
    
                // Parar o RMI connector server
                //
                echo("\nParar o RMI connector server");
                cs.stop();
                System.out.println("\nTchau! Tchau!");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    
        private static ObjectName createSimpleMBean(MBeanServer mbs,
                                                    String mbeanClassName,
                                                    String mbeanObjectNameStr) {
            echo("\n>>> Criar o " + mbeanClassName +
                 " MBean dentro do MBeanServer");
            echo("\tObjectName = " + mbeanObjectNameStr);
            try {
                ObjectName mbeanObjectName =
                    ObjectName.getInstance(mbeanObjectNameStr);
                mbs.createMBean(mbeanClassName, mbeanObjectName);
                return mbeanObjectName;
            } catch (Exception e) {
                echo("\t!!! Não foi possível criar o " + mbeanClassName + " MBean !!!");
                e.printStackTrace();
                echo("\nSAINDO...\n");
                System.exit(1);
            }
            return null;
        }
    
        private static void printMBeanInfo(MBeanServer mbs,
                                           ObjectName mbeanObjectName,
                                           String mbeanClassName) {
            echo("\n>>> Recuperar as informações de gerenciamento para o " +
                 mbeanClassName);
            echo("    MBean usando o método getMBeanInfo() do MBeanServer");
            MBeanInfo info = null;
            try {
                info = mbs.getMBeanInfo(mbeanObjectName);
            } catch (Exception e) {
                echo("\t!!! Não foi possível obter o objeto MBeanInfo para " +
                     mbeanClassName +" !!!");
                e.printStackTrace();
                return;
            }
            echo("\nCLASSNAME: \t" + info.getClassName());
            echo("\nDESCRIÇÃO: \t" + info.getDescription());
            echo("\nATRIBUTOS");
            MBeanAttributeInfo[] attrInfo = info.getAttributes();
            if (attrInfo.length > 0) {
                for (int i = 0; i < attrInfo.length; i++) {
                    echo(" ** NOME: \t" + attrInfo[i].getName());
                    echo("    DESCR: \t" + attrInfo[i].getDescription());
                    echo("    TIPO: \t" + attrInfo[i].getType() +
                         "\tLEITURA: "+ attrInfo[i].isReadable() +
                         "\tESCRITA: "+ attrInfo[i].isWritable());
                }
            } else echo(" ** Nenhum atributo **");
            echo("\nCONSTRUTORES");
            MBeanConstructorInfo[] constrInfo = info.getConstructors();
            for (int i=0; i<constrInfo.length; i++) {
                echo(" ** NOME: \t" + constrInfo[i].getName());
                echo("    DESCR: \t" + constrInfo[i].getDescription());
                echo("    PARAM: \t" + constrInfo[i].getSignature().length +
                     " parâmetro(s)");
            }
            echo("\nOPERAÇÕES");
            MBeanOperationInfo[] opInfo = info.getOperations();
            if (opInfo.length > 0) {
                for (int i = 0; i < opInfo.length; i++) {
                    echo(" ** NOME: \t" + opInfo[i].getName());
                    echo("    DESCR: \t" + opInfo[i].getDescription());
                    echo("    PARAM: \t" + opInfo[i].getSignature().length +
                         " parâmetro(s)");
                }
            } else echo(" ** Nenhuma operação ** ");
            echo("\nNOTIFICAÇÕES");
            MBeanNotificationInfo[] notifInfo = info.getNotifications();
            if (notifInfo.length > 0) {
                for (int i = 0; i < notifInfo.length; i++) {
                    echo(" ** NOME: \t" + notifInfo[i].getName());
                    echo("    DESCR: \t" + notifInfo[i].getDescription());
                    String notifTypes[] = notifInfo[i].getNotifTypes();
                    for (int j = 0; j < notifTypes.length; j++) {
                        echo("    TIPO: \t" + notifTypes[j]);
                    }
                }
            } else echo(" ** Nenhuma notificação **");
        }
    
        private static void manageSimpleMBean(MBeanServer mbs,
                                              ObjectName mbeanObjectName,
                                              String mbeanClassName) {
    
            echo("\n>>> Gerenciar o " + mbeanClassName +
                 " MBean usando seus atributos ");
            echo("    e operações expostas para gerenciamento");
    
            try {
                // Obter valores de atributo
                printSimpleAttributes(mbs, mbeanObjectName);
    
                // Alterar atributo State
                echo("\n    Definindo o atributo State para o valor \"new state\"...");
                Attribute stateAttribute = new Attribute("State","new state");
                mbs.setAttribute(mbeanObjectName, stateAttribute);
    
                // Obter valores de atributo
                printSimpleAttributes(mbs, mbeanObjectName);
    
                // Invocando a operação reset
                echo("\n    Invocando a operação reset...");
                mbs.invoke(mbeanObjectName, "reset", null, null);
    
                // Obter valores de atributo
                printSimpleAttributes(mbs, mbeanObjectName);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    
        private static void printSimpleAttributes(MBeanServer mbs,
                                                  ObjectName mbeanObjectName) {
            try {
                echo("\n    Obtendo valores de atributo:");
                String State = (String) mbs.getAttribute(mbeanObjectName, "State");
                Integer NbChanges =
                    (Integer) mbs.getAttribute(mbeanObjectName,"NbChanges");
                echo("\tState     = \"" + State + "\"");
                echo("\tNbChanges = " + NbChanges);
            } catch (Exception e) {
                echo("\t!!! Não foi possível ler os atributos !!!");
                e.printStackTrace();
            }
        }
    
        private static void echo(String msg) {
            System.out.println(msg);
        }
    
        private static void sleep(int millis) {
            try {
                Thread.sleep(millis);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    
        private static void waitForEnterPressed() {
            try {
                echo("\nPressione <Enter> para continuar...");
                System.in.read();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    
```

### examples/Basic/SimpleStandardMBean.java
```java
    /*
     * Copyright (c) 2004, Oracle e/ou suas afiliadas. Todos os direitos reservados.
     *
     * A redistribuição e o uso nas formas de código-fonte e binária, com ou sem
     * modificações, são permitidos desde que as seguintes condições sejam atendidas:
     *
     *   - As redistribuições do código-fonte devem reter o aviso de copyright acima,
     *     esta lista de condições e a seguinte isenção de responsabilidade.
     *
     *   - As redistribuições em formato binário devem reproduzir o aviso de copyright acima,
     *     esta lista de condições e a seguinte isenção de responsabilidade na
     *     documentação e/ou outros materiais fornecidos com a distribuição.
     *
     *   - Nem o nome da Oracle nem os nomes de seus
     *     contribuidores podem ser usados para endossar ou promover produtos derivados
     *     deste software sem permissão prévia por escrito específica.
     *
     * ESTE SOFTWARE É FORNECIDO PELOS DETENTORES DOS DIREITOS AUTORAIS E CONTRIBUIDORES "COMO
     * ESTÁ" E QUAISQUER GARANTIAS EXPRESSAS OU IMPLÍCITAS, INCLUINDO, MAS NÃO SE LIMITANDO A,
     * AS GARANTIAS IMPLÍCITAS DE COMERCIALIZAÇÃO E ADEQUAÇÃO A UM PROPÓSITO ESPECÍFICO SÃO
     * REJEITADAS. EM NENHUM CASO O PROPRIETÁRIO DOS DIREITOS AUTORAIS OU OS
     * CONTRIBUIDORES SERÃO RESPONSÁVEIS POR QUAISQUER DANOS DIRETOS, INDIRETOS, INCIDENTAIS,
     * ESPECIAIS, EXEMPLARES OU CONSEQUENCIAIS (INCLUINDO, MAS NÃO SE LIMITANDO A,
     * AQUISIÇÃO DE BENS OU SERVIÇOS SUBSTITUTOS; PERDA DE USO, DADOS OU LUCROS;
     * OU INTERRUPÇÃO DE NEGÓCIOS) CAUSADOS E EM QUALQUER TEORIA DE
     * RESPONSABILIDADE, SEJA EM CONTRATO, RESPONSABILIDADE ESTRITA OU ATO ILÍCITO (INCLUINDO
     * NEGLIGÊNCIA OU OUTRO) DECORRENTES DE QUALQUER FORMA DO USO DESTE
     * SOFTWARE, MESMO QUE AVISADO DA POSSIBILIDADE DE TAIS DANOS.
     */ 
    
    /**
     * Esta é a interface de gerenciamento explicitamente definida para o
     * MBean padrão "SimpleStandard".
     *
     * O MBean padrão "SimpleStandard" implementa esta interface
     * para ser gerenciável através de um JMX agent.
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

### examples/Basic/SimpleStandard.java
```java
    /*
     * Copyright (c) 2004, Oracle e/ou suas afiliadas. Todos os direitos reservados.
     *
     * A redistribuição e o uso nas formas de código-fonte e binária, com ou sem
     * modificações, são permitidos desde que as seguintes condições sejam atendidas:
     *
     *   - As redistribuições do código-fonte devem reter o aviso de copyright acima,
     *     esta lista de condições e a seguinte isenção de responsabilidade.
     *
     *   - As redistribuições em formato binário devem reproduzir o aviso de copyright acima,
     *     esta lista de condições e a seguinte isenção de responsabilidade na
     *     documentação e/ou outros materiais fornecidos com a distribuição.
     *
     *   - Nem o nome da Oracle nem os nomes de seus
     *     contribuidores podem ser usados para endossar ou promover produtos derivados
     *     deste software sem permissão prévia por escrito específica.
     *
     * ESTE SOFTWARE É FORNECIDO PELOS DETENTORES DOS DIREITOS AUTORAIS E CONTRIBUIDORES "COMO
     * ESTÁ" E QUAISQUER GARANTIAS EXPRESSAS OU IMPLÍCITAS, INCLUINDO, MAS NÃO SE LIMITANDO A,
     * AS GARANTIAS IMPLÍCITAS DE COMERCIALIZAÇÃO E ADEQUAÇÃO A UM PROPÓSITO ESPECÍFICO SÃO
     * REJEITADAS. EM NENHUM CASO O PROPRIETÁRIO DOS DIREITOS AUTORAIS OU OS
     * CONTRIBUIDORES SERÃO RESPONSÁVEIS POR QUAISQUER DANOS DIRETOS, INDIRETOS, INCIDENTAIS,
     * ESPECIAIS, EXEMPLARES OU CONSEQUENCIAIS (INCLUINDO, MAS NÃO SE LIMITANDO A,
     * AQUISIÇÃO DE BENS OU SERVIÇOS SUBSTITUTOS; PERDA DE USO, DADOS OU LUCROS;
     * OU INTERRUPÇÃO DE NEGÓCIOS) CAUSADOS E EM QUALQUER TEORIA DE
     * RESPONSABILIDADE, SEJA EM CONTRATO, RESPONSABILIDADE ESTRITA OU ATO ILÍCITO (INCLUINDO
     * NEGLIGÊNCIA OU OUTRO) DECORRENTES DE QUALQUER FORMA DO USO DESTE
     * SOFTWARE, MESMO QUE AVISADO DA POSSIBILIDADE DE TAIS DANOS.
     */ 
    
    /**
     * Definição simples de um MBean padrão, nomeado "SimpleStandard".
     *
     * O MBean padrão "SimpleStandard" mostra como expor atributos
     * e operações para gerenciamento, implementando sua interface de
     * gerenciamento "SimpleStandardMBean" correspondente.
     *
     * Este MBean possui dois atributos e uma operação expostos
     * para gerenciamento por um JMX agent:
     *      - o atributo de leitura/escrita "State",
     *      - o atributo somente leitura "NbChanges",
     *      - a operação "reset()".
     *
     * Este objeto também possui uma propriedade e um método não expostos
     * para gerenciamento por um JMX agent:
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
                                                "NbChanges redefinido",
                                                "NbChanges",
                                                "Integer",
                                                new Integer(nbChanges),
                                                new Integer(0));
            state = "estado inicial";
            nbChanges = 0;
            nbResets++;
            sendNotification(acn);
        }
    
        /*
         * -----------------------------------------------------
         * MÉTODO NÃO EXPOSTO PARA GERENCIAMENTO POR UM JMX AGENT
         * -----------------------------------------------------
         */
    
        /**
         * Retorna a propriedade "NbResets".
         * Este método não é um Getter no sentido JMX porque
         * não é exposto na interface "SimpleStandardMBean".
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
         * @return o array de notificações possíveis.
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
         * ATRIBUTOS ACESSÍVEIS PARA GERENCIAMENTO POR UM JMX AGENT
         * -----------------------------------------------------
         */
    
        private String state = "estado inicial";
        private int nbChanges = 0;
    
        /*
         * -----------------------------------------------------
         * PROPRIEDADE NÃO ACESSÍVEL PARA GERENCIAMENTO POR UM JMX AGENT
         * -----------------------------------------------------
         */
    
        private int nbResets = 0;
    }
    
```

### examples/Basic/SimpleDynamic.java
```java
    /*
     * Copyright (c) 2004, Oracle e/ou suas afiliadas. Todos os direitos reservados.
     *
     * A redistribuição e o uso nas formas de código-fonte e binária, com ou sem
     * modificações, são permitidos desde que as seguintes condições sejam atendidas:
     *
     *   - As redistribuições do código-fonte devem reter o aviso de copyright acima,
     *     esta lista de condições e a seguinte isenção de responsabilidade.
     *
     *   - As redistribuições em formato binário devem reproduzir o aviso de copyright acima,
     *     esta lista de condições e a seguinte isenção de responsabilidade na
     *     documentação e/ou outros materiais fornecidos com a distribuição.
     *
     *   - Nem o nome da Oracle nem os nomes de seus
     *     contribuidores podem ser usados para endossar ou promover produtos derivados
     *     deste software sem permissão prévia por escrito específica.
     *
     * ESTE SOFTWARE É FORNECIDO PELOS DETENTORES DOS DIREITOS AUTORAIS E CONTRIBUIDORES "COMO
     * ESTÁ" E QUAISQUER GARANTIAS EXPRESSAS OU IMPLÍCITAS, INCLUINDO, MAS NÃO SE LIMITANDO A,
     * AS GARANTIAS IMPLÍCITAS DE COMERCIALIZAÇÃO E ADEQUAÇÃO A UM PROPÓSITO ESPECÍFICO SÃO
     * REJEITADAS. EM NENHUM CASO O PROPRIETÁRIO DOS DIREITOS AUTORAIS OU OS
     * CONTRIBUIDORES SERÃO RESPONSÁVEIS POR QUAISQUER DANOS DIRETOS, INDIRETOS, INCIDENTAIS,
     * ESPECIAIS, EXEMPLARES OU CONSEQUENCIAIS (INCLUINDO, MAS NÃO SE LIMITANDO A,
     * AQUISIÇÃO DE BENS OU SERVIÇOS SUBSTITUTOS; PERDA DE USO, DADOS OU LUCROS;
     * OU INTERRUPÇÃO DE NEGÓCIOS) CAUSADOS E EM QUALQUER TEORIA DE
     * RESPONSABILIDADE, SEJA EM CONTRATO, RESPONSABILIDADE ESTRITA OU ATO ILÍCITO (INCLUINDO
     * NEGLIGÊNCIA OU OUTRO) DECORRENTES DE QUALQUER FORMA DO USO DESTE
     * SOFTWARE, MESMO QUE AVISADO DA POSSIBILIDADE DE TAIS DANOS.
     */ 
    
    /**
     * Definição simples de um MBean dinâmico, nomeado "SimpleDynamic".
     *
     * O MBean dinâmico "SimpleDynamic" mostra como expor atributos
     * e operações para gerenciamento, em tempo de execução, implementando a
     * interface "javax.management.DynamicMBean".
     *
     * Este MBean expõe para gerenciamento dois atributos e uma operação:
     *      - o atributo de leitura/escrita "State",
     *      - o atributo somente leitura "NbChanges",
     *      - a operação "reset()".
     * Ele faz isso colocando essas informações em um objeto MBeanInfo que
     * é retornado pelo método getMBeanInfo() da interface DynamicMBean.
     *
     * Ele implementa o acesso aos seus atributos através dos métodos getAttribute(),
     * getAttributes(), setAttribute() e setAttributes() da
     * interface DynamicMBean.
     *
     * Ele implementa a invocação de sua operação reset() através do
     * método invoke() da interface DynamicMBean.
     *
     * Note que, como "SimpleDynamic" define explicitamente um construtor,
     * este construtor deve ser público e exposto para gerenciamento através
     * do objeto MBeanInfo.
     */
    
    import java.lang.reflect.Constructor;
    import java.util.Iterator;
    import javax.management.*;
    
    public class SimpleDynamic
        extends NotificationBroadcasterSupport
        implements DynamicMBean {
    
        /*
         * -----------------------------------------------------
         * CONSTRUTORES
         * -----------------------------------------------------
         */
    
        public SimpleDynamic() {
            // Construir as informações de gerenciamento a serem expostas pelo MBean dinâmico
            //
            buildDynamicMBeanInfo();
        }
    
        /*
         * -----------------------------------------------------
         * IMPLEMENTAÇÃO DA INTERFACE DynamicMBean
         * -----------------------------------------------------
         */
    
        /**
         * Permite que o valor do atributo especificado do Dynamic MBean seja
         * obtido.
         */
        public Object getAttribute(String attribute_name)
            throws AttributeNotFoundException,
                   MBeanException,
                   ReflectionException {
    
            // Verificar se attribute_name não é null para evitar NullPointerException
            // mais tarde
            //
            if (attribute_name == null) {
                throw new RuntimeOperationsException(
                      new IllegalArgumentException("O nome do atributo não pode ser null"),
                      "Não é possível invocar um getter de " + dClassName +
                      " com nome de atributo null");
            }
            // Verificar por um attribute_name reconhecido e chamar o
            // getter correspondente
            //
            if (attribute_name.equals("State")) {
                return getState();
            }
            if (attribute_name.equals("NbChanges")) {
                return getNbChanges();
            }
            // Se attribute_name não foi reconhecido, lançar uma
            // AttributeNotFoundException
            //
            throw new AttributeNotFoundException("Não foi possível encontrar o " +
                                                 attribute_name +
                                                 " atributo em " +
                                                 dClassName);
        }
    
        /**
         * Define o valor do atributo especificado do Dynamic MBean.
         */
        public void setAttribute(Attribute attribute)
            throws AttributeNotFoundException,
                   InvalidAttributeValueException,
                   MBeanException,
                   ReflectionException {
    
            // Verificar se attribute não é null para evitar NullPointerException mais tarde
            //
            if (attribute == null) {
                throw new RuntimeOperationsException(
                      new IllegalArgumentException("O atributo não pode ser null"),
                      "Não é possível invocar um setter de " + dClassName +
                      " com atributo null");
            }
            String name = attribute.getName();
            Object value = attribute.getValue();
            if (name == null) {
                throw new RuntimeOperationsException(
                      new IllegalArgumentException("O nome do atributo não pode ser null"),
                      "Não é possível invocar o setter de " + dClassName +
                      " com nome de atributo null");
```
```java
            }
            // Verifica se há um nome de atributo reconhecido e chama o
            // setter correspondente
            //
            if (name.equals("State")) {
                // se o valor for null, tenta verificar se o setter retorna alguma exceção
                if (value == null) {
                    try {
                        setState( null );
                    } catch (Exception e) {
                        throw new InvalidAttributeValueException(
                                  "Cannot set attribute " + name + " to null");
                    }
                }
                // se o valor não for null, garante que ele pode ser atribuído ao atributo
                else {
                    try {
                        if (Class.forName("java.lang.String").isAssignableFrom(
                                                              value.getClass())) {
                            setState((String) value);
                        } else {
                            throw new InvalidAttributeValueException(
                                      "Cannot set attribute " + name + " to a " +
                                      value.getClass().getName() +
                                      " object, String expected");
                        }
                    } catch (ClassNotFoundException e) {
                        e.printStackTrace();
                    }
                }
            }
            // reconhece uma tentativa de definir o atributo "NbChanges" (somente leitura):
            else if (name.equals("NbChanges")) {
                throw new AttributeNotFoundException(
                      "Cannot set attribute " + name + " because it is read-only");
            }
            // nome de atributo não reconhecido:
            else {
                throw new AttributeNotFoundException("Attribute " + name +
                                                     " not found in " +
                                                     this.getClass().getName());
            }
        }
    
        /**
         * Permite obter os valores de vários atributos do MBean Dinâmico.
         */
        public AttributeList getAttributes(String[] attributeNames) {
    
            // Verifica se attributeNames não é null para evitar NullPointerException
            // mais tarde
            //
            if (attributeNames == null) {
                throw new RuntimeOperationsException(
                    new IllegalArgumentException("attributeNames[] cannot be null"),
                    "Cannot invoke a getter of " + dClassName);
            }
            AttributeList resultList = new AttributeList();
    
            // Se attributeNames estiver vazio, retorna uma lista de resultados vazia
            //
            if (attributeNames.length == 0)
                return resultList;
    
            // Constrói a lista de atributos de resultado
            //
            for (int i = 0 ; i < attributeNames.length ; i++) {
                try {
                    Object value = getAttribute((String) attributeNames[i]);
                    resultList.add(new Attribute(attributeNames[i],value));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            return resultList;
        }
    
        /**
         * Define os valores de vários atributos do MBean Dinâmico e retorna
         * a lista de atributos que foram definidos.
         */
        public AttributeList setAttributes(AttributeList attributes) {
    
            // Verifica se attributes não é null para evitar NullPointerException mais tarde
            //
            if (attributes == null) {
                throw new RuntimeOperationsException(
                          new IllegalArgumentException(
                                     "AttributeList attributes cannot be null"),
                          "Cannot invoke a setter of " + dClassName);
            }
            AttributeList resultList = new AttributeList();
    
            // Se attributeNames estiver vazio, não há mais nada a fazer
            //
            if (attributes.isEmpty())
                return resultList;
    
            // Para cada atributo, tenta defini-lo e adiciona à lista de resultados se
            // for bem-sucedido
            //
            for (Iterator i = attributes.iterator(); i.hasNext();) {
                Attribute attr = (Attribute) i.next();
                try {
                    setAttribute(attr);
                    String name = attr.getName();
                    Object value = getAttribute(name);
                    resultList.add(new Attribute(name,value));
                } catch(Exception e) {
                    e.printStackTrace();
                }
            }
            return resultList;
        }
    
        /**
         * Permite que uma operação seja invocada no MBean Dinâmico.
         */
        public Object invoke(String operationName,
                             Object params[],
                             String signature[])
            throws MBeanException, ReflectionException {
    
            // Verifica se operationName não é null para evitar NullPointerException
            // mais tarde
            //
            if (operationName == null) {
                throw new RuntimeOperationsException(
                     new IllegalArgumentException("Operation name cannot be null"),
                     "Cannot invoke a null operation in " + dClassName);
            }
            // Verifica se há um nome de operação reconhecido e chama a
            // operação correspondente
            //
            if (operationName.equals("reset")) {
                reset();
                return null;
            } else {
                // Nome de operação não reconhecido
                //
                throw new ReflectionException(
                                    new NoSuchMethodException(operationName),
                                    "Cannot find the operation " + operationName +
                                    " in " + dClassName);
            }
        }
    
        /**
         * Este método fornece os atributos e operações expostos do
         * MBean Dinâmico. Ele fornece essas informações usando um objeto MBeanInfo.
         */
        public MBeanInfo getMBeanInfo() {
    
            // Retorna as informações que queremos expor para gerenciamento:
            // o campo privado dMBeanInfo foi construído no momento da instanciação
            //
            return dMBeanInfo;
        }
    
        /*
         * -----------------------------------------------------
         * OUTROS MÉTODOS PÚBLICOS
         * -----------------------------------------------------
         */
    
        /**
         * Getter: obtém o atributo "State" do MBean dinâmico "SimpleDynamic".
         */
        public String getState() {
            return state;
        }
    
        /**
         * Setter: define o atributo "State" do MBean dinâmico "SimpleDynamic".
         */
        public void setState(String s) {
            state = s;
            nbChanges++;
        }
    
        /**
         * Getter: obtém o atributo "NbChanges" do MBean dinâmico
         * "SimpleDynamic".
         */
        public Integer getNbChanges() {
            return new Integer(nbChanges);
        }
    
        /**
         * Operação: redefine para seus valores iniciais os atributos "State" e "NbChanges"
         * do MBean dinâmico "SimpleDynamic".
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
    
        /**
         * Retorna a propriedade "NbResets".
         * Este método não é um Getter no sentido JMX porque
         * ele não é retornado pelo método getMBeanInfo().
         */
        public Integer getNbResets() {
            return new Integer(nbResets);
        }
    
        /*
         * -----------------------------------------------------
         * MÉTODOS PRIVADOS
         * -----------------------------------------------------
         */
    
        /**
         * Constrói o campo privado dMBeanInfo,
         * que representa a interface de gerenciamento exposta pelo MBean,
         * ou seja, o conjunto de atributos, construtores, operações e
         * notificações que estão disponíveis para gerenciamento.
         *
         * Uma referência ao objeto dMBeanInfo é retornada pelo método getMBeanInfo()
         * da interface DynamicMBean. Observe que, uma vez construído, um
         * objeto MBeanInfo é imutável.
         */
        private void buildDynamicMBeanInfo() {
    
            dAttributes[0] =
                new MBeanAttributeInfo("State",
                                       "java.lang.String",
                                       "String de estado.",
                                       true,
                                       true,
                                       false);
            dAttributes[1] =
                new MBeanAttributeInfo("NbChanges",
                                       "java.lang.Integer",
                                       "Número de vezes que a " +
                                       "string de estado foi alterada.",
                                       true,
                                       false,
                                       false);
    
            Constructor[] constructors = this.getClass().getConstructors();
            dConstructors[0] =
                new MBeanConstructorInfo("Constrói um objeto " +
                                         "SimpleDynamic",
                                         constructors[0]);
    
            MBeanParameterInfo[] params = null;
            dOperations[0] =
                new MBeanOperationInfo("reset",
                                       "redefine os atributos State e NbChanges " +
                                       "para seus valores iniciais",
                                       params ,
                                       "void",
                                       MBeanOperationInfo.ACTION);
    
            dNotifications[0] =
                new MBeanNotificationInfo(
                new String[] { AttributeChangeNotification.ATTRIBUTE_CHANGE },
                AttributeChangeNotification.class.getName(),
                "Esta notificação é emitida quando o método reset() é chamado.");
    
            dMBeanInfo = new MBeanInfo(dClassName,
                                       dDescription,
                                       dAttributes,
                                       dConstructors,
                                       dOperations,
                                       dNotifications);
        }
    
        /*
         * -----------------------------------------------------
         * VARIÁVEIS PRIVADAS
         * -----------------------------------------------------
         */
    
        private String state = "initial state";
        private int nbChanges = 0;
        private int nbResets = 0;
    
        private String dClassName = this.getClass().getName();
        private String dDescription = "Implementação simples de um MBean dinâmico.";
    
        private MBeanAttributeInfo[] dAttributes =
            new MBeanAttributeInfo[2];
        private MBeanConstructorInfo[] dConstructors =
            new MBeanConstructorInfo[1];
        private MBeanNotificationInfo[] dNotifications =
            new MBeanNotificationInfo[1];
        private MBeanOperationInfo[] dOperations =
            new MBeanOperationInfo[1];
        private MBeanInfo dMBeanInfo = null;
    }
    
```

### examples/Basic/ClientListener.java
```java
    /*
     * Copyright (c) 2004, Oracle and/or its affiliates. All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted provided that the following conditions
     * are met:
     *
     *   - Redistributions of source code must retain the above copyright
     *     notice, this list of conditions and the following disclaimer.
     *
     *   - Redistributions in binary form must reproduce the above copyright
     *     notice, this list of conditions and the following disclaimer in the
     *     documentation and/or other materials provided with the distribution.
     *
     *   - Neither the name of Oracle or the names of its
     *     contributors may be used to endorse or promote products derived
     *     from this software without specific prior written permission.
     *
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
     * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
     * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
     * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
     * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
     * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
     * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
     * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
     * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
     * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
     * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     */ 
    
    import javax.management.Notification;
    import javax.management.NotificationListener;
    
    public class ClientListener implements NotificationListener {
        public void handleNotification(Notification notification, Object handback) {
            System.out.println("\nReceived notification: " + notification);
        }
    }
    
```

### examples/Basic/Client.java
```java
    /*
     * Copyright (c) 2004, Oracle and/or its affiliates. All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted provided that the following conditions
     * are met:
     *
     *   - Redistributions of source code must retain the above copyright
     *     notice, this list of conditions and the following disclaimer.
     *
     *   - Redistributions in binary form must reproduce the above copyright
     *     notice, this list of conditions and the following disclaimer in the
     *     documentation and/or other materials provided with the distribution.
     *
     *   - Neither the name of Oracle or the names of its
     *     contributors may be used to endorse or promote products derived
     *     from this software without specific prior written permission.
     *
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
     * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
     * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
     * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
     * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
     * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
     * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
     * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
     * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
     * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
     * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     */ 
    
    import java.io.IOException;
    import java.util.Iterator;
    import java.util.Set;
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
                // Cria um cliente conector RMI e
                // o conecta ao servidor conector RMI
                //
                echo("\nCria um cliente conector RMI e o conecta ao servidor conector RMI");
                JMXServiceURL url = new JMXServiceURL(
                          "service:jmx:rmi:///jndi/rmi://localhost:9999/server");
                JMXConnector jmxc = JMXConnectorFactory.connect(url, null);
    
                // Cria o listener
                //
                ClientListener listener = new ClientListener();
    
                // Obtém um MBeanServerConnection
                //
                echo("\nObtém um MBeanServerConnection");
                MBeanServerConnection mbsc = jmxc.getMBeanServerConnection();
                waitForEnterPressed();
    
                // Obtém os domínios do MBeanServer
                //
                echo("\nDomínios:");
                String domains[] = mbsc.getDomains();
                for (int i = 0; i < domains.length; i++) {
                    echo("\tDomínio[" + i + "] = " + domains[i]);
                }
                waitForEnterPressed();
    
                // Obtém o domínio padrão do MBeanServer
                //
                String domain = mbsc.getDefaultDomain();
    
                // Cria o MBean SimpleStandard
                //
                ObjectName stdMBeanName =
                    new ObjectName(domain +":type=SimpleStandard,name=2");
                echo("\nCria SimpleStandard MBean...");
                mbsc.createMBean("SimpleStandard", stdMBeanName, null, null);
                waitForEnterPressed();
    
                // Cria o MBean SimpleDynamic
                //
                ObjectName dynMBeanName =
                    new ObjectName(domain +":type=SimpleDynamic,name=2");
                echo("\nCria SimpleDynamic MBean...");
                mbsc.createMBean("SimpleDynamic", dynMBeanName, null, null);
                waitForEnterPressed();
    
                // Obtém a contagem de MBeans
                //
                echo("\nContagem de MBeans = " + mbsc.getMBeanCount());
    
                // Consulta nomes de MBeans
                //
                echo("\nConsulta MBeans do MBeanServer:");
                Set names = mbsc.queryNames(null, null);
                for (Iterator i = names.iterator(); i.hasNext(); ) {
                    echo("\tObjectName = " + (ObjectName) i.next());
                }
                waitForEnterPressed();
    
                // -------------------------------
                // Gerencia o MBean SimpleStandard
                // -------------------------------
                echo("\n>>> Realiza operações no MBean SimpleStandard <<<");
    
                // Obtém o atributo State no MBean SimpleStandard
                //
                echo("\nState = " + mbsc.getAttribute(stdMBeanName, "State"));
    
                // Define o atributo State no MBean SimpleStandard
                //
                mbsc.setAttribute(stdMBeanName,
                                  new Attribute("State", "changed state"));
    
                // Obtém o atributo State no MBean SimpleStandard
                //
                // Outra forma de interagir com um determinado MBean é através de um
                // proxy dedicado, em vez de ir diretamente pela conexão do servidor MBean
                //
                SimpleStandardMBean proxy = JMX.newMBeanProxy(
                        mbsc, stdMBeanName, SimpleStandardMBean.class, true);
                echo("\nState = " + proxy.getState());
    
                // Adiciona um notification listener no MBean SimpleStandard
                //
                echo("\nAdiciona notification listener...");
                mbsc.addNotificationListener(stdMBeanName, listener, null, null);
    
                // Invoca "reset" no MBean SimpleStandard
                //
                // Chamar "reset" faz com que o MBean SimpleStandard emita uma
                // notification que será recebida pelo ClientListener registrado.
                //
                echo("\nInvoca reset() no MBean SimpleStandard...");
                mbsc.invoke(stdMBeanName, "reset", null, null);
    
                // Aguarda 2 segundos para ter tempo de receber a
                // notification antes de remover o notification listener.
                //
                echo("\nAguardando notification...");
                sleep(2000);
    
                // Remove o notification listener no MBean SimpleStandard
                //
                echo("\nRemove notification listener...");
                mbsc.removeNotificationListener(stdMBeanName, listener);
    
                // Desregistra o MBean SimpleStandard
                //
                echo("\nDesregistra SimpleStandard MBean...");
                mbsc.unregisterMBean(stdMBeanName);
                waitForEnterPressed();
    
                // ------------------------------
                // Gerencia o MBean SimpleDynamic
                // ------------------------------
                echo("\n>>> Realiza operações no MBean SimpleDynamic <<<");
    
                // Obtém o atributo State no MBean SimpleDynamic
                //
                echo("\nState = " + mbsc.getAttribute(dynMBeanName, "State"));
    
                // Define o atributo State no MBean SimpleDynamic
                //
                mbsc.setAttribute(dynMBeanName,
                                  new Attribute("State", "changed state"));
    
                // Obtém o atributo State no MBean SimpleDynamic
                //
                echo("\nState = " +
                                   mbsc.getAttribute(dynMBeanName, "State"));
    
                // Adiciona um notification listener no MBean SimpleDynamic
                //
                echo("\nAdiciona notification listener...");
                mbsc.addNotificationListener(dynMBeanName, listener, null, null);
    
                // Invoca "reset" no MBean SimpleDynamic
                //
                // Chamar "reset" faz com que o MBean SimpleDynamic emita uma
                // notification que será recebida pelo ClientListener registrado.
                //
                echo("\nInvoca reset() no MBean SimpleDynamic...");
                mbsc.invoke(dynMBeanName, "reset", null, null);
    
                // Aguarda 2 segundos para ter tempo de receber a
                // notification antes de remover o notification listener.
                //
                echo("\nAguardando notification...");
                sleep(2000);
    
                // Remove o notification listener no MBean SimpleDynamic
                //
                echo("\nRemove notification listener...");
                mbsc.removeNotificationListener(dynMBeanName, listener);
    
                // Desregistra o MBean SimpleDynamic
                //
                echo("\nDesregistra SimpleDynamic MBean...");
                mbsc.unregisterMBean(dynMBeanName);
                waitForEnterPressed();
    
                // Fecha a conexão com o servidor
                //
                echo("\nFecha a conexão com o servidor");
                jmxc.close();
                echo("\nAté mais!");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    
        private static void echo(String msg) {
            System.out.println(msg);
        }
    
        private static void sleep(int millis) {
            try {
                Thread.sleep(millis);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    
        private static void waitForEnterPressed() {
            try {
                echo("\nPressione <Enter> para continuar...");
                System.in.read();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    
```