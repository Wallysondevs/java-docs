# Introdução aos Tutoriais de JAAS e Java GSS-API

## Introdução aos Tutoriais de JAAS e Java GSS-API

Esta página contém links para uma série de tutoriais que demonstram vários aspectos do uso de JAAS (Java Authentication and Authorization Service) e Java GSS-API.

JAAS pode ser usado para a autenticação de usuários, para determinar de forma confiável e segura quem está executando código Java.

Java GSS-API é usado para a troca segura de mensagens entre aplicações comunicantes. O Java GSS-API contém as ligações Java para a Generic Security Services Application Program Interface (GSS-API) definida na [RFC 5653](<https://tools.ietf.org/html/rfc5653>). A GSS-API oferece aos programadores de aplicações acesso uniforme a serviços de segurança sobre uma variedade de mecanismos de segurança subjacentes, incluindo Kerberos.

Nota: JSSE é outra API que pode ser usada para comunicação segura. Para as diferenças entre as duas, consulte [Quando Usar Java GSS-API Versus JSSE](<#/doc/guides/security/when-use-java-gss-api-vs--jsse>).

A razão pela qual os tutoriais de JAAS e Java GSS-API são apresentados juntos é porque a autenticação JAAS é tipicamente realizada antes da comunicação segura usando Java GSS-API. Assim, JAAS e Java GSS-API estão relacionados e são frequentemente usados em conjunto. No entanto, é possível que as aplicações usem JAAS sem Java GSS-API, e também é possível usar Java GSS-API sem JAAS.

Os tutoriais a seguir fornecem exemplos práticos para todos os cenários descritos anteriormente.

  1. [Uso de Java GSS-API para Trocas Seguras de Mensagens Sem Programação JAAS](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>)

Demonstra o uso do Java GSS-API para trocas seguras de mensagens entre uma aplicação cliente e uma aplicação servidor.

  2. [Autenticação JAAS](<#/doc/guides/security/jaas-authentication>)

Explica como uma aplicação pode autenticar usuários usando JAAS.

  3. [Uso do Utilitário de Login JAAS](<#/doc/guides/security/use-jaas-login-utility>)

Descreve um programa utilitário que autentica um usuário usando JAAS e executa qualquer aplicação como esse usuário. Este utilitário, como uma conveniência, essencialmente realiza as operações descritas no tutorial de Autenticação JAAS em seu nome. Portanto, é possível pular diretamente para este tutorial se você não precisar saber como realizar a autenticação JAAS diretamente.

  4. [Uso do Utilitário de Login JAAS e Java GSS-API para Trocas Seguras de Mensagens](<#/doc/guides/security/use-jaas-login-utility-and-java-gss-api-secure-message-exchanges>)

O tutorial mais abrangente. O utilitário de Login é usado para autenticar um usuário de serviço e iniciar uma aplicação servidor como esse usuário. O utilitário de Login também é usado para autenticar um usuário cliente e iniciar uma aplicação cliente como esse usuário. Finalmente, as aplicações cliente e servidor, em nome de seus usuários cliente e de serviço autenticados, trocam mensagens seguras usando o Java GSS-API.

Todas as aplicações em todos os tutoriais desta série utilizam Kerberos Versão 5 como a tecnologia subjacente para autenticação e comunicação segura. Consulte [Requisitos do Kerberos](<#/doc/guides/security/kerberos-requirements>). O termo "Kerberos" usado ao longo dos tutoriais refere-se à Kerberos Versão 5.