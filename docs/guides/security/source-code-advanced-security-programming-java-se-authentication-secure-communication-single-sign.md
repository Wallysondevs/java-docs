# Código-Fonte para Programação de Segurança Avançada em Java SE Autenticação, Comunicação Segura e Single Sign-On

## Código-Fonte para Programação de Segurança Avançada em Java SE Autenticação, Comunicação Segura e Single Sign-On

Jaas.java
```java
    import javax.security.auth.Subject;
    import javax.security.auth.login.*;
    import javax.security.auth.callback.CallbackHandler;
    import java.security.*;
    import com.sun.security.auth.callback.TextCallbackHandler;
    import java.io.File;
    import java.util.concurrent.Callable;
    
    public class Jaas {
        private static String name;
        private static final boolean verbose = false;
    
        public static void main(String[] args) throws Exception {
            if (args.length > 0) {
                name = args[0];
            } else {
                name = "client";
            }
    
            // Create action to perform
            MyAction action = new MyAction();
            
            loginAndAction(name, action);
        }
    
        static <T> void loginAndAction(String name, Callable<T> action)
            throws LoginException, PrivilegedActionException {
    
            // Create a callback handler
            CallbackHandler callbackHandler = new TextCallbackHandler();
    
            LoginContext context = null;
    
            try {
                // Create a LoginContext with a callback handler
                context = new LoginContext(name, callbackHandler);
    
                // Perform authentication
                context.login();
            } catch (LoginException e) {
                System.err.println("Login failed");
                e.printStackTrace();
                System.exit(-1);
            }
    
            // Perform action as authenticated user
            Subject subject = context.getSubject();
            if (verbose) {
                System.out.println(subject.toString());
            } else {
                System.out.println("Authenticated principal: " +
                    subject.getPrincipals());
            }
    
            Subject.callAs(subject, action);
    
            context.logout();
        }
        
        // Action to perform
        static class MyAction implements Callable<Void> {
            MyAction() { }
    
            public Void call() throws Exception {
                // Replace the following with an action to be performed
                // by authenticated user
                System.out.println("Performing secure action ...");
                return null;
            }
        }    
    }
```

jaas-krb5.conf
```
    client {
        com.sun.security.auth.module.Krb5LoginModule required
        principal="test";
    };
    
    server {
        com.sun.security.auth.module.Krb5LoginModule required
        useKeyTab=true
        storeKey=true
        keyTab=sample.keytab
        principal="host/machineName";
    };
```

AppConnection.java
```java
    import java.io.*;
    import java.net.Socket;
    
    class AppConnection {
        public static final int AUTH_CMD = 100;
        public static final int DATA_CMD = 200;
    
        public static final int SUCCESS = 0;
        public static final int AUTH_INPROGRESS = 1;
        public static final int FAILURE = 2;
    
        private DataInputStream inStream;
        private DataOutputStream outStream;
        private Socket socket;
    
        // Client application
        AppConnection(String hostName, int port) throws IOException {
            socket = new Socket(hostName, port);
    
            inStream = new DataInputStream(socket.getInputStream());
            outStream = new DataOutputStream(socket.getOutputStream());
    
            System.out.println("Connected to address " +
                socket.getInetAddress());
        }
    
        // Server side application
        AppConnection(Socket socket) throws IOException {
            this.socket = socket;
            inStream = new DataInputStream(socket.getInputStream());
            outStream = new DataOutputStream(socket.getOutputStream());
    
            System.out.println("Got connection from client " +
                socket.getInetAddress());
        }
    
        byte[] receive(int expected) throws IOException {
            if (expected != -1) {
                int cmd = inStream.readInt();
                if (expected != cmd) {
                    throw new IOException("Received unexpected code: " + cmd);
                }
                //System.out.println("Read cmd: " + cmd);
            }
    
            byte[] reply = null;
            int len;
            try {
                len = inStream.readInt();
                //System.out.println("Read length: " + len);
    
            } catch (IOException e) {
                len = 0;
            }
            if (len > 0) {
                reply = new byte[len];
                inStream.readFully(reply);
            } else {
                reply = new byte[0];
            }
            return reply;
        }
    
        AppReply send(int cmd, byte[] bytes) throws IOException {
            //System.out.println("Write cmd: " + cmd);
            outStream.writeInt(cmd);
            if (bytes != null) {
                //System.out.println("Write length: " + bytes.length);
                outStream.writeInt(bytes.length);
                if (bytes.length > 0) {
                    outStream.write(bytes);
                }
            } else {
                //System.out.println("Write length: " + 0);
                outStream.writeInt(0);
            }
    
            outStream.flush();
    
            if (cmd == SUCCESS || cmd == FAILURE) {
                return null;   // Done
            }
    
            int returnCode = inStream.readInt();
            //System.out.println("Read cmd: " + returnCode);
    
            byte[] reply = null;
            if (returnCode != FAILURE) {
                reply = receive(-1);
            }
            return new AppReply(returnCode, reply);
        }
    
        static class AppReply {
            private int code;
            private byte[] bytes;
    
            AppReply(int code, byte[] bytes) {
                this.bytes = bytes;
                this.code = code;
            }
    
            int getStatus() {
                return code;
            }
    
            byte[] getBytes() {
                return bytes;
            }
        }
    
        void close() {
            try {
                socket.close();
            } catch (IOException e) {
            }
        }
    }
```

