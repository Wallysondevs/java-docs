# Implementando uma Interface

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Interfaces ](<#/doc/tutorials/interfaces>) > Implementando uma Interface

**Anterior na Série**

[Interfaces](<#/doc/tutorials/interfaces/defining-interfaces>)

➜

**Tutorial Atual**

Implementando uma Interface

➜

**Próximo na Série**

[Usando uma Interface como um Tipo](<#/doc/tutorials/interfaces/interfaces-as-a-type>)

**Anterior na Série:** [Interfaces](<#/doc/tutorials/interfaces/defining-interfaces>)

**Próximo na Série:** [Usando uma Interface como um Tipo](<#/doc/tutorials/interfaces/interfaces-as-a-type>)

# Implementando uma Interface

## Definindo a Interface Relatable

Para declarar uma classe que implementa uma interface, você inclui uma cláusula `implements` na declaração da classe. Sua classe pode implementar mais de uma interface, então a palavra-chave `implements` é seguida por uma lista de interfaces separadas por vírgulas implementadas pela classe. A cláusula `implements` deve seguir a cláusula `extends`, se houver uma.

Considere uma interface que define como comparar o tamanho de objetos.

Se você deseja ser capaz de comparar o tamanho de objetos semelhantes, não importa quais sejam, a classe que os instancia deve implementar `Relatable`.

Qualquer classe pode implementar `Relatable` se houver alguma maneira de comparar o "tamanho" relativo de objetos instanciados a partir da classe. Para strings, poderia ser o número de caracteres; para livros, poderia ser o número de páginas; para estudantes, poderia ser o peso; e assim por diante. Para objetos geométricos planares, a área seria uma boa escolha (veja a classe `RectanglePlus` que segue), enquanto o volume funcionaria para objetos geométricos tridimensionais. Todas essas classes podem implementar o método `isLargerThan()`.

Se você sabe que uma classe implementa `Relatable`, então você sabe que pode comparar o tamanho dos objetos instanciados a partir dessa classe.

## Implementando a Interface Relatable

Aqui está a classe `Rectangle` que foi apresentada na seção [Criando Objetos](<#/doc/tutorials/classes-objects/creating-objects>), reescrita para implementar `Relatable`.

Como `RectanglePlus` implementa `Relatable`, o tamanho de quaisquer dois objetos `RectanglePlus` pode ser comparado.

> Nota: O método `isLargerThan()`, conforme definido na interface `Relatable`, recebe um objeto do tipo `Relatable`. A linha de código converte `other` para uma instância de `RectanglePlus`. A conversão de tipo (type casting) informa ao compilador o que o objeto realmente é. Invocar `getArea()` diretamente na instância `other` (`other.getArea()`) falharia na compilação porque o compilador não entende que `other` é, na verdade, uma instância de `RectanglePlus`.

## Evoluindo Interfaces

Considere uma interface que você desenvolveu chamada `DoIt`:

```java
public interface DoIt {
    void doSomething(int i, double x);
    int doSomethingElse(String s);
}
```

Suponha que, mais tarde, você queira adicionar um terceiro método a `DoIt`, de modo que a interface agora se torne:

```java
public interface DoIt {
    void doSomething(int i, double x);
    int doSomethingElse(String s);
    boolean didItWork(int i, double x, String s);
}
```

Se você fizer essa alteração, todas as classes que implementam a antiga interface `DoIt` serão quebradas porque não implementam mais a interface antiga. Programadores que dependem dessa interface protestarão ruidosamente.

Tente antecipar todos os usos para sua interface e especifique-a completamente desde o início. Se você quiser adicionar métodos adicionais a uma interface, você tem várias opções. Você poderia criar uma interface `DoItPlus` que estende `DoIt`:

```java
public interface DoItPlus extends DoIt {
    boolean didItWork(int i, double x, String s);
}
```

Agora, os usuários do seu código podem escolher continuar a usar a interface antiga ou atualizar para a nova interface.

Alternativamente, você pode definir seus novos métodos como default methods. O exemplo a seguir define um default method chamado `didItWork()`:

```java
public interface DoIt {
    void doSomething(int i, double x);
    int doSomethingElse(String s);
    default boolean didItWork(int i, double x, String s) {
        // The default implementation is not very useful.
        return true;
    }
}
```

Observe que você deve fornecer uma implementação para default methods. Você também poderia definir novos static methods para interfaces existentes.

Usuários que possuem classes que implementam interfaces aprimoradas com novos default methods ou static methods não precisam modificá-las ou recompilá-las para acomodar os métodos adicionais, desde que esses novos default methods não entrem em conflito com nenhum método existente de outras interfaces implementadas por essas classes.

## Default Methods

A seção Interfaces descreve um exemplo que envolve fabricantes de carros controlados por computador que publicam interfaces padrão da indústria que descrevem quais métodos podem ser invocados para operar seus carros. E se esses fabricantes de carros controlados por computador adicionarem novas funcionalidades, como voo, aos seus carros? Esses fabricantes precisariam especificar novos métodos para permitir que outras empresas (como fabricantes de instrumentos de orientação eletrônica) adaptassem seu software a carros voadores. Onde esses fabricantes de carros declarariam esses novos métodos relacionados a voo? Se os adicionassem às suas interfaces originais, os programadores que implementaram essas interfaces teriam que reescrever suas implementações. Se os adicionassem como static methods, os programadores os considerariam métodos utilitários, e não métodos essenciais e centrais.

Default methods permitem que você adicione novas funcionalidades às interfaces de suas bibliotecas e garantam compatibilidade binária com código escrito para versões mais antigas dessas interfaces. Certifique-se de que os default methods que você adiciona não entrem em conflito com nenhum método existente de outras interfaces implementadas por essas classes.

Considere a seguinte interface, `TimeClient`:

```java
import java.time.*;

public interface TimeClient {
    void setTime(int hour, int minute, int second);
    void setDate(int day, int month, int year);
    void setDateAndTime(int day, int month, int year,
                               int hour, int minute, int second);
    LocalDateTime getLocalDateTime();
}
```

A seguinte classe, `SimpleTimeClient`, implementa `TimeClient`:

```java
import java.time.*;
import java.time.temporal.*;

public class SimpleTimeClient implements TimeClient {
    private LocalDateTime dateAndTime;

    public SimpleTimeClient() {
        dateAndTime = LocalDateTime.now();
    }

    public void setTime(int hour, int minute, int second) {
        LocalDate currentDate = LocalDate.from(dateAndTime);
        LocalTime newTime = LocalTime.of(hour, minute, second);
        dateAndTime = LocalDateTime.of(currentDate, newTime);
    }

    public void setDate(int day, int month, int year) {
        LocalDate newDate = LocalDate.of(year, month, day);
        LocalTime currentTime = LocalTime.from(dateAndTime);
        dateAndTime = LocalDateTime.of(newDate, currentTime);
    }

    public void setDateAndTime(int day, int month, int year,
                               int hour, int minute, int second) {
        dateAndTime = LocalDateTime.of(year, month, day, hour, minute, second);
    }

    public LocalDateTime getLocalDateTime() {
        return dateAndTime;
    }

    public String toString() {
        return dateAndTime.toString();
    }

    public static void main(String... args) {
        TimeClient myTimeClient = new SimpleTimeClient();
        System.out.println(myTimeClient.getLocalDateTime());
    }
}
```

Suponha que você queira adicionar novas funcionalidades à interface `TimeClient`, como a capacidade de especificar um fuso horário através de um objeto [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>) (que é como um objeto [`LocalDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDateTime.html>), exceto que armazena informações de fuso horário):

```java
import java.time.*;

public interface TimeClient {
    void setTime(int hour, int minute, int second);
    void setDate(int day, int month, int year);
    void setDateAndTime(int day, int month, int year,
                               int hour, int minute, int second);
    LocalDateTime getLocalDateTime();
    ZonedDateTime getZonedDateTime(String zoneString);
}
```

Após esta modificação na interface `TimeClient`, você também teria que modificar a classe `SimpleTimeClient` e implementar o método `getZonedDateTime()`. No entanto, em vez de deixar `getZonedDateTime()` como abstrato (como no exemplo anterior), você pode definir uma implementação padrão. (Lembre-se de que um método abstrato é um método declarado sem uma implementação.)

```java
import java.time.*;
import java.time.temporal.*;

public interface TimeClient {
    void setTime(int hour, int minute, int second);
    void setDate(int day, int month, int year);
    void setDateAndTime(int day, int month, int year,
                               int hour, int minute, int second);
    LocalDateTime getLocalDateTime();

    static ZoneId get  ZoneId (String zoneString) {
        try {
            return ZoneId.of(zoneString);
        } catch (DateTimeException e) {
            System.err.println("Invalid zone ID: " + zoneString +
                "; using default time zone instead.");
            return ZoneId.systemDefault();
        }
    }

    default ZonedDateTime getZonedDateTime(String zoneString) {
        return ZonedDateTime.of(getLocalDateTime(), getZoneId(zoneString));
    }
}
```

Você especifica que uma definição de método em uma interface é um default method com a palavra-chave `default` no início da assinatura do método. Todas as declarações de método em uma interface, incluindo default methods, são implicitamente public, então você pode omitir o modificador public.

Com esta interface, você não precisa modificar a classe `SimpleTimeClient`, e esta classe (e qualquer classe que implemente a interface `TimeClient`) terá o método `getZonedDateTime()` já definido. O exemplo a seguir, `TestSimpleTimeClient`, invoca o método `getZonedDateTime()` de uma instância de `SimpleTimeClient`:

```java
import java.time.*;
import java.time.temporal.*;

public class TestSimpleTimeClient {
    public static void main(String... args) {
        TimeClient myTimeClient = new SimpleTimeClient();
        System.out.println("Current time: " + myTimeClient.getLocalDateTime());
        System.out.println("Current time in Berlin: " +
            myTimeClient.getZonedDateTime("Europe/Berlin"));
    }
}
```

## Estendendo Interfaces que Contêm Default Methods

Ao estender uma interface que contém um default method, você pode fazer o seguinte:

*   Não mencionar o default method, o que permite que sua interface estendida herde o default method.
*   Redeclarar o default method, o que o torna abstrato.
*   Redefinir o default method, o que o sobrescreve.
*   Suponha que você estenda a interface `TimeClient` da seguinte forma:

```java
public interface AnotherTimeClient extends TimeClient { }
```

Qualquer classe que implemente a interface `AnotherTimeClient` terá a implementação especificada pelo default method `TimeClient.getZonedDateTime()`.

Suponha que você estenda a interface `TimeClient` da seguinte forma:

```java
public interface AbstractZoneTimeClient extends TimeClient {
    @Override
    ZonedDateTime getZonedDateTime(String zoneString);
}
```

Qualquer classe que implemente a interface `AbstractZoneTimeClient` terá que implementar o método `getZonedDateTime()`; este método é um método abstrato como todos os outros métodos não-default (e não-static) em uma interface.

Suponha que você estenda a interface TimeClient da seguinte forma:

```java
import java.time.*;
import java.time.temporal.*;

public interface HandleInvalidTimeZoneClient extends TimeClient {
    default ZonedDateTime getZonedDateTime(String zoneString) {
        try {
            return ZonedDateTime.of(getLocalDateTime(), ZoneId.of(zoneString));
        } catch (DateTimeException e) {
            System.err.println("Invalid zone ID: " + zoneString +
                "; using the default time zone instead.");
            return ZonedDateTime.of(getLocalDateTime(), ZoneId.systemDefault());
        }
    }
}
```

Qualquer classe que implemente a interface `HandleInvalidTimeZoneClient` usará a implementação de `getZonedDateTime()` especificada por esta interface em vez daquela especificada pela interface `TimeClient`.

## Static Methods

Além dos default methods, você pode definir static methods em interfaces. (Um static method é um método associado à classe na qual é definido, e não a qualquer objeto. Cada instância da classe compartilha seus static methods.) Isso facilita a organização de métodos auxiliares em suas bibliotecas; você pode manter static methods específicos de uma interface na mesma interface, em vez de em uma classe separada. O exemplo a seguir define um static method que recupera um objeto [`ZoneId`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZoneId.html>) correspondente a um identificador de fuso horário; ele usa o fuso horário padrão do sistema se não houver um objeto [`ZoneId`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZoneId.html>) correspondente ao identificador fornecido. (Como resultado, você pode simplificar o método `getZonedDateTime()`):

```java
import java.time.*;
import java.time.temporal.*;

public interface TimeClient {
    void setTime(int hour, int minute, int second);
    void setDate(int day, int month, int year);
    void setDateAndTime(int day, int month, int year,
                               int hour, int minute, int second);
    LocalDateTime getLocalDateTime();

    static ZoneId getZoneId (String zoneString) {
        try {
            return ZoneId.of(zoneString);
        } catch (DateTimeException e) {
            System.err.println("Invalid zone ID: " + zoneString +
                "; using default time zone instead.");
            return ZoneId.systemDefault();
        }
    }

    default ZonedDateTime getZonedDateTime(String zoneString) {
        return ZonedDateTime.of(getLocalDateTime(), getZoneId(zoneString));
    }
}
```

Assim como os static methods em classes, você especifica que uma definição de método em uma interface é um static method com a palavra-chave `static` no início da assinatura do método. Todas as declarações de método em uma interface, incluindo static methods, são implicitamente public, então você pode omitir o modificador public.

A partir do Java SE 9, você pode definir private methods em uma interface para abstrair um trecho comum de código de default methods de uma interface enquanto define sua implementação. Esses métodos pertencem à implementação e não podem ser nem default nem abstract quando definidos. Por exemplo, você poderia tornar o método `getZoneId` private, já que ele contém um trecho de código interno à implementação da interface.

## Integrando Default Methods em Bibliotecas Existentes

Default methods permitem que você adicione novas funcionalidades a interfaces existentes e garantam compatibilidade binária com código escrito para versões mais antigas dessas interfaces. Em particular, default methods permitem que você adicione métodos que aceitam lambda expressions como parâmetros a interfaces existentes. Esta seção demonstra como a interface [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) foi aprimorada com default e static methods.

Considere as classes `Card` e `Deck`. A interface `Card` contém dois tipos `enum` (`Suit` e `Rank`) e dois métodos abstratos (`getSuit()` e `getRank()`):

```java
public interface Card extends Comparable<Card> {
    public enum Suit {
        DIAMONDS (1, "Diamonds"),
        CLUBS    (2, "Clubs"   ),
        HEARTS   (3, "Hearts"  ),
        SPADES   (4, "Spades"  );

        private final int value;
        private final String text;
        Suit(int value, String text) {
            this.value = value;
            this.text = text;
        }
        public int value() {return value;}
        public String text() {return text;}
    }

    public enum Rank {
        DEUCE  (1, "Deuce"),
        THREE  (2, "Three"),
        FOUR   (3, "Four" ),
        FIVE   (4, "Five" ),
        SIX    (5, "Six"  ),
        SEVEN  (6, "Seven"),
        EIGHT  (7, "Eight"),
        NINE   (8, "Nine" ),
        TEN    (9, "Ten"  ),
        JACK  (10, "Jack" ),
        QUEEN (11, "Queen"),
        KING  (12, "King" ),
        ACE   (13, "Ace"  );

        private final int value;
        private final String text;
        Rank(int value, String text) {
            this.value = value;
            this.text = text;
        }
        public int value() {return value;}
        public String text() {return text;}
    }

    public Card.Suit getSuit();
    public Card.Rank getRank();
}
```

A interface `Deck` contém vários métodos que manipulam cartas em um baralho:

```java
import java.util.*;

public interface Deck {
    List<Card> getCards();
    Deck deckFactory();
    int size();
    void addCard(Card card);
    void addCards(List<Card> cards);
    void shuffle();
    void sort();
    Card deal();
    void collectAllCards();
}
```

A classe `PlayingCard` implementa a interface `Card`, e a classe `StandardDeck` implementa a interface `Deck`.

A classe `StandardDeck` implementa o método abstrato `Deck.sort()` da seguinte forma:

```java
public void sort() {
    Collections.sort(entireDeck);
}
```

O método [`Collections.sort()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html#sort\(java.util.List\)>) ordena uma instância de [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) cujo tipo de elemento implementa a interface [`Comparable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html>). O membro `entireDeck` é uma instância de [`List`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/List.html>) cujos elementos são do tipo `Card`, que estende [`Comparable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html>). A classe `PlayingCard` implementa o método [`Comparable.compareTo()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html#compareTo\(T\)>) da seguinte forma:

```java
public int compareTo(Card o) {
    return this.rank.value() - o.getRank().value();
}
```

O método [`compareTo()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html#compareTo\(T\)>) faz com que o método `StandardDeck.sort()` ordene o baralho de cartas primeiro por naipe, e depois por valor.

E se você quiser ordenar o baralho primeiro por valor, e depois por naipe? Você precisaria implementar a interface [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) para especificar novos critérios de ordenação, e usar o método [`sort(List<T> list, Comparator<? super T> c)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html#sort\(java.util.List,java.util.Comparator\)>) (a versão do método sort que inclui um parâmetro [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>)). Você pode definir o seguinte método na classe `StandardDeck`:

```java
public void sort(Comparator<Card> c) {
    Collections.sort(entireDeck, c);
}
```

Com este método, você pode especificar como o método [`Collections.sort()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html#sort\(java.util.List\)>) ordena instâncias da classe `Card`. Uma maneira de fazer isso é implementar a interface [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) para especificar como você deseja que as cartas sejam ordenadas. O exemplo `SortByRankThenSuit` faz isso:

```java
import java.util.Comparator;
import com.example.annoyances.Card;

public class SortByRankThenSuit implements Comparator<Card> {
    public int compare(Card firstCard, Card secondCard) {
        int compVal =
            firstCard.getRank().value() - secondCard.getRank().value();
        if (compVal != 0)
            return compVal;
        else
            return firstCard.getSuit().value() - secondCard.getSuit().value();
    }
}
```

A seguinte invocação ordena o baralho de cartas primeiro por valor, e depois por naipe:

```java
deck.sort(new SortByRankThenSuit());
```

No entanto, esta abordagem é muito verbosa; seria melhor se você pudesse especificar apenas os critérios de ordenação e evitar a criação de múltiplas implementações de ordenação. Suponha que você seja o desenvolvedor que escreveu a interface [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>). Que default ou static methods você poderia adicionar à interface [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) para permitir que outros desenvolvedores especificassem critérios de ordenação mais facilmente?

Para começar, suponha que você queira ordenar o baralho de cartas por valor, independentemente do naipe. Você pode invocar o método `StandardDeck.sort()` da seguinte forma:

```java
deck.sort((c1, c2) -> c1.getRank().value() - c2.getRank().value());
```

Como a interface [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) é uma functional interface, você pode usar uma lambda expression como argumento para o método `sort()`. Neste exemplo, a lambda expression compara dois valores inteiros.

Seria mais simples para seus desenvolvedores se eles pudessem criar uma instância de [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) invocando apenas o método `Card.getRank()`. Em particular, seria útil se seus desenvolvedores pudessem criar uma instância de [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) que compara qualquer objeto que possa retornar um valor numérico de um método como `getValue()` ou `hashCode()`. A interface [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) foi aprimorada com essa capacidade através do static method `comparing`:

```java
deck.sort(Comparator.comparing((card) -> card.getRank().value()));
```

Neste exemplo, você pode usar uma method reference em vez disso:

```java
deck.sort(Comparator.comparing(Card::getRank));
```

Esta invocação demonstra melhor como especificar diferentes critérios de ordenação e evitar a criação de múltiplas implementações de ordenação.

A interface [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) foi aprimorada com outras versões do static method `comparing`, como [`comparingDouble()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#comparingDouble\(java.util.function.ToDoubleFunction\)>) e [`comparingLong()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#comparingLong\(java.util.function.ToLongFunction\)>), que permitem criar instâncias de [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) que comparam outros tipos de dados.

Suponha que seus desenvolvedores gostariam de criar uma instância de [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) que pudesse comparar objetos com mais de um critério. Por exemplo, como você ordenaria o baralho de cartas primeiro por valor, e depois por naipe? Como antes, você poderia usar uma lambda expression para especificar esses critérios de ordenação:

```java
deck.sort((c1, c2) -> {
    int compare = c1.getRank().value() - c2.getRank().value();
    if (compare == 0)
        compare = c1.getSuit().value() - c2.getSuit().value();
    return compare;
});
```

Seria mais simples para seus desenvolvedores se eles pudessem construir uma instância de [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) a partir de uma série de instâncias de [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>). A interface [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) foi aprimorada com essa capacidade através do default method [`thenComparing()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#thenComparing\(java.util.Comparator\)>):

```java
deck.sort(Comparator.comparing(Card::getRank)
        .thenComparing(Comparator.comparing(Card::getSuit)));
```

A interface [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) foi aprimorada com outras versões do default method [`thenComparing()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#thenComparing\(java.util.Comparator\)>):

1.  [`thenComparing(Function)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#thenComparing\(java.util.function.Function\)>): que recebe uma função usada para extrair uma chave usada para comparar os elementos. Observe que esta chave deve ser uma instância de [`Comparable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html>).
2.  [`thenComparingInt()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#thenComparingInt\(java.util.function.ToIntFunction\)>), [`thenComparingLong()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#thenComparingLong\(java.util.function.ToLongFunction\)>) e [`thenComparingDouble()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#thenComparingDouble\(java.util.function.ToDoubleFunction\)>), que fazem o mesmo que a sobrecarga anterior, mas sem ter que pagar o preço de boxing e unboxing da chave.

Você pode usar a primeira sobrecarga para reescrever o exemplo anterior de uma maneira mais simples:

```java
deck.sort(Comparator.comparing(Card::getRank)
        .thenComparing(Card::getSuit));
```

Suponha que seus desenvolvedores gostariam de criar uma instância de [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) que lhes permitisse ordenar uma coleção de objetos em ordem inversa. Por exemplo, como você ordenaria o baralho de cartas primeiro por ordem decrescente de valor, do Ás ao Dois (em vez de do Dois ao Ás)? Como antes, você poderia especificar outra lambda expression. No entanto, seria mais simples para seus desenvolvedores se eles pudessem inverter um [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) existente invocando um método. A interface [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) foi aprimorada com essa capacidade através do default method [`reversed()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html#reversed\(\)>):

```java
deck.sort(Comparator.comparing(Card::getRank).reversed()
        .thenComparing(Card::getSuit).reversed());
```

Este exemplo demonstra como a interface [`Comparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Comparator.html>) foi aprimorada com default methods, static methods, lambda expressions e method references para criar métodos de biblioteca mais expressivos, cuja funcionalidade os programadores podem deduzir rapidamente observando como são invocados. Use esses construtos para aprimorar as interfaces em suas bibliotecas.

### Neste tutorial

Definindo a Interface Relatable Implementando a Interface Relatable Evoluindo Interfaces Default Methods Estendendo Interfaces que Contêm Default Methods Static Methods Integrando Default Methods em Bibliotecas Existentes

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Interfaces](<#/doc/tutorials/interfaces/defining-interfaces>)

➜

**Tutorial Atual**

Implementando uma Interface

➜

**Próximo na Série**

[Usando uma Interface como um Tipo](<#/doc/tutorials/interfaces/interfaces-as-a-type>)

**Anterior na Série:** [Interfaces](<#/doc/tutorials/interfaces/defining-interfaces>)

**Próximo na Série:** [Usando uma Interface como um Tipo](<#/doc/tutorials/interfaces/interfaces-as-a-type>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Interfaces ](<#/doc/tutorials/interfaces>) > Implementando uma Interface