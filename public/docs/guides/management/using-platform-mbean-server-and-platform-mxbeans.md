# Usando o Platform MBean Server e Platform MXBeans

## 4 Usando o Platform MBean Server e Platform MXBeans

Este tópico apresenta o MBean server e os MXBeans que são fornecidos como parte do Java Platform, Standard Edition (Java SE), que podem ser usados para fins de monitoramento e gerenciamento. MBeans e MBean servers da tecnologia Java Management Extensions (JMX) foram introduzidos brevemente em [ Visão Geral de Monitoramento e Gerenciamento do Java SE](<#/doc/guides/management/overview-java-se-monitoring-and-management>). Veja [Introdução à Tecnologia JMX](<#/>) no Guia de Java Management Extensions do Java Platform, Standard Edition.

### Usando o Platform MBean Server

Um MBean server é um repositório de MBeans que fornece acesso a MBeans para aplicações de gerenciamento. As aplicações não acessam MBeans diretamente, mas sim os acessam através do MBean server usando sua classe `ObjectName` única. Um MBean server implementa a interface `javax.management.MBeanServer`.

O platform MBean server foi introduzido no Java SE 5.0 e é um MBean server que é integrado à Java Virtual Machine (Java VM). O platform MBean server pode ser compartilhado por todos os componentes gerenciados que estão sendo executados na Java VM. Você acessa o platform MBean server usando o método `getPlatformMBeanServer` da classe `java.lang.management.ManagementFactory`. É claro que você também pode criar seu próprio MBean server usando a classe `javax.management.MBeanServerFactory`. No entanto, geralmente não há necessidade de mais de um MBean server, portanto, o uso do platform MBean server é recomendado.

### Acessando Platform MXBeans

Um platform MXBean é um MBean para monitorar e gerenciar a Java VM. Cada MXBean encapsula uma parte da funcionalidade da VM. Uma lista completa dos MXBeans fornecidos com a plataforma é apresentada na [Tabela 1-1](<#/doc/guides/management/overview-java-se-monitoring-and-management>).

Uma aplicação de gerenciamento pode acessar platform MXBeans de três maneiras diferentes:

  * Acesso direto da classe `ManagementFactory`

  * Acesso direto de um proxy MXBean

  * Acesso indireto da classe `MBeanServerConnection`

#### Acessando Platform MXBeans Usando a Classe ManagementFactory

Uma aplicação pode fazer chamadas diretas aos métodos de um platform MXBean que está sendo executado na mesma Java VM que ela. Para fazer chamadas diretas, você pode usar os métodos estáticos da classe `ManagementFactory`. A classe `ManagementFactory` possui métodos `accessor` para cada um dos diferentes platform MXBeans, como `getClassLoadingMXBean()`, `getGarbageCollectorMXBeans()`, `getRuntimeMXBean()`, e assim por diante. Caso haja mais de um platform MXBean, o método retorna uma lista dos platform MXBeans encontrados.

Por exemplo, o [Exemplo 4-1](<#/doc/guides/management/using-platform-mbean-server-and-platform-mxbeans>) usa o método estático de `ManagementFactory` para obter o platform MXBean `RuntimeMXBean`, e então obtém o nome do fornecedor do platform MXBean.

Exemplo 4-1 Acessando um Platform MXBean Usando a Classe ManagementFactory
```java
    RuntimeMXBean mxbean = ManagementFactory.getRuntimeMXBean();
    String vendor = mxbean.getVmVendor(); 
    
```

#### Acessando Platform MXBeans Usando um Proxy MXBean

Uma aplicação também pode chamar métodos de platform MXBean usando um proxy MXBean. Para fazer isso, você deve construir uma instância de proxy MXBean que encaminha as chamadas de método para um determinado MBean server, chamando o método estático `ManagementFactory.newPlatformMXBeanProxy()`. Uma aplicação tipicamente constrói um proxy para obter acesso remoto a um platform MXBean de outra Java VM.

Por exemplo, o [Exemplo 4-2](<#/doc/guides/management/using-platform-mbean-server-and-platform-mxbeans>) executa exatamente a mesma operação que o [Exemplo 4-1](<#/doc/guides/management/using-platform-mbean-server-and-platform-mxbeans>), mas desta vez ele usa um proxy MXBean.

Exemplo 4-2 Acessando um Platform MXBean Usando um Proxy MXBean
```java
    MBeanServerConnection mbs;
    ...
    // Get a MBean proxy for RuntimeMXBean interface
    RuntimeMXBean proxy =
        ManagementFactory.newPlatformMXBeanProxy(mbs,ManagementFactory.RUNTIME_MXBEAN_NAME,RuntimeMXBean.class);
    // Get standard attribute "VmVendor"
    String vendor = proxy.getVmVendor();
    
```

#### Acessando Platform MXBeans Usando a Classe MBeanServerConnection

Uma aplicação pode chamar indiretamente métodos de platform MXBean através de uma interface `MBeanServerConnection` que se conecta ao platform MBean server de outra Java VM em execução. Você usa o método `getAttribute()` da classe `MBeanServerConnection` para obter um atributo de um platform MXBean, fornecendo o `ObjectName` do MBean e o nome do atributo como parâmetros.

Por exemplo, o [Exemplo 4-3](<#/doc/guides/management/using-platform-mbean-server-and-platform-mxbeans>) executa a mesma tarefa que o [Exemplo 4-1](<#/doc/guides/management/using-platform-mbean-server-and-platform-mxbeans>) e o [Exemplo 4-2](<#/doc/guides/management/using-platform-mbean-server-and-platform-mxbeans>), mas usa uma chamada indireta através de `MBeanServerConnection`.

Exemplo 4-3 Acessando um Platform MXBean Usando a Classe MBeanServerConnection
```java
    MBeanServerConnection mbs;
    ...
    try {
      ObjectName oname = new ObjectName(ManagementFactory.RUNTIME_MXBEAN_NAME);
      // Get standard attribute "VmVendor"
      String vendor = (String) mbs.getAttribute(oname, "VmVendor");
    } catch (....) {
      // Catch the exceptions thrown by ObjectName constructor
      // and MBeanServer.getAttribute method
      ...
    }
    
```

### Usando a Extensão de Plataforma do Oracle JDK

Java VMs podem estender a interface de gerenciamento definindo interfaces para medições e operações de gerenciamento específicas da plataforma. Os métodos de fábrica estáticos na classe `ManagementFactory` retornarão os MBeans com a extensão de plataforma.

O pacote `com.sun.management` contém as extensões de plataforma do Oracle JDK. As seções a seguir fornecem exemplos de como acessar um atributo específico da plataforma a partir da implementação do Oracle JDK da interface `OperatingSystemMXBean`.

#### Acessando Atributos MXBean Diretamente

O [Exemplo 4-4](<#/doc/guides/management/using-platform-mbean-server-and-platform-mxbeans>) ilustra o acesso direto a uma das interfaces MXBean do Oracle JDK.

Exemplo 4-4 Acessando um Atributo MXBean Diretamente
```java
    com.sun.management.OperatingSystemMXBean mxbean =
      (com.sun.management.OperatingSystemMXBean) ManagementFactory.getOperatingSystemMXBean();
    
    // Get the number of processors
    int numProcessors = mxbean.getAvailableProcessors();
    
    // Get the Oracle JDK-specific attribute Process CPU time
    long cpuTime = mxbean.getProcessCpuTime();
    
```

#### Acessando Atributos MXBean Usando MBeanServerConnection

O [Exemplo 4-5](<#/doc/guides/management/using-platform-mbean-server-and-platform-mxbeans>) ilustra o acesso a uma das interfaces MXBean do Oracle JDK usando a classe `MBeanServerConnection`.

Exemplo 4-5 Acessando um Atributo MXBean Usando MBeanServerConnection
```java
    MBeanServerConnection mbs;
    
    // Connect to a running Java VM (or itself) and get MBeanServerConnection
    // that has the MXBeans registered in it
    ...
    
    try {
        // Assuming the OperatingSystem MXBean has been registered in mbs
        ObjectName oname = new ObjectName(ManagementFactory.OPERATING_SYSTEM_MXBEAN_NAME);
    
        // Get standard attribute "Name"
        String vendor = (String) mbs.getAttribute(oname, "Name");
    
        // Check if this MXBean contains Oracle JDK's extension
        if (mbs.isInstanceOf(oname, "com.sun.management.OperatingSystemMXBean")) {
            // Get platform-specific attribute "ProcessCpuTime"
            long cpuTime = (Long) mbs.getAttribute(oname, "ProcessCpuTime");
        }
    } catch (....) {
        // Catch the exceptions thrown by ObjectName constructor
        // and MBeanServer methods
        ...
    }
    
```

### Monitorando Contenção de Threads e Tempo de CPU

O platform MXBean `ThreadMXBean` oferece suporte para monitorar a contenção de threads e o tempo de unidade central de processamento (CPU) de threads.

A HotSpot VM do Oracle JDK suporta o monitoramento de contenção de threads. Você usa o método `ThreadMXBean.isThreadContentionMonitoringSupported()` para determinar se uma Java VM suporta o monitoramento de contenção de threads. O monitoramento de contenção de threads é desabilitado por padrão. Use o método `setThreadContentionMonitoringEnabled()` para habilitá-lo.

A HotSpot VM do Oracle JDK suporta a medição do tempo de CPU de threads na maioria das plataformas. O tempo de CPU fornecido por esta interface tem precisão de nanossegundos, mas não necessariamente acurácia de nanossegundos.

Você usa o método `isThreadCpuTimeSupported()` para determinar se uma Java VM suporta a medição do tempo de CPU para qualquer thread. Você usa `isCurrentThreadCpuTimeSupported()` para determinar se uma Java VM suporta a medição do tempo de CPU para a thread atual. Uma Java VM que suporta a medição do tempo de CPU para qualquer thread também suportará para a thread atual.

Uma Java VM pode desabilitar a medição do tempo de CPU de threads. Você usa o método `isThreadCpuTimeEnabled()` para determinar se a medição do tempo de CPU de threads está habilitada. Você usa o método `setThreadCpuTimeEnabled()` para habilitar ou desabilitar a medição do tempo de CPU de threads.

### Gerenciando o Sistema Operacional

O platform MXBean `OperatingSystem` permite acessar certas informações de recursos do sistema operacional, como as seguintes:

  * Tempo de CPU do processo

  * Quantidade de memória física total e livre

  * Quantidade de memória virtual comprometida (ou seja, a quantidade de memória virtual garantida para estar disponível para o processo em execução)

  * Quantidade de espaço de swap total e livre

  * Número de descritores de arquivo abertos (apenas para plataformas Linux ou macOS).

Quando o Operating System MXBean na aba MBeans é selecionado no JConsole, você vê todos os atributos e operações, incluindo a extensão da plataforma. Você pode monitorar as mudanças de um atributo numérico ao longo do tempo clicando duas vezes no campo de valor do atributo.

### Gerenciamento de Logging

A plataforma Java SE fornece um MXBean especial para fins de logging, a interface `java.lang.management.PlatformLoggingMXBean`.

A interface `PlatformLoggingMXBean` permite que você execute as seguintes tarefas:

  * Obter o nome do nível de log associado ao logger especificado

  * Obter a lista de loggers atualmente registrados

  * Obter o nome do pai para o logger especificado

  * Definir o logger especificado para o novo nível especificado

O `ObjectName` único do `PlatformLoggingMXBean` é `java.util.logging:type=Logging`.

Existe uma única instância global da interface `PlatformLoggingMXBean`, que você pode obter chamando `ManagementFactory.getPlatformLoggingMXBean()`.

A interface `PlatformLoggingMXBean` define um atributo `LoggerNames` descrevendo a lista de nomes de loggers. Para encontrar a lista de loggers em sua aplicação no JConsole, selecione a interface `Logging MXBean` sob o domínio `java.util.logging` na aba MBeans, expanda `Attributes` e selecione `LoggerNames`. Em seguida, clique duas vezes no campo de valor do atributo `LoggerNames`.

A interface `PlatformLoggingMXBean` também suporta operações, incluindo:

  * `getLoggerLevel`: Retorna o nível de log de um determinado logger

  * `setLoggerLevel`: Define o nível de log de um determinado logger para um novo nível

  * `java.lang.management.PlatformLoggingMXBean`

  * `java.util.logging:type=Logging`

Essas operações recebem um nome de logger como primeiro parâmetro. Para alterar o nível de um logger, insira o nome do logger no primeiro parâmetro e o nome do nível para o qual ele deve ser definido no segundo parâmetro da operação `setLoggerLevel`.

### Detectando Pouca Memória

O uso da memória é um atributo importante do sistema de memória. Ele pode ser indicativo dos seguintes problemas:

  * Consumo excessivo de memória por uma aplicação

  * Uma carga de trabalho excessiva imposta ao sistema de gerenciamento automático de memória

  * Potenciais vazamentos de memória

Existem dois tipos de limites de memória que você pode usar para detectar condições de pouca memória: um limite de uso (usage threshold) e um limite de uso de coleta (collection usage threshold). Você pode detectar condições de pouca memória usando qualquer um desses limites com polling ou notificação de limite.

#### Limites de Memória

Um memory pool pode ter dois tipos de limites de memória: um limite de uso (usage threshold) e um limite de uso de coleta (collection usage threshold). Qualquer um desses limites pode não ser suportado por um memory pool específico. Os valores para o limite de uso e o limite de uso de coleta podem ser definidos usando a aba MBeans no JConsole.

##### Limite de Uso

O limite de uso é um atributo gerenciável de alguns memory pools. Ele permite monitorar o uso da memória com baixa sobrecarga. Definir o limite para um valor positivo permite que um memory pool execute a verificação do limite de uso. Definir o limite de uso para zero desabilita a verificação do limite de uso. O valor padrão é fornecido pela Java VM.

Uma Java VM executa a verificação do limite de uso em um memory pool no momento mais apropriado, tipicamente durante a garbage collection. Cada memory pool incrementa uma contagem de limite de uso sempre que o uso ultrapassa o limite.

Você usa o método `isUsageThresholdSupported()` para determinar se um memory pool suporta um limite de uso, porque um limite de uso não é apropriado para alguns memory pools. Por exemplo, em um garbage collector geracional (como o da HotSpot VM; veja [Garbage Collection](<#/doc/guides/management/using-jconsole>)), a maioria dos objetos é alocada na young generation, a partir do Eden memory pool. O Eden pool é projetado para ser preenchido. A garbage collection do Eden memory pool liberará a maior parte de seu espaço de memória porque se espera que ele contenha principalmente objetos de curta duração que são inalcançáveis no momento da garbage collection. Portanto, não é apropriado para o Eden memory pool suportar um limite de uso.

##### Limite de Uso de Coleta

O limite de uso de coleta é um atributo gerenciável de alguns memory pools com garbage collection. Depois que uma Java VM realiza a garbage collection em um memory pool, parte da memória no pool ainda estará em uso. O limite de uso de coleta permite definir um valor para essa memória. Você usa o método `isCollectionUsageThresholdSupported()` da interface `MemoryPoolMXBean` para determinar se o pool suporta um limite de uso de coleta.

Uma Java VM pode verificar o limite de uso de coleta em um memory pool quando realiza a garbage collection. Defina o limite de uso de coleta para um valor positivo para habilitar a verificação. Defina o limite de uso de coleta para zero (o padrão) para desabilitar a verificação.

O limite de uso e o limite de uso de coleta podem ser definidos na aba MBeans do JConsole.

##### Memory MXBean

Os vários limites de memória podem ser gerenciados usando o platform `MemoryMXBean`. O `MemoryMXBean` define os quatro atributos a seguir:

  * `HeapMemoryUsage`: Um atributo somente leitura que descreve o uso atual da memória heap.

  * `NonHeapMemoryUsage`: Um atributo somente leitura que descreve o uso da memória nonheap.

  * `ObjectPendingFinalizationCount`: Um atributo somente leitura que descreve o número de objetos pendentes para finalização.

  * `Verbose`: Um atributo booleano que descreve a configuração de rastreamento verboso da Garbage Collection (GC). Isso pode ser definido dinamicamente. Os rastreamentos verbosos da GC serão exibidos no local especificado ao iniciar a Java VM. O local padrão para a saída verbosa da GC da Hotspot VM é `stdout`.

O Memory MXBean suporta uma operação, `gc`, para solicitações explícitas de garbage collection.

Detalhes da interface Memory MXBean são definidos na especificação `java.lang.management.MemoryMXBean`.

##### Memory Pool MXBean

O platform MXBean `MemoryPoolMXBean` define um conjunto de operações para gerenciar limites de memória.

  * `getUsageThreshold()`

  * `setUsageThreshold(long threshold)`

  * `isUsageThresholdExceeded()`

  * `isUsageThresholdSupported()`

  * `getCollectionUsageThreshold()`

  * `setCollectionUsageThreshold(long threshold)`

  * `isCollectionUsageThresholdSupported()`

  * `isCollectionUsageThresholdExceeded()`

Cada memory pool pode ter dois tipos de limites de memória para suporte à detecção de pouca memória: um limite de uso e um limite de uso de coleta. Qualquer um desses limites pode não ser suportado por um memory pool específico. Para mais informações, consulte a documentação de referência da API para a classe `MemoryPoolMXBean`.

#### Polling

Uma aplicação pode monitorar continuamente seu uso de memória chamando o método `getUsage()` para todos os memory pools ou o método `isUsageThresholdExceeded()` para memory pools que suportam um limite de uso.

O [Exemplo 4-6](<#/doc/guides/management/using-platform-mbean-server-and-platform-mxbeans>) possui uma thread dedicada à distribuição e processamento de tarefas. A cada intervalo, ela determina se deve receber e processar novas tarefas com base em seu uso de memória. Se o uso de memória exceder seu limite de uso, ela redistribui as tarefas pendentes para outras VMs e para de receber novas tarefas até que o uso de memória retorne abaixo do limite.

Exemplo 4-6 Usando Polling
```java
    pool.setUsageThreshold(myThreshold);
    ....
    boolean lowMemory = false;
    while (true) {
      if (pool.isUsageThresholdExceeded()) {
        lowMemory = true;
        redistributeTasks();  // redistribute tasks to other VMs
        stopReceivingTasks();  // stop receiving new tasks
      } else {
        if (lowMemory) { // resume receiving tasks
          lowMemory = false;
          resumeReceivingTasks();
        }
        // processing outstanding task
        ...
      }
      // sleep for sometime
      try {
        Thread.sleep(sometime);
      } catch (InterruptedException e) {
        ...
      }
    }      
    
```

O [Exemplo 4-6](<#/doc/guides/management/using-platform-mbean-server-and-platform-mxbeans>) não diferencia o caso em que o uso de memória caiu temporariamente abaixo do limite de uso do caso em que o uso de memória permanece acima do limite entre duas iterações. Você pode usar a contagem de limite de uso retornada pelo método `getUsageThresholdCount()` para determinar se o uso de memória retornou abaixo do limite entre duas verificações (polls).

Para testar o limite de uso de coleta, você usa os métodos `isCollectionUsageThresholdSupported()`, `isCollectionThresholdExceeded()` e `getCollectionUsageThreshold()` da mesma forma que mostrado no [Exemplo 4-6](<#/doc/guides/management/using-platform-mbean-server-and-platform-mxbeans>).

#### Notificações de Limite

Quando a interface `MemoryMXBean` detecta que um memory pool atingiu ou excedeu seu limite de uso, ela emite uma notificação de limite de uso excedido. A interface `MemoryMXBean` não emitirá outra notificação de limite de uso excedido até que o uso tenha caído abaixo do limite e, em seguida, o exceda novamente. Da mesma forma, quando o uso de memória após a garbage collection excede o limite de uso de coleta, a interface `MemoryMXBean` emite uma notificação de limite de uso de coleta excedido.

O [Exemplo 4-7](<#/doc/guides/management/using-platform-mbean-server-and-platform-mxbeans>) implementa a mesma lógica que o [Exemplo 4-6](<#/doc/guides/management/using-platform-mbean-server-and-platform-mxbeans>), mas usa a notificação de limite de uso para detectar condições de pouca memória. Ao receber uma notificação, o listener notifica outra thread para realizar ações como redistribuir tarefas pendentes, recusar-se a aceitar novas tarefas ou permitir que novas tarefas sejam aceitas novamente.

Em geral, você deve projetar o método `handleNotification` para fazer uma quantidade mínima de trabalho, a fim de evitar atrasos na entrega de notificações subsequentes. Você deve realizar ações demoradas em uma thread separada. Como várias threads podem chamar o notification listener concorrentemente, o listener deve sincronizar as tarefas que executa adequadamente.

Exemplo 4-7 Usando Notificações de Limite
```java
    class MyListener implements javax.management.NotificationListener {
      public void handleNotification(Notification notification, Object handback)  {
        String notifType = notification.getType();
        if (notifType.equals(MemoryNotificationInfo.MEMORY_THRESHOLD_EXCEEDED)) {
          // potential low memory, redistribute tasks to other VMs & stop receiving new tasks.
          lowMemory = true;
          notifyAnotherThread(lowMemory);
        }
      }
    }
    
    // Register MyListener with MemoryMXBean
    MemoryMXBean mbean = ManagementFactory.getMemoryMXBean();
    NotificationEmitter emitter = (NotificationEmitter) mbean;
    MyListener listener = new MyListener();
    emitter.addNotificationListener(listener, null, null);
    
```

Assumindo que este memory pool suporta um limite de uso, você pode definir o limite para algum valor (representando um número de bytes), acima do qual a aplicação não aceitará novas tarefas.
```java
    pool.setUsageThreshold(myThreshold);
    
```

Após este ponto, a detecção de limite de uso é habilitada e a classe `MyListener` tratará a notificação.