# Autoboxing e Unboxing

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Números e Strings ](<#/doc/tutorials/numbers-strings>) > Autoboxing e Unboxing

**Anterior na Série**

[String Builders](<#/doc/tutorials/numbers-strings/string-builders>)

➜

**Tutorial Atual**

Autoboxing e Unboxing

➜

Este é o fim da série!

**Anterior na Série:** [String Builders](<#/doc/tutorials/numbers-strings/string-builders>)

# Autoboxing e Unboxing

## Autoboxing e Unboxing

_Autoboxing_ é a conversão automática que o compilador Java faz entre os tipos primitivos e suas classes wrapper de objeto correspondentes. Por exemplo, converter um `int` para um [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>), um `double` para um [`Double`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Double.html>), e assim por diante. Se a conversão for no sentido inverso, isso é chamado de unboxing.

Aqui está o exemplo mais simples de autoboxing:

```java
List<Integer> ints = new ArrayList<>();
for (int i = 0; i < 10; i++) {
    ints.add(i);
}
```

Os demais exemplos nesta seção usam generics. Se você ainda não está familiarizado com a sintaxe de generics, consulte a [seção de Generics](<#/doc/tutorials/generics>).

Considere o seguinte código:

```java
List<Integer> ints = new ArrayList<>();
for (int i = 0; i < 10; i++) {
    ints.add(i);
}
```

Embora você adicione os valores `int` como tipos primitivos, em vez de objetos [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>), a `ints`, o código compila. Como `ints` é uma lista de objetos [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>), e não uma lista de valores `int`, você pode se perguntar por que o compilador Java não emite um erro em tempo de compilação. O compilador não gera um erro porque ele cria um objeto [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) a partir de `i` e adiciona o objeto a `ints`. Assim, o compilador converte o código anterior para o seguinte em tempo de execução:

```java
List<Integer> ints = new ArrayList<>();
for (int i = 0; i < 10; i++) {
    ints.add(new Integer(i));
}
```

Converter um valor primitivo (um `int`, por exemplo) em um objeto da classe wrapper correspondente [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) é chamado de autoboxing. O compilador Java aplica autoboxing quando um valor primitivo é:

  * Passado como parâmetro para um método que espera um objeto da classe wrapper correspondente.
  * Atribuído a uma variável da classe wrapper correspondente.

Considere o seguinte método:

```java
public static int sumEven(List<Integer> ints) {
    int sum = 0;
    for (Integer i : ints) {
        if (i % 2 == 0)
            sum += i;
    }
    return sum;
}
```

Como os operadores de resto (`%`) e de adição unária (`+=`) não se aplicam a objetos [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>), você pode se perguntar por que o compilador Java compila o método sem emitir erros. O compilador não gera um erro porque ele invoca o método [`intValue()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#intValue\(\)>) para converter um [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) para um `int` em tempo de execução:

```java
public static int sumEven(List<Integer> ints) {
    int sum = 0;
    for (Integer i : ints) {
        if (i.intValue() % 2 == 0)
            sum += i.intValue();
    }
    return sum;
}
```

Converter um objeto de um tipo wrapper [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) para seu valor primitivo (`int`) correspondente é chamado de unboxing. O compilador Java aplica unboxing quando um objeto de uma classe wrapper é:

  * Passado como parâmetro para um método que espera um valor do tipo primitivo correspondente.
  * Atribuído a uma variável do tipo primitivo correspondente.

O exemplo `Unboxing` mostra como isso funciona:

```java
public class Unboxing {

    public static void main(String[] args) {
        Integer i = new Integer(-8);

        // 1. Unboxing through method invocation
        int absVal = absoluteValue(i);
        System.out.println("absoluteValue of " + i + " = " + absVal);

        // 2. Unboxing through assignment
        int sum = sumEven(10);
        System.out.println("Sum of even numbers up to 10 = " + sum);

    }

    public static int absoluteValue(int i) {
        return (i < 0) ? -i : i;
    }

    public static int sumEven(int upTo) {
        int sum = 0;
        for (int i = 0; i <= upTo; i++) {
            if ((i % 2) == 0) {
                sum += i;
            }
        }
        return sum;
    }
}
```

O programa imprime o seguinte:

```
absoluteValue of -8 = 8
Sum of even numbers up to 10 = 30
```

Autoboxing e unboxing permitem que os desenvolvedores escrevam um código mais limpo, tornando-o mais fácil de ler. A tabela a seguir lista os tipos primitivos e suas classes wrapper correspondentes, que são usadas pelo compilador Java para autoboxing e unboxing:

Tipo primitivo | Classe Wrapper
---|---
boolean | Boolean
byte | Byte
char | Character
float | Float
int | Integer
long | Long
short | Short
double | Double

### Neste tutorial

Autoboxing e Unboxing

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[String Builders](<#/doc/tutorials/numbers-strings/string-builders>)

➜

**Tutorial Atual**

Autoboxing e Unboxing

➜

Este é o fim da série!

**Anterior na Série:** [String Builders](<#/doc/tutorials/numbers-strings/string-builders>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Números e Strings ](<#/doc/tutorials/numbers-strings>) > Autoboxing e Unboxing