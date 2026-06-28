# Conversão de Data Não-ISO

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Data e Hora ](<#/doc/tutorials/date-time>) > Conversão de Data Não-ISO

**Anterior na Série**

[Clock](<#/doc/tutorials/date-time/clock>)

➜

**Tutorial Atual**

Conversão de Data Não-ISO

➜

**Próximo na Série**

[Legacy Date-Time Code](<#/doc/tutorials/date-time/legacy-code>)

**Anterior na Série:** [Clock](<#/doc/tutorials/date-time/clock>)

**Próximo na Série:** [Legacy Date-Time Code](<#/doc/tutorials/date-time/legacy-code>)

# Conversão de Data Não-ISO

Este tutorial não discute o pacote [`java.time.chrono`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/chrono/package-summary.html>) em detalhes. No entanto, pode ser útil saber que este pacote fornece várias cronologias predefinidas que não são baseadas em ISO, como Japonês, Hijrah, Minguo e Budista Tailandês. Você também pode usar este pacote para criar sua própria cronologia.

Esta seção mostra como converter entre uma data baseada em ISO e uma data em uma das outras cronologias predefinidas.

## Convertendo para uma Data Não-ISO

Você pode converter uma data baseada em ISO para uma data em outra cronologia usando o método de fábrica `from(TemporalAccessor)`, como [`JapaneseDate.from(TemporalAccessor)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/chrono/JapaneseDate.html>). Este método lança uma [`DateTimeException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/DateTimeException.html>) se não conseguir converter a data para uma instância válida. O código a seguir converte uma instância de [`LocalDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDateTime.html>) para várias datas de calendário não-ISO predefinidas:

O exemplo a seguir converte de um [`LocalDate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html>) para um [`ChronoLocalDate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/chrono/ChronoLocalDate.html>) para uma [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) e vice-versa. Este método `toString()` recebe uma instância de [`LocalDate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html>) e uma [`Chronology`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/chrono/Chronology.html>) e retorna a string convertida usando a [`Chronology`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/chrono/Chronology.html>) fornecida. O [`DateTimeFormatterBuilder`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/format/DateTimeFormatterBuilder.html>) é usado para construir uma string que pode ser usada para imprimir a data:

Quando o método é invocado com a seguinte data para as cronologias predefinidas:

A saída se parece com isto:

## Convertendo para uma Data Baseada em ISO

Você pode converter de uma data não-ISO para uma instância de [`LocalDate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html>) usando o método estático [`LocalDate.from()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html#from\(java.time.temporal.TemporalAccessor\)>), como mostrado no exemplo a seguir:

Outras classes baseadas em temporal também fornecem este método, que lança uma [`DateTimeException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/DateTimeException.html>) se a data não puder ser convertida.

O método `fromString()` a seguir, analisa uma [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) contendo uma data não-ISO e retorna uma instância de [`LocalDate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html>).

Quando o método é invocado com as seguintes strings:

As strings impressas devem todas ser convertidas de volta para 29 de outubro de 1996:

### Neste tutorial

Convertendo para uma Data Não-ISO Convertendo para uma Data Baseada em ISO

Última atualização: 27 de janeiro de 2022

**Anterior na Série**

[Clock](<#/doc/tutorials/date-time/clock>)

➜

**Tutorial Atual**

Conversão de Data Não-ISO

➜

**Próximo na Série**

[Legacy Date-Time Code](<#/doc/tutorials/date-time/legacy-code>)

**Anterior na Série:** [Clock](<#/doc/tutorials/date-time/clock>)

**Próximo na Série:** [Legacy Date-Time Code](<#/doc/tutorials/date-time/legacy-code>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Data e Hora ](<#/doc/tutorials/date-time>) > Conversão de Data Não-ISO