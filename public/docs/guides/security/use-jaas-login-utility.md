# Uso do Utilitário de Login JAAS

## Uso do Utilitário de Login JAAS

O tutorial [Autenticação JAAS](<#/doc/guides/security/jaas-authentication>) mostra como você pode usar as classes LoginContext e Subject para escrever um programa para autenticar usuários e verificar sua identidade.

Este tutorial descreve um utilitário Login que executa essas operações e, em seguida, executa qualquer aplicação especificada como o usuário autenticado.

O uso do utilitário Login com uma aplicação de exemplo é demonstrado neste tutorial. O próximo tutorial, [Uso do Utilitário de Login JAAS e Java GSS-API para Trocas Seguras de Mensagens](<#/doc/guides/security/use-jaas-login-utility-and-java-gss-api-secure-message-exchanges>), uma aplicação cliente/servidor usando a Java GSS-API, também usa o utilitário Login.

Não é necessário ler o tutorial anterior sobre autenticação JAAS antes de ler este. No entanto, você deve ler o [Apêndice B: Arquivo de Configuração de Login JAAS](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>) para obter informações sobre o que é um arquivo de configuração de login, já que um é necessário para este e todos os outros tutoriais desta série.

Assim como em todos os tutoriais desta série, a tecnologia subjacente usada para suportar a autenticação é Kerberos. Consulte [Requisitos do Kerberos](<#/doc/guides/security/kerberos-requirements>).

  * [O Que Você Precisa Saber Sobre o Utilitário de Login](<#/doc/guides/security/use-jaas-login-utility>)
  * [Requisitos da Aplicação e Outros Arquivos](<#/doc/guides/security/use-jaas-login-utility>)
  * [O Programa de Aplicação de Exemplo](<#/doc/guides/security/use-jaas-login-utility>)
  * [O Arquivo de Configuração de Login](<#/doc/guides/security/use-jaas-login-utility>)
  * [Executando o Programa de Exemplo com o Utilitário de Login](<#/doc/guides/security/use-jaas-login-utility>)

Se você quiser ver o código do tutorial em ação primeiro, pode pular diretamente para [Executando o Programa de Exemplo com o Utilitário de Login](<#/doc/guides/security/use-jaas-login-utility>) e depois voltar para as outras seções para aprender mais.

### O Que Você Precisa Saber Sobre o Utilitário de Login

Você não precisa entender o código contido em [`Login.java`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>); você pode simplesmente usá-lo como está. No entanto, você precisa entender alguns fatos sobre o que ele faz para que seu programa e arquivo de configuração de login funcionem corretamente com ele. A seguir, um resumo desses fatos, seguido por seções com mais informações e exemplos.

A classe `Login` faz o seguinte:

  * Assume que lhe é passado, como argumentos, o nome da classe de nível superior da sua aplicação, seguido por quaisquer argumentos que sua aplicação possa exigir.
  * Assume que o nome da classe da sua aplicação de nível superior também é usado como o nome da entrada a ser pesquisada no seu arquivo de configuração de login.
  * Especifica a classe TextCallbackHandler (do pacote `com.sun.security.auth.callback`) como a classe a ser usada ao se comunicar com o usuário. Esta classe pode solicitar ao usuário um nome de usuário e senha.
  * Usa um LoginContext para autenticar o usuário. O LoginContext invoca a tecnologia de autenticação apropriada, ou LoginModule, para realizar a autenticação. LoginModules usam um CallbackHandler (em nosso caso, TextCallbackHandler) conforme necessário para se comunicar com o usuário.
  * Permite ao usuário três tentativas para fazer login com sucesso.
  * Cria uma instância da classe `MyAction` (também em `Login.java`), passando-lhe os argumentos da aplicação, se houver.
  * Invoca `Subject.callAs`, passando-lhe um Subject representando o usuário e a instância `MyAction`. O resultado é que o método `public static main` da sua aplicação é invocado e o código da sua aplicação é considerado executado em nome do usuário.

### Requisitos da Aplicação e Outros Arquivos

Para utilizar o utilitário Login para autenticar o usuário e executar sua aplicação, você pode precisar de um pequeno número de adições ou modificações ao seu arquivo de configuração de login, conforme descrito em [Requisitos do Arquivo de Configuração de Login](<#/doc/guides/security/use-jaas-login-utility>).

#### Requisitos da Aplicação

Para utilizar o utilitário Login, o código da sua aplicação não precisa de nada especial. Tudo o que você precisa é que o ponto de entrada da sua aplicação seja o método `main` de uma classe que você escreve, como de costume.

A forma de invocar Login para que ele autentique o usuário e, em seguida, instancie `MyAction` para invocar sua aplicação é a seguinte:
```
    java <options> Login <AppName> <app arguments> 
    
```

onde `<AppName>` é o nome da classe de nível superior da sua aplicação e `<app arguments>` são quaisquer argumentos exigidos pela sua aplicação. Consulte [Executando o Programa de Exemplo com o Utilitário de Login](<#/doc/guides/security/use-jaas-login-utility>) para o comando completo usado neste tutorial.

#### Requisitos do Arquivo de Configuração de Login

Sempre que um LoginContext é usado para autenticar o usuário, você precisa de um arquivo de configuração de login para especificar o módulo de login desejado. Consulte a seção [A Configuração de Login](<#/doc/guides/security/jaas-authentication>) no tutorial de autenticação JAAS para mais informações sobre o que é um arquivo de configuração de login e o que ele contém.

Ao usar o utilitário Login, o nome da entrada do arquivo de configuração de login deve ser exatamente o mesmo que o nome da classe de nível superior da sua aplicação. Consulte [O Arquivo de Configuração de Login](<#/doc/guides/security/use-jaas-login-utility>) neste tutorial para um exemplo.

### O Programa de Aplicação de Exemplo

A aplicação [`Sample.java`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>) faz o seguinte:

  * Lê e imprime o valor da propriedade de sistema `java.home`,
  * Lê e imprime o valor da propriedade de sistema `user.home`, e
  * Determina se um arquivo chamado `foo.txt` existe ou não no diretório atual.

### O Arquivo de Configuração de Login

O arquivo de configuração de login [`sample.conf`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>) para este tutorial contém uma única entrada, assim como o arquivo de configuração de login para o tutorial [Autenticação JAAS](<#/doc/guides/security/jaas-authentication>). O conteúdo da entrada é o mesmo, já que a classe que implementa a tecnologia de autenticação desejada em ambos os casos é o Krb5LoginModule no pacote `com.sun.security.auth.module`.

A única diferença é o nome usado para a entrada. No tutorial anterior, usamos o nome "JaasSample", pois esse é o nome usado pela classe JaasAcn para pesquisar a entrada. Ao usar o utilitário Login com sua aplicação, ele espera que o nome da entrada do seu arquivo de configuração de login seja o mesmo que o nome da sua classe de aplicação de nível superior. A classe de aplicação para este tutorial é chamada "Sample", então esse também deve ser o nome da entrada do arquivo de configuração de login. Assim, o arquivo de configuração de login se parece com o seguinte:
```
    Sample {
       com.sun.security.auth.module.Krb5LoginModule required;
    };
```

O "required" indica que o login usando o Krb5LoginModule é necessário para "ter sucesso" para que a autenticação seja considerada bem-sucedida. O Krb5LoginModule só tem sucesso se o nome e a senha fornecidos pelo usuário forem usados com sucesso para fazer o login do usuário no KDC Kerberos.

Consulte a documentação da API JavaDoc do [Krb5LoginModule](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.auth/com/sun/security/auth/module/Krb5LoginModule.html>) para obter informações sobre todas as opções possíveis que podem ser passadas para o Krb5LoginModule.

### Executando o Programa de Exemplo com o Utilitário de Login

Para executar a aplicação `Sample` com o utilitário Login, faça o seguinte:

  1. Coloque os seguintes arquivos em um diretório:
     * O arquivo fonte [`Login.java`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>).
     * O arquivo fonte [`Sample.java`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>).
     * O arquivo de configuração de login [`sample.conf`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>).
  2. Compile `Login.java` e `Sample.java`:
```javac Login.java Sample.java
```

Observe que `Login.java` contém duas classes e, portanto, compilar `Login.java` cria `Login.class` e `MyAction.class`.

  3. Crie um arquivo JAR chamado `Login.jar` contendo `Login.class` e `MyAction.class`:
```jar -cvf Login.jar Login.class MyAction.class
```

  4. Crie um arquivo JAR chamado `Sample.jar` contendo `Sample.class`:
```jar -cvf Sample.jar Sample.class
```

  5. Execute a classe `Login`, especificando
     * Uma cláusula `-classpath` apropriada para que as classes sejam pesquisadas nos arquivos JAR `Login.jar` e `Sample.jar`
     * `-Djava.security.krb5.realm=<your_realm>` que seu realm Kerberos é o especificado
     * `-Djava.security.krb5.kdc=<your_kdc>` que seu KDC Kerberos é o especificado
     * `-Djava.security.auth.login.config=sample.conf` que o arquivo de configuração de login a ser usado é `sample.conf`

Nota:

Se você usar um único sinal de igual (`=`) com a propriedade de sistema `java.security.auth.login.config` (em vez de um sinal de igual duplo (`==`)), então as configurações especificadas por esta propriedade de sistema e pelo arquivo `java.security` serão usadas.

Você passa o nome da sua aplicação (neste caso, `Sample`) como um argumento para `Login`. Você adicionaria então como argumentos quaisquer argumentos exigidos pela sua aplicação, mas em nosso caso `Sample` não exige nenhum.

A seguir estão os comandos completos a serem usados para Windows, Linux e macOS. A única diferença é que no Windows você usa ponto e vírgula para separar os itens do classpath, enquanto você usa dois pontos para esse propósito no Linux e macOS. Certifique-se de substituir `<your_realm>` pelo seu realm Kerberos e `<your_kdc>` pelo seu KDC Kerberos.

Aqui está o comando completo para Windows:
```java -classpath Login.jar;Sample.jar
     -Djava.security.krb5.realm=<your_realm> 
     -Djava.security.krb5.kdc=<your_kdc>
     -Djava.security.auth.login.config=sample.conf Login Sample
```

Aqui está o comando completo para Linux e macOS:
```java -classpath Login.jar:Sample.jar
     -Djava.security.krb5.realm=<your_realm>
     -Djava.security.krb5.kdc=<your_kdc>
     -Djava.security.auth.login.config=sample.conf Login Sample
```

Digite o comando completo em uma única linha. Múltiplas linhas são usadas aqui para legibilidade. Se o comando for muito longo para o seu sistema, você pode precisar colocá-lo em um arquivo `.bat` (para Windows) ou um arquivo `.sh` (para Linux e macOS) e então executar esse arquivo para executar o comando.

Você será solicitado a informar seu nome de usuário e senha Kerberos, e o módulo de login Kerberos subjacente especificado no arquivo de configuração de login fará seu login no Kerberos. Uma vez que a autenticação seja concluída com sucesso, o código `Sample` será executado em seu nome, o usuário. Você verá uma exibição dos valores das propriedades de sistema `java.home` e `user.home` e uma declaração sobre se você tem ou não um arquivo chamado `foo.txt` no diretório atual.

Para sugestões de solução de problemas de login, consulte [Solução de Problemas de Login](<#/doc/guides/security/troubleshooting-jgss>).