GssServer.java
```java
    import org.ietf.jgss.*;
    import java.io.*;
    import java.net.Socket;
    import java.net.ServerSocket;
    import java.security.*;
    import java.util.Date;
    import java.util.concurrent.Callable;
    
    /**
     * Uma aplicação de servidor de exemplo que usa JGSS para realizar autenticação mútua
     * com um cliente usando Kerberos como mecanismo subjacente. Em seguida,
     * troca dados de forma segura com o cliente.
     *
     * Cada mensagem trocada com o cliente inclui um cabeçalho de 4 bytes em nível de aplicação
     * que contém o valor inteiro big-endian para o número
     * de bytes que seguirão como parte do token JGSS.
     *
     * O protocolo é:
     *    1.  Loop de estabelecimento de contexto:
     *         a. cliente envia token init sec context para o servidor
     *         b. servidor envia token accept sec context para o cliente
     *         ....
     *    2. cliente envia um token wrap para o servidor.
     *    3. servidor envia um token wrap de volta para o cliente.
     *
     * Inicie GssServer primeiro antes de iniciar GssClient.
     *
     * Uso:  java <options> GssServer
     *
     * Exemplo: java -Djava.security.auth.login.config=jaas-krb5.conf \
     *               GssServer
     *
     * Adicione -Djava.security.krb5.conf=krb5.conf para especificar a configuração
     * Kerberos específica da aplicação (diferente da configuração Kerberos
     * do sistema operacional).
     */
    
    public class GssServer  {
        private static final int PORT = 4567;
        private static final boolean verbose = false;
        private static final int LOOP_LIMIT = 1;
        private static int loopCount = 0;
    
        public static void main(String[] args) throws Exception {
    
            GssServerAction action = new GssServerAction(PORT);
    
            Jaas.loginAndAction("server", action);
        }
    
        static class GssServerAction implements Callable<Void> {
            private int localPort;
    
            GssServerAction(int port) {
                this.localPort = port;
            }
    
            public Void call() throws Exception {
    
                ServerSocket ss = new ServerSocket(localPort);
    
                // Get own Kerberos credentials for accepting connection
                GSSManager manager = GSSManager.getInstance();
                Oid krb5Mechanism = new Oid("1.2.840.113554.1.2.2");
                GSSCredential serverCreds = manager.createCredential(null,
                                                 GSSCredential.DEFAULT_LIFETIME,
                                                 krb5Mechanism,
                                                 GSSCredential.ACCEPT_ONLY);
                while (loopCount++ < LOOP_LIMIT) {
    
                    System.out.println("Waiting for incoming connection...");
    
                    Socket socket = ss.accept();
                    DataInputStream inStream =
                        new DataInputStream(socket.getInputStream());
    
                    DataOutputStream outStream =
                        new DataOutputStream(socket.getOutputStream());
    
                    System.out.println("Got connection from client " +
                        socket.getInetAddress());
    
                    /*
                     * Create a GSSContext to receive the incoming request
                     * from the client. Use null for the server credentials
                     * passed in. This tells the underlying mechanism
                     * to use whatever credentials it has available that
                     * can be used to accept this connection.
                     */
    
                    GSSContext context = manager.createContext(
                        (GSSCredential)serverCreds);
    
                    // Do the context establishment loop
    
                    byte[] token = null;
    
                    while (!context.isEstablished()) {
    
                        if (verbose) {
                            System.out.println("Reading ...");
                        }
                        token = new byte[inStream.readInt()];
    
                        if (verbose) {
                            System.out.println("Will read input token of size " +
                                token.length + " for processing by acceptSecContext");
                        }
                        inStream.readFully(token);
    
                        if (token.length == 0) {
                            if (verbose) {
                                System.out.println("skipping zero length token");
                            }
                            continue;
                        }
                        if (verbose) {
                            System.out.println("Token = " + getHexBytes(token));
                            System.out.println("acceptSecContext..");
                        }
                        token = context.acceptSecContext(token, 0, token.length);
    
                        // Send a token to the peer if one was generated by
                        // acceptSecContext
                        if (token != null) {
                            if (verbose) {
                                System.out.println("Will send token of size " +
                                    token.length + " from acceptSecContext.");
                            }
    
                            outStream.writeInt(token.length);
                            outStream.write(token);
                            outStream.flush();
                        }
                    }
    
                    System.out.println("Context Established! ");
                    System.out.println("Client principal is " + context.getSrcName());
                    System.out.println("Server principal is " + context.getTargName());
    
                    /*
                     * If mutual authentication did not take place, then
                     * only the client was authenticated to the
                     * server. Otherwise, both client and server were
                     * authenticated to each other.
                     */
                    if (context.getMutualAuthState())
                        System.out.println("Mutual authentication took place!");
    
                    /*
                     * Create a MessageProp which unwrap will use to return
                     * information such as the Quality-of-Protection that was
                     * applied to the wrapped token, whether or not it was
                     * encrypted, etc. Since the initial MessageProp values
                     * are ignored, just set them to the defaults of 0 and false.
                     */
                    MessageProp prop = new MessageProp(0, false);
    
                    /*
                     * Read the token. This uses the same token byte array
                     * as that used during context establishment.
                     */
                    token = new byte[inStream.readInt()];
                    if (verbose) {
                        System.out.println("Will read token of size " + token.length);
                    }
                    inStream.readFully(token);
    
                    byte[] input = context.unwrap(token, 0, token.length, prop);
                    String str = new String(input, "UTF-8");
    
                    System.out.println("Received data \"" +
                        str + "\" of length " + str.length());
    
                    System.out.println("Confidentiality applied: " +
                        prop.getPrivacy());
    
                    /*
                     * Now generate reply that is the concatenation of the
                     * incoming string with the current time.
                     */
    
                    /*
                     * First reset the QOP of the MessageProp to 0
                     * to ensure the default Quality-of-Protection
                     * is applied.
                     */
                    prop.setQOP(0);
    
                    String now = new Date().toString();
                    byte[] nowBytes = now.getBytes("UTF-8");
                    int len = input.length + 1 + nowBytes.length;
                    byte[] reply = new byte[len];
                    System.arraycopy(input, 0, reply, 0, input.length);
                    reply[input.length] = ' ';
                    System.arraycopy(nowBytes, 0, reply, input.length+1,
                        nowBytes.length);
    
                    System.out.println("Sending: " + new String(reply, "UTF-8"));
                    token = context.wrap(reply, 0, reply.length, prop);
    
                    outStream.writeInt(token.length);
                    outStream.write(token);
                    outStream.flush();
    
                    System.out.println("Closing connection with client " +
                        socket.getInetAddress());
                    context.dispose();
                    socket.close();
                }
                return null;
            }
        }
    
        private static final String getHexBytes(byte[] bytes, int pos, int len) {
    
            StringBuffer sb = new StringBuffer();
            for (int i = pos; i < (pos+len); i++) {
    
                int b1 = (bytes[i]>>4) & 0x0f;
                int b2 = bytes[i] & 0x0f;
    
                sb.append(Integer.toHexString(b1));
                sb.append(Integer.toHexString(b2));
                sb.append(' ');
            }
            return sb.toString();
        }
    
        private static final String getHexBytes(byte[] bytes) {
            return getHexBytes(bytes, 0, bytes.length);
        }
    }
```

