# Usando um Collector como Operação Terminal

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A Stream API ](<#/doc/tutorials/api/streams>) > Usando um Collector como Operação Terminal

**Anterior na Série**

[Encontrando as Características de um Stream](<#/doc/tutorials/api/streams/characteristics>)

➜

**Tutorial Atual**

Usando um Collector como Operação Terminal

➜

**Próximo na Série**

[Criando Seu Próprio Collector](<#/doc/tutorials/api/streams/custom-collectors>)

**Anterior na Série:** [Encontrando as Características de um Stream](<#/doc/tutorials/api/streams/characteristics>)

**Próximo na Série:** [Criando Seu Próprio Collector](<#/doc/tutorials/api/streams/custom-collectors>)

# Usando um Collector como Operação Terminal

## Coletando Elementos de Stream com um Collector

Você já usou um padrão muito útil para coletar os elementos processados por um stream em uma [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>): `collect(Collectors.toList())`. Este método [`collect()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#collect\(java.util.stream.Collector\)>) é um método terminal definido na interface [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>) que recebe um objeto do tipo [`Collector`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.html>) como argumento. Esta interface [`Collector`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.html>) define sua própria API, que você pode usar para criar qualquer tipo de estrutura em memória para armazenar os dados processados por um stream. A coleta pode ser feita em qualquer instância de [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) ou [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>), pode ser usada para criar strings de caracteres, e você pode criar sua própria instância da interface [`Collector`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.html>) para adicionar suas próprias estruturas a esta lista.

A maioria dos collectors que você usará pode ser criada usando um dos métodos de fábrica da classe de fábrica [`Collectors`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html>). Foi o que você fez ao escrever [`Collectors.toList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toList\(\)>), ou [`Collectors.toSet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toSet\(\)>). Alguns collectors criados com esses métodos podem ser combinados, levando a ainda mais collectors. Todos esses pontos são abordados neste tutorial.

Se você não encontrar o que precisa nesta classe de fábrica, então você pode decidir criar seu próprio collector implementando a interface [`Collector`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.html>). A implementação desta interface também é abordada neste tutorial.

A API Collector é tratada de forma diferente na interface [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>) e nos streams especializados de números: [`IntStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html>), [`LongStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/LongStream.html>) e [`DoubleStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/DoubleStream.html>). A interface [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>) possui duas sobrecargas do método `collect()`, enquanto os streams de números possuem apenas uma. A que falta é precisamente aquela que recebe um objeto collector como argumento. Portanto, você não pode usar um objeto collector com um stream especializado de números.

## Coletando em uma Collection

A classe de fábrica [`Collectors`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html>) oferece três métodos para coletar os elementos do seu stream em uma instância da interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>).

1.  [`toList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toList\(\)>) os coleta em um objeto [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>).
2.  [`toSet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toSet\(\)>) os coleta em um objeto [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>).
3.  Se você precisar de qualquer outra implementação de [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>), você pode usar [`toCollection(supplier)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toCollection\(java.util.function.Supplier\)>), onde o argumento [`supplier`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Supplier.html>) será usado para criar o objeto [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) que você precisa. Se você precisar que seus dados sejam coletados em uma instância de [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>), este é o método que você deve usar.

Seu código não deve depender da implementação exata de [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) ou [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) que é atualmente retornada por esses métodos, pois isso não faz parte da especificação.

Você também pode obter implementações imutáveis de [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) e [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) usando os dois métodos [`toUnmodifiableList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toUnmodifiableList\(\)>) e [`toUnmodifiableSet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toUnmodifiableSet\(\)>).

O exemplo a seguir mostra este padrão em ação. Primeiro, vamos coletar em uma instância `List` simples.

```java
List<Integer> numbers = IntStream.range(0, 10)
                                 .boxed()
                                 .collect(Collectors.toList());
System.out.println(numbers);
```

Este código usa o método intermediário [`boxed()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#boxed\(\)>) para criar um [`Stream<Integer>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>) a partir do [`IntStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html>) criado por [`IntStream.range()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#range\(int,int\)>) ao empacotar todos os elementos desse stream. A execução deste código imprime o seguinte.

```
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Este segundo exemplo cria um [`HashSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html>) e remove os duplicados criados pelo mapeamento.

```java
Set<Integer> numbers = IntStream.range(0, 10)
                                .map(i -> i % 3)
                                .boxed()
                                .collect(Collectors.toSet());
System.out.println(numbers);
```

A execução deste código fornece o seguinte resultado.

```
[0, 1, 2]
```

E este último exemplo usa um objeto [`Supplier`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Supplier.html>) para criar a instância de [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) usada para coletar os elementos do stream.

```java
LinkedList<Integer> numbers = IntStream.range(0, 10)
                                       .boxed()
                                       .collect(Collectors.toCollection(LinkedList::new));
System.out.println(numbers);
```

A execução deste código fornece o seguinte resultado.

```
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## Contando com um Collector

A classe de fábrica [`Collectors`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html>) oferece vários métodos para criar collectors que fazem o mesmo tipo de coisas que um método terminal simples oferece. Este é o caso do método de fábrica [`Collectors.counting()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#counting\(\)>), que faz a mesma coisa que chamar [`count()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#count\(\)>) em um stream.

Isso é digno de nota, e você pode estar se perguntando por que tal recurso foi implementado duas vezes com dois padrões diferentes. Esta pergunta é respondida na próxima seção sobre coleta em mapas, onde você combinará collectors para criar mais collectors.

Por enquanto, as duas linhas de código a seguir levam ao mesmo resultado.

```java
long count1 = IntStream.range(0, 10)
                       .count();
long count2 = IntStream.range(0, 10)
                       .boxed()
                       .collect(Collectors.counting());
System.out.println(count1);
System.out.println(count2);
```

A execução deste código fornece o seguinte resultado.

```
10
10
```

## Coletando em uma String de Caracteres

Outro collector muito útil fornecido pela classe de fábrica [`Collectors`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html>) é o collector [`joining()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#joining\(\)>). Este collector funciona apenas em um stream de strings de caracteres e une os elementos desse stream em uma única string. Ele possui várias sobrecargas.

*   A primeira recebe um separador como argumento.
*   A segunda recebe um separador, um prefixo e um sufixo como argumentos.

Vamos ver este collector em ação.

```java
String s = Stream.of("a", "b", "c")
                 .collect(Collectors.joining());
System.out.println(s);
```

A execução deste código produz o seguinte resultado.

```
abc
```

Você pode adicionar um separador a esta string com o seguinte código.

```java
String s = Stream.of("a", "b", "c")
                 .collect(Collectors.joining(", "));
System.out.println(s);
```

O resultado é o seguinte.

```
a, b, c
```

Vamos ver a última sobrecarga em ação, que recebe um separador, um prefixo e um sufixo.

```java
String s = Stream.of("a", "b", "c")
                 .collect(Collectors.joining(", ", "Prefix: ", " Suffix."));
System.out.println(s);
```

O resultado é o seguinte.

```
Prefix: a, b, c Suffix.
```

Observe que este collector lida corretamente com os casos extremos em que seu stream está vazio ou processa apenas um único elemento.

Este collector é muito útil quando você precisa produzir esse tipo de string de caracteres. Você pode ser tentado a usá-lo mesmo que seus dados não estejam em uma coleção em primeiro lugar ou com apenas alguns elementos. Se for esse o caso, talvez usar a classe de fábrica [`String.join()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#join\(java.lang.CharSequence,java.lang.CharSequence...\)>), ou um objeto [`StringJoiner`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/StringJoiner.html>) funcione da mesma forma, sem pagar a sobrecarga de criar um stream.

## Particionando Elementos com um Predicate

A API Collector oferece três padrões para criar mapas a partir dos elementos de um stream. O primeiro que abordamos cria um mapa com chaves booleanas. Ele é criado com o método de fábrica [`partitioningBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#partitioningBy\(java.util.function.Predicate\)>).

Todos os elementos do stream serão vinculados ao valor booleano `true` ou `false`. O mapa armazena todos os elementos vinculados a cada valor em uma lista. Assim, se este collector for aplicado a um [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>), ele produzirá um mapa com o seguinte tipo: [`Map<Boolean, List<T>>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>).

A decisão se um determinado elemento deve ser vinculado a `true` ou `false` é feita testando este elemento com um predicate, que é fornecido como argumento para o collector.

O exemplo a seguir mostra este collector em ação.

```java
Map<Boolean, List<Integer>> map = IntStream.range(0, 10)
                                           .boxed()
                                           .collect(Collectors.partitioningBy(i -> i % 2 == 0));
System.out.println(map);
```

A execução deste código produz o seguinte resultado.

```
{false=[1, 3, 5, 7, 9], true=[0, 2, 4, 6, 8]}
```

Este método de fábrica possui uma sobrecarga, que recebe um collector como um argumento adicional. Este collector é chamado de _downstream collector_. Abordaremos esses downstream collectors no próximo parágrafo deste tutorial, quando apresentarmos o collector [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function\)>).

## Coletando em um Map com Grouping By

O segundo collector que apresentamos é muito importante porque permite criar histogramas.

### Agrupando os Elementos de um Stream em um Map

O collector que você pode usar para criar histogramas é criado com o método [`Collectors.groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function\)>). Este método possui várias sobrecargas.

O collector cria um mapa. Uma chave é computada para cada elemento do stream aplicando-se uma instância de [`Function`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html>) a ele. Esta função é fornecida como argumento do método [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function\)>). É chamado de _classifier_ na API Collector.

Não há restrição para esta função, exceto o fato de que ela não deve retornar null.

A aplicação desta função pode retornar a mesma chave para mais de um elemento do seu stream. O collector [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function\)>) suporta isso e agrupa todos esses elementos em uma lista, vinculada a essa chave.

Assim, se você estiver processando um [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>) e usar uma [`Function<T, K>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html>) como classifier, o collector [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function\)>) cria um [`Map<K, List<T>>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>).

Vamos examinar o exemplo a seguir.

```java
Map<Integer, List<String>> map = Stream.of("a", "bb", "ccc", "d", "ee", "ffff", "g")
                                       .collect(Collectors.groupingBy(String::length));
System.out.println(map);
```

O classifier usado neste exemplo é uma função que retorna o comprimento de cada string desse stream. Assim, o mapa agrupou as strings em listas pelo seu comprimento. Ele tem o tipo [`Map<Integer, List<String>>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>).

A execução deste código imprime o seguinte.

```
{1=[a, d, g], 2=[bb, ee], 3=[ccc], 4=[ffff]}
```

### Pós-processando os Valores Criados com um Grouping By

#### Contando as Listas de Valores

O método [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function\)>) também aceita outro argumento, que é outro collector. Este collector é chamado de _downstream collector_ na API Collector, mas é apenas um collector regular. O que o torna um _downstream collector_ é o fato de ser passado como argumento para a criação de outro collector.

Este downstream collector é usado para coletar os valores do mapa criado pelo collector [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function\)>).

No exemplo anterior, o collector [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function\)>) criou um mapa cujos valores são listas de strings. Se você fornecer um downstream collector ao método [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function\)>), a API fará o stream dessas listas uma por uma e coletará esses streams com seu downstream collector.

