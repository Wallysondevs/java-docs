# Acessando GSS-API Nativa

## Acessando GSS-API Nativa

Para ajudar as aplicações da plataforma Java a alcançar uma integração perfeita com aplicações nativas, o JDK aprimora a Java GSS-API para usar a GSS-API nativa em vez de sua própria implementação de mecanismos criptográficos quando configurado para isso. Ao usar a GSS-API nativa e seus mecanismos criptográficos nativos subjacentes, as credenciais e configurações nativas no ambiente dos usuários serão automaticamente detectadas. Isso é diferente do caso padrão em que a Java GSS-API usa sua própria implementação de mecanismos criptográficos. Ao usar Kerberos, as aplicações Java precisam fornecer informações de configuração do Kerberos usando as propriedades de sistema Kerberos designadas para que a Java GSS-API funcione. [Introdução aos Tutoriais de JAAS e Java GSS-API](<#/doc/guides/security/introduction-jaas-and-java-gss-api-tutorials1>) cobre o caso padrão em grande detalhe, então esta seção se concentrará em como habilitar ou configurar a Java GSS-API para usar a GSS-API nativa.

Antes de habilitar a Java GSS-API para usar a GSS-API nativa, certifique-se de que a GSS-API nativa e seu mecanismo criptográfico subjacente estejam disponíveis e funcionando com as configurações do usuário. Por exemplo, certifique-se de que as bibliotecas GSS nativas estejam instaladas nos diretórios apropriados com as configurações corretas, e o mesmo se aplica à biblioteca e configurações do Kerberos. Observe que a GSS-API nativa assume que, antes de uma aplicação chamar suas APIs, ela já obteve e armazenou as credenciais específicas do mecanismo em um local que a implementação do mecanismo nativo reconhece. Assim, quando uma aplicação usa a GSS-API nativa com Kerberos, ela já deve ter obtido as credenciais nativas apropriadas, como tickets e chaves Kerberos, usando a ferramenta `kinit` no lado do iniciador, um arquivo `keytab` no lado do aceitador, ou credenciais padrão adquiridas durante o login do sistema.

Para fazer com que a Java GSS-API use a GSS-API nativa, as aplicações Java devem habilitar explicitamente este comportamento definindo uma ou mais das seguintes propriedades de sistema:

  * `sun.security.jgss.native` (obrigatório): Defina como `true` para habilitar a Java GSS-API a usar a biblioteca GSS nativa.

  * `sun.security.jgss.lib` (opcional): Defina para o caminho completo da biblioteca GSS nativa. Se esta for definida, a Java GSS-API procura pela biblioteca especificada usando o caminho de biblioteca Java padrão. Se esta não for definida, a Java GSS-API usa uma biblioteca GSS nativa padrão. No Windows, esta é `sspi.dll`, que está incluída no JDK. Esta biblioteca é apenas do lado do cliente e usa as credenciais padrão. Em outras plataformas, a Java GSS-API procura por uma biblioteca GSS nativa bem conhecida existente, por exemplo, `libgssapi.so` ou `libgssapi_krb5.so` no Linux ou `libgssapi_krb5.dylib` no macOS.

Nota:

Para habilitar o modo de depuração da GSS-API nativa, defina a propriedade de sistema `sun.security.nativegss.debug` como `true`. Isso permite que você acompanhe as chamadas da GSS-API nativa de um programa.

Conforme mencionado anteriormente, a GSS-API nativa exige que a aplicação tenha obtido essas credenciais e que elas estejam acessíveis. As aplicações Java podem acessar essas credenciais nativas através da Java GSS-API e usá-las para estabelecer contextos de segurança GSS-API com pares. Observe que quando um `Subject` está presente, por exemplo,
```java
    javax.security.auth.Subject.current() != null
```

então a Java GSS-API exige que as credenciais sejam obtidas dos conjuntos de credenciais privados ou públicos do `Subject` atual e que a chamada da Java GSS-API deve falhar se a credencial desejada não puder ser encontrada. Assim, as aplicações da plataforma Java que executam as chamadas da Java GSS-API dentro de uma chamada `Subject.callAs(Subject, Callable<T>)` devem preencher os conjuntos de credenciais do `Subject` com os objetos `Java GSSCredential` apropriados que encapsulam as credenciais nativas ou definir explicitamente a propriedade de sistema `javax.security.auth.useSubjectCredsOnly` como `false` para que a Java GSS-API possa obter credenciais de outros locais, por exemplo, de caches de credenciais nativas, além dos conjuntos de credenciais do `Subject`.

Quando delegadas para estabelecer um contexto de segurança GSS-API em nome de outros, as aplicações Java podem especificar a credencial delegada, conforme retornado por `GSSContext.getDelegCred()`, explicitamente nas chamadas da Java GSS-API, ou criar um objeto `Subject` com esta credencial delegada e executar as chamadas da Java GSS-API dentro das chamadas `Subject.callAs(Subject, Callable<T>)`.

Uma vez que a GSS-API nativa esteja habilitada, as aplicações da plataforma Java que chamam indiretamente a Java GSS-API através de mecanismos ou protocolos como Simple Authentication and Security Layer (SASL) (veja [Guia de Programação e Implantação da API Java SASL](<#/doc/guides/security/java-sasl-api-programming-and-deployment-guide1>)) também usarão as configurações e credenciais nativas do usuário.

Aqui está um código de exemplo que ajuda a demonstrar como usar a Java GSS-API para estabelecer contextos de segurança GSS-API e trocar dados de forma segura entre três partes: `SampleClient` contata `FooServer`, que por sua vez contata `FooServer2` em nome de `SampleClient`. Nota:

  * O código de exemplo deve ser invocado com a GSS-API nativa habilitada. Os nomes de `Principal` `host@foo.sample.com` e `host@foo2.sample.com` são espaços reservados e devem ser substituídos por nomes de `principal` reais em seu banco de dados Kerberos.

  * Para simplificar o exemplo, as trocas de token entre pares são representadas por dois pseudo-métodos: `SEND_TOKEN(byte[])` e `READ_TOKEN()`. Suas implementações reais são específicas da aplicação e, portanto, não são mostradas aqui.

  * Para reduzir a duplicação de código, o código de estabelecimento de contexto é referenciado por um pseudo-método, `ESTABLISH_CONTEXT(GSSContext)`, nos segmentos de código para `SampleClient`, `FooServer` e `FooServer2`.

A seguir está a implementação para `ESTABLISH_CONTEXT(GSSContext)` usando a Java GSS-API.
```java
    /**
     * ESTABLISH_CONTEXT(GSSContext ctxt): establishes a context
     * with data confidentiality and mutual authentication.
     */
    ctxt.requestConf(true);
    ctxt.requestMutualAuth(true);

    byte[] inToken = new byte[0];
    byte[] outToken = null;

    if (ctxt.isInitiator()) {
        while (!ctxt.isEstablished()) {
            // Nota: initSecContext(...) sempre ignora os argumentos
            // para a primeira chamada porque não há token de entrada.
            outToken = ctxt.initSecContext(inToken, 0, inToken.length);

            // Envia o token de saída se gerado.
            if (outToken != null) SEND_TOKEN(outToken); // para o aceitador

            // Verifica se mais tokens de entrada são esperados.
            if (!ctxt.isEstablished()) {
                inToken = READ_TOKEN(); // do aceitador
            }
        }
    } else {
        while (!ctxt.isEstablished()) {
            inToken = READ_TOKEN(); // do iniciador
            outToken =
                ctxt.acceptSecContext(inToken, 0, inToken.length);

            // Envia o token de saída se gerado.
            if (outToken != null) SEND_TOKEN(outToken); // para o iniciador
        }
    }
```

A seguir estão os segmentos de código para `SampleClient`, `FooServer` e `FooServer2`:

`SampleClient`: Ele contata `FooServer` e delega ao servidor para agir em seu nome. Se tudo correr bem, ele deve receber de volta uma mensagem de saudação personalizada produzida por `FooServer2`.
```java
    GSSManager gssMgr = GSSManager.getInstance();
    GSSName serverName = gssMgr.createName(
        "host@foo.sample.com", GSSName.NT_HOSTBASED_SERVICE);
    GSSContext context = gssMgr.createContext(
        serverName, null /* mecanismo padrão, que é Kerberos*/,
        null /* credencial de iniciador padrão */,
        GSSContext.DEFAULT_LIFETIME);
    context.requestCredDelegState(true);

    ESTABLISH_CONTEXT(context);

    // Garante que a delegação de credenciais esteja disponível.
    if (!context.getCredDeleg()) {
        context.dispose();
        throw new Exception("credential delegation is denied");
    }

    byte[] token = READ_TOKEN(); // de "FooServer"
    byte[] data =
       context.unwrap(token, 0, token.length, new MessageProp(true));
    context.dispose();

    // Deve imprimir "Hello from FooServer2 to <client name>" onde
    // <client name> é o nome do iniciador padrão.
    System.out.println(new String(data));
```

`FooServer`: Ele contata `FooServer2` como `SampleClient` e encaminha a resposta recebida para `SampleClient`.
```java
    GSSManager gssMgr = GSSManager.getInstance();
    GSSName myName = gssMgr.createName(
        "host@foo.sample.com", GSSName.NT_HOSTBASED_SERVICE);
    GSSCredential myCred = gssMgr.createCredential(
        acceptorName, GSSCredential.INDEFINITE_LIFETIME,
        (Oid[]) null /* conjunto padrão de mecanismos */,
        GSSCredential.ACCEPT_ONLY);
    GSSContext acontext = gssMgr.createContext(myCred);

    ESTABLISH_ACC_CONTEXT(acontext);

    GSSCredential delegCred = acontext.getDelegCred();
    if (delegCred != null) {
        byte[] data, token;
        // Estabelece um contexto em nome do cliente usando a credencial
        // delegada.
        GSSName serverName = gssMgr.createName(
            "host@foo2.sample.com", GSSName.NT_HOSTBASED_SERVICE);
        GSSContext icontext = gssMgr.createContext(
            serverName, null /* mecanismo padrão Kerberos */,
            delegCred /* age em nome de SampleClient */,
            GSSContext.DEFAULT_LIFETIME);

        ESTABLISH_CONTEXT(icontext);

        token = READ_TOKEN(); // de "FooServer2"

        MessageProp msgProp = new MessageProp(true);

        // Encaminha a resposta de FooServer2 para SampleClient.
        data = icontext.unwrap(token, 0, token.length, msgProp);
        token = acontext.wrap(data, 0, data.length, msgProp);
        SEND_TOKEN(token); // para "SampleClient"
        icontext.dispose();
    }
    acontext.dispose();
```

`FooServer2`: Ele sempre responde com uma mensagem de saudação personalizada para o nome do iniciador do contexto estabelecido.
```java
    GSSManager gssMgr = GSSManager.getInstance();
    GSSName myName = gssMgr.createName(
        "host@foo2.sample.com", GSSName.NT_HOSTBASED_SERVICE);
    GSSCredential myCred = gssMgr.createCredential(
        myName, GSSCredential.INDEFINITE_LIFETIME,
        (Oid[]) null /* conjunto padrão de mecanismos */,
        GSSCredential.ACCEPT_ONLY);
    GSSContext context = gssMgr.createContext(myCred);

    ESTABLISH_CONTEXT(context);

    byte[] data = new String("Hello from FooServer2 to " +
        context.getSrcName()).getBytes();
    byte[] token =
        context.wrap(data, 0, data.length, new MessageProp(true));

    SEND_TOKEN(token); // para "FooServer"

    context.dispose();
```