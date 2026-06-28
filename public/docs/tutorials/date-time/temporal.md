# O Pacote Temporal

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Data e Hora ](<#/doc/tutorials/date-time>) > O Pacote Temporal

**Anterior na Série**

[Análise e Formatação](<#/doc/tutorials/date-time/parsing-formatting>)

➜

**Tutorial Atual**

O Pacote Temporal

➜

**Próximo na Série**

[Período e Duração](<#/doc/tutorials/date-time/period-duration>)

**Anterior na Série:** [Análise e Formatação](<#/doc/tutorials/date-time/parsing-formatting>)

**Próximo na Série:** [Período e Duração](<#/doc/tutorials/date-time/period-duration>)

# O Pacote Temporal

O pacote [`java.time.temporal`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/package-summary.html>) fornece uma coleção de interfaces, classes e enums que suportam código de data e hora e, em particular, cálculos de data e hora.

Essas interfaces são destinadas a serem usadas no nível mais baixo. O código de aplicação típico deve declarar variáveis e parâmetros em termos do tipo concreto, como [`LocalDate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html>) ou [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>), e não em termos da interface [`Temporal`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/Temporal.html>). Isso é exatamente o mesmo que declarar uma variável do tipo [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>), e não do tipo [`CharSequence`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/CharSequence.html>).

## Temporal e TemporalAccessor

A interface [`Temporal`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/Temporal.html>) fornece uma estrutura para acessar objetos baseados em tempo, e é implementada pelas classes baseadas em tempo, como [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>), [`LocalDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDateTime.html>), e [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>). Esta interface fornece métodos para adicionar ou subtrair unidades de tempo, tornando a aritmética baseada em tempo fácil e consistente entre as várias classes de data e hora. A interface [`TemporalAccessor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalAccessor.html>) fornece uma versão somente leitura da interface [`Temporal`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/Temporal.html>).

Ambos os objetos [`Temporal`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/Temporal.html>) e [`TemporalAccessor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalAccessor.html>) são definidos em termos de campos, conforme especificado na interface [`TemporalField`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalField.html>). O enum [`ChronoField`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoField.html>) é uma implementação concreta da interface [`TemporalField`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalField.html>) e fornece um rico conjunto de constantes definidas, como [`DAY_OF_WEEK`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoField.html#DAY_OF_WEEK>), [`MINUTE_OF_HOUR`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoField.html#MINUTE_OF_HOUR>), e [`MONTH_OF_YEAR`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoField.html#MONTH_OF_YEAR>).

As unidades para esses campos são especificadas pela interface [`TemporalUnit`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalUnit.html>). O enum [`ChronoUnit`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoUnit.html>) implementa a interface [`TemporalUnit`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalUnit.html>). O campo [`ChronoField.DAY_OF_WEEK`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoField.html#DAY_OF_WEEK>) é uma combinação de [`ChronoUnit.DAYS`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoUnit.html#DAYS>) e [`ChronoUnit.WEEKS`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoUnit.html#WEEKS>). Os enums [`ChronoField`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoField.html>) e [`ChronoUnit`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoUnit.html>) são discutidos nas seções seguintes.

Os métodos baseados em aritmética na interface [`Temporal`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/Temporal.html>) exigem parâmetros definidos em termos de valores [`TemporalAmount`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalAmount.html>). As classes [`Period`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Period.html>) e [`Duration`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Duration.html>) (discutidas em [Período e Duração](<#/doc/tutorials/date-time/period-duration>)) implementam a interface [`TemporalAmount`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalAmount.html>).

## ChronoField e IsoFields

O enum [`ChronoField`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoField.html>), que implementa a interface [`TemporalField`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalField.html>), fornece um rico conjunto de constantes para acessar valores de data e hora. Alguns exemplos são [`CLOCK_HOUR_OF_DAY`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoField.html#CLOCK_HOUR_OF_DAY>), [`NANO_OF_DAY`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoField.html#NANO_OF_DAY>), e [`DAY_OF_YEAR`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoField.html#DAY_OF_YEAR>). Este enum pode ser usado para expressar aspectos conceituais do tempo, como a terceira semana do ano, a 11ª hora do dia, ou a primeira segunda-feira do mês. Ao encontrar um `Temporal` de tipo desconhecido, você pode usar o método [`TemporalAccessor.isSupported(TemporalField)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalAccessor.html#isSupported\(java.time.temporal.TemporalField\)>) para determinar se o `Temporal` suporta um campo específico. A seguinte linha de código retorna false, indicando que [`LocalDate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html>) não suporta [`ChronoField.CLOCK_HOUR_OF_DAY`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoField.html#CLOCK_HOUR_OF_DAY>):

Campos adicionais, específicos do sistema de calendário ISO-8601, são definidos na classe [`IsoFields`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/IsoFields.html>). Os exemplos a seguir mostram como obter o valor de um campo usando tanto [`ChronoField`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoField.html>) quanto [`IsoFields`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/IsoFields.html>):

Duas outras classes definem campos adicionais que podem ser úteis, [`WeekFields`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/WeekFields.html>) e [`JulianFields`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/JulianFields.html>).

## ChronoUnit

O enum [`ChronoUnit`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoUnit.html>) implementa a interface [`TemporalUnit`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalUnit.html>), e fornece um conjunto de unidades padrão baseadas em data e hora, de milissegundos a milênios. Note que nem todos os objetos [`ChronoUnit`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoUnit.html>) são suportados por todas as classes. Por exemplo, a classe [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>) não suporta [`ChronoUnit.MONTHS`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoUnit.html#MONTHS>) ou [`ChronoUnit.YEARS`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoUnit.html#YEARS>). As classes na API de Data e Hora contêm o método `isSupported(TemporalUnit)` que pode ser usado para verificar se uma classe suporta uma unidade de tempo específica. A seguinte chamada para `isSupported()` retorna false, confirmando que a classe [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>) não suporta [`ChronoUnit.DAYS`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoUnit.html#DAYS>).

## Temporal Adjuster

A interface [`TemporalAdjuster`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalAdjuster.html>), no pacote [`java.time.temporal`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/package-summary.html>), fornece métodos que recebem um valor [`Temporal`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/Temporal.html>) e retornam um valor ajustado. Os adjusters podem ser usados com qualquer um dos tipos baseados em tempo.

Se um adjuster for usado com um [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>), então uma nova data é calculada que preserva os valores originais de hora e fuso horário.

### Adjusters Predefinidos

A classe [`TemporalAdjusters`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalAdjusters.html>) (observe o plural) fornece um conjunto de adjusters predefinidos para encontrar o primeiro ou último dia do mês, o primeiro ou último dia do ano, a última quarta-feira do mês, ou a primeira terça-feira após uma data específica, para citar alguns exemplos. Os adjusters predefinidos são definidos como métodos estáticos e são projetados para serem usados com a declaração de importação estática.

O exemplo a seguir usa vários métodos [`TemporalAdjusters`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalAdjusters.html>), em conjunto com o método `with` definido nas classes baseadas em tempo, para calcular novas datas com base na data original de 15 de outubro de 2000:

Isso produz a seguinte saída:

### Adjusters Personalizados

Você também pode criar seu próprio adjuster personalizado. Para fazer isso, você cria uma classe que implementa a interface [`TemporalAdjuster`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalAdjuster.html>) com um método [`adjustInto(Temporal)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalAdjuster.html#adjustInto\(java.time.temporal.Temporal\)>). O próximo exemplo é o adjuster personalizado `PaydayAdjuster`. Ele avalia a data passada e retorna o próximo dia de pagamento, assumindo que o dia de pagamento ocorre duas vezes por mês: no dia 15 e novamente no último dia do mês. Se a data calculada cair em um fim de semana, então a sexta-feira anterior é usada. O ano civil atual é assumido.

O adjuster é invocado da mesma maneira que um adjuster predefinido, usando o método `with()`. Consideremos o seguinte exemplo:

Em 2013, tanto 15 de junho quanto 30 de junho caem no fim de semana. Executar o exemplo anterior com as respectivas datas de 3 de junho e 18 de junho (em 2013), produz os seguintes resultados:

## Temporal Query

Um [`TemporalQuery`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalQuery.html>) pode ser usado para recuperar informações de um objeto baseado em tempo.

### Queries Predefinidas

A classe [`TemporalQueries`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalQueries.html>) (observe o plural) fornece várias queries predefinidas, incluindo métodos que são úteis quando a aplicação não consegue identificar o tipo de objeto baseado em tempo. Assim como os adjusters, as queries predefinidas são definidas como métodos estáticos e são projetadas para serem usadas com a declaração de importação estática.

A query de precisão, por exemplo, retorna a menor [`ChronoUnit`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/ChronoUnit.html>) que pode ser retornada por um objeto baseado em tempo específico. O exemplo a seguir usa a query de precisão em vários tipos de objetos baseados em tempo:

A saída se parece com o seguinte:

### Queries Personalizadas

Você também pode criar suas próprias queries personalizadas. Uma maneira de fazer isso é criar uma classe que implementa a interface [`TemporalQuery`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalQuery.html>) com o método [`queryFrom(TemporalAccessor)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalQuery.html#queryFrom\(java.time.temporal.TemporalAccessor\)>). Aqui está uma primeira query personalizada implementada na classe `FamilyVacations`, que implementa a interface [`TemporalQuery`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalQuery.html>). O método `queryFrom()` compara a data passada com as datas de férias agendadas e retorna `true` se ela cair dentro desses intervalos de datas.

Você pode usar este [`TemporalQuery`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalQuery.html>) com o seguinte padrão:

A segunda query personalizada é implementada na classe `FamilyBirthdays`. Esta classe fornece um método `isFamilyBirthday()` que compara a data passada com vários aniversários e retorna TRUE se houver uma correspondência.

A classe `FamilyBirthday` não implementa a interface [`TemporalQuery`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/TemporalQuery.html>) e pode ser usada como parte de uma expressão lambda. O código a seguir mostra como invocar ambas as queries personalizadas.

### Neste tutorial

Temporal e TemporalAccessor ChronoField e IsoFields ChronoUnit Temporal Adjusters Temporal Query

Última atualização: 27 de janeiro de 2022

**Anterior na Série**

[Análise e Formatação](<#/doc/tutorials/date-time/parsing-formatting>)

➜

**Tutorial Atual**

O Pacote Temporal

➜

**Próximo na Série**

[Período e Duração](<#/doc/tutorials/date-time/period-duration>)

**Anterior na Série:** [Análise e Formatação](<#/doc/tutorials/date-time/parsing-formatting>)

**Próximo na Série:** [Período e Duração](<#/doc/tutorials/date-time/period-duration>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Data e Hora ](<#/doc/tutorials/date-time>) > O Pacote Temporal