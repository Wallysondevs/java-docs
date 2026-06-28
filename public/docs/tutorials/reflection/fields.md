# Lendo e Escrevendo Campos

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Reflection ](<#/doc/tutorials/reflection>) > Lendo e Escrevendo Campos

**Anterior na Série**

[Lendo Modificadores](<#/doc/tutorials/reflection/modifiers>)

➜

**Tutorial Atual**

Lendo e Escrevendo Campos

➜

**Próximo na Série**

[Invocando Métodos](<#/doc/tutorials/reflection/methods>)

**Anterior na Série:** [Lendo Modificadores](<#/doc/tutorials/reflection/modifiers>)

**Próximo na Série:** [Invocando Métodos](<#/doc/tutorials/reflection/methods>)

# Lendo e Escrevendo Campos

Um objeto [`Field`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html>) permite obter mais informações sobre o campo correspondente: seu tipo e seus modificadores, e permite obter o valor deste campo para um dado objeto, e defini-lo. Esta seção também aborda como você pode descobrir campos em uma classe.

## Localizando Campos

Existem duas categorias de métodos fornecidos em [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) para acessar campos.

1.  Primeiro, você pode procurar por um campo específico. Esses métodos supõem que você tenha um nome para o campo que está procurando.
2.  Segundo, você pode procurar por todos os campos que são declarados nesta classe, ou pelos campos declarados nesta classe, e todas as suas superclasses, até a classe [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>). No primeiro caso, você obterá todos os campos: public, protected, default (acesso de pacote) e private. No segundo caso, você obterá apenas os campos public.

As tabelas a seguir fornecem um resumo de todos os métodos de localização de membros e suas características.

API da Classe | Array de campos? | Campos herdados? | Campos privados?
---|---|---|---
[`getDeclaredField(String)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getDeclaredField\(java.lang.String\)>) | no | no | yes
[`getField(String)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getField\(java.lang.String\)>) | no | yes | no
[`getDeclaredFields()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getDeclaredFields\(\)>) | yes | no | yes
[`getFields()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getFields\(\)>) | yes | yes | no

Vamos ver esses métodos em ação na classe [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) do JDK.

Primeiro, vamos imprimir todos os campos declarados desta classe.

```java
Class<?> arrayListClass = ArrayList.class;
Field[] declaredFields = arrayListClass.getDeclaredFields();
for (Field declaredField : declaredFields) {
    System.out.println(declaredField);
}
```

A execução deste código imprime o seguinte.

```
private static final long java.util.ArrayList.serialVersionUID
private static final int java.util.ArrayList.DEFAULT_CAPACITY
private static final java.lang.Object[] java.util.ArrayList.EMPTY_ELEMENTDATA
private static final java.lang.Object[] java.util.ArrayList.DEFAULTCAPACITY_EMPTY_ELEMENTDATA
transient java.lang.Object[] java.util.ArrayList.elementData
private int java.util.ArrayList.size
protected int java.util.ArrayList.modCount
private static final int java.util.ArrayList.MAX_ARRAY_SIZE
private static final java.lang.Object[] java.util.ArrayList.UNSAFE_ARRAYLIST_ELEMENTDATA
```

Como você pode ver, apenas os campos da própria classe [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>) foram encontrados, independentemente de seu modificador.

Você pode tentar o mesmo código com o método [`Field.getFields()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html#getFields\(\)>).

```java
Class<?> arrayListClass = ArrayList.class;
Field[] fields = arrayListClass.getFields();
for (Field field : fields) {
    System.out.println(field);
}
```

A execução deste código imprime o seguinte.

```
// Nothing is printed
```

De fato, não há campos public em [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>), nem em nenhuma de suas superclasses.

## Obtendo Tipos de Campos

Existem duas maneiras de obter informações sobre o tipo de um campo. A primeira e mais fácil é chamar seu método [`getType()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html#getType\(\)>), que retorna um objeto [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>). Isso funciona bem desde que o tipo do campo não seja genérico. Se for, então o tipo é apenas [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>), o que pode fornecer informações ambíguas.

### Obtendo Tipos de Campos Não Genéricos

A primeira maneira de obter o tipo de um campo é usar o método [`getType()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html#getType\(\)>), que retorna um objeto [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>).

Suponha que você tenha a seguinte classe.

```java
class User {
    String name;
}
```

Então você pode obter o tipo do campo `name` com o seguinte código.

```java
Class<?> userClass = User.class;
Field nameField = userClass.getDeclaredField("name");
Class<?> nameType = nameField.getType();
System.out.println(nameType.getName());
```

Note que o [`getDeclaredField()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getDeclaredField\(java.lang.String\)>) pode lançar uma [`NoSuchFieldException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NoSuchFieldException.html>).

A execução deste código imprime o seguinte.

```
java.lang.String
```

### Obtendo Tipos de Campos Genéricos

O método anterior para obter o tipo de um campo funciona desde que este tipo não seja um tipo genérico.

Suponha que você agora tenha a seguinte classe genérica.

```java
class Box<T> {
    T t;
}
```

E você procura o tipo do campo usando a maneira clássica.

```java
Class<?> boxClass = Box.class;
Field tField = boxClass.getDeclaredField("t");
Class<?> tType = tField.getType();
System.out.println(tType.getName());
```

O que você obtém é o tipo apagado (erased type), que é [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>).

```
java.lang.Object
```

É por isso que, a partir do Java SE 5, o método [`Field.getGenericType()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html#getGenericType\(\)>) foi adicionado à classe [`Field`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html>), que retorna um objeto [`Type`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Type.html>). Este objeto possui um único método [`getTypeName()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Type.html#getTypeName\(\)>) que fornece o nome do tipo genérico deste campo.

Vamos substituir o código anterior pelo seguinte.

```java
Class<?> boxClass = Box.class;
Field tField = boxClass.getDeclaredField("t");
Type tType = tField.getGenericType();
System.out.println(tType.getTypeName());
```

A execução do código anterior agora imprime o seguinte.

```
T
```

O tipo exato do campo `t` agora é preservado, como é declarado na classe.

Note que este método não pode lhe dar acesso ao tipo real em tempo de execução, ele só pode lhe dar o tipo que você declarou no código-fonte. Você pode ver isso no exemplo a seguir. Suponha que você tenha a seguinte classe `Box`.

```java
class Box<T> {
    T t;
}
```

E o seguinte código.

```java
Box<String> box = new Box<>();
box.t = "Hello";
Class<?> boxClass = box.getClass();
Field tField = boxClass.getDeclaredField("t");
Type tType = tField.getGenericType();
System.out.println(tType.getTypeName());
```

A execução do exemplo anterior imprime o seguinte.

```
T
```

## Recuperando Modificadores de Campos

Os modificadores de um campo funcionam da mesma forma que os modificadores de uma classe. O método [`Field.getModifiers()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html#getModifiers\(\)>) retorna um `int` no qual cada bit representa um modificador. Por exemplo, se o bit 0 estiver definido, significa que este campo é public. Se o bit 3 estiver definido, então este campo é static. Você também pode usar os métodos static da classe [`Modifier`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Modifier.html>) para decodificar este inteiro.

Suponha que você tenha a seguinte classe `User`:

```java
class User {
    public String name;
    private static final int ID = 1;
}
```

Você pode obter os modificadores do campo `name` com o seguinte código:

```java
Class<?> userClass = User.class;
Field nameField = userClass.getDeclaredField("name");
int modifiers = nameField.getModifiers();
System.out.println(Modifier.toString(modifiers));
```

Este código imprime o seguinte.

```
public
```

Note que você também pode usar [`Field.accessFlags()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html#accessFlags\(\)>) da mesma forma que fez nas classes. Você pode ver este método em ação no exemplo a seguir.

```java
Class<?> userClass = User.class;
Field nameField = userClass.getDeclaredField("name");
Set<AccessFlag> accessFlags = nameField.accessFlags();
System.out.println(accessFlags);
```

A execução do código anterior imprime o seguinte.

```
[PUBLIC]
```

Como `accessFlags` é um conjunto, você pode usar o seguinte padrão para verificar a presença de um determinado access flag.

```java
Class<?> userClass = User.class;
Field nameField = userClass.getDeclaredField("name");
Set<AccessFlag> accessFlags = nameField.accessFlags();
if (accessFlags.contains(AccessFlag.PUBLIC)) {
    System.out.println("The name field is public");
}
```

A execução do exemplo anterior lhe dá o seguinte.

```
The name field is public
```

Além disso, lembre-se que não há uma correspondência um-para-um entre modificadores e access flags. Você pode ler mais sobre access flags nesta [seção](<#/doc/tutorials/reflection/modifiers>).

## Obtendo e Definindo Valores de Campos

A API de Reflection permite ler e atualizar o valor de campos através do uso de objetos [`Field`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html>). Isso é feito através do uso de dois métodos: [`Field.get(Object)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html#get\(java.lang.Object\)>) e [`Field.set(Object,Object)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html#set\(java.lang.Object,java.lang.Object\)>).

Em ambos os casos, você precisa passar a instância que precisa ler ou escrever, porque o objeto [`Field`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html>) é obtido da [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>), que é única para uma dada classe, e, portanto, compartilhada por todas as instâncias desta classe. Qualquer método que você use para obter uma referência a uma classe específica, você sempre obterá a mesma instância de [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>). Assim, a instância da classe [`Field`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html>) que você obtém para um dado campo de uma dada classe também é única.

Vamos usar a seguinte classe para o nosso exemplo.

```java
class User {
    public String name;
}
```

Você pode obter o valor do campo `name` para uma dada instância desta classe `User` com o seguinte código.

```java
User maria = new User();
maria.name = "Maria";
Class<?> userClass = maria.getClass();
Field nameField = userClass.getDeclaredField("name");
Object name = nameField.get(maria);
System.out.println(name);
```

A execução deste código imprime o seguinte:

```
Maria
```

Você também pode atualizar o campo `name` com o seguinte código.

```java
User maria = new User();
maria.name = "Maria";
Class<?> userClass = maria.getClass();
Field nameField = userClass.getDeclaredField("name");
nameField.set(maria, "Mary");
System.out.println(maria.name);
```

Note que este método pode lançar uma [`IllegalAccessException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IllegalAccessException.html>).

### Lidando com Campos Não Visíveis

Você pode notar que o campo `name` da classe `User` não é private. O exemplo que mostramos pode ser executado desde que o código que está chamando `nameField.set(maria, "Mary")` possa ver o campo `name`, que é visível do mesmo pacote.

Se você tornar este campo private, ou se você mover o código chamador para outro pacote, tornando o campo `name` não visível do código chamador, você receberá a seguinte exceção.

```
Exception in thread "main" java.lang.IllegalAccessException: class Main cannot access a member of class User with modifiers "private"
```

Esta exceção informa que as regras de visibilidade ainda se aplicam à API de Reflection.

Você ainda pode obter acesso a um campo private, informando à API que deseja suprimir as verificações de controle de acesso. Isso pode ser feito com o seguinte código.

```java
User maria = new User();
Class<?> userClass = maria.getClass();
Field nameField = userClass.getDeclaredField("name");
nameField.setAccessible(true); // <1>
nameField.set(maria, "Mary");
System.out.println(maria.name);
```
1.  Esta chamada torna o campo acessível.

Este código torna o objeto de campo `nameField` acessível, apesar de ser private. Um erro comum é pensar que esta chamada para `setAccessible(true)` torna um campo não-private, o que não é o caso. Ela apenas suprime as verificações de controle de acesso.

Note que existem restrições sobre os campos que você pode tornar acessíveis. Você pode ler mais sobre este assunto na seção [Tornando um Campo, um Método ou um Construtor Acessível](<#/doc/tutorials/reflection/fields>).

## Tornando um Campo, um Método ou um Construtor Acessível

As classes [`Field`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html>), [`Method`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html>) e [`Constructor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Constructor.html>) estendem uma superclasse comum: [`AccessibleObject`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AccessibleObject.html>). Esta classe define o método [`setAccessible()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AccessibleObject.html#setAccessible\(boolean\)>) que pode suprimir as verificações de controle de visibilidade e o controle final para campos.

Esta chamada falhará se o elemento que você deseja tornar acessível pertencer a outro módulo nomeado, e este módulo nomeado não se declarar ou o pacote que contém o elemento que você deseja acessar como estando aberto para reflection. Por padrão, um módulo nomeado é fechado para acesso reflexivo, o que significa que outros módulos nomeados e o módulo não nomeado não podem acessar suas classes não-public, e os membros não-public de suas classes public.

Se você estiver trabalhando em uma aplicação que não usa o Java Module System, então você pode usar com segurança a API de Reflection para acessar todos os elementos da sua aplicação, pois tudo faz parte do módulo não nomeado.

Você pode verificar a página [Acesso Reflexivo com Módulos Abertos e Pacotes Abertos](<#/doc/tutorials/modules/opening-for-reflection>) para aprender como você pode abrir um módulo para reflection ao declará-lo, ou algumas classes de um dado pacote deste módulo. E você também pode verificar a seção [O Módulo Não Nomeado](<#/doc/tutorials/modules/unnamed-module>) para aprender mais sobre o módulo não nomeado.

## Lidando com Campos Final

A leitura de campos final funciona da mesma forma que a leitura de qualquer campo.

Como você viu na seção anterior, tornar um campo acessível suprime as verificações de controle de acesso. Isso inclui visibilidade e modificadores final.

Suponha que você agora tenha esta classe, onde o campo `name` foi declarado `private` e `final`.

```java
class User {
    private final String name;

    public User(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
```

Agora considere o seguinte código. Você está obtendo um objeto de campo para o campo `name` da classe `User`, e você o usa para atualizar o valor do campo `name`. Note a chamada para `nameField.setAccessible(true)`.

```java
User maria = new User("Maria");
Class<?> userClass = maria.getClass();
Field nameField = userClass.getDeclaredField("name");
nameField.setAccessible(true);
nameField.set(maria, "Mary");
System.out.println(maria.getName());
```

A execução do código anterior imprime o seguinte. Apesar do campo `name` ser private e final, você pôde atualizá-lo usando a API de Reflection.

```
Mary
```

Definir o flag acessível como true em um objeto de campo lhe dá acesso de leitura e escrita a este campo. Existem algumas exceções, no entanto: ele não lhe dá acesso de escrita se o campo for um campo static, e não lhe dá acesso de escrita nos campos de instância de um record.

Note também que, a partir do JDK 26, você receberá um aviso ao mutar um campo final tornando-o acessível. A execução do código anterior com JDK 26 lhe dá o seguinte.

```
WARNING: An illegal reflective access operation has occurred
WARNING: Illegal reflective access by Main (file:/...) to field User.name
WARNING: Please consider reporting this to the maintainers of Main
WARNING: Use --illegal-access=warn to enable warnings of further illegal reflective access operations
WARNING: All illegal access operations will be denied in a future release
Mary
```

Como um campo final pode ser atualizado, você não pode assumir que ele não será, tornando mais difícil para você raciocinar sobre a correção do seu código. Isso também pode impedir a JVM de realizar algumas otimizações como constant folding. Atualmente, há um esforço para fazer com que `final` signifique `final` (sic). Você pode aprender mais no [JEP 500: Prepare to Make Final Mean Final](<https://openjdk.org/jeps/500>)

## Lidando com Tipos Primitivos

Como você sabe, tipos primitivos podem ser automaticamente empacotados (boxed) para seus tipos wrapper. Você precisa ter em mente que o [`Field.get(Object)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html#get\(java.lang.Object\)>) retorna um tipo [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>), e que os métodos [`Field.set(Object,Object)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html#set\(java.lang.Object,java.lang.Object\)>) recebem um tipo [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>). Então, ao ler um campo de um objeto usando reflection, você precisa fazer um cast do objeto que você obtém para o seu tipo exato. Se o tipo do seu campo for um tipo primitivo ou um tipo wrapper, você pode fazer um cast do resultado de uma chamada para [`Field.get(Object)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html#get\(java.lang.Object\)>) para o tipo primitivo ou tipo wrapper correspondente.

Quando o tipo do campo com o qual você está trabalhando é um tipo primitivo, então você pode evitar a sobrecarga de empacotar (boxing) e desempacotar (unboxing) este tipo primitivo para seu tipo wrapper correspondente usando um dos métodos [`Field.getInt(Object)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html#getInt\(java.lang.Object\)>) ou [`Field.setInt(Object,int)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html#setInt\(java.lang.Object,int\)>). Existem métodos para todos os tipos primitivos na classe [`Field`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Field.html>), tanto para obter quanto para definir o valor do campo.

Tenha cuidado, no entanto, usar tal método em um campo que não é do tipo correto lançará uma exceção. Considere o exemplo a seguir, onde adicionamos um campo `age` do tipo `int`.

```java
class User {
    public String name;
    public int age;
}
```

Você pode executar o seguinte código.

```java
User maria = new User();
maria.name = "Maria";
maria.age = 42;
Class<?> userClass = maria.getClass();
Field ageField = userClass.getDeclaredField("age");
int age = ageField.getInt(maria);
System.out.println(age);
```

Este código imprime o seguinte:

```
42
```

Mas se você mudar o tipo do campo `age` de `int` para `Integer`, então a execução do mesmo código produzirá a seguinte exceção.

```
Exception in thread "main" java.lang.IllegalArgumentException: Field.getInt() can only be used on integer fields
```

### Neste tutorial

Localizando Campos
Obtendo Tipos de Campos
Recuperando Modificadores de Campos
Obtendo e Definindo Valores de Campos
Tornando um Campo, um Método ou um Construtor Acessível
Lidando com Campos Final
Lidando com Tipos Primitivos

Última atualização: 19 de julho de 2024

**Anterior na Série**

[Lendo Modificadores](<#/doc/tutorials/reflection/modifiers>)

➜

**Tutorial Atual**

Lendo e Escrevendo Campos

➜

**Próximo na Série**

[Invocando Métodos](<#/doc/tutorials/reflection/methods>)

**Anterior na Série:** [Lendo Modificadores](<#/doc/tutorials/reflection/modifiers>)

**Próximo na Série:** [Invocando Métodos](<#/doc/tutorials/reflection/methods>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Reflection ](<#/doc/tutorials/reflection>) > Lendo e Escrevendo Campos