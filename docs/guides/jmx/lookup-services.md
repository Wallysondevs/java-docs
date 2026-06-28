# Serviços de Pesquisa

## 12 Serviços de Pesquisa

Os serviços de pesquisa permitem que clientes da tecnologia JMX encontrem e se conectem a servidores de conector que se registraram nos serviços de pesquisa.

A Especificação JMX define três vinculações a serviços de pesquisa, usando tecnologias de pesquisa existentes, conforme descrito nas seções a seguir:

  * [Configuração Inicial](<#/doc/guides/jmx/lookup-services>) fornece informações de configuração que se aplicam a todos os três tipos de serviço de pesquisa.
  * [Serviço de Pesquisa do Protocolo de Localização de Serviço (SLP)](<#/doc/guides/jmx/lookup-services>) apresenta o exemplo de pesquisa SLP.
  * [Serviço de Pesquisa Java Naming and Directory Interface (JNDI) / LDAP](<#/doc/guides/jmx/lookup-services>) apresenta um exemplo de pesquisa JNDI/LDAP.

### Configuração Inicial

Conforme mostrado em [Acessando MBeans Padrão e Dinâmicos Usando o Conector RMI](<#/doc/guides/jmx/jmx-connectors>), se você estiver usando conectores de invocação de método remoto (RMI), pode usar um diretório externo para registrar os stubs do servidor de conector que deseja pesquisar. Os seguintes casos são apresentados nos exemplos de serviço de pesquisa relacionados aos conectores RMI:

  * Conectores RMI que usam um dos seguintes diretórios externos:

    * Um registro RMI, para conectores RMI que implementam o transporte padrão Java Remote Method Protocol (JRMP)

    * Lightweight Directory Access Protocol (LDAP), para transportes JRMP

  * Conectores RMI que não usam um diretório externo

Se você registrar os stubs do conector RMI em um diretório externo, alguma configuração inicial é necessária. Você deve configurar seu registro RMI ou servidor LDAP. Se você não usar um diretório externo, o stub do conector RMI é codificado na JMX service URL.

As seções a seguir descrevem os diretórios externos que você pode usar em conjunto com os exemplos de serviço de pesquisa que utilizam conectores RMI. Esses diretórios externos são referenciados ao executar os três exemplos de serviços de pesquisa que são fornecidos nas seções subsequentes deste capítulo.

#### Registro RMI Externo

Para registrar os stubs do servidor de conector RMI em um registro RMI externo, para uso por conectores que implementam o transporte JRMP, execute as seguintes ações:

  1. Inicie o registro RMI na porta 9999 do host local.

Assim como em [Conectores JMX](<#/doc/guides/jmx/jmx-connectors>), o registro RMI é usado para armazenar os stubs do conector RMI para conectores RMI que implementam o transporte JRMP.
```
 $ rmiregistry 9999 &
```

  2. Para sua conveniência ao digitar comandos, crie uma variável de ambiente para o endereço do registro RMI.

Para encurtar os comandos que você digitará ao executar os exemplos, defina a service URL para o registro RMI como uma variável de ambiente, `jndirmi`. Nestes exemplos, a service URL é fornecida no formato JNDI. Consulte a documentação da API para o pacote `javax.management.remote.rmi` para uma explicação do formato JNDI. Se você quiser executar os diretórios externos em uma máquina diferente da máquina local, deve especificar o nome do host dessa máquina em vez de localhost.
```
 $ jndirmi="rmi://localhost:9999"
```

#### Registro LDAP Externo

Para registrar os stubs do servidor de conector RMI em um registro LDAP externo, para uso por conectores que implementam o transporte JRMP:

  1. Inicie um Servidor LDAP.

O servidor LDAP que você usa é de sua escolha, embora o esquema para representar objetos Java em um diretório LDAP deva ser conhecido pelo servidor. Consulte o documento Request For Comments (RFC) relevante para detalhes:

`<http://www.ietf.org/rfc/rfc2713.txt>`

  2. Crie um sufixo de componente de domínio.

Estes exemplos exigem que você crie o seguinte sufixo de componente de domínio:
```
 dc=Test
```

Consulte a documentação que acompanha seu servidor LDAP para detalhes sobre como configurar o servidor e criar este sufixo.

  3. Para sua conveniência, defina os seguintes parâmetros LDAP como variáveis de ambiente.

Essas variáveis são usadas para encurtar os comandos que você digita ao iniciar as classes Server e Client nos exemplos de serviço de pesquisa que registram stubs de conector RMI no servidor LDAP externo.

     * O nome da máquina que executa seu servidor LDAP (`ldap_host`)
```
$ ldaphost=ldap_host
```

     * A porta em que o servidor LDAP está sendo executado (`ldapport`)
```
$ ldapport=ldap_port
```

     * O atributo de nome comum LDAP, que nestes exemplos é “Directory Manager”
```
$ principal=”cn=Directory Manager”
```

     * A senha exigida pelo seu servidor LDAP. Forneça a senha para seu servidor LDAP.
```
$ credentials=your_ldap_password
```

     * O endereço do servidor LDAP. Neste exemplo, a service URL para o servidor LDAP é fornecida no formato JNDI e é identificada pela variável jndildap.
```
$ jndildap="ldap://$ldaphost:$ldapport"
```

Agora você está pronto para executar os diferentes exemplos de serviço de pesquisa.

### Serviço de Pesquisa do Protocolo de Localização de Serviço (SLP)

A tecnologia JMX especifica como registrar conectores RMI com o serviço de pesquisa SLP.

Este exemplo demonstra como um cliente de conector JMX Remote API pode encontrar e se conectar a um servidor de conector que se registrou no serviço de pesquisa SLP. Este exemplo executa as seguintes operações:

  * O agente:

    * Cria um MBean server

    * Obtém um ponteiro para o serviço de pesquisa SLP

    * Cria um servidor de conector

    * Registra o endereço do conector com o serviço de pesquisa SLP

  * O cliente:

    * Obtém um ponteiro para o serviço de pesquisa SLP

    * Procura por quaisquer servidores de conector registrados no serviço de pesquisa SLP

    * Cria um conector JMX Remote API

    * Recupera informações sobre os MBeans no MBean server

Este exemplo assume que você já está familiarizado com a [tecnologia SLP](<http://www.ietf.org/rfc/rfc2614.txt>). O código fornecido para este exemplo está em conformidade com a implementação da Oracle de SLP, conforme definido pela RFC 2614 (veja [http://www.ietf.org/rfc/rfc2614.txt)](<http://www.ietf.org/rfc/rfc2614.txt>). Você deve obter uma versão de SLP que seja compatível com a RFC 2614, seção 5. Você pode baixar a implementação Java do OpenSLP em [http://www.openslp.org/.](<http://www.openslp.org/>)

Analisando as Classes de Exemplo de Pesquisa SLP

  1. Copie o código-fonte contido na seção [Serviço de Pesquisa do Protocolo de Localização de Serviço (SLP)](<#/doc/guides/jmx/service-location-protocol-slp-lookup-service-example>) e crie os arquivos correspondentes no diretório `work_dir/jmx_examples/Lookup/slp`. Os arquivos dentro deste diretório devem então incluir o seguinte:

     * `README`
     * `Server.java`
     * `Client.java`
  2. Abra os arquivos `*.java`, em sua IDE ou editor de texto.

As seções a seguir analisam cada uma dessas classes e explicam como elas executam as operações descritas no exemplo.

#### Server.java no Exemplo de Pesquisa SLP

Devido ao seu tamanho, a classe `Server.java` do serviço de pesquisa SLP é analisada na seguinte série de trechos de código:

  * [CODE EXAMPLE 12-1 SLP Lookup Service Example Class Server.java (Excerpt 1)](<#/doc/guides/jmx/lookup-services>)

  * [CODE EXAMPLE 12-2 SLP Lookup Service Example Class Server.java (Excerpt 2)](<#/doc/guides/jmx/lookup-services>)

  * [CODE EXAMPLE 12-3 SLP Lookup Service Example Class Server.java (Excerpt 3)](<#/doc/guides/jmx/lookup-services>)

  * [CODE EXAMPLE 12-4 SLP Lookup Service Example Class Server.java (Excerpt 4)](<#/doc/guides/jmx/lookup-services>)

Para explicações do código SLP usado neste exemplo, consulte a RFC 2614 e a documentação da API para SLP.

CODE EXAMPLE 12-1 SLP Lookup Service Example Class Server.java (Excerpt 1)
```java

    public class Server {
       public final static int JMX_DEFAULT_LEASE = 300;
       public final static String JMX_SCOPE = "DEFAULT";

       private final MBeanServer mbs;
       public Server() {
           mbs = MBeanServerFactory.createMBeanServer();
       }

    [...]


```

O CODE EXAMPLE 12-1 define o lease SLP padrão `JMX_DEFAULT_LEASE` para um lease padrão de 300 segundos, correspondendo ao tempo em que a URL é registrada, e mostra a criação inicial do MBean server `mbs`.

Em código que não é mostrado no exemplo, você então define um anunciante SLP `slpAdvertiser`, e uma SLP service URL `url`. O `slpAdvertiser` é usado para registrar a service URL no serviço de pesquisa SLP. O `SCOPE` e o `agentName` são registrados no SLP como atributos de pesquisa.

CODE EXAMPLE 12-2 SLP Lookup Service Example Class Server.java (Excerpt 2)
```java

    [...]

       public static void register(JMXServiceURL jmxUrl, String name)
         throws ServiceLocationException {
         ServiceURL serviceURL =
              new ServiceURL(jmxUrl.toString(),
                             JMX_DEFAULT_LEASE);
         debug("ServiceType is: " + serviceURL.getServiceType());
         Vector attributes = new Vector();
         Vector attrValues = new Vector();
         attrValues.add(JMX_SCOPE);
         ServiceLocationAttribute attr1 =
              new ServiceLocationAttribute("SCOPE", attrValues);
         attributes.add(attr1);
         attrValues.removeAllElements();
         attrValues.add(name);
         ServiceLocationAttribute attr2 =
              new ServiceLocationAttribute("AgentName", attrValues);
         attributes.add(attr2);
         final Advertiser slpAdvertiser =
              ServiceLocationManager.getAdvertiser(Locale.US);
         slpAdvertiser.register(serviceURL, attributes);

       }

    [...]


```

O CODE EXAMPLE 12-2 mostra o registro da URL do servidor de conector JMX com o serviço de pesquisa SLP.

A JMX service URL `jmxUrl` é o endereço do servidor de conector, e é obtida por uma chamada ao método `getAddress()` de `JMXConnectorServer` quando o servidor de conector é iniciado.

Os atributos de pesquisa SLP, ou seja, o escopo e o nome do agente sob o qual o endereço do servidor de conector deve ser registrado (`name`), são então especificados pela classe SLP `ServiceLocationAttribute`. O atributo `AgentName` é obrigatório, mas outros atributos opcionais, como `ProtocolType`, `AgentHost` e `Property`, também podem ser registrados no serviço de pesquisa SLP.

Finalmente, o endereço do servidor de conector JMX é registrado no serviço SLP com uma chamada ao método `register()` da interface `Advertiser`, com a `serviceURL` e os `attributes` passados como parâmetros.

CODE EXAMPLE 12-3 SLP Lookup Service Example Class Server.java (Excerpt 3)
```java

    [...]

       public JMXConnectorServer rmi(String url) throws
         IOException,
         JMException,
         NamingException,
         ClassNotFoundException,
         ServiceLocationException {
         JMXServiceURL jurl = new JMXServiceURL(url);
         final HashMap env = new HashMap();
         // Environment map attributes
         [...]


         JMXConnectorServer rmis =
            JMXConnectorServerFactory.newJMXConnectorServer(jurl, env, mbs);
         final String agentName = System.getProperty("agent.name",
                                                     "DefaultAgent");
         start(rmis, agentName);

         return rmis;
      }
    [...]


```

O CODE EXAMPLE 12-3 mostra a criação de um servidor de conector RMI. A JMX service URL `jurl` é construída a partir da string `url` que está incluída no comando usado para iniciar o `Server` na linha de comando. Um servidor de conector RMI chamado `rmis` é então criado com as propriedades de sistema definidas pelo `map` de ambiente e o endereço `jurl`.

O servidor de conector é então iniciado, e o endereço do servidor de conector RMI é registrado no serviço de pesquisa SLP sob o nome `agentName`.

CODE EXAMPLE 12-4 SLP Lookup Service Example Class Server.java (Excerpt 4)
```java

    [...]

       public void start(JMXConnectorServer server, String agentName)
          throws IOException, ServiceLocationException {
          server.start();
          final JMXServiceURL address = server.getAddress();
          register(address,agentName);
       }

    [...]


```

O CODE EXAMPLE 12-4 mostra o lançamento do servidor de conector `server` e o registro de `server` no serviço de pesquisa SLP com o endereço `address` fornecido.

#### Client.java no Exemplo de Pesquisa SLP

Devido ao seu tamanho, a classe `Client.java` do serviço de pesquisa SLP é analisada na seguinte série de trechos de código:

  * [CODE EXAMPLE 12-5 SLP Lookup Service Example Class Client.java (Excerpt 1)](<#/doc/guides/jmx/lookup-services>)

  * [CODE EXAMPLE 12-6 SLP Lookup Service Example Class Client.java (Excerpt 2)](<#/doc/guides/jmx/lookup-services>)

  * [CODE EXAMPLE 12-7 SLP Lookup Service Example Class Client.java (Excerpt 3)](<#/doc/guides/jmx/lookup-services>)

CODE EXAMPLE 12-5 SLP Lookup Service Example Class Client.java (Excerpt 1)
```java

    public class Client {

        public final static String JMX_SCOPE = "DEFAULT";

        public static Locator getLocator() throws ServiceLocationException {
          final Locator slpLocator =
              ServiceLocationManager.getLocator(Locale.US);
          return slpLocator;
        }

          public static List lookup(Locator slpLocator, String name)
              throws IOException, ServiceLocationException {


              final ArrayList list = new ArrayList();
              Vector scopes = new Vector();

              scopes.add(JMX_SCOPE);
              String query =
                  "(&(AgentName=" + ((name!=null)?name:"*") + "))";

              ServiceLocationEnumeration result =
                  slpLocator.findServices(new ServiceType("service:jmx"),
                                          scopes, query);

              while(result.hasMoreElements()) {
                    final ServiceURL surl = (ServiceURL) result.next();


                 JMXServiceURL jmxUrl = new JMXServiceURL(surl.toString());
                 try {
                      JMXConnector client =
                         JMXConnectorFactory.newJMXConnector(jmxUrl,null);
                      if (client != null) list.add(client);
                 } catch (IOException x ) {
                 [...]
                 }
              }
          }
          return list;
        }


```

O CODE EXAMPLE 12-5 obtém o serviço SLP `Locator` chamando o método `getLocator` da classe SLP `ServiceLocationManager`. O `Client` então recupera todos os servidores de conector registrados no serviço SLP sob um determinado nome de agente, ou sob nomes de agente que correspondem a um certo padrão. Se nenhum nome de agente for especificado quando o `Client` for iniciado, todos os nomes de agente serão considerados.

Uma JMX technology service URL, `jmxUrl`, é gerada para cada um dos agentes recuperados pelo SLP, com a SLP service URL de cada agente, `surl`, passada como parâmetro para a instância `JMXServiceURL`. A URL `jmxUrl` é então passada para o método `newJMXConnector()` de `JMXConnectorFactory`, para criar um novo cliente de conector chamado `client` para cada agente que está registrado no serviço SLP.

Os clientes de conector que são recuperados são armazenados em uma `array list` chamada `list`.

CODE EXAMPLE 12-6 SLP Lookup Service Example Class Client.java (Excerpt 2)
```java

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
                        try {
                             Object o =
                             server.getAttribute(name,attrs[j].getName());
                             System.out.println("\t\t" + attrs[j].getName() +
                             " = "+o);
                        } catch (Exception x) {
                             System.err.println("JmxClient failed to get " +
                                                 attrs[j].getName() + x);
                             x.printStackTrace(System.err);
                        }
         }
    }


```

No CODE EXAMPLE 12-6, uma referência ao `MBeanServerConnection` é recuperada para cada cliente de conector que é criado a partir do endereço do servidor de conector armazenado no serviço SLP. Uma lista de todos os MBeans e seus atributos é recuperada.

CODE EXAMPLE 12-7 SLP Lookup Service Example Class Client.java (Excerpt 3)
```java

    public static void main(String[] args) {
          try {
               final String agentName = System.getProperty("agent.name");
               final Locator slpLocator = getLocator();
               List l = lookup(slpLocator,agentName);
               int j = 1;
               for (Iterator i=l.iterator();i.hasNext();j++) {
                    JMXConnector c1 = (JMXConnector) i.next();
                    if (c1 != null) {
                        try {
                             c1.connect(env);
                        } catch (IOException x) {
                             System.err.println ("Connection failed: " + x);
                             x.printStackTrace(System.err);
                             continue;
                        }

                        MBeanServerConnection conn =
                             c1.getMBeanServerConnection();

                        try {
                             listMBeans(conn);
                        } catch (IOException x) {
                             x.printStackTrace(System.err);
                        }
                        try {
                             c1.close();
                        } catch (IOException x) {
                             x.printStackTrace(System.err);
                        }
                    }
               }
          } catch (Exception x) {
               x.printStackTrace(System.err);
          }
    }


```

No CODE EXAMPLE 12-7, a propriedade `agent.name` é recuperada chamando o método `getProperty()` da classe `System`, e o serviço de pesquisa SLP é encontrado chamando o método `getLocator()` de `Locator`.

Todos os agentes nomeados `agentName` são então pesquisados, e conexões são feitas aos agentes que são descobertos. Se nenhum agente for especificado, então todos os agentes são pesquisados. Conexões são feitas ao MBean server criado por `Server`, e todos os MBeans nele são listados, antes que a conexão seja encerrada.

#### Executando o Exemplo de Serviço de Pesquisa SLP

Este exemplo demonstra o uso do serviço de pesquisa SLP para pesquisar servidores de conector RMI que usam o transporte padrão do RMI, JRMP. Conforme descrito em [Configuração Inicial](<#/doc/guides/jmx/lookup-services>), diferentes diretórios externos são usados para registrar os stubs do conector RMI.

As seguintes combinações de transportes e diretórios externos são demonstradas:

  * Conector RMI sobre o transporte JRMP, com:

    * Nenhum diretório externo

    * Um registro RMI

    * Um registro LDAP

Além das ações que você realizou em [Configuração Inicial](<#/doc/guides/jmx/lookup-services>), você deve realizar ações adicionais específicas para este exemplo antes de poder executar os exemplos que usam o SLP. Você pode então começar a pesquisar conectores usando SLP em conjunto com os dois conectores suportados pela tecnologia JMX.

Nota:

Ao executar os exemplos, para ajudar a acompanhar qual agente foi criado com qual transporte, os nomes dos agentes incluem um sufixo de letra que é o mesmo que a numeração da seção correspondente. Por exemplo, o agente de [Iniciando o Servidor](<#/doc/guides/jmx/lookup-services>), subpasso a, conector RMI sobre JRMP, sem um diretório externo, é chamado `example-server-a`.

Para executar o exemplo, execute a sequência de passos descrita em:

  * [Configurando o Exemplo de Serviço de Pesquisa SLP](<#/doc/guides/jmx/lookup-services>)

  * [Iniciando o Servidor](<#/doc/guides/jmx/lookup-services>)

  * [Iniciando o Cliente](<#/doc/guides/jmx/lookup-services>)

Configurando o Exemplo de Serviço de Pesquisa SLP

Os seguintes passos são exigidos por todos os diferentes transportes que você pode executar neste exemplo.

  1. Para conveniência ao compilar e executar as classes, defina uma variável de ambiente adicional. Além das variáveis de ambiente comuns que foram definidas em [Configuração Inicial](<#/doc/guides/jmx/lookup-services>), você precisa adicionar o caminho para o serviço SLP.

Defina `SLPLIB` apropriadamente para a plataforma que você está usando.
  2. Defina e exporte a variável de ambiente `classp`. Este exemplo requer um classpath que inclua os arquivos Java archive (JAR) para SLP:
```
$ classp=$SLPLIB/slp.jar
```

  3. Compile as classes de exemplo `Client` e `Server` digitando o seguinte comando:
```
$ javac -d . -classpath $classp Server.java Client.java
```

  4. Inicie o daemon SLP de acordo com a implementação de SLP que você está usando.

Iniciando o Servidor

O comando que você usa para iniciar o `Server` varia de acordo com o diretório externo que você está usando. Antes de iniciar o `Client`, inicie uma ou mais das seguintes instâncias do `Server`. Você pode iniciar instâncias do `Server` com diferentes transportes e registros externos.

  * Conector RMI sobre JRMP, que não usa um diretório externo: Inicie o `Server` digitando o seguinte comando.
```
$ java -classpath .:$classp -Ddebug=true \
          -Dagent.name=example-server-a \
          -Durl ="service:jmx:rmi://" \
          slp.Server &

```

Neste comando:

    * O valor para `debug` é definido como true para fornecer uma saída de tela mais completa quando o `Server` é executado.
    * O nome do agente é `example-server-a`.
    * A service URL especifica que o conector selecionado é um conector RMI, executando sobre o transporte padrão RMI JRMP.

Quando o `Server` é iniciado, você verá a confirmação da criação do conector RMI e o registro de sua URL no serviço SLP.

  * Conector RMI sobre JRMP, usando um registro RMI como diretório externo: Inicie o `Server` digitando o seguinte comando.
```
$ java -classpath .:$classp -Ddebug=true \
          -Dagent.name=example-server-b \
          -Durl="service:jmx:rmi:///jndi/${jndirmi}/server" \
          slp.Server &

```

Neste comando:

    * O nome do agente que é criado é `example-server-b`.
    * A service URL especifica o conector selecionado como RMI sobre JRMP, e o diretório externo no qual o stub do conector RMI, server, é armazenado é o registro RMI que você identificou como jndirmi em [Configuração Inicial](<#/doc/guides/jmx/lookup-services>).

Quando o `Server` é iniciado, você verá a confirmação da criação do conector RMI e o registro de sua URL no serviço SLP.

  * Conector RMI sobre JRMP, usando LDAP como diretório externo: Inicie o `Server` digitando o seguinte comando.
```
 $ java -classpath .:$classp -Ddebug=true \
          -Dagent.name=example-server-c \
          -Durl="service:jmx:rmi:///jndi/${jndildap}/cn=x,dc=Test" \
          -Djava.naming.security.principal="$principal" \
          -Djava.naming.security.credentials="$credentials" \
          slp.Server &

```

Neste comando:

    * O nome do agente criado é `example-server-c`.
    * A service URL especifica o conector selecionado como RMI sobre JRMP, e o diretório externo no qual o stub do conector RMI é armazenado é o servidor LDAP que você identificou como `jndildap` em [Configuração Inicial](<#/doc/guides/jmx/lookup-services>).
    * O stub é registrado no componente de domínio `Test` no servidor LDAP.
    * O atributo de nome comum, `principal`, e a senha `credentials`, são fornecidos para obter acesso ao servidor LDAP.

Quando o `Server` é iniciado, você verá a confirmação da criação do conector RMI e o registro de sua URL no serviço SLP sob o nome de agente `example-server-c`.

Iniciando o Cliente

Depois de iniciar o `Server` usando o transporte e o diretório externo de sua escolha, inicie o `Client`.
```
    $ java -classpath .:$classp -Ddebug=true \
         -Djava.naming.security.principal="$principal" \
         -Djava.naming.security.credentials="$credentials" \
         slp.Client

```

Você verá a saída confirmando a detecção dos agentes criados pelo `Server` e registrados no serviço de pesquisa. Você também verá a identificação e confirmação da conexão feita aos agentes.

Para pesquisar um agente específico, digite o seguinte comando:
```
    $ java -classpath .:$classp -Ddebug=true \
         -Djava.naming.security.principal="$principal" \
         -Djava.naming.security.credentials="$credentials" \
         -Dagent.name="agentName" \
        slp.Client

```

Neste comando mostrado acima, agentName é o nome do agente que você deseja pesquisar. Você pode especificar um nome de agente parcial usando `*`; por exemplo, `x*` para todos os nomes de agente que começam com a letra x.

### Serviço de Pesquisa Java Naming and Directory Interface (JNDI) / LDAP

A tecnologia JMX permite registrar conectores RMI com um serviço de pesquisa JNDI usando um registro LDAP como back end. Este exemplo executa as seguintes operações:

  * O agente:

    * Cria um MBean server

    * Cria um servidor de conector

    * Registra o endereço do conector com o servidor LDAP

  * O cliente:

    * Obtém um ponteiro para o serviço de pesquisa JNDI/LDAP

    * Procura por quaisquer servidores de conector registrados no serviço de pesquisa JNDI/LDAP

    * Cria um conector JMX Remote API

    * Recupera informações sobre os MBeans no MBean server

Analisando as Classes de Exemplo

  1. Copie o código-fonte contido na seção [Serviço de Pesquisa Java Naming and Directory Interface (JNDI)/LDAP](<#/doc/guides/jmx/java-naming-and-directory-interface-jndi-ldap-lookup-service-example>) e crie os arquivos correspondentes no diretório `work_dir/jmx_examples/Lookup/ldap`. Os arquivos dentro deste diretório devem então incluir o seguinte:

     * `README`
     * `Server.java`
     * `Client.java`
     * `jmx-schema.txt`
     * `60jmx-schema.ldif`
  2. Abra os arquivos `*.java`, em sua IDE ou editor de texto.

As seções a seguir analisam cada uma das classes usadas no exemplo de serviço de pesquisa JNDI/LDAP e explicam como elas executam as operações descritas acima.

#### Server.java no Exemplo de Serviço de Pesquisa JNDI/LDAP

Devido ao seu tamanho, a classe `Server.java` do serviço de pesquisa JNDI/LDAP é analisada na seguinte série de trechos de código:

  * [CODE EXAMPLE 12-12 JNDI/LDAP Lookup Service Example Server.java (Excerpt 1)](<#/doc/guides/jmx/lookup-services>)

  * [CODE EXAMPLE 12-13 JNDI/LDAP Lookup Service Example Class Server.java (Excerpt 2)](<#/doc/guides/jmx/lookup-services>)

  * [ EXAMPLE 12-14 JNDI/LDAP Lookup Service Example Class Server.java (Excerpt 3)](<#/doc/guides/jmx/lookup-services>)

  * [ EXAMPLE 12-15 JNDI/LDAP Lookup Service Example Class Server.java (Excerpt 4)](<#/doc/guides/jmx/lookup-services>)

CODE EXAMPLE 12-12 JNDI/LDAP Lookup Service Example Server.java (Excerpt 1)
```java
    [...]

    public class Server {
       public final static int JMX_DEFAULT_LEASE = 60;
       private static boolean debug = false;
       private final MBeanServer mbs;
       public Server() {
          mbs = MBeanServerFactory.createMBeanServer();
       }

      public static DirContext getRootContext() throws NamingException {
          final Hashtable env = new Hashtable();

          final String factory =
            System.getProperty(Context.INITIAL_CONTEXT_FACTORY,
                               "com.sun.jndi.ldap.LdapCtxFactory");
          final String ldapServerUrl =
            System.getProperty(Context.PROVIDER_URL);
          final String ldapUser =
            System.getProperty(Context.SECURITY_PRINCIPAL,
                               "cn=Directory Manager");
          final String ldapPasswd =
            System.getProperty(Context.SECURITY_CREDENTIALS);
          debug(Context.PROVIDER_URL + "=" + ldapServerUrl);
          debug(Context.SECURITY_PRINCIPAL + "=" + ldapUser);
          if (debug) {
                      System.out.print(Context.SECURITY_CREDENTIALS + "=");
                      final int len = (ldapPasswd==null)?0:ldapPasswd.length();
                      for (int i=0;i<len;i++) System.out.print("*");
                      System.out.println();
          }
          env.put(Context.INITIAL_CONTEXT_FACTORY,factory);
          env.put(Context.SECURITY_PRINCIPAL, ldapUser);
          if (ldapServerUrl != null)
               env.put(Context.PROVIDER_URL, ldapServerUrl);
          if (ldapPasswd != null)
               env.put(Context.SECURITY_CREDENTIALS, ldapPasswd);
          InitialContext root = new InitialLdapContext(env,null);
          return (DirContext)(root.lookup(""));
      }
    [...]
```

O CODE EXAMPLE 12-12 mostra a criação inicial de um MBean server, `mbs`, e obtém um ponteiro para o contexto raiz da árvore de diretórios LDAP na qual o endereço do servidor de conector é registrado. Todas as variáveis de acesso LDAP relevantes, como a provider URL, o nome de usuário LDAP e as credenciais de segurança, são fornecidas aqui e passadas para o `map` de ambiente, `env`. O `map` de ambiente, `env`, é então passado como parâmetro em uma chamada para o `InitialLdapContext`, do qual o contexto LDAP inicial é obtido.

CODE EXAMPLE 12-13 JNDI/LDAP Lookup Service Example Class Server.java (Excerpt 2)
```java
    [...]

    public static void register(DirContext root,
                               JMXServiceURL jmxUrl,
                               String name)
       throws NamingException, IOException {

       final String mydn = System.getProperty("dn","cn="+name);

       debug("dn: " + mydn );

       Object o = null;
       try {
           o = root.lookup(mydn);
       } catch (NameNotFoundException n) {
           Attributes attrs = new BasicAttributes();
           Attribute objclass = new BasicAttribute("objectClass");
           objclass.add("top");
           objclass.add("javaContainer");
           objclass.add("jmxConnector");
           attrs.put(objclass);
           attrs.put("jmxAgentName", name);
           o = root.createSubcontext(mydn,attrs);
       }
       if (o == null) throw new NameNotFoundException();
       final Attributes attrs = root.getAttributes(mydn);
```
```java
       final Attribute oc = attrs.get("objectClass");
       if (!oc.contains("jmxConnector")) {
           final String msg = "The supplied node [" + mydn + 
             "] does not contain the jmxConnector objectclass";
           throw new NamingException(msg);
       }
       final Attributes newattrs = new BasicAttributes();
       newattrs.put("jmxAgentName",name);
       newattrs.put("jmxServiceURL",jmxUrl.toString());
       newattrs.put("jmxAgentHost",InetAddress.getLocalHost().getHostName());
       newattrs.put("jmxProtocolType",jmxUrl.getProtocol());
       newattrs.put("jmxExpirationDate",
                    getExpirationDate(JMX_DEFAULT_LEASE));
       root.modifyAttributes(mydn,DirContext.REPLACE_ATTRIBUTE,newattrs);
    }
    
    [...]
```

O EXEMPLO DE CÓDIGO 12-13 mostra o registro da URL do serviço do JMX connector server no diretório LDAP. Você pode especificar o DN onde a URL será registrada, que pode ser passado na linha de comando através da propriedade de sistema `dn`, ou seja, `-Ddn=mydn`. Consulte os comandos usados para iniciar o servidor para uma descrição. Se a propriedade de sistema `dn` não for especificada, você pode usar o `DN: cn=name` onde `name` é o `agentName`. No entanto, isso não é obrigatório. A localização onde a URL é registrada não importa, porque o código do cliente nunca usa esse DN diretamente, mas em vez disso, executa uma busca LDAP para encontrar os nós que possuem uma `jmxConnector ObjectClass` auxiliar. O que é importante é que cada URL seja registrada em seu próprio nó LDAP. Como nomear esses nós é deixado para o administrador LDAP, que neste caso é você. Neste exemplo, assume-se que você configurou seu servidor LDAP criando um contexto raiz sob o qual o nó `cn=name` pode ser criado, e que este contexto `root` foi passado para o contexto inicial LDAP através da propriedade `Context.PROVIDER_URL`. Consulte [EXEMPLO DE CÓDIGO 12-12 JNDI/LDAP Lookup Service Example Server.java (Trecho 1)](<#/doc/guides/jmx/lookup-services>)).

O código no EXEMPLO DE CÓDIGO 12-13 verifica se o nó no qual você registrará a URL do servidor já existe. Se não existir, você tenta criá-lo. Isso falhará se o nó pai não existir. A `jmxConnector ObjectClass` é uma classe auxiliar simples; você usará a `javaContainer ObjectClass` como classe estrutural se precisar criar um novo contexto. Isso é completamente opcional. Qualquer classe estrutural à qual a classe auxiliar `jmxConnector` possa ser adicionada é aceitável. Em seguida, ele verifica se o nó no qual você registrará o servidor já possui a classe auxiliar `jmxConnector`. Caso contrário, uma exceção é lançada.

Neste ponto, você tem certeza de que o nó no qual você registrará a URL existe e possui a classe auxiliar `jmxConnector` apropriada. Você só precisa substituir os valores dos atributos definidos pela JMX Remote API para busca LDAP. Consulte jmx-schema.txt.

  * `jmxServiceUrl`: Contém a forma String da URL do servidor, conforme obtida de `server.getAddress()` após o servidor ser iniciado
  * `jmxAgentName`: Contém o nome do agente JMX
  * `jmxProtocolType`: Contém o tipo de protocolo JMX, conforme retornado por `jmxUrl.getProtocolType()`
  * `jmxAgentHost`: Contém o nome do host do agente
  * `jmxExpirationDate`: Contém a data em que a URL será considerada obsoleta

 EXEMPLO 12-14 JNDI/LDAP Lookup Service Example Class Server.java (Trecho 3)
```java
     [...]
    
       public JMXConnectorServer rmi(String url)
         throws IOException, JMException,
            NamingException, ClassNotFoundException {
    
         JMXServiceURL jurl = new JMXServiceURL(url);
         final HashMap env = new HashMap();
         // Prepare the environment Map
    [...]
    
         JMXConnectorServer rmis =
    JMXConnectorServerFactory.newJMXConnectorServer(jurl, env, mbs)
    
         final String agentName = System.getProperty("agent.name",
                                                     "DefaultAgent");
         start(rmis,env,agentName);
         return rmis;
       }
    [...]
```

O EXEMPLO DE CÓDIGO 12-14 cria um novo RMI connector server chamado `rmis` com a JMX service URL `jurl` e as propriedades LDAP apropriadas passadas para seu environment map `env`. O connector server `rmis` é iniciado chamando `JMXConnectorServer.start()` e é registrado no servidor LDAP.

 EXEMPLO 12-15 JNDI/LDAP Lookup Service Example Class Server.java (Trecho 4)
```java
    [...]
    
        public void start(JMXConnectorServer server, Map env, String agentName)
           throws IOException, NamingException {server.start()
           final DirContext root=getRootContext();
           final JMXServiceURL address = server.getAddress();register(root,address,agentName)
        }
    [...]
```

O EXEMPLO DE CÓDIGO 12-15 cria um JMX connector server, obtém um ponteiro para o diretório raiz do servidor LDAP `root`, e cria uma URL para o servidor chamada `address`. O diretório raiz, a URL e um nome de agente são passados como parâmetros para `register()` e são registrados no servidor LDAP.

#### Client.java no Exemplo de Serviço de Busca JNDI/LDAP

A classe de exemplo do serviço de busca JNDI/LDAP, `Client.java`, é mostrada no exemplo de código a seguir.

EXEMPLO DE CÓDIGO 12-16 JNDI/LDAP Lookup Service Example Class Client.java
```java
    [...]
    
    public class Client {
    
       private static boolean debug = false;
    
       public static void listAttributes(DirContext root, String dn)
         throws NamingException {
         final Attributes attrs = root.getAttributes(dn);
         System.out.println("dn: " + dn);
         System.out.println("attributes: " + attrs);
       }
       public static DirContext getRootContext() throws NamingException {
          final Hashtable env = new Hashtable();
          // Prepare environment map
          [...]
          InitialContext root = new InitialLdapContext(env,null);
          return (DirContext)(root.lookup(""));
       }
       // Confirm URL has not expired 
      [...] 
    
       public static List lookup(DirContext root, String protocolType,
                                 String name)
          throws IOException, NamingException {
          final ArrayList list = new ArrayList();
          String queryProtocol =
             (protocolType==null)?"":"(jmxProtocolType="+protocolType+")";
          String query =
              "(&" + "(objectClass=jmxConnector) " +
              "(jmxServiceURL=*) " +
              queryProtocol +
              "(jmxAgentName=" + ((name!=null)?name:"*") + "))";
    
          SearchControls ctrls = new SearchControls();
          ctrls.setSearchScope(SearchControls.SUBTREE_SCOPE);
          final NamingEnumeration results = root.search("", query, ctrls);
          while (results.hasMore()) { 
               final SearchResult r = (SearchResult) results.nextElement();
               debug("Found node: " + r.getName());
               final Attributes attrs = r.getAttributes();
               final Attribute attr = attrs.get("jmxServiceURL");
               if (attr == null) continue;
               final Attribute exp = attrs.get("jmxExpirationDate");
               if ((exp != null) && hasExpired((String)exp.get())) {
                   System.out.print(r.getName() + ": ");
                   System.out.println("URL expired since: " + exp.get());
                   continue;}
               final String urlStr = (String)attr.get();
               if (urlStr.length() == 0) continue;
    
               debug("Found URL: "+ urlStr);
    
               final JMXServiceURL url = new JMXServiceURL(urlStr);
               final JMXConnector conn =
                   JMXConnectorFactory.newJMXConnector(url,null);
               list.add(conn);
               if (debug) listAttributes(root,r.getName());
          }
    
          return list;
    }
    }
```

Neste exemplo de código, o `Client` primeiro retorna um ponteiro, `root`, para o `DirContext` do diretório LDAP, e então ele busca no diretório por `object classes` do tipo `jmxConnector`. Os atributos de URL de serviço e data de expiração, `attr` e `exp` respectivamente, para as `jmxConnector object classes` são obtidos, `exp` é verificado para garantir que a URL não expirou e uma chamada é feita para `JMXConnectorFactory` para criar um novo `connector conn`. O `connector conn` é adicionado à lista de `connectors` e é usado para acessar os MBeans no MBean server criado pelo `Server`.

#### jmx-schema.txt

O arquivo `jmx-schema.txt` é o arquivo de schema LDAP para a JMX Remote API.

#### 60jmx-schema.ldif

O arquivo `60jmx-schema.ldif` é um arquivo `ldif` que corresponde ao arquivo de schema LDAP, `jmx-schema.txt`, para a tecnologia JMX.

#### Executando o Exemplo de Serviço de Busca JNDI/LDAP

Este exemplo demonstra o uso do serviço de busca JNDI/LDAP para buscar RMI connector servers que implementam o JRMP transport padrão, bem como o IIOP transport. Além disso, conforme descrito em [Configuração Inicial](<#/doc/guides/jmx/lookup-services>), diferentes diretórios externos são usados para registrar os RMI connector stubs.

As combinações de transports e diretórios externos demonstradas aqui são:

  * RMI connector sobre o JRMP transport, com:

    * Nenhum diretório externo

    * Um RMI registry

    * Um LDAP registry

Antes de executar os exemplos que usam o serviço de busca JNDI/LDAP, você deve concluir as ações na seção Configuração Inicial e as ações específicas para este exemplo. Você pode então começar a buscar connectors usando a tecnologia de rede JNDI/LDAP, em conjunto com os dois connectors suportados pela tecnologia JMX.

Nota:

Ao executar os exemplos, para ajudar a acompanhar qual agente é criado com qual transport, os nomes dos agentes incluem um sufixo de letra que é o mesmo que a letra da seção correspondente. Por exemplo, o agente em [Iniciando o Servidor](<#/doc/guides/jmx/lookup-services>), RMI connector sobre JRMP, sem um diretório externo, é nomeado `example-server-a`.

Para executar o exemplo, siga a sequência de passos descrita em:

  * [Configurando o Exemplo de Serviço de Busca JNDI/LDAP](<#/doc/guides/jmx/lookup-services>)

  * [Iniciando o Servidor](<#/doc/guides/jmx/lookup-services>)

  * [Iniciando o Cliente](<#/doc/guides/jmx/lookup-services>)

Configurando o Exemplo de Serviço de Busca JNDI/LDAP

Os seguintes passos são exigidos por todas as diferentes combinações de connector/transport que você pode executar neste exemplo.

Nota:

Conclua os seguintes passos de acordo com o tipo de servidor LDAP que você está usando.

  1. Pare o servidor LDAP que você iniciou na [Configuração Inicial](<#/doc/guides/jmx/lookup-services>).

  2. Copie o schema da tecnologia JMX para o diretório de schema do seu servidor LDAP.

  3. Reinicie o servidor LDAP

  4. Defina a raiz sob a qual o Server registrará sua service URL. Você deve fornecer ao Server o caminho para o sufixo do componente de domínio `dc=Test` que você criou na [Configuração Inicial](<#/doc/guides/jmx/lookup-services>).
```
$ provider="ldap://$ldaphost:$ldapport/dc=Test"
```

  5. Compile as classes de exemplo `Client` e `Server` digitando o seguinte comando:
```
$ javac -d . -classpath $classp Server.java Client.java
```

Iniciando o Servidor

O comando que você usa para iniciar o `Server` varia de acordo com o diretório externo que você está usando. Você pode iniciar uma ou mais das seguintes instâncias de `Server` com diferentes transports e registries externos antes de iniciar o `Client`.

As combinações de transports e diretórios externos demonstradas aqui são:

  * RMI connector sobre JRMP, sem um diretório externo: Inicie o `Server` digitando o seguinte comando.
```
$ java -classpath . -Ddebug=true \
          -Dagent.name=example-server-a \
          -Durl="service:jmx:rmi://" \
          -Djava.naming.provider.url="$provider" \
          -Djava.naming.security.principal="$principal" \
          -Djava.naming.security.credentials="$credentials" \
          jndi.Server &
```

Neste comando:

    * O `debug` é definido como `true` para fornecer uma saída de tela mais completa quando o `Server` é executado.

    * O nome do agente a ser criado é `example-server-a`.

    * A URL, `provider`, que aponta para o sufixo do componente de domínio no qual o agente será registrado, é fornecida.

    * O atributo de nome comum, `principal`, e a senha, `credentials`, são fornecidos para obter acesso ao servidor LDAP.

    * A service URL especifica que o connector escolhido é um RMI connector, executando sobre o JRMP transport padrão do RMI.

Quando o `Server` é iniciado, você verá a confirmação da criação do RMI connector e o registro de sua URL no serviço de busca JNDI/LDAP.

  * RMI connector sobre JRMP, que usa um RMI registry como diretório externo: Inicie o `Server` digitando o seguinte comando.
```
$ java -classpath . -Ddebug=true \ 
          -Dagent.name=example-server-b \ 
          -Durl="service:jmx:rmi:///jndi/${jndirmi}/server" \ 
          -Djava.naming.provider.url="$provider" \ 
          -Djava.naming.security.principal="$principal" \ 
          -Djava.naming.security.credentials="$credentials" \ 
          jndi.Server &
```

Neste comando:

    * O nome do agente que é criado é `example-server-b`.

    * A URL, `provider`, que aponta para o sufixo do componente de domínio no qual o agente será registrado, é fornecida.

    * O atributo de nome comum, `principal`, e a senha, `credentials`, são fornecidos para obter acesso ao servidor LDAP.

    * A service URL especifica o connector selecionado como RMI sobre JRMP, e o diretório externo no qual o RMI connector stub, `server`, é armazenado é o RMI registry que você identificou como `jndirmi` em [Configuração Inicial](<#/doc/guides/jmx/lookup-services>).

Quando o `Server` é iniciado, você verá a confirmação da criação do RMI connector e o registro de sua URL no serviço de busca JNDI/LDAP.

  * RMI connector sobre JRMP, que usa LDAP como diretório externo: Inicie o `Server` digitando o seguinte comando.
```
$ java -classpath . -Ddebug=true \ 
          -Dagent.name=example-server-c \ 
          -Durl="service:jmx:rmi:///jndi/${jndildap}/cn=x,dc=Test" \ 
          -Djava.naming.provider.url="$provider" \ 
          -Djava.naming.security.principal="$principal" \ 
          -Djava.naming.security.credentials="$credentials" \ 
          jndi.Server &
```

Neste comando:

    * O nome do agente criado é `example-server-c`.

    * A URL, `provider`, que aponta para o sufixo do componente de domínio no qual o agente será registrado, é fornecida.

    * O atributo de nome comum, `principal`, e a senha, `credentials`, são fornecidos para obter acesso ao servidor LDAP.

    * A service URL especifica o connector escolhido como RMI sobre JRMP, e o diretório externo no qual o RMI connector stub, `server`, é armazenado é o RMI registry que você identificou como `jndildap` em [Configuração Inicial](<#/doc/guides/jmx/lookup-services>).

Quando o `Server` é iniciado, você verá a confirmação da criação do RMI connector e o registro de sua URL no serviço de busca JNDI/LDAP sob o nome de agente `example-server-c`.

Iniciando o Cliente

Depois de iniciar o Server que está usando o transport e o diretório externo de sua escolha, inicie o Client digitando o seguinte comando:
```
    $ java -classpath . -Ddebug=true \ 
      -Djava.naming.provider.url="$provider" \ 
      -Djava.naming.security.principal="$principal" \ 
      -Djava.naming.security.credentials="$credentials" \ 
      jndi.Client
```

Você verá a saída que confirma a detecção dos agentes que são criados pelo `Server` e registrados no serviço de busca. Você também verá a identificação e a confirmação da conexão feita aos agentes.

Para buscar um agente específico, digite o seguinte comando:
```
    $ java -classpath . -Ddebug=true \ 
      -Djava.naming.provider.url="$provider" \ 
      -Djava.naming.security.principal="$principal" \ 
      -Djava.naming.security.credentials="$credentials" \ 
      -Dagent.name=agentName \ 
      jndi.Client 
```

No comando mostrado acima, `agentName` é o nome do agente que você deseja buscar. Você também pode especificar um nome de agente parcial usando *; por exemplo, `x*` para todos os nomes de agentes que começam com a letra x.