Suponha que você passe o [`Collectors.counting()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#counting\(\)>) como um downstream collector. O que será computado é o seguinte.

```java
map.get(1).stream().collect(Collectors.counting()); // returns 3
map.get(2).stream().collect(Collectors.counting()); // returns 2
map.get(3).stream().collect(Collectors.counting()); // returns 1
map.get(4).stream().collect(Collectors.counting()); // returns 1
```

Este código não é código Java, então você não pode executá-lo. Ele está lá apenas para explicar como este downstream collector é usado.

O mapa que será criado agora depende do downstream collector que você fornecer. As chaves não são modificadas, mas os valores podem ser. No caso do [`Collectors.counting()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#counting\(\)>), os valores são transformados em [`Long`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Long.html>). O tipo do mapa então se torna [`Map<Integer, Long>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>).

O exemplo anterior se torna o seguinte.

```java
Map<Integer, Long> map = Stream.of("a", "bb", "ccc", "d", "ee", "ffff", "g")
                               .collect(Collectors.groupingBy(String::length,
                                                              Collectors.counting()));
System.out.println(map);
```

A execução deste código imprime o seguinte resultado. Ele fornece o número de strings por comprimento, que é o histograma das strings por seu comprimento.

```
{1=3, 2=2, 3=1, 4=1}
```

#### Unindo as Listas de Valores

Você também pode passar o collector [`Collectors.joining()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#joining\(\)>) como um downstream collector, porque os valores deste mapa são listas de strings. Lembre-se que este collector só pode ser usado em streams de strings de caracteres. Isso cria uma instância de [`Map<Integer, String>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>): os valores assumem o tipo criado por este collector. Você pode alterar o exemplo anterior para o seguinte.

```java
Map<Integer, String> map = Stream.of("a", "bb", "ccc", "d", "ee", "ffff", "g")
                                 .collect(Collectors.groupingBy(String::length,
                                                                Collectors.joining()));
System.out.println(map);
```

A execução deste código produz o seguinte resultado.

```
{1=adg, 2=bbee, 3=ccc, 4=ffff}
```

### Controlando a Instância de Map

A última sobrecarga deste método [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function\)>) recebe uma instância de um [`Supplier`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Supplier.html>) como argumento para lhe dar controle sobre qual instância de [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>) você precisa que este collector crie.