GssClient.java
```java
    import org.ietf.jgss.*;
    import java.net.Socket;
    import java.io.IOException;
    import java.io.DataInputStream;
    import java.io.DataOutputStream;
    import java.security.*;
    import javax.security.auth.login.LoginException;
    import java.util.concurrent.Callable;
    
    /**
     * Uma aplicação cliente de exemplo que usa JGSS para realizar autenticação mútua
     * com um servidor usando Kerberos como mecanismo subjacente. Em seguida,
     * troca dados de forma segura com o servidor.
     *
     * Cada mensagem enviada ao servidor inclui um cabeçalho de 4 bytes em nível de aplicação
     * que contém o valor inteiro big-endian para o número
     * de bytes que seguirão como parte do token JGSS.
     *
     * O protocolo é:
     *    1.  Loop de estabelecimento de contexto:
     *         a. cliente envia token init sec context para o servidor
     *         b. servidor envia token accept sec context para o cliente
     *         ....
     *    2. cliente envia um token wrapped para o servidor.
     *    3. servidor envia um token wrapped de volta para o cliente para a aplicação
     *
     * Inicie GssServer primeiro antes de iniciar GssClient.
     *
     * Uso:  java <options> GssClient <service> <serverName>
     *
     * Exemplo: java -Djava.security.auth.login.config=jaas-krb5.conf \
     *               GssClient host machine.imc.org
     *
     * Adicione -Djava.security.krb5.conf=krb5.conf para especificar a configuração
     * Kerberos específica da aplicação (diferente da configuração Kerberos
     * do sistema operacional).
     */
    
    public class GssClient {
        private static final int PORT = 4567;
        private static final boolean verbose = false;
    
        public static void main(String[] args) throws Exception {
    
            // Obtain the command-line arguments and parse the server's principal
    
            if (args.length < 2) {
                System.err.println(
                    "Usage: java <options> GssClient <service> <serverName>");
                System.exit(-1);
            }
    
            String serverPrinc = args[0] + "@" + args[1];
    
            GssClientAction action =
                new GssClientAction(serverPrinc, args[1], PORT);
    
            Jaas.loginAndAction("client", action);
        }
    
        static class GssClientAction implements Callable<Void> {
            private String serverPrinc;
            private String hostName;
            private int port;
    
            GssClientAction(String serverPrinc, String hostName, int port) {
                this.serverPrinc = serverPrinc;
                this.hostName = hostName;
                this.port = port;
            }
    
            public Void call() throws Exception {
                Socket socket = new Socket(hostName, port);
                DataInputStream inStream =
                    new DataInputStream(socket.getInputStream());
                DataOutputStream outStream =
                    new DataOutputStream(socket.getOutputStream());
    
                System.out.println("Connected to address " +
                    socket.getInetAddress());
    
                /*
                 * This Oid is used to represent the Kerberos version 5 GSS-API
                 * mechanism. It is defined in RFC 1964. We will use this Oid
                 * whenever we need to indicate to the GSS-API that it must
                 * use Kerberos for some purpose.
                 */
                Oid krb5Oid = new Oid("1.2.840.113554.1.2.2");
    
                GSSManager manager = GSSManager.getInstance();
    
                /*
                 * Create a GSSName out of the server's name.
                 */
                GSSName serverName = manager.createName(serverPrinc,
                    GSSName.NT_HOSTBASED_SERVICE);
    
                /*
                 * Create a GSSContext for mutual authentication with the
                 * server.
                 *    - serverName is the GSSName that represents the server.
                 *    - krb5Oid is the Oid that represents the mechanism to
                 *      use. The client chooses the mechanism to use.
                 *    - null is passed in for client credentials
                 *    - DEFAULT_LIFETIME lets the mechanism decide how long the
                 *      context can remain valid.
                 * Note: Passing in null for the credentials asks GSS-API to
                 * use the default credentials. This means that the mechanism
                 * will look among the credentials stored in the current Subject
                 * to find the right kind of credentials that it needs.
                 */
                GSSContext context = manager.createContext(serverName,
                    krb5Oid,
                    null,
                    GSSContext.DEFAULT_LIFETIME);
    
                // Set the desired optional features on the context. The client
                // chooses these options.
    
                context.requestMutualAuth(true);  // Mutual authentication
                context.requestConf(true);  // Will use confidentiality later
                context.requestInteg(true); // Will use integrity later
    
                // Do the context eastablishment loop
    
                byte[] token = new byte[0];
    
                while (!context.isEstablished()) {
    
                    // token is ignored on the first call
                    token = context.initSecContext(token, 0, token.length);
    
                    // Send a token to the server if one was generated by
                    // initSecContext
                    if (token != null) {
                        if (verbose) {
                            System.out.println("Will send token of size " +
                                token.length + " from initSecContext.");
                            System.out.println("writing token = " +
                                getHexBytes(token));
                        }
    
                        outStream.writeInt(token.length);
                        outStream.write(token);
                        outStream.flush();
                    }
    
                    // If the client is done with context establishment
                    // then there will be no more tokens to read in this loop
                    if (!context.isEstablished()) {
                        token = new byte[inStream.readInt()];
                        if (verbose) {
                            System.out.println("reading token = " +
                                getHexBytes(token));
                            System.out.println("Will read input token of size " +
                                token.length + " for processing by initSecContext");
                        }
                        inStream.readFully(token);
                    }
                }
    
                System.out.println("Context Established! ");
                System.out.println("Client principal is " + context.getSrcName());
                System.out.println("Server principal is " + context.getTargName());
    
                /*
                 * If mutual authentication did not take place, then only the
                 * client was authenticated to the server. Otherwise, both
                 * client and server were authenticated to each other.
                 */
                if (context.getMutualAuthState())
                    System.out.println("Mutual authentication took place!");
    
                byte[] messageBytes = "Hello There!".getBytes("UTF-8");
    
                /*
                 * The first MessageProp argument is 0 to request
                 * the default Quality-of-Protection.
                 * The second argument is true to request
                 * privacy (encryption of the message).
                 */
                MessageProp prop =  new MessageProp(0, true);
    
                /*
                 * Encrypt the data and send it across. Integrity protection
                 * is always applied, irrespective of confidentiality
                 * (i.e., encryption).
                 * You can use the same token (byte array) as that used when
                 * establishing the context.
                 */
    
                System.out.println("Sending message: " +
                    new String(messageBytes, "UTF-8"));
                token = context.wrap(messageBytes, 0, messageBytes.length, prop);
                outStream.writeInt(token.length);
                outStream.write(token);
                outStream.flush();
    
                /*
                 * Now we will allow the server to decrypt the message,
                 * append a time/date on it, and send then it back.
                 */
    
                token = new byte[inStream.readInt()];
                System.out.println("Will read token of size " + token.length);
                inStream.readFully(token);
                byte[] replyBytes = context.unwrap(token, 0, token.length, prop);
    
                System.out.println("Received message: " +
                    new String(replyBytes, "UTF-8"));
    
                System.out.println("Done.");
                context.dispose();
                socket.close();
    
                return null;
            }
        }
    
        private static final String getHexBytes(byte[] bytes, int pos, int len) {
    
            StringBuffer sb = new StringBuffer();
            for (int i = pos; i < (pos+len); i++) {
    
                int b1 = (bytes[i]>>4) & 0x0f;
                int b2 = bytes[i] & 0x0f;
    
                sb.append(Integer.toHexString(b1));
                sb.append(Integer.toHexString(b2));
                sb.append(' ');
            }
            return sb.toString();
        }
    
        private static final String getHexBytes(byte[] bytes) {
            return getHexBytes(bytes, 0, bytes.length);
        }
    }
```

