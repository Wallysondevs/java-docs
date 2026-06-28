# Rastreamento de Memória Nativa

## 9 Rastreamento de Memória Nativa

Este capítulo descreve o recurso Native Memory Tracking (NMT). NMT é um recurso da Java Hotspot VM que rastreia o uso interno de memória para uma HotSpot VM. Você pode acessar os dados do NMT usando o utilitário `jcmd`. O NMT não rastreia alocações de memória para código nativo de terceiros e bibliotecas de classes do Oracle Java Development Kit (JDK). O NMT não inclui o `MBean` do NMT na HotSpot para o Java Mission Control (JMC).

Tópicos:

  * [Principais Recursos](<#/doc/guides/vm/native-memory-tracking>)
  * [Usando o Native Memory Tracking](<#/doc/guides/vm/native-memory-tracking>)
    * [Habilitando o NMT](<#/doc/guides/vm/native-memory-tracking>)
    * [Acessando Dados do NMT usando jcmd](<#/doc/guides/vm/native-memory-tracking>)
  * [Obtendo Dados do NMT na Saída da VM](<#/doc/guides/vm/native-memory-tracking>)

### Principais Recursos

Ao usar o Native Memory Tracking com `jcmd`, você pode rastrear o uso de memória da Java Virtual Machine (JVM) ou HotSpot VM em diferentes níveis. O NMT rastreia apenas a memória que a JVM ou HotSpot VM usa, não a memória nativa do usuário. O NMT não fornece informações completas para a memória usada pelo arquivo de compartilhamento de dados de classe (CDS).

O NMT para HotSpot VM está desativado por padrão. Você pode ativar o NMT usando a opção de linha de comando da JVM. Consulte [O Comando java](<#/>) nas Especificações da Ferramenta do Java Development Kit para obter informações sobre opções avançadas de tempo de execução.

Você pode acessar o NMT usando o utilitário `jcmd`. Consulte [Use jcmd para Acessar Dados do NMT](<#/doc/guides/vm/native-memory-tracking>). Você pode parar o NMT usando o utilitário `jcmd`, mas não pode iniciar ou reiniciar o NMT usando o utilitário `jcmd`.

O NMT suporta os seguintes recursos:

  * Gerar relatórios de resumo e detalhe.

  * Estabelecer uma linha de base inicial para comparação posterior.

  * Solicitar um relatório de uso de memória na saída da JVM com a opção de linha de comando da JVM. Consulte [NMT na saída da VM](<#/doc/guides/vm/native-memory-tracking>).

### Usando o Native Memory Tracking

Você deve habilitar o NMT e então usar o utilitário `jcmd` para acessar os dados do NMT.

#### Habilitando o NMT

Para habilitar o NMT, use as seguintes opções de linha de comando:

`-XX:NativeMemoryTracking=[off | summary | detail]`

Nota:

Habilitar o NMT causa uma sobrecarga de desempenho de 5% a 10%.

A tabela a seguir descreve as opções de uso de linha de comando do NMT:

Tabela 9-1 Opções de Uso do NMT

Opções NMT | Descrição
---|---
`off` | O NMT está `off` por padrão.
`summary` | Coleta apenas o uso de memória agregado por subsistema.
`detail` | Coleta o uso de memória por locais de chamada individuais.

#### Acessando Dados do NMT usando jcmd

Use `jcmd` para despejar os dados coletados e, opcionalmente, comparar os dados com a última linha de base.

`jcmd <pid> VM.native_memory [summary | detail | baseline | summary.diff | detail.diff | shutdown] [scale= KB | MB | GB]`

Tabela 9-2 Opções do NMT para jcmd

Opção NMT do jcmd | Descrição
---|---
`summary` | Imprime um resumo, agregado por categoria.
`detail` |

  * Imprime o uso de memória, agregado por categoria
  * Imprime o mapa de memória virtual
  * Imprime o uso de memória, agregado por local de chamada

`baseline` | Cria um novo snapshot de uso de memória para comparação.
`summary.diff` | Imprime um novo relatório de resumo em comparação com a última linha de base.
`detail.diff` | Imprime um novo relatório detalhado em comparação com a última linha de base.
`shutdown` | Para o NMT.

### Obtendo Dados do NMT na Saída da VM

Para obter dados sobre o último uso de memória na saída da VM, quando o Native Memory Tracking está habilitado, use as seguintes opções de linha de comando de diagnóstico da VM. O nível de detalhe é baseado no nível de rastreamento.

`-XX:+UnlockDiagnosticVMOptions -XX:+PrintNMTStatistics`

Consulte [Native Memory Tracking](<#/>) no Guia de Solução de Problemas do Java Platform, Standard Edition para obter informações sobre como monitorar alocações de memória internas da VM e diagnosticar vazamentos de memória da VM.