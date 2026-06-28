# Encontrando as Características de um Stream

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Stream ](<#/doc/tutorials/api/streams>) > Encontrando as Características de um Stream

**Anterior na Série**

[Adicionando uma Operação Terminal em um Stream](<#/doc/tutorials/api/streams/terminal-operations>)

➜

**Tutorial Atual**

Encontrando as Características de um Stream

➜

**Próximo na Série**

[Usando um Collector como Operação Terminal](<#/doc/tutorials/api/streams/using-collectors>)

**Anterior na Série:** [Adicionando uma Operação Terminal em um Stream](<#/doc/tutorials/api/streams/terminal-operations>)

**Próximo na Série:** [Usando um Collector como Operação Terminal](<#/doc/tutorials/api/streams/using-collectors>)

# Encontrando as Características de um Stream

## Características de um Stream

A Stream API depende de um objeto especial, uma instância da interface [`Spliterator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html>). O nome desta interface vem do fato de que o papel de um spliterator na Stream API se assemelha ao papel de um iterator na Collection API. Além disso, como a Stream API suporta processamento paralelo, um objeto spliterator também controla como um stream divide seus elementos entre as diferentes CPUs que lidam com a paralelização. O nome é a contração de _split_ e _iterator_.

Cobrir este objeto spliterator em detalhes está além do escopo deste tutorial. O que você precisa saber é que este objeto spliterator carrega as _características_ de um stream. Essas características não são algo que você usará com frequência, mas saber o que são o ajudará a escrever pipelines melhores e mais eficientes em certos casos.

As características de um stream são as seguintes.

Característica | Comentário
---|---
[_ORDERED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#ORDERED>) | A ordem em que os elementos do stream são processados importa.
[_DISTINCT_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#DISTINCT>) | Não há duplicatas nos elementos processados por esse stream.
[_NONNULL_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#NONNULL>) | Não há elementos nulos nesse stream.
[_SORTED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SORTED>) | Os elementos desse stream estão ordenados.
[_SIZED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SIZED>) | O número de elementos que este stream processa é conhecido.
[_SUBSIZED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SUBSIZED>) | Dividir este stream produz dois streams [_SIZED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SIZED>).

Existem duas características, [_IMMUTABLE_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#IMMUTABLE>) e [_CONCURRENT_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#CONCURRENT>), que não são abordadas neste tutorial.

Todo stream tem todas essas características definidas ou não definidas quando é criado.

Lembre-se que um stream pode ser criado de duas maneiras.

1.  Você pode criar um stream a partir de uma fonte de dados, e cobrimos vários padrões diferentes.
2.  Toda vez que você chama uma operação intermediária em um stream existente, você cria um novo stream.

As características de um dado stream dependem da fonte na qual ele foi criado, ou das características do stream com o qual ele foi criado, e da operação que o criou. Se o seu stream for criado com uma fonte, então suas características dependem dessa fonte, e se você o criou com outro stream, então elas dependerão deste outro stream e do tipo de operação que você está usando.

Cada característica é armazenada em um bit específico de uma palavra carregada pelo spliterator. Esta palavra é retornada pelo método [Spliterator.characteristics()](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#characteristics\(\)>). Então, para verificar se um stream possui uma dada característica, você precisa verificar se o bit correspondente é 0 ou 1.

Felizmente, você não precisa fazer isso manualmente, pois a interface [`Spliterator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html>) oferece um método [`Spliterator.hasCharacteristics()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#hasCharacteristics\(int\)>), que recebe uma característica como parâmetro.

O exemplo a seguir é um predicado que pode verificar a característica `ORDERED` de um stream, verificando diretamente a palavra retornada pelo método [Spliterator.characteristics()](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#characteristics\(\)>).

```java
public static <T> Predicate<Stream<T>> isOrdered() {
    return s -> s.spliterator().characteristics() & Spliterator.ORDERED) != 0;
}
```

E este faz o mesmo, chamando o método [`Spliterator.hasCharacteristics()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#hasCharacteristics\(int\)>).

```java
public static <T> Predicate<Stream<T>> isOrdered() {
    return s -> s.spliterator().hasCharacteristics(Spliterator.ORDERED);
}
```

Executar o código anterior imprime o mesmo.

```java
List<String> l = List.of("A", "B", "C");
System.out.println(isOrdered().test(l.stream())); // true
```

Se você substituir `List` por `Set` nos exemplos anteriores, poderá ver que a característica `ORDERED` não está mais presente.

```java
Set<String> s = Set.of("A", "B", "C");
System.out.println(isOrdered().test(s.stream())); // false
```

Vamos apresentar cada característica em mais detalhes.

## Streams Ordenados

Streams [_ORDERED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#ORDERED>) são criados com fontes de dados ordenadas. O primeiro exemplo que pode vir à mente é qualquer instância da interface [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>). Existem outros: [`Files.lines(path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#lines\(java.nio.file.Path\)>) e [`Pattern.splitAsStream(string)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#splitAsStream\(java.lang.CharSequence\)>) também produzem streams [_ORDERED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#ORDERED>).

Manter o controle da ordem dos elementos de um stream pode gerar sobrecarga para streams paralelos. Se você não precisa dessa característica, pode removê-la chamando o método intermediário [`unordered()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/BaseStream.html#unordered\(\)>) em um stream existente. Isso retornará um novo stream sem essa característica. Por que você faria isso? Manter um stream [_ORDERED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#ORDERED>) pode ser custoso em alguns casos, por exemplo, ao usar streams paralelos.

O exemplo na seção anterior mostra como verificar a característica `ORDERED` de um stream.

## Streams Classificados

Um stream [_SORTED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SORTED>) é um stream que foi ordenado. Este stream pode ser criado a partir de uma fonte ordenada, como uma instância de [`TreeSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TreeSet.html>), ou por uma chamada ao método [`sorted()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#sorted\(\)>). Saber que um stream já foi ordenado pode ser usado pela implementação do stream para evitar ordenar novamente um stream já ordenado. Esta otimização pode não ser usada o tempo todo porque um stream [_SORTED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SORTED>) pode ser ordenado novamente com um comparador diferente do usado na primeira vez.

Existem algumas operações intermediárias que removem a característica [_SORTED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SORTED>). No código a seguir, você pode ver que tanto `strings.stream()` quanto `filteredSortedStrings` são streams [_SORTED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SORTED>), enquanto `lengths` não é.

```java
List<String> strings = List.of("one", "two", "three", "four", "five");
Stream<String> filteredSortedStrings = strings.stream()
                                              .filter(s -> s.length() > 3)
                                              .sorted();
Stream<Integer> lengths = filteredSortedStrings.map(String::length);
System.out.println("strings.stream() is sorted: " + isSorted().test(strings.stream()));
System.out.println("filteredSortedStrings is sorted: " + isSorted().test(filteredSortedStrings));
System.out.println("lengths is sorted: " + isSorted().test(lengths));
```

Executar o anterior imprime o seguinte.

```
strings.stream() is sorted: false
filteredSortedStrings is sorted: true
lengths is sorted: false
```

Mapear ou flatmap um stream [_SORTED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SORTED>) remove esta característica do stream resultante.

## Streams Distintos

Um stream [_DISTINCT_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#DISTINCT>) é um stream sem duplicatas entre os elementos que está processando. Tal característica é adquirida ao construir um stream a partir de um [`HashSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html>), por exemplo, ou de uma chamada ao método intermediário [`distinct()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#distinct\(\)>).

A característica [_DISTINCT_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#DISTINCT>) é mantida ao filtrar um stream, mas é perdida ao mapear ou flatmap um stream.

Vamos examinar o exemplo a seguir.

```java
List<String> strings = List.of("one", "two", "three", "four", "five", "one");
Stream<String> distinctStrings = strings.stream().distinct();
Stream<String> filtered = distinctStrings.filter(s -> s.length() > 3);
Stream<Integer> length = filtered.map(String::length);

System.out.println("strings.stream() is distinct: " + isDistinct().test(strings.stream()));
System.out.println("distinctStrings is distinct: " + isDistinct().test(distinctStrings));
System.out.println("filtered is distinct: " + isDistinct().test(filtered));
System.out.println("length is distinct: " + isDistinct().test(length));
```

Executar o código anterior imprime o seguinte.

```
strings.stream() is distinct: false
distinctStrings is distinct: true
filtered is distinct: true
length is distinct: false
```

*   [`strings.stream()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#stream\(\)>) não é [_DISTINCT_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#DISTINCT>) pois é construído a partir de uma instância de [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>).
*   `strings.stream().distinct()` é [_DISTINCT_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#DISTINCT>) pois este stream é criado por uma chamada ao método intermediário [`distinct()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#distinct\(\)>).
*   `filtered` ainda é [_DISTINCT_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#DISTINCT>): remover elementos de um stream não pode criar duplicatas.
*   `length` foi mapeado, então a característica [_DISTINCT_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#DISTINCT>) é perdida.

## Streams Não-Nulos

Um stream [_NONNULL_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#NONNULL>) é um stream que não contém valores nulos. Existem estruturas do Collection Framework que não aceitam valores nulos, incluindo [`ArrayDeque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayDeque.html>) e as estruturas concorrentes como [`ArrayBlockingQueue`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ArrayBlockingQueue.html>), [`ConcurrentSkipListSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ConcurrentSkipListSet.html>), e o conjunto concorrente retornado por uma chamada a [`ConcurrentHashMap.newKeySet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html#newKeySet\(\)>). Streams criados com [`Files.lines(path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#lines\(java.nio.file.Path\)>) e [`Pattern.splitAsStream(line)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#splitAsStream\(java.lang.CharSequence\)>) também são streams [_NONNULL_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#NONNULL>).

O código a seguir verifica alguns desses streams.

```java
public static <T> Predicate<Stream<T>> isNonNull() {
    return s -> s.spliterator().hasCharacteristics(Spliterator.NONNULL);
}

System.out.println("List.of(\"A\", \"B\", \"C\").stream() is non-null: " + isNonNull().test(List.of("A", "B", "C").stream()));
System.out.println("new ArrayDeque<>().stream() is non-null: " + isNonNull().test(new ArrayDeque<>().stream()));
System.out.println("Files.lines(Path.of(\"file.txt\")) is non-null: " + isNonNull().test(Files.lines(Path.of("file.txt"))));
```

Executar o código anterior produz o seguinte resultado.

```
List.of("A", "B", "C").stream() is non-null: false
new ArrayDeque<>().stream() is non-null: true
Files.lines(Path.of("file.txt")) is non-null: true
```

Assim como as características anteriores, algumas operações intermediárias podem produzir um stream com características diferentes.

*   Filtrar ou ordenar um stream [_NONNULL_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#NONNULL>) retorna um stream [_NONNULL_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#NONNULL>).
*   Chamar [`distinct()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#distinct\(\)>) em um stream [_NONNULL_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#NONNULL>) também retorna um stream [_NONNULL_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#NONNULL>).
*   Mapear ou flatmap um stream [_NONNULL_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#NONNULL>) retorna um stream sem esta característica.

## Streams Sized e Subsized

### Streams Sized

Esta última característica é muito importante quando você deseja usar streams paralelos. Streams paralelos são abordados em mais detalhes posteriormente neste tutorial.

Um stream [_SIZED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SIZED>) é um stream que sabe quantos elementos irá processar. Um stream criado a partir de qualquer instância da [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) é um stream assim porque a interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) possui um método [`size()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#size\(\)>), então obter esse número é fácil.

Por outro lado, há casos em que você sabe que seu stream processará um número finito de elementos, mas não pode saber esse número a menos que processe o próprio stream.

Este é o caso para streams criados com o padrão [`Files.lines(path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#lines\(java.nio.file.Path\)>). Você pode obter o tamanho do arquivo de texto em bytes, mas esta informação não diz quantas linhas este arquivo de texto possui. Você precisa analisar o arquivo para obter essa informação.

Este também é o caso para o padrão [`Pattern.splitAsStream(line)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#splitAsStream\(java.lang.CharSequence\)>). Saber o número de caracteres na string que você está analisando não dá nenhuma pista sobre quantos elementos este padrão produzirá.

### Streams Subsized

A característica [_SUBSIZED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SUBSIZED>) tem a ver com a forma como um stream é dividido quando computado como um stream paralelo. Em resumo, o mecanismo de paralelização divide um stream em duas partes e distribui a computação entre os diferentes núcleos disponíveis nos quais a CPU está executando. Essa divisão é implementada pela instância do [`Spliterator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html>) que o stream usa. Esta implementação depende da fonte de dados que você está usando.

Suponha que você precise abrir um stream em um [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>). Todos os dados desta lista são mantidos no array interno da sua instância de [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>). Talvez você se lembre que o array interno em um objeto [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) é um array compacto porque, quando você remove um elemento deste array, todos os elementos seguintes são movidos uma célula para a esquerda para que nenhum "buraco" seja deixado.

Isso torna a divisão de um [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) direta. Para dividir uma instância de [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>), você pode simplesmente dividir este array interno em duas partes, com a mesma quantidade de elementos em ambas as partes. Isso torna um stream criado em uma instância de [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) [_SUBSIZED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SUBSIZED>): você pode saber antecipadamente quantos elementos serão mantidos em cada parte após a divisão.

Suponha agora que você precise abrir um stream em uma instância de [`HashSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html>). Um [`HashSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html>) armazena seus elementos em um array, mas este array é usado de forma diferente do usado por [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>). Na verdade, mais de um elemento pode ser armazenado em uma dada célula deste array. Não há problema em dividir este array, mas você não pode saber antecipadamente quantos elementos serão mantidos em cada parte sem contá-los. Mesmo que você divida este array ao meio, você nunca pode ter certeza de que terá o mesmo número de elementos em ambas as metades. Esta é a razão pela qual um stream criado em uma instância de [`HashSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html>) é [_SIZED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SIZED>) mas não [_SUBSIZED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SUBSIZED>).

Transformar um stream pode alterar as características [_SIZED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SIZED>) e [_SUBSIZED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SUBSIZED>) do stream retornado.

*   Mapear e ordenar um stream preserva as características [_SIZED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SIZED>) e [_SUBSIZED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SUBSIZED>).
*   Flatmapping, filtrar e chamar [`distinct()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#distinct\(\)>) apagam essas características.

É sempre melhor ter streams [_SIZED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SIZED>) e [_SUBSIZED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SUBSIZED>) para computações paralelas.

### Exemplos de Streams Sized e Subsized

Você pode facilmente verificar que um [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) é tanto [_SIZED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SIZED>) quanto [_SUBSIZED_](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SUBSIZED>) com o código a seguir.

```java
public static <T> Predicate<Stream<T>> isSized() {
    return s -> s.spliterator().hasCharacteristics(Spliterator.SIZED);
}

public static <T> Predicate<Stream<T>> isSubSized() {
    return s -> s.spliterator().hasCharacteristics(Spliterator.SUBSIZED);
}

List<String> l = List.of("A", "B", "C");
System.out.println("ArrayList is sized: " + isSized().test(l.stream()));
System.out.println("ArrayList is subsized: " + isSubSized().test(l.stream()));
```

Executar o código anterior imprime o seguinte.

```
ArrayList is sized: true
ArrayList is subsized: true
```

Você pode executar o mesmo código em [`HashSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html>)

```java
Set<String> s = Set.of("A", "B", "C");
System.out.println("HashSet is sized: " + isSized().test(s.stream()));
System.out.println("HashSet is subsized: " + isSubSized().test(s.stream()));
```

Executar o código anterior imprime o seguinte.

```
HashSet is sized: true
HashSet is subsized: false
```

Vamos ver um último exemplo: o stream produzido pela divisão de uma string de caracteres usando um padrão.

```java
Pattern p = Pattern.compile(" ");
System.out.println("Pattern.splitAsStream(\"A B C\") is sized: " + isSized().test(p.splitAsStream("A B C")));
System.out.println("Pattern.splitAsStream(\"A B C\") is subsized: " + isSubSized().test(p.splitAsStream("A B C")));
```

Executar o código anterior imprime o seguinte.

```
Pattern.splitAsStream("A B C") is sized: false
Pattern.splitAsStream("A B C") is subsized: false
```

### Neste tutorial

Características de um Stream
Streams Ordenados
Streams Classificados
Streams Distintos
Streams Não-Nulos
Streams Sized e Subsized

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Adicionando uma Operação Terminal em um Stream](<#/doc/tutorials/api/streams/terminal-operations>)

➜

**Tutorial Atual**

Encontrando as Características de um Stream

➜

**Próximo na Série**

[Usando um Collector como Operação Terminal](<#/doc/tutorials/api/streams/using-collectors>)

**Anterior na Série:** [Adicionando uma Operação Terminal em um Stream](<#/doc/tutorials/api/streams/terminal-operations>)

**Próximo na Série:** [Usando um Collector como Operação Terminal](<#/doc/tutorials/api/streams/using-collectors>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Stream ](<#/doc/tutorials/api/streams>) > Encontrando as Características de um Stream