# Segurança

## 13 Segurança

Este capítulo apresenta exemplos de como configurar os recursos de segurança da tecnologia JMX:

  * [Segurança Simples](<#/doc/guides/jmx/security>) apresenta exemplos de conectores que implementam segurança direta baseada em autenticação por senha e controle de acesso a arquivos.

Nota:

O recurso de Delegação de Assunto (Subject Delegation) foi removido. Se sua aplicação cliente precisar realizar operações como, ou em nome de, múltiplas identidades, ela precisará fazer múltiplas chamadas para `JMXConnectorFactory.connect()` e para o método `getMBeanServerConnection()` no `JMXConnector` retornado.

AVISO:

O Security Manager e as APIs relacionadas a ele foram removidos do JDK, a partir do JDK 24. Não há substituto para o Security Manager. Consulte [JEP 411](<https://openjdk.java.net/jeps/411>) para discussão e alternativas.

Cuidado:

  * As aplicações devem solicitar ao usuário que insira senhas, em vez de esperar que o usuário as forneça na linha de comando.
  * Use mecanismos de autenticação seguros em sistemas de produção. Em particular, use tanto certificados de cliente SSL para autenticar o host cliente, quanto autenticação por senha para gerenciamento de usuários. Consulte Using SSL e Using LDAP Authentication no Java Platform, Standard Edition Monitoring and Management Guide.

### Segurança Simples

O tipo mais simples de segurança que você pode usar com a tecnologia JMX é baseado em criptografia, autenticação de nome de usuário e senha, e controle de acesso a arquivos.

Analisando as Classes de Exemplo de Conectores RMI com Segurança Simples

  1. Copie o código-fonte contido na seção [Segurança Simples](<#/doc/guides/jmx/simple-security-example>) e crie os seguintes subdiretórios e arquivos correspondentes em `work_dir/jmx_examples/Security/simple`:

     * `/server/Server.java`
     * `/config/access.properties`
     * `/config/keystore`
     * `/config/password.properties`
     * `/config/truststore`
     * `/mbeans/SimpleStandardMBean.java`
     * `/mbeans/SimpleStandard.java`
     * `/client/Client.java`
     * `/client/ClientListener.java`
  2. Abra os arquivos `*.java` e `*.properties` em sua IDE ou editor de texto.

As seções a seguir analisam esses arquivos e explicam como eles realizam as operações de segurança descritas acima.

#### Server.java no Exemplo de Segurança Simples

A classe `Server.java` é mostrada no exemplo de código a seguir.

EXEMPLO DE CÓDIGO 13-1 Exemplo de Conector RMI (Segurança Simples) Classe Server.java
```java
    public class Server { 
     
      public static void main(String[] args) { 
      try { 
           MBeanServer mbs = MBeanServerFactory.createMBeanServer(); 
     
           HashMap env = new HashMap(); 
     
           SslRMIClientSocketFactory csf =  
                      new SslRMIClientSocketFactory(); 
           SslRMIServerSocketFactory ssf =  
                      new SslRMIServerSocketFactory(); 
           env.put(RMIConnectorServer. 
                      RMI_CLIENT_SOCKET_FACTORY_ATTRIBUTE,csf); 
           env.put(RMIConnectorServer. 
                      RMI_SERVER_SOCKET_FACTORY_ATTRIBUTE,ssf); 
     
           env.put("jmx.remote.x.password.file", 
                     "config" + File.separator + "password.properties"); 
           env.put("jmx.remote.x.access.file", 
                     "config" + File.separator + "access.properties"); 
     
           JMXServiceURL url = new JMXServiceURL( 
            "service:jmx:rmi:///jndi/rmi://localhost:9999/server"); 
             JMXConnectorServer cs = 
                JMXConnectorServerFactory.newJMXConnectorServer(url,  
                                                                env,  
                                                                mbs); 
           cs.start(); 
         } catch (Exception e) { 
           e.printStackTrace(); 
         } 
      } 
    }
```

A classe `Server` mostrada neste exemplo de código cria um servidor MBean `mbs`, e preenche um mapa de ambiente `env` com uma fábrica de sockets de cliente RMI segura `csf`, uma fábrica de sockets de servidor RMI segura `ssf`, e os arquivos de propriedades `password.properties` e `access.properties`.

O arquivo de propriedades `password.properties` contém um nome de usuário e senha e é acessado usando a interface `JMXAuthenticator` da JMX Remote API. Usar a propriedade `jmx.remote.x.password.file` é o mesmo que criar um `JMXAuthenticator` baseado em senha e passá-lo para o mapa de ambiente através da propriedade `jmx.remote.authenticator`.

O arquivo de propriedades `access.properties` contém um nome de usuário e um nível de permissão de acesso que pode ser `readwrite` ou `readonly`. Isso representa o nível de acesso que este usuário pode ter às operações do servidor MBean. Este controle de acesso baseado em arquivo é implementado usando a interface `MBeanServerForwarder` da tecnologia JMX, que envolve o servidor MBean real dentro de um servidor MBean controlador de acesso. O servidor MBean controlador de acesso apenas encaminha as requisições para o servidor MBean real após realizar as verificações apropriadas.

`Server` cria uma URL de serviço JMX, chamada `url`, para um conector RMI que operará sobre o transporte JRMP padrão, e registra um stub de conector RMI em um registro RMI na porta `9999` do host local.

O servidor MBean `mbs`, o mapa de ambiente `env` e a URL de serviço `url` são todos passados para `JMXConnectorServer` para criar um novo e seguro servidor de conector JMX chamado `cs`.

#### SimpleStandardMBean.java no Exemplo de Segurança Simples

A classe `SimpleStandardMBean` define a mesma interface MBean direta usada em [SimpleStandardMBean.java no Exemplo de MBean](<#/doc/guides/jmx/jmx-connectors>).

#### SimpleStandard.java no Exemplo de Segurança Simples

A classe `SimpleStandard` define o mesmo MBean direto usado em [SimpleStandard.java no Exemplo de MBean](<#/doc/guides/jmx/jmx-connectors>).

#### ClientListener.java no Exemplo de Segurança Simples

A classe `ClientListener` define o mesmo listener de notificação direto usado em [ClientListener.java no Exemplo de MBean](<#/doc/guides/jmx/jmx-connectors>).

#### Client.java no Exemplo de Segurança Simples

A classe `Client.java` é mostrada no exemplo de código a seguir.

EXEMPLO DE CÓDIGO 13-2 Exemplo de Conector RMI (Segurança Simples) Classe Client.java
```java
    public class Client { 
     
      public static void main(String[] args) { 
      try { 
          HashMap env = new HashMap(); 
     
          String[] credentials = new String[] { "username" , "password" }; 
          env.put("jmx.remote.credentials", credentials); 
          JMXServiceURL url = new JMXServiceURL( 
             "service:jmx:rmi:///jndi/rmi://localhost:9999/server");       
          JMXConnector jmxc = JMXConnectorFactory.connect(url, env); 
          MBeanServerConnection mbsc = jmxc.getMBeanServerConnection(); 
          String domains[] = mbsc.getDomains(); 
          for (int i = 0; i < domains.length; i++) { 
             System.out.println("Domain[" + i + "] = " + domains[i]); 
          } 
           
          ObjectName mbeanName =  
              new ObjectName("MBeans:type=SimpleStandard"); 
          mbsc.createMBean("SimpleStandard", mbeanName, null, null); 
          // Perform MBean operations 
          [...] 
          
          mbsc.removeNotificationListener(mbeanName, listener); 
          mbsc.unregisterMBean(mbeanName); 
          jmxc.close(); 
        }  catch (Exception e) { 
          e.printStackTrace(); 
        } 
      } 
    } 
    
```

A classe `Client` mostrada neste exemplo de código preenche um mapa de ambiente `env` com um conjunto de credenciais, ou seja, o `username` e `password` esperados pelo `Server`. Essas credenciais são então fornecidas a uma instância de `JMXConnector` chamada `jmxc` quando a URL de serviço do stub do conector e o mapa de ambiente são passados para `JMXConnectorFactory.connect()`. Através de `jmxc`, o `Client` se conecta ao servidor MBean iniciado pelo `Server` e realiza operações MBean.

Quando a conexão é estabelecida, as credenciais fornecidas no mapa de ambiente `env` são enviadas ao servidor. O servidor então chama o método `authenticate()` da interface `JMXAuthenticator`, passando as credenciais do cliente como parâmetros. O método `authenticate()` autentica o cliente e retorna um assunto (subject) que contém o conjunto de principais sobre os quais as verificações de controle de acesso serão realizadas.

#### Executando o Exemplo de Conector RMI com Segurança Simples

Para executar o exemplo de conector RMI com segurança simples, siga os passos abaixo:

  1. Execute o exemplo de conector RMI:
```bash
$ javac 
               mbeans/SimpleStandard.java \ 
               mbeans/SimpleStandardMBean.java \ 
               server/Server.java \ 
               client/Client.java \ 
               client/ClientListener.java 
         
```

  2. Inicie um registro RMI na porta 9999 do host local.
```bash
$ export CLASSPATH=server ; rmiregistry 9999 & 
         
```

  3. Inicie o `Server`.
```bash
$ java -classpath server:mbeans \ 
              -Djavax.net.ssl.keyStore=config/keystore \ 
              -Djavax.net.ssl.keyStorePassword=password \ 
              Server & 
         
```

Você verá a confirmação da criação do servidor MBean e do conector RMI.

  4. Inicie o `Client`.
```bash
$java -classpath client:server:mbeans \ 
              -Djavax.net.ssl.trustStore=config/truststore \ 
              -Djavax.net.ssl.trustStorePassword=trustword \ 
              Client 
         
```

Você verá a confirmação da criação do cliente do conector, as várias operações MBean seguidas pelo fechamento da conexão.

Como você pode ver, tudo o que foi descrito acima parece prosseguir exatamente da mesma maneira que o exemplo básico de conector RMI descrito em [Conectores JMX](<#/doc/guides/jmx/jmx-connectors>). No entanto, se você abrisse `password.properties` e alterasse a senha, veria uma `java.lang.SecurityException` ao iniciar o `Client`, e a conexão falharia.