# Acessar Tipos de Dados Nativos

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Foreign Function and Memory ](<#/doc/tutorials/ffm>) > Acessar Tipos de Dados Nativos

**Anterior na Série**

[Invocar uma Função de Biblioteca C](<#/doc/tutorials/ffm/native>)

➜

**Tutorial Atual**

Acessar Tipos de Dados Nativos

➜

**Próximo na Série**

[Como Lidar com uma Chamada de Código Nativo de Volta para Código Java](<#/doc/tutorials/ffm/upcall>)

**Anterior na Série:** [Invocar uma Função de Biblioteca C](<#/doc/tutorials/ffm/native>)

**Próximo na Série:** [Como Lidar com uma Chamada de Código Nativo de Volta para Código Java](<#/doc/tutorials/ffm/upcall>)

# Acessar Tipos de Dados Nativos

## Descrever uma estrutura C com um MemoryLayout

Obter acesso a dados estruturados usando apenas operações básicas pode produzir código complicado e difícil de manter. Uma solução elegante é usar layouts de memória que são mais eficientes para inicializar e podem acessar tipos de dados nativos mais complexos, como estruturas C.

Por exemplo, vamos considerar uma estrutura C que descreve uma fração:

```c
struct fraction {
    int numerator;
    int denominator;
};
```

Em Java, você pode optar por representar esta estrutura com um [`MemoryLayout`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/MemoryLayout.html>):

```java
MemoryLayout fractionLayout = MemoryLayout.structLayout(
    ValueLayout.JAVA_INT.withName("numerator"),
    ValueLayout.JAVA_INT.withName("denominator")
);
```

O método [`MemoryLayout.structLayout(MemoryLayout...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/MemoryLayout.html#structLayout\(java.lang.foreign.MemoryLayout...\)>) retorna um objeto [`StructLayout`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/StructLayout.html>). O layout da estrutura contém dois layouts de valor `JAVA_INT`, um para o numerador e outro para o denominador. O valor predefinido [`ValueLayout.JAVA_INT`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/ValueLayout.html#JAVA_INT>) contém informações sobre quantos bytes um valor int Java requer.

Vamos calcular a adição entre duas frações usando o `MemoryLayout fractionLayout` personalizado. Comece instanciando uma arena para gerenciar a memória off-heap e alocando memória para duas frações e uma para a fração resultante:

```java
try (Arena arena = Arena.ofConfined()) {
    MemorySegment fraction1 = arena.allocate(fractionLayout);
    MemorySegment fraction2 = arena.allocate(fractionLayout);
    MemorySegment result = arena.allocate(fractionLayout);
```

Em seguida, você precisa de dois `VarHandles` com acesso aos offsets de endereço de memória:

```java
    VarHandle numeratorHandle = fractionLayout.varHandle(PathElement.groupElement("numerator"));
    VarHandle denominatorHandle = fractionLayout.varHandle(PathElement.groupElement("denominator"));
```

Um [`VarHandle`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/invoke/VarHandle.html>) é uma referência dinamicamente fortemente tipada a uma variável ou a uma família parametrizada de variáveis, incluindo campos estáticos, campos não estáticos, elementos de array ou componentes de uma estrutura de dados off-heap. A chamada de método `PathElement.groupElement("numerator")` recupera um layout de memória chamado numerator.

O passo seguinte define os valores das frações chamando [`VarHandle.set(java.lang.Object...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/invoke/VarHandle.html#set\(java.lang.Object...\)>):

```java
    numeratorHandle.set(fraction1, 0, 1);
    denominatorHandle.set(fraction1, 0, 2);

    numeratorHandle.set(fraction2, 0, 1);
    denominatorHandle.set(fraction2, 0, 3);
```

No exemplo `numeratorHandle.set(fraction1, 0, 1)`, o método `set` usa três argumentos:

1.  `fraction1` é o segmento de memória no qual definir o valor.
2.  `0` é o offset base e permite expressar operações de acesso complexas injetando computação de offset adicional no `VarHandle`.
3.  `1` é o valor real a ser definido.

Similarmente, você pode obter acesso a valores com [`VarHandle.get(java.lang.Object...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/invoke/VarHandle.html#get\(java.lang.Object...\)>) e finalmente calcular o resultado:

```java
    int num1 = (int) numeratorHandle.get(fraction1, 0);
    int den1 = (int) denominatorHandle.get(fraction1, 0);

    int num2 = (int) numeratorHandle.get(fraction2, 0);
    int den2 = (int) denominatorHandle.get(fraction2, 0);

    int resultNum = num1 * den2 + num2 * den1;
    int resultDen = den1 * den2;

    numeratorHandle.set(result, 0, resultNum);
    denominatorHandle.set(result, 0, resultDen);

    System.out.println("Result: " + numeratorHandle.get(result, 0) + "/" + denominatorHandle.get(result, 0));
}
```

Você pode verificar o resultado do seu trabalho colando o trecho acima em uma [`jshell` session](<#/doc/tutorials/jshell-tool>) e obter:

```
Result: 5/6
```

Enquanto este exemplo adiciona o valor de duas frações, vamos ver como você pode lidar com a adição de cada duas frações em um array de tais elementos.

## Alocadores de Fatiamento

Existem duas opções para escalar o exemplo anterior e realizar a adição de cada duas frações em um array com um tipo de dado personalizado:

*   Use um alocador de fatiamento que retorna um alocador de segmento. O [`SegmentAllocator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/SegmentAllocator.html>) responde a solicitações de alocação retornando regiões de memória contíguas consecutivas, ou fatias, obtidas de um segmento de memória existente.
*   Obtenha uma fatia de um segmento de memória de qualquer localização dentro de um segmento de memória com o método [`MemorySegment.asSlice`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/MemorySegment.html#asSlice\(long\)>).

Vamos começar armazenando vinte frações em um [`SequenceLayout`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/SequenceLayout.html>):

```java
MemoryLayout fractionArrayLayout = MemoryLayout.sequenceLayout(20, fractionLayout);
```

Em seguida, você pode alocar memória para as vinte frações usando um [`SegmentAllocator.slicingAllocator(MemorySegment)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/SegmentAllocator.html#slicingAllocator\(java.lang.foreign.MemorySegment\)>) :

```java
try (Arena arena = Arena.ofConfined()) {
    MemorySegment fractions = arena.allocate(fractionArrayLayout);
    SegmentAllocator slicingAllocator = SegmentAllocator.slicingAllocator(fractions);
```

Com o `SegmentAllocator` você pode obter fatias consecutivas de um dado segmento e, adicionalmente, alocar um array de inteiros em cada fatia. No caso do nosso exemplo, uma fração é alocada em cada fatia.

Finalmente, complete a lógica do exemplo adicionando cada duas frações:

```java
    VarHandle numeratorHandle = fractionLayout.varHandle(PathElement.groupElement("numerator"));
    VarHandle denominatorHandle = fractionLayout.varHandle(PathElement.groupElement("denominator"));

    for (int i = 0; i < 20; i += 2) {
        MemorySegment fraction1 = slicingAllocator.allocate(fractionLayout);
        MemorySegment fraction2 = slicingAllocator.allocate(fractionLayout);

        numeratorHandle.set(fraction1, 0, i + 1);
        denominatorHandle.set(fraction1, 0, i + 2);

        numeratorHandle.set(fraction2, 0, i + 3);
        denominatorHandle.set(fraction2, 0, i + 4);

        int num1 = (int) numeratorHandle.get(fraction1, 0);
        int den1 = (int) denominatorHandle.get(fraction1, 0);

        int num2 = (int) numeratorHandle.get(fraction2, 0);
        int den2 = (int) denominatorHandle.get(fraction2, 0);

        int resultNum = num1 * den2 + num2 * den1;
        int resultDen = den1 * den2;

        System.out.println("Fraction " + (i / 2 + 1) + ": " + num1 + "/" + den1 + " + " + num2 + "/" + den2 + " = " + resultNum + "/" + resultDen);
    }
}
```

Cole o código acima em uma [`jshell` session](<#/doc/tutorials/jshell-tool>) e verifique se os resultados correspondem:

```
Fraction 1: 1/2 + 3/4 = 10/8
Fraction 2: 5/6 + 7/8 = 82/48
Fraction 3: 9/10 + 11/12 = 218/120
Fraction 4: 13/14 + 15/16 = 422/224
Fraction 5: 17/18 + 19/20 = 676/360
Fraction 6: 21/22 + 23/24 = 990/528
Fraction 7: 25/26 + 27/28 = 1372/728
Fraction 8: 29/30 + 31/32 = 1828/960
Fraction 9: 33/34 + 35/36 = 2364/1224
Fraction 10: 37/38 + 39/40 = 2986/1520
```

## Fatiar um Segmento de Memória

Um alocador de fatiamento retorna uma fatia e é útil ao trabalhar com regiões de memória contíguas consecutivas. O endereço inicial da fatia está logo após o final da última fatia que o alocador de fatiamento retornou. Caso você queira obter uma fatia de um segmento de memória de qualquer localização dentro de um segmento de memória e de qualquer tamanho, você pode chamar [`MemorySegment.asSlice(long,long)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/MemorySegment.html#asSlice\(long,long\)>).

> **Aviso:** `MemorySegment.asSlice(long,long)` retornará uma fatia de um `MemorySegment` desde que o tamanho da fatia permaneça dentro dos limites espaciais do segmento de memória original.

Vamos reutilizar o `MemoryLayout` anterior para frações e obter fatias de um segmento de memória:

```java
MemoryLayout fractionLayout = MemoryLayout.structLayout(
    ValueLayout.JAVA_INT.withName("numerator"),
    ValueLayout.JAVA_INT.withName("denominator")
);

try (Arena arena = Arena.ofShared()) {
    MemorySegment fractions = arena.allocate(fractionLayout.byteSize() * 20);

    VarHandle numeratorHandle = fractionLayout.varHandle(PathElement.groupElement("numerator"));
    VarHandle denominatorHandle = fractionLayout.varHandle(PathElement.groupElement("denominator"));

    for (int i = 0; i < 20; i += 2) {
        MemorySegment fraction1 = fractions.asSlice(i * fractionLayout.byteSize(), fractionLayout.byteSize());
        MemorySegment fraction2 = fractions.asSlice((i + 1) * fractionLayout.byteSize(), fractionLayout.byteSize());

        numeratorHandle.set(fraction1, 0, i + 1);
        denominatorHandle.set(fraction1, 0, i + 2);

        numeratorHandle.set(fraction2, 0, i + 3);
        denominatorHandle.set(fraction2, 0, i + 4);

        int num1 = (int) numeratorHandle.get(fraction1, 0);
        int den1 = (int) denominatorHandle.get(fraction1, 0);

        int num2 = (int) numeratorHandle.get(fraction2, 0);
        int den2 = (int) denominatorHandle.get(fraction2, 0);

        int resultNum = num1 * den2 + num2 * den1;
        int resultDen = den1 * den2;

        System.out.println("Fraction " + (i / 2 + 1) + ": " + num1 + "/" + den1 + " + " + num2 + "/" + den2 + " = " + resultNum + "/" + resultDen);
    }
}
```

Como múltiplas threads podem trabalhar em paralelo para acessar cada uma das fatias, o segmento de memória deve ser acessível a elas. Você pode conseguir isso associando o segmento de memória a uma arena compartilhada. Copie e cole o trecho abaixo para experimentar o exemplo completo em uma [`jshell` session](<#/doc/tutorials/jshell-tool>):

```
Fraction 1: 1/2 + 3/4 = 10/8
Fraction 2: 5/6 + 7/8 = 82/48
Fraction 3: 9/10 + 11/12 = 218/120
Fraction 4: 13/14 + 15/16 = 422/224
Fraction 5: 17/18 + 19/20 = 676/360
Fraction 6: 21/22 + 23/24 = 990/528
Fraction 7: 25/26 + 27/28 = 1372/728
Fraction 8: 29/30 + 31/32 = 1828/960
Fraction 9: 33/34 + 35/36 = 2364/1224
Fraction 10: 37/38 + 39/40 = 2986/1520
```

### Neste tutorial

Descrever uma estrutura C com um MemoryLayout Alocadores de Fatiamento Fatiar um Segmento de Memória

Última atualização: 28 de dezembro de 2024

**Anterior na Série**

[Invocar uma Função de Biblioteca C](<#/doc/tutorials/ffm/native>)

➜

**Tutorial Atual**

Acessar Tipos de Dados Nativos

➜

**Próximo na Série**

[Como Lidar com uma Chamada de Código Nativo de Volta para Código Java](<#/doc/tutorials/ffm/upcall>)

**Anterior na Série:** [Invocar uma Função de Biblioteca C](<#/doc/tutorials/ffm/native>)

**Próximo na Série:** [Como Lidar com uma Chamada de Código Nativo de Volta para Código Java](<#/doc/tutorials/ffm/upcall>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Foreign Function and Memory ](<#/doc/tutorials/ffm>) > Acessar Tipos de Dados Nativos