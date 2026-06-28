# Quando Usar Java GSS-API Versus JSSE

## Quando Usar Java GSS-API Versus JSSE

Java GSS-API e JSSE fornecem o mesmo conjunto básico de recursos de segurança:

  1. Autenticação cliente-servidor
  2. Criptografia e proteção de integridade de dados transmitidos

No entanto, existem algumas diferenças importantes entre os dois. Este documento lista algumas delas para ajudar você a decidir qual pode ser mais apropriado em seu ambiente:

  1. Suporte a Kerberos Single Sign-On

GSS-API contém suporte para Kerberos como um mecanismo de segurança obrigatório. Isso significa que, se sua área de trabalho tiver suporte a Kerberos, você pode escrever aplicativos baseados em Java GSS-API que nunca solicitam uma senha ao usuário.

  2. API de Comunicações

JSSE suporta uma API baseada em sockets. Sockets JSSE estendem as classes de socket encontradas em `java.net` e as fábricas de socket JSSE estendem as fábricas de socket encontradas em `javax.net`. Assim, se seu aplicativo for escrito de forma que suas necessidades de segurança precisem ser configuradas via uma fábrica de sockets, então JSSE pode ser mais apropriado para você. Sockets JSSE precisam usar um transporte confiável. Tipicamente, as implementações usam TCP. 

Java GSS-API, por outro lado, é uma API baseada em tokens que depende do aplicativo para realizar a comunicação. Isso significa que o aplicativo pode usar sockets TCP, datagramas UDP ou qualquer outro canal que permita transportar tokens gerados pelo Java GSS-API. Se seu aplicativo tiver necessidades variadas de protocolo de comunicação, então Java GSS-API pode ser mais apropriado para você. Java GSS-API pode ler e escrever seus tokens usando input e output streams. No entanto, você precisará configurar os streams por conta própria.

  3. Delegação de Credenciais

Java GSS-API permite que o cliente delegue suas credenciais ao servidor ao usar Kerberos. Se seu aplicativo for implantado em um ambiente de múltiplas camadas onde intermediários precisam se passar por clientes ao se comunicar com camadas de backend, Java GSS-API pode ser mais apropriado para você.

  4. Criptografia Seletiva

Como Java GSS-API é baseado em tokens, você pode optar por criptografar seletivamente certas mensagens, mas não todas. Se seu aplicativo precisar intercalar mensagens em texto simples e mensagens cifradas, Java GSS-API pode ser mais apropriado para você.

  5. Requisitos de Protocolo

JSSE fornece implementações do protocolo TLS, incluindo TLS version 1.3 e TLS version 1.2. Java GSS-API fornece uma implementação do framework GSS-API definido em [Generic Security Service API Version 2: Java Bindings Update](<https://tools.ietf.org/html/rfc5653>) (RFC 5653), bem como uma implementação do mecanismo Kerberos Versão 5 definido em [The Kerberos Version 5 GSS-API Mechanism](<https://tools.ietf.org/html/rfc1964>) (RFC 1964). (Em plataformas Microsoft Windows, isso pode ser conhecido como SSPI com Kerberos.) Alguns servidores, como servidores HTTPS, exigirão que você use TLS, caso em que JSSE será apropriado para você. Outros servidores, como servidores LDAP usando SASL, podem precisar de GSS-API com Kerberos, caso em que Java GSS-API será apropriado para você.