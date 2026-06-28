# Relatório de Erros Fatais

## 11 Relatório de Erros Fatais

Erros fatais são erros como exaustão de memória nativa, erros de acesso à memória ou sinais explícitos direcionados ao processo. Erros fatais podem ser acionados por código nativo dentro da aplicação (por exemplo, código Java Native Interface (JNI) escrito pelo desenvolvedor), por bibliotecas nativas de terceiros que são usadas pela aplicação ou pela JVM, ou por código nativo na JVM. Se um erro fatal faz com que o processo que hospeda a JVM seja encerrado, a JVM coleta informações sobre o erro e escreve um relatório de falha.

A JVM tenta identificar a natureza e a localização do erro. Se possível, a JVM escreve informações detalhadas sobre o estado da JVM e do processo, no momento da falha. Os detalhes disponíveis podem depender da plataforma e da natureza da falha. As informações fornecidas por este mecanismo de relatório de erros permitem depurar sua aplicação de forma mais fácil e eficiente, e ajudam a identificar problemas em código de terceiros. Quando uma mensagem de erro indica um problema no código da JVM, você pode enviar um relatório de bug mais preciso e útil. Em alguns casos, a geração do relatório de falha causa erros secundários que impedem que todos os detalhes sejam relatados.

### Exemplo de Relatório de Erro

O exemplo a seguir mostra o início de um relatório de erro (arquivo `hs_err_pid18240.log`) para uma falha no código JNI nativo de uma aplicação:
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
    
    ---------------  S U M M A R Y ------------
    
    Command Line: MyApp
    
    Host: Intel(R) Xeon(R) CPU           X5675  @ 3.07GHz, 24 cores, 141G, Ubuntu 12.04 LTS
    Time: Fri Apr 28 02:57:13 2017 EDT elapsed time: 2 seconds (0d 0h 0m 2s)
    
    ---------------  T H R E A D  ---------------
    
    Current thread (0x00007f102c013000):  JavaThread "main" [_thread_in_native, id=18245, stack(0x00007f10345c0000,0x00007f10346c0000)]
    
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
    
    siginfo: si_signo: 11 (SIGSEGV), si_code: 1 (SEGV_MAPERR), si_addr: 0x0000000000000000
```