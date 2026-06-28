# O Comando jdb

## Nome

jdb - encontra e corrige bugs em programas da plataforma Java

## Sinopse

`jdb` [_options_] [_classname_] [_arguments_]

_options_
     Representa as opções de linha de comando do `jdb`. Veja Opções para o comando jdb.
_classname_
     Representa o nome da classe principal a ser depurada.
_arguments_
     Representa os argumentos que são passados para o método `main()` da classe.

## Descrição

O Java Debugger (JDB) é um depurador de linha de comando simples para classes Java. O comando `jdb` e suas opções chamam o JDB. O comando `jdb` demonstra a Java Platform Debugger Architecture e fornece inspeção e depuração de uma JVM local ou remota.

## Iniciar uma Sessão JDB

Existem muitas maneiras de iniciar uma sessão JDB. A maneira mais frequentemente usada é fazer com que o JDB inicie uma nova JVM com a classe principal da aplicação a ser depurada. Faça isso substituindo o comando `java` pelo comando `jdb` na linha de comando. Por exemplo, se a classe principal da sua aplicação for `MyClass`, então use o seguinte comando para depurá-la sob o JDB:

> `jdb MyClass`

Quando iniciado dessa forma, o comando `jdb` chama uma segunda JVM com os parâmetros especificados, carrega a classe especificada e para a JVM antes de executar a primeira instrução dessa classe.

Outra maneira de usar o comando `jdb` é anexá-lo a uma JVM que já esteja em execução. A sintaxe para iniciar uma JVM à qual o comando `jdb` se anexa quando a JVM está em execução é a seguinte. Isso carrega bibliotecas de depuração em processo e especifica o tipo de conexão a ser feita.

> `java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n MyClass`

Você pode então anexar o comando `jdb` à JVM com o seguinte comando:

> `jdb -attach 8000`

8000 é o endereço da JVM em execução.

O argumento `MyClass` não é especificado na linha de comando `jdb` neste caso porque o comando `jdb` está se conectando a uma JVM existente em vez de iniciar uma nova JVM.

Existem muitas outras maneiras de conectar o depurador a uma JVM, e todas elas são suportadas pelo comando `jdb`. A Java Platform Debugger Architecture possui documentação adicional sobre essas opções de conexão.

## Breakpoints

Breakpoints podem ser definidos no JDB em números de linha ou na primeira instrução de um método, por exemplo:

  * O comando `stop at MyClass:22` define um breakpoint na primeira instrução para a linha 22 do arquivo fonte contendo `MyClass`.

  * O comando `stop in java.lang.String.length` define um breakpoint no início do método `java.lang.String.length`.

  * O comando `stop in MyClass.<clinit>` usa `<clinit>` para identificar o código de inicialização estática para `MyClass`.

Quando um método é sobrecarregado, você também deve especificar seus tipos de argumento para que o método apropriado possa ser selecionado para um breakpoint. Por exemplo, `MyClass.myMethod(int,java.lang.String)` ou `MyClass.myMethod()`.

O comando `clear` remove breakpoints usando a seguinte sintaxe: `clear MyClass:45`. Usar o comando `clear` ou `stop` sem argumento exibe uma lista de todos os breakpoints atualmente definidos. O comando `cont` continua a execução.

## Stepping

O comando `step` avança a execução para a próxima linha, seja no stack frame atual ou em um método chamado. O comando `next` avança a execução para a próxima linha no stack frame atual.

## Exceções

Quando ocorre uma exceção para a qual não há uma instrução `catch` em nenhum lugar na call stack da thread que a lançou, a JVM tipicamente imprime um rastreamento de exceção e sai. No entanto, quando executado sob o JDB, o controle retorna ao JDB no ponto da exceção ofensiva. Você pode então usar o comando `jdb` para diagnosticar a causa da exceção.

Use o comando `catch` para fazer com que a aplicação depurada pare em outras exceções lançadas, por exemplo: `catch java.io.FileNotFoundException` ou `catch` `mypackage.BigTroubleException`. Qualquer exceção que seja uma instância da classe ou subclasse especificada para a aplicação no ponto em que a exceção é lançada.

O comando `ignore` anula o efeito de um comando `catch` anterior. O comando `ignore` não faz com que a JVM depurada ignore exceções específicas, mas apenas que ignore o depurador.

