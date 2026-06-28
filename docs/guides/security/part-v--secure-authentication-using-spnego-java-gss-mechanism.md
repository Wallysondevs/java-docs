# Parte V: Autenticação Segura Usando o Mecanismo SPNEGO Java GSS

## Parte V: Autenticação Segura Usando o Mecanismo SPNEGO Java GSS

### Exercício 7: Usando a API Java Generic Security Services (GSS) com SPNEGO

Java GSS é um framework que pode suportar múltiplos mecanismos de segurança; é necessária uma forma de negociar um mecanismo de segurança subjacente à GSS-API. Isso está disponível via SPNEGO.

SPNEGO é padronizado na IETF no [RFC 4178.](<http://www.ietf.org/rfc/rfc4178.txt>) É um mecanismo de pseudo-segurança usado para negociar um mecanismo de segurança subjacente. Ele oferece flexibilidade para cliente e servidor negociarem de forma segura um mecanismo de segurança GSS comum.

A Microsoft faz uso extensivo do SPNEGO. O SPNEGO pode ser usado para interoperar com o Microsoft Server via HTTP, para suportar autenticação multiplataforma baseada em HTTP através do Protocolo Negotiate.

Atualmente, ao usar Java GSS com Kerberos, especificamos o OID do Kerberos da seguinte forma:
```
    Oid krb5Oid = new Oid("1.2.840.113554.1.2.2");
```

Para usar SPNEGO, você só precisa especificar o OID do SPNEGO da seguinte forma:
```
    Oid spnegoOid = new Oid("1.3.6.1.5.5.2");
```

Então você pode usar o OID do SPNEGO ao criar um GSSCredential, GSSContext, etc.

Objetivo Deste Exercício

Atualmente, o único mecanismo de segurança disponível com Java GSS é o Kerberos. O objetivo deste exercício é aprender como usar outros mecanismos Java GSS, como o Simple and Protected GSS-API Negotiation Mechanism (SPNEGO), para proteger a associação.

Passos a Seguir

  1. Leia o código [`GssSpNegoClient.java`](<#/doc/guides/security/source-code-advanced-security-programming-java-se-authentication-secure-communication-single-sign>).

  2. Compile o código de exemplo:
```
% javac GssSpNegoClient.java
```

  3. Leia o código [`GssSpNegoServer.java`](<#/doc/guides/security/source-code-advanced-security-programming-java-se-authentication-secure-communication-single-sign>).

  4. Compile o código de exemplo:
```
% javac GssSpNegoServer.java
```

  5. Abra uma nova janela e inicie o servidor:
```
% java -Djava.security.auth.login.config=jaas-krb5.conf GssSpNegoServer
```

  6. Execute a aplicação cliente. `GssSpNegoClient` recebe dois parâmetros: o nome do serviço e o nome do servidor onde o serviço está sendo executado. Por exemplo, se o serviço é `host` rodando na máquina `j1hol-001`, use o seguinte (forneça uma senha segura quando solicitado):
```
% java -Djava.security.auth.login.config=jaas-krb5.conf \
         GssSpNegoClient host j1hol-001
```

Exemplo de saída para a execução de `GssSpNegoServer`:
```
Authenticated principal: [host/j1hol-001@J1LABS.EXAMPLE.COM]
         Waiting for incoming connections...
         Got connection from client /129.145.128.102
         SPNEGO Negotiated Mechanism = 1.2.840.113554.1.2.2 Kerberos V5
         Context Established!
         Client principal is test@J1LABS.EXAMPLE.COM
         Server principal is
         host/j1hol-001@J1LABS.EXAMPLE.COM
         Mutual authentication took place!
         Received data "Hello There!" of length 12
         Confidentiality applied: true
         Sending: Hello There! Thu May 06 12:11:15 PDT 2005
```

Exemplo de saída para a execução de `GssSpNegoClient` (`password` é substituído pela senha que você forneceu anteriormente):
```
Kerberos password for test: password
         Authenticated principal: [test@J1LABS.EXAMPLE.COM]
         Connected to address j1hol-001/129.145.128.102
         SPNEGO Negotiated Mechanism = 1.2.840.113554.1.2.2 Kerberos V5
         Context Established!
         Client principal is test@J1LABS.EXAMPLE.COM
         Server principal is host@j1hol-001
         Mutual authentication took place!
         Sending message: Hello There!
         Will read token of size 93
         Received message: Hello There! Thu May 06 12:11:15 PDT 2005
```

Resumo

Neste exercício, você aprendeu como escrever uma aplicação cliente-servidor que usa a API Java GSS com SPNEGO para negociar um mecanismo de segurança subjacente, como Kerberos, e se comunicar de forma segura usando Kerberos como sistema de autenticação subjacente.

Nota:

A Microsoft implementou certas variações do protocolo SPNEGO. Portanto, para interoperar com a Microsoft, um modo separado foi adicionado através da propriedade de sistema `sun.security.spnego.msinterop`. Esta propriedade é ativada para `true` por padrão. Para desativá-la, você precisa definir explicitamente esta propriedade como `false`. Para habilitar a depuração do SPNEGO, você pode definir a propriedade de sistema `sun.security.spnego.debug=true`.