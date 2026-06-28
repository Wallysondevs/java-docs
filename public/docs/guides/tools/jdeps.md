# O Comando jdeps

## Nome

jdeps - inicia o analisador de dependência de classes Java

## Sinopse

`jdeps` [_options_] _path_ ...

_options_
    

Opções de linha de comando. Para descrições detalhadas das opções que podem ser usadas, consulte

  * Opções Possíveis

  * Opções de Análise de Dependência de Módulo

  * Opções para Filtrar Dependências

  * Opções para Filtrar Classes a Serem Analisadas

_path_
     Um caminho para o arquivo `.class`, diretório ou arquivo JAR a ser analisado.

## Descrição

O comando `jdeps` mostra as dependências de nível de pacote ou de nível de classe de arquivos de classe Java. A classe de entrada pode ser um caminho para um arquivo `.class`, um diretório, um arquivo JAR, ou pode ser um nome de classe totalmente qualificado para analisar todos os arquivos de classe. As opções determinam a saída. Por padrão, o comando `jdeps` escreve as dependências na saída do sistema. O comando pode gerar as dependências na linguagem DOT (consulte a opção `-dotoutput`).

## Opções Possíveis

`-?` ou `-h` ou `--help`
     Imprime a mensagem de ajuda.

`-dotoutput` _dir_ ou `--dot-output` _dir_
     Especifica o diretório de destino para a saída de arquivos DOT. Se esta opção for especificada, o comando `jdeps` gera um arquivo `.dot` para cada arquivo (archive) analisado, nomeado `archive-file-name.dot`, que lista as dependências, e também um arquivo de resumo nomeado `summary.dot` que lista as dependências entre os arquivos (archives).

`-s` ou `-summary`
     Imprime apenas um resumo das dependências.

`-v` ou `-verbose`
    

Imprime todas as dependências de nível de classe. Isso é equivalente a

> `-verbose:class -filter:none`

`-verbose:package`
     Imprime dependências de nível de pacote, excluindo, por padrão, dependências dentro do mesmo pacote.

`-verbose:class`
     Imprime dependências de nível de classe, excluindo, por padrão, dependências dentro do mesmo arquivo (archive).

`-apionly` ou `--api-only`
     Restringe a análise a APIs, por exemplo, dependências da assinatura de membros `public` e `protected` de classes públicas, incluindo tipo de campo, tipos de parâmetros de método, tipo de retorno e tipos de exceções verificadas.

`-jdkinternals` ou `--jdk-internals`
    

Encontra dependências de nível de classe nas APIs internas do JDK. Por padrão, esta opção analisa todas as classes especificadas na opção `--classpath` e arquivos de entrada, a menos que você tenha especificado a opção `-include`. Você não pode usar esta opção com as opções `-p`, `-e` e `-s`.

**Aviso** : As APIs internas do JDK são inacessíveis.

`-cp` _path_ , `-classpath` _path_ , ou `--class-path` _path_
     Especifica onde encontrar arquivos de classe.

`--module-path` _module-path_
     Especifica o caminho do módulo.

`--upgrade-module-path` _module-path_
     Especifica o caminho de atualização do módulo.

`--system` _java-home_
     Especifica um caminho de módulo de sistema alternativo.

`--add-modules` _module-name_[`,` _module-name_...]
     Adiciona módulos ao conjunto raiz para análise.

`--multi-release` _version_
     Especifica a versão ao processar arquivos JAR multi-release. _version_ deve ser um inteiro >=9 ou `base`.

`-q` ou `-quiet`
     Não mostra dependências ausentes da saída de `-generate-module-info`.

`-version` ou `--version`
     Imprime informações de versão.

## Opções de Análise de Dependência de Módulo

`-m` _module-name_ ou `--module` _module-name_
     Especifica o módulo raiz para análise.

`--generate-module-info` _dir_
     Gera `module-info.java` no diretório especificado. Os arquivos JAR especificados serão analisados. Esta opção não pode ser usada com as opções `--dot-output` ou `--class-path`. Use a opção `--generate-open-module` para módulos abertos.

`--generate-open-module` _dir_
     Gera `module-info.java` para os arquivos JAR especificados no diretório especificado como módulos abertos. Esta opção não pode ser usada com as opções `--dot-output` ou `--class-path`.

`--check` _module-name_ [`,` _module-name_...]
     Analisa a dependência dos módulos especificados. Ele imprime o descritor do módulo, as dependências de módulo resultantes após a análise e o grafo após a redução de transição. Ele também identifica quaisquer exports qualificados não utilizados.

`--list-deps`
     Lista as dependências de módulo e também os nomes de pacote das APIs internas do JDK (se referenciadas). Esta opção analisa transitivamente bibliotecas no classpath e module path, se referenciadas. Use a opção `--no-recursive` para análise de dependência não transitiva.

`--list-reduced-deps`
     O mesmo que `--list-deps` sem listar as arestas de leitura implícitas do grafo de módulos. Se o módulo M1 lê M2, e M2 requer transitivamente M3, então a leitura de M3 por M1 é implícita e não é mostrada no grafo.

