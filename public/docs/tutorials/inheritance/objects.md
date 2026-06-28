# Object como Superclasse

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Herança ](<#/doc/tutorials/inheritance>) > Object como Superclasse

**Anterior na Série**

[Polimorfismo](<#/doc/tutorials/inheritance/polymorphism>)

➜

**Tutorial Atual**

Object como Superclasse

➜

**Próximo na Série**

[Métodos e Classes Abstratas](<#/doc/tutorials/inheritance/abstract-classes>)

**Anterior na Série:** [Polimorfismo](<#/doc/tutorials/inheritance/polymorphism>)

**Próximo na Série:** [Métodos e Classes Abstratas](<#/doc/tutorials/inheritance/abstract-classes>)

# Object como Superclasse

## Métodos da Classe Object

A classe Object, no pacote [`java.lang`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/package-summary.html>), está no topo da árvore de hierarquia de classes. Toda classe é uma descendente, direta ou indireta, da classe [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>). Toda classe que você usa ou escreve herda os métodos de instância de [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>). Você não precisa usar nenhum desses métodos, mas, se optar por fazê-lo, pode precisar sobrescrevê-los com código específico para sua classe. Os métodos herdados de [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>) que são discutidos nesta seção são:

  * [`protected Object clone() throws CloneNotSupportedException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#clone\(\)>): Cria e retorna uma cópia deste objeto.
  * [`public boolean equals(Object obj)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#equals\(java.lang.Object\)>): Indica se algum outro objeto é "igual a" este.
  * [`protected void finalize() throws Throwable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#finalize\(\)>): Chamado pelo garbage collector em um objeto quando a coleta de lixo determina que não há mais referências ao objeto. A partir do Java 18, este método foi descontinuado para remoção.
  * [`public final Class getClass()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#getClass\(\)>): Retorna a classe de tempo de execução de um objeto.
  * [`public int hashCode()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#hashCode\(\)>): Retorna um valor de código hash para o objeto.
  * [`public String toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#toString\(\)>): Retorna uma representação em String do objeto.

Observe que, a partir do Java SE 9, o método [`finalize()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#finalize\(\)>) foi descontinuado, e descontinuado para remoção a partir do Java SE 18. Sobrescrever este método é fortemente desencorajado. Em algum momento, ele não será mais chamado. Consulte a [última seção desta página](<#/doc/tutorials/inheritance/objects>) para mais informações.

Os métodos [`notify()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#notify\(\)>), [`notifyAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#notifyAll\(\)>) e [`wait()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#wait\(\)>) de [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>) desempenham um papel na sincronização das atividades de threads executando independentemente em um programa, o que é discutido em uma seção posterior e não será abordado aqui. Existem cinco desses métodos:

  * [`public final void notify()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#notify\(\)>)
  * [`public final void notifyAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#notifyAll\(\)>)
  * [`public final void wait()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#wait\(\)>)
  * [`public final void wait(long timeout)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#wait\(long\)>)
  * [`public final void wait(long timeout, int nanos)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#wait\(long,int\)>)

> Nota: Existem alguns aspectos sutis em vários desses métodos, especialmente o método clone.

## O Método toString()

Você deve sempre considerar sobrescrever o método [`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#toString\(\)>) em suas classes.

O método [`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#toString\(\)>) de Object retorna uma representação em [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) do objeto, o que é muito útil para depuração. A representação em [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) para um objeto depende inteiramente do objeto, e é por isso que você precisa sobrescrever [`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#toString\(\)>) em suas classes.

Você pode usar [`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#toString\(\)>) junto com [`IO.println()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IO.html#println\(java.lang.Object\)>) para exibir uma representação textual de um objeto, como uma instância de `Book`:

```java
System.out.println(new Book("978-0321765723"));
```

o que, para um método [`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#toString\(\)>) devidamente sobrescrito, imprimiria algo útil, como isto:

```
Book: 978-0321765723
```

## O Método equals()

O método [`equals()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#equals\(java.lang.Object\)>) compara dois objetos quanto à igualdade e retorna true se eles forem iguais. O método [`equals()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#equals\(java.lang.Object\)>) fornecido na classe [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>) usa o operador de identidade (`==`) para determinar se dois objetos são iguais. Para tipos de dados primitivos, isso fornece o resultado correto. Para objetos, no entanto, não. O método [`equals()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#equals\(java.lang.Object\)>) fornecido por [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>) testa se as referências dos objetos são iguais — ou seja, se os objetos comparados são exatamente o mesmo objeto.

Para testar se dois objetos são iguais no sentido de equivalência (contendo as mesmas informações), você deve sobrescrever o método [`equals()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#equals\(java.lang.Object\)>). Aqui está um exemplo de uma classe `Book` que sobrescreve [`equals()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#equals\(java.lang.Object\)>):

```java
public class Book {
    private String ISBN;

    public Book(String ISBN) {
        this.ISBN = ISBN;
    }

    public String getISBN() {
        return ISBN;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Book) {
            return ((Book) obj).getISBN().equals(this.ISBN);
        }
        return false;
    }
}
```

Considere este código que testa duas instâncias da classe `Book` quanto à igualdade:

```java
Book firstBook = new Book("0-321-76572-6");
Book secondBook = new Book("0-321-76572-6");
if (firstBook.equals(secondBook)) {
    System.out.println("objects are equal");
} else {
    System.out.println("objects are not equal");
}
```

Este programa exibe objects are equal mesmo que `firstBook` e `secondBook` referenciem dois objetos distintos. Eles são considerados iguais porque os objetos comparados contêm o mesmo número ISBN.

Você deve sempre sobrescrever o método [`equals()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#equals\(java.lang.Object\)>) se o operador de identidade não for apropriado para sua classe.

> Nota: Se você sobrescrever [`equals()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#equals\(java.lang.Object\)>), você também deve sobrescrever [`hashCode()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#hashCode\(\)>).

## O Método hashCode()

O valor retornado por [`hashCode()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#hashCode\(\)>) é o código hash do objeto, que é um valor inteiro gerado por um algoritmo de hashing.

Por definição, se dois objetos são iguais, seus códigos hash também devem ser iguais. Se você sobrescrever o método [`equals()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#equals\(java.lang.Object\)>), você altera a forma como dois objetos são equiparados e a implementação de [`hashCode()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#hashCode\(\)>) de [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>) não é mais válida. Portanto, se você sobrescrever o método [`equals()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#equals\(java.lang.Object\)>), você também deve sobrescrever o método [`hashCode()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#hashCode\(\)>).

## O Método getClass()

Você não pode sobrescrever [`getClass()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#getClass\(\)>).

O método [`getClass()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#getClass\(\)>) retorna um objeto [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>), que possui métodos que você pode usar para obter informações sobre a classe, como seu nome ([`getSimpleName()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getSimpleName\(\)>)), sua superclasse ([`getSuperclass()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getSuperclass\(\)>)) e as interfaces que ela implementa ([`getInterfaces()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getInterfaces\(\)>)). Por exemplo, o método a seguir obtém e exibe o nome da classe de um objeto:

```java
void printClassName(Object obj) {
    System.out.println("The class of " + obj +
        " is " + obj.getClass().getSimpleName());
}
```

A classe [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>), no pacote [`java.lang`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/package-summary.html>), possui um grande número de métodos (mais de 50). Por exemplo, você pode testar para ver se a classe é uma anotação ([`isAnnotation()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#isAnnotation\(\)>)), uma interface ([`isInterface()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#isInterface\(\)>)) ou uma enumeração ([`isEnum()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#isEnum\(\)>)). Você pode ver quais são os campos do objeto ([`getFields()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getFields\(\)>)) ou quais são seus métodos ([`getMethods()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getMethods\(\)>)), e assim por diante.

## O Método clone()

Se uma classe, ou uma de suas superclasses, implementa a interface [`Cloneable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Cloneable.html>), você pode usar o método [`clone()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#clone\(\)>) para criar uma cópia de um objeto existente. Para criar um clone, você escreve:

```java
aCopyOfAnObject = anObject.clone();
```

A implementação de [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>) deste método verifica se o objeto no qual [`clone()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#clone\(\)>) foi invocado implementa a interface [`Cloneable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Cloneable.html>). Se o objeto não o fizer, o método lança uma exceção [`CloneNotSupportedException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/CloneNotSupportedException.html>). O tratamento de exceções será abordado na seção [Exceção](<#/doc/tutorials/exceptions>). Por enquanto, você precisa saber que [`clone()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#clone\(\)>) deve ser declarado como

```java
protected Object clone() throws CloneNotSupportedException
```

ou

```java
public Object clone() throws CloneNotSupportedException
```

se você for escrever um método [`clone()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#clone\(\)>) para sobrescrever o de [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>).

Se o objeto no qual [`clone()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#clone\(\)>) foi invocado implementa a interface [`Cloneable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Cloneable.html>), a implementação de `Object` do método [`clone()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#clone\(\)>) cria um objeto da mesma classe que o objeto original e inicializa as variáveis membro do novo objeto para terem os mesmos valores que as variáveis membro correspondentes do objeto original.

A maneira mais simples de tornar sua classe clonável é adicionar `implements` [`Cloneable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Cloneable.html>) à declaração de sua classe. Então seus objetos podem invocar o método [`clone()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#clone\(\)>).

Para algumas classes, o comportamento padrão do método [`clone()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#clone\(\)>) de Object funciona perfeitamente. Se, no entanto, um objeto contém uma referência a um objeto externo, digamos `ObjExternal`, você pode precisar sobrescrever [`clone()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#clone\(\)>) para obter o comportamento correto. Caso contrário, uma mudança em `ObjExternal` feita por um objeto também será visível em seu clone. Isso significa que o objeto original e seu clone não são independentes — para desacoplá-los, você deve sobrescrever [`clone()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#clone\(\)>) para que ele clone o objeto e `ObjExternal`. Então o objeto original referencia `ObjExternal` e o clone referencia um clone de `ObjExternal`, de modo que o objeto e seu clone sejam verdadeiramente independentes.

## O Método finalize()

A classe Object fornece um método de callback, [`finalize()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#finalize\(\)>), que pode ser invocado em um objeto quando ele se torna lixo. A implementação de [`finalize()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#finalize\(\)>) de Object não faz nada. Sobrescrever [`finalize()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#finalize\(\)>) foi feito para realizar alguma limpeza, como liberar recursos.

O método [`finalize()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#finalize\(\)>) pode ser chamado automaticamente pelo sistema, mas quando ele é chamado, ou mesmo se é chamado, é incerto. Portanto, você não deve mais confiar neste método para fazer sua limpeza. Por exemplo, se você não fechar descritores de arquivo em seu código após realizar I/O e esperar que [`finalize()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#finalize\(\)>) os feche para você, você pode ficar sem descritores de arquivo.

A partir do Java SE 9, o método [`finalize()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#finalize\(\)>) foi descontinuado, e a partir do Java SE 18, descontinuado para remoção. Em algum momento, ele não será mais chamado. Sobrescrever este método é agora fortemente desencorajado. Se você precisar limpar alguns recursos, pode fazê-lo implementando a interface [`AutoCloseable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/AutoCloseable.html>). Este ponto é abordado em detalhes na [seção Java I/O](<#/doc/tutorials/java-io>).

### Neste tutorial

Métodos da Classe Object O toString() O equals() O hashCode() O getClass() O clone() O finalize()

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Polimorfismo](<#/doc/tutorials/inheritance/polymorphism>)

➜

**Tutorial Atual**

Object como Superclasse

➜

**Próximo na Série**

[Métodos e Classes Abstratas](<#/doc/tutorials/inheritance/abstract-classes>)

**Anterior na Série:** [Polimorfismo](<#/doc/tutorials/inheritance/polymorphism>)

**Próximo na Série:** [Métodos e Classes Abstratas](<#/doc/tutorials/inheritance/abstract-classes>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Herança ](<#/doc/tutorials/inheritance>) > Object como Superclasse