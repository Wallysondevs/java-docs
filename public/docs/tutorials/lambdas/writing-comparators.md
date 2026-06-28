# Escrevendo e Combinando Comparators

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Lambda ](<#/doc/tutorials/lambdas>) > Escrevendo e Combinando Comparators

**Anterior na Série**

[Combinando Expressões Lambda](<#/doc/tutorials/lambdas/combining-chaining-composing>)

➜

**Tutorial Atual**

Escrevendo e Combinando Comparators

➜

Este é o fim da série!

**Anterior na Série:** [Combinando Expressões Lambda](<#/doc/tutorials/lambdas/combining-chaining-composing>)

# Escrevendo e Combinando Comparators

## Implementando um Comparator com uma Expressão Lambda

Graças à definição de interfaces funcionais, a boa e velha interface [`Comparator<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) introduzida no JDK 2 tornou-se funcional. Assim, a implementação de um comparator pode ser feita usando uma expressão lambda.

Aqui está o único método abstrato da interface [`Comparator<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>):

```java
public interface Comparator<T> {
    int compare(T o1, T o2);
}
```

O contrato de um comparator é o seguinte:

  * Se `o1 < o2` então [`compare(o1, o2)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#compare\(T,T\)>) deve retornar um número negativo
  * Se `o1 > o2` então [`compare(o1, o2)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#compare\(T,T\)>) deve retornar um número positivo
  * Em todos os casos, [`compare(o1, o2)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#compare\(T,T\)>) e [`compare(o2, o1)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#compare\(T,T\)>) devem ter sinais opostos.

Não é _estritamente_ exigido que, caso `o1.equals(o2)` seja `true`, a comparação de `o1` e `o2` retorne 0.

Como você pode criar um comparator de inteiros que implementaria a ordem natural? Bem, você pode simplesmente usar o método que viu no início deste tutorial:

```java
Comparator<Integer> comparator = (i1, i2) -> i1.compareTo(i2);
```

Você deve ter notado que esta expressão lambda também pode ser escrita com uma referência de método vinculada muito elegante desta forma:

```java
Comparator<Integer> comparator = Integer::compareTo;
```

> Evite implementar este comparator com `(i1 - i2)`. Mesmo que este padrão pareça funcionar, existem casos extremos em que ele não produzirá um resultado correto.

Este padrão pode ser estendido para qualquer coisa que você precise comparar, desde que você siga o contrato do comparator.

A API [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) foi um passo além, fornecendo uma API muito útil para criar comparators de uma forma muito mais legível.

## Usando um Método de Fábrica para Criar um Comparator

Suponha que você precise criar um comparator para comparar strings de caracteres de uma forma não natural: as strings mais curtas são menores que as strings mais longas.

Tal comparator pode ser escrito desta forma:

```java
Comparator<String> comparator = (s1, s2) -> {
    Function<String, Integer> toLength = String::length;
    return toLength.apply(s1).compareTo(toLength.apply(s2));
};
```

Você aprendeu na parte anterior que é possível encadear e compor expressões lambda. Este código é outro exemplo de tal composição. De fato, você pode reescrevê-lo desta forma:

```java
Function<String, Integer> toLength = String::length;
Comparator<String> comparator = Comparator.comparing(toLength);
```

Agora você pode ver que o código deste [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) depende apenas da [`Function`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html>) chamada `toLength`. Assim, torna-se possível criar um método de fábrica que recebe esta função como argumento e retorna o [`Comparator<String>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) correspondente.

Ainda há uma restrição do tipo de retorno da função `toLength`: ele precisa ser comparável. Aqui funciona bem porque você sempre pode comparar inteiros com sua ordem natural, mas você precisa ter isso em mente.

Tal método de fábrica existe no JDK: ele foi adicionado diretamente à interface [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>). Assim, você pode escrever o código anterior desta forma:

```java
Comparator<String> comparator = Comparator.comparing(String::length);
```

Este método [`comparing()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#comparing\(java.util.function.Function\)>) é um método estático da interface [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>). Ele recebe uma [`Function`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html>) como argumento, que deve retornar um tipo que seja uma extensão de [`Comparable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html>).

Suponha que você tenha uma classe `User` com um getter `getName()`, e precise ordenar uma lista de usuários de acordo com seus nomes. O código que você precisa escrever é o seguinte:

```java
Comparator<User> byName = Comparator.comparing(User::getName);
```

## Encadeando Comparators

A empresa para a qual você trabalha está muito satisfeita com o [`Comparable<User>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html>) que você entregou. Mas há um novo requisito na versão 2: a classe `User` agora tem um `firstName` e um `lastName`, e você precisa produzir um novo [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) para lidar com essa mudança.

Escrever cada comparator segue o mesmo padrão do anterior:

```java
Comparator<User> byFirstName = Comparator.comparing(User::getFirstName);
Comparator<User> byLastName = Comparator.comparing(User::getLastName);
```

Agora o que você precisa é uma maneira de encadeá-los, assim como você encadeou instâncias de [`Predicate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html>) ou [`Consumer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Consumer.html>). A API Comparator oferece uma solução para isso:

```java
Comparator<User> byFirstAndLastName = byFirstName.thenComparing(byLastName);
```

O método [`thenComparing()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#thenComparing\(java.util.Comparator\)>) é um método default da interface [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>), que recebe outro comparator como argumento e retorna um novo comparator. Quando aplicado a dois usuários, o comparator primeiro compara esses usuários usando o comparator `byFirstName`. Se o resultado for 0, então ele os comparará usando o comparator `byLastName`. Em resumo: funciona como esperado.

A API Comparator foi um passo além: como `byLastName` depende apenas da função `User::getLastName`, uma sobrecarga do método [`thenComparing()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#thenComparing\(java.util.Comparator\)>) foi adicionada à API, que recebe esta função como argumento. Assim, o padrão se torna o seguinte:

```java
Comparator<User> byFirstAndLastName = Comparator.comparing(User::getFirstName)
                                                .thenComparing(User::getLastName);
```

Com expressões lambda, referências de método, encadeamento e composição, criar comparators nunca foi tão fácil!

## Comparators Especializados

Boxing e unboxing de tipos primitivos também podem ocorrer com comparators, levando aos mesmos impactos de desempenho que no caso das interfaces funcionais do pacote [`java.util.function`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/package-summary.html>). Para lidar com este problema, foram adicionadas versões especializadas do método de fábrica [`comparing()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#comparing\(java.util.function.Function\)>) e do método default [`thenComparing()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#thenComparing\(java.util.Comparator\)>).

Você também pode criar uma instância de [`Comparator<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) com:

  * [`comparingInt(ToIntFunction<T> keyExtractor)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#comparingInt\(java.util.function.ToIntFunction\)>);
  * [`comparingLong(ToLongFunction<T> keyExtractor)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#comparingLong\(java.util.function.ToLongFunction\)>);
  * [`comparingDouble(ToDoubleFunction<T> keyExtractor)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#comparingDouble\(java.util.function.ToDoubleFunction\)>).

Você usa esses métodos se precisar comparar objetos usando uma propriedade que é um tipo primitivo e precisa evitar o boxing / unboxing desse tipo primitivo.

Existem também métodos correspondentes para encadear [`Comparator<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>):

  * [`thenComparingInt(ToIntFunction<T> keyExtractor)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#thenComparingInt\(java.util.function.ToIntFunction\)>);
  * [`thenComparingLong(ToLongFunction<T> keyExtractor)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#thenComparingLong\(java.util.function.ToLongFunction\)>);
  * [`thenComparingDouble(ToDoubleFunction<T> keyExtractor)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#thenComparingDouble\(java.util.function.ToDoubleFunction\)>).

A ideia é a mesma: usando esses métodos, você pode encadear a comparação com um comparator construído sobre uma função especializada que retorna um tipo primitivo, sem ter qualquer impacto de desempenho devido ao boxing / unboxing.

## Comparando Objetos Comparable Usando Sua Ordem Natural

Existem vários métodos de fábrica que valem a pena mencionar neste tutorial, que o ajudarão a criar comparators simples.

Muitas classes no JDK e provavelmente também em sua aplicação estão implementando uma interface especial do JDK: a interface [`Comparable<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html>). Esta interface possui um método: [`compareTo(T other)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html#compareTo\(T\)>) que retorna um `int`. Este método é usado para comparar esta instância de `T` com `other`, seguindo o contrato da interface [`Comparator<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>).

Muitas classes do JDK já implementam esta interface. Este é o caso de todas as classes wrapper de tipos primitivos ([`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>), [`Long`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Long.html>) e similares), para a classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>), e para classes de data e hora da API de Data e Hora.

Você pode comparar as instâncias dessas classes usando sua ordem natural, ou seja, usando este método [`compareTo()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html#compareTo\(T\)>). A API Comparator oferece uma classe de fábrica [`Comparator.naturalOrder()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#naturalOrder\(\)>). O comparator que ela constrói faz exatamente isso: compara qualquer objeto [`Comparable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html>) usando seu método [`compareTo()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html#compareTo\(T\)>).

Ter um método de fábrica como este pode ser muito útil quando você precisa encadear comparators. Aqui está um exemplo, onde você deseja comparar strings de caracteres pelo seu comprimento, e depois pela sua ordem natural (este exemplo usa um import estático para o método [`naturalOrder()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#naturalOrder\(\)>) para melhorar ainda mais a legibilidade):

```java
import static java.util.Comparator.naturalOrder;

// ...

Comparator<String> byLengthThenNatural = Comparator.comparing(String::length)
                                                   .thenComparing(naturalOrder());
```

A execução deste código produz o seguinte resultado:

```
[a, b, c, aa, bb, cc, aaa, bbb, ccc]
```

## Invertendo um Comparator

Um dos principais usos dos comparators é, claro, ordenar listas de objetos. O JDK 8 viu a adição de um método na interface [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) especialmente para isso: [`List.sort()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#sort\(java.util.Comparator\)>). Este método recebe um comparator como argumento.

Se você precisar ordenar a lista anterior em ordem inversa, pode usar o método [`reversed()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#reversed\(\)>) da interface [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>).

```java
Comparator<String> reversed = byLengthThenNatural.reversed();
```

A execução deste código produzirá o seguinte resultado:

```
[ccc, bbb, aaa, cc, bb, aa, c, b, a]
```

## Lidando com Valores Nulos

Comparar objetos nulos pode levar a [`NullPointerException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NullPointerException.html>) desagradáveis durante a execução do seu código, algo que você deseja evitar.

Suponha que você precise escrever um comparator de inteiros seguro contra nulos para ordenar uma lista de inteiros. A convenção que você decide seguir é empurrar todos os valores nulos para o final da sua lista, significando que um valor nulo é maior do que qualquer outro valor não nulo. E então você deseja ordenar os valores não nulos em sua ordem natural.

Aqui está o tipo de código que você pode escrever para implementar este comportamento:

```java
Comparator<Integer> nullSafeComparator = (i1, i2) -> {
    if (i1 == null && i2 == null) {
        return 0;
    } else if (i1 == null) {
        return 1;
    } else if (i2 == null) {
        return -1;
    } else {
        return i1.compareTo(i2);
    }
};
```

Você pode comparar este código com o primeiro comparator que você escreveu no início desta parte, e ver que a legibilidade foi bastante prejudicada.

Felizmente, existe uma maneira muito mais fácil de escrever este comparator, usando outro método de fábrica da interface [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>).

Os métodos [`nullsLast()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#nullsLast\(java.util.Comparator\)>) e seu método irmão [`nullsFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#nullsFirst\(java.util.Comparator\)>) são métodos de fábrica da interface [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>). Ambos recebem um comparator como argumento e fazem exatamente isso: lidam com os valores nulos para você, empurrando-os para o final ou colocando-os primeiro em sua lista ordenada.

Aqui está um exemplo:

```java
Comparator<Integer> nullSafeComparator = Comparator.nullsLast(Integer::compareTo);
```

A execução deste código produz o seguinte resultado:

```
[1, 2, 3, null, null]
```

## Mais Aprendizado

### Neste tutorial

Implementando um Comparator com uma Expressão Lambda Usando um Método de Fábrica para Criar um Comparator Encadeando Comparators Comparators Especializados Comparando Objetos Comparable Usando Sua Ordem Natural Invertendo um Comparator Lidando com Valores Nulos Mais Aprendizado

Última atualização: 24 de fevereiro de 2023

**Anterior na Série**

[Combinando Expressões Lambda](<#/doc/tutorials/lambdas/combining-chaining-composing>)

➜

**Tutorial Atual**

Escrevendo e Combinando Comparators

➜

Este é o fim da série!

**Anterior na Série:** [Combinando Expressões Lambda](<#/doc/tutorials/lambdas/combining-chaining-composing>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Lambda ](<#/doc/tutorials/lambdas>) > Escrevendo e Combinando Comparators