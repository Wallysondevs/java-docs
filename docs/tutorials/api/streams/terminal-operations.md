# Adicionando uma Operação Terminal a um Stream

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Stream ](<#/doc/tutorials/api/streams>) > Adicionando uma Operação Terminal a um Stream

**Anterior na Série**

[Reduzindo um Stream](<#/doc/tutorials/api/streams/reducing>)

➜

**Tutorial Atual**

Adicionando uma Operação Terminal a um Stream

➜

**Próximo na Série**

[Encontrando as Características de um Stream](<#/doc/tutorials/api/streams/characteristics>)

**Anterior na Série:** [Reduzindo um Stream](<#/doc/tutorials/api/streams/reducing>)

**Próximo na Série:** [Encontrando as Características de um Stream](<#/doc/tutorials/api/streams/characteristics>)

# Adicionando uma Operação Terminal a um Stream

## Evitando o Uso do Método Reduce

Um stream não processa nenhum dado se não terminar com uma operação terminal. Já abordamos a operação terminal [`reduce()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#reduce\(java.util.function.BinaryOperator\)>), e você viu várias operações terminais em outros exemplos. Vamos agora apresentar as outras operações terminais que você pode usar em um stream.

Usar o método [`reduce()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#reduce\(java.util.function.BinaryOperator\)>) não é a maneira mais fácil de reduzir um stream. Você precisa garantir que o operador binário que você fornece seja associativo, e então precisa saber se ele possui um elemento de identidade. Você precisa verificar muitos pontos para garantir que seu código esteja correto e produza os resultados esperados. Se você puder evitar usar o método [`reduce()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#reduce\(java.util.function.BinaryOperator\)>), então você definitivamente deveria, porque é muito fácil cometer erros com ele.

Felizmente, a API Stream oferece muitas outras maneiras de reduzir streams: os métodos [`sum()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#sum\(\)>), [`min()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#min\(\)>) e [`max()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#max\(\)>) que abordamos ao apresentar os streams especializados de números são métodos convenientes que você pode usar em vez das chamadas [`reduce()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#reduce\(java.util.function.BinaryOperator\)>) equivalentes. Vamos cobrir mais métodos nesta parte, que você deve conhecer, para evitar o uso do método [`reduce()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#reduce\(java.util.function.BinaryOperator\)>). Na verdade, você deve usar este método [`reduce()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#reduce\(java.util.function.BinaryOperator\)>) como último recurso, apenas se não tiver outra solução.

## Contando os Elementos Processados por um Stream

O método [`count()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#count\(\)>) está presente em todas as interfaces de stream: tanto em streams especializados quanto em streams de objetos. Ele simplesmente retorna o número de elementos processados por aquele stream, em um `long`. Este número pode ser enorme, na verdade maior que [`Integer.MAX_VALUE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#MAX_VALUE>), porque é um `long`. Assim, um stream pode contar mais objetos do que você pode colocar em um [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>), por exemplo.

Você pode estar se perguntando por que precisaria de um número tão grande. Na verdade, você pode criar streams com muitas fontes, incluindo fontes que podem produzir enormes quantidades de elementos, maiores que [`Integer.MAX_VALUE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#MAX_VALUE>). Mesmo que não seja o caso, é fácil criar uma operação intermediária que multiplicará o número de elementos que seu stream processa. O método [`flatMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#flatMap\(java.util.function.Function\)>), que abordamos anteriormente neste tutorial, pode fazer isso. Existem muitas maneiras pelas quais você pode acabar com mais elementos para processar do que [`Integer.MAX_VALUE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#MAX_VALUE>). Esta é a razão pela qual a API Stream o suporta.

Aqui está um exemplo do método [`count()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#count\(\)>) em ação.

```java
import java.util.stream.Stream;

public class CountExample {
    public static void main(String[] args) {
        long count = Stream.of("one", "two", "three", "four", "five")
                           .count();
        System.out.println("Number of elements: " + count);
    }
}
```

A execução deste código produz o seguinte resultado.

```
Number of elements: 5
```

## Consumindo Cada Elemento Um por Um

O método [`forEach()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#forEach\(java.util.function.Consumer\)>) da API Stream permite que você passe cada elemento do seu stream para uma instância da interface [`Consumer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Consumer.html>). Este método é muito útil para imprimir os elementos processados por um stream. É isso que o código a seguir faz.

```java
import java.util.stream.Stream;

public class ForEachExample {
    public static void main(String[] args) {
        Stream.of("one", "two", "three", "four", "five")
              .forEach(System.out::println);
    }
}
```

A execução deste código imprime o seguinte.

```
one
two
three
four
five
```

Este método é tão simples que você pode ser tentado a usá-lo em casos de uso errados.

Lembre-se de que as expressões lambda que você escreve devem evitar mutar seu escopo externo. Às vezes, mutar o estado externo é chamado de _conduzir efeitos colaterais_. O caso do consumer é especial porque um consumer que não tem nenhum efeito colateral não fará muito por você. Na verdade, chamar [`System.out.println()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#println\(\)>) ou [`IO.println()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IO.html#println\(java.lang.Object\)>) cria um efeito colateral no console da sua aplicação.

Vamos considerar o seguinte exemplo.

```java
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class ForEachSideEffectExample {
    public static void main(String[] args) {
        List<String> result = new ArrayList<>();
        Stream.of("one", "two", "three", "four", "five")
              .forEach(result::add);
        System.out.println(result);
    }
}
```

A execução do código anterior imprime o seguinte.

```
[one, two, three, four, five]
```

Então você pode ser tentado a usar este código porque é simples e "simplesmente funciona". Bem, há várias coisas erradas que este código está fazendo. Vamos analisá-las.

Chamar `result::add` adiciona todos os elementos processados por aquele stream à lista `result` externa, mutando essa lista de dentro do stream. Este consumer está criando um efeito colateral em uma variável fora do escopo do próprio stream.

Acessar tal variável torna sua expressão lambda uma _expressão lambda de captura_. É perfeitamente legal criar tais expressões lambda; você só precisa estar ciente de que há um impacto significativo no desempenho ao fazer isso. Se o desempenho for um assunto importante em sua aplicação, então você deve evitar escrever lambdas de captura.

Além disso, esta forma de escrever as coisas impede que você torne este stream paralelo. Se você fizer isso, terá várias threads acessando sua lista de resultados concorrentemente. Esta lista é uma instância de [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>), não uma classe projetada para lidar com acesso concorrente.

Você tem dois padrões para armazenar os elementos de um stream em uma lista. O exemplo a seguir demonstra o primeiro padrão, que usa um objeto Collector.

```java
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CollectorExample {
    public static void main(String[] args) {
        List<String> result = Stream.of("one", "two", "three", "four", "five")
                                    .collect(Collectors.toList());
        System.out.println(result);
    }
}
```

A execução do código anterior imprime o seguinte.

```
[one, two, three, four, five]
```

Este collector cria uma instância de [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) e adiciona os elementos processados pelo seu stream a ela. Portanto, este padrão não está criando nenhum efeito colateral, então não há impacto no desempenho.

Paralelismo e concorrência são tratados pela própria API Collector, então você pode tornar este stream paralelo com segurança.

Este código de padrão é tão simples e legível quanto o anterior. Ele não possui nenhuma das desvantagens de criar efeitos colaterais dentro de um objeto consumer. Este é definitivamente o padrão que você deve usar em seu código.

A partir do Java SE 16, você tem um segundo padrão, ainda mais simples.

```java
import java.util.List;
import java.util.stream.Stream;

public class ToListExample {
    public static void main(String[] args) {
        List<String> result = Stream.of("one", "two", "three", "four", "five")
                                    .toList();
        System.out.println(result);
    }
}
```

O resultado é o mesmo.

```
[one, two, three, four, five]
```

Este padrão produz uma instância especial de [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) que é imodificável. Se o que você precisa é de uma lista modificável, você deve manter o primeiro padrão de collector. Ele também pode ter um desempenho melhor do que coletar seu stream em uma instância de [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>). Este ponto é abordado no próximo parágrafo.

## Coletando Elementos do Stream em uma Collection, ou um Array

A API Stream oferece várias maneiras de coletar todos os elementos processados por um stream em uma collection. Você teve um primeiro vislumbre de dois desses padrões na seção anterior. Vamos ver os outros.

Há várias perguntas que você precisa se fazer antes de escolher qual padrão você precisa.

*   Você precisa construir uma lista não modificável?
*   Você se sente confortável com uma instância de [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>)? Ou você preferiria uma instância de [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>)?
*   Você tem uma ideia precisa de quantos elementos seu stream vai processar?
*   Você precisa coletar seu elemento em uma implementação precisa, talvez de terceiros ou caseira, de [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>)?

A API Stream pode lidar com todas essas situações.

### Coletando em um ArrayList Simples

Você já usou este padrão em um exemplo anterior. É o mais simples que você pode usar e retorna os elementos em uma instância de [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>).

Aqui está um exemplo de tal padrão em ação.

```java
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ToListPlainArrayListExample {
    public static void main(String[] args) {
        List<String> result = Stream.of("one", "two", "three", "four", "five")
                                    .collect(Collectors.toList()); // This returns an ArrayList
        System.out.println(result);
    }
}
```

Este padrão cria uma instância simples de [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) e acumula os elementos do seu stream nela. Se houver muitos elementos para o array interno do [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) armazená-los, então o array atual será copiado para um maior e será tratado pelo garbage collector. Este mecanismo é implementado por [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>).

Se você quiser evitar isso, e souber a quantidade de elementos que seu stream produzirá, então você pode usar o collector [`Collectors.toCollection()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toCollection\(java.util.function.Supplier\)>), que recebe um supplier como argumento para criar a collection na qual você estará coletando os elementos processados. O código a seguir usa este padrão para criar uma instância de [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) com uma capacidade inicial de 10.000.

```java
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ToCollectionWithCapacityExample {
    public static void main(String[] args) {
        List<String> result = Stream.of("one", "two", "three", "four", "five")
                                    .collect(Collectors.toCollection(() -> new ArrayList<>(10_000)));
        System.out.println(result);
    }
}
```

### Coletando em uma Lista Imutável

Existem casos em que você precisa acumular seus elementos em uma lista imutável. Isso pode soar paradoxal porque coletar consiste em adicionar elementos a um container que precisa ser mutável. De fato, é assim que a API Collector funciona, como você verá em mais detalhes mais adiante neste tutorial. Ao final desta operação de acumulação, a API Collector pode prosseguir com uma última operação, opcional, que, neste caso, consiste em selar a lista antes de retorná-la.

Para fazer isso, você só precisa usar o seguinte padrão.

```java
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ToUnmodifiableListExample {
    public static void main(String[] args) {
        List<String> result = Stream.of("one", "two", "three", "four", "five")
                                    .collect(Collectors.toUnmodifiableList());
        System.out.println(result);
        // result.add("six"); // This would throw UnsupportedOperationException
    }
}
```

A execução deste código produz o seguinte resultado.

```
[one, two, three, four, five]
```

Neste exemplo, `result` é uma lista imodificável.

A partir do Java SE 16, existe uma maneira melhor de coletar seus dados em uma lista imutável, que pode ser mais eficiente em alguns casos. O padrão é o seguinte.

```java
import java.util.List;
import java.util.stream.Stream;

public class StreamToListExample {
    public static void main(String[] args) {
        List<String> result = Stream.of("one", "two", "three", "four", "five")
                                    .toList(); // Java SE 16+
        System.out.println(result);
        // result.add("six"); // This would throw UnsupportedOperationException
    }
}
```

Como pode ser mais eficiente? O primeiro padrão, construído sobre o uso de um collector, começa coletando seus elementos em um [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) simples e então o sela para torná-lo imutável quando o processamento é concluído. O que seu código vê é apenas a lista imutável construída a partir deste [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>).

Como você sabe, uma instância de [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) é construída sobre um array interno que tem um tamanho fixo. Este array pode ficar cheio. Nesse caso, a implementação de [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) o detecta e o copia para um array maior. Este mecanismo é transparente para o cliente, mas vem com uma sobrecarga: copiar este array leva algum tempo.

Existem casos em que a API Stream pode acompanhar quantos elementos devem ser processados antes que todo o stream seja consumido. Nesse caso, criar um array interno do tamanho certo é mais eficiente porque evita a sobrecarga de copiar arrays pequenos para maiores.

Esta otimização foi implementada no método [`Stream.toList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#toList\(\)>), que foi adicionado ao Java SE 16. Se o que você precisa é de uma lista imutável, então você deve usar este padrão.

### Coletando em uma Lista Caseira

Se você precisa coletar seus dados em sua própria lista ou em uma lista de terceiros fora do JDK, então você pode usar o padrão [`Collectors.toCollection()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toCollection\(java.util.function.Supplier\)>). O supplier que você usou para ajustar o tamanho inicial da sua instância de [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) também pode ser usado para construir qualquer implementação de [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>), incluindo implementações que não fazem parte do JDK. Tudo o que você precisa fornecer é um supplier. No exemplo a seguir, fornecemos um supplier para criar uma instância de [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>).

```java
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ToCollectionLinkedListExample {
    public static void main(String[] args) {
        List<String> result = Stream.of("one", "two", "three", "four", "five")
                                    .collect(Collectors.toCollection(LinkedList::new));
        System.out.println(result);
    }
}
```

A execução do exemplo anterior imprime o seguinte.

```
[one, two, three, four, five]
```

### Coletando em um Set

Como a interface [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) é uma extensão da interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>), você poderia usar o padrão [`Collectors.toCollection(HashSet::new)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toCollection\(java.util.function.Supplier\)>) para coletar seus dados em uma instância de [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>). Isso é bom, mas a API Collector ainda oferece um padrão mais limpo para fazer isso: o [`Collectors.toSet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toSet\(\)>).

```java
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ToSetExample {
    public static void main(String[] args) {
        Set<String> result = Stream.of("one", "two", "three", "four", "five", "one")
                                   .collect(Collectors.toSet());
        System.out.println(result);
    }
}
```

A execução do código anterior imprime o seguinte.

```
[one, two, three, four, five]
```

Você pode estar se perguntando se há alguma diferença entre esses dois padrões. A resposta é sim, há uma diferença sutil, que você verá mais adiante neste tutorial.

Se o que você precisa é de um conjunto imutável, a API Collector tem outro padrão para você: [`Collectors.toUnmodifiableSet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toUnmodifiableSet\(\)>).

```java
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ToUnmodifiableSetExample {
    public static void main(String[] args) {
        Set<String> result = Stream.of("one", "two", "three", "four", "five", "one")
                                   .collect(Collectors.toUnmodifiableSet());
        System.out.println(result);
        // result.add("six"); // This would throw UnsupportedOperationException
    }
}
```

A execução do código anterior imprime o seguinte.

```
[one, two, three, four, five]
```

### Coletando em um Array

A API Stream também possui seu próprio conjunto de sobrecargas do método [`toArray()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#toArray\(\)>). Existem duas delas.

A primeira é um método [`toArray()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#toArray\(\)>) simples, que retorna uma instância de `Object[]`. Se o tipo exato do seu stream for conhecido, então este tipo é perdido se você usar este padrão.

A segunda recebe um argumento do tipo [`IntFunction<A[]>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/IntFunction.html>). Este tipo pode parecer assustador à primeira vista, mas escrever uma implementação desta função é, na verdade, muito fácil. Se você precisa construir um array de strings de caracteres, então a implementação desta função é `String[]::new`.

```java
import java.util.Arrays;
import java.util.stream.Stream;

public class ToArrayExample {
    public static void main(String[] args) {
        String[] stringArray = Stream.of("one", "two", "three", "four", "five")
                                     .toArray(String[]::new);
        System.out.println(Arrays.toString(stringArray));
    }
}
```

A execução deste código produz o seguinte resultado.

```
[one, two, three, four, five]
```

## Extraindo o Máximo e o Mínimo de um Stream

### Calculando o Máximo e o Mínimo de um Stream de Objetos

A API Stream oferece vários métodos para isso, dependendo do stream com o qual você está trabalhando atualmente.

Já abordamos os métodos [`max()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#max\(\)>) e [`min()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#min\(\)>) dos streams especializados de números: [`IntStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html>), [`LongStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/LongStream.html>) e [`DoubleStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/DoubleStream.html>). Você sabe que essas operações não possuem um elemento de identidade, então você não deve se surpreender ao descobrir que todas elas retornam objetos optional.

A propósito, o método [`average()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#average\(\)>) dos mesmos streams de números também retorna um objeto optional, já que a operação de média também não possui um elemento de identidade.

A interface [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>) também possui os dois métodos [`max()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#max\(java.util.Comparator\)>) e [`min()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#min\(java.util.Comparator\)>), que também retornam um objeto optional. A diferença com o stream de objetos é que os elementos de um [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>) podem ser realmente de qualquer tipo. Para poder calcular um máximo ou um mínimo, a implementação precisa comparar esses objetos. Esta é a razão pela qual você precisa fornecer um [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) para esses métodos.

Aqui está o método [`max()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#max\(java.util.Comparator\)>) em ação.

```java
import java.util.Comparator;
import java.util.Optional;
import java.util.stream.Stream;

public class StreamMaxExample {
    public static void main(String[] args) {
        Optional<String> longest = Stream.of("one", "two", "three", "four", "five")
                                         .max(Comparator.comparingInt(String::length));
        longest.ifPresent(s -> System.out.println("Longest string: " + s));
    }
}
```

Ele imprimirá o seguinte no seu console.

```
Longest string: three
```

Lembre-se de que tentar abrir um objeto optional que está vazio lança uma [`NoSuchElementException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NoSuchElementException.html>), o que é algo que você não quer ver em sua aplicação. Isso acontece apenas se o seu stream não tiver nenhum dado para processar. Neste exemplo simples, você tem um stream que processa várias strings de caracteres sem operação de filtro. Este stream não pode estar vazio, então você pode abrir este objeto optional com segurança.

### Calculando o Máximo e o Mínimo de um Stream de Números

Como as implementações especializadas para streams de números sabem como comparar números, você não precisa passar nenhum [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) para elas. Aqui estão as diferentes implementações que você pode usar.

*   [`IntStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html>): [`max()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#max\(\)>) e [`min()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#min\(\)>).
*   [`LongStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/LongStream.html>): [`max()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/LongStream.html#max\(\)>) e [`min()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/LongStream.html#min\(\)>).
*   [`DoubleStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/DoubleStream.html>): [`max()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/DoubleStream.htmll#max\(\)>) e [`min()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/DoubleStream.htmll#min\(\)>).
## Encontrando um Elemento em um Stream

A Stream API oferece duas operações terminais para encontrar um elemento: [`findFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#findFirst\(\)>) e [`findAny()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#findAny\(\)>). Esses dois métodos não recebem nenhum argumento e retornam um único elemento do seu stream. Para lidar adequadamente com o caso de streams vazios, este elemento é encapsulado em um objeto optional. Se o seu stream estiver vazio, então este optional também estará vazio.

Entender qual elemento é retornado exige que você compreenda que os streams podem ser _ordenados_. Um stream ordenado é simplesmente um stream no qual a ordem dos elementos importa e é mantida pela Stream API. Por padrão, um stream criado a partir de qualquer fonte ordenada (por exemplo, uma implementação da interface [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>)) é ele próprio ordenado.

Em tal stream, faz sentido ter um primeiro, segundo ou terceiro elemento. Encontrar o _primeiro_ elemento de tal stream faz todo o sentido também.

Se o seu stream não for ordenado, ou se a ordem foi perdida no processamento do seu stream, então encontrar o _primeiro_ elemento é indefinido, e chamar [`findFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#findFirst\(\)>) retorna, de fato, qualquer elemento do stream. Você verá mais detalhes sobre streams ordenados mais adiante neste tutorial.

Note que chamar [`findFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#findFirst\(\)>) aciona algumas verificações na implementação do stream para garantir que você obtenha o _primeiro_ elemento desse stream, caso ele seja ordenado. Isso pode ser custoso se o seu stream for um parallel stream. Existem muitos casos em que obter o _primeiro_ elemento encontrado não é relevante, incluindo casos em que seu stream processa apenas um único elemento. Em todos esses casos, você deve usar [`findAny()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#findAny\(\)>) em vez de [`findFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#findFirst\(\)>).

Vamos ver [`findFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#findFirst\(\)>) em ação.

Este stream é criado em uma instância de [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>), o que o torna um stream _ordenado_. Note que as duas linhas [`unordered()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/BaseStream.html#unordered\(\)>) e [`parallel()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/BaseStream.html#parallel\(\)>) estão comentadas nesta primeira versão.

Executar este código várias vezes sempre lhe dará o mesmo resultado.

A chamada do método intermediário [`unordered()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/BaseStream.html#unordered\(\)>) transforma seu stream _ordenado_ em um stream _não ordenado_. Neste caso, não faz diferença porque seu stream é processado sequencialmente. Seus dados são extraídos de uma lista que sempre percorre seus elementos na mesma ordem. Substituir a chamada do método [`findFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#findFirst\(\)>) por uma chamada do método [`findAny()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#findAny\(\)>) também não faz diferença pela mesma razão.

A primeira modificação que você pode fazer neste código é descomentar a chamada do método [`parallel()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/BaseStream.html#parallel\(\)>). Agora você tem um stream _ordenado_, processado em paralelo. Executar este código várias vezes sempre lhe dará o mesmo resultado: `one`. Isso ocorre porque seu stream é _ordenado_, então o primeiro elemento é definido, não importa como seu stream tenha sido processado.

Para tornar este stream _não ordenado_, você pode descomentar a chamada do método [`unordered()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/BaseStream.html#unordered\(\)>) ou substituir [`List.of()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#of\(E...\)>) por [`Set.of()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html#of\(E...\)>). Em ambos os casos, finalizar seu stream com [`findFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#findFirst\(\)>) retornará um elemento aleatório desse parallel stream. A forma como os parallel streams são processados faz com que isso aconteça.

A segunda modificação que você pode fazer neste código é substituir [`List.of()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#of\(E...\)>) por [`Set.of()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html#of\(E...\)>). Agora esta fonte não é mais _ordenada_. Além disso, a implementação retornada por [`Set.of()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html#of\(E...\)>) é tal que a travessia dos elementos do conjunto ocorre em uma ordem aleatória. Executar este código várias vezes mostra que tanto [`findFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#findFirst\(\)>) quanto [`findAny()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#findAny\(\)>) retornam uma string de caracteres aleatória, mesmo que [`unordered()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/BaseStream.html#unordered\(\)>) e [`parallel()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/BaseStream.html#parallel\(\)>) estejam ambos comentados. Encontrar o _primeiro_ elemento de uma fonte _não ordenada_ não é definido, e o resultado é aleatório.

A partir desses exemplos, você pode deduzir que existem algumas precauções tomadas na implementação do parallel stream para rastrear qual elemento é o primeiro. Isso constitui uma sobrecarga, então, neste caso, você só deve chamar [`findFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#findFirst\(\)>) se realmente precisar dele.

## Verificando se os Elementos de um Stream Correspondem a um Predicate

Existem casos em que encontrar um elemento em um stream ou não encontrar nenhum elemento em um stream pode ser o que você realmente precisa fazer. O elemento que você encontra não é relevante para sua aplicação; o importante é que este elemento exista.

O código a seguir funcionaria para verificar a existência de um determinado elemento.

O código anterior imprime o seguinte.

Na verdade, este código verifica se o optional retornado está vazio ou não.

O padrão anterior funciona bem, mas a Stream API oferece uma maneira mais eficiente de fazer isso. Na verdade, construir este objeto optional é uma sobrecarga, que você não paga se usar um dos três métodos a seguir. Esses três métodos recebem um predicate como argumento.

  * [`anyMatch(predicate)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#anyMatch\(java.util.function.Predicate\)>): retorna `true` se um elemento do stream for encontrado, que corresponda ao predicate fornecido.
  * [`allMatch(predicate)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#allMatch\(java.util.function.Predicate\)>): retorna `true` se todos os elementos do stream corresponderem ao predicate.
  * [`noneMatch(predicate)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#noneMatch\(java.util.function.Predicate\)>): retorna `true` se nenhum dos elementos corresponder ao predicate.

Vamos ver esses métodos em ação.

A execução deste código produz o seguinte resultado.

## Short-Circuiting o Processamento de um Stream

Você deve ter notado uma diferença importante entre as diferentes operações terminais que abordamos aqui.

Algumas delas exigem o processamento de todos os dados consumidos pelo seu stream. Este é o caso das operações _COUNT_, _MAX_, _MIN_, _AVERAGE_, bem como das chamadas de método [`forEach()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#forEach\(java.util.function.Consumer\)>), [`toList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#toList\(\)>) ou [`toArray()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#toArray\(\)>).

Não é o caso das últimas operações terminais que abordamos. Os métodos [`findFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#findFirst\(\)>) ou [`findAny()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#findAny\(\)>) pararão de processar seus dados assim que um elemento for encontrado, não importa quantos elementos restem para serem processados. O mesmo vale para [`anyMatch()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#anyMatch\(java.util.function.Predicate\)>), [`allMatch()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#allMatch\(java.util.function.Predicate\)>) e [`noneMatch()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#noneMatch\(java.util.function.Predicate\)>): eles podem interromper o processamento do stream com um resultado sem ter que consumir todos os elementos que sua fonte pode produzir.

Ainda existem casos em que esses últimos métodos precisam processar todos os elementos:

  * Retornar um optional vazio para [`findFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#findFirst\(\)>) e [`findAny()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#findAny\(\)>) só é possível quando todos os elementos foram processados.
  * Retornar `false` para [`anyMatch()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#anyMatch\(java.util.function.Predicate\)>) também precisa processar todos os elementos do stream.
  * Retornar `true` para [`allMatch()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#allMatch\(java.util.function.Predicate\)>) e [`noneMatch()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#noneMatch\(java.util.function.Predicate\)>) também precisa processar todos os elementos do stream.

Esses métodos são chamados de métodos _short-circuiting_ na Stream API porque podem produzir um resultado sem ter que processar todos os elementos do seu stream.

### Neste tutorial

Evitando o Uso do Método Reduce
Contando os Elementos Processados por um Stream
Consumindo Cada Elemento Um por Um
Coletando Elementos do Stream em uma Collection, ou um Array
Extraindo o Máximo e o Mínimo de um Stream
Encontrando um Elemento em um Stream
Verificando se os Elementos de um Stream Correspondem a um Predicate
Short-Circuiting o Processamento de um Stream

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Reduzindo um Stream](<#/doc/tutorials/api/streams/reducing>)

➜

**Tutorial Atual**

Adicionando uma Operação Terminal em um Stream

➜

**Próximo na Série**

[Encontrando as Características de um Stream](<#/doc/tutorials/api/streams/characteristics>)

**Anterior na Série:** [Reduzindo um Stream](<#/doc/tutorials/api/streams/reducing>)

**Próximo na Série:** [Encontrando as Características de um Stream](<#/doc/tutorials/api/streams/characteristics>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A Stream API ](<#/doc/tutorials/api/streams>) > Adicionando uma Operação Terminal em um Stream