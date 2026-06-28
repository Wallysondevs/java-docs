[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Data e Hora ](<#/doc/tutorials/date-time>) > Calendário Padrão

**Anterior na Série**

[Visão Geral da API de Data e Hora](<#/doc/tutorials/date-time/intro>)

➜

**Tutorial Atual**

Calendário Padrão

➜

**Próximo na Série**

[Enums DayOfWeek e Month](<#/doc/tutorials/date-time/dayofweek-month>)

**Anterior na Série:** [Visão Geral da API de Data e Hora](<#/doc/tutorials/date-time/intro>)

**Próximo na Série:** [Enums DayOfWeek e Month](<#/doc/tutorials/date-time/dayofweek-month>)

# Calendário Padrão

## Calendário Padrão

Existem duas formas básicas de representar o tempo. Uma forma representa o tempo em termos humanos, referida como _tempo humano_ , como ano, mês, dia, hora, minuto e segundo. A outra forma, _tempo de máquina_ , mede o tempo continuamente ao longo de uma linha do tempo a partir de uma origem, chamada _epoch_ , com resolução de nanossegundos. O pacote Date-Time oferece uma rica variedade de classes para representar data e hora. Algumas classes na API Date-Time são destinadas a representar o tempo de máquina, e outras são mais adequadas para representar o tempo humano.

Primeiro, determine quais aspectos de data e hora você precisa e, em seguida, selecione a classe, ou classes, que atendem a essas necessidades. Ao escolher uma classe baseada em tempo (temporal), você primeiro decide se precisa representar tempo humano ou tempo de máquina. Em seguida, você identifica quais aspectos do tempo precisa representar. Você precisa de um fuso horário? Data e hora? Apenas data? Se você precisa de uma data, precisa de mês, dia e ano, ou um subconjunto?

> Terminologia: As classes na API Date-Time que capturam e trabalham com valores de data ou hora, como [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>), [`LocalDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDateTime.html>) e [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>), são referidas como classes (ou tipos) _baseadas em tempo (temporais)_ ao longo desta seção. Tipos de suporte, como a interface [`TemporalAdjuster`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalAdjuster.html>) ou o enum [`DayOfWeek`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/DayOfWeek.html>), não estão incluídos nesta definição.

Por exemplo, você pode usar um objeto [`LocalDate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html>) para representar uma data de nascimento, porque a maioria das pessoas celebra seu aniversário no mesmo dia, estejam elas em sua cidade natal ou do outro lado do mundo, na linha internacional de data. Se você estiver rastreando o tempo astrológico, então você pode querer usar um objeto `LocalDateTime` para representar a data e hora de nascimento, ou um [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>), que também inclui o fuso horário. Se você estiver criando um carimbo de data/hora (timestamp), então você provavelmente desejará usar um [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>), que permite comparar um ponto instantâneo na linha do tempo com outro.

A tabela a seguir resume as classes baseadas em tempo (temporais) no pacote [`java.time`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/package-summary.html>) que armazenam informações de data e/ou hora, ou que podem ser usadas para medir uma quantidade de tempo. Uma marca de seleção em uma coluna indica que a classe usa aquele tipo particular de dado e a coluna `toString()` Output mostra uma instância impressa usando o método `toString()`. A coluna Onde Discutido (Where Discussed) o direciona para a página relevante no tutorial.

Classe ou Enum | Conteúdo | Saída toString() | Onde Discutido
---|---|---|---
[`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>) | Segundos (1) | `2013-08-20T15:16:26.355Z` | [Instant Class](<#/doc/tutorials/date-time/instant>)
[`LocalDate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html>) | Ano, Mês, Dia | `2013-08-20` | [Date Classes](<#/doc/tutorials/date-time/date>)
[`LocalDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDateTime.html>) | Ano, Mês, Dia, Hora, Minutos, Segundos | `2013-08-20T08:16:26.937` | [Date and Time Classes](<#/doc/tutorials/date-time/local-time>)
[`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>) | Ano, Mês, Dia, Hora, Minutos, Segundos, Offset de Fuso Horário, ID de Fuso Horário | `2013-08-21T00:16:26.941+09:00[Asia/Tokyo]` | [Time Zone and Offset Classes](<#/doc/tutorials/date-time/zoneid-zone-offset>)
[`LocalTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalTime.html>) | Hora, Minutos, Segundos | `08:16:26.943` | [Date and Time Classes](<#/doc/tutorials/date-time/local-time>)
[`MonthDay`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/MonthDay.html>) | Mês, Dia | `--08-20` | [Date Classes](<#/doc/tutorials/date-time/date>)
[`Year`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Year.html>) | Ano | `2013` | [Date Classes](<#/doc/tutorials/date-time/date>)
[`YearMonth`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/YearMonth.html>) | Ano, Mês | `2013-08` | [Date Classes](<#/doc/tutorials/date-time/date>)
[`Month`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Month.html>) | Mês | `AUGUST` | [DayOfWeek and Month Enums](<#/doc/tutorials/date-time/dayofweek-month>)
[`OffsetDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/OffsetDateTime.html>) | Ano, Mês, Dia, Hora, Minutos, Segundos, Offset de Fuso Horário | `2013-08-20T08:16:26.954-07:00` | [Time Zone and Offset Classes](<#/doc/tutorials/date-time/zoneid-zone-offset>)
[`OffsetTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/OffsetTime.html>) | Hora, Minutos, Segundos, Offset de Fuso Horário | `08:16:26.957-07:00` | [Time Zone and Offset Classes](<#/doc/tutorials/date-time/zoneid-zone-offset>)
[`Duration`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Duration.html>) | Dia (2), Hora (2), Minutos (2), Segundos | `PT20H` (20 horas) | [Period and Duration](<#/doc/tutorials/date-time/period-duration>)
[`Period`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Period.html>) | Ano, Mês, Dia (3) | `P10D` (10 dias) | [Period and Duration](<#/doc/tutorials/date-time/period-duration>)

Notas:

(1): Segundos são capturados com precisão de nanossegundos.

(2): Esta classe não armazena esta informação, mas possui métodos para fornecer o tempo nessas unidades.

(3): Quando um Period é adicionado a um [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>), o horário de verão ou outras diferenças de horário local são observadas.

### Neste tutorial

Calendário Padrão

Última atualização: 27 de janeiro de 2022

**Anterior na Série**

[Visão Geral da API de Data e Hora](<#/doc/tutorials/date-time/intro>)

➜

**Tutorial Atual**

Calendário Padrão

➜

**Próximo na Série**

[Enums DayOfWeek e Month](<#/doc/tutorials/date-time/dayofweek-month>)

**Anterior na Série:** [Visão Geral da API de Data e Hora](<#/doc/tutorials/date-time/intro>)

**Próximo na Série:** [Enums DayOfWeek e Month](<#/doc/tutorials/date-time/dayofweek-month>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Data e Hora ](<#/doc/tutorials/date-time>) > Calendário Padrão