# Armazenando Dados Usando o Collections Framework

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Collections Framework ](<#/doc/tutorials/api/collections-framework>) > Armazenando Dados Usando o Collections Framework 

**Tutorial Atual**

Armazenando Dados Usando o Collections Framework

➜

**Próximo na Série**

[Conhecendo a Hierarquia de Coleções](<#/doc/tutorials/api/collections-framework/organization>)

**Próximo na Série:** [Conhecendo a Hierarquia de Coleções](<#/doc/tutorials/api/collections-framework/organization>)

# Armazenando Dados Usando o Collections Framework

 

## Apresentando o Collections Framework

O Collections Framework é a API mais amplamente utilizada do JDK. Seja qual for a aplicação em que você esteja trabalhando, é provável que você precise armazenar e processar dados em memória em algum momento. 

A história das estruturas de dados remonta quase tão longe quanto a própria computação. O Collections Framework é uma implementação dos conceitos de como armazenar, organizar e acessar dados em memória que foram desenvolvidos muito antes da invenção do Java. O Collections Framework faz isso de uma forma muito eficiente, como você verá.

O Collections Framework foi introduzido pela primeira vez no Java SE 2, em 1998, e foi reescrito duas vezes desde então: 

  * no Java SE 5, quando os generics foram adicionados;
  * no Java 8, quando as lambda expressions foram introduzidas, juntamente com os default methods em interfaces. 



Estas duas são as atualizações mais importantes do Collections Framework que foram feitas até agora. Mas, na verdade, quase todas as versões do JDK possuem seu conjunto de mudanças no Collections Framework. 

Nesta parte, você aprenderá as estruturas de dados mais úteis que o Collections Framework tem a oferecer, juntamente com os padrões que você usará para manipular esses dados em sua aplicação.

A primeira coisa que você precisa saber é que, de um ponto de vista técnico, o Collections Framework é um conjunto de interfaces que modela diferentes formas de armazenar dados em diferentes tipos de contêineres. Em seguida, o Framework fornece pelo menos uma implementação para cada interface. Conhecer essas implementações é tão importante quanto as interfaces, e escolher a correta depende do que você precisa fazer com ela. 

 

## Encontrando Seu Caminho no Collections Framework

A quantidade de interfaces e classes no Collections Framework pode ser esmagadora no início. De fato, existem muitas estruturas disponíveis, tanto classes quanto interfaces. Algumas têm nomes autoexplicativos, como [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>), algumas carregam comportamento, como [`ConcurrentHashMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html>), algumas podem soar estranhas, como [`ConcurrentSkipListMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ConcurrentSkipListMap.html>).

Você usará alguns desses elementos com muito mais frequência do que outros. Se você já está familiarizado com a linguagem Java, provavelmente já se deparou com [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>), [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) e [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>). Este tutorial foca nas estruturas mais amplamente utilizadas do Collections Framework, aquelas que você usará diariamente como desenvolvedor Java, e que você precisa conhecer e entender melhor.

Dito isso, você precisa ter uma visão geral do que está disponível para você no Collections Framework. 

Primeiro, o framework consiste em interfaces e implementações. Escolher a interface correta significa que você precisa saber quais funções deseja trazer para sua aplicação. Se o que você precisa consiste em: 

  * armazenar objetos e iterar sobre eles?
  * colocar seu objeto em uma fila (push) e retirá-los (pop)? 
  * recuperá-los com o uso de uma chave?
  * acessá-los pelo seu índice?
  * ordená-los?
  * impedir a presença de duplicatas, ou valores null?



Escolher a implementação correta significa que você precisa saber como você usará essas funcionalidades:

  * O acesso aos seus objetos será feito por iteração, ou acesso aleatório e indexado?
  * Os objetos serão fixos no lançamento da sua aplicação e não mudarão muito ao longo de sua vida útil?
  * Você está armazenando um grande número de objetos? Você precisará verificar frequentemente a presença de certos objetos?
  * A estrutura em que você armazena seus objetos precisará ser acessada concorrentemente?



O Collections Framework pode lhe dar a solução certa para todos esses problemas. 

Existem duas categorias principais de interfaces no Collections Framework: collections e maps. 

Collections são sobre armazenar objetos e iterar sobre eles. A interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) é a interface raiz desta categoria. Na verdade, a interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) estende a interface [`Iterable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Iterable.html>), mas esta interface não faz parte do Collections Framework. 

Um Map armazena um objeto juntamente com uma chave, que representa esse objeto, assim como uma chave primária representa um objeto em um banco de dados, se você estiver familiarizado com este conceito. Às vezes você ouvirá que maps armazenam pares _chave/valor_, o que descreve exatamente o que um map faz. A interface [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>) é a interface raiz desta categoria. 

Não há relação direta entre as interfaces da hierarquia [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) e da hierarquia [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>). 

Juntamente com essas collections e maps, você também precisa saber que pode encontrar interfaces para modelar queues e stacks na hierarquia [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>). Queues e stacks não são realmente sobre iterar sobre collections de objetos, mas como foram adicionadas à hierarquia [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>), verifica-se que você pode fazer isso com elas. 

Há uma última hierarquia que você também precisa conhecer, que é a hierarquia [`Iterator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html>). Um iterator é um objeto que pode iterar sobre uma collection de objetos, e faz parte do Collections Framework. 

Isso forma duas categorias principais, [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) e [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>), uma subcategoria, [`Queue`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Queue.html>), e uma categoria lateral, [`Iterator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html>). 

 

## Evitando o Uso de Interfaces e Implementações Antigas

O Collections Framework foi introduzido apenas no Java 2, o que significa que havia uma vida antes dele. Essa vida consistia em várias classes e interfaces que ainda estão no JDK, para preservar a compatibilidade retroativa, mas que você não deve mais usar em suas aplicações.

Essas classes e interfaces são as seguintes: 

  * [`Vector`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Vector.html>) e [`Stack`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Stack.html>). A classe [`Vector`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Vector.html>) foi adaptada para implementar a interface [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>). Se você estiver usando um vector em um ambiente não concorrente, então você pode substituí-lo com segurança por [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>). A classe [`Stack`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Stack.html>) estende [`Vector`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Vector.html>) e deve ser substituída por [`ArrayDeque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayDeque.html>) em ambientes não concorrentes.
  * A classe [`Vector`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Vector.html>) usa a interface [`Enumeration`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Enumeration.html>) para modelar seu iterator. Esta interface não deve ser mais usada: a interface preferida agora é a interface [`Iterator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html>). 
  * [`HashTable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Hashtable.html>): Esta classe foi adaptada para implementar a interface [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>). Se você estiver usando instâncias desta classe em um ambiente não concorrente, então você pode substituir seu uso com segurança por [`HashMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashMap.html>). Em um ambiente concorrente, [`ConcurrentHashMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html>) pode ser usado como substituto. 



 

## Por Que Escolher uma Collection em Vez de um Array?

Você pode estar se perguntando por que deveria se preocupar em aprender o Collections Framework quando pode ter a sensação de que colocar seus dados em um bom e velho array resolve o problema. 

O fato é que, em qualquer caso, se você tem uma solução simples, que você domina bem e que se encaixa nas suas necessidades, então você deve definitivamente mantê-la! 

O que uma collection pode fazer por você, que um array não pode?

  * Uma collection rastreia o número de elementos que ela contém
  * A capacidade de uma collection não é limitada: você pode adicionar (quase) qualquer número de elementos em uma collection
  * Uma collection pode controlar quais elementos você pode armazenar nela. Por exemplo, você pode impedir que elementos null sejam adicionados
  * Uma collection pode ser consultada pela presença de um determinado elemento
  * Uma collection fornece operações como intersecção ou fusão com outra collection. 



Esta é apenas uma pequena amostra do que uma collection pode fazer por você. Na verdade, como uma collection é um objeto e, dado que um objeto é extensível, você pode adicionar qualquer operação que precisar na maioria das collections fornecidas pelo JDK. Não é possível fazer isso com um array.

### Neste tutorial

Apresentando o Collections Framework Encontrando Seu Caminho no Collections Framework Evitando o Uso de Interfaces e Implementações Antigas Por Que Escolher uma Collection em Vez de um Array?

  


Última atualização: 14 de setembro de 2021

  


**Tutorial Atual**

Armazenando Dados Usando o Collections Framework

➜

**Próximo na Série**

[Conhecendo a Hierarquia de Coleções](<#/doc/tutorials/api/collections-framework/organization>)

**Próximo na Série:** [Conhecendo a Hierarquia de Coleções](<#/doc/tutorials/api/collections-framework/organization>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Collections Framework ](<#/doc/tutorials/api/collections-framework>) > Armazenando Dados Usando o Collections Framework