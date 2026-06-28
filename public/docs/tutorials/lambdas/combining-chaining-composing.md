# Combinando Expressões Lambda

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Lambda ](<#/doc/tutorials/lambdas>) > Combinando Expressões Lambda

**Anterior na Série**

[Escrevendo Expressões Lambda como Referências de Método](<#/doc/tutorials/lambdas/method-references>)

➜

**Tutorial Atual**

Combinando Expressões Lambda

➜

**Próximo na Série**

[Escrevendo e Combinando Comparators](<#/doc/tutorials/lambdas/writing-comparators>)

**Anterior na Série:** [Escrevendo Expressões Lambda como Referências de Método](<#/doc/tutorials/lambdas/method-references>)

**Próximo na Série:** [Escrevendo e Combinando Comparators](<#/doc/tutorials/lambdas/writing-comparators>)

# Combinando Expressões Lambda

Você deve ter notado a presença de métodos default nas interfaces funcionais do pacote [`java.util.function`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/package-summary.html>). Esses métodos foram adicionados para permitir a combinação e o encadeamento de expressões lambda.

Por que você faria tal coisa? Simplesmente para ajudar você a escrever um código mais simples e legível.

## Encadeando Predicados com Métodos Default

Suponha que você precise processar uma lista de strings, para manter apenas as strings que não são nulas, não vazias e mais curtas que 5 caracteres. A forma como este problema é apresentado é a seguinte. Você tem três testes em uma determinada string:

  * não nula;
  * não vazia;
  * mais curta que 5 caracteres.

Cada um desses testes pode ser facilmente escrito com um predicado muito simples, de uma única linha. Também é possível combinar esses três testes em um único predicado. Ele se parecerá com este código:

```java
Predicate<String> nonNull = s -> s != null;
Predicate<String> nonEmpty = s -> !s.isEmpty();
Predicate<String> shorterThan5 = s -> s.length() < 5;

Predicate<String> p = nonNull.and(nonEmpty).and(shorterThan5);
```

Mas o JDK permite que você escreva este trecho de código dessa forma:

```java
Predicate<String> p = s -> s != null && !s.isEmpty() && s.length() < 5;
```

Esconder a complexidade técnica e expor a intenção do código é o que significa combinar expressões lambda.

Como este código é implementado no nível da API? Sem aprofundar muito nos detalhes, o que você pode ver é o seguinte:

  * `and()` é um método
  * Ele é chamado em uma instância de [`Predicate<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html>): é, portanto, um método de instância
  * Ele recebe outro [`Predicate<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html>) como argumento
  * Ele retorna um [`Predicate<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html>)

Como apenas um método abstrato é permitido em uma interface funcional, este método `and()` precisa ser um método default. Assim, do ponto de vista do design da API, você tem todos os elementos necessários para criar este método. A boa notícia é: a interface [`Predicate<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html>) possui um método default [`and()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html#and\(java.util.function.Predicate\)>), então você não precisa fazê-lo sozinho.

A propósito, também existe um método [`or()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html#or\(java.util.function.Predicate\)>) que recebe outro predicado como argumento, e também um método [`negate()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html#negate\(\)>) que não recebe nada.

Usando estes, você pode escrever o exemplo anterior desta forma:

```java
Predicate<String> p = nonNull.and(nonEmpty).and(shorterThan5);
```

Mesmo que este exemplo possa estar forçando um pouco os limites, você pode melhorar drasticamente a expressividade do seu código aproveitando as referências de método e os métodos default.

## Criando Predicados com Métodos de Fábrica

A expressividade pode ser levada um passo adiante usando métodos de fábrica definidos em interfaces funcionais. Existem dois deles na interface [`Predicate<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html>).

No exemplo a seguir, o predicado `isEqualToDuke` testa uma string de caracteres. O teste é verdadeiro quando a string testada é igual a "Duke". Este método de fábrica pode criar predicados para qualquer tipo de objeto.

```java
Predicate<String> isEqualToDuke = Predicate.isEqual("Duke");
```

O segundo método de fábrica nega o predicado dado como argumento.

```java
Predicate<String> isNotEqualToDuke = Predicate.not(isEqualToDuke);
```

## Encadeando Consumidores com Métodos Default

A interface [`Consumer<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Consumer.html>) também possui um método para encadear consumidores. Você pode encadear consumidores com o seguinte padrão:

```java
Consumer<String> log = s -> System.out.println("Logging: " + s);
Consumer<String> print = System.out::println;

Consumer<String> printAndLog = log.andThen(print);
```

Neste exemplo, `printAndLog` é um consumidor que primeiro passará a mensagem para o consumidor `log` e depois a passará para o consumidor `print`.

## Encadeando e Compondo Funções com Métodos Default

A diferença entre encadear e compor é um pouco sutil. O resultado de ambas as operações é, de fato, o mesmo. O que é diferente é a forma como você as escreve.

Suponha que você tenha duas funções `f1` e `f2`. Você pode encadeá-las chamando [[`f1.andThen(f2)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html#andThen\(java.util.function.Function\)>). Aplicar a função resultante a um objeto passará primeiro este objeto para `f1` e o resultado para `f2`.

A interface `Function` possui um segundo método default: [`f2.compose(f1)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html#compose\(java.util.function.Function\)>). Escrita desta forma, a função resultante processará primeiro um objeto passando-o para a função `f1` e então o resultado é passado para `f2`.

O que você precisa perceber é que, para obter a mesma função resultante, você precisa chamar [`andThen()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html#andThen\(java.util.function.Function\)>) em `f1` ou [`compose()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html#compose\(java.util.function.Function\)>) em `f2`.

Você pode encadear ou compor funções de diferentes tipos. Existem restrições óbvias, no entanto: o tipo do resultado produzido por `f1` deve ser compatível com o tipo consumido por `f2`.

## Criando uma Função de Identidade

A interface [`Function<T, R>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html>) também possui um método de fábrica para criar a função de identidade, chamado [`identity()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Function.html#identity\(\)>).

A criação da função de identidade pode, portanto, ser feita usando o seguinte padrão simples:

```java
Function<String, String> identity = Function.identity();
```

Este padrão é aplicável para qualquer tipo válido.

### Neste tutorial

Encadeando Predicados com Métodos Default Criando Predicados com Métodos de Fábrica Encadeando Consumidores com Métodos Default Encadeando e Compondo Funções com Métodos Default Criando uma Função de Identidade

Última atualização: 26 de outubro de 2021

**Anterior na Série**

[Escrevendo Expressões Lambda como Referências de Método](<#/doc/tutorials/lambdas/method-references>)

➜

**Tutorial Atual**

Combinando Expressões Lambda

➜

**Próximo na Série**

[Escrevendo e Combinando Comparators](<#/doc/tutorials/lambdas/writing-comparators>)

**Anterior na Série:** [Escrevendo Expressões Lambda como Referências de Método](<#/doc/tutorials/lambdas/method-references>)

**Próximo na Série:** [Escrevendo e Combinando Comparators](<#/doc/tutorials/lambdas/writing-comparators>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Lambda ](<#/doc/tutorials/lambdas>) > Combinando Expressões Lambda