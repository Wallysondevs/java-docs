# Visão Geral da Internacionalização

## 1 Visão Geral da Internacionalização

Internacionalização é o processo de projetar uma aplicação para que ela possa ser adaptada a várias linguagens e regiões sem alterações de engenharia. Às vezes, o termo internacionalização é abreviado como i18n, porque há 18 letras entre o primeiro "i" e o último "n".

Um programa internacionalizado possui as seguintes características:

  * Com a adição de dados de localização, o mesmo executável pode ser executado em todo o mundo.
  * Elementos textuais, como mensagens de status e rótulos de componentes GUI, não são codificados diretamente no programa. Em vez disso, são armazenados fora do código-fonte e recuperados dinamicamente.
  * O suporte a novas linguagens não requer recompilação.
  * Dados culturalmente dependentes, como datas e moedas, aparecem em formatos que estão em conformidade com a região e o idioma do usuário final.
  * Pode ser localizado rapidamente.

A internet exige software global - ou seja, software que pode ser desenvolvido independentemente dos países ou idiomas de seus usuários e, em seguida, localizado para múltiplos países ou regiões. A Plataforma Java fornece um rico conjunto de APIs para o desenvolvimento de aplicações globais. Essas APIs de internacionalização são baseadas no padrão Unicode e incluem a capacidade de adaptar texto, números, datas, moedas e objetos definidos pelo usuário às convenções de qualquer país.

