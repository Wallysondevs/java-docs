# Autenticação JAAS

## Autenticação JAAS

Este tutorial básico demonstra como o JAAS pode ser usado para a autenticação de usuários: para determinar de forma confiável e segura quem está executando código Java.

A autenticação JAAS é realizada de forma plugável. Isso permite que as aplicações Java permaneçam independentes das tecnologias de autenticação subjacentes. Novas ou atualizadas tecnologias podem ser plugadas sem exigir modificações na própria aplicação. Uma implementação para uma tecnologia de autenticação específica a ser usada é determinada em tempo de execução. A implementação é especificada em um arquivo de configuração de login. A tecnologia de autenticação usada para este tutorial é Kerberos. (Veja [Requisitos do Kerberos](<#/doc/guides/security/kerberos-requirements>).)

O restante deste tutorial consiste nas seguintes seções:

  1. [O Código do Tutorial de Autenticação](<#/doc/guides/security/jaas-authentication>)
  2. [A Configuração de Login](<#/doc/guides/security/jaas-authentication>)
  3. [Executando o Código](<#/doc/guides/security/jaas-authentication>)

Se você quiser ver o código do tutorial em ação primeiro, pode pular diretamente para [Executando o Código](<#/doc/guides/security/jaas-authentication>) e depois voltar para as outras seções para aprender sobre os detalhes de codificação e do arquivo de configuração.

### O Código do Tutorial de Autenticação

Nosso código do tutorial de autenticação está contido em um único arquivo fonte, [`JaasAcn.java`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>). O método `main` deste arquivo realiza a autenticação e então informa se a autenticação foi bem-sucedida ou não.

O código para autenticar o usuário é muito simples, consistindo em apenas dois passos:

  1. [Instanciando um LoginContext](<#/doc/guides/security/jaas-authentication>)
  2. [Chamando o Método login do LoginContext](<#/doc/guides/security/jaas-authentication>)

#### Instanciando um LoginContext

Para autenticar um usuário, você primeiro precisa de um `javax.security.auth.login.LoginContext`. Aqui está a maneira básica de instanciar um LoginContext:
```
    import javax.security.auth.login.*;
    . . .
    LoginContext lc = 
        new LoginContext(<config file entry name>,
               <CallbackHandler to be used for user interaction>); 
    
```

e aqui está a maneira específica como o código do nosso tutorial faz a instanciação:
```
    import javax.security.auth.login.*;
    import com.sun.security.auth.callback.TextCallbackHandler;
    . . .
    LoginContext lc = 
        new LoginContext("JaasSample", 
              new TextCallbackHandler());
    
```

Os argumentos são os seguintes:

  1. O nome de uma entrada no arquivo de configuração de login JAAS

Este é o nome que o LoginContext usará para procurar uma entrada para esta aplicação no arquivo de configuração de login JAAS, descrito em [A Configuração de Login](<#/doc/guides/security/jaas-authentication>). Tal entrada especifica a(s) classe(s) que implementam a(s) tecnologia(s) de autenticação subjacente(s) desejada(s). A(s) classe(s) devem implementar a interface LoginModule, que está no pacote `javax.security.auth.spi`.

Em nosso código de exemplo, usamos o `Krb5LoginModule` no pacote `com.sun.security.auth.module`, que realiza a autenticação Kerberos.

A entrada no arquivo de configuração de login que usamos para este tutorial (veja [`jaas.conf`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>)) tem o nome "JaasSample", então esse é o nome que especificamos como o primeiro argumento para o construtor do LoginContext.

  2. Uma instância de CallbackHandler.

Quando um LoginModule precisa se comunicar com o usuário, por exemplo para pedir um nome de usuário e senha, ele não o faz diretamente. Isso ocorre porque existem várias maneiras de se comunicar com um usuário, e é desejável que os LoginModules permaneçam independentes dos diferentes tipos de interação do usuário. Em vez disso, o LoginModule invoca um CallbackHandler para realizar a interação com o usuário e obter as informações solicitadas, como o nome de usuário e a senha. (CallbackHandler é uma interface no pacote `javax.security.auth.callback`.)

Uma instância do CallbackHandler particular a ser usado é especificada como o segundo argumento para o construtor do LoginContext. O LoginContext encaminha essa instância para o LoginModule subjacente (em nosso caso, Krb5LoginModule). Uma aplicação tipicamente fornece sua própria implementação de CallbackHandler. Um CallbackHandler simples, TextCallbackHandler, é fornecido no pacote `com.sun.security.auth.callback` para exibir informações e ler entradas da linha de comando.

#### Chamando o Método login do LoginContext

Uma vez que temos um LoginContext `lc`, podemos chamar seu método `login` para realizar o processo de autenticação:
```
    lc.login();
    
```

O LoginContext instancia um novo objeto [`javax.security.auth.Subject`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/Subject.html>) vazio (que representa o usuário ou serviço sendo autenticado; veja [Subject](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)). O LoginContext constrói o LoginModule configurado (em nosso caso, Krb5LoginModule) e o inicializa com este novo Subject e TextCallbackHandler.

O método `login` do LoginContext então chama métodos no Krb5LoginModule para realizar o login e a autenticação. O Krb5LoginModule utilizará o TextCallbackHandler para obter o nome de usuário e a senha. Em seguida, o Krb5LoginModule usará essas informações para obter as credenciais do usuário do KDC Kerberos. Veja a [documentação de referência do Kerberos](<http://web.MIT.edu/kerberos/www/index.html>).

Se a autenticação for bem-sucedida, o Krb5LoginModule preenche o Subject com (1) um Principal Kerberos representando o usuário e (2) as credenciais do usuário (TGT).

A aplicação chamadora pode subsequentemente recuperar o Subject autenticado chamando o método `getSubject` do LoginContext, embora isso não seja necessário para este tutorial.

### A Configuração de Login

A autenticação JAAS é realizada de forma plugável, para que as aplicações possam permanecer independentes das tecnologias de autenticação subjacentes. Um administrador de sistema determina as tecnologias de autenticação, ou LoginModules, a serem usadas para cada aplicação e as configura em uma Configuration de login. A fonte das informações de configuração (por exemplo, um arquivo ou um banco de dados) depende da implementação atual de [javax.security.auth.login.Configuration](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/login/Configuration.html>). A implementação padrão de `Configuration` da Oracle lê informações de configuração de arquivos de configuração, conforme descrito em [com.sun.security.auth.login.ConfigFile](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.auth/com/sun/security/auth/login/ConfigFile.html>).

Veja [Apêndice B: Arquivo de Configuração de Login JAAS](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>) para obter informações sobre o que é um arquivo de configuração de login, o que ele contém e como especificar qual arquivo de configuração de login deve ser usado.

#### O Arquivo de Configuração de Login para Este Tutorial

Como observado, o arquivo de configuração de login que usamos para este tutorial, [jass.conf](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>), contém apenas uma entrada, que é
```
    JaasSample {
      com.sun.security.auth.module.Krb5LoginModule required;
    };
```

Esta entrada é nomeada `JaasSample` e esse é o nome que nossa aplicação tutorial, `JaasAcn`, usa para se referir a esta entrada. A entrada especifica que o LoginModule a ser usado para fazer a autenticação do usuário é o Krb5LoginModule no pacote `com.sun.security.auth.module` e que este Krb5LoginModule é `required` (obrigatório) para "ter sucesso" para que a autenticação seja considerada bem-sucedida. O Krb5LoginModule só tem sucesso se o nome e a senha fornecidos pelo usuário forem usados com sucesso para logar o usuário no KDC Kerberos.

Veja a documentação da API JavaDoc do [Krb5LoginModule](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.auth/com/sun/security/auth/module/Krb5LoginModule.html>) para obter informações sobre todas as opções possíveis que podem ser passadas para o Krb5LoginModule.

### Executando o Código

Para executar o código do nosso tutorial de autenticação JAAS, tudo o que você precisa fazer é

  1. Colocar o arquivo fonte da aplicação [`JaasAcn.java`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>) e o arquivo de configuração de login [`jaas.conf`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>) em um diretório.
  2. Compilar `JaasAcn.java`:
`javac JaasAcn.java
         
```

  3. Execute a aplicação `JaasAcn`, especificando
     * por `-Djava.security.krb5.realm=<your_realm>` que seu realm Kerberos é o especificado.

Por exemplo, se seu realm for `KRBNT-OPERATIONS.EXAMPLE.COM`, você colocaria `-Djava.security.krb5.realm=KRBNT-OPERATIONS.EXAMPLE.COM`.

     * por `-Djava.security.krb5.kdc=<your_kdc>` que seu KDC Kerberos é o especificado.

Por exemplo, se seu KDC for `samplekdc.example.com`, você colocaria `-Djava.security.krb5.kdc=samplekdc.example.com`.

     * por `-Djava.security.auth.login.config=jaas.conf` que o arquivo de configuração de login a ser usado é `jaas.conf`.

O comando completo é o seguinte:

Nota:

Certifique-se de substituir `<your_realm>` pelo seu realm Kerberos e `<your_kdc>` pelo seu KDC Kerberos.
```
    java -Djava.security.krb5.realm=<your_realm> 
     -Djava.security.krb5.kdc=<your_kdc> 
     -Djava.security.auth.login.config=jaas.conf JaasAcn
    
```

Digite tudo isso em uma única linha. Múltiplas linhas são usadas aqui para legibilidade.

Você será solicitado a informar seu nome de usuário e senha Kerberos, e o mecanismo de autenticação Kerberos subjacente especificado no arquivo de configuração de login fará seu login no Kerberos. Se seu login for bem-sucedido, você verá a seguinte mensagem:
```
    Authentication succeeded!
    
```

Se o login não for bem-sucedido (por exemplo, se você digitar sua senha incorretamente), você verá
```
    Authentication failed:
    
```

seguido por um motivo para a falha. Por exemplo, se você digitar seu nome de usuário incorretamente, poderá ver uma mensagem como a seguinte (onde a formatação foi ligeiramente modificada aqui para aumentar a legibilidade):
```
    Authentication failed:
      Kerberos Authentication Failed:
        javax.security.auth.login.LoginException: 
          KrbException: Client not found in Kerberos database
    
```

Para sugestões de solução de problemas de login, veja Solução de Problemas de Login.

Após corrigir quaisquer problemas, execute o programa novamente para tentar de novo.