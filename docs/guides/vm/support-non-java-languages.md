# Suporte para Linguagens Não-Java

## 7 Suporte para Linguagens Não-Java

Este capítulo descreve os recursos de Linguagens Não-Java na Java Virtual Machine.

Tópicos:

  * [Introdução aos Recursos de Linguagens Não-Java](<#/doc/guides/vm/support-non-java-languages>)
  * [Tipagem Estática e Dinâmica](<#/doc/guides/vm/support-non-java-languages>)
  * [O Desafio de Compilar Linguagens de Tipagem Dinâmica](<#/doc/guides/vm/support-non-java-languages>)
  * [A Instrução invokedynamic](<#/doc/guides/vm/support-non-java-languages>)



### Introdução aos Recursos de Linguagens Não-Java

A Java Platform, Standard Edition (Java SE) permite o desenvolvimento de aplicações que possuem as seguintes características:

  * Podem ser escritas uma vez e executadas em qualquer lugar
  * Podem ser executadas de forma segura devido ao modelo de segurança sandbox do Java
  * São fáceis de empacotar e entregar



A plataforma Java SE oferece suporte robusto nas seguintes áreas:

  * Concorrência
  * Garbage collection
  * Acesso reflexivo a classes e objetos
  * JVM Tool Interface (JVM TI): Uma interface de programação nativa para uso por ferramentas. Ela fornece tanto uma maneira de inspecionar o estado quanto de controlar a execução de aplicações rodando na JVM.



A HotSpot JVM da Oracle fornece as seguintes ferramentas e recursos:

  * DTrace: Um utilitário de rastreamento dinâmico que monitora o comportamento de aplicações e do sistema operacional.
  * Otimizações de desempenho
  * PrintAssembly: Uma opção do Java HotSpot que imprime o código assembly para métodos bytecode e nativos.



A plataforma Java SE 7 permite que linguagens não-Java utilizem a infraestrutura e as potenciais otimizações de desempenho da JVM. O mecanismo chave é a instrução `invokedynamic`, que simplifica a implementação de compiladores e sistemas de tempo de execução para linguagens de tipagem dinâmica na JVM.

### Tipagem Estática e Dinâmica

Uma linguagem de programação é de tipagem estática se ela realiza a verificação de tipos em tempo de compilação. A verificação de tipos é o processo de verificar se um programa é type safe. Um programa é type safe se os argumentos de todas as suas operações são do tipo correto.

Java é uma linguagem de tipagem estática. As informações de tipo estão disponíveis para variáveis de classe e de instância, parâmetros de método, valores de retorno e outras variáveis quando um programa é compilado. O compilador para a linguagem de programação Java usa essas informações de tipo para produzir bytecode fortemente tipado, que pode então ser executado eficientemente pela JVM em tempo de execução.

O exemplo a seguir de um programa Hello World demonstra a tipagem estática. Os tipos são mostrados em negrito.
```java
    import java.util.Date;
    
    public class HelloWorld {
        public static void main(String[] argv) {
            String hello = "Hello ";
            Date currDate = new Date();
            for (String a : argv) {
                System.out.println(hello + a);
                System.out.println("Today's date is: " + currDate);
            }
        }
    }
```

Uma linguagem de programação é de tipagem dinâmica se ela realiza a verificação de tipos em tempo de execução. JavaScript e Ruby são exemplos de linguagens de tipagem dinâmica. Essas linguagens verificam em tempo de execução, em vez de em tempo de compilação, se os valores em uma aplicação estão em conformidade com os tipos esperados. Tipicamente, as informações de tipo para essas linguagens não estão disponíveis quando uma aplicação é compilada. O tipo de um objeto é determinado apenas em tempo de execução. No passado, era difícil implementar eficientemente linguagens de tipagem dinâmica na JVM.

O seguinte é um exemplo do programa Hello World escrito na linguagem de programação Ruby:
```ruby
    #!/usr/bin/env ruby
    require 'date'
    
    hello = "Hello "
    currDate = DateTime.now
    ARGV.each do|a|
      puts hello + a
      puts "Date and time: " + currDate.to_s
    end
```

No exemplo, cada nome é introduzido sem uma declaração de tipo. O programa principal não está localizado dentro de um tipo de contêiner (a classe Java `HelloWorld`). O equivalente Ruby do loop `for` do Java está dentro da variável de tipo dinâmico `ARGV`. O corpo do loop está contido em um bloco chamado closure, que é uma característica comum em linguagens dinâmicas.

#### Linguagens de Tipagem Estática Não São Necessariamente Linguagens Fortemente Tipadas

Linguagens de programação de tipagem estática podem empregar tipagem forte ou tipagem fraca. Uma linguagem de programação que emprega tipagem forte especifica restrições sobre os tipos de valores fornecidos às suas operações, e impede a execução de uma operação se seus argumentos tiverem o tipo errado. Uma linguagem que emprega tipagem fraca converteria implicitamente (ou faria um cast) argumentos de uma operação se esses argumentos tivessem tipos errados ou incompatíveis.

Linguagens de tipagem dinâmica podem empregar tipagem forte ou tipagem fraca. Por exemplo, a linguagem de programação Ruby é de tipagem dinâmica e fortemente tipada. Quando uma variável é inicializada com um valor de algum tipo, a linguagem de programação Ruby não converte implicitamente a variável para outro tipo de dado.

No exemplo a seguir, a linguagem de programação Ruby não faz um cast implícito do número 2, que tem um tipo `Fixnum`, para uma string.
```ruby
    a = "40"
    b = a + 2
```

### O Desafio de Compilar Linguagens de Tipagem Dinâmica

Considere o seguinte método de tipagem dinâmica, `addtwo`, que adiciona quaisquer dois números (que podem ser de qualquer tipo numérico) e retorna sua soma:
```
    def addtwo(a, b)
           a + b;
    end
```

Suponha que sua organização esteja implementando um compilador e um sistema de tempo de execução para a linguagem de programação na qual o método `addtwo` está escrito. Em uma linguagem fortemente tipada, seja de tipagem estática ou dinâmica, o comportamento de `+` (o operador de adição) depende dos tipos dos operandos. Um compilador para uma linguagem de tipagem estática escolhe a implementação apropriada de `+` com base nos tipos estáticos de `a` e `b`. Por exemplo, um compilador Java implementa `+` com a instrução `iadd` da JVM se os tipos de `a` e `b` forem `int`. O operador de adição é compilado para uma chamada de método porque a instrução `iadd` da JVM exige que os tipos dos operandos sejam conhecidos estaticamente.

Um compilador para uma linguagem de tipagem dinâmica deve adiar a escolha até o tempo de execução. A instrução `a + b` é compilada como a chamada de método `+(a, b)`, onde `+` é o nome do método. Um método chamado `+` é permitido na JVM, mas não na linguagem de programação Java. Se o sistema de tempo de execução para a linguagem de tipagem dinâmica for capaz de identificar que `a` e `b` são variáveis do tipo inteiro, então o sistema de tempo de execução preferiria chamar uma implementação de `+` que seja especializada para tipos inteiros em vez de tipos de objeto arbitrários.

O desafio de compilar linguagens de tipagem dinâmica é como implementar um sistema de tempo de execução que possa escolher a implementação mais apropriada de um método ou função — depois que o programa foi compilado. Tratar todas as variáveis como objetos do tipo `Object` não funcionaria eficientemente; a classe `Object` não contém um método chamado `+`.

No Java SE 7 e posterior, a instrução `invokedynamic` permite que o sistema de tempo de execução personalize a ligação entre um call site e uma implementação de método. Neste exemplo, o call site `invokedynamic` é `+`. Um call site `invokedynamic` é ligado a um método por meio de um bootstrap method, que é um método especificado pelo compilador para a linguagem de tipagem dinâmica que é chamado uma vez pela JVM para ligar o site. Assumindo que o compilador emitiu uma instrução `invokedynamic` que invoca `+`, e assumindo que o sistema de tempo de execução conhece o método `adder(Integer,Integer)`, o tempo de execução pode ligar o call site `invokedynamic` ao método `adder` da seguinte forma:

IntegerOps.java
```java
    class IntegerOps {
    
      public static Integer adder(Integer x, Integer y) {
        return x + y;
      }
    }
```

Example.java
```java
    import java.util.*;
    import java.lang.invoke.*;
    import static java.lang.invoke.MethodType.*;
    import static java.lang.invoke.MethodHandles.*;
    
    class Example {
    
      public static CallSite mybsm(
        MethodHandles.Lookup callerClass, String dynMethodName, MethodType dynMethodType)
        throws Throwable {
    
        MethodHandle mh =
          callerClass.findStatic(
            Example.class,
            "IntegerOps.adder",
            MethodType.methodType(Integer.class, Integer.class, Integer.class));
    
        if (!dynMethodType.equals(mh.type())) {
          mh = mh.asType(dynMethodType);
        }
    
        return new ConstantCallSite(mh);
      }
    }
```

Neste exemplo, a classe `IntegerOps` pertence à biblioteca que acompanha o sistema de tempo de execução para a linguagem de tipagem dinâmica.

O método `Example.mybsm` é um bootstrap method que liga o call site `invokedynamic` ao método `adder`.

O objeto `callerClass` é um objeto `lookup`, que é uma fábrica para criar method handles.

O método `MethodHandles.Lookup.findStatic` (chamado a partir do objeto `lookup` `callerClass`) cria um static method handle para o método `adder`.

Nota: Este bootstrap method liga um call site `invokedynamic` apenas ao código que é definido no método `adder`. Ele assume que os argumentos dados ao call site `invokedynamic` são objetos `Integer`. Um bootstrap method requer código adicional para ligar corretamente os call sites `invokedynamic` ao código apropriado a ser executado se os parâmetros do bootstrap method (neste exemplo, `callerClass`, `dynMethodName` e `dynMethodType`) variarem.

A classe `java.lang.invoke.MethodHandles` e a classe `java.lang.invoke.MethodHandle` contêm vários métodos que criam method handles baseados em method handles existentes. Este exemplo chama o método `asType` se o method type do method handle `mh` não corresponder ao method type especificado pelo parâmetro `dynMethodType`. Isso permite que o bootstrap method ligue call sites `invokedynamic` a métodos Java cujos method types não correspondem exatamente.

A instância `ConstantCallSite` retornada pelo bootstrap method representa um call site a ser associado a uma instrução `invokedynamic` distinta. O alvo para uma instância `ConstantCallSite` é permanente e nunca pode ser alterado. Neste caso, um método Java, `adder`, é um candidato para executar o call site. Este método não precisa ser um método Java. Em vez disso, se vários métodos desse tipo estiverem disponíveis para o sistema de tempo de execução, cada um lidando com diferentes tipos de argumento, o bootstrap method `mybsm` poderia selecionar dinamicamente o método correto com base no argumento `dynMethodType`.

### A Instrução invokedynamic

Você pode usar a instrução `invokedynamic` em implementações de compiladores e sistemas de tempo de execução para linguagens de tipagem dinâmica na JVM. A instrução `invokedynamic` permite que o implementador da linguagem defina uma ligação personalizada. Isso contrasta com outras instruções da JVM, como `invokevirtual`, nas quais o comportamento de ligação específico para classes e interfaces Java é embutido na JVM.

Cada instância de uma instrução `invokedynamic` é chamada de dynamic call site. Quando uma instância do dynamic call site é criada, ela está em um estado não ligado, sem nenhum método especificado para o call site invocar. O dynamic call site é ligado a um método por meio de um bootstrap method. O bootstrap method de um dynamic call site é um método especificado pelo compilador para a linguagem de tipagem dinâmica. O método é chamado uma vez pela JVM para ligar o site. O objeto retornado do bootstrap method determina permanentemente a atividade do call site.

A instrução `invokedynamic` contém um índice de constant pool (no mesmo formato que para as outras instruções `invoke`). Este índice de constant pool referencia uma entrada `CONSTANT_InvokeDynamic`. Esta entrada especifica o bootstrap method (uma entrada `CONSTANT_MethodHandle`), o nome do método ligado dinamicamente, e os tipos de argumento e tipo de retorno da chamada para o método ligado dinamicamente.

No exemplo a seguir, o sistema de tempo de execução liga o dynamic call site especificado pela instrução `invokedynamic` (que é `+`, o operador de adição) ao método `[IntegerOps.adder](<#/doc/guides/vm/support-non-java-languages>)` usando o bootstrap method `[Example.mybsm](<#/doc/guides/vm/support-non-java-languages>)`. Os métodos `adder` e `mybsm` são definidos em [O Desafio de Compilar Linguagens de Tipagem Dinâmica](<#/doc/guides/vm/support-non-java-languages>) (quebras de linha foram adicionadas para clareza):
```
    invokedynamic   InvokeDynamic
      REF_invokeStatic:
        Example.mybsm:
          "(Ljava/lang/invoke/MethodHandles/Lookup;
            Ljava/lang/String;
            Ljava/lang/invoke/MethodType;)
          Ljava/lang/invoke/CallSite;":
        +:
          "(Ljava/lang/Integer;
            Ljava/lang/Integer;)
          Ljava/lang/Integer;";
```

Nota:

Os exemplos de bytecode usam a sintaxe do framework [ASM](<http://asm.ow2.org/>) de manipulação e análise de bytecode Java.

Invocar um método ligado dinamicamente com a instrução `invokedynamic` envolve os seguintes passos:

  1. [Definindo o Bootstrap Method](<#/doc/guides/vm/support-non-java-languages>)
  2. [Especificando Entradas da Constant Pool](<#/doc/guides/vm/support-non-java-languages>)
  3. [Usando a Instrução `invokedynamic`](<#/doc/guides/vm/support-non-java-languages>)



#### Definindo o Bootstrap Method

Em tempo de execução, na primeira vez que a JVM encontra uma instrução `invokedynamic`, ela chama o bootstrap method. Este método liga o nome que a instrução `invokedynamic` especifica ao código para executar o método alvo, que é referenciado por um method handle. Na próxima vez que a JVM executa a mesma instrução `invokedynamic`, ela não chama o bootstrap method; ela chama automaticamente o method handle ligado.

O tipo de retorno do bootstrap method deve ser `java.lang.invoke.CallSite`. O objeto `CallSite` representa o estado ligado da instrução `invokedynamic` e o method handle ao qual ela está ligada.

O bootstrap method aceita três ou mais dos seguintes parâmetros:

  * Objeto `MethodHandles.Lookup`: Uma fábrica para criar method handles no contexto da instrução `invokedynamic`.
  * Objeto `String`: O nome do método mencionado no dynamic call site.
  * Objeto `MethodType`: A assinatura de tipo resolvida do dynamic call site.
  * Um ou mais argumentos estáticos adicionais para a instrução `invokedynamic`: Argumentos opcionais, extraídos da constant pool, destinam-se a ajudar os implementadores de linguagem a codificar de forma segura e compacta metadados adicionais úteis para o bootstrap method. Em princípio, o nome e os argumentos extras são redundantes porque cada call site poderia receber seu próprio bootstrap method único. No entanto, tal prática provavelmente produziria arquivos de classe e constant pools grandes.



Veja [O Desafio de Compilar Linguagens de Tipagem Dinâmica](<#/doc/guides/vm/support-non-java-languages>) para um exemplo de um bootstrap method.

#### Especificando Entradas da Constant Pool

A instrução `invokedynamic` contém uma referência a uma entrada na constant pool com a tag `CONSTANT_InvokeDynamic`. Esta entrada contém referências a outras entradas na constant pool e referências a atributos. Veja a [documentação do pacote java.lang.invoke](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/invoke/package-summary.html>) e a The Java Virtual Machine Specification.

##### Exemplo de Constant Pool

O exemplo a seguir mostra um trecho da constant pool para a classe `Example`, que contém o bootstrap method `Example.mybsm` que liga o método `+` ao método Java `adder`:
```
        class #159; // #47
        Utf8 "adder"; // #83
        Utf8 "(Ljava/lang/Integer;Ljava/lang/Integer;)Ljava/lang/Integer;"; // #84
        Utf8 "mybsm"; // #87
        Utf8 "(Ljava/lang/invoke/MethodHandles/Lookup;Ljava/lang/String;Ljava/lang/invoke/MethodType;)
          java/lang/invoke/CallSite;"; // #88
        Utf8 "Example"; // #159
        Utf8 "+"; // #166
    
        // ...
    
        NameAndType #83 #84; // #228
        Method #47 #228; // #229
        MethodHandle 6b #229; // #230
        NameAndType #87 #88; // #231
        Method #47 #231; // #232
        MethodHandle 6b #232; // #233
        NameAndType #166 #84; // #234
        Utf8 "BootstrapMethods"; // #235
        InvokeDynamic 0s #234; // #236
```

A entrada da constant pool para a instrução `invokedynamic` neste exemplo contém os seguintes valores:

  * Tag `CONSTANT_InvokeDynamic`
  * Short sem sinal com valor `0`
  * Índice da constant pool `#234`.



O valor `0` refere-se ao primeiro especificador de bootstrap method no array de especificadores que são armazenados no atributo `BootstrapMethods`. Os especificadores de bootstrap method não estão na tabela da constant pool. Eles estão contidos neste array separado de especificadores. Cada especificador de bootstrap method contém um índice para uma entrada `CONSTANT_MethodHandle` da constant pool, que é o próprio bootstrap method.

O exemplo a seguir mostra um trecho da mesma constant pool que exibe o atributo `BootstrapMethods`, que contém o array de especificadores de bootstrap method:
```
      [3] { // Attributes
    
        // ...
    
        Attr(#235, 6) { // BootstrapMethods at 0x0F63
          [1] { // bootstrap_methods
            {  //  bootstrap_method
              #233; // bootstrap_method_ref
              [0] { // bootstrap_arguments
              }  //  bootstrap_arguments
            }  //  bootstrap_method
          }
        } // end BootstrapMethods
      } // Attributes
```

A entrada da constant pool para o method handle do bootstrap method `mybsm` contém os seguintes valores:

  * Tag `CONSTANT_MethodHandle`
  * Byte sem sinal com valor `6`
  * Índice da constant pool `#232`.



O valor `6` é a subtag `REF_invokeStatic`. Veja [Usando a Instrução `invokedynamic`](<#/doc/guides/vm/support-non-java-languages>), para mais informações sobre esta subtag.

#### Usando a Instrução invokedynamic

O exemplo a seguir mostra como o bytecode usa a instrução `invokedynamic` para chamar o bootstrap method `mybsm`, que liga o dynamic call site (`+`, o operador de adição) ao método `adder`. Este exemplo usa o método `+` para adicionar os números `40` e `2` (quebras de linha foram adicionadas para clareza):
```
    bipush  40;
    invokestatic    Method java/lang/Integer.valueOf:"(I)Ljava/lang/Integer;";
    iconst_2;
    invokestatic    Method java/lang/Integer.valueOf:"(I)Ljava/lang/Integer;";
    invokedynamic   InvokeDynamic
      REF_invokeStatic:
        Example.mybsm:
          "(Ljava/lang/invoke/MethodHandles/Lookup;
            Ljava/lang/String;
            Ljava/lang/invoke/MethodType;)
          Ljava/lang/invoke/CallSite;":
        +:
          "(Ljava/lang/Integer;
            Ljava/lang/Integer;)
          Ljava/lang/Integer;";
```

As quatro primeiras instruções colocam os inteiros `40` e `2` na stack e os empacotam no tipo wrapper `java.lang.Integer`. A quinta instrução invoca um método dinâmico. Esta instrução refere-se a uma entrada da constant pool com uma tag `CONSTANT_InvokeDynamic`:
```
    REF_invokeStatic:
      Example.mybsm:
        "(Ljava/lang/invoke/MethodHandles/Lookup;
          Ljava/lang/String;
          Ljava/lang/invoke/MethodType;)
        Ljava/lang/invoke/CallSite;":
      +:
        "(Ljava/lang/Integer;
          Ljava/lang/Integer;)
        Ljava/lang/Integer;";
```

Quatro bytes seguem a tag `CONSTANT_InvokeDynamic` nesta entrada.

  * Os dois primeiros bytes formam uma referência a uma entrada `CONSTANT_MethodHandle` que referencia um especificador de bootstrap method:
```
REF_invokeStatic:
          Example.mybsm:
            "(Ljava/lang/invoke/MethodHandles/Lookup;
              Ljava/lang/String;
              Ljava/lang/invoke/MethodType;)
            Ljava/lang/invoke/CallSite;"
```

Esta referência a um especificador de bootstrap method não está na tabela da constant pool. Ela está contida em um array separado definido por um atributo de arquivo de classe chamado `BootstrapMethods`. O especificador de bootstrap method contém um índice para uma entrada `CONSTANT_MethodHandle` da constant pool, que é o próprio bootstrap method.

Três bytes seguem esta entrada `CONSTANT_MethodHandle` da constant pool:

    * O primeiro byte é a subtag `REF_invokeStatic`. Isso significa que este bootstrap method criará um method handle para um método estático; note que este bootstrap method está ligando o dynamic call site ao método Java estático `adder`.

    * Os próximos dois bytes formam uma entrada `CONSTANT_Methodref` que representa o método para o qual o method handle deve ser criado:
```
Example.mybsm:
            "(Ljava/lang/invoke/MethodHandles/Lookup;
              Ljava/lang/String;
              Ljava/lang/invoke/MethodType;)
            Ljava/lang/invoke/CallSite;"
```

Neste exemplo, o nome totalmente qualificado do bootstrap method é `Example.mybsm`. Os tipos de argumento são `MethodHandles.Lookup`, `String` e `MethodType`. O tipo de retorno é `CallSite`.

  * Os próximos dois bytes formam uma referência a uma entrada `CONSTANT_NameAndType`:
```
+:
          "(Ljava/lang/Integer;
            Ljava/lang/Integer;)
          Ljava/lang/Integer;"
```

Esta entrada da constant pool especifica o nome do método (`+`), os tipos de argumento (duas instâncias `Integer`) e o tipo de retorno do dynamic call site (`Integer`).

Neste exemplo, o dynamic call site é apresentado com valores inteiros empacotados (boxed), que correspondem exatamente ao tipo do alvo eventual, o método `adder`. Na prática, os tipos de argumento e retorno não precisam corresponder exatamente. Por exemplo, a instrução `invokedynamic` poderia passar um ou ambos os seus operandos na stack da JVM como valores `int` primitivos. Um ou ambos os operandos poderiam ser valores `Object` sem tipo. A instrução `invokedynamic` poderia receber seu resultado como um valor `int` primitivo, ou um valor `Object` sem tipo. Em qualquer caso, o argumento `dynMethodType` para `mybsm` descreve com precisão o method type que é exigido pela instrução `invokedynamic`.

O método `adder` poderia receber argumentos primitivos ou sem tipo, ou valores de retorno. O bootstrap method é responsável por compensar qualquer diferença entre o `dynMethodType` e o tipo do método `adder`. Como mostrado no código, isso é facilmente feito com uma chamada `asType` no método alvo.