# Wildcards

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Genéricos ](<#/doc/tutorials/generics>) > Wildcards 

**Anterior na Série**

[Inferência de Tipo](<#/doc/tutorials/generics/type-inference>)

➜

**Tutorial Atual**

Wildcards

➜

**Próximo na Série**

[Apagamento de Tipo](<#/doc/tutorials/generics/type-erasure>)

**Anterior na Série:** [Inferência de Tipo](<#/doc/tutorials/generics/type-inference>)

**Próximo na Série:** [Apagamento de Tipo](<#/doc/tutorials/generics/type-erasure>)

# Wildcards

 

## Wildcards de Limite Superior

Você pode usar um wildcard de limite superior para relaxar as restrições em uma variável. Por exemplo, digamos que você queira escrever um método que funcione em `List<Integer>`, `List<Double>` e `List<Number>`; você pode conseguir isso usando um wildcard de limite superior.

Para declarar um wildcard de limite superior, use o caractere wildcard ('`?`'), seguido pela palavra-chave `extends`, seguida pelo seu limite superior. Observe que, neste contexto, `extends` é usado em um sentido geral para significar tanto "`extends`" (como em classes) quanto "`implements`" (como em interfaces).

Para escrever o método que funciona em listas de [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>) e os subtipos de [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>), como [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>), [`Double`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Double.html>) e [`Float`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Float.html>), você especificaria `List<? extends Number>`. O termo `List<Number>` é mais restritivo do que `List<? extends Number>` porque o primeiro corresponde a uma lista do tipo [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>) apenas, enquanto o último corresponde a uma lista do tipo [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>) ou qualquer uma de suas subclasses.

Considere o seguinte método `process`:

```java
public static void process(List<Number> list) { /* ... */ }
```

O wildcard de limite superior, `<? extends Foo>`, onde `Foo` é qualquer tipo, corresponde a `Foo` e a qualquer subtipo de `Foo`. O método `process` pode acessar os elementos da lista como tipo `Foo`:

```java
public static void process(List<? extends Foo> list) {
    for (Foo elem : list) {
        // ...
    }
}
```

Na cláusula `foreach`, a variável `elem` itera sobre cada elemento na lista. Qualquer método definido na classe `Foo` pode agora ser usado em `elem`.

O método `sumOfList()` retorna a soma dos números em uma lista:

```java
public static double sumOfList(List<? extends Number> list) {
    double s = 0.0;
    for (Number n : list)
        s += n.doubleValue();
    return s;
}
```

O código a seguir, usando uma lista de objetos [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>), imprime `sum = 6.0`:

```java
List<Integer> li = Arrays.asList(1, 2, 3);
System.out.println("sum = " + sumOfList(li));
```

Uma lista de valores [`Double`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Double.html>) pode usar o mesmo método `sumOfList()`. O código a seguir imprime `sum = 7.0`:

```java
List<Double> ld = Arrays.asList(1.2, 2.3, 3.5);
System.out.println("sum = " + sumOfList(ld));
```

 

## Wildcards Ilimitados

O tipo wildcard ilimitado é especificado usando o caractere wildcard (`?`), por exemplo, `List<?>`. Isso é chamado de lista de tipo desconhecido. Existem dois cenários onde um wildcard ilimitado é uma abordagem útil:

  * Se você está escrevendo um método que pode ser implementado usando funcionalidades fornecidas na classe [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>).
  * Quando o código está usando métodos na classe genérica que não dependem do parâmetro de tipo. Por exemplo, [`List.size()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#size\(\)>) ou [`List.clear()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#clear\(\)>). Na verdade, `Class<?>` é tão frequentemente usado porque a maioria dos métodos em `Class<T>` não dependem de `T`.

Considere o seguinte método, `printList()`:

```java
public static void printList(List<Object> list) {
    for (Object elem : list)
        System.out.println(elem + " ");
    System.out.println();
}
```

O objetivo de `printList()` é imprimir uma lista de qualquer tipo, mas ele falha em atingir esse objetivo — ele imprime apenas uma lista de instâncias de [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>); ele não pode imprimir `List<Integer>`, `List<String>`, `List<Double>`, e assim por diante, porque eles não são subtipos de `List<Object>`. Para escrever um método `printList()` genérico, use `List<?>`:

```java
public static void printList(List<?> list) {
    for (Object elem: list)
        System.out.print(elem + " ");
    System.out.println();
}
```

Como para qualquer tipo concreto `A`, `List<A>` é um subtipo de `List<?>`, você pode usar `printList()` para imprimir uma lista de qualquer tipo:

```java
List<Integer> li = Arrays.asList(1, 2, 3);
List<String>  ls = Arrays.asList("one", "two", "three");
printList(li);
printList(ls);
```

> Nota: O método `Arrays.asList()` é usado em exemplos ao longo desta seção. Este método de fábrica estático converte o array especificado e retorna uma lista de tamanho fixo.

É importante notar que `List<Object>` e `List<?>` não são a mesma coisa. Você pode inserir um [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>), ou qualquer subtipo de [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>), em um `List<Object>`. Mas você só pode inserir `null` em um `List<?>`. O parágrafo [Diretrizes para o Uso de Wildcards](#guidelines) no final desta seção tem mais informações sobre como determinar que tipo de wildcard, se houver, deve ser usado em uma dada situação.

 

## Wildcards de Limite Inferior

A seção [Wildcards de Limite Superior](#upper-bounded-wildcards) mostra que um wildcard de limite superior restringe o tipo desconhecido a ser um tipo específico ou um subtipo desse tipo e é representado usando a palavra-chave `extends`. De forma semelhante, um wildcard de limite inferior restringe o tipo desconhecido a ser um tipo específico ou um supertipo desse tipo.

Um wildcard de limite inferior é expresso usando o caractere wildcard ('`?`'), seguido pela palavra-chave `super`, seguida pelo seu limite inferior: `<? super A>`.

> Nota: Você pode especificar um limite superior para um wildcard, ou pode especificar um limite inferior, mas não pode especificar ambos.

Digamos que você queira escrever um método que coloque objetos [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) em uma lista. Para maximizar a flexibilidade, você gostaria que o método funcionasse em `List<Integer>`, `List<Number>` e `List<Object>` — qualquer coisa que possa conter valores [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>).

Para escrever o método que funciona em listas de [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) e os supertipos de [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>), como [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>), [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>) e [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>), você especificaria `List<? super Integer>`. O termo `List<Integer>` é mais restritivo do que `List<? super Integer>` porque o primeiro corresponde a uma lista do tipo [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) apenas, enquanto o último corresponde a uma lista de qualquer tipo que seja um supertipo de [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>).

O código a seguir adiciona os números de 1 a 10 ao final de uma lista:

```java
public static void addNumbers(List<? super Integer> list) {
    for (int i = 1; i <= 10; i++) {
        list.add(i);
    }
}
```

O parágrafo [Diretrizes para o Uso de Wildcards](#guidelines) no final desta seção fornece orientação sobre quando usar wildcards de limite superior e quando usar wildcards de limite inferior.

 

## Wildcards e Subtipagem

Conforme descrito em seções anteriores, classes ou interfaces genéricas não estão relacionadas meramente porque existe uma relação entre seus tipos. No entanto, você pode usar wildcards para criar uma relação entre classes ou interfaces genéricas.

Dadas as duas classes regulares (não genéricas) a seguir:

```java
class A { /* ... */ }
class B extends A { /* ... */ }
```

Seria razoável escrever o seguinte código:

```java
A a = new A();
B b = new B();
a = b;   // OK
```

Este exemplo mostra que a herança de classes regulares segue esta regra de subtipagem: a classe `B` é um subtipo da classe `A` se `B` estende `A`. Esta regra não se aplica a tipos genéricos:

```java
List<A> la = new ArrayList<>();
List<B> lb = new ArrayList<>();
la = lb;   // Erro de compilação
```

Dado que [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) é um subtipo de [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>), qual é a relação entre `List<Integer>` e `List<Number>`?

```java
// A common parent parameterized lists.
```

Embora [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) seja um subtipo de [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>), `List<Integer>` não é um subtipo de `List<Number>` e, de fato, esses dois tipos não estão relacionados. O pai comum de `List<Number>` e `List<Integer>` é `List<?>`.

Para criar uma relação entre essas classes para que o código possa acessar os métodos de [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>) através dos elementos de `List<Integer>`, use um wildcard de limite superior:

```java
List<? extends Number> numList = new ArrayList<Integer>();
```

Como [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) é um subtipo de [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>), e `numList` é uma lista de objetos [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>), uma relação agora existe entre `intList` (uma lista de objetos [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>)) e `numList`. O diagrama a seguir mostra as relações entre várias classes `List` declaradas com wildcards de limite superior e inferior.

```java
// A hierarchy of several generic List class declarations.
```

Seguindo as mesmas regras, um `List<? extends Number>` pode ser estendido por uma lista de qualquer tipo que seja uma extensão de `Number`, incluindo o próprio `Number`, conforme mostrado no diagrama a seguir. 

```java
// A list of Number extends a list of ? extends Number.
```

E o mesmo vale para a relação entre `List<? super Integer>` e `List<Integer>`. 

```java
// A list of Integer extends a list of ? super Integer.
```

O parágrafo [Diretrizes para o Uso de Wildcards](#guidelines) no final desta seção tem mais informações sobre as ramificações do uso de wildcards de limite superior e inferior.

 

## Captura de Wildcard e Métodos Auxiliares

Em alguns casos, o compilador infere o tipo de um wildcard. Por exemplo, uma lista pode ser definida como `List<?>` mas, ao avaliar uma expressão, o compilador infere um tipo particular a partir do código. Este cenário é conhecido como captura de wildcard.

Na maioria das vezes, você não precisa se preocupar com a captura de wildcard, exceto quando você vê uma mensagem de erro que contém a frase "capture of".

O exemplo `WildcardError` produz um erro de captura quando compilado:

```java
import java.util.List;

public class WildcardError {

    void foo(List<?> i) {
        i.set(0, i.get(0)); // Erro de compilação
    }
}
```

Neste exemplo, o compilador processa o parâmetro de entrada `i` como sendo do tipo [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>). Quando o método `foo` invoca [`List.set(int, E)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#set\(int,E\)>), o compilador não consegue confirmar o tipo de objeto que está sendo inserido na lista, e um erro é produzido. Quando este tipo de erro ocorre, geralmente significa que o compilador acredita que você está atribuindo o tipo errado a uma variável. Genéricos foram adicionados à linguagem Java por esta razão — para impor a segurança de tipo em tempo de compilação.

O exemplo `WildcardError` gera o seguinte erro quando compilado pela implementação `javac` do JDK 7 da Oracle:

```
WildcardError.java:5: error: incompatible types: Object cannot be converted to CAP#1
        i.set(0, i.get(0));
                   ^
  where CAP#1 is a fresh type-variable:
    CAP#1 extends Object from capture of ?
1 error
```

Neste exemplo, o código está tentando realizar uma operação segura, então como você pode contornar o erro do compilador? Você pode corrigi-lo escrevendo um método auxiliar privado que captura o wildcard. Neste caso, você pode contornar o problema criando o método auxiliar privado, `fooHelper()`, conforme mostrado em `WildcardFixed`:

```java
import java.util.List;

public class WildcardFixed {

    void foo(List<?> i) {
        fooHelper(i);
    }

    // Método auxiliar para capturar o wildcard
    private <T> void fooHelper(List<T> l) {
        l.set(0, l.get(0));
    }
}
```

Graças ao método auxiliar, o compilador usa inferência para determinar que `T` é `CAP#1`, a variável de captura, na invocação. O exemplo agora compila com sucesso.

Por convenção, os métodos auxiliares geralmente são nomeados `originalMethodNameHelper()`.

Agora considere um exemplo mais complexo, `WildcardErrorBad`:

```java
import java.util.List;

public class WildcardErrorBad {

    void swapFirst(List<? extends Number> list1, List<? extends Number> list2) {
      Number temp = list1.get(0);
      list1.set(0, list2.get(0)); // Erro de compilação
      list2.set(0, temp);        // Erro de compilação
    }
}
```

Neste exemplo, o código está tentando uma operação insegura. Por exemplo, considere a seguinte invocação do método `swapFirst()`:

```java
List<Integer> li = Arrays.asList(1,2,3);
List<Double>  ld = Arrays.asList(10.10,20.20,30.30);
swapFirst(li, ld);
```

Embora `List<Integer>` e `List<Double>` ambos satisfaçam os critérios de `List<? extends Number>`, é claramente incorreto pegar um item de uma lista de valores [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) e tentar colocá-lo em uma lista de valores [`Double`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Double.html>).

Compilar o código com o compilador `javac` do JDK da Oracle produz o seguinte erro:

```
WildcardErrorBad.java:6: error: incompatible types: Number cannot be converted to CAP#1
      list1.set(0, list2.get(0));
                     ^
  where CAP#1 is a fresh type-variable:
    CAP#1 extends Number from capture of ? extends Number
WildcardErrorBad.java:7: error: incompatible types: Number cannot be converted to CAP#2
      list2.set(0, temp);
                     ^
  where CAP#2 is a fresh type-variable:
    CAP#2 extends Number from capture of ? extends Number
2 errors
```

Não há método auxiliar para contornar o problema, porque o código está fundamentalmente errado: é claramente incorreto pegar um item de uma lista de valores [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) e tentar colocá-lo em uma lista de valores [`Double`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Double.html>).

 

## Diretrizes para o Uso de Wildcards

Um dos aspectos mais confusos ao aprender a programar com genéricos é determinar quando usar um wildcard de limite superior e quando usar um wildcard de limite inferior. Esta página fornece algumas diretrizes a seguir ao projetar seu código.

Para fins desta discussão, é útil pensar nas variáveis como fornecendo uma de duas funções:

  * Uma Variável "In". Uma variável "in" fornece dados ao código. Imagine um método de cópia com dois argumentos: `copy(src, dest)`. O argumento `src` fornece os dados a serem copiados, então é o parâmetro "in".
  * Uma Variável "Out". Uma variável "out" contém dados para uso em outro lugar. No exemplo de cópia, `copy(src, dest)`, o argumento `dest` aceita dados, então é o parâmetro "out".

Claro, algumas variáveis são usadas tanto para fins "in" quanto "out" — este cenário também é abordado nas diretrizes.

Você pode usar o princípio "in" e "out" ao decidir se deve usar um wildcard e que tipo de wildcard é apropriado. A lista a seguir fornece as diretrizes a seguir:

  * Uma variável "in" é definida com um wildcard de limite superior, usando a palavra-chave `extends`.
  * Uma variável "out" é definida com um wildcard de limite inferior, usando a palavra-chave `super`.
  * No caso em que a variável "in" pode ser acessada usando métodos definidos na classe [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>), use um wildcard ilimitado.
  * No caso em que o código precisa acessar a variável como uma variável "in" e "out", não use um wildcard.

Estas diretrizes não se aplicam ao tipo de retorno de um método. O uso de um wildcard como tipo de retorno deve ser evitado porque força os programadores que usam o código a lidar com wildcards.

Uma lista definida por `List<? extends ...>` pode ser informalmente considerada como somente leitura, mas isso não é uma garantia estrita. Suponha que você tenha as duas classes a seguir:

```java
class NaturalNumber {
    private int i;
    public NaturalNumber(int i) { this.i = i; }
    // ...
}

class EvenNumber extends NaturalNumber {
    public EvenNumber(int i) { super(i); }
    // ...
}
```

Considere o seguinte código:

```java
List<EvenNumber> le = new ArrayList<>();
List<? extends NaturalNumber> ln = le;
ln.add(new NaturalNumber(35));  // Erro de compilação
```

Como `List<EvenNumber>` é um subtipo de `List<? extends NaturalNumber>`, você pode atribuir `le` a `ln`. Mas você não pode usar `ln` para adicionar um número natural a uma lista de números pares. As seguintes operações na lista são possíveis:

  * Você pode adicionar `null`.
  * Você pode invocar [`clear()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#clear\(\)>).
  * Você pode obter o iterador e invocar [`remove()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#remove\(java.lang.Object\)>).
  * Você pode capturar o wildcard e escrever elementos que você leu da lista.

Você pode ver que a lista definida por `List<? extends NaturalNumber>` não é somente leitura no sentido mais estrito da palavra, mas você pode pensar nela dessa forma porque você não pode armazenar um novo elemento ou alterar um elemento existente na lista.

### Neste tutorial

Wildcards de Limite Superior Wildcards Ilimitados Wildcards de Limite Inferior Wildcards e Subtipagem Captura de Wildcard e Métodos Auxiliares Diretrizes para o Uso de Wildcards

  


Última atualização: 14 de setembro de 2021

  


**Anterior na Série**

[Inferência de Tipo](<#/doc/tutorials/generics/type-inference>)

➜

**Tutorial Atual**

Wildcards

➜

**Próximo na Série**

[Apagamento de Tipo](<#/doc/tutorials/generics/type-erasure>)

**Anterior na Série:** [Inferência de Tipo](<#/doc/tutorials/generics/type-inference>)

**Próximo na Série:** [Apagamento de Tipo](<#/doc/tutorials/generics/type-erasure>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Genéricos ](<#/doc/tutorials/generics>) > Wildcards