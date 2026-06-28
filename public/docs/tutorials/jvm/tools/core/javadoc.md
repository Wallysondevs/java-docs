# Javadoc - o Gerador de Documentação

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas Essenciais do JDK ](<#/doc/tutorials/jvm/tools/core>) > Javadoc - o Gerador de Documentação

**Anterior na Série**

[Javap - o Desmontador](<#/doc/tutorials/jvm/tools/core/javap>)

➜

**Tutorial Atual**

Javadoc - o Gerador de Documentação

➜

**Próximo na Série**

[Java - Seu Lançador de Aplicações](<#/doc/tutorials/jvm/tools/core/java>)

**Anterior na Série:** [Javap - o Desmontador](<#/doc/tutorials/jvm/tools/core/javap>)

**Próximo na Série:** [Java - Seu Lançador de Aplicações](<#/doc/tutorials/jvm/tools/core/java>)

# Javadoc - o Gerador de Documentação

## Apresentando o javadoc

[javadoc](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/javadoc.html>) - gera páginas HTML de documentação API a partir de arquivos fonte Java

## Sinopse

`options` Especifica opções de linha de comando, separadas por espaços.

`packagenames` Nomes dos pacotes que você deseja documentar, separados por espaços, por exemplo `java.lang java.lang.reflect java.awt`. Se você também quiser documentar os subpacotes, use a opção `-subpackages` para especificar os pacotes.

Por padrão, o `javadoc` procura os pacotes especificados no diretório atual e subdiretórios. Use a opção `-sourcepath` para especificar a lista de diretórios onde procurar os pacotes.

`sourcefiles` Nomes dos arquivos fonte Java que você deseja documentar, separados por espaços, por exemplo `Class.java Object.java Button.java`. Por padrão, o `javadoc` procura as classes especificadas no diretório atual. No entanto, você pode especificar o caminho completo para o arquivo de classe e usar caracteres curinga, por exemplo `/home/src/java/awt/Graphics*.java`. Você também pode especificar o caminho relativo ao diretório atual.

`@files` Nomes de arquivos que contêm uma lista de opções da ferramenta `javadoc`, nomes de pacotes e nomes de arquivos fonte em qualquer ordem.

## Descrição

A ferramenta `javadoc` analisa as declarações e comentários de documentação em um conjunto de arquivos fonte Java e produz páginas HTML correspondentes que descrevem (por padrão) as classes públicas e protegidas, classes aninhadas (mas não classes internas anônimas), interfaces, construtores, métodos e campos. Você pode usar a ferramenta javadoc para gerar a documentação da API, ou a documentação de implementação para um conjunto de arquivos fonte.

Você pode executar a ferramenta `javadoc` em pacotes inteiros, arquivos fonte individuais ou ambos. Ao documentar pacotes inteiros, você pode usar a opção `-subpackages` tanto para percorrer recursivamente um diretório e seus subdiretórios, quanto para passar uma lista explícita de nomes de pacotes. Ao documentar arquivos fonte individuais, passe uma lista de nomes de arquivos fonte Java.

## Conformidade

O doclet padrão não valida o conteúdo dos comentários de documentação quanto à conformidade, nem tenta corrigir quaisquer erros nos comentários de documentação. Qualquer pessoa que execute o javadoc é aconselhada a estar ciente dos problemas que podem surgir ao gerar saída não conforme ou saída contendo conteúdo executável, como JavaScript. O doclet padrão fornece o recurso `doclint` para ajudar os desenvolvedores a detectar problemas comuns em comentários de documentação; mas também é recomendado verificar a saída gerada com quaisquer ferramentas apropriadas de conformidade e outras ferramentas de verificação.

## Opções para javadoc

As seguintes opções principais do javadoc são equivalentes às opções correspondentes do `javac`. Consulte Opções Padrão para descrições detalhadas de como usar essas opções:

As seguintes opções são as opções principais do javadoc que não são equivalentes a uma opção javac correspondente:

`-breakiterator` Calcula a primeira frase com BreakIterator. A primeira frase é copiada para o resumo do pacote, classe ou membro e para o índice alfabético. A classe BreakIterator é usada para determinar o fim de uma frase para todos os idiomas, exceto o inglês:

`-doclet class` Gera saída usando um doclet alternativo. Use o nome totalmente qualificado. Este doclet define o conteúdo e formata a saída. Se a opção -doclet não for usada, a ferramenta javadoc usa o doclet padrão para gerar o formato HTML padrão. Esta classe deve conter o método start(Root). O caminho para esta classe inicial é definido pela opção -docletpath.

`-docletpath path` Especifica onde encontrar arquivos de classe doclet (especificados com a opção -doclet) e quaisquer arquivos JAR dos quais ele depende. Se o arquivo de classe inicial estiver em um arquivo JAR, então esta opção especifica o caminho para esse arquivo JAR. Você pode especificar um caminho absoluto ou um caminho relativo ao diretório atual. Se `classpathlist` contiver múltiplos caminhos ou arquivos JAR, eles devem ser separados por dois pontos (`:`) no Linux e macOS e por ponto e vírgula (`;`) no Windows. Esta opção não é necessária quando a classe inicial do doclet já está no caminho de busca.

`-exclude pkglist` Exclui incondicionalmente os pacotes especificados e seus subpacotes da lista formada por `-subpackages`. Ele exclui esses pacotes mesmo quando eles seriam incluídos por alguma opção `-subpackages` anterior ou posterior.

O exemplo a seguir incluiria `java.io`, `java.util` e `java.math` (entre outros), mas excluiria pacotes enraizados em java.net e java.lang. Observe que esses exemplos excluem java.lang.ref, que é um subpacote de `java.lang`:

**Linux e macOS:**

```bash
javadoc -exclude java.net:java.lang com.mypackage
```

**Windows:**

```bash
javadoc -exclude java.net:java.lang com.mypackage
```

`--expand-requires value` Instruí a ferramenta javadoc a expandir o conjunto de módulos a serem documentados. Por padrão, apenas os módulos explicitamente fornecidos na linha de comando são documentados. Suporta os seguintes valores:

transitive: inclui adicionalmente todas as dependências transitivas necessárias desses módulos.

all: inclui todas as dependências.

`-help ou --help` Exibe a ajuda online, que lista todas as opções de linha de comando do javadoc e doclet.

`--help-extra ou -X` Imprime uma sinopse de opções não padrão e sai.

`-Jflag` Passa a flag diretamente para o Java Runtime Environment (JRE) que executa a ferramenta javadoc. Por exemplo, se você deve garantir que o sistema reserve 32 MB de memória para processar a documentação gerada, então você chamaria a opção -Xmx da seguinte forma: `javadoc -J-Xmx32m -J-Xms32m com.mypackage`. Esteja ciente de que `-Xms` é opcional porque ele apenas define o tamanho da memória inicial, o que é útil quando você sabe a quantidade mínima de memória necessária.

Não há espaço entre o J e a flag.

Use a opção `-version` para relatar a versão do JRE sendo usada para executar a ferramenta javadoc:

```bash
javadoc -J-version
```

`-locale name` Especifica a localidade que a ferramenta javadoc usa ao gerar a documentação. O argumento é o nome da localidade, conforme descrito na documentação de java.util.Locale, como `en_US` (Inglês, Estados Unidos) ou `en_US_WIN` (variante Windows).

A especificação de uma localidade faz com que a ferramenta `javadoc` escolha os arquivos de recurso dessa localidade para mensagens como strings na barra de navegação, títulos para listas e tabelas, conteúdo do arquivo de ajuda, comentários no arquivo `stylesheet.css`, e assim por diante. Ela também especifica a ordem de classificação para listas ordenadas alfabeticamente e o separador de frases para determinar o fim da primeira frase. A opção -locale não determina a localidade do texto do comentário de documentação especificado nos arquivos fonte das classes documentadas.

`-package` Mostra apenas classes e membros de pacote, protegidos e públicos.

`-private` Mostra todas as classes e membros.

`-protected` Mostra apenas classes e membros protegidos e públicos. Este é o padrão.

`-public` Mostra apenas as classes e membros públicos.

`-quiet` Desliga as mensagens para que apenas os avisos e erros apareçam, tornando-os mais fáceis de visualizar. Também suprime a string de versão.

`--show-members value` Especifica quais membros (campos ou métodos) são documentados, onde value pode ser qualquer um dos seguintes:

```
public
protected
package
private
```

`--show-module-contents value` Especifica a granularidade da documentação das declarações de módulo, onde value pode ser api ou all.

`--show-packages value` Especifica quais pacotes de módulos são documentados, onde value pode ser exported ou all packages.

`--show-types value` Especifica quais tipos (classes, interfaces, etc.) são documentados, onde value pode ser qualquer um dos seguintes:

```
public
protected
package
private
```

`-subpackages subpkglist` Gera documentação a partir de arquivos fonte nos pacotes especificados e recursivamente em seus subpacotes. Esta opção é útil ao adicionar novos subpacotes ao código fonte porque eles são incluídos automaticamente. Cada argumento de pacote é qualquer subpacote de nível superior (como java) ou pacote totalmente qualificado (como `javax.swing`) que não precisa conter arquivos fonte. Os argumentos são separados por dois pontos em todos os sistemas operacionais. Caracteres curinga não são permitidos. Use `-sourcepath` para especificar onde encontrar os pacotes. Esta opção não processa arquivos fonte que estão na árvore de origem, mas não pertencem aos pacotes.

Por exemplo, os seguintes comandos geram documentação para pacotes chamados java e `javax.swing` e todos os seus subpacotes:

**Linux e macOS:**

```bash
javadoc -subpackages java:javax.swing -sourcepath /home/src
```

**Windows:**

```bash
javadoc -subpackages java:javax.swing -sourcepath C:\home\src
```

`-verbose` Fornece mensagens mais detalhadas enquanto a ferramenta javadoc é executada. Sem a opção `-verbose`, as mensagens aparecem para carregar os arquivos fonte, gerar a documentação (uma mensagem por arquivo fonte) e ordenar. A opção -verbose faz com que mensagens adicionais sejam impressas, especificando o número de milissegundos para analisar cada arquivo fonte Java.

`--version` Imprime informações de versão.

## Opções Estendidas

As seguintes opções estendidas do javadoc são equivalentes às opções correspondentes do javac. Consulte Opções Extras em javac para descrições detalhadas de como usar essas opções: \--add-exports

As seguintes opções estendidas do javadoc não são equivalentes a uma opção javac correspondente:

`-Xmodule:module-name` Especifica um módulo ao qual as classes sendo compiladas pertencem.

`-Xold` Invoca a ferramenta javadoc legada.

## Opções do Doclet Padrão

As seguintes opções são fornecidas pelo doclet padrão.

`--add-stylesheet file` Adiciona um arquivo de folha de estilo adicional para a documentação gerada. Esta opção pode ser usada uma ou mais vezes para especificar folhas de estilo adicionais incluídas na documentação.

Exemplo de linha de comando:

```bash
javadoc --add-stylesheet file1 --add-stylesheet file2 com.mypackage
```

`--allow-script-in-comments` Permite JavaScript em opções e comentários

`-author` Inclui o texto @author na documentação gerada.

`-bottom html-code` Especifica o texto a ser colocado na parte inferior de cada arquivo de saída. O texto é colocado na parte inferior da página, abaixo da barra de navegação inferior. O texto pode conter tags HTML e espaços em branco, mas quando o fizer, o texto deve ser colocado entre aspas. Use caracteres de escape para quaisquer aspas internas dentro do texto.

`-charset name` Especifica o conjunto de caracteres HTML para este documento. O nome deve ser um nome MIME preferencial, conforme especificado no IANA Registry, Character Sets.

Por exemplo:

```bash
javadoc -charset "UTF-8" com.mypackage
```

Este comando insere a seguinte linha no cabeçalho de cada página gerada:

```html
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
```

A tag META é descrita no padrão HTML (4197265 e 4137321), HTML Document Representation.

`-d directory` Especifica o diretório de destino onde a ferramenta javadoc salva os arquivos HTML gerados. Se você omitir a opção -d, os arquivos serão salvos no diretório atual. O valor do diretório pode ser absoluto ou relativo ao diretório de trabalho atual. O diretório de destino é criado automaticamente quando a ferramenta javadoc é executada.

**Linux e macOS:** Por exemplo, o seguinte comando gera a documentação para o pacote `com.mypackage` e salva os resultados no diretório `/user/doc/`:

```bash
javadoc -d /user/doc com.mypackage
```

**Windows:** Por exemplo, o seguinte comando gera a documentação para o pacote `com.mypackage` e salva os resultados no diretório `\user\doc\`:

```bash
javadoc -d \user\doc com.mypackage
```

`-docencoding name` Especifica a codificação dos arquivos HTML gerados. O nome deve ser um nome MIME preferencial, conforme especificado no IANA Registry, Character Sets.

Três opções estão disponíveis para uso em um comando de codificação javadoc. A opção -encoding é usada para codificar os arquivos lidos pela ferramenta javadoc, enquanto as opções `-docencoding` e `-charset` são usadas para codificar os arquivos escritos pela ferramenta. Das três opções disponíveis, no máximo, apenas a opção de codificação de entrada e uma de saída são usadas em um único comando de codificação. Se você especificar ambas as opções de codificação de entrada e saída em um comando, elas devem ter o mesmo valor. Se você não especificar nenhuma opção de saída, a ferramenta assume a codificação de entrada por padrão.

Por exemplo:

```bash
javadoc -encoding "UTF-8" -docencoding "UTF-8" com.mypackage
```

`-docfilessubdirs` Copia recursivamente subdiretórios de doc-file.

`-doctitle html-code` Especifica o título a ser colocado próximo ao topo do arquivo de resumo da visão geral. O texto especificado na tag de título é colocado como um cabeçalho de nível um, centralizado, diretamente abaixo da barra de navegação superior. A tag de título pode conter tags HTML e espaços em branco, mas quando o fizer, você deve envolver o título entre aspas. Aspas adicionais dentro da tag de título devem ser escapadas. Por exemplo, javadoc -header "<b>My Library</b><br>v1.0" com.mypackage.

`-excludedocfilessubdir name` Exclui quaisquer subdiretórios de arquivos doc com o nome fornecido. Permite a cópia profunda de diretórios doc-files. Subdiretórios e todo o conteúdo são copiados recursivamente para o destino. Por exemplo, o diretório doc-files/example/images e todo o seu conteúdo são copiados. Há também uma opção para excluir subdiretórios.

`-footer html-code` Especifica o texto do rodapé a ser colocado na parte inferior de cada arquivo de saída. O valor html-code é colocado à direita da barra de navegação inferior. O valor html-code pode conter tags HTML e espaços em branco, mas quando o fizer, o valor html-code deve ser colocado entre aspas. Use caracteres de escape para quaisquer aspas internas dentro de um rodapé.

`--frames` Habilita o uso de frames na saída gerada (padrão).

`-group namep1:p2` Agrupa os pacotes especificados na página de Visão Geral.

`-header html-code` Especifica o texto do cabeçalho a ser colocado no topo de cada arquivo de saída. O cabeçalho é colocado à direita da barra de navegação superior. O cabeçalho pode conter tags HTML e espaços em branco, mas quando o fizer, o cabeçalho deve ser colocado entre aspas. Use caracteres de escape para aspas internas dentro de um cabeçalho. Por exemplo, javadoc -header "<b>My Library</b><br>v1.0" com.mypackage.

`-helpfile filename` Inclui o arquivo que se vincula ao link HELP nas barras de navegação superior e inferior. Sem esta opção, a ferramenta javadoc cria um arquivo de ajuda, help-doc.html, que é codificado na ferramenta javadoc. Esta opção permite que você substitua o padrão. O nome do arquivo pode ser qualquer nome e não está restrito a help-doc.html. A ferramenta javadoc ajusta os links na barra de navegação de acordo. Por exemplo:

**Linux e macOS:**

```bash
javadoc -helpfile /home/src/help-doc.html com.mypackage
```

**Windows:**

```bash
javadoc -helpfile C:\home\src\help-doc.html com.mypackage
```

`-html4` Gera saída HTML 4.0.1. A saída HTML 5 é o padrão.

`-html5` Gera saída HTML 5 (padrão).

`--javafx ou -javafx` Habilita a funcionalidade JavaFX.

`-keywords` Adiciona tags HTML de palavra-chave `<META>` ao arquivo gerado para cada classe. Essas tags podem ajudar os mecanismos de busca que procuram tags `<META>` a encontrar as páginas. A maioria dos mecanismos de busca que pesquisam toda a Internet não olham para as tags `<META>`, porque as páginas podem usá-las indevidamente. Os mecanismos de busca oferecidos por empresas que restringem suas pesquisas ao seu próprio site podem se beneficiar ao olhar para as tags `<META>`. As tags `<META>` incluem o nome totalmente qualificado da classe e os nomes não qualificados dos campos e métodos. Construtores não são incluídos porque são idênticos ao nome da classe. Por exemplo, a classe `String` começa com estas palavras-chave:

```html
<META NAME="keywords" CONTENT="java.lang.String class">
<META NAME="keywords" CONTENT="java.lang.String.charAt(int)">
```

`-link url` Cria links para documentação gerada pelo javadoc existente de classes referenciadas externamente. O argumento URL é o URL absoluto ou relativo do diretório que contém a documentação externa gerada pelo javadoc. Você pode especificar múltiplas opções `-link` em uma execução da ferramenta javadoc para vincular a múltiplos documentos. Um arquivo package-list ou element-list deve estar neste diretório url (caso contrário, use a opção `-linkoffline`).

Quando você usa a ferramenta `javadoc` para documentar pacotes, ela usa o arquivo `package-list` para determinar os pacotes declarados em uma API. Quando você gera documentos API para módulos, a ferramenta `javadoc` usa o arquivo `element-list` para determinar os módulos e pacotes declarados em uma API.

A ferramenta javadoc lê os nomes do arquivo de lista apropriado e então vincula aos pacotes ou módulos naquele URL. Quando a ferramenta javadoc é executada, o valor do URL é copiado para os links `<A HREF>` que são criados. Portanto, url deve ser o URL para o diretório e não para um arquivo. Você pode usar um link absoluto para url para permitir que seus documentos se vinculem a um documento em qualquer site, ou você pode usar um link relativo para vincular apenas a um local relativo.

Se você usar um link relativo, o valor que você passar deve ser o caminho relativo do diretório de destino (especificado com a opção -d) para o diretório contendo os pacotes aos quais está sendo vinculado. Ao especificar um link absoluto, você geralmente usa um link HTTP. No entanto, se você quiser vincular a um sistema de arquivos que não possui um servidor web, então você pode usar um link de arquivo. Use um link de arquivo apenas quando todos que desejam acessar a documentação gerada compartilham o mesmo sistema de arquivos. Em todos os casos, e em todos os sistemas operacionais, use uma barra como separador, seja o URL absoluto ou relativo, e https:, http: ou file: conforme especificado no URL Memo: Uniform Resource Locators.

`-linkoffline url1 url2` Esta opção é uma variação da opção `-link`. Ambas criam links para documentação gerada pelo javadoc para classes referenciadas externamente. Você pode especificar múltiplas opções `-linkoffline` em uma execução da ferramenta javadoc.

Use a opção `-linkoffline` quando:

*   Vinculando a um documento na web que a ferramenta javadoc não consegue acessar através de uma conexão web.
*   O arquivo `package-list` ou element-list do documento externo não está acessível ou não existe no local do URL, mas existe em um local diferente e pode ser especificado pelo arquivo `package-list` ou `element-list` (tipicamente local).

Se url1 for acessível apenas na World Wide Web, então a opção `-linkoffline` remove a restrição de que a ferramenta javadoc deve ter uma conexão web para gerar documentação.

Outro uso da opção `-linkoffline` é como uma solução alternativa para atualizar documentos. Depois de executar a ferramenta javadoc em um conjunto completo de pacotes ou módulos, você pode executar a ferramenta javadoc novamente em um conjunto menor de pacotes ou módulos alterados, para que os arquivos atualizados possam ser inseridos de volta no conjunto original.

Por exemplo, a opção `-linkoffline` aceita dois argumentos. O primeiro é para a string a ser incorporada nos links `<a href>`, e o segundo informa à ferramenta javadoc onde encontrar o arquivo package-list ou element-list.

O valor url1 ou url2 é o URL absoluto ou relativo do diretório que contém a documentação externa gerada pelo javadoc à qual você deseja vincular. Quando relativo, o valor deve ser o caminho relativo do diretório de destino (especificado com a opção -d) para a raiz dos pacotes aos quais está sendo vinculado. Veja url na opção -link.

`-linksource` Cria uma versão HTML de cada arquivo fonte (com números de linha) e adiciona links para eles a partir da documentação HTML padrão. Links são criados para classes, interfaces, construtores, métodos e campos cujas declarações estão em um arquivo fonte. Caso contrário, links não são criados, como para construtores padrão e classes geradas.

Esta opção expõe todos os detalhes de implementação privados nos arquivos fonte incluídos, incluindo classes privadas, campos privados e os corpos de métodos privados, independentemente das opções `-public`, `-package`, `-protected` e `-private`. A menos que você também use a opção -private, nem todas as classes ou interfaces privadas são acessíveis através de links.

Cada link aparece no nome do identificador em sua declaração. Por exemplo, o link para o código fonte da classe Button estaria na palavra `Button`:

```java
public class Button extends Component implements Accessible
```

O link para o código fonte do método `getLabel` na classe `Button` está na palavra `getLabel`:

```java
public String getLabel()
```

`--main-stylesheet file` ou `-stylesheetfile file` Especifica o caminho de um arquivo de folha de estilo alternativo que contém as definições para os estilos CSS usados na documentação gerada. Esta opção permite que você substitua o padrão. Se você não especificar a opção, a ferramenta javadoc criará e usará uma folha de estilo padrão. O nome do arquivo pode ser qualquer nome e não está restrito a `stylesheet.css`. A opção `--main-stylesheet` é a forma preferida.

Exemplo de linha de comando:

```bash
javadoc --main-stylesheet mystylesheet.css com.mypackage
```

`-nocomment` Suprime todo o corpo do comentário, incluindo a descrição principal e todas as tags, e gera apenas declarações. Esta opção permite que você reutilize arquivos fonte que foram originalmente destinados a um propósito diferente, para que você possa produzir documentação HTML esqueleto durante os estágios iniciais de um novo projeto.

`-nodeprecated` Impede a geração de qualquer API obsoleta na documentação. Isso faz o que a opção -nodeprecatedlist faz, e não gera nenhuma API obsoleta em todo o resto da documentação. Isso é útil ao escrever código quando você não quer ser distraído pelo código obsoleto.

`-nodeprecatedlist` Impede a geração do arquivo que contém a lista de APIs obsoletas (deprecated-list.html) e o link na barra de navegação para essa página. A ferramenta javadoc continua a gerar a API obsoleta em todo o resto do documento. Isso é útil quando seu código fonte não contém APIs obsoletas e você deseja tornar a barra de navegação mais limpa.

`--no-frames` Desabilita o uso de frames na saída gerada.

`-nohelp` Omite o link HELP nas barras de navegação na parte superior e inferior de cada página de saída.

`-noindex` Omite o índice dos documentos gerados. O índice é produzido por padrão.

`-nonavbar` Impede a geração da barra de navegação, cabeçalho e rodapé, que geralmente são encontrados na parte superior e inferior das páginas geradas. A opção -nonavbar não afeta a opção -bottom. A opção -nonavbar é útil quando você está interessado apenas no conteúdo e não precisa de navegação, como quando você está convertendo os arquivos para PostScript ou PDF apenas para impressão.

`-noqualifier name1:name2...` Exclui a lista de qualificadores da saída. O nome do pacote é removido de locais onde nomes de classes ou interfaces aparecem.

*   O exemplo a seguir omite todos os qualificadores de pacote: `-noqualifier` all.
*   O exemplo a seguir omite os qualificadores de pacote java.lang e java.io: `-noqualifier java.lang:java.io`.
*   O exemplo a seguir omite qualificadores de pacote começando com java e subpacotes com.sun, mas não javax: `-noqualifier java.*:com.sun.*`.

Onde um qualificador de pacote apareceria devido ao comportamento anterior, o nome pode ser adequadamente encurtado. Esta regra está em vigor independentemente de a opção `-noqualifier` ser usada ou não.

`-nosince` Omite dos documentos gerados as seções Since associadas às tags @since.

`-notimestamp` Suprime o carimbo de data/hora, que está oculto em um comentário HTML no HTML gerado perto do topo de cada página. A opção -notimestamp é útil quando você deseja executar a ferramenta javadoc em duas bases de código fonte e obter as diferenças entre elas, porque impede que os carimbos de data/hora causem uma diferença (o que de outra forma seria uma diferença em cada página). O carimbo de data/hora inclui o número de lançamento da ferramenta javadoc.

`-notree` Omite as páginas de hierarquia de classes e interfaces dos documentos gerados. Estas são as páginas que você acessa usando o botão Tree na barra de navegação. A hierarquia é produzida por padrão.

`--override-methods (detail|summary)` Documenta métodos sobrescritos nas seções de detalhes ou resumo.

`-overview filename` Especifica que a ferramenta javadoc deve recuperar o texto para a documentação de visão geral do arquivo fonte especificado por filename e colocá-lo na página de Visão Geral (overview-summary.html). Um caminho relativo especificado com o nome do arquivo é relativo ao diretório de trabalho atual.

Embora você possa usar qualquer nome que desejar para o valor filename e colocá-lo em qualquer lugar que desejar para o caminho, é típico nomeá-lo overview.html e colocá-lo na árvore de origem no diretório que contém os diretórios de pacote de nível superior. Nesta localização, nenhum caminho é necessário ao documentar pacotes, porque a opção -sourcepath aponta para este arquivo.

**Linux e macOS:** Por exemplo, se a árvore de origem para o pacote java.lang for `/src/classes/java/lang/`, então você poderia colocar o arquivo de visão geral em `/src/classes/overview.html`.

**Windows:** Por exemplo, se a árvore de origem para o pacote java.lang for `\src\classes\java\lang\`, então você poderia colocar o arquivo de visão geral em `\src\classes\overview.html`

A página de visão geral é criada apenas quando você passa dois ou mais nomes de pacotes para a ferramenta javadoc. O título na página de visão geral é definido por `-doctitle`.

`-serialwarn` Gera avisos em tempo de compilação para tags `@serial` ausentes. Por padrão, o javadoc não gera avisos de serialização. Use esta opção para exibir os avisos de serialização, o que ajuda a documentar corretamente campos serializáveis padrão e métodos writeExternal.

`-sourcetab tablength` Especifica o número de espaços que cada tabulação usa na fonte.

`-splitindex` Divide o arquivo de índice em múltiplos arquivos, alfabeticamente, um arquivo por letra, mais um arquivo para quaisquer entradas de índice que começam com símbolos não alfabéticos.

`-tag name:locations:header` Especifica tags personalizadas de argumento único. Para que a ferramenta `javadoc` verifique a ortografia dos nomes das tags, é importante incluir uma opção `-tag` para cada tag personalizada presente no código fonte, desabilitando (com X) aquelas que não estão sendo exibidas na execução atual. Os dois pontos `:` são sempre o separador. A opção `-tag` exibe o cabeçalho da tag, header, em negrito, seguido na próxima linha pelo texto de seu único argumento. Semelhante a qualquer tag de bloco, o texto do argumento pode conter tags inline, que também são interpretadas. A saída é semelhante às tags padrão de um argumento, como as tags `@return` e @author. Omitir um valor de cabeçalho faz com que o nome da tag seja o cabeçalho.

`-taglet class` Especifica o nome totalmente qualificado do taglet usado na geração da documentação para essa tag. Use o nome totalmente qualificado para o valor da classe. Este taglet também define o número de argumentos de texto que a tag personalizada possui. O taglet aceita esses argumentos, os processa e gera a saída.

Taglets são úteis para tags de bloco ou inline. Elas podem ter qualquer número de argumentos e implementar comportamentos personalizados, como deixar o texto em negrito, formatar marcadores, escrever o texto em um arquivo ou iniciar outros processos. Taglets podem apenas determinar onde uma tag deve aparecer e em que formato. Todas as outras decisões são tomadas pelo doclet. Um taglet não pode fazer coisas como remover um nome de classe da lista de classes incluídas. No entanto, ele pode executar efeitos colaterais, como imprimir o texto da tag em um arquivo ou acionar outro processo. Use a opção -tagletpath para especificar o caminho para o taglet. O exemplo a seguir insere o taglet To Do após Parameters e antes de Throws nas páginas geradas.

```bash
javadoc -taglet com.sun.tools.doclets.ToDoTaglet -tagletpath /home/taglets com.mypackage
```

Alternativamente, você pode usar a opção -taglet no lugar de sua -tag opção, mas isso pode ser difícil de ler.

`-tagletpath tagletpathlist` Especifica os caminhos de busca para encontrar arquivos de classe taglet. O `tagletpathlist` pode conter múltiplos caminhos, separando-os com dois pontos `:`. A ferramenta `javadoc` busca em todos os subdiretórios dos caminhos especificados.

`-top html-code` Especifica o texto a ser colocado no topo de cada arquivo de saída.

`-use` Cria páginas de uso de classes e pacotes. Inclui uma página de Uso para cada classe e pacote documentado. A página descreve quais pacotes, classes, métodos, construtores e campos usam qualquer API da classe ou pacote especificado. Dada a classe C, coisas que usam a classe C incluiriam subclasses de C, campos declarados como C, métodos que retornam C, e métodos e construtores com parâmetros do tipo C. Por exemplo, você pode olhar a página de Uso para o tipo String. Como o método `getName` na classe `java.awt.Font` retorna o tipo `String`, o método `getName` usa `String` e, portanto, o método `getName` aparece na página de Uso para `String`. Isso documenta apenas os usos da API, não a implementação. Quando um método usa String em sua implementação, mas não aceita uma string como argumento ou retorna uma string, isso não é considerado um uso de String. Para acessar a página de Uso gerada, vá para a classe ou pacote e clique no link Use na barra de navegação.

`-version` Inclui o texto da versão na documentação gerada. Este texto é omitido por padrão. Para descobrir qual versão da ferramenta javadoc você está usando, use a opção -J-version.

`-windowtitle title` Especifica o título a ser colocado na tag HTML `<title>`. O texto especificado na tag de título aparece no título da janela e em quaisquer favoritos do navegador (lugares favoritos) que alguém crie para esta página. Este título não deve conter nenhuma tag HTML porque o navegador não as interpreta corretamente. Use caracteres de escape em quaisquer aspas internas dentro da tag de título. Se a opção `-windowtitle` for omitida, a ferramenta javadoc usa o valor da opção `-doctitle` para a opção `-windowtitle`. Por exemplo, `javadoc -windowtitle "My Library" com.mypackage`.
## Opções Adicionais Fornecidas pelo Doclet Padrão

As seguintes são opções adicionais fornecidas pelo doclet padrão e estão sujeitas a alterações sem aviso prévio. Opções adicionais podem ser menos comumente usadas ou são consideradas avançadas.

`-Xdoclint` Habilita verificações recomendadas para problemas em comentários Javadoc.

`-Xdoclint:(all|none|[-]group)` Habilita ou desabilita verificações específicas para referências inválidas, falta de acessibilidade, comentários javadoc ausentes e relata erros para sintaxe javadoc inválida e tags HTML ausentes.

Esta opção permite que a ferramenta `javadoc` verifique todos os comentários de documentação incluídos na saída gerada. Você pode selecionar quais itens incluir na saída gerada com as opções padrão `-public`, `-protected`, `-package` e `-private`.

Quando `-Xdoclint` está habilitado, ele relata problemas com mensagens semelhantes ao comando `javac`. A ferramenta `javadoc` imprime uma mensagem, uma cópia da linha de origem e um acento circunflexo apontando para a posição exata onde o erro foi detectado. As mensagens podem ser avisos ou erros, dependendo de sua gravidade e da probabilidade de causar um erro se a documentação gerada fosse executada por um validator. Por exemplo, referências inválidas ou comentários javadoc ausentes não fazem com que a ferramenta `javadoc` gere HTML inválido, então esses problemas são relatados como avisos. Erros de sintaxe ou tags de fechamento HTML ausentes fazem com que a ferramenta `javadoc` gere saída inválida, então esses problemas são relatados como erros.

A opção `-Xdoclint` valida os comentários de entrada com base na markup solicitada.

Por padrão, a opção `-Xdoclint` está habilitada. Desabilite-a com a opção `-Xdoclint:none`.

As seguintes opções alteram o que a opção `-Xdoclint` relata:

A variável `group` tem um dos seguintes valores:

  * `accessibility`: Verifica problemas a serem detectados por um verificador de acessibilidade (por exemplo, nenhum atributo `caption` ou `summary` especificado em uma tag `<table>`).

  * `html`: Detecta problemas HTML de alto nível, como colocar `block elements` dentro de `inline elements`, ou não fechar `elements` que exigem uma `end tag`. As regras são derivadas da `HTML 4 Specification` ou da `HTML 5 Specification` com base na geração de saída HTML do doclet padrão selecionada. Este tipo de verificação permite que a ferramenta `javadoc` detecte problemas HTML que alguns `browsers` podem não interpretar como pretendido.

  * `missing`: Verifica comentários ou tags Javadoc ausentes (por exemplo, um comentário ou `class` ausente, ou uma tag `@return` ausente ou tag similar em um `method`).

  * `reference`: Verifica problemas relacionados às referências a `Java API elements` de `javadoc tags` (por exemplo, um item não encontrado em `@see` ou um nome inválido após `@param`).

  * `syntax`: Verifica problemas de baixo nível como colchetes angulares não escapados `<` e `>` e e-comerciais `&` e `javadoc tags` inválidas.

Você pode especificar a opção `-Xdoclint` várias vezes para habilitar a opção de verificar erros e avisos em várias categorias. Alternativamente, você pode especificar várias categorias de erro e aviso usando as opções precedentes. Por exemplo, use qualquer um dos seguintes comandos para verificar problemas de HTML, `syntax` e `accessibility` no arquivo `filename`.

`-Xdoclint/package:([-]) packages` Habilita ou desabilita verificações em `packages` específicos. `packages` é uma lista separada por vírgulas de `package specifiers`. Um `package specifier` é um `qualified name` de um `package` ou um prefixo de nome de `package` seguido por `*`, que se expande para todos os `sub packages` do `package` fornecido. Prefixe o `package specifier` com um traço (-) para desabilitar verificações para os `packages` especificados.

`-Xdocrootparent url` Substitui todos os itens `@docRoot` seguidos por `/..` em comentários `javadoc` pela `url`.

### Neste tutorial

Introduzindo `javadoc` Sinopse Descrição Conformidade Opções para `Javadoc` Opções Estendidas Opções do Doclet Padrão Opções Adicionais Fornecidas pelo Doclet Padrão

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Javap - o Desassemblador](<#/doc/tutorials/jvm/tools/core/javap>)

➜

**Tutorial Atual**

Javadoc - o Gerador de Documentação

➜

**Próximo na Série**

[Java - Seu Lançador de Aplicações](<#/doc/tutorials/jvm/tools/core/java>)

**Anterior na Série:** [Javap - o Desassemblador](<#/doc/tutorials/jvm/tools/core/javap>)

**Próximo na Série:** [Java - Seu Lançador de Aplicações](<#/doc/tutorials/jvm/tools/core/java>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas Core do JDK ](<#/doc/tutorials/jvm/tools/core>) > Javadoc - o Gerador de Documentação