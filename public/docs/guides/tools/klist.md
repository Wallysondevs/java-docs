# O Comando klist

## Nome

klist - exibe as entradas no cache de credenciais local e na tabela de chaves

## Sinopse

`klist` [`-c` [`-f`] [`-e`] [`-a` [`-n`]]] [`-k` [`-t`] [`-K`]] [_name_] [`-help`]

## Descrição

A ferramenta `klist` exibe as entradas no cache de credenciais local e na tabela de chaves. Depois de modificar o cache de credenciais com a ferramenta `kinit` ou modificar a keytab com a ferramenta `ktab`, a única maneira de verificar as alterações é visualizar o conteúdo do cache de credenciais ou da keytab usando a ferramenta `klist`. A ferramenta `klist` não altera o Kerberos database.

## Comandos

`-c`
    

Especifica que o cache de credenciais deve ser listado.

A seguir estão as opções para entradas do cache de credenciais:

`-f`
     Exibe os sinalizadores de credencial.
`-e`
     Exibe o tipo de criptografia.
`-a`
     Exibe os endereços.
`-n`
     Se a opção `-a` for especificada, não resolva endereços inversamente.
`-k`
    

Especifica que a keytab deve ser listada.

Lista as entradas da keytab. A seguir estão as opções para entradas da keytab:

`-t`
     Exibe os timestamps da entrada da keytab.
`-K`
     Exibe as chaves DES da entrada da keytab.
`-e`
     Exibe o tipo de chave da entrada da keytab.
_name_
     Especifica o nome do cache de credenciais ou o nome da keytab. O prefixo do cache baseado em arquivo ou da keytab é `FILE:`. Se o nome não for especificado, a ferramenta `klist` usa valores padrão para o nome do cache e da keytab. A documentação do `kinit` lista esses valores padrão.
`-help`
     Exibe as instruções.

## Exemplos

Lista as entradas na keytab especificada, incluindo os timestamps da entrada da keytab e as chaves DES:

> `klist -k -t -K FILE:\temp\mykrb5cc`

Lista as entradas no cache de credenciais especificado, incluindo o sinalizador de credenciais e a lista de endereços:

> `klist -c -f FILE:\temp\mykrb5cc`