Seu código não deve depender do tipo exato de mapa que o collector [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function\)>) está retornando, pois isso não faz parte da especificação.
## Coletando em um Map com To Map

A API Collector oferece um segundo padrão para criar mapas: o padrão [`Collectors.toMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toMap\(java.util.function.Function,java.util.function.Function\)>). Este padrão funciona com duas funções, ambas aplicadas aos elementos do seu stream.

  1. A primeira é chamada de _key mapper_ e é usada para criar a chave.
  2. A segunda é chamada de _value mapper_ e é usada para criar o valor.

Este collector não é usado nos mesmos casos que o [`Collectors.groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function\)>). Em particular, ele não lida com o caso em que vários elementos do seu stream geram a mesma chave. Nesse caso, por padrão, uma [`IllegalStateException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IllegalStateException.html>) é lançada.

Este collector é muito útil para criar caches. Suponha que você tenha uma classe `User` com uma propriedade `id` do tipo [`Long`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Long.html>). Você pode criar um cache dos seus objetos `User` com o seguinte código.

```java
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class ToMapExample {

    record User(Long id, String name) {}

    public static void main(String[] args) {
        List<User> users = List.of(
            new User(1L, "Alice"),
            new User(2L, "Bob"),
            new User(3L, "Charlie")
        );

        Map<Long, User> userCache = users.stream()
            .collect(Collectors.toMap(User::id, Function.identity()));

        System.out.println(userCache);
    }
}
```

A execução do código anterior produz o seguinte resultado.

```
{1=ToMapExample.User[id=1, name=Alice], 2=ToMapExample.User[id=2, name=Bob], 3=ToMapExample.User[id=3, name=Charlie]}
```

O primeiro argumento: `User::id` é uma função aplicada aos elementos do stream. É usada para gerar uma chave.

O segundo argumento: [`Function.identity()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html#identity\(\)>) também é uma função aplicada aos elementos do stream, e é usada para gerar um valor.

A partir desses dois elementos, este collector cria um par chave-valor, adicionado ao map resultante.

Se você espera que vários elementos do stream gerem a mesma chave, então você pode passar um argumento adicional para o método [`toMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toMap\(java.util.function.Function,java.util.function.Function\)>). Este argumento é do tipo [`BinaryOperator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BinaryOperator.html>). Ele será aplicado pela implementação aos elementos conflitantes quando forem detectados. Seu operador binário então produzirá um resultado que será colocado no map no lugar do valor anterior.

O exemplo a seguir mostra como você pode usar este collector com valores conflitantes. Aqui os valores são concatenados com um separador.

```java
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ToMapWithConflictExample {

    public static void main(String[] args) {
        List<String> words = List.of("apple", "banana", "apricot", "grape");

        Map<Integer, String> lengthToStrings = words.stream()
            .collect(Collectors.toMap(
                String::length,
                s -> s,
                (s1, s2) -> s1 + ", " + s2
            ));

        System.out.println(lengthToStrings);
    }
}
```

Neste exemplo, os três argumentos passados para o método [`toMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toMap\(java.util.function.Function,java.util.function.Function\)>) são os seguintes:

  1. `element -> element.length()` é o _key mapper_.
  2. `element -> element` é o _value mapper_.
  3. `(element1, element2) -> element1 + ", " + element2` é a _merge function_, chamada com os dois elementos que geraram a mesma chave.

A execução deste código produz o seguinte resultado.

```
{5=apple, grape, 6=banana, 7=apricot}
```

Assim como para o collector [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function\)>), você pode passar um supplier como argumento para o método [`toMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toMap\(java.util.function.Function,java.util.function.Function\)>) para controlar qual instância da interface [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>) este collector usará.

O collector [`toMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toMap\(java.util.function.Function,java.util.function.Function\)>) tem um método irmão, [`toConcurrentMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toConcurrentMap\(java.util.function.Function,java.util.function.Function\)>) que coletará seus dados em um map concorrente. O tipo exato do map não é garantido pela implementação.

## Extraindo Máximos de um Histograma

O collector [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function\)>) é o seu melhor padrão para calcular histogramas nos dados que você precisa analisar. Vamos examinar um exemplo completo onde você constrói um histograma e então tenta encontrar o valor máximo nele com base em um determinado critério.

