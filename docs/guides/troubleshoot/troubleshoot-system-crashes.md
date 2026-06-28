# Solução de Problemas de Falhas do Sistema

## 6 Solução de Problemas de Falhas do Sistema

Este capítulo apresenta informações e orientações sobre alguns procedimentos específicos para solucionar problemas de falhas do sistema.

Uma falha, ou erro fatal, faz com que um processo seja encerrado de forma anormal. Existem várias razões possíveis para uma falha. Por exemplo, uma falha pode ocorrer devido a um bug na Java HotSpot VM, em uma biblioteca de sistema, em uma biblioteca Java SE ou uma API, em código nativo de aplicação, ou mesmo no sistema operacional (SO). Fatores externos, como exaustão de recursos no SO, também podem causar uma falha.

Falhas causadas por bugs na Java HotSpot VM ou no código da biblioteca Java SE são raras. Este capítulo fornece sugestões sobre como examinar uma falha e contornar alguns dos problemas (se possível) até que a causa do bug seja diagnosticada e corrigida.

Em geral, o primeiro passo com qualquer falha é localizar o `fatal error log`. Este é um arquivo de texto que a Java HotSpot VM gera em caso de falha. Consulte [Fatal Error Log](<#/doc/guides/troubleshoot/location-fatal-error-log>) para uma explicação de como localizar este arquivo, bem como uma descrição detalhada do mesmo.

Este capítulo contém as seguintes seções:

  * [Determinar Onde a Falha Ocorreu](<#/doc/guides/troubleshoot/troubleshoot-system-crashes>)

  * [Encontrar uma Solução Temporária](<#/doc/guides/troubleshoot/troubleshoot-system-crashes>)

  * [Considerações sobre a Versão do Microsoft Visual C++](<#/doc/guides/troubleshoot/troubleshoot-system-crashes>)

### Determinar Onde a Falha Ocorreu

Exemplos que demonstram como o log de erro pode ser usado para encontrar a causa da falha, e sugere algumas dicas para solucionar o problema dependendo da causa.

O cabeçalho do log de erro indica o tipo de erro e o frame problemático, enquanto a pilha de threads indica a thread atual e o rastreamento de pilha. Consulte [Header Format](<#/doc/guides/troubleshoot/location-fatal-error-log>).

As seguintes são possíveis causas para a falha.

  * [Falha no Código Nativo](<#/doc/guides/troubleshoot/troubleshoot-system-crashes>)

  * [Falha no Código Compilado](<#/doc/guides/troubleshoot/troubleshoot-system-crashes>)

  * [Falha na Thread do Compilador HotSpot](<#/doc/guides/troubleshoot/troubleshoot-system-crashes>)

  * [Falha na Thread da VM](<#/doc/guides/troubleshoot/troubleshoot-system-crashes>)

  * [Falha Devido a Estouro de Pilha](<#/doc/guides/troubleshoot/troubleshoot-system-crashes>)

  * [Falha Devido ao Limite da Área de Mapeamento de Memória Excedido](<#/doc/guides/troubleshoot/troubleshoot-system-crashes>)

#### Falha no Código Nativo

Analise o arquivo de despejo de falha ou arquivo core para identificar se a falha ocorreu no código nativo ou no código da biblioteca Java Native Interface (JNI).

Se o `fatal error log` indicar que o frame problemático é uma `native library`, então pode haver um bug no `native code` ou no código da `Java Native Interface (JNI) library`. A falha pode ser causada por outra coisa, mas a análise da biblioteca e de qualquer `core file` ou `crash dump` é um bom ponto de partida. Considere o trecho no exemplo a seguir do cabeçalho de um `fatal error log`.
```
    # An unexpected error has been detected by HotSpot Virtual Machine:
    #
    #  SIGSEGV (0xb) at pc=0x417789d7, pid=21139, tid=1024
    #
    # Java VM: Java HotSpot(TM) Server VM (6-beta2-b63 mixed mode)
    # Problematic frame:
    # C  [libApplication.so+0x9d7]
    
```

Neste caso, um `SIGSEGV` ocorreu com uma thread executando na biblioteca `libApplication.so`.

Em alguns casos, um bug em uma `native library` se manifesta como uma falha no `Java VM code`. Considere a falha no exemplo a seguir, onde uma `JavaThread` falha enquanto está no estado `_thread_in_vm` (o que significa que está executando no `Java VM code`).
```
    # An unexpected error has been detected by HotSpot Virtual Machine:
    #
    #  EXCEPTION_ACCESS_VIOLATION (0xc0000005) at pc=0x08083d77, pid=3700, tid=2896
    #
    # Java VM: Java HotSpot(TM) Client VM (1.5-internal mixed mode)
    # Problematic frame:
    # V  [jvm.dll+0x83d77]
    
    ---------------  T H R E A D  ---------------
    
    Current thread (0x00036960):  JavaThread "main" [_thread_in_vm, id=2896]
     :
    Stack: [0x00040000,0x00080000),  sp=0x0007f9f8,  free space=254k
    Native frames: (J=compiled Java code, j=interpreted, Vv=VM code, C=native code)
    V  [jvm.dll+0x83d77]
    C  [App.dll+0x1047]          <========= C/native frame
    j  Test.foo()V+0
    j  Test.main([Ljava/lang/String;)V+0
    v  ~StubRoutines::call_stub
    V  [jvm.dll+0x80f13]
    V  [jvm.dll+0xd3842]
    V  [jvm.dll+0x80de4]
    V  [jvm.dll+0x87cd2]
    C  [java.exe+0x14c0]
    C  [java.exe+0x64cd]
    C  [kernel32.dll+0x214c7]
     :
    
```

Neste caso, embora o frame problemático seja um `VM frame`, a pilha de threads mostra que uma rotina nativa em `App.dll` chamou a VM (provavelmente com JNI).

O primeiro passo para resolver uma falha em uma `native library` é investigar a origem da `native library` onde a falha ocorreu.

  * Se a `native library` for fornecida pela sua aplicação, então investigue o código-fonte da sua `native library`. Um número significativo de problemas com código JNI pode ser identificado executando a aplicação com a opção `-Xcheck:jni` adicionada à linha de comando. Consulte [The -Xcheck:jni Option](<#/doc/guides/troubleshoot/command-line-options1>).

  * Se a `native library` foi fornecida por outro fornecedor e é usada pela sua aplicação, então registre um relatório de bug contra esta aplicação de terceiros e forneça as informações do `fatal error log`.

  * Se a `native library` onde a falha ocorreu faz parte do JDK (por exemplo, `awt.dll`, `net.dll`, e assim por diante), então é possível que você tenha encontrado um bug na biblioteca ou API. Se sim, colete o máximo de dados possível e envie um bug ou relatório, indicando o nome da biblioteca. Você pode encontrar as bibliotecas do JDK nos diretórios `<java-home>/lib` ou `<java-home>/bin` da distribuição do JDK. Consulte [Submit a Bug Report](<#/doc/guides/troubleshoot/submit-bug-report>).

Você pode solucionar uma falha em uma `native application library` anexando o `native debugger` ao `core file` ou `crash dump`, se disponível. Dependendo do SO, o `native debugger` é `dbx`, `gdb` ou `windbg`. Consulte [Native Operating System Tools](<#/doc/guides/troubleshoot/diagnostic-tools>).

#### Falha no Código Compilado

Analise o `fatal error log` para identificar se a falha ocorreu no `compiled code`.

Se o `fatal error log` indicar que a falha ocorreu no `compiled code`, então é possível que você tenha encontrado um bug do compilador que resultou em geração de código incorreta. Você pode reconhecer uma falha no `compiled code` se o tipo do frame problemático for `J` (o que significa um `compiled Java frame`). O exemplo a seguir mostra tal falha.
```
    # An unexpected error has been detected by HotSpot Virtual Machine:
    #
    #  SIGSEGV (0xb) at pc=0x0000002a99eb0c10, pid=6106, tid=278546
    #
    # Java VM: Java HotSpot(TM) 64-Bit Server VM (1.6.0-beta-b51 mixed mode)
    # Problematic frame:
    # J  org.foobar.Scanner.body()V
    #
    :
    Stack: [0x0000002aea560000,0x0000002aea660000),  sp=0x0000002aea65ddf0,
      free space=1015k
    Native frames: (J=compiled Java code, j=interpreted, Vv=VM code, C=native code)
    J  org.foobar.Scanner.body()V
    
    [error occurred during error reporting, step 120, id 0xb]
    
```

Nota:

Uma pilha de threads completa não está disponível. A linha de saída "error occurred during error reporting" significa que surgiu um problema ao tentar obter o rastreamento de pilha (isso pode indicar corrupção de pilha).

Pode ser possível contornar temporariamente o problema trocando o compilador ou excluindo da compilação o método que provocou a falha.

Consulte [Working Around Crashes in the HotSpot Compiler Thread or Compiled Code](<#/doc/guides/troubleshoot/troubleshoot-system-crashes>).

#### Falha na Thread do Compilador HotSpot

Analise o `fatal error log` para identificar se a falha ocorreu na `HotSpot compiler thread`.

Se a saída do `fatal error log` mostrar que a thread atual é uma `JavaThread` chamada `CompilerThread0`, `CompilerThread1` ou `AdapterCompiler`, então é possível que você tenha encontrado um bug do compilador. Neste caso, pode ser necessário contornar temporariamente o problema trocando o compilador (por exemplo, usando a `HotSpot Client VM` em vez da `HotSpot Server VM`, ou vice-versa), ou excluindo da compilação o método que provocou a falha.

Consulte [Working Around Crashes in the HotSpot Compiler Thread or Compiled Code](<#/doc/guides/troubleshoot/troubleshoot-system-crashes>).

#### Falha na Thread da VM

Analise o `fatal error log` para identificar se a falha ocorreu na `VMThread`.

Se a saída do `fatal error log` mostrar que a thread atual é uma `VMThread`, então procure a linha contendo `VM_Operation` na seção `THREAD`. Uma `VMThread` é uma thread especial na HotSpot VM. Ela executa tarefas especiais na VM, como `garbage collection (GC)`. Se a `VM_Operation` sugerir que a operação é uma `GC`, então é possível que você tenha encontrado um problema como `heap corruption`.

Além de um problema de `GC`, pode ser outra coisa (como um bug do compilador ou de tempo de execução) que deixa referências de objetos no `heap` em um estado inconsistente ou incorreto. Neste caso, colete o máximo de informações possível sobre o ambiente e tente possíveis soluções temporárias. Se o problema estiver relacionado ao `GC`, então você pode ser capaz de contornar temporariamente o problema alterando a configuração do `GC`.

Consulte [Working Around Crashes During Garbage Collection](<#/doc/guides/troubleshoot/troubleshoot-system-crashes>).

#### Falha Devido a Estouro de Pilha

Um estouro de pilha no código da linguagem Java normalmente resultará na thread ofensora lançando a exceção `java.lang.StackOverflowError`.

Por outro lado, C e C++ escrevem além do final da pilha e causam um estouro de pilha. Este é um erro fatal que faz com que o processo seja encerrado.

Na implementação HotSpot, os métodos Java compartilham frames de pilha com código nativo C/C++, ou seja, código nativo do usuário e a própria máquina virtual. Os métodos Java geram código que verifica se o espaço da pilha está disponível a uma distância fixa em direção ao final da pilha, para que o código nativo possa ser chamado sem exceder o espaço da pilha. A distância em direção ao final da pilha é chamada de `shadow pages`. O tamanho das `shadow pages` está entre 3 e 20 páginas, dependendo da plataforma. Esta distância é ajustável, para que aplicações com código nativo que precisam de mais do que a distância padrão possam aumentar o tamanho da `shadow page`. A opção para aumentar as `shadow pages` é `-XX:StackShadowPages=`n, onde n é maior do que as `stack shadow pages` padrão para a plataforma.

Se sua aplicação obtiver uma falha de segmentação sem um `core file` ou `fatal error log file`, consulte [Fatal Error Log](<#/doc/guides/troubleshoot/location-fatal-error-log>). Ou se sua aplicação obtiver um `STACK_OVERFLOW_ERROR` no Windows ou a mensagem "An irrecoverable stack overflow has occurred", isso indica que o valor de `StackShadowPages` foi excedido e mais espaço é necessário.

Se você aumentar o valor de `StackShadowPages`, também pode precisar aumentar o tamanho padrão da pilha de threads usando o parâmetro `-Xss`. Aumentar o tamanho padrão da pilha de threads pode diminuir o número de threads que podem ser criadas, então tenha cuidado ao escolher um valor para o tamanho da pilha de threads. O tamanho da pilha de threads varia por plataforma de 256 KB a 1024 KB.
```
    # An unexpected error has been detected by HotSpot Virtual Machine:
    #
    #  EXCEPTION_STACK_OVERFLOW (0xc00000fd) at pc=0x10001011, pid=296, tid=2940
    #
    # Java VM: Java HotSpot(TM) Client VM (1.6-internal mixed mode, sharing)
    # Problematic frame:
    # C  [App.dll+0x1011]
    #
    
    ---------------  T H R E A D  ---------------
    
    Current thread (0x000367c0):  JavaThread "main" [_thread_in_native, id=2940]
    :
    Stack: [0x00040000,0x00080000),  sp=0x00041000,  free space=4k
    Native frames: (J=compiled Java code, j=interpreted, Vv=VM code, C=native code)
    C  [App.dll+0x1011]
    C  [App.dll+0x1020]
    C  [App.dll+0x1020]
    :
    C  [App.dll+0x1020]
    C  [App.dll+0x1020]
    ...<more frames>...
    
    Java frames: (J=compiled Java code, j=interpreted, Vv=VM code)
    j  Test.foo()V+0
    j  Test.main([Ljava/lang/String;)V+0
    v  ~StubRoutines::call_stub
    
```

Você pode interpretar as seguintes informações do exemplo acima.

  * A exceção é `EXCEPTION_STACK_OVERFLOW`.

  * O estado da thread é `_thread_in_native`, o que significa que a thread está executando código nativo ou JNI.

  * Nas informações da pilha, o espaço livre é de apenas 4 KB (uma única página em um sistema Windows). Além disso, o `stack pointer (sp)` está em `0x00041000`, que está próximo ao final da pilha em `0x00040000`.

  * A impressão dos `native frames` mostra que uma função nativa recursiva é o problema neste caso. A notação de saída `...<more frames>...` indica que frames adicionais existem, mas não foram impressos. A saída é limitada a 100 frames.

#### Falha Devido ao Limite da Área de Mapeamento de Memória Excedido

Certos comportamentos da aplicação podem fazer com que a máquina virtual use um grande número de áreas de mapeamento de memória. Em sistemas Linux, o número de áreas de mapeamento de memória é limitado por `vm.max_map_count`.

Este é um exemplo do tipo de erro que você pode receber se encontrar este problema:

`fatal error: Failed to map memory (Not enough space)`

Se você experimentar falhas com este tipo de mensagem de erro, você pode verificar o `hs_err.log` para ver o número de mapeamentos feitos pelo processo e comparar com o limite do sistema. Você pode encontrar esses números procurando no arquivo `hs_err.log` por estas duas linhas:
```
    Total number of mappings: <number>
    /proc/sys/vm/max_map_count (maximum number of memory map areas a process may have): <number>
```

Se os números forem semelhantes, você deve tentar executar novamente a aplicação com um valor aumentado de `vm.max_map_count`. Consulte o manual do seu Linux para mais informações sobre como fazer isso. O erro também pode ocorrer se a JVM ficar sem memória. Este erro, em geral, não indica um bug na máquina virtual.

### Encontrar uma Solução Temporária

Possíveis soluções temporárias se uma falha ocorrer com uma aplicação crítica.

Se uma falha ocorrer com uma aplicação crítica, e a falha parecer ser causada por um bug na HotSpot VM, então pode ser desejável encontrar rapidamente uma solução temporária. Se a falha ocorrer com uma aplicação que é implantada com a versão mais recente do JDK, então a falha deve ser relatada à Oracle.

Importante:

Mesmo que uma solução temporária nesta seção elimine com sucesso uma falha, a solução temporária não é uma correção para o problema, mas meramente uma solução provisória. Faça uma chamada de suporte ou registre um relatório de bug com a configuração original que demonstrou o problema.

Os seguintes são três cenários para encontrar soluções temporárias para falhas do sistema.

  * [Contornando Falhas na Thread do Compilador HotSpot ou Código Compilado](<#/doc/guides/troubleshoot/troubleshoot-system-crashes>)

  * [Contornando Falhas Durante a Coleta de Lixo](<#/doc/guides/troubleshoot/troubleshoot-system-crashes>)

  * [Contornando Falhas Causadas por Compartilhamento de Dados de Classe](<#/doc/guides/troubleshoot/troubleshoot-system-crashes>)

#### Contornando Falhas na Thread do Compilador HotSpot ou Código Compilado

Possíveis soluções temporárias se a falha ocorreu na thread do compilador hotspot.

Se o `fatal error log` indicar que a falha ocorreu em uma `compiler thread`, então é possível (mas nem sempre o caso) que você tenha encontrado um bug do compilador. Da mesma forma, se a falha estiver no `compiled code`, então é possível que o compilador tenha gerado código incorreto.

No caso da `HotSpot Client VM` (opção `-client`), a `compiler thread` aparece no log de erro como `CompilerThread0`. Com a `HotSpot Server VM`, existem múltiplas `compiler threads`, e estas aparecem no arquivo de log de erro como `CompilerThread0`, `CompilerThread1` e `AdapterThread`.

Desde o lançamento do JDK 7u5, o compilador HotSpot é ignorado por padrão. Uma opção de linha de comando está disponível para simular o comportamento antigo, o que é útil quando múltiplos métodos foram excluídos. Consulte [notable bug fixes in JDK 7u5](<http://www.oracle.com/technetwork/java/javase/7u5-relnotes-1653274.html>).

Para excluir métodos da compilação usando um `JVM flag` em vez do arquivo `.hotspot_compile`, consulte a opção `-XX:CompileCommand` em [Advanced JIT Compiler Options for java](<#/>) nas Especificações da Ferramenta do Java Development Kit.

O exemplo a seguir mostra um fragmento de um log de erro para um bug do compilador que foi encontrado e corrigido durante o desenvolvimento. O arquivo de log mostra que a `HotSpot Server VM` é usada, e a falha ocorreu em `CompilerThread1`. Além disso, o arquivo de log mostra que a `Current CompileTask` era a compilação do método `java.lang.Thread.setPriority`.
```
    # An unexpected error has been detected by HotSpot Virtual Machine:
    #
    :
    # Java VM: Java HotSpot(TM) Server VM (1.5-internal-debug mixed mode)
    :
    ---------------  T H R E A D  ---------------
    
    Current thread (0x001e9350): JavaThread "CompilerThread1" daemon [_thread_in_vm, id=20]
    
    Stack: [0xb2500000,0xb2580000),  sp=0xb257e500,  free space=505k
    Native frames: (J=compiled Java code, j=interpreted, Vv=VM code, C=native code)
    V  [libjvm.so+0xc3b13c]
    :
    
    Current CompileTask:
    opto: 11      java.lang.Thread.setPriority(I)V (53 bytes)
    
    ---------------  P R O C E S S  ---------------
    
    Java Threads: ( => current thread )
      0x00229930 JavaThread "Low Memory Detector" daemon [_thread_blocked, id=21]
    =>0x001e9350 JavaThread "CompilerThread1" daemon [_thread_in_vm, id=20]
     :
    
```

Neste caso, existem duas soluções temporárias potenciais:

  * A abordagem de força bruta: Altere a configuração para que a aplicação seja executada com a opção `-client` para especificar a `HotSpot Client VM`.

  * A abordagem sutil: Assuma que o bug ocorre apenas durante a compilação do método `java.lang.Thread.setPriority`, e exclua este método da compilação.

A primeira abordagem (usar a opção `-client`) pode ser trivial de configurar em alguns ambientes. Em outros, pode ser mais difícil se a configuração for complexa ou se a linha de comando para configurar a VM não for facilmente acessível. Em geral, mudar da `HotSpot Server VM` para a `HotSpot Client VM` também reduz o desempenho de pico de uma aplicação. Dependendo do ambiente, isso pode ser aceitável até que o problema seja diagnosticado e corrigido.

A segunda abordagem (excluir o método da compilação) requer a criação do arquivo `.hotspot_compiler` no diretório de trabalho da aplicação. O exemplo a seguir mostra esta abordagem.
```
    exclude java/lang/Thread setPriority
    
```

Em geral, o formato deste arquivo é `exclude class method`, onde `class` é a classe (totalmente qualificada com o nome do pacote) e `method` é o nome do método. Os métodos construtores são especificados como `<init>` e os inicializadores estáticos são especificados como `<clinit>`.

Nota:

O arquivo `.hotspot_compiler` é uma interface não suportada. Ele é documentado aqui apenas para fins de solução de problemas e para encontrar uma solução temporária.

Após a reinicialização da aplicação, o compilador não tentará compilar nenhum dos métodos excluídos no arquivo `.hotspot_compiler`. Em alguns casos, isso pode proporcionar um alívio temporário até que a causa raiz da falha seja diagnosticada e o bug seja corrigido.

Para verificar se a HotSpot VM localizou e processou corretamente o arquivo `.hotspot_compiler` que é mostrado no exemplo anterior da segunda abordagem, procure as informações de log em tempo de execução.

Nota:

O separador de nome de arquivo é um ponto, não uma barra.

#### Contornando Falhas Durante a Coleta de Lixo

Possível solução temporária se a falha ocorrer durante a coleta de lixo.

Se uma falha ocorrer durante a `garbage collection (GC)`, então o `fatal error log` relata que uma `VM_Operation` está em andamento. Para fins desta discussão, assuma que o `mostly concurrent GC` (`-XX:+UseConcMarkSweep`) não está em uso. A `VM_Operation` é mostrada na seção `THREAD` do log e indica uma das seguintes situações:

  * `Generation collection for allocation`

  * `Full generation collection`

  * `Parallel GC failed allocation`

  * `Parallel GC failed permanent allocation`

  * `Parallel GC system GC`

Muito provavelmente, a thread atual relatada no log é a `VMThread`. Esta é a thread especial usada para executar tarefas especiais na HotSpot VM. O exemplo a seguir é um fragmento do `fatal error log` de uma falha no `serial garbage collector`.
```
    ---------------  T H R E A D  ---------------
    
    Current thread (0x002cb720):  VMThread [id=3252]
    
    siginfo: ExceptionCode=0xc0000005, reading address 0x00000000
    
    Registers:
    EAX=0x0000000a, EBX=0x00000001, ECX=0x00289530, EDX=0x00000000
    ESP=0x02aefc2c, EBP=0x02aefc44, ESI=0x00289530, EDI=0x00289530
    EIP=0x0806d17a, EFLAGS=0x00010246
    
    Top of Stack: (sp=0x02aefc2c)
    0x02aefc2c:   00289530 081641e8 00000001 0806e4b8
    0x02aefc3c:   00000001 00000000 02aefc9c 0806e4c5
    0x02aefc4c:   081641e8 081641c8 00000001 00289530
    0x02aefc5c:   00000000 00000000 00000001 00000001
    0x02aefc6c:   00000000 00000000 00000000 08072a9e
    0x02aefc7c:   00000000 00000000 00000000 00035378
    0x02aefc8c:   00035378 00280d88 00280d88 147fee00
    0x02aefc9c:   02aefce8 0806e0f5 00000001 00289530
    Instructions: (pc=0x0806d17a)
    0x0806d16a:   15 08 83 3d c0 be 15 08 05 53 56 57 8b f1 75 0f
    0x0806d17a:   0f be 05 00 00 00 00 83 c0 05 a3 c0 be 15 08 8b 
    
    Stack: [0x02ab0000,0x02af0000),  sp=0x02aefc2c,  free space=255k
    Native frames: (J=compiled Java code, j=interpreted, Vv=VM code, C=native code)
    V  [jvm.dll+0x6d17a]
    V  [jvm.dll+0x6e4c5]
    V  [jvm.dll+0x6e0f5]
    V  [jvm.dll+0x71771]
    V  [jvm.dll+0xfd1d3]
    V  [jvm.dll+0x6cd99]
    V  [jvm.dll+0x504bf]
    V  [jvm.dll+0x6cf4b]
    V  [jvm.dll+0x1175d5]
    V  [jvm.dll+0x1170a0]
    V  [jvm.dll+0x11728f]
    V  [jvm.dll+0x116fd5]
    C  [MSVCRT.dll+0x27fb8]
    C  [kernel32.dll+0x1d33b]
    
    VM_Operation (0x0373f71c): generation collection for allocation, mode:
     safepoint, requested by thread 0x02db7108
    
```

Nota:

Uma falha durante a `garbage collection` não sugere um bug na implementação da `garbage collection`. Também pode indicar um bug do compilador ou de tempo de execução, ou algum outro problema.

Você pode tentar as seguintes soluções temporárias se você repetidamente obtiver uma falha durante a `garbage collection`:

  * Mude a configuração do `GC`. Por exemplo, se você estiver usando o `serial collector`, tente o `throughput collector`, ou vice-versa.

  * Se você estiver usando a `HotSpot Server VM`, tente a `HotSpot Client VM`.

Se você não tem certeza de qual `garbage collector` está em uso, você pode usar o utilitário `jmap` no sistema operacional Linux. Consulte [The jmap Utility](<#/doc/guides/troubleshoot/diagnostic-tools>) para obter as informações de `heap` do `core file`, se o `core file` estiver disponível. Em geral, se a configuração do `GC` não for especificada na linha de comando, o `serial collector` será usado no Windows. No sistema operacional Linux, depende da configuração da máquina. Se a máquina tiver pelo menos 2 GB de memória e tiver pelo menos 2 CPUs, o `throughput collector (Parallel GC)` será usado. Para máquinas menores, o `serial collector` é o padrão. A opção para selecionar o `serial collector` é `-XX:+UseSerialGC` e a opção para selecionar o `throughput collector` é `-XX:+UseParallelGC`. Se, como solução temporária, você mudar do `throughput collector` para o `serial collector`, você pode experimentar alguma degradação de desempenho em sistemas multiprocessadores. Isso pode ser aceitável até que o problema raiz seja diagnosticado e corrigido.

#### Contornando Falhas Causadas por Compartilhamento de Dados de Classe

Quando o JDK é instalado, o instalador carrega um conjunto de classes do arquivo JAR do sistema em uma representação interna privada e despeja essa representação em um arquivo chamado `shared archive`. Quando a JVM inicia, o `shared archive` é mapeado na memória para permitir o compartilhamento de metadados de JVM somente leitura para essas classes entre múltiplos processos JVM. O tempo de inicialização é reduzido, economizando o custo, pois restaurar o `shared archive` é mais rápido do que carregar as classes. O `class data sharing` é suportado com a Java HotSpot VM. Os `garbage collectors` G1, serial, parallel e parallelOldGC são suportados. O recurso `shared string` (parte do `class data sharing`) suporta apenas o `garbage collector` G1 em plataformas não-Windows.

O `fatal error log` imprime a string de versão no cabeçalho do log. Se o `sharing` estiver habilitado, ele é indicado pelo texto "sharing", conforme mostrado no exemplo a seguir.
```
    # An unexpected error has been detected by HotSpot Virtual Machine:
    #
    #  EXCEPTION_ACCESS_VIOLATION (0xc0000005) at pc=0x08083d77, pid=3572, tid=784
    #
    # Java VM: Java HotSpot(TM) Client VM (1.5-internal mixed mode, sharing)
    # Problematic frame:
    # V  [jvm.dll+0x83d77]
    
```

O CDS pode ser desabilitado fornecendo a opção `-Xshare:off` na linha de comando. Se a falha ocorrer apenas com o `sharing` habilitado, então é possível que você tenha encontrado um bug neste recurso. Nesse caso, colete o máximo de informações possível e envie um relatório de bug.

### Considerações sobre a Versão do Microsoft Visual C++

Se você experimentar uma falha com uma aplicação Java e se você tiver bibliotecas nativas ou JNI que são compiladas com uma versão diferente do compilador, então você deve considerar problemas de compatibilidade entre os tempos de execução. Especificamente, seu ambiente é suportado apenas se você seguir as diretrizes da Microsoft ao lidar com múltiplos tempos de execução. Por exemplo, se você alocar memória usando um tempo de execução, então você deve liberá-la usando o mesmo tempo de execução. Comportamento imprevisível ou falhas podem acontecer se você liberar um recurso usando uma biblioteca diferente daquela que alocou o recurso.

Nota:

Use a opção de comando `java -Xinternalversion` para determinar qual versão do Microsoft Visual Studio construiu o JDK. Esta versão pode variar dependendo da versão do JDK.