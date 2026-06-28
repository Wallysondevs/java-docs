# Usando Expressões Lambda em Sua Aplicação

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Lambda ](<#/doc/tutorials/lambdas>) > Usando Expressões Lambda em Sua Aplicação 

**Anterior na Série**

[Escrevendo Sua Primeira Expressão Lambda](<#/doc/tutorials/lambdas/first-lambdas>)

➜

**Tutorial Atual**

Usando Expressões Lambda em Sua Aplicação

➜

**Próximo na Série**

[Escrevendo Expressões Lambda como Referências de Método](<#/doc/tutorials/lambdas/method-references>)

**Anterior na Série:** [Escrevendo Sua Primeira Expressão Lambda](<#/doc/tutorials/lambdas/first-lambdas>)

**Próximo na Série:** [Escrevendo Expressões Lambda como Referências de Método](<#/doc/tutorials/lambdas/method-references>)

# Usando Expressões Lambda em Sua Aplicação

A introdução das expressões lambda no Java SE 8 veio com uma grande reescrita da API do JDK. Mais classes foram atualizadas no JDK 8 após a introdução das lambdas do que no JDK 5 após a introdução dos generics.

Graças à definição muito simples de _interfaces funcionais_, muitas interfaces existentes se tornaram _funcionais_ sem a necessidade de modificá-las. O mesmo vale para o seu código existente: se você tem interfaces em sua aplicação escritas antes do Java SE 8, elas podem se tornar funcionais sem a necessidade de alterá-las, tornando possível implementá-las com lambdas.

 

## Descobrindo o pacote `java.util.function`

O JDK 8 também introduz um novo pacote: [`java.util.function`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/package-summary.html>) com interfaces funcionais para você usar em sua aplicação. Essas interfaces funcionais também são amplamente utilizadas na API do JDK, especialmente nos Collections Frameworks e na Stream API. Este pacote está no módulo [`java.base`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/module-summary.html>).

Com um pouco mais de 40 interfaces, este pacote pode parecer um pouco assustador à primeira vista. Acontece que ele é organizado em torno de quatro interfaces principais. Compreendê-las lhe dá a chave para entender todas as outras.

 

## Criando ou Fornecendo Objetos com `Supplier<T>`

### Implementando a Interface `Supplier<T>`

A primeira interface é a interface [`Supplier<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Supplier.html>). Em resumo, um supplier não recebe nenhum argumento e retorna um objeto.

Deveríamos realmente dizer: uma lambda que implementa a interface supplier não recebe nenhum argumento e retorna um objeto. Criar atalhos torna as coisas mais fáceis de lembrar, desde que não sejam confusos.

Esta interface é realmente simples: ela não possui métodos default ou static, apenas um método [`get()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Supplier.html#get\(\)>) simples. Aqui está esta interface:

```java
@FunctionalInterface
public interface Supplier<T> {
    T get();
}
```

A seguinte lambda é uma implementação desta interface:

```java
Supplier<String> hello = () -> "Hello Duke!";
```

Esta expressão lambda simplesmente retorna a string de caracteres `Hello Duke!`. Você também pode escrever um supplier que retorna um novo objeto toda vez que é invocado:

```java
Random random = new Random(314L);
Supplier<Integer> newRandom = () -> random.nextInt();
```

Chamar o método [`get()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Supplier.html#get\(\)>) deste supplier invocará [`random.nextInt()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Random.html#nextInt\(\)>), e produzirá inteiros aleatórios. Como a semente deste gerador aleatório é fixada no valor `314L`, você deverá ver os seguintes inteiros aleatórios gerados:

```java
System.out.println(newRandom.get()); // 1002069796
System.out.println(newRandom.get()); // -1763700067
System.out.println(newRandom.get()); // -1380977277
```

Note que esta lambda está capturando uma variável do escopo envolvente: `random`, tornando esta variável _efetivamente final_.

### Usando um `Supplier<T>`

Observe como você gerou números aleatórios usando o supplier `newRandom` no exemplo anterior:

```java
Integer nextRandom = newRandom.get();
```

Chamar o método [`get()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Supplier.html#get\(\)>) da interface [`Supplier`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Supplier.html>) invoca sua lambda.

### Usando Suppliers Especializados

Expressões lambda são usadas para processar dados em aplicações. A velocidade com que uma expressão lambda pode ser executada é, portanto, crítica no JDK. Qualquer ciclo de CPU que possa ser salvo deve ser salvo, pois pode representar uma otimização significativa em uma aplicação real.

Seguindo este princípio, a API do JDK também oferece versões especializadas e otimizadas da interface [`Supplier<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Supplier.html>).

Você deve ter notado que nosso segundo exemplo fornece o tipo [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>), onde o método [`Random.nextInt()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Random.html#nextInt\(\)>) retorna um `int`. Então, no código que você escreveu, duas coisas estão acontecendo por debaixo dos panos:

  * o `int` retornado por [`Random.nextInt()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Random.html#nextInt\(\)>) é primeiro empacotado em um [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>), pelo mecanismo de auto-boxing;
  * este [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) é então desempacotado quando atribuído à variável `nextRandom`, pelo mecanismo de auto-unboxing.



O auto-boxing é o mecanismo pelo qual um valor `int` pode ser diretamente atribuído a um objeto [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>):

```java
int i = 10;
Integer j = i; // auto-boxing
```

Por debaixo dos panos, um objeto é criado para você, encapsulando esse valor.

O auto-unboxing faz o oposto. Você pode atribuir um [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) a um valor `int`, desembrulhando o valor dentro do [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>):

```java
Integer i = 10;
int j = i; // auto-unboxing
```

Este boxing / unboxing não é gratuito. Na maioria das vezes, este custo será pequeno em comparação com outras coisas que sua aplicação está fazendo, como obter dados de um banco de dados ou de um serviço remoto. Mas em alguns casos, este custo pode não ser aceitável, e você precisa evitar pagá-lo.

A boa notícia é: o JDK oferece uma solução com a interface [`IntSupplier`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/IntSupplier.html>). Aqui está esta interface:

```java
@FunctionalInterface
public interface IntSupplier {
    int getAsInt();
}
```

Observe que você pode usar exatamente o mesmo código para implementar esta interface:

```java
Random random = new Random(314L);
IntSupplier newRandom = () -> random.nextInt();
```

A única modificação no código da sua aplicação é que você precisa chamar [`getAsInt()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/IntSupplier.html#getAsInt\(\)>) em vez de [`get()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Supplier.html#get\(\)>):

```java
int nextRandomInt = newRandom.getAsInt();
```

O resultado da execução deste código é o mesmo, mas desta vez nenhum boxing / unboxing ocorreu: este código é mais performático que o anterior.

O JDK oferece quatro desses suppliers especializados, para evitar boxing / unboxing desnecessários em sua aplicação: [`IntSupplier`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/IntSupplier.html>), [`BooleanSupplier`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BooleanSupplier.html>), [`LongSupplier`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/LongSupplier.html>) e [`DoubleSupplier`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/DoubleSupplier.html>).

> Você verá mais dessas versões especializadas de interfaces funcionais para lidar com tipos primitivos. Existe uma convenção de nomenclatura simples para seus métodos abstratos: pegue o nome do método abstrato principal ([`get()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Supplier.html#get\(\)>) no caso do supplier), e adicione o tipo de retorno a ele. Assim, para as interfaces supplier, temos: [`getAsBoolean()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BooleanSupplier.html#getAsBoolean\(\)>), [`getAsInt()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/IntSupplier.html#getAsInt\(\)>), [`getAsLong()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/LongSupplier.html#getAsLong\(\)>), e [`getAsDouble()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/DoubleSupplier.html#getAsDouble\(\)>).

 

## Consumindo Objetos com `Consumer<T>`

### Implementando e Usando Consumers

A segunda interface é a interface [`Consumer<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Consumer.html>). Um consumer faz o oposto do supplier: ele recebe um argumento e não retorna nada.

A interface é um pouco mais complexa: ela possui métodos default, que serão abordados mais adiante neste tutorial. Vamos nos concentrar em seu método abstrato:

```java
@FunctionalInterface
public interface Consumer<T> {
    void accept(T t);
    // ...
}
```

Você já implementou consumers:

```java
Consumer<String> printer = s -> System.out.println(s);
```

Você pode atualizar o exemplo anterior com este consumer:

```java
printer.accept(hello.get());
```

### Usando Consumers Especializados

Suponha que você precise imprimir inteiros. Então você pode escrever o seguinte consumer:

```java
Consumer<Integer> intPrinter = i -> System.out.println(i);
```

Então você pode enfrentar o mesmo problema de auto-boxing que no exemplo do supplier. Este boxing / unboxing é aceitável em sua aplicação, em termos de performance?

Não se preocupe se este não for o caso, o JDK oferece três consumers especializados disponíveis: [`IntConsumer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/IntConsumer.html>), [`LongConsumer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/LongConsumer.html>), e [`DoubleConsumer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/DoubleConsumer.html>). Os métodos abstratos desses três consumers seguem a mesma convenção dos suppliers, já que o tipo de retorno é sempre `void`, todos são nomeados [`accept`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/IntConsumer.html#accept\(int\)>).

### Consumindo Dois Elementos com um BiConsumer

Então o JDK adiciona outra variante da interface [`Consumer<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Consumer.html>), que recebe dois argumentos em vez de um, chamada de forma bastante natural de interface [`BiConsumer<T, U>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiConsumer.html>). Aqui está esta interface:

```java
@FunctionalInterface
public interface BiConsumer<T, U> {
    void accept(T t, U u);
    // ...
}
```

Aqui está um exemplo de um biconsumer:

```java
BiConsumer<String, String> biPrinter = (s1, s2) -> System.out.println(s1 + s2);
```

Você pode usar este biconsumer para escrever o exemplo anterior de forma diferente:

```java
biPrinter.accept("Hello ", "Duke!");
```

Existem três versões especializadas da interface [`BiConsumer<T, U>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiConsumer.html>) para lidar com tipos primitivos: [`ObjIntConsumer<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/ObjIntConsumer.html>), [`ObjLongConsumer<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/ObjLongConsumer.html>) e [`ObjDoubleConsumer<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/ObjDoubleConsumer.html>).

### Passando um Consumer para um Iterable

Vários métodos importantes foram adicionados às interfaces do Collections Framework, que são abordados em outra parte deste tutorial. Um deles recebe um [`Consumer<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Consumer.html>) como argumento e é extremamente útil: o método [`Iterable.forEach()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Iterable.html#forEach\(java.util.function.Consumer\)>). Aqui está um exemplo simples, que você verá em todos os lugares:

```java
List<String> names = List.of("Duke", "Scot", "Mickey");
names.forEach(s -> System.out.println(s));
```

Esta última linha de código simplesmente aplicará o consumer a todos os objetos da lista. Aqui, ele simplesmente os imprimirá um por um no console. Você verá outra forma de escrever este consumer em uma parte posterior.

Este método [`forEach()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Iterable.html#forEach\(java.util.function.Consumer\)>) expõe uma forma de acessar uma iteração interna sobre todos os elementos de qualquer [`Iterable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Iterable.html>), passando a ação que você precisa realizar em cada um desses elementos. É uma forma muito poderosa de fazer isso, e também torna seu código mais legível.

 

## Testando Objetos com `Predicate<T>`

### Implementando e Usando Predicates

A terceira interface é a interface [`Predicate<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html>). Um predicate é usado para testar um objeto. Ele é usado para filtrar streams na Stream API, um tópico que você verá mais adiante.

Seu método abstrato recebe um objeto e retorna um valor booleano. Esta interface é novamente um pouco mais complexa que [`Consumer<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Consumer.html>): há métodos default e métodos static definidos nela, que você verá mais adiante. Vamos nos concentrar em seu método abstrato:

```java
@FunctionalInterface
public interface Predicate<T> {
    boolean test(T t);
    // ...
}
```

Você já viu um exemplo de um [`Predicate<String>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html>) em uma parte anterior:

```java
Predicate<String> p = s -> s.length() > 10;
```

Para testar uma determinada string, tudo o que você precisa fazer é chamar o método [`test()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html#test\(T\)>) da interface [`Predicate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html>):

```java
System.out.println(p.test("Hello Duke!")); // true
```

### Usando Predicates Especializados

Suponha que você precise testar valores inteiros. Você pode escrever o seguinte predicate:

```java
Predicate<Integer> p = i -> i > 10;
```

O mesmo vale para os consumers, o supplier e este predicate. O que este predicate recebe como argumento é uma referência a uma instância da classe [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>), então antes de comparar este valor com 10, este objeto é auto-unboxed. É muito conveniente, mas vem com uma sobrecarga.

A solução fornecida pelo JDK é a mesma para suppliers e consumers: predicates especializados. Juntamente com [`Predicate<String>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html>), existem três interfaces especializadas: [`IntPredicate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/IntPredicate.html>), [`LongPredicate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/LongPredicate.html>), e [`DoublePredicate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/DoublePredicate.html>), para `int`, `long` e `double` respectivamente. Seus métodos abstratos são todos nomeados [`test()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html#test\(T\)>) e recebem um argumento de tipo primitivo correspondente ao nome da interface. Dessa forma, nenhum boxing é feito. 

Então você pode escrever o exemplo anterior da seguinte forma:

```java
IntPredicate p = i -> i > 10;
```

Você pode ver que a sintaxe da própria lambda é a mesma, a única diferença é que `i` agora é do tipo `int` em vez de [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>).

### Testando Dois Elementos com um BiPredicate

Seguindo a convenção que você viu com o [`Consumer<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Consumer.html>), o JDK também adiciona uma interface [`BiPredicate<T, U>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiPredicate.html>), que testa dois elementos em vez de um. Aqui está esta interface:

```java
@FunctionalInterface
public interface BiPredicate<T, U> {
    boolean test(T t, U u);
    // ...
}
```

Aqui está um exemplo de tal bipredicate:

```java
BiPredicate<String, Integer> p = (s, i) -> s.length() > i;
```

Você pode usar este bipredicate com o seguinte padrão:

```java
System.out.println(p.test("Hello Duke!", 10)); // true
```

Não há versão especializada de [`BiPredicate<T, U>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiPredicate.html>) para lidar com tipos primitivos.

### Passando um Predicate para uma Collection

Um dos métodos adicionados ao Collections Framework recebe um predicate: o método [`removeIf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#removeIf\(java.util.function.Predicate\)>). Este método usa este predicate para testar cada elemento da collection. Se o resultado do teste for `true`, então este elemento é removido da collection.

Você pode ver este padrão em ação no exemplo a seguir:

```java
List<String> names = new ArrayList<>(List.of("Duke", "Scot", "Mickey"));
names.removeIf(s -> s.length() > 4);
names.forEach(s -> System.out.println(s));
```

A execução deste código produzirá o seguinte resultado:

```
Duke
```

Há várias coisas que valem a pena destacar neste exemplo:

  * Como você pode ver, chamar [`removeIf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#removeIf\(java.util.function.Predicate\)>) muta esta collection.
  * Portanto, você não deve chamar [`removeIf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#removeIf\(java.util.function.Predicate\)>) em uma collection imutável, como as produzidas pelos métodos de fábrica [`List.of()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#of\(E...\)>). Você receberá uma exceção se fizer isso porque não pode remover elementos de uma collection imutável.
  * [`Arrays.asList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html#asList\(T...\)>) produz uma collection que se comporta como um array. Você pode mutar seus elementos existentes, mas não tem permissão para adicionar ou remover elementos da lista retornada por este método de fábrica. Portanto, chamar [`removeIf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#removeIf\(java.util.function.Predicate\)>) nesta lista também não funcionará.
## Mapeando Objetos para Outros Objetos com `Function<T, R>`

### Implementando e Usando Funções

A quarta interface é a interface [`Function<T, R>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html>). O método abstrato de uma função recebe um objeto do tipo `T` e retorna uma transformação desse objeto para qualquer outro tipo `U`. Esta interface também possui métodos default e static.

Funções são usadas na Stream API para mapear objetos para outros objetos, um tópico que será abordado mais adiante. Um predicate pode ser visto como um tipo especializado de função, que retorna um `boolean`.

### Usando Funções Especializadas

Este é um exemplo de uma função que recebe uma string e retorna o comprimento dessa string.

Aqui novamente, você pode observar as operações de boxing e unboxing em ação. Primeiro, o método [`length()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#length\(\)>) retorna um `int`. Como a função retorna um [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html>), este `int` é "boxed". Mas então o resultado é atribuído a uma variável `length` do tipo `int`, então o [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) é então "unboxed" para ser armazenado nesta variável.

Se a performance não for um problema em sua aplicação, então este boxing e unboxing realmente não é um grande problema. Se for, você provavelmente vai querer evitá-lo.

O JDK tem soluções para você, com versões especializadas da interface [`Function<T, R>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html>). Este conjunto de interfaces é mais complexo do que o que vimos para as categorias [`Supplier`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Supplier.html>), [`Consumer<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Consumer.html>) ou [`Predicate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html>), porque as funções especializadas são definidas tanto para o tipo do argumento de entrada quanto para o tipo retornado.

Tanto o argumento de entrada quanto a saída podem ter quatro tipos diferentes:

  * um tipo parametrizado `T`;
  * um `int`;
  * um `long`;
  * um `double`.

As coisas não param por aqui, porque há uma sutileza no design da API. Existe uma interface especial: [`UnaryOperator<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/UnaryOperator.html>) que estende [`Function<T, T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html>). Este conceito de operador unário é usado para nomear as funções que recebem um argumento de um determinado tipo e retornam um resultado do mesmo tipo. Um operador unário é exatamente o que você esperaria. Todos os operadores matemáticos clássicos podem ser modelados por um [`UnaryOperator<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/UnaryOperator.html>): a raiz quadrada, todos os operadores trigonométricos, o logaritmo e o exponencial.

Aqui estão os 16 tipos especializados de funções que você pode encontrar no pacote [`java.util.function`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/package-summary.html>).

Tipos de parâmetro | `T` | `int` | `long` | `double`
---|---|---|---|---
`T` | [`UnaryOperator<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/UnaryOperator.html>) | [`IntFunction<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/IntFunction.html>) | [`LongFunction<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/LongFunction.html>) | [`DoubleFunction<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/DoubleFunction.html>)
`int` | [`ToIntFunction<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/ToIntFunction.html>) | [`IntUnaryOperator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/IntUnaryOperator.html>) | [`LongToIntFunction`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/LongToIntFunction.html>) | [`DoubleToIntFunction`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/DoubleToIntFunction.html>)
`long` | [`ToLongFunction<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/ToLongFunction.html>) | [`IntToLongFunction`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/IntToLongFunction.html>) | [`LongUnaryOperator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/LongUnaryOperator.html>) | [`DoubleToLongFunction`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/DoubleToLongFunction.html>)
`double` | [`ToDoubleFunction<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/ToDoubleFunction.html>) | [`IntToDoubleFunction`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/IntToDoubleFunction.html>) | [`LongToDoubleFunction`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/LongToDoubleFunction.html>) | [`DoubleUnaryOperator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/DoubleUnaryOperator.html>)

Todos os métodos abstratos dessas interfaces seguem a mesma convenção: eles são nomeados de acordo com o tipo de retorno daquela função. Aqui estão seus nomes:

  * [`apply()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html#apply\(T\)>) para as funções que retornam um tipo genérico `T`
  * [`applyAsInt()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/ToIntFunction.html#applyAsInt\(T\)>) se retornar o tipo primitivo `int`
  * [`applyAsLong()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/ToLongFunction.html#applyAsLong\(T\)>) para `long`
  * [`applyAsDouble()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/ToDoubleFunction.html#applyAsDouble\(T\)>) para `double`

### Passando um Operador Unário para uma Lista

Você pode transformar os elementos de uma lista com um [`UnaryOperator<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/UnaryOperator.html>). Alguém poderia se perguntar por que um [`UnaryOperator<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/UnaryOperator.html>) e não uma [`Function`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html>) básica. A resposta é, na verdade, bastante simples: uma vez declarada, você não pode alterar o tipo de uma lista. Assim, a função que você aplica pode alterar os elementos da lista, mas não o seu tipo.

O método que recebe este operador unário o passa para o método [`replaceAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#replaceAll\(java.util.function.UnaryOperator\)>). Aqui está um exemplo:

Running this code displays the following:

Note that this time we used a list created with the [`Arrays.asList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html#asList\(T...\)>) pattern. Indeed you do not need to add or remove any element to that list: this code just modifies each element one by one, which is possible with this particular list.
-> Observe que desta vez usamos uma lista criada com o padrão [`Arrays.asList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html#asList\(T...\)>). De fato, você não precisa adicionar ou remover nenhum elemento dessa lista: este código apenas modifica cada elemento um por um, o que é possível com esta lista em particular.

### Mapeando Dois Elementos com uma BiFunction

Assim como para o consumer e o predicate, as funções também possuem uma versão que recebe dois argumentos: a bifunction. A interface é [`BiFunction<T, U, R>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiFunction.html>), onde `T` e `U` são os argumentos e `R` é o tipo retornado. Aqui está a interface:

Você pode criar uma bifunction com uma expressão lambda:

A interface [`UnaryOperator<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/UnaryOperator.html>) também possui uma interface irmã com dois argumentos: a [`BinaryOperator<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BinaryOperator.html>), que estende [`BiFunction<T, U, R>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiFunction.html>). Como seria de esperar, as quatro operações aritméticas básicas podem ser modeladas com um [`BinaryOperator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BinaryOperator.html>).

Um subconjunto de todas as possíveis versões especializadas de bifunction foi adicionado ao JDK:

  * [`IntBinaryOperator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/IntBinaryOperator.html>), [`LongBinaryOperator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/LongBinaryOperator.html>) e [`DoubleBinaryOperator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/DoubleBinaryOperator.html>);
  * [`ToIntBiFunction<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/ToIntBiFunction.html>), [`ToLongBiFunction<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/ToLongBiFunction.html>) e [`ToDoubleBiFunction<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/ToDoubleBiFunction.html>).

## Concluindo as Quatro Categorias de Interfaces Funcionais

O pacote [`java.util.function`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/package-summary.html>) é agora central em Java, porque todas as expressões lambda que você usará no Collections Framework ou na Stream API implementam uma das interfaces desse pacote.

Como você viu, este pacote contém muitas interfaces e encontrar o seu caminho pode ser complicado.

Primeiramente, o que você precisa lembrar é que existem 4 categorias de interfaces:

  * os suppliers: não recebem nenhum argumento, retornam algo
  * os consumers: recebem um argumento, não retornam nada
  * os predicates: recebem um argumento, retornam um boolean
  * as functions: recebem um argumento, retornam algo

Em segundo lugar: algumas interfaces possuem versões que recebem dois argumentos em vez de um:

  * os biconsumers
  * os bipredicates
  * as bifunctions

Em terceiro lugar: algumas interfaces possuem versões especializadas, adicionadas para evitar boxing e unboxing. Há muitas para listar todas. Elas são nomeadas de acordo com o tipo que recebem. Por exemplo: [`IntPredicate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/IntPredicate.html>), ou o tipo que retornam, como em [`ToLongFunction<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/ToLongFunction.html>). Elas podem ser nomeadas de acordo com ambos: [`IntToDoubleFunction`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/IntToDoubleFunction.html>).

Por último: existem extensões de [`Function<T, R>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html>) e [`BiFunction<T, U, R>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BiFunction.html>) para o caso em que todos os tipos são os mesmos: [`UnaryOperator<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/UnaryOperator.html>) e [`BinaryOperator<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/BinaryOperator.html>), com versões especializadas para os tipos primitivos.

## Mais Aprendizado

### Neste tutorial

Descobrindo java.util.function Criando ou Fornecendo Objetos com um Supplier Consumindo Objetos com um Consumer Testando Objetos com um Predicate Mapeando Objetos para Outros Objetos com uma Function Concluindo as Quatro Categorias de Interfaces Funcionais Mais Aprendizado

Última atualização: 26 de outubro de 2021

**Anterior na Série**

[Escrevendo Sua Primeira Expressão Lambda](<#/doc/tutorials/lambdas/first-lambdas>)

➜

**Tutorial Atual**

Usando Expressões Lambda em Sua Aplicação

➜

**Próximo na Série**

[Escrevendo Expressões Lambda como Referências de Método](<#/doc/tutorials/lambdas/method-references>)

**Anterior na Série:** [Escrevendo Sua Primeira Expressão Lambda](<#/doc/tutorials/lambdas/first-lambdas>)

**Próximo na Série:** [Escrevendo Expressões Lambda como Referências de Método](<#/doc/tutorials/lambdas/method-references>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Lambda ](<#/doc/tutorials/lambdas>) > Usando Expressões Lambda em Sua Aplicação