# Data

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Data e Hora ](<#/doc/tutorials/date-time>) > Data

**Anterior na Série**

[Enums DayOfWeek e Month](<#/doc/tutorials/date-time/dayofweek-month>)

➜

**Tutorial Atual**

Data

➜

**Próximo na Série**

[Data e Hora](<#/doc/tutorials/date-time/local-time>)

**Anterior na Série:** [Enums DayOfWeek e Month](<#/doc/tutorials/date-time/dayofweek-month>)

**Próximo na Série:** [Data e Hora](<#/doc/tutorials/date-time/local-time>)

# Data

A API de Data e Hora fornece quatro classes que lidam exclusivamente com informações de data, sem considerar a hora ou o fuso horário. O uso dessas classes é sugerido pelos nomes das classes: [`LocalDate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html>), [`YearMonth`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/YearMonth.html>), [`MonthDay`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/MonthDay.html>), e [`Year`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Year.html>).

## A Classe LocalDate

Uma [`LocalDate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html>) representa um ano-mês-dia no calendário ISO e é útil para representar uma data sem uma hora. Você pode usar uma [`LocalDate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html>) para rastrear um evento significativo, como uma data de nascimento ou data de casamento. Os exemplos a seguir usam os métodos of e with para criar instâncias de [`LocalDate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html>):

```java
LocalDate date = LocalDate.of(2000, Month.NOVEMBER, 20);
LocalDate nextWed = date.with(TemporalAdjusters.next(DayOfWeek.WEDNESDAY));
System.out.println(nextWed); // 2000-11-22
```

Para mais informações sobre a interface [`TemporalAdjuster`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalAdjuster.html>), consulte a seção sobre [Temporal Adjuster](<#/doc/tutorials/date-time/temporal>).

Além dos métodos usuais, a classe [`LocalDate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html>) oferece métodos getter para obter informações sobre uma determinada data. O método [`getDayOfWeek()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html#getDayOfWeek\(\)>) retorna o dia da semana em que uma data específica cai. Por exemplo, a seguinte linha de código retorna "MONDAY":

```java
LocalDate date = LocalDate.of(2000, Month.NOVEMBER, 20);
DayOfWeek dow = date.getDayOfWeek();
System.out.println(dow); // MONDAY
```

O exemplo a seguir usa um [`TemporalAdjuster`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalAdjuster.html>) para recuperar a primeira quarta-feira após uma data específica.

```java
LocalDate date = LocalDate.of(2000, Month.NOVEMBER, 20);
TemporalAdjuster adj = TemporalAdjusters.next(DayOfWeek.WEDNESDAY);
LocalDate nextWed = date.with(adj);
System.out.println(nextWed);
```

A execução do código produz o seguinte:

```
2000-11-22
```

A seção [Período e Duração](<#/doc/tutorials/date-time/period-duration>) também contém exemplos usando a classe [`LocalDate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html>).

## A Classe YearMonth

A classe [`YearMonth`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/YearMonth.html>) representa o mês de um ano específico. O exemplo a seguir usa o método [`lengthOfMonth()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/YearMonth.html#lengthOfMonth\(\)>) para determinar o número de dias para várias combinações de ano e mês.

```java
YearMonth date = YearMonth.of(2010, Month.MARCH);
System.out.printf("%s: %d%n", date, date.lengthOfMonth());

YearMonth date2 = YearMonth.of(2012, Month.FEBRUARY);
System.out.printf("%s: %d%n", date2, date2.lengthOfMonth());
```

A saída deste código é a seguinte:

```
2010-03: 31
2012-02: 29
```

## A Classe MonthDay

A classe [`MonthDay`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/MonthDay.html>) representa o dia de um mês específico, como o Dia de Ano Novo em 1º de janeiro.

O exemplo a seguir usa o método [`isValidYear()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/MonthDay.html#isValidYear\(int\)>) para determinar se 29 de fevereiro é válido para o ano de 2010. A chamada retorna false, confirmando que 2010 não é um ano bissexto.

```java
MonthDay date = MonthDay.of(Month.FEBRUARY, 29);
boolean validLeapYear = date.isValidYear(2010); // false
```

## A Classe Year

A classe [`Year`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Year.html>) representa um ano. O exemplo a seguir usa o método [`isLeap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Year.html#isLeap\(\)>) para determinar se o ano fornecido é um ano bissexto. A chamada retorna `true`, confirmando que 2012 é um ano bissexto.

```java
Year year = Year.of(2012);
boolean isLeap = year.isLeap(); // true
```

### Neste tutorial

A Classe LocalDate A Classe YearMonth A Classe MonthDay A Classe Year

Última atualização: 27 de janeiro de 2022

**Anterior na Série**

[Enums DayOfWeek e Month](<#/doc/tutorials/date-time/dayofweek-month>)

➜

**Tutorial Atual**

Data

➜

**Próximo na Série**

[Data e Hora](<#/doc/tutorials/date-time/local-time>)

**Anterior na Série:** [Enums DayOfWeek e Month](<#/doc/tutorials/date-time/dayofweek-month>)

**Próximo na Série:** [Data e Hora](<#/doc/tutorials/date-time/local-time>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Data e Hora ](<#/doc/tutorials/date-time>) > Data