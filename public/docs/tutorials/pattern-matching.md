# Usando o Pattern Matching

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Usando o Pattern Matching

# Usando o Pattern Matching

## Introdução ao Pattern Matching

Pattern matching é um recurso que ainda está em desenvolvimento. Alguns elementos deste recurso foram lançados como funcionalidades finais na linguagem Java, alguns foram lançados como funcionalidades de pré-visualização (preview features), e alguns ainda estão sendo discutidos.

Se você quiser saber mais sobre pattern matching e fornecer feedback, então você precisa visitar a [página do projeto Amber](<https://openjdk.org/projects/amber/>). A página do projeto Amber é a página central para tudo relacionado a pattern matching na linguagem Java.

Se você é novo em pattern matching, a primeira coisa que pode vir à sua mente é pattern matching em expressões regulares. Se este for o caso, então você pode estar se perguntando o que isso tem a ver com "Pattern Matching para instanceof"?

Expressões regulares são uma forma de pattern matching que foi criada para analisar strings de caracteres. É um bom e fácil ponto de partida para entender.

Vamos escrever o seguinte código.

```java
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Regex {

    public static void main(String... args) {
        String regex = "\\bflame\\b";
        String text = """
                From fairest creatures we desire increase,
                That thereby beauty's rose might never die,
                But as the riper should by time decease,
                His tender heir might bear his memory:
                But thou, contracted to thine own bright eyes,
                Feed'st thy light's flame with self-substantial fuel,
                Making a famine where abundance lies,
                Thyself thy foe, to thy sweet self too cruel.
                Thou that art now the world's fresh ornament
                And only herald to the gaudy spring,
                Within thine own bud buriest thy content
                And, tender churl, makest waste in niggarding.
                Pity the world, or else this glutton be,
                To eat the world's due, by the grave and thee.
                """;
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(text);
        while (matcher.find()) {
            System.out.println(String.format("Found '%s' at index %d to %d.",
                    matcher.group(), matcher.start(), matcher.end()));
        }
    }
}
```

Este código usa o primeiro soneto de Shakespeare como texto. Este texto é analisado com a expressão regular `\bflame\b`. Esta expressão regular começa e termina com `\b`. Este caractere de escape tem um significado especial em expressões regulares: ele denota o início ou o fim de uma palavra. Neste exemplo, significa que este pattern corresponde à palavra `flame`.

Você pode fazer muito mais coisas com expressões regulares. Isso está fora do escopo deste tutorial. Se você quiser saber mais sobre expressões regulares, pode consultar a página [Expressões Regulares](<#/doc/tutorials/regex>).

Se você executar este código, ele imprimirá o seguinte:

```
Found 'flame' at index 233 to 238.
```

Este resultado informa que há uma única ocorrência de `flame` entre o índice 233 e o índice 238 no soneto.

Pattern matching com expressão regular funciona da seguinte forma:

1.  ele corresponde a um _pattern_ dado; `flame` é este exemplo e o corresponde a um texto
2.  então ele fornece informações sobre o local onde o pattern foi correspondido.

Existem três noções que você precisa ter em mente para o restante deste tutorial:

1.  O que você precisa corresponder; isso é chamado de _alvo correspondido_ (matched target). Aqui é o soneto.
2.  Contra o que você corresponde; isso é chamado de _pattern_. Aqui a expressão regular `flame`.
3.  O resultado da correspondência; aqui o índice de início e o índice de fim.

Esses três elementos são os elementos fundamentais do pattern matching.

## Pattern Matching para Instanceof

### Correspondendo Qualquer Objeto a um Tipo com Instanceof

Existem várias maneiras de estender o pattern matching. A primeira que abordamos é chamada de _Pattern matching para instanceof_; que foi lançada como um recurso final no Java SE 16.

Vamos estender o exemplo da seção anterior para o caso de uso do `instanceof`. Para isso, vamos considerar o seguinte exemplo.

```java
public class InstanceOf {

    public static void main(String... args) {
        Object o = "Hello World";
        if (o instanceof String s) {
            System.out.println(s.toUpperCase());
        }
    }
}
```

Vamos descrever os três elementos que apresentamos lá.

O _alvo correspondido_ (matched target) é qualquer objeto de qualquer tipo. É o operando do lado esquerdo do operador `instanceof`: `o`.

O _pattern_ é um tipo seguido por uma declaração de variável. É o lado direito do `instanceof`. O tipo pode ser uma classe, uma classe abstrata ou uma interface. Neste caso, é apenas `String s`.

O resultado da correspondência é uma nova referência ao _alvo correspondido_ (matched target). Esta referência é colocada na variável que é declarada como parte do pattern, `s` neste exemplo. Ela é criada se o _alvo correspondido_ (matched target) corresponde ao _pattern_. Esta variável tem o tipo que você correspondeu. A variável `s` é chamada de _variável de pattern_ (pattern variable) do pattern. Alguns patterns podem ter mais de uma _variável de pattern_.

Em nosso exemplo, a variável `o` é o elemento que você precisa corresponder; é o seu _alvo correspondido_ (matched target). O _pattern_ é a declaração `String s`. O resultado da correspondência é a variável `s` declarada junto com o tipo [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>). Esta variável é criada apenas se `o` for do tipo [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>).

Esta sintaxe especial onde você pode definir uma variável junto com o tipo declarado com o `instanceof` é uma nova sintaxe adicionada ao Java SE 16.

O pattern `String s` é chamado de _type pattern_ (pattern de tipo), porque ele verifica o tipo do alvo correspondido. Observe que, como o tipo [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) estende o tipo [`CharSequence`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/CharSequence.html>), o seguinte pattern corresponderia:

```java
public class InstanceOf {

    public static void main(String... args) {
        Object o = "Hello World";
        if (o instanceof CharSequence s) {
            System.out.println(s.toString().toUpperCase());
        }
    }
}
```

### Usando a Variável de Pattern

O compilador permite que você use a variável `s` onde quer que faça sentido usá-la. O bloco `if` é o primeiro escopo que vem à mente. Acontece que você também pode usar esta variável em algumas partes da instrução `if`.

O código a seguir verifica se `object` é uma instância da classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>), e se é uma string não vazia. Você pode ver que ele usa a variável `s` na expressão booleana após o `&&`. Faz todo o sentido porque você avalia esta parte da expressão booleana apenas se a primeira parte for `true`. Nesse caso, a variável `s` é criada.

```java
public class InstanceOf {

    public static void main(String... args) {
        Object object = "Hello World";
        if (object instanceof String s && !s.isEmpty()) {
            System.out.println(s.toUpperCase());
        }
    }
}
```

Existem casos em que seu código verifica o tipo real de uma variável, e se este tipo não for o que você espera, então você pula o restante do seu código. Considere o seguinte exemplo.

```java
public class InstanceOf {

    public static void main(String... args) {
        Object object = "Hello World";
        if (!(object instanceof String)) {
            throw new IllegalArgumentException("Not a String");
        }
        String s = (String) object;
        System.out.println(s.toUpperCase());
    }
}
```

A partir do Java SE 16, você pode escrever este código dessa forma, aproveitando o pattern matching para `instanceof`:

```java
public class InstanceOf {

    public static void main(String... args) {
        Object object = "Hello World";
        if (!(object instanceof String s)) {
            throw new IllegalArgumentException("Not a String");
        }
        System.out.println(s.toUpperCase());
    }
}
```

A variável de pattern `s` está disponível fora da instrução `if`, desde que seu código saia do método a partir do bloco `if`: seja com um `return`, ou lançando uma exceção. Se seu código puder executar o bloco `if` e puder continuar com o restante do método, então a variável de pattern não é criada.

Existem casos em que o compilador pode dizer se a correspondência falha. Vamos considerar o seguinte exemplo:

```java
public class InstanceOf {

    public static void main(String... args) {
        final String pi = "3.14";
        if (pi instanceof String s) { // Compiler error
            System.out.println(s.toUpperCase());
        }
    }
}
```

O compilador sabe que a classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) é final. Portanto, não há como a variável `pi` ser do tipo [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>). O compilador emitirá um erro neste código.

