# Arquivos de Configuração de Fonte

## 5 Arquivos de Configuração de Fonte

A plataforma Java define cinco nomes de fontes lógicas que toda implementação deve suportar: Serif, SansSerif, Monospaced, Dialog e DialogInput. Esses nomes de fontes lógicas são mapeados para fontes físicas de maneiras dependentes da implementação.

Uma maneira pela qual o Oracle JDK mapeia nomes de fontes lógicas para fontes físicas é usando arquivos de configuração de fonte. Pode haver vários arquivos para suportar diferentes mapeamentos, dependendo da versão do sistema operacional hospedeiro. Os arquivos são distribuídos com a instalação do JDK. Você pode editar ou criar seus próprios arquivos de configuração de fonte para ajustar os mapeamentos à sua configuração de sistema específica, no entanto, estes devem ser colocados em `conf/fonts` e estão sujeitos às notas de implementação discutidas abaixo.

Os arquivos de configuração de fonte vêm em dois formatos: um formato de propriedades e um formato binário. O formato de propriedades é descrito em detalhes neste documento e pode ser usado para configurações definidas pelo usuário. O formato binário não é documentado e é usado apenas para as configurações predefinidas do JDK; os arquivos correspondentes no formato de propriedades estão disponíveis para referência como arquivos com a extensão `.properties.src`.

### Plataformas Suportadas

Os arquivos de configuração de fonte são dependentes da implementação. Nem todas as implementações da Plataforma Java os utilizam, e o formato e o conteúdo variam entre ambientes de tempo de execução e lançamentos. A implementação do macOS não usa arquivos de configuração de fonte, pois o mapeamento é codificado no código-fonte e não pode ser alterado.

O Oracle JDK suporta arquivos de configuração de fonte no sistema operacional hospedeiro da seguinte forma:

  * Para Windows, arquivos de configuração de fonte são necessários.

  * Para macOS, arquivos de configuração de fonte não são suportados.

  * Para Linux, o Oracle JDK está deixando de fornecer arquivos de configuração de fonte personalizados em plataformas Linux, pois são difíceis de manter atualizados entre distribuições e versões. Uma distribuição que tem controle sobre as fontes no sistema pode continuar a fornecer este arquivo personalizado. Se o tempo de execução Java encontrar um arquivo personalizado que corresponda exatamente à distribuição e versão, esse arquivo será usado. Se nenhuma correspondência exata for encontrada, o arquivo é criado dinamicamente em tempo de execução. Esses arquivos gerados são colocados em um local determinado pela implementação. Eles devem ser considerados internos à implementação: não são editáveis pelo usuário e não seguem a sintaxe descrita nesta especificação.

### Carregando Arquivos de Configuração de Fonte

O JDK coloca quaisquer arquivos que ele fornece em `$JDKHOME/lib`. Não modifique esse local. Em vez disso, coloque quaisquer atualizações ou versões personalizadas dos arquivos de configuração em `$JDKHOME/conf/fonts`.

Em plataformas que suportam arquivos de configuração de fonte, o tempo de execução procurará primeiro em `$JDKHOME/conf/fonts`. Em outras palavras, um arquivo fornecido pelo usuário é preferido se houver uma correspondência.

O arquivo de configuração de fonte para um sistema operacional hospedeiro está localizado da seguinte forma:

  * JavaHome - o diretório do JDK, conforme fornecido pela propriedade de sistema `java.home`.
  * OS - uma string que identifica uma variante do sistema operacional:
    * Para Windows, vazio.
    * Para Linux, `"RedHat"`, `"SuSE"`, etc.
  * Version - uma string que identifica a versão do sistema operacional.

O tempo de execução usa o primeiro dos seguintes arquivos que encontrar:
```
    JavaHome/lib/fontconfig.OS.Version.properties
    JavaHome/lib/fontconfig.OS.Version.bfc
    JavaHome/lib/fontconfig.OS.properties
    JavaHome/lib/fontconfig.OS.bfc
    JavaHome/lib/fontconfig.Version.properties
    JavaHome/lib/fontconfig.Version.bfc
    JavaHome/lib/fontconfig.properties
    JavaHome/lib/fontconfig.bfc
```

Arquivos com o sufixo `.properties` são considerados arquivos de propriedades conforme especificado pela classe [Properties](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Properties.html>) e são carregados através dessa classe. Arquivos sem esse sufixo são considerados no formato binário.

### Nomes Usados em Arquivos de Configuração de Fonte