SaslTestServer.java
```java
    import javax.security.sasl.*;
    import javax.security.auth.callback.*;
    import java.security.*;
    import java.util.HashMap;
    import java.net.*;
    import java.util.Date;
    import java.util.concurrent.Callable;
    
    /**
     * Uma aplicação de servidor de exemplo que usa SASL para autenticar clientes
     * usando Kerberos como mecanismo subjacente. Em seguida,
     * troca dados de forma segura com o cliente.
     *
     * Este programa de exemplo usa um protocolo fictício em nível de aplicação.
     * Cada mensagem trocada entre o cliente e o servidor possui um cabeçalho de 8 bytes
     * que consiste em dois inteiros: o primeiro inteiro representa
     * o comando ou código de status em nível de aplicação, enquanto o segundo inteiro
     * indica o comprimento do buffer SASL. Este cabeçalho é seguido pelo
     * buffer SASL.
     *
     * O protocolo é:
     *    1.  Autenticação
     *         a. cliente envia resposta inicial ao servidor contendo informações
     *            de autenticação
     *         b. servidor aceita e avalia a resposta para gerar um desafio; ele
     *            envia o desafio ao servidor.
     *         c. cliente avalia o desafio para gerar uma resposta; ele envia a
     *            resposta;
     *         d. Os passos b e c são repetidos até que a autenticação seja bem-sucedida ou falhe.
     *    2. cliente envia uma mensagem criptografada para o servidor.
     *    3. servidor descriptografa a mensagem e envia uma criptografada de volta
     *       que contém a mensagem original mais a hora atual.
     *
     * Inicie SaslTestServer primeiro antes de iniciar SaslTestClient.
     *
     * Uso:  java <options> SaslTestServer service serverName
     *
     * Exemplo: java -Djava.security.auth.login.config=jaas-krb5.conf \
     *               SaslTestServer host machine.imc.org
     *
     * Adicione -Djava.security.krb5.conf=krb5.conf para especificar a configuração
     * Kerberos específica da aplicação (diferente da configuração Kerberos
     * do sistema operacional).
     */
    
    
    public class SaslTestServer {
        private static final String MECH = "GSSAPI"; // SASL name for GSS-API/Kerberos
        private static final int PORT = 4568;
        private static final int LOOP_LIMIT = 1;
        private static int loopCount = 0;
    
        public static void main(String[] args) throws Exception {
            // Obtain the command-line arguments and parse the server's principal
    
            if (args.length < 2) {
                System.err.println(
                    "Usage: java <options> SaslTestServer <service> <host>");
                System.exit(-1);
            }
    
            SaslServerAction action =
                new SaslServerAction(args[0], args[1], PORT);
    
            Jaas.loginAndAction("server", action);
        }
    
        static class SaslServerAction implements Callable<Void> {
            private String service;      // used for SASL authentication
            private String serverName;   // named used for SASL authentication
            private int localPort;
            private CallbackHandler cbh = new TestCallbackHandler();
    
            SaslServerAction(String service, String serverName, int port) {
                this.service = service;
                this.serverName = serverName;
                this.localPort = port;
            }
    
            public Void call() throws Exception {
                ServerSocket ss = new ServerSocket(localPort);
    
                HashMap<String,Object> props = new HashMap<String,Object>();
                props.put(Sasl.QOP, "auth-conf,auth-int,auth");
    
                // Loop, accepting requests from any client
                while (loopCount++ < LOOP_LIMIT) {
                    System.out.println("Waiting for incoming connection...");
                    Socket socket = ss.accept();
    
                    // Create application-level connection to handle request
                    AppConnection conn = new AppConnection(socket);
    
                    // Normally, the application protocol will negotiate which
                    // SASL mechanism to use. In this simplified example, we
                    // will always use "GSSAPI", the name of the mechanism that does
                    // Kerberos via GSS-API
    
                    // Create SaslServer to perform authentication
                    SaslServer srv = Sasl.createSaslServer(MECH,
                        service, serverName, props, cbh);
    
                    if (srv == null) {
                        throw new Exception(
                            "Unable to find server implementation for " + MECH);
                    }
    
                    boolean auth = false;
    
                    // Read initial response from client
                    byte[] response = conn.receive(AppConnection.AUTH_CMD);
                    AppConnection.AppReply clientMsg;
    
                    while (!srv.isComplete()) {
                        try {
                            // Generate challenge based on response
                            byte[] challenge = srv.evaluateResponse(response);
    
                            if (srv.isComplete()) {
                                conn.send(AppConnection.SUCCESS, challenge);
                                auth = true;
                            } else {
                                clientMsg = conn.send(AppConnection.AUTH_INPROGRESS,
                                    challenge);
                                response = clientMsg.getBytes();
                            }
                        } catch (SaslException e) {
                            // e.printStackTrace();
                            // Send failure notification to client
                            conn.send(AppConnection.FAILURE, null);
                            break;
                        }
                    }
    
                    // Check status of authentication
                    if (srv.isComplete() && auth) {
```
```java
                        System.out.print("Client authenticated; ");
                        System.out.println("authorized client is: " +
                            srv.getAuthorizationID());
                    } else {
                        // Go get another client
                        System.out.println("Authentication failed. ");
                        continue;
                    }
    
                    String qop = (String) srv.getNegotiatedProperty(Sasl.QOP);
                    System.out.println("Negotiated QOP: " + qop);
    
                    // Now try to use security layer
                    boolean sl = (qop.equals("auth-conf") || qop.equals("auth-int"));
    
                    byte[] msg = conn.receive(AppConnection.DATA_CMD);
                    byte[] realMsg = (sl ? srv.unwrap(msg, 0, msg.length) : msg);
    
                    System.out.println("Received: " + new String(realMsg, "UTF-8"));
    
                    // Construct reply to send to client
                    String now = new Date().toString();
                    byte[] nowBytes = now.getBytes("UTF-8");
                    int len = realMsg.length + 1 + nowBytes.length;
                    byte[] reply = new byte[len];
                    System.arraycopy(realMsg, 0, reply, 0, realMsg.length);
                    reply[realMsg.length] = ' ';
                    System.arraycopy(nowBytes, 0, reply, realMsg.length+1,
                        nowBytes.length);
    
                    System.out.println("Sending: " + new String(reply, "UTF-8"));
    
                    byte[] realReply = (sl ? srv.wrap(reply, 0, reply.length) : reply);
    
                    conn.send(AppConnection.SUCCESS, realReply);
                }
                return null;
            }
        }
    
        static class TestCallbackHandler implements CallbackHandler {
    
            public void handle(Callback[] callbacks)
                throws UnsupportedCallbackException {
    
                AuthorizeCallback acb = null;
    
                for (int i = 0; i < callbacks.length; i++) {
                    if (callbacks[i] instanceof AuthorizeCallback) {
                        acb = (AuthorizeCallback) callbacks[i];
                    } else {
                        throw new UnsupportedCallbackException(callbacks[i]);
                    }
                }
    
                if (acb != null) {
                    String authid = acb.getAuthenticationID();
                    String authzid = acb.getAuthorizationID();
                    if (authid.equals(authzid)) {
                        // Self is always authorized
                        acb.setAuthorized(true);
    
                    } else {
                        // Should check some database for mapping and decide.
                        // Current simplified policy is to reject authzids that
                        // don't match authid
    
                        acb.setAuthorized(false);
                    }
    
                    if (acb.isAuthorized()) {
                        // Set canonicalized name.
                        // Should look up database for canonical names
    
                        acb.setAuthorizedID(authzid);
                    }
                }
            }
        }
    }
```

