# Jhsdb - Analisando o Core Dump de uma JVM Travada

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Solução de Problemas ](<#/doc/tutorials/jvm/tool/troubleshooting>) > Jhsdb - Analisando o Core Dump de uma JVM Travada

**Anterior na Série**

[Jdb - Corrigindo Bugs em Programas Java](<#/doc/tutorials/jvm/tool/troubleshooting/jdb>)

➜

**Tutorial Atual**

Jhsdb - Analisando o Core Dump de uma JVM Travada

➜

**Próximo na Série**

[Jinfo - Gerando Informações de Configuração Java](<#/doc/tutorials/jvm/tool/troubleshooting/jinfo>)

**Anterior na Série:** [Jdb - Corrigindo Bugs em Programas Java](<#/doc/tutorials/jvm/tool/troubleshooting/jdb>)

**Próximo na Série:** [Jinfo - Gerando Informações de Configuração Java](<#/doc/tutorials/jvm/tool/troubleshooting/jinfo>)

# Jhsdb - Analisando o Core Dump de uma JVM Travada

## Introduzindo Jhsdb

[jhsdb](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jhsdb.html>) - anexa a um processo Java ou inicia um depurador post-mortem para analisar o conteúdo de um core dump de uma Java Virtual Machine (JVM) travada

## Sinopse

_pid_

O ID do processo ao qual a ferramenta `jhsdb` deve se anexar. O processo deve ser um processo Java. Para obter uma lista de processos Java em execução em uma máquina, use o comando `ps` ou, se os processos da JVM não estiverem sendo executados em uma instância docker separada, o comando [jps](<#/doc/tutorials/jvm/tools/monitoring/jps>).

_executável_

O arquivo executável Java do qual o core dump foi produzido.

_coredump_

O arquivo core ao qual a ferramenta `jhsdb` deve se anexar.

`[server-id@]debugd-host`

Um ID de servidor opcional e o endereço do servidor de depuração remoto (debugd).

_opções_

As opções de linha de comando para um modo `jhsdb`. Veja Opções para o Modo debugd, Opções para o Modo jstack, Opções para o Modo jmap, Opções para o Modo jinfo e Opções para o Modo jsnap.

**Nota:**

Ou o _pid_ ou o par de arquivos _executável_ e _coredump_ ou o `[server-id@]debugd-host` deve ser fornecido para os modos `debugd`, `jstack`, `jmap`, `jinfo` e `jsnap`.

## Descrição

Você pode usar a ferramenta `jhsdb` para se anexar a um processo Java ou para iniciar um depurador post-mortem para analisar o conteúdo de um core-dump de uma Java Virtual Machine (JVM) travada. Este comando é experimental e não suportado.

**Nota:**

Anexar a ferramenta `jhsdb` a um processo em execução fará com que o processo trave e o processo provavelmente irá falhar quando o depurador se desanexar.

A ferramenta `jhsdb` pode ser iniciada em qualquer um dos seguintes modos:

`jhsdb clhsdb`

Inicia o depurador interativo de linha de comando.

`jhsdb hsdb`

Inicia o depurador GUI interativo.

`jhsdb debugd`

Inicia o servidor de depuração remoto.

`jhsdb jstack`

Imprime informações de stack e locks.

`jhsdb jmap`

Imprime informações de heap.

`jhsdb jinfo`

Imprime informações básicas da JVM.

`jhsdb jsnap`

Imprime informações de contador de desempenho.

`jhsdb` _comando_ `--help`

Exibe as opções disponíveis para o _comando_.

## Opções para o Modo debugd

`--serverid` _server-id_

Um ID único opcional para este servidor de depuração. Isso é necessário se vários servidores de depuração estiverem sendo executados na mesma máquina.

`--rmiport` _porta_

Define o número da porta à qual o conector RMI está vinculado. Se não especificado, uma porta disponível aleatória é usada.

`--registryport` _porta_

Define a porta do registro RMI. Esta opção sobrescreve a propriedade de sistema 'sun.jvm.hotspot.rmi.port'. Se não especificado, a propriedade de sistema é usada. Se a propriedade de sistema não estiver definida, a porta padrão 1099 é usada.

`--hostname` _hostname_

Define o hostname ao qual o conector RMI está vinculado. O valor pode ser um hostname ou um endereço IPv4/IPv6. Esta opção sobrescreve a propriedade de sistema 'java.rmi.server.hostname'. Se não especificado, a propriedade de sistema é usada. Se a propriedade de sistema não estiver definida, um hostname do sistema é usado.

## Opções para o Modo jinfo

`--flags`

Imprime as flags da VM.

`--sysprops`

Imprime as propriedades de sistema Java.

nenhuma opção

Imprime as flags da VM e as propriedades de sistema Java.

## Opções para o Modo jmap

nenhuma opção

Imprime as mesmas informações que `pmap`.

`--heap`

Imprime o resumo do heap `java`.

`--binaryheap`

Despeja o heap `java` no formato binário `hprof`.

`--dumpfile` _nome_

O nome do arquivo de despejo.

`--histo`

Imprime o histograma do heap de objetos `java`.

`--clstats`

Imprime as estatísticas do class loader.

`--finalizerinfo`

Imprime as informações sobre objetos aguardando finalização.

## Opções para o Modo jstack

`--locks`

Imprime as informações de locks de `java.util.concurrent`.

`--mixed`

Tenta imprimir frames `java` e nativos se a plataforma permitir.

## Opções para o Modo jsnap

`--all`

Imprime todos os contadores de desempenho.

### Neste tutorial

Introduzindo Jhsdb Sinopse Descrição Opções para o Modo debugd Opções para o Modo jinfo Opções para o Modo jmap Opções para o Modo jstack Opções para o Modo jsnap

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Jdb - Corrigindo Bugs em Programas Java](<#/doc/tutorials/jvm/tool/troubleshooting/jdb>)

➜

**Tutorial Atual**

Jhsdb - Analisando o Core Dump de uma JVM Travada

➜

**Próximo na Série**

[Jinfo - Gerando Informações de Configuração Java](<#/doc/tutorials/jvm/tool/troubleshooting/jinfo>)

**Anterior na Série:** [Jdb - Corrigindo Bugs em Programas Java](<#/doc/tutorials/jvm/tool/troubleshooting/jdb>)

**Próximo na Série:** [Jinfo - Gerando Informações de Configuração Java](<#/doc/tutorials/jvm/tool/troubleshooting/jinfo>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Solução de Problemas ](<#/doc/tutorials/jvm/tool/troubleshooting>) > Jhsdb - Analisando o Core Dump de uma JVM Travada