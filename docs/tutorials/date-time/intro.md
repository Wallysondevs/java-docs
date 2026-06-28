# Visão Geral da API Date Time

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Date Time ](<#/doc/tutorials/date-time>) > Visão Geral da API Date Time

**Tutorial Atual**

Visão Geral da API Date Time

➜

**Próximo na Série**

[Calendário Padrão](<#/doc/tutorials/date-time/standard-calendar>)

**Próximo na Série:** [Calendário Padrão](<#/doc/tutorials/date-time/standard-calendar>)

# Visão Geral da API Date Time

## Apresentando as APIs Date Time

O tempo parece ser um assunto simples; mesmo um relógio barato pode fornecer uma data e hora razoavelmente precisas. No entanto, com um exame mais atento, você percebe as complexidades sutis e muitos fatores que afetam sua compreensão do tempo. Por exemplo, o resultado de adicionar um mês a 31 de janeiro é diferente para um ano bissexto do que para outros anos. Fusos horários também adicionam complexidade. Por exemplo, um país pode entrar e sair do horário de verão com pouco aviso, ou mais de uma vez por ano, ou pode pular o horário de verão inteiramente em um determinado ano.

A API Date-Time usa o sistema de calendário definido em ISO-8601 como o calendário padrão. Este calendário é baseado no sistema de calendário Gregoriano e é usado globalmente como o padrão de fato para representar data e hora. As classes principais na API Date-Time têm nomes como [`LocalDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/LocalDateTime.html>), [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>) e [`OffsetDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/OffsetDateTime.html>). Todas elas usam o sistema de calendário ISO. Se você quiser usar um sistema de calendário alternativo, como Hijrah ou Thai Buddhist, o pacote [`java.time.chrono`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/chrono/package-summary.html>) permite que você use um dos sistemas de calendário predefinidos. Ou você pode criar o seu próprio.

A API Date-Time usa o [Unicode Common Locale Data Repository (CLDR)](<http://cldr.unicode.org/>). Este repositório suporta os idiomas do mundo e contém a maior coleção de dados de localidade disponível no mundo. As informações neste repositório foram localizadas para centenas de idiomas. A API Date-Time também usa o [Time-Zone Database (TZDB)](<http://www.iana.org/time-zones>). Este banco de dados fornece informações sobre cada mudança de fuso horário globalmente desde 1970, com histórico para fusos horários primários desde que o conceito foi introduzido.

## Princípios de Design da API Date Time

A API Date-Time foi desenvolvida usando vários princípios de design.

### Clara

Os métodos na API são bem definidos e seu comportamento é claro e esperado. Por exemplo, invocar um método Date-Time com um valor de parâmetro null tipicamente dispara uma [`NullPointerException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NullPointerException.html>).

### Fluida

A API Date-Time fornece uma interface fluida, tornando o código fácil de ler. Como a maioria dos métodos não permite parâmetros com valor null e não retorna um valor null, as chamadas de método podem ser encadeadas e o código resultante pode ser rapidamente compreendido. Por exemplo:

### Imutável

A maioria das classes na API Date-Time cria objetos que são imutáveis, o que significa que, após a criação do objeto, ele não pode ser modificado. Para alterar o valor de um objeto imutável, um novo objeto deve ser construído como uma cópia modificada do original. Isso também significa que a API Date-Time é, por definição, thread-safe. Isso afeta a API no sentido de que a maioria dos métodos usados para criar objetos de data ou hora são prefixados com `of`, `from` ou `with`, em vez de construtores, e não há métodos `set`. Por exemplo:

### Extensível

A API Date-Time é extensível sempre que possível. Por exemplo, você pode definir seus próprios ajustadores e consultas de tempo, ou construir seu próprio sistema de calendário.

## Os Pacotes Date Time

A API Date-Time consiste no pacote primário, `java.time`, e quatro subpacotes:

  * [`java.time`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/package-summary.html>) O núcleo da API para representar data e hora. Inclui classes para data, hora, data e hora combinadas, fusos horários, instantes, duração e relógios. Essas classes são baseadas no sistema de calendário definido em ISO-8601, e são imutáveis e thread-safe.
  * [`java.time.chrono`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/chrono/package-summary.html>) A API para representar sistemas de calendário diferentes do padrão ISO-8601. Você também pode definir seu próprio sistema de calendário. Este tutorial não cobre este pacote em detalhes.
  * [`java.time.format`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/format/package-summary.html>) Classes para formatar e analisar datas e horas.
  * [`java.time.temporal`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/temporal/package-summary.html>) API estendida, principalmente para desenvolvedores de frameworks e bibliotecas, permitindo interoperações entre as classes de data e hora, consulta e ajuste. Campos (`TemporalField` e `ChronoField`) e unidades (`TemporalUnit` e `ChronoUnit`) são definidos neste pacote.
  * [`java.time.zone`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/zone/package-summary.html>) Classes que suportam fusos horários, offsets de fusos horários e regras de fuso horário. Ao trabalhar com fusos horários, a maioria dos desenvolvedores precisará usar apenas [`ZonedDateTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZonedDateTime.html>), e [`ZoneId`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZoneId.html>) ou [`ZoneOffset`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/ZoneOffset.html>).

## Convenções de Nomenclatura de Métodos

A API Date-Time oferece um rico conjunto de métodos dentro de um rico conjunto de classes. Os nomes dos métodos são tornados consistentes entre as classes sempre que possível. Por exemplo, muitas das classes oferecem um método `now` que captura os valores de data ou hora do momento atual que são relevantes para aquela classe. Existem métodos `from` que permitem a conversão de uma classe para outra.

Há também padronização em relação aos prefixos dos nomes dos métodos. Como a maioria das classes na API Date-Time são imutáveis, a API não inclui métodos `set`. (Após sua criação, o valor de um objeto imutável não pode ser alterado. O equivalente imutável de um método `set` é `with`.) A tabela a seguir lista os prefixos comumente usados:

Prefixo | Tipo de Método | Uso
---|---|---
`of` | fábrica estática | Cria uma instância onde a fábrica está principalmente validando os parâmetros de entrada, não os convertendo.
`from` | fábrica estática | Converte os parâmetros de entrada para uma instância da classe alvo, o que pode envolver a perda de informações da entrada.
`parse` | fábrica estática | Analisa a string de entrada para produzir uma instância da classe alvo.
`format` | instância | Usa o formatador especificado para formatar os valores no objeto temporal para produzir uma string.
`get` | instância | Retorna uma parte do estado do objeto alvo.
`is` | instância | Consulta o estado do objeto alvo.
`with` | instância | Retorna uma cópia do objeto alvo com um elemento alterado; este é o equivalente imutável a um método `set` em um JavaBean.
`plus` | instância | Retorna uma cópia do objeto alvo com uma quantidade de tempo adicionada.
`minus` | instância | Retorna uma cópia do objeto alvo com uma quantidade de tempo subtraída.
`to` | instância | Converte este objeto para outro tipo.
`at` | instância | Combina este objeto com outro.

### Neste tutorial

Apresentando as APIs Date Time Princípios de Design da API Date Time Os Pacotes Date Time Convenções de Nomenclatura de Métodos

Última atualização: 27 de janeiro de 2022

**Tutorial Atual**

Visão Geral da API Date Time

➜

**Próximo na Série**

[Calendário Padrão](<#/doc/tutorials/date-time/standard-calendar>)

**Próximo na Série:** [Calendário Padrão](<#/doc/tutorials/date-time/standard-calendar>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Date Time ](<#/doc/tutorials/date-time>) > Visão Geral da API Date Time