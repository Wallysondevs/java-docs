# Introduzindo Generics

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Generics ](<#/doc/tutorials/generics>) > Introduzindo Generics 

**Tutorial Atual**

Introduzindo Generics

➜

**Próximo na Série**

[Inferência de Tipo](<#/doc/tutorials/generics/type-inference>)

**Próximo na Série:** [Inferência de Tipo](<#/doc/tutorials/generics/type-inference>)

# Introduzindo Generics

 

## Por Que Usar Generics?

Em poucas palavras, generics permitem que tipos (classes e interfaces) sejam parâmetros ao definir classes, interfaces e métodos. Assim como os parâmetros formais mais familiares usados em declarações de métodos, os parâmetros de tipo fornecem uma maneira de reutilizar o mesmo código com diferentes entradas. A diferença é que as entradas para parâmetros formais são valores, enquanto as entradas para parâmetros de tipo são tipos.

O código que usa generics tem muitos benefícios em relação ao código não genérico:

  * Verificações de tipo mais fortes em tempo de compilação. Um compilador Java aplica verificação de tipo forte ao código genérico e emite erros se o código violar a segurança de tipo. Corrigir erros em tempo de compilação é mais fácil do que corrigir erros em tempo de execução, que podem ser difíceis de encontrar.

  * Eliminação de casts. O seguinte trecho de código sem generics requer casting:

```java
List list = new ArrayList();
list.add("hello");
String s = (String) list.get(0);
```

Quando reescrito para usar generics, o código não requer casting:

```java
List<String> list = new ArrayList<String>();
list.add("hello");
String s = list.get(0);   // no cast
```

  * Permitir que programadores implementem algoritmos genéricos. Usando generics, os programadores podem implementar algoritmos genéricos que funcionam em coleções de diferentes tipos, podem ser personalizados e são seguros em termos de tipo e mais fáceis de ler.

 

## Tipos Genéricos

### Uma Classe Box Simples

Um tipo _genérico_ é uma classe ou interface genérica que é parametrizada por tipos. A seguinte classe `Box` será modificada para demonstrar o conceito.

```java
public class Box {
    private Object object;

    public void set(Object object) { this.object = object; }
    public Object get() { return object; }
}
```

Como seus métodos aceitam ou retornam um [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>), você está livre para passar o que quiser, desde que não seja um dos tipos primitivos. Não há como verificar, em tempo de compilação, como a classe é usada. Uma parte do código pode colocar um [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) na caixa e esperar obter objetos do tipo [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) dela, enquanto outra parte do código pode, por engano, passar uma [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>), resultando em um erro em tempo de execução.

### Uma Versão Genérica da Classe Box

Uma _classe genérica_ é definida com o seguinte formato:

```java
class name<T1, T2, ..., Tn> { /* ... */ }
```

A seção de parâmetros de tipo, delimitada por colchetes angulares (`<>`), segue o nome da classe. Ela especifica os parâmetros de tipo (também chamados de variáveis de tipo) `T1`, `T2`, ..., e `Tn`.

Para atualizar a classe `Box` para usar generics, você cria uma declaração de tipo genérico alterando o código "`public class Box`" para "`public class Box<T>`". Isso introduz a variável de tipo, `T`, que pode ser usada em qualquer lugar dentro da classe.

Com essa mudança, a classe `Box` se torna:

```java
/**
 * Generic version of the Box class.
 * @param <T> the type of value stored in this box
 */
public class Box<T> {
    // T stands for "Type"
    private T t;

    public void set(T t) { this.t = t; }
    public T get() { return t; }
}
```

Como você pode ver, todas as ocorrências de [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>) são substituídas por `T`. Uma variável de tipo pode ser qualquer tipo não primitivo que você especificar: qualquer tipo de classe, qualquer tipo de interface, qualquer tipo de array ou até mesmo outra variável de tipo.

Essa mesma técnica pode ser aplicada para criar interfaces genéricas.

### Convenções de Nomenclatura de Parâmetros de Tipo

Por convenção, os nomes dos parâmetros de tipo são letras maiúsculas únicas. Isso contrasta fortemente com as convenções de nomenclatura de variáveis que você já conhece, e por um bom motivo: sem essa convenção, seria difícil diferenciar entre uma variável de tipo e um nome de classe ou interface comum.

Os nomes de parâmetros de tipo mais comumente usados são:

  * E - Elemento (usado extensivamente pelo Java Collections Framework)

  * K - Chave

  * N - Número

  * T - Tipo

  * V - Valor

  * S, U, V etc. - 2º, 3º, 4º tipos

  * Você verá esses nomes usados em toda a API Java SE e no restante desta seção.

### Invocando e Instanciando um Tipo Genérico

Para referenciar a classe genérica `Box` de dentro do seu código, você deve realizar uma invocação de tipo genérico, que substitui `T` por algum valor concreto, como [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>):

```java
Box<Integer> integerBox;
```

Você pode pensar em uma invocação de tipo genérico como sendo semelhante a uma invocação de método comum, mas em vez de passar um argumento para um método, você está passando um argumento de tipo — [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) neste caso — para a própria classe `Box`.

> _Terminologia de Parâmetro de Tipo e Argumento de Tipo_ : Muitos desenvolvedores usam os termos "parâmetro de tipo" e "argumento de tipo" de forma intercambiável, mas esses termos não são os mesmos. Ao codificar, um fornece argumentos de tipo para criar um tipo parametrizado. Portanto, o `T` em `Foo<T>` é um parâmetro de tipo e o [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) em `Foo<String> f` é um argumento de tipo. Esta seção observa esta definição ao usar esses termos.

Como qualquer outra declaração de variável, este código não cria realmente um novo objeto `Box`. Ele simplesmente declara que `integerBox` manterá uma referência a uma "Box de Integer", que é como `Box<Integer>` é lido.

Uma invocação de um tipo genérico é geralmente conhecida como um tipo parametrizado.

Para instanciar esta classe, use a palavra-chave `new`, como de costume, mas coloque `<Integer>` entre o nome da classe e os parênteses:

```java
Box<Integer> integerBox = new Box<Integer>();
```

### O Diamond

No Java SE 7 e posterior, você pode substituir os argumentos de tipo necessários para invocar o construtor de uma classe genérica por um conjunto vazio de argumentos de tipo (`<>`), desde que o compilador possa determinar, ou inferir, os argumentos de tipo a partir do contexto. Este par de colchetes angulares, `<>`, é informalmente chamado de diamond. Por exemplo, você pode criar uma instância de `Box<Integer>` com a seguinte instrução:

```java
Box<Integer> integerBox = new Box<>();
```

Para mais informações sobre a notação diamond e inferência de tipo, consulte a seção Inferência de Tipo deste tutorial.

### Múltiplos Parâmetros de Tipo

Como mencionado anteriormente, uma classe genérica pode ter múltiplos parâmetros de tipo. Por exemplo, a classe genérica `OrderedPair`, que implementa a interface genérica `Pair`:

```java
public interface Pair<K, V> {
    public K getKey();
    public V getValue();
}

public class OrderedPair<K, V> implements Pair<K, V> {

    private K key;
    private V value;

    public OrderedPair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey()   { return key; }
    public V getValue() { return value; }
}
```

As seguintes instruções criam duas instanciações da classe `OrderedPair`:

```java
Pair<String, Integer> p1 = new OrderedPair<String, Integer>("Even", 8);
Pair<String, String>  p2 = new OrderedPair<String, String>("hello", "world");
```

O código, `new OrderedPair<String, Integer>()`, instancia `K` como um [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) e `V` como um [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>). Portanto, os tipos de parâmetro do construtor de `OrderedPair` são [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) e [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>), respectivamente. Devido ao autoboxing, é válido passar uma [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) e um `int` para a classe.

Como mencionado na seção O Diamond, como um compilador Java pode inferir os tipos `K` e `V` da declaração `OrderedPair<String, Integer>`, essas instruções podem ser encurtadas usando a notação diamond:

```java
OrderedPair<String, Integer> p1 = new OrderedPair<>("Even", 8);
OrderedPair<String, String>  p2 = new OrderedPair<>("hello", "world");
```

Para criar uma interface genérica, siga as mesmas convenções de criação de uma classe genérica.

### Tipos Parametrizados

Você também pode substituir um parâmetro de tipo (ou seja, `K` ou `V`) por um tipo parametrizado, ou seja, [`List<String>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>). Por exemplo, usando o exemplo `OrderedPair<K, V>`:

```java
OrderedPair<String, List<String>> p = new OrderedPair<>("Days", Arrays.asList("Monday", "Tuesday", "Wednesday"));
```

 

## Tipos Brutos

Um _tipo bruto_ é o nome de uma classe ou interface genérica sem quaisquer argumentos de tipo. Por exemplo, dada a classe genérica `Box`:

```java
public class Box<T> {
    public void set(T t) { /* ... */ }
    // ...
}
```

Para criar um tipo parametrizado de `Box<T>`, você fornece um argumento de tipo real para o parâmetro de tipo formal `T`:

```java
Box<Integer> intBox = new Box<>();
```

Se o argumento de tipo real for omitido, você cria um tipo bruto de `Box<T>`:

```java
Box rawBox = new Box();
```

Portanto, `Box` é o tipo bruto do tipo genérico `Box<T>`. No entanto, uma classe ou tipo de interface não genérica não é um tipo bruto.

Tipos brutos aparecem em código legado porque muitas classes de API (como as classes Collections) não eram genéricas antes do JDK 5.0. Ao usar tipos brutos, você essencialmente obtém o comportamento pré-generics — uma Box lhe dá Objects. Para compatibilidade com versões anteriores, a atribuição de um tipo parametrizado ao seu tipo bruto é permitida:

```java
Box<String> stringBox = new Box<>();
Box rawBox = stringBox;               // OK
```

Mas se você atribuir um tipo bruto a um tipo parametrizado, você receberá um aviso:

```java
Box rawBox = new Box();           // rawBox is a raw type of Box<T>
Box<Integer> intBox = rawBox;     // warning: unchecked conversion
```

Você também receberá um aviso se usar um tipo bruto para invocar métodos genéricos definidos no tipo genérico correspondente:

```java
Box rawBox = new Box();
rawBox.set(8);  // warning: unchecked invocation to set(T)
```

O aviso mostra que os tipos brutos ignoram as verificações de tipo genéricas, adiando a detecção de código inseguro para o tempo de execução. Portanto, você deve evitar o uso de tipos brutos.

A seção Type Erasure tem mais informações sobre como o compilador Java usa tipos brutos.

### Mensagens de Erro Não Verificadas

Como mencionado anteriormente, ao misturar código legado com código genérico, você pode encontrar mensagens de aviso semelhantes às seguintes:

```
Note: Example.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
```

Isso pode acontecer ao usar uma API mais antiga que opera em tipos brutos, como mostrado no exemplo a seguir:

```java
public class Test {
    public static void main(String[] args) {
        Box<Integer> bi;
        bi = createBox();
    }

    static Box createBox() {
        return new Box();
    }
}
```

O termo "não verificado" significa que o compilador não tem informações de tipo suficientes para realizar todas as verificações de tipo necessárias para garantir a segurança de tipo. O aviso "não verificado" é desativado, por padrão, embora o compilador dê uma dica. Para ver todos os avisos "não verificados", recompile com `-Xlint:unchecked`.

Recompilar o exemplo anterior com `-Xlint:unchecked` revela as seguintes informações adicionais:

```
Test.java:5: warning: [unchecked] unchecked conversion
found   : Box
required: Box<java.lang.Integer>
        bi = createBox();
             ^
1 warning
```

Para desativar completamente os avisos não verificados, use a flag `-Xlint:-unchecked`. A anotação [`@SuppressWarnings("unchecked")`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/SuppressWarnings.html>) suprime avisos não verificados. Se você não está familiarizado com a sintaxe [`@SuppressWarnings`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/SuppressWarnings.html>), consulte a seção Anotações.

 

## Métodos Genéricos

_Métodos genéricos_ são métodos que introduzem seus próprios parâmetros de tipo. Isso é semelhante a declarar um tipo genérico, mas o escopo do parâmetro de tipo é limitado ao método onde ele é declarado. Métodos genéricos estáticos e não estáticos são permitidos, assim como construtores de classes genéricas.

A sintaxe para um método genérico inclui uma lista de parâmetros de tipo, dentro de colchetes angulares, que aparece antes do tipo de retorno do método. Para métodos genéricos estáticos, a seção de parâmetros de tipo deve aparecer antes do tipo de retorno do método.

A classe `Util` inclui um método genérico, compare, que compara dois objetos `Pair`:

```java
public class Util {
    public static <K, V> boolean compare(Pair<K, V> p1, Pair<K, V> p2) {
        return p1.getKey().equals(p2.getKey()) &&
               p1.getValue().equals(p2.getValue());
    }
}
```

A sintaxe completa para invocar este método seria:

```java
Pair<Integer, String> p1 = new OrderedPair<Integer, String>(1, "apple");
Pair<Integer, String> p2 = new OrderedPair<Integer, String>(2, "pear");
boolean same = Util.<Integer, String>compare(p1, p2);
```

O tipo foi explicitamente fornecido, como mostrado em negrito. Geralmente, isso pode ser omitido e o compilador inferirá o tipo necessário:

```java
Pair<Integer, String> p1 = new OrderedPair<Integer, String>(1, "apple");
Pair<Integer, String> p2 = new OrderedPair<Integer, String>(2, "pear");
boolean same = Util.compare(p1, p2);
```

Este recurso, conhecido como inferência de tipo, permite que você invoque um método genérico como um método comum, sem especificar um tipo entre colchetes angulares. Este tópico é discutido mais a fundo na seção seguinte, Inferência de Tipo.

 

## Parâmetros de Tipo Delimitados

Pode haver momentos em que você queira restringir os tipos que podem ser usados como argumentos de tipo em um tipo parametrizado. Por exemplo, um método que opera em números pode querer aceitar apenas instâncias de [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>) ou suas subclasses. É para isso que servem os parâmetros de tipo delimitados.

Para declarar um parâmetro de tipo delimitado, liste o nome do parâmetro de tipo, seguido pela palavra-chave `extends`, seguida por seu limite superior, que neste exemplo é [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>). Observe que, neste contexto, `extends` é usado em um sentido geral para significar "`extends`" (como em classes) ou "`implements`" (como em interfaces).

```java
public class Box<T extends Number> { /* ... */ }
```

Ao modificar nosso método genérico para incluir este parâmetro de tipo delimitado, a compilação agora falhará, já que nossa invocação de inspect ainda inclui uma [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>):

```java
public class NaturalNumber<T extends Integer> {

    private T n;

    public NaturalNumber(T n)  { this.n = n; }

    public boolean isEven() {
        return n.intValue() % 2 == 0;
    }

    // ...
}
```

Além de limitar os tipos que você pode usar para instanciar um tipo genérico, os parâmetros de tipo delimitados permitem que você invoque métodos definidos nos limites:

```java
public class NaturalNumber<T extends Integer> {

    private T n;

    public NaturalNumber(T n)  { this.n = n; }

    public boolean isEven() {
        return n.intValue() % 2 == 0;
    }

    // ...
}
```

O método `isEven()` invoca o método [`intValue()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#intValue\(\)>) definido na classe Integer através de `n`.

### Múltiplos Limites

O exemplo anterior ilustra o uso de um parâmetro de tipo com um único limite, mas um parâmetro de tipo pode ter múltiplos limites:

```java
<T extends B1 & B2 & B3>
```

Uma variável de tipo com múltiplos limites é um subtipo de todos os tipos listados no limite. Se um dos limites for uma classe, ele deve ser especificado primeiro. Por exemplo:

```java
class A { /* ... */ }
interface B { /* ... */ }
interface C { /* ... */ }

class D <T extends A & B & C> { /* ... */ }
```

Se o limite `A` não for especificado primeiro, você receberá um erro em tempo de compilação:

```java
class D <T extends B & A & C> { /* ... */ }  // compile-time error
```

 

## Métodos Genéricos e Parâmetros de Tipo Delimitados

Parâmetros de tipo delimitados são a chave para a implementação de algoritmos genéricos. Considere o seguinte método que conta o número de elementos em um array `T[]` que são maiores que um elemento `elem` especificado.

```java
public static <T> int countGreaterThan(T[] anArray, T elem) {
    int count = 0;
    for (T e : anArray) {
        if (e > elem) { // Compiler error!
            ++count;
        }
    }
    return count;
}
```

A implementação do método é direta, mas não compila porque o operador "maior que" (`>`) se aplica apenas a tipos primitivos como `short`, `int`, `double`, `long`, `float`, `byte` e `char`. Você não pode usar o operador `>` para comparar objetos. Para corrigir o problema, use um parâmetro de tipo delimitado pela interface [`Comparable<T>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html>):

```java
public static <T extends Comparable<T>> int countGreaterThan(T[] anArray, T elem) {
    int count = 0;
    for (T e : anArray) {
        if (e.compareTo(elem) > 0) {
            ++count;
        }
    }
    return count;
}
```

O código resultante será:

```java
public static <T extends Comparable<T>> int countGreaterThan(T[] anArray, T elem) {
    int count = 0;
    for (T e : anArray) {
        if (e.compareTo(elem) > 0) {
            ++count;
        }
    }
    return count;
}
```

 

## Generics, Herança e Subtipos

Como você já sabe, é possível atribuir um objeto de um tipo a um objeto de outro tipo, desde que os tipos sejam compatíveis. Por exemplo, você pode atribuir um [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) a um [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>), já que [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>) é um dos supertipos de [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>):

```java
Object someObject = new Object();
Integer someInteger = new Integer(10);
someObject = someInteger;   // OK
```

Na terminologia orientada a objetos, isso é chamado de relacionamento "é um". Como um [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) é um tipo de Object, a atribuição é permitida. Mas [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) também é um tipo de [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>), então o seguinte código também é válido:

```java
public void someMethod(Number n) { /* ... */ }

someMethod(new Integer(10));   // OK
someMethod(new Double(10.1));   // OK
```

O mesmo também é verdade com generics. Você pode realizar uma invocação de tipo genérico, passando [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>) como seu argumento de tipo, e qualquer invocação subsequente de add será permitida se o argumento for compatível com [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>):

```java
List<Number> list = new ArrayList<>();
list.add(new Integer(10));
list.add(new Double(10.1));
```

Agora considere o seguinte método:

```java
public void boxTest(Box<Number> n) { /* ... */ }
```

Que tipo de argumento ele aceita? Olhando para sua assinatura, você pode ver que ele aceita um único argumento cujo tipo é `Box<Number>`. Mas o que isso significa? Você pode passar `Box<Integer>` ou `Box<Double>`, como você poderia esperar? A resposta é "não", porque `Box<Integer>` e `Box<Double>` não são subtipos de `Box<Number>`.

Este é um equívoco comum quando se trata de programar com generics, mas é um conceito importante de aprender. `Box<Integer>` não é um subtipo de `Box<Number>`, mesmo que [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) seja um subtipo de [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>).

Subtipagem de tipos parametrizados.

> Nota: Dados dois tipos concretos `A` e `B`, por exemplo, [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>) e [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>), `MyClass<A>` não tem relação com `MyClass<B>`, independentemente de `A` e `B` estarem relacionados ou não. O pai comum de `MyClass<A>` e `MyClass<B>` é [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>).

Para informações sobre como criar um relacionamento semelhante a subtipo entre duas classes genéricas quando os parâmetros de tipo estão relacionados, consulte a seção [Wildcards e Subtipagem](<#/doc/tutorials/generics/wildcards>).

### Classes Genéricas e Subtipagem

Você pode subtipar uma classe ou interface genérica estendendo-a ou implementando-a. A relação entre os parâmetros de tipo de uma classe ou interface e os parâmetros de tipo de outra é determinada pelas cláusulas extends e implements.

Usando as classes Collections como exemplo, [`ArrayList<E>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) implementa [`List<E>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>), e [`List<E>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) estende [`Collection<E>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>). Assim, [`ArrayList<String>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) é um subtipo de [`List<String>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>), que é um subtipo de [`Collection<String>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>). Desde que você não varie o argumento de tipo, o relacionamento de subtipagem é preservado entre os tipos.

Uma hierarquia de Collection de exemplo.

Agora imagine que queremos definir nossa própria interface de lista, `PayloadList`, que associa um valor opcional do tipo genérico `P` a cada elemento. Sua declaração pode ser assim:

```java
interface PayloadList<E, P> extends List<E> {
  void setPayload(int index, P val);
}
```

As seguintes parametrizações de `PayloadList` são subtipos de [`List<String>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>):

  * `PayloadList<String,String>`
  * `PayloadList<String,Integer>`
  * `PayloadList<String,Exception>`

Uma hierarquia de Payload de exemplo.

### Neste tutorial

Por Que Usar Generics? Tipos Genéricos Tipos Brutos Métodos Genéricos Parâmetros de Tipo Delimitados Métodos Genéricos e Parâmetros de Tipo Delimitados Generics, Herança e Subtipos

 

Última atualização: 14 de setembro de 2021

 

**Tutorial Atual**

Introduzindo Generics

➜

**Próximo na Série**

[Inferência de Tipo](<#/doc/tutorials/generics/type-inference>)

**Próximo na Série:** [Inferência de Tipo](<#/doc/tutorials/generics/type-inference>)

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Generics ](<#/doc/tutorials/generics>) > Introduzindo Generics