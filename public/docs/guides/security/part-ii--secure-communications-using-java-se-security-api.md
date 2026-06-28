# Parte II: Comunicações Seguras usando a API de Segurança Java SE

## Parte II: Comunicações Seguras usando a API de Segurança Java SE

Esta parte mostra como construir aplicações que realizam comunicações seguras. A plataforma Java SE fornece três APIs padrão que permitem que as aplicações realizem comunicações seguras: O Java Generic Security Service (GSS), a Java SASL API e a Java Secure Socket Extension (JSSE). Ao construir uma aplicação, qual dessas APIs você deve usar? A resposta depende de muitos fatores, incluindo os requisitos do protocolo ou serviço, a infraestrutura de implantação e a integração com outros serviços de segurança. Por exemplo, se você estiver construindo uma biblioteca cliente LDAP, precisaria usar a Java SASL API porque o uso de SASL faz parte da definição do protocolo LDAP. Como outro exemplo, se o serviço suporta SSL, então a aplicação cliente que tenta acessar o serviço precisaria usar JSSE.

### Exercício 3: Usando a API Java Generic Security Service (GSS)

Objetivo Deste Exercício

O objetivo deste exercício é aprender como usar a Java GSS API para realizar autenticação e comunicação seguras.

Contexto Deste Exercício

A Generic Security Service API fornece uma interface uniforme em linguagem C para acessar vários serviços de segurança, como autenticação, integridade de mensagens e confidencialidade de mensagens. A Java GSS API fornece a interface correspondente para aplicações Java. Ela permite que as aplicações realizem autenticação e estabeleçam comunicação segura com o par. Um dos serviços de segurança mais comuns acessados via GSS-API e Java GSS-API é o Kerberos.

