# O Comando java

## Nome

java - inicia uma aplicação Java

## Sinopse

Para iniciar um arquivo de classe:

`java` [_options_] _mainclass_ [_args_ ...]

Para iniciar a classe principal em um arquivo JAR:

`java` [_options_] `-jar` _jarfile_ [_args_ ...]

Para iniciar a classe principal em um módulo:

`java` [_options_] `-m` _module_[`/`_mainclass_] [_args_ ...]

ou

`java` [_options_] `--module` _module_[`/`_mainclass_] [_args_ ...]

Para iniciar um programa de arquivo-fonte:

`java` [_options_] _source-file_ [_args_ ...]

_options_
     Opcional: Especifica opções de linha de comando separadas por espaços. Consulte Visão Geral das Opções Java para uma descrição das opções disponíveis.
_mainclass_
     Especifica o nome da classe a ser iniciada. As entradas da linha de comando que seguem `classname` são os argumentos para o método main.
`-jar` _jarfile_
     Executa um programa encapsulado em um arquivo JAR. O argumento _jarfile_ é o nome de um arquivo JAR com um manifesto que contém uma linha no formato `Main-Class:`_classname_ que define a classe com o método `public static void main(String[] args)` que serve como ponto de partida da sua aplicação. Ao usar `-jar`, o arquivo JAR especificado é a fonte de todas as classes de usuário, e outras configurações de classpath são ignoradas. Se você estiver usando arquivos JAR, consulte [jar](<#/doc/guides/tools/jar>).
`-m` ou `--module` _module_[`/`_mainclass_]
    

Executa a classe principal em um módulo especificado por _mainclass_ se for fornecido, ou, se não for fornecido, o valor no _module_. Em outras palavras, _mainclass_ pode ser usado quando não é especificado pelo módulo, ou para sobrescrever o valor quando é especificado.

Consulte Opções Padrão para Java.

_source-file_
     Usado apenas para iniciar um programa de arquivo-fonte. Especifica o arquivo-fonte que contém a classe principal ao usar o modo de arquivo-fonte. Consulte Usando o Modo de Arquivo-Fonte para Iniciar Programas de Código-Fonte
_args_ ...
     Opcional: Argumentos que seguem _mainclass_ , _source-file_ , `-jar` _jarfile_ , e `-m` ou `--module` _module_`/`_mainclass_ são passados como argumentos para a classe principal.

## Descrição

O comando `java` inicia uma aplicação Java. Ele faz isso iniciando a Java Virtual Machine (JVM), carregando a classe especificada e chamando o método `main()` dessa classe. O método deve ser declarado `public` e `static`, não deve retornar nenhum valor e deve aceitar um array de `String` como parâmetro. A declaração do método tem a seguinte forma:

> `public static void main(String[] args)`

No modo de arquivo-fonte, o comando `java` pode iniciar uma classe declarada em um arquivo-fonte. Consulte Usando o Modo de Arquivo-Fonte para Iniciar Programas de Código-Fonte para uma descrição do uso do modo de arquivo-fonte.

> **Nota:** Você pode usar a variável de ambiente do launcher `JDK_JAVA_OPTIONS` para adicionar seu conteúdo ao início da linha de comando real do launcher `java`. Consulte Usando a Variável de Ambiente do Launcher JDK_JAVA_OPTIONS.

Por padrão, o primeiro argumento que não é uma opção do comando `java` é o nome totalmente qualificado da classe a ser chamada. Se `-jar` for especificado, então seu argumento é o nome do arquivo JAR contendo arquivos de classe e recursos para a aplicação. A classe de inicialização deve ser indicada pelo cabeçalho do manifesto `Main-Class` em seu arquivo de manifesto.

Argumentos após o nome do arquivo de classe ou o nome do arquivo JAR são passados para o método `main()`.

### `javaw`

**Windows:** O comando `javaw` é idêntico ao `java`, exceto que com `javaw` não há uma janela de console associada. Use `javaw` quando você não quiser que uma janela de prompt de comando apareça. O launcher `javaw`, no entanto, exibirá uma caixa de diálogo com informações de erro se uma inicialização falhar.

## Usando o Modo de Arquivo-Fonte para Iniciar Programas de Código-Fonte

Para iniciar uma classe declarada em um arquivo-fonte, execute o launcher `java` no modo de arquivo-fonte. A entrada no modo de arquivo-fonte é determinada por dois itens na linha de comando `java`:

  * O primeiro item na linha de comando que não é uma opção ou parte de uma opção. Em outras palavras, o item na linha de comando que de outra forma seria o nome da classe principal.

  * A opção `--source` _version_, se presente.

Se a classe identificar um arquivo existente que tenha uma extensão `.java`, ou se a opção `--source` for especificada, então o modo de arquivo-fonte é selecionado. O arquivo-fonte é então compilado e executado. A opção `--source` pode ser usada para especificar a _version_ ou _N_ do código-fonte. Isso determina a API que pode ser usada. Ao definir `--source` _N_, você só pode usar a API pública que foi definida no JDK _N_.

> **Nota:** Os valores válidos de _N_ mudam a cada lançamento, com novos valores adicionados e valores antigos removidos. Você receberá uma mensagem de erro se usar um valor de _N_ que não é mais suportado. Os valores suportados de _N_ são a versão atual do Java SE (`25`) e um número limitado de versões anteriores, detalhados na ajuda da linha de comando para `javac`, sob as opções `--source` e `--release`.

Se o arquivo não tiver a extensão `.java`, a opção `--source` deve ser usada para instruir o comando `java` a usar o modo de arquivo-fonte. A opção `--source` é usada para casos em que o arquivo-fonte é um "script" a ser executado e o nome do arquivo-fonte não segue as convenções normais de nomenclatura para arquivos-fonte Java.

No modo de arquivo-fonte, o efeito é como se o arquivo-fonte fosse compilado em memória, e a primeira classe encontrada no arquivo-fonte fosse executada. Quaisquer argumentos colocados após o nome do arquivo-fonte na linha de comando original são passados para a classe compilada quando ela é executada.

Por exemplo, se um arquivo fosse nomeado `HelloWorld.java` e contivesse uma classe nomeada `HelloWorld`, então o comando do modo de arquivo-fonte para iniciar a classe seria:

> `java HelloWorld.java`

Este uso do modo de arquivo-fonte é informalmente equivalente ao uso dos dois comandos a seguir:
```
    javac -d <memory> --source-path <source-root> HelloWorld.java
    java --class-path <memory> HelloWorld
```

onde `<source-root>` é calculado

**No modo de arquivo-fonte, quaisquer opções adicionais da linha de comando são processadas da seguinte forma:**

  * O launcher verifica as opções especificadas antes do arquivo-fonte para quaisquer que sejam relevantes para compilar o arquivo-fonte.

Isso inclui: `--class-path`, `--module-path`, `--add-exports`, `--add-modules`, `--limit-modules`, `--patch-module`, `--upgrade-module-path`, e quaisquer formas variantes dessas opções. Também inclui a nova opção `--enable-preview`, descrita na JEP 12.

  * Nenhuma provisão é feita para passar quaisquer opções adicionais para o compilador, como `-processor` ou `-Werror`.

  * Arquivos de argumento de linha de comando (arquivos `@`) podem ser usados da maneira padrão. Listas longas de argumentos para a VM ou para o programa sendo invocado podem ser colocadas em arquivos especificados na linha de comando prefixando o nome do arquivo com um caractere `@`.

**No modo de arquivo-fonte, a compilação prossegue da seguinte forma:**

  * Quaisquer opções de linha de comando que sejam relevantes para o ambiente de compilação são levadas em consideração. Isso inclui: `--class-path`/`-classpath`/`-cp`, `--module-path`/`-p`, `--add-exports`, `--add-modules`, `--limit-modules`, `--patch-module`, `--upgrade-module-path`, `--enable-preview`.

  * A raiz da árvore de fontes, `<source-root>`, é calculada a partir do pacote da classe que está sendo iniciada. Por exemplo, se `HelloWorld.java` declarasse suas classes no pacote `hello`, então o arquivo `HelloWorld.java` é esperado para residir no diretório `somedir/hello/`. Neste caso, `somedir` é calculado como a raiz da árvore de fontes.

  * A raiz da árvore de fontes serve como o source-path para compilação, de modo que outros arquivos-fonte encontrados nessa árvore e necessários por `HelloWorld` possam ser compilados.

  * O processamento de anotações é desabilitado, como se `-proc:none` estivesse em vigor.

  * Se uma versão for especificada, via opção `--source`, o valor é usado como argumento para uma opção `--release` implícita para a compilação. Isso define tanto a versão de origem aceita pelo compilador quanto a API do sistema que pode ser usada pelo código no arquivo-fonte.

  * Se `--enable-preview` for especificado, os argumentos `--source N` podem ser omitidos. Se a versão do runtime Java for `N`, então `--release N` é implícito ao compilar arquivos-fonte.

  * Se um arquivo `module-info.java` existir no diretório `<source-root>`, sua declaração de módulo é usada para definir um módulo nomeado que conterá todas as classes compiladas de arquivos `.java` na árvore de fontes. Se `module-info.java` não existir, todas as classes compiladas de arquivos-fonte serão compiladas no contexto do módulo sem nome.

  * O arquivo-fonte que é iniciado deve conter uma ou mais classes de nível superior, sendo a primeira delas considerada a classe a ser executada.

  * Para o arquivo-fonte que é iniciado, o compilador não impõe a restrição opcional definida no final de JLS 7.6, de que um tipo em um pacote nomeado deve existir em um arquivo cujo nome é composto pelo nome do tipo seguido pela extensão `.java`.

  * Se um arquivo-fonte contiver erros, mensagens de erro apropriadas são gravadas no fluxo de erro padrão, e o launcher sai com um código de saída diferente de zero.

**No modo de arquivo-fonte, a execução prossegue da seguinte forma:**

  * A classe a ser executada é a primeira classe de nível superior encontrada no arquivo-fonte. Ela deve conter uma declaração de um método `main` de entrada.

  * As classes compiladas são carregadas por um class loader personalizado, que delega ao class loader da aplicação. Isso implica que as classes que aparecem no classpath da aplicação não podem se referir a quaisquer classes declaradas em arquivos-fonte.

  * Se um arquivo `module-info.java` existir no diretório `<source-root>`, então todas as classes compiladas de arquivos `.java` na árvore de fontes estarão nesse módulo, que servirá como o módulo raiz para a execução do programa. Se `module-info.java` não existir, as classes compiladas são executadas no contexto de um módulo sem nome, como se `--add-modules=ALL-DEFAULT` estivesse em vigor. Isso é adicional a quaisquer outras opções `--add-module` que possam ter sido especificadas na linha de comando.

  * Quaisquer argumentos que apareçam após o nome do arquivo na linha de comando são passados para o método main de forma óbvia.

  * É um erro se houver uma classe no classpath da aplicação cujo nome seja o mesmo da classe a ser executada.

Consulte [JEP 458: Launch Multi-File Source-Code Programs](<https://openjdk.org/jeps/458>) para detalhes completos.

## Usando a Variável de Ambiente do Launcher JDK_JAVA_OPTIONS

`JDK_JAVA_OPTIONS` adiciona seu conteúdo ao início das opções analisadas da linha de comando. O conteúdo da variável de ambiente `JDK_JAVA_OPTIONS` é uma lista de argumentos separados por caracteres de espaço em branco (conforme determinado por `isspace()`). Estes são adicionados ao início dos argumentos da linha de comando passados para o launcher `java`. O requisito de codificação para a variável de ambiente é o mesmo da linha de comando `java` no sistema. O conteúdo da variável de ambiente `JDK_JAVA_OPTIONS` é tratado da mesma maneira que o especificado na linha de comando.

Aspas simples (`'`) ou duplas (`"`) podem ser usadas para delimitar argumentos que contêm caracteres de espaço em branco. Todo o conteúdo entre a aspa de abertura e a primeira aspa de fechamento correspondente é preservado simplesmente removendo o par de aspas. Caso uma aspa correspondente não seja encontrada, o launcher abortará com uma mensagem de erro. Arquivos `@` são suportados como são especificados na linha de comando. Qualquer caractere curinga literal `*` no conteúdo da variável de ambiente `JDK_JAVA_OPTIONS` não é expandido e é passado como está para a VM de inicialização. A fim de mitigar o uso indevido potencial do comportamento de `JDK_JAVA_OPTIONS`, opções que especificam a classe principal (como `-jar`) ou que fazem o launcher `java` sair sem executar a classe principal (como `-h`) são proibidas na variável de ambiente. Se alguma dessas opções aparecer na variável de ambiente, o launcher abortará com uma mensagem de erro. Quando `JDK_JAVA_OPTIONS` é definida, o launcher imprime uma mensagem para stderr como um lembrete.

**Exemplo:**
```
    $ export JDK_JAVA_OPTIONS='-g @file1 -Dprop=value @file2 -Dws.prop="white spaces"'
    $ java -Xint @file3
```

é equivalente à linha de comando:
```
    java -g @file1 -Dprop=value @file2 -Dws.prop="white spaces" -Xint @file3
```

## Visão Geral das Opções Java

O comando `java` suporta uma ampla gama de opções nas seguintes categorias:

  * Opções Padrão para Java: Opções garantidas de serem suportadas por todas as implementações da Java Virtual Machine (JVM). Elas são usadas para ações comuns, como verificar a versão do JRE, definir o classpath, habilitar saída verbosa, e assim por diante.

  * Opções Extras para Java: Opções de propósito geral que são específicas da Java HotSpot Virtual Machine. Elas não são garantidas de serem suportadas por todas as implementações da JVM e estão sujeitas a alterações. Essas opções começam com `-X`.

As opções avançadas não são recomendadas para uso casual. Estas são opções de desenvolvedor usadas para ajustar áreas específicas da operação da Java HotSpot Virtual Machine que frequentemente têm requisitos de sistema específicos e podem exigir acesso privilegiado a parâmetros de configuração do sistema. Vários exemplos de ajuste de desempenho são fornecidos em Exemplos de Ajuste de Desempenho. Essas opções não são garantidas de serem suportadas por todas as implementações da JVM e estão sujeitas a alterações. Opções avançadas começam com `-XX`.

  * Opções de Runtime Avançadas para Java: Controlam o comportamento de runtime da Java HotSpot VM.

  * Opções Avançadas do Compilador JIT para java: Controlam a compilação dinâmica just-in-time (JIT) realizada pela Java HotSpot VM.

  * Opções Avançadas de Capacidade de Serviço para Java: Permitem a coleta de informações do sistema e a realização de depuração extensiva.

  * Opções Avançadas de Garbage Collection para Java: Controlam como a garbage collection (GC) é realizada pela Java HotSpot

Opções booleanas são usadas para habilitar um recurso que está desabilitado por padrão ou desabilitar um recurso que está habilitado por padrão. Tais opções não exigem um parâmetro. Opções booleanas `-XX` são habilitadas usando o sinal de mais (`-XX:+`_OptionName_) e desabilitadas usando o sinal de menos (`-XX:-`_OptionName_).

Para opções que exigem um argumento, o argumento pode ser separado do nome da opção por um espaço, dois pontos (:), ou um sinal de igual (=), ou o argumento pode seguir diretamente a opção (a sintaxe exata difere para cada opção). Se você for esperado para especificar o tamanho em bytes, então você pode usar nenhum sufixo, ou usar o sufixo `k` ou `K` para kilobytes (KB), `m` ou `M` para megabytes (MB), ou `g` ou `G` para gigabytes (GB). Por exemplo, para definir o tamanho para 8 GB, você pode especificar `8g`, `8192m`, `8388608k`, ou `8589934592` como o argumento. Se você for esperado para especificar a porcentagem, então use um número de 0 a 1. Por exemplo, especifique `0.25` para 25%.

As seções a seguir descrevem as opções que estão obsoletas, descontinuadas e removidas:

  * Opções Java Descontinuadas: Aceitas e atuadas --- um aviso é emitido quando são usadas.

  * Opções Java Obsoletas: Aceitas mas ignoradas --- um aviso é emitido quando são usadas.

  * Opções Java Removidas: Removidas \--- usá-las resulta em um erro.

## Opções Padrão para Java

Estas são as opções mais comumente usadas e suportadas por todas as implementações da JVM.

> **Nota:** Para especificar um argumento para uma opção longa, você pode usar `--`_name_`=`_value_ ou `--`_name_ _value_.

`-agentlib:`_libname_[`=`_options_]
    

Carrega a biblioteca de agente nativo especificada. Após o nome da biblioteca, uma lista de opções específicas da biblioteca, separadas por vírgulas, pode ser usada. Se a opção `-agentlib:foo` for especificada, a JVM tenta carregar a biblioteca nomeada `foo` usando as convenções de nomenclatura e locais específicos da plataforma:

  * **Linux e outras plataformas tipo POSIX:** A JVM tenta carregar a biblioteca nomeada `libfoo.so` no local especificado pela variável de sistema `LD_LIBRARY_PATH`.

  * **macOS:** A JVM tenta carregar a biblioteca nomeada `libfoo.dylib` no local especificado pela variável de sistema `DYLD_LIBRARY_PATH`.

  * **Windows:** A JVM tenta carregar a biblioteca nomeada `foo.dll` no local especificado pela variável de sistema `PATH`.

O exemplo a seguir mostra como carregar a biblioteca Java Debug Wire Protocol (JDWP) e escutar a conexão de socket na porta 8000, suspendendo a JVM antes que a classe principal seja carregada:

> `-agentlib:jdwp=transport=dt_socket,server=y,address=8000`

`-agentpath:`_pathname_[`=`_options_]
     Carrega a biblioteca de agente nativo especificada pelo nome do caminho absoluto. Esta opção é equivalente a `-agentlib`, mas usa o caminho completo e o nome do arquivo da biblioteca.
`--class-path` _classpath_ , `-classpath` _classpath_ , ou `-cp` _classpath_
    

Especifica uma lista de diretórios, arquivos JAR e arquivos ZIP para procurar arquivos de classe.

No Windows, ponto e vírgulas (`;`) separam as entidades nesta lista; em outras plataformas é um dois pontos (`:`).

A especificação de _classpath_ sobrescreve qualquer configuração da variável de ambiente `CLASSPATH`. Se a opção de classpath não for usada e _classpath_ não for definido, então o classpath do usuário consiste no diretório atual (.).

Como uma conveniência especial, um elemento de classpath que contém um nome base de um asterisco (*) é considerado equivalente a especificar uma lista de todos os arquivos no diretório com a extensão `.jar` ou `.JAR`. Um programa Java não consegue diferenciar entre as duas invocações. Por exemplo, se o diretório mydir contiver `a.jar` e `b.JAR`, então o elemento de classpath mydir/* é expandido para `A.jar:b.JAR`, exceto que a ordem dos arquivos JAR é não especificada. Todos os arquivos `.jar` no diretório especificado, mesmo os ocultos, são incluídos na lista. Uma entrada de classpath que consiste em um asterisco (*) se expande para uma lista de todos os arquivos jar no diretório atual. A variável de ambiente `CLASSPATH`, onde definida, é expandida de forma semelhante. Qualquer expansão de curinga de classpath que ocorre antes da inicialização da Java VM. Programas Java nunca veem curingas que não são expandidos, exceto consultando o ambiente, como chamando `System.getenv("CLASSPATH")`.

`--disable-@files`
     Pode ser usado em qualquer lugar na linha de comando, incluindo em um arquivo de argumento, para evitar a expansão adicional de `@filename`. Esta opção interrompe a expansão de arquivos `@`-argfiles após a opção.
`--enable-preview`
     Permite que as classes dependam de [recursos de pré-visualização](<https://docs.oracle.com/en/java/javase/12/language/index.html#JSLAN-GUID-5A82FE0E-0CA4-4F1F-B075-564874FE2823>) da versão.
`--enable-native-access` _module_[`,`_module_...]
    

O acesso nativo envolve o acesso a código ou dados fora do runtime Java. Isso é geralmente inseguro e, se feito incorretamente, pode travar a JVM ou resultar em corrupção de memória. O acesso nativo pode ocorrer como resultado da chamada de um método que é [restrito](<https://openjdk.org/jeps/454#Safety>) ou `native`. Esta opção permite que o código nos módulos especificados realize acesso nativo. O acesso nativo ocorrendo em um módulo que não foi explicitamente habilitado é considerado _ilegal_.

_module_ pode ser um nome de módulo, ou `ALL-UNNAMED` para indicar código no classpath.

-`--illegal-native-access=`_parameter_
    

Esta opção especifica um modo para como o acesso nativo ilegal é tratado:

> **Nota:** Esta opção será removida em uma versão futura.

  * `allow`: Este modo permite acesso nativo ilegal em todos os módulos, sem quaisquer avisos.

  * `warn`: Este modo é idêntico a `allow`, exceto que uma mensagem de aviso é emitida para o primeiro acesso nativo ilegal encontrado em um módulo. Este modo é o padrão para o JDK atual, mas mudará em uma versão futura.

  * `deny`: Este modo desabilita o acesso nativo ilegal. Ou seja, qualquer acesso nativo ilegal causa uma `IllegalCallerException`. Este modo se tornará o padrão em uma versão futura.

Para verificar se sua aplicação está pronta para uma versão futura do JDK, execute-a com `--illegal-native-access=deny` juntamente com quaisquer opções `--enable-native-access` necessárias.

`--finalization=`_value_
     Controla se a JVM realiza a finalização de objetos. Os valores válidos são "enabled" (habilitado) e "disabled" (desabilitado). A finalização é habilitada por padrão, então o valor "enabled" não faz nada. O valor "disabled" desabilita a finalização, de modo que nenhum finalizador é invocado.
`--module-path` _modulepath_... ou `-p` _modulepath_
    

Especifica onde encontrar módulos de aplicação com uma lista de elementos de caminho. Os elementos de um module path podem ser um caminho de arquivo para um módulo ou um diretório contendo módulos. Cada módulo é um JAR modular ou um diretório de módulo expandido.

No Windows, ponto e vírgulas (`;`) separam os elementos do caminho nesta lista; em outras plataformas é um dois pontos (`:`).

`--upgrade-module-path` _modulepath_...
    

Especifica onde encontrar substituições de módulos atualizáveis na imagem de runtime com uma lista de elementos de caminho. Os elementos de um module path podem ser um caminho de arquivo para um módulo ou um diretório contendo módulos. Cada módulo é um JAR modular ou um diretório de módulo expandido.

No Windows, ponto e vírgulas (`;`) separam os elementos do caminho nesta lista; em outras plataformas é um dois pontos (`:`).

`--add-modules` _module_[`,`_module_...]
     Especifica os módulos raiz a serem resolvidos além do módulo inicial. _module_ também pode ser `ALL-DEFAULT`, `ALL-SYSTEM` e `ALL-MODULE-PATH`.
`--list-modules`
     Lista os módulos observáveis e então sai.
`-d` _module_name_ ou `--describe-module` _module_name_
     Descreve um módulo especificado e então sai.
`--dry-run`
     Cria a VM, mas não executa o método main. Esta opção `--dry-run` pode ser útil para validar as opções de linha de comando, como a configuração do sistema de módulos.
`--validate-modules`
     Valida todos os módulos e sai. Esta opção é útil para encontrar conflitos e outros erros com módulos no module path.
`-D` _property_`=`_value_
     Define um valor de propriedade de sistema. A variável _property_ é uma string sem espaços que representa o nome da propriedade. A variável _value_ é uma string que representa o valor da propriedade. Se _value_ for uma string com espaços, então envolva-a em aspas (por exemplo `-Dfoo="foo bar"`).
`-disableassertions`[`:`[_packagename_]...|`:`_classname_] ou `-da`[`:`[_packagename_]...|`:`_classname_]
    

Desabilita asserções. Por padrão, as asserções são desabilitadas em todos os pacotes e classes. Sem argumentos, `-disableassertions` (`-da`) desabilita asserções em todos os pacotes e classes. Com o argumento _packagename_ terminando em `...`, a chave desabilita asserções no pacote especificado e em quaisquer subpacotes. Se o argumento for simplesmente `...`, então a chave desabilita asserções no pacote sem nome no diretório de trabalho atual. Com o argumento _classname_, a chave desabilita asserções na classe especificada.

A opção `-disableassertions` (`-da`) se aplica a todos os class loaders e a classes de sistema (que não possuem um class loader). Há uma exceção a esta regra: Se a opção for fornecida sem argumentos, ela não se aplica a classes de sistema. Isso facilita a desabilitação de asserções em todas as classes, exceto as classes de sistema. A opção `-disablesystemassertions` permite desabilitar asserções em todas as classes de sistema. Para habilitar explicitamente asserções em pacotes ou classes específicas, use a opção `-enableassertions` (`-ea`). Ambas as opções podem ser usadas ao mesmo tempo. Por exemplo, para executar a aplicação `MyClass` com asserções habilitadas no pacote `com.wombat.fruitbat` (e quaisquer subpacotes), mas desabilitadas na classe `com.wombat.fruitbat.Brickbat`, use o seguinte comando:

> `java -ea:com.wombat.fruitbat... -da:com.wombat.fruitbat.Brickbat MyClass`

`-disablesystemassertions` ou `-dsa`
     Desabilita asserções em todas as classes de sistema.
`-enableassertions`[`:`[_packagename_]...|`:`_classname_] ou `-ea`[`:`[_packagename_]...|`:`_classname_]
    

Habilita asserções. Por padrão, as asserções são desabilitadas em todos os pacotes e classes. Sem argumentos, `-enableassertions` (`-ea`) habilita asserções em todos os pacotes e classes. Com o argumento _packagename_ terminando em `...`, a chave habilita asserções no pacote especificado e em quaisquer subpacotes. Se o argumento for simplesmente `...`, então a chave habilita asserções no pacote sem nome no diretório de trabalho atual. Com o argumento _classname_, a chave habilita asserções na classe especificada.

A opção `-enableassertions` (`-ea`) se aplica a todos os class loaders e a classes de sistema (que não possuem um class loader). Há uma exceção a esta regra: Se a opção for fornecida sem argumentos, ela não se aplica a classes de sistema. Isso facilita a habilitação de asserções em todas as classes, exceto as classes de sistema. A opção `-enablesystemassertions` fornece uma chave separada para habilitar asserções em todas as classes de sistema. Para desabilitar explicitamente asserções em pacotes ou classes específicas, use a opção `-disableassertions` (`-da`). Se um único comando contiver múltiplas instâncias dessas chaves, elas serão processadas em ordem, antes de carregar quaisquer classes. Por exemplo, para executar a aplicação `MyClass` com asserções habilitadas apenas no pacote `com.wombat.fruitbat` (e quaisquer subpacotes), mas desabilitadas na classe `com.wombat.fruitbat.Brickbat`, use o seguinte comando:

> `java -ea:com.wombat.fruitbat... -da:com.wombat.fruitbat.Brickbat MyClass`

`-enablesystemassertions` ou `-esa`
     Habilita asserções em todas as classes de sistema.
`-help`, `-h`, ou `-?`
     Imprime a mensagem de ajuda para o fluxo de erro.
`--help`
     Imprime a mensagem de ajuda para o fluxo de saída.
`-javaagent:`_jarpath_[`=`_options_]
     Carrega o agente de linguagem de programação Java especificado. Consulte `java.lang.instrument`.
`--show-version`
     Imprime a versão do produto para o fluxo de saída e continua.
`-showversion`
     Imprime a versão do produto para o fluxo de erro e continua.
`--show-module-resolution`
     Mostra a saída de resolução de módulo durante a inicialização.
`-splash:`_imagepath_
    

Mostra a tela de splash com a imagem especificada por _imagepath_. Imagens escaladas HiDPI são automaticamente suportadas e usadas se disponíveis. O nome do arquivo de imagem não escalado, como `image.ext`, deve ser sempre passado como argumento para a opção `-splash`. A imagem escalada mais apropriada fornecida é selecionada automaticamente.

Por exemplo, para mostrar o arquivo `splash.gif` do diretório `images` ao iniciar sua aplicação, use a seguinte opção:

> `-splash:images/splash.gif`

Consulte a documentação da API SplashScreen para mais informações.

`-verbose:class`
     Exibe informações sobre cada classe carregada.
`-verbose:gc`
     Exibe informações sobre cada evento de garbage collection (GC).
`-verbose:jni`
     Exibe informações sobre o uso de métodos nativos e outras atividades da Java Native Interface (JNI).
`-verbose:module`
     Exibe informações sobre os módulos em uso.
`--version`
     Imprime a versão do produto para o fluxo de saída e sai.
`-version`
     Imprime a versão do produto para o fluxo de erro e sai.
`-X`
     Imprime a ajuda sobre opções extras para o fluxo de erro.
`--help-extra`
     Imprime a ajuda sobre opções extras para o fluxo de saída.
`@`_argfile_
    

Especifica um ou mais arquivos de argumento prefixados por `@` usados pelo comando `java`. Não é incomum que a linha de comando `java` seja muito longa devido aos arquivos `.jar` necessários no classpath. A opção `@`_argfile_ supera as limitações de comprimento da linha de comando, permitindo que o launcher expanda o conteúdo dos arquivos de argumento após a expansão do shell, mas antes do processamento dos argumentos. O conteúdo dos arquivos de argumento é expandido porque, caso contrário, eles seriam especificados na linha de comando até que a opção `--disable-@files` fosse encontrada.

Os arquivos de argumento também podem conter o nome da classe principal e todas as opções. Se um arquivo de argumento contiver todas as opções exigidas pelo comando `java`, então a linha de comando poderia ser simplesmente:

> `java @`_argfile_

Consulte Arquivos de Argumentos de Linha de Comando java para uma descrição e exemplos de uso de arquivos `@`-argfiles.
## Opções Extras para Java

As seguintes opções `java` são opções de propósito geral que são específicas da Java HotSpot Virtual Machine.

`-Xbatch`
     Desabilita a compilação em segundo plano. Por padrão, a JVM compila o método como uma tarefa em segundo plano, executando o método no modo interpretador até que a compilação em segundo plano seja concluída. A flag `-Xbatch` desabilita a compilação em segundo plano para que a compilação de todos os métodos prossiga como uma tarefa em primeiro plano até ser concluída. Esta opção é equivalente a `-XX:-BackgroundCompilation`.
`-Xbootclasspath/a:`_directories_ |_zip_ |_JAR-files_
    

Especifica uma lista de diretórios, arquivos JAR e arquivos ZIP para anexar ao final do classpath de bootstrap padrão.

No Windows, ponto e vírgula (`;`) separam as entidades nesta lista; em outras plataformas é dois pontos (`:`).

`-Xcheck:jni`
    

Realiza verificações adicionais para funções Java Native Interface (JNI).

As seguintes verificações são consideradas indicativas de problemas significativos com o código nativo, e a JVM termina com um erro irrecuperável em tais casos:

  * A thread que faz a chamada não está anexada à JVM.
  * A thread que faz a chamada está usando o `JNIEnv` pertencente a outra thread.
  * Uma verificação de validação de parâmetro falha:
    * Um `jfieldID`, ou `jmethodID`, é detectado como inválido. Por exemplo:
      * Do tipo errado
      * Associado à classe errada
    * Um parâmetro do tipo errado é detectado.
    * Um valor de parâmetro inválido é detectado. Por exemplo:
      * NULL onde não permitido
      * Um índice de array fora dos limites, ou capacidade de frame
      * Uma string não-UTF-8
      * Uma referência JNI inválida
      * Uma tentativa de usar uma função `ReleaseXXX` em um parâmetro não produzido pela função `GetXXX` correspondente



As seguintes verificações resultam apenas na impressão de avisos:

  * Uma chamada JNI foi feita sem verificar uma exceção pendente de uma chamada JNI anterior, e a chamada atual não é segura quando uma exceção pode estar pendente.
  * Um descritor de classe está em formato decorado (`Lname;`) quando não deveria estar.
  * Um parâmetro `NULL` é permitido, mas seu uso é questionável.
  * Chamando outras funções JNI no escopo de `Get/ReleasePrimitiveArrayCritical` ou `Get/ReleaseStringCritical`



Espere uma degradação de desempenho quando esta opção for usada.

`-Xcomp`
     Modo de teste para exercitar compiladores JIT. Esta opção não deve ser usada em ambientes de produção.
`-Xdebug`
     Não faz nada; depreciado para remoção em uma versão futura.
`-Xdiag`
     Mostra mensagens de diagnóstico adicionais.
`-Xint`
     Executa a aplicação em modo apenas interpretado. A compilação para código nativo é desabilitada, e todo o bytecode é executado pelo interpretador. Os benefícios de desempenho oferecidos pelo compilador just-in-time (JIT) não estão presentes neste modo.
`-Xinternalversion`
     Exibe informações de versão da JVM mais detalhadas do que a opção `-version`, e então sai.
`-Xlog:`_option_
     Configura ou habilita o log com o framework de log unificado da Java Virtual Machine (JVM). Consulte Habilitar Log com o Framework de Log Unificado da JVM.
`-Xmixed`
     Executa todo o bytecode pelo interpretador, exceto para métodos "quentes" (hot methods), que são compilados para código nativo. Ativado por padrão. Use `-Xint` para desativar.
`-Xmn` _size_
    

Define o tamanho inicial e máximo (em bytes) do heap para a geração jovem (nursery) nos coletores geracionais. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, ou `g` ou `G` para indicar gigabytes. A região da geração jovem do heap é usada para novos objetos. A GC é realizada nesta região com mais frequência do que em outras regiões. Se o tamanho da geração jovem for muito pequeno, muitas coletas de lixo menores são realizadas. Se o tamanho for muito grande, apenas coletas de lixo completas são realizadas, o que pode levar muito tempo para ser concluído. Recomenda-se que você não defina o tamanho para a geração jovem para o coletor G1, e mantenha o tamanho para a geração jovem maior que 25% e menor que 50% do tamanho total do heap para outros coletores. Os exemplos a seguir mostram como definir o tamanho inicial e máximo da geração jovem para 256 MB usando várias unidades:
```
    -Xmn256m
    -Xmn262144k
    -Xmn268435456
```

Em vez da opção `-Xmn` para definir o tamanho inicial e máximo do heap para a geração jovem, você pode usar `-XX:NewSize` para definir o tamanho inicial e `-XX:MaxNewSize` para definir o tamanho máximo.

`-Xms` _size_
    

Define o tamanho mínimo e inicial (em bytes) do heap. Este valor deve ser um múltiplo de 1024 e maior que 1 MB. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, ou `g` ou `G` para indicar gigabytes. Os exemplos a seguir mostram como definir o tamanho da memória alocada para 6 MB usando várias unidades:
```
    -Xms6291456
    -Xms6144k
    -Xms6m
```

Se você não definir esta opção, o tamanho inicial será definido como a soma dos tamanhos alocados para a geração antiga e a geração jovem. O tamanho inicial do heap para a geração jovem pode ser definido usando a opção `-Xmn` ou a opção `-XX:NewSize`.

Observe que a opção `-XX:InitialHeapSize` também pode ser usada para definir o tamanho inicial do heap. Se ela aparecer depois de `-Xms` na linha de comando, o tamanho inicial do heap será definido para o valor especificado com `-XX:InitialHeapSize`.

`-Xmx` _size_
    

Especifica o tamanho máximo (em bytes) do heap. Este valor deve ser um múltiplo de 1024 e maior que 2 MB. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, ou `g` ou `G` para indicar gigabytes. O valor padrão é escolhido em tempo de execução com base na configuração do sistema. Para implantações de servidor, `-Xms` e `-Xmx` são frequentemente definidos para o mesmo valor. Os exemplos a seguir mostram como definir o tamanho máximo permitido de memória alocada para 80 MB usando várias unidades:
```
    -Xmx83886080
    -Xmx81920k
    -Xmx80m
```

A opção `-Xmx` é equivalente a `-XX:MaxHeapSize`.

`-Xnoclassgc`
     Desabilita a coleta de lixo (GC) de classes. Isso pode economizar algum tempo de GC, o que encurta as interrupções durante a execução da aplicação. Quando você especifica `-Xnoclassgc` na inicialização, os objetos de classe na aplicação são deixados intocados durante o GC e são sempre considerados vivos. Isso pode resultar em mais memória sendo permanentemente ocupada, o que, se não for usado com cuidado, lança uma exceção de falta de memória (out-of-memory exception).
`-Xrs`
    

Reduz o uso de sinais do sistema operacional pela JVM. Os "shutdown hooks" permitem o desligamento ordenado de uma aplicação Java executando código de limpeza do usuário (como fechar conexões de banco de dados) no desligamento, mesmo que a JVM termine abruptamente.

  * **Não-Windows:**

    * A JVM captura sinais para implementar "shutdown hooks" para terminação inesperada. A JVM usa `SIGHUP`, `SIGINT` e `SIGTERM` para iniciar a execução dos "shutdown hooks".

    * Aplicações que incorporam a JVM frequentemente precisam capturar sinais como `SIGINT` ou `SIGTERM`, o que pode levar a interferência com os manipuladores de sinal da JVM. A opção `-Xrs` está disponível para resolver este problema. Quando `-Xrs` é usado, as máscaras de sinal para `SIGINT`, `SIGTERM`, `SIGHUP` e `SIGQUIT` não são alteradas pela JVM, e os manipuladores de sinal para esses sinais não são instalados.

  * **Windows:**

    * A JVM monitora eventos de controle de console para implementar "shutdown hooks" para terminação inesperada. Especificamente, a JVM registra um manipulador de controle de console que inicia o processamento do "shutdown hook" e retorna `TRUE` para `CTRL_C_EVENT`, `CTRL_CLOSE_EVENT`, `CTRL_LOGOFF_EVENT` e `CTRL_SHUTDOWN_EVENT`.

    * A JVM usa um mecanismo semelhante para implementar o recurso de despejo de pilhas de threads para fins de depuração. A JVM usa `CTRL_BREAK_EVENT` para realizar despejos de threads.

    * Se a JVM for executada como um serviço (por exemplo, como um motor de servlet para um servidor web), ela pode receber `CTRL_LOGOFF_EVENT` mas não deve iniciar o desligamento porque o sistema operacional não termina o processo. Para evitar possíveis interferências como esta, a opção `-Xrs` pode ser usada. Quando a opção `-Xrs` é usada, a JVM não instala um manipulador de controle de console, o que implica que ela não monitora nem processa `CTRL_C_EVENT`, `CTRL_CLOSE_EVENT`, `CTRL_LOGOFF_EVENT` ou `CTRL_SHUTDOWN_EVENT`.




Existem duas consequências de especificar `-Xrs`:

  * **Não-Windows:** Despejos de thread `SIGQUIT` não estão disponíveis.

  * **Windows:** Despejos de thread Ctrl + Break não estão disponíveis.




O código do usuário é responsável por fazer com que os "shutdown hooks" sejam executados, por exemplo, chamando `System.exit()` quando a JVM deve ser terminada.

`-Xshare:`_mode_
    

Define o modo de compartilhamento de dados de classe (CDS).

Os possíveis argumentos _mode_ para esta opção incluem o seguinte:

`auto`
     Usa dados de classe compartilhados se possível (padrão).
`on`
     Exige o uso de dados de classe compartilhados, caso contrário, falha.

> **Nota:** A opção `-Xshare:on` é usada apenas para fins de teste. Ela pode fazer com que a VM saia inesperadamente durante a inicialização quando o arquivo CDS não puder ser usado (por exemplo, quando certos parâmetros da VM são alterados, ou quando um JDK diferente é usado). Esta opção não deve ser usada em ambientes de produção.

`off`
     Não tenta usar dados de classe compartilhados.
`-XshowSettings`
     Mostra todas as configurações e então continua.
`-XshowSettings:`_category_
    

Mostra as configurações e continua. Os possíveis argumentos _category_ para esta opção incluem o seguinte:

`all`
     Mostra todas as categorias de configurações em detalhes **verbosos**.
`locale`
     Mostra configurações relacionadas à localidade.
`properties`
     Mostra configurações relacionadas às propriedades do sistema.
`security`
    

Mostra todas as configurações relacionadas à segurança.

Os argumentos de subcategoria para `security` incluem o seguinte:

  * `security:all` : mostra todas as configurações de segurança
  * `security:properties` : mostra propriedades de segurança
  * `security:providers` : mostra configurações estáticas de provedores de segurança
  * `security:tls` : mostra configurações de segurança relacionadas a TLS


`vm`
     Mostra as configurações da JVM.
`system`
     **Apenas Linux:** Mostra a configuração do sistema host ou do contêiner e continua.
`-Xss` _size_
    

Define o tamanho da pilha da thread (em bytes). Anexe a letra `k` ou `K` para indicar KB, `m` ou `M` para indicar MB, ou `g` ou `G` para indicar GB. O tamanho real pode ser arredondado para um múltiplo do tamanho da página do sistema conforme exigido pelo sistema operacional. O valor padrão depende da plataforma. Por exemplo:

  * Linux/x64: 1024 KB

  * Linux/Aarch64: 2048 KB

  * macOS/x64: 1024 KB

  * macOS/Aarch64: 2048 KB

  * Windows: O valor padrão depende da memória virtual




Os exemplos a seguir definem o tamanho da pilha da thread para 1024 KB em diferentes unidades:
```
    -Xss1m
    -Xss1024k
    -Xss1048576
```

Esta opção é semelhante a `-XX:ThreadStackSize`.

`--add-reads` _module_`=`_target-module_(`,`_target-module_)*
     Atualiza _module_ para ler o _target-module_, independentemente da declaração do módulo. _target-module_ pode ser `ALL-UNNAMED` para ler todos os módulos não nomeados.
`--add-exports` _module_`/`_package_`=`_target-module_(`,`_target-module_)*
     Atualiza _module_ para exportar _package_ para _target-module_, independentemente da declaração do módulo. _target-module_ pode ser `ALL-UNNAMED` para exportar para todos os módulos não nomeados.
`--add-opens` _module_`/`_package_`=`_target-module_(`,`_target-module_)*
     Atualiza _module_ para abrir _package_ para _target-module_, independentemente da declaração do módulo.
`--limit-modules` _module_[`,`_module_...]
     Especifica o limite do universo de módulos observáveis.
`--patch-module` _module_`=`_file_(`;`_file_)*
     Substitui ou aumenta um módulo com classes e recursos em arquivos JAR ou diretórios.
`--source` _version_
     Define a versão da fonte no modo de arquivo-fonte.
`--sun-misc-unsafe-memory-access=` _value_
    

Permite ou nega o uso da API não suportada `sun.misc.Unsafe`. _value_ é um dos seguintes:

`allow`
     Permite o uso dos métodos de acesso à memória sem avisos em tempo de execução.
`warn`
     Permite o uso dos métodos de acesso à memória, mas emite um aviso na primeira ocasião em que qualquer método de acesso à memória é usado. No máximo um aviso é emitido.
`debug`
     Permite o uso dos métodos de acesso à memória, mas emite um aviso de uma linha e um rastreamento de pilha quando qualquer método de acesso à memória é usado.
`deny`
     Desabilita o uso dos métodos de acesso à memória lançando uma `UnsupportedOperationException` em cada uso.

O valor padrão quando a opção não é especificada é `warn`.

## Opções Extras para macOS

As seguintes opções extras são específicas do macOS.

`-XstartOnFirstThread`
     Executa o método `main()` na primeira thread (AppKit).
`-Xdock:name=`_application_name_
     Substitui o nome padrão da aplicação exibido no dock.
`-Xdock:icon=`_path_to_icon_file_
     Substitui o ícone padrão exibido no dock.

## Opções Avançadas para Java

Estas opções `java` podem ser usadas para habilitar outras opções avançadas.

`-XX:+UnlockDiagnosticVMOptions`
    

Desbloqueia as opções destinadas a diagnosticar a JVM. Por padrão, esta opção está desabilitada e as opções de diagnóstico não estão disponíveis.

As opções de linha de comando que são habilitadas com o uso desta opção não são suportadas. Se você encontrar problemas ao usar qualquer uma dessas opções, é muito provável que seja solicitado a reproduzir o problema sem usar nenhuma dessas opções não suportadas antes que o Suporte Oracle possa ajudar na investigação. Também é possível que qualquer uma dessas opções possa ser removida ou seu comportamento alterado sem qualquer aviso.

`-XX:+UnlockExperimentalVMOptions`
     Desbloqueia as opções que fornecem recursos experimentais na JVM. Por padrão, esta opção está desabilitada e os recursos experimentais não estão disponíveis.

## Opções Avançadas de Tempo de Execução para Java

Estas opções `java` controlam o comportamento em tempo de execução da Java HotSpot VM.

`-XX:ActiveProcessorCount=`_x_
    

Substitui o número de CPUs que a VM usará para calcular o tamanho dos pools de threads que ela usará para várias operações, como Garbage Collection e ForkJoinPool.

A VM normalmente determina o número de processadores disponíveis a partir do sistema operacional. Esta flag pode ser útil para particionar recursos de CPU ao executar múltiplos processos Java em contêineres docker. Esta flag é respeitada mesmo que `UseContainerSupport` não esteja habilitado. Consulte `-XX:-UseContainerSupport` para uma descrição de como habilitar e desabilitar o suporte a contêineres.

`-XX:AllocateHeapAt=`_path_
    

Recebe um caminho para o sistema de arquivos e usa o mapeamento de memória para alocar o heap de objetos no dispositivo de memória. Usar esta opção permite que a HotSpot VM aloque o heap de objetos Java em um dispositivo de memória alternativo, como um NV-DIMM, especificado pelo usuário.

Dispositivos de memória alternativos que possuem a mesma semântica que a DRAM, incluindo a semântica de operações atômicas, podem ser usados em vez da DRAM para o heap de objetos sem alterar o código da aplicação existente. Todas as outras estruturas de memória (como o heap de código, metaspace e pilhas de threads) continuam a residir na DRAM.

Alguns sistemas operacionais expõem memória não-DRAM através do sistema de arquivos. Arquivos mapeados em memória nesses sistemas de arquivos ignoram o cache de página e fornecem um mapeamento direto da memória virtual para a memória física no dispositivo. As flags existentes relacionadas ao heap (como `-Xmx` e `-Xms`) e as flags relacionadas à coleta de lixo continuam a funcionar como antes.

`-XX:-CompactStrings`
    

Desabilita o recurso Compact Strings. Por padrão, esta opção está habilitada. Quando esta opção está habilitada, Strings Java contendo apenas caracteres de byte único são internamente representadas e armazenadas como Strings de um byte por caractere usando a codificação ISO-8859-1 / Latin-1. Isso reduz em 50% a quantidade de espaço necessária para Strings contendo apenas caracteres de byte único. Para Strings Java contendo pelo menos um caractere multibyte: estas são representadas e armazenadas como 2 bytes por caractere usando a codificação UTF-16. Desabilitar o recurso Compact Strings força o uso da codificação UTF-16 como representação interna para todas as Strings Java.

Casos em que pode ser benéfico desabilitar Compact Strings incluem o seguinte:

  * Quando se sabe que uma aplicação alocará predominantemente Strings de caracteres multibyte

  * No evento inesperado em que uma regressão de desempenho é observada na migração do Java SE 8 para o Java SE 9 e uma análise mostra que Compact Strings introduz a regressão




Em ambos os cenários, desabilitar Compact Strings faz sentido.

`-XX:ErrorFile=`_filename_
    

Especifica o caminho e o nome do arquivo para o qual os dados de erro são gravados quando ocorre um erro irrecuperável. Por padrão, este arquivo é criado no diretório de trabalho atual e nomeado `hs_err_pid` _pid_`.log`, onde _pid_ é o identificador do processo que encontrou o erro.

O exemplo a seguir mostra como definir o arquivo de log padrão (observe que o identificador do processo é especificado como `%p`):

> `-XX:ErrorFile=./hs_err_pid%p.log`

  * **Não-Windows:** O exemplo a seguir mostra como definir o log de erros para `/var/log/java/java_error.log`:

> `-XX:ErrorFile=/var/log/java/java_error.log`

  * **Windows:** O exemplo a seguir mostra como definir o arquivo de log de erros para `C:/log/java/java_error.log`:

> `-XX:ErrorFile=C:/log/java/java_error.log`




Se o arquivo existir e for gravável, ele será sobrescrito. Caso contrário, se o arquivo não puder ser criado no diretório especificado (devido a espaço insuficiente, problema de permissão ou outro problema), o arquivo será criado no diretório temporário do sistema operacional:

  * **Não-Windows:** O diretório temporário é `/tmp`.

  * **Windows:** O diretório temporário é especificado pelo valor da variável de ambiente `TMP`; se essa variável de ambiente não estiver definida, o valor da variável de ambiente `TEMP` é usado.



`-XX:+ExtensiveErrorReports`
     Habilita o relatório de informações de erro mais extensas no `ErrorFile`. Esta opção pode ser ativada em ambientes onde se deseja o máximo de informações - mesmo que os logs resultantes possam ser bastante grandes e/ou conter informações que possam ser consideradas sensíveis. As informações podem variar de uma versão para outra e entre diferentes plataformas. Por padrão, esta opção está desabilitada.
`-XX:FlightRecorderOptions=`_parameter_`=`_value_ (ou) `-XX:FlightRecorderOptions:`_parameter_`=`_value_
    

Define os parâmetros que controlam o comportamento do JFR. Múltiplos parâmetros podem ser especificados separando-os com uma vírgula.

A lista a seguir contém as entradas JFR _parameter_`=`_value_ disponíveis:

`globalbuffersize=`_size_
     Especifica a quantidade total de memória primária usada para retenção de dados. O valor padrão é baseado no valor especificado para `memorysize`. Altere o parâmetro `memorysize` para alterar o tamanho dos buffers globais.
`maxchunksize=`_size_
     Especifica o tamanho máximo (em bytes) dos blocos de dados em uma gravação. Anexe `m` ou `M` para especificar o tamanho em megabytes (MB), ou `g` ou `G` para especificar o tamanho em gigabytes (GB). Por padrão, o tamanho máximo dos blocos de dados é definido como 12 MB. O mínimo permitido é 1 MB.
`memorysize=`_size_
     Determina quanta memória de buffer deve ser usada e define os parâmetros `globalbuffersize` e `numglobalbuffers` com base no tamanho especificado. Anexe `m` ou `M` para especificar o tamanho em megabytes (MB), ou `g` ou `G` para especificar o tamanho em gigabytes (GB). Por padrão, o tamanho da memória é definido como 10 MB.
`numglobalbuffers`
     Especifica o número de buffers globais usados. O valor padrão é baseado no tamanho da memória especificado. Altere o parâmetro `memorysize` para alterar o número de buffers globais.
`old-object-queue-size=number-of-objects`
     Número máximo de objetos antigos a serem rastreados. Por padrão, o número de objetos é definido como 256.
`preserve-repository=`{`true`|`false`}
     Especifica se os arquivos armazenados no repositório em disco devem ser mantidos após a saída da JVM. Se falso, os arquivos são excluídos. Por padrão, este parâmetro está desabilitado.
`repository=`_path_
     Especifica o repositório (um diretório) para armazenamento temporário em disco. Por padrão, o diretório temporário do sistema é usado.
`retransform=`{`true`|`false`}
     Especifica se as classes de evento devem ser retransformadas usando JVMTI. Se falso, a instrumentação é adicionada quando as classes de evento são carregadas. Por padrão, este parâmetro está habilitado.
`stackdepth=`_depth_
     Profundidade da pilha para rastreamentos de pilha. Por padrão, a profundidade é definida como 64 chamadas de método. O máximo é 2048. Valores maiores que 64 podem criar uma sobrecarga significativa e reduzir o desempenho.
`threadbuffersize=`_size_
     Especifica o tamanho do buffer local por thread (em bytes). Por padrão, o tamanho do buffer local é definido como 8 kilobytes, com um valor mínimo de 4 kilobytes. Sobrescrever este parâmetro pode reduzir o desempenho e não é recomendado.
`-XX:LargePageSizeInBytes=`_size_
    

Define o tamanho máximo da página grande (em bytes) usado pela JVM. O argumento _size_ deve ser um tamanho de página válido suportado pelo ambiente para ter qualquer efeito. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, ou `g` ou `G` para indicar gigabytes. Por padrão, o tamanho é definido como 0, o que significa que a JVM usará o tamanho de página grande padrão para o ambiente como o tamanho máximo para páginas grandes. Consulte Large Pages.

O exemplo a seguir descreve como definir o tamanho da página grande para 1 gigabyte (GB):

> `-XX:LargePageSizeInBytes=1g`

`-XX:MaxDirectMemorySize=`_size_
    

Define o tamanho total máximo (em bytes) das alocações de buffer direto do pacote `java.nio`. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, ou `g` ou `G` para indicar gigabytes. Se não for definido, a flag é ignorada e a JVM escolhe o tamanho para as alocações de buffer direto NIO automaticamente.

Os exemplos a seguir ilustram como definir o tamanho NIO para 1024 KB em diferentes unidades:
```
    -XX:MaxDirectMemorySize=1m
    -XX:MaxDirectMemorySize=1024k
    -XX:MaxDirectMemorySize=1048576
```

`-XX:-MaxFDLimit`
     Desabilita a tentativa de definir o limite suave para o número de descritores de arquivo abertos para o limite rígido. Por padrão, esta opção está habilitada em todas as plataformas, mas é ignorada no Windows. A única vez que você pode precisar desabilitar isso é no macOS, onde seu uso impõe um máximo de 10240, que é menor do que o máximo real do sistema.
`-XX:NativeMemoryTracking=`_mode_
    

Especifica o modo para rastrear o uso de memória nativa da JVM. Os possíveis argumentos _mode_ para esta opção incluem o seguinte:

`off`
     Instrui a não rastrear o uso de memória nativa da JVM. Este é o comportamento padrão se você não especificar a opção `-XX:NativeMemoryTracking`.
`summary`
     Rastreia o uso de memória apenas por subsistemas da JVM, como Java heap, classe, código e thread.
`detail`
     Além de rastrear o uso de memória por subsistemas da JVM, rastreia o uso de memória por `CallSite` individual, região de memória virtual individual e suas regiões comprometidas.
`-XX:TrimNativeHeapInterval=`_millis_
    

Intervalo, em ms, no qual a JVM irá aparar o heap nativo. Valores mais baixos irão recuperar memória mais rapidamente ao custo de maior sobrecarga. Um valor de 0 (padrão) desabilita o aparamento do heap nativo. O aparamento do heap nativo é realizado em uma thread dedicada.

Esta opção é suportada apenas no Linux com GNU C Library (glibc).

`-XX:+NeverActAsServerClassMachine`
    

Habilita o modo "emulação de VM Cliente" que usa apenas o compilador JIT C1, um CodeCache de 32Mb e o Serial GC. A quantidade máxima de memória que a JVM pode usar (controlada pela flag `-XX:MaxRAM=n`) é definida como 1GB por padrão. A string "emulated-client" é adicionada à string de versão da JVM.

Por padrão, a flag é definida como `true` apenas no Windows em modo de 32 bits e `false` em todos os outros casos.

O modo "emulação de VM Cliente" não será habilitado se qualquer uma das seguintes flags for usada na linha de comando:
```
    -XX:{+|-}TieredCompilation
    -XX:CompilationMode=mode
    -XX:TieredStopAtLevel=n
    -XX:{+|-}EnableJVMCI
    -XX:{+|-}UseJVMCICompiler
```

`-XX:ObjectAlignmentInBytes=`_alignment_
    

Define o alinhamento de memória de objetos Java (em bytes). Por padrão, o valor é definido como 8 bytes. O valor especificado deve ser uma potência de 2 e deve estar dentro do intervalo de 8 e 256 (inclusive). Esta opção possibilita o uso de ponteiros compactados com grandes tamanhos de heap Java.

O limite de tamanho do heap em bytes é calculado como:

> `4GB * ObjectAlignmentInBytes`

> **Nota:** À medida que o valor de alinhamento aumenta, o espaço não utilizado entre os objetos também aumenta. Como resultado, você pode não obter nenhum benefício do uso de ponteiros compactados com grandes tamanhos de heap Java.

`-XX:OnError=`_string_
    

Define um comando personalizado ou uma série de comandos separados por ponto e vírgula para serem executados quando ocorre um erro irrecuperável. Se a string contiver espaços, ela deve ser colocada entre aspas.

  * **Não-Windows:** O exemplo a seguir mostra como a opção `-XX:OnError` pode ser usada para executar o comando `gcore` para criar uma imagem de core e iniciar o depurador `gdb` para anexar ao processo em caso de um erro irrecuperável (o `%p` designa o identificador do processo atual):

> `-XX:OnError="gcore %p;gdb -p %p"`

  * **Windows:** O exemplo a seguir mostra como a opção `-XX:OnError` pode ser usada para executar o utilitário `userdump.exe` para obter um despejo de falha em caso de um erro irrecuperável (o `%p` designa o identificador do processo atual). Este exemplo assume que o caminho para o utilitário `userdump.exe` é especificado na variável de ambiente `PATH`:

> `-XX:OnError="userdump.exe %p"`



`-XX:OnOutOfMemoryError=`_string_
     Define um comando personalizado ou uma série de comandos separados por ponto e vírgula para serem executados quando uma exceção `OutOfMemoryError` é lançada pela primeira vez pela JVM. Se a string contiver espaços, ela deve ser colocada entre aspas. Para um exemplo de string de comando, consulte a descrição da opção `-XX:OnError`. Isso se aplica apenas a exceções `OutOfMemoryError` causadas pelo esgotamento do Java Heap; não se aplica a exceções `OutOfMemoryError` lançadas diretamente do código Java, nem pela JVM para outros tipos de esgotamento de recursos (como erros de criação de thread nativa).
`-XX:+PrintCommandLineFlags`
     Habilita a impressão de flags da JVM selecionadas ergonomicamente que apareceram na linha de comando. Pode ser útil saber os valores ergonômicos definidos pela JVM, como o tamanho do espaço de heap e o coletor de lixo selecionado. Por padrão, esta opção está desabilitada e as flags não são impressas.
`-XX:+PreserveFramePointer`
     Seleciona entre usar o registrador RBP como um registrador de propósito geral (`-XX:-PreserveFramePointer`) e usar o registrador RBP para manter o ponteiro de frame do método atualmente em execução (`-XX:+PreserveFramePointer`). Se o ponteiro de frame estiver disponível, ferramentas de perfil externo (por exemplo, Linux perf) podem construir rastreamentos de pilha mais precisos.
`-XX:+PrintNMTStatistics`
     Habilita a impressão de dados de rastreamento de memória nativa coletados na saída da JVM quando o rastreamento de memória nativa está habilitado (consulte `-XX:NativeMemoryTracking`). Por padrão, esta opção está desabilitada e os dados de rastreamento de memória nativa não são impressos.
`-XX:SharedArchiveFile=`_path_
    

Especifica o caminho e o nome do arquivo de arquivo de compartilhamento de dados de classe (CDS)

Consulte Application Class Data Sharing.

`-XX:+VerifySharedSpaces`
     Se esta opção for especificada, a JVM carregará um arquivo de arquivo CDS apenas se ele passar por uma verificação de integridade baseada em somas de verificação CRC32. O objetivo desta flag é verificar danos não intencionais aos arquivos de arquivo CDS durante a transmissão ou armazenamento. Para garantir a segurança e o funcionamento adequado do CDS, o usuário deve garantir que os arquivos de arquivo CDS usados pelas aplicações Java não possam ser modificados sem a devida autorização.
`-XX:SharedArchiveConfigFile=`_shared_config_file_
     Especifica dados compartilhados adicionais adicionados ao arquivo de arquivo.
`-XX:SharedClassListFile=`_file_name_
    

Especifica o arquivo de texto que contém os nomes das classes a serem armazenadas no arquivo de compartilhamento de dados de classe (CDS). Este arquivo contém o nome completo de uma classe por linha, exceto que barras (`/`) substituem pontos (`.`). Por exemplo, para especificar as classes `java.lang.Object` e `hello.Main`, crie um arquivo de texto que contenha as duas linhas a seguir:
```
    java/lang/Object
    hello/Main
```

As classes que você especifica neste arquivo de texto devem incluir as classes que são comumente usadas pela aplicação. Elas podem incluir quaisquer classes do classpath da aplicação, extensão ou bootstrap.

Consulte Application Class Data Sharing.

`-XX:+ShowCodeDetailsInExceptionMessages`
     Habilita a impressão de mensagens `NullPointerException` aprimoradas. Quando uma aplicação lança uma `NullPointerException`, a opção permite que a JVM analise as instruções de bytecode do programa para determinar precisamente qual referência é `null`, e descreve a origem com uma mensagem de detalhe nulo. A mensagem de detalhe nulo é calculada e retornada por `NullPointerException.getMessage()`, e será impressa como a mensagem da exceção junto com o método, nome do arquivo e número da linha. Por padrão, esta opção está habilitada.
`-XX:+ShowMessageBoxOnError`
     Habilita a exibição de uma caixa de diálogo quando a JVM encontra um erro irrecuperável. Isso impede que a JVM saia e mantém o processo ativo para que você possa anexar um depurador a ele para investigar a causa do erro. Por padrão, esta opção está desabilitada.
`-XX:StartFlightRecording:`_parameter_`=`_value_
    

Inicia uma gravação JFR para a aplicação Java. Esta opção é equivalente ao comando de diagnóstico `JFR.start` que inicia uma gravação durante o tempo de execução. `-XX:StartFlightRecording:help` imprime as opções disponíveis e exemplos de linhas de comando. Você pode definir as seguintes entradas _parameter_`=`_value_ ao iniciar uma gravação JFR:

`delay=`_time_
     Especifica o atraso entre o tempo de inicialização da aplicação Java e o início da gravação. Anexe `s` para especificar o tempo em segundos, `m` para minutos, `h` para horas ou `d` para dias (por exemplo, especificar `10m` significa 10 minutos). Por padrão, não há atraso, e este parâmetro é definido como 0.
`disk=`{`true`|`false`}
     Especifica se os dados devem ser gravados em disco durante a gravação. Por padrão, este parâmetro está habilitado.
`dumponexit=`{`true`|`false`}
     Especifica se a gravação em execução é despejada quando a JVM é desligada. Se habilitado e um `filename` não for inserido, a gravação é gravada em um arquivo no diretório onde o processo foi iniciado. O nome do arquivo é um nome gerado pelo sistema que contém o ID do processo, ID da gravação e carimbo de data/hora atual, semelhante a `hotspot-pid-47496-id-1-2018_01_25_19_10_41.jfr`. Por padrão, este parâmetro está desabilitado.
`duration=`_time_
     Especifica a duração da gravação. Anexe `s` para especificar o tempo em segundos, `m` para minutos, `h` para horas ou `d` para dias (por exemplo, especificar `5h` significa 5 horas). Por padrão, a duração não é limitada, e este parâmetro é definido como 0.
`filename=`_path_
    

Especifica o caminho e o nome do arquivo para o qual a gravação é gravada quando a gravação é interrompida, por exemplo:

  * `recording.jfr`
  * `/home/user/recordings/recording.jfr`
  * `c:\recordings\recording.jfr`



Se %p e/ou %t for especificado no nome do arquivo, ele se expande para o PID da JVM e o carimbo de data/hora atual, respectivamente. O nome do arquivo também pode ser um diretório, caso em que o nome do arquivo é gerado a partir do PID e da data atual no diretório especificado.

`name=`_identifier_
     Recebe tanto o nome quanto o identificador de uma gravação.
`maxage=`_time_
     Especifica a idade máxima dos dados em disco a serem mantidos para a gravação. Este parâmetro é válido apenas quando o parâmetro `disk` é definido como `true`. Anexe `s` para especificar o tempo em segundos, `m` para minutos, `h` para horas ou `d` para dias (por exemplo, especificar `30s` significa 30 segundos). Por padrão, a idade máxima não é limitada, e este parâmetro é definido como `0s`.
`maxsize=`_size_
     Especifica o tamanho máximo (em bytes) dos dados em disco a serem mantidos para a gravação. Este parâmetro é válido apenas quando o parâmetro `disk` é definido como `true`. O valor não deve ser menor que o valor do parâmetro `maxchunksize` definido com `-XX:FlightRecorderOptions`. Anexe `m` ou `M` para especificar o tamanho em megabytes, ou `g` ou `G` para especificar o tamanho em gigabytes. Por padrão, o tamanho máximo dos dados em disco não é limitado, e este parâmetro é definido como `0`.
`path-to-gc-roots=`{`true`|`false`}
    

Especifica se deve coletar o caminho para as raízes de coleta de lixo (GC) no final de uma gravação. Por padrão, este parâmetro está desabilitado.

O caminho para as raízes de GC é útil para encontrar vazamentos de memória, mas coletá-lo consome tempo. Habilite esta opção apenas quando você iniciar uma gravação para uma aplicação que você suspeita ter um vazamento de memória. Se o parâmetro `settings` for definido como `profile`, o rastreamento de pilha de onde o objeto potencialmente vazando foi alocado é incluído nas informações coletadas.
`report-on-exit=`_identificador_
     Especifica o nome da visualização a ser exibida quando a Java Virtual Machine (JVM) é encerrada. Para especificar mais de uma visualização, use o parâmetro `report-on-exit` repetidamente. Esta opção não está disponível se a opção `disk` estiver definida como `false`. Para uma lista de visualizações disponíveis, consulte `jfr help view`. Por padrão, nenhum relatório é gerado.
`settings=`_caminho_
    

Especifica o caminho e o nome do arquivo de configurações de evento (do tipo JFC). Por padrão, o arquivo `default.jfc` é usado, que está localizado em `JAVA_HOME/lib/jfr`. Este arquivo de configurações padrão coleta um conjunto predefinido de informações com baixa sobrecarga, de modo que tem impacto mínimo no desempenho e pode ser usado com gravações que são executadas continuamente.

Um segundo arquivo de configurações também é fornecido, `profile.jfc`, que oferece mais dados do que a configuração padrão, mas pode ter mais sobrecarga e impactar o desempenho. Use esta configuração por curtos períodos de tempo quando mais informações forem necessárias.

Você pode especificar valores para múltiplos parâmetros separando-os com uma vírgula. As configurações de evento e as opções .jfc podem ser especificadas usando a seguinte sintaxe:

`option=`_valor_
     Especifica o valor da opção a ser modificado. Para listar as opções disponíveis, use a ferramenta `JAVA_HOME`/bin/jfr.
`event-setting=`_valor_
     Especifica o valor da configuração de evento a ser modificado. Use o formato: `<event-name>#<setting-name>=<value>`. Para adicionar uma nova configuração de evento, prefixe o nome do evento com '+'.

Você pode especificar valores para múltiplas configurações de evento e opções .jfc separando-os com uma vírgula. Em caso de conflito entre um parâmetro e uma opção .jfc, o parâmetro terá precedência. O delimitador de espaço em branco pode ser omitido para valores de período de tempo, ou seja, `20ms`. Para mais informações sobre a sintaxe das configurações, consulte o Javadoc do pacote `jdk.jfr`.

Para ver apenas avisos e erros do JFR durante a inicialização, defina `-Xlog:jfr+startup=warning`.

`-XX:ThreadStackSize=`_tamanho_
    

Define o tamanho da pilha de threads Java (em kilobytes). O uso de um sufixo de escala, como `k`, resulta na escala do valor em kilobytes, de modo que `-XX:ThreadStackSize=1k` define o tamanho da pilha de threads Java para 1024*1024 bytes ou 1 megabyte. O valor padrão depende da plataforma. Por exemplo:

  * Linux/x64: 1024 KB

  * Linux/Aarch64: 2048 KB

  * macOS/x64: 1024 KB

  * macOS/Aarch64: 2048 KB

  * Windows: O valor padrão depende da memória virtual




Os exemplos a seguir mostram como definir o tamanho da pilha de threads para 1 megabyte em diferentes unidades:
```
    -XX:ThreadStackSize=1k
    -XX:ThreadStackSize=1024
```

Esta opção é semelhante a `-Xss`.

`-XX:+UseCompactObjectHeaders`
    

Habilita cabeçalhos de objeto compactos. Por padrão, esta opção está desabilitada. Habilitar esta opção reduz o consumo de memória no heap Java em 4 bytes por objeto (em média) e frequentemente melhora o desempenho.

O recurso permanece desabilitado por padrão enquanto continua a ser avaliado. Em uma versão futura, espera-se que seja habilitado por padrão e, eventualmente, será o único modo de operação.

`-XX:-UseCompressedOops`
    

Desabilita o uso de ponteiros compactados. Por padrão, esta opção está habilitada e ponteiros compactados são usados. Isso limitará automaticamente o tamanho máximo do heap Java determinado ergonomicamente à quantidade máxima de memória que pode ser coberta por ponteiros compactados. Por padrão, este intervalo é de `32 GB`.

Com `compressed oops` habilitado, as referências de objeto são representadas como offsets de 32 bits em vez de ponteiros de 64 bits, o que tipicamente aumenta o desempenho ao executar a aplicação com tamanhos de heap Java menores que o intervalo de ponteiros `compressed oops`. Esta opção funciona apenas para JVMs de 64 bits.

É possível usar ponteiros compactados com tamanhos de heap Java maiores que `32 GB`. Consulte a opção `-XX:ObjectAlignmentInBytes`.

`-XX:-UseContainerSupport`
    

**Somente Linux:** A VM agora oferece suporte automático à detecção de contêineres, o que permite à VM determinar a quantidade de memória e o número de processadores disponíveis para um processo Java em execução em contêineres Docker. Ela usa essas informações para alocar recursos do sistema. O valor padrão para esta flag é `true`, e o suporte a contêineres é habilitado por padrão. Ele pode ser desabilitado com `-XX:-UseContainerSupport`.

O `Unified Logging` está disponível para ajudar a diagnosticar problemas relacionados a este suporte.

Use `-Xlog:os+container=trace` para o registro máximo de informações do contêiner. Consulte Habilitar Logging com o JVM Unified Logging Framework para uma descrição do uso de `Unified Logging`.

`-XX:+UseLargePages`
    

Habilita o uso de memória de páginas grandes. Por padrão, esta opção está desabilitada e a memória de páginas grandes não é usada.

Consulte `Large Pages`.

`-XX:+UseTransparentHugePages`
     **Somente Linux:** Habilita o uso de páginas grandes que podem crescer ou diminuir dinamicamente. Esta opção está desabilitada por padrão. Você pode encontrar problemas de desempenho com páginas enormes transparentes, pois o sistema operacional move outras páginas para criar páginas enormes; esta opção é disponibilizada para experimentação.
`-XX:+AllowUserSignalHandlers`
     **Não-Windows:** Habilita a instalação de manipuladores de sinal pela aplicação. Por padrão, esta opção está desabilitada e a aplicação não tem permissão para instalar manipuladores de sinal.
`-XX:VMOptionsFile=`_nome_do_arquivo_
     Permite ao usuário especificar opções da VM em um arquivo, por exemplo, `java -XX:VMOptionsFile=/var/my_vm_options HelloWorld`.
`-XX:UseBranchProtection=`_modo_
    

**Somente Linux AArch64:** Especifica o modo de proteção de branch. Todas as opções, exceto `none`, exigem que a VM tenha sido construída com a proteção de branch habilitada. Além disso, para proteção total, quaisquer bibliotecas nativas fornecidas pelas aplicações devem ser compiladas com o mesmo nível de proteção.

Os possíveis argumentos de _modo_ para esta opção incluem o seguinte:

`none`
     Não usar proteção de branch. Este é o valor padrão.
`standard`
     Habilita todos os modos de proteção de branch disponíveis na plataforma atual.
`pac-ret`
     Habilita a proteção contra ataques baseados em `ROP`. (Somente `AArch64 8.3+`)

## Opções Avançadas do Compilador JIT para java

Estas opções `java` controlam a compilação dinâmica just-in-time (JIT) realizada pela `Java HotSpot VM`.

`-XX:AllocateInstancePrefetchLines=`_linhas_
    

Define o número de linhas a serem pré-buscadas antes do ponteiro de alocação de instância. Por padrão, o número de linhas a serem pré-buscadas é definido como 1:

> `-XX:AllocateInstancePrefetchLines=1`

`-XX:AllocatePrefetchDistance=`_tamanho_
    

Define o tamanho (em bytes) da distância de pré-busca para alocação de objetos. A memória prestes a ser escrita com o valor de novos objetos é pré-buscada até esta distância, começando do endereço do último objeto alocado. Cada thread Java tem seu próprio ponto de alocação.

Valores negativos indicam que a distância de pré-busca é escolhida com base na plataforma. Valores positivos são bytes a serem pré-buscados. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, ou `g` ou `G` para indicar gigabytes. O valor padrão é -1.

O exemplo a seguir mostra como definir a distância de pré-busca para 1024 bytes:

> `-XX:AllocatePrefetchDistance=1024`

`-XX:AllocatePrefetchInstr=`_instrucao_
    

Define a instrução de pré-busca para pré-buscar antes do ponteiro de alocação. Os valores possíveis são de 0 a 3. As instruções reais por trás dos valores dependem da plataforma. Por padrão, a instrução de pré-busca é definida como 0:

> `-XX:AllocatePrefetchInstr=0`

`-XX:AllocatePrefetchLines=`_linhas_
    

Define o número de linhas de cache a serem carregadas após a última alocação de objeto usando as instruções de pré-busca geradas no código compilado. O valor padrão é 1 se o último objeto alocado foi uma instância, e 3 se foi um array.

O exemplo a seguir mostra como definir o número de linhas de cache carregadas para 5:

> `-XX:AllocatePrefetchLines=5`

`-XX:AllocatePrefetchStepSize=`_tamanho_
    

Define o tamanho do passo (em bytes) para instruções de pré-busca sequenciais. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, `g` ou `G` para indicar gigabytes. Por padrão, o tamanho do passo é definido como 16 bytes:

> `-XX:AllocatePrefetchStepSize=16`

`-XX:AllocatePrefetchStyle=`_estilo_
    

Define o estilo de código gerado para instruções de pré-busca. O argumento _estilo_ é um número inteiro de 0 a 3:

`0`
     Não gerar instruções de pré-busca.
`1`
     Executar instruções de pré-busca após cada alocação. Esta é a configuração padrão.
`2`
     Usar o ponteiro de marca d'água do bloco de alocação local de thread (`TLAB`) para determinar quando as instruções de pré-busca são executadas.
`3`
     Gerar uma instrução de pré-busca por linha de cache.
`-XX:+BackgroundCompilation`
     Habilita a compilação em segundo plano. Esta opção está habilitada por padrão. Para desabilitar a compilação em segundo plano, especifique `-XX:-BackgroundCompilation` (isso é equivalente a especificar `-Xbatch`).
`-XX:CICompilerCount=`_threads_
    

Define o número de threads do compilador a serem usadas para compilação. Por padrão, o número de threads do compilador é selecionado automaticamente dependendo do número de CPUs e da memória disponível para o código compilado. O exemplo a seguir mostra como definir o número de threads para 2:

> `-XX:CICompilerCount=2`

`-XX:+UseDynamicNumberOfCompilerThreads`
     Cria dinamicamente threads do compilador até o limite especificado por `-XX:CICompilerCount`. Esta opção está habilitada por padrão.
`-XX:CompileCommand=`_comando_`,`_metodo_[`,`_opcao_]
    

Especifica um _comando_ a ser executado em um _método_. Por exemplo, para excluir o método `indexOf()` da classe `String` da compilação, use o seguinte:

> `-XX:CompileCommand=exclude,java/lang/String.indexOf`

Observe que o nome completo da classe é especificado, incluindo todos os pacotes e subpacotes separados por uma barra (`/`). Para operações mais fáceis de copiar e colar, também é possível usar o formato de nome de método produzido pelas opções `-XX:+PrintCompilation` e `-XX:+LogCompilation`:

> `-XX:CompileCommand=exclude,java.lang.String::indexOf`

Se o método for especificado sem a assinatura, o comando será aplicado a todos os métodos com o nome especificado. No entanto, você também pode especificar a assinatura do método no formato de arquivo de classe. Neste caso, você deve envolver os argumentos entre aspas, pois, caso contrário, o shell tratará o ponto e vírgula como um final de comando. Por exemplo, se você quiser excluir apenas o método `indexOf(String)` da classe `String` da compilação, use o seguinte:

> `-XX:CompileCommand="exclude,java/lang/String.indexOf,(Ljava/lang/String;)I"`

Você também pode usar o asterisco (*) como um curinga para nomes de classes e métodos. Por exemplo, para excluir todos os métodos `indexOf()` em todas as classes da compilação, use o seguinte:

> `-XX:CompileCommand=exclude,*.indexOf`

As vírgulas e pontos são aliases para espaços, tornando mais fácil passar comandos do compilador através de um shell. Você pode passar argumentos para `-XX:CompileCommand` usando espaços como separadores, envolvendo o argumento entre aspas:

> `-XX:CompileCommand="exclude java/lang/String indexOf"`

Observe que, após analisar os comandos passados na linha de comando usando as opções `-XX:CompileCommand`, o compilador JIT então lê os comandos do arquivo `.hotspot_compiler`. Você pode adicionar comandos a este arquivo ou especificar um arquivo diferente usando a opção `-XX:CompileCommandFile`.

Para adicionar vários comandos, especifique a opção `-XX:CompileCommand` várias vezes ou separe cada argumento com o separador de nova linha (`\n`). Os seguintes comandos estão disponíveis:

`break`
     Define um breakpoint ao depurar a JVM para parar no início da compilação do método especificado.
`compileonly`
     Exclui todos os métodos da compilação, exceto o método especificado. Como alternativa, você pode usar a opção `-XX:CompileOnly`, que permite especificar vários métodos.
`dontinline`
     Impede o inlining do método especificado.
`exclude`
     Exclui o método especificado da compilação.
`help`
     Imprime uma mensagem de ajuda para a opção `-XX:CompileCommand`.
`inline`
     Tenta fazer o inlining do método especificado.
`log`
     Exclui o registro de compilação (com a opção `-XX:+LogCompilation`) para todos os métodos, exceto o método especificado. Por padrão, o registro é realizado para todos os métodos compilados.
`option`
    

Passa uma opção de compilação JIT para o método especificado no lugar do último argumento (`option`). A opção de compilação é definida no final, após o nome do método. Por exemplo, para habilitar a opção `BlockLayoutByFrequency` para o método `append()` da classe `StringBuffer`, use o seguinte:

> `-XX:CompileCommand=option,java/lang/StringBuffer.append,BlockLayoutByFrequency`

Você pode especificar múltiplas opções de compilação, separadas por vírgulas ou espaços.

`print`
     Imprime o código assembly gerado após a compilação do método especificado.
`quiet`
    

Instrui a não imprimir os comandos de compilação. Por padrão, os comandos que você especifica com a opção `-XX:CompileCommand` são impressos; por exemplo, se você excluir da compilação o método `indexOf()` da classe `String`, então o seguinte será impresso na saída padrão:

> `CompilerOracle: exclude java/lang/String.indexOf`

Você pode suprimir isso especificando a opção `-XX:CompileCommand=quiet` antes de outras opções `-XX:CompileCommand`.

`-XX:CompileCommandFile=`_nome_do_arquivo_
    

Define o arquivo do qual os comandos do compilador JIT são lidos. Por padrão, o arquivo `.hotspot_compiler` é usado para armazenar comandos executados pelo compilador JIT.

Cada linha no arquivo de comando representa um comando, um nome de classe e um nome de método para o qual o comando é usado. Por exemplo, esta linha imprime o código assembly para o método `toString()` da classe `String`:

> `print java/lang/String toString`

Se você estiver usando comandos para o compilador JIT executar em métodos, consulte a opção `-XX:CompileCommand`.

`-XX:CompilerDirectivesFile=`_arquivo_
    

Adiciona diretivas de um arquivo à pilha de diretivas quando um programa é iniciado. Consulte [Compiler Control](<https://docs.oracle.com/en/java/javase/12/vm/compiler-control1.html#GUID-94AD8194-786A-4F19-BFFF-278F8E237F3A>).

A opção `-XX:CompilerDirectivesFile` deve ser usada em conjunto com a opção `-XX:UnlockDiagnosticVMOptions` que desbloqueia as opções de diagnóstico da JVM.

`-XX:+CompilerDirectivesPrint`
    

Imprime a pilha de diretivas quando o programa é iniciado ou quando uma nova diretiva é adicionada.

A opção `-XX:+CompilerDirectivesPrint` deve ser usada em conjunto com a opção `-XX:UnlockDiagnosticVMOptions` que desbloqueia as opções de diagnóstico da JVM.

`-XX:CompileOnly=`_metodos_
    

Define a lista de métodos (separados por vírgulas) aos quais a compilação deve ser restrita. Apenas os métodos especificados são compilados.

`-XX:CompileOnly=method1,method2,...,methodN` é um alias para:
```
    -XX:CompileCommand=compileonly,method1
    -XX:CompileCommand=compileonly,method2
    ...
    -XX:CompileCommand=compileonly,methodN
```

`-XX:CompileThresholdScaling=`_escala_
     Fornece controle unificado da primeira compilação. Esta opção controla quando os métodos são compilados pela primeira vez para os modos de operação em camadas (`tiered`) e não em camadas (`nontiered`). A opção `CompileThresholdScaling` tem um valor de ponto flutuante entre 0 e +Inf e escala os limites correspondentes ao modo de operação atual (tanto `tiered` quanto `nontiered`). Definir `CompileThresholdScaling` para um valor menor que 1.0 resulta em compilação mais cedo, enquanto valores maiores que 1.0 atrasam a compilação. Definir `CompileThresholdScaling` para 0 é equivalente a desabilitar a compilação.
`-XX:+DoEscapeAnalysis`
     Habilita o uso da análise de escape. Esta opção está habilitada por padrão. Para desabilitar o uso da análise de escape, especifique `-XX:-DoEscapeAnalysis`.
`-XX:InitialCodeCacheSize=`_tamanho_
    

Define o tamanho inicial do cache de código (em bytes). Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, ou `g` ou `G` para indicar gigabytes. O valor padrão depende da plataforma. O tamanho inicial do cache de código não deve ser menor que o tamanho mínimo da página de memória do sistema. O exemplo a seguir mostra como definir o tamanho inicial do cache de código para 32 KB:

> `-XX:InitialCodeCacheSize=32k`

`-XX:+Inline`
     Habilita o inlining de métodos. Esta opção está habilitada por padrão para aumentar o desempenho. Para desabilitar o inlining de métodos, especifique `-XX:-Inline`.
`-XX:InlineSmallCode=`_tamanho_
    

Define o tamanho máximo de código (em bytes) para métodos já compilados que podem ser inlined. Esta flag se aplica apenas ao `C2 compiler`. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, ou `g` ou `G` para indicar gigabytes. O valor padrão depende da plataforma e se a compilação em camadas está habilitada. No exemplo a seguir, ele é definido como 1000 bytes:

> `-XX:InlineSmallCode=1000`

`-XX:+LogCompilation`
    

Habilita o registro da atividade de compilação em um arquivo chamado `hotspot.log` no diretório de trabalho atual. Você pode especificar um caminho e nome de arquivo de log diferente usando a opção `-XX:LogFile`.

Por padrão, esta opção está desabilitada e a atividade de compilação não é registrada. A opção `-XX:+LogCompilation` deve ser usada em conjunto com a opção `-XX:UnlockDiagnosticVMOptions` que desbloqueia as opções de diagnóstico da JVM.

Você pode habilitar a saída de diagnóstico detalhada com uma mensagem impressa no console toda vez que um método é compilado usando a opção `-XX:+PrintCompilation`.

`-XX:FreqInlineSize=`_tamanho_
    

Define o tamanho máximo do bytecode (em bytes) de um método "quente" a ser inlined. Esta flag se aplica apenas ao `C2 compiler`. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, ou `g` ou `G` para indicar gigabytes. O valor padrão depende da plataforma. No exemplo a seguir, ele é definido como 325 bytes:

> `-XX:FreqInlineSize=325`

`-XX:MaxInlineSize=`_tamanho_
    

Define o tamanho máximo do bytecode (em bytes) de um método "frio" a ser inlined. Esta flag se aplica apenas ao `C2 compiler`. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, ou `g` ou `G` para indicar gigabytes. Por padrão, o tamanho máximo do bytecode é definido como 35 bytes:

> `-XX:MaxInlineSize=35`

`-XX:C1MaxInlineSize=`_tamanho_
    

Define o tamanho máximo do bytecode (em bytes) de um método "frio" a ser inlined. Esta flag se aplica apenas ao `C1 compiler`. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, ou `g` ou `G` para indicar gigabytes. Por padrão, o tamanho máximo do bytecode é definido como 35 bytes:

> `-XX:MaxInlineSize=35`

`-XX:MaxTrivialSize=`_tamanho_
    

Define o tamanho máximo do bytecode (em bytes) de um método trivial a ser inlined. Esta flag se aplica apenas ao `C2 compiler`. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, ou `g` ou `G` para indicar gigabytes. Por padrão, o tamanho máximo do bytecode de um método trivial é definido como 6 bytes:

> `-XX:MaxTrivialSize=6`

`-XX:C1MaxTrivialSize=`_tamanho_
    

Define o tamanho máximo do bytecode (em bytes) de um método trivial a ser inlined. Esta flag se aplica apenas ao `C1 compiler`. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, ou `g` ou `G` para indicar gigabytes. Por padrão, o tamanho máximo do bytecode de um método trivial é definido como 6 bytes:

> `-XX:MaxTrivialSize=6`

`-XX:MaxNodeLimit=`_nos_
    

Define o número máximo de nós a serem usados durante a compilação de um único método. Por padrão, o valor depende dos recursos habilitados. No exemplo a seguir, o número máximo de nós é definido como 100.000:

> `-XX:MaxNodeLimit=100000`

`-XX:NonNMethodCodeHeapSize=`_tamanho_
    

Define o tamanho em bytes do segmento de código contendo código não-método.

Um segmento de código não-método contendo código não-método, como buffers do compilador e o interpretador de bytecode. Este tipo de código permanece no cache de código para sempre. Esta flag é usada apenas se `-XX:SegmentedCodeCache` estiver habilitado.

`-XX:NonProfiledCodeHeapSize=`_tamanho_
     Define o tamanho em bytes do segmento de código contendo métodos não-profilados. Esta flag é usada apenas se `-XX:SegmentedCodeCache` estiver habilitado.
`-XX:+OptimizeStringConcat`
     Habilita a otimização de operações de concatenação de `String`. Esta opção está habilitada por padrão. Para desabilitar a otimização de operações de concatenação de `String`, especifique `-XX:-OptimizeStringConcat`.
`-XX:+PrintAssembly`
    

Habilita a impressão de código assembly para métodos bytecode e nativos usando a biblioteca externa `hsdis-<arch>.so` ou `.dll`. Para VM de 64 bits no Windows, é `hsdis-amd64.dll`. Isso permite que você veja o código gerado, o que pode ajudar a diagnosticar problemas de desempenho.

Por padrão, esta opção está desabilitada e o código assembly não é impresso. A opção `-XX:+PrintAssembly` deve ser usada em conjunto com a opção `-XX:UnlockDiagnosticVMOptions` que desbloqueia as opções de diagnóstico da JVM.

`-XX:ProfiledCodeHeapSize=`_tamanho_
     Define o tamanho em bytes do segmento de código contendo métodos profilados. Esta flag é usada apenas se `-XX:SegmentedCodeCache` estiver habilitado.
`-XX:+PrintCompilation`
    

Habilita a saída de diagnóstico detalhada da JVM, imprimindo uma mensagem no console toda vez que um método é compilado. Isso permite que você veja quais métodos são realmente compilados. Por padrão, esta opção está desabilitada e a saída de diagnóstico não é impressa.

Você também pode registrar a atividade de compilação em um arquivo usando a opção `-XX:+LogCompilation`.

`-XX:+PrintInlining`
    

Habilita a impressão de decisões de inlining. Isso permite que você veja quais métodos estão sendo inlined.

Por padrão, esta opção está desabilitada e as informações de inlining não são impressas. A opção `-XX:+PrintInlining` deve ser usada em conjunto com a opção `-XX:+UnlockDiagnosticVMOptions` que desbloqueia as opções de diagnóstico da JVM.

`-XX:ReservedCodeCacheSize=`_tamanho_
     Define o tamanho máximo do cache de código (em bytes) para código compilado JIT. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, ou `g` ou `G` para indicar gigabytes. O tamanho máximo padrão do cache de código é `240 MB`; se você desabilitar a compilação em camadas com a opção `-XX:-TieredCompilation`, o tamanho padrão será `48 MB`. Esta opção tem um limite de `2 GB`; caso contrário, um erro é gerado. O tamanho máximo do cache de código não deve ser menor que o tamanho inicial do cache de código; consulte a opção `-XX:InitialCodeCacheSize`.
`-XX:+SegmentedCodeCache`
    

Habilita a segmentação do cache de código, sem a qual o cache de código consiste em um único segmento grande. Com `-XX:+SegmentedCodeCache`, segmentos separados serão usados para código não-método, método profilado e método não-profilado. Os segmentos não são redimensionados em tempo de execução. As vantagens são melhor controle do consumo de memória, fragmentação de código reduzida e melhor comportamento do `iTLB` da CPU (buffer de lookaside de tradução de instruções) e do cache de instruções devido à localidade aprimorada.

O recurso é habilitado por padrão se a compilação em camadas estiver habilitada (`-XX:+TieredCompilation`) e o tamanho do cache de código reservado (`-XX:ReservedCodeCacheSize`) for de pelo menos `240 MB`.

`-XX:StartAggressiveSweepingAt=`_porcentagem_
     Força a varredura da pilha de métodos ativos para remover agressivamente o código não utilizado quando apenas a porcentagem dada do cache de código está livre. O valor padrão é `10%`.
`-XX:-TieredCompilation`
     Desabilita o uso da compilação em camadas. Por padrão, esta opção está habilitada.
`-XX:UseSSE=`_versao_
     Habilita o uso do conjunto de instruções `SSE` de uma versão especificada. É definido por padrão para a versão mais alta suportada disponível (somente `x86`).
`-XX:UseAVX=`_versao_
     Habilita o uso do conjunto de instruções `AVX` de uma versão especificada. É definido por padrão para a versão mais alta suportada disponível (somente `x86`).
`-XX:+UseAES`
     Habilita intrinsics `AES` baseados em hardware para hardware que os suporta. Esta opção está ativada por padrão em hardware que possui as instruções necessárias. O `-XX:+UseAES` é usado em conjunto com `UseAESIntrinsics`. Flags que controlam intrinsics agora exigem a opção `-XX:+UnlockDiagnosticVMOptions`.
`-XX:+UseAESIntrinsics`
    

Habilita intrinsics `AES`. Especificar `-XX:+UseAESIntrinsics` é equivalente a também habilitar `-XX:+UseAES`. Para desabilitar intrinsics `AES` baseados em hardware, especifique `-XX:-UseAES -XX:-UseAESIntrinsics`. Por exemplo, para habilitar `AES` por hardware, use as seguintes flags:

> `-XX:+UseAES -XX:+UseAESIntrinsics`

Flags que controlam intrinsics agora exigem a opção `-XX:+UnlockDiagnosticVMOptions`.

`-XX:+UseAESCTRIntrinsics`
     Análogo a `-XX:+UseAESIntrinsics`, habilita intrinsics `AES/CTR`.
`-XX:+UseGHASHIntrinsics`
     Controla o uso de intrinsics `GHASH`. Habilitado por padrão em plataformas que suportam as instruções correspondentes. Flags que controlam intrinsics agora exigem a opção `-XX:+UnlockDiagnosticVMOptions`.
`-XX:+UseChaCha20Intrinsics`
     Habilita intrinsics `ChaCha20`. Esta opção está ativada por padrão para plataformas suportadas. Para desabilitar intrinsics `ChaCha20`, especifique `-XX:-UseChaCha20Intrinsics`. Flags que controlam intrinsics agora exigem a opção `-XX:+UnlockDiagnosticVMOptions`.
`-XX:+UsePoly1305Intrinsics`
     Habilita intrinsics `Poly1305`. Esta opção está ativada por padrão para plataformas suportadas. Para desabilitar intrinsics `Poly1305`, especifique `-XX:-UsePoly1305Intrinsics`. Flags que controlam intrinsics agora exigem a opção `-XX:+UnlockDiagnosticVMOptions`.
`-XX:+UseBASE64Intrinsics`
     Controla o uso de rotinas de codificação `BASE64` aceleradas para `java.util.Base64`. Habilitado por padrão em plataformas que o suportam. Flags que controlam intrinsics agora exigem a opção `-XX:+UnlockDiagnosticVMOptions`.
`-XX:+UseAdler32Intrinsics`
     Controla o uso do intrinsic do algoritmo de checksum `Adler32` para `java.util.zip.Adler32`. Habilitado por padrão em plataformas que o suportam. Flags que controlam intrinsics agora exigem a opção `-XX:+UnlockDiagnosticVMOptions`.
`-XX:+UseCRC32Intrinsics`
     Controla o uso de intrinsics `CRC32` para `java.util.zip.CRC32`. Habilitado por padrão em plataformas que o suportam. Flags que controlam intrinsics agora exigem a opção `-XX:+UnlockDiagnosticVMOptions`.
`-XX:+UseCRC32CIntrinsics`
     Controla o uso de intrinsics `CRC32C` para `java.util.zip.CRC32C`. Habilitado por padrão em plataformas que o suportam. Flags que controlam intrinsics agora exigem a opção `-XX:+UnlockDiagnosticVMOptions`.
`-XX:+UseSHA`
    

Habilita intrinsics `SHA` baseados em hardware para funções hash criptográficas para alguns hardwares. A opção `UseSHA` é usada em conjunto com as opções `UseSHA1Intrinsics`, `UseSHA256Intrinsics` e `UseSHA512Intrinsics`.

As flags `UseSHA` e `UseSHA*Intrinsics` são habilitadas por padrão em máquinas que suportam as instruções correspondentes.

Este recurso é aplicável apenas ao usar o provedor `sun.security.provider.Sun` para operações `SHA`. Flags que controlam intrinsics agora exigem a opção `-XX:+UnlockDiagnosticVMOptions`.

Para desabilitar todos os intrinsics `SHA` baseados em hardware, especifique `-XX:-UseSHA`. Para desabilitar apenas um intrinsic `SHA` específico, use a opção correspondente apropriada. Por exemplo: `-XX:-UseSHA256Intrinsics`.

`-XX:+UseSHA1Intrinsics`
     Habilita intrinsics para a função hash criptográfica `SHA-1`. Flags que controlam intrinsics agora exigem a opção `-XX:+UnlockDiagnosticVMOptions`.
`-XX:+UseSHA256Intrinsics`
     Habilita intrinsics para as funções hash criptográficas `SHA-224` e `SHA-256`. Flags que controlam intrinsics agora exigem a opção `-XX:+UnlockDiagnosticVMOptions`.
`-XX:+UseSHA512Intrinsics`
     Habilita intrinsics para as funções hash criptográficas `SHA-384` e `SHA-512`. Flags que controlam intrinsics agora exigem a opção `-XX:+UnlockDiagnosticVMOptions`.
`-XX:+UseMathExactIntrinsics`
     Habilita a intrinsificação de várias funções `java.lang.Math.*Exact()`. Habilitado por padrão. Flags que controlam intrinsics agora exigem a opção `-XX:+UnlockDiagnosticVMOptions`.
`-XX:+UseMultiplyToLenIntrinsic`
     Habilita a intrinsificação de `BigInteger.multiplyToLen()`. Habilitado por padrão em plataformas que o suportam. Flags que controlam intrinsics agora exigem a opção `-XX:+UnlockDiagnosticVMOptions`.
-XX:+UseSquareToLenIntrinsic
     Habilita a intrinsificação de `BigInteger.squareToLen()`. Habilitado por padrão em plataformas que o suportam. Flags que controlam intrinsics agora exigem a opção `-XX:+UnlockDiagnosticVMOptions`.
-XX:+UseMulAddIntrinsic
     Habilita a intrinsificação de `BigInteger.mulAdd()`. Habilitado por padrão em plataformas que o suportam. Flags que controlam intrinsics agora exigem a opção `-XX:+UnlockDiagnosticVMOptions`.
-XX:+UseMontgomeryMultiplyIntrinsic
     Habilita a intrinsificação de `BigInteger.montgomeryMultiply()`. Habilitado por padrão em plataformas que o suportam. Flags que controlam intrinsics agora exigem a opção `-XX:+UnlockDiagnosticVMOptions`.
-XX:+UseMontgomerySquareIntrinsic
     Habilita a intrinsificação de `BigInteger.montgomerySquare()`. Habilitado por padrão em plataformas que o suportam. Flags que controlam intrinsics agora exigem a opção `-XX:+UnlockDiagnosticVMOptions`.
`-XX:+UseCMoveUnconditionally`
     Gera instruções `CMove` (escalares e vetoriais) independentemente da análise de lucratividade.
`-XX:+UseCodeCacheFlushing`
     Habilita a descarga do cache de código antes de desligar o compilador. Esta opção está habilitada por padrão. Para desabilitar a descarga do cache de código antes de desligar o compilador, especifique `-XX:-UseCodeCacheFlushing`.
`-XX:+UseCondCardMark`
     Habilita a verificação se o cartão já está marcado antes de atualizar a tabela de cartões. Esta opção está desabilitada por padrão. Deve ser usada apenas em máquinas com múltiplos sockets, onde aumenta o desempenho de aplicações Java que dependem de operações concorrentes.
`-XX:+UseCountedLoopSafepoints`
     Mantém safepoints em loops contados. Seu valor padrão depende se o garbage collector selecionado requer safepoints de baixa latência.
`-XX:LoopStripMiningIter=`_numero_de_iteracoes_
     Controla o número de iterações no loop interno de strip mining. O strip mining transforma loops contados em loops aninhados de dois níveis. Safepoints são mantidos no loop externo, enquanto o loop interno pode ser executado em velocidade máxima. Esta opção controla o número máximo de iterações no loop interno. O valor padrão é 1.000.
`-XX:LoopStripMiningIterShortLoop=`_numero_de_iteracoes_
     Controla a otimização de strip mining de loop. Loops com número de iterações menor que o especificado não terão safepoints. O valor padrão é 1/10 de `-XX:LoopStripMiningIter`.
`-XX:+UseFMA`
     Habilita intrinsics `FMA` baseados em hardware para hardware onde as instruções `FMA` estão disponíveis (como `Intel` e `ARM64`). Intrinsics `FMA` são gerados para os métodos `java.lang.Math.fma(`_a_`,` _b_`,` _c_`)` que calculam o valor das expressões `(` _a_ `*` _b_ `+` _c_ `)`.
`-XX:+UseSuperWord`
     Habilita a transformação de operações escalares em operações superword. Superword é uma otimização de vetorização. Esta opção está habilitada por padrão. Para desabilitar a transformação de operações escalares em operações superword, especifique `-XX:-UseSuperWord`.
## Opções Avançadas de Serviceability para Java

Estas opções `java` fornecem a capacidade de coletar informações do sistema e realizar depuração extensiva.

`-XX:+DisableAttachMechanism`
    

Desabilita o mecanismo que permite que ferramentas se anexem à JVM. Por padrão, esta opção está desabilitada, o que significa que o mecanismo de anexação está habilitado e você pode usar ferramentas de diagnóstico e solução de problemas como `jcmd`, `jstack`, `jmap` e `jinfo`.

> **Nota:** As ferramentas como [jcmd](<#/doc/guides/tools/jcmd>), [jinfo](<#/doc/guides/tools/jinfo>), [jmap](<#/doc/guides/tools/jmap>) e [jstack](<#/doc/guides/tools/jstack>) fornecidas com o JDK não são suportadas ao usar as ferramentas de uma versão do JDK para solucionar problemas de uma versão diferente do JDK.

`-XX:+DTraceAllocProbes`
     **Linux e macOS:** Habilita as sondas da ferramenta `dtrace` para alocação de objetos. 
`-XX:+DTraceMethodProbes`
     **Linux e macOS:** Habilita as sondas da ferramenta `dtrace` para entrada e saída de métodos. 
`-XX:+DTraceMonitorProbes`
     **Linux e macOS:** Habilita as sondas da ferramenta `dtrace` para eventos de monitor. 
`-XX:+HeapDumpOnOutOfMemoryError`
     Habilita o despejo do heap Java para um arquivo no diretório atual usando o heap profiler (HPROF) quando uma exceção `java.lang.OutOfMemoryError` é lançada pela JVM. Você pode definir explicitamente o caminho e o nome do arquivo de despejo do heap usando a opção `-XX:HeapDumpPath`. Por padrão, esta opção está desabilitada e o heap não é despejado quando uma exceção `OutOfMemoryError` é lançada. Isso se aplica apenas a exceções `OutOfMemoryError` causadas por exaustão do Heap Java; não se aplica a exceções `OutOfMemoryError` lançadas diretamente do código Java, nem pela JVM para outros tipos de exaustão de recursos (como erros de criação de threads nativas). 
`-XX:HeapDumpPath=`_path_
    

Define o caminho e o nome do arquivo para escrever o despejo de heap fornecido pelo heap profiler (HPROF) quando a opção `-XX:+HeapDumpOnOutOfMemoryError` é definida. Por padrão, o arquivo é criado no diretório de trabalho atual e é nomeado `java_pid<pid>.hprof`, onde `<pid>` é o identificador do processo que causou o erro. O exemplo a seguir mostra como definir o arquivo padrão explicitamente (`%p` representa o identificador do processo atual):

> `-XX:HeapDumpPath=./java_pid%p.hprof`

  * **Não-Windows:** O exemplo a seguir mostra como definir o arquivo de despejo de heap para `/var/log/java/java_heapdump.hprof`:

> `-XX:HeapDumpPath=/var/log/java/java_heapdump.hprof`

  * **Windows:** O exemplo a seguir mostra como definir o arquivo de despejo de heap para `C:/log/java/java_heapdump.log`:

> `-XX:HeapDumpPath=C:/log/java/java_heapdump.log`



`-XX:LogFile=`_path_
    

Define o caminho e o nome do arquivo onde os dados de log são gravados. Por padrão, o arquivo é criado no diretório de trabalho atual e é nomeado `hotspot.log`.

  * **Não-Windows:** O exemplo a seguir mostra como definir o arquivo de log para `/var/log/java/hotspot.log`:

> `-XX:LogFile=/var/log/java/hotspot.log`

  * **Windows:** O exemplo a seguir mostra como definir o arquivo de log para `C:/log/java/hotspot.log`:

> `-XX:LogFile=C:/log/java/hotspot.log`



`-XX:+PrintClassHistogram`
    

Habilita a impressão de um histograma de instâncias de classe após um dos seguintes eventos:

  * **Não-Windows:** `Control+\` (`SIGQUIT`)

  * **Windows:** `Control+C` (`SIGTERM`)




Por padrão, esta opção está desabilitada.

Definir esta opção é equivalente a executar o comando `jmap -histo`, ou o comando `jcmd` _pid_ `GC.class_histogram`, onde _pid_ é o identificador do processo Java atual.

`-XX:+PrintConcurrentLocks`
    

Habilita a impressão de locks de `java.util.concurrent` após um dos seguintes eventos:

  * **Não-Windows:** `Control+\` (`SIGQUIT`)

  * **Windows:** `Control+C` (`SIGTERM`)




Por padrão, esta opção está desabilitada.

Definir esta opção é equivalente a executar o comando `jstack -l` ou o comando `jcmd` _pid_ `Thread.print -l`, onde _pid_ é o identificador do processo Java atual.

`-XX:+PrintFlagsRanges`
     Imprime o intervalo especificado e permite o teste automático dos valores. Veja Validar Argumentos de Flags da Java Virtual Machine. 
`-XX:+PerfDataSaveToFile`
    

Se habilitado, salva dados binários do [jstat](<#/doc/guides/tools/jstat>) quando a aplicação Java é encerrada. Esses dados binários são salvos em um arquivo chamado `hsperfdata_`_pid_ , onde _pid_ é o identificador do processo da aplicação Java que você executou. Use o comando `jstat` para exibir os dados de desempenho contidos neste arquivo da seguinte forma:

> `jstat -class file:///`_path_`/hsperfdata_`_pid_

> `jstat -gc file:///`_path_`/hsperfdata_`_pid_

`-XX:+UsePerfData`
     Habilita o recurso `perfdata`. Esta opção é habilitada por padrão para permitir o monitoramento da JVM e testes de desempenho. Desabilitá-la suprime a criação dos diretórios `hsperfdata_userid`. Para desabilitar o recurso `perfdata`, especifique `-XX:-UsePerfData`. 

## Opções Avançadas de Garbage Collection para Java

Estas opções `java` controlam como o garbage collection (GC) é realizado pela Java HotSpot VM.

`-XX:+AggressiveHeap`
     Habilita a otimização do heap Java. Isso define vários parâmetros para serem ideais para trabalhos de longa duração com alocação intensiva de memória, com base na configuração do computador (RAM e CPU). Por padrão, a opção está desabilitada e os tamanhos do heap são configurados de forma menos agressiva. 
`-XX:+AlwaysPreTouch`
     Solicita à VM que toque em cada página no heap Java após solicitá-la ao sistema operacional e antes de entregar a memória à aplicação. Por padrão, esta opção está desabilitada e todas as páginas são confirmadas à medida que a aplicação usa o espaço do heap. 
`-XX:ConcGCThreads=`_threads_
    

Define o número de threads usadas para GC concorrente. Define _`threads`_ para aproximadamente 1/4 do número de threads de garbage collection paralelas. O valor padrão depende do número de CPUs disponíveis para a JVM.

Por exemplo, para definir o número de threads para GC concorrente como 2, especifique a seguinte opção:

> `-XX:ConcGCThreads=2`

`-XX:+DisableExplicitGC`
     Habilita a opção que desabilita o processamento de chamadas ao método `System.gc()`. Esta opção está desabilitada por padrão, o que significa que as chamadas para `System.gc()` são processadas. Se o processamento de chamadas para `System.gc()` for desabilitado, a JVM ainda realizará GC quando necessário. 
`-XX:+ExplicitGCInvokesConcurrent`
     Habilita a invocação de GC concorrente usando a solicitação `System.gc()`. Esta opção está desabilitada por padrão e só pode ser habilitada com a opção `-XX:+UseG1GC`. 
`-XX:G1AdaptiveIHOPNumInitialSamples=`_number_
     Quando `-XX:UseAdaptiveIHOP` está habilitado, esta opção define o número de ciclos de marcação concluídos usados para coletar amostras até que o G1 determine adaptativamente o valor ideal de `-XX:InitiatingHeapOccupancyPercent`. Antes, o G1 usava o valor de `-XX:InitiatingHeapOccupancyPercent` diretamente para este propósito. O valor padrão é 3. 
`-XX:G1HeapRegionSize=`_size_
    

Define o tamanho das regiões nas quais o heap Java é subdividido ao usar o coletor garbage-first (G1). O valor é uma potência de 2 e pode variar de 1 MB a 32 MB. O tamanho da região padrão é determinado ergonomicamente com base no tamanho do heap, com o objetivo de aproximadamente 2048 regiões.

O exemplo a seguir define o tamanho das subdivisões para 16 MB:

> `-XX:G1HeapRegionSize=16m`

`-XX:G1HeapWastePercent=`_percent_
     Define a porcentagem do heap que você está disposto a desperdiçar. A Java HotSpot VM não inicia o ciclo de garbage collection misto quando a porcentagem recuperável é menor que a porcentagem de desperdício do heap. O padrão é 5 por cento. 
`-XX:G1MaxNewSizePercent=`_percent_
    

Define a porcentagem do tamanho do heap a ser usada como o máximo para o tamanho da young generation. O valor padrão é 60 por cento do seu heap Java.

Esta é uma flag experimental. Esta configuração substitui a configuração `-XX:DefaultMaxNewGenPercent`.

`-XX:G1MixedGCCountTarget=`_number_
     Define o número alvo de garbage collections mistas após um ciclo de marcação para coletar regiões antigas com no máximo `G1MixedGCLIveThresholdPercent` de dados vivos. O padrão é 8 garbage collections mistas. O objetivo para as coletas mistas é estar dentro deste número alvo. 
`-XX:G1MixedGCLiveThresholdPercent=`_percent_
    

Define o limite de ocupação para uma região antiga ser incluída em um ciclo de garbage collection misto. A ocupação padrão é de 85 por cento.

Esta é uma flag experimental. Esta configuração substitui a configuração `-XX:G1OldCSetRegionLiveThresholdPercent`.

`-XX:G1NewSizePercent=`_percent_
    

Define a porcentagem do heap a ser usada como o mínimo para o tamanho da young generation. O valor padrão é 5 por cento do seu heap Java.

Esta é uma flag experimental. Esta configuração substitui a configuração `-XX:DefaultMinNewGenPercent`.

`-XX:G1OldCSetRegionThresholdPercent=`_percent_
     Define um limite superior para o número de regiões antigas a serem coletadas durante um ciclo de garbage collection misto. O padrão é 10 por cento do heap Java. 
`-XX:G1ReservePercent=`_percent_
    

Define a porcentagem do heap (0 a 50) que é reservada como um teto falso para reduzir a possibilidade de falha de promoção para o coletor G1. Ao aumentar ou diminuir a porcentagem, certifique-se de ajustar o heap Java total na mesma quantidade. Por padrão, esta opção é definida como 10%.

O exemplo a seguir define o heap reservado para 20%:

> `-XX:G1ReservePercent=20`

`-XX:+G1UseAdaptiveIHOP`
    

Controla o cálculo adaptativo da ocupação da old generation para iniciar o trabalho em segundo plano preparando-se para uma coleta da old generation. Se habilitado, o G1 usa `-XX:InitiatingHeapOccupancyPercent` nas primeiras vezes, conforme especificado pelo valor de `-XX:G1AdaptiveIHOPNumInitialSamples`, e depois disso calcula adaptativamente um novo valor ótimo para a ocupação inicial automaticamente. Caso contrário, o processo de coleta da old generation sempre começa na ocupação da old generation determinada por `-XX:InitiatingHeapOccupancyPercent`.

O padrão é habilitado.

`-XX:InitialHeapSize=`_size_
    

Define o tamanho inicial (em bytes) do pool de alocação de memória. Este valor deve ser 0, ou um múltiplo de 1024 e maior que 1 MB. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, ou `g` ou `G` para indicar gigabytes. O valor padrão é selecionado em tempo de execução com base na configuração do sistema.

Os exemplos a seguir mostram como definir o tamanho da memória alocada para 6 MB usando várias unidades:
```
    -XX:InitialHeapSize=6291456
    -XX:InitialHeapSize=6144k
    -XX:InitialHeapSize=6m
```

Se você definir esta opção como 0, o tamanho inicial será definido como a soma dos tamanhos alocados para a old generation e a young generation. O tamanho do heap para a young generation pode ser definido usando a opção `-XX:NewSize`. Observe que a opção `-Xms` define tanto o tamanho mínimo quanto o tamanho inicial do heap. Se `-Xms` aparecer após `-XX:InitialHeapSize` na linha de comando, o tamanho inicial do heap será definido para o valor especificado com `-Xms`.

`-XX:InitialRAMPercentage=`_percent_
    

Define a quantidade inicial de memória que a JVM usará para o heap Java antes de aplicar heurísticas de ergonomia como uma porcentagem da quantidade máxima determinada conforme descrito na opção `-XX:MaxRAM`. O valor padrão é 1.5625 por cento.

O exemplo a seguir mostra como definir a porcentagem da quantidade inicial de memória usada para o heap Java:

> `-XX:InitialRAMPercentage=5`

`-XX:InitialSurvivorRatio=`_ratio_
    

Define a proporção inicial do espaço survivor usada pelo throughput garbage collector (que é habilitado pela opção `-XX:+UseParallelGC`). O dimensionamento adaptativo é habilitado por padrão com o throughput garbage collector usando a opção `-XX:+UseParallelGC`, e o espaço survivor é redimensionado de acordo com o comportamento da aplicação, começando com o valor inicial. Se o dimensionamento adaptativo for desabilitado (usando a opção `-XX:-UseAdaptiveSizePolicy`), então a opção `-XX:SurvivorRatio` deve ser usada para definir o tamanho do espaço survivor para toda a execução da aplicação.

A seguinte fórmula pode ser usada para calcular o tamanho inicial do espaço survivor (S) com base no tamanho da young generation (Y) e na proporção inicial do espaço survivor (R):

> `S=Y/(R+2)`

O 2 na equação denota dois espaços survivor. Quanto maior o valor especificado como a proporção inicial do espaço survivor, menor o tamanho inicial do espaço survivor.

Por padrão, a proporção inicial do espaço survivor é definida como 8. Se o valor padrão para o tamanho do espaço da young generation for usado (2 MB), então o tamanho inicial do espaço survivor é de 0.2 MB.

O exemplo a seguir mostra como definir a proporção inicial do espaço survivor para 4:

> `-XX:InitialSurvivorRatio=4`

`-XX:InitiatingHeapOccupancyPercent=`_percent_
    

Define a porcentagem de ocupação da old generation (0 a 100) na qual iniciar os primeiros ciclos de marcação concorrentes para o garbage collector G1.

Por padrão, o valor inicial é definido como 45%. Um valor de 0 implica ciclos de GC concorrentes ininterruptos desde o início até que o G1 defina este valor adaptativamente.

Consulte também as opções `-XX:G1UseAdaptiveIHOP` e `-XX:G1AdaptiveIHOPNumInitialSamples`.

O exemplo a seguir mostra como definir a ocupação inicial do heap para 75%:

> `-XX:InitiatingHeapOccupancyPercent=75`

`-XX:MaxGCPauseMillis=`_time_
    

Define um alvo para o tempo máximo de pausa do GC (em milissegundos). Este é um objetivo flexível, e a JVM fará o seu melhor para alcançá-lo. O valor especificado não se adapta ao tamanho do seu heap. Por padrão, para o G1, o alvo de tempo máximo de pausa é de 200 milissegundos. Os outros coletores geracionais não usam um objetivo de tempo de pausa por padrão.

O exemplo a seguir mostra como definir o tempo máximo de pausa alvo para 500 ms:

> `-XX:MaxGCPauseMillis=500`

`-XX:MaxHeapSize=`_size_
    

Define o tamanho máximo (em bytes) do pool de alocação de memória. Este valor deve ser um múltiplo de 1024 e maior que 2 MB. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, ou `g` ou `G` para indicar gigabytes. O valor padrão é selecionado em tempo de execução com base na configuração do sistema. Para implantações de servidor, as opções `-XX:InitialHeapSize` e `-XX:MaxHeapSize` são frequentemente definidas com o mesmo valor.

Os exemplos a seguir mostram como definir o tamanho máximo permitido de memória alocada para 80 MB usando várias unidades:
```
    -XX:MaxHeapSize=83886080
    -XX:MaxHeapSize=81920k
    -XX:MaxHeapSize=80m
```

A opção `-XX:MaxHeapSize` é equivalente a `-Xmx`.

`-XX:MaxHeapFreeRatio=`_percent_
    

Define a porcentagem máxima permitida de espaço livre no heap (0 a 100) após um evento de GC. Se o espaço livre no heap se expandir acima deste valor, o heap é reduzido. Por padrão, este valor é definido como 70%.

Minimize o tamanho do heap Java diminuindo os valores dos parâmetros `MaxHeapFreeRatio` (valor padrão é 70%) e `MinHeapFreeRatio` (valor padrão é 40%) com as opções de linha de comando `-XX:MaxHeapFreeRatio` e `-XX:MinHeapFreeRatio`. Reduzir `MaxHeapFreeRatio` para até 10% e `MinHeapFreeRatio` para 5% tem reduzido com sucesso o tamanho do heap sem muita regressão de desempenho; no entanto, os resultados podem variar muito dependendo da sua aplicação. Experimente diferentes valores para esses parâmetros até que sejam os mais baixos possíveis, mas ainda mantenham um desempenho aceitável.

> `-XX:MaxHeapFreeRatio=10 -XX:MinHeapFreeRatio=5`

Clientes que tentam manter o heap pequeno também devem adicionar a opção `-XX:-ShrinkHeapInSteps`. Consulte Exemplos de Ajuste de Desempenho para uma descrição do uso desta opção para manter o heap Java pequeno, reduzindo a pegada dinâmica para aplicações embarcadas.

`-XX:MaxMetaspaceSize=`_size_
    

Define a quantidade máxima de memória nativa que pode ser alocada para metadados de classe. Por padrão, o tamanho não é limitado. A quantidade de metadados para uma aplicação depende da própria aplicação, de outras aplicações em execução e da quantidade de memória disponível no sistema.

O exemplo a seguir mostra como definir o tamanho máximo de metadados de classe para 256 MB:

> `-XX:MaxMetaspaceSize=256m`

`-XX:MaxNewSize=`_size_
     Define o tamanho máximo (em bytes) do heap para a young generation (berçário). O valor padrão é definido ergonomicamente. 
`-XX:MaxRAM=`_size_
    

Define a quantidade máxima de memória que a JVM pode usar para o heap Java antes de aplicar heurísticas de ergonomia. O valor padrão é a quantidade máxima de memória disponível para o processo da JVM ou 128 GB, o que for menor.

A quantidade máxima de memória disponível para o processo da JVM é o mínimo da memória física da máquina e quaisquer restrições definidas pelo ambiente (por exemplo, container).

A especificação desta opção desabilita o uso automático de compressed oops se o resultado combinado desta e de outras opções que influenciam a quantidade máxima de memória for maior do que o intervalo de memória endereçável por compressed oops. Consulte `-XX:UseCompressedOops` para obter mais informações sobre compressed oops.

O exemplo a seguir mostra como definir a quantidade máxima de memória disponível para dimensionar o heap Java para 2 GB:

> `-XX:MaxRAM=2G`

`-XX:MaxRAMPercentage=`_percent_
    

Define a quantidade máxima de memória que a JVM pode usar para o heap Java antes de aplicar heurísticas de ergonomia como uma porcentagem da quantidade máxima determinada conforme descrito na opção `-XX:MaxRAM`. O valor padrão é 25 por cento.

A especificação desta opção desabilita o uso automático de compressed oops se o resultado combinado desta e de outras opções que influenciam a quantidade máxima de memória for maior do que o intervalo de memória endereçável por compressed oops. Consulte `-XX:UseCompressedOops` para obter mais informações sobre compressed oops.

O exemplo a seguir mostra como definir a porcentagem da quantidade máxima de memória usada para o heap Java:

> `-XX:MaxRAMPercentage=75`

`-XX:MinRAMPercentage=`_percent_
    

Define a quantidade máxima de memória que a JVM pode usar para o heap Java antes de aplicar heurísticas de ergonomia como uma porcentagem da quantidade máxima determinada conforme descrito na opção `-XX:MaxRAM` para heaps pequenos. Um heap pequeno é um heap de aproximadamente 125 MB. O valor padrão é 50 por cento.

O exemplo a seguir mostra como definir a porcentagem da quantidade máxima de memória usada para o heap Java para heaps pequenos:

> `-XX:MinRAMPercentage=75`

`-XX:MaxTenuringThreshold=`_threshold_
    

Define o limite máximo de tenuring para uso no dimensionamento adaptativo do GC. O maior valor é 15. O valor padrão é 15 para o coletor paralelo (throughput).

O exemplo a seguir mostra como definir o limite máximo de tenuring para 10:

> `-XX:MaxTenuringThreshold=10`

`-XX:MetaspaceSize=`_size_
     Define o tamanho do espaço de metadados de classe alocado que aciona um garbage collection na primeira vez que é excedido. Este limite para um garbage collection é aumentado ou diminuído dependendo da quantidade de metadados usados. O tamanho padrão depende da plataforma. 
`-XX:MinHeapFreeRatio=`_percent_
    

Define a porcentagem mínima permitida de espaço livre no heap (0 a 100) após um evento de GC. Se o espaço livre no heap cair abaixo deste valor, o heap é expandido. Por padrão, este valor é definido como 40%.

Minimize o tamanho do heap Java diminuindo os valores dos parâmetros `MaxHeapFreeRatio` (valor padrão é 70%) e `MinHeapFreeRatio` (valor padrão é 40%) com as opções de linha de comando `-XX:MaxHeapFreeRatio` e `-XX:MinHeapFreeRatio`. Reduzir `MaxHeapFreeRatio` para até 10% e `MinHeapFreeRatio` para 5% tem reduzido com sucesso o tamanho do heap sem muita regressão de desempenho; no entanto, os resultados podem variar muito dependendo da sua aplicação. Experimente diferentes valores para esses parâmetros até que sejam os mais baixos possíveis, mas ainda mantenham um desempenho aceitável.

> `-XX:MaxHeapFreeRatio=10 -XX:MinHeapFreeRatio=5`

Clientes que tentam manter o heap pequeno também devem adicionar a opção `-XX:-ShrinkHeapInSteps`. Consulte Exemplos de Ajuste de Desempenho para uma descrição do uso desta opção para manter o heap Java pequeno, reduzindo a pegada dinâmica para aplicações embarcadas.

`-XX:MinHeapSize=`_size_
    

Define o tamanho mínimo (em bytes) do pool de alocação de memória. Este valor deve ser 0, ou um múltiplo de 1024 e maior que 1 MB. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, ou `g` ou `G` para indicar gigabytes. O valor padrão é selecionado em tempo de execução com base na configuração do sistema.

Os exemplos a seguir mostram como definir o tamanho mínimo de memória alocada para 6 MB usando várias unidades:
```
    -XX:MinHeapSize=6291456
    -XX:MinHeapSize=6144k
    -XX:MinHeapSize=6m
```

Se você definir esta opção como 0, o tamanho mínimo será definido com o mesmo valor do tamanho inicial.

`-XX:NewRatio=`_ratio_
    

Define a proporção entre os tamanhos da young generation e da old generation. Por padrão, esta opção é definida como 2. O exemplo a seguir mostra como definir a proporção young-para-old para 1:

> `-XX:NewRatio=1`

`-XX:NewSize=`_size_
    

Define o tamanho inicial (em bytes) do heap para a young generation (berçário). Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, ou `g` ou `G` para indicar gigabytes.

A região da young generation do heap é usada para novos objetos. O GC é realizado nesta região com mais frequência do que em outras regiões. Se o tamanho da young generation for muito baixo, um grande número de GCs menores será realizado. Se o tamanho for muito alto, apenas GCs completos serão realizados, o que pode levar muito tempo para ser concluído. Recomenda-se que você mantenha o tamanho da young generation maior que 25% e menor que 50% do tamanho total do heap.

Os exemplos a seguir mostram como definir o tamanho inicial da young generation para 256 MB usando várias unidades:
```
    -XX:NewSize=256m
    -XX:NewSize=262144k
    -XX:NewSize=268435456
```

A opção `-XX:NewSize` é equivalente a `-Xmn`.

`-XX:ParallelGCThreads=`_threads_
    

Define o número de threads de trabalho stop-the-world (STW). O valor padrão depende do número de CPUs disponíveis para a JVM e do garbage collector selecionado.

Por exemplo, para definir o número de threads para G1 GC como 2, especifique a seguinte opção:

> `-XX:ParallelGCThreads=2`

`-XX:+ParallelRefProcEnabled`
     Habilita o processamento paralelo de referências. Por padrão, coletores que empregam múltiplas threads realizam processamento paralelo de referências se o número de threads paralelas a serem usadas for maior que um. A opção está disponível apenas quando o throughput ou o garbage collector G1 é usado (`-XX:+UseParallelGC` ou `-XX:+UseG1GC`). Outros coletores que empregam múltiplas threads sempre realizam o processamento de referências em paralelo. 
`-XX:+PrintAdaptiveSizePolicy`
     Habilita a impressão de informações sobre o dimensionamento adaptativo de gerações. Por padrão, esta opção está desabilitada. 
`-XX:SoftRefLRUPolicyMSPerMB=`_time_
    

Define a quantidade de tempo (em milissegundos) que um objeto suavemente alcançável é mantido ativo no heap após a última vez em que foi referenciado. O valor padrão é um segundo de vida útil por megabyte livre no heap. A opção `-XX:SoftRefLRUPolicyMSPerMB` aceita valores inteiros que representam milissegundos por um megabyte do tamanho atual do heap (para Java HotSpot Client VM) ou o tamanho máximo possível do heap (para Java HotSpot Server VM). Essa diferença significa que a Client VM tende a liberar referências suaves em vez de aumentar o heap, enquanto a Server VM tende a aumentar o heap em vez de liberar referências suaves. Neste último caso, o valor da opção `-Xmx` tem um efeito significativo na rapidez com que as referências suaves são coletadas pelo garbage collector.

O exemplo a seguir mostra como definir o valor para 2.5 segundos:

`-XX:SoftRefLRUPolicyMSPerMB=2500`

`-XX:-ShrinkHeapInSteps`
    

Reduz incrementalmente o heap Java para o tamanho alvo, especificado pela opção `-XX:MaxHeapFreeRatio`. Esta opção é habilitada por padrão. Se desabilitada, ela reduz imediatamente o heap Java para o tamanho alvo em vez de exigir múltiplos ciclos de garbage collection. Desabilite esta opção se você deseja minimizar o tamanho do heap Java. Você provavelmente encontrará degradação de desempenho quando esta opção estiver desabilitada.

Consulte Exemplos de Ajuste de Desempenho para uma descrição do uso da opção `MaxHeapFreeRatio` para manter o heap Java pequeno, reduzindo a pegada dinâmica para aplicações embarcadas.

`-XX:StringDeduplicationAgeThreshold=`_threshold_
    

Identifica objetos `String` que atingem a idade especificada e são considerados candidatos para deduplicação. A idade de um objeto é uma medida de quantas vezes ele sobreviveu ao garbage collection. Isso às vezes é referido como tenuring.

> **Nota:** Objetos `String` que são promovidos para uma região de heap antiga antes que esta idade seja atingida são sempre considerados candidatos para deduplicação. O valor padrão para esta opção é `3`. Consulte a opção `-XX:+UseStringDeduplication`.

`-XX:SurvivorRatio=`_ratio_
    

Define a proporção entre o tamanho do espaço eden e o tamanho do espaço survivor. Por padrão, esta opção é definida como 8. O exemplo a seguir mostra como definir a proporção eden/survivor para 4:

> `-XX:SurvivorRatio=4`

`-XX:TargetSurvivorRatio=`_percent_
    

Define a porcentagem desejada do espaço survivor (0 a 100) usada após o young garbage collection. Por padrão, esta opção é definida como 50%.

O exemplo a seguir mostra como definir a proporção alvo do espaço survivor para 30%:

> `-XX:TargetSurvivorRatio=30`

`-XX:TLABSize=`_size_
    

Define o tamanho inicial (em bytes) de um buffer de alocação thread-local (TLAB). Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, ou `g` ou `G` para indicar gigabytes. Se esta opção for definida como 0, a JVM seleciona o tamanho inicial automaticamente.

O exemplo a seguir mostra como definir o tamanho inicial do TLAB para 512 KB:

> `-XX:TLABSize=512k`

`-XX:+UseAdaptiveSizePolicy`
     Habilita o uso do dimensionamento adaptativo de gerações. Esta opção é habilitada por padrão. Para desabilitar o dimensionamento adaptativo de gerações, especifique `-XX:-UseAdaptiveSizePolicy` e defina explicitamente o tamanho do pool de alocação de memória. Consulte a opção `-XX:SurvivorRatio`. 
`-XX:+UseG1GC`
     Habilita o uso do garbage collector garbage-first (G1). É um garbage collector estilo servidor, destinado a máquinas multiprocessadoras com grande quantidade de RAM. Esta opção atende aos objetivos de tempo de pausa do GC com alta probabilidade, mantendo um bom throughput. O coletor G1 é recomendado para aplicações que exigem heaps grandes (tamanhos de cerca de 6 GB ou maiores) com requisitos limitados de latência de GC (um tempo de pausa estável e previsível abaixo de 0.5 segundos). Por padrão, esta opção é habilitada e o G1 é usado como o garbage collector padrão. 
`-XX:+UseGCOverheadLimit`
     Habilita o uso de uma política que limita a proporção de tempo gasto pela JVM em GC antes que uma exceção `OutOfMemoryError` seja lançada. Esta opção é habilitada, por padrão, e o GC paralelo lançará um `OutOfMemoryError` se mais de 98% do tempo total for gasto em garbage collection e menos de 2% do heap for recuperado. Quando o heap é pequeno, este recurso pode ser usado para evitar que as aplicações sejam executadas por longos períodos com pouco ou nenhum progresso. Para desabilitar esta opção, especifique a opção `-XX:-UseGCOverheadLimit`. 
`-XX:+UseNUMA`
     Habilita a otimização de desempenho de uma aplicação em uma máquina com arquitetura de memória não uniforme (NUMA), aumentando o uso de memória de menor latência pela aplicação. O valor padrão para esta opção depende do garbage collector. 
`-XX:+UseParallelGC`
    

Habilita o uso do parallel scavenge garbage collector (também conhecido como throughput collector) para melhorar o desempenho da sua aplicação, aproveitando múltiplos processadores.

Por padrão, esta opção está desabilitada e o coletor padrão é usado.

`-XX:+UseSerialGC`
     Habilita o uso do serial garbage collector. Esta é geralmente a melhor escolha para aplicações pequenas e simples que não exigem nenhuma funcionalidade especial do garbage collection. Por padrão, esta opção está desabilitada e o coletor padrão é usado. 
`-XX:+UseStringDeduplication`
    

Habilita a deduplicação de strings. Por padrão, esta opção está desabilitada. Para usar esta opção, você deve habilitar o garbage collector garbage-first (G1).

A deduplicação de strings reduz a pegada de memória de objetos `String` no heap Java, aproveitando o fato de que muitos objetos `String` são idênticos. Em vez de cada objeto `String` apontar para seu próprio array de caracteres, objetos `String` idênticos podem apontar e compartilhar o mesmo array de caracteres.

`-XX:+UseTLAB`
     Habilita o uso de blocos de alocação thread-local (TLABs) no espaço da young generation. Esta opção é habilitada por padrão. Para desabilitar o uso de TLABs, especifique a opção `-XX:-UseTLAB`. 
`-XX:+UseZGC`
     Habilita o uso do Z garbage collector (ZGC). Este é um garbage collector de baixa latência, fornecendo tempos máximos de pausa de alguns milissegundos, com algum custo de throughput. Os tempos de pausa são independentes do tamanho do heap utilizado. Suporta tamanhos de heap de 8MB a 16TB. 
`-XX:ZAllocationSpikeTolerance=`_factor_
     Define a tolerância a picos de alocação para o ZGC. Por padrão, esta opção é definida como 2.0. Este fator descreve o nível de picos de alocação a serem esperados. Por exemplo, usar um fator de 3.0 significa que a taxa de alocação atual pode triplicar a qualquer momento. 
`-XX:ZCollectionInterval=`_seconds_
     Define o intervalo máximo (em segundos) entre dois ciclos de GC ao usar o ZGC. Por padrão, esta opção é definida como 0 (desabilitada). 
`-XX:ZFragmentationLimit=`_percent_
     Define a fragmentação máxima aceitável do heap (em porcentagem) para o ZGC. Por padrão, esta opção é definida como 25. Usar um valor menor fará com que o heap seja compactado de forma mais agressiva, para recuperar mais memória ao custo de usar mais tempo de CPU. 
`-XX:+ZProactive`
     Habilita ciclos de GC proativos ao usar o ZGC. Por padrão, esta opção é habilitada. O ZGC iniciará um ciclo de GC proativo se isso for esperado para ter um impacto mínimo na aplicação em execução. Isso é útil se a aplicação estiver principalmente ociosa ou alocar muito poucos objetos, mas você ainda deseja manter o tamanho do heap baixo e permitir que o processamento de referências ocorra mesmo quando há muito espaço livre no heap. 
`-XX:+ZUncommit`
     Habilita a descommitagem de memória de heap não utilizada ao usar o ZGC. Por padrão, esta opção é habilitada. A descommitagem de memória de heap não utilizada reduzirá a pegada de memória da JVM e tornará essa memória disponível para outros processos usarem. 
`-XX:ZUncommitDelay=`_seconds_
     Define a quantidade de tempo (em segundos) que a memória do heap deve ter permanecido sem uso antes de ser descommitada. Por padrão, esta opção é definida como 300 (5 minutos). Commitar e descommitar memória são operações relativamente caras. Usar um valor menor fará com que a memória do heap seja descommitada mais cedo, com o risco de ter que commitá-la novamente em breve. 
## Opções Java Descontinuadas

Estas opções `java` estão descontinuadas e podem ser removidas em uma futura versão do JDK. Elas ainda são aceitas e executadas, mas um aviso é emitido quando são usadas.

`-Xloggc:`_filename_
    

Define o arquivo para o qual as informações de eventos verbose GC devem ser redirecionadas para registro. A opção `-Xloggc` sobrescreve `-verbose:gc` se ambas forem fornecidas com o mesmo comando java. `-Xloggc:`_filename_ é substituído por `-Xlog:gc:`_filename_. Consulte Habilitar Log com o Framework de Log Unificado da JVM.

Exemplo:

`-Xlog:gc:garbage-collection.log`

`-XX:+FlightRecorder`
     Habilita o uso do Java Flight Recorder (JFR) durante a execução da aplicação. Desde o JDK 8u40, esta opção não é mais necessária para usar o JFR.

## Opções Java Obsoletas

Estas opções `java` ainda são aceitas, mas ignoradas, e um aviso é emitido quando são usadas.

`--illegal-access=`_parameter_
     Controlava o _relaxed strong encapsulation_, conforme definido na [JEP 261](<https://openjdk.org/jeps/261#Relaxed-strong-encapsulation>). Esta opção foi descontinuada no JDK 16 pela [JEP 396](<https://openjdk.org/jeps/396>) e tornou-se obsoleta no JDK 17 pela [JEP 403](<https://openjdk.org/jeps/403>).

## Opções Java Removidas

Estas opções `java` foram removidas no JDK 25 e usá-las resulta em um erro de:

> `Unrecognized VM option` _option-name_

`-XX:RTMAbortRatio=`_abort_ratio_
     Especifica a taxa de aborto RTM como uma porcentagem (%) de todas as transações RTM executadas. Se o número de transações abortadas se tornar maior que essa taxa, o código compilado é desotimizado. Essa taxa é usada quando a opção `-XX:+UseRTMDeopt` está habilitada. O valor padrão desta opção é 50. Isso significa que o código compilado é desotimizado se 50% de todas as transações forem abortadas.
`-XX:RTMRetryCount=`_number_of_retries_
     Especifica o número de vezes que o código de bloqueio RTM é retentado, quando é abortado ou ocupado, antes de retornar ao mecanismo de bloqueio normal. O valor padrão para esta opção é 5. A opção `-XX:UseRTMLocking` deve estar habilitada.
`-XX:+UseRTMDeopt`
     Ajusta automaticamente o bloqueio RTM dependendo da taxa de aborto. Essa taxa é especificada pela opção `-XX:RTMAbortRatio`. Se o número de transações abortadas exceder a taxa de aborto, o método que contém o bloqueio é desotimizado e recompilado com todos os bloqueios como bloqueios normais. Esta opção está desabilitada por padrão. A opção `-XX:+UseRTMLocking` deve estar habilitada.
`-XX:+UseRTMLocking`
    

Gera código de bloqueio de Restricted Transactional Memory (RTM) para todos os bloqueios inflados, com o mecanismo de bloqueio normal como manipulador de fallback. Esta opção está desabilitada por padrão. As opções relacionadas ao RTM estão disponíveis apenas em CPUs x86 que suportam Transactional Synchronization Extensions (TSX).

RTM faz parte do TSX da Intel, que é uma extensão do conjunto de instruções x86 e facilita a criação de aplicações multithreaded. RTM introduz as novas instruções `XBEGIN`, `XABORT`, `XEND` e `XTEST`. As instruções `XBEGIN` e `XEND` delimitam um conjunto de instruções para serem executadas como uma transação. Se nenhum conflito for encontrado durante a execução da transação, as modificações de memória e registradores são confirmadas juntas na instrução `XEND`. A instrução `XABORT` pode ser usada para abortar explicitamente uma transação e a instrução `XTEST` verifica se um conjunto de instruções está sendo executado em uma transação.

Um bloqueio em uma transação é inflado quando outra thread tenta acessar a mesma transação, bloqueando assim a thread que não solicitou originalmente acesso à transação. O RTM exige que um conjunto de operações de fallback seja especificado caso uma transação aborte ou falhe. Um bloqueio RTM é um bloqueio que foi delegado ao sistema TSX.

O RTM melhora o desempenho para bloqueios altamente disputados com baixo conflito em uma região crítica (que é um código que não deve ser acessado por mais de uma thread concorrentemente). O RTM também melhora o desempenho do bloqueio de granularidade grossa (coarse-grain locking), que tipicamente não tem um bom desempenho em aplicações multithreaded. (O bloqueio de granularidade grossa é a estratégia de manter bloqueios por longos períodos para minimizar a sobrecarga de adquirir e liberar bloqueios, enquanto o bloqueio de granularidade fina é a estratégia de tentar alcançar o paralelismo máximo bloqueando apenas quando necessário e desbloqueando o mais rápido possível.) Além disso, para bloqueios pouco disputados que são usados por diferentes threads, o RTM pode reduzir o compartilhamento falso de linha de cache, também conhecido como cache line ping-pong. Isso ocorre quando múltiplas threads de diferentes processadores estão acessando recursos diferentes, mas os recursos compartilham a mesma linha de cache. Como resultado, os processadores invalidam repetidamente as linhas de cache de outros processadores, o que os força a ler da memória principal em vez de seu cache.

Para as listas e descrições das opções removidas em versões anteriores, consulte a seção _Removed Java Options_ em:

  * [O Comando `java`, Release 24](<https://docs.oracle.com/en/java/javase/24/docs/specs/man/java.html>)

  * [O Comando `java`, Release 23](<https://docs.oracle.com/en/java/javase/23/docs/specs/man/java.html>)

  * [O Comando `java`, Release 22](<https://docs.oracle.com/en/java/javase/22/docs/specs/man/java.html>)

  * [O Comando `java`, Release 21](<https://docs.oracle.com/en/java/javase/21/docs/specs/man/java.html>)

  * [O Comando `java`, Release 20](<https://docs.oracle.com/en/java/javase/20/docs/specs/man/java.html>)

  * [O Comando `java`, Release 19](<https://docs.oracle.com/en/java/javase/19/docs/specs/man/java.html>)

  * [O Comando `java`, Release 18](<https://docs.oracle.com/en/java/javase/18/docs/specs/man/java.html>)

  * [O Comando `java`, Release 17](<https://docs.oracle.com/en/java/javase/17/docs/specs/man/java.html>)

  * [O Comando `java`, Release 16](<https://docs.oracle.com/en/java/javase/16/docs/specs/man/java.html>)

  * [O Comando `java`, Release 15](<https://docs.oracle.com/en/java/javase/15/docs/specs/man/java.html>)

  * [O Comando `java`, Release 14](<https://docs.oracle.com/en/java/javase/14/docs/specs/man/java.html>)

  * [O Comando `java`, Release 13](<https://docs.oracle.com/en/java/javase/13/docs/specs/man/java.html>)

  * [Referência de Ferramentas Java Platform, Standard Edition, Release 12](<https://docs.oracle.com/en/java/javase/12/tools/java.html#GUID-3B1CE181-CD30-4178-9602-230B800D4FAE>)

  * [Referência de Ferramentas Java Platform, Standard Edition, Release 11](<https://docs.oracle.com/en/java/javase/11/tools/java.html#GUID-741FC470-AA3E-494A-8D2B-1B1FE4A990D1>)

  * [Referência de Ferramentas Java Platform, Standard Edition, Release 10](<https://docs.oracle.com/javase/10/tools/java.htm#JSWOR624>)

  * [Referência de Ferramentas Java Platform, Standard Edition, Release 9](<https://docs.oracle.com/javase/9/tools/java.htm#JSWOR624>)

  * [Referência de Ferramentas Java Platform, Standard Edition, Release 8 para Oracle JDK no Windows](<https://docs.oracle.com/javase/8/docs/technotes/tools/windows/java.html#BGBCIEFC>)

  * [Referência de Ferramentas Java Platform, Standard Edition, Release 8 para Oracle JDK no Solaris, Linux e macOS](<https://docs.oracle.com/javase/8/docs/technotes/tools/unix/java.html#BGBCIEFC>)

## Arquivos de Argumentos de Linha de Comando `java`

Você pode encurtar ou simplificar o comando `java` usando arquivos de argumento `@` para especificar um ou mais arquivos de texto que contêm argumentos, como opções e nomes de classes, que são passados para o comando `java`. Isso permite criar comandos `java` de qualquer comprimento em qualquer sistema operacional.

Na linha de comando, use o prefixo arroba (`@`) para identificar um arquivo de argumento que contém opções `java` e nomes de classes. Quando o comando `java` encontra um arquivo começando com o arroba (`@`), ele expande o conteúdo desse arquivo em uma lista de argumentos, assim como seriam especificados na linha de comando.

O launcher `java` expande o conteúdo do arquivo de argumento até encontrar a opção `--disable-@files`. Você pode usar a opção `--disable-@files` em qualquer lugar na linha de comando, incluindo em um arquivo de argumento, para interromper a expansão de arquivos de argumento `@`.

Os itens a seguir descrevem a sintaxe dos arquivos de argumento `java`:

  * O arquivo de argumento deve conter apenas caracteres ASCII ou caracteres na codificação padrão do sistema que seja compatível com ASCII, como UTF-8.

  * O tamanho do arquivo de argumento não deve exceder MAXINT (2.147.483.647) bytes.

  * O launcher não expande curingas presentes em um arquivo de argumento. Isso significa que um asterisco (`*`) é passado como está para a JVM inicial. Por exemplo, `*.java` permanece `*.java` e não é expandido para `Foo.java Bar.java ...`, como aconteceria com alguns shells de linha de comando.

  * Use espaços em branco ou caracteres de nova linha para separar os argumentos incluídos no arquivo.

  * Espaço em branco inclui um caractere de espaço em branco, `\t`, `\n`, `\r` e `\f`.

Por exemplo, é possível ter um caminho com um espaço, como `c:\Program Files`, que pode ser especificado como `"c:\\Program Files"` ou, para evitar um escape, `c:\Program" "Files`.

  * Qualquer opção que contenha espaços, como um componente de caminho, deve estar entre aspas usando caracteres de aspas ('"') em sua totalidade.

  * Uma string entre aspas pode conter os caracteres `\n`, `\r`, `\t` e `\f`. Eles são convertidos para seus respectivos códigos ASCII.

  * Se um nome de arquivo contiver espaços incorporados, coloque o nome do arquivo inteiro entre aspas duplas.

  * Os nomes de arquivos em um arquivo de argumento são relativos ao diretório atual, não ao local do arquivo de argumento.

  * Use o sinal de cerquilha `#` no arquivo de argumento para identificar comentários. Todos os caracteres após o `#` são ignorados até o final da linha.

  * Prefixos de arroba (`@`) adicionais para opções prefixadas com `@` atuam como um escape (o primeiro `@` é removido e o restante dos argumentos é apresentado ao launcher literalmente).

  * As linhas podem ser continuadas usando o caractere de continuação (`\`) no final da linha. As duas linhas são concatenadas com os espaços em branco iniciais removidos. Para evitar o corte dos espaços em branco iniciais, um caractere de continuação (`\`) pode ser colocado na primeira coluna.

  * Como a barra invertida (\\) é um caractere de escape, um caractere de barra invertida deve ser escapado com outro caractere de barra invertida.

  * Aspas parciais são permitidas e são fechadas por um fim de arquivo.

  * Uma aspa aberta para no final da linha, a menos que `\` seja o último caractere, o que então une a próxima linha removendo todos os caracteres de espaço em branco iniciais.

  * O uso do arroba (`@`) para interpretar arquivos recursivamente não é suportado.

### Exemplo de Aspas Abertas ou Parciais em um Arquivo de Argumento

No arquivo de argumento,
```
    -cp "lib/
    cool/
    app/
    jars
```

isso é interpretado como:

> `-cp lib/cool/app/jars`

### Exemplo de um Caractere de Barra Invertida Escapado com Outro Caractere de Barra Invertida em um Arquivo de Argumento

Para gerar a seguinte saída:

> `-cp c:\Program Files (x86)\Java\jre\lib\ext;c:\Program Files\Java\jre9\lib\ext`

O caractere de barra invertida deve ser especificado no arquivo de argumento como:

> `-cp "c:\\Program Files (x86)\\Java\\jre\\lib\\ext;c:\\Program Files\\Java\\jre9\\lib\\ext"`

### Exemplo de um Escape de Fim de Linha Usado para Forçar a Concatenação de Linhas em um Arquivo de Argumento

No arquivo de argumento,
```
    -cp "/lib/cool app/jars:\
        /lib/another app/jars"
```

Isso é interpretado como:

> `-cp /lib/cool app/jars:/lib/another app/jars`

### Exemplo de Continuação de Linha com Espaços Iniciais em um Arquivo de Argumento

No arquivo de argumento,
```
    -cp "/lib/cool\
    \app/jars"
```

Isso é interpretado como:

`-cp /lib/cool app/jars`

### Exemplos de Uso de um Único Arquivo de Argumento

Você pode usar um único arquivo de argumento, como `myargumentfile` no exemplo a seguir, para conter todos os argumentos `java` necessários:

> `java @myargumentfile`

### Exemplos de Uso de Arquivos de Argumentos com Caminhos

Você pode incluir caminhos relativos em arquivos de argumento; no entanto, eles são relativos ao diretório de trabalho atual e não aos caminhos dos próprios arquivos de argumento. No exemplo a seguir, `path1/options` e `path2/options` representam arquivos de argumento com caminhos diferentes. Quaisquer caminhos relativos que eles contenham são relativos ao diretório de trabalho atual e não aos arquivos de argumento:

> `java @path1/options @path2/classes`

## Análise do Estado do Code Heap

### Visão Geral

Há ocasiões em que ter uma visão sobre o estado atual do code heap da JVM seria útil para responder a perguntas como:

  * Por que o JIT foi desativado e depois ativado repetidamente?

  * Para onde foi todo o espaço do code heap?

  * Por que o method sweeper não está funcionando de forma eficaz?




Para fornecer essa visão, um recurso de análise do estado do code heap foi implementado, que permite a análise em tempo real do code heap. O processo de análise é dividido em duas partes. A primeira parte examina todo o code heap e agrega todas as informações que se acredita serem úteis ou importantes. A segunda parte consiste em várias etapas independentes que imprimem as informações coletadas com ênfase em diferentes aspectos dos dados. A coleta e a impressão de dados são feitas "sob demanda".

### Sintaxe

Solicitações para análise em tempo real, on-the-fly, podem ser emitidas com o seguinte comando:

> `jcmd` _pid_ `Compiler.CodeHeap_Analytics` [_function_] [_granularity_]

Se você estiver interessado apenas em como o code heap se parece após executar uma carga de trabalho de exemplo, você pode usar a opção de linha de comando:

> `-Xlog:codecache=Trace`

Para ver o estado do code heap quando uma condição de "CodeCache full" existe, inicie a VM com a opção de linha de comando:

> `-Xlog:codecache=Debug`

Consulte [CodeHeap State Analytics (OpenJDK)](<https://bugs.openjdk.org/secure/attachment/75649/JVM_CodeHeap_StateAnalytics_V2.pdf>) para uma descrição detalhada do recurso de análise do estado do code heap, as funções suportadas e as opções de granularidade.

## Habilitar Log com o Framework de Log Unificado da JVM

Você usa a opção `-Xlog` para configurar ou habilitar o log com o framework de log unificado da Java Virtual Machine (JVM).

### Sinopse

> `-Xlog`[`:`[_what_][`:`[_output_][`:`[_decorators_][`:`_output-options_[`,`...]]]]]
>
> `-Xlog:`_directive_

_what_
     Especifica uma combinação de tags e níveis no formato _tag1_[`+`_tag2_...][`*`][`=`_level_][`,`...]. A menos que o curinga (`*`) seja especificado, apenas as mensagens de log marcadas exatamente com as tags especificadas são correspondidas. Consulte -Xlog Tags e Níveis.
_output_
     Define o tipo de saída. Omitir o tipo _output_ assume `stdout` como padrão. Consulte -Xlog Saída.
_decorators_
     Configura a saída para usar um conjunto personalizado de decoradores. Omitir _decorators_ assume `uptime`, `level` e `tags` como padrão. Consulte Decorações.
_output-options_
     Define as opções de saída de log `-Xlog`.
_directive_
     Uma opção global ou subcomando: help, disable, async

### Descrição

O framework de log unificado da Java Virtual Machine (JVM) fornece um sistema de log comum para todos os componentes da JVM. O log de GC para a JVM foi alterado para usar o novo framework de log. O mapeamento das antigas flags de GC para a nova configuração Xlog correspondente é descrito em Converter Flags de Log de GC para Xlog. Além disso, o log de tempo de execução também foi alterado para usar o framework de log unificado da JVM. O mapeamento das flags de log de tempo de execução legadas para a nova configuração Xlog correspondente é descrito em Converter Flags de Log de Tempo de Execução para Xlog.

O seguinte fornece uma referência rápida ao comando `-Xlog` e à sintaxe para as opções:

`-Xlog`
     Habilita o log da JVM no nível `info`.
`-Xlog:help`
     Imprime a sintaxe de uso de `-Xlog` e as tags, níveis e decoradores disponíveis, juntamente com exemplos de linhas de comando com explicações.
`-Xlog:disable`
     Desativa todo o log e limpa toda a configuração do framework de log, incluindo a configuração padrão para warnings e errors.
`-Xlog`[`:`_option_]
    

Aplica múltiplos argumentos na ordem em que aparecem na linha de comando. Múltiplos argumentos `-Xlog` para a mesma saída se sobrescrevem na ordem dada.

A _option_ é definida como:

> [_tag-selection_][`:`[_output_][`:`[_decorators_][`:`_output-options_]]]

Omitir a _tag-selection_ assume um conjunto de tags `all` e um nível `info` como padrão.

> _tag_[`+`...] `all`

A tag `all` é uma meta tag que consiste em todos os conjuntos de tags disponíveis. O asterisco `*` em uma definição de conjunto de tags denota uma correspondência de tag curinga. A correspondência com um curinga seleciona todos os conjuntos de tags que contêm _pelo menos_ as tags especificadas. Sem o curinga, apenas correspondências exatas dos conjuntos de tags especificados são selecionadas.

_output-options_ é

> `filecount=`_file-count_ `filesize=`_file size with optional K, M or G suffix_ `foldmultilines=`_< true|false>_

Quando `foldmultilines` é true, um evento de log que consiste em múltiplas linhas será dobrado em uma única linha, substituindo os caracteres de nova linha pela sequência `'\'` e `'n'` na saída. Caracteres de barra invertida únicos existentes também serão substituídos por uma sequência de duas barras invertidas para que a conversão possa ser revertida. Esta opção é segura para usar com codificações de caracteres UTF-8, mas outras codificações podem não funcionar. Por exemplo, pode converter incorretamente sequências multi-byte em Shift JIS e BIG5.

### Configuração Padrão

Quando a opção `-Xlog` e nada mais é especificado na linha de comando, a configuração padrão é usada. A configuração padrão registra todas as mensagens com um nível que corresponde a `warning` ou `error`, independentemente das tags associadas à mensagem. A configuração padrão é equivalente a inserir o seguinte na linha de comando:

> `-Xlog:all=warning:stdout:uptime,level,tags`

### Controlando o Log em Tempo de Execução

O log também pode ser controlado em tempo de execução através de Diagnostic Commands (com o utilitário [jcmd](<#/doc/guides/tools/jcmd>)). Tudo o que pode ser especificado na linha de comando também pode ser especificado dinamicamente com o comando `VM.log`. Como os comandos de diagnóstico são automaticamente expostos como MBeans, você pode usar JMX para alterar a configuração de log em tempo de execução.

### -Xlog Tags e Níveis

Cada mensagem de log tem um nível e um conjunto de tags associados a ela. O nível da mensagem corresponde aos seus detalhes, e o conjunto de tags corresponde ao que a mensagem contém ou qual componente da JVM ela envolve (como `gc`, `jit` ou `os`). O mapeamento das flags de GC para a configuração Xlog é descrito em Converter Flags de Log de GC para Xlog. O mapeamento das flags de log de tempo de execução legadas para a configuração Xlog correspondente é descrito em Converter Flags de Log de Tempo de Execução para Xlog.

**Níveis de log disponíveis:**

  * `off`
  * `trace`
  * `debug`
  * `info`
  * `warning`
  * `error`



**Tags de log disponíveis:**

Existem literalmente dezenas de tags de log, que, nas combinações certas, permitirão uma variedade de saídas de log. O conjunto completo de tags de log disponíveis pode ser visto usando `-Xlog:help`. Especificar `all` em vez de uma combinação de tags corresponde a todas as combinações de tags.

### -Xlog Saída

A opção `-Xlog` suporta os seguintes tipos de saída:

  * `stdout` \--- Envia a saída para stdout
  * `stderr` \--- Envia a saída para stderr
  * `file=`_filename_ \--- Envia a saída para arquivo(s) de texto.



Ao usar `file=`_filename_, especificar `%p`, `%t` e/ou `%hn` no nome do arquivo expande para o PID da JVM, o timestamp de inicialização e o nome do host, respectivamente. Você também pode configurar arquivos de texto para lidar com a rotação de arquivos com base no tamanho do arquivo e no número de arquivos a serem rotacionados. Por exemplo, para rotacionar o arquivo de log a cada 10 MB e manter 5 arquivos em rotação, especifique as opções `filesize=10M, filecount=5`. O tamanho alvo dos arquivos não é garantido como exato, é apenas um valor aproximado. Os arquivos são rotacionados por padrão com até 5 arquivos rotacionados de tamanho alvo de 20 MB, a menos que configurado de outra forma. Especificar `filecount=0` significa que o arquivo de log não deve ser rotacionado. Existe a possibilidade de o arquivo de log pré-existente ser sobrescrito.

### -Xlog Modo de Saída

Por padrão, as mensagens de log são emitidas de forma síncrona - cada mensagem de log é gravada na saída designada quando a chamada de log é feita. Você pode, em vez disso, usar o modo de log assíncrono especificando:

`-Xlog:async[:[stall|drop]]`
     Grava todo o log de forma assíncrona.

No modo de log assíncrono, os locais de log enfileiram todas as mensagens de log em um buffer intermediário e uma thread autônoma é responsável por descarregá-las para as saídas correspondentes. O buffer intermediário é limitado. No esgotamento do buffer, a mensagem enfileirada é descartada (`async:drop`), ou as threads de log são paralisadas até que a thread de descarregamento as alcance (`async:stall`). Se nenhum modo específico for escolhido, `async:drop` é escolhido por padrão. As operações de gravação de entrada de log são garantidas como não bloqueadoras no caso `async:drop`.

A opção `-XX:AsyncLogBufferSize=N` especifica o orçamento de memória em bytes para o buffer intermediário. O valor padrão deve ser grande o suficiente para a maioria dos casos. Os usuários podem fornecer um valor personalizado para trocar a sobrecarga de memória pela precisão do log, se necessário.

### Decorações

As mensagens de log são decoradas com informações sobre a mensagem. Você pode configurar cada saída para usar um conjunto personalizado de decoradores. A ordem da saída é sempre a mesma listada na tabela. Você pode configurar as decorações a serem usadas em tempo de execução. As decorações são precedidas à mensagem de log. Por exemplo:
```
    [6.567s][info][gc,old] Old collection complete
```

Omitir `decorators` assume `uptime`, `level` e `tags` como padrão. O decorador `none` é especial e é usado para desativar todas as decorações.

Os decoradores `time` (`t`), `utctime` (`utc`), `uptime` (`u`), `timemillis` (`tm`), `uptimemillis` (`um`), `timenanos` (`tn`), `uptimenanos` (`un`), `hostname` (`hn`), `pid` (`p`), `tid` (`ti`), `level` (`l`), `tags` (`tg`) também podem ser especificados como `none` para nenhuma decoração.

Decorações de Mensagens de Log Decorações | Descrição
---|---
`time` ou `t` | Hora e data atuais no formato ISO-8601.
`utctime` ou `utc` | Universal Time Coordinated ou Tempo Universal Coordenado.
`uptime` ou `u` | Tempo desde o início da JVM em segundos e milissegundos. Por exemplo, 6.567s.
`timemillis` ou `tm` | O mesmo valor gerado por `System.currentTimeMillis()`
`uptimemillis` ou `um` | Milissegundos desde o início da JVM.
`timenanos` ou `tn` | O mesmo valor gerado por `System.nanoTime()`.
`uptimenanos` ou `un` | Nanossegundos desde o início da JVM.
`hostname` ou `hn` | O nome do host.
`pid` ou `p` | O identificador do processo.
`tid` ou `ti` | O identificador da thread.
`level` ou `l` | O nível associado à mensagem de log.
`tags` ou `tg` | O conjunto de tags associado à mensagem de log.

### Converter Flags de Log de GC para Xlog

Mapeamento de Flags de Log de GC Legadas para Configuração Xlog Flag de Garbage Collection (GC) Legada | Configuração Xlog | Comentário
---|---|---
`G1PrintHeapRegions` | `-Xlog:gc+region=trace` | Não Aplicável
`GCLogFileSize` | Nenhuma configuração disponível | A rotação de log é tratada pelo framework.
`NumberOfGCLogFiles` | Não Aplicável | A rotação de log é tratada pelo framework.
`PrintAdaptiveSizePolicy` | `-Xlog:gc+ergo*=`_level_ | Use um _level_ de `debug` para a maioria das informações, ou um _level_ de `trace` para tudo o que foi registrado para `PrintAdaptiveSizePolicy`.
`PrintGC` | `-Xlog:gc` | Não Aplicável
`PrintGCApplicationConcurrentTime` | `-Xlog:safepoint` | Observe que `PrintGCApplicationConcurrentTime` e `PrintGCApplicationStoppedTime` são registrados na mesma tag e não são separados no novo log.
`PrintGCApplicationStoppedTime` | `-Xlog:safepoint` | Observe que `PrintGCApplicationConcurrentTime` e `PrintGCApplicationStoppedTime` são registrados na mesma tag e não são separados no novo log.
`PrintGCCause` | Não Aplicável | A causa do GC agora é sempre registrada.
`PrintGCDateStamps` | Não Aplicável | Os carimbos de data são registrados pelo framework.
`PrintGCDetails` | `-Xlog:gc*` | Não Aplicável
`PrintGCID` | Não Aplicável | O ID do GC agora é sempre registrado.
`PrintGCTaskTimeStamps` | `-Xlog:gc+task*=debug` | Não Aplicável
`PrintGCTimeStamps` | Não Aplicável | Os carimbos de tempo são registrados pelo framework.
`PrintHeapAtGC` | `-Xlog:gc+heap=trace` | Não Aplicável
`PrintReferenceGC` | `-Xlog:gc+ref*=debug` | Observe que no log antigo, `PrintReferenceGC` só tinha efeito se `PrintGCDetails` também estivesse habilitado.
`PrintStringDeduplicationStatistics` | `-Xlog:gc+stringdedup*=debug | ` Não Aplicável
`PrintTenuringDistribution` | `-Xlog:gc+age*=`_level_ | Use um _level_ de `debug` para as informações mais relevantes, ou um _level_ de `trace` para tudo o que foi registrado para `PrintTenuringDistribution`.
`UseGCLogFileRotation` | Não Aplicável | O que foi registrado para `PrintTenuringDistribution`.

### Converter Flags de Log de Tempo de Execução para Xlog

Estas flags legadas não são mais reconhecidas e causarão um erro se usadas diretamente. Use seu equivalente de log unificado em vez disso.

Mapeamento de Flags de Log de Tempo de Execução Legadas para Configuração Xlog Flag de Tempo de Execução Legada | Configuração Xlog | Comentário
---|---|---
`TraceExceptions` | `-Xlog:exceptions=info` | Não Aplicável
`TraceClassLoading` | `-Xlog:class+load=`_level_ | Use _level_ =`info` para informações regulares, ou _level_ =`debug` para informações adicionais. Na sintaxe de Log Unificado, `-verbose:class` equivale a `-Xlog:class+load=info,class+unload=info`.
`TraceClassLoadingPreorder` | `-Xlog:class+preorder=debug` | Não Aplicável
`TraceClassUnloading` | `-Xlog:class+unload=`_level_ | Use _level_ =`info` para informações regulares, ou _level_ =`trace` para informações adicionais. Na sintaxe de Log Unificado, `-verbose:class` equivale a `-Xlog:class+load=info,class+unload=info`.
`VerboseVerification` | `-Xlog:verification=info` | Não Aplicável
`TraceClassPaths` | `-Xlog:class+path=info` | Não Aplicável
`TraceClassResolution` | `-Xlog:class+resolve=debug` | Não Aplicável
`TraceClassInitialization` | `-Xlog:class+init=info` | Não Aplicável
`TraceLoaderConstraints` | `-Xlog:class+loader+constraints=info` | Não Aplicável
`TraceClassLoaderData` | `-Xlog:class+loader+data=`_level_ | Use _level_ =`debug` para informações regulares ou _level_ =`trace` para informações adicionais.
`TraceSafepointCleanupTime` | `-Xlog:safepoint+cleanup=info` | Não Aplicável
`TraceSafepoint` | `-Xlog:safepoint=debug` | Não Aplicável
`TraceMonitorInflation` | `-Xlog:monitorinflation=debug` | Não Aplicável
`TraceRedefineClasses` | `-Xlog:redefine+class*=`_level_ | _level_ =`info`, `debug` e `trace` fornecem quantidades crescentes de informações.

### Exemplos de Uso de -Xlog

A seguir estão exemplos de `-Xlog`.

`-Xlog`
    

Registra todas as mensagens usando o nível `info` para `stdout` com as decorações `uptime`, `levels` e `tags`. Isso é equivalente a usar:

> `-Xlog:all=info:stdout:uptime,levels,tags`

`-Xlog:gc`
     Registra mensagens marcadas com a tag `gc` usando o nível `info` para `stdout`. A configuração padrão para todas as outras mensagens no nível `warning` está em vigor.
`-Xlog:gc,safepoint`
     Registra mensagens marcadas com as tags `gc` ou `safepoint`, ambas usando o nível `info`, para `stdout`, com decorações padrão. Mensagens marcadas com `gc` e `safepoint` não serão registradas.
`-Xlog:gc+ref=debug`
     Registra mensagens marcadas com as tags `gc` e `ref`, usando o nível `debug` para `stdout`, com decorações padrão. Mensagens marcadas apenas com uma das duas tags não serão registradas.
`-Xlog:gc=debug:file=gc.txt:none`
     Registra mensagens marcadas com a tag `gc` usando o nível `debug` para um arquivo chamado `gc.txt` sem decorações. A configuração padrão para todas as outras mensagens no nível `warning` ainda está em vigor.
`-Xlog:gc=trace:file=gctrace.txt:uptimemillis,pid:filecount=5,filesize=1024`
    

Registra mensagens marcadas com a tag `gc` usando o nível `trace` para um conjunto de arquivos rotativos com 5 arquivos de tamanho 1 MB com o nome base `gctrace.txt` e usa as decorações `uptimemillis` e `pid`.

A configuração padrão para todas as outras mensagens no nível `warning` ainda está em vigor.

`-Xlog:gc::uptime,tid`
     Registra mensagens marcadas com a tag `gc` usando o nível padrão 'info' para a saída padrão `stdout` e usa as decorações `uptime` e `tid`. A configuração padrão para todas as outras mensagens no nível `warning` ainda está em vigor.
`-Xlog:gc*=info,safepoint*=off`
     Registra mensagens marcadas com pelo menos `gc` usando o nível `info`, mas desativa o log de mensagens marcadas com `safepoint`. Mensagens marcadas com `gc` e `safepoint` não serão registradas.
`-Xlog:disable -Xlog:safepoint=trace:safepointtrace.txt`
     Desativa todo o log, incluindo warnings e errors, e então habilita mensagens marcadas com `safepoint` usando o nível `trace` para o arquivo `safepointtrace.txt`. A configuração padrão não se aplica, porque a linha de comando começou com `-Xlog:disable`.

### Exemplos de Uso Complexo de -Xlog

O seguinte descreve alguns exemplos complexos de uso da opção `-Xlog`.

`-Xlog:gc+class*=debug`
     Registra mensagens marcadas com pelo menos as tags `gc` e `class` usando o nível `debug` para `stdout`. A configuração padrão para todas as outras mensagens no nível `warning` ainda está em vigor.
`-Xlog:gc+meta*=trace,class*=off:file=gcmetatrace.txt`
     Registra mensagens marcadas com pelo menos as tags `gc` e `meta` usando o nível `trace` para o arquivo `metatrace.txt`, mas desativa todas as mensagens marcadas com `class`. Mensagens marcadas com `gc`, `meta` e `class` não serão registradas, pois `class*` está definido como off. A configuração padrão para todas as outras mensagens no nível `warning` está em vigor, exceto para aquelas que incluem `class`.
`-Xlog:gc+meta=trace`
     Registra mensagens marcadas exatamente com as tags `gc` e `meta` usando o nível `trace` para `stdout`. A configuração padrão para todas as outras mensagens no nível `warning` ainda estará em vigor.
`-Xlog:gc+class+heap*=debug,meta*=warning,threads*=off`
     Registra mensagens marcadas com pelo menos as tags `gc`, `class` e `heap` usando o nível `trace` para `stdout`, mas registra apenas mensagens marcadas com `meta` com nível. A configuração padrão para todas as outras mensagens no nível `warning` está em vigor, exceto para aquelas que incluem `threads`.
## Validar Argumentos de Flags da Java Virtual Machine

Os valores fornecidos a todas as flags de linha de comando da Java Virtual Machine (JVM) são usados para validação e, se o valor de entrada for inválido ou fora do intervalo, uma mensagem de erro apropriada é exibida.

Sejam definidos ergonomicamente, em uma linha de comando, por uma ferramenta de entrada ou através das APIs (por exemplo, classes contidas no pacote `java.lang.management`), os valores fornecidos a todas as flags de linha de comando da Java Virtual Machine (JVM) são validados. A ergonomia é descrita no Guia de Ajuste de Coleta de Lixo da Java Platform, Standard Edition HotSpot Virtual Machine.

O intervalo e as restrições são validados quando todas as flags têm seus valores definidos durante a inicialização da JVM ou quando o valor de uma flag é alterado durante o tempo de execução (por exemplo, usando a ferramenta `jcmd`). A JVM é encerrada se um valor violar a verificação de intervalo ou restrição e uma mensagem de erro apropriada é impressa no stream de erro.

Por exemplo, se uma flag violar uma verificação de intervalo ou restrição, a JVM é encerrada com um erro:
```
    java -XX:AllocatePrefetchStyle=5 -version
    intx AllocatePrefetchStyle=5 is outside the allowed range [ 0 ... 3 ]
    Improperly specified VM option 'AllocatePrefetchStyle=5'
    Error: Could not create the Java Virtual Machine.
    Error: A fatal exception has occurred. Program will exit.
```

A flag `-XX:+PrintFlagsRanges` imprime o intervalo de todas as flags. Esta flag permite o teste automático das flags pelos valores fornecidos pelos intervalos. Para as flags que têm os intervalos especificados, o tipo, nome e o intervalo real são impressos na saída.

Por exemplo,
```
    intx   ThreadStackSize [ 0 ... 9007199254740987 ] {pd product}
```

Para as flags que não têm o intervalo especificado, os valores não são exibidos na impressão. Por exemplo:
```
    size_t NewSize         [   ...                  ] {product}
```

Isso ajuda a identificar as flags que precisam ser implementadas. O framework de teste automático pode pular as flags que não possuem valores e não estão implementadas.

## Large Pages

Você usa large pages, também conhecidas como huge pages, como páginas de memória que são significativamente maiores do que o tamanho padrão da página de memória (que varia dependendo do processador e do sistema operacional). Large pages otimizam os Translation-Lookaside Buffers do processador.

Um Translation-Lookaside Buffer (TLB) é um cache de tradução de páginas que armazena as traduções de endereços virtuais para físicos usadas mais recentemente. Um TLB é um recurso escasso do sistema. Uma falha de TLB pode ser custosa porque o processador deve então ler da tabela de páginas hierárquica, o que pode exigir múltiplos acessos à memória. Ao usar um tamanho de página de memória maior, uma única entrada de TLB pode representar um intervalo de memória maior. Isso resulta em menos pressão sobre um TLB, e aplicações intensivas em memória podem ter um desempenho melhor.

No entanto, o uso de large pages pode afetar negativamente o desempenho do sistema. Por exemplo, quando uma grande quantidade de memória é fixada por uma aplicação, isso pode criar uma escassez de memória regular e causar paginação excessiva em outras aplicações, desacelerando todo o sistema. Além disso, um sistema que está ativo por muito tempo pode produzir fragmentação excessiva, o que pode impossibilitar a reserva de memória de large pages suficiente. Quando isso acontece, o OS ou a JVM revertem para o uso de páginas regulares.

Linux e Windows suportam large pages.

### Suporte a Large Pages para Linux

O Linux suporta large pages desde a versão 2.6. Para verificar se seu ambiente suporta large pages, tente o seguinte:
```
    # cat /proc/meminfo | grep Huge
    HugePages_Total: 0
    HugePages_Free: 0
    ...
    Hugepagesize: 2048 kB
```

Se a saída contiver itens prefixados com "Huge", então seu sistema suporta large pages. Os valores podem variar dependendo do ambiente. O campo `Hugepagesize` mostra o tamanho padrão de large page em seu ambiente, e os outros campos mostram detalhes para large pages desse tamanho. Kernels mais recentes têm suporte para múltiplos tamanhos de large page. Para listar os tamanhos de página suportados, execute isto:
```
    # ls /sys/kernel/mm/hugepages/
    hugepages-1048576kB  hugepages-2048kB
```

O ambiente acima suporta large pages de 2 MB e 1 GB, mas elas precisam ser configuradas para que a JVM possa usá-las. Ao usar large pages e não habilitar transparent huge pages (opção `-XX:+UseTransparentHugePages`), o número de large pages deve ser pré-alocado. Por exemplo, para habilitar 8 GB de memória a serem suportados por large pages de 2 MB, faça login como `root` e execute:

> `# echo 4096 > /sys/kernel/mm/hugepages/hugepages-2048kB/nr_hugepages`

É sempre recomendado verificar o valor de `nr_hugepages` após a solicitação para garantir que o kernel conseguiu alocar o número solicitado de large pages.

> **Nota:** Os valores contidos em `/proc` e `/sys` são redefinidos após a reinicialização do sistema, então você pode querer defini-los em um script de inicialização (por exemplo, `rc.local` ou `sysctl.conf`).

Se você configurar os parâmetros do kernel do OS para habilitar o uso de large pages, os processos Java podem alocar large pages para o Java heap, bem como para outras áreas internas, por exemplo:

  * Code cache
  * Marking bitmaps

Consequentemente, se você configurar o parâmetro `nr_hugepages` para o tamanho do Java heap, a JVM ainda poderá falhar ao alocar o heap usando large pages porque outras áreas, como o code cache, já podem ter usado algumas das large pages configuradas.

### Suporte a Large Pages para Windows

Para usar o suporte a large pages no Windows, o administrador deve primeiro atribuir privilégios adicionais ao usuário que está executando a aplicação:

  1. Selecione **Painel de Controle** , **Ferramentas Administrativas** e, em seguida, **Política de Segurança Local**.
  2. Selecione **Políticas Locais** e, em seguida, **Atribuição de Direitos de Usuário**.
  3. Clique duas vezes em **Bloquear páginas na memória** e, em seguida, adicione usuários e/ou grupos.
  4. Reinicie seu sistema.

Observe que essas etapas são necessárias mesmo que seja o administrador que esteja executando a aplicação, porque os administradores por padrão não têm o privilégio de bloquear páginas na memória.

## Compartilhamento de Dados de Classes de Aplicação

O Compartilhamento de Dados de Classes de Aplicação (AppCDS) armazena classes usadas por suas aplicações em um arquivo de arquivo. Como essas classes são armazenadas em um formato que pode ser carregado muito rapidamente (em comparação com classes armazenadas em um arquivo JAR), o AppCDS pode melhorar o tempo de inicialização de suas aplicações. Além disso, o AppCDS pode reduzir o consumo de memória em tempo de execução, compartilhando partes dessas classes entre múltiplos processos.

As classes no arquivo CDS são armazenadas em um formato otimizado que é cerca de 2 a 5 vezes maior do que as classes armazenadas em arquivos JAR ou na imagem de tempo de execução do JDK. Portanto, é uma boa ideia arquivar apenas as classes que são realmente usadas por sua aplicação. Estas geralmente são apenas uma pequena porção de todas as classes disponíveis. Por exemplo, sua aplicação pode usar apenas algumas APIs fornecidas por uma grande biblioteca.

### Usando Arquivos CDS

Por padrão, na maioria das distribuições JDK, a menos que `-Xshare:off` seja especificado, a JVM inicia com um arquivo CDS padrão, que geralmente está localizado em `JAVA_HOME/lib/server/classes.jsa` (ou `JAVA_HOME\bin\server\classes.jsa` no Windows). Este arquivo contém cerca de 1300 classes de biblioteca principais que são usadas pela maioria das aplicações.

Para usar o CDS para o conjunto exato de classes usadas por sua aplicação, você pode usar a opção `-XX:SharedArchiveFile`, que tem a forma geral:

> `-XX:SharedArchiveFile=<static_archive>:<dynamic_archive>`

  * O `<static_archive>` sobrescreve o arquivo CDS padrão.
  * O `<dynamic_archive>` fornece classes adicionais que podem ser carregadas além das que estão no `<static_archive>`.
  * No Windows, o delimitador de caminho acima `:` deve ser substituído por `;`

Os nomes "estático" e "dinâmico" são usados por razões históricas. O arquivo dinâmico, embora ainda útil, suporta menos otimizações do que as disponíveis para o arquivo CDS estático. Se o conjunto completo de otimizações CDS/AOT for desejado, considere usar o cache AOT descrito abaixo.

A JVM pode usar até dois arquivos. Para usar apenas um único `<static_archive>`, você pode omitir a parte `<dynamic_archive>`:

> `-XX:SharedArchiveFile=<static_archive>`

Para conveniência, o `<dynamic_archive>` registra a localização do `<static_archive>`. Portanto, você pode omitir o `<static_archive>` dizendo apenas:

> `-XX:SharedArchiveFile=<dynamic_archive>`

### Criando Arquivos CDS Manualmente

Arquivos CDS podem ser criados manualmente usando vários métodos:

  * `-Xshare:dump`
  * `-XX:ArchiveClassesAtExit`
  * `jcmd VM.cds`

Uma operação comum em todos esses métodos é uma "execução de teste", onde você executa a aplicação uma vez para determinar as classes que devem ser armazenadas no arquivo.

#### Criando um Arquivo CDS Estático com -Xshare:dump

As etapas a seguir criam um arquivo CDS estático que contém todas as classes usadas pela aplicação `test.Hello`.

  1. Crie uma lista de todas as classes usadas pela aplicação `test.Hello`. O comando a seguir cria um arquivo chamado `hello.classlist` que contém uma lista de todas as classes usadas por esta aplicação:

> `java -Xshare:off -XX:DumpLoadedClassList=hello.classlist -cp hello.jar test.Hello`

O classpath especificado pelo parâmetro `-cp` deve conter apenas arquivos JAR.

  2. Crie um arquivo estático, chamado `hello.jsa`, que contém todas as classes em `hello.classlist`:

> `java -Xshare:dump -XX:SharedArchiveFile=hello.jsa -XX:SharedClassListFile=hello.classlist -cp hello.jar`

  3. Execute a aplicação `test.Hello` com o arquivo `hello.jsa`:

> `java -XX:SharedArchiveFile=hello.jsa -cp hello.jar test.Hello`

  4. **Opcional** Verifique se a aplicação `test.Hello` está usando a classe contida no arquivo compartilhado `hello.jsa`:

> `java -XX:SharedArchiveFile=hello.jsa -cp hello.jar -Xlog:class+load test.Hello`

A saída deste comando deve conter o seguinte texto:

> `[info][class,load] test.Hello source: shared objects file`

Por padrão, quando a opção `-Xshare:dump` é usada, a JVM é executada no modo somente interpretador (como se a opção `-Xint` fosse especificada). Isso é necessário para gerar uma saída determinística no arquivo de arquivo compartilhado. Ou seja, o mesmo arquivo exato será gerado, bit a bit, toda vez que você o despejar. No entanto, se a saída determinística não for necessária e você tiver uma classlist grande, você pode adicionar explicitamente `-Xmixed` à linha de comando para habilitar o compilador JIT. Isso acelerará a criação do arquivo.

#### Criando um Arquivo CDS Dinâmico com -XX:ArchiveClassesAtExit

As vantagens dos arquivos CDS dinâmicos são:

  * Eles geralmente usam menos espaço em disco, pois não precisam armazenar as classes que já estão no arquivo estático.
  * Eles são criados com uma etapa a menos do que o arquivo estático comparável.

As etapas a seguir criam um arquivo CDS dinâmico que contém as classes usadas pela aplicação `test.Hello`, excluindo aquelas que já estão no arquivo CDS padrão.

  1. Crie um arquivo CDS dinâmico, chamado `hello.jsa`, que contém todas as classes em `hello.jar` carregadas pela aplicação `test.Hello`:

> `java -XX:ArchiveClassesAtExit=hello.jsa -cp hello.jar Hello`

  2. Execute a aplicação `test.Hello` com o arquivo compartilhado `hello.jsa`:

> `java -XX:SharedArchiveFile=hello.jsa -cp hello.jar test.Hello`

  3. **Opcional** Repita a etapa 4 da seção anterior para verificar se a aplicação `test.Hello` está usando a classe contida no arquivo compartilhado `hello.jsa`.

Também é possível criar um arquivo CDS dinâmico com um arquivo CDS estático não padrão. Por exemplo:

> `java -XX:SharedArchiveFile=base.jsa -XX:ArchiveClassesAtExit=hello.jsa -cp hello.jar Hello`

Para executar a aplicação usando este arquivo CDS dinâmico:

> `java -XX:SharedArchiveFile=base.jsa:hello.jsa -cp hello.jar Hello`

(No Windows, o delimitador de caminho acima `:` deve ser substituído por `;`)

Como mencionado acima, o nome do arquivo estático pode ser omitido:

> `java -XX:SharedArchiveFile=hello.jsa -cp hello.jar Hello`

#### Criando Arquivos CDS com jcmd

As duas seções anteriores exigem que você modifique o script de inicialização da aplicação para criar um arquivo CDS. Às vezes, isso pode ser difícil, por exemplo, se o classpath da aplicação for configurado por rotinas complexas.

O comando `jcmd VM.cds` fornece uma maneira menos intrusiva de criar um arquivo CDS, conectando-se a um processo JVM em execução. Você pode criar um arquivo estático:

> `jcmd <pid> VM.cds static_dump my_static_archive.jsa`

ou um arquivo dinâmico:

> `jcmd <pid> VM.cds dynamic_dump my_dynamic_archive.jsa`

Para usar o arquivo de arquivo resultante em uma execução subsequente da aplicação sem modificar o script de inicialização da aplicação, você pode usar a seguinte técnica:

> `env JAVA_TOOL_OPTIONS=-XX:SharedArchiveFile=my_static_archive.jsa bash app_start.sh`

Nota: para usar `jcmd <pid> VM.cds dynamic_dump`, o processo JVM identificado por `<pid>` deve ser iniciado com `-XX:+RecordDynamicDumpInfo`, que também pode ser passado para o script de inicialização da aplicação com a mesma técnica:

> `env JAVA_TOOL_OPTIONS=-XX:+RecordDynamicDumpInfo bash app_start.sh`

### Criando Arquivo CDS Dinâmico com -XX:+AutoCreateSharedArchive

`-XX:+AutoCreateSharedArchive` é uma maneira mais conveniente de criar/usar arquivos CDS. Ao contrário dos métodos de criação manual de arquivos CDS descritos na seção anterior, com `-XX:+AutoCreateSharedArchive`, não é mais necessário ter uma execução de teste separada. Em vez disso, você pode sempre executar a aplicação com a mesma linha de comando e desfrutar dos benefícios do CDS automaticamente.

> `java -XX:+AutoCreateSharedArchive -XX:SharedArchiveFile=hello.jsa -cp hello.jar Hello`

Se o arquivo de arquivo especificado existir e tiver sido criado pela mesma versão do JDK, ele será carregado como um arquivo dinâmico; caso contrário, será ignorado na inicialização da VM.

Na saída da VM, se o arquivo de arquivo especificado não existir, ele será criado. Se existir, mas tiver sido criado com uma versão diferente (mas posterior ao JDK 19) do JDK, ele será substituído. Em ambos os casos, o arquivo estará pronto para ser carregado na próxima vez que a JVM for iniciada com a mesma linha de comando.

Se o arquivo de arquivo especificado existir, mas tiver sido criado por uma versão do JDK anterior ao JDK 19, ele será ignorado: nem carregado na inicialização, nem substituído na saída.

Os desenvolvedores devem observar que o conteúdo do arquivo CDS é específico para cada build do JDK. Portanto, se você mudar para um build diferente do JDK, `-XX:+AutoCreateSharedArchive` recriará automaticamente o arquivo para corresponder ao JDK. Se você pretende usar este recurso com um arquivo existente, deve garantir que o arquivo foi criado por pelo menos a versão 19 do JDK.

### Restrições no Class Path e Module Path

  * Nem o class path (`-classpath` e `-Xbootclasspath/a`) nem o module path (`--module-path`) podem conter diretórios não vazios.

  * Apenas arquivos JAR modulares são suportados em `--module-path`. Módulos explodidos não são suportados.

  * O class path usado no momento da criação do arquivo deve ser o mesmo (ou um prefixo) do class path usado em tempo de execução. (Não há tal requisito para o module path.)

  * O arquivo CDS não pode ser carregado se quaisquer arquivos JAR no class path ou module path forem modificados após a geração do arquivo.

### Opções relacionadas a módulos

As seguintes opções relacionadas a módulos são suportadas pelo CDS: `--module-path`, `--module`, `--add-modules` e `--enable-native-access`.

Os valores para essas opções (se especificadas) devem ser idênticos ao criar e usar o arquivo CDS. Caso contrário, se houver uma incompatibilidade de qualquer uma dessas opções, o arquivo CDS pode ser parcial ou completamente desabilitado, levando a um desempenho inferior.

  * Se a opção `AOTClassLinking` (veja abaixo) _foi_ habilitada durante a criação do arquivo CDS, o arquivo CDS não pode ser usado, e a seguinte mensagem de erro é impressa:

`CDS archive has aot-linked classes. It cannot be used when archived full module graph is not used`

  * Se a opção `AOTClassLinking` _não foi_ habilitada durante a criação do arquivo CDS, o arquivo CDS pode ser usado, mas o recurso "archived module graph" será desabilitado. Isso pode levar a um aumento no tempo de inicialização.

Para diagnosticar problemas com as opções AOT, você pode adicionar `-Xlog:aot` aos argumentos da VM da aplicação. Por exemplo, se `--add-modules jdk.jconsole` foi especificado durante a criação do arquivo e `--add-modules jdk.incubator.vector` é especificado durante o tempo de execução, as seguintes mensagens serão registradas:

`Mismatched values for property jdk.module.addmods`

`runtime jdk.incubator.vector dump time jdk.jconsole`

`subgraph jdk.internal.module.ArchivedBootLayer cannot be used because full module graph is disabled`

Se qualquer uma das opções da VM `--upgrade-module-path`, `--patch-module` ou `--limit-modules` for especificada, o CDS é desabilitado. Isso significa que a JVM será executada sem carregar nenhum arquivo CDS. Além disso, se você tentar criar um arquivo CDS com qualquer uma dessas 3 opções especificadas, a JVM reportará um erro.

## Cache Ahead-of-Time

O JDK suporta otimizações ahead-of-time (AOT) que podem ser realizadas antes que uma aplicação seja executada. Um exemplo é o Class Data Sharing (CDS), conforme descrito acima, que analisa classes antecipadamente. As otimizações AOT podem melhorar o desempenho de inicialização e aquecimento de aplicações Java.

O Cache Ahead-of-Time (cache AOT) é um contêiner introduzido no JDK 24 para armazenar artefatos produzidos por otimizações AOT. O cache AOT atualmente contém classes Java e objetos de heap. Em futuras versões do JDK, o cache AOT pode conter artefatos adicionais, como perfis de execução e métodos compilados.

Um cache AOT é específico para uma combinação dos seguintes:

  * Uma aplicação particular (conforme expresso por `-classpath`, `-jar` ou `--module-path`).
  * Uma versão particular do JDK.
  * Um OS e arquitetura de CPU particulares.

Se qualquer um dos itens acima mudar, você deve recriar o cache AOT.

A implantação do cache AOT é dividida em três fases:

  * **Treinamento:** Executamos a aplicação com uma carga de trabalho representativa para coletar dados estatísticos que nos dizem quais artefatos devem ser incluídos no cache AOT. Os dados são salvos em um arquivo de _Configuração AOT_.

  * **Montagem:** Usamos o arquivo de Configuração AOT para produzir um cache AOT.

  * **Produção:** Executamos a aplicação com o cache AOT para melhor desempenho de inicialização e aquecimento.

O cache AOT pode ser usado com as seguintes opções de linha de comando:

`-XX:AOTCache=`_cachefile_
    

Especifica a localização do cache AOT. A extensão padrão para _cachefile_ é `.aot`. Esta opção não pode ser usada junto com `-XX:AOTCacheOutput`.

Esta opção é compatível com as configurações de `AOTMode` de `on`, `create` ou `auto` (o padrão). O _cachefile_ é lido nos modos AOT `on` e `auto`, e é ignorado pelo modo `off`. O _cachefile_ é escrito pelo modo AOT `create`. Nesse caso, esta opção é equivalente a `-XX:AOTCacheOutput=`_cachefile_.

`-XX:AOTCacheOutput=`_cachefile_
    

Especifica a localização do cache AOT a ser gravado. A extensão padrão para _cachefile_ é `.aot`. Esta opção não pode ser usada junto com `-XX:AOTCache`.

Esta opção é compatível com as configurações de `AOTMode` de `record`, `create` ou `auto` (o padrão).

`-XX:AOTConfiguration=`_configfile_
    

Especifica o arquivo de Configuração AOT para a JVM gravar ou ler. A extensão padrão para _configfile_ é `.aotconfig`.

Esta opção é compatível com as configurações de `AOTMode` de `record`, `create` ou `auto` (o padrão). O _configfile_ é lido pelo modo AOT `create`, e escrito pelos outros modos aplicáveis. Se o modo AOT for `auto`, então `AOTCacheOutput` também deve estar presente.

`-XX:AOTMode=`_mode_
     Especifica o Modo AOT para esta execução. _mode_ deve ser um dos seguintes: `auto`, `off`, `record`, `create` ou `on`. 

  * `auto`: Este modo AOT é o padrão e entra em vigor se nenhuma opção `-XX:AOTMode` estiver presente. Ele define automaticamente o modo AOT para `record`, `on` ou `off`, da seguinte forma:

    * Se `-XX:AOTCacheOutput=`_cachefile_ for especificado, o modo AOT é alterado para `record` (uma execução de treinamento, com uma operação `create` subsequente).
    * Caso contrário, se um cache AOT puder ser carregado, o modo AOT é alterado para `on` (uma execução de produção).
    * Caso contrário, o modo AOT é alterado para `off` (uma execução de produção sem cache AOT).
  * `off`: Nenhum cache AOT é usado. Outras opções de linha de comando AOT são ignoradas.

  * `record`: Executa a aplicação na fase de treinamento. Pelo menos um de `-XX:AOTConfiguration=`_configfile_ e/ou `-XX:AOTCacheOutput=`_cachefile_ deve ser especificado. Se `-XX:AOTConfiguration=`_configfile_ for especificado, a JVM coleta dados estatísticos e os armazena em _configfile_. Se `-XX:AOTConfiguration=`_configfile_ não for especificado, a JVM usa um nome de arquivo temporário, que pode ser a string `AOTCacheOutput+".config"`, ou então um novo nome de arquivo temporário dependente da implementação. Se `-XX:AOTCacheOutput=`_cachefile_ for especificado, um segundo processo JVM é lançado para realizar a fase de Montagem para gravar os artefatos de otimização em _cachefile_.

Opções JVM extras podem ser passadas para o segundo processo JVM usando a variável de ambiente `JDK_AOT_VM_OPTIONS`, com o mesmo formato da variável de ambiente `JAVA_TOOL_OPTIONS`, que é [definida por JVMTI](<https://docs.oracle.com/en/java/javase/24/docs/specs/jvmti.html#tooloptions>).

  * `create`: Realiza a fase de Montagem. `-XX:AOTConfiguration=`_configfile_ deve ser especificado. A JVM lê o histórico e as estatísticas de _configfile_ e grava os artefatos de otimização em _cachefile_. Observe que a própria aplicação não é executada nesta fase.

  * `on`: Executa a aplicação na fase de Produção. Se `-XX:AOTCache=`_cachefile_ for especificado, a JVM tenta carregar _cachefile_ como o cache AOT. Caso contrário, a JVM tenta carregar um _arquivo CDS padrão_ do diretório de instalação do JDK como o cache AOT.

O carregamento de um cache AOT pode falhar por vários motivos:

    * Você está tentando usar o cache AOT com uma aplicação, versão do JDK ou OS/CPU incompatíveis.

    * O _cachefile_ especificado não existe ou não está acessível.

    * Opções JVM incompatíveis são usadas (por exemplo, certas opções JVMTI).

Como o cache AOT é um recurso de otimização, não há garantia de que ele será compatível com todas as opções JVM possíveis. Consulte [JEP 483](<https://openjdk.org/jeps/483>), seção **Consistência de treinamento e execuções subsequentes** para uma lista representativa de cenários que podem ser incompatíveis com o cache AOT.

Esses cenários geralmente envolvem modificação arbitrária de classes para fins de diagnóstico e geralmente não são relevantes para ambientes de produção.

Quando o cache AOT falha ao carregar:

    * Se `AOTMode` era originalmente `auto`, a JVM continuará a execução sem usar o cache AOT. Este é o modo recomendado para ambientes de produção, especialmente quando você pode não ter controle completo da linha de comando (por exemplo, o script de inicialização da sua aplicação pode permitir que os usuários injetem opções na linha de comando). Isso permite que sua aplicação funcione corretamente, embora às vezes possa não se beneficiar do cache AOT.

    * Se `AOTMode` for `on`, a JVM imprimirá uma mensagem de erro e sairá imediatamente. Este modo deve ser usado apenas como um auxílio de depuração "fail-fast" para verificar se suas opções de linha de comando são compatíveis com o cache AOT. Uma alternativa é executar sua aplicação com `-XX:AOTMode=auto -Xlog:aot` para ver se o cache AOT pode ser usado ou não.

`-XX:+AOTClassLinking`
    

Se esta opção estiver habilitada, a JVM realizará otimizações mais avançadas (como resolução ahead-of-time de instruções invokedynamic) ao criar o cache AOT. Como resultado, a aplicação verá melhorias adicionais no desempenho de inicialização e aquecimento. No entanto, um cache AOT criado com esta opção não pode ser usado quando certos parâmetros de linha de comando são especificados na fase de Produção. Consulte [JEP 483](<https://openjdk.org/jeps/483>) para uma discussão detalhada de `-XX:+AOTClassLinking` e suas restrições.

Quando `-XX:AOTMode` _é usado_ na linha de comando, `AOTClassLinking` é automaticamente habilitado. Para desabilitá-lo, você deve passar explicitamente a opção `-XX:-AOTClassLinking`.

Quando `-XX:AOTMode` _não é usado_ na linha de comando, `AOTClassLinking` é desabilitado por padrão para fornecer compatibilidade total com opções CDS tradicionais, como `-Xshare:dump`.

A primeira ocorrência da sequência especial `%p` em `*configfile*` e `_cachefile_` é substituída pelo ID do processo da JVM lançada na linha de comando, e da mesma forma a primeira ocorrência de `%t` é substituída pelo timestamp de inicialização da JVM. (Após a substituição, não deve haver mais ocorrências de `%p` ou `%t`, para evitar problemas com subprocessos.) Por exemplo:

> `java -XX:AOTConfiguration=foo%p.aotconfig -XX:AOTCacheOutput=foo%p.aot -cp foo.jar Foo`

criará dois arquivos: `foopid123.aotconfig` e `foopid123.aot`, onde `123` é o ID do processo da JVM que executou a aplicação `Foo`.
## Exemplos de Otimização de Desempenho

Você pode usar as opções avançadas de tempo de execução do Java para otimizar o desempenho de suas aplicações.

### Otimização para Maior Vazão

Use os seguintes comandos e opções avançadas para alcançar um desempenho de maior vazão para sua aplicação:

> `java -server -XX:+UseParallelGC -XX:+UseLargePages -Xmn10g -Xms26g -Xmx26g`

### Otimização para Menor Tempo de Resposta

Use os seguintes comandos e opções avançadas para alcançar menores tempos de resposta para sua aplicação:

> `java -XX:+UseG1GC -XX:MaxGCPauseMillis=100`

### Mantendo o Heap Java Pequeno e Reduzindo a Pegada Dinâmica de Aplicações Embarcadas

Use as seguintes opções avançadas de tempo de execução para manter o heap Java pequeno e reduzir a pegada dinâmica de aplicações embarcadas:

> `-XX:MaxHeapFreeRatio=10 -XX:MinHeapFreeRatio=5`

> **Nota:** Os valores padrão para estas duas opções são 70% e 40%, respectivamente. Como sacrifícios de desempenho podem ocorrer ao usar essas configurações pequenas, você deve otimizar para uma pegada pequena reduzindo essas configurações o máximo possível sem introduzir degradação de desempenho inaceitável.

## Status de Saída

Os seguintes valores de saída são tipicamente retornados pelo launcher quando o launcher é chamado com argumentos incorretos, erros graves ou exceções lançadas pela JVM. No entanto, uma aplicação Java pode escolher retornar qualquer valor usando a chamada de API `System.exit(exitValue)`. Os valores são:

  * `0`: Conclusão bem-sucedida

  * `>0`: Ocorreu um erro