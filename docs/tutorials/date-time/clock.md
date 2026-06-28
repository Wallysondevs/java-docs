# Clock

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Data e Hora ](<#/doc/tutorials/date-time>) > Clock

**Anterior na Série**

[Period and Duration](<#/doc/tutorials/date-time/period-duration>)

➜

**Tutorial Atual**

Clock

➜

**Próximo na Série**

[Non-ISO Date Conversion](<#/doc/tutorials/date-time/non-iso-conversion>)

**Anterior na Série:** [Period and Duration](<#/doc/tutorials/date-time/period-duration>)

**Próximo na Série:** [Non-ISO Date Conversion](<#/doc/tutorials/date-time/non-iso-conversion>)

# Clock

A maioria dos objetos baseados em tempo fornece um método `now()` sem argumentos que retorna a data e hora atuais usando o relógio do sistema e o fuso horário padrão. Esses objetos baseados em tempo também fornecem um método `now(Clock)` com um argumento que permite passar um [`Clock`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Clock.html>) alternativo.

A data e hora atuais dependem do fuso horário e, para aplicações globalizadas, um [`Clock`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Clock.html>) é necessário para garantir que a data/hora seja criada com o fuso horário correto. Assim, embora o uso da classe [`Clock`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Clock.html>) seja opcional, este recurso permite testar seu código para outros fusos horários, ou usando um relógio fixo, onde o tempo não muda.

A classe [`Clock`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Clock.html>) é abstrata, então você não pode criar uma instância dela. Os seguintes métodos de fábrica podem ser úteis para testes.

  * [`Clock.offset(Clock, Duration)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Clock.html#offset\(java.time.Clock,java.time.Duration\)>) retorna um relógio que é deslocado pela [`Duration`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Duration.html>) especificada.
  * [`Clock.systemUTC()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Clock.html#systemUTC\(\)>) retorna um relógio representando o fuso horário de Greenwich/UTC.
  * [`Clock.fixed(Instant, ZoneId)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Clock.html#fixed\(java.time.Instant,java.time.ZoneId\)>) sempre retorna o mesmo Instant. Para este relógio, o tempo permanece parado.

### Neste tutorial

Clock

Última atualização: 27 de janeiro de 2022

**Anterior na Série**

[Period and Duration](<#/doc/tutorials/date-time/period-duration>)

➜

**Tutorial Atual**

Clock

➜

**Próximo na Série**

[Non-ISO Date Conversion](<#/doc/tutorials/date-time/non-iso-conversion>)

**Anterior na Série:** [Period and Duration](<#/doc/tutorials/date-time/period-duration>)

**Próximo na Série:** [Non-ISO Date Conversion](<#/doc/tutorials/date-time/non-iso-conversion>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Data e Hora ](<#/doc/tutorials/date-time>) > Clock