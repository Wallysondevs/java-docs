# Apêndice A: Configurando Contas Kerberos

## Apêndice A: Configurando Contas Kerberos

As contas Kerberos são configuradas no Key Distribution Center (KDC). Cada entrada no banco de dados Kerberos contém um principal Kerberos. Você deve criar um principal baseado em host para a máquina onde os servidores serão executados (por exemplo, "host/j1hol-001") e um principal de cliente (por exemplo, "test") para acessar os servidores.

Para Windows, consulte [Microsoft Kerberos](<https://docs.microsoft.com/en-us/windows/desktop/SecAuthN/microsoft-kerberos>).

Os exercícios assumem que o sistema operacional foi configurado para usar o servidor Kerberos correto. Essa configuração geralmente requer privilégios de administração. Se você não conseguir configurar o sistema operacional, poderá usar um arquivo de configuração Kerberos com seu comando `java` usando a opção `-Djava.security.krb5.conf`. Aqui está um exemplo de como invocar um dos comandos dos exercícios para usar o arquivo de configuração [`krb5.conf`](<#/doc/guides/security/source-code-advanced-security-programming-java-se-authentication-secure-communication-single-sign>).
```
    % java -Djava.security.auth.login.config=jaas-krb5.conf\
      -Djava.security.krb5.conf=krb5.conf Jaas client
```