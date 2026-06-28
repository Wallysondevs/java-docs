# O Comando jar

## Nome

jar - cria um arquivo para classes e recursos, e manipula ou restaura classes ou recursos individuais de um arquivo

## Sinopse

`jar` [_OPTION_ ...] [ [`--release` _VERSION_] [`-C` _dir_] _files_] ...

## Descrição

O comando `jar` é uma ferramenta de arquivamento e compressão de propósito geral, baseada nos formatos de compressão ZIP e ZLIB. Inicialmente, o comando `jar` foi projetado para empacotar applets Java (não suportados desde o JDK 11) ou aplicações; no entanto, a partir do JDK 9, os usuários podem usar o comando `jar` para criar JARs modulares. Para transporte e implantação, geralmente é mais conveniente empacotar módulos como JARs modulares.

A sintaxe para o comando `jar` se assemelha à sintaxe para o comando `tar`. Ele possui vários modos de operação principais, definidos por um dos argumentos de operação obrigatórios. Outros argumentos são opções que modificam o comportamento da operação ou são necessários para realizar a operação.

Quando módulos ou os componentes de uma aplicação (arquivos, imagens e sons) são combinados em um único arquivo, eles podem ser baixados por um agente Java (como um navegador) em uma única transação HTTP, em vez de exigir uma nova conexão para cada parte. Isso melhora drasticamente os tempos de download. O comando `jar` também compacta arquivos, o que melhora ainda mais o tempo de download. O comando `jar` também permite que entradas individuais em um arquivo sejam assinadas para que sua origem possa ser autenticada. Um arquivo JAR pode ser usado como uma entrada de classpath, esteja ele compactado ou não.

Um arquivo se torna um JAR modular quando você inclui um descritor de módulo, `module-info.class`, na raiz dos diretórios fornecidos ou na raiz do arquivo `.jar`. As seguintes operações descritas em Modificadores de Operação Válidos Apenas nos Modos de Criação e Atualização são válidas apenas ao criar ou atualizar um JAR modular ou atualizar um JAR não modular existente:

  * `--module-version`

  * `--hash-modules`

  * `--module-path`




**Nota:**

Todos os argumentos obrigatórios ou opcionais para opções longas também são obrigatórios ou opcionais para quaisquer opções curtas correspondentes.

## Modos de Operação Principais

Ao usar o comando `jar`, você deve especificar a operação a ser executada. Você especifica o modo de operação para o comando `jar` incluindo os argumentos de operação apropriados descritos nesta seção. Você pode misturar um argumento de operação com outras opções de uma letra. Geralmente, o argumento de operação é o primeiro argumento especificado na linha de comando.

`-c` ou `--create`
     Cria o arquivo.
`-i` _FILE_ ou `--generate-index=`_FILE_
     Gera informações de índice para o arquivo JAR especificado. Esta opção está obsoleta e pode ser removida em uma versão futura.
`-t` ou `--list`
     Lista o índice do arquivo.
`-u` ou `--update`
     Atualiza um arquivo JAR existente.
`-x` ou `--extract`
     Extrai os arquivos nomeados (ou todos) do arquivo. Se um arquivo com o mesmo nome aparecer mais de uma vez no arquivo, cada cópia será extraída, com cópias posteriores sobrescrevendo (substituindo) cópias anteriores, a menos que `-k` seja especificado.
`-d` ou `--describe-module`
     Imprime o descritor do módulo ou o nome do módulo automático.
`--validate`
     Valida o conteúdo do arquivo JAR. Consulte a seção `Integridade de um Arquivo JAR` abaixo para mais detalhes.

## Modificadores de Operação Válidos em Qualquer Modo

Você pode usar as seguintes opções para personalizar as ações de qualquer modo de operação incluído no comando `jar`.

`-C` _DIR_
    

Quando usado com o modo de operação de criação, altera o diretório especificado e inclui os _files_ especificados no final da linha de comando.

`jar` [_OPTION_ ...] [ [`--release` _VERSION_] [`-C` _dir_] _files_]

Quando usado com o modo de operação de extração, especifica o diretório de destino onde o arquivo JAR será extraído. Ao contrário do modo de operação de criação, esta opção pode ser especificada apenas uma vez com o modo de operação de extração.

`-f` _FILE_ ou `--file=`_FILE_
     Especifica o nome do arquivo do arquivo.
