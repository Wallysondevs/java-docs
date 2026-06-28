# Parte III: Implantação para Single Sign-On em um Ambiente Kerberos

## Parte III: Implantação para Single Sign-On em um Ambiente Kerberos

### Exercício 5: Implantação para Single Sign-On

Objetivo Deste Exercício

O objetivo deste exercício é aprender como configurar uma aplicação JAAS que usa Kerberos para autenticação para alcançar o single sign-on. Single sign-on significa que o usuário precisa se autenticar apenas uma vez em um sistema ou em uma coleção de serviços. Após a autenticação inicial, o usuário pode acessar outros serviços no sistema usando a mesma identidade que usou para a autenticação inicial.

Single sign-on pode ser usado para descrever diferentes tipos de autenticação. Existem protocolos de single sign-on de rede baseados em HTTP. Existe single sign-on baseado em Kerberos para serviços de rede. Neste exercício em particular, mostramos como alcançar o single sign-on em sistemas baseados em Kerberos, demonstrando como importar credenciais Kerberos já adquiridas do sistema operacional nativo subjacente.

Contexto e Recursos para Este Exercício

Consulte as informações fornecidas em [Exercício 2: Configurando JAAS para Autenticação Kerberos](<#/doc/guides/security/part-i--secure-authentication-using-java-authentication-authorization-service-jaas>) e [Exercício 4: Usando a API Java SASL](<#/doc/guides/security/part-ii--secure-communications-using-java-se-security-api>) para informações de contexto sobre Kerberos e Java GSS.

Passos a Seguir

1.  Edite o arquivo de configuração [`jaas-krb5.conf`](<#/doc/guides/security/source-code-advanced-security-programming-java-se-authentication-secure-communication-single-sign>).

Este arquivo contém duas entradas: uma chamada client e outra chamada server. Adicione a linha `useTicketCache=true` à entrada client.

2.  Realize o login Kerberos no sistema operacional nativo. Para fazer login no Kerberos, use o comando kinit da seguinte forma:
```
% kinit test
```

Forneça uma senha segura.

3.  Execute os programas client e server dos Exercícios 1 a 5 e você notará que as aplicações client não pedirão mais para você inserir uma senha.