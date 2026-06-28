# Lendo Modificadores

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Reflection ](<#/doc/tutorials/reflection>) > Lendo Modificadores

**Anterior na Série**

[Lendo Nomes de Classes](<#/doc/tutorials/reflection/names>)

➜

**Tutorial Atual**

Lendo Modificadores

➜

**Próximo na Série**

[Lendo e Escrevendo Campos](<#/doc/tutorials/reflection/fields>)

**Anterior na Série:** [Lendo Nomes de Classes](<#/doc/tutorials/reflection/names>)

**Próximo na Série:** [Lendo e Escrevendo Campos](<#/doc/tutorials/reflection/fields>)

# Lendo Modificadores

Muitos elementos possuem modificadores na linguagem Java: classes, campos, métodos, construtores, ou parâmetros de método e construtor. Esses modificadores podem alterar a visibilidade do elemento ao qual são aplicados, ou o fato de poderem ser sobrescritos, ou tornados não modificáveis. A API de Reflection dá acesso a esses modificadores, uma vez que você tenha uma referência para o elemento que precisa consultar.

## Usando getModifiers()

Uma classe ou membro de classe pode ser declarado com um ou mais modificadores que afetam seu comportamento em tempo de execução:

  * Modificadores de acesso: `public`, `protected`, e `private`
  * Modificador que exige sobrescrita: `abstract`
  * Modificador que restringe sobrescrita: `sealed`, `non-sealed`
  * O membro modificado é definido na classe envolvente: `static`
  * Modificador que proíbe modificação de valor ou extensão: `final`
  * Modificador que força comportamento de ponto flutuante estrito: `strictfp`
  * Annotations

Nem todos os modificadores são permitidos em todas as classes ou em todos os membros; por exemplo, uma interface não pode ser final e um enum não pode ser abstract. A classe [`java.lang.reflect.Modifier`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Modifier.html>) contém declarações para alguns modificadores possíveis (não contém `sealed` e `non-sealed`). Ela também contém métodos que podem ser usados para decodificar o conjunto de modificadores retornado pelo método [Class.getModifiers()](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getModifiers\(\)>).

Você pode obter os modificadores de uma classe chamando seu método [`getModifiers()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getModifiers\(\)>). Este método retorna um `int`, no qual cada bit representa um modificador. Por exemplo, se o bit 0 estiver definido, significa que o membro correspondente é public. Se o bit 3 estiver definido, então o membro correspondente é static.

Ter que decodificar o `int` dos modificadores seria complicado. Felizmente, a classe [`Modifier`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Modifier.html>) está lá para ajudar. Esta classe fornece uma coleção de métodos static, um para cada modificador, que decodifica este inteiro para você.

Vamos ver este método em ação em dois exemplos.

```java
import java.lang.reflect.Modifier;

public class ModifierExample {
    public static void main(String[] args) {
        Class<String> stringClass = String.class;
        int modifiers = stringClass.getModifiers();

        System.out.println("Modifiers for String class:");
        System.out.println("  isPublic: " + Modifier.isPublic(modifiers));
        System.out.println("  isAbstract: " + Modifier.isAbstract(modifiers));
        System.out.println("  isFinal: " + Modifier.isFinal(modifiers));
        System.out.println("  isStatic: " + Modifier.isStatic(modifiers));
        System.out.println("  isInterface: " + Modifier.isInterface(modifiers));
    }
}
```

O código anterior imprime o seguinte:

```
Modifiers for String class:
  isPublic: true
  isAbstract: false
  isFinal: true
  isStatic: false
  isInterface: false
```

De fato, a classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) é final e não-abstract.

Você pode executar o mesmo código na interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>).

```java
import java.lang.reflect.Modifier;
import java.util.Collection;

public class ModifierCollectionExample {
    public static void main(String[] args) {
        Class<Collection> collectionClass = Collection.class;
        int modifiers = collectionClass.getModifiers();

        System.out.println("Modifiers for Collection interface:");
        System.out.println("  isPublic: " + Modifier.isPublic(modifiers));
        System.out.println("  isAbstract: " + Modifier.isAbstract(modifiers));
        System.out.println("  isFinal: " + Modifier.isFinal(modifiers));
        System.out.println("  isStatic: " + Modifier.isStatic(modifiers));
        System.out.println("  isInterface: " + Modifier.isInterface(modifiers));
    }
}
```

O código anterior imprime o seguinte:

```
Modifiers for Collection interface:
  isPublic: true
  isAbstract: true
  isFinal: false
  isStatic: false
  isInterface: true
```

Como [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>) é uma interface, ela é implicitamente abstract. O compilador adiciona este modificador para cada interface.

## A Interface Member

Existem duas declarações deste método `getModifiers()`:

  * uma na classe [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>),
  * e outra na interface [`Member`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Member.html>), que é implementada pelas seguintes classes: [`Field`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html>), [`Method`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html>), e [`Constructor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Constructor.html>).

Ambos os métodos funcionam da mesma forma: eles retornam o mesmo `int` que você precisa decodificar usando os métodos de fábrica da classe [`Modifier`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Modifier.html>).

## Flags de Acesso

Tanto a classe [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) quanto a interface [`Member`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Member.html>) tiveram a adição de um método [`accessFlags()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Member.html#accessFlags\(\)>) no Java SE 20. Este método retorna um conjunto de instâncias de [`AccessFlag`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AccessFlag.html>), o que facilita a leitura de modificadores.

[`AccessFlag`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AccessFlag.html>) é uma enumeração que define os modificadores que você pode adicionar a uma classe, um campo, um método ou um construtor.

Você pode ver as flags de acesso em ação no exemplo a seguir.

```java
import java.lang.reflect.AccessFlag;
import java.util.Set;
import java.util.Collection;

public class AccessFlagExample {
    public static void main(String[] args) {
        Class<String> stringClass = String.class;
        Set<AccessFlag> stringAccessFlags = stringClass.accessFlags();

        System.out.println("Access Flags for String class:");
        stringAccessFlags.forEach(flag -> System.out.println("  " + flag));

        Class<Collection> collectionClass = Collection.class;
        Set<AccessFlag> collectionAccessFlags = collectionClass.accessFlags();

        System.out.println("\nAccess Flags for Collection interface:");
        collectionAccessFlags.forEach(flag -> System.out.println("  " + flag));
    }
}
```

Executar o exemplo anterior fornece o seguinte resultado.

```
Access Flags for String class:
  PUBLIC
  FINAL

Access Flags for Collection interface:
  PUBLIC
  ABSTRACT
  INTERFACE
```

Alguns modificadores e flags de acesso têm uma correspondência um-para-um, mas nem todos. Você pode obter mais informações sobre este ponto na documentação da enumeração [`AccessFlag`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AccessFlag.html>).

### Neste tutorial

  * Usando getModifiers()
  * A Interface Member
  * Flags de Acesso

Última atualização: 19 de julho de 2024

**Anterior na Série**

[Lendo Nomes de Classes](<#/doc/tutorials/reflection/names>)

➜

**Tutorial Atual**

Lendo Modificadores

➜

**Próximo na Série**

[Lendo e Escrevendo Campos](<#/doc/tutorials/reflection/fields>)

**Anterior na Série:** [Lendo Nomes de Classes](<#/doc/tutorials/reflection/names>)

**Próximo na Série:** [Lendo e Escrevendo Campos](<#/doc/tutorials/reflection/fields>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Reflection ](<#/doc/tutorials/reflection>) > Lendo Modificadores