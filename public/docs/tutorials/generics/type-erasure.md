# Apagamento de Tipo

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Generics ](<#/doc/tutorials/generics>) > Apagamento de Tipo

**Anterior na Série**

[Wildcards](<#/doc/tutorials/generics/wildcards>)

➜

**Tutorial Atual**

Apagamento de Tipo

➜

**Próximo na Série**

[Restrições em Generics](<#/doc/tutorials/generics/restrictions>)

**Anterior na Série:** [Wildcards](<#/doc/tutorials/generics/wildcards>)

**Próximo na Série:** [Restrições em Generics](<#/doc/tutorials/generics/restrictions>)

# Apagamento de Tipo

## Apagamento de Tipos Genéricos

Generics foram introduzidos na linguagem Java para fornecer verificações de tipo mais rigorosas em tempo de compilação e para suportar programação genérica. Para implementar generics, o compilador Java aplica o apagamento de tipo para:

  * Substituir todos os parâmetros de tipo em tipos genéricos por seus limites ou Object se os parâmetros de tipo não forem delimitados. O bytecode produzido, portanto, contém apenas classes, interfaces e métodos comuns.
  * Inserir conversões de tipo (casts) se necessário para preservar a segurança de tipo.
  * Gerar métodos ponte para preservar o polimorfismo em tipos genéricos estendidos.

O apagamento de tipo garante que nenhuma nova classe seja criada para tipos parametrizados; consequentemente, generics não incorrem em sobrecarga em tempo de execução.

Durante o processo de apagamento de tipo, o compilador Java apaga todos os parâmetros de tipo e substitui cada um por seu primeiro limite se o parâmetro de tipo for delimitado, ou [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>) se o parâmetro de tipo não for delimitado.

Considere a seguinte classe genérica que representa um nó em uma lista encadeada simples:

```java
public class Node<T> {
    private T data;
    private Node<T> next;
    public Node(T data, Node<T> next) {
        this.data = data;
        this.next = next;
    }
    public T getData() { return data; }
    public void setData(T data) { this.data = data; }
}
```

Como o parâmetro de tipo `T` não é delimitado, o compilador Java o substitui por [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>):

```java
public class Node {
    private Object data;
    private Node next;
    public Node(Object data, Node next) {
        this.data = data;
        this.next = next;
    }
    public Object getData() { return data; }
    public void setData(Object data) { this.data = data; }
}
```

No exemplo a seguir, a classe genérica `Node` usa um parâmetro de tipo delimitado:

```java
public class Node<T extends Comparable<T>> {
    private T data;
    private Node<T> next;
    public Node(T data, Node<T> next) {
        this.data = data;
        this.next = next;
    }
    public T getData() { return data; }
    public void setData(T data) { this.data = data; }
}
```

O compilador Java substitui o parâmetro de tipo delimitado `T` pela primeira classe de limite, [`Comparable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html>):

```java
public class Node {
    private Comparable data;
    private Node next;
    public Node(Comparable data, Node next) {
        this.data = data;
        this.next = next;
    }
    public Comparable getData() { return data; }
    public void setData(Comparable data) { this.data = data; }
}
```

## Apagamento de Métodos Genéricos

O compilador Java também apaga parâmetros de tipo em argumentos de métodos genéricos. Considere o seguinte método genérico:

```java
class MyClass {
    public static <T> int count(T[] anArray, T elem) {
        int cnt = 0;
        for (T e : anArray)
            if (e.equals(elem))
                ++cnt;
        return cnt;
    }
}
```

Como `T` não é delimitado, o compilador Java o substitui por [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>):

```java
class MyClass {
    public static int count(Object[] anArray, Object elem) {
        int cnt = 0;
        for (Object e : anArray)
            if (e.equals(elem))
                ++cnt;
        return cnt;
    }
}
```

Suponha que as seguintes classes sejam definidas:

```java
abstract class Shape {
    public abstract void draw(Graphics g);
}
class Circle extends Shape {
    public void draw(Graphics g) { /* ... */ }
}
class Rectangle extends Shape {
    public void draw(Graphics g) { /* ... */ }
}
```

Você pode escrever um método genérico para desenhar diferentes formas:

```java
public static <T extends Shape> void draw(T shape) { /* ... */ }
```

O compilador Java substitui `T` por `Shape`:

```java
public static void draw(Shape shape) { /* ... */ }
```

## Efeitos do Apagamento de Tipo e Métodos Ponte

Às vezes, o apagamento de tipo causa uma situação que você pode não ter antecipado. O exemplo a seguir mostra como isso pode ocorrer. O exemplo a seguir mostra como um compilador às vezes cria um método sintético, que é chamado de método ponte, como parte do processo de apagamento de tipo.

Dadas as duas classes a seguir:

```java
public class Node<T> {
    public T data;
    public Node(T data) { this.data = data; }
    public void setData(T data) {
        System.out.println("Node.setData");
        this.data = data;
    }
}

public class MyNode extends Node<Integer> {
    public MyNode(Integer data) { super(data); }
    public void setData(Integer data) {
        System.out.println("MyNode.setData");
        super.setData(data);
    }
}
```

Considere o seguinte código:

```java
MyNode mn = new MyNode(5);
Node n = mn;               // Um Node parametrizado é um subtipo de um Node bruto
n.setData("Hello");
Integer x = mn.data; // Lança um ClassCastException em tempo de execução
```

Após o apagamento de tipo, este código se torna:

```java
MyNode mn = new MyNode(5);
Node n = mn;
n.setData("Hello");
Integer x = (Integer)mn.data;
```

A próxima seção explica por que uma [`ClassCastException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ClassCastException.html>) é lançada na instrução `n.setData("Hello");`.

## Métodos Ponte

Ao compilar uma classe ou interface que estende uma classe parametrizada ou implementa uma interface parametrizada, o compilador pode precisar criar um método sintético, que é chamado de método ponte, como parte do processo de apagamento de tipo. Normalmente, você não precisa se preocupar com métodos ponte, mas pode ficar confuso se um aparecer em um rastreamento de pilha.

Após o apagamento de tipo, as classes `Node` e `MyNode` se tornam:

```java
public class Node {
    public Object data;
    public Node(Object data) { this.data = data; }
    public void setData(Object data) {
        System.out.println("Node.setData");
        this.data = data;
    }
}

public class MyNode extends Node {
    public MyNode(Integer data) { super(data); }
    public void setData(Integer data) {
        System.out.println("MyNode.setData");
        super.setData(data);
    }
}
```

Após o apagamento de tipo, as assinaturas dos métodos não correspondem; o método `Node.setData(T)` se torna `Node.setData(Object)`. Como resultado, o método `MyNode.setData(Integer)` não sobrescreve o método `Node.setData(Object)`.

Para resolver este problema e preservar o polimorfismo de tipos genéricos após o apagamento de tipo, o compilador Java gera um método ponte para garantir que a subtipagem funcione como esperado.

Para a classe `MyNode`, o compilador gera o seguinte método ponte para `setData()`:

```java
class MyNode extends Node {
    // Método ponte gerado pelo compilador
    public void setData(Object data) {
        setData((Integer) data);
    }

    public void setData(Integer data) {
        System.out.println("MyNode.setData");
        super.setData(data);
    }
    // ...
}
```

O método ponte `MyNode.setData(object)` delega ao método original `MyNode.setData(Integer)`. Como resultado, a instrução `n.setData("Hello");` chama o método `MyNode.setData(Object)`, e uma [`ClassCastException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ClassCastException.html>) é lançada porque `"Hello"` não pode ser convertido para [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>).

## Tipos Não-Reificáveis

Discutimos o processo onde o compilador remove informações relacionadas a parâmetros de tipo e argumentos de tipo. O apagamento de tipo tem consequências relacionadas a métodos de argumentos variáveis (também conhecidos como varargs) cujo parâmetro formal varargs tem um tipo não-reificável. Consulte a seção Número Arbitrário de Argumentos em Passando Informações para um Método ou um Construtor para mais informações sobre métodos varargs.

Esta página aborda os seguintes tópicos:

  * Tipos Não-Reificáveis
  * Poluição de Heap
  * Vulnerabilidades Potenciais de Métodos Varargs com Parâmetros Formais Não-Reificáveis
  * Prevenindo Avisos de Métodos Varargs com Parâmetros Formais Não-Reificáveis

Um tipo reificável é um tipo cuja informação de tipo está totalmente disponível em tempo de execução. Isso inclui tipos primitivos, tipos não genéricos, tipos brutos e invocações de wildcards não delimitados.

Tipos não-reificáveis são tipos onde a informação foi removida em tempo de compilação pelo apagamento de tipo — invocações de tipos genéricos que não são definidos como wildcards não delimitados. Um tipo não-reificável não tem todas as suas informações disponíveis em tempo de execução. Exemplos de tipos não-reificáveis são `List<String>` e `List<Number>`; a JVM não consegue diferenciar esses tipos em tempo de execução. Conforme mostrado na seção Restrições em Generics, há certas situações em que tipos não-reificáveis não podem ser usados: em uma expressão `instanceof`, por exemplo, ou como um elemento em um array.

## Poluição de Heap

_Poluição de heap_ ocorre quando uma variável de um tipo parametrizado se refere a um objeto que não é desse tipo parametrizado. Esta situação ocorre se o programa realizou alguma operação que gerou um aviso não verificado em tempo de compilação. Um aviso não verificado é gerado se, seja em tempo de compilação (dentro dos limites das regras de verificação de tipo em tempo de compilação) ou em tempo de execução, a correção de uma operação envolvendo um tipo parametrizado (por exemplo, uma conversão de tipo ou chamada de método) não puder ser verificada. Por exemplo, a poluição de heap ocorre ao misturar tipos brutos e tipos parametrizados, ou ao realizar conversões de tipo não verificadas.

Em situações normais, quando todo o código é compilado ao mesmo tempo, o compilador emite um aviso não verificado para chamar sua atenção para uma potencial poluição de heap. Se você compilar seções do seu código separadamente, é difícil detectar o risco potencial de poluição de heap. Se você garantir que seu código compile sem avisos, então nenhuma poluição de heap poderá ocorrer.

## Vulnerabilidades Potenciais de Métodos Varargs com Parâmetros Formais Não-Reificáveis

Métodos genéricos que incluem parâmetros de entrada vararg podem causar poluição de heap.

Considere a seguinte classe `ArrayBuilder`:

```java
public class ArrayBuilder {
  public static <T> void addToList (List<T> listArg, T... elements) {
    for (T x : elements) {
      listArg.add(x);
    }
  }
}
```

O exemplo a seguir, `HeapPollutionExample`, usa a classe `ArrayBuilder`:

```java
public class HeapPollutionExample {

  public static void main(String[] args) {

    List<String> stringListA = new ArrayList<String>();
    List<String> stringListB = new ArrayList<String>();

    ArrayBuilder.addToList(stringListA, "Seven", "Eight", "Nine");
    ArrayBuilder.addToList(stringListB, "Ten", "Eleven", "Twelve");
    List<List<String>> listOfStringLists =
      new ArrayList<List<String>>();
    ArrayBuilder.addToList(listOfStringLists,
      stringListA, stringListB);

    ArrayBuilder.addToList(listOfStringLists,
      new ArrayList<String>());

    // Este método lança um ClassCastException em tempo de execução.
    ArrayBuilder.faultyMethod(Arrays.asList("Hello!"), Arrays.asList("World!"));
  }
}
```

Quando compilado, o seguinte aviso é produzido pela definição do método `ArrayBuilder.addToList()`:

```
warning: [varargs] Possible heap pollution from parameterized vararg type
```

Quando o compilador encontra um método varargs, ele traduz o parâmetro formal varargs para um array. No entanto, a linguagem de programação Java não permite a criação de arrays de tipos parametrizados. No método `ArrayBuilder.addToList()`, o compilador traduz o parâmetro formal varargs `T...` elements para o parâmetro formal `T[]` elements, um array. No entanto, devido ao apagamento de tipo, o compilador converte o parâmetro formal varargs para `Object[]` elements. Consequentemente, existe a possibilidade de poluição de heap.

A seguinte instrução atribui o parâmetro formal varargs `l` ao array `Object` `objectArgs`:

```java
Object[] objectArgs = l;
```

Esta instrução pode potencialmente introduzir poluição de heap. Um valor que não corresponde ao tipo parametrizado do parâmetro formal varargs `l` pode ser atribuído à variável `objectArray`, e assim pode ser atribuído a `l`. No entanto, o compilador não gera um aviso não verificado nesta instrução. O compilador já gerou um aviso quando traduziu o parâmetro formal varargs `List<String>... l` para o parâmetro formal `List[] l`. Esta instrução é válida; a variável `l` tem o tipo `List[]`, que é um subtipo de `Object[]`.

Consequentemente, o compilador não emite um aviso ou erro se você atribuir um objeto `List` de qualquer tipo a qualquer componente do array `objectArray`, conforme mostrado por esta instrução:

```java
objectArgs[0] = Arrays.asList(123);
```

Esta instrução atribui ao primeiro componente do array `objectArray` um objeto `List` que contém um objeto do tipo [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>).

Suponha que você invoque `ArrayBuilder.faultyMethod()` com a seguinte instrução:

```java
ArrayBuilder.faultyMethod(Arrays.asList("Hello!"), Arrays.asList("World!"));
```

Em tempo de execução, a JVM lança uma [`ClassCastException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ClassCastException.html>) na seguinte instrução:

```java
String s = stringLists.get(0).get(0);
```

O objeto armazenado no primeiro componente do array da variável `l` tem o tipo `List<Integer>`, mas esta instrução está esperando um objeto do tipo `List<String>`.

## Prevenir Avisos de Métodos Varargs com Parâmetros Formais Não-Reificáveis

Se você declarar um método varargs que possui parâmetros de um tipo parametrizado, e você garantir que o corpo do método não lance uma [`ClassCastException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ClassCastException.html>) ou outra exceção similar devido ao manuseio inadequado do parâmetro formal varargs, você pode prevenir o aviso que o compilador gera para esses tipos de métodos varargs adicionando a seguinte anotação a declarações de métodos estáticos e não-construtores:

```java
@SafeVarargs
```

A anotação [`@SafeVarargs`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/SafeVarargs.html>) é uma parte documentada do contrato do método; esta anotação afirma que a implementação do método não irá manusear indevidamente o parâmetro formal varargs.

Também é possível, embora menos desejável, suprimir tais avisos adicionando o seguinte à declaração do método:

```java
@SuppressWarnings({"unchecked", "varargs"})
```

No entanto, esta abordagem não suprime avisos gerados do local de chamada do método. Se você não estiver familiarizado com a sintaxe [`@SuppressWarnings`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/SuppressWarnings.html>), consulte a seção [Anotações](<#/doc/tutorials/annotations>).

### Neste tutorial

Apagamento de Tipos Genéricos Apagamento de Métodos Genéricos Efeitos do Apagamento de Tipo e Métodos Ponte Métodos Ponte Tipos Não-Reificáveis Poluição de Heap Vulnerabilidades Potenciais de Métodos Varargs com Parâmetros Formais Não-Reificáveis Prevenir Avisos de Métodos Varargs com Parâmetros Formais Não-Reificáveis

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Wildcards](<#/doc/tutorials/generics/wildcards>)

➜

**Tutorial Atual**

Apagamento de Tipo

➜

**Próximo na Série**

[Restrições em Generics](<#/doc/tutorials/generics/restrictions>)

**Anterior na Série:** [Wildcards](<#/doc/tutorials/generics/wildcards>)

**Próximo na Série:** [Restrições em Generics](<#/doc/tutorials/generics/restrictions>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Generics ](<#/doc/tutorials/generics>) > Apagamento de Tipo