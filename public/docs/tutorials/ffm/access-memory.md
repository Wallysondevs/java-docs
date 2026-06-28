# Acessar Memória Off-Heap ou On-Heap com Segmentos de Memória

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Foreign Function and Memory ](<#/doc/tutorials/ffm>) > Acessar Memória Off-Heap ou On-Heap com Segmentos de Memória

**Tutorial Atual**

Acessar Memória Off-Heap ou On-Heap com Segmentos de Memória

➜

**Próximo na Série**

[Invocar uma Função de Biblioteca C](<#/doc/tutorials/ffm/native>)

**Próximo na Série:** [Invocar uma Função de Biblioteca C](<#/doc/tutorials/ffm/native>)

# Acessar Memória Off-Heap ou On-Heap com Segmentos de Memória

## Visão Geral da Memória On-Heap e Off-Heap

Em Java, o garbage collector da JVM gerencia a memória on-heap para armazenar objetos. O heap pode crescer ou diminuir enquanto a aplicação é executada, e quando fica cheio, a JVM realiza a garbage collection, liberando espaço para novas alocações.

A memória off-heap é a memória fora do heap Java para tarefas que exigem acesso mais rápido ou interoperabilidade com código nativo. Por exemplo, para invocar uma função C a partir de uma aplicação Java, seus argumentos devem estar na memória off-heap. Como a garbage collection não alcança a memória off-heap, você pode controlar como e quando esses argumentos são desalocados.

Você pode usar um objeto [`MemorySegment`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/MemorySegment.html>) para interagir com a memória off-heap. Um `MemorySegment` está associado a uma região contígua de memória. Existem dois tipos de segmentos de memória:

  * **Segmento de heap** - um segmento de memória apoiado por uma região de memória on-heap.
  * **Segmento nativo** - um segmento de memória apoiado por uma região de memória off-heap.

Este tutorial aborda como alocar e acessar segmentos nativos.

## Alocar um MemorySegment com uma Arena

Você deve alocar um objeto `MemorySegment` com uma arena, o que permite controlar o ciclo de vida dos segmentos de memória nativos. Cada arena tem um escopo, que especifica quando a memória off-heap (associada ao objeto `MemorySegment`) deve ser desalocada e não mais válida. Um segmento de memória é acessível se o escopo associado a ele ainda for válido ou estiver ativo.

Existem quatro tipos de arenas:

  * Uma arena confinada ([`Arena.ofConfined()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/Arena.html#ofConfined\(\)>)) fornece um tempo de vida limitado e determinístico aos seus segmentos de memória, estando ativa desde a sua criação até o seu fechamento. Uma arena confinada tem uma thread proprietária, tipicamente a thread que a criou. Somente a thread proprietária pode acessar os segmentos de memória alocados em uma arena confinada. Você receberá uma exceção se tentar fechar uma arena confinada com uma thread diferente da thread proprietária.
  * Uma arena compartilhada ([`Arena.ofShared()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/Arena.html#ofShared\(\)>)) não tem thread proprietária. Múltiplas threads podem acessar os segmentos de memória alocados em uma arena compartilhada. Além disso, qualquer thread pode fechar uma arena compartilhada, e esta operação é garantida como segura e atômica. Consulte [Fatiar um MemorySegment](<#/doc/tutorials/ffm/access-structure>) para um exemplo usando uma arena compartilhada.
  * Uma arena automática ([`Arena.ofAuto()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/Arena.html#ofAuto\(\)>)) é uma arena gerenciada automaticamente pelo garbage collector. Qualquer thread pode acessar segmentos de memória alocados por uma arena automática. Chamar [`Arena.close()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/Arena.html#close\(\)>) em uma arena automática lançará uma [`UnsupportedOperationException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/UnsupportedOperationException.html>).
  * Uma arena global ([`Arena.global()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/Arena.html#global\(\)>)) tem como característica principal: qualquer thread pode acessar segmentos de memória alocados com esta arena. Além disso, a região de memória desses segmentos de memória nunca é desalocada. Chamar [`Arena::close`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/Arena.html#close\(\)>) em uma arena global lançará uma [`UnsupportedOperationException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/UnsupportedOperationException.html>).

O exemplo a seguir aloca um segmento de memória com uma arena confinada e armazena uma String na memória off-heap associada ao segmento de memória:

A interface [`Arena`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/Arena.html>) estende a interface [`SegmentAllocator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/SegmentAllocator.html>), que contém métodos que alocam memória off-heap e copiam dados Java para ela. O exemplo anterior chama o método [`SegmentAllocator.allocateFrom(String)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/SegmentAllocator.html#allocateFrom\(java.lang.String\)>), que realiza o seguinte:

  * Aloca um segmento de memória com uma arena,
  * Converte uma string em uma string C codificada em UTF-8 e terminada em nulo,
  * Armazena a string no segmento de memória.

Em seguida, vamos verificar como você pode obter acesso a um valor armazenado em um segmento de memória.

## Imprimir um Valor Armazenado na Memória Off-Heap

Com os métodos da interface [`MemorySegment`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/MemorySegment.html>), você pode ler ou escrever em segmentos de memória. Cada um desses métodos recebe como argumento um layout de valor, que modela o layout de memória associado a valores de tipos de dados básicos, como primitivos.

Um layout de valor codifica:

  * o tamanho,
  * a ordem dos bytes,
  * o alinhamento de bits da porção de memória a ser acessada,
  * e o tipo Java a ser usado para a operação de acesso.

Por exemplo, `MemorySegment.get(ValueLayout.OfByte,long)` recebe como argumento [`ValueLayout.JAVA_BYTE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/ValueLayout.html#JAVA_BYTE>).

Este [`ValueLayout.JAVA_BYTE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/foreign/ValueLayout.html#JAVA_BYTE>) possui as seguintes características:

  * Tem o mesmo tamanho que um byte Java.
  * O alinhamento de bytes é definido como 1, o que significa que o layout de memória é armazenado em um endereço de memória que é um múltiplo de 8 bits.
  * A ordem dos bytes é definida como [`ByteOrder.nativeOrder()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/ByteOrder.html#nativeOrder\(\)>) que retorna a ordem de bytes nativa do hardware no qual a máquina virtual Java está sendo executada.

## Fechar uma Arena

Ao trabalhar com uma arena, é uma boa prática acessá-la através de uma declaração [`try-with-resources`](<#/doc/tutorials/exceptions/catching-handling>).

No exemplo anterior, o escopo da arena não está mais ativo uma vez fora da declaração [`try-with-resources`](<#/doc/tutorials/exceptions/catching-handling>). Todos os segmentos de memória associados ao seu escopo são invalidados, e as regiões de memória que os apoiam são desalocadas.

Se você tentar acessar um segmento de memória associado a um escopo de arena que está fechado, você receberá uma [`IllegalStateException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IllegalStateException.html>). Você pode verificar se isso acontece executando a seguinte declaração em uma sessão [`jshell`](<#/doc/tutorials/jvm/tools/core/jshell>):

### Neste tutorial

Visão Geral da Memória On-Heap e Off-Heap Alocar um MemorySegment com uma Arena Imprimir um Valor Armazenado na Memória Off-Heap Fechar uma Arena

Última atualização: 28 de dezembro de 2024

**Tutorial Atual**

Acessar Memória Off-Heap ou On-Heap com Segmentos de Memória

➜

**Próximo na Série**

[Invocar uma Função de Biblioteca C](<#/doc/tutorials/ffm/native>)

**Próximo na Série:** [Invocar uma Função de Biblioteca C](<#/doc/tutorials/ffm/native>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Foreign Function and Memory ](<#/doc/tutorials/ffm>) > Acessar Memória Off-Heap ou On-Heap com Segmentos de Memória