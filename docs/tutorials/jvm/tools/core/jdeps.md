# Jdeps - Analise as Dependências das suas Classes Java

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas Essenciais do JDK ](<#/doc/tutorials/jvm/tools/core>) > Jdeps - Analise as Dependências das suas Classes Java

**Anterior na Série**

[Jmod - Crie arquivos JMOD](<#/doc/tutorials/jvm/tools/core/jmod>)

➜

**Tutorial Atual**

Jdeps - Analise as Dependências das suas Classes Java

➜

**Próximo na Série**

[Jdeprscan - Scanner de Elementos de API Depreciados](<#/doc/tutorials/jvm/tools/core/jdeprscan>)

**Anterior na Série:** [Jmod - Crie arquivos JMOD](<#/doc/tutorials/jvm/tools/core/jmod>)

**Próximo na Série:** [Jdeprscan - Scanner de Elementos de API Depreciados](<#/doc/tutorials/jvm/tools/core/jdeprscan>)

# Jdeps - Analise as Dependências das suas Classes Java

 

## Apresentando o jdeps

[jdeps](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jdeps.html>) \- inicia o analisador de dependências de classes Java

 

## Sinopse

`options` Opções de linha de comando. Para descrições detalhadas das opções que podem ser usadas, veja

`path` Um caminho para o arquivo `.class`, diretório ou arquivo JAR a ser analisado.

 

## Descrição

O comando jdeps mostra as dependências em nível de pacote ou em nível de classe de arquivos de classe Java. A classe de entrada pode ser um caminho para um arquivo `.class`, um diretório, um arquivo JAR, ou pode ser um nome de classe totalmente qualificado para analisar todos os arquivos de classe. As opções determinam a saída. Por padrão, o comando jdeps escreve as dependências para a saída do sistema. O comando pode gerar as dependências em DOT language (veja a opção `-dotoutput`).

 

## Opções

`-dotoutput dir` ou `--dot-output dir` Especifica o diretório de destino para a saída de arquivo DOT. Se esta opção for especificada, o comando jdeps gera um arquivo `.dot` para cada arquivo analisado, nomeado `archive-file-name.dot`, que lista as dependências, e também um arquivo de resumo nomeado `summary.dot` que lista as dependências entre os arquivos.

`-s` ou `-summary` Imprime apenas um resumo das dependências.

`-v` ou `-verbose` Imprime todas as dependências em nível de classe. Isso é equivalente a

`-verbose:package` Imprime dependências em nível de pacote, excluindo, por padrão, dependências dentro do mesmo pacote.

`-verbose:class` Imprime dependências em nível de classe, excluindo, por padrão, dependências dentro do mesmo arquivo.

`-apionly` ou `--api-only` Restringe a análise a APIs, por exemplo, dependências da assinatura de membros `public` e `protected` de classes `public`, incluindo `field type`, `method parameter types`, `returned type` e `checked exception types`.

`-jdkinternals` ou `--jdk-internals` Encontra dependências em nível de classe nas JDK internal APIs. Por padrão, esta opção analisa todas as classes especificadas na opção `--class-path` ou `-classpath` e arquivos de entrada, a menos que você tenha especificado a opção `-include`. Você não pode usar esta opção com as opções `-p`, `-e` e `-s`.

**_AVISO: As JDK internal APIs são inacessíveis._**

`-cp path`, `-classpath path`, ou `--class-path path` Especifica onde encontrar arquivos de classe.

`--module-path module-path` Especifica o `module path`.

`--upgrade-module-path module-path` Especifica o `upgrade module path`.

`--system java-home` Especifica um `system module path` alternativo.

`--add-modules module-name [, module-name...]` Adiciona módulos ao `root set` para análise.

`--multi-release version` Especifica a `version` ao processar `multi-release JAR files`. `version` deve ser um inteiro >=9 ou `base`.

`—q` ou `-quite` Não mostra dependências ausentes da saída de `--generate-module-info`.

`-version` ou `--version` Imprime informações de versão.

 

## Opções de Análise de Dependência de Módulos

`–m module-name` ou `--module module-name` Especifica o `root module` para análise.

`--generate-module-info dir` Gera `module-info.java` no diretório especificado. Os arquivos JAR especificados serão analisados. Esta opção não pode ser usada com as opções `--dot-output` ou `--class-path`. Use a opção `--generate-open-module` para `open modules`.

`--generate-open-module dir` Gera `module-info.java` para os arquivos JAR especificados no diretório especificado como `open modules`. Esta opção não pode ser usada com as opções `--dot-output` ou `--class-path`.

`--check module-name [, module-name...]` Analisa as dependências dos módulos especificados. Ele imprime o `module descriptor`, as `module dependencies` resultantes após a análise e o `graph` após a `transition reduction`. Ele também identifica quaisquer `unused qualified exports`.

`--list-deps` Lista as `module dependencies` e também os nomes de pacotes das `JDK internal APIs` (se referenciadas).

`--list—reduced-deps` O mesmo que `--list-deps` sem listar as `implied reads edges` do `module graph`. Se o módulo M1 lê M2, e M2 requer `transitive` em M3, então M1 lendo M3 é `implied` e não é mostrado no `graph`.

`--print-module-deps` O mesmo que `--list-reduced-deps` com a impressão de uma lista de `module dependencies` separada por vírgulas. A saída pode ser usada por `jlink --add-modules` para criar uma `custom image` que contém esses módulos e suas `transitive dependencies`.

 

## Opções para Filtrar Dependências

`-p pkg name`, `-package pkg name`, ou `--package pkg name` Encontra dependências que correspondem ao nome de pacote especificado. Você pode especificar esta opção várias vezes para diferentes pacotes. As opções `-p` e `-e` são mutuamente exclusivas.

`-e regex`, `-regex regex`, ou `--regex regex` Encontra dependências que correspondem ao padrão especificado. As opções `-p` e `-e` são mutuamente exclusivas.

`--require module-name` Encontra dependências que correspondem ao nome do módulo fornecido (pode ser especificado várias vezes). As opções `--package`, `--regex` e `--require` são mutuamente exclusivas.

`-f regex` ou `-filter regex` Filtra dependências que correspondem ao padrão fornecido. Se fornecido várias vezes, o último será selecionado.

`-filter:package` Filtra dependências dentro do mesmo pacote. Este é o padrão.

`-filter:archive` Filtra dependências dentro do mesmo arquivo.

`-filter:module` Filtra dependências dentro do mesmo módulo.

`-filter:none` Sem filtragem `-filter:package` e `-filter:archive`. A filtragem especificada via opção `-filter` ainda se aplica.

 

## Opções para Filtrar Classes a Serem Analisadas

`-include regex` Restringe a análise às classes que correspondem ao padrão. Esta opção filtra a lista de classes a serem analisadas. Pode ser usada em conjunto com `-p` e `-e`, que aplicam o padrão às dependências.

`-P` ou `-profile` Mostra o `profile` que contém um pacote.

`-R` ou `-recursive` Percorre recursivamente todas as `run-time dependencies`. A opção `-R` implica `-filter:none`. Se as opções `-p`, `-e` ou `-f` forem especificadas, apenas as dependências correspondentes são analisadas.

`-I` ou `-inverse` Analisa as dependências de acordo com outras opções fornecidas e então encontra todos os `artifacts` que direta e indiretamente dependem dos `matching nodes`. Isso é equivalente ao `inverse` da `compile-time view analysis` e ao `print dependency summary`. Esta opção deve ser usada com as opções `--require`, `--package` ou `--regex`.

`--compile-time` Analisa a `compile-time view` de `transitive dependencies`, como a `compile-time view` da opção `-R`. Analisa as dependências de acordo com outras opções especificadas. Se uma dependência for encontrada em um diretório, um arquivo JAR ou um módulo, todas as classes nesse arquivo contendo são analisadas.

 

## Exemplo de Análise de Dependências

O exemplo a seguir demonstra a análise das dependências do arquivo `Notepad.jar`.

**Linux e macOS:**

**Windows:**

Usando a Opção --inverse

## Mais Aprendizado

### Neste tutorial

Apresentando o jdeps Sinopse Descrição Opções Opções de Análise de Dependência de Módulos Opções para Filtrar Dependências Opções para Filtrar Classes a Serem Analisadas Exemplo de Análise de Dependências Mais Aprendizado

 

Última atualização: 14 de setembro de 2021

 

**Anterior na Série**

[Jmod - Crie arquivos JMOD](<#/doc/tutorials/jvm/tools/core/jmod>)

➜

**Tutorial Atual**

Jdeps - Analise as Dependências das suas Classes Java

➜

**Próximo na Série**

[Jdeprscan - Scanner de Elementos de API Depreciados](<#/doc/tutorials/jvm/tools/core/jdeprscan>)

**Anterior na Série:** [Jmod - Crie arquivos JMOD](<#/doc/tutorials/jvm/tools/core/jmod>)

**Próximo na Série:** [Jdeprscan - Scanner de Elementos de API Depreciados](<#/doc/tutorials/jvm/tools/core/jdeprscan>)

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas Essenciais do JDK ](<#/doc/tutorials/jvm/tools/core>) > Jdeps - Analise as Dependências das suas Classes Java