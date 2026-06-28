# O Comando jfr

## Nome

jfr - imprime e manipula arquivos Flight Recorder

## Sinopse

Para imprimir o conteúdo de uma gravação de voo para a saída padrão:

`jfr` `print` [_options_] _file_

Para exibir dados de eventos agregados na saída padrão:

`jfr` `view` [_options_] _file_

Para configurar um arquivo de configurações .jfc:

`jfr` `configure` [_options_]

Para imprimir informações de metadata sobre eventos de gravação de voo:

`jfr` `metadata` [_file_]

Para visualizar as estatísticas de resumo de um arquivo de gravação de voo:

`jfr` `summary` _file_

Para remover eventos de um arquivo de gravação de voo:

`jfr` `scrub` [_options_] _file_

Para montar arquivos chunk em um arquivo de gravação de voo:

`jfr` `assemble` _repository_ _file_

Para desmontar um arquivo de gravação de voo em arquivos chunk:

`jfr` `disassmble` [_options_] _file_

_options_
     Opcional: Especifica opções de linha de comando separadas por espaços. Consulte as seções de subcomponentes individuais para descrições das opções disponíveis.
_file_
     Especifica o nome do arquivo de gravação de voo de destino (`.jfr`).
_repository_
     Especifica o local dos arquivos chunk que serão montados em uma gravação de voo.

## Descrição

O comando `jfr` fornece uma ferramenta para interagir com arquivos Flight Recorder (`.jfr`). A função principal é filtrar, resumir e gerar arquivos de gravação de voo em formato legível por humanos. Há também suporte para limpeza (scrubbing), fusão (merging) e divisão (splitting) de arquivos de gravação.

Arquivos de gravação de voo são criados e salvos como arquivos formatados em binário. Ter uma ferramenta que pode extrair o conteúdo de uma gravação de voo e manipular o conteúdo e traduzi-los para um formato legível por humanos ajuda os desenvolvedores a depurar problemas de desempenho com aplicações Java.

### Subcomandos

O comando `jfr` possui vários subcomandos:

  * `print`
  * `view`
  * `configure`
  * `metadata`
  * `summary`
  * `scrub`
  * `assemble`
  * `disassemble`

#### Subcomando `jfr print`

Use `jfr print` para imprimir o conteúdo de um arquivo de gravação de voo para a saída padrão.

A sintaxe é:

`jfr print` [`--xml`|`--json`|`--exact`] [`--categories` <_filters_ >] [`--events` <_filters_ >] [`--stack-depth` <_depth_ >] <_file_ >

onde:

`--xml`
     Imprime a gravação em formato XML.
`--json`
     Imprime a gravação em formato JSON.
`--exact`
     Imprime números e timestamps de forma formatada com precisão total.
`--categories` <_filters_ >
     Seleciona eventos que correspondem a um nome de categoria. O filtro é uma lista de nomes separada por vírgulas, simples e/ou qualificados, e/ou padrões glob entre aspas.
`--events` <_filters_ >
     Seleciona eventos que correspondem a um nome de evento. O filtro é uma lista de nomes separada por vírgulas, simples e/ou qualificados, e/ou padrões glob entre aspas.
`--stack-depth` <_depth_ >
     Número de frames em stack traces, por padrão 5.
<_file_ >
     Localização do arquivo de gravação (`.jfr`)

O formato padrão para imprimir o conteúdo do arquivo de gravação de voo é um formato legível por humanos, a menos que `xml` ou `json` seja especificado. Essas opções fornecem saída legível por máquina que pode ser posteriormente analisada ou processada por scripts criados pelo usuário.

Use `jfr --help print` para ver exemplos de uso de filtros.

Para reduzir a quantidade de dados exibidos, é possível filtrar eventos ou categorias de eventos. O filtro opera no nome simbólico de um evento, definido usando a annotation `@Name`, ou no nome da categoria, definido usando a annotation `@Category`. Se vários filtros forem usados, eventos de ambos os filtros serão incluídos. Se nenhum filtro for usado, todos os eventos serão impressos. Se uma combinação de um filtro de categoria e um filtro de evento for usada, os eventos selecionados serão a união dos dois filtros.

Por exemplo, para mostrar todos os eventos GC e o evento CPULoad, o seguinte comando pode ser usado:

