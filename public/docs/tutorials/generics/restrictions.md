# Restrição em Generics

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Generics ](<#/doc/tutorials/generics>) > Restrição em Generics

**Anterior na Série**

[Type Erasure](<#/doc/tutorials/generics/type-erasure>)

➜

**Tutorial Atual**

Restrição em Generics

➜

Este é o fim da série!

**Anterior na Série:** [Type Erasure](<#/doc/tutorials/generics/type-erasure>)

# Restrição em Generics

## Não é possível instanciar tipos genéricos com tipos primitivos

Considere o seguinte tipo parametrizado:

```java
class Pair<K, V> {
    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    // ...
}
```

Ao criar um objeto `Pair`, você não pode substituir um tipo primitivo para o parâmetro de tipo `K` ou `V`:

```java
Pair<int, char> p = new Pair<>(8, 'a'); // Erro de compilação
```

Você pode substituir apenas tipos não primitivos para os parâmetros de tipo `K` e `V`:

```java
Pair<Integer, Character> p = new Pair<>(8, 'a');
```

Observe que o compilador Java faz o autoboxing de `8` para `Integer.valueOf(8)` e de `'a'` para `Character('a')`:

```java
Pair<Integer, Character> p = new Pair<>(Integer.valueOf(8), Character.valueOf('a'));
```

Para mais informações sobre autoboxing, consulte a seção sobre [`Autoboxing e Unboxing`](<#/doc/tutorials/numbers-strings/autoboxing>).

## Não é possível criar instâncias de parâmetros de tipo

Você não pode criar uma instância de um parâmetro de tipo. Por exemplo, o seguinte código causa um erro em tempo de compilação:

```java
public static <E> void append(List<E> list) {
    E elem = new E(); // Erro de compilação
    list.add(elem);
}
```

Como solução alternativa, você pode criar um objeto de um parâmetro de tipo através de reflection:

```java
public static <E> void append(List<E> list, Class<E> cls) throws Exception {
    E elem = cls.newInstance();   // OK
    list.add(elem);
}
```

Você pode invocar o método `append()` da seguinte forma:

```java
List<String> ls = new ArrayList<>();
append(ls, String.class);
```

## Não é possível declarar campos estáticos cujos tipos são parâmetros de tipo

Um campo estático de uma classe é uma variável de nível de classe compartilhada por todos os objetos não estáticos da classe. Portanto, campos estáticos de parâmetros de tipo não são permitidos. Considere a seguinte classe:

```java
public class MobileDevice<T> {
    private static T os; // Erro de compilação
    // ...
}
```

Se campos estáticos de parâmetros de tipo fossem permitidos, então o seguinte código seria confuso:

```java
MobileDevice<Smartphone> phone = new MobileDevice<>();
MobileDevice<Pager> pager = new MobileDevice<>();
MobileDevice<TabletPC> pc = new MobileDevice<>();
```

Como o campo estático `os` é compartilhado por `phone`, `pager` e `pc`, qual é o tipo real de `os`? Não pode ser `Smartphone`, `Pager` e `TabletPC` ao mesmo tempo. Você não pode, portanto, criar campos estáticos de parâmetros de tipo.

## Não é possível usar casts ou instanceof com tipos parametrizados

Como o compilador Java apaga todos os parâmetros de tipo em código genérico, você não pode verificar qual tipo parametrizado para um tipo genérico está sendo usado em tempo de execução:

```java
public static <E> void rtti(List<E> list) {
    if (list instanceof ArrayList<Integer>) {  // Erro de compilação
        // ...
    }
}
```

O conjunto de tipos parametrizados passados para o método `rtti()` é:

*   `ArrayList<Integer>`
*   `ArrayList<String>`

O runtime não rastreia os parâmetros de tipo, então ele não consegue diferenciar entre um `ArrayList<Integer>` e um `ArrayList<String>`. O máximo que você pode fazer é usar um wildcard ilimitado para verificar se a lista é um [`ArrayList`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ArrayList.html>):

```java
public static void rtti(List<?> list) {
    if (list instanceof ArrayList<?>) {  // OK
        // ...
    }
}
```

Tipicamente, você não pode fazer um cast para um tipo parametrizado a menos que ele seja parametrizado por wildcards ilimitados. Por exemplo:

```java
List<Integer> li = new ArrayList<>();
List<Number> ln = (List<Number>) li; // Erro de compilação
```

No entanto, em alguns casos o compilador sabe que um parâmetro de tipo é sempre válido e permite o cast. Por exemplo:

```java
List<Integer> li = new ArrayList<>();
ArrayList<Integer> ali = (ArrayList<Integer>) li; // OK
```

## Não é possível criar arrays de tipos parametrizados

Você não pode criar arrays de tipos parametrizados. Por exemplo, o seguinte código não compila:

```java
List<Integer>[] arrayOfLists = new List<Integer>[2];  // Erro de compilação
```

O seguinte código ilustra o que acontece quando diferentes tipos são inseridos em um array:

```java
Object[] strings = new String[2];
strings[0] = "hi";
strings[1] = 100;   // Lança ArrayStoreException
```

Se você tentar a mesma coisa com uma lista genérica, haveria um problema:

```java
Object[] stringLists = new List<String>[];  // Erro de compilação, mas imagine que fosse permitido
stringLists[0] = new ArrayList<String>();
stringLists[1] = new ArrayList<Integer>();  // Sem ArrayStoreException
```

Se arrays de listas parametrizadas fossem permitidos, o código anterior falharia em lançar a [`ArrayStoreException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ArrayStoreException.html>) desejada.

## Não é possível criar, capturar ou lançar objetos de tipos parametrizados

Uma classe genérica não pode estender a classe [`Throwable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Throwable.html>) direta ou indiretamente. Por exemplo, as seguintes classes não compilarão:

```java
// Classes genéricas não podem estender Throwable
class MyException<T> extends Exception {   // Erro de compilação
}

class MyException<T> extends Throwable {   // Erro de compilação
}
```

Um método não pode capturar uma instância de um parâmetro de tipo:

```java
public static <T extends Throwable> void doWork(Class<T> x) {
    try {
        // fazer algo
    } catch (T x) {   // Erro de compilação
        // ...
    }
}
```

Você pode, no entanto, usar um parâmetro de tipo em uma cláusula `throws`:

```java
public static <T extends Throwable> void doWork(T x) throws T { // OK
    try {
        // fazer algo
    } catch (Throwable cause) {
        throw x;
    }
}
```

## Não é possível sobrecarregar um método onde os tipos de parâmetros formais de cada sobrecarga são apagados para o mesmo tipo bruto

Uma classe não pode ter dois métodos sobrecarregados que terão a mesma assinatura após o type erasure.

```java
public class Example {
    public void print(List<String> strList) { }
    public void print(List<Integer> intList) { } // Erro de compilação
}
```

As sobrecargas compartilhariam a mesma representação de classfile e gerariam um erro em tempo de compilação.

### Neste tutorial

Não é possível instanciar tipos genéricos com tipos primitivos
Não é possível criar instâncias de parâmetros de tipo
Não é possível declarar campos estáticos cujos tipos são parâmetros de tipo
Não é possível usar casts ou instanceof com tipos parametrizados
Não é possível criar arrays de tipos parametrizados
Não é possível criar, capturar ou lançar objetos de tipos parametrizados
Não é possível sobrecarregar um método onde os tipos de parâmetros formais de cada sobrecarga são apagados para o mesmo tipo bruto

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Type Erasure](<#/doc/tutorials/generics/type-erasure>)

➜

**Tutorial Atual**

Restrição em Generics

➜

Este é o fim da série!

**Anterior na Série:** [Type Erasure](<#/doc/tutorials/generics/type-earasure>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Generics ](<#/doc/tutorials/generics>) > Restrição em Generics