`--print-module-deps`
     O mesmo que `--list-reduced-deps` com a impressão de uma lista de dependências de módulo separada por vírgulas. A saída pode ser usada por `jlink --add-modules` para criar uma imagem personalizada que contém esses módulos e suas dependências transitivas.

`--ignore-missing-deps`
     Ignora dependências ausentes.

## Opções para Filtrar Dependências

`-p` _pkg_name_ , `-package` _pkg_name_ , ou `--package` _pkg_name_
     Encontra dependências que correspondem ao nome de pacote especificado. Você pode especificar esta opção várias vezes para diferentes pacotes. As opções `-p` e `-e` são mutuamente exclusivas.

`-e` _regex_ , `-regex` _regex_ , ou `--regex` _regex_
     Encontra dependências que correspondem ao padrão especificado. As opções `-p` e `-e` são mutuamente exclusivas.

`--require` _module-name_
     Encontra dependências que correspondem ao nome de módulo fornecido (pode ser fornecido várias vezes). As opções `--package`, `--regex` e `--require` são mutuamente exclusivas.

`-f` _regex_ ou `-filter` _regex_
     Filtra dependências que correspondem ao padrão fornecido. Se fornecido várias vezes, o último será selecionado.

`-filter:package`
     Filtra dependências dentro do mesmo pacote. Este é o padrão.

`-filter:archive`
     Filtra dependências dentro do mesmo arquivo (archive).

`-filter:module`
     Filtra dependências dentro do mesmo módulo.

`-filter:none`
     Nenhuma filtragem `-filter:package` e `-filter:archive`. A filtragem especificada através da opção `-filter` ainda se aplica.

`--missing-deps`
     Encontra dependências ausentes. Esta opção não pode ser usada com as opções `-p`, `-e` e `-s`.

## Opções para Filtrar Classes a Serem Analisadas

`-include` _regex_
     Restringe a análise às classes que correspondem ao padrão. Esta opção filtra a lista de classes a serem analisadas. Pode ser usada em conjunto com `-p` e `-e`, que aplicam o padrão às dependências.

`-R` ou `--recursive`
     Percorre recursivamente todas as dependências de tempo de execução. A opção `-R` implica `-filter:none`. Se as opções `-p`, `-e` ou `-f` forem especificadas, apenas as dependências correspondentes serão analisadas.

`--no-recursive`
     Não percorre dependências recursivamente.

`-I` ou `--inverse`
     Analisa as dependências de acordo com outras opções fornecidas e, em seguida, encontra todos os artefatos que dependem direta e indiretamente dos nós correspondentes. Isso é equivalente ao inverso da análise de visão de tempo de compilação e ao resumo de impressão de dependência. Esta opção deve ser usada com as opções `--require`, `--package` ou `--regex`.

`--compile-time`
     Analisa a visão de tempo de compilação de dependências transitivas, como a visão de tempo de compilação da opção `-R`. Analisa as dependências de acordo com outras opções especificadas. Se uma dependência for encontrada a partir de um diretório, um arquivo JAR ou um módulo, todas as classes nesse arquivo (archive) contendo serão analisadas.

## Exemplo de Análise de Dependências

O exemplo a seguir demonstra a análise das dependências do arquivo `Notepad.jar`.

**Linux e macOS:**
```
    $ jdeps demo/jfc/Notepad/Notepad.jar
    Notepad.jar -> java.base
    Notepad.jar -> java.desktop
    Notepad.jar -> java.logging
       <unnamed> (Notepad.jar)
          -> java.awt
          -> java.awt.event
          -> java.beans
          -> java.io
          -> java.lang
          -> java.net
          -> java.util
          -> java.util.logging
          -> javax.swing
          -> javax.swing.border
          -> javax.swing.event
          -> javax.swing.text
          -> javax.swing.tree
          -> javax.swing.undo
```

**Windows:**
```
    C:\Java\jdk1.9.0>jdeps demo\jfc\Notepad\Notepad.jar
    Notepad.jar -> java.base
    Notepad.jar -> java.desktop
    Notepad.jar -> java.logging
       <unnamed> (Notepad.jar)
          -> java.awt
          -> java.awt.event
          -> java.beans
          -> java.io
          -> java.lang
          -> java.net
          -> java.util
          -> java.util.logging
          -> javax.swing
          -> javax.swing.border
          -> javax.swing.event
          -> javax.swing.text
          -> javax.swing.tree
          -> javax.swing.undo
```

## Exemplo Usando a Opção --inverse
```
     $ jdeps --inverse --require java.xml.bind
    Inverse transitive dependences on [java.xml.bind]
    java.xml.bind <- java.se.ee
    java.xml.bind <- jdk.xml.ws
    java.xml.bind <- java.xml.ws <- java.se.ee
    java.xml.bind <- java.xml.ws <- jdk.xml.ws
    java.xml.bind <- jdk.xml.bind <- jdk.xml.ws
```