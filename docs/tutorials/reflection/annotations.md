# Lendo Anotações

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Reflection ](<#/doc/tutorials/reflection>) > Lendo Anotações

**Anterior na Série**

[Trabalhando com Records](<#/doc/tutorials/reflection/records>)

➜

**Tutorial Atual**

Lendo Anotações

➜

**Próximo na Série**

[Criando um Interceptor com Anotações](<#/doc/tutorials/reflection/interceptor>)

**Anterior na Série:** [Trabalhando com Records](<#/doc/tutorials/reflection/records>)

**Próximo na Série:** [Criando um Interceptor com Anotações](<#/doc/tutorials/reflection/interceptor>)

# Lendo Anotações

Anotações são amplamente utilizadas com a Reflection API. Muitos frameworks as utilizam extensivamente e com grande sucesso. Este é o caso dos frameworks de mapeamento objeto-relacional, dos frameworks de injeção de dependência, de alguns frameworks de validação e de alguns frameworks de segurança. Basicamente, todos os frameworks Java EE, Jakarta EE e todos os frameworks semelhantes definem seus conjuntos de anotações que você pode adicionar em classes e membros de classe para acionar comportamentos. Esta seção mostra como tudo isso funciona internamente e como você pode usar anotações em tempo de execução.

## Descobrindo Anotações em Elementos

A página [Anotações](<#/doc/tutorials/annotations>) explica o que são anotações e como você pode usá-las.

As seguintes classes da Reflection API implementam a interface [`AnnotatedElement`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AnnotatedElement.html>) que lhe dá acesso às anotações que tal elemento pode carregar: [`Field`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html>), [`Method`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html>), [`Constructor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Constructor.html>) e [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>). Lembre-se de que a classe [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) modela classes, classes abstratas, interfaces, enumerações, records e arrays.

Esta [`AnnotatedElement`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AnnotatedElement.html>) fornece os métodos necessários para descobrir as anotações adicionadas no elemento correspondente, bem como a instância desta anotação, para que você possa chamar seus métodos.

Suponha que você tenha a seguinte enumeração e as duas anotações `@Bean` e `@Serialized` em sua aplicação.

```java
public enum Format {
    BINARY, XML, JSON
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface Bean {
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface Serialized {
    Format format() default Format.JSON;
}
```

Como você pode ver, ambas podem ser aplicadas em tipos e são disponibilizadas em tempo de execução. A anotação `@Serialized` define um atributo, `format`, que pode assumir três valores: `BINARY`, `XML` e `JSON`.

Agora, suponha que você tenha uma classe `Person`, declarada desta forma.

```java
@Bean
@Serialized(format = Format.XML)
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
```

A Reflection API oferece vários métodos para descobrir essas anotações.

  * [`isAnnotationPresent(Class<? extends Annotation>)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AnnotatedElement.html#isAnnotationPresent\(java.lang.Class\)>): permite verificar se uma determinada anotação está presente neste elemento. A classe que você precisa passar como argumento deve ser uma classe de anotação. Se não for, você receberá um erro de compilador.
  * [`getAnnotations()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AnnotatedElement.html#getAnnotations\(\)>) e [`getDeclaredAnnotations()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AnnotatedElement.html#getDeclaredAnnotations\(\)>): fornecem um array com as anotações presentes neste elemento. Este array pode estar vazio se não houver tal anotação. O [`getDeclaredAnnotations()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AnnotatedElement.html#getDeclaredAnnotations\(\)>) fornece as anotações declaradas apenas neste elemento, sem as anotações herdadas.
  * [`getAnnotation(Class)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AnnotatedElement.html#getAnnotation\(java.lang.Class\)>) e [`getDeclaredAnnotation(Class)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AnnotatedElement.html#getDeclaredAnnotation\(java.lang.Class\)>): retornam uma anotação para o tipo específico passado como argumento. O método [`getDeclaredAnnotation(Class)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AnnotatedElement.html#getDeclaredAnnotation\(java.lang.Class\)>) retorna apenas a anotação declarada neste elemento, sem as anotações herdadas.
  * [`getAnnotationsByType(Class)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AnnotatedElement.html#getAnnotationsByType\(java.lang.Class\)>) foi adicionado no Java SE 8 para suportar anotações repetíveis. Este método retorna um array das anotações associadas a este elemento. Se encontrar uma anotação repetível, ele a abre para retornar o elemento repetível.

Vejamos esses métodos em ação.

Primeiro, você pode verificar se a classe `Person` possui alguma anotação e descobri-las.

```java
import java.lang.annotation.Annotation;
import java.util.Arrays;

public class AnnotationReader {
    public static void main(String[] args) {
        Class<Person> personClass = Person.class;

        // Check if a specific annotation is present
        boolean isBeanPresent = personClass.isAnnotationPresent(Bean.class);
        System.out.println("Is @Bean present on Person class? " + isBeanPresent);

        // Get all annotations declared on the element
        Annotation[] annotations = personClass.getDeclaredAnnotations();
        System.out.println("Declared annotations on Person class: " + Arrays.toString(annotations));

        // Get a specific annotation instance
        Serialized serializedAnnotation = personClass.getAnnotation(Serialized.class);
        if (serializedAnnotation != null) {
            System.out.println("Serialized annotation format: " + serializedAnnotation.format());
        }
    }
}
```

A execução do código anterior imprime o seguinte.

```
Is @Bean present on Person class? true
Declared annotations on Person class: [@Bean(), @Serialized(format=XML)]
Serialized annotation format: XML
```

Observe que o que você obtém em retorno são instâncias das classes de anotação que você define, nas quais você pode chamar os métodos que elas declaram. Vamos agora executar este código.

```java
import java.lang.annotation.Annotation;
import java.util.Arrays;

public class AnnotationReader {
    public static void main(String[] args) {
        Class<Person> personClass = Person.class;

        for (Annotation annotation : personClass.getDeclaredAnnotations()) {
            if (annotation instanceof Bean bean) {
                System.out.println("Bean annotation found: " + bean);
            } else if (annotation instanceof Serialized serialized) {
                System.out.println("Serialized annotation found with format: " + serialized.format());
            }
        }
    }
}
```

A execução do código anterior imprime o seguinte.

```
Bean annotation found: @Bean()
Serialized annotation found with format: XML
```

Vamos criar outra anotação, repetível.

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface Validator {
    String name();
    String regex() default ".*";
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface Validators {
    Validator[] value();
}
```

E modificar a classe `Person`, para adicionar um campo a ela, com esta anotação repetível.

```java
@Bean
@Serialized(format = Format.XML)
public class Person {
    @Validator(name = "NotNull")
    @Validator(name = "MinLength", regex = ".{3,}")
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
```

Da perspectiva do arquivo de classe, há na verdade apenas uma anotação no campo `name`: `@Validators`. Você pode então obter esta instância e obter as anotações `@Validator` aninhadas chamando o método `value()`. É isso que o exemplo a seguir está fazendo.

```java
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.Arrays;

public class AnnotationReader {
    public static void main(String[] args) throws NoSuchFieldException {
        Class<Person> personClass = Person.class;
        Field nameField = personClass.getDeclaredField("name");

        // Get all annotations on the field
        Annotation[] fieldAnnotations = nameField.getDeclaredAnnotations();
        System.out.println("Declared annotations on name field: " + Arrays.toString(fieldAnnotations));

        // Access the repeating annotations via the container annotation
        Validators validators = nameField.getAnnotation(Validators.class);
        if (validators != null) {
            System.out.println("Validators container found. Individual validators:");
            for (Validator validator : validators.value()) {
                System.out.println("  Validator name: " + validator.name() + ", regex: " + validator.regex());
            }
        }
    }
}
```

A execução do exemplo anterior imprime o seguinte.

```
Declared annotations on name field: [@Validators(value=[@Validator(name="NotNull", regex=".*"), @Validator(name="MinLength", regex=". {3,}")])]
Validators container found. Individual validators:
  Validator name: NotNull, regex: .*
  Validator name: MinLength, regex: .{3,}
```

Então você pode ter acesso a anotações repetíveis usando o método [`getAnnotations()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AnnotatedElement.html#getAnnotations\(\)>), mas é um pouco tedioso.

É aqui que o [`getAnnotationsByType(Class)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AnnotatedElement.html#getAnnotationsByType\(java.lang.Class\)>) pode simplificar seu código. Chamar este método com a classe `Validator` como argumento fornece as anotações que você está procurando.

```java
import java.lang.reflect.Field;

public class AnnotationReader {
    public static void main(String[] args) throws NoSuchFieldException {
        Class<Person> personClass = Person.class;
        Field nameField = personClass.getDeclaredField("name");

        // Get repeating annotations directly
        Validator[] validators = nameField.getAnnotationsByType(Validator.class);
        System.out.println("Validators found using getAnnotationsByType:");
        for (Validator validator : validators) {
            System.out.println("  Validator name: " + validator.name() + ", regex: " + validator.regex());
        }
    }
}
```

A execução do exemplo anterior fornece o seguinte.

```
Validators found using getAnnotationsByType:
  Validator name: NotNull, regex: .*
  Validator name: MinLength, regex: .{3,}
```

## Obtendo Anotações Herdadas

Anotações declaradas em tipos (classes, classes abstratas e interfaces) podem ser herdadas por seus subtipos. Não faz sentido fazer isso para enumerações e records, pois estas duas são classes final e, portanto, não podem ser estendidas.

Os métodos [`getDeclaredAnnotations()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AnnotatedElement.html#getDeclaredAnnotations\(\)>) e [`getDeclaredAnnotation(Class)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AnnotatedElement.html#getDeclaredAnnotation\(java.lang.Class\)>) têm um comportamento estrito. Eles retornam apenas as anotações declaradas no tipo em que você está chamando esses métodos. Por outro lado, [`getAnnotations()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AnnotatedElement.html#getAnnotations\(\)>) e [`getAnnotation(Class)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AnnotatedElement.html#getAnnotation\(java.lang.Class\)>) podem retornar anotações herdadas. Você pode ver isso no exemplo a seguir.

Suponha que você tenha a seguinte anotação `Bean`, que pode ser herdada.

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@Inherited
public @interface Bean {
}
```

E as duas classes a seguir. Observe que a classe `Person` é anotada com `@Bean`, e não a classe `User` que a estende.

```java
@Bean
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}

public class User extends Person {
    public User(String name, int age) {
        super(name, age);
    }
}
```

Você pode examinar as anotações disponíveis na classe `User` com o seguinte código.

```java
import java.lang.annotation.Annotation;
import java.util.Arrays;

public class AnnotationReader {
    public static void main(String[] args) {
        Class<User> userClass = User.class;

        // getDeclaredAnnotations() will not return inherited annotations
        Annotation[] declaredAnnotations = userClass.getDeclaredAnnotations();
        System.out.println("Declared annotations on User class: " + Arrays.toString(declaredAnnotations));

        // getAnnotations() will return inherited annotations if @Inherited is present
        Annotation[] annotations = userClass.getAnnotations();
        System.out.println("All annotations on User class (including inherited): " + Arrays.toString(annotations));

        // getAnnotation() for a specific inherited annotation
        Bean beanAnnotation = userClass.getAnnotation(Bean.class);
        System.out.println("Is @Bean present on User class (via getAnnotation)? " + (beanAnnotation != null));
    }
}
```

A execução do código anterior imprime o seguinte.

```
Declared annotations on User class: []
All annotations on User class (including inherited): [@Bean()]
Is @Bean present on User class (via getAnnotation)? true
```

## Obtendo Anotações em Tipos

Tipos anotados são anotações declaradas em tipos, que podem ser usadas em qualquer lugar do seu código. Você pode ver exemplos de tal uso de tipos [nesta página](<#/doc/tutorials/annotations>).

A Reflection API lhe dá acesso a algumas dessas anotações usando uma interface específica: [`AnnotatedType`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AnnotatedType.html>).

Suponha que você tenha a seguinte anotação. Observe que esta anotação pode ser usada onde os tipos são usados, mas não na declaração desses tipos.

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE_USE)
public @interface NotNull {
}
```

Você pode então usar esta anotação desta forma. Observe que esta anotação é declarada na classe que estende e em uma interface implementada.

```java
import java.io.Serializable;

public class User extends @NotNull Person implements @NotNull Serializable {
    public User(String name, int age) {
        super(name, age);
    }
}
```

A Reflection API lhe dá acesso a esta anotação desta forma.

```java
import java.lang.reflect.AnnotatedType;
import java.util.Arrays;

public class AnnotationReader {
    public static void main(String[] args) {
        Class<User> userClass = User.class;

        // Get annotated superclass
        AnnotatedType annotatedSuperclass = userClass.getAnnotatedSuperclass();
        System.out.println("Annotated superclass: " + annotatedSuperclass.getType().getTypeName());
        System.out.println("Annotations on superclass: " + Arrays.toString(annotatedSuperclass.getAnnotations()));

        // Get annotated interfaces
        AnnotatedType[] annotatedInterfaces = userClass.getAnnotatedInterfaces();
        for (AnnotatedType annotatedInterface : annotatedInterfaces) {
            System.out.println("Annotated interface: " + annotatedInterface.getType().getTypeName());
            System.out.println("Annotations on interface: " + Arrays.toString(annotatedInterface.getAnnotations()));
        }
    }
}
```

A execução do exemplo anterior fornece o seguinte.

```
Annotated superclass: Person
Annotations on superclass: [@NotNull()]
Annotated interface: java.io.Serializable
Annotations on interface: [@NotNull()]
```

Consideremos o seguinte exemplo, onde você pode descobrir uma anotação em uma exceção. Esta exceção não é uma [`RuntimeException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/RuntimeException.html>), então você precisa tratá-la explicitamente. Para superar isso, você decide criar uma anotação para informar ao seu código cliente se ele pode relançar esta exceção como uma exceção de tempo de execução.

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface Rethrowable {
}

@Rethrowable
public class RethrowableException extends Exception {
    public RethrowableException(String message) {
        super(message);
    }
}
```

Você pode então usar esta classe com o seguinte código cliente.

```java
import java.lang.reflect.Constructor;

public class AnnotationReader {
    public static void main(String[] args) {
        try {
            // Simulate a method that might throw RethrowableException
            throwRethrowableException();
        } catch (RethrowableException e) {
            // Check if the exception is annotated with @Rethrowable
            if (e.getClass().isAnnotationPresent(Rethrowable.class)) {
                System.out.println("RethrowableException caught, rethrowing as RuntimeException.");
                throw new RuntimeException(e);
            } else {
                System.out.println("Non-rethrowable exception caught: " + e.getMessage());
            }
        } catch (Exception e) {
            System.out.println("Other exception caught: " + e.getMessage());
        }
    }

    public static void throwRethrowableException() throws RethrowableException {
        System.out.println("Throwing RethrowableException...");
        throw new RethrowableException("This is a rethrowable custom exception.");
    }
}
```

Observe que neste exemplo a chamada ao método [`getConstructor()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getConstructor\(java.lang.Class...\)>) lança uma exceção [`NoSuchMethodException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NoSuchMethodException.html>), que você precisa capturar ou relançar.

A execução do código anterior imprime o seguinte. Como você pode ver, a exceção é relançada como uma exceção de tempo de execução.

```
Throwing RethrowableException...
RethrowableException caught, rethrowing as RuntimeException.
Exception in thread "main" java.lang.RuntimeException: RethrowableException: This is a rethrowable custom exception.
	at AnnotationReader.main(AnnotationReader.java:10)
Caused by: RethrowableException: This is a rethrowable custom exception.
	at AnnotationReader.throwRethrowableException(AnnotationReader.java:20)
	at AnnotationReader.main(AnnotationReader.java:6)
```

### Neste tutorial

Descobrindo Anotações em Elementos Descobrindo Anotações Herdadas Obtendo Anotações em Tipos

Última atualização: 25 de julho de 2024

**Anterior na Série**

[Trabalhando com Records](<#/doc/tutorials/reflection/records>)

➜

**Tutorial Atual**

Lendo Anotações

➜

**Próximo na Série**

[Criando um Interceptor com Anotações](<#/doc/tutorials/reflection/interceptor>)

**Anterior na Série:** [Trabalhando com Records](<#/doc/tutorials/reflection/records>)

**Próximo na Série:** [Criando um Interceptor com Anotações](<#/doc/tutorials/reflection/interceptor>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Reflection ](<#/doc/tutorials/reflection>) > Lendo Anotações