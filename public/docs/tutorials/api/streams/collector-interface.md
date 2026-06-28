# Implementando a Interface Collector

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Stream ](<#/doc/tutorials/api/streams>) > Implementando a Interface Collector

**Anterior na Série**

[Criando Seu Próprio Collector](<#/doc/tutorials/api/streams/custom-collectors>)

➜

**Tutorial Atual**

Implementando a Interface Collector

➜

**Próximo na Série**

[Usando Optionals](<#/doc/tutorials/api/streams/optionals>)

**Anterior na Série:** [Criando Seu Próprio Collector](<#/doc/tutorials/api/streams/custom-collectors>)

**Próximo na Série:** [Usando Optionals](<#/doc/tutorials/api/streams/optionals>)

# Implementando a Interface Collector

## Por Que Você Implementaria a Interface Collector?

Existem três maneiras de criar seu próprio collector.

Examinamos a primeira neste tutorial. Ela consiste em combinar collectors existentes com os diferentes mecanismos oferecidos pela classe de fábrica [`Collectors`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html>), ou seja, passando um collector como um downstream collector para outro collector ou usando um finisher com o collector [`collectingAndThen()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#collectingAndThen\(java.util.stream.Collector,java.util.function.Function\)>).

Você também pode chamar o método [`collect()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#collect\(java.util.function.Supplier,java.util.function.ObjIntConsumer,java.util.function.BiConsumer\)>) que recebe os três elementos sobre os quais um collector é construído. Esses métodos estão disponíveis tanto para streams de tipos primitivos quanto para streams de objetos. Eles recebem os três argumentos que apresentamos nas seções anteriores.

1.  O _supplier_ usado para criar o contêiner mutável no qual os elementos do stream são acumulados.
2.  O _accumulator_ , modelado por um biconsumer.
3.  O _combiner_ , também modelado por um bi-consumer, usado para combinar dois contêineres parcialmente preenchidos, utilizado no caso de streams paralelos.

A terceira maneira consiste em implementar a interface [`Collector`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.html>) você mesmo, e passar sua implementação para o método [`collect()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#collect\(java.util.stream.Collector\)>) que já abordamos. Implementar seu próprio collector oferece máxima flexibilidade, mas também é mais técnico.

## Compreendendo os Tipos de Parâmetro de Collector

Vamos examinar os parâmetros desta interface.

Vamos primeiro examinar os seguintes tipos: `T` e `R`.

O primeiro tipo é `T`, e corresponde ao tipo dos elementos do stream que este collector está processando.

O último tipo é `R`, e é o tipo produzido por este collector.

Para o collector [`toList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toList\(\)>), chamado em uma instância de [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>), o tipo `R` seria [`List<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>). Seria [`Set<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) para o collector [`toSet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toSet\(\)>).

O método [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function\)>) recebe uma função para calcular as chaves do mapa retornado. Se você estiver coletando um [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>) com este collector, então você precisa passar uma função que possa mapear instâncias de `T`. Ela pode mapeá-las para qualquer instância do tipo `K` para criar as chaves do mapa. Assim, o tipo do mapa resultante será [`Map<K, List<T>>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>). Portanto, o tipo `R` é exatamente este: [`Map<K, List<T>>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>).

O tipo `A` é mais complexo de lidar. Você pode ter tentado usar sua IDE para armazenar um dos collectors que você criou nos exemplos anteriores. Se você fez isso, provavelmente percebeu que sua IDE não forneceu um valor explícito para este tipo. Este é o caso para os exemplos a seguir.

A execução do código anterior imprime o seguinte.

Para todos esses collectors, o segundo tipo de parâmetro é apenas `?`.

Se você precisar implementar a interface [`Collector`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.html>), então você terá que dar um valor explícito para `A`. O tipo `A` é o tipo do contêiner mutável intermediário usado por este collector. Para o collector [`toList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toList\(\)>) seria [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>), e para o collector [`toSet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html>) seria [`HashSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html>). Acontece que este tipo `A` é ocultado pelo tipo de retorno declarado pelo método de fábrica [`toList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toList\(\)>), que é a razão pela qual você não pode substituir o tipo `?` por [`ArrayList<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) no exemplo anterior.

Mesmo que o contêiner mutável interno seja retornado diretamente pela implementação, pode acontecer que os tipos `A` e `R` sejam diferentes. Por exemplo, no caso do collector [`toList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toList\(\)>), você poderia implementar a interface [`Collector<T, A, R>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.html>) fixando [`ArrayList<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) para `A` e [`List<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) para `R`.

## Compreendendo as Características de um Collector

Um collector define características internas que são usadas pela implementação do stream para otimizar o uso deste collector.

Existem três características.

1.  A característica [`IDENTITY_FINISH`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.Characteristics.html#IDENTITY_FINISH>) indica que o finisher deste collector é a função identidade. A implementação não chamará o finisher para um collector com esta característica.
2.  A característica [`UNORDERED`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.Characteristics.html#UNORDERED>) indica que este collector não preserva a ordem em que processa os elementos do stream. Este é o caso do collector [`toSet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toSet\(\)>), que possui esta característica. O collector [`toList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toList\(\)>), por outro lado, não a possui.
3.  A característica [`CONCURRENT`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.Characteristics.html#CONCURRENT>) indica que o contêiner no qual o accumulator armazena os elementos processados suporta acesso concorrente. Este ponto é importante para streams paralelos.

Essas características são definidas na enumeração [`Collector.Characteristics`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.Characteristics.html>) e são retornadas em um conjunto pelo método [`characteristics()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.html#characteristics\(\)>) definido na interface [`Collector`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.html>).

## Implementando o Collector toList() e toSet()

Com esses elementos, você pode agora recriar uma implementação de um collector que funciona como o collector [`toList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toList\(\)>).

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.function.BiConsumer;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collector;
import java.util.stream.Stream;

public class MyCollectors {

    public static <T> Collector<T, List<T>, List<T>> toList() {
        return new Collector<T, List<T>, List<T>>() {
            @Override
            public Supplier<List<T>> supplier() {
                return ArrayList::new;
            }

            @Override
            public BiConsumer<List<T>, T> accumulator() {
                return List::add;
            }

            @Override
            public BinaryOperator<List<T>> combiner() {
                return (left, right) -> {
                    left.addAll(right);
                    return left;
                };
            }

            @Override
            public Function<List<T>, List<T>> finisher() {
                return Function.identity();
            }

            @Override
            public Set<Characteristics> characteristics() {
                return Collections.emptySet();
            }
        };
    }

    public static void main(String[] args) {
        List<String> collected = Stream.of("one", "two", "three")
                                       .collect(MyCollectors.toList());
        System.out.println(collected);
    }
}
```

Este código imprime o seguinte resultado.

```
[one, two, three]
```

A implementação de um collector que funciona como o collector [`toSet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toSet\(\)>) precisaria de apenas duas modificações.

*   O método [`supplier()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.html#supplier\(\)>) retornaria `HashSet::new`.
*   O método [`characteristics()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.html#characteristics\(\)>) adicionaria [`Characteristics.UNORDERED`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.Characteristics.html#UNORDERED>) ao conjunto retornado.

## Implementando o Collector joining()

Recriar a implementação deste collector é interessante porque ele opera apenas em strings, e seu finisher não é a função identidade.

Este collector acumula as strings que processa em uma instância de [`StringBuffer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuffer.html>) e então chama o método [`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuffer.html#toString\(\)>) neste accumulator para produzir o resultado final.

O conjunto de características está vazio para este collector. Ele preserva a ordem em que os elementos são processados (portanto, sem características _UNORDERED_), seu finisher não é a função identidade, e ele não pode ser usado concorrentemente.

Vamos ver como este collector poderia ser implementado.

```java
import java.util.Collections;
import java.util.Set;
import java.util.function.BiConsumer;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collector;
import java.util.stream.Stream;

public class MyJoiningCollector {

    public static Collector<CharSequence, StringBuffer, String> joining() {
        return new Collector<CharSequence, StringBuffer, String>() {
            @Override
            public Supplier<StringBuffer> supplier() {
                return StringBuffer::new;
            }

            @Override
            public BiConsumer<StringBuffer, CharSequence> accumulator() {
                return StringBuffer::append;
            }

            @Override
            public BinaryOperator<StringBuffer> combiner() {
                return StringBuffer::append;
            }

            @Override
            public Function<StringBuffer, String> finisher() {
                return StringBuffer::toString;
            }

            @Override
            public Set<Characteristics> characteristics() {
                return Collections.emptySet();
            }
        };
    }

    public static void main(String[] args) {
        String collected = Stream.of("one", "two", "three")
                                 .collect(MyJoiningCollector.joining());
        System.out.println(collected);
    }
}
```

A execução deste código produz o seguinte resultado.

```
onetwothree
```

Suportar um delimitador, um prefixo e um sufixo usaria um [`StringJoiner`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/StringJoiner.html>) em vez de um [`StringBuilder`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html>), que já suporta esses elementos.

### Neste tutorial

Por Que Você Implementaria a Interface Collector? Compreendendo os Tipos de Parâmetro de Collector Compreendendo as Características de um Collector Implementando o toList() Implementando o joining()

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Criando Seu Próprio Collector](<#/doc/tutorials/api/streams/custom-collectors>)

➜

**Tutorial Atual**

Implementando a Interface Collector

➜

**Próximo na Série**

[Usando Optionals](<#/doc/tutorials/api/streams/optionals>)

**Anterior na Série:** [Criando Seu Próprio Collector](<#/doc/tutorials/api/streams/custom-collectors>)

**Próximo na Série:** [Usando Optionals](<#/doc/tutorials/api/streams/optionals>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Stream ](<#/doc/tutorials/api/streams>) > Implementando a Interface Collector