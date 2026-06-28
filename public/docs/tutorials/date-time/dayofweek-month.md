# Enums DayOfWeek e Month

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Date Time ](<#/doc/tutorials/date-time>) > Enums DayOfWeek e Month

**Anterior na Série**

[Calendário Padrão](<#/doc/tutorials/date-time/standard-calendar>)

➜

**Tutorial Atual**

Enums DayOfWeek e Month

➜

**Próximo na Série**

[Date](<#/doc/tutorials/date-time/date>)

**Anterior na Série:** [Calendário Padrão](<#/doc/tutorials/date-time/standard-calendar>)

**Próximo na Série:** [Date](<#/doc/tutorials/date-time/date>)

# Enums DayOfWeek e Month

A API Date-Time fornece enums para especificar os dias da semana e os meses do ano.

## DayOfWeek

O enum [`DayOfWeek`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/DayOfWeek.html>) consiste em sete constantes que descrevem os dias da semana: `MONDAY` a `SUNDAY`. Os valores inteiros das constantes [`DayOfWeek`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/DayOfWeek.html>) variam de 1 (Monday) a 7 (Sunday). Usar as constantes definidas (`DayOfWeek.FRIDAY`) torna seu código mais legível.

Este enum também fornece vários métodos, semelhantes aos métodos fornecidos pelas classes baseadas em tempo. Por exemplo, o código a seguir adiciona 3 dias a `Monday` e imprime o resultado. A saída é `THURSDAY`:

```java
DayOfWeek dow = DayOfWeek.MONDAY;
System.out.println(dow.plus(3));
```

Ao usar o método [`getDisplayName(TextStyle, Locale)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/DayOfWeek.html#getDisplayName\(java.time.format.TextStyle,java.util.Locale\)>), você pode recuperar uma string para identificar o dia da semana na localidade do usuário. O enum [`TextStyle`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/format/TextStyle.html>) permite especificar o tipo de string que você deseja exibir: `FULL`, `NARROW` (tipicamente uma única letra) ou `SHORT` (uma abreviação). As constantes `STANDALONE` [`TextStyle`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/format/TextStyle.html>) são usadas em algumas linguagens onde a saída é diferente quando usada como parte de uma data do que quando usada sozinha. O exemplo a seguir imprime as três formas primárias do [`TextStyle`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/format/TextStyle.html>) para `Monday`:

```java
Locale locale = Locale.getDefault();
System.out.println(DayOfWeek.MONDAY.getDisplayName(TextStyle.FULL, locale));
System.out.println(DayOfWeek.MONDAY.getDisplayName(TextStyle.NARROW, locale));
System.out.println(DayOfWeek.MONDAY.getDisplayName(TextStyle.SHORT, locale));
```

Este código tem a seguinte saída para a localidade `en`:

```
Monday
M
Mon
```

## Month

O enum [`Month`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Month.html>) inclui constantes para os doze meses, `JANUARY` a `DECEMBER`. Assim como o enum [`DayOfWeek`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/DayOfWeek.html>), o enum [`Month`](<javadoc:>) é fortemente tipado, e o valor inteiro de cada constante corresponde ao intervalo ISO de 1 (January) a 12 (December). Usar as constantes definidas (`Month.SEPTEMBER`) torna seu código mais legível.

O enum [`Month`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Month.html>) também inclui vários métodos. A linha de código a seguir usa o método [`maxLength()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Month.html#maxLength\(\)>) para imprimir o número máximo possível de dias no mês de February. A saída é "29":

```java
System.out.println(Month.FEBRUARY.maxLength());
```

O enum [`Month`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Month.html>) também implementa o método [`getDisplayName(TextStyle, Locale)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Month.html#getDisplayName\(java.time.format.TextStyle,java.util.Locale\)>) para recuperar uma string que identifica o mês na localidade do usuário usando o [`TextStyle`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/format/TextStyle.html>) especificado. Se um [`TextStyle`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/format/TextStyle.html>) específico não for definido, uma string representando o valor numérico da constante será retornada. O código a seguir imprime o mês de August usando os três estilos de texto primários:

```java
Locale locale = Locale.getDefault();
System.out.println(Month.AUGUST.getDisplayName(TextStyle.FULL, locale));
System.out.println(Month.AUGUST.getDisplayName(TextStyle.NARROW, locale));
System.out.println(Month.AUGUST.getDisplayName(TextStyle.SHORT, locale));
```

Este código tem a seguinte saída para a localidade `en`:

```
August
A
Aug
```

### Neste tutorial

DayOfWeek Month

Última atualização: 27 de janeiro de 2022

**Anterior na Série**

[Calendário Padrão](<#/doc/tutorials/date-time/standard-calendar>)

➜

**Tutorial Atual**

Enums DayOfWeek e Month

➜

**Próximo na Série**

[Date](<#/doc/tutorials/date-time/date>)

**Anterior na Série:** [Calendário Padrão](<#/doc/tutorials/date-time/standard-calendar>)

**Próximo na Série:** [Date](<#/doc/tutorials/date-time/date>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Date Time ](<#/doc/tutorials/date-time>) > Enums DayOfWeek e Month