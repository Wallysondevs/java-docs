[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A Stream API ](<#/doc/tutorials/api/streams>) > A Gatherer API

**Anterior na Série**

[Paralelizando Streams](<#/doc/tutorials/api/streams/parallel-streams>)

➜

**Tutorial Atual**

A Gatherer API

➜

Este é o fim da série!

**Anterior na Série:** [Paralelizando Streams](<#/doc/tutorials/api/streams/parallel-streams>)

# A Gatherer API

## Apresentando os Gatherers

A partir do JDK 24, você pode usar uma API específica para modelar suas operações intermediárias na Stream API, chamada Gatherers API. Em termos de design, ela é semelhante à Collector API para operações terminais de Stream.

Por que a Stream API precisava de tal recurso? A Stream API é uma API muito rica, que oferece muitas maneiras de processar dados em memória, seguindo o padrão map-filter-reduce. A Stream API é construída sobre a Spliterator API, para modelar a paralelização de operações. A versatilidade desses dois padrões oferece muitas possibilidades, se não todas. O único inconveniente é que a Spliterator API não é fácil de usar e não leva a um código simples e legível. Além disso, se você precisar aproveitar parallel streams, pode se tornar muito complicado de usar.

### Organização da Gatherer API

A Gatherer API traz padrões mais simples do que a Spliterator API, com excelente suporte para paralelismo. Na verdade, você pode usar um gatherer que não suporta paralelismo, em um parallel stream, e ainda se beneficiar do desempenho que os parallel streams oferecem. Se o seu Gatherer for sequencial, ele, é claro, limitará a paralelização da avaliação do stream resultante, mas não a suprimirá. Isso é algo que a Spliterator API não oferece.

A Gatherer API é construída sobre dois elementos principais: uma interface [`Gatherer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.html>) e uma classe de fábrica [`Gatherers`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherers.html>). Há também várias interfaces usadas para interagir com gatherers, bem como classes para implementá-las.

Um [`Gatherer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.html>) é um objeto que você pode passar para um método da interface [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>): [`gather()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#gather\(java.util.stream.Gatherer\)>). Este método [`gather()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#gather\(java.util.stream.Gatherer\)>) é uma operação intermediária da Stream API, e este objeto modela o que esta operação intermediária está fazendo.

### Quando Usar Gatherers?

A Gatherer API não é uma API simples, e você não deve usá-la a menos que tenha bons motivos para isso. Mesmo que ela possa modelar as operações mais simples de Stream, como map, filter ou flat-map, construir um gatherer para essas operações seria complexo e levaria a um código difícil de entender. Seu bom e velho método [`map()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#map\(java.util.function.Function\)>) faz um mapeamento de forma simples, então é isso que você deve escolher para sua aplicação.

A Gatherer API existe para criar operações complexas, que ainda não estão disponíveis na Stream API. Aqui estão alguns exemplos.

  * Criar um stream composto por listas de tamanho fixo de elementos consecutivos desse stream.
  * Criar uma operação semelhante a distinct, com uma forma personalizada de comparar elementos.
  * Criar uma operação complexa de map-filter, talvez envolvendo algum flat-mapping e algum tratamento opcional, que você deseja fundir em uma única operação, nomeada adequadamente, para tornar seu código mais legível.

Há uma série de coisas que a Gatherer API pode fazer, que você descobrirá uma por uma nesta seção. Vamos começar com como você pode integrar elementos a um downstream, dado o que você obtém de um upstream.

## Integrando Elementos em um Downstream

Aprender como a Gatherer API funciona é provavelmente um processo frustrante, pois você precisa passar por uma série de exemplos simples que não deve usar em sua aplicação. Os primeiros exemplos que esta seção aborda são sobre mapeamento, filtragem ou flat-mapping de streams, operações que você pode realizar com os métodos clássicos [`Stream.map()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#map\(java.util.function.Function\)>), [`Stream.filter()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#filter\(java.util.function.Predicate\)>) ou [`Stream.flatMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#flatMap\(java.util.function.Function\)>). Esses exemplos não têm outros objetivos além de mostrar os diferentes elementos que compõem um gatherer de forma simples e ensinar como você pode usá-los.

### Definindo Alguns Termos

Vamos primeiro definir alguns termos. Um gatherer modela uma operação intermediária em um stream. Como tal, ele opera em um stream, consome os elementos que este stream produz, faz algo com eles e empurra (ou não) elementos para um downstream.

Vamos chamar o primeiro stream de onde os elementos vêm de _upstream_, e o stream para o qual este gatherer empurra elementos de _downstream_.

### Usando um Integrator para Mapear um Stream

Vamos começar com um primeiro exemplo simples: o mapeamento de um stream de strings de caracteres.

Escrever um gatherer envolve implementar a interface [`Gatherer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.html>), que se revela uma interface funcional. Você pode implementá-la com uma lambda, e verá como fazer isso em alguns minutos. Mas você também pode criar um gatherer com um dos poucos métodos de fábrica disponíveis nesta interface.

Para um gatherer simples, você pode usar o método [`Gatherer.of()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.html#of\(java.util.stream.Gatherer.Integrator\)>), que recebe um [`Integrator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.Integrator.html>) como parâmetro. Este método possui sobrecargas que serão abordadas mais adiante nesta parte. Então, para escrever o gatherer que você precisa, primeiro você precisa escrever este integrator.

O papel de um integrator é consumir elementos do upstream e empurrar elementos para o downstream. Esses elementos podem ser os mesmos, do mesmo tipo, ou não.

Neste ponto, você pode ver que um integrator precisa de dois elementos para trabalhar: um elemento do upstream e um objeto para modelar o downstream, com uma forma de empurrar elementos para ele. Acontece que um integrator trabalha com um terceiro elemento, que é um estado interno, que você pode definir dentro da sua implementação de gatherer. Este estado será abordado mais adiante nesta seção, então vamos deixá-lo por enquanto.

O código a seguir mostra como você pode definir um integrator, um gatherer e como você pode usá-lo em um stream. Este gatherer não faz nada, mas mostra como você pode juntar todos esses elementos.

```java
import java.util.stream.Gatherer;
import java.util.stream.Stream;

public class SimpleGathererExample {

    public static void main(String[] args) {
        Gatherer<Void, String, String> gatherer = Gatherer.of((state, element, downstream) -> {
            System.out.println("Consuming: " + element);
            boolean pushed = downstream.push(element);
            System.out.println("Pushed: " + element + ", result: " + pushed);
            return true;
        });

        Stream.of("hello", "world", "java")
              .gather(gatherer)
              .forEach(System.out::println);
    }
}
```

A execução deste código produz o seguinte.

```
Consuming: hello
Pushed: hello, result: true
hello
Consuming: world
Pushed: world, result: true
world
Consuming: java
Pushed: java, result: true
java
```

A primeira linha é a seguinte.

```java
Gatherer.of((state, element, downstream) -> {
```

É uma implementação do método abstrato que você pode encontrar na interface [`Integrator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.Integrator.html>).

O exemplo que você escreveu define um integrator do tipo `<Void, String, String>`. O primeiro tipo é o tipo do estado interno que não estamos usando aqui. O segundo tipo é o tipo de elementos consumidos do upstream, e o terceiro tipo é o tipo de elementos produzidos para o downstream.

Observe que este método retorna um `boolean`. Felizmente, o método `downstream.push()` também retorna um `boolean`, uma razão pela qual você pode compilar e executar o exemplo. Este `boolean` é muito importante, e seu papel exato será abordado mais adiante nesta seção.

Agora você pode escrever um mapper que faz algum mapeamento (em vez da função de identidade). Vamos colocar este gatherer em um método, para que você possa passar seu mapper como argumento.

```java
import java.util.function.Function;
import java.util.stream.Gatherer;
import java.util.stream.Stream;

public class MappingGathererExample {

    public static <T, R> Gatherer<Void, T, R> map(Function<T, R> mapper) {
        return Gatherer.of((state, element, downstream) -> {
            R mapped = mapper.apply(element);
            return downstream.push(mapped);
        });
    }

    public static void main(String[] args) {
        Stream.of("hello", "world", "java")
              .gather(map(String::toUpperCase))
              .forEach(System.out::println);
    }
}
```

A execução deste código produz o seguinte resultado.

```
HELLO
WORLD
JAVA
```

Você pode alterar a função na linha 8 para o seguinte. Observe que, graças ao uso de `var`, você não precisa alterar o tipo do gatherer que você produz.

```java
        var gatherer = map(s -> s + "!");
        Stream.of("hello", "world", "java")
              .gather(gatherer)
              .forEach(System.out::println);
```

O resultado então se torna o seguinte.

```
hello!
world!
java!
```

### Usando um Gatherer para Filtrar um Stream

Um gatherer pode decidir empurrar um elemento para um downstream ou não. Nesse caso, ele pode atuar como uma operação de filtragem. Escrever um gatherer assim é uma pequena modificação do gatherer de mapeamento que você escreveu na seção anterior.

```java
import java.util.function.Predicate;
import java.util.stream.Gatherer;
import java.util.stream.Stream;

public class FilteringGathererExample {

    public static <T> Gatherer<Void, T, T> filter(Predicate<T> predicate) {
        return Gatherer.of((state, element, downstream) -> {
            if (predicate.test(element)) {
                downstream.push(element);
            }
            return true;
        });
    }

    public static void main(String[] args) {
        Stream.of("hello", "world", "java")
              .gather(filter(s -> s.length() > 4))
              .forEach(System.out::println);
    }
}
```

A execução deste código produz o seguinte.

```
hello
world
```

Observe que há um `return true` na linha 7 deste código. Não abordamos o significado exato deste booleano que seu integrator deve retornar. Retornamos `true` por enquanto, o que é uma boa escolha padrão.

### Usando um Gatherer para Flat-Map um Stream

A terceira operação básica que você pode ter em mente é, claro, a operação flat-map. Mapear um stream não altera o número de elementos que este stream processa. Filtrá-lo pode reduzir esse número, até mesmo levá-lo a 0, enquanto o flat-mapping pode tanto reduzi-lo quanto aumentá-lo.

Suponha que sua operação flat-map seja sobre criar um stream das letras de uma string de caracteres. Você pode escrevê-la desta forma.

```java
import java.util.function.Function;
import java.util.stream.Gatherer;
import java.util.stream.Stream;

public class FlatMappingGathererExample {

    public static <T, R> Gatherer<Void, T, R> flatMap(Function<T, Stream<R>> flatMapper) {
        return Gatherer.of((state, element, downstream) -> {
            flatMapper.apply(element).forEach(downstream::push);
            return true;
        });
    }

    public static void main(String[] args) {
        Stream.of("hello", "world", "java")
              .gather(flatMap(s -> s.chars().mapToObj(c -> (char) c)))
              .forEach(System.out::println);
    }
}
```

A execução deste código produz o seguinte.

```
h
e
l
l
o
w
o
r
l
d
j
a
v
a
```

Observe que a linha 5 deste código: `return true` parece muito suspeita. E, de fato, não é assim que você deve gerenciar o booleano retornado pela chamada `downstream::push`. Você verá por que este código está errado e como corrigi-lo mais adiante nesta seção.

Observe também que há pelo menos dois bugs sutis na escrita de `flatMapper.apply(element).forEach(downstream::push)`, que discutiremos mais tarde. No entanto, usar este código no exemplo anterior está tudo bem.

### Fundindo Mapeamentos, Filtragens e Flat-Mappings

Até agora, todos os gatherers que você viu são exemplos que seriam complexos demais para usar em produção. Os métodos equivalentes da Stream API são muito mais simples e tornarão seu código muito mais legível.

Se você realmente busca desempenho, fundir essas operações em um único gatherer pode lhe dar resultados melhores do que encadear várias chamadas de método na Stream API. A legibilidade do seu código pode ser prejudicada, então isso é realmente uma questão de escolha, levando em consideração o contexto da sua aplicação.

Vamos fundir as três operações desta seção em um único gatherer.

```java
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Gatherer;
import java.util.stream.Stream;

public class FusedGathererExample {

    public static <T, R, S> Gatherer<Void, T, S> mapFilterFlatMap(
            Function<T, R> mapper,
            Predicate<R> filter,
            Function<R, Stream<S>> flatMapper) {
        return Gatherer.of((state, element, downstream) -> {
            R mapped = mapper.apply(element);
            if (filter.test(mapped)) {
                flatMapper.apply(mapped).forEach(downstream::push);
            }
            return true;
        });
    }

    public static void main(String[] args) {
        Stream.of("hello", "world", "java")
              .gather(mapFilterFlatMap(
                      String::toUpperCase,
                      s -> s.length() > 4,
                      s -> s.chars().mapToObj(c -> (char) c)))
              .forEach(System.out::println);
    }
}
```

A execução deste código produz o seguinte resultado.

```
H
E
L
L
O
W
O
R
L
D
```

Mais uma vez, leve este exemplo com cautela, pois o `return true` na linha 12 não é o código correto. Mais sobre isso mais adiante nesta seção.

Por que este código poderia rodar mais rápido? Porque ele cria menos objetos do que o código de stream equivalente. Cada chamada de método de stream cria um novo objeto Stream, o que representa uma sobrecarga. Neste código, apenas dois objetos Stream são criados, o que pode ser uma otimização.

Você aprenderá mais sobre o encadeamento de gatherers mais adiante nesta seção, o que oferece outra maneira, melhor (e recomendada!), de fundir várias operações de gatherer em uma só. Em qualquer caso, você precisa medir se este tipo de código lhe traz algum ganho, em um ambiente de produção, antes de optar por usá-lo.

Observe que o bug sutil que mencionamos no exemplo anterior ainda está presente na escrita de `flatMapper.apply(mapped).forEach(downstream::push)`. Então, agora é a hora de corrigi-lo.

### Escrevendo um Flat-Mapper Correto

Existem pelo menos dois bugs no seguinte código: `flatMapper.apply(mapped).forEach(downstream::push)`, além de um terceiro.

O primeiro bug é que uma instância de [`Downstream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.Downstream.html>) não é um objeto thread-safe. Chamar `forEach(downstream::push)` viola uma das regras da Stream API: as lambdas que você usa em um Stream não devem ter efeitos colaterais. Se você não seguir esta regra, deve ter cuidado extra com parallel streams: eles podem criar condições de corrida, o que é exatamente o caso aqui. A solução é se proteger contra um `flatMapper` que poderia retornar um parallel stream e gerar condições de corrida no [`Downstream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.Downstream.html>) que lhe é dado. Você pode fazer isso simplesmente chamando sequential no stream retornado: `flatMapper.apply(mapped).sequential()`. Se o stream já for sequential, esta chamada não faz nada, retorna `this`, e se for um parallel stream, então o torna non-parallel.

O segundo bug tem a ver com o fato de que um stream precisa ser fechado uma vez usado. Em muitos casos, chamar [`Stream.close()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#close\(\)>) não faz nada. Mas há casos em que um stream é aberto em um recurso de I/O (como [`Files.lines()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#lines\(java.nio.file.Path\)>)) onde não chamá-lo levaria a vazamento de recursos. Como um [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>) implementa [`AutoCloseable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/AutoCloseable.html>), você pode abri-lo em uma [instrução try-with-resources](<#/doc/tutorials/exceptions/catching-handling>). O padrão então se torna o seguinte.

```java
try (Stream<S> s = flatMapper.apply(mapped).sequential()) {
    s.forEach(downstream::push);
}
```

E há ainda outro, contra o qual você provavelmente deveria se proteger. É nosso velho amigo, o bom e velho [`NullPointerException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NullPointerException.html>) que ninguém espera. Alguém poderia passar um flat-mapper para o seu método, que poderia retornar null. Lidar com tal problema depende da sua aplicação. Talvez seja um bug que você precise relatar, e nesse caso você pode decidir falhar rapidamente e relançar esta [`NullPointerException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NullPointerException.html>). Ou você poderia ignorá-lo, e como não há nada para empurrar para o [`Downstream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.Downstream.html>), não fazer nada.

Esta última parte tem a ver com como você pode gerenciar o booleano retornado por `downstream::push`, então você verá o padrão completo e correto mais adiante nesta seção.

## Gerenciando um Estado Mutável Interno

A segunda coisa que um Gatherer pode fazer é gerenciar um estado mutável interno. Várias operações intermediárias usam um estado mutável para funcionar na Stream API.

  * [`limit()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#limit\(long\)>) precisa contar o número de elementos que processou antes de interromper o stream.
  * [`distinct()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#distinct\(\)>) precisa armazenar os elementos que já viu em um hashset.
  * [`dropWhile()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#dropWhile\(java.util.function.Predicate\)>) precisa alternar um estado interno para saber se está aberto ou não.

Existe um princípio na Stream API, que é que você nunca deve mutar um estado mutável externo de dentro de um stream. Há duas razões para isso. Primeiro: fazer isso poderia impedir que algumas otimizações fossem aplicadas aos streams. E segundo, impediria você de usar parallel streams, pois criaria race conditions se você não for cauteloso.

### Ignorando os Primeiros Elementos de um Stream

Vamos primeiro criar um comportamento semelhante a [`dropWhile()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#dropWhile\(java.util.function.Predicate\)>) com um gatherer.

Você deve ter notado que ignoramos o primeiro parâmetro dos integrators que escrevemos na seção anterior. Bem, agora é a hora de levá-los em consideração. Um gatherer que gerencia um estado mutável interno precisa conhecer este estado atual para decidir o que fazer. Assim, o integrator recebe este estado como seu primeiro parâmetro. Como este estado é mutável, um integrator pode mutá-lo, e se o fizer, da próxima vez que for chamado, verá esta modificação.

Mas isso não é tudo: você também precisa de uma maneira de criar a instância inicial deste estado mutável.

Se o que você precisa é uma coleção mutável, por exemplo, então você pode simplesmente usar uma implementação fornecida pelo JDK. Não precisa ser thread-safe, então [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) pode servir. Se o que você precisa é um contador, ou um boolean, então você precisa criar seu próprio wrapper mutável para este contador. Usar uma atomic variable seria um exagero, pois você não precisa de nenhuma thread safety. Neste caso, ter apenas um integrator não é suficiente: você também precisa de um supplier que a implementação do Gatherer possa chamar para criar este contêiner mutável inicial. Na Gatherer API, este supplier é chamado de _initializer_.

Vamos criar um gatherer que pode abrir a porta para deixar os elementos fluírem assim que um predicate se tornar false.

```java
import java.util.function.Predicate;
import java.util.stream.Gatherer;
import java.util.stream.Gatherers;
import java.util.stream.Stream;

public class DropWhileGathererExample {

    public static <T> Gatherer<Box, T, T> dropWhile(Predicate<T> predicate) {
        class Box {
            boolean open = false;
        }
        return Gatherers.ofSequential(
                Box::new,
                (box, element, downstream) -> {
                    if (box.open) {
                        downstream.push(element);
                    } else if (!predicate.test(element)) {
                        box.open = true;
                        downstream.push(element);
                    }
                    return true;
                });
    }

    public static void main(String[] args) {
        Stream.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
              .gather(dropWhile(i -> i < 5))
              .forEach(System.out::println);
    }
}
```

A execução do código anterior imprime o seguinte.

```
5
6
7
8
9
10
```

O primeiro elemento que você pode ver neste método `dropWhile()` é a definição da sua caixa mutável. É uma classe local simples, que você pode declarar dentro do seu método. Em uma próxima etapa, você verá como pode torná-la uma anonymous class. Então você pode escrever um [`Supplier`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Supplier.html>) para criar uma instância desta classe `Box`. Este supplier é chamado pela implementação do seu gatherer, apenas uma vez.

A implementação do seu integrator é diferente e recebe a instância de `Box` que foi criada. Como é mutável, você pode fazer o que precisar com ela. Aqui, apenas trocamos o boolean que ela envolve quando o predicate se torna true, e nesse caso empurramos os elementos para o downstream. Observe que este integrator sempre retorna true, o que na verdade não é o correto a fazer. Corrigiremos isso mais tarde.

A maior diferença é que agora você precisa chamar o método de fábrica [`Gatherer.ofSequential()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherers.html#ofSequential\(java.util.function.Supplier,java.util.stream.Gatherer.Integrator\)>) em vez do método de fábrica simples [`Gatherer.of()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.html#of\(java.util.stream.Gatherer.Integrator\)>). Usar `ofSequential()` em vez de `of()` informa à API que este gatherer não pode ser usado em paralelo. Você aprenderá mais sobre parallel gatherers mais adiante nesta seção e por que você não pode usar este gatherer em paralelo.

Você pode escrever este gatherer de uma maneira diferente, usando anonymous classes e aproveitando non-denotable types.

```java
import java.util.function.Predicate;
import java.util.stream.Gatherer;
import java.util.stream.Gatherers;
import java.util.stream.Stream;

public class DropWhileGathererAnonymousClassExample {

    public static <T> Gatherer<Object, T, T> dropWhile(Predicate<T> predicate) {
        return Gatherers.ofSequential(
                () -> new Object() {
                    boolean open = false;
                },
                (box, element, downstream) -> {
                    if (box.open) {
                        downstream.push(element);
                    } else if (!predicate.test(element)) {
                        box.open = true;
                        downstream.push(element);
                    }
                    return true;
                });
    }

    public static void main(String[] args) {
        Stream.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
              .gather(dropWhile(i -> i < 5))
              .forEach(System.out::println);
    }
}
```

A execução do código anterior fornece o mesmo resultado de antes.

```
5
6
7
8
9
10
```

Este código funciona porque uma anonymous class é compilada como um non-denotable type, que é preservado desde que você não coloque esta variável em uma variável de tipo não inferido. Aqui, o tipo do argumento `box` na linha 4 é inferido pelo compilador, este tipo é preservado, e você pode acessar o field na sua anonymous class.

Dito isso, se você fornecer um tipo explícito, então o non-denotable type não é usado pelo compilador e é perdido. Usar classes locais de método pode ser mais legível e sempre funcionará.

### Removendo Duplicatas em um Stream

Permita-me guiá-lo por um segundo exemplo, que consiste em implementar um comportamento semelhante a [`distinct()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#distinct\(\)>).

Toda vez que você consome um elemento, precisa verificar se ele já foi visto ou não. E, nesse caso, você não deve empurrá-lo para o downstream. Você pode usar um [`HashSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html>) regular como seu estado mutável, sem a necessidade de envolvê-lo ou torná-lo thread-safe, pois será usado em uma única thread.

Uma das boas características do método [`Set.add()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html#add\(E\)>) é que ele retorna `true` se o objeto foi adicionado, significando que não estava no conjunto, e `false` se não foi. Então você pode usar este recurso neste caso.

Vamos criar este gatherer.

```java
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Gatherer;
import java.util.stream.Gatherers;
import java.util.stream.Stream;

public class DistinctGathererExample {

    public static <T> Gatherer<Set<T>, T, T> distinct() {
        return Gatherers.ofSequential(
                HashSet::new,
                (seen, element, downstream) -> {
                    if (seen.add(element)) {
                        downstream.push(element);
                    }
                    return true;
                });
    }

    public static void main(String[] args) {
        Stream.of(1, 2, 2, 3, 1, 4, 5, 5, 6)
              .gather(distinct())
              .forEach(System.out::println);
    }
}
```

A execução do exemplo anterior imprime o seguinte.

```
1
2
3
4
5
6
```

Mais uma vez, o `return true` na linha 8 não é o código correto, você o corrigirá mais tarde.
## Interrompendo um Stream

Interromper um stream é algo que pode ser feito por várias operações intermediárias, incluindo [`limit()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#limit\(long\)>) e [`takeWhile()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#takeWhile\(java.util.function.Predicate\)>).

Suponha que você tenha uma lista com um milhão de elementos e chame o seguinte código.

Seria muito ineficiente processar todos os elementos de `ints`, e é por isso que esta chamada `limit()` tem a capacidade de informar ao seu upstream que não processará mais elementos. Acontece que este upstream é retornado por uma chamada `map()`. A implementação desta operação deve gerenciar esta interrupção e passá-la para o seu upstream. Este upstream puxa elementos da lista, então ele deve parar de fazer isso.

A Gatherer API suporta este comportamento. Ela é capaz de verificar se o seu downstream ainda aceita mais elementos e de transmitir esta informação ao seu upstream. Se este gatherer decidir que deve interromper o stream, ele também pode passar esta informação ao seu upstream.

Você pode verificar se o seu downstream ainda aceita elementos de duas maneiras.

1.  Você pode chamar [`downstream.isRejecting()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.Downstream.html#isRejecting\(\)>) que retorna `true` se o downstream não aceitar mais elementos.
2.  Você também pode verificar o valor retornado de [`downstream.push()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.Downstream.html#push\(T\)>). Se for `false`, então o seu downstream não aceita mais elementos.

### Limitando o Número de Elementos Empurrados para o Downstream

Vamos implementar uma operação `limit()`. Implementar tal funcionalidade requer um contador mutável e um integrator que irá tanto incrementar este contador quanto verificar se o limite foi atingido. Você pode escrever o seguinte código.

Terminamos de retornar `true`. Agora você pode ver que este código processa o que o downstream está lhe dizendo.

Este código está funcionando corretamente, mas não é o melhor que você pode escrever. Existem três princípios relacionados ao estado _rejecting_ de um downstream.

1.  Um novo downstream sempre começa no estado _non-rejecting_.
2.  Um downstream só pode mudar este estado de _non-rejecting_ para _rejecting_. Assim, um downstream rejecting permanece nesse estado.
3.  Um downstream só pode mudar este estado quando você empurra um elemento para ele.

Seguindo estes três princípios, estas primeiras linhas do seu integrator tornam-se inúteis.

Quando você obtém seu downstream pela primeira vez, `downstream.isRejecting()` retorna `false`, mesmo que sua chamada para `gather()` seja seguida por um `limit(0L)`. E como você retorna o `boolean` retornado pela chamada para `downstream.push(element)`, este código não pode ser chamado quando este downstream está rejeitando. Então você pode remover essas linhas com segurança. Falaremos mais sobre chamar `downstream.isRejecting()` mais tarde nesta seção, quando começarmos a criar finishers.

O código correto que você deve usar é mais simples, é o seguinte.

Executar este código produz o seguinte.

Na linha 10, você empurra mais um elemento, obtém o valor retornado da chamada [`downstream.push()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.Downstream.html#push\(T\)>) e o transmite imediatamente para o seu upstream. Se o booleano que você retorna for `false`, então este integrator não será chamado novamente.

Então, se você chegar à linha 12, significa que você empurrou elementos suficientes para o seu downstream e que você terminou com ele. Então você retorna `false` independentemente do que aconteça.

### Corrigindo o Gatherer Distinct

Com isso em mente, você pode agora corrigir os exemplos anteriores que foram deixados com `return true` como placeholders. Aqui está a versão correta do exemplo Distinct, assumindo que seu downstream não pode começar em um estado de rejeição.

Executar este exemplo produz o seguinte.

Ele segue os princípios do gatherer Limit.

1.  Quando você precisa empurrar um novo elemento, você o empurra e transmite o booleano retornado por `downstream.push()`. Se você retornou `false`, então seu integrator não será mais chamado.
2.  Se o elemento que você processa já foi visto, então você não o empurra. Mas você pode empurrar algo novamente no futuro. Então você precisa retornar `true`. Você não precisa verificar o estado de rejeição do seu downstream, porque você sabe que ele é `false`. De fato, seu integrator está sendo chamado atualmente, então ele certamente é `false`, e você não chamou `downstream.push()`, então ele não poderia mudar.

Em qualquer caso, você precisa ter em mente que, uma vez que você retorna `false`, você não deve decidir retornar `true` novamente. Como o downstream do seu upstream, você precisa seguir a regra de que um downstream nunca pode mudar do estado de não aceitação para o estado de aceitação.

Lembre-se que, uma vez que você retorna `false`, seu integrator não é mais chamado.

### Empurrando para um Downstream Rejecting

O que pode acontecer se você ignorar o que seu downstream está lhe dizendo e continuar empurrando elementos para um downstream? Bem, na verdade, nada. Os elementos que você empurra são silenciosamente ignorados. Nenhuma exceção é lançada se você fizer isso. É apenas um desperdício de recursos e uma sobrecarga que você poderia evitar. Em alguns casos, essa sobrecarga pode ser muito cara.

## Criando Integrators Greedy

Você tem dois métodos de fábrica na interface [`Integrator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.Integrator.html>).

1.  [`Integrator.of()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.Integrator.html#of\(java.util.stream.Gatherer.Integrator\)>) que recebe um [`Gatherer.Integrator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.Integrator.html>) simples como parâmetro.
2.  [`Integrator.ofGreedy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.Integrator.html#ofGreedy\(java.util.stream.Gatherer.Integrator.Greedy\)>) que recebe um [`Gatherer.Integrator.Greedy`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.Integrator.Greedy.html>) como parâmetro.

Existem duas coisas que você precisa ter em mente:

1.  [`Gatherer.Integrator.Greedy`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.Integrator.Greedy.html>) é uma extensão de [`Gatherer.Integrator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.Integrator.html>).
2.  Ambas as interfaces podem ser implementadas com as mesmas expressões lambda.

Então você pode escrever o seguinte. Estes dois integrators são estritamente equivalentes.

E você também pode escrever o seguinte. Estes dois integrators também são estritamente equivalentes.

Além disso, estes quatro integrators funcionam da mesma forma. Do ponto de vista comportamental, não há diferença entre eles.

Definir um integrator como _greedy_ significa que este integrator nunca escolhe interromper um stream por conta própria. Ele sempre transmite o estado de rejeição do downstream para o qual ele empurra elementos, ou `true` se ele não empurrar nada. Assim, internamente, a Gatherer API pode levar isso em consideração e pode ativar algumas otimizações para executar seu gatherer. Se você não seguir o contrato de um integrator greedy, seu código pode falhar. Se você tiver um integrator simples que tem um comportamento greedy, seu código não falhará, mas você pode perder algumas oportunidades de otimização.

Então, em um primeiro passo, você poderia optar por ignorar este comportamento greedy e se ater a integrators simples. Uma vez que você tenha configurado seu pipeline de processamento de dados, você pode então revisitar cada etapa e tornar os integrators correspondentes greedy.

## Adicionando um Finisher

Existem casos em que seu gatherer precisa esperar por todos os elementos de seu upstream para começar a empurrar elementos para seu downstream. Este é o caso se você precisar criar um gatherer que ordene os elementos do seu upstream. Você não pode começar a produzir elementos até que tenha visto todos eles.

Tal gatherer precisa adicionar todos os elementos que vê a um buffer interno. Então, quando não houver mais elementos empurrados para seu integrator, empurre esses elementos para o downstream. Até agora você não viu nenhuma solução para fazer isso. Nada está dizendo ao seu gatherer que não há mais elementos vindo do upstream. Na verdade, o upstream empurra elementos para o integrator do seu gatherer, e quando não há mais elementos, nada acontece.

É por isso que a Gatherer API lhe oferece outro elemento, chamado _finisher_, que é chamado pela implementação quando não há mais elementos a serem empurrados para o seu integrator.

Este finisher pode ser visto como um integrator simplificado.

1.  Ele recebe o estado atual do seu gatherer, se você definiu um fornecendo um initializer.
2.  Ele não recebe o elemento atual do stream, justamente porque quando é chamado, não há mais elementos, precisamente.
3.  Ele recebe o downstream para que você possa empurrar elementos para ele.
4.  Ele não retorna nada, já que depois que este finisher é chamado, nada mais pode acontecer de qualquer forma.

Assim, um finisher recebe dois parâmetros: seu estado e o downstream, e não retorna nada. Ele é modelado por um `BiConsumer<State, Downstream>`.

### Criando um Finisher sem Estado

Vamos escrever um finisher simples, em um caso onde seu gatherer não define nenhum estado mutável interno.

Aqui definimos um gatherer de mapeamento e, por alguma razão, precisamos adicionar "DONE" ao final do stream. O finisher que você tem é um biconsumer, mas como este gatherer não define nenhum estado, o primeiro parâmetro é do tipo [`Void`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Void.html>) e é ignorado.

Executar o código anterior produz o seguinte.

### Criando um Gatherer Distinct de Ordenação com um Finisher

Ordenar um stream requer adicionar todos os elementos a um buffer antes de começar a empurrá-los para o downstream. Este buffer é o estado mutável interno do seu gatherer. O papel do integrator é armazenar todos os elementos neste buffer. O empurrar dos elementos é então feito pelo finisher.

Você pode então escrever o seguinte código. Observe que estamos usando um [`TreeSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TreeSet.html>) para simplificar o código, o que tem o efeito adicional de remover os duplicados do seu stream.

Executar este código imprime o seguinte.

Vários pontos merecem ser notados neste gatherer.

1.  Os elementos são adicionados a um [`TreeSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TreeSet.html>) para que sejam mantidos ordenados. Ele também remove os duplicados.
2.  O integrator não empurra nenhum elemento para o seu downstream. Como `downstream.push()` nunca é chamado, este downstream permanece em seu estado original, que é non-rejecting.
3.  O finisher precisa verificar se o downstream ainda está aceitando elementos após cada chamada para [`downstream.push()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.Downstream.html#push\(T\)>). Usar [`takeWhile()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#takeWhile\(java.util.function.Predicate\)>) se mostra muito útil aqui.

Observe que estamos usando o seguinte padrão para empurrar os elementos para o downstream. De fato, o que você deveria fazer é: enquanto estiver em um estado non-rejecting, empurre os elementos para o downstream. Isso você pode facilmente traduzir para este código, graças à expressividade da Stream API.

Você também pode usar o seguinte padrão, que faz a mesma coisa, de uma forma mais eficiente.

### Corrigindo o Flat-Mapper

Você também pode usar o exemplo anterior para finalmente corrigir o flat-mapper que mencionamos anteriormente. O código completo e correto, que lida com streams paralelos, o fechamento do stream e a possível [`NullPointerException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NullPointerException.html>) é o seguinte.

Executar este código produz o mesmo resultado.

### Finisher e Estado de Rejeição do Downstream

A Gatherer API sempre chama seu finisher uma vez que ele termina de empurrar elementos para seu integrator. Pode haver casos em que o downstream mudou para um estado de rejeição enquanto seu integrator estava empurrando elementos para ele. Então você pode optar por primeiro verificar o estado de rejeição do seu downstream, para ter certeza de que não está fazendo cálculos caros em vão no seu finisher. Verificar o estado de rejeição do seu downstream no seu integrator é inútil, mas pode ser útil no seu finisher.

## Gatherers Paralelos

### Executando Gatherers em Streams Paralelos

Uma das características incríveis da Stream API é que você pode distribuir seus cálculos entre todos os núcleos da sua CPU simplesmente chamando [`parallel()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#parallel\(\)>) em um stream existente.

Gatherers suportam streams paralelos de duas maneiras.

Quando você cria um gatherer com um dos métodos de fábrica [`Gatherer.of()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.html#of\(java.util.stream.Gatherer.Integrator\)>), você cria um gatherer que pode ser chamado em paralelo.

Por outro lado, quando você usa o [`Gatherer.ofSequential()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherers.html#ofSequential\(java.util.function.Supplier,java.util.stream.Gatherer.Integrator\)>), você cria um gatherer que não suporta paralelização.

O que significa ser chamado em paralelo, ou não suportar paralelização? Na Stream API, se você decidir tornar seu stream um stream paralelo, então todas as operações do seu stream serão executadas em diferentes threads, em paralelo. Em resumo: um stream paralelo divide sua fonte de dados em vários pedaços, e cada pedaço é processado em sua própria thread, nos diferentes núcleos da sua CPU. Uma vez que tudo foi processado, você termina com resultados parciais que precisam ser mesclados em um só. Assim, cada operação intermediária é executada em paralelo, sem ter que sincronizar o que está acontecendo em outras threads. Existem exceções a isso, pois algumas operações intermediárias precisam sincronizar. Este é o caso para [`limit()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#limit\(long\)>), [`takeWhile()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#takeWhile\(java.util.function.Predicate\)>), [`distinct()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#distinct\(\)>), [`sorted()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#sorted\(\)>), e algumas outras.

Isso não se aplica à Gatherer API. Se você usar um gatherer em um stream paralelo, duas coisas podem acontecer.

1.  Seu gatherer suporta paralelismo. Nesse caso, tudo é executado em paralelo, como você espera.
2.  Seu gatherer não suporta paralelismo, ele é chamado de gatherer _sequencial_. Você o criou usando um dos métodos [`Gatherer.ofSequential()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherers.html#ofSequential\(java.util.function.Supplier,java.util.stream.Gatherer.Integrator\)>), e tais gatherers só podem ser usados sequencialmente. Nesse caso, todas as operações antes da sua chamada para [`gather()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#gather\(java.util.stream.Gatherer\)>) são executadas em paralelo, assim como se fosse um stream paralelo regular, então seu gatherer é executado em uma única thread e empurra elementos para um único downstream, e o restante do stream é novamente executado em paralelo.

Então, mesmo que você tenha um gatherer que não suporte paralelismo por algum motivo, você ainda pode se beneficiar do desempenho proporcionado pelos streams paralelos. Esta funcionalidade é única da Gatherer API.

### Criando Gatherers Paralelos

Você tem três padrões para escolher para criar um gatherer paralelo.

Os dois primeiros são equivalentes aos que você tem em gatherers sequenciais.

1.  [`Gatherer.of(integrator)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.html#of\(java.util.stream.Gatherer.Integrator\)>). Você já viu este padrão anteriormente nesta seção. Seu gatherer não depende de nenhum estado mutável interno e não precisa de nenhum finisher. Existe uma versão sequencial deste método: [`Gatherer.ofSequential(integrator)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherers.html#ofSequential\(java.util.function.Supplier,java.util.stream.Gatherer.Integrator\)>).
2.  [`Gatherer.of(integrator, finisher)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.html#of\(java.util.stream.Gatherer.Integrator,java.util.function.BiConsumer\)>). Este gatherer não precisa de nenhum estado mutável e possui um finisher. Este também é um padrão que você viu anteriormente nesta seção. Existe também uma versão sequencial deste método: [`Gatherer.ofSequential(integrator, finisher)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherers.html#ofSequential\(java.util.function.Supplier,java.util.stream.Gatherer.Integrator\)>).
3.  [`Gatherer.of(initializer,integrator,combiner,finisher)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.html#of\(java.util.function.Supplier,java.util.stream.Gatherer.Integrator,java.util.function.BinaryOperator,java.util.function.BiConsumer\)>). Este é o padrão que vamos abordar agora.

O terceiro padrão declara um estado mutável. Na Gatherer API, este estado mutável não é compartilhado entre as diferentes threads do seu stream paralelo. Assim, toda vez que a Stream API executa um gatherer em uma thread, ela cria uma nova instância deste estado mutável para que este gatherer trabalhe. Por um lado, isso facilita sua vida, porque você não precisa se preocupar com um estado mutável thread-safe, já que ele nunca é compartilhado.

Mas, por outro lado, você precisa de uma maneira de mesclar essas diferentes instâncias, em uma única, uma vez que você terminou sua computação. Isso torna o método de fábrica correspondente um pouco mais complexo, pois você precisa fornecer um quarto parâmetro, chamado _combiner_, que pode combinar duas instâncias do seu estado mutável.

Então, agora existem quatro parâmetros para este método de fábrica.

1.  O _initializer_, que é um [`Supplier`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Supplier.html>).
2.  O _integrator_, que recebe o estado mutável atual, o elemento que você precisa integrar e o downstream. Este método retorna um booleano para indicar se ele terminou de aceitar elementos ou não.
3.  O _combiner_, que recebe duas instâncias do estado mutável e retorna uma. Ele é modelado por um [`BinaryOperator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BinaryOperator.html>). Ele pode retornar uma das duas instâncias, ou criar uma nova. Este combiner pode ser chamado qualquer número de vezes, dependendo do número de vezes que sua fonte de dados foi dividida.
4.  O _finisher_, que é o [`BiConsumer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiConsumer.html>) sobre o qual já falamos. Este finisher é chamado apenas uma vez, no final da sua computação.

Se, por algum motivo, você precisar de um estado mutável interno, mas não puder criar um combiner, então a Stream API não poderá executar seu gatherer em paralelo, pois não seria capaz de combinar as instâncias deste estado mutável. Você precisaria então usar um gatherer sequencial.

Vamos tornar nosso gatherer de ordenação um gatherer paralelo.

Executar o código anterior imprime o seguinte.
## Encadeando Gatherers

A API Gatherer expõe um método [`andThen()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherer.html#andThen\(java.util.stream.Gatherer\)>). Você pode encadear gatherers existentes para criar mais gatherers com este método.

Você pode ver o encadeamento em ação em alguns dos gatherers que você escreveu anteriormente nesta seção.

A execução do exemplo anterior imprime o seguinte.

Como você pode imaginar, existem restrições nos gatherers que você deseja encadear. O tipo dos elementos produzidos pelo primeiro precisa corresponder ao tipo dos elementos aceitos pelo segundo.

## Criando Gatherers com a Classe de Fábrica Gatherers

O último elemento da Stream API que você precisa conhecer é a classe de fábrica [`Gatherers`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherers.html>). Existem cinco métodos de fábrica nela, que criam gatherers prontos para uso que você pode criar em sua aplicação.

### Folding

O método [`fold()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherers.html#fold\(java.util.function.Supplier,java.util.function.BiFunction\)>) implementa uma operação de redução, implementada da esquerda para a direita, útil para casos onde você não pode escrever um combiner.

Folding se parece com a redução de um stream. Mas a operação de redução exige que seu operador tenha várias propriedades, entre elas associatividade e, em alguns casos, um elemento de identidade. Quando sua operação de redução não possui um elemento de identidade, o método [`reduce()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#reduce\(java.util.function.BinaryOperator\)>) correspondente retorna um optional, que fica vazio caso você esteja reduzindo um stream vazio.

Folding não possui essas restrições. Um folding apenas aplica um operador (neste caso, uma [`BiFunction`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiFunction.html>)) em seus elementos para produzir um resultado. Ele também recebe um [`Supplier`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Supplier.html>) para inicializar o processo.

Observe que este gatherer implementa seu folding como uma operação intermediária. Assim, você termina com um stream que pode produzir apenas um único elemento. Se você precisar obter este elemento, você precisa chamar `findFirst().orElseThrow()` nele. Se você precisar processar seus dados ainda mais, talvez usar um collector seja uma boa solução.

Você pode executar o seguinte código para ver este gatherer em ação.

A execução do código anterior imprime o seguinte.

### Scanning

O método de fábrica [`scan()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherers.html#scan\(java.util.function.Supplier,java.util.function.BiFunction\)>) cria um gatherer que funciona com dois elementos.

1.  Um supplier, que cria um valor inicial.
2.  E uma [`BiFunction`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiFunction.html>).

Cada vez que o upstream envia um novo elemento para este gatherer, ele aplica a [`BiFunction`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiFunction.html>) ao elemento anterior e a este próximo elemento do upstream, e então envia o resultado para o downstream.

Você pode construir um exemplo similar ao exemplo de _fold_. Mesmo que os dois gatherers _fold_ e _scan_ pareçam similares, há uma diferença principal, que é que o gatherer _fold_ apenas envia o último elemento para o downstream. Assim, ele atua como um redutor dentro de uma operação intermediária. O gatherer _scan_ envia todos os elementos à medida que os processa.

A execução do código anterior imprime o seguinte.

### Mapeando Concorrentemente

O método de fábrica [`mapConcurrent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherers.html#mapConcurrent\(int,java.util.function.Function\)>) cria um gatherer que pode mapear seus dados concorrentemente. O gatherer que ele produz não é um gatherer paralelo, pois é criado internamente com o método de fábrica [`Gatherer.ofSequential()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherers.html#ofSequential\(java.util.function.Supplier,java.util.stream.Gatherer.Integrator,java.util.function.BiConsumer\)>).

Este gatherer consome todos os elementos que pode, então os mapeia usando a [`Function`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html>) que você passa como argumento. Cada mapeamento é executado em uma virtual thread lançada especificamente para o mapeamento deste elemento. O número de virtual threads ativas em um dado momento é controlado pelo argumento `maxConcurrency`.

### Gatherers de Janelamento

Os dois últimos métodos de fábrica criam gatherers que trabalham com janelas. Uma janela é um intervalo de índices em seu stream. Chamar um gatherer de janelamento em um stream não ordenado (no sentido [`ORDERED`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Spliterator.html#ORDERED>)) não faz sentido, pois várias execuções nos mesmos dados poderiam levar a resultados diferentes e inconsistentes.

Existem muitas estratégias para criar tais janelas. A API oferece duas.

1.  A primeira, chamada _janela fixa_, fornece um stream de índices disjuntos: `[0,1,2], [3,4,5], [6,7,8], ...`. Assim, nenhum elemento é repetido de uma janela para a seguinte. A última janela pode estar incompleta, pois o número de elementos que o upstream pode produzir pode não ser exatamente divisível pelo tamanho da janela que você precisa.
2.  A segunda, chamada _janela deslizante_, fornece um stream onde o primeiro índice de cada janela é incrementado em 1: `[0,1,2], [1,2,3], [2,3,4], ...`. Todas as janelas deste stream têm o mesmo comprimento.

#### Janela Fixa

O método de fábrica [`windowFixed(windowSize)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherers.html#windowFixed\(int\)>) cria um gatherer que armazena os elementos enviados pelo upstream em listas não modificáveis de tamanho `windowSize`. O índice do primeiro elemento de cada lista é incrementado por `windowSize`. Assim, um dado elemento do upstream é armazenado apenas uma vez em uma lista não modificável. Cada lista é enviada para o downstream deste gatherer quando está pronta. A última lista contém todos os elementos restantes enviados pelo upstream. Se você tiver sorte, haverá a quantidade certa (`windowSize`), mas seu código não deve depender disso.

Vamos escrever o seguinte exemplo para ver este gatherer em ação.

A execução do código anterior imprime o seguinte. Como você pode ver, a última janela é mais curta que as outras, pois há apenas cinco elementos produzidos por este stream.

#### Janela Deslizante

O método de fábrica [`windowSliding(windowSize)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Gatherers.html#windowSliding\(int\)>) cria um gatherer que armazena os elementos enviados pelo upstream em listas não modificáveis de tamanho `windowSize`. O índice do primeiro elemento de cada lista é incrementado em 1. Assim, um dado elemento do upstream é armazenado em `windowSize` listas não modificáveis. Esta regra não se aplica aos últimos elementos do upstream. Cada lista é enviada para o downstream deste gatherer quando está pronta. A última lista contém a mesma quantidade de elementos que todas as outras listas. Assim, o último elemento enviado pelo upstream está presente apenas na última lista não modificável enviada para o downstream.

Você pode escrever um primeiro exemplo básico para ver este gatherer em ação.

A execução do exemplo anterior imprime o seguinte.

Observe que para este gatherer, todas as janelas produzidas têm o mesmo tamanho, desde que o upstream produza mais elementos do que o tamanho da janela que você escolheu.

Como os elementos do stream coletado são eles próprios listas, você pode processá-los ainda mais usando a Stream API. Vamos fazer isso criando um gatherer que calcula a média de cada janela, compondo dois gatherers.

A execução do código anterior imprime o seguinte.

### Neste tutorial

Introduzindo Gatherers Integrando Elementos em um Downstream Gerenciando um Estado Mutável Interno Interrompendo um Stream Adicionando um Finisher Gatherers Paralelos Encadeando Gatherers Criando Gatherers com a Classe de Fábrica Gatherers

Última atualização: 3 de março de 2025

**Anterior na Série**

[Parallelizing Streams](<#/doc/tutorials/api/streams/parallel-streams>)

➜

**Tutorial Atual**

A API Gatherer

➜

Este é o fim da série!

**Anterior na Série:** [Parallelizing Streams](<#/doc/tutorials/api/streams/parallel-streams>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A Stream API ](<#/doc/tutorials/api/streams>) > A API Gatherer