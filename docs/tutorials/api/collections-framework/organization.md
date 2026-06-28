# Conhecendo a Hierarquia de Coleções

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Collections Framework ](<#/doc/tutorials/api/collections-framework>) > Conhecendo a Hierarquia de Coleções

**Anterior na Série**

[Armazenando Dados Usando o Collections Framework](<#/doc/tutorials/api/collections-framework/intro>)

➜

**Tutorial Atual**

Conhecendo a Hierarquia de Coleções

➜

**Próximo na Série**

[Armazenando Elementos em uma Collection](<#/doc/tutorials/api/collections-framework/collection-interface>)

**Anterior na Série:** [Armazenando Dados Usando o Collections Framework](<#/doc/tutorials/api/collections-framework/intro>)

**Próximo na Série:** [Armazenando Elementos em uma Collection](<#/doc/tutorials/api/collections-framework/collection-interface>)

# Conhecendo a Hierarquia de Coleções

## Evitando se Perder na Hierarquia de Coleções

O Collections Framework é dividido em várias hierarquias de interfaces e classes. A primeira que você precisa entender é a seguinte: a hierarquia da interface Collection.

A Hierarquia da Interface Collection

Observe que algumas interfaces foram omitidas, as quais você verá mais tarde.

## A Interface Iterable

A primeira interface desta hierarquia é a interface [`Iterable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Iterable.html>), e ela, de fato, não faz parte do Collections Framework. Ainda vale a pena mencioná-la aqui porque é a super interface da interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>), e, portanto, de todas as interfaces desta hierarquia.

A interface [`Iterable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Iterable.html>) é uma adição do Java SE 5 (2004). Um objeto que implementa [`Iterable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Iterable.html>) é um objeto sobre o qual você pode iterar. Ela foi adicionada no Java SE 5 juntamente com o padrão de código _for each_.

Você já deve estar familiarizado com esta forma de iterar sobre os elementos de uma [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>):

Você já deve saber que pode iterar sobre qualquer collection usando este padrão, ou qualquer array. Acontece que, na verdade, qualquer instância de [`Iterable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Iterable.html>) pode ser usada aqui.

Implementar a interface [`Iterable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Iterable.html>) é muito fácil: tudo o que você precisa fazer é fornecer uma instância de outra interface, [`Iterator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html>), que você verá a seguir.

## Armazenando Elementos em um Contêiner com a Interface Collection

Todas as outras interfaces são sobre armazenar elementos em contêineres.

As duas interfaces [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) e [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) compartilham um comportamento comum, que é modelado pela interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>). A interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) modela várias operações em contêineres de elementos. Sem entrar nos detalhes técnicos (ainda!), aqui está o que você pode fazer com uma [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>):

  * adicionar ou remover elementos;
  * testar a presença de um determinado elemento;
  * solicitar o número de elementos contidos, ou se esta collection está vazia;
  * limpar este conteúdo.

Como uma [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) é um conjunto de elementos, também existem operações de conjunto definidas na interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>):

  * testar a inclusão de um conjunto em outro conjunto;
  * união;
  * interseção;
  * complemento.

Por fim, a interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) também modela diferentes formas de acessar seus elementos:

  * você pode iterar sobre os elementos de uma collection, através do uso de um iterator;
  * você pode criar um stream sobre esses elementos, que pode ser paralelo.

Claro, todas essas operações também estão disponíveis em [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) e [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>). Alguém pode perguntar: o que faz a diferença entre uma instância simples de [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) e uma instância de [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) ou uma instância de [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>)?

## Estendendo Collection com List

A diferença entre uma [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) de elementos e uma [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) de elementos é que uma [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) lembra em que ordem seus elementos foram adicionados.

A primeira consequência é que, se você iterar sobre os elementos de uma list, o primeiro elemento que você obterá é o primeiro que foi adicionado. Em seguida, você obterá o segundo, e assim por diante até que todos os elementos tenham sido vistos. Assim, a ordem em que você iterará sobre os elementos é sempre a mesma, e é fixada pela ordem em que esses elementos foram adicionados. Você não tem essa garantia com uma [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) simples nem com um [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>).

> Acontece que algumas implementações de [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) fornecidas pelo Collections Framework acabam sempre iterando sobre os elementos na mesma ordem. Isso pode ser um efeito acidental. A menos que você esteja usando uma implementação de [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) que garanta uma ordem de encontro estável, seu código não deve depender desse comportamento.

Há uma segunda consequência, talvez não tão clara quanto a primeira, que é o fato de que os elementos de uma list possuem um índice. Consultar uma collection pelo seu _primeiro_ elemento não faz sentido. Consultar uma list pelo seu primeiro elemento faz sentido, já que uma list se lembra disso.

Como esses índices são tratados? Bem, mais uma vez, esta é a responsabilidade da implementação. O primeiro papel de uma interface é especificar um comportamento, não dizer como uma implementação deve alcançá-lo.

Como você verá, a interface [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) adiciona novas operações à interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>). Como os elementos de uma list possuem um índice, você pode fazer o seguinte com esse índice.

  * Obter um elemento em um índice específico, ou excluí-lo
  * Inserir um elemento ou substituir um elemento em uma posição específica
  * Obter um intervalo de elementos entre dois índices.

