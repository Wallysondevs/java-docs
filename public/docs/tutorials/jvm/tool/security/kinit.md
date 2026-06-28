# Kinit - Obtendo e Concedendo Tickets Kerberos

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Segurança ](<#/doc/tutorials/jvm/tool/security>) > Kinit - Obtendo e Concedendo Tickets Kerberos

**Anterior na Série**

[Jarsigner - Assinando Seus JARs](<#/doc/tutorials/jvm/tool/security/jarsigner>)

➜

**Tutorial Atual**

Kinit - Obtendo e Concedendo Tickets Kerberos

➜

**Próximo na Série**

[Klist - Exibindo Sua Tabela de Chaves](<#/doc/tutorials/jvm/tool/security/klist>)

**Anterior na Série:** [Jarsigner - Assinando Seus JARs](<#/doc/tutorials/jvm/tool/security/jarsigner>)

**Próximo na Série:** [Klist - Exibindo Sua Tabela de Chaves](<#/doc/tutorials/jvm/tool/security/klist>)

# Kinit - Obtendo e Concedendo Tickets Kerberos

## Apresentando Kinit

[kinit](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/kinit.html>) - obtém e armazena em cache tickets de concessão de tickets Kerberos

## Sinopse

Requisição inicial de ticket:

```
kinit [-A] [-f] [-p] [-c cache_name] [-l lifetime] [-r renewable_time] [-k [-t keytab_filename]] [principal] [password]
```

Renovar um ticket:

```
kinit -R [-c cache_name] [principal]
```

## Descrição

Esta ferramenta é similar em funcionalidade à ferramenta `kinit` que é comumente encontrada em outras implementações Kerberos, como SEAM e implementações de Referência MIT. O usuário deve estar registrado como um principal no Key Distribution Center (KDC) antes de executar `kinit`.

Por padrão, no Windows, um arquivo de cache chamado `USER_HOME`\krb5cc_`USER_NAME` é gerado.

O identificador `USER_HOME` é obtido da propriedade `java.lang.System` `user.home`. `USER_NAME` é obtido da propriedade `java.lang.System` `user.name`. Se `USER_HOME` for nulo, o arquivo de cache é armazenado no diretório atual de onde o programa está sendo executado. `USER_NAME` é o nome de usuário de login do sistema operacional. Este nome de usuário pode ser diferente do nome principal do usuário. Por exemplo, no Windows, o arquivo de cache pode ser `C:\Windows\Users\duke\krb5cc_duke`, onde `duke` é o `USER_NAME` e `C:\Windows\Users\duke` é o `USER_HOME`.

Por padrão, o nome do keytab é recuperado do arquivo de configuração Kerberos. Se o nome do keytab não for especificado no arquivo de configuração Kerberos, a ferramenta `kinit` assume que o nome é `USER_HOME`\krb5.keytab`.

Se você não especificar a senha usando a opção _password_ na linha de comando, a ferramenta `kinit` solicitará a senha.

**Nota:**

A opção `password` é fornecida apenas para fins de teste. Não especifique sua senha em um script ou forneça sua senha na linha de comando. Fazer isso comprometerá sua senha.

## Comandos

Você pode especificar um dos seguintes comandos. Após o comando, especifique as opções para ele.

`-A`

Não inclui endereços.

`-f`

Emite um ticket forwardable (encaminhável).

`-p`

Emite um ticket proxiable (proxiável).

`-c` _cache_name_

O nome do cache (por exemplo, `FILE:D:\temp\mykrb5cc`).

`-l` _lifetime_

Define o tempo de vida de um ticket. O valor pode ser um de "h:m:s", "NdNhNmNs" e "N". Consulte a [definição de Duração de Tempo do MIT krb5](<http://web.mit.edu/kerberos/krb5-1.17/doc/basic/date_format.html#duration>) para mais informações.

`-r` _renewable_time_

Define o tempo de vida total que um ticket pode ser renovado.

`-R`

Renova um ticket.

`-k`

Usa keytab.

`-t` _keytab_filename_

O nome do keytab (por exemplo, `D:\winnt\profiles\duke\krb5.keytab`).

_principal_

O nome do principal (por exemplo, `[email protected]`).

_password_

A senha Kerberos do _principal_. **Não especifique isso na linha de comando ou em um script.**

Execute `kinit -help` para exibir as instruções acima.

## Exemplos

Solicita credenciais válidas para autenticação do host cliente atual, para os serviços padrão, armazenando o cache de credenciais no local padrão (`C:\Windows\Users\duke\krb5cc_duke`):

```
kinit
```

Solicita credenciais proxiable para um principal diferente e armazena essas credenciais em um arquivo de cache especificado:

```
kinit -p -c FILE:D:\temp\mykrb5cc [email protected]
```

Solicita um TGT para o principal especificado que expirará em 1 hora, mas é renovável por até 10 horas. Os usuários devem renovar um ticket antes que ele expire. O ticket renovado pode ser renovado repetidamente dentro de 10 horas a partir de sua solicitação inicial.

```
kinit -l 1h -r 10h [email protected]
```

Renova um TGT renovável existente para o principal especificado.

```
kinit -R [email protected]
```

Solicita credenciais proxiable e forwardable para um principal diferente e armazena essas credenciais em um arquivo de cache especificado:

```
kinit -p -f -c FILE:D:\temp\mykrb5cc [email protected]
```

Exibe o menu de ajuda para a ferramenta `kinit`:

```
kinit -help
```

### Neste tutorial

Apresentando Kinit Sinopse Descrição Comandos Exemplos

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Jarsigner - Assinando Seus JARs](<#/doc/tutorials/jvm/tool/security/jarsigner>)

➜

**Tutorial Atual**

Kinit - Obtendo e Concedendo Tickets Kerberos

➜

**Próximo na Série**

[Klist - Exibindo Sua Tabela de Chaves](<#/doc/tutorials/jvm/tool/security/klist>)

**Anterior na Série:** [Jarsigner - Assinando Seus JARs](<#/doc/tutorials/jvm/tool/security/jarsigner>)

**Próximo na Série:** [Klist - Exibindo Sua Tabela de Chaves](<#/doc/tutorials/jvm/tool/security/klist>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Segurança ](<#/doc/tutorials/jvm/tool/security>) > Kinit - Obtendo e Concedendo Tickets Kerberos