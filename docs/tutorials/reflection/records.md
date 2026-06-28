# Trabalhando com Records

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Reflection ](<#/doc/tutorials/reflection>) > Trabalhando com Records

**Anterior na Série**

[Trabalhando com Enumerações](<#/doc/tutorials/reflection/enums>)

➜

**Tutorial Atual**

Trabalhando com Records

➜

**Próximo na Série**

[Lendo Anotações](<#/doc/tutorials/reflection/annotations>)

**Anterior na Série:** [Trabalhando com Enumerações](<#/doc/tutorials/reflection/enums>)

**Próximo na Série:** [Lendo Anotações](<#/doc/tutorials/reflection/annotations>)

# Trabalhando com Records

Records são um tipo particular de classe, que impõem fortemente a não-modificabilidade. Records podem ter qualquer número de _record components_. Ambos os elementos têm um impacto na Reflection API.

## Identificando o Tipo Record

Quando Records foram introduzidos no Java SE 16, vários novos métodos e classes foram adicionados à Reflection API. Entre eles está um método na classe [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) para verificar se uma dada classe é uma record class: [`Class.isRecord()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#isRecord\(\)>). Você pode aprender mais sobre records [nesta página](<#/doc/tutorials/records>).

Suponha que você tenha o seguinte record.

```java
record Point(int x, int y) {}
```

Você pode ver este método simples em ação no exemplo a seguir.

```java
public class RecordType {
    public static void main(String[] args) {
        Class<?> pointClass = Point.class;
        System.out.println("Is Point a record? " + pointClass.isRecord());

        Class<?> stringClass = String.class;
        System.out.println("Is String a record? " + stringClass.isRecord());
    }
}
```

A execução do código anterior imprime o seguinte.

```
Is Point a record? true
Is String a record? false
```

## Obtendo Informações dos Componentes

Records também definem um novo elemento para a linguagem Java, que é o _record component_. Um record component é um dos elementos declarados junto com a declaração de um record. A Reflection API também suporta esta noção de record component.

A Reflection API ganha uma nova classe: [`RecordComponent`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/RecordComponent.html>) que modela um componente de um record. Você tem vários métodos nesta classe.

API do Componente | Comentários
---|---
[`getDeclaringRecord()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/RecordComponent.html#getDeclaringRecord\(\)>) | Retorna a classe que declara este componente.
[`getAccessor()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/RecordComponent.html#getAccessor\(\)>) | Retorna o método que modela o acessor deste componente.
[`getName()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/RecordComponent.html#getName\(\)>) | Retorna o nome deste componente.
[`getType()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/RecordComponent.html#getType\(\)>) | Retorna o tipo deste componente, como um objeto `Class`.
[`getGenericType()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/RecordComponent.html#getGenericType\(\)>) | Retorna o tipo genérico deste componente, como um objeto `Type`.
[`getGenericSignature()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/RecordComponent.html#getGenericSignature\(\)>) | Retorna a assinatura do tipo genérico deste componente, como um objeto `String`.

Então você pode obter os componentes de um record em um array do tipo `RecordComponent[]`.

```java
public class RecordComponents {
    public static void main(String[] args) {
        Class<?> pointClass = Point.class;
        java.lang.reflect.RecordComponent[] components = pointClass.getRecordComponents();

        for (java.lang.reflect.RecordComponent component : components) {
            System.out.println("Component Name: " + component.getName());
            System.out.println("Component Type: " + component.getType());
            System.out.println("Declaring Record: " + component.getDeclaringRecord());
            System.out.println("Accessor Method: " + component.getAccessor());
            System.out.println("---");
        }
    }
}
```

Vamos ver estes métodos em ação.

A execução do código anterior imprime o seguinte.

```
Component Name: x
Component Type: int
Declaring Record: class Point
Accessor Method: public int Point.x()
---
Component Name: y
Component Type: int
Declaring Record: class Point
Accessor Method: public int Point.y()
---
```

## Acessando Campos de Records

Note que não há método na classe [`RecordComponent`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/RecordComponent.html>) para obter uma referência ao objeto [`Field`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html>) que modela o campo deste componente.

Você ainda pode obter uma referência ao [`Field`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html>) de records usando o método [`Class.getDeclaredFields()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getDeclaredFields\(\)>). Mas você não pode modificar os campos de um record, mesmo chamando [`Field.setAccessible(true)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html#setAccessible\(boolean\)>). Este comportamento é específico para records.

Vamos examinar o exemplo a seguir. Suponha que você tenha o seguinte record.

```java
record Point(int x, int y) {}
```

Este record possui dois campos de instância finais `x` e `y`, que você pode obter usando a Reflection API.

```java
import java.lang.reflect.Field;

public class RecordFields {
    public static void main(String[] args) throws NoSuchFieldException {
        Class<?> pointClass = Point.class;

        Field xField = pointClass.getDeclaredField("x");
        Field yField = pointClass.getDeclaredField("y");

        System.out.println("Field x: " + xField);
        System.out.println("Field y: " + yField);
    }
}
```

A execução do código anterior imprime o seguinte.

```
Field x: private final int Point.x
Field y: private final int Point.y
```

Você pode usar esses campos para ler seus valores, como pode ver no exemplo a seguir.

```java
import java.lang.reflect.Field;

public class ReadRecordFields {
    public static void main(String[] args) throws NoSuchFieldException, IllegalAccessException {
        Point p = new Point(10, 20);
        Class<?> pointClass = Point.class;

        Field xField = pointClass.getDeclaredField("x");
        xField.setAccessible(true); // Necessário para campos privados

        int xValue = (int) xField.get(p);
        System.out.println("Value of x: " + xValue);

        Field yField = pointClass.getDeclaredField("y");
        yField.setAccessible(true); // Necessário para campos privados

        int yValue = (int) yField.get(p);
        System.out.println("Value of y: " + yValue);
    }
}
```

Note que o campo `x` é privado, razão pela qual você precisa chamar `xField.setAccessible(true)`.

O exemplo anterior imprime o seguinte.

```
Value of x: 10
Value of y: 20
```

Note que você também poderia ter usado `xField.getInt(p)` para obter o valor de `x`, para evitar o auto-unboxing.

Mas você não pode usar isso para modificar o valor de `x`. Você pode tentar executar o seguinte código.

```java
import java.lang.reflect.Field;

public class ModifyRecordFields {
    public static void main(String[] args) throws NoSuchFieldException, IllegalAccessException {
        Point p = new Point(10, 20);
        Class<?> pointClass = Point.class;

        Field xField = pointClass.getDeclaredField("x");
        xField.setAccessible(true);

        // Tentando modificar o campo x
        xField.set(p, 30); // Isso lançará uma IllegalAccessException
    }
}
```

Você então receberá a seguinte exceção [`IllegalAccessException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IllegalAccessException.html>).

```
Exception in thread "main" java.lang.IllegalAccessException: Can not set final int field Point.x to (int)30
	at java.base/jdk.internal.reflect.AccessibleObject.checkCanSetAccessible(AccessibleObject.java:354)
	at java.base/java.lang.reflect.Field.checkCanSetAccessible(Field.java:180)
	at java.base/java.lang.reflect.Field.setAccessible(Field.java:174)
	at ModifyRecordFields.main(ModifyRecordFields.java:11)
```

### Neste tutorial

Identificando o Tipo Record Obtendo Informações dos Componentes Acessando Campos de Records

Última atualização: 25 de julho de 2024

**Anterior na Série**

[Trabalhando com Enumerações](<#/doc/tutorials/reflection/enums>)

➜

**Tutorial Atual**

Trabalhando com Records

➜

**Próximo na Série**

[Lendo Anotações](<#/doc/tutorials/reflection/annotations>)

**Anterior na Série:** [Trabalhando com Enumerações](<#/doc/tutorials/reflection/enums>)

**Próximo na Série:** [Lendo Anotações](<#/doc/tutorials/reflection/annotations>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Reflection ](<#/doc/tutorials/reflection>) > Trabalhando com Records