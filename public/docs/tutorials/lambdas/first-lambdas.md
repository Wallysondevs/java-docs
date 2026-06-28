# Escrevendo Sua Primeira Expressão Lambda

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Lambda ](<#/doc/tutorials/lambdas>) > Escrevendo Sua Primeira Expressão Lambda

**Tutorial Atual**

Escrevendo Sua Primeira Expressão Lambda

➜

**Próximo na Série**

[Usando Expressões Lambda em Sua Aplicação](<#/doc/tutorials/lambdas/functional-interfaces>)

**Próximo na Série:** [Usando Expressões Lambda em Sua Aplicação](<#/doc/tutorials/lambdas/functional-interfaces>)

# Escrevendo Sua Primeira Expressão Lambda

Em 2014, o Java SE 8 introduziu o conceito de expressões lambda. Se você se lembra dos dias anteriores ao lançamento do Java SE 8, então provavelmente se lembra do conceito de classes anônimas. E talvez você tenha ouvido que as expressões lambda são outra maneira, mais simples, de escrever instâncias de classes anônimas, em alguns casos específicos.

Se você não se lembra daqueles dias, então pode ter ouvido ou lido sobre classes anônimas, e provavelmente tem medo dessa sintaxe obscura.

Bem, a boa notícia é: você não precisa passar por classes anônimas para entender como escrever uma expressão lambda. Além disso, em muitos casos, graças à adição de lambdas à linguagem Java, você não precisa mais de classes anônimas.

Escrever uma expressão lambda se resume a entender três passos:

  * identificar o tipo da expressão lambda que você deseja escrever
  * encontrar o método certo para implementar
  * implementar este método.

Isso é realmente tudo o que há para saber. Vamos ver esses três passos em detalhes.

Se você está ansioso para praticar o uso de lambdas com coleções, pode pular diretamente para o final desta página: [Praticando o Uso de Lambdas em Coleções](<#/doc/tutorials/lambdas/first-lambdas>)

## Identificando o Tipo de uma Expressão Lambda

Tudo tem um tipo na linguagem Java, e esse tipo é conhecido em tempo de compilação. Portanto, é sempre possível encontrar o tipo de uma expressão lambda. Pode ser o tipo de uma variável, de um campo, de um parâmetro de método, ou o tipo de retorno de um método.

Existe uma restrição no tipo de uma expressão lambda: ela precisa ser uma interface funcional. Assim, uma classe anônima que não implementa uma interface funcional não pode ser escrita como uma expressão lambda.

A definição completa do que são interfaces funcionais é um pouco complexa. Tudo o que você precisa saber neste ponto é que uma interface funcional é uma interface que possui apenas um método _abstrato_.

Você deve estar ciente de que, a partir do Java SE 8, métodos concretos são permitidos em interfaces. Eles podem ser métodos de instância, nesse caso, são chamados de _métodos default_, e podem ser métodos estáticos. Esses métodos não contam, pois não são métodos _abstratos_.

> _Preciso adicionar a anotação [`@FunctionalInterface`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/FunctionalInterface.html>) em uma interface para torná-la funcional?_
>
> Não, você não precisa. Esta anotação está aqui para ajudar a garantir que sua interface seja de fato funcional. Se você colocar esta anotação em um tipo que não é uma interface funcional, o compilador gerará um erro.

### Exemplos de Interfaces Funcionais

Vamos ver alguns exemplos tirados da API do JDK. Acabamos de remover os comentários do código-fonte.

A interface [`Runnable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Runnable.html>) é de fato funcional, porque possui apenas um método abstrato. A anotação [`@FunctionalInterface`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/FunctionalInterface.html>) foi adicionada como um auxiliar, mas não é necessária.

A interface [`Consumer<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Consumer.html>) também é funcional: ela possui um método abstrato e um método default, concreto, que não conta. Mais uma vez, a anotação [`@FunctionalInterface`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/FunctionalInterface.html>) não é necessária.

A interface [`Predicate<T> `](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html>) é um pouco mais complexa, mas ainda é uma interface funcional:

  * ela possui um método abstrato
  * ela possui três métodos default que não contam
  * e ela possui dois métodos estáticos que também não contam.

## Encontrando o Método Certo para Implementar

Neste ponto, você identificou o tipo da expressão lambda que precisa escrever, e a boa notícia é: você fez a parte mais difícil: o resto é muito mecânico e mais fácil de fazer.

Uma expressão lambda é uma implementação do único método abstrato nesta interface funcional. Portanto, encontrar o método certo para implementar é apenas uma questão de encontrar este método.

Você pode levar um minuto para procurá-lo nos três exemplos do parágrafo anterior.

Para a interface [`Runnable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Runnable.html>) é:

```java
public interface Runnable {
    public abstract void run();
}
```

Para a interface [`Predicate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html>) é:

```java
public interface Predicate<T> {
    boolean test(T t);
    // other default and static methods
}
```

E para a interface [`Consumer<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Consumer.html>) é:

```java
public interface Consumer<T> {
    void accept(T t);
    // other default methods
}
```

## Implementando o Método Certo com uma Expressão Lambda

### Escrevendo uma Primeira Expressão Lambda que implementa `Predicate<String>`

Agora para a última parte: escrever a própria lambda. O que você precisa entender é que a expressão lambda que você está escrevendo é uma implementação do método abstrato que você encontrou. Usando a sintaxe da expressão lambda, você pode incorporar essa implementação de forma elegante em seu código.

Esta sintaxe é composta por três elementos:

  * um bloco de parâmetros;
  * um pequeno pedaço de arte ASCII representando uma seta: `->`. Note que Java usa _setas magras_ (`->`) e não _setas gordas_ (`=>`);
  * um bloco de código que é o corpo do método.

Vamos ver exemplos disso. Suponha que você precise de uma instância de um [`Predicate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html>) que retorne `true` para strings de caracteres que tenham exatamente 3 caracteres.

  1. O tipo da sua expressão lambda é [`Predicate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html>)
  2. O método que você precisa implementar é [`boolean test(String s)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html#test\(T\)>)

Então você escreve o bloco de parâmetros, que é uma simples cópia / cola da assinatura do método: `(String s)`.

Você então adiciona uma seta magra: `->`.

E o corpo do método. Seu resultado deve ser parecido com este:

```java
(String s) -> { return s.length() == 3; }
```

### Simplificando a Sintaxe

Esta sintaxe pode então ser simplificada, graças ao compilador que pode adivinhar muitas coisas para que você não precise escrevê-las.

Primeiro, o compilador sabe que você está implementando o método abstrato da interface [`Predicate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html>), e ele sabe que este método recebe uma [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) como argumento. Então `(String s)` pode ser simplificado para `(s)`. Nesse caso, onde há apenas um argumento, você pode ir um passo além removendo os parênteses. O bloco de argumentos então se torna `s`. Você deve manter os parênteses se tiver mais de um argumento, ou nenhum argumento.

Segundo, há apenas uma linha de código no corpo do método. Nesse caso, você não precisa das chaves nem da palavra-chave `return`.

Então a sintaxe final é, na verdade, a seguinte:

```java
s -> s.length() == 3
```

### Implementando um `Consumer<String>`

Em algum momento, as pessoas podem ser tentadas a pegar atalhos. Você ouvirá desenvolvedores dizendo "um consumer pega um objeto e não retorna nada". Ou "um predicate é verdadeiro quando a string tem exatamente três caracteres". Na maioria das vezes, há uma confusão entre a expressão lambda, o método abstrato que ela implementa e a interface funcional que contém esse método.

Mas como uma interface funcional, seu método abstrato e uma expressão lambda que a implementa estão tão intimamente ligados, essa forma de falar realmente faz todo o sentido. Então está tudo bem, desde que não leve a nenhuma ambiguidade.

Vamos escrever uma lambda que consome uma [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) e imprime em `System.out`. A sintaxe pode ser esta:

```java
s -> System.out.println(s)
```

Aqui escrevemos diretamente a versão simplificada da expressão lambda.

### Implementando um Runnable

Implementar um [`Runnable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Runnable.html>) se resume a escrever uma implementação de [`void run()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Runnable.html#run\(\)>). Este bloco de argumentos está vazio, então deve ser escrito com parênteses. Lembre-se: você pode omitir os parênteses apenas se tiver um argumento, aqui temos zero.

Então vamos escrever um runnable que nos diga que está sendo executado:

```java
() -> System.out.println("Running!")
```

## Chamando uma Expressão Lambda

Vamos voltar ao nosso exemplo anterior de [`Predicate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html>), e suponha que este predicate tenha sido definido em um método. Como você pode usá-lo para testar se uma dada string de caracteres tem de fato 3 caracteres de comprimento?

Bem, apesar da sintaxe que você usou para escrever uma lambda, você precisa ter em mente que esta lambda é uma instância da interface [`Predicate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html>). Esta interface define um método chamado [`test()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html#test\(T\)>) que recebe uma [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) e retorna um `boolean`.

Vamos escrever isso em um método:

```java
public class Lambda {
    public static void main(String[] args) {
        Predicate<String> p = s -> s.length() == 3;
        System.out.println(p.test("abc"));
        System.out.println(p.test("abcd"));
    }
}
```

A execução do código anterior imprime o seguinte.

```
true
false
```

Observe como você definiu o predicate, assim como fez no exemplo anterior. Como a interface [`Predicate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html>) define este método [`boolean test(String)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html#test\(T\)>), é perfeitamente legal chamar os métodos definidos em [`Predicate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html>) através de uma variável do tipo [`Predicate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html>). Isso pode parecer confuso no início, já que esta variável predicate não parece definir métodos.

Tenha paciência, existem maneiras muito melhores de escrever este código, que você verá mais tarde neste tutorial.

Então, toda vez que você escreve uma lambda, você pode chamar qualquer método definido na interface que esta lambda está implementando. Chamar o método abstrato invocará o código da sua própria lambda, já que esta lambda é uma implementação desse método. Chamar um método default invocará o código escrito na interface. Não há como uma lambda sobrescrever um método default.

## Capturando Valores Locais

Depois que você se acostuma com elas, escrever lambdas se torna muito natural. Elas estão muito bem integradas no Collections Framework, na Stream API e em muitos outros lugares no JDK. A partir do Java SE 8, as lambdas estão por toda parte, para o melhor.

Existem restrições no uso de lambdas e você pode encontrar erros de tempo de compilação que precisa entender.

Vamos considerar o seguinte código:

```java
public class Lambda {
    public static void main(String[] args) {
        int totalPrice = 0;
        Consumer<Integer> c = price -> totalPrice += price;
    }
}
```

Mesmo que este código possa parecer bom, tentar compilá-lo lhe dará o seguinte erro no uso de `totalPrice` nesta implementação de [`Consumer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Consumer.html>):

> Variable used in lambda expression should be final or effectively final

A razão é a seguinte: lambdas não podem modificar variáveis definidas fora de seu corpo. Elas podem lê-las, desde que sejam `final`, ou seja, imutáveis. Este processo de acesso a variáveis é chamado de _captura_: lambdas não podem _capturar_ variáveis, elas só podem _capturar_ valores. Uma variável final é, de fato, um valor.

Você notou que a mensagem de erro nos diz que a variável pode ser _final_, que é um conceito clássico na linguagem Java. Ela também nos diz que a variável pode ser _efetivamente final_. Esta noção foi introduzida no Java SE 8: mesmo que você não declare explicitamente uma variável `final`, o compilador pode fazer isso por você. Se ele perceber que esta variável é lida por uma lambda, e que você não a modifica, então ele adicionará a declaração `final` para você. Claro que isso é feito no código compilado, o compilador não modifica seu código-fonte. Tais variáveis não são chamadas de _final_; elas são chamadas de variáveis _efetivamente final_. Esta é uma característica muito útil.

## Serializando Lambdas

Expressões lambda foram construídas para que possam ser serializadas.

Por que você serializaria expressões lambda? Bem, uma expressão lambda pode ser armazenada em um campo, e este campo pode ser acessado através de um construtor ou de um método setter. Então você pode ter uma expressão lambda no estado do seu objeto em tempo de execução, sem estar ciente disso.

Assim, para preservar a compatibilidade retroativa com classes serializáveis existentes, serializar uma expressão lambda é possível.

## Praticando o Uso de Lambdas

### Experimentando Suas Primeiras Expressões Lambda

#### Praticando Consumers

```java
import java.util.function.Consumer;

public class Lambda {
    public static void main(String[] args) {
        Consumer<String> c = s -> System.out.println(s);
        c.accept("Hello, World!");
    }
}
```

A execução do código anterior imprime o seguinte.

```
Hello, World!
```

#### Praticando Suppliers

```java
import java.util.function.Supplier;

public class Lambda {
    public static void main(String[] args) {
        Supplier<String> s = () -> "Hello from a Supplier!";
        System.out.println(s.get());
    }
}
```

A execução do código anterior imprime o seguinte.

```
Hello from a Supplier!
```

#### Praticando Predicates

```java
import java.util.function.Predicate;

public class Lambda {
    public static void main(String[] args) {
        Predicate<String> p = s -> s.length() > 5;
        System.out.println(p.test("Java"));
        System.out.println(p.test("Programming"));
    }
}
```

A execução do código anterior imprime o seguinte.

```
false
true
```

#### Praticando Functions

```java
import java.util.function.Function;

public class Lambda {
    public static void main(String[] args) {
        Function<String, Integer> f = s -> s.length();
        System.out.println(f.apply("Lambda"));
    }
}
```

A execução do código anterior imprime o seguinte.

```
6
```

### Praticando o Uso de Lambdas em Coleções

#### Imprimindo o Conteúdo de uma Coleção com um Consumer

Você pode imprimir os elementos de uma coleção um por um usando um consumer.

```java
import java.util.List;
import java.util.Arrays;
import java.util.function.Consumer;

public class Lambda {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        Consumer<String> printName = name -> System.out.println(name);
        names.forEach(printName);
    }
}
```

A execução do código anterior imprime o seguinte.

```
Alice
Bob
Charlie
```

#### Transformando os Elementos de uma Coleção

Você pode modificar os elementos de uma coleção com uma função, desde que não altere o tipo desses elementos.

```java
import java.util.List;
import java.util.Arrays;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Lambda {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        Function<String, String> toUpperCase = s -> s.toUpperCase();
        List<String> upperCaseNames = names.stream()
                                           .map(toUpperCase)
                                           .collect(Collectors.toList());
        upperCaseNames.forEach(System.out::println);
    }
}
```

A execução do código anterior imprime o seguinte.

```
ALICE
BOB
CHARLIE
```

#### Removendo Elementos de uma Lista

Você pode remover seletivamente elementos de uma lista com um predicate.

```java
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.function.Predicate;

public class Lambda {
    public static void main(String[] args) {
        List<String> fruits = new ArrayList<>(Arrays.asList("Apple", "Banana", "Cherry", "Date"));
        Predicate<String> startsWithA = s -> s.startsWith("A");
        fruits.removeIf(startsWithA);
        fruits.forEach(System.out::println);
    }
}
```

A execução do código anterior imprime o seguinte.

```
Banana
Cherry
Date
```

## Mais Aprendizado

### Neste tutorial

Identificando o Tipo de uma Expressão Lambda
Encontrando o Método Certo para Implementar
Implementando o Método Certo com uma Expressão Lambda
Chamando uma Expressão Lambda
Capturando Valores Locais
Serializando Lambdas
Praticando o Uso de Lambdas
Mais Aprendizado

Última atualização: 26 de outubro de 2021

**Tutorial Atual**

Escrevendo Sua Primeira Expressão Lambda

➜

**Próximo na Série**

[Usando Expressões Lambda em Sua Aplicação](<#/doc/tutorials/lambdas/functional-interfaces>)

**Próximo na Série:** [Usando Expressões Lambda em Sua Aplicação](<#/doc/tutorials/lambdas/functional-interfaces>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Lambda ](<#/doc/tutorials/lambdas>) > Escrevendo Sua Primeira Expressão Lambda