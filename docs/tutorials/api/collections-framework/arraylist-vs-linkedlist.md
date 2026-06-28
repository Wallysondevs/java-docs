# Escolhendo a Implementação Correta Entre ArrayList e LinkedList

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Collections Framework ](<#/doc/tutorials/api/collections-framework>) > Escolhendo a Implementação Correta Entre ArrayList e LinkedList

**Anterior na Série**

[Escolhendo Tipos Imutáveis para Sua Chave](<#/doc/tutorials/api/collections-framework/choosing-keys>)

➜

**Tutorial Atual**

Escolhendo a Implementação Correta Entre ArrayList e LinkedList

➜

Este é o fim da série!

**Anterior na Série:** [Escolhendo Tipos Imutáveis para Sua Chave](<#/doc/tutorials/api/collections-framework/choosing-keys>)

# Escolhendo a Implementação Correta Entre ArrayList e LinkedList

## Introdução

O Collections Framework oferece duas implementações da interface [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>): [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) e [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>). Existe uma que seja melhor que a outra? Qual você deve escolher em sua aplicação?

Esta seção aborda a diferença entre ambas as implementações. Você verá o desempenho das operações que elas oferecem e medirá o consumo de memória dessas implementações. No final, você será capaz de fazer a escolha certa para o seu caso de uso.

## Complexidade de Algoritmo

### Complexidade de Algoritmo para Algumas Operações Comuns de Lista

O ponto de partida de todas as discussões que você pode encontrar por aí sobre as diferenças entre listas baseadas em array e listas encadeadas é sobre a complexidade de algoritmo, medida com a notação _O(n)_. A complexidade das diferentes operações oferecidas pela interface [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) depende da implementação que você usa, e é geralmente descrita como sendo _O(1)_, _O(n)_ ou até mesmo _O(ln(n))_.

Vamos comparar essa complexidade para três operações básicas.

*   Obter um elemento da lista. E como há uma diferença, vamos comparar a obtenção de um elemento do início da lista, do fim da lista e do meio da lista.
*   Iterar sobre os elementos da lista. Mais uma vez, você tem (pelo menos) dois padrões para fazer isso: iterar com um índice, ou com um [`Iterator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html>).
*   Inserir um elemento. E novamente, como há uma diferença, vamos comparar a inserção de um elemento no início da lista, no meio da lista e no fim da lista. Mesmo que este último não seja realmente uma inserção.

Não compararemos a substituição de um elemento por outro, porque é na verdade o mesmo que ler o elemento que você deseja substituir.

Aqui estão as complexidades de todas essas operações, como você pode encontrá-las em qualquer bom livro sobre estruturas de dados.

| Operação          | ArrayList | LinkedList |
| :---------------- | :-------- | :--------- |
| Leitura do primeiro | O(1)      | O(1)       |
| Leitura do último   | O(1)      | O(1)       |
| Leitura do meio     | O(1)      | O(n)       |
| Adicionar no final  | O(1)      | O(1)       |
| Inserir no início   | O(n)      | O(1)       |
| Inserir no meio     | O(n)      | O(n)       |

Isso é tudo muito bom, e não há muitas diferenças entre elas: [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) é _O(n)_ para duas operações: leitura do meio e inserção no meio.

Dois pontos merecem ser notados sobre essas operações.

Primeiro: a leitura do último é _O(1)_ em [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) porque esta implementação carrega uma referência direta para o último elemento da lista.

Segundo: as operações em [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) não são as mesmas que as operações em [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>). Para [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>), a operação consiste em mover um array de tamanho _n_ de um lugar para outro, enquanto para [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>), a operação consiste em seguir _n_ referências para encontrar o elemento com o qual você precisa trabalhar. Precisamos medir precisamente o custo dessas duas operações.

### O Que Significa a Complexidade de Algoritmo?

Esta notação _O(n)_ significa que, após um certo threshold, o tempo que leva para o algoritmo em que você está trabalhando processar seus dados é proporcional à quantidade de dados (_n_). Simplificando, se a quantidade de dados que você processa está acima deste threshold, dobrar essa quantidade também dobra seu tempo de processamento. Para uma complexidade _O(1)_, seu algoritmo não depende da quantidade de dados que você está processando. Isso é apenas lógico: ler o primeiro elemento de uma lista não depende do tamanho da sua lista.

Então, esta notação _O(n)_ na verdade lhe dá o comportamento assintótico do seu algoritmo. O ponto importante da definição anterior é _após um certo threshold_. Qual é o valor deste threshold, e como ele se compara à quantidade de dados que você está processando em sua aplicação?

Suponha que você esteja executando um algoritmo em alguns dados. E você sabe que a quantidade de operações que este algoritmo executa é exatamente _a*n + b_. Suponha agora que _a = 10_ e _b = 1_. Então, se você estiver processando 10 ou mais elementos, assumir que seu algoritmo executa em _n_ lhe dá um erro de menos de 1%. Mas se _a = 1_ e _b = 10_, então dizer que seu algoritmo executa em _n_ é válido apenas para o processamento de 1_000 ou mais elementos. Seu threshold foi 10 no primeiro exemplo, e 1_000 no segundo.

O ponto é: saber que sua complexidade é _O(n)_ é interessante, mas você precisa saber mais. Como isso se aplica ao seu caso de uso? Qual é o valor do threshold para sua aplicação? Obviamente, se o threshold é 1_000, e você está processando 100 elementos por vez, então esta fórmula não se aplica ao seu caso de uso.

As classes [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) e [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) ambas implementam a interface [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>), mas suas implementações são diferentes, levando até a sutis diferenças de comportamento.

Existem mecanismos internos ocultos que impactam o desempenho, que vão muito além da simples complexidade de algoritmo. O restante desta seção aborda todos eles, para ajudá-lo a tomar uma decisão informada sobre qual implementação você deve usar.

## Lendo Elementos de uma Lista

Vamos criar um primeiro benchmark, que consiste em ler elementos de uma lista:

*   O primeiro elemento,
*   então o último elemento,
*   então o elemento do meio.

Como esperamos ter resultados diferentes quando o tamanho da lista varia, vamos executar o benchmark para diferentes tamanhos.

Note que todos os benchmarks que você pode ver nesta página foram feitos com [JMH](<https://github.com/openjdk/jmh>), a única ferramenta que você deveria usar para medir desempenho de forma confiável.

### Lendo o Primeiro e o Último Elemento de uma Lista

O código no qual estamos executando esses benchmarks é o seguinte. Nós o executamos para [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) e [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>), e para diferentes tamanhos de lista. O resultado é passado para o blackhole do JMH, para garantir que nenhuma otimização da JVM seja acionada que tornaria esta medição irrelevante.

Você pode comparar os números que mostramos nesta página entre si, já que todos esses benchmarks foram feitos na mesma máquina. Dito isso, há muito pouca chance de você obter os mesmos números em sua máquina. Nós o encorajamos a fazer o benchmark preciso dos cálculos exatos que você precisa fazer em sua aplicação, em uma máquina e em um contexto o mais próximo possível do seu ambiente de produção.

Aqui estão os resultados para a operação de _leitura do primeiro_.

Como você pode ver, os resultados são os mesmos para ambas as implementações e não dependem do tamanho da lista, como esperado.

Aqui estão os resultados para a operação de _leitura do último_.

Este resultado é ligeiramente diferente e mostra uma pequena perda de desempenho no caso de [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>). Esta diferença é muito pequena, uma fração de um nanosegundo, e não é realmente relevante.

### Lendo o Elemento do Meio de uma Lista

A situação é diferente quando você tenta alcançar o meio da lista.

Como você pode ver, alcançar o elemento do meio de um array é aproximadamente o mesmo que alcançar seu último elemento, e não depende do tamanho do array, pelo menos para o tamanho que estamos testando.

A situação é diferente para [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>). Alcançar o elemento do meio é caro e depende do número de elementos na lista. Alcançar o último elemento ser o mesmo que alcançar o primeiro se deve ao fato de que a implementação de [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) possui uma referência direta para o primeiro e o último node da lista encadeada interna.

Para entender por que alcançar o elemento do meio é caro, você precisa levar em consideração a estrutura de uma lista encadeada, como ela é implementada na classe [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>).

A estrutura interna de uma LinkedList

A implementação Java de lista encadeada é uma coleção de objetos `Node`, onde um `Node` contém três referências. Uma para o próximo node na lista, uma para o node anterior na lista, e uma terceira para o objeto que este node está carregando. Então, é de fato uma lista duplamente encadeada. Além disso, a classe [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) contém outras duas referências: uma para o primeiro node e uma para o último node. Assim, alcançar o primeiro ou o último node é rápido. Por outro lado, ler o node do meio não é tão rápido, porque a implementação precisa ler todas as referências `next` até alcançar o node que precisa. Isso é o que você observa no benchmark: ler o elemento do meio de uma [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) é custoso e se torna mais custoso à medida que o tamanho da lista cresce.

Note que ler o node do meio é o pior cenário. Como possui uma referência para o primeiro e o último node, a implementação sempre escolhe o caminho mais curto para o elemento que precisa alcançar.

Essa degradação no desempenho se deve ao efeito de _pointer chasing_. Como você sabe, a leitura de referências aciona o carregamento do pedaço de memória referenciado em seu CPU cache. Se este pedaço de memória que você precisa ler já estiver lá, então é uma vitória, e você o obterá imediatamente. Se não estiver, então é chamado de _cache miss_, você precisa buscá-lo, o que leva algum tempo.

Você pode observar isso criando sua lista encadeada de uma maneira especial. No benchmark que acabamos de executar, a lista encadeada é criada com o seguinte código. Ela é criada com um stream.

É provável que, como não estamos em uma aplicação real, todos os objetos node desta lista encadeada estejam realmente armazenados próximos uns dos outros na memória. Então, quando você lê a referência `next` de um node, é provável que esta referência já esteja no cache, porque foi carregada junto com o node atual.

Vamos imaginar outra forma de criar uma lista encadeada, que garantiria que todos os nodes estivessem isolados uns dos outros na memória. No exemplo a seguir, criamos um certo número de objetos node entre dois objetos node da lista que estamos usando para o benchmark. E garantimos manter uma referência a esta lista durante o benchmark, para garantir que o garbage collector não moverá nossos objetos na memória. Podemos então executar o benchmark várias vezes, com diferentes valores de `SPARSE_INDEX`.

Aqui estão os resultados.

De fato, o _pointer chasing_ prejudica o desempenho da leitura de valores aleatórios em uma [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>). Como você pode ver, ter uma lista encadeada com nodes distribuídos aleatoriamente na memória é três vezes mais lento do que a mesma lista encadeada com nodes armazenados de forma contígua. É provável que, em uma aplicação que continua adicionando e removendo elementos de uma lista encadeada, esta seja a situação em que você se encontrará.

## Iterando Sobre os Elementos de uma Lista

### Iterando com um Índice e um Iterator

A iteração sobre os elementos de uma lista pode ser implementada com dois padrões. O primeiro é o clássico do Collections Framework, e usa um [`Iterator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html>). O segundo consiste em usar um índice para acessar todos os elementos um por um. Como você pode esperar, iterar sobre os nodes de uma [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) provavelmente sofrerá de _pointer chasing_, porque chegar ao próximo node consiste em seguir uma referência.

Os dois padrões que estamos usando para este benchmark são os seguintes. Primeiro, o que usa um índice.

E segundo, o que usa um [`Iterator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html>). Note que no exemplo a seguir, que usa um padrão _for-each_, o compilador cria um iterator para você no bytecode.

Para [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>), ambos os padrões são aproximadamente os mesmos. Usar um índice é um pouco mais custoso, devido ao fato de que você precisa gerenciar este índice. Você pode estar se perguntando por que incrementar um `int` é mais custoso do que ter que gerenciar um iterator. Bem, acontece que o padrão _for-each_ não expõe o iterator em seu código-fonte, então ele não pode ser usado para outra coisa senão iterar sobre esta lista. Quando se trata de otimizar seu código, o JIT compiler pode perceber isso e, em alguns casos, pode otimizar este pedaço de código e evitar a criação deste iterator. Você acaba com um código muito mais rápido, porque nenhum objeto é realmente criado ou gerenciado.

Para [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>), a situação é diferente. Usar um iterator é mais caro do que no caso de [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>), principalmente devido ao _pointer chasing_. No caso de [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>), tudo o que você precisa fazer é adicionar um offset a um endereço na heap para chegar a um determinado elemento, enquanto na implementação de [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>), você precisa seguir uma referência, com provavelmente um _cache miss_ se o próximo node não estiver lá.

Usar um índice é muito custoso e é, na verdade, um padrão bastante tolo de se usar. Iterar com um índice consiste em começar do início da lista e mover de um node para o outro _index_ vezes, para cada um dos elementos da lista. A complexidade desta iteração é _O(n^2)_. Nunca use este padrão em uma [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>). Leva cerca de meio milissegundo para iterar sobre uma lista encadeada de 1000 elementos, enquanto leva apenas 4 microssegundos com um iterator.

### Iterando em uma Cópia de uma LinkedList

Iterar é duas vezes mais caro em uma [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) do que em uma [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>). Então você pode estar se perguntando se não seria mais eficiente copiar sua [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) para uma lista regular baseada em array, antes de iterar sobre ela.

Claro que este processo consumirá memória, e você pode ter problemas se esta lista for modificada enquanto você estiver iterando sobre ela, mas pode valer a pena dar uma olhada no desempenho.

Vamos examinar o seguinte padrão e executar o benchmark.

O resultado é o seguinte. Como você pode ver, para uma lista de 1000 elementos, copiar a lista consome 4% do tempo que leva para iterar sobre seus elementos.

Então, se você pode arcar com o overhead de memória, e precisa iterar várias vezes, ou acessar elementos aleatoriamente várias vezes, copiar uma lista encadeada para uma lista baseada em array compensa muito rapidamente.

Note que estamos usando o padrão [`Stream.toList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#toList\(\)>) para criar esta lista. Primeiro, ele cria uma lista imodificável, e segundo, ele usa uma otimização para criar um array do tamanho certo de antemão, em vez de aumentar este array à medida que você adiciona elementos a ele, o que [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) e [`Collectors.toList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#toList\(\)>) fazem.

Neste ponto, os dados mostram uma coisa importante: _pointer chasing_ e _cache misses_ podem matar seu desempenho. Isso tem um impacto em qualquer estrutura de dados baseada em referência: lista encadeada, é claro, mas também trie trees, binary trees, red black trees, skip lists, e em menor grau, hash maps.
## Inserindo Elementos em uma Lista

Listas encadeadas são conhecidas por seu desempenho incrível quando se trata de inserir um elemento em uma posição aleatória. Inserir algo é apenas mover a referência _next_ do nó anterior para o nó que você precisa inserir, e o mesmo para a referência _previous_ do próximo nó. Isso realmente parece ser algo bastante barato de fazer. Além do fato de que, para fazer isso, você precisa acessar o nó anterior e o próximo nó. E você já viu no exemplo anterior que isso é muito caro.

Por outro lado, inserir um elemento em uma lista baseada em array parece mais complexo. Você precisa mover a parte direita do array uma célula para a direita para criar espaço para o elemento que deseja inserir. Mover o conteúdo de um array soa como algo que não é barato de fazer.

Inserindo um Elemento em um Array

E, a propósito, excluir um elemento é o mesmo. Para uma lista encadeada, você precisa reorganizar os ponteiros dos dois nós, e para um array, você precisa copiar uma parte do array para a esquerda.

Os dois algoritmos são diferentes, adivinhar qual é o mais rápido não é fácil, então vamos medir o desempenho.

### Inserindo Elementos em uma LinkedList

Vamos considerar três casos: inserção no início da lista, no meio e no final. Inserir no final é mais como adicionar um elemento à lista.

Esperamos o seguinte. Como a [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) tem uma referência direta aos primeiros e últimos nós da cadeia, não devemos ver muita diferença entre inserir no início e no final, e isso não deve depender do tamanho da lista. Inserir no meio, por outro lado, deve ser mais custoso, e esse custo deve aumentar com o tamanho da lista.

Isso é o que observamos para a inserção no início. A diferença quando o tamanho da lista aumenta não é significativa.

E o mesmo para adicionar um elemento no final. A diferença com a inserção no início ainda existe, e ainda é muito pequena.

Inserir no meio por índice é de fato muito mais custoso, e esse custo cresce com listas maiores. O preço que você paga para alcançar esses elementos do meio é alto. Isso foi medido com uma lista encadeada esparsa, ou seja, com elementos de nó que não são armazenados contiguamente na memória.

### Inserindo Elementos em um ArrayList

Você pode estar pensando que inserir um elemento é apenas mover uma parte do array uma célula para a direita. Mas há outro caso que você precisa levar em consideração, que é o redimensionamento deste array. Você não pode adicionar um elemento em um array que está cheio. O que a implementação de [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) faz nesse caso é copiar o array completo para um array maior e, em seguida, adicionar seu elemento. O tamanho do novo array é calculado a partir do tamanho do array atual. Atualmente, ele cresce com um fator de 1.5. Então, se você continuar adicionando elementos em um loop, por exemplo, essa operação de crescimento é acionada cada vez com menos frequência.

Então, vamos examinar as duas situações: inserção em um array que pode acomodar seu novo elemento, e a situação em que o array está cheio.

Quando o array pode acomodar o elemento que você adiciona, as coisas acontecem como esperado. Inserir na última posição, ou seja, adicionar um elemento, mal depende do tamanho do array. O aumento do tempo de computação é provavelmente devido a uma falha de cache para alcançar o final do array quando ele se torna muito grande. Mas não há diferença significativa entre uma [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) de tamanho 1_000 e 10_000. Inserir no meio é mais caro devido à cópia do restante do array para poder inserir o elemento. Como você pode esperar, se você inserir no início, que é a operação mais cara, mover o array é mais caro, simplesmente porque você está movendo o dobro da quantidade de elementos.

Quando o array não pode acomodar o elemento, a implementação de [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) copia seu array interno para um array maior. Essa operação não foi acionada nos benchmarks anteriores, mas você pode facilmente criar outro, com um array cheio, para medir o impacto que esse redimensionamento tem.

Comparar esses primeiros benchmarks com o mesmo benchmark em um array maior mostra o preço de alocar um novo array e copiar o array atual para o novo. Como esperado, isso depende do tamanho do array, e é bastante caro. Felizmente, isso não acontece com frequência. O número de operações de redimensionamento cresce sublinearmente, o fator de crescimento diminui a cada redimensionamento. Isso deve lembrá-lo de que, sempre que puder criar um array com o tamanho certo antecipadamente, você deve fazê-lo para economizar nessa realocação.

Como o custo de realocação é muito maior do que o custo de inserção, você pode esperar ver pouca diferença entre inserir no meio ou no início da sua lista. O que é o caso nos dois benchmarks a seguir.

## Comparando a Inserção para LinkedList e ArrayList

Como você pode ver, a [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) supera a [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) para todas as operações, exceto uma. Isso pode ser inesperado, porque do ponto de vista algorítmico, a [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) se compara melhor, especialmente para a operação de inserção. Mas como este algoritmo eficiente é executado em hardware que torna a busca por ponteiros muito custosa, essa sobrecarga se torna dominante e o torna ineficiente.

Existem duas razões pelas quais a [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) tem um desempenho melhor do que a [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) para a inserção no início de uma lista. A [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) tem duas vantagens sobre a [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>):

  1. o tempo de inserção não depende do tamanho da lista,
  2. porque há uma referência direta ao primeiro elemento da lista, a busca por ponteiros pode acontecer apenas uma vez, no máximo.

Além disso, não depende de como você adicionou os elementos da sua [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>). O fato de os nós estarem distribuídos aleatoriamente na sua memória heap não tem impacto. E o mesmo vale para adicionar elementos no final da sua lista. O desempenho é quase o mesmo, porque nesse caso a [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) não precisa mover nenhum elemento de seu array interno. Esta última operação não é tão rápida quanto para a [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>), mas é previsível. Se a sua implementação de [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) decidir que é hora de aumentar seu array interno, então o impacto no desempenho pode ser muito alto.

Mesmo que o preço de uma realocação seja alto, por acontecer raramente, o impacto no desempenho da sua aplicação é diluído. Lembre-se de que você pode (e deve!) criar sua [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) com o tamanho certo sempre que puder. No geral, é errado pensar que o preço de uma realocação é um argumento relevante para preferir [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) em vez de [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>).

Então, estes são dois casos de uso onde a [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) é interessante e tem um desempenho melhor, ou está quase no mesmo nível da [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>): operar no início ou no final da lista. A operação pode ser leitura, inserção ou exclusão, que na verdade custa o mesmo que inserir.

E de fato, as [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) são implementações muito boas de pilha (stack) ou fila (queue). Quando se trata de listas regulares, não são tão boas. Elas são quase sempre superadas pela [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>).

## Analisando o Consumo de Memória de LinkedList e ArrayList

Como a [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) e a [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) se comportam em termos de memória? Esta é uma pergunta capciosa, pois diferentes JVMs podem lidar com a memória de maneiras distintas, e uma única JVM pode ter estratégias diferentes dependendo da quantidade de memória em que está sendo executada.

Estamos usando a ferramenta [`JOL`](<https://github.com/openjdk/jol>) do OpenJDK para medir a memória consumida por essas implementações.

Em geral, armazenar uma dada quantidade de objetos em uma [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) requer mais memória do que armazenar os mesmos objetos em uma [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>). Na maioria dos casos, muito, muito mais. Há uma boa razão para isso: cada referência em uma [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) é armazenada em um objeto `Node`, que também armazena outras duas referências, uma para o `Node` anterior e outra para o próximo `Node`. Isso tipicamente requer 24 bytes, porque você precisa adicionar o cabeçalho do objeto `Node`. Você pode verificar a classe `Node` na classe `LinkedList`. É uma classe privada e não possui JavaDoc.

O consumo exato de memória pode variar, dependendo da sua aplicação. Se sua aplicação consome menos de 32GB, esse número é na maioria das vezes exato. Por exemplo, para 1000 objetos, uma [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) consumirá um pouco mais de 24kB de memória, enquanto uma [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) consome apenas um pouco menos de 5kB.

Há um caso, no entanto, em que armazenar seu objeto em uma [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) é mais custoso. Se você tiver apenas um objeto para armazenar, a [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) que você criar pode envolver um array de tamanho 10. Depende de como você criou sua [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>). E nesse caso, sua [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) consome mais memória do que uma [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>): 80 bytes versus 56 bytes.

Então, se você tiver muitas listas de um único elemento, poderá encontrar problemas de consumo de memória. Deixe-me colocar de outra forma. Se você tem uma aplicação que cria muitas array lists, e você encontra problemas de memória inesperados, então você deve investigar mais precisamente quantos objetos suas array lists estão armazenando. Pode ser que você esteja realmente criando array lists quase vazias, que consomem muita memória não utilizada.

O consumo exato de memória de uma [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) de um único elemento depende, na verdade, de como você criou essa [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>).

Aqui estão diferentes padrões e seus resultados.

Se você estiver nesse caso, ainda tem várias soluções. Usar [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) é uma delas, mas talvez você também possa usar uma das implementações não modificáveis que você pode obter com os métodos [`List.of()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#of\(E...\)>). Estas são mais eficientes do que [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) e [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>), em termos de memória: apenas 26 bytes para um único elemento. Você precisa ter em mente que elas são imodificáveis, no entanto.

Um último ponto sobre o consumo de memória. Devido à forma como funciona, uma [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) sempre acomoda o número exato de elementos que precisa carregar. Não há nó vazio em uma [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>). Por outro lado, uma [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) cresce automaticamente quando seu array interno está cheio.

Acontece que não há nenhum mecanismo na [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) que encolha este array automaticamente. Então, se sua aplicação remove muitos elementos da sua [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>), você pode chegar a uma situação em que o array interno é grande, porque foi necessário em algum momento, mas se torna quase vazio, consumindo memória à toa.

Na verdade, uma [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) mantém um array que é copiado para um array maior quando fica cheio. Mas este array nunca é copiado para um array menor se ele se torna quase vazio. Então, se você encontrar problemas de memória, este é definitivamente um ponto que você também precisa investigar.

Felizmente, existe um método [`ArrayList.trimToSize()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html#trimToSize\(\)>) que ajusta a capacidade de seu array interno ao tamanho da sua lista. A propósito, se você chamar [`ArrayList.trimToSize()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html#trimToSize\(\)>) em uma [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) de um único elemento, ela se torna menor do que a [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) de um único elemento. Você economizará memória imediatamente ao chamar este método, mas também terá que aumentar sua lista novamente na próxima vez que adicionar um elemento a ela.

| Consumo de memória para 1 elemento |
|---|---|
| ArrayList | 76 bytes |
| ArrayList | 44 bytes (após `trimToSize()`) |
| LinkedList | 56 bytes |
| List.of() | 26 bytes |
| Consumo de memória para 1_000 elementos |
|---|---|
| ArrayList | 4_976 bytes |
| LinkedList | 24_032 bytes |

Como você pode ver, apesar do fato de que a [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) pode estar gerenciando um array que não está totalmente utilizado, ela ainda usa muito menos memória do que a [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) correspondente. Gerenciar esses objetos de nó consome 24 bytes para cada objeto, o que é muito mais do que gerenciar um array parcialmente vazio. O pior cenário é quando a [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) precisa realocar. Durante esse tempo, a [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) tem dois arrays: o antigo e o novo que é maior. Mesmo neste caso, a [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) ainda consome menos memória do que a [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>). Então, se a memória é uma preocupação em sua aplicação, a [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) é sempre sua melhor escolha.

### Quantos Elementos Você Pode Armazenar em um Dado Heap?

Suponha que, por algum motivo, sua aplicação continue adicionando elementos a uma lista. Vamos comparar o número de elementos que você pode gerenciar com uma [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) e uma [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) em uma dada memória heap de tamanho _H_. Estamos interessados apenas no consumo de memória das listas, não no tamanho dos objetos que você está armazenando.

Uma [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) precisa de um objeto de nó para cada elemento, que tem o tamanho de 24 bytes. Então, nesse caso, a matemática é simples: você pode armazenar um máximo de _H_ /24 elementos.

Para a [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>), a situação é um pouco mais complexa. Se o array interno da [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) estiver cheio, então você pode armazenar _H_ /4 elementos. Mas pode haver uma porção deste array que não é utilizada, então, em média, pode ser menos do que isso. Se você acabou de realocar seu array, então 33% dele não é usado, então, em média, você está usando cerca de 6 bytes por objeto. Então, em uma aplicação que continua adicionando elementos a uma lista, a [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) é mais eficiente do que a [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) por um fator entre 6 e 4.

O pior cenário é quando sua [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) está realizando uma realocação. Não há desperdício aqui: seu array antigo está cheio. Mas durante esse processo, a [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) tem uma referência para um array que está cheio, mais outro array que tem tamanho 1.5*_N_. Então, durante esse processo, a [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) consome 10 bytes por objeto. Mesmo neste pior cenário, a [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) ainda é mais eficiente do que a [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) por um fator de 2.4.

Para um dado tamanho de heap, a [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) sempre pode armazenar mais elementos do que a [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>), mesmo durante seu processo de realocação. Pode ser até 6 vezes mais.
## Qual Implementação Você Deve Escolher?

[`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) é uma boa implementação, que supera [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) em quase todas as operações clássicas de lista, pelo menos quando o que você precisa é uma lista regular. Mesmo que a implementação de [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) seja implementada com algoritmos melhores, é uma estrutura baseada em ponteiros, que sofre de *pointer chasing*. Portanto, iterar é custoso, obter um elemento pelo seu índice é custoso, o que tem um impacto em todas as operações clássicas: inserir, substituir, deletar. Mesmo que essas operações por si só custem menos em [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) do que em [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>), o desempenho é prejudicado pelo fato de que acessar o elemento correto é muito caro, devido ao *pointer chasing*.

[`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) não é tão bom para inserir, por causa da operação [`System.arraycopy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/System.html#arraycopy\(java.lang.Object,int,java.lang.Object,int,int\)>), mas ainda assim é geralmente melhor que [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>). A realocação de [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) é uma operação bastante custosa, mas que é usada muito raramente, e que você pode evitar se souber quantos elementos precisa armazenar em sua lista. Você pode evitar o redimensionamento criando seus [`ArrayLists`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) grandes o suficiente para conter todos os objetos de que precisa, antecipadamente.

Há um caso em que [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) tem um desempenho melhor que [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>): é o caso em que você precisa acessar o primeiro ou o último elemento da sua lista, seja para leitura, substituição ou inserção. Ou seja, quando o que você precisa é, na verdade, uma pilha (*stack*) ou uma fila (*queue*), não uma lista regular. E, a propósito, [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) de fato implementa [`Queue`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Queue.html>). Note que [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) também implementa [`Deque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html>). Se o que você precisa é uma fila de duas pontas ([`Deque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Deque.html>)), você deve preferir a implementação [`ArrayDeque`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayDeque.html>).

Em termos de memória, você precisa ter em mente que uma [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) consome muito mais memória do que uma [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>). Há uma exceção, no entanto: uma [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) de um elemento pode consumir menos memória do que uma [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) de um elemento, no caso em que sua [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) realmente envolve um array de tamanho 10. Você pode corrigir essa situação usando [`List.of()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#of\(E...\)>), ou chamando [`ArrayList.trimToSize()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html#trimToSize\(\)>).

No caso de você precisar de listas que contenham uma pequena quantidade de itens, e estiver executando sua aplicação em um ambiente com restrição de memória, criar um [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) com uma capacidade inicial de tamanho 2 funciona bem. Ele ocupa apenas 48 bytes para armazenar 0, 1 ou 2 elementos. Se você continuar adicionando elementos, ele expande o array para 3, depois 4, depois 6 elementos (respectivamente 56, 56 e 64 bytes no total). É menor que [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) em todos os tamanhos não nulos. É ainda menor que o [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) de capacidade padrão até você atingir o tamanho 9; e tem o mesmo tamanho que o [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) "aparado" (*trimmed*) até o tamanho 7.

Você pode ver isso na tabela a seguir, obtida com o seguinte processo.

1. Crie uma lista: `new ArrayList<>(2)`, `new LinkedList<>()`, `new ArrayList<>()`, e `new ArrayList<>().trimToSize()`.
2. Verifique o consumo inicial de memória.
3. Continue adicionando elementos um por um, depois "apara" a última lista, e verifique o consumo de memória.

| ArrayList de tamanho 2 | LinkedList | ArrayList Padrão | ArrayList Padrão "aparado"
---|---|---|---|---
0 | 40 | 32 | 40 | 40
1 | 48 | 56 | 80 | 48
2 | 48 | 80 | 80 | 48
3 | 56 | 104 | 80 | 56
4 | 56 | 128 | 80 | 56
5 | 64 | 152 | 80 | 64
6 | 64 | 176 | 80 | 64
7 | 80 | 200 | 80 | 72
8 | 80 | 224 | 80 | 72
9 | 80 | 248 | 80 | 80
10 | 96 | 272 | 80 | 80

Uma última coisa a ter em mente: um [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) nunca encolhe. Invocar uma operação de remoção, ou uma operação de limpeza (`clear`), não copia seu array interno para um array menor. Você pode corrigir essa situação chamando [`ArrayList.trimToSize()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html#trimToSize\(\)>), o que aciona a cópia deste array interno para um array menor.

### Neste tutorial

Introdução Complexidade do Algoritmo Lendo Elementos de uma Lista Inserindo Elementos em uma Lista Qual Implementação Você Deve Escolher?

Última atualização: 3 de março de 2025

**Anterior na Série**

[Choosing Immutable Types for Your Key](<#/doc/tutorials/api/collections-framework/choosing-keys>)

➜

**Tutorial Atual**

Escolhendo a Implementação Certa Entre ArrayList e LinkedList

➜

Este é o fim da série!

**Anterior na Série:** [Choosing Immutable Types for Your Key](<#/doc/tutorials/api/collections-framework/choosing-keys>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ O Collections Framework ](<#/doc/tutorials/api/collections-framework>) > Escolhendo a Implementação Certa Entre ArrayList e LinkedList