### Escrevendo Código Mais Limpo com Pattern Matching para Instanceof

Existem muitos lugares onde o uso deste recurso tornará seu código muito mais legível.

Vamos criar a seguinte classe `Point`, com um método `equals()`. O método `hashCode()` é omitido aqui.

```java
public class Point {

    private final int x;
    private final int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Point point = (Point) o;
        return x == point.x && y == point.y;
    }
}
```

Esta é a forma clássica de escrever um método `equals()`; ele poderia ter sido gerado por uma IDE.

Você pode reescrever este método `equals()` com o seguinte código que aproveita o recurso de pattern matching para `instanceof`, resultando em um código muito mais legível.

```java
public class Point {

    private final int x;
    private final int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Point point)) return false;
        return x == point.x && y == point.y;
    }
}
```

## Pattern Matching para Switch

### Estendendo Expressões Switch para Usar Type Patterns para Rótulos de Case

Pattern Matching para Switch é um recurso final do JDK 21. Foi apresentado como um recurso de pré-visualização (preview feature) no Java SE 17, 18, 19 e 20.

Pattern Matching para Switch usa instruções ou expressões switch. Ele permite que você corresponda um _alvo correspondido_ (matched target) a vários _patterns_ de uma vez. Até agora, os _patterns_ são _type patterns_ (patterns de tipo), assim como no pattern matching para `instanceof`.