Este guia resume as APIs e recursos de internacionalização da Plataforma Java, Standard Edition. Para exemplos de código e instruções passo a passo, consulte o [Internationalization Trail](<https://docs.oracle.com/javase/tutorial/i18n/index.html>) nos Tutoriais Java.

### Representação de Texto

A linguagem de programação Java é baseada no conjunto de caracteres Unicode, e várias bibliotecas implementam o padrão Unicode. Unicode é um padrão internacional de conjunto de caracteres que suporta todos os principais sistemas de escrita do mundo, bem como símbolos técnicos comuns. A especificação original do Unicode definia caracteres como entidades de 16 bits de largura fixa, mas o padrão Unicode foi alterado desde então para permitir caracteres cuja representação requer mais de 16 bits. O intervalo de pontos de código válidos agora é U+0000 a U+10FFFF. Uma codificação definida pelo padrão, UTF-16, permite representar todos os pontos de código Unicode usando uma ou duas unidades de 16 bits.

O tipo de dado primitivo char na linguagem de programação Java é um inteiro de 16 bits sem sinal que pode representar um ponto de código Unicode no intervalo U+0000 a U+FFFF, ou as unidades de código de UTF-16. Os vários tipos e classes na plataforma Java que representam sequências de caracteres - char[], implementações de java.lang.CharSequence (como a classe String), e implementações de java.text.CharacterIterator - são sequências UTF-16. A maioria do código-fonte Java é escrita em ASCII, uma codificação de caracteres de 7 bits, ou ISO-8859-1, uma codificação de caracteres de 8 bits, mas é traduzida para UTF-16 antes do processamento.

A classe [Character](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Character.html>) é um wrapper de objeto para o tipo primitivo char. A classe Character também contém métodos estáticos como isLowerCase() e isDigit() para determinar as propriedades de um caractere. Esses métodos possuem sobrecargas que aceitam um char (o que permite a representação de pontos de código Unicode no intervalo U+0000 a U+FFFF) ou um int (o que permite a representação de todos os pontos de código Unicode).

### Identificação e Localização de Locale

Um objeto Locale é um identificador para uma combinação particular de idioma e região. Localização é o processo de adaptar software para uma região ou idioma específico, adicionando componentes específicos do locale e traduzindo texto.

#### Locales

Na plataforma Java, um locale é simplesmente um identificador para uma combinação particular de idioma e região. Não é uma coleção de atributos específicos do locale. Em vez disso, cada classe sensível ao locale mantém suas próprias informações específicas do locale. Com este design, não há diferença em como os objetos de usuário e sistema mantêm seus recursos específicos do locale. Ambos usam o mecanismo de localização padrão.

Programas Java não recebem um único locale global. Todas as operações sensíveis ao locale podem receber explicitamente um locale como argumento. Isso simplifica muito os programas multilíngues. Embora um locale global não seja imposto, um locale padrão está disponível para programas que não desejam gerenciar locales explicitamente. Um locale padrão também possibilita afetar o comportamento de toda a apresentação com uma única escolha.

Locales Java atuam como solicitações de determinado comportamento de outro objeto. Por exemplo, um locale francês canadense passado para um objeto Calendar pede que o Calendar se comporte corretamente para os costumes de Quebec. Cabe ao objeto que aceita o locale fazer a coisa certa. Se o objeto não foi localizado para um locale específico, ele tentará encontrar uma correspondência "próxima" com um locale para o qual foi localizado. Assim, se um objeto Calendar não foi localizado para o Canadá francês, mas foi localizado para a língua francesa em geral, ele usaria a localização francesa.

##### Classe Locale

Um objeto [Locale](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Locale.html>) representa uma região geográfica, política ou cultural específica. Uma operação que requer um locale para realizar sua tarefa é chamada de sensível ao locale e usa o objeto `Locale` para adaptar informações para o usuário. Por exemplo, exibir um número é uma operação sensível ao locale - o número deve ser formatado de acordo com os costumes e convenções do país, região ou cultura nativa do usuário.

##### Locales Suportados

Na plataforma Java, não precisa haver um único conjunto de locales suportados, já que cada classe mantém suas próprias localizações. No entanto, existe um conjunto consistente de localizações suportadas pelas classes da Plataforma Java. Outras implementações da Plataforma Java podem suportar diferentes locales. Os locales suportados pelo JDK são resumidos por versão. Consulte [JDK 25 Supported Locales](<https://www.oracle.com/java/technologies/javase/jdk25-suported-locales.html>) para saber o que é suportado.

#### Recursos Localizados

Todas as classes sensíveis ao locale devem ser capazes de acessar recursos personalizados para os locales que suportam. Para auxiliar no processo de localização, é útil ter esses recursos agrupados por locale e separados das partes neutras ao locale do programa.

##### Classe ResourceBundle

A classe [ResourceBundle](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/ResourceBundle.html>) é uma classe base abstrata que representa contêineres de recursos. Os programadores criam subclasses de ResourceBundle que contêm recursos para um locale específico. Novos recursos podem ser adicionados a uma instância de ResourceBundle, ou novas instâncias de ResourceBundle podem ser adicionadas a um sistema sem afetar o código que as utiliza. Empacotar recursos como classes permite que os desenvolvedores aproveitem o mecanismo de carregamento de classes do Java para encontrar recursos.

Os bundles de recursos contêm objetos específicos do locale. Quando um programa precisa de um recurso específico do locale, como um objeto String, o programa pode carregá-lo do bundle de recursos apropriado para o locale do usuário atual. Dessa forma, o programador pode escrever código que é amplamente independente do locale do usuário, isolando a maioria, se não todas, as informações específicas do locale em bundles de recursos.

Isso permite que programadores Java escrevam código que pode

  * ser facilmente localizado, ou traduzido, para diferentes idiomas
  * lidar com múltiplos locales de uma vez
  * ser facilmente modificado posteriormente para suportar ainda mais locales

###### Classe ResourceBundle.Control

[ResourceBundle.Control](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/ResourceBundle.Control.html>) é uma classe aninhada de ResourceBundle. Ela define métodos a serem chamados pelos métodos de fábrica [ ResourceBundle.getBundle](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/ResourceBundle.html#getBundle\(java.lang.String,java.util.Locale,java.util.ResourceBundle.Control\)>) para que o comportamento de carregamento do bundle de recursos possa ser alterado. Por exemplo, formatos de bundle de recursos específicos da aplicação, como XML, poderiam ser suportados sobrescrevendo os métodos.

ResourceBundle.Control não é suportado em módulos nomeados. Espera-se que o código existente usando `Control` funcione, mas para código novo em um módulo nomeado, implemente `basenameProvider` e carregue o bundle de recursos a partir daí. Consulte [Resource Bundles and Named Modules](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/ResourceBundle.html#resource-bundle-modules>).

##### Classe ListResourceBundle

[ListResourceBundle](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/ListResourceBundle.html>) é uma subclasse abstrata de ResourceBundle que gerencia recursos para um locale em uma lista conveniente e fácil de usar.

##### Classe PropertyResourceBundle

[PropertyResourceBundle](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/PropertyResourceBundle.html>) é uma subclasse concreta de ResourceBundle que gerencia recursos para um locale usando um conjunto de strings estáticas de um arquivo de propriedades.

#### Dados de Locale CLDR Habilitados por Padrão

Os dados de locale baseados em XML do Unicode Common Locale Data Repository (CLDR), adicionados pela primeira vez no JDK 8, são os dados de locale padrão desde o JDK 9.

Existem três fontes distintas para dados de locale, identificadas pelas seguintes palavras-chave:

  * `CLDR` representa os dados de locale fornecidos pelo projeto Unicode [CLDR](<http://cldr.unicode.org/index>).
  * `HOST` representa a personalização do usuário atual das configurações do sistema operacional subjacente. Funciona apenas com o locale padrão do usuário, e as configurações personalizáveis podem variar dependendo do sistema operacional. No entanto, principalmente formatos de data, hora, número e moeda são suportados.
  * `SPI` representa os serviços sensíveis ao locale implementados pelos provedores de Service Provider Interface (SPI) instalados.

Para selecionar uma fonte de dados de locale, use a propriedade de sistema `java.locale.providers`, listando as fontes de dados na ordem preferencial. Se um provedor não puder oferecer os dados de locale solicitados, a busca prossegue para o próximo provedor na ordem. Por exemplo:
```
    java.locale.providers=HOST,SPI,CLDR
```

Se você não definir esta propriedade, o comportamento padrão é equivalente à seguinte configuração:
```
    java.locale.providers=CLDR
```

Consulte [JEP 252: Use CLDR Locale Data by Default](<https://openjdk.org/jeps/252>) para mais detalhes.

Para locales suportados, consulte [JDK 25 Supported Locales](<https://www.oracle.com/java/technologies/javase/jdk25-suported-locales.html>). Consulte [`java.util.api.LocaleServiceProvider`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/spi/LocaleServiceProvider.html>) para a API relacionada.

### Manipulação de Data e Hora

O pacote Date-Time, [java.time](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/package-summary.html>), fornece um modelo abrangente para data e hora. Embora java.time seja baseado no sistema de calendário da International Organization for Standardization (ISO), calendários globais comumente usados também são suportados.

Consulte a lição [The Date-Time Packages](<https://docs.oracle.com/javase/tutorial/datetime/overview/packages.html>) nos Tutoriais Java (Java SE 8 e anteriores).

### Processamento de Texto

O processamento de texto envolve a formatação de informações sensíveis ao locale, como moedas, datas, horas e mensagens de texto. Também inclui a manipulação de texto de maneira sensível ao locale, o que significa que as operações de string, como pesquisa e classificação, são realizadas corretamente, independentemente do locale.

#### Formatação

É na formatação de dados para saída que muitas convenções culturais são aplicadas. Números, datas, horas e mensagens podem exigir formatação antes de serem exibidos. A plataforma Java fornece um conjunto de classes de formatação flexíveis que podem lidar tanto com os formatos de locale padrão quanto com formatos personalizados definidos pelo programador. Essas classes de formatação também são capazes de analisar strings formatadas de volta em seus objetos constituintes.

##### Classe Format

A classe [Format](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/Format.html>) é uma classe base abstrata para formatar informações sensíveis ao locale, como datas, horas, mensagens e números. Três subclasses principais são fornecidas: `DateFormat`, `NumberFormat` e `MessageFormat`. Essas três também fornecem suas próprias subclasses.

##### Classe DateFormat

Datas e horas são armazenadas internamente de forma independente do locale, mas devem ser formatadas para que possam ser exibidas de maneira sensível ao locale. Por exemplo, a mesma data pode ser formatada da seguinte forma:

  * November 3, 1997 (Inglês)
  * 3 novembre 1997 (Francês)

A classe [DateFormat](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/DateFormat.html>) é uma classe base abstrata para formatar e analisar valores de data e hora de maneira independente do locale. Ela possui vários métodos de fábrica estáticos para obter formatos de hora padrão para um determinado locale.

O objeto DateFormat usa objetos Calendar e TimeZone para interpretar valores de tempo. Por padrão, um objeto DateFormat para um determinado locale usará o objeto Calendar apropriado para esse locale e o objeto TimeZone padrão do sistema. O programador pode substituir essas escolhas, se desejar.

##### Classe SimpleDateFormat

A classe [SimpleDateFormat](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/SimpleDateFormat.html>) é uma classe concreta para formatar e analisar datas e horas de maneira sensível ao locale. Ela permite formatação (milissegundos para texto), análise (texto para milissegundos) e normalização.

##### Classe DateFormatSymbols

A classe [DateFormatSymbols](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/DateFormatSymbols.html>) é usada para encapsular dados de formatação de data e hora localizáveis, como os nomes dos meses, os nomes dos dias da semana, a hora do dia e os dados de fuso horário. As classes DateFormat e SimpleDateFormat usam a classe DateFormatSymbols para encapsular essas informações.

Normalmente, os programadores não usarão o DateFormatSymbols diretamente. Em vez disso, eles implementarão a formatação com os métodos de fábrica da classe DateFormat.

##### Classe NumberFormat

A classe [NumberFormat](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/NumberFormat.html>) é uma classe base abstrata para formatar e analisar dados numéricos. Ela contém vários métodos de fábrica estáticos para obter diferentes tipos de formatos de número específicos do locale.

A classe NumberFormat ajuda os programadores a formatar e analisar números para qualquer locale. O código que usa esta classe pode ser completamente independente das convenções de locale para pontos decimais, separadores de milhares, os dígitos decimais específicos usados, ou se o formato do número é sequer decimal. A aplicação também pode exibir um número como um número decimal normal, moeda ou porcentagem:

  * 1,234.5 (número decimal no formato dos EUA)
  * $1,234.50 (moeda dos EUA no formato dos EUA)
  * 1.234,50 € (moeda europeia no formato alemão)
  * 123.450% (porcentagem no formato alemão)

##### Classe DecimalFormat

Números são armazenados internamente de forma independente do locale, mas devem ser formatados para que possam ser exibidos de maneira sensível ao locale. Por exemplo, ao usar "#,###.00" como padrão, o mesmo número pode ser formatado da seguinte forma:

  * 1.234,56 (Alemão)
  * 1,234.56 (Inglês)

A classe [DecimalFormat](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/DecimalFormat.html>), que é uma subclasse concreta da classe NumberFormat, pode formatar números decimais. Os programadores geralmente não instanciarão esta classe diretamente, mas usarão os métodos de fábrica fornecidos.

A classe DecimalFormat tem a capacidade de receber uma string de padrão para especificar como um número deve ser formatado. O padrão especifica atributos como a precisão do número, se zeros à esquerda devem ser impressos e quais símbolos de moeda são usados. A string de padrão pode ser alterada se um programa precisar criar um formato personalizado.

##### Classe DecimalFormatSymbols

A classe [DecimalFormatSymbols](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/DecimalFormatSymbols.html>) representa o conjunto de símbolos (como o separador decimal, o separador de agrupamento e assim por diante) necessários pelo DecimalFormat para formatar números. DecimalFormat cria para si uma instância de DecimalFormatSymbols a partir de seus dados de locale. Um programador que precise alterar qualquer um desses símbolos pode obter o objeto DecimalFormatSymbols do objeto DecimalFormat e então modificá-lo.

##### Classe ChoiceFormat

A classe [ChoiceFormat](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/ChoiceFormat.html>) é uma subclasse concreta da classe NumberFormat. A classe ChoiceFormat permite ao programador anexar um formato a um intervalo de números. É geralmente usada em um objeto MessageFormat para lidar com plurais.

##### Classe MessageFormat

Programas frequentemente precisam construir mensagens a partir de sequências de strings, números e outros dados. Por exemplo, o texto de uma mensagem exibindo o número de arquivos em uma unidade de disco irá variar:

  * O disco C contém 100 arquivos.
  * O disco D contém 1 arquivo.
  * O disco F contém 0 arquivos.

Se uma mensagem construída a partir de sequências de strings e números for codificada diretamente, ela não poderá ser traduzida para outros idiomas. Por exemplo, observe as diferentes posições dos parâmetros "3" e "G" nas seguintes traduções:

  * The disk G contains 3 files. (Inglês)
  * Il y a 3 fichiers sur le disque G. (Francês)

A classe [MessageFormat](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/MessageFormat.html>) fornece um meio para produzir mensagens concatenadas de forma neutra em relação ao idioma. O objeto MessageFormat recebe um conjunto de objetos, os formata e, em seguida, insere as strings formatadas no padrão nos locais apropriados.

##### Classe ParsePosition

A classe [ParsePosition](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/ParsePosition.html>) é usada pela classe Format e suas subclasses para acompanhar a posição atual durante a análise. O método parseObject() na classe Format requer um objeto ParsePosition como argumento.

##### Classe FieldPosition

A classe [FieldPosition](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/FieldPosition.html>) é usada pela classe Format e suas subclasses para identificar campos na saída formatada. Uma versão do método format() na classe Format requer um objeto FieldPosition como argumento.

#### Operações de String Sensíveis ao Locale

Programas frequentemente precisam manipular strings. Operações comuns em strings incluem pesquisa e classificação. Algumas tarefas, como intercalar strings ou encontrar várias fronteiras em texto, são surpreendentemente difíceis de acertar e são ainda mais difíceis quando múltiplos idiomas devem ser considerados. A Plataforma Java fornece classes para lidar com muitas dessas manipulações comuns de string de maneira sensível ao locale.

##### Classe Collator

A classe [Collator](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/Collator.html>) realiza comparação de strings sensível ao locale. Os programadores usam esta classe para construir rotinas de pesquisa e classificação alfabética para texto em linguagem natural. Collator é uma classe base abstrata. Suas subclasses implementam estratégias de intercalação específicas. Uma subclasse, RuleBasedCollator, é aplicável a um amplo conjunto de idiomas. Outras subclasses podem ser criadas para lidar com necessidades mais especializadas.

##### Classe RuleBasedCollator

A classe [RuleBasedCollator](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/RuleBasedCollator.html>), que é uma subclasse concreta da classe Collator, fornece um collator de tabela simples e orientado a dados. Usando RuleBasedCollator, um programador pode criar um collator baseado em tabela personalizado. Por exemplo, um programador pode construir um collator que ignorará (ou notará) letras maiúsculas, acentos e caracteres combinadores Unicode.

##### Classe CollationElementIterator

A classe [CollationElementIterator](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/CollationElementIterator.html>) é usada como um iterador para percorrer cada caractere de uma string internacional. Os programadores usam o iterador para retornar a prioridade de ordenação do caractere posicionado. A prioridade de ordenação de um caractere, ou chave, define como um caractere é intercalado no objeto Collator fornecido. A classe CollationElementIterator é usada pelo método compare() da classe `RuleBasedCollator`.

##### Classe CollationKey

Um objeto [CollationKey](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/CollationKey.html>) representa uma string sob as regras de um objeto Collator específico. Comparar dois objetos CollationKey retorna a ordem relativa das strings que eles representam. Usar objetos CollationKey para comparar strings é geralmente mais rápido do que usar o método Collator.compare(). Assim, quando as strings devem ser comparadas várias vezes, por exemplo, ao classificar uma lista de strings, é mais eficiente usar objetos CollationKey.

##### Classe BreakIterator

A classe [BreakIterator](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/BreakIterator.html>) implementa indiretamente métodos para encontrar a posição dos seguintes tipos de limites em uma string de texto:

  * quebra de linha potencial
  * frase
  * palavra
  * caractere

As convenções sobre onde quebrar linhas, frases, palavras e caracteres variam de um idioma para outro. Como a classe BreakIterator é sensível ao locale, ela pode ser usada por programas que realizam operações de texto. Por exemplo, considere um programa de processamento de texto que pode destacar um caractere, cortar uma palavra, mover o cursor para a próxima frase ou quebrar palavras no final de uma linha. Este programa de processamento de texto usaria iteradores de quebra para determinar os limites lógicos no texto, permitindo-lhe realizar operações de texto de maneira sensível ao locale.

##### Classe StringCharacterIterator

A classe [StringCharacterIterator](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/StringCharacterIterator.html>) fornece a capacidade de iterar sobre uma string de caracteres Unicode de maneira bidirecional. Esta classe usa um cursor para se mover dentro de um intervalo de texto e pode retornar caracteres individuais ou seus valores de índice. A classe StringCharacterIterator implementa a funcionalidade de iterador de caracteres da interface CharacterIterator.

##### Interface CharacterIterator

A interface [CharacterIterator](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/CharacterIterator.html>) define um protocolo para iteração bidirecional sobre caracteres Unicode. As classes devem implementar esta interface se desejarem se mover dentro de um intervalo de texto e retornar caracteres Unicode individuais ou seus valores de índice. CharacterIterator é útil para pesquisa ao realizar buscas de caracteres.

##### Classe Normalizer

A classe [Normalizer](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/Normalizer.html>) fornece métodos para transformar texto Unicode em uma forma composta ou decomposta equivalente. A classe suporta as Formas de Normalização Unicode definidas pelo padrão Unicode.

### SPIs de Serviços Sensíveis ao Locale

Serviços sensíveis ao locale fornecidos por classes nos pacotes java.text e java.util podem ser estendidos implementando SPIs de serviços sensíveis ao locale para locales que o runtime Java ainda não suporta.

O mecanismo de extensão não é suportado e as implementações SPI para funções de internacionalização nos pacotes java.text.spi, java.util.spi e java.awt.im.spi serão carregadas do classpath da aplicação.

Além de símbolos ou nomes localizados para as classes [Currency](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Currency.html>), [Locale](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Locale.html>) e [TimeZone](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/TimeZone.html>) no pacote java.util, implementações das seguintes classes no pacote java.text podem ser conectadas com os SPIs.

  * [BreakIterator](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/BreakIterator.html>)
  * [Collator](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/Collator.html>)
  * [DateFormat](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/DateFormat.html>)
  * [DateFormatSymbols](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/DateFormatSymbols.html>)
  * [DecimalFormatSymbols](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/DecimalFormatSymbols.html>)
  * [NumberFormat](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/text/NumberFormat.html>)

### Conversão de Codificação de Caracteres

A plataforma Java usa Unicode como sua codificação de caracteres nativa; no entanto, muitos programas Java ainda precisam lidar com dados de texto em outras codificações. Java, portanto, fornece um conjunto de classes que convertem muitas codificações de caracteres padrão de e para Unicode. Programas Java que precisam lidar com dados de texto não-Unicode convertem esses dados para Unicode, processam os dados como Unicode e, em seguida, convertem o resultado de volta para a codificação de caracteres externa. As classes [InputStreamReader](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/io/InputStreamReader.html>) e [OutputStreamWriter](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/io/OutputStreamWriter.html>) fornecem métodos que podem converter entre outras codificações de caracteres e Unicode.

#### Codificações Suportadas

As classes InputStreamReader, OutputStreamWriter e String podem converter entre Unicode e o conjunto de codificações de caracteres listadas em [Supported Encodings](<#/doc/guides/intl/supported-encodings>).

#### I/O de Stream

A Plataforma Java fornece recursos no pacote java.io para melhorar o tratamento de dados de caracteres: as classes Reader e Writer, e um aprimoramento para a classe PrintStream.

#### Classes Reader e Writer

As hierarquias de classes [Reader](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/io/Reader.html>) e [Writer](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/io/Writer.html>) fornecem a capacidade de realizar operações de I/O em streams de caracteres. Essas hierarquias são paralelas às hierarquias de classes InputStream e OutputStream, mas operam em streams de caracteres em vez de streams de bytes. Streams de caracteres facilitam a escrita de programas que não dependem de uma codificação de caracteres específica e, portanto, são mais fáceis de internacionalizar. As classes Reader e Writer também têm a capacidade de converter entre Unicode e outras codificações de caracteres.

#### Classe PrintStream

A classe [PrintStream](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/io/PrintStream.html>) produz saída usando a codificação de caracteres padrão do sistema e o terminador de linha. Essa alteração permite que métodos como System.out.println() ajam de forma mais razoável com dados não-ASCII.

#### Pacote Charset

O pacote [java.nio.charset](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/nio/charset/package-summary.html>) fornece as bases para a conversão de codificação de caracteres. As aplicações podem usar suas classes para ajustar o comportamento dos conversores de caracteres embutidos. Os desenvolvedores também podem criar conversores personalizados para codificações de caracteres que não são suportadas pelos conversores de caracteres embutidos, usando o pacote java.nio.charset.spi.

### Métodos de Entrada

Métodos de entrada são componentes de software que permitem ao usuário inserir texto de maneiras diferentes da simples digitação em um teclado. Eles são comumente usados para inserir japonês, chinês ou coreano - idiomas que usam milhares de caracteres diferentes - em teclados com muito menos teclas. No entanto, a plataforma Java também suporta métodos de entrada para outros idiomas e o uso de mecanismos de entrada totalmente diferentes, como reconhecimento de escrita manual ou de fala.

A plataforma Java permite o uso de métodos de entrada nativos fornecidos pelo sistema operacional host, como Windows ou Linux, bem como a implementação e o uso de métodos de entrada escritos na linguagem de programação Java.

O termo "métodos de entrada" não se refere aos métodos de classe da linguagem de programação Java.

#### Suporte a Métodos de Entrada em Swing

Os componentes de texto Swing fornecem uma interface de usuário integrada para entrada de texto usando métodos de entrada. Dependendo do locale, um de dois estilos de entrada é usado. Com a entrada no local (inline), o estilo usado para a maioria dos locales, os métodos de entrada inserem o texto diretamente no componente de texto enquanto o texto está sendo composto. Com a entrada abaixo do local, o estilo usado para locales chineses, uma janela de composição separada é usada, que é posicionada automaticamente para ficar próxima ao ponto onde o texto será inserido após ser confirmado.

Uma aplicação que usa componentes de texto Swing não precisa coordenar a interação entre os componentes de texto e os métodos de entrada. No entanto, ela deve chamar [InputContext.endComposition](<https://docs.oracle.com/en/java/javase/25/docs/api/java.desktop/java/awt/im/InputContext.html#endComposition\(\)>) quando todo o texto deve ser confirmado, como quando um documento é salvo ou impresso.

#### Framework de Métodos de Entrada

O framework de métodos de entrada permite a colaboração entre componentes de edição de texto e métodos de entrada na inserção de texto. Programadores que desenvolvem componentes de edição de texto ou métodos de entrada usam este framework. Outros desenvolvedores de aplicações geralmente fazem uso mínimo dele. Por exemplo, eles devem chamar [InputContext.endComposition](<https://docs.oracle.com/en/java/javase/25/docs/api/java.desktop/java/awt/im/InputContext.html#endComposition\(\)>) quando todo o texto deve ser confirmado, como quando um documento é salvo ou impresso.