# Java - Seu Lançador de Aplicações

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas Essenciais do JDK ](<#/doc/tutorials/jvm/tools/core>) > Java - Seu Lançador de Aplicações

**Anterior na Série**

[Javadoc - o Gerador de Documentação](<#/doc/tutorials/jvm/tools/core/javadoc>)

➜

**Tutorial Atual**

Java - Seu Lançador de Aplicações

➜

**Próximo na Série**

[JShell - A Ferramenta Shell do Java](<#/doc/tutorials/jvm/tools/core/jshell>)

**Anterior na Série:** [Javadoc - o Gerador de Documentação](<#/doc/tutorials/jvm/tools/core/javadoc>)

**Próximo na Série:** [JShell - A Ferramenta Shell do Java](<#/doc/tutorials/jvm/tools/core/jshell>)

# Java - Seu Lançador de Aplicações

## Apresentando a Ferramenta Java

[java](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/java.html>) - lança uma aplicação Java

## Sinopse

**Windows:** O comando `javaw` é idêntico a `java`, exceto que com `javaw` não há uma janela de console associada. Use `javaw` quando não quiser que uma janela de prompt de comando apareça. O lançador `javaw`, no entanto, exibirá uma caixa de diálogo com informações de erro se o lançamento falhar.

Para lançar um arquivo de classe:

```
java [options] mainclass [args...]
```

Para lançar a classe principal em um arquivo JAR:

```
java [options] -jar jarfile [args...]
```

Para lançar a classe principal em um módulo:

```
java [options] -m module[/mainclass] [args...]
```

ou

```
java [options] --module module[/mainclass] [args...]
```

Para lançar um programa de arquivo-fonte único:

```
java [options] source-file [args...]
```

`[options]` Opcional: Especifica opções de linha de comando separadas por espaços.

`mainclass` Especifica o nome da classe a ser lançada. As entradas de linha de comando que seguem classname são os argumentos para o método main.

`-jar jarfile` Executa um programa encapsulado em um arquivo JAR. O argumento `jarfile` é o nome de um arquivo JAR com um manifest que contém uma linha no formato `Main-Class:classname` que define a classe com o método `public static void main(String[] args)` que serve como ponto de partida da sua aplicação. Ao usar `-jar`, o arquivo JAR especificado é a fonte de todas as classes do usuário, e outras configurações de classpath são ignoradas. Se você estiver usando arquivos JAR, consulte o comando `jar`.

`-m` ou `--module module[/mainclass]` Executa a classe principal em um módulo especificado por `mainclass` se for fornecido, ou, se não for fornecido, o valor no módulo. Em outras palavras, `mainclass` pode ser usado quando não é especificado pelo módulo, ou para sobrescrever o valor quando é especificado.

`source-file` Usado apenas para lançar um programa de `source-file` único. Especifica o arquivo-fonte que contém a classe principal ao usar o modo source-file.

`[args...]` Opcional: Argumentos que seguem `mainclass`, `source-file`, `-jar jarfile`, e `-m` ou `--module module/mainclass` são passados como argumentos para a classe principal.

## Descrição

O comando `java` inicia uma aplicação Java. Ele faz isso iniciando o Java Runtime Environment, carregando a classe especificada e chamando o método `main()` dessa classe. O método deve ser declarado `public` e `static`, não deve retornar nenhum valor e deve aceitar um String array como parâmetro. A declaração do método tem a seguinte forma:

```java
public static void main(String[] args)
```

No modo source-file, o comando `java` pode lançar uma classe declarada em um arquivo-fonte.

Por padrão, o primeiro argumento que não é uma opção do comando `java` é o nome totalmente qualificado da classe a ser chamada. Se `-jar` for especificado, então seu argumento é o nome do arquivo JAR contendo a classe e os arquivos de recurso para a aplicação. A classe de inicialização deve ser indicada pelo cabeçalho do manifest `Main-Class` em seu arquivo manifest.

Argumentos após o nome do arquivo de classe ou o nome do arquivo JAR são passados para o método `main()`.

## Usando o Modo Source-File para Lançar Programas de Código-Fonte de Arquivo Único

Para lançar uma classe declarada em um arquivo-fonte, execute o lançador java no modo source-file. A entrada no modo source-file é determinada por dois itens na linha de comando java:

*   O primeiro item na linha de comando que não é uma opção ou parte de uma opção. Em outras palavras, o item na linha de comando que de outra forma seria o nome da classe principal.
*   A opção de versão `--source`, se presente.

Se a classe identificar um arquivo existente que tenha uma extensão `.java`, ou se a opção `--source` for especificada, então o modo `source-file` é selecionado. O arquivo-fonte é então compilado e executado. A opção `--source` pode ser usada para especificar a versão do código-fonte ou N. Isso determina a API que pode ser usada. Ao definir `--source N`, você só pode usar a API pública que foi definida no JDK N.

Se o arquivo não tiver a extensão `.java`, a opção `--source` deve ser usada para instruir o comando `java` a usar o modo source-file. A opção `--source` é usada para casos em que o arquivo-fonte é um "script" a ser executado e o nome do arquivo-fonte não segue as convenções normais de nomenclatura para arquivos-fonte Java.

No modo `source-file`, o efeito é como se o arquivo-fonte fosse compilado em memória, e a primeira classe encontrada no arquivo-fonte fosse executada. Quaisquer argumentos colocados após o nome do arquivo-fonte na linha de comando original são passados para a classe compilada quando ela é executada.

Por exemplo, se um arquivo fosse nomeado `HelloWorld.java` e contivesse uma classe nomeada `hello.World`, então o comando do modo source-file para lançar a classe seria:

```
java HelloWorld.java
```

O exemplo ilustra que a classe pode estar em um pacote nomeado e não precisa estar no pacote sem nome. Este uso do modo source-file é informalmente equivalente ao uso dos dois comandos a seguir, onde hello.World é o nome da classe no pacote:

```
javac HelloWorld.java
java hello.World
```

**No modo source-file, quaisquer opções adicionais de linha de comando são processadas da seguinte forma:**

*   O lançador verifica as opções especificadas antes do arquivo-fonte para quaisquer que sejam relevantes para compilar o arquivo-fonte.
*   Isso inclui: `--class-path`, `--module-path`, `--add-exports`, `--add-modules`, `--limit-modules`, `--patch-module`, `--upgrade-module-path`, e quaisquer formas variantes dessas opções. Também inclui a opção --enable-preview, descrita em JEP 12: Preview Language and VM Features.
*   Nenhuma provisão é feita para passar quaisquer opções adicionais para o compilador, como -processor ou `-Werror`.
*   Arquivos de argumento de linha de comando (`@`-files) podem ser usados da maneira padrão. Listas longas de argumentos para a VM ou para o programa sendo invocado podem ser colocadas em arquivos especificados na linha de comando prefixando o nome do arquivo com um caractere @.

**No modo source-file, a compilação prossegue da seguinte forma:**

*   Quaisquer opções de linha de comando que sejam relevantes para o ambiente de compilação são levadas em consideração.
*   Nenhum outro arquivo-fonte é encontrado e compilado, como se o source path estivesse definido para um valor vazio.
*   O processamento de anotações é desabilitado, como se `-proc:none` estivesse em vigor.
*   Se uma versão for especificada, via opção --source, o valor é usado como argumento para uma opção `--release` implícita para a compilação. Isso define tanto a versão-fonte aceita pelo compilador quanto a API do sistema que pode ser usada pelo código no arquivo-fonte.
*   O arquivo-fonte é compilado no contexto de um módulo sem nome.
*   O arquivo-fonte deve conter uma ou mais classes de nível superior, sendo a primeira delas considerada a classe a ser executada.
*   O compilador não impõe a restrição opcional definida no final de JLS §7.6, de que um tipo em um pacote nomeado deve existir em um arquivo cujo nome é composto pelo nome do tipo seguido pela extensão .java.
*   Se o arquivo-fonte contiver erros, mensagens de erro apropriadas são gravadas no stream de erro padrão, e o lançador sai com um código de saída diferente de zero.

**No modo source-file, a execução prossegue da seguinte forma:**

*   A classe a ser executada é a primeira classe de nível superior encontrada no arquivo-fonte. Ela deve conter uma declaração do método padrão `public static void main(String[])`.
*   As classes compiladas são carregadas por um class loader personalizado, que delega ao class loader da aplicação. Isso implica que as classes que aparecem no classpath da aplicação não podem se referir a nenhuma classe declarada no arquivo-fonte.
*   As classes compiladas são executadas no contexto de um módulo sem nome, como se `--add-modules=ALL-DEFAULT` estivesse em vigor. Isso é adicional a quaisquer outras opções `--add-module` que possam ter sido especificadas na linha de comando.
*   Quaisquer argumentos que apareçam após o nome do arquivo na linha de comando são passados para o método main padrão de maneira óbvia.
*   É um erro se houver uma classe no classpath da aplicação cujo nome seja o mesmo da classe a ser executada.

## Usando a Variável de Ambiente do Lançador JDK_JAVA_OPTIONS

`JDK_JAVA_OPTIONS` precede seu conteúdo às opções analisadas da linha de comando. O conteúdo da variável de ambiente `JDK_JAVA_OPTIONS` é uma lista de argumentos separados por caracteres de espaço em branco (conforme determinado por `isspace()`). Estes são precedidos aos argumentos da linha de comando passados para o lançador java. O requisito de codificação para a variável de ambiente é o mesmo da linha de comando `java` no sistema. O conteúdo da variável de ambiente `JDK_JAVA_OPTIONS` é tratado da mesma maneira que o especificado na linha de comando.

Aspas simples ` ou duplas `"` podem ser usadas para delimitar argumentos que contêm caracteres de espaço em branco. Todo o conteúdo entre a aspa de abertura e a primeira aspa de fechamento correspondente é preservado simplesmente removendo o par de aspas. Caso uma aspa correspondente não seja encontrada, o lançador abortará com uma mensagem de erro. `@`-files são suportados como especificados na linha de comando. No entanto, assim como em `@`-files, o uso de um curinga não é suportado. A fim de mitigar o uso indevido potencial do comportamento de `JDK_JAVA_OPTIONS`, opções que especificam a classe principal (como `-jar`) ou que fazem o lançador java sair sem executar a classe principal (como `-h`) não são permitidas na variável de ambiente. Se alguma dessas opções aparecer na variável de ambiente, o lançador abortará com uma mensagem de erro. Quando `JDK_JAVA_OPTIONS` é definida, o lançador imprime uma mensagem para stderr como um lembrete.

Exemplo:

```
export JDK_JAVA_OPTIONS="-g -Xms1024m"
java -jar myapp.jar
```

é equivalente à linha de comando:

```
java -g -Xms1024m -jar myapp.jar
```

## Visão Geral das Opções Java

O comando `java` suporta uma ampla gama de opções nas seguintes categorias:

*   **Opções Padrão para Java:** Opções garantidas de serem suportadas por todas as implementações da Java Virtual Machine (JVM). Elas são usadas para ações comuns, como verificar a versão do JRE, definir o classpath, habilitar saída verbosa, e assim por diante.

*   **Opções Extras para Java:** Opções de propósito geral que são específicas da Java HotSpot Virtual Machine. Elas não são garantidas de serem suportadas por todas as implementações da JVM e estão sujeitas a alterações. Essas opções começam com `-X`.

As opções avançadas não são recomendadas para uso casual. Estas são opções de desenvolvedor usadas para ajustar áreas específicas da operação da Java HotSpot Virtual Machine que frequentemente têm requisitos de sistema específicos e podem exigir acesso privilegiado a parâmetros de configuração do sistema. Vários exemplos de ajuste de desempenho são fornecidos em Performance Tuning Examples. Essas opções não são garantidas de serem suportadas por todas as implementações da JVM e estão sujeitas a alterações. Opções avançadas começam com `-XX`.

*   **Opções Avançadas de Runtime**: Controlam o comportamento de runtime da Java HotSpot VM.
*   **Opções Avançadas do Compilador JIT**: Controlam a compilação dinâmica just-in-time (JIT) realizada pela Java HotSpot VM.
*   **Opções Avançadas de Serviceability**: Habilitam a coleta de informações do sistema e a realização de depuração extensiva.
*   **Opções Avançadas de Garbage Collection**: Controlam como o garbage collection (GC) é realizado pela Java HotSpot

Opções booleanas são usadas para habilitar um recurso que está desabilitado por padrão ou desabilitar um recurso que está habilitado por padrão. Tais opções não exigem um parâmetro. Opções booleanas `-XX` são habilitadas usando o sinal de mais (`-XX:+OptionName`) e desabilitadas usando o sinal de menos (`-XX:-OptionName`).

Para opções que exigem um argumento, o argumento pode ser separado do nome da opção por um espaço, dois pontos (`:`), ou um sinal de igual (`=`), ou o argumento pode seguir diretamente a opção (a sintaxe exata difere para cada opção). Se você for esperado para especificar o tamanho em bytes, então você pode usar nenhum sufixo, ou usar o sufixo `k` ou `K` para kilobytes (`KB`), `m` ou `M` para megabytes (`MB`), ou `g` ou `G` para gigabytes (`GB`). Por exemplo, para definir o tamanho para 8 GB, você pode especificar `8g`, `8192m`, `8388608k`, ou `8589934592` como argumento. Se você for esperado para especificar a porcentagem, então use um número de `0` a `1`. Por exemplo, especifique `0.25` para `25%`.

## Opções Padrão para Java

Estas são as opções mais comumente usadas suportadas por todas as implementações da JVM.

`-agentlib:libname[=options]` Carrega a biblioteca de agente nativo especificada. Após o nome da biblioteca, uma lista de opções específicas da biblioteca, separadas por vírgulas, pode ser usada.

*   **Linux e macOS:** Se a opção `-agentlib:foo` for especificada, a JVM tenta carregar a biblioteca nomeada `libfoo.so` no local especificado pela variável de sistema `LD_LIBRARY_PATH` (no macOS esta variável é `DYLD_LIBRARY_PATH`).

*   **Windows:** Se a opção `-agentlib:foo` for especificada, a JVM tenta carregar a biblioteca nomeada `foo.dll` no local especificado pela variável de sistema `PATH`.

O exemplo a seguir mostra como carregar a biblioteca Java Debug Wire Protocol (JDWP) e escutar a conexão de socket na porta `8000`, suspendendo a JVM antes que a classe principal seja carregada:

```
-agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=8000
```

`-agentpath:pathname[=options]` Carrega a biblioteca de agente nativo especificada pelo nome do caminho absoluto. Esta opção é equivalente a -agentlib, mas usa o caminho completo e o nome do arquivo da biblioteca.

`--class-path classpath`, `-classpath classpath`, ou `-cp classpath` Uma lista de diretórios, arquivos JAR e arquivos ZIP separados por ponto e vírgula (`;`) para procurar arquivos de classe.

A especificação do classpath sobrescreve qualquer configuração da variável de ambiente CLASSPATH. Se a opção de classpath não for usada e o classpath não for definido, então o classpath do usuário consiste no diretório atual (`.`).

Como uma conveniência especial, um elemento de classpath que contém um nome base de um asterisco (*) é considerado equivalente a especificar uma lista de todos os arquivos no diretório com a extensão .jar ou .JAR. Um programa Java não consegue diferenciar entre as duas invocações. Por exemplo, se o diretório mydir contiver a.jar e b.JAR, então o elemento de classpath mydir/* é expandido para A.jar:b.JAR, exceto que a ordem dos arquivos JAR não é especificada. Todos os arquivos .jar no diretório especificado, mesmo os ocultos, são incluídos na lista. Uma entrada de classpath que consiste em um asterisco (*) se expande para uma lista de todos os arquivos jar no diretório atual. A variável de ambiente CLASSPATH, onde definida, é expandida de forma semelhante. Qualquer expansão de curinga de classpath ocorre antes que a Java VM seja iniciada. Programas Java nunca veem curingas que não são expandidos, exceto consultando o ambiente, como ao chamar System.getenv("CLASSPATH").

`--disable-@files` Pode ser usado em qualquer lugar na linha de comando, incluindo em um arquivo de argumento, para evitar a expansão posterior de @filename. Esta opção interrompe a expansão de @-argfiles após a opção.

`--enable-preview` Permite que as classes dependam de recursos de pré-visualização da versão.

`--module-path modulepath...` ou `-p modulepath` Uma lista de diretórios separados por ponto e vírgula (`;`) em que cada diretório é um diretório de módulos.

`--upgrade-module-path modulepath...` Uma lista de diretórios separados por ponto e vírgula (`;`) em que cada diretório é um diretório de módulos que substituem módulos atualizáveis na imagem de runtime.

`--add-modules module[,module...]` Especifica os módulos raiz a serem resolvidos além do módulo inicial. module também pode ser ALL-DEFAULT, ALL-SYSTEM e ALL-MODULE-PATH.

`--list-modules` Lista os módulos observáveis e então sai.

`-d module-name` ou `--describe-module module-name` Descreve um módulo especificado e então sai.

`--dry-run` Cria a VM, mas não executa o método main. Esta opção --dry-run pode ser útil para validar as opções de linha de comando, como a configuração do sistema de módulos.

`--validate-modules` Valida todos os módulos e sai. Esta opção é útil para encontrar conflitos e outros erros com módulos no module path.

`-Dproperty=value` Define um valor de propriedade de sistema. A variável property é uma string sem espaços que representa o nome da propriedade. A variável value é uma string que representa o valor da propriedade. Se value for uma string com espaços, então envolva-a em aspas (por exemplo -Dfoo="foo bar").

`-disableassertions[:[packagename]...|:classname]` ou `-da[:[packagename]...|:classname]` Desabilita asserções. Por padrão, as asserções são desabilitadas em todos os pacotes e classes. Sem argumentos, `-disableassertions` (`-da`) desabilita asserções em todos os pacotes e classes. Com o argumento `packagename` terminando em `...`, a chave desabilita asserções no pacote especificado e em quaisquer subpacotes. Se o argumento for simplesmente `...`, então a chave desabilita asserções no pacote sem nome no diretório de trabalho atual. Com o argumento classname, a chave desabilita asserções na classe especificada.

A opção `-disableassertions` (`-da`) se aplica a todos os class loaders e a classes de sistema (que não possuem um class loader). Há uma exceção a esta regra: Se a opção for fornecida sem argumentos, ela não se aplica a classes de sistema. Isso facilita a desabilitação de asserções em todas as classes, exceto nas classes de sistema. A opção `-disablesystemassertions` permite desabilitar asserções em todas as classes de sistema. Para habilitar explicitamente asserções em pacotes ou classes específicas, use a opção `-enableassertions` (`-ea`). Ambas as opções podem ser usadas ao mesmo tempo. Por exemplo, para executar a aplicação MyClass com asserções habilitadas no pacote `com.wombat.fruitbat` (e quaisquer subpacotes), mas desabilitadas na classe `com.wombat.fruitbat.Brickbat`, use o seguinte comando:

```
java -ea:com.wombat.fruitbat... -da:com.wombat.fruitbat.Brickbat MyClass
```

`-disablesystemassertions` ou `-dsa` Desabilita asserções em todas as classes de sistema.

`-enableassertions[:[packagename]...|:classname]` ou `-ea[:[packagename]...|:classname]` Habilita asserções. Por padrão, as asserções são desabilitadas em todos os pacotes e classes. Sem argumentos, `-enableassertions` (`-ea`) habilita asserções em todos os pacotes e classes. Com o argumento packagename terminando em `...`, a chave habilita asserções no pacote especificado e em quaisquer subpacotes. Se o argumento for simplesmente `...`, então a chave habilita asserções no pacote sem nome no diretório de trabalho atual. Com o argumento classname, a chave habilita asserções na classe especificada.

A opção `-enableassertions` (`-ea`) se aplica a todos os class loaders e a classes de sistema (que não possuem um class loader). Há uma exceção a esta regra: Se a opção for fornecida sem argumentos, ela não se aplica a classes de sistema. Isso facilita a habilitação de asserções em todas as classes, exceto nas classes de sistema.

A opção `-enablesystemassertions` fornece uma chave separada para habilitar asserções em todas as classes de sistema. Para desabilitar explicitamente asserções em pacotes ou classes específicas, use a opção `-disableassertions` (`-da`). Se um único comando contiver múltiplas instâncias dessas chaves, elas serão processadas em ordem, antes de carregar quaisquer classes. Por exemplo, para executar a aplicação `MyClass` com asserções habilitadas apenas no pacote `com.wombat.fruitbat` (e quaisquer subpacotes), mas desabilitadas na classe `com.wombat.fruitbat.Brickbat`, use o seguinte comando:

```
java -ea:com.wombat.fruitbat... -da:com.wombat.fruitbat.Brickbat MyClass
```

`-enablesystemassertions` ou `-esa` Habilita asserções em todas as classes de sistema.

`-help` , `-h`, ou `-?` Imprime a mensagem de ajuda no stream de erro.

`--help` Imprime a mensagem de ajuda no stream de saída.

`-javaagent:jarpath[=options]` Carrega o agente de linguagem de programação Java especificado.

`--show-version` Imprime a versão do produto no stream de saída e continua.

`-showversion` Imprime a versão do produto no stream de erro e continua.

`--show-module-resolution` Mostra a saída de resolução de módulo durante a inicialização.

`-splash:imagepath` Mostra a tela de splash com a imagem especificada por `imagepath`. Imagens escaladas HiDPI são automaticamente suportadas e usadas se disponíveis. O nome do arquivo de imagem não escalado, como `image.ext`, deve ser sempre passado como argumento para a opção `-splash`. A imagem escalada mais apropriada fornecida é selecionada automaticamente.

Por exemplo, para mostrar o arquivo `splash.gif` do diretório `images` ao iniciar sua aplicação, use a seguinte opção:

```
java -splash:images/splash.gif MyClass
```

`-verbose:class` Exibe informações sobre cada classe carregada.

`-verbose:gc` Exibe informações sobre cada evento de garbage collection (GC).

`-verbose:jni` Exibe informações sobre o uso de métodos nativos e outras atividades da Java Native Interface (JNI).

`-verbose:module` Exibe informações sobre os módulos em uso.

`--version` Imprime a versão do produto no stream de erro e sai.

`-version` Imprime a versão do produto no stream de saída e sai.

`-X` Imprime a ajuda sobre opções extras no stream de erro.

`--help-extra` Imprime a ajuda sobre opções extras no stream de saída.

`@argfile` Especifica um ou mais arquivos de argumento prefixados por @ usados pelo comando java. Não é incomum que a linha de comando java seja muito longa devido aos arquivos .jar necessários no classpath. A opção @argfile supera as limitações de comprimento da linha de comando, permitindo que o lançador expanda o conteúdo dos arquivos de argumento após a expansão do shell, mas antes do processamento dos argumentos. O conteúdo dos arquivos de argumento é expandido porque, caso contrário, eles seriam especificados na linha de comando até que a opção `-Xdisable-@files` fosse encontrada.

Os arquivos de argumento também podem conter o nome da classe principal e todas as opções. Se um arquivo de argumento contiver todas as opções exigidas pelo comando java, então a linha de comando poderia ser simplesmente:

```
java @args
```
## Opções Extras para Java

As seguintes opções `java` são opções de propósito geral que são específicas da Java HotSpot Virtual Machine.

`-Xbatch` Desabilita a compilação em segundo plano. Por padrão, a JVM compila o método como uma tarefa em segundo plano, executando o método no modo interpretador até que a compilação em segundo plano seja concluída. A flag `-Xbatch` desabilita a compilação em segundo plano para que a compilação de todos os métodos prossiga como uma tarefa em primeiro plano até ser concluída. Esta opção é equivalente a `-XX:-BackgroundCompilation`.

`-Xbootclasspath/a:directories|zip|JAR-files` Especifica uma lista de diretórios, arquivos JAR e arquivos ZIP para anexar ao final do classpath de bootstrap padrão.

  * **Linux e macOS:** Dois pontos (`:`) separam as entidades nesta lista.

  * **Windows:** Ponto e vírgula (`;`) separam as entidades nesta lista.

`-Xcheck:jni` Realiza verificações adicionais para funções Java Native Interface (JNI). Especificamente, ele valida os parâmetros passados para a função JNI e os dados do ambiente de tempo de execução antes de processar a requisição JNI. Ele também verifica exceções pendentes entre chamadas JNI. Qualquer dado inválido encontrado indica um problema no código nativo, e a JVM termina com um erro irrecuperável em tais casos. Espere uma degradação de desempenho quando esta opção for usada.

`-Xcomp` Força a compilação de métodos na primeira invocação. Por padrão, a Client VM (`-client`) executa 1.000 invocações de método interpretadas e a Server VM (`-server`) executa 10.000 invocações de método interpretadas para coletar informações para uma compilação eficiente. A especificação da opção `-Xcomp` desabilita as invocações de método interpretadas para aumentar o desempenho da compilação em detrimento da eficiência. Você também pode alterar o número de invocações de método interpretadas antes da compilação usando a opção `-XX:CompileThreshold`.

`-Xdebug` Não faz nada. Fornecido para compatibilidade retroativa.

`-Xdiag` Mostra mensagens de diagnóstico adicionais.

`-Xfuture` Habilita verificações rigorosas de formato de arquivo de classe que impõem conformidade estrita com a especificação de formato de arquivo de classe. Desenvolvedores devem usar esta flag ao desenvolver código novo. Verificações mais rigorosas podem se tornar o padrão em futuras versões.

`-Xint` Executa a aplicação no modo apenas interpretado. A compilação para código nativo é desabilitada, e todo o bytecode é executado pelo interpretador. Os benefícios de desempenho oferecidos pelo compilador just-in-time (JIT) não estão presentes neste modo.

`-Xinternalversion` Exibe informações mais detalhadas da versão da JVM do que a opção `-version`, e então sai.

`-Xloggc:option` Habilita o framework de logging unificado da JVM. Registra o status do GC em um arquivo com carimbos de data/hora.

`-Xlog:option` Configura ou habilita o logging com o framework de logging unificado da Java Virtual Machine (JVM). Veja Habilitar Logging com o Framework de Logging Unificado da JVM.

`-Xmixed` Executa todo o bytecode pelo interpretador, exceto para métodos "quentes" (hot methods), que são compilados para código nativo.

`-Xmn size` Define o tamanho inicial e máximo (em bytes) do heap para a young generation (berçário). Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, ou `g` ou `G` para indicar gigabytes. A região da young generation do heap é usada para novos objetos. O GC é realizado nesta região com mais frequência do que em outras regiões. Se o tamanho da young generation for muito pequeno, muitas coletas de lixo menores são realizadas. Se o tamanho for muito grande, apenas coletas de lixo completas são realizadas, o que pode levar muito tempo para ser concluído.

A Oracle recomenda que você mantenha o tamanho da young generation maior que `25%` e menor que `50%` do tamanho total do heap. Os exemplos a seguir mostram como definir o tamanho inicial e máximo da young generation para 256 MB usando várias unidades:

Em vez da opção `-Xmn` para definir o tamanho inicial e máximo do heap para a young generation, você pode usar `-XX:NewSize` para definir o tamanho inicial e `-XX:MaxNewSize` para definir o tamanho máximo.

`-Xms size` Define o tamanho mínimo e inicial (em bytes) do heap. Este valor deve ser um múltiplo de 1024 e maior que `1MB`. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, `g` ou `G` para indicar gigabytes. Os exemplos a seguir mostram como definir o tamanho da memória alocada para `6MB` usando várias unidades:

Se você não definir esta opção, o tamanho inicial será definido como a soma dos tamanhos alocados para a old generation e a young generation. O tamanho inicial do heap para a young generation pode ser definido usando a opção `-Xmn` ou a opção `-XX:NewSize`.

`-Xmx size` Especifica o tamanho máximo (em bytes) do pool de alocação de memória em bytes. Este valor deve ser um múltiplo de 1024 e maior que 2 MB. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, e `g` ou `G` para indicar gigabytes. O valor padrão é escolhido em tempo de execução com base na configuração do sistema. Para implantações de servidor, `-Xms` e `-Xmx` são frequentemente definidos com o mesmo valor. Os exemplos a seguir mostram como definir o tamanho máximo permitido de memória alocada para `80MB` usando várias unidades:

A opção `-Xmx` é equivalente a `-XX:MaxHeapSize`.

`-Xnoclassgc` Desabilita a coleta de lixo (GC) de classes. Isso pode economizar algum tempo de GC, o que encurta as interrupções durante a execução da aplicação. Quando você especifica `-Xnoclassgc` na inicialização, os objetos de classe na aplicação são deixados intocados durante o GC e são sempre considerados ativos. Isso pode resultar em mais memória sendo permanentemente ocupada, o que, se não for usado com cuidado, lança uma exceção de falta de memória (out-of-memory exception).

`-Xrs` Reduz o uso de sinais do sistema operacional pela JVM. Os shutdown hooks permitem o desligamento ordenado de uma aplicação Java, executando código de limpeza do usuário (como fechar conexões de banco de dados) no desligamento, mesmo que a JVM termine abruptamente.

  * **Linux e macOS:**

  * A JVM captura sinais para implementar shutdown hooks para terminação inesperada. A JVM usa `SIGHUP`, `SIGINT` e `SIGTERM` para iniciar a execução dos shutdown hooks.

  * Aplicações que incorporam a JVM frequentemente precisam capturar sinais como `SIGINT` ou `SIGTERM`, o que pode levar a interferência com os manipuladores de sinal da JVM. A opção `-Xrs` está disponível para resolver este problema. Quando `-Xrs` é usado, as máscaras de sinal para `SIGINT`, `SIGTERM`, `SIGHUP` e `SIGQUIT` não são alteradas pela JVM, e os manipuladores de sinal para esses sinais não são instalados.

  * **Windows:**

  * A JVM monitora eventos de controle de console para implementar shutdown hooks para terminação inesperada. Especificamente, a JVM registra um manipulador de controle de console que inicia o processamento do shutdown hook e retorna `TRUE` para `CTRL_C_EVENT`, `CTRL_CLOSE_EVENT`, `CTRL_LOGOFF_EVENT` e `CTRL_SHUTDOWN_EVENT`.

  * A JVM usa um mecanismo semelhante para implementar o recurso de despejo de pilhas de threads para fins de depuração. A JVM usa `CTRL_BREAK_EVENT` para realizar despejos de threads.

  * Se a JVM for executada como um serviço (por exemplo, como um motor de servlet para um servidor web), ela pode receber `CTRL_LOGOFF_EVENT` mas não deve iniciar o desligamento porque o sistema operacional não termina o processo. Para evitar possíveis interferências como esta, a opção `-Xrs` pode ser usada. Quando a opção `-Xrs` é usada, a JVM não instala um manipulador de controle de console, o que implica que ela não monitora ou processa `CTRL_C_EVENT`, `CTRL_CLOSE_EVENT`, `CTRL_LOGOFF_EVENT` ou `CTRL_SHUTDOWN_EVENT`.

Existem duas consequências de especificar `-Xrs`:

  * **Linux e macOS:** Despejos de thread `SIGQUIT` não estão disponíveis.
  * **Windows:** Despejos de thread Ctrl + Break não estão disponíveis.

O código do usuário é responsável por fazer com que os shutdown hooks sejam executados, por exemplo, chamando `System.exit()` quando a JVM deve ser terminada.

`-Xshare:mode` Define o modo de compartilhamento de dados de classe (CDS).

Os possíveis argumentos de modo para esta opção incluem o seguinte:

`auto` Usa CDS se possível. Este é o valor padrão para Java HotSpot 32-Bit Client VM.

`on` Requer o uso de CDS. Esta opção imprime uma mensagem de erro e sai se o compartilhamento de dados de classe não puder ser usado.

`off` Instruções para não usar CDS.

`-XshowSettings` Mostra todas as configurações e então continua.

`-XshowSettings:category` Mostra as configurações e continua. Os possíveis argumentos de categoria para esta opção incluem o seguinte:

`all` Mostra todas as categorias de configurações. Este é o valor padrão.

`locale` Mostra configurações relacionadas à localidade.

`properties` Mostra configurações relacionadas às propriedades do sistema.

`vm` Mostra as configurações da JVM.

`system` Linux: Mostra a configuração do sistema host ou contêiner e continua.

`-Xss size` Define o tamanho da pilha de threads (em bytes). Anexe a letra `k` ou `K` para indicar `KB`, `m` ou `M` para indicar `MB`, e `g` ou `G` para indicar `GB`. O valor padrão depende da plataforma:

  * Linux/x64 (64-bit): 1024 KB
  * macOS (64-bit): 1024 KB
  * Windows: O valor padrão depende da memória virtual

Os exemplos a seguir definem o tamanho da pilha de threads para 1024 KB em diferentes unidades:

Esta opção é semelhante a `-XX:ThreadStackSize`.

`-Xverify` Define o modo do verificador de bytecode.

`--add-reads module=target-module(,target-module)*` Atualiza o `module` para ler o `target-module`, independentemente da declaração do módulo. `target-module` pode ser `all unnamed` para ler todos os módulos sem nome.

`--add-exports module/package=target-module(,target-module)*` Atualiza o `module` para exportar `package` para `target-module`, independentemente da declaração do módulo. O `target-module` pode ser `all unnamed` para exportar para todos os módulos sem nome.

`--add-opens module/package=target-module(,target-module)*` Atualiza o `module` para abrir `package` para `target-module`, independentemente da declaração do módulo.

`--illegal-access=parameter` Quando presente em tempo de execução, `--illegal-access=` aceita um parâmetro de palavra-chave para especificar um modo de operação:

  * **permit** : Este modo abre cada pacote em cada módulo na imagem de tempo de execução para código em todos os módulos sem nome (como código no classpath), se esse pacote existia no JDK 8. Isso permite tanto o acesso estático (por exemplo, por bytecode compilado) quanto o acesso reflexivo profundo através das várias APIs de reflexão da plataforma. A primeira operação de acesso reflexivo a qualquer um desses pacotes causa a emissão de um aviso. No entanto, nenhum aviso é emitido após a primeira ocorrência. Este único aviso descreve como habilitar avisos adicionais. Este modo é o padrão para o JDK atual, mas mudará em uma versão futura.
  * **warn** : Este modo é idêntico a `permit`, exceto que uma mensagem de aviso é emitida para cada operação de acesso reflexivo ilegal.
  * **debug** : Este modo é idêntico a `warn`, exceto que tanto uma mensagem de aviso quanto um rastreamento de pilha são emitidos para cada operação de acesso reflexivo ilegal.
  * **deny** : Este modo desabilita todas as operações de acesso ilegal, exceto aquelas habilitadas por outras opções de linha de comando, como `--add-opens`. Este modo se tornará o padrão em uma versão futura.

O modo padrão, `--illegal-access=permit`, tem como objetivo alertá-lo sobre código no classpath que acessa reflexivamente quaisquer APIs internas do JDK pelo menos uma vez. Para saber sobre todos esses acessos, você pode usar os modos `warn` ou `debug`. Para cada biblioteca ou framework no classpath que requer acesso ilegal, você tem duas opções:

  * Se os mantenedores do componente já lançaram uma versão corrigida que não usa mais APIs internas do JDK, você pode considerar a atualização para essa versão.
  * Se o componente ainda precisa ser corrigido, você pode entrar em contato com seus mantenedores e pedir que substituam o uso de APIs internas do JDK pelas APIs exportadas apropriadas.

Se você deve continuar a usar um componente que requer acesso ilegal, você pode eliminar as mensagens de aviso usando uma ou mais opções `--add-opens` para abrir apenas os pacotes internos aos quais o acesso é necessário.

Para verificar se sua aplicação está pronta para uma futura versão do JDK, execute-a com `--illegal-access=deny` junto com quaisquer opções `--add-opens` necessárias. Quaisquer erros de acesso ilegal restantes provavelmente serão devido a referências estáticas de código compilado para APIs internas do JDK. Você pode identificá-los executando a ferramenta `jdeps` com a opção `--jdk-internals`. Por razões de desempenho, o JDK atual não emite avisos para operações de acesso estático ilegal.

`--limit-modules module[,module...]` Especifica o limite do universo de módulos observáveis.

`--patch-module module=file(;file)*` Sobrescreve ou aumenta um módulo com classes e recursos em arquivos JAR ou diretórios.

`--disable-@files` Pode ser usado em qualquer lugar na linha de comando, incluindo em um arquivo de argumento, para evitar a expansão adicional de `@filename`. Esta opção interrompe a expansão de `@-argfiles` após a opção.

`--source version` Define a versão da fonte no modo de arquivo de origem.

## Opções Extras para macOS

As seguintes opções extras são específicas do macOS.

`-XstartOnFirstThread` Executa o método `main()` na primeira thread (AppKit).

`-Xdock:name=application_name` Sobrescreve o nome padrão da aplicação exibido no dock.

`-Xdock:icon=path_to_icon_file` Sobrescreve o ícone padrão exibido no dock.

## Opções Avançadas de Tempo de Execução

Estas opções `java` controlam o comportamento de tempo de execução da Java HotSpot VM.

`-XX:ActiveProcessorCount=x` Sobrescreve o número de CPUs que a VM usará para calcular o tamanho dos pools de threads que ela usará para várias operações, como Garbage Collection e ForkJoinPool.

A VM normalmente determina o número de processadores disponíveis a partir do sistema operacional. Esta flag pode ser útil para particionar recursos de CPU ao executar múltiplos processos Java em contêineres docker. Esta flag é respeitada mesmo que `UseContainerSupport` não esteja habilitado. Veja `-XX:-UseContainerSupport` para uma descrição de como habilitar e desabilitar o suporte a contêineres.

`--XX:AllocateHeapAt=path` Aceita um caminho para o sistema de arquivos e usa mapeamento de memória para alocar o heap de objetos no dispositivo de memória. O uso desta opção permite que a HotSpot VM aloque o heap de objetos Java em um dispositivo de memória alternativo, como um `NV-DIMM`, especificado pelo usuário.

Dispositivos de memória alternativos que possuem a mesma semântica que a DRAM, incluindo a semântica de operações atômicas, podem ser usados em vez da DRAM para o heap de objetos sem alterar o código da aplicação existente. Todas as outras estruturas de memória (como o heap de código, metaspace e pilhas de threads) continuam a residir na DRAM.

Alguns sistemas operacionais expõem memória não-DRAM através do sistema de arquivos. Arquivos mapeados em memória nesses sistemas de arquivos ignoram o cache de página e fornecem um mapeamento direto da memória virtual para a memória física no dispositivo. As flags existentes relacionadas ao heap (como `-Xmx` e `-Xms`) e as flags relacionadas à coleta de lixo continuam a funcionar como antes.

`-XX:-CompactStrings` Desabilita o recurso Compact Strings. Por padrão, esta opção está habilitada. Quando esta opção está habilitada, Strings Java contendo apenas caracteres de byte único são internamente representadas e armazenadas como Strings de um byte por caractere usando a codificação `ISO-8859-1` / `Latin-1`. Isso reduz em 50% a quantidade de espaço necessária para Strings contendo apenas caracteres de byte único. Para Strings Java contendo pelo menos um caractere multibyte: estas são representadas e armazenadas como 2 bytes por caractere usando a codificação UTF-16. Desabilitar o recurso Compact Strings força o uso da codificação UTF-16 como representação interna para todas as Strings Java.

Os casos em que pode ser benéfico desabilitar Compact Strings incluem o seguinte:

  * Quando se sabe que uma aplicação alocará predominantemente Strings de caracteres multibyte
  * No evento inesperado em que uma regressão de desempenho é observada na migração do Java SE 8 para o Java SE 9 ou posterior e uma análise mostra que Compact Strings introduz a regressão

Em ambos os cenários, desabilitar Compact Strings faz sentido.

`-XX:CompilerDirectivesFile=file` Adiciona diretivas de um arquivo à pilha de diretivas quando um programa é iniciado. Veja Diretivas do Compilador e a Linha de Comando.

`-XX:CompilerDirectivesPrint` Imprime a pilha de diretivas quando o programa é iniciado ou quando uma nova diretiva é adicionada.

`-XX:ConcGCThreads=n` Define o número de threads de marcação paralelas. Define `n` para aproximadamente `1/4` do número de threads de coleta de lixo paralelas (`ParallelGCThreads`).

`-XX:+DisableAttachMechanism` Desabilita o mecanismo que permite que ferramentas se anexem à JVM. Por padrão, esta opção está desabilitada, o que significa que o mecanismo de anexação está habilitado e você pode usar ferramentas de diagnóstico e solução de problemas como `jcmd`, `jstack`, `jmap` e `jinfo`.

`-XX:ErrorFile=filename` Especifica o caminho e o nome do arquivo para o qual os dados de erro são gravados quando ocorre um erro irrecuperável. Por padrão, este arquivo é criado no diretório de trabalho atual e nomeado `hs_err_pidpid.log`, onde `pid` é o identificador do processo que causou o erro.

O exemplo a seguir mostra como definir o arquivo de log padrão (observe que o identificador do processo é especificado como `%p`):

  * **Linux e macOS:** O exemplo a seguir mostra como definir o log de erros para `/var/log/java/java_error.log`: `text
  * XX:ErrorFile=/var/log/java/java_error.log `
  * **Windows:** O exemplo a seguir mostra como definir o arquivo de log de erros para `C:/log/java/java_error.log`: `text
  * XX:ErrorFile=C:/log/java/java_error.log `

Se o arquivo não puder ser criado no diretório especificado (devido a espaço insuficiente, problema de permissão ou outro problema), o arquivo será criado no diretório temporário do sistema operacional:

  * **Linux e macOS:** O diretório temporário é `/tmp`.
  * **Windows:** O diretório temporário é especificado pelo valor da variável de ambiente `TMP`. Se essa variável de ambiente não estiver definida, o valor da variável de ambiente `TEMP` é usado.

`-XX:+ExtensiveErrorReports` Habilita o relatório de informações de erro mais extensas no ErrorFile. Esta opção pode ser ativada em ambientes onde se deseja o máximo de informações - mesmo que os logs resultantes possam ser bastante grandes e/ou conter informações que possam ser consideradas sensíveis. As informações podem variar de versão para versão e entre diferentes plataformas. Por padrão, esta opção está desabilitada.

`-XX:+FailOverToOldVerifier` Habilita o failover automático para o verificador antigo quando o novo verificador de tipo falha. Por padrão, esta opção está desabilitada e é ignorada (ou seja, tratada como desabilitada) para classes com uma versão recente de bytecode. Você pode habilitá-la para classes com versões mais antigas de bytecode.

`-XX:+FlightRecorder` Habilita o uso do Java Flight Recorder (JFR) durante o tempo de execução da aplicação.

`-XX:FlightRecorderOptions=parameter=value` Define os parâmetros que controlam o comportamento do JFR.

A lista a seguir contém as entradas `parameter=value` disponíveis do JFR:

`allow_threadbuffers_to_disk={true|false}` Especifica se os buffers de thread são gravados diretamente no disco se o thread do buffer estiver bloqueado. Por padrão, este parâmetro está desabilitado.

`globalbuffersize=size` Especifica a quantidade total de memória primária usada para retenção de dados. O valor padrão é baseado no valor especificado para `memorysize`. Altere o parâmetro `memorysize` para alterar o tamanho dos buffers globais.

`maxchunksize=size` Especifica o tamanho máximo (em bytes) dos blocos de dados em uma gravação. Anexe `m` ou `M` para especificar o tamanho em megabytes (MB), e `g` ou `G` para especificar o tamanho em gigabytes (GB). Por padrão, o tamanho máximo dos blocos de dados é definido como 12 MB. O mínimo permitido é 1 MB.

`memorysize=size` Determina quanta memória de buffer deve ser usada e define os parâmetros `globalbuffersize` e `numglobalbuffers` com base no tamanho especificado. Anexe `m` ou `M` para especificar o tamanho em megabytes (MB), e `g` ou `G` para especificar o tamanho em gigabytes (GB). Por padrão, o tamanho da memória é definido como 10 MB.

`numglobalbuffers` Especifica o número de buffers globais usados. O valor padrão é baseado no tamanho da memória especificado. Altere o parâmetro `memorysize` para alterar o número de buffers globais.

`old-object-queue-size=number-of-objects` Número máximo de objetos antigos a serem rastreados. Por padrão, o número de objetos é definido como 256.

`repository=path` Especifica o repositório (um diretório) para armazenamento temporário em disco. Por padrão, o diretório temporário do sistema é usado.

`retransform={true|false}` Especifica se as classes de evento devem ser retransformadas usando JVMTI. Se `false`, a instrumentação é adicionada quando as classes de evento são carregadas. Por padrão, este parâmetro está habilitado.

`samplethreads={true|false}` Especifica se a amostragem de threads está habilitada. A amostragem de threads ocorre apenas se o evento de amostragem estiver habilitado junto com este parâmetro. Por padrão, este parâmetro está habilitado.

`stackdepth=depth` Profundidade da pilha para rastreamentos de pilha. Por padrão, a profundidade é definida como 64 chamadas de método. O máximo é 2048. Valores maiores que 64 podem criar uma sobrecarga significativa e reduzir o desempenho.

`threadbuffersize=size` Especifica o tamanho do buffer local por thread (em bytes). Por padrão, o tamanho do buffer local é definido como 8 kilobytes. Sobrescrever este parâmetro pode reduzir o desempenho e não é recomendado.

Você pode especificar valores para múltiplos parâmetros separando-os com uma vírgula.

`-XX:InitiatingHeapOccupancyPercent=n` Define o limite de ocupação do heap Java que aciona um ciclo de marcação. A ocupação padrão é de 45% de todo o heap Java.

`-XX:LargePageSizeInBytes=size` Linux e macOS: Define o tamanho máximo (em bytes) para páginas grandes usadas para o heap Java. O argumento `size` deve ser uma potência de `2` (`2`, `4`, `8`, `16`, e assim por diante). Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, e `g` ou `G` para indicar gigabytes. Por padrão, o tamanho é definido como `0`, o que significa que a JVM escolhe o tamanho para páginas grandes automaticamente.

O exemplo a seguir descreve como definir o tamanho da página grande para 4 megabytes (`MB`):

`-XX:MaxDirectMemorySize=size` Define o tamanho total máximo (em bytes) das alocações de buffer direto do pacote `java.nio`. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, e `g` ou `G` para indicar gigabytes. Por padrão, o tamanho é definido como `0`, o que significa que a JVM escolhe o tamanho para as alocações de buffer direto NIO automaticamente.

Os exemplos a seguir ilustram como definir o tamanho NIO para 1024 KB em diferentes unidades:

`-XX:-MaxFDLimit` Desabilita a tentativa de definir o limite suave para o número de descritores de arquivo abertos para o limite rígido. Por padrão, esta opção está habilitada em todas as plataformas, mas é ignorada no Windows. A única vez que você pode precisar desabilitá-la é no Mac OS, onde seu uso impõe um máximo de 10240, que é menor que o máximo real do sistema.

`-XX:MaxGCPauseMillis=ms` Define um valor alvo para o tempo máximo de pausa desejado. O valor padrão é 200 milissegundos. O valor especificado não se adapta ao tamanho do seu heap.

`-XX:NativeMemoryTracking=mode` Especifica o modo para rastrear o uso de memória nativa da JVM. Os possíveis argumentos de modo para esta opção incluem o seguinte:

`off` Instruções para não rastrear o uso de memória nativa da JVM. Este é o comportamento padrão se você não especificar a opção `-XX:NativeMemoryTracking`.

`summary` Rastreia o uso de memória apenas por subsistemas da JVM, como heap Java, classe, código e thread.

`detail` Além de rastrear o uso de memória por subsistemas da JVM, rastreia o uso de memória por `CallSite` individual, região de memória virtual individual e suas regiões comprometidas.

`-XX:ObjectAlignmentInBytes=alignment` Define o alinhamento de memória de objetos Java (em bytes). Por padrão, o valor é definido como 8 bytes. O valor especificado deve ser uma potência de `2` e deve estar dentro do intervalo de `8` e `256` (inclusive). Esta opção possibilita o uso de ponteiros compactados com grandes tamanhos de heap Java.

O limite de tamanho do heap em bytes é calculado como:

`-XX:OnError=string` Define um comando personalizado ou uma série de comandos separados por ponto e vírgula para serem executados quando ocorre um erro irrecuperável. Se a string contiver espaços, ela deve ser colocada entre aspas.

  * **Linux e macOS:** O exemplo a seguir mostra como a opção `-XX:OnError` pode ser usada para executar o comando `gcore` para criar a imagem do core, e o depurador é iniciado para anexar ao processo em caso de um erro irrecuperável (o `%p` designa o processo atual):

  * **Windows:** O exemplo a seguir mostra como a opção `-XX:OnError` pode ser usada para executar o utilitário `userdump.exe` para obter um despejo de falha em caso de um erro irrecuperável (o `%p` designa o processo atual). Este exemplo assume que o caminho para o utilitário `userdump.exe` está especificado na variável de ambiente `PATH`: `text
  * XX:OnError="userdump.exe %p" `

`-XX:OnOutOfMemoryError=string` Define um comando personalizado ou uma série de comandos separados por ponto e vírgula para serem executados quando uma exceção `OutOfMemoryError` é lançada pela primeira vez. Se a string contiver espaços, ela deve ser colocada entre aspas. Para um exemplo de string de comando, veja a descrição da opção `-XX:OnError`.

`-XX:ParallelGCThreads=n` Define o valor das threads de trabalho STW. Define o valor de `n` para o número de processadores lógicos. O valor de `n` é o mesmo que o número de processadores lógicos até um valor de 8. Se houver mais de `8` processadores lógicos, esta opção define o valor de `n` para aproximadamente 5/8 dos processadores lógicos. Isso funciona na maioria dos casos, exceto para sistemas SPARC maiores, onde o valor de `n` pode ser aproximadamente `5/16` dos processadores lógicos.

`-XX:+PerfDataSaveToFile` Se habilitado, salva dados binários `jstat` quando a aplicação Java é encerrada. Esses dados binários são salvos em um arquivo chamado `hsperfdata_pid`, onde `pid` é o identificador do processo da aplicação Java que você executou. Use o comando `jstat` para exibir os dados de desempenho contidos neste arquivo da seguinte forma:

`-XX:+PrintCommandLineFlags` Habilita a impressão de flags da JVM selecionadas ergonomicamente que apareceram na linha de comando. Pode ser útil saber os valores ergonômicos definidos pela JVM, como o tamanho do espaço do heap e o coletor de lixo selecionado. Por padrão, esta opção está desabilitada e as flags não são impressas.

`-XX:+PreserveFramePointer` Seleciona entre usar o registrador RBP como um registrador de propósito geral (`-XX:-PreserveFramePointer`) e usar o registrador RBP para manter o ponteiro de quadro do método atualmente em execução (`-XX:+PreserveFramePointer`). Se o ponteiro de quadro estiver disponível, ferramentas de perfil externo (por exemplo, Linux perf) podem construir rastreamentos de pilha mais precisos.

`-XX:+PrintNMTStatistics` Habilita a impressão de dados de rastreamento de memória nativa coletados na saída da JVM quando o rastreamento de memória nativa está habilitado (veja `-XX:NativeMemoryTracking`). Por padrão, esta opção está desabilitada e os dados de rastreamento de memória nativa não são impressos.

`-XX:+RelaxAccessControlCheck` Diminui a quantidade de verificações de controle de acesso no verificador. Por padrão, esta opção está desabilitada e é ignorada (ou seja, tratada como desabilitada) para classes com uma versão recente de bytecode. Você pode habilitá-la para classes com versões mais antigas de bytecode.

`-XX:SharedArchiveFile=path` Especifica o caminho e o nome do arquivo de arquivo de compartilhamento de dados de classe (CDS).

`-XX:SharedArchiveConfigFile=shared_config_file` Especifica dados compartilhados adicionais adicionados ao arquivo de arquivo.

`-XX:SharedClassListFile=file_name` Especifica o arquivo de texto que contém os nomes das classes a serem armazenadas no arquivo de compartilhamento de dados de classe (CDS). Este arquivo contém o nome completo de uma classe por linha, exceto que barras (`/`) substituem pontos (`.`). Por exemplo, para especificar as classes `java.lang.Object` e `hello.Main`, crie um arquivo de texto que contenha as duas linhas a seguir:

As classes que você especifica neste arquivo de texto devem incluir as classes que são comumente usadas pela aplicação. Elas podem incluir quaisquer classes dos classpaths da aplicação, extensão ou bootstrap.

`-XX:+ShowMessageBoxOnError` Habilita a exibição de uma caixa de diálogo quando a JVM encontra um erro irrecuperável. Isso impede que a JVM saia e mantém o processo ativo para que você possa anexar um depurador a ele para investigar a causa do erro. Por padrão, esta opção está desabilitada.

`-XX:StartFlightRecording=parameter=value` Inicia uma gravação JFR para a aplicação Java. Esta opção é equivalente ao comando de diagnóstico `JFR.start` que inicia uma gravação durante o tempo de execução. Você pode definir as seguintes entradas `parameter=value` ao iniciar uma gravação JFR:

`delay=time` Especifica o atraso entre o tempo de inicialização da aplicação Java e o início da gravação. Anexe `s` para especificar o tempo em segundos, `m` para minutos, `h` para horas e `d` para dias. Por exemplo, especificar `10m` significa 10 minutos. Por padrão, não há atraso, e este parâmetro é definido como 0.

`disk={true|false}` Especifica se os dados devem ser gravados no disco durante a gravação. Por padrão, este parâmetro está habilitado.

`dumponexit={true|false}` Especifica se a gravação em execução é despejada quando a JVM é desligada. Se habilitado e um nome de arquivo não for inserido, a gravação é gravada em um arquivo no diretório onde o processo foi iniciado. O nome do arquivo é um nome gerado pelo sistema que contém o ID do processo, ID da gravação e carimbo de data/hora atual, semelhante a `hotspot-pid-47496-id-1-2018_01_25_19_10_41.jfr`. Por padrão, este parâmetro está desabilitado.

`duration=time` Especifica a duração da gravação. Anexe `s` para especificar o tempo em segundos, `m` para minutos, `h` para horas e `d` para dias. Por exemplo, especificar `5h` significa 5 horas. Por padrão, a duração não é limitada, e este parâmetro é definido como 0.

`filename=path` Especifica o caminho e o nome do arquivo para o qual a gravação é gravada quando a gravação é interrompida, por exemplo:

  * `recording.jfr`
  * `/home/user/recordings/recording.jfr`
  * `c:\recordings\recording.jfr`

`name=identifier` Aceita tanto o nome quanto o identificador de uma gravação.

`maxage=time` Especifica a idade máxima dos dados em disco a serem mantidos para a gravação. Este parâmetro é válido apenas quando o parâmetro `disk` é definido como `true`. Anexe `s` para especificar o tempo em segundos, `m` para minutos, `h` para horas e `d` para dias. Por exemplo, especificar `30s` significa 30 segundos. Por padrão, a idade máxima não é limitada, e este parâmetro é definido como `0s`.

`maxsize=size` Especifica o tamanho máximo (em bytes) dos dados em disco a serem mantidos para a gravação. Este parâmetro é válido apenas quando o parâmetro `disk` é definido como `true`. O valor não deve ser menor que o valor do parâmetro `maxchunksize` definido com `-XX:FlightRecorderOptions`. Anexe `m` ou `M` para especificar o tamanho em megabytes, e `g` ou `G` para especificar o tamanho em gigabytes (`GB`). Por padrão, o tamanho máximo dos dados em disco não é limitado, e este parâmetro é definido como `0`.

`path-to-gc-roots={true|false}` Especifica se o caminho para as raízes da coleta de lixo (GC) deve ser coletado no final de uma gravação. Por padrão, este parâmetro está desabilitado.

O caminho para as raízes do GC é útil para encontrar vazamentos de memória, mas sua coleta consome tempo. Habilite esta opção apenas quando você iniciar uma gravação para uma aplicação que você suspeita ter um vazamento de memória. Se o parâmetro `settings` estiver definido como `profile`, o rastreamento de pilha de onde o objeto potencialmente vazando foi alocado é incluído nas informações coletadas.

`settings=path` Especifica o caminho e o nome do arquivo de configurações de evento (do tipo JFC). Por padrão, o arquivo `default.jfc` é usado, que está localizado em `JRE_HOME/lib/jfr`. Este arquivo de configurações padrão coleta um conjunto predefinido de informações com baixa sobrecarga, portanto, tem impacto mínimo no desempenho e pode ser usado com gravações que são executadas continuamente.

Um segundo arquivo de configurações também é fornecido, `profile.jfc`, que fornece mais dados do que a configuração padrão, mas pode ter mais sobrecarga e impactar o desempenho. Use esta configuração por curtos períodos de tempo quando mais informações forem necessárias.

Você pode especificar valores para múltiplos parâmetros separando-os com uma vírgula.

`-XX:ThreadStackSize=size` Define o tamanho da pilha de threads Java (em kilobytes). O uso de um sufixo de escala, como `k`, resulta na escala do valor em kilobytes para que `-XX:ThreadStackSize=1k` defina o tamanho da pilha de threads Java para `1024*1024` bytes ou `1` megabyte. O valor padrão depende da plataforma:

  * Linux: 1024 KB
  * macOS: 1024 KB
  * Windows: O valor padrão depende da memória virtual.

Os exemplos a seguir mostram como definir o tamanho da pilha de threads para 1 megabyte em diferentes unidades:

Esta opção é semelhante a `-Xss`.

`-XX:-UseBiasedLocking` Desabilita o uso de bloqueio enviesado (biased locking). Algumas aplicações com quantidades significativas de sincronização não contestada podem obter acelerações significativas com esta flag habilitada, mas aplicações com certos padrões de bloqueio podem observar desacelerações.
Por padrão, esta opção está ativada.

`-XX:-UseCompressedOops` Desativa o uso de ponteiros comprimidos. Por padrão, esta opção está ativada, e ponteiros comprimidos são usados quando os tamanhos de heap Java são menores que 32 GB. Quando esta opção está ativada, as referências de objeto são representadas como offsets de 32 bits em vez de ponteiros de 64 bits, o que tipicamente aumenta o desempenho ao executar a aplicação com tamanhos de heap Java menores que 32 GB. Esta opção funciona apenas para JVMs de 64 bits.

Também é possível usar ponteiros comprimidos quando os tamanhos de heap Java são maiores que 32 GB. Consulte a opção `-XX:ObjectAlignmentInBytes`.

`-XX:-UseContainerSupport` A VM agora oferece suporte automático à detecção de contêineres, o que permite à VM determinar a quantidade de memória e o número de processadores disponíveis para um processo Java em execução em contêineres docker. Ela usa essas informações para alocar recursos do sistema. Este suporte está disponível apenas em plataformas Linux x64. Se suportado, o padrão para esta flag é true, e o suporte a contêineres é ativado por padrão. Pode ser desativado com `-XX:-UseContainerSupport`.

O Unified Logging está disponível para ajudar a diagnosticar problemas relacionados a este suporte.

Use `-Xlog:os+container=trace` para o registro máximo de informações do contêiner. Consulte Habilitar Logging com o JVM Unified Logging Framework para uma descrição do uso do Unified Logging.

`-XX:+UseGCLogRotation` Lida com arquivos de log grandes. Esta opção deve ser usada com `-Xloggc:filename`.

`-XX:NumberOfGClogFiles=number_of_files` Lida com arquivos de log grandes. O number_of_files deve ser maior ou igual a `1`. O padrão é `1`.

`-XX:GCLogFileSize=number` Lida com arquivos de log grandes. O number pode estar na forma de numberM ou numberK. O padrão é definido como `512K`.

`-XX:+UseHugeTLBFS` Apenas Linux: Esta opção é o equivalente a especificar -XX:+UseLargePages. Esta opção está desativada por padrão. Esta opção pré-aloca todas as large pages antecipadamente, quando a memória é reservada; consequentemente, a JVM não pode expandir ou reduzir dinamicamente as áreas de memória de large pages. Consulte `-XX:UseTransparentHugePages` se desejar este comportamento.

`-XX:+UseLargePages` Ativa o uso de memória de large pages. Por padrão, esta opção está desativada e a memória de large pages não é usada.

`-XX:+UseMembar` Ativa a emissão de membars em transições de estado de thread. Esta opção está desativada por padrão em todas as plataformas, exceto em servidores ARM, onde está ativada. (Recomenda-se que você não desative esta opção em servidores ARM.)

`-XX:+UsePerfData` Ativa o recurso perfdata. Esta opção está ativada por padrão para permitir o monitoramento da JVM e testes de desempenho. Desativá-la suprime a criação dos diretórios `hsperfdata_userid`. Para desativar o recurso perfdata, especifique `-XX:-UsePerfData`.

`-XX:+UseTransparentHugePages` Apenas Linux: Ativa o uso de large pages que podem crescer ou diminuir dinamicamente. Esta opção está desativada por padrão. Você pode encontrar problemas de desempenho com transparent huge pages, pois o sistema operacional move outras páginas para criar huge pages; esta opção é disponibilizada para experimentação.

`-XX:+AllowUserSignalHandlers` Ativa a instalação de manipuladores de sinal pela aplicação. Por padrão, esta opção está desativada e a aplicação não tem permissão para instalar manipuladores de sinal.

`-XX:VMOptionsFile=filename` Permite ao usuário especificar opções da VM em um arquivo, por exemplo:

## Opções Avançadas do Compilador JIT

Estas opções Java controlam a compilação dinâmica just-in-time (JIT) realizada pela Java HotSpot VM.

`-XX:AllocateInstancePrefetchLines=lines` Define o número de linhas a serem pré-buscadas à frente do ponteiro de alocação de instância. Por padrão, o número de linhas a serem pré-buscadas é definido como 1:

Apenas a Java HotSpot Server VM suporta esta opção.

`-XX:AllocatePrefetchDistance=size` Define o tamanho (em bytes) da distância de pré-busca para alocação de objetos. A memória prestes a ser escrita com o valor de novos objetos é pré-buscada até esta distância, começando do endereço do último objeto alocado. Cada thread Java tem seu próprio ponto de alocação.

Valores negativos indicam que a distância de pré-busca é escolhida com base na plataforma. Valores positivos são bytes a serem pré-buscados. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, e `g` ou `G` para indicar gigabytes. O valor padrão é definido como `-1`.

O exemplo a seguir mostra como definir a distância de pré-busca para 1024 bytes:

Apenas a Java HotSpot Server VM suporta esta opção.

`-XX:AllocatePrefetchInstr=instruction` Define a instrução de pré-busca para pré-buscar à frente do ponteiro de alocação. Apenas a Java HotSpot Server VM suporta esta opção. Os valores possíveis são de `0` a `3`. As instruções reais por trás dos valores dependem da plataforma. Por padrão, a instrução de pré-busca é definida como `0`:

Apenas a Java HotSpot Server VM suporta esta opção.

`-XX:AllocatePrefetchLines=lines` Define o número de linhas de cache a serem carregadas após a última alocação de objeto, usando as instruções de pré-busca geradas no código compilado. O valor padrão é 1 se o último objeto alocado foi uma instância, e 3 se foi um array.

O exemplo a seguir mostra como definir o número de linhas de cache carregadas para 5:

Apenas a Java HotSpot Server VM suporta esta opção.

`-XX:AllocatePrefetchStyle=style` Define o estilo de código gerado para instruções de pré-busca. O argumento style é um inteiro de 0 a 3:

`0` Não gerar instruções de pré-busca.

`1` Executar instruções de pré-busca após cada alocação. Este é o parâmetro padrão.

`2` Usar o ponteiro de marca d'água do bloco de alocação local de thread (TLAB) para determinar quando as instruções de pré-busca são executadas.

`3` Usar a instrução BIS em SPARC para pré-busca de alocação.

Apenas a Java HotSpot Server VM suporta esta opção.

`-XX:+BackgroundCompilation` Ativa a compilação em segundo plano. Esta opção está ativada por padrão. Para desativar a compilação em segundo plano, especifique -XX:-BackgroundCompilation (isso é equivalente a especificar -Xbatch).

`-XX:CICompilerCount=threads` Define o número de threads do compilador a serem usadas para compilação. Por padrão, o número de threads é definido como 2 para a JVM do servidor, 1 para a JVM do cliente, e escala para o número de núcleos se a compilação em camadas for usada. O exemplo a seguir mostra como definir o número de threads para `2`:

`-XX:CompileCommand=command,method[,option]` Especifica um comando a ser executado em um método. Por exemplo, para excluir o método `indexOf()` da classe String de ser compilado, use o seguinte:

Se o método for especificado sem a assinatura, o comando é aplicado a todos os métodos com o nome especificado. No entanto, você também pode especificar a assinatura do método no formato de arquivo de classe. Neste caso, você deve envolver os argumentos entre aspas, caso contrário, o shell tratará o ponto e vírgula como um fim de comando. Por exemplo, se você deseja excluir apenas o método indexOf(String) da classe String de ser compilado, use o seguinte:

Você também pode usar o asterisco (`*`) como um curinga para nomes de classes e métodos. Por exemplo, para excluir todos os métodos `indexOf()` em todas as classes de serem compilados, use o seguinte:

As vírgulas e pontos são aliases para espaços, tornando mais fácil passar comandos do compilador através de um shell. Você pode passar argumentos para `-XX:CompileCommand` usando espaços como separadores, envolvendo o argumento entre aspas:

Observe que, após analisar os comandos passados na linha de comando usando as opções `-XX:CompileCommand`, o compilador JIT lê os comandos do arquivo `.hotspot_compiler`. Você pode adicionar comandos a este arquivo ou especificar um arquivo diferente usando a opção `-XX:CompileCommandFile`.

Para adicionar vários comandos, especifique a opção -XX:CompileCommand várias vezes ou separe cada argumento com o separador de nova linha (`\n`). Os seguintes comandos estão disponíveis:

`break` Define um breakpoint ao depurar a JVM para parar no início da compilação do método especificado.

`compileonly` Exclui todos os métodos da compilação, exceto o método especificado. Como alternativa, você pode usar a opção `-XX:CompileOnly`, que permite especificar vários métodos.

`dontinline` Impede o inlining do método especificado.

`exclude` Exclui o método especificado da compilação.

`help` Imprime uma mensagem de ajuda para a opção `-XX:CompileCommand`.

`inline` Tenta fazer o inlining do método especificado.

`log` Exclui o registro de compilação (com a opção -XX:+LogCompilation) para todos os métodos, exceto o método especificado. Por padrão, o registro é realizado para todos os métodos compilados.

`option` Passa uma opção de compilação JIT para o método especificado no lugar do último argumento (option). A opção de compilação é definida no final, após o nome do método. Por exemplo, para ativar a opção BlockLayoutByFrequency para o método `append()` da classe `StringBuffer`, use o seguinte:

Você pode especificar múltiplas opções de compilação, separadas por vírgulas ou espaços.

`print` Imprime o código assembly gerado após a compilação do método especificado.

`quiet` Instruções para não imprimir os comandos de compilação. Por padrão, os comandos que você especifica com a opção `-XX:CompileCommand` são impressos. Por exemplo, se você excluir da compilação o método `indexOf()` da classe String, então o seguinte é impresso na saída padrão:

Você pode suprimir isso especificando a opção `-XX:CompileCommand=quiet` antes de outras opções `-XX:CompileCommand`.

`-XX:CompileCommandFile=filename` Define o arquivo do qual os comandos do compilador JIT são lidos. Por padrão, o arquivo `.hotspot_compiler` é usado para armazenar comandos executados pelo compilador JIT.

Cada linha no arquivo de comando representa um comando, um nome de classe e um nome de método para o qual o comando é usado. Por exemplo, esta linha imprime o código assembly para o método `toString()` da classe String:

Se você estiver usando comandos para o compilador JIT executar em métodos, consulte a opção -XX:CompileCommand.

`-XX:CompileOnly=methods` Define a lista de métodos (separados por vírgulas) aos quais a compilação deve ser restrita. Apenas os métodos especificados são compilados. Especifique cada método com o nome completo da classe (incluindo os pacotes e subpacotes). Por exemplo, para compilar apenas o método length() da classe String e o método `size()` da classe List, use o seguinte:

Observe que o nome completo da classe é especificado, incluindo todos os pacotes e subpacotes separados por uma barra (`/`). Para operações mais fáceis de copiar e colar, também é possível usar o formato de nome de método produzido pelas opções `-XX:+PrintCompilation` e `-XX:+LogCompilation`:

Embora curingas não sejam suportados, você pode especificar apenas o nome da classe ou pacote para compilar todos os métodos nessa classe ou pacote, bem como especificar apenas o método para compilar os métodos com este nome em qualquer classe:

`-XX:CompileThreshold=invocations` Define o número de invocações de métodos interpretados antes da compilação. Por padrão, na JVM do servidor, o compilador JIT executa 10.000 invocações de métodos interpretados para coletar informações para uma compilação eficiente. Para a JVM do cliente, a configuração padrão é de 1.500 invocações. Esta opção é ignorada quando a compilação em camadas está ativada. Consulte a opção `-XX:-TieredCompilation`. O exemplo a seguir mostra como definir o número de invocações de métodos interpretados para `5.000`:

Você pode desativar completamente a interpretação de métodos Java antes da compilação especificando a opção -Xcomp.

`-XX:CompileThresholdScaling=scale` Fornece controle unificado da primeira compilação. Esta opção controla quando os métodos são compilados pela primeira vez para os modos de operação em camadas (tiered) e `não em camadas` (nontiered). A opção `CompileThresholdScaling` tem um valor inteiro entre 0 e +Inf e escala os limites correspondentes ao modo de operação atual (tanto em camadas quanto `não em camadas`). Definir `CompileThresholdScaling` para um valor menor que `1.0` resulta em compilação mais cedo, enquanto valores maiores que 1.0 atrasam a compilação. Definir CompileThresholdScaling como 0 é equivalente a desativar a compilação.

`-XX:+DoEscapeAnalysis` Ativa o uso da análise de escape. Esta opção está ativada por padrão. Para desativar o uso da análise de escape, especifique `-XX:-DoEscapeAnalysis`. Apenas a Java HotSpot Server VM suporta esta opção.

`-XX:InitialCodeCacheSize=size` Define o tamanho inicial do cache de código (em bytes). Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, e `g` ou `G` para indicar gigabytes. O valor padrão é definido como `500 KB`. O tamanho inicial do cache de código não deve ser menor que o tamanho mínimo da página de memória do sistema. O exemplo a seguir mostra como definir o tamanho inicial do cache de código para `32 KB`:

`-XX:+Inline` Ativa o inlining de métodos. Esta opção está ativada por padrão para aumentar o desempenho. Para desativar o inlining de métodos, especifique `-XX:-Inline`.

`-XX:InlineSmallCode=size` Define o tamanho máximo do código (em bytes) para métodos compilados que devem ser inlined. Anexe a letra k ou K para indicar kilobytes, m ou M para indicar megabytes, e `g` ou `G` para indicar gigabytes. Apenas métodos compilados com tamanho menor que o tamanho especificado são inlined. Por padrão, o tamanho máximo do código é definido como 1000 bytes:

`-XX:+LogCompilation` Ativa o registro da atividade de compilação em um arquivo chamado `hotspot.log` no diretório de trabalho atual. Você pode especificar um caminho e nome de arquivo de log diferente usando a opção `-XX:LogFile`.

Por padrão, esta opção está desativada e a atividade de compilação não é registrada. A opção `-XX:+LogCompilation` deve ser usada em conjunto com a opção `-XX:UnlockDiagnosticVMOptions` que desbloqueia as opções de diagnóstico da JVM.

Você pode ativar a saída de diagnóstico detalhada com uma mensagem impressa no console toda vez que um método é compilado usando a opção `-XX:+PrintCompilation`.

`-XX:MaxInlineSize=size` Define o tamanho máximo do bytecode (em bytes) de um método a ser inlined. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, e `g` ou `G` para indicar gigabytes. Por padrão, o tamanho máximo do bytecode é definido como 35 bytes:

`-XX:MaxNodeLimit=nodes` Define o número máximo de nós a serem usados durante a compilação de um único método. Por padrão, o número máximo de nós é definido como 65.000:

`-XX:NonNMethodCodeHeapSize=size` Define o tamanho em bytes do segmento de código contendo código não-método.

Um segmento de código não-método contendo código não-método, como buffers do compilador e o interpretador de bytecode. Este tipo de código permanece no code cache para sempre. Esta flag é usada apenas se `—XX:SegmentedCodeCache` estiver ativada.

`—XX:NonProfiledCodeHeapSize=size` Define o tamanho em bytes do segmento de código contendo métodos `não-profilados`. Esta flag é usada apenas se `—XX:SegmentedCodeCache` estiver ativada.

`-XX:MaxTrivialSize=size` Define o tamanho máximo do bytecode (em bytes) de um método trivial a ser inlined. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, e `g` ou `G` para indicar gigabytes. Por padrão, o tamanho máximo do bytecode de um método trivial é definido como 6 bytes:

`-XX:+OptimizeStringConcat` Ativa a otimização de operações de concatenação de String. Esta opção está ativada por padrão. Para desativar a otimização de operações de concatenação de String, especifique `-XX:-OptimizeStringConcat`. Apenas a Java HotSpot Server VM suporta esta opção.

`-XX:+PrintAssembly` Ativa a impressão de código assembly para métodos bytecode e nativos usando a biblioteca externa hsdis-.so ou .dll. Para VM de 64 bits no Windows, é hsdis-amd64.dll. Isso permite que você veja o código gerado, o que pode ajudar a diagnosticar problemas de desempenho.

Por padrão, esta opção está desativada e o código assembly não é impresso. A opção -XX:+PrintAssembly deve ser usada em conjunto com a opção -XX:UnlockDiagnosticVMOptions que desbloqueia as opções de diagnóstico da JVM.

`-XX:ProfiledCodeHeapSize=size` Define o tamanho em bytes do segmento de código contendo métodos profilados. Esta flag é usada apenas se -XX:SegmentedCodeCache estiver ativada.

`-XX:+PrintCompilation` Ativa a saída de diagnóstico detalhada da JVM, imprimindo uma mensagem no console toda vez que um método é compilado. Isso permite que você veja quais métodos são realmente compilados. Por padrão, esta opção está desativada e a saída de diagnóstico não é impressa.

Você também pode registrar a atividade de compilação em um arquivo usando a opção -XX:+LogCompilation.

`-XX:+PrintInlining` Ativa a impressão de decisões de inlining. Isso permite que você veja quais métodos estão sendo inlined.

Por padrão, esta opção está desativada e as informações de inlining não são impressas. A opção `-XX:+PrintInlining` deve ser usada em conjunto com a opção `-XX:+UnlockDiagnosticVMOptions` que desbloqueia as opções de diagnóstico da JVM.

`-XX:ReservedCodeCacheSize=size` Define o tamanho máximo do cache de código (em bytes) para código compilado JIT. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, e `g` ou `G` para indicar gigabytes. O tamanho máximo padrão do cache de código é de 240 MB, a menos que você desative a compilação em camadas com a opção `-XX:-TieredCompilation`, então o tamanho padrão é de 48 MB. Esta opção tem um limite de 2 GB; caso contrário, um erro é gerado. O tamanho máximo do cache de código não deve ser menor que o tamanho inicial do cache de código. Consulte a opção `-XX:InitialCodeCacheSize`.

`-XX:RTMAbortRatio=abort_ratio` Especifica a taxa de aborto RTM como uma porcentagem (`%`) de todas as transações RTM executadas. Se o número de transações abortadas se tornar maior que esta taxa, o código compilado é desotimizado. Esta taxa é usada quando a opção `-XX:+UseRTMDeopt` está ativada. O valor padrão desta opção é 50. Isso significa que o código compilado é desotimizado se `50%` de todas as transações forem abortadas.

`-XX:+SegmentedCodeCache` Ativa a segmentação do code cache. Sem o `-XX:+SegmentedCodeCache`, o code cache consiste em um único segmento grande. Com `-XX:+SegmentedCodeCache`, temos segmentos separados para código de métodos não-método, métodos profilados e métodos não-profilados. Esses segmentos não são redimensionados em tempo de execução. O recurso é ativado por padrão se a compilação em camadas estiver ativada (`-XX:+TieredCompilation`) e `-XX:ReservedCodeCacheSize >= 240 MB`. As vantagens são melhor controle do consumo de memória, fragmentação de código reduzida e melhor comportamento de iTLB/iCache devido à localidade aprimorada. `iTLB/iCache` é um termo específico da CPU que significa Instruction Translation Lookaside Buffer (ITLB). ICache é um cache de instruções na CPU. A implementação do code cache pode ser encontrada no arquivo: /share/vm/code/codeCache.cpp.

`-XX:StartAggressiveSweepingAt=percent` Força a varredura da pilha de métodos ativos para remover agressivamente o código não utilizado quando apenas a porcentagem dada do code cache está livre. O valor padrão é 10%.

`-XX:RTMRetryCount=number_of_retries` Especifica o número de vezes que o código de bloqueio RTM é retentado, quando é abortado ou ocupado, antes de retornar ao mecanismo de bloqueio normal. O valor padrão para esta opção é 5. A opção `-XX:UseRTMLocking` deve estar ativada.

`-XX:-TieredCompilation` Desativa o uso da compilação em camadas. Por padrão, esta opção está ativada. Apenas a Java HotSpot Server VM suporta esta opção.

`-XX:+UseAES` Ativa intrinsics AES baseados em hardware para hardware Intel, AMD e SPARC. Intel Westmere (2010 e mais recentes), AMD Bulldozer (2011 e mais recentes) e SPARC (T4 e mais recentes) são os hardwares suportados. A opção -XX:+UseAES é usada em conjunto com UseAESIntrinsics. Flags que controlam intrinsics agora exigem a opção -XX:+UnlockDiagnosticVMOptions.

`-XX:+UseAESIntrinsics` Ativa as flags -XX:+UseAES e -XX:+UseAESIntrinsics por padrão e são suportadas apenas para a Java HotSpot Server VM. Para desativar intrinsics AES baseados em hardware, especifique `-XX:-UseAES -XX:-UseAESIntrinsics`. Por exemplo, para ativar AES de hardware, use as seguintes flags:

Flags que controlam intrinsics agora exigem a opção `-XX:+UnlockDiagnosticVMOptions`. Para suportar as flags UseAES e UseAESIntrinsics, use a opção `-server` para selecionar a Java HotSpot Server VM. Estas flags não são suportadas na Client VM.

`-XX:+UseCMoveUnconditionally` Gera instruções CMove (escalares e vetoriais) independentemente da análise de lucratividade.

`-XX:+UseCodeCacheFlushing` Ativa a descarga do code cache antes de desligar o compilador. Esta opção está ativada por padrão. Para desativar a descarga do code cache antes de desligar o compilador, especifique `-XX:-UseCodeCacheFlushing`.

`-XX:+UseCondCardMark` Ativa a verificação se o card já está marcado antes de atualizar a tabela de cards. Esta opção está desativada por padrão. Deve ser usada apenas em máquinas com múltiplos sockets, onde aumenta o desempenho de aplicações Java que dependem de operações concorrentes. Apenas a Java HotSpot Server VM suporta esta opção.

`-XX:+UseCountedLoopSafepoints` Mantém safepoints em loops contados. Seu valor padrão é false.

`-XX:+UseFMA` Ativa intrinsics FMA baseados em hardware para hardware onde instruções FMA estão disponíveis (como Intel, SPARC e ARM64). Intrinsics FMA são gerados para os métodos java.lang.Math.fma(a, b, c) que calculam o valor de expressões (a * b + c).

`-XX:+UseRTMDeopt` Ajusta automaticamente o bloqueio RTM dependendo da taxa de aborto. Esta taxa é especificada pela opção -XX:RTMAbortRatio. Se o número de transações abortadas exceder a taxa de aborto, o método contendo o bloqueio é desotimizado e recompilado com todos os bloqueios como bloqueios normais. Esta opção está desativada por padrão. A opção -XX:+UseRTMLocking deve estar ativada.

`-XX:+UseRTMLocking` Gera código de bloqueio de Restricted Transactional Memory (RTM) para todos os bloqueios inflados, com o mecanismo de bloqueio normal como manipulador de fallback. Esta opção está desativada por padrão. Opções relacionadas a RTM estão disponíveis apenas para a Java HotSpot Server VM em CPUs x86 que suportam Transactional Synchronization Extensions (TSX).

RTM faz parte do TSX da Intel, que é uma extensão do conjunto de instruções `x86` e facilita a criação de aplicações multithreaded. RTM introduz as novas instruções `XBEGIN`, `XABORT`, `XEND` e `XTEST`. As instruções `XBEGIN` e `XEND` englobam um conjunto de instruções para serem executadas como uma transação. Se nenhum conflito for encontrado ao executar a transação, as modificações de memória e registro são confirmadas juntas na instrução `XEND`. A instrução `XABORT` pode ser usada para abortar explicitamente uma transação e a instrução XEND verifica se um conjunto de instruções está sendo executado em uma transação.

Um bloqueio em uma transação é inflado quando outra thread tenta acessar a mesma transação, bloqueando assim a thread que não solicitou originalmente acesso à transação. RTM exige que um conjunto de operações de fallback seja especificado caso uma transação aborte ou falhe. Um bloqueio RTM é um bloqueio que foi delegado ao sistema do TSX.

RTM melhora o desempenho para bloqueios altamente disputados com baixo conflito em uma região crítica (que é um código que não deve ser acessado por mais de uma thread concorrentemente). RTM também melhora o desempenho do bloqueio de granularidade grossa (coarse-grain locking), que tipicamente não tem um bom desempenho em aplicações multithreaded. (O bloqueio de granularidade grossa é a estratégia de manter bloqueios por longos períodos para minimizar a sobrecarga de adquirir e liberar bloqueios, enquanto o bloqueio de granularidade fina (fine-grained locking) é a estratégia de tentar alcançar o paralelismo máximo bloqueando apenas quando necessário e desbloqueando o mais rápido possível.). Além disso, para bloqueios pouco disputados que são usados por diferentes threads, RTM pode reduzir o compartilhamento falso de linhas de cache, também conhecido como cache line ping-pong. Isso ocorre quando múltiplas threads de diferentes processadores estão acessando recursos diferentes, mas os recursos compartilham a mesma linha de cache. Como resultado, os processadores invalidam repetidamente as linhas de cache de outros processadores, o que os força a ler da memória principal em vez de seu cache.

`-XX:+UseSHA` Ativa intrinsics baseados em hardware para funções de hash criptográfico SHA para hardware SPARC. A opção UseSHA é usada em conjunto com as opções `UseSHA1Intrinsics`, `UseSHA256Intrinsics` e `UseSHA512Intrinsics`.

As flags UseSHA e UseSHA*Intrinsics são ativadas por padrão e são suportadas apenas para Java HotSpot Server VM de 64 bits em SPARC T4 e mais recentes.

Este recurso é aplicável apenas ao usar o provedor sun.security.provider.Sun para operações SHA. Flags que controlam intrinsics agora exigem a opção `-XX:+UnlockDiagnosticVMOptions`.

Para desativar todos os intrinsics SHA baseados em hardware, especifique `-XX:-UseSHA`. Para desativar apenas um intrinsic SHA específico, use a opção correspondente apropriada. Por exemplo: `-XX:-UseSHA256Intrinsics`.

`-XX:+UseSHA1Intrinsics` Ativa intrinsics para a função de hash criptográfico SHA-1. Flags que controlam intrinsics agora exigem a opção -XX:+UnlockDiagnosticVMOptions.

`-XX:+UseSHA256Intrinsics` Ativa intrinsics para as funções de hash criptográfico SHA-224 e SHA-256. Flags que controlam intrinsics agora exigem a opção `-XX:+UnlockDiagnosticVMOptions`.

`-XX:+UseSHA512Intrinsics` Ativa intrinsics para as funções de hash criptográfico SHA-384 e SHA-512. Flags que controlam intrinsics agora exigem a opção `-XX:+UnlockDiagnosticVMOptions`.

`-XX:+UseSuperWord` Ativa a transformação de operações escalares em operações superword. Superword é uma otimização de vetorização. Esta opção está ativada por padrão. Para desativar a transformação de operações escalares em operações superword, especifique `-XX:-UseSuperWord`. Apenas a Java HotSpot Server VM suporta esta opção.
## Opções Avançadas de Serviceability

Estas opções Java fornecem a capacidade de coletar informações do sistema e realizar depuração extensiva.

`-XX:+ExtendedDTraceProbes` **Linux e macOS** : Habilita sondas adicionais da ferramenta dtrace que afetam o desempenho. Por padrão, esta opção está desabilitada e o dtrace executa apenas sondas padrão.

`-XX:+HeapDumpOnOutOfMemoryError` Habilita o despejo do heap Java para um arquivo no diretório atual usando o heap profiler (HPROF) quando uma exceção `java.lang.OutOfMemoryError` é lançada. Você pode definir explicitamente o caminho e o nome do arquivo de despejo do heap usando a opção -XX:HeapDumpPath. Por padrão, esta opção está desabilitada, e o heap não é despejado quando uma exceção OutOfMemoryError é lançada.

`-XX:HeapDumpPath=path` Define o caminho e o nome do arquivo para escrever o heap dump fornecido pelo heap profiler (HPROF) quando a opção `-XX:+HeapDumpOnOutOfMemoryError` é definida. Por padrão, o arquivo é criado no diretório de trabalho atual e é nomeado java_pid.hprof onde é o identificador do processo que causou o erro. O exemplo a seguir mostra como definir o arquivo padrão explicitamente (%p representa o identificador do processo atual):

  * **Linux e macOS:** O exemplo a seguir mostra como definir o arquivo de heap dump para `/var/log/java/java_heapdump.hprof`: `text
  * XX:HeapDumpPath=/var/log/java/java_heapdump.hprof `
  * **Windows:** O exemplo a seguir mostra como definir o arquivo de heap dump para `C:/log/java/java_heapdump.log`: `text
  * XX:HeapDumpPath=C:/log/java/java_heapdump.log `



`-XX:LogFile=path` Define o caminho e o nome do arquivo onde os dados de log são escritos. Por padrão, o arquivo é criado no diretório de trabalho atual e é nomeado `hotspot.log`.

  * **Linux e macOS:** O exemplo a seguir mostra como definir o arquivo de log para `/var/log/java/hotspot.log`: `text
  * XX:LogFile=/var/log/java/hotspot.log `
  * **Windows:** O exemplo a seguir mostra como definir o arquivo de log para `C:/log/java/hotspot.log`: `text
  * XX:LogFile=C:/log/java/hotspot.log `



`-XX:+PrintClassHistogram` Habilita a impressão de um histograma de instâncias de classe após um dos seguintes eventos:

  * **Linux e macOS:** Control+Break

  * **Windows:** Control+C (SIGTERM)




Por padrão, esta opção está desabilitada.

Definir esta opção é equivalente a executar o comando `jmap -histo`, ou o comando `jcmd pid GC.class_histogram`, onde pid é o identificador do processo Java atual.

`-XX:+PrintConcurrentLocks` Habilita a impressão de locks `java.util.concurrent` após um dos seguintes eventos:

  * **Linux e macOS:** Control+Break

  * **Windows:** Control+C (SIGTERM)




Por padrão, esta opção está desabilitada.

Definir esta opção é equivalente a executar o comando jstack -l ou o comando jcmd pid Thread.print -l, onde pid é o identificador do processo Java atual.

`-XX:+PrintFlagsRanges` Imprime o intervalo especificado e permite o teste automático dos valores. Consulte Validate Java Virtual Machine Flag Arguments.

`-XX:+UnlockDiagnosticVMOptions` Desbloqueia as opções destinadas ao diagnóstico da JVM. Por padrão, esta opção está desabilitada e as opções de diagnóstico não estão disponíveis.

 

## Opções Avançadas de Garbage Collection

Estas opções Java controlam como o garbage collection (GC) é realizado pela Java HotSpot VM.

`-XX:+AggressiveHeap` Habilita a otimização do heap Java. Isso define vários parâmetros para serem ideais para trabalhos de longa duração com alocação intensiva de memória, com base na configuração do computador (RAM e CPU). Por padrão, a opção está desabilitada e o heap não é otimizado.

`-XX:+AlwaysPreTouch` Habilita o "toque" em cada página do heap Java durante a inicialização da JVM. Isso carrega todas as páginas na memória antes de entrar no método main(). A opção pode ser usada em testes para simular um sistema de longa duração com toda a memória virtual mapeada para a memória física. Por padrão, esta opção está desabilitada e todas as páginas são alocadas conforme o espaço do heap da JVM é preenchido.

`-XX:+CMSClassUnloadingEnabled` Habilita o descarregamento de classes ao usar o garbage collector concurrent mark-sweep (CMS). Esta opção está habilitada por padrão. Para desabilitar o descarregamento de classes para o garbage collector CMS, especifique `-XX:-CMSClassUnloadingEnabled`.

`-XX:CMSExpAvgFactor=percent` Define a porcentagem de tempo (0 a 100) usada para ponderar a amostra atual ao calcular médias exponenciais para as estatísticas de coleta concorrente. Por padrão, o fator de médias exponenciais é definido como 25%. O exemplo a seguir mostra como definir o fator para 15%:

`-XX:CMSIncrementalDutySafetyFactor=percent` Define a porcentagem (0 a 100) usada para adicionar conservadorismo ao calcular o ciclo de trabalho. O valor padrão é 10.

`-XX:+CMSScavengeBeforeRemark` Habilita tentativas de scavenging antes da etapa de remark do CMS. Por padrão, esta opção está desabilitada.

`-XX:CMSTriggerRatio=percent` Define a porcentagem (0 a 100) do valor especificado pela opção `-XX:MinHeapFreeRatio` que é alocada antes do início de um ciclo de coleta CMS. O valor padrão é definido como 80%.

O exemplo a seguir mostra como definir a fração de ocupação para 75%:

`-XX:ConcGCThreads=threads` Define o número de threads usadas para GC concorrente. Define as threads para aproximadamente 1/4 do número de threads de garbage collection paralelas. O valor padrão depende do número de CPUs disponíveis para a JVM.

Por exemplo, para definir o número de threads para GC concorrente como 2, especifique a seguinte opção:

`-XX:+DisableExplicitGC` Habilita a opção que desabilita o processamento de chamadas ao método System.gc(). Esta opção está desabilitada por padrão, o que significa que as chamadas para System.gc() são processadas. Se o processamento de chamadas para System.gc() for desabilitado, a JVM ainda realizará GC quando necessário.

`-XX:+ExplicitGCInvokesConcurrent` Habilita a invocação de GC concorrente usando a requisição System.gc(). Esta opção está desabilitada por padrão e só pode ser habilitada com a opção `-XX:+UseConcMarkSweepGC` (depreciada) e a opção `-XX:+UseG1GC`.

`-XX:+ExplicitGCInvokesConcurrentAndUnloadsClasses` Habilita a invocação de GC concorrente usando a requisição System.gc() e o descarregamento de classes durante o ciclo de GC concorrente. Esta opção está desabilitada por padrão e só pode ser habilitada com a opção `-XX:+UseConcMarkSweepGC` (depreciada).

`-XX:G1HeapRegionSize=size` Define o tamanho das regiões nas quais o heap Java é subdividido ao usar o coletor garbage-first (G1). O valor é uma potência de 2 e pode variar de 1 MB a 32 MB. O objetivo é ter cerca de 2048 regiões com base no tamanho mínimo do heap Java. O tamanho da região padrão é determinado ergonomicamente com base no tamanho do heap.

O exemplo a seguir define o tamanho das subdivisões para 16 MB:

`-XX:G1HeapWastePercent=percent` Define a porcentagem do heap que você está disposto a "desperdiçar". A Java HotSpot VM não inicia o ciclo de garbage collection misto quando a porcentagem recuperável é menor que a porcentagem de desperdício do heap. O padrão é 5 por cento.

`-XX:G1MaxNewSizePercent=percent` Define a porcentagem do tamanho do heap a ser usada como o máximo para o tamanho da young generation. O valor padrão é 60 por cento do seu heap Java.

Esta é uma flag experimental. Esta configuração substitui a configuração `-XX:DefaultMaxNewGenPercent`.

Esta configuração não está disponível na Java HotSpot VM build 23 ou anterior.

`-XX:G1MixedGCCountTarget=number` Define o número alvo de garbage collections mistas após um ciclo de marcação para coletar regiões antigas com no máximo G1MixedGCLIveThresholdPercent de dados vivos. O padrão é 8 garbage collections mistas. O objetivo para coletas mistas é estar dentro deste número alvo.

Esta configuração não está disponível na Java HotSpot VM build 23 ou anterior.

`-XX:G1MixedGCLiveThresholdPercent=percent` Define o limite de ocupação para uma região antiga ser incluída em um ciclo de garbage collection misto. A ocupação padrão é de 85 por cento.

Esta é uma flag experimental. Esta configuração substitui a configuração `-XX:G1OldCSetRegionLiveThresholdPercent`.

Esta configuração não está disponível na Java HotSpot VM build 23 ou anterior.

`-XX:G1NewSizePercent=percent` Define a porcentagem do heap a ser usada como o mínimo para o tamanho da young generation. O valor padrão é 5 por cento do seu heap Java.

Esta é uma flag experimental. Esta configuração substitui a configuração `-XX:DefaultMinNewGenPercent`.

Esta configuração não está disponível na Java HotSpot VM build 23 ou anterior.

`-XX:G1OldCSetRegionThresholdPercent=percent` Define um limite superior para o número de regiões antigas a serem coletadas durante um ciclo de garbage collection misto. O padrão é 10 por cento do heap Java.

Esta configuração não está disponível na Java HotSpot VM build 23 ou anterior.

`-XX:G1ReservePercent=percent` Define a porcentagem do heap (0 a 50) que é reservada como um "teto falso" para reduzir a possibilidade de falha de promoção para o coletor G1. Ao aumentar ou diminuir a porcentagem, certifique-se de ajustar o heap Java total na mesma quantidade. Por padrão, esta opção é definida como 10%.

O exemplo a seguir define o heap reservado para 20%:

`-XX:InitialHeapOccupancyPercent=percent` Define o limite de ocupação do heap Java que aciona um ciclo de marcação. A ocupação padrão é de `45` por cento de todo o heap Java.

`-XX:InitialHeapSize=size` Define o tamanho inicial (em bytes) do pool de alocação de memória. Este valor deve ser `0`, ou um múltiplo de `1024` e maior que `1 MB`. Anexe a letra `k` ou `K` para indicar kilobytes, m ou M para indicar megabytes, e `g` ou `G` para indicar gigabytes. O valor padrão é escolhido em tempo de execução com base na configuração do sistema.

Os exemplos a seguir mostram como definir o tamanho da memória alocada para 6 MB usando várias unidades:

Se você definir esta opção como 0, o tamanho inicial será definido como a soma dos tamanhos alocados para a old generation e a young generation. O tamanho do heap para a young generation pode ser definido usando a opção `-XX:NewSize`.

`-XX:InitialSurvivorRatio=ratio` Define a proporção inicial do survivor space usada pelo throughput garbage collector (que é habilitado pelas opções `-XX:+UseParallelGC` e/ou `-XX:+UseParallelOldGC`). O dimensionamento adaptativo é habilitado por padrão com o throughput garbage collector usando as opções `-XX:+UseParallelGC` e `-XX:+UseParallelOldGC`, e o survivor space é redimensionado de acordo com o comportamento da aplicação, começando com o valor inicial. Se o dimensionamento adaptativo for desabilitado (usando a opção `-XX:-UseAdaptiveSizePolicy`), então a opção `-XX:SurvivorRatio` deve ser usada para definir o tamanho do survivor space para toda a execução da aplicação.

A seguinte fórmula pode ser usada para calcular o tamanho inicial do survivor space (`S`) com base no tamanho da young generation (`Y`) e na proporção inicial do survivor space (`R`):

O 2 na equação denota dois survivor spaces. Quanto maior o valor especificado como a proporção inicial do survivor space, menor será o tamanho inicial do survivor space.

Por padrão, a proporção inicial do survivor space é definida como 8. Se o valor padrão para o tamanho do espaço da young generation for usado (2 MB), então o tamanho inicial do survivor space é de 0.2 MB.

O exemplo a seguir mostra como definir a proporção inicial do survivor space para 4:

`-XX:InitiatingHeapOccupancyPercent=percent` Define a porcentagem de ocupação do heap (0 a 100) na qual iniciar um ciclo de GC concorrente. É usado por garbage collectors que acionam um ciclo de GC concorrente com base na ocupação de todo o heap, não apenas de uma das generations (por exemplo, o garbage collector G1).

Por padrão, o valor de iniciação é definido como 45%. Um valor de 0 implica ciclos de GC ininterruptos. O exemplo a seguir mostra como definir a ocupação inicial do heap para 75%:

`-XX:MaxGCPauseMillis=time` Define um alvo para o tempo máximo de pausa do GC (em milissegundos). Este é um objetivo "suave", e a JVM fará o seu melhor esforço para alcançá-lo. O valor especificado não se adapta ao tamanho do seu heap. Por padrão, não há valor máximo para o tempo de pausa.

O exemplo a seguir mostra como definir o tempo máximo de pausa alvo para 500 ms:

`-XX:MaxHeapSize=size` Define o tamanho máximo (em bytes) do pool de alocação de memória. Este valor deve ser um múltiplo de `1024` e maior que `2` MB. Anexe a letra `k` ou `K` para indicar kilobytes, `m` ou `M` para indicar megabytes, e `g` ou `G` para indicar gigabytes. O valor padrão é selecionado em tempo de execução com base na configuração do sistema. Para implantações em servidor, as opções `-XX:InitialHeapSize` e `-XX:MaxHeapSize` são frequentemente definidas com o mesmo valor.

Os exemplos a seguir mostram como definir o tamanho máximo permitido de memória alocada para 80 MB usando várias unidades:

A opção `-XX:MaxHeapSize` é equivalente a -Xmx.

`-XX:MaxHeapFreeRatio=percent` Define a porcentagem máxima permitida de espaço livre no heap (0 a 100) após um evento de GC. Se o espaço livre no heap exceder este valor, o heap é reduzido. Por padrão, este valor é definido como 70%.

Minimize o tamanho do heap Java diminuindo os valores dos parâmetros MaxHeapFreeRatio (valor padrão é 70%) e MinHeapFreeRatio (valor padrão é 40%) com as opções de linha de comando `-XX:MaxHeapFreeRatio` e `-XX:MinHeapFreeRatio`. Diminuir MaxHeapFreeRatio para até 10% e MinHeapFreeRatio para 5% tem reduzido com sucesso o tamanho do heap sem muita regressão de desempenho; no entanto, os resultados podem variar muito dependendo da sua aplicação. Tente diferentes valores para esses parâmetros até que sejam os mais baixos possíveis, mas ainda mantenham um desempenho aceitável.

Clientes que tentam manter o heap pequeno também devem adicionar a opção -XX:-ShrinkHeapInSteps. Consulte Performance Tuning Examples para uma descrição de como usar esta opção para manter o heap Java pequeno, reduzindo a pegada dinâmica para aplicações embarcadas.

`-XX:NewRatio=ratio` Define a proporção entre os tamanhos da young generation e da old generation. Por padrão, esta opção é definida como 2. O exemplo a seguir mostra como definir a proporção young-para-old para 1:

`-XX:NewSize=size` Define o tamanho inicial (em bytes) do heap para a young generation (nursery). Anexe a letra k ou K para indicar kilobytes, m ou M para indicar megabytes, e g ou G para indicar gigabytes.

A região da young generation do heap é usada para novos objetos. O GC é realizado nesta região com mais frequência do que em outras regiões. Se o tamanho da young generation for muito baixo, um grande número de GCs menores será realizado. Se o tamanho for muito alto, apenas GCs completos serão realizados, o que pode levar muito tempo para ser concluído. A Oracle recomenda que você mantenha o tamanho da young generation maior que 25% e menor que 50% do tamanho total do heap.

Os exemplos a seguir mostram como definir o tamanho inicial da young generation para 256 MB usando várias unidades:

A opção `-XX:NewSize` é equivalente a `-Xmn`.

`-XX:ParallelGCThreads=threads` Define o valor das threads de trabalho stop-the-world (STW). Esta opção define o valor das threads para o número de processadores lógicos. O valor das threads é o mesmo que o número de processadores lógicos até um valor de 8.

Se houver mais de 8 processadores lógicos, esta opção define o valor de `threads` para aproximadamente 5/8 dos processadores lógicos. Isso funciona na maioria dos casos, exceto para sistemas SPARC maiores, onde o valor de `threads` pode ser aproximadamente 5/16 dos processadores lógicos.

O valor padrão depende do número de CPUs disponíveis para a JVM.

Por exemplo, para definir o número de threads para GC paralelo como 2, especifique a seguinte opção:

`-XX:+ParallelRefProcEnabled` Habilita o processamento paralelo de referências. Por padrão, esta opção está desabilitada.

`-XX:+PrintAdaptiveSizePolicy` Habilita a impressão de informações sobre o dimensionamento adaptativo de generations. Por padrão, esta opção está desabilitada.

`-XX:+ScavengeBeforeFullGC` Habilita o GC da young generation antes de cada full GC. Esta opção está habilitada por padrão. A Oracle recomenda que você não a desabilite, pois o scavenging da young generation antes de um full GC pode reduzir o número de objetos alcançáveis do espaço da old generation para o espaço da young generation. Para desabilitar o GC da young generation antes de cada full GC, especifique a opção `-XX:-ScavengeBeforeFullGC`.

`-XX:-ShrinkHeapInSteps` Reduz incrementalmente o heap Java para o tamanho alvo, especificado pela opção `–XX:MaxHeapFreeRatio`. Esta opção está habilitada por padrão. Se desabilitada, ela reduz imediatamente o heap Java para o tamanho alvo em vez de exigir múltiplos ciclos de garbage collection. Desabilite esta opção se você deseja minimizar o tamanho do heap Java. Você provavelmente encontrará degradação de desempenho quando esta opção estiver desabilitada.

Consulte Performance Tuning Examples para uma descrição de como usar a opção MaxHeapFreeRatio para manter o heap Java pequeno, reduzindo a pegada dinâmica para aplicações embarcadas.

`–XX:StringDeduplicationAgeThreshold=threshold` Identifica objetos String que atingem a idade especificada e são considerados candidatos para deduplicação. A idade de um objeto é uma medida de quantas vezes ele sobreviveu ao garbage collection. Isso é às vezes referido como tenuring. Consulte a opção `-XX:+PrintTenuringDistribution` (depreciada).

`-XX:SurvivorRatio=ratio` Define a proporção entre o tamanho do eden space e o tamanho do survivor space. Por padrão, esta opção é definida como 8. O exemplo a seguir mostra como definir a proporção eden/survivor space para 4:

`-XX:TargetSurvivorRatio=percent` Define a porcentagem desejada de survivor space (0 a 100) usada após o young garbage collection. Por padrão, esta opção é definida como 50%.

O exemplo a seguir mostra como definir a proporção alvo do survivor space para 30%:

`-XX:TLABSize=size` Define o tamanho inicial (em bytes) de um thread-local allocation buffer (TLAB). Anexe a letra k ou K para indicar kilobytes, m ou M para indicar megabytes, e g ou G para indicar gigabytes. Se esta opção for definida como 0, a JVM selecionará o tamanho inicial automaticamente.

O exemplo a seguir mostra como definir o tamanho inicial do TLAB para 512 KB:

`-XX:+UseAdaptiveSizePolicy` Habilita o uso de dimensionamento adaptativo de generations. Esta opção está habilitada por padrão. Para desabilitar o dimensionamento adaptativo de generations, especifique `-XX:-UseAdaptiveSizePolicy` e defina o tamanho do pool de alocação de memória explicitamente. Consulte a opção `-XX:SurvivorRatio`.

`-XX:+UseCMSInitiatingOccupancyOnly` Habilita o uso do valor de ocupação como o único critério para iniciar o coletor CMS. Por padrão, esta opção está desabilitada e outros critérios podem ser usados.

`-XX:+UseG1GC` Habilita o uso do garbage collector garbage-first (G1). É um garbage collector estilo servidor, destinado a máquinas multiprocessadoras com grande quantidade de RAM. Esta opção atende aos objetivos de tempo de pausa do GC com alta probabilidade, mantendo um bom throughput. O coletor G1 é recomendado para aplicações que exigem heaps grandes (tamanhos de cerca de 6 GB ou maiores) com requisitos limitados de latência de GC (um tempo de pausa estável e previsível abaixo de 0.5 segundos). Por padrão, esta opção está habilitada e o G1 é usado como o garbage collector padrão.

`-XX:+UseGCOverheadLimit` Habilita o uso de uma política que limita a proporção de tempo gasto pela JVM em GC antes que uma exceção OutOfMemoryError seja lançada. Esta opção está habilitada, por padrão, e o GC paralelo lançará um OutOfMemoryError se mais de 98% do tempo total for gasto em garbage collection e menos de 2% do heap for recuperado. Quando o heap é pequeno, este recurso pode ser usado para evitar que as aplicações sejam executadas por longos períodos com pouco ou nenhum progresso. Para desabilitar esta opção, especifique a opção `-XX:-UseGCOverheadLimit`.

`-XX:+UseNUMA` Habilita a otimização de desempenho de uma aplicação em uma máquina com arquitetura de memória não uniforme (NUMA), aumentando o uso de memória de menor latência pela aplicação. Por padrão, esta opção está desabilitada e nenhuma otimização para NUMA é feita. A opção está disponível apenas quando o parallel garbage collector é usado (`-XX:+UseParallelGC`).

`-XX:+UseParallelGC` Habilita o uso do parallel scavenge garbage collector (também conhecido como throughput collector) para melhorar o desempenho da sua aplicação, aproveitando múltiplos processadores.

Por padrão, esta opção está desabilitada e o coletor é escolhido automaticamente com base na configuração da máquina e no tipo da JVM. Se estiver habilitada, a opção `-XX:+UseParallelOldGC` é automaticamente habilitada, a menos que você a desabilite explicitamente.

`-XX:+UseParallelOldGC` Habilita o uso do parallel garbage collector para full GCs. Por padrão, esta opção está desabilitada. Habilitá-la automaticamente habilita a opção `-XX:+UseParallelGC`.

`-XX:+UseSerialGC` Habilita o uso do serial garbage collector. Esta é geralmente a melhor escolha para aplicações pequenas e simples que não exigem nenhuma funcionalidade especial do garbage collection. Por padrão, esta opção está desabilitada e o coletor é selecionado automaticamente com base na configuração da máquina e no tipo da JVM.

`-XX:+UseSHM` Somente Linux: Habilita a JVM a usar memória compartilhada para configurar large pages.

Consulte Large Pages para configurar large pages.

`-XX:+UseStringDeduplication` Habilita a deduplicação de String. Por padrão, esta opção está desabilitada. Para usar esta opção, você deve habilitar o garbage collector garbage-first (G1).

A deduplicação de String reduz a pegada de memória de objetos String no heap Java, aproveitando o fato de que muitos objetos String são idênticos. Em vez de cada objeto String apontar para seu próprio array de caracteres, objetos String idênticos podem apontar e compartilhar o mesmo array de caracteres.

`-XX:+UseTLAB` Habilita o uso de thread-local allocation blocks (TLABs) no espaço da young generation. Esta opção está habilitada por padrão. Para desabilitar o uso de TLABs, especifique a opção `-XX:-UseTLAB`.

`-XX:+UseZGC` Habilita o uso do Z garbage collector (ZGC). Este é um garbage collector de baixa latência, fornecendo tempos máximos de pausa de alguns milissegundos, com algum custo de throughput. Os tempos de pausa são independentes do tamanho do heap usado. Suporta tamanhos de heap de 8MB a 16TB.

`-XX:ZAllocationSpikeTolerance=factor` Define a tolerância a picos de alocação para o ZGC. Por padrão, esta opção é definida como 2.0. Este fator descreve o nível de picos de alocação a serem esperados. Por exemplo, usar um fator de 3.0 significa que a taxa de alocação atual pode ser esperada para triplicar a qualquer momento.

`-XX:ZCollectionInterval=seconds` Define o intervalo máximo (em segundos) entre dois ciclos de GC ao usar o ZGC. Por padrão, esta opção é definida como 0 (desabilitada).

`-XX:ZFragmentationLimit=percent` Define a fragmentação máxima aceitável do heap (em porcentagem) para o ZGC. Por padrão, esta opção é definida como 25. Usar um valor menor fará com que o heap seja compactado de forma mais agressiva, para recuperar mais memória ao custo de usar mais tempo de CPU.

`-XX:+ZProactive` Habilita ciclos de GC proativos ao usar o ZGC. Por padrão, esta opção está habilitada. O ZGC iniciará um ciclo de GC proativo se isso for esperado para ter um impacto mínimo na aplicação em execução. Isso é útil se a aplicação estiver principalmente ociosa ou alocar muito poucos objetos, mas você ainda deseja manter o tamanho do heap baixo e permitir que o processamento de referências ocorra mesmo quando há muito espaço livre no heap.

`-XX:+ZUncommit` Habilita o "uncommitting" de memória heap não utilizada ao usar o ZGC. Por padrão, esta opção está habilitada. O "uncommitting" de memória heap não utilizada reduzirá a pegada de memória da JVM e tornará essa memória disponível para outros processos usarem.

`-XX:ZUncommitDelay=seconds` Define a quantidade de tempo (em segundos) que a memória heap deve ter permanecido sem uso antes de ser "uncommitted". Por padrão, esta opção é definida como 300 (5 minutos). "Committing" e "uncommitting" memória são operações relativamente caras. Usar um valor menor fará com que a memória heap seja "uncommitted" mais cedo, com o risco de ter que "commitá-la" novamente em breve.
## Opções Java Obsoletas

Estas opções Java estão obsoletas e podem ser removidas em uma futura versão do JDK. Elas ainda são aceitas e executadas, mas um aviso é emitido quando são usadas.

`--illegal-access=parameter` Quando presente em tempo de execução, `--illegal-access=` aceita um parâmetro de palavra-chave para especificar um modo de operação:

**Nota: Esta opção será removida em uma versão futura.**

  * `permit`: Este modo abre cada pacote em cada módulo na imagem de tempo de execução para código em todos os módulos sem nome (como código no classpath), se esse pacote existia no JDK 8. Isso permite tanto o acesso estático (por exemplo, por bytecode compilado) quanto o acesso reflexivo profundo através das várias APIs de reflection da plataforma. A primeira operação de acesso reflexivo a qualquer um desses pacotes causa a emissão de um aviso. No entanto, nenhum aviso é emitido após a primeira ocorrência. Este único aviso descreve como habilitar avisos adicionais.

  * `warn`: Este modo é idêntico a `permit`, exceto que uma mensagem de aviso é emitida para cada operação de acesso reflexivo ilegal.

  * `debug`: Este modo é idêntico a `warn`, exceto que tanto uma mensagem de aviso quanto um stack trace são emitidos para cada operação de acesso reflexivo ilegal.

  * `deny`: Este modo desabilita todas as operações de acesso ilegal, exceto aquelas habilitadas por outras opções de linha de comando, como `--add-opens`. Este modo é o padrão.

Se sua aplicação não funcionar com o modo padrão de `--illegal-access=deny`, você pode aprender mais sobre o que está acontecendo com os modos `warn` e `debug`. Para cada biblioteca ou framework no classpath que requer acesso ilegal, você tem duas opções:

  * Se os mantenedores do componente já lançaram uma versão corrigida que não usa mais APIs internas do JDK, você pode considerar a atualização para essa versão.
  * Se o componente ainda precisa ser corrigido, você pode entrar em contato com seus mantenedores e pedir que substituam o uso de APIs internas do JDK pelas APIs exportadas apropriadas.

Se você precisar continuar a usar um componente que requer acesso ilegal, você pode eliminar as mensagens de aviso usando uma ou mais opções `--add-opens` para abrir apenas os pacotes internos aos quais o acesso é necessário.

Para verificar se sua aplicação está pronta para uma futura versão do JDK, execute-a com `--illegal-access=deny` juntamente com quaisquer opções `--add-opens` necessárias. Quaisquer erros de acesso ilegal restantes provavelmente serão devido a referências estáticas de código compilado para APIs internas do JDK. Você pode identificá-los executando a ferramenta `jdeps` com a opção `--jdk-internals`. Por razões de desempenho, o JDK atual não emite avisos para operações de acesso estático ilegal.

`-Xfuture` Habilita verificações rigorosas do formato de arquivo de classe que impõem uma conformidade estrita com a especificação do formato de arquivo de classe. Desenvolvedores devem usar esta flag ao desenvolver código novo. Verificações mais rigorosas podem se tornar o padrão em futuras versões.

`-Xloggc:filename` Define o arquivo para o qual as informações de eventos verbose do GC devem ser redirecionadas para registro. A opção `-Xloggc` sobrescreve `-verbose:gc` se ambas forem fornecidas com o mesmo comando `java`. `-Xloggc:filename` é substituído por `-Xlog:gc:filename`. Consulte Habilitar Log com o Framework de Log Unificado da JVM.

Exemplo:

`-XX:+FlightRecorder` Habilita o uso do Java Flight Recorder (JFR) durante o tempo de execução da aplicação. Desde o JDK 8u40, esta opção não é mais necessária para usar o JFR.

`-XX:InitialRAMFraction=ratio` Define a quantidade inicial de memória que a JVM pode usar para o heap Java antes de aplicar heurísticas de ergonomia como uma proporção da quantidade máxima determinada conforme descrito na opção `-XX:MaxRAM`. O valor padrão é 64.

Use a opção `-XX:InitialRAMPercentage` em vez disso.

`-XX:MaxRAMFraction=ratio` Define a quantidade máxima de memória que a JVM pode usar para o heap Java antes de aplicar heurísticas de ergonomia como uma fração da quantidade máxima determinada conforme descrito na opção `-XX:MaxRAM`. O valor padrão é 4.

A especificação desta opção desabilita o uso automático de `compressed oops` se o resultado combinado desta e de outras opções que influenciam a quantidade máxima de memória for maior do que o intervalo de memória endereçável por `compressed oops`. Consulte `-XX:UseCompressedOops` para obter mais informações sobre `compressed oops`.

Use a opção `-XX:MaxRAMPercentage` em vez disso.

`-XX:MinRAMFraction=ratio` Define a quantidade máxima de memória que a JVM pode usar para o heap Java antes de aplicar heurísticas de ergonomia como uma fração da quantidade máxima determinada conforme descrito na opção `-XX:MaxRAM` para heaps pequenos. Um heap pequeno é um heap de aproximadamente 125 MB. O valor padrão é 2.

Use a opção `-XX:MinRAMPercentage` em vez disso.

`-XX:+UseBiasedLocking` Habilita o uso de `biased locking`. Algumas aplicações com quantidades significativas de sincronização não contestada podem obter acelerações significativas com esta flag habilitada, mas aplicações com certos padrões de bloqueio podem apresentar lentidão.

Por padrão, esta opção está desabilitada.

## Opções Java Obsoletas

Estas opções Java ainda são aceitas, mas ignoradas, e um aviso é emitido quando são usadas.

`-XX:+UseMembar` Habilitava a emissão de `membars` em transições de estado de thread. Esta opção estava desabilitada por padrão em todas as plataformas, exceto em servidores ARM, onde estava habilitada.

`-XX:MaxPermSize=size` Define o tamanho máximo do espaço da geração permanente (em bytes). Esta opção foi descontinuada no JDK 8 e substituída pela opção `-XX:MaxMetaspaceSize`.

`-XX:PermSize=size` Define o espaço (em bytes) alocado para a geração permanente que aciona uma coleta de lixo se for excedido. Esta opção foi descontinuada no JDK 8 e substituída pela opção `-XX:MetaspaceSize`.

`-XX:+TraceClassLoading` Habilita o rastreamento de classes à medida que são carregadas. Por padrão, esta opção está desabilitada e as classes não são rastreadas.

A sintaxe de Log Unificado de substituição é `-Xlog:class+load=level`. Consulte Habilitar Log com o Framework de Log Unificado da JVM

Use `level=info` para informações regulares, ou `level=debug` para informações adicionais. Na sintaxe de Log Unificado, `-verbose:class` equivale a `-Xlog:class+load=info,class+unload=info`.

`-XX:+TraceClassLoadingPreorder` Habilita o rastreamento de todas as classes carregadas na ordem em que são referenciadas. Por padrão, esta opção está desabilitada e as classes não são rastreadas.

A sintaxe de Log Unificado de substituição é `-Xlog:class+preorder=debug`. Consulte Habilitar Log com o Framework de Log Unificado da JVM.

`-XX:+TraceClassResolution` Habilita o rastreamento de resoluções de `constant pool`. Por padrão, esta opção está desabilitada e as resoluções de `constant pool` não são rastreadas.

A sintaxe de Log Unificado de substituição é `-Xlog:class+resolve=debug`. Consulte Habilitar Log com o Framework de Log Unificado da JVM.

`-XX:+TraceLoaderConstraints` Habilita o rastreamento do registro de `loader constraints`. Por padrão, esta opção está desabilitada e o registro de `loader constraints` não é rastreado.

A sintaxe de Log Unificado de substituição é `-Xlog:class+loader+constraints=info`. Consulte Habilitar Log com o Framework de Log Unificado da JVM.

## Opções Java Removidas

Estas opções Java foram removidas no JDK 16 e usá-las resulta em um erro de: `Unrecognized VM option` _nome-da-opção_

`-XX:+UseParallelOldGC` Habilita o uso do `garbage collector` paralelo para `GCs` completos. Por padrão, esta opção está desabilitada. Habilitá-la automaticamente habilita a opção `-XX:+UseParallelGC`.

## Arquivos de Argumentos de Linha de Comando

Você pode encurtar ou simplificar o comando `java` usando arquivos de argumento `@` para especificar um ou mais arquivos de texto que contêm argumentos, como opções e nomes de classes, que são passados para o comando `java`. Isso permite criar comandos `java` de qualquer comprimento em qualquer sistema operacional.

Na linha de comando, use o prefixo arroba (`@`) para identificar um arquivo de argumento que contém opções `java` e nomes de classes. Quando o comando `java` encontra um arquivo começando com o arroba (`@`), ele expande o conteúdo desse arquivo em uma lista de argumentos, assim como seriam especificados na linha de comando.

O `java launcher` expande o conteúdo do arquivo de argumento até encontrar a opção `--disable-@files`. Você pode usar a opção `--disable-@files` em qualquer lugar na linha de comando, incluindo em um arquivo de argumento, para interromper a expansão de arquivos de argumento `@`.

Os itens a seguir descrevem a sintaxe dos arquivos de argumento `java`:

  * O arquivo de argumento deve conter apenas caracteres ASCII ou caracteres na codificação padrão do sistema que sejam compatíveis com ASCII, como UTF-8.

  * O tamanho do arquivo de argumento não deve exceder `MAXINT` (2.147.483.647) bytes.

  * O `launcher` não expande curingas presentes dentro de um arquivo de argumento.

  * Use espaços em branco ou caracteres de nova linha para separar os argumentos incluídos no arquivo.

  * Espaços em branco incluem um caractere de espaço em branco, `\t, \n, \r` e `\f`. Por exemplo, é possível ter um caminho com um espaço, como `c:\Program Files`, que pode ser especificado como "`c:\\Program Files`" ou, para evitar um escape, `c:\Program" "Files`.

  * Qualquer opção que contenha espaços, como um componente de caminho, deve estar entre aspas duplas (`"`) em sua totalidade.

  * Uma string entre aspas pode conter os caracteres `\n, \r, \t` e `\f`. Eles são convertidos para seus respectivos códigos ASCII.

  * Se um nome de arquivo contiver espaços incorporados, coloque o nome do arquivo inteiro entre aspas duplas.

  * Os nomes de arquivos em um arquivo de argumento são relativos ao diretório atual, não ao local do arquivo de argumento.

  * Use o sinal de cerquilha `#` no arquivo de argumento para identificar comentários. Todos os caracteres após o `#` são ignorados até o final da linha.

  * Prefixos de arroba (`@`) adicionais a opções prefixadas com `@` atuam como um escape (o primeiro `@` é removido e o restante dos argumentos é apresentado ao `launcher` literalmente).

  * As linhas podem ser continuadas usando o caractere de continuação (`\`) no final da linha. As duas linhas são concatenadas com os espaços em branco iniciais removidos. Para evitar a remoção dos espaços em branco iniciais, um caractere de continuação (`\`) pode ser colocado na primeira coluna.

  * Como a barra invertida (`\`) é um caractere de escape, um caractere de barra invertida deve ser escapado com outro caractere de barra invertida.

  * Aspas parciais são permitidas e são fechadas por um fim de arquivo.

  * Uma aspa aberta para no final da linha, a menos que `\` seja o último caractere, o que então une a próxima linha removendo todos os caracteres de espaço em branco iniciais.

  * Curingas (`*`) não são permitidos nestas listas (como especificar `*.java`).

  * O uso do arroba (`@`) para interpretar arquivos recursivamente não é suportado.

**Exemplo de Aspas Abertas ou Parciais em um Arquivo de Argumento**

No arquivo de argumento,

this is interpreted as:

**Exemplo de um Caractere de Barra Invertida Escapado com Outro Caractere de Barra Invertida em um Arquivo de Argumento** Para gerar a seguinte saída:

The backslash character must be specified in the argument file as:

**Exemplo de um Escape de Fim de Linha Usado para Forçar a Concatenação de Linhas em um Arquivo de Argumento** No arquivo de argumento,

This is interpreted as:

**Exemplo de Continuação de Linha com Espaços Iniciais em um Arquivo de Argumento** No arquivo de argumento,

This is interpreted as:

**Exemplos de Uso de um Único Arquivo de Argumento** Você pode usar um único arquivo de argumento, como `myargumentfile` no exemplo a seguir, para conter todos os argumentos `java` necessários:

**Exemplos de Uso de Arquivos de Argumento com Caminhos** Você pode incluir caminhos relativos em arquivos de argumento; no entanto, eles são relativos ao diretório de trabalho atual e não aos caminhos dos próprios arquivos de argumento. No exemplo a seguir, `path1/options` e `path2/options` representam arquivos de argumento com caminhos diferentes. Quaisquer caminhos relativos que eles contenham são relativos ao diretório de trabalho atual e não aos arquivos de argumento:

## Análise do Estado do Code Heap

### Visão Geral

Há ocasiões em que ter uma visão sobre o estado atual do `code heap` da JVM seria útil para responder a perguntas como:

  * Por que o JIT foi desligado e depois ligado repetidamente?
  * Para onde foi todo o espaço do `code heap`?
  * Por que o `method sweeper` não está funcionando de forma eficaz?

Para fornecer essa visão, um recurso de análise do estado do `code heap` foi implementado, que permite a análise em tempo real do `code heap`. O processo de análise é dividido em duas partes. A primeira parte examina todo o `code heap` e agrega todas as informações que se acredita serem úteis ou importantes. A segunda parte consiste em várias etapas independentes que imprimem as informações coletadas com ênfase em diferentes aspectos dos dados. A coleta e a impressão de dados são feitas "sob demanda".

### Sintaxe

Solicitações para análise em tempo real, "on-the-fly", podem ser emitidas com o seguinte comando:

`jcmd pid Compiler.CodeHeap_Analytics [function] [granularity]`

`-Xlog:codecache=Trace` Se você estiver interessado apenas em como o `code heap` se parece após executar uma carga de trabalho de exemplo, você pode usar a opção de linha de comando.

`-Xlog:codecache=Debug` Para ver o estado do `code heap` quando uma condição de "CodeCache full" existe, inicie a VM com a opção de linha de comando.

## Habilitar Log com o Framework de Log Unificado da JVM

Você usa a opção `-Xlog` para configurar ou habilitar o log com o framework de log unificado da Java Virtual Machine (JVM).

### Sinopse

`what` Especifica uma combinação de tags e níveis no formato `tag1[+tag2...][*][=level][,...]`. A menos que o curinga (`*`) seja especificado, apenas as mensagens de log marcadas exatamente com as tags especificadas são correspondidas. Consulte Tags e Níveis de -Xlog.

`output` Define o tipo de saída. Omitir o tipo de saída assume `stdout` como padrão. Consulte Saída de -Xlog.

`decorators` Configura a saída para usar um conjunto personalizado de decoradores. Omitir os decoradores assume `uptime`, `level` e `tags` como padrão. Consulte Decorações.

`output-options` Define as opções de saída de log de `-Xlog`.

### Descrição

O framework de log unificado da Java Virtual Machine (JVM) fornece um sistema de log comum para todos os componentes da JVM. O log de GC para a JVM foi alterado para usar o novo framework de log. O mapeamento das antigas flags de GC para a nova configuração `Xlog` correspondente é descrito em Converter Flags de Log de GC para Xlog. Além disso, o log de tempo de execução também foi alterado para usar o framework de log unificado da JVM. O mapeamento das flags de log de tempo de execução legadas para a nova configuração `Xlog` correspondente é descrito em Converter Flags de Log de Tempo de Execução para Xlog.

O seguinte fornece uma referência rápida ao comando `-Xlog` e à sintaxe para as opções:

`-Xlog` Habilita o log da JVM em nível `info`.

`-Xlog:help` Imprime a sintaxe de uso de `-Xlog` e as tags, níveis e decoradores disponíveis, juntamente com exemplos de linhas de comando com explicações.

`-Xlog:disable` Desliga todo o log e limpa toda a configuração do framework de log, incluindo a configuração padrão para avisos e erros.

`-Xlog[:option]` Aplica múltiplos argumentos na ordem em que aparecem na linha de comando. Múltiplos argumentos `-Xlog` para a mesma saída se sobrescrevem na ordem em que são dados.

A opção é definida como:

Omitting the tag-selection defaults to a tag-set of all and a level of info.

`tag[+...] all`

A tag `all` é uma meta tag que consiste em todos os conjuntos de tags disponíveis. O asterisco `*` em uma definição de conjunto de tags denota uma correspondência de tag curinga. A correspondência com um curinga seleciona todos os conjuntos de tags que contêm pelo menos as tags especificadas. Sem o curinga, apenas as correspondências exatas dos conjuntos de tags especificados são selecionadas.

`output-options` é `filecount=file-count filesize=file-size` com sufixo opcional `K`, `M` ou `G`

### Configuração Padrão

Quando a opção `-Xlog` e nada mais é especificado na linha de comando, a configuração padrão é usada. A configuração padrão registra todas as mensagens com um nível que corresponde a `warning` ou `error`, independentemente das tags associadas à mensagem. A configuração padrão é equivalente a inserir o seguinte na linha de comando:

### Controlando o Log em Tempo de Execução

O log também pode ser controlado em tempo de execução através de Comandos de Diagnóstico (com o utilitário `jcmd`). Tudo o que pode ser especificado na linha de comando também pode ser especificado dinamicamente com o comando `VM.log`. Como os comandos de diagnóstico são automaticamente expostos como MBeans, você pode usar JMX para alterar a configuração de log em tempo de execução.

### Tags e Níveis de `-Xlog`

Cada mensagem de log tem um nível e um conjunto de tags associados a ela. O nível da mensagem corresponde aos seus detalhes, e o conjunto de tags corresponde ao que a mensagem contém ou qual componente da JVM ela envolve (como `gc`, `jit` ou `os`). O mapeamento das flags de GC para a configuração `Xlog` é descrito em Converter Flags de Log de GC para `Xlog`.

**Níveis de log disponíveis:**

  * off
  * trace
  * debug
  * info
  * warning
  * error

**Tags de log disponíveis:**

Existem literalmente dezenas de tags de log, que, nas combinações certas, permitirão uma variedade de saídas de log. O conjunto completo de tags de log disponíveis pode ser visto usando `-Xlog:help`. Especificar `all` em vez de uma combinação de tags corresponde a todas as combinações de tags.

### Saída de `-Xlog`

A opção `-Xlog` suporta os seguintes tipos de saída:

  * `stdout` \- Envia a saída para `stdout`
  * `stderr` \- Envia a saída para `stderr`
  * `file=filename` \- Envia a saída para arquivo(s) de texto.

Ao usar `file=filename`, especificar `%p` e/ou `%t` no nome do arquivo expande para o PID da JVM e o timestamp de inicialização, respectivamente. Você também pode configurar arquivos de texto para lidar com a rotação de arquivos com base no tamanho do arquivo e no número de arquivos a serem rotacionados. Por exemplo, para rotacionar o arquivo de log a cada 10 MB e manter 5 arquivos em rotação, especifique as opções `filesize=10M`, `filecount=5`. O tamanho alvo dos arquivos não é garantido ser exato, é apenas um valor aproximado. Os arquivos são rotacionados por padrão com até 5 arquivos rotacionados de tamanho alvo de 20 MB, a menos que configurado de outra forma. Especificar `filecount=0` significa que o arquivo de log não deve ser rotacionado. Existe a possibilidade de o arquivo de log pré-existente ser sobrescrito.

### Decorações

As mensagens de log são decoradas com informações sobre a mensagem. Você pode configurar cada saída para usar um conjunto personalizado de decoradores. A ordem da saída é sempre a mesma listada na tabela. Você pode configurar as decorações a serem usadas em tempo de execução. As decorações são prefixadas à mensagem de log. Por exemplo:

Omitting `decorators` defaults to `uptime`, `level`, and `tags`. The `none` decorator is special and is used to turn off all decorations.

Os decoradores `time` (t), `utctime` (utc), `uptime` (u), `timemillis` (tm), `uptimemillis` (um), `timenanos` (tn), `uptimenanos` (un), `hostname` (hn), `pid` (p), `tid` (ti), `level` (l), `tags` (tg) também podem ser especificados como `none` para nenhuma decoração.

**Descrição das Decorações** `time` ou `t` \- Hora e data atuais no formato ISO-8601. `utctime` ou `utc` \- Tempo Universal Coordenado. `uptime` ou `u` \- Tempo desde o início da JVM em segundos e milissegundos. Por exemplo, 6.567s. `timemillis` ou `tm` \- O mesmo valor gerado por `System.currentTimeMillis()`. `uptimemillis` ou `um` \- Milissegundos desde o início da JVM. `timenanos` ou `tn` O mesmo valor gerado por `System.nanoTime()`. `uptimenanos` ou `un` \- Nanossegundos desde o início da JVM. `hostname` ou `hn` \- O nome do host. `pid` ou `p` \- O identificador do processo. `tid` ou `ti` \- O identificador da thread. `level` ou `l` \- O nível associado à mensagem de log. `tags` ou `tg` \- O conjunto de tags associado à mensagem de log.

### Exemplos de Uso de `-Xlog`

A seguir estão exemplos de `-Xlog`.

`-Xlog` Registra todas as mensagens usando o nível `info` para `stdout` com decorações de `uptime`, `levels` e `tags`. Isso é equivalente a usar:

`-Xlog:gc` Registra mensagens marcadas com a tag `gc` usando o nível `info` para `stdout`. A configuração padrão para todas as outras mensagens no nível `warning` está em vigor.

`-Xlog:gc,safepoint` Registra mensagens marcadas com as tags `gc` ou `safepoint`, ambas usando o nível `info`, para `stdout`, com decorações padrão. Mensagens marcadas com `gc` e `safepoint` não serão registradas.

`-Xlog:gc+ref=debug` Registra mensagens marcadas com as tags `gc` e `ref`, usando o nível `debug` para `stdout`, com decorações padrão. Mensagens marcadas apenas com uma das duas tags não serão registradas.

`-Xlog:gc=debug:file=gc.txt:none` Registra mensagens marcadas com a tag `gc` usando o nível `debug` para um arquivo chamado `gc.txt` sem decorações. A configuração padrão para todas as outras mensagens no nível `warning` ainda está em vigor.

`-Xlog:gc=trace:file=gctrace.txt:uptimemillis,pids:filecount=5,filesize=1024` Registra mensagens marcadas com a tag `gc` usando o nível `trace` para um conjunto de arquivos rotativos com 5 arquivos de tamanho 1 MB com o nome base `gctrace.txt` e usa as decorações `uptimemillis` e `pid`.

A configuração padrão para todas as outras mensagens no nível `warning` ainda está em vigor.

`-Xlog:gc::uptime,tid` Registra mensagens marcadas com a tag `gc` usando o nível padrão 'info' para a saída padrão `stdout` e usa as decorações `uptime` e `tid`. A configuração padrão para todas as outras mensagens no nível `warning` ainda está em vigor.

`-Xlog:gc*=info,safepoint*=off` Registra mensagens marcadas com pelo menos `gc` usando o nível `info`, mas desativa o log de mensagens marcadas com `safepoint`. Mensagens marcadas com `gc` e `safepoint` não serão registradas.

`-Xlog:disable -Xlog:safepoint=trace:safepointtrace.txt` Desativa todo o log, incluindo avisos e erros, e então habilita mensagens marcadas com `safepoint` usando o nível `trace` para o arquivo `safepointtrace.txt`. A configuração padrão não se aplica, porque a linha de comando começou com `-Xlog:disable`.

### Exemplos de Uso Complexo de `-Xlog`

A seguir, são descritos alguns exemplos complexos de uso da opção `-Xlog`.

`-Xlog:gc+class*=debug` Registra mensagens marcadas com pelo menos as tags `gc` e `class` usando o nível `debug` para `stdout`. A configuração padrão para todas as outras mensagens no nível `warning` está em vigor.

`-Xlog:gc+meta*=trace,class*=off:file=gcmetatrace.txt` Registra mensagens marcadas com pelo menos as tags `gc` e `meta` usando o nível `trace` para o arquivo `metatrace.txt`, mas desativa todas as mensagens marcadas com `class`. Mensagens marcadas com `gc`, `meta` e `class` não serão registradas, pois `class*` está definido como `off`. A configuração padrão para todas as outras mensagens no nível `warning` está em vigor, exceto para aquelas que incluem `class`.

`-Xlog:gc+meta=trace` Registra mensagens marcadas exatamente com as tags `gc` e `meta` usando o nível `trace` para `stdout`. A configuração padrão para todas as outras mensagens no nível `warning` ainda estará em vigor.

`-Xlog:gc+class+heap*=debug,meta*=warning,threads*=off` Registra mensagens marcadas com pelo menos as tags `gc`, `class` e `heap` usando o nível `trace` para `stdout`, mas registra apenas mensagens marcadas com `meta` com nível. A configuração padrão para todas as outras mensagens no nível `warning` está em vigor, exceto para aquelas que incluem `threads`.
## Validar Argumentos de Flag da Java Virtual Machine

Os valores fornecidos a todos os argumentos de linha de comando da Java Virtual Machine (JVM) são usados para validação e, se o valor de entrada for inválido ou estiver fora do intervalo, uma mensagem de erro apropriada é exibida.

Sejam eles definidos ergonomicamente, em uma linha de comando, por uma ferramenta de entrada ou através das APIs (por exemplo, classes contidas no pacote `java.lang.management`), os valores fornecidos a todos os argumentos de linha de comando da Java Virtual Machine (JVM) são validados. A ergonomia é descrita no Guia de Ajuste de Coleta de Lixo da Java Platform, Standard Edition HotSpot Virtual Machine.

O intervalo e as restrições são validados quando todos os argumentos têm seus valores definidos durante a inicialização da JVM ou quando o valor de um argumento é alterado durante o tempo de execução (por exemplo, usando a ferramenta `jcmd`). A JVM é encerrada se um valor violar a verificação de intervalo ou restrição, e uma mensagem de erro apropriada é impressa no `error stream`.

Por exemplo, se um argumento violar uma verificação de intervalo ou restrição, a JVM é encerrada com um erro:

O argumento `-XX:+PrintFlagsRanges` imprime o intervalo de todos os argumentos. Este argumento permite o teste automático dos argumentos pelos valores fornecidos pelos intervalos. Para os argumentos que têm os intervalos especificados, o tipo, o nome e o intervalo real são impressos na saída.

Por exemplo,

Para os argumentos que não têm o intervalo especificado, os valores não são exibidos na saída. Por exemplo:

Isso ajuda a identificar os argumentos que precisam ser implementados. A estrutura de teste automático pode pular os argumentos que não têm valores e não são implementados.

## Large Pages

Você usa `large pages`, também conhecidas como `huge pages`, como páginas de memória que são significativamente maiores do que o tamanho padrão da página de memória (que varia dependendo do processador e do sistema operacional). `Large pages` otimizam os `Translation-Lookaside Buffers` do processador.

Um `Translation-Lookaside Buffer` (TLB) é um cache de tradução de páginas que armazena as traduções de endereços virtuais para físicos usadas mais recentemente. Um TLB é um recurso de sistema escasso. Uma falha de TLB pode ser custosa porque o processador deve então ler da tabela de páginas hierárquica, o que pode exigir múltiplos acessos à memória. Ao usar um tamanho de página de memória maior, uma única entrada de TLB pode representar um intervalo de memória maior. Isso resulta em menos pressão sobre um TLB, e aplicações intensivas em memória podem ter melhor desempenho.

No entanto, a memória de `large pages` pode afetar negativamente o desempenho do sistema. Por exemplo, quando uma grande quantidade de memória é fixada por uma aplicação, isso pode criar uma escassez de memória regular e causar paginação excessiva em outras aplicações, desacelerando todo o sistema. Além disso, um sistema que está ativo por muito tempo pode produzir fragmentação excessiva, o que pode impossibilitar a reserva de memória suficiente para `large pages`. Quando isso acontece, o sistema operacional ou a JVM voltam a usar páginas regulares.

Linux e Windows suportam `large pages`.

### Suporte a Large Pages para Linux

O kernel 2.6 suporta `large pages`. Alguns fornecedores fizeram o `backport` do código para suas versões baseadas em 2.4. Para verificar se seu sistema pode suportar memória de `large pages`, tente o seguinte:

```bash
cat /proc/meminfo | grep Huge
```

Se a saída mostrar as três variáveis "Huge", então seu sistema pode suportar memória de `large pages`, mas precisa ser configurado. Se o comando não imprimir nada, então seu sistema não suporta `large pages`. Para configurar o sistema para usar memória de `large pages`, faça login como `root` e siga estes passos:

  * Se você estiver usando a opção `-XX:+UseSHM` (em vez de `-XX:+UseHugeTLBFS`), então aumente o valor de `SHMMAX`. Ele deve ser maior do que o tamanho do `heap` Java. Em um sistema com 4 GB de RAM física (ou menos), o seguinte torna toda a memória compartilhável:

    ```bash
    echo 4294967295 > /proc/sys/kernel/shmmax
    ```

  * Se você estiver usando a opção `-XX:+UseSHM` ou `-XX:+UseHugeTLBFS`, então especifique o número de `large pages`. No exemplo a seguir, 3 GB de um sistema de 4 GB são reservados para `large pages` (assumindo um tamanho de `large page` de `2048kB`, então `3 GB = 3 * 1024 MB = 3072 MB = 3072 * 1024 kB = 3145728 kB` e `3145728 kB / 2048 kB = 1536`):

    ```bash
    echo 1536 > /proc/sys/vm/nr_hugepages
    ```

**Nota:** Os valores contidos em `/proc` são redefinidos após a reinicialização do sistema, então você pode querer defini-los em um script de inicialização (por exemplo, `rc.local` ou `sysctl.conf`).

  * Se você configurar (ou redimensionar) os parâmetros do kernel do sistema operacional `/proc/sys/kernel/shmmax` ou `/proc/sys/vm/nr_hugepages`, os processos Java podem alocar `large pages` para áreas além do `heap` Java. Estes passos podem alocar `large pages` para as seguintes áreas:
    * `heap` Java
    * `cache` de código
    * A estrutura de dados `marking bitmap` para o `parallel GC`

### Suporte a Large Pages para Windows

Para usar o suporte a `large pages` no Windows, o administrador deve primeiro atribuir privilégios adicionais ao usuário que está executando a aplicação:

  * Selecione Painel de Controle, Ferramentas Administrativas e, em seguida, Política de Segurança Local.
  * Selecione Políticas Locais e, em seguida, Atribuição de Direitos de Usuário.
  * Dê um duplo clique em `Lock pages in memory` (Bloquear páginas na memória), então adicione usuários e/ou grupos.
  * Reinicie seu sistema.

Observe que esses passos são necessários mesmo que seja o administrador quem esteja executando a aplicação, porque os administradores, por padrão, não têm o privilégio de `lock pages in memory`.

## Application Class Data Sharing

`Application Class Data Sharing` (AppCDS) estende o `class data sharing` (CDS) para permitir que classes de aplicação sejam colocadas em um arquivo compartilhado.

Além das classes da biblioteca principal, o AppCDS suporta `Class Data Sharing` dos seguintes locais:

  * Classes de plataforma da imagem de tempo de execução
  * Classes de aplicação da imagem de tempo de execução
  * Classes de aplicação do `classpath`
  * Classes de aplicação do `module path`

O arquivamento de classes de aplicação proporciona um tempo de inicialização melhor em tempo de execução. Ao executar múltiplos processos JVM, o AppCDS também reduz o `footprint` de tempo de execução com o compartilhamento de memória para metadados somente leitura.

CDS/AppCDS suporta o arquivamento de classes apenas de arquivos JAR.

Antes do JDK 11, um diretório não vazio era reportado como um erro fatal nas seguintes condições:

  * Para o CDS base, um diretório não vazio não pode existir no caminho `-Xbootclasspath/a`
  * Com `-XX:+UseAppCDS`, um diretório não vazio não poderia existir no caminho `-Xbootclasspath/a`, `classpath` e `module path`.

No JDK 11 e posterior, `-XX:+UseAppCDS` está obsoleto e o comportamento para um diretório não vazio é baseado nos tipos de classe na `classlist`. Um diretório não vazio é reportado como um erro fatal nas seguintes condições:

  * Se classes de aplicação ou classes de plataforma não forem carregadas, o `dump time` só reporta um erro se um diretório não vazio existir no caminho `-Xbootclasspath/a`
  * Se classes de aplicação ou classes de plataforma forem carregadas, o `dump time` reporta um erro para um diretório não vazio que existe no caminho `-Xbootclasspath/a`, `classpath` ou `module path`

No JDK 11 e posterior, usar `-XX:DumpLoadedClassList=class_list_file` resulta em uma `classlist` gerada com todas as classes (tanto classes de biblioteca do sistema quanto classes de aplicação) incluídas. Você não precisa mais especificar `-XX:+UseAppCDS` com `-XX:DumpLoadedClassList` para produzir uma lista de classes completa.

No JDK 11 e posterior, como `UseAppCDS` está obsoleto, `SharedArchiveFile` torna-se um `product flag` por padrão. A especificação de `+UnlockDiagnosticVMOptions` para `SharedArchiveFile` não é mais necessária em nenhuma configuração.

`Class Data Sharing` (CDS)/AppCDS não suporta o arquivamento de classes de `array` em uma `class list`. Quando um `array` na `class list` é encontrado, o `dump time` do CDS exibe a mensagem de erro explícita:

```
Error: Cannot archive array class: [Ljava/lang/Object;
```

Embora um `array` na `class list` não seja permitido, algumas classes de `array` ainda podem ser criadas no `dump time` do CDS/AppCDS. Esses `arrays` são criados durante a execução do código Java usado pelos `class loaders` Java (`PlatformClassLoader` e o `system class loader`) para carregar classes no `dump time`. Os `arrays` criados são arquivados com o restante das classes carregadas.

### Estendendo o Class Data Sharing para Suportar o Module Path

`Class Data Sharing` (CDS) foi aprimorado para suportar o arquivamento de classes do `module path`.

  * Para criar um arquivo CDS usando a opção VM `--module-path`, use a seguinte sintaxe de linha de comando:

    ```bash
    java -Xshare:dump --module-path <mp> --module <module_name>
    ```

  * Para executar com um arquivo CDS usando a opção VM `--module-path`, use a seguinte sintaxe de linha de comando:

    ```bash
    java -Xshare:on --module-path <mp> --module <module_name>
    ```

A tabela a seguir descreve como as opções da VM relacionadas a `module paths` podem ser usadas juntamente com a opção `-Xshare`:

| Opção VM | `dump time` | `run time` | Notas |
| :---------------- | :---------- | :--------- | :---- |
| `--module-path` | Suportado | Suportado | `1`, `2` |
| `--upgrade-module-path` | Não suportado | Não suportado | `3` |
| `--patch-module` | Não suportado | Não suportado | `4` |
| `--limit-modules` | Não suportado | Não suportado | `5` |

`1` Embora existam duas maneiras de especificar um módulo em um `--module-path`, ou seja, JAR modular ou módulo explodido, apenas JARs modulares são suportados.

`2` Diferentes `mp` podem ser especificados durante o `dump time` versus o `run time`. Se uma classe arquivada `K` foi carregada de `mp1.jar` no `dump time`, mas mudanças no `mp` fazem com que ela esteja disponível de um `mp2.jar` diferente no `run time`, então a versão arquivada de `K` será desconsiderada no `run time`; `K` será carregada dinamicamente.

`3` Atualmente, apenas dois módulos do sistema são atualizáveis (`java.compiler` e `jdk.internal.vm.compiler`). No entanto, esses módulos raramente são atualizados em software de produção.

`4` Conforme documentado na JEP 261, o uso de `--patch-module` é fortemente desencorajado para uso em produção.

`5` `--limit-modules` é destinado a fins de teste. Raramente é usado em software de produção.

Se `--upgrade-module-path`, `--patch-module` ou `--limit-modules` for especificado no `dump time`, um erro será impresso e a JVM será encerrada. Por exemplo, se a opção `--limit-modules` for especificada no `dump time`, o usuário verá o seguinte erro:

```
Error: Cannot use --limit-modules with -Xshare:dump
```

Se `--upgrade-module-path`, `--patch-module` ou `--limit-modules` for especificado no `run time`, uma mensagem de aviso será impressa indicando que o CDS está desabilitado. Por exemplo, se a opção `--limit-modules` for especificada no `run time`, o usuário verá o seguinte aviso:

```
Warning: CDS is disabled when --limit-modules is specified
```

Várias outras coisas notáveis incluem:

Qualquer combinação válida de `-cp` e `--module-path` é suportada.

  * Um diretório não vazio no `module path` causa um erro fatal. O usuário verá as seguintes mensagens de erro:

    ```
    Error: Non-empty directory in module path: <directory_name>
    ```

  * Ao contrário do `classpath`, não há restrição de que o `module path` no `dump time` deva ser igual ou um prefixo do `module path` no `run time`.

  * O arquivo é invalidado se um JAR existente no `module path` for atualizado após a geração do arquivo.

  * Remover um JAR do `module path` não invalida o arquivo compartilhado. Classes arquivadas do JAR removido não são usadas em tempo de execução.

### Dynamic CDS archive

O `Dynamic CDS archive` estende o AppCDS para permitir o arquivamento de classes quando uma aplicação Java é encerrada. Ele melhora a usabilidade do AppCDS eliminando a etapa de execução de teste para criar uma `class list` para cada aplicação. As classes arquivadas incluem todas as classes de aplicação carregadas e classes de biblioteca que não estão presentes no arquivo CDS padrão incluído no JDK.

Um `base archive` é necessário ao criar um `dynamic archive`. Se o `base archive` não for especificado, o arquivo CDS padrão é usado como `base archive`.

Para criar um `dynamic CDS archive` com o arquivo CDS padrão como `base archive`, basta adicionar a opção `-XX:ArchiveClassesAtExit=<dynamic archive>` à linha de comando para executar a aplicação Java.

Se o arquivo CDS padrão não existir, a VM será encerrada com o seguinte erro:

```
Error: Default CDS archive not found.
```

Para executar a aplicação Java usando um `dynamic CDS archive`, basta adicionar a opção `-XX:SharedArchiveFile=<dynamic archive>` à linha de comando para executar a aplicação Java.

O `base archive` não precisa ser especificado na linha de comando. As informações do `base archive`, incluindo seu nome e caminho completo, serão recuperadas do cabeçalho do `dynamic archive`. Observe que o usuário também pode usar a opção `-XX:SharedArchiveFile` para especificar um arquivo AppCDS regular. Portanto, o arquivo especificado na opção `-XX:SharedArchiveFile` pode ser um arquivo regular ou dinâmico. Durante a inicialização da VM, o cabeçalho do arquivo especificado será lido. Se `-XX:SharedArchiveFile` se referir a um arquivo regular, o comportamento permanecerá inalterado. Se `-XX:SharedArchiveFile` se referir a um `dynamic archive`, a VM recuperará a localização do `base archive` do `dynamic archive`. Se o `dynamic archive` foi criado com o arquivo CDS padrão, então o arquivo CDS padrão atual será usado e será encontrado em relação ao ambiente de tempo de execução atual.

Consulte `JDK-8221706` para obter detalhes sobre a verificação de erros durante o `dump time` e o `run time` do `dynamic CDS archive`.

### Criando um Arquivo Compartilhado e Usando-o para Executar uma Aplicação

**Arquivo AppCDS** Os passos a seguir criam um arquivo compartilhado que contém todas as classes usadas pela aplicação `test.Hello`. O último passo executa a aplicação com o arquivo compartilhado.

Crie uma lista de todas as classes usadas pela aplicação `test.Hello`. O comando a seguir cria um arquivo chamado `hello.classlist` que contém uma lista de todas as classes usadas por esta aplicação:

```bash
java -Xshare:dump -XX:DumpLoadedClassList=hello.classlist -cp hello.jar test.Hello
```

Observe que o `classpath` especificado pelo parâmetro `-cp` deve conter apenas arquivos JAR.

Crie um arquivo compartilhado, chamado `hello.jsa`, que contém todas as classes em `hello.classlist`:

```bash
java -Xshare:dump -XX:SharedArchiveFile=hello.jsa -cp hello.jar -XX:ClassListFile=hello.classlist
```

Observe que o `classpath` usado no momento da criação do arquivo deve ser o mesmo (ou um prefixo) do `classpath` usado no `run time`.

Execute a aplicação `test.Hello` com o arquivo compartilhado `hello.jsa`:

```bash
java -Xshare:on -XX:SharedArchiveFile=hello.jsa -cp hello.jar test.Hello
```

Opcional Verifique se a aplicação `test.Hello` está usando a classe contida no arquivo compartilhado `hello.jsa`:

```bash
java -Xshare:on -XX:SharedArchiveFile=hello.jsa -cp hello.jar -verbose:class test.Hello
```

A saída deste comando deve conter o seguinte texto:

```
[class,load] test.Hello source: shared objects file
```

**Arquivo CDS Dinâmico**

Os passos a seguir criam um arquivo `dynamic CDS archive` que contém as classes usadas pela aplicação `test.Hello` e que não estão incluídas no arquivo CDS padrão. O segundo passo executa a aplicação com o `dynamic CDS archive`.

Crie um `dynamic CDS archive`, chamado `hello.jsa`, que contém todas as classes em `hello.jar` carregadas pela aplicação `test.Hello`:

```bash
java -XX:ArchiveClassesAtExit=hello.jsa -cp hello.jar test.Hello
```

Observe que o `classpath` usado no momento da criação do arquivo deve ser o mesmo (ou um prefixo) do `classpath` usado no `run time`. Execute a aplicação `test.Hello` com o arquivo compartilhado `hello.jsa`:

```bash
java -XX:SharedArchiveFile=hello.jsa -cp hello.jar test.Hello
```

Opcional Repita o passo 4 da seção anterior para verificar se a aplicação `test.Hello` está usando a classe contida no arquivo compartilhado `hello.jsa`. Para automatizar os passos 1 e 2 acima, pode-se escrever um script como o seguinte:

```bash
#!/bin/bash
JAVA_HOME=/usr/java/jdk-11
$JAVA_HOME/bin/java -XX:ArchiveClassesAtExit=hello.jsa -cp hello.jar test.Hello
$JAVA_HOME/bin/java -XX:SharedArchiveFile=hello.jsa -cp hello.jar test.Hello
```

Assim como um arquivo AppCDS, o arquivo precisa ser regenerado se a versão do Java tiver mudado. O script acima pode ser ajustado para considerar a versão do Java da seguinte forma:

```bash
#!/bin/bash
JAVA_HOME=/usr/java/jdk-11
ARCHIVE=hello-$($JAVA_HOME/bin/java -version 2>&1 | head -1 | cut -d'"' -f2).jsa
$JAVA_HOME/bin/java -XX:ArchiveClassesAtExit=$ARCHIVE -cp hello.jar test.Hello
$JAVA_HOME/bin/java -XX:SharedArchiveFile=$ARCHIVE -cp hello.jar test.Hello
```

Atualmente, não suportamos operações de `dumping` concorrentes para o mesmo arquivo CDS. Deve-se ter cuidado para evitar múltiplos escritores no mesmo arquivo CDS. O usuário também pode criar um `dynamic CDS archive` com um `base archive` específico, por exemplo, nomeado como `base.jsa`, da seguinte forma:

```bash
java -Xshare:dump -XX:SharedArchiveFile=base.jsa -cp base.jar
java -XX:ArchiveClassesAtExit=hello.jsa -XX:SharedArchiveFile=base.jsa -cp hello.jar test.Hello
```

Para executar a aplicação usando o `dynamic CDS archive` `hello.jsa` e um `base CDS archive` específico `base.jsa`:

```bash
java -XX:SharedArchiveFile=hello.jsa -XX:SharedArchiveFile=base.jsa -cp hello.jar test.Hello
```

Observe que no Windows, o delimitador de caminho acima `:` deve ser substituído por `;`.

O comando acima para especificar um `base archive` é útil se o `base archive` usado para criar o `dynamic archive` foi movido. Normalmente, apenas especificar o `dynamic archive` deve ser suficiente, pois as informações do `base archive` podem ser recuperadas do cabeçalho do `dynamic archive`.

### Compartilhando um Arquivo Compartilhado Entre Múltiplos Processos de Aplicação

Você pode compartilhar o mesmo arquivo de arquivo entre múltiplos processos de aplicação. Isso reduz o uso de memória porque o arquivo é mapeado na memória para o espaço de endereço dos processos. O sistema operacional compartilha automaticamente as páginas somente leitura entre esses processos.

Os passos a seguir demonstram como criar um arquivo comum que pode ser compartilhado por diferentes aplicações. Classes de `common.jar`, `hello.jar` e `hi.jar` são arquivadas em `common.jsa` porque todas estão no `classpath` durante a etapa de arquivamento (passo 3).

Para incluir classes de `hello.jar` e `hi.jar`, os arquivos `.jar` devem ser adicionados ao `classpath` especificado pelo parâmetro `-cp`.

Crie uma lista de todas as classes usadas pela aplicação Hello e outra lista para a aplicação Hi:

```bash
java -Xshare:dump -XX:DumpLoadedClassList=hello.classlist -cp common.jar:hello.jar test.Hello
java -Xshare:dump -XX:DumpLoadedClassList=hi.classlist -cp common.jar:hi.jar test.Hi
```

Crie uma única lista de classes usadas por todas as aplicações que compartilharão o arquivo de arquivo compartilhado. **Linux e macOS** Os comandos a seguir combinam os arquivos `hello.classlist` e `hi.classlist` em um único arquivo, `common.classlist`:

```bash
cat hello.classlist hi.classlist > common.classlist
```

**Windows** Os comandos a seguir combinam os arquivos `hello.classlist` e `hi.classlist` em um único arquivo, `common.classlist`:

```cmd
type hello.classlist hi.classlist > common.classlist
```

Crie um arquivo compartilhado chamado `common.jsa` que contém todas as classes em `common.classlist`:

```bash
java -Xshare:dump -XX:SharedArchiveFile=common.jsa -cp common.jar:hello.jar:hi.jar -XX:ClassListFile=common.classlist
```

O parâmetro `classpath` usado é o prefixo de `classpath` comum compartilhado pelas aplicações Hello e Hi.

Execute as aplicações `Hello` e `Hi` com o mesmo arquivo compartilhado:

```bash
java -Xshare:on -XX:SharedArchiveFile=common.jsa -cp common.jar:hello.jar test.Hello
java -Xshare:on -XX:SharedArchiveFile=common.jsa -cp common.jar:hi.jar test.Hi
```

### Especificando Dados Compartilhados Adicionais Adicionados a um Arquivo

A opção `SharedArchiveConfigFile` é usada para especificar dados compartilhados adicionais a serem adicionados ao arquivo de arquivo.

O JDK 9 e posterior suporta a adição de símbolos e objetos `string` a um arquivo para compartilhamento de memória quando você tem múltiplos processos JVM executando no mesmo `host`. Um exemplo disso é ter múltiplos processos JVM que usam o mesmo conjunto de classes Java EE. Quando essas classes comuns são carregadas e usadas, novos símbolos e `strings` podem ser criados e adicionados às tabelas internas de "símbolos" e "`strings`" da JVM. Em tempo de execução, os símbolos ou objetos `string` mapeados do arquivo podem ser compartilhados entre múltiplos processos JVM, resultando em uma redução do uso geral de memória. Além disso, o arquivamento de `strings` também oferece benefícios adicionais de desempenho tanto no tempo de inicialização quanto na execução em tempo de execução.

No JDK 10 e posterior, as entradas `CONSTANT_String` em classes arquivadas são resolvidas para objetos `String` `interned` no `dump time`, e todos os objetos `String` `interned` são arquivados. No entanto, mesmo que todos os literais `CONSTANT_String` em todas as classes arquivadas sejam resolvidos, ainda pode ser benéfico adicionar `strings` adicionais que não são literais de `string` em arquivos de classe, mas que provavelmente serão usadas pela sua aplicação no `run time`.

Os dados de símbolo devem ser gerados pela ferramenta `jcmd` anexando-se a um processo JVM em execução. Consulte `jcmd`.

A seguir, um exemplo do comando de `dumping` de símbolos em `jcmd`:

```bash
jcmd <pid> VM.symboltable > config.txt
```

**Nota:** A primeira linha (`process ID`) e a segunda linha (`@VERSION` ...) desta saída de `jcmd` devem ser excluídas do arquivo de configuração.

### Exemplo de um Arquivo de Configuração

A seguir, um exemplo de arquivo de configuração:

```
@SECTION: Symbol
java/lang/String
java/lang/Object
@SECTION: String
"Hello World"
"My Application"
```

No exemplo de arquivo de configuração, a entrada `@SECTION`: Symbol usa o seguinte formato:

```
@SECTION: <type>
<data>
```

O `refcount` para um símbolo compartilhado é sempre `-1`. `@SECTION` especifica o tipo da seção que o segue. Todos os dados dentro da seção devem ser do mesmo tipo especificado por `@SECTION`. Diferentes tipos de dados não podem ser misturados. Múltiplas seções de dados separadas para o mesmo tipo especificadas por diferentes `@SECTION` são permitidas dentro de um `shared_config_file`.
## Exemplos de Otimização de Desempenho

Você pode usar as opções avançadas de tempo de execução do Java para otimizar o desempenho de suas aplicações.

### Otimização para Maior Vazão

Use os seguintes comandos e opções avançadas para alcançar maior desempenho de vazão para sua aplicação:

### Otimização para Menor Tempo de Resposta

Use os seguintes comandos e opções avançadas para alcançar menores tempos de resposta para sua aplicação:

### Mantendo o Java Heap Pequeno e Reduzindo a Pegada Dinâmica de Aplicações Embarcadas

Use as seguintes opções avançadas de tempo de execução para manter o Java heap pequeno e reduzir a pegada dinâmica de aplicações embarcadas:

**Nota:** Os valores padrão para essas duas opções são 70% e 40%, respectivamente. Como sacrifícios de desempenho podem ocorrer ao usar essas configurações pequenas, você deve otimizar para uma pegada pequena reduzindo essas configurações o máximo possível sem introduzir degradação de desempenho inaceitável.

## Status de Saída

Os seguintes valores de saída são tipicamente retornados pelo *launcher* quando ele é chamado com argumentos incorretos, erros graves ou exceções lançadas pela JVM. No entanto, uma aplicação Java pode escolher retornar qualquer valor usando a chamada de API `System.exit(exitValue)`. Os valores são:

### Neste tutorial

Introdução à Ferramenta Java Sinopse Descrição Usando o Modo de Arquivo-Fonte para Lançar Programas de Código-Fonte de Arquivo Único Usando a Variável de Ambiente JDK_JAVA_OPTIONS do Launcher Visão Geral das Opções Java Opções Padrão para Java Opções Extras para Java Opções Extras para MacOS Opções Avançadas de Tempo de Execução Opções Avançadas do Compilador JIT Opções Avançadas de Capacidade de Serviço Opções Avançadas de Garbage Collection Opções Java Depreciadas Opções Java Obsoletas Opções Java Removidas Arquivos de Argumentos de Linha de Comando Análise do Estado do Code Heap Habilitar Log com o Framework de Log Unificado da JVM Validar Argumentos de Flag da Java Virtual Machine Páginas Grandes Compartilhamento de Dados de Classe de Aplicação Exemplos de Otimização de Desempenho Status de Saída

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Javadoc - o Gerador de Documentação](<#/doc/tutorials/jvm/tools/core/javadoc>)

➜

**Tutorial Atual**

Java - Seu Launcher de Aplicações

➜

**Próximo na Série**

[JShell - A Ferramenta Shell do Java](<#/doc/tutorials/jvm/tools/core/jshell>)

**Anterior na Série:** [Javadoc - o Gerador de Documentação](<#/doc/tutorials/jvm/tools/core/javadoc>)

**Próximo na Série:** [JShell - A Ferramenta Shell do Java](<#/doc/tutorials/jvm/tools/core/jshell>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas Essenciais do JDK ](<#/doc/tutorials/jvm/tools/core>) > Java - Seu Launcher de Aplicações