[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Lambda ](<#/doc/tutorials/lambdas>) > Escrevendo Expressões Lambda como Referências de Método

**Anterior na Série**

[Usando Expressões Lambda em Sua Aplicação](<#/doc/tutorials/lambdas/functional-interfaces>)

➜

**Tutorial Atual**

Escrevendo Expressões Lambda como Referências de Método

➜

**Próximo na Série**

[Combinando Expressões Lambda](<#/doc/tutorials/lambdas/combining-chaining-composing>)

**Anterior na Série:** [Usando Expressões Lambda em Sua Aplicação](<#/doc/tutorials/lambdas/functional-interfaces>)

**Próximo na Série:** [Combinando Expressões Lambda](<#/doc/tutorials/lambdas/combining-chaining-composing>)

# Escrevendo Expressões Lambda como Referências de Método

Você viu que uma expressão lambda é, de fato, a implementação de um método: o único método abstrato de uma functional interface. Às vezes, as pessoas chamam essas expressões lambda de "métodos anônimos", pois é exatamente isso: um método que não tem nome e que você pode mover pela sua aplicação, armazenar em um campo ou variável, passar como argumento para um método ou construtor e retornar de um método.

Às vezes, você estará escrevendo expressões lambda que são apenas chamadas para métodos específicos definidos em outro lugar. E, de fato, você já fez isso quando escreveu o seguinte código:

```java
Consumer<String> printer = s -> System.out.println(s);
printer.accept("Hello World!");
```

Escrita dessa forma, esta expressão lambda é apenas uma referência ao método [`println()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#println\(\)>) definido no objeto [`System.out`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/System.html#out>).

É aqui que a sintaxe de _method reference_ entra em cena.

## Sua Primeira Referência de Método

Às vezes, uma expressão lambda é apenas uma referência a um método existente. Nesse caso, você pode escrevê-la como uma _method reference_. O código anterior então se torna o seguinte:

```java
Consumer<String> printer = System.out::println;
printer.accept("Hello World!");
```

Existem quatro categorias de method references:

*   Referências de método estático
*   Referências de método ligado
*   Referências de método desligado
*   Referências de método de construtor

O consumer `printer` pertence à categoria de _bound method references_.

> Na maioria das vezes, sua IDE será capaz de informar se uma expressão lambda específica pode ser escrita como uma method reference. Não hesite em perguntar a ela!

## Escrevendo Referências de Método Estático

Suponha que você tenha o seguinte código:

```java
Function<Double, Double> sqrt = d -> Math.sqrt(d);
System.out.println(sqrt.apply(4.0));
```

Esta expressão lambda é, de fato, uma referência ao método estático [`Math.sqrt()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#sqrt\(double\)>). Ela pode ser escrita dessa forma:

```java
Function<Double, Double> sqrt = Math::sqrt;
System.out.println(sqrt.apply(4.0));
```

Esta method reference particular se refere a um método estático e é, portanto, chamada de _static method reference_. A sintaxe geral de uma static method reference é `RefType::staticMethod`.

Uma static method reference pode receber mais de um argumento. Considere o seguinte código:

```java
BiFunction<Double, Double, Double> pow = (d1, d2) -> Math.pow(d1, d2);
System.out.println(pow.apply(2.0, 3.0));
```

Você pode reescrevê-lo com uma method reference:

```java
BiFunction<Double, Double, Double> pow = Math::pow;
System.out.println(pow.apply(2.0, 3.0));
```

## Escrevendo Referências de Método Desligado

### Métodos Que Não Recebem Nenhum Argumento

Suponha que você tenha o seguinte código:

```java
ToIntFunction<String> length = s -> s.length();
System.out.println(length.applyAsInt("Hello World!"));
```

Esta função poderia ser escrita como uma [`ToIntFunction<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/ToIntFunction.html>). É apenas uma referência ao método [`length()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#length\(\)>) da classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>). Então você pode escrevê-la como uma method reference:

```java
ToIntFunction<String> length = String::length;
System.out.println(length.applyAsInt("Hello World!"));
```

Esta sintaxe pode ser confusa a princípio, pois realmente se parece com uma chamada estática. Mas, na verdade, não é: o método `length()` é um método de instância da classe `String`.

Você pode chamar qualquer getter de um Java bean simples com tal method reference. Suponha que você tenha a classe `User` com um `getName()` definido nela. Você pode então escrever a seguinte função:

```java
Function<User, String> getUserName = user -> user.getName();
```

como a seguinte method reference:

```java
Function<User, String> getUserName = User::getName;
```

### Métodos Que Recebem Um ou Mais Argumentos

Aqui está outro exemplo que você já viu:

```java
BiFunction<String, Character, Integer> indexOf = (s, c) -> s.indexOf(c);
System.out.println(indexOf.apply("Hello World!", 'o'));
```

Esta lambda é, de fato, uma referência ao método [`indexOf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#indexOf\(int\)>) da classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>), e pode, portanto, ser escrita como a seguinte method reference:

```java
BiFunction<String, Character, Integer> indexOf = String::indexOf;
System.out.println(indexOf.apply("Hello World!", 'o'));
```

Esta sintaxe pode parecer mais confusa do que os exemplos mais fáceis `String::length` ou `User::getName`, que são bastante diretos. Uma boa maneira de reconstruir mentalmente a lambda escrita da forma clássica é verificar o tipo desta method reference. Isso lhe dará os argumentos que esta lambda está recebendo.

A sintaxe geral de uma unbound method reference é a seguinte: `RefType::instanceMethod`, onde `RefType` é o nome de um tipo, e `instanceMethod` é o nome de um método de instância.

## Escrevendo Referências de Método Ligado

O primeiro exemplo de method reference que você viu foi o seguinte:

```java
Consumer<String> printer = System.out::println;
```

Esta method reference é chamada de _bound method reference_. Esta method reference é chamada de _ligada_ porque o objeto no qual o método é chamado é definido na própria method reference. Assim, esta chamada é _ligada_ ao objeto fornecido na method reference.

Se você considerar a sintaxe _unbound_: `Person::getName`, você pode ver que o objeto no qual o método é chamado não faz parte desta sintaxe: ele é fornecido como um argumento da expressão lambda. Considere o seguinte código:

```java
Function<User, String> getUserName = User::getName;
String userName = getUserName.apply(new User("John Doe"));
```

Você pode ver que a função é aplicada a uma instância específica de `User`, que é passada para a função. Esta função então opera sobre essa instância.

Este não é o caso no exemplo anterior do consumer: o método `println()` é chamado no objeto `System.out`, que faz parte da method reference.

A sintaxe geral de uma bound method reference é a seguinte: `expr::instanceMethod`, onde `expr` é uma expressão que retorna um objeto, e `instanceMethod` é o nome de um método de instância.

## Escrevendo Referências de Método de Construtor

O último tipo de method reference que você precisa conhecer é a _constructor method reference_. Suponha que você tenha o seguinte [`Supplier<List<String>>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Supplier.html>):

```java
Supplier<List<String>> newListOfStrings = () -> new ArrayList<>();
```

Você pode ver que da mesma forma que o restante: isso se resume a ser uma referência ao construtor vazio de `ArrayList`. Bem, method reference pode fazer isso. Mas como um construtor não é um método, esta é outra categoria de method references. A sintaxe é a seguinte:

```java
Supplier<List<String>> newListOfStrings = ArrayList::new;
```

Você pode notar que o diamond operator não é necessário aqui. Se você quiser colocá-lo, então você também precisa fornecer o tipo:

```java
Supplier<List<String>> newListOfStrings = ArrayList<String>::new;
```

Você precisa estar ciente do fato de que, se você não souber o tipo de uma method reference, então você não poderá dizer o que ela faz exatamente. Aqui está um exemplo:

```java
Supplier<List<String>> newListOfStrings = ArrayList::new;
Function<Integer, List<String>> newListOfNStrings = ArrayList::new;
```

Ambas as variáveis `newListOfStrings` e `newListOfNStrings` podem ser escritas com a mesma sintaxe `ArrayList::new`, mas elas não se referem ao mesmo construtor. Você só precisa ter cuidado com isso.

## Concluindo as Referências de Método

Aqui estão os quatro tipos de method references.

Nome | Sintaxe | Equivalente Lambda
---|---|---
Static | `RefType::staticMethod` | `(args) -> RefType.staticMethod(args)`
Bound | `expr::instanceMethod` | `(args) -> expr.instanceMethod(args)`
Unbound | `RefType::instanceMethod` | `(arg0, rest) -> arg0.instanceMethod(rest)`
Constructor | `ClassName::new` | `(args) -> new ClassName(args)`

### Neste tutorial

Sua Primeira Referência de Método Escrevendo Referências de Método Estático Escrevendo Referências de Método Desligado Escrevendo Referências de Método Ligado Escrevendo Referências de Método de Construtor Concluindo as Referências de Método

Última atualização: 26 de outubro de 2021

**Anterior na Série**

[Usando Expressões Lambda em Sua Aplicação](<#/doc/tutorials/lambdas/functional-interfaces>)

➜

**Tutorial Atual**

Escrevendo Expressões Lambda como Referências de Método

➜

**Próximo na Série**

[Combinando Expressões Lambda](<#/doc/tutorials/lambdas/combining-chaining-composing>)

**Anterior na Série:** [Usando Expressões Lambda em Sua Aplicação](<#/doc/tutorials/lambdas/functional-interfaces>)

**Próximo na Série:** [Combinando Expressões Lambda](<#/doc/tutorials/lambdas/combining-chaining-composing>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Lambda ](<#/doc/tutorials/lambdas>) > Escrevendo Expressões Lambda como Referências de Método