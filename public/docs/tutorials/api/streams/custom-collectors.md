# Criando Seu Próprio Collector

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Stream ](<#/doc/tutorials/api/streams>) > Criando Seu Próprio Collector

**Anterior na Série**

[Usando um Collector como Operação Terminal](<#/doc/tutorials/api/streams/using-collectors>)

➜

**Tutorial Atual**

Criando Seu Próprio Collector

➜

**Próximo na Série**

[Implementando a Interface Collector](<#/doc/tutorials/api/streams/collector-interface>)

**Anterior na Série:** [Usando um Collector como Operação Terminal](<#/doc/tutorials/api/streams/using-collectors>)

**Próximo na Série:** [Implementando a Interface Collector](<#/doc/tutorials/api/streams/collector-interface>)

# Criando Seu Próprio Collector

## Entendendo Como um Collector Funciona

Como mencionamos anteriormente, a classe de fábrica [`Collectors`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html>) lida apenas com streams de objetos porque o método [`collect()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#collect\(java.util.stream.Collector\)>) que recebe um objeto collector como argumento existe apenas em [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>). Se você precisa coletar um stream de números, então você precisa entender quais são os elementos de construção de um collector.

Em resumo, um collector é construído sobre quatro componentes básicos. Os dois primeiros são usados para coletar os elementos do stream. O terceiro é necessário apenas para streams paralelos. O quarto é necessário para certos tipos de collectors, que precisam de um pós-processamento no container construído.

O primeiro componente é usado para criar o container no qual os elementos do stream serão coletados. Este container é fácil de identificar. Por exemplo, nos casos que abordamos na parte anterior, usamos a classe [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>), a classe [`HashSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html>), ou a classe [`HashMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashMap.html>). A criação de tal container pode ser modelada com uma instância de [`Supplier`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Supplier.html>). Este primeiro componente é chamado de _supplier_.

O segundo componente modela a adição de um único elemento do stream a este container. Esta operação será chamada repetidamente pela implementação da Stream API, para adicionar todos os elementos do stream um por um ao container.

Na Collector API, este componente é modelado por uma instância de [`BiConsumer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiConsumer.html>). Este biconsumer recebe dois argumentos.

1.  O primeiro é o próprio container, parcialmente preenchido com os elementos anteriores do stream.
2.  O segundo é o elemento do stream que deve ser adicionado a este container parcialmente preenchido.

Este biconsumer é chamado de _accumulator_ no contexto da Collector API.

Estes dois componentes deveriam ser suficientes para um collector funcionar, mas a Stream API traz uma restrição que torna mais dois componentes necessários para um collector funcionar corretamente.

Você deve se lembrar que a Stream API suporta paralelização. Este ponto será abordado em mais detalhes posteriormente neste tutorial. O que você precisa saber é que a paralelização divide os elementos do seu stream em substreams, cada um sendo processado por um núcleo da sua CPU. A Collector API pode funcionar em tal contexto: cada substream será coletado em sua própria instância do container criado pelo seu collector.

Uma vez que esses substreams tenham sido processados, você terá vários containers, cada um contendo os elementos do sub-stream que processou. Esses containers são idênticos, porque foram criados com o mesmo _supplier_. Agora, você precisa de uma maneira de mesclá-los em um só. Para poder fazer isso, a Collector API precisa de um terceiro componente, um _combiner_, que irá mesclar esses containers.

Você tem dois métodos para criar seu próprio [`Collector`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.html>):

*   [`Collector.of(supplier, biconsumer, binaryoperator, characteristics)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.html#of\(java.util.function.Supplier,java.util.function.BiConsumer,java.util.function.BinaryOperator,java.util.stream.Collector.Characteristics...\)>) e
*   [`Collector.of(supplier, biconsumer, binaryoperator, function, characteristics)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.html#of\(java.util.function.Supplier,java.util.function.BiConsumer,java.util.function.BinaryOperator,java.util.function.Function,java.util.stream.Collector.Characteristics...\)>), que também recebe um _finisher_.

O terceiro componente é o _combiner_. Ele é modelado por uma instância de [`BinaryOperator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BinaryOperator.html>) que recebe dois containers parcialmente preenchidos e retorna um.

O quarto componente da segunda sobrecarga é chamado de _finisher_, e será abordado mais adiante nesta parte.

O último parâmetro é chamado de _characteristics_ do collector. É um vararg de [`Collector.Characteristics`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.Characteristics.html>) que pode ser usado pela implementação.

Note que você também pode coletar um [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>) passando esses componentes para o método [`Stream.collect(supplier, combiner, accumulator)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#collect\(java.util.function.Supplier,java.util.function.BiConsumer,java.util.function.BiConsumer\)>). Neste caso, você não precisa criar nenhum collector.

Mas, nesse caso, o combiner não é modelado pela mesma interface, dependendo do método que você usa para coletar seu stream.

No método [`stream.collect(supplier, accumulator, combiner)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#collect\(java.util.function.Supplier,java.util.function.BiConsumer,java.util.function.BiConsumer\)>), o combiner é do tipo [`BiConsumer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiConsumer.html>).

Você também pode chamar [`stream.collect(collector)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#collect\(java.util.stream.Collector\)>). Então você pode criar seu collector com dois métodos de fábrica: [`Collector.of(supplier, biconsumer, binaryoperator, characteristics)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.html#of\(java.util.function.Supplier,java.util.function.BiConsumer,java.util.function.BinaryOperator,java.util.stream.Collector.Characteristics...\)>) ou [`Collector.of(supplier, biconsumer, binaryoperator, function, characteristics)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collector.html#of\(java.util.function.Supplier,java.util.function.BiConsumer,java.util.function.BinaryOperator,java.util.function.Function,java.util.stream.Collector.Characteristics...\)>). Nestes métodos de fábrica, o combiner é do tipo [`BinaryOperator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BinaryOperator.html>).

## Coletando Tipos Primitivos em uma Coleção

Com os três primeiros componentes, você pode usar o método [`collect()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#collect\(java.util.function.Supplier,java.util.function.ObjIntConsumer,java.util.function.BiConsumer\)>) dos streams especializados de números. O método [`IntStream.collect()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#collect\(java.util.function.Supplier,java.util.function.ObjIntConsumer,java.util.function.BiConsumer\)>) recebe três argumentos:

*   uma instância de [`Supplier`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Supplier.html>), chamada _supplier_ ;
*   uma instância de [`ObjIntConsumer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/ObjIntConsumer.html>), chamada _accumulator_ ;
*   uma instância de [`BiConsumer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiConsumer.html>), chamada _combiner_.

Vamos escrever o código para coletar um [`IntStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html>) em uma instância de [`List<Integer>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>).

```java
List<Integer> list = IntStream.range(0, 10)
                              .collect(ArrayList::new,
                                       ArrayList::add,
                                       ArrayList::addAll);
```

A execução deste código produz o seguinte resultado.

```
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Coletar esses dados em um set exigiria apenas a alteração da implementação do [`supplier`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Supplier.html>) e o ajuste dos tipos de acordo.

## Coletando Tipos Primitivos em uma String

Vamos examinar como você pode implementar um equivalente de [`Collectors.joining()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#joining\(\)>) para unir os elementos de um stream de tipos primitivos em uma única string de caracteres. A classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) é imutável, então não há como acumular elementos nela. Em vez de usar a classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>), você pode usar a classe [`StringBuffer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuffer.html>), que é mutável.

Coletar elementos em um [`StringBuffer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuffer.html>) segue o mesmo padrão do anterior.

```java
StringBuffer sb = IntStream.range(0, 10)
                           .collect(StringBuffer::new,
                                    StringBuffer::append,
                                    StringBuffer::append);
```

A execução deste código produz o seguinte resultado.

```
0123456789
```

## Usando um Finisher para Pós-Processar um Collector

O código que você escreveu no parágrafo anterior está quase fazendo o que você precisa: ele une strings de caracteres em uma instância de [`StringBuffer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuffer.html>), a partir da qual você pode criar um objeto [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) regular apenas chamando seu método [`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#toString\(\)>). Mas o collector [`Collectors.joining()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#joining\(\)>) produz uma [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) diretamente sem que você precise chamar [`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#toString\(\)>). Então, como isso é feito?

A Collector API define um quarto componente precisamente para lidar com este caso, que é chamado de _finisher_. Um finisher é uma instância de [`Function`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html>) que recebe o container no qual os elementos foram acumulados e o transforma em outra coisa. No caso do [`Collectors.joining()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#joining\(\)>), esta função é apenas a seguinte.

```java
Function<StringBuffer, String> finisher = StringBuffer::toString;
```

Existem muitos collectors onde o finisher é apenas a função identidade. Este é o caso para os dois collectors: [`toList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toList\(\)>) e [`toSet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toSet\(\)>).

Nos casos em que o finisher não é a função identidade, o container mutável usado internamente pelo collector se torna um container intermediário que será mapeado para algum outro objeto, talvez outro container, antes de ser retornado à aplicação. É assim que a Collector API lida com a criação de listas, sets ou mapas imutáveis. O finisher é usado para selar o container intermediário em um container imutável antes de retorná-lo à sua aplicação.

Existem outros usos para este finisher que podem melhorar a legibilidade do seu código. A classe de fábrica [`Collectors`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html>) possui um método de fábrica que ainda não abordamos: o método [`collectingAndThen()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#collectingAndThen\(java.util.stream.Collector,java.util.function.Function\)>). Este método recebe um collector como primeiro argumento e um finisher como segundo argumento. Ele simplesmente aplicará esta função ao resultado calculado pela coleta do seu stream com o primeiro collector e, em seguida, o mapeará usando a função que você fornecer.

Você deve se lembrar do seguinte exemplo que já examinamos várias vezes nas seções anteriores. Trata-se de extrair o valor máximo de um histograma.

```java
Map<Integer, Long> histogram =
    IntStream.range(0, 10)
             .boxed()
             .collect(Collectors.groupingBy(i -> i % 5,
                                            Collectors.counting()));

Map.Entry<Integer, Long> max =
    histogram.entrySet()
             .stream()
             .max(Map.Entry.comparingByValue())
             .get();
```

O código anterior imprime o seguinte.

```
6
```

Em um primeiro passo, você construiu um histograma do tipo [`Map<Integer, Long>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>), e em um segundo passo, você extraiu o valor máximo deste histograma, comparando os pares chave-valor por valor.

Este segundo passo é, na verdade, uma transformação de um mapa para um par chave/valor especial deste mapa. Você pode modelá-lo usando a seguinte função.

```java
Function<Map<Integer, Long>, Map.Entry<Integer, Long>> finisher =
    map -> map.entrySet()
              .stream()
              .max(Map.Entry.comparingByValue())
              .get();
```

O tipo desta função pode parecer complexo à primeira vista. Na verdade, ela apenas extrai um par chave-valor de um mapa. Assim, ela recebe uma instância de [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>) de um determinado tipo e retorna um par chave-valor desse mapa, que é uma instância de [`Map.Entry`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.Entry.html>) com o mesmo tipo.

Agora que você tem esta função, você pode integrar esta etapa de extração de valor máximo dentro do próprio collector usando [`collectingAndThen()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#collectingAndThen\(java.util.stream.Collector,java.util.function.Function\)>). O padrão então se torna o seguinte.

```java
Map.Entry<Integer, Long> max =
    IntStream.range(0, 10)
             .boxed()
             .collect(Collectors.collectingAndThen(
                 Collectors.groupingBy(i -> i % 5,
                                       Collectors.counting()),
                 map -> map.entrySet()
                           .stream()
                           .max(Map.Entry.comparingByValue())
                           .get()));
```

A execução do código anterior imprime o seguinte.

```
6
```

Você pode estar se perguntando por que você precisaria escrever este código que parece bastante complicado?

Agora que você tem um extrator de valor máximo modelado por um único collector, você pode usá-lo como um downstream collector para outro collector. Ser capaz de fazer isso permite a combinação de mais collectors para realizar computações mais sofisticadas em seus dados.

## Combinando os Resultados de Dois Collectors com o Teeing Collector

Um método foi adicionado à classe [`Collectors`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html>) no Java SE 12 chamado [`teeing()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#teeing\(java.util.stream.Collector,java.util.stream.Collector,java.util.function.BiFunction\)>). Este método recebe dois downstream collectors e uma função de mesclagem.

Vamos analisar um caso de uso para ver o que você pode fazer com collectors. Imagine que você tenha os seguintes records `Car` e `Truck`.

```java
sealed interface Vehicle permits Car, Truck {}

record Car(String color, String engine, String drive, int passengers) implements Vehicle {}

record Truck(String engine, String drive, int freight) implements Vehicle {}
```

Um objeto car possui vários componentes: uma cor, um motor, uma tração e uma certa quantidade de passageiros que pode transportar. Um truck possui um motor, uma tração e pode transportar uma certa quantidade de carga. Ambos implementam a mesma interface: `Vehicle`.

Suponha que você tenha uma coleção de veículos e precise encontrar todos os carros com motor elétrico. Dependendo da sua aplicação, você pode acabar filtrando sua coleção de carros usando um stream. Ou, se você souber que a próxima requisição será para obter o carro com motor híbrido, você pode preferir preparar um mapa, com o motor como chave e a lista de carros com o tipo de motor como valores. Em ambos os casos, a Stream API lhe dará o padrão certo para obter o que você precisa.

Suponha que você precise adicionar a esta coleção todos os trucks elétricos. Ainda é possível criar esta união em uma única passagem sobre sua coleção de veículos, mas o predicado que você usará para filtrar seus dados está se tornando cada vez mais complexo. Provavelmente se parecerá com o seguinte.

```java
List<Vehicle> electricVehicles =
    vehicles.stream()
            .filter(v -> (v instanceof Car c && c.engine().equals("electric")) ||
                         (v instanceof Truck t && t.engine().equals("electric")))
            .toList();
```

Você também poderia escrevê-lo usando um switch no tipo sealed `Vehicle`. Note que o `switch` não usa nenhuma branch `default`. Dessa forma, qualquer alteração na hierarquia sealed irá disparar um erro de compilador, para que você possa atualizar este código de acordo.

```java
List<Vehicle> electricVehicles =
    vehicles.stream()
            .filter(v -> switch (v) {
                case Car c -> c.engine().equals("electric");
                case Truck t -> t.engine().equals("electric");
            })
            .toList();
```

O que você realmente precisa é o seguinte:

1.  Filtrar os veículos para obter todos os carros elétricos
2.  Filtrá-los para obter todos os trucks elétricos
3.  Mesclar os dois resultados.

Isso é exatamente o que o teeing collector pode fazer por você. O teeing collector é criado pelo método de fábrica [`Collectors.teeing()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#teeing\(java.util.stream.Collector,java.util.stream.Collector,java.util.function.BiFunction\)>) que recebe três argumentos.

1.  Um primeiro downstream collector, usado para coletar os dados do seu stream.
2.  Um segundo downstream collector, também usado para coletar seus dados, de forma independente.
3.  Uma bifunction, usada para mesclar os dois containers criados pelos dois downstream collectors.

Seus dados são processados em uma única passagem para garantir o melhor desempenho.

Já abordamos o padrão que você pode usar para filtrar os elementos do stream com um collector. A função de mesclagem é apenas uma chamada para o método [`Collection.addAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#addAll\(java.util.Collection\)>). O código a seguir é:

```java
List<Vehicle> electricVehicles =
    vehicles.stream()
            .collect(Collectors.teeing(
                Collectors.filtering(v -> v instanceof Car c && c.engine().equals("electric"),
                                     Collectors.toList()),
                Collectors.filtering(v -> v instanceof Truck t && t.engine().equals("electric"),
                                     Collectors.toList()),
                (cars, trucks) -> {
                    List<Vehicle> result = new ArrayList<>();
                    result.addAll(cars);
                    result.addAll(trucks);
                    return result;
                }));
```

A execução deste código imprime o seguinte.

```
[Car[color=red, engine=electric, drive=2WD, passengers=4], Truck[engine=electric, drive=4WD, freight=10000]]
```

### Neste tutorial

Entendendo Como um Collector Funciona
Coletando Tipos Primitivos em uma Coleção
Coletando Tipos Primitivos em uma String
Usando um Finisher para Pós-Processar um Collector
Combinando os Resultados de Dois Collectors com o Teeing Collector

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Usando um Collector como Operação Terminal](<#/doc/tutorials/api/streams/using-collectors>)

➜

**Tutorial Atual**

Criando Seu Próprio Collector

➜

**Próximo na Série**

[Implementando a Interface Collector](<#/doc/tutorials/api/streams/collector-interface>)

**Anterior na Série:** [Usando um Collector como Operação Terminal](<#/doc/tutorials/api/streams/using-collectors>)

**Próximo na Série:** [Implementando a Interface Collector](<#/doc/tutorials/api/streams/collector-interface>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Stream ](<#/doc/tutorials/api/streams>) > Criando Seu Próprio Collector