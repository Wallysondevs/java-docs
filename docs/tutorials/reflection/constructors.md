# Invocando Construtores

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Reflexão ](<#/doc/tutorials/reflection>) > Invocando Construtores

**Anterior na Série**

[Invocando Métodos](<#/doc/tutorials/reflection/methods>)

➜

**Tutorial Atual**

Invocando Construtores

➜

**Próximo na Série**

[Trabalhando com Arrays](<#/doc/tutorials/reflection/arrays>)

**Anterior na Série:** [Invocando Métodos](<#/doc/tutorials/reflection/methods>)

**Próximo na Série:** [Trabalhando com Arrays](<#/doc/tutorials/reflection/arrays>)

# Invocando Construtores

Um objeto [`Constructor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Constructor.html>) permite obter mais informações sobre o construtor correspondente: seus modificadores, os tipos e nomes de seus parâmetros, e permite invocá-lo para criar instâncias de objetos, passando os argumentos necessários. Esta seção também aborda como você pode descobrir construtores em uma classe.

## Localizando Construtores

Existem duas categorias de métodos fornecidos em [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) para acessar construtores.

1.  Primeiro, você pode procurar por um construtor específico. Esses métodos supõem que você tenha o tipo de seu parâmetro.
2.  Segundo, você pode procurar por todos os construtores que são declarados nesta classe. Nesse caso, você obterá todos os construtores: public, protected, default (acesso de pacote) e private. Ou você pode procurar apenas pelos construtores public.

Note que construtores não são herdados, então você não tem nenhum equivalente aos métodos que você viu em campos ou métodos, para localizar elementos em classes herdadas.

API da Classe | Array de construtores? | Construtores privados?
---|---|---
[`getDeclaredConstructor(Class...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getDeclaredConstructor\(java.lang.Class...\)>) | não | sim
[`getConstructor(Class...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getConstructor\(java.lang.Class...\)>) | não | não
[`getDeclaredConstructors()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getDeclaredConstructors\(\)>) | sim | sim
[`getConstructors()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getConstructors\(\)>) | sim | não

Uma declaração de construtor inclui o nome, modificadores, parâmetros e lista de exceções lançáveis. A classe [`java.lang.reflect.Constructor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Constructor.html>) fornece uma maneira de obter essas informações.

Vamos ver este método em ação. O código a seguir consulta os construtores da classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>).

```java
import java.lang.reflect.Constructor;
import java.util.Arrays;

public class ConstructorFinder {

    public static void main(String[] args) {
        Class<String> stringClass = String.class;
        Constructor<?>[] constructors = stringClass.getDeclaredConstructors();
        Arrays.stream(constructors).forEach(System.out::println);
    }
}
```

O código a seguir imprime os 19 construtores que você tem nesta classe no JDK 23. Note que nem todos são public.

A execução deste código produz o seguinte.

```
public java.lang.String()
public java.lang.String(java.lang.String)
public java.lang.String(char[])
public java.lang.String(char[],int,int)
public java.lang.String(int[],int,int)
public java.lang.String(byte[],int,int,java.lang.String) throws java.io.UnsupportedEncodingException
public java.lang.String(byte[],int,int,java.nio.charset.Charset)
public java.lang.String(byte[],java.lang.String) throws java.io.UnsupportedEncodingException
public java.lang.String(byte[],java.nio.charset.Charset)
public java.lang.String(byte[],int,int)
public java.lang.String(byte[])
public java.lang.String(java.lang.StringBuffer)
public java.lang.String(java.lang.StringBuilder)
java.lang.String(char[],boolean)
private java.lang.String(byte[],byte)
private java.lang.String(char[],int,int,java.lang.Void)
private java.lang.String(java.lang.AbstractStringBuilder,java.lang.Void)
private java.lang.String(java.lang.String,boolean)
private java.lang.String(byte[],int,int,java.nio.charset.Charset,java.lang.Void)
```

Você também pode localizar um construtor específico, por exemplo, aquele que recebe um array de bytes. Note que a sintaxe `byte[].class` é usada para denotar a classe que corresponde a um array de bytes.

```java
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

public class SpecificConstructorFinder {

    public static void main(String[] args) throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        Class<String> stringClass = String.class;
        Constructor<String> constructor = stringClass.getConstructor(byte[].class);
        System.out.println(constructor);
    }
}
```

A execução deste código produz o seguinte.

```
public java.lang.String(byte[])
```

## Obtendo os Parâmetros de um Construtor

A classe [`Constructor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Constructor.html>) dá acesso aos parâmetros de um dado construtor. Assim como para métodos, você pode obter acesso ao tipo bruto com o método [`Constructor.getParameterTypes()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Constructor.html#getParameterTypes\(\)>), ou ao tipo genérico, com o método [`Constructor.getGenericParameterTypes()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Constructor.html#getGenericParameterTypes\(\)>).

Vamos ver esses dois métodos em ação consultando os construtores da classe [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>).

Primeiro, vamos encontrar os tipos brutos dos parâmetros.

```java
import java.lang.reflect.Constructor;
import java.util.ArrayList;
import java.util.Arrays;

public class ConstructorParameters {

    public static void main(String[] args) {
        Class<ArrayList> arrayListClass = ArrayList.class;
        Constructor<?>[] constructors = arrayListClass.getConstructors();
        Arrays.stream(constructors).forEach(constructor -> {
            System.out.println("Constructor: " + constructor.getName());
            Class<?>[] parameterTypes = constructor.getParameterTypes();
            Arrays.stream(parameterTypes).forEach(paramType -> System.out.println("  Parameter Type: " + paramType.getName()));
        });
    }
}
```

A execução deste código produz o seguinte.

```
Constructor: java.util.ArrayList
  Parameter Type: int
Constructor: java.util.ArrayList
  Parameter Type: java.util.Collection
Constructor: java.util.ArrayList
```

Você pode obter os tipos genéricos com o código a seguir. Note que o método [`Constructor.getGenericParameterTypes()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Constructor.html#getGenericParameterTypes\(\)>) retorna um array de [`Type`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Type.html>), no qual você pode chamar [`Type.getTypeName()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Type.html#getTypeName\(\)>).

```java
import java.lang.reflect.Constructor;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;

public class ConstructorGenericParameters {

    public static void main(String[] args) {
        Class<ArrayList> arrayListClass = ArrayList.class;
        Constructor<?>[] constructors = arrayListClass.getConstructors();
        Arrays.stream(constructors).forEach(constructor -> {
            System.out.println("Constructor: " + constructor.getName());
            Type[] genericParameterTypes = constructor.getGenericParameterTypes();
            Arrays.stream(genericParameterTypes).forEach(paramType -> System.out.println("  Generic Parameter Type: " + paramType.getTypeName()));
        });
    }
}
```

A execução deste código produz o seguinte.

```
Constructor: java.util.ArrayList
  Generic Parameter Type: int
Constructor: java.util.ArrayList
  Generic Parameter Type: java.util.Collection<? extends E>
Constructor: java.util.ArrayList
```

## Obtendo Exceções de um Construtor

A classe [`Constructor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Constructor.html>) dá acesso às exceções declaradas de um Construtor. Essas exceções são retornadas em um array, que pode ser de dois tipos: um array de instâncias de [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>), ou um array de instâncias de [`Type`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Type.html>). Como de costume, o objeto [`Type`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Type.html>) pode fornecer informações sobre um tipo de parâmetro.

Vamos descobrir as exceções lançadas pelo construtor de [`FileWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/FileWriter.html>) que recebe uma [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) como parâmetro.

```java
import java.io.FileWriter;
import java.lang.reflect.Constructor;
import java.util.Arrays;

public class ConstructorExceptions {

    public static void main(String[] args) throws NoSuchMethodException {
        Class<FileWriter> fileWriterClass = FileWriter.class;
        Constructor<FileWriter> constructor = fileWriterClass.getConstructor(String.class);
        System.out.println("Constructor: " + constructor.getName());
        Class<?>[] exceptionTypes = constructor.getExceptionTypes();
        Arrays.stream(exceptionTypes).forEach(exceptionType -> System.out.println("  Exception Type: " + exceptionType.getName()));
    }
}
```

A execução deste exemplo produz o seguinte:

```
Constructor: java.io.FileWriter
  Exception Type: java.io.IOException
```

## Padrões de Invocação

Invocar um construtor cria uma nova instância de uma classe. Existem dois métodos reflexivos para criar instâncias de classes: [`Class.newInstance()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#newInstance\(\)>) e [`Constructor.newInstance()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Constructor.html#newInstance\(java.lang.Object...\)>), sendo este último o padrão que você deve usar.

O primeiro padrão consiste em chamar o método [`newInstance()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#newInstance\(\)>) da [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>). Este método está, na verdade, chamando o construtor sem argumentos da classe na qual é invocado. Se este construtor não existir ou não for visível (por exemplo: for private), então ele lança uma exceção.

O método [`Class.newInstance()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#newInstance\(\)>) foi descontinuado no Java SE 9 e não deve ser mais usado. Existem várias razões para isso.

*   [`Class.newInstance()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#newInstance\(\)>) só pode invocar o construtor de zero argumentos, enquanto [`Constructor.newInstance()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Constructor.html#newInstance\(java.lang.Object...\)>) pode invocar qualquer construtor, independentemente do número de parâmetros.
*   [`Class.newInstance()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#newInstance\(\)>) lança qualquer exceção lançada pelo construtor, incluindo uma exceção verificada. Este método efetivamente ignora a verificação de exceções em tempo de compilação que de outra forma seria realizada pelo compilador.
*   [`Class.newInstance()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#newInstance\(\)>) exige que o construtor seja visível; [`Constructor.newInstance()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Constructor.html#newInstance\(java.lang.Object...\)>) pode invocar construtores private sob certas circunstâncias.

O segundo padrão que você deve usar agora, consiste em obter uma referência a um dos construtores da classe e invocá-lo.

### Criando uma Instância de String

O exemplo a seguir cria uma instância de [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>).

```java
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

public class StringInstanceCreator {

    public static void main(String[] args) throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        Class<String> stringClass = String.class;
        Constructor<String> constructor = stringClass.getConstructor();
        String s = constructor.newInstance();
        System.out.println(s);
    }
}
```

A execução deste código imprime o seguinte:

```
```

Observe o seguinte:

*   `stringClass.getConstructor()` lança uma [`NoSuchMethodException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NoSuchMethodException.html>), caso a classe não tenha um construtor sem argumentos.
*   a chamada para `newInstance()` lança várias exceções:
    *   [`InvocationTargetException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/InvocationTargetException.html>): encapsulando a exceção que a invocação do construtor pode ter lançado.
    *   [`InstantiationException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/InstantiationException.html>): caso a classe correspondente não possa ser instanciada. Este é o caso para abstract classes ou interfaces.
    *   [`IllegalAccessException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IllegalAccessException.html>): caso o construtor sem argumentos não seja acessível a partir do código chamador. Este é o caso se o construtor for private e for acessado de outra classe.

### Criando uma Instância de um Record

Suponha que você tenha o seguinte record.

```java
public record Point(int x, int y) {
}
```

Então você pode invocar seu construtor vazio com o código a seguir.

```java
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

public class RecordInstanceCreator {

    public static void main(String[] args) throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        Class<Point> pointClass = Point.class;
        Constructor<Point> constructor = pointClass.getConstructor();
        Point p = constructor.newInstance();
        System.out.println(p);
    }
}
```

A execução do código anterior imprime o seguinte.

```
Point[x=0, y=0]
```

Você também pode invocar seu construtor canônico com o código a seguir. Note que este construtor canônico não é explicitamente escrito no código, mas o compilador o gera para você. Você pode aprender mais sobre records nesta [seção](<#/doc/tutorials/records>).

```java
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

public class RecordCanonicalConstructor {

    public static void main(String[] args) throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        Class<Point> pointClass = Point.class;
        Constructor<Point> constructor = pointClass.getConstructor(int.class, int.class);
        Point p = constructor.newInstance(10, 20);
        System.out.println(p);
    }
}
```

A execução do código anterior produz o seguinte resultado.

```
Point[x=10, y=20]
```

## Invocando Construtores Privados

Tentar invocar um construtor private de fora de sua classe, ou qualquer outro caso de um construtor não visível, lançará uma [`IllegalAccessException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IllegalAccessException.html>).

Você ainda pode obter acesso a tal construtor e invocá-lo, primeiro chamando [`constructor.setAccessible(true)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Constructor.html#setAccessible\(boolean\)>) nele. Assim como para campos e métodos, existem restrições sobre os construtores que você pode tornar acessíveis. Você pode ler mais sobre este assunto na seção [Tornando um Campo, um Método ou um Construtor Acessível](<#/doc/tutorials/reflection/fields>).

Note que chamar [`setAccessible(true)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html#setAccessible\(boolean\)>) em um método não o torna public. Apenas suprime as verificações de controle de acesso.

### Neste tutorial

Localizando Construtores Invocando um Construtor Obtendo Parâmetros de um Construtor Obtendo Exceções de um Construtor Padrões de Invocação Invocando Construtores Privados

Última atualização: 25 de julho de 2024

**Anterior na Série**

[Invocando Métodos](<#/doc/tutorials/reflection/methods>)

➜

**Tutorial Atual**

Invocando Construtores

➜

**Próximo na Série**

[Trabalhando com Arrays](<#/doc/tutorials/reflection/arrays>)

**Anterior na Série:** [Invocando Métodos](<#/doc/tutorials/reflection/methods>)

**Próximo na Série:** [Trabalhando com Arrays](<#/doc/tutorials/reflection/arrays>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Reflexão ](<#/doc/tutorials/reflection>) > Invocando Construtores