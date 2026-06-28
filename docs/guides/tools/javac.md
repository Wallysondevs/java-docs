# O Comando javac

## Nome

javac - lê declarações Java e as compila em arquivos .class

## Sinopse

`javac` [_options_] [_sourcefiles-or-classnames_]

_options_
     Opções de linha de comando.
_sourcefiles-or-classnames_
     Arquivos de origem a serem compilados (por exemplo, `Shape.java`) ou os nomes de classes previamente compiladas a serem processadas para anotações (por exemplo, `geometry.MyShape`).

## Descrição

O comando `javac` lê _arquivos de origem_ que contêm declarações de module, package e type escritas na linguagem de programação Java, e os compila em _arquivos .class_ que são executados na Java Virtual Machine.

O comando `javac` também pode processar anotações em arquivos de origem Java e classes.

Arquivos de origem devem ter a extensão de nome de arquivo `.java`. Arquivos .class têm a extensão de nome de arquivo `.class`. Ambos os arquivos de origem e .class normalmente têm nomes de arquivo que identificam o conteúdo. Por exemplo, uma classe chamada `Shape` seria declarada em um arquivo de origem chamado `Shape.java`, e compilada em um arquivo .class chamado `Shape.class`.

Existem duas maneiras de especificar arquivos de origem para `javac`:

  * Para um pequeno número de arquivos de origem, você pode listar seus nomes de arquivo na linha de comando.

  * Para um grande número de arquivos de origem, você pode usar a opção `@`_filename_ na linha de comando para especificar um _arquivo de argumento_ que lista seus nomes de arquivo. Consulte Opções Padrão para uma descrição da opção e Arquivos de Argumentos de Linha de Comando para uma descrição dos arquivos de argumento do `javac`.

A ordem dos arquivos de origem especificados na linha de comando ou em um arquivo de argumento não é importante. O `javac` compilará os arquivos juntos, como um grupo, e resolverá automaticamente quaisquer dependências entre as declarações nos vários arquivos de origem.

O `javac` espera que os arquivos de origem estejam organizados em uma ou mais hierarquias de diretórios no sistema de arquivos, conforme descrito em Organização do Código Fonte.

Para compilar um arquivo de origem, o `javac` precisa encontrar a declaração de cada class ou interface que é usada, estendida ou implementada pelo código no arquivo de origem. Isso permite que o `javac` verifique se o código tem o direito de acessar essas classes e interfaces. Em vez de especificar os arquivos de origem dessas classes e interfaces explicitamente, você pode usar opções de linha de comando para dizer ao `javac` onde procurar por seus arquivos de origem. Se você compilou esses arquivos de origem anteriormente, pode usar opções para dizer ao `javac` onde procurar pelos arquivos .class correspondentes. As opções, que todas têm nomes terminados em "path", são descritas em Opções Padrão, e detalhadas em Configurando uma Compilação e Buscando Declarações de Module, Package e Type.

Por padrão, o `javac` compila cada arquivo de origem para um arquivo .class no mesmo diretório do arquivo de origem. No entanto, é recomendado especificar um diretório de destino separado com a opção `-d`.

Opções de linha de comando e variáveis de ambiente também controlam como o `javac` executa várias tarefas:

  * Compilando código para ser executado em versões anteriores do JDK.
  * Compilando código para ser executado sob um debugger.
  * Verificando problemas de estilo no código fonte Java.
  * Verificando problemas em comentários `javadoc` (`/** ... */`).
  * Processando anotações em arquivos de origem e arquivos .class.
  * Atualizando e aplicando patches em modules no ambiente de tempo de compilação.

O `javac` suporta Compilação para Versões Anteriores da Plataforma e também pode ser invocado a partir de código Java usando uma das várias APIs.

## Opções

O `javac` fornece opções padrão e opções extras que são não-padrão ou para uso avançado.

Algumas opções aceitam um ou mais argumentos. Se um argumento contiver espaços ou outros caracteres de espaço em branco, o valor deve ser citado de acordo com as convenções do ambiente usado para invocar o javac. Se a opção começar com um único traço (`-`), o argumento deve seguir diretamente o nome da opção, ou deve ser separado por dois pontos (`:`) ou espaço em branco, dependendo da opção. Se a opção começar com um traço duplo (`--`), o argumento pode ser separado por espaço em branco ou por um caractere de igual (`=`) sem espaço em branco adicional. Por exemplo,
```
    -Aname="J. Duke"
    -proc:only
    -d myDirectory
    --module-version 3
    --module-version=3
```

Nas listas de opções a seguir, um argumento _path_ representa um caminho de busca, composto por uma lista de locais do sistema de arquivos separados pelo caractere separador de caminho da plataforma (ponto e vírgula `;` no Windows, ou dois pontos `:` em outros sistemas). Dependendo da opção, os locais do sistema de arquivos podem ser diretórios, JAR files ou JMOD files.

### Opções Padrão

`@`_filename_
     Lê opções e nomes de arquivo de um arquivo. Para encurtar ou simplificar o comando `javac`, você pode especificar um ou mais arquivos que contêm argumentos para o comando `javac` (exceto opções `-J`). Isso permite criar comandos `javac` de qualquer comprimento em qualquer sistema operacional. Consulte Arquivos de Argumentos de Linha de Comando.
`-A` _key_[`=`_value_]
     Especifica opções a serem passadas para annotation processors. Essas opções não são interpretadas diretamente pelo `javac`, mas são disponibilizadas para uso por processadores individuais. O valor _key_ deve ser um ou mais identificadores separados por um ponto (`.`).
`--add-modules` _module_`,`_module_
     Especifica root modules a serem resolvidos além dos initial modules, ou todos os modules no module path se _module_ for `ALL-MODULE-PATH`.
`--boot-class-path` _path_ ou `-bootclasspath` _path_
    

Substitui o local dos bootstrap class files.

**Nota:** Isso só pode ser usado ao compilar para versões anteriores ao JDK 9. Conforme aplicável, consulte as descrições em `--release`, `-source` ou `-target` para detalhes. Para JDK 9 ou posterior, consulte `--system`.

`--class-path` _path_ , `-classpath` _path_ , ou `-cp` _path_
    

Especifica onde encontrar user class files e annotation processors. Este classpath substitui o user class path na variável de ambiente `CLASSPATH`.

  * Se `--class-path`, `-classpath` ou `-cp` não forem especificados, então o user class path é o valor da variável de ambiente `CLASSPATH`, se esta estiver definida, ou então o diretório atual.

  * Se não estiver compilando código para modules, se a opção `--source-path` ou `-sourcepath` não for especificada, então o user class path também é pesquisado por arquivos de origem.

  * Se a opção `-processorpath` não for especificada, então o classpath também é pesquisado por annotation processors.

`-d` _directory_
    

Define o diretório de destino (ou _diretório de saída de classes_) para arquivos .class. Se uma class fizer parte de um package, então o `javac` coloca o arquivo .class em um subdiretório que reflete o module name (se apropriado) e o package name. O diretório, e quaisquer subdiretórios necessários, serão criados se ainda não existirem.

Se a opção `-d` não for especificada, então o `javac` coloca cada arquivo .class no mesmo diretório do arquivo de origem do qual foi gerado.

Exceto ao compilar código para múltiplos modules, o conteúdo do diretório de saída de classes será organizado em uma hierarquia de packages. Ao compilar código para múltiplos modules, o conteúdo do diretório de saída será organizado em uma hierarquia de modules, com o conteúdo de cada module em um subdiretório separado, cada um organizado como uma hierarquia de packages.

**Nota:** Ao compilar código para um ou mais modules, o diretório de saída de classes será automaticamente verificado ao procurar por classes previamente compiladas. Quando não estiver compilando para modules, para compatibilidade retroativa, o diretório _não_ é automaticamente verificado para classes previamente compiladas, e por isso é recomendado especificar o diretório de saída de classes como um dos locais no user class path, usando a opção `--class-path` ou uma de suas formas alternativas.

`-deprecation`
     Mostra uma descrição de cada uso ou sobrescrita de um membro ou class deprecated. Sem a opção `-deprecation`, o `javac` mostra um resumo dos arquivos de origem que usam ou sobrescrevem membros ou classes deprecated. A opção `-deprecation` é um atalho para `-Xlint:deprecation`.
`--enable-preview`
     Habilita recursos de linguagem preview. Usado em conjunto com `-source` ou `--release`.
`-encoding` _encoding_
     Especifica a codificação de caracteres usada pelos arquivos de origem, como EUC-JP e UTF-8. Se a opção `-encoding` não for especificada, então o conversor padrão da plataforma é usado.
`-endorseddirs` _directories_
    

Substitui o local do endorsed standards path.

**Nota:** Isso só pode ser usado ao compilar para versões anteriores ao JDK 9. Conforme aplicável, consulte as descrições em `--release`, `-source` ou `-target` para detalhes.

`-extdirs` _directories_
    

Substitui o local das extensões instaladas. `directories` é uma lista de diretórios, separados pelo separador de caminho da plataforma (`;` no Windows, e `:` caso contrário). Cada JAR file nos diretórios especificados é pesquisado por arquivos .class. Todos os JAR files encontrados tornam-se parte do classpath.

Se você estiver compilando para uma versão da plataforma que suporta o Extension Mechanism, então esta opção especifica os diretórios que contêm as extension classes. Consulte [Compiling for Other Releases of the Platform].

**Nota:** Isso só pode ser usado ao compilar para versões anteriores ao JDK 9. Conforme aplicável, consulte as descrições em `--release`, `-source` ou `-target` para detalhes.

`-g`
     Gera todas as informações de debugging, incluindo variáveis locais. Por padrão, apenas informações de número de linha e arquivo de origem são geradas.
`-g:`[`lines`, `vars`, `source`]
    

