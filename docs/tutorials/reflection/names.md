# Lendo Nomes de Classes

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Reflection ](<#/doc/tutorials/reflection>) > Lendo Nomes de Classes

**Anterior na Série**

[Recuperando Classes](<#/doc/tutorials/reflection/classes>)

➜

**Tutorial Atual**

Lendo Nomes de Classes

➜

**Próximo na Série**

[Lendo Modificadores](<#/doc/tutorials/reflection/modifiers>)

**Anterior na Série:** [Recuperando Classes](<#/doc/tutorials/reflection/classes>)

**Próximo na Série:** [Lendo Modificadores](<#/doc/tutorials/reflection/modifiers>)

# Lendo Nomes de Classes

Todos os elementos aos quais a API Reflection dá acesso possuem nomes: classes, campos, métodos, construtores, ou parâmetros de métodos e construtores. Esta seção aborda a recuperação dos nomes de classes. A API Reflection define várias convenções para nomes de classes, todas elas abordadas nesta seção.

## Obtendo o Nome de uma Classe

Existem, na verdade, várias maneiras de obter o nome de uma classe. Os dois métodos que você provavelmente usará são [`getCanonicalName()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getCanonicalName\(\)>) e [`getSimpleName()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getSimpleName\(\)>). O primeiro fornece o nome totalmente qualificado da classe, e o segundo fornece apenas o nome, sem o pacote.

No exemplo a seguir, onde a classe é explicitamente nomeada, o que você obtém é o que você espera.

```java
package com.example;

public class Main {
  public static void main(String... args) {
    System.out.println(Main.class.getCanonicalName());
    System.out.println(Main.class.getSimpleName());
  }
}
```

Isso imprime o seguinte no console.

```
com.example.Main
Main
```

Existem casos em que o nome da classe não aparece explicitamente em seu código, como você pode ver no exemplo a seguir.

```java
package com.example;

import java.util.function.Function;

public class Main {
  public static void main(String... args) {
    class LocalClass {}
    System.out.println(LocalClass.class.getCanonicalName());
    System.out.println(LocalClass.class.getSimpleName());

    System.out.println(new Object() {}.getClass().getCanonicalName());
    System.out.println(new Object() {}.getClass().getSimpleName());

    Function<String, String> f = s -> s;
    System.out.println(f.getClass().getCanonicalName());
    System.out.println(f.getClass().getSimpleName());
  }
}
```

O que você obtém neste caso são os nomes das classes em tempo de execução:

```
null
Main$1LocalClass
null
Main$1
null
Main$$Lambda$1/0x0000000800060800
```

## Nome Simples

O nome simples de uma classe é o nome como ele aparece no código-fonte.

```java
package com.example;

public class Main {
  public static void main(String... args) {
    System.out.println(Main.class.getSimpleName());
  }
}
```

Executar o exemplo anterior fornece o seguinte resultado.

```
Main
```

Nem todas as classes aparecem explicitamente no código-fonte. Este é o caso para classes anônimas e expressões lambda.

Aqui está o nome simples de uma classe anônima. De fato, classes anônimas não possuem um nome simples.

```java
package com.example;

public class Main {
  public static void main(String... args) {
    System.out.println(new Object() {}.getClass().getSimpleName());
  }
}
```

O resultado é o seguinte.

```
```

Você também pode imprimir o nome simples de uma classe que representa uma expressão lambda.

```java
package com.example;

import java.util.function.Function;

public class Main {
  public static void main(String... args) {
    Function<String, String> f = s -> s;
    System.out.println(f.getClass().getSimpleName());
  }
}
```

Executar o exemplo anterior imprime o seguinte. Observe que `Main` é o nome simples da classe na qual esta lambda foi declarada. Portanto, pode variar.

```
Main$$Lambda$1/0x0000000800060800
```

## Nome Canônico

O nome canônico de uma classe é definido na especificação da linguagem. Em resumo, ele corresponde ao seu nome totalmente qualificado, ou seja, seu nome simples, prefixado pelo nome do seu pacote. Nem todas as classes possuem nomes canônicos. Este é o caso para classes locais, classes anônimas e classes ocultas que foram adicionadas no Java SE 15.

Quando uma classe não possui um nome canônico, o método [`getCanonicalName()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getCanonicalName\(\)>) retorna null.

Você pode executar os exemplos anteriores para exibir os nomes canônicos em vez dos nomes simples, e ver os resultados.

```java
package com.example;

import java.util.function.Function;

public class Main {
  public static void main(String... args) {
    class LocalClass {}
    System.out.println(LocalClass.class.getCanonicalName());

    System.out.println(new Object() {}.getClass().getCanonicalName());

    Function<String, String> f = s -> s;
    System.out.println(f.getClass().getCanonicalName());
  }
}
```

Executar o código anterior imprime o seguinte. Como você pode ver, classes anônimas e classes de expressões lambda não possuem um nome canônico.

```
null
null
null
```

## Nome do Tipo

O nome do tipo de uma classe é uma string informativa para esta classe. Este método é definido na interface [`Type`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Type.html>), adicionada no Java SE 8.

Vamos examinar os diferentes nomes de tipo para classes regulares, classes anônimas e lambdas, e ver a diferença com o nome canônico.

```java
package com.example;

import java.util.function.Function;

public class Main {
  public static void main(String... args) {
    class LocalClass {}
    System.out.println(LocalClass.class.getTypeName());

    System.out.println(new Object() {}.getClass().getTypeName());

    Function<String, String> f = s -> s;
    System.out.println(f.getClass().getTypeName());
  }
}
```

Executar o código anterior imprime o seguinte. Classes anônimas e classes de expressões lambda possuem um nome de tipo, que é o nome da classe criada pelo compilador para você.

```
com.example.Main$1LocalClass
com.example.Main$1
com.example.Main$$Lambda$1/0x0000000800060800
```

## Obtendo um Nome de Classe Com getName()

O [`Class.getName()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getName\(\)>) é mais uma maneira de obter o nome de uma classe. Ele retorna o nome da entidade (classe, interface, classe de array, tipo primitivo ou void) representada por este objeto [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>).

Para todas as classes que não representam arrays, chamar este método é o mesmo que chamar [`Class.getTypeName()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getTypeName\(\)>), abordado na seção anterior desta página. O comportamento é diferente para arrays, como você verá na próxima seção.

## Nome do Array

Objetos [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) também podem representar arrays, e arrays seguem certas convenções de nomenclatura. O nome simples, o nome do tipo e o nome canônico são diretos, como você pode ver no exemplo a seguir.

```java
package com.example;

public class Main {
  public static void main(String... args) {
    System.out.println(int[].class.getSimpleName());
    System.out.println(int[].class.getTypeName());
    System.out.println(int[].class.getCanonicalName());
  }
}
```

Executar o código anterior imprime o seguinte.

```
int[]
int[]
int[]
```

O nome que você obtém de [`Class.getName()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getName\(\)>) segue uma convenção diferente, como você pode ver no exemplo a seguir.

```java
package com.example;

public class Main {
  public static void main(String... args) {
    System.out.println(int[].class.getName());
    System.out.println(int[][].class.getName());
    System.out.println(String[].class.getName());
  }
}
```

Executar o código anterior imprime o seguinte.

```
[I
[[I
[Ljava.lang.String;
```

A convenção é a seguinte, e é precisamente descrita no Javadoc do método [`Class.getName()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getName\(\)>).

O nome de um array consiste em tantos caracteres de colchete de abertura (`[`) quanto houver arrays aninhados.

Se o tipo do array for um tipo primitivo, então a seguinte tabela é usada para codificar este tipo primitivo. Observe que `long` é codificado com um `J`, não um `L`.

Tipo primitivo | Codificação
---|---
boolean | Z
byte | B
short | S
int | I
long | J
char | C
float | F
double | D

Se o tipo do array for um tipo de referência de nome _N_ , então a codificação é um `L`, seguido pelo nome deste tipo, seguido pelo caractere `;`.

Vamos examinar os dois exemplos simples.

```java
package com.example;

public class Main {
  public static void main(String... args) {
    System.out.println(boolean[].class.getName());
    System.out.println(long[].class.getName());
  }
}
```

Executar o código anterior imprime o seguinte.

```
[Z
[J
```

Observe que, no caso de arrays, você pode usar a string retornada por este método para obter a classe deste array, como você pode ver no exemplo a seguir.

```java
package com.example;

public class Main {
  public static void main(String... args) throws ClassNotFoundException {
    System.out.println(Class.forName("[I"));
    System.out.println(Class.forName("[Ljava.lang.String;"));
  }
}
```

Executar o código anterior imprime o seguinte.

```
class [I
class [Ljava.lang.String;
```

Mais adiante na série, você aprenderá como usar esta classe para criar um array deste tipo.

### Neste tutorial

Obtendo o Nome de uma Classe Nome Simples Nome Canônico Nome do Tipo Obtendo um Nome de Classe Com getName() Nome do Array

Última atualização: 19 de julho de 2024

**Anterior na Série**

[Recuperando Classes](<#/doc/tutorials/reflection/classes>)

➜

**Tutorial Atual**

Lendo Nomes de Classes

➜

**Próximo na Série**

[Lendo Modificadores](<#/doc/tutorials/reflection/modifiers>)

**Anterior na Série:** [Recuperando Classes](<#/doc/tutorials/reflection/classes>)

**Próximo na Série:** [Lendo Modificadores](<#/doc/tutorials/reflection/modifiers>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Reflection ](<#/doc/tutorials/reflection>) > Lendo Nomes de Classes