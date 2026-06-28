# Classes Aninhadas

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Classes e Objetos ](<#/doc/tutorials/classes-objects>) > Classes Aninhadas

**Anterior na Série**

[Mais sobre Classes](<#/doc/tutorials/classes-objects/more-on-classes>)

➜

**Tutorial Atual**

Classes Aninhadas

➜

**Próximo na Série**

[Enums](<#/doc/tutorials/classes-objects/enums>)

**Anterior na Série:** [Mais sobre Classes](<#/doc/tutorials/classes-objects/more-on-classes>)

**Próximo na Série:** [Enums](<#/doc/tutorials/classes-objects/enums>)

# Classes Aninhadas

## Classes Aninhadas

A linguagem de programação Java permite definir uma classe dentro de outra classe. Tal classe é chamada de classe aninhada e é ilustrada aqui:

> Terminologia: Classes aninhadas são divididas em duas categorias: não-estáticas e estáticas. Classes aninhadas não-estáticas são chamadas de _classes internas_. Classes aninhadas que são declaradas `static` são chamadas de _classes aninhadas estáticas_.

Uma classe aninhada é um membro de sua classe envolvente. Classes aninhadas não-estáticas (classes internas) têm acesso a outros membros da classe envolvente, mesmo que sejam declarados `private`. Classes aninhadas estáticas não têm acesso a outros membros da classe envolvente. Como membro da `OuterClass`, uma classe aninhada pode ser declarada `private`, `public`, `protected` ou package private. Lembre-se de que classes externas só podem ser declaradas `public` ou package private.

### Por que usar Classes Aninhadas?

Razões convincentes para usar classes aninhadas incluem o seguinte:

  * É uma forma de agrupar logicamente classes que são usadas apenas em um lugar: Se uma classe é útil para apenas uma outra classe, então é lógico incorporá-la nessa classe e manter as duas juntas. Aninhar tais "classes auxiliares" torna seu pacote mais organizado.
  * Aumenta a encapsulamento: Considere duas classes de nível superior, `A` e `B`, onde `B` precisa de acesso a membros de `A` que de outra forma seriam declarados `private`. Ao ocultar a classe `B` dentro da classe `A`, os membros de `A` podem ser declarados `private` e `B` pode acessá-los. Além disso, `B` em si pode ser ocultado do mundo exterior.
  * Pode levar a um código mais legível e de fácil manutenção: Aninhar classes pequenas dentro de classes de nível superior posiciona o código mais próximo de onde ele é usado.

### Classes Internas

Assim como métodos e variáveis de instância, uma classe interna está associada a uma instância de sua classe envolvente e tem acesso direto aos métodos e campos desse objeto.

Objetos que são instâncias de uma classe interna existem dentro de uma instância da classe externa. Considere as seguintes classes:

```java
class OuterClass {
    // ...
    class InnerClass {
        // ...
    }
}
```

Uma instância de `InnerClass` pode existir apenas dentro de uma instância de `OuterClass` e tem acesso direto aos métodos e campos de sua instância envolvente.

Para instanciar uma classe interna, você deve primeiro instanciar a classe externa. Em seguida, crie o objeto interno dentro do objeto externo com esta sintaxe:

```java
OuterClass outerObject = new OuterClass();
OuterClass.InnerClass innerObject = outerObject.new InnerClass();
```

Existem dois tipos especiais de classes internas: classes locais e classes anônimas.

### Classes Aninhadas Estáticas

Assim como métodos e variáveis de classe, uma classe aninhada estática está associada à sua classe externa. E, como métodos de classe estáticos, uma classe aninhada estática não pode se referir diretamente a variáveis de instância ou métodos definidos em sua classe envolvente: ela pode usá-los apenas através de uma referência de objeto. O Exemplo de Classe Interna e Classe Aninhada Estática demonstra isso.

> Nota: Uma classe aninhada estática interage com os membros de instância de sua classe externa (e outras classes) assim como qualquer outra classe de nível superior. Na verdade, uma classe aninhada estática é comportamentalmente uma classe de nível superior que foi aninhada em outra classe de nível superior para conveniência de empacotamento. O Exemplo de Classe Interna e Classe Aninhada Estática também demonstra isso.

Você instancia uma classe aninhada estática da mesma forma que uma classe de nível superior:

```java
OuterClass.StaticNestedClass nestedObject = new OuterClass.StaticNestedClass();
```

### Exemplo de Classe Interna e Classe Aninhada Estática

O exemplo a seguir, `OuterClass`, juntamente com `TopLevelClass`, demonstra quais membros de classe de `OuterClass` uma classe interna (`InnerClass`), uma classe aninhada estática (`StaticNestedClass`) e uma classe de nível superior (`TopLevelClass`) podem acessar:

#### OuterClass.java

```java
public class OuterClass {
    String outerField = "Outer field";
    static String staticOuterField = "Static outer field";

    class InnerClass {
        void accessMembers() {
            System.out.println(outerField);
            System.out.println(staticOuterField);
        }
    }

    static class StaticNestedClass {
        void accessMembers(OuterClass outer) {
            // Compiler error: Cannot make a static reference to the non-static field outerField
            // System.out.println(outerField);
            System.out.println(outer.outerField);
            System.out.println(staticOuterField);
        }
    }

    public static void main(String[] args) {
        System.out.println("Inner Class:");
        OuterClass outerObject = new OuterClass();
        OuterClass.InnerClass innerObject = outerObject.new InnerClass();
        innerObject.accessMembers();

        System.out.println("\nStatic Nested Class:");
        OuterClass.StaticNestedClass nestedObject = new OuterClass.StaticNestedClass();
        nestedObject.accessMembers(outerObject);

        System.out.println("\nTop-Level Class:");
        TopLevelClass topLevelObject = new TopLevelClass();
        topLevelObject.accessMembers(outerObject);
    }
}
```

#### TopLevelClass.java

```java
public class TopLevelClass {
    void accessMembers(OuterClass outer) {
        // Compiler error: Cannot make a static reference to the non-static field outerField
        // System.out.println(outerField);
        System.out.println(outer.outerField);
        System.out.println(OuterClass.staticOuterField);
    }
}
```

Este exemplo imprime a seguinte saída:

```
Inner Class:
Outer field
Static outer field

Static Nested Class:
Outer field
Static outer field

Top-Level Class:
Outer field
Static outer field
```

Observe que uma classe aninhada estática interage com os membros de instância de sua classe externa assim como qualquer outra classe de nível superior. A classe aninhada estática `StaticNestedClass` não pode acessar diretamente `outerField` porque é uma variável de instância da classe envolvente, `OuterClass`. O compilador Java gera um erro na instrução destacada:

```java
// Compiler error: Cannot make a static reference to the non-static field outerField
// System.out.println(outerField);
```

Para corrigir este erro, acesse `outerField` através de uma referência de objeto:

```java
System.out.println(outer.outerField);
```

Da mesma forma, a classe de nível superior `TopLevelClass` também não pode acessar diretamente `outerField`.

### Sombreamento

Se uma declaração de um tipo (como uma variável membro ou um nome de parâmetro) em um escopo particular (como uma classe interna ou uma definição de método) tem o mesmo nome que outra declaração no escopo envolvente, então a declaração sombreia a declaração do escopo envolvente. Você não pode se referir a uma declaração sombreada apenas pelo seu nome. O exemplo a seguir, `ShadowTest`, demonstra isso:

```java
public class ShadowTest {

    public int x = 0;

    class FirstLevel {

        public int x = 1;

        void methodInFirstLevel(int x) {
            System.out.println("x = " + x);
            System.out.println("this.x = " + this.x);
            System.out.println("ShadowTest.this.x = " + ShadowTest.this.x);
        }
    }

    public static void main(String... args) {
        ShadowTest st = new ShadowTest();
        ShadowTest.FirstLevel fl = st.new FirstLevel();
        fl.methodInFirstLevel(23);
    }
}
```

A seguir está a saída deste exemplo:

```
x = 23
this.x = 1
ShadowTest.this.x = 0
```

Este exemplo define três variáveis chamadas `x`: a variável membro da classe `ShadowTest`, a variável membro da classe interna `FirstLevel` e o parâmetro no método `methodInFirstLevel()`. A variável `x` definida como um parâmetro do método `methodInFirstLevel()` sombreia a variável da classe interna `FirstLevel`. Consequentemente, quando você usa a variável `x` no método `methodInFirstLevel()`, ela se refere ao parâmetro do método. Para se referir à variável membro da classe interna `FirstLevel`, use a palavra-chave `this` para representar o escopo envolvente:

```java
System.out.println("this.x = " + this.x);
```

Refira-se a variáveis membro que englobam escopos maiores pelo nome da classe à qual pertencem. Por exemplo, a seguinte instrução acessa a variável membro da classe `ShadowTest` a partir do método `methodInFirstLevel()`:

```java
System.out.println("ShadowTest.this.x = " + ShadowTest.this.x);
```

### Serialização

A serialização de classes internas, incluindo classes locais e anônimas, é fortemente desencorajada. Quando o compilador Java compila certas construções, como classes internas, ele cria construções sintéticas; estas são classes, métodos, campos e outras construções que não possuem uma construção correspondente no código-fonte. Construções sintéticas permitem que os compiladores Java implementem novos recursos da linguagem Java sem alterações na JVM.

No entanto, as construções sintéticas podem variar entre diferentes implementações de compiladores Java, o que significa que os arquivos `.class` também podem variar entre diferentes implementações. Consequentemente, você pode ter problemas de compatibilidade se serializar uma classe interna e depois desserializá-la com uma implementação JRE diferente.

## Exemplo de Classe Interna

Para ver uma classe interna em uso, considere primeiro um array. No exemplo a seguir, você cria um array, o preenche com valores inteiros e, em seguida, exibe apenas os valores dos índices pares do array em ordem crescente.

O exemplo `DataStructure.java` que se segue consiste em:

  * A classe externa `DataStructure`, que inclui um construtor para criar uma instância de `DataStructure` contendo um array preenchido com valores inteiros consecutivos (0, 1, 2, 3, e assim por diante) e um método que imprime elementos do array que possuem um valor de índice par.
  * A classe interna `EvenIterator`, que implementa a interface `DataStructureIterator`, que estende a interface `Iterator< Integer>`. Iterators são usados para percorrer uma estrutura de dados e tipicamente possuem métodos para testar o último elemento, recuperar o elemento atual e mover para o próximo elemento.
  * Um método `main` que instancia um objeto `DataStructure` (`ds`), então invoca o método `printEven()` para imprimir elementos do array `arrayOfInts` que possuem um valor de índice par.

```java
import java.util.Iterator;

public class DataStructure {

    // Create an array
    private final static int SIZE = 15;
    private int[] arrayOfInts = new int[SIZE];

    public DataStructure() {
        // Fill the array with ascending integer values
        for (int i = 0; i < SIZE; i++) {
            arrayOfInts[i] = i;
        }
    }

    public void printEven() {
        // Print out values of even indices of the array
        DataStructureIterator iterator = this.new EvenIterator();
        while (iterator.hasNext()) {
            System.out.println(iterator.next() + " ");
        }
        System.out.println();
    }

    interface DataStructureIterator extends Iterator<Integer> { }

    // Inner class implements the DataStructureIterator interface,
    // which extends the Iterator<Integer> interface
    private class EvenIterator implements DataStructureIterator {

        // Start stepping through the array from the beginning
        private int nextIndex = 0;

        public boolean hasNext() {

            // Check if the current element is the last in the array
            return (nextIndex <= SIZE - 1);
        }

        public Integer next() {

            // Record a value of an even index of the array
            Integer retValue = Integer.valueOf(arrayOfInts[nextIndex]);

            // Get the next even element
            nextIndex += 2;
            return retValue;
        }
    }

    public static void main(String s[]) {

        // Fill the array with integer values and print out the even numbers
        DataStructure ds = new DataStructure();
        ds.printEven();
    }
}
```

A saída é:

```
0
2
4
6
8
10
12
14
```

Observe que a classe `EvenIterator` se refere diretamente à variável de instância `arrayOfInts` do objeto `DataStructure`.

Você pode usar classes internas para implementar classes auxiliares como a mostrada neste exemplo. Para lidar com eventos de interface do usuário, você deve saber como usar classes internas, porque o mecanismo de tratamento de eventos faz uso extensivo delas.

### Classes Locais e Anônimas

Existem dois tipos adicionais de classes internas. Você pode declarar uma classe interna dentro do corpo de um método. Essas classes são conhecidas como classes locais. Você também pode declarar uma classe interna dentro do corpo de um método sem nomear a classe. Essas classes são conhecidas como classes anônimas.

### Modificadores

Você pode usar os mesmos modificadores para classes internas que você usa para outros membros da classe externa. Por exemplo, você pode usar os especificadores de acesso `private`, `public` e `protected` para restringir o acesso a classes internas, assim como você os usa para restringir o acesso a outros membros da classe.

## Classes Locais

Classes locais são classes que são definidas em um bloco, que é um grupo de zero ou mais instruções entre chaves balanceadas. Você tipicamente encontra classes locais definidas no corpo de um método.

Esta seção aborda os seguintes tópicos:

  * Declarando Classes Locais
  * Acessando Membros de uma Classe Envolvente
  * Sombreamento e Classes Locais
  * Classes Locais São Semelhantes a Classes Internas

### Declarando Classes Locais

Você pode definir uma classe local dentro de qualquer bloco (veja Expressões, Instruções e Blocos para mais informações). Por exemplo, você pode definir uma classe local no corpo de um método, em um loop `for` ou em uma cláusula `if`.

O exemplo a seguir, `LocalClassExample`, valida dois números de telefone. Ele define a classe local `PhoneNumber` no método `validatePhoneNumber()`:

```java
public class LocalClassExample {

    static String regularExpression = "[^0-9]";

    public static void validatePhoneNumber(
        String phoneNumber1, String phoneNumber2) {

        final int numberLength = 10;

        // Valid in Java SE 7 and earlier
        // int numberLength = 10;

        class PhoneNumber {

            String formattedPhoneNumber = null;

            PhoneNumber(String phoneNumber) {
                // numberLength = 7;
                String currentNumber = phoneNumber.replaceAll(
                  regularExpression, "");
                if (currentNumber.length() == numberLength)
                    formattedPhoneNumber = currentNumber;
                else
                    formattedPhoneNumber = null;
            }

            public String getNumber() {
                return formattedPhoneNumber;
            }

            // Valid in Java SE 8 and later:

            public void printOriginalNumbers() {
                System.out.println("Original numbers are " + phoneNumber1 +
                    " and " + phoneNumber2);
            }
        }

        PhoneNumber myNumber1 = new PhoneNumber(phoneNumber1);
        PhoneNumber myNumber2 = new PhoneNumber(phoneNumber2);

        // Valid in Java SE 8 and later:
        myNumber1.printOriginalNumbers();

        if (myNumber1.getNumber() == null)
            System.out.println("First number is invalid");
        else
            System.out.println("First number is " + myNumber1.getNumber());
        if (myNumber2.getNumber() == null)
            System.out.println("Second number is invalid");
        else
            System.out.println("Second number is " + myNumber2.getNumber());

    }

    public static void main(String... args) {
        validatePhoneNumber("123-456-7890", "456-7890");
    }
}
```

O exemplo valida um número de telefone primeiro removendo todos os caracteres do número de telefone, exceto os dígitos de 0 a 9. Depois, ele verifica se o número de telefone contém exatamente dez dígitos (o comprimento de um número de telefone na América do Norte). Este exemplo imprime o seguinte:

```
Original numbers are 123-456-7890 and 456-7890
First number is 1234567890
Second number is invalid
```

### Acessando Membros de uma Classe Envolvente

Uma classe local tem acesso aos membros de sua classe envolvente. No exemplo anterior, o construtor `PhoneNumber()` acessa o membro `LocalClassExample.regularExpression`.

Além disso, uma classe local tem acesso a variáveis locais. No entanto, uma classe local só pode acessar variáveis locais que são declaradas `final`. Quando uma classe local acessa uma variável local ou parâmetro do bloco envolvente, ela captura essa variável ou parâmetro. Por exemplo, o construtor `PhoneNumber()` pode acessar a variável local `numberLength` porque ela é declarada `final`; `numberLength` é uma variável capturada.

No entanto, a partir do Java SE 8, uma classe local pode acessar variáveis locais e parâmetros do bloco envolvente que são `final` ou _efetivamente final_. Uma variável ou parâmetro cujo valor nunca é alterado após ser inicializado é _efetivamente final_. Por exemplo, suponha que a variável `numberLength` não seja declarada `final`, e você adicione a instrução de atribuição destacada no construtor `PhoneNumber()` para alterar o comprimento de um número de telefone válido para 7 dígitos:

```java
        class PhoneNumber {

            String formattedPhoneNumber = null;

            PhoneNumber(String phoneNumber) {
                numberLength = 7;
                String currentNumber = phoneNumber.replaceAll(
                  regularExpression, "");
                if (currentNumber.length() == numberLength)
                    formattedPhoneNumber = currentNumber;
                else
                    formattedPhoneNumber = null;
            }
```

Devido a esta instrução de atribuição, a variável `numberLength` não é mais efetivamente final. Como resultado, o compilador Java gera uma mensagem de erro semelhante a "local variables referenced from an inner class must be final or effectively final" onde a classe interna `PhoneNumber` tenta acessar a variável `numberLength`:

```
LocalClassExample.java:24: error: local variables referenced from an inner class must be final or effectively final
                numberLength = 7;
                ^
```

A partir do Java SE 8, se você declarar a classe local em um método, ela pode acessar os parâmetros do método. Por exemplo, você pode definir o seguinte método na classe local `PhoneNumber`:

```java
            public void printOriginalNumbers() {
                System.out.println("Original numbers are " + phoneNumber1 +
                    " and " + phoneNumber2);
            }
```

O método `printOriginalNumbers()` acessa os parâmetros `phoneNumber1` e `phoneNumber2` do método `validatePhoneNumber()`.

Declarações de um tipo (como uma variável) em uma classe local sombreiam declarações no escopo envolvente que têm o mesmo nome. Veja Sombreamento para mais informações.

### Classes Locais São Semelhantes a Classes Internas

Classes locais são semelhantes a classes internas porque não podem definir ou declarar nenhum membro `static`. Classes locais em métodos `static`, como a classe `PhoneNumber`, que é definida no método `static` `validatePhoneNumber()`, só podem se referir a membros `static` da classe envolvente. Por exemplo, se você não definir a variável membro `regularExpression` como `static`, então o compilador Java gera um erro semelhante a "non-static variable regularExpression cannot be referenced from a static context".

Classes locais são não-estáticas porque têm acesso a membros de instância do bloco envolvente. Consequentemente, elas não podem conter a maioria dos tipos de declarações `static`.

Você não pode declarar uma `interface` dentro de um bloco; `interfaces` são inerentemente `static`. Por exemplo, o trecho de código a seguir não compila porque a `interface` `HelloThere` é definida dentro do corpo do método `greetInEnglish()`:

```java
public void greetInEnglish() {
    interface HelloThere {
        public void greet();
    }
    // ...
}
```

Você não pode declarar inicializadores `static` ou `interfaces` membro em uma classe local. O trecho de código a seguir não compila porque o método `EnglishGoodbye.sayGoodbye()` é declarado `static`. O compilador gera um erro semelhante a "modifier `static` is only allowed in constant variable declaration" quando encontra esta definição de método:

```java
public void greetInEnglish() {
    class EnglishGoodbye {
        public static void sayGoodbye() {
            System.out.println("Bye bye");
        }
    }
    // ...
}
```

Uma classe local pode ter membros `static` desde que sejam variáveis constantes. (Uma variável constante é uma variável de tipo primitivo ou tipo `String` que é declarada `final` e inicializada com uma expressão constante em tempo de compilação. Uma expressão constante em tempo de compilação é tipicamente uma string ou uma expressão aritmética que pode ser avaliada em tempo de compilação. Veja Entendendo Membros de Classe para mais informações.) O trecho de código a seguir compila porque o membro `static` `EnglishGoodbye.farewell` é uma variável constante:

```java
public void greetInEnglish() {
    class EnglishGoodbye {
        public static final String farewell = "Bye bye";
        public String sayGoodbye() {
            return farewell;
        }
    }
    // ...
}
```

## Classes Anônimas

Classes anônimas permitem que você torne seu código mais conciso. Elas permitem que você declare e instancie uma classe ao mesmo tempo. Elas são como classes locais, exceto que não têm um nome. Use-as se precisar usar uma classe local apenas uma vez.

### Declarando Classes Anônimas

Enquanto classes locais são declarações de classe, classes anônimas são expressões, o que significa que você define a classe em outra expressão. O exemplo a seguir, `HelloWorldAnonymousClasses`, usa classes anônimas nas instruções de inicialização das variáveis locais `frenchGreeting` e `spanishGreeting`, mas usa uma classe local para a inicialização da variável `englishGreeting`:

```java
public class HelloWorldAnonymousClasses {

    interface HelloWorld {
        public void greet();
        public void greetSomeone(String someone);
    }

    public void sayHello() {

        class EnglishGreeting implements HelloWorld {
            String name = "world";
            public void greet() {
                greetSomeone("world");
            }
            public void greetSomeone(String someone) {
                name = someone;
                System.out.println("Hello " + name);
            }
        } // end of EnglishGreeting local class

        HelloWorld englishGreeting = new EnglishGreeting();

        HelloWorld frenchGreeting = new HelloWorld() {
            String name = "tout le monde";
            public void greet() {
                greetSomeone("tout le monde");
            }
            public void greetSomeone(String someone) {
                name = someone;
                System.out.println("Salut " + name);
            }
        }; // end of anonymous class

        HelloWorld spanishGreeting = new HelloWorld() {
            String name = "mundo";
            public void greet() {
                greetSomeone("mundo");
            }
            public void greetSomeone(String someone) {
                name = someone;
                System.out.println("Hola " + name);
            }
        }; // end of anonymous class

        englishGreeting.greet();
        frenchGreeting.greetSomeone("Fred");
        spanishGreeting.greet();
    }

    public static void main(String... args) {
        HelloWorldAnonymousClasses myApp =
            new HelloWorldAnonymousClasses();
        myApp.sayHello();
    }
}
```

### Sintaxe de Classes Anônimas

Como mencionado anteriormente, uma classe anônima é uma expressão. A sintaxe de uma expressão de classe anônima é como a invocação de um construtor, exceto que há uma definição de classe contida em um bloco de código.

Considere a instanciação do objeto `frenchGreeting`:

```java
        HelloWorld frenchGreeting = new HelloWorld() {
            String name = "tout le monde";
            public void greet() {
                greetSomeone("tout le monde");
            }
            public void greetSomeone(String someone) {
                name = someone;
                System.out.println("Salut " + name);
            }
        };
```

A expressão de classe anônima consiste no seguinte:

  * O operador `new`
  * O nome de uma `interface` a ser implementada ou uma classe a ser estendida. Neste exemplo, a classe anônima está implementando a `interface` `HelloWorld`.
  * Parênteses que contêm os argumentos para um construtor, assim como uma expressão normal de criação de instância de classe. Nota: Quando você implementa uma `interface`, não há construtor, então você usa um par de parênteses vazio, como neste exemplo.
  * Um corpo, que é um corpo de declaração de classe. Mais especificamente, no corpo, declarações de método são permitidas, mas instruções não.
  * Como uma definição de classe anônima é uma expressão, ela deve fazer parte de uma instrução. Neste exemplo, a expressão de classe anônima faz parte da instrução que instancia o objeto `frenchGreeting`. (Isso explica por que há um ponto e vírgula após a chave de fechamento.)

### Acessando Variáveis Locais do Escopo Envolvente, e Declarando e Acessando Membros da Classe Anônima

Assim como as classes locais, as classes anônimas podem capturar variáveis; elas têm o mesmo acesso a variáveis locais do escopo envolvente:

  * Uma classe anônima tem acesso aos membros de sua classe envolvente.
  * Uma classe anônima não pode acessar variáveis locais em seu escopo envolvente que não são declaradas como `final` ou efetivamente `final`.
  * Assim como uma classe aninhada, uma declaração de um tipo (como uma variável) em uma classe anônima sombreia quaisquer outras declarações no escopo envolvente que tenham o mesmo nome. Veja Sombreamento para mais informações.

Classes anônimas também têm as mesmas restrições que as classes locais em relação aos seus membros:

  * Você não pode declarar inicializadores `static` ou `interfaces` membro em uma classe anônima.
  * Uma classe anônima pode ter membros `static` desde que sejam variáveis constantes.

Observe que você pode declarar o seguinte em classes anônimas:

  * Campos
  * Métodos extras (mesmo que não implementem nenhum método do supertipo)
  * Inicializadores de instância
  * Classes locais

No entanto, você não pode declarar construtores em uma classe anônima.

### Neste tutorial

*   Classes Aninhadas
*   Exemplo de Classe Interna
*   Classes Locais
*   Classes Anônimas

Última atualização: 23 de setembro de 2021

**Anterior na Série**

[Mais sobre Classes](<#/doc/tutorials/classes-objects/more-on-classes>)

➜

**Tutorial Atual**

Classes Aninhadas

➜

**Próximo na Série**

[Enums](<#/doc/tutorials/classes-objects/enums>)

**Anterior na Série:** [Mais sobre Classes](<#/doc/tutorials/classes-objects/more-on-classes>)

**Próximo na Série:** [Enums](<#/doc/tutorials/classes-objects/enums>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Classes e Objetos ](<#/doc/tutorials/classes-objects>) > Classes Aninhadas