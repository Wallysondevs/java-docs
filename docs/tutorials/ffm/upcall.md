# Como Lidar com uma Chamada de Código Nativo de Volta para Código Java

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Foreign Function and Memory ](<#/doc/tutorials/ffm>) > Como Lidar com uma Chamada de Código Nativo de Volta para Código Java

**Anterior na Série**

[Acessar Tipos de Dados Nativos](<#/doc/tutorials/ffm/access-structure>)

➜

**Tutorial Atual**

Como Lidar com uma Chamada de Código Nativo de Volta para Código Java

➜

**Próximo na Série**

[Solucionar Problemas em Chamadas para Funções de Biblioteca Nativas](<#/doc/tutorials/ffm/troubleshoot>)

**Anterior na Série:** [Acessar Tipos de Dados Nativos](<#/doc/tutorials/ffm/access-structure>)

**Próximo na Série:** [Solucionar Problemas em Chamadas para Funções de Biblioteca Nativas](<#/doc/tutorials/ffm/troubleshoot>)

# Como Lidar com uma Chamada de Código Nativo de Volta para Código Java

## Introdução

Existem casos de uso em que você precisa invocar funções estrangeiras que possuem como argumentos ponteiros para outra função, como ordenar os elementos de um array com a função da biblioteca C padrão `qsort`:

Esta função possui quatro argumentos:

*   `base` é um ponteiro para o primeiro elemento do array a ser ordenado,
*   `nbemb` representa o número de elementos no array,
*   `size` é o tamanho, em bytes, de cada elemento no array,
*   `compar` é um ponteiro para a função que compara dois elementos.

`qsort` requer um ponteiro para uma função que compara dois elementos de array. Do Java, você deve passar código como um ponteiro de função para esta função estrangeira. Upcall stubs permitem que você passe código Java como um ponteiro de função para uma função nativa, e este tutorial aborda como fazer isso para invocar a função `qsort` em Java.

## Criar um Downcall Method Handle para a Função Estrangeira

Vamos começar com como representar em Java o método que compara dois elementos, neste caso dois valores `int`::

```java
static int qsortCompare(MemorySegment elem1, MemorySegment elem2) {
    return Integer.compare(elem1.get(ValueLayout.OfInt, 0), elem2.get(ValueLayout.OfInt, 0));
}
```

Neste método, os valores `int` são representados por objetos `MemorySegment`. O método `Integer.compare` compara dois valores `int` numericamente e requer acesso a eles. Para conseguir isso, o exemplo chama `get(ValueLayout.OfInt, long)` em cada `MemorySegment`, onde o segundo argumento é o offset em bytes relativo à localização do endereço de memória.

Em seguida, vamos vincular nosso código Java à função estrangeira `qsort` criando um downcall method handle para a função `qsort`:

```java
MethodHandle qsort = CLinker.systemCLinker().downcallHandle(
    CLinker.systemCLinker().lookup("qsort").orElseThrow(),
    FunctionDescriptor.ofVoid(ValueLayout.ADDRESS, ValueLayout.JAVA_LONG, ValueLayout.JAVA_LONG, ValueLayout.ADDRESS));
```

Mas você também precisa de um method handle para representar o método de comparação `Qsort::qsortCompare`:

```java
MethodHandle comparHandle = MethodHandles.lookup().findStatic(Qsort.class, "qsortCompare",
    MethodType.methodType(int.class, MemorySegment.class, MemorySegment.class));
```

O método [`MethodHandles.Lookup.findStatic(Class, String, MethodType)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/invoke/MethodHandles.Lookup.html#findStatic\(java.lang.Class,java.lang.String,java.lang.invoke.MethodType\)>) cria um method handle para um método estático, e ele precisa de três argumentos:

*   `Qsort.class` é a classe do método,
*   `qsortCompare` é o nome do método,
*   o tipo do método: o tipo do valor de retorno do método e os tipos dos argumentos do método.

Tendo esses elementos, vamos criar uma descrição Java da função C implementada por um método Java.

## Criar um Ponteiro de Função a partir de um Method Handle

Esta etapa exige que o linker permita que funções estrangeiras chamem method handles Java. Para conseguir isso, você precisa de um descritor de função e um ponteiro de função para `qsortCompare`:

```java
FunctionDescriptor qsortCompareDesc = FunctionDescriptor.of(ValueLayout.JAVA_INT, ValueLayout.ADDRESS, ValueLayout.ADDRESS);
MemorySegment comparFunc = CLinker.systemCLinker().upcallStub(comparHandle, qsortCompareDesc, Arena.ofAuto());
```

O método [`Linker.upcallStub(MethodHandle,FunctionDescriptor,Arena,Linker.Option...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/Linker.html#upcallStub\(java.lang.invoke.MethodHandle,java.lang.foreign.FunctionDescriptor,java.lang.foreign.MemorySession\)>) precisa de três argumentos:

*   `comparHandle` é o method handle a partir do qual criar um ponteiro de função,
*   `qsortCompareDesc` é o descritor de função do ponteiro de função,
*   `Arena.ofAuto()` é a arena a ser associada ao ponteiro de função. [`Arena.ofAuto()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/Arena.html#ofAuto\(\)>) cria uma nova arena que é gerenciada, automaticamente, pelo garbage collector.

Agora você pode prosseguir para chamar a função nativa `qsort` para ordenar um array.

## Chamar a Função Nativa

A função nativa `qsort` precisa de um array como entrada. Você pode usar um `MemorySegment` para alocar memória off-heap e armazenar nela o array `input`:

```java
int[] input = { 0, 9, 3, 4, 6, 5, 1, 8, 2, 7 };
try (Arena offHeap = Arena.ofConfined()) {
    MemorySegment array = offHeap.allocateArray(ValueLayout.JAVA_INT, input);
    // ...
}
```

Para chamar a função `qsort`, passe seus argumentos Java correspondentes:

```java
qsort.invokeExact(array, (long) input.length, (long) ValueLayout.JAVA_INT.byteSize(), comparFunc);
```

Se você estiver curioso para saber como o array ordenado se parece, você pode copiar os valores do array ordenado da memória off-heap para a memória on-heap:

```java
int[] sorted = array.toArray(ValueLayout.JAVA_INT);
System.out.println(Arrays.toString(sorted)); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Juntando todos os trechos deste tutorial, deve-se produzir um exemplo funcional semelhante ao abaixo:

```java
import java.lang.foreign.*;
import java.lang.invoke.*;
import java.util.Arrays;

public class InvokeQsort {

    static int qsortCompare(MemorySegment elem1, MemorySegment elem2) {
        return Integer.compare(elem1.get(ValueLayout.OfInt, 0), elem2.get(ValueLayout.OfInt, 0));
    }

    public static void main(String[] args) throws Throwable {
        MethodHandle qsort = CLinker.systemCLinker().downcallHandle(
            CLinker.systemCLinker().lookup("qsort").orElseThrow(),
            FunctionDescriptor.ofVoid(ValueLayout.ADDRESS, ValueLayout.JAVA_LONG, ValueLayout.JAVA_LONG, ValueLayout.ADDRESS));

        MethodHandle comparHandle = MethodHandles.lookup().findStatic(InvokeQsort.class, "qsortCompare",
            MethodType.methodType(int.class, MemorySegment.class, MemorySegment.class));

        FunctionDescriptor qsortCompareDesc = FunctionDescriptor.of(ValueLayout.JAVA_INT, ValueLayout.ADDRESS, ValueLayout.ADDRESS);
        MemorySegment comparFunc = CLinker.systemCLinker().upcallStub(comparHandle, qsortCompareDesc, Arena.ofAuto());

        int[] input = { 0, 9, 3, 4, 6, 5, 1, 8, 2, 7 };
        try (Arena offHeap = Arena.ofConfined()) {
            MemorySegment array = offHeap.allocateArray(ValueLayout.JAVA_INT, input);
            qsort.invokeExact(array, (long) input.length, (long) ValueLayout.JAVA_INT.byteSize(), comparFunc);
            int[] sorted = array.toArray(ValueLayout.JAVA_INT);
            System.out.println(Arrays.toString(sorted)); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
    }
}
```

Finalmente, você também pode verificar o array ordenado executando o exemplo completo com `java InvokeQsort.java`.

### Neste tutorial

Introdução Criar um Downcall Method Handle para a Função Estrangeira Criar um Ponteiro de Função a partir de um Method Handle Chamar a Função Nativa

Última atualização: 28 de dezembro de 2024

**Anterior na Série**

[Acessar Tipos de Dados Nativos](<#/doc/tutorials/ffm/access-structure>)

➜

**Tutorial Atual**

Como Lidar com uma Chamada de Código Nativo de Volta para Código Java

➜

**Próximo na Série**

[Solucionar Problemas em Chamadas para Funções de Biblioteca Nativas](<#/doc/tutorials/ffm/troubleshoot>)

**Anterior na Série:** [Acessar Tipos de Dados Nativos](<#/doc/tutorials/ffm/access-structure>)

**Próximo na Série:** [Solucionar Problemas em Chamadas para Funções de Biblioteca Nativas](<#/doc/tutorials/ffm/troubleshoot>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Foreign Function and Memory ](<#/doc/tutorials/ffm>) > Como Lidar com uma Chamada de Código Nativo de Volta para Código Java