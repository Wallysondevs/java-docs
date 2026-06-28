[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A Stream API ](<#/doc/tutorials/api/streams>) > Reduzindo um Stream

**Anterior na Série**

[Criando Streams](<#/doc/tutorials/api/streams/creating>)

➜

**Tutorial Atual**

Reduzindo um Stream

➜

**Próximo na Série**

[Adicionando uma Operação Terminal em um Stream](<#/doc/tutorials/api/streams/terminal-operations>)

**Anterior na Série:** [Criando Streams](<#/doc/tutorials/api/streams/creating>)

**Próximo na Série:** [Adicionando uma Operação Terminal em um Stream](<#/doc/tutorials/api/streams/terminal-operations>)

# Reduzindo um Stream

## Chamando uma Operação Terminal em um Stream

Até agora, você leu neste tutorial que reduzir um stream consiste em agregar os elementos desse stream de uma forma que se assemelha ao que é feito na linguagem SQL. Nos exemplos que você executou, você também coletou os elementos dos streams que construiu em uma lista, usando o padrão `collect(Collectors.toList())`. Todas essas operações são chamadas de _operações terminais_ na Stream API e consistem em reduzir seu stream.

Há duas coisas que você precisa lembrar ao chamar uma operação terminal em um stream.

1.  Um stream sem uma operação terminal não processa nenhum dado. Se você encontrar um stream assim em sua aplicação, é muito provável que seja um bug.
2.  Uma dada instância de stream pode ter apenas uma chamada de operação intermediária ou terminal. Você não pode reutilizar um stream; se tentar fazer isso, receberá uma [`IllegalStateException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IllegalStateException.html>).

## Usando um Operador Binário para Reduzir um Stream

Existem três sobrecargas do método [`reduce()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#reduce\(java.util.function.BinaryOperator\)>) definidas na interface [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>). Todas elas recebem um objeto [`BinaryOperator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BinaryOperator.html>) como argumento. Vamos examinar como este operador binário é usado.

Vamos pegar um exemplo. Suponha que você tenha uma lista de inteiros e precise calcular a soma desses inteiros. Você pode escrever o seguinte código para calcular essa soma, usando um padrão de loop for clássico.

```java
List<Integer> numbers = List.of(3, 6, 2, 1);
int sum = 0;
for (int number : numbers) {
    sum += number;
}
System.out.println(sum);
```

Executá-lo imprime o seguinte resultado.

```
12
```

O que este código faz é o seguinte.

1.  Pegue os dois primeiros elementos da lista e some-os.
2.  Em seguida, pegue o próximo elemento e some-o à soma parcial que você calculou.
3.  Repita o processo até chegar ao final da lista.

A forma como este cálculo é conduzido é resumida na seguinte figura.

Summing the Elements of a Stream

Se você verificar este código cuidadosamente, poderá ver que é possível modelar o operador _SOMA_ com um operador binário para obter o mesmo resultado. O código então se torna o seguinte.

```java
List<Integer> numbers = List.of(3, 6, 2, 1);
int sum = numbers.stream()
                 .reduce(0, (partialSum, number) -> partialSum + number);
System.out.println(sum);
```

Executar o exemplo anterior imprime o seguinte.

```
12
```

Agora você pode ver que este código depende apenas do próprio operador binário. Suponha que você precise calcular um _MÁXIMO_. Tudo o que você precisa fazer é fornecer o operador binário correto para isso.

```java
List<Integer> numbers = List.of(3, 6, 2, 1);
int max = numbers.stream()
                 .reduce(0, (maxSoFar, number) -> Integer.max(maxSoFar, number));
System.out.println(max);
```

Que imprime o seguinte:

```
6
```

A conclusão disso é que você pode de fato calcular uma redução apenas fornecendo um operador binário que opera em apenas dois elementos. É assim que o método [`reduce()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#reduce\(java.util.function.BinaryOperator\)>) funciona na Stream API.

## Escolhendo um Operador Binário Que Pode Ser Usado em Paralelo

Existem, no entanto, duas ressalvas que você precisa entender. Vamos discutir a primeira aqui e a segunda na próxima seção.

A primeira é que um stream pode ser calculado em paralelo. Este ponto será abordado em mais detalhes posteriormente neste tutorial, mas precisamos falar sobre ele agora porque ele tem um impacto neste operador binário.

Veja como o paralelismo é implementado na Stream API. Sua fonte de dados é dividida em duas partes, cada parte processada separadamente. Cada processo é o mesmo processo que você acabou de ver, que usa seu operador binário. Então, quando cada parte é processada, os dois resultados parciais são mesclados com o mesmo operador binário.

Veja como este cálculo é conduzido.

Summing Elements of a Stream in Parallel

Processar um stream de dados em paralelo é muito fácil: é apenas uma questão de chamar [`parallel()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/BaseStream.html#parallel\(\)>) em um dado stream.

Vamos examinar como as coisas funcionam internamente e, para isso, você pode escrever o seguinte código. Você está apenas simulando como conduzir um cálculo em paralelo. Esta é, claro, uma versão excessivamente simplificada de um stream paralelo, apenas para explicar como as coisas funcionam.

Vamos criar um método [`reduce()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#reduce\(java.util.function.BinaryOperator\)>) que recebe um operador binário e o usa para reduzir uma lista de inteiros. O código é o seguinte.

```java
List<Integer> numbers = List.of(3, 6, 2, 1);
BinaryOperator<Integer> sumOperator = (partialSum, number) -> partialSum + number;

// Simulate splitting the stream
List<Integer> part1 = numbers.subList(0, numbers.size() / 2); // [3, 6]
List<Integer> part2 = numbers.subList(numbers.size() / 2, numbers.size()); // [2, 1]

int reduce1 = part1.stream().reduce(0, sumOperator); // 9
int reduce2 = part2.stream().reduce(0, sumOperator); // 3

int finalResult = sumOperator.apply(reduce1, reduce2); // 9 + 3 = 12
System.out.println(finalResult);
```

Para tornar as coisas explícitas, dividimos sua fonte de dados em duas partes e as reduzimos separadamente em dois inteiros: `reduce1` e `reduce2`. Em seguida, mesclamos esses resultados usando o mesmo operador binário. É basicamente assim que os streams paralelos funcionam.

Este código é muito simplificado e está aqui apenas para mostrar uma propriedade muito especial que seu operador binário deve ter. A forma como você divide os elementos de seus streams não deve ter impacto no resultado do cálculo. Todas as seguintes divisões devem lhe dar o mesmo resultado:

*   `3 + (6 + 2 + 1)`
*   `(3 + 6) + (2 + 1)`
*   `(3 + 6 + 2) + 1`

Isso mostra que seu operador binário deve ter uma propriedade bem conhecida chamada _associatividade_. Um operador binário passado para o método [`reduce()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#reduce\(java.util.function.BinaryOperator\)>) deve ser associativo.

A documentação da API JavaDoc das versões sobrecarregadas dos métodos [`reduce()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#reduce\(java.util.function.BinaryOperator\)>) na Stream API afirma que o operador binário que você fornece como argumento deve ser associativo.

O que acontecerá se não for? Bem, este é precisamente o problema: não será detectado, nem pelo compilador nem pelo runtime Java. Assim, seus dados serão processados sem erro aparente. Você pode ter o resultado correto ou não; isso depende da forma como seus dados serão processados internamente. Na verdade, se você executar seu código várias vezes, poderá obter resultados diferentes. Este é um ponto muito importante do qual você precisa estar ciente.

Como você pode testar se seu operador binário é associativo ou não? Em alguns casos, pode ser muito fácil: _SOMA_, _MÍNIMO_, _MÁXIMO_ são operadores associativos bem conhecidos. Em outros casos, pode ser muito mais difícil. Uma maneira de verificar essa propriedade pode ser apenas executar seu operador binário em dados aleatórios e verificar se você sempre obtém o mesmo resultado.

Se você não obtiver o mesmo resultado, então você pode concluir que seu operador não é associativo.

Mas se você não conseguir encontrar tal exemplo, você não pode concluir que seu operador é associativo. Pode haver um exemplo que você não encontrou.

## Gerenciando Operadores Binários Que Não Possuem Elemento de Identidade

A segunda é uma consequência desta propriedade de associatividade que seu operador binário deve ter.

Esta propriedade de associatividade é imposta pelo fato de que a forma como seus dados são divididos não deve impactar o resultado do seu cálculo. Se você dividir um conjunto _A_ em dois subconjuntos _B_ e _C_, então reduzir _A_ deve lhe dar o mesmo resultado que reduzir a redução de _B_ e a redução de _C_.

Você pode escrever a propriedade anterior na expressão mais geral a seguir:

_A_ = _B_ ⋃ _C_ ⇒ Red(_A_) = Red(Red(_B_), Red(_C_))

Acontece que isso leva a outra consequência. Suponha que as coisas não estejam indo bem e que _B_ esteja de fato vazio. Nesse caso, _C_ = _A_. A expressão anterior se torna a seguinte:

Red(_A_) = Red(Red(∅), Red(_A_))

Isso é verdadeiro se e somente se a redução do conjunto vazio (∅) for o elemento de identidade da operação de redução.

Esta é uma propriedade geral no processamento de dados: a redução do conjunto vazio é o elemento de identidade da operação de redução.

Este é realmente um problema no processamento de dados, e especialmente no processamento de dados paralelos, porque alguns operadores binários de redução muito clássicos não possuem um elemento de identidade, a saber, _MÍNIMO_ e _MÁXIMO_. O elemento mínimo de um conjunto vazio não é definido porque a operação _MÍNIMO_ não possui um elemento de identidade.

Este problema precisa ser abordado na Stream API porque você pode ter que lidar com streams vazios. Você viu padrões para criar streams vazios, e é bastante fácil ver que uma chamada [`filter()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#filter\(java.util.function.Predicate\)>) pode filtrar todos os dados que seu stream está processando, retornando assim um stream que não terá nada para processar.

A escolha que foi feita na Stream API é a seguinte. Uma redução para a qual o elemento de identidade é desconhecido (seja não existente, seja não fornecido) retorna uma instância da classe [`Optional`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html>). Abordaremos esta classe em mais detalhes posteriormente neste tutorial. O que você precisa saber neste ponto é que esta classe [`Optional`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html>) é uma classe wrapper que pode estar vazia. Toda vez que você chama uma operação terminal em um stream que não possui um elemento de identidade conhecido, a Stream API envolverá o resultado nesse objeto. Se o stream que você processou estava vazio, então este optional também estará vazio, e caberá a você e à sua aplicação decidir como lidar com a situação.

## Explorando os Métodos de Redução da Stream API

Como mencionamos anteriormente, a Stream API possui três sobrecargas dos métodos [`reduce()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#reduce\(java.util.function.BinaryOperator\)>), que agora podemos apresentar em detalhes.

### Reduzindo com um Elemento de Identidade

O primeiro recebe um elemento de identidade e uma instância de [`BinaryOperator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BinaryOperator.html>). Como o primeiro argumento que você fornece é conhecido por ser o elemento de identidade do operador binário, a implementação pode usá-lo para simplificar o cálculo. Em vez de pegar os dois primeiros elementos do stream para iniciar o processo, ele não pega nenhum e começa com este elemento de identidade. O algoritmo usado tem a seguinte forma.

```java
List<Integer> numbers = List.of(3, 6, 2, 1);
int sum = numbers.stream()
                 .reduce(0, (partialSum, number) -> partialSum + number);
System.out.println(sum);
```

Executar o exemplo anterior imprime o seguinte resultado.

```
12
```

Você pode notar que esta forma de escrever funciona bem mesmo se a lista que você precisa processar estiver vazia. Nesse caso, ele retornará o elemento de identidade, que é o que você precisa.

O fato de o elemento que você fornece ser de fato o elemento de identidade do operador binário não é verificado pela API. Fornecer um elemento que não seja retornará um resultado corrompido.

Você pode ver isso no exemplo a seguir.

```java
List<Integer> numbers = List.of(3, 6, 2, 1);
int sum = numbers.stream()
                 .reduce(1, (partialSum, number) -> partialSum + number);
System.out.println(sum);
```

Você esperaria que este código imprimisse o valor 0 no console. Como o primeiro argumento da chamada do método [`reduce()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#reduce\(T,java.util.function.BinaryOperator\)>) não é o elemento de identidade do operador binário e é usado pela implementação interna de [`reduce()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#reduce\(T,java.util.function.BinaryOperator\)>), o resultado está de fato incorreto. Executar este código imprimirá o seguinte em seu console.

```
13
```

Aqui está o código correto que você deveria estar usando.

```java
List<Integer> numbers = List.of(3, 6, 2, 1);
int sum = numbers.stream()
                 .reduce(0, (partialSum, number) -> partialSum + number);
System.out.println(sum);
```

Este código agora imprime o resultado correto.

Este exemplo mostra que passar um elemento de identidade errado não aciona nenhum erro ou exceção ao compilar seu código ou executá-lo. É realmente sua responsabilidade garantir que o objeto que você passa seja de fato o elemento de identidade do seu operador binário.

Testar esta propriedade pode ser feito da mesma forma que testar a propriedade associativa. Combine seu elemento de identidade candidato com o maior número possível de valores. Se você encontrar um que seja alterado pela combinação, então seu candidato não é o correto. Infelizmente, se você não conseguir encontrar nenhuma combinação defeituosa, isso não significa que seu candidato esteja correto.

### Reduzindo sem um Elemento de Identidade

A segunda sobrecarga do método [`reduce()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#reduce\(java.util.function.BinaryOperator\)>) recebe apenas uma instância de [`BinaryOperator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BinaryOperator.html>) sem elemento de identidade. Como esperado, ele retorna um objeto [`Optional`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html>), envolvendo o resultado da redução. A coisa mais simples que você pode fazer com um optional é apenas abri-lo e ver se há algo dentro.

Vamos fazer um exemplo com uma redução que não possui um elemento de identidade.

```java
List<Integer> numbers = List.of(3, 6, 2, 1);
int max = numbers.stream()
                 .reduce((maxSoFar, number) -> Integer.max(maxSoFar, number))
                 .orElseThrow();
System.out.println(max);
```

Executar este código lhe dá o seguinte resultado.

```
6
```

Observe que este código abre o optional usando o método [`orElseThrow()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#orElseThrow\(\)>), que agora é a forma preferida de fazê-lo. Este padrão foi adicionado no Java SE 10, em substituição ao método mais tradicional [`get()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#get\(\)>) que foi originalmente introduzido no Java SE 8.

O problema com este método [`get()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#get\(\)>) é que ele pode lançar uma [`NoSuchElementException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/NoSuchElementException.html>) caso o optional esteja vazio. Nomear este método [`orElseThrow()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#orElseThrow\(\)>) foi preferido em relação a [`get()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#get\(\)>), porque ele lembra que você receberá uma exceção se tentar abrir um optional vazio. Dito isso, o método [`get()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Optional.html#get\(\)>) ainda está lá, por razões de compatibilidade com versões anteriores.

Muitas outras coisas podem ser feitas com optionals, o que você aprenderá na [parte de Optional](<#/doc/tutorials/api/streams/optionals>).

### Fundindo Mapeamento e Redução em um Método

O terceiro é um pouco mais complexo. Ele combina um mapeamento interno e uma redução com vários parâmetros.

Vamos examinar a assinatura deste método.

```java
<U> U reduce(U identity,
             BiFunction<U, ? super T, U> accumulator,
             BinaryOperator<U> combiner);
```

Este método funciona com um tipo `U` que é definido localmente para este método e usado pelo operador binário. O operador binário funciona da mesma forma que nas sobrecargas anteriores do método [`reduce()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#reduce\(java.util.function.BinaryOperator\)>), exceto que ele não é aplicado aos elementos do stream, mas apenas às versões mapeadas deles.

Este mapeamento e a própria redução são, na verdade, combinados em uma única operação: o acumulador. Lembre-se que, no início desta parte, você viu que a redução era conduzida incrementalmente e consumia um elemento por vez. Em cada ponto, o primeiro argumento da operação de redução é a redução parcial de todos os elementos consumidos até agora.

O elemento de identidade é o elemento de identidade do combinador.

É exatamente isso que está acontecendo aqui.

Suponha que você tenha um stream de instâncias de [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) e precise somar todos os comprimentos dessas strings usando este padrão.

O combinador combina dois inteiros: as somas parciais dos comprimentos das strings processadas até agora. Então, o elemento de identidade que você precisa fornecer é o elemento de identidade: 0.

O acumulador pega um elemento do stream, o mapeia para um inteiro (o comprimento dessa string) e o adiciona à soma parcial calculada até agora.

Veja como o algoritmo funciona.

Fusing Reduction and Mapping

O código correspondente é o seguinte.

```java
List<String> strings = List.of("one", "two", "three", "four");
int totalLength = strings.stream()
                         .reduce(0,
                                 (partialLength, str) -> partialLength + str.length(),
                                 (a, b) -> a + b);
System.out.println(totalLength);
```

Executar este código produz o seguinte resultado.

```
16
```

No exemplo acima, o mapper seria simplesmente a seguinte função.

```java
str -> str.length()
```

Então você pode reescrever o acumulador para o seguinte padrão. Esta forma de escrever as coisas mostra claramente a fusão do mapeamento, modelado pelo mapper, e da redução, modelada pelo operador binário.

```java
(partialLength, str) -> partialLength + mapper.apply(str)
```

### Neste tutorial

Reduzindo um Stream Usando um Operador Binário para Reduzir um Stream Escolhendo um Operador Binário Que Pode Ser Usado em Paralelo Gerenciando Operadores Binários Que Não Possuem Elemento de Identidade Explorando os Métodos de Redução da Stream API

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Criando Streams](<#/doc/tutorials/api/streams/creating>)

➜

**Tutorial Atual**

Reduzindo um Stream

➜

**Próximo na Série**

[Adicionando uma Operação Terminal em um Stream](<#/doc/tutorials/api/streams/terminal-operations>)

**Anterior na Série:** [Criando Streams](<#/doc/tutorials/api/streams/creating>)

**Próximo na Série:** [Adicionando uma Operação Terminal em um Stream](<#/doc/tutorials/api/streams/terminal-operations>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A Stream API ](<#/doc/tutorials/api/streams>) > Reduzindo um Stream