SaslTestClient.java
```java
    import javax.security.sasl.*;
    import javax.security.auth.callback.*;
    import java.security.*;
    import javax.security.auth.Subject;
    import javax.security.auth.login.*;
    import com.sun.security.auth.callback.*;
    import java.util.HashMap;
    import java.util.concurrent.Callable;
    
    /**
     * Uma aplicação cliente de exemplo que usa SASL para autenticar-se em
     * um servidor usando Kerberos como mecanismo subjacente. Em seguida,
     * troca dados de forma segura com o servidor.
     *
     * Este programa de exemplo usa um protocolo fictício de nível de aplicação.
     * Cada mensagem trocada entre o cliente e o servidor possui um cabeçalho
     * de 8 bytes que consiste em dois inteiros: o primeiro inteiro representa
     * o comando ou código de status de nível de aplicação, enquanto o segundo inteiro
     * indica o comprimento do buffer SASL. Este cabeçalho é seguido pelo
     * buffer SASL.
     *
     * O protocolo é:
     *    1.  Autenticação
     *         a. o cliente envia a resposta inicial ao servidor contendo informações
     *            de autenticação
     *         b. o servidor aceita e avalia a resposta para gerar um desafio; ele
     *            envia o desafio ao servidor.
     *         c. o cliente avalia o desafio para gerar uma resposta; ele envia a
     *            resposta;
     *         d. Os passos b e c são repetidos até que a autenticação seja bem-sucedida ou falhe.
     *    2. o cliente envia uma mensagem criptografada para o servidor.
     *    3. o servidor descriptografa a mensagem e envia uma criptografada de volta
     *       que contém a mensagem original mais a hora atual.
     *
     * Inicie SaslTestServer primeiro antes de iniciar SaslTestClient.
     *
     * Uso:  java <opções> SaslTestClient service serverName
     *
     * Exemplo: java -Djava.security.auth.login.config=jaas-krb5.conf \
     *               SaslTestClient host machine.imc.org
     *
     * Adicione -Djava.security.krb5.conf=krb5.conf para especificar a configuração
     * Kerberos específica da aplicação (diferente da configuração Kerberos
     * do sistema operacional).
     */
    
    public class SaslTestClient {
        private static final String MECH = "GSSAPI"; // SASL name for GSS-API/Kerberos
        private static final int PORT = 4568;
    
        private static final byte[] EMPTY = new byte[0];
    
        public static void main(String[] args) throws Exception {
            // Obtain the command-line arguments and parse the server's principal
    
            if (args.length < 2) {
                System.err.println(
                    "Usage: java <options> SaslTestClient <service> <serverName>");
                System.exit(-1);
            }
    
            SaslClientAction action =
                new SaslClientAction(args[0], args[1], PORT);
    
            Jaas.loginAndAction("client", action);
        }
    
        static class SaslClientAction implements Callable<Void> {
            private String service;      // used for SASL authentication
            private String serverName;   // name used for SASL authentication
            private int port;
            private CallbackHandler cbh = null; // Don't need handler for GSSAPI
    
            SaslClientAction(String service, String serverName, int port) {
                this.service = service;
                this.serverName = serverName;
                this.port = port;
            }
    
            public Void call() throws Exception {
                // Create application-level connection
                AppConnection conn = new AppConnection(serverName, port);
    
                HashMap<String,Object> props = new HashMap<String,Object>();
                // Request confidentiality
                props.put(Sasl.QOP, "auth-conf");
    
                // Create SaslClient to perform authentication
                SaslClient clnt = Sasl.createSaslClient(
                    new String[]{MECH}, null, service, serverName, props, cbh);
    
                if (clnt == null) {
                    throw new Exception(
                        "Unable to find client implementation for " + MECH);
                }
    
                byte[] response;
                byte[] challenge;
    
                // Get initial response for authentication
                response = clnt.hasInitialResponse() ?
                    clnt.evaluateChallenge(EMPTY) : EMPTY;
    
                // Send initial response to server
                AppConnection.AppReply reply =
                    conn.send(AppConnection.AUTH_CMD, response);
    
                // Repeat until authentication terminates
                while (!clnt.isComplete() &&
                    (reply.getStatus() == AppConnection.AUTH_INPROGRESS ||
                     reply.getStatus() == AppConnection.SUCCESS)) {
    
                    // Evaluate challenge to generate response
                    challenge = reply.getBytes();
                    response = clnt.evaluateChallenge(challenge);
    
                    if (reply.getStatus() == AppConnection.SUCCESS) {
                        if (response != null) {
                            throw new Exception("Protocol error interacting with SASL");
                        }
                        break;
                    }
    
                    // Send response to server and read server's next challenge
                    reply = conn.send(AppConnection.AUTH_CMD, response);
                }
    
                // Check status of authentication
                if (clnt.isComplete() && reply.getStatus() == AppConnection.SUCCESS) {
                    System.out.println("Client authenticated.");
                } else {
                    throw new Exception("Authentication failed: " +
                        " connection status? " + reply.getStatus());
                }
    
                String qop = (String) clnt.getNegotiatedProperty(Sasl.QOP);
                System.out.println("Negotiated QOP: " + qop);
    
                // Try out security layer
                boolean sl = (qop.equals("auth-conf") || qop.equals("auth-int"));
    
                byte[] msg = "Hello There!".getBytes("UTF-8");
                System.out.println("Sending: " + new String(msg, "UTF-8"));
    
                byte[] encrypted = (sl ? clnt.wrap(msg, 0, msg.length) : msg);
    
                reply = conn.send(AppConnection.DATA_CMD, encrypted);
    
                if (reply.getStatus() == AppConnection.SUCCESS) {
                    byte[] encryptedReply = reply.getBytes();
    
                    byte[] clearReply = (sl ? clnt.unwrap(encryptedReply,
                        0, encryptedReply.length) : encryptedReply);
    
                    System.out.println("Received: " + new String(clearReply, "UTF-8"));
                } else {
                    System.out.println("Failed exchange: " + reply.getStatus());
                }
    
                conn.close();
    
                return null;
            }
        }
    }
```

