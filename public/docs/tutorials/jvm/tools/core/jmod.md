# Jmod - Criar arquivos JMOD

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas Principais do JDK ](<#/doc/tutorials/jvm/tools/core>) > Jmod - Criar arquivos JMOD

**Anterior na Série**

[Jlink - Montar e Otimizar um Conjunto de Módulos](<#/doc/tutorials/jvm/tools/core/jlink>)

➜

**Tutorial Atual**

Jmod - Criar arquivos JMOD

➜

**Próximo na Série**

[Jdeps - Analisar as Dependências das suas Classes Java](<#/doc/tutorials/jvm/tools/core/jdeps>)

**Anterior na Série:** [Jlink - Montar e Otimizar um Conjunto de Módulos](<#/doc/tutorials/jvm/tools/core/jlink>)

**Próximo na Série:** [Jdeps - Analisar as Dependências das suas Classes Java](<#/doc/tutorials/jvm/tools/core/jdeps>)

# Jmod - Criar arquivos JMOD

## Apresentando jmod

[jmod](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jmod.html>) - cria arquivos `JMOD` e lista o conteúdo de arquivos `JMOD` existentes

## Sinopse

Inclui o seguinte:

Modos de operação principais

`create` Cria um novo arquivo de arquivo JMOD.

`extract` Extrai todos os arquivos do arquivo JMOD.

`list` Imprime os nomes de todas as entradas.

`describe` Imprime os detalhes do módulo.

`hash` Determina módulos folha e registra os hashes das dependências que os exigem direta e indiretamente.

Opções

`options` Veja Opções para jmod.

Obrigatório

`jmod-file` Especifica o nome do arquivo `JMOD` a ser criado ou do qual as informações serão recuperadas.

## Descrição

O formato de arquivo `JMOD` permite agregar arquivos que não sejam arquivos `.class`, metadados e recursos. Este formato é transportável, mas não executável, o que significa que você pode usá-lo durante o tempo de compilação ou tempo de linkagem, mas não em tempo de execução.

Muitas opções do `jmod` envolvem a especificação de um caminho cujo conteúdo é copiado para os arquivos `JMOD` resultantes. Essas opções copiam todo o conteúdo do caminho especificado, incluindo subdiretórios e seus conteúdos, mas excluem arquivos cujos nomes correspondem ao padrão especificado pela opção `--exclude`.

Com a opção `--hash-modules` ou o comando `jmod hash`, você pode, no descritor de cada módulo, registrar hashes do conteúdo dos módulos que têm permissão para depender dele, "amarrando" assim esses módulos. Isso permite que um pacote seja exportado para um ou mais módulos com nomes específicos e para nenhum outro através de exportações qualificadas.

O tempo de execução verifica se o hash registrado de um módulo corresponde ao resolvido em tempo de execução; caso contrário, o tempo de execução retorna um erro.

## Opções

`--class-path path` Especifica o local dos arquivos JAR da aplicação ou de um diretório contendo classes a serem copiadas para o arquivo JMOD resultante.

`--cmds path` Especifica o local dos comandos nativos a serem copiados para o arquivo JMOD resultante.

`--config path` Especifica o local dos arquivos de configuração editáveis pelo usuário a serem copiados para o arquivo JMOD resultante.

`–-dir path` Especifica o local onde o jmod coloca os arquivos extraídos do arquivo JMOD especificado.

`--dry-run` Executa uma simulação (dry run) do modo hash. Ele identifica módulos folha e seus módulos necessários sem registrar quaisquer valores de hash.

`--exclude pattern–list` Exclui arquivos que correspondem à lista de padrões separada por vírgulas fornecida, cada elemento usando uma das seguintes formas:

`--hash-modules regex-pattern` Determina os módulos folha e registra os hashes das dependências que os exigem direta e indiretamente, com base no grafo de módulos dos módulos que correspondem ao regex-pattern fornecido. Os hashes são registrados no arquivo de arquivo JMOD que está sendo criado, ou em um arquivo JMOD ou JAR modular no caminho do módulo especificado pelo comando jmod hash.

`--header-files path` Especifica o local dos arquivos de cabeçalho a serem copiados para o arquivo JMOD resultante.

`--help` ou `-h` Imprime uma mensagem de uso.

`--help-extra` Imprime ajuda para opções extras.

`–-legal-notices path` Especifica o local dos avisos legais a serem copiados para o arquivo JMOD resultante.

`--libs path` Especifica o local das bibliotecas nativas a serem copiadas para o arquivo JMOD resultante.

`--main-class class-name` Especifica a classe principal a ser registrada no arquivo module-info.class.

`--man-pages path` Especifica o local das páginas man a serem copiadas para o arquivo JMOD resultante.

`--module-version module-version` Especifica a versão do módulo a ser registrada no arquivo module-info.class.

`--module-path path` ou `-p path` Especifica o caminho do módulo. Esta opção é obrigatória se você também especificar --hash-modules.

`--target-platform platform` Especifica a plataforma de destino.

`--version` Imprime as informações de versão da ferramenta jmod.

`@filename` Lê as opções do arquivo especificado.

Um arquivo de opções é um arquivo de texto que contém as opções e valores que você normalmente inseriria em um prompt de comando. As opções podem aparecer em uma linha ou em várias linhas. Você não pode especificar variáveis de ambiente para nomes de caminho. Você pode comentar linhas prefixando um símbolo de hash (#) no início da linha.

O seguinte é um exemplo de um arquivo de opções para o comando `jmod`:

## Opções Extras

Além das opções descritas em Opções para `jmod`, as seguintes são opções extras que podem ser usadas com o comando.

`--do-not-resolve-by-default` Excluir do conjunto raiz padrão de módulos

`--warn-if-resolved` Dica para uma ferramenta emitir um aviso se o módulo for resolvido. Uma das opções deprecated, deprecated-for-removal ou incubating.

## Exemplos

O seguinte é um exemplo de criação de um arquivo `JMOD`:

O exemplo a seguir demonstra o que acontece quando você tenta vincular um módulo folha (neste exemplo, ma) com um módulo requerido (mb), e o valor de hash registrado no módulo requerido não corresponde ao do módulo folha.

1.  Crie e compile os seguintes arquivos `.java`:

    *   jmodhashex/src/ma/module-info.java

    *   jmodhashex/src/mb/module-info.java

    *   jmodhashex2/src/ma/module-info.java

    *   jmodhashex2/src/mb/module-info.java

2.  Crie um arquivo `JMOD` para cada módulo. Crie os diretórios `jmodhashex/jmods` e `jmodhashex2/jmods`, e então execute os seguintes comandos do diretório `jmodhashex`, e depois do diretório `jmodhashex2`:

    ```bash
    javac -d jmodhashex/mods --module-version 1.0 jmodhashex/src/ma/module-info.java jmodhashex/src/ma/com/greetings/Main.java
    javac -d jmodhashex/mods --module-version 1.0 jmodhashex/src/mb/module-info.java jmodhashex/src/mb/com/greetings/Hi.java
    jmod create --class-path jmodhashex/mods/ma --module-version 1.0 --main-class com.greetings.Main jmodhashex/jmods/ma.jmod
    jmod create --class-path jmodhashex/mods/mb --module-version 1.0 jmodhashex/jmods/mb.jmod

    javac -d jmodhashex2/mods --module-version 2.0 jmodhashex2/src/ma/module-info.java jmodhashex2/src/ma/com/greetings/Main.java
    javac -d jmodhashex2/mods --module-version 2.0 jmodhashex2/src/mb/module-info.java jmodhashex2/src/mb/com/greetings/Hi.java
    jmod create --class-path jmodhashex2/mods/ma --module-version 2.0 --main-class com.greetings.Main jmodhashex2/jmods/ma.jmod
    jmod create --class-path jmodhashex2/mods/mb --module-version 2.0 jmodhashex2/jmods/mb.jmod
    ```

3.  Opcionalmente, visualize o comando `jmod hash`. Execute o seguinte comando do diretório `jmodhashex`:

    ```bash
    jmod hash --dry-run --module-path jmods ma
    ```

    O comando imprime o seguinte:

    ```
    ma
    mb
    ```

    Isso indica que o comando `jmod hash` (sem a opção `--dry-run`) registrará o valor de hash do módulo folha `ma` no módulo `mb`.

4.  Registre os valores de hash nos arquivos de arquivo `JMOD` contidos no diretório `jmodhashex`. Execute o seguinte comando do diretório `jmodhashex`:

    ```bash
    jmod hash --module-path jmods ma
    ```

    O comando imprime o seguinte:

    ```
    ma
    mb
    ```

5.  Imprima informações sobre cada arquivo `JMOD` contido no diretório `jmodhashex`. Execute os comandos destacados do diretório `jmodhashex`:

    ```bash
    jmod describe jmods/ma.jmod
    ```

    ```
    ma@1.0
    requires mb
    main-class com.greetings.Main
    ```

    ```bash
    jmod describe jmods/mb.jmod
    ```

    ```
    mb@1.0
    hashes ma SHA-256 0000000000000000000000000000000000000000000000000000000000000000
    ```

6.  Tente criar uma imagem de tempo de execução que contenha o módulo `ma` do diretório `jmodhashex2`, mas o módulo `mb` do diretório `jmodhashex`. Execute o seguinte comando do diretório `jmodhashex2`:

    **Linux e macOS:**

    ```bash
    jlink --module-path jmods:../jmodhashex/jmods --add-modules ma --output jre
    ```

    **Windows:**

    ```bash
    jlink --module-path jmods;..\jmodhashex\jmods --add-modules ma --output jre
    ```

    O comando imprime uma mensagem de erro semelhante à seguinte:

    ```
    Error: Hash of ma (a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z.0.1.2.3.4.5) differs from expected hash (A.B.C.D.E.F.G.H.I.J.K.L.M.N.O.P.Q.R.S.T.U.V.W.X.Y.Z.0.1.2.3.4.5) recorded in mb
    ```

### Neste tutorial

Apresentando jmod Sinopse Descrição Opções Opções Extras Exemplos

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Jlink - Montar e Otimizar um Conjunto de Módulos](<#/doc/tutorials/jvm/tools/core/jlink>)

➜

**Tutorial Atual**

Jmod - Criar arquivos JMOD

➜

**Próximo na Série**

[Jdeps - Analisar as Dependências das suas Classes Java](<#/doc/tutorials/jvm/tools/core/jdeps>)

**Anterior na Série:** [Jlink - Montar e Otimizar um Conjunto de Módulos](<#/doc/tutorials/jvm/tools/core/jlink>)

**Próximo na Série:** [Jdeps - Analisar as Dependências das suas Classes Java](<#/doc/tutorials/jvm/tools/core/jdeps>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas Principais do JDK ](<#/doc/tutorials/jvm/tools/core>) > Jmod - Criar arquivos JMOD