## Estendendo Collection com Set

A diferença entre um [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) de elementos e uma [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) de elementos é que você não pode ter duplicatas em um [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>). Você pode ter várias instâncias da mesma classe que são iguais em uma [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>), ou até mesmo a mesma instância mais de uma vez. Isso não é permitido em um [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>). Como isso é imposto é responsabilidade da implementação, você verá isso mais tarde neste tutorial.

Uma das consequências desse comportamento é que adicionar um elemento a um [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) pode falhar.

Então você pode se perguntar: posso ter um contêiner que impeça a existência de duplicatas e no qual os elementos tenham um índice? A resposta não é tão simples. O Collections Framework oferece uma implementação de [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) com a qual você iterará sobre os elementos sempre na mesma ordem, mas esses elementos não possuem um índice, então esta classe não implementa [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>).

Essa diferença de comportamento não traz nenhuma nova operação na interface [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>).

## Ordenando os elementos de um Set com SortedSet e NavigableSet

A interface [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) possui duas extensões: [`SortedSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html>) e [`NavigableSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableSet.html>).

A interface [`SortedSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html>) mantém seus elementos ordenados em ordem crescente. Mais uma vez, como isso é imposto é responsabilidade da implementação, como você verá mais tarde.

Para poder ordená-los, um [`SortedSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html>) precisa comparar seus elementos. Como ele pode conseguir isso? Bem, existem dois mecanismos padrão definidos na linguagem Java para isso.

  * Seus elementos podem implementar a interface [`Comparable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html>), e fornecer um método [`compareTo()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html#compareTo\(T\)>)
  * Você fornece um [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) ao [`SortedSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html>) para que ele possa compará-los.

Mesmo que seus elementos sejam [`Comparable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html>), você ainda pode fornecer um [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) ao construir um [`SortedSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html>). Isso pode ser útil se você precisar ordenar seus elementos em uma ordem diferente daquela implementada no método [`compareTo()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html#compareTo\(T\)>).

> Qual é a diferença entre ordenar e organizar? Uma [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) mantém seus elementos na ordem em que foram adicionados, e um [`SortedSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html>) os mantém ordenados. Ordenar elementos significa que o primeiro elemento que você obtém ao percorrer um set será o menor, no sentido de uma dada lógica de comparação. Organizar elementos significa que a ordem em que você os adicionou em uma list é mantida durante toda a vida desta list. Assim, o primeiro elemento que você obtém ao percorrer uma list é o primeiro que foi adicionado a ela.

O [`SortedSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html>) adiciona várias operações a [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>). Aqui está o que você pode fazer com um [`SortedSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html>).

  * Você pode obter o menor elemento e o maior elemento do set
  * Você pode extrair um [`headSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html#headSet\(E\)>) e um [`tailSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html#tailSet\(E\)>) de todos os elementos menores ou maiores que um determinado elemento.

A iteração sobre os elementos de um [`SortedSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html>) será feita do menor elemento para o maior.

O [`NavigableSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NavigableSet.html>) não altera o comportamento de um [`SortedSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html>). Ele adiciona várias operações muito úteis a [`SortedSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/SortedSet.html>), entre elas a possibilidade de iterar sobre os elementos em ordem decrescente. Você verá mais detalhes sobre isso mais tarde.

### Neste tutorial

Evitando se Perder na Hierarquia de Coleções A Interface Iterable Armazenando Elementos em um Contêiner com a Interface Collection Estendendo Collection com List Estendendo Collection com Set Ordenando os elementos de um Set com SortedSet e NavigableSet

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Armazenando Dados Usando o Collections Framework](<#/doc/tutorials/api/collections-framework/intro>)

➜

**Tutorial Atual**

Conhecendo a Hierarquia de Coleções

➜

**Próximo na Série**

[Armazenando Elementos em uma Collection](<#/doc/tutorials/api/collections-framework/collection-interface>)

**Anterior na Série:** [Armazenando Dados Usando o Collections Framework](<#/doc/tutorials/api/collections-framework/intro>)

**Próximo na Série:** [Armazenando Elementos em uma Collection](<#/doc/tutorials/api/collections-framework/collection-interface>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Collections Framework ](<#/doc/tutorials/api/collections-framework>) > Conhecendo a Hierarquia de Coleções