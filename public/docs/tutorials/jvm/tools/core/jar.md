# Jar - a Ferramenta de Arquivamento

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas Principais do JDK ](<#/doc/tutorials/jvm/tools/core>) > Jar - a Ferramenta de Arquivamento

**Anterior na Série**

[Uso Avançado do JShell](<#/doc/tutorials/jvm/tools/core/jshell-advanced>)

➜

**Tutorial Atual**

Jar - a Ferramenta de Arquivamento

➜

**Próximo na Série**

[Jlink - Montar e Otimizar um Conjunto de Módulos](<#/doc/tutorials/jvm/tools/core/jlink>)

**Anterior na Série:** [Uso Avançado do JShell](<#/doc/tutorials/jvm/tools/core/jshell-advanced>)

**Próximo na Série:** [Jlink - Montar e Otimizar um Conjunto de Módulos](<#/doc/tutorials/jvm/tools/core/jlink>)

# Jar - a Ferramenta de Arquivamento

## Apresentando o jar

[jar](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jar.html>) - cria um arquivo para classes e recursos, e pode manipular ou restaurar classes ou recursos individuais de um arquivo. O comando jar é uma ferramenta de arquivamento e compressão de uso geral, baseada nos formatos de compressão ZIP e ZLIB.

## Sinopse

## Descrição

O comando jar é uma ferramenta de arquivamento e compressão de uso geral, baseada nos formatos de compressão ZIP e ZLIB. Inicialmente, o comando jar foi projetado para empacotar applets Java (não suportados desde o JDK 11) ou aplicações; no entanto, a partir do JDK 9, os usuários podem usar o comando jar para criar JARs modulares. Para transporte e implantação, geralmente é mais conveniente empacotar módulos como JARs modulares.

A sintaxe para o comando `jar` se assemelha à sintaxe para o comando tar. Ele possui vários modos de operação principais, definidos por um dos argumentos de operação obrigatórios. Outros argumentos são opções que modificam o comportamento da operação ou são necessários para realizar a operação.

Quando módulos ou os componentes de uma aplicação (arquivos, imagens e sons) são combinados em um único arquivo, eles podem ser baixados por um agente Java (como um navegador) em uma única transação HTTP, em vez de exigir uma nova conexão para cada parte. Isso melhora drasticamente os tempos de download. O comando jar também compacta arquivos, o que melhora ainda mais o tempo de download. O comando jar também permite que entradas individuais em um arquivo sejam assinadas para que sua origem possa ser autenticada. Um arquivo JAR pode ser usado como uma entrada de classpath, esteja ele compactado ou não.

Um arquivo se torna um JAR modular quando você inclui um descritor de módulo, `module-info.class`, na raiz dos diretórios fornecidos ou na raiz do arquivo JAR. As seguintes operações descritas em Modificadores de Operação Válidos Apenas nos Modos de Criação e Atualização são válidas apenas ao criar ou atualizar um JAR modular ou atualizar um JAR não modular existente:

  * `--module-version`

  * `--hash-modules`

  * `--module-path`

## Modos de Operação Principais

Ao usar o comando jar, você deve especificar a operação a ser executada. Você especifica o modo de operação para o comando jar incluindo os argumentos de operação apropriados descritos nesta seção. Você pode misturar um argumento de operação com outras opções de uma letra. Geralmente, o argumento de operação é o primeiro argumento especificado na linha de comando.

`-c` ou `--create` Cria o arquivo.

`-i=FILE` ou `--generate-index=FILE` Gera informações de índice para o arquivo JAR especificado.

`-t` ou `--list` Lista o sumário do arquivo.

`-u` ou `--update` Atualiza um arquivo JAR existente.

`-x` ou `--extract` Extrai os arquivos nomeados (ou todos) do arquivo.

`-d` ou `--describe-module` Imprime o descritor do módulo ou o nome do módulo automático.

## Modificadores de Operação Válidos em Qualquer Modo

Você pode usar as seguintes opções para personalizar as ações de qualquer modo de operação incluído no comando jar.

`-C directory` Altera o diretório especificado e inclui os `files` especificados no final da linha de comando:

`-f=FILE` ou `--file=FILE` Especifica o nome do arquivo de arquivamento.

`--release VERSION` Cria um arquivo JAR multi-release. Coloca todos os arquivos especificados após a opção em um diretório versionado do arquivo JAR chamado `META-INF/versions/VERSION/`, onde VERSION deve ser um inteiro positivo cujo valor seja 9 ou maior.

Em tempo de execução, onde mais de uma versão de uma classe existe no JAR, o JDK usará a primeira que encontrar, procurando inicialmente na árvore de diretórios cujo número VERSION corresponda ao número da versão principal do JDK. Em seguida, procurará em diretórios com números `VERSION` sucessivamente menores e, finalmente, na raiz do JAR.

`-v` ou `--verbose` Envia ou imprime saída detalhada para a saída padrão.

## Modificadores de Operação Válidos Apenas nos Modos de Criação e Atualização

Você pode usar as seguintes opções para personalizar as ações dos modos de operação principais de criação e atualização:

`-e=CLASSNAME `ou `--main-class=CLASSNAME` Especifica o ponto de entrada da aplicação para aplicações autônomas empacotadas em um arquivo JAR modular ou modular executável.

`-m=FILE` ou `--manifest=FILE` Inclui as informações do manifesto do arquivo de manifesto fornecido.

`-M` ou `--no-manifest` Não cria um arquivo de manifesto para as entradas.

`--module-version=VERSION` Especifica a versão do módulo, ao criar ou atualizar um arquivo JAR modular, ou atualizar um arquivo JAR não modular.

`--hash-modules=PATTERN` Calcula e registra os hashes dos módulos correspondentes ao padrão fornecido e que dependem direta ou indiretamente de um arquivo JAR modular sendo criado ou de um arquivo JAR não modular sendo atualizado.

`-p` path ou -`-module-path path` Especifica o local da dependência do módulo para gerar o hash.

`@file` Lê opções do jar e nomes de arquivos de um arquivo de texto.

## Modificadores de Operação Válidos Apenas nos Modos de Criação, Atualização e Geração de Índice

Você pode usar as seguintes opções para personalizar as ações dos modos de operação principais de criação (`-c` ou `--create`), atualização (`-u` ou `--update`) e geração de índice (`-i` ou `--generate-index=FILE`):

`-0` ou `--no-compress` Armazena sem usar compressão ZIP.

## Outras Opções

As seguintes opções são reconhecidas pelo comando jar e não são usadas com modos de operação:

`-h` ou `--help[:compat]` Exibe a ajuda da linha de comando para o comando jar ou, opcionalmente, a ajuda de compatibilidade.

`--help-extra` Exibe ajuda sobre opções extras.

`--version` Imprime a versão do programa.

## Exemplos de Sintaxe do Comando jar

Exemplos de Sintaxe do Comando jar

Cria um arquivo, `classes.jar`, que contém dois arquivos de classe, `Foo.class` e `Bar.class`.

```bash
jar -cf classes.jar Foo.class Bar.class
```

Cria um arquivo, `classes.jar`, usando um manifesto existente, `mymanifest`, que contém todos os arquivos no diretório foo/.

```bash
jar -cfm classes.jar mymanifest -C foo/ .
```

Cria um arquivo JAR modular, foo.jar, onde o descritor do módulo está localizado em classes/module-info.class.

```bash
jar -c -f foo.jar --module-version 1.0 -C classes/ .
```

Atualiza um JAR não modular existente, foo.jar, para um arquivo JAR modular.

```bash
jar -u -f foo.jar --module-version 1.0 -C classes/module-info.class .
```

Cria um JAR versionado ou multi-release, foo.jar, que coloca os arquivos no diretório classes na raiz do JAR, e os arquivos no diretório `classes-16` no diretório `META-INF/versions/16` do JAR. Neste exemplo, o diretório `classes/com/foo` contém duas classes, `com.foo.Hello` (a classe de ponto de entrada) e `com.foo.NameProvider`, ambas compiladas para JDK 8. O diretório `classes-16/com/foo` contém uma versão diferente da classe `com.foo.NameProvider`, esta contendo código específico do JDK 16 e compilada para JDK 16.

Dada esta configuração, crie um arquivo JAR multi-release foo.jar executando o seguinte comando a partir do diretório que contém os diretórios classes e `classes-16`.

```bash
jar -c -f foo.jar --main-class com.foo.Hello --release 16 -C classes-16 . -C classes .
```

O arquivo JAR foo.jar agora contém:

```
META-INF/
META-INF/MANIFEST.MF
META-INF/versions/
META-INF/versions/16/
META-INF/versions/16/com/
META-INF/versions/16/com/foo/
META-INF/versions/16/com/foo/NameProvider.class
com/
com/foo/
com/foo/Hello.class
com/foo/NameProvider.class
```

Além de outras informações, o arquivo `META-INF/MANIFEST.MF` conterá as seguintes linhas para indicar que este é um arquivo JAR multi-release com um ponto de entrada de `com.foo.Hello`.

```
Manifest-Version: 1.0
Created-By: 16.0.1 (Oracle Corporation)
Main-Class: com.foo.Hello
Multi-Release: true
```

Assumindo que a classe com.foo.Hello chama um método na classe `com.foo.NameProvider`, executar o programa usando JDK 16 garantirá que a classe com.foo.NameProvider seja a que está em `META-INF/versions/16/com/foo/`. Executar o programa usando JDK 8 garantirá que a classe `com.foo.NameProvider` seja a que está na raiz do JAR, em `com/foo`.

Cria um arquivo, `my.jar`, lendo opções e listas de arquivos de classe do arquivo classes.list.

```bash
jar @classes.list
```

### Neste tutorial

Apresentando o jar
Sinopse
Descrição
Modos de Operação Principais
Modificadores de Operação Válidos em Qualquer Modo
Modificadores de Operação Válidos Apenas nos Modos de Criação e Atualização
Modificadores de Operação Válidos Apenas nos Modos de Criação, Atualização e Geração de Índice
Outras Opções
Exemplos de Sintaxe do Comando jar

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Uso Avançado do JShell](<#/doc/tutorials/jvm/tools/core/jshell-advanced>)

➜

**Tutorial Atual**

Jar - a Ferramenta de Arquivamento

➜

**Próximo na Série**

[Jlink - Montar e Otimizar um Conjunto de Módulos](<#/doc/tutorials/jvm/tools/core/jlink>)

**Anterior na Série:** [Uso Avançado do JShell](<#/doc/tutorials/jvm/tools/core/jshell-advanced>)

**Próximo na Série:** [Jlink - Montar e Otimizar um Conjunto de Módulos](<#/doc/tutorials/jvm/tools/core/jlink>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas Principais do JDK ](<#/doc/tutorials/jvm/tools/core>) > Jar - a Ferramenta de Arquivamento