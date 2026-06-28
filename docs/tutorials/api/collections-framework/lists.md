# Estendendo Collection com List

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Framework de Collections ](<#/doc/tutorials/api/collections-framework>) > Estendendo Collection com List

**Anterior na Série**

[Iterando sobre os Elementos de uma Collection](<#/doc/tutorials/api/collections-framework/iterating>)

➜

**Tutorial Atual**

Estendendo Collection com List

➜

**Próximo na Série**

[Estendendo Collection com Set, SortedSet e NavigableSet](<#/doc/tutorials/api/collections-framework/sets>)

**Anterior na Série:** [Iterando sobre os Elementos de uma Collection](<#/doc/tutorials/api/collections-framework/iterating>)

**Próximo na Série:** [Estendendo Collection com Set, SortedSet e NavigableSet](<#/doc/tutorials/api/collections-framework/sets>)

# Estendendo Collection com List

## Explorando a Interface List

Se você está ansioso para praticar as operações de lista mais comuns em código real, pode pular diretamente para o final desta página: [Praticando Operações de List](<#/doc/tutorials/api/collections-framework/lists>)

A interface [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) traz duas novas funcionalidades para collections simples.

  * A ordem em que você itera sobre os elementos de uma lista é sempre a mesma, e ela respeita a ordem em que os elementos foram adicionados a esta lista.
  * Os elementos de uma lista possuem um índice.

## Escolhendo sua Implementação da Interface List

Embora a interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) não tenha uma implementação específica no Collections Framework (ela depende das implementações de suas sub-interfaces), a interface [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) possui 2: [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) e [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>). Como você deve imaginar, a primeira é construída sobre um array interno, e a segunda sobre uma lista duplamente encadeada.

Uma dessas implementações é melhor que a outra? Se você não tem certeza de qual escolher, então sua melhor opção é provavelmente [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>).

O que era verdade para listas encadeadas quando a computação foi inventada nos anos 60 não se aplica mais, e a capacidade das listas encadeadas de superar arrays em operações de inserção e exclusão é grandemente diminuída por hardware moderno, caches de CPU e "pointer chasing". Iterar sobre os elementos de um [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) é muito mais rápido do que sobre os elementos de uma [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>), principalmente devido ao "pointer chasing" e falhas de cache da CPU.

Ainda existem casos em que uma lista encadeada é mais rápida que um array. Uma lista duplamente encadeada pode acessar seu primeiro e último elemento mais rapidamente do que um [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>). Este é o principal caso de uso que torna [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) melhor que [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>). Então, se sua aplicação precisa de uma pilha Last In, First Out (LIFO, abordada mais adiante neste tutorial), ou de uma fila de espera First In, First Out (FIFO, também abordada mais adiante), e não usa nenhum outro método de [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>), então escolher uma [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) é provavelmente uma escolha melhor do que um [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>). O [`ArrayDeque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayDeque.html>) também pode ser uma implementação interessante, que não aceita valores nulos.

Por outro lado, se você planeja iterar pelos elementos da sua lista, ou acessá-los aleatoriamente por seu índice, então o [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) é provavelmente sua melhor aposta.

Você pode encontrar uma discussão mais aprofundada sobre as diferenças entre [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) e [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) no final deste capítulo, nesta página: [Escolhendo a Implementação Certa Entre ArrayList e LinkedList](<#/doc/tutorials/api/collections-framework/arraylist-vs-linkedlist>).

## Acessando os Elementos Usando um Índice

A interface [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) traz vários métodos para a interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>), que lidam com índices.

### Acessando um Único Objeto

  * [`add(index, element)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#add\(int,E\)>): insere o objeto fornecido no `index`, ajustando o índice dos elementos restantes, se houver
  * [`get(index)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#get\(int\)>): retorna o objeto no `index` fornecido
  * [`set(index, element)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#set\(int,E\)>): substitui o elemento no índice fornecido pelo novo elemento
  * [`remove(index)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#remove\(int\)>): remove o elemento no `index` fornecido, ajustando o índice dos elementos restantes.

Chamar esses métodos funciona apenas para índices válidos. Se o índice fornecido não for válido, uma exceção [`IndexOutOfBoundsException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IndexOutOfBoundsException.html>) será lançada.

### Encontrando o Índice de um Objeto

Os métodos [`indexOf(element)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#indexOf\(java.lang.Object\)>) e [`lastIndexOf(element)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#lastIndexOf\(java.lang.Object\)>) retornam o índice do elemento fornecido na lista, ou -1 se o elemento não for encontrado.

### Obtendo uma Sublista

O [`subList(start, end)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#subList\(int,int\)>) retorna uma lista consistindo dos elementos entre os índices `start` e `end - 1`. Se os índices forem inválidos, uma exceção [`IndexOutOfBoundsException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IndexOutOfBoundsException.html>) será lançada.

Note que a lista retornada é uma view (visão) da lista principal. Assim, qualquer operação de modificação na sublista é refletida na lista principal e vice-versa.

Por exemplo, você pode limpar uma parte do conteúdo de uma lista com o seguinte padrão:

Running this code gives you the following result:

### Pratique Operações de List

Experimente diferentes operações de List usando ArrayList:

### Inserindo uma Collection

O último padrão desta lista é sobre inserir uma collection em um determinado índice: [`addAll(int index, Collection collection)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#addAll\(int,java.util.Collection\)>).

## Ordenando os Elementos de uma List

Uma lista mantém seus elementos em uma ordem conhecida. Esta é a principal diferença com uma collection simples. Portanto, faz sentido ordenar os elementos de uma lista. Esta é a razão pela qual um método [`sort()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#sort\(java.util.Comparator\)>) foi adicionado à interface [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) no JDK 8.

No Java SE 7 e anteriores, você podia ordenar os elementos da sua [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) chamando [`Collections.sort()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html#sort\(java.util.List\)>) e passando sua lista como argumento, juntamente com um comparator, se necessário.

A partir do Java SE 8, você pode chamar [`sort()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#sort\(java.util.Comparator\)>) diretamente na sua lista e passar seu comparator como argumento. Não há sobrecarga deste método que não receba nenhum argumento. Chamá-lo com um comparator nulo assumirá que os elementos da sua [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) implementam [`Comparable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html>), e você receberá uma [`ClassCastException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ClassCastException.html>) se este não for o caso.

Se você não gosta de chamar métodos com argumentos nulos (e você está certo!), você ainda pode chamá-lo com [`Comparator.naturalOrder()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#naturalOrder\(\)>) para obter o mesmo resultado.

## Iterando sobre os Elementos de uma List

A interface [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) oferece mais uma forma de iterar sobre seus elementos com o [`ListIterator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ListIterator.html>). Você pode obter tal iterador chamando [`listIterator()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#listIterator\(\)>). Você pode chamar este método sem argumentos, ou passar um índice inteiro para ele. Nesse caso, a iteração começará neste índice.

A interface [`ListIterator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ListIterator.html>) estende o [`Iterator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html>) regular que você já conhece. Ela adiciona vários métodos a ele.

  * [`hasPrevious()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ListIterator.html#hasPrevious\(\)>) e [`previous()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ListIterator.html#previous\(\)>): para iterar na ordem decrescente em vez da ordem crescente
  * [`nextIndex()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ListIterator.html#nextIndex\(\)>) e [`previousIndex()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ListIterator.html#previousIndex\(\)>): para obter o índice do elemento que será retornado pela próxima chamada de [`next()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ListIterator.html#next\(\)>), ou pela próxima chamada de [`previous()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ListIterator.html#previous\(\)>)
  * [`set(element)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ListIterator.html#set\(E\)>): para atualizar o último elemento retornado por [`next()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ListIterator.html#next\(\)>) ou [`previous()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ListIterator.html#previous\(\)>). Se nenhum desses métodos tiver sido chamado neste iterador, uma [`IllegalStateException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IllegalStateException.html>) é lançada.

Vamos ver este método [`set()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ListIterator.html#set\(E\)>) em ação:

Running this code will give you the following result:

## Praticando Operações de List

### Criando e Preenchendo uma List

Você pode criar listas e adicionar elementos a elas com o seguinte padrão. Note que você verá mais padrões nos exemplos a seguir.

Executar o código anterior imprime o seguinte.

### Acessando o Primeiro e o Último Elemento de uma List

Listas dão acesso direto ao seu primeiro e último elemento.

Executar o código anterior imprime o seguinte.

### Acessando um Elemento pelo seu Índice

Listas dão acesso aos seus elementos usando seus índices, como você pode ver no exemplo a seguir.

Executar o código anterior imprime o seguinte.

Se o elemento que você está procurando estiver presente várias vezes na lista, então você pode usar o seguinte padrão para encontrar todos eles.

Executar o código anterior imprime o seguinte.

### Trabalhando com Índices de um Elemento

Você pode encontrar o índice de um determinado elemento em uma lista, como você pode ver no exemplo a seguir.

Executar o código anterior imprime o seguinte.

### Trabalhando com Sublistas

Você pode obter uma sublista de uma lista. Note que esta sublista é uma view (visão) modificável da lista original.

Executar o código anterior imprime o seguinte.

### Ordenando uma List

Você pode ordenar uma lista passando um [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>).

Executar o código anterior imprime o seguinte.

### Invertendo uma List

Você pode reordenar uma lista na ordem inversa.

Executar o código anterior imprime o seguinte. Lembre-se que o que [`List.reversed()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SequencedCollection.html#reversed\(\)>) retorna é uma view (visão) da lista original.

### Neste tutorial

Explorando a Interface List Escolhendo sua Implementação da Interface List Acessando os Elementos Usando um Índice Ordenando os Elementos de uma List Iterando sobre os Elementos de uma List Praticando Operações de List

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Iterando sobre os Elementos de uma Collection](<#/doc/tutorials/api/collections-framework/iterating>)

➜

**Tutorial Atual**

Estendendo Collection com List

➜

**Próximo na Série**

[Estendendo Collection com Set, SortedSet e NavigableSet](<#/doc/tutorials/api/collections-framework/sets>)

**Anterior na Série:** [Iterando sobre os Elementos de uma Collection](<#/doc/tutorials/api/collections-framework/iterating>)

**Próximo na Série:** [Estendendo Collection com Set, SortedSet e NavigableSet](<#/doc/tutorials/api/collections-framework/sets>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Framework de Collections ](<#/doc/tutorials/api/collections-framework>) > Estendendo Collection com List