`jfr print --categories GC --events CPULoad recording.jfr`

Os valores dos eventos são formatados de acordo com os content types que estão sendo usados. Por exemplo, um campo com a annotation `jdk.jfr.Percentage` que tem o valor 0.52 é formatado como 52%.

Stack traces são por padrão truncados para 5 frames, mas o número pode ser aumentado/diminuído usando a opção de linha de comando `--stack-depth`.

#### Subcomando `jfr view`

Use `jfr view` para agregar e exibir dados de eventos na saída padrão.

A sintaxe é:

`jfr view` [`--verbose`] [`--width` <_integer_ >] [`--truncate` <_mode_ >] [`--cell-height` <_integer_ >] <_view_ > <_file_ >

onde:

`--verbose`
     Exibe a query que compõe a view.
`--width` <_integer_ >
     A largura da view em caracteres. O valor padrão depende da view.
`--truncate` <_mode_ >
     Como truncar o conteúdo que excede o espaço em uma célula de tabela. O modo pode ser 'beginning' (início) ou 'end' (fim). O valor padrão é 'end'.
`--cell-height` <_integer_ >
     Número máximo de linhas em uma célula de tabela. O valor padrão depende da view.
<_view_ >
     Nome da view ou event type a ser exibido. Use `jfr --help view` para ver uma lista de views disponíveis.
<_file_ >
     Localização do arquivo de gravação (.jfr)

O parâmetro <_view_ > pode ser um nome de event type. Use `jfr view types <file>` para ver uma lista. Para exibir todas as views, use `jfr view all-views <file>`. Para exibir todos os eventos, use `jfr view all-events <file>`.

#### Subcomando `jfr configure`

Use `jfr configure` para configurar um arquivo de configurações .jfc.

A sintaxe é:

`jfr configure` [--interactive] [--verbose] [--input &lt;files&gt;] [--output &lt;file&gt;] [option=value]* [event-setting=value]*

`--interactive`
     Modo interativo onde a configuração é determinada por um conjunto de perguntas.
`--verbose`
     Exibe as configurações modificadas.
`--input` <_files_ >
     Uma lista de arquivos .jfc separada por vírgulas, a partir da qual a nova configuração é baseada. Se nenhum arquivo for especificado, o arquivo padrão no JDK é usado (default.jfc). Se 'none' for especificado, a nova configuração começa vazia.
`--output` <_file_ >
     O nome do arquivo de saída gerado. Se não for especificado, o nome do arquivo custom.jfc será usado.
_option=value_
     O valor da opção a ser modificado. Para ver as opções disponíveis, use `jfr help configure`
_event-setting=value_
     O valor da configuração de evento a ser modificado. Use o formato: <_event-name_ >#<_setting-name_ >=<_value_ > Para adicionar uma nova configuração de evento, prefixe o nome do evento com '+'.

O delimitador de espaço em branco pode ser omitido para valores de timespan, ou seja, 20ms. Para mais informações sobre a sintaxe das configurações, consulte o Javadoc do pacote jdk.jfr.

#### Subcomando `jfr metadata`

Use `jfr metadata` para exibir informações sobre eventos, como nomes de eventos, categorias e layout de campos dentro de um arquivo de gravação de voo.

A sintaxe é:

`jfr metadata` [--categories &lt;filter&gt;] [--events &lt;filter&gt;] [&lt;file&gt;]

`--categories` <_filter_ >
     Seleciona eventos que correspondem a um nome de categoria. O filtro é uma lista de nomes separada por vírgulas, simples e/ou qualificados, e/ou padrões glob entre aspas.
`--events` <_filter_ >
     Seleciona eventos que correspondem a um nome de evento. O filtro é uma lista de nomes separada por vírgulas, simples e/ou qualificados, e/ou padrões glob entre aspas.
<_file_ >
     Localização do arquivo de gravação (.jfr)

Se o parâmetro &lt;file&gt; for omitido, os metadata do JDK onde a ferramenta 'jfr' está localizada serão usados.

#### Subcomando `jfr summary`

Use `jfr summary` para imprimir estatísticas de uma gravação. Por exemplo, um resumo pode ilustrar o número de eventos registrados e quanto espaço em disco eles usaram. Isso é útil para troubleshooting e para entender o impacto das configurações de eventos.