krb5.conf
```ini
    # krb5.conf template
    # In order to complete this configuration file
    # you will need to replace the __<name>__ placeholders
    # with appropriate values for your network.
    #
    [libdefaults]
        default_realm = J1LABS.EXAMPLE.COM
        forwardable = true
    
    [realms]
        J1LABS.EXAMPLE.COM = {
            kdc = j1hol-1280
            kdc = j1hol-004
            admin_server = j1hol-1280
        }
    
    [domain_realm]
        .example.com = J1LABS.EXAMPLE.COM
    
    [logging]
        default = FILE:/var/krb5/kdc.log
        kdc = FILE:/var/krb5/kdc.log
        kdc_rotate = {
    
    # How often to rotate kdc.log. Logs will get rotated no more
    # often than the period, and less often if the KDC is not used
    # frequently.
    
            period = 1d
    
    # how many versions of kdc.log to keep around (kdc.log.0, kdc.log.1, ...)
    
            versions = 10
        }
    
    [appdefaults]
        gkadmin = {
            help_url = http://localhost:8888/ab2/coll.384.1/SEAM
        }
        kinit = {
            renewable = true
            forwardable= true
        }
        rlogin = {
            forwardable= true
        }
        rsh = {
            forwardable= true
        }
        telnet = {
            autologin = true
            forwardable= true
        }
```