Ao longo dos arquivos de configuração de fonte, vários nomes diferentes são usados:

  * LogicalFontName - um dos cinco nomes de fontes lógicas: `serif`, `sansserif`, `monospaced`, `dialog` e `dialoginput`. Em arquivos de configuração de fonte, esses nomes estão sempre em minúsculas.
  * StyleName - um dos quatro estilos de fonte padrão: `plain`, `bold`, `italic` e `bolditalic`. Novamente, esses nomes estão sempre em minúsculas.
  * PlatformFontName - o nome de uma fonte física, em um formato tipicamente usado na plataforma:
    * No Windows, um nome de face de fonte, como `"Courier New"` ou `"\uad74\ub9bc"`.
    * No Linux, um nome xlfd, como `"-monotype-times new roman-regular-r---*-%d-*-*-p-*-iso8859-1"`. Note que `"%d"` é usado para o tamanho da fonte - o tamanho real da fonte é preenchido em tempo de execução.
  * CharacterSubsetName - um nome para um subconjunto do conjunto de caracteres Unicode que certas fontes de componente podem renderizar.
    * Para Windows, os seguintes nomes são predefinidos: alphabetic, arabic, chinese-ms936, chinese-gb18030, chinese-ms950, chinese-hkscs, cyrillic-iso8859-5, cyrillic-cp1251, cyrillic-koi8-r, devanagari, dingbats, greek, hebrew, japanese, korean, latin, symbol, thai.
    * Para Linux, os seguintes nomes são predefinidos: arabic, chinese-gb2312, chinese-gbk, chinese-gb18030-0, chinese-gb18030-1, chinese-cns11643-1, chinese-cns11643-2, chinese-cns11643-3, chinese-big5, chinese-hkscs, cyrillic, devanagari, dingbats, greek, hebrew, japanese-x0201, japanese-x0208, japanese-x0212, korean, korean-johab, latin-1, latin-2, latin-4, latin-5, latin-7, latin-9, symbol,thai.
Um arquivo de configuração de fonte pode definir nomes adicionais para identificar subconjuntos de caracteres adicionais.
  * Encoding - o nome canônico da codificação padrão, conforme fornecido por `java.nio.charset.Charset.defaultCharset().name()`.
  * Language - o idioma do locale padrão inicial.
  * Country - o país do locale padrão inicial.

### Propriedades para Todas as Plataformas

As propriedades aplicáveis a todas as plataformas permitem especificar a versão do formato de configuração de fonte, mapeamentos de fontes de componente, sequências de busca, intervalos de exclusão, fontes proporcionais, nomes de arquivos de fonte e caminho de fonte anexado.

#### Propriedade de Versão

A propriedade de versão identifica a versão do formato de configuração de fonte. Este documento especifica a versão 1.

A propriedade completa tem a forma:
```
    version=1
```

#### Mapeamentos de Fontes de Componente

As propriedades de mapeamento de fontes de componente descrevem qual fonte física usar para renderizar caracteres de um determinado subconjunto de caracteres com uma determinada fonte lógica em um determinado estilo.

As chaves têm as formas:
```
    allfonts.CharacterSubsetName
    LogicalFontName.StyleName.CharacterSubsetName
```

A primeira forma é usada se a mesma fonte for utilizada para um subconjunto de caracteres independentemente da fonte lógica e do estilo (neste caso, os motores de renderização de fonte aplicam estilos algorítmicos à fonte). A segunda forma é usada se diferentes fontes físicas forem utilizadas para um subconjunto de caracteres para diferentes fontes lógicas e estilos. Neste caso, as propriedades devem ser especificadas para cada combinação de fonte lógica e estilo, ou seja, 20 propriedades para um subconjunto de caracteres. Se uma propriedade da primeira forma estiver presente para um subconjunto de caracteres, então as propriedades da segunda forma para o mesmo subconjunto de caracteres serão ignoradas.

