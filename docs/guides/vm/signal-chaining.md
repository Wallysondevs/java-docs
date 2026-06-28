# Encadeamento de Sinais

## 8 Encadeamento de Sinais

O encadeamento de sinais permite que você escreva aplicações que precisam instalar seus próprios manipuladores de sinal. Esta funcionalidade está disponível no Linux e macOS.

A funcionalidade de encadeamento de sinais possui as seguintes características:

  * Suporte para manipuladores de sinal pré-instalados ao criar a HotSpot Virtual Machine da Oracle.

Quando a HotSpot VM é criada, os manipuladores de sinal para os sinais utilizados pela HotSpot VM são salvos. Durante a execução, quando qualquer um desses sinais é levantado e não deve ser direcionado à HotSpot VM, os manipuladores pré-instalados são invocados. Em outras palavras, os manipuladores de sinal pré-instalados são encadeados atrás dos manipuladores da HotSpot VM para esses sinais.

  * Suporte para os manipuladores de sinal que são instalados após a criação da HotSpot VM, seja dentro do código da Java Native Interface ou de outra thread nativa.

Sua aplicação pode vincular e carregar a biblioteca compartilhada `libjsig.so` antes da biblioteca `libc/libthread/libpthread`. Esta biblioteca garante que chamadas como `signal()`, `sigset()` e `sigaction()` sejam interceptadas e não substituam os manipuladores de sinal que são usados pela HotSpot VM, caso os manipuladores entrem em conflito com os manipuladores de sinal já instalados pela HotSpot VM. Em vez disso, essas chamadas salvam os novos manipuladores de sinal. Os novos manipuladores de sinal são encadeados atrás dos manipuladores de sinal da HotSpot VM para os sinais. Durante a execução, quando qualquer um desses sinais é levantado e não é direcionado à HotSpot VM, os manipuladores pré-instalados são invocados.

Nota:

A partir do Java 16, o uso das funções `signal` e `sigset` está obsoleto, e o suporte para essas funções será removido em uma versão futura. Use a função `sigaction` em vez disso.

Se o suporte para a instalação de manipuladores de sinal após a criação da VM não for necessário, então a biblioteca compartilhada `libjsig.so` não é precisa.

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

As chamadas `signal()`, `sigset()` e `sigaction()` interpostas retornam os manipuladores de sinal salvos, e não os manipuladores de sinal instalados pela HotSpot VM e são vistos pelo sistema operacional.

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