# Código Legado de Data e Hora

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Data e Hora ](<#/doc/tutorials/date-time>) > Código Legado de Data e Hora

**Anterior na Série**

[Conversão de Data Não-ISO](<#/doc/tutorials/date-time/non-iso-conversion>)

➜

**Tutorial Atual**

Código Legado de Data e Hora

➜

Este é o fim da série!

**Anterior na Série:** [Conversão de Data Não-ISO](<#/doc/tutorials/date-time/non-iso-conversion>)

# Código Legado de Data e Hora

Antes do lançamento do Java SE 8, o mecanismo de data e hora do Java era fornecido pelas classes [`java.util.Date`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Date.html>), [`java.util.Calendar`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Calendar.html>) e [`java.util.TimeZone`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TimeZone.html>), bem como suas subclasses, como [`java.util.GregorianCalendar`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/GregorianCalendar.html>). Essas classes apresentavam várias desvantagens, incluindo:

  * A classe [`Calendar`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Calendar.html>) não era type safe.
  * Como as classes eram mutáveis, elas não podiam ser usadas em aplicações multithreaded.
  * Bugs no código da aplicação eram comuns devido à numeração incomum dos meses e à falta de type safety.

## Interoperabilidade com Código Legado

Talvez você tenha código legado que usa as classes de data e hora [`java.util`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/package-summary.html>) e gostaria de aproveitar a funcionalidade de [`java.time`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/package-summary.html>) com o mínimo de alterações no seu código.

Adicionados ao lançamento do JDK 8 estão vários métodos que permitem a conversão entre objetos [`java.util`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/package-summary.html>) e [`java.time`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/package-summary.html>):

  * [`Calendar.toInstant()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Calendar.html#toInstant\(\)>) converte o objeto [`Calendar`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Calendar.html>) para um [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>).
  * [`GregorianCalendar.toZonedDateTime()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/GregorianCalendar.html#toZonedDateTime\(\)>) converte uma instância de [`GregorianCalendar`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/GregorianCalendar.html>) para um [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>).
  * [`GregorianCalendar.from(ZonedDateTime)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/GregorianCalendar.html#from\(java.time.ZonedDateTime\)>) cria um objeto [`GregorianCalendar`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/GregorianCalendar.html>) usando a localidade padrão a partir de uma instância de [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>).
  * [`Date.from(Instant)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Date.html#from\(java.time.Instant\)>) cria um objeto [`Date`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Date.html>) a partir de um [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>).
  * [`Date.toInstant()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Date.html#toInstant\(\)>) converte um objeto [`Date`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Date.html>) para um [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>).
  * [`TimeZone.toZoneId()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TimeZone.html#toZoneId\(\)>) converte um objeto [`TimeZone`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TimeZone.html>) para um [`ZoneId`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZoneId.html>).

O exemplo a seguir converte uma instância de [`Calendar`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Calendar.html>) para uma instância de [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>). Observe que um fuso horário deve ser fornecido para converter de um [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>) para um [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>):

O exemplo a seguir mostra a conversão entre um Date e um Instant:

O exemplo a seguir converte de um GregorianCalendar para um ZonedDateTime, e então de um ZonedDateTime para um GregorianCalendar. Outras classes baseadas em tempo são criadas usando a instância de ZonedDateTime:

## Mapeando a Funcionalidade Legada de Data e Hora para a API de Data e Hora

Como a implementação de data e hora do Java foi completamente redesenhada no lançamento do Java SE 8, você não pode simplesmente trocar um método por outro. Se você deseja usar a rica funcionalidade oferecida pelo pacote [`java.time`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/package-summary.html>), sua solução mais fácil é usar os métodos `toInstant()` ou `toZonedDateTime()` listados na seção anterior. No entanto, se você não quiser usar essa abordagem ou se ela não for suficiente para suas necessidades, então você deve reescrever seu código de data e hora.

A [tabela](<#/doc/tutorials/date-time/intro>) introduzida na página [Visão Geral](<#/doc/tutorials/date-time/intro>) é um bom lugar para começar a avaliar quais classes [`java.time`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/package-summary.html>) atendem às suas necessidades.

Não há uma correspondência de mapeamento um-para-um entre as duas APIs, mas a tabela a seguir oferece uma ideia geral de qual funcionalidade nas classes de data e hora de [`java.util`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/package-summary.html>) mapeia para as APIs de [`java.time`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/package-summary.html>).

### Correspondência entre Date legado e Instant

As classes [`Instant`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Instant.html>) e [`Date`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Date.html>) são semelhantes. Cada classe:

  * Representa um ponto instantâneo no tempo na linha do tempo (UTC)
  * Armazena um tempo independente de um fuso horário
  * É representada como epoch-seconds (desde 1970-01-01T00:00:00Z) mais nanossegundos

Os métodos [`Date.from(Instant)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Date.html#from\(java.time.Instant\)>) e [`Date.toInstant()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Date.html#toInstant\(\)>) permitem a conversão entre essas classes.

### Correspondência entre GregorianCalendar e ZonedDateTime

A classe [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>) é o substituto para [`GregorianCalendar`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/GregorianCalendar.html>). Ela fornece a seguinte funcionalidade semelhante. A representação de tempo humano é a seguinte:

  * [`LocalDate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html>): ano, mês, dia
  * [`LocalTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalTime.html>): horas, minutos, segundos, nanossegundos
  * [`ZoneId`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZoneId.html>): fuso horário
  * [`ZoneOffset`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZoneOffset.html>): deslocamento atual do GMT

Os métodos [`GregorianCalendar.from(ZonedDateTime)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/GregorianCalendar.html#from\(java.time.ZonedDateTime\)>) e [`GregorianCalendar.toZonedDateTime()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/GregorianCalendar.html#toZonedDateTime\(\)>) facilitam as conversões entre essas classes.

### Correspondência entre TimeZone legado e ZoneId ou ZoneOffset

A classe [`ZoneId`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZoneId.html>) especifica um identificador de fuso horário e tem acesso às regras usadas em cada fuso horário. A classe [`ZoneOffset`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZoneOffset.html>) especifica apenas um deslocamento de Greenwich/UTC. Para mais informações, consulte [Classes de Fuso Horário e Deslocamento](<#/doc/tutorials/date-time/zoneid-zone-offset>).

### Correspondência entre GregorianCalendar com a data definida para 1970-01-01 e LocalTime

O código que define a data para 1970-01-01 em uma instância de [`GregorianCalendar`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/GregorianCalendar.html>) para usar os componentes de tempo pode ser substituído por uma instância de [`LocalTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalTime.html>).

### Correspondência entre GregorianCalendar com o tempo definido para 00:00 e LocalDate

O código que define o tempo para 00:00 em uma instância de [`GregorianCalendar`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/GregorianCalendar.html>) para usar os componentes de data pode ser substituído por uma instância de [`LocalDate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDate.html>). (Essa abordagem com [`GregorianCalendar`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/GregorianCalendar.html>) era falha, pois a meia-noite não ocorre em alguns países uma vez por ano devido à transição para o horário de verão.)

## Formatação de Data e Hora

Embora o [`java.time.format.DateTimeFormatter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/format/DateTimeFormatter.html>) forneça um mecanismo poderoso para formatar valores de data e hora, você também pode usar as classes baseadas em tempo de [`java.time`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/package-summary.html>) diretamente com [`java.util.Formatter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Formatter.html>) e [`String.format()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#format\(java.lang.String,java.lang.Object...\)>), usando a mesma formatação baseada em padrões que você usa com as classes de data e hora de [`java.util`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/package-summary.html>).

### Neste tutorial

Interoperabilidade com Código Legado Mapeando a Funcionalidade Legada de Data e Hora para a API de Data e Hora Formatação de Data e Hora

Última atualização: 27 de janeiro de 2022

**Anterior na Série**

[Conversão de Data Não-ISO](<#/doc/tutorials/date-time/non-iso-conversion>)

➜

**Tutorial Atual**

Código Legado de Data e Hora

➜

Este é o fim da série!

**Anterior na Série:** [Conversão de Data Não-ISO](<#/doc/tutorials/date-time/non-iso-conversion>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Data e Hora ](<#/doc/tutorials/date-time>) > Código Legado de Data e Hora