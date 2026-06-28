# Invocando Métodos

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Reflexão ](<#/doc/tutorials/reflection>) > Invocando Métodos

**Anterior na Série**

[Lendo e Escrevendo Campos](<#/doc/tutorials/reflection/fields>)

➜

**Tutorial Atual**

Invocando Métodos

➜

**Próximo na Série**

[Invocando Construtores](<#/doc/tutorials/reflection/constructors>)

**Anterior na Série:** [Lendo e Escrevendo Campos](<#/doc/tutorials/reflection/fields>)

**Próximo na Série:** [Invocando Construtores](<#/doc/tutorials/reflection/constructors>)

# Invocando Métodos

Um objeto [`Method`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html>) permite obter mais informações sobre o método correspondente: seu tipo e seus modificadores, os tipos e nomes de seus parâmetros, e permite invocá-lo em um determinado objeto, passando os argumentos necessários. Esta seção também aborda como você pode descobrir métodos em uma classe.

## Localizando Métodos

Existem duas categorias de métodos fornecidos em [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) para acessar métodos.

1.  Primeiro, você pode procurar por um método específico. Esses métodos supõem que você tenha um nome para o método que está procurando e o tipo de seus parâmetros.
2.  Segundo, você pode procurar por todos os métodos declarados nesta classe, ou pelos métodos declarados nesta classe e em todas as suas superclasses, até a classe [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>). No primeiro caso, você obterá todos os métodos: `public`, `protected`, `default (package) access` e `private`. No segundo caso, você obterá apenas os métodos `public`.

As tabelas a seguir fornecem um resumo de todos os métodos de localização de membros e suas características.

API da Classe | Array de métodos? | Métodos herdados? | Métodos privados?
---|---|---|---
[`getDeclaredMethod(String, Class...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getDeclaredMethod\(java.lang.String,java.lang.Class...\)>) | não | não | sim
[`getMethod(String, Class...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getMethod\(java.lang.String,java.lang.Class...\)>) | não | sim | não
[`getDeclaredMethods()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getDeclaredMethods\(\)>) | sim | não | sim
[`getMethods()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getMethods\(\)>) | sim | sim | não

Vamos ver isso em ação. Suponha que você tenha a seguinte classe.

```java
class User {
    private String name;

    public User(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return "User{" +
               "name='" + name + '\'' +
               '}';
    }

    private void printName() {
        System.out.println(name);
    }
}
```

Primeiro, vamos executar o seguinte código, que obtém todos os métodos `public` da classe `User` e de todas as suas superclasses.

```java
import java.lang.reflect.Method;
import java.util.Arrays;

public class MethodDiscovery {
    public static void main(String[] args) {
        Class<User> userClass = User.class;
        Method[] publicMethods = userClass.getMethods();
        Arrays.stream(publicMethods)
              .forEach(System.out::println);
    }
}
```

A execução do código anterior imprime o seguinte. Como você pode ver, existem os dois métodos de `User`: `getName()` e `toString()`, e os métodos da classe `Object`, além do método `toString()`, que é definido na classe `User`. Se você remover o método `toString()` da classe `User`, então você verá o `toString()` da classe `Object` nesta lista.

```
public java.lang.String User.getName()
public java.lang.String User.toString()
public final native void java.lang.Object.wait(long) throws java.lang.InterruptedException
public final void java.lang.Object.wait(long,int) throws java.lang.InterruptedException
public final void java.lang.Object.wait() throws java.lang.InterruptedException
public boolean java.lang.Object.equals(java.lang.Object)
public native int java.lang.Object.hashCode()
public final native java.lang.Class java.lang.Object.getClass()
public final native void java.lang.Object.notify()
public final native void java.lang.Object.notifyAll()
```

Vamos agora executar o seguinte código, que está chamando [`Class.getDeclaredMethods()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getDeclaredMethods\(\)>) para obter todos os métodos da classe `User`.

```java
import java.lang.reflect.Method;
import java.util.Arrays;

public class DeclaredMethodDiscovery {
    public static void main(String[] args) {
        Class<User> userClass = User.class;
        Method[] declaredMethods = userClass.getDeclaredMethods();
        Arrays.stream(declaredMethods)
              .forEach(System.out::println);
    }
}
```

A execução do código anterior imprime o seguinte. Desta vez, apenas os métodos declarados na classe `User` estão presentes, incluindo os métodos `private`.

```
public java.lang.String User.getName()
public java.lang.String User.toString()
private void User.printName()
public User(java.lang.String)
```

## Obtendo o Tipo de Retorno de um Método

O tipo de retorno de um método é modelado da mesma forma que o tipo de um [`Field`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html>). O método [`Method.getReturnType()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html#getReturnType\(\)>) fornece o tipo como um objeto [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>), e o [`Method.getGenericReturnType()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html#getGenericReturnType\(\)>) retorna um objeto [`Type`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Type.html>) do qual você pode obter informações sobre o tipo genérico.

Vamos ver esses dois métodos em ação na interface [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>).

Primeiro, você pode obter uma referência para o método [`List.get(int)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#get\(int\)>). Este método retorna o elemento da lista com o índice que você passou como argumento. O tipo de retorno deste método é o tipo de parâmetro da lista que você declarou.

```java
import java.lang.reflect.Method;
import java.lang.reflect.Type;
import java.util.List;

public class MethodReturnType {
    public static void main(String[] args) throws NoSuchMethodException {
        Method getMethod = List.class.getMethod("get", int.class);
        System.out.println("Return Type: " + getMethod.getReturnType());
        System.out.println("Generic Return Type: " + getMethod.getGenericReturnType());
    }
}
```

Observe que usamos a classe `int.class` para denotar o tipo `int` do parâmetro que o método `List.get(index)` recebe. Usar o tipo `Integer.class` teria lançado uma [`NoSuchMethodException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NoSuchMethodException.html>).

A execução do exemplo anterior fornece o seguinte.

```
Return Type: class java.lang.Object
Generic Return Type: E
```

Como você pode ver, o [`Method.getReturnType()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html#getReturnType\(\)>) fornece o tipo bruto que este método retornou, enquanto o [`Method.getGenericReturnType()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html#getGenericReturnType\(\)>) fornece a informação de que é, de fato, o tipo de parâmetro da interface [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>).

Vamos testá-lo com outro método: [`List.of()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html#of\(E...\)>).

```java
import java.lang.reflect.Method;
import java.util.List;

public class MethodReturnType2 {
    public static void main(String[] args) throws NoSuchMethodException {
        Method ofMethod = List.class.getMethod("of", Object[].class);
        System.out.println("Return Type: " + ofMethod.getReturnType());
        System.out.println("Generic Return Type: " + ofMethod.getGenericReturnType());
    }
}
```

A execução deste exemplo fornece o seguinte.

```
Return Type: class java.util.List
Generic Return Type: java.util.List<E>
```

## Obtendo os Parâmetros de um Método

A classe [`Method`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html>) oferece acesso aos parâmetros de um determinado método, incluindo seus nomes.

### Obtendo os Nomes dos Parâmetros de um Método

Você pode obter os nomes dos parâmetros formais de qualquer método ou construtor (abordado na [próxima seção](<#/doc/tutorials/reflection/constructors>)) com o método [`getParameters()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Executable.html#getParameters\(\)>). As classes [`Method`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html>) e [`Constructor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Constructor.html>) estendem a classe [`Executable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Executable.html>) e, portanto, herdam este método. No entanto, os arquivos `.class` não armazenam nomes de parâmetros formais por padrão. Isso ocorre porque muitas ferramentas que produzem e consomem arquivos de classe podem não esperar a pegada estática e dinâmica maior de arquivos `.class` que contêm nomes de parâmetros. Em particular, essas ferramentas teriam que lidar com arquivos `.class` maiores, e a Java Virtual Machine (JVM) usaria mais memória. Além disso, alguns nomes de parâmetros, como `secret` ou `password`, podem expor informações sobre métodos sensíveis à segurança.

Para armazenar nomes de parâmetros formais em um arquivo `.class` específico e, assim, permitir que a API de Reflexão recupere nomes de parâmetros formais, compile o arquivo fonte com a opção `-parameters` para o compilador `javac`. Você pode encontrar mais informações sobre o compilador `javac` nesta [seção](<#/doc/tutorials/jvm/tools/core/javac>).

### Obtendo o Tipo de Retorno de um Método

O tipo de retorno de um método é modelado da mesma forma que o tipo de um [`Field`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html>). O método [`Method.getReturnType()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html#getReturnType\(\)>) fornece o tipo como um objeto [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>), e o [`Method.getGenericReturnType()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html#getGenericReturnType\(\)>) retorna um [`Type`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Type.html>) do qual você pode obter informações sobre o tipo genérico.

## Obtendo as Exceções de um Método

A classe [`Method`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html>) oferece acesso às exceções declaradas de um método. Essas exceções são retornadas em um array, que pode ser de dois tipos: um array de instâncias [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>), ou um array de instâncias [`Type`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Type.html>). Como de costume, o objeto [`Type`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Type.html>) pode fornecer informações sobre um tipo de parâmetro.

Vamos descobrir as inúmeras exceções lançadas pelo método [`Constructor.newInstance()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Constructor.html#newInstance\(java.lang.Object...\)>), que faz parte da API de Reflexão. Observe como você pode denotar um array do tipo [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>), com a sintaxe `Object[].class`.

```java
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.Arrays;

public class MethodExceptions {
    public static void main(String[] args) throws NoSuchMethodException {
        Method newInstanceMethod = Constructor.class.getMethod("newInstance", Object[].class);
        Arrays.stream(newInstanceMethod.getExceptionTypes())
              .forEach(System.out::println);
    }
}
```

A execução deste exemplo produz o seguinte:

```
class java.lang.InstantiationException
class java.lang.IllegalAccessException
class java.lang.IllegalArgumentException
class java.lang.reflect.InvocationTargetException
```

Você pode executar o mesmo código usando o outro padrão, que retorna um array de objetos [`Type`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Type.html>). Observe que, nesse caso, você está chamando [`Method.getGenericExceptionTypes()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html#getGenericExceptionTypes\(\)>).

```java
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.Arrays;

public class MethodGenericExceptions {
    public static void main(String[] args) throws NoSuchMethodException {
        Method newInstanceMethod = Constructor.class.getMethod("newInstance", Object[].class);
        Arrays.stream(newInstanceMethod.getGenericExceptionTypes())
              .forEach(System.out::println);
    }
}
```

O resultado impresso no console é o mesmo.

```
class java.lang.InstantiationException
class java.lang.IllegalAccessException
class java.lang.IllegalArgumentException
class java.lang.reflect.InvocationTargetException
```

## Recuperando Modificadores de Método

Os modificadores de um método funcionam da mesma forma que os modificadores de uma classe ou de um campo. O método [`Method.getModifiers()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html#getModifiers\(\)>) retorna um `int` no qual cada `bit` representa um único modificador. Por exemplo, se o `bit 0` estiver definido, significa que este método é `public`. Se o `bit 3` estiver definido, então este método é `static`.

Você pode ler os modificadores do método [`String.join()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#join\(java.lang.CharSequence,java.lang.Iterable\)>) com o seguinte código.

```java
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

public class MethodModifiers {
    public static void main(String[] args) throws NoSuchMethodException {
        Method joinMethod = String.class.getMethod("join", CharSequence.class, Iterable.class);
        int modifiers = joinMethod.getModifiers();
        System.out.println("Modifiers as int: " + modifiers);
    }
}
```

Este código imprime o seguinte no console.

```
Modifiers as int: 9
```

Você também pode usar os `access flags`, abordados nesta [seção](<#/doc/tutorials/reflection/modifiers>).

```java
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

public class MethodModifiers2 {
    public static void main(String[] args) throws NoSuchMethodException {
        Method joinMethod = String.class.getMethod("join", CharSequence.class, Iterable.class);
        int modifiers = joinMethod.getModifiers();
        System.out.println("Is public: " + Modifier.isPublic(modifiers));
        System.out.println("Is static: " + Modifier.isStatic(modifiers));
        System.out.println("Is final: " + Modifier.isFinal(modifiers));
    }
}
```

Este código imprime o seguinte no console.

```
Is public: true
Is static: true
Is final: false
```

## Invocando um Método

Até agora você aprendeu que um método pode ser modelado por uma instância de objeto da classe [`Method`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html>), e que você pode usar este objeto para obter informações sobre o método que ele modela, incluindo seu nome, parâmetros, tipo de retorno e as exceções que este método pode declarar.

Usando este objeto, você também pode invocar este método, passando argumentos e obtendo seu resultado. Se ele lançar exceções, você também pode capturá-las e analisá-las. Este recurso da classe [`Method`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html>) é amplamente utilizado em muitos frameworks, porque permite executar um método a partir de elementos que são descobertos.

Um método pode ser invocado usando seu método `invoke()`, que recebe dois parâmetros.

*   O primeiro é o objeto no qual você deseja invocar o método.
*   O segundo é, na verdade, um `vararg`, então você pode passar qualquer número de argumentos com esta declaração, até mesmo nenhum argumento. Este `vararg` recebe os parâmetros que você precisa passar para o método que está invocando. Você pode obter mais informações sobre este recurso de argumento variável nesta [página](<#/doc/tutorials/classes-objects/calling-methods-constructors>).

Se o método que você está invocando não recebe nenhum parâmetro, então você precisa chamar o método `invoke()` com apenas um argumento: o objeto no qual você está invocando este método. Por outro lado, se o método que você está invocando recebe dois parâmetros, então sua invocação do método `invoke()` precisa de três argumentos: o objeto no qual você está invocando este método, e os dois argumentos que este método recebe.

### Obtendo o Resultado de um Método Invocado

Vamos começar com um exemplo simples. Suponha que você queira obter o comprimento de uma string de caracteres usando a API de Reflexão. O método `String.length()` não recebe nenhum parâmetro, o que torna a invocação deste método mais fácil. Tudo o que você precisa fazer é chamar o método [`invoke()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html#invoke\(java.lang.Object,java.lang.Object...\)>) da classe [`Method`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html>), passando a ele a string na qual você deseja invocar o método `length()`.

```java
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class InvokeMethod {
    public static void main(String[] args) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        String text = "Hello, Reflection!";
        Method lengthMethod = String.class.getMethod("length");
        Object result = lengthMethod.invoke(text);
        System.out.println("Length: " + result);
    }
}
```

Observe que o método [`invoke()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html#invoke\(\)>) retorna um tipo `Object`, o que significa que você precisa fazer um `cast` do objeto retornado para o tipo correto, se você o conhece. A execução deste código imprime o seguinte:

```
Length: 18
```

### Passando Parâmetros para o Método Invocado

Os objetos e valores que você precisa passar para o método que você invoca podem ser passados para [`invoke()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html#invoke\(java.lang.Object,java.lang.Object...\)>) como argumentos adicionais. No exemplo a seguir, estamos chamando o método `substring()`, que recebe dois inteiros. Observe que existem duas sobrecargas do método `String.substring()`, uma que recebe um `int`, e a outra que recebe dois. Aqui estamos obtendo a segunda sobrecarga, passando os dois argumentos `int.class`.

```java
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class InvokeMethodWithParameters {
    public static void main(String[] args) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        String text = "Hello, Reflection!";
        Method substringMethod = String.class.getMethod("substring", int.class, int.class);
        Object result = substringMethod.invoke(text, 7, 18);
        System.out.println("Substring: " + result);
    }
}
```

O código anterior imprime o seguinte.

```
Substring: Reflection!
```

### Obtendo as Exceções Lançadas

Existem casos em que o método que você invoca usando a API de Reflexão pode lançar exceções das quais você precisa estar ciente. A API de Reflexão captura essas exceções para você e as encapsula em uma [`InvocationTargetException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/InvocationTargetException.html>) que você pode capturar e analisar.

Suponha que você precise abrir um arquivo para escrita usando a API de Reflexão, mas passe um arquivo que não pode ser aberto. Você pode fazer isso com o seguinte código.

```java
import java.io.BufferedWriter;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class InvokeMethodWithExceptions {
    public static void main(String[] args) throws NoSuchMethodException {
        Path path = Paths.get("/nonexistent/directory/file.txt"); // Path to a non-existent directory
        try {
            Method newBufferedWriterMethod = Files.class.getMethod("newBufferedWriter",
                                                                  Path.class,
                                                                  StandardCharsets.class,
                                                                  StandardOpenOption[].class); // Note the array type for varargs
            try (BufferedWriter writer = (BufferedWriter) newBufferedWriterMethod.invoke(null,
                                                                                         path,
                                                                                         StandardCharsets.UTF_8,
                                                                                         new StandardOpenOption[0])) { // Pass an empty array for varargs
                writer.write("Hello, Reflection!");
            }
        } catch (InvocationTargetException e) {
            System.err.println("Caught InvocationTargetException: " + e.getTargetException().getMessage());
        } catch (IllegalAccessException | IOException e) {
            System.err.println("Caught other exception: " + e.getMessage());
        }
    }
}
```

Observe que estamos usando o método [`Files.newBufferedWriter()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newBufferedWriter\(java.nio.file.Path,java.nio.charset.Charset,java.nio.file.OpenOption...\)>), que declara um argumento variável. Para obter tal método, você precisa considerar este argumento variável como um array, e passar um array vazio do tipo correto para a chamada `invoke()`.

Observe também que o [`Files.newBufferedWriter()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newBufferedWriter\(java.nio.file.Path,java.nio.charset.Charset,java.nio.file.OpenOption...\)>) é `static`. Portanto, você não o invoca em nenhum objeto. Nesse caso, o primeiro argumento passado para o método `invoke()` é `null`.

A abertura e o fechamento do `writer` (que é feito pelo uso desta instrução `try-with-resources`) lança uma [`IOException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOException.html>) que é capturada pela API de Reflexão e encapsulada em uma [`InvocationTargetException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/InvocationTargetException.html>). A classe [`InvocationTargetException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/InvocationTargetException.html>) possui um método [`getTargetException()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/InvocationTargetException.html#getTargetException\(\)>) que fornece esta exceção. Estamos usando este padrão neste exemplo. A execução dele fornecerá o seguinte.

```
Caught InvocationTargetException: /nonexistent/directory/file.txt (No such file or directory)
```

## Acessando Métodos Privados

Tentar invocar um método `private` de fora da classe, ou qualquer outro caso de um método não visível, lançará uma [`IllegalAccessException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IllegalAccessException.html>).

Você ainda pode obter acesso a tal método e invocá-lo, primeiro chamando [`method.setAccessible(true)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html#setAccessible\(boolean\)>) nele. Assim como para campos, existem restrições sobre os métodos que você pode tornar acessíveis. Você pode ler mais sobre este assunto na seção [Tornando um Campo, um Método ou um Construtor Acessível](<#/doc/tutorials/reflection/fields>).

Observe que chamar [`setAccessible(true)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html#setAccessible\(boolean\)>) em um método não o torna `public`. Isso apenas suprime as verificações de controle de acesso.

## Generics e Type Erasure

Você precisa ter em mente que a descoberta de um método depende de como este método foi compilado. Os parâmetros de tipo de um método são apagados em tempo de compilação, o que significa que você não pode usá-los com a API de Reflexão.

Considere o exemplo a seguir, onde você deseja acessar o método `add()` de um objeto `List`.

```java
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

public class GenericsAndTypeErasure {
    public static void main(String[] args) throws NoSuchMethodException {
        List<String> stringList = new ArrayList<>();
        // This will throw NoSuchMethodException
        Method addMethod = stringList.getClass().getMethod("add", String.class);
    }
}
```

Aqui você está tentando obter uma referência para o método `add()` da classe de um objeto do tipo `List<String>`. Este método declara um parâmetro `String`. Mas como este parâmetro tem, na verdade, o tipo `E` (que recebe o valor `String` neste exemplo), ele é apagado e tem, na verdade, o tipo `Object`.

Portanto, a execução deste código produz o seguinte resultado, porque não há método `add()` nesta classe que receba uma `String` como parâmetro.

```
Exception in thread "main" java.lang.NoSuchMethodException: java.util.ArrayList.add(java.lang.String)
	at java.base/java.lang.Class.getMethod(Class.java:2109)
	at GenericsAndTypeErasure.main(GenericsAndTypeErasure.java:9)
```

O código correto é o seguinte, que procura por um método que declara um parâmetro do tipo `Object`:

```java
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

public class GenericsAndTypeErasureCorrect {
    public static void main(String[] args) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        List<String> stringList = new ArrayList<>();
        Method addMethod = stringList.getClass().getMethod("add", Object.class);
        addMethod.invoke(stringList, "Hello");
        System.out.println(stringList);
    }
}
```

Você pode então invocar este método, passando uma string para ele. Mas ao fazer isso, você perde a segurança de tipo de chamar o método diretamente.

### Neste tutorial

Localizando Métodos Obtendo o Tipo de Retorno de um Método Obtendo os Parâmetros de um Método Obtendo as Exceções de um Método Recuperando Modificadores de Método Invocando um Método Acessando Métodos Privados Generics e Type Erasure

Última atualização: 19 de julho de 2024

**Anterior na Série**

[Lendo e Escrevendo Campos](<#/doc/tutorials/reflection/fields>)

➜

**Tutorial Atual**

Invocando Métodos

➜

**Próximo na Série**

[Invocando Construtores](<#/doc/tutorials/reflection/constructors>)

**Anterior na Série:** [Lendo e Escrevendo Campos](<#/doc/tutorials/reflection/fields>)

**Próximo na Série:** [Invocando Construtores](<#/doc/tutorials/reflection/constructors>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Reflexão ](<#/doc/tutorials/reflection>) > Invocando Métodos