Gera apenas os tipos de informações de debugging especificados pela lista de palavras-chave separadas por vírgulas. As palavras-chave válidas são:

`lines`
     Informações de debugging de número de linha.
`vars`
     Informações de debugging de variáveis locais.
`source`
     Informações de debugging de arquivo de origem.
`-g:none`
     Não gera informações de debugging.
`-h` _directory_
    

Especifica onde colocar os native header files gerados.

Ao especificar esta opção, um native header file é gerado para cada class que contém native methods ou que possui uma ou mais constantes anotadas com a anotação [`java.lang.annotation.Native`](<#/>). Se a class fizer parte de um package, então o compilador coloca o native header file em um subdiretório que reflete o module name (se apropriado) e o package name. O diretório, e quaisquer subdiretórios necessários, serão criados se ainda não existirem.

`--help`, `-help` ou `-?`
     Imprime uma sinopse das opções padrão.
`--help-extra` ou `-X`
     Imprime uma sinopse do conjunto de opções extras.
`--help-lint`
     Imprime as chaves suportadas para a opção `-Xlint`.
`-implicit:`[`none`, `class`]
    

Especifica se deve ou não gerar arquivos .class para arquivos implicitamente referenciados:

  * `-implicit:class` \--- Gera automaticamente arquivos .class.

  * `-implicit:none` \--- Suprime a geração de arquivos .class.




Se esta opção não for especificada, então o padrão gera automaticamente arquivos .class. Neste caso, o compilador emite um aviso se quaisquer arquivos .class forem gerados ao fazer também annotation processing. O aviso não é emitido quando a opção `-implicit` é explicitamente definida. Consulte Buscando Declarações de Module, Package e Type.

`-J` _option_
    

Passa _option_ para o sistema de tempo de execução, onde _option_ é uma das opções Java descritas no comando [java](<#/doc/guides/tools/java>). Por exemplo, `-J-Xms48m` define a memória de inicialização para 48 MB.

**Nota:** A variável de ambiente `CLASSPATH`, a opção `-classpath`, a opção `-bootclasspath` e a opção `-extdirs` não especificam as classes usadas para executar o `javac`. Tentar personalizar a implementação do compilador com essas opções e variáveis é arriscado e muitas vezes não alcança o que você deseja. Se você precisar personalizar a implementação do compilador, use a opção `-J` para passar opções para o Java launcher subjacente.

`--limit-modules` _module_`,`_module_ *
     Limita o universo de observable modules.
`--module` _module-name_ (`,`_module-name_)* ou `-m` _module-name_ (`,`_module-name_)*
     Compila os arquivos de origem nos modules nomeados que são mais novos do que os arquivos correspondentes no diretório de saída.
`--module-path` _path_ ou `-p` _path_
     Especifica onde encontrar application modules.
`--module-source-path` _module-source-path_
     Especifica onde encontrar arquivos de origem ao compilar código em múltiplos modules. Consulte A Opção Module Source Path.
`--module-version` _version_
     Especifica a versão dos modules que estão sendo compilados.
`-nowarn`
     Gera apenas avisos obrigatórios.
`-parameters`
     Gera metadados para reflection em parâmetros de método. Armazena os nomes dos parâmetros formais de construtores e métodos no arquivo .class gerado para que o método `java.lang.reflect.Executable.getParameters` da Reflection API possa recuperá-los.
`-proc:`[`none`, `only`, `full`]
    

Controla se o annotation processing e a compilação são realizados.

  * `-proc:none` significa que a compilação ocorre sem annotation processing

  * `-proc:only` significa que apenas o annotation processing é realizado, sem qualquer compilação subsequente.

  * `-proc:full` significa que o annotation processing e a compilação são realizados.




Se esta opção não for usada, o annotation processing e a compilação são realizados se pelo menos uma outra opção for usada para configurar explicitamente o annotation processing.

`-processor` _class1_[`,`_class2_`,`_class3_...]
     Nomes dos annotation processors a serem executados. Isso ignora o processo de descoberta padrão.
`--processor-module-path` _path_
     Especifica o module path usado para encontrar annotation processors.
`--processor-path` _path_ ou `-processorpath` _path_
     Especifica onde encontrar annotation processors. Se esta opção não for usada, então o classpath é pesquisado por processadores.
`-profile` _profile_
    

Verifica se a API usada está disponível no profile especificado. Esta opção está deprecated e pode ser removida em uma versão futura.

**Nota:** Isso só pode ser usado ao compilar para versões anteriores ao JDK 9. Conforme aplicável, consulte as descrições em `--release`, `-source` ou `-target` para detalhes.

`--release` _release_
    

Compila o código fonte de acordo com as regras da linguagem de programação Java para a versão Java SE especificada, gerando arquivos .class que visam essa versão. O código fonte é compilado contra a API combinada Java SE e JDK para a versão especificada.

Os valores suportados de _release_ são a versão Java SE atual e um número limitado de versões anteriores, detalhadas na ajuda da linha de comando.

Para a versão atual, a Java SE API consiste nos packages `java.*`, `javax.*` e `org.*` que são exportados pelos Java SE modules na versão; a JDK API consiste nos packages `com.*` e `jdk.*` que são exportados pelos JDK modules na versão, mais os packages `javax.*` que são exportados por modules padrão, mas não Java SE, na versão.

Para versões anteriores, a Java SE API e a JDK API são conforme definidas nessa versão.

**Nota:** Ao usar `--release`, você não pode usar também as opções `--source`/`-source` ou `--target`/`-target`.

**Nota:** Ao usar `--release` para especificar uma versão que suporta o Java Platform Module System, a opção `--add-exports` não pode ser usada para ampliar o conjunto de packages exportados pelos Java SE, JDK e standard modules na versão especificada.

`-s` _directory_
    

Especifica o diretório usado para colocar os arquivos de origem gerados. Se uma class fizer parte de um package, então o compilador coloca o arquivo de origem em um subdiretório que reflete o module name (se apropriado) e o package name. O diretório, e quaisquer subdiretórios necessários, serão criados se ainda não existirem.

Exceto ao compilar código para múltiplos modules, o conteúdo do diretório de saída de origem será organizado em uma hierarquia de packages. Ao compilar código para múltiplos modules, o conteúdo do diretório de saída de origem será organizado em uma hierarquia de modules, com o conteúdo de cada module em um subdiretório separado, cada um organizado como uma hierarquia de packages.

`--source` _release_ ou `-source` _release_
    

Compila o código fonte de acordo com as regras da linguagem de programação Java para a versão Java SE especificada. Os valores suportados de _release_ são a versão Java SE atual e um número limitado de versões anteriores, detalhadas na ajuda da linha de comando.

Se a opção não for especificada, o padrão é compilar o código fonte de acordo com as regras da linguagem de programação Java para a versão Java SE atual.

`--source-path` _path_ ou `-sourcepath` _path_
    

Especifica onde encontrar arquivos de origem. Exceto ao compilar múltiplos modules juntos, este é o source code path usado para procurar por definições de class ou interface.

**Nota:** Classes encontradas através do classpath podem ser recompiladas quando seus arquivos de origem também são encontrados. Consulte Buscando Declarações de Module, Package e Type.

`--system` _jdk_ | `none`
     Substitui o local dos system modules.
`--target` _release_ ou `-target` _release_
    

Gera arquivos `class` adequados para a versão Java SE especificada. Os valores suportados de _release_ são a versão Java SE atual e um número limitado de versões anteriores, detalhadas na ajuda da linha de comando.

**Nota:** A target release deve ser igual ou superior à source release. (Consulte `--source`.)

`--upgrade-module-path` _path_
     Substitui o local dos upgradeable modules.
`-verbose`
     Exibe mensagens sobre o que o compilador está fazendo. As mensagens incluem informações sobre cada class carregada e cada arquivo de origem compilado.
`--version` ou `-version`
     Imprime informações de versão.
`-Werror`
     Termina a compilação quando ocorrem avisos.

### Opções Extras

`--add-exports` _module_`/`_package_`=`_other-module_(`,`_other-module_)*
     Especifica um package a ser considerado como exportado de seu defining module para additional modules ou para todos os unnamed modules quando o valor de _other-module_ for `ALL-UNNAMED`.
`--add-reads` _module_`=`_other-module_(`,`_other-module_)*
     Especifica additional modules a serem considerados como requeridos por um dado module.
`--default-module-for-created-files` _module-name_
     Especifica o fallback target module para arquivos criados por annotation processors, se nenhum for especificado ou inferido.
`--disable-line-doc-comments`
     Desabilita o suporte para documentation comments com linhas começando com ///.
`-Djava.endorsed.dirs=`_dirs_
    

Substitui o local do endorsed standards path.

**Nota:** Isso só pode ser usado ao compilar para versões anteriores ao JDK 9. Conforme aplicável, consulte as descrições em `--release`, `-source` ou `-target` para detalhes.

`-Djava.ext.dirs=`_dirs_
    

Substitui o local das installed extensions.

**Nota:** Isso só pode ser usado ao compilar para versões anteriores ao JDK 9. Conforme aplicável, consulte as descrições em `--release`, `-source` ou `-target` para detalhes.

`--patch-module` _module_`=`_path_
     Substitui ou aumenta um module com classes e recursos em JAR files ou diretórios.
`-Xbootclasspath:`_path_
    

Substitui o local dos bootstrap class files.

**Nota:** Isso só pode ser usado ao compilar para versões anteriores ao JDK 9. Conforme aplicável, consulte as descrições em `--release`, `-source` ou `-target` para detalhes.

`-Xbootclasspath/a:`_path_
    

Adiciona um sufixo ao bootstrap class path.

**Nota:** Isso só pode ser usado ao compilar para versões anteriores ao JDK 9. Conforme aplicável, consulte as descrições em `--release`, `-source` ou `-target` para detalhes.

`-Xbootclasspath/p:`_path_
    

Adiciona um prefixo ao bootstrap class path.

**Nota:** Isso só pode ser usado ao compilar para versões anteriores ao JDK 9. Conforme aplicável, consulte as descrições em `--release`, `-source` ou `-target` para detalhes.

`-Xdiags:`[`compact`, `verbose`]
     Seleciona um diagnostic mode.
`-Xdoclint`
     Habilita verificações recomendadas para problemas em documentation comments.
`-Xdoclint:`(`all`|`none`|[`-`]_group_)[`/`_access_]
    

Habilita ou desabilita grupos específicos de verificações em documentation comments.

_group_ pode ter um dos seguintes valores: `accessibility`, `html`, `missing`, `reference`, `syntax`.

A variável _access_ especifica o visibility level mínimo de classes e membros que a opção `-Xdoclint` verifica. Pode ter um dos seguintes valores (em ordem do mais para o menos visível): `public`, `protected`, `package`, `private`.

O _access_ level padrão é `private`.

Quando prefixados por `doclint:`, os nomes de _group_ e `all` podem ser usados com `@SuppressWarnings` para suprimir avisos sobre documentation comments em partes do código que está sendo compilado.

Para mais informações sobre esses grupos de verificações, consulte a seção [DocLint](<#/doc/guides/tools/javadoc>) da documentação do comando `javadoc`. A opção `-Xdoclint` é desabilitada por padrão no comando `javac`.

Por exemplo, a seguinte opção verifica classes e membros (com todos os grupos de verificações) que têm o access level de protected e superior (o que inclui protected e public):

> `-Xdoclint:all/protected`

A seguinte opção habilita todos os grupos de verificações para todos os access levels, exceto que não verificará erros HTML para classes e membros que têm o access level de package e superior (o que inclui package, protected e public):

> `-Xdoclint:all,-html/package`

`-Xdoclint/package:`[`-`]_packages_(`,`[`-`]_package_)*
    

Habilita ou desabilita verificações em packages específicos. Cada _package_ é o qualified name de um package ou um package name prefix seguido por `.*`, que se expande para todos os sub-packages do package dado. Cada _package_ pode ser prefixado com um hífen (`-`) para desabilitar verificações para um package ou packages especificados.

Para mais informações, consulte a seção [DocLint](<#/doc/guides/tools/javadoc>) da documentação do comando `javadoc`.

`-Xlint`
     Habilita todos os avisos recomendados. Nesta versão, habilitar todos os avisos disponíveis é recomendado.
`-Xlint:`[`-`]_key_(`,`[`-`]_key_)*
    

Habilita e/ou desabilita warning categories usando uma ou mais das chaves descritas abaixo, separadas por vírgulas. As chaves `all` e `none` habilitam ou desabilitam todas as categorias (respectivamente); outras chaves habilitam a categoria correspondente, ou a desabilitam se precedidas por um hífen (`-`).

Os valores suportados para _key_ são:

  * `all`: Habilita todas as warning categories.

  * `auxiliaryclass`: Avisa sobre uma auxiliary class que está oculta em um arquivo de origem e é usada por outros arquivos.

  * `cast`: Avisa sobre o uso de casts desnecessários.

  * `classfile`: Avisa sobre problemas relacionados ao conteúdo de classfile.

  * `dangling-doc-comments`: Avisa sobre documentation comments extras ou mal posicionados perto do início de uma declaração.

  * `deprecation`: Avisa sobre o uso de itens deprecated.

  * `dep-ann`: Avisa sobre itens marcados como deprecated em `javadoc` mas sem a anotação `@Deprecated`.

  * `divzero`: Avisa sobre a divisão por uma constante inteira 0.

  * `empty`: Avisa sobre uma empty statement após um `if`.

  * `exports`: Avisa sobre problemas relacionados a module exports.

  * `fallthrough`: Avisa sobre a passagem de um caso de uma instrução `switch` para o próximo.

  * `finally`: Avisa sobre cláusulas `finally` que não terminam normalmente.

  * `identity`: Avisa sobre o uso de uma value-based class onde uma identity class é esperada.

  * `incubating`: Avisa sobre o uso de incubating modules.

  * `lossy-conversions`: Avisa sobre possíveis lossy conversions em atribuições compostas.

  * `missing-explicit-ctor`: Avisa sobre construtores explícitos ausentes em classes public e protected em packages exportados.

  * `module`: Avisa sobre problemas relacionados ao module system.

  * `opens`: Avisa sobre problemas relacionados a module opens.

  * `options`: Avisa sobre problemas relacionados ao uso de opções de linha de comando.

  * `output-file-clash`: Avisa se algum arquivo de saída for sobrescrito durante a compilação. Isso pode ocorrer, por exemplo, em filesystems case-insensitive.

  * `overloads`: Avisa sobre problemas relacionados a method overloads.

  * `overrides`: Avisa sobre problemas relacionados a method overrides.

  * `path`: Avisa sobre elementos de path inválidos na linha de comando.

  * `preview`: Avisa sobre o uso de preview language features.

  * `processing`: Avisa sobre problemas relacionados a annotation processing.

  * `rawtypes`: Avisa sobre o uso de raw types.

  * `removal`: Avisa sobre o uso de uma API que foi marcada para remoção.

  * `restricted`: Avisa sobre o uso de restricted methods.

  * `requires-automatic`: Avisa desenvolvedores sobre o uso de automatic modules em requires clauses.

  * `requires-transitive-automatic`: Avisa sobre automatic modules em requires transitive.

  * `serial`: Avisa sobre classes serializable que não fornecem um serial version ID. Também avisa sobre o acesso a membros non-public de um elemento serializable.

  * `static`: Avisa sobre o acesso a um membro static usando uma instância.

  * `strictfp`: Avisa sobre o uso desnecessário do modificador `strictfp`.

  * `synchronization`: Avisa sobre tentativas de synchronization em instâncias de value-based classes. Esta chave é um alias deprecated para `identity`, que tem os mesmos usos e efeitos. Os usuários são encorajados a usar a categoria `identity` para todos os usos futuros e existentes de `synchronization`.

  * `text-blocks`: Avisa sobre caracteres de espaço em branco inconsistentes na text block indentation.

  * `this-escape`: Avisa sobre construtores vazando `this` antes da subclass initialization.

  * `try`: Avisa sobre problemas relacionados ao uso de try blocks (ou seja, try-with-resources).

  * `unchecked`: Avisa sobre unchecked operations.

  * `varargs`: Avisa sobre métodos `vararg` potencialmente inseguros.

  * `none`: Desabilita todas as warning categories.




Com exceção de `all` e `none`, as chaves podem ser usadas com a anotação `@SuppressWarnings` para suprimir avisos em uma parte do código fonte que está sendo compilado.

Consulte Exemplos de Uso das chaves -Xlint.

`-Xmaxerrs` _number_
     Define o número máximo de erros a serem impressos.
`-Xmaxwarns` _number_
     Define o número máximo de avisos a serem impressos.
`-Xpkginfo:`[`always`, `legacy`, `nonempty`]
    

Especifica quando e como o comando `javac` gera arquivos `package-info.class` a partir de arquivos `package-info.java` usando uma das seguintes opções:

`always`
     Gera um arquivo `package-info.class` para cada arquivo `package-info.java`. Esta opção pode ser útil se você usa um sistema de build como o Ant, que verifica se cada arquivo `.java` tem um arquivo `.class` correspondente.
`legacy`
    

Gera um arquivo `package-info.class` apenas se `package-info.java` contiver anotações. Esta opção não gera um arquivo `package-info.class` se `package-info.java` contiver apenas comentários.

**Nota:** Um arquivo `package-info.class` pode ser gerado, mas estar vazio se todas as anotações no arquivo `package-info.java` tiverem `RetentionPolicy.SOURCE`.
`nonempty`
     Gera um arquivo `package-info.class` apenas se `package-info.java` contiver anotações com `RetentionPolicy.CLASS` ou `RetentionPolicy.RUNTIME`.

`-Xplugin:`_name_ _args_
     Especifica o nome e os argumentos opcionais para um plug-in a ser executado. Se _args_ forem fornecidos, _name_ e _args_ devem ser citados ou ter os caracteres de espaço em branco escapados entre o nome e todos os argumentos. Para detalhes sobre a API para um plugin, consulte a documentação da API para [jdk.compiler/com.sun.source.util.Plugin](<#/>).
`-Xprefer:`[`source`, `newer`]
    

Especifica qual arquivo ler quando um source file e um class file são encontrados para uma implicitly compiled class usando uma das seguintes opções. Consulte Buscando Declarações de Module, Package e Type.

  * `-Xprefer:newer`: Lê o mais recente dos arquivos de origem ou .class para um type (padrão).

  * `-Xprefer:source` : Lê o source file. Use `-Xprefer:source` quando quiser ter certeza de que quaisquer annotation processors podem acessar anotações declaradas com uma retention policy de `SOURCE`.

`-Xprint`
     Imprime uma textual representation de types especificados para debugging purposes. Isso não executa annotation processing ou compilação. O formato da saída pode mudar.
`-XprintProcessorInfo`
     Imprime informações sobre quais anotações um processor é solicitado a processar.
`-XprintRounds`
     Imprime informações sobre initial e subsequent annotation processing rounds.
`-Xstdout` _filename_
     Envia mensagens do compilador para o arquivo nomeado. Por padrão, as mensagens do compilador vão para `System.err`.
## Variáveis de Ambiente

### CLASSPATH

Se a opção `--class-path` ou qualquer uma de suas formas alternativas não for especificada, o classpath terá como padrão o valor da variável de ambiente `CLASSPATH`, se ela estiver definida. No entanto, é recomendado que esta variável de ambiente _não_ seja definida, e que a opção `--class-path` seja usada para fornecer um valor explícito para o classpath quando um for necessário.

### JDK_JAVAC_OPTIONS

O conteúdo da variável de ambiente `JDK_JAVAC_OPTIONS`, separado por espaços em branco ( ) ou caracteres de espaço em branco (`\n`, `\t`, `\r`, ou `\f`), é adicionado no início dos argumentos de linha de comando passados para `javac` como uma lista de argumentos.

O requisito de codificação para a variável de ambiente é o mesmo da linha de comando `javac` no sistema. O conteúdo da variável de ambiente `JDK_JAVAC_OPTIONS` é tratado da mesma maneira que o especificado na linha de comando.

Aspas simples (`'`) ou aspas duplas (`"`) podem ser usadas para envolver argumentos que contêm caracteres de espaço em branco. Todo o conteúdo entre a aspa de abertura e a primeira aspa de fechamento correspondente é preservado simplesmente removendo o par de aspas. Caso uma aspa correspondente não seja encontrada, o launcher será abortado com uma mensagem de erro. `@`_files_ são suportados como especificados na linha de comando. No entanto, assim como em `@`_files_ , o uso de um wildcard não é suportado.

**Exemplos de argumentos entre aspas contendo espaços em branco:**

> `export JDK_JAVAC_OPTIONS='@"C:\white spaces\argfile"'`

> `export JDK_JAVAC_OPTIONS='"@C:\white spaces\argfile"'`

> `export JDK_JAVAC_OPTIONS='@C:\"white spaces"\argfile'`

## Arquivos de Argumentos de Linha de Comando

Um arquivo de argumento pode incluir opções de linha de comando e nomes de arquivos fonte em qualquer combinação. Os argumentos dentro de um arquivo podem ser separados por espaços ou caracteres de nova linha. Se um nome de arquivo contiver espaços incorporados, coloque o nome do arquivo inteiro entre aspas duplas.

Os nomes de arquivos dentro de um arquivo de argumento são relativos ao diretório atual, não ao local do arquivo de argumento. Wildcards (`*`) não são permitidos nessas listas (como para especificar `*.java`). O uso do sinal de arroba (`@`) para interpretar arquivos recursivamente não é suportado. As opções `-J` não são suportadas porque são passadas para o launcher, que não suporta arquivos de argumento.

Ao executar o comando `javac`, passe o caminho e o nome de cada arquivo de argumento com o caractere inicial de arroba (`@`). Quando o comando `javac` encontra um argumento começando com o sinal de arroba (`@`), ele expande o conteúdo desse arquivo na lista de argumentos.

### Exemplos de Uso de javac @filename

Arquivo de Argumento Único

Você pode usar um único arquivo de argumento chamado `argfile` para conter todos os argumentos `javac`:

> `javac @argfile`

Este arquivo de argumento poderia conter o conteúdo de ambos os arquivos mostrados no exemplo a seguir de **Dois Arquivos de Argumento**.

Dois Arquivos de Argumento

Você pode criar dois arquivos de argumento: um para as opções `javac` e outro para os nomes dos arquivos fonte. Observe que as listas a seguir não possuem caracteres de continuação de linha.

Crie um arquivo chamado `options` que contenha o seguinte:

**Linux e macOS:**
```
    -d classes
    -g
    -sourcepath /java/pubs/ws/1.3/src/share/classes
```

**Windows:**
```
    -d classes
    -g
    -sourcepath C:\java\pubs\ws\1.3\src\share\classes
```

Crie um arquivo chamado `sources` que contenha o seguinte:
```
    MyClass1.java
    MyClass2.java
    MyClass3.java
```

Em seguida, execute o comando `javac` da seguinte forma:

> `javac @options @sources`

Arquivos de Argumento com Caminhos

Os arquivos de argumento podem ter caminhos, mas quaisquer nomes de arquivos dentro dos arquivos são relativos ao diretório de trabalho atual (não a `path1` ou `path2`):

> `javac @path1/options @path2/sources`

## Organização do Código Fonte

Na linguagem Java, classes e interfaces podem ser organizadas em pacotes, e pacotes podem ser organizados em módulos. O `javac` espera que a organização física dos arquivos fonte em diretórios do sistema de arquivos espelhe a organização de classes em pacotes, e de pacotes em módulos.

É uma convenção amplamente adotada que nomes de módulos e nomes de pacotes começam com uma letra minúscula, e que nomes de classes começam com uma letra maiúscula.

### Organização do Código Fonte para um Pacote

Quando classes e interfaces são organizadas em um pacote, o pacote é representado como um diretório, e quaisquer subpacotes são representados como subdiretórios.

Por exemplo:

  * O pacote `p` é representado como um diretório chamado `p`.

  * O pacote `p.q` -- ou seja, o subpacote `q` do pacote `p` -- é representado como o subdiretório `q` do diretório `p`. A árvore de diretórios que representa o pacote `p.q` é, portanto, `p\q` no Windows, e `p/q` em outros sistemas.

  * O pacote `p.q.r` é representado como a árvore de diretórios `p\q\r` (no Windows) ou `p/q/r` (em outros sistemas).

Dentro de um diretório ou subdiretório, arquivos `.java` representam classes e interfaces no pacote ou subpacote correspondente.

Por exemplo:

  * A classe `X` declarada no pacote `p` é representada pelo arquivo `X.java` no diretório `p`.

  * A classe `Y` declarada no pacote `p.q` é representada pelo arquivo `Y.java` no subdiretório `q` do diretório `p`.

  * A classe `Z` declarada no pacote `p.q.r` é representada pelo arquivo `Z.java` no subdiretório `r` de `p\q` (no Windows) ou `p/q` (em outros sistemas).

Em algumas situações, é conveniente dividir o código em diretórios separados, cada um estruturado como descrito acima, e a lista agregada de diretórios especificada para `javac`.

### Organização do Código Fonte para um Módulo

Na linguagem Java, um módulo é um conjunto de pacotes projetados para reutilização. Além dos arquivos `.java` para classes e interfaces, cada módulo possui um arquivo fonte chamado `module-info.java` que:

  1. declara o nome do módulo;

  2. lista os pacotes exportados pelo módulo (para permitir a reutilização por outros módulos);

  3. lista outros módulos exigidos pelo módulo (para reutilizar seus pacotes exportados).

Quando os pacotes são organizados em um módulo, o módulo é representado por um ou mais diretórios que representam os pacotes no módulo, um dos quais contém o arquivo `module-info.java`. Pode ser conveniente, mas não é obrigatório, usar um único diretório, nomeado após o módulo, para conter o arquivo `module-info.java` junto com a árvore de diretórios que representa os pacotes no módulo (ou seja, a _hierarquia de pacotes_ descrita acima). A organização exata do código fonte para um módulo é tipicamente ditada pelas convenções adotadas por um ambiente de desenvolvimento (IDE) ou sistema de build.

Por exemplo:

  * O módulo `a.b.c` pode ser representado pelo diretório `a.b.c`, em todos os sistemas.

  * A declaração do módulo é representada pelo arquivo `module-info.java` no diretório `a.b.c`.

  * Se o módulo contiver o pacote `p.q.r`, então o diretório `a.b.c` contém a árvore de diretórios `p\q\r` (no Windows) ou `p/q/r` (em outros sistemas).

O ambiente de desenvolvimento pode prescrever alguma hierarquia de diretórios entre o diretório nomeado para o módulo e os arquivos fonte a serem lidos pelo `javac`.

Por exemplo:

  * O módulo `a.b.c` pode ser representado pelo diretório `a.b.c`

  * A declaração do módulo e os pacotes do módulo podem estar em algum subdiretório de `a.b.c`, como `src\main\java` (no Windows) ou `src/main/java` (em outros sistemas).

## Configurando uma Compilação

Esta seção descreve como configurar o `javac` para realizar uma compilação básica.

Consulte Configurando o Sistema de Módulos para detalhes adicionais sobre o uso ao compilar para uma versão da plataforma que suporta módulos.

### Arquivos Fonte

  * Especifique os arquivos fonte a serem compilados na linha de comando.

Se não houver erros de compilação, os arquivos de classe correspondentes serão colocados no diretório de saída.

Alguns sistemas podem limitar a quantidade de dados que você pode colocar em uma linha de comando; para contornar esses limites, você pode usar arquivos de argumento.

Ao compilar código para módulos, você também pode especificar arquivos fonte indiretamente, usando a opção `--module` ou `-m`.

### Diretório de Saída

  * Use a opção `-d` para especificar um diretório de saída onde colocar os arquivos de classe compilados.

Isso normalmente será organizado em uma hierarquia de pacotes, a menos que você esteja compilando código fonte de múltiplos módulos, caso em que será organizado como uma hierarquia de módulos.

Quando a compilação for concluída, se você estiver compilando um ou mais módulos, poderá colocar o diretório de saída no module path para o [launcher](<#/doc/guides/tools/java>) Java; caso contrário, você poderá colocar o diretório de saída no classpath para o launcher Java.

### Código Pré-compilado

O código a ser compilado pode fazer referência a bibliotecas além do que é fornecido pela plataforma. Se for o caso, você deve colocar essas bibliotecas no classpath ou module path. Se o código da biblioteca não estiver em um módulo, coloque-o no classpath; se estiver em um módulo, coloque-o no module path.

  * Use a opção `--class-path` para especificar bibliotecas a serem colocadas no classpath. Os locais no classpath devem ser organizados em uma hierarquia de pacotes. Você também pode usar formas alternativas da opção: `-classpath` ou `-cp`.

  * Use a opção `--module-path` para especificar bibliotecas a serem colocadas no module path. Os locais no module path devem ser módulos ou diretórios de módulos. Você também pode usar uma forma alternativa da opção: `-p`.

Consulte Configurando o Sistema de Módulos para detalhes sobre como modificar a configuração padrão dos módulos de biblioteca.

**Nota**: as opções para o classpath e module path não são mutuamente exclusivas, embora não seja comum especificar o classpath ao compilar código para um ou mais módulos.

### Arquivos Fonte Adicionais

O código a ser compilado pode fazer referência a tipos em arquivos fonte adicionais que não são especificados na linha de comando. Se for o caso, você deve colocar esses arquivos fonte no source path ou no module path. Você só pode especificar uma dessas opções: se você não estiver compilando código para um módulo, ou se estiver compilando código apenas para um único módulo, use o source path; se estiver compilando código para múltiplos módulos, use o module source path.

  * Use a opção `--source-path` para especificar os locais de arquivos fonte adicionais que podem ser lidos pelo javac. Os locais no source path devem ser organizados em uma hierarquia de pacotes. Você também pode usar uma forma alternativa da opção: `-sourcepath`.

  * Use a opção `--module-source-path` uma ou mais vezes para especificar o local de arquivos fonte adicionais em diferentes módulos que podem ser lidos pelo javac, ou ao compilar arquivos fonte em múltiplos módulos. Você pode especificar os locais para cada módulo individualmente, ou pode organizar os arquivos fonte de forma que possa especificar todos os locais juntos. Para mais detalhes, consulte A Opção Module Source Path.

Se você quiser poder fazer referência a tipos em arquivos fonte adicionais, mas não quiser que eles sejam compilados, use a opção `-implicit`.

**Nota**: se você estiver compilando código para múltiplos módulos, você deve sempre especificar um module source path, e todos os arquivos fonte especificados na linha de comando devem estar em um dos diretórios no module source path, ou em um subdiretório dele.

### Exemplo de Compilação de Múltiplos Arquivos Fonte

Este exemplo compila os arquivos fonte `Aloha.java`, `GutenTag.java`, `Hello.java` e `Hi.java` no pacote `greetings`.

**Linux e macOS:**
```
    % javac greetings/*.java
    % ls greetings
    Aloha.class         GutenTag.class      Hello.class         Hi.class
    Aloha.java          GutenTag.java       Hello.java          Hi.java
```

**Windows:**
```
    C:\>javac greetings\*.java
    C:\>dir greetings
    Aloha.class         GutenTag.class      Hello.class         Hi.class
    Aloha.java          GutenTag.java       Hello.java          Hi.java
```

### Exemplo de Especificação de um Classpath de Usuário

Após alterar um dos arquivos fonte no exemplo anterior, recompile-o:

**Linux e macOS:**
```
    pwd
    /examples
    javac greetings/Hi.java
```

**Windows:**
```
    C:\>cd
    \examples
    C:\>javac greetings\Hi.java
```

Como `greetings.Hi` faz referência a outras classes no pacote `greetings`, o compilador precisa encontrar essas outras classes. O exemplo anterior funciona porque o classpath de usuário padrão é o diretório que contém o diretório do pacote. Se você quiser recompilar este arquivo sem se preocupar com o diretório em que está, adicione o diretório `examples` ao classpath de usuário definindo `CLASSPATH`. Este exemplo usa a opção `-classpath`.

**Linux e macOS:**

> `javac -classpath /examples /examples/greetings/Hi.java`

**Windows:**

> `C:\>javac -classpath \examples \examples\greetings\Hi.java`

Se você alterar `greetings.Hi` para usar um utilitário de banner, então esse utilitário também precisará estar acessível através do classpath de usuário.

**Linux e macOS:**
```
    javac -classpath /examples:/lib/Banners.jar \
                /examples/greetings/Hi.java
```

**Windows:**
```
    C:\>javac -classpath \examples;\lib\Banners.jar ^
                \examples\greetings\Hi.java
```

Para executar uma classe no pacote `greetings`, o programa precisa de acesso ao pacote `greetings` e às classes que as classes `greetings` utilizam.

**Linux e macOS:**

> `java -classpath /examples:/lib/Banners.jar greetings.Hi`

**Windows:**

> `C:\>java -classpath \examples;\lib\Banners.jar greetings.Hi`

## Configurando o Sistema de Módulos

Se você deseja incluir módulos adicionais em sua compilação, use a opção `--add-modules`. Isso pode ser necessário quando você está compilando código que não está em um módulo, ou que está em um módulo automático, e o código faz referência a APIs nos módulos adicionais.

Se você deseja restringir o conjunto de módulos em sua compilação, use a opção `--limit-modules`. Isso pode ser útil se você quiser garantir que o código que está compilando seja capaz de rodar em um sistema com um conjunto limitado de módulos instalados.

Se você deseja quebrar a encapsulação e especificar que pacotes adicionais devem ser considerados como exportados de um módulo, use a opção `--add-exports`. Isso pode ser útil ao realizar testes de caixa branca; depender do acesso a APIs internas em código de produção é fortemente desencorajado.

Se você deseja especificar que pacotes adicionais devem ser considerados como exigidos por um módulo, use a opção `--add-reads`. Isso pode ser útil ao realizar testes de caixa branca; depender do acesso a APIs internas em código de produção é fortemente desencorajado.

Você pode aplicar patches de conteúdo adicional em qualquer módulo usando a opção `--patch-module`. Consulte [Patching a Module] para mais detalhes.

## Buscando Declarações de Módulos, Pacotes e Tipos

Para compilar um arquivo fonte, o compilador frequentemente precisa de informações sobre um módulo ou tipo, mas a declaração não está nos arquivos fonte especificados na linha de comando.

O `javac` precisa de informações de tipo para cada classe ou interface usada, estendida ou implementada no arquivo fonte. Isso inclui classes e interfaces não explicitamente mencionadas no arquivo fonte, mas que fornecem informações através de herança.

Por exemplo, ao criar uma subclasse de `java.awt.Window`, você também está usando as classes ancestrais de `Window`: `java.awt.Container`, `java.awt.Component` e `java.lang.Object`.

Ao compilar código para um módulo, o compilador também precisa ter disponível a declaração desse módulo.

Uma busca bem-sucedida pode produzir um arquivo de classe, um arquivo fonte ou ambos. Se ambos forem encontrados, você pode usar a opção `-Xprefer` para instruir o compilador qual usar.

Se uma busca encontra e usa um arquivo fonte, então por padrão o `javac` compila esse arquivo fonte. Este comportamento pode ser alterado com `-implicit`.

O compilador pode não descobrir a necessidade de algumas informações de tipo até que o processamento de anotações seja concluído. Quando a informação de tipo é encontrada em um arquivo fonte e nenhuma opção `-implicit` é especificada, o compilador emite um aviso de que o arquivo está sendo compilado sem ser submetido ao processamento de anotações. Para desabilitar o aviso, especifique o arquivo na linha de comando (para que ele seja submetido ao processamento de anotações) ou use a opção `-implicit` para especificar se os arquivos de classe devem ou não ser gerados para tais arquivos fonte.

A maneira como o `javac` localiza as declarações desses tipos depende se a referência existe dentro do código para um módulo ou não.

### Buscando em Caminhos Orientados a Pacotes

Ao buscar um arquivo fonte ou de classe em um caminho composto por locais orientados a pacotes, o `javac` verificará cada local no caminho, por sua vez, para a possível presença do arquivo. A primeira ocorrência de um arquivo específico sombreia (oculta) quaisquer ocorrências subsequentes de arquivos com o mesmo nome. Este sombreamento não afeta nenhuma busca por arquivos com nomes diferentes. Isso pode ser conveniente ao buscar arquivos fonte, que podem ser agrupados em diferentes locais, como código compartilhado, código específico da plataforma e código gerado. Também pode ser útil ao injetar versões alternativas de um arquivo de classe em um pacote, para depuração ou outras razões de instrumentação. Mas, também pode ser perigoso, como ao colocar versões diferentes e incompatíveis de uma biblioteca no classpath.

### Buscando em Caminhos Orientados a Módulos

Antes de escanear quaisquer module paths para quaisquer declarações de pacotes ou tipos, o `javac` escaneará preguiçosamente os seguintes caminhos e locais para determinar os módulos que serão usados na compilação.

  * O module source path (consulte a opção `--module-source-path`)
  * O caminho para módulos atualizáveis (consulte a opção `--upgrade-module-path`)
  * Os módulos do sistema (consulte a opção `--system`)
  * O module path do usuário (consulte a opção `--module-path`)

Para qualquer módulo, a primeira ocorrência do módulo durante a varredura sombreia (oculta) completamente qualquer aparição subsequente de um módulo com nome semelhante. Ao localizar os módulos, o `javac` é capaz de determinar os pacotes exportados pelo módulo e associar a cada módulo um caminho orientado a pacotes para o conteúdo do módulo. Para qualquer módulo previamente compilado, este caminho será tipicamente uma única entrada para um diretório ou um arquivo que fornece uma hierarquia interna semelhante a um diretório, como um arquivo JAR. Assim, ao buscar um tipo que está em um pacote conhecido por ser exportado por um módulo, o `javac` pode localizar a declaração direta e eficientemente.

### Buscando a Declaração de um Módulo

Se o módulo foi previamente compilado, a declaração do módulo está localizada em um arquivo chamado `module-info.class` na raiz da hierarquia de pacotes para o conteúdo do módulo.

Se o módulo for um dos que estão sendo compilados atualmente, a declaração do módulo será o arquivo chamado `module-info.class` na raiz da hierarquia de pacotes para o módulo no diretório de saída de classes, ou o arquivo chamado `module-info.java` em um dos locais no source path ou no module source path para o módulo.

### Buscando a Declaração de um Tipo Quando a Referência Não Está em um Módulo

Ao buscar um tipo que é referenciado em código que não está em um módulo, o `javac` procurará nos seguintes locais:

  * As classes da plataforma (ou os tipos em pacotes exportados dos módulos da plataforma) (Isso é apenas para arquivos de classe compilados.)

  * Tipos em pacotes exportados de quaisquer módulos no module path, se aplicável. (Isso é apenas para arquivos de classe compilados.)

  * Tipos em pacotes no classpath e/ou source path:

    * Se ambos forem especificados, o `javac` procura por arquivos de classe compilados no classpath e por arquivos fonte no source path.

    * Se o classpath for especificado, mas não o source path, o `javac` procura por arquivos de classe compilados e arquivos fonte no classpath.

    * Se o classpath não for especificado, ele assume como padrão o diretório atual.

Ao procurar um tipo no classpath e/ou source path, se ambos, um arquivo de classe compilado e um arquivo fonte, forem encontrados, o arquivo modificado mais recentemente será usado por padrão. Se o arquivo fonte for mais novo, ele será compilado e poderá sobrescrever qualquer versão previamente compilada do arquivo. Você pode usar a opção `-Xprefer` para sobrescrever o comportamento padrão.

### Buscando a Declaração de um Tipo Quando a Referência Está em um Módulo

Ao buscar um tipo que é referenciado em código dentro de um módulo, o `javac` examinará a declaração do módulo envolvente para determinar se o tipo está em um pacote que é exportado de outro módulo que é legível pelo módulo envolvente. Se sim, o `javac` simplesmente e diretamente irá para a definição desse módulo para encontrar a definição do tipo necessário. A menos que o módulo seja outro dos módulos que estão sendo compilados, o `javac` procurará apenas por arquivos de classe compilados. Em outras palavras, o `javac` não procurará por arquivos fonte em módulos da plataforma ou módulos no module path.

Se o tipo referenciado não estiver em algum outro módulo legível, o `javac` examinará o módulo que está sendo compilado para tentar encontrar a declaração do tipo. O `javac` procurará a declaração do tipo da seguinte forma:

  * Arquivos fonte especificados na linha de comando ou no source path ou module source path.

  * Arquivos previamente compilados no diretório de saída.
## Hierarquias de Diretórios

`javac` geralmente assume que os arquivos de origem e os arquivos de classe compilados serão organizados em uma hierarquia de diretórios do sistema de arquivos ou em um tipo de arquivo que suporte uma hierarquia de diretórios interna, como um arquivo JAR. Três tipos diferentes de hierarquia são suportados: uma _hierarquia de pacotes_, uma _hierarquia de módulos_ e uma _hierarquia de origem de módulos_.

Embora o `javac` seja bastante flexível quanto à organização do código-fonte, além da expectativa de que o código-fonte será organizado em uma ou mais hierarquias de pacotes, e geralmente pode acomodar organizações prescritas por ambientes de desenvolvimento e ferramentas de construção, as ferramentas Java em geral, e o `javac` e o Java launcher em particular, são mais rigorosas quanto à organização dos arquivos de classe compilados, e estes serão organizados em hierarquias de pacotes ou hierarquias de módulos, conforme apropriado.

A localização dessas hierarquias é especificada para o `javac` com opções de linha de comando, cujos nomes geralmente terminam em "path", como `--source-path` ou `--class-path`. Além disso, como regra geral, as opções de path cujo nome inclui a palavra `module`, como `--module-path`, são usadas para especificar hierarquias de módulos, embora algumas opções de path relacionadas a módulos permitam que uma hierarquia de pacotes seja especificada por módulo. Todas as outras opções de path são usadas para especificar hierarquias de pacotes.

### Hierarquia de Pacotes

Em uma hierarquia de pacotes, diretórios e subdiretórios são usados para representar as partes componentes do nome do pacote, com o arquivo de origem ou arquivo de classe compilado para um tipo sendo armazenado como um arquivo com uma extensão `.java` ou `.class` no diretório mais aninhado.

Por exemplo, em uma hierarquia de pacotes, o arquivo de origem para uma classe `com.example.MyClass` será armazenado no arquivo _com/example/MyClass.java_.

### Hierarquia de Módulos

Em uma hierarquia de módulos, o primeiro nível de diretórios é nomeado para os módulos na hierarquia; dentro de cada um desses diretórios, o conteúdo do módulo é organizado em hierarquias de pacotes.

Por exemplo, em uma hierarquia de módulos, o arquivo de classe compilado para um tipo chamado `com.example.MyClass` em um módulo chamado `my.library` será armazenado em _my.library/com/example/MyClass.class_.

Os vários diretórios de saída usados pelo `javac` (o diretório de saída de classes, o diretório de saída de origem e o diretório de saída de cabeçalhos nativos) serão todos organizados em uma hierarquia de módulos quando múltiplos módulos estiverem sendo compilados.

### Hierarquia de Origem de Módulos

Embora a origem para cada módulo individual deva ser sempre organizada em uma hierarquia de pacotes, pode ser conveniente agrupar essas hierarquias em uma hierarquia de origem de módulos. Isso é semelhante a uma hierarquia de módulos, exceto que pode haver diretórios intermediários entre o diretório do módulo e o diretório que é a raiz da hierarquia de pacotes para o código-fonte do módulo.

Por exemplo, em uma hierarquia de origem de módulos, o arquivo de origem para um tipo chamado `com.example.MyClass` em um módulo chamado `my.library` pode ser armazenado em um arquivo como _my.library/src/main/java/com/example/MyClass.java_.

## A Opção Module Source Path

A opção `--module-source-path` tem duas formas: uma _forma específica de módulo_, na qual um caminho de pacote é fornecido para cada módulo contendo código a ser compilado, e uma _forma de padrão de módulo_, na qual o caminho de origem para cada módulo é especificado por um padrão. A forma específica de módulo é geralmente mais simples de usar quando apenas um pequeno número de módulos está envolvido; a forma de padrão de módulo pode ser mais conveniente quando o número de módulos é grande e os módulos são organizados de maneira regular que pode ser descrita por um padrão.

Múltiplas instâncias da opção `--module-source-path` podem ser fornecidas, cada uma usando a forma de padrão de módulo ou a forma específica de módulo, sujeitas às seguintes limitações:

  * a forma de padrão de módulo pode ser usada no máximo uma vez
  * a forma específica de módulo pode ser usada no máximo uma vez para qualquer módulo dado

Se a forma específica de módulo for usada para qualquer módulo, o caminho de busca associado substitui qualquer caminho que poderia ter sido inferido da forma de padrão de módulo.

### Forma específica de módulo

A forma específica de módulo permite que um caminho de busca explícito seja fornecido para qualquer módulo específico. Esta forma é:

  * `--module-source-path` _module-name_`=`_file-path_ (_path-separator_ _file-path_)*

O caractere separador de caminho é `;` no Windows e `:` caso contrário.

**Nota:** isso é semelhante à forma usada para a opção `--patch-module`.

### Forma de padrão de módulo

A forma de padrão de módulo permite uma especificação concisa do caminho de origem do módulo para qualquer número de módulos organizados de maneira regular.

  * `--module-source-path` _pattern_

O padrão é definido pelas seguintes regras, que são aplicadas em ordem:

  * O argumento é considerado uma série de segmentos separados pelo caractere separador de caminho (`;` no Windows e `:` caso contrário).

  * Cada segmento contendo chaves na forma
` string1{alt1 ( ,alt2 )* } string2
```

é considerado substituído por uma série de segmentos formados pela "expansão" das chaves:
` string1 alt1 string2
        string1 alt2 string2
        and so on...
```

As chaves podem ser aninhadas.

Esta regra é aplicada para todos os usos de chaves.

  * Cada segmento deve ter no máximo um asterisco (`*`). Se um segmento não contiver um asterisco, é considerado como se o caractere separador de arquivo e um asterisco fossem anexados.

Para qualquer módulo _M_, o caminho de origem para esse módulo é formado pela série de segmentos obtidos substituindo o nome do módulo _M_ pelo asterisco em cada segmento.

**Nota**: neste contexto, o asterisco é usado apenas como um marcador especial, para denotar a posição no caminho do nome do módulo. Não deve ser confundido com o uso de `*` como um caractere curinga de nome de arquivo, como encontrado na maioria dos sistemas operacionais.

## Aplicando Patches em Módulos

O `javac` permite que qualquer conteúdo, seja em forma de origem ou compilado, seja aplicado (patched) em qualquer módulo usando a opção `--patch-module`. Você pode querer fazer isso para compilar implementações alternativas de uma classe a serem aplicadas em tempo de execução em uma JVM, ou para injetar classes adicionais no módulo, como em testes.

A forma da opção é:

  * `--patch-module` _module-name_`=`_file-path_ (_path-separator_ _file-path_ )*

O caractere separador de caminho é `;` no Windows e `:` caso contrário. Os caminhos fornecidos para o módulo devem especificar a raiz de uma hierarquia de pacotes para o conteúdo do módulo.

A opção pode ser fornecida no máximo uma vez para qualquer módulo dado. Qualquer conteúdo no caminho ocultará qualquer conteúdo de mesmo nome mais adiante no caminho e no módulo aplicado.

Ao aplicar código-fonte em mais de um módulo, a opção `--module-source-path` também deve ser usada, para que o diretório de saída seja organizado em uma hierarquia de módulos e seja capaz de conter os arquivos de classe compilados para os módulos que estão sendo compilados.

## Processamento de Anotações

O comando `javac` fornece suporte direto para processamento de anotações.

A API para processadores de anotações é definida nos pacotes e subpacotes `javax.annotation.processing` e `javax.lang.model`.

### Como Funciona o Processamento de Anotações

O processamento de anotações é solicitado usando uma opção para configurar o processamento de anotações, como `-processor`, `--processor-path`, `--processor-module-path` ou habilitando explicitamente o processamento com as opções `-proc:full` ou `-proc:only`. O processamento de anotações é desabilitado usando a opção `-proc:none`.

Se o processamento de anotações for solicitado, o compilador procura por quaisquer processadores de anotações disponíveis.

O caminho de busca pode ser especificado com a opção `-processorpath`. Se nenhum caminho for especificado, o classpath do usuário é usado. Os processadores são localizados por meio de arquivos de configuração de provedor de serviço nomeados `META-INF/services/javax.annotation.processing.Processor` no caminho de busca. Tais arquivos devem conter os nomes de quaisquer processadores de anotações a serem usados, listados um por linha. Alternativamente, os processadores podem ser especificados explicitamente, usando a opção `-processor`.

Após escanear os arquivos de origem e classes na linha de comando para determinar quais anotações estão presentes, o compilador consulta os processadores para determinar quais anotações eles processam. Quando uma correspondência é encontrada, o processador é chamado. Um processador pode reivindicar as anotações que processa, caso em que nenhuma outra tentativa é feita para encontrar processadores para essas anotações. Depois que todas as anotações são reivindicadas, o compilador não procura por processadores adicionais.

Se quaisquer processadores gerarem novos arquivos de origem, então ocorre outra rodada de processamento de anotações: Quaisquer arquivos de origem recém-gerados são escaneados, e as anotações processadas como antes. Quaisquer processadores chamados em rodadas anteriores também são chamados em todas as rodadas subsequentes. Isso continua até que nenhum novo arquivo de origem seja gerado.

Após uma rodada em que nenhum novo arquivo de origem é gerado, os processadores de anotações são chamados uma última vez, para lhes dar a chance de completar qualquer trabalho restante. Finalmente, a menos que a opção `-proc:only` seja usada, o compilador compila os arquivos de origem originais e todos os gerados.

Se você usar um processador de anotações que gera arquivos de origem adicionais a serem incluídos na compilação, você pode especificar um módulo padrão a ser usado para os arquivos recém-gerados, para uso quando uma declaração de módulo também não for gerada. Neste caso, use a opção `--default-module-for-created-files`.

### Ambiente de Compilação e Ambiente de Tempo de Execução.

As declarações em arquivos de origem e arquivos de classe previamente compilados são analisadas pelo `javac` em um _ambiente de compilação_ que é distinto do _ambiente de tempo de execução_ usado para executar o próprio `javac`. Embora haja uma semelhança deliberada entre muitas opções do `javac` e opções de mesmo nome para o [launcher](<#/doc/guides/tools/java>) Java, como `--class-path`, `--module-path` e assim por diante, é importante entender que, em geral, as opções do `javac` apenas afetam o ambiente no qual os arquivos de origem são compilados e não afetam a operação do próprio `javac`.

A distinção entre o ambiente de compilação e o ambiente de tempo de execução é significativa quando se trata de usar processadores de anotações. Embora os processadores de anotações processem elementos (declarações) que existem no ambiente de compilação, o próprio processador de anotações é executado no ambiente de tempo de execução. Se um processador de anotações tiver dependências de bibliotecas que não estão em módulos, as bibliotecas podem ser colocadas, juntamente com o próprio processador de anotações, no caminho do processador. (Consulte a opção `--processor-path`.) Se o processador de anotações e suas dependências estiverem em módulos, você deve usar o caminho do módulo do processador. (Consulte a opção `--processor-module-path`.) Quando esses não são suficientes, pode ser necessário fornecer configuração adicional do ambiente de tempo de execução. Isso pode ser feito de duas maneiras:

  1. Se o `javac` for invocado da linha de comando, as opções podem ser passadas para o tempo de execução subjacente prefixando a opção com `-J`.

  2. Você pode iniciar uma instância de uma Java Virtual Machine diretamente e usar opções de linha de comando e API para configurar um ambiente no qual o `javac` pode ser invocado por meio de uma de suas APIs.

## Compilando para Versões Anteriores da Plataforma

O `javac` pode compilar código que será usado em outras versões da plataforma, usando a opção `--release`, ou as opções `--source`/`-source` e `--target`/`-target`, juntamente com opções adicionais para especificar as classes da plataforma.

Dependendo da versão da plataforma desejada, existem algumas restrições em algumas das opções que podem ser usadas.

  * Ao compilar para JDK 8 e versões anteriores, você não pode usar nenhuma opção destinada ao uso com o sistema de módulos. Isso inclui todas as seguintes opções:

    * `--module-source-path`, `--upgrade-module-path`, `--system`, `--module-path`, `--add-modules`, `--add-exports`, `--add-opens`, `--add-reads`, `--limit-modules`, `--patch-module`

Se você usar as opções `--source`/`-source` ou `--target`/`-target`, você também deve definir as classes de plataforma apropriadas usando a família de opções do boot class path.

  * Ao compilar para JDK 9 e versões posteriores, você não pode usar nenhuma opção destinada a configurar o boot class path. Isso inclui todas as seguintes opções:

    * `-Xbootclasspath/p:`, `-Xbootclasspath`, `-Xbootclasspath/a:`, `-endorseddirs`, `-Djava.endorsed.dirs`, `-extdirs`, `-Djava.ext.dirs`, `-profile`

Se você usar as opções `--source`/`-source` ou `--target`/`-target`, você também deve definir as classes de plataforma apropriadas usando a opção `--system` para fornecer a localização de uma versão instalada apropriada do JDK.

Ao usar a opção `--release`, apenas a API documentada suportada para essa versão pode ser usada; você não pode usar nenhuma opção para quebrar o encapsulamento para acessar quaisquer classes internas.

## APIs

O compilador `javac` pode ser invocado usando uma API de três maneiras diferentes:

A [API do Compilador Java](<#/>)
     Isso fornece a maneira mais flexível de invocar o compilador, incluindo a capacidade de compilar arquivos de origem fornecidos em buffers de memória ou outros sistemas de arquivos não padrão.
A [API ToolProvider](<#/>)
    

Um `ToolProvider` para `javac` pode ser obtido chamando `ToolProvider.findFirst("javac")`. Isso retorna um objeto com a funcionalidade equivalente à ferramenta de linha de comando.

**Nota**: Esta API não deve ser confundida com a API de mesmo nome no pacote [`javax.tools`](<#/>).

A [API Legada](<#/>) do `javac`
     Esta API é mantida apenas para compatibilidade retroativa. Todo o código novo deve usar a API do Compilador Java ou a API ToolProvider.

**Nota:** Todas as outras classes e métodos encontrados em um pacote com nomes que começam com `com.sun.tools.javac` (subpacotes de `com.sun.tools.javac`) são estritamente internos e sujeitos a alterações a qualquer momento.

## Exemplos de Uso das Chaves -Xlint

`cast`
    

Avisa sobre casts desnecessários e redundantes, por exemplo:

> `String s = (String) "Hello!"`

`classfile`
     Avisa sobre problemas relacionados ao conteúdo de arquivos de classe.
`deprecation`
    

Avisa sobre o uso de itens depreciados. Por exemplo:
```
    java.util.Date myDate = new java.util.Date();
    int currentDay = myDate.getDay();
```

O método `java.util.Date.getDay` foi depreciado desde o JDK 1.1.

`dep-ann`
    

Avisa sobre itens que são documentados com o comentário Javadoc `@deprecated`, mas não possuem a anotação `@Deprecated`, por exemplo:
```
    /**
      * @deprecated As of Java SE 7, replaced by {@link #newMethod()}
      */
    public static void deprecatedMethod() { }
    public static void newMethod() { }
```

`divzero`
    

Avisa sobre divisão por uma constante inteira 0, por exemplo:

> `int divideByZero = 42 / 0;`

`empty`
    

Avisa sobre declarações vazias após instruções `if`, por exemplo:
```
    class E {
        void m() {
             if (true) ;
        }
    }
```

`fallthrough`
    

Verifica os blocos `switch` em busca de casos de "fall-through" e fornece uma mensagem de aviso para qualquer um encontrado. Casos de "fall-through" são casos em um bloco `switch`, diferentes do último caso no bloco, cujo código não inclui uma instrução `break`, permitindo que a execução do código "caia" desse caso para o próximo. Por exemplo, o código que segue o rótulo `case 1` neste bloco `switch` não termina com uma instrução `break`:
```
    switch (x) {
    case 1:
      System.out.println("1");
      // No break statement here.
    case 2:
      System.out.println("2");
    }
```

Se a opção `-Xlint:fallthrough` foi usada ao compilar este código, então o compilador emite um aviso sobre um possível "fall-through" para o caso, com o número da linha do caso em questão.

`finally`
    

Avisa sobre cláusulas `finally` que não podem ser concluídas normalmente, por exemplo:
```
    public static int m() {
      try {
         throw new NullPointerException();
      }  catch (NullPointerException e) {
         System.err.println("Caught NullPointerException.");
         return 1;
       } finally {
         return 0;
       }
      }
```

O compilador gera um aviso para o bloco `finally` neste exemplo. Quando o método `int` é chamado, ele retorna um valor de 0. Um bloco `finally` é executado quando o bloco `try` é encerrado. Neste exemplo, quando o controle é transferido para o bloco `catch`, o método `int` é encerrado. No entanto, o bloco `finally` deve ser executado, então ele é executado, mesmo que o controle tenha sido transferido para fora do método.

`options`
     Avisa sobre problemas relacionados ao uso de opções de linha de comando. Consulte Compilando para Versões Anteriores da Plataforma.
`overrides`
    

Avisa sobre problemas relacionados a sobrescritas de métodos. Por exemplo, considere as duas classes a seguir:
```
    public class ClassWithVarargsMethod {
      void varargsMethod(String... s) { }
    }
    
    public class ClassWithOverridingMethod extends ClassWithVarargsMethod {
       @Override
       void varargsMethod(String[] s) { }
    }
```

O compilador gera um aviso semelhante ao seguinte:
```
    warning: [override] varargsMethod(String[]) in ClassWithOverridingMethod
    overrides varargsMethod(String...) in ClassWithVarargsMethod; overriding
    method is missing '...'
```

Quando o compilador encontra um método `varargs`, ele traduz o parâmetro formal `varargs` em um array. No método `ClassWithVarargsMethod.varargsMethod`, o compilador traduz o parâmetro formal `varargs` `String... s` para o parâmetro formal `String[] s`, um array que corresponde ao parâmetro formal do método `ClassWithOverridingMethod.varargsMethod`. Consequentemente, este exemplo compila.

`path`
    

Avisa sobre elementos de caminho inválidos e diretórios de caminho inexistentes na linha de comando (em relação ao class path, source path e outros caminhos). Tais avisos não podem ser suprimidos com a anotação `@SuppressWarnings`. Por exemplo:

  * **Linux e macOS:** `javac -Xlint:path -classpath /nonexistentpath Example.java`

  * **Windows:** `javac -Xlint:path -classpath C:\nonexistentpath Example.java`

`processing`
    

Avisa sobre problemas relacionados ao processamento de anotações. O compilador gera este aviso quando você tem uma classe que possui uma anotação, e você usa um processador de anotações que não pode lidar com esse tipo de anotação. Por exemplo, o seguinte é um processador de anotações simples:

**Arquivo de origem AnnoProc.java**:
```
    import java.util.*;
    import javax.annotation.processing.*;
    import javax.lang.model.*;
    import javax.lang.model.element.*;
    
    @SupportedAnnotationTypes("NotAnno")
    public class AnnoProc extends AbstractProcessor {
      public boolean process(Set<? extends TypeElement> elems, RoundEnvironment renv){
         return true;
      }
    
      public SourceVersion getSupportedSourceVersion() {
         return SourceVersion.latest();
       }
    }
```

**Arquivo de origem AnnosWithoutProcessors.java**:
```
    @interface Anno { }
    
    @Anno
    class AnnosWithoutProcessors { }
```

Os seguintes comandos compilam o processador de anotações `AnnoProc`, e então executam este processador de anotações contra o arquivo de origem `AnnosWithoutProcessors.java`:
```
    javac AnnoProc.java
    javac -cp . -Xlint:processing -processor AnnoProc -proc:only AnnosWithoutProcessors.java
```

Quando o compilador executa o processador de anotações contra o arquivo de origem `AnnosWithoutProcessors.java`, ele gera o seguinte aviso:
```
    warning: [processing] No processor claimed any of these annotations: Anno
```

Para resolver este problema, você pode renomear a anotação definida e usada na classe `AnnosWithoutProcessors` de `Anno` para `NotAnno`.

`rawtypes`
    

Avisa sobre operações não verificadas em tipos brutos (`raw types`). A seguinte instrução gera um aviso de `rawtypes`:

> `void countElements(List l) { ... }`

O exemplo a seguir não gera um aviso de `rawtypes`:

> `void countElements(List<?> l) { ... }`

`List` é um tipo bruto (`raw type`). No entanto, `List<?>` é um tipo parametrizado com curinga ilimitado (`unbounded wildcard`). Como `List` é uma interface parametrizada, sempre especifique seu argumento de tipo. Neste exemplo, o argumento formal `List` é especificado com um curinga ilimitado (`?`) como seu parâmetro de tipo formal, o que significa que o método `countElements` pode aceitar qualquer instanciação da interface `List`.

Uma situação de poluição de heap (`heap pollution`) ocorre quando o objeto `List` `l`, cujo tipo estático é `List<Number>`, é atribuído a outro objeto `List`, `ls`, que tem um tipo estático diferente, `List<String>`. No entanto, o compilador ainda permite essa atribuição. Ele deve permitir essa atribuição para preservar a compatibilidade retroativa com versões do Java SE que não suportam generics. Devido à _type erasure_, `List<Number>` e `List<String>` ambos se tornam `List`. Consequentemente, o compilador permite a atribuição do objeto `l`, que tem um tipo bruto (`raw type`) de `List`, ao objeto `ls`.

`serial`
    

Avisa sobre definições ausentes de `serialVersionUID` em classes serializáveis. Por exemplo:
```
    public class PersistentTime implements Serializable
    {
      private Date time;
    
       public PersistentTime() {
         time = Calendar.getInstance().getTime();
       }
    
       public Date getTime() {
         return time;
       }
    }
```

O compilador gera o seguinte aviso:
```
    warning: [serial] serializable class PersistentTime has no definition of
    serialVersionUID
```

Se uma classe serializável não declara explicitamente um campo chamado `serialVersionUID`, então o ambiente de tempo de execução de serialização calcula um valor `serialVersionUID` padrão para essa classe com base em vários aspectos da classe, conforme descrito na Especificação de Serialização de Objetos Java. No entanto, é fortemente recomendado que todas as classes serializáveis declarem explicitamente valores `serialVersionUID` porque o processo padrão de cálculo de valores `serialVersionUID` é altamente sensível a detalhes da classe que podem variar dependendo das implementações do compilador. Como resultado, isso pode causar `InvalidClassExceptions` inesperadas durante a desserialização. Para garantir um valor `serialVersionUID` consistente entre diferentes implementações de compiladores Java, uma classe serializável deve declarar um valor `serialVersionUID` explícito.

`static`
    

Avisa sobre problemas relacionados ao uso de variáveis `static`, por exemplo:
```
    class XLintStatic {
        static void m1() { }
        void m2() { this.m1(); }
    }
```

O compilador gera o seguinte aviso:
```
    warning: [static] static method should be qualified by type name,
    XLintStatic, instead of by an expression
```

Para resolver este problema, você pode chamar o método `static` `m1` da seguinte forma:

> `XLintStatic.m1();`

Alternativamente, você pode remover a palavra-chave `static` da declaração do método `m1`.

`this-escape`
    

Avisa sobre construtores que vazam (`leak`) `this` antes da inicialização da subclasse. Por exemplo, esta classe:
```
    public class MyClass {
      public MyClass() {
        System.out.println(this.hashCode());
      }
    }
```

gera o seguinte aviso:
```
    MyClass.java:3: warning: [this-escape] possible 'this' escape
                             before subclass is fully initialized
        System.out.println(this.hashCode());
                                        ^
```

Um aviso de 'this' escape é gerado quando um construtor faz algo que pode resultar na invocação de um método de subclasse antes que o construtor retorne. Nesses casos, o método da subclasse estaria operando em uma instância incompletamente inicializada. No exemplo acima, uma subclasse de `MyClass` que sobrescreve `hashCode()` para incorporar seus próprios campos provavelmente produziria um resultado incorreto quando invocada como mostrado.

Os avisos são gerados apenas se uma subclasse puder existir fora do módulo atual (ou pacote, se não houver módulo) que está sendo compilado. Assim, por exemplo, construtores em classes `final` e não públicas não geram avisos.

`try`
    

Avisa sobre problemas relacionados ao uso de blocos `try`, incluindo instruções `try-with-resources`. Por exemplo, um aviso é gerado para a seguinte instrução porque o recurso `ac` declarado no bloco `try` não é usado:
```
    try ( AutoCloseable ac = getResource() ) {    // do nothing}
```

`unchecked`
    

Fornece mais detalhes para avisos de conversão não verificada (`unchecked conversion`) que são exigidos pela Especificação da Linguagem Java, por exemplo:
```
    List l = new ArrayList<Number>();
    List<String> ls = l;       // unchecked warning
```

Durante a _type erasure_, os tipos `ArrayList<Number>` e `List<String>` tornam-se `ArrayList` e `List`, respectivamente.

O comando `ls` tem o tipo parametrizado `List<String>`. Quando a `List` referenciada por `l` é atribuída a `ls`, o compilador gera um aviso não verificado (`unchecked warning`). Em tempo de compilação, o compilador e a JVM não podem determinar se `l` se refere a um tipo `List<String>`. Neste caso, `l` não se refere a um tipo `List<String>`. Como resultado, ocorre poluição de heap (`heap pollution`).

Uma situação de poluição de heap (`heap pollution`) ocorre quando o objeto `List` `l`, cujo tipo estático é `List<Number>`, é atribuído a outro objeto `List`, `ls`, que tem um tipo estático diferente, `List<String>`. No entanto, o compilador ainda permite essa atribuição. Ele deve permitir essa atribuição para preservar a compatibilidade retroativa com versões do Java SE que não suportam generics. Devido à _type erasure_, `List<Number>` e `List<String>` ambos se tornam `List`. Consequentemente, o compilador permite a atribuição do objeto `l`, que tem um tipo bruto (`raw type`) de `List`, ao objeto `ls`.

`varargs`
    

Avisa sobre o uso inseguro de métodos de argumentos variáveis (`varargs`), em particular, aqueles que contêm argumentos não reificáveis, por exemplo:
```
    public class ArrayBuilder {
      public static <T> void addToList (List<T> listArg, T... elements) {
        for (T x : elements) {
          listArg.add(x);
        }
      }
    }
```

Um tipo não reificável é um tipo cuja informação de tipo não está totalmente disponível em tempo de execução.

O compilador gera o seguinte aviso para a definição do método `ArrayBuilder.addToList`:
```
    warning: [varargs] Possible heap pollution from parameterized vararg type T
```

Quando o compilador encontra um método `varargs`, ele traduz o parâmetro formal `varargs` em um array. No entanto, a linguagem de programação Java não permite a criação de arrays de tipos parametrizados. No método `ArrayBuilder.addToList`, o compilador traduz o parâmetro formal `varargs` `T...` elements para o parâmetro formal `T[]` elements, um array. No entanto, devido à _type erasure_, o compilador converte o parâmetro formal `varargs` para `Object[]` elements. Consequentemente, há uma possibilidade de poluição de heap (`heap pollution`).