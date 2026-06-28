# Snippets

## 2 Snippets
  
O JShell aceita instruções Java; definições de variáveis, métodos e classes; imports; e expressões. Essas partes de código Java são chamadas de snippets.

Tópicos

  * [Experimentando Snippets](<#/doc/guides/jshell/snippets>)

  * [Alterando Definições](<#/doc/guides/jshell/snippets>)

  * [Referências Antecipadas](<#/doc/guides/jshell/snippets>)

  * [Exceções](<#/doc/guides/jshell/snippets>)

  * [Preenchimento com Tab para Snippets](<#/doc/guides/jshell/snippets>)

  * [Transformação de Snippet](<#/doc/guides/jshell/snippets>)




### Experimentando Snippets

Snippets de código Java são inseridos no JShell e avaliados imediatamente. O feedback sobre os resultados, ações realizadas e quaisquer erros que ocorreram é exibido. Use os exemplos nesta seção para experimentar o JShell.

Inicie o JShell com a opção verbose para obter a quantidade máxima de feedback disponível:
```
    % jshell -v
    |  Welcome to JShell -- Version 17.0.1
    |  For an introduction type: /help intro
```

Insira a seguinte instrução de exemplo no prompt e revise a saída exibida:
```
    jshell> int x = 45
    x ==> 45
    |  created variable x : int
```

Primeiro, o resultado é exibido. Leia isso como: a variável x tem o valor 45. Como você está no modo verbose, uma descrição do que ocorreu também é exibida. Mensagens informativas começam com uma barra vertical. Observe que tanto o nome quanto o tipo da variável criada são mostrados.

Nota:

Ponto e vírgulas de terminação são adicionados automaticamente ao final de um snippet completo se não forem inseridos.

Quando uma expressão é inserida e não possui uma variável nomeada, uma variável temporária (scratch variable) é criada para que seu valor possa ser referenciado posteriormente. O exemplo a seguir mostra valores temporários para uma expressão e para os resultados de um método. O exemplo também mostra o prompt de continuação (`...>`) que é usado quando um snippet requer mais de uma linha de entrada para ser concluído:
```
    jshell> 2 + 2
    $3 ==> 4
    |  created scratch variable $3 : int
    
    jshell> String twice(String s) {
       ...>    return s + s;
       ...> }
    |  created method twice(String)
    
    jshell> twice("Ocean")
    $5 ==> "OceanOcean"
    |  created scratch variable $5 : String
```

### Alterando Definições

Ao experimentar com código, você pode descobrir que a definição de uma variável, método ou classe não está fazendo o que você deseja. A definição é facilmente alterada inserindo uma nova, que sobrescreve a definição anterior.

Para alterar a definição de uma variável, método ou classe, basta inserir uma nova definição. Por exemplo, o método `twice` que foi definido em [Experimentando Snippets](<#/doc/guides/jshell/snippets>) recebe uma nova definição no exemplo a seguir:
```
    jshell> String twice(String s) {
       ...>    return "Twice:" + s;
       ...> }
    |  modified method twice(String)
    |  update overwrote method twice(String)
    
    jshell> twice("thing")
    $7 ==> "Twice:thing"
    |  created scratch variable $7 : String
```

Observe que, em vez de mostrar created method como antes, o feedback mostra modified method. Esta mensagem significa que a definição mudou, mas o método tem a mesma assinatura e, portanto, todos os usos existentes continuam sendo válidos.

Você também pode alterar definições de maneiras incompatíveis. O exemplo a seguir mostra `x` sendo alterado de `int` para String:
```
    jshell> int x = 45
    x ==> 45
    |  created variable x : int
    
    jshell> String x
    x ==> null
    |  replaced variable x : String
    |  update overwrote variable x : int
```

O tipo da variável `x` mudou, e o feedback agora mostra replaced.

Alterando o Nível de Feedback

O JShell foi iniciado no modo de feedback verbose, que fornece muitos comentários. Você pode definir a quantidade e o formato da saída com o comando `/set feedback`, por exemplo `/set feedback concise`. Se você usa o JShell principalmente colando de outras janelas, então você pode preferir um modo de feedback sem prompt e apenas feedback de erro. Se for o caso, insira o comando `/set feedback silent`.

### Referências Antecipadas

O JShell aceita definições de métodos que referenciam métodos, variáveis ou classes que ainda não foram definidos. Isso é feito para suportar a programação exploratória e porque algumas formas de programação exigem isso.

Como exemplo, se você deseja definir um método para o volume de uma esfera, então você pode inserir a seguinte fórmula como o método `volume`:
```
    jshell> double volume(double radius) {
       ...>    return 4.0 / 3.0 * PI * cube(radius);
       ...> }
    |  created method volume(double), however, it cannot be invoked until variable PI, and method cube(double) are declared
```

O JShell permite a definição, mas avisa sobre o que ainda precisa ser definido. A definição pode ser referenciada, mas se a execução for tentada, ela falhará até que todos os elementos necessários sejam definidos:
```
    jshell> double PI = 3.1415926535
    PI ==> 3.1415926535
    |  created variable PI : double
    
    jshell> volume(2)
    |  attempted to call method volume(double) which cannot be invoked until method cube(double) is declared
    
    jshell> double cube(double x) { return x * x * x; }
    |  created method cube(double)
    |    update modified method volume(double)
    
    jshell> volume(2)
    $5 ==> 33.510321637333334
    |  created scratch variable $8 : double
```

Com todas as definições em vigor, o método `volume` agora funciona.

Este método é agora usado para ilustrar mais sobre substituição incompatível. Por exemplo, para alterar a precisão de `PI`, insira o novo valor conforme mostrado no exemplo a seguir:
```
    jshell> BigDecimal PI = new BigDecimal("3.141592653589793238462643383")
    PI ==> 3.141592653589793238462643383
    |  replaced variable PI : BigDecimal
    |    update modified method volume(double) which cannot be invoked until this error is corrected: 
    |      bad operand types for binary operator '*'
    |        first type:  double
    |        second type: java.math.BigDecimal
    |          return 4.0 / 3.0 * PI * cube(radius);
    |                 ^------------^
    |    update overwrote variable PI : double
```

A nova definição de `PI` é incompatível em tipo com a definição de `volume()`. Como você está no modo verbose, informações de atualização são mostradas para outras definições afetadas pela mudança, o que neste caso descreve a incompatibilidade. Observe que o modo verbose é o único modo de feedback predefinido que exibe informações de atualização. Em outros modos de feedback, nenhum aviso é exibido até que o código seja executado. O objetivo disso é evitar uma sobrecarga de atualizações. Em todos os modos predefinidos, a execução do método `volume()` exibe o problema:
```
    jshell> volume(2)
    |  attempted to call method volume(double) which cannot be invoked until this error is corrected: 
    |      bad operand types for binary operator '*'
    |        first type:  double
    |        second type: java.math.BigDecimal
    |          return 4.0 / 3.0 * PI * cube(radius);
    |                 ^------------^
```

### Exceções

Em um rastreamento de exceção, o feedback identifica o snippet e a localização dentro do snippet onde a exceção ocorreu.

A localização dentro do código inserido no JShell é exibida como `#ID:line-number`, onde ID do snippet é o número exibido pelo comando `/list`, e line-number é o número da linha dentro do snippet. No exemplo a seguir, a exceção ocorre no snippet 1, que é o método `divide()`, na segunda linha do método:
```
    jshell> int divide(int x, int y) {
       ...> return x / y;
       ...> }
    |  created method divide(int,int)
    
    jshell> divide(5, 0)
    |  java.lang.ArithmeticException thrown: / by zero
    |        at divide (#1:2)
    |        at (#2:1)
                                 
    jshell> /list
                                                                
       1 : int divide(int x, int y) {
               return x / y;
           }
       2 : divide(5, 0)
```

### Preenchimento com Tab para Snippets

Ao inserir snippets, use a tecla Tab para completar automaticamente o item. Se o item não puder ser determinado a partir do que foi inserido, opções possíveis serão fornecidas.

Por exemplo, se você inseriu o método `volume` de [Referências Antecipadas](<#/doc/guides/jshell/snippets>), então você pode inserir as primeiras letras do nome do método e, em seguida, pressionar a tecla Tab para completar a entrada:
```
    jshell> vol<Tab>
```

A entrada muda para o seguinte:
```
    jshell> volume(
```

Se o item puder ser completado de mais de uma maneira, o conjunto de possibilidades é exibido:
```
    jshell> System.c<Tab>
    class                 clearProperty(        console()             currentTimeMillis()
    
    jshell> System.c
```

Quaisquer caracteres comuns são adicionados ao que você inseriu, e o cursor é posicionado no final da entrada para que mais possa ser inserido.

Quando você está no parêntese de abertura de uma chamada de método, pressionar Tab mostra as possibilidades de preenchimento com os tipos de parâmetro:
```
    jshell> "hello".startsWith(<Tab>
    Signatures:
    boolean String.startsWith(String prefix, int toffset)
    boolean String.startsWith(String prefix)
    
    <press tab again to see documentation>
    
    jshell> "hello".startsWith(
```

Pressionar Tab novamente mostra uma versão em texto simples da documentação para o primeiro método.
```
    jshell> "hello".startsWith(<Tab>
    boolean String.startsWith(String prefix, int toffset)
    Tests if the substring of this string beginning at the specified index starts with the
    specified prefix.
    
    Parameters:
    prefix - the prefix.
    toffset - where to begin looking in this string.
    
    Returns:
    true if the character sequence represented by the argument is a prefix of the substring of this
              object starting at index toffset ; false otherwise. The result is false if toffset is
              negative or greater than the length of this String object; otherwise the result is
              the same as the result of the expression
                        this.substring(toffset).startsWith(prefix)
                        
    
    <press tab to see next documentation>
    
    jshell> "hello".startsWith(
```

### Transformação de Snippet

O JShell facilita a importação de uma classe necessária quando ela é referenciada pela primeira vez e a conversão de uma expressão em uma declaração de variável usando atalhos de teclado.

Ao inserir um identificador que ainda não foi importado, pressione Shift+Tab i (ou seja, mantenha Shift pressionado enquanto pressiona Tab, depois solte e pressione i) imediatamente após o identificador para ver as opções que permitem adicionar o import à sua sessão:
```
    jshell> new JFrame<Shift+Tab i>
    0: Do nothing
    1: import: javax.swing.JFrame
    Choice: 1
    Imported: javax.swing.JFrame
    
    jshell> new JFrame
```

Insira o número da opção desejada. Mais de uma opção de importação pode ser fornecida.

Você pode converter uma expressão em uma declaração de variável pressionando Shift+Tab v depois de inserir a expressão. A expressão se torna o valor inicial da declaração da variável, e o tipo da expressão se torna o tipo da variável. Depois de pressionar Shift+Tab v, o cursor, que é indicado por uma barra vertical (|) no exemplo, é posicionado na linha onde você precisa inserir o nome da variável:
```
    jshell> new JFrame("Demo") <Shift+Tab v>
    jshell> JFrame | = new JFrame("Demo")
```

Nota:

A expressão deve ser válida ou a solicitação de transformação será ignorada. No exemplo, a importação de JFrame é necessária antes da transformação da variável.

Para completar o exemplo anterior, insira o nome da variável `frame` no cursor e pressione Enter:
```
    jshell> JFrame frame = new JFrame("Demo")
    frame ==> javax.swing.JFrame[frame0,0,0,0x0,invalid,hidden, ... tPaneCheckingEnabled=true]
    |  created variable frame : JFrame
    
    jshell>
```

Às vezes, o tipo de resultado da expressão ainda não foi importado. Nesse caso, Shift+Tab v oferece tanto importar quanto criar a variável, conforme mostrado no exemplo a seguir:
```
    jshell> frame.getGraphics() <Shift+Tab v>
    0: Do nothing
    1: Create variable
    2: import: java.awt.Graphics. Create variable
    Choice: 2
    Imported: java.awt.Graphics
    
    jshell> Graphics | = frame.getGraphics()
```

Para completar o exemplo anterior, insira o nome da variável `gc` no cursor e pressione Enter:
```
    jshell> Graphics gc = frame.getGraphics()
    |  created variable gc :java.awt.Graphics
    
    jshell>
```