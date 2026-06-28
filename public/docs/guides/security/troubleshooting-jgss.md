# Solução de Problemas do JGSS

## Solução de Problemas do JGSS
Consulte [Habilitando a Depuração em Java Generic Security Services](<#/doc/guides/security/troubleshooting-security>) para mais informações sobre como habilitar a depuração em JGSS, Kerberos, SPNEGO, na ponte JGSS nativa e na ponte SSPI no Windows.

### Solução de Problemas de Logins

A seguir estão alguns problemas que podem ocorrer ao tentar um login, e sugestões para resolvê-los.

  * Configurações Configuráveis do Kerberos: As configurações de nome e realm do Kerberos Key Distribution Center (KDC) são fornecidas no arquivo de configuração do Kerberos ou através das propriedades de sistema `java.security.krb5.kdc` e `java.security.krb5.realm.` Uma opção booleana `refreshKrb5Config` pode ser especificada na entrada para `Krb5LoginModule` no arquivo de configuração JAAS. Se esta opção for definida como `true`, então os valores de configuração serão atualizados antes que o método `login` do `Krb5LoginModule` seja chamado.

Nota:

Ao alternar configurações do Kerberos, é OBRIGATÓRIO que `refreshKrb5Config` seja definido como `true.` A falha em definir este valor pode levar a resultados inesperados.

  * `java.lang.SecurityException` at `javax.security.auth.login.Configuration.getConfiguration`

Causa: Houve um problema ao processar o arquivo de configuração de login JAAS, possivelmente devido a um erro de sintaxe no arquivo.

Solução: Verifique o arquivo de configuração cuidadosamente em busca de erros. Consulte [Apêndice B: Arquivo de Configuração de Login JAAS](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>) para obter informações sobre a sintaxe necessária no arquivo de configuração de login.

  * `javax.security.auth.login.LoginException: KrbException: Pre-authentication information was invalid (24) - Preauthentication failed`

Causa 1: A senha inserida está incorreta.

Solução 1: Verifique a senha.

Causa 2: Se você estiver usando o keytab para obter a chave (por exemplo, definindo a opção `useKeyTab` como `true` na entrada `Krb5LoginModule` no arquivo de configuração de login JAAS), então a chave pode ter mudado desde a última atualização do keytab.

Solução 2: Consulte sua documentação do Kerberos para gerar um novo keytab e use-o.

Causa 3: Desvio de relógio - Se o horário no KDC e no cliente diferirem significativamente (tipicamente 5 minutos), este erro pode ser retornado.

Solução 3: Sincronize os relógios (ou peça a um administrador de sistema para fazê-lo).
Causa 4: O nome do realm Kerberos não está todo em maiúsculas.

Solução 4: Torne o nome do realm Kerberos todo em maiúsculas. Nota: É recomendado ter nomes de realm todo em maiúsculas. Consulte [Convenções de Nomenclatura para Nomes de Realm e Nomes de Host](<#/doc/guides/security/kerberos-requirements>).

  * `GSSException: No valid credentials provided (Mechanism level: Attempt to obtain new INITIATE credentials failed! (null)) . . . Caused by: javax.security.auth.login.LoginException: Clock skew too great`

Causa: O Kerberos exige que o horário no KDC e no cliente estejam frouxamente sincronizados. (O padrão é dentro de 5 minutos.) Se não for esse o caso, você receberá este erro.

Solução: Sincronize os relógios (ou peça a um administrador de sistema para fazê-lo).

  * `javax.security.auth.login.LoginException: KrbException: Null realm name (601) - default realm not specified`

Causa: O realm padrão não está especificado no arquivo de configuração do Kerberos `krb5.conf` (se usado), fornecido como parte do nome de usuário, ou especificado através da propriedade de sistema `java.security.krb5.realm`.

Solução: Verifique se o seu arquivo de configuração do Kerberos (se usado) contém uma entrada especificando o realm padrão, ou especifique-o diretamente definindo o valor da propriedade de sistema `java.security.krb5.realm` e/ou incluindo-o em seu nome de usuário ao autenticar usando Kerberos.

  * `javax.security.auth.login.LoginException: java.net.SocketTimeoutException: Receive timed out`

Solução: Verifique se o KDC do Kerberos está ativo e em execução.

  * `GSSException: No valid credentials provided (Mechanism level: Failed to find any Kerberos Ticket)`

Causa: Isso pode ocorrer se nenhuma credencial Kerberos válida for obtida. Em particular, isso ocorre se você deseja que o mecanismo subjacente obtenha credenciais, mas esqueceu de indicar isso definindo o valor da propriedade de sistema `javax.security.auth.useSubjectCredsOnly` como `false` (por exemplo, via `-Djavax.security.auth.useSubjectCredsOnly=false` em seu comando de execução).

Solução: Certifique-se de definir o valor da propriedade de sistema `javax.security.auth.useSubjectCredsOnly` como `false` se você deseja que o mecanismo subjacente obtenha credenciais, em vez de sua aplicação ou um programa wrapper (como o utilitário Login usado por alguns dos tutoriais) realizando a autenticação usando JAAS.

  * `javax.security.auth.login.LoginException: Could not load configuration file <krb5.conf> (No such file or directory)`

Causa: Os comandos de execução de exemplo dos tutoriais especificam o realm e o KDC padrão do Kerberos definindo valores para as propriedades de sistema `java.security.krb5.realm` e `java.security.krb5.kdc`. Se desejar, você pode usar um arquivo de configuração do Kerberos `krb5.conf`. Tal arquivo inclui informações sobre qual é o realm e o KDC padrão. Para usar um arquivo `krb5.conf`, você pode definir a propriedade de sistema `java.security.krb5.conf` (em vez das propriedades `realm` e `kdc`) para especificar a localização do arquivo, ou você não define nenhuma dessas propriedades e, portanto, uma tentativa é feita para localizar o arquivo `krb5.conf` em um local padrão. Você receberá o erro "Could not load configuration file <krb5.conf> (No such file or directory)" se o arquivo não puder ser encontrado.

Solução: Verifique se o arquivo de configuração do Kerberos `krb5.conf` está disponível e legível. Consulte [Requisitos do Kerberos](<#/doc/guides/security/kerberos-requirements>) para obter informações sobre como especificar a localização do arquivo `krb5.conf` e onde tal arquivo é procurado por padrão se você não indicar explicitamente a localização.

  * `javax.security.auth.login.LoginException: KrbException: KDC has no support for encryption type (14) - KDC has no support for encryption type`

Causa 1: Seu KDC não suporta o tipo de criptografia solicitado.

Solução 1: A implementação do Kerberos da Oracle suporta os seguintes tipos de criptografia: `aes256-cts-hmac-sha1-96`, `aes128-cts-hmac-sha1-96`, `des3-cbc-sha1`, `arcfour-hmac-md5`, `des-cbc-crc`, e `des-cbc-md5`.

As aplicações podem selecionar o tipo de criptografia desejado especificando as seguintes tags no arquivo de Configuração do Kerberos `krb5.conf`:
```
[libdefaults]
        default_tkt_enctypes = des-cbc-md5 des-cbc-crc des3-cbc-sha1
        default_tgs_enctypes = des-cbc-md5 des-cbc-crc des3-cbc-sha1
        permitted_enctypes = des-cbc-md5 des-cbc-crc des3-cbc-sha1
```

Se não especificado, o valor padrão é:
```
aes256-cts-hmac-sha1-96 aes128-cts-hmac-sha1-96 des3-cbc-sha1 arcfour-hmac-md5
```

Se `allow_weak_crypto` em `krb5.conf` for definido como true, então `des-cbc-crc` e `des-cbc-md5` também são suportados.

Causa 2: Esta exceção é lançada ao usar o cache de tickets nativo em algumas plataformas Windows. A Microsoft adicionou um novo recurso no qual eles não exportam mais as chaves de sessão para Ticket-Granting Tickets (TGTs). Como resultado, o TGT nativo obtido no Windows possui uma chave de sessão "vazia" e EType nulo.

Solução 2: Você precisa atualizar o registro do Windows para desabilitar este novo recurso. A chave de registro `allowtgtsessionkey` deve ser adicionada - e definida corretamente - para permitir que as chaves de sessão sejam enviadas no Ticket-Granting Ticket do Kerberos. Geralmente, a seguinte é a configuração de registro necessária:
```
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Lsa\Kerberos\Parameters
        Value Name: allowtgtsessionkey
        Value Type: REG_DWORD
        Value: 0x01  ( default is 0 )
```

Por padrão, o valor é 0; defini-lo como "0x01" permite que uma chave de sessão seja incluída no TGT.

  * `KDC reply did not match expectations`

Causa: O KDC enviou uma resposta que não pode ser compreendida pelo cliente.

Solução: Verifique se você definiu corretamente todos os parâmetros de configuração do arquivo `krb5.conf` e consulte o guia do seu fornecedor de KDC.

Nota:

Um modo de depuração pode ser habilitado definindo a propriedade de sistema `sun.security.krb5.debug` como "true". Esta configuração permite que você acompanhe a execução do protocolo Kerberos V5 pelo programa.