Os valores são nomes de fontes da plataforma, conforme descrito em [Nomes Usados em Arquivos de Configuração de Fonte](<#/doc/guides/intl/font-configuration-files>).

Como os subconjuntos de caracteres suportados por determinadas fontes frequentemente se sobrepõem, propriedades de sequência de busca separadas são usadas para definir em que ordem tentar as fontes ao renderizar um caractere.

#### Sequências de Busca

O tempo de execução Java usa propriedades de sequência para determinar sequências de busca para as cinco fontes lógicas. No entanto, um arquivo de configuração de fonte pode especificar propriedades que são específicas para uma combinação de codificação, idioma e país, e o tempo de execução usará então uma pesquisa para determinar a propriedade de sequência de busca para cada fonte lógica.

As chaves têm a forma:
```
    sequence.allfonts.Encoding.Language.Country
    sequence.LogicalFontName.Encoding.Language.Country
    sequence.allfonts.Encoding.Language
    sequence.LogicalFontName.Encoding.Language
    sequence.allfonts.Encoding
    sequence.LogicalFontName.Encoding
    sequence.allfonts
    sequence.LogicalFontName
```

As formas `allfonts` são usadas se a sequência for utilizada para todas as cinco fontes lógicas. As formas que especificam nomes de fontes lógicas são usadas se diferentes sequências forem utilizadas para diferentes fontes lógicas.

Para cada fonte lógica, o tempo de execução Java usa o valor da propriedade com a primeira das chaves acima. Esta propriedade determina a sequência de busca primária para a fonte lógica.

O arquivo também pode definir uma única sequência de busca de fallback. A chave para a propriedade de sequência de busca de fallback é:
```
    sequence.fallback
```

Os valores de todas as propriedades de sequência de busca têm a forma:
```
    SearchSequenceValue:
      CharacterSubsetName
      CharacterSubsetName , SearchSequenceValue
```

As propriedades de sequência de busca primária especificam nomes de subconjuntos de caracteres para fontes necessárias, que são usadas tanto para renderização de fontes AWT quanto 2D. A propriedade de sequência de busca de fallback fornece nomes de subconjuntos de caracteres para fontes opcionais, que são usadas como fallbacks para todas as fontes lógicas, mas apenas para renderização de fontes 2D. No Windows, se houver uma fonte EUDC (End User Defined Characters) do sistema registrada no Windows, o tempo de execução adiciona automaticamente essa fonte, bem como uma fonte de fallback para renderização 2D.

As propriedades de sequência determinam em qual ordem as fontes de componente são tentadas para renderizar um determinado caractere. Por exemplo, dadas as seguintes propriedades:
```
    sequence.monospaced=japanese,alphabetic
    sequence.fallback=korean
    monospaced.plain.alphabetic=Arial
    monospaced.plain.japanese=MSGothic
    monospaced.plain.korean=Gulim
```

O tempo de execução tentará primeiro renderizar um caractere com a fonte MSGothic. Se essa fonte não fornecer um glifo para o caractere, ele tentará a fonte Arial. Para renderização 2D, ele também tentará a fonte Gulim, bem como quaisquer fontes TrueType, OpenType ou Type 1 nos locais de fonte padrão do sistema. Para renderização 2D no Windows, se houver uma fonte EUDC do sistema registrada no Windows, o tempo de execução também tentará essa fonte EUDC.

Ao calcular métricas de fonte para uma fonte lógica sem referência a uma string, apenas as fontes necessárias são levadas em consideração. Para o exemplo acima, o método [FontMetrics.getMaxDescent](<https://docs.oracle.com/en/java/javase/25/docs/api/java.desktop/java/awt/FontMetrics.html#getMaxDescent\(\)>) retornaria resultados baseados nas fontes MSGothic e Arial, mas não na fonte Gulim. Dessa forma, elementos simples da interface do usuário, como botões, que às vezes calculam seu tamanho com base em métricas de fonte, não são afetados por uma lista estendida de fontes de componente que seus rótulos geralmente não usam. Por outro lado, os componentes de texto tipicamente calculam métricas com base no texto que contêm e, portanto, obterão resultados corretos.

As propriedades de sequência que o tempo de execução obtém para as cinco fontes lógicas devem listar os mesmos subconjuntos de caracteres, mas podem listá-los em ordem diferente.

#### Intervalos de Exclusão

As propriedades de intervalo de exclusão especificam intervalos de caracteres Unicode que devem ser excluídos de serem renderizados com as fontes correspondentes a um determinado subconjunto de caracteres. Isso é usado se uma fonte com um grande repertório de caracteres precisar ser colocada no início da sequência de busca (por exemplo, por razões de desempenho), mas alguns caracteres que ela suporta devem ser desenhados com uma fonte diferente. Essas propriedades são opcionais, então há no máximo uma por subconjunto de caracteres.

As chaves têm a forma:
```
    exclusion.CharacterSubsetName
```

Os valores têm a forma:
```
    ExclusionRangeValue:
      Range
      Range , ExclusionRangeValue
    
    Range:
      Char - Char
    
    Char:
      HexDigit HexDigit HexDigit HexDigit
      HexDigit HexDigit HexDigit HexDigit HexDigit HexDigit
```

Um `Char` é um caractere Unicode representado como um valor hexadecimal.

#### Fontes Proporcionais

As propriedades de fontes proporcionais descrevem a relação entre variantes proporcionais e não proporcionais de fontes de outra forma equivalentes. Essas propriedades são usadas para implementar preferências especificadas pelo método [ GraphicsEnvironment.preferProportionalFonts](<https://docs.oracle.com/en/java/javase/25/docs/api/java.desktop/java/awt/GraphicsEnvironment.html#preferProportionalFonts\(\)>).

As chaves têm a forma:
```
    proportional.PlatformFontName
```

Caracteres de espaço no nome da fonte da plataforma devem ser substituídos por caracteres de sublinhado (`_`).

Os valores têm a forma:
```
    PlatformFontName
```

Nos valores, os caracteres de espaço são deixados inalterados.

Cada propriedade indica que a fonte nomeada no valor é o equivalente proporcional da fonte nomeada na chave, e também que a fonte nomeada na chave é o equivalente não proporcional da fonte nomeada no valor.

#### Nomes de Arquivos de Fonte

As propriedades de nome de arquivo de fonte fornecem os nomes dos arquivos que contêm as fontes físicas usadas no arquivo de configuração de fonte. Nomes de arquivos são necessários para todas as fontes físicas no Windows e recomendados para todas as fontes físicas no Linux.

As chaves têm a forma:
```
    filename.PlatformFontName
```

Caracteres de espaço no nome da fonte da plataforma devem ser substituídos por caracteres de sublinhado (`_`).

Os valores são os nomes dos arquivos que contêm as fontes. No Windows, nomes de arquivos simples são usados; e o ambiente de tempo de execução procura por cada arquivo primeiro em seu próprio diretório `lib/fonts`, se existir, e depois no diretório de fontes do Windows. No Linux, são usados nomes de caminho absolutos, nomes de caminho começando com `"$JRE_LIB_FONTS"` para o próprio diretório `lib/fonts` do ambiente de tempo de execução, ou nomes xlfd.

Nota:

O Oracle JDK não entrega nenhuma fonte no local `lib/fonts`.

#### Caminho de Fonte Anexado

O tempo de execução Java pode determinar automaticamente vários diretórios que contêm arquivos de fonte, como seu próprio diretório `lib/fonts`, se existir, ou a pasta de fontes do Windows. Diretórios adicionais podem ser especificados para serem anexados ao caminho de fonte.

A chave tem a forma:
```
    appendedfontpath
```

O valor tem a forma:
```
    AppendedFontPathValue:
      Directory
      Directory PathSeparator AppendedFontPathValue
```

O separador de caminho é o valor dependente da plataforma de [java.io.File.pathSeparator](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/io/File.html#pathSeparator>).

### Propriedades para Windows

Não há propriedades específicas da plataforma para Windows. No entanto, existe uma forma especial do nome do subconjunto de caracteres usado em sequências de busca. O nome "alphabetic" pode receber um sufixo indicando a codificação de caracteres associada ao subconjunto:
```
    alphabetic
    alphabetic/default
    alphabetic/1252
```

Esta informação é usada apenas para AWT, não para 2D. O sufixo `/default` restringe o uso das fontes de componente para este subconjunto de caracteres ao conjunto de caracteres da codificação padrão; o sufixo `/1252` ao conjunto de caracteres Windows-1252. Para acessar mapeamentos de fontes de componente e intervalos de exclusão, o sufixo de codificação de caracteres é omitido. Para todos os outros subconjuntos de caracteres, a codificação de caracteres AWT é determinada internamente pelo tempo de execução Java.

### Propriedade para Linux

A única propriedade específica do Linux é o caminho de fonte AWT, que identifica diretórios da plataforma que devem ser adicionados ao caminho de fonte do servidor X11.

As chaves têm a forma:
```
    awtfontpath.CharacterSubsetName
```

Os valores têm a forma:
```
    AWTFontPathValue:
      Directory
      Directory : AWTFontPathValue
```

Os diretórios devem ser diretórios de fonte X11 válidos. O tempo de execução Java garante que os diretórios para todos os subconjuntos de caracteres de uma sequência de busca primária encontrada pela pesquisa de sequência de busca (veja [Sequências de Busca](<#/doc/guides/intl/font-configuration-files>)) façam parte do caminho de fonte X11. A implementação assume que todas as fontes lógicas usam o mesmo conjunto de subconjuntos de caracteres para um dado ambiente de codificação, idioma e país.