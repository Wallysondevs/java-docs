# O Comando jmod

## Nome

jmod - cria arquivos JMOD e lista o conteúdo de arquivos JMOD existentes

## Sinopse

`jmod` (`create`|`extract`|`list`|`describe`|`hash`) [_options_] _jmod-file_

Inclui o seguinte:

**Modos de operação principais**

`create`
     Cria um novo arquivo JMOD.
`extract`
     Extrai todos os arquivos do arquivo JMOD.
`list`
     Imprime os nomes de todas as entradas.
`describe`
     Imprime os detalhes do módulo.
`hash`
     Determina módulos folha e registra os hashes das dependências que os exigem direta e indiretamente.

**Opções**

_options_
     Consulte Opções para jmod.

**Obrigatório**

_jmod-file_
     Especifica o nome do arquivo JMOD a ser criado ou do qual recuperar informações.

## Descrição

**Nota:** Para a maioria das tarefas de desenvolvimento, incluindo a implantação de módulos no module path ou a publicação em um repositório Maven, continue a empacotar módulos em arquivos JAR modulares. A ferramenta `jmod` é destinada a módulos que possuem bibliotecas nativas ou outros arquivos de configuração, ou para módulos que você pretende vincular, com a ferramenta [jlink](<#/doc/guides/tools/jlink>), a uma imagem de tempo de execução.

O formato de arquivo JMOD permite agregar arquivos que não sejam arquivos `.class`, metadados e recursos. Este formato é transportável, mas não executável, o que significa que você pode usá-lo durante o tempo de compilação ou tempo de vinculação, mas não em tempo de execução.

Muitas opções do `jmod` envolvem a especificação de um path cujos conteúdos são copiados para os arquivos JMOD resultantes. Essas opções copiam todo o conteúdo do path especificado, incluindo subdiretórios e seus conteúdos, mas excluem arquivos cujos nomes correspondem ao padrão especificado pela opção `--exclude`.

Com a opção `--hash-modules` ou o comando `jmod hash`, você pode, no descritor de cada módulo, registrar hashes do conteúdo dos módulos que têm permissão para depender dele, assim "amarrando" esses módulos. Isso permite que um pacote seja exportado para um ou mais módulos especificamente nomeados e para nenhum outro através de exports qualificados. O tempo de execução verifica se o hash registrado de um módulo corresponde ao resolvido em tempo de execução; caso contrário, o tempo de execução retorna um erro.

## Opções para jmod

`--class-path` _path_
     Especifica o local dos arquivos JAR da aplicação ou de um diretório contendo classes a serem copiadas para o arquivo JMOD resultante.
`--cmds` _path_
     Especifica o local dos comandos nativos a serem copiados para o arquivo JMOD resultante.
`--compress` _compress_
     Especifica a compressão a ser usada na criação do arquivo JMOD. Os valores aceitos são `zip-[0-9]`, onde `zip-0` não oferece compressão, e `zip-9` oferece a melhor compressão. O padrão é `zip-6`.
`--config` _path_
     Especifica o local dos arquivos de configuração editáveis pelo usuário a serem copiados para o arquivo JMOD resultante.
`--date` _TIMESTAMP_
     O timestamp no formato de data e hora com offset estendido ISO-8601 e fuso horário opcional, a ser usado para o timestamp das entradas, por exemplo, "2022-02-12T12:30:00-05:00".
`--dir` _path_
     Especifica o local onde `jmod` coloca os arquivos extraídos do arquivo JMOD especificado.
`--dry-run`
     Executa uma simulação (dry run) do modo hash. Ele identifica módulos folha e seus módulos requeridos sem registrar quaisquer valores de hash.
`--exclude` _pattern-list_
    

Exclui arquivos que correspondem à lista de padrões fornecida, separada por vírgulas, onde cada elemento usa uma das seguintes formas:

  * _glob-pattern_

  * `glob:`_glob-pattern_

  * `regex:`_regex-pattern_




Consulte o método [`FileSystem.getPathMatcher`](<#/>) para a sintaxe de _glob-pattern_. Consulte a classe [`Pattern`](<#/>) para a sintaxe de _regex-pattern_, que representa uma expressão regular.

`--hash-modules` _regex-pattern_
     Determina os módulos folha e registra os hashes das dependências que os exigem direta e indiretamente, com base no grafo de módulos dos módulos que correspondem ao _regex-pattern_ fornecido. Os hashes são registrados no arquivo JMOD que está sendo criado, ou em um arquivo JMOD ou JAR modular no module path especificado pelo comando `jmod hash`.
`--header-files` _path_
     Especifica o local dos arquivos de cabeçalho a serem copiados para o arquivo JMOD resultante.
`--help` ou `-h`
     Imprime uma mensagem de uso.
`--help-extra`
     Imprime ajuda para opções extras.
`--legal-notices` _path_
     Especifica o local dos avisos legais a serem copiados para o arquivo JMOD resultante.
`--libs` _path_
     Especifica o local das bibliotecas nativas a serem copiadas para o arquivo JMOD resultante.
`--main-class` _class-name_
     Especifica a classe principal a ser registrada no arquivo module-info.class.
`--man-pages` _path_
     Especifica o local das páginas de manual a serem copiadas para o arquivo JMOD resultante.
`--module-version` _module-version_
     Especifica a versão do módulo a ser registrada no arquivo module-info.class.
`--module-path` _path_ ou `-p` _path_
     Especifica o module path. Esta opção é obrigatória se você também especificar `--hash-modules`.
`--target-platform` _platform_
     Especifica a plataforma de destino.
`--version`
     Imprime informações de versão da ferramenta `jmod`.
`@`_filename_
    

Lê opções do arquivo especificado.

Um arquivo de opções é um arquivo de texto que contém as opções e valores que você normalmente inseriria em um prompt de comando. As opções podem aparecer em uma linha ou em várias linhas. Você não pode especificar variáveis de ambiente para nomes de path. Você pode comentar linhas prefixando um símbolo de hash (`#`) no início da linha.

A seguir, um exemplo de arquivo de opções para o comando `jmod`:
```
    #Wed Dec 07 00:40:19 EST 2016
    create --class-path mods/com.greetings --module-path mlib
      --cmds commands --config configfiles --header-files src/h
      --libs lib --main-class com.greetings.Main
      --man-pages man --module-version 1.0
      --os-arch "x86_x64" --os-name "macOS"
      --os-version "10.10.5" greetingsmod
```

## Opções Extras para jmod

Além das opções descritas em Opções para jmod, as seguintes são opções extras que podem ser usadas com o comando.

`--do-not-resolve-by-default`
     Excluir do conjunto raiz padrão de módulos
`--warn-if-resolved`
     Sugestão para uma ferramenta emitir um aviso se o módulo for resolvido. Um de deprecated, deprecated-for-removal, ou incubating.

## Exemplo de Criação de jmod

A seguir, um exemplo de criação de um arquivo JMOD:
```
    jmod create --class-path mods/com.greetings --cmds commands
      --config configfiles --header-files src/h --libs lib
      --main-class com.greetings.Main --man-pages man --module-version 1.0
      --os-arch "x86_x64" --os-name "macOS"
      --os-version "10.10.5" greetingsmod
```

Crie um arquivo JMOD especificando a data para as entradas como `2022 March 15 00:00:00`:
```
    jmod create --class-path build/foo/classes --date 2022-03-15T00:00:00Z
       jmods/foo1.jmod
```

## Exemplo de Hash de jmod

O exemplo a seguir demonstra o que acontece quando você tenta vincular um módulo folha (neste exemplo, `ma`) com um módulo requerido (`mb`), e o valor de hash registrado no módulo requerido não corresponde ao do módulo folha.

  1. Crie e compile os seguintes arquivos `.java`:

     * `jmodhashex/src/ma/module-info.java`
` module ma {
             requires mb;
           }
```

     * `jmodhashex/src/mb/module-info.java`
` module mb {
           }
```

     * `jmodhashex2/src/ma/module-info.java`
` module ma {
             requires mb;
           }
```

     * `jmodhashex2/src/mb/module-info.java`
` module mb {
           }
```

  2. Crie um arquivo JMOD para cada módulo. Crie os diretórios `jmodhashex/jmods` e `jmodhashex2/jmods`, e então execute os seguintes comandos do diretório `jmodhashex`, e depois do diretório `jmodhashex2`:

     * `jmod create --class-path mods/ma jmods/ma.jmod`

     * `jmod create --class-path mods/mb jmods/mb.jmod`

  3. Opcionalmente, visualize o comando `jmod hash`. Execute o seguinte comando do diretório `jmodhashex`:

`jmod hash --dry-run -module-path jmods --hash-modules .*`

O comando imprime o seguinte:
` Dry run:
         mb
           hashes ma SHA-256 07667d5032004b37b42ec2bb81b46df380cf29e66962a16481ace2e71e74073a
```

Isso indica que o comando `jmod hash` (sem a opção `--dry-run`) registrará o valor de hash do módulo folha `ma` no módulo `mb`.

  4. Registre os valores de hash nos arquivos JMOD contidos no diretório `jmodhashex`. Execute o seguinte comando do diretório `jmodhashex`:

> `jmod hash --module-path jmods --hash-modules .*`

O comando imprime o seguinte:

> `Hashes are recorded in module mb`

  5. Imprima informações sobre cada arquivo JMOD contido no diretório `jmodhashex`. Execute os comandos destacados do diretório `jmodhashex`:
` jmod describe jmods/ma.jmod
         
         ma
           requires mandated java.base
           requires mb
         
         jmod describe jmods/mb.jmod
         
         mb
           requires mandated java.base
           hashes ma SHA-256 07667d5032004b37b42ec2bb81b46df380cf29e66962a16481ace2e71e74073a
```

  6. Tente criar uma imagem de tempo de execução que contenha o módulo `ma` do diretório `jmodhashex2`, mas o módulo `mb` do diretório `jmodhashex`. Execute o seguinte comando do diretório `jmodhashex2`:

     * **Linux e macOS:**

> `jlink --module-path $JAVA_HOME/jmods:jmods/ma.jmod:../jmodhashex/jmods/mb.jmod --add-modules ma --output ma-app`

     * **Windows:**

> `jlink --module-path %JAVA_HOME%/jmods;jmods/ma.jmod;../jmodhashex/jmods/mb.jmod --add-modules ma --output ma-app`

O comando imprime uma mensagem de erro semelhante à seguinte:
` Error: Hash of ma (a2d77889b0cb067df02a3abc39b01ac1151966157a68dc4241562c60499150d2) differs to
    expected hash (07667d5032004b37b42ec2bb81b46df380cf29e66962a16481ace2e71e74073a) recorded in mb
```