GssSpNegoClient.java
```java
    import org.ietf.jgss.*;
    import java.net.Socket;
    import java.io.IOException;
    import java.io.DataInputStream;
    import java.io.DataOutputStream;
    import java.security.*;
    import javax.security.auth.login.LoginException;
    import java.util.concurrent.Callable;
    
    /**
     * Uma aplicação cliente de exemplo que usa JGSS para realizar autenticação mútua
     * com um servidor usando Kerberos como mecanismo subjacente. Em seguida,
     * troca dados de forma segura com o servidor.
     *
     * Cada mensagem enviada ao servidor inclui um cabeçalho de 4 bytes de nível de aplicação
     * que contém o valor inteiro big-endian para o número
     * de bytes que seguirão como parte do token JGSS.
     *
     * O protocolo é:
     *    1.  Loop de estabelecimento de contexto:
     *         a. o cliente envia o token de contexto de segurança inicial para o servidor
     *         b. o servidor envia o token de contexto de segurança de aceitação para o cliente
     *         ....
     *    2. o cliente envia um token encapsulado para o servidor.
     *    3. o servidor envia um token encapsulado de volta para o cliente para a aplicação.
     *
     * Inicie GssServer primeiro antes de iniciar GssClient.
     *
     * Uso:  java <opções> GssSpNegoClient <service> <serverName>
     *
     * Exemplo: java -Djava.security.auth.login.config=jaas-krb5.conf \
     *               GssSpNegoClient host machine.imc.org
     *
     * Adicione -Djava.security.krb5.conf=krb5.conf para especificar a configuração
     * Kerberos específica da aplicação (diferente da configuração Kerberos
     * do sistema operacional).
     */
    
    public class GssSpNegoClient {
        private static final int PORT = 4567;
        private static final boolean verbose = false;
    
        public static void main(String[] args) throws Exception {
    
            // Obtain the command-line arguments and parse the server's principal
    
            if (args.length < 2) {
                System.err.println(
                    "Usage: java <options> GssSpNegoClient <service> <serverName>");
                System.exit(-1);
            }
    
            String serverPrinc = args[0] + "@" + args[1];
    
            GssClientAction action =
                new GssClientAction(serverPrinc, args[1], PORT);
    
            Jaas.loginAndAction("client", action);
        }
    
        static class GssClientAction implements Callable<Void> {
            private String serverPrinc;
            private String hostName;
            private int port;
    
            GssClientAction(String serverPrinc, String hostName, int port) {
                this.serverPrinc = serverPrinc;
                this.hostName = hostName;
                this.port = port;
            }
    
            public Void call() throws Exception {
                Socket socket = new Socket(hostName, port);
                DataInputStream inStream =
                    new DataInputStream(socket.getInputStream());
                DataOutputStream outStream =
                    new DataOutputStream(socket.getOutputStream());
    
                System.out.println("Connected to address " +
                    socket.getInetAddress());
    
                /*
                 * Este Oid é usado para representar o mecanismo SPNEGO GSS-API.
                 * Ele é definido na RFC 2478. Usaremos este Oid
                 * sempre que precisarmos indicar à GSS-API que ela deve
                 * usar SPNEGO para algum propósito.
                 */
                Oid spnegoOid = new Oid("1.3.6.1.5.5.2");
    
                GSSManager manager = GSSManager.getInstance();
    
                /*
                 * Cria um GSSName a partir do nome do servidor.
                 */
                GSSName serverName = manager.createName(serverPrinc,
                    GSSName.NT_HOSTBASED_SERVICE, spnegoOid);
    
                /*
                 * Cria um GSSContext para autenticação mútua com o
                 * servidor.
                 *    - serverName é o GSSName que representa o servidor.
                 *    - krb5Oid é o Oid que representa o mecanismo a
                 *      ser usado. O cliente escolhe o mecanismo a ser usado.
                 *    - null é passado para as credenciais do cliente
                 *    - DEFAULT_LIFETIME permite que o mecanismo decida por quanto tempo o
                 *      contexto pode permanecer válido.
                 * Nota: Passar null para as credenciais pede à GSS-API para
                 * usar as credenciais padrão. Isso significa que o mecanismo
                 * procurará entre as credenciais armazenadas no Subject atual
                 * para encontrar o tipo certo de credenciais de que precisa.
                 */
                GSSContext context = manager.createContext(serverName,
                    spnegoOid,
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
    
                    // o token é ignorado na primeira chamada
                    token = context.initSecContext(token, 0, token.length);
    
                    // Envia um token para o servidor se um foi gerado por
                    // initSecContext
                    if (token != null) {
                        if (verbose) {
                            System.out.println("Will send token of size " +
                                token.length + " from initSecContext.");
                            System.out.println("writing token = " +
                                getHexBytes(token));
                        }
    
                        outStream.writeInt(token.length);
                        outStream.write(token);
                        outStream.flush();
                    }
    
                    // Se o cliente terminou o estabelecimento do contexto
                    // então não haverá mais tokens para ler neste loop
                    if (!context.isEstablished()) {
                        token = new byte[inStream.readInt()];
                        if (verbose) {
                            System.out.println("reading token = " +
                                getHexBytes(token));
                            System.out.println("Will read input token of size " +
                                token.length + " for processing by initSecContext");
                        }
                        inStream.readFully(token);
                    }
                }
    
                System.out.println("Context Established! ");
                System.out.println("Client principal is " + context.getSrcName());
                System.out.println("Server principal is " + context.getTargName());
    
                /*
                 * Se a autenticação mútua não ocorreu, então apenas o
                 * cliente foi autenticado no servidor. Caso contrário, ambos
                 * cliente e servidor foram autenticados um no outro.
                 */
                if (context.getMutualAuthState())
                    System.out.println("Mutual authentication took place!");
    
                byte[] messageBytes = "Hello There!".getBytes("UTF-8");
    
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
                 * Você pode usar o mesmo token (array de bytes) que foi usado ao
                 * estabelecer o contexto.
                 */
    
                System.out.println("Sending message: " +
                    new String(messageBytes, "UTF-8"));
                token = context.wrap(messageBytes, 0, messageBytes.length, prop);
                outStream.writeInt(token.length);
                outStream.write(token);
                outStream.flush();
    
                /*
                 * Agora permitiremos que o servidor descriptografe a mensagem,
                 * anexe uma hora/data a ela e a envie de volta.
                 */
    
                token = new byte[inStream.readInt()];
                System.out.println("Will read token of size " + token.length);
                inStream.readFully(token);
                byte[] replyBytes = context.unwrap(token, 0, token.length, prop);
    
                System.out.println("Received message: " +
                    new String(replyBytes, "UTF-8"));
    
                System.out.println("Done.");
                context.dispose();
                socket.close();
    
                return null;
            }
        }
    
        private static final String getHexBytes(byte[] bytes, int pos, int len) {
    
            StringBuffer sb = new StringBuffer();
            for (int i = pos; i < (pos+len); i++) {
    
                int b1 = (bytes[i]>>4) & 0x0f;
                int b2 = bytes[i] & 0x0f;
    
                sb.append(Integer.toHexString(b1));
                sb.append(Integer.toHexString(b2));
                sb.append(' ');
            }
            return sb.toString();
        }
    
        private static final String getHexBytes(byte[] bytes) {
            return getHexBytes(bytes, 0, bytes.length);
        }
    }
```

