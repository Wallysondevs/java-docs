# Uso da GSS-API Java para Trocas Seguras de Mensagens Sem Programação JAAS

## Uso da GSS-API Java para Trocas Seguras de Mensagens Sem Programação JAAS

Este tutorial apresenta duas aplicações de exemplo que demonstram o uso da GSS-API Java para trocas seguras de mensagens entre aplicações comunicantes, neste caso, uma aplicação cliente e uma aplicação servidor.

A GSS-API Java utiliza o que é chamado de "mecanismo de segurança" para fornecer esses serviços. A implementação da GSS-API contém suporte para o mecanismo Kerberos V5, além de quaisquer outras escolhas específicas do fornecedor. O mecanismo Kerberos V5 é usado para este tutorial.

Para realizar a autenticação entre o cliente e o servidor e estabelecer chaves criptográficas para comunicação segura, um mecanismo GSS-API precisa de acesso a certas credenciais para a entidade local em cada lado da conexão. No nosso caso, a credencial usada no lado do cliente consiste em um ticket Kerberos, e no lado do servidor, consiste em uma chave secreta Kerberos de longo prazo. Os tickets Kerberos podem opcionalmente incluir o endereço do host, e endereços de host IPv4 e IPv6 são ambos suportados. A GSS-API Java exige que o mecanismo obtenha essas credenciais do Subject vinculado ao período de execução da thread atual.

