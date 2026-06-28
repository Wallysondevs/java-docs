# Compilando para a JVM

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Java SE Specifications](<#/>) > [Java Virtual Machine Specification](<#/doc/jvms/jvms-01>)

Capítulo 3. Compilando para a Java Virtual Machine
---
[Anterior](<#/doc/jvms/jvms-02>) | | [Próximo](<#/doc/jvms/jvms-04>)

* * *

# Capítulo 3. Compilando para a Java Virtual Machine

**Sumário**

[3.1. Formato dos Exemplos](<#/doc/jvms/jvms-03>)
[3.2. Uso de Constantes, Variáveis Locais e Construções de Controle](<#/doc/jvms/jvms-03>)
[3.3. Aritmética](<#/doc/jvms/jvms-03>)
[3.4. Acessando o Pool de Constantes em Tempo de Execução](<#/doc/jvms/jvms-03>)
[3.5. Mais Exemplos de Controle](<#/doc/jvms/jvms-03>)
[3.6. Recebendo Argumentos](<#/doc/jvms/jvms-03>)
[3.7. Invocando Métodos](<#/doc/jvms/jvms-03>)
[3.8. Trabalhando com Instâncias de Classe](<#/doc/jvms/jvms-03>)
[3.9. Arrays](<#/doc/jvms/jvms-03>)
[3.10. Compilando `switch`s](<#/doc/jvms/jvms-03>)
[3.11. Operações na Pilha de Operandos](<#/doc/jvms/jvms-03>)
[3.12. Lançando e Tratando Exceções](<#/doc/jvms/jvms-03>)
[3.13. Compilando `finally`](<#/doc/jvms/jvms-03>)
[3.14. Sincronização](<#/doc/jvms/jvms-03>)
[3.15. Anotações](<#/doc/jvms/jvms-03>)
[3.16. Módulos](<#/doc/jvms/jvms-03>)

A máquina Java Virtual Machine é projetada para suportar a linguagem de programação Java. O software JDK da Oracle contém um compilador de código-fonte escrito na linguagem de programação Java para o conjunto de instruções da Java Virtual Machine, e um sistema de tempo de execução que implementa a própria Java Virtual Machine. Entender como um compilador utiliza a Java Virtual Machine é útil para o futuro desenvolvedor de compiladores, bem como para quem tenta entender a própria Java Virtual Machine. As seções numeradas neste capítulo não são normativas.

Note que o termo "compilador" é às vezes usado para se referir a um tradutor do conjunto de instruções da Java Virtual Machine para o conjunto de instruções de uma CPU específica. Um exemplo de tal tradutor é um gerador de código just-in-time (JIT), que gera instruções específicas da plataforma somente depois que o código da Java Virtual Machine foi carregado. Este capítulo não aborda questões associadas à geração de código, apenas aquelas associadas à compilação de código-fonte escrito na linguagem de programação Java para instruções da Java Virtual Machine.

## 3.1. Formato dos Exemplos

Este capítulo consiste principalmente em exemplos de código-fonte juntamente com listagens anotadas do código da Java Virtual Machine que o compilador `javac` na versão 1.0.2 do JDK da Oracle gera para os exemplos. O código da Java Virtual Machine é escrito na "linguagem assembly de máquina virtual" informal, produzida pelo utilitário `javap` da Oracle, distribuído com a versão do JDK. Você pode usar `javap` para gerar exemplos adicionais de métodos compilados.

O formato dos exemplos deve ser familiar a qualquer pessoa que tenha lido código assembly. Cada instrução tem a forma:
```
    <index> <opcode> [ <operand1> [ <operand2>... ]] [<comment>]

```

O `<index>` é o índice do opcode da instrução no array que contém os bytes do código da Java Virtual Machine para este método. Alternativamente, o `<index>` pode ser considerado como um deslocamento de byte desde o início do método. O `<opcode>` é o mnemônico para o opcode da instrução, e os zero ou mais `<operandN>` são os operandos da instrução. O `<comment>` opcional é dado na sintaxe de comentário de fim de linha:
```
    8   _bipush 100_     // Push int constant 100

```

Parte do material nos comentários é emitida por `javap`; o restante é fornecido pelos autores. O `<index>` que precede cada instrução pode ser usado como alvo de uma instrução de transferência de controle. Por exemplo, uma instrução `_goto 8_` transfere o controle para a instrução no índice 8. Note que os operandos reais das instruções de transferência de controle da Java Virtual Machine são deslocamentos dos endereços dos opcodes dessas instruções; esses operandos são exibidos por `javap` (e são mostrados neste capítulo) como deslocamentos mais fáceis de ler em seus métodos.

Nós precedemos um operando que representa um índice do pool de constantes em tempo de execução com um sinal de hash e seguimos a instrução com um comentário identificando o item do pool de constantes em tempo de execução referenciado, como em:
```
    10  _ldc #1_         // Push float constant 100.0

```

ou:
```
    9   _invokevirtual #4_    // Method Example.addTwo(II)I

```

Para os propósitos deste capítulo, não nos preocupamos em especificar detalhes como tamanhos de operandos.

## 3.2. Uso de Constantes, Variáveis Locais e Construções de Controle

O código da Java Virtual Machine exibe um conjunto de características gerais impostas pelo design e uso de tipos da Java Virtual Machine. No primeiro exemplo, encontramos muitas delas e as consideramos em detalhes.

O método `spin` simplesmente executa um loop `for` vazio 100 vezes:
```

    void spin() {
        int i;
        for (i = 0; i < 100; i++) {
            ;    // Loop body is empty
        }
    }


```

Um compilador pode compilar `spin` para:
```
    0   _iconst_0_       // Push int constant 0
    1   _istore_1_       // Store into local variable 1 (i=0)
    2   _goto 8_         // First time through don't increment
    5   _iinc 1 1_       // Increment local variable 1 by 1 (i++)
    8   _iload_1_        // Push local variable 1 (i)
    9   _bipush 100_     // Push int constant 100
    11  _if_icmplt 5_    // Compare and loop if less than (i < 100)
    14  _return_         // Return void when done

```

A Java Virtual Machine é orientada a pilha, com a maioria das operações pegando um ou mais operandos da pilha de operandos do frame atual da Java Virtual Machine ou empurrando resultados de volta para a pilha de operandos. Um novo frame é criado cada vez que um método é invocado, e com ele é criada uma nova pilha de operandos e um conjunto de variáveis locais para uso por esse método ([§2.6](<#/doc/jvms/jvms-02>)). Em qualquer ponto da computação, é provável que existam muitos frames e igualmente muitas pilhas de operandos por thread de controle, correspondendo a muitas invocações de métodos aninhadas. Apenas a pilha de operandos no frame atual está ativa.

O conjunto de instruções da Java Virtual Machine distingue os tipos de operandos usando bytecodes distintos para operações em seus vários tipos de dados. O método `spin` opera apenas em valores do tipo `int`. As instruções em seu código compilado escolhidas para operar em dados tipados (_iconst_0_ , _istore_1_ , _iinc_ , _iload_1_ , _if_icmplt_) são todas especializadas para o tipo `int`.

As duas constantes em `spin`, `0` e `100`, são empurradas para a pilha de operandos usando duas instruções diferentes. O `0` é empurrado usando uma instrução _iconst_0_, uma da família de instruções _iconst_ <i>_. O `100` é empurrado usando uma instrução _bipush_, que busca o valor que empurra como um operando imediato.

A Java Virtual Machine frequentemente tira vantagem da probabilidade de certos operandos (constantes `int` _-1_ , _0_ , _1_ , _2_ , _3_ , _4_ e _5_ no caso das instruções _iconst_ <i>_) tornando esses operandos implícitos no opcode. Como a instrução _iconst_0_ sabe que vai empurrar um `int` `0`, _iconst_0_ não precisa armazenar um operando para dizer qual valor empurrar, nem precisa buscar ou decodificar um operando. Compilar o push de `0` como _bipush_ _0_ teria sido correto, mas teria tornado o código compilado para `spin` um byte mais longo. Uma máquina virtual simples também teria gasto tempo adicional buscando e decodificando o operando explícito a cada iteração do loop. O uso de operandos implícitos torna o código compilado mais compacto e eficiente.

O `int` `i` em `spin` é armazenado como a variável local _1_ da Java Virtual Machine. Como a maioria das instruções da Java Virtual Machine opera em valores retirados da pilha de operandos em vez de diretamente em variáveis locais, as instruções que transferem valores entre variáveis locais e a pilha de operandos são comuns no código compilado para a Java Virtual Machine. Essas operações também têm suporte especial no conjunto de instruções. Em `spin`, os valores são transferidos para e de variáveis locais usando as instruções _istore_1_ e _iload_1_, cada uma das quais opera implicitamente na variável local _1_. A instrução _istore_1_ retira um `int` da pilha de operandos e o armazena na variável local _1_. A instrução _iload_1_ empurra o valor na variável local _1_ para a pilha de operandos.

O uso (e reuso) de variáveis locais é responsabilidade do desenvolvedor do compilador. As instruções especializadas de carregamento e armazenamento devem encorajar o desenvolvedor do compilador a reutilizar variáveis locais o máximo possível. O código resultante é mais rápido, mais compacto e usa menos espaço no frame.

Certas operações muito frequentes em variáveis locais são atendidas especialmente pela Java Virtual Machine. A instrução _iinc_ incrementa o conteúdo de uma variável local por um valor assinado de um byte. A instrução _iinc_ em `spin` incrementa a primeira variável local (seu primeiro operando) por _1_ (seu segundo operando). A instrução _iinc_ é muito útil ao implementar construções de loop.

O loop `for` de `spin` é realizado principalmente por estas instruções:
```
    5   _iinc 1 1_       // Increment local variable 1 by 1 (i++)
    8   _iload_1_        // Push local variable 1 (i)
    9   _bipush 100_     // Push int constant 100
    11  _if_icmplt 5_    // Compare and loop if less than (i < 100)

```

A instrução _bipush_ empurra o valor _100_ para a pilha de operandos como um `int`, então a instrução _if_icmplt_ retira esse valor da pilha de operandos e o compara com _i_. Se a comparação for bem-sucedida (a variável `i` é menor que `100`), o controle é transferido para o índice _5_ e a próxima iteração do loop `for` começa. Caso contrário, o controle passa para a instrução seguinte ao _if_icmplt_.

Se o exemplo `spin` tivesse usado um tipo de dado diferente de `int` para o contador do loop, o código compilado mudaria necessariamente para refletir o tipo de dado diferente. Por exemplo, se em vez de um `int` o exemplo `spin` usasse um `double`, como mostrado:
```

    void dspin() {
        double i;
        for (i = 0.0; i < 100.0; i++) {
            ;    // Loop body is empty
        }
    }


```

o código compilado é:
```
    Method void dspin()
    0   _dconst_0_       // Push double constant 0.0
    1   _dstore_1_       // Store into local variables 1 and 2
    2   _goto 9_         // First time through don't increment
    5   _dload_1_        // Push local variables 1 and 2
    6   _dconst_1_       // Push double constant 1.0
    7   _dadd_           // Add; there is no dinc instruction
    8   _dstore_1_       // Store result in local variables 1 and 2
    9   _dload_1_        // Push local variables 1 and 2
    10  _ldc2_w #4_      // Push double constant 100.0
    13  _dcmpg_          // There is no if_dcmplt instruction
    14  _iflt 5_         // Compare and loop if less than (i < 100.0)
    17  _return_         // Return void when done

```

As instruções que operam em dados tipados agora são especializadas para o tipo `double`. (A instrução _ldc2_w_ será discutida mais adiante neste capítulo.)

Lembre-se de que os valores `double` ocupam duas variáveis locais, embora sejam acessados apenas usando o índice menor das duas variáveis locais. Este é também o caso para valores do tipo `long`. Novamente, por exemplo,
```

    double doubleLocals(double d1, double d2) {
        return d1 + d2;
    }


```

torna-se
```
    Method double doubleLocals(double,double)
    0   _dload_1_       // First argument in local variables 1 and 2
    1   _dload_3_       // Second argument in local variables 3 and 4
    2   _dadd_
    3   _dreturn_

```

Note que as variáveis locais dos pares de variáveis locais usadas para armazenar valores `double` em `doubleLocals` nunca devem ser manipuladas individualmente.

O tamanho de 1 byte do opcode da Java Virtual Machine resulta em seu código compilado ser muito compacto. No entanto, opcodes de 1 byte também significam que o conjunto de instruções da Java Virtual Machine deve permanecer pequeno. Como um compromisso, a Java Virtual Machine não oferece suporte igual para todos os tipos de dados: ela não é completamente ortogonal ([Tabela 2.11.1-A](<#/doc/jvms/jvms-02>)).

Por exemplo, a comparação de valores do tipo `int` na instrução `for` do exemplo `spin` pode ser implementada usando uma única instrução _if_icmplt_; no entanto, não há uma única instrução no conjunto de instruções da Java Virtual Machine que execute um desvio condicional em valores do tipo `double`. Assim, `dspin` deve implementar sua comparação de valores do tipo `double` usando uma instrução _dcmpg_ seguida por uma instrução _iflt_.

A Java Virtual Machine oferece o suporte mais direto para dados do tipo `int`. Isso se deve em parte à antecipação de implementações eficientes das pilhas de operandos e arrays de variáveis locais da Java Virtual Machine. Também é motivado pela frequência de dados `int` em programas típicos. Outros tipos integrais têm menos suporte direto. Não há versões `byte`, `char` ou `short` das instruções de armazenamento, carregamento ou adição, por exemplo. Aqui está o exemplo `spin` escrito usando um `short`:
```

    void sspin() {
        short i;
        for (i = 0; i < 100; i++) {
            ;    // Loop body is empty
        }
    }


```

Ele deve ser compilado para a Java Virtual Machine, como segue, usando instruções que operam em outro tipo, provavelmente `int`, convertendo entre valores `short` e `int` conforme necessário para garantir que os resultados das operações em dados `short` permaneçam dentro do intervalo apropriado:
```
    Method void sspin()
    0   _iconst_0_
    1   _istore_1_
    2   _goto 10_
    5   _iload_1_        // The short is treated as though an int
    6   _iconst_1_
    7   _iadd_
    8   _i2s_            // Truncate int to short
    9   _istore_1_
    10  _iload_1_
    11  _bipush 100_
    13  _if_icmplt 5_
    16  _return_

```

A falta de suporte direto para os tipos `byte`, `char` e `short` na Java Virtual Machine não é particularmente dolorosa, porque os valores desses tipos são internamente promovidos a `int` (`byte` e `short` são estendidos por sinal para `int`, `char` é estendido por zero). As operações em dados `byte`, `char` e `short` podem, portanto, ser feitas usando instruções `int`. O único custo adicional é o de truncar os valores das operações `int` para intervalos válidos.

Os tipos `long` e de ponto flutuante têm um nível intermediário de suporte na Java Virtual Machine, faltando apenas o complemento completo de instruções de transferência de controle condicional.

## 3.3. Aritmética

A Java Virtual Machine geralmente realiza operações aritméticas em sua pilha de operandos. (A exceção é a instrução _iinc_, que incrementa diretamente o valor de uma variável local.) Por exemplo, o método `align2grain` alinha um valor `int` a uma dada potência de 2:
```

    int align2grain(int i, int grain) {
        return ((i + grain-1) & ~(grain-1));
    }


```

Operandos para operações aritméticas são retirados da pilha de operandos, e os resultados das operações são empurrados de volta para a pilha de operandos. Os resultados de subcomputações aritméticas podem, assim, ser disponibilizados como operandos de sua computação aninhada. Por exemplo, o cálculo de `~(grain-1)` é tratado por estas instruções:
```
    5   _iload_2_        // Push grain
    6   _iconst_1_       // Push int constant 1
    7   _isub_           // Subtract; push result
    8   _iconst_m1_      // Push int constant -1
    9   _ixor_           // Do XOR; push result

```

Primeiro, `grain-1` é calculado usando o conteúdo da variável local _2_ e um valor `int` imediato `1`. Esses operandos são retirados da pilha de operandos e sua diferença é empurrada de volta para a pilha de operandos. A diferença fica, assim, imediatamente disponível para uso como um operando da instrução _ixor_. (Lembre-se que `~x == -1^x`.) Similarmente, o resultado da instrução _ixor_ torna-se um operando para a instrução _iand_ subsequente.

O código para o método completo segue:
```
    Method int align2grain(int,int)
    0   _iload_1_
    1   _iload_2_
    2   _iadd_
    3   _iconst_1_
    4   _isub_
    5   _iload_2_
    6   _iconst_1_
    7   _isub_
    8   _iconst_m1_
    9   _ixor_
    10  _iand_
    11  _ireturn_

```

## 3.4. Acessando o Pool de Constantes em Tempo de Execução

Muitas constantes numéricas, bem como objetos, campos e métodos, são acessados através do pool de constantes em tempo de execução da classe atual. O acesso a objetos é considerado mais tarde ([§3.8](<#/doc/jvms/jvms-03>)). Dados dos tipos `int`, `long`, `float` e `double`, bem como referências a instâncias da classe `String`, são gerenciados usando as instruções _ldc_ , _ldc_w_ e _ldc2_w_.

As instruções _ldc_ e _ldc_w_ são usadas para acessar valores no pool de constantes em tempo de execução (incluindo instâncias da classe `String`) de tipos diferentes de `double` e `long`. A instrução _ldc_w_ é usada no lugar de _ldc_ apenas quando há um grande número de itens no pool de constantes em tempo de execução e um índice maior é necessário para acessar um item. A instrução _ldc2_w_ é usada para acessar todos os valores dos tipos `double` e `long`; não há uma variante não-wide.

Constantes integrais dos tipos `byte`, `char` ou `short`, bem como pequenos valores `int`, podem ser compiladas usando as instruções _bipush_ , _sipush_ ou _iconst_ <i>_ ([§3.2](<#/doc/jvms/jvms-03>)). Certas pequenas constantes de ponto flutuante podem ser compiladas usando as instruções _fconst_ &lt;f&gt;_ e _dconst_ &lt;d&gt;_.

Em todos esses casos, a compilação é direta. Por exemplo, as constantes para:
```

    void useManyNumeric() {
        int i = 100;
        int j = 1000000;
        long l1 = 1;
        long l2 = 0xffffffff;
        double d = 2.2;
        ...do some calculations...
    }


```

são configuradas da seguinte forma:
```
    Method void useManyNumeric()
    0   _bipush 100_   // Push small int constant with bipush
    2   _istore_1_
    3   _ldc #1_       // Push large int constant (1000000) with ldc
    5   _istore_2_
    6   _lconst_1_     // A tiny long value uses small fast lconst_1
    7   _lstore_3_
    8   _ldc2_w #6_    // Push long 0xffffffff (that is, an int -1)
            // Any long constant value can be pushed with ldc2_w
    11  _lstore 5_
    13  _ldc2_w #8_    // Push double constant 2.200000
            // Uncommon double values are also pushed with ldc2_w
    16  _dstore 7_
    ...do those calculations...

```
## 3.5. Mais Exemplos de Controle

A compilação de instruções `for` foi mostrada em uma seção anterior ([§3.2](<#/doc/jvms/jvms-03>)). A maioria das outras construções de controle da linguagem de programação Java (`if-then-else`, `do`, `while`, `break` e `continue`) também são compiladas de maneiras óbvias. A compilação de instruções `switch` é tratada em uma seção separada ([§3.10](<#/doc/jvms/jvms-03>)), assim como a compilação de exceções ([§3.12](<#/doc/jvms/jvms-03>)) e a compilação de cláusulas `finally` ([§3.13](<#/doc/jvms/jvms-03>)).

Como um exemplo adicional, um loop `while` é compilado de uma maneira óbvia, embora as instruções específicas de transferência de controle disponibilizadas pela Java Virtual Machine variem por tipo de dado. Como de costume, há mais suporte para dados do tipo `int`, por exemplo:
```

    void whileInt() {
        int i = 0;
        while (i < 100) {
            i++;
        }
    }


```

é compilado para:
```

    Method void whileInt()
    0   _iconst_0_
    1   _istore_1_
    2   _goto 8_
    5   _iinc 1 1_
    8   _iload_1_
    9   _bipush 100_
    11  _if_icmplt 5_
    14  _return_

```

Note que o teste da instrução `while` (implementado usando a instrução _if_icmplt_) está na parte inferior do código da Java Virtual Machine para o loop. (Este também foi o caso nos exemplos `spin` anteriores.) O teste estando na parte inferior do loop força o uso de uma instrução _goto_ para chegar ao teste antes da primeira iteração do loop. Se esse teste falhar e o corpo do loop nunca for inserido, esta instrução extra é desperdiçada. No entanto, loops `while` são tipicamente usados quando se espera que seu corpo seja executado, frequentemente por muitas iterações. Para iterações subsequentes, colocar o teste na parte inferior do loop economiza uma instrução da Java Virtual Machine a cada vez que o loop é executado: se o teste estivesse no topo do loop, o corpo do loop precisaria de uma instrução _goto_ final para retornar ao topo.

As construções de controle envolvendo outros tipos de dados são compiladas de maneiras semelhantes, mas devem usar as instruções disponíveis para esses tipos de dados. Isso leva a um código um tanto menos eficiente porque mais instruções da Java Virtual Machine são necessárias, por exemplo:
```

    void whileDouble() {
        double i = 0.0;
        while (i < 100.1) {
            i++;
        }
    }


```

é compilado para:
```

    Method void whileDouble()
    0   _dconst_0_
    1   _dstore_1_
    2   _goto 9_
    5   _dload_1_
    6   _dconst_1_
    7   _dadd_
    8   _dstore_1_
    9   _dload_1_
    10  _ldc2_w #4_      // Empilha a constante double 100.1
    13  _dcmpg_          // Para comparar e ramificar, precisamos usar...
    14  _iflt 5_         // ...duas instruções
    17  _return_

```

Cada tipo de ponto flutuante tem duas instruções de comparação: _fcmpl_ e _fcmpg_ para o tipo `float`, e _dcmpl_ e _dcmpg_ para o tipo `double`. As variantes diferem apenas no tratamento de NaN. NaN é não ordenado ([§2.3.2](<#/doc/jvms/jvms-02>)), então todas as comparações de ponto flutuante falham se qualquer um de seus operandos for NaN. O compilador escolhe a variante da instrução de comparação para o tipo apropriado que produz o mesmo resultado, quer a comparação falhe em valores não-NaN ou encontre um NaN. Por exemplo:
```

    int lessThan100(double d) {
        if (d < 100.0) {
            return 1;
        } else {
            return -1;
        }
    }


```

compila para:
```

    Method int lessThan100(double)
    0   _dload_1_
    1   _ldc2_w #4_      // Empilha a constante double 100.0
    4   _dcmpg_          // Empilha 1 se d for NaN ou d > 100.0;
                       // empilha 0 se d == 100.0
    5   _ifge 10_        // Ramifica em 0 ou 1
    8   _iconst_1_
    9   _ireturn_
    10  _iconst_m1_
    11  _ireturn_

```

Se `d` não for NaN e for menor que `100.0`, a instrução _dcmpg_ empilha um `int` _-1_ na operand stack, e a instrução _ifge_ não ramifica. Se `d` for maior que `100.0` ou for NaN, a instrução _dcmpg_ empilha um `int` _1_ na operand stack, e o _ifge_ ramifica. Se `d` for igual a `100.0`, a instrução _dcmpg_ empilha um `int` _0_ na operand stack, e o _ifge_ ramifica.

A instrução _dcmpl_ alcança o mesmo efeito se a comparação for invertida:
```

    int greaterThan100(double d) {
        if (d > 100.0) {
            return 1;
        } else {
            return -1;
        }
    }


```

torna-se:
```

    Method int greaterThan100(double)
    0   _dload_1_
    1   _ldc2_w #4_      // Empilha a constante double 100.0
    4   _dcmpl_          // Empilha -1 se d for NaN ou d < 100.0;
                       // empilha 0 se d == 100.0
    5   _ifle 10_        // Ramifica em 0 ou -1
    8   _iconst_1_
    9   _ireturn_
    10  _iconst_m1_
    11  _ireturn_

```

Mais uma vez, quer a comparação falhe em um valor não-NaN ou porque um NaN foi passado, a instrução _dcmpl_ empilha um valor `int` na operand stack que faz com que o _ifle_ ramifique. Se ambas as instruções _dcmp_ não existissem, um dos métodos de exemplo teria que fazer mais trabalho para detectar NaN.

## 3.6. Recebendo Argumentos

Se _n_ argumentos são passados para um instance method, eles são recebidos, por convenção, nas variáveis locais numeradas de _1_ a _n_ do frame criado para a nova invocação de método. Os argumentos são recebidos na ordem em que foram passados. Por exemplo:
```

    int addTwo(int i, int j) {
        return i + j;
    }


```

compila para:
```

    Method int addTwo(int,int)
    0   _iload_1_        // Empilha o valor da variável local 1 (i)
    1   _iload_2_        // Empilha o valor da variável local 2 (j)
    2   _iadd_           // Adiciona; deixa o resultado int na operand stack
    3   _ireturn_        // Retorna o resultado int

```

Por convenção, um instance method recebe uma `reference` para sua instância na variável local _0_. Na linguagem de programação Java, a instância é acessível através da palavra-chave `this`.

Class methods (`static`) não possuem uma instância, então para eles este uso da variável local _0_ é desnecessário. Um class method começa a usar variáveis locais no índice _0_. Se o método `addTwo` fosse um class method, seus argumentos seriam passados de forma semelhante à primeira versão:
```

    static int addTwoStatic(int i, int j) {
        return i + j;
    }


```

compila para:
```

    Method int addTwoStatic(int,int)
    0   _iload_0_
    1   _iload_1_
    2   _iadd_
    3   _ireturn_

```

A única diferença é que os argumentos do método aparecem começando na variável local _0_ em vez de _1_.

## 3.7. Invocando Métodos

A invocação normal de um instance method despacha com base no tipo de tempo de execução do objeto. (Eles são virtuais, em termos de C++.) Tal invocação é implementada usando a instrução _invokevirtual_, que recebe como argumento um índice para uma entrada da constant pool de tempo de execução que fornece a forma interna do nome binário do tipo de classe do objeto, o nome do método a ser invocado e o descritor desse método ([§4.3.3](<#/doc/jvms/jvms-04>)). Para invocar o método `addTwo`, definido anteriormente como um instance method, poderíamos escrever:
```

    int add12and13() {
        return addTwo(12, 13);
    }


```

Isso compila para:
```

    Method int add12and13()
    0   _aload_0_             // Empilha a variável local 0 (this)
    1   _bipush 12_           // Empilha a constante int 12
    3   _bipush 13_           // Empilha a constante int 13
    5   _invokevirtual #4_    // Método Example.addtwo(II)I
    8   _ireturn_             // Retorna int no topo da operand stack;
                            // é o resultado int de addTwo()

```

A invocação é configurada primeiro empilhando uma `reference` para a instância atual, `this`, na operand stack. Os argumentos da invocação do método, valores `int` `12` e `13`, são então empilhados. Quando o frame para o método `addTwo` é criado, os argumentos passados para o método tornam-se os valores iniciais das variáveis locais do novo frame. Ou seja, a `reference` para `this` e os dois argumentos, empilhados na operand stack pelo invocador, tornar-se-ão os valores iniciais das variáveis locais _0_, _1_ e _2_ do método invocado.

Finalmente, `addTwo` é invocado. Quando ele retorna, seu valor de retorno `int` é empilhado na operand stack do frame do invocador, o método `add12and13`. O valor de retorno é assim colocado para ser imediatamente retornado ao invocador de `add12and13`.

O retorno de `add12and13` é tratado pela instrução _ireturn_ de `add12and13`. A instrução _ireturn_ pega o valor `int` retornado por `addTwo`, na operand stack do frame atual, e o empilha na operand stack do frame do invocador. Em seguida, retorna o controle ao invocador, tornando o frame do invocador atual. A Java Virtual Machine fornece instruções de retorno distintas para muitos de seus tipos de dados numéricos e `reference`, bem como uma instrução _return_ para métodos sem valor de retorno. O mesmo conjunto de instruções de retorno é usado para todas as variedades de invocações de método.

O operando da instrução _invokevirtual_ (no exemplo, o índice _#4_ da constant pool de tempo de execução) não é o offset do método na instância da classe. O compilador não conhece o layout interno de uma instância de classe. Em vez disso, ele gera `references` simbólicas para os métodos de uma instância, que são armazenadas na constant pool de tempo de execução. Esses itens da constant pool de tempo de execução são resolvidos em tempo de execução para determinar a localização real do método. O mesmo é verdadeiro para todas as outras instruções da Java Virtual Machine que acessam instâncias de classe.

Invocar `addTwoStatic`, uma variante de class (`static`) de `addTwo`, é semelhante, como mostrado:
```

    int add12and13() {
        return addTwoStatic(12, 13);
    }


```

embora uma instrução de invocação de método da Java Virtual Machine diferente seja usada:
```

    Method int add12and13()
    0   _bipush 12_
    2   _bipush 13_
    4   _invokestatic #3_     // Método Example.addTwoStatic(II)I
    7   _ireturn_

```

Compilar uma invocação de um class method (`static`) é muito parecido com compilar uma invocação de um instance method, exceto que `this` não é passado pelo invocador. Os argumentos do método serão, portanto, recebidos começando com a variável local _0_ ([§3.6](<#/doc/jvms/jvms-03>)). A instrução _invokestatic_ é sempre usada para invocar class methods.

A instrução _invokespecial_ deve ser usada para invocar instance initialization methods ([§3.8](<#/>)). Ela também é usada ao invocar métodos na superclass (`super`). Por exemplo, dadas as classes `Near` e `Far` declaradas como:
```

    class Near {
        int it;
        int getItNear() {
            return it;
        }
    }
    class Far extends Near {
        int getItFar() {
            return super.getItNear();
        }
    }


```

O método `Far.getItFar` (que invoca um método da superclass) torna-se:
```

    Method int getItFar()
    0   _aload_0_
    1   _invokespecial #4_    // Método Near.getItNear()I
    4   _ireturn_

```

Note que os métodos chamados usando a instrução _invokespecial_ sempre passam `this` para o método invocado como seu primeiro argumento. Como de costume, ele é recebido na variável local _0_.

Para invocar o alvo de um method handle, um compilador deve formar um method descriptor que registre os tipos reais de argumento e retorno. Um compilador pode não realizar conversões de invocação de método nos argumentos; em vez disso, ele deve empilhá-los de acordo com seus próprios tipos não convertidos. O compilador providencia para que uma `reference` para o objeto method handle seja empilhada antes dos argumentos, como de costume. O compilador emite uma instrução _invokevirtual_ que referencia um descriptor que descreve os tipos de argumento e retorno. Por um arranjo especial com a resolução de métodos ([§5.4.3.3](<#/doc/jvms/jvms-05>)), uma instrução _invokevirtual_ que invoca os métodos `invokeExact` ou `invoke` de `java.lang.invoke.MethodHandle` sempre fará o link, desde que o method descriptor seja sintaticamente bem formado e os tipos nomeados no descriptor possam ser resolvidos.

## 3.8. Trabalhando com Instâncias de Classe

As instâncias de classe da Java Virtual Machine são criadas usando a instrução _new_ da Java Virtual Machine. Lembre-se de que, no nível da Java Virtual Machine, um constructor aparece como um método com o nome fornecido pelo compilador `<init>`. Este método com nome especial é conhecido como instance initialization method ([§2.9](<#/doc/jvms/jvms-02>)). Múltiplos instance initialization methods, correspondendo a múltiplos constructors, podem existir para uma dada classe. Uma vez que a instância da classe tenha sido criada e suas instance variables, incluindo as da classe e de todas as suas superclasses, tenham sido inicializadas com seus valores padrão, um instance initialization method da nova instância da classe é invocado. Por exemplo:
```

    Object create() {
        return new Object();
    }


```

compila para:
```

    Method java.lang.Object create()
    0   _new #1_              // Classe java.lang.Object
    3   _dup_
    4   _invokespecial #4_    // Método java.lang.Object.<init>()V
    7   _areturn_

```

As instâncias de classe são passadas e retornadas (como tipos `reference`) de forma muito semelhante aos valores numéricos, embora o tipo `reference` tenha seu próprio complemento de instruções, por exemplo:
```

    int i;                                  // Uma variável de instância
    MyObj example() {
        MyObj o = new MyObj();
        return silly(o);
    }
    MyObj silly(MyObj o) {
        if (o != null) {
            return o;
        } else {
            return o;
        }
    }


```

torna-se:
```

    Method MyObj example()
    0   _new #2_              // Classe MyObj
    3   _dup_
    4   _invokespecial #5_    // Método MyObj.<init>()V
    7   _astore_1_
    8   _aload_0_
    9   _aload_1_
    10  _invokevirtual #4_    // Método Example.silly(LMyObj;)LMyObj;
    13  _areturn_

    Method MyObj silly(MyObj)
    0   _aload_1_
    1   _ifnull 6_
    4   _aload_1_
    5   _areturn_
    6   _aload_1_
    7   _areturn_

```

Os campos de uma instância de classe (instance variables) são acessados usando as instruções _getfield_ e _putfield_. Se `i` é uma instance variable do tipo `int`, os métodos `setIt` e `getIt`, definidos como:
```

    void setIt(int value) {
        i = value;
    }
    int getIt() {
        return i;
    }


```

tornam-se:
```

    Method void setIt(int)
    0   _aload_0_
    1   _iload_1_
    2   _putfield #4_    // Campo Example.i I
    5   _return_

    Method int getIt()
    0   _aload_0_
    1   _getfield #4_    // Campo Example.i I
    4   _ireturn_

```

Assim como com os operandos das instruções de invocação de método, os operandos das instruções _putfield_ e _getfield_ (o índice _#4_ da constant pool de tempo de execução) não são os offsets dos campos na instância da classe. O compilador gera `references` simbólicas para os campos de uma instância, que são armazenadas na constant pool de tempo de execução. Esses itens da constant pool de tempo de execução são resolvidos em tempo de execução para determinar a localização do campo dentro do objeto referenciado.

## 3.9. Arrays

Arrays da Java Virtual Machine também são objetos. Arrays são criados e manipulados usando um conjunto distinto de instruções. A instrução _newarray_ é usada para criar um array de um tipo numérico. O código:
```

    void createBuffer() {
        int buffer[];
        int bufsz = 100;
        int value = 12;
        buffer = new int[bufsz];
        buffer[10] = value;
        value = buffer[11];
    }


```

pode ser compilado para:
```

    Method void createBuffer()
    0   _bipush 100_     // Empilha a constante int 100 (bufsz)
    2   _istore_2_       // Armazena bufsz na variável local 2
    3   _bipush 12_      // Empilha a constante int 12 (value)
    5   _istore_3_       // Armazena value na variável local 3
    6   _iload_2_        // Empilha bufsz...
    7   _newarray int_   // ...e cria um novo array int desse comprimento
    9   _astore_1_       // Armazena o novo array em buffer
    10  _aload_1_        // Empilha buffer
    11  _bipush 10_      // Empilha a constante int 10
    13  _iload_3_        // Empilha value
    14  _iastore_        // Armazena value em buffer[10]
    15  _aload_1_        // Empilha buffer
    16  _bipush 11_      // Empilha a constante int 11
    18  _iaload_         // Empilha o valor em buffer[11]...
    19  _istore_3_       // ...e o armazena em value
    20  _return_

```

A instrução _anewarray_ é usada para criar um array unidimensional de `references` de objetos, por exemplo:
```

    void createThreadArray() {
        Thread threads[];
        int count = 10;
        threads = new Thread[count];
        threads[0] = new Thread();
    }


```

torna-se:
```

    Method void createThreadArray()
    0   _bipush 10_           // Empilha a constante int 10
    2   _istore_2_            // Inicializa count com isso
    3   _iload_2_             // Empilha count, usado por anewarray
    4   _anewarray class #1_  // Cria novo array da classe Thread
    7   _astore_1_            // Armazena o novo array em threads
    8   _aload_1_             // Empilha o valor de threads
    9   _iconst_0_            // Empilha a constante int 0
    10  _new #1_              // Cria instância da classe Thread
    13  _dup_                 // Faz uma reference duplicada...
    14  _invokespecial #5_    // ...para o constructor de Thread
                            // Método java.lang.Thread.<init>()V
    17  _aastore_             // Armazena a nova Thread no array na posição 0
    18  _return_

```

A instrução _anewarray_ também pode ser usada para criar a primeira dimensão de um array multidimensional. Alternativamente, a instrução _multianewarray_ pode ser usada para criar várias dimensões de uma vez. Por exemplo, o array tridimensional:
```

    int[][][] create3DArray() {
        int grid[][][];
        grid = new int[10][5][];
        return grid;
    }


```

é criado por:
```

    Method int create3DArray()[][][]
    0   _bipush 10_                // Empilha int 10 (primeira dimensão)
    2   _iconst_5_                 // Empilha int 5 (segunda dimensão)
    3   _multianewarray #1 dim #2_ // Classe [[[I, um array int
                                 // tridimensional; cria apenas as
                                 // duas primeiras dimensões
    7   _astore_1_                 // Armazena o novo array...
    8   _aload_1_                  // ...então prepara para retorná-lo
    9   _areturn_

```

O primeiro operando da instrução _multianewarray_ é o índice da constant pool de tempo de execução para o tipo de classe de array a ser criado. O segundo é o número de dimensões desse tipo de array a serem realmente criadas. A instrução _multianewarray_ pode ser usada para criar todas as dimensões do tipo, como mostra o código para `create3DArray`. Note que o array multidimensional é apenas um objeto e, portanto, é carregado e retornado por uma instrução _aload_1_ e _areturn_, respectivamente. Para informações sobre nomes de classes de array, consulte [§4.4.1](<#/doc/jvms/jvms-04>).

Todos os arrays têm comprimentos associados, que são acessados através da instrução _arraylength_.
## 3.10. Compilando Switches

A compilação de declarações `switch` usa as instruções _tableswitch_ e _lookupswitch_. A instrução _tableswitch_ é usada quando os casos do `switch` podem ser eficientemente representados como índices em uma tabela de offsets de destino. O destino `default` do `switch` é usado se o valor da expressão do `switch` cair fora do intervalo de índices válidos. Por exemplo:

```java
    
    int chooseNear(int i) {
        switch (i) {
            case 0:  return  0;
            case 1:  return  1;
            case 2:  return  2;
            default: return -1;
        }
    }
    
    
```

compila para:

```
    Method int chooseNear(int)
    0   _iload_1_             // Push local variable 1 (argument i)
    1   _tableswitch 0 to 2:_ // Valid indices are 0 through 2
          _0: 28_             // If i is 0, continue at 28
          _1: 30_             // If i is 1, continue at 30
          _2: 32_             // If i is 2, continue at 32
          _default:34_        // Otherwise, continue at 34
    28  _iconst_0_            // i was 0; push int constant 0...
    29  _ireturn_             // ...and return it
    30  _iconst_1_            // i was 1; push int constant 1...
    31  _ireturn_             // ...and return it
    32  _iconst_2_            // i was 2; push int constant 2...
    33  _ireturn_             // ...and return it
    34  _iconst_m1_           // otherwise push int constant -1...
    35  _ireturn_             // ...and return it
    
```

As instruções _tableswitch_ e _lookupswitch_ da Java Virtual Machine operam apenas com dados `int`. Como as operações em valores `byte`, `char` ou `short` são internamente promovidas para `int`, um `switch` cuja expressão avalia para um desses tipos é compilado como se avaliasse para o tipo `int`. Se o método `chooseNear` tivesse sido escrito usando o tipo `short`, as mesmas instruções da Java Virtual Machine teriam sido geradas como quando usando o tipo `int`. Outros tipos numéricos devem ser convertidos para o tipo `int` para uso em um `switch`.

Onde os casos do `switch` são esparsos, a representação em tabela da instrução _tableswitch_ torna-se ineficiente em termos de espaço. A instrução _lookupswitch_ pode ser usada em vez disso. A instrução _lookupswitch_ emparelha chaves `int` (os valores dos rótulos `case`) com offsets de destino em uma tabela. Quando uma instrução _lookupswitch_ é executada, o valor da expressão do `switch` é comparado com as chaves na tabela. Se uma das chaves corresponder ao valor da expressão, a execução continua no offset de destino associado. Se nenhuma chave corresponder, a execução continua no destino `default`. Por exemplo, o código compilado para:

```java
    
    int chooseFar(int i) {
        switch (i) {
            case -100: return -1;
            case 0:    return  0;
            case 100:  return  1;
            default:   return -1;
        }
    }
    
    
```

parece exatamente com o código para `chooseNear`, exceto pela instrução _lookupswitch_:

```
    Method int chooseFar(int)
    0   _iload_1_
    1   _lookupswitch 3:_
             _-100: 36_
                _0: 38_
              _100: 40_
          _default: 42_
    36  _iconst_m1_
    37  _ireturn_
    38  _iconst_0_
    39  _ireturn_
    40  _iconst_1_
    41  _ireturn_
    42  _iconst_m1_
    43  _ireturn_
    
```

A Java Virtual Machine especifica que a tabela da instrução _lookupswitch_ deve ser ordenada por chave para que as implementações possam usar buscas mais eficientes do que uma varredura linear. Mesmo assim, a instrução _lookupswitch_ deve procurar suas chaves por uma correspondência em vez de simplesmente realizar uma verificação de limites e indexar em uma tabela como _tableswitch_. Assim, uma instrução _tableswitch_ é provavelmente mais eficiente do que uma _lookupswitch_ onde considerações de espaço permitem uma escolha.

## 3.11. Operações na Pilha de Operandos

A Java Virtual Machine possui um grande complemento de instruções que manipulam o conteúdo da pilha de operandos como valores não tipados. Estas são úteis devido à dependência da Java Virtual Machine na manipulação hábil de sua pilha de operandos. Por exemplo:

```java
    
    public long nextIndex() {
        return index++;
    }
    
    private long index = 0;
    
    
```

é compilado para:

```
    Method long nextIndex()
    0   _aload_0_        // Push this
    1   _dup_            // Make a copy of it
    2   _getfield #4_    // One of the copies of this is consumed
                       // pushing long field index,
                       // above the original this
    5   _dup2_x1_        // The long on top of the operand stack is
                       // inserted into the operand stack below the
                       // original this
    6   _lconst_1_       // Push long constant 1
    7   _ladd_           // The index value is incremented...
    8   _putfield #4_    // ...and the result stored in the field
    11  _lreturn_        // The original value of index is on top of
                       // the operand stack, ready to be returned
    
```

Note que a Java Virtual Machine nunca permite que suas instruções de manipulação da pilha de operandos modifiquem ou dividam valores individuais na pilha de operandos.

## 3.12. Lançando e Tratando Exceções

Exceções são lançadas de programas usando a palavra-chave `throw`. Sua compilação é simples:

```java
    
    void cantBeZero(int i) throws TestExc {
        if (i == 0) {
            throw new TestExc();
        }
    }
    
    
```

torna-se:

```
    Method void cantBeZero(int)
    0   _iload_1_             // Push argument 1 (i)
    1   _ifne 12_             // If i==0, allocate instance and throw
    4   _new #1_              // Create instance of TestExc
    7   _dup_                 // One reference goes to its constructor
    8   _invokespecial #7_    // Method TestExc.<init>()V
    11  _athrow_              // Second reference is thrown
    12  _return_              // Never get here if we threw TestExc
    
```

A compilação de construções `try`-`catch` é direta. Por exemplo:

```java
    
    void catchOne() {
        try {
            tryItOut();
        } catch (TestExc e) {
            handleExc(e);
        }
    }
    
    
```

é compilado como:

```
    Method void catchOne()
    0   _aload_0_             // Beginning of try block
    1   _invokevirtual #6_    // Method Example.tryItOut()V
    4   _return_              // End of try block; normal return
    5   _astore_1_            // Store thrown value in local var 1
    6   _aload_0_             // Push this
    7   _aload_1_             // Push thrown value
    8   _invokevirtual #5_    // Invoke handler method:
                            // Example.handleExc(LTestExc;)V
    11  _return_              // Return after handling TestExc
    Exception table:
    From    To      Target      Type
    0       4       5           Class TestExc
    
```

Olhando mais de perto, o bloco `try` é compilado exatamente como seria se o `try` não estivesse presente:

```
    Method void catchOne()
    0   _aload_0_             // Beginning of try block
    1   _invokevirtual #6_    // Method Example.tryItOut()V
    4   _return_              // End of try block; normal return
    
```

Se nenhuma exceção for lançada durante a execução do bloco `try`, ele se comporta como se o `try` não estivesse lá: `tryItOut` é invocado e `catchOne` retorna.

Após o bloco `try` está o código da Java Virtual Machine que implementa a única cláusula `catch`:

```
    5   _astore_1_            // Store thrown value in local var 1
    6   _aload_0_             // Push this
    7   _aload_1_             // Push thrown value
    8   _invokevirtual #5_    // Invoke handler method:
                            // Example.handleExc(LTestExc;)V
    11  _return_              // Return after handling TestExc
    Exception table:
    From    To      Target      Type
    0       4       5           Class TestExc
    
```

A invocação de `handleExc`, o conteúdo da cláusula `catch`, também é compilada como uma invocação de método normal. No entanto, a presença de uma cláusula `catch` faz com que o compilador gere uma entrada na tabela de exceções ([§2.10](<#/doc/jvms/jvms-02>), [§4.7.3](<#/doc/jvms/jvms-04>)). A tabela de exceções para o método `catchOne` tem uma entrada correspondente ao único argumento (uma instância da classe `TestExc`) que a cláusula `catch` de `catchOne` pode tratar. Se algum valor que é uma instância de `TestExc` for lançado durante a execução das instruções entre os índices _0_ e _4_ em `catchOne`, o controle é transferido para o código da Java Virtual Machine no índice _5_, que implementa o bloco da cláusula `catch`. Se o valor lançado não for uma instância de `TestExc`, a cláusula `catch` de `catchOne` não pode tratá-lo. Em vez disso, o valor é relançado para o invocador de `catchOne`.

Um `try` pode ter múltiplas cláusulas `catch`:

```java
    
    void catchTwo() {
        try {
            tryItOut();
        } catch (TestExc1 e) {
            handleExc(e);
        } catch (TestExc2 e) {
            handleExc(e);
        }
    }
    
    
```

Múltiplas cláusulas `catch` de uma dada declaração `try` são compiladas simplesmente anexando o código da Java Virtual Machine para cada cláusula `catch` uma após a outra e adicionando entradas à tabela de exceções, como mostrado:

```
    Method void catchTwo()
    0   _aload_0_             // Begin try block
    1   _invokevirtual #5_    // Method Example.tryItOut()V
    4   _return_              // End of try block; normal return
    5   _astore_1_            // Beginning of handler for TestExc1;
                            // Store thrown value in local var 1
    6   _aload_0_             // Push this
    7   _aload_1_             // Push thrown value
    8   _invokevirtual #7_    // Invoke handler method:
                            // Example.handleExc(LTestExc1;)V
    11  _return_              // Return after handling TestExc1
    12  _astore_1_            // Beginning of handler for TestExc2;
                            // Store thrown value in local var 1
    13  _aload_0_             // Push this
    14  _aload_1_             // Push thrown value
    15  _invokevirtual #7_    // Invoke handler method:
                            // Example.handleExc(LTestExc2;)V
    18  _return_              // Return after handling TestExc2
    Exception table:
    From    To      Target      Type
    0       4       5           Class TestExc1
    0       4       12          Class TestExc2
    
```

Se durante a execução da cláusula `try` (entre os índices _0_ e _4_) um valor for lançado que corresponda ao parâmetro de uma ou mais das cláusulas `catch` (o valor é uma instância de um ou mais dos parâmetros), a primeira (mais interna) cláusula `catch` correspondente é selecionada. O controle é transferido para o código da Java Virtual Machine para o bloco dessa cláusula `catch`. Se o valor lançado não corresponder ao parâmetro de nenhuma das cláusulas `catch` de `catchTwo`, a Java Virtual Machine relança o valor sem invocar código em nenhuma cláusula `catch` de `catchTwo`.

Declarações `try`-`catch` aninhadas são compiladas de forma muito semelhante a uma declaração `try` com múltiplas cláusulas `catch`:

```java
    
    void nestedCatch() {
        try {
            try {
                tryItOut();
            } catch (TestExc1 e) {
                handleExc1(e);
            }
        } catch (TestExc2 e) {
            handleExc2(e);
        }
    }
    
    
```

torna-se:

```
    Method void nestedCatch()
    0   _aload_0_             // Begin try block
    1   _invokevirtual #8_    // Method Example.tryItOut()V
    4   _return_              // End of try block; normal return
    5   _astore_1_            // Beginning of handler for TestExc1;
                            // Store thrown value in local var 1
    6   _aload_0_             // Push this
    7   _aload_1_             // Push thrown value
    8   _invokevirtual #7_    // Invoke handler method:
                            // Example.handleExc1(LTestExc1;)V
    11  _return_              // Return after handling TestExc1
    12  _astore_1_            // Beginning of handler for TestExc2;
                            // Store thrown value in local var 1
    13  _aload_0_             // Push this
    14  _aload_1_             // Push thrown value
    15  _invokevirtual #6_    // Invoke handler method:
                            // Example.handleExc2(LTestExc2;)V
    18  _return_              // Return after handling TestExc2
    Exception table:
    From    To      Target      Type
    0       4       5           Class TestExc1
    0       12      12          Class TestExc2
    
```

O aninhamento de cláusulas `catch` é representado apenas na tabela de exceções. A Java Virtual Machine não impõe aninhamento ou qualquer ordenação das entradas da tabela de exceções ([§2.10](<#/doc/jvms/jvms-02>)). No entanto, como as construções `try`-`catch` são estruturadas, um compilador pode sempre ordenar as entradas da tabela de manipuladores de exceção de tal forma que, para qualquer exceção lançada e qualquer valor de contador de programa nesse método, o primeiro manipulador de exceção que corresponde à exceção lançada corresponde à cláusula `catch` correspondente mais interna.

Por exemplo, se a invocação de `tryItOut` (no índice _1_) lançasse uma instância de `TestExc1`, ela seria tratada pela cláusula `catch` que invoca `handleExc1`. Isso ocorre mesmo que a exceção ocorra dentro dos limites da cláusula `catch` externa (capturando `TestExc2`) e mesmo que essa cláusula `catch` externa pudesse, de outra forma, ter sido capaz de tratar o valor lançado.

Como um ponto sutil, note que o intervalo de uma cláusula `catch` é inclusivo na extremidade "from" e exclusivo na extremidade "to" ([§4.7.3](<#/doc/jvms/jvms-04>)). Assim, a entrada da tabela de exceções para a cláusula `catch` que captura `TestExc1` não cobre a instrução _return_ no offset _4_. No entanto, a entrada da tabela de exceções para a cláusula `catch` que captura `TestExc2` cobre a instrução _return_ no offset _11_. As instruções de retorno dentro de cláusulas `catch` aninhadas estão incluídas no intervalo de instruções cobertas pelas cláusulas `catch` aninhadas.

## 3.13. Compilando `finally`

(Esta seção assume que um compilador gera arquivos `class` com número de versão 50.0 ou inferior, para que a instrução _jsr_ possa ser usada. Veja também [§4.10.2.5](<#/doc/jvms/jvms-04>).)

A compilação de uma declaração `try`-`finally` é semelhante à de `try`-`catch`. Antes de transferir o controle para fora da declaração `try`, seja essa transferência normal ou abrupta, porque uma exceção foi lançada, a cláusula `finally` deve ser executada primeiro. Para este exemplo simples:

```java
    
    void tryFinally() {
        try {
            tryItOut();
        } finally {
            wrapItUp();
        }
    }
    
    
```

o código compilado é:

```
    Method void tryFinally()
    0   _aload_0_             // Beginning of try block
    1   _invokevirtual #6_    // Method Example.tryItOut()V
    4   _jsr 14_              // Call finally block
    7   _return_              // End of try block
    8   _astore_1_            // Beginning of handler for any throw
    9   _jsr 14_              // Call finally block
    12  _aload_1_             // Push thrown value
    13  _athrow_              // ...and rethrow value to the invoker
    14  _astore_2_            // Beginning of finally block
    15  _aload_0_             // Push this
    16  _invokevirtual #5_    // Method Example.wrapItUp()V
    19  _ret 2_               // Return from finally block
    Exception table:
    From    To      Target      Type
    0       4       8           any
    
```

Existem quatro maneiras de o controle passar para fora da declaração `try`: caindo pelo final desse bloco, retornando, executando uma declaração `break` ou `continue`, ou lançando uma exceção. Se `tryItOut` retornar sem lançar uma exceção, o controle é transferido para o bloco `finally` usando uma instrução _jsr_. A instrução _jsr_ _14_ no índice _4_ faz uma "chamada de sub-rotina" para o código do bloco `finally` no índice _14_ (o bloco `finally` é compilado como uma sub-rotina embutida). Quando o bloco `finally` é concluído, a instrução _ret_ _2_ retorna o controle para a instrução seguinte à instrução _jsr_ no índice _4_.

Em mais detalhes, a chamada de sub-rotina funciona da seguinte forma: A instrução _jsr_ empilha o endereço da instrução seguinte (_return_ no índice _7_) na pilha de operandos antes de saltar. A instrução _astore_2_ que é o destino do salto armazena o endereço da pilha de operandos na variável local _2_. O código para o bloco `finally` (neste caso, as instruções _aload_0_ e _invokevirtual_) é executado. Assumindo que a execução desse código seja concluída normalmente, a instrução _ret_ recupera o endereço da variável local _2_ e retoma a execução nesse endereço. A instrução _return_ é executada, e `tryFinally` retorna normalmente.

Uma declaração `try` com uma cláusula `finally` é compilada para ter um manipulador de exceção especial, um que pode tratar qualquer exceção lançada dentro da declaração `try`. Se `tryItOut` lançar uma exceção, a tabela de exceções para `tryFinally` é pesquisada por um manipulador de exceção apropriado. O manipulador especial é encontrado, fazendo com que a execução continue no índice _8_. A instrução _astore_1_ no índice _8_ armazena o valor lançado na variável local _1_. A instrução _jsr_ seguinte faz uma chamada de sub-rotina para o código do bloco `finally`. Assumindo que esse código retorne normalmente, a instrução _aload_1_ no índice _12_ empilha o valor lançado de volta na pilha de operandos, e a instrução _athrow_ seguinte relança o valor.

Compilar uma declaração `try` com uma cláusula `catch` e uma cláusula `finally` é mais complexo:

```java
    
    void tryCatchFinally() {
        try {
            tryItOut();
        } catch (TestExc e) {
            handleExc(e);
        } finally {
            wrapItUp();
        }
    }
    
    
```

torna-se:

```
    Method void tryCatchFinally()
    0   _aload_0_             // Beginning of try block
    1   _invokevirtual #4_    // Method Example.tryItOut()V
    4   _goto 16_             // Jump to finally block
    7   _astore_3_            // Beginning of handler for TestExc;
                            // Store thrown value in local var 3
    8   _aload_0_             // Push this
    9   _aload_3_             // Push thrown value
    10  _invokevirtual #6_    // Invoke handler method:
                            // Example.handleExc(LTestExc;)V
    13  _goto 16_             // This goto is unnecessary, but was
                            // generated by javac in JDK 1.0.2
    16  _jsr 26_              // Call finally block
    19  _return_              // Return after handling TestExc
    20  _astore_1_            // Beginning of handler for exceptions
                            // other than TestExc, or exceptions
                            // thrown while handling TestExc
    21  _jsr 26_              // Call finally block
    24  _aload_1_             // Push thrown value...
    25  _athrow_              // ...and rethrow value to the invoker
    26  _astore_2_            // Beginning of finally block
    27  _aload_0_             // Push this
    28  _invokevirtual #5_    // Method Example.wrapItUp()V
    31  _ret 2_               // Return from finally block
    Exception table:
    From    To      Target      Type
    0       4       7           Class TestExc
    0       16      20          any
    
```

Se a declaração `try` for concluída normalmente, a instrução _goto_ no índice _4_ salta para a chamada de sub-rotina para o bloco `finally` no índice _16_. O bloco `finally` no índice _26_ é executado, o controle retorna para a instrução _return_ no índice _19_, e `tryCatchFinally` retorna normalmente.

Se `tryItOut` lançar uma instância de `TestExc`, o primeiro (mais interno) manipulador de exceção aplicável na tabela de exceções é escolhido para tratar a exceção. O código para esse manipulador de exceção, começando no índice _7_, passa o valor lançado para `handleExc` e, em seu retorno, faz a mesma chamada de sub-rotina para o bloco `finally` no índice _26_ como no caso normal. Se uma exceção não for lançada por `handleExc`, `tryCatchFinally` retorna normalmente.

Se `tryItOut` lançar um valor que não é uma instância de `TestExc` ou se `handleExc` lançar uma exceção, a condição é tratada pela segunda entrada na tabela de exceções, que trata qualquer valor lançado entre os índices _0_ e _16_. Esse manipulador de exceção transfere o controle para o índice _20_, onde o valor lançado é primeiro armazenado na variável local _1_. O código para o bloco `finally` no índice _26_ é chamado como uma sub-rotina. Se ele retornar, o valor lançado é recuperado da variável local _1_ e relançado usando a instrução _athrow_. Se um novo valor for lançado durante a execução da cláusula `finally`, a cláusula `finally` é abortada, e `tryCatchFinally` retorna abruptamente, lançando o novo valor para seu invocador.
## 3.14. Sincronização

A sincronização na Java Virtual Machine é implementada pela entrada e saída de monitor, seja explicitamente (pelo uso das instruções _monitorenter_ e _monitorexit_) ou implicitamente (pelas instruções de invocação e retorno de método).

Para código escrito na linguagem de programação Java, talvez a forma mais comum de sincronização seja o método `synchronized`. Um método `synchronized` normalmente não é implementado usando _monitorenter_ e _monitorexit_. Em vez disso, ele é simplesmente distinguido no pool de constantes em tempo de execução pela flag `ACC_SYNCHRONIZED`, que é verificada pelas instruções de invocação de método ([§2.11.10](<#/doc/jvms/jvms-02>)).

As instruções _monitorenter_ e _monitorexit_ permitem a compilação de declarações `synchronized`. Por exemplo:
```
    
    void onlyMe(Foo f) {
        synchronized(f) {
            doSomething();
        }
    }
    
    
```

é compilado para:
```
    Method void onlyMe(Foo)
    0   _aload_1_             // Push f
    1   _dup_                 // Duplicate it on the stack
    2   _astore_2_            // Store duplicate in local variable 2
    3   _monitorenter_        // Enter the monitor associated with f
    4   _aload_0_             // Holding the monitor, pass this and...
    5   _invokevirtual #5_    // ...call Example.doSomething()V
    8   _aload_2_             // Push local variable 2 (f)
    9   _monitorexit_         // Exit the monitor associated with f
    10  _goto 18_             // Complete the method normally
    13  _astore_3_            // In case of any throw, end up here
    14  _aload_2_             // Push local variable 2 (f)
    15  _monitorexit_         // Be sure to exit the monitor!
    16  _aload_3_             // Push thrown value...
    17  _athrow_              // ...and rethrow value to the invoker
    18  _return_              // Return in the normal case
    Exception table:
    From    To      Target      Type
    4       10      13          any
    13      16      13          any
    
```

O compilador garante que, ao final de qualquer invocação de método, uma instrução _monitorexit_ terá sido executada para cada instrução _monitorenter_ executada desde a invocação do método. Isso ocorre quer a invocação do método seja concluída normalmente ([§2.6.4](<#/doc/jvms/jvms-02>)) ou abruptamente ([§2.6.5](<#/doc/jvms/jvms-02>)). Para garantir o emparelhamento adequado das instruções _monitorenter_ e _monitorexit_ na conclusão abrupta da invocação de método, o compilador gera manipuladores de exceção ([§2.10](<#/doc/jvms/jvms-02>)) que corresponderão a qualquer exceção e cujo código associado executa as instruções _monitorexit_ necessárias.

## 3.15. Anotações

A representação de anotações em arquivos `class` é descrita em [§4.7.16](<#/doc/jvms/jvms-04>)-[§4.7.22](<#/doc/jvms/jvms-04>). Essas seções deixam claro como representar anotações em declarações de classes, interfaces, campos, métodos, parâmetros de método e parâmetros de tipo, bem como anotações em tipos usados nessas declarações. Anotações em declarações de pacote exigem regras adicionais, apresentadas aqui.

Quando o compilador encontra uma declaração de pacote anotada que deve ser disponibilizada em tempo de execução, ele emite um arquivo `class` com as seguintes propriedades:

  * O arquivo `class` representa uma interface, ou seja, as flags `ACC_INTERFACE` e `ACC_ABSTRACT` da estrutura `ClassFile` são definidas ([§4.1](<#/doc/jvms/jvms-04>)).

  * Se o número da versão do arquivo `class` for menor que 50.0, então a flag `ACC_SYNTHETIC` é desativada; se o número da versão do arquivo `class` for 50.0 ou superior, então a flag `ACC_SYNTHETIC` é ativada.

  * A interface tem acesso de pacote (JLS §6.6.1).

  * O nome da interface é a forma interna ([§4.2.1](<#/doc/jvms/jvms-04>)) de `_package-name_.package-info`.

  * A interface não possui superinterfaces.

  * Os únicos membros da interface são aqueles implícitos por _The Java Language Specification, Java SE 25 Edition_ (JLS §9.2).

  * As anotações na declaração do pacote são armazenadas como atributos `RuntimeVisibleAnnotations` e `RuntimeInvisibleAnnotations` na tabela `attributes` da estrutura `ClassFile`.

## 3.16. Módulos

Uma unidade de compilação que contém uma declaração de módulo (JLS §7.7) é compilada para um arquivo `class` que contém um atributo `Module`.

Por convenção, o nome de uma unidade de compilação que contém uma declaração de módulo é `module-info.java`, ecoando a convenção `package-info.java` para uma unidade de compilação que contém apenas uma declaração de pacote. Consequentemente, por convenção, o nome para a forma compilada de uma declaração de módulo é `module-info.class`.

Uma flag no item `access_flags` da estrutura `ClassFile`, `ACC_MODULE` (0x8000), indica que este arquivo `class` declara um módulo. `ACC_MODULE` desempenha um papel semelhante a `ACC_ANNOTATION` (0x2000) e `ACC_ENUM` (0x4000) ao sinalizar este arquivo `class` como "não uma classe comum". `ACC_MODULE` _não_ descreve a acessibilidade de uma classe ou interface.

O atributo `Module` é explícito sobre as dependências do módulo; não há diretivas `requires` implícitas no nível do `ClassFile`. Se o item `requires_count` for zero, então a Plataforma Java SE _não_ infere a existência de uma tabela `requires` nem qualquer entrada particular nela. `java.base` é o único módulo no qual um `requires_count` zero é legal, porque é o módulo primordial. Para todos os outros módulos, o atributo `Module` deve ter uma tabela `requires` de pelo menos um elemento, porque todos os outros módulos dependem de `java.base`. Se uma unidade de compilação contém uma declaração de módulo (exceto `java.base`) que não declara explicitamente sua dependência em `java.base`, então um compilador deve emitir uma entrada para `java.base` na tabela `requires` e marcá-la como `ACC_MANDATED` para indicar que foi implicitamente declarada.

Para encapsulamento, o atributo `Module` é explícito sobre os pacotes exportados e abertos por um módulo normal; não há diretivas `exports` ou `opens` implícitas no nível do `ClassFile` para um módulo normal. Se o item `exports_count` ou `opens_count` for zero, então a Plataforma Java SE _não_ infere a existência de uma tabela `exports` ou `opens`, nem qualquer entrada particular nela. Por outro lado, para um módulo aberto, o atributo `Module` é implícito sobre os pacotes abertos pelo módulo. Todos os pacotes de um módulo aberto são abertos para todos os outros módulos, mesmo que o item `opens_count` seja zero.

O atributo `Module` é explícito sobre o consumo e a provisão de serviços do módulo; não há diretivas `uses` ou `provides` implícitas no nível do `ClassFile`.

* * *

[Anterior](<#/doc/jvms/jvms-02>) | | [Próximo](<#/doc/jvms/jvms-04>)
---|---|---
Capítulo 2. A Estrutura da Java Virtual Machine | [Início](<#/doc/jvms/jvms-01>) | Capítulo 4. O Formato do Arquivo `class`

* * *

[ Aviso Legal ](<#/>)