# Guia de Referência do Java Authentication and Authorization Service (JAAS)

## Guia de Referência do Java Authentication and Authorization Service (JAAS)

Você pode usar o JAAS para a autenticação de usuários, para determinar de forma confiável e segura quem está executando o código Java atualmente.

O JAAS implementa uma versão Java do framework padrão Pluggable Authentication Module (PAM).

A autenticação JAAS é realizada de forma plugável. Isso permite que as aplicações permaneçam independentes das tecnologias de autenticação subjacentes. Novas ou atualizadas tecnologias de autenticação podem ser plugadas em uma aplicação sem exigir modificações na própria aplicação. As aplicações habilitam o processo de autenticação instanciando um objeto [`LoginContext`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/login/LoginContext.html>), que por sua vez referencia uma [`Configuration`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/login/Configuration.html>) para determinar a tecnologia ou tecnologias de autenticação, ou [`LoginModule`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/spi/LoginModule.html>)(s), a serem usadas na realização da autenticação. Os `LoginModule`s típicos podem solicitar e verificar um nome de usuário e senha. Outros podem ler e verificar uma amostra de voz ou impressão digital.

O usuário ou serviço que executa o código é representado por um objeto Subject após ter sido autenticado. O Subject é atualizado por um LoginModule com Principals e credentials relevantes se a autenticação for bem-sucedida. Uma aplicação ou biblioteca pode usar as credentials armazenadas no Subject para tomar decisões de autorização subsequentes.

Tópicos

  * [Quem Deve Ler Este Documento](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)
  * [Documentação Relacionada](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)
  * [Classes e Interfaces Essenciais](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)
  * [Autorização JAAS](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)
  * [Apêndice A: Configurações JAAS no Arquivo de Propriedades de Segurança java.security](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)
  * [Apêndice B: Arquivo de Configuração de Login JAAS](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)

### Quem Deve Ler Este Documento

