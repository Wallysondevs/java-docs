# O Comando jhsdb

## Nome

jhsdb - anexa a um processo Java ou inicia um depurador post-mortem para analisar o conteúdo de um core dump de uma Java Virtual Machine (JVM) travada

## Sinopse

**AVISO:** O subcomando `debugd` e as opções `--connect` estão obsoletos. Eles serão removidos em uma versão futura.

`jhsdb` `clhsdb` [`--pid` _pid_ | `--exe` _executable_ `--core` _coredump_]

`jhsdb` `hsdb` [`--pid` _pid_ | `--exe` _executable_ `--core` _coredump_]

`jhsdb` `debugd` (`--pid` _pid_ | `--exe` _executable_ `--core` _coredump_) [_options_]

`jhsdb` `jstack` (`--pid` _pid_ | `--exe` _executable_ `--core` _coredump_ | `--connect` _[server-id@]debugd-host_) [_options_]

`jhsdb` `jmap` (`--pid` _pid_ | `--exe` _executable_ `--core` _coredump_ | `--connect` _[server-id@]debugd-host_) [_options_]

`jhsdb` `jinfo` (`--pid` _pid_ | `--exe` _executable_ `--core` _coredump_ | `--connect` _[server-id@]debugd-host_) [_options_]

`jhsdb` `jsnap` (`--pid` _pid_ | `--exe` _executable_ `--core` _coredump_ | `--connect` _[server-id@]debugd-host_) [_options_]

_pid_
     O ID do processo ao qual a ferramenta `jhsdb` deve se anexar. O processo deve ser um processo Java. Para obter uma lista de processos Java em execução em uma máquina, use o comando `ps` ou, se os processos JVM não estiverem sendo executados em uma instância docker separada, o comando [jps](<#/doc/guides/tools/jps>).
_executable_
     O arquivo executável Java do qual o core dump foi produzido.
_coredump_
     O arquivo core ao qual a ferramenta `jhsdb` deve se anexar.
_[server-id@]debugd-host_
     Um ID de servidor opcional e o endereço do servidor de depuração remoto (debugd).
_options_
     As opções de linha de comando para um modo `jhsdb`. Consulte Opções para o Modo debugd, Opções para o Modo jstack, Opções para o Modo jmap, Opções para o Modo jinfo e Opções para o Modo jsnap.

**Nota:**

Ou o _pid_ ou o par de arquivos _executable_ e _core_ ou o _[server-id@]debugd-host_ deve ser fornecido para os modos `debugd`, `jstack`, `jmap`, `jinfo` e `jsnap`.

## Descrição

Você pode usar a ferramenta `jhsdb` para anexar a um processo Java ou para iniciar um depurador post-mortem para analisar o conteúdo de um core-dump de uma Java Virtual Machine (JVM) travada. Este comando é experimental e não suportado.

**Nota:**

Anexar a ferramenta `jhsdb` a um processo ativo fará com que o processo trave e o processo provavelmente falhará quando o depurador for desanexado.

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
     Imprime informações do contador de desempenho.
`jhsdb` _command_ `--help`
     Exibe as opções disponíveis para o _command_.

## Opções para o Modo debugd

`--serverid` _server-id_
     Um ID único opcional para este servidor de depuração. Isso é necessário se vários servidores de depuração estiverem sendo executados na mesma máquina.
`--rmiport` _port_
     Define o número da porta à qual o conector RMI está vinculado. Se não especificado, uma porta disponível aleatória é usada.
`--registryport` _port_
     Define a porta do registro RMI. Esta opção substitui a propriedade de sistema 'sun.jvm.hotspot.rmi.port'. Se não especificado, a propriedade de sistema é usada. Se a propriedade de sistema não estiver definida, a porta padrão 1099 é usada.
`--hostname` _hostname_
     Define o hostname ao qual o conector RMI está vinculado. O valor pode ser um hostname ou um endereço IPv4/IPv6. Esta opção substitui a propriedade de sistema 'java.rmi.server.hostname'. Se não especificado, a propriedade de sistema é usada. Se a propriedade de sistema não estiver definida, um hostname do sistema é usado.

## Opções para o Modo jinfo

`--flags`
     Imprime as flags da VM.
`--sysprops`
     Imprime as propriedades de sistema Java.
no option
     Imprime as flags da VM e as propriedades de sistema Java.

## Opções para o Modo jmap

no option
     Imprime as mesmas informações que o `pmap` do Solaris.
`--heap`
     Imprime o resumo do heap `java`.
`--binaryheap`
     Despeja o heap `java` no formato binário `hprof`.
`--dumpfile` _name_
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