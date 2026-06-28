# Código-Fonte para Tutoriais JAAS e Java GSS-API

## Código-Fonte para Tutoriais JAAS e Java GSS-API

SampleServer.java
```java
    import org.ietf.jgss.*;
    import java.io.*;
    import java.net.Socket;
    import java.net.ServerSocket;
    
    /**
     * Uma aplicação de servidor de exemplo que usa JGSS para realizar autenticação
     * mútua com um cliente usando Kerberos como mecanismo subjacente. Em seguida,
     * troca dados de forma segura com o cliente.
     *
     * Cada mensagem trocada com o cliente inclui um cabeçalho de nível de aplicação
     * de 4 bytes que contém o valor inteiro big-endian para o número de bytes
     * que seguirão como parte do token JGSS.
     *
     * O protocolo é:
     *    1.  Loop de estabelecimento de contexto:
     *         a. cliente envia token de contexto de segurança de inicialização para o servidor
     *         b. servidor envia token de contexto de segurança de aceitação para o cliente
     *         ....
     *    2. cliente envia um token de encapsulamento para o servidor.
     *    3. servidor envia um token MIC para o cliente para a mensagem da aplicação
     *       que estava contida no token de encapsulamento.
     */
    
    public class SampleServer  {
    
        public static void main(String[] args)
            throws IOException, GSSException {
    
            // Obtém os argumentos da linha de comando e analisa o número da porta
            if (args.length != 1) {
                System.err.println("Usage: java <options> Login SampleServer <localPort>");
                System.exit(-1);
            }
    
            int localPort = Integer.parseInt(args[0]);
            ServerSocket ss = new ServerSocket(localPort);
            GSSManager manager = GSSManager.getInstance();
    
            while (true) {
                System.out.println("Waiting for incoming connection...");
                Socket socket = ss.accept();
                DataInputStream inStream =
                    new DataInputStream(socket.getInputStream());
                DataOutputStream outStream =
                    new DataOutputStream(socket.getOutputStream());
                System.out.println("Got connection from client "
                                   + socket.getInetAddress());
    
                /*
                 * Cria um GSSContext para receber a requisição de entrada
                 * do cliente. Use null para as credenciais do servidor
                 * passadas. Isso informa ao mecanismo subjacente
                 * para usar quaisquer credenciais disponíveis que
                 * possam ser usadas para aceitar esta conexão.
                 */
                GSSContext context = manager.createContext((GSSCredential)null);
    
                // Executa o loop de estabelecimento de contexto
                byte[] token = null;
                while (!context.isEstablished()) {
                    token = new byte[inStream.readInt()];
                    System.out.println("Will read input token of size "
                                       + token.length
                                       + " for processing by acceptSecContext");
                    inStream.readFully(token);
                    token = context.acceptSecContext(token, 0, token.length);
    
                    // Envia um token para o par se um foi gerado por
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
    
                /*
                 * Se a autenticação mútua não ocorreu, então
                 * apenas o cliente foi autenticado para o
                 * servidor. Caso contrário, tanto o cliente quanto o servidor foram
                 * autenticados um para o outro.
                 */
                if (context.getMutualAuthState())
                    System.out.println("Mutual authentication took place!");
    
                /*
                 * Cria um MessageProp que unwrap usará para retornar
                 * informações como a Qualidade de Proteção que foi
                 * aplicada ao token encapsulado, se foi ou não
                 * criptografado, etc. Como os valores iniciais de MessageProp
                 * são ignorados, basta defini-los para os padrões de 0 e false.
                 */
                MessageProp prop = new MessageProp(0, false);
    
                /*
                 * Lê o token. Isso usa o mesmo array de bytes de token
                 * que foi usado durante o estabelecimento do contexto.
                 */
                token = new byte[inStream.readInt()];
                System.out.println("Will read token of size "
                                   + token.length);
                inStream.readFully(token);
                byte[] bytes = context.unwrap(token, 0, token.length, prop);
                String str = new String(bytes);
                System.out.println("Received data \""
                                   + str + "\" of length " + str.length());
                System.out.println("Confidentiality applied: "
                                   + prop.getPrivacy());
    
                /*
                 * Agora gera um MIC e o envia para o cliente. Isso é
                 * apenas para fins de ilustração. A integridade da
                 * mensagem encapsulada de entrada é garantida independentemente
                 * da confidencialidade (criptografia) que foi usada.
                 */
    
                /*
                 * Primeiro, redefine o QOP do MessageProp para 0
                 * para garantir que a Qualidade de Proteção padrão
                 * seja aplicada.
                 */
                prop.setQOP(0);
                token = context.getMIC(bytes, 0, bytes.length, prop);
                System.out.println("Will send MIC token of size "
                                   + token.length);
                outStream.writeInt(token.length);
                outStream.write(token);
                outStream.flush();
                System.out.println("Closing connection with client "
                                   + socket.getInetAddress());
                context.dispose();
                socket.close();
            }
        }
    }
```

