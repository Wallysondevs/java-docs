# The Date Time API

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > The Date Time API

# The Date Time API

Esta seção aborda a Date Time API adicionada no pacote `java.time` que fornece classes para suportar datas, horas, instantes e durações.

1.  [Visão Geral da Date Time API](<#/doc/tutorials/date-time/intro>)

    Uma visão geral da Date Time API e seus conceitos centrais.

2.  [Calendário Padrão](<#/doc/tutorials/date-time/standard-calendar>)

    Esta seção compara os conceitos de tempo humano e tempo de máquina e fornece uma tabela das principais classes baseadas em tempo no pacote java.time.

3.  [Enums DayOfWeek e Month](<#/doc/tutorials/date-time/dayofweek-month>)

    Os enums DayOfWeek e Month lidam com dias da semana e meses.

4.  [Data](<#/doc/tutorials/date-time/date>)

    As classes LocalDate, YearMonth, MonthDay e Year lidam apenas com datas, sem hora ou fusos horários.

5.  [Data e Hora](<#/doc/tutorials/date-time/local-time>)

    As classes LocalTime e LocalDateTime lidam com hora, e data e hora, respectivamente, mas sem fusos horários.

6.  [Fuso Horário e Offset](<#/doc/tutorials/date-time/zoneid-zone-offset>)

    As classes ZonedDateTime, OffsetDateTime e OffsetTime são classes baseadas em tempo que armazenam informações de fuso horário (ou offset de fuso horário). As classes ZoneId, ZoneRules e ZoneOffset são classes de suporte para estas classes.

7.  [Instant](<#/doc/tutorials/date-time/instant>)

    A classe Instant representa um momento instantâneo na linha do tempo.

8.  [Análise e Formatação](<#/doc/tutorials/date-time/parsing-formatting>)

    Como formatar e analisar valores de data e hora.

9.  [O Pacote Temporal](<#/doc/tutorials/date-time/temporal>)

    Usando ajustadores temporais para recuperar um valor de tempo ajustado e realizando uma consulta temporal.

10. [Period e Duration](<#/doc/tutorials/date-time/period-duration>)

    As classes Period e Duration, bem como o método ChronoUnit.between(), são usadas para calcular uma quantidade de tempo.

11. [Clock](<#/doc/tutorials/date-time/clock>)

    Uma breve visão geral da classe Clock. Você pode usar esta classe para fornecer um relógio alternativo ao relógio do sistema.

12. [Conversão de Data Não-ISO](<#/doc/tutorials/date-time/non-iso-conversion>)

    Como converter de uma data no sistema de calendário ISO para uma data em um sistema de calendário não-ISO, como um JapaneseDate ou um ThaiBuddhistDate.

13. [Código Legado de Data e Hora](<#/doc/tutorials/date-time/legacy-code>)

    Dicas sobre como converter código mais antigo de java.util.Date e java.util.Calendar para a Date-Time API.

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)