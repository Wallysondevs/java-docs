# Parte I: Autenticação Segura usando o Java Authentication and Authorization Service (JAAS)

## Parte I: Autenticação Segura usando o Java Authentication and Authorization Service (JAAS)

### Exercício 1: Usando a API JAAS

Objetivo Deste Exercício

O objetivo deste exercício é aprender como usar a API Java Authentication and Authorization (JAAS) para realizar autenticação.

Contexto para Este Exercício

JAAS fornece uma estrutura de autenticação plugável padrão (PAM) para a plataforma Java. Uma aplicação usa a API JAAS para realizar autenticação - o processo de verificar a identidade do usuário que está usando a aplicação e coletar suas informações de identidade em um contêiner chamado subject. A aplicação pode então usar as informações de identidade no subject, juntamente com a API JAAS, para tomar decisões de autorização, para decidir se o usuário autenticado tem permissão para acessar recursos protegidos ou realizar ações restritas. Este exercício demonstra a Autenticação JAAS. Ele não demonstra a Autorização JAAS.

Recursos para Este Exercício

  * [Guia de Referência do Java Authentication and Authorization Service (JAAS)](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)
  * [Tutorial de Autenticação JAAS](<#/doc/guides/security/jaas-authentication-tutorial>)
  * Documentação da API JavaDoc do JAAS
    * [javax.security.auth](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/package-summary.html>)
    * [javax.security.auth.callback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/package-summary.html>)
    * [javax.security.auth.kerberos](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.jgss/javax/security/auth/kerberos/package-summary.html>)
    * [javax.security.auth.login](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/login/package-summary.html>)
    * [javax.security.auth.spi](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/spi/package-summary.html>)
    * [javax.security.auth.x500](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/x500/package-summary.html>)

Passos a Seguir

  * Leia o código de exemplo [`Jass.java`](<#/doc/guides/security/source-code-advanced-security-programming-java-se-authentication-secure-communication-single-sign>). O código executa as seguintes tarefas:

    1. Defina um callback handler ou use um pré-definido.
    2. Crie um LoginContext com um nome que identifica qual entrada de configuração JAAS usar.
    3. Realize a autenticação.
    4. Defina a tarefa que o usuário autenticado deve realizar.
    5. Realize a ação como o usuário autenticado.
    6. Faça logout.

`Subject.callAs` executará o código definido em `MyAction` como o usuário autenticado. Isso permite que o código em `MyAction` obtenha qualquer informação de identidade necessária para autenticação em um serviço a partir do subject.

  * Certifique-se de que `%JAVA_HOME%/bin` esteja na variável de ambiente PATH.

  * Compile o código de exemplo modificado. Você executará este código em exercícios subsequentes após fazer algumas configurações. Isso encerra este exercício.

Resumo

Este exercício introduziu as principais classes das APIs JAAS: `LoginContext` e `Subject`. Você aprendeu como usar `LoginContext` para autenticar um usuário e coletar suas informações de identidade em um `Subject`. Você então aprendeu como usar o `Subject` para realizar uma ação como o usuário autenticado.

Próximos Passos

Prossiga para o [Exercício 2: Configurando JAAS para Autenticação Kerberos](<#/doc/guides/security/part-i--secure-authentication-using-java-authentication-authorization-service-jaas>) para aprender como configurar a aplicação de exemplo para usar Kerberos para autenticação.

### Exercício 2: Configurando JAAS para Autenticação Kerberos

Objetivo Deste Exercício

O objetivo deste exercício é aprender como configurar uma aplicação JAAS para usar Kerberos para autenticação.

Contexto Kerberos para Este Exercício

Kerberos é um protocolo padrão da Internet para autenticação por terceiros confiáveis, definido na [RFC 4120](<http://www.ietf.org/rfc/rfc4120.txt>). Ele está disponível na maioria das plataformas de computação modernas hoje, incluindo Windows e Linux.

A arquitetura Kerberos é centrada em um serviço de autenticação confiável chamado centro de distribuição de chaves, ou KDC. Usuários e serviços em um ambiente Kerberos são referidos como principals; cada principal compartilha um segredo (como uma senha) com o KDC. Um principal se autentica no Kerberos provando ao KDC que conhece o segredo compartilhado. Se a autenticação for bem-sucedida, o KDC emite um ticket-granting-ticket (TGT) para o principal. Quando o principal subsequentemente deseja se autenticar em um serviço na rede, como um serviço de diretório ou um serviço de arquivos, (atuando, assim, como um "cliente" do serviço), ele entrega o TGT ao KDC para obter um service ticket para se comunicar com o serviço. O service ticket não apenas indica as identidades dos principals cliente e serviço, mas também contém uma chave de sessão que pode ser usada pelo cliente e pelo serviço para estabelecer comunicação segura posteriormente. Para se autenticar no serviço, o cliente envia o service ticket para o serviço. Quando o serviço recebe o ticket, ele o decodifica usando o segredo que compartilha com o KDC.

Nesta arquitetura, um principal se autentica diretamente (uma vez) apenas no KDC. Ele se autentica indiretamente em todos os outros serviços através do uso de service tickets. Service tickets são como o KDC atesta a identidade de um principal. A capacidade de um principal acessar múltiplos serviços seguros realizando autenticação explícita apenas uma vez é chamada de single sign-on.

Contexto JAAS para Este Exercício

No JAAS, para um principal cliente, "fazer login no Kerberos" significa adquirir o TGT e colocá-lo no Subject, para que possa ser usado para autenticação com os serviços que o cliente acessará. Para um principal de serviço, "fazer login no Kerberos" significa obter as chaves secretas que o serviço precisa para decodificar as requisições de autenticação de cliente recebidas.

Recursos para Este Exercício

  * [Java Authentication and Authorization Service (JAAS): Guia do Desenvolvedor de LoginModule](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>)
  * [O Serviço de Autenticação de Rede Kerberos (v5)](<http://www.ietf.org/rfc/rfc4120.txt>)
  * [Apêndice B: Arquivo de Configuração de Login JAAS](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)
  * Documentação da API JavaDoc do pacote do módulo de login: [com.sun.security.auth.module](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.auth/com/sun/security/auth/module/package-summary.html>)
  * [Introdução aos Tutoriais JAAS e Java GSS-API](<#/doc/guides/security/introduction-jaas-and-java-gss-api-tutorials1>)

Passos a Seguir

  1. Examine o arquivo de configuração [jaas-krb5.conf](<#/doc/guides/security/source-code-advanced-security-programming-java-se-authentication-secure-communication-single-sign>).

Este arquivo contém duas entradas, uma chamada `client` e outra chamada `server`. A entrada `client` indica que o `LoginContext` deve usar o `com.sun.security.auth.module.Krb5LoginModule`. A entrada `server` indica que o `LoginContext` deve usar o mesmo módulo de login e usar chaves do arquivo `sample.keytab` para o principal `host/machineName`.

  2. Determine o hostname da sua máquina executando o comando `hostname`.

  3. Edite este arquivo e altere a entrada para o principal do servidor para usar o nome da sua máquina. Por exemplo, se o nome da sua máquina for `j1hol-001`, esta linha no arquivo de configuração deve ser assim:
```
principal="host/j1hol-001"
```

  4. Realize a autenticação do cliente digitando o seguinte comando:
```
% java -Djava.security.auth.login.config=jaas-krb5.conf Jaas client
```

Você será solicitado a digitar uma senha. Você deverá ver a seguinte saída. Substitua `password` por uma senha segura.
```
Kerberos password for test: password
         Authenticated principal: [test@J1LABS.EXAMPLE.COM]
         Performing secure action...
```

  5. Realize a autenticação do servidor digitando o seguinte comando:
```
% java -Djava.security.auth.login.config=jaas-krb5.conf Jaas server
```

Você deverá ver a seguinte saída:
```
Authenticated principal: [host/j1hol-001@J1LABS.EXAMPLE.COM] Performing secure action...
```

Resumo

Neste exercício, você aprendeu como configurar uma aplicação JAAS para usar um módulo de login Kerberos, tanto como um principal cliente que insere seu nome de usuário/senha interativamente, quanto como um principal de serviço que obtém suas chaves de um arquivo `keytab`.

Próximos Passos

Prossiga para a [Parte II: Comunicações Seguras usando a API de Segurança Java SE](<#/doc/guides/security/part-ii--secure-communications-using-java-se-security-api>) para aprender como estabelecer canais de comunicação seguros usando as APIs de segurança Java.