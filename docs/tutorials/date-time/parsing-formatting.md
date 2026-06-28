# Análise e Formatação

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Date Time ](<#/doc/tutorials/date-time>) > Análise e Formatação

**Anterior na Série**

[Instant](<#/doc/tutorials/date-time/instant>)

➜

**Tutorial Atual**

Análise e Formatação

➜

**Próximo na Série**

[O Pacote Temporal](<#/doc/tutorials/date-time/temporal>)

**Anterior na Série:** [Instant](<#/doc/tutorials/date-time/instant>)

**Próximo na Série:** [O Pacote Temporal](<#/doc/tutorials/date-time/temporal>)

# Análise e Formatação

As classes baseadas em temporal na API Date-Time fornecem métodos `parse()` para analisar uma string que contém informações de data e hora. Essas classes também fornecem métodos `format()` para formatar objetos baseados em temporal para exibição. Em ambos os casos, o processo é semelhante: você fornece um padrão para o [`DateTimeFormatter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/format/DateTimeFormatter.html>) para criar um objeto `formatter`. Este `formatter` é então passado para o método `parse()` ou `format()`.

A classe [`DateTimeFormatter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/format/DateTimeFormatter.html>) fornece vários formatadores predefinidos, ou você pode definir o seu próprio.

Os métodos `parse()` e `format()` lançam uma exceção se ocorrer um problema durante o processo de conversão. Portanto, seu código de análise deve capturar o erro [`DateTimeParseException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/format/DateTimeParseException.html>) e seu código de formatação deve capturar o erro [`DateTimeException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/DateTimeException.html>). Para mais informações sobre tratamento de exceções, consulte a seção [Capturando e Tratando Exceções](<#/doc/tutorials/exceptions>).

A classe [`DateTimeFormatter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/format/DateTimeFormatter.html>) é imutável e thread-safe; ela pode (e deve) ser atribuída a uma constante estática quando apropriado.

> Nota de Versão: Os objetos de data e hora [`java.time`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/package-summary.html>) podem ser usados diretamente com [`java.util.Formatter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Formatter.html>) e [`String.format()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#format\(java.lang.String,java.lang.Object...\)>) usando a formatação baseada em padrão familiar que era utilizada com as classes legadas [`java.util.Date`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Date.html>) e [`java.util.Calendar`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Calendar.html>).

## Análise

O método [`parse(CharSequence)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html#parse\(java.lang.CharSequence\)>) de um argumento na classe [`LocalDate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html>) usa o formatador ISO_LOCAL_DATE. Para especificar um formatador diferente, você pode usar o método [`parse(CharSequence, DateTimeFormatter)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html#parse\(java.lang.CharSequence,java.time.format.DateTimeFormatter\)>) de dois argumentos. O exemplo a seguir usa o formatador predefinido BASIC_ISO_DATE, que usa o formato 19590709 para 9 de julho de 1959.

```java
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class ParseExample {
    public static void main(String[] args) {
        // Using ISO_LOCAL_DATE (default for LocalDate.parse(CharSequence))
        LocalDate date1 = LocalDate.parse("1959-07-09");
        System.out.println("Parsed date (ISO_LOCAL_DATE): " + date1);

        // Using BASIC_ISO_DATE
        DateTimeFormatter formatter = DateTimeFormatter.BASIC_ISO_DATE;
        LocalDate date2 = LocalDate.parse("19590709", formatter);
        System.out.println("Parsed date (BASIC_ISO_DATE): " + date2);
    }
}
```

Você também pode definir um formatador usando seu próprio padrão. O código a seguir cria um formatador que aplica o formato `MMM d yyyy`. Este formato especifica três caracteres para representar o mês, um dígito para representar o dia do mês e quatro dígitos para representar o ano. Um formatador criado usando este padrão reconheceria strings como "Jan 3 2003" ou "Mar 23 1994". No entanto, para especificar o formato como `MMM dd yyyy`, com dois caracteres para o dia do mês, então você teria que sempre usar dois caracteres, preenchendo com um zero para uma data de um dígito: "Jun 03 2003".

```java
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class CustomParseExample {
    public static void main(String[] args) {
        // Define a custom formatter
        DateTimeFormatter customFormatter = DateTimeFormatter.ofPattern("MMM d yyyy");

        // Parse strings using the custom formatter
        LocalDate date1 = LocalDate.parse("Jan 3 2003", customFormatter);
        System.out.println("Parsed date (custom 'MMM d yyyy'): " + date1);

        LocalDate date2 = LocalDate.parse("Mar 23 1994", customFormatter);
        System.out.println("Parsed date (custom 'MMM d yyyy'): " + date2);

        // Example with 'dd' for day
        DateTimeFormatter customFormatterPadded = DateTimeFormatter.ofPattern("MMM dd yyyy");
        LocalDate date3 = LocalDate.parse("Jun 03 2003", customFormatterPadded);
        System.out.println("Parsed date (custom 'MMM dd yyyy'): " + date3);
    }
}
```

A documentação para a classe [`DateTimeFormatter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/format/DateTimeFormatter.html>) especifica a lista completa de símbolos que você pode usar para especificar um padrão para formatação ou análise.

O [exemplo StringConverter](<#/doc/tutorials/date-time/non-iso-conversion>) na página [Conversão de Data Não-ISO](<#/doc/tutorials/date-time/non-iso-conversion>) fornece outro exemplo de formatador de data.

## Formatação

O método [`format(DateTimeFormatter)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#format\(java.lang.String,java.lang.Object...\)>) converte um objeto baseado em temporal para uma representação de string usando o formato especificado. O código a seguir converte uma instância de [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>) usando o formato `MMM d yyy hh:mm a`. A data é definida da mesma maneira que foi usada para o exemplo de análise anterior, mas este padrão também inclui os componentes de hora, minutos e a.m. e p.m..

```java
import java.time.ZonedDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class FormatExample {
    public static void main(String[] args) {
        // Define a ZonedDateTime instance
        ZonedDateTime departure = ZonedDateTime.of(2023, 10, 26, 9, 30, 0, 0, ZoneId.of("America/New_York"));
        ZonedDateTime arrival = ZonedDateTime.of(2023, 10, 26, 14, 45, 0, 0, ZoneId.of("Europe/London"));

        // Define a custom formatter
        DateTimeFormatter customFormatter = DateTimeFormatter.ofPattern("MMM d yyy hh:mm a");

        // Format the ZonedDateTime instances
        String formattedDeparture = departure.format(customFormatter);
        String formattedArrival = arrival.format(customFormatter);

        System.out.println("Departure: " + formattedDeparture);
        System.out.println("Arrival: " + formattedArrival);
    }
}
```

A saída para este exemplo, que imprime tanto a hora de chegada quanto a de partida, é a seguinte:

```
Departure: Oct 26 2023 09:30 AM
Arrival: Oct 26 2023 02:45 PM
```

### Neste tutorial

Análise
Formatação

Última atualização: 27 de janeiro de 2022

**Anterior na Série**

[Instant](<#/doc/tutorials/date-time/instant>)

➜

**Tutorial Atual**

Análise e Formatação

➜

**Próximo na Série**

[O Pacote Temporal](<#/doc/tutorials/date-time/temporal>)

**Anterior na Série:** [Instant](<#/doc/tutorials/date-time/instant>)

**Próximo na Série:** [O Pacote Temporal](<#/doc/tutorials/date-time/temporal>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Date Time ](<#/doc/tutorials/date-time>) > Análise e Formatação