# O Comando javadoc

## Nome

javadoc - gera páginas HTML de documentação de API a partir de arquivos fonte Java

## Sinopse

`javadoc` [_options_] [_packagenames_] [_sourcefiles_] [`@`_files_]

_options_
     Especifica opções de linha de comando, separadas por espaços. Consulte Opções Padrão do `javadoc`, Opções Extras do `javadoc`, Opções Padrão para o Doclet Padrão e Opções Extras para o Doclet Padrão.
_packagenames_
    

Especifica nomes de pacotes que você deseja documentar, separados por espaços, por exemplo `java.lang java.lang.reflect java.awt`. Se você também quiser documentar os subpacotes, use a opção `-subpackages` para especificar os pacotes.

Por padrão, o `javadoc` procura os pacotes especificados no diretório atual e subdiretórios. Use a opção `-sourcepath` para especificar a lista de diretórios onde procurar os pacotes.

_sourcefiles_
     Especifica nomes de arquivos fonte Java que você deseja documentar, separados por espaços, por exemplo `Class.java Object.java Button.java`. Por padrão, o `javadoc` procura as classes especificadas no diretório atual. No entanto, você pode especificar o caminho completo para o arquivo de classe e usar caracteres curinga, por exemplo `/home/src/java/awt/Graphics*.java`. Você também pode especificar o caminho relativo ao diretório atual.
`@`_files_
     Especifica nomes de arquivos que contêm uma lista de opções da ferramenta `javadoc`, nomes de pacotes e nomes de arquivos fonte em qualquer ordem.

## Descrição

A ferramenta `javadoc` analisa as declarações e comentários de documentação em um conjunto de arquivos fonte Java e os processa usando um back-end plugável chamado [_doclet_](<#/>).

O [_doclet padrão_](<#/>) é o que é usado por padrão e pode produzir páginas HTML correspondentes que descrevem as classes públicas e protegidas, classes aninhadas e implicitamente declaradas (mas não classes internas anônimas), interfaces, construtores, métodos e campos. O doclet padrão interpreta o conteúdo dos comentários de documentação de acordo com a [Especificação de Comentários de Documentação JavaDoc para o Doclet Padrão](<#/>). Tags personalizadas em comentários de documentação são suportadas por meio de [taglets](<#/>).

Você pode usar a ferramenta `javadoc` e o doclet padrão para gerar a documentação da API ou a documentação de implementação para um conjunto de arquivos fonte.

Você pode executar a ferramenta `javadoc` em pacotes inteiros, arquivos fonte individuais ou ambos. Ao documentar pacotes inteiros, você pode usar a opção `-subpackages` para percorrer recursivamente um diretório e seus subdiretórios, ou para passar uma lista explícita de nomes de pacotes. Ao documentar arquivos fonte individuais, passe uma lista de nomes de arquivos fonte Java.

### Comentários de Documentação

A ferramenta `javadoc` usa o comentário de documentação, se houver, que precede imediatamente o início da declaração, seja uma anotação, modificador ou o nome que está sendo declarado. Se houver vários comentários de documentação antes da declaração, apenas o último (o mais próximo da declaração) será usado. Se houver comentários de documentação após o início da declaração, eles serão ignorados. Para verificar quaisquer comentários de documentação extras ou mal posicionados, compile seu código fonte com a opção `javac` `-Xlint`, ou mais especificamente, `-Xlint:dangling-doc-comments`. Dentro de um arquivo fonte, você pode suprimir quaisquer avisos gerados por essas opções usando `@SuppressWarnings("dangling-doc-comments")` em uma declaração envolvente adequada.

### Conformidade

O doclet padrão não valida o conteúdo dos comentários de documentação quanto à conformidade, nem tenta corrigir quaisquer erros nos comentários de documentação. Qualquer pessoa que execute o javadoc é aconselhada a estar ciente dos problemas que podem surgir ao gerar saída não conforme ou saída contendo conteúdo executável, como JavaScript. O doclet padrão fornece o recurso DocLint para ajudar os desenvolvedores a detectar problemas comuns em comentários de documentação; mas também é recomendado verificar a saída gerada com quaisquer ferramentas de conformidade e outras ferramentas de verificação apropriadas.

Para mais detalhes sobre os requisitos de conformidade para documentos HTML5, consulte [Requisitos de conformidade para autores](<https://html.spec.whatwg.org/multipage/introduction.html#conformance-requirements-for-authors>) na Especificação HTML5. Para mais detalhes sobre questões de segurança relacionadas a páginas web, consulte a página [Open Web Application Security Project (OWASP)](<https://www.owasp.org>).

## Opções

O `javadoc` suporta opções de linha de comando tanto para a ferramenta `javadoc` principal quanto para o doclet atualmente selecionado. O doclet padrão é usado se nenhum outro doclet for especificado.

Opções no estilo GNU (ou seja, aquelas que começam com `--`) podem usar um sinal de igual (`=`) em vez de caracteres de espaço em branco para separar o nome de uma opção de seu valor.

### Opções Padrão do `javadoc`

As seguintes opções principais do `javadoc` são equivalentes às opções correspondentes do `javac`. Consulte _Opções Padrão_ em [javac](<#/doc/guides/tools/javac>) para descrições detalhadas do uso dessas opções:

  * `--add-modules`
  * `-bootclasspath`
  * `--class-path`, `-classpath`, or `-cp`
  * `--disable-line-doc-comments`
  * `--enable-preview`
  * `-encoding`
  * `-extdirs`
  * `--limit-modules`
  * `--module`
  * `--module-path` or `-p`
  * `--module-source-path`
  * `--release`
  * `--source` or `-source`
  * `--source-path` or `-sourcepath`
  * `--system`
  * `--upgrade-module-path`



As seguintes opções são as opções principais do `javadoc` que não são equivalentes a uma opção `javac` correspondente:

`-breakiterator`
    

Calcula a primeira frase da descrição em um comentário de documentação usando uma instância de `java.text.BreakIterator` para detectar _quebras de frase_. As regras usadas dependem da localidade atual: por exemplo, para o inglês, uma quebra de frase ocorre após um ponto final, ponto de interrogação ou ponto de exclamação seguido por um espaço quando a próxima palavra começa com uma letra maiúscula. (Isso se destina a lidar com a maioria das abreviações, como "The serial no. is valid", mas não lidará com "Mr. Smith".)

A opção é habilitada por padrão se o idioma da localidade atual não for inglês. Se o idioma da localidade atual for inglês, e a opção `-breakiterator` não for fornecida, um algoritmo padrão simples é usado, que apenas procura por um ponto final seguido por um espaço.

Em um comentário `/**...*/` tradicional, a busca pelo fim da primeira frase é terminada por uma tag de bloco HTML, como `<p>`, `<pre>`, ou a tag para um cabeçalho.

Em um comentário Markdown `///`, a busca pelo fim da primeira frase ignora quaisquer caracteres entre `code spans` e links, e é terminada pelo fim do bloco inicial, conforme indicado por uma linha em branco ou o início do próximo bloco, como uma lista, quebra temática ou um bloco HTML.

A primeira frase da descrição em um comentário de documentação é usada em tabelas de resumo, páginas de índice e outras situações onde um resumo curto é necessário. Para um controle mais explícito em qualquer comentário de documentação individual, inclua o conteúdo da primeira frase em uma tag `{@summary ...}`, ou quando aplicável, em uma tag `{@return ...}`.

`-doclet` _class_
     Gera saída usando um doclet alternativo. Use o nome totalmente qualificado. Este doclet define o conteúdo e formata a saída. Se a opção `-doclet` não for usada, a ferramenta `javadoc` usa o doclet padrão para gerar o formato HTML padrão. Esta classe deve implementar a interface `jdk.javadoc.doclet.Doclet`. O caminho para esta classe é definido pela opção `-docletpath`.

`-docletpath` _path_
     Especifica onde encontrar arquivos de classe doclet (especificados com a opção `-doclet`) e quaisquer arquivos JAR dos quais ele depende. Se o arquivo de classe inicial estiver em um arquivo JAR, então esta opção especifica o caminho para esse arquivo JAR. Você pode especificar um caminho absoluto ou um caminho relativo ao diretório atual. Se `path` contiver múltiplos caminhos ou arquivos JAR, eles devem ser separados por dois pontos (`:`) no Linux e macOS, e por um ponto e vírgula (`;`) no Windows. Esta opção não é necessária quando a classe inicial do `doclet` já está no classpath.

`-exclude` _pkglist_
    

Incondicionalmente, exclui os pacotes especificados e seus subpacotes da lista formada por `-subpackages`. Ele exclui esses pacotes mesmo quando eles seriam incluídos por alguma opção `-subpackages` anterior ou posterior.

O exemplo a seguir incluiria `java.io`, `java.util` e `java.math` (entre outros), mas excluiria pacotes enraizados em `java.net` e `java.lang`. Observe que esses exemplos excluem `java.lang.ref`, que é um subpacote de `java.lang`. Os argumentos são separados por dois pontos em todos os sistemas operacionais.

  * **Linux e macOS:**
` javadoc -sourcepath /home/user/src -subpackages java -exclude java.net:java.lang
```

  * **Windows:**
` javadoc -sourcepath \user\src -subpackages java -exclude java.net:java.lang
```

`--expand-requires` (`transitive`|`all`)
    

Instrui a ferramenta javadoc a expandir o conjunto de módulos a serem documentados. Por padrão, apenas os módulos explicitamente fornecidos na linha de comando são documentados. Suporta os seguintes valores:

  * `transitive`: inclui adicionalmente todas as dependências transitivas necessárias desses módulos.

  * `all`: inclui todas as dependências.

`--help`, `-help`, `-h`, ou `-?`
     Imprime uma sinopse das opções padrão.

`--help-extra` ou `-X`
     Imprime uma sinopse do conjunto de opções extras.

`-J` _flag_
    

Passa _flag_ diretamente para o Java Runtime Environment (JRE) que executa a ferramenta `javadoc`. Por exemplo, se você deve garantir que o sistema reserve 32 MB de memória para processar a documentação gerada, então você chamaria a opção `-Xmx` da seguinte forma: `javadoc -J-Xmx32m -J-Xms32m com.mypackage`. Esteja ciente de que `-Xms` é opcional porque ele apenas define o tamanho da memória inicial, o que é útil quando você sabe a quantidade mínima de memória necessária.

Não há espaço entre o `J` e o `flag`.

Use a opção `-version` para relatar a versão do JRE sendo usada para executar a ferramenta `javadoc`.
```
    javadoc -J-version
    java version "17" 2021-09-14 LTS
    Java(TM) SE Runtime Environment (build 17+35-LTS-2724)
    Java HotSpot(TM) 64-Bit Server VM (build 17+35-LTS-2724, mixed mode, sharing)
```

`-locale` _name_
    

Especifica a localidade que a ferramenta `javadoc` usa ao gerar a documentação. O argumento é o nome da localidade, conforme descrito na documentação de `java.util.Locale`, como `en_US` (Inglês, Estados Unidos) ou `en_US_WIN` (variante Windows).

A especificação de uma localidade faz com que a ferramenta `javadoc` escolha os arquivos de recurso dessa localidade para mensagens como strings na barra de navegação, cabeçalhos para listas e tabelas, conteúdo do arquivo de ajuda, comentários no arquivo `stylesheet.css` e assim por diante. Ela também especifica a ordem de classificação para listas ordenadas alfabeticamente e o separador de frases para determinar o fim da primeira frase. A opção `-locale` não determina a localidade do texto do comentário de documentação especificado nos arquivos fonte das classes documentadas.

`-package`
     Mostra apenas classes e membros de pacote, protegidos e públicos.

`-private`
     Mostra todas as classes e membros.

`-protected`
     Mostra apenas classes e membros protegidos e públicos. Este é o padrão.

`-public`
     Mostra apenas as classes e membros públicos.

`-quiet`
     Desliga as mensagens para que apenas os avisos e erros apareçam, tornando-os mais fáceis de visualizar. Também suprime a string `version`.

`--show-members` _value_
    

Especifica quais membros (campos, métodos ou construtores) são documentados, onde _value_ pode ser qualquer um dos seguintes:

  * `public` \--- mostra apenas membros públicos
  * `protected` \--- mostra membros públicos e protegidos; este é o padrão
  * `package` \--- mostra membros públicos, protegidos e de pacote
  * `private` \--- mostra todos os membros

`--show-module-contents` _value_
     Especifica a granularidade da documentação das declarações de módulo, onde _value_ pode ser `api` ou `all`.

`--show-packages` _value_
     Especifica quais pacotes de módulo são documentados, onde _value_ pode ser `exported` ou `all` packages.

`--show-types` _value_
    

Especifica quais tipos (classes, interfaces, etc.) são documentados, onde _value_ pode ser qualquer um dos seguintes:

  * `public` \--- mostra apenas tipos públicos
  * `protected` \--- mostra tipos públicos e protegidos; este é o padrão
  * `package` \--- mostra tipos públicos, protegidos e de pacote
  * `private` \--- mostra todos os tipos

`-subpackages` _subpkglist_
    

Gera documentação a partir de arquivos fonte nos pacotes especificados e recursivamente em seus subpacotes. Esta opção é útil ao adicionar novos subpacotes ao código fonte porque eles são incluídos automaticamente. Cada argumento de pacote é qualquer subpacote de nível superior (como `java`) ou pacote totalmente qualificado (como `javax.swing`) que não precisa conter arquivos fonte. Os argumentos são separados por dois pontos em todos os sistemas operacionais. Não são permitidos caracteres curinga. Use `-sourcepath` para especificar onde encontrar os pacotes. Esta opção não processa arquivos fonte que estão na árvore de fontes, mas não pertencem aos pacotes.

Por exemplo, os seguintes comandos geram documentação para pacotes chamados `java` e `javax.swing` e todos os seus subpacotes.

  * **Linux e macOS:**
` javadoc -d docs -sourcepath /home/user/src -subpackages java:javax.swing
```

  * **Windows:**
` javadoc -d docs -sourcepath \user\src -subpackages java:javax.swing
```

`-verbose`
     Fornece mensagens mais detalhadas enquanto a ferramenta `javadoc` é executada. Sem a opção `-verbose`, as mensagens aparecem para carregar os arquivos fonte, gerar a documentação (uma mensagem por arquivo fonte) e classificar. A opção `-verbose` faz com que mensagens adicionais sejam impressas, especificando o número de milissegundos para analisar cada arquivo fonte Java.

`--version`
     Imprime informações de versão.

`-Werror`
     Reporta um erro se ocorrerem quaisquer avisos.

Observe que se um arquivo fonte Java contiver uma classe implicitamente declarada, então essa classe e seus membros públicos, protegidos e de pacote serão documentados independentemente das opções como `--show-types`, `--show-members`, `-private`, `-protected`, `-package` e `-public`. Se `--show-members` for especificado com o valor `private` ou se `-private` for usado, todos os membros privados de uma classe implicitamente declarada também serão documentados.

### Opções Extras do `javadoc`

_Nota:_ As opções adicionais para `javadoc` estão sujeitas a alterações sem aviso prévio.

As seguintes opções adicionais do `javadoc` são equivalentes às opções correspondentes do `javac`. Consulte _Opções Extras_ em [javac](<#/doc/guides/tools/javac>) para descrições detalhadas do uso dessas opções:

  * `--add-exports`
  * `--add-reads`
  * `--patch-module`
  * `-Xmaxerrs`
  * `-Xmaxwarns`



### Opções Padrão para o Doclet Padrão

As seguintes opções são fornecidas pelo doclet padrão.

`--add-script` _file_
    

Adiciona _file_ como um arquivo JavaScript adicional à documentação gerada. Esta opção pode ser usada uma ou mais vezes para especificar arquivos de script adicionais.

Exemplo de linha de comando:

> `javadoc --add-script first_script.js --add-script second_script.js pkg_foo`

`--add-stylesheet` _file_
    

Adiciona _file_ como um arquivo de folha de estilo adicional à documentação gerada. Esta opção pode ser usada uma ou mais vezes para especificar folhas de estilo adicionais incluídas na documentação.

Exemplo de linha de comando:
```
    javadoc --add-stylesheet new_stylesheet_1.css --add-stylesheet new_stylesheet_2.css pkg_foo
```

`--allow-script-in-comments`
     Permite JavaScript em comentários de documentação e opções cujo valor é _html-code_.

`-author`
     Inclui o texto de quaisquer tags `author` na documentação gerada.

`-bottom` _html-code_
     Especifica o texto a ser colocado na parte inferior de cada página gerada. O texto pode conter tags HTML e espaços em branco, mas quando o fizer, o texto deve ser colocado entre aspas. Use caracteres de escape para quaisquer aspas internas dentro do texto.

`-charset` _name_
    

Especifica o conjunto de caracteres HTML para este documento. O nome deve ser um nome MIME preferencial, conforme especificado no [IANA Registry, Character Sets](<http://www.iana.org/assignments/character-sets>).

Por exemplo:
```
    javadoc -charset "iso-8859-1" mypackage
```

Este comando insere a seguinte linha, contendo um [`meta` element](<https://html.spec.whatwg.org/multipage/semantics.html#the-meta-element>) no cabeçalho de cada página gerada:
```
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
```

`-d` _directory_
    

Especifica o diretório de destino onde a ferramenta `javadoc` salva os arquivos HTML gerados. Se você omitir a opção `-d`, os arquivos serão salvos no diretório atual. O valor de `directory` pode ser absoluto ou relativo ao diretório de trabalho atual. O diretório de destino é criado automaticamente quando a ferramenta `javadoc` é executada.

  * **Linux e macOS:** Por exemplo, o seguinte comando gera a documentação para o pacote `com.mypackage` e salva os resultados no diretório `/user/doc/`:
` javadoc -d /user/doc/ com.mypackage
```

  * **Windows:** Por exemplo, o seguinte comando gera a documentação para o pacote `com.mypackage` e salva os resultados no diretório `\user\doc\`:
` javadoc -d \user\doc\ com.mypackage
```

`-docencoding` _name_
    

Especifica a codificação dos arquivos HTML gerados. O nome deve ser um nome MIME preferencial, conforme especificado no [IANA Registry, Character Sets](<http://www.iana.org/assignments/character-sets>).

Três opções estão disponíveis para uso em um comando de codificação `javadoc`. A opção `-encoding` é usada para codificar os arquivos lidos pela ferramenta `javadoc`, enquanto as opções `-docencoding` e `-charset` são usadas para codificar os arquivos escritos pela ferramenta. Das três opções disponíveis, no máximo, apenas a opção de codificação de entrada e uma de saída são usadas em um único comando de codificação. Se você especificar ambas as opções de codificação de entrada e saída em um comando, elas devem ter o mesmo valor. Se você não especificar nenhuma opção de saída, o padrão será a codificação de entrada.

Por exemplo:
```
    javadoc -docencoding "iso-8859-1" mypackage
```

`-docfilessubdirs`
     Habilita a cópia profunda de diretórios `doc-files`. Subdiretórios e todo o conteúdo são copiados recursivamente para o destino. Por exemplo, o diretório `doc-files/example/images` e todo o seu conteúdo são copiados. Use a opção `-excludedocfilessubdir` para restringir os subdiretórios a serem copiados.

`-doctitle` _html-code_
     Especifica o título a ser colocado próximo ao topo do arquivo de resumo da visão geral. O texto especificado na tag `title` é colocado como um cabeçalho de nível um centralizado diretamente abaixo da barra de navegação. A tag `title` pode conter tags HTML e espaços em branco, mas quando o fizer, você deve incluir o título entre aspas. Aspas adicionais dentro da tag `title` devem ser escapadas. Por exemplo, `javadoc -doctitle "<b>My Library</b><br>v1.0" com.mypackage`.

`-excludedocfilessubdir` _name1_`,`_name2..._
     Exclui quaisquer subdiretórios com os nomes fornecidos ao copiar recursivamente subdiretórios `doc-files`. Consulte `-docfilessubdirs`. Por razões históricas, `:` pode ser usado em qualquer lugar no argumento como um separador em vez de `,`.

`-footer` _html-code_
     Esta opção não é mais suportada e reporta um aviso.

`-group` _name_ _g1_`,`_g2..._
     Agrupa os pacotes especificados, ou módulos ao documentar código modular, juntos na página de Visão Geral. Por razões históricas, `:` pode ser usado como um separador em qualquer lugar no argumento em vez de `,`.

`-header` _html-code_
     Especifica o texto do cabeçalho a ser colocado no topo de cada arquivo de saída. O cabeçalho é colocado à direita da barra de navegação. O `header` pode conter tags HTML e espaços em branco, mas quando o fizer, o `header` deve ser colocado entre aspas. Use caracteres de escape para aspas internas dentro de um cabeçalho. Por exemplo, `javadoc -header "<b>My Library</b><br>v1.0" com.mypackage`.

`-helpfile` _filename_
     Especifica um arquivo contendo o texto que será exibido quando o link **HELP** na barra de navegação for clicado. Se esta opção não for fornecida, a ferramenta `javadoc` cria uma página padrão que será usada.

`-html5`
     Esta opção é uma no-op e é mantida apenas para compatibilidade retroativa.

`--javafx` ou `-javafx`
     Habilita a funcionalidade JavaFX. Esta opção é habilitada por padrão se as classes da biblioteca JavaFX forem detectadas no module path.

`-keywords`
    

Adiciona tags `<meta>` de palavra-chave HTML ao arquivo gerado para cada classe. Essas tags podem ajudar os mecanismos de busca que procuram tags `<meta>` a encontrar as páginas. A maioria dos mecanismos de busca que pesquisam toda a Internet não olha para as tags `<meta>`, porque as páginas podem usá-las de forma indevida. Mecanismos de busca oferecidos por empresas que restringem suas pesquisas ao seu próprio site podem se beneficiar ao olhar para as tags `<meta>`. As tags `<meta>` incluem o nome totalmente qualificado da classe e os nomes não qualificados dos campos e métodos. Construtores não são incluídos porque são idênticos ao nome da classe. Por exemplo, a página para a classe `String` inclui estas palavras-chave:
```
    <meta name="keywords" content="java.lang.String class">
    <meta name="keywords" content="CASE_INSENSITIVE_ORDER">
    <meta name="keywords" content="length()">
    <meta name="keywords" content="isEmpty()">
```

`-link` _url_
    

Cria links para documentação existente gerada pelo `javadoc` de classes referenciadas externamente. O argumento _url_ é a URL absoluta ou relativa do diretório que contém a documentação externa gerada pelo `javadoc`. Você pode especificar múltiplas opções `-link` em uma execução da ferramenta `javadoc` para vincular a múltiplos documentos.

Um arquivo `package-list` ou `element-list` deve estar neste diretório _url_ (caso contrário, use a opção `-linkoffline`).

_Nota:_ Os arquivos `package-list` e `element-list` são gerados pela ferramenta `javadoc` ao gerar a documentação da API e não devem ser modificados pelo usuário.

Quando você usa a ferramenta `javadoc` para documentar pacotes, ela usa o arquivo `package-list` para determinar os pacotes declarados em uma API. Quando você gera documentos de API para módulos, a ferramenta `javadoc` usa o arquivo `element-list` para determinar os módulos e pacotes declarados em uma API.

A ferramenta `javadoc` lê os nomes do arquivo de lista apropriado e então vincula aos pacotes ou módulos nessa URL.

Quando a ferramenta `javadoc` é executada, o valor _url_ é copiado para os links `<a href>` que são criados. Portanto, _url_ deve ser a URL para o diretório e não para um arquivo.

Você pode usar um link absoluto para _url_ para permitir que seus documentos se vinculem a um documento em qualquer site, ou você pode usar um link relativo para vincular apenas a um local relativo. Se você usar um link relativo, o valor que você passar deve ser o caminho relativo do diretório de destino (especificado com a opção `-d`) para o diretório que contém os pacotes aos quais está sendo vinculado. Ao especificar um link absoluto, você geralmente usa um link HTTP. No entanto, se você quiser vincular a um sistema de arquivos que não possui um servidor web, então você pode usar um link de arquivo. Use um link de arquivo apenas quando todos que desejam acessar a documentação gerada compartilharem o mesmo sistema de arquivos. Em todos os casos, e em todos os sistemas operacionais, use uma barra como separador, seja a URL absoluta ou relativa, e `https:`, `http:` ou `file:` conforme especificado no [RFC 1738: Uniform Resource Locators (URL)](<https://www.rfc-editor.org/info/rfc1738>).
```
    -link https://<host>/<directory>/<directory>/.../<name>
    -link http://<host>/<directory>/<directory>/.../<name>
    -link file://<host>/<directory>/<directory>/.../<name>
    -link <directory>/<directory>/.../<name>
```

`--link-modularity-mismatch` (`warn`|`info`)
     Especifica se a documentação externa com modularidade incorreta (por exemplo, documentação não modular para uma biblioteca modular, ou o caso inverso) deve ser relatada como um aviso (`warn`) ou apenas uma mensagem (`info`). O comportamento padrão é relatar um aviso.

`-linkoffline` _url1_ _url2_
    

Esta opção é uma variação da opção `-link`. Ambas criam links para documentação gerada pelo `javadoc` para classes referenciadas externamente. Você pode especificar múltiplas opções `-linkoffline` em uma execução da ferramenta `javadoc`.

Use a opção `-linkoffline` quando:

  * Vincular a um documento na web que a ferramenta `javadoc` não consegue acessar através de uma conexão web

  * O arquivo `package-list` ou `element-list` do documento externo não é acessível ou não existe no local da URL, mas existe em um local diferente e pode ser especificado por um dos arquivos `package-list` ou `element-list` (tipicamente local).




_Nota:_ Os arquivos `package-list` e `element-list` são gerados pela ferramenta `javadoc` ao gerar a documentação da API e não devem ser modificados pelo usuário.

Se _url1_ for acessível apenas na World Wide Web, então a opção `-linkoffline` remove a restrição de que a ferramenta `javadoc` deve ter uma conexão web para gerar a documentação.

Outro uso da opção `-linkoffline` é como uma solução alternativa para atualizar documentos. Depois de executar a ferramenta `javadoc` em um conjunto completo de pacotes ou módulos, você pode executar a ferramenta `javadoc` novamente em um conjunto menor de pacotes ou módulos alterados, para que os arquivos atualizados possam ser inseridos de volta no conjunto original.

Por exemplo, a opção `-linkoffline` aceita dois argumentos. O primeiro é para a string a ser incorporada nos links `<a href>`, e o segundo informa à ferramenta `javadoc` onde encontrar o arquivo `package-list` ou `element-list`.

O valor _url1_ ou _url2_ é a URL absoluta ou relativa do diretório que contém a documentação externa gerada pelo `javadoc` à qual você deseja vincular. Quando relativo, o valor deve ser o caminho relativo do diretório de destino (especificado com a opção `-d`) para a raiz dos pacotes aos quais está sendo vinculado. Consulte _url_ na opção `-link`.

`--link-platform-properties` _url_
    

Especifica um arquivo de propriedades usado para configurar links para a documentação da plataforma.

Espera-se que o argumento _url_ aponte para um arquivo de propriedades contendo uma ou mais entradas com o seguinte formato, onde `<version>` é a versão da plataforma conforme passado para a opção `--release` ou `--source` e `<url>` é a URL base da documentação da API da plataforma correspondente:
```
    doclet.platform.docs.<version>=<url>
```

Por exemplo, um arquivo de propriedades contendo URLs para as versões 15 a 17 pode conter as seguintes linhas:
```
    doclet.platform.docs.15=https://example.com/api/15/
    doclet.platform.docs.16=https://example.com/api/16/
    doclet.platform.docs.17=https://example.com/api/17/
```

Se o arquivo de propriedades não contiver uma entrada para uma versão específica, nenhum link de plataforma será gerado.

`-linksource`
    

Cria uma versão HTML de cada arquivo fonte (com números de linha) e adiciona links para eles a partir da documentação HTML padrão. Links são criados para classes, interfaces, construtores, métodos e campos cujas declarações estão em um arquivo fonte. Caso contrário, links não são criados, como para construtores padrão e classes geradas.

Esta opção expõe todos os detalhes de implementação privados nos arquivos fonte incluídos, incluindo classes privadas, campos privados e os corpos de métodos privados, independentemente das opções `-public`, `-package`, `-protected` e `-private`. A menos que você também use a opção `-private`, nem todas as classes ou interfaces privadas são acessíveis através de links.

Cada link aparece no nome do identificador em sua declaração. Por exemplo, o link para o código fonte da classe `Button` estaria na palavra `Button`:
```
    public class Button extends Component implements Accessible
```

O link para o código fonte do método `getLabel` na classe `Button` está na palavra `getLabel`:
```
    public String getLabel()
```

`--main-stylesheet` _file_ ou `-stylesheetfile` _file_
    

Especifica o caminho de um arquivo de folha de estilo alternativo que contém as definições para os estilos CSS usados na documentação gerada. Esta opção permite que você substitua o padrão. Se você não especificar a opção, a ferramenta `javadoc` criará e usará uma folha de estilo padrão. O nome do arquivo pode ser qualquer nome e não está restrito a `stylesheet.css`. A opção `--main-stylesheet` é a forma preferida.

Exemplo de linha de comando:
```
    javadoc --main-stylesheet main_stylesheet.css pkg_foo
```

`-nocomment`
     Suprime todo o corpo do comentário, incluindo a descrição principal e todas as tags, e gera apenas declarações. Esta opção permite reutilizar arquivos fonte que foram originalmente destinados a um propósito diferente, para que você possa produzir documentação HTML esqueleto durante as fases iniciais de um novo projeto.

`-nodeprecated`
     Impede a geração de qualquer API depreciada na documentação. Isso faz o que a opção `-nodeprecatedlist` faz, e não gera nenhuma API depreciada em toda a documentação restante. Isso é útil ao escrever código quando você não quer ser distraído pelo código depreciado.

`-nodeprecatedlist`
     Impede a geração do arquivo que contém a lista de APIs depreciadas (`deprecated-list.html`) e o link na barra de navegação para essa página. A ferramenta `javadoc` continua a gerar a API depreciada em todo o restante do documento. Isso é útil quando seu código fonte não contém APIs depreciadas e você deseja tornar a barra de navegação mais limpa.

`--no-fonts`
     Impede a inclusão de arquivos de fonte na documentação gerada. Isso pode ser útil se a documentação usar uma folha de estilo personalizada que não utilize as fontes padrão.

`-nohelp`
     Omite o link **HELP** na barra de navegação no topo de cada página gerada.

`-noindex`
     Omite o índice dos documentos gerados. O índice é produzido por padrão.

`-nonavbar`
     Impede a geração da barra de navegação e do cabeçalho. A opção `-nonavbar` não tem efeito sobre a opção `-bottom`. A opção `-nonavbar` é útil quando você está interessado apenas no conteúdo e não precisa de navegação, como ao converter os arquivos para PostScript ou PDF apenas para impressão.

`--no-platform-links`
     Impede a geração de links para a documentação da plataforma. Esses links são gerados por padrão.

`-noqualifier` _name1_`,`_name2..._
    

Exclui a lista de qualificadores da saída. O nome do pacote é removido de locais onde nomes de classes ou interfaces aparecem. Por razões históricas, `:` pode ser usado em qualquer lugar no argumento como um separador em vez de `,`.

O exemplo a seguir omite todos os qualificadores de pacote: `-noqualifier all`.

O exemplo a seguir omite os qualificadores de pacote `java.lang` e `java.io`: `-noqualifier java.lang:java.io`.

O exemplo a seguir omite qualificadores de pacote que começam com `java` e subpacotes `com.sun`, mas não `javax: -noqualifier java.*:com.sun.*`.

Onde um qualificador de pacote apareceria devido ao comportamento anterior, o nome pode ser adequadamente encurtado. Esta regra está em vigor independentemente de a opção `-noqualifier` ser usada ou não.

`-nosince`
     Omite da documentação gerada as seções `Since` derivadas de quaisquer tags `since`.

`-notimestamp`
     Suprime o carimbo de data/hora, que está oculto em um comentário HTML no HTML gerado próximo ao topo de cada página. A opção `-notimestamp` é útil quando você deseja executar a ferramenta `javadoc` em duas bases de código fonte e compará-las, pois impede que os carimbos de data/hora causem uma diferença (o que, de outra forma, seria uma diferença em cada página). O carimbo de data/hora inclui o número da versão da ferramenta `javadoc`.

`-notree`
     Omite as páginas de hierarquia de classes e interfaces dos documentos gerados. Estas são as páginas que você acessa usando o link **TREE** na barra de navegação. A hierarquia é produzida por padrão.

`--override-methods` (`detail`|`summary`)
     Documenta métodos sobrescritos nas seções de detalhes ou resumo. O padrão é `detail`.

`-overview` _filename_
    

Especifica que a ferramenta `javadoc` deve recuperar o conteúdo para a documentação de visão geral do arquivo especificado por _filename_ e colocá-lo na página de Visão Geral (`overview-summary.html`). Se o _filename_ for um caminho relativo, ele será avaliado em relação ao diretório de trabalho atual.
O arquivo pode ser um arquivo HTML, com um nome de arquivo terminando em `.html`, ou um arquivo Markdown, com um nome de arquivo terminando em `.md`. Se o arquivo for um arquivo HTML, o conteúdo para a documentação de visão geral é retirado do elemento `<main>` no arquivo, se presente, ou do elemento `<body>` se não houver um elemento `<main>`. Se o arquivo for um arquivo Markdown, todo o conteúdo do arquivo é usado.

O título na página de visão geral é definido por `-doctitle`.

_Nota:_ versões mais antigas da ferramenta `javadoc` assumiam que qualquer uso desta opção era para um arquivo HTML, e permitiam qualquer extensão para o _filename_.

`-serialwarn`
     Reporta avisos em tempo de compilação para tags `@serial` ausentes. Por padrão, o Javadoc não reporta avisos de serialização. Use esta opção para exibir os avisos de serialização, o que ajuda a documentar corretamente campos serializáveis padrão e métodos `writeExternal`.
`--since` _release_(`,`_release_)*
    

Gera documentação para APIs que foram adicionadas ou recém-depreciadas nas _release_ s especificadas.

Se a tag `@since` no comentário `javadoc` de um elemento no código-fonte documentado corresponder a uma _release_ passada como argumento da opção, informações sobre o elemento e a _release_ em que foi adicionado são incluídas em uma página "New API".

Se a página "Deprecated API" for gerada e o elemento `since` da anotação `java.lang.Deprecated` de um elemento documentado corresponder a uma _release_ nos argumentos da opção, informações sobre a _release_ em que o elemento foi depreciado são adicionadas à página "Deprecated API".

As _releases_ são comparadas usando comparação de string que diferencia maiúsculas de minúsculas.

`--since-label` _text_
     Especifica o _text_ a ser usado no cabeçalho da página "New API". Isso pode conter informações sobre as _releases_ cobertas na página, por exemplo, "New API in release 2.0", ou "New API since release 1".
`--snippet-path` _snippetpathlist_
     Especifica os caminhos de busca para encontrar arquivos para snippets externos. A _snippetpathlist_ pode conter múltiplos caminhos separando-os com o separador de caminho da plataforma (`;` no Windows; `:` em outras plataformas). O doclet padrão primeiro busca o subdiretório `snippet-files` no pacote que contém o snippet, e então busca todos os diretórios na lista fornecida.
`-sourcetab` _tab-length_
     Especifica o número de espaços que cada tabulação usa na fonte.
`--spec-base-url` _url_
     Especifica a URL base para URLs relativas em tags `@spec`, a ser usada ao gerar links para quaisquer especificações externas. Pode ser uma URL absoluta ou uma URL relativa, caso em que é avaliada em relação ao diretório base dos arquivos de saída gerados. O valor padrão é equivalente a `{@docRoot}/../specs`.
`-splitindex`
     Divide o arquivo de índice em múltiplos arquivos, alfabeticamente, um arquivo por letra, mais um arquivo para quaisquer entradas de índice que começam com símbolos não alfabéticos.
`--syntax-highlight`
    

Habilita o realce de sintaxe para fragmentos de código em tags `{@snippet}` e elementos `<pre><code>`. Para snippets, o atributo `lang` é usado para determinar a linguagem dos fragmentos de código, que por padrão é "java" para snippets inline e é derivado da extensão do arquivo para snippets externos. Em tags HTML `<pre><code>`, o atributo `class` pode ser usado para especificar a linguagem do fragmento de código contido, conforme mostrado abaixo:
``` 
    <pre><code class="language-java">...</code></pre>
```

Se nenhum desses atributos estiver disponível, a detecção automática de linguagem é aplicada. Para desabilitar o realce de sintaxe para um fragmento de código, defina a linguagem como "text" usando um dos mecanismos descritos acima. As linguagens e formatos suportados por esta opção são Java, Properties, JSON, HTML e XML.

`-tag` _name_ :_locations_ :_header_
    

Especifica uma tag personalizada com um único argumento. Para que a ferramenta `javadoc` verifique a ortografia dos nomes das tags, é importante incluir uma opção `-tag` para cada tag personalizada presente no código-fonte, desabilitando (com `X`) aquelas que não estão sendo geradas na execução atual. O dois pontos (`:`) é sempre o separador. Para incluir um dois pontos no nome da tag, escape-o com uma barra invertida (`\`). A opção `-tag` exibe o cabeçalho da tag, _header_, em negrito, seguido na próxima linha pelo texto de seu único argumento. Semelhante a qualquer tag de bloco, o texto do argumento pode conter tags inline, que também são interpretadas. A saída é semelhante às tags padrão de um argumento, como as tags `@return` e `@author`. Omitir um valor _header_ faz com que o _name_ seja o cabeçalho. _locations_ é uma lista de caracteres que especificam os tipos de declarações nas quais a tag pode ser usada. Os seguintes caracteres podem ser usados, em maiúsculas ou minúsculas:

  * `A`: todas as declarações
  * `C`: construtores
  * `F`: campos
  * `M`: métodos
  * `O`: a página de visão geral e outros arquivos de documentação em subdiretórios `doc-files`
  * `P`: pacotes
  * `S`: módulos
  * `T`: tipos (classes e interfaces)
  * `X`: em nenhum lugar: a tag está desabilitada e será ignorada



A ordem em que as tags são fornecidas na linha de comando será usada como a ordem em que as tags aparecem na saída gerada. Você pode incluir tags padrão na ordem fornecida na linha de comando usando a opção `-tag` sem _locations_ ou _header_.

`-taglet` _class_
    

Especifica o nome totalmente qualificado do taglet usado na geração da documentação para essa tag. Use o nome totalmente qualificado para o valor _class_. Este taglet também define o número de argumentos de texto que a tag personalizada possui. O taglet aceita esses argumentos, os processa e gera a saída.

Taglets são úteis para tags de bloco ou inline. Eles podem ter qualquer número de argumentos e implementar comportamento personalizado, como deixar o texto em negrito, formatar marcadores, escrever o texto em um arquivo ou iniciar outros processos. Taglets só podem determinar onde uma tag deve aparecer e em que formato. Todas as outras decisões são tomadas pelo doclet. Um taglet não pode fazer coisas como remover um nome de classe da lista de classes incluídas. No entanto, ele pode executar efeitos colaterais, como imprimir o texto da tag em um arquivo ou acionar outro processo. Use a opção `-tagletpath` para especificar o caminho para o taglet. O exemplo a seguir insere o taglet To Do após Parameters e antes de Throws nas páginas geradas.
``` 
    -taglet com.sun.tools.doclets.ToDoTaglet
    -tagletpath /home/taglets
    -tag return
    -tag param
    -tag todo
    -tag throws
    -tag see
```

Alternativamente, você pode usar a opção `-taglet` no lugar de sua opção `-tag`, mas isso pode ser difícil de ler.

`-tagletpath` _tagletpathlist_
     Especifica os caminhos de busca para encontrar arquivos de classe taglet. A _tagletpathlist_ pode conter múltiplos caminhos separando-os com o separador de caminho da plataforma (`;` no Windows; `:` em outras plataformas). A ferramenta `javadoc` busca em todos os subdiretórios dos caminhos especificados.
`-top` _html-code_
     Especifica o texto a ser colocado no topo de cada arquivo de saída.
`-use`
     Cria páginas de uso de classes e pacotes. Inclui uma página de Uso para cada classe e pacote documentado. A página descreve quais pacotes, classes, métodos, construtores e campos usam qualquer API da classe ou pacote especificado. Dada a classe C, coisas que usam a classe C incluiriam subclasses de C, campos declarados como C, métodos que retornam C, e métodos e construtores com parâmetros do tipo C. Por exemplo, você pode consultar a página de Uso para o tipo `String`. Como o método `getName` na classe `java.awt.Font` retorna o tipo `String`, o método `getName` usa `String` e, portanto, o método `getName` aparece na página de Uso para `String`. Isso documenta apenas os usos da API, não a implementação. Quando um método usa `String` em sua implementação, mas não aceita uma string como argumento ou retorna uma string, isso não é considerado um uso de `String`. Para acessar a página de Uso gerada, vá para a classe ou pacote e clique no link **USE** na barra de navegação.
`-version`
     Inclui o texto de quaisquer tags `version` na documentação gerada. Este texto é omitido por padrão. Nota: Para descobrir qual versão da ferramenta `javadoc` você está usando, utilize a opção `--version` (com dois hífens).
`-windowtitle` _title_
     Especifica o título a ser colocado na tag HTML `<title>`. O texto especificado na tag `title` aparece no título da janela e em quaisquer favoritos do navegador (lugares favoritos) que alguém crie para esta página. Este título não deve conter nenhuma tag HTML porque um navegador não as interpretará corretamente. Use caracteres de escape em quaisquer aspas internas dentro da tag `title`. Se a opção `-windowtitle` for omitida, a ferramenta `javadoc` usará o valor da opção `-doctitle` para a opção `-windowtitle`. Por exemplo, `javadoc -windowtitle "My Library" com.mypackage`.

### Opções Extras para o Doclet Padrão

As seguintes são opções adicionais fornecidas pelo doclet padrão e estão sujeitas a alterações sem aviso prévio. Opções adicionais são menos comumente usadas ou são consideradas avançadas.

`--date` _date-and-time_
    

Especifica o valor a ser usado para carimbar as páginas geradas, no formato [ISO 8601](<https://www.iso.org/iso-8601-date-and-time-format.html>). O valor especificado deve estar dentro de 10 anos da data e hora atuais. É um erro especificar tanto `-notimestamp` quanto `--date`. Usar um valor específico significa que a documentação gerada pode fazer parte de uma [reproducible build](<https://reproducible-builds.org/>). Se a opção não for fornecida, o valor padrão é a data e hora atuais. Por exemplo:
``` 
    javadoc --date 2022-02-01T17:41:59-08:00 mypackage
```

`--legal-notices` (`default`|`none`|_directory_)
     Especifica o local de onde copiar arquivos legais para a documentação gerada. Se a opção não for especificada ou for usada com o valor `default`, os arquivos são copiados do local padrão. Se o argumento for usado com o valor `none`, nenhum arquivo é copiado. Qualquer outro argumento é interpretado como o diretório de onde copiar os arquivos legais.
`--no-frames`
     Esta opção não é mais suportada e reporta um aviso.
`-Xdoclint`
    

Habilita verificações recomendadas para problemas em comentários de documentação.

Por padrão, a opção `-Xdoclint` está habilitada. Desabilite-a com a opção `-Xdoclint:none`.

Para mais detalhes, consulte DocLint.

`-Xdoclint:`_flag_ ,_flag_ ,...
    

Habilita ou desabilita verificações específicas para diferentes tipos de problemas em comentários de documentação.

Cada _flag_ pode ser um de `all`, `none`, ou `[-]`_group_ onde _group_ tem um dos seguintes valores: `accessibility`, `html`, `missing`, `reference`, `syntax`. Para mais detalhes sobre esses valores, consulte DocLint Groups.

Ao especificar duas ou mais flags, você pode usar uma única opção `-Xdoclint:...`, listando todas as flags desejadas, ou pode usar múltiplas opções, fornecendo uma ou mais flags em cada opção. Por exemplo, use qualquer um dos seguintes comandos para verificar problemas de HTML, sintaxe e acessibilidade no arquivo `MyFile.java`.
``` 
    javadoc -Xdoclint:html -Xdoclint:syntax -Xdoclint:accessibility MyFile.java
    javadoc -Xdoclint:html,syntax,accessibility MyFile.java
```

Os exemplos a seguir ilustram como alterar o que o DocLint reporta:

  * `-Xdoclint:none` \--- desabilita todas as verificações
  * `-Xdoclint:`_group_ \--- habilita verificações de _group_
  * `-Xdoclint:all` \--- habilita todos os grupos de verificações
  * `-Xdoclint:all,-`_group_ \--- habilita todas as verificações, exceto as verificações de _group_



Para mais detalhes, consulte DocLint.

`-Xdoclint/package:`[`-`]_packages_
    

Habilita ou desabilita verificações em pacotes específicos. _packages_ é uma lista de especificadores de pacote separados por vírgulas. Um especificador de pacote é um nome qualificado de um pacote ou um prefixo de nome de pacote seguido por `*`, que se expande para todos os subpacotes do pacote fornecido. Prefixe o especificador de pacote com `-` para desabilitar as verificações para os pacotes especificados.

Para mais detalhes, consulte DocLint.

`-Xdocrootparent` _url_
     Substitui todos os itens `@docRoot` seguidos por `/..` em comentários de documentação por _url_.

## DocLint

DocLint oferece a capacidade de verificar possíveis problemas em comentários de documentação. Os problemas podem ser reportados como avisos ou erros, dependendo de sua gravidade. Por exemplo, um comentário ausente pode ser um estilo ruim que merece um aviso, mas um link para uma declaração Java desconhecida é mais sério e merece um "erro". Os problemas são organizados em grupos, e opções podem ser usadas para habilitar ou desabilitar mensagens em um ou mais grupos. Dentro do código-fonte, mensagens em um ou mais grupos podem ser suprimidas usando anotações `@SuppressWarnings`.

Quando invocado a partir do `javadoc`, por padrão o DocLint verifica todos os comentários que são usados na documentação gerada. Ele, portanto, depende de outras opções de linha de comando para determinar quais declarações e quais comentários de documentação correspondentes serão incluídos. _Nota:_ isso pode significar que até mesmo comentários em alguns membros privados de classes serializáveis também serão verificados, se os membros precisarem ser documentados na página `Serialized Forms` gerada.

Em contraste, quando o DocLint é invocado a partir do `javac`, o DocLint depende exclusivamente das várias opções `-Xdoclint...` para determinar quais comentários de documentação verificar.

O DocLint não tenta corrigir entradas inválidas, ele apenas as reporta.

_Nota:_ O DocLint não garante a completude dessas verificações. Em particular, ele não é um verificador completo de conformidade HTML. O objetivo é apenas reportar erros comuns de maneira conveniente.

### Grupos

As verificações realizadas pelo DocLint são organizadas em grupos. Os avisos e erros em cada grupo podem ser habilitados ou desabilitados com opções de linha de comando, ou suprimidos com anotações `@SuppressWarnings`.

Os grupos são os seguintes:

  * `accessibility` \--- Verifica problemas relacionados à acessibilidade.  
Por exemplo, nenhum atributo `alt` especificado em um elemento `<img>`, ou nenhum atributo `caption` ou `summary` especificado em um elemento `<table>`.

Os problemas são reportados como erros se uma ferramenta de validação a jusante puder ser esperada para reportar um erro nos arquivos gerados pelo `javadoc`.

Para referência, consulte as [Web Content Accessibility Guidelines](<https://www.w3.org/WAI/standards-guidelines/wcag/>).

  * `html` \--- Detecta problemas comuns de HTML de alto nível.  
Por exemplo, colocar elementos de bloco dentro de elementos inline, ou não fechar elementos que exigem uma tag de fechamento.

Os problemas são reportados como erros se uma ferramenta de validação a jusante puder ser esperada para reportar um erro nos arquivos gerados pelo `javadoc`.

Para referência, consulte o [HTML Living Standard](<https://html.spec.whatwg.org/multipage/>).

  * `missing` \--- Verifica a falta de comentários ou tags de documentação.  
Por exemplo, um comentário ausente em uma declaração de classe, ou uma tag `@param` ou `@return` ausente no comentário para uma declaração de método.

Problemas relacionados a itens ausentes são tipicamente reportados como avisos porque é improvável que sejam reportados como erros por ferramentas de validação a jusante que podem ser usadas para verificar a saída gerada pelo `javadoc`.

  * `reference` \--- Verifica problemas relacionados às referências a elementos da API Java a partir de tags de comentários de documentação.  
Por exemplo, a referência em `@see` ou `{@link ...}` não pode ser encontrada, ou um nome incorreto é fornecido para `@param` ou `@throws`.

Os problemas são tipicamente reportados como erros porque, embora o problema possa não causar problemas nos arquivos gerados, o autor provavelmente cometeu um erro que levará a uma documentação incorreta ou inesperada.

  * `syntax` \--- Verifica problemas sintáticos de baixo nível em comentários de documentação.  
Por exemplo, colchetes angulares não escapados (`<` e `>`) e e-comerciais (`&`) e tags de comentários de documentação inválidas.  


Os problemas são tipicamente reportados como erros porque os problemas podem levar a uma documentação incorreta ou inesperada.

### Suprimindo Mensagens

O DocLint verifica e reconhece duas strings que podem estar presentes nos argumentos de uma anotação `@SuppressWarnings`.

  * `doclint`
  * `doclint:`_LIST_



onde _LIST_ é uma lista separada por vírgulas de um ou mais de `accessibility`, `html`, `missing`, `reference`, `syntax`.

Os nomes em _LIST_ são os mesmos nomes de grupo suportados pela opção de linha de comando `-Xdoclint` para `javac` e `javadoc`. (Esta é a mesma convenção honrada pela opção `-Xlint` do `javac` e os nomes correspondentes suportados por `@SuppressWarnings`.)

Os nomes em _LIST_ podem ser especificados de forma equivalente em argumentos separados da anotação. Por exemplo, os seguintes são equivalentes:

  * `@SuppressWarnings("doclint:accessibility,missing")`
  * `@SuppressWarnings("doclint:accessibility", "doclint:missing")`



Quando o DocLint detecta um problema em um comentário de documentação, ele verifica a presença de `@SuppressWarnings` na declaração associada e em todas as declarações lexicamente envolventes. O problema será ignorado se qualquer anotação desse tipo for encontrada contendo a string simples `doclint` ou a forma mais longa `doclint:LIST` onde _LIST_ contém o nome do grupo para o problema.

_Nota:_ assim como em outros usos de `@SuppressWarnings`, usar a anotação em uma declaração de módulo ou pacote afeta apenas essa declaração; não afeta o conteúdo do módulo ou pacote em outros arquivos-fonte.

Todas as mensagens relacionadas a um problema são suprimidas pela presença de uma anotação `@SuppressWarnings` apropriada: isso inclui erros e avisos.

_Nota:_ Só é possível _suprimir_ mensagens. Se uma anotação `@SuppressWarnings("doclint")` for fornecida em uma declaração de nível superior, todas as mensagens do DocLint para essa declaração e quaisquer declarações aninhadas serão suprimidas; não é possível reabilitar seletivamente mensagens para problemas em declarações aninhadas.

### Comparação com ferramentas de validação a jusante

DocLint é uma utilidade integrada ao `javac` e `javadoc` que verifica o conteúdo dos comentários de documentação, conforme encontrados nos arquivos-fonte. Em contraste, ferramentas de validação a jusante podem ser usadas para validar a saída gerada a partir desses comentários de documentação pelo `javadoc` e pelo doclet padrão.

Embora haja alguma sobreposição de funcionalidade, os dois mecanismos são diferentes e cada um tem seus próprios pontos fortes e fracos.

  * Ferramentas de validação a jusante podem verificar o resultado final de qualquer documentação gerada, como será vista pelo usuário final. Isso inclui conteúdo de todas as fontes, incluindo comentários de documentação, o próprio doclet padrão, taglets fornecidos pelo usuário e conteúdo fornecido via opções de linha de comando. Como essas ferramentas estão analisando páginas HTML completas, elas podem fazer verificações mais completas do que o DocLint. No entanto, quando um problema é encontrado nas páginas geradas, pode ser mais difícil rastrear exatamente onde na pipeline de construção o problema precisa ser corrigido.

  * O DocLint verifica o conteúdo dos comentários de documentação, nos arquivos-fonte. Isso torna muito fácil identificar a posição exata de quaisquer problemas que possam ser encontrados. O DocLint também pode detectar alguns erros semânticos em comentários de documentação que as ferramentas a jusante não conseguem detectar, como comentários ausentes, o uso de uma tag `@return` em um método que retorna `void`, ou uma tag `@param` descrevendo um parâmetro inexistente. Mas, por sua natureza, o DocLint não pode reportar problemas como links ausentes, ou erros em taglets personalizados fornecidos pelo usuário, ou problemas no próprio doclet padrão. Ele também não pode detectar de forma confiável erros em comentários de documentação nas fronteiras entre o conteúdo de um comentário de documentação e o conteúdo gerado por um taglet personalizado.