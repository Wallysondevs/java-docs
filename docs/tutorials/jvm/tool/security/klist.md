# Klist - Exibindo Sua Tabela de Chaves

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Segurança ](<#/doc/tutorials/jvm/tool/security>) > Klist - Exibindo Sua Tabela de Chaves

**Anterior na Série**

[Kinit - Obtendo e Concedendo Tickets Kerberos](<#/doc/tutorials/jvm/tool/security/kinit>)

➜

**Tutorial Atual**

Klist - Exibindo Sua Tabela de Chaves

➜

**Próximo na Série**

[Ktab - Gerenciando Sua Tabela de Chaves Local](<#/doc/tutorials/jvm/tool/security/ktabd>)

**Anterior na Série:** [Kinit - Obtendo e Concedendo Tickets Kerberos](<#/doc/tutorials/jvm/tool/security/kinit>)

**Próximo na Série:** [Ktab - Gerenciando Sua Tabela de Chaves Local](<#/doc/tutorials/jvm/tool/security/ktabd>)

# Klist - Exibindo Sua Tabela de Chaves

## Apresentando o Klist

[klist](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/klist.html>) \- exibe as entradas no cache de credenciais local e na tabela de chaves

## Sinopse

## Descrição

A ferramenta `klist` exibe as entradas no cache de credenciais local e na tabela de chaves. Depois de modificar o cache de credenciais com a ferramenta `kinit` ou modificar o keytab com a ferramenta `ktab`, a única maneira de verificar as alterações é visualizar o conteúdo do cache de credenciais ou do keytab usando a ferramenta `klist`. A ferramenta `klist` não altera o banco de dados Kerberos.

## Comandos

`-c`

Especifica que o cache de credenciais deve ser listado.

A seguir estão as opções para entradas do cache de credenciais:

`-f`

Exibe os sinalizadores de credenciais.

`-e`

Exibe o tipo de criptografia.

`-a`

Exibe os endereços.

`-n`

Se a opção `-a` for especificada, não resolva endereços inversamente.

`-k`

Especifica que o keytab deve ser listado.

Lista as entradas do keytab. A seguir estão as opções para entradas do keytab:

`-t`

Exibe os timestamps das entradas do keytab.

`-K`

Exibe as chaves DES das entradas do keytab.

`-e`

Exibe o tipo de chave da entrada do keytab.

_name_

Especifica o nome do cache de credenciais ou o nome do keytab. O prefixo do cache ou keytab baseado em arquivo é `FILE:`. Se o nome não for especificado, a ferramenta `klist` usa valores padrão para o nome do cache e do keytab. A documentação do `kinit` lista esses valores padrão.

`-help`

Exibe as instruções.

## Exemplos

Lista as entradas na tabela de chaves especificada, incluindo timestamps das entradas do keytab e chaves DES:

Lista as entradas no cache de credenciais especificado, incluindo o sinalizador de credenciais e a lista de endereços:

### Neste tutorial

Apresentando o Klist Sinopse Descrição Comandos Exemplos

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Kinit - Obtendo e Concedendo Tickets Kerberos](<#/doc/tutorials/jvm/tool/security/kinit>)

➜

**Tutorial Atual**

Klist - Exibindo Sua Tabela de Chaves

➜

**Próximo na Série**

[Ktab - Gerenciando Sua Tabela de Chaves Local](<#/doc/tutorials/jvm/tool/security/ktabd>)

**Anterior na Série:** [Kinit - Obtendo e Concedendo Tickets Kerberos](<#/doc/tutorials/jvm/tool/security/kinit>)

**Próximo na Série:** [Ktab - Gerenciando Sua Tabela de Chaves Local](<#/doc/tutorials/jvm/tool/security/ktabd>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Segurança ](<#/doc/tutorials/jvm/tool/security>) > Klist - Exibindo Sua Tabela de Chaves