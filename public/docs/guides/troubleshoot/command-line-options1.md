# Opções de Linha de Comando

## Opções de Linha de Comando D

Este apêndice descreve algumas opções de linha de comando que podem ser úteis ao diagnosticar problemas com a Java HotSpot VM.

Este apêndice contém as seguintes seções:

  * [Opções de Linha de Comando da Java HotSpot VM](<#/doc/guides/troubleshoot/command-line-options1>)

  * [Outras Opções de Linha de Comando](<#/doc/guides/troubleshoot/command-line-options1>)




### Opções de Linha de Comando da Java HotSpot VM

Opções de linha de comando que são prefixadas com `-XX` são específicas da Java HotSpot Virtual Machine. Muitas dessas opções são importantes para ajuste de desempenho e propósitos de diagnóstico, e são, portanto, descritas neste apêndice.

Para saber mais sobre todas as opções `-XX` possíveis, consulte as [Opções da Java HotSpot VM](<http://www.oracle.com/technetwork/java/javase/tech/vmoptions-jsp-140102.html>).

Você pode definir, desdefinir ou alterar dinamicamente o valor de certas flags da Java VM para um processo Java especificado usando o comando `jinfo -flag`. Consulte [O Utilitário jinfo](<#/doc/guides/troubleshoot/diagnostic-tools>) e o utilitário [JConsole](<#/doc/guides/troubleshoot/diagnostic-tools>).

Para uma lista completa dessas flags, use a aba MBeans do utilitário JConsole. Consulte a lista de valores para o atributo `DiagnosticOptions` do MBean `HotSpotDiagnostic`, que está no domínio `com.sun.management`. As seguintes são as flags:

  * `HeapDumpOnOutOfMemoryError`

  * `HeapDumpPath`

  * `PrintGC`

  * `PrintGCDetails`

  * `PrintGCTimeStamps`

  * `PrintClassHistogram`

  * `PrintConcurrentLocks`




A Opção -XX:HeapDumpOnOutOfMemoryError

Esta opção instrui a Java HotSpot VM a gerar um heap dump quando uma alocação do heap Java ou da geração permanente não pode ser satisfeita. Não há sobrecarga ao executar com esta opção, então ela pode ser útil para sistemas de produção onde o `java.lang.OutOfMemoryError` demora a aparecer.

Você também pode especificar esta opção em tempo de execução com a aba MBeans no utilitário [JConsole](<#/doc/guides/troubleshoot/diagnostic-tools>).

O exemplo a seguir mostra o resultado de ficar sem memória com esta flag definida.
```
    $ java -XX:+HeapDumpOnOutOfMemoryError -mn256m -mx512m ConsumeHeap
    java.lang.OutOfMemoryError: Java heap space
    Dumping heap to java_pid2262.hprof ...
    Heap dump file created [531535128 bytes in 14.691 secs]
    Exception in thread "main" java.lang.OutOfMemoryError: Java heap space
            at ConsumeHeap$BigObject.(ConsumeHeap.java:22)
            at ConsumeHeap.main(ConsumeHeap.java:32)
    
```

O `ConsumeHeap` preenche o heap Java e fica sem memória. Quando um `java.lang.OutOfMemoryError` é lançado, um arquivo de heap dump é criado. Neste caso, o arquivo tem 507 MB e é criado com o nome `java_pid2262.hprof` no diretório atual.

Por padrão, o heap dump é criado em um arquivo chamado `java_pidpid.hprof` no diretório de trabalho da VM, como no exemplo acima. Você pode especificar um nome de arquivo ou diretório alternativo com a opção `-XX:HeapDumpPath=`. Por exemplo, `-XX:HeapDumpPath=/disk2/dumps` fará com que o heap dump seja gerado no diretório `/disk2/dumps`.

A Opção -XX:OnError

Quando ocorre um erro fatal, a Java HotSpot VM pode opcionalmente executar um script ou comando fornecido pelo usuário. O script ou comando é especificado usando a opção de linha de comando `-XX:OnError=string`, onde `string` é um único comando, ou uma lista de comandos separados por ponto e vírgula. Dentro desta string, todas as ocorrências de `%p` são substituídas pelo PID atual, e todas as ocorrências de `%%` são substituídas por um único `%`. Os exemplos a seguir demonstram como esta opção pode ser usada ao iniciar uma aplicação Java chamada MyApp com o launcher `java`.

  * `java -XX:OnError="cat hs_err_pid%p.log | mail support@example.com" MyApp`

No exemplo acima, o conteúdo do arquivo de log de erro fatal é enviado por e-mail para um alias de suporte quando ocorre um erro fatal.

  * `java -XX:OnError="gdb - %p" MyApp`

No Linux, o comando `gdb` inicia o depurador. No exemplo acima, o depurador `gdb` é iniciado e anexado ao processo atual quando um erro inesperado é encontrado.

  * `java -XX:OnError="userdump.exe %p" MyApp`

No Windows, o utilitário `userdump.exe` cria um crash dump do processo especificado. O utilitário não é fornecido com o Windows e deve ser baixado do site da Microsoft como parte do pacote Microsoft OEM Support Tools.

No exemplo, o utilitário `userdump.exe` é executado para criar um core dump do processo atual em caso de erro fatal.

Nota:

O exemplo assume que o caminho para o utilitário `userdump.exe` está definido na variável `PATH`.

Para saber mais sobre como criar crash dumps no Windows, consulte [Coletar Crash Dumps no Windows](<#/doc/guides/troubleshoot/submit-bug-report>).

A Opção -XX:ShowMessageBoxOnError

Quando esta opção é definida e ocorre um erro fatal, a HotSpot VM exibirá informações sobre o erro fatal e solicitará ao usuário que especifique se o depurador nativo deve ser iniciado. No caso do sistema operacional Linux, a saída e o prompt são enviados para o console da aplicação (entrada padrão e saída padrão). No caso do Windows, uma caixa de mensagem do Windows é exibida.

O exemplo a seguir mostra um erro fatal em um sistema Linux.
```
    ==============================================================================
    Unexpected Error
    ------------------------------------------------------------------------------
    SIGSEGV (0xb) at pc=0x2000000001164db1, pid=10791, tid=1026
    
    Do you want to debug the problem?
    
    To debug, run 'gdb /proc/10791/exe 10791'; then switch to thread 1026
    Enter 'yes' to launch gdb automatically (PATH must include gdb)
    Otherwise, press RETURN to abort...
    ==============================================================================
    
```

Neste caso, ocorreu um erro `SIGSEGV`, e o usuário é solicitado a especificar se o depurador `gdb` deve ser iniciado para anexar ao processo. Se o usuário digitar `y` ou `yes`, então `gdb` será iniciado (assumindo que esteja definido na variável `PATH`).

No Windows, uma caixa de mensagem é exibida. Se o usuário clicar em Sim, a VM tentará iniciar o depurador padrão. Este depurador é configurado por uma configuração de registro que é descrita em [Coletar Crash Dumps no Windows](<#/doc/guides/troubleshoot/submit-bug-report>). Se o Microsoft Visual Studio estiver instalado, o depurador padrão é tipicamente configurado para ser `msdev.exe`.

No exemplo acima, a saída inclui o PID (`pid=10791`) e também o ID da thread (`tid=1026`). Se o depurador for iniciado, um dos passos iniciais no depurador pode ser selecionar a thread e obter seu stack trace.

Quando o processo está aguardando uma resposta, é possível usar outras ferramentas para obter um crash dump ou consultar o estado do processo.

No Windows, um crash dump do Dr. Watson pode ser obtido usando os programas `userdump` ou `windbg`. O utilitário `windbg` está incluído nas Ferramentas de Depuração da Microsoft para Windows e é descrito em [Coletar Crash Dumps no Windows](<#/doc/guides/troubleshoot/submit-bug-report>). No `windbg`, selecione a opção de menu Attach to a Process, que exibe a lista de processos e solicita o PID. A HotSpot VM exibe uma caixa de mensagem, que inclui o PID. Depois de selecionar o PID, o comando `.dump /f` pode ser usado para forçar um crash dump. [Figura D-1](<#/doc/guides/troubleshoot/command-line-options1>) é um exemplo de crash dump criado em um arquivo chamado `crash.dump`.

Figura D-1 Exemplo de um Crash Dump Criado por windbg

[Descrição de "Figura D-1 Exemplo de um Crash Dump Criado por windbg"](<#/>)

Em geral, a opção `-XX:+ShowMessageBoxOnError` é mais útil em um ambiente de desenvolvimento onde as ferramentas de depuração estão disponíveis. A opção `-XX:OnError` é mais adequada para ambientes de produção onde uma sequência fixa de comandos ou scripts é executada quando ocorre um erro fatal.

Outras Opções -XX

Várias outras opções de linha de comando `-XX` podem ser úteis ao solucionar problemas:

  * `-XX:OnOutOfMemoryError`=string`

Esta opção pode ser usada para especificar um comando ou script a ser executado quando um `java.lang.OutOfMemoryError` é lançado.

  * `-XX:ErrorFile`=filename`

Esta opção pode ser usada para especificar um local para o arquivo de log de erro fatal. Consulte [Local do Log de Erro Fatal](<#/doc/guides/troubleshoot/location-fatal-error-log>).

  * `-xx:HeapDumpPath`=path`

Esta opção pode ser usada para especificar um local para o heap dump. Consulte [A Opção -XX:HeapDumpOnOutOfMemoryError](<#/doc/guides/troubleshoot/command-line-options1>).

  * `-XX:MaxPermSize`=size`

Esta opção pode ser usada para especificar o tamanho da memória da geração permanente. Consulte [O Erro java.lang.OutOfMemoryError](<#/doc/guides/troubleshoot/troubleshooting-memory-leaks>).

  * `-XX:+PrintCommandLineFlags`

Esta opção pode ser usada para imprimir todas as flags de linha de comando da VM. Consulte [Coletar Dados para um Relatório de Bug](<#/doc/guides/troubleshoot/submit-bug-report>).

  * `-XX:+PrintConcurrentLocks`

Esta opção pode ser usada para fazer com que o handler Control+Break imprima uma lista de locks concorrentes possuídos por cada thread.

  * `-XX:+PrintClassHistogram`

Esta opção pode ser usada para fazer com que o handler Control+Break imprima um histograma de heap.

  * `-XX:+PrintGCDetails `e`-XX:+PrintGCTimeStamps`

Estas opções podem ser usadas para imprimir informações detalhadas sobre a garbage collection. Consulte [A Opção -verbose:gc](<#/doc/guides/troubleshoot/command-line-options1>).

  * `-XX:+UseConcMarkSweepGC `, `-XX:+UseSerialGC` e `-XX:+UseParallelGC`

Estas opções podem ser usadas para especificar a política de garbage collection a ser utilizada. Consulte [Contornando Falhas Durante a Garbage Collection](<#/doc/guides/troubleshoot/troubleshoot-system-crashes>).




### Outras Opções de Linha de Comando

Além das opções `-XX`, muitas outras opções de linha de comando podem fornecer informações para solução de problemas.

Esta seção descreve algumas dessas opções.

A Opção -Xcheck:jni

Esta opção é útil ao diagnosticar problemas com aplicações que usam a Java Native Interface (JNI). Às vezes, bugs no código nativo podem fazer com que a HotSpot VM falhe ou se comporte incorretamente.

A opção `-Xcheck:jni` é adicionada à linha de comando que inicia a aplicação, como no exemplo a seguir:
```
    java -Xcheck:jni MyApp
    
```

A opção `-Xcheck:jni` faz com que a VM realize validação adicional do uso de funções JNI. Isso inclui validação de argumentos e outras restrições de uso, conforme descrito abaixo.

Nota:

A opção não garante encontrar todos os argumentos inválidos ou diagnosticar bugs de lógica no código da aplicação, mas pode ajudar a diagnosticar um grande número de tais problemas.

Quando um erro de uso significativo é detectado, a VM imprime uma mensagem no console da aplicação ou na saída padrão, imprime o stack trace da thread ofensora e para a VM.

O exemplo a seguir mostra que um valor `null` foi passado incorretamente para uma função JNI que não permite um valor `null`.
```
    FATAL ERROR in native method: Null object passed to JNI
        at java.net.PlainSocketImpl.socketAccept(Native Method)
        at java.net.PlainSocketImpl.accept(PlainSocketImpl.java:343)
        - locked <0x450b9f70> (a java.net.PlainSocketImpl)
        at java.net.ServerSocket.implAccept(ServerSocket.java:439)
        at java.net.ServerSocket.accept(ServerSocket.java:410)
        at org.apache.tomcat.service.PoolTcpEndpoint.acceptSocket
                            (PoolTcpEndpoint.java:286)
        at org.apache.tomcat.service.TcpWorkerThread.runIt
                            (PoolTcpEndpoint.java:402)
        at org.apache.tomcat.util.ThreadPool$ControlRunnable.run
                            (ThreadPool.java:498)
        at java.lang.Thread.run(Thread.java:536)
    
```

O exemplo a seguir mostra um argumento incorreto que foi fornecido a uma função JNI que espera um argumento `jfieldID`.
```
    FATAL ERROR in native method: Instance field not found in JNI get/set 
                            field operations
            at java.net.PlainSocketImpl.socketBind(Native Method)
            at java.net.PlainSocketImpl.bind(PlainSocketImpl.java:359)
            - locked <0xf082f290> (a java.net.PlainSocketImpl)
            at java.net.ServerSocket.bind(ServerSocket.java:318)
            at java.net.ServerSocket.<init>(ServerSocket.java:185)
            at jvm003a.<init>(jvm003.java:190)
            at jvm003a.<init>(jvm003.java:151)
            at jvm003.run(jvm003.java:51)
            at jvm003.main(jvm003.java:30)
    
```

As seguintes verificações são consideradas indicativas de problemas significativos com o código nativo:

  * A thread que faz a chamada não está anexada à JVM
  * A thread que faz a chamada está usando o JNIEnv pertencente a outra thread
  * Uma verificação de validação de parâmetro falha:
    * Um jfieldID, ou jmethodID, é detectado como inválido. Por exemplo:
      * Do tipo errado
      * Associado à classe errada
    * Um parâmetro do tipo errado é detectado
    * Um valor de parâmetro inválido é detectado. Por exemplo:
      * NULL onde não permitido
      * Um índice de array fora dos limites, ou capacidade de frame
      * Uma string não-UTF-8
      * Uma referência JNI inválida
      * Uma tentativa de usar uma função ReleaseXXX em um parâmetro não produzido pela função GetXXX correspondente



As seguintes verificações resultam apenas na impressão de avisos:

  * Uma chamada JNI foi feita sem verificar uma exceção pendente de uma chamada JNI anterior, e a chamada atual não é segura quando uma exceção pode estar pendente
  * O número de referências locais JNI existentes quando uma função JNI termina excede o número garantido de disponibilidade. Consulte a função EnsureLocalcapacity
  * Um descritor de classe está em formato decorado (Lname;) quando não deveria estar
  * Um parâmetro NULL é permitido, mas seu uso é questionável
  * Chamando outras funções JNI no escopo de Get/ReleasePrimitiveArrayCritical ou Get/ReleaseStringCritical



Esta mensagem de aviso não fatal é mostrada no exemplo a seguir.
```
    Warning: Calling other JNI functions in the scope of 
    Get/ReleasePrimitiveArrayCritical or Get/ReleaseStringCritical
    
```

Uma região crítica JNI é criada quando o código nativo usa as funções JNI `GetPrimitiveArrayCritical` ou `GetStringCritical` para obter uma referência a um array ou string no heap Java. A referência é mantida até que o código nativo chame a função de liberação correspondente. O código entre o get e o release é chamado de seção crítica JNI, e durante esse tempo, a HotSpot VM não pode levar a VM a um estado que permita a ocorrência de garbage collection. A recomendação geral é não usar outras funções JNI dentro de uma seção crítica JNI, e em particular qualquer função JNI que possa potencialmente causar um deadlock. O aviso impresso acima pela opção `-Xcheck:jni` é, portanto, uma indicação de um problema potencial; nem sempre indica um bug na aplicação.

A Opção -verbose:class

Esta opção habilita o log de carregamento e descarregamento de classes.

A Opção -verbose:gc

Esta opção habilita o log de informações de garbage collection (GC). Ela pode ser combinada com outras opções específicas da HotSpot VM, como `-XX:+PrintGCDetails` e `-XX:+PrintGCTimeStamps`, para obter mais informações sobre GC. A saída de informações inclui o tamanho das gerações antes e depois de cada GC, o tamanho total do heap, o tamanho dos objetos promovidos e o tempo gasto.

A opção `-verbose:gc` pode ser habilitada dinamicamente em tempo de execução usando a API de gerenciamento ou JVM TI. Consulte [Ferramentas de Diagnóstico Personalizadas](<#/doc/guides/troubleshoot/diagnostic-tools>).

A ferramenta de monitoramento e gerenciamento JConsole também pode habilitar ou desabilitar a opção quando a ferramenta está anexada a uma VM de gerenciamento. Consulte [JConsole](<#/doc/guides/troubleshoot/diagnostic-tools>).

A Opção -verbose:jni

Esta opção habilita o log de JNI. Quando um método JNI ou nativo é resolvido, a HotSpot VM imprime uma mensagem de rastreamento no console da aplicação (saída padrão). Ela também imprime uma mensagem de rastreamento quando um método nativo é registrado usando a função JNI `RegisterNative`. A opção `-verbose:jni` pode ser útil ao diagnosticar problemas com aplicações que usam bibliotecas nativas.