`--release` _VERSION_
    

Cria um arquivo JAR multirelease. Coloca todos os arquivos especificados após a opção em um diretório versionado do arquivo JAR chamado `META-INF/versions/`_VERSION_`/`, onde _VERSION_ deve ser um inteiro positivo cujo valor seja 9 ou maior.

Em tempo de execução, onde mais de uma versão de uma classe existe no JAR, o JDK usará a primeira que encontrar, pesquisando inicialmente na árvore de diretórios cujo número _VERSION_ corresponde ao número da versão principal do JDK. Em seguida, procurará em diretórios com números _VERSION_ sucessivamente menores e, finalmente, na raiz do JAR.

`-v` ou `--verbose`
     Envia ou imprime saída detalhada para a saída padrão.

## Modificadores de Operação Válidos Apenas nos Modos de Criação e Atualização

Você pode usar as seguintes opções para personalizar as ações dos modos de operação principais de criação e atualização:

`-e` _CLASSNAME_ ou `--main-class=`_CLASSNAME_
     Especifica o ponto de entrada da aplicação para aplicações standalone empacotadas em um arquivo JAR modular ou modular executável.
`-m` _FILE_ ou `--manifest=`_FILE_
     Inclui as informações do manifest do arquivo manifest fornecido.
`-M` ou `--no-manifest`
     Não cria um arquivo manifest para as entradas.
`--module-version=`_VERSION_
     Especifica a versão do módulo, ao criar ou atualizar um arquivo JAR modular, ou atualizar um arquivo JAR não modular.
`--hash-modules=`_PATTERN_
     Calcula e registra os hashes dos módulos correspondentes ao padrão fornecido e que dependem direta ou indiretamente de um arquivo JAR modular sendo criado ou de um arquivo JAR não modular sendo atualizado.
`-p` ou `--module-path`
     Especifica o local da dependência do módulo para gerar o hash.
`@`_file_
     Lê opções `jar` e nomes de arquivos de um arquivo de texto como se tivessem sido fornecidos na linha de comando

## Modificadores de Operação Válidos Apenas nos Modos de Criação, Atualização e Geração de Índice

Você pode usar as seguintes opções para personalizar as ações dos modos de operação principais de criação (`-c` ou `--create`), atualização (`-u` ou `--update`) e geração de índice (`-i` ou `--generate-index=`_FILE_):

`-0` ou `--no-compress`
     Armazena sem usar compressão ZIP.
`--date=`_TIMESTAMP_
     O timestamp no formato ISO-8601 de data e hora estendida com offset e fuso horário opcional, para usar como timestamp das entradas, por exemplo, "2022-02-12T12:30:00-05:00".

## Modificadores de Operação Válidos Apenas no Modo de Extração

`--dir` _DIR_
     Diretório para onde o arquivo JAR será extraído.
`-k` ou `--keep-old-files`
     Não sobrescreve arquivos existentes. Se uma entrada de arquivo Jar com o mesmo nome existir no diretório de destino, o arquivo existente não será sobrescrito. Como resultado, se um arquivo aparecer mais de uma vez em um arquivo, cópias posteriores não sobrescreverão cópias anteriores. Observe também que alguns sistemas de arquivos podem ser case insensitive.

## Outras Opções

As seguintes opções são reconhecidas pelo comando `jar` e não são usadas com modos de operação:

`-h` ou `--help`[`:compat`]
     Exibe a ajuda da linha de comando para o comando `jar` ou, opcionalmente, a ajuda de compatibilidade.
`--help-extra`
     Exibe ajuda sobre opções extras.
`--version`
     Imprime a versão do programa.

## Integridade de um Arquivo JAR

Como um arquivo JAR é baseado no formato ZIP, é possível criar um arquivo JAR usando outras ferramentas além do comando `jar`. A opção `--validate` pode ser usada para realizar as seguintes verificações de integridade em um arquivo JAR:

  * Que não há nomes de arquivos de entrada Zip duplicados
  * Verifica se o nome do arquivo de entrada Zip:
    * não é um caminho absoluto
    * o nome do arquivo não é '.' ou '..'
    * não contém uma barra invertida, '\'
    * não contém uma letra de unidade (drive letter)
    * o elemento do caminho não inclui '.' ou '..'
  * A API exportada por um arquivo JAR multi-release é consistente em todas as diferentes versões de release.