bcsLogin.conf
```
    /** 
     * Configuração de Login para JAAS.
     */
    
    com.sun.security.jgss.initiate {
      com.sun.security.auth.module.Krb5LoginModule required;
    };
    
    com.sun.security.jgss.accept {
      com.sun.security.auth.module.Krb5LoginModule required storeKey=true; 
    };
```

SampleClient.java
```java
    import org.ietf.jgss.*;
    import java.net.Socket;
    import java.io.IOException;
    import java.io.DataInputStream;
    import java.io.DataOutputStream;
    
    /**
     * Uma aplicação cliente de exemplo que usa JGSS para realizar autenticação
     * mútua com um servidor usando Kerberos como mecanismo subjacente. Em seguida,
     * troca dados de forma segura com o servidor.
     *
     * Cada mensagem enviada ao servidor inclui um cabeçalho de nível de aplicação
     * de 4 bytes que contém o valor inteiro big-endian para o número de bytes
     * que seguirão como parte do token JGSS.
     *
     * O protocolo é:
     *    1.  Loop de estabelecimento de contexto:
     *         a. cliente envia token de contexto de segurança de inicialização para o servidor
     *         b. servidor envia token de contexto de segurança de aceitação para o cliente
     *         ....
     *    2. cliente envia um token de encapsulamento para o servidor.
     *    3. servidor envia um token MIC para o cliente para a mensagem da aplicação
     *       que estava contida no token de encapsulamento.
     */
    
    public class SampleClient {
    
        public static void main(String[] args)
           throws IOException, GSSException  {
    
            // Obtém os argumentos da linha de comando e analisa o número da porta
    
            if (args.length < 3) {
                System.err.println("Usage: java <options> Login SampleClient "
                                   + " <server> <hostName> <port>");
                System.exit(-1);
            }
    
            String server = args[0];
            String hostName = args[1];
            int port = Integer.parseInt(args[2]);
    
            Socket socket = new Socket(hostName, port);
            DataInputStream inStream =
              new DataInputStream(socket.getInputStream());
            DataOutputStream outStream =
              new DataOutputStream(socket.getOutputStream());
    
            System.out.println("Connected to server "
                               + socket.getInetAddress());
    
            /*
             * Este Oid é usado para representar o mecanismo GSS-API Kerberos versão 5.
             * Ele é definido na RFC 1964. Usaremos este Oid sempre que precisarmos
             * indicar ao GSS-API que ele deve usar Kerberos para algum propósito.
             */
            Oid krb5Oid = new Oid("1.2.840.113554.1.2.2");
    
            GSSManager manager = GSSManager.getInstance();
    
            /*
             * Cria um GSSName a partir do nome do servidor. O null
             * indica que esta aplicação não deseja fazer nenhuma afirmação
             * sobre a sintaxe deste nome e que o mecanismo subjacente
             * deve tentar analisá-lo de acordo com a sintaxe padrão que escolher.
             */
            GSSName serverName = manager.createName(server, null);
    
            /*
             * Cria um GSSContext para autenticação mútua com o
             * servidor.
             *    - serverName é o GSSName que representa o servidor.
             *    - krb5Oid é o Oid que representa o mecanismo a
             *      ser usado. O cliente escolhe o mecanismo a ser usado.
             *    - null é passado para as credenciais do cliente
             *    - DEFAULT_LIFETIME permite que o mecanismo decida por quanto tempo o
             *      contexto pode permanecer válido.
             * Nota: Passar null para as credenciais pede ao GSS-API para
             * usar as credenciais padrão. Isso significa que o mecanismo
             * procurará entre as credenciais armazenadas no Subject atual
             * para encontrar o tipo certo de credenciais de que precisa.
             */
            GSSContext context = manager.createContext(serverName,
                                            krb5Oid,
                                            null,
                                            GSSContext.DEFAULT_LIFETIME);
    
            // Define os recursos opcionais desejados no contexto. O cliente
            // escolhe essas opções.
    
            context.requestMutualAuth(true);  // Autenticação mútua
            context.requestConf(true);  // Usará confidencialidade mais tarde
            context.requestInteg(true); // Usará integridade mais tarde
    
            // Executa o loop de estabelecimento de contexto
    
            byte[] token = new byte[0];
    
            while (!context.isEstablished()) {
    
                // token é ignorado na primeira chamada
                token = context.initSecContext(token, 0, token.length);
    
                // Envia um token para o servidor se um foi gerado por
                // initSecContext
                if (token != null) {
                    System.out.println("Will send token of size "
                                       + token.length
                                       + " from initSecContext.");
                    outStream.writeInt(token.length);
                    outStream.write(token);
                    outStream.flush();
                }
    
                // Se o cliente terminou o estabelecimento do contexto
                // então não haverá mais tokens para ler neste loop
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
    
            /*
             * Se a autenticação mútua não ocorreu, então apenas o
             * cliente foi autenticado para o servidor. Caso contrário, tanto
             * o cliente quanto o servidor foram autenticados um para o outro.
             */
            if (context.getMutualAuthState())
                System.out.println("Mutual authentication took place!");
    
            byte[] messageBytes = "Hello There!\0".getBytes();
    
            /*
             * O primeiro argumento de MessageProp é 0 para solicitar
             * a Qualidade de Proteção padrão.
             * O segundo argumento é true para solicitar
             * privacidade (criptografia da mensagem).
             */
            MessageProp prop =  new MessageProp(0, true);
    
            /*
             * Criptografa os dados e os envia. A proteção de integridade
             * é sempre aplicada, independentemente da confidencialidade
             * (ou seja, criptografia).
             * Você pode usar o mesmo token (array de bytes) que foi usado
             * ao estabelecer o contexto.
             */
    
            token = context.wrap(messageBytes, 0, messageBytes.length, prop);
            System.out.println("Will send wrap token of size " + token.length);
            outStream.writeInt(token.length);
            outStream.write(token);
            outStream.flush();
    
            /*
             * Agora permitiremos que o servidor descriptografe a mensagem,
             * calcule um MIC na mensagem descriptografada e nos envie de volta
             * para verificação. Isso é desnecessário, mas feito aqui
             * para ilustração.
             */
    
            token = new byte[inStream.readInt()];
            System.out.println("Will read token of size " + token.length);
            inStream.readFully(token);
            context.verifyMIC(token, 0, token.length,
                              messageBytes, 0, messageBytes.length,
                              prop);
    
            System.out.println("Verified received MIC for message.");
    
            System.out.println("Exiting...");
            context.dispose();
            socket.close();
        }
    }
```

