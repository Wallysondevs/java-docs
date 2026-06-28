# Tutorial de Autenticação JAAS

## Tutorial de Autenticação JAAS

Este tutorial descreve como usar o JAAS para a autenticação de usuários: para determinar de forma confiável e segura quem está executando atualmente.

A autenticação JAAS é realizada de forma plugável. Isso permite que as aplicações Java permaneçam independentes das tecnologias de autenticação subjacentes. Novas ou atualizadas tecnologias podem ser plugadas sem a necessidade de modificações na própria aplicação. Uma implementação para uma tecnologia de autenticação específica a ser usada é determinada em tempo de execução. A implementação é especificada em um arquivo de configuração de login. A tecnologia de autenticação usada para este tutorial é muito básica, apenas garantindo que o usuário especifique um nome e uma senha específicos.

O restante deste tutorial consiste nas seguintes seções:

  1. [O Código do Tutorial de Autenticação](<#/doc/guides/security/jaas-authentication-tutorial>)
  2. [A Configuração de Login](<#/doc/guides/security/jaas-authentication-tutorial>)
  3. [Executando o Código do Tutorial de Autenticação JAAS](<#/doc/guides/security/jaas-authentication-tutorial>)

Se você quiser ver o código do tutorial em ação primeiro, pode pular diretamente para [Executando o Código do Tutorial de Autenticação JAAS](<#/doc/guides/security/jaas-authentication-tutorial>) e depois voltar para as outras seções para aprender sobre os detalhes de codificação e do arquivo de configuração.

### O Código do Tutorial de Autenticação

O código para este tutorial consiste em três arquivos:

  * [`SampleAcn.java`](<#/doc/guides/security/jaas-authentication-tutorial>) contém a classe de aplicação de exemplo (`SampleAcn`) e outra classe usada para lidar com a entrada do usuário (`MyCallbackHandler`). O código neste arquivo é o único código que você precisa entender para este tutorial. Sua aplicação usará os outros arquivos-fonte apenas indiretamente.
  * [`SampleLoginModule.java`](<#/doc/guides/security/jaas-authentication-tutorial>) é a classe especificada pelo arquivo de configuração de login do tutorial, `sample_jaas.config`, descrita em [O Arquivo de Configuração de Login para o Tutorial de Autenticação JAAS](<#/doc/guides/security/jaas-authentication-tutorial>) como a classe que implementa a autenticação subjacente desejada. A autenticação de usuário do `SampleLoginModule` consiste simplesmente em verificar se o nome e a senha especificados pelo usuário têm valores específicos.
  * [`SamplePrincipal.java`](<#/doc/guides/security/jaas-authentication-tutorial>) é uma classe de exemplo que implementa a interface [java.security.Principal](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/Principal.html>). Ela é usada pelo `SampleLoginModule`.

#### SampleAcn.java

Nosso código de aplicação do tutorial de autenticação está contido em um único arquivo-fonte, `SampleAcn.java`. Esse arquivo contém duas classes:

  * [A Classe SampleAcn](<#/doc/guides/security/jaas-authentication-tutorial>)
  * [A Classe MyCallbackHandler](<#/doc/guides/security/jaas-authentication-tutorial>)

##### A Classe SampleAcn

O método `main` da classe `SampleAcn` realiza a autenticação e então relata se a autenticação foi bem-sucedida ou não.

O código para autenticar o usuário é muito simples, consistindo em apenas duas etapas:

  1. [Instanciando um LoginContext](<#/doc/guides/security/jaas-authentication-tutorial>)
  2. [Chamando o Método login do LoginContext](<#/doc/guides/security/jaas-authentication-tutorial>)

Nota:

A classe `SampleAcn` também demonstra o seguinte:

  * Como executar código com um Subject especificado usando o método Subject.callAs(Subject, Callable&lt;T&gt;)
  * Como acessar o Subject atual da thread pai a partir de uma thread filha usando structured concurrency.

Consulte [Os Métodos callAs e current para Executar uma Ação como um Subject Particular](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>) para mais informações.

Primeiro, o código básico é mostrado, seguido por [O Código Completo da Classe SampleAcn](<#/doc/guides/security/jaas-authentication-tutorial>), completo com a declaração de importação necessária e tratamento de erros.

###### Instanciando um LoginContext

Para autenticar um usuário, você primeiro precisa de um `javax.security.auth.login.LoginContext`. Aqui está a maneira básica de instanciar um LoginContext:
```
    import javax.security.auth.login.*;
    // ...
    LoginContext lc =
        new LoginContext(<config file entry name>,
               <CallbackHandler to be used for user interaction>);
```

e aqui está a maneira específica como o código do nosso tutorial faz a instanciação:
```
    import javax.security.auth.login.*;
    // ...
    LoginContext lc =
        new LoginContext("Sample",
              new MyCallbackHandler());
```

Os argumentos são os seguintes:

  1. O nome de uma entrada no arquivo de configuração de login do JAAS

Este é o nome para o LoginContext usar para procurar uma entrada para esta aplicação no arquivo de configuração de login do JAAS, descrito em [A Configuração de Login](<#/doc/guides/security/jaas-authentication-tutorial>). Tal entrada especifica a(s) classe(s) que implementam a(s) tecnologia(s) de autenticação subjacente(s) desejada(s). A(s) classe(s) devem implementar a interface LoginModule, que está no pacote `javax.security.auth.spi`.

Em nosso código de exemplo, usamos o `SampleLoginModule` fornecido com este tutorial. O `SampleLoginModule` realiza a autenticação garantindo que o usuário digite um nome e uma senha específicos.

A entrada no arquivo de configuração de login que usamos para este tutorial, `sample_jaas.config` (veja [O Arquivo de Configuração de Login para o Tutorial de Autenticação JAAS](<#/doc/guides/security/jaas-authentication-tutorial>)), tem o nome "Sample", então esse é o nome que especificamos como o primeiro argumento para o construtor do LoginContext.

  2. Uma instância de CallbackHandler

Quando um LoginModule precisa se comunicar com o usuário, por exemplo, para pedir um nome de usuário e senha, ele não o faz diretamente. Isso ocorre porque existem várias maneiras de se comunicar com um usuário, e é desejável que os LoginModules permaneçam independentes dos diferentes tipos de interação do usuário. Em vez disso, o LoginModule invoca um [javax.security.auth.callback.CallbackHandler](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/CallbackHandler.html>) para realizar a interação do usuário e obter as informações solicitadas, como o nome de usuário e a senha.

Uma instância do CallbackHandler específico a ser usado é especificada como o segundo argumento para o construtor do LoginContext. O LoginContext encaminha essa instância para o LoginModule subjacente (em nosso caso, `SampleLoginModule`). Uma aplicação tipicamente fornece sua própria implementação de CallbackHandler. Um CallbackHandler simples, TextCallbackHandler, é fornecido no pacote `com.sun.security.auth.callback` para exibir informações e ler a entrada da linha de comando. No entanto, demonstramos o caso mais típico de uma aplicação fornecendo sua própria implementação de CallbackHandler, descrita em [A Classe MyCallbackHandler](<#/doc/guides/security/jaas-authentication-tutorial>).

###### Chamando o Método login do LoginContext

Uma vez que temos um LoginContext `lc`, podemos chamar seu método `login` para realizar o processo de autenticação:
```
    lc.login();

```

O LoginContext instancia um novo objeto [javax.security.auth.Subject](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/Subject.html>) vazio (que representa o usuário ou serviço sendo autenticado; veja [Subject](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)). O LoginContext constrói o LoginModule configurado (em nosso caso, `SampleLoginModule`) e o inicializa com este novo Subject e `MyCallbackHandler`.

O método `login` do LoginContext então chama métodos no `SampleLoginModule` para realizar o login e a autenticação. O `SampleLoginModule` utilizará o `MyCallbackHandler` para obter o nome de usuário e a senha. Então o `SampleLoginModule` verificará se o nome e a senha são os esperados.

Se a autenticação for bem-sucedida, o `SampleLoginModule` preenche o Subject com um Principal representando o usuário. O Principal que o `SampleLoginModule` coloca no Subject é uma instância de `SamplePrincipal`, que é uma classe de exemplo que implementa a interface [java.security.Principal](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/Principal.html>).

A aplicação chamadora pode subsequentemente recuperar o Subject autenticado chamando o método `getSubject` do LoginContext, embora isso não seja necessário para este tutorial.

###### O Código Completo da Classe SampleAcn

Agora que você viu o código básico necessário para autenticar o usuário, podemos juntar tudo na classe completa em `SampleAcn.java`, que inclui declarações de importação relevantes e tratamento de erros:

SampleAcn.java
```
    package sample;

    import java.io.*;
    import java.util.*;
    import javax.security.auth.login.*;
    import javax.security.auth.*;
    import javax.security.auth.callback.*;
    import java.security.Principal;
    import java.util.concurrent.Callable;
    import java.util.concurrent.StructuredTaskScope;

    /**
     * <p>This sample application attempts to authenticate a user and reports whether
     * or not the authentication was successful.</p>
     *
     * <p>It also demonstrates how to run code with a specified Subject with the
     * Subject.callAs(Subject, Callable<T? method and how to access the parent
     * thread's current Subject from a child thread using structured concurrency and
     * the Subject.current() method.</p>
     */
    public class SampleAcn {

       /**
        * <p>Attempt to authenticate the user.</p>
        *
        * @param args input arguments for this application. These are ignored.
        */

        public static void main(String[] args) {

            // Obtain a LoginContext, needed for authentication. Tell it
            // to use the LoginModule implementation specified by the
            // entry named "Sample" in the JAAS login configuration
            // file and to also use the specified CallbackHandler.

            LoginContext lc = null;
            try {
                lc = new LoginContext("Sample", new MyCallbackHandler());
            } catch (LoginException le) {
                System.err.println("Cannot create LoginContext. "
                    + le.getMessage());
                System.exit(-1);
            }

            // The user has 3 attempts to authenticate successfully
            int i;
            for (i = 0; i < 3; i++) {
                try {

                    // Attempt authentication
                    lc.login();

                    // If we return with no exception, authentication succeeded
                    break;

                } catch (LoginException le) {

                    System.err.println("Authentication failed:");
                    System.err.println("  " + le.getMessage());
                    try {
                        Thread.currentThread().sleep(3000);
                    } catch (Exception e) {
                        // ignore
                    }
                }
            }

            // did they fail three times?
            if (i == 3) {
                System.out.println("Sorry");
                System.exit(-1);
            }

            System.out.println("Authentication succeeded!");

            Subject mySubject = lc.getSubject();

            // Let's see what Principals we have
            Iterator principalIterator = mySubject.getPrincipals().iterator();
            System.out.println("Authenticated user has the following Principals:");

            while (principalIterator.hasNext()) {
                Principal p = (Principal)principalIterator.next();
                System.out.println("\t" + p.toString());
            }

            System.out.println("User has " +
                               mySubject.getPublicCredentials().size() +
                               " Public Credential(s)");

            Callable<Void> anotherAction = () -> {

                // Retrieve the current subject
                Subject s = Subject.current();
                System.out.println("\nCurrent subject: " + s);

                // Add a new Principal to the current subject
                Random r = new Random();
                String pn = Integer.toString(r.nextInt());
                Principal p = new sample.principal.SamplePrincipal(pn);

                System.out.println("\nAdding principal " + pn);
                s.getPrincipals().add(p);

                // List the current subject's Principals
                System.out.println("\nAuthenticated user has the following Principals:");
                Iterator pi = s.getPrincipals().iterator();

                while (pi.hasNext()) {
                    Principal nextp = (Principal)pi.next();
                    System.out.println("\t" + nextp.toString());
                }

                return null;
            };

            // Run the Callable anotherAction with the current subject

            Subject.callAs(mySubject, anotherAction);

            // The following demonstrates how to retrieve the parent thread's
            // current subject from a child thread with structured concurrency.

            Callable<Void> addRandomPrincipal = () -> {

                Subject s = Subject.current();

                // Add a new Principal
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

            // Run the Callable anotherAction with the current subject

            Subject.callAs(mySubject, structuredAction);
        }
    }


    /**
     * <p>The application implements the CallbackHandler.</p>
     *
     * <p>This application is text-based. Therefore, it displays information
     * to the user using the OutputStreams System.out and System.err,
     * and gathers input from the user using the InputStream System.in.</p>
     */

    class MyCallbackHandler implements CallbackHandler {

        /**
         * <p>Invoke an array of Callbacks.</p>
         *
         * @param callbacks an array of <code>Callback</code> objects which contain
         *                  the information requested by an underlying security
         *                  service to be retrieved or displayed.
         *
         * @exception java.io.IOException if an input or output error occurs. <p>
         *
         * @exception UnsupportedCallbackException if the implementation of this
         *                  method does not support one or more of the Callbacks
         *                  specified in the <code>callbacks</code> parameter.
         */
        public void handle(Callback[] callbacks)
        throws IOException, UnsupportedCallbackException {

            for (int i = 0; i < callbacks.length; i++) {
                if (callbacks[i] instanceof TextOutputCallback) {

                    // display the message according to the specified type
                    TextOutputCallback toc = (TextOutputCallback)callbacks[i];
                    switch (toc.getMessageType()) {
                    case TextOutputCallback.INFORMATION:
                        System.out.println(toc.getMessage());
                        break;
                    case TextOutputCallback.ERROR:
                        System.out.println("ERROR: " + toc.getMessage());
                        break;
                    case TextOutputCallback.WARNING:
                        System.out.println("WARNING: " + toc.getMessage());
                        break;
                    default:
                        throw new IOException("Unsupported message type: " +
                                            toc.getMessageType());
                    }

                } else if (callbacks[i] instanceof NameCallback) {

                    // prompt the user for a username
                    NameCallback nc = (NameCallback)callbacks[i];

                    System.err.print(nc.getPrompt());
                    System.err.flush();
                    nc.setName((new BufferedReader
                            (new InputStreamReader(System.in))).readLine());

                } else if (callbacks[i] instanceof PasswordCallback) {

                    // prompt the user for sensitive information
                    PasswordCallback pc = (PasswordCallback)callbacks[i];
                    System.err.print(pc.getPrompt());
                    System.err.flush();
                    pc.setPassword(readPassword(System.in));

                } else {
                    throw new UnsupportedCallbackException
                            (callbacks[i], "Unrecognized Callback");
                }
            }
        }

        // Reads user password from given input stream.
        private char[] readPassword(InputStream in) throws IOException {

            char[] lineBuffer;
            char[] buf;
            int i;

            buf = lineBuffer = new char[128];

            int room = buf.length;
            int offset = 0;
            int c;

    loop:   while (true) {
                switch (c = in.read()) {
                case -1:
                case '\n':
                    break loop;

                case '\r':
                    int c2 = in.read();
                    if ((c2 != '\n') && (c2 != -1)) {
                        if (!(in instanceof PushbackInputStream)) {
                            in = new PushbackInputStream(in);
                        }
                        ((PushbackInputStream)in).unread(c2);
                    } else
                        break loop;

                default:
                    if (--room < 0) {
                        buf = new char[offset + 128];
                        room = buf.length - offset - 1;
                        System.arraycopy(lineBuffer, 0, buf, 0, offset);
                        Arrays.fill(lineBuffer, ' ');
                        lineBuffer = buf;
                    }
                    buf[offset++] = (char) c;
                    break;
                }
            }

            if (offset == 0) {
                return null;
            }

            char[] ret = new char[offset];
            System.arraycopy(buf, 0, ret, 0, offset);
            Arrays.fill(buf, ' ');

            return ret;
        }
    }
```

##### A Classe MyCallbackHandler

Em alguns casos, um LoginModule deve se comunicar com o usuário para obter informações de autenticação. Os LoginModules usam um [`javax.security.auth.callback.CallbackHandler`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/CallbackHandler.html>) para esse fim. Uma aplicação pode usar uma das implementações de exemplo fornecidas no pacote `com.sun.security.auth.callback` ou, mais tipicamente, escrever uma implementação de CallbackHandler. A aplicação passa o CallbackHandler como um argumento para a instanciação do LoginContext. O LoginContext encaminha o CallbackHandler diretamente para os LoginModules subjacentes.

O código de exemplo do tutorial fornece sua própria implementação de CallbackHandler, a classe `MyCallbackHandler` em [`](<#/doc/guides/security/jaas-authentication-tutorial>).

CallbackHandler é uma interface com um método a ser implementado:
```
         void handle(Callback[] callbacks)
             throws java.io.IOException, UnsupportedCallbackException;

```

O LoginModule passa ao método `handle` do CallbackHandler um array de [javax.security.auth.callback.Callbacks](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/Callback.html>) apropriados, por exemplo, um [NameCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/NameCallback.html>) para o nome de usuário e um [PasswordCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/PasswordCallback.html>) para a senha, e o CallbackHandler realiza a interação do usuário solicitada e define os valores apropriados nos Callbacks.

O método `handle` do `MyCallbackHandler` é estruturado da seguinte forma:
```
    public void handle(Callback[] callbacks)
      throws IOException, UnsupportedCallbackException {

      for (int i = 0; i < callbacks.length; i++) {
        if (callbacks[i] instanceof TextOutputCallback) {

          // display a message according to a specified type
          . . .

        } else if (callbacks[i] instanceof NameCallback) {

          // prompt the user for a username
          . . .

        } else if (callbacks[i] instanceof PasswordCallback) {

          // prompt the user for a password
          . . .

        } else {
            throw new UnsupportedCallbackException
             (callbacks[i], "Unrecognized Callback");
        }
      }
    }

```

Um método `handle` de CallbackHandler recebe um array de instâncias de Callback, cada uma de um tipo particular (NameCallback, PasswordCallback, etc.). Ele deve lidar com cada Callback, realizando a interação do usuário de uma maneira apropriada para a aplicação em execução.

O `MyCallbackHandler` lida com três tipos de Callbacks: NameCallback para solicitar o nome de usuário, PasswordCallback para solicitar a senha, e TextOutputCallback para relatar quaisquer erros, avisos ou outras mensagens que o SampleLoginModule deseje enviar ao usuário.

O método `handle` lida com um TextOutputCallback extraindo a mensagem a ser relatada e então a imprimindo em `System.out`, opcionalmente precedida por uma frase adicional que depende do tipo da mensagem. A mensagem a ser relatada é determinada chamando o método `getMessage` do TextOutputCallback e o tipo chamando seu método `getMessageType`. Aqui está o código para lidar com um TextOutputCallback:
```
    if (callbacks[i] instanceof TextOutputCallback) {

      // display the message according to the specified type
      TextOutputCallback toc = (TextOutputCallback)callbacks[i];
      switch (toc.getMessageType()) {
         case TextOutputCallback.INFORMATION:
            System.out.println(toc.getMessage());
            break;
         case TextOutputCallback.ERROR:
            System.out.println("ERROR: " + toc.getMessage());
            break;
         case TextOutputCallback.WARNING:
            System.out.println("WARNING: " + toc.getMessage());
            break;
         default:
            throw new IOException("Unsupported message type: " +
                toc.getMessageType());
       }

```

O método `handle` lida com um NameCallback solicitando o nome de usuário. Ele faz isso imprimindo o prompt em `System.err`. Em seguida, ele define o nome para uso pelo `SampleLoginModule` chamando o método `setName` do NameCallback, passando-lhe o nome digitado pelo usuário:
```
    } else if (callbacks[i] instanceof NameCallback) {

        // prompt the user for a username
        NameCallback nc = (NameCallback)callbacks[i];

        System.err.print(nc.getPrompt());
        System.err.flush();
        nc.setName((new BufferedReader
            (new InputStreamReader(System.in))).readLine());

```

Similarmente, o método `handle` lida com um PasswordCallback imprimindo um prompt em `System.err` para solicitar a senha do usuário. Em seguida, ele define a senha para uso pelo `SampleLoginModule` chamando o método `setPassword` do PasswordCallback, passando-lhe a senha digitada pelo usuário:
```
    } else if (callbacks[i] instanceof PasswordCallback) {

        // prompt the user for sensitive information
        PasswordCallback pc = (PasswordCallback)callbacks[i];

        System.err.print(pc.getPrompt());
        System.err.flush();
        pc.setPassword(System.console().readPassword());

```

#### SampleLoginModule.java e SamplePrincipal.java

`SampleLoginModule.java` implementa a interface [`LoginModule`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/spi/LoginModule.html>). `SampleLoginModule` é a classe especificada pelo arquivo de configuração de login do tutorial (veja [O Arquivo de Configuração de Login para o Tutorial de Autenticação JAAS](<#/doc/guides/security/jaas-authentication-tutorial>)) como a classe que implementa a autenticação subjacente desejada. A autenticação de usuário do `SampleLoginModule` consiste simplesmente em verificar se o nome e a senha especificados pelo usuário têm valores específicos. Este `SampleLoginModule` é especificado pelo arquivo de configuração de login do tutorial como o LoginModule a ser usado porque (1) Ele realiza um tipo básico de autenticação adequado para qualquer ambiente e, portanto, é apropriado para um tutorial para todos os usuários, e (2) Ele fornece um exemplo de implementação de LoginModule para programadores experientes que exigem a capacidade de escrever um LoginModule que implemente uma tecnologia de autenticação.

`SamplePrincipal.java` é uma classe de exemplo que implementa a interface [java.security.Principal](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/Principal.html>). Se a autenticação for bem-sucedida, o `SampleLoginModule` preenche um [Subject](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/Subject.html>) com um `SamplePrincipal` representando o usuário.

Importante: Se você é um desenvolvedor de aplicações, não precisa saber como escrever um LoginModule ou uma implementação de Principal. Você não precisa examinar o código de `SampleLoginModule` ou `SamplePrincipal`. Tudo o que você precisa saber é como escrever sua aplicação e especificar as informações de configuração (como em um arquivo de configuração de login) para que a aplicação possa utilizar o LoginModule especificado pela configuração para autenticar o usuário. Você precisa determinar qual(is) LoginModule(s) deseja usar e ler a documentação do LoginModule para aprender sobre quais opções você pode especificar valores (na configuração) para controlar o comportamento do LoginModule.

Qualquer fornecedor pode fornecer uma implementação de LoginModule que você pode usar. Algumas implementações são fornecidas com o JDK da Oracle, conforme listado no [Apêndice B: Arquivo de Configuração de Login JAAS](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>).

Informações para programadores que desejam escrever um LoginModule podem ser encontradas em [Java Authentication and Authorization Service (JAAS): Guia do Desenvolvedor de LoginModule](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>).

SampleLoginModule.java
```
    package sample.module;

    import java.util.*;
    import java.io.IOException;
    import javax.security.auth.*;
    import javax.security.auth.callback.*;
    import javax.security.auth.login.*;
    import javax.security.auth.spi.*;
    import sample.principal.SamplePrincipal;

    /**
     * <p> This sample LoginModule authenticates users with a password.
     *
     * <p> This LoginModule only recognizes one user:       testUser
     * <p> testUser's password is:  testPassword
     *
     * <p> If testUser successfully authenticates itself,
     * a <code>SamplePrincipal</code> with the testUser's user name
     * is added to the Subject.
     *
     * <p> This LoginModule recognizes the debug option.
     * If set to true in the login Configuration,
     * debug messages will be output to the output stream, System.out.
     *
     */
    public class SampleLoginModule implements LoginModule {

        // initial state
        private Subject subject;
        private CallbackHandler callbackHandler;
        private Map sharedState;
        private Map options;

        // configurable option
        private boolean debug = false;

        // the authentication status
        private boolean succeeded = false;
        private boolean commitSucceeded = false;

        // username and password
        private String username;
        private char[] password;

        // testUser's SamplePrincipal
        private SamplePrincipal userPrincipal;

        /**
         * Initialize this <code>LoginModule</code>.
         *
         * @param subject the <code>Subject</code> to be authenticated. <p>
         *
         * @param callbackHandler a <code>CallbackHandler</code> for communicating
         *                  with the end user (prompting for user names and
         *                  passwords, for example). <p>
         *
         * @param sharedState shared <code>LoginModule</code> state. <p>
         *
         * @param options options specified in the login
         *                  <code>Configuration</code> for this particular
         *                  <code>LoginModule</code>.
         */
        public void initialize(Subject subject,
                       CallbackHandler callbackHandler,
                             Map<java.lang.String, ?> sharedState,
                             Map<java.lang.String, ?> options) {

            this.subject = subject;
            this.callbackHandler = callbackHandler;
            this.sharedState = sharedState;
            this.options = options;

            // initialize any configured options
            debug = "true".equalsIgnoreCase((String)options.get("debug"));
        }

        /**
         * Authenticate the user by prompting for a user name and password.
         *
         * @return true in all cases since this <code>LoginModule</code>
```
```java
         *          should not be ignored.
         *
         * @exception FailedLoginException if the authentication fails. <p>
         *
         * @exception LoginException if this <code>LoginModule</code>
         *          is unable to perform the authentication.
         */
        public boolean login() throws LoginException {
    
            // prompt for a user name and password
            if (callbackHandler == null)
                throw new LoginException("Error: no CallbackHandler available " +
                            "to garner authentication information from the user");
    
            Callback[] callbacks = new Callback[2];
            callbacks[0] = new NameCallback("user name: ");
            callbacks[1] = new PasswordCallback("password: ", false);
    
            try {
                callbackHandler.handle(callbacks);
                username = ((NameCallback)callbacks[0]).getName();
                char[] tmpPassword = ((PasswordCallback)callbacks[1]).getPassword();
                if (tmpPassword == null) {
                    // treat a NULL password as an empty password
                    tmpPassword = new char[0];
                }
                password = new char[tmpPassword.length];
                System.arraycopy(tmpPassword, 0,
                            password, 0, tmpPassword.length);
                ((PasswordCallback)callbacks[1]).clearPassword();
    
            } catch (java.io.IOException ioe) {
                throw new LoginException(ioe.toString());
            } catch (UnsupportedCallbackException uce) {
                throw new LoginException("Error: " + uce.getCallback().toString() +
                    " not available to garner authentication information " +
                    "from the user");
            }
    
            // print debugging information
            if (debug) {
                System.out.println("\t\t[SampleLoginModule] " +
                                    "user entered user name: " +
                                    username);
                System.out.print("\t\t[SampleLoginModule] " +
                                    "user entered password: ");
                for (int i = 0; i < password.length; i++)
                    System.out.print(password[i]);
                System.out.println();
            }
    
            // verify the username/password
            boolean usernameCorrect = false;
            boolean passwordCorrect = false;
            if (username.equals("testUser"))
                usernameCorrect = true;
            if (usernameCorrect &&
                password.length == 12 &&
                password[0] == 't' &&
                password[1] == 'e' &&
                password[2] == 's' &&
                password[3] == 't' &&
                password[4] == 'P' &&
                password[5] == 'a' &&
                password[6] == 's' &&
                password[7] == 's' &&
                password[8] == 'w' &&
                password[9] == 'o' &&
                password[10] == 'r' &&
                password[11] == 'd') {
    
                // authentication succeeded!!!
                passwordCorrect = true;
                if (debug)
                    System.out.println("\t\t[SampleLoginModule] " +
                                    "authentication succeeded");
                succeeded = true;
                return true;
            } else {
    
                // authentication failed -- clean out state
                if (debug)
                    System.out.println("\t\t[SampleLoginModule] " +
                                    "authentication failed");
                succeeded = false;
                username = null;
                for (int i = 0; i < password.length; i++)
                    password[i] = ' ';
                password = null;
                if (!usernameCorrect) {
                    throw new FailedLoginException("User Name Incorrect");
                } else {
                    throw new FailedLoginException("Password Incorrect");
                }
            }
        }
    
        /**
         * This method is called if the LoginContext's
         * overall authentication succeeded
         * (the relevant REQUIRED, REQUISITE, SUFFICIENT and OPTIONAL LoginModules
         * succeeded).
         *
         * If this LoginModule's own authentication attempt
         * succeeded (checked by retrieving the private state saved by the
         * <code>login</code> method), then this method associates a
         * <code>SamplePrincipal</code>
         * with the <code>Subject</code> located in the
         * <code>LoginModule</code>.  If this LoginModule's own
         * authentication attempted failed, then this method removes
         * any state that was originally saved.
         *
         * @exception LoginException if the commit fails.
         *
         * @return true if this LoginModule's own login and commit
         *          attempts succeeded, or false otherwise.
         */
        public boolean commit() throws LoginException {
            if (succeeded == false) {
                return false;
            } else {
                // add a Principal (authenticated identity)
                // to the Subject
    
                // assume the user we authenticated is the SamplePrincipal
                userPrincipal = new SamplePrincipal(username);
                if (!subject.getPrincipals().contains(userPrincipal))
                    subject.getPrincipals().add(userPrincipal);
    
                if (debug) {
                    System.out.println("\t\t[SampleLoginModule] " +
                                    "added SamplePrincipal to Subject");
                }
    
                // in any case, clean out state
                username = null;
                for (int i = 0; i < password.length; i++)
                    password[i] = ' ';
                password = null;
    
                commitSucceeded = true;
                return true;
            }
        }
    
        /**
         * This method is called if the LoginContext's
         * overall authentication failed.
         * (the relevant REQUIRED, REQUISITE, SUFFICIENT and OPTIONAL LoginModules
         * did not succeed).
         *
         * If this LoginModule's own authentication attempt
         * succeeded (checked by retrieving the private state saved by the
         * <code>login</code> and <code>commit</code> methods),
         * then this method cleans up any state that was originally saved.
         *
         * @exception LoginException if the abort fails.
         *
         * @return false if this LoginModule's own login and/or commit attempts
         *          failed, and true otherwise.
         */
        public boolean abort() throws LoginException {
            if (succeeded == false) {
                return false;
            } else if (succeeded == true && commitSucceeded == false) {
                // login succeeded but overall authentication failed
                succeeded = false;
                username = null;
                if (password != null) {
                    for (int i = 0; i < password.length; i++)
                        password[i] = ' ';
                    password = null;
                }
                userPrincipal = null;
            } else {
                // overall authentication succeeded and commit succeeded,
                // but someone else's commit failed
                logout();
            }
            return true;
        }
    
        /**
         * Logout the user.
         *
         * This method removes the <code>SamplePrincipal</code>
         * that was added by the <code>commit</code> method.
         *
         * @exception LoginException if the logout fails.
         *
         * @return true in all cases since this <code>LoginModule</code>
         *          should not be ignored.
         */
        public boolean logout() throws LoginException {
    
            subject.getPrincipals().remove(userPrincipal);
            succeeded = false;
            succeeded = commitSucceeded;
            username = null;
            if (password != null) {
                for (int i = 0; i < password.length; i++)
                    password[i] = ' ';
                password = null;
            }
            userPrincipal = null;
            return true;
        }
    }
    
```

```java
    package sample.principal;
    
    import java.security.Principal;
    
    /**
     * This class implements the <code>Principal</code> interface
     * and represents a Sample user.
     *
     * Principals such as this <code>SamplePrincipal</code>
     * may be associated with a particular <code>Subject</code>
     * to augment that <code>Subject</code> with an additional
     * identity.  Refer to the <code>Subject</code> class for more information
     * on how to achieve this.  Authorization decisions can then be based upon
     * the Principals associated with a <code>Subject</code>.
     *
     * @see java.security.Principal
     * @see javax.security.auth.Subject
     */
    public class SamplePrincipal implements Principal, java.io.Serializable {
    
        /**
         * @serial
         */
        private String name;
    
        /**
         * Create a SamplePrincipal with a Sample username.
         *
         * @param name the Sample username for this user.
         *
         * @exception NullPointerException if the <code>name</code>
         *                  is <code>null</code>.
         */
        public SamplePrincipal(String name) {
            if (name == null)
                throw new NullPointerException("illegal null input");
    
            this.name = name;
        }
    
        /**
         * Return the Sample username for this <code>SamplePrincipal</code>.
         *
         * @return the Sample username for this <code>SamplePrincipal</code>
         */
        public String getName() {
            return name;
        }
    
        /**
         * Return a string representation of this <code>SamplePrincipal</code>.
         *
         * @return a string representation of this <code>SamplePrincipal</code>.
         */
        public String toString() {
            return("SamplePrincipal:  " + name);
        }
    
        /**
         * Compares the specified Object with this <code>SamplePrincipal</code>
         * for equality.  Returns true if the given object is also a
         * <code>SamplePrincipal</code> and the two SamplePrincipals
         * have the same username.
         *
         * @param o Object to be compared for equality with this
         *          <code>SamplePrincipal</code>.
         *
         * @return true if the specified Object is equal equal to this
         *          <code>SamplePrincipal</code>.
         */
        public boolean equals(Object o) {
            if (o == null)
                return false;
    
            if (this == o)
                return true;
    
            if (!(o instanceof SamplePrincipal))
                return false;
            SamplePrincipal that = (SamplePrincipal)o;
    
            if (this.getName().equals(that.getName()))
                return true;
            return false;
        }
    
        /**
         * Return a hash code for this <code>SamplePrincipal</code>.
         *
         * @return a hash code for this <code>SamplePrincipal</code>.
         */
        public int hashCode() {
            return name.hashCode();
        }
    }
    
```

### A Configuração de Login

A autenticação JAAS é realizada de forma plugável, para que as aplicações possam permanecer independentes das tecnologias de autenticação subjacentes. Um administrador de sistema determina as tecnologias de autenticação, ou LoginModules, a serem usadas para cada aplicação e as configura em uma Configuration de login. A fonte das informações de configuração (por exemplo, um arquivo ou um banco de dados) depende da implementação atual de [javax.security.auth.login.Configuration](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/login/Configuration.html>). A implementação padrão de `Configuration` da Oracle lê informações de configuração de arquivos de configuração, conforme descrito na classe [ConfigFile](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.auth/com/sun/security/auth/login/ConfigFile.html>).

Consulte [Apêndice B: Arquivo de Configuração de Login JAAS](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>) para obter informações sobre o que é um arquivo de configuração de login, o que ele contém e como especificar qual arquivo de configuração de login deve ser usado.

#### O Arquivo de Configuração de Login para o Tutorial de Autenticação JAAS

Conforme observado, o arquivo de configuração de login que usamos para este tutorial, `sample_jaas.config`, contém apenas uma entrada, que é
```java
    Sample {
      sample.module.SampleLoginModule required debug=true;
    };
```

Esta entrada é nomeada "Sample" e esse é o nome que nossa aplicação de tutorial, `SampleAcn`, usa para se referir a esta entrada. A entrada especifica que o LoginModule a ser usado para realizar a autenticação do usuário é o `SampleLoginModule` no pacote `sample.module` e que este `SampleLoginModule` é exigido para "ter sucesso" para que a autenticação seja considerada bem-sucedida. O `SampleLoginModule` só tem sucesso se o nome e a senha fornecidos pelo usuário forem os que ele espera ("testUser" e "testPassword", respectivamente).

O `SampleLoginModule` também define uma opção "debug" que pode ser definida como `true`, conforme mostrado. Se esta opção for definida como `true`, o `SampleLoginModule` exibe informações extras sobre o progresso da autenticação. Um LoginModule pode definir quantas opções desejar. A documentação do LoginModule deve especificar os possíveis nomes e valores de opções que você pode definir em seu arquivo de configuração.

### Executando o Código do Tutorial de Autenticação JAAS

Para executar nosso código de tutorial de autenticação JAAS, tudo o que você precisa fazer é

1.  Coloque o seguinte arquivo em um diretório:

    *   arquivo de configuração de login sample_jaas.config (consulte [O Arquivo de Configuração de Login para o Tutorial de Autenticação JAAS](<#/doc/guides/security/jaas-authentication-tutorial>))
2.  Crie um subdiretório chamado sample desse diretório de nível superior e coloque o seguinte nele (observe que as classes `SampleAcn` e MyCallbackHandler, ambas em `SampleAcn.java`, estão em um pacote chamado `sample`):

    *   arquivo fonte da aplicação [`SampleAcn.java`](<#/doc/guides/security/jaas-authentication-tutorial>)
3.  Crie um subdiretório do diretório `sample` e nomeie-o `module`. Coloque o seguinte nele (observe que a classe `SampleLoginModule` está em um pacote chamado `sample.module`):

    *   arquivo fonte [`SampleLoginModule.java`](<#/doc/guides/security/jaas-authentication-tutorial>)
4.  Crie outro subdiretório do diretório `sample` e nomeie-o `principal`. Coloque o seguinte nele (observe que a classe `SamplePrincipal` está em um pacote chamado `sample.principal`):
    *   arquivo fonte [`SamplePrincipal.java`](<#/doc/guides/security/jaas-authentication-tutorial>)
5.  Estando no diretório de nível superior, compile `SampleAcn.java`, `SampleLoginModule.java` e `SamplePrincipal.java`:

`javac --enable-preview -source 25 sample/SampleAcn.java sample/module/SampleLoginModule.java sample/principal/SamplePrincipal.java`

(Digite tudo isso em uma única linha.)

6.  Execute a aplicação `SampleAcn`, especificando
    *   por `-Djava.security.auth.login.config==sample_jaas.config` que o arquivo de configuração de login a ser usado é `sample_jaas.config`.

O comando completo é o seguinte:
```java
    java --enable-preview -Djava.security.auth.login.config==sample_jaas.config sample.SampleAcn
```

Nota:

Se você usar um único sinal de igual (`=`) com a propriedade de sistema `java.security.auth.login.config` (em vez de um sinal de igual duplo (`==`)), então as configurações especificadas por esta propriedade de sistema e pelo arquivo `java.security` serão usadas.

Você será solicitado a inserir seu nome de usuário e senha, e o `SampleLoginModule` especificado no arquivo de configuração de login verificará se estão corretos. O `SampleLoginModule` espera `testUser` para o nome de usuário e `testPassword` para a senha.

Você verá algumas mensagens exibidas pelo `SampleLoginModule` como resultado da opção `debug` estar definida como `true` no arquivo de configuração de login. Então, se seu login for bem-sucedido, você verá a seguinte mensagem exibida pelo SampleAcn:
```java
    Authentication succeeded!
```

Se o login não for bem-sucedido (por exemplo, se você digitar a senha incorretamente), você verá
```java
    Authentication failed:
```

seguido por um motivo para a falha. Por exemplo, se você digitar a senha incorretamente, poderá ver uma mensagem como a seguinte:
```java
    Authentication failed:
      Password Incorrect
```

SampleAcn lhe dá três chances para fazer login com sucesso.

O exemplo imprime uma saída semelhante à seguinte:
```java
    $ java --enable-preview -Djava.security.auth.login.config==sample_jaas.config sample.SampleAcn
    user name: testUser
    password: testPassword
                    [SampleLoginModule] user entered user name: testUser
                    [SampleLoginModule] user entered password: testPassword
                    [SampleLoginModule] authentication succeeded
                    [SampleLoginModule] added SamplePrincipal to Subject
    Authentication succeeded!
    Authenticated user has the following Principals:
            SamplePrincipal:  testUser
    User has 0 Public Credential(s)
    
    Current subject: Subject:
            Principal: SamplePrincipal:  testUser
    
    
    Adding principal -1501634219
    
    Authenticated user has the following Principals:
    
    Adding principal -1164915804
    
    Adding principal 304653985
    
    Adding principal -1764420412
    
    Current subject: Subject:
            Principal: SamplePrincipal:  testUser
            Principal: SamplePrincipal:  -1501634219
            Principal: SamplePrincipal:  -1164915804
            Principal: SamplePrincipal:  304653985
            Principal: SamplePrincipal:  -1764420412
```