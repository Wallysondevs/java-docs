# Armazenando Elementos em Pilhas e Filas

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Collections Framework ](<#/doc/tutorials/api/collections-framework>) > Armazenando Elementos em Pilhas e Filas

**Anterior na Série**

[Criando e Processando Dados com os Métodos de Fábrica de Coleções](<#/doc/tutorials/api/collections-framework/factory-methods>)

➜

**Tutorial Atual**

Armazenando Elementos em Pilhas e Filas

➜

**Próximo na Série**

[Usando Maps para Armazenar Pares Chave-Valor](<#/doc/tutorials/api/collections-framework/maps>)

**Anterior na Série:** [Criando e Processando Dados com os Métodos de Fábrica de Coleções](<#/doc/tutorials/api/collections-framework/factory-methods>)

**Próximo na Série:** [Usando Maps para Armazenar Pares Chave-Valor](<#/doc/tutorials/api/collections-framework/maps>)

# Armazenando Elementos em Pilhas e Filas

## Encontrando Seu Caminho na Hierarquia de Filas

O Java SE 5 viu a adição de uma nova interface no Collections Framework: a interface [`Queue`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Queue.html>), posteriormente estendida no Java SE 6 pela interface [`Deque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html>). A interface [`Queue`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Queue.html>) é uma extensão da interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>).

A Hierarquia da Interface Queue

## Inserindo, Removendo e Espiando

As estruturas de pilha e fila são estruturas de dados clássicas na computação. Pilhas também são chamadas de pilhas LIFO, onde LIFO significa Last In, First Out (Último a Entrar, Primeiro a Sair). Filas são conhecidas como FIFO: First In First Out (Primeiro a Entrar, Primeiro a Sair).

Essas estruturas são muito simples e oferecem três operações principais.

  * _push(element)_ : adiciona um elemento à fila ou à pilha
  * _pop()_ : remove um elemento da pilha, ou seja, o elemento adicionado mais recentemente
  * _poll()_ : remove um elemento da fila, ou seja, o elemento adicionado mais antigo
  * _peek()_ : permite que você veja o elemento que obterá com um _pop()_ ou um _poll()_ , mas sem removê-lo da fila ou da pilha.

Existem duas razões para explicar o sucesso dessas estruturas na computação. A primeira é a sua simplicidade. Mesmo nos primórdios da computação, implementá-las era simples. A segunda é a sua utilidade. Muitos algoritmos usam pilhas para suas implementações.

## Modelando Filas e Pilhas

O Collections Framework oferece duas interfaces para modelar filas e pilhas:

  * a interface [`Queue`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Queue.html>) modela uma fila;
  * a interface [`Deque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html>) modela uma fila de duas pontas (daí o nome). Você pode inserir, remover, consultar e espiar elementos tanto na cauda quanto na cabeça de um [`Deque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html>), tornando-o tanto uma fila quanto uma pilha.

Pilhas e filas também são amplamente utilizadas em programação concorrente. Essas interfaces são ainda mais estendidas por outras interfaces, adicionando métodos úteis neste campo. Essas interfaces, [`BlockingQueue`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/BlockingQueue.html>), [`BlockingDeque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/BlockingDeque.html>) e [`TransferQueue`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/TransferQueue.html>), estão na intersecção do Collections Framework e da programação concorrente em Java, o que está fora do escopo deste tutorial.

Tanto as interfaces [`Queue`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Queue.html>) quanto [`Deque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html>) adicionam comportamento a essas três operações fundamentais para lidar com dois casos extremos.

  * Uma fila pode estar cheia e não ser capaz de aceitar mais elementos
  * Uma fila pode estar vazia e não pode retornar um elemento com uma operação _pop_ , _poll_ , nem _peek_.

Na verdade, esta pergunta precisa ser respondida: como uma implementação deve se comportar nesses dois casos?

## Modelando Filas FIFO com Queue

A interface [`Queue`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Queue.html>) oferece duas maneiras de lidar com esses casos extremos. Uma exceção pode ser lançada, ou um valor especial pode ser retornado.

Aqui está a tabela dos métodos que [`Queue`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Queue.html>) oferece.

Operação | Método | Comportamento quando a fila está cheia ou vazia
---|---|---
Inserir | [`add(element)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Queue.html#add\(E\)>) | lança uma [`IllegalStateException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IllegalStateException.html>)
| [`offer(element)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Queue.html#offer\(E\)>) | retorna `false`
Remover | [`remove()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Queue.html#remove\(\)>) | lança uma [`NoSuchElementException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NoSuchElementException.html>)
| [`poll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Queue.html#poll\(\)>) | retorna `null`
Espiar | [`element()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Queue.html#element\(\)>) | lança uma [`NoSuchElementException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NoSuchElementException.html>)
| [`peek()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Queue.html#peek\(\)>) | retorna `null`

## Modelando Pilhas LIFO e Filas FIFO com Deque

O Java SE 6 adicionou a interface [`Deque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html>) como uma extensão da interface [`Queue`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Queue.html>). É claro que os métodos definidos em [`Queue`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Queue.html>) ainda estão disponíveis em [`Deque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html>), mas [`Deque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html>) trouxe uma nova convenção de nomenclatura. Assim, esses métodos foram duplicados em [`Deque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html>), seguindo esta nova convenção de nomenclatura.

Aqui está a tabela dos métodos definidos em [`Deque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html>) para as operações FIFO.

Operação FIFO | Método | Comportamento quando a fila está cheia ou vazia
---|---|---
Inserir | [`addLast(element)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html#addLast\(E\)>) | lança uma [`IllegalStateException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IllegalStateException.html>)
| [`offerLast(element)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html#offerLast\(E\)>) | retorna `false`
Remover | [`removeFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html#removeFirst\(\)>) | lança uma [`NoSuchElementException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NoSuchElementException.html>)
| [`pollFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html#pollFirst\(\)>) | retorna `null`
Espiar | [`getFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html#getFirst\(\)>) | lança uma [`NoSuchElementException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NoSuchElementException.html>)
| [`peekFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html#peekFirst\(\)>) | retorna `null`

E aqui está a tabela dos métodos definidos em [`Deque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html>) para as operações LIFO.

Operação LIFO | Método | Comportamento quando a fila está cheia ou vazia
---|---|---
Inserir | [`addFirst(element)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html#addFirst\(E\)>) | lança uma [`IllegalStateException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IllegalStateException.html>)
| [`offerFirst(element)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html#offerFirst\(E\)>) | retorna `false`
Remover | [`removeFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html#removeFirst\(\)>) | lança uma [`NoSuchElementException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NoSuchElementException.html>)
| [`pollFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html#pollFirst\(\)>) | retorna `null`
Espiar | [`getFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html#getFirst\(\)>) | lança uma [`NoSuchElementException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NoSuchElementException.html>)
| [`peekFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html#peekFirst\(\)>) | retorna `null`

A convenção de nomenclatura de [`Deque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html>) é direta e é a mesma seguida na interface [`Queue`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Queue.html>). Há uma diferença, no entanto: as operações de espiar (peek) são nomeadas [`getFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html#getFirst\(\)>) e [`getLast()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html#getLast\(\)>) em [`Deque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html>), e [`element()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Queue.html#element\(\)>) em [`Queue`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Queue.html>).

Além disso, [`Deque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html>) também define os métodos que você esperaria em qualquer classe de fila ou pilha:

  * [`push(element)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html#push\(E\)>): adiciona o `element` fornecido à cabeça da fila de duas pontas. Este método lança uma [`IllegalStateException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IllegalStateException.html>) se a fila de duas pontas não puder aceitar o elemento.
  * [`pop()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html#pop\(\)>): remove e retorna o elemento na cabeça da fila de duas pontas. Este método lança uma [`NoSuchElementException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NoSuchElementException.html>) se não houver elemento para remover.
  * [`poll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html#poll\(\)>): faz o mesmo na cabeça da fila de duas pontas. Este método retorna `null` se não houver elemento para consultar.
  * [`peek()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html#peek\(\)>): mostra o elemento na cabeça da fila de duas pontas. Este método retorna `null` se não houver elemento para espiar.

## Implementando Queue e Deque

O Collections Framework oferece três implementações de [`Queue`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Queue.html>) e [`Deque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html>), fora do espaço de programação concorrente:

  * [`ArrayDeque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayDeque.html>): que implementa ambas. Esta implementação é baseada em um array. A capacidade desta classe cresce automaticamente à medida que os elementos são adicionados. Assim, esta implementação sempre aceita novos elementos.
  * [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>): que também implementa ambas. Esta implementação é baseada em uma lista encadeada, tornando o acesso ao seu primeiro e último elemento muito eficiente. Uma [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) sempre aceitará novos elementos.
  * [`PriorityQueue`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/PriorityQueue.html>): que implementa apenas [`Queue`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Queue.html>). Esta fila é baseada em um heap de prioridade que mantém seus elementos ordenados por sua ordem natural ou por uma ordem especificada por um [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>). A cabeça desta fila é sempre o menor elemento da fila em relação à ordenação especificada. A capacidade desta classe cresce automaticamente à medida que os elementos são adicionados. Inserir objetos que não implementam [`Comparable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html>) lançará uma [`ClassCastException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ClassCastException.html>).

## Evitando a Classe Stack

Pode parecer tentador usar a classe [`Stack`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Stack.html>) oferecida pelo JDK. Esta classe é simples de usar e entender. Ela possui os três métodos esperados [`push(element)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Stack.html#push\(E\)>), [`pop()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Stack.html#pop\(\)>) e [`peek()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Stack.html#peek\(\)>), e ver esta classe referenciada em seu código a torna perfeitamente legível.

Acontece que esta classe é uma extensão da classe [`Vector`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Vector.html>). Antigamente, antes da introdução do Collections Framework, [`Vector`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Vector.html>) era a melhor escolha para trabalhar com uma lista. Embora [`Vector`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Vector.html>) não esteja depreciada, seu uso é desencorajado. O mesmo vale para o uso da classe [`Stack`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Stack.html>).

A classe [`Vector`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Vector.html>) é thread-safe, e o mesmo acontece com [`Stack`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Stack.html>). Se você não precisa da segurança de thread, então pode substituir com segurança seu uso por [`Deque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html>) e [`ArrayDeque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayDeque.html>). Se o que você precisa é de uma pilha thread-safe, então você deve explorar as implementações da interface [`BlockingQueue`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/BlockingQueue.html>).

### Neste tutorial

Encontrando Seu Caminho na Hierarquia de Filas Inserindo, Removendo e Espiando Modelando Filas e Pilhas Modelando Filas FIFO com Queue Modelando Pilhas LIFO e Filas FIFO com Deque Implementando Queue e Deque Evitando a Classe Stack

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Criando e Processando Dados com os Métodos de Fábrica de Coleções](<#/doc/tutorials/api/collections-framework/factory-methods>)

➜

**Tutorial Atual**

Armazenando Elementos em Pilhas e Filas

➜

**Próximo na Série**

[Usando Maps para Armazenar Pares Chave-Valor](<#/doc/tutorials/api/collections-framework/maps>)

**Anterior na Série:** [Criando e Processando Dados com os Métodos de Fábrica de Coleções](<#/doc/tutorials/api/collections-framework/factory-methods>)

**Próximo na Série:** [Usando Maps para Armazenar Pares Chave-Valor](<#/doc/tutorials/api/collections-framework/maps>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Collections Framework ](<#/doc/tutorials/api/collections-framework>) > Armazenando Elementos em Pilhas e Filas