JaasAcn.java
```java
    import javax.security.auth.*;
    import javax.security.auth.callback.*;
    import javax.security.auth.login.*;
    import com.sun.security.auth.callback.TextCallbackHandler;
    
    /**
     * Esta aplicação JaasAcn tenta autenticar um usuário
     * e informa se a autenticação foi bem-sucedida ou não.
     */
    public class JaasAcn {
    
        public static void main(String[] args) {
    
            // Obtém um LoginContext, necessário para autenticação. Informa a ele
            // para usar a implementação de LoginModule especificada pela
            // entrada nomeada "JaasSample" no arquivo de configuração de login JAAS
            // e também para usar o CallbackHandler especificado.
            LoginContext lc = null;
            try {
                lc = new LoginContext("JaasSample", new TextCallbackHandler());
            } catch (LoginException le) {
                System.err.println("Cannot create LoginContext. "
                    + le.getMessage());
                System.exit(-1);
            }
    
            try {
    
                // tentar autenticação
                lc.login();
    
            } catch (LoginException le) {
    
                System.err.println("Authentication failed:");
                System.err.println("  " + le.getMessage());
                System.exit(-1);
    
            }
    
            System.out.println("Authentication succeeded!");
    
        }
    }
```

jass.conf
```
    /** Configuração de Login para a aplicação JaasAcn
     **/
    
    JaasSample {
       com.sun.security.auth.module.Krb5LoginModule required;
    };
```

