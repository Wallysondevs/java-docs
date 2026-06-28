# Log de Erro Fatal

## Um Log de Erro Fatal

O log de erro fatal é criado quando ocorre um erro fatal. Ele contém informações e o estado obtido no momento do erro fatal.

Nota:

O formato deste arquivo pode mudar ligeiramente em versões de atualização.

Este apêndice contém as seguintes seções:

  * [Localização do Log de Erro Fatal](<#/doc/guides/troubleshoot/location-fatal-error-log>)

  * [Descrição do Log de Erro Fatal](<#/doc/guides/troubleshoot/location-fatal-error-log>)

  * [Formato do Cabeçalho](<#/doc/guides/troubleshoot/location-fatal-error-log>)

  * [Formato da Seção de Thread](<#/doc/guides/troubleshoot/location-fatal-error-log>)

  * [Formato da Seção de Processo](<#/doc/guides/troubleshoot/location-fatal-error-log>)

  * [Formato da Seção de Sistema](<#/doc/guides/troubleshoot/location-fatal-error-log>)

### Localização do Log de Erro Fatal

Para especificar onde o arquivo de log será criado, use a flag de produto `-XX:ErrorFile=`file`, onde `file` representa o caminho completo para a localização do arquivo de log.

A substring `%%` na variável `file` é convertida para `%`, e a substring `%p` é convertida para o PID do processo.

No exemplo a seguir, o arquivo de log de erro será gravado no diretório `/var/log/java` e será nomeado `java_errorpid.log`:
```
    java -XX:ErrorFile=/var/log/java/java_error%p.log
    
```

Se a flag `-XX:ErrorFile=file` não for especificada, o nome padrão do arquivo de log é `hs_err_pid.log`, onde `pid` é o PID do processo.

Além disso, se a flag `-XX:ErrorFile=file` não for especificada, o sistema tenta criar o arquivo no diretório de trabalho do processo. Caso o arquivo não possa ser criado no diretório de trabalho (espaço insuficiente, problema de permissão ou outra questão), o arquivo é criado no diretório temporário do sistema operacional. No sistema operacional Linux, o diretório temporário é `/tmp`. No Windows, o diretório temporário é especificado pelo valor da variável de ambiente `TMP`. Se essa variável de ambiente não estiver definida, o valor da variável de ambiente `TEMP` é usado.

### Descrição do Log de Erro Fatal

O log de erro contém informações obtidas no momento do erro fatal, incluindo as seguintes informações, quando possível:

  * A exceção operacional ou sinal que provocou o erro fatal

  * Informações de versão e configuração

  * Detalhes sobre a thread que provocou o erro fatal e o stack trace da thread

  * Lista de threads em execução e seus estados

  * Informações resumidas sobre o heap

  * Lista de bibliotecas nativas carregadas

  * Argumentos de linha de comando

  * Variáveis de ambiente

  * Detalhes sobre o sistema operacional e CPU

Nota:

Em alguns casos, apenas um subconjunto dessas informações é enviado para o log de erro. Isso pode acontecer quando um erro fatal é de tal gravidade que o manipulador de erros é incapaz de se recuperar e relatar todos os detalhes.

O log de erro é um arquivo de texto que consiste nas seguintes seções:

  * Um cabeçalho que fornece uma breve descrição da falha. Veja [Formato do Cabeçalho](<#/doc/guides/troubleshoot/location-fatal-error-log>).

  * Uma seção com informações da thread. Veja [Formato da Seção de Thread](<#/doc/guides/troubleshoot/location-fatal-error-log>).

  * Uma seção com informações do processo. Veja [Formato da Seção de Processo](<#/doc/guides/troubleshoot/location-fatal-error-log>).

  * Uma seção com informações do sistema. Veja [Formato da Seção de Sistema](<#/doc/guides/troubleshoot/location-fatal-error-log>).

Nota:

O formato do log de erro fatal descrito aqui é baseado no Java SE 6. O formato pode ser diferente em outras versões.

### Formato do Cabeçalho

A seção de cabeçalho no início de cada arquivo de log de erro fatal contém uma breve descrição do problema.

O cabeçalho também é impresso na saída padrão e pode aparecer no log de saída da aplicação.

O cabeçalho inclui um link para a Página de Relatório de Erros da HotSpot Virtual Machine, onde o usuário pode enviar um relatório de bug.
```
    #
    # A fatal error has been detected by the Java Runtime Environment:
    #
    #  SIGSEGV (0xb) at pc=0x00007f0f159f857d, pid=18240, tid=18245
    #
    # JRE version: Java(TM) SE Runtime Environment (9.0+167) (build 9-ea+167)
    # Java VM: Java HotSpot(TM) 64-Bit Server VM (9-ea+167, mixed mode, tiered, compressed oops, g1 gc, linux-amd64)
    # Problematic frame:
    # C  [libMyApp.so+0x57d]  Java_MyApp_readData+0x11
    #
    # Core dump will be written. Default location: /cores/core.18240)
    #
    # If you would like to submit a bug report, please visit:
    #   http://bugreport.java.com/bugreport/crash.jsp
    # The crash happened outside the Java Virtual Machine in native code.
    # See problematic frame for where to report the bug.
    #
```

O exemplo mostra que a VM falhou em um sinal inesperado.

A linha e a tabela a seguir descrevem o tipo de sinal, o program counter (pc) que causou o sinal, o ID do processo e o ID da thread.

`# SIGSEGV (0xb) at pc=0x00007f0f159f857d, pid=18240, tid=18245`

Tabela A-1 Descrição da Linha

Componente da Linha | Descrição
---|---
`SIGSEGV` | Nome do sinal
`(0xb)` | Número do sinal
`pc=0x00007f0f159f857d` | Program counter (ponteiro de instrução)
`pid=18240` | ID do Processo
`tid=18245` | ID da Thread

A próxima linha contém a versão da VM (VM cliente ou VM servidor), uma indicação se a aplicação foi executada em modo misto ou interpretado, e uma indicação se o compartilhamento de arquivos de classe estava habilitado, conforme mostrado na linha a seguir.
```
    # Java VM: Java HotSpot(TM) 64-Bit Server VM (9-ea+167, mixed mode, tiered, compressed oops, g1 gc, linux-amd64)
    
```

A próxima linha é o frame da função que causou a falha, conforme mostrado no exemplo a seguir.

Tabela A-2 Descrição da Linha

Componente da Linha | Descrição
---|---
`C` | Tipo de frame
`[libMyApp.so+0x57d] Java_MyApp_readData+0x11` | O mesmo que pc, mas representado como nome da biblioteca e offset. Para bibliotecas independentes de posição (JVM e a maioria das bibliotecas compartilhadas), é possível inspecionar as instruções que causaram a falha sem um depurador ou arquivo core, usando um desassemblador para despejar instruções próximas ao offset.

Neste exemplo, o tipo de frame "C" indica um frame C nativo. [Tabela A-3](<#/doc/guides/troubleshoot/location-fatal-error-log>) mostra os possíveis tipos de frame.

Tabela A-3 Tipos de Frame

Tipo de Frame | Descrição
---|---
C | Frame C nativo
j | Frame Java interpretado
V | Frame da VM
v | Frame stub gerado pela VM
J | Outros tipos de frame, incluindo frames Java compilados

Erros internos farão com que o manipulador de erros da VM gere um dump de erro semelhante. No entanto, o formato do cabeçalho é diferente. Exemplos de erros internos são falha de `guarantee()`, falha de asserção, `ShouldNotReachHere()`, e assim por diante. O exemplo a seguir mostra o formato do cabeçalho para um erro interno.
```
    #
    # An unexpected error has been detected by HotSpot Virtual Machine:
    #
    # Internal Error (4F533F4C494E55583F491418160E43505000F5), pid=10226, tid=16384
    #
    # Java VM: Java HotSpot(TM) Client VM (1.6.0-rc-b63 mixed mode)
    
```

No cabeçalho acima, não há nome de sinal ou número de sinal. Em vez disso, a segunda linha agora contém `Internal Error` e uma longa string hexadecimal. Esta string hexadecimal codifica o módulo de origem e o número da linha onde o erro foi detectado. Em geral, esta "string de erro" é útil apenas para engenheiros que trabalham na HotSpot Virtual Machine.

A string de erro codifica um número de linha e, portanto, muda a cada alteração de código e versão. Uma falha com uma determinada string de erro em uma versão (por exemplo, 1.6.0) pode não corresponder à mesma falha em uma versão de atualização (por exemplo, 1.6.0_01), mesmo que as strings correspondam.

Nota:

Não presuma que uma solução alternativa ou solução que funcionou em uma situação associada a uma determinada string de erro funcionará em outra situação associada à mesma string de erro. Observe os seguintes fatos:

  * Erros com a mesma causa raiz podem ter strings de erro diferentes.

  * Erros com a mesma string de erro podem ter causas raiz completamente diferentes.

Portanto, a string de erro não deve ser usada como o único critério ao solucionar bugs.

### Formato da Seção de Thread

A seção de thread do log contém informações sobre a thread que falhou.

Se várias threads falharem ao mesmo tempo, apenas uma thread será impressa.

Informações da Thread

A primeira parte da seção de thread mostra a thread que causou o erro fatal, conforme mostrado no exemplo a seguir.

`Current thread (0x00007f102c013000): JavaThread "main" [_thread_in_native, id=18245, stack(0x00007f10345c0000,0x00007f10346c0000)]`

Tabela A-4 Informações da Thread

Componente da Thread | Descrição
---|---
`0x00007f102c013000` | Ponteiro da Thread
`JavaThread` | Tipo de Thread
`main` | Nome da Thread
`_thread_in_native` | Estado da Thread
`id=18245` | ID da Thread
`stack(0x00007f10345c0000,0x00007f10346c0000)` | Stack

O ponteiro da thread é o ponteiro para a estrutura interna da thread da Java VM. Geralmente, não é de interesse, a menos que você esteja depurando uma Java VM ativa ou um arquivo core.

A lista a seguir mostra os possíveis tipos de thread.

  * `JavaThread`

  * `VMThread`

  * `CompilerThread`

  * `GCTaskThread`

  * `WatcherThread`

  * `ConcurrentMarkSweepThread`

[Tabela A-5](<#/doc/guides/troubleshoot/location-fatal-error-log>) mostra os estados importantes da thread.

Tabela A-5 Estados da Thread

Estado da Thread | Descrição
---|---
`_thread_uninitialized` | A thread não foi criada. Isso ocorre apenas em caso de corrupção de memória.
`_thread_new` | A thread foi criada, mas ainda não iniciou.
`_thread_in_native` | A thread está executando código nativo. O erro é provavelmente um bug no código nativo.
`_thread_in_vm` | A thread está executando código da VM.
`_thread_in_Java` | A thread está executando código Java interpretado ou compilado.
`_thread_blocked` | A thread está bloqueada.
`..._trans` | Se qualquer um dos estados anteriores for seguido pela string `_trans`, isso significa que a thread está mudando para um estado diferente.

O ID da thread na saída é o identificador da thread nativa.

Se uma thread Java for uma thread daemon, a string `daemon` é impressa antes do estado da thread.

Informações do Sinal

A próxima informação no log de erro descreve o sinal inesperado que causou o encerramento da VM. Em um sistema Windows, a saída aparece conforme mostrado no exemplo a seguir.
```
    siginfo: ExceptionCode=0xc0000005, reading address 0xd8ffecf1
    
```

No exemplo acima, o código de exceção é `0xc0000005` (`ACCESS_VIOLATION`), e a exceção ocorreu quando a thread tentou ler o endereço `0xd8ffecf1`.

No sistema operacional Linux, o número do sinal (`si_signo`) e o código do sinal (`si_code`) são usados para identificar a exceção, como segue:
```
    siginfo: si_signo: 11 (SIGSEGV), si_code: 1 (SEGV_MAPERR), si_addr: 0x0000000000000000
    
```

Contexto de Registradores

A próxima informação no log de erro mostra o contexto dos registradores no momento do erro fatal. O formato exato desta saída depende do processador. O exemplo a seguir mostra a saída para o processador Intel(R) Xeon(R).
```
    Registers:
    RAX=0x0000000000000000, RBX=0x00007f0f17aff3b0, RCX=0x0000000000000001, RDX=0x00007f1033880358
    RSP=0x00007f10346be930, RBP=0x00007f10346be930, RSI=0x00007f10346be9a0, RDI=0x00007f102c013218
    R8 =0x00007f0f17aff3b0, R9 =0x0000000000000008, R10=0x00007f1011bb1de9, R11=0x0000000101cfc5e0
    R12=0x0000000000000000, R13=0x00007f0f17aff3b0, R14=0x00007f10346be9a8, R15=0x00007f102c013000
    RIP=0x00007f0f159f857d, EFLAGS=0x0000000000010283, CSGSFS=0x0000000000000033, ERR=0x0000000000000004
    
```

Os valores dos registradores podem ser úteis quando combinados com instruções, conforme descrito abaixo.

Instruções de Máquina

Após os valores dos registradores, o exemplo a seguir mostra o log de erro que contém o topo da pilha seguido por 32 bytes de instruções (opcodes) próximas ao program counter (PC) quando o sistema falhou. Esses opcodes podem ser decodificados com um desassemblador para produzir as instruções ao redor do local da falha.

Nota:

As instruções IA32 e AMD64 têm comprimento variável, e por isso nem sempre é possível decodificar instruções de forma confiável antes do PC da falha.
```
    Top of Stack: (sp=0x00007f10346be930)
    0x00007f10346be930:   00007f10346be990 00007f1011bb1e15
    0x00007f10346be940:   00007f1011bb1b33 00007f10346be948
    0x00007f10346be950:   00007f0f17aff3b0 00007f10346be9a8
    0x00007f10346be960:   00007f0f17aff5a0 0000000000000000 
    
    Instructions: (pc=0x00007f0f159f857d)
    0x00007f0f159f855d:   3d e6 08 20 00 ff e0 0f 1f 40 00 5d c3 90 90 55
    0x00007f0f159f856d:   48 89 e5 48 89 7d f8 48 89 75 f0 b8 00 00 00 00
    0x00007f0f159f857d:   8b 00 5d c3 90 90 90 90 90 90 90 90 90 90 90 90
    0x00007f0f159f858d:   90 90 90 55 48 89 e5 53 48 83 ec 08 48 8b 05 88 
    
```

Pilha da Thread

Quando possível, a próxima saída no log de erro é a pilha da thread, conforme mostrado no exemplo a seguir. Isso inclui os endereços da base e do topo da pilha, o ponteiro da pilha atual e a quantidade de espaço de pilha não utilizado disponível para a thread. Isso é seguido, quando possível, pelos frames da pilha, e até 100 frames são impressos. Para frames C/C++, o nome da biblioteca também pode ser impresso. Nota: Em algumas condições de erro fatal, a pilha pode estar corrompida, e este detalhe pode não estar disponível.
```
    Stack: [0x00007f10345c0000,0x00007f10346c0000],  sp=0x00007f10346be930,  free space=1018k
    Native frames: (J=compiled Java code, A=aot compiled Java code, j=interpreted, Vv=VM code, C=native code)
    C  [libMyApp.so+0x57d]  Java_MyApp_readData+0x11
    j  MyApp.readData()I+0
    j  MyApp.main([Ljava/lang/String;)V+15
    v  ~StubRoutines::call_stub
    V  [libjvm.so+0x839eea]  JavaCalls::call_helper(JavaValue*, methodHandle const&, JavaCallArguments*, Thread*)+0x47a
    V  [libjvm.so+0x896fcf]  jni_invoke_static(JNIEnv_*, JavaValue*, _jobject*, JNICallType, _jmethodID*, JNI_ArgumentPusher*, Thread*) [clone .isra.90]+0x21f
    V  [libjvm.so+0x8a7f1e]  jni_CallStaticVoidMethod+0x14e
    C  [libjli.so+0x4142]  JavaMain+0x812
    C  [libpthread.so.0+0x7e9a]  start_thread+0xda
    
    Java frames: (J=compiled Java code, j=interpreted, Vv=VM code)
    j  MyApp.readData()I+0
    j  MyApp.main([Ljava/lang/String;)V+15
    v  ~StubRoutines::call_stub
    
```

O log contém duas pilhas de thread.

  * A primeira pilha de thread é `Native frames`, que imprime a thread nativa mostrando todas as chamadas de função. No entanto, esta pilha de thread não leva em consideração os métodos Java que são inlined pelo compilador de tempo de execução; se os métodos são inlined, eles parecem fazer parte do frame da pilha do pai.

As informações na pilha de thread para frames nativos fornecem informações importantes sobre a causa da falha. Ao analisar as bibliotecas na lista de cima para baixo, você pode geralmente determinar qual biblioteca pode ter causado o problema e relatá-lo à organização apropriada responsável por essa biblioteca.

  * A segunda pilha de thread é `Java frames`, que imprime os frames Java incluindo os métodos inlined, pulando os frames nativos. Dependendo da falha, pode não ser possível imprimir a pilha de thread nativa, mas pode ser possível imprimir os frames Java.

Mais Detalhes

Se o erro ocorreu na thread da VM ou em uma thread do compilador, mais detalhes podem ser vistos no exemplo a seguir. Por exemplo, no caso da thread da VM, a operação da VM é impressa se a thread da VM estiver executando uma operação da VM no momento do erro fatal. No exemplo de saída a seguir, a thread do compilador causou o erro fatal. A tarefa é uma tarefa do compilador, e a HotSpot Client VM está compilando o método `hs101t004Thread.ackermann`.
```
    Current CompileTask:
    HotSpot Client Compiler:754   b  
    nsk.jvmti.scenarios.hotswap.HS101.hs101t004Thread.ackermann(IJ)J (42 bytes)
    
```

Para a HotSpot Server VM, a saída para a tarefa do compilador é ligeiramente diferente, mas também incluirá o nome completo da classe e do método.

### Formato da Seção de Processo

A seção de processo é impressa após a seção de thread e contém informações sobre todo o processo, incluindo a lista de threads e o uso de memória do processo.

Lista de Threads

A lista de threads inclui as threads das quais a VM tem conhecimento, conforme mostrado no exemplo a seguir.
```
    =>0x0805ac88 JavaThread "main" [_thread_in_native, id=21139, stack(0x00007f10345c0000,0x00007f10346c0000)]
    
```

Tabela A-6 Descrição da Lista de Threads

Componente da Thread | Descrição
---|---
`=>` | Thread Atual
`0x0805ac88` | Ponteiro da Thread
`JavaThread` | Tipo de Thread
`main` | Nome da Thread
`_thread_in_native` | Estado da Thread
`id=21139` | ID da Thread
`stack(0x00007f10345c0000,0x00007f10346c0000)` | Stack

Isso inclui todas as threads Java e algumas threads internas da VM, mas não inclui nenhuma thread nativa criada pela aplicação do usuário que não tenha se anexado à VM, conforme mostrado no exemplo a seguir.
```
    Java Threads: ( => current thread )
      0x00007f102c469800 JavaThread "C2 CompilerThread0" daemon [_thread_blocked, id=18302, stack(0x00007f0f16f31000,0x00007f0f17032000)]
      0x00007f102c468000 JavaThread "Signal Dispatcher" daemon [_thread_blocked, id=18301, stack(0x00007f0f17032000,0x00007f0f17133000)]
      0x00007f102c450800 JavaThread "Finalizer" daemon [_thread_blocked, id=18298, stack(0x00007f0f173fc000,0x00007f0f174fd000)]
      0x00007f102c448800 JavaThread "Reference Handler" daemon [_thread_blocked, id=18297, stack(0x00007f0f174fd000,0x00007f0f175fe000)]
    =>0x00007f102c013000 JavaThread "main" [_thread_in_native, id=18245, stack(0x00007f10345c0000,0x00007f10346c0000)]
    
    Other Threads:
      0x00007f102c43f000 VMThread "VM Thread" [stack: 0x00007f0f175ff000,0x00007f0f176ff000] [id=18296]
      0x00007f102c54b000 WatcherThread [stack: 0x00007f0f15bfb000,0x00007f0f15cfb000] [id=18338]
    
```

O tipo de thread e o estado da thread são descritos em [Formato da Seção de Thread](<#/doc/guides/troubleshoot/location-fatal-error-log>).

Estado da VM

A próxima informação é o estado da VM, que indica o estado geral da máquina virtual. [Tabela A-7](<#/doc/guides/troubleshoot/location-fatal-error-log>) descreve os estados gerais.

Tabela A-7 Estados Gerais da VM

Estado Geral da VM | Descrição
---|---
`not at a safepoint` | Execução normal.
`at safepoint` | Todas as threads estão bloqueadas na VM aguardando a conclusão de uma operação especial da VM.
`synchronizing` | Uma operação especial da VM é necessária, e a VM está aguardando que todas as threads na VM se bloqueiem.

A saída do estado da VM é uma única linha no log de erro, como segue:
```
    VM state:not at safepoint (normal execution)
    
```

Mutexes e Monitores

A próxima informação no log de erro é uma lista de mutexes e monitores que estão atualmente em posse de uma thread, conforme mostrado no exemplo a seguir. Esses mutexes são bloqueios internos da VM, e não monitores associados a objetos Java. O exemplo a seguir mostra como a saída pode parecer quando ocorre uma falha enquanto bloqueios da VM estão sendo mantidos. Para cada bloqueio, o log contém o nome do bloqueio, seu proprietário e os endereços de uma estrutura interna de mutex da VM e seu bloqueio do SO. Em geral, esta informação é útil apenas para aqueles que estão muito familiarizados com a HotSpot VM. A thread proprietária pode ser referenciada cruzadamente com a lista de threads.
```
    VM Mutex/Monitor currently owned by a thread:  
    ([mutex/lock_event])[0x007357b0/0x0000031c] Threads_lock - owner thread: 0x00996318
    [0x00735978/0x000002e0] Heap_lock - owner thread: 0x00736218
    
```

Resumo do Heap

A próxima informação é um resumo do heap, conforme mostrado no exemplo a seguir. A saída depende da configuração do garbage collection (GC). Neste exemplo, o coletor serial é usado, o compartilhamento de dados de classe está desabilitado e a geração tenured está vazia. Isso provavelmente indica que o erro fatal ocorreu cedo ou durante a inicialização, e um GC ainda não promoveu nenhum objeto para a geração tenured.
```
    Heap
    def new generation   total 576K, used 161K [0x46570000, 0x46610000, 0x46a50000)  
      eden space 512K,  31% used [0x46570000, 0x46598768, 0x465f0000)
      from space 64K,   0% used [0x465f0000, 0x465f0000, 0x46600000)
      to   space 64K,   0% used [0x46600000, 0x46600000, 0x46610000)
     tenured generation   total 1408K, used 0K [0x46a50000, 0x46bb0000, 0x4a570000)
       the space 1408K,   0% used [0x46a50000, 0x46a50000, 0x46a50200, 0x46bb0000)
     compacting perm gen  total 8192K, used 1319K [0x4a570000, 0x4ad70000, 0x4e570000)
       the space 8192K,  16% used [0x4a570000, 0x4a6b9d48, 0x4a6b9e00, 0x4ad70000)
    No shared spaces configured.
    
```

Mapa de Memória

A próxima informação no log é uma lista de regiões de memória virtual no momento da falha. Esta lista pode ser longa se a aplicação for grande. O mapa de memória pode ser muito útil ao depurar algumas falhas, pois pode informar quais bibliotecas estão realmente sendo usadas, sua localização na memória, bem como a localização do heap, stack e guard pages.

O formato do mapa de memória é específico do sistema operacional. No sistema Linux, o mapa de memória do processo (`/proc/pid/maps`) é impresso. No sistema Windows, os endereços base e final de cada biblioteca são impressos. O exemplo a seguir mostra a saída gerada no Linux/x86.

Nota:

A maioria das linhas foi omitida do exemplo para fins de brevidade.
```
    Dynamic libraries:
    00400000-00401000 r-xp 00000000 00:47 1374716350                         /export/java_re/jdk/9/ea/167/binaries/linux-x64/bin/java
    00601000-00602000 rw-p 00001000 00:47 1374716350                         /export/java_re/jdk/9/ea/167/binaries/linux-x64/bin/java
    016c6000-016e7000 rw-p 00000000 00:00 0                                  [heap]
    82000000-102000000 rw-p 00000000 00:00 0 
    102000000-800000000 ---p 00000000 00:00 0 
    40014000-40015000 r--p 00000000 00:00 0
    Lines omitted.
    7f0f159f8000-7f0f159f9000 r-xp 00000000 08:11 116808980                  /export/users/dh198349/tests/hs-err/libMyApp.so
    7f0f159f9000-7f0f15bf8000 ---p 00001000 08:11 116808980                  /export/users/dh198349/tests/hs-err/libMyApp.so
    7f0f15bf8000-7f0f15bf9000 r--p 00000000 08:11 116808980                  /export/users/dh198349/tests/hs-err/libMyApp.so
    7f0f15bf9000-7f0f15bfa000 rw-p 00001000 08:11 116808980                  /export/users/dh198349/tests/hs-err/libMyApp.so
    Lines omitted.
    7f0f15dfc000-7f0f15e00000 ---p 00000000 00:00 0 
    7f0f15e00000-7f0f15efd000 rw-p 00000000 00:00 0 
    7f0f15efd000-7f0f15f13000 r-xp 00000000 00:47 1374714565                 /export/java_re/jdk/9/ea/167/binaries/linux-x64/lib/libnet.so
    7f0f15f13000-7f0f16113000 ---p 00016000 00:47 1374714565                 /export/java_re/jdk/9/ea/167/binaries/linux-x64/lib/libnet.so
    7f0f16113000-7f0f16114000 rw-p 00016000 00:47 1374714565                 /export/java_re/jdk/9/ea/167/binaries/linux-x64/lib/libnet.so
    7f0f16114000-7f0f16124000 r-xp 00000000 00:47 1374714619                 /export/java_re/jdk/9/ea/167/binaries/linux-x64/lib/libnio.so
    Lines omitted.
    7f0f17032000-7f0f17036000 ---p 00000000 00:00 0 
    7f0f17036000-7f0f17133000 rw-p 00000000 00:00 0 
    7f0f17133000-7f0f173fc000 r--p 00000000 08:02 2102853                    /usr/lib/locale/locale-archive
    7f0f173fc000-7f0f17400000 ---p 00000000 00:00 0 
    Lines omitted.
```

O seguinte é um formato de mapa de memória no log de erro.
```
    40049000-4035c000 r-xp 00000000 03:05 824473 /jdk1.5/jre/lib/i386/client/libjvm.so             |
    
```

Tabela A-8 Descrição do Formato do Mapa de Memória

Componente do Mapa de Memória | Descrição
---|---
`40049000-4035c000` | Região de memória
`r-xp` | Permissão:
  * leitura
  * escrita
  * execução
  * privada
  * compartilhada
`00000000` | Offset do arquivo
`03:05` | ID principal e ID secundário do dispositivo onde o arquivo está localizado (ou seja, `/dev/hda5`)
`824473` | Um número de inode
`/jdk1.5/jre/lib/i386/client/libjvm.so` | Nome do arquivo

O exemplo mostra a saída do mapa de memória e cada biblioteca tem duas regiões de memória virtual: uma para código e outra para dados. A permissão para o segmento de código é marcada com `r-xp` (legível, executável, privado), e a permissão para o segmento de dados é `rw-p` (legível, gravável, privado).

O heap Java já está incluído no resumo do heap anteriormente na saída, mas pode ser útil verificar se as regiões de memória reais reservadas para o heap correspondem aos valores no resumo do heap e se os atributos estão definidos como `rwxp`.

As pilhas de thread geralmente aparecem no mapa de memória como duas regiões consecutivas, uma com permissão `---p` (guard page) e outra com permissão `rwxp` (espaço real da pilha). Além disso, é útil saber o tamanho da guard page ou o tamanho da pilha. Por exemplo, neste mapa de memória, a pilha está localizada de 4127b000 a 412fb000.

Em um sistema Windows, a saída do mapa de memória é o endereço de carregamento e final de cada módulo carregado, conforme mostrado no exemplo a seguir.
```
    Dynamic libraries:
    0x00400000 - 0x0040c000     c:\jdk6\bin\java.exe
    0x77f50000 - 0x77ff7000     C:\WINDOWS\System32\ntdll.dll
    0x77e60000 - 0x77f46000     C:\WINDOWS\system32\kernel32.dll
    0x77dd0000 - 0x77e5d000     C:\WINDOWS\system32\ADVAPI32.dll
    0x78000000 - 0x78087000     C:\WINDOWS\system32\RPCRT4.dll
    0x77c10000 - 0x77c63000     C:\WINDOWS\system32\MSVCRT.dll
    0x08000000 - 0x08183000     c:\jdk6\jre\bin\client\jvm.dll
    0x77d40000 - 0x77dcc000     C:\WINDOWS\system32\USER32.dll
    0x7e090000 - 0x7e0d1000     C:\WINDOWS\system32\GDI32.dll
    0x76b40000 - 0x76b6c000     C:\WINDOWS\System32\WINMM.dll
    0x6d2f0000 - 0x6d2f8000     c:\jdk6\jre\bin\hpi.dll
    0x76bf0000 - 0x76bfb000     C:\WINDOWS\System32\PSAPI.DLL
    0x6d680000 - 0x6d68c000     c:\jdk6\jre\bin\verify.dll
    0x6d370000 - 0x6d38d000     c:\jdk6\jre\bin\java.dll
    0x6d6a0000 - 0x6d6af000     c:\jdk6\jre\bin\zip.dll
    0x10000000 - 0x10032000     C:\bugs\crash2\App.dll
    
```

Argumentos da VM e Variáveis de Ambiente

A próxima informação no log de erro é uma lista de argumentos da VM, seguida por uma lista de variáveis de ambiente, conforme mostrado no exemplo a seguir.
```
    VM Arguments:
    jvm_args:  
    java_command: MyApp
    java_class_path (initial): .
    Launcher Type: SUN_STANDARD
    
    Logging:
    Log output configuration:
    #0: stdout all=warning uptime,level,tags
    #1: stderr all=off uptime,level,tags
    
    Environment Variables:
    PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
    SHELL=/bin/bash
    DISPLAY=localhost:10.0
    ARCH=i386
    
```

Nota:

A lista de variáveis de ambiente não é a lista completa, mas sim um subconjunto das variáveis de ambiente que são aplicáveis à Java VM.

Manipuladores de Sinal

No sistema operacional Linux, a próxima informação no log de erro é a lista de manipuladores de sinal, conforme mostrado no exemplo a seguir.
```
    Signal Handlers:
    SIGSEGV: [libjvm.so+0xd48840], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO
    SIGBUS: [libjvm.so+0xd48840], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO
    SIGFPE: [libjvm.so+0xd48840], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO
    SIGPIPE: [libjvm.so+0xb60080], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO
    SIGXFSZ: [libjvm.so+0xb60080], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO
    SIGILL: [libjvm.so+0xd48840], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO
    SIGUSR2: [libjvm.so+0xb5ff40], sa_mask[0]=00000000000000000000000000000000, sa_flags=SA_RESTART|SA_SIGINFO
    SIGHUP: [libjvm.so+0xb60150], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO
    SIGINT: [libjvm.so+0xb60150], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO
    SIGTERM: [libjvm.so+0xb60150], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO
    SIGQUIT: [libjvm.so+0xb60150], sa_mask[0]=11111111011111111101111111111110, sa_flags=SA_RESTART|SA_SIGINFO
    
```

### Formato da Seção de Sistema

A seção final no log de erro é a informação do sistema. A saída é específica do sistema operacional, mas em geral inclui a versão do sistema operacional, informações da CPU e informações resumidas sobre a configuração da memória.

O exemplo a seguir mostra a saída em um sistema operacional Linux.
```
    ---------------  S Y S T E M  ---------------
    
    OS:DISTRIB_ID=Ubuntu
    DISTRIB_RELEASE=12.04
    DISTRIB_CODENAME=precise
    DISTRIB_DESCRIPTION="Ubuntu 12.04 LTS"
    uname:Linux 3.2.0-24-generic #39-Ubuntu SMP Mon May 21 16:52:17 UTC 2012 x86_64
    libc:glibc 2.15 NPTL 2.15 
    rlimit: STACK 8192k, CORE infinity, NPROC 1160369, NOFILE 4096, AS infinity
    load average:0.46 0.33 0.27
    
    /proc/meminfo:
    MemTotal:       148545440 kB
    MemFree:         1020964 kB
    Buffers:        29600728 kB
    Cached:         86607768 kB
    SwapCached:        16112 kB
    Active:         52272944 kB
    Inactive:       64862992 kB
    Active(anon):     314080 kB
    Inactive(anon):   616296 kB
    Active(file):   51958864 kB
    Inactive(file): 64246696 kB
    Unevictable:          16 kB
    Mlocked:              16 kB
    SwapTotal:       1051644 kB
    SwapFree:         976092 kB
    Dirty:                40 kB
    Writeback:             0 kB
    AnonPages:        912404 kB
    Mapped:            95804 kB
    Shmem:              2936 kB
    Slab:           28625980 kB
    SReclaimable:   28337400 kB
    SUnreclaim:       288580 kB
    KernelStack:        6040 kB
    PageTables:        42524 kB
    NFS_Unstable:          0 kB
    Bounce:                0 kB
    WritebackTmp:          0 kB
    CommitLimit:    75324364 kB
    Committed_AS:    6172612 kB
    VmallocTotal:   34359738367 kB
    VmallocUsed:      681668 kB
    VmallocChunk:   34282379392 kB
    HardwareCorrupted:     0 kB
    AnonHugePages:         0 kB
    HugePages_Total:       0
    HugePages_Free:        0
    HugePages_Rsvd:        0
    HugePages_Surp:        0
    Hugepagesize:       2048 kB
    DirectMap4k:      171520 kB
    DirectMap2M:     8208384 kB
```
    DirectMap1G:    142606336 kB
    
    CPU:total 24 (initial active 24) (6 cores per cpu, 2 threads per core) family 6 model 44 stepping 2, cmov, cx8, fxsr, mmx, sse, sse2, sse3, ssse3, sse4.1, sse4.2, popcnt, aes, clmul, ht, tsc, tscinvbit, tscinv
    CPU Model and flags from /proc/cpuinfo:
    model name	: Intel(R) Xeon(R) CPU           X5675  @ 3.07GHz
    flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx pdpe1gb rdtscp lm constant_tsc arch_perfmon pebs bts rep_good nopl xtopology nonstop_tsc aperfmperf pni pclmulqdq dtes64 monitor ds_cpl vmx smx est tm2 ssse3 cx16 xtpr pdcm pcid dca sse4_1 sse4_2 popcnt aes lahf_lm ida arat epb dts tpr_shadow vnmi flexpriority ept vpid
    
    Memory: 4k page, physical 148545440k(1020964k free), swap 1051644k(976092k free)
    
    vm_info: Java HotSpot(TM) 64-Bit Server VM (9-ea+167) for linux-amd64 JRE (9-ea+167), built on Apr 27 2017 00:28:45 by "javare" with gcc 4.9.2
    
```

No Linux, o sistema operacional, as informações estão no arquivo `/etc/*release`. Este arquivo descreve o tipo de sistema no qual a aplicação está sendo executada e, em alguns casos, a string de informação pode incluir o nível de patch. Algumas atualizações do sistema não são refletidas no arquivo `/etc/*release`. Isso é especialmente verdadeiro no sistema Linux, onde o usuário pode reconstruir qualquer parte do sistema.

No sistema Linux, a chamada de sistema `uname` é usada para obter o nome do kernel. A versão da `libc` e o tipo de biblioteca de threads também são impressos, conforme mostrado no exemplo a seguir.
```
    uname:Linux 3.2.0-24-generic #39-Ubuntu SMP Mon May 21 16:52:17 UTC 2012 x86_64
    libc:glibc 2.15           NPTL 2.15 
    
```

No Linux, existem três tipos possíveis de threads, a saber: `linuxthreads (fixed stack)`, `linuxthreads (floating stack)` e `NPTL`. Eles são normalmente instalados em `/lib`, `/lib/i686` e `/lib/tls`.

É útil saber o tipo de thread. Por exemplo, se a falha parecer estar relacionada a `pthread`, você pode conseguir contornar o problema selecionando uma biblioteca `pthread` diferente. Uma biblioteca `pthread` diferente (e `libc`) pode ser selecionada definindo `LD_LIBRARY_PATH` ou `LD_ASSUME_KERNEL`.

A versão da `glibc` geralmente não inclui o nível de patch. O comando `rpm -q glibc` pode fornecer informações de versão mais detalhadas.

No sistema operacional Linux, a próxima informação é a informação de `rlimit`.

Nota:

O tamanho padrão da pilha da VM é geralmente menor que o limite do sistema, conforme mostrado nos exemplos a seguir:
```
    rlimit: STACK 8192k, CORE infinity, NPROC 1160369, NOFILE 4096, AS infinity
    load average:0.04 0.05 0.02
    
```

Tabela A-9 Descrição do rlimit

Componente rlimit | Descrição
---|---
`STACK 8192k` | Tamanho da pilha (`ulimit -s`)
`CORE infinity` | Tamanho do core dump (`ulimit -c`)
`NPROC 1160369` | Máximo de processos de usuário (`ulimit -u`)
`NOFILE 4096` | Máximo de arquivos abertos (`ulimit -n`)
`AS infinity` | Memória virtual (`-v`)
```
    rlimit: STACK 8192k, CORE 0k, NPROC 4092, NOFILE 1024, AS infinity
    load average:0.04 0.05 0.02
    
```

Tabela A-10 Descrição do rlimit

Componente rlimit | Descrição
---|---
`STACK 8192k` | Tamanho da pilha (`ulimit -s`)
`CORE 0k` | Tamanho do core dump (`ulimit -c`)
`NPROC 4092` | Máximo de processos de usuário (`ulimit -u`)
`NOFILE 1024` | Máximo de arquivos abertos (`ulimit -n`)
`AS infinity` | Memória virtual (`-v`)

A próxima informação especifica a arquitetura e as capacidades da CPU identificadas pela VM na inicialização, conforme mostrado no exemplo a seguir.
```
    CPU:total 24 (initial active 24) (6 cores per cpu, 2 threads per core) family 6 model 44 stepping 2, cmov, cx8, fxsr, mmx,sse, sse2, sse3, ssse3, sse4.1, sse4.2, popcnt, aes, clmul, ht, tsc, tscinvbit, tscinv
    
```

Tabela A-11 Descrição da Arquitetura da CPU

Atributo da Arquitetura da CPU | Descrição
---|---
`CPU:total 24 (initial active 24) (6 cores per cpu, 2 threads per core)` | Número total de CPUs
`family 6 model 44 stepping 2` | família do processador (somente IA32):

  * `3` \- i386
  * `4` \- i486
  * `5` \- Pentium
  * `6` \- PentiumPro, PII, PIII
  * `15` \- Pentium 4

`cmov, cx8, fxsr, mmx...` | Recursos da CPU

Tabela A-12 mostra os possíveis recursos da CPU em um sistema SPARC.

Tabela A-12 Recursos SPARC

Recurso SPARC | Descrição
---|---
`has_v8` | Suporta instruções v8.
`has_v9` | Suporta instruções v9.
`has_vis1` | Suporta instruções de visualização.
`has_vis2` | Suporta instruções de visualização.
`is_ultra3` | UltraSparc III.
`no-muldiv` | Sem multiplicação e divisão inteira por hardware.
`no-fsmuld` | Sem instruções de multiplicação-adição e multiplicação-subtração.

Tabela A-13 mostra os possíveis recursos da CPU em um sistema Intel/IA32.

Tabela A-13 Recursos Intel/IA32

Recurso Intel/IA32 | Descrição
---|---
`cmov` | Suporta instrução cmov.
`cx8` | Suporta instrução cmpxchg8b.
`fxsr` | Suporta fxsave e fxrstor.
`mmx` | Suporta MMX.
`sse` | Suporta extensões SSE.
`sse2` | Suporta extensões SSE2.
`ht` | Suporta Tecnologia Hyper-Threading.

Tabela A-14 mostra os possíveis recursos da CPU em um sistema AMD64/EM64T.

Tabela A-14 Recursos AMD64/EM64T

Recurso AMD64/EM64T | Descrição
---|---
`amd64` | AMD Opteron, Athlon64 e assim por diante.
`em64t` | Processador Intel EM64T.
`3dnow` | Suporta extensão 3DNow.
`ht` | Suporta Tecnologia Hyper-Threading.

A próxima informação no log de erro é a informação de memória, conforme mostrado no exemplo a seguir.
```
    Memory: 4k page, physical 513604k(11228k free), swap 530104k(497504k free)