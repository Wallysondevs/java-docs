# Jinfo - Gerando Informações de Configuração Java

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Solução de Problemas ](<#/doc/tutorials/jvm/tool/troubleshooting>) > Jinfo - Gerando Informações de Configuração Java

**Anterior na Série**

[Jhsdb - Analisando o Core Dump de uma JVM Travada](<#/doc/tutorials/jvm/tool/troubleshooting/jhsdb>)

➜

**Tutorial Atual**

Jinfo - Gerando Informações de Configuração Java

➜

**Próximo na Série**

[Jmap - Imprimindo Detalhes de um Processo](<#/doc/tutorials/jvm/tool/troubleshooting/jmap>)

**Anterior na Série:** [Jhsdb - Analisando o Core Dump de uma JVM Travada](<#/doc/tutorials/jvm/tool/troubleshooting/jhsdb>)

**Próximo na Série:** [Jmap - Imprimindo Detalhes de um Processo](<#/doc/tutorials/jvm/tool/troubleshooting/jmap>)

# Jinfo - Gerando Informações de Configuração Java

## Apresentando o jinfo

[jinfo](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jinfo.html>) \- gera informações de configuração Java para um processo Java especificado

## Sinopse

**Nota:** Este comando é experimental e não suportado.

_option_

Isso representa as opções de linha de comando do `jinfo`. Consulte Opções para o Comando jinfo.

_pid_

O ID do processo para o qual as informações de configuração devem ser impressas. O processo deve ser um processo Java. Para obter uma lista de processos Java em execução em uma máquina, use o comando `ps` ou, se os processos da JVM não estiverem sendo executados em uma instância docker separada, o comando [jps](<#/doc/tutorials/jvm/tools/monitoring/jps>).

## Descrição

O comando `jinfo` imprime informações de configuração Java para um processo Java especificado. As informações de configuração incluem propriedades de sistema Java e flags de linha de comando da JVM. Se o processo especificado estiver sendo executado em uma JVM de 64 bits, talvez seja necessário especificar a opção `-J-d64`, por exemplo:

Este comando não é suportado e pode não estar disponível em futuras versões do JDK. Em sistemas Windows onde `dbgeng.dll` não está presente, as Ferramentas de Depuração para Windows devem ser instaladas para que essas ferramentas funcionem. A variável de ambiente `PATH` deve conter o local do `jvm.dll` que é usado pelo processo de destino ou o local de onde o arquivo core dump foi produzido.

## Opções para o Comando jinfo

**Nota:**

Se nenhuma das seguintes opções for usada, tanto os flags de linha de comando quanto os pares nome-valor das propriedades do sistema serão impressos.

`-flag` _name_

Imprime o nome e o valor do flag de linha de comando especificado.

`-flag` `+`|`-`_name_

Habilita ou desabilita o flag de linha de comando booleano especificado.

`-flag` _name_`=`_value_

Define o flag de linha de comando especificado para o valor especificado.

`-flags`

Imprime os flags de linha de comando passados para a JVM.

`-sysprops`

Imprime as propriedades de sistema Java como pares nome-valor.

`-h` ou `-help`

Imprime uma mensagem de ajuda.

### Neste tutorial

Apresentando o Jinfo Sinopse Descrição Opções para o Comando jinfo

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Jhsdb - Analisando o Core Dump de uma JVM Travada](<#/doc/tutorials/jvm/tool/troubleshooting/jhsdb>)

➜

**Tutorial Atual**

Jinfo - Gerando Informações de Configuração Java

➜

**Próximo na Série**

[Jmap - Imprimindo Detalhes de um Processo](<#/doc/tutorials/jvm/tool/troubleshooting/jmap>)

**Anterior na Série:** [Jhsdb - Analisando o Core Dump de uma JVM Travada](<#/doc/tutorials/jvm/tool/troubleshooting/jhsdb>)

**Próximo na Série:** [Jmap - Imprimindo Detalhes de um Processo](<#/doc/tutorials/jvm/tool/troubleshooting/jmap>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Solução de Problemas ](<#/doc/tutorials/jvm/tool/troubleshooting>) > Jinfo - Gerando Informações de Configuração Java