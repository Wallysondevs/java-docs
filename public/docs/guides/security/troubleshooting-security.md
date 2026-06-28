# Solução de Problemas de Segurança

## Solução de Problemas de Segurança

Para monitorar o acesso de segurança, você pode definir a propriedade de sistema `java.security.debug`, que determina quais mensagens de rastreamento são impressas durante a execução. Para visualizar propriedades de segurança, provedores de segurança e configurações relacionadas a TLS, especifique a opção `-XshowSettings:security` no comando `java`. Você pode habilitar a depuração em JGSS e outras tecnologias relacionadas com várias propriedades de sistema ou variáveis de ambiente.

Tópicos

  * [A Propriedade de Sistema java.security.debug](<#/doc/guides/security/troubleshooting-security>)
  * [Formato de Saída da Declaração de Depuração](<#/doc/guides/security/troubleshooting-security>)
  * [A Opção java -XshowSettings:security](<#/doc/guides/security/troubleshooting-security>)
  * [Habilitando a Depuração em Java Generic Security Services](<#/doc/guides/security/troubleshooting-security>)



### A Propriedade de Sistema java.security.debug

Para ver uma lista de todas as opções de depuração, use a opção `help` da seguinte forma. `MyApp` é qualquer aplicação Java. O comando `java` imprime as opções de depuração e então sai antes de executar `MyApp`.
```
    java -Djava.security.debug=help MyApp
```

Nota:

  * Para usar mais de uma opção, separe as opções com uma vírgula.
  * JSSE também fornece suporte de rastreamento de depuração dinâmico para solução de problemas de SSL/TLS/DTLS. Consulte [Utilitários de Depuração](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).



A tabela a seguir lista as opções de `java.security.debug` e links para mais informações sobre cada opção. Consulte [java.security.debug](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/doc-files/debug-system-property.html>) na documentação da API JavaDoc para informações adicionais.

Tabela 1-5 Opções de `java.security.debug`

Opção | Descrição | Mais Informações
---|---|---
`all` | Ativa todas as opções de depuração | Nenhum
`certpath` | Ativa a depuração para as implementações PKIX `[`CertPathValidator`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/cert/CertPathValidator.html>)` e `[`CertPathBuilder`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/cert/CertPathBuilder.html>)`. Use a opção `ocsp` com a opção `certpath` para rastreamento do protocolo OCSP. Um dump hexadecimal dos bytes de requisição e resposta OCSP é exibido. Você pode usar as seguintes opções com esta opção:

  * `ocsp`: Dump de trocas de protocolo OCSP
  * `verbose`: Um dump hexadecimal dos bytes de requisição e resposta OCSP é exibido

| [Visão Geral do Guia do Programador PKI](<#/doc/guides/security/java-pki-programmers-guide>)
`configfile` | Carregamento de arquivo de configuração JAAS (Java Authentication and Authorization Service) | [Guia de Referência do Java Authentication and Authorization Service (JAAS)](<https://docs.oracle.com/javase/8/docs/technotes/guides/security/jaas/JAASRefGuide.html>) [Uso do Utilitário de Login JAAS e Java GSS-API para Trocas Seguras de Mensagens](<#/doc/guides/security/use-jaas-login-utility-and-java-gss-api-secure-message-exchanges>)
`configparser` | Análise de arquivo de configuração JAAS | [Guia de Referência do Java Authentication and Authorization Service (JAAS)](<https://docs.oracle.com/javase/8/docs/technotes/guides/security/jaas/JAASRefGuide.html>) [Uso do Utilitário de Login JAAS e Java GSS-API para Trocas Seguras de Mensagens](<#/doc/guides/security/use-jaas-login-utility-and-java-gss-api-secure-message-exchanges>)
`gssloginconfig` | Depuração de arquivo de configuração de login Java GSS (Generic Security Services) | [Java Generic Security Services: (Java GSS) e Kerberos](<https://docs.oracle.com/javase/8/docs/technotes/guides/security/jgss/jgss-features.html>) [Tutorial JAAS e Java GSS-API](<https://docs.oracle.com/javase/8/docs/technotes/guides/security/jgss/tutorials/BasicClientServer.html>) `[`javax.security.auth.login.Configuration`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/login/Configuration.html>)`: Um objeto Configuration é responsável por especificar qual `[`javax.net.ssl.SSLEngine`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLEngine.html>)` deve ser usado para uma aplicação específica, e em que ordem os `LoginModules` devem ser invocados. [Apêndice B: Arquivo de Configuração de Login JAAS](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>) [Programação de Segurança Avançada em Java SE Autenticação, Comunicação Segura e Single Sign-On](<https://docs.oracle.com/javase/8/docs/technotes/guides/security/jgss/lab/>)
`jar` | Verificação de arquivo JAR | [Verificando Arquivos JAR Assinados](<https://docs.oracle.com/javase/tutorial/deployment/jar/verify.html>) dos Tutoriais Java Nota:Use a propriedade de Sistema `jdk.jar.maxSignatureFileSize` para especificar o tamanho máximo, em bytes, de arquivos de assinatura em um JAR assinado. Seu valor padrão é `16000000` (16 MB).
`jca` | Depuração de classe de engine JCA | [Classes de Engine e Algoritmos](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)
`KeyStore` | Depuração de Keystore | [Keystores](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide> "Um banco de dados chamado "keystore" pode ser usado para gerenciar um repositório de chaves e certificados. Keystores estão disponíveis para aplicações que precisam de dados para fins de autenticação, criptografia ou assinatura.") [`KeyStore`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/KeyStore.html>)
`logincontext` | Resultados de `[`LoginContext`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/login/LoginContext.html>)` | [Guia de Referência do Java Authentication and Authorization Service (JAAS)](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>) [Uso do Utilitário de Login JAAS e Java GSS-API para Trocas Seguras de Mensagens](<#/doc/guides/security/use-jaas-login-utility-and-java-gss-api-secure-message-exchanges>)
`pcsc` | Depuração de Java Smart Card I/O e provedor SunPCSC | [O Provedor SunPCSC](<#/doc/guides/security/oracle-providers>) e o pacote [`javax.smartcardio`](<#/>)
`pkcs11` | Depuração do gerenciador de sessão PKCS11 | [Guia de Referência PKCS#11](<#/doc/guides/security/pkcs11-reference-guide1>)
`pkcs11keystore` | Depuração de KeyStore PKCS11 | [Guia de Referência PKCS#11](<#/doc/guides/security/pkcs11-reference-guide1>)
`pkcs12` | Depuração de KeyStore PKCS12 | Nenhum
`properties` | Depuração de arquivo de configuração `java.security` | Nenhum
`provider` | Depuração de provedor de segurança Você pode usar a opção `engine=<engines>` com esta opção. Ela exibe a saída apenas para os engines JCA especificados por `<engines>`. Este valor é uma lista separada por vírgulas. Pode conter um ou mais dos seguintes valores:

  * `Cipher`
  * `KDF`
  * `KeyAgreement`
  * `KeyGenerator`
  * `KeyPairGenerator`
  * `KeyStore`
  * `Mac`
  * `MessageDigest`
  * `SecureRandom`
  * `Signature`

| [Guia de Referência da Java Cryptography Architecture (JCA)](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide> "A Java Cryptography Architecture \(JCA\) é uma parte importante da plataforma, e contém uma arquitetura de "provedor" e um conjunto de APIs para assinaturas digitais, resumos de mensagens \(hashes\), certificados e validação de certificados, criptografia \(cifras de bloco/fluxo simétricas/assimétricas\), geração e gerenciamento de chaves, e geração de números aleatórios seguros, para citar alguns.")
`securerandom` | Depuração de SecureRandom | [A Classe SecureRandom](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)
`sunpkcs11` | Depuração de provedor SunPKCS11 | [Guia de Referência PKCS#11](<#/doc/guides/security/pkcs11-reference-guide1>)
`ts` | Depuração de Timestamping | Nenhum
`x509` | Depuração de certificado X.509 Você pode usar a opção `ava` com esta opção. Ela incorpora caracteres não imprimíveis/não escapados em componentes AVA como strings hexadecimais | [Certificados X.509 e Listas de Revogação de Certificados (CRLs)](<#/doc/guides/security/java-pki-programmers-guide>)

### Formato de Saída da Declaração de Depuração

Cada declaração de saída de depuração gerada através da opção `java.security.debug` é formatada da seguinte forma:

`componentValue[threadId|threadName|sourceCodeLocation|timestamp]: <debug statement>`

  * `componentValue` é o valor do componente de segurança sendo logado.
  * `threadId` é o valor hexadecimal do ID da thread.
  * `threadName` é o nome da thread executando a declaração de log.
  * `sourceCodeLocation` é o arquivo fonte e o número da linha que faz esta chamada de log no formato `filename:lineNumber`.
  * `timestamp` é a data e hora no formato `yyyy-MM-dd kk:mm:ss.SSS`.
  * `<debug statement>` corresponde à saída de depuração do componente de segurança.

### A Opção java -XshowSettings:security

Você pode especificar a opção `-XshowSettings:security` no comando `java` para visualizar propriedades de segurança, provedores de segurança e configurações relacionadas a TLS. A opção mostra detalhes de provedores de segurança de terceiros se eles estiverem incluídos no classpath da aplicação ou no module path e se tais provedores estiverem configurados no arquivo `java.security`.

Além disso, você pode especificar `-XshowSettings:security:<subcategory>` onde `<subcategory>` é um dos seguintes:

  * `all`: mostra todas as configurações de segurança
  * `properties`: mostra propriedades de segurança
  * `providers`: mostra configurações estáticas de provedores de segurança
  * `tls`: mostra configurações de segurança relacionadas a TLS

### Habilitando a Depuração em Java Generic Security Services

Defina as seguintes propriedades de sistema ou variáveis de ambiente como `true` para habilitar a depuração no framework Java Generic Security Services (JGSS), Kerberos, SPNEGO, na bridge JGSS nativa e na bridge SSPI no Windows:

Cuidado:

Informações de depuração podem conter dados sensíveis.

Tabela 1-6 Propriedades de Sistema de Depuração JGSS

Propriedade de Sistema ou Variável de Ambiente | Recurso JGSS para Depurar
---|---
`sun.security.jgss.debug` system property | Framework JGSS
`sun.security.krb5.debug` system property | Mecanismo Java Kerberos 5
`sun.security.spnego.debug` system property | Mecanismo Java SPNEGO
`sun.security.nativegss.debug` system property | Bridge JGSS nativa
`SSPI_BRIDGE_TRACE` environment variable | Bridge SSPI no Windows

Por exemplo, para habilitar a depuração no framework JGSS, defina a propriedade de sistema `sun.security.jgss.debug` como `true` na linha de comando da seguinte forma:
```
    java -Dsun.security.jgss.debug=true MyApp
```

No seu arquivo de configuração de login JAAS, você pode especificar `debug=true` no Krb5LoginModule para habilitar a depuração na entrada associada. Por exemplo, o seguinte habilita a depuração para `JassSample`:
```
    JaasSample {
        com.sun.security.auth.module.Krb5LoginModule required;
        debug=true;
    };
```