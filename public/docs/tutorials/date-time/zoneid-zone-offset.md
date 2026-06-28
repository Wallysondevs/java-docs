# Fuso Horário e Offset

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Data e Hora ](<#/doc/tutorials/date-time>) > Fuso Horário e Offset

**Anterior na Série**

[Data e Hora](<#/doc/tutorials/date-time/local-time>)

➜

**Tutorial Atual**

Fuso Horário e Offset

➜

**Próximo na Série**

[Instant](<#/doc/tutorials/date-time/instant>)

**Anterior na Série:** [Data e Hora](<#/doc/tutorials/date-time/local-time>)

**Próximo na Série:** [Instant](<#/doc/tutorials/date-time/instant>)

# Fuso Horário e Offset

Um _fuso horário_ é uma região da Terra onde o mesmo horário padrão é usado. Cada fuso horário é descrito por um identificador e geralmente tem o formato _região/cidade_ (`Asia/Tokyo`) e um offset do horário de Greenwich/UTC. Por exemplo, o offset para Tóquio é `+09:00`.

## As Classes ZoneId e ZoneOffset

A API de Data e Hora fornece duas classes para especificar um fuso horário ou um offset:

  * [`ZoneId`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZoneId.html>) especifica um identificador de fuso horário e fornece regras para converter entre um Instant e um [`LocalDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDateTime.html>).
  * [`ZoneOffset`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZoneOffset.html>) especifica um offset de fuso horário em relação ao horário de Greenwich/UTC.

Offsets do horário de Greenwich/UTC são geralmente definidos em horas inteiras, mas existem exceções. O código a seguir imprime uma lista de todos os fusos horários que usam offsets de Greenwich/UTC que não são definidos em horas inteiras.

```java
Set<String> allZones = ZoneId.getAvailableZoneIds();

LocalDateTime dt = LocalDateTime.now();

// Create a List of ZoneId for Zones that have a non-whole offset
// from GMT/UTC
List<String> zoneList = allZones.stream()
    .filter(z -> {
        ZoneId zone = ZoneId.of(z);
        ZoneOffset offset = dt.atZone(zone).getOffset();
        return offset.getTotalSeconds() % (60 * 60) != 0;
    })
    .sorted()
    .collect(Collectors.toList());

System.out.println(zoneList);
```

Este exemplo imprime a seguinte lista na saída padrão. Observe que seu resultado pode variar dependendo da versão do JDK que você está usando.

```
[America/St_Johns, Asia/Calcutta, Asia/Kathmandu, Asia/Tehran, Australia/Adelaide, Australia/Broken_Hill, Australia/Darwin, Australia/Eucla, Australia/Lord_Howe, Europe/Chisinau, Europe/Istanbul, Indian/Cocos, Pacific/Chatham, Pacific/Gambier, Pacific/Marquesas, Pacific/Norfolk]
```

## As Classes de Data e Hora

A API de Data e Hora fornece três classes baseadas em tempo que trabalham com fusos horários:

  * [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>) lida com uma data e hora com um fuso horário correspondente com um offset de fuso horário em relação a Greenwich/UTC.
  * [`OffsetDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/OffsetDateTime.html>) lida com uma data e hora com um offset de fuso horário correspondente em relação a Greenwich/UTC, sem um ID de fuso horário.
  * [`OffsetTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/OffsetTime.html>) lida com o tempo com um offset de fuso horário correspondente em relação a Greenwich/UTC, sem um ID de fuso horário.

Quando você usaria [`OffsetDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/OffsetDateTime.html>) em vez de [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>)? Se você está escrevendo um software complexo que modela suas próprias regras para cálculos de data e hora baseados em localizações geográficas, ou se você está armazenando carimbos de data/hora em um banco de dados que rastreia apenas offsets absolutos do horário de Greenwich/UTC, então você pode querer usar [`OffsetDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/OffsetDateTime.html>). Além disso, XML e outros formatos de rede definem a transferência de data-hora como [`OffsetDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/OffsetDateTime.html>) ou [`OffsetTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/OffsetTime.html>).

Embora todas as três classes mantenham um offset do horário de Greenwich/UTC, apenas [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>) usa as [`ZoneRules`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/zone/ZoneRules.html>), parte do pacote [`java.time.zone`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/zone/package-summary.html>), para determinar como um offset varia para um fuso horário específico. Por exemplo, a maioria dos fusos horários experimenta uma lacuna (tipicamente de 1 hora) ao adiantar o relógio para o horário de verão, e uma sobreposição de tempo ao atrasar o relógio para o horário padrão, onde a última hora antes da transição é repetida. A classe [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>) acomoda este cenário, enquanto as classes [`OffsetDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/OffsetDateTime.html>) e [`OffsetTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/OffsetTime.html>), que não têm acesso às [`ZoneRules`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/zone/ZoneRules.html>), não o fazem.

## A Classe ZonedDateTime

A classe [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>), na prática, combina a classe [`LocalDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDateTime.html>) com a classe [`ZoneId`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZoneId.html>). Ela é usada para representar uma data completa (ano, mês, dia) e hora (hora, minuto, segundo, nanossegundo) com um fuso horário (região/cidade, como Europe/Paris).

O código a seguir define o horário de partida de um voo de São Francisco para Tóquio como um [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>) no fuso horário America/Los Angeles. Os métodos [`withZoneSameInstant()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html#withZoneSameInstant\(java.time.ZoneId\)>) e [`plusMinutes()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html#plusMinutes\(long\)>) são usados para criar uma instância de [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>) que representa o horário de chegada projetado em Tóquio, após o voo de 650 minutos. O método [`ZoneRules.isDaylightSavings()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/zone/ZoneRules.html#isDaylightSavings\(java.time.Instant\)>) determina se é horário de verão quando o voo chega em Tóquio.

Um objeto [`DateTimeFormatter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/format/DateTimeFormatter.html>) é usado para formatar as instâncias de [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>) para impressão:

```java
DateTimeFormatter format = DateTimeFormatter.ofPattern("MMM d yyyy HH:mm a");

// Leaving from San Francisco on July 20, 2013, 7:30 a.m.
LocalDateTime leaving = LocalDateTime.of(2013, Month.JULY, 20, 7, 30);
ZoneId leavingZone = ZoneId.of("America/Los_Angeles");
ZonedDateTime departure = ZonedDateTime.of(leaving, leavingZone);
try {
    String out1 = departure.format(format);
    System.out.printf("LEAVING:  %s (%s)%n", out1, leavingZone);
} catch (DateTimeException exc) {
    System.out.printf("%s%n", exc.getMessage());
}

// Flight is 10 hours and 50 minutes, or 650 minutes
ZoneId arrivingZone = ZoneId.of("Asia/Tokyo");
ZonedDateTime arrival = departure.withZoneSameInstant(arrivingZone).plusMinutes(650);
try {
    String out2 = arrival.format(format);
    System.out.printf("ARRIVING: %s (%s)%n", out2, arrivingZone);
} catch (DateTimeException exc) {
    System.out.printf("%s%n", exc.getMessage());
}

if (arrivingZone.getRules().isDaylightSavings(arrival.toInstant())) {
    System.out.printf("  (%s daylight savings)%n", arrivingZone);
} else {
    System.out.printf("  (%s standard time)%n", arrivingZone);
}
```

Isso produz a seguinte saída:

```
LEAVING:  Jul 20 2013 07:30 AM (America/Los_Angeles)
ARRIVING: Jul 21 2013 03:20 PM (Asia/Tokyo)
  (Asia/Tokyo standard time)
```

## A Classe OffsetDateTime

A classe [`OffsetDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/OffsetDateTime.html>), na prática, combina a classe [`LocalDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDateTime.html>) com a classe [`ZoneOffset`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZoneOffset.html>). Ela é usada para representar uma data completa (ano, mês, dia) e hora (hora, minuto, segundo, nanossegundo) com um offset do horário de Greenwich/UTC (+/-horas:minutos, como +06:00 ou -08:00).

O exemplo a seguir usa [`OffsetDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/OffsetDateTime.html>) com o método [`TemporalAdjusters.lastInMonth()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalAdjusters.html#lastInMonth\(java.time.DayOfWeek\)>) para encontrar a última quinta-feira de julho de 2013.

```java
// Find the last Thursday in July 2013.
LocalDateTime localDate = LocalDateTime.of(2013, Month.JULY, 20, 19, 30);
ZoneOffset offset = ZoneOffset.of("-08:00");
OffsetDateTime offsetDate = OffsetDateTime.of(localDate, offset);
OffsetDateTime lastThursday =
    offsetDate.with(TemporalAdjusters.lastInMonth(DayOfWeek.THURSDAY));
System.out.printf("The last Thursday in July 2013 is the %sth.%n",
                  lastThursday.getDayOfMonth());
```

A saída da execução deste código é:

```
The last Thursday in July 2013 is the 25th.
```

## A Classe OffsetTime

A classe [`OffsetTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/OffsetTime.html>), na prática, combina a classe [`LocalTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalTime.html>) com a classe [`ZoneOffset`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZoneOffset.html>). Ela é usada para representar o tempo (hora, minuto, segundo, nanossegundo) com um offset do horário de Greenwich/UTC (+/-horas:minutos, como +06:00 ou -08:00).

A classe [`OffsetTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/OffsetTime.html>) é usada nas mesmas situações que a classe [`OffsetDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/OffsetDateTime.html>), mas quando o rastreamento da data não é necessário.

### Neste tutorial

As Classes ZoneId e ZoneOffset As Classes de Data e Hora A Classe ZonedDateTime A Classe OffsetDateTime A Classe OffsetTime

Última atualização: 27 de janeiro de 2022

**Anterior na Série**

[Data e Hora](<#/doc/tutorials/date-time/local-time>)

➜

**Tutorial Atual**

Fuso Horário e Offset

➜

**Próximo na Série**

[Instant](<#/doc/tutorials/date-time/instant>)

**Anterior na Série:** [Data e Hora](<#/doc/tutorials/date-time/local-time>)

**Próximo na Série:** [Instant](<#/doc/tutorials/date-time/instant>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Data e Hora ](<#/doc/tutorials/date-time>) > Fuso Horário e Offset