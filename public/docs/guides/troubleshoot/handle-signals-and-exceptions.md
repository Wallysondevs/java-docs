# Lidar com Sinais e Exceções

## 8 Lidar com Sinais e Exceções

Este capítulo fornece informações sobre como sinais e exceções são tratados pela Java HotSpot Virtual Machine. Ele também descreve o recurso de encadeamento de sinais (signal chaining), disponível nos sistemas operacionais Linux e macOS, que facilita a escrita de aplicações que devem instalar seus próprios manipuladores de sinais.

Este capítulo contém as seguintes seções:

  * [Lidar com Sinais no Linux e macOS](<#/doc/guides/troubleshoot/handle-signals-and-exceptions>)

  * [Lidar com Exceções no Windows](<#/doc/guides/troubleshoot/handle-signals-and-exceptions>)

  * [Encadeamento de Sinais (Signal Chaining)](<#/doc/guides/troubleshoot/handle-signals-and-exceptions>)

  * [Lidar com Exceções Usando a Java HotSpot VM](<#/doc/guides/troubleshoot/handle-signals-and-exceptions>)

  * [Manipuladores de Console](<#/doc/guides/troubleshoot/handle-signals-and-exceptions>)

  * [Sinais Usados no Linux e macOS](<#/doc/guides/troubleshoot/handle-signals-and-exceptions>)

### Lidar com Sinais no Linux e macOS

A Java HotSpot VM instala manipuladores de sinais para implementar vários recursos e para lidar com condições de erro fatais.

Por exemplo, em uma otimização para evitar verificações explícitas de nulo em casos onde `java.lang.NullPointerException` será raramente lançada, o sinal `SIGSEGV` é capturado e tratado, e a `NullPointerException` é lançada.

Em geral, existem duas categorias onde sinais/armadilhas (traps) ocorrem:

  * Quando os sinais são esperados e tratados, como o tratamento implícito de nulos. Outro exemplo é o mecanismo de polling de safepoint, que protege uma página na memória quando um safepoint é necessário. Qualquer thread que acessa essa página causa um `SIGSEGV`, o que resulta na execução de um stub que leva a thread a um safepoint.

  * Sinais inesperados. Isso inclui um `SIGSEGV` ao executar em código da VM, código Java Native Interface (JNI) ou código nativo. Nesses casos, o sinal é inesperado, então o tratamento de erro fatal é invocado para criar o log de erro e encerrar o processo.

[Tabela 8-2](<#/doc/guides/troubleshoot/handle-signals-and-exceptions>) lista os sinais que são atualmente usados nos sistemas operacionais Linux e macOS.

### Lidar com Exceções no Windows

No Windows, uma exceção é um evento que ocorre durante a execução de um programa.

Existem dois tipos de exceções: exceções de hardware e exceções de software. Exceções de hardware são comparáveis a sinais como `SIGSEGV` e `SIGKILL` no sistema operacional Linux. Exceções de software são iniciadas explicitamente por aplicações ou pelo sistema operacional usando a API `RaiseException()`.

No Windows, o mecanismo para lidar com exceções de hardware e software é chamado de tratamento de exceções estruturado (SEH). Este é um tratamento de exceções baseado em stack frame, semelhante ao mecanismo de tratamento de exceções de C++ e Java. Em C++, as palavras-chave `__try` e `__except` são usadas para proteger uma seção de código que pode resultar em uma exceção, como mostrado no exemplo a seguir.
```
    __try {
         // guarded body of code
     } __except (filter-expression) {
         // exception-handler block
     }
    
```

O bloco `__except` é filtrado por uma expressão de filtro que usa o código de exceção inteiro retornado pela API `GetExceptionCode()`, informações de exceção retornadas pela API `GetExceptionInformation()`, ou ambos.

A expressão de filtro deve ser avaliada para um dos seguintes valores:

  * `EXCEPTION_CONTINUE_EXECUTION = -1`

A expressão de filtro reparou a situação, e a execução continua de onde a exceção ocorreu. Ao contrário de alguns esquemas de exceção, o SEH também suporta o modelo de retomada. Isso é muito parecido com o tratamento de sinais UNIX no sentido de que, após o manipulador de sinais terminar, a execução continua de onde o programa foi interrompido. A diferença é que o manipulador, neste caso, é apenas a própria expressão de filtro e não o bloco `__except`. No entanto, a expressão de filtro também pode envolver uma chamada de função.

  * `EXCEPTION_CONTINUE_SEARCH = 0`

O manipulador atual não pode lidar com esta exceção. Continue a busca pelo próximo manipulador. Isso é semelhante ao bloco `catch` não correspondendo a um tipo de exceção em C++ e Java.

  * `EXCEPTION_EXECUTE_HANDLER = 1`

O manipulador atual corresponde e pode lidar com a exceção. O bloco `__except` é executado.

As palavras-chave `__try` e `__finally` são usadas para construir um manipulador de terminação, como mostrado no exemplo a seguir.
```
    __try { 
        // guarded body of code  
    } __finally { 
        // __finally block  
    }
    
```

Quando o controle sai do bloco `__try` (após uma exceção ou sem uma exceção), o bloco `__finally` é executado. Dentro do bloco `__finally`, a API `AbnormalTermination()` pode ser chamada para testar se o controle continuou após a exceção ou não.

Programas Windows também podem instalar uma função de filtro de exceção não tratada de nível superior para capturar exceções que não são tratadas no bloco `__try`/`__except`. Esta função é instalada em uma base de todo o processo usando a API `SetUnhandledExceptionFilter()`. Se não houver um manipulador para uma exceção, então `UnhandledExceptionFilter()` é chamado, e isso chamará a função de filtro de exceção não tratada de nível superior, se houver, para capturar essa exceção. Esta função também exibe uma caixa de mensagem para notificar o usuário sobre a exceção não tratada.

Exceções do Windows são comparáveis a sinais síncronos UNIX que são atribuíveis ao fluxo de execução atual. No Windows, eventos assíncronos como eventos de console (por exemplo, o usuário pressionando Control+C no console) são tratados pelo manipulador de controle de console registrado usando a API `SetConsoleCtlHandler()`.

Se uma aplicação usa a API `signal()` no Windows, então a C runtime library (CRT) mapeia tanto as exceções do Windows quanto os eventos de console para sinais apropriados ou erros de tempo de execução C. Por exemplo, a CRT mapeia Control+C para `SIGINT` e todos os outros eventos de console para `SIGBREAK`. Da mesma forma, se você registrar o manipulador `SIGSEGV`, a CRT traduz a exceção correspondente para um sinal. O código de inicialização da CRT implementa um bloco `__try`/`__except` em torno da função `main()`. A função de filtro de exceção da CRT (nomeada `_XcptFilter`) mapeia as exceções Win32 para sinais e despacha os sinais para seus manipuladores apropriados. Se o manipulador de um sinal for definido como `SIG_DFL` (tratamento padrão), então `_XcptFilter` chama `UnhandledExceptionFilter`.

O mecanismo de tratamento de exceções vetorizadas também pode ser usado. Manipuladores vetorizados não são manipuladores baseados em frame. Um programa pode registrar zero ou mais manipuladores de exceções vetorizadas usando a API `AddVectoredExceptionHandler`. Manipuladores vetorizados são invocados antes que os manipuladores de exceções estruturadas, se houver, sejam invocados, independentemente de onde a exceção ocorreu.

O manipulador de exceções vetorizadas retorna um dos seguintes valores:

  * `EXCEPTION_CONTINUE_EXECUTION`: Pula os próximos manipuladores vetorizados e SEH.

  * `EXCEPTION_CONTINUE_SEARCH`: Continua para o próximo manipulador vetorizado ou SEH.

### Encadeamento de Sinais (Signal Chaining)

O encadeamento de sinais (Signal chaining) permite que você escreva aplicações que precisam instalar seus próprios manipuladores de sinais. Este recurso está disponível no Linux e macOS.

O recurso de encadeamento de sinais possui as seguintes características:

  * Suporte para manipuladores de sinais pré-instalados ao criar a HotSpot Virtual Machine da Oracle.

Quando a HotSpot VM é criada, os manipuladores de sinais para os sinais usados pela HotSpot VM são salvos. Durante a execução, quando qualquer um desses sinais é levantado e não deve ser direcionado à HotSpot VM, os manipuladores pré-instalados são invocados. Em outras palavras, os manipuladores de sinais pré-instalados são encadeados atrás dos manipuladores da HotSpot VM para esses sinais.

  * Suporte para os manipuladores de sinais que são instalados após a criação da HotSpot VM, seja dentro do código Java Native Interface ou de outra thread nativa.

Sua aplicação pode vincular e carregar a biblioteca compartilhada `libjsig.so` antes da biblioteca `libc/libthread/libpthread`. Esta biblioteca garante que as chamadas para `sigaction()` sejam interceptadas e não substituam os manipuladores de sinais usados pela HotSpot VM, se os manipuladores entrarem em conflito com os manipuladores de sinais já instalados pela HotSpot VM. Em vez disso, essas chamadas salvam os novos manipuladores de sinais. Os novos manipuladores de sinais são encadeados atrás dos manipuladores de sinais da HotSpot VM para os sinais. Durante a execução, quando qualquer um desses sinais é levantado e não é direcionado à HotSpot VM, os manipuladores pré-instalados são invocados.

Se o suporte para a instalação de manipuladores de sinais após a criação da VM não for necessário, então a biblioteca compartilhada `libjsig.so` não é precisa.

Para habilitar o encadeamento de sinais, execute um dos seguintes procedimentos para usar a biblioteca compartilhada `libjsig.so`:

    * Vincule a biblioteca compartilhada `libjsig.so` com a aplicação que cria ou incorpora a HotSpot VM:
```
cc -L libjvm.so-directory -ljsig -ljvm java_application.c
          
```

    * Use a variável de ambiente `LD_PRELOAD`:

      * Korn shell (ksh):
```
export LD_PRELOAD=libjvm.so-directory/libjsig.so; java_application
```

      * C shell (csh):
```
setenv LD_PRELOAD libjvm.so-directory/libjsig.so; java_application
```

A chamada `sigaction()` interposta retorna os manipuladores de sinais salvos, não os manipuladores de sinais instalados pela HotSpot VM e vistos pelo sistema operacional.

Nota:

Os sinais `SIGQUIT`, `SIGTERM`, `SIGINT` e `SIGHUP` não podem ser encadeados. Se a aplicação precisar lidar com esses sinais, considere usar a opção `—Xrs`.

Habilitar Encadeamento de Sinais no macOS

Para habilitar o encadeamento de sinais no macOS, defina as seguintes variáveis de ambiente:

  * `DYLD_INSERT_LIBRARIES`: Pré-carrega as bibliotecas especificadas em vez da variável de ambiente `LD_PRELOAD` disponível no Linux.

  * `DYLD_FORCE_FLAT_NAMESPACE`: Habilita funções na biblioteca `libjsig` e substitui as implementações do SO, devido ao namespace de dois níveis do macOS (o nome totalmente qualificado de um símbolo inclui sua biblioteca). Para habilitar este recurso, defina esta variável de ambiente para qualquer valor.

O comando a seguir habilita o encadeamento de sinais pré-carregando a biblioteca `libjsig`:

`$ DYLD_FORCE_FLAT_NAMESPACE=0 DYLD_INSERT_LIBRARIES="JAVA_HOME/lib/libjsig.dylib" java MySpiffyJavaApp`

Nota:

O nome do arquivo da biblioteca no macOS é `libjsig.dylib` e não `libjsig.so` como no Linux.

### Lidar com Exceções Usando a Java HotSpot VM

A HotSpot VM instala um manipulador de exceções de nível superior durante a inicialização usando a `AddVectoredExceptionHandlerAPI` para sistemas de 64 bits.

Ela também instala o Win32 SEH usando um bloco `__try` /`__except` em C++ em torno da chamada da função de início da thread (interna) para cada thread criada.

Finalmente, ela instala um manipulador de exceções em torno das funções JNI.

Se uma aplicação precisar lidar com exceções estruturadas em código JNI, então ela pode usar declarações `__try` /`__except` em C++. No entanto, se ela precisar usar o manipulador de exceções vetorizadas em código JNI, então o manipulador deve retornar `EXCEPTION_CONTINUE_SEARCH` para continuar para o manipulador de exceções da VM.

Em geral, existem duas categorias nas quais as exceções ocorrem:

  * Quando as exceções são esperadas e tratadas. Exemplos incluem o tratamento implícito de nulos citado anteriormente, onde o acesso a um nulo causa uma `EXCEPTION_ACCESS_VIOLATION`, que é tratada.

  * Exceções inesperadas. Um exemplo é uma `EXCEPTION_ACCESS_VIOLATION` ao executar em código da VM, em código JNI ou em código nativo. Nesses casos, o sinal é inesperado, e o tratamento de erro fatal é invocado para criar o log de erro e encerrar o processo.

### Manipuladores de Console

Este tópico descreve uma lista de eventos de console que são registrados com a Java HotSpot VM.

A Java HotSpot VM registra eventos de console, como mostrado na [Tabela 8-1](<#/doc/guides/troubleshoot/handle-signals-and-exceptions>).

Tabela 8-1 Eventos de Console

Console Event | Signal | Usage
---|---|---
`CTRL_C_EVENT` | `SIGINT` | Este evento e sinal são usados para encerrar um processo. (Opcional)
`CTRL_CLOSE_EVENT`CTRL_LOGOFF_EVENT`CTRL_SHUTDOWN_EVENT` | `SIGTERM` | Este evento e sinal são usados pelo mecanismo de shutdown hook quando a VM é encerrada anormalmente. (Opcional)
`CTRL_BREAK_EVENT` | `SIGBREAK` | Este evento e sinal são usados para despejar stack traces Java no fluxo de erro padrão. (Opcional)

Se uma aplicação precisar registrar seu próprio manipulador de console, então a opção `-Xrs` pode ser usada. Com esta opção, os shutdown hooks não são executados em `SIGTERM` (com o mapeamento de eventos mostrado anteriormente), e o suporte a thread dump não está disponível em `SIGBREAK` (com o mapeamento acima do evento Control+Break).

### Sinais Usados no Linux e macOS

Este tópico descreve uma lista de sinais que são usados no Linux e macOS

Tabela 8-2 Sinais Usados no Linux e macOS

Signal | Description
---|---
`SIGSEGV`, `SIGBUS`, `SIGFPE`, `SIGPIPE`, `SIGILL` | Esses sinais são usados na implementação para verificação implícita de nulo, e assim por diante.
`SIGQUIT` | Este sinal é usado para despejar stack traces Java no fluxo de erro padrão. (Opcional)
`SIGTERM`, `SIGINT`, `SIGHUP` | Esses sinais são usados para suportar o mecanismo de shutdown hook (`java.lang.Runtime.addShutdownHook`) quando a VM é encerrada anormalmente. (Opcional)
`SIGUSR2` | Este sinal é usado internamente no Linux e macOS.
`SIGABRT` | A HotSpot VM não trata este sinal. Em vez disso, ela chama a função `abort` após o tratamento de erro fatal. Se uma aplicação usa este sinal, então ela deve encerrar o processo para preservar a semântica esperada.

Sinais marcados como "opcionais" não são usados quando a opção `-Xrs` é especificada para reduzir o uso de sinais. Com esta opção, menos sinais são usados, embora a VM instale seu próprio manipulador de sinais para sinais essenciais como `SIGSEGV`. A especificação desta opção significa que o mecanismo de shutdown hook não será executado se o processo receber um `SIGQUIT`, `SIGTERM`, `SIGINT` ou `SIGHUP`. Os shutdown hooks serão executados, como esperado, se a VM terminar normalmente (ou seja, quando a última thread não-daemon for concluída ou o método `System.exit` for invocado).

`SIGUSR2` é usado para implementar suspensão e retomada no Linux e macOS. No entanto, é possível especificar um sinal alternativo para ser usado em vez de `SIGUSR2`. Isso é feito especificando a variável de ambiente `_JAVA_SR_SIGNUM`. Se esta variável de ambiente for definida, então ela deve ser definida para um valor maior que o máximo de `SIGSEGV` e `SIGBUS`.