# O Comando jinfo

## Nome

jinfo - gera informações de configuração Java para um processo Java especificado

## Sinopse

**Nota:** Este comando é experimental e não suportado.

`jinfo` [_option_] _pid_

_option_
     Isso representa as opções de linha de comando do `jinfo`. Veja Opções para o Comando jinfo.
_pid_
     O ID do processo para o qual as informações de configuração devem ser impressas. O processo deve ser um processo Java. Para obter uma lista de processos Java em execução em uma máquina, use o comando `ps` ou, se os processos da JVM não estiverem sendo executados em uma instância docker separada, o comando [jps](<#/doc/guides/tools/jps>).

## Descrição

O comando `jinfo` imprime informações de configuração Java para um processo Java especificado. As informações de configuração incluem propriedades do sistema Java e flags de linha de comando da JVM. Se o processo especificado estiver sendo executado em uma JVM de 64 bits, então você pode precisar especificar a opção `-J-d64`, por exemplo:

> `jinfo -J-d64 -sysprops` _pid_

Este comando não é suportado e pode não estar disponível em futuras versões do JDK. Em sistemas Windows onde `dbgeng.dll` não está presente, as Ferramentas de Depuração para Windows devem ser instaladas para que essas ferramentas funcionem. A variável de ambiente `PATH` deve conter o local do `jvm.dll` que é usado pelo processo de destino ou o local de onde o arquivo de despejo de memória (core dump) foi produzido.

## Opções para o Comando jinfo

**Nota:**

Se nenhuma das opções a seguir for usada, tanto as flags de linha de comando quanto os pares nome-valor das propriedades do sistema serão impressos.

`-flag` _name_
     Imprime o nome e o valor da flag de linha de comando especificada.
`-flag` [`+`|`-`]_name_
     Habilita ou desabilita a flag de linha de comando booleana especificada.
`-flag` _name_`=`_value_
     Define a flag de linha de comando especificada para o valor especificado.
`-flags`
     Imprime as flags de linha de comando passadas para a JVM.
`-sysprops`
     Imprime as propriedades do sistema Java como pares nome-valor.
`-h` or `-help`
     Imprime uma mensagem de ajuda.