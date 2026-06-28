# Trabalhando com Arrays

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Reflection ](<#/doc/tutorials/reflection>) > Trabalhando com Arrays

**Anterior na Série**

[Invocando Construtores](<#/doc/tutorials/reflection/constructors>)

➜

**Tutorial Atual**

Trabalhando com Arrays

➜

**Próximo na Série**

[Trabalhando com Enumerações](<#/doc/tutorials/reflection/enums>)

**Anterior na Série:** [Invocando Construtores](<#/doc/tutorials/reflection/constructors>)

**Próximo na Série:** [Trabalhando com Enumerações](<#/doc/tutorials/reflection/enums>)

# Trabalhando com Arrays

Arrays são implementados na Java virtual machine. Os únicos métodos em arrays são aqueles herdados de Object. O comprimento de um array não faz parte de seu tipo; arrays possuem um campo length que é acessível via [`Array.getLength(Object)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Array.html#getLength\(java.lang.Object\)>).

Reflection fornece métodos para acessar tipos de array e tipos de componentes de array, criar novos arrays, e recuperar e definir valores de componentes de array.

## Identificando Tipos de Array

Tipos de array podem ser identificados invocando [`Class.isArray()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#isArray\(\)>).

Você pode obter o tipo exato do array interno em um objeto [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) com o seguinte código.

```java
String s = "Hello World";
Class<?> c = s.getClass();
Class<?> componentType = c.getComponentType();
System.out.println(componentType);
```

Executar o código anterior imprime o seguinte.

```
null
```

## Criando Novos Arrays

Assim como em código não-reflexivo, reflection suporta a capacidade de criar dinamicamente arrays de tipo e dimensões arbitrárias via [`java.lang.reflect.Array.newInstance()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Array.html#newInstance\(\)>).

A classe [`Array`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Array.html>) contém uma coleção de métodos estáticos para obter informações reflexivas sobre arrays, bem como para definir e ler os elementos em qualquer array.

Consideremos o seguinte código.

```java
Object o = Array.newInstance(int.class, 10);
System.out.println(o.getClass().isArray());
System.out.println(o.getClass().getComponentType());
System.out.println(Array.getLength(o));

for (int i = 0; i < 10; i++) {
    Array.set(o, i, 2 * i);
}

for (int i = 0; i < 10; i++) {
    System.out.println(Array.get(o, i));
}
```

Vamos comentar este código linha por linha.

  1. [`Array.newInstance(int.class, 10)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Array.html#newInstance\(java.lang.Class,int\)>): cria uma nova instância de um array de 10 `int`.
  2. [`o.getClass().isArray()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#isArray\(\)>): verifica se a classe correspondente é uma classe de array.
  3. [`o.getClass().getComponentType()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html#getComponentType\(\)>): retorna o tipo dos componentes deste array. Neste caso, é `int`.
  4. [`Array.getLength(o)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Array.html#getLength\(java.lang.Object\)>): retorna o comprimento deste array.
  5. [`Array.set(o, i, 2*i)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Array.html#set\(java.lang.Object,int,java.lang.Object\)>): define reflexivamente o _i_-ésimo elemento do array `o` para o valor `2*i`. Você também pode ler reflexivamente o _i_-ésimo elemento do array `o` com a chamada de método [`Array.get(o, i)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Array.html#set\(java.lang.Object,int\)>).

Note que a classe [`Array`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Array.html>) possui métodos para definir valores primitivos sem boxing ou unboxing. Por exemplo, você pode usar [`Array.setDouble()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Array.html#setDouble\(java.lang.Object,int,double\)>) e [`Array.getDouble()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Array.html#getDouble\(java.lang.Object,int\)>) para definir e obter os elementos de um array de `double`.

Existem dois elementos a considerar ao usar esses métodos.

  1. Chamar um método [`Array.setFloat()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Array.html#setFloat\(java.lang.Object,int,float\)>) com um objeto [`Float`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Float.html>) em vez de um tipo primitivo `float` lançará uma [`IllegalArgumentException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IllegalArgumentException.html>).
  2. Chamar [`Array.setInt()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Array.html#setInt\(java.lang.Object,int,int\)>) e passar um array de `long` está OK, pois não há perda de precisão ao converter um `int` para um `long`. O contrário é ilegal. Você não pode chamar [`Array.setLong()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Array.html#setLong\(java.lang.Object,int,long\)>), passando um array de `int`, pois isso levaria a uma perda de precisão devido ao estreitamento do seu `long`.

Executar o código anterior imprime o seguinte.

```
true
int
10
0
2
4
6
8
10
12
14
16
18
```

Note que tentar ler ou escrever elementos em um índice maior que o comprimento deste array lançará uma [`ArrayIndexOutOfBoundsException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ArrayIndexOutOfBoundsException.html>).

### Neste tutorial

Identificando Tipos de Array
Criando Novos Arrays

Última atualização: 25 de julho de 2024

**Anterior na Série**

[Invocando Construtores](<#/doc/tutorials/reflection/constructors>)

➜

**Tutorial Atual**

Trabalhando com Arrays

➜

**Próximo na Série**

[Trabalhando com Enumerações](<#/doc/tutorials/reflection/enums>)

**Anterior na Série:** [Invocando Construtores](<#/doc/tutorials/reflection/constructors>)

**Próximo na Série:** [Trabalhando com Enumerações](<#/doc/tutorials/reflection/enums>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Reflection ](<#/doc/tutorials/reflection>) > Trabalhando com Arrays