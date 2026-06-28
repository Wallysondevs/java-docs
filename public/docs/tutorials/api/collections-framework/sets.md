# Estendendo Collection com Set, SortedSet e NavigableSet

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Collections Framework ](<#/doc/tutorials/api/collections-framework>) > Estendendo Collection com Set, SortedSet e NavigableSet

**Anterior na Série**

[Estendendo Collection com List](<#/doc/tutorials/api/collections-framework/lists>)

➜

**Tutorial Atual**

Estendendo Collection com Set, SortedSet e NavigableSet

➜

**Próximo na Série**

[Criando e Processando Dados com os Métodos de Fábrica de Collections](<#/doc/tutorials/api/collections-framework/factory-methods>)

**Anterior na Série:** [Estendendo Collection com List](<#/doc/tutorials/api/collections-framework/lists>)

**Próximo na Série:** [Criando e Processando Dados com os Métodos de Fábrica de Collections](<#/doc/tutorials/api/collections-framework/factory-methods>)

# Estendendo Collection com Set, SortedSet e NavigableSet

## Explorando a Interface Set

A interface [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) não adiciona nenhum método novo à interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>). A principal implementação de [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) que o Collections Framework oferece é a classe [`HashSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html>). Internamente, um [`HashSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html>) envolve uma instância de [`HashMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashMap.html>), uma classe que será abordada posteriormente, que atua como um delegado para [`HashSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html>).

Como você já viu, o que um [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) adiciona a uma [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) é que ele proíbe duplicatas. O que você perde em relação à interface [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) é que seus elementos são armazenados sem uma ordem específica. Há muito pouca chance de você iterar sobre eles na mesma ordem em que os adicionou ao seu set.

Você pode ver isso no exemplo a seguir:

```java
import java.util.HashSet;
import java.util.Set;

public class SetExample {
    public static void main(String[] args) {
        Set<String> set = new HashSet<>();
        set.add("Apple");
        set.add("Banana");
        set.add("Orange");
        set.add("Apple"); // Duplicate, will not be added

        System.out.println("Elements in the set:");
        for (String element : set) {
            System.out.println(element);
        }
    }
}
```

A execução deste código produzirá o seguinte:

```
Elements in the set:
Apple
Orange
Banana
```

Algumas implementações de [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) sempre fornecem a mesma ordem ao iterar sobre seus elementos, mas como isso não é garantido, seu código não deve depender disso.

Se você deseja iterar sobre os elementos em uma ordem particular e reproduzível, então você pode usar a implementação [`LinkedHashSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedHashSet.html>), que combina um set e uma lista encadeada interna.

## Estendendo Set com SortedSet

A primeira extensão de [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) é a interface [`SortedSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html>). A interface [`SortedSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html>) mantém seus elementos ordenados de acordo com uma certa lógica de comparação. O Collections Framework oferece uma implementação de [`SortedSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html>), chamada [`TreeSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TreeSet.html>).

Um [`TreeSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TreeSet.html>) é uma implementação que precisa comparar os objetos que contém. Você pode fornecer um comparator ao construir um [`TreeSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TreeSet.html>), ou você implementa a interface [`Comparable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html>) para os elementos que você coloca no TreeSet. Se você fizer ambos, então o [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) tem precedência.

A interface [`SortedSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html>) adiciona novos métodos a [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>).

*   [`first()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TreeSet.html#first\(\)>) e [`last()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TreeSet.html#last\(\)>) retornam os menores e maiores elementos do set
*   [`headSet(toElement)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TreeSet.html#headSet\(E\)>) e [`tailSet(fromElement)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TreeSet.html#tailSet\(E\)>) retornam subsets contendo os elementos menores que `toElement` ou maiores ou iguais a `fromElement`
*   [`subSet(fromElement, toElement)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TreeSet.html#subSet\(E,E\)>) fornece um subset dos elementos entre `fromElement` e `toElement`.

Os `toElement` e `fromElement` não precisam ser elementos do set principal. Se forem, então `toElement` não é incluído no resultado e `fromElement` é, seguindo a convenção usual.

Considere o exemplo a seguir:

```java
import java.util.SortedSet;
import java.util.TreeSet;

public class SortedSetExample {
    public static void main(String[] args) {
        SortedSet<Integer> numbers = new TreeSet<>();
        numbers.add(10);
        numbers.add(50);
        numbers.add(20);
        numbers.add(40);
        numbers.add(30);

        System.out.println("Original SortedSet: " + numbers);
        System.out.println("First element: " + numbers.first());
        System.out.println("Last element: " + numbers.last());
        System.out.println("HeadSet (elements < 30): " + numbers.headSet(30));
        System.out.println("TailSet (elements >= 30): " + numbers.tailSet(30));
        System.out.println("SubSet (elements from 20 to 40): " + numbers.subSet(20, 40));
    }
}
```

A execução deste código lhe dará o seguinte:

```
Original SortedSet: [10, 20, 30, 40, 50]
First element: 10
Last element: 50
HeadSet (elements < 30): [10, 20]
TailSet (elements >= 30): [30, 40, 50]
SubSet (elements from 20 to 40): [20, 30]
```

Os três subsets que esses métodos retornam são _visões_ sobre o set principal. Nenhuma cópia é feita, o que significa que qualquer alteração que você fizer nesses subsets será refletida no set, e vice-versa.

Você pode remover ou adicionar elementos ao set principal através desses subsets. Há um ponto que você precisa ter em mente, no entanto. Esses três subsets lembram os limites nos quais foram construídos. Por razões de consistência, não é legal adicionar um elemento através de um subset fora de seus limites. Por exemplo, se você pegar um [`headSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html#headSet\(E\)>) e tentar adicionar um elemento maior ou igual a `toElement`, então você receberá uma [`IllegalArgumentException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IllegalArgumentException.html>).

## Estendendo SortedSet com NavigableSet

Java SE 6 viu a introdução de uma extensão de [`SortedSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html>) com a adição de mais métodos. Acontece que a classe [`TreeSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TreeSet.html>) foi adaptada para implementar [`NavigableSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableSet.html>). Assim, você pode usar a mesma classe para ambas as interfaces.

Alguns métodos são sobrecarregados por [`NavigableSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableSet.html>).

*   [`headSet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableSet.html#headSet\(E,boolean\)>), [`tailSet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableSet.html#tailSet\(E,boolean\)>), e [`subSet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableSet.html#subSet\(E,boolean,E,boolean\)>) podem receber um argumento `boolean` adicional para especificar se os limites (`toElement` ou `fromElement`) devem ser incluídos no subset resultante.

Outros métodos foram adicionados.

*   [`ceiling(element)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableSet.html#ceiling\(E\)>), e [`floor(element)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableSet.html#floor\(E\)>) retornam o menor elemento maior ou igual, ou o maior elemento menor ou igual ao `element` fornecido. Se não houver tal elemento, `null` é retornado
*   [`lower(element)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableSet.html#lower\(E\)>), e [`higher(element)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableSet.html#higher\(E\)>) retornam o maior elemento menor que, ou o menor elemento maior que o `element` fornecido. Se não houver tal elemento, `null` é retornado.
*   [`pollFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableSet.html#pollFirst\(\)>), e [`pollLast()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableSet.html#pollLast\(\)>) retornam e removem o menor ou o maior elemento do set.

Além disso, [`NavigableSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableSet.html>) também permite iterar sobre seus elementos em ordem decrescente. Existem duas maneiras de fazer isso.

*   Você pode chamar [`descendingIterator()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableSet.html#descendingIterator\(\)>): ele lhe dá um [`Iterator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html>) regular que percorre o set em ordem decrescente.
*   Você também pode chamar [`descendingSet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableSet.html#descendingSet\(\)>). O que você obtém em troca é outro [`NavigableSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableSet.html>) que é uma visão sobre este set e que faz você pensar que tem o mesmo set, ordenado na ordem inversa.

O exemplo a seguir demonstra isso.

```java
import java.util.NavigableSet;
import java.util.TreeSet;
import java.util.Iterator;

public class NavigableSetExample {
    public static void main(String[] args) {
        NavigableSet<Integer> numbers = new TreeSet<>();
        numbers.add(10);
        numbers.add(50);
        numbers.add(20);
        numbers.add(40);
        numbers.add(30);

        System.out.println("Original NavigableSet: " + numbers);

        System.out.println("Ceiling (>= 25): " + numbers.ceiling(25));
        System.out.println("Floor (<= 25): " + numbers.floor(25));
        System.out.println("Higher (> 20): " + numbers.higher(20));
        System.out.println("Lower (< 20): " + numbers.lower(20));

        System.out.println("HeadSet (elements < 30, inclusive=true): " + numbers.headSet(30, true));
        System.out.println("TailSet (elements >= 30, inclusive=false): " + numbers.tailSet(30, false));
        System.out.println("SubSet (from 20 inclusive to 40 exclusive): " + numbers.subSet(20, true, 40, false));

        System.out.println("Iterating in descending order:");
        Iterator<Integer> descendingIterator = numbers.descendingIterator();
        while (descendingIterator.hasNext()) {
            System.out.print(descendingIterator.next() + " ");
        }
        System.out.println();

        NavigableSet<Integer> descendingSet = numbers.descendingSet();
        System.out.println("Descending Set view: " + descendingSet);

        System.out.println("Poll First: " + numbers.pollFirst());
        System.out.println("Poll Last: " + numbers.pollLast());
        System.out.println("NavigableSet after polling: " + numbers);
    }
}
```

A execução deste código lhe dará o seguinte:

```
Original NavigableSet: [10, 20, 30, 40, 50]
Ceiling (>= 25): 30
Floor (<= 25): 20
Higher (> 20): 30
Lower (< 20): 10
HeadSet (elements < 30, inclusive=true): [10, 20, 30]
TailSet (elements >= 30, inclusive=false): [40, 50]
SubSet (from 20 inclusive to 40 exclusive): [20, 30]
Iterating in descending order:
50 40 30 20 10 
Descending Set view: [50, 40, 30, 20, 10]
Poll First: 10
Poll Last: 50
NavigableSet after polling: [20, 30, 40]
```

### Neste tutorial

*   Explorando a Interface Set
*   Estendendo Set com SortedSet
*   Estendendo SortedSet com NavigableSet

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Estendendo Collection com List](<#/doc/tutorials/api/collections-framework/lists>)

➜

**Tutorial Atual**

Estendendo Collection com Set, SortedSet e NavigableSet

➜

**Próximo na Série**

[Criando e Processando Dados com os Métodos de Fábrica de Collections](<#/doc/tutorials/api/collections-framework/factory-methods>)

**Anterior na Série:** [Estendendo Collection com List](<#/doc/tutorials/api/collections-framework/lists>)

**Próximo na Série:** [Criando e Processando Dados com os Métodos de Fábrica de Collections](<#/doc/tutorials/api/collections-framework/factory-methods>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Collections Framework ](<#/doc/tutorials/api/collections-framework>) > Estendendo Collection com Set, SortedSet e NavigableSet