A sintaxe é:

`jfr summary` <_file_ >

onde:

<_file_ >
     Localização do arquivo de gravação de voo (`.jfr`)

#### Subcomando `jfr scrub`

Use `jfr scrub` para remover conteúdo sensível de um arquivo ou para reduzir seu tamanho.

A sintaxe é:

`jfr scrub` [--include-events <_filter_ >] [--exclude-events <_filter_ >] [--include-categories <_filter_ >] [--exclude-categories <_filter_ >] [--include-threads <_filter_ >] [--exclude-threads <_filter_ >] <_input-file_ > [<_output-file_ >]

`--include-events` <_filter_ >
     Seleciona eventos que correspondem a um nome de evento.
`--exclude-events` <_filter_ >
     Exclui eventos que correspondem a um nome de evento.
`--include-categories` <_filter_ >
     Seleciona eventos que correspondem a um nome de categoria.
`--exclude-categories` <_filter_ >
     Exclui eventos que correspondem a um nome de categoria.
`--include-threads` <_filter_ >
     Seleciona eventos que correspondem a um nome de thread.
`--exclude-threads` <_filter_ >
     Exclui eventos que correspondem a um nome de thread.
<_input-file_ >
     O arquivo de entrada para ler eventos.
<_output-file_ >
     O arquivo de saída para escrever eventos filtrados. Se nenhum arquivo for especificado, ele será escrito no mesmo caminho do arquivo de entrada, mas com "-scrubbed" anexado ao nome do arquivo.

O filtro é uma lista de nomes separada por vírgulas, simples e/ou qualificados, e/ou padrões glob entre aspas. Se vários filtros forem usados, eles são aplicados na ordem especificada.

#### Subcomando `jfr assemble`

Use jfr `assemble` para montar arquivos chunk em um arquivo de gravação.

A sintaxe é:

`jfr assemble` <_repository_ > <_file_ >

onde:

<_repository_ >
     Diretório onde o repository contendo arquivos chunk está localizado.
<_file_ >
     Localização do arquivo de gravação de voo (`.jfr`).

As informações de gravação de voo são escritas em chunks. Um chunk contém todas as informações necessárias para a análise. Um chunk tipicamente contém eventos úteis para troubleshooting. Se uma JVM falhar, esses chunks podem ser recuperados e usados para criar um arquivo de gravação de voo usando este comando `jfr assemble`. Esses arquivos chunk são concatenados em ordem cronológica e arquivos chunk que não estão finalizados (.part) são excluídos.

#### Subcomando `jfr disassemble`

Use `jfr disassemble` para decompor um arquivo de gravação de voo em suas partes de arquivo chunk.

A sintaxe é:

`jfr disassemble` [`--max-chunks` <_chunks_ >] [`--output` <_directory_ >] <_file_ >

onde:

`--output` <_directory_ >
     O local para escrever o arquivo desmontado, por padrão o diretório atual
`--max-chunks` <_chunks_ >
     Número máximo de chunks por arquivo, por padrão 5. O tamanho do chunk varia, mas é tipicamente em torno de 15 MB.
`--max-size` <_size_ >
     Número máximo de bytes por arquivo.
<_file_ >
     Localização do arquivo de gravação de voo (`.jfr`)

Esta função pode ser útil para reparar um arquivo corrompido removendo o chunk defeituoso. Também pode ser usada para reduzir o tamanho de um arquivo que é muito grande para transferir. Os arquivos chunk resultantes são nomeados `myfile_1.jfr`, `myfile_2.jfr`, etc. Se necessário, os nomes dos arquivos resultantes serão preenchidos com zeros para preservar a ordem cronológica. Por exemplo, o nome do arquivo chunk é `myfile_001.jfr` se a gravação consistir em mais de 100 chunks.

#### Subcomandos jfr version e help

Use `jfr --version` ou `jfr version` para visualizar as informações da string de versão para este comando jfr.

Para obter ajuda sobre qualquer um dos subcomandos jfr, use:

`jfr <--help|help>` [_subcommand_]

onde:

[_subcommand_] é qualquer um de:

  * `print`
  * `view`
  * `configure`
  * `metadata`
  * `summary`
  * `scrub`
  * `assemble`
  * `disassemble`