# Comandos

## 3 Comandos

Os comandos JShell são inseridos em uma sessão JShell e usados para controlar o ambiente e exibir informações.

Tópicos

  * [Introdução aos Comandos](<#/doc/guides/jshell/commands>)

  * [Preenchimento por Tab para Comandos](<#/doc/guides/jshell/commands>)

  * [Abreviações de Comandos](<#/doc/guides/jshell/commands>)

### Introdução aos Comandos

Os comandos JShell controlam o ambiente e exibem informações dentro de uma sessão.

Os comandos são distinguidos de snippets por uma barra (/). Para obter informações sobre as variáveis, métodos e tipos atuais, use os comandos `/vars`, `/methods` e `/types`. Para uma lista de snippets inseridos, use o comando `/list`. O exemplo a seguir mostra esses comandos com base nos exemplos em [Experimentando Snippets](<#/doc/guides/jshell/snippets>):
```
    jshell> /vars
    |    int x = 45
    |    int $3 = 4
    |    String $5 = "OceanOcean"
    
    jshell> /methods
    |    twice (String)String
    
    jshell> /list
    
       1 : System.out.println("Hi");
       2 : int x = 45;
       3 : 2 + 2
       4 : String twice(String s) {
             return s + s;
           }
       5 : twice("Ocean")
```

Observe que os tipos e valores das variáveis e a assinatura de tipo dos métodos são exibidos.

O JShell possui um script de inicialização padrão que é executado silenciosa e automaticamente antes do JShell iniciar, para que você possa começar a trabalhar rapidamente. As entradas do script de inicialização não são listadas, a menos que você as solicite com o comando `/list -start` ou `/list -all`:
```
    jshell> /list -all
    
      s1 : import java.io.*;
      s2 : import java.math.*;
      s3 : import java.net.*;
      s4 : import java.nio.file.*;
      s5 : import java.util.*;
      s6 : import java.util.concurrent.*;
      s7 : import java.util.function.*;
      s8 : import java.util.prefs.*;
      s9 : import java.util.regex.*;
     s10 : import java.util.stream.*;
       1 : System.out.println("Hi");
       2 : int x = 45;
       3 : 2 + 2
       4 : String twice(String s) {
             return s + s;
           }
       5 : twice("Ocean")
```

O script de inicialização padrão consiste em vários imports comuns. Você pode personalizar suas entradas de inicialização com o comando `/set start`. Para obter informações sobre este comando, digite `/help /set start`. O comando `/save -start` salva o script de inicialização atual como um ponto de partida para seu próprio script de inicialização.

Outros comandos importantes incluem `/exit` para sair do JShell, `/save` para salvar seus snippets e `/open` para inserir snippets de um arquivo.

Digite `/help` para uma lista dos comandos JShell.

### Preenchimento por Tab para Comandos

Semelhante ao preenchimento de snippets, ao inserir comandos e opções de comando, use a tecla Tab para preencher automaticamente o comando ou a opção. Se o preenchimento não puder ser determinado a partir do que foi inserido, opções possíveis serão fornecidas.

O exemplo a seguir mostra o feedback quando a tecla Tab é pressionada após a barra inicial (/) para comandos:
```
    jshell> /<Tab>
    /!          /?          /drop       /edit       /env        /exit       /help
    /history    /imports    /list       /methods    /open       /reload     /reset      
    /save       /set        /types      /vars       
    
    <press tab again to see synopsis>
    
    jshell> /
```

Preenchimentos únicos são feitos no local. Por exemplo, depois de digitar `/l` e pressionar Tab, a linha é substituída por `/list`:
```
    jshell> /l<Tab>
    
    jshell> /list
```

O preenchimento por Tab também funciona para opções de comando. O exemplo a seguir mostra o uso da tecla Tab para exibir as opções para o comando `/list`:
```
    jshell> /list -<Tab>
    -all       -history   -start     
    
    <press tab again to see synopsis>
    
    jshell> /list -
```

Observe a mensagem sobre pressionar Tab novamente para mostrar a sinopse do comando, que é uma breve descrição do comando. Pressione Tab uma terceira vez para mostrar a documentação de ajuda completa. O exemplo a seguir mostra os resultados de pressionar Tab uma segunda e terceira vez:
```
    jshell> /list -<Tab>
    list the source you have typed
    
    <press tab again to see full documentation>
    
    jshell> /list -<Tab>
    Show the snippets, prefaced with their snippet IDs.
    
    /list
            List the currently active snippets of code that you typed or read with /open
    
    /list -start
            List the evaluated startup snippets
    
    /list -all
            List all snippets including failed, overwritten, dropped, and startup
    
    /list <name>
            List snippets with the specified name (preference for active snippets)
    
    /list <id>
            List the snippet with the specified snippet ID.
            One or more IDs or ID ranges may used, see '/help id'
    
    jshell> /list -
```

O preenchimento de argumentos únicos é feito no local. Por exemplo, depois de digitar `/list -a<Tab>`, a opção `-all` é exibida automaticamente:
```
    jshell> /list -a<Tab>
    
    jshell> /list -all
```

Nomes de snippets também podem ser preenchidos com Tab. Por exemplo, se você definiu o método `volume` anteriormente na sessão JShell, pressionar Tab depois de começar a digitar o nome do método resulta na exibição do nome completo do método:
```
    jshell> /ed v<Tab>
    
    jshell> /ed volume
```

Usar Tab em uma posição de argumento de arquivo do comando mostra os arquivos disponíveis:
```
    jshell> /open <Tab>
    myfile1      myfile2    definitions.jsh
    
    <press tab again to see synopsis>
    
    jshell> /open 
```

O preenchimento de nomes de arquivos únicos é feito no local:
```
    jshell> /open d<Tab> 
    
    jshell> /open definitions.jsh
```

### Abreviações de Comandos

Reduza a quantidade de digitação que você precisa fazer usando abreviações. Comandos, subcomandos `/set`, argumentos de comando e opções de comando podem ser abreviados, desde que a abreviação seja única.

O único comando que começa com `/l` é `/list`, e a única opção de `/list` que começa com `-a` é `-all`. Portanto, você pode usar as seguintes abreviações para inserir o comando `/list -all`:
```
    jshell> /l -a
```

Além disso, o único comando que começa com `/se` é `/set`, o único subcomando de `/set` que começa com `fe` é `feedback`, e o único modo de feedback que começa com `v` é `verbose`, assumindo que não existam modos de feedback personalizados que comecem com `v`. Portanto, você pode usar as seguintes abreviações para definir o modo de feedback como verbose:
```
    jshell> /se fe v
```

Observe que `/s` não é uma abreviação suficiente porque `/save` e `/set` ambos começam com a mesma letra. Em caso de dúvida, você pode usar o preenchimento por Tab para ver as opções.