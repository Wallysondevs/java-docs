# Jfr - Analisar e Imprimir Arquivos do Flight Recorder

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Monitoramento ](<#/doc/tutorials/jvm/tools/monitoring>) > Jfr - Analisar e Imprimir Arquivos do Flight Recorder

**Tutorial Atual**

Jfr - Analisar e Imprimir Arquivos do Flight Recorder

➜

**Próximo na Série**

[Jconsole - o Monitor Gráfico da Sua Aplicação](<#/doc/tutorials/jvm/tools/monitoring/jconsole>)

**Próximo na Série:** [Jconsole - o Monitor Gráfico da Sua Aplicação](<#/doc/tutorials/jvm/tools/monitoring/jconsole>)

# Jfr - Analisar e Imprimir Arquivos do Flight Recorder

## Apresentando Jfr

[jfr](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jfr.html>) - analisa e imprime arquivos do Flight Recorder

## Sinopse

Para imprimir o conteúdo de uma gravação de voo na saída padrão:

`jfr print [options] file`

Para imprimir informações de metadados sobre eventos de gravação de voo:

`jfr metadata file`

Para exibir dados de eventos agregados na saída padrão:

`jfr view [options] file`

Para configurar eventos dentro de um arquivo de configurações `.jfc`:

`jfr configure [options]`

Para remover eventos de um arquivo de gravação de voo:

`jfr scrub [options] file`

Para montar arquivos de chunk em um arquivo de gravação de voo:

`jfr assemble repository file`

Para desmontar um arquivo de gravação de voo em arquivos de chunk:

`jfr disassemble [options] file`

Para visualizar as estatísticas de resumo de um arquivo de gravação de voo:

`jfr summary file`

_opções_

Opcional: Especifica opções de linha de comando separadas por espaços. Consulte as seções de subcomponentes individuais para descrições das opções disponíveis.

_arquivo_

Especifica o nome do arquivo de gravação de voo de destino (`.jfr`).

_repositório_

Especifica o local dos arquivos de chunk que serão montados em uma gravação de voo.

## Descrição

O comando `jfr` fornece uma ferramenta para interagir com arquivos do flight recorder (`.jfr`). A função principal é filtrar, resumir e gerar arquivos de gravação de voo em um formato legível por humanos. Há também suporte para mesclar e dividir arquivos de gravação.

Arquivos de gravação de voo são criados e salvos como arquivos formatados binários. Ter uma ferramenta que pode extrair o conteúdo de uma gravação de voo, manipulá-los e traduzi-los para um formato legível por humanos ajuda os desenvolvedores a depurar problemas de desempenho com aplicações Java.

## Subcomandos

O comando `jfr` possui vários subcomandos:

  * `print`
  * `view`
  * `configure`
  * `summary`
  * `scrub`
  * `assemble`
  * `disassemble`
  * `metadata`

### Subcomando `jfr print`

Use `jfr print` para imprimir o conteúdo de um arquivo de gravação de voo na saída padrão. A sintaxe é:

```
jfr print [--xml | --json] [--categories filters] [--events filters] [--stack-depth depth] file
```

onde:

`--xml`

Imprime a gravação em formato XML

`--json`

Imprime a gravação em formato JSON

`--categories filters`

Seleciona eventos que correspondem a um nome de categoria. O filtro é uma lista de nomes separados por vírgulas, simples e/ou qualificados, e/ou padrões glob entre aspas

`--events filters`

Seleciona eventos que correspondem a um nome de evento. O filtro é uma lista de nomes separados por vírgulas, simples e/ou qualificados, e/ou padrões glob entre aspas

`--stack-depth depth`

Número de frames em stack traces, por padrão 5

`file`

Localização do arquivo de gravação (`.jfr`)

O formato padrão para imprimir o conteúdo do arquivo de gravação de voo é um formato legível por humanos, a menos que `xml` ou `json` seja especificado. Essas opções fornecem saída legível por máquina que pode ser posteriormente analisada ou processada por scripts criados pelo usuário.

Use `jfr --help print` para ver exemplos de uso de filtros.

Para reduzir a quantidade de dados exibidos, é possível filtrar eventos ou categorias de eventos. O filtro opera no nome simbólico de um evento, definido usando a anotação `@Name`, ou no nome da categoria, definido usando a anotação `@Category`. Se vários filtros forem usados, eventos de ambos os filtros serão incluídos. Se nenhum filtro for usado, todos os eventos serão impressos. Se uma combinação de um filtro de categoria e um filtro de evento for usada, os eventos selecionados serão a união dos dois filtros.

Por exemplo, para mostrar todos os eventos de GC e o evento CPULoad, o seguinte comando poderia ser usado:

```
jfr print --events "GC,CPULoad" recording.jfr
```

Os valores dos eventos são formatados de acordo com os tipos de conteúdo que estão sendo usados. Por exemplo, um campo com a anotação `jdk.jfr.Percentage` que tem o valor 0.52 é formatado como 52%.

Stack traces são por padrão truncados para 5 frames, mas o número pode ser aumentado/diminuído usando a opção de linha de comando `--stack-depth`.

### Subcomando `jfr view`

Use `jfr view` para agregar e exibir dados de eventos na saída padrão.

A sintaxe é:

`jfr view [--verbose] [--width <integer>] [--truncate <mode>] [--cell-height <integer>] <view> <file>`

onde:

`--verbose`

Exibe a consulta que compõe a visualização.

`--width <integer>`

A largura da visualização em caracteres. O valor padrão depende da visualização.

`--truncate <mode>`

Como truncar o conteúdo que excede o espaço em uma célula de tabela. O modo pode ser 'beginning' (início) ou 'end' (fim). O valor padrão é 'end'.

`--cell-height <integer>`

Número máximo de linhas em uma célula de tabela. O valor padrão depende da visualização.

`<view>`

Nome da visualização ou tipo de evento a ser exibido. Use `jfr --help view` para ver uma lista de visualizações disponíveis.

`<file>`

Localização do arquivo de gravação (`.jfr`).

O parâmetro `<view>` pode ser um nome de tipo de evento. Use `jfr view types <file>` para ver uma lista. Para exibir todas as visualizações, use `jfr view all-views <file>`. Para exibir todos os eventos, use `jfr view all-events <file>`.

### Subcomando `jfr configure`

Use jfr configure para configurar um arquivo de configurações .jfc.

A sintaxe é:

`jfr configure [--interactive] [--verbose] [--input ] [--output ] [option=value]* [event-setting=value]*`

`--interactive`

Modo interativo onde a configuração é determinada por um conjunto de perguntas.

`--verbose`

Exibe as configurações modificadas.

`--input <files>`

Uma lista de arquivos .jfc separados por vírgulas, a partir dos quais a nova configuração é baseada. Se nenhum arquivo for especificado, o arquivo padrão no JDK é usado (default.jfc). Se 'none' for especificado, a nova configuração começa vazia.

`--output <file>`

O nome do arquivo de saída gerado. Se não for especificado, o nome do arquivo custom.jfc será usado.

`option=value`

O valor da opção a ser modificado. Para ver as opções disponíveis, use `jfr help configure`.

`event-setting=value`

O valor da configuração do evento a ser modificado. Use o formato: `<event-name>#<setting-name>=<value>`. Para adicionar uma nova configuração de evento, prefixe o nome do evento com '+'.

O delimitador de espaço em branco pode ser omitido para valores de timespan, ou seja, 20ms. Para mais informações sobre a sintaxe das configurações, consulte o Javadoc do pacote [jdk.jfr](<https://docs.oracle.com/en/java/javase/26/docs/api/jdk.jfr/jdk/jfr/package-summary.html>).

### Subcomando `jfr summary`

Use `jfr summary` para imprimir estatísticas de uma gravação. Por exemplo, um resumo pode ilustrar o número de eventos gravados e quanto espaço em disco eles usaram. Isso é útil para solucionar problemas e entender o impacto das configurações de eventos.

A sintaxe é:

```
jfr summary file
```

onde: `file`

Localização do arquivo de gravação de voo (`.jfr`)

### Subcomando `jfr metadata`

Use `jfr metadata` para visualizar informações sobre eventos, como nomes de eventos, categorias e layout de campos dentro de um arquivo de gravação de voo. A sintaxe é:

```
jfr metadata file
```

onde:

`file`

Localização do arquivo de gravação de voo (`.jfr`)

### Subcomando `jfr scrub`

Use jfr scrub para remover conteúdos sensíveis de um arquivo ou para reduzir seu tamanho.

A sintaxe é:

`jfr scrub [--include-events <filter>] [--exclude-events <filter>] [--include-categories <filter>] [--exclude-categories <filter>] [--include-threads <filter>] [--exclude-threads <filter>] <input-file> [<output-file>]`

`--include-events <filter>`

Seleciona eventos que correspondem a um nome de evento.

`--exclude-events <filter>`

Exclui eventos que correspondem a um nome de evento.

`--include-categories <filter>`

Seleciona eventos que correspondem a um nome de categoria.

`--exclude-categories <filter>`

Exclui eventos que correspondem a um nome de categoria.

`--include-threads <filter>`

Seleciona eventos que correspondem a um nome de thread.

`--exclude-threads <filter>`

Exclui eventos que correspondem a um nome de thread.

`<input-file>`

O arquivo de entrada para ler eventos.

`<output-file>`

O arquivo de saída para escrever eventos filtrados. Se nenhum arquivo for especificado, ele será gravado no mesmo caminho do arquivo de entrada, mas com "-scrubbed" anexado ao nome do arquivo.

O filtro é uma lista de nomes separados por vírgulas, simples e/ou qualificados, e/ou padrões glob entre aspas. Se vários filtros forem usados, eles são aplicados na ordem especificada.

### Subcomando `jfr assemble`

Use jfr `assemble` para montar arquivos de chunk em um arquivo de gravação.

A sintaxe é:

```
jfr assemble repository file
```

onde:

`repository`

Diretório onde o repositório contendo arquivos de chunk está localizado

`file`

Localização do arquivo de gravação de voo (`.jfr`)

As informações de gravação de voo são escritas em chunks. Um chunk contém todas as informações necessárias para a análise. Um chunk tipicamente contém eventos úteis para a solução de problemas. Se uma JVM falhar, esses chunks podem ser recuperados e usados para criar um arquivo de gravação de voo usando este comando `jfr assemble`. Esses arquivos de chunk são concatenados em ordem cronológica e arquivos de chunk que não estão finalizados (.part) são excluídos.

### Subcomando `jfr disassemble`

Use `jfr disassemble` para decompor um arquivo de gravação de voo em suas partes de arquivo de chunk. A sintaxe é:

`jfr disassemble [--max-chunks <chunks>] [--output <directory>] <file>`

onde:

`--output directory`

O local para escrever o arquivo desmontado, por padrão o diretório atual

`--max-chunks chunks`

Número máximo de chunks por arquivo, por padrão 5. O tamanho do chunk varia, mas é tipicamente em torno de 15 MB.

`--max-size size`

Número máximo de bytes por arquivo.

`file`

Localização do arquivo de gravação de voo (`.jfr`)

Esta função pode ser útil para reparar um arquivo corrompido removendo o chunk defeituoso. Também pode ser usada para reduzir o tamanho de um arquivo que é muito grande para ser transferido. Os arquivos de chunk resultantes são nomeados `myfile_1.jfr`, `myfile_2.jfr`, etc. Se necessário, os nomes dos arquivos resultantes serão preenchidos com zeros para preservar a ordem cronológica. Por exemplo, o nome do arquivo de chunk é `myfile_001.jfr` se a gravação consistir em mais de 100 chunks.

## Subcomandos de Versão e Ajuda

Use `jfr --version` ou `jfr version` para visualizar as informações da string de versão para este comando jfr.

Para obter ajuda sobre qualquer um dos subcomandos jfr, use:

```
jfr --help [subcommand]
```

onde:

`[subcomando]` é qualquer um de:

  * `print`
  * `view`
  * `configure`
  * `summary`
  * `scrub`
  * `assemble`
  * `disassemble`
  * `metadata`

## Mais Aprendizado

### Neste tutorial

Apresentando Jfr Sinopse Descrição Subcomandos Subcomandos de Versão e Ajuda Mais Aprendizado

Última atualização: 17 de julho de 2024

**Tutorial Atual**

Jfr - Analisar e Imprimir Arquivos do Flight Recorder

➜

**Próximo na Série**

[Jconsole - o Monitor Gráfico da Sua Aplicação](<#/doc/tutorials/jvm/tools/monitoring/jconsole>)

**Próximo na Série:** [Jconsole - o Monitor Gráfico da Sua Aplicação](<#/doc/tutorials/jvm/tools/monitoring/jconsole>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Monitoramento ](<#/doc/tutorials/jvm/tools/monitoring>) > Jfr - Analisar e Imprimir Arquivos do Flight Recorder