## Opções para o comando jdb

Quando você usa o comando `jdb` em vez do comando `java` na linha de comando, o comando `jdb` aceita muitas das mesmas opções que o comando `java`.

As seguintes opções são aceitas pelo comando `jdb`:

`-help`
     Exibe uma mensagem de ajuda.
`-sourcepath` _dir1_`:`_dir2_`:`...
     Usa o caminho especificado para procurar arquivos fonte no caminho especificado. Se esta opção não for especificada, então usa o caminho padrão de ponto (`.`).
`-attach` _address_
     Anexa o depurador a uma JVM em execução com o mecanismo de conexão padrão.
`-listen` _address_
     Aguarda uma JVM em execução para se conectar ao endereço especificado com um conector padrão.
`-listenany`
     Aguarda uma JVM em execução para se conectar em qualquer endereço disponível usando um conector padrão.
`-launch`
     Inicia a aplicação depurada imediatamente após a inicialização do comando `jdb`. A opção `-launch` remove a necessidade do comando `run`. A aplicação depurada é iniciada e então parada pouco antes da classe inicial da aplicação ser carregada. Nesse ponto, você pode definir quaisquer breakpoints necessários e usar o comando `cont` para continuar a execução.
`-listconnectors`
     Lista os conectores disponíveis nesta JVM.
`-connect` _connector-name_`:`_name1_`=`_value1_....
     Conecta-se à JVM de destino com o conector nomeado e os valores de argumento listados.
`-dbgtrace` [_flags_]
     Imprime informações para depurar o comando `jdb`.
`-tclient`
     Executa a aplicação no cliente Java HotSpot VM.
`-trackallthreads`
     Rastreia todas as threads à medida que são criadas, incluindo virtual threads. Veja Trabalhando com Virtual Threads abaixo.
`-tserver`
     Executa a aplicação no servidor Java HotSpot VM.
`-J` _option_
     Passa _option_ para a JVM do JDB, onde option é uma das opções descritas na página de referência para o launcher de aplicações Java. Por exemplo, `-J-Xms48m` define a memória de inicialização para 48 MB. Veja _Overview of Java Options_ em [java](<#/doc/guides/tools/java>).

As seguintes opções são encaminhadas para o processo depurado (debuggee):

`-R` _option_
     Passa _option_ para a JVM do debuggee, onde option é uma das opções descritas na página de referência para o launcher de aplicações Java. Por exemplo, `-R-Xms48m` define a memória de inicialização para 48 MB. Veja _Overview of Java Options_ em [java](<#/doc/guides/tools/java>).
`-v` ou `-verbose`[`:`_class_ |`gc`|`jni`]
     Ativa o modo verbose.
`-D` _name_`=`_value_
     Define uma propriedade de sistema.
`-classpath` _dir_
     Lista diretórios separados por dois pontos nos quais procurar classes.
`-X` _option_
     Uma opção não padrão da JVM de destino.

Outras opções são suportadas para fornecer mecanismos alternativos para conectar o depurador à JVM que ele deve depurar.

## Trabalhando com Virtual Threads

Frequentemente, virtual threads são criadas em números e frequência tão grandes que podem sobrecarregar um depurador. Por essa razão, por padrão, o JDB não rastreia virtual threads à medida que são criadas. Ele rastreará apenas virtual threads nas quais um evento ocorreu, como um evento de breakpoint. A opção `-trackallthreads` pode ser usada para fazer com que o JDB rastreie todas as virtual threads à medida que são criadas.

Quando o JDB se conecta pela primeira vez, ele solicita uma lista de todas as threads conhecidas do Debug Agent. Por padrão, o Debug Agent não retorna nenhuma virtual thread nesta lista, novamente porque a lista poderia ser tão grande que sobrecarregaria o depurador. O Debug Agent possui uma opção `includevirtualthreads` que pode ser ativada para mudar esse comportamento, de modo que todas as virtual threads conhecidas sejam incluídas na lista. A opção `-trackallthreads` do JDB fará com que o JDB ative automaticamente a opção `includevirtualthreads` do Debug Agent quando o JDB iniciar uma aplicação para depurar. No entanto, tenha em mente que o Debug Agent pode não ter conhecimento de quaisquer virtual threads que foram criadas antes do JDB se anexar à aplicação depurada.