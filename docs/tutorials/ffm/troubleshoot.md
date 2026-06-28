# Solucionar Problemas em Chamadas para Funções de Biblioteca Nativas

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Foreign Function and Memory ](<#/doc/tutorials/ffm>) > Solucionar Problemas em Chamadas para Funções de Biblioteca Nativas

**Anterior na Série**

[Como Lidar com uma Chamada de Código Nativo de Volta para Código Java](<#/doc/tutorials/ffm/upcall>)

➜

**Tutorial Atual**

Solucionar Problemas em Chamadas para Funções de Biblioteca Nativas

➜

**Próximo na Série**

[Gerar Bindings Java com Jextract](<#/doc/tutorials/ffm/jextract>)

**Anterior na Série:** [Como Lidar com uma Chamada de Código Nativo de Volta para Código Java](<#/doc/tutorials/ffm/upcall>)

**Próximo na Série:** [Gerar Bindings Java com Jextract](<#/doc/tutorials/ffm/jextract>)

# Solucionar Problemas em Chamadas para Funções de Biblioteca Nativas

## Invocar Funções Estrangeiras que Retornam Ponteiros

Às vezes, funções estrangeiras alocam uma região de memória e, em seguida, retornam um ponteiro para essa região. Este é o caso da função da biblioteca padrão C `void *malloc(size_t)` que aloca a quantidade de memória solicitada, em bytes, e retorna um ponteiro para ela. Invocar uma função da biblioteca padrão C como `malloc` segue os mesmos passos dos tutoriais anteriores:

```java
import java.lang.foreign.*;
import java.lang.invoke.*;

// 1. Obter um linker para a plataforma atual
Linker linker = Linker.nativeLinker();

// 2. Obter um SymbolLookup para a biblioteca padrão C
SymbolLookup stdlib = linker.defaultLookup();

// 3. Obter um MethodHandle para a função malloc
MethodHandle malloc = linker.downcallHandle(
    stdlib.find("malloc").orElseThrow(),
    FunctionDescriptor.of(ValueLayout.ADDRESS, ValueLayout.JAVA_LONG)
);

// 4. Invocar malloc para alocar 100 bytes
MemorySegment segment = (MemorySegment) malloc.invoke(100L);
System.out.println("Segmento de memória alocado: " + segment);
```

Se você executar o trecho acima em uma [`jshell` session](<#/doc/tutorials/jshell-tool>), a saída conterá:

```
segment ==> MemorySegment{ base=0x0000000102803000, length=0 }
```

Quando você invoca uma função nativa como `malloc`, que retorna um ponteiro, o runtime Java não tem conhecimento sobre o tamanho ou o tempo de vida do segmento de memória para o qual o ponteiro aponta. Consequentemente, a API FFM usa um segmento de memória de comprimento zero para representar o ponteiro retornado por `malloc`. Os segmentos de memória de comprimento zero são comuns para representar o seguinte:

  * Ponteiros retornados de uma função estrangeira,
  * Ponteiros passados por uma função estrangeira para um upcall,
  * Ponteiros lidos de um segmento de memória.

Além disso, se você tentar acessar o conteúdo de um segmento de memória de comprimento zero, o runtime Java lançará uma [`IndexOutOfBoundsException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IndexOutOfBoundsException.html>). Isso ocorre porque a JVM não pode acessar ou validar com segurança qualquer operação de acesso a uma região de memória cujo tamanho é desconhecido. Embora não sejam diretamente acessíveis, o objetivo dos segmentos de memória de comprimento zero é passá-los para outras funções estrangeiras que aceitam ponteiros. Do ponto de vista da biblioteca padrão C, você pode usar `free`, uma função para desalocar memória:

```java
// 5. Obter um MethodHandle para a função free
MethodHandle free = linker.downcallHandle(
    stdlib.find("free").orElseThrow(),
    FunctionDescriptor.ofVoid(ValueLayout.ADDRESS)
);

// 6. Invocar free para desalocar o segmento
free.invoke(segment);
```

No entanto, no exemplo da JVM, os segmentos de memória de comprimento zero estão associados a um escopo novo que está sempre ativo. Então, se a JVM não pode gerenciar o tempo de vida de um segmento de memória de zero bytes, como você pode trabalhar com ele?

Você pode usar os métodos `MemorySegment.reinterpret` para acessar com segurança segmentos de memória de comprimento zero e anexá-los a uma arena existente. A arena gerencia automaticamente o tempo de vida da região de memória que suporta o segmento. Um trecho de código completo que aloca memória off-heap com `malloc` é mostrado abaixo:

```java
import java.lang.foreign.*;
import java.lang.invoke.*;

// 1. Obter um linker para a plataforma atual
Linker linker = Linker.nativeLinker();

// 2. Obter um SymbolLookup para a biblioteca padrão C
SymbolLookup stdlib = linker.defaultLookup();

// 3. Obter um MethodHandle para a função malloc
MethodHandle malloc = linker.downcallHandle(
    stdlib.find("malloc").orElseThrow(),
    FunctionDescriptor.of(ValueLayout.ADDRESS, ValueLayout.JAVA_LONG)
);

// 4. Obter um MethodHandle para a função free
MethodHandle free = linker.downcallHandle(
    stdlib.find("free").orElseThrow(),
    FunctionDescriptor.ofVoid(ValueLayout.ADDRESS)
);

// 5. Criar uma arena para gerenciar o tempo de vida do segmento
try (Arena arena = Arena.ofConfined()) {
    // 6. Invocar malloc para alocar 100 bytes
    MemorySegment segment = (MemorySegment) malloc.invoke(100L);

    // 7. Reinterpretar o segmento de comprimento zero para 100 bytes
    // e associá-lo à arena, com uma ação de desalocação
    MemorySegment nativeText = segment.reinterpret(100L, arena, s -> {
        try {
            free.invoke(s);
            System.out.println("Memória desalocada!");
        } catch (Throwable e) {
            throw new RuntimeException(e);
        }
    });
    System.out.println("Segmento de memória alocado: " + nativeText);
}
```

Neste exemplo, o método [`MemorySegment.reinterpret(long,Arena,Consumer)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/MemorySegment.html#reinterpret\(long,java.lang.foreign.Arena,java.util.function.Consumer\)>) requer três argumentos:

  * O número de bytes para redimensionar o segmento de memória.
  * A arena com a qual associar o segmento de memória.
  * A ação a ser executada quando a arena for fechada. Neste caso, a ação é desalocar a memória referenciada por um ponteiro retornado por `malloc`.

Para verificar melhor como o exemplo funciona, você pode aprimorá-lo para acessar a memória off-heap de `nativeText` e executá-lo em uma sessão `jshell`:

```java
import java.lang.foreign.*;
import java.lang.invoke.*;
import java.nio.charset.StandardCharsets;

Linker linker = Linker.nativeLinker();
SymbolLookup stdlib = linker.defaultLookup();

MethodHandle malloc = linker.downcallHandle(
    stdlib.find("malloc").orElseThrow(),
    FunctionDescriptor.of(ValueLayout.ADDRESS, ValueLayout.JAVA_LONG)
);

MethodHandle free = linker.downcallHandle(
    stdlib.find("free").orElseThrow(),
    FunctionDescriptor.ofVoid(ValueLayout.ADDRESS)
);

try (Arena arena = Arena.ofConfined()) {
    MemorySegment segment = (MemorySegment) malloc.invoke(100L);
    MemorySegment nativeText = segment.reinterpret(100L, arena, s -> {
        try {
            free.invoke(s);
            System.out.println("Memória desalocada!");
        } catch (Throwable e) {
            throw new RuntimeException(e);
        }
    });
    nativeText.setString(0, "Hello, FFM API!");
    System.out.println("Conteúdo do segmento: " + nativeText.getString(0));
}
```

A saída no `jshell` deve ser semelhante a:

```
Conteúdo do segmento: Hello, FFM API!
Memória desalocada!
```

## Verificar Erros Nativos com errno

Os exemplos de código desta série não lançam erros, mas algumas funções da biblioteca padrão C os indicam definindo o valor da macro de biblioteca `errno`. O valor de `errno` também é acessível via API FFM.

Para capturar o valor de `errno` conforme definido pela biblioteca padrão C, você pode usar [`Linker.Option.captureCallState(String)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/Linker.Option.html#captureCallState\(java.lang.String...\)>), que pode ser usado para capturar certas variáveis thread-local. O [`Linker.Option.captureCallState(String)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/Linker.Option.html#captureCallState\(java.lang.String...\)>) salva partes do estado de execução imediatamente após chamar uma função estrangeira associada a um downcall method handle.

Uma função da biblioteca padrão C que define `errno` é `fopen`, que abre o arquivo cujo nome de caminho é a string apontada por filename, e associa um stream a ele.

O argumento `mode` aponta para uma string que começa com um dos seguintes valores:

  * `r` ou `rb` para abrir arquivo para leitura.
  * `w` ou `wb` para truncar para comprimento zero ou criar arquivo para escrita.
  * `a` ou `ab` para anexar; abrir ou criar arquivo para escrita no final do arquivo.
  * `r+` ou `rb+` ou `r+b` para abrir arquivo para leitura e escrita.
  * `w+` ou `wb+` ou `w+b` para truncar para comprimento zero ou criar arquivo para atualização.
  * `a+` ou `ab+` ou `a+b` para anexar; abrir ou criar arquivo para atualização, escrevendo no final do arquivo.

Se o arquivo for aberto com sucesso, `fopen` retorna um ponteiro para o objeto que controla o stream. Caso contrário, um ponteiro nulo é retornado, e `errno` é definido para indicar o erro. Para obter a mensagem de erro, você pode invocar a função da biblioteca padrão C `strerror`, que retorna uma descrição textual do valor de `errno`.

Para demonstrar como `errno` e `strerror` funcionam, vamos chamar a função `fopen` que usa `captureCallState("errno")` para obter mensagens de erro:

```java
import java.lang.foreign.*;
import java.lang.invoke.*;
import java.nio.charset.StandardCharsets;

Linker linker = Linker.nativeLinker();
SymbolLookup stdlib = linker.defaultLookup();

MethodHandle fopen = linker.downcallHandle(
    stdlib.find("fopen").orElseThrow(),
    FunctionDescriptor.of(ValueLayout.ADDRESS, ValueLayout.ADDRESS, ValueLayout.ADDRESS),
    Linker.Option.captureCallState("errno")
);

MethodHandle strerror = linker.downcallHandle(
    stdlib.find("strerror").orElseThrow(),
    FunctionDescriptor.of(ValueLayout.ADDRESS, ValueLayout.JAVA_INT)
);

try (Arena arena = Arena.ofConfined()) {
    MemorySegment filename = arena.allocateUtf8String("non_existent_file.txt");
    MemorySegment mode = arena.allocateUtf8String("r");

    // Invocar fopen e capturar o estado da chamada
    CallState callState = CallState.of(fopen.invoke(filename, mode));
    MemorySegment file = callState.returnedValue();

    if (file.address() == 0) {
        int errno = callState.capturedCallState("errno");
        MemorySegment errorMsg = (MemorySegment) strerror.invoke(errno);
        System.out.println("Erro ao abrir arquivo: " + errorMsg.getString(0));
    } else {
        System.out.println("Arquivo aberto com sucesso!");
        // Fechar o arquivo (não implementado neste exemplo)
    }
}
```

Copie e cole o trecho acima em uma [`jshell` session](<#/doc/tutorials/jshell-tool>) e então invoque-o com alguns valores. Se você tentar abrir um arquivo em um determinado local usando o modo `r`, e esse arquivo não existir, a função nativa `fopen` definirá o valor de `errno` para 2.

Embora interceptar `errno` ajude a entender o feedback ao usar funções C nativas, você provavelmente notou a presença de alguns avisos ao executar o trecho de código anterior. A próxima seção explora a causa desses avisos e sua importância.

## Métodos Restritos

Existe outro conjunto de métodos na API FFM que são inseguros e, portanto, restritos. Se você executar uma aplicação que precisa invocar métodos restritos, o runtime Java imprimirá uma mensagem de aviso.

Se o código em um módulo `M` precisar usar esses métodos restritos ou quaisquer métodos inseguros sem avisos, você precisará habilitar o acesso a eles especificando a opção de linha de comando `--enable-native-access=M`. Caso você tenha vários módulos que exijam acesso a métodos restritos, use uma lista separada por vírgulas. Para habilitar o uso sem avisos para todo o código no classpath, especifique a opção `--enable-native-access=ALL-UNNAMED`. Alternativamente, você pode conseguir o mesmo para um JAR executável se especificar em seu manifesto o atributo `Enable-Native-Access: ALL-UNNAMED`.

> **Aviso:** Você não pode especificar um nome de módulo como valor do atributo `Enable-Native-Access`.

| Método | Por que este método é restrito |
|---|---|
| `SymbolLookup.libraryLookup(String, Arena)`, `SymbolLookup.libraryLookup(Path, Arena)` | Carregar uma biblioteca sempre causa a execução de código nativo. Por exemplo, no Linux, eles podem ser executados através de hooks `dlopen`. |
| `MemorySegment.reinterpret(long)`, `MemorySegment.reinterpret(long, Arena, Consumer)`, `MemorySegment.reinterpret(Arena, Consumer)` | Esses métodos permitem que você altere o tamanho e o tempo de vida de um segmento existente criando um novo alias para a mesma região de memória. Por exemplo, uma aplicação pode superestimar o tamanho da região e usar [`MemorySegment.reinterpret(long,Arena,Consumer)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/MemorySegment.html#reinterpret\(long,java.lang.foreign.Arena,java.util.function.Consumer\)>) para obter um segmento de 100 bytes de comprimento. Mais tarde, isso pode resultar em tentativas de desreferenciar memória fora dos limites da região, o que pode causar uma falha da JVM ou, pior ainda, resultar em corrupção silenciosa da memória. |
| `Linker.upcallStub(MethodHandle, FunctionDescriptor, Arena, Linker.Option...)` | Quando você cria downcall handles, o linker não pode verificar se o ponteiro de função que você está criando é o correto para o downcall ao qual você o está passando. |
| `Linker.downcallhandle(FunctionDescriptor, Linker.Option...)`, `Linker.downcallhandle(MemorySegment, FunctionDescriptor, Linker.Option...)` | Criar um downcall method handle é intrinsecamente inseguro. Um linker não tem como verificar se o descritor de função fornecido é compatível com a função que está sendo chamada. |
| `AddressLayout.withTargetLayout(MemoryLayout)` | Uma vez que você tem um layout de endereço com um determinado layout de destino, você pode usá-lo em uma operação de desreferência (por exemplo, `MemorySegment.get(AddressLayout, long)`) para redimensionar o segmento que está sendo lido, o que é inseguro. |
| `java.lang.ModuleLayer.Controller.enableNativeAccess(Module)` | O método habilita o acesso nativo para o módulo especificado se o módulo do chamador tiver acesso nativo. Este método é restrito porque propaga privilégios para chamar métodos restritos. |

### Neste tutorial

Invocar Funções Estrangeiras que Retornam Ponteiros
Verificar Erros Nativos com errno
Métodos Restritos

Última atualização: 28 de dezembro de 2024

**Anterior na Série**

[Como Lidar com uma Chamada de Código Nativo de Volta para Código Java](<#/doc/tutorials/ffm/upcall>)

➜

**Tutorial Atual**

Solucionar Problemas em Chamadas para Funções de Biblioteca Nativas

➜

**Próximo na Série**

[Gerar Bindings Java com Jextract](<#/doc/tutorials/ffm/jextract>)

**Anterior na Série:** [Como Lidar com uma Chamada de Código Nativo de Volta para Código Java](<#/doc/tutorials/ffm/upcall>)

**Próximo na Série:** [Gerar Bindings Java com Jextract](<#/doc/tutorials/ffm/jextract>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Foreign Function and Memory ](<#/doc/tutorials/ffm>) > Solucionar Problemas em Chamadas para Funções de Biblioteca Nativas