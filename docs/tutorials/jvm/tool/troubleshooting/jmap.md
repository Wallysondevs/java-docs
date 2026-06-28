# Jmap - Imprimindo Detalhes de um Processo

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Solução de Problemas ](<#/doc/tutorials/jvm/tool/troubleshooting>) > Jmap - Imprimindo Detalhes de um Processo

**Anterior na Série**

[Jinfo - Gerando Informações de Configuração Java](<#/doc/tutorials/jvm/tool/troubleshooting/jinfo>)

➜

**Tutorial Atual**

Jmap - Imprimindo Detalhes de um Processo

➜

**Próximo na Série**

[Jstack - Imprimindo Rastros de Pilha Java](<#/doc/tutorials/jvm/tool/troubleshooting/jstack>)

**Anterior na Série:** [Jinfo - Gerando Informações de Configuração Java](<#/doc/tutorials/jvm/tool/troubleshooting/jinfo>)

**Próximo na Série:** [Jstack - Imprimindo Rastros de Pilha Java](<#/doc/tutorials/jvm/tool/troubleshooting/jstack>)

# Jmap - Imprimindo Detalhes de um Processo

## Apresentando o jmap

[jmap](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jmap.html>) - imprime detalhes de um processo especificado

## Sinopse

**Nota:** Este comando é experimental e não suportado.

_options_

Isso representa as opções de linha de comando do `jmap`. Veja Opções para o Comando jmap.

_pid_

O ID do processo para o qual as informações especificadas pelas _options_ devem ser impressas. O processo deve ser um processo Java. Para obter uma lista de processos Java em execução em uma máquina, use o comando `ps` ou, se os processos da JVM não estiverem sendo executados em uma instância docker separada, o comando [jps](<#/doc/tutorials/jvm/tools/monitoring/jps>).

## Descrição

O comando `jmap` imprime detalhes de um processo em execução especificado.

**Nota:**

Este comando não é suportado e pode não estar disponível em futuras versões do JDK. Em sistemas Windows onde o arquivo `dbgeng.dll` não está presente, as Ferramentas de Depuração para Windows devem ser instaladas para que essas ferramentas funcionem. A variável de ambiente `PATH` deve conter o local do arquivo `jvm.dll` que é usado pelo processo de destino ou o local de onde o arquivo de despejo de memória (core dump) foi produzido.

## Opções para o Comando jmap

`-clstats` _pid_

Conecta-se a um processo em execução e imprime estatísticas do class loader do heap Java.

`-finalizerinfo` _pid_

Conecta-se a um processo em execução e imprime informações sobre objetos aguardando finalização.

`-histo`:live` _pid_

Conecta-se a um processo em execução e imprime um histograma do heap de objetos Java. Se a subopção `live` for especificada, ele então conta apenas objetos ativos.

`-dump:`_dump_options_ _pid_

Conecta-se a um processo em execução e despeja o heap Java. As _dump_options_ incluem:

  * `live` \--- Quando especificado, despeja apenas os objetos ativos; se não especificado, então despeja todos os objetos no heap.

  * `format=b` \--- Despeja o heap Java no formato binário `hprof`

  * `file=`_filename_ \--- Despeja o heap para _filename_

Exemplo:

### Neste tutorial

Apresentando o Jmap Sinopse Descrição Opções para o Comando jmap

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Jinfo - Gerando Informações de Configuração Java](<#/doc/tutorials/jvm/tool/troubleshooting/jinfo>)

➜

**Tutorial Atual**

Jmap - Imprimindo Detalhes de um Processo

➜

**Próximo na Série**

[Jstack - Imprimindo Rastros de Pilha Java](<#/doc/tutorials/jvm/tool/troubleshooting/jstack>)

**Anterior na Série:** [Jinfo - Gerando Informações de Configuração Java](<#/doc/tutorials/jvm/tool/troubleshooting/jinfo>)

**Próximo na Série:** [Jstack - Imprimindo Rastros de Pilha Java](<#/doc/tutorials/jvm/tool/troubleshooting/jstack>)

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Solução de Problemas ](<#/doc/tutorials/jvm/tool/troubleshooting>) > Jmap - Imprimindo Detalhes de um Processo