Este documento é destinado a desenvolvedores experientes que precisam da capacidade de projetar aplicações restritas por um modelo de segurança baseado em Subject. Ele também é destinado a ser lido por desenvolvedores de LoginModule (desenvolvedores que implementam uma tecnologia de autenticação) antes de ler o [Java Authentication and Authorization Service (JAAS): LoginModule Developer's Guide](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>).

Você pode querer ler primeiro o [JAAS Authentication Tutorial](<#/doc/guides/security/jaas-authentication-tutorial>) para ter uma visão geral de como usar o JAAS e ver o código de exemplo em ação, e então retornar a este documento para mais informações.

### Documentação Relacionada

Um complemento a este guia é o [JAAS LoginModule Developer's Guide](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>), destinado a programadores experientes que precisam da capacidade de escrever um [`LoginModule`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/spi/LoginModule.html>) que implemente uma tecnologia de autenticação.

O [JAAS Authentication Tutorial](<#/doc/guides/security/jaas-authentication-tutorial>) pode ser executado por todos.

[JAAS Authentication](<#/doc/guides/security/jaas-authentication>) é um tutorial similar que demonstra o uso de um LoginModule Kerberos. Ele requer uma instalação Kerberos. Faz parte dos [Introduction to JAAS and Java GSS-API Tutorials](<#/doc/guides/security/introduction-jaas-and-java-gss-api-tutorials1>) que utilizam Kerberos como tecnologia subjacente para autenticação e comunicação segura.

### Classes e Interfaces Essenciais

As classes e interfaces essenciais relacionadas ao JAAS podem ser divididas em duas categorias: Comuns e Autenticação.

Tópicos

  * [Classes Comuns](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)
  * [Classes e Interfaces de Autenticação](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)

#### Classes Comuns

Classes comuns são aquelas compartilhadas pelos componentes de autenticação e autorização do JAAS.

A classe JAAS chave é [`javax.security.auth.Subject`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/Subject.html>), que representa um agrupamento de informações relacionadas para uma única entidade, como uma pessoa. Ela engloba os [Principals](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>), public credentials e private credentials da entidade.

Observe que a interface `java.security.Principal` é usada para representar um Principal. Observe também que uma credential, conforme definida pelo JAAS, pode ser qualquer Object.

Tópicos

  * [Subject](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)
  * [Principals](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)
  * [Credentials](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)

##### Subject

Para autorizar o acesso a recursos, as aplicações precisam primeiro autenticar a origem da requisição. O framework JAAS define o termo subject para representar a origem de uma requisição. Um subject pode ser qualquer entidade, como uma pessoa ou um serviço. Uma vez que o subject é autenticado, um [`javax.security.auth.Subject`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/Subject.html>) é preenchido com identidades associadas, ou [Principals](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>). Um `Subject` pode ter muitos `Principal`s. Por exemplo, uma pessoa pode ter um `Principal` de nome ("John Doe") e um `Principal` de SSN ("123-45-6789"), que a distinguem de outros subjects.

Um `Subject` também pode possuir atributos relacionados à segurança, que são referidos como credentials; veja a seção [Credentials](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>). Credentials sensíveis que requerem proteção especial, como chaves criptográficas privadas, são armazenadas em um `Set` de private credential. Credentials destinadas a serem compartilhadas, como certificados de chave pública, são armazenadas em um `Set` de public credential.

Subjects são criados usando estes construtores:
```java
    public Subject();
    public Subject(boolean readOnly, Set principals,
                   Set pubCredentials, Set privCredentials);
```

O primeiro construtor cria um `Subject` com `Set`s vazios (não nulos) de `Principal`s e credentials. O segundo construtor cria um `Subject` com os `Set`s especificados de `Principal`s e credentials. Ele também possui um argumento boolean que pode ser usado para tornar o `Subject` somente leitura. Em um `Subject` somente leitura, os `Set`s de `Principal` e credential são imutáveis.

Um desenvolvedor de aplicação não precisa instanciar um `Subject`. Se a aplicação instancia um `LoginContext` e não passa um `Subject` para o construtor do `LoginContext`, o `LoginContext` instancia um novo `Subject` vazio. Consulte a seção [LoginContext](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>).

Se um `Subject` não foi instanciado para estar em um estado somente leitura, ele pode ser definido como somente leitura chamando o seguinte método:
```java
    public void setReadOnly();
```

Uma vez em um estado somente leitura, qualquer tentativa de adicionar ou remover `Principal`s ou credentials resultará no lançamento de uma `IllegalStateException`. O seguinte método pode ser chamado para testar o estado somente leitura de um `Subject`:
```java
    public boolean isReadOnly();
```

Para recuperar os `Principal`s associados a um Subject, dois métodos estão disponíveis:
```java
    public Set getPrincipals();
    public Set getPrincipals(Class c);
```

O primeiro método retorna todos os `Principal`s contidos no `Subject`, enquanto o segundo método retorna apenas aqueles `Principal`s que são uma instância da Class `c` especificada, ou uma instância de uma subclasse da Class `c`. Um set vazio será retornado se o `Subject` não tiver nenhum `Principal` associado.

Para recuperar as public credentials associadas a um `Subject`, estes métodos estão disponíveis:
```java
    public Set getPublicCredentials();
    public Set getPublicCredentials(Class c);
```

O comportamento desses métodos é similar ao dos métodos `getPrincipals`, exceto que, neste caso, as public credentials estão sendo obtidas.

Para acessar as private credentials associadas a um `Subject`, os seguintes métodos estão disponíveis:
```java
    public Set getPrivateCredentials();
    public Set getPrivateCredentials(Class c);
```

O comportamento desses métodos é similar ao dos métodos `getPrincipals` e `getPublicCredentials`.

Para modificar ou operar sobre o `Principal` `Set`, public credential `Set` ou private credential `Set` de um `Subject`, os chamadores usam os métodos definidos na classe [`java.util.Set`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Set.html>). O exemplo a seguir demonstra isso:
```java
    Subject subject;
    Principal principal;
    Object credential;
    // ...
    
    // adiciona um Principal e credential ao Subject
    subject.getPrincipals().add(principal);
    subject.getPublicCredentials().add(credential);
```

Nota:

Apenas os sets retornados através dos métodos `getPrincipals()`, `getPublicCredentials()` e `getPrivateCredentials()` sem argumentos são suportados pelos respectivos sets internos do `Subject`. Portanto, qualquer modificação no set retornado afeta também os sets internos. Os sets retornados através dos métodos `getPrincipals(Class c)`, `getPublicCredentials(Class c)` e `getPrivateCredentials(Class c)` não são suportados pelos respectivos sets internos do `Subject`. Um novo set é criado e retornado para cada invocação de tal método. Modificações nesses sets não afetarão os sets internos do `Subject`.

O seguinte método permite que você execute uma ação como um `Subject` especificado:
```java
    public static <T> T callAs(Subject subject, Callable<T> action)
```

Quando você executa uma ação com o método `callAs`, o Subject é vinculado ao período de execução. O seguinte método retorna o Subject associado ao período de execução da thread atual ou `null` se nenhum Subject tiver sido definido:
```java
    public static Subject current();
```

Consulte [Os Métodos callAs e current para Executar uma Ação como um Subject Específico](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>) para mais informações.

A classe `Subject` também inclui os seguintes métodos herdados de `java.lang.Object`.
```java
    public boolean equals(Object o);
    public String toString();
    public int hashCode();
```

###### Os Métodos callAs e current para Executar uma Ação como um Subject Específico

Chame o seguinte método estático para executar uma ação como um `Subject` específico:
```java
    public static <T> T callAs(Subject subject, Callable<T> action)
        throws CompletionException
```

O exemplo `[SampleAcn.java](<#/doc/guides/security/jaas-authentication-tutorial>)` do [JAAS Authentication Tutorial](<#/doc/guides/security/jaas-authentication-tutorial>) chama Subject.callAs(Subject, Callable&lt;T&gt;) da seguinte forma:
```java
    Subject.callAs(mySubject, anotherAction);
```

Neste exemplo, o argumento `anotherAction` acessa o Subject `mySubject` com o método `Subject.current()`:
```java
    Callable<Void> anotherAction = () -> {
                
        // Recupera o subject atual
        Subject s = Subject.current();
        System.out.println("\nCurrent subject: " + s);
                
        // Adiciona um novo Principal ao subject atual
        Random r = new Random();
        String pn = Integer.toString(r.nextInt());
        Principal p = new sample.principal.SamplePrincipal(pn);
                
        System.out.println("\nAdding principal " + pn);
        s.getPrincipals().add(p);         
                
        // Lista os Principals do subject atual
        System.out.println("\nAuthenticated user has the following Principals:");
        Iterator pi = s.getPrincipals().iterator();
    
        while (pi.hasNext()) {
            Principal nextp = (Principal)pi.next();
            System.out.println("\t" + nextp.toString());            
        }
    
        return null;            
    };  
```

Se uma thread filha inicia e termina dentro da execução da thread pai usando structured concurrency, então a thread filha pode acessar o Subject atual da thread pai com o método `Subject.current()`. O exemplo a seguir é de `[SampleAcn.java](<#/doc/guides/security/jaas-authentication-tutorial>)`:
```java
    Callable<Void> addRandomPrincipal = () -> {
        
        Subject s = Subject.current();
        
        // Adiciona um novo Principal
        Random r = new Random();
        String pn = Integer.toString(r.nextInt());
        Principal p = new sample.principal.SamplePrincipal(pn);
        
        System.out.println("\nAdding principal " + pn);
        s.getPrincipals().add(p);         
        return null;
    };
    
    Callable<Void> structuredAction = () -> {
        try (var scope = new StructuredTaskScope<>()) {
            scope.fork(addRandomPrincipal);
            scope.fork(addRandomPrincipal);
            scope.fork(addRandomPrincipal);
    
            scope.join();
                    
            Subject s = Subject.current();
            System.out.println("\nCurrent subject: " + s);
        
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return null;
    };        
            
    Subject.callAs(mySubject, structuredAction);
```

O método StructuredTaskScope.fork(Callable) inicia uma nova thread no escopo de tarefa `scope`. Este método retorna um StructuredTaskScope.Subtask ou uma subtarefa bifurcada. O exemplo cria três subtarefas bifurcadas. Cada subtarefa obtém o Subject atual da thread pai com o método `Subject.current()`, então adiciona um novo principal ao `Subject`. O método StructuredTaskScope.join() aguarda as subtarefas em `scope` terminarem antes de continuar. O exemplo então imprime o Subject, que agora contém três principals adicionais.

Consulte [Executando o Código do Tutorial de Autenticação JAAS](<#/doc/guides/security/jaas-authentication-tutorial>) para visualizar a saída deste exemplo.

Nota:

A classe `StructuredTaskScope` faz parte da API de structured concurrency, que é um preview feature. Um preview feature é um recurso cujo design, especificação e implementação estão completos, mas não é permanente. Um preview feature pode existir em uma forma diferente ou não existir em futuras versões do Java SE. Para compilar e executar código que contém preview features, você deve especificar opções adicionais de linha de comando, como `--enable-preview -source 25`. Consulte [Preview Language and VM Features](<#/>) em Java Platform, Standard Edition Java Language Updates e [Structured Concurrency](<#/>) em Java Platform, Standard Edition Core Libraries.

##### Principals

Como mencionado anteriormente, uma vez que um Subject é autenticado, ele é preenchido com identidades associadas, ou Principals. Um Subject pode ter muitos Principals. Por exemplo, uma pessoa pode ter um Principal de nome ("John Doe") e um Principal de SSN ("123-45-6789"), que a distinguem de outros Subjects. Um Principal deve implementar as interfaces [java.security.Principal](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/Principal.html>) e [java.io.Serializable](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/io/Serializable.html>). Consulte [Subject](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>) para obter informações sobre as formas de atualizar os Principals associados a um Subject.

##### Credentials

Além dos Principals associados, um Subject pode possuir atributos relacionados à segurança, que são referidos como credentials. Uma credential pode conter informações usadas para autenticar o subject em novos serviços. Tais credentials incluem senhas, tickets Kerberos e certificados de chave pública. Credentials também podem conter dados que simplesmente permitem ao subject realizar certas atividades. Chaves criptográficas, por exemplo, representam credentials que permitem ao subject assinar ou criptografar dados. Classes de public e private credential não fazem parte da biblioteca de classes principal do JAAS. Qualquer classe, portanto, pode representar uma credential.

Classes de public e private credential não fazem parte da biblioteca de classes principal do JAAS. Desenvolvedores, no entanto, podem optar por fazer com que suas classes de credential implementem duas interfaces relacionadas a credentials: `Refreshable` e `Destroyable`.

Tópicos

  * [Refreshable](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)
  * [Destroyable](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)

###### Refreshable

A interface [`javax.security.auth.Refreshable`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/Refreshable.html>) fornece a capacidade para uma credential se auto-atualizar. Por exemplo, uma credential com um tempo de vida restrito pode implementar esta interface para permitir que os chamadores atualizem o período de tempo para o qual ela é válida. A interface possui dois métodos abstratos:

  * boolean isCurrent(): Determina se a credential é atual ou válida
  * void refresh() throws RefreshFailedException: Atualiza ou estende a validade da credential

###### Destroyable

A interface [`javax.security.auth.Destroyable`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/Destroyable.html>) fornece a capacidade de destruir o conteúdo dentro de uma credential. A interface possui dois métodos abstratos:

  * boolean isDestroyed(): Determina se a credential foi destruída
  * void destroy() throws DestroyFailedException: Destrói e limpa as informações associadas a esta credential

#### Classes e Interfaces de Autenticação

Autenticação representa o processo pelo qual a identidade de um subject é verificada, e deve ser realizada de forma segura; caso contrário, um perpetrador pode se passar por outros para obter acesso a um sistema. A autenticação tipicamente envolve o subject demonstrando alguma forma de evidência para provar sua identidade. Tal evidência pode ser informação que apenas o subject provavelmente saberia ou teria (como uma senha ou impressão digital), ou pode ser informação que apenas o subject poderia produzir (como dados assinados usando uma chave privada).

Para autenticar um subject (usuário ou serviço), os seguintes passos são realizados:

  1. Uma aplicação instancia um `LoginContext`.
  2. O `LoginContext` consulta uma [`Configuration`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/login/Configuration.html>) para carregar todos os `LoginModule`s configurados para aquela aplicação.
  3. A aplicação invoca o método `login` do `LoginContext`.
  4. O método `login` invoca todos os `LoginModule`s carregados. Cada `LoginModule` tenta autenticar o subject. Em caso de sucesso, os `LoginModule`s associam `Principal`s e credentials relevantes a um objeto `Subject` que representa o subject sendo autenticado.
  5. O `LoginContext` retorna o status de autenticação para a aplicação.
  6. Se a autenticação foi bem-sucedida, a aplicação recupera o `Subject` do `LoginContext`.

As seções a seguir descrevem as classes de autenticação.

Tópicos

  * [LoginContext](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)
  * [LoginModule](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)
  * [CallbackHandler](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)
  * [Callback](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)

##### LoginContext

A classe [`javax.security.auth.login.LoginContext`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/login/LoginContext.html>) fornece os métodos básicos usados para autenticar subjects e oferece uma maneira de desenvolver uma aplicação independente da tecnologia de autenticação subjacente. O `LoginContext` consulta uma [`Configuration`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/login/Configuration.html>) para determinar os serviços de autenticação, ou [`LoginModule`(s)](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/spi/LoginModule.html>), configurados para uma aplicação específica. Portanto, diferentes `LoginModule`s podem ser plugados em uma aplicação sem exigir quaisquer modificações na própria aplicação.

O `LoginContext` oferece quatro construtores para escolher:
```java
    public LoginContext(String name) throws LoginException
    public LoginContext(String name, Subject subject) throws LoginException
    public LoginContext(String name, CallbackHandler callbackHandler)
               throws LoginException
    public LoginContext(String name, Subject subject,
               CallbackHandler callbackHandler) throws LoginException
```

Todos os construtores compartilham um parâmetro comum: name. Este argumento é usado pelo `LoginContext` como um índice na `Configuration` de login para determinar quais `LoginModule`s estão configurados para a aplicação que instancia o `LoginContext`. Construtores que não recebem um Subject como parâmetro de entrada instanciam um novo `Subject`. Entradas nulas não são permitidas para todos os construtores.

Consulte [CallbackHandler](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>) para obter informações sobre o que é um `CallbackHandler` e quando você pode precisar de um.

A autenticação real ocorre com uma chamada ao seguinte método:
```java
    public void login() throws LoginException
```

Quando `login` é invocado, todos os `LoginModule`s configurados são invocados para realizar a autenticação. Se a autenticação foi bem-sucedida, o `Subject` (que agora pode conter `Principal`s, public credentials e private credentials) pode ser recuperado usando o seguinte método:
```java
    public Subject getSubject()
```

Para fazer logout de um `Subject` e remover seus `Principals` e credentials autenticados, o seguinte método é fornecido:
```java
    public void logout() throws LoginException
```

O exemplo de código a seguir demonstra as chamadas necessárias para autenticar e fazer logout de um Subject:
```java
    // permite que o LoginContext instancie um novo Subject
    LoginContext lc = new LoginContext("entryFoo");
    try {
        // autentica o Subject
        lc.login();
        System.out.println("authentication successful");
    
        // obtém o Subject autenticado
        Subject subject = lc.getSubject();
    
        // ...
    
        // tudo pronto -- logout
        lc.logout();
    } catch (LoginException le) {
         System.err.println("authentication unsuccessful: " +
             le.getMessage());
    }
```

##### LoginModule

A interface [`LoginModule`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/spi/LoginModule.html>) oferece aos desenvolvedores a capacidade de implementar diferentes tipos de tecnologias de autenticação que podem ser plugadas em uma aplicação. Por exemplo, um tipo de `LoginModule` pode realizar uma forma de autenticação baseada em nome de usuário/senha. Outros `LoginModule`s podem interagir com dispositivos de hardware, como smart cards ou dispositivos biométricos.

Nota:

Se você é um desenvolvedor de aplicação, não precisa entender o funcionamento dos `LoginModule`s. Tudo o que você precisa saber é como escrever sua aplicação e especificar as informações de configuração (como em um arquivo de configuração de login) para que a aplicação possa utilizar o LoginModule especificado pela configuração para autenticar o usuário.

Se, por outro lado, você é um programador que deseja escrever um LoginModule implementando uma tecnologia de autenticação, consulte o [Java Authentication and Authorization Service (JAAS): LoginModule Developer's Guide](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>) para instruções detalhadas passo a passo.

##### CallbackHandler

Em alguns casos, um `LoginModule` deve se comunicar com o usuário para obter informações de autenticação. Os `LoginModule`s usam um [javax.security.auth.callback.CallbackHandler](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/CallbackHandler.html>) para este propósito. As aplicações implementam a interface `CallbackHandler` e a passam para o `LoginContext`, que a encaminha diretamente para os `LoginModule`s subjacentes. Um `LoginModule` usa o `CallbackHandler` tanto para coletar entrada de usuários (como uma senha ou número PIN de smart card) quanto para fornecer informações aos usuários (como informações de status). Ao permitir que a aplicação especifique o `CallbackHandler`, os `LoginModules` subjacentes podem permanecer independentes das diferentes formas como as aplicações interagem com os usuários. Por exemplo, a implementação de um `CallbackHandler` para uma aplicação GUI pode exibir uma janela para solicitar entrada de um usuário. Por outro lado, a implementação de um `CallbackHandler` para uma ferramenta não-GUI pode simplesmente solicitar a entrada do usuário diretamente da linha de comando. CallbackHandler é uma interface com um método para implementar:
```java
         void handle(Callback[] callbacks)
             throws java.io.IOException, UnsupportedCallbackException;
    
```

O `LoginModule` passa ao método `CallbackHandler handle` um array de `Callback`s apropriados, por exemplo, um [NameCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/NameCallback.html>) para o nome de usuário e um [PasswordCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/PasswordCallback.html>) para a senha, e o `CallbackHandler` realiza a interação do usuário solicitada e define os valores apropriados nos `Callback`s. Por exemplo, para processar um `NameCallback`, o `CallbackHandler` pode solicitar um nome, recuperar o valor do usuário e chamar o método `setName` do `NameCallback` para armazenar o nome.

A documentação do [`CallbackHandler`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/CallbackHandler.html>) possui um exemplo extenso não incluído neste documento que os leitores podem querer examinar.

##### Callback

O pacote [`javax.security.auth.callback`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/package-summary.html>) contém a interface Callback, bem como várias implementações. Os LoginModules podem passar um array de Callbacks diretamente para o método handle de um [CallbackHandler](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>).

Consulte as várias APIs de Callback para mais informações sobre seu uso.

### Autorização JAAS

Antes que o Security Manager fosse permanentemente desabilitado no JDK 24, o componente de autorização JAAS garantia que os usuários tivessem os direitos de controle de acesso (ou permissões) necessários para realizar as ações executadas. Uma vez que o usuário ou serviço que executava o código era autenticado, o componente de autorização JAAS funcionava em conjunto com o modelo de controle de acesso principal do Java SE e o Security Manager para proteger o acesso a recursos sensíveis.

Este mecanismo de autorização não é mais suportado porque depende de arquivos de política e permissões, ambos removidos ou desabilitados agora que o Security Manager está permanentemente desabilitado. Consequentemente, o código da aplicação é responsável por realizar a autorização. Isso pode ser baseado nos principals e credentials que são armazenados dentro de um `Subject` após a autenticação.

Por exemplo, considere o exemplo descrito no [JAAS Authentication Tutorial](<#/doc/guides/security/jaas-authentication-tutorial>). A classe `[SampleLoginModule.java](<#/doc/guides/security/jaas-authentication-tutorial>)`, que implementa a interface [LoginModule](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/spi/LoginModule.html>), autentica o usuário com uma senha. Depois de autenticar o usuário, informações (como principals e credentials) podem ser extraídas do Subject e usadas para decisões de autorização subsequentes. A classe `[SampleAcn.java](<#/doc/guides/security/jaas-authentication-tutorial>)` executa o Callable `anotherAction` com o Subject autenticado usando o método Subject.callAs:
```java
    Subject.callAs(mySubject, anotherAction);
```

Vamos assumir que o Subject atual possui um principal. O exemplo a seguir adiciona código a um trecho de `SampleAcn.java` que recupera este principal e concede acesso com base na identidade do principal:
```java
    Callable<Void> anotherAction = () -> {
                    
        Subject s = Subject.current();
        System.out.println("\nCurrent subject: " + s);
                    
```
```java
        Optional<Principal> principal = s.getPrincipals().stream().findFirst();
    
        // Authorize principal
        if (principal.isPresent() &&
            principal.get().getName().equals("Duke")) {
            // Grant access (code not shown)
            // ...
        }
    }
```

### Apêndice A: Configurações JAAS no Arquivo de Propriedades de Segurança java.security

Várias configurações relacionadas ao JAAS podem ser configuradas no arquivo de Propriedades de Segurança mestre `java.security`, que está localizado no diretório `conf/security` do JDK.

O JAAS adiciona duas novas propriedades de segurança ao `java.security`:

  * `login.configuration.provider`
  * `login.config.url.n`

O exemplo a seguir demonstra como configurar essas propriedades. Neste exemplo, mantemos os valores fornecidos no arquivo `java.security` padrão para a Propriedade de Segurança `login.configuration.provider`. O arquivo `java.security` padrão também lista um valor para a Propriedade de Segurança `login.config.url.n`, mas ele está comentado. No exemplo a seguir, ele não está comentado.
```java
    #
    # Class to instantiate as the javax.security.auth.login.Configuration
    # provider.
    #
    login.configuration.provider=sun.security.provider.ConfigFile
    
    #
    # Default login configuration file
    #
    login.config.url.1=file:${user.home}/.java.login.config
```

Nota:

Modificações feitas neste arquivo podem ser sobrescritas por atualizações subsequentes do JDK. No entanto, um arquivo de propriedades `java.security` alternativo pode ser especificado a partir da linha de comando através da propriedade de sistema `java.security.properties=<URL>`. Este arquivo de propriedades é anexado ao arquivo de propriedades do sistema. Se ambos os arquivos de propriedades especificarem valores para a mesma chave, o valor do arquivo de propriedades da linha de comando é selecionado, pois é o último a ser carregado.

Além disso, ao especificar `java.security.properties==<URL>` (usando dois sinais de igual), esse arquivo de propriedades substituirá completamente o arquivo de propriedades do sistema.

Para desabilitar a capacidade de especificar um arquivo de propriedades adicional a partir da linha de comando, defina a chave `security.overridePropertiesFile` como `false` no arquivo de propriedades do sistema. Ela é definida como `true` por padrão.

Tópicos

  * [Login Configuration Provider](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)
  * [Login Configuration URLs](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)

#### Provedor de Configuração de Login

A implementação padrão de configuração de login do JAAS fornecida pela Oracle obtém suas informações de configuração de arquivos e espera que as informações sejam fornecidas em um formato específico mostrado nos tutoriais.

A implementação padrão de configuração de login do JAAS pode ser substituída especificando a implementação da classe provedora alternativa na propriedade `login.configuration.provider`.

Por exemplo:
```java
        login.configuration.provider=com.foo.Config
    
```

Se a propriedade de Segurança `login.configuration.provider` não for encontrada, ou for deixada sem especificação, então ela é definida para o valor padrão:
```java
        login.configuration.provider=com.sun.security.auth.login.ConfigFile
    
```

Note que não há meios de definir dinamicamente o provedor de configuração de login a partir da linha de comando.

#### URLs de Configuração de Login

Se você estiver usando uma implementação de configuração de login que espera que as informações de configuração sejam especificadas em arquivos (assim como a implementação padrão da Oracle), a localização do(s) arquivo(s) de configuração de login pode ser definida estaticamente especificando suas respectivas URLs na propriedade `login.config.url.n`. 'n' é um número inteiro consecutivo começando com 1. Se vários arquivos de configuração forem especificados (se n >= 2), eles serão lidos e unidos em uma única configuração.

Por exemplo:
```java
      login.config.url.1=file:C:/config/.java.login.config
      login.config.url.2=file:C:/users/foo/.foo.login.config
    
```

Se a localização dos arquivos de configuração não for definida no arquivo de propriedades `java.security`, e também não for especificada dinamicamente a partir da linha de comando (via a opção `-Djava.security.auth.login.config`), o JAAS tenta carregar uma configuração padrão de
```java
    file:${user.home}/.java.login.config
    
```

### Apêndice B: Arquivo de Configuração de Login do JAAS

A autenticação JAAS é realizada de forma plugável, para que as aplicações Java possam permanecer independentes das tecnologias de autenticação subjacentes. As informações de configuração, como a tecnologia de autenticação desejada, são especificadas em tempo de execução. A fonte das informações de configuração (por exemplo, um arquivo ou um banco de dados) depende da implementação atual de [javax.security.auth.login.Configuration](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/login/Configuration.html>). A implementação padrão de `Configuration`, `ConfigFile`, obtém suas informações de configuração de arquivos de configuração de login. Para detalhes sobre a implementação padrão de `Configuration` de login fornecida com o JAAS, consulte a classe [`com.sun.security.auth.login.ConfigFile`](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.auth/com/sun/security/auth/login/ConfigFile.html>).

Tópicos

  * [Login Configuration File Structure and Contents](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)
  * [Where to Specify Which Login Configuration File Should Be Used](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)

#### Estrutura e Conteúdo do Arquivo de Configuração de Login

Um arquivo de configuração de login consiste em uma ou mais entradas, cada uma especificando qual tecnologia de autenticação subjacente deve ser usada para uma aplicação ou aplicações específicas. A estrutura de cada entrada é a seguinte:
```java
    <name used by application to refer to this entry> { 
        <LoginModule> <flag> <LoginModule options>;
        <optional additional LoginModules, flags and options>;
    };
    
```

Assim, cada entrada de arquivo de configuração de login consiste em um nome seguido por uma ou mais entradas específicas do LoginModule, onde cada entrada específica do LoginModule é terminada por um ponto e vírgula e todo o grupo de entradas específicas do LoginModule é delimitado por chaves. Cada entrada do arquivo de configuração é terminada por um ponto e vírgula.

Exemplo 6-1 Arquivo de Configuração de Login para o Tutorial de Autenticação JAAS

Como exemplo, o arquivo de configuração de login usado para o tutorial [JAAS Authentication Tutorial](<#/doc/guides/security/jaas-authentication-tutorial>) contém apenas uma entrada, que é
```java
    Sample {
       sample.module.SampleLoginModule required debug=true;
    };
    
```

Aqui, a entrada é nomeada `Sample` e esse é o nome que a aplicação do tutorial de Autenticação JAAS (`SampleAcn.java`) usa para se referir a esta entrada. A entrada especifica que o LoginModule a ser usado para fazer a autenticação do usuário é o `SampleLoginModule` no pacote `sample.module` e que este `SampleLoginModule` é `required` para "ter sucesso" para que a autenticação seja considerada bem-sucedida. O `SampleLoginModule` só tem sucesso se o nome e a senha fornecidos pelo usuário forem os que ele espera (`testUser` e `testPassword`, respectivamente).

O nome para uma entrada em um arquivo de configuração de login é o nome que as aplicações usam para se referir à entrada quando instanciam um LoginContext, conforme descrito em [JAAS Authentication Tutorial](<#/doc/guides/security/jaas-authentication-tutorial>) no tutorial de autenticação JAAS. O nome pode ser qualquer nome que o desenvolvedor da aplicação desejar usar. Aqui, o termo "aplicação" refere-se a qualquer código que faça o login JAAS.

Os LoginModules especificados são usados para controlar o processo de autenticação. A autenticação prossegue na lista na ordem exata especificada, conforme descrito na classe [Configuration](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/login/Configuration.html>).

As subpartes de cada entrada específica do LoginModule são as seguintes:

  * LoginModule: Isso especifica uma classe que implementa a tecnologia de autenticação desejada. Especificamente, a classe deve ser uma subclasse da classe LoginModule, que está no pacote `javax.security.auth.spi`. Um LoginModule típico pode solicitar e verificar um nome de usuário e senha, como é feito pelo `SampleLoginModule` (no pacote `sample.module`) usado para estes tutoriais. Qualquer fornecedor pode fornecer uma implementação de LoginModule que você pode usar. Algumas implementações são fornecidas com o JDK da Oracle. Você pode ver a documentação de referência para os vários LoginModules, todos no pacote `com.sun.security.auth`:

    * [JndiLoginModule](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.auth/com/sun/security/auth/module/JndiLoginModule.html>)
    * [KeyStoreLoginModule](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.auth/com/sun/security/auth/module/KeyStoreLoginModule.html>)
    * [Krb5LoginModule](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.auth/com/sun/security/auth/module/Krb5LoginModule.html>)
    * [NTLoginModule](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.auth/com/sun/security/auth/module/NTLoginModule.html>)
    * [UnixLoginModule](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.auth/com/sun/security/auth/module/UnixLoginModule.html>)
  * flag: O valor da flag indica se o sucesso do LoginModule precedente é `required`, `requisite`, `sufficient` ou `optional`. Se houver apenas uma entrada específica do LoginModule, como nos nossos tutoriais, então a flag para ela deve ser "required". As opções são descritas em mais detalhes na classe [Configuration](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/login/Configuration.html>).

  * Opções do LoginModule: Se a implementação do LoginModule especificada tiver opções que podem ser definidas, você especifica quaisquer valores de opção desejados aqui. Esta é uma lista de valores separados por espaço que são passados diretamente para o LoginModule subjacente. As opções são definidas pelo próprio LoginModule e controlam o comportamento dentro dele. Por exemplo, um LoginModule pode definir opções para suportar capacidades de depuração/teste.

A maneira correta de especificar opções no arquivo de configuração é usando um par nome-valor, por exemplo `debug=true`, onde o nome da opção (neste caso, `debug`) e o valor (neste caso, `true`) devem ser separados por um símbolo de igual.

Exemplo 6-2 Arquivo de Configuração de Login Demonstrando as Flags required, sufficient, requisite e optional

O seguinte é um arquivo de configuração de login de exemplo que demonstra as flags `required`, `sufficient`, `requisite` e `optional`. Consulte a classe [`Configuration`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/login/Configuration.html>) para mais informações sobre essas flags.
```java
    Login1 {
           sample.SampleLoginModule required debug=true;
        };
    
        Login2 {
           sample.SampleLoginModule required;
           com.sun.security.auth.module.NTLoginModule sufficient;
           com.foo.SmartCard requisite debug=true;
           com.foo.Kerberos optional debug=true;
        };
```

A aplicação Login1 tem apenas um `LoginModule` configurado, `SampleLoginModule`. Portanto, uma tentativa do Login1 de autenticar um sujeito (usuário ou serviço) será bem-sucedida se e somente se o `SampleLoginModule` for bem-sucedido.

A lógica de autenticação para a aplicação Login2 é mais fácil de explicar com a seguinte tabela:

Tabela 6-1 Status de Autenticação do Login2

Classe do Módulo | Flag | Tentativa de Autenticação 1 | Tentativa de Autenticação 2 | Tentativa de Autenticação 3 | Tentativa de Autenticação 4 | Tentativa de Autenticação 5 | Tentativa de Autenticação 6 | Tentativa de Autenticação 7 | Tentativa de Autenticação 8
---|---|---|---|---|---|---|---|---|---
`SampleLoginModule` | required | sucesso | sucesso | sucesso | sucesso | falha | falha | falha | falha
`NTLoginModule` | sufficient | sucesso | falha | falha | falha | sucesso | falha | falha | falha
SmartCard | requisite | * | sucesso | sucesso | falha | * | sucesso | sucesso | falha
Kerberos | optional | * | sucesso | falha | * | * | sucesso | falha | *
Autenticação Geral | não aplicável | sucesso | sucesso | sucesso | falha | falha | falha | falha | falha
  
* = valor trivial devido ao controle retornar à aplicação porque um módulo `requisite` anterior falhou ou um módulo `sufficient` anterior teve sucesso.

#### Onde Especificar Qual Arquivo de Configuração de Login Deve Ser Usado

O arquivo de configuração a ser usado pode ser especificado de uma de duas maneiras:

  1. Na linha de comando.

Você pode usar um argumento de linha de comando do interpretador `-Djava.security.auth.login.config` para especificar o arquivo de configuração de login que deve ser usado. Usamos esta abordagem para todos os tutoriais. Por exemplo, executamos nossa aplicação `SampleAcn` no [JAAS Authentication Tutorial](<#/doc/guides/security/jaas-authentication-tutorial>) usando o seguinte comando, que especifica que o arquivo de configuração é o arquivo `sample_jaas.config` no diretório atual:
```java
java -Djava.security.auth.login.config==sample_jaas.config sample.SampleAcn
         
```

Nota:

Se você usar um único sinal de igual (`=`) com a propriedade de sistema `java.security.auth.login.config` (em vez de um sinal de igual duplo (`==`)), então as configurações especificadas por esta propriedade de sistema e pelo arquivo `java.security` serão usadas.

  2. No arquivo de Propriedades de Segurança Java.

Uma abordagem alternativa para especificar a localização do arquivo de configuração de login é indicar sua URL como o valor de uma propriedade `login.config.url.n` no arquivo de propriedades de segurança. O arquivo de Propriedades de Segurança é o arquivo `java.security` localizado no diretório `conf/security` do JDK.

Aqui, `n` indica um número inteiro consecutivo começando com 1. Assim, se desejado, você pode especificar mais de um arquivo de configuração de login indicando a URL de um arquivo para a propriedade `login.config.url.1`, a URL de um segundo arquivo para a propriedade `login.config.url.2`, e assim por diante. Se mais de um arquivo de configuração de login for especificado (ou seja, se `n` > 1), então os arquivos são lidos e concatenados em uma única configuração.

Aqui está um exemplo do que precisaria ser adicionado ao arquivo de propriedades de segurança para indicar o arquivo de configuração de login `sample_jaas.config` usado por este tutorial. Este exemplo assume que o arquivo está no diretório `C:\AcnTest` no Windows:
```java
login.config.url.1=file:C:/AcnTest/sample_jaas.config
```

(Note que as URLs sempre usam barras normais (forward slashes), independentemente do sistema operacional que o usuário esteja executando.)