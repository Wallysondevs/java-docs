# Adicionando Operações Intermediárias a um Stream

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Stream ](<#/doc/tutorials/api/streams>) > Adicionando Operações Intermediárias a um Stream

**Anterior na Série**

[Processando Dados em Memória Usando a API Stream](<#/doc/tutorials/api/streams/map-filter-reduce>)

➜

**Tutorial Atual**

Adicionando Operações Intermediárias a um Stream

➜

**Próximo na Série**

[Criando Streams](<#/doc/tutorials/api/streams/creating>)

**Anterior na Série:** [Processando Dados em Memória Usando a API Stream](<#/doc/tutorials/api/streams/map-filter-reduce>)

**Próximo na Série:** [Criando Streams](<#/doc/tutorials/api/streams/creating>)

# Adicionando Operações Intermediárias a um Stream

## Mapeando um Stream para Outro Stream

Mapear um stream consiste em transformar seus elementos usando uma function. Essa transformação pode alterar os types dos elementos processados por esse stream, mas você também pode transformá-los sem alterar seu type.

Você pode mapear um stream para outro stream com o método [`map()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#map\(java.util.function.Function\)>), que recebe uma [`Function`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html>) como argumento. Mapear um stream significa que todos os elementos processados por esse stream serão transformados usando essa function.

O padrão de código é o seguinte:

```java
import java.util.List;
import java.util.stream.Stream;

public class Mapping {
  public static void main(String[] args) {
    List<String> list = List.of("A", "B", "C");
    Stream<Integer> stream = list.stream()
                                 .map(String::length);
  }
}
```

Você pode executar este código em seu browser, ou copiá-lo e colá-lo em sua IDE para executá-lo. Você não verá nada, e pode estar se perguntando o porquê.

A resposta é, na verdade, simples: não há nenhuma terminal operation definida nesse stream. Seu reflexo deveria ser notar isso e perceber que este código não faz nada. Ele não processa nenhum data. Para responder à pergunta: "O que este código está fazendo?", há apenas uma resposta válida: "Nada".

Vamos adicionar uma terminal operation muito útil, que coloca os elementos processados em uma list: `toList()`. Se você não tem certeza sobre o que este código realmente faz, não se preocupe; abordaremos isso mais tarde neste tutorial. O código se torna o seguinte.

```java
import java.util.List;
import java.util.stream.Stream;

public class Mapping {
  public static void main(String[] args) {
    List<String> list = List.of("A", "BB", "CCC");
    List<Integer> lengths = list.stream()
                                .map(String::length)
                                .toList();
    System.out.println(lengths);
  }
}
```

A execução deste código imprime o seguinte:

```
[1, 2, 3]
```

Você pode ver que este padrão cria um [`Stream<Integer>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>), retornado por [`map(String::length)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#map\(java.util.function.Function\)>). Você também pode torná-lo um [`IntStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html>) especializado chamando [`mapToInt()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#mapToInt\(java.util.function.ToIntFunction\)>) em vez da chamada regular [`map()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#map\(java.util.function.Function\)>). Este método [`mapToInt()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#mapToInt\(java.util.function.ToIntFunction\)>) recebe um [`ToIntFunction<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/ToIntFunction.html>) como argumento. Alterar `.map(String::length)` para `.mapToInt(String::length)` no exemplo anterior não cria um erro de compilador. A method reference `String::length` pode ser de ambos os types: [`Function<String, Integer>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html>) e [`ToIntFunction<String>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/ToIntFunction.html>).

Em vez de chamar [`toList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#toList\(\)>), agora chamamos [`summaryStatistics()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#summaryStatistics\(\)>). Este método é muito útil e está disponível apenas nesses streams especializados de primitive types.

```java
import java.util.IntSummaryStatistics;
import java.util.List;

public class Mapping {
  public static void main(String[] args) {
    List<String> list = List.of("A", "BB", "CCC");
    IntSummaryStatistics summaryStatistics = list.stream()
                                                 .mapToInt(String::length)
                                                 .summaryStatistics();
    System.out.println(summaryStatistics);
  }
}
```

O resultado é o seguinte:

```
IntSummaryStatistics{count=3, sum=6, min=1, average=2.000000, max=3}
```

Existem três métodos para ir de [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>) para um stream de primitive type: [`mapToInt()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#mapToInt\(java.util.function.ToIntFunction\)>), [`mapToLong()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#mapToLong\(java.util.function.ToLongFunction\)>) e [`mapToDouble()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#mapToDouble\(java.util.function.ToDoubleFunction\)>).

## Filtrando um Stream

Filtrar consiste em descartar alguns elementos processados por um stream com um predicate. Este método está disponível em streams de objects e streams de primitive types.

Suponha que você precise contar as strings de characters de comprimento 3. Você pode escrever este código para fazer isso:

```java
import java.util.List;

public class Filtering {
  public static void main(String[] args) {
    List<String> list = List.of("A", "BB", "CCC", "DDDD", "EEE");
    long numberOfStringsOfLength3 = list.stream()
                                        .filter(s -> s.length() == 3)
                                        .count();
    System.out.println(numberOfStringsOfLength3);
  }
}
```

A execução deste código produz o seguinte:

```
2
```

Observe que você acabou de usar outra terminal operation da Stream API, [`count()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#count\(\)>), que apenas conta o número de elementos processados. Este método retorna um `long`, então você pode contar muitos elementos com ele. Mais do que você pode colocar em um [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>).

## Flatmapping um Stream para Lidar com Relações 1:p

Vamos ver a operação [`flatMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#flatMap\(java.util.function.Function\)>) em um exemplo.

Suponha que seu código esteja processando uma list de countries, e em algum momento você precise contar a population de todas as cities. `City` e `Country` são dois records, e uma instance de `Country` tem uma reference para uma list de instances de `City`.

Você pode escrever o seguinte código:

```java
import java.util.List;

public class FlatMapping {
  record City(String name, long population) {}
  record Country(String name, List<City> cities) {}

  public static void main(String[] args) {
    List<Country> countries = List.of(
        new Country("France", List.of(new City("Paris", 2_141_000), new City("Marseille", 861_635))),
        new Country("USA", List.of(new City("New York", 8_399_000), new City("Los Angeles", 3_990_000))),
        new Country("Japan", List.of(new City("Tokyo", 13_960_000), new City("Osaka", 2_750_000)))
    );

    long totalPopulation = 0;
    for (Country country : countries) {
      for (City city : country.cities()) {
        totalPopulation += city.population();
      }
    }
    System.out.println(totalPopulation);
  }
}
```

O resultado que você obtém é o seguinte.

```
32101635
```

O inner loop deste código é uma forma de map-reduce que você pode escrever com o seguinte stream (você pode copiar este código e colá-lo no exemplo anterior e executá-lo novamente):

```java
    long totalPopulation = countries.stream()
                                    .map(Country::cities)
                                    .map(cities -> cities.stream()
                                                         .mapToLong(City::population)
                                                         .sum())
                                    .mapToLong(Long::longValue)
                                    .sum();
```

A conexão entre o loop nos countries e este stream não se encaixa bem no padrão map-reduce, e colocar um stream em um loop não é um padrão de código muito agradável.

Este é precisamente o papel do flatmap operator. Este operator abre relações one-to-many entre objects e cria streams nessas relações. O método [`flatMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#flatMap\(java.util.function.Function\)>) recebe uma special function como argumento que retorna um object [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>). A relationship entre uma dada class e outra class é definida por esta function.

No caso do nosso exemplo, esta function é simples porque há uma `List<City>` na class `Country`. Então você pode escrevê-la da seguinte forma.

```java
    Function<Country, Stream<City>> getCities = country -> country.cities().stream();
```

Esta list não é mandatory. Suponha que você tenha uma class `Continent` que contém um [`Map<String, Country>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>), onde as keys são os country codes dos countries (CAN para Canada, MEX para Mexico, FRA para France, e assim por diante). Suponha que o record `Continent` tenha um component `countries` que é este map.

Nesse caso, esta function poderia ser escrita desta forma.

```java
    Function<Continent, Stream<Country>> getCountries = continent -> continent.countries().values().stream();
```

O método [`flatMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#flatMap\(java.util.function.Function\)>) processa um stream em duas etapas.

*   A primeira etapa consiste no mapping de todos os elementos do stream com esta function. De um `Stream<Country>` ele cria um `Stream<Stream<City>>`, porque cada country é mapeado para um stream de cities.
*   A segunda etapa consiste em achatar o stream de streams que é produzido. Em vez de ter um stream de streams de cities (um stream para cada country), você acaba com um single stream, com todas as cities de todos os countries nele.

Então o código escrito com um padrão de for loop aninhado pode se tornar o seguinte, graças ao flatmap operator.

```java
import java.util.List;
import java.util.function.Function;
import java.util.stream.Stream;

public class FlatMapping {
  record City(String name, long population) {}
  record Country(String name, List<City> cities) {}

  public static void main(String[] args) {
    List<Country> countries = List.of(
        new Country("France", List.of(new City("Paris", 2_141_000), new City("Marseille", 861_635))),
        new Country("USA", List.of(new City("New York", 8_399_000), new City("Los Angeles", 3_990_000))),
        new Country("Japan", List.of(new City("Tokyo", 13_960_000), new City("Osaka", 2_750_000)))
    );

    long totalPopulation = countries.stream()
                                    .flatMap(country -> country.cities().stream())
                                    .mapToLong(City::population)
                                    .sum();
    System.out.println(totalPopulation);
  }
}
```

O resultado é o mesmo de anteriormente, e o seguinte.

```
32101635
```

## Usando Flatmap e MapMulti para Validar a Transformação de Elementos

A operação [`flatMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#flatMap\(java.util.function.Function\)>) pode ser usada para validar a transformação dos elementos do seu stream.

Suponha que você tenha um stream de strings de characters, que representam integers. Você precisa convertê-los para integers usando [`Integer.parseInt()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#parseInt\(java.lang.String\)>). Infelizmente, algumas dessas strings estão corrupted: talvez algumas estejam empty, null, ou tenham extra blank characters no final delas. Tudo isso fará com que o parsing falhe com uma [`NumberFormatException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NumberFormatException.html>). Claro, você pode tentar filtrar este stream para remover as buggy strings com predicates, mas a maneira mais segura de fazer isso é usar um padrão try-catch.

Tentar usar um filter não é o caminho certo. O predicate que você vai escrever se parecerá com o seguinte.

```java
    Predicate<String> isParsable = s -> {
      try {
        Integer.parseInt(s);
        return true;
      } catch (NumberFormatException e) {
        return false;
      }
    };
```

A primeira falha é que você precisa realmente fazer a conversion para ver se está funcionando ou não. Então você terá que fazê-lo novamente em sua mapping function, que será executada em seguida: não faça isso!

A segunda falha é que nunca é uma boa ideia retornar de um catch block.

O que você realmente precisa fazer é retornar um integer quando você tem um integer adequado nesta string e nada se for uma corrupted string. Isso pode ser feito com um flatmapper. No caso de sua string de characters representar um integer, você retorna um stream com o result. No outro caso, você pode retornar um empty stream.

Você pode então escrever a seguinte function.

```java
import java.util.List;
import java.util.function.Function;
import java.util.stream.Stream;

public class FlatMappingValidation {
  public static void main(String[] args) {
    List<String> list = List.of("1", "2", "3", "A", "4", "5", "B", "6");

    Function<String, Stream<Integer>> flatMapper = s -> {
      try {
        return Stream.of(Integer.parseInt(s));
      } catch (NumberFormatException e) {
        return Stream.empty();
      }
    };

    List<Integer> integers = list.stream()
                                 .flatMap(flatMapper)
                                 .toList();
    System.out.println(integers);
  }
}
```

A execução deste código produz o seguinte result. Todas as faulty strings foram silenciosamente removidas.

```
[1, 2, 3, 4, 5, 6]
```

Este uso do flatmap code funciona bem, mas tem um overhead: há um stream criado para cada elemento do stream que você precisa processar. A partir do Java SE 16, um método foi adicionado à Stream API, exatamente para gerenciar este case. Este método é chamado [`mapMulti()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#mapMulti\(java.util.function.BiConsumer\)>) e recebe um [`BiConsumer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiConsumer.html>) como argumento.

Este [`BiConsumer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiConsumer.html>) consome dois argumentos:

*   O elemento do stream que precisa ser mapped
*   Um [`Consumer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Consumer.html>) que este [`BiConsumer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiConsumer.html>) precisa chamar com o result do mapping

Chamar o consumer com um elemento adiciona esse elemento ao resulting stream. Caso o mapping não possa ser feito, o biconsumer não chama este consumer, e nenhum elemento será adicionado.

Vamos reescrever seu padrão com este método [`mapMulti()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#mapMulti\(java.util.function.BiConsumer\)>).

```java
import java.util.List;

public class MapMultiValidation {
  public static void main(String[] args) {
    List<String> list = List.of("1", "2", "3", "A", "4", "5", "B", "6");

    List<Integer> integers = list.stream()
                                 .<Integer>mapMulti((s, consumer) -> {
                                   try {
                                     consumer.accept(Integer.parseInt(s));
                                   } catch (NumberFormatException e) {
                                     // do nothing
                                   }
                                 })
                                 .toList();
    System.out.println(integers);
  }
}
```

A execução deste código produz o mesmo result de antes. Todas as faulty strings foram silenciosamente removidas, mas desta vez, nenhum outro stream foi criado.

Para usar este método, você precisa informar ao compiler o type do [`Consumer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Consumer.html>) usado para adicionar elementos ao resulting stream.

Isso pode ser feito de duas maneiras.

1.  Você pode dar um explicit type aos argumentos do [`BiConsumer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiConsumer.html>) que você passa para [`mapMulti()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#mapMulti\(java.util.function.BiConsumer\)>). Esta é provavelmente a maneira mais fácil de usar este método.
2.  Mas você também pode usar esta special syntax onde você coloca este type antes de chamar [`mapMulti()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#mapMulti\(java.util.function.BiConsumer\)>). Não é uma syntax que você vê com muita frequência em Java code. Você pode usá-lo em um static e nonstatic context.

Se você omitir a fixação deste type, então, porque o compiler não pode inferir o type do stream retornado pela chamada `mapMulti()`, ele assume que é `Stream<Object>`.

## Removendo Duplicatas e Ordenando um Stream

A Stream API possui dois métodos, [`distinct()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#distinct\(\)>) e [`sorted()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#sorted\(\)>), que simplesmente detectarão e removerão duplicatas e ordenarão os elementos do seu stream. O método [`distinct()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#distinct\(\)>) usa os métodos [`hashCode()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#hashCode\(\)>) e [`equals()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#equals\(java.lang.Object\)>) para identificar as duplicatas. O método [`sorted()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#sorted\(\)>) tem um overload que recebe um comparator, que será usado para comparar e ordenar os elementos do seu stream. Se você não fornecer um comparator, a Stream API assume que os elementos do seu stream são comparable. Se não forem, uma [`ClassCastException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ClassCastException.html>) é lançada.

Você deve se lembrar da parte anterior deste tutorial que um stream é suposto ser um empty object que não armazena nenhum data. Existem várias exceptions a esta rule, e estes dois métodos pertencem a elas.

De fato, para identificar duplicatas, o método [`distinct()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#distinct\(\)>) precisa armazenar os elementos do seu stream. Ele faz isso em um [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) interno. Quando ele processa um elemento, ele o adiciona a este set. Se a adição funcionou, significando que o elemento não estava no set antes, ele o empurra imediatamente para o downstream.

O mesmo vale para o método [`sorted()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#sorted\(\)>). Este método precisa armazenar todos os seus elementos e então ordená-los em um internal buffer antes de enviá-los para a próxima etapa do seu processing pipeline.

Aqui estão dois exemplos desses métodos em ação. Neste primeiro exemplo, você pode ver como [`distinct()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#distinct\(\)>) está funcionando.

```java
import java.util.List;

public class Distinct {
  public static void main(String[] args) {
    List<String> list = List.of("A", "BB", "A", "CCC", "BB", "DDDD", "EEE", "CCC");
    List<String> distinctStrings = list.stream()
                                       .distinct()
                                       .toList();
    System.out.println(distinctStrings);
  }
}
```

O result é o seguinte.

```
[A, BB, CCC, DDDD, EEE]
```

Neste segundo exemplo, você pode ver [`sorted()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#sorted\(\)>) em ação, no case em que você passa comparable objects (strings de characters), com ou sem um comparator.

```java
import java.util.Comparator;
import java.util.List;

public class Sorted {
  public static void main(String[] args) {
    List<String> list = List.of("A", "BB", "A", "CCC", "BB", "DDDD", "EEE", "CCC");
    List<String> sortedStrings = list.stream()
                                     .sorted()
                                     .toList();
    System.out.println(sortedStrings);

    List<String> sortedStringsByLength = list.stream()
                                             .sorted(Comparator.comparing(String::length))
                                             .toList();
    System.out.println(sortedStringsByLength);
  }
}
```

O result é o seguinte.

```
[A, A, BB, BB, CCC, CCC, DDDD, EEE]
[A, A, BB, BB, CCC, CCC, DDDD, EEE]
```

O método [`distinct()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#distinct\(\)>) pode ser usado em unbounded (infinite) streams, o método [`sorted()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#sorted\(\)>) não pode.

Você pode usar o método [`distinct()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#distinct\(\)>) em unbounded streams, que produzirão um unlimited number de objects, desde que seu stream interrompa os elementos produzidos por [`distinct()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#distinct\(\)>), como você pode ver no seguinte exemplo.

```java
import java.util.List;
import java.util.stream.Stream;

public class DistinctUnbounded {
  public static void main(String[] args) {
    Stream<String> stream = Stream.generate(() -> "A")
                                  .distinct()
                                  .limit(5);
    List<String> list = stream.toList();
    System.out.println(list);
  }
}
```

Você pode executar este código, que produz o seguinte result. Ele está funcionando porque [`distinct()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#distinct\(\)>) empurra os distinct elements à medida que os descobre, antes que sua source termine de produzir todos os seus elementos.

```
[A]
```

Não é o case para [`sorted()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#sorted\(\)>), que precisa ver todos os elementos produzidos antes de produzi-los. Então o seguinte código falha em produzir qualquer result.

```java
import java.util.stream.Stream;

public class SortedUnbounded {
  public static void main(String[] args) {
    Stream<String> stream = Stream.generate(() -> "A")
                                  .sorted()
                                  .limit(5);
    // This code will hang because sorted() needs to see all elements
    // before it can produce any.
    // stream.toList();
  }
}
```

## Limitando e Pulando os Elementos de um Stream

A Stream API oferece duas maneiras de selecionar os elementos de um stream: com base em seu index, ou com um predicate.

A primeira maneira é usar os métodos [`skip()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#skip\(long\)>) e [`limit()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#limit\(long\)>), ambos recebem um `long` como argumento. Há uma pequena trap para evitar ao usar esses métodos. Você precisa ter em mente que toda vez que um intermediate method é chamado em um stream, um new stream é criado. Então, se você chamar [`limit()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#limit\(long\)>) depois de [`skip()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#skip\(long\)>), não se esqueça de contar seus elementos começando nesse new stream.

Suponha que você tenha um stream de todos os integers, começando em 1. Você precisa selecionar os integers entre 3 e 8 em um stream de integers. Você pode ser tentado a chamar `skip(2).limit(8)`, passando o bound calculado no first stream. Infelizmente, não é assim que os streams funcionam. A segunda chamada `limit(8)` opera em um stream que começa em 3, então ela selecionará os integers até 11, o que não é o que você precisa. O código correto é o seguinte.

```java
import java.util.List;
import java.util.stream.Stream;

public class SkipLimit {
  public static void main(String[] args) {
    List<Integer> integers = Stream.iterate(1, i -> i + 1)
                                   .skip(2)
                                   .limit(5)
                                   .toList();
    System.out.println(integers);
  }
}
```

Este código imprime o seguinte.

```
[3, 4, 5, 6, 7]
```

É importante entender que `skip(2)` foi chamado em um stream que processa os elementos `1, 2, 3, ...`, e produz outro stream que processa os elementos `3, 4, 5, 6, ...`.

Então `limit(5)` seleciona os first 5 elementos desse stream, ou seja, `3, 4, 5, 6, 7`.

O Java SE 9 viu a introdução de mais dois métodos neste campo. Em vez de pular e limitar os elementos com base em seu index no stream, ele faz isso com base no value de um predicate.

*   [`dropWhile(predicate)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#dropWhile\(java.util.function.Predicate\)>) descarta os elementos processados pelo stream até que a aplicação do predicate nesses elementos se torne false. Nesse ponto, todos os elementos processados por esse stream são transmitidos para o following stream.
*   [`takeWhile(predicate)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#takeWhile\(java.util.function.Predicate\)>) faz o contrário: ele transmite os elementos para o next stream até que a aplicação deste predicate nesses elementos se torne false.

Observe que esses métodos funcionam como doors. Uma vez que [`dropWhile()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#dropWhile\(java.util.function.Predicate\)>) abriu a door para deixar os elementos processados fluírem, ela não a fechará. Uma vez que [`takeWhile()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#takeWhile\(java.util.function.Predicate\)>) fechou a door, ela não pode reabri-la: nenhum outro elemento será enviado para a next operation.

Observe também que esses métodos só fazem sentido em streams [`ORDERED`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#ORDERED>). Se você os usar em um stream que não é [`ORDERED`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#ORDERED>), então o next stream pode receber qualquer subset de elementos do upstream.
## Concatenando Streams

A Stream API oferece vários padrões para concatenar vários streams em um só. A forma mais óbvia é usar um método de fábrica definido na interface [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>): [`concat()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#concat\(java.util.stream.Stream,java.util.stream.Stream\)>).

Este método recebe dois streams e produz um stream com os elementos produzidos pelo primeiro stream, seguidos pelos elementos do segundo stream.

Você pode estar se perguntando por que este método não aceita um vararg para permitir a concatenação de qualquer número de streams.

A razão é que usar este método é aceitável desde que você tenha dois streams para unir. Se você tiver mais de dois, a documentação da API JavaDoc aconselha a usar outro padrão, baseado no uso de flatmap.

Vamos ver como isso funciona em um exemplo.

A execução deste código produz o seguinte resultado:

A razão pela qual é melhor usar a abordagem [`flatMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#flatMap\(java.util.function.Function\)>) é que [`concat()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#concat\(java.util.stream.Stream,java.util.stream.Stream\)>) cria streams intermediários durante a concatenação. Quando você usa [`Stream.concat()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#concat\(java.util.stream.Stream,java.util.stream.Stream\)>), um novo stream é criado para concatenar seus dois streams. Se você precisar concatenar três streams, acabará criando um primeiro stream para lidar com a primeira concatenação e um segundo para a segunda concatenação. Assim, cada concatenação requer um stream que será descartado ao final da operação.

Com o padrão flatmap, você apenas cria um único stream para conter todos os seus streams e faz o flatmap. A sobrecarga é muito menor.

Você pode estar se perguntando por que esses dois padrões foram adicionados. Parece que [`concat()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#concat\(java.util.stream.Stream,java.util.stream.Stream\)>) não é realmente útil. Na verdade, existe uma diferença sutil entre o stream produzido pelos padrões concat e flatmap.

Se o tamanho da origem dos dois streams que você está concatenando é conhecido, então o tamanho do stream resultante também é conhecido. Na verdade, é simplesmente a soma dos dois streams concatenados.

Usar flatmap em um stream pode criar um número desconhecido de elementos a serem processados no stream resultante. A Stream API perde o controle do número de elementos que serão processados no stream resultante.

Em outras palavras: concat produz um stream [`SIZED`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SIZED>), enquanto flatmap não. Esta propriedade [`SIZED`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#SIZED>) é uma propriedade que um stream pode ter, e será abordada mais tarde neste tutorial.

## Depurando Streams

Às vezes, pode ser conveniente examinar os elementos processados por um stream em tempo de execução. A Stream API possui um método para isso: o método [`peek()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#peek\(java.util.function.Consumer\)>). Este método destina-se a ser usado para depurar seu pipeline de processamento de dados. Você não deve usar este método em seu código de produção.

> Você deve absolutamente se abster de usar o método peek() para realizar efeitos colaterais em sua aplicação.

Este método recebe um consumer como argumento que será invocado pela API em cada elemento do stream. Vamos ver este método em ação.

Se você executar este código, verá o seguinte em seu console.

Vamos analisar esta saída.

1.  O primeiro elemento a ser processado é _one_. Você pode ver que ele foi filtrado.
2.  O segundo é _two_. Este elemento passou pelo filtro e então foi mapeado para maiúsculas. Ele é então adicionado à lista de resultados.
3.  O terceiro é _three_, que também passa pelo filtro e também é mapeado para maiúsculas antes de ser adicionado à lista de resultados.
4.  O quarto e último é _four_, que é rejeitado pela etapa de filtragem.

Há um ponto que você viu anteriormente neste tutorial e que agora aparece claramente: um stream processa todos os elementos que precisa processar um por um, do início ao fim do stream. Isso foi mencionado antes, e agora você pode vê-lo em ação.

Você pode ver que este padrão `peek(IO::println)` é muito útil para acompanhar os elementos processados pelo seu stream um por um, sem precisar depurar seu código. Depurar um stream é difícil porque você precisa ter cuidado onde coloca seus breakpoints. Na maioria das vezes, colocar breakpoints em um processamento de stream o levará à implementação da interface [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>). Isso não é o que você precisa. Na maioria das vezes, você precisa colocar esses breakpoints no código de suas expressões lambda.

### Neste tutorial

Mapeando um Stream para Outro Stream
Filtrando um Stream
Flatmapping um Stream para Lidar com 1:p
Usando Flatmap e MapMulti para Validar a Transformação de Elementos
Removendo Duplicatas e Ordenando um Stream
Limitando e Pulando os Elementos de um Stream
Concatenando Streams
Depurando Streams

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Processando Dados em Memória Usando a Stream API](<#/doc/tutorials/api/streams/map-filter-reduce>)

➜

**Tutorial Atual**

Adicionando Operações Intermediárias em um Stream

➜

**Próximo na Série**

[Criando Streams](<#/doc/tutorials/api/streams/creating>)

**Anterior na Série:** [Processando Dados em Memória Usando a Stream API](<#/doc/tutorials/api/streams/map-filter-reduce>)

**Próximo na Série:** [Criando Streams](<#/doc/tutorials/api/streams/creating>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A Stream API ](<#/doc/tutorials/api/streams>) > Adicionando Operações Intermediárias em um Stream