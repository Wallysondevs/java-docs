# Recuperando Classes

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Reflection ](<#/doc/tutorials/reflection>) > Recuperando Classes

**Anterior na Série**

[Introduzindo a API de Reflection](<#/doc/tutorials/reflection/intro>)

➜

**Tutorial Atual**

Recuperando Classes

➜

**Próximo na Série**

[Lendo Nomes de Classes](<#/doc/tutorials/reflection/names>)

**Anterior na Série:** [Introduzindo a API de Reflection](<#/doc/tutorials/reflection/intro>)

**Próximo na Série:** [Lendo Nomes de Classes](<#/doc/tutorials/reflection/names>)

# Recuperando Classes

O ponto de entrada para todas as operações de reflection é [java.lang.Class](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>). Nenhuma das classes em [java.lang.reflect](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/package-summary.html>) que você precisa usar para obter acesso reflexivo a qualquer elemento de uma classe possui construtores públicos. A classe [java.lang.reflect.ReflectPermission](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/ReflectPermission.html>) é uma exceção, mas esta classe agora está descontinuada. Para acessar essas classes, é necessário invocar métodos apropriados em [Class](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>). Existem várias maneiras de obter uma [Class](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) dependendo se o código tem acesso a um objeto, ao nome da classe, a um tipo ou a uma [Class](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) existente.

Todo tipo é uma referência ou um primitivo. Classes, enums, records, lambdas e arrays (que todos herdam de [java.lang.Object](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>)) assim como interfaces são todos tipos de referência. Exemplos de tipos de referência incluem [java.lang.String](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>), todas as classes wrapper para tipos primitivos como [java.lang.Double](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Double.html>), a interface [java.io.Serializable](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Serializable.html>) e o enum [java.nio.file.StandardOpenOption](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardOpenOption.html>). Existe um conjunto fixo de tipos primitivos: `boolean`, `byte`, `short`, `int`, `long`, `char`, `float` e `double`.

Para cada tipo de objeto, a Java virtual machine instancia uma instância imutável de [java.lang.Class](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) que fornece métodos para examinar as propriedades de tempo de execução do objeto, incluindo seus membros e informações de tipo. A classe [java.lang.Class](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) também oferece a capacidade de criar novas classes e objetos. Mais importante, é o ponto de entrada para todas as APIs de Reflection. Esta seção explica como você pode recuperar a instância de [java.lang.Class](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) de que precisa.

## Obtendo a Class de um Objeto

Se uma instância de um objeto estiver disponível, a maneira mais simples de obter sua [Class](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) é invocar [Object.getClass()](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#getClass\(\)>). Claro, isso só funciona para tipos de referência que todos herdam de [Object](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>). Alguns exemplos seguem.

### Obtendo uma Classe Simples

O seguinte invoca o método [getClass()](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#getClass\(\)>) em uma instância da classe [String](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>). Ele retorna o objeto [Class](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) para a classe [String](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>).

```java
public class GetClassSimple {
    public static void main(String[] args) {
        String s = "Hello";
        Class<?> c = s.getClass();
        System.out.println(c);
    }
}
```

A execução do código anterior exibe o seguinte:

```
class java.lang.String
```

Observe que o método [`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#toString\(\)>) da classe [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) adiciona `class ` na frente do nome da classe.

Existe um console único associado à máquina virtual que é retornado pelo método estático [System.console()](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/System.html#console\(\)>). O valor retornado por [getClass()](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#getClass\(\)>) é a [Class](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) correspondente a [java.io.Console](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Console.html>).

```java
public class GetClassConsole {
    public static void main(String[] args) {
        Class<?> c = System.console().getClass();
        System.out.println(c);
    }
}
```

A execução do código anterior exibe o seguinte. Observe que [java.io.Console](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Console.html>) é uma classe sealed, com apenas uma extensão permitida: `ProxyingConsole`. Esta classe não é pública (você pode encontrá-la com sua IDE, por exemplo), então você não pode usá-la em seu código. Ela é fornecida a você em tempo de execução pelo JDK.

```
class jdk.internal.io.JdkConsoleImpl
```

### Obtendo uma Classe Enum

`SATURDAY` é uma instância do enum `Days`; assim, no exemplo a seguir [getClass()](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#getClass\(\)>) retorna a [Class](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) correspondente ao tipo de enumeração `Days`.

```java
public class GetClassEnum {
    enum Days {
        SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY
    }

    public static void main(String[] args) {
        Days d = Days.SATURDAY;
        Class<?> c = d.getClass();
        System.out.println(c);
    }
}
```

Observe que o que o código anterior exibe depende de como você declara sua enumeração: o pacote em que você a coloca e se você declara esta enumeração em sua própria classe, ou como uma classe local ou interna.

```
class GetClassEnum$Days
```

### Obtendo uma Classe Array

Como arrays são instâncias de [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>), também é possível invocar [getClass()](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#getClass\(\)>) em uma instância de um array. A [Class](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) retornada corresponde a um array com tipo de componente `byte`.

```java
public class GetClassArray {
    public static void main(String[] args) {
        byte[] bytes = new byte[1024];
        Class<?> c = bytes.getClass();
        System.out.println(c);
    }
}
```

A execução do exemplo anterior exibe o seguinte.

```
class [B
```

A string `[B` corresponde a um array de bytes. Ela usa uma sintaxe especial que abordaremos mais tarde nesta [seção](<#/doc/tutorials/reflection/names>).

### Obtendo uma Classe em Tempo de Execução

No caso a seguir, [java.util.Set](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) é uma interface para um objeto do tipo [java.util.HashSet](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html>). O valor retornado por [getClass()](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#getClass\(\)>) é a classe correspondente a [java.util.HashSet](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashSet.html>).

```java
import java.util.HashSet;
import java.util.Set;

public class GetClassRuntime {
    public static void main(String[] args) {
        Set<String> s = new HashSet<>();
        Class<?> c = s.getClass();
        System.out.println(c);
    }
}
```

A execução do exemplo anterior exibe o seguinte.

```
class java.util.HashSet
```

Observe que o tipo genérico deste set não está presente, devido à type erasure. Você verá uma maneira de obter o tipo genérico dos elementos mais tarde neste capítulo.

### Obtendo uma Classe Lambda

Expressões lambda também possuem classes que você pode obter, mesmo que provavelmente não seja aconselhável fazê-lo.

```java
import java.util.function.Function;

public class GetClassLambda {
    public static void main(String[] args) {
        Function<String, String> f = s -> s.toUpperCase();
        Class<?> c = f.getClass();
        System.out.println(c);
    }
}
```

A execução do exemplo anterior exibe o seguinte. Executá-lo em sua máquina pode produzir um resultado diferente.

```
class GetClassLambda$$Lambda/0x0000000800060800
```

### Obtendo uma Classe Anônima

Classes anônimas são classes criadas para você pelo compilador.

```java
public class GetClassAnonymous {
    public static void main(String[] args) {
        Object o = new Object() {
            public void m() {
            }
        };
        Class<?> c = o.getClass();
        System.out.println(c);
    }
}
```

A execução do exemplo anterior exibe o seguinte. Executá-lo em sua máquina pode produzir um resultado diferente.

```
class GetClassAnonymous$1
```

## A Sintaxe .class

Se o tipo estiver disponível, mas não houver uma instância, é possível obter uma [Class](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) anexando `.class` ao nome do tipo. Esta também é a maneira mais fácil de obter a [Class](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) para um tipo primitivo.

Chamar `getClass()` em um tipo primitivo resulta em um erro de tempo de compilação, como você pode ver no exemplo a seguir.

```java
public class DotClassPrimitive {
    public static void main(String[] args) {
        // boolean b = true;
        // Class<?> c = b.getClass(); // Compile-time error
        Class<?> c = boolean.class;
        System.out.println(c);
    }
}
```

Observe que a instrução `boolean.getClass()` produziria um erro de tempo de compilação porque um `boolean` é um tipo primitivo e não pode ser desreferenciado. A sintaxe `.class` retorna a [Class](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) correspondente ao tipo `boolean`.

A execução do exemplo anterior exibe o seguinte.

```
boolean
```

Você também pode usar esta sintaxe em tipos de referência. No exemplo a seguir, a variável `c` é a [Class](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) correspondente ao tipo [java.io.PrintStream](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html>).

```java
import java.io.PrintStream;

public class DotClassReference {
    public static void main(String[] args) {
        Class<?> c = PrintStream.class;
        System.out.println(c);
    }
}
```

A execução do exemplo anterior exibe o seguinte.

```
class java.io.PrintStream
```

A sintaxe `.class` pode ser usada para recuperar uma [Class](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) correspondente a um array multidimensional de um determinado tipo.

```java
public class DotClassArray {
    public static void main(String[] args) {
        Class<?> c = String[][].class;
        System.out.println(c);
    }
}
```

A execução do exemplo anterior exibe o seguinte.

```
class [[Ljava.lang.String;
```

Esta sintaxe especial é explicada mais tarde nesta [seção](<#/doc/tutorials/reflection/names>).

## O Método Class.forName()

Se o nome totalmente qualificado de uma classe estiver disponível, é possível obter a [Class](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) correspondente usando o método estático [Class.forName()](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#forName\(java.lang.String\)>). Isso não pode ser usado para tipos primitivos, mas pode ser usado para qualquer array, incluindo arrays de tipos primitivos. A sintaxe para nomes de classes de array é descrita por [Class.getName()](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getName\(\)>). Esta sintaxe é aplicável a referências e tipos primitivos.

Esta instrução retorna o objeto de classe a partir do nome totalmente qualificado fornecido. Se esta classe não existir, este método lança uma [ClassNotFoundException](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ClassNotFoundException.html>).

Aqui estão dois exemplos para um array simples e um array bidimensional.

```java
public class ForNameArray {
    public static void main(String[] args) throws ClassNotFoundException {
        Class<?> simpleDoubleArray = Class.forName("[D");
        System.out.println(simpleDoubleArray);
        Class<?> bidiStringArray = Class.forName("[[Ljava.lang.String;");
        System.out.println(bidiStringArray);
    }
}
```

A variável `simpleDoubleArray` conterá a [Class](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) correspondente a um array de tipo primitivo `double` (ou seja, o mesmo que `double[].class`). A variável `bidiStringArray` conterá a [Class](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) correspondente a um array bidimensional de [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) (ou seja, idêntico a `String[][].class`).

## O Método Class.forPrimitiveName()

Um método [`Class.forPrimitiveName()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#forPrimitiveName\(java.lang.String\)>) foi adicionado à classe [Class](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) no Java SE 22. Este método retorna a classe correspondente para qualquer tipo primitivo, incluindo `void`.

Aqui está um exemplo deste método em ação.

```java
public class ForPrimitiveName {
    public static void main(String[] args) {
        Class<?> c = Class.forPrimitiveName("int");
        System.out.println(c);
        c = Class.forPrimitiveName("void");
        System.out.println(c);
    }
}
```

A execução do exemplo anterior exibe o seguinte.

```
int
void
```

Este método retorna null se você passar uma string que não é um tipo primitivo, e lança uma [`NullPointerException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NullPointerException.html>) se você passar null.

## Recuperando um Tipo Primitivo de um Tipo Wrapper

Cada um dos tipos primitivos e `void` possui uma classe wrapper em [`java.lang`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/package-summary.html>) que é usada para o boxing de tipos primitivos para tipos de referência.

Por exemplo, a classe [`java.lang.Double`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Double.html>) envolve o tipo primitivo `double` sempre que um [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>) é necessário.

Cada classe wrapper contém um campo estático chamado `TYPE` que é igual à [Class](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) para o tipo primitivo que está sendo envolvido. Este campo é público e estático, então você pode usá-lo onde precisar.

Aqui está um exemplo de como você pode usar este campo `TYPE`.

```java
public class WrapperType {
    public static void main(String[] args) {
        Class<?> c = Double.TYPE;
        System.out.println(c);
    }
}
```

A execução do código anterior exibe o seguinte.

```
double
```

Você também pode usá-lo com o tipo [`Void`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Void.html>).

```java
public class VoidType {
    public static void main(String[] args) {
        Class<?> c = Void.TYPE;
        System.out.println(c);
    }
}
```

[`Void.TYPE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Void.html#TYPE>) é idêntico a `void.class`.

## Obtendo uma Classe de Outra Classe

Existem várias APIs de Reflection que retornam classes, mas estas só podem ser acessadas se uma [Class](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) já tiver sido obtida direta ou indiretamente.

### Obtendo a Superclasse de uma Classe

O método [`Class.getSuperclass()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getSuperclass\(\)>) retorna a única superclasse de uma dada classe. Ele retorna null para a classe [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>).

O código a seguir imprime as superclasses da classe [`NullPointerException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NullPointerException.html>).

```java
public class GetSuperclass {
    public static void main(String[] args) {
        Class<?> c = NullPointerException.class;
        while (c != null) {
            System.out.println(c);
            c = c.getSuperclass();
        }
    }
}
```

A execução do exemplo anterior imprime o seguinte.

```
class java.lang.NullPointerException
class java.lang.RuntimeException
class java.lang.Exception
class java.lang.Throwable
class java.lang.Object
```

### Obtendo as Interfaces Implementadas de uma Classe

O método [`Class.getInterfaces()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getInterfaces\(\)>) retorna um array das interfaces diretamente implementadas por uma dada classe. Ele não retorna nenhuma interface implementada pelos supertipos da classe dada. Se a classe dada for realmente uma interface, então ele retorna as interfaces diretamente estendidas pela interface dada.

Você pode testar este método com o código a seguir.

```java
import java.util.ArrayList;
import java.util.List;

public class GetInterfaces {
    public static void main(String[] args) {
        Class<?> c = ArrayList.class;
        Class<?>[] interfaces = c.getInterfaces();
        for (Class<?> i : interfaces) {
            System.out.println(i);
        }
    }
}
```

A execução do exemplo anterior fornece o seguinte resultado.

```
interface java.util.List
interface java.util.RandomAccess
interface java.lang.Cloneable
interface java.io.Serializable
```

Você também pode chamar este método em um tipo de array, como no exemplo a seguir.

```java
public class GetInterfacesArray {
    public static void main(String[] args) {
        Class<?> c = byte[].class;
        Class<?>[] interfaces = c.getInterfaces();
        for (Class<?> i : interfaces) {
            System.out.println(i);
        }
    }
}
```

O resultado é o seguinte.

```
interface java.lang.Cloneable
interface java.io.Serializable
```

Isso mostra duas coisas.

1.  Em tempo de execução, arrays são instâncias de [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>), e como tal, seu tipo estende o tipo [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>).
2.  Este tipo também implementa [`Cloneable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Cloneable.html>) e [`Serializable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Serializable.html>).

### Obtendo as Classes Membro Públicas de uma Classe

O método [`Class.getClasses()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getClasses\(\)>) retorna todas as classes, interfaces, records e enums públicos que são membros da classe e de todas as suas superclasses.

O exemplo a seguir mostra este método em ação na classe [`Character`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html>).

```java
public class GetClasses {
    public static void main(String[] args) {
        Class<?> c = Character.class;
        Class<?>[] classes = c.getClasses();
        for (Class<?> cl : classes) {
            System.out.println(cl);
        }
    }
}
```

A execução do exemplo anterior imprime o seguinte.

```
class java.lang.Character$Subset
class java.lang.Character$UnicodeBlock
class java.lang.Character$UnicodeScript
```

### Obtendo Todas as Classes Membro de uma Classe

O método [`Class.getDeclaredClasses()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getDeclaredClasses\(\)>) retorna um array de todas as classes membro desta classe, sejam elas públicas, protegidas, com proteção de pacote ou privadas. Classes membro herdadas não são retornadas.

Você pode testar este método na mesma classe [`Character`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html>) como anteriormente, com o código a seguir.

```java
public class GetDeclaredClasses {
    public static void main(String[] args) {
        Class<?> c = Character.class;
        Class<?>[] classes = c.getDeclaredClasses();
        for (Class<?> cl : classes) {
            System.out.println(cl);
        }
    }
}
```

E você pode ver que o resultado não é o mesmo. A classe `java.lang.Character$CharacterCache` está no array. É uma classe membro privada da classe [`Character`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html>). Ela não foi retornada anteriormente, porque o método [`Class.getClasses()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getClasses\(\)>) retorna apenas membros públicos.

```
class java.lang.Character$Subset
class java.lang.Character$UnicodeBlock
class java.lang.Character$UnicodeScript
class java.lang.Character$CharacterCache
```

### Obtendo a Classe Declaradora de uma Classe

O [`Class.getDeclaringClass()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getDeclaringClass\(\)>) retorna a classe na qual esta classe é declarada. Se esta classe não for uma classe membro de nenhuma classe, então este método retorna null.

O exemplo a seguir mostra este método em ação na classe [`Character.UnicodeBlock`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.UnicodeBlock.html>).

```java
public class GetDeclaringClass {
    public static void main(String[] args) {
        Class<?> c = Character.UnicodeBlock.class;
        System.out.println(c.getDeclaringClass());
    }
}
```

A execução do exemplo anterior imprime o seguinte. De fato, a classe [`Character.UnicodeBlock`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.UnicodeBlock.html>) é um membro da classe [`Character`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html>).

```
class java.lang.Character
```

Observe que a classe declarante de uma classe anônima é null, como você pode ver no exemplo a seguir.

```java
public class GetDeclaringClassAnonymous {
    public static void main(String[] args) {
        Object o = new Object() {
            public void m() {
            }
        };
        Class<?> c = o.getClass();
        System.out.println(c.getDeclaringClass());
    }
}
```

A execução deste código fornece o seguinte resultado.

```
null
```

### Obtendo a Classe Envolvente de uma Classe

O método [`Class.getEnclosingClass()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getEnclosingClass\(\)>) retorna a classe imediatamente envolvente de uma dada classe. Ele retorna null para uma classe que não é membro de nenhuma classe.

A classe envolvente pode ser a mesma ou diferente da classe declarante, e o exemplo a seguir demonstra ambos os casos.

```java
public class GetEnclosingClass {
    public class User {
        public void m() {
        }
    }

    public static void main(String[] args) {
        GetEnclosingClass outer = new GetEnclosingClass();
        Class<?> c = outer.new User().getClass();
        System.out.println(c.getDeclaringClass());
        System.out.println(c.getEnclosingClass());

        Object o = new Object() {
            public void m() {
            }
        };
        c = o.getClass();
        System.out.println(c.getDeclaringClass());
        System.out.println(c.getEnclosingClass());
    }
}
```

A execução do exemplo anterior imprime o seguinte.

```
class GetEnclosingClass
class GetEnclosingClass
null
class GetEnclosingClass
```

Para a classe interna `User`, chamar [`Class.getDeclaringClass()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getDeclaringClass\(\)>) e [`Class.getEnclosingClass()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getEnclosingClass\(\)>) retorna a mesma classe.

Para a classe anônima, o resultado da classe envolvente não é o mesmo que a classe declarante, que é null. A classe envolvente é a classe na qual a classe anônima é declarada.
## Obtendo a Classe Declaradora de um Membro de Classe

Campos, métodos e construtores são modelados por suas próprias classes na Reflection API: [`Field`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html>), [`Method`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html>) e [`Constructor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Constructor.html>). Todos eles implementam uma interface comum: [`Member`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Member.html>). Esta interface possui vários métodos, entre eles está o método [`Member.getDeclaringClass()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Member.html#getDeclaringClass\(\)>), que retorna a classe na qual o membro correspondente é declarado.

Campos, métodos e construtores são abordados em detalhes mais adiante neste capítulo, assim como os outros métodos da interface [`Member`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Member.html>).

### Neste tutorial

Obtendo a Classe de um Objeto
A Sintaxe .class
O Método Class.forName()
O Método Class.forPrimitiveName()
Recuperando um tipo primitivo de um tipo wrapper
Obtendo uma classe de outra classe
Obtendo a classe declaradora de um membro de classe

Última atualização: 19 de julho de 2024

**Anterior na Série**

[Introduzindo a Reflection API](<#/doc/tutorials/reflection/intro>)

➜

**Tutorial Atual**

Recuperando Classes

➜

**Próximo na Série**

[Lendo Nomes de Classes](<#/doc/tutorials/reflection/names>)

**Anterior na Série:** [Introduzindo a Reflection API](<#/doc/tutorials/reflection/intro>)

**Próximo na Série:** [Lendo Nomes de Classes](<#/doc/tutorials/reflection/names>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A Reflection API ](<#/doc/tutorials/reflection>) > Recuperando Classes