# Paralelizando Streams

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A Stream API ](<#/doc/tutorials/api/streams>) > Paralelizando Streams

**Anterior na Série**

[Usando Optionals](<#/doc/tutorials/api/streams/optionals>)

➜

**Tutorial Atual**

Paralelizando Streams

➜

**Próximo na Série**

[A Gatherer API](<#/doc/tutorials/api/streams/gatherers>)

**Anterior na Série:** [Usando Optionals](<#/doc/tutorials/api/streams/optionals>)

**Próximo na Série:** [A Gatherer API](<#/doc/tutorials/api/streams/gatherers>)

# Paralelizando Streams

## Otimizando Computações de Streams

Uma característica muito interessante da Stream API é o fato de que um stream é capaz de processar dados em paralelo. Processar dados em paralelo com a Stream API é tão simples quanto chamar o método [`parallel()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/BaseStream.html#parallel\(\)>) em qualquer stream existente.

Executar este código fornece o seguinte resultado.

Esta soma foi, de fato, computada em paralelo. No entanto, você pode não notar nenhum ganho de desempenho em um exemplo tão pequeno.

Por que você gostaria de computar seus dados em paralelo? Provavelmente para obter o resultado de suas computações mais rapidamente. Um stream paralelo lhe dará um resultado mais rápido do que um stream sequencial? Bem, a resposta para esta pergunta não é tão fácil quanto parece. Em alguns casos sim, mas em outros casos, infelizmente, não. Por mais decepcionante que possa parecer, um stream paralelo nem sempre é mais rápido que um stream sequencial.

Com isso em mente, você deve ter cuidado: escolher usar streams paralelos não é uma decisão a ser tomada levianamente. Há várias perguntas que você precisa se fazer antes mesmo de considerar a paralelização.

Primeiro, pergunte-se: você precisa disso? Você tem requisitos de desempenho em sua aplicação que não estão sendo atendidos? Você tem certeza de que seus problemas de desempenho vêm do processamento de stream que você está pensando em computar em paralelo? Como você planeja medir seu ganho de desempenho para garantir que a paralelização para esta computação específica melhorou o desempenho de sua aplicação?

A paralelização consome mais poder de computação. Você tem CPUs ou CPU cores sobressalentes para dedicar a esta computação? Você pode dar mais ciclos de CPU à sua computação sem desacelerar o resto da sua aplicação?

A paralelização consome threads. Você tem threads sobressalentes para dedicar à sua computação? Se você está trabalhando em uma aplicação rodando em um webserver, então suas threads são usadas para servir requisições HTTP. Você está OK em usá-las para outras coisas?

Uma vez que você tenha escolhido paralelizar, então você precisa ter certeza de que o desempenho de suas computações de stream realmente melhorou. Você deve medir este ganho de desempenho em um contexto o mais próximo possível do seu ambiente de produção.

Neste tutorial, abordamos vários elementos-chave que o ajudarão a avaliar os ganhos que você pode esperar da paralelização e alguns outros elementos que devem deixá-lo cauteloso sobre a paralelização. Mas, no final, a única coisa que deve dizer se a paralelização vale a pena ou não é testar e medir os tempos de execução.

## Implementação da Paralelização

A paralelização é implementada na Stream API usando decomposição recursiva dos dados que o stream está processando. Ela é construída sobre o Fork/Join Framework, adicionado no JDK 7.

A decomposição consiste em dividir os dados que seu stream está processando em duas partes. Cada parte é então processada por seu próprio CPU core que pode decidir dividi-la novamente, recursivamente.

Em algum momento, o framework decidirá que a quantidade de dados em uma dada parte é pequena o suficiente para ser processada normalmente. Este subconjunto de dados será então processado, e um resultado parcial será computado. Este resultado parcial será então mesclado com os outros resultados parciais computados das outras partes em outros CPU cores.

A paralelização vem com uma sobrecarga. Esta sobrecarga deve ser pequena em comparação com os ganhos de distribuir as computações em vários CPU cores. Caso contrário, a paralelização piorará o desempenho de suas computações em vez de melhorá-las.

Vamos examinar todos esses passos um por um e ver o que pode impedi-lo de obter melhores ganhos de desempenho.

## Entendendo a Localidade dos Dados

A localidade dos dados tem um impacto na velocidade com que seus dados podem ser processados, seja sequencialmente ou em paralelo. Quanto melhor a localidade, mais rápida será sua computação.

Para serem disponibilizados à CPU, seus dados devem ser transferidos da memória principal do seu computador para o cache da sua CPU. Fisicamente falando, a memória principal é um componente específico do seu computador, separado da sua CPU. Por outro lado, o cache compartilha o mesmo die de silício que os elementos de computação centrais da sua CPU. Eles estão conectados através da sua placa-mãe e diferentes barramentos de comunicação. Transferir dados da memória principal para o cache da sua CPU é muito lento em comparação com a velocidade com que o core de uma CPU pode acessar dados do seu cache.

Quando sua CPU precisa de alguns dados, ela primeiro verifica se esses dados estão disponíveis em seu cache. Se estiverem, ela pode usá-los imediatamente. Se não estiverem, então esses dados devem ser buscados na memória principal e copiados para o cache. Esta situação é chamada de _cache miss_. Cache misses são caros porque, durante esse tempo, sua CPU está esperando por seus dados. Você quer evitar essa situação.

A forma como os dados são transferidos entre a memória principal e o cache da sua CPU desempenha um papel importante na prevenção de cache misses. A memória é organizada em linhas. Tipicamente, uma linha tem 64 bytes de comprimento, ou seja, oito valores `long` (pode variar de uma CPU para outra). Todas as transferências entre a memória principal e o cache da CPU são feitas linha por linha. Então, mesmo que sua CPU precise apenas de um único valor `int`, a linha completa que contém esse valor é transferida para o cache.

### Iterando Sobre um Array de Tipos Primitivos

Suponha que seu código esteja iterando sobre um array do tipo `int[]`. Uma linha de 64 bytes pode conter 16 valores `int`. Suponha que o acesso ao primeiro elemento do seu array seja um cache miss. A CPU então carregará a linha que contém este elemento em seu cache para iniciar a iteração. Como ela carregou uma linha completa, os 15 valores seguintes também podem ter sido transferidos. Acessar os próximos valores será muito rápido.

Nesse caso, a _localidade dos dados_ é excelente: seus dados são armazenados fisicamente em zonas contíguas da memória principal. Isso é desejável porque a transferência de seus dados da memória principal para o cache da CPU será muito mais rápida.

### Iterando Sobre um Array de Instâncias de Integer

Suponha agora que seu código esteja iterando sobre um array do tipo `Integer[]`. O que você realmente tem não é mais um array de tipos primitivos, mas um array de referências. Cada célula deste array contém uma referência a um objeto do tipo [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) que pode estar em qualquer lugar na memória.

Se o acesso ao primeiro elemento do seu array for um cache miss, então a CPU terá que carregar a linha que contém este elemento para o seu cache. O que ela realmente carrega são as primeiras 16 referências do seu array, assumindo que esta primeira referência esteja no início da linha. Ela então tem que carregar o primeiro objeto [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>), que pode estar em outro lugar na memória principal, levando a outro cache miss. Na verdade, as chances são de que cada leitura de cada objeto [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) do seu array também será um cache miss.

Nesse caso, a _localidade dos dados_ não é tão boa quanto no exemplo anterior: as referências aos seus dados são armazenadas fisicamente em zonas contíguas da memória principal, mas os valores que você precisa para realizar suas computações não estão. Isso não é desejável porque a transferência dos valores que você precisa da memória principal para o cache da CPU é muito mais lenta do que no caso de um array de tipos primitivos.

### Iterando Sobre uma Lista Encadeada de Instâncias de Integer

Vamos examinar uma última situação. Suponha agora que seu código esteja iterando sobre uma lista do tipo [`LinkedList<Integer>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>). Se o acesso ao primeiro elemento for um cache miss, então a CPU carregará o primeiro nó da sua lista encadeada para o seu cache. Esse nó contém duas referências: a primeira para o valor que você precisa para suas computações, a segunda para o próximo nó da lista. Esta situação é pior do que a anterior: as chances são de que acessar o próximo valor da sua lista gerará dois cache misses.

Nesse caso, a _localidade dos dados_ é terrível: nem seus dados nem as referências a eles são armazenados em zonas contíguas da memória principal. Acessar os elementos que você precisa será muito mais lento do que no primeiro caso que examinamos.

### Evitando Pointer Chasing

Ter que seguir referências, ou ponteiros, para alcançar o elemento correto que carrega os dados que você precisa é chamado de _pointer chasing_. Pointer chasing é algo que você deseja evitar em sua aplicação e é a fonte de muitos problemas de desempenho. Pointer chasing não existe ao iterar sobre um array de valores `int`. Ele constitui seu principal problema de desempenho ao iterar sobre uma lista encadeada de instâncias de [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>).

## Dividindo uma Fonte de Dados

Se você decidir processar um stream em paralelo, o primeiro passo consistirá em dividir sua fonte de dados. Para que a divisão seja eficiente, ela deve ter várias propriedades.

*   Dividir a estrutura de dados deve ser fácil e rápido.
*   A divisão deve ser uniforme: os dois substreams que você obtiver devem ter a mesma quantidade de dados para processar.

### Dividindo uma Instância de Collection

Um [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) é uma estrutura de dados perfeita para dividir. Você pode obter o elemento do meio facilmente, e se você dividir um array pelo meio, você sabe exatamente quantos elementos terá em ambos os subarrays.

Por outro lado, uma [`LinkedList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/LinkedList.html>) não é uma boa estrutura para dividir. Chegar ao elemento do meio requer percorrer metade dos elementos da lista, um por um, o que é custoso devido ao pointer chasing. Uma vez lá, você pode obter duas sublistas com o número correto de elementos.

Um [`HashSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html>) é construído sobre um array de buckets, então dividir este array é o mesmo que dividir o array interno de um array list. Mas a forma como os dados são armazenados neste array é diferente. É mais difícil dividir este array de forma a garantir que você terá a mesma quantidade de elementos em ambas as partes. Você pode até acabar com uma subparte vazia.

Um [`TreeSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TreeSet.html>) é baseado em uma implementação de árvore rubro-negra. Ele garante que todos os nós tenham a mesma quantidade de elementos em seus nós filhos direito e esquerdo. Então, dividir uma instância de [`TreeSet`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TreeSet.html>) em duas subárvores uniformes é fácil. No entanto, você ainda precisa seguir ponteiros para alcançar seus dados.

Todas essas estruturas são usadas no Collections Framework, e você pode obter o número de elementos que cada uma delas carrega.

Este não é o caso para todas as estruturas a partir das quais você pode criar um stream.

### Dividindo as Linhas de um Arquivo de Texto

Este é o caso para o padrão [`Files.lines(path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#lines\(java.nio.file.Path\)>), que foi abordado anteriormente neste tutorial. Ele cria um stream que processa as linhas do arquivo de texto denotado por este objeto `path`. Não é possível obter o número de linhas de um arquivo de texto sem analisá-lo.

O mesmo vale para o padrão [`Pattern.splitAsStream(line)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#splitAsStream\(java.lang.CharSequence\)>) que também abordamos. Ele cria um stream a partir da divisão da `line` usando o padrão fornecido. Novamente, você não pode saber de antemão o número de elementos que você processará em tal stream.

### Dividindo um Range ou um Stream Gerado

Os streams especializados de números também fornecem padrões para criar streams.

O stream [`IntStream.range(0, 10)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#range\(int,int\)>) é fácil de dividir. Na verdade, ele se parece com um array de números que você pode dividir pelo meio. A quantidade de elementos em cada parte é previsível, o que é desejável.

Por outro lado, os métodos [`Stream.generate()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#generate\(java.util.function.Supplier\)>) e [`Stream.iterate()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#iterate\(T,java.util.function.UnaryOperator\)>) não fornecem uma fonte de dados facilmente divisível. Na verdade, esta fonte pode ser infinita e limitada apenas pela forma como é processada em seu stream.

Vamos comparar os dois padrões a seguir.

Ambas as listas `list1` e `list2` são as mesmas, criadas com padrões diferentes. A primeira é facilmente divisível, enquanto a segunda não. A principal razão é que, no segundo padrão, conhecer o valor do quinto elemento requer a computação de todos os elementos anteriores. Nesse sentido, este segundo padrão se parece com uma lista encadeada onde você precisa visitar os quatro primeiros elementos para alcançar o quinto.

## Dividindo e Distribuindo o Trabalho

Uma vez que sua fonte de dados tenha sido dividida, os dois substreams devem ser processados em diferentes cores da sua CPU para que a paralelização seja eficaz.

Isso é feito pelo Fork/Join Framework. O Fork/Join Framework gerencia um pool de threads, criado quando sua aplicação é lançada, chamado Common Fork/Join Pool. O número de threads neste pool é alinhado com o número de cores que sua CPU possui. Cada thread neste pool tem uma fila de espera, na qual a thread pode armazenar tarefas.

1.  A primeira thread do pool cria uma primeira tarefa. A execução desta tarefa decide se a computação é pequena o suficiente para ser computada sequencialmente ou é muito grande e deve ser dividida.
2.  Se for dividida, então duas subtarefas são criadas e armazenadas na fila dessa thread. A tarefa principal então espera que as duas subtarefas sejam concluídas. Enquanto espera, ela também é armazenada nesta fila de espera.
3.  Se a computação for realizada, então um resultado é produzido. Este resultado é um resultado parcial de toda a computação. Esta tarefa então retorna o resultado para a tarefa principal que a criou.
4.  Uma vez que uma tarefa tem os dois resultados das duas subtarefas que ela criou, ela pode mesclá-los para produzir um resultado e retorná-lo para a tarefa principal que a criou.

Em um dado momento, a primeira tarefa principal obtém os dois resultados parciais de suas duas subtarefas. Ela então é capaz de mesclá-los e retornar o resultado final da computação.

Por enquanto, a única thread que está trabalhando é a primeira thread do pool, que foi invocada pelo Fork/Join Framework. O Fork/Join Framework implementa outro padrão de programação concorrente chamado _work stealing_. Uma thread ociosa do pool pode examinar a fila de espera das outras threads do mesmo pool para pegar uma tarefa e processá-la.

Isso é o que acontece neste caso. Assim que o número de tarefas cresce na primeira fila de espera, as outras threads vão roubar algumas delas, processá-las, dividir ainda mais o trabalho e popular suas próprias filas de espera com mais tarefas. Este recurso mantém todas as threads do pool ocupadas.

Este recurso de work stealing funciona bem, mas tem uma desvantagem: dependendo de como sua fonte foi dividida e como as tarefas são movidas de uma thread para outra, seus dados podem ser processados em qualquer ordem. Isso pode ser um problema em alguns casos.

## Processando um Substream

Processar um substream pode ser diferente de processar um stream completo. Dois elementos podem tornar o processamento de um substream diferente: acessar um estado externo e carregar um estado do processamento de um elemento para outro. Esses dois elementos afetarão o desempenho de seus streams paralelos.

### Acessando um Estado Externo

O Fork/Join Framework divide sua computação em muitas subtarefas, cada uma processada por uma thread do pool.

Se você processar seu stream sequencialmente, todos os elementos são processados na thread que executa seu método. Se você processar o mesmo stream em paralelo, os elementos são processados por uma thread do Common Fork/Join pool.

Acessar um estado externo ao seu stream é então feito a partir de outra thread e pode levar a race conditions.

Vamos considerar o seguinte código. Infelizmente, você não pode executar este código em seu navegador, você precisará copiá-lo e colá-lo em sua IDE para ver como ele funciona.

O resultado que ele produz é o seguinte.

Se você descomentar a chamada [`parallel()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/BaseStream.html#parallel\(\)>), então este stream é executado em paralelo. O resultado se torna o seguinte, e pode variar em sua própria máquina.

Qualquer acesso a um elemento externo não concorrente pode levar a race conditions e inconsistência de dados. Vamos executar o seguinte código.

Executar este código várias vezes pode levar a resultados diferentes porque todas as threads do Common Fork/Join Pool estão tentando adicionar dados concorrentemente em uma instância de [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>), que não é uma estrutura thread-safe. Há pouca chance de ver o resultado correto, e você pode até obter uma [`ArrayIndexOutOfBoundsException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ArrayIndexOutOfBoundsException.html>). Executar este tipo de código com qualquer coleção ou mapa não concorrente leva a resultados imprevisíveis, incluindo exceções.

Uma execução típica lhe dará algo assim. Sim, são muitos elementos faltando!

É um antipadrão para um stream mutar um estado externo a este stream.

### Ordem de Encontro

Existem casos em que a ordem em que os dados são processados é significativa na Stream API. Este é o caso para os seguintes métodos.

*   [`limit(n)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#limit\(long\)>): limita o processamento aos `n` _primeiros_ elementos deste stream.
*   [`skip(n)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#skip\(long\)>): pula o processamento para os `n` _primeiros_ elementos deste stream.
*   [`findFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#findFirst\(\)>): encontra o _primeiro_ elemento do stream.

Esses três métodos precisam lembrar em que ordem os elementos do stream são processados e precisam contar os elementos para produzir um resultado correto.

Eles são chamados de operações _stateful_, porque precisam carregar um estado interno para funcionar.

Ter tais operações stateful leva a sobrecargas em streams paralelos. Por exemplo, [`limit()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#limit\(long\)>) precisa de um contador interno para funcionar corretamente. Em paralelo, este contador interno é compartilhado entre diferentes threads. Compartilhar um estado mutável entre threads é custoso e deve ser evitado.
## Compreendendo a Sobrecarga de Computar um Stream em Paralelo

Computar um `stream` em paralelo adiciona algumas computações para lidar com o paralelismo. Esses elementos têm um custo, e você precisa conhecê-los para garantir que esse custo não será muito alto em comparação com os benefícios de usar o paralelismo.

  * Seus dados precisam ser divididos. A divisão pode ser barata ou cara, dependendo dos dados que você processa. Uma localidade ruim para seus dados tornará a divisão cara.
  * A divisão precisa ser eficiente. Ela precisa criar sub-`streams` divididos uniformemente. Algumas fontes podem ser divididas uniformemente com facilidade, outras não.
  * Uma vez dividida, a implementação processa seus dados concorrentemente. Você deve evitar qualquer acesso a qualquer estado mutável externo e também evitar ter um estado mutável compartilhado interno.
  * Então os resultados parciais precisam ser mesclados. Existem resultados que podem ser facilmente mesclados. Mesclar uma soma de inteiros é fácil e barato. Mesclar `collections` também é fácil. Mesclar `hashmaps` é mais custoso.

## Estabelecendo Algumas Regras para Usar Streams Paralelos Corretamente

**Regra #1** Não otimize porque é divertido; otimize porque você tem requisitos e não os está cumprindo.

**Regra #2** Escolha sua fonte de dados com cautela.

**Regra #3** Não modifique o estado externo e não compartilhe estado mutável.

**Regra #4** Não adivinhe; meça o desempenho do seu código.

### Neste tutorial

Otimizando Computações de `Streams` Implementação de Paralelização Compreendendo a Localidade dos Dados Dividindo uma Fonte de Dados Dividindo e Despachando o Trabalho Processando um Sub-`stream` Compreendendo a Sobrecarga de Computar um `Stream` em Paralelo Estabelecendo Algumas Regras para Usar `Streams` Paralelos Corretamente

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Usando Optionals](<#/doc/tutorials/api/streams/optionals>)

➜

**Tutorial Atual**

Paralelizando Streams

➜

**Próximo na Série**

[A API Gatherer](<#/doc/tutorials/api/streams/gatherers>)

**Anterior na Série:** [Usando Optionals](<#/doc/tutorials/api/streams/optionals>)

**Próximo na Série:** [A API Gatherer](<#/doc/tutorials/api/streams/gatherers>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Stream ](<#/doc/tutorials/api/streams>) > Paralelizando Streams