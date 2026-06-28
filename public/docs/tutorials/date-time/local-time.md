# Data e Hora

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Date Time ](<#/doc/tutorials/date-time>) > Data e Hora

**Anterior na Série**

[Data](<#/doc/tutorials/date-time/date>)

➜

**Tutorial Atual**

Data e Hora

➜

**Próximo na Série**

[Fuso Horário e Offset](<#/doc/tutorials/date-time/zoneid-zone-offset>)

**Anterior na Série:** [Data](<#/doc/tutorials/date-time/date>)

**Próximo na Série:** [Fuso Horário e Offset](<#/doc/tutorials/date-time/zoneid-zone-offset>)

# Data e Hora

## A Classe LocalTime

A classe [`LocalTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalTime.html>) é semelhante às outras classes cujos nomes são prefixados com `Local`, mas lida apenas com o tempo. Esta classe é útil para representar a hora do dia baseada em humanos, como horários de filmes, ou os horários de abertura e fechamento da biblioteca local. Ela também pode ser usada para criar um relógio digital, como mostrado no exemplo a seguir:

A classe [`LocalTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalTime.html>) não armazena informações de fuso horário ou horário de verão.

## A Classe LocalDateTime

A classe que lida com data e hora, sem um fuso horário, é [`LocalDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDateTime.html>), uma das classes centrais da Date-Time API. Esta classe é usada para representar data (mês-dia-ano) juntamente com hora (hora-minuto-segundo-nanosegundo) e é, na verdade, uma combinação de [`LocalDate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html>) com [`LocalTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalTime.html>). Esta classe pode ser usada para representar um evento específico, como a primeira corrida das Finais da Louis Vuitton Cup na America's Cup Challenger Series, que começou às 13h10 de 17 de agosto de 2013. Observe que isso significa 13h10 no horário local. Para incluir um fuso horário, você deve usar um [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>) ou um [`OffsetDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/OffsetDateTime.html>), conforme discutido em [Classes de Fuso Horário e Offset](<#/doc/tutorials/date-time/zoneid-zone-offset>).

Além do método [`now()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDateTime.html#now\(\)>) que toda classe baseada em tempo fornece, a classe [`LocalDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDateTime.html>) possui vários métodos `of()` (ou métodos prefixados com `of`) que criam uma instância de [`LocalDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDateTime.html>). Existe um método `from()` que converte uma instância de outro formato temporal para uma instância de [`LocalDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDateTime.html>). Existem também métodos para adicionar ou subtrair horas, minutos, dias, semanas e meses. O exemplo a seguir mostra alguns desses métodos:

Este código produz uma saída que será semelhante à seguinte:

### Neste tutorial

A Classe LocalTime A Classe LocalDateTime

Última atualização: 27 de janeiro de 2022

**Anterior na Série**

[Data](<#/doc/tutorials/date-time/date>)

➜

**Tutorial Atual**

Data e Hora

➜

**Próximo na Série**

[Fuso Horário e Offset](<#/doc/tutorials/date-time/zoneid-zone-offset>)

**Anterior na Série:** [Data](<#/doc/tutorials/date-time/date>)

**Próximo na Série:** [Fuso Horário e Offset](<#/doc/tutorials/date-time/zoneid-zone-offset>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Date Time ](<#/doc/tutorials/date-time>) > Data e Hora