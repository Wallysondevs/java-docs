# Conversões e Contextos

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Especificações Java SE](<#/>) > [Especificação da Linguagem Java](<#/doc/jls/jls-01>)

Capítulo 5. Conversões e Contextos  
---  
[Anterior](<#/doc/jls/jls-04>)  |   |  [Próximo](<#/doc/jls/jls-06>)  
  
* * *

# Capítulo 5. Conversões e Contextos 

**Sumário**

[5.1. Tipos de Conversão](<#/doc/jls/jls-05>)
    

[5.1.1. Conversão de Identidade](<#/doc/jls/jls-05>)
[5.1.2. Conversão Primitiva de Ampliação](<#/doc/jls/jls-05>)
[5.1.3. Conversão Primitiva de Estreitamento](<#/doc/jls/jls-05>)
[5.1.4. Conversão Primitiva de Ampliação e Estreitamento](<#/doc/jls/jls-05>)
[5.1.5. Conversão de Referência de Ampliação](<#/doc/jls/jls-05>)
[5.1.6. Conversão de Referência de Estreitamento](<#/doc/jls/jls-05>)
    

[5.1.6.1. Conversão de Referência de Estreitamento Permitida](<#/doc/jls/jls-05>)
[5.1.6.2. Conversões de Referência de Estreitamento Verificadas e Não Verificadas](<#/doc/jls/jls-05>)
[5.1.6.3. Conversões de Referência de Estreitamento em Tempo de Execução](<#/doc/jls/jls-05>)
[5.1.7. Conversão de Boxing](<#/doc/jls/jls-05>)
[5.1.8. Conversão de Unboxing](<#/doc/jls/jls-05>)
[5.1.9. Conversão Não Verificada](<#/doc/jls/jls-05>)
[5.1.10. Conversão de Captura](<#/doc/jls/jls-05>)
[5.1.11. Conversão de String](<#/doc/jls/jls-05>)
[5.1.12. Conversões Proibidas](<#/doc/jls/jls-05>)
[5.2. Contextos de Atribuição](<#/doc/jls/jls-05>)
[5.3. Contextos de Invocação](<#/doc/jls/jls-05>)
[5.4. Contextos de String](<#/doc/jls/jls-05>)
[5.5. Contextos de Casting](<#/doc/jls/jls-05>)
[5.6. Contextos Numéricos](<#/doc/jls/jls-05>)
[5.7. Contextos de Teste](<#/doc/jls/jls-05>)

Toda expressão escrita na linguagem de programação Java ou não produz resultado ([§15.1](<#/doc/jls/jls-15>)) ou tem um tipo que pode ser deduzido em tempo de compilação ([§15.3](<#/doc/jls/jls-15>)). Quando uma expressão aparece na maioria dos contextos, ela deve ser _compatível_ com um tipo esperado naquele contexto; este tipo é chamado de _tipo alvo_. Para conveniência, a compatibilidade de uma expressão com seu contexto circundante é facilitada de duas maneiras: 

  * Primeiro, para algumas expressões, denominadas _poly expressions_ ([§15.2](<#/doc/jls/jls-15>)), o tipo deduzido pode ser influenciado pelo tipo alvo. A mesma expressão pode ter tipos diferentes em contextos diferentes. 

  * Segundo, depois que o tipo da expressão foi deduzido, uma _conversão_ implícita do tipo da expressão para o tipo alvo pode ser realizada às vezes. 




Se nenhuma das estratégias for capaz de produzir o tipo apropriado, ocorre um erro em tempo de compilação. 

As regras que determinam se uma expressão é uma poly expression, e, em caso afirmativo, seu tipo e compatibilidade em um contexto particular, variam dependendo do tipo de contexto e da forma da expressão. Além de influenciar o tipo da expressão, o tipo alvo pode, em alguns casos, influenciar o comportamento em tempo de execução da expressão para produzir um valor do tipo apropriado. 

Similarmente, as regras que determinam se um tipo alvo permite uma conversão implícita variam dependendo do tipo de contexto, do tipo da expressão e, em um caso especial, do valor de uma expressão constante ([§15.29](<#/doc/jls/jls-15>)). Uma conversão do tipo S para o tipo T permite que uma expressão do tipo S seja tratada em tempo de compilação como se tivesse o tipo T. Em alguns casos, isso exigirá uma ação correspondente em tempo de execução para verificar a validade da conversão ou para traduzir o valor em tempo de execução da expressão para uma forma apropriada para o novo tipo T. 

**Exemplo 5.0-1. Conversões em Tempo de Compilação e Tempo de Execução**

  * Uma conversão do tipo `Object` para o tipo `Thread` requer uma verificação em tempo de execução para garantir que o valor em tempo de execução seja realmente uma instância da classe `Thread` ou de uma de suas subclasses; se não for, uma exceção é lançada. 

  * Uma conversão do tipo `Thread` para o tipo `Object` não requer nenhuma ação em tempo de execução; `Thread` é uma subclasse de `Object`, então qualquer referência produzida por uma expressão do tipo `Thread` é um valor de referência válido do tipo `Object`. 

  * Uma conversão do tipo `int` para o tipo `long` requer extensão de sinal em tempo de execução de um valor inteiro de 32 bits para a representação `long` de 64 bits. Nenhuma informação é perdida. 

  * Uma conversão do tipo `double` para o tipo `long` requer uma tradução não trivial de um valor de ponto flutuante de 64 bits para a representação inteira de 64 bits. Dependendo do valor real em tempo de execução, informações podem ser perdidas. 




  


As conversões possíveis na linguagem de programação Java são agrupadas em várias categorias amplas: 

  * Conversões de identidade 

  * Conversões primitivas de ampliação 

  * Conversões primitivas de estreitamento 

  * Conversões de referência de ampliação 

  * Conversões de referência de estreitamento 

  * Conversões de boxing 

  * Conversões de unboxing 

  * Conversões não verificadas 

  * Conversões de captura 

  * Conversões de string 




Existem sete tipos de _contextos de conversão_ nos quais poly expressions podem ser influenciadas pelo contexto ou conversões implícitas podem ocorrer. Cada tipo de contexto tem regras diferentes para a tipagem de poly expressions e permite conversões em algumas das categorias acima, mas não em outras. Os contextos são: 

  * Contextos de atribuição ([§5.2](<#/doc/jls/jls-05>), [§15.26](<#/doc/jls/jls-15>)), nos quais o valor de uma expressão é vinculado a uma variável nomeada. Tipos primitivos e de referência estão sujeitos a ampliação, valores podem ser boxed ou unboxed, e algumas expressões constantes primitivas podem estar sujeitas a estreitamento. Uma conversão não verificada também pode ocorrer. 

  * Contextos de invocação estrita ([§5.3](<#/doc/jls/jls-05>), [§15.9](<#/doc/jls/jls-15>), [§15.12](<#/doc/jls/jls-15>)), nos quais um argumento é vinculado a um parâmetro formal de um construtor ou método. Conversões primitivas de ampliação, de referência de ampliação e não verificadas podem ocorrer. 

  * Contextos de invocação flexível ([§5.3](<#/doc/jls/jls-05>), [§15.9](<#/doc/jls/jls-15>), [§15.12](<#/doc/jls/jls-15>)), nos quais, como nos contextos de invocação estrita, um argumento é vinculado a um parâmetro formal. Invocações de método ou construtor podem fornecer este contexto se nenhuma declaração aplicável puder ser encontrada usando apenas contextos de invocação estrita. Além das conversões de ampliação e não verificadas, este contexto permite que conversões de boxing e unboxing ocorram. 

  * Contextos de string ([§5.4](<#/doc/jls/jls-05>), [§15.18.1](<#/doc/jls/jls-15>)), nos quais um valor de qualquer tipo é convertido para um objeto do tipo `String`. 

  * Contextos de casting ([§5.5](<#/doc/jls/jls-05>)), nos quais o valor de uma expressão é convertido para um tipo explicitamente especificado por um operador de cast ([§15.16](<#/doc/jls/jls-15>)). Contextos de casting são mais inclusivos do que contextos de atribuição ou de invocação flexível, permitindo qualquer conversão específica que não seja uma conversão de string, mas certos casts para um tipo de referência são verificados quanto à correção em tempo de execução. 

  * Contextos numéricos ([§5.6](<#/doc/jls/jls-05>)), nos quais os operandos de um operador numérico ou algumas outras expressões que operam em números podem ser ampliados para um tipo comum. 

  * Contextos de teste ([§5.7](<#/doc/jls/jls-05>)), nos quais o valor de uma expressão é convertido para um tipo explicitamente especificado por um padrão ([§14.30](<#/doc/jls/jls-14>)). Contextos de teste são mais inclusivos do que contextos de atribuição ou de invocação flexível, mas não tão inclusivos quanto contextos de casting. 




O termo "conversão" também é usado para descrever, sem ser específico, quaisquer conversões permitidas em um contexto particular. Por exemplo, dizemos que uma expressão que é o inicializador de uma variável local está sujeita a "conversão de atribuição", significando que uma conversão específica será implicitamente escolhida para aquela expressão de acordo com as regras para o contexto de atribuição. Como outro exemplo, dizemos que uma expressão passa por "conversão de casting" para significar que o tipo da expressão será convertido conforme permitido em um contexto de casting. 

**Exemplo 5.0-2. Conversões em Vários Contextos**
```java
    class Test {
        public static void main(String[] args) {
            // Casting conversion (5.5) of a float literal to
            // type int. Without the cast operator, this would
            // be a compile-time error, because this is a
            // narrowing conversion (5.1.3):
            int i = (int)12.5f;
    
            // String conversion (5.4) of i's int value:
            System.out.println("(int)12.5f==" + i);
    
            // Assignment conversion (5.2) of i's value to type
            // float. This is a widening conversion (5.1.2):
            float f = i;
    
            // String conversion of f's float value:
            System.out.println("after float widening: " + f);
    
            // Numeric promotion (5.6) of i's value to type
            // float. This is a binary numeric promotion.
            // After promotion, the operation is float*float:
            System.out.print(f);
            f = f * i;
    
            // Two string conversions of i and f:
            System.out.println("*" + i + "==" + f);
    
            // Invocation conversion (5.3) of f's value
            // to type double, needed because the method Math.sin
            // accepts only a double argument:
            double d = Math.sin(f);
    
            // Two string conversions of f and d:
            System.out.println("Math.sin(" + f + ")==" + d);
        }
    }
    
```

Este programa produz a saída:
```
    (int)12.5f==12
    after float widening: 12.0
    12.0*12==144.0
    Math.sin(144.0)==-0.49102159389846934
    
```

  


## 5.1. Tipos de Conversão 

Conversões de tipo específicas na linguagem de programação Java são divididas em 12 tipos. 

### 5.1.1. Conversão de Identidade 

Uma conversão de um tipo para o mesmo tipo é permitida para qualquer tipo. 

Isso pode parecer trivial, mas tem duas consequências práticas. Primeiro, é sempre permitido que uma expressão tenha o tipo desejado desde o início, permitindo assim a regra simplesmente estabelecida de que toda expressão está sujeita à conversão, mesmo que seja apenas uma conversão de identidade trivial. Segundo, implica que é permitido a um programa incluir operadores de cast redundantes em prol da clareza. 

### 5.1.2. Conversão Primitiva de Ampliação 

19 conversões específicas em tipos primitivos são chamadas de _conversões primitivas de ampliação_ : 

  * `byte` para `short`, `int`, `long`, `float` ou `double`

  * `short` para `int`, `long`, `float` ou `double`

  * `char` para `int`, `long`, `float` ou `double`

  * `int` para `long`, `float` ou `double`

  * `long` para `float` ou `double`

  * `float` para `double`




Uma conversão primitiva de ampliação não perde informações sobre a magnitude geral de um valor numérico nos seguintes casos, onde o valor numérico é preservado exatamente: 

  * de um tipo integral para outro tipo integral 

  * de `byte`, `short` ou `char` para um tipo de ponto flutuante 

  * de `int` para `double`

  * de `float` para `double`




Uma conversão primitiva de ampliação de `int` para `float`, ou de `long` para `float`, ou de `long` para `double`, pode resultar em _perda de precisão_ , ou seja, o resultado pode perder alguns dos bits menos significativos do valor. Neste caso, o valor de ponto flutuante resultante será uma versão corretamente arredondada do valor inteiro, usando a política de arredondamento para o mais próximo ([§15.4](<#/doc/jls/jls-15>)). 

Uma conversão de ampliação de um valor inteiro com sinal para um tipo integral T simplesmente estende o sinal da representação em complemento de dois do valor inteiro para preencher o formato mais amplo. 

Uma conversão de ampliação de um `char` para um tipo integral T estende com zeros a representação do valor `char` para preencher o formato mais amplo. 

Uma conversão de ampliação de `int` para `float`, ou de `long` para `float`, ou de `int` para `double`, ou de `long` para `double` ocorre conforme determinado pelas regras do IEEE 754 para converter de um formato inteiro para um formato de ponto flutuante binário. 

Uma conversão de ampliação de `float` para `double` ocorre conforme determinado pelas regras do IEEE 754 para converter entre formatos de ponto flutuante binários. 

Apesar do fato de que a perda de precisão pode ocorrer, uma conversão primitiva de ampliação nunca resulta em uma exceção em tempo de execução ([§11.1.1](<#/doc/jls/jls-11>)). 

**Exemplo 5.1.2-1. Conversão Primitiva de Ampliação**
```java
    class Test {
        public static void main(String[] args) {
            int big = 1234567890;
            float approx = big;
            System.out.println(big - (int)approx);
        }
    }
    
```

Este programa imprime:
```
    -46
    
```

indicando assim que informações foram perdidas durante a conversão do tipo `int` para o tipo `float` porque valores do tipo `float` não são precisos para nove dígitos significativos. 

  


### 5.1.3. Conversão Primitiva de Estreitamento 

22 conversões específicas em tipos primitivos são chamadas de _conversões primitivas de estreitamento_ : 

  * `short` para `byte` ou `char`

  * `char` para `byte` ou `short`

  * `int` para `byte`, `short` ou `char`

  * `long` para `byte`, `short`, `char` ou `int`

  * `float` para `byte`, `short`, `char`, `int` ou `long`

  * `double` para `byte`, `short`, `char`, `int`, `long` ou `float`




Uma conversão primitiva de estreitamento pode perder informações sobre a magnitude geral de um valor numérico, e também pode perder precisão e alcance. 

Uma conversão de estreitamento de um inteiro com sinal para um tipo integral T simplesmente descarta todos, exceto os _n_ bits de ordem mais baixa, onde _n_ é o número de bits usados para representar o tipo T. Além de uma possível perda de informações sobre a magnitude do valor numérico, isso pode fazer com que o sinal do valor resultante difira do sinal do valor de entrada. 

Uma conversão de estreitamento de um `char` para um tipo integral T, da mesma forma, simplesmente descarta todos, exceto os _n_ bits de ordem mais baixa, onde _n_ é o número de bits usados para representar o tipo T. Além de uma possível perda de informações sobre a magnitude do valor numérico, isso pode fazer com que o valor resultante seja um número negativo, mesmo que `chars` representem valores inteiros sem sinal de 16 bits. 

Uma conversão de estreitamento de um número de ponto flutuante para um tipo integral T ocorre em duas etapas: 

  1. Na primeira etapa, o número de ponto flutuante é convertido para um `long`, se T for `long`, ou para um `int`, se T for `byte`, `short`, `char` ou `int`, da seguinte forma: 

     * Se o número de ponto flutuante for `NaN` ([§4.2.3](<#/doc/jls/jls-04>)), o resultado da primeira etapa da conversão é um `int` ou `long` `0`. 

     * Caso contrário, se o número de ponto flutuante não for um infinito, o valor de ponto flutuante é arredondado para um valor inteiro `V` usando a política de arredondamento em direção a zero ([§4.2.4](<#/doc/jls/jls-04>)). Então há dois casos: 

       1. Se T for `long`, e este valor inteiro puder ser representado como um `long`, então o resultado da primeira etapa é o valor `long` `V`. 

       2. Caso contrário, se este valor inteiro puder ser representado como um `int`, então o resultado da primeira etapa é o valor `int` `V`. 

     * Caso contrário, um dos dois casos a seguir deve ser verdadeiro: 

       1. O valor deve ser muito pequeno (um valor negativo de grande magnitude ou infinito negativo), e o resultado da primeira etapa é o menor valor representável do tipo `int` ou `long`. 

       2. O valor deve ser muito grande (um valor positivo de grande magnitude ou infinito positivo), e o resultado da primeira etapa é o maior valor representável do tipo `int` ou `long`. 

  2. Na segunda etapa: 

     * Se T for `int` ou `long`, o resultado da conversão é o resultado da primeira etapa. 

     * Se T for `byte`, `char` ou `short`, o resultado da conversão é o resultado de uma conversão de estreitamento para o tipo T ([§5.1.3](<#/doc/jls/jls-05>)) do resultado da primeira etapa. 




Uma conversão de estreitamento de `double` para `float` ocorre conforme determinado pelas regras do IEEE 754 para converter entre formatos de ponto flutuante binários, usando a política de arredondamento para o mais próximo ([§15.4](<#/doc/jls/jls-15>)). Esta conversão pode perder precisão, mas também perder alcance, resultando em um `float` zero a partir de um `double` não zero e um `float` infinito a partir de um `double` finito. Um `double NaN` é convertido para um `float NaN` e um `double` infinito é convertido para o `float` infinito com o mesmo sinal. 

Apesar do fato de que overflow, underflow ou outra perda de informação podem ocorrer, uma conversão primitiva de estreitamento nunca resulta em uma exceção em tempo de execução ([§11.1.1](<#/doc/jls/jls-11>)). 

**Exemplo 5.1.3-1. Conversão Primitiva de Estreitamento**
```java
    class Test {
        public static void main(String[] args) {
            float fmin = Float.NEGATIVE_INFINITY;
            float fmax = Float.POSITIVE_INFINITY;
            System.out.println("long: " + (long)fmin +
                               ".." + (long)fmax);
            System.out.println("int: " + (int)fmin +
                               ".." + (int)fmax);
            System.out.println("short: " + (short)fmin +
                               ".." + (short)fmax);
            System.out.println("char: " + (int)(char)fmin +
                               ".." + (int)(char)fmax);
            System.out.println("byte: " + (byte)fmin +
                               ".." + (byte)fmax);
        }
    }
    
```

Este programa produz a saída:
```
    long: -9223372036854775808..9223372036854775807
    int: -2147483648..2147483647
    short: 0..-1
    char: 0..65535
    byte: 0..-1
    
```

Os resultados para `char`, `int` e `long` não são surpreendentes, produzindo os valores mínimo e máximo representáveis do tipo. 

Os resultados para `byte` e `short` perdem informações sobre o sinal e a magnitude dos valores numéricos e também perdem precisão. Os resultados podem ser entendidos examinando os bits de ordem baixa do `int` mínimo e máximo. O `int` mínimo é, em hexadecimal, `0x80000000`, e o `int` máximo é `0x7fffffff`. Isso explica os resultados `short`, que são os 16 bits de ordem baixa desses valores, ou seja, `0x0000` e `0xffff`; explica os resultados `char`, que também são os 16 bits de ordem baixa desses valores, ou seja, `'\u0000'` e `'\uffff'`; e explica os resultados `byte`, que são os 8 bits de ordem baixa desses valores, ou seja, `0x00` e `0xff`. 

  


**Exemplo 5.1.3-2. Conversões Primitivas de Estreitamento que perdem informações**
```java
    class Test {
        public static void main(String[] args) {
            // A narrowing of int to short loses high bits:
            System.out.println("(short)0x12345678==0x" +
                               Integer.toHexString((short)0x12345678));
            // An int value too big for byte changes sign and magnitude:
            System.out.println("(byte)255==" + (byte)255);
            // A float value too big to fit gives largest int value:
            System.out.println("(int)1e20f==" + (int)1e20f);
            // A NaN converted to int yields zero:
            System.out.println("(int)NaN==" + (int)Float.NaN);
            // A double value too large for float yields infinity:
            System.out.println("(float)-1e100==" + (float)-1e100);
            // A double value too small for float underflows to zero:
            System.out.println("(float)1e-50==" + (float)1e-50);
        }
    }
    
```

Este programa produz a saída:
```
    (short)0x12345678==0x5678
    (byte)255==-1
    (int)1e20f==2147483647
    (int)NaN==0
    (float)-1e100==-Infinity
    (float)1e-50==0.0
    
```

  


### 5.1.4. Conversão Primitiva de Ampliação e Estreitamento 

A seguinte conversão combina conversões primitivas de ampliação e estreitamento: 

  * `byte` para `char`




Primeiro, o `byte` é convertido para um `int` via conversão primitiva de ampliação ([§5.1.2](<#/doc/jls/jls-05>)), e então o `int` resultante é convertido para um `char` por conversão primitiva de estreitamento ([§5.1.3](<#/doc/jls/jls-05>)). 

### 5.1.5. Conversão de Referência de Ampliação 

Uma _conversão de referência de ampliação_ existe de qualquer tipo de referência S para qualquer tipo de referência T, desde que S seja um subtipo de T ([§4.10](<#/doc/jls/jls-04>)). 

Conversões de referência de ampliação nunca exigem uma ação especial em tempo de execução e, portanto, nunca lançam uma exceção em tempo de execução. Elas consistem simplesmente em considerar uma referência como tendo algum outro tipo de uma maneira que pode ser provada correta em tempo de compilação. 

O tipo `null` não é um tipo de referência ([§4.1](<#/doc/jls/jls-04>)), e, portanto, uma conversão de referência de ampliação não existe do tipo `null` para um tipo de referência. No entanto, muitos contextos de conversão permitem explicitamente que o tipo `null` seja convertido para um tipo de referência. 

### 5.1.6. Conversão de Referência de Estreitamento 

Uma _conversão de referência de estreitamento_ trata expressões de um tipo de referência S como expressões de um tipo de referência T diferente, onde S não é um subtipo de T. Os pares de tipos suportados são definidos em [§5.1.6.1](<#/doc/jls/jls-05>). Ao contrário da conversão de referência de ampliação, os tipos não precisam estar diretamente relacionados. No entanto, existem restrições que proíbem a conversão entre certos pares de tipos quando pode ser estaticamente provado que nenhum valor pode ser de ambos os tipos. 

Uma conversão de referência de estreitamento pode exigir um teste em tempo de execução para validar que um valor do tipo S é um valor legítimo do tipo T. No entanto, devido à falta de informações de tipo parametrizado em tempo de execução, algumas conversões não podem ser totalmente validadas por um teste em tempo de execução; elas são sinalizadas em tempo de compilação ([§5.1.6.2](<#/doc/jls/jls-05>)). Para conversões que podem ser totalmente validadas por um teste em tempo de execução, e para certas conversões que envolvem informações de tipo parametrizado mas ainda podem ser parcialmente validadas em tempo de execução, uma `ClassCastException` é lançada se o teste falhar ([§5.1.6.3](<#/doc/jls/jls-05>)). 

#### 5.1.6.1. Conversão de Referência de Estreitamento Permitida 

Uma conversão de referência de estreitamento existe do tipo de referência S para o tipo de referência T se todas as seguintes condições forem verdadeiras: 

  * S não é um subtipo de T ([§4.10](<#/doc/jls/jls-04>)) 

  * Se existir um tipo parametrizado X que é um supertipo de T, e um tipo parametrizado Y que é um supertipo de S, de modo que as erasures de X e Y sejam as mesmas, então X e Y não são comprovadamente distintos ([§4.5](<#/doc/jls/jls-04>)). 

Usando tipos do pacote `java.util` como exemplo, nenhuma conversão de referência de estreitamento existe de `ArrayList<String>` para `ArrayList<Object>`, ou vice-versa, porque os argumentos de tipo `String` e `Object` são comprovadamente distintos. Pela mesma razão, nenhuma conversão de referência de estreitamento existe de `ArrayList<String>` para `List<Object>`, ou vice-versa. A rejeição de tipos comprovadamente distintos é um simples portão estático para prevenir conversões de referência de estreitamento "estúpidas". 

  * Um dos seguintes casos se aplica: 

    1. S é um tipo de classe ou interface, e T é um tipo de classe ou interface, e S nomeia uma classe ou interface que não é disjunta da classe ou interface nomeada por T. ("disjunta" é definido abaixo.) 

    2. S é o tipo de classe `Object` ou o tipo de interface `java.io.Serializable` ou `Cloneable` (as únicas interfaces implementadas por arrays ([§10.8](<#/doc/jls/jls-10>))), e T é um tipo de array. 

    3. S é um tipo de array SC`[]`, ou seja, um array de componentes do tipo SC; T é um tipo de array TC`[]`, ou seja, um array de componentes do tipo TC; e uma conversão de referência de estreitamento existe de SC para TC. 

    4. S é uma variável de tipo, e uma conversão de referência de estreitamento existe do limite superior de S para T. 

    5. T é uma variável de tipo, e existe uma conversão de referência de ampliação ou uma conversão de referência de estreitamento de S para o limite superior de T. 

    6. S é um tipo de interseção S1 `&` ... `&` Sn, e para todo _i_ (1 ≤ _i_ ≤ _n_), existe uma conversão de referência de ampliação ou uma conversão de referência de estreitamento de Si para T. 

    7. T é um tipo de interseção T1 `&` ... `&` Tn, e para todo _i_ (1 ≤ _i_ ≤ _n_), existe uma conversão de referência de ampliação ou uma conversão de referência de estreitamento de S para Ti. 




Uma classe ou interface é _disjunta_ de outra classe ou interface se puder ser determinado estaticamente que elas não têm instâncias em comum (além do valor `null`). As regras para disjunção são as seguintes: 

  * Uma classe nomeada C é disjunta de uma interface nomeada I se (i) não for o caso que C `<:` I, e (ii) um dos seguintes casos se aplicar: 

    * C é `final`. 

    * C é `sealed`, e todas as subclasses diretas permitidas de C são disjuntas de I. 

    * C é livremente extensível ([§8.1.1.2](<#/doc/jls/jls-08>)), e I é `sealed`, e C é disjunta de todas as subclasses e subinterfaces diretas permitidas de I. 

  * Uma interface nomeada I é disjunta de uma classe nomeada C se C for disjunta de I. 

  * Uma classe nomeada C é disjunta de outra classe nomeada D se (i) não for o caso que C `<:` D, e (ii) não for o caso que D `<:` C. 

  * Uma interface nomeada I é disjunta de outra interface nomeada J se (i) não for o caso que I `<:` J, e (ii) não for o caso que J `<:` I, e (iii) um dos seguintes casos se aplicar: 

    * I é `sealed`, e todas as subclasses e subinterfaces diretas permitidas de I são disjuntas de J. 

    * J é `sealed`, e I é disjunta de todas as subclasses e subinterfaces diretas permitidas de J. 




Se uma classe é `final` tem a maior influência sobre se a classe é disjunta de interfaces. Considere as seguintes declarações: 
```java
    interface I   {}
    final class C {}
    
```

Como a classe C é `final` e não implementa I, não pode haver instâncias de C que também sejam uma instância de I, então C e I são disjuntas. Portanto, não há conversão de referência de estreitamento de C para I. 

Em contraste, considere as seguintes declarações:
```java
    interface J {}
    class D     {}
    
```

Mesmo que a classe D não implemente J, ainda é possível que uma instância de D seja uma instância de J, por exemplo, se a seguinte declaração ocorrer: 
```java
    class E extends D implements J {}
    
```

Por esta razão, D não é disjunta de J, e há uma conversão de referência de estreitamento de D para J. 

A cláusula final acima implica que duas interfaces livremente extensíveis ([§9.1.1.4](<#/doc/jls/jls-09>)) não são disjuntas. 

#### 5.1.6.2. Conversões de Referência de Estreitamento Verificadas e Não Verificadas 

Uma conversão de referência de estreitamento é _verificada_ ou _não verificada_. Esses termos se referem à capacidade da Java Virtual Machine de validar, ou não, a correção de tipo da conversão. 

Se uma conversão de referência de estreitamento não for verificada, então a Java Virtual Machine não será capaz de validar totalmente sua correção de tipo, possivelmente levando à poluição de heap ([§4.12.2](<#/doc/jls/jls-04>)). Para sinalizar isso ao programador, uma conversão de referência de estreitamento não verificada causa um _aviso não verificado_ em tempo de compilação, a menos que seja suprimido por `@SuppressWarnings` ([§9.6.4.5](<#/doc/jls/jls-09>)). Por outro lado, se uma conversão de referência de estreitamento não for não verificada, então ela é verificada; a Java Virtual Machine será capaz de validar totalmente sua correção de tipo, então nenhum aviso é dado em tempo de compilação. 

As conversões de referência de estreitamento não verificadas são as seguintes: 

  * Uma conversão de referência de estreitamento de um tipo S para um tipo de classe ou interface parametrizado T não é verificada, a menos que pelo menos uma das seguintes condições seja verdadeira: 

    * Todos os argumentos de tipo de T são wildcards ilimitados. 

    * T `<:` S, e S não tem subtipo X diferente de T onde os argumentos de tipo de X não estão contidos nos argumentos de tipo de T. 

  * Uma conversão de referência de estreitamento de um tipo S para uma variável de tipo T não é verificada. 

  * Uma conversão de referência de estreitamento de um tipo S para um tipo de interseção T1 `&` ... `&` Tn não é verificada se existir um Ti (1 ≤ _i_ ≤ _n_) tal que S não é um subtipo de Ti e uma conversão de referência de estreitamento de S para Ti não é verificada. 




#### 5.1.6.3. Conversões de Referência de Estreitamento em Tempo de Execução 

Todas as conversões de referência de estreitamento _verificadas_ exigem uma verificação de validade em tempo de execução. Principalmente, essas conversões são para tipos de classe e interface que não são parametrizados. 

Algumas conversões de referência de estreitamento _não verificadas_ exigem uma verificação de validade em tempo de execução. Isso depende se a conversão de referência de estreitamento não verificada é _completamente não verificada_ ou _parcialmente não verificada_. Uma conversão de referência de estreitamento parcialmente não verificada exige uma verificação de validade em tempo de execução, enquanto uma conversão de referência de estreitamento completamente não verificada não exige. 

Esses termos se referem à compatibilidade dos tipos envolvidos na conversão _quando vistos como raw types_. Se a conversão é conceitualmente um "upcast", então a conversão é _completamente não verificada_ ; nenhum teste em tempo de execução é necessário porque a conversão é legal no sistema de tipos não genérico da Java Virtual Machine. Por outro lado, se a conversão é conceitualmente um "downcast", então a conversão é _parcialmente não verificada_ ; mesmo no sistema de tipos não genérico da Java Virtual Machine, uma verificação em tempo de execução é necessária para testar a compatibilidade dos tipos (raw) envolvidos na conversão. 

Usando tipos do pacote `java.util` como exemplo, uma conversão de `ArrayList<String>` para `Collection<T>` é completamente não verificada, porque o tipo (raw) `ArrayList` é um subtipo do tipo (raw) `Collection` na Java Virtual Machine. Por outro lado, uma conversão de `Collection<T>` para `ArrayList<String>` é parcialmente não verificada, porque o tipo (raw) `Collection` não é um subtipo do tipo (raw) `ArrayList` na Java Virtual Machine. 

A categorização de uma conversão de referência de estreitamento não verificada é a seguinte: 

  * Uma conversão de referência de estreitamento não verificada de S para um tipo não-interseção T é completamente não verificada se |S| `<:` |T|. 

Caso contrário, é parcialmente não verificada. 

  * Uma conversão de referência de estreitamento não verificada de S para um tipo de interseção T1 `&` ... `&` Tn é completamente não verificada se, para todo _i_ (1 ≤ _i_ ≤ _n_), S `<:` Ti ou uma conversão de referência de estreitamento de S para Ti for completamente não verificada. 

Caso contrário, é parcialmente não verificada. 




A verificação de validade em tempo de execução para uma conversão de referência de estreitamento verificada ou parcialmente não verificada é a seguinte: 

  * Se o valor em tempo de execução for `null`, então a conversão é permitida. 

  * Caso contrário, seja R a classe do objeto referenciado pelo valor, e seja T a erasure ([§4.6](<#/doc/jls/jls-04>)) do tipo para o qual está sendo convertido. Então: 

    * Se R for uma classe comum (não uma classe de array): 

      * Se T for um tipo de classe, então R deve ser a mesma classe que T ([§4.3.4](<#/doc/jls/jls-04>)) ou uma subclasse de T, ou uma `ClassCastException` é lançada. 

      * Se T for um tipo de interface, então R deve implementar a interface T ([§8.1.5](<#/doc/jls/jls-08>)), ou uma `ClassCastException` é lançada. 

      * Se T for um tipo de array, então uma `ClassCastException` é lançada. 

    * Se R for uma interface: 

Note que R não pode ser uma interface quando estas regras são aplicadas pela primeira vez para qualquer conversão dada, mas R pode ser uma interface se as regras forem aplicadas recursivamente porque o valor de referência em tempo de execução pode se referir a um array cujo tipo de elemento é um tipo de interface. 

* Se T é um tipo de classe, então T deve ser `Object` ([§4.3.2](<#/doc/jls/jls-04>)), ou uma `ClassCastException` é lançada.

* Se T é um tipo de interface, então R deve ser a mesma interface que T ou uma subinterface de T, ou uma `ClassCastException` é lançada.

* Se T é um tipo de array, então uma `ClassCastException` é lançada.

* Se R é uma classe que representa um tipo de array RC`[]`, ou seja, um array de componentes do tipo RC:

  * Se T é um tipo de classe, então T deve ser `Object` ([§4.3.2](<#/doc/jls/jls-04>)), ou uma `ClassCastException` é lançada.

  * Se T é um tipo de interface, então T deve ser o tipo `java.io.Serializable` ou `Cloneable` (as únicas interfaces implementadas por arrays), ou uma `ClassCastException` é lançada.

  * Se T é um tipo de array TC`[]`, ou seja, um array de componentes do tipo TC, então uma `ClassCastException` é lançada, a menos que TC e RC sejam do mesmo tipo primitivo, ou TC e RC sejam tipos de referência e sejam permitidos por uma aplicação recursiva dessas regras de tempo de execução.

Se a conversão for para um tipo de interseção T1 `&` ... `&` Tn, então para todo _i_ (1 ≤ _i_ ≤ _n_), qualquer verificação em tempo de execução exigida para uma conversão de S para Ti também é exigida para a conversão para o tipo de interseção.

### 5.1.7. Conversão Boxing

A conversão boxing trata expressões de um tipo primitivo como expressões de um tipo de referência correspondente. Especificamente, as nove conversões a seguir são chamadas de _conversões boxing_ :

  * Do tipo `boolean` para o tipo `Boolean`

  * Do tipo `byte` para o tipo `Byte`

  * Do tipo `short` para o tipo `Short`

  * Do tipo `char` para o tipo `Character`

  * Do tipo `int` para o tipo `Integer`

  * Do tipo `long` para o tipo `Long`

  * Do tipo `float` para o tipo `Float`

  * Do tipo `double` para o tipo `Double`

  * Do tipo null para o tipo null

Esta regra é necessária porque o operador condicional ([§15.25](<#/doc/jls/jls-15>)) aplica a conversão boxing aos tipos de seus operandos e usa o resultado em cálculos posteriores.

Em tempo de execução, a conversão boxing prossegue da seguinte forma:

  * Se `p` é um valor do tipo `boolean`, então a conversão boxing converte `p` em uma referência `r` da classe e tipo `Boolean`, de modo que `r`.booleanValue() == `p`

  * Se `p` é um valor do tipo `byte`, então a conversão boxing converte `p` em uma referência `r` da classe e tipo `Byte`, de modo que `r`.byteValue() == `p`

  * Se `p` é um valor do tipo `char`, então a conversão boxing converte `p` em uma referência `r` da classe e tipo `Character`, de modo que `r`.charValue() == `p`

  * Se `p` é um valor do tipo `short`, então a conversão boxing converte `p` em uma referência `r` da classe e tipo `Short`, de modo que `r`.shortValue() == `p`

  * Se `p` é um valor do tipo `int`, então a conversão boxing converte `p` em uma referência `r` da classe e tipo `Integer`, de modo que `r`.intValue() == `p`

  * Se `p` é um valor do tipo `long`, então a conversão boxing converte `p` em uma referência `r` da classe e tipo `Long`, de modo que `r`.longValue() == `p`

  * Se `p` é um valor do tipo `float` então:

    * Se `p` não é NaN, então a conversão boxing converte `p` em uma referência `r` da classe e tipo `Float`, de modo que `r`.floatValue()` avalia para `p`

    * Caso contrário, a conversão boxing converte `p` em uma referência `r` da classe e tipo `Float` de modo que `r`.isNaN()` avalia para `true`

  * Se `p` é um valor do tipo `double`, então:

    * Se `p` não é NaN, a conversão boxing converte `p` em uma referência `r` da classe e tipo `Double`, de modo que `r`.doubleValue()` avalia para `p`

    * Caso contrário, a conversão boxing converte `p` em uma referência `r` da classe e tipo `Double` de modo que `r`.isNaN()` avalia para `true`

  * Se `p` é um valor de qualquer outro tipo, a conversão boxing é equivalente a uma conversão de identidade ([§5.1.1](<#/doc/jls/jls-05>)).

Se o valor `p` sendo "boxed" é o resultado da avaliação de uma expressão constante ([§15.29](<#/doc/jls/jls-15>)) do tipo `boolean`, `byte`, `char`, `short`, `int` ou `long`, e o resultado é `true`, `false`, um caractere no intervalo `'\u0000'` a `'\u007f'` inclusive, ou um inteiro no intervalo `-128` a `127` inclusive, então sejam `a` e `b` os resultados de quaisquer duas conversões boxing de `p`. É sempre o caso que `a` `==` `b`.

Idealmente, o boxing de um valor primitivo sempre produziria uma referência idêntica. Na prática, isso pode não ser viável usando técnicas de implementação existentes. A regra acima é um compromisso pragmático, exigindo que certos valores comuns sejam sempre "boxed" em objetos indistinguíveis. A implementação pode armazená-los em cache, de forma preguiçosa ou ansiosa. Para outros valores, a regra não permite quaisquer suposições sobre a identidade dos valores "boxed" por parte do programador. Isso permite (mas não exige) o compartilhamento de algumas ou todas essas referências.

Isso garante que, na maioria dos casos comuns, o comportamento será o desejado, sem impor uma penalidade de desempenho indevida, especialmente em dispositivos pequenos. Implementações com menos restrições de memória podem, por exemplo, armazenar em cache todos os valores `char` e `short`, bem como os valores `int` e `long` no intervalo de -32K a +32K.

Uma conversão boxing pode resultar em um `OutOfMemoryError` se uma nova instância de uma das classes wrapper (`Boolean`, `Byte`, `Character`, `Short`, `Integer`, `Long`, `Float` ou `Double`) precisar ser alocada e não houver armazenamento suficiente disponível.

### 5.1.8. Conversão Unboxing

A conversão unboxing trata expressões de um tipo de referência como expressões de um tipo primitivo correspondente. Especificamente, as oito conversões a seguir são chamadas de _conversões unboxing_ :

  * Do tipo `Boolean` para o tipo `boolean`

  * Do tipo `Byte` para o tipo `byte`

  * Do tipo `Short` para o tipo `short`

  * Do tipo `Character` para o tipo `char`

  * Do tipo `Integer` para o tipo `int`

  * Do tipo `Long` para o tipo `long`

  * Do tipo `Float` para o tipo `float`

  * Do tipo `Double` para o tipo `double`

Em tempo de execução, a conversão unboxing prossegue da seguinte forma:

  * Se `r` é uma referência do tipo `Boolean`, então a conversão unboxing converte `r` em `r`.booleanValue()`

  * Se `r` é uma referência do tipo `Byte`, então a conversão unboxing converte `r` em `r`.byteValue()`

  * Se `r` é uma referência do tipo `Character`, então a conversão unboxing converte `r` em `r`.charValue()`

  * Se `r` é uma referência do tipo `Short`, então a conversão unboxing converte `r` em `r`.shortValue()`

  * Se `r` é uma referência do tipo `Integer`, então a conversão unboxing converte `r` em `r`.intValue()`

  * Se `r` é uma referência do tipo `Long`, então a conversão unboxing converte `r` em `r`.longValue()`

  * Se `r` é uma referência do tipo `Float`, a conversão unboxing converte `r` em `r`.floatValue()`

  * Se `r` é uma referência do tipo `Double`, então a conversão unboxing converte `r` em `r`.doubleValue()`

  * Se `r` é `null`, a conversão unboxing lança uma `NullPointerException`

Um tipo é dito ser _convertível para um tipo numérico_ se for um tipo numérico ([§4.2](<#/doc/jls/jls-04>)), ou se for um tipo de referência que pode ser convertido para um tipo numérico por conversão unboxing.

Um tipo é dito ser _convertível para um tipo integral_ se for um tipo integral, ou se for um tipo de referência que pode ser convertido para um tipo integral por conversão unboxing.

### 5.1.9. Conversão Não Verificada

Seja G o nome de uma declaração de tipo genérico com _n_ parâmetros de tipo.

Existe uma _conversão não verificada_ do tipo de classe ou interface raw ([§4.8](<#/doc/jls/jls-04>)) G para qualquer tipo parametrizado da forma G`<`T1,...,Tn`>`.

Existe uma _conversão não verificada_ do tipo de array raw G`[]`k para qualquer tipo de array da forma G`<`T1,...,Tn`>`[]`k. (A notação `[]`k indica um tipo de array de _k_ dimensões.)

O uso de uma conversão não verificada causa um _aviso não verificado_ em tempo de compilação, a menos que todos os argumentos de tipo Ti (1 ≤ _i_ ≤ _n_) sejam wildcards ilimitados ([§4.5.1](<#/doc/jls/jls-04>)), ou o aviso seja suprimido por `@SuppressWarnings` ([§9.6.4.5](<#/doc/jls/jls-09>)).

A conversão não verificada é usada para permitir uma interoperação suave de código legado, escrito antes da introdução de tipos genéricos, com bibliotecas que passaram por uma conversão para usar genericidade (um processo que chamamos de generificação). Em tais circunstâncias (mais notavelmente, clientes do Collections Framework em `java.util`), o código legado usa tipos raw (por exemplo, `Collection` em vez de `Collection<String>`). Expressões de tipos raw são passadas como argumentos para métodos de biblioteca que usam versões parametrizadas desses mesmos tipos como os tipos de seus parâmetros formais correspondentes.

Tais chamadas não podem ser demonstradas como estaticamente seguras sob o sistema de tipos usando generics. Rejeitar tais chamadas invalidaria grandes volumes de código existente e os impediria de usar versões mais recentes das bibliotecas. Isso, por sua vez, desencorajaria os fornecedores de bibliotecas a tirar proveito da genericidade. Para evitar tal reviravolta indesejável, um tipo raw pode ser convertido para uma invocação arbitrária da declaração de tipo genérico à qual o tipo raw se refere. Embora a conversão seja inconsistente, ela é tolerada como uma concessão à praticidade. Um aviso não verificado é emitido em tais casos.

### 5.1.10. Conversão de Captura

Seja G o nome de uma declaração de tipo genérico ([§8.1.2](<#/doc/jls/jls-08>), [§9.1.2](<#/doc/jls/jls-09>)) com _n_ parâmetros de tipo A1,...,An com limites correspondentes U1,...,Un.

Existe uma _conversão de captura_ de um tipo parametrizado G`<`T1,...,Tn`>` ([§4.5](<#/doc/jls/jls-04>)) para um tipo parametrizado G`<`S1,...,Sn`>`, onde, para 1 ≤ _i_ ≤ _n_ :

  * Se Ti é um argumento de tipo wildcard ([§4.5.1](<#/doc/jls/jls-04>)) da forma `?`, então Si é uma nova variável de tipo cujo limite superior é Ui`[A1:=S1,...,An:=Sn]` e cujo limite inferior é o tipo null ([§4.1](<#/doc/jls/jls-04>)).

  * Se Ti é um argumento de tipo wildcard da forma `?` `extends` Bi, então Si é uma nova variável de tipo cujo limite superior é glb(Bi, Ui`[A1:=S1,...,An:=Sn]`) e cujo limite inferior é o tipo null.

glb(V1,...,Vm) é definido como V1 `&` ... `&` Vm.

É um erro em tempo de compilação se, para quaisquer duas classes (não interfaces) Vi e Vj, Vi não é uma subclasse de Vj ou vice-versa.

  * Se Ti é um argumento de tipo wildcard da forma `?` `super` Bi, então Si é uma nova variável de tipo cujo limite superior é Ui`[A1:=S1,...,An:=Sn]` e cujo limite inferior é Bi.

  * Caso contrário, Si = Ti.

A conversão de captura em qualquer tipo que não seja um tipo parametrizado ([§4.5](<#/doc/jls/jls-04>)) atua como uma conversão de identidade ([§5.1.1](<#/doc/jls/jls-05>)).

A conversão de captura não é aplicada recursivamente.

A conversão de captura nunca exige uma ação especial em tempo de execução e, portanto, nunca lança uma exceção em tempo de execução.

A conversão de captura foi projetada para tornar os wildcards mais úteis. Para entender a motivação, vamos começar examinando o método `java.util.Collections.reverse()`:
```java

    public static void reverse(List<?> list);


```

O método inverte a lista fornecida como parâmetro. Ele funciona para qualquer tipo de lista, e, portanto, o uso do tipo wildcard `List<?>` como o tipo do parâmetro formal é totalmente apropriado.

Agora, considere como se implementaria `reverse()`:
```java

    public static void reverse(List<?> list) { rev(list); }
    private static <T> void rev(List<T> list) {
        List<T> tmp = new ArrayList<T>(list);
        for (int i = 0; i < list.size(); i++) {
            list.set(i, tmp.get(list.size() - i - 1));
        }
    }


```

A implementação precisa copiar a lista, extrair elementos da cópia e inseri-los na original. Para fazer isso de forma type-safe, precisamos dar um nome, `T`, ao tipo de elemento da lista de entrada. Fazemos isso no método de serviço privado `rev()`. Isso exige que passemos a lista de argumentos de entrada, do tipo `List<?>`, como um argumento para `rev()`. Em geral, `List<?>` é uma lista de tipo desconhecido. Não é um subtipo de `List<T>`, para qualquer tipo T. Permitir tal relação de subtipo seria inconsistente. Dado o método:
```java

    public static <T> void fill(List<T> l, T obj)


```

o seguinte código comprometeria o sistema de tipos:
```java

    List<String> ls = new ArrayList<String>();
    List<?> l = ls;
    Collections.fill(l, new Object());  // not legal - but assume it was!
    String s = ls.get(0); // ClassCastException - ls contains
                          // Objects, not Strings.


```

Assim, sem alguma dispensa especial, podemos ver que a chamada de `reverse()` para `rev()` seria proibida. Se fosse esse o caso, o autor de `reverse()` seria forçado a escrever sua assinatura como:
```java

    public static <T> void reverse(List<T> list)


```

Isso é indesejável, pois expõe informações de implementação ao chamador. Pior, o designer de uma API pode raciocinar que a assinatura usando um wildcard é o que os chamadores da API exigem, e só mais tarde perceber que uma implementação type-safe foi impedida.

A chamada de `reverse()` para `rev()` é, de fato, inofensiva, mas não pode ser justificada com base em uma relação de subtipo geral entre `List<?>` e `List<T>`. A chamada é inofensiva, porque o argumento de entrada é, sem dúvida, uma lista de algum tipo (embora desconhecido). Se pudermos capturar esse tipo desconhecido em uma variável de tipo `X`, podemos inferir que `T` é `X`. Essa é a essência da conversão de captura. A especificação, é claro, deve lidar com complicações, como limites superiores ou inferiores não triviais (e possivelmente definidos recursivamente), a presença de múltiplos argumentos, etc.

Leitores matematicamente sofisticados desejarão relacionar a conversão de captura à teoria de tipos estabelecida. Leitores não familiarizados com a teoria de tipos podem pular esta discussão - ou então estudar um texto adequado, como _Types and Programming Languages_ de Benjamin Pierce, e então revisitar esta seção.

Aqui está um breve resumo da relação da conversão de captura com as noções teóricas de tipo estabelecidas. Tipos wildcard são uma forma restrita de tipos existenciais. A conversão de captura corresponde vagamente a uma abertura de um valor de tipo existencial. Uma conversão de captura de uma expressão `e` pode ser pensada como um `open` de `e` em um escopo que compreende a expressão de nível superior que envolve `e`.

A operação `open` clássica em existenciais exige que a variável de tipo capturada não escape da expressão aberta. O `open` que corresponde à conversão de captura está sempre em um escopo suficientemente grande para que a variável de tipo capturada nunca seja visível fora desse escopo. A vantagem desse esquema é que não há necessidade de uma operação `close`, conforme definido no artigo _On Variance-Based Subtyping for Parametric Types_ de Atsushi Igarashi e Mirko Viroli, nos anais da 16ª Conferência Europeia sobre Programação Orientada a Objetos (ECOOP 2002). Para uma descrição formal de wildcards, veja _Wild FJ_ de Mads Torgersen, Erik Ernst e Christian Plesner Hansen, no 12º workshop sobre Fundamentos da Programação Orientada a Objetos (FOOL 2005).

### 5.1.11. Conversão de String

Qualquer tipo pode ser convertido para o tipo `String` por _conversão de string_.

Um valor `x` do tipo primitivo T é primeiro convertido para um valor de referência como se fosse dado como argumento para uma invocação de método apropriada:

  * Se T é `boolean`, então use `Boolean.valueOf(`x`)`.

  * Se T é `char`, então use `Character.valueOf(`x`)`.

  * Se T é `byte`, `short` ou `int`, então use `Integer.valueOf(`x`)`.

  * Se T é `long`, então use `Long.valueOf(`x`)`.

  * Se T é `float`, então use `Float.valueOf(`x`)`.

  * Se T é `double`, então use `Double.valueOf(`x`)`.

Este valor de referência é então convertido para o tipo `String` por conversão de string.

Agora, apenas valores de referência precisam ser considerados:

  * Se a referência é `null`, ela é convertida para a string "`null`" (quatro caracteres ASCII `n`, `u`, `l`, `l`).

  * Caso contrário, a conversão é realizada como se fosse por uma invocação do método `toString` do objeto referenciado sem argumentos; mas se o resultado da invocação do método `toString` for `null`, então a string "`null`" é usada em vez disso.

O método `toString` é definido pela classe primordial `Object` ([§4.3.2](<#/doc/jls/jls-04>)). Muitas classes o sobrescrevem, notavelmente `Boolean`, `Character`, `Integer`, `Long`, `Float`, `Double` e `String`.

### 5.1.12. Conversões Proibidas

Qualquer conversão que não seja explicitamente permitida é proibida.

## 5.2. Contextos de Atribuição

_Contextos de atribuição_ permitem que o valor de uma expressão seja atribuído ([§15.26](<#/doc/jls/jls-15>)) a uma variável; o tipo da expressão deve ser convertido para o tipo da variável.

Contextos de atribuição permitem o uso de um dos seguintes:

  * uma conversão de identidade ([§5.1.1](<#/doc/jls/jls-05>))

  * uma conversão primitiva de alargamento ([§5.1.2](<#/doc/jls/jls-05>))

  * uma conversão de referência de alargamento ([§5.1.5](<#/doc/jls/jls-05>))

  * uma conversão de referência de alargamento seguida por uma conversão unboxing

  * uma conversão de referência de alargamento seguida por uma conversão unboxing, e então seguida por uma conversão primitiva de alargamento

  * uma conversão boxing ([§5.1.7](<#/doc/jls/jls-05>))

  * uma conversão boxing seguida por uma conversão de referência de alargamento

  * uma conversão unboxing ([§5.1.8](<#/doc/jls/jls-05>))

  * uma conversão unboxing seguida por uma conversão primitiva de alargamento

Se, após as conversões listadas acima terem sido aplicadas, o tipo resultante for um tipo raw ([§4.8](<#/doc/jls/jls-04>)), uma conversão não verificada ([§5.1.9](<#/doc/jls/jls-04>)) pode então ser aplicada.

Além disso, se a expressão é uma expressão constante ([§15.29](<#/doc/jls/jls-15>)) do tipo `byte`, `short`, `char` ou `int`:

  * Uma conversão primitiva de estreitamento pode ser usada se a variável for do tipo `byte`, `short` ou `char`, e o valor da expressão constante for representável no tipo da variável.

  * Uma conversão primitiva de estreitamento seguida por uma conversão boxing pode ser usada se a variável for do tipo `Byte`, `Short` ou `Character`, e o valor da expressão constante for representável no tipo `byte`, `short` ou `char` respectivamente.

O estreitamento em tempo de compilação de expressões constantes significa que um código como:
```java
    byte theAnswer = 42;

```

é permitido. Sem o estreitamento, o fato de que o literal inteiro `42` tem o tipo `int` significaria que um cast para `byte` seria exigido:
```java
    byte theAnswer = (byte)42;  // cast is permitted but not required

```

Finalmente, um valor do tipo null (a referência null é o único valor desse tipo) pode ser atribuído a qualquer tipo de referência, resultando em uma referência null desse tipo.

É um erro em tempo de compilação se a cadeia de conversões contiver dois tipos parametrizados que não estão na relação de subtipo ([§4.10](<#/doc/jls/jls-04>)).

Um exemplo de tal cadeia ilegal seria:
```java
    Integer, Comparable<Integer>, Comparable, Comparable<String>

```

Os três primeiros elementos da cadeia estão relacionados por conversão de referência de alargamento, enquanto a última entrada é derivada de sua predecessora por conversão não verificada. No entanto, esta não é uma conversão de atribuição válida, porque a cadeia contém dois tipos parametrizados, `Comparable<Integer>` e `Comparable<String>`, que não são subtipos.

Se o tipo de uma expressão pode ser convertido para o tipo de uma variável por conversão de atribuição, dizemos que a expressão (ou seu valor) é _atribuível a_ a variável ou, equivalentemente, que o tipo da expressão é _compatível com atribuição_ com o tipo da variável.

As únicas exceções que podem surgir de conversões em um contexto de atribuição são:

  * Uma `ClassCastException` se, após as conversões acima terem sido aplicadas, o valor resultante for um objeto que não é uma instância de uma subclasse ou subinterface da erasure ([§4.6](<#/doc/jls/jls-04>)) do tipo da variável.

Esta circunstância só pode surgir como resultado de heap pollution ([§4.12.2](<#/doc/jls/jls-04>)). Na prática, as implementações precisam apenas realizar casts ao acessar um campo ou método de um objeto de tipo parametrizado quando o tipo apagado do campo, ou o tipo de retorno apagado do método, diferem de seu tipo não apagado.

  * Um `OutOfMemoryError` como resultado de uma conversão boxing.

  * Uma `NullPointerException` como resultado de uma conversão unboxing em uma referência null.

  * Uma `ArrayStoreException` em casos especiais envolvendo elementos de array ou acesso a campos ([§10.5](<#/doc/jls/jls-10>), [§15.26.1](<#/doc/jls/jls-15>)).

**Exemplo 5.2-1. Atribuição para Tipos Primitivos**
```java
    class Test {
        public static void main(String[] args) {
            short s = 12;      // narrow 12 to short
            float f = s;       // widen short to float
            System.out.println("f=" + f);
            char c = '\u0123';
            long l = c;        // widen char to long
            System.out.println("l=0x" + Long.toString(l,16));
            f = 1.23f;
            double d = f;      // widen float to double
            System.out.println("d=" + d);
        }
    }

```

Este programa produz a saída:
```
    f=12.0
    l=0x123
    d=1.2300000190734863

```

O programa a seguir, no entanto, produz erros em tempo de compilação:
```java
    class Test {
        public static void main(String[] args) {
            short s = 123;
            char c = s;    // error: would require cast
            s = c;         // error: would require cast
        }
    }

```

porque nem todos os valores `short` são valores `char`, e nem todos os valores `char` são valores `short`.

**Exemplo 5.2-2. Atribuição para Tipos de Referência**
```java
    class Point { int x, y; }
    class Point3D extends Point { int z; }
    interface Colorable { void setColor(int color); }

    class ColoredPoint extends Point implements Colorable {
        int color;
        public void setColor(int color) { this.color = color; }
    }

    class Test {
        public static void main(String[] args) {
            // Assignments to variables of class type:
            Point p = new Point();
            p = new Point3D();
              // OK because Point3D is a subclass of Point
            Point3D p3d = p;
              // Error: will require a cast because a Point
              // might not be a Point3D (even though it is,
              // dynamically, in this example.)

            // Assignments to variables of type Object:
            Object o  = p;          // OK: any object to Object
            int[] a   = new int[3];
            Object o2 = a;          // OK: an array to Object

            // Assignments to variables of interface type:
            ColoredPoint cp = new ColoredPoint();
            Colorable c = cp;
              // OK: ColoredPoint implements Colorable

            // Assignments to variables of array type:
            byte[] b = new byte[4];
            a = b;
              // Error: these are not arrays of the same primitive type
            Point3D[] p3da = new Point3D[3];
            Point[] pa = p3da;
              // OK: since we can assign a Point3D to a Point
            p3da = pa;
              // Error: (cast needed) since a Point
              // can't be assigned to a Point3D
        }
    }

```

O programa de teste a seguir ilustra conversões de atribuição em valores de referência, mas falha na compilação, conforme descrito em seus comentários. Este exemplo deve ser comparado ao anterior.
```java
    class Point { int x, y; }
    interface Colorable { void setColor(int color); }
    class ColoredPoint extends Point implements Colorable {
        int color;
        public void setColor(int color) { this.color = color; }
    }

    class Test {
        public static void main(String[] args) {
            Point p = new Point();
            ColoredPoint cp = new ColoredPoint();
            // Okay because ColoredPoint is a subclass of Point:
            p = cp;
            // Okay because ColoredPoint implements Colorable:
            Colorable c = cp;
            // The following cause compile-time errors because
            // we cannot be sure they will succeed, depending on
            // the run-time type of p; a run-time check will be
            // necessary for the needed narrowing conversion and
            // must be indicated by including a cast:
            cp = p;    // p might be neither a ColoredPoint
                       // nor a subclass of ColoredPoint
            c = p;     // p might not implement Colorable
        }
    }

```

**Exemplo 5.2-3. Atribuição para Tipos de Array**
```java
    class Point { int x, y; }
    class ColoredPoint extends Point { int color; }

    class Test {
        public static void main(String[] args) {
            long[] veclong = new long[100];
            Object o = veclong;          // okay
            Long l = veclong;            // compile-time error
            short[] vecshort = veclong;  // compile-time error
            Point[] pvec = new Point[100];
            ColoredPoint[] cpvec = new ColoredPoint[100];
            pvec = cpvec;                // okay
            pvec[0] = new Point();       // okay at compile time,
                                         // but would throw an
                                         // exception at run time
            cpvec = pvec;                // compile-time error
        }
    }

```

Neste exemplo:

  * O valor de `veclong` não pode ser atribuído a uma variável `Long`, porque `Long` é um tipo de classe diferente de `Object`. Um array pode ser atribuído apenas a uma variável de um tipo de array compatível, ou a uma variável do tipo `Object`, `Cloneable` ou `java.io.Serializable`.

  * O valor de `veclong` não pode ser atribuído a `vecshort`, porque são arrays de tipo primitivo, e `short` e `long` não são do mesmo tipo primitivo.

  * O valor de `cpvec` pode ser atribuído a `pvec`, porque qualquer referência que poderia ser o valor de uma expressão do tipo `ColoredPoint` pode ser o valor de uma variável do tipo `Point`. A atribuição subsequente do novo `Point` a um componente de `pvec` então lançaria uma `ArrayStoreException` (se o programa fosse corrigido de outra forma para que pudesse ser compilado), porque um array `ColoredPoint` não pode ter uma instância de `Point` como valor de um componente.

  * O valor de `pvec` não pode ser atribuído a `cpvec`, porque nem toda referência que poderia ser o valor de uma expressão do tipo `Point` pode ser corretamente o valor de uma variável do tipo `ColoredPoint`. Se o valor de `pvec` em tempo de execução fosse uma referência a uma instância de `Point[]`, e a atribuição a `cpvec` fosse permitida, uma simples referência a um componente de `cpvec`, digamos, `cpvec[0]`, poderia retornar um `Point`, e um `Point` não é um `ColoredPoint`. Assim, permitir tal atribuição permitiria uma violação do sistema de tipos. Um cast pode ser usado ([§5.5](<#/doc/jls/jls-05>), [§15.16](<#/doc/jls/jls-15>)) para garantir que `pvec` referencie um `ColoredPoint[]`:
```java
cpvec = (ColoredPoint[])pvec;  // OK, but may throw an
                                       // exception at run time

```
## 5.3. Contextos de Invocação

_Contextos de invocação_ permitem que um valor de argumento em uma invocação de método ou construtor ([§8.8.7.1](<#/doc/jls/jls-08>), [§15.9](<#/doc/jls/jls-15>), [§15.12](<#/doc/jls/jls-15>)) seja atribuído a um parâmetro formal correspondente.

Contextos de invocação _estritos_ permitem o uso de uma das seguintes opções:

  * uma conversão de identidade ([§5.1.1](<#/doc/jls/jls-05>))
  * uma conversão primitiva de alargamento ([§5.1.2](<#/doc/jls/jls-05>))
  * uma conversão de referência de alargamento ([§5.1.5](<#/doc/jls/jls-05>))

Contextos de invocação _flexíveis_ permitem um conjunto mais permissivo de conversões, porque são usados apenas para uma invocação particular se nenhuma declaração aplicável puder ser encontrada usando contextos de invocação estritos. Contextos de invocação flexíveis permitem o uso de uma das seguintes opções:

  * uma conversão de identidade ([§5.1.1](<#/doc/jls/jls-05>))
  * uma conversão primitiva de alargamento ([§5.1.2](<#/doc/jls/jls-05>))
  * uma conversão de referência de alargamento ([§5.1.5](<#/doc/jls/jls-05>))
  * uma conversão de referência de alargamento seguida por uma conversão de unboxing
  * uma conversão de referência de alargamento seguida por uma conversão de unboxing, e então seguida por uma conversão primitiva de alargamento
  * uma conversão de boxing ([§5.1.7](<#/doc/jls/jls-05>))
  * uma conversão de boxing seguida por uma conversão de referência de alargamento
  * uma conversão de unboxing ([§5.1.8](<#/doc/jls/jls-05>))
  * uma conversão de unboxing seguida por uma conversão primitiva de alargamento

Se, após as conversões listadas para um contexto de invocação terem sido aplicadas, o tipo resultante for um tipo bruto (`raw type`) ([§4.8](<#/doc/jls/jls-04>)), uma conversão não verificada (`unchecked conversion`) ([§5.1.9](<#/doc/jls/jls-05>)) pode então ser aplicada.

Um valor do tipo nulo (a referência `null` é o único valor desse tipo) pode ser atribuído a qualquer tipo de referência.

É um erro em tempo de compilação se a cadeia de conversões contiver dois tipos parametrizados que não estão na relação de subtipo ([§4.10](<#/doc/jls/jls-04>)).

As únicas exceções que podem surgir em um contexto de invocação são:

  * Uma `ClassCastException` se, após as conversões de tipo acima terem sido aplicadas, o valor resultante for um objeto que não é uma instância de uma subclasse ou subinterface da eliminação de tipo (`erasure`) ([§4.6](<#/doc/jls/jls-04>)) do tipo de parâmetro formal correspondente.
  * Um `OutOfMemoryError` como resultado de uma conversão de boxing.
  * Uma `NullPointerException` como resultado de uma conversão de unboxing em uma referência `null`.

Nem os contextos de invocação estritos nem os flexíveis incluem o estreitamento implícito de expressões constantes inteiras que é permitido em contextos de atribuição. Os projetistas da linguagem de programação Java sentiram que incluir essas conversões implícitas de estreitamento adicionaria complexidade adicional às regras de resolução de sobrecarga ([§15.12.2](<#/doc/jls/jls-15>)).

Assim, o programa:
```java
    class Test {
        static int m(byte a, int b) { return a+b; }
        static int m(short a, short b) { return a-b; }
        public static void main(String[] args) {
            System.out.println(m(12, 2));  // compile-time error
        }
    }
    
```

causa um erro em tempo de compilação porque os literais inteiros `12` e `2` têm o tipo `int`, então nenhum método `m` corresponde sob as regras de resolução de sobrecarga. Uma linguagem que incluísse o estreitamento implícito de expressões constantes inteiras precisaria de regras adicionais para resolver casos como este exemplo.

## 5.4. Contextos de String

Contextos de string se aplicam apenas a um operando do operador binário `+` que não é uma `String` quando o outro operando é uma `String`.

O tipo de destino nesses contextos é sempre `String`, e uma conversão de string ([§5.1.11](<#/doc/jls/jls-05>)) do operando que não é `String` sempre ocorre. A avaliação do operador `+` então prossegue conforme especificado em [§15.18.1](<#/doc/jls/jls-15>).

## 5.5. Contextos de Casting

_Contextos de casting_ permitem que o operando de uma expressão de casting ([§15.16](<#/doc/jls/jls-15>)) seja convertido para o tipo explicitamente nomeado pelo operador de casting. Comparado aos contextos de atribuição e contextos de invocação, os contextos de casting permitem o uso de mais conversões definidas em [§5.1](<#/doc/jls/jls-05>), e permitem mais combinações dessas conversões.

Se a expressão for de um tipo primitivo, então um contexto de casting permite o uso de uma das seguintes opções:

  * uma conversão de identidade ([§5.1.1](<#/doc/jls/jls-05>))
  * uma conversão primitiva de alargamento ([§5.1.2](<#/doc/jls/jls-05>))
  * uma conversão primitiva de estreitamento ([§5.1.3](<#/doc/jls/jls-05>))
  * uma conversão primitiva de alargamento e estreitamento ([§5.1.4](<#/doc/jls/jls-05>))
  * uma conversão de boxing ([§5.1.7](<#/doc/jls/jls-05>))
  * uma conversão de boxing seguida por uma conversão de referência de alargamento ([§5.1.5](<#/doc/jls/jls-05>))

Se a expressão for de um tipo de referência, então um contexto de casting permite o uso de uma das seguintes opções:

  * uma conversão de identidade ([§5.1.1](<#/doc/jls/jls-05>))
  * uma conversão de referência de alargamento ([§5.1.5](<#/doc/jls/jls-05>))
  * uma conversão de referência de alargamento seguida por uma conversão de unboxing
  * uma conversão de referência de alargamento seguida por uma conversão de unboxing, e então seguida por uma conversão primitiva de alargamento
  * uma conversão de referência de estreitamento ([§5.1.6](<#/doc/jls/jls-05>))
  * uma conversão de referência de estreitamento seguida por uma conversão de unboxing
  * uma conversão de unboxing ([§5.1.8](<#/doc/jls/jls-05>))
  * uma conversão de unboxing seguida por uma conversão primitiva de alargamento

Se a expressão tiver o tipo nulo, então a expressão pode ser convertida para qualquer tipo de referência.

Se um contexto de casting faz uso de uma conversão de referência de estreitamento que é verificada ou parcialmente não verificada ([§5.1.6.2](<#/doc/jls/jls-05>), [§5.1.6.3](<#/doc/jls/jls-05>)), então uma verificação em tempo de execução será realizada na classe do valor da expressão, possivelmente causando uma `ClassCastException`. Caso contrário, nenhuma verificação em tempo de execução é realizada.

Se uma expressão pode ser convertida para um tipo de referência por uma conversão de casting _diferente de uma conversão de referência de estreitamento que não é verificada_ , dizemos que a expressão (ou seu valor) é _compatível com casting verificado_ com o tipo de referência.

Se uma expressão do tipo de referência S é compatível com casting verificado com outro tipo de referência T, dizemos que o tipo S é _convertível por casting verificado_ para o tipo T.

As tabelas a seguir enumeram quais conversões são usadas em certos contextos de casting. Cada conversão é significada por um símbolo:

  * \- significa nenhuma conversão permitida
  * ≈ significa conversão de identidade ([§5.1.1](<#/doc/jls/jls-05>))
  * ω significa conversão primitiva de alargamento ([§5.1.2](<#/doc/jls/jls-05>))
  * η significa conversão primitiva de estreitamento ([§5.1.3](<#/doc/jls/jls-05>))
  * ωη significa conversão primitiva de alargamento e estreitamento ([§5.1.4](<#/doc/jls/jls-05>))
  * ⇑ significa conversão de referência de alargamento ([§5.1.5](<#/doc/jls/jls-05>))
  * ⇓ significa conversão de referência de estreitamento ([§5.1.6](<#/doc/jls/jls-05>))
  * ⊕ significa conversão de boxing ([§5.1.7](<#/doc/jls/jls-05>))
  * ⊗ significa conversão de unboxing ([§5.1.8](<#/doc/jls/jls-05>))

Nas tabelas, uma vírgula entre os símbolos indica que um contexto de casting usa uma conversão seguida por outra. O tipo `Object` significa qualquer tipo de referência diferente das oito classes wrapper `Boolean`, `Byte`, `Short`, `Character`, `Integer`, `Long`, `Float`, `Double`.

**Tabela 5.5-A. Casting para tipos primitivos**

To -> | `byte` | `short` | `char` | `int` | `long` | `float` | `double` | `boolean`  
---|---|---|---|---|---|---|---|---  
From ↓ |   |   |   |   |   |   |   |    
`byte` | ≈ | ω | ωη | ω | ω | ω | ω | -  
`short` | η | ≈ | η | ω | ω | ω | ω | -  
`char` | η | η | ≈ | ω | ω | ω | ω | -  
`int` | η | η | η | ≈ | ω | ω | ω | -  
`long` | η | η | η | η | ≈ | ω | ω | -  
`float` | η | η | η | η | η | ≈ | ω | -  
`double` | η | η | η | η | η | η | ≈ | -  
`boolean` | - | - | - | - | - | - | - | ≈  
`Byte` | ⊗ | ⊗,ω | - | ⊗,ω | ⊗,ω | ⊗,ω | ⊗,ω | -  
`Short` | - | ⊗ | - | ⊗,ω | ⊗,ω | ⊗,ω | ⊗,ω | -  
`Character` | - | - | ⊗ | ⊗,ω | ⊗,ω | ⊗,ω | ⊗,ω | -  
`Integer` | - | - | - | ⊗ | ⊗,ω | ⊗,ω | ⊗,ω | -  
`Long` | - | - | - | - | ⊗ | ⊗,ω | ⊗,ω | -  
`Float` | - | - | - | - | - | ⊗ | ⊗,ω | -  
`Double` | - | - | - | - | - | - | ⊗ | -  
`Boolean` | - | - | - | - | - | - | - | ⊗  
`Object` | ⇓,⊗ | ⇓,⊗ | ⇓,⊗ | ⇓,⊗ | ⇓,⊗ | ⇓,⊗ | ⇓,⊗ | ⇓,⊗  
  
  

**Tabela 5.5-B. Casting para tipos de referência**

To -> | `Byte` | `Short` | `Character` | `Integer` | `Long` | `Float` | `Double` | `Boolean` | `Object`  
---|---|---|---|---|---|---|---|---|---  
From ↓ |   |   |   |   |   |   |   |   |    
`byte` | ⊕ | - | - | - | - | - | - | - | ⊕,⇑  
`short` | - | ⊕ | - | - | - | - | - | - | ⊕,⇑  
`char` | - | - | ⊕ | - | - | - | - | - | ⊕,⇑  
`int` | - | - | - | ⊕ | - | - | - | - | ⊕,⇑  
`long` | - | - | - | - | ⊕ | - | - | - | ⊕,⇑  
`float` | - | - | - | - | - | ⊕ | - | - | ⊕,⇑  
`double` | - | - | - | - | - | - | ⊕ | - | ⊕,⇑  
`boolean` | - | - | - | - | - | - | - | ⊕ | ⊕,⇑  
`Byte` | ≈ | - | - | - | - | - | - | - | ⇑  
`Short` | - | ≈ | - | - | - | - | - | - | ⇑  
`Character` | - | - | ≈ | - | - | - | - | - | ⇑  
`Integer` | - | - | - | ≈ | - | - | - | - | ⇑  
`Long` | - | - | - | - | ≈ | - | - | - | ⇑  
`Float` | - | - | - | - | - | ≈ | - | - | ⇑  
`Double` | - | - | - | - | - | - | ≈ | - | ⇑  
`Boolean` | - | - | - | - | - | - | - | ≈ | ⇑  
`Object` | ⇓ | ⇓ | ⇓ | ⇓ | ⇓ | ⇓ | ⇓ | ⇓ | ≈  
  
  

**Exemplo 5.5-1. Casting para Tipos de Referência**
```java
    class Point { int x, y; }
    interface Colorable { void setColor(int color); }
    class ColoredPoint extends Point implements Colorable {
        int color;
        public void setColor(int color) { this.color = color; }
    }
    final class EndPoint extends Point {}
    
    class Test {
        public static void main(String[] args) {
            Point p = new Point();
            ColoredPoint cp = new ColoredPoint();
            Colorable c;
            // The following may cause errors at run time because
            // we cannot be sure they will succeed; this possibility
            // is suggested by the casts:
            cp = (ColoredPoint)p;  // p might not reference an
                                   // object which is a ColoredPoint
                                   // or a subclass of ColoredPoint
            c = (Colorable)p;      // p might not be Colorable
            // The following are incorrect at compile time because
            // they can never succeed as explained in the text:
            Long l = (Long)p;            // compile-time error #1
            EndPoint e = new EndPoint();
            c = (Colorable)e;            // compile-time error #2
        }
    }
    
```

Aqui, o primeiro erro em tempo de compilação ocorre porque os tipos de classe `Long` e `Point` não estão relacionados (ou seja, não são os mesmos, e nenhum é subclasse do outro), então um casting entre eles sempre falhará.

O segundo erro em tempo de compilação ocorre porque uma variável do tipo `EndPoint` nunca pode referenciar um valor que implementa a interface `Colorable`. Isso ocorre porque `EndPoint` é um tipo `final`, e uma variável de um tipo `final` sempre mantém um valor do mesmo tipo em tempo de execução que seu tipo em tempo de compilação. Portanto, o tipo em tempo de execução da variável `e` deve ser exatamente o tipo `EndPoint`, e o tipo `EndPoint` não implementa `Colorable`.

**Exemplo 5.5-2. Casting para Tipos de Array**
```java
    class Point {
        int x, y;
        Point(int x, int y) { this.x = x; this.y = y; }
        public String toString() { return "("+x+","+y+")"; }
    }
    interface Colorable { void setColor(int color); }
    class ColoredPoint extends Point implements Colorable {
        int color;
        ColoredPoint(int x, int y, int color) {
            super(x, y); setColor(color);
        }
        public void setColor(int color) { this.color = color; }
        public String toString() {
            return super.toString() + "@" + color;
        }
    }
    
    class Test {
        public static void main(String[] args) {
            Point[] pa = new ColoredPoint[4];
            pa[0] = new ColoredPoint(2, 2, 12);
            pa[1] = new ColoredPoint(4, 5, 24);
            ColoredPoint[] cpa = (ColoredPoint[])pa;
            System.out.print("cpa: {");
            for (int i = 0; i < cpa.length; i++)
                System.out.print((i == 0 ? " " : ", ") + cpa[i]);
            System.out.println(" }");
        }
    }
    
```

Este programa compila sem erros e produz a saída:
```
    cpa: { (2,2)@12, (4,5)@24, null, null }
    
```

**Exemplo 5.5-3. Casting de Tipos Incompatíveis em Tempo de Execução**
```java
    class Point { int x, y; }
    interface Colorable { void setColor(int color); }
    class ColoredPoint extends Point implements Colorable {
        int color;
        public void setColor(int color) { this.color = color; }
    }
    
    class Test {
        public static void main(String[] args) {
            Point[] pa = new Point[100];
    
            // The following line will throw a ClassCastException:
            ColoredPoint[] cpa = (ColoredPoint[])pa;
            System.out.println(cpa[0]);
            int[] shortvec = new int[2];
            Object o = shortvec;
    
            // The following line will throw a ClassCastException:
            Colorable c = (Colorable)o;
            c.setColor(0);
        }
    }
    
```

Este programa usa castings para compilar, mas lança exceções em tempo de execução, porque os tipos são incompatíveis.

## 5.6. Contextos Numéricos

_Contextos numéricos_ se aplicam aos operandos de operadores aritméticos, expressões de criação e acesso a arrays, expressões condicionais e expressões de resultado de expressões `switch`.

Uma expressão aparece em um _contexto aritmético numérico_ se a expressão for uma das seguintes:

  * O operando de um operador unário de adição `+`, operador unário de subtração `-`, ou operador de complemento bit a bit `~` ([§15.15.3](<#/doc/jls/jls-15>), [§15.15.4](<#/doc/jls/jls-15>), [§15.15.5](<#/doc/jls/jls-15>))
  * Um operando de um operador multiplicativo `*`, `/`, ou `%` ([§15.17](<#/doc/jls/jls-15>))
  * Um operando de um operador de adição ou subtração para tipos numéricos `+` ou `-` ([§15.18.2](<#/doc/jls/jls-15>))
  * Um operando de um operador de deslocamento `<<`, `>>`, ou `>>>` ([§15.19](<#/doc/jls/jls-15>)). Os operandos desses operadores de deslocamento são tratados separadamente, e não como um grupo. Uma distância de deslocamento `long` (operando direito) não promove o valor sendo deslocado (operando esquerdo) para `long`.
  * Um operando de um operador de comparação numérica `<`, `<=`, `>`, ou `>=` ([§15.20.1](<#/doc/jls/jls-15>))
  * Um operando de um operador de igualdade numérica `==` ou `!=` ([§15.21.1](<#/doc/jls/jls-15>))
  * Um operando de um operador bit a bit inteiro `&`, `^`, ou `|` ([§15.22.1](<#/doc/jls/jls-15>))

Uma expressão aparece em um _contexto de array numérico_ se a expressão for uma das seguintes:

  * Uma expressão de dimensão em uma expressão de criação de array ([§15.10.1](<#/doc/jls/jls-15>))
  * A expressão de índice em uma expressão de acesso a array ([§15.10.3](<#/doc/jls/jls-15>))

Uma expressão aparece em um _contexto de escolha numérico_ se a expressão for uma das seguintes:

  * O segundo ou terceiro operando de uma expressão condicional numérica ([§15.25.2](<#/doc/jls/jls-15>))
  * Uma expressão de resultado de uma expressão `switch` autônoma ([§15.28.1](<#/doc/jls/jls-15>)) onde todas as expressões de resultado são convertíveis para um tipo numérico

A _promoção numérica_ determina o _tipo promovido_ de todas as expressões em um contexto numérico. O tipo promovido é escolhido de forma que cada expressão possa ser convertida para o tipo promovido e, no caso de uma operação aritmética, a operação seja definida para valores do tipo promovido. A ordem das expressões em um contexto numérico não é significativa para a promoção numérica. As regras são as seguintes:

  1. Se qualquer expressão for de um tipo de referência, ela é submetida à conversão de unboxing ([§5.1.8](<#/doc/jls/jls-05>)).
  2. Em seguida, a conversão primitiva de alargamento ([§5.1.2](<#/doc/jls/jls-05>)) e a conversão primitiva de estreitamento ([§5.1.3](<#/doc/jls/jls-05>)) são aplicadas a algumas expressões, de acordo com as seguintes regras:
     * Se qualquer expressão for do tipo `double`, então o tipo promovido é `double`, e outras expressões que não são do tipo `double` sofrem conversão primitiva de alargamento para `double`.
     * Caso contrário, se qualquer expressão for do tipo `float`, então o tipo promovido é `float`, e outras expressões que não são do tipo `float` sofrem conversão primitiva de alargamento para `float`.
     * Caso contrário, se qualquer expressão for do tipo `long`, então o tipo promovido é `long`, e outras expressões que não são do tipo `long` sofrem conversão primitiva de alargamento para `long`.
     * Caso contrário, nenhuma das expressões é do tipo `double`, `float` ou `long`. Neste caso, o tipo de contexto determina como o tipo promovido é escolhido.

Em um contexto aritmético numérico ou um contexto de array numérico, o tipo promovido é `int`, e quaisquer expressões que não são do tipo `int` sofrem conversão primitiva de alargamento para `int`.

Em um contexto de escolha numérico, as seguintes regras se aplicam:

       * Se qualquer expressão for do tipo `int` e não for uma expressão constante ([§15.29](<#/doc/jls/jls-15>)), então o tipo promovido é `int`, e outras expressões que não são do tipo `int` sofrem conversão primitiva de alargamento para `int`.
       * Caso contrário, se qualquer expressão for do tipo `short`, e todas as outras expressões forem do tipo `short` ou do tipo `byte` ou uma expressão constante do tipo `int` com um valor que pode ser representado no tipo `short`, então o tipo promovido é `short`, e as expressões `byte` sofrem conversão primitiva de alargamento para `short`, e as expressões `int` sofrem conversão primitiva de estreitamento para `short`.
       * Caso contrário, se qualquer expressão for do tipo `byte`, e todas as outras expressões forem do tipo `byte` ou uma expressão constante do tipo `int` com um valor que pode ser representado no tipo `byte`, então o tipo promovido é `byte`, e as expressões `int` sofrem conversão primitiva de estreitamento para `byte`.
       * Caso contrário, se qualquer expressão for do tipo `char`, e todas as outras expressões forem do tipo `char` ou uma expressão constante do tipo `int` com um valor que pode ser representado no tipo `char`, então o tipo promovido é `char`, e as expressões `int` sofrem conversão primitiva de estreitamento para `char`.
       * Caso contrário, o tipo promovido é `int`, e todas as expressões que não são do tipo `int` sofrem conversão primitiva de alargamento para `int`.

A _promoção numérica unária_ consiste em aplicar a promoção numérica a uma única expressão que ocorre em um contexto aritmético numérico ou um contexto de array numérico.

A _promoção numérica binária_ consiste em aplicar a promoção numérica a um par de expressões que ocorrem em um contexto aritmético numérico.

A _promoção numérica geral_ consiste em aplicar a promoção numérica a todas as expressões que ocorrem em um contexto de escolha numérico.

**Exemplo 5.6-1. Promoção Numérica Unária**
```java
    class Test {
        public static void main(String[] args) {
            byte  b = 2;
            int[] a = new int[b];  // dimension expression promotion
            char  c = '\u0001';
            a[c] = 1;              // index expression promotion
            a[0] = -c;             // unary - promotion
            System.out.println("a: " + a[0] + "," + a[1]);
            b = -1;
            int i = ~b;            // bitwise complement promotion
            System.out.println("~0x" + Integer.toHexString(b)
                               + "==0x" + Integer.toHexString(i));
            i = b << 4L;           // shift promotion (left operand)
            System.out.println("0x" + Integer.toHexString(b)
                               + "<<4L==0x" + Integer.toHexString(i));
        }
    }
    
    
```

Este programa produz a saída:
```
    a: -1,1
    ~0xffffffff==0x0
    0xffffffff<<4L==0xfffffff0
    
```

**Exemplo 5.6-2. Promoção Numérica Binária**
```java
    class Test {
        public static void main(String[] args) {
            int i    = 0;
            float f  = 1.0f;
            double d = 2.0;
            // First int*float is promoted to float*float, then
            // float==double is promoted to double==double:
            if (i * f == d) System.out.println("oops");
    
            // A char&byte is promoted to int&int:
            byte b = 0x1f;
            char c = 'G';
            int control = c & b;
            System.out.println(Integer.toHexString(control));
    
            // Here int:float is promoted to float:float:
            f = (b==0) ? i : 4.0f;
            System.out.println(1.0/f);
        }
    }
    
```

Este programa produz a saída:
```
    7
    0.25
    
```

O exemplo converte o caractere ASCII `G` para o control-G (BEL) ASCII, mascarando todos os bits, exceto os 5 bits de baixa ordem do caractere. O `7` é o valor numérico deste caractere de controle.
## 5.7. Contextos de Teste

_Contextos de teste_ permitem que o operando de um operador de correspondência de padrão ([§15.20.2](<#/doc/jls/jls-15>)), ou a expressão seletora de uma expressão ou declaração `switch` que possui pelo menos um rótulo `case` de padrão associado ao seu bloco `switch` ([§14.11.1](<#/doc/jls/jls-14>)) seja convertido para um tipo como parte do processo de correspondência de padrão. Como a correspondência de padrão é um processo inerentemente condicional ([§14.30.2](<#/doc/jls/jls-14>)), espera-se que um contexto de teste faça uso de conversões que podem falhar em tempo de execução.

Contextos de teste usam conversões semelhantes para tipos de referência como contextos de casting, exceto que eles não permitem conversões de referência de estreitamento que não são verificadas ([§5.1.6.2](<#/doc/jls/jls-05>)).

Se a expressão for de um tipo primitivo, então um contexto de teste permite o uso de uma conversão de identidade ([§5.1.1](<#/doc/jls/jls-05>)).

Se a expressão for de um tipo de referência, então um contexto de teste permite o uso de um dos seguintes:

  * uma conversão de identidade ([§5.1.1](<#/doc/jls/jls-05>))

  * uma conversão de referência de alargamento ([§5.1.5](<#/doc/jls/jls-05>))

  * uma conversão de referência de estreitamento que é verificada ([§5.1.6.2](<#/doc/jls/jls-05>))

Se a expressão tiver o tipo null, então a expressão pode ser convertida para qualquer tipo de referência.

Se um contexto de teste fizer uso de uma conversão de referência de estreitamento, então uma verificação em tempo de execução será realizada na classe do valor da expressão, possivelmente causando uma `ClassCastException`. Caso contrário, nenhuma verificação em tempo de execução é realizada.

* * *

[Prev](<#/doc/jls/jls-04>)  |   |  [Next](<#/doc/jls/jls-06>)  
---|---|---  
Capítulo 4. Tipos, Valores e Variáveis  | [Início](<#/doc/jls/jls-01>) |  Capítulo 6. Nomes  
  
* * *

[ Aviso Legal ](<#/>)