GssSpNegoServer.java
```java
    import org.ietf.jgss.*;
    import java.io.*;
    import java.net.Socket;
    import java.net.ServerSocket;
    import java.security.*;
    import java.util.Date;
    import java.util.concurrent.Callable;
    
    /**
     * Uma aplicação de servidor de exemplo que usa JGSS para realizar autenticação mútua
     * com um cliente usando Kerberos como mecanismo subjacente. Em seguida,
     * troca dados de forma segura com o cliente.
     *
     * Cada mensagem trocada com o cliente inclui um cabeçalho de 4 bytes de nível
     * de aplicação que contém o valor inteiro big-endian para o número
     * de bytes que seguirão como parte do token JGSS.
     *
     * O protocolo é:
     *    1.  Loop de estabelecimento de contexto:
     *         a. o cliente envia o token de contexto de segurança inicial para o servidor
     *         b. o servidor envia o token de contexto de segurança de aceitação para o cliente
     *         ....
     *    2. o cliente envia um token encapsulado para o servidor.
     *    3. o servidor envia um token encapsulado de volta para o cliente.
     *
     * Inicie GssSpNegoServer primeiro antes de iniciar GssClient.
     *
     * Uso:  java <opções> GssSpNegoServer
     *
     * Exemplo: java -Djava.security.auth.login.config=jaas-krb5.conf \
     *               GssSpNegoServer
     *
     * Adicione -Djava.security.krb5.conf=krb5.conf para especificar a configuração
     * Kerberos específica da aplicação (diferente da configuração Kerberos
     * do sistema operacional).
     */
    
    public class GssSpNegoServer  {
        private static final int PORT = 4567;
        private static final boolean verbose = false;
        private static final int LOOP_LIMIT = 1;
        private static int loopCount = 0;
    
        public static void main(String[] args) throws Exception {
    
            GssServerAction action = new GssServerAction(PORT);
    
            Jaas.loginAndAction("server", action);
        }
    
        static class GssServerAction implements Callable<Void> {
            private int localPort;
    
            GssServerAction(int port) {
                this.localPort = port;
            }
    
            public Void call() throws Exception {
    
                ServerSocket ss = new ServerSocket(localPort);
    
                // Obtém as próprias credenciais Kerberos para aceitar a conexão
                GSSManager manager = GSSManager.getInstance();
                Oid spnegoOid = new Oid("1.3.6.1.5.5.2");
                GSSCredential serverCreds = manager.createCredential(null,
                                                 GSSCredential.DEFAULT_LIFETIME,
                                                 spnegoOid,
                                                 GSSCredential.ACCEPT_ONLY);
                while (loopCount++ < LOOP_LIMIT) {
    
                    System.out.println("Waiting for incoming connection...");
    
                    Socket socket = ss.accept();
                    DataInputStream inStream =
                        new DataInputStream(socket.getInputStream());
    
                    DataOutputStream outStream =
                        new DataOutputStream(socket.getOutputStream());
    
                    System.out.println("Got connection from client " +
                        socket.getInetAddress());
    
                    /*
                     * Cria um GSSContext para receber a requisição de entrada
                     * do cliente. Use null para as credenciais do servidor
                     * passadas. Isso informa ao mecanismo subjacente
                     * para usar quaisquer credenciais disponíveis que
                     * possam ser usadas para aceitar esta conexão.
                     */
    
                    GSSContext context = manager.createContext(
                        (GSSCredential)serverCreds);
    
                    // Executa o loop de estabelecimento de contexto
    
                    byte[] token = null;
    
                    while (!context.isEstablished()) {
    
                        if (verbose) {
                            System.out.println("Reading ...");
                        }
                        token = new byte[inStream.readInt()];
    
                        if (verbose) {
                            System.out.println("Will read input token of size " +
                                token.length + " for processing by acceptSecContext");
                        }
                        inStream.readFully(token);
    
                        if (token.length == 0) {
                            if (verbose) {
                                System.out.println("skipping zero length token");
                            }
                            continue;
                        }
                        if (verbose) {
                            System.out.println("Token = " + getHexBytes(token));
                            System.out.println("acceptSecContext..");
                        }
                        token = context.acceptSecContext(token, 0, token.length);
    
                        // Envia um token para o par se um foi gerado por
                        // acceptSecContext
                        if (token != null) {
                            if (verbose) {
                                System.out.println("Will send token of size " +
                                    token.length + " from acceptSecContext.");
                            }
    
                            outStream.writeInt(token.length);
                            outStream.write(token);
                            outStream.flush();
                        }
                    }
    
                    System.out.println("Context Established! ");
                    System.out.println("Client principal is " + context.getSrcName());
                    System.out.println("Server principal is " + context.getTargName());
    
                    /*
                     * Se a autenticação mútua não ocorreu, então
                     * apenas o cliente foi autenticado no
                     * servidor. Caso contrário, ambos cliente e servidor foram
                     * autenticados um no outro.
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
                     * Lê o token. Isso usa o mesmo array de bytes do token
                     * que foi usado durante o estabelecimento do contexto.
                     */
                    token = new byte[inStream.readInt()];
                    if (verbose) {
                        System.out.println("Will read token of size " + token.length);
                    }
                    inStream.readFully(token);
    
                    byte[] input = context.unwrap(token, 0, token.length, prop);
                    String str = new String(input, "UTF-8");
    
                    System.out.println("Received data \"" +
                        str + "\" of length " + str.length());
    
                    System.out.println("Confidentiality applied: " +
                        prop.getPrivacy());
    
                    /*
                     * Agora gera uma resposta que é a concatenação da
                     * string de entrada com a hora atual.
                     */
    
                    /*
                     * Primeiro, redefine o QOP do MessageProp para 0
                     * para garantir que a Qualidade de Proteção padrão
                     * seja aplicada.
                     */
                    prop.setQOP(0);
    
                    String now = new Date().toString();
                    byte[] nowBytes = now.getBytes("UTF-8");
                    int len = input.length + 1 + nowBytes.length;
                    byte[] reply = new byte[len];
                    System.arraycopy(input, 0, reply, 0, input.length);
                    reply[input.length] = ' ';
                    System.arraycopy(nowBytes, 0, reply, input.length+1,
                        nowBytes.length);
    
                    System.out.println("Sending: " + new String(reply, "UTF-8"));
                    token = context.wrap(reply, 0, reply.length, prop);
    
                    outStream.writeInt(token.length);
                    outStream.write(token);
                    outStream.flush();
    
                    System.out.println("Closing connection with client " +
                        socket.getInetAddress());
                    context.dispose();
                    socket.close();
                }
                return null;
            }
        }
    
        private static final String getHexBytes(byte[] bytes, int pos, int len) {
    
            StringBuffer sb = new StringBuffer();
            for (int i = pos; i < (pos+len); i++) {
    
                int b1 = (bytes[i]>>4) & 0x0f;
                int b2 = bytes[i] & 0x0f;
    
                sb.append(Integer.toHexString(b1));
                sb.append(Integer.toHexString(b2));
                sb.append(' ');
            }
            return sb.toString();
        }
    
        private static final String getHexBytes(byte[] bytes) {
            return getHexBytes(bytes, 0, bytes.length);
        }
    }
```