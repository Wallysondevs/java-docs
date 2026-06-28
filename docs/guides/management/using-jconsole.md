# Usando JConsole

## 3 Usando JConsole

A interface gráfica de usuário do JConsole é uma ferramenta de monitoramento que está em conformidade com a especificação Java Management Extensions (JMX). O JConsole usa a instrumentação extensiva da Java Virtual Machine (Java VM) para fornecer informações sobre o desempenho e o consumo de recursos de aplicações executadas na plataforma Java.

O JConsole foi atualizado para apresentar a aparência dos desktops Windows e GNOME (outras plataformas apresentarão a aparência gráfica padrão do Java). As capturas de tela apresentadas neste documento foram tiradas de uma instância da interface executada no Windows XP.

### Iniciando o JConsole

O arquivo executável `jconsole` pode ser encontrado em `JDK_HOME/bin`, onde `JDK_HOME` é o diretório no qual o Java Development Kit (JDK) está instalado. Se este diretório estiver no seu PATH do sistema, você pode iniciar o JConsole simplesmente digitando `jconsole` em um prompt de comando (shell). Caso contrário, você terá que digitar o caminho completo para o arquivo executável.

#### Sintaxe do Comando

Você pode usar o JConsole para monitorar tanto aplicações locais, ou seja, aquelas executadas no mesmo sistema que o JConsole, quanto aplicações remotas, ou seja, aquelas executadas em outros sistemas.

Nota:

Usar o JConsole para monitorar uma aplicação local é útil para desenvolvimento e para a criação de protótipos, mas não é recomendado para ambientes de produção, pois o próprio JConsole consome recursos significativos do sistema. O monitoramento remoto é recomendado para isolar a aplicação JConsole da plataforma que está sendo monitorada.

