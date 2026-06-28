# Solucionar Problemas de Vazamentos de Memória

## 3 Solucionar Problemas de Vazamentos de Memória

Este capítulo fornece algumas sugestões para diagnosticar problemas envolvendo possíveis vazamentos de memória.

Se o tempo de execução da sua aplicação se tornar mais longo, ou se o sistema operacional parecer estar funcionando mais lentamente, isso pode ser uma indicação de um vazamento de memória. Em outras palavras, a memória virtual está sendo alocada, mas não está sendo liberada quando não é mais necessária. Eventualmente, a aplicação ou o sistema fica sem memória, e a aplicação termina anormalmente.

Este capítulo contém as seguintes seções:

  * [O Erro java.lang.OutOfMemoryError](<#/doc/guides/troubleshoot/troubleshooting-memory-leaks>)
  * [Detectando um Vazamento de Memória](<#/doc/guides/troubleshoot/troubleshooting-memory-leaks>)
  * [Diagnosticando Vazamentos de Memória Java](<#/doc/guides/troubleshoot/troubleshooting-memory-leaks>)
  * [Diagnosticando Vazamentos de Memória Nativa](<#/doc/guides/troubleshoot/troubleshooting-memory-leaks>)
  * [Monitorando os Objetos Pendentes de Finalização](<#/doc/guides/troubleshoot/troubleshooting-memory-leaks>)
  * [Solucionando um Crash em Vez de um Erro java.lang.OutOfMemoryError](<#/doc/guides/troubleshoot/troubleshooting-memory-leaks>)

### O Erro java.lang.OutOfMemoryError

Uma indicação comum de um vazamento de memória é o erro `java.lang.OutOfMemoryError`. Este erro indica que o garbage collector não consegue disponibilizar espaço para acomodar um novo objeto, e o heap não pode ser expandido ainda mais. Este erro também pode ser lançado quando há memória nativa insuficiente para suportar o carregamento de uma classe Java. Em raras instâncias, o erro é lançado quando uma quantidade excessiva de tempo está sendo gasta na execução da coleta de lixo, e pouca memória está sendo liberada.

O erro `java.lang.OutOfMemoryError` também pode ser lançado por código de biblioteca nativa quando uma alocação nativa não pode ser satisfeita (por exemplo, se o espaço de swap estiver baixo).

Um stack trace é impresso quando um erro `java.lang.OutOfMemoryError` é lançado.

Um passo inicial para diagnosticar um erro `java.lang.OutOfMemoryError` é determinar sua causa. Ele foi lançado porque o heap Java está cheio ou porque o heap nativo está cheio? Para ajudar a descobrir a causa, uma mensagem detalhada é anexada ao texto da exceção, conforme mostrado nos exemplos a seguir:

Mensagem Detalhada: Java heap space
    

Causa: A mensagem detalhada Java heap space indica que um objeto não pôde ser alocado no heap Java. Este erro não implica necessariamente um vazamento de memória. O problema pode ser tão simples quanto um problema de configuração, onde o tamanho de heap especificado (ou o tamanho padrão, se não for especificado) é insuficiente para a aplicação. O tamanho inicial e máximo do espaço de heap Java pode ser configurado usando as opções `-Xms` e `-Xmx`.

Em outros casos, e em particular para uma aplicação de longa duração, a mensagem pode indicar que a aplicação está retendo referências a objetos de forma não intencional, o que impede que os objetos sejam coletados pelo garbage collector. Este é o equivalente a um vazamento de memória na linguagem Java.

Nota:

As APIs que são chamadas por uma aplicação também podem estar retendo referências de objetos de forma não intencional.

Outra fonte potencial deste erro surge com aplicações que fazem uso excessivo de finalizadores. Se uma classe possui um método `finalize`, então objetos desse tipo não têm seu espaço recuperado no momento da coleta de lixo. Em vez disso, após a coleta de lixo, os objetos são enfileirados para finalização, que ocorre em um momento posterior. Nas implementações Oracle do Java Runtime, os finalizadores são executados por uma thread daemon que atende à fila de finalização. Se a thread não conseguir acompanhar a fila de finalização, o heap Java pode se encher, e este tipo de erro `java.lang.OutOfMemoryError` seria lançado. Um cenário que pode causar esta situação é quando uma aplicação cria threads de alta prioridade que fazem com que a fila de finalização aumente a uma taxa mais rápida do que a taxa em que a thread finalizadora está atendendo a essa fila.

    

Ação: Tente aumentar o tamanho do heap Java. Consulte [Monitorando os Objetos Pendentes de Finalização](<#/doc/guides/troubleshoot/troubleshooting-memory-leaks>) para saber mais sobre como monitorar objetos para os quais a finalização está pendente. Consulte [Finalização e Referências Fracas, Suaves e Fantasmas](<#/>) no Guia de Ajuste de Coleta de Lixo da Java Platform, Standard Edition HotSpot Virtual Machine para obter informações sobre como detectar e migrar da finalização.

Mensagem Detalhada: GC Overhead limit exceeded
    

Causa: A mensagem detalhada GC overhead limit exceeded indica que o garbage collector (GC) está sendo executado na maior parte do tempo, e a aplicação Java está progredindo muito lentamente. Após uma coleta de lixo, se a aplicação Java gasta mais de aproximadamente 98% do seu tempo realizando coleta de lixo e se está recuperando menos de 2% do heap e tem feito isso nas últimas cinco (constante em tempo de compilação) coletas de lixo consecutivas, então um erro `java.lang.OutOfMemoryError` é lançado. Este erro é tipicamente lançado porque a quantidade de dados ativos mal cabe no heap Java, deixando pouco espaço livre para novas alocações.

    

Ação: Aumente o tamanho do heap. O erro `java.lang.OutOfMemoryError` para GC Overhead limit exceeded pode ser desativado usando a flag de linha de comando `-XX:-UseGCOverheadLimit`.

Mensagem Detalhada: Requested array size exceeds VM limit
    

Causa: A mensagem detalhada "Requested array size exceeds VM limit" indica que a aplicação (ou APIs usadas por essa aplicação) tentou alocar um array com um tamanho maior do que o limite de implementação da VM, independentemente de quanto espaço de heap esteja disponível.

    

Ação: Certifique-se de que sua aplicação (ou APIs usadas por essa aplicação) aloque um array com um tamanho menor do que o limite de implementação da VM.

Mensagem Detalhada: Metaspace
    

Causa: Metadados de classe Java (a representação interna de uma classe Java pela máquina virtual) são alocados em memória nativa (referida aqui como Metaspace). Se o Metaspace para metadados de classe for esgotado, um erro `java.lang.OutOfMemoryError` com a mensagem detalhada Metaspace é lançado. A quantidade de Metaspace que pode ser usada para metadados de classe é limitada pelo parâmetro `MaxMetaSpaceSize`, que pode ser especificado na linha de comando. Quando a quantidade de memória nativa necessária para metadados de classe excede `MaxMetaSpaceSize`, um erro `java.lang.OutOfMemoryError` com a mensagem detalhada Metaspace é lançado.

    

Ação: Se `MaxMetaSpaceSize` foi especificado na linha de comando, aumente seu valor. O Metaspace é alocado do mesmo espaço de endereço que o heap Java. Reduzir o tamanho do heap Java disponibilizará mais espaço para o Metaspace. Essa troca é útil apenas se houver um excesso de espaço livre no heap Java. Consulte a ação a seguir para a mensagem detalhada Out of swap space.

Mensagem Detalhada: request size bytes for reason. Out of swap space?
    

Causa: A mensagem detalhada request size bytes for reason. Out of swap space? parece ser um erro `java.lang.OutOfMemoryError`. No entanto, o Java relata este erro aparente quando uma alocação do heap nativo falhou e o heap nativo pode estar próximo do esgotamento. A mensagem indica o tamanho (em bytes) da solicitação que falhou e o motivo da solicitação de memória. Geralmente, o motivo é o nome de um módulo fonte que relata a falha de alocação, embora às vezes indique o motivo real.

    

Ação: Quando este erro é lançado, a Java VM (JVM) invoca o mecanismo de tratamento de erro fatal: ele gera um arquivo de log de erro fatal, que contém informações úteis sobre a thread, o processo e o sistema no momento do crash. No caso de esgotamento do heap nativo, as informações de memória do heap e do mapa de memória no log podem ser úteis. Consulte [Log de Erro Fatal](<#/doc/guides/troubleshoot/location-fatal-error-log>).

Você pode precisar usar utilitários de solução de problemas do sistema operacional para diagnosticar o problema mais a fundo. Consulte [Ferramentas Nativas do Sistema Operacional](<#/doc/guides/troubleshoot/diagnostic-tools>).

Mensagem Detalhada: Compressed class space
    

Causa: Em plataformas de 64 bits, um ponteiro para metadados de classe pode ser representado por um offset de 32 bits (com `UseCompressedOops`). Isso é controlado pela flag de linha de comando `UseCompressedClassPointers` (`true` por padrão). Se `UseCompressedClassPointers` for `true`, a quantidade de espaço disponível para metadados de classe é fixada na quantidade `CompressedClassSpaceSize`. Se o espaço necessário para `UseCompressedClassPointers` exceder `CompressedClassSpaceSize`, um erro `java.lang.OutOfMemoryError` com a mensagem detalhada Compressed class space é lançado.

    

Ação: Aumente `CompressedClassSpaceSize` ou defina `UseCompressedClassPointers` como `false`.

Nota:

Existem limites para o tamanho aceitável de `CompressedClassSpaceSize`. Por exemplo `-XX:CompressedClassSpaceSize=4g`, excede os limites aceitáveis e resultará em uma mensagem como
```
    CompressedClassSpaceSize of 4294967296 is invalid; must be between 1048576 and 3221225472.
```

Nota:

Existe mais de um tipo de metadados de classe: metadados `-klass` e outros metadados. Apenas metadados `klass` são armazenados no espaço limitado por `CompressedClassSpaceSize`. Outros metadados são armazenados no Metaspace.

Mensagem Detalhada: reason stack_trace (Native method)
    

Causa: Esta mensagem detalhada indica que um método nativo encontrou uma falha de alocação. A diferença entre esta e a mensagem anterior é que a falha de alocação foi detectada em uma Java Native Interface (JNI) ou método nativo, em vez de na própria JVM.

    

Ação: Se este tipo de erro `java.lang.OutOfMemoryError` for lançado, você pode precisar usar utilitários nativos do sistema operacional para diagnosticar o problema mais a fundo. Consulte [Ferramentas Nativas do Sistema Operacional](<#/doc/guides/troubleshoot/diagnostic-tools>).

### Detectando um Vazamento de Memória

O erro `java.lang.OutOfMemoryError` pode ser uma indicação de um vazamento de memória em uma aplicação Java. Também pode indicar que o heap Java, o Metaspace ou o Compressed Class space está dimensionado para ser menor do que os requisitos de memória da aplicação para aquele pool de memória específico. Antes de assumir um vazamento de memória na aplicação, certifique-se de que o pool de memória para o qual você está vendo o erro `java.lang.OutOfMemoryError` esteja dimensionado adequadamente. O heap Java pode ser dimensionado usando as opções de linha de comando `-Xmx` e `-Xms`, e o tamanho máximo e inicial do Metaspace pode ser configurado usando `MaxMetaspaceSize` e `MetaspaceSize`. Da mesma forma, o Compressed Class space pode ser dimensionado usando a opção `CompressedClassSpaceSize`.

Vazamentos de memória são frequentemente muito difíceis de detectar, especialmente aqueles que são lentos. Um vazamento de memória ocorre quando uma aplicação retém referências a objetos ou classes Java de forma não intencional, impedindo que sejam coletados pelo garbage collector. Esses objetos ou classes retidos de forma não intencional podem crescer em memória ao longo do tempo, eventualmente preenchendo todo o heap Java ou Metaspace, causando coletas de lixo frequentes e eventual término do processo com um erro `java.lang.OutOfMemoryError`.

Para detectar vazamentos de memória, é importante monitorar o live set da aplicação, ou seja, a quantidade de espaço de heap Java ou Metaspace sendo usada após uma coleta de lixo completa. Se o live set aumentar ao longo do tempo depois que a aplicação atingiu um estado estável e está sob uma carga estável, isso pode ser uma forte indicação de um vazamento de memória. O live set e o uso de memória de uma aplicação podem ser monitorados usando JConsole e JDK Mission Control. As informações de uso de memória também podem ser extraídas dos logs de coleta de lixo.

Observe que se a mensagem detalhada do erro sugerir o esgotamento do heap nativo, a aplicação pode estar enfrentando um vazamento de memória nativa. Para confirmar vazamentos de memória nativa, use ferramentas nativas como pmap ou PerfMon, e compare suas saídas coletadas periodicamente para determinar as seções de memória recém-alocadas ou em crescimento do processo.

#### JConsole

JConsole é uma ótima ferramenta para monitorar recursos de aplicações Java. Entre outras coisas, é útil para monitorar o uso de vários pools de memória de uma aplicação, incluindo gerações de heap Java, Metaspace, Compressed Class Space e CodeHeap.

Nas capturas de tela a seguir, para um programa de exemplo, o JConsole mostra o uso da Heap Memory e da Old Generation aumentando constantemente ao longo de um período de tempo. Este crescimento constante no uso de memória, mesmo após várias coletas de lixo completas, indica um vazamento de memória.

Figura 3-1 JConsole Heap Memory

Figura 3-2 JConsole Old Generation

#### JDK Mission Control

Você pode detectar vazamentos de memória precocemente e prevenir erros `java.lang.OutOfMemoryError` usando o JDK Mission Control (JMC).

Detectar um vazamento de memória lento pode ser difícil. Um sintoma típico pode ser a aplicação ficando mais lenta após rodar por um longo tempo devido a coletas de lixo frequentes. Eventualmente, erros `java.lang.OutOfMemoryError` podem ser observados. No entanto, vazamentos de memória podem ser detectados precocemente, mesmo antes que tais problemas ocorram, analisando gravações do Java Flight.

Observe se o live set da sua aplicação está aumentando ao longo do tempo. O live set é a quantidade de heap Java sendo usada após uma coleta de lixo completa, que coleta todos os objetos inalcançáveis. Para inspecionar o live set, inicie o JMC e conecte-se a uma JVM usando o console Java Management (JMX). Abra a aba MBean Browser e procure pelo MBean `GarbageCollectorAggregator` em `com.sun.management`.

Inicie o JMC e comece uma gravação de tempo fixo (gravação de perfil) por uma hora. Antes de iniciar uma gravação de voo, certifique-se de que a opção Object Types + Allocation Stack Traces + Path to GC Root esteja selecionada na configuração de Detecção de Vazamento de Memória.

Uma vez concluída a gravação, o arquivo de gravação (`.jfr`) é aberto no JMC. Observe a página Automated Analysis Results. Para detectar um vazamento de memória, concentre-se na seção Live Objects da página. Aqui está um exemplo de uma gravação, que mostra um problema de tamanho de heap:

Figura 3-3 Vazamento de Memória - Página de Análise Automatizada

  
[Descrição de "Figura 3-3 Vazamento de Memória - Página de Análise Automatizada"](<#/>)

Você pode observar que na seção Heap Live Set Trend, o live set no heap parece aumentar rapidamente e a análise da árvore de referências detectou um candidato a vazamento.

Para uma análise mais aprofundada, abra a página Java Applications e clique na página Memory. Aqui está uma figura de exemplo de uma gravação, que mostra um problema de vazamento de memória.

Figura 3-4 Vazamento de Memória - Página de Memória

  
[Descrição de "Figura 3-4 Vazamento de Memória - Página de Memória"](<#/>)

Você pode observar no gráfico que o uso de memória aumentou constantemente, o que indica um problema de vazamento de memória.

#### Logs de Garbage Collection

As informações de uso de memória também podem ser extraídas usando logs de GC. Se os logs de GC mostrarem que a aplicação realizou várias coletas de lixo completas tentando recuperar espaço na Old generation ou no Metaspace, mas sem nenhum ganho significativo, isso indica que a aplicação pode estar sofrendo de um problema de vazamento de memória.

Logs de GC podem ser coletados usando a opção Java de linha de comando `-Xlog`. Um exemplo é dado abaixo:
```
    -Xlog:gc*,gc+phases=debug:gc.log
```

Isso registrará mensagens marcadas com pelo menos `gc` usando o nível `info`, e mensagens marcadas exatamente com as tags `gc` e `phases` usando o nível `debug` em um arquivo chamado `gc.log`.

Aqui está um trecho de um log de GC, coletado com `-Xlog:gc*`.
```
    [4.344s][info][gc,start       ] GC(46) Pause Full (Ergonomics)
    [4.344s][info][gc,phases,start] GC(46) Marking Phase
    [4.402s][info][gc,phases      ] GC(46) Marking Phase 57.896ms
    [4.402s][info][gc,phases,start] GC(46) Summary Phase
    [4.402s][info][gc,phases      ] GC(46) Summary Phase 0.023ms
    [4.402s][info][gc,phases,start] GC(46) Adjust Roots
    [4.402s][info][gc,phases      ] GC(46) Adjust Roots 0.108ms
    [4.402s][info][gc,phases,start] GC(46) Compaction Phase
    [4.435s][info][gc,phases      ] GC(46) Compaction Phase 33.721ms
    [4.436s][info][gc,phases,start] GC(46) Post Compact
    [4.436s][info][gc,phases      ] GC(46) Post Compact 0.073ms
    [4.436s][info][gc,heap        ] GC(46) PSYoungGen: 12799K(14848K)->12799K(14848K) Eden: 12799K(12800K)->12799K(12800K) From: 0K(2048K)->0K(2048K)
    [4.436s][info][gc,heap        ] GC(46) ParOldGen: 34072K(34304K)->34072K(34304K)
    [4.436s][info][gc,metaspace   ] GC(46) Metaspace: 149K(384K)->149K(384K) NonClass: 145K(256K)->145K(256K) Class: 3K(128K)->3K(128K)
    [4.436s][info][gc             ] GC(46) Pause Full (Ergonomics) 45M->45M(48M) 92.086ms
    [4.436s][info][gc,cpu         ] GC(46) User=0.15s Sys=0.01s Real=0.10s
```

Neste exemplo, o heap Java tem um tamanho de 48M, e o Full GC não conseguiu recuperar nenhum espaço. É claro que a Old generation está completamente cheia, e o Full GC não pôde ajudar muito. Isso sugere que o heap está dimensionado para ser menor do que os requisitos de heap da aplicação, ou há um vazamento de memória.

### Diagnosticando Vazamentos de Memória Java

Diagnosticar vazamentos no código fonte Java pode ser difícil. Geralmente, requer um conhecimento muito detalhado da aplicação. Além disso, o processo é frequentemente iterativo e demorado. Esta seção fornece informações sobre as ferramentas que você pode usar para diagnosticar vazamentos de memória no código fonte Java.

#### Dados de Diagnóstico

Esta seção aborda os dados de diagnóstico que você pode usar para solucionar problemas de vazamentos de memória.

##### Histogramas de Heap

Você pode tentar restringir rapidamente um vazamento de memória examinando o histograma de heap. Você pode obter um histograma de heap de várias maneiras:

  * Se o processo Java for iniciado com a opção de linha de comando `-XX:+PrintClassHistogram`, o manipulador Control+Break produzirá um histograma de heap.
  * Você pode usar o utilitário `jmap` para obter um histograma de heap de um processo em execução:

Recomenda-se usar o utilitário mais recente, `jcmd`, em vez do utilitário `jmap` para diagnósticos aprimorados e sobrecarga de desempenho reduzida. Consulte [Comandos Úteis para o Utilitário jcmd](<#/doc/guides/troubleshoot/diagnostic-tools>). O comando no exemplo a seguir cria um histograma de heap para um processo em execução usando `jcmd` e resulta em algo similar ao seguinte comando `jmap`.
```jcmd <process id/main class> GC.class_histogram filename=Myheaphistogram
        
```
```jmap -histo pid
        
```

A saída mostra o tamanho total e a contagem de instâncias para cada tipo de classe no heap. Se uma sequência de histogramas for obtida (por exemplo, a cada dois minutos), você poderá ver uma tendência que pode levar a uma análise mais aprofundada.

  * Você pode usar o utilitário `jhsdb jmap` para obter um histograma de heap de um arquivo core, conforme mostrado no exemplo a seguir.
```jhsdb jmap --histo --exe jdk-home/bin/java --core core_file
        
```

Por exemplo, se você especificar a opção de linha de comando `-XX:+CrashOnOutOfMemoryError` ao executar sua aplicação, então quando um erro `java.lang.OutOfMemoryError` for lançado, a JVM gerará um core dump. Você pode então executar `jhsdb jmap` no arquivo core para obter um histograma, conforme mostrado no exemplo a seguir.
```
$ jhsdb jmap --histo --exe /usr/java/jdk-11/bin/java --core core.21844
        Anexando ao core core.21844 do executável /usr/java/jdk-11/bin/java, por favor aguarde...
        Depurador anexado com sucesso.
        Compilador de servidor detectado.
        A versão da JVM é 11-ea+24
        Iterando sobre o heap. Isso pode levar um tempo...
        Histograma de Objetos:
        
        num     #instâncias     #bytes   Descrição da classe
        --------------------------------------------------------------------------
        1:            2108     112576    byte[]
        2:             546      66112    java.lang.Class
        3:            1771      56672    java.util.HashMap$Node
        4:             574      53288    java.lang.Object[]
        5:            1860      44640    java.lang.String
        6:             349      40016    java.util.HashMap$Node[]
        7:              16      33920    char[]
        8:             977      31264    java.util.concurrent.ConcurrentHashMap$Node
        9:             327      15696    java.util.HashMap
        10:            266      13800    java.lang.String[]
        11:            485      12880    int[]
        :
        
        Total : 14253 633584
        A travessia do heap levou 1.15 segundos.
```

O exemplo acima mostra que o erro `java.lang.OutOfMemoryError` foi causado pelo número de arrays de `byte` (2108 instâncias no heap). Sem uma análise mais aprofundada, não está claro onde os arrays de byte são alocados. No entanto, a informação ainda é útil.

##### Heap Dumps

Heap dumps são os dados mais importantes para solucionar problemas de vazamentos de memória. Heap dumps podem ser coletados usando as ferramentas `jcmd`, `jmap`, JConsole e a opção Java `-XX:+HeapDumpOnOutOfMemoryError`.

  * Você pode usar o comando `GC.heap_dump` com o utilitário `jcmd` para criar um heap dump conforme mostrado abaixo:
```jcmd <process id/main class> GC.heap_dump filename=heapdump.dmp
```

  * `jmap` com `-dump:format=b` pode despejar o heap de um processo em execução
```jmap -dump:format=b,file=snapshot.jmap <process id>
```

  * O navegador MBean no JConsole disponibiliza o MBean `HotSpotDiagnostic`, e este pode ser usado para criar heap dumps para o processo Java anexado.
  * Você pode usar a opção Java `-XX:+HeapDumpOnOutOfMemoryError` para despejar o heap Java de um processo quando ele falha com um erro `java.lang.OutOfMemoryError`.

##### Java Flight Recordings

Gravações de Voo coletadas com estatísticas de heap habilitadas podem ser úteis na solução de problemas de um vazamento de memória, mostrando os objetos Java e os maiores consumidores no heap Java ao longo do tempo. Para habilitar as estatísticas de heap, você pode usar o JDK Mission Control (JMC) e habilitar as ‘Heap Statistics’ indo em ‘Window > Flight Recording Template Manager’ conforme mostrado abaixo.

Figura 3-5 Gerenciador de Modelos de Gravação de Voo

As Heap Statistics também podem ser habilitadas editando manualmente o arquivo `.jfc` e definindo `heap-statistics-enabled` como `true`.
```
    <event path="vm/gc/detailed/object_count">
        <setting name="enabled" control="heap-statistics-enabled">true</setting>
        <setting name="period">everyChunk</setting>
    </event>
```

As gravações de voo podem então ser criadas usando qualquer uma das seguintes maneiras:

  * Opções do Java Flight Recorder
```-XX:StartFlightRecording=delay=20s,duration=60s,name=MyRecording,filename=myrecording.jfr,settings=profile
```

  * JMC

##### Estatísticas do Class Loader

Informações sobre class loaders e o número de classes carregadas por eles podem ser muito úteis no diagnóstico de vazamentos de memória relacionados ao Metaspace e ao Compressed Class Space.

As informações de estatísticas do class loader podem ser coletadas usando as ferramentas `jcmd` e `jmap`, conforme mostrado nos exemplos abaixo:

  * `jcmd <process id/main name> VM.classloader_stats`
  * `jmap -clstats <process id>`

A seguir, um exemplo de saída gerada por `jmap`.
```
    jmap -clstats 15557
    ClassLoader         Parent              CLD*               Classes   ChunkSz   BlockSz  Type
    0x0000000800c40ac8  0x0000000800085938  0x00007ff3a18787e0       1       768       184  java.net.URLClassLoader
    0x0000000800c40ac8  0x0000000800085938  0x00007ff39f652f90       1       768       184  java.net.URLClassLoader
    0x0000000800c40ac8  0x0000000800085938  0x00007ff39f499620       1       768       184  java.net.URLClassLoader
    0x0000000800c40ac8  0x0000000800085938  0x00007ff3a194e3a0       1       768       184  java.net.URLClassLoader
    0x0000000800c40ac8  0x0000000800085938  0x00007ff39f5aaad0       1       768       184  java.net.URLClassLoader
    0x0000000800c40ac8  0x0000000800085938  0x00007ff3a1823d20       1       768       184  java.net.URLClassLoader
    0x0000000800c40ac8  0x0000000800085938  0x00007ff3a194cab0       1       768       184  java.net.URLClassLoader
    0x0000000800c40ac8  0x0000000800085938  0x00007ff3a1883190       1       768       184  java.net.URLClassLoader
    0x0000000800c40ac8  0x0000000800085938  0x00007ff3a191b9c0       1       768       184  java.net.URLClassLoader
    0x0000000800c40ac8  0x0000000800085938  0x00007ff3a1914810       1       768       184  java.net.URLClassLoader
    0x0000000800c40ac8  0x0000000800085938  0x00007ff3a181c050       1       768       184  java.net.URLClassLoader
    0x0000000800c40ac8  0x0000000800085938  0x00007ff39f5c57c0       1       768       184  java.net.URLClassLoader
    0x0000000800c40ac8  0x0000000800085938  0x00007ff39f6774d0       1       768       184  java.net.URLClassLoader
    0x0000000800c40ac8  0x0000000800085938  0x00007ff3a18574b0       1       768       184  java.net.URLClassLoader
    0x0000000800c40ac8  0x0000000800085938  0x00007ff3a1803500       1       768       184  java.net.URLClassLoader
    …
    Total = 1105                                        1757   1404032    308858  
    ChunkSz: Tamanho total de todos os chunks de metaspace alocados
    BlockSz: Tamanho total de todos os blocos de metaspace alocados (cada chunk possui vários blocos)
    
```

#### Ferramentas de Análise

Esta seção explora as ferramentas de análise que você pode usar para diagnosticar vazamentos de memória, incluindo aquelas que podem analisar os dados de diagnóstico descritos acima.

##### Ferramentas de Análise de Heap Dump

Existem muitas ferramentas de terceiros disponíveis para análise de heap dump. O Eclipse Memory Analyzer Tool (MAT) e [YourKit](<https://www.yourkit.com>) são dois exemplos de ferramentas comerciais com capacidades de depuração de memória. Existem muitas outras, e nenhum produto específico é recomendado.

##### JDK Mission Control (JMC)

O Flight Recorder registra informações detalhadas sobre o runtime Java e as aplicações Java em execução no runtime Java.

Esta seção descreve como depurar um vazamento de memória analisando uma gravação de voo no JMC.

Você pode usar as Java Flight Recordings para identificar os objetos com vazamento. Para encontrar a classe com vazamento, abra a página Memory e clique na página Live Objects. Aqui está uma figura de exemplo de uma gravação, que mostra a classe com vazamento.

Figura 3-6 Vazamento de Memória - Página de Objetos Ativos

  
[Descrição de "Figura 3-6 Vazamento de Memória - Página de Objetos Ativos"](<#/>)

Você pode observar que a maioria dos objetos ativos sendo rastreados são mantidos por `Leak$DemoThread`, que por sua vez retém uma classe `char[]` vazada. Para uma análise mais aprofundada, consulte o evento `Old Object Sample` na aba Results que contém a amostragem dos objetos que sobreviveram. Este evento contém o tempo de alocação, o stack trace de alocação e o caminho de volta para a raiz do GC.

Quando uma classe potencialmente com vazamento é identificada, observe a página TLAB Allocations na página JVM Internals para algumas amostras de onde os objetos foram alocados. Aqui está uma gravação de exemplo, mostrando alocações TLAB.

Figura 3-7 Vazamento de Memória - Alocações TLAB

  
[Descrição de "Figura 3-7 Vazamento de Memória - Alocações TLAB"](<#/>)

Verifique as amostras de classe que estão sendo alocadas. Se o vazamento for lento, pode haver poucas alocações deste objeto e pode não haver amostras. Além disso, pode ser que apenas um local de alocação específico esteja levando a um vazamento. Você pode fazer as alterações necessárias no código para corrigir a classe com vazamento.

##### A ferramenta jfr

O Java Flight Recorder (JFR) registra informações detalhadas sobre o runtime Java e a aplicação Java em execução no runtime Java. Essas informações podem ser usadas para identificar vazamentos de memória.

Para detectar um vazamento de memória, o JFR deve estar em execução no momento em que o vazamento ocorre. A sobrecarga do JFR é muito baixa, menos de 1%, e foi projetado para ser seguro para estar sempre ativo em produção.

Inicie uma gravação quando a aplicação for iniciada usando o comando `java` conforme mostrado no exemplo a seguir:
```
    $ java -XX:StartFlightRecording
```

Quando a JVM fica sem memória e encerra devido a um erro `java.lang.OutOfMemoryError`, uma gravação com o prefixo `hs_oom_pid` é frequentemente, mas nem sempre, escrita no diretório onde a JVM foi iniciada. Uma maneira alternativa de obter uma gravação é despejá-la antes que a aplicação fique sem memória usando a ferramenta `jcmd`, conforme mostrado no exemplo a seguir:
```
    $ jcmd pid JFR.dump filename=recording.jfr path-to-gc-roots=true
```

Quando você tiver uma gravação, use a ferramenta `jfr` localizada no diretório `java-home/bin` para imprimir eventos Old Object Sample que contêm informações sobre potenciais vazamentos de memória. O exemplo a seguir mostra o comando e um exemplo da saída de uma gravação para uma aplicação com o pid 16276:
```
    jfr print --events OldObjectSample pid16276.jfr
    ...
    
    jdk.OldObjectSample {
      startTime = 18:32:52.192
      duration = 5.317 s
      allocationTime = 18:31:38.213
      objectAge = 74.0 s
      lastKnownHeapUsage = 63.9 MB
      object =  [
        java.util.HashMap$Node
        [15052855] : java.util.HashMap$Node[33554432]
        table : java.util.HashMap Size: 15000000
        map : java.util.HashSet
        users : java.lang.Class Class Name: Application
      ]
      arrayElements = N/A
      root = {
        description = "Thread Name: main"
        system = "Threads"
        type = "Stack Variable"
      }
      eventThread = "main" (javaThreadId = 1)
    }
    
    ...
    
    jdk.OldObjectSample {
      startTime = 18:32:52.192
      duration = 5.317 s
      allocationTime = 18:31:38.266
      objectAge = 74.0 s
      lastKnownHeapUsage = 84.4 MB
      object =  [
        java.util.HashMap$Node
        [8776975] : java.util.HashMap$Node[33554432]
        table : java.util.HashMap Size: 15000000
        map : java.util.HashSet
        users : java.lang.Class Class Name: Application
      ]
      arrayElements = N/A
      root = {
        description = "Thread Name: main"
        system = "Threads"
        type = "Stack Variable"
      }
      eventThread = "main" (javaThreadId = 1)
    }
    
    ...
    
    jdk.OldObjectSample {
      startTime = 18:32:52.192
      duration = 5.317 s
      allocationTime = 18:31:38.540
      objectAge = 73.7 s
      lastKnownHeapUsage = 121.7 MB
      object =  [
        java.util.HashMap$Node
        [393162] : java.util.HashMap$Node[33554432]
        table : java.util.HashMap Size: 15000000
        map : java.util.HashSet
        users : java.lang.Class Class Name: Application
      ]
      arrayElements = N/A
      root = {
        description = "Thread Name: main"
        system = "Threads"
        type = "Stack Variable"
      }
      eventThread = "main" (javaThreadId = 1)
    }
    
    ...
    
```

Para identificar um possível vazamento de memória, revise os seguintes elementos na gravação:

  * Primeiro, observe que o elemento `lastKnownHeapUsage` nos eventos Old Object Sample está aumentando ao longo do tempo, de 63.9 MB no primeiro evento do exemplo para 121.7 MB no último evento. Este aumento é uma indicação de que há um vazamento de memória. A maioria das aplicações aloca objetos durante a inicialização e depois aloca objetos temporários que são periodicamente coletados pelo garbage collector. Objetos que não são coletados pelo garbage collector, por qualquer motivo, acumulam-se ao longo do tempo e aumentam o valor de `lastKnownHeapUsage`.

  * Em seguida, observe o elemento `allocationTime` para ver quando o objeto foi alocado. Objetos que são alocados durante a inicialização tipicamente não são vazamentos de memória, nem são objetos alocados perto do momento em que o dump foi feito. O elemento `objectAge` mostra por quanto tempo o objeto esteve ativo. Os elementos `startTime` e `duration` não estão relacionados a quando o vazamento de memória ocorreu, mas sim a quando o evento `OldObject` foi emitido e quanto tempo levou para coletar dados para ele. Esta informação pode ser ignorada.
* Em seguida, observe o elemento `object` para ver o candidato a vazamento de memória; neste exemplo, um objeto do tipo `java.util.HashMap$Node`. Ele é mantido pelo campo `table` na classe `java.util.HashMap`, que é mantido por `java.util.HashSet`, que por sua vez é mantido pelo campo `users` da classe `Application`.

* O elemento `root` contém informações sobre a GC root. Neste exemplo, a classe `Application` é mantida por uma variável de pilha na thread principal. O elemento `eventThread` fornece informações sobre a thread que alocou o objeto.

Se a aplicação for iniciada com a opção `-XX:StartFlightRecording:settings=profile`, a gravação também contém o stack trace de onde o objeto foi alocado, conforme mostrado no exemplo a seguir:
```
    stackTrace = [
        java.util.HashMap.newNode(int, Object, Object, HashMap$Node) line: 1885
        java.util.HashMap.putVal(int, Object, Object, boolean, boolean) line: 631
        java.util.HashMap.put(Object, Object) line: 612
        java.util.HashSet.add(Object) line: 220
        Application.storeUser(String, String) line: 53
        Application.validate(String, String) line: 48
        Application.login(String, String) line: 44
        Application.main(String[]) line: 30
      ]
    
```

Neste exemplo, podemos ver que o objeto foi colocado no `HashSet` quando o método `storeUser(String, String)` foi chamado. Isso sugere que a causa do vazamento de memória pode ser objetos que não foram removidos do `HashSet` quando o usuário fez logout.

Não é recomendado executar sempre todas as aplicações com a opção `-XX:StartFlightRecording:settings=profile` devido à sobrecarga em certas aplicações com alocação intensiva, mas geralmente é aceitável durante a depuração. A sobrecarga é geralmente inferior a 2%.

Definir `path-to-gc-roots=true` cria sobrecarga, semelhante a uma garbage collection completa, mas também fornece cadeias de referência de volta à GC root, o que geralmente é informação suficiente para encontrar a causa de um vazamento de memória.

##### NetBeans Profiler

O NetBeans Profiler pode localizar vazamentos de memória muito rapidamente. Ferramentas comerciais de depuração de vazamento de memória podem levar muito tempo para localizar um vazamento em uma aplicação grande. O NetBeans Profiler, no entanto, usa o padrão de alocações e reclamações de memória que tais objetos tipicamente demonstram. Este processo inclui também a falta de reclamações de memória. O profiler pode verificar onde esses objetos foram alocados, o que muitas vezes é suficiente para identificar a causa raiz do vazamento.

Consulte [Introdução ao Profiling de Aplicações Java no NetBeans IDE](<https://netbeans.apache.org/tutorial/main/kb/docs/java/profiler-intro/>).

### Diagnosticando Vazamentos de Memória Nativa

Várias técnicas podem ser usadas para encontrar e isolar vazamentos de memória de código nativo. Em geral, não há uma solução ideal para todas as plataformas.

A seguir estão algumas técnicas para diagnosticar vazamentos em código nativo.

* [Rastreando Todas as Chamadas de Alocação e Liberação de Memória](<#/doc/guides/troubleshoot/troubleshooting-memory-leaks>)

* [Rastreando Todas as Alocações de Memória na Biblioteca JNI](<#/doc/guides/troubleshoot/troubleshooting-memory-leaks>)

#### Rastreando Todas as Chamadas de Alocação e Liberação de Memória

Uma prática muito comum é rastrear todas as chamadas de alocação e liberação de alocações nativas. Este pode ser um processo bastante simples ou muito sofisticado. Muitos produtos ao longo dos anos foram desenvolvidos em torno do rastreamento de alocações de heap nativo e do uso dessa memória.

Ferramentas como o IBM Rational Purify podem ser usadas para encontrar esses vazamentos em situações normais de código nativo e também para encontrar qualquer acesso à memória de heap nativo que represente atribuições a memória não inicializada ou acessos a memória liberada.

Nem todos esses tipos de ferramentas funcionarão com aplicações Java que usam código nativo, e geralmente essas ferramentas são específicas da plataforma. Como a JVM cria código dinamicamente em tempo de execução, essas ferramentas podem interpretar o código incorretamente e falhar completamente ou fornecer informações falsas. Verifique com o fornecedor da sua ferramenta para garantir que a versão da ferramenta funcione com a versão da JVM que você está usando.

Consulte [SourceForge](<http://sourceforge.net/>) para muitos exemplos simples e portáteis de detecção de vazamento de memória nativa. A maioria das bibliotecas e ferramentas assume que você pode recompilar ou editar o código-fonte da aplicação e colocar funções wrapper sobre as funções de alocação. As ferramentas mais poderosas permitem que você execute sua aplicação inalterada, interpondo-se dinamicamente sobre essas funções de alocação.

Vazamentos de memória nativa podem resultar de alocações nativas realizadas internamente pela JVM, ou de fora da JVM. As duas seções a seguir discutem em detalhes como ambos os tipos de vazamentos de memória podem ser diagnosticados.

##### Vazamentos de Memória Nativa para Alocações realizadas pela JVM

A JVM possui uma ferramenta poderosa chamada Native Memory Tracking (NMT) que rastreia alocações de memória nativa realizadas internamente pela JVM. Observe que esta ferramenta não pode rastrear memória nativa alocada fora da JVM, por exemplo, por código JNI.

Veja como esta ferramenta pode ser usada:

* Habilite o NMT no processo que você deseja monitorar usando a opção Java `NativeMemoryTracking`. O nível de saída do rastreamento pode ser definido para um nível `summary` ou `detail`, conforme mostrado abaixo:
```-XX:NativeMemoryTracking=summary
        -XX:NativeMemoryTracking=detail
```

* A ferramenta `jcmd` pode então ser usada para anexar ao processo com NMT habilitado e obter seus detalhes de uso de memória nativa. Também é possível coletar uma baseline de uso de memória e, em seguida, coletar a diferença de uso em relação a essa baseline.
```jcmd <process id/main class> VM.native_memory
        jcmd <process id/main class> VM.native_memory baseline
        jcmd <process id/main class> VM.native_memory detail.diff/summary.diff
```

Nota:

Habilitar o NMT pode resultar em uma queda de desempenho de cerca de 5 a 10 por cento. Portanto, ele deve ser habilitado em sistemas de produção com cautela. Além disso, a memória nativa usada pelo NMT é rastreada pela própria ferramenta.

No exemplo a seguir, a captura de tela do JConsole mostra que o uso do ‘Compressed Class Space’ está crescendo a uma taxa constante ao longo do tempo.

Figura 3-8 JConsole Compressed Class Space

Para diagnosticar esse crescimento de uso, o processo Java pode ser rastreado usando o NMT. A coleta de uma baseline e uma saída `summary.diff` mostra que o uso do espaço de classes está aumentando dramaticamente devido ao aumento correspondente no número de classes carregadas.
```
    bash-3.2$ jcmd 39057 VM.native_memory summary.diff
    39057:
    Native Memory Tracking:
    Total: reserved=5761678KB +52943KB, committed=472350KB +104143KB
    -           Java Heap (reserved=4194304KB, committed=163328KB +7680KB)
                                (mmap: reserved=4194304KB, committed=163328KB +7680KB)
     
    -              Class (reserved=1118333KB +47579KB, committed=117949KB +89963KB)
                      (classes #68532 +58527)
                      (malloc=8317KB +2523KB #5461 +3371)
                      (mmap: reserved=1110016KB +45056KB, committed=109632KB +87440KB)
     
    -              Thread (reserved=21594KB -2057KB, committed=21594KB -2057KB)
                       (thread #22 -2)
                       (stack: reserved=21504KB -2048KB, committed=21504KB -2048KB)
                       (malloc=65KB -6KB #111 -10)
                       (arena=25KB -2 #42 -4)
      
    -              Code (reserved=250400KB +244KB, committed=5612KB +1348KB)
                       (malloc=800KB +244KB #1498 +234)
                       (mmap: reserved=249600KB, committed=4812KB +1104KB)
     
    -              GC (reserved=159039KB +18KB, committed=145859KB +50KB)
                       (malloc=5795KB +18KB #856 +590)
                       (mmap: reserved=153244KB, committed=140064KB +32KB)
     
    -              Compiler (reserved=153KB, committed=153KB)
                       (malloc=22KB #72 -2)
                       (arena=131KB #3)
     
    -              Internal (reserved=13537KB +6949KB, committed=13537KB +6949KB)
                        (malloc=13505KB +6949KB #70630 +59119)
                        (mmap: reserved=32KB, committed=32KB)
     
    -              Symbol (reserved=2715KB +9KB, committed=2715KB +9KB)
                         (malloc=1461KB +9KB #702 +29)
                         (arena=1255KB #1)
     
    -       Native Memory Tracking (reserved=1416KB +1031KB, committed=1416KB +1031KB)
                          (malloc=140KB +34KB #2197 +518)
                          (tracking overhead=1275KB +997KB)
      
    -               Arena Chunk (reserved=186KB -832KB, committed=186KB -832KB)
                                (malloc=186KB -832KB)
    
```

##### Vazamentos de Memória Nativa de Fora da JVM

Para vazamentos de memória nativa originados fora da JVM, você pode usar ferramentas nativas da plataforma ou de terceiros para sua detecção e solução de problemas. Aqui está uma lista de algumas das ferramentas que você pode achar úteis na solução de problemas de vazamentos de memória nativa causados por alocações realizadas fora da JVM.

* Valgrind
* Purify disponível em plataformas UNIX e Windows
* Usando Crash Dump ou Core files
* No Windows, pesquise [Microsoft Docs](<https://docs.microsoft.com>) por suporte de depuração. O compilador Microsoft C++ possui as opções de compilador `/Md` e `/Mdd` que incluirão automaticamente suporte extra para rastreamento de alocação de memória. O User-Mode Dump Heap (UMDH) também é útil no rastreamento de alocações de memória.
* Sistemas Linux possuem ferramentas como `mtrace` e `libnjamd` para auxiliar no rastreamento de alocação.

A seção a seguir analisa mais de perto duas dessas ferramentas.

Valgrind

Valgrind pode ser usado para diagnosticar vazamentos de memória nativa no Linux. Para monitorar um processo Java usando Valgrind, ele pode ser iniciado da seguinte forma:
```
    $ valgrind --leak-check=full --show-leak-kinds=all --suppressions=suppression_file --log-file=valgrind_with_suppression.log -v java <Java Class>
```

Um arquivo de supressão pode ser fornecido ao valgrind com a opção `--log-file` para que ele não considere as alocações internas da JVM (como a alocação de heap Java) como potenciais vazamentos de memória, caso contrário, torna-se muito difícil analisar a saída verbosa e procurar manualmente por relatórios de vazamento relevantes.

A seguir estão os conteúdos de um arquivo de supressão de exemplo:
```
    { 
       name
       Memcheck:Leak
       fun:*alloc
       ...
       obj:/opt/java/jdk16/jre/lib/amd64/server/libjvm.so
       ...
    }
    
```

Com o comando acima, e com as supressões em vigor, o Valgrind escreve os vazamentos identificados no arquivo de log especificado. Um exemplo é mostrado abaixo:
```
    ==5200== 88 bytes in 1 blocks are still reachable in loss record 461 of 18,861
    ==5200==    at 0x4C2FB55: calloc (in /usr/lib/valgrind/vgpreload_memcheck-amd64-linux.so)
    ==5200==    by 0x7DCB156: Java_java_util_zip_Deflater_init (in /opt/jdk/ /jre/lib/amd64/libzip.so)
    ==5200==    by 0x80F54FC: ???
    ==5200==    by 0x8105F87: ???
    ==5200==    by 0xFFFFFFFE: ???
    ==5200==    by 0xEC67F74F: ???
    ==5200==    by 0xC241B03F: ???
    ==5200==    by 0xEC67D767: ???
    ==5200==    by 0x413F96F: ???
    ==5200==    by 0x8101E7B: ???
    ==5200==
    ==5200== 88 bytes in 1 blocks are still reachable in loss record 462 of 18,861
    ==5200==    at 0x4C2FB55: calloc (in /usr/lib/valgrind/vgpreload_memcheck-amd64-linux.so)
    ==5200==    by 0x7DCB156: Java_java_util_zip_Deflater_init (in /opt/jdk/jre/lib/amd64/libzip.so)
    ==5200==    by 0x80F54FC: ???
    ==5200==    by 0x8105F87: ???
    ==5200==    by 0xFFFFFFFE: ???
    ==5200==    by 0xEC67FF3F: ???
    ==5200==    by 0xC241B03F: ???
    ==5200==    by 0xEC630EB7: ???
    ==5200==    by 0x413F96F: ???
    ==5200==    by 0x8101E7B: ???
    ==5200==    by 0x41: ???
    ==5200==    by 0x19EAE47F: ???
```

Na saída acima, o Valgrind relata corretamente que há alocações vazando do método nativo `Java_java_util_zip_Deflater_init`.

Nota:

O uso do Valgrind pode ter um impacto negativo no desempenho da aplicação monitorada.

Crash Dump ou Core files

Em plataformas UNIX, a ferramenta `pmap` é útil para identificar os blocos de memória que podem estar mudando/crescendo de tamanho ao longo do tempo. Uma vez que você tenha identificado os blocos ou seções de memória em crescimento, você pode examinar o crash dump ou core file(s) correspondente(s) para analisar esses blocos de memória. Os valores e conteúdos nesses locais podem fornecer algumas pistas valiosas, que podem ajudar a vinculá-los ao código-fonte responsável pelas alocações nesses blocos de memória.
```
    $ diff pmap.15767.1 pmap.15767.3
    69,70c69,70
    < 00007f6d68000000 17036K rw--- [ anon ]
    < 00007f6d690a3000 4850K ----- [ anon ]
    ---
    > 00007f6d68000000 63816K rw--- [ anon ]
    > 00007f6d690a3000 65536K ----- [ anon ]
    
```

A partir da saída `pmap` anterior, podemos ver que o bloco de memória em `00007f6d690a3000` está crescendo entre os dois snapshots de memória do processo. Usando um core file coletado do processo, podemos examinar o conteúdo deste bloco de memória.
```
    $ gdb `which java` core.15767
    GNU gdb (Ubuntu 7.11.1-0ubuntu1~16.5) 7.11.1
    Copyright (C) 2016 Free Software Foundation, Inc.
    ...
    (gdb) x/100s 0x00007f6d690a3000
    0x7f6d690a3000: "mory Leak "
    0x7f6d690a300c: "Alert: JNI Memory Leak "
    0x7f6d690a3025: "Alert: JNI Memory Leak "
    0x7f6d690a303e: "Alert: JNI Memory Leak "
    0x7f6d690a3057: "Alert: JNI Memory Leak "
    0x7f6d690a3070: "Alert: JNI Memory Leak "
```

O acima mostra que há uma string repetida, "Alert: JNI Memory Leak", presente naquele bloco de memória. A busca no código-fonte pela string ou conteúdo encontrado no bloco de memória relevante pode nos levar ao culpado no código. Aqui está o código usado para este exemplo, onde essas alocações são realizadas em código JNI e não estão sendo liberadas.
```
    JNIEXPORT void JNICALL Java_JNINativeLeak_allocateMemory
    (JNIEnv *env, jobject obj, jint size) {
        char* bytes = (char*) malloc(size);
        printf("Allocated %d bytes at %p \n", size, (void*)bytes);
        for (int i=0; i<40; i++) {
            strcpy(bytes+i*25, "Alert: JNI Memory Leak ");
        }
    }
```

Portanto, a ferramenta `pmap` e os core files podem ajudar a chegar à raiz dos vazamentos de memória nativa causados por alocações realizadas fora da JVM.

#### Rastreando Todas as Alocações de Memória na Biblioteca JNI

Se você escrever uma biblioteca JNI, considere criar uma maneira localizada de garantir que sua biblioteca não vaze memória, usando uma abordagem wrapper simples.

O procedimento no exemplo a seguir é uma abordagem localizada e fácil de rastreamento de alocação para uma biblioteca JNI. Primeiro, defina as seguintes linhas em todos os arquivos-fonte.
```
    #include <stdlib.h>
    #define malloc(n) debug_malloc(n, __FILE__, __LINE__)
    #define free(p) debug_free(p, __FILE__, __LINE__)
    
```

Então, você pode usar as funções no exemplo a seguir para observar vazamentos.
```
    /* Total bytes allocated */
    static int total_allocated;
    /* Memory alignment is important */
    typedef union { double d; struct {size_t n; char *file; int line;} s; } Site;
    void *
    debug_malloc(size_t n, char *file, int line) 
    { 
        char *rp;
        rp = (char*)malloc(sizeof(Site)+n); 
        total_allocated += n; 
        ((Site*)rp)->s.n = n;
        ((Site*)rp)->s.file = file;
        ((Site*)rp)->s.line = line;
        return (void*)(rp + sizeof(Site));
    }
    void 
    debug_free(void *p, char *file, int line)
    {
        char *rp;
        rp = ((char*)p) - sizeof(Site);
        total_allocated -= ((Site*)rp)->s.n;
        free(rp);
    }
    
```

A biblioteca JNI precisaria então verificar periodicamente (ou no desligamento) o valor da variável `total_allocated` para verificar se fazia sentido. O código precedente também poderia ser expandido para salvar em uma lista encadeada as alocações que permaneceram e relatar onde a memória vazada foi alocada. Esta é uma maneira localizada e portátil de rastrear alocações de memória em um único conjunto de fontes. Você precisaria garantir que `debug_free()` fosse chamado apenas com o ponteiro que veio de `debug_malloc()`, e também precisaria criar funções semelhantes para `realloc()`, `calloc()`, `strdup()`, e assim por diante, se fossem usadas.

Uma maneira mais global de procurar vazamentos de memória de heap nativo envolve a interposição das chamadas de biblioteca para todo o processo.

### Monitorando os Objetos Pendentes de Finalização

Diferentes comandos e opções disponíveis para monitorar objetos pendentes de finalização.

Quando o erro `java.lang.OutOfMemoryError` é lançado com a mensagem de detalhe "Java heap space", a causa pode ser o uso excessivo de finalizers. Para diagnosticar isso, você tem várias opções para monitorar o número de objetos que estão pendentes de finalização:

* A ferramenta de gerenciamento [JConsole](<#/doc/guides/troubleshoot/diagnostic-tools>) pode ser usada para monitorar o número de objetos que estão pendentes de finalização. Esta ferramenta relata a contagem de finalização pendente nas estatísticas de memória no painel da aba Summary. A contagem é aproximada, mas pode ser usada para caracterizar uma aplicação e entender se ela depende muito da finalização.
* No Linux, o utilitário `jmap` pode ser usado com a opção `-finalizerinfo` para imprimir informações sobre objetos aguardando finalização.
* Uma aplicação pode relatar o número aproximado de objetos pendentes de finalização usando o método `getObjectPendingFinalizationCount` da classe `java.lang.management.MemoryMXBean`. Links para a documentação da API e código de exemplo podem ser encontrados em [Ferramentas de Diagnóstico Personalizadas](<#/doc/guides/troubleshoot/diagnostic-tools>). O código de exemplo pode ser facilmente estendido para incluir o relatório da contagem de finalização pendente.

Consulte [Finalização e Referências Fracas, Suaves e Fantasma](<#/>) no Java Platform, Standard Edition HotSpot Virtual Machine Garbage Collection Tuning Guide para obter informações sobre como detectar e migrar da finalização.

### Solução de Problemas de uma Falha em Vez de um erro java.lang.OutOfMemoryError

Use as informações no log de erro fatal ou no crash dump para solucionar uma falha.

Às vezes, uma aplicação falha logo após uma alocação do heap nativo falhar. Isso ocorre com código nativo que não verifica erros retornados pelas funções de alocação de memória.

Por exemplo, a chamada de sistema `malloc` retorna `null` se não houver memória disponível. Se o retorno de `malloc` não for verificado, a aplicação pode falhar quando tentar acessar um local de memória inválido. Dependendo das circunstâncias, este tipo de problema pode ser difícil de localizar.

No entanto, às vezes as informações do log de erro fatal ou do crash dump são suficientes para diagnosticar este problema. O log de erro fatal é abordado em detalhes em [Log de Erro Fatal](<#/doc/guides/troubleshoot/location-fatal-error-log>). Se a causa da falha for uma falha de alocação, determine o motivo da falha de alocação. Assim como em qualquer outro problema de heap nativo, o sistema pode estar configurado com uma quantidade insuficiente de espaço de swap, outro processo no sistema pode estar consumindo todos os recursos de memória, ou pode haver um vazamento na aplicação (ou nas APIs que ela chama) que faz com que o sistema fique sem memória.