Neste caso, o _alvo correspondido_ (matched target) é a expressão seletora do switch. Existem vários _patterns_ em tal recurso; cada case da expressão switch é em si um type pattern que segue a sintaxe descrita na seção anterior.

Vamos considerar o seguinte código.

```java
public class Switch {

    public static void main(String... args) {
        Object o = "Hello World";
        if (o instanceof String) {
            String s = (String) o;
            System.out.println(s.toUpperCase());
        } else if (o instanceof Integer) {
            Integer i = (Integer) o;
            System.out.println(i.doubleValue());
        } else {
            System.out.println(o.toString());
        }
    }
}
```

Você pode ver que ele contém três _type patterns_ (patterns de tipo), um para cada instrução `if`. Pattern matching para switch permite escrever este código da seguinte forma.

```java
public class Switch {

    public static void main(String... args) {
        Object o = "Hello World";
        switch (o) {
            case String s -> System.out.println(s.toUpperCase());
            case Integer i -> System.out.println(i.doubleValue());
            default -> System.out.println(o.toString());
        }
    }
}
```

Pattern matching para switch não só torna seu código mais legível; ele também o torna mais performático. Avaliar uma instrução if-else-if é proporcional ao número de ramificações que esta instrução possui; dobrar o número de ramificações dobra o tempo de avaliação. Avaliar um switch não depende do número de cases. Dizemos que a complexidade de tempo da instrução `if` é _O(n)_ enquanto a complexidade de tempo da instrução `switch` é _O(1)_.

Até agora, não é uma extensão do pattern matching em si; é um novo recurso do switch, que aceita um type pattern como rótulo de case.

Em sua versão atual, a expressão switch aceita o seguinte para os rótulos de case:

1.  os seguintes tipos numéricos: `byte`, `short`, `char` e `int` (`long` não é aceito)
2.  os tipos wrapper correspondentes: [`Byte`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Byte.html>), [`Short`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Short.html>), [`Character`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html>) e [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>)
3.  o tipo [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>)
4.  tipos enumerados.

Pattern matching para switch adiciona a possibilidade de usar type patterns para os rótulos de case.

### Usando Guarded Patterns

No caso de Pattern Matching para `instanceof`, você já sabe que a variável de pattern criada se o alvo correspondido corresponde ao pattern pode ser usada na expressão booleana que contém o `instanceof`, como no exemplo a seguir.

```java
public class InstanceOf {

    public static void main(String... args) {
        Object object = "Hello World";
        if (object instanceof String s && !s.isEmpty()) {
            System.out.println(s.toUpperCase());
        }
    }
}
```

Isso funciona bem em uma instrução `if`, porque o argumento da instrução é do tipo booleano. Em expressões switch, os rótulos de case não podem ser booleanos. Então você não pode escrever o seguinte:

```java
public class Switch {

    public static void main(String... args) {
        Object o = "Hello World";
        switch (o) {
            case String s && !s.isEmpty() -> System.out.println(s.toUpperCase()); // Compiler error
            case Integer i -> System.out.println(i.doubleValue());
            default -> System.out.println(o.toString());
        }
    }
}
```

Acontece que o _pattern matching para switch_ foi estendido para permitir que uma expressão booleana seja adicionada após o type pattern. Esta expressão booleana é chamada de _guard_ (guarda) e o rótulo de case resultante de _guarded case label_ (rótulo de case guardado). Você pode adicionar esta expressão booleana em uma cláusula `when`, com a seguinte sintaxe.

```java
public class Switch {

    public static void main(String... args) {
        Object o = "Hello World";
        switch (o) {
            case String s when !s.isEmpty() -> System.out.println(s.toUpperCase());
            case Integer i -> System.out.println(i.doubleValue());
            default -> System.out.println(o.toString());
        }
    }
}
```

Este rótulo de case estendido é chamado de _guarded case label_ (rótulo de case guardado). A expressão `String s when !s.isEmpty()` é um desses rótulos de case guardados. É formada por um type pattern e uma expressão booleana.

## Record Pattern