Consulte [O Comando jconsole](<#/>) nas Especificações da Ferramenta Java Development Kit para a sintaxe completa.

##### Configurando o Monitoramento Local

Inicie o JConsole usando o seguinte comando:
```
    % jconsole
```

Quando o JConsole iniciar, selecione as aplicações Java necessárias em execução localmente às quais o JConsole pode se conectar.

Se você deseja monitorar uma aplicação específica e conhece o ID do processo dessa aplicação, inicie o JConsole para que ele se conecte a essa aplicação. Esta aplicação deve estar sendo executada com o mesmo ID de usuário que o JConsole. Use a seguinte sintaxe de comando para iniciar o JConsole para monitoramento local de uma aplicação específica:
```
    % jconsole processID
```

`processID` é o ID do processo (PID) da aplicação. Você pode determinar o PID de uma aplicação das seguintes maneiras:

  * Em sistemas Linux ou macOS, você pode usar o comando `ps` para encontrar o PID da instância `java` que está em execução.

  * Em sistemas Windows, você pode usar o Gerenciador de Tarefas para encontrar o PID de `java` ou `javaw`.

  * Você também pode usar o utilitário de linha de comando `jps` para determinar PIDs. Consulte [O Comando jps](<#/>) nas Especificações da Ferramenta Java Development Kit.

Por exemplo, se o ID do processo da aplicação `Notepad` for `2956`, inicie o JConsole com o seguinte comando:
```
    % jconsole 2956
```

Tanto o JConsole quanto a aplicação devem ser executados pelo mesmo usuário. O sistema de gerenciamento e monitoramento usa as permissões de arquivo do sistema operacional. Se você não especificar um ID de processo, o JConsole detectará automaticamente todas as aplicações Java locais e exibirá uma caixa de diálogo que permite selecionar qual delas você deseja monitorar (consulte [Conectando-se a um Agente JMX](<#/doc/guides/management/using-jconsole>)).

Consulte [Monitoramento e Gerenciamento Local Usando o JConsole](<#/doc/guides/management/monitoring-and-management-using-jmx-technology>).

##### Configurando o Monitoramento Remoto

Para iniciar o JConsole para monitoramento remoto, use a seguinte sintaxe de comando:
```
    % jconsole hostName:portNum
    
```

O `hostName` é o nome do sistema que executa a aplicação e `portNum` é o número da porta que você especificou ao habilitar o agente JMX durante a inicialização da Java VM. Consulte [Monitoramento e Gerenciamento Remoto](<#/doc/guides/management/monitoring-and-management-using-jmx-technology>).

Se você não especificar uma combinação de nome de host/número de porta, o JConsole exibirá uma caixa de diálogo de conexão ([Conectando-se a um Agente JMX](<#/doc/guides/management/using-jconsole>)) para permitir que você insira um nome de host e um número de porta.

##### Configurando o Monitoramento Remoto Seguro

Você também pode iniciar o JConsole para que o monitoramento seja realizado por uma conexão segura usando Secure Sockets Layer (SSL). Consulte [Monitoramento Remoto com JConsole com SSL Habilitado](<#/doc/guides/management/monitoring-and-management-using-jmx-technology>) para o comando de inicialização do JConsole com uma conexão segura.

#### Conectando-se a um Agente JMX

Se você iniciar o JConsole com argumentos especificando um agente JMX para se conectar, ele iniciará automaticamente o monitoramento da Java VM especificada. Você pode se conectar a um host diferente a qualquer momento selecionando Connection e New Connection, e inserindo as informações necessárias.

Caso contrário, se você não fornecer nenhum argumento ao iniciar o JConsole, a primeira coisa que você verá é a caixa de diálogo de conexão. Esta caixa de diálogo possui duas opções, permitindo conexões para processos Local ou Remote.

##### Conectando o JConsole a um Processo Local

Se você iniciar o JConsole sem fornecer um agente JMX específico para se conectar, você verá a seguinte caixa de diálogo:

Figura 3-1 Criando uma Conexão para um Processo Local

A opção Local Process lista quaisquer Java VMs em execução no sistema local que foram iniciadas com o mesmo ID de usuário que o JConsole, juntamente com seu ID de processo e suas informações de classe ou argumento. Para conectar o JConsole à sua aplicação, selecione a aplicação que você deseja monitorar e clique em Connect. A lista de processos locais inclui aplicações executadas nos seguintes tipos de Java VM:

  * Aplicações com o agente de gerenciamento habilitado: Isso inclui aplicações na plataforma Java SE que foram iniciadas com a opção `-Dcom.sun.management.jmxremote` ou com a opção `-Dcom.sun.management.jmxremote.port` especificada. Além disso, a lista também inclui quaisquer aplicações que foram iniciadas na plataforma Java SE sem quaisquer propriedades de gerenciamento, mas que são anexadas pelo JConsole, que habilita o agente de gerenciamento em tempo de execução.

  * Aplicações que são anexáveis, com o agente de gerenciamento desabilitado: Isso inclui uma aplicação anexável que suporta o carregamento do agente de gerenciamento em tempo de execução. Aplicações anexáveis incluem aplicações que são iniciadas na plataforma Java SE, que suportam a Attach API. Aplicações que suportam anexação dinâmica não exigem que o agente de gerenciamento seja iniciado especificando as opções `com.sun.management.jmxremote` ou `com.sun.management.jmxremote.port` na linha de comando. O JConsole não precisa se conectar ao agente de gerenciamento antes que a aplicação seja iniciada. Se você selecionar esta aplicação, uma nota será exibida na tela informando que o agente de gerenciamento será habilitado quando a conexão for estabelecida. No exemplo, a caixa de diálogo de conexão mostrada na [Figura 3-1](<#/doc/guides/management/using-jconsole>), o NetBeans IDE e o JConsole são iniciados dentro de uma Java SE platform VM. Ambos aparecem em texto normal, o que significa que o JConsole pode se conectar a eles. Na [Figura 3-1](<#/doc/guides/management/using-jconsole>), o JConsole é selecionado e a nota está visível.

  * Aplicações que não são anexáveis, com o agente de gerenciamento desabilitado: Isso inclui aplicações iniciadas em uma plataforma Java SE sem as opções `-Dcom.sun.management.jmxremote` ou `com.sun.management.jmxremote.port`. Essas aplicações aparecem esmaecidas na tabela e o JConsole não consegue se conectar a elas. Na caixa de diálogo de conexão de exemplo mostrada na [Figura 3-1](<#/doc/guides/management/using-jconsole>), a aplicação `Anagrams` foi iniciada com uma Java SE platform VM sem nenhuma das propriedades de gerenciamento para habilitar o agente JMX e, consequentemente, aparece em cinza e não pode ser selecionada.

Figura 3-2 Tentando Conectar-se a uma Aplicação Sem o Agente de Gerenciamento Habilitado

Na caixa de diálogo de conexão de exemplo mostrada na [Figura 3-2](<#/doc/guides/management/using-jconsole>), você pode ver que a aplicação `Anagrams` está selecionada, mas o Connect permanece esmaecido, e uma nota apareceu informando que o agente de gerenciamento não está habilitado para este processo. O JConsole não pode se conectar ao `Anagrams` porque ele não foi iniciado com a Java VM correta ou com as opções corretas.

##### Conectando o JConsole a um Processo Remoto

Quando a caixa de diálogo de conexão é aberta, você também tem a opção de se conectar a um processo remoto.

Figura 3-3 Criando uma Conexão para um Processo Remoto

Para monitorar um processo em execução em uma Java VM remota, você deve fornecer as seguintes informações:

  * Nome do host: O nome da máquina na qual a Java VM está em execução.

  * Número da porta: O número da porta do agente JMX que você especificou ao iniciar a Java VM.

  * Nome de usuário e senha: O nome de usuário e a senha a serem usados (necessário apenas se estiver monitorando uma Java VM através de um agente JMX que exija autenticação por senha).

Para definir o número da porta do agente JMX, consulte [Gerenciamento Pronto para Uso](<#/doc/guides/management/monitoring-and-management-using-jmx-technology>).

Consulte [Usando Arquivos de Senha e Acesso](<#/doc/guides/management/monitoring-and-management-using-jmx-technology>).

Para monitorar a Java VM que está executando o JConsole, clique em Connect e insira o host como `localhost` e a porta `0`.

##### Conectando Usando uma URL de Serviço JMX

Você também pode usar a opção Remote Process para se conectar a outros agentes JMX especificando sua URL de serviço JMX, e o nome de usuário e senha. A sintaxe de uma URL de serviço JMX exige que você forneça o protocolo de transporte usado para fazer a conexão, bem como um ponto de acesso ao serviço. A sintaxe completa para uma URL de serviço JMX é descrita na documentação da API para `javax.management.remote.JMXServiceURL`.

Figura 3-4 Conectando-se a um Agente JMX Usando a URL de Serviço JMX

Se o agente JMX usar um conector que não está incluído na plataforma Java, você deve adicionar as classes do conector ao classpath ao executar o comando `jconsole`, da seguinte forma:
```
    % jconsole -J-Djava.class.path=JAVA_HOME/lib/jconsole.jar:JAVA_HOME/lib/tools.jar:connector-path
    
```

`connector-path` é o diretório ou o arquivo Java archive (JAR) contendo as classes do conector que não estão incluídas no JDK, a serem usadas pelo JConsole.

#### Apresentando as Abas do JConsole

Depois de conectar o JConsole a uma aplicação, o JConsole exibe as seis abas seguintes:

  * Overview: Exibe informações gerais sobre a Java VM e valores monitorados

  * Memory: Exibe informações sobre o uso de memória

  * Threads: Exibe informações sobre o uso de threads

  * Classes: Exibe informações sobre o carregamento de classes

  * VM: Exibe informações sobre a Java VM

  * MBeans: Exibe informações sobre MBeans

Use o ícone verde de status de conexão no canto superior direito do JConsole para desconectar ou reconectar-se a uma Java VM em execução. Você pode se conectar a qualquer número de Java VMs em execução ao mesmo tempo, selecionando Connection e, em seguida, New Connection no menu suspenso.

##### Visualizando Informações Gerais

A aba Overview exibe informações gráficas de monitoramento sobre o uso da CPU, uso de memória, contagem de threads e as classes carregadas na Java VM, tudo em uma única tela.

Figura 3-5 Aba Overview

A aba Overview oferece uma maneira fácil de correlacionar informações que antes estavam disponíveis apenas alternando entre várias abas.

##### Salvando Dados do Gráfico

O JConsole permite salvar os dados apresentados nos gráficos em um arquivo de valores separados por vírgula (CSV). Para salvar dados de um gráfico, clique com o botão direito do mouse em qualquer gráfico, selecione Save data as..., e então especifique o arquivo no qual os dados serão salvos. Você pode salvar os dados de qualquer um dos gráficos exibidos em qualquer uma das diferentes abas do JConsole desta forma.

O formato CSV é comumente usado para troca de dados entre aplicações de planilha. O arquivo CSV pode ser importado para aplicações de planilha e pode ser usado para criar diagramas nessas aplicações. Os dados são apresentados como duas ou mais colunas nomeadas, onde a primeira coluna representa os carimbos de data/hora. Após importar o arquivo para uma aplicação de planilha, você geralmente precisará selecionar a primeira coluna e alterar seu formato para `date` ou `date/time`, conforme apropriado.

##### Monitorando o Consumo de Memória

A aba Memory fornece informações sobre o consumo de memória e os pools de memória.

Figura 3-6 Aba Memory

Clique em Perform GC na aba Memory para realizar a garbage collection sempre que desejar. O gráfico mostra o uso de memória da Java VM ao longo do tempo, para memória heap e nonheap, bem como para pools de memória específicos. Os pools de memória disponíveis dependem da versão da Java VM que está sendo usada. Para a HotSpot Java VM, os pools de memória para garbage collection serial são os seguintes:

  * Eden Space (heap): O pool do qual a memória é inicialmente alocada para a maioria dos objetos.

  * Survivor Space (heap): O pool contendo objetos que sobreviveram à garbage collection do Eden space.

  * Tenured Generation (heap): O pool contendo objetos que existiram por algum tempo no survivor space.

  * Permanent Generation (nonheap): O pool contendo todos os dados reflexivos da própria máquina virtual, como objetos de classe e método. Com Java VMs que usam compartilhamento de dados de classe, esta geração é dividida em áreas somente leitura e leitura/escrita.

  * Code Cache (nonheap): A HotSpot Java VM também inclui um code cache, contendo memória que é usada para compilação e armazenamento de código nativo.

Você pode exibir diferentes gráficos para traçar o consumo desses pools de memória selecionando as opções necessárias no menu suspenso Chart. Além disso, clicar nos gráficos de barras Heap ou Nonheap no canto inferior direito alternará o gráfico exibido. Finalmente, você pode especificar o intervalo de tempo sobre o qual você rastreia o uso de memória, selecionando as opções necessárias no menu suspenso Time Range.

Consulte [Garbage Collection](<#/doc/guides/management/using-jconsole>).

A área Details mostra várias métricas de memória atuais:

  * Used: A quantidade de memória atualmente usada, incluindo a memória ocupada por todos os objetos, tanto alcançáveis quanto inalcançáveis.

  * Committed: A quantidade de memória garantida para estar disponível para uso pela Java VM. A quantidade de memória committed pode mudar ao longo do tempo. A máquina virtual Java pode liberar memória para o sistema e a quantidade de memória committed pode ser menor do que a quantidade de memória inicialmente alocada na inicialização. A quantidade de memória committed será sempre maior ou igual à quantidade de memória used.

  * Max: A quantidade máxima de memória que pode ser usada para gerenciamento de memória. Seu valor pode mudar ou ser indefinido. Uma alocação de memória pode falhar se a Java VM tentar aumentar a memória used para ser maior que a memória committed, mesmo que a quantidade usada seja menor ou igual a `max` (por exemplo, quando o sistema está com pouca memória virtual).

  * GC time: O tempo cumulativo gasto em garbage collection e o número total de chamadas. Pode ter várias linhas, cada uma representando um algoritmo de garbage collector usado na Java VM.

O gráfico de barras no canto inferior direito mostra a memória consumida pelos pools de memória em memória heap e nonheap. A barra ficará vermelha quando a memória usada exceder o limite de uso de memória. Você pode definir o limite de uso de memória através de um atributo do `MemoryMXBean`.

###### Memória Heap e Nonheap

A Java VM gerencia dois tipos de memória: memória heap e nonheap, ambas criadas quando a Java VM inicia.

  * Memória Heap: É a área de dados de tempo de execução da qual a Java VM aloca memória para todas as instâncias de classe e arrays. A heap pode ter um tamanho fixo ou variável. O garbage collector é um sistema automático de gerenciamento de memória que recupera a memória heap para objetos.

  * Memória Nonheap: Inclui uma área de método compartilhada entre todas as threads e memória necessária para o processamento interno ou otimização da Java VM. Ela armazena estruturas por classe, como um pool de constantes de tempo de execução, dados de campo e método, e o código para métodos e construtores. A área de método é logicamente parte da heap, mas, dependendo da implementação, uma Java VM pode não realizar garbage collection ou compactá-la. Assim como a memória heap, a área de método pode ter um tamanho fixo ou variável. A memória para a área de método não precisa ser contígua.

Além da área de método, uma Java VM pode exigir memória para processamento interno ou otimização, que também pertence à memória nonheap. Por exemplo, o compilador Just-In-Time (JIT) requer memória para armazenar o código de máquina nativo traduzido do código da Java VM para alto desempenho.

###### Pools de Memória e Gerenciadores de Memória

Pools de memória e gerenciadores de memória são aspectos chave do sistema de memória da Java VM.

  * Memory pool: Representa uma área de memória que a Java VM gerencia. A Java VM tem pelo menos um pool de memória e pode criar ou remover pools de memória durante a execução. Um pool de memória pode pertencer à memória heap ou à memória nonheap.

  * Memory manager: Gerencia um ou mais pools de memória. O garbage collector é um tipo de gerenciador de memória responsável por recuperar a memória usada por objetos inalcançáveis. Uma Java VM pode ter um ou mais gerenciadores de memória. Ela pode adicionar ou remover gerenciadores de memória durante a execução. Um pool de memória pode ser gerenciado por mais de um gerenciador de memória.

###### Garbage Collection

Garbage collection (GC) é como a Java VM libera a memória ocupada por objetos que não são mais referenciados. É comum pensar em objetos que possuem referências ativas como vivos e objetos não referenciados (ou inalcançáveis) como mortos. Garbage collection é o processo de liberar a memória usada pelos objetos mortos. Os algoritmos e parâmetros usados pelo GC podem ter efeitos dramáticos no desempenho.

O garbage collector da Java HotSpot VM usa GC geracional. O GC geracional aproveita a observação de que a maioria dos programas está em conformidade com as seguintes generalizações:

  * Eles criam muitos objetos que têm vida curta, por exemplo, iteradores e variáveis locais.

  * Eles criam alguns objetos que têm vida muito longa, por exemplo, objetos persistentes de alto nível.

O GC geracional divide a memória em várias gerações e atribui um ou mais pools de memória a cada uma. Quando uma geração esgota sua memória alocada, a VM executa um GC parcial (também chamado de minor collection) nesse pool de memória para recuperar a memória usada por objetos mortos. Este GC parcial é geralmente muito mais rápido do que um GC completo.

A Java HotSpot VM define duas gerações: a young generation (às vezes chamada de nursery) e a old generation. A young generation consiste em um Eden space e dois survivor spaces. A VM inicialmente atribui todos os objetos ao Eden space, e a maioria dos objetos morre lá. Quando ela executa um minor GC, a VM move quaisquer objetos restantes do Eden space para um dos survivor spaces. A VM move objetos que vivem tempo suficiente nos survivor spaces para o tenured space na old generation. Quando a tenured generation se enche, há um full GC que é frequentemente muito mais lento porque envolve todos os objetos vivos. A permanent generation contém todos os dados reflexivos da própria máquina virtual, como objetos de classe e método.

O arranjo padrão das gerações se parece com a [Figura 3-7](<#/doc/guides/management/using-jconsole>).

Figura 3-7 Gerações de Dados na Garbage Collection

Se o garbage collector se tornou um gargalo, você pode melhorar o desempenho personalizando os tamanhos das gerações. Usando o JConsole, você pode investigar a sensibilidade de sua métrica de desempenho experimentando os parâmetros do garbage collector. Consulte [Considerações de Desempenho](<#/>) no Guia de Ajuste de Garbage Collection da Java Platform, Standard Edition HotSpot Virtual Machine.

###### Monitorando o Uso de Threads

A aba Threads fornece informações sobre o uso de threads.

Figura 3-8 Aba Threads

A lista Threads no canto inferior esquerdo lista todas as threads ativas. Se você digitar uma string no campo Filter, a lista Threads mostrará apenas as threads cujo nome contém a string que você digitou. Clique no nome de uma thread na lista Threads para exibir informações sobre essa thread à direita, incluindo o nome da thread, estado e stack trace.

O gráfico mostra o número de threads ativas ao longo do tempo. Duas linhas são mostradas:

  * Vermelho: Número máximo de threads

  * Azul: Número de threads ativas

O Threading MXBean fornece várias outras operações úteis que não são cobertas pela aba Threads.

  * `findMonitorDeadlockedThreads`: Detecta se alguma thread está em deadlock nos bloqueios de monitor de objeto. Esta operação retorna um array de IDs de threads em deadlock.

  * `getThreadInfo`: Retorna as informações da thread. Isso inclui o nome, stack trace, e o bloqueio de monitor no qual a thread está atualmente bloqueada, se houver, e qual thread está mantendo esse bloqueio, bem como estatísticas de contenção de threads.

  * `getThreadCpuTime`: Retorna o tempo de CPU consumido por uma determinada thread.

Você pode acessar esses recursos adicionais através da aba MBeans selecionando Threading MXBean na árvore MBeans. Este MXBean lista todos os atributos e operações para acessar informações de threading na Java VM que está sendo monitorada. Consulte [Monitorando e Gerenciando MBeans](<#/doc/guides/management/using-jconsole>).

###### Detectando Threads em Deadlock

Para verificar se sua aplicação entrou em um deadlock (por exemplo, sua aplicação parece estar travada), threads em deadlock podem ser detectadas clicando em Detect Deadlock. Se alguma thread em deadlock for detectada, elas serão exibidas em uma nova aba que aparece ao lado da aba Threads, conforme mostrado na [Figura 3-9](<#/doc/guides/management/using-jconsole>).

Figura 3-9 Threads em Deadlock

Detect Deadlock detectará ciclos de deadlock envolvendo monitores de objeto e sincronizadores próprios de `java.util.concurrent` (consulte a documentação da especificação da API para [ java.lang.management.LockInfo](<https://docs.oracle.com/en/java/javase/25/docs/api/java.management/java/lang/management/LockInfo.html>)). O suporte a monitoramento para bloqueios `java.util.concurrent` foi adicionado no Java SE a partir da versão 6.0. Se o JConsole se conectar a uma Java SE 5.0 VM, o mecanismo Detect Deadlock encontrará apenas deadlocks relacionados a monitores de objeto. O JConsole não mostrará nenhum deadlock relacionado a sincronizadores próprios.

Consulte a documentação da API para [`java.lang.Thread`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Thread.State.html>) para mais informações sobre threads e threads daemon.

##### Monitorando o Carregamento de Classes

A aba Classes exibe informações sobre o carregamento de classes.

Figura 3-10 Aba Classes

O gráfico plota o número de classes carregadas ao longo do tempo.

  * A linha vermelha é o número total de classes carregadas (incluindo aquelas posteriormente descarregadas).

  * A linha azul é o número atual de classes carregadas.

A seção Details na parte inferior da aba exibe o número total de classes carregadas desde que a Java VM foi iniciada, o número atualmente carregado e o número descarregado. Você pode definir o rastreamento do carregamento de classes para saída verbose selecionando a caixa de seleção no canto superior direito.

##### Visualizando Informações da VM

A aba VM Summary fornece informações sobre a Java VM.

Figura 3-11 Aba VM Summary

As informações apresentadas nesta aba incluem o seguinte:

  * Resumo

    * Uptime: Tempo total desde que a Java VM foi iniciada.

    * Process CPU Time: Quantidade total de tempo de CPU que a Java VM consumiu desde que foi iniciada.

    * Total Compile Time: Tempo total acumulado gasto em compilação JIT. A Java VM determina quando a compilação JIT ocorre. A Hotspot VM usa compilação adaptativa, na qual a VM inicia uma aplicação usando um interpretador padrão, mas então analisa o código enquanto ele é executado para detectar gargalos de desempenho, ou hot spots.

  * Threads

    * Live threads: Número atual de threads daemon ativas mais threads nondaemon.

    * Peak: Maior número de threads ativas desde que a Java VM foi iniciada.

    * Daemon threads: Número atual de threads daemon ativas.

    * Total threads started: Número total de threads iniciadas desde que a Java VM foi iniciada, incluindo threads daemon, nondaemon e terminadas.

  * Classes

    * Current classes loaded: Número de classes atualmente carregadas na memória.

    * Total classes loaded: Número total de classes carregadas na memória desde que a Java VM foi iniciada, incluindo aquelas que foram posteriormente descarregadas.

    * Total classes unloaded: Número de classes descarregadas da memória desde que a Java VM foi iniciada.

  * Memória

    * Current heap size: Número de kilobytes atualmente ocupados pela heap.

    * Committed memory: Quantidade total de memória alocada para uso pela heap.

    * Maximum heap size: Número máximo de kilobytes ocupados pela heap.

    * Objects pending for finalization: Número de objetos pendentes para finalização.

    * Garbage collector: Informações sobre garbage collection, incluindo os nomes dos garbage collectors, número de coleções realizadas e tempo total gasto na execução do GC.

  * Sistema Operacional

    * Total physical memory: Quantidade de memória de acesso aleatório (RAM) que o sistema operacional possui.

    * Free physical memory: Quantidade de RAM livre disponível para o sistema operacional.

    * Committed virtual memory: Quantidade de memória virtual garantida para estar disponível para o processo em execução.

  * Outras Informações

    * VM arguments: Os argumentos de entrada que a aplicação passou para a Java VM, não incluindo os argumentos para o método main.

    * Class path: O class path que é usado pelo carregador de classes do sistema para procurar arquivos de classe.

    * Library path: A lista de caminhos para procurar ao carregar bibliotecas.

    * Boot class path: O caminho usado pelo carregador de classes bootstrap para procurar arquivos de classe.

##### Monitorando e Gerenciando MBeans

A aba MBeans exibe informações sobre todos os MBeans registrados no servidor MBean da plataforma de forma genérica. A aba MBeans permite acessar o conjunto completo da instrumentação MXBean da plataforma, incluindo aqueles que não são visíveis nas outras abas. Além disso, você pode monitorar e gerenciar os MBeans de sua aplicação usando a aba MBeans.

Figura 3-12 Aba MBeans

A árvore à esquerda mostra todos os MBeans atualmente em execução. Quando você seleciona um MBean na árvore, seu `MBeanInfo` e seu `Descriptor` MBean são exibidos à direita, e quaisquer attributes, operations ou notifications aparecem na árvore abaixo dele.

Todos os MXBeans da plataforma e suas várias operations e attributes são acessíveis a partir da aba MBeans do JConsole.

###### Construindo a Árvore MBean

Por padrão, os MBeans são exibidos na árvore com base em seus nomes de objeto. A ordem das propriedades chave especificadas quando os nomes de objeto são criados é preservada pelo JConsole ao adicionar MBeans à árvore MBean. A lista exata de propriedades chave que o JConsole usará para construir a árvore MBean será aquela retornada pelo método `ObjectName.getKeyPropertyListString()`, com `type` como a primeira chave, e `j2eeType`, se presente, como a segunda chave.

No entanto, confiar na ordem padrão das propriedades chave de `ObjectName` pode, às vezes, levar a um comportamento inesperado quando o JConsole renderiza a árvore MBean. Por exemplo, se dois nomes de objeto tiverem chaves semelhantes, mas sua ordem de chaves for diferente, os MBeans correspondentes não serão criados sob o mesmo nó na árvore MBean.

Por exemplo, suponha que você crie objetos MBean `Triangle` com os seguintes nomes.
```
    com.sun.example:type=Triangle,side=isosceles,name=1
    com.sun.example:type=Triangle,name=2,side=isosceles
    com.sun.example:type=Triangle,side=isosceles,name=3
    
```

No que diz respeito à tecnologia JMX, esses objetos serão tratados exatamente da mesma forma. A ordem das chaves no nome do objeto não faz diferença para a tecnologia JMX. No entanto, se o JConsole se conectar a esses MBeans e a renderização padrão da árvore MBean for usada, o objeto `com.sun.example:type=Triangle,name=2,side=isosceles` acabará sendo criado sob o nó `Triangle`, em um nó chamado `2`, que por sua vez conterá um subnó chamado `isosceles`. Os outros dois triângulos isósceles, `name=1` e `name=3`, serão agrupados sob `Triangle` em um nó diferente chamado `isosceles`, conforme mostrado na [Figura 3-13](<#/doc/guides/management/using-jconsole>).

Figura 3-13 Exemplo de Renderização Inesperada da Árvore MBean

Para evitar este problema, você pode especificar a ordem em que os MBeans são exibidos na árvore fornecendo uma lista ordenada de propriedades chave ao iniciar o JConsole na linha de comando. Isso é conseguido definindo a propriedade de sistema `com.sun.tools.jconsole.mbeans.keyPropertyList`, conforme mostrado no seguinte comando.
```
    % jconsole -J-Dcom.sun.tools.jconsole.mbeans.keyPropertyList=key[,key]*
    
```

A propriedade de sistema da lista de propriedades chave aceita uma lista de chaves separadas por vírgula, na ordem de sua seleção, onde `key` deve ser uma string representando uma chave de nome de objeto ou uma string vazia. Se uma chave especificada na lista não se aplicar a um MBean específico, essa chave será descartada. Se um MBean tiver mais chaves do que as especificadas na lista de propriedades chave, a ordem das chaves definida pelo valor retornado por `ObjectName.getKeyPropertyListString()` será usada para completar a ordem das chaves definida por `keyPropertyList`. Portanto, especificar uma lista vazia de chaves significa que o JConsole exibirá as chaves na ordem em que aparecem no `ObjectName` do MBean.

Então, voltando ao exemplo dos MBeans `Triangle` citados anteriormente, você pode iniciar o JConsole especificando a propriedade de sistema `keyPropertyList`, para que todos os seus MBeans sejam agrupados de acordo com sua propriedade chave `side` primeiro, e sua propriedade chave `name` em segundo. Para fazer isso, inicie o JConsole com o seguinte comando:
```
    % jconsole -J-Dcom.sun.tools.jconsole.mbeans.keyPropertyList=side,name
    
```

Iniciar o JConsole com esta propriedade de sistema especificada produzirá a árvore MBean conforme mostrado na [Figura 3-14](<#/doc/guides/management/using-jconsole>).

Figura 3-14 Exemplo de Árvore MBean Construída Usando keyPropertyList

Na [Figura 3-14](<#/doc/guides/management/using-jconsole>), a chave `side` vem primeiro, seguida pela chave `name`. A chave `type` vem no final porque não foi especificada na lista de propriedades chave, então o algoritmo da árvore MBean aplicou a ordem original das chaves para as chaves restantes. Consequentemente, a chave `type` é anexada no final, após as chaves, que foram definidas pela propriedade de sistema `keyPropertyList`.

De acordo com a convenção de nomes de objeto definida pelas [JMX Best Practices Guidelines](<http://www.oracle.com/technetwork/java/javase/tech/javamanagement-140525.html>), a chave `type` deve sempre vir primeiro. Você deve iniciar o JConsole com a seguinte propriedade de sistema:
```
    % jconsole -J-Dcom.sun.tools.jconsole.mbeans.keyPropertyList=type,side,name
    
```

O comando anterior fará com que o JConsole renderize a árvore MBean para os MBeans Triangle conforme mostrado na [Figura 3-15](<#/doc/guides/management/using-jconsole>).

Figura 3-15 Exemplo de Árvore MBean Construída Respeitando as Melhores Práticas JMX

Isso é mais compreensível do que as árvores MBean mostradas na [Figura 3-13](<#/doc/guides/management/using-jconsole>) e na [Figura 3-14](<#/doc/guides/management/using-jconsole>).
###### Atributos MBean

Selecionar o nó Attributes exibe todos os atributos de um MBean. [Figura 3-16](<#/doc/guides/management/using-jconsole>) mostra todos os atributos do MXBean da plataforma Threading.

Figura 3-16 Visualizando Todos os Atributos MBean

Selecionar um atributo MBean individual da árvore exibe então o valor do atributo, seu `MBeanAttributeInfo`, e o Descriptor associado no painel direito, como você pode ver na [Figura 3-17](<#/doc/guides/management/using-jconsole>).

Figura 3-17 Visualizando um Atributo MBean Individual

Você pode exibir informações adicionais sobre um atributo clicando duas vezes no valor do atributo, se ele aparecer em negrito. Por exemplo, se você clicar no valor do atributo `HeapMemoryUsage` do MBean `java.lang.Memory`, então você verá um gráfico que se parece com a [Figura 3-18](<#/doc/guides/management/using-jconsole>).

Figura 3-18 Exibindo Valores de Atributos

Clicar duas vezes em valores de atributos numéricos exibirá um gráfico que plota as mudanças nesse valor numérico. Por exemplo, clicar duas vezes no atributo CollectionTime do MBean do Garbage Collector `PS Marksweep` plotará o tempo gasto realizando a garbage collection.

Você também pode usar o JConsole para definir os valores de atributos graváveis. O valor de um atributo gravável é exibido em azul. Aqui você pode ver o atributo `Verbose` do MBean Memory.

Figura 3-19 Definindo Valores de Atributos Graváveis

Você pode definir atributos clicando neles e depois editando-os. Por exemplo, para habilitar ou desabilitar o rastreamento verbose do garbage collector no JConsole, selecione o Memory MXBean na aba MBeans e defina o atributo `Verbose` como `true` ou `false`. Da mesma forma, o MXBean de carregamento de classes também possui o atributo `Verbose`, que pode ser definido para habilitar ou desabilitar o rastreamento verbose de carregamento de classes.

###### Operações MBean

Selecionar o nó Operations exibe todas as operações de um MBean. As operações MBean aparecem como botões, nos quais você pode clicar para chamar a operação. [Figura 3-20](<#/doc/guides/management/using-jconsole>) mostra todas as operações do MXBean da plataforma Threading.

Figura 3-20 Visualizando Todas as Operações MBean

Selecionar uma operação MBean individual na árvore exibe o botão para chamar a operação MBean, e o `MBeanOperationInfo` da operação e seu Descriptor, como mostrado na [Figura 3-21](<#/doc/guides/management/using-jconsole>).

Figura 3-21 Visualizando Operações MBean Individuais

###### Notificações MBean

Você pode se inscrever para receber notificações selecionando o nó Notifications na árvore à esquerda e clicando no botão Subscribe que aparece à direita. O número de notificações recebidas é exibido entre parênteses, e o próprio nó Notifications aparecerá em negrito quando novas notificações forem recebidas. As notificações do Memory platform MXBean são mostradas na [Figura 3-22](<#/doc/guides/management/using-jconsole>).

Figura 3-22 Visualizando Notificações MBean

Selecionar uma notificação MBean individual exibe o `MBeanNotificationInfo` no painel direito, como mostrado na [Figura 3-23](<#/doc/guides/management/using-jconsole>).

Figura 3-23 Visualizando Notificações MBean Individuais

###### HotSpot Diagnostic MXBean

A aba MBeans do JConsole também permite que você instrua a HotSpot VM a realizar um heap dump, e a obter ou definir uma opção de VM usando o `HotSpotDiagnostic` MXBean.

Figura 3-24 Visualizando o HotSpot Diagnostic MBean

Você pode realizar um heap dump manualmente chamando a operação `dumpHeap` do MXBean `com.sun.management.HotSpotDiagnostic`. Além disso, você pode especificar a opção `HeapDumpOnOutOfMemoryError` da Java VM usando a operação `setVMOption`, para que a VM realize um heap dump automaticamente sempre que receber um `OutOfMemoryError`.

##### Criando Abas Personalizadas

Além das abas padrão existentes, você pode adicionar suas próprias abas personalizadas ao JConsole, para realizar suas próprias atividades de monitoramento. A API de plug-in do JConsole fornece um mecanismo pelo qual você pode, por exemplo, adicionar uma aba para acessar os MBeans de sua própria aplicação. A API de plug-in do JConsole define a classe abstrata `com.sun.tools.jconsole.JConsolePlugin` que você pode estender para construir seu plug-in personalizado.

Como afirmado anteriormente, seu plug-in deve estender `JConsolePlugin,` e implementar os métodos `getTabs` e `newSwingWorker` de `JConsolePlugin`. O método `getTabs` retorna a lista de abas a serem adicionadas ao JConsole, ou uma lista vazia. O método `newSwingWorker` retorna o `SwingWorker` responsável pela atualização da GUI do plug-in.

Seu plug-in deve ser fornecido em um arquivo Java archive (JAR) que contém um arquivo chamado `META-INF/services/com.sun.tools.jconsole.JConsolePlugin`. Este arquivo `JConsolePlugin` em si contém uma lista de todos os nomes de classes totalmente qualificados dos plug-ins que você deseja adicionar como novas abas do JConsole. O JConsole usa o recurso de carregamento de provedor de serviços para procurar e carregar os plug-ins. Você pode ter vários plug-ins, com uma entrada por plug-in no `JConsolePlugin`.

Para carregar os novos plug-ins personalizados no JConsole, inicie o JConsole com o seguinte comando:
```
    %  jconsole -pluginpath plugin-path
    
```

No comando anterior, `plugin-path` especifica os caminhos para os plug-ins do JConsole a serem procurados. Esses caminhos podem ser nomes de diretórios ou arquivos JAR, e múltiplos caminhos podem ser especificados, usando o caractere separador padrão da sua plataforma.

Um exemplo de plug-in do JConsole é fornecido com a plataforma Java SE 25. A aplicação `JTop` é uma demonstração (demo) do JDK que mostra o uso da CPU de todas as threads em execução na aplicação. Esta demo é útil para identificar threads que possuem alto consumo de CPU, e foi atualizada para ser usada como um plug-in do JConsole, bem como uma GUI autônoma. `JTop` é empacotado com a plataforma Java SE 25, como uma aplicação de demonstração. Você pode executar o JConsole com o plug-in JTop executando o seguinte comando:
```
    % JDK_HOME/bin/jconsole -pluginpath JDK_HOME/demo/management/JTop/JTop.jar
    
```

Se você se conectar a esta instância do JConsole, verá que a aba `JTop` foi adicionada, mostrando o uso da CPU das várias threads em execução.

Figura 3-25 Visualizando uma Aba de Plug-in Personalizada