Login.java
```java
    import java.io.*;
    import java.lang.reflect.*;
    import java.util.Arrays;
    import java.util.concurrent.*;
    
    import javax.security.auth.callback.*;
    import javax.security.auth.login.*;
    import javax.security.auth.Subject;
    import com.sun.security.auth.callback.TextCallbackHandler;
    
    /**
     * <p>Esta classe autentica um <code>Subject</code> e então
     * executa uma aplicação especificada como esse
     * <code>Subject</code>. Para usar esta classe, o interpretador
     * Java seria tipicamente invocado como:</p>
     *
     * <pre>% java Login <i>applicationclass</i> <i>applicationClass_args</i></pre>
     *
     * <p><i>applicationClass</i> representa a aplicação a ser
     * executada como o <code>Subject</code> autenticado,
     * e <i>applicationClass_args</i> são passados como argumentos para
     * <i>applicationClass</i>.</p>
     *
     * <p>Para realizar a autenticação, <code>Login</code> usa um
     * <code>LoginContext</code>. Um <code>LoginContext</code> depende
     * de uma <code>Configuration</code> para determinar os módulos que
     * devem ser usados para realizar a autenticação real. A
     * localização da <code>Configuration</code> depende de
     * cada implementação de <code>Configuration</code>.<p>
     *
     * <p>A implementação padrão de <code>Configuration</code>
     * (<code>com.sun.security.auth.login.ConfigFile</code>)
     * permite que a localização da <code>Configuration</code> seja
     * especificada (entre outras formas) através da
     * propriedade de sistema <code>java.security.auth.login.config</code>.
     * Portanto, a classe <code>Login</code> também pode ser invocada
     * como:</p>
     *
     * <pre>% java -Djava.security.auth.login.config=<i>configuration_url</i> \
     *        Login \
     *        <i>your_application_class</i> <i>your_application_class_args</i></pre>
     */
    
    public class Login {
    
        /**
         * <p>Instancia um <code>LoginContext</code> usando o
         * nome da classe da aplicação fornecida como índice para a
         * <code>Configuration</code> de login. Autentica o
         * <code>Subject</code> (três tentativas são permitidas) e
         * invoca <code>Subject.callAs</code> com o
         * <code>Subject</code> autenticado e um
         * <code>Callable</code>. O <code>Callable</code>
         * carrega a classe da aplicação fornecida e então invoca
         * seu método <code>main</code> público estático, passando-lhe
         * os argumentos da aplicação.</p>
         *
         * @param args os argumentos para <code>Login</code>. O
         *          primeiro argumento deve ser o nome da classe da
         *          aplicação a ser invocada após a conclusão da autenticação, e os
         *          argumentos subsequentes são os argumentos a serem passados para
         *          o método <code>main</code> público estático dessa aplicação.
         */
        public static void main(String[] args) {
    
            // verifica a classe principal da aplicação
            if (args == null || args.length == 0) {
                System.err.println("Invalid arguments: " +
                    "Did not provide name of application class.");
                System.exit(-1);
            }
    
            LoginContext lc = null;
            try {
                lc = new LoginContext(args[0], new TextCallbackHandler());
            } catch (LoginException le) {
                System.err.println("Cannot create LoginContext. "
                    + le.getMessage());
                System.exit(-1);
            }
    
            // o usuário tem 3 tentativas para autenticar com sucesso
            int i;
            for (i = 0; i < 3; i++) {
                try {
    
                    // tentar autenticação
                    lc.login();
    
                    // se retornarmos sem exceção, a autenticação foi bem-sucedida
                    break;
    
                } catch (AccountExpiredException aee) {
    
                    System.err.println("Your account has expired.  " +
                                    "Please notify your administrator.");
                    System.exit(-1);
    
                } catch (CredentialExpiredException cee) {
    
                    System.err.println("Your credentials have expired.");
                    System.exit(-1);
    
                } catch (FailedLoginException fle) {
    
                    System.err.println("Authentication Failed");
                    try {
                          Thread.currentThread().sleep(3000);
                    } catch (Exception e) {
                          // ignorar
                    }
    
                } catch (Exception e) {
    
                    System.err.println("Unexpected Exception - unable to continue");
                    e.printStackTrace();
                    System.exit(-1);
                }
            }
    
            // eles falharam três vezes?
            if (i == 3) {
                System.err.println("Sorry");
                System.exit(-1);
            }
    
            // Executa a ação como o subject
            try {
                Subject.callAs(lc.getSubject(),
                               new MyAction(args));
            } catch (CompletionException ce) {
                ce.printStackTrace();
                System.exit(-1);
            }
    
            System.exit(0);
        }
    }
    
    class MyAction implements Callable<Void> {
    
        String[] origArgs;
    
        public MyAction(String[] origArgs) {
            this.origArgs = (String[])origArgs.clone();
        }
    
        public Void call() throws Exception {
    
            // obtém o ContextClassLoader
            ClassLoader cl = Thread.currentThread().getContextClassLoader();
    
            // conclusão bem-sucedida
            return null;
        }
    }
```