Para preencher um Subject com tais credenciais, as aplicações cliente e servidor tipicamente realizarão primeiro a autenticação JAAS usando um LoginModule Kerberos. O tutorial [Autenticação JAAS](<#/doc/guides/security/jaas-authentication>) demonstra como fazer isso. Uma utilidade também foi escrita como uma conveniência para realizar automaticamente essas operações em seu nome. O tutorial [Uso da Utilidade de Login JAAS](<#/doc/guides/security/use-jaas-login-utility>) demonstra como usar a utilidade Login.

Para este tutorial, não faremos com que o cliente e o servidor realizem a autenticação JAAS, nem os faremos usar a utilidade Login. Em vez disso, vamos depender da configuração da propriedade de sistema `javax.security.auth.useSubjectCredsOnly` para `false`, o que nos permite relaxar a restrição de exigir que um mecanismo GSS obtenha as credenciais necessárias de um [Subject](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>) existente, configurado pelo JAAS. Veja [A Propriedade de Sistema useSubjectCredsOnly](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>).

Nota:

Este é um tutorial introdutório simplificado.

Existe outro tutorial, [Uso da Utilidade de Login JAAS e GSS-API Java para Trocas Seguras de Mensagens](<#/doc/guides/security/use-jaas-login-utility-and-java-gss-api-secure-message-exchanges>), que é exatamente como o tutorial que você está lendo, exceto que ele utiliza a utilidade Login e um arquivo de configuração de login mais complexo. Um arquivo de configuração de login (veja [Apêndice B: Arquivo de Configuração de Login JAAS](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)), necessário sempre que a autenticação JAAS é realizada, especifica o módulo de autenticação desejado.

Assim como em todos os tutoriais desta série, a tecnologia subjacente usada para suportar a autenticação e comunicação segura para as aplicações neste tutorial é o Kerberos V5. Veja [Requisitos do Kerberos](<#/doc/guides/security/kerberos-requirements>).

  * [Visão Geral das Aplicações Cliente e Servidor](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)
  * [O Código SampleClient e SampleServer](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)
  * [Nomes de Usuário e Principal de Serviço Kerberos](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)
  * [O Arquivo de Configuração de Login](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)
  * [A Propriedade de Sistema useSubjectCredsOnly](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)
  * [Executando os Programas SampleClient e SampleServer](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)

Se você quiser ver o código do tutorial em ação primeiro, pode pular diretamente para [Executando os Programas SampleClient e SampleServer](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>) e depois voltar para as outras seções para aprender mais.

### Visão Geral das Aplicações Cliente e Servidor

As aplicações para este tutorial são nomeadas `SampleClient` e `SampleServer`.

Aqui está um resumo da execução das aplicações `SampleClient` e `SampleServer`:

  1. Execute a aplicação `SampleServer`. `SampleServer`
     1. Lê seu argumento, o número da porta na qual deve escutar por conexões de clientes.
     2. Cria um ServerSocket para escutar por conexões de clientes nessa porta.
     3. Escuta por uma conexão.
  2. Execute a aplicação `SampleClient` (possivelmente em uma máquina diferente). `SampleClient`
     1. Lê seus argumentos: (1) O nome do principal Kerberos que representa `SampleServer` (veja [Nomes de Usuário e Principal de Serviço Kerberos](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)), (2) o nome do host (máquina) onde `SampleServer` está sendo executado, e (3) o número da porta na qual `SampleServer` escuta por conexões de clientes.
     2. Tenta uma conexão de socket com o `SampleServer`, usando o host e a porta que foram passados como argumentos.
  3. A conexão de socket é aceita pelo `SampleServer` e ambas as aplicações inicializam um DataInputStream e um DataOutputStream a partir dos streams de entrada e saída do socket, para serem usados em futuras trocas de dados.
  4. `SampleClient` e `SampleServer` instanciam um GSSContext cada e seguem um protocolo para estabelecer um contexto compartilhado que permitirá trocas de dados seguras subsequentes.
  5. `SampleClient` e `SampleServer` podem agora trocar mensagens de forma segura.
  6. Quando `SampleClient` e `SampleServer` terminam de trocar mensagens, eles realizam operações de limpeza.

O código real e mais detalhes são apresentados nas seções seguintes.

### O Código SampleClient e SampleServer

O código completo para ambos os programas [` SampleClient.java`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>) e [`SampleServer.java`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>) reside em seus métodos `main` e pode ser dividido nas seguintes subpartes:

  1. [Obtendo os Argumentos da Linha de Comando](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)
  2. [Estabelecendo uma Conexão de Socket para Trocas de Mensagens](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)
  3. [Estabelecendo um Contexto de Segurança](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)
  4. [Trocando Mensagens de Forma Segura](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)
  5. [Limpeza](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)

Nota:

As classes GSS-API Java utilizadas por esses programas (GSSManager, GSSContext, GSSName, GSSCredential, MessageProp e Oid) são encontradas no pacote [org.ietf.jgss](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.jgss/org/ietf/jgss/package-summary.html>).

#### Obtendo os Argumentos da Linha de Comando

A primeira coisa que ambos os métodos `main` do nosso cliente e servidor fazem é ler os argumentos da linha de comando.

##### Argumentos Lidos por SampleClient

`SampleClient` espera três argumentos:

  1. Um nome de principal de serviço - O nome do principal Kerberos que representa `SampleServer` (veja [Nomes de Usuário e Principal de Serviço Kerberos](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)).
  2. Um nome de host - A máquina na qual `SampleServer` está sendo executado.
  3. Um número de porta - O número da porta na qual `SampleServer` escuta por conexões.

Aqui está o código para ler os argumentos da linha de comando:
```java
    if (args.length < 3) {
        System.out.println("Usage: java <options> Login SampleClient "
           + " <servicePrincipal> <hostName> <port>");
        System.exit(-1);
    }
    
    String server = args[0];
    String hostName = args[1];
    int port = Integer.parseInt(args[2]);
```

##### Argumento Lido por SampleServer

`SampleServer` espera apenas um argumento:

  * Um número de porta local - O número da porta usado por `SampleServer` para escutar por conexões com clientes. Este número deve ser o mesmo que o número da porta especificado ao executar o programa `SampleClient`.

Aqui está o código para ler o argumento da linha de comando:
```java
    if (args.length != 1) {
        System.out.println(
            "Usage: java <options> Login SampleServer <localPort>");
        System.exit(-1);
    }
    
    int localPort = Integer.parseInt(args[0]);
```

#### Estabelecendo uma Conexão de Socket para Trocas de Mensagens

A GSS-API Java fornece métodos para criar e interpretar tokens (dados de byte opacos). Os tokens contêm mensagens a serem trocadas de forma segura entre dois pares, mas o método de transferência real do token é responsabilidade dos pares. Para nossas aplicações `SampleClient` e `SampleServer`, estabelecemos uma conexão de socket entre o cliente e o servidor e trocamos dados usando os streams de entrada e saída do socket.

##### Código SampleClient para Conexão de Socket

`SampleClient` recebeu como argumentos o nome da máquina host onde `SampleServer` está sendo executado, bem como o número da porta na qual `SampleServer` estará escutando por conexões, então `SampleClient` tem tudo o que precisa para estabelecer uma conexão de socket com `SampleServer`. Ele usa o seguinte código para configurar a conexão e inicializar um DataInputStream e um DataOutputStream para futuras trocas de dados:
```java
    Socket socket = new Socket(hostName, port);
    
    DataInputStream inStream = 
      new DataInputStream(socket.getInputStream());
    DataOutputStream outStream = 
      new DataOutputStream(socket.getOutputStream());
    
    System.out.println("Connected to server " 
       + socket.getInetAddress());
```

##### Código SampleServer para Conexão de Socket

A aplicação `SampleServer` recebeu como argumento o número da porta a ser usado para escutar por conexões de clientes. Ela cria um `ServerSocket` para escutar nessa porta:
```java
    ServerSocket ss = new ServerSocket(localPort);
```

O `ServerSocket` pode então esperar e aceitar uma conexão de um cliente, e então inicializar um DataInputStream e um DataOutputStream para futuras trocas de dados com o cliente:
```java
    Socket socket = ss.accept();
    
    DataInputStream inStream =
        new DataInputStream(socket.getInputStream());
    DataOutputStream outStream = 
        new DataOutputStream(socket.getOutputStream());
    
    System.out.println("Got connection from client "
        + socket.getInetAddress());
```

O método `accept` espera até que um cliente (em nosso caso, `SampleClient`) solicite uma conexão no host e porta do `SampleServer`, o que `SampleClient` faz via
```java
    Socket socket = new Socket(hostName, port);
```

Quando a conexão é solicitada e estabelecida, o método `accept` retorna um novo objeto Socket vinculado a uma nova porta. O servidor pode se comunicar com o cliente através deste novo socket e continuar a escutar por outras solicitações de conexão de clientes no `ServerSocket` vinculado à porta original. Assim, um programa servidor tipicamente possui um loop que pode lidar com múltiplas solicitações de conexão.

A estrutura básica do loop para o nosso `SampleServer` é a seguinte:
```java
    while (true) {
    
        Socket socket = ss.accept();
    
        <Establish input and output streams for the connection>; 
        <Establish a context with the client>; 
        <Exchange messages with the client>;
        <Clean up>;
    }
```

As conexões de clientes são enfileiradas na porta original, então com esta estrutura de programa usada por `SampleServer`, a interação com o primeiro cliente que faz uma conexão deve ser concluída antes que a próxima conexão possa ser aceita. O servidor poderia, na verdade, atender múltiplos clientes simultaneamente através do uso de threads - uma thread por conexão de cliente, como em
```java
    while (true) {
        <accept a connection>;
        <create a thread to handle the client>;
    }
    
```

#### Estabelecendo um Contexto de Segurança

Antes que duas aplicações possam usar a GSS-API Java para trocar mensagens de forma segura entre elas, elas devem estabelecer um contexto de segurança conjunto usando suas credenciais. (Nota: No caso de `SampleClient`, as credenciais foram estabelecidas quando a utilidade Login autenticou o usuário em cujo nome o `SampleClient` foi executado, e similarmente para `SampleServer`.) O contexto de segurança encapsula informações de estado compartilhado que podem incluir, por exemplo, chaves criptográficas. Um uso de tais chaves pode ser para criptografar mensagens a serem trocadas, se a criptografia for solicitada.

Como parte do estabelecimento do contexto de segurança, o iniciador do contexto (em nosso caso, `SampleClient`) é autenticado para o aceitador (`SampleServer`), e pode exigir que o aceitador também seja autenticado de volta para o iniciador, caso em que dizemos que ocorreu uma "autenticação mútua".

Ambas as aplicações criam e usam um objeto GSSContext para estabelecer e manter as informações compartilhadas que compõem o contexto de segurança.

A instanciação do objeto de contexto é feita de forma diferente pelo iniciador do contexto e pelo aceitador do contexto. Depois que o iniciador instancia um GSSContext, ele pode optar por definir várias opções de contexto que determinarão as características do contexto de segurança desejado, por exemplo, especificando se a autenticação mútua deve ou não ocorrer. Depois que todas as características desejadas forem definidas, o iniciador chama o método `initSecContext`, que produz um token exigido pelo método `acceptSecContext` do aceitador.

Embora existam métodos da GSS-API Java para preparar tokens a serem trocados entre aplicações, é responsabilidade das aplicações realmente transferir os tokens entre elas. Assim, depois que o iniciador recebe um token de sua chamada para `initSecContext`, ele envia esse token para o aceitador. O aceitador chama `acceptSecContext`, passando-lhe o token. O método `acceptSecContext` pode, por sua vez, retornar um token. Se o fizer, o aceitador deve enviar esse token para o iniciador, que deve então chamar `initSecContext` novamente e passar-lhe este token. Cada vez que `initSecContext` ou `acceptSecContext` retorna um token, a aplicação que chamou o método deve enviar o token para seu par e esse par deve passar o token para seu método apropriado (`acceptSecContext` ou `initSecContext`). Isso continua até que o contexto esteja totalmente estabelecido (o que ocorre quando o método `isEstablished` do contexto retorna `true`).

O código de estabelecimento de contexto para nossas aplicações de exemplo é descrito no seguinte:

  * [Estabelecimento de Contexto por SampleClient](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)
  * [Estabelecimento de Contexto por SampleServer](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)

##### Estabelecimento de Contexto por SampleClient

Em nosso cenário cliente/servidor, SampleClient é o iniciador do contexto. Aqui estão os passos básicos que ele toma para estabelecer um contexto de segurança:

  1. [Instanciação do GSSContext pelo SampleClient](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)
  2. [Configuração de Opções Desejadas pelo SampleClient](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)
  3. [Loop de Estabelecimento de Contexto do SampleClient](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>): Repete enquanto o contexto ainda não está estabelecido, a cada vez chamando `initSecContext`, enviando qualquer token retornado para `SampleServer`, e recebendo um token (se houver) de `SampleServer`.

###### Instanciação do GSSContext pelo SampleClient

Um GSSContext é criado instanciando um GSSContext e então chamando um de seus métodos `createContext`. A classe GSSManager serve como uma fábrica para outras classes importantes da GSS API. Ela pode criar instâncias de classes que implementam as interfaces GSSContext, GSSCredential e GSSName.

`SampleClient` obtém uma instância da subclasse GSSManager padrão chamando o método estático `getInstance` da GSSManager:
```java
    GSSManager manager = GSSManager.getInstance();
```

A subclasse GSSManager padrão é aquela cujos métodos `create*` (`createContext`, etc.) retornam classes cujas implementações suportam Kerberos como tecnologia subjacente.

O método de fábrica GSSManager para criar um contexto no lado do iniciador tem a seguinte assinatura:
```java
    GSSContext createContext(GSSName peer, Oid mech, 
                GSSCredential myCred, int lifetime);
```

As seções seguintes descrevem os argumentos, seguidas pela chamada completa para `createContext`.

###### O Argumento GSSName peer

O par em nosso paradigma cliente/servidor é o servidor. Para o argumento `peer`, precisamos de um GSSName para o principal de serviço que representa o servidor. (Veja [Nomes de Usuário e Principal de Serviço Kerberos](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>).) Uma String para o nome do principal de serviço é passada como o primeiro argumento para `SampleClient`, que coloca o argumento em sua variável String local chamada `server`. O GSSManager `manager` é usado para instanciar um GSSName chamando um de seus métodos `createName`. `SampleClient` chama o método `createName` com a seguinte assinatura:
```java
    GSSName createName(String nameStr, Oid nameType);
```

`SampleClient` passa a String `server` para o argumento `nameStr`.

O segundo argumento é um Oid. Um Oid representa um Identificador Universal de Objeto. Oids são identificadores hierárquicos globalmente interpretáveis usados dentro da estrutura da GSS-API para identificar mecanismos e tipos de nomes. A estrutura e codificação de Oids são definidas nos padrões ISOIEC-8824 e ISOIEC-8825. O Oid passado para o método `createName` é especificamente um Oid de tipo de nome (não um Oid de mecanismo).

Na GSS-API, nomes de string são frequentemente mapeados de um formato independente de mecanismo para um formato específico de mecanismo. Geralmente, um Oid especifica em qual formato de nome a string está para que o mecanismo saiba como fazer esse mapeamento. Passar um Oid `null` indica que o nome já está em um formato nativo que o mecanismo usa. Este é o caso para a String `server`; ela está no formato apropriado para um nome Kerberos Versão 5. Assim, `SampleClient` passa `null` para o Oid. Aqui está a chamada:
```java
    GSSName serverName = manager.createName(server, null);
```

###### O Argumento Oid mech

O segundo argumento para o método `createContext` do GSSManager é um Oid que representa o mecanismo a ser usado para a autenticação entre o cliente e o servidor durante o estabelecimento do contexto e para a comunicação segura subsequente entre eles.

Nosso tutorial usará Kerberos V5 como mecanismo de segurança. O Oid para o mecanismo Kerberos V5 é definido na [RFC 1964](<http://www.ietf.org/rfc/rfc1964.txt>) como "1.2.840.113554.1.2.2", então criamos tal Oid:
```java
    Oid krb5Oid = new Oid("1.2.840.113554.1.2.2");
```

`SampleClient` passa `krb5Oid` como o segundo argumento para `createContext`.

###### O Argumento GSSCredential myCred

O terceiro argumento para o método `createContext` do GSSManager é um GSSCredential que representa as credenciais do chamador. Se você passar `null` para este argumento, como o SampleClient faz, as credenciais padrão são usadas.

###### O Argumento int lifetime

O argumento final para o método `createContext` do GSSManager é um `int` que especifica o tempo de vida desejado, em segundos, para o contexto que é criado. `SampleClient` passa `GSSContext.DEFAULT_LIFETIME` para solicitar um tempo de vida padrão.

###### A Chamada Completa de createContext

Agora que temos todos os argumentos necessários, aqui está a chamada que `SampleClient` faz para criar um GSSContext:
```java
    GSSContext context = 
        manager.createContext(serverName,
                              krb5Oid,
                              null,
                              GSSContext.DEFAULT_LIFETIME);
```

###### Configuração de Opções Desejadas pelo SampleClient

Após instanciar um contexto, e antes de realmente estabelecer o contexto com o aceitador de contexto, o iniciador do contexto pode optar por definir várias opções que determinam as características desejadas do contexto de segurança. Cada uma dessas opções é definida chamando um método `request` no contexto instanciado. A maioria dos métodos `request` recebe um argumento `boolean` para indicar se o recurso é solicitado ou não. Nem sempre é possível que uma solicitação seja satisfeita, então se foi ou não pode ser determinado após o estabelecimento do contexto chamando um dos métodos `get`.

`SampleClient` solicita o seguinte:

  1. Autenticação mútua. O iniciador do contexto é sempre autenticado para o aceitador. Se o iniciador solicitar autenticação mútua, então o aceitador também é autenticado para o iniciador.
  2. Confidencialidade. Solicitar confidencialidade significa que você solicita a habilitação de criptografia para o método de contexto chamado `wrap`. A criptografia é realmente usada apenas se o objeto MessageProp passado para o método `wrap` solicitar privacidade.
  3. Integridade. Isso solicita integridade para os métodos `wrap` e `getMIC`. Quando a integridade é solicitada, uma tag criptográfica conhecida como Message Integrity Code (MIC) será gerada ao chamar esses métodos. Quando `getMIC` é chamado, o MIC gerado aparece no token retornado. Quando `wrap` é chamado, o MIC é empacotado junto com a mensagem (a mensagem original ou o resultado da criptografia da mensagem, dependendo se a confidencialidade foi aplicada) tudo como parte de um token. Você pode subsequentemente verificar o MIC contra a mensagem para garantir que a mensagem não foi modificada em trânsito.

O código `SampleClient` para fazer essas solicitações no `context` `GSSException` é o seguinte:
```java
    context.requestMutualAuth(true);  // Mutual authentication
    context.requestConf(true);  // Will use encryption later
    context.requestInteg(true); // Will use integrity later
```

Após o contexto ser estabelecido, o cliente deve verificar explicitamente os estados do contexto chamando os métodos acessores, como getMutualAuthState, getConfState ou getIntegState, e destruir o contexto de segurança se algum deles não corresponder ao estado desejado.

Nota:

Ao usar a implementação padrão do GSSManager e o mecanismo Kerberos, essas solicitações sempre serão concedidas.

###### Loop de Estabelecimento de Contexto do SampleClient

Depois que `SampleClient` instanciou um GSSContext e especificou as opções de contexto desejadas, ele pode realmente estabelecer o contexto de segurança com `SampleServer`. Para fazer isso, `SampleClient` tem um loop. Cada iteração do loop

  1. Chama o método `initSecContext` do contexto. Se esta for a primeira chamada, o método recebe um token `null`. Caso contrário, ele recebe o token mais recentemente enviado para `SampleClient` por `SampleServer` (um token gerado por uma chamada de `SampleServer` para `acceptSecContext`).
  2. Envia o token retornado por `initSecContext` (se houver) para `SampleServer`. A primeira chamada para `initSecContext` sempre produz um token. A última chamada pode não retornar um token.
  3. Verifica se o contexto está estabelecido. Se não, `SampleClient` recebe outro token de `SampleServer` e então inicia a próxima iteração do loop.

Os tokens retornados por `initSecContext` ou recebidos de `SampleServer` são colocados em um byte array. Os tokens devem ser tratados por `SampleClient` e `SampleServer` como dados opacos a serem passados entre eles e interpretados pelos métodos da GSS-API Java.

Os argumentos de `initSecContext` são um byte array contendo um token, o offset inicial nesse array de onde o token começa, e o comprimento do token. Para a primeira chamada, `SampleClient` passa um token null, já que nenhum token foi recebido de `SampleServer` ainda.

Para trocar tokens com `SampleServer`, `SampleClient` usa o DataInputStream `inStream` e o DataOutputStream `outStream` que ele configurou anteriormente usando os streams de entrada e saída para a conexão de socket feita com `SampleServer`. Note que sempre que um token é escrito, o número de bytes no token é escrito primeiro, seguido pelo próprio token. As razões são discutidas na introdução à seção [As Trocas de Mensagens do SampleClient e SampleServer](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>).

Aqui está o loop de estabelecimento de contexto do `SampleClient`, seguido pelo código que exibe informações sobre quem são o cliente e o servidor e se a autenticação mútua realmente ocorreu:
```java
    byte[] token = new byte[0];
    
    while (!context.isEstablished()) {
    
        // token is ignored on the first call
        token = context.initSecContext(token, 0, token.length);
    
        // Send a token to the server if one was generated by
        // initSecContext
        if (token != null) {
            System.out.println("Will send token of size "
                       + token.length + " from initSecContext.");
            outStream.writeInt(token.length);
            outStream.write(token);
            outStream.flush();
        }
    
        // If the client is done with context establishment
        // then there will be no more tokens to read in this loop
        if (!context.isEstablished()) {
            token = new byte[inStream.readInt()];
            System.out.println("Will read input token of size "
                       + token.length
                       + " for processing by initSecContext");
            inStream.readFully(token);
        }
    }
    
    System.out.println("Context Established! ");
    System.out.println("Client is " + context.getSrcName());
    System.out.println("Server is " + context.getTargName());
    if (context.getMutualAuthState())
        System.out.println("Mutual authentication took place!");
```

##### Estabelecimento de Contexto por SampleServer

Em nosso cenário cliente/servidor, `SampleServer` é o aceitador do contexto. Aqui estão os passos básicos que ele toma para estabelecer um contexto de segurança:

  1. [Instanciação do GSSContext pelo SampleServer](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)
  2. [Loop de Estabelecimento de Contexto do SampleClient](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>): Repete enquanto o contexto ainda não está estabelecido, a cada vez recebendo um token de `SampleClient`, chamando `acceptSecContext` e passando-lhe o token, e enviando qualquer token retornado para `SampleClient`.

###### Instanciação do GSSContext pelo SampleServer

Conforme descrito em [Instanciação do GSSContext pelo SampleClient](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>), um GSSContext é criado instanciando um GSSManager e então chamando um de seus métodos `createContext`.

Assim como `SampleClient`, `SampleServer` obtém uma instância da subclasse GSSManager padrão chamando o método estático `getInstance` da GSSManager:
```java
    GSSManager manager = GSSManager.getInstance();
```

O método de fábrica GSSManager para criar um contexto no lado do aceitador tem a seguinte assinatura:
```java
    GSSContext createContext(GSSCredential myCred);
```

Se você passar `null` para o argumento GSSCredential, como `SampleServer` faz, as credenciais padrão são usadas. O contexto é instanciado via o seguinte:
```java
    GSSContext context = manager.createContext((GSSCredential)null);
```

###### Loop de Estabelecimento de Contexto do SampleServer

Depois que SampleServer instanciou um GSSContext, ele pode estabelecer o contexto de segurança com SampleClient. Para fazer isso, SampleServer tem um loop que continua até que o contexto seja estabelecido. Cada iteração do loop faz o seguinte:

  1. Recebe um token de SampleClient. Este token é o resultado de uma chamada `initSecContext` do SampleClient.
  2. Chama o método `acceptSecContext` do contexto, passando-lhe o token recém-recebido.
  3. Se `acceptSecContext` retornar um token, então SampleServer envia este token para SampleClient e então inicia a próxima iteração do loop se o contexto ainda não estiver estabelecido.

Os tokens retornados por `acceptSecContext` ou recebidos de SampleClient são colocados em um byte array.

Os argumentos de `acceptSecContext` são um byte array contendo um token, o offset inicial nesse array de onde o token começa, e o comprimento do token.

Para trocar tokens com SampleClient, SampleServer usa o DataInputStream `inStream` e o DataOutputStream `outStream` que ele configurou anteriormente usando os streams de entrada e saída para a conexão de socket feita com SampleClient.

Aqui está o loop de estabelecimento de contexto do SampleServer:
```java
    byte[] token = null;
    
    while (!context.isEstablished()) {
    
        token = new byte[inStream.readInt()];
        System.out.println("Will read input token of size "
           + token.length
           + " for processing by acceptSecContext");
        inStream.readFully(token);
        
        token = context.acceptSecContext(token, 0, token.length);
        
        // Send a token to the peer if one was generated by
        // acceptSecContext
        if (token != null) {
            System.out.println("Will send token of size "
               + token.length
               + " from acceptSecContext.");
            outStream.writeInt(token.length);
            outStream.write(token);
            outStream.flush();
        }
    }
    
    System.out.print("Context Established! ");
    System.out.println("Client is " + context.getSrcName());
    System.out.println("Server is " + context.getTargName());
    if (context.getMutualAuthState())
        System.out.println("Mutual authentication took place!");
```

#### Trocando Mensagens de Forma Segura

Uma vez que um contexto de segurança tenha sido estabelecido entre `SampleClient` e `SampleServer`, eles podem usar o contexto para trocar mensagens de forma segura.

  * [Métodos GSSContext para Troca de Mensagens](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)
  * [As Trocas de Mensagens do SampleClient e SampleServer](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)

##### Métodos GSSContext para Troca de Mensagens

Existem dois tipos de métodos para preparar mensagens para troca segura: `wrap` e `getMIC`. Na verdade, existem dois métodos `wrap` (e dois métodos `getMIC`), onde as diferenças entre os dois são a indicação de onde a mensagem de entrada está (um byte array ou um input stream) e para onde a saída deve ir (para um valor de retorno de byte array ou para um output stream).

As seções seguintes descrevem esses métodos para preparar mensagens para troca e os métodos correspondentes para interpretação pelo par dos tokens resultantes.

###### wrap

O método `wrap` é o método principal para trocas de mensagens.

A assinatura para o método `wrap` chamado por `SampleClient` é a seguinte:
```java
    byte[] wrap (byte[] inBuf, int offset, interface len, 
```
                    MessageProp msgProp)
```

Você passa para `wrap` uma mensagem (em `inBuf`), o deslocamento em `inBuf` onde a mensagem começa (`offset`), e o comprimento da mensagem (`len`). Você também passa um `MessageProp`, que é usado para indicar a `QOP` (Quality-of-Protection) desejada e para especificar se a privacidade (criptografia) é desejada ou não. Um valor de `QOP` seleciona o(s) algoritmo(s) de integridade criptográfica e criptografia (se solicitado) a ser(em) usado(s). Os algoritmos correspondentes a vários valores de `QOP` são especificados pelo provedor do mecanismo subjacente. Por exemplo, os valores para `Kerberos V5` são definidos no RFC 1964 na seção 4.2. É comum especificar `0` como o valor de `QOP` para solicitar a `QOP` padrão.

O método `wrap` retorna um `token` contendo a mensagem e um `Message Integrity Code` (MIC) criptográfico sobre ela. A mensagem colocada no `token` será criptografada se o `MessageProp` indicar que a privacidade é desejada. Você não precisa saber o formato do `token` retornado; ele deve ser tratado como dados opacos. Você envia o `token` retornado para sua aplicação par, que chama o método `unwrap` para "desembrulhar" o `token` para obter a mensagem original e verificar sua integridade.

###### getMIC

Se você simplesmente deseja obter um `token` contendo um `Message Integrity Code` (MIC) criptográfico para uma mensagem fornecida, você chama `getMIC`. Um exemplo de motivo pelo qual você pode querer fazer isso é para confirmar com seu par que ambos possuem os mesmos dados, apenas transportando um `MIC` para esses dados sem incorrer no custo de transportar os próprios dados um para o outro.

A assinatura para o método `getMIC` chamado por `SampleServer` é a seguinte:
```
    byte[] getMIC (byte[] inMsg, int offset, int len,
                MessageProp msgProp)
```

Você passa para `getMIC` uma mensagem (em `inMsg`), o deslocamento em `inMsg` onde a mensagem começa (`offset`), e o comprimento da mensagem (`len`). Você também passa um `MessageProp`, que é usado para indicar a `QOP` (Quality-of-Protection) desejada. É comum especificar `0` como o valor de `QOP` para solicitar a `QOP` padrão.

Se você tem um `token` criado por `getMIC` e a mensagem usada para calcular o `MIC` (ou uma mensagem que se presume ser a mensagem na qual o `MIC` foi calculado), você pode chamar o método `verifyMIC` para verificar o `MIC` para a mensagem. Se a verificação for bem-sucedida (ou seja, se uma `GSSException` não for lançada), isso prova que a mensagem é exatamente a mesma de quando o `MIC` foi calculado. Um par que recebe uma mensagem de uma aplicação geralmente espera um `MIC` também, para que possa verificar o `MIC` e ter certeza de que a mensagem não foi modificada ou corrompida em trânsito. Nota: Se você souber antecipadamente que desejará o `MIC` e também a mensagem, então é mais conveniente usar os métodos `wrap` e `unwrap`. Mas pode haver situações em que a mensagem e o `MIC` são recebidos separadamente.

A assinatura para o `verifyMIC` correspondente ao `getMIC` mostrado anteriormente é a seguinte:
```
    void verifyMIC (byte[] inToken, int tokOffset, int tokLen,
            byte[] inMsg, int msgOffset, int msgLen,
            MessageProp msgProp);
```

Isso verifica o `MIC` contido em `inToken` (de comprimento `tokLen`, começando no deslocamento `tokOffset`) sobre a mensagem contida em `inMsg` (de comprimento `msgLen`, começando no deslocamento `msgOffset`). O `MessageProp` é usado pelo mecanismo subjacente para retornar informações ao chamador, como a `QOP` indicando a força da proteção que foi aplicada à mensagem.

##### Trocas de Mensagens entre SampleClient e SampleServer

As trocas de mensagens entre `SampleClient` e `SampleServer` são os passos "padrão" usados para verificar um cliente e um servidor `GSS-API`. Um grupo no MIT escreveu um cliente `GSS-API` e um servidor `GSS-API` que se tornaram programas de teste bastante populares para verificar a interoperabilidade entre diferentes implementações da biblioteca `GSS-API`. (Essas aplicações de exemplo `GSS-API` podem ser baixadas como parte da distribuição `Kerberos` disponível no MIT em http://web.mit.edu/kerberos.) Este cliente e servidor do MIT seguem o protocolo de que, uma vez que o `context` é estabelecido, o cliente envia uma mensagem e espera de volta o `MIC` dessa mensagem. Se você implementar uma biblioteca `GSS-API`, é prática comum testá-la executando o cliente ou o servidor usando sua implementação de biblioteca contra um servidor ou cliente par correspondente que usa outra implementação de biblioteca `GSS-API`. Se ambas as implementações de biblioteca estiverem em conformidade com os padrões, então os dois pares serão capazes de se comunicar com sucesso.

Uma implicação de testar seu cliente ou servidor contra aqueles escritos em C (como os do MIT) é a forma como os `tokens` devem ser trocados. Implementações C de `GSS-API` não incluem métodos baseados em `stream`. Na ausência de métodos baseados em `stream` em seu par, ao escrever um `token`, você deve primeiro escrever o número de `bytes` e depois escrever o `token`. Da mesma forma, ao ler um `token`, você primeiro lê o número de `bytes` e depois lê o `token`. Isso é o que `SampleClient` e `SampleServer` fazem.

Aqui está o resumo das trocas de mensagens entre `SampleClient` e `SampleServer`:

  1. `SampleClient` chama `wrap` para criptografar e calcular um `MIC` para uma mensagem.
  2. `SampleClient` envia o `token` retornado de `wrap` para `SampleServer`.
  3. `SampleServer` chama `unwrap` para obter a mensagem original e verificar sua integridade.
  4. `SampleServer` chama `getMIC` para calcular um `MIC` na mensagem descriptografada.
  5. `SampleServer` envia o `token` retornado por `getMIC` (que contém o `MIC`) para `SampleClient`.
  6. `SampleClient` chama `verifyMIC` para verificar se o `MIC` enviado por `SampleServer` é um `MIC` válido para a mensagem original.

###### Código do SampleClient para Criptografar a Mensagem e Enviá-la

O código do `SampleClient` para criptografar uma mensagem, calcular um `MIC` para ela e enviar o resultado para `SampleServer` é o seguinte:
```
    byte[] messageBytes = "Hello There!\0".getBytes();
    
    /*
     * The first MessageProp argument is 0 to request
     * the default Quality-of-Protection.
     * The second argument is true to request
     * privacy (encryption of the message).
     */
    MessageProp prop =  new MessageProp(0, true);
    
    /*
     * Encrypt the data and send it across. Integrity protection
     * is always applied, irrespective of encryption.
     */
    token = context.wrap(messageBytes, 0, messageBytes.length, 
        prop);
    System.out.println("Will send wrap token of size " 
        + token.length);
    outStream.writeInt(token.length);
    outStream.write(token);
    outStream.flush();
```

###### Código do SampleServer para Desembrulhar o Token, Calcular o MIC e Enviá-lo

O seguinte código do `SampleServer` lê o `token` "embrulhado" enviado por `SampleClient` e o "desembrulha" para obter a mensagem original e ter sua integridade verificada. O "desembrulhamento" neste caso inclui a descriptografia, uma vez que a mensagem foi criptografada.

Nota:

Aqui, espera-se que a verificação de integridade seja bem-sucedida. Mas observe que, em geral, se uma verificação de integridade falhar, isso significa que a mensagem foi alterada em trânsito. Se o método `unwrap` encontrar uma falha na verificação de integridade, ele lança uma `GSSException` com o código de erro principal `GSSException.BAD_MIC`.
```
    /*
     * Create a MessageProp which unwrap will use to return 
     * information such as the Quality-of-Protection that was 
     * applied to the wrapped token, whether or not it was 
     * encrypted, etc. Since the initial MessageProp values
     * are ignored, it doesn't matter what they are set to.
     */
    MessageProp prop = new MessageProp(0, false);
    
    /* 
     * Read the token. This uses the same token byte array 
     * as that used during context establishment.
     */
    token = new byte[inStream.readInt()];
    System.out.println("Will read token of size " 
        + token.length);
    inStream.readFully(token);
    
    byte[] bytes = context.unwrap(token, 0, token.length, prop);
    String str = new String(bytes);
    System.out.println("Received data \""
        + str + "\" of length " + str.length());
    System.out.println("Encryption applied: "
        + prop.getPrivacy());
```

Em seguida, `SampleServer` gera um `MIC` para a mensagem descriptografada e o envia para `SampleClient`. Isso não é realmente necessário, mas simplesmente ilustra a geração de um `MIC` na mensagem descriptografada, que deve ser exatamente a mesma que a mensagem original que `SampleClient` "embrulhou" e enviou para `SampleServer`. Quando `SampleServer` gera isso e o envia para `SampleClient`, e `SampleClient` o verifica, isso prova para `SampleClient` que a mensagem descriptografada que `SampleServer` possui é, de fato, exatamente a mesma que a mensagem original de `SampleClient`.
```
    /*
     * First reset the QOP of the MessageProp to 0
     * to ensure the default Quality-of-Protection
     * is applied.
     */
    prop.setQOP(0);
    
    token = context.getMIC(bytes, 0, bytes.length, prop);
    
    System.out.println("Will send MIC token of size " 
                       + token.length);
    outStream.writeInt(token.length);
    outStream.write(token);
    outStream.flush();
```

###### Código do SampleClient para Verificar o MIC

O seguinte código do `SampleClient` lê o `MIC` calculado por `SampleServer` na mensagem descriptografada e então verifica se o `MIC` é um `MIC` para a mensagem original, provando que a mensagem descriptografada que `SampleServer` possui é a mesma que a mensagem original:
```
    token = new byte[inStream.readInt()];
    System.out.println("Will read token of size " + token.length);
    inStream.readFully(token);
    
    /* 
     * Recall messageBytes is the byte array containing
     * the original message and prop is the MessageProp 
     * already instantiated by SampleClient.
     */
    context.verifyMIC(token, 0, token.length, 
              messageBytes, 0, messageBytes.length,
              prop);
    
    System.out.println("Verified received MIC for message.");
```

#### Limpeza

Quando `SampleClient` e `SampleServer` terminam de trocar mensagens, eles precisam realizar operações de limpeza. Ambos contêm o seguinte código para

  * fechar a conexão `socket` e

  * liberar recursos do sistema e informações criptográficas armazenadas no objeto `context` e então invalidar o `context`.
`socket.close();
        context.dispose();
```

### Nomes de Principal de Usuário e Serviço Kerberos

Como a tecnologia subjacente de autenticação e comunicação segura usada por este tutorial é `Kerberos V5`, usamos nomes de `principal` no estilo `Kerberos` sempre que um usuário ou serviço é solicitado (veja [Principals](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)).

Por exemplo, ao executar `SampleClient`, você é solicitado a fornecer seu nome de usuário. Seu nome de usuário no estilo `Kerberos` é simplesmente o nome de usuário que lhe foi atribuído para autenticação `Kerberos`. Ele consiste em um nome de usuário base (como `mjones`) seguido por um "`@`" e seu `realm` (como `mjones@KRBNT-OPERATIONS.EXAMPLE.COM`).

Um programa de servidor como `SampleServer` é tipicamente considerado para oferecer um "serviço" e ser executado em nome de um "service principal" específico. Um nome de `service principal` para `SampleServer` é necessário em vários lugares:

  * Ao executar `SampleServer`, e `SampleClient` tentar uma conexão com ele, o mecanismo `Kerberos` subjacente tentará autenticar-se no `KDC` `Kerberos`. Ele solicita que você faça login. Você deve fazer login como o `service principal` apropriado.
  * Ao executar `SampleClient`, um dos argumentos é o nome do `service principal`. Isso é necessário para que `SampleClient` possa iniciar o estabelecimento de um `context` de segurança com o serviço apropriado.

Ao longo deste documento, e no arquivo de configuração de login que o acompanha, `service_principal@your_realm` é usado como um espaço reservado para ser substituído pelo nome real a ser usado em seu ambiente. Qualquer `principal` `Kerberos` pode, na verdade, ser usado para o nome do `service principal`. Assim, para os propósitos de experimentar este tutorial, você poderia usar seu nome de usuário tanto como o nome de usuário do cliente quanto como o nome do `service principal`.

Em um ambiente de produção, os administradores de sistema geralmente preferem que os servidores sejam executados apenas como `principals` específicos e podem atribuir um nome particular a ser usado. Frequentemente, o nome do `service principal` no estilo `Kerberos` atribuído é da forma
```
    service_name/machine_name@realm;
```

Por exemplo, um serviço `nfs` executado em uma máquina chamada `raven` no `realm` chamado `KRBNT-OPERATIONS.EXAMPLE.COM` poderia ter o nome de `service principal`
```
    nfs/raven@KRBNT-OPERATIONS.EXAMPLE.COM
```

Tais nomes de múltiplos componentes não são obrigatórios, no entanto. Nomes de componente único, assim como os de `principals` de usuário, podem ser usados. Por exemplo, uma instalação pode usar o mesmo `service principal` `ftp@realm` para todos os servidores `ftp` nesse `realm`, enquanto outra instalação pode ter diferentes `principals` `ftp` para diferentes servidores `ftp`, como `ftp/host1@realm` e `ftp/host2@realm` nas máquinas `host1` e `host2`, respectivamente.

#### Quando o Realm é Necessário em Nomes de Principal

Se o `realm` de um nome de `principal` de usuário ou serviço for o `realm` padrão (veja [Kerberos Requirements](<#/doc/guides/security/kerberos-requirements>)), você pode omitir o `realm` ao fazer login no `Kerberos` (ou seja, quando for solicitado seu nome de usuário). Assim, por exemplo, se seu nome de usuário for `mjones@KRBNT-OPERATIONS.EXAMPLE.COM`, e você executar `SampleClient`, quando ele solicitar seu nome de usuário, você poderia apenas especificar `mjones`, omitindo o `realm`. O nome é interpretado no contexto de ser um nome de `principal` `Kerberos` e o `realm` padrão é anexado, conforme necessário.

Você também pode omitir o `realm` se um nome de `principal` for convertido para um `GSSName` por um método `createName` do `GSSManager`. Por exemplo, ao executar `SampleClient`, um dos argumentos é o nome do `service principal`. Você pode especificar o nome sem incluir o `realm`, porque `SampleClient` passa o nome para tal método `createName`, que anexa o `realm` padrão conforme necessário.

Recomenda-se que você sempre inclua `realms` quando nomes de `principal` forem usados em arquivos de configuração de login, pois o comportamento dos analisadores para tais arquivos pode ser dependente da implementação. Eles podem ou não anexar o `realm` padrão antes que tais nomes sejam utilizados e ações subsequentes podem falhar se não houver `realm` no nome.

### O Arquivo de Configuração de Login

Para este tutorial, estamos permitindo que o mecanismo `Kerberos` subjacente obtenha as `credentials` dos usuários que executam `SampleClient` e `SampleServer`, em vez de invocar métodos `JAAS` diretamente (como no tutorial [JAAS Authentication](<#/doc/guides/security/jaas-authentication>)) ou indiretamente (por exemplo, via utilitário `Login` descrito no tutorial [Use of JAAS Login Utility](<#/doc/guides/security/use-jaas-login-utility>) e no tutorial [Use of JAAS Login Utility and Java GSS-API for Secure Message Exchanges](<#/doc/guides/security/use-jaas-login-utility-and-java-gss-api-secure-message-exchanges>)).

A implementação padrão do mecanismo `Kerberos` fornecida pela Oracle realmente solicita um nome e senha `Kerberos` e autentica o usuário (ou serviço) especificado no `KDC` `Kerberos`. O mecanismo depende do `JAAS` para realizar esta autenticação.

`JAAS` suporta um `framework` de autenticação plugável, o que significa que qualquer tipo de `authentication module` pode ser conectado a uma aplicação chamadora. Uma configuração de login especifica o `login module` a ser usado para uma aplicação particular. A implementação padrão do `JAAS` da Oracle exige que as informações de configuração de login sejam especificadas em um arquivo. (Nota: Alguns outros fornecedores podem não ter implementações baseadas em arquivo.) Veja [Appendix B: JAAS Login Configuration File](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>) para informações sobre o que é um arquivo de configuração de login, o que ele contém e como especificar qual arquivo de configuração de login deve ser usado.

Para este tutorial, o `login module` `Kerberos` `com.sun.security.auth.module.Krb5LoginModule` é especificado no arquivo de configuração. Este `login module` solicita um nome e senha `Kerberos` e tenta autenticar-se no `KDC` `Kerberos`.

Tanto `SampleClient` quanto `SampleServer` podem usar o mesmo arquivo de configuração de login, se esse arquivo contiver duas entradas, uma para o lado do cliente e outra para o lado do servidor.

O arquivo de configuração de login [`bcsLogin.conf`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>) usado para este tutorial é o seguinte:
```
    com.sun.security.jgss.initiate  {
      com.sun.security.auth.module.Krb5LoginModule required;
    };
    
    com.sun.security.jgss.accept  {
      com.sun.security.auth.module.Krb5LoginModule required storeKey=true 
    };
```

Entradas com esses dois nomes (`com.sun.security.jgss.initiate` e `com.sun.security.jgss.accept`) são usadas por implementações Oracle de mecanismos `GSS-API` quando precisam de novas `credentials`. Como o mecanismo usado neste tutorial é o mecanismo `Kerberos V5`, um `login module` `Kerberos` precisará ser invocado para obter essas `credentials`. Assim, listamos [Krb5LoginModule](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.auth/com/sun/security/auth/module/Krb5LoginModule.html>) como um módulo `required` nessas entradas. A entrada `com.sun.security.jgss.initiate` especifica a configuração para o lado do cliente e a entrada `com.sun.security.jgss.accept` para o lado do servidor.

O `Krb5LoginModule` só é bem-sucedido se a tentativa de fazer login no `KDC` `Kerberos` como uma entidade especificada for bem-sucedida. Ao executar `SampleClient` ou `SampleServer`, o usuário será solicitado a fornecer um nome e senha.

A entrada `storeKey=true` do `SampleServer` indica que uma chave secreta deve ser calculada a partir da senha fornecida durante o login e deve ser armazenada nas `private credentials` do `Subject` criado como resultado do login. Esta chave é subsequentemente utilizada durante a `mutual authentication` ao estabelecer um `security context` entre `SampleClient` e `SampleServer`.

A documentação da `API` `JavaDoc` do [Krb5LoginModule](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.auth/com/sun/security/auth/module/Krb5LoginModule.html>) descreve as opções de configuração que a classe `Krb5LoginModule` suporta.

### A Propriedade de Sistema useSubjectCredsOnly

Para este tutorial, definimos a `system property` `javax.security.auth.useSubjectCredsOnly` como `false`, o que nos permite flexibilizar a restrição usual de exigir que um mecanismo `GSS` obtenha as `credentials` necessárias de um `Subject` existente, configurado pelo `JAAS`. Quando esta restrição é flexibilizada, ela permite que o mecanismo obtenha `credentials` de algum local específico do fornecedor. Por exemplo, alguns fornecedores podem optar por usar o cache do sistema operacional, se existir, enquanto outros podem optar por ler de um arquivo protegido em disco.

Quando esta restrição é flexibilizada, o mecanismo `Kerberos` da Oracle ainda procura as `credentials` no `Subject` vinculado ao período de execução da `current thread`, mas se não encontrar nenhuma lá, ele realiza a autenticação `JAAS` usando um módulo `Kerberos` para obter novas. O módulo `Kerberos` solicita seu nome de `principal` `Kerberos` e senha. Observe que as implementações do mecanismo `Kerberos` de outros fornecedores podem se comportar de forma diferente quando esta propriedade é definida como `false`. Consulte a documentação deles para determinar o comportamento de sua implementação.

### Executando os Programas SampleClient e SampleServer

Para executar os programas `SampleClient` e `SampleServer`, faça o seguinte:

  * [Preparar SampleServer para Execução](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)
  * [Preparar SampleClient para Execução](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)
  * [Executar SampleServer](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)
  * [Executar SampleClient](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)

#### Preparar SampleServer para Execução

Para preparar `SampleServer` para execução, faça o seguinte:

  1. Copie os seguintes arquivos para um diretório acessível pela máquina na qual você executará `SampleServer`:
     * O arquivo fonte [`SampleServer.java`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>).
     * O arquivo de configuração de login [`bcsLogin.conf`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>).
  2. Compile `SampleServer.java`:
`javac SampleServer.java
```

#### Preparar SampleClient para Execução

Para preparar `SampleClient` para execução, faça o seguinte:

  1. Copie os seguintes arquivos para um diretório acessível pela máquina na qual você executará `SampleClient`:
     * O arquivo fonte `SampleClient.java`.
     * O arquivo de configuração de login `bcsLogin.conf`.
  2. Compile `SampleClient.java`:
`javac SampleClient.java
```

#### Executar SampleServer

É importante executar `SampleServer` antes de `SampleClient` porque `SampleClient` tentará fazer uma conexão `socket` com `SampleServer` e isso falhará se `SampleServer` ainda não estiver em execução e aceitando conexões `socket`.

Para executar `SampleServer`, certifique-se de executá-lo na máquina em que se espera que ele seja executado. Este nome de máquina (`host name`) é especificado como um argumento para `SampleClient`. O nome do `service principal` aparece em vários lugares, incluindo o arquivo de configuração de login e os `policy files`.

Vá para o diretório no qual você preparou `SampleServer` para execução. Execute `SampleServer`, especificando

  * por `-Djava.security.krb5.realm=<your_realm>` que seu `realm` `Kerberos` é o especificado.

Por exemplo, se seu `realm` for `KRBNT-OPERATIONS.EXAMPLE.COM`, você colocaria `-Djava.security.krb5.realm=KRBNT-OPERATIONS.EXAMPLE.COM`.

  * por `-Djava.security.krb5.kdc=<your_kdc>` que seu `KDC` `Kerberos` é o especificado.

Por exemplo, se seu `KDC` for `samplekdc.example.com`, você colocaria `-Djava.security.krb5.kdc=samplekdc.example.com`.

  * por `-Djavax.security.auth.useSubjectCredsOnly=false` que o mecanismo subjacente pode decidir como obter `credentials`. Veja [The useSubjectCredsOnly System Property](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>).

  * por `-Djava.security.auth.login.config=bcsLogin.conf` que o arquivo de configuração de login a ser usado é `bcsLogin.conf`.

O único argumento exigido por `SampleServer` é um que especifica o número da porta a ser usada para escutar conexões de cliente. Escolha um número de porta alto, improvável de ser usado para qualquer outra coisa. Um exemplo seria algo como `4444`.

O seguinte é o comando completo a ser usado para Windows, Linux e macOS.

Nota:

Importante: Neste comando, você deve substituir `<port_number>` por um número de porta apropriado, `<your_realm>` pelo seu `realm` `Kerberos` e `<your_kdc>` pelo seu `KDC` `Kerberos`.

A `system property` `java.security.krb5.kdc` interpreta o símbolo ":" como um caractere de separação para múltiplos `KDCs`. Se o `KDC` não estiver escutando na porta padrão (`88`), você deve fornecer o `realm` padrão e seu(s) `KDC`(s) em um arquivo `krb5.conf`, então definir a `system property` `java.security.krb5.kdc.conf` com o nome deste arquivo:
```
    -Djava.security.krb5.conf=<your_krb5.conf_file>
```

Aqui está o comando:
```
    java -Djava.security.krb5.realm=<your_realm> 
     -Djava.security.krb5.kdc=<your_kdc> 
     -Djavax.security.auth.useSubjectCredsOnly=false
     -Djava.security.auth.login.config=bcsLogin.conf 
     SampleServer <port_number>
```

O comando completo deve aparecer em uma única linha (ou, no Linux ou macOS, em várias linhas onde cada linha, exceto a última, é terminada com " `\` " indicando que há mais a seguir). Múltiplas linhas são usadas aqui apenas para legibilidade. Como este comando é muito longo, você pode precisar colocá-lo em um arquivo `.bat` (para Windows) ou um arquivo `.sh` (para Linux ou macOS) e então executar esse arquivo para executar o comando.

O código do `SampleServer` escutará por conexões `socket` na porta especificada. Quando solicitado, digite o nome `Kerberos` e a senha para o `service principal`. O mecanismo de autenticação `Kerberos` subjacente especificado no arquivo de configuração de login fará o login do `service principal` no `Kerberos`.

Para sugestões de solução de problemas de login, veja [Troubleshooting](<#/doc/guides/security/troubleshooting-jgss>).

#### Executar SampleClient

Para executar `SampleClient`, primeiro vá para o diretório no qual você preparou `SampleClient` para execução. Execute `SampleClient`, especificando

  * por `-Djava.security.krb5.realm=<your_realm>` que seu `realm` `Kerberos` é o especificado.
  * por `-Djava.security.krb5.kdc=<your_kdc>` que seu `KDC` `Kerberos` é o especificado.
  * por `-Djavax.security.auth.useSubjectCredsOnly=false` que o mecanismo subjacente pode decidir como obter `credentials`.
  * por `-Djava.security.auth.login.config=bcsLogin.conf` que o arquivo de configuração de login a ser usado é `bcsLogin.conf`.

Nota:

Se você usar um único sinal de igual (`=`) com a `system property` `java.security.auth.login.config` (em vez de um sinal de igual duplo (`==`)), então as configurações especificadas tanto por esta `system property` quanto pelo arquivo `java.security` são usadas.

Os argumentos do `SampleClient` são (1) o nome `Kerberos` do `service principal` que representa `SampleServer` (veja [Kerberos User and Service Principal Names](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)), (2) o nome do `host` (máquina) no qual `SampleServer` está sendo executado, e (3) o número da porta na qual `SampleServer` está escutando por conexões de cliente.

O seguinte é o comando completo a ser usado para Windows, Linux e macOS:

Nota:

Importante: Neste comando, você deve substituir `<service_principal>`, `<host>`, `<port_number>`, `<your_realm>` e `<your_kdc>` por valores apropriados (e observe que o número da porta deve ser o mesmo que o número da porta passado como argumento para `SampleServer`). Esses valores não precisam ser colocados entre aspas.

Aqui está o comando:
```
    java -Djava.security.krb5.realm=<your_realm> 
     -Djava.security.krb5.kdc=<your_kdc> 
     -Djavax.security.auth.useSubjectCredsOnly=false
     -Djava.security.auth.login.config=bcsLogin.conf 
     SampleClient <service_principal> <host> <port_number>
```

Digite o comando completo em uma única linha. Múltiplas linhas são usadas aqui para legibilidade. Assim como no comando para executar `SampleServer`, se o comando for muito longo para digitar diretamente na sua janela de comando, coloque-o em um arquivo `.bat` (Windows) ou um arquivo `.sh` (Linux e macOS) e então execute esse arquivo.

Quando solicitado, digite seu nome de usuário `Kerberos` e senha. O mecanismo de autenticação `Kerberos` subjacente especificado no arquivo de configuração de login fará seu login no `Kerberos`. O código do `SampleClient` solicita uma conexão `socket` com `SampleServer`. Uma vez que `SampleServer` aceita a conexão, `SampleClient` e `SampleServer` estabelecem um `context` compartilhado e então trocam mensagens conforme descrito neste tutorial.

Para sugestões de solução de problemas de login, veja [Troubleshooting](<#/doc/guides/security/troubleshooting-jgss>).