### Extraindo um Máximo Não Ambíguo

O histograma que você vai analisar é o seguinte. Ele se parece com o que usamos em um exemplo anterior. Ele conta as strings de caracteres de um determinado comprimento.

```java
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class HistogramExample {

    public static void main(String[] args) {
        List<String> words = List.of(
            "apple", "banana", "apricot", "grape", "kiwi", "orange", "pear",
            "plum", "cherry", "lemon", "lime", "mango", "peach", "berry",
            "melon", "fig", "date", "grapefruit", "avocado", "coconut"
        );

        Map<Integer, Long> histogram = words.stream()
            .collect(Collectors.groupingBy(String::length, Collectors.counting()));

        System.out.println(histogram);
    }
}
```

A impressão deste histograma fornece o seguinte resultado.

```
{4=4, 5=3, 6=2, 7=3, 8=1, 9=1, 10=1}
```

Você pode obter o comprimento mais frequente extraindo o par chave-valor com o valor máximo deste histograma. Ele lhe dá o resultado: `3 :: 4`. A Stream API tem todas as ferramentas que você precisa para extrair tal valor máximo. Infelizmente, não há um método `stream()` na interface [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>). Então, para criar um stream em um map, você primeiro precisa obter uma das coleções que você pode obter de um map.

  1. O conjunto das entradas com o método [`entrySet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#entrySet\(\)>).
  2. O conjunto das chaves com o método [`keySet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#keySet\(\)>).
  3. Ou a coleção dos valores com o método [`values()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#values\(\)>).

Aqui você precisa tanto da chave quanto do valor máximo, então a escolha certa é fazer um stream do conjunto retornado por [`entrySet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#entrySet\(\)>).

O código que você precisa é o seguinte.

```java
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

public class MaxFromHistogramExample {

    public static void main(String[] args) {
        List<String> words = List.of(
            "apple", "banana", "apricot", "grape", "kiwi", "orange", "pear",
            "plum", "cherry", "lemon", "lime", "mango", "peach", "berry",
            "melon", "fig", "date", "grapefruit", "avocado", "coconut"
        );

        Map<Integer, Long> histogram = words.stream()
            .collect(Collectors.groupingBy(String::length, Collectors.counting()));

        Optional<Map.Entry<Integer, Long>> maxEntry = histogram.entrySet().stream()
            .max(Map.Entry.comparingByValue());

        maxEntry.ifPresent(entry ->
            System.out.println("Most frequent length: " + entry.getKey() + " :: " + entry.getValue())
        );
    }
}
```

A execução deste exemplo imprime o seguinte.

```
Most frequent length: 4 :: 4
```

Você pode notar que este código usa o método [`max()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#max\(java.util.Comparator\)>) da interface [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>), que recebe um [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) como argumento. Acontece que a interface [`Map.Entry`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.Entry.html>) tem vários métodos de fábrica para criar tal comparator. O que usamos neste exemplo cria um comparator que pode comparar instâncias de [`Map.Entry`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.Entry.html>), usando o valor desses pares chave-valor para compará-los. Esta comparação só pode funcionar se o valor implementar a interface [`Comparable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html>).

Este padrão de código é muito genérico e pode ser usado em qualquer map, desde que tenha valores comparáveis. Podemos torná-lo menos genérico e mais legível, graças à introdução de records no Java SE 16.

Vamos criar um record para modelar os pares chave-valor deste map. Criar um record é uma linha de código. Como records locais são permitidos na linguagem, você pode copiar essas linhas dentro de qualquer método.

```java
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

public class MaxFromHistogramWithRecordExample {

    record NumberOfLength(Integer length, Long number) {
        static NumberOfLength of(Map.Entry<Integer, Long> entry) {
            return new NumberOfLength(entry.getKey(), entry.getValue());
        }

        static Comparator<NumberOfLength> comparator() {
            return Comparator.comparing(NumberOfLength::number);
        }
    }

    public static void main(String[] args) {
        List<String> words = List.of(
            "apple", "banana", "apricot", "grape", "kiwi", "orange", "pear",
            "plum", "cherry", "lemon", "lime", "mango", "peach", "berry",
            "melon", "fig", "date", "grapefruit", "avocado", "coconut"
        );

        Map<Integer, Long> histogram = words.stream()
            .collect(Collectors.groupingBy(String::length, Collectors.counting()));

        Optional<NumberOfLength> maxEntry = histogram.entrySet().stream()
            .map(NumberOfLength::of)
            .max(NumberOfLength.comparator());

        maxEntry.ifPresent(entry ->
            System.out.println("Most frequent length: " + entry.length() + " :: " + entry.number())
        );
    }
}
```

A execução deste exemplo imprime o seguinte.

```
Most frequent length: 4 :: 4
```

Você pode ver que este record se parece com a interface [`Map.Entry`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.Entry.html>). Ele tem um método de fábrica para o mapeamento de um par chave-valor e um método de fábrica para criar o comparator que você precisa. A análise do seu histograma se torna muito mais legível e fácil de entender.

### Extraindo um Valor Máximo Ambíguo

O exemplo anterior foi um bom exemplo, porque havia apenas um valor máximo em sua lista. Infelizmente, casos da vida real muitas vezes não são tão bons, e você pode ter vários pares chave-valor que correspondem ao valor máximo.

Vamos remover um elemento da coleção do exemplo anterior.

```java
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

public class AmbiguousMaxFromHistogramExample {

    record NumberOfLength(Integer length, Long number) {
        static NumberOfLength of(Map.Entry<Integer, Long> entry) {
            return new NumberOfLength(entry.getKey(), entry.getValue());
        }

        static Comparator<NumberOfLength> comparator() {
            return Comparator.comparing(NumberOfLength::number);
        }
    }

    public static void main(String[] args) {
        List<String> words = List.of(
            "apple", "banana", "apricot", "grape", "kiwi", "orange", "pear",
            "plum", "cherry", "lemon", "lime", "mango", "peach", "berry",
            "melon", "fig", "date", "grapefruit", "avocado" // Removed "coconut"
        );

        Map<Integer, Long> histogram = words.stream()
            .collect(Collectors.groupingBy(String::length, Collectors.counting()));

        System.out.println(histogram);

        Optional<NumberOfLength> maxEntry = histogram.entrySet().stream()
            .map(NumberOfLength::of)
            .max(NumberOfLength.comparator());

        maxEntry.ifPresent(entry ->
            System.out.println("Most frequent length: " + entry.length() + " :: " + entry.number())
        );
    }
}
```

A impressão deste histograma fornece o seguinte resultado.

```
{4=3, 5=3, 6=2, 7=3, 8=1, 9=1, 10=1}
Most frequent length: 4 :: 3
```

Agora, como você pode ver, temos três pares chave-valor para o valor máximo. Se você usar o padrão de código anterior para extraí-lo, um desses três será selecionado e retornado, escondendo os outros dois.

Uma solução para resolver este problema seria criar outro map, onde as chaves são o número de strings com um determinado comprimento, e o valor os comprimentos que correspondem a esse número. Em outras palavras: você precisa inverter este map. Este é um bom caso de uso para o collector [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function\)>). Este exemplo será abordado mais tarde nesta parte, pois precisamos de mais um elemento para escrever este código.

## Usando Collectors Intermediários

Os collectors que abordamos até agora são de contagem, junção e coleta em uma lista ou um map. Todos eles modelam operações terminais. A API Collector oferece outros collectors que realizam operações intermediárias: mapping, filtering e flatmapping. Você pode estar se perguntando qual seria o sentido de ter um método terminal [`collect()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#collect\(java.util.stream.Collector\)>) que modelaria uma operação intermediária. Na verdade, esses collectors especiais não podem ser criados sozinhos. Os métodos de fábrica que você pode usar para criá-los todos precisam de um collector downstream como segundo argumento.

Assim, o collector geral que você pode criar com esses métodos é uma combinação de uma operação intermediária e uma operação terminal.

### Mapeando com um Collector

A primeira operação intermediária que podemos examinar é a operação de mapping. Um collector de mapping é criado com o método de fábrica [`Collectors.mapping()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#mapping\(java.util.function.Function,java.util.stream.Collector\)>). Ele recebe uma função de mapping regular como primeiro argumento e um collector downstream obrigatório como segundo argumento.

No exemplo a seguir, estamos combinando um mapping com a coleta dos elementos mapeados em uma lista.

```java
import java.util.List;
import java.util.stream.Collectors;

public class MappingCollectorExample {

    public static void main(String[] args) {
        List<String> words = List.of("apple", "banana", "apricot");

        List<Integer> lengths = words.stream()
            .collect(Collectors.mapping(String::length, Collectors.toList()));

        System.out.println(lengths);
    }
}
```

A execução do código anterior imprime o seguinte.

```
[5, 6, 7]
```

O método de fábrica [`Collectors.mapping()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#mapping\(java.util.function.Function,java.util.stream.Collector\)>) cria um collector regular. Você pode passar este collector como um collector downstream para qualquer método que aceite um, incluindo, por exemplo, [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function\)>) ou [`toMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toMap\(java.util.function.Function,java.util.function.Function\)>). Você deve se lembrar da seção Extraindo um Valor Máximo Ambíguo que deixamos uma questão em aberto sobre a inversão de um map. Vamos usar este collector de mapping para resolver este problema.

Neste exemplo, você criou um histograma. Agora você precisa inverter este histograma com um [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function\)>) para encontrar todos os valores máximos.

O código a seguir cria tal map.

```java
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class InvertedHistogramWrongExample {

    record NumberOfLength(Integer length, Long number) {
        static NumberOfLength of(Map.Entry<Integer, Long> entry) {
            return new NumberOfLength(entry.getKey(), entry.getValue());
        }
    }

    public static void main(String[] args) {
        List<String> words = List.of(
            "apple", "banana", "apricot", "grape", "kiwi", "orange", "pear",
            "plum", "cherry", "lemon", "lime", "mango", "peach", "berry",
            "melon", "fig", "date", "grapefruit", "avocado"
        );

        Map<Integer, Long> histogram = words.stream()
            .collect(Collectors.groupingBy(String::length, Collectors.counting()));

        Map<Long, List<NumberOfLength>> invertedHistogram = histogram.entrySet().stream()
            .map(NumberOfLength::of)
            .collect(Collectors.groupingBy(NumberOfLength::number));

        System.out.println(invertedHistogram);
    }
}
```

A execução do código anterior imprime o seguinte, que não é exatamente o que você precisa.

```
{1=[InvertedHistogramWrongExample.NumberOfLength[length=8, number=1], InvertedHistogramWrongExample.NumberOfLength[length=9, number=1], InvertedHistogramWrongExample.NumberOfLength[length=10, number=1]], 2=[InvertedHistogramWrongExample.NumberOfLength[length=6, number=2]], 3=[InvertedHistogramWrongExample.NumberOfLength[length=4, number=3], InvertedHistogramWrongExample.NumberOfLength[length=5, number=3], InvertedHistogramWrongExample.NumberOfLength[length=7, number=3]]}
```

Vamos examinar este código e determinar o tipo exato do map que é construído.

As chaves deste map são o número de vezes que cada comprimento está presente no stream original. É o componente `number` do record `NumberOfLength`, ou seja, um [`Long`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Long.html>).

Os valores são os elementos deste stream, coletados em listas. Assim, os valores são listas de objetos `NumberOfLength`. O tipo exato deste map é [`Map<Long, NumberOfLength>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>).

Acontece que isso não é exatamente o que você precisa. O que você precisa é apenas o comprimento das strings, não os dois componentes do record. Extrair um componente de um record é apenas um mapping. O que você precisa é mapear essas instâncias de `NumberOfLength` para o seu componente `length`. Agora que abordamos o collector de mapping, resolver este ponto se torna possível. Tudo o que você precisa fazer é adicionar o collector downstream correto à chamada [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function,java.util.stream.Collector\)>).

O código se torna o seguinte.

```java
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class InvertedHistogramCorrectExample {

    record NumberOfLength(Integer length, Long number) {
        static NumberOfLength of(Map.Entry<Integer, Long> entry) {
            return new NumberOfLength(entry.getKey(), entry.getValue());
        }
    }

    public static void main(String[] args) {
        List<String> words = List.of(
            "apple", "banana", "apricot", "grape", "kiwi", "orange", "pear",
            "plum", "cherry", "lemon", "lime", "mango", "peach", "berry",
            "melon", "fig", "date", "grapefruit", "avocado"
        );

        Map<Integer, Long> histogram = words.stream()
            .collect(Collectors.groupingBy(String::length, Collectors.counting()));

        Map<Long, List<Integer>> invertedHistogram = histogram.entrySet().stream()
            .map(NumberOfLength::of)
            .collect(Collectors.groupingBy(
                NumberOfLength::number,
                Collectors.mapping(NumberOfLength::length, Collectors.toList())
            ));

        System.out.println(invertedHistogram);
    }
}
```

Este código agora imprime o seguinte.

```
{1=[8, 9, 10], 2=[6], 3=[4, 5, 7]}
```

Os valores do map construído agora são listas de objetos `NumberOfLength` mapeados, usando o mapeador `NumberOfLength::length`. Este map é do tipo [`Map<Long, List<Integer>>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>), que é exatamente o que você precisa.

Para obter todos os valores máximos, você pode aplicar o mesmo padrão que usamos anteriormente, usando a chave para obter o valor máximo em vez do valor.

O código completo do histograma, incluindo a extração do valor máximo, segue.

```java
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

public class InvertedHistogramMaxExample {

    record NumberOfLength(Integer length, Long number) {
        static NumberOfLength of(Map.Entry<Integer, Long> entry) {
            return new NumberOfLength(entry.getKey(), entry.getValue());
        }

        static Comparator<NumberOfLength> comparator() {
            return Comparator.comparing(NumberOfLength::number);
        }
    }

    public static void main(String[] args) {
        List<String> words = List.of(
            "apple", "banana", "apricot", "grape", "kiwi", "orange", "pear",
            "plum", "cherry", "lemon", "lime", "mango", "peach", "berry",
            "melon", "fig", "date", "grapefruit", "avocado"
        );

        Map<Integer, Long> histogram = words.stream()
            .collect(Collectors.groupingBy(String::length, Collectors.counting()));

        Map<Long, List<Integer>> invertedHistogram = histogram.entrySet().stream()
            .map(NumberOfLength::of)
            .collect(Collectors.groupingBy(
                NumberOfLength::number,
                Collectors.mapping(NumberOfLength::length, Collectors.toList())
            ));

        Optional<Map.Entry<Long, List<Integer>>> maxEntry = invertedHistogram.entrySet().stream()
            .max(Map.Entry.comparingByKey());

        maxEntry.ifPresent(entry ->
            System.out.println("Lengths with max frequency (" + entry.getKey() + "): " + entry.getValue())
        );
    }
}
```

A execução deste código produz o seguinte.

```
Lengths with max frequency (3): [4, 5, 7]
```

Isso significa que existem três comprimentos de strings que são representados três vezes neste stream: 3, 4 e 5.

Este exemplo mostra um collector aninhado em mais dois collectors, algo que acontece com bastante frequência quando você está trabalhando com esta API. Pode parecer intimidante no início, mas é apenas a combinação de collectors usando este mecanismo de collector downstream.

Você pode ver por que é interessante ter esses collectors intermediários. Ser capaz de modelar operações intermediárias com um collector lhe dá a possibilidade de criar um collector downstream para quase qualquer tipo de processamento, que você pode usar para pós-processar os valores dos maps.

### Filtrando e Flatmapping com um Collector

O collector de filtering segue o mesmo padrão do collector de mapping. Ele é criado com o método de fábrica [`Collectors.filtering()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#filtering\(java.util.function.Predicate,java.util.stream.Collector\)>) que recebe um predicado regular para filtrar os dados e um collector downstream obrigatório.

O mesmo vale para o collector de flatmapping, criado pelo método de fábrica [`Collectors.flatMapping()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#flatMapping\(java.util.function.Function,java.util.stream.Collector\)>), que recebe uma função de flatmapping (uma função que retorna um stream), e um collector downstream obrigatório.

## Usando Collectors Terminais

A API Collector também oferece várias operações terminais que correspondem às operações terminais disponíveis na Stream API.

  * [`maxBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#maxBy\(java.util.Comparator\)>) e [`minBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#minBy\(java.util.Comparator\)>). Ambos os métodos recebem um comparator como argumento e retornam um objeto optional que está vazio se o stream processado estiver vazio.
  * [`summingInt()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#summingInt\(java.util.function.ToIntFunction\)>), [`summingLong()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#summingLong\(java.util.function.ToLongFunction\)>) e [`summingDouble()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#summingDouble\(java.util.function.ToDoubleFunction\)>). Esses três métodos recebem uma função de mapping como argumento para mapear o elemento do seu stream para `int`, `long` e `double` respectivamente, antes de somá-los.
  * [`averagingInt()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#averagingInt\(java.util.function.ToIntFunction\)>), [`averagingLong()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#averagingLong\(java.util.function.ToLongFunction\)>) e [`averagingDouble()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#averagingDouble\(java.util.function.ToDoubleFunction\)>). Esses três métodos também recebem uma função de mapping como argumento, para mapear o elemento do seu stream para `int`, `long` e `double`, respectivamente, antes de calcular a média. Esses collectors não funcionam da mesma forma que os métodos [`average()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#average\(\)>) correspondentes definidos em [`IntStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html>), [`LongStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/LongStream.html>) e [`DoubleStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/DoubleStream.html>). Todos eles retornam uma instância de [`Double`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Double.html>) e retornam 0 para streams vazios. Os métodos [`average()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#average\(\)>) retornam um objeto optional que está vazio para streams vazios.

### Neste tutorial

Coletando Elementos de Stream com um Collector Coletando em uma Coleção Contando com um Collector Coletando em uma String de Caracteres Particionando Elementos com um Predicado Coletando em um Map com Grouping By Coletando em um Map com To Map Extraindo Máximos de um Histograma Usando Collectors Intermediários Usando Collectors Terminais

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Encontrando as Características de um Stream](<#/doc/tutorials/api/streams/characteristics>)

➜

**Tutorial Atual**

Usando um Collector como Operação Terminal

➜

**Próximo na Série**

[Criando Seu Próprio Collector](<#/doc/tutorials/api/streams/custom-collectors>)

**Anterior na Série:** [Encontrando as Características de um Stream](<#/doc/tutorials/api/streams/characteristics>)

**Próximo na Série:** [Criando Seu Próprio Collector](<#/doc/tutorials/api/streams/custom-collectors>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Stream ](<#/doc/tutorials/api/streams>) > Usando um Collector como Operação Terminal