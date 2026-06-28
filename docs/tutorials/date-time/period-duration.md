[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Data e Hora ](<#/doc/tutorials/date-time>) > Period e Duration

**Anterior na Série**

[O Pacote Temporal](<#/doc/tutorials/date-time/temporal>)

➜

**Tutorial Atual**

Period e Duration

➜

**Próximo na Série**

[Clock](<#/doc/tutorials/date-time/clock>)

**Anterior na Série:** [O Pacote Temporal](<#/doc/tutorials/date-time/temporal>)

**Próximo na Série:** [Clock](<#/doc/tutorials/date-time/clock>)

# Period e Duration

Ao escrever código para especificar uma quantidade de tempo, use a classe ou método que melhor atenda às suas necessidades: a classe [`Duration`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Duration.html>), a classe [`Period`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Period.html>), ou o método [`ChronoUnit.between()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoUnit.html#between\(java.time.temporal.Temporal,java.time.temporal.Temporal\)>). Um [`Duration`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Duration.html>) mede uma quantidade de tempo usando valores baseados em tempo (segundos, nanossegundos). Um [`Period`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Period.html>) usa valores baseados em data (anos, meses, dias).

> Nota: Um [`Duration`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Duration.html>) de um dia tem exatamente 24 horas de duração. Um [`Period`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Period.html>) de um dia, quando adicionado a um [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>), pode variar de acordo com o fuso horário. Por exemplo, se ocorrer no primeiro ou último dia do horário de verão.

## Duration

Um [`Duration`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Duration.html>) é mais adequado em situações que medem tempo baseado em máquina, como código que usa um objeto [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>). Um objeto [`Duration`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Duration.html>) é medido em segundos ou nanossegundos e não usa construções baseadas em data como anos, meses e dias, embora a classe forneça métodos que convertem para dias, horas e minutos. Um [`Duration`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Duration.html>) pode ter um valor negativo, se for criado com um ponto final que ocorre antes do ponto inicial.

O código a seguir calcula, em nanossegundos, a duração entre dois instants:

```java
Instant t1 = Instant.now();
// ... do something
Instant t2 = Instant.now();
long ns = Duration.between(t1, t2).toNanos();
```

O código a seguir adiciona 10 segundos a um [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>):

```java
Instant start = Instant.now();
Duration gap = Duration.ofSeconds(10);
Instant later = start.plus(gap);
```

Um [`Duration`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Duration.html>) não está conectado à linha do tempo, no sentido de que não rastreia fusos horários ou horário de verão. Adicionar um [`Duration`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Duration.html>) equivalente a 1 dia a um [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>) resulta na adição de exatamente 24 horas, independentemente do horário de verão ou de outras diferenças de tempo que possam ocorrer.

## ChronoUnit

O enum [`ChronoUnit`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoUnit.html>), discutido no Pacote [`Temporal`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/Temporal.html>), define as unidades usadas para medir o tempo. O método [`ChronoUnit.between()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoUnit.html#between\(java.time.temporal.Temporal,java.time.temporal.Temporal\)>) é útil quando você deseja medir uma quantidade de tempo em uma única unidade de tempo, como dias ou segundos. O método [`between()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoUnit.html#between\(java.time.temporal.Temporal,java.time.temporal.Temporal\)>) funciona com todos os objetos baseados em temporal, mas retorna a quantidade em uma única unidade apenas. O código a seguir calcula a diferença, em milissegundos, entre dois time-stamps:

```java
Instant t1 = Instant.now();
// ... do something
Instant t2 = Instant.now();
long ms = ChronoUnit.MILLIS.between(t1, t2);
```

## Period

Para definir uma quantidade de tempo com valores baseados em data (anos, meses, dias), use a classe [`Period`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Period.html>). A classe [`Period`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Period.html>) fornece vários métodos get, como [`getMonths()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Period.html#getMonths\(\)>), [`getDays()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Period.html#getDays\(\)>) e [`getYears()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Period.html#getYears\(\)>), para que você possa extrair a quantidade de tempo do período.

O período total de tempo é representado pelas três unidades juntas: meses, dias e anos. Para apresentar a quantidade de tempo medida em uma única unidade de tempo, como dias, você pode usar o método [`ChronoUnit.between()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoUnit.html#between\(java.time.temporal.Temporal,java.time.temporal.Temporal\)>).

O código a seguir informa sua idade, assumindo que você nasceu em 1º de janeiro de 1960. A classe [`Period`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Period.html>) é usada para determinar o tempo em anos, meses e dias. O mesmo período, em dias totais, é determinado usando o método [`ChronoUnit.between()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoUnit.html#between\(java.time.temporal.Temporal,java.time.temporal.Temporal\)>) e é exibido entre parênteses:

```java
LocalDate birthday = LocalDate.of(1960, Month.JANUARY, 1);
LocalDate today = LocalDate.now();
Period p = Period.between(birthday, today);
long p2 = ChronoUnit.DAYS.between(birthday, today);
System.out.println("Você tem " + p.getYears() + " anos, " + p.getMonths() +
                   " meses, e " + p.getDays() +
                   " dias de idade (" + p2 + " dias no total).");
```

O código produz uma saída semelhante à seguinte:

```
Você tem 64 anos, 5 meses, e 23 dias de idade (23543 dias no total).
```

Para calcular quanto tempo falta para o seu próximo aniversário, você pode usar o código a seguir. A classe [`Period`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Period.html>) é usada para determinar o valor em meses e dias. O método [`ChronoUnit.between()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoUnit.html#between\(java.time.temporal.Temporal,java.time.temporal.Temporal\)>) retorna o valor em dias totais e é exibido entre parênteses.

```java
LocalDate birthday = LocalDate.of(1960, Month.JANUARY, 1);
LocalDate today = LocalDate.now();
LocalDate nextBDay = birthday.withYear(today.getYear());

// Se o aniversário já passou este ano, adicione 1 ao ano.
if (nextBDay.isBefore(today) || nextBDay.isEqual(today)) {
    nextBDay = nextBDay.plusYears(1);
}

Period p = Period.between(today, nextBDay);
long p2 = ChronoUnit.DAYS.between(today, nextBDay);
System.out.println("Faltam " + p.getMonths() + " meses, e " +
                   p.getDays() + " dias para o seu próximo aniversário. " +
                   "Total: " + p2 + " dias.");
```

O código produz uma saída semelhante à seguinte:

```
Faltam 7 meses, e 8 dias para o seu próximo aniversário. Total: 222 dias.
```

Esses cálculos não levam em conta as diferenças de fuso horário. Se você nasceu, por exemplo, na Austrália, mas atualmente vive em Bangalore, isso afeta ligeiramente o cálculo da sua idade exata. Nesta situação, use um [`Period`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Period.html>) em conjunto com a classe [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>). Ao adicionar um [`Period`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Period.html>) a um [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>), as diferenças de tempo são observadas.

### Neste tutorial

Duration ChronoUnit Period

Última atualização: 27 de janeiro de 2022

**Anterior na Série**

[O Pacote Temporal](<#/doc/tutorials/date-time/temporal>)

➜

**Tutorial Atual**

Period e Duration

➜

**Próximo na Série**

[Clock](<#/doc/tutorials/date-time/clock>)

**Anterior na Série:** [O Pacote Temporal](<#/doc/tutorials/date-time/temporal>)

**Próximo na Série:** [Clock](<#/doc/tutorials/date-time/clock>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Data e Hora ](<#/doc/tutorials/date-time>) > Period e Duration