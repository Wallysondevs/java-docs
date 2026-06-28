# O Comando jmap

## Nome

jmap - imprime detalhes de um processo especificado

## Sinopse

**Nota:** Este comando é experimental e não suportado.

`jmap` [_options_] _pid_

_options_
     Representa as opções de linha de comando do `jmap`. Consulte Opções para o Comando jmap.
_pid_
     O ID do processo para o qual as informações especificadas pelas _options_ devem ser impressas. O processo deve ser um processo Java. Para obter uma lista de processos Java em execução em uma máquina, use o comando `ps` ou, se os processos da JVM não estiverem sendo executados em uma instância docker separada, o comando [jps](<#/doc/guides/tools/jps>).

## Descrição

O comando `jmap` imprime detalhes de um processo em execução especificado.

**Nota:**

Este comando não é suportado e pode não estar disponível em futuras versões do JDK. Em sistemas Windows onde o arquivo `dbgeng.dll` não está presente, as Ferramentas de Depuração para Windows devem ser instaladas para que essas ferramentas funcionem. A variável de ambiente `PATH` deve conter o local do arquivo `jvm.dll` que é usado pelo processo de destino ou o local de onde o arquivo de despejo de memória (core dump) foi produzido.

## Opções para o Comando jmap

`-clstats` _pid_
     Conecta-se a um processo em execução e imprime estatísticas do carregador de classes do heap Java.
`-finalizerinfo` _pid_
     Conecta-se a um processo em execução e imprime informações sobre objetos aguardando finalização.
`-histo`[`:live`] _pid_
     Conecta-se a um processo em execução e imprime um histograma do heap de objetos Java. Se a subopção `live` for especificada, ele contará apenas objetos ativos.
`-dump:`_dump_options_ _pid_
    

Conecta-se a um processo em execução e despeja o heap Java. As _dump_options_ incluem:

  * `live` \--- Quando especificado, despeja apenas os objetos ativos; se não especificado, despeja todos os objetos no heap.

  * `format=b` \--- Despeja o heap Java no formato binário `hprof`

  * `file=`_filename_ \--- Despeja o heap para _filename_

Exemplo: `jmap -dump:live,format=b,file=heap.bin` _pid_