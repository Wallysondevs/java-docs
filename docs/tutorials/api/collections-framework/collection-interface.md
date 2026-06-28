# Armazenando Elementos em uma Collection

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Framework de Collections ](<#/doc/tutorials/api/collections-framework>) > Armazenando Elementos em uma Collection

**Anterior na Série**

[Conhecendo a Hierarquia de Collections](<#/doc/tutorials/api/collections-framework/organization>)

➜

**Tutorial Atual**

Armazenando Elementos em uma Collection

➜

**Próximo na Série**

[Iterando sobre os Elementos de uma Collection](<#/doc/tutorials/api/collections-framework/iterating>)

**Anterior na Série:** [Conhecendo a Hierarquia de Collections](<#/doc/tutorials/api/collections-framework/organization>)

**Próximo na Série:** [Iterando sobre os Elementos de uma Collection](<#/doc/tutorials/api/collections-framework/iterating>)

# Armazenando Elementos em uma Collection

## Explorando a Interface Collection

A primeira interface que você precisa conhecer é a interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>). Ela modela uma collection simples, que pode armazenar elementos e oferece diferentes maneiras de recuperá-los.

Se você quiser executar os exemplos nesta parte, precisa saber como criar uma collection. Ainda não abordamos a classe [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>), faremos isso mais tarde.

## Métodos que Manipulam Elementos Individuais

Vamos começar armazenando e removendo um elemento de uma collection. Os dois métodos envolvidos são [`add()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#add\(E\)>) e [`remove()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#remove\(java.lang.Object\)>).

  * [`add(element)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#add\(E\)>): adiciona um elemento à collection. Este método retorna um `boolean` que é `false` se a operação falhou. A falha é um pouco sutil, pois quando este método retorna, seja com `true` ou `false`, o elemento deve estar na collection. Assim, uma chamada subsequente a [`contains()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#contains\(java.lang.Object\)>) com este elemento como argumento deve retornar `true`. Portanto, se sua implementação de [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) decidir não adicionar o elemento que já não está nesta [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>), então você deve lançar uma exceção. O método [`add(element)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#add\(E\)>) lista as exceções que você deve lançar.
    * Se sua implementação não for modificável, então esta exceção deve ser uma [`UnsupportedOperationException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/UnsupportedOperationException.html>).
    * Se não permitir valores `null`, então deve ser uma [`NullPointerException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NullPointerException.html>).
    * Se o elemento não puder ser adicionado porque é de um tipo errado, então deve lançar uma [`ClassCastException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ClassCastException.html>).
    * Se sua implementação recusar este elemento com base em suas propriedades, então você deve lançar uma [`IllegalArgumentException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IllegalArgumentException.html>).
  * [`remove(element)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#remove\(java.lang.Object\)>): remove o elemento fornecido da collection. Este método também retorna um `boolean`, porque a operação pode falhar. Uma remoção pode falhar, por exemplo, quando o item solicitado para remoção não está presente na collection.

Você pode executar o exemplo a seguir. Aqui, você cria uma instância da interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) usando a implementação [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>). Os generics usados informam ao compilador Java que você deseja armazenar objetos [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) nesta collection. [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) não é a única implementação de [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) que você pode usar. Mais sobre isso mais tarde.

```java
import java.util.ArrayList;
import java.util.Collection;

public class CollectionAddRemove {
    public static void main(String[] args) {
        Collection<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        System.out.println("Collection after adding Alice and Bob: " + names);

        names.remove("Alice");
        System.out.println("Collection after removing Alice: " + names);

        names.add("Bob"); // ArrayList allows duplicates
        System.out.println("Collection after adding Bob again: " + names);
    }
}
```

A execução do código anterior deve imprimir o seguinte:

```
Collection after adding Alice and Bob: [Alice, Bob]
Collection after removing Alice: [Bob]
Collection after adding Bob again: [Bob, Bob]
```

Você pode verificar a presença de um elemento em uma collection com o método [`contains()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#contains\(java.lang.Object\)>). Observe que você pode verificar a presença de qualquer tipo de elemento. Por exemplo, é válido verificar a presença de um objeto `User` em uma collection de [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>). Isso pode parecer estranho, já que não há chance de que esta verificação retorne `true`, mas é permitido pelo compilador. Se você estiver usando uma IDE para testar este código, sua IDE pode avisar sobre a verificação da presença de um objeto `User` em uma collection de objetos [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>). Observe que a implementação pode optar por lançar uma [`ClassCastException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ClassCastException.html>).

```java
import java.util.ArrayList;
import java.util.Collection;

class User {
    String name;
    User(String name) { this.name = name; }
    @Override
    public String toString() { return "User{" + "name='" + name + '\'' + '}'; }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return name.equals(user.name);
    }
    @Override
    public int hashCode() {
        return name.hashCode();
    }
}

public class CollectionContains {
    public static void main(String[] args) {
        Collection<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");

        System.out.println("Collection contains 'Alice': " + names.contains("Alice"));
        System.out.println("Collection contains 'Charlie': " + names.contains("Charlie"));

        User user = new User("Alice");
        System.out.println("Collection contains User('Alice'): " + names.contains(user)); // This will be false
    }
}
```

A execução deste código produz o seguinte:

```
Collection contains 'Alice': true
Collection contains 'Charlie': false
Collection contains User('Alice'): false
```

## Métodos que Manipulam Outras Collections

Este primeiro conjunto de métodos que você viu permite manipular elementos individuais. Existem também métodos que recebem outra [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) como parâmetro.

Existem quatro métodos desse tipo: [`containsAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#containsAll\(java.util.Collection\)>), [`addAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#addAll\(java.util.Collection\)>), [`removeAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#removeAll\(java.util.Collection\)>) e [`retainAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#retainAll\(java.util.Collection\)>). Eles definem as quatro operações fundamentais em um conjunto de objetos.

  * [`containsAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#containsAll\(java.util.Collection\)>): define a inclusão.
  * [`addAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#addAll\(java.util.Collection\)>): define a união.
  * [`removeAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#removeAll\(java.util.Collection\)>): define o complemento.
  * [`retainAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#retainAll\(java.util.Collection\)>): define a interseção.

O primeiro é realmente simples: [`containsAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#containsAll\(java.util.Collection\)>) recebe outra collection como argumento e retorna `true` se todos os elementos da outra collection estiverem contidos nesta collection. A collection passada como argumento não precisa ser do mesmo tipo que esta collection: é legal perguntar se uma collection de [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>), do tipo [`Collection<String>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) está contida em uma collection de `User`, do tipo [`Collection<User>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>). O resultado pode até ser `true` se a collection de [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) estiver vazia.

Observe que uma implementação de [`containsAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#containsAll\(java.util.Collection\)>) pode lançar uma exceção em dois casos.

  1. Pode lançar uma [`ClassCastException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ClassCastException.html>) se um elemento da outra collection não for compatível com esta collection.
  2. Pode lançar uma [`NullPointerException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NullPointerException.html>) se um elemento da outra collection for `null` e esta collection não permitir elementos `null`.
  3. Também pode lançar uma [`NullPointerException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NullPointerException.html>) se a outra collection for `null`.

Aqui está um exemplo do uso deste método:

```java
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class CollectionContainsAll {
    public static void main(String[] args) {
        Collection<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        names.add("Charlie");

        List<String> subset1 = List.of("Alice", "Bob");
        List<String> subset2 = List.of("Bob", "David");
        List<String> emptySubset = List.of();

        System.out.println("Names: " + names);
        System.out.println("Subset1: " + subset1);
        System.out.println("Subset2: " + subset2);

        System.out.println("Names contains all of Subset1: " + names.containsAll(subset1));
        System.out.println("Names contains all of Subset2: " + names.containsAll(subset2));
        System.out.println("Names contains all of emptySubset: " + names.containsAll(emptySubset));
    }
}
```

A execução deste código produz o seguinte:

```
Names: [Alice, Bob, Charlie]
Subset1: [Alice, Bob]
Subset2: [Bob, David]
Names contains all of Subset1: true
Names contains all of Subset2: false
Names contains all of emptySubset: true
```

O segundo é [`addAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#addAll\(java.util.Collection\)>). Ele permite adicionar todos os elementos de uma dada collection a esta collection. Assim como no método [`add()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#add\(E\)>), isso pode falhar para alguns elementos em alguns casos. Este método retorna `true` se esta collection foi modificada por esta chamada. Este é um ponto importante a ser compreendido: obter um valor `true` não significa que todos os elementos da outra collection foram adicionados; significa que pelo menos um foi adicionado.

Você pode ver [`addAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#addAll\(java.util.Collection\)>) em ação no exemplo a seguir:

```java
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class CollectionAddAll {
    public static void main(String[] args) {
        Collection<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");

        List<String> newNames = List.of("Charlie", "Bob", "David");

        System.out.println("Initial names: " + names);
        System.out.println("New names to add: " + newNames);

        boolean modified = names.addAll(newNames);
        System.out.println("Collection modified: " + modified);
        System.out.println("Names after addAll: " + names);
    }
}
```

A execução deste código produz o seguinte resultado:

```
Initial names: [Alice, Bob]
New names to add: [Charlie, Bob, David]
Collection modified: true
Names after addAll: [Alice, Bob, Charlie, Bob, David]
```

Você precisa estar ciente de que a execução deste código produzirá um resultado diferente se você alterar a implementação de [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>). Este resultado é válido para [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>), mas como você verá a seguir, não seria o mesmo para [`HashSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html>).

O terceiro é [`removeAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#removeAll\(java.util.Collection\)>). Ele remove todos os elementos desta collection que estão contidos na outra collection. Assim como é o caso para [`contains()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#contains\(java.lang.Object\)>) ou [`remove()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#remove\(java.lang.Object\)>), a outra collection pode ser definida em qualquer tipo; ela não precisa ser compatível com a desta collection.

Você pode ver [`removeAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#addAll\(java.util.Collection\)>) em ação no exemplo a seguir:

```java
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class CollectionRemoveAll {
    public static void main(String[] args) {
        Collection<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        names.add("Charlie");
        names.add("David");

        List<String> toRemove = List.of("Bob", "David", "Eve");

        System.out.println("Initial names: " + names);
        System.out.println("Elements to remove: " + toRemove);

        boolean modified = names.removeAll(toRemove);
        System.out.println("Collection modified: " + modified);
        System.out.println("Names after removeAll: " + names);
    }
}
```

A execução deste código produz o seguinte resultado:

```
Initial names: [Alice, Bob, Charlie, David]
Elements to remove: [Bob, David, Eve]
Collection modified: true
Names after removeAll: [Alice, Charlie]
```

O último é [`retainAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#retainAll\(java.util.Collection\)>). Esta operação retém apenas os elementos desta collection que estão contidos na outra collection; todos os outros são removidos. Mais uma vez, como é o caso para [`contains()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#contains\(java.lang.Object\)>) ou [`remove()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#remove\(java.lang.Object\)>), a outra collection pode ser definida em qualquer tipo.

Você pode ver [`retainAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#retainAll\(java.util.Collection\)>) em ação no exemplo a seguir:

```java
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class CollectionRetainAll {
    public static void main(String[] args) {
        Collection<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        names.add("Charlie");
        names.add("David");

        List<String> toRetain = List.of("Bob", "Charlie", "Eve");

        System.out.println("Initial names: " + names);
        System.out.println("Elements to retain: " + toRetain);

        boolean modified = names.retainAll(toRetain);
        System.out.println("Collection modified: " + modified);
        System.out.println("Names after retainAll: " + names);
    }
}
```

A execução deste código produz o seguinte resultado:

```
Initial names: [Alice, Bob, Charlie, David]
Elements to retain: [Bob, Charlie, Eve]
Collection modified: true
Names after retainAll: [Bob, Charlie]
```

## Métodos que Manipulam a Própria Collection

Então, o último lote de métodos lida com a própria collection.

Você tem dois métodos para verificar o conteúdo de uma collection.

  * [`size()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#size\(\)>): Retorna o número de elementos em uma collection, como um `int`.
  * [`isEmpty()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#isEmpty\(\)>): Informa se a collection fornecida está vazia ou não.

```java
import java.util.ArrayList;
import java.util.Collection;

public class CollectionSizeEmpty {
    public static void main(String[] args) {
        Collection<String> names = new ArrayList<>();
        System.out.println("Initial size: " + names.size());
        System.out.println("Is empty: " + names.isEmpty());

        names.add("Alice");
        names.add("Bob");
        System.out.println("Size after adding elements: " + names.size());
        System.out.println("Is empty: " + names.isEmpty());
    }
}
```

A execução deste código produz o seguinte:

```
Initial size: 0
Is empty: true
Size after adding elements: 2
Is empty: false
```

Então você pode apagar o conteúdo de uma collection simplesmente chamando [`clear()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#clear\(\)>) nela.

```java
import java.util.ArrayList;
import java.util.Collection;

public class CollectionClear {
    public static void main(String[] args) {
        Collection<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        System.out.println("Initial names: " + names);

        names.clear();
        System.out.println("Names after clear: " + names);
        System.out.println("Is empty after clear: " + names.isEmpty());
    }
}
```

A execução deste código produz o seguinte:

```
Initial names: [Alice, Bob]
Names after clear: []
Is empty after clear: true
```

## Obtendo um Array dos Elementos de uma Collection

Mesmo que armazenar seus elementos em uma collection possa fazer mais sentido em sua aplicação do que colocá-los em um array, ainda existem casos em que obtê-los em um array será algo que você precisará.

A interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) oferece três padrões para obter os elementos de uma collection em um array, na forma de três sobrecargas de um método [`toArray()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#toArray\(\)>).

O primeiro é uma chamada simples a [`toArray()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#toArray\(\)>), sem argumentos. Isso retorna seus elementos em um array de objetos simples.

```java
import java.util.ArrayList;
import java.util.Collection;
import java.util.Arrays;

public class CollectionToArrayObject {
    public static void main(String[] args) {
        Collection<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        names.add("Charlie");

        Object[] nameArray = names.toArray();
        System.out.println("Array of Objects: " + Arrays.toString(nameArray));
        System.out.println("Type of array: " + nameArray.getClass().getName());
    }
}
```

Isso pode não ser o que você precisa. Se você tem uma [`Collection<String>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>), o que você pode preferir é um array de [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>). Você ainda pode fazer um cast de `Object[]` para `String[]`, mas não há garantia de que este cast não falhará em tempo de execução. Se você precisa de segurança de tipo, então você pode chamar qualquer um dos seguintes métodos.

  * [`toArray(T[] a)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#toArray\(T%5B%5D\)>) retorna um array de `T`: `T[]`.
  * [`toArray(IntFunction<T[]> generator)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#toArray\(java.util.function.IntFunction\)>), retorna o mesmo tipo, com uma sintaxe diferente.

Quais são as diferenças entre os dois últimos padrões? O primeiro é a legibilidade. Criar uma instância de [`IntFunction<T[]>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/IntFunction.html>) pode parecer estranho à primeira vista, mas escrevê-lo com uma method reference é realmente muito simples.

Aqui está o primeiro padrão. Neste primeiro padrão, você precisa passar um array do tipo correspondente.

Qual é o uso deste array passado como argumento? Se ele for grande o suficiente para conter todos os elementos da collection, então esses elementos serão copiados para o array, e ele será retornado. Se houver mais espaço no array do que o necessário, a primeira célula não utilizada do array será definida como `null`. Se o array que você passa for muito pequeno, então um novo array do tamanho exato é criado para conter os elementos da collection.

Aqui está este padrão em ação:

```java
import java.util.ArrayList;
import java.util.Collection;
import java.util.Arrays;

public class CollectionToArrayWithSize {
    public static void main(String[] args) {
        Collection<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        names.add("Charlie");

        String[] initialArray = new String[5]; // Array larger than needed
        initialArray[3] = "Extra1";
        initialArray[4] = "Extra2";

        System.out.println("Initial array: " + Arrays.toString(initialArray));

        String[] nameArray = names.toArray(initialArray);
        System.out.println("Array after toArray: " + Arrays.toString(nameArray));
        System.out.println("Is it the same instance? " + (nameArray == initialArray));
    }
}
```

A execução do código anterior lhe dará:

```
Initial array: [null, null, null, Extra1, Extra2]
Array after toArray: [Alice, Bob, Charlie, null, Extra2]
Is it the same instance? true
```

Você pode ver que o array foi copiado para as primeiras células do array argumento, e `null` foi adicionado logo depois, deixando assim os últimos elementos deste array intocados. O array retornado é o mesmo array que você forneceu como argumento, com um conteúdo diferente.

Aqui está um segundo exemplo, com um array de comprimento zero:

```java
import java.util.ArrayList;
import java.util.Collection;
import java.util.Arrays;

public class CollectionToArrayWithZeroSize {
    public static void main(String[] args) {
        Collection<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        names.add("Charlie");

        String[] zeroLengthArray = new String[0];

        System.out.println("Initial zero-length array: " + Arrays.toString(zeroLengthArray));

        String[] nameArray = names.toArray(zeroLengthArray);
        System.out.println("Array after toArray: " + Arrays.toString(nameArray));
        System.out.println("Is it the same instance? " + (nameArray == zeroLengthArray));
    }
}
```

A execução deste código lhe dá o seguinte resultado:

```
Initial zero-length array: []
Array after toArray: [Alice, Bob, Charlie]
Is it the same instance? false
```

Um novo array foi criado neste caso.

O segundo padrão é escrito usando uma constructor method reference para implementar [`IntFunction<T[]>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/IntFunction.html>):

```java
import java.util.ArrayList;
import java.util.Collection;
import java.util.Arrays;

public class CollectionToArrayWithGenerator {
    public static void main(String[] args) {
        Collection<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        names.add("Charlie");

        String[] nameArray = names.toArray(String[]::new);
        System.out.println("Array using generator: " + Arrays.toString(nameArray));
        System.out.println("Type of array: " + nameArray.getClass().getName());
    }
}
```

Nesse caso, um array de comprimento zero do tipo correto é criado com esta função, e este método então chama [`toArray()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#toArray\(\)>) com este array passado como argumento.

Este padrão de código foi adicionado no JDK 8 para melhorar a legibilidade das chamadas a [`toArray()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#toArray\(\)>).

## Filtrando Elementos de uma Collection com um Predicate

Java SE 8 adicionou um novo recurso à interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>): a possibilidade de filtrar elementos de uma collection com um predicate.

Suponha que você tenha uma [`List<String>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) e precise remover todas as strings `null`, as strings vazias e as strings com mais de 5 caracteres. No Java SE 7 e anteriores, você pode usar o método [`Iterator.remove()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html#remove\(\)>) para fazer isso, chamando-o em uma instrução `if`. Você verá este padrão junto com a interface [`Iterator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html>). Com [`removeIf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#removeIf\(java.util.function.Predicate\)>), seu código se torna muito mais simples:

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class CollectionRemoveIf {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        names.add(null);
        names.add("Charlie");
        names.add("");
        names.add("David");
        names.add("Eleanor"); // Longer than 5 chars

        System.out.println("Initial list: " + names);

        // Remove nulls, empty strings, and strings longer than 5 characters
        names.removeIf(s -> s == null || s.isEmpty() || s.length() > 5);

        System.out.println("List after removeIf: " + names);
    }
}
```

A execução deste código produz o seguinte resultado:

```
Initial list: [Alice, Bob, null, Charlie, , David, Eleanor]
List after removeIf: [Alice, Bob, David]
```

Mais uma vez, usar este método melhorará muito a legibilidade e a expressividade do código da sua aplicação.
## Escolhendo uma Implementação para a Interface Collection

Em todos esses exemplos, usamos [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) para implementar a interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>).

O fato é: o Collections Framework não fornece uma implementação direta da interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>). [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) implementa [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>), e como [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) estende [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>), ela também implementa [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>).

Se você decidir usar a interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) para modelar as coleções em sua aplicação, então escolher [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) como sua implementação padrão é sua melhor escolha, na maioria das vezes. Você verá mais discussões sobre a implementação correta a ser escolhida mais adiante neste tutorial.

### Neste tutorial

Explorando a Interface Collection Métodos que Manipulam Elementos Individuais Métodos que Manipulam Outras Collections Métodos que Manipulam a Própria Collection Obtendo um Array dos Elementos de uma Collection Filtrando Elementos de uma Collection com um Predicate Escolhendo uma Implementação para a Interface Collection

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Conhecendo a Hierarquia de Collection](<#/doc/tutorials/api/collections-framework/organization>)

➜

**Tutorial Atual**

Armazenando Elementos em uma Collection

➜

**Próximo na Série**

[Iterando sobre os Elementos de uma Collection](<#/doc/tutorials/api/collections-framework/iterating>)

**Anterior na Série:** [Conhecendo a Hierarquia de Collection](<#/doc/tutorials/api/collections-framework/organization>)

**Próximo na Série:** [Iterando sobre os Elementos de uma Collection](<#/doc/tutorials/api/collections-framework/iterating>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Collections Framework ](<#/doc/tutorials/api/collections-framework>) > Armazenando Elementos em uma Collection