Sample.java
```java
    import java.io.File;
    
    public class Sample {
    
        /**
         * Esta classe de exemplo realiza as seguintes operações:
         * <ul>
         * <li> Acessa a propriedade de sistema <i>java.home</i>
         * <li> Acessa a propriedade de sistema <i>user.home</i>
         * <li> Acessa o arquivo <i>foo.txt</i>
         * </ul>
         *
         */
        public static void main (String[] args) {
    
            // Se houvesse quaisquer argumentos para ler, faríamos isso aqui.
    
            System.out.println("\nYour java.home property value is: "
                                +System.getProperty("java.home"));
    
            System.out.println("\nYour user.home property value is: "
                                +System.getProperty("user.home"));
    
            File f = new File("foo.txt");
            System.out.print("\nfoo.txt ");
            if (!f.exists())
                System.out.print("não ");
            System.out.println("existe no diretório de trabalho atual.");
        }
    }
```

sample.conf
```
    /** Configuração de Login para a Aplicação de Exemplo **/
    
    Sample {
       com.sun.security.auth.module.Krb5LoginModule required;
    };
```

csLogin.conf
```
    /** 
     * Configuração de Login para JAAS.
     */
    
    SampleClient {
      com.sun.security.auth.module.Krb5LoginModule required;
    };
    
    SampleServer {
      com.sun.security.auth.module.Krb5LoginModule required storeKey=true principal="service_principal@your_realm";
    };
```