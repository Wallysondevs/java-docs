# Criando e Processando Dados com os Métodos de Fábrica de Collections

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Collections Framework ](<#/doc/tutorials/api/collections-framework>) > Criando e Processando Dados com os Métodos de Fábrica de Collections

**Anterior na Série**

[Estendendo Collection com Set, SortedSet e NavigableSet](<#/doc/tutorials/api/collections-framework/sets>)

➜

**Tutorial Atual**

Criando e Processando Dados com os Métodos de Fábrica de Collections

➜

**Próximo na Série**

[Armazenando Elementos em Stacks e Queues](<#/doc/tutorials/api/collections-framework/stacks-queues>)

**Anterior na Série:** [Estendendo Collection com Set, SortedSet e NavigableSet](<#/doc/tutorials/api/collections-framework/sets>)

**Próximo na Série:** [Armazenando Elementos em Stacks e Queues](<#/doc/tutorials/api/collections-framework/stacks-queues>)

# Criando e Processando Dados com os Métodos de Fábrica de Collections

## Criando Collections Imutáveis

O Java SE 9 trouxe a adição de um conjunto de métodos de fábrica às interfaces [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) e [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) para criar listas e sets. O padrão é muito simples: basta chamar o método estático [`List.of()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#of\(E...\)>) ou [`Set.of()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html#of\(E...\)>), passar os elementos da sua lista e set, e pronto.

No entanto, vários pontos merecem ser observados.

  * A implementação que você recebe em troca pode variar com o número de elementos que você coloca em sua lista ou set. Nenhuma delas é [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) ou [`HashSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html>); seu código não deve depender de nada além das interfaces básicas [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) e [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>).

  * Tanto a lista quanto o set que você obtém são estruturas imutáveis. Você não pode adicionar ou modificar elementos nelas, e você não pode modificar esses elementos. Se os objetos dessas estruturas forem mutáveis, você ainda pode mutá-los.

  * Essas estruturas não aceitam valores `null`. Se você tentar adicionar um valor `null` em tal lista ou set, você receberá uma exceção.

  * A interface [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) não permite duplicatas: é disso que se trata um set. Como não faria sentido criar um set com valores duplicados, presume-se que escrever tal código é um bug. Portanto, você receberá uma exceção se tentar fazer isso.

  * As implementações que você obtém são [`Serializable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Serializable.html>).

Esses métodos `of()` são comumente referidos como _métodos de fábrica de conveniência para collections_.

## Obtendo uma Cópia Imutável de uma Collection

Após o sucesso dos métodos de fábrica de conveniência para collections, outro conjunto de métodos de conveniência foi adicionado no Java SE 10 para criar cópias imutáveis de collections.

Existem dois deles: [`List.copyOf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#copyOf\(java.util.Collection\)>) e [`Set.copyOf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html#copyOf\(java.util.Collection\)>). Ambos seguem o mesmo padrão:

Em todos os casos, a collection que você precisa copiar não deve ser null e não deve conter nenhum elemento null. Se esta collection tiver duplicatas, apenas um desses elementos será mantido no caso de [`Set.copyOf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html#copyOf\(java.util.Collection\)>).

O que você obtém em troca é uma cópia imutável da collection passada como argumento. Assim, modificar esta collection não será refletido na lista ou set que você obtém como cópia.

Nenhuma das implementações que você obtém aceita valores `null`. Se você tentar copiar uma collection com valores `null`, você receberá uma [`NullPointerException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NullPointerException.html>).

## Empacotando um Array em uma List

O Collections Framework possui uma classe chamada [`Arrays`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html>) com cerca de 200 métodos para manipular arrays. A maioria deles implementa vários algoritmos em arrays, como ordenação, fusão, busca, e não são abordados nesta seção.

Há um, no entanto, que vale a pena mencionar: [`Arrays.asList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html#asList\(T...\)>). Este método recebe um vararg como argumento e retorna uma [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) dos elementos que você passou, preservando sua ordem. Este método não faz parte dos _métodos de fábrica de conveniência para collections_, mas ainda é muito útil.

Esta [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) atua como um wrapper em um array e se comporta da mesma maneira, o que pode ser um pouco confuso no início. Uma vez que você definiu o tamanho de um array, você não pode alterá-lo. Isso significa que você não pode adicionar um elemento a um array existente, nem pode remover um elemento dele. Tudo o que você pode fazer é substituir um elemento existente por outro, possivelmente null.

A [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) que você obtém ao chamar [`Arrays.asList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html#asList\(T...\)>) faz exatamente isso.

  * Se você tentar adicionar ou remover um elemento, você receberá uma [`UnsupportedOperationException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/UnsupportedOperationException.html>), seja diretamente ou através do iterator.
  * Substituir elementos existentes está OK.

Portanto, esta lista não é imutável, mas existem restrições sobre como você pode alterá-la.

## Usando a Classe de Fábrica Collections para Processar uma Collection

O Collections Framework vem com outra classe de fábrica: [`Collections`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html>), com um conjunto de métodos para manipular collections e seu conteúdo. Existem cerca de 70 métodos nesta classe, seria tedioso examiná-los um por um, então vamos apresentar um subconjunto deles.

### Extraindo o Mínimo ou o Máximo de uma Collection

A classe [`Collections`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html>) oferece dois métodos para isso: [`min()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html#min\(java.util.Collection\)>) e [`max()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html#max\(java.util.Collection\)>). Ambos os métodos recebem a collection como argumento da qual o mínimo ou o máximo é extraído. Ambos os métodos possuem uma sobrecarga que também recebe um comparator como argumento adicional.

Se nenhum comparator for fornecido, os elementos da collection devem implementar [`Comparable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html>). Caso contrário, uma [`ClassCastException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ClassCastException.html>) será lançada. Se um comparator for fornecido, ele será usado para obter o mínimo ou o máximo, independentemente de os elementos da collection serem comparáveis ou não.

Obter o mínimo ou o máximo de uma collection vazia com este método lançará uma [`NoSuchElementException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NoSuchElementException.html>).

### Encontrando uma Sublist em uma List

Dois métodos localizam uma determinada sublist em uma lista maior:

  * [`indexOfSublist(List<?> source, List<?> target)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html#indexOfSubList\(java.util.List,java.util.List\)>): retorna o primeiro índice do primeiro elemento da lista `target` na lista `source`, ou -1 se não existir;
  * [`lastIndexOfSublist(List<?> source, List<?> target)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html#lastIndexOfSubList\(java.util.List,java.util.List\)>): retorna o último desses índices.

### Alterando a Ordem dos Elementos de uma List

Vários métodos podem alterar a ordem dos elementos de uma lista:

  * [`sort()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html#sort\(java.util.List\)>) ordena a lista no local. Este método pode receber um comparator como argumento. Como de costume, se nenhum comparator for fornecido, os elementos da lista devem ser comparáveis. Se um comparator for fornecido, ele será usado para comparar os elementos. A partir do Java SE 8, você deve preferir o método [`sort()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#sort\(java.util.Comparator\)>) da interface [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>).
  * [`shuffle()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html#shuffle\(java.util.List\)>) embaralha aleatoriamente os elementos da lista fornecida. Você pode fornecer sua instância de [`Random`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Random.html>) se precisar de um embaralhamento aleatório que possa repetir.
  * [`rotate()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html#rotate\(java.util.List,int\)>) rotaciona os elementos da lista. Após uma rotação, o elemento no índice 0 será encontrado no índice 1 e assim por diante. Os últimos elementos serão movidos para o primeiro lugar da lista. Você pode combinar [`subList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#subList\(int,int\)>) e [`rotate()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html#rotate\(java.util.List,int\)>) para remover um elemento em um determinado índice e inseri-lo em outro lugar na lista. Isso pode ser feito com o seguinte código:

```java
List<String> list = new ArrayList<>(List.of("A", "B", "C", "D", "E"));
int fromIndex = 1; // Element "B"
int toIndex = 3; // Before element "D"

// Remove the element at fromIndex
String element = list.remove(fromIndex);

// Add it at the end of the sublist
list.add(toIndex - 1, element);

System.out.println(list);
```

O resultado é o seguinte:

```
[A, C, B, D, E]
```

O elemento no índice `fromIndex` foi removido de seu lugar, a lista foi reorganizada de acordo, e o elemento foi inserido no índice `toIndex - 1`.

  * [`reverse()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html#reverse\(java.util.List\)>): inverte a ordem dos elementos da lista.
  * [`swap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html#swap\(java.util.List,int,int\)>): troca dois elementos da lista.

### Empacotando uma Collection em uma Collection Imutável

A classe de fábrica [`Collections`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html>) oferece vários métodos para criar wrappers imutáveis para suas collections ou maps. O conteúdo da estrutura não é duplicado; o que você obtém é um wrapper em torno de sua estrutura. Todas as tentativas de modificá-la levantarão exceções.

Todos esses métodos começam com `unmodifiable`, seguido pelo nome do tipo de sua estrutura. Por exemplo, para criar um wrapper imutável de uma lista, você pode chamar:

```java
List<String> list = new ArrayList<>(List.of("A", "B", "C"));
List<String> unmodifiableList = Collections.unmodifiableList(list);
```

Apenas um aviso: não é possível modificar sua collection através deste wrapper. Mas este wrapper é apoiado por sua collection, então se você a modificar por outro meio, essa modificação será refletida na collection imutável. Vejamos isso no seguinte código:

```java
List<String> list = new ArrayList<>(List.of("A", "B", "C"));
List<String> unmodifiableList = Collections.unmodifiableList(list);

// Try to modify the unmodifiable list
try {
    unmodifiableList.add("D");
} catch (UnsupportedOperationException e) {
    System.out.println("Cannot modify unmodifiableList directly: " + e.getMessage());
}

// Modify the original list
list.add("D");
System.out.println("Original list after modification: " + list);
System.out.println("Unmodifiable list reflects changes in original: " + unmodifiableList);
```

Executar este exemplo lhe dará o seguinte:

```
Cannot modify unmodifiableList directly: add
Original list after modification: [A, B, C, D]
Unmodifiable list reflects changes in original: [A, B, C, D]
```

Se você planeja criar uma collection imutável usando este padrão, copiá-la defensivamente primeiro pode ser uma precaução segura.

### Empacotando uma Collection em uma Collection Sincronizada

Da mesma forma que você pode criar wrappers imutáveis para seus maps e collections, a classe de fábrica [`Collections`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html>) pode criar wrappers sincronizados para eles. Os padrões seguem a mesma convenção de nomenclatura dos nomes para métodos que criam wrappers imutáveis: os métodos são chamados `synchronized` seguido por [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>), [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>), [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>), etc...

Há duas precauções que você precisa seguir.

  * Todos os acessos à sua collection devem ser feitos através do wrapper que você obtém
  * Atravessar sua collection com um iterator ou um stream deve ser sincronizado pelo código chamador na própria lista.

Não seguir essas regras exporá seu código a race conditions.

Sincronizar collections usando os métodos de fábrica [`Collections`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html>) pode não ser sua melhor escolha. O framework Java Util Concurrent (no pacote [`java.util.concurrent`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/package-summary.html>)) tem soluções melhores a oferecer.

### Neste tutorial

Criando Collections Imutáveis Obtendo uma Cópia Imutável de uma Collection Empacotando um Array em uma List Usando a Classe de Fábrica Collections para Processar uma Collection

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Estendendo Collection com Set, SortedSet e NavigableSet](<#/doc/tutorials/api/collections-framework/sets>)

➜

**Tutorial Atual**

Criando e Processando Dados com os Métodos de Fábrica de Collections

➜

**Próximo na Série**

[Armazenando Elementos em Stacks e Queues](<#/doc/tutorials/api/collections-framework/stacks-queues>)

**Anterior na Série:** [Estendendo Collection com Set, SortedSet e NavigableSet](<#/doc/tutorials/api/collections-framework/sets>)

**Próximo na Série:** [Armazenando Elementos em Stacks e Queues](<#/doc/tutorials/api/collections-framework/stacks-queues>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Collections Framework ](<#/doc/tutorials/api/collections-framework>) > Criando e Processando Dados com os Métodos de Fábrica de Collections