Um _record_ é um tipo especial de classe imutável, escrita como tal, introduzida no Java SE 16. Você pode visitar nossa [página de Record](<#/doc/tutorials/records>) para saber mais sobre este recurso.

Um record pattern é um tipo especial de pattern, publicado como um recurso final no Java SE 21. Ele estava disponível como um recurso de pré-visualização (preview feature) no Java SE 19 e 20. Um record é construído sobre componentes, que são declarados como parte da declaração de um record. No exemplo a seguir, o record `Point` tem dois componentes: `x` e `y`.

```java
public record Point(int x, int y) {
}
```

Esta informação habilita uma noção chamada _desconstrução de record_ (record deconstruction), usada no record pattern matching. O código a seguir é um primeiro exemplo do uso de um _record pattern_.

```java
public class RecordPattern {

    public static void main(String... args) {
        Object o = new Point(1, 2);
        if (o instanceof Point(int x, int y)) {
            System.out.println(String.format("Point with x = %d and y = %d", x, y));
        }
    }
}
```

O _operando alvo_ (target operand) ainda é a referência `o`. Ele é correspondido a um _record pattern_: `Point(int x, int y)`. Este pattern declara duas _variáveis de pattern_ (pattern variables): `x` e `y`. Se `o` for de fato do tipo `Point`, então essas duas variáveis de ligação são criadas e inicializadas chamando os acessadores correspondentes do record `Point`. Este ponto é importante, pois você pode ter alguma cópia defensiva nesses acessadores.

Um record pattern é construído com o nome do record, `Point` neste exemplo, e um type pattern por componente desse record. Então, quando você escreve `o instanceof Point(int x, int y)`, `int x` e `int y` são type patterns, usados para corresponder ao primeiro e ao segundo componente do record `Point`. Observe que, nesse caso, você define um type pattern com um tipo primitivo.

Um record pattern é construído no mesmo modelo do construtor canônico de um record. Mesmo que você crie outros construtores além do construtor canônico em um determinado record, o record pattern para esse record sempre segue a sintaxe do construtor canônico. Portanto, o código a seguir não compila.

```java
public record Point(int x, int y) {
    public Point(int x) {
        this(x, 0);
    }
}

public class RecordPattern {

    public static void main(String... args) {
        Object o = new Point(1);
        if (o instanceof Point(int x)) { // Compiler error
            System.out.println(String.format("Point with x = %d", x));
        }
    }
}
```

Record pattern suporta inferência de tipo. O tipo dos componentes que você usa para escrever seu pattern pode ser inferido com `var`, ou pode ser uma extensão do tipo real declarado em seu record.

Como a correspondência de cada componente é na verdade um type pattern, você pode corresponder a um tipo que é uma extensão do tipo real de um componente. Se você usar um tipo em seu pattern que não pode ser uma extensão do tipo real do componente do seu record, então você receberá um erro de compilador.

Aqui está um primeiro exemplo onde você pode pedir ao compilador para inferir o tipo real da sua variável de ligação.

```java
public class RecordPattern {

    public static void main(String... args) {
        Object o = new Point(1, 2);
        if (o instanceof Point(var x, var y)) {
            System.out.println(String.format("Point with x = %d and y = %d", x, y));
        }
    }
}
```

No exemplo a seguir, você pode fazer um switch no tipo do componente do record `Box`.

```java
public record Box<T>(T t) {
}

public class RecordPattern {

    public static void main(String... args) {
        Object o = new Box<String>("Hello World");
        if (o instanceof Box<String>(String s)) {
            System.out.println(s.toUpperCase());
        }
    }
}
```

Assim como no caso do `instanceof`, você não pode verificar um tipo que não é possível. Aqui, o tipo `Integer` não pode estender o tipo `CharSequence`, gerando um erro de compilador.

```java
public record Box<T>(T t) {
}

public class RecordPattern {

    public static void main(String... args) {
        Object o = new Box<String>("Hello World");
        if (o instanceof Box<String>(Integer i)) { // Compiler error
            System.out.println(i.doubleValue());
        }
    }
}
```

Record patterns não suportam boxing nem unboxing. Portanto, o código a seguir não é válido.

```java
public record Point(int x, int y) {
}

public class RecordPattern {

    public static void main(String... args) {
        Object o = new Point(1, 2);
        if (o instanceof Point(Integer x, Integer y)) { // Compiler error
            System.out.println(String.format("Point with x = %d and y = %d", x, y));
        }
    }
}
```

Um último ponto: record pattern suporta aninhamento, então você pode escrever o seguinte código.

```java
public record Point(int x, int y) {
}

public record Box<T>(T t) {
}

public class RecordPattern {

    public static void main(String... args) {
        Object o = new Box<Point>(new Point(1, 2));
        if (o instanceof Box<Point>(Point(int x, int y))) {
            System.out.println(String.format("Point with x = %d and y = %d", x, y));
        }
    }
}
```

## Mais Patterns

Pattern matching agora é suportado por três elementos da linguagem Java, como recurso final ou como recurso de pré-visualização (preview feature):

*   a palavra-chave `instanceof`,
*   a instrução e expressão `switch`,
*   e o `for loop` estendido.

Todos eles suportam dois tipos de patterns: _type patterns_ (patterns de tipo) e _record patterns_.

Há mais por vir em um futuro próximo. Mais elementos da linguagem Java poderão ser modificados e mais tipos de patterns serão adicionados. Esta página será atualizada para refletir essas modificações.

### Neste tutorial

Introdução ao Pattern Matching Pattern Matching para Instanceof Pattern Matching para Switch Record Pattern Mais Patterns

Última atualização: 21 de dezembro de 2022

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Usando o Pattern Matching

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)