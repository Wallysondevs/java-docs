# Solucionar Problemas de Desempenho Usando o Flight Recorder

## 4 Solucionar Problemas de Desempenho Usando o Flight Recorder

Este capítulo descreve como identificar problemas de desempenho em uma aplicação Java e depurar esses problemas usando gravações de voo (flight recordings).

Para saber mais sobre como criar uma gravação com o Flight Recorder no Java Mission Control (JMC), consulte [Iniciar uma Gravação de Voo](<#/doc/guides/troubleshoot/diagnostic-tools>).

Os dados fornecidos pelo Flight Recorder ajudam a investigar problemas de desempenho. Nenhuma outra ferramenta oferece tantos dados de profiling sem distorcer os resultados com sua própria sobrecarga de desempenho. Este capítulo fornece informações sobre problemas de desempenho que você pode identificar e depurar usando dados do Flight Recorder.

Este capítulo contém as seguintes seções:

  * [Sobrecarga do Flight Recorder](<#/doc/guides/troubleshoot/troubleshoot-performance-issues-using-jfr>)

  * [Encontrar Gargalos](<#/doc/guides/troubleshoot/troubleshoot-performance-issues-using-jfr>)

  * [Desempenho do Garbage Collection](<#/doc/guides/troubleshoot/troubleshoot-performance-issues-using-jfr>)

  * [Desempenho de Sincronização](<#/doc/guides/troubleshoot/troubleshoot-performance-issues-using-jfr>)

  * [Desempenho de I/O](<#/doc/guides/troubleshoot/troubleshoot-performance-issues-using-jfr>)

  * [Desempenho da Execução de Código](<#/doc/guides/troubleshoot/troubleshoot-performance-issues-using-jfr>)

### Sobrecarga do Flight Recorder

Ao medir o desempenho, é importante considerar qualquer sobrecarga de desempenho adicionada pelo Flight Recorder. A sobrecarga será diferente dependendo da aplicação. Se você tiver testes de desempenho configurados, poderá medir se há alguma sobrecarga perceptível em sua aplicação.

A sobrecarga para gravar uma gravação de tempo fixo padrão (gravação de profiling) usando as configurações padrão é inferior a dois por cento para a maioria das aplicações. A execução com uma gravação contínua padrão geralmente não tem efeito mensurável no desempenho.

O uso de Heap Statistics, que é desabilitado por padrão, pode causar uma sobrecarga de desempenho significativa. Isso ocorre porque a habilitação de Heap Statistics aciona um old garbage collection no início e no final da execução do teste. Esses GCs antigos adicionam alguns tempos de pausa extras à aplicação, portanto, se você estiver medindo a latência ou se seu ambiente for sensível a tempos de pausa, não execute com Heap Statistics habilitado. O recurso Heap Statistics é útil ao depurar vazamentos de memória ou ao investigar o conjunto de objetos vivos da aplicação. Para obter mais informações, consulte [A ferramenta jfr](<#/doc/guides/troubleshoot/troubleshooting-memory-leaks>).

Nota:

Para casos de uso de profiling de desempenho, as estatísticas de heap podem não ser necessárias.

### Encontrar Gargalos

Diferentes aplicações têm diferentes gargalos. Esperar por I/O ou rede, sincronização entre threads, uso da CPU ou tempos de garbage collection podem causar gargalos em uma aplicação. É possível que uma aplicação tenha mais de um gargalo.

Tópicos:

  * [Encontrar Gargalos](<#/doc/guides/troubleshoot/troubleshoot-performance-issues-using-jfr>)

  * [Usar a Ferramenta jfr para Encontrar Gargalos](<#/doc/guides/troubleshoot/troubleshoot-performance-issues-using-jfr>)

#### Encontrar Gargalos

Diferentes aplicações têm diferentes gargalos. Para algumas aplicações, um gargalo pode ser a espera por I/O ou rede, pode ser a sincronização entre threads, ou pode ser o uso real da CPU. Para outras, um gargalo pode ser os tempos de garbage collection. É possível que uma aplicação tenha mais de um gargalo.

Uma maneira de encontrar os gargalos da aplicação é observar os seguintes eventos em sua gravação de voo. Certifique-se de que todos esses eventos estejam habilitados no template de gravação que você está usando:

  * `jdk.FileRead`
  * `jdk.FileWrite`
  * `jdk.SocketRead`
  * `jdk.SocketWrite`
  * `jdk.JavaErrorThrow`
  * `jdk.JavaExceptionThrow`
  * `jdk.JavaMonitorEnter`
  * `jdk.JavaMonitorWait`
  * `jdk.ThreadStart`
  * `jdk.ThreadEnd`
  * `jdk.ThreadSleep`
  * `jdk.ThreadPark`

Os eventos selecionados da Aplicação Java têm a importante propriedade de serem todos eventos de "thread-stalling". O "thread stalling" indica que a thread não estava executando sua aplicação durante o evento, e todos são eventos de duração. O evento de duração mede o tempo que a aplicação não estava em execução.

Use a ferramenta `jfr` para imprimir os eventos que foram gravados e procure as seguintes informações:

  * Eventos `jdk.JavaMonitorWait` mostram quanto tempo uma thread gasta esperando por um monitor.
  * Eventos `jdk.ThreadSleep` e `jdk.ThreadPark` mostram quando uma thread está dormindo ou estacionada.
  * Eventos de leitura e escrita mostram quanto tempo é gasto em I/O.

Se as threads importantes de sua aplicação Java gastam muito tempo bloqueadas, isso significa que uma seção crítica da aplicação é single-threaded, o que é um gargalo. Se a aplicação Java gasta muito tempo esperando por sockets, então o principal gargalo pode estar na rede ou com as outras máquinas com as quais a aplicação se comunica. Se as threads importantes de sua aplicação Java estão gastando muito tempo sem gerar nenhum evento da aplicação, então o gargalo na aplicação é o tempo gasto executando código ou a própria CPU. Cada um desses gargalos pode ser investigado mais a fundo dentro da gravação de voo.

Nota:

Para a maioria dos tipos de eventos da Aplicação Java, apenas eventos com duração superior a 20 ms são gravados. (Este limite pode ser modificado ao iniciar a gravação de voo.) Em resumo, as áreas podem não ter eventos gravados porque a aplicação está realizando muitas tarefas curtas, como escrever em um arquivo (uma pequena parte de cada vez) ou gastar tempo em sincronização por períodos muito curtos.

#### Usar a Ferramenta jfr para Encontrar Gargalos

Diferentes aplicações têm diferentes gargalos. Para algumas aplicações, um gargalo pode ser a espera por I/O ou rede, pode ser a sincronização entre threads, ou pode ser o uso real da CPU. Para outras, um gargalo pode ser os tempos de garbage collection. É possível que uma aplicação tenha mais de um gargalo.

Uma maneira de encontrar os gargalos da aplicação é observar os seguintes eventos em sua gravação de voo. Certifique-se de que todos esses eventos estejam habilitados no template de gravação que você está usando:

  * `jdk.FileRead`
  * `jdk.FileWrite`
  * `jdk.SocketRead`
  * `jdk.SocketWrite`
  * `jdk.JavaErrorThrow`
  * `jdk.JavaExceptionThrow`
  * `jdk.JavaMonitorEnter`
  * `jdk.JavaMonitorWait`
  * `jdk.ThreadStart`
  * `jdk.ThreadEnd`
  * `jdk.ThreadSleep`
  * `jdk.ThreadPark`

Os eventos selecionados da Aplicação Java têm a importante propriedade de serem todos eventos de "thread-stalling". O "thread stalling" indica que a thread não estava executando sua aplicação durante o evento, e todos são eventos de duração. O evento de duração mede o tempo que a aplicação não estava em execução.

Use a ferramenta `jfr` para imprimir os eventos que foram gravados e procure as seguintes informações:

  * Eventos `jdk.JavaMonitorWait` mostram quanto tempo uma thread gasta esperando por um monitor.
  * Eventos `jdk.ThreadSleep` e `jdk.ThreadPark` mostram quando uma thread está dormindo ou estacionada.
  * Eventos de leitura e escrita mostram quanto tempo é gasto em I/O.

Se as threads importantes de sua aplicação Java gastam muito tempo bloqueadas, isso significa que uma seção crítica da aplicação é single-threaded, o que é um gargalo. Se a aplicação Java gasta muito tempo esperando por sockets, então o principal gargalo pode estar na rede ou com as outras máquinas com as quais a aplicação se comunica. Se as threads importantes de sua aplicação Java estão gastando muito tempo sem gerar nenhum evento da aplicação, então o gargalo na aplicação é o tempo gasto executando código ou a própria CPU. Cada um desses gargalos pode ser investigado mais a fundo dentro da gravação de voo.

Nota:

Para a maioria dos tipos de eventos da Aplicação Java, apenas eventos com duração superior a 20 ms são gravados. (Este limite pode ser modificado ao iniciar a gravação de voo.) Em resumo, as áreas podem não ter eventos gravados porque a aplicação está realizando muitas tarefas curtas, como escrever em um arquivo (uma pequena parte de cada vez) ou gastar tempo em sincronização por períodos muito curtos.

### Desempenho do Garbage Collection

Gravações de voo podem ajudar a diagnosticar problemas de garbage collection em aplicações Java.

Tópicos:

  * [Usar o JDK Mission Control para Depurar Problemas de Garbage Collection](<#/doc/guides/troubleshoot/troubleshoot-performance-issues-using-jfr>)

  * [Usar a Ferramenta jfr para Depurar Problemas de Garbage Collection](<#/doc/guides/troubleshoot/troubleshoot-performance-issues-using-jfr>)

#### Usar o JDK Mission Control para Depurar Problemas de Garbage Collection

Você pode usar o JMC para depurar problemas de garbage collections (GC).

A otimização do HotSpot Garbage Collector pode ter um grande efeito no desempenho. Consulte o [Guia de Otimização do Garbage Collection](<#/>) para informações gerais.

Faça uma gravação de voo de profiling de sua aplicação em execução. Não inclua as estatísticas de heap, pois isso acionará garbage collections antigas adicionais. Para obter uma boa amostra, faça uma gravação mais longa, por exemplo, de uma hora.

Abra a gravação no JMC. Observe a seção Garbage Collections na página Automated Analysis Results. Aqui está uma figura de exemplo de uma gravação, que fornece um instantâneo do desempenho do garbage collection durante o tempo de execução.

Figura 4-1 Resultados da Análise Automatizada - Garbage Collections

[Descrição de "Figura 4-1 Resultados da Análise Automatizada - Garbage Collections"](<#/>)

Você pode observar na figura que há um evento Full GC. Isso é indicativo do fato de que a aplicação precisa de mais memória do que a alocada.

Para uma análise mais aprofundada, abra a página Garbage Collections na página JVM Internals para investigar o impacto geral do GC no desempenho. Aqui está uma figura de exemplo de uma gravação, que mostra um gráfico com pausas de GC.

Figura 4-2 Desempenho do Garbage Collection - Pausas de GC

[Descrição de "Figura 4-2 Desempenho do Garbage Collection - Pausas de GC"](<#/>)

No gráfico, observe a Soma das Pausas da gravação. A Soma das Pausas é a quantidade total de tempo que a aplicação ficou pausada durante um GC. Muitos GCs fazem a maior parte do seu trabalho em segundo plano. Nesses casos, a duração do GC não importa e o que importa é quanto tempo a aplicação realmente teve que parar. Portanto, a Soma das Pausas é uma boa medida para o efeito do GC.

Os principais problemas de desempenho com garbage collections geralmente são que GCs individuais demoram muito, ou que muito tempo é gasto em GCs pausados (pausas totais de GC).

Quando um GC individual demora muito, pode ser necessário alterar a estratégia de GC. Diferentes GCs têm diferentes trade-offs quando se trata de tempos de pausa versus desempenho de throughput. Consulte [Otimização Baseada em Comportamento](<#/>) no Guia de Otimização do Garbage Collection da Java Platform, Standard Edition HotSpot Virtual Machine.

Além disso, você também pode precisar corrigir sua aplicação para que ela faça menos uso de finalizers ou semireferences. Consulte [Monitorando os Objetos Pendentes de Finalização](<#/doc/guides/troubleshoot/troubleshooting-memory-leaks>) e [Finalização e Referências Fracas, Suaves e Fantasmas](<#/>) no Guia de Otimização do Garbage Collection da Java Platform, Standard Edition HotSpot Virtual Machine para obter informações sobre como detectar e migrar da finalização.

Se a aplicação gasta muito tempo pausada, você pode procurar diferentes maneiras de superar isso. Uma maneira é aumentar o tamanho do heap Java. Observe a página GC Configuration para estimar o tamanho do heap usado pela aplicação e altere o tamanho inicial do heap e o tamanho máximo do heap para um valor mais alto. Quanto maior o heap, maior o tempo entre os GCs. Fique atento a quaisquer vazamentos de memória na aplicação Java, pois isso pode causar GCs mais frequentes até que um `OutOfMemoryError` seja lançado. Para obter mais informações, consulte [A ferramenta jfr](<#/doc/guides/troubleshoot/troubleshooting-memory-leaks>). Outra maneira de reduzir os ciclos de GC é alocar menos objetos temporários. Na página TLAB Allocations, observe quanta memória é alocada ao longo da gravação. Objetos pequenos são alocados em um Thread Local Area Buffer (TLAB). TLAB é uma pequena área de memória onde novos objetos são alocados. Uma vez que um TLAB está cheio, a thread obtém um novo. Objetos maiores são alocados fora de um TLAB. Frequentemente, a maioria das alocações acontece dentro de um TLAB. Por fim, para reduzir a necessidade de GCs, diminua a taxa de alocação. Selecione a página TLAB Allocations e, em seguida, observe os locais de alocação que têm a maior pressão de memória. Você pode visualizá-lo por classe ou thread para ver qual consome mais alocação.

Algumas outras configurações também podem aumentar o desempenho do GC da aplicação Java. Consulte o [Guia de Otimização do Garbage Collection](<#/>) na Java Platform, Standard Edition HotSpot Virtual Machine Garbage Collection Tuning Guide para obter mais informações sobre o desempenho do GC.

#### Usar a Ferramenta jfr para Depurar Problemas de Garbage Collection

Gravações do Flight Recorder podem ajudar a diagnosticar problemas de aplicações Java com garbage collections.

A otimização do HotSpot Garbage Collector pode ter um grande efeito no desempenho. Consulte [Introdução à Otimização do Garbage Collection](<#/>) no Guia de Otimização do Garbage Collection da Java Platform, Standard Edition HotSpot Virtual Machine para obter mais informações.

Para investigar problemas de garbage collection, faça uma gravação de voo de profiling de sua aplicação enquanto ela está em execução. Não inclua as estatísticas de heap, pois isso aciona collections extras antigas. Para obter uma boa amostra, faça uma gravação mais longa, por exemplo, de 1 hora.

Use a ferramenta `jfr` para imprimir os eventos `jdk.GCPhasePause` que foram gravados. O exemplo a seguir mostra as informações contidas no evento:
```
    c:\Program Files\Java\jdk-15\bin>jfr print --events jdk.GCPhasePause \
       gctest.jfr
    jdk.GCPhasePause {
      startTime = 11:19:13.779
      duration = 3.419 ms
      gcId = 1
      name = "GC Pause"
      eventThread = "VM Thread" (osThreadId = 17528)
    }
```

Usando as informações dos eventos `jdk.GCPhasePause`, você pode calcular a soma média das pausas para cada GC, a soma máxima das pausas e o tempo total de pausa. A soma das pausas é a quantidade total de tempo que a aplicação ficou pausada durante um GC. Muitos GCs fazem a maior parte do seu trabalho em segundo plano. Nesses casos, a duração do GC não importa e o que importa é quanto tempo a aplicação realmente teve que parar. Portanto, a soma das pausas é uma boa medida para o efeito do GC.

Os principais problemas de desempenho com garbage collections geralmente são que GCs individuais demoram muito, ou que muito tempo é gasto em GCs pausados (pausas totais de GC).

Quando um GC individual demora muito, pode ser necessário alterar a estratégia de GC. Diferentes GCs têm diferentes trade-offs quando se trata de tempos de pausa versus desempenho de throughput. Consulte [Otimização Baseada em Comportamento](<#/>) no Guia de Otimização do Garbage Collection da Java Platform, Standard Edition HotSpot Virtual Machine.

Além disso, você também pode precisar corrigir sua aplicação para que ela faça menos uso de finalizers ou semireferences. Consulte [Monitorando os Objetos Pendentes de Finalização](<#/doc/guides/troubleshoot/troubleshooting-memory-leaks>) e [Finalização e Referências Fracas, Suaves e Fantasmas](<#/>) no Guia de Otimização do Garbage Collection da Java Platform, Standard Edition HotSpot Virtual Machine para obter informações sobre como detectar e migrar da finalização.

Quando a aplicação gasta muito tempo pausada, existem diferentes maneiras de contornar isso:

  * Aumente o tamanho do heap Java. Quanto maior o heap Java, maior o tempo entre os GCs. Fique atento a quaisquer vazamentos de memória na aplicação Java, pois isso pode causar GCs cada vez mais frequentes até que um `OutOfMemoryError` seja lançado. Para obter mais informações, consulte [A ferramenta jfr](<#/doc/guides/troubleshoot/troubleshooting-memory-leaks>).

  * Para reduzir o número de GCs, aloque menos objetos temporários. Objetos pequenos são alocados em um Thread Local Area Buffer (TLAB). TLAB é uma pequena área de memória onde novos objetos são alocados. Uma vez que um TLAB está cheio, a thread obtém um novo. Objetos maiores são alocados fora de um TLAB. Frequentemente, a maioria das alocações acontece dentro de um TLAB. Os eventos `jdk.ObjectAllocationInNewTLAB` e `jdk.ObjectAllocationOutsideTLAB` fornecem informações sobre a alocação de objetos temporários.

  * Para reduzir a necessidade de GCs, diminua a taxa de alocação. O evento `jdk.ThreadAllocationStatistics` fornece informações sobre as alocações por thread.

Algumas outras configurações também podem aumentar o desempenho do GC da aplicação Java. Consulte [Garbage Collection Garbage-First](<#/>) no Guia de Otimização do Garbage Collection da Java Platform, Standard Edition HotSpot Virtual Machine para obter mais informações sobre o desempenho do GC.

### Desempenho de Sincronização

Aplicações Java encontram problemas de sincronização quando as threads da aplicação gastam muito tempo esperando para entrar em um monitor.

Tópicos:

  * [Desempenho de Sincronização](<#/doc/guides/troubleshoot/troubleshoot-performance-issues-using-jfr>)

  * [Usar Eventos jdk.JavaMonitorWait para Depurar Problemas de Sincronização](<#/doc/guides/troubleshoot/troubleshoot-performance-issues-using-jfr>)

#### Desempenho de Sincronização

Para depurar problemas de sincronização de aplicações Java, onde as threads da aplicação gastam muito tempo esperando para entrar em um monitor, observe os eventos `jdk.JavaMonitorWait` em uma gravação do Flight Recorder.

Observe os locks que são mais disputados e o stack trace das threads esperando para adquirir o lock. Tipicamente, procure por contenção que você não esperava que fosse um problema. O logging é uma área comum que pode ser um gargalo inesperado em algumas aplicações.

Quando você observa degradação de desempenho após uma atualização de programa ou em momentos específicos na aplicação Java, faça uma gravação de voo quando as coisas estiverem boas e faça outra quando as coisas estiverem ruins para procurar um local de sincronização que aumente muito.

Nota:

Por padrão, eventos de contenção com duração superior a 20 ms são gravados. Este limite pode ser modificado ao iniciar a gravação de voo. Limites mais curtos geram mais eventos e também potencialmente mais sobrecarga. Se você acredita que a contenção é um problema, então você pode fazer uma gravação mais curta com um limite muito baixo de apenas alguns milissegundos. Quando isso é feito em uma aplicação em produção, certifique-se de começar com uma gravação muito curta e monitore a sobrecarga de desempenho.

#### Usar Eventos jdk.JavaMonitorWait para Depurar Problemas de Sincronização

Para depurar problemas de sincronização de aplicações Java, onde as threads da aplicação gastam muito tempo esperando para entrar em um monitor, observe os eventos `jdk.JavaMonitorWait` em uma gravação do Flight Recorder.

Observe os locks que são mais disputados e o stack trace das threads esperando para adquirir o lock. Tipicamente, procure por contenção que você não esperava que fosse um problema. O logging é uma área comum que pode ser um gargalo inesperado em algumas aplicações.

Quando você observa degradação de desempenho após uma atualização de programa ou em momentos específicos na aplicação Java, faça uma gravação de voo quando as coisas estiverem boas e faça outra quando as coisas estiverem ruins para procurar um local de sincronização que aumente muito.

Nota:

Por padrão, eventos de contenção com duração superior a 20 ms são gravados. Este limite pode ser modificado ao iniciar a gravação de voo. Limites mais curtos geram mais eventos e também potencialmente mais sobrecarga. Se você acredita que a contenção é um problema, então você pode fazer uma gravação mais curta com um limite muito baixo de apenas alguns milissegundos. Quando isso é feito em uma aplicação em produção, certifique-se de começar com uma gravação muito curta e monitore a sobrecarga de desempenho.

### Desempenho de I/O

Gravações de voo podem ajudar a diagnosticar problemas de desempenho de I/O em aplicações Java.

Tópicos:

  * [Desempenho de I/O](<#/doc/guides/troubleshoot/troubleshoot-performance-issues-using-jfr>)

  * [Usar os Eventos de Leitura e Escrita de Socket para Depurar Problemas de I/O](<#/doc/guides/troubleshoot/troubleshoot-performance-issues-using-jfr>)

#### Desempenho de I/O

Quando uma aplicação Java gasta muito tempo lendo ou escrevendo sockets ou arquivos, então I/O ou rede podem ser o gargalo. Gravações do Flight Recorder podem ajudar a identificar áreas problemáticas.

Para diagnosticar problemas de I/O em aplicações, observe os seguintes eventos em sua gravação de voo. Certifique-se de que todos esses eventos estejam habilitados no template de gravação que você está usando:

  * `jdk.SocketWrite`
  * `jdk.SocketRead`
  * `jdk.FileWrite`
  * `jdk.FileRead`

Use as informações de leitura e escrita de socket em sua gravação de voo para calcular o número de leituras de um endereço remoto específico, o número total de bytes lidos e o tempo total gasto esperando. Observe cada evento para analisar o tempo gasto e os dados lidos.

Problemas de I/O de arquivo ou rede são diagnosticados de forma semelhante. Observe os arquivos mais lidos ou escritos, e então veja cada leitura/escrita de arquivo e o tempo gasto em I/O.

Por padrão, apenas eventos com duração superior a 20 ms são gravados. Ao iniciar uma gravação de voo, você pode diminuir o limite de I/O de arquivo ou o limite de I/O de socket para coletar mais dados, potencialmente com um efeito de desempenho maior.

#### Usar os Eventos de Leitura e Escrita de Socket para Depurar Problemas de I/O

Quando uma aplicação Java gasta muito tempo lendo ou escrevendo sockets ou arquivos, então I/O ou rede podem ser o gargalo. Gravações do Flight Recorder podem ajudar a identificar áreas problemáticas.

Para diagnosticar problemas de I/O em aplicações, observe os seguintes eventos em sua gravação de voo. Certifique-se de que todos esses eventos estejam habilitados no template de gravação que você está usando:

  * `jdk.SocketWrite`
  * `jdk.SocketRead`
  * `jdk.FileWrite`
  * `jdk.FileRead`

Use as informações de leitura e escrita de socket em sua gravação de voo para calcular o número de leituras de um endereço remoto específico, o número total de bytes lidos e o tempo total gasto esperando. Observe cada evento para analisar o tempo gasto e os dados lidos.

Problemas de I/O de arquivo ou rede são diagnosticados de forma semelhante. Observe os arquivos mais lidos ou escritos, e então veja cada leitura/escrita de arquivo e o tempo gasto em I/O.

Por padrão, apenas eventos com duração superior a 20 ms são gravados. Ao iniciar uma gravação de voo, você pode diminuir o limite de I/O de arquivo ou o limite de I/O de socket para coletar mais dados, potencialmente com um efeito de desempenho maior.

### Desempenho da Execução de Código

Gravações de voo podem ajudar a diagnosticar problemas de desempenho da execução de código em aplicações Java.

Tópicos:

  * [Desempenho da Execução de Código](<#/doc/guides/troubleshoot/troubleshoot-performance-issues-using-jfr>)

  * [Usar Eventos jdk.CPULoad e jdk.ThreadCPULoad para Monitorar o Desempenho da Execução de Código](<#/doc/guides/troubleshoot/troubleshoot-performance-issues-using-jfr>)

#### Desempenho da Execução de Código

Quando não há muitos eventos da Aplicação Java, pode ser que o principal gargalo de sua aplicação seja o código em execução. Gravações do Flight Recorder podem ajudar a identificar áreas problemáticas.

Observe os eventos `jdk.CPULoad` e revise o uso da CPU ao longo do tempo. Isso mostra o uso da CPU da JVM que está sendo gravada e o uso total da CPU na máquina. Se o uso da CPU da JVM for baixo, mas o uso da CPU da máquina for alto, então alguma outra aplicação provavelmente está consumindo muita CPU. Nesse caso, observe as outras aplicações em execução no sistema usando ferramentas do sistema operacional como Top ou o gerenciador de tarefas para descobrir quais processos estão usando muita CPU.

Caso sua aplicação esteja usando muito tempo de CPU, observe os eventos `jdk.ThreadCPULoad` e identifique as threads que usam mais tempo de CPU. Esta informação é baseada em amostragem de método (method sampling), então pode não ser 100% precisa se a contagem de amostras for baixa. Quando uma gravação está em execução, a JVM amostra as threads. Por padrão, uma gravação contínua faz apenas alguma amostragem de método, enquanto uma gravação de profiling faz o máximo possível. A amostragem de método coleta dados apenas das threads que estão executando código. As threads esperando por I/O, dormindo, esperando por locks, e assim por diante, não são amostradas. Portanto, as threads com muitas amostras de método são as que usam mais tempo de CPU; no entanto, não se sabe quanto de CPU é usado por cada thread.

A aba Hot Methods no grupo de abas Code ajuda a descobrir onde sua aplicação gasta a maior parte do tempo de execução. Esta aba mostra todas as amostras agrupadas pelo método superior na pilha. Use a aba Call Tree para começar com o método mais baixo nas stack traces e então subir. Começa com `Thread.run` e então observa as chamadas que foram mais amostradas.

#### Usar Eventos jdk.CPULoad e jdk.ThreadCPULoad para Monitorar o Desempenho da Execução de Código

Quando não há muitos eventos da Aplicação Java, pode ser que o principal gargalo de sua aplicação seja o código em execução. Gravações do Flight Recorder podem ajudar a identificar áreas problemáticas.

Observe os eventos `jdk.CPULoad` e revise o uso da CPU ao longo do tempo. Isso mostra o uso da CPU da JVM que está sendo gravada e o uso total da CPU na máquina. Se o uso da CPU da JVM for baixo, mas o uso da CPU da máquina for alto, então alguma outra aplicação provavelmente está consumindo muita CPU. Nesse caso, observe as outras aplicações em execução no sistema usando ferramentas do sistema operacional como Top ou o gerenciador de tarefas para descobrir quais processos estão usando muita CPU.

Caso sua aplicação esteja usando muito tempo de CPU, observe os eventos `jdk.ThreadCPULoad` e identifique as threads que usam mais tempo de CPU. Esta informação é baseada em amostragem de método (method sampling), então pode não ser 100% precisa se a contagem de amostras for baixa. Quando uma gravação está em execução, a JVM amostra as threads. Por padrão, uma gravação contínua faz apenas alguma amostragem de método, enquanto uma gravação de profiling faz o máximo possível. A amostragem de método coleta dados apenas das threads que estão executando código. As threads esperando por I/O, dormindo, esperando por locks, e assim por diante, não são amostradas. Portanto, as threads com muitas amostras de método são as que usam mais tempo de CPU; no entanto, não se sabe quanto de CPU é usado por cada thread.

A aba Hot Methods no grupo de abas Code ajuda a descobrir onde sua aplicação gasta a maior parte do tempo de execução. Esta aba mostra todas as amostras agrupadas pelo método superior na pilha. Use a aba Call Tree para começar com o método mais baixo nas stack traces e então subir. Começa com `Thread.run` e então observa as chamadas que foram mais amostradas.