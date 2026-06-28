# Programação de Segurança Avançada em Java SE Autenticação, Comunicação Segura e Single Sign-On

## Programação de Segurança Avançada em Java SE Autenticação, Comunicação Segura e Single Sign-On

Java SE oferece um rico conjunto de APIs e recursos para o desenvolvimento de aplicações e serviços Java seguros. As sessões de exercícios listadas aqui podem ajudá-lo a usar as APIs Java SE GSS para construir aplicações que autenticam seus usuários, para se comunicar de forma segura com outras aplicações e serviços, e ajudá-lo a configurar suas aplicações em um ambiente Kerberos para alcançar o Single Sign-On. Além disso, você também aprenderá como usar algoritmos de criptografia mais fortes em um ambiente Kerberos, e como usar mecanismos Java GSS como SPNEGO para proteger a associação.

Configurando seu Ambiente de Desenvolvimento

Configure seu ambiente de desenvolvimento da seguinte forma antes de prosseguir para o primeiro exercício:

  1. Configure um servidor Kerberos com as contas usadas pelos exercícios. Veja [Apêndice A: Configurando Contas Kerberos](<#/doc/guides/security/appendix-setting-kerberos-accounts>). 
  2. Configure o Key Distribution Center (KDC) e inicie o servidor Kerberos. 
  3. Configure a configuração Kerberos em seu computador cliente.
  4. Configure o ambiente JDK: 
     * Configure a variável de ambiente `JAVA_HOME` para apontar para o diretório de instalação do JDK 

     * Coloque `%JAVA_HOME%\bin` (Windows) ou `$JAVA_HOME/bin` (Linux ou macOS) na variável de ambiente `PATH`. 




Exercícios

Esta sessão inclui seis lições. Cada parte contém um ou mais exercícios de codificação. Trabalhe nos exercícios em sequência:

  * [Parte I : Autenticação Segura usando o Java Authentication and Authorization Service (JAAS)](<#/doc/guides/security/part-i--secure-authentication-using-java-authentication-authorization-service-jaas>)
    * [Exercício 1: Usando a API JAAS](<#/doc/guides/security/part-i--secure-authentication-using-java-authentication-authorization-service-jaas>)
    * [Exercício 2: Configurando JAAS para Autenticação Kerberos](<#/doc/guides/security/part-i--secure-authentication-using-java-authentication-authorization-service-jaas>)
  * [Parte II : Comunicações Seguras usando a API de Segurança Java SE](<#/doc/guides/security/part-ii--secure-communications-using-java-se-security-api>)
    * [Exercício 3: Usando a API Java Generic Security Service (GSS)](<#/doc/guides/security/part-ii--secure-communications-using-java-se-security-api>)
    * [Exercício 4: Usando a API Java SASL](<#/doc/guides/security/part-ii--secure-communications-using-java-se-security-api>)
  * [Parte III : Implantação para Single Sign-On em um Ambiente Kerberos](<#/doc/guides/security/part-iii--deploying-single-sign-kerberos-environment>)
    * [Exercício 5: Implantação para Single Sign-On](<#/doc/guides/security/part-iii--deploying-single-sign-kerberos-environment>)
  * [Parte IV : Comunicações Seguras Usando Algoritmos de Criptografia Mais Fortes](<#/doc/guides/security/part-iv--secure-communications-using-stronger-encryption-algorithms>)
    * [Exercício 6: Configurando para Usar Algoritmos de Criptografia Mais Fortes em um Ambiente Kerberos, para Proteger a Comunicação](<#/doc/guides/security/part-iv--secure-communications-using-stronger-encryption-algorithms>)
  * [Parte V : Autenticação Segura Usando o Mecanismo SPNEGO Java GSS](<#/doc/guides/security/part-v--secure-authentication-using-spnego-java-gss-mechanism>)
    * [Exercício 7: Usando a API Java Generic Security Services (GSS) com SPNEGO](<#/doc/guides/security/part-v--secure-authentication-using-spnego-java-gss-mechanism>)
  * [Parte VI: Autenticação HTTP/SPNEGO](<#/doc/guides/security/part-vi-httpspnego-authentication>)
    * [Exercício 8: Usando Autenticação HTTP/SPNEGO](<#/doc/guides/security/part-vi-httpspnego-authentication>)