# Parte VI: Autenticação HTTP/SPNEGO

## Parte VI: Autenticação HTTP/SPNEGO

### Exercício 8: Usando Autenticação HTTP/SPNEGO

#### O que é HTTP SPNEGO

HTTP SPNEGO suporta o esquema de autenticação Negotiate em uma comunicação HTTP. SPNEGO suporta os seguintes tipos de autenticação:

Autenticação Web

O Servidor Web responde com
```
    HTTP/1.1 401 Unauthorized
    WWW-Authenticate: Negotiate
```

o cliente precisará enviar um cabeçalho como
```
    Authorization: Negotiate YY.....
```

para se autenticar no servidor

Autenticação de Proxy

O Servidor Web responde com
```
    HTTP/1.1 407 Proxy Authentication Required
    Proxy-Authenticate: Negotiate
```

o cliente precisará enviar um cabeçalho como
```
    Proxy-Authorization: Negotiate YY.....
```

para se autenticar no servidor proxy.

Este recurso suporta ambos os tipos de autenticação.

#### Como usar a Autenticação HTTP/SPNEGO

Não há nenhuma nova função de API pública envolvida no novo recurso, mas várias configurações são necessárias para realizar uma comunicação bem-sucedida:

Configuração do Kerberos 5

Como o mecanismo SPNEGO chamará o JGSS, que por sua vez chama o módulo de login do Kerberos V5 para realizar o trabalho real. As configurações do Kerberos 5 são necessárias. Isso inclui o seguinte:

  * Alguma forma de fornecer configurações do Kerberos. Isso pode ser alcançado com a propriedade de sistema Java `java.security.krb5.conf`. Por exemplo:
```java -Djava.security.krb5.conf=krb5.conf \
             -Djavax.security.auth.useSubjectCredsOnly=false \
             ClassName
```

Um arquivo de configuração JAAS indicando qual módulo de login usar. Os códigos HTTP SPNEGO procurarão pela entrada padrão chamada `com.sun.security.jgss.krb5.initiate`.

Por exemplo, você pode fornecer um arquivo `spnegoLogin.conf`:
```com.sun.security.jgss.krb5.initiate {
            com.sun.security.auth.module.Krb5LoginModule
                required useTicketCache=true;
        };
```

e executar o Java com:
```java -Djava.security.krb5.conf=krb5.conf \
             -Djava.security.auth.login.config=spnegoLogin.conf \
             -Djavax.security.auth.useSubjectCredsOnly=false \
             ClassName
```

Recuperação de Nome de Usuário e Senha

Assim como qualquer outro esquema de autenticação HTTP, o cliente pode fornecer um `java.net.Authenticator` customizado para alimentar o nome de usuário e a senha ao módulo HTTP SPNEGO, se forem necessários (ou seja, não há cache de credenciais disponível). A única informação de autenticação que precisa ser verificada no seu `Authenticator` é o esquema, que pode ser recuperado com `getRequestingScheme()`. O valor deve ser "Negotiate".

Isso significa que sua implementação de `Authenticator` será parecida com:
```
    class MyAuthenticator extends Authenticator {
    
            public PasswordAuthentication getPasswordAuthentication () {
                if (getRequestingScheme().equalsIgnoreCase("negotiate")) {
                    String krb5user;
                    char[] krb5pass;
                    // get krb5user and krb5pass in your own way
                    ....
                    return (new PasswordAuthentication (krb5user,
                                krb5pass));
                } else {
                    ....
                }
            }
        }
```

Nota:

De acordo com a especificação de `java.net.Authenticator`, ele é projetado para obter o nome de usuário e a senha ao mesmo tempo, portanto, não especifique `principal=xxx` no arquivo de configuração JAAS.

Preferência de Esquema

O cliente ainda pode fornecer a propriedade de sistema `http.auth.preference` para indicar que um determinado esquema deve ser sempre usado, desde que o servidor o solicite. Você pode usar "SPNEGO" ou "Kerberos" para esta propriedade de sistema. "SPNEGO" significa que você prefere responder ao esquema Negotiate usando o mecanismo GSS/SPNEGO; "Kerberos" significa que você prefere responder ao esquema Negotiate usando o mecanismo GSS/Kerberos. Normalmente, ao autenticar-se contra um produto Microsoft, você pode usar "SPNEGO". O valor "Kerberos" também funciona para servidores Microsoft. É necessário apenas quando você encontra um servidor que conhece Negotiate, mas não conhece SPNEGO.

Se `http.auth.preference` não for definido, a ordem interna escolhida é:

  * GSS/SPNEGO -> Digest -> NTLM -> Basic

Observe que Kerberos não aparece nesta lista, pois sempre que Negotiate é suportado, GSS/SPNEGO é sempre escolhido.

Fallback

Se o servidor forneceu mais de um esquema de autenticação (incluindo Negotiate), de acordo com a ordem de processamento mencionada na última seção, o Java tentará desafiar o esquema Negotiate. No entanto, se o protocolo não puder ser estabelecido com sucesso (por exemplo, a configuração do Kerberos não está correta, ou o hostname do servidor não está registrado no DB de principal do KDC, ou o nome de usuário e a senha fornecidos pelo Authenticator estão errados), então o segundo esquema mais forte será usado automaticamente.

Nota:

Se `http.auth.preference` for definido como SPNEGO ou Kerberos, então o SPNEGO assume que você só deseja tentar o esquema Negotiate, mesmo que ele falhe. O SPNEGO não fará fallback para nenhum outro esquema e seu programa lançará uma `IOException` informando que recebeu um erro 401 ou 407 da resposta HTTP.

#### Exemplo de Autenticação HTTP/SPNEGO

Suponha que você tenha um Servidor IIS rodando em um Windows Server dentro de um Active Directory. Uma página web neste servidor está configurada para ser protegida por Autenticação Integrada do Windows. Isso significa que o servidor solicitará autenticação Negotiate e NTLM.

Você precisa preparar estes arquivos para obter o arquivo protegido:

RunHttpSpnego.java
```java
    import java.io.BufferedReader;
    import java.io.InputStream;
    import java.io.InputStreamReader;
    import java.net.Authenticator;
    import java.net.PasswordAuthentication;
    import java.net.URL;
    
    public class RunHttpSpnego {
    
        static final String kuser = "username"; // your account name
        static final String kpass = "password"; // your password for the account
    
        static class MyAuthenticator extends Authenticator {
            public PasswordAuthentication getPasswordAuthentication() {
                // I haven't checked getRequestingScheme() here, since for NTLM
                // and Negotiate, the usrname and password are all the same.
                System.err.println("Feeding username and password for " + getRequestingScheme());
                return (new PasswordAuthentication(kuser, kpass.toCharArray()));
            }
        }
    
        public static void main(String[] args) throws Exception {
            Authenticator.setDefault(new MyAuthenticator());
            URL url = new URL(args[0]);
            InputStream ins = url.openConnection().getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(ins));
            String str;
            while((str = reader.readLine()) != null)
                System.out.println(str);
        }
    }
```

krb.conf
```
    [libdefaults]
        default_realm = AD.LOCAL
    [realms]
        AD.LOCAL = {
            kdc = kdc.ad.local
        }
```

login.conf
```
    com.sun.security.jgss.krb5.initiate {
      com.sun.security.auth.module.Krb5LoginModule required  doNotPrompt=false useTicketCache=true;
    };
```

Compilando e Executando o Exemplo

  1. Compile `RunHttpSpnego.java`.

  2. Execute `RunHttpSpnego.java`:
```java -Djava.security.krb5.conf=krb5.conf \
             -Djava.security.auth.login.config=login.conf \
             -Djavax.security.auth.useSubjectCredsOnly=false \
             RunHttpSpnego \
             http://www.ad.local/hello/hello.html
```

Você verá o seguinte:
```Feeding username and password for Negotiate
         <h1>Hello, You got me!</h1>
```

Na verdade, se você estiver rodando em um computador Windows como um usuário de domínio, ou se estiver rodando em um computador Linux que já emitiu o comando `kinit` e obteve o cache de credenciais, então a classe `MyAuthenticator` será completamente ignorada, e a saída será simplesmente:
```<h1>Hello, You got me!</h1>
```

o que mostra que o nome de usuário e a senha não são consultados. Este é o chamado Single Sign-On.

Além disso, você pode simplesmente executar
```java RunHttpSpnego http://www.ad.local/hello/hello.html
```

para ver como o fallback é feito, caso em que você verá
```Feeding username and password for ntlm
         <h1>Hello, You got me!</h1>
```