# Trabalhando com Enumerações

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Reflection ](<#/doc/tutorials/reflection>) > Trabalhando com Enumerações

**Anterior na Série**

[Trabalhando com Arrays](<#/doc/tutorials/reflection/arrays>)

➜

**Tutorial Atual**

Trabalhando com Enumerações

➜

**Próximo na Série**

[Trabalhando com Records](<#/doc/tutorials/reflection/records>)

**Anterior na Série:** [Trabalhando com Arrays](<#/doc/tutorials/reflection/arrays>)

**Próximo na Série:** [Trabalhando com Records](<#/doc/tutorials/reflection/records>)

# Trabalhando com Enumerações

Como enums são classes, a reflection não precisa definir uma classe `java.lang.reflect.Enum` explícita, e de fato, não há nenhuma. As únicas APIs de Reflection específicas para enums são [`Class.isEnum()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#isEnum\(\)>), [`Class.getEnumConstants()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getEnumConstants\(\)>) e [`Field.isEnumConstant()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html#isEnumConstant\(\)>). A maioria das operações de reflection envolvendo enums são as mesmas de qualquer outra classe ou membro. Por exemplo, as constantes de enum são implementadas como campos public static final no enum. As seções a seguir mostram como usar [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) e [`Field`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html>) com enums.

## Obtendo Acesso à Classe e às Constantes

A Reflection fornece três APIs específicas para enum:

  * [`Class.isEnum()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#isEnum\(\)>): indica se esta classe representa um tipo enum.
  * [`Class.getEnumConstants()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getEnumConstants\(\)>): recupera a lista de constantes enum definidas pelo enum na ordem em que são declaradas.
  * [`Field.isEnumConstant()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html#isEnumConstant\(\)>): indica se este campo representa um elemento de um tipo enumerado.

Às vezes, é necessário recuperar dinamicamente a lista de constantes enum; em código não-reflexivo, isso é feito invocando o método estático implicitamente declarado `values()` no enum. Se uma instância de um tipo enum não estiver disponível, a única maneira de obter uma lista dos valores possíveis é invocar [`Class.getEnumConstants()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getEnumConstants\(\)>), já que é impossível instanciar um tipo enum.

Suponha que você tenha o seguinte enum.

```java
public enum Days {
    SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY
}
```

Então você pode escrever o seguinte código para obter acesso reflexivamente a diferentes elementos deste enum.

```java
import java.lang.reflect.Field;
import java.util.Arrays;

public class EnumReflection {

    public static void main(String... args) {
        Class<Days> c = Days.class;
        System.out.println("Is enum: " + c.isEnum());
        System.out.println("Enum constants: " + Arrays.toString(c.getEnumConstants()));

        for (Field f : c.getFields()) {
            System.out.println("Field: " + f.getName() + ", is enum constant: " + f.isEnumConstant());
        }
    }
}
```

A execução do código anterior imprime o seguinte. Como você pode ver, a chamada para [`c.getEnumConstants()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getEnumConstants\(\)>) retorna o mesmo array que você obtém com `Days.values()`.

```
Is enum: true
Enum constants: [SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY]
Field: SUNDAY, is enum constant: true
Field: MONDAY, is enum constant: true
Field: TUESDAY, is enum constant: true
Field: WEDNESDAY, is enum constant: true
Field: THURSDAY, is enum constant: true
Field: FRIDAY, is enum constant: true
Field: SATURDAY, is enum constant: true
```

## Localizando Constantes Enum

Graças à API de Reflection, você pode localizar os construtores deste enum `Days`.

```java
import java.lang.reflect.Constructor;
import java.lang.reflect.Modifier;
import java.util.Arrays;

public class EnumReflection {

    public static void main(String... args) {
        Class<Days> c = Days.class;
        for (Constructor<?> constructor : c.getDeclaredConstructors()) {
            System.out.println("Constructor: " + constructor.getName());
            System.out.println("  Modifiers: " + Modifier.toString(constructor.getModifiers()));
            System.out.println("  Parameters: " + Arrays.toString(constructor.getParameters()));
        }
    }
}
```

A execução do código anterior fornece o seguinte. Como você pode ver, seu enum `Days` tem um construtor, que é privado, e recebe dois parâmetros:

  * um [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>), que é o nome de uma constante
  * e um `int`, que é o índice desta constante no array das constantes que este enum define.

```
Constructor: Days
  Modifiers: private
  Parameters: [java.lang.String arg0, int arg1]
```

Você pode então tentar obter uma referência para este construtor e invocá-lo para criar outra constante no enum `Days`.

```java
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

public class EnumReflection {

    public static void main(String... args) throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        Class<Days> c = Days.class;
        Constructor<Days> constructor = c.getDeclaredConstructor(String.class, int.class);
        constructor.setAccessible(true);
        Days newDay = constructor.newInstance("NEW_DAY", 7);
        System.out.println("New day: " + newDay);
    }
}
```

A execução deste código imprime o seguinte.

```
Exception in thread "main" java.lang.IllegalArgumentException: Cannot reflectively create enum objects
	at java.lang.reflect.Constructor.newInstance(Constructor.java:484)
	at EnumReflection.main(EnumReflection.java:10)
```

De fato, não é possível adicionar constantes a um enum em tempo de execução, mesmo usando a API de Reflection.

## Obtendo Acesso a Membros

Suponha agora que você tenha o seguinte enum. Tecnicamente falando, sabemos que o Sol não é um planeta, mas as pessoas que nomearam os dias da semana acreditavam nisso na época.

```java
import java.util.Arrays;
import java.util.Optional;

public enum Days {
    SUNDAY("Sun"), MONDAY("Moon"), TUESDAY("Mars"), WEDNESDAY("Mercury"),
    THURSDAY("Jupiter"), FRIDAY("Venus"), SATURDAY("Saturn");

    private final String planet;

    Days(String planet) {
        this.planet = planet;
    }

    public String getPlanet() {
        return planet;
    }

    public static Optional<Days> of(String label) {
        return Arrays.stream(values())
                .filter(day -> day.getPlanet().equalsIgnoreCase(label))
                .findFirst();
    }
}
```

Observe que este enum tem um construtor definido, um campo e um método, que é um acessador para este campo. Ele também tem um método de fábrica, para obter uma das constantes a partir de um rótulo.

Você pode descobrir o número de construtores que este enum `Days` possui.

```java
import java.lang.reflect.Constructor;
import java.lang.reflect.Modifier;
import java.util.Arrays;

public class EnumReflection {

    public static void main(String... args) {
        Class<Days> c = Days.class;
        for (Constructor<?> constructor : c.getDeclaredConstructors()) {
            System.out.println("Constructor: " + constructor.getName());
            System.out.println("  Modifiers: " + Modifier.toString(constructor.getModifiers()));
            System.out.println("  Parameters: " + Arrays.toString(constructor.getParameters()));
        }
    }
}
```

A execução do código anterior imprime o seguinte. Este enum ainda tem apenas um construtor: aquele que você definiu. Mas, como você pode ver, ele recebe mais parâmetros do que o que você definiu. O compilador adicionou o nome desta constante e seu índice. Ainda não é possível invocar este construtor reflexivamente para criar mais constantes em tempo de execução.

```
Constructor: Days
  Modifiers: private
  Parameters: [java.lang.String arg0, int arg1, java.lang.String arg2]
```

Todos os outros membros do seu enum podem ser acessados reflexivamente, como qualquer membro de qualquer classe regular.

## Descobrindo Campos Gerados pelo Compilador

A API de Reflection pode lhe dar acesso à estrutura interna da classe `Days` que o compilador gerou para você.

Vamos começar com os campos. Alguns deles são estáticos, então para obter seu valor você precisa chamar `field.get(null)`, porque um campo estático não depende de nenhum objeto. E alguns deles são arrays. Assim, o processamento especial no código a seguir.

```java
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.Arrays;

public class EnumReflection {

    public static void main(String... args) throws IllegalAccessException {
        Class<Days> c = Days.class;
        for (Field f : c.getDeclaredFields()) {
            System.out.println("Field: " + f.getName());
            System.out.println("  Modifiers: " + Modifier.toString(f.getModifiers()));
            System.out.println("  Is enum constant: " + f.isEnumConstant());
            if (Modifier.isStatic(f.getModifiers())) {
                Object value = f.get(null);
                if (f.getType().isArray()) {
                    System.out.println("  Value: " + Arrays.toString((Object[]) value));
                } else {
                    System.out.println("  Value: " + value);
                }
            }
        }
    }
}
```

A execução do código anterior imprime o seguinte. Há vários pontos que merecem ser mencionados.

  * O compilador cria um campo public static para cada constante que você define em seu enum, com o nome desta constante.
  * Ele também cria um array private static chamado `$VALUES`, com todas as constantes que você definiu nele. Este array é retornado pela chamada `Days.values()`.

```
Field: SUNDAY
  Modifiers: public static final
  Is enum constant: true
  Value: SUNDAY
Field: MONDAY
  Modifiers: public static final
  Is enum constant: true
  Value: MONDAY
Field: TUESDAY
  Modifiers: public static final
  Is enum constant: true
  Value: TUESDAY
Field: WEDNESDAY
  Modifiers: public static final
  Is enum constant: true
  Value: WEDNESDAY
Field: THURSDAY
  Modifiers: public static final
  Is enum constant: true
  Value: THURSDAY
Field: FRIDAY
  Modifiers: public static final
  Is enum constant: true
  Value: FRIDAY
Field: SATURDAY
  Modifiers: public static final
  Is enum constant: true
  Value: SATURDAY
Field: planet
  Modifiers: private final
  Is enum constant: false
Field: $VALUES
  Modifiers: private static final synthetic
  Is enum constant: false
  Value: [SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY]
```

## Descobrindo Métodos Gerados pelo Compilador

Você também pode descobrir os métodos que o compilador criou para você.

```java
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.Arrays;

public class EnumReflection {

    public static void main(String... args) {
        Class<Days> c = Days.class;
        for (Method m : c.getDeclaredMethods()) {
            System.out.println("Method: " + m.getName());
            System.out.println("  Modifiers: " + Modifier.toString(m.getModifiers()));
            System.out.println("  Parameters: " + Arrays.toString(m.getParameters()));
        }
    }
}
```

A execução deste código imprime o seguinte. Você pode ver os métodos criados pelo compilador.

  * `Days.values()`: este é o método clássico que retorna o array das constantes que você definiu.
  * `Days.valueOf(String)`: este também é um método clássico, aquele que retorna uma constante a partir de seu nome.
  * `Days.$values()`: este é um método privado criado pelo compilador.

O método `Days.lambda$of$0(String, Days)` corresponde ao predicado criado no método `of()`.

```
Method: getPlanet
  Modifiers: public
  Parameters: []
Method: of
  Modifiers: public static
  Parameters: [java.lang.String arg0]
Method: values
  Modifiers: public static
  Parameters: []
Method: valueOf
  Modifiers: public static
  Parameters: [java.lang.String arg0]
Method: $values
  Modifiers: private static synthetic
  Parameters: []
Method: lambda$of$0
  Modifiers: private static synthetic
  Parameters: [java.lang.String arg0, Days arg1]
```

### Neste tutorial

Obtendo Acesso à Classe e às Constantes Localizando Constantes Enum Obtendo Acesso a Membros Descobrindo Campos Gerados pelo Compilador Descobrindo Métodos Gerados pelo Compilador

Última atualização: 25 de julho de 2024

**Anterior na Série**

[Trabalhando com Arrays](<#/doc/tutorials/reflection/arrays>)

➜

**Tutorial Atual**

Trabalhando com Enumerações

➜

**Próximo na Série**

[Trabalhando com Records](<#/doc/tutorials/reflection/records>)

**Anterior na Série:** [Trabalhando com Arrays](<#/doc/tutorials/reflection/arrays>)

**Próximo na Série:** [Trabalhando com Records](<#/doc/tutorials/reflection/records>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Reflection ](<#/doc/tutorials/reflection>) > Trabalhando com Enumerações