Recursos para Este Exercício

  * [Introdução aos Tutoriais JAAS e Java GSS-API](<#/doc/guides/security/introduction-jaas-and-java-gss-api-tutorials1>)
  * [Generic Security Service API Versão 2: Java Bindings (RFC 2853)](<http://www.ietf.org/rfc/rfc2853.txt>)
  * Documentação JavaDoc da Java GSS API: [org.ietf.jgss](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.jgss/org/ietf/jgss/package-summary.html>). 

Visão Geral Deste Exercício

Este exercício é uma aplicação cliente-servidor que demonstra como se comunicar de forma segura usando a Java GSS API. As partes cliente e servidor primeiro se autenticam no Kerberos, conforme mostrado em [Exercício 1: Usando a API JAAS](<#/doc/guides/security/part-i--secure-authentication-using-java-authentication-authorization-service-jaas>). Isso armazena as credenciais no subject. A aplicação então executa uma ação que realiza operações Java GSS (com Kerberos como o mecanismo GSS subjacente) dentro de um Subject.callAs usando o subject. O mecanismo Java GSS Kerberos, por estar sendo executado dentro do callAs, obtém as credenciais Kerberos do subject e as usa para autenticar com o par e para trocar mensagens de forma segura.

Passos a Seguir

  1. Leia o código [`GssServer.java`](<#/doc/guides/security/source-code-advanced-security-programming-java-se-authentication-secure-communication-single-sign>). 

Este fragmento de código define a ação a ser executada após o service principal ter se autenticado no KDC. Ele substitui o `MyAction` em [Exercício 1: Usando a API JAAS](<#/doc/guides/security/part-i--secure-authentication-using-java-authentication-authorization-service-jaas>). O código primeiro cria uma instância de GSSManager, que ele usa para obter suas próprias credenciais e para criar uma instância de GSSContext. Ele usa este contexto para realizar a autenticação. Ao completar a autenticação, ele aceita entrada criptografada do cliente e usa o security context estabelecido para descriptografar os dados. Ele então usa o security context para criptografar uma resposta contendo a entrada original e a data, e então a envia de volta ao cliente.

  2. Compile o código de exemplo.

  3. Leia o código [`GssClient.java`](<#/doc/guides/security/source-code-advanced-security-programming-java-se-authentication-secure-communication-single-sign>). 

Este fragmento de código define a ação a ser executada após o client principal ter se autenticado no KDC. Ele substitui o `MyAction` em [Exercício 1: Usando a API JAAS](<#/doc/guides/security/part-i--secure-authentication-using-java-authentication-authorization-service-jaas>). O código primeiro cria uma instância de GSSManager, que ele usa para obter um principal name para o serviço com o qual ele vai se comunicar. Ele então cria uma instância de GSSContext para realizar a autenticação com o serviço. Ao completar a autenticação, ele usa o security context estabelecido para criptografar uma mensagem e a envia para o servidor. Ele então lê uma mensagem criptografada do servidor e a decodifica usando o security context estabelecido.

  4. Compile o código de exemplo.

  5. Abra uma nova janela e inicie o servidor:
`% java -Djava.security.auth.login.config=jaas-krb5.conf GssServer
```

  6. Execute a aplicação cliente. GssClient aceita dois parâmetros: o service name e o nome do servidor no qual o serviço está sendo executado. Por exemplo, se o serviço é host sendo executado na máquina j1hol-001, você digitaria o seguinte: 
`% java -Djava.security.auth.login.config=jaas-krb5.conf GssClient host j1hol-001
```

Quando solicitado pela senha, digite `change_it`.

  7. Observe a seguinte saída nas janelas das aplicações cliente e servidor respectivas.

Saída para a execução do exemplo GssServer: 
`Authenticated principal: [host/j1hol-001@J1LABS.EXAMPLE.COM]
         Waiting for incoming connections..
         Got connection from client /192.0.2.102
         Context Established!
         Client principal is test@J1LABS.EXAMPLE.COM
         Server principal is host/j1hol-001@J1LABS.EXAMPLE.COM
         Mutual authentication took place!
         Received data "Hello There!" of length 12
         Confidentiality applied: true
         Sending: Hello There! Thu May 06 12:11:15 PDT 2005
```

Saída para a execução do exemplo GssClient: 
`Kerberos password for test: change_it
         Authenticated principal: [test@J1LABS.EXAMPLE.COM]
         Connected to address j1hol-001/192.0.2.102
         Context Established!
         Client principal is test@J1LABS.EXAMPLE.COM
         Server principal is host@j1hol-001
         Mutual authentication took place!
         Sending message: Hello There!
         Will read token of size 93
         Received message: Hello There! Thu May 06 12:11:15 PDT 2005
```

Resumo

Neste exercício, você aprendeu como escrever uma aplicação cliente-servidor que usa a Java GSS API para autenticar e se comunicar de forma segura.

Próximos Passos

  1. Prossiga para [Exercício 4: Usando a Java SASL API](<#/doc/guides/security/part-ii--secure-communications-using-java-se-security-api>) para aprender como escrever uma aplicação cliente/servidor que usa a Java SASL API para autenticar e se comunicar de forma segura.

  2. Prossiga para [Exercício 5: Implantação para Single Sign-On](<#/doc/guides/security/part-iii--deploying-single-sign-kerberos-environment>) para aprender como configurar os programas de exemplo que você acabou de usar para alcançar single sign-on em um ambiente Kerberos.

### Exercício 4: Usando a Java SASL API

Objetivo Deste Exercício

O objetivo deste exercício é aprender como usar a Java SASL API para realizar autenticação e comunicação seguras.

Contexto Deste Exercício

Simple Authentication and Security Layer (SASL) especifica um protocolo challenge-response no qual os dados são trocados entre o cliente e o servidor para fins de autenticação e (opcionalmente) estabelecimento de uma security layer na qual as comunicações subsequentes serão realizadas. SASL permite que diferentes mechanisms sejam usados; cada um desses mechanisms é identificado por um profile que define os dados a serem trocados e um nome. SASL é usado com protocolos baseados em conexão, como LDAPv3 e IMAPv4. SASL é descrito na [RFC 4422](<http://www.ietf.org/rfc/rfc4422.txt>).

A Java SASL API define uma API para as aplicações usarem SASL de uma forma independente de mechanism. Por exemplo, se você está escrevendo uma biblioteca para um protocolo de rede que usa SASL, você pode usar a Java SASL API para gerar os dados a serem trocados com o par. Quando a biblioteca é implantada, você pode configurar dinamicamente os mechanisms a serem usados com a biblioteca.

Além da autenticação, você pode usar SASL para negociar uma security layer a ser usada após a autenticação. Mas, ao contrário da GSS-API, as propriedades da security layer (como se você deseja integridade ou confidencialidade) são decididas no momento da negociação. (a GSS-API permite que a confidencialidade seja ativada ou desativada por mensagem).

Recursos para Este Exercício

  * [Guia de Programação e Implantação da Java SASL API](<#/doc/guides/security/java-sasl-api-programming-and-deployment-guide1>)
  * [ javax.security.sasl](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/package-summary.html>)
  * [Simple Authentication and Security Layer (SASL) (RFC 4422)](<http://www.ietf.org/rfc/rfc4422.txt>)

Visão Geral Deste Exercício

Este exercício é uma aplicação cliente-servidor que demonstra como se comunicar de forma segura usando a Java SASL API. As partes cliente e servidor primeiro se autenticam no Kerberos usando [Exercício 1: Usando a API JAAS](<#/doc/guides/security/part-i--secure-authentication-using-java-authentication-authorization-service-jaas>). Isso armazena as credenciais no subject. A aplicação então executa uma ação que realiza operações da Java SASL API (com Kerberos como o mechanism SASL subjacente) dentro de um Subject.callAs usando o subject. O mechanism SASL/Kerberos, por estar sendo executado dentro do callAs, obtém as credenciais Kerberos do subject e as usa para autenticar com o par e para trocar mensagens de forma segura.

Este exemplo usa um protocolo simples implementado pela classe [`AppConnection`](<#/doc/guides/security/source-code-advanced-security-programming-java-se-authentication-secure-communication-single-sign>). Este protocolo troca comandos de autenticação e comandos de dados. Cada comando consiste em um tipo (por exemplo, `AppConnection.AUTH_CMD`), o comprimento dos dados a seguir e os próprios dados. Os dados são um SASL buffer se forem para autenticação ou dados de aplicação criptografados/com integridade protegida; caso contrário, são dados de aplicação simples.

Passos a Seguir

  1. Leia o código de exemplo [`SaslTestServer.java`](<#/doc/guides/security/source-code-advanced-security-programming-java-se-authentication-secure-communication-single-sign>). 

Este fragmento de código define a ação a ser executada após o service principal ter se autenticado no KDC. Ele substitui o `MyAction` em [Exercício 1: Usando a API JAAS](<#/doc/guides/security/part-i--secure-authentication-using-java-authentication-authorization-service-jaas>). O servidor especifica a quality of protections (QOP) que ele suportará e então cria uma instância de SaslServer para realizar a autenticação. O protocolo challenge-response de SASL é realizado no loop while, com o servidor enviando desafios ao cliente e processando as respostas do cliente. Após a autenticação, a identidade do cliente autenticado pode ser obtida através de uma chamada ao método getAuthorizedID(). Se uma security layer foi negociada, o servidor pode trocar dados de forma segura com o cliente.

  2. Compile o código de exemplo.

  3. Leia o código de exemplo [`SaslTestClient.java`](<#/doc/guides/security/source-code-advanced-security-programming-java-se-authentication-secure-communication-single-sign>). 

Este fragmento de código define a ação a ser executada após o client principal ter se autenticado no KDC. Ele substitui o MyAction em [Exercício 1: Usando a API JAAS](<#/doc/guides/security/part-i--secure-authentication-using-java-authentication-authorization-service-jaas>). O programa primeiro especifica a quality of protections que ele deseja (neste caso, confidencialidade) e então cria uma instância de `SaslClient` para usar na autenticação. Ele então verifica se o mechanism tem uma resposta inicial e, em caso afirmativo, obtém a resposta invocando o método `evaluateChallenge()` com um array de bytes vazio. Ele então envia a resposta ao servidor para iniciar a autenticação. O protocolo challenge-response de SASL é realizado no loop while, com o cliente avaliando os desafios que recebe do servidor e enviando ao servidor as respostas correspondentes aos desafios. Após a autenticação, o cliente pode prosseguir para se comunicar com o servidor usando a security layer negociada.

  4. Compile o código de exemplo.

  5. Abra uma nova janela e inicie o servidor. `SaslTestServer` aceita dois parâmetros: o service name e o nome do servidor no qual o serviço está sendo executado. Por exemplo, se o serviço é host sendo executado na máquina j1hol-001, você digitaria o seguinte: 
`% java -Djava.security.auth.login.config=jaas-krb5.conf SaslTestServer host j1hol-001
```

  6. Execute a aplicação cliente. `SaslTestClient` aceita dois parâmetros: o service name e o nome do servidor no qual o serviço está sendo executado. Por exemplo, se o serviço é host sendo executado na máquina j1hol-001, você digitaria o seguinte: 
`% java -Djava.security.auth.login.config=jaas-krb5.conf SaslTestClient host j1hol-001
```

Forneça uma senha segura.

  7. Observe a seguinte saída nas janelas das aplicações cliente e servidor respectivas.

Saída para a execução do exemplo `SaslTestServer`: 
`Authenticated principal: [host/j1hol-001@J1LABS.EXAMPLE.COM]
         Waiting for incoming connections...
         Got connection from client /192.0.2.102
         Client authenticated; authorized client is: test@J1LABS.EXAMPLE.COM
         Negotiated QOP: auth-conf
         Received: Hello There!
         Sending: Hello There! Fri May 07 15:32:37 PDT 2005
         Received data "Hello There!" of length 12
```

Saída para a execução do exemplo `SaslTestClient` (a senha será substituída pela senha que você forneceu): 
`Kerberos password for test: password
         Authenticated principal: [test@J1LABS.EXAMPLE.COM]
         Connected to address j1hol-001/192.0.2.102
         Client authenticated.
         Negotiated QOP: auth-conf
         Sending: Hello There!
         Received: Hello There! Fri May 07 15:32:37 PDT 2005
```

Resumo

Neste exercício, você aprendeu como escrever uma aplicação cliente-servidor que usa a Java SASL API para autenticar e se comunicar de forma segura.

Próximos Passos

Prossiga para [Exercício 5: Implantação para Single Sign-On](<#/doc/guides/security/part-iii--deploying-single-sign-kerberos-environment>) para aprender como configurar os programas de exemplo que você acabou de usar para alcançar single sign-on em um ambiente Kerberos.