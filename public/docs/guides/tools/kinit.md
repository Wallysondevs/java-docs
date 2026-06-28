# O Comando kinit

## Nome

kinit - obtém e armazena em cache tickets de concessão de tickets Kerberos

## Sinopse

Requisição inicial de ticket:

`kinit` [`-A`] [`-f`] [`-p`] [`-c` _cache_name_] [`-l` _lifetime_] [`-r` _renewable_time_] [[`-k` [`-t` _keytab_file_name_]] [_principal_] [_password_]

Renovar um ticket:

`kinit` `-R` [`-c` _cache_name_] [_principal_]

## Descrição

Esta ferramenta é similar em funcionalidade à ferramenta `kinit` que é comumente encontrada em outras implementações Kerberos, como as implementações de referência SEAM e MIT. O usuário deve estar registrado como um principal no Key Distribution Center (KDC) antes de executar `kinit`.

Por padrão, no Windows, um arquivo de cache chamado _USER_HOME_`\krb5cc_`_USER_NAME_ é gerado.

O identificador _USER_HOME_ é obtido da propriedade `user.home` de `java.lang.System`. _USER_NAME_ é obtido da propriedade `user.name` de `java.lang.System`. Se _USER_HOME_ for nulo, o arquivo de cache é armazenado no diretório atual de onde o programa está sendo executado. _USER_NAME_ é o nome de usuário de login do sistema operacional. Este nome de usuário pode ser diferente do nome principal do usuário. Por exemplo, no Windows, o arquivo de cache pode ser `C:\Windows\Users\duke\krb5cc_duke`, onde `duke` é o _USER_NAME_ e `C:\Windows\Users\duke` é o _USER_HOME_.

Por padrão, o nome do keytab é recuperado do arquivo de configuração Kerberos. Se o nome do keytab não for especificado no arquivo de configuração Kerberos, a ferramenta kinit assume que o nome é _USER_HOME_`\krb5.keytab`

Se você não especificar a senha usando a opção _password_ na linha de comando, a ferramenta `kinit` solicitará a senha.

**Nota:**

A opção `password` é fornecida apenas para fins de teste. Não especifique sua senha em um script ou forneça sua senha na linha de comando. Fazer isso comprometerá sua senha.

## Comandos

Você pode especificar um dos seguintes comandos. Após o comando, especifique as opções para ele.

`-A`
     Não inclui endereços.
`-f`
     Emite um ticket encaminhável.
`-p`
     Emite um ticket proxiável.
`-c` _cache_name_
     O nome do cache (por exemplo, `FILE:D:\temp\mykrb5cc`).
`-l` _lifetime_
     Define a vida útil de um ticket. O valor pode ser um de "h:m[:s]", "NdNhNmNs" e "N". Consulte a [definição de Duração de Tempo do MIT krb5](<http://web.mit.edu/kerberos/krb5-1.17/doc/basic/date_format.html#duration>) para mais informações.
`-r` _renewable_time_
     Define a vida útil total pela qual um ticket pode ser renovado.
`-R`
     Renova um ticket.
`-k`
     Usa keytab
`-t` _keytab_filename_
     O nome do keytab (por exemplo, `D:\winnt\profiles\duke\krb5.keytab`).
_principal_
     O nome principal (por exemplo, `duke@example.com`).
_password_
     A senha Kerberos do _principal_. **Não especifique isso na linha de comando ou em um script.**

Execute `kinit -help` para exibir as instruções acima.

## Exemplos

Solicita credenciais válidas para autenticação do host cliente atual, para os serviços padrão, armazenando o cache de credenciais no local padrão (`C:\Windows\Users\duke\krb5cc_duke`):

> `kinit duke@example.com`

Solicita credenciais proxiáveis para um principal diferente e armazena essas credenciais em um arquivo de cache especificado:

> `kinit -l 1h -r 10h duke@example.com`

Solicita um TGT para o principal especificado que expirará em 1 hora, mas é renovável por até 10 horas. Os usuários devem renovar um ticket antes que ele expire. O ticket renovado pode ser renovado repetidamente dentro de 10 horas a partir de sua solicitação inicial.

> `kinit -R duke@example.com`

Renova um TGT renovável existente para o principal especificado.

> `kinit -p -c FILE:C:\Windows\Users\duke\credentials\krb5cc_cafebeef cafebeef@example.com`

Solicita credenciais proxiáveis e encaminháveis para um principal diferente e armazena essas credenciais em um arquivo de cache especificado:

> `kinit -f -p -c FILE:C:\Windows\Users\duke\credentials\krb5cc_cafebeef cafebeef@example.com`

Exibe o menu de ajuda para a ferramenta `kinit`:

> `kinit -help`