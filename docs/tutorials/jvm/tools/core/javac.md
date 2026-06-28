# Javac - o Compilador

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas Essenciais do JDK ](<#/doc/tutorials/jvm/tools/core>) > Javac - o Compilador 

**Anterior na Série**

[Introdução às Ferramentas Essenciais do JDK](<#/doc/tutorials/jvm/tools/core/intro>)

➜

**Tutorial Atual**

Javac - o Compilador

➜

**Próximo na Série**

[Javap - o Desmontador](<#/doc/tutorials/jvm/tools/core/javap>)

**Anterior na Série:** [Introdução às Ferramentas Essenciais do JDK](<#/doc/tutorials/jvm/tools/core/intro>)

**Próximo na Série:** [Javap - o Desmontador](<#/doc/tutorials/jvm/tools/core/javap>)

# Javac - o Compilador

Você pode usar as ferramentas e comandos fundamentais do JDK para criar e construir aplicações. As seções a seguir descrevem as ferramentas e comandos que você pode usar para criar e construir aplicações:

 

## Introdução ao javac

[javac](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/javac.html>) - lê definições de classes e interfaces Java e as compila em bytecode e arquivos .class

**_options_** Opções de linha de comando.

**_sourcefiles_** Um ou mais arquivos fonte a serem compilados (como MyClass.java) ou processados para anotações (como MyPackage.MyClass).

 

## Descrição

O comando `javac` lê definições de classes e interfaces, escritas na linguagem de programação Java, e as compila em arquivos .class de bytecode. O comando `javac` também pode processar anotações em arquivos fonte e classes Java.

Uma variável de ambiente do launcher, `JDK_JAVAC_OPTIONS`, foi introduzida no JDK 9 que prefixava seu conteúdo à linha de comando para `javac`.

Existem duas maneiras de passar nomes de arquivos de código fonte para `javac`:

  * Para um pequeno número de arquivos fonte, você pode listar os nomes dos arquivos na linha de comando.
  * Para um grande número de arquivos fonte, você pode usar a opção `@filename` na linha de comando do `javac` para incluir um arquivo que lista os nomes dos arquivos fonte.



Os nomes dos arquivos de código fonte devem ter sufixos `.java`, os nomes dos arquivos .class devem ter sufixos `.class`, e ambos os arquivos fonte e .class devem ter nomes raiz que identifiquem a classe. Por exemplo, uma classe chamada `MyClass` seria escrita em um arquivo fonte chamado `MyClass.java`. 

Ela seria compilada em um arquivo .class de bytecode chamado `MyClass.class`.

Seu diretório deve conter o arquivo fonte e o arquivo .class compilado. 

Definições de classes internas produzem arquivos .class adicionais. Esses arquivos .class têm nomes que combinam os nomes das classes interna e externa, como `MyClass$MyInnerClass.class`.

Você deve organizar os arquivos fonte em uma árvore de diretórios que reflita sua árvore de pacotes. Por exemplo:

  * **Linux e macOS** : Se todos os seus arquivos fonte estiverem em `/workspace`, então coloque o código fonte para `com.mysoft.mypack.MyClass` em `/workspace/com/mysoft/mypack/MyClass.java`.
  * **Windows** : Se todos os seus arquivos fonte estiverem em `\workspace`, então coloque o código fonte para `com.mysoft.mypack.MyClass` em `\workspace\com\mysoft\mypack\MyClass.java`.



Por padrão, o compilador coloca cada arquivo .class no mesmo diretório que seu arquivo fonte. Você pode especificar um diretório de destino separado com a opção `-d` descrita em [Opções Padrão](<#/doc/tutorials/jvm/tools/core/javac>).

 

## Interface Programática

O comando `javac` suporta a nova API do Compilador Java definida pelas classes e interfaces no pacote [`javax.tools`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.compiler/javax/tools/package-summary.html>).

 

## Arquivos Fonte Carregados Implicitamente

Para compilar um conjunto de arquivos fonte, o compilador pode precisar carregar implicitamente arquivos fonte adicionais. Tais arquivos atualmente não estão sujeitos ao processamento de anotações. Por padrão, o compilador emite um aviso quando o processamento de anotações ocorre e quaisquer arquivos fonte carregados implicitamente são compilados. A opção `-implicit` fornece uma maneira de suprimir o aviso.

 

## Usando a Variável de Ambiente JDK_JAVAC_OPTIONS

O conteúdo da variável de ambiente `JDK_JAVAC_OPTIONS`, separado por espaços em branco ` ` ou caracteres de espaço em branco (`\n`, `\t`, `\r`, ou `\f`), é prefixado aos argumentos da linha de comando passados para `javac` como uma lista de argumentos.

O requisito de codificação para a variável de ambiente é o mesmo que o da linha de comando do `javac` no sistema. O conteúdo da variável de ambiente `JDK_JAVAC_OPTIONS` é tratado da mesma forma que o especificado na linha de comando.

Aspas simples `'` ou aspas duplas `"` podem ser usadas para envolver argumentos que contêm caracteres de espaço em branco. Todo o conteúdo entre a aspa de abertura e a primeira aspa de fechamento correspondente é preservado simplesmente removendo o par de aspas. Caso uma aspa correspondente não seja encontrada, o launcher abortará com uma mensagem de erro. `@files` são suportados como são especificados na linha de comando. No entanto, assim como em `@files`, o uso de um curinga não é suportado:

### Visão Geral das Opções do javac

O compilador possui conjuntos de opções padrão e opções de compilação cruzada que são suportadas no ambiente de desenvolvimento atual. O compilador também possui um conjunto de opções não padrão que são específicas para a máquina virtual e implementações do compilador atuais, mas estão sujeitas a alterações no futuro. As opções não padrão começam com `-X` . Os diferentes conjuntos de opções do `javac` são descritos nas seções a seguir:

  * [Opções Padrão](<#/doc/tutorials/jvm/tools/core/javac>)
  * [Opções de Compilação Cruzada para javac](<#/doc/tutorials/jvm/tools/core/javac>)
  * [Opções Extras](<#/doc/tutorials/jvm/tools/core/javac>)



 

## Opções Padrão

`@filename` Lê opções e nomes de arquivos de um arquivo. Para encurtar ou simplificar o comando `javac`, você pode especificar um ou mais arquivos que contêm argumentos para o comando `javac` (exceto opções `-J`). Isso permite criar comandos `javac` de quase qualquer comprimento (ainda existem limites) em qualquer sistema operacional.

`-Akey[=value]` Especifica opções a serem passadas para processadores de anotação. Essas opções não são interpretadas diretamente pelo `javac`, mas são disponibilizadas para uso por processadores individuais. O valor de key deve ser um ou mais identificadores separados por um ponto `.`.

`--add-modules module,module` Especifica módulos raiz a serem resolvidos além dos módulos iniciais, ou todos os módulos no module path se module for `ALL-MODULE-PATH`.

`--boot-class-path path` ou `-bootclasspath path` Substitui o local dos arquivos .class de bootstrap.

`--class-path path`, `-classpath path`, ou `-cp path` Especifica onde encontrar arquivos .class do usuário e processadores de anotação. Este classpath substitui o classpath do usuário na variável de ambiente `CLASSPATH`:

  * Se `--class-path`, `-classpath`, ou `-cp` não forem especificados, então o classpath do usuário é o diretório atual.
  * Se a opção `-sourcepath` não for especificada, então o classpath do usuário também é pesquisado por arquivos fonte.
  * Se a opção `-processorpath` não for especificada, então o classpath também é pesquisado por processadores de anotação.



`-d directory` Define o diretório de destino para arquivos .class. Se uma classe faz parte de um pacote, então o `javac` coloca o arquivo .class em um subdiretório que reflete o nome do pacote e cria diretórios conforme necessário. Por exemplo:

  * **Linux e macOS** : Se você especificar `-d /home/myclasses` e a classe for chamada `com.mypackage.MyClass`, então o arquivo .class será `/home/myclasses/com/mypackage/MyClass.class`.
  * **Windows** : Se você especificar `-d C:\myclasses` e a classe for chamada `com.mypackage.MyClass`, então o arquivo .class será `C:\myclasses\com\mypackage\MyClass.class`.



`-deprecation` Mostra uma descrição de cada uso ou sobrescrita de um membro ou classe depreciado. Sem a opção `-deprecation`, o `javac` mostra um resumo dos arquivos fonte que usam ou sobrescrevem membros ou classes depreciados. A opção `-deprecation` é um atalho para `-Xlint:deprecation`.

`--enable-preview` Habilita recursos de linguagem de pré-visualização. Usado em conjunto com `-source` ou `--source` ou `--release`. 

`-encoding encoding` Especifica a codificação de caracteres usada pelos arquivos fonte, como EUC-JP e UTF-8. Se a opção `-encoding` não for especificada, então a codificação padrão da plataforma é usada.

`-endorseddirs directories` Substitui o local do caminho de padrões endossados.

`-extdirs directories` Substitui o local das extensões instaladas. A variável directories é uma lista de diretórios separados por dois pontos. Cada arquivo JAR nos diretórios especificados é pesquisado por arquivos .class. Todos os arquivos JAR encontrados tornam-se parte do classpath.

`-g` Gera todas as informações de depuração, incluindo variáveis locais. Por padrão, apenas informações de número de linha e arquivo fonte são geradas.

`-g:[lines, vars, source]` Gera apenas os tipos de informações de depuração especificados pela lista de palavras-chave separadas por vírgulas. As palavras-chave válidas são:

  * `lines` - Informações de depuração de número de linha.
  * `vars` - Informações de depuração de variáveis locais.
  * `source` - Informações de depuração de arquivo fonte.



`-g:none` não gera informações de depuração.

`-h directory` Especifica onde colocar os arquivos de cabeçalho nativos gerados.

Quando você especifica esta opção, um arquivo de cabeçalho nativo é gerado para cada classe que contém métodos nativos ou que possui uma ou mais constantes anotadas com a anotação [`java.lang.annotation.Native`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/Native.html>). Se a classe faz parte de um pacote, então o compilador coloca o arquivo de cabeçalho nativo em um subdiretório que reflete o nome do pacote e cria diretórios conforme necessário.

`--help, –help` ou `-?` Imprime um resumo das opções padrão.

`--help-extra` ou `-X` Imprime a ajuda para opções extras.

`--help-lint` Imprime as chaves suportadas para a opção `-Xlint`.

`-implicit:[none, class]` Especifica se deve ou não gerar arquivos .class para arquivos referenciados implicitamente:

`-implicit:class` Gera arquivos .class automaticamente.

`-implicit:none` Suprime a geração de arquivos .class. Se esta opção não for especificada, então o padrão gera arquivos .class automaticamente. Neste caso, o compilador emite um aviso se quaisquer arquivos .class forem gerados ao fazer também o processamento de anotações. O aviso não é emitido quando a opção `-implicit` é explicitamente definida. Veja a seção [`Buscando Tipos`](<#/doc/tutorials/jvm/tools/core/javac>).

`-Joption` Passa option para o sistema de tempo de execução, onde option é uma das opções Java descritas no comando `java`. Por exemplo, `-J-Xms48m` define a memória de inicialização para 48 MB.

`--limit-modules module,module*` Limita o universo de módulos observáveis.

`--module module-name` ou `-m module-name` Compila apenas o módulo especificado e verifica os carimbos de data/hora.

`--module-path path` ou `-p path` Especifica onde encontrar módulos de aplicação.

`--module-source-path module-source-path` Especifica onde encontrar arquivos fonte de entrada para múltiplos módulos.

`--module-version version` Especifica a versão dos módulos que estão sendo compilados.

`-nowarn` Desabilita mensagens de aviso. Esta opção funciona da mesma forma que a opção `-Xlint:none`.

`-parameters` Gera metadados para reflexão sobre parâmetros de método. Armazena nomes de parâmetros formais de construtores e métodos no arquivo .class gerado para que o método [`java.lang.reflect.Executable.getParameters()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Executable.html#getParameters\(\)>) da Reflection API possa recuperá-los. Você pode aprender mais sobre a Reflection API nesta [seção](<#/doc/tutorials/reflection>). 

`-proc:[none, only]` Controla se o processamento de anotações e a compilação são realizados. `-proc:none` significa que a compilação ocorre sem processamento de anotações. `-proc:only` significa que apenas o processamento de anotações é feito, sem qualquer compilação subsequente.

`-processor class1[,class2,class3...]` Nomes dos processadores de anotação a serem executados. Isso ignora o processo de descoberta padrão.

`--processor-module-path path` Especifica o module path usado para encontrar processadores de anotação.

`--processor-path path` ou `-processorpath path` Especifica onde encontrar processadores de anotação. Se esta opção não for usada, então o classpath é pesquisado por processadores.

`-profile profile` Verifica se a API usada está disponível no perfil especificado.

`--release release` Compila contra a API pública, suportada e documentada para uma versão específica da VM.

`-s directory` Especifica o diretório usado para colocar os arquivos fonte gerados. Se uma classe faz parte de um pacote, então o compilador coloca o arquivo fonte em um subdiretório que reflete o nome do pacote e cria diretórios conforme necessário. Por exemplo:

  * **Linux e macOS** : Se você especificar `-s /home/mysrc` e a classe for chamada `com.mypackage.MyClass`, então o arquivo fonte é colocado em `/home/mysrc/com/mypackage/MyClass.java`.
  * **Windows** : Se você especificar `-s C:\mysrc` e a classe for chamada `com.mypackage.MyClass`, então o arquivo fonte é colocado em `C:\mysrc\com\mypackage\MyClass.java`.



`--source <release>`, `-source <release>` Fornece compatibilidade de código fonte com a versão especificada do Java SE. As versões suportadas dependem da versão do JDK que você está usando. Geralmente é qualquer versão >= 8 e até a versão do JDK instalada.

`--source-path path` ou `-sourcepath path` Especifica onde encontrar arquivos fonte de entrada. Este é o source path usado para procurar definições de classes ou interfaces. Assim como no classpath do usuário, as entradas do source path são separadas por dois pontos (`:`) no Linux e macOS e ponto e vírgula (`;`) no Windows. Podem ser diretórios, arquivos JAR ou arquivos ZIP. Se pacotes forem usados, então o nome do caminho local dentro do diretório ou arquivo deve refletir o nome do pacote.

`--system jdk | none` Substitui o local dos módulos do sistema.

`-target release` Gera arquivos .class para uma versão específica da VM.

`--upgrade-module—path path` Substitui o local dos módulos atualizáveis.

`-verbose` Exibe mensagens sobre o que o compilador está fazendo. As mensagens incluem informações sobre cada classe carregada e cada arquivo fonte compilado.

`--version` ou `-version` Imprime informações de versão.

`-Werror` Termina a compilação quando ocorrem avisos.

 

## Opções de Compilação Cruzada para javac

Por padrão, para versões anteriores ao JDK 9, as classes eram compiladas contra as classes de bootstrap da plataforma que vinha com o comando `javac`. Mas o `javac` também suporta compilação cruzada, na qual as classes são compiladas contra classes de bootstrap de uma implementação de plataforma Java diferente. É importante usar as opções `-bootclasspath` e `-extdirs` ao compilar cruzadamente.

 

## Opções Extras

`--add-exports module/package=other-module(,other-module)*` Especifica um pacote a ser considerado como exportado de seu módulo definidor para módulos adicionais ou para todos os módulos sem nome quando o valor de other-module for `ALL-UNNAMED`.

`--add-reads module=other-module(,other-module)*` Especifica módulos adicionais a serem considerados como exigidos por um determinado módulo.

`--default-module-for-created-files module-name` Especifica o módulo de destino de fallback para arquivos criados por processadores de anotação, se nenhum for especificado ou inferido.

`-Djava.endorsed.dirs=dirs` Substitui o local do caminho de padrões endossados.

`-Djava.ext.dirs=dirs` Substitui o local das extensões instaladas.

`--patch-module module=file(:file)*` Substitui ou aumenta um módulo com classes e recursos em arquivos JAR ou diretórios.

`-Xbootclasspath:path` Substitui o local dos arquivos .class de bootstrap. 

> Isso só pode ser usado ao compilar para versões anteriores ao JDK 9. Conforme aplicável, veja as descrições em `--release`, `-source`, ou `-target` para detalhes.

`-Xbootclasspath/a:path` Adiciona um sufixo ao bootstrap class path.

> Isso só pode ser usado ao compilar para versões anteriores ao JDK 9. Conforme aplicável, veja as descrições em `--release`, `-source`, ou `-target` para detalhes.

`-Xbootclasspath/p:path` Adiciona um prefixo ao bootstrap class path.

> Isso só pode ser usado ao compilar para versões anteriores ao JDK 9. Conforme aplicável, veja as descrições em `--release`, `-source`, ou `-target` para detalhes.

`-Xdiags:[compact, verbose]` Seleciona um modo de diagnóstico.

`-Xdoclint` Habilita verificações recomendadas para problemas em comentários javadoc.

`-Xdoclint:(all|none|[-]group)[/access]` Habilita ou desabilita grupos específicos de verificações.

`group` pode ter um dos seguintes valores: `accessibility`, `html`, `missing`, `reference`, `syntax`

`access` especifica o nível mínimo de visibilidade de classes e membros que a opção `-Xdoclint` verifica. Pode ter um dos seguintes valores (em ordem do mais para o menos visível): `public`, `protected`, `package`, `private`. O nível de acesso padrão é `private`.

Para mais informações sobre esses grupos de verificações, veja a opção `-Xdoclint` do comando [javadoc](<#/doc/tutorials/jvm/tools/core/javadoc>). A opção `-Xdoclint` é desabilitada por padrão no comando `javac`.

Por exemplo, a seguinte opção verifica classes e membros (com todos os grupos de verificações) que têm o nível de acesso protected e superior (o que inclui protected e public):

`-Xdoclint/package:[-]packages(,[-]package)*` Habilita ou desabilita verificações em pacotes específicos. Cada pacote é o nome qualificado de um pacote ou um prefixo de nome de pacote seguido por um ponto e asterisco (`*`), que se expande para todos os subpacotes do pacote dado. Cada pacote pode ser prefixado com um hífen (`-`) para desabilitar verificações para um pacote ou pacotes especificados.

`-Xlint` Habilita todos os avisos recomendados. Nesta versão, habilitar todos os avisos disponíveis é recomendado.

`-Xlint:[-]key(,[-]key)*` Fornece avisos para habilitar ou desabilitar, separados por vírgula (`,`). Preceda uma key por um hífen (`-`) para desabilitar o aviso especificado.

Os valores suportados para key são:

  * `all`: Habilita todos os avisos.
  * `auxiliaryclass`: Avisa sobre uma classe auxiliar que está oculta em um arquivo fonte e é usada por outros arquivos.
  * `cast`: Avisa sobre o uso de casts desnecessários.
  * `classfile`: Avisa sobre problemas relacionados ao conteúdo do classfile.
  * `deprecation`: Avisa sobre o uso de itens depreciados.
  * `dep-ann`: Avisa sobre itens marcados como depreciados no javadoc, mas sem a anotação [`@ Deprecated`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Deprecated.html>).
  * `divzero`: Avisa sobre a divisão por uma constante inteira 0.
  * `empty`: Avisa sobre uma instrução vazia após um if.
  * `exports`: Avisa sobre problemas relacionados às exportações de módulos.
  * `fallthrough`: Avisa sobre a passagem de um caso de uma instrução switch para o próximo.
  * `finally`: Avisa sobre cláusulas finally que não terminam normalmente.
  * `module`: Avisa sobre problemas relacionados ao sistema de módulos.
  * `opens`: Avisa sobre problemas relacionados às aberturas de módulos.
  * `options`: Avisa sobre problemas relacionados ao uso de opções de linha de comando.
  * `overloads`: Avisa sobre problemas relacionados a sobrecargas de método.
  * `overrides`: Avisa sobre problemas relacionados a sobrescritas de método.
  * `path`: Avisa sobre elementos de caminho inválidos na linha de comando.
  * `processing`: Avisa sobre problemas relacionados ao processamento de anotações.
  * `rawtypes`: Avisa sobre o uso de tipos brutos (raw types).
  * `removal`: Avisa sobre o uso de uma API que foi marcada para remoção.
  * `requires-automatic`: Avisa os desenvolvedores sobre o uso de módulos automáticos em cláusulas requires.
  * `requires-transitive-automatic`: Avisa sobre módulos automáticos em requires transitive.
  * `serial`: Avisa sobre classes serializáveis que não fornecem um ID de versão serial. Também avisa sobre o acesso a membros não públicos de um elemento serializável.
  * `static`: Avisa sobre o acesso a um membro estático usando uma instância.
  * `try`: Avisa sobre problemas relacionados ao uso de blocos try (ou seja, try-with-resources).
  * `unchecked`: Avisa sobre operações não verificadas.
  * `varargs`: Avisa sobre métodos vararg potencialmente inseguros.
  * `none`: Desabilita todos os avisos.



`-Xmaxerrs number` Define o número máximo de erros a serem impressos.

`-Xmaxwarns number` Define o número máximo de avisos a serem impressos.

`-Xpkginfo:[always, legacy, nonempty]` Especifica quando e como o comando `javac` gera arquivos package-info.class a partir de arquivos package-info.java usando uma das seguintes opções:

  * `always` Gera um arquivo package-info.class para cada arquivo package-info.java. Esta opção pode ser útil se você usa um sistema de build como o Ant, que verifica se cada arquivo .java tem um arquivo .class correspondente.
  * `legacy` Gera um arquivo package-info.class apenas se package-info.java contiver anotações. Esta opção não gera um arquivo package-info.class se package-info.java contiver apenas comentários.
  * `nonempty` Gera um arquivo package-info.class apenas se package-info.java contiver anotações com RetentionPolicy.CLASS ou RetentionPolicy.RUNTIME.



`-Xplugin:name args` Especifica o nome e argumentos opcionais para um plug-in a ser executado.

`-Xprefer:[source, newer]` Especifica qual arquivo ler quando um arquivo fonte e um arquivo .class são encontrados para uma classe compilada implicitamente usando uma das seguintes opções:

`-Xprefer:newer` Lê o mais recente dos arquivos fonte ou .class para um tipo (padrão).

`-Xprefer:source` Lê o arquivo fonte. Use `-Xprefer:source` quando quiser ter certeza de que quaisquer processadores de anotação podem acessar anotações declaradas com uma política de retenção de SOURCE.

`-Xprint` Imprime uma representação textual de tipos especificados para fins de depuração. Isso não realiza processamento de anotações ou compilação. O formato da saída pode mudar.

`-XprintProcessorInfo` Imprime informações sobre quais anotações um processador é solicitado a processar.

`-XprintRounds` Imprime informações sobre as rodadas iniciais e subsequentes de processamento de anotações.

`-Xstdout filename` Envia mensagens do compilador para o arquivo nomeado. Por padrão, as mensagens do compilador vão para [`System.err`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/System.html#err>).
## Arquivos de Argumentos de Linha de Comando

Um arquivo de argumento pode incluir opções do `javac` e nomes de arquivos-fonte em qualquer combinação. Os argumentos dentro de um arquivo podem ser separados por espaços ou caracteres de nova linha. Se um nome de arquivo contiver espaços incorporados, coloque o nome do arquivo inteiro entre aspas duplas.

Os nomes de arquivos dentro de um arquivo de argumento são relativos ao diretório atual, não ao local do arquivo de argumento. Curingas `*` não são permitidos nessas listas (como para especificar `*.java`). O uso do sinal de arroba `@` para interpretar arquivos recursivamente não é suportado. As opções `-J` não são suportadas porque são passadas para o launcher, que não suporta arquivos de argumento.

Ao executar o comando `javac`, passe o caminho e o nome de cada arquivo de argumento com o caractere inicial de arroba `@`. Quando o comando `javac` encontra um argumento começando com o sinal de arroba `@`, ele expande o conteúdo desse arquivo na lista de argumentos.

## Exemplos

### Exemplos de Uso de javac @filename

#### Arquivo de Argumento Único

Você pode usar um único arquivo de argumento chamado `argfile` para conter todos os argumentos do `javac`:

Este arquivo de argumento poderia conter o conteúdo de ambos os arquivos mostrados no exemplo a seguir de Dois Arquivos de Argumento.

#### Dois Arquivos de Argumento

Você pode criar dois arquivos de argumento: um para as opções do `javac` e outro para os nomes dos arquivos-fonte. Observe que as listas a seguir não possuem caracteres de continuação de linha. Crie um arquivo chamado `options` que contenha o seguinte:

**Linux e macOS:**

**Windows**

Crie um arquivo chamado `classes` que contenha o seguinte:

Em seguida, execute o comando `javac` da seguinte forma:

#### Arquivos de Argumento com Caminhos

Os arquivos de argumento podem ter caminhos, mas quaisquer nomes de arquivos dentro dos arquivos são relativos ao diretório de trabalho atual (não `path1` ou `path2`):

### Exemplos de Uso de chaves -Xlint

#### cast

Emite avisos sobre casts desnecessários e redundantes, por exemplo:

#### classfile

Emite avisos sobre problemas relacionados ao conteúdo de arquivos de classe.

#### deprecation

Emite avisos sobre o uso de itens obsoletos. Por exemplo:

O método `java.util.Date.getDay` está obsoleto desde o JDK 1.1.

#### dep-ann

Emite avisos sobre itens que são documentados com o comentário Javadoc `@deprecated`, mas não possuem a anotação `@Deprecated`, por exemplo:

#### divzero

Emite avisos sobre divisão por inteiro constante 0, por exemplo:

#### empty

Emite avisos sobre instruções vazias após instruções `if`, por exemplo:

#### fallthrough

Verifica os blocos `switch` em busca de casos de "fall-through" e fornece uma mensagem de aviso para qualquer um que seja encontrado. Casos de "fall-through" são casos em um bloco `switch`, que não o último caso no bloco, cujo código não inclui uma instrução `break`, permitindo que a execução do código "caia" desse caso para o próximo. Por exemplo, o código que segue o rótulo `case 1` neste bloco `switch` não termina com uma instrução `break`:

Se a opção `-Xlint:fallthrough` fosse usada ao compilar este código, o compilador emitiria um aviso sobre um possível "fall-through" para `case`, com o número da linha do caso em questão.

#### finally

Emite avisos sobre cláusulas `finally` que não podem ser concluídas normalmente, por exemplo:

O compilador gera um aviso para o bloco `finally` neste exemplo. Quando o método `m()` é chamado, ele retorna um valor de 0. Um bloco `finally` é executado quando o bloco `try` é encerrado. Neste exemplo, quando o controle é transferido para o bloco `catch`, o método `m()` é encerrado. No entanto, o bloco `finally` deve ser executado, então ele é executado, mesmo que o controle tenha sido transferido para fora do método.

#### options

Emite avisos sobre problemas relacionados ao uso de opções de linha de comando. Consulte [Opções de Compilação Cruzada para javac](<#/doc/tutorials/jvm/tools/core/javac>).

#### overrides

Emite avisos sobre problemas relacionados a sobrescritas de métodos. Por exemplo, considere as duas classes a seguir:

O compilador gera um aviso semelhante ao seguinte:

Quando o compilador encontra um método varargs, ele traduz o parâmetro formal varargs em um array. No método `ClassWithVarargsMethod.varargsMethod`, o compilador traduz o parâmetro formal varargs `String... s` para o parâmetro formal `String[] s`, um array que corresponde ao parâmetro formal do método `ClassWithOverridingMethod.varargsMethod`. Consequentemente, este exemplo compila.

#### path

Emite avisos sobre elementos de caminho inválidos e diretórios de caminho inexistentes na linha de comando (com relação ao classpath, source path e outros caminhos). Tais avisos não podem ser suprimidos com a anotação `@SuppressWarnings`. Por exemplo:

  * **Linux e macOS** : `javac -Xlint:path -classpath /nonexistentpath Example.java`

  * **Windows** : `javac -Xlint:path -classpath C:\nonexistentpath Example.java`

#### processing

Emite avisos sobre problemas relacionados ao processamento de anotações. O compilador gera este aviso quando você tem uma classe que possui uma anotação e usa um processador de anotações que não consegue lidar com esse tipo de exceção. Por exemplo, o seguinte é um processador de anotações simples:

Os seguintes comandos compilam o processador de anotações `AnnoProc` e, em seguida, executam este processador de anotações contra o arquivo-fonte `AnnosWithoutProcessors.java`:

Quando o compilador executa o processador de anotações contra o arquivo-fonte `AnnosWithoutProcessors.java`, ele gera o seguinte aviso:

Para resolver este problema, você pode renomear a anotação definida e usada na classe `AnnosWithoutProcessors` de `Anno` para `NotAnno`.

#### rawtypes

Emite avisos sobre operações não verificadas em tipos brutos (raw types). A seguinte instrução gera um aviso de rawtypes:

O exemplo a seguir não gera um aviso de rawtypes:

`List` é um tipo bruto (raw type). No entanto, `List<?>` é um tipo parametrizado com curinga ilimitado. Como `List` é uma interface parametrizada, sempre especifique seu argumento de tipo. Neste exemplo, o argumento formal `List` é especificado com um curinga ilimitado `?` como seu parâmetro de tipo formal, o que significa que o método `countElements` pode aceitar qualquer instanciação da interface `List`.

#### serial

Emite avisos sobre definições ausentes de `serialVersionUID` em classes serializáveis. Por exemplo:

O compilador gera o seguinte aviso:

Se uma classe serializável não declarar explicitamente um campo chamado `serialVersionUID`, o ambiente de tempo de execução de serialização calcula um valor `serialVersionUID` padrão para essa classe com base em vários aspectos da classe, conforme descrito na [`Java Object Serialization Specification`](<https://docs.oracle.com/en/java/javase/26/docs/specs/serialization>).

No entanto, é fortemente recomendado que todas as classes serializáveis declarem explicitamente valores `serialVersionUID` porque o processo padrão de cálculo de valores `serialVersionUID` é altamente sensível a detalhes da classe que podem variar dependendo das implementações do compilador. Como resultado, isso pode causar uma [`InvalidClassException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/InvalidClassException.html>) inesperada durante a desserialização. Para garantir um valor `serialVersionUID` consistente entre diferentes implementações de compiladores Java, uma classe serializável deve declarar um valor `serialVersionUID` explícito.

#### static

Emite avisos sobre problemas relacionados ao uso de variáveis estáticas, por exemplo:

O compilador gera o seguinte aviso:

Para resolver este problema, você pode chamar o método estático `m1` da seguinte forma:

Alternativamente, você pode remover a palavra-chave `static` da declaração do método `m1`.

#### try

Emite avisos sobre problemas relacionados ao uso de blocos `try`, incluindo instruções [try-with-resources](<#/doc/tutorials/exceptions/catching-handling>). Por exemplo, um aviso é gerado para a seguinte instrução porque o recurso `ac` declarado no bloco `try` não é usado:

#### unchecked

Fornece mais detalhes para avisos de conversão não verificada (unchecked conversion) que são exigidos pela [`Java Language Specification`](<https://docs.oracle.com/javase/specs/jls/se26/html/index.html>), por exemplo:

Durante a type erasure, os tipos `ArrayList<Number>` e `List<String>` tornam-se `ArrayList` e `List`, respectivamente.

A variável `ls` tem o tipo parametrizado `List<String>`. Quando a `List` referenciada por `l` é atribuída a `ls`, o compilador gera um aviso não verificado. Em tempo de compilação, o compilador e a JVM não podem determinar se `l` se refere a um tipo `List<String>`. Neste caso, `l` não se refere a um tipo `List<String>`. Como resultado, ocorre heap pollution.

Uma situação de heap pollution ocorre quando o objeto `List` `l`, cujo tipo estático é `List<Number>`, é atribuído a outro objeto `List`, `ls`, que tem um tipo estático diferente, `List<String>`. No entanto, o compilador ainda permite essa atribuição. Ele deve permitir essa atribuição para preservar a compatibilidade retroativa com versões do Java SE que não suportam generics. Devido à type erasure, `List<Number>` e `List<String>` ambos se tornam `List`. Consequentemente, o compilador permite a atribuição do objeto `l`, que tem um tipo bruto de `List`, ao objeto `ls`.

#### varargs

Emite avisos sobre o uso inseguro de métodos de argumentos variáveis (varargs), em particular, aqueles que contêm argumentos não reificáveis, por exemplo:

Um tipo não reificável é um tipo cuja informação de tipo não está totalmente disponível em tempo de execução. O compilador gera o seguinte aviso para a definição do método `ArrayBuilder.addToList`:

Quando o compilador encontra um método varargs, ele traduz o parâmetro formal varargs em um array. No entanto, a linguagem de programação Java não permite a criação de arrays de tipos parametrizados. No método `ArrayBuilder.addToList`, o compilador traduz o parâmetro formal varargs `T... elements` para o parâmetro formal `T[] elements`, um array. No entanto, devido à type erasure, o compilador converte o parâmetro formal varargs para `Object[] elements`. Consequentemente, existe a possibilidade de heap pollution.

### Exemplo de Compilação Fornecendo Argumentos de Linha de Comando

Para compilar como se estivesse fornecendo argumentos de linha de comando, use a seguinte sintaxe:

O exemplo escreve diagnósticos para o stream de saída padrão e retorna o código de saída que o comando `javac` daria quando chamado da linha de comando. Você pode usar outros métodos na interface `javax.tools.JavaCompiler` para lidar com diagnósticos, controlar de onde os arquivos são lidos e para onde são gravados, e muito mais.

### Exemplo de Compilação de Múltiplos Arquivos-Fonte

Este exemplo compila os arquivos-fonte `Aloha.java`, `GutenTag.java`, `Hello.java` e `Hi.java` no pacote `greetings`.

**Linux e macOS:**

**Windows:**

### Exemplo de Especificação de um Class Path do Usuário

Após alterar um dos arquivos-fonte no exemplo anterior, recompile-o:

**Linux e macOS:**

**Windows:**

Como `greetings.Hi` se refere a outras classes no pacote `greetings`, o compilador precisa encontrar essas outras classes. O exemplo anterior funciona porque o class path do usuário padrão é o diretório que contém o diretório do pacote. Se você deseja recompilar este arquivo sem se preocupar com o diretório em que está, adicione o diretório dos exemplos ao class path do usuário definindo `CLASSPATH`. Este exemplo usa a opção `-classpath`.

**Linux e macOS:**

**Windows:**

Se você alterar `greetings.Hi` para usar um utilitário de banner, esse utilitário também precisará estar acessível através do class path do usuário.

**Linux e macOS:**

**Windows:**

Para executar uma classe no pacote `greetings`, o programa precisa de acesso ao pacote `greetings` e às classes que as classes `greetings` utilizam.

**Linux e macOS:**

**Windows:**

## Processamento de Anotações

O comando `javac` fornece suporte direto para processamento de anotações, substituindo a necessidade do comando de processamento de anotações separado, `apt`. A API para processadores de anotações é definida nos pacotes e subpacotes [`javax.annotation.processing`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.compiler/javax/annotation/processing/package-summary.html>) e [`javax.lang.model`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.compiler/javax/lang/model/package-summary.html>).

### Como o Processamento de Anotações Funciona

A menos que o processamento de anotações seja desabilitado com a opção `-proc:none`, o compilador procura por quaisquer processadores de anotações disponíveis. O caminho de busca pode ser especificado com a opção `-processorpath`. Se nenhum caminho for especificado, o class path do usuário é usado. Os processadores são localizados por meio de arquivos de configuração de provedor de serviço chamados `META-INF/services/javax.annotation.processing.Processor` no caminho de busca. Tais arquivos devem conter os nomes de quaisquer processadores de anotações a serem usados, listados um por linha. Alternativamente, os processadores podem ser especificados explicitamente, usando a opção `-processor`. Após escanear os arquivos-fonte e classes na linha de comando para determinar quais anotações estão presentes, o compilador consulta os processadores para determinar quais anotações eles processam. Quando uma correspondência é encontrada, o processador é chamado. Um processador pode reivindicar as anotações que processa, caso em que nenhuma outra tentativa é feita para encontrar quaisquer processadores para essas anotações. Depois que todas as anotações são reivindicadas, o compilador não procura por processadores adicionais.

Se quaisquer processadores gerarem novos arquivos-fonte, outra rodada de processamento de anotações ocorre: Quaisquer arquivos-fonte recém-gerados são escaneados, e as anotações processadas como antes. Quaisquer processadores chamados em rodadas anteriores também são chamados em todas as rodadas subsequentes. Isso continua até que nenhum novo arquivo-fonte seja gerado. Após uma rodada em que nenhum novo arquivo-fonte é gerado, os processadores de anotações são chamados uma última vez, para lhes dar a chance de completar qualquer trabalho restante. Finalmente, a menos que a opção `-proc:only` seja usada, o compilador compila os arquivos-fonte originais e todos os gerados.

### Buscando Tipos

Para compilar um arquivo-fonte, o compilador frequentemente precisa de informações sobre um tipo, mas a definição do tipo não está nos arquivos-fonte especificados na linha de comando. O compilador precisa de informações de tipo para cada classe ou interface usada, estendida ou implementada no arquivo-fonte. Isso inclui classes e interfaces não explicitamente mencionadas no arquivo-fonte, mas que fornecem informações através de herança.

Por exemplo, ao criar uma subclasse de `java.awt.Window`, você também está usando as classes ancestrais de `Window`: `java.awt.Container`, `java.awt.Component` e `java.lang.Object`. Quando o compilador precisa de informações de tipo, ele procura por um arquivo-fonte ou arquivo de classe que defina o tipo. O compilador procura por arquivos de classe primeiro nas classes de bootstrap e extensão, depois no class path do usuário (que por padrão é o diretório atual). O class path do usuário é definido configurando a variável de ambiente `CLASSPATH` ou usando a opção `-classpath`.

Se você definir a opção `-sourcepath`, o compilador procurará no caminho indicado por arquivos-fonte. Caso contrário, o compilador procurará no class path do usuário por arquivos de classe e arquivos-fonte. Você pode especificar diferentes classes de bootstrap ou extensão com as opções `-bootclasspath` e `-extdirs`.

Uma busca de tipo bem-sucedida pode produzir um arquivo de classe, um arquivo-fonte ou ambos. Se ambos forem encontrados, você pode usar a opção `-Xprefer` para instruir o compilador qual usar. Se `newer` for especificado, o compilador usa o mais novo dos dois arquivos. Se `source` for especificado, o compilador usa o arquivo-fonte. O padrão é `newer`.

Se uma busca de tipo encontrar um arquivo-fonte para um tipo necessário, seja por si só ou como resultado da configuração da opção `-Xprefer`, o compilador lê o arquivo-fonte para obter as informações de que precisa. Por padrão, o compilador também compila o arquivo-fonte. Você pode usar a opção `-implicit` para especificar o comportamento. Se `none` for especificado, nenhum arquivo de classe é gerado para o arquivo-fonte. Se `class` for especificado, arquivos de classe são gerados para o arquivo-fonte.

O compilador pode não descobrir a necessidade de algumas informações de tipo até que o processamento de anotações seja concluído. Quando as informações de tipo são encontradas em um arquivo-fonte e nenhuma opção `-implicit` é especificada, o compilador emite um aviso de que o arquivo está sendo compilado sem ser submetido ao processamento de anotações. Para desabilitar o aviso, especifique o arquivo na linha de comando (para que ele seja submetido ao processamento de anotações) ou use a opção `-implicit` para especificar se os arquivos de classe devem ser gerados para tais arquivos-fonte.

### Neste tutorial

Introdução ao javac Descrição Interface Programática Arquivos-Fonte Carregados Implicitamente Usando a Variável de Ambiente JDK_JAVAC_OPTIONS Opções Padrão Opções de Compilação Cruzada para javac Opções Extras Arquivos de Argumentos de Linha de Comando Exemplos Processamento de Anotações

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Introdução às Ferramentas Essenciais do JDK](<#/doc/tutorials/jvm/tools/core/intro>)

➜

**Tutorial Atual**

Javac - o Compilador

➜

**Próximo na Série**

[Javap - o Desassemblador](<#/doc/tutorials/jvm/tools/core/javap>)

**Anterior na Série:** [Introdução às Ferramentas Essenciais do JDK](<#/doc/tutorials/jvm/tools/core/intro>)

**Próximo na Série:** [Javap - o Desassemblador](<#/doc/tutorials/jvm/tools/core/javap>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas Essenciais do JDK ](<#/doc/tutorials/jvm/tools/core>) > Javac - o Compilador