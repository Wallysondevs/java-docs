# Conectores JMX

## 11 Conectores JMX

Este capítulo apresenta os conceitos de beans de gerenciamento padrão e dinâmicos (MBeans) e mostra como usar a tecnologia JMX para realizar operações em MBeans, localmente e remotamente.

### Acessando MBeans Padrão e Dinâmicos Usando o Conector RMI

Este exemplo demonstra MBeans padrão e dinâmicos.

Conforme visto em [Fundamentos da API JMX](<#/doc/guides/jmx/essentials-jmx-api>), um MBean padrão define estaticamente sua interface de gerenciamento através dos nomes dos métodos que contém. Um MBean dinâmico implementa uma interface Java específica e revela seus atributos e operações em tempo de execução.

A tecnologia JMX define um conector baseado em Remote Method Invocation (RMI). O conector RMI suporta o transporte Java Remote Method Protocol (JRMP). Este conector permite que você se conecte a um MBean em um MBean server a partir de um local remoto e execute operações nele, exatamente como se as operações fossem realizadas localmente.

O objetivo deste exemplo é demonstrar a implementação de um MBean padrão e um MBean dinâmico. Ele mostra como realizar operações neles, tanto localmente quanto remotamente, através de uma conexão RMI entre um servidor e um cliente remoto.

Ao executar este exemplo:

  * O servidor:

    * Cria um MBean server

    * Registra um MBean `SimpleStandard` e um `SimpleDynamic` no MBean server local

    * Realiza operações locais nos MBeans

    * Cria um RMI connector server

  * O cliente:

    * Cria um RMI connector

    * Registra um MBean `SimpleStandard` e um `SimpleDynamic` no MBean server remoto

    * Realiza operações remotas em ambos os MBeans

Analisando as Classes Usadas no Exemplo Básico de MBean

  1. Copie o código-fonte contido na seção [JMX Connectors](<#/doc/guides/jmx/jmx-connectors-example>) e crie os arquivos correspondentes no diretório `work_dir/jmx_examples/Basic`. Os arquivos dentro deste diretório devem então incluir o seguinte:

     * `Server.java`
     * `SimpleStandardMBean.java`
     * `SimpleStandard.java`
     * `SimpleDynamic.java`
     * `ClientListener.java`
     * `Client.java`
     * `README`
  2. Abra cada arquivo `*.java` em sua IDE ou em um editor de texto.

As seções a seguir analisam cada uma das classes usadas no exemplo básico de MBean e explicam como as classes realizam as operações descritas na seção anterior.

#### Server.java no Exemplo de MBean

Devido ao seu tamanho, a classe `Server.java` é analisada na seguinte série de trechos de código:

  * [EXEMPLO DE CÓDIGO 11-1 Classe de Exemplo de MBean Server.java (Trecho 1)](<#/doc/guides/jmx/jmx-connectors>)

  * [EXEMPLO DE CÓDIGO 11-2 Classe de Exemplo de MBean Server.java (Trecho 2)](<#/doc/guides/jmx/jmx-connectors>)

  * [EXEMPLO DE CÓDIGO 11-3 Classe de Exemplo de MBean Server.java (Trecho 3)](<#/doc/guides/jmx/jmx-connectors>)

  * [EXEMPLO DE CÓDIGO 11-4 Classe de Exemplo de MBean Server.java (Trecho 4)](<#/doc/guides/jmx/jmx-connectors>)

  * [EXEMPLO DE CÓDIGO 11-5 Classe de Exemplo de MBean Server.java (Trecho 5)](<#/doc/guides/jmx/jmx-connectors>)

EXEMPLO DE CÓDIGO 11-1 Classe de Exemplo de MBean Server.java (Trecho 1)
```java
     
    public class Server { 
     
     public static void main(String[] args) { 
         try { 
              
             MBeanServer mbs = MBeanServerFactory.createMBeanServer(); 
             waitForEnterPressed(); 
     
             String domain = mbs.getDefaultDomain(); 
             waitForEnterPressed(); 
     
             String mbeanClassName = "SimpleStandard"; 
             String mbeanObjectNameStr = 
                 domain + ":type=" + mbeanClassName + ",name=1"; 
             ObjectName mbeanObjectName = 
                 createSimpleMBean(mbs, mbeanClassName, mbeanObjectNameStr); 
             waitForEnterPressed(); 
     
             printMBeanInfo(mbs, mbeanObjectName, mbeanClassName); 
             waitForEnterPressed(); 
     
             manageSimpleMBean(mbs, mbeanObjectName, mbeanClassName); 
             waitForEnterPressed(); 
     
             mbeanClassName = "SimpleDynamic"; 
             mbeanObjectNameStr = 
                 domain + ":type=" + mbeanClassName + ",name=1"; 
             mbeanObjectName = 
                 createSimpleMBean(mbs, mbeanClassName, mbeanObjectNameStr); 
             waitForEnterPressed(); 
     
             printMBeanInfo(mbs, mbeanObjectName, mbeanClassName); 
             waitForEnterPressed(); 
     
             manageSimpleMBean(mbs, mbeanObjectName, mbeanClassName); 
             waitForEnterPressed(); 
     
             [...] 
     
    }
```

Examinando esta classe, você pode ver que o seguinte ocorre:

Primeiro, a classe `Server.java` cria um novo MBean server chamado `mbs` chamando o método `createMBeanServer()` da classe `MBeanServerFactory`.

Em seguida, o domínio padrão no qual o MBean server está registrado é obtido com uma chamada ao método `getDefaultDomain()` da interface `MBeanServer`. O domínio é identificado pela string `domain`.

A classe MBean chamada `SimpleStandard` também é identificada por uma variável, neste caso a string `mbeanClassName`. `SimpleStandard` é o nome da classe Java para o objeto Java do qual este MBean é uma instância.

Outra variável, a string `mbeanObjectNameStr`, é definida como a combinação do domínio, mais os seguintes pares chave=valor:

  * O `type`, que neste caso é o `mbeanClassName`.
  * Um `name`, para diferenciar este MBean de outros MBeans do mesmo tipo que possam ser criados posteriormente. Neste caso, o número do nome é `1`.

O propósito de `mbeanObjectNameStr` é dar ao MBean um identificador legível por humanos.

Uma chamada para `createSimpleMBean()` cria e registra o MBean `SimpleStandard` no MBean server local, com o nome de objeto fornecido.

As operações `printMBeanInfo()` e `manageSimpleMBean()` são então realizadas no MBean `SimpleStandard`. Assim como `createSimpleMBean()`, esses métodos são definidos posteriormente no código `Server.java` e são mostrados em [EXEMPLO DE CÓDIGO 11-4 Classe de Exemplo de MBean Server.java (Trecho 4)](<#/doc/guides/jmx/jmx-connectors>) e [EXEMPLO DE CÓDIGO 11-5 Classe de Exemplo de MBean Server.java (Trecho 5)](<#/doc/guides/jmx/jmx-connectors>).

Em código que não é mostrado aqui, um segundo MBean do tipo `SimpleDynamic` é criado e registrado no MBean server exatamente da mesma forma que o MBean `SimpleStandard`. Como o nome sugere, este MBean é uma instância do objeto Java `SimpleDynamic`, que é examinado em [SimpleDynamic.java no Exemplo de MBean](<#/doc/guides/jmx/jmx-connectors>).

EXEMPLO DE CÓDIGO 11-2 Classe de Exemplo de MBean Server.java (Trecho 2)
```java
     
    [...] 
     
    JMXServiceURL url = 
      new JMXServiceURL("service:jmx:rmi:///jndi/rmi://localhost:9999/server"); 
    JMXConnectorServer cs = 
      JMXConnectorServerFactory.newJMXConnectorServer(url, null, mbs); 
    cs.start(); 
    waitForEnterPressed(); 
    cs.stop(); 
     
    [...] 
     
    
```

No EXEMPLO DE CÓDIGO 11-2 Classe de Exemplo de MBean Server.java (Trecho 2), um RMI connector server é criado para que as operações possam ser realizadas nos MBeans remotamente. Uma chamada à classe `JMXServiceURL` cria uma nova URL de serviço chamada `url`, que serve como um endereço para o connector server. Neste exemplo, a URL de serviço é fornecida no formato JNDI, em vez de no formato codificado (consulte a documentação da API para o pacote `javax.management.remote.rmi` para uma explicação do formato JNDI). Esta URL de serviço define o seguinte:

  * O conector usará o transporte RMI padrão, denotado por `rmi`.
  * O RMI registry no qual os stubs do RMI connector são armazenados estará em execução na porta `9999` no host local, e o endereço do servidor será registrado sob o nome `server`. A porta `9999` especificada no exemplo é arbitrária; você pode usar qualquer porta disponível.

Um RMI connector server chamado `cs` é criado chamando o construtor `JMXConnectorServerFactory`, com a URL de serviço `url`, um mapa de ambiente `null` e o MBean server `mbs` como parâmetros. O connector server `cs` é iniciado chamando o método `start()` de `JMXConnectorServer`, após o que `RMIConnectorServer` exporta o objeto RMI `server` para o RMI registry. A conexão permanecerá aberta até que a tecla Enter seja pressionada, conforme instruído pelo método simples `waitForEnterPressed`, que é definido posteriormente no código `Server`.

EXEMPLO DE CÓDIGO 11-3 Classe de Exemplo de MBean Server.java (Trecho 3)
```java
     
    [...] 
     
    private static ObjectName createSimpleMBean(MBeanServer mbs, 
                                                  String mbeanClassName, 
                                                  String mbeanObjectNameStr) { 
         echo("\n>>> Create the " + mbeanClassName + 
              " MBean within the MBeanServer"); 
         echo("ObjectName = " + mbeanObjectNameStr); 
         try { 
              ObjectName mbeanObjectName = 
                 ObjectName.getInstance(mbeanObjectNameStr); 
              mbs.createMBean(mbeanClassName, mbeanObjectName); 
                 return mbeanObjectName; 
              } catch (Exception e) { 
                echo(       "!!! Could not create the " +  
                      mbeanClassName + " MBean !!!"); 
                e.printStackTrace(); 
                echo("\nEXITING...\n"); 
                System.exit(1); 
            } 
            return null; 
         } 
     
    [...] 
     
    
```

O EXEMPLO DE CÓDIGO 11-3 Classe de Exemplo de MBean Server.java (Trecho 3) mostra a definição do método `createSimpleMBean()`. Neste método, o nome do objeto `mbeanObjectNameStr` é passado para o método `getInstance()` da interface `ObjectName` para criar um novo nome de objeto usado para registrar o MBean dentro do MBean server. A instância do nome do objeto resultante é chamada `mbeanObjectName`. Uma chamada ao método `createMBean()` do `MBeanServer` instancia um MBean definido pela combinação de `mbeanClassName` e a instância de `mbeanObjectName`, e então registra o MBean no MBean server `mbs`.

EXEMPLO DE CÓDIGO 11-4 Classe de Exemplo de MBean Server.java (Trecho 4)
```java
    [...] 
     
    private static void printMBeanInfo(MBeanServer mbs, 
                                         ObjectName mbeanObjectName, 
                                         String mbeanClassName) { 
         MBeanInfo info = null; 
         try { 
             info = mbs.getMBeanInfo(mbeanObjectName); 
         } catch (Exception e) { 
             echo(  "!!! Could not get MBeanInfo object for " + 
             mbeanClassName +" !!!"); 
             e.printStackTrace(); 
             return; 
         } 
     
         MBeanAttributeInfo[] attrInfo = info.getAttributes(); 
         if (attrInfo.length > 0) { 
             for (int i = 0; i < attrInfo.length; i++) { 
            echo(" ** NAME:    " + attrInfo[i].getName()); 
            echo("    DESCR:   " + attrInfo[i].getDescription()); 
            echo("    TYPE:    " + attrInfo[i].getType() + 
                    "READ: "+ attrInfo[i].isReadable() + 
                    "WRITE: "+ attrInfo[i].isWritable()); 
            } 
         } else echo(" ** No attributes **"); 
     
    [...] 
    
```

No EXEMPLO DE CÓDIGO 11-4 Classe de Exemplo de MBean Server.java (Trecho 4), vemos a definição do método `printMBeanInfo()`. O método `printMBeanInfo()` chama o método `getMBeanInfo()` do `MBeanServer` para obter detalhes dos atributos e operações que são expostos pelo MBean nomeado por `mbeanObjectName`. `MBeanAttributeInfo` define os seguintes métodos, cada um dos quais é chamado por sua vez para obter informações sobre os atributos do MBean:

  * `getName`: Obtém o nome do atributo.
  * `getDescription`: Obtém a descrição legível por humanos do atributo.
  * `getType`: Obtém o nome da classe do atributo.
  * `isReadable`: Determina se o atributo é legível ou não.
  * `isWritable`: Determina se o atributo é gravável ou não.

Em código que não é mostrado aqui, são feitas chamadas para obter informações sobre os construtores, operações e notificações do MBean:

  * `MBeanConstructorInfo`: Obtém informações sobre a classe Java do MBean.
  * `MBeanOperationInfo`: Descobre quais operações o MBean executa e quais parâmetros o MBean aceita.
  * `MBeanNotificationInfo`: Descobre quais notificações o MBean envia quando suas operações são realizadas.

EXEMPLO DE CÓDIGO 11-5 Classe de Exemplo de MBean Server.java (Trecho 5)
```java
    [...] 
     
    private static void manageSimpleMBean(MBeanServer mbs, 
                                            ObjectName mbeanObjectName, 
                                            String mbeanClassName) { 
            try { 
                printSimpleAttributes(mbs, mbeanObjectName); 
     
                Attribute stateAttribute = new Attribute("State", 
                                                         "new state"); 
                mbs.setAttribute(mbeanObjectName, stateAttribute); 
     
                printSimpleAttributes(mbs, mbeanObjectName); 
                 
                echo("\n    Invoking reset operation..."); 
                mbs.invoke(mbeanObjectName, "reset", null, null); 
     
                printSimpleAttributes(mbs, mbeanObjectName); 
            } catch (Exception e) { 
                e.printStackTrace(); 
            } 
        } 
     
        private static void printSimpleAttributes( 
                                            MBeanServer mbs, 
                                            ObjectName mbeanObjectName) { 
            try { 
                String State =  
                   (String) mbs.getAttribute(mbeanObjectName, "State"); 
                Integer NbChanges = 
                   (Integer) mbs.getAttribute(mbeanObjectName, 
                                              "NbChanges"); 
            } catch (Exception e) { 
                echo(       "!!! Could not read attributes !!!"); 
                e.printStackTrace(); 
            } 
       } 
     
    [...]  
    
```

O EXEMPLO DE CÓDIGO 11-5 Classe de Exemplo de MBean Server.java (Trecho 5) demonstra um método para gerenciar um MBean simples.

O método `manageSimpleMBean()` primeiramente chama o método `printSimpleAttributes()` que também é definido por `Server`. O método `printSimpleAttributes()` obtém um atributo MBean chamado `state` do MBean `mbeanObjectName`, bem como outro atributo MBean chamado `NbChanges`.

O método `manageSimpleMBean()` então define um atributo chamado `stateAttribute`, que é uma instância da classe `Attribute`. O atributo `stateAttribute` associa o valor `new state` ao atributo existente `state`, definido por `SimpleStandard`. Uma chamada ao método `setAttribute()` do `MBeanServer` então define o estado do MBean `mbeanObjectName` para o novo estado definido por `stateAttribute`.

Finalmente, uma chamada ao método `invoke()` do `MBeanServer` invoca a operação `reset` do MBean `mbeanObjectName`. A operação `reset` é definida na classe `SimpleStandard`.

#### SimpleStandardMBean.java no Exemplo de MBean

A classe `SimpleStandardMBean.java` é mostrada no seguinte exemplo de código.

EXEMPLO DE CÓDIGO 11-6 Classe de Exemplo de MBean SimpleStandardMBean.java
```java
     
    public interface SimpleStandardMBean { 
     
           public String getState(); 
           public void setState(String s); 
           public int getNbChanges(); 
           public void reset(); 
     
    } 
     
    
```

A classe `SimpleStandardMBean.java` é uma interface de gerenciamento direta da Especificação JMX para o MBean `SimpleStandard`. Esta interface expõe as quatro operações definidas por `SimpleStandard` para gerenciamento através de um agente JMX.

#### SimpleStandard.java no Exemplo de MBean

A classe `SimpleStandard.java` é mostrada no seguinte exemplo de código.

EXEMPLO DE CÓDIGO 11-7 Classe de Exemplo de MBean SimpleStandard.java
```java
     
    public class SimpleStandard 
        extends NotificationBroadcasterSupport 
        implements SimpleStandardMBean { 
        public String getState() { 
           return state; 
        } 
        public void setState(String s) { 
           state = s; 
           nbChanges++; 
        } 
         
        public int getNbChanges() { 
            return nbChanges; 
        } 
         
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
         
        public int getNbResets() { 
           return nbResets; 
        } 
     
        public MBeanNotificationInfo[] getNotificationInfo() { 
            return new MBeanNotificationInfo[] { 
              new MBeanNotificationInfo( 
              new String[] { 
                AttributeChangeNotification.ATTRIBUTE_CHANGE }, 
                AttributeChangeNotification.class.getName(), 
                "This notification is emitted when the reset()  
                 method is called.") 
            }; 
        } 
         
        private String state = "initial state"; 
        private int nbChanges = 0; 
        private int nbResets = 0; 
     
    }         
     
    
```

A classe `SimpleStandard` define um MBean padrão direto da Especificação JMX. O MBean `SimpleStandard` expõe operações e atributos para gerenciamento implementando a interface `SimpleStandardMBean` correspondente.

As operações simples expostas por este MBean são:

  * Definir um estado

  * Atualizar este estado

  * Contar o número de vezes que o estado é atualizado

  * Redefinir os valores do estado e o número de alterações para o valor original de zero

  * Enviar uma notificação sempre que a operação `reset` for invocada

A notificação emitida pela operação `reset` é uma instância da classe `AttributeChangeNotification`, que coleta informações sobre o número de alterações realizadas no atributo `State` antes de chamar `reset`. O conteúdo da notificação enviada é definido pela instância `MBeanNotificationInfo`.

#### SimpleDynamic.java no Exemplo de MBean

A classe `SimpleDynamic` é mostrada no seguinte exemplo de código.

EXEMPLO DE CÓDIGO 11-8 Classe de Exemplo de MBean SimpleDynamic.java
```java
     
    public class SimpleDynamic 
        extends NotificationBroadcasterSupport 
        implements DynamicMBean { 
     
        public SimpleDynamic() { 
            buildDynamicMBeanInfo(); 
        } 
     
    [...] 
    
```

O MBean dinâmico `SimpleDynamic` mostra como expor atributos e operações para gerenciamento em tempo de execução, implementando a interface `DynamicMBean`. Ele começa definindo um método, `buildDynamicMBeanInfo()`, para obter informações para o MBean dinamicamente. O método `buildDynamicMBeanInfo()` constrói o `MBeanInfo` para o MBean dinâmico.

O restante do código de `SimpleDynamic` corresponde à implementação da interface `DynamicMBean`. Os atributos, operações e notificações expostos são idênticos aos expostos pelo MBean `SimpleStandard`.

#### ClientListener.java no Exemplo de MBean

A classe `ClientListener.java` é mostrada no seguinte exemplo de código.

EXEMPLO DE CÓDIGO 11-9 Classe de Exemplo de MBean ClientListener.java
```java
     
     
    public class ClientListener implements NotificationListener {  
     public void handleNotification(Notification notification, Object handback)  
         {  
             System.out.println("\nReceived notification: " + notification);  
         }  
    } 
     
    
```

A classe `ClientListener` implementa um listener de notificação direto da Especificação JMX. O método `handleNotification()` da interface `NotificationListener` é chamado ao receber uma notificação e imprime uma mensagem para confirmar que uma notificação foi recebida.

#### Client.java no Exemplo de MBean

A classe `Client.java` é mostrada no seguinte exemplo de código.

EXEMPLO DE CÓDIGO 11-10 Classe de Exemplo de MBean Client.java
```java
     
    public class Client { 
     
      public static void main(String[] args) { 
        try { 
          // Create an RMI connector client 
          // 
          JMXServiceURL url = new JMXServiceURL( 
             "service:jmx:rmi:///jndi/rmi://localhost:9999/server"); 
          JMXConnector jmxc = JMXConnectorFactory.connect(url, null); 
          ClientListener listener = new ClientListener(); 
          MBeanServerConnection mbsc = jmxc.getMBeanServerConnection(); 
          waitForEnterPressed();       
           
          // Get domains from MBeanServer 
          // 
          String domains[] = mbsc.getDomains(); 
          for (int i = 0; i < domains.length; i++) { 
              System.out.println("Domain[" + i + "] = " + domains[i]); 
          } 
          waitForEnterPressed();       
     
          String domain = mbsc.getDefaultDomain();       
       
          // Create SimpleStandard MBean  
          ObjectName mbeanName =  
                 new ObjectName(domain +":type=SimpleStandard,name=2"); 
          mbsc.createMBean("SimpleStandard", stdMBeanName, null, null); 
          waitForEnterPressed();       
                 
          // Create SimpleDynamic MBean 
          ObjectName dynMBeanName = 
              new ObjectName(domain +":type=SimpleDynamic,name=2"); 
          echo("\nCreate SimpleDynamic MBean..."); 
          mbsc.createMBean("SimpleDynamic", dynMBeanName, null, null); 
          waitForEnterPressed(); 
           
          // Get MBean count 
          echo("\nMBean count = " + mbsc.getMBeanCount()); 
     
          // Query MBean names 
          echo("\nQuery MBeanServer MBeans:"); 
          Set names = mbsc.queryNames(null, null); 
          for (Iterator i = names.iterator(); i.hasNext(); ) { 
          echo(     "ObjectName = " + (ObjectName) i.next()); 
          } 
          waitForEnterPressed(); 
           
          mbsc.setAttribute(stdMBeanName, 
                            new Attribute("State", "changed state")); 
     
          SimpleStandardMBean proxy = JMX.newMBeanProxy( 
              mbsc, stdMBeanName, SimpleStandardMBean.class, true); 
          echo("\nState = " + proxy.getState()); 
     
          ClientListener listener = new ClientListener(); 
          mbsc.addNotificationListener(stdMBeanName, listener, null, null); 
     
          mbsc.invoke(stdMBeanName, "reset", null, null); 
     
          mbsc.removeNotificationListener(stdMBeanName, listener); 
          mbsc.unregisterMBean(stdMBeanName); 
           
          [...] 
           
          jmxc.close(); 
        } catch (Exception e) { 
          e.printStackTrace(); 
        } 
      } 
    } 
    [...] 
    
```

A classe `Client.java` cria um RMI connector client que é configurado para se conectar ao RMI connector server criado por `Server.java`. `Client.java` define a mesma URL de serviço `url` que a definida por `Server.java`. Isso permite que o connector client recupere o stub do RMI connector server chamado `server` do RMI registry em execução na porta `9999` do host local, e se conecte ao RMI connector server.

Com o RMI registry identificado, o connector client pode ser criado. O connector client, `jmxc`, é uma instância da interface `JMXConnector`, criada pelo método `connect()` de `JMXConnectorFactory`. O método `connect()` recebe os parâmetros `url` e um mapa de ambiente `null` quando é chamado.

O Cliente também cria uma instância de `ClientListener`, para ouvir notificações, conforme mostrado em [ClientListener.java no Exemplo de MBean](<#/doc/guides/jmx/jmx-connectors>).

Uma instância de um `MBeanServerConnection` da Especificação JMX, chamada `mbsc`, é então criada chamando o método `getMBeanServerConnection()` da instância `JMXConnector` `jmxc`.

O connector client está agora conectado ao MBean server criado por `Server.java`, e pode registrar MBeans e realizar operações neles com a conexão permanecendo completamente transparente para ambas as pontas.

O cliente cria e registra o MBean `SimpleStandard` e o MBean `SimpleDynamic` no MBean server com uma chamada ao método `createMBean()` de `MBeanServerConnection`, e realiza as operações definidas por `SimpleStandard` e `SimpleDynamic` como se fossem operações de MBean da Especificação JMX locais.

Proxies de MBean permitem que você acesse um MBean através de uma interface Java, permitindo que você faça chamadas no proxy em vez de ter que escrever um código extenso para acessar um MBean remoto. Um proxy de MBean para `SimpleStandardMBean` é criado aqui chamando o método `newMBeanProxy()` na classe `javax.management.JMX`, passando a ele o objeto `MBeanServerConnection` do MBean, o nome da classe da interface do MBean e `true` para significar que o proxy deve se comportar como um `NotificationBroadcaster`. Você pode criar proxies para MXBeans exatamente da mesma forma que para MBeans padrão, simplesmente chamando `newMXBeanProxy()` em vez de `newMBeanProxy()`.

O código para as diferentes operações realizadas em `SimpleDynamic` não é mostrado aqui, porque as operações são as mesmas que as realizadas em `SimpleStandard`.

Finalmente, o cliente desregistra o MBean `SimpleStandard` e fecha a conexão. O `removeNotificationListener` final é opcional, pois os listeners registrados por um cliente remoto são removidos quando esse cliente é fechado.

### Executando o Exemplo de MBean

Tendo examinado as classes de exemplo, você pode executar o exemplo. Para executar o exemplo:

  1. Compile as classes Java.
```bash
$ javac *.java
```

  2. Inicie um RMI registry na porta `9999` do host local.

O RMI registry é usado pela classe `Server` para registrar o stub do RMI connector.
```bash
$ rmiregistry 9999 &
```

  3. Inicie a classe `Server`.
```bash
$ java -classpath . Server
```

Você verá a confirmação da criação do MBean server e da criação do MBean `SimpleStandard` no MBean server. Você será então solicitado a pressionar a tecla Enter para obter informações sobre, e então realizar operações no, MBean `SimpleStandard`.

Após as operações no `SimpleStandard` serem concluídas, o processo é repetido para o MBean `SimpleDynamic`.

Depois que ambos os MBeans são criados e suas operações realizadas, você verá a criação de um RMI connector server, para permitir que operações sejam realizadas nos MBeans a partir do `Client` remoto.

  4. Inicie a classe `Client` em outra janela de terminal.
```bash
$ java -classpath . Client
```

Você verá a confirmação da criação do RMI connector client e da conexão com o connector server. Você também será informado do nome do domínio e da criação e registro dos MBeans `SimpleStandard` e `SimpleDynamic`. O cliente realizará operações nos MBeans `SimpleStandard` e `SimpleDynamic`, antes de desregistrá-los.