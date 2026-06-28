# Instant

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Data e Hora ](<#/doc/tutorials/date-time>) > Instant

**Anterior na Série**

[Fuso Horário e Offset](<#/doc/tutorials/date-time/zoneid-zone-offset>)

➜

**Tutorial Atual**

Instant

➜

**Próximo na Série**

[Análise e Formatação](<#/doc/tutorials/date-time/parsing-formatting>)

**Anterior na Série:** [Fuso Horário e Offset](<#/doc/tutorials/date-time/zoneid-zone-offset>)

**Próximo na Série:** [Análise e Formatação](<#/doc/tutorials/date-time/parsing-formatting>)

# Instant

## A Classe Instant

Uma das classes centrais da API de Data e Hora é a classe [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>), que representa o início de um nanossegundo na linha do tempo. Esta classe é útil para gerar um carimbo de data/hora para representar o tempo da máquina.

Um valor retornado da classe [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>) conta o tempo a partir do primeiro segundo de 1º de janeiro de 1970 (1970-01-01T00:00:00Z), também chamado de [`EPOCH`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html#EPOCH>). Um instante que ocorre antes da epoch tem um valor negativo, e um instante que ocorre depois da epoch tem um valor positivo.

As outras constantes fornecidas pela classe Instant são [`MIN`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html#MIN>), representando o menor instante possível (passado distante), e [`MAX`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html#MAX>), representando o maior instante (futuro distante).

Invocar `toString()` em um [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>) produz uma saída como a seguinte:

```
2013-05-27T16:00:00Z
```

Este formato segue o padrão ISO-8601 para representar data e hora.

A classe [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>) fornece uma variedade de métodos para manipular um [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>). Existem os métodos [`plus()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html#plus\(java.time.temporal.TemporalAmount\)>) e [`minus()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html#minus\(java.time.temporal.TemporalAmount\)>) para adicionar ou subtrair tempo. O código a seguir adiciona 1 hora ao tempo atual:

```java
Instant now = Instant.now();
Instant then = now.plus(1, ChronoUnit.HOURS);
```

Existem métodos para comparar instantes, como [`isAfter()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html#isAfter\(java.time.Instant\)>) e [`isBefore()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html#isBefore\(java.time.Instant\)>). O método [`until()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html#until\(java.time.temporal.Temporal,java.time.temporal.TemporalUnit\)>) retorna quanto tempo existe entre dois objetos [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>). A linha de código a seguir informa quantos segundos se passaram desde o início da epoch Java.

```java
long secondsFromEpoch = Instant.now().getEpochSecond();
```

A classe [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>) não funciona com unidades de tempo humanas, como anos, meses ou dias. Se você deseja realizar cálculos nessas unidades, pode converter um [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>) para outra classe, como [`LocalDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDateTime.html>) ou [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>), associando o [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>) a um fuso horário. Você pode então acessar o valor nas unidades desejadas. O código a seguir converte um [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>) para um objeto [`LocalDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDateTime.html>) usando o método [`ofInstant()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDateTime.html#ofInstant\(java.time.Instant,java.time.ZoneId\)>) e o fuso horário padrão do sistema, e então imprime a data e hora em um formato mais legível:

```java
Instant instant = Instant.now();
LocalDateTime ldt = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
System.out.println(ldt);
```

A saída será semelhante à seguinte:

```
2013-05-27T16:00:00.000
```

Um objeto [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>) ou um objeto [`OffsetDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/OffsetDateTime.html>) pode ser convertido para um objeto [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>), pois cada um mapeia para um momento exato na linha do tempo. No entanto, o inverso não é verdadeiro. Para converter um objeto [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>) para um objeto [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>) ou um objeto [`OffsetDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/OffsetDateTime.html>), é necessário fornecer informações de fuso horário ou de offset de fuso horário.

### Neste tutorial

A Classe Instant

Última atualização: 27 de janeiro de 2022

**Anterior na Série**

[Fuso Horário e Offset](<#/doc/tutorials/date-time/zoneid-zone-offset>)

➜

**Tutorial Atual**

Instant

➜

**Próximo na Série**

[Análise e Formatação](<#/doc/tutorials/date-time/parsing-formatting>)

**Anterior na Série:** [Fuso Horário e Offset](<#/doc/tutorials/date-time/zoneid-zone-offset>)

**Próximo na Série:** [Análise e Formatação](<#/doc/tutorials/date-time/parsing-formatting>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Data e Hora ](<#/doc/tutorials/date-time>) > Instant