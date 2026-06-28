# Usando Optionals

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Stream ](<#/doc/tutorials/api/streams>) > Usando Optionals

**Anterior na Série**

[Implementando a Interface Collector](<#/doc/tutorials/api/streams/collector-interface>)

➜

**Tutorial Atual**

Usando Optionals

➜

**Próximo na Série**

[Paralelizando Streams](<#/doc/tutorials/api/streams/parallel-streams>)

**Anterior na Série:** [Implementando a Interface Collector](<#/doc/tutorials/api/streams/collector-interface>)

**Próximo na Série:** [Paralelizando Streams](<#/doc/tutorials/api/streams/parallel-streams>)

# Usando Optionals

## Suportando Métodos Que Nem Sempre Podem Produzir um Resultado

Já abordamos vários usos da classe [`Optional`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html>), especialmente no caso em que você está chamando uma operação terminal em um stream que não possui um elemento de identidade. Este caso não é fácil de lidar porque você não pode retornar nenhum valor, incluindo 0, e retornar `null` faria com que seu código tivesse que lidar com valores `null` em lugares onde você não gostaria.

Ser capaz de usar a classe [`Optional`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html>), para os casos em que você não pode produzir um valor, oferece muitas oportunidades para melhores padrões, especialmente para um melhor tratamento de erros. Esta é a principal razão pela qual você deve usar objetos [`Optional`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html>): eles sinalizam que um método pode não produzir um resultado em certas circunstâncias. Armazenar uma instância de [`Optional`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html>) em um campo, em uma lista, em um mapa ou passá-la como argumento de método não é para o que os optionals foram criados.

Se você projeta um método que retorna um optional, ou precisa armazenar um optional em uma variável, então você não deve retornar null ou definir esta variável como null. Você deve, em vez disso, aproveitar o fato de que seu optional pode estar vazio.

Em resumo, a classe [`Optional`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html>) é uma classe wrapper, que pode envolver uma referência: [`Optional<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html>), ou um valor: [`OptionalInt`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/OptionalInt.html>), [`OptionalLong`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/OptionalLong.html>), e [`OptionalDouble`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/OptionalDouble.html>). A diferença com os tipos wrapper clássicos que você já conhece: [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>), [`Long`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Long.html>), [`Double`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Double.html>), etc... é que um objeto optional pode estar vazio. Tal instância não envolve nada.

Se você precisa de um mecanismo para retornar algo do seu método que significaria _nenhum valor_ e que retornar null poderia levar a erros, incluindo [`NullPointerException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NullPointerException.html>), então você deve considerar retornar um objeto optional e retornar um optional vazio neste caso.

## Criando Objetos Optional

A classe [`Optional`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html>) é uma classe final com construtor privado. Assim, a única maneira de criar uma instância dela é chamando um de seus métodos de fábrica. Existem três deles.

1.  Você pode criar um optional vazio chamando [`Optional.empty()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#empty\(\)>).
2.  Você pode envolver um elemento não-null chamando [`Optional.of()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#of\(T\)>) com este elemento como argumento. Passar uma referência null para este método não é permitido. Você receberá uma [`NullPointerException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NullPointerException.html>) neste caso.
3.  Você pode envolver qualquer elemento chamando [`Optional.ofNullable()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#ofNullable\(T\)>) com este elemento como argumento. Você pode passar uma referência null para este método. Neste caso, você obterá um optional vazio.

Estas são as únicas maneiras de criar uma instância desta classe. Como você pode ver, você não pode envolver uma referência null com um objeto optional. A consequência é que, abrir um optional não vazio sempre retornará uma referência não-null.

A classe [`Optional<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html>) possui três classes equivalentes usadas com os streams especializados de números: [`OptionalInt`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/OptionalInt.html>), [`OptionalLong`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/OptionalLong.html>), e [`OptionalDouble`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/OptionalDouble.html>). Essas classes são wrappers de tipos primitivos, ou seja, valores. O método [`ofNullable()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#ofNullable\(T\)>) não faria sentido para essas classes porque um valor não pode ser null.

## Abrindo um Objeto Optional

Existem várias maneiras de usar um optional e acessar o elemento que ele envolve, se houver. Você pode consultar diretamente a instância que possui e abri-la se houver algo nela, ou pode usar métodos semelhantes a stream nela: [`map()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#map\(java.util.function.Function\)>), [`flatMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#flatMap\(java.util.function.Function\)>), [`filter()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#filter\(java.util.function.Predicate\)>), e até mesmo um equivalente de [`forEach()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#forEach\(java.util.function.Consumer\)>).

Abrir um optional para obter seu conteúdo deve ser feito com cautela porque ele lançará uma [`NoSuchElementException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NoSuchElementException.html>) se o optional estiver vazio. A menos que você tenha certeza de que há um elemento em seu optional, você deve proteger esta operação testando-o primeiro.

Dois métodos estão disponíveis para você testar seu objeto optional: [`isPresent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#isPresent\(\)>), e [`isEmpty()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#isEmpty\(\)>), adicionado no Java SE 11.

Então, para abrir seu optional, você pode usar os seguintes métodos.

*   [`get()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#get\(\)>): este método foi descontinuado porque se parece com um _getter_, mas pode lançar uma [`NoSuchElementException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NoSuchElementException.html>) se o optional estiver vazio.
*   [`orElseThrow()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#orElseThrow\(\)>) é o padrão preferido desde o Java SE 10. Ele faz o mesmo que o método [`get()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#get\(\)>), mas seu nome não deixa dúvidas de que ele pode lançar uma [`NoSuchElementException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NoSuchElementException.html>).
*   [`orElseThrow(Supplier exceptionSupplier)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#orElseThrow\(java.util.function.Supplier\)>): faz o mesmo que o método anterior. Ele usa o supplier que você passa como argumento para criar a exceção que ele lança.

Você também pode tentar obter o conteúdo de um objeto optional e fornecer um objeto que será retornado caso o optional esteja vazio.

*   [`orElse(T returnedObject)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#orElse\(T\)>): retorna o argumento se chamado em um optional vazio.
*   [`orElseGet(Supplier<T> supplier)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#orElseGet\(java.util.function.Supplier\)>): faz o mesmo que o anterior, sem ter que construir o objeto retornado, caso a construção deste objeto se mostre cara. De fato, o supplier fornecido é invocado apenas se necessário.

Por fim, você pode criar outro optional se este optional estiver vazio.

*   [`or(Supplier<Optional> supplier)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#or\(java.util.function.Supplier\)>): retorna este optional não modificado se não estiver vazio e chama o supplier fornecido se estiver. Este supplier cria outro optional que é retornado por este método.

## Processando um Objeto Optional

A classe [`Optional`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html>) também fornece padrões para que você possa integrar o processamento de seus objetos optional com o processamento de stream. Ela possui métodos que correspondem diretamente aos métodos da Stream API que você pode usar para processar seus dados da mesma forma, e que se integrarão perfeitamente com streams. Esses métodos são [`map()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#map\(java.util.function.Function\)>), [`filter()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#filter\(java.util.function.Predicate\)>), e [`flatMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#flatMap\(java.util.function.Function\)>). Eles aceitam os mesmos argumentos que seus métodos "gêmeos" da Stream API, exceto por [`flatMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#flatMap\(java.util.function.Function\)>), que aceita uma função que retorna uma instância de [`Optional<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html>) em vez de uma instância de [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>).

Esses métodos retornam um objeto optional com a seguinte convenção.

1.  Se o optional do qual eles são chamados estiver vazio, então eles retornam um objeto optional.
2.  Se não estiver vazio, então seu argumento, função ou predicado é aplicado ao conteúdo desta opção. O resultado é envolvido em outra opção, que é retornada por este método.

Usar esses métodos pode levar a um código mais legível em alguns padrões de stream.

Suponha que você tenha uma lista de instâncias de `Customer` com uma propriedade `id`. Você precisa encontrar o nome do cliente com um determinado ID. Usando o vocabulário de stream, você precisa _encontrar_ o cliente com o ID fornecido e _mapeá-lo_ para seu nome.

Você pode fazer isso com o seguinte padrão.

```java
import java.util.List;
import java.util.Optional;

public class Customer {
    private final long id;
    private final String name;

    public Customer(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public static void main(String[] args) {
        List<Customer> customers = List.of(
            new Customer(1, "Alice"),
            new Customer(2, "Bob"),
            new Customer(3, "Charlie")
        );

        Optional<String> customerName = customers.stream()
            .filter(c -> c.getId() == 2)
            .findFirst()
            .map(Customer::getName);

        customerName.ifPresent(name -> System.out.println("Customer name: " + name));

        Optional<String> nonExistentCustomerName = customers.stream()
            .filter(c -> c.getId() == 99)
            .findFirst()
            .map(Customer::getName);

        System.out.println("Non-existent customer name present: " + nonExistentCustomerName.isPresent());
    }
}
```

Executar o código anterior imprime o seguinte resultado.

```
Customer name: Bob
Non-existent customer name present: false
```

Você pode ver neste padrão que o método [`map()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#map\(java.util.function.Function\)>) vem da classe [`Optional`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html>), e se integra bem com o processamento de stream. Você não precisa verificar se o objeto optional retornado pelo método [`findFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#findFirst\(\)>) está vazio ou não; chamar [`map()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#map\(java.util.function.Function\)>) faz isso por você.

### Obtendo os Dois Autores Que Mais Publicaram Juntos

Vamos examinar outro exemplo, mais complexo, que demonstra como usar esses métodos. Percorrer este exemplo mostrará vários dos principais padrões da Stream API, da Collector API e dos objetos optional.

Suponha que você tenha um conjunto de artigos que precisa processar. Um artigo tem um título, um ano de início e uma lista de autores. Um autor tem um nome.

Há muitos artigos em sua lista, e você precisa saber quais autores publicaram o maior número de artigos juntos.

Sua primeira ideia poderia ser construir um stream de pares de autores para um determinado artigo. Este é, na verdade, o produto cartesiano do conjunto de autores de um determinado artigo. Você não precisa de todos os pares neste stream. Você não está interessado nos pares onde os dois autores são, de fato, o mesmo autor; um par de dois autores (_A1_ , _A2_) é o mesmo que o par (_A2_ , _A1_). Para implementar esta restrição, você pode adicionar uma restrição a um par, declarando que, em um par, os autores são ordenados alfabeticamente.

Vamos escrever dois records para este modelo.

```java
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

record Author(String name) implements Comparable<Author> {
    @Override
    public int compareTo(Author o) {
        return name.compareTo(o.name);
    }
}

record Article(String title, int inceptionYear, Set<Author> authors) {}

record PairOfAuthors(Author firstAuthor, Author secondAuthor) {
    public PairOfAuthors {
        Objects.requireNonNull(firstAuthor);
        Objects.requireNonNull(secondAuthor);
        if (firstAuthor.compareTo(secondAuthor) > 0) {
            throw new IllegalArgumentException("Authors must be sorted alphabetically");
        }
    }

    public static Optional<PairOfAuthors> of(Author firstAuthor, Author secondAuthor) {
        if (firstAuthor.equals(secondAuthor)) {
            return Optional.empty();
        }
        if (firstAuthor.compareTo(secondAuthor) > 0) {
            return Optional.of(new PairOfAuthors(secondAuthor, firstAuthor));
        }
        return Optional.of(new PairOfAuthors(firstAuthor, secondAuthor));
    }
}
```

Criar um método de fábrica no record `PairOfAuthors` permite controlar quais instâncias deste record são permitidas e evitar a criação de pares que você não precisa. Para mostrar que este método de fábrica pode não ser capaz de produzir um resultado, você pode envolvê-lo em um optional. Isso respeita perfeitamente o princípio: se você não pode produzir um resultado, retorne um optional vazio.

Vamos escrever uma função que cria um [`Stream<PairOfAuthors>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>) para um determinado artigo. Você pode fazer um produto cartesiano com dois streams aninhados.

Como primeiro passo, você pode escrever uma bifunção que cria este stream a partir de um artigo e um autor.

```java
BiFunction<Article, Author, Stream<PairOfAuthors>> allPairs =
    (article, firstAuthor) -> article.authors().stream()
        .flatMap(secondAuthor -> PairOfAuthors.of(firstAuthor, secondAuthor).stream());
```

Esta bifunção cria um objeto optional a partir do `firstAuthor` e do `secondAuthor`, retirados do stream construído sobre os autores do artigo. Você pode ver que o método [`stream()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#stream\(\)>) é chamado no objeto optional retornado pelo método [`of()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#of\(T\)>). O stream retornado está vazio se o optional estiver vazio e contém apenas um único par de autores caso contrário. Este stream é processado pelo método [`flatMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#flatMap\(java.util.function.Function\)>). Este método abre os streams, os vazios simplesmente desaparecerão, e apenas os pares válidos aparecerão no stream resultante.

Agora você pode construir uma função que usa esta bifunção para criar um stream de pares de autores a partir de um artigo.

```java
Function<Article, Stream<PairOfAuthors>> allPairsInAnArticle =
    article -> article.authors().stream()
        .flatMap(firstAuthor -> allPairs.apply(article, firstAuthor));
```

Saber os dois autores que mais publicaram juntos pode ser feito a partir de um histograma em que as chaves são os pares de autores e os valores são o número de artigos que eles escreveram juntos.

Você pode construir um histograma com o collector [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function,java.util.stream.Collector\)>). Vamos primeiro criar o stream de pares de autores.

```java
List<Article> articles = List.of(
    new Article("Article 1", 2020, Set.of(new Author("A"), new Author("B"))),
    new Article("Article 2", 2020, Set.of(new Author("A"), new Author("C"))),
    new Article("Article 3", 2021, Set.of(new Author("B"), new Author("C"))),
    new Article("Article 4", 2021, Set.of(new Author("A"), new Author("B"), new Author("C")))
);

Stream<PairOfAuthors> allPairsStream = articles.stream()
    .flatMap(allPairsInAnArticle);
```

Este stream é construído de tal forma que, se um par de autores escreveu dois artigos juntos, este par aparece duas vezes no stream. Então, o que você precisa fazer é contar quantas vezes cada par aparece neste stream. Isso pode ser feito com um padrão [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function,java.util.stream.Collector\)>) em que o classificador é a função identidade: o próprio par. Neste ponto, os valores são listas de pares, que você precisa contar. Então o downstream collector é apenas o collector [`counting()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#counting\(\)>).

Encontrar os autores que mais publicaram juntos consiste em extrair o valor máximo deste mapa. Você pode criar a seguinte função para este processamento.

```java
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

Function<Map<PairOfAuthors, Long>, Map.Entry<PairOfAuthors, Long>> mostPublishedPair =
    (map) -> map.entrySet().stream()
        .max(Map.Entry.comparingByValue())
        .orElseThrow();
```

Esta função chama o método [`orElseThrow()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#orElseThrow\(\)>) no objeto optional retornado pelo método [`Stream.max()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#max\(java.util.Comparator\)>).

Este objeto optional pode estar vazio? Para que ele esteja vazio, o próprio mapa deve estar vazio, o que significa que não havia pares de autores no stream original. Contanto que você tenha pelo menos um artigo com pelo menos dois autores, então este optional não estará vazio. Mas ainda existe a possibilidade de que sim, este optional esteja vazio.

Você pode juntar tudo isso para executar este código.

```java
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

// Records Author, Article, PairOfAuthors as defined previously

public class MostPublishedAuthors {
    public static void main(String[] args) {
        List<Article> articles = List.of(
            new Article("Article 1", 2020, Set.of(new Author("A"), new Author("B"))),
            new Article("Article 2", 2020, Set.of(new Author("A"), new Author("C"))),
            new Article("Article 3", 2021, Set.of(new Author("B"), new Author("C"))),
            new Article("Article 4", 2021, Set.of(new Author("A"), new Author("B"), new Author("C")))
        );

        BiFunction<Article, Author, Stream<PairOfAuthors>> allPairs =
            (article, firstAuthor) -> article.authors().stream()
                .flatMap(secondAuthor -> PairOfAuthors.of(firstAuthor, secondAuthor).stream());

        Function<Article, Stream<PairOfAuthors>> allPairsInAnArticle =
            article -> article.authors().stream()
                .flatMap(firstAuthor -> allPairs.apply(article, firstAuthor));

        Map<PairOfAuthors, Long> histogram = articles.stream()
            .flatMap(allPairsInAnArticle)
            .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        Function<Map<PairOfAuthors, Long>, Map.Entry<PairOfAuthors, Long>> mostPublishedPair =
            (map) -> map.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .orElseThrow(); // This might throw if the map is empty

        Map.Entry<PairOfAuthors, Long> result = mostPublishedPair.apply(histogram);
        System.out.println("Most published pair: " + result.getKey() + " with " + result.getValue() + " articles.");
    }
}
```

Executar o código anterior imprime o seguinte.

```
Most published pair: PairOfAuthors[firstAuthor=Author[name=A], secondAuthor=Author[name=B]] with 2 articles.
```

Observe que o código anterior não lida com os possíveis empates entre os autores que mais publicaram juntos. Se houver vários pares de autores com o mesmo número de artigos, este código retornará apenas um deles.

### Obtendo os Dois Autores Que Mais Publicaram Juntos Por Ano

Vamos dar um passo adiante e nos perguntar se você poderia fazer o mesmo processamento para cada ano. Na verdade, ser capaz de implementar este processamento com um único collector resolveria seu problema porque você poderia então passá-lo como um downstream collector para um collector [`groupingBy(Article::inceptionYear)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function,java.util.stream.Collector\)>).

O pós-processamento do mapa para extrair o máximo pode ser feito com um collector [`collectingAndThen()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#collectingAndThen\(java.util.stream.Collector,java.util.function.Function\)>). Este padrão já foi abordado em uma seção anterior [Usando um Finisher para Pós-Processar um Collector](<#/doc/tutorials/api/streams/custom-collectors>). Este collector é o seguinte.

```java
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

// ... (Author, Article, PairOfAuthors records and allPairsInAnArticle function)

var histogramCollector = Collectors.groupingBy(Function.identity(), Collectors.counting());

Function<Map<PairOfAuthors, Long>, Map.Entry<PairOfAuthors, Long>> finisher =
    (map) -> map.entrySet().stream()
        .max(Map.Entry.comparingByValue())
        .orElseThrow();
```

Vamos extrair o collector [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function,java.util.stream.Collector\)>) e o finisher. Se você estiver usando uma IDE para digitar este código, pode usá-la para obter os tipos corretos para seu collector.

```java
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collector;
import java.util.stream.Collectors;

// ... (Author, Article, PairOfAuthors records and allPairsInAnArticle function)

Collector<PairOfAuthors, ?, Map<PairOfAuthors, Long>> histogramCollector =
    Collectors.groupingBy(Function.identity(), Collectors.counting());

Function<Map<PairOfAuthors, Long>, Map.Entry<PairOfAuthors, Long>> finisher =
    (map) -> map.entrySet().stream()
        .max(Map.Entry.comparingByValue())
        .orElseThrow();
```

Agora você pode mesclá-los em um único collector [`collectingAndThen()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#collectingAndThen\(java.util.stream.Collector,java.util.function.Function\)>). Você pode reconhecer o collector [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function,java.util.stream.Collector\)>) como o primeiro argumento e a função `finisher` como o segundo argumento.

```java
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collector;
import java.util.stream.Collectors;

// ... (Author, Article, PairOfAuthors records and allPairsInAnArticle function)

Collector<PairOfAuthors, ?, Map.Entry<PairOfAuthors, Long>> mostPublishedPairCollector =
    Collectors.collectingAndThen(
        Collectors.groupingBy(Function.identity(), Collectors.counting()),
        (map) -> map.entrySet().stream()
            .max(Map.Entry.comparingByValue())
            .orElseThrow()
    );
```

Agora você pode escrever o padrão completo com a operação flatmap inicial e este collector.

```java
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

// ... (Author, Article, PairOfAuthors records and allPairs function)

public class MostPublishedAuthorsPerYear {
    public static void main(String[] args) {
        List<Article> articles = List.of(
            new Article("Article 1", 2020, Set.of(new Author("A"), new Author("B"))),
            new Article("Article 2", 2020, Set.of(new Author("A"), new Author("C"))),
            new Article("Article 3", 2021, Set.of(new Author("B"), new Author("C"))),
            new Article("Article 4", 2021, Set.of(new Author("A"), new Author("B"), new Author("C")))
        );

        BiFunction<Article, Author, Stream<PairOfAuthors>> allPairs =
            (article, firstAuthor) -> article.authors().stream()
                .flatMap(secondAuthor -> PairOfAuthors.of(firstAuthor, secondAuthor).stream());

        Function<Article, Stream<PairOfAuthors>> allPairsInAnArticle =
            article -> article.authors().stream()
                .flatMap(firstAuthor -> allPairs.apply(article, firstAuthor));

        Collector<PairOfAuthors, ?, Map.Entry<PairOfAuthors, Long>> mostPublishedPairCollector =
            Collectors.collectingAndThen(
                Collectors.groupingBy(Function.identity(), Collectors.counting()),
                (map) -> map.entrySet().stream()
                    .max(Map.Entry.comparingByValue())
                    .orElseThrow()
            );

        Map<Integer, Map.Entry<PairOfAuthors, Long>> result = articles.stream()
            .collect(Collectors.groupingBy(
                Article::inceptionYear,
                Collectors.flatMapping(allPairsInAnArticle, mostPublishedPairCollector)
            ));

        result.forEach((year, entry) ->
            System.out.println("Year " + year + ": Most published pair: " + entry.getKey() + " with " + entry.getValue() + " articles.")
        );
    }
}
```

Graças ao collector [`flatMapping()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#flatMapping\(java.util.function.Function,java.util.stream.Collector\)>), você pode escrever este código com um único collector, mesclando o [`flatMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#flatMap\(java.util.function.Function\)>) intermediário e o collector terminal. O código a seguir é equivalente ao anterior.

```java
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

// ... (Author, Article, PairOfAuthors records and allPairs function)

public class MostPublishedAuthorsPerYearSimplified {
    public static void main(String[] args) {
        List<Article> articles = List.of(
            new Article("Article 1", 2020, Set.of(new Author("A"), new Author("B"))),
            new Article("Article 2", 2020, Set.of(new Author("A"), new Author("C"))),
            new Article("Article 3", 2021, Set.of(new Author("B"), new Author("C"))),
            new Article("Article 4", 2021, Set.of(new Author("A"), new Author("B"), new Author("C")))
        );

        BiFunction<Article, Author, Stream<PairOfAuthors>> allPairs =
            (article, firstAuthor) -> article.authors().stream()
                .flatMap(secondAuthor -> PairOfAuthors.of(firstAuthor, secondAuthor).stream());

        Function<Article, Stream<PairOfAuthors>> allPairsInAnArticle =
            article -> article.authors().stream()
                .flatMap(firstAuthor -> allPairs.apply(article, firstAuthor));

        Collector<PairOfAuthors, ?, Map.Entry<PairOfAuthors, Long>> mostPublishedPairCollector =
            Collectors.collectingAndThen(
                Collectors.groupingBy(Function.identity(), Collectors.counting()),
                (map) -> map.entrySet().stream()
                    .max(Map.Entry.comparingByValue())
                    .orElseThrow()
            );

        Map<Integer, Map.Entry<PairOfAuthors, Long>> result = articles.stream()
            .collect(Collectors.groupingBy(
                Article::inceptionYear,
                Collectors.flatMapping(allPairsInAnArticle, mostPublishedPairCollector)
            ));

        result.forEach((year, entry) ->
            System.out.println("Year " + year + ": Most published pair: " + entry.getKey() + " with " + entry.getValue() + " articles.")
        );
    }
}
```

Encontrar os dois autores que mais publicaram, por ano, é apenas uma questão de passar este collector [`flatMapping()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#flatMapping\(java.util.function.Function,java.util.stream.Collector\)>) como um downstream collector para o [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function,java.util.stream.Collector\)>) correto.

```java
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

// ... (Author, Article, PairOfAuthors records and allPairs function)

public class MostPublishedAuthorsPerYearFinal {
    public static void main(String[] args) {
        List<Article> articles = List.of(
            new Article("Article 1", 2020, Set.of(new Author("A"), new Author("B"))),
            new Article("Article 2", 2020, Set.of(new Author("A"), new Author("C"))),
            new Article("Article 3", 2021, Set.of(new Author("B"), new Author("C"))),
            new Article("Article 4", 2021, Set.of(new Author("A"), new Author("B"), new Author("C")))
        );

        BiFunction<Article, Author, Stream<PairOfAuthors>> allPairs =
            (article, firstAuthor) -> article.authors().stream()
                .flatMap(secondAuthor -> PairOfAuthors.of(firstAuthor, secondAuthor).stream());

        Function<Article, Stream<PairOfAuthors>> allPairsInAnArticle =
            article -> article.authors().stream()
                .flatMap(firstAuthor -> allPairs.apply(article, firstAuthor));

        Collector<PairOfAuthors, ?, Map.Entry<PairOfAuthors, Long>> mostPublishedPairCollector =
            Collectors.collectingAndThen(
                Collectors.groupingBy(Function.identity(), Collectors.counting()),
                (map) -> map.entrySet().stream()
                    .max(Map.Entry.comparingByValue())
                    .orElseThrow()
            );

        Map<Integer, Map.Entry<PairOfAuthors, Long>> result = articles.stream()
            .collect(Collectors.groupingBy(
                Article::inceptionYear,
                Collectors.flatMapping(allPairsInAnArticle, mostPublishedPairCollector)
            ));

        result.forEach((year, entry) ->
            System.out.println("Year " + year + ": Most published pair: " + entry.getKey() + " with " + entry.getValue() + " articles.")
        );
    }
}
```

Você deve se lembrar que, no fundo deste collector [`flatMapping()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#flatMapping\(java.util.function.Function,java.util.stream.Collector\)>), há uma chamada para [`Optional.orElseThrow()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#orElseThrow\(\)>). Verificar se esta chamada poderia falhar era fácil no padrão anterior, porque ter um optional vazio neste ponto era bastante fácil de adivinhar.

Agora que usamos este collector como um downstream collector, a situação é diferente. Como você pode ter certeza de que, para cada ano, você tem pelo menos um artigo escrito por pelo menos dois autores? Seria mais seguro proteger este código contra qualquer [`NoSuchElementException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NoSuchElementException.html>).

### Evitando a Abertura de Optionals

O que poderia ser um padrão aceitável no primeiro contexto é muito mais perigoso agora. Lidar com isso consiste em não chamar [`orElseThrow()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#orElseThrow\(\)>) em primeiro lugar.

Nesse caso, o collector se torna o seguinte. Em vez de criar um par chave-valor de par de autores e um número long, ele envolve o resultado em um objeto optional.

```java
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collector;
import java.util.stream.Collectors;

// ... (Author, Article, PairOfAuthors records and allPairsInAnArticle function)

Collector<PairOfAuthors, ?, Optional<Map.Entry<PairOfAuthors, Long>>> mostPublishedPairCollectorSafe =
    Collectors.collectingAndThen(
        Collectors.groupingBy(Function.identity(), Collectors.counting()),
        (map) -> map.entrySet().stream()
            .max(Map.Entry.comparingByValue())
    );
```

Observe que o [`orElseThrow()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#orElseThrow\(\)>) não é mais chamado, levando assim a um optional na assinatura do collector.

```java
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collector;
import java.util.stream.Collectors;

// ... (Author, Article, PairOfAuthors records and allPairsInAnArticle function)

Collector<PairOfAuthors, ?, Optional<Map.Entry<PairOfAuthors, Long>>> mostPublishedPairCollectorSafe =
    Collectors.collectingAndThen(
        Collectors.groupingBy(Function.identity(), Collectors.counting()),
        (map) -> map.entrySet().stream()
            .max(Map.Entry.comparingByValue())
    );
```

Este optional também aparece na assinatura do collector [`flatMapping()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#flatMapping\(java.util.function.Function,java.util.stream.Collector\)>).

```java
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

// ... (Author, Article, PairOfAuthors records and allPairs function)

public class MostPublishedAuthorsPerYearSafe {
    public static void main(String[] args) {
        List<Article> articles = List.of(
            new Article("Article 1", 2020, Set.of(new Author("A"), new Author("B"))),
            new Article("Article 2", 2020, Set.of(new Author("A"), new Author("C"))),
            new Article("Article 3", 2021, Set.of(new Author("B"), new Author("C"))),
            new Article("Article 4", 2021, Set.of(new Author("A"), new Author("B"), new Author("C")))
        );

        BiFunction<Article, Author, Stream<PairOfAuthors>> allPairs =
            (article, firstAuthor) -> article.authors().stream()
                .flatMap(secondAuthor -> PairOfAuthors.of(firstAuthor, secondAuthor).stream());

        Function<Article, Stream<PairOfAuthors>> allPairsInAnArticle =
            article -> article.authors().stream()
                .flatMap(firstAuthor -> allPairs.apply(article, firstAuthor));

        Collector<PairOfAuthors, ?, Optional<Map.Entry<PairOfAuthors, Long>>> mostPublishedPairCollectorSafe =
            Collectors.collectingAndThen(
                Collectors.groupingBy(Function.identity(), Collectors.counting()),
                (map) -> map.entrySet().stream()
                    .max(Map.Entry.comparingByValue())
            );

        Map<Integer, Optional<Map.Entry<PairOfAuthors, Long>>> result = articles.stream()
            .collect(Collectors.groupingBy(
                Article::inceptionYear,
                Collectors.flatMapping(allPairsInAnArticle, mostPublishedPairCollectorSafe)
            ));

        result.forEach((year, optionalEntry) ->
            optionalEntry.ifPresentOrElse(
                entry -> System.out.println("Year " + year + ": Most published pair: " + entry.getKey() + " with " + entry.getValue() + " articles."),
                () -> System.out.println("Year " + year + ": No pairs found.")
            )
        );
    }
}
```

Usar este collector para criar o mapa do par de autores por ano cria um mapa do tipo [`Map<Integer, Optional<Map.Entry<PairOfAuthors, Long>>>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>), um tipo que não precisamos: ter um mapa em que os valores são optionals vazios é inútil e talvez custoso. É um antipadrão. Infelizmente, não há como adivinhar que este optional estará vazio antes de calcular este valor máximo.

Uma vez que este mapa intermediário é construído, você precisa se livrar dos optionals vazios para construir o mapa que representa o histograma que você precisa. Vamos usar a mesma técnica de antes: chamar o método [`stream()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#stream\(\)>) nos objetos optional em um [`flatMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#flatMap\(java.util.function.Function\)>) para que a operação [`flatMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#flatMap\(java.util.function.Function\)>) remova silenciosamente os optionals vazios.

O padrão é o seguinte.

```java
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

// ... (previous code for result map)

Map<Integer, Map.Entry<PairOfAuthors, Long>> finalResult = result.entrySet().stream()
    .flatMap(entry -> entry.getValue().map(
        pairCountEntry -> Map.entry(entry.getKey(), pairCountEntry)
    ).stream())
    .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
```

Observe a função flatmap neste padrão. Ela recebe uma `entry`, cujo valor é do tipo [`Optional<Map.Entry<PairOfAuthors, Long>>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>) como argumento, e chama [`map()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#map\(java.util.function.Function\)>) neste optional.

Se o optional estiver vazio, esta chamada retorna um optional vazio. A função de mapeamento é então ignorada. A próxima chamada para [`stream()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#stream\(\)>) então retorna um stream vazio, que será removido do stream principal porque estamos em uma chamada [`flatMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#flatMap\(java.util.function.Function\)>).

Se houver um valor no optional, então a função de mapeamento é chamada com este valor. Esta função de mapeamento cria um novo par chave-valor com a mesma chave e este valor existente. Este par chave-valor é do tipo [`Map.Entry<PairOfAuthors, Long>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.Entry.html>), e é envolvido em um objeto optional por este método [`map()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#map\(java.util.function.Function\)>). A chamada para [`stream()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#stream\(\)>) cria um stream com o conteúdo deste optional, que é então aberto pela chamada [`flatMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#flatMap\(java.util.function.Function\)>).

Este padrão mapeia um [`Stream<Map.Entry<Integer, Optional<Map.Entry<PairOfAuthors, Long>>>>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>) com optionals vazios para um [`Stream<Map.Entry<Integer, Map.Entry<PairOfAuthors, Long>>>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>), removendo todos os pares chave/valor que tinham optionals vazios.

Recriar o mapa pode ser feito com segurança com um collector [`toMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toMap\(java.util.function.Function,java.util.function.Function\)>), porque você sabe que não pode ter a mesma chave duas vezes neste stream.

```java
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

// ... (Author, Article, PairOfAuthors records and allPairs function)

public class MostPublishedAuthorsPerYearFiltered {
    public static void main(String[] args) {
        List<Article> articles = List.of(
            new Article("Article 1", 2020, Set.of(new Author("A"), new Author("B"))),
            new Article("Article 2", 2020, Set.of(new Author("A"), new Author("C"))),
            new Article("Article 3", 2021, Set.of(new Author("B"), new Author("C"))),
            new Article("Article 4", 2021, Set.of(new Author("A"), new Author("B"), new Author("C"))),
            new Article("Article 5", 2022, Set.of(new Author("X"))) // Article with only one author
        );

        BiFunction<Article, Author, Stream<PairOfAuthors>> allPairs =
            (article, firstAuthor) -> article.authors().stream()
                .flatMap(secondAuthor -> PairOfAuthors.of(firstAuthor, secondAuthor).stream());

        Function<Article, Stream<PairOfAuthors>> allPairsInAnArticle =
            article -> article.authors().stream()
                .flatMap(firstAuthor -> allPairs.apply(article, firstAuthor));

        Collector<PairOfAuthors, ?, Optional<Map.Entry<PairOfAuthors, Long>>> mostPublishedPairCollectorSafe =
            Collectors.collectingAndThen(
                Collectors.groupingBy(Function.identity(), Collectors.counting()),
                (map) -> map.entrySet().stream()
                    .max(Map.Entry.comparingByValue())
            );

        Map<Integer, Optional<Map.Entry<PairOfAuthors, Long>>> intermediateResult = articles.stream()
            .collect(Collectors.groupingBy(
                Article::inceptionYear,
                Collectors.flatMapping(allPairsInAnArticle, mostPublishedPairCollectorSafe)
            ));

        Map<Integer, Map.Entry<PairOfAuthors, Long>> finalResult = intermediateResult.entrySet().stream()
            .flatMap(entry -> entry.getValue().map(
                pairCountEntry -> Map.entry(entry.getKey(), pairCountEntry)
            ).stream())
            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

        finalResult.forEach((year, entry) ->
            System.out.println("Year " + year + ": Most published pair: " + entry.getKey() + " with " + entry.getValue() + " articles.")
        );
    }
}
```

Você pode ver este padrão em ação no exemplo a seguir.

```java
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

// Records Author, Article, PairOfAuthors as defined previously

public class MostPublishedAuthorsPerYearFilteredExample {
    public static void main(String[] args) {
        List<Article> articles = List.of(
            new Article("Article 1", 2020, Set.of(new Author("A"), new Author("B"))),
            new Article("Article 2", 2020, Set.of(new Author("A"), new Author("C"))),
            new Article("Article 3", 2021, Set.of(new Author("B"), new Author("C"))),
            new Article("Article 4", 2021, Set.of(new Author("A"), new Author("B"), new Author("C"))),
            new Article("Article 5", 2022, Set.of(new Author("X"))) // Article with only one author
        );

        BiFunction<Article, Author, Stream<PairOfAuthors>> allPairs =
            (article, firstAuthor) -> article.authors().stream()
                .flatMap(secondAuthor -> PairOfAuthors.of(firstAuthor, secondAuthor).stream());

        Function<Article, Stream<PairOfAuthors>> allPairsInAnArticle =
            article -> article.authors().stream()
                .flatMap(firstAuthor -> allPairs.apply(article, firstAuthor));

        Collector<PairOfAuthors, ?, Optional<Map.Entry<PairOfAuthors, Long>>> mostPublishedPairCollectorSafe =
            Collectors.collectingAndThen(
                Collectors.groupingBy(Function.identity(), Collectors.counting()),
                (map) -> map.entrySet().stream()
                    .max(Map.Entry.comparingByValue())
            );

        Map<Integer, Optional<Map.Entry<PairOfAuthors, Long>>> intermediateResult = articles.stream()
            .collect(Collectors.groupingBy(
                Article::inceptionYear,
                Collectors.flatMapping(allPairsInAnArticle, mostPublishedPairCollectorSafe)
            ));

        Map<Integer, Map.Entry<PairOfAuthors, Long>> finalResult = intermediateResult.entrySet().stream()
            .flatMap(entry -> entry.getValue().map(
                pairCountEntry -> Map.entry(entry.getKey(), pairCountEntry)
            ).stream())
            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

        finalResult.forEach((year, entry) ->
            System.out.println("Year " + year + ": Most published pair: " + entry.getKey() + " with " + entry.getValue() + " articles.")
        );
    }
}
```

Executar o código anterior imprime o seguinte. Você pode ver que os optionals vazios foram removidos do mapa resultante.

```
Year 2020: Most published pair: PairOfAuthors[firstAuthor=Author[name=A], secondAuthor=Author[name=B]] with 1 articles.
Year 2021: Most published pair: PairOfAuthors[firstAuthor=Author[name=A], secondAuthor=Author[name=B]] with 1 articles.
```

Este padrão usa três pontos importantes da Stream API e dos optionals.

1.  O método [`Optional.map()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#map\(java.util.function.Function\)>) que retorna um optional vazio se for chamado em um optional vazio.
2.  O método [`Optional.stream()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#stream\(\)>) que abre um stream no conteúdo de um optional. Se o optional estiver vazio, então o stream retornado também estará vazio. Ele permite que você se mova do espaço optional para o espaço stream de forma transparente.
3.  O método [`Stream.flatMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#flatMap\(java.util.function.Function\)>) que abre os streams construídos a partir dos optionals, removendo silenciosamente os streams vazios.
## Consumindo o Conteúdo de um Optional

A classe [`Optional`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html>) também possui dois métodos que recebem um consumer como argumento.

  * [`ifPresent(Consumer consumer)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#ifPresent\(java.util.function.Consumer\)>): este método chama o consumer fornecido com o conteúdo deste optional, se houver. É de fato equivalente ao método [`Stream.forEach(Consumer)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#forEach\(java.util.function.Consumer\)>).
  * [`ifPresentOrElse(Consumer consumer, Runnable runnable)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#ifPresentOrElse\(java.util.function.Consumer,java.lang.Runnable\)>): este método faz o mesmo que o anterior se o optional não estiver vazio. Se estiver, então ele chama a instância fornecida de [`Runnable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Runnable.html>).

## Estabelecendo Algumas Regras para Usar Optionals Corretamente

**Regra #1** Nunca use null para uma variável optional ou valor retornado.

**Regra #2** Nunca chame [`orElseThrow()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#orElseThrow\(\)>) ou [`get()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#get\(\)>) a menos que você tenha certeza de que o optional não está vazio.

**Regra #3** Prefira alternativas a [`ifPresent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#ifPresent\(java.util.function.Consumer\)>), [`orElseThrow()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#orElseThrow\(\)>) ou [`get()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#get\(\)>).

**Regra #4** Não crie um optional para evitar testar a nulidade de uma referência.

**Regra #5** Não use optional em campos, parâmetros de método, coleções e mapas.

**Regra #6** Não use operações sensíveis à identidade em um objeto optional, como igualdade de referência, hash code de identidade e sincronização.

**Regra #7** Não se esqueça de que objetos optional não são serializáveis.

### Neste tutorial

Métodos de Suporte Que Nem Sempre Podem Produzir um Resultado Criando Objetos Optional Abrindo um Objeto Optional Processando um Objeto Optional Consumindo o Conteúdo de um Optional Estabelecendo Algumas Regras para Usar Optionals Corretamente

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Implementing the Collector Interface](<#/doc/tutorials/api/streams/collector-interface>)

➜

**Tutorial Atual**

Usando Optionals

➜

**Próximo na Série**

[Parallelizing Streams](<#/doc/tutorials/api/streams/parallel-streams>)

**Anterior na Série:** [Implementing the Collector Interface](<#/doc/tutorials/api/streams/collector-interface>)

**Próximo na Série:** [Parallelizing Streams](<#/doc/tutorials/api/streams/parallel-streams>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A Stream API ](<#/doc/tutorials/api/streams>) > Usando Optionals