A ferramenta `jar` sai com status 0 se nenhum problema de integridade foi encontrado e >0 se ocorreu um erro/aviso.

Quando um problema de integridade é relatado, muitas vezes será necessário que o arquivo JAR seja recriado pela fonte original do arquivo JAR.

## Exemplos de Sintaxe do Comando jar

  * Cria um arquivo, `classes.jar`, que contém dois arquivos de classe, `Foo.class` e `Bar.class`.

> `jar --create --file classes.jar Foo.class Bar.class`

  * Cria um arquivo, `classes.jar`, que contém dois arquivos de classe, `Foo.class` e `Bar.class`, definindo a data e hora da última modificação para `2021 Jan 6 12:36:00`.

> `jar --create --date="2021-01-06T14:36:00+02:00" --file=classes.jar Foo.class Bar.class`

  * Cria um arquivo, `classes.jar`, usando um manifest existente, `mymanifest`, que contém todos os arquivos no diretório `foo/`.

> `jar --create --file classes.jar --manifest mymanifest -C foo/`

  * Cria um arquivo JAR modular, `foo.jar`, onde o descritor do módulo está localizado em `classes/module-info.class`.

> `jar --create --file foo.jar --main-class com.foo.Main --module-version 1.0 -C foo/classes resources`

  * Atualiza um JAR não modular existente, `foo.jar`, para um arquivo JAR modular.

> `jar --update --file foo.jar --main-class com.foo.Main --module-version 1.0 -C foo/module-info.class`

  * Cria um JAR versionado ou multi-release, `foo.jar`, que coloca os arquivos no diretório `classes` na raiz do JAR, e os arquivos no diretório `classes-10` no diretório `META-INF/versions/10` do JAR.

Neste exemplo, o diretório `classes/com/foo` contém duas classes, `com.foo.Hello` (a classe de ponto de entrada) e `com.foo.NameProvider`, ambas compiladas para JDK 8. O diretório `classes-10/com/foo` contém uma versão diferente da classe `com.foo.NameProvider`, esta contendo código específico do JDK 10 e compilada para JDK 10.

Dada esta configuração, crie um arquivo JAR multirelease `foo.jar` executando o seguinte comando a partir do diretório que contém os diretórios `classes` e `classes-10`.

> `jar --create --file foo.jar --main-class com.foo.Hello -C classes . --release 10 -C classes-10 .`

O arquivo JAR `foo.jar` agora contém:
` % jar -tf foo.jar
        
        META-INF/
        META-INF/MANIFEST.MF
        com/
        com/foo/
        com/foo/Hello.class
        com/foo/NameProvider.class
        META-INF/versions/10/com/
        META-INF/versions/10/com/foo/
        META-INF/versions/10/com/foo/NameProvider.class
```

Além de outras informações, o arquivo `META-INF/MANIFEST.MF` conterá as seguintes linhas para indicar que este é um arquivo JAR multirelease com um ponto de entrada de `com.foo.Hello`.
` ...
        Main-Class: com.foo.Hello
        Multi-Release: true
```

Assumindo que a classe `com.foo.Hello` chama um método na classe `com.foo.NameProvider`, executar o programa usando JDK 10 garantirá que a classe `com.foo.NameProvider` seja a que está em `META-INF/versions/10/com/foo/`. Executar o programa usando JDK 8 garantirá que a classe `com.foo.NameProvider` seja a que está na raiz do JAR, em `com/foo`.

  * Cria um arquivo, `my.jar`, lendo opções e listas de arquivos de classe do arquivo `classes.list`.

**Nota:**

Para encurtar ou simplificar o comando `jar`, você pode fornecer um arquivo de argumentos que lista os arquivos a serem incluídos no arquivo JAR e passá-lo para o comando `jar` com o sinal de arroba (`@`) como prefixo.

> `jar --create --file my.jar @classes.list`

Se uma ou mais entradas no arquivo de argumentos não puderem ser encontradas, o comando `jar` falhará sem criar o arquivo JAR.

  * Extrai o arquivo JAR `foo.jar` para o diretório `/tmp/bar/`:

> `jar -xf foo.jar -C /tmp/bar/`

Alternativamente, você também pode fazer:

> `jar --extract --file foo.jar --dir /tmp/bar/`