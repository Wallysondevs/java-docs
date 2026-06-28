# Tipos, Valores e Variáveis

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Java SE Specifications](<#/>) > [Java Language Specification](<#/doc/jls/jls-01>)

Capítulo 4. Tipos, Valores e Variáveis
---
[Prev](<#/doc/jls/jls-03>) | | [Next](<#/doc/jls/jls-05>)
  
* * *

# Capítulo 4. Tipos, Valores e Variáveis

**Sumário**

[4.1. Os Tipos de Tipos e Valores](<#/doc/jls/jls-04>)
[4.2. Tipos e Valores Primitivos](<#/doc/jls/jls-04>)
    

[4.2.1. Tipos e Valores Integrais](<#/doc/jls/jls-04>)
[4.2.2. Operações com Inteiros](<#/doc/jls/jls-04>)
[4.2.3. Tipos e Valores de Ponto Flutuante](<#/doc/jls/jls-04>)
[4.2.4. Operações com Ponto Flutuante](<#/doc/jls/jls-04>)
[4.2.5. O Tipo `boolean` e Valores booleanos](<#/doc/jls/jls-04>)
[4.3. Tipos e Valores de Referência](<#/doc/jls/jls-04>)
    

[4.3.1. Objetos](<#/doc/jls/jls-04>)
[4.3.2. A Classe `Object`](<#/doc/jls/jls-04>)
[4.3.3. A Classe `String`](<#/doc/jls/jls-04>)
[4.3.4. Quando Tipos de Referência São Iguais](<#/doc/jls/jls-04>)
[4.4. Variáveis de Tipo](<#/doc/jls/jls-04>)
[4.5. Tipos Parametrizados](<#/doc/jls/jls-04>)
    

[4.5.1. Argumentos de Tipo de Tipos Parametrizados](<#/doc/jls/jls-04>)
[4.5.2. Membros e Construtores de Tipos Parametrizados](<#/doc/jls/jls-04>)
[4.6. Apagamento de Tipo](<#/doc/jls/jls-04>)
[4.7. Tipos Reificáveis](<#/doc/jls/jls-04>)
[4.8. Tipos Brutos](<#/doc/jls/jls-04>)
[4.9. Tipos de Interseção](<#/doc/jls/jls-04>)
[4.10. Subtipagem](<#/doc/jls/jls-04>)
    

[4.10.1. Subtipagem entre Tipos Primitivos](<#/doc/jls/jls-04>)
[4.10.2. Subtipagem entre Tipos de Classe e Interface](<#/doc/jls/jls-04>)
[4.10.3. Subtipagem entre Tipos de Array](<#/doc/jls/jls-04>)
[4.10.4. Limite Superior Mínimo](<#/doc/jls/jls-04>)
[4.10.5. Projeções de Tipo](<#/doc/jls/jls-04>)
[4.11. Onde os Tipos São Usados](<#/doc/jls/jls-04>)
[4.12. Variáveis](<#/doc/jls/jls-04>)
    

[4.12.1. Variáveis de Tipo Primitivo](<#/doc/jls/jls-04>)
[4.12.2. Variáveis de Tipo de Referência](<#/doc/jls/jls-04>)
[4.12.3. Tipos de Variáveis](<#/doc/jls/jls-04>)
[4.12.4. Variáveis `final`](<#/doc/jls/jls-04>)
[4.12.5. Valores Iniciais de Variáveis](<#/doc/jls/jls-04>)
[4.12.6. Tipos, Classes e Interfaces](<#/doc/jls/jls-04>)

A linguagem de programação Java é uma linguagem _estaticamente tipada_, o que significa que cada variável e cada expressão possui um tipo que é conhecido em tempo de compilação.

A linguagem de programação Java também é uma linguagem _fortemente tipada_, porque os tipos limitam os valores que uma variável ([§4.12](<#/doc/jls/jls-04>)) pode conter ou que uma expressão pode produzir, limitam as operações suportadas nesses valores e determinam o significado das operações. A tipagem estática forte ajuda a detectar erros em tempo de compilação.

Os tipos da linguagem de programação Java são divididos em dois tipos: tipos primitivos e tipos de referência. Os tipos primitivos ([§4.2](<#/doc/jls/jls-04>)) são o tipo `boolean` e os tipos numéricos. Os tipos numéricos são os tipos integrais `byte`, `short`, `int`, `long` e `char`, e os tipos de ponto flutuante `float` e `double`. Os tipos de referência ([§4.3](<#/doc/jls/jls-04>)) são tipos de classe, tipos de interface e tipos de array. Existe também um tipo nulo especial. Um objeto ([§4.3.1](<#/doc/jls/jls-04>)) é uma instância criada dinamicamente de um tipo de classe ou um array criado dinamicamente. Os valores de um tipo de referência são referências a objetos. Todos os objetos, incluindo arrays, suportam os métodos da classe `Object` ([§4.3.2](<#/doc/jls/jls-04>)). Literais de String são representados por objetos `String` ([§4.3.3](<#/doc/jls/jls-04>)).

## 4.1. Os Tipos de Tipos e Valores

Existem dois tipos de tipos na linguagem de programação Java: tipos primitivos ([§4.2](<#/doc/jls/jls-04>)) e tipos de referência ([§4.3](<#/doc/jls/jls-04>)). Existem, correspondentemente, dois tipos de valores de dados que podem ser armazenados em variáveis, passados como argumentos, retornados por métodos e operados: valores primitivos ([§4.2](<#/doc/jls/jls-04>)) e valores de referência ([§4.3](<#/doc/jls/jls-04>)).

Type:

[PrimitiveType](<#/doc/jls/jls-04>)   
[ReferenceType](<#/doc/jls/jls-04>)

Existe também um _tipo nulo_ especial, o tipo da expressão `null` ([§3.10.8](<#/doc/jls/jls-03>), [§15.8.1](<#/doc/jls/jls-15>)), que não possui nome.

Como o tipo nulo não tem nome, é impossível declarar uma variável do tipo nulo ou fazer um cast para o tipo nulo.

A referência nula é o único valor possível de uma expressão do tipo nulo.

A referência nula pode sempre ser atribuída ou convertida (cast) para qualquer tipo de referência ([§5.2](<#/doc/jls/jls-05>), [§5.3](<#/doc/jls/jls-05>), [§5.5](<#/doc/jls/jls-05>)).

Na prática, o programador pode ignorar o tipo nulo e apenas fingir que `null` é meramente um literal especial que pode ser de qualquer tipo de referência.

## 4.2. Tipos e Valores Primitivos

Um tipo primitivo é predefinido pela linguagem de programação Java e nomeado por sua palavra-chave reservada ([§3.9](<#/doc/jls/jls-03>)):

PrimitiveType:

{[Annotation](<#/doc/jls/jls-09>)} [NumericType](<#/doc/jls/jls-04>)   
{[Annotation](<#/doc/jls/jls-09>)} `boolean`

NumericType:

[IntegralType](<#/doc/jls/jls-04>)   
[FloatingPointType](<#/doc/jls/jls-04>)

IntegralType:

(um de)   
`byte` `short` `int` `long` `char`

FloatingPointType:

(um de)   
`float` `double`

Valores primitivos não compartilham estado com outros valores primitivos.

Os _tipos numéricos_ são os tipos integrais e os tipos de ponto flutuante.

Os _tipos integrais_ são `byte`, `short`, `int` e `long`, cujos valores são inteiros de 8 bits, 16 bits, 32 bits e 64 bits com sinal em complemento de dois, respectivamente, e `char`, cujos valores são inteiros de 16 bits sem sinal representando unidades de código UTF-16 ([§3.1](<#/doc/jls/jls-03>)).

Os _tipos de ponto flutuante_ são `float`, cujos valores correspondem exatamente aos números de ponto flutuante IEEE 754 binary32 de 32 bits, e `double`, cujos valores correspondem exatamente aos números de ponto flutuante IEEE 754 binary64 de 64 bits.

O tipo `boolean` tem exatamente dois valores: `true` e `false`.

### 4.2.1. Tipos e Valores Integrais

Os valores dos tipos integrais são inteiros nos seguintes intervalos:

  * Para `byte`, de -128 a 127, inclusive

  * Para `short`, de -32768 a 32767, inclusive

  * Para `int`, de -2147483648 a 2147483647, inclusive

  * Para `long`, de -9223372036854775808 a 9223372036854775807, inclusive

  * Para `char`, de `'\u0000'` a `'\uffff'` inclusive, ou seja, de 0 a 65535

### 4.2.2. Operações com Inteiros

A linguagem de programação Java fornece uma série de operadores que atuam sobre valores integrais:

  * Os operadores de comparação, que resultam em um valor do tipo `boolean`:

    * Os operadores de comparação numérica `<`, `<=`, `>`, e `>=` ([§15.20.1](<#/doc/jls/jls-15>))

    * Os operadores de igualdade numérica `==` e `!=` ([§15.21.1](<#/doc/jls/jls-15>))

  * Os operadores numéricos, que resultam em um valor do tipo `int` ou `long`:

    * Os operadores unários de mais e menos `+` e `-` ([§15.15.3](<#/doc/jls/jls-15>), [§15.15.4](<#/doc/jls/jls-15>))

    * Os operadores multiplicativos `*`, `/` e `%` ([§15.17](<#/doc/jls/jls-15>))

    * Os operadores aditivos `+` e `-` ([§15.18](<#/doc/jls/jls-15>))

    * O operador de incremento `++`, tanto prefixo ([§15.15.1](<#/doc/jls/jls-15>)) quanto postfixo ([§15.14.2](<#/doc/jls/jls-15>))

    * O operador de decremento `--`, tanto prefixo ([§15.15.2](<#/doc/jls/jls-15>)) quanto postfixo ([§15.14.3](<#/doc/jls/jls-15>))

    * Os operadores de deslocamento com e sem sinal `<<`, `>>` e `>>>` ([§15.19](<#/doc/jls/jls-15>))

    * O operador de complemento bit a bit `~` ([§15.15.5](<#/doc/jls/jls-15>))

    * Os operadores bit a bit de inteiros `&`, `^` e `|` ([§15.22.1](<#/doc/jls/jls-15>))

  * O operador condicional `? :` ([§15.25](<#/doc/jls/jls-15>))

  * O operador de cast ([§15.16](<#/doc/jls/jls-15>)), que pode converter de um valor integral para um valor de qualquer tipo numérico especificado

  * O operador de concatenação de strings `+` ([§15.18.1](<#/doc/jls/jls-15>)), que, quando recebe um operando `String` e um operando integral, converterá o operando integral para uma `String` (a forma decimal de um operando `byte`, `short`, `int` ou `long`, ou o caractere de um operando `char`), e então produzirá uma `String` recém-criada que é a concatenação das duas strings

Outros construtores, métodos e constantes úteis são predefinidos nas classes `Byte`, `Short`, `Integer`, `Long` e `Character`.

Se um operador inteiro, que não seja um operador de deslocamento, tiver pelo menos um operando do tipo `long`, então a operação é realizada usando precisão de 64 bits, e o resultado do operador numérico é do tipo `long`. Se o outro operando não for `long`, ele é primeiro ampliado ([§5.1.5](<#/doc/jls/jls-05>)) para o tipo `long` por promoção numérica ([§5.6](<#/doc/jls/jls-05>)).

Caso contrário, a operação é realizada usando precisão de 32 bits, e o resultado do operador numérico é do tipo `int`. Se qualquer um dos operandos não for um `int`, ele é primeiro ampliado para o tipo `int` por promoção numérica.

Os operadores inteiros não indicam overflow ou underflow de forma alguma.

Qualquer valor de qualquer tipo integral pode ser convertido (cast) para ou de qualquer tipo numérico. Não há casts entre tipos integrais e o tipo `boolean`.

Veja [§4.2.5](<#/doc/jls/jls-04>) para um idioma para converter expressões inteiras para `boolean`.

Um operador inteiro pode lançar uma exceção ([§11 (_Exceções_)](<#/doc/jls/jls-11>)) pelos seguintes motivos:

  * Qualquer operador inteiro pode lançar uma `NullPointerException` se a conversão de unboxing ([§5.1.8](<#/doc/jls/jls-05>)) de uma referência nula for necessária.

  * O operador de divisão inteira `/` ([§15.17.2](<#/doc/jls/jls-15>)) e o operador de resto inteiro `%` ([§15.17.3](<#/doc/jls/jls-15>)) podem lançar uma `ArithmeticException` se o operando da direita for zero.

  * Os operadores de incremento e decremento `++` ([§15.14.2](<#/doc/jls/jls-15>), [§15.15.1](<#/doc/jls/jls-15>)) e `--` ([§15.14.3](<#/doc/jls/jls-15>), [§15.15.2](<#/doc/jls/jls-15>)) podem lançar uma `OutOfMemoryError` se a conversão de boxing ([§5.1.7](<#/doc/jls/jls-05>)) for necessária e não houver memória suficiente disponível para realizar a conversão.

**Exemplo 4.2.2-1. Operações com Inteiros**
```java
    class Test {
        public static void main(String[] args) {
            int i = 1000000;
            System.out.println(i * i);
            long l = i;
            System.out.println(l * l);
            System.out.println(20296 / (l - i));
        }
    }
    
```

Este programa produz a saída:
```
    -727379968
    1000000000000
    
```

e então encontra uma `ArithmeticException` na divisão por `l - i`, porque `l - i` é zero. A primeira multiplicação é realizada com precisão de 32 bits, enquanto a segunda multiplicação é uma multiplicação `long`. O valor `-727379968` é o valor decimal dos 32 bits de baixa ordem do resultado matemático, `1000000000000`, que é um valor muito grande para o tipo `int`.

### 4.2.3. Tipos e Valores de Ponto Flutuante

Os tipos de ponto flutuante são `float` e `double`, que estão conceitualmente associados aos formatos de ponto flutuante binary32 de 32 bits e binary64 de 64 bits para valores e operações IEEE 754, conforme especificado no Padrão IEEE 754 ([§1.7](<#/doc/jls/jls-01>)).

No Java SE 15 e posterior, a linguagem de programação Java usa a versão 2019 do Padrão IEEE 754. Antes do Java SE 15, a linguagem de programação Java usava a versão 1985 do Padrão IEEE 754, onde o formato binary32 era conhecido como formato single e o formato binary64 era conhecido como formato double.

O IEEE 754 inclui não apenas números positivos e negativos que consistem em um sinal e magnitude, mas também zeros positivos e negativos, _infinitos_ positivos e negativos, e valores especiais _Not-a-Number_ (doravante abreviado como NaN). Um valor NaN é usado para representar o resultado de certas operações inválidas, como dividir zero por zero. Constantes NaN dos tipos `float` e `double` são predefinidas como `Float.NaN` e `Double.NaN`.

Os valores finitos não nulos de um tipo de ponto flutuante podem todos ser expressos na forma _s_ ⋅ _m_ ⋅ 2(_e_ \- `N` \+ 1), onde:

  * _s_ é +1 ou -1,

  * _m_ é um inteiro positivo menor que 2`N`,

  * _e_ é um inteiro entre _E min_ = -(2K-1-2) e _E max_ = 2K-1-1, inclusive, e

  * `N` e K são parâmetros que dependem do tipo.

Alguns valores podem ser representados nesta forma de mais de uma maneira. Por exemplo, supondo que um valor `v` de um tipo de ponto flutuante possa ser representado nesta forma usando certos valores para _s_, _m_ e _e_, então, se acontecesse que _m_ fosse par e _e_ fosse menor que 2K-1, poder-se-ia reduzir _m_ pela metade e aumentar _e_ em 1 para produzir uma segunda representação para o mesmo valor `v`.

Uma representação nesta forma é chamada de _normalizada_ se _m_ ≥ 2`N`-1; caso contrário, a representação é dita _subnormal_. Se um valor de um tipo de ponto flutuante não pode ser representado de tal forma que _m_ ≥ 2`N`-1, então o valor é dito ser um _valor subnormal_, porque sua magnitude está abaixo da magnitude do menor valor normalizado.

As restrições nos parâmetros `N` e K (e nos parâmetros derivados _E min_ e _E max_) para `float` e `double` são resumidas na [Tabela 4.2.3-A](<#/doc/jls/jls-04>).

**Tabela 4.2.3-A. Parâmetros de ponto flutuante**

Parameter | `float` | `double`  
---|---|---  
`N` | 24 | 53  
K | 8 | 11  
_E max_ | +127 | +1023  
_E min_ | -126 | -1022  
  
  

Exceto por NaN, os valores de ponto flutuante são _ordenados_. Dispostos do menor para o maior, eles são infinito negativo, valores finitos não nulos negativos, zero negativo e positivo, valores finitos não nulos positivos e infinito positivo.

O IEEE 754 permite múltiplos valores NaN distintos para cada um de seus formatos de ponto flutuante binary32 e binary64. No entanto, a Plataforma Java SE geralmente trata os valores NaN de um determinado tipo de ponto flutuante como se estivessem colapsados em um único valor canônico, e, portanto, esta especificação normalmente se refere a um NaN arbitrário como se fosse um valor canônico.

Sob o IEEE 754, uma operação de ponto flutuante com argumentos não-NaN pode gerar um resultado NaN. O IEEE 754 especifica um conjunto de padrões de bits NaN, mas não exige qual padrão de bits NaN particular é usado para representar um resultado NaN; isso é deixado para a arquitetura de hardware. Um programador pode criar NaNs com diferentes padrões de bits para codificar, por exemplo, informações de diagnóstico retrospectivas. Esses valores NaN podem ser criados com os métodos `Float.intBitsToFloat` e `Double.longBitsToDouble` para `float` e `double`, respectivamente. Inversamente, para inspecionar os padrões de bits dos valores NaN, os métodos `Float.floatToRawIntBits` e `Double.doubleToRawLongBits` podem ser usados para `float` e `double`, respectivamente.

Zero positivo e zero negativo comparam-se como iguais, então o resultado da expressão `0.0==-0.0` é `true` e o resultado de `0.0>-0.0` é false. Outras operações podem distinguir zero positivo e negativo; por exemplo, `1.0/0.0` tem o valor infinito positivo, enquanto o valor de `1.0/-0.0` é infinito negativo.

NaN é _não ordenado_, então:

  * Os operadores de comparação numérica `<`, `<=`, `>`, e `>=` retornam `false` se um ou ambos os operandos forem NaN ([§15.20.1](<#/doc/jls/jls-15>)).

Em particular, `(x<y) == !(x>=y)` será `false` se `x` ou `y` for NaN.

  * O operador de igualdade `==` retorna `false` se qualquer um dos operandos for NaN.

  * O operador de desigualdade `!=` retorna `true` se qualquer um dos operandos for NaN ([§15.21.1](<#/doc/jls/jls-15>)).

Em particular, `x!=x` é `true` se e somente se `x` for NaN.

### 4.2.4. Operações com Ponto Flutuante

A linguagem de programação Java fornece uma série de operadores que atuam sobre valores de ponto flutuante:

  * Os operadores de comparação, que resultam em um valor do tipo `boolean`:

    * Os operadores de comparação numérica `<`, `<=`, `>`, e `>=` ([§15.20.1](<#/doc/jls/jls-15>))

    * Os operadores de igualdade numérica `==` e `!=` ([§15.21.1](<#/doc/jls/jls-15>))

  * Os operadores numéricos, que resultam em um valor do tipo `float` ou `double`:

    * Os operadores unários de mais e menos `+` e `-` ([§15.15.3](<#/doc/jls/jls-15>), [§15.15.4](<#/doc/jls/jls-15>))

    * Os operadores multiplicativos `*`, `/` e `%` ([§15.17](<#/doc/jls/jls-15>))

    * Os operadores aditivos `+` e `-` ([§15.18.2](<#/doc/jls/jls-15>))

    * O operador de incremento `++`, tanto prefixo ([§15.15.1](<#/doc/jls/jls-15>)) quanto postfixo ([§15.14.2](<#/doc/jls/jls-15>))

    * O operador de decremento `--`, tanto prefixo ([§15.15.2](<#/doc/jls/jls-15>)) quanto postfixo ([§15.14.3](<#/doc/jls/jls-15>))

  * O operador condicional `? :` ([§15.25](<#/doc/jls/jls-15>))

  * O operador de cast ([§15.16](<#/doc/jls/jls-15>)), que pode converter de um valor de ponto flutuante para um valor de qualquer tipo numérico especificado

  * O operador de concatenação de strings `+` ([§15.18.1](<#/doc/jls/jls-15>)), que, quando recebe um operando `String` e um operando de ponto flutuante, converterá o operando de ponto flutuante para uma `String` representando seu valor em formato decimal (sem perda de informação), e então produzirá uma `String` recém-criada pela concatenação das duas strings

Outros construtores, métodos e constantes úteis são predefinidos nas classes `Float`, `Double` e `Math`.

Se pelo menos um dos operandos de um operador binário for do tipo de ponto flutuante, então a operação é uma operação de ponto flutuante, mesmo que o outro operando seja integral.

Se pelo menos um dos operandos de um operador numérico for do tipo `double`, então a operação é realizada usando aritmética de ponto flutuante de 64 bits, e o resultado do operador numérico é um valor do tipo `double`. Se o outro operando não for um `double`, ele é primeiro ampliado ([§5.1.5](<#/doc/jls/jls-05>)) para o tipo `double` por promoção numérica ([§5.6](<#/doc/jls/jls-05>)).

Caso contrário, pelo menos um dos operandos é do tipo `float`; a operação é realizada usando aritmética de ponto flutuante de 32 bits, e o resultado do operador numérico é um valor do tipo `float`. Se o outro operando não for um `float`, ele é primeiro ampliado para o tipo `float` por promoção numérica.

A aritmética de ponto flutuante é realizada de acordo com as regras do Padrão IEEE 754, incluindo para overflow e underflow ([§15.4](<#/doc/jls/jls-15>)), com exceção do operador de resto `%` ([§15.17.3](<#/doc/jls/jls-15>)).

Qualquer valor de um tipo de ponto flutuante pode ser convertido (cast) para ou de qualquer tipo numérico. Não há casts entre tipos de ponto flutuante e o tipo `boolean`.

Veja [§4.2.5](<#/doc/jls/jls-04>) para um idioma para converter expressões de ponto flutuante para `boolean`.

Um operador de ponto flutuante pode lançar uma exceção ([§11 (_Exceções_)](<#/doc/jls/jls-11>)) pelos seguintes motivos:

  * Qualquer operador de ponto flutuante pode lançar uma `NullPointerException` se a conversão de unboxing ([§5.1.8](<#/doc/jls/jls-05>)) de uma referência nula for necessária.

  * Os operadores de incremento e decremento `++` ([§15.14.2](<#/doc/jls/jls-15>), [§15.15.1](<#/doc/jls/jls-15>)) e `--` ([§15.14.3](<#/doc/jls/jls-15>), [§15.15.2](<#/doc/jls/jls-15>)) podem lançar uma `OutOfMemoryError` se a conversão de boxing ([§5.1.7](<#/doc/jls/jls-05>)) for necessária e não houver memória suficiente disponível para realizar a conversão.

**Exemplo 4.2.4-1. Operações com Ponto Flutuante**
```java
    class Test {
        public static void main(String[] args) {
            // An example of overflow:
            double d = 1e308;
            System.out.print("overflow produces infinity: ");
            System.out.println(d + "*10==" + d*10);
            // An example of gradual underflow:
            d = 1e-305 * Math.PI;
            System.out.print("gradual underflow: " + d + "\n   ");
            for (int i = 0; i < 4; i++)
                System.out.print(" " + (d /= 100000));
            System.out.println();
            // An example of NaN:
            System.out.print("0.0/0.0 is Not-a-Number: ");
            d = 0.0/0.0;
            System.out.println(d);
            // An example of inexact results and rounding:
            System.out.print("inexact results with float:");
            for (int i = 0; i < 100; i++) {
                float z = 1.0f / i;
                if (z * i != 1.0f)
                    System.out.print(" " + i);
            }
            System.out.println();
            // Another example of inexact results and rounding:
            System.out.print("inexact results with double:");
            for (int i = 0; i < 100; i++) {
                double z = 1.0 / i;
                if (z * i != 1.0)
                    System.out.print(" " + i);
            }
            System.out.println();
            // An example of cast to integer rounding:
            System.out.print("cast to int rounds toward 0: ");
            d = 12345.6;
            System.out.println((int)d + " " + (int)(-d));
        }
    }
    
```

Este programa produz a saída:
```
    overflow produces infinity: 1.0E308*10==Infinity
    gradual underflow: 3.141592653589793E-305
        3.1415926535898E-310 3.141592653E-315 3.142E-320 0.0
    0.0/0.0 is Not-a-Number: NaN
    inexact results with float: 0 41 47 55 61 82 83 94 97
    inexact results with double: 0 49 98
    cast to int rounds toward 0: 12345 -12345
    
```

Este exemplo demonstra, entre outras coisas, que o underflow gradual pode resultar em uma perda gradual de precisão.

Os resultados quando `i` é `0` envolvem divisão por zero, de modo que `z` se torna infinito positivo, e `z * 0` é NaN, que não é igual a `1.0`.

### 4.2.5. O Tipo `boolean` e Valores booleanos

O tipo `boolean` representa uma quantidade lógica com dois valores possíveis, indicados pelos literais `true` e `false` ([§3.10.3](<#/doc/jls/jls-03>)).

Os operadores booleanos são:

  * Os operadores relacionais `==` e `!=` ([§15.21.2](<#/doc/jls/jls-15>))

  * O operador de complemento lógico `!` ([§15.15.6](<#/doc/jls/jls-15>))

  * Os operadores lógicos `&`, `^` e `|` ([§15.22.2](<#/doc/jls/jls-15>))

  * Os operadores condicional-e e condicional-ou `&&` ([§15.23](<#/doc/jls/jls-15>)) e `||` ([§15.24](<#/doc/jls/jls-15>))

  * O operador condicional `? :` ([§15.25](<#/doc/jls/jls-15>))

  * O operador de concatenação de strings `+` ([§15.18.1](<#/doc/jls/jls-15>)), que, quando recebe um operando `String` e um operando `boolean`, converterá o operando `boolean` para uma `String` (seja `"true"` ou `"false"`), e então produzirá uma `String` recém-criada que é a concatenação das duas strings

Expressões booleanas determinam o fluxo de controle em vários tipos de declarações:

  * A declaração `if` ([§14.9](<#/doc/jls/jls-14>))

  * A declaração `while` ([§14.12](<#/doc/jls/jls-14>))

  * A declaração `do` ([§14.13](<#/doc/jls/jls-14>))

  * A declaração `for` ([§14.14](<#/doc/jls/jls-14>))

Uma expressão `boolean` também determina qual subexpressão é avaliada no operador condicional `? :` ([§15.25](<#/doc/jls/jls-15>)).

Apenas expressões `boolean` e `Boolean` podem ser usadas em declarações de fluxo de controle e como o primeiro operando do operador condicional `? :`.

Uma expressão inteira ou de ponto flutuante `x` pode ser convertida para um valor `boolean`, seguindo a convenção da linguagem C de que qualquer valor não zero é `true`, pela expressão `x!=0`.

Uma referência de objeto `obj` pode ser convertida para um valor `boolean`, seguindo a convenção da linguagem C de que qualquer referência diferente de `null` é `true`, pela expressão `obj!=null`.

Um valor `boolean` pode ser convertido para uma `String` por conversão de string ([§5.4](<#/doc/jls/jls-05>)).

Um valor `boolean` pode ser convertido (cast) para o tipo `boolean`, `Boolean` ou `Object` ([§5.5](<#/doc/jls/jls-05>)). Nenhum outro cast no tipo `boolean` é permitido.
## 4.3. Tipos e Valores de Referência

Existem quatro tipos de _tipos de referência_: tipos de classe ([§8.1](<#/doc/jls/jls-08>)), tipos de interface ([§9.1](<#/doc/jls/jls-09>)), variáveis de tipo ([§4.4](<#/doc/jls/jls-04>)) e tipos de array ([§10.1](<#/doc/jls/jls-10>)).

ReferenceType:

[ClassOrInterfaceType](<#/doc/jls/jls-04>)   
[TypeVariable](<#/doc/jls/jls-04>)   
[ArrayType](<#/doc/jls/jls-04>)

ClassOrInterfaceType:

[ClassType](<#/doc/jls/jls-04>)   
[InterfaceType](<#/doc/jls/jls-04>)

ClassType:

{[Annotation](<#/doc/jls/jls-09>)} [TypeIdentifier](<#/doc/jls/jls-03>) [[TypeArguments](<#/doc/jls/jls-04>)]   
[PackageName](<#/doc/jls/jls-06>) `.` {[Annotation](<#/doc/jls/jls-09>)} [TypeIdentifier](<#/doc/jls/jls-03>) [[TypeArguments](<#/doc/jls/jls-04>)]   
[ClassOrInterfaceType](<#/doc/jls/jls-04>) `.` {[Annotation](<#/doc/jls/jls-09>)} [TypeIdentifier](<#/doc/jls/jls-03>) [[TypeArguments](<#/doc/jls/jls-04>)] 

InterfaceType:

[ClassType](<#/doc/jls/jls-04>)

TypeVariable:

{[Annotation](<#/doc/jls/jls-09>)} [TypeIdentifier](<#/doc/jls/jls-03>)

ArrayType:

[PrimitiveType](<#/doc/jls/jls-04>) [Dims](<#/doc/jls/jls-04>)   
[ClassOrInterfaceType](<#/doc/jls/jls-04>) [Dims](<#/doc/jls/jls-04>)   
[TypeVariable](<#/doc/jls/jls-04>) [Dims](<#/doc/jls/jls-04>)

Dims:

{[Annotation](<#/doc/jls/jls-09>)} `[` `]` {{[Annotation](<#/doc/jls/jls-09>)} `[` `]`} 

O código de exemplo:
```
    class Point { int[] metrics; }
    interface Move { void move(int deltax, int deltay); }
    
```

declara um tipo de classe `Point`, um tipo de interface `Move`, e usa um tipo de array `int`[]` (um array de `int`) para declarar o campo `metrics` da classe `Point`. 

Um tipo de classe ou interface consiste em um identificador ou uma sequência de identificadores separados por pontos, onde cada identificador é opcionalmente seguido por argumentos de tipo ([§4.5.1](<#/doc/jls/jls-04>)). Se argumentos de tipo aparecerem em qualquer lugar em um tipo de classe ou interface, ele é um tipo parametrizado ([§4.5](<#/doc/jls/jls-04>)). 

Cada identificador em um tipo de classe ou interface é classificado como um nome de pacote ou um nome de tipo ([§6.5.1](<#/doc/jls/jls-06>)). Identificadores que são classificados como nomes de tipo podem ser anotados. Se um tipo de classe ou interface tiver a forma `T.id` (opcionalmente seguido por argumentos de tipo), então `id` deve ser o nome simples de um tipo de membro acessível de `T` ([§6.6](<#/doc/jls/jls-06>), [§8.5](<#/doc/jls/jls-08>), [§9.5](<#/doc/jls/jls-09>)), ou ocorre um erro em tempo de compilação. O tipo de classe ou interface denota esse tipo de membro. 

### 4.3.1. Objetos 

Um _objeto_ é uma _instância de classe_ ou um _array_. 

Os valores de referência (muitas vezes apenas _referências_) são ponteiros para esses objetos, e uma referência nula especial, que não se refere a nenhum objeto. 

Uma instância de classe é explicitamente criada por uma expressão de criação de instância de classe ([§15.9](<#/doc/jls/jls-15>)). 

Um array é explicitamente criado por uma expressão de criação de array ([§15.10.1](<#/doc/jls/jls-15>)). 

Outras expressões podem criar implicitamente uma instância de classe ([§12.5](<#/doc/jls/jls-12>)) ou um array ([§10.6](<#/doc/jls/jls-10>)). 

**Exemplo 4.3.1-1. Criação de Objeto**
```
    class Point {
        int x, y;
        Point() { System.out.println("default"); }
        Point(int x, int y) { this.x = x; this.y = y; }
    
        /* A Point instance is explicitly created at
           class initialization time: */
        static Point origin = new Point(0,0);
    
        /* A String can be implicitly created
           by a + operator: */
        public String toString() { return "(" + x + "," + y + ")"; }
    }
    
    class Test {
        public static void main(String[] args) {
            /* A Point is explicitly created
               using newInstance: */
            Point p = null;
            try {
                p = (Point)Class.forName("Point").newInstance();
            } catch (Exception e) {
                System.out.println(e);
            }
    
            /* An array is implicitly created
               by an array initializer: */
            Point[] a = { new Point(0,0), new Point(1,1) };
    
            /* Strings are implicitly created
               by + operators: */
            System.out.println("p: " + p);
            System.out.println("a: { " + a[0] + ", " + a[1] + " }");
    
            /* An array is explicitly created
               by an array creation expression: */
            String[] sa = new String[2];
            sa[0] = "he"; sa[1] = "llo";
            System.out.println(sa[0] + sa[1]);
        }
    }
    
    
```

Este programa produz a saída:
```
    default
    p: (0,0)
    a: { (0,0), (1,1) }
    hello
    
```

  

Os operadores em referências a objetos são: 

  * Acesso a campo, usando um nome qualificado ([§6.6](<#/doc/jls/jls-06>)) ou uma expressão de acesso a campo ([§15.11](<#/doc/jls/jls-15>)) 

  * Invocação de método ([§15.12](<#/doc/jls/jls-15>)) 

  * O operador de cast ([§5.5](<#/doc/jls/jls-05>), [§15.16](<#/doc/jls/jls-15>)) 

  * O operador de concatenação de string `+` ([§15.18.1](<#/doc/jls/jls-15>)), que, quando recebe um operando `String` e uma referência, converterá a referência para uma `String` invocando o método `toString` do objeto referenciado (usando `"null"` se a referência ou o resultado de `toString` for uma referência nula), e então produzirá uma `String` recém-criada que é a concatenação das duas strings 

  * O operador `instanceof` ([§15.20.2](<#/doc/jls/jls-15>)) 

  * Os operadores de igualdade de referência `==` e `!=` ([§15.21.3](<#/doc/jls/jls-15>)) 

  * O operador condicional `? :` ([§15.25](<#/doc/jls/jls-15>)). 

Existem muitas referências para o mesmo objeto. A maioria dos objetos possui estado, armazenado nos campos de objetos que são instâncias de classes ou nas variáveis que são os componentes de um objeto array. Se duas variáveis contêm referências para o mesmo objeto, o estado do objeto pode ser modificado usando a referência de uma variável para o objeto, e então o estado alterado pode ser observado através da referência na outra variável. 

**Exemplo 4.3.1-2. Identidade Primitiva e de Referência**
```
    class Value { int val; }
    
    class Test {
        public static void main(String[] args) {
            int i1 = 3;
            int i2 = i1;
            i2 = 4;
            System.out.print("i1==" + i1);
            System.out.println(" but i2==" + i2);
            Value v1 = new Value();
            v1.val = 5;
            Value v2 = v1;
            v2.val = 6;
            System.out.print("v1.val==" + v1.val);
            System.out.println(" and v2.val==" + v2.val);
        }
    }
    
```

Este programa produz a saída:
```
    i1==3 but i2==4
    v1.val==6 and v2.val==6
    
```

porque `v1.val` e `v2.val` referenciam a mesma variável de instância ([§4.12.3](<#/doc/jls/jls-04>)) no único objeto `Value` criado pela única expressão `new`, enquanto `i1` e `i2` são variáveis diferentes. 

  

Cada objeto está associado a um monitor ([§17.1](<#/doc/jls/jls-17>)), que é usado por métodos `synchronized` ([§8.4.3](<#/doc/jls/jls-08>)) e pela instrução `synchronized` ([§14.19](<#/doc/jls/jls-14>)) para fornecer controle sobre o acesso concorrente ao estado por múltiplas threads ([§17 (_Threads and Locks_)](<#/doc/jls/jls-17>)). 

### 4.3.2. A Classe `Object`

A classe `Object` é uma superclasse ([§8.1.4](<#/doc/jls/jls-08>)) de todas as outras classes. 

Todos os tipos de classe e array herdam ([§8.4.8](<#/doc/jls/jls-08>)) os métodos da classe `Object`, que são resumidos da seguinte forma: 

  * O método `clone` é usado para criar uma duplicata de um objeto. 

  * O método `equals` define uma noção de igualdade de objetos, que é baseada na comparação de valor, não de referência. 

  * O método `finalize` é executado pouco antes de um objeto ser destruído ([§12.6](<#/doc/jls/jls-12>)). 

  * O método `getClass` retorna o objeto `Class` que representa a classe do objeto. 

Um objeto `Class` existe para cada tipo de referência. Ele pode ser usado, por exemplo, para descobrir o nome totalmente qualificado de uma classe, seus membros, sua superclasse imediata e quaisquer interfaces que ela implementa. 

O tipo de uma expressão de invocação de método de `getClass` é `Class`<`?` `extends` |T|`>`, onde T é a classe ou interface que foi pesquisada para `getClass` ([§15.12.1](<#/doc/jls/jls-15>)) e |T| denota o apagamento de T ([§4.6](<#/doc/jls/jls-04>)). 

Um método de classe que é declarado `synchronized` ([§8.4.3.6](<#/doc/jls/jls-08>)) sincroniza no monitor associado ao objeto `Class` da classe. 

  * O método `hashCode` é muito útil, juntamente com o método `equals`, em tabelas hash como `java.util.HashMap`. 

  * Os métodos `wait`, `notify` e `notifyAll` são usados em programação concorrente usando threads ([§17.2](<#/doc/jls/jls-17>)). 

  * O método `toString` retorna uma representação `String` do objeto. 

### 4.3.3. A Classe `String`

Instâncias da classe `String` representam sequências de pontos de código Unicode. 

Um objeto `String` possui um valor constante (imutável). 

Literais de string ([§3.10.5](<#/doc/jls/jls-03>)) e blocos de texto ([§3.10.6](<#/doc/jls/jls-03>)) são referências a instâncias da classe `String`. 

O operador de concatenação de string `+` ([§15.18.1](<#/doc/jls/jls-15>)) cria implicitamente um novo objeto `String` quando o resultado não é uma expressão constante ([§15.29](<#/doc/jls/jls-15>)). 

### 4.3.4. Quando Tipos de Referência São Iguais 

Dois tipos de referência são do _mesmo tipo em tempo de compilação_ se forem declarados em unidades de compilação associadas ao mesmo módulo ([§7.3](<#/doc/jls/jls-07>)), e tiverem o mesmo nome binário ([§13.1](<#/doc/jls/jls-13>)), e seus argumentos de tipo, se houver, forem os mesmos, aplicando esta definição recursivamente. 

Quando dois tipos de referência são os mesmos, às vezes são chamados de _mesma classe_ ou _mesma interface_. 

Em tempo de execução, vários tipos de referência com o mesmo nome binário podem ser carregados simultaneamente por diferentes class loaders. Esses tipos podem ou não representar a mesma declaração de tipo. Mesmo que dois desses tipos representem a mesma declaração de tipo, eles são considerados distintos. 

Dois tipos de referência são do _mesmo tipo em tempo de execução_ se: 

  * Ambos são tipos de classe ou ambos são tipos de interface, são definidos pelo mesmo class loader e têm o mesmo nome binário ([§13.1](<#/doc/jls/jls-13>)), caso em que às vezes são chamados de _mesma classe em tempo de execução_ ou _mesma interface em tempo de execução_. 

  * Ambos são tipos de array, e seus tipos de componente são do mesmo tipo em tempo de execução ([§10 (_Arrays_)](<#/doc/jls/jls-10>)). 

## 4.4. Variáveis de Tipo 

Uma _variável de tipo_ é um identificador não qualificado usado como um tipo em corpos de classes, interfaces, métodos e construtores. 

Uma variável de tipo é introduzida pela declaração de um _parâmetro de tipo_ de uma classe, interface, método ou construtor genérico ([§8.1.2](<#/doc/jls/jls-08>), [§9.1.2](<#/doc/jls/jls-09>), [§8.4.4](<#/doc/jls/jls-08>), [§8.8.4](<#/doc/jls/jls-08>)). 

TypeParameter:

{[TypeParameterModifier](<#/doc/jls/jls-04>)} [TypeIdentifier](<#/doc/jls/jls-03>) [[TypeBound](<#/doc/jls/jls-04>)] 

TypeParameterModifier:

[Annotation](<#/doc/jls/jls-09>)

TypeBound:

`extends` [TypeVariable](<#/doc/jls/jls-04>)   
`extends` [ClassOrInterfaceType](<#/doc/jls/jls-04>) {[AdditionalBound](<#/doc/jls/jls-04>)} 

AdditionalBound:

`&` [InterfaceType](<#/doc/jls/jls-04>)

O escopo de uma variável de tipo declarada como um parâmetro de tipo é especificado em [§6.3](<#/doc/jls/jls-06>). 

Toda variável de tipo declarada como um parâmetro de tipo possui um _limite_. Se nenhum limite for declarado para uma variável de tipo, `Object` é assumido. Se um limite for declarado, ele consiste em: 

  * uma única variável de tipo T, ou 

  * um tipo de classe ou interface T possivelmente seguido por tipos de interface I1 `&` ... `&` In. 

É um erro em tempo de compilação se qualquer um dos tipos I1, ..., In for um tipo de classe ou variável de tipo. 

Os apagamentos ([§4.6](<#/doc/jls/jls-04>)) de todos os tipos constituintes de um limite devem ser diferentes em pares, ou ocorre um erro em tempo de compilação. 

Uma variável de tipo não deve ser, ao mesmo tempo, um subtipo de dois tipos de interface que são parametrizações diferentes da mesma interface genérica, ou ocorre um erro em tempo de compilação. 

A ordem dos tipos em um limite é significativa apenas porque o apagamento de uma variável de tipo é determinado pelo primeiro tipo em seu limite, e que um tipo de classe ou variável de tipo só pode aparecer na primeira posição. 

Os membros de uma variável de tipo X com limite T `&` I1 `&` ... `&` In são os membros do tipo de interseção ([§4.9](<#/doc/jls/jls-04>)) T `&` I1 `&` ... `&` In aparecendo no ponto onde a variável de tipo é declarada. 

**Exemplo 4.4-1. Membros de uma Variável de Tipo**
```
    package TypeVarMembers;
    
    class C {
        public    void mCPublic()    {}
        protected void mCProtected() {}
                  void mCPackage()   {}
        private   void mCPrivate()   {}
    }
    
    interface I {
        void mI();
    }
    
    class CT extends C implements I {
        public void mI() {}
    }
    
    class Test {
        <T extends C & I> void test(T t) {
            t.mI();           // OK
            t.mCPublic();     // OK
            t.mCProtected();  // OK
            t.mCPackage();    // OK
            t.mCPrivate();    // Compile-time error
        }
    }
    
```

A variável de tipo `T` possui os mesmos membros que o tipo de interseção `C & I`, que por sua vez possui os mesmos membros que a classe vazia `CT`, definida no mesmo escopo com supertipos equivalentes. Os membros de uma interface são sempre `public`, e portanto sempre herdados (a menos que sobrescritos). Assim, `mI` é um membro de `CT` e de `T`. Entre os membros de `C`, todos, exceto `mCPrivate`, são herdados por `CT`, e são, portanto, membros tanto de `CT` quanto de `T`. 

Se `C` tivesse sido declarada em um pacote diferente de `T`, então a chamada para `mCPackage` resultaria em um erro em tempo de compilação, pois esse membro não seria acessível no ponto onde `T` é declarada. 

  

## 4.5. Tipos Parametrizados 

Uma classe ou interface que é genérica ([§8.1.2](<#/doc/jls/jls-08>), [§9.1.2](<#/doc/jls/jls-09>)) define um conjunto de _tipos parametrizados_. 

Um tipo parametrizado é um tipo de classe ou interface na forma C`<`T1,...,Tn`>`, onde C é o nome de uma classe ou interface genérica, e `<`T1,...,Tn`>` é uma lista de argumentos de tipo que denotam uma _parametrização_ particular da classe ou interface genérica. 

Uma classe ou interface genérica possui parâmetros de tipo F1,...,Fn com limites correspondentes B1,...,Bn. Cada argumento de tipo Ti de um tipo parametrizado abrange todos os tipos que são subtipos de todos os tipos listados no limite correspondente. Ou seja, para cada tipo de limite S em Bi, Ti é um subtipo de S`[F1:=T1,...,Fn:=Tn]` ([§4.10](<#/doc/jls/jls-04>)). 

Um tipo parametrizado C`<`T1,...,Tn`>` é _bem-formado_ se todas as seguintes condições forem verdadeiras: 

  * C é o nome de uma classe ou interface genérica. 

  * O número de argumentos de tipo é o mesmo que o número de parâmetros de tipo na declaração genérica de C. 

  * Quando submetido à conversão de captura ([§5.1.10](<#/doc/jls/jls-05>)) resultando no tipo C`<`X1,...,Xn`>`, cada argumento de tipo Xi é um subtipo de S`[F1:=X1,...,Fn:=Xn]` para cada tipo de limite S em Bi. 

É um erro em tempo de compilação se um tipo parametrizado não for bem-formado. 

Nesta especificação, sempre que falamos de um tipo de classe ou interface, incluímos também os tipos parametrizados, a menos que explicitamente excluídos. 

Dois tipos parametrizados são _comprovadamente distintos_ se uma das seguintes condições for verdadeira: 

  * São parametrizações de declarações de tipo genéricas distintas. 

  * Qualquer um de seus argumentos de tipo é comprovadamente distinto. 

Dadas as classes genéricas nos exemplos de [§8.1.2](<#/doc/jls/jls-08>), aqui estão alguns tipos parametrizados bem-formados: 

  * `Seq<String>`

  * `Seq<Seq<String>>`

  * `Seq<String>.Zipper<Integer>`

  * `Pair<String,Integer>`

Aqui estão algumas parametrizações incorretas dessas classes genéricas: 

  * `Seq<int>` é ilegal, pois tipos primitivos não podem ser argumentos de tipo. 

  * `Pair<String>` é ilegal, pois não há argumentos de tipo suficientes. 

  * `Pair<String,String,String>` é ilegal, pois há muitos argumentos de tipo. 

Um tipo parametrizado pode ser uma parametrização de uma classe ou interface genérica aninhada. Por exemplo, se uma classe não genérica C tiver uma classe membro genérica D com um parâmetro de tipo, então C`.`D`<`Object`>` é um tipo parametrizado. Enquanto isso, se uma classe genérica C com um parâmetro de tipo tiver uma classe membro não genérica D, então o tipo da classe membro C`<`String`>`.`D é um tipo parametrizado, mesmo que a classe D não seja genérica. 

### 4.5.1. Argumentos de Tipo de Tipos Parametrizados 

Argumentos de tipo podem ser tipos de referência ou wildcards. Wildcards são úteis em situações onde apenas conhecimento parcial sobre o parâmetro de tipo é necessário. 

TypeArguments:

`<` [TypeArgumentList](<#/doc/jls/jls-04>) `>`

TypeArgumentList:

[TypeArgument](<#/doc/jls/jls-04>) {`,` [TypeArgument](<#/doc/jls/jls-04>)} 

TypeArgument:

[ReferenceType](<#/doc/jls/jls-04>)   
[Wildcard](<#/doc/jls/jls-04>)

Wildcard:

{[Annotation](<#/doc/jls/jls-09>)} `?` [[WildcardBounds](<#/doc/jls/jls-04>)] 

WildcardBounds:

`extends` [ReferenceType](<#/doc/jls/jls-04>)   
`super` [ReferenceType](<#/doc/jls/jls-04>)

Wildcards podem receber limites explícitos, assim como declarações de variáveis de tipo regulares. Um limite superior é indicado pela seguinte sintaxe, onde B é o limite: 
```
    ? extends B
```

Ao contrário das variáveis de tipo comuns declaradas em uma assinatura de método, nenhuma inferência de tipo é necessária ao usar um wildcard. Consequentemente, é permitido declarar limites inferiores em um wildcard, usando a seguinte sintaxe, onde B é um limite inferior: 
```
    ? super B
```

O wildcard `?` `extends` `Object` é equivalente ao wildcard ilimitado `?`. 

Dois argumentos de tipo são _comprovadamente distintos_ se uma das seguintes condições for verdadeira: 

  * Nenhum dos argumentos é uma variável de tipo ou wildcard, e os dois argumentos não são do mesmo tipo. 

  * Um argumento de tipo é uma variável de tipo ou wildcard, com um limite (se for uma variável de tipo) ou um limite superior (se for um wildcard, usando conversão de captura ([§5.1.10](<#/doc/jls/jls-05>)), se necessário) de S; e o outro argumento de tipo T não é uma variável de tipo ou wildcard; e nem |S| `<:` |T| nem |T| `<:` |S| ([§4.8](<#/doc/jls/jls-04>), [§4.10](<#/doc/jls/jls-04>)). 

  * Cada argumento de tipo é uma variável de tipo ou wildcard, com limites superiores (da conversão de captura, se necessário) de S e T; e nem |S| `<:` |T| nem |T| `<:` |S|. 

Um argumento de tipo T1 é dito _conter_ outro argumento de tipo T2, escrito T2 `<=` T1, se o conjunto de tipos denotados por T2 for comprovadamente um subconjunto do conjunto de tipos denotados por T1 sob o fechamento reflexivo e transitivo das seguintes regras (onde `<:` denota subtipagem ([§4.10](<#/doc/jls/jls-04>))): 

  * `?` `extends` T `<=` `?` `extends` S se T `<:` S

  * `?` `extends` T `<=` `?`

  * `?` `super` T `<=` `?` `super` S se S `<:` T

  * `?` `super` T `<=` `?`

  * `?` `super` T `<=` `?` `extends` `Object`

  * T `<=` T

  * T `<=` `?` `extends` T

  * T `<=` `?` `super` T

A relação dos wildcards com a teoria de tipos estabelecida é interessante, e a ela aludimos brevemente aqui. Wildcards são uma forma restrita de tipos existenciais. Dada uma declaração de tipo genérico G`<`T `extends` B`>`, G`<`?`>` é aproximadamente análogo a Some X `<:` B. G`<`X`>`. 

Historicamente, wildcards são um descendente direto do trabalho de Atsushi Igarashi e Mirko Viroli. Leitores interessados em uma discussão mais abrangente devem consultar _On Variance-Based Subtyping for Parametric Types_ de Atsushi Igarashi e Mirko Viroli, nos _Proceedings of the 16th European Conference on Object Oriented Programming (ECOOP 2002)_. Este trabalho, por sua vez, baseia-se em trabalhos anteriores de Kresten Thorup e Mads Torgersen (_Unifying Genericity_ , ECOOP 99), bem como em uma longa tradição de trabalho sobre variância baseada em declaração que remonta ao trabalho de Pierre America sobre POOL (OOPSLA 89). 

Wildcards diferem em certos detalhes das construções descritas no artigo mencionado, em particular no uso da conversão de captura ([§5.1.10](<#/doc/jls/jls-05>)) em vez da operação `close` descrita por Igarashi e Viroli. Para uma descrição formal de wildcards, veja _Wild FJ_ de Mads Torgersen, Erik Ernst e Christian Plesner Hansen, no 12º workshop sobre Fundamentos de Programação Orientada a Objetos (FOOL 2005). 

**Exemplo 4.5.1-1. Wildcards Ilimitados**
```
    import java.util.ArrayList;
    import java.util.Collection;
    
    class Test {
        static void printCollection(Collection<?> c) {
                                    // a wildcard collection
            for (Object o : c) {
                System.out.println(o);
            }
        }
    
        public static void main(String[] args) {
            Collection<String> cs = new ArrayList<String>();
            cs.add("hello");
            cs.add("world");
            printCollection(cs);
        }
    }
    
    
```

Note que usar `Collection<Object>` como o tipo do parâmetro de entrada, `c`, não seria tão útil; o método só poderia ser usado com uma expressão de argumento que tivesse o tipo `Collection<Object>`, o que seria bastante raro. Em contraste, o uso de um wildcard ilimitado permite que qualquer tipo de coleção seja passado como argumento. 

Aqui está um exemplo onde o tipo de elemento de um array é parametrizado por um wildcard: 
```
    
    public Method getMethod(Class<?>[] parameterTypes) { ... }
    
    
```

  

**Exemplo 4.5.1-2. Wildcards Delimitados**
```
    boolean addAll(Collection<? extends E> c)
```

Aqui, o método é declarado dentro da interface `Collection<E>`, e é projetado para adicionar todos os elementos de seu argumento de entrada à coleção na qual é invocado. Uma tendência natural seria usar `Collection<E>` como o tipo de `c`, mas isso é desnecessariamente restritivo. Uma alternativa seria declarar o próprio método como genérico: 
```
    <T> boolean addAll(Collection<T> c)
```

Esta versão é suficientemente flexível, mas note que o parâmetro de tipo é usado apenas uma vez na assinatura. Isso reflete o fato de que o parâmetro de tipo não está sendo usado para expressar qualquer tipo de interdependência entre o(s) tipo(s) do(s) argumento(s), o tipo de retorno e/ou o tipo de exceção. Na ausência de tal interdependência, métodos genéricos são considerados um estilo ruim, e wildcards são preferidos. 
```
    Reference(T referent, ReferenceQueue<? super T> queue)
```

Aqui, o referente pode ser inserido em qualquer fila cujo tipo de elemento seja um supertipo do tipo `T` do referente; `T` é o limite inferior para o wildcard. 

  

### 4.5.2. Membros e Construtores de Tipos Parametrizados 

Seja C uma classe ou interface genérica com parâmetros de tipo A1,...,An, e seja C`<`T1,...,Tn`>` uma parametrização de C onde, para 1 ≤ _i_ ≤ _n_ , Ti é um tipo (em vez de um wildcard). Então: 

  * Seja `m` uma declaração de membro ou construtor em C, cujo tipo declarado é T ([§8.2](<#/doc/jls/jls-08>), [§8.8.6](<#/doc/jls/jls-08>)). 

O tipo de `m` em C`<`T1,...,Tn`>` é T`[A1:=T1,...,An:=Tn]`. 

  * Seja `m` uma declaração de membro ou construtor em D, onde D é uma classe estendida por C ou uma interface implementada por C. Seja D`<`U1,...,Uk`>` o supertipo ([§4.10.2](<#/doc/jls/jls-04>)) de C`<`T1,...,Tn`>` que corresponde a D. 

O tipo de `m` em C`<`T1,...,Tn`>` é o tipo de `m` em D`<`U1,...,Uk`>`. 

Se qualquer um dos argumentos de tipo na parametrização de C forem wildcards, então: 

  * Os tipos dos campos, métodos e construtores em C`<`T1,...,Tn`>` são os tipos dos campos, métodos e construtores na conversão de captura de C`<`T1,...,Tn`>` ([§5.1.10](<#/doc/jls/jls-05>)). 

  * Seja D uma declaração de classe ou interface (possivelmente genérica) em C. Então o tipo de D em C`<`T1,...,Tn`>` é D onde, se D for genérica, todos os argumentos de tipo são wildcards ilimitados. 

Isso não tem consequências, pois é impossível acessar um membro de um tipo parametrizado sem realizar a conversão de captura, e é impossível usar um wildcard após a palavra-chave `new` em uma expressão de criação de instância de classe ([§15.9](<#/doc/jls/jls-15>)). 

A única exceção ao parágrafo anterior é quando um tipo parametrizado aninhado é usado como expressão em um operador `instanceof` ([§15.20.2](<#/doc/jls/jls-15>)), onde a conversão de captura não é aplicada. 

Um membro `static` que é declarado em uma classe ou interface genérica deve ser referenciado usando o nome da classe ou interface genérica ([§6.1](<#/doc/jls/jls-06>), [§6.5.5.2](<#/doc/jls/jls-06>), [§6.5.6.2](<#/doc/jls/jls-06>)), ou ocorre um erro em tempo de compilação. 

Em outras palavras, é ilegal referenciar um membro `static` declarado em uma declaração de tipo genérico usando um tipo parametrizado. 

## 4.6. Type Erasure

Type erasure é um mapeamento de tipos (possivelmente incluindo tipos parametrizados e variáveis de tipo) para tipos (que nunca são tipos parametrizados ou variáveis de tipo). Escrevemos |T| para a erasure do tipo T. O mapeamento de erasure é definido da seguinte forma:

*   A erasure de um tipo parametrizado ([§4.5](<#/doc/jls/jls-04>)) G`<`T1,...,Tn`>` é |G|.
*   A erasure de um tipo aninhado T`.`C é |T|.C.
*   A erasure de um tipo array T`[]` é |T|`[]`.
*   A erasure de uma variável de tipo ([§4.4](<#/doc/jls/jls-04>)) é a erasure de seu limite mais à esquerda.
*   A erasure de qualquer outro tipo é o próprio tipo.

Type erasure também mapeia a assinatura ([§8.4.2](<#/doc/jls/jls-08>)) de um construtor ou método para uma assinatura que não possui tipos parametrizados ou variáveis de tipo. A erasure de uma assinatura de construtor ou método s é uma assinatura que consiste no mesmo nome que s e nas erasures de todos os tipos de parâmetros formais dados em s.

O tipo de retorno de um método ([§8.4.5](<#/doc/jls/jls-08>)) e os parâmetros de tipo de um método ou construtor genérico ([§8.4.4](<#/doc/jls/jls-08>), [§8.8.4](<#/doc/jls/jls-08>)) também sofrem erasure se a assinatura do método ou construtor for apagada.

A erasure da assinatura de um método genérico não possui parâmetros de tipo.

## 4.7. Reifiable Types

Como algumas informações de tipo são apagadas durante a compilação, nem todos os tipos estão disponíveis em tempo de execução. Tipos que estão completamente disponíveis em tempo de execução são conhecidos como _tipos reificáveis_.

Um tipo é _reificável_ se e somente se uma das seguintes condições for verdadeira:

*   Ele se refere a uma declaração de tipo de classe ou interface não genérica.
*   É um tipo parametrizado no qual todos os argumentos de tipo são wildcards ilimitados ([§4.5.1](<#/doc/jls/jls-04>)).
*   É um raw type ([§4.8](<#/doc/jls/jls-04>)).
*   É um tipo primitivo ([§4.2](<#/doc/jls/jls-04>)).
*   É um tipo array ([§10.1](<#/doc/jls/jls-10>)) cujo tipo de elemento é reificável.
*   É um tipo aninhado onde, para cada tipo T separado por um "`.`", o próprio T é reificável.

Por exemplo, se uma classe genérica X`<`T`>` possui uma classe membro genérica Y`<`U`>`, então o tipo X`<`?`>`.`Y`<`?`>` é reificável porque X`<`?`>` é reificável e Y`<`?`>` é reificável. O tipo X`<`?`>`.`Y`<`Object`>` não é reificável porque Y`<`Object`>` não é reificável.

Um intersection type não é reificável.

A decisão de não tornar todos os tipos genéricos reificáveis é uma das decisões de design mais cruciais e controversas envolvendo o sistema de tipos da linguagem de programação Java.

Em última análise, a motivação mais importante para esta decisão é a compatibilidade com o código existente. Em um sentido ingênuo, a adição de novas construções como generics não tem implicações para o código pré-existente. A linguagem de programação Java, por si só, é compatível com versões anteriores, desde que cada programa escrito nas versões anteriores mantenha seu significado na nova versão. No entanto, esta noção, que pode ser chamada de compatibilidade de linguagem, é de interesse puramente teórico. Programas reais (mesmo os triviais, como "Hello World") são compostos por várias unidades de compilação, algumas das quais são fornecidas pela Plataforma Java SE (como elementos de `java.lang` ou `java.util`). Na prática, então, o requisito mínimo é a compatibilidade de plataforma - que qualquer programa escrito para a versão anterior da Plataforma Java SE continue a funcionar inalterado na nova versão.

Uma maneira de fornecer compatibilidade de plataforma é deixar a funcionalidade da plataforma existente inalterada, apenas adicionando novas funcionalidades. Por exemplo, em vez de modificar a hierarquia de Collections existente em `java.util`, pode-se introduzir uma nova biblioteca utilizando generics.

As desvantagens de tal esquema são que é extremamente difícil para clientes pré-existentes da biblioteca Collection migrarem para a nova biblioteca. Collections são usadas para trocar dados entre módulos desenvolvidos independentemente; se um fornecedor decide mudar para a nova biblioteca genérica, esse fornecedor também deve distribuir duas versões de seu código, para ser compatível com seus clientes. Bibliotecas que dependem do código de outros fornecedores não podem ser modificadas para usar generics até que a biblioteca do fornecedor seja atualizada. Se dois módulos são mutuamente dependentes, as mudanças devem ser feitas simultaneamente.

Claramente, a compatibilidade de plataforma, conforme descrito acima, não oferece um caminho realista para a adoção de um novo recurso abrangente como generics. Portanto, o design do sistema de tipos genéricos busca suportar a compatibilidade de migração. A compatibilidade de migração permite a evolução do código existente para tirar proveito de generics sem impor dependências entre módulos de software desenvolvidos independentemente.

O preço da compatibilidade de migração é que uma reificação completa e sólida do sistema de tipos genéricos não é possível, pelo menos enquanto a migração está ocorrendo.

## 4.8. Raw Types

Para facilitar a interface com código legado não genérico, é possível usar como tipo a erasure ([§4.6](<#/doc/jls/jls-04>)) de um tipo parametrizado ([§4.5](<#/doc/jls/jls-04>)) ou a erasure de um tipo array ([§10.1](<#/doc/jls/jls-10>)) cujo tipo de elemento é um tipo parametrizado. Tal tipo é chamado de _raw type_.

Mais precisamente, um raw type é definido como um dos seguintes:

*   O tipo de referência que é formado ao se tomar o nome de uma declaração de classe ou interface genérica sem uma lista de argumentos de tipo acompanhante.
*   Um tipo array cujo tipo de elemento é um raw type.
*   O nome de uma classe membro interna de um raw type R que não é herdada de uma superclasse ou superinterface de R.

O tipo de uma classe ou interface não genérica não é um raw type.

Para entender por que o nome de uma classe membro interna de um raw type é considerado raw, considere o seguinte exemplo:
```java
    class Outer<T>{
        T t;
        class Inner {
            T setOuterT(T t1) { t = t1; return t; }
        }
    }
    
```

O tipo do(s) membro(s) de `Inner` depende do parâmetro de tipo de `Outer`. Se `Outer` é raw, `Inner` também deve ser tratado como raw, pois não há uma ligação válida para `T`.

Esta regra se aplica apenas a classes membro internas que não são herdadas. Classes membro internas herdadas que dependem de variáveis de tipo serão herdadas como raw types como consequência da regra de que os supertipos de um raw type são apagados, descrita mais adiante nesta seção.

Outra implicação das regras acima é que uma classe interna genérica de um raw type pode ser usada apenas como um raw type:
```java
    class Outer<T>{
        class Inner<S> {
            S s;
        }
    }
    
```

Não é possível acessar `Inner` como um tipo parcialmente raw (um tipo "raro"):
```java
    Outer.Inner<Double> x = null;  // illegal
    Double d = x.s;
    
```

porque `Outer` em si é raw, assim como todas as suas classes internas, incluindo `Inner`, e, portanto, não é possível passar quaisquer argumentos de tipo para Inner.

Os tipos de superclasse (respectivamente, tipos de superinterface) de um raw type são as erasures dos tipos de superclasse (tipos de superinterface) da classe ou interface nomeada.

O tipo de um construtor ([§8.8](<#/doc/jls/jls-08>)), método de instância ([§8.4](<#/doc/jls/jls-08>), [§9.4](<#/doc/jls/jls-09>)), ou campo não-`static` ([§8.3](<#/doc/jls/jls-08>)) de um raw type C que não é herdado de suas superclasses ou superinterfaces é a erasure de seu tipo na classe ou interface genérica C.

O tipo de um método de instância herdado ou campo não-`static` de um raw type C, onde o membro foi declarado em uma classe ou interface D, é o tipo do membro no supertipo de C que nomeia D.

O tipo de um método `static` ou campo `static` de um raw type C é o mesmo que seu tipo na classe ou interface genérica C.

É um erro em tempo de compilação passar argumentos de tipo para uma classe ou interface membro não-`static` de um raw type que não é herdada de suas superclasses ou superinterfaces.

É um erro em tempo de compilação tentar usar uma classe ou interface membro de um tipo parametrizado como um raw type.

Isso significa que a proibição de tipos "raros" se estende ao caso em que o tipo qualificador é parametrizado, mas tentamos usar a classe interna como um raw type:
```java
    Outer<Integer>.Inner x = null; // illegal
    
```

Este é o oposto do caso discutido acima. Não há justificativa prática para este tipo mal-acabado. Em código legado, nenhum argumento de tipo é usado. Em código não legado, devemos usar os tipos genéricos corretamente e passar todos os argumentos de tipo necessários.

O uso de raw types é permitido apenas como uma concessão à compatibilidade de código legado. O uso de raw types em código escrito após a introdução de generics na linguagem de programação Java é fortemente desencorajado. É possível que futuras versões da linguagem de programação Java proíbam o uso de raw types.

Para garantir que potenciais violações das regras de tipagem sejam sempre sinalizadas, alguns acessos a membros de um raw type resultarão em avisos de compilação não verificados (unchecked warnings). As regras para avisos de compilação não verificados ao acessar membros ou construtores de raw types são as seguintes:

*   Em uma atribuição a um campo: se o tipo do _Primary_ na expressão de acesso ao campo ([§15.11](<#/doc/jls/jls-15>)) é um raw type, então um aviso de compilação não verificado ocorre se a erasure alterar o tipo do campo.
*   Em uma invocação de um método ou construtor: se o tipo da classe ou interface a ser pesquisada ([§15.12.1](<#/doc/jls/jls-15>)) é um raw type, então um aviso de compilação não verificado ocorre se a erasure alterar qualquer um dos tipos de parâmetros formais do método ou construtor.
*   Nenhum aviso de compilação não verificado ocorre para uma chamada de método quando os tipos de parâmetros formais não mudam sob erasure (mesmo que o tipo de retorno e/ou a cláusula `throws` mudem), para leitura de um campo, ou para a criação de uma instância de classe de um raw type.

Note que os avisos não verificados acima são distintos dos avisos não verificados possíveis de narrowing reference conversion ([§5.1.6](<#/doc/jls/jls-05>)), unchecked conversion ([§5.1.9](<#/doc/jls/jls-05>)), declarações de método ([§8.4.1](<#/doc/jls/jls-08>), [§8.4.8.3](<#/doc/jls/jls-08>)), e certas expressões ([§15.12.4.2](<#/doc/jls/jls-15>), [§15.13.2](<#/doc/jls/jls-15>), [§15.27.3](<#/doc/jls/jls-15>)).

Os avisos aqui cobrem o caso em que um consumidor legado usa uma biblioteca generificada. Por exemplo, a biblioteca declara uma classe genérica `Foo<T extends String>` que possui um campo `f` do tipo `Vector<T>`, mas o consumidor atribui um vetor de inteiros a `e`.`f` onde `e` tem o raw type `Foo`. O consumidor legado recebe um aviso porque pode ter causado heap pollution ([§4.12.2](<#/doc/jls/jls-04>)) para consumidores generificados da biblioteca generificada.

(Note que o consumidor legado pode atribuir um `Vector<String>` da biblioteca à sua própria variável `Vector` sem receber um aviso. Ou seja, as regras de subtyping ([§4.10.2](<#/doc/jls/jls-04>)) da linguagem de programação Java tornam possível que uma variável de um raw type receba um valor de qualquer uma das instâncias parametrizadas do tipo.)

Os avisos de unchecked conversion cobrem o caso dual, onde um consumidor generificado usa uma biblioteca legada. Por exemplo, um método da biblioteca tem o tipo de retorno raw `Vector`, mas o consumidor atribui o resultado da invocação do método a uma variável do tipo `Vector<String>`. Isso é inseguro, já que o vetor raw pode ter tido um tipo de elemento diferente de `String`, mas ainda é permitido usando unchecked conversion para possibilitar a interface com código legado. O aviso de unchecked conversion indica que o consumidor generificado pode experimentar problemas de heap pollution em outros pontos do programa.

**Exemplo 4.8-1. Raw Types**
```java
    class Cell<E> {
        E value;
    
        Cell(E v)     { value = v; }
        E get()       { return value; }
        void set(E v) { value = v; }
    
        public static void main(String[] args) {
            Cell x = new Cell<String>("abc");
            System.out.println(x.value);  // OK, has type Object
            System.out.println(x.get());  // OK, has type Object
            x.set("def");                 // unchecked warning
        }
    }
    
```

**Exemplo 4.8-2. Raw Types e Herança**
```java
    import java.util.ArrayList;
    import java.util.Collection;
    import java.util.Iterator;
    
    class NonGeneric {
        Collection<Number> myNumbers() { return null; }
    }
    
    abstract class RawMembers<T> extends NonGeneric
                                 implements Collection<String> {
        static Collection<NonGeneric> cng =
            new ArrayList<NonGeneric>();
    
        public static void main(String[] args) {
            RawMembers rw = null;
    
            Collection<Number> cn = rw.myNumbers();
                                     // OK
    
            Iterator<String> is   = rw.iterator();
                                     // Unchecked warning
    
            Collection<NonGeneric> cnn = rw.cng;
                                          // OK, static member
        }
    }
    
    
```

Neste programa (que não se destina a ser executado), `RawMembers<T>` herda o método:
```java
    Iterator<String> iterator()
    
```

da superinterface `Collection<String>`. O raw type `RawMembers` herda `iterator()` de `Collection`, a erasure de `Collection<String>`, o que significa que o tipo de retorno de `iterator()` em `RawMembers` é `Iterator`. Como resultado, a tentativa de atribuir `rw.iterator()` a `Iterator<String>` requer uma unchecked conversion, então um aviso de compilação não verificado é emitido.

Em contraste, `RawMembers` herda `myNumbers()` da classe `NonGeneric` cuja erasure também é `NonGeneric`. Assim, o tipo de retorno de `myNumbers()` em `RawMembers` não é apagado, e a tentativa de atribuir `rw.myNumbers()` a `Collection<Number>` não requer unchecked conversion, então nenhum aviso de compilação não verificado é emitido.

Similarmente, o membro `static` `cng` mantém seu tipo parametrizado mesmo quando acessado através de um objeto de raw type. Note que o acesso a um membro `static` através de uma instância é considerado um estilo ruim e é desencorajado.

Este exemplo revela que certos membros de um raw type não são apagados, a saber, membros `static` cujos tipos são parametrizados, e membros herdados de um supertipo não genérico.

Raw types estão intimamente relacionados a wildcards. Ambos são baseados em tipos existenciais. Raw types podem ser pensados como wildcards cujas regras de tipo são deliberadamente inconsistentes, para acomodar a interação com código legado. Historicamente, raw types precederam wildcards; eles foram introduzidos pela primeira vez em GJ, e descritos no artigo _Making the future safe for the past: Adding Genericity to the Java Programming Language_ por Gilad Bracha, Martin Odersky, David Stoutamire e Philip Wadler, em _Proceedings of the ACM Conference on Object-Oriented Programming, Systems, Languages and Applications (OOPSLA 98)_ , Outubro de 1998.

## 4.9. Intersection Types

Um intersection type assume a forma T1 `&` ... `&` Tn (_n_ > 0), onde Ti (1 ≤ _i_ ≤ _n_) são tipos.

Intersection types podem ser derivados de limites de parâmetros de tipo ([§4.4](<#/doc/jls/jls-04>)) e expressões de cast ([§15.16](<#/doc/jls/jls-15>)); eles também surgem nos processos de capture conversion ([§5.1.10](<#/doc/jls/jls-05>)) e cálculo do least upper bound ([§4.10.4](<#/doc/jls/jls-04>)).

Os valores de um intersection type são aqueles objetos que são valores de todos os tipos Ti para 1 ≤ _i_ ≤ _n_.

Todo intersection type T1 `&` ... `&` Tn _induz_ uma classe ou interface nocional com o propósito de identificar os membros do intersection type, da seguinte forma:

*   Para cada Ti (1 ≤ _i_ ≤ _n_), seja Ci a classe ou tipo array mais específico tal que Ti `<:` Ci. Então deve haver algum Ck tal que Ck `<:` Ci para qualquer _i_ (1 ≤ _i_ ≤ _n_), ou um erro em tempo de compilação ocorre.
*   Para 1 ≤ _j_ ≤ _n_ , se Tj é uma variável de tipo, então seja Tj' uma interface cujos membros são os mesmos que os membros `public` de Tj; caso contrário, se Tj é uma interface, então seja Tj' Tj.
*   Se Ck é `Object`, uma interface nocional é induzida; caso contrário, uma classe nocional é induzida com o tipo de superclasse direta Ck. Esta classe ou interface possui tipos de superinterface diretos T1', ..., Tn' e é declarada no package em que o intersection type aparece.

Os membros de um intersection type são os membros da classe ou interface que ele induz.

Vale a pena aprofundar na distinção entre intersection types e os limites de variáveis de tipo. Todo limite de variável de tipo induz um intersection type. Este intersection type é frequentemente trivial, consistindo de um único tipo. A forma de um limite é restrita (apenas o primeiro elemento pode ser uma classe ou variável de tipo, e apenas uma variável de tipo pode aparecer no limite) para evitar que certas situações incômodas surjam. No entanto, capture conversion pode levar à criação de variáveis de tipo cujos limites são mais gerais, como tipos array).
## 4.10. Subtipagem

As relações de subtipo e supertipo são relações binárias em tipos.

Os _supertipos_ de um tipo são obtidos pelo fechamento reflexivo e transitivo sobre a relação de supertipo direto, escrita S `>1` T, que é definida por regras apresentadas posteriormente nesta seção. Escrevemos S `:>` T para indicar que a relação de supertipo se mantém entre S e T.

S é um _supertipo próprio_ de T, escrito S `>` T, se S `:>` T e S ≠ T.

Os _subtipos_ de um tipo T são todos os tipos U tais que T é um supertipo de U, e o tipo null. Escrevemos T `<:` S para indicar que a relação de subtipo se mantém entre os tipos T e S.

T é um _subtipo próprio_ de S, escrito T `<` S, se T `<:` S e S ≠ T.

T é um _subtipo direto_ de S, escrito T `<1` S, se S `>1` T.

A subtipagem não se estende através de tipos parametrizados: T `<:` S não implica que C`<`T`>` `<:` C`<`S`>`.

### 4.10.1. Subtipagem entre Tipos Primitivos

As seguintes regras definem a relação de supertipo direto entre os tipos primitivos:

  * `double` `>1` `float`

  * `float` `>1` `long`

  * `long` `>1` `int`

  * `int` `>1` `char`

  * `int` `>1` `short`

  * `short` `>1` `byte`

### 4.10.2. Subtipagem entre Tipos de Classe e Interface

Dada uma classe ou interface não genérica C, os _supertipos diretos_ do tipo de C são todos os seguintes:

  * O tipo de superclasse direta de C ([§8.1.4](<#/doc/jls/jls-08>)), se C for uma classe.

  * Os tipos de superinterface direta de C ([§8.1.5](<#/doc/jls/jls-08>), [§9.1.3](<#/doc/jls/jls-09>)).

  * O tipo `Object`, se C for uma interface sem tipos de superinterface direta ([§9.1.3](<#/doc/jls/jls-09>)).

Dada uma classe ou interface genérica C com parâmetros de tipo F1,...,Fn (_n_ > 0), os _supertipos diretos_ do tipo bruto C ([§4.8](<#/doc/jls/jls-04>)) são todos os seguintes:

  * A eliminação ([§4.6](<#/doc/jls/jls-04>)) do tipo de superclasse direta de C, se C for uma classe.

  * A eliminação dos tipos de superinterface direta de C.

  * O tipo `Object`, se C for uma interface sem tipos de superinterface direta.

Dada uma classe ou interface genérica C com parâmetros de tipo F1,...,Fn (_n_ > 0), os _supertipos diretos_ do tipo parametrizado C`<`T1,...,Tn`>`, onde cada Ti (1 ≤ _i_ ≤ _n_) é um tipo, são todos os seguintes:

  * A substituição `[F1:=T1,...,Fn:=Tn]` aplicada ao tipo de superclasse direta de C, se C for uma classe.

  * A substituição `[F1:=T1,...,Fn:=Tn]` aplicada aos tipos de superinterface direta de C.

  * C`<`S1,...,Sn`>`, onde Si contém Ti (1 ≤ _i_ ≤ _n_) ([§4.5.1](<#/doc/jls/jls-04>)).

  * O tipo `Object`, se C for uma interface sem tipos de superinterface direta.

  * O tipo bruto C.

Dada uma classe ou interface genérica C com parâmetros de tipo F1,...,Fn (_n_ > 0), os _supertipos diretos_ do tipo parametrizado C`<`R1,...,Rn`>` onde pelo menos um dos Ri (1 ≤ _i_ ≤ _n_) é um argumento de tipo curinga, são os supertipos diretos do tipo parametrizado C`<`X1,...,Xn`>` que é o resultado da aplicação da conversão de captura a C`<`R1,...,Rn`>` ([§5.1.10](<#/doc/jls/jls-05>)).

Os supertipos diretos de um tipo de interseção T1 `&` ... `&` Tn são Ti (1 ≤ _i_ ≤ _n_).

Os supertipos diretos de uma variável de tipo são os tipos listados em seu limite.

Uma variável de tipo é um supertipo direto de seu limite inferior.

Os supertipos diretos do tipo null são todos os tipos de referência, exceto o próprio tipo null.

### 4.10.3. Subtipagem entre Tipos de Array

As seguintes regras definem a relação de supertipo direto entre tipos de array:

  * Se S e T forem ambos tipos de referência, então S`[]` `>1` T`[]` se e somente se S `>1` T.

  * `Object` `>1` `Object`[]`

  * `Cloneable` `>1` `Object`[]`

  * `java.io.Serializable` `>1` `Object`[]`

  * Se P for um tipo primitivo, então:

    * `Object` `>1` P`[]`

    * `Cloneable` `>1` P`[]`

    * `java.io.Serializable` `>1` P`[]`

### 4.10.4. Limite Superior Mínimo

O _limite superior mínimo_, ou "lub", de um conjunto de tipos de referência é um supertipo compartilhado que é mais específico do que qualquer outro supertipo compartilhado (ou seja, nenhum outro supertipo compartilhado é um subtipo do limite superior mínimo). Este tipo, lub(U1, ..., Uk), é determinado da seguinte forma.

Se _k_ = 1, então o lub é o próprio tipo: lub(U) = U.

Caso contrário:

  * Para cada Ui (1 ≤ _i_ ≤ _k_):

Seja ST(Ui) o conjunto de supertipos de Ui.

Seja EST(Ui), o conjunto de supertipos apagados de Ui, como:

EST(Ui) = { |W| | W em ST(Ui) } onde |W| é a eliminação de W.

A razão para calcular o conjunto de supertipos apagados é lidar com situações em que o conjunto de tipos inclui várias parametrizações distintas de um tipo genérico.

Por exemplo, dados `List<String>` e `List<Object>`, simplesmente intersectar os conjuntos ST(`List<String>`) = { `List<String>`, `Collection<String>`, `Object` } e ST(`List<Object>`) = { `List<Object>`, `Collection<Object>`, `Object` } resultaria em um conjunto { `Object` }, e teríamos perdido o fato de que o limite superior pode ser seguramente assumido como uma `List`.

Em contraste, intersectar EST(`List<String>`) = { `List`, `Collection`, `Object` } e EST(`List<Object>`) = { `List`, `Collection`, `Object` } resulta em { `List`, `Collection`, `Object` }, o que eventualmente nos permitirá produzir `List<?>`.

  * Seja EC, o conjunto de candidatos apagados para U1, ..., Uk, a interseção de todos os conjuntos EST(Ui) (1 ≤ _i_ ≤ _k_).

  * Seja MEC, o conjunto de candidatos apagados mínimo para U1, ..., Uk, como:

MEC = { V | V em EC, e para todo W ≠ V em EC, não é o caso que W `<:` V }

Como estamos buscando inferir tipos mais precisos, desejamos filtrar quaisquer candidatos que sejam supertipos de outros candidatos. Isso é o que o cálculo de MEC realiza. Em nosso exemplo em andamento, tínhamos EC = { `List`, `Collection`, `Object` }, então MEC = { `List` }. O próximo passo é recuperar os argumentos de tipo para os tipos apagados em MEC.

  * Para qualquer elemento G de MEC que seja um tipo genérico:

Sejam as parametrizações "relevantes" de G, Relevant(G), como:

Relevant(G) = { V | 1 ≤ _i_ ≤ _k_ : V em ST(Ui) e V = G`<`...`>` }

Em nosso exemplo em andamento, o único elemento genérico de MEC é `List`, e Relevant(`List`) = { `List<String>`, `List<Object>` }. Agora buscaremos encontrar um argumento de tipo para `List` que contenha ([§4.5.1](<#/doc/jls/jls-04>)) tanto `String` quanto `Object`.

Isso é feito por meio da operação de parametrização de menor contenção (lcp) definida abaixo. A primeira linha define lcp() em um conjunto, como Relevant(`List`), como uma operação em uma lista que consiste nos elementos do conjunto. A próxima linha define a operação em tal lista como uma redução par a par nos elementos da lista. A terceira linha é a definição de lcp() em pares de tipos parametrizados, que por sua vez depende da noção de argumento de tipo de menor contenção (lcta). lcta() é definido para todos os casos possíveis.

Seja a parametrização "candidata" de G, Candidate(G), a parametrização mais específica do tipo genérico G que contém todas as parametrizações relevantes de G:

Candidate(G) = lcp(Relevant(G))

onde lcp(), a parametrização de menor contenção, é:

    * lcp(S) = lcp(`e1`, ..., `en`) onde `ei` (1 ≤ _i_ ≤ _n_) em S

    * lcp(`e1`, ..., `en`) = lcp(lcp(`e1`, `e2`), `e3`, ..., `en`)

    * lcp(G`<`X1, ..., Xn`>`, G`<`Y1, ..., Yn`>`) = G`<`lcta(X1, Y1), ..., lcta(Xn, Yn)`>`

    * lcp(G`<`X1, ..., Xn`>`) = G`<`lcta(X1), ..., lcta(Xn)`>`

e onde lcta(), o argumento de tipo de menor contenção, é: (assumindo que U e V são tipos)

    * lcta(U, V) = U se U = V, caso contrário `?` `extends` lub(U, V)

    * lcta(U, `?` `extends` V) = `?` `extends` lub(U, V)

    * lcta(U, `?` `super` V) = `?` `super` glb(U, V)

    * lcta(`?` `extends` U, `?` `extends` V) = `?` `extends` lub(U, V)

    * lcta(`?` `extends` U, `?` `super` V) = `?`

    * lcta(`?` `super` U, `?` `super` V) = `?` `super` glb(U, V)

    * lcta(U) = `?` se o limite superior de U for `Object`, caso contrário `?` `extends` lub(U,`Object`)

e onde glb() é definido em [§5.1.10](<#/doc/jls/jls-05>).

  * Seja lub(U1, ..., Uk) como:

Best(W1) `&` ... `&` Best(Wr)

onde Wi (1 ≤ _i_ ≤ _r_) são os elementos de MEC, o conjunto de candidatos apagados mínimo de U1, ..., Uk;

e onde, se algum desses elementos for genérico, usamos a parametrização candidata (para recuperar os argumentos de tipo):

Best(X) = Candidate(X) se X for genérico; X caso contrário.

Estritamente falando, esta função lub() apenas aproxima um limite superior mínimo. Formalmente, pode existir algum outro tipo T tal que todos os U1, ..., Uk são subtipos de T e T é um subtipo de lub(U1, ..., Uk). No entanto, um compilador para a linguagem de programação Java deve implementar lub() conforme especificado acima.

É possível que a função lub() produza um tipo infinito. Isso é permitido, e um compilador para a linguagem de programação Java deve reconhecer tais situações e representá-las apropriadamente usando estruturas de dados cíclicas.

A possibilidade de um tipo infinito decorre das chamadas recursivas a lub(). Leitores familiarizados com tipos recursivos devem notar que um tipo infinito não é o mesmo que um tipo recursivo.

### 4.10.5. Projeções de Tipo

Uma _variável de tipo sintética_ é uma variável de tipo introduzida pelo compilador durante a conversão de captura ([§5.1.10](<#/doc/jls/jls-05>)) ou resolução de variável de inferência ([§18.4](<#/doc/jls/jls-18>)).

Às vezes, é necessário encontrar um supertipo próximo de um tipo, onde esse supertipo não menciona certas variáveis de tipo sintéticas. Isso é alcançado com uma _projeção ascendente_ aplicada ao tipo.

Da mesma forma, uma _projeção descendente_ pode ser aplicada para encontrar um subtipo próximo de um tipo, onde esse subtipo não menciona certas variáveis de tipo sintéticas. Como tal tipo nem sempre existe, a projeção descendente é uma função parcial.

Essas operações recebem como entrada um conjunto de variáveis de tipo que não devem mais ser referenciadas, referidas como as _variáveis de tipo restritas_. Quando as operações se repetem, o conjunto de variáveis de tipo restritas é implicitamente passado para a aplicação recursiva.

A projeção ascendente de um tipo T em relação a um conjunto de variáveis de tipo restritas é definida da seguinte forma:

  * Se T não menciona nenhuma variável de tipo restrita, então o resultado é T.

  * Se T for uma variável de tipo restrita, então o resultado é a projeção ascendente do limite superior de T.

  * Se T for um tipo de classe parametrizado ou um tipo de interface parametrizado, G`<`A1,...,An`>`, então o resultado é G`<`A1',...,An'`>`, onde, para 1 ≤ _i_ ≤ _n_ , Ai' é derivado de Ai da seguinte forma:

    * Se Ai não menciona nenhuma variável de tipo restrita, então Ai' = Ai.

    * Se Ai for um tipo que menciona uma variável de tipo restrita, então seja U a projeção ascendente de Ai. Ai' é um curinga, definido por três casos:

      * Se U não for `Object`, e se o limite declarado do _i_-ésimo parâmetro de G, Bi, mencionar um parâmetro de tipo de G, ou se Bi não for um subtipo de U, então Ai' é um curinga com limite superior, `?` `extends` U.

      * Caso contrário, se a projeção descendente de Ai for `L`, então Ai' é um curinga com limite inferior, `?` `super` `L`.

      * Caso contrário, a projeção descendente de Ai é indefinida e Ai' é um curinga ilimitado, `?`.

    * Se Ai for um curinga com limite superior que menciona uma variável de tipo restrita, então seja U a projeção ascendente do limite do curinga. Ai' é um curinga com limite superior, `?` `extends` U.

    * Se Ai for um curinga com limite inferior que menciona uma variável de tipo restrita, então se a projeção descendente do limite do curinga for `L`, então Ai' é um curinga com limite inferior, `?` `super` `L`; se a projeção descendente do limite do curinga for indefinida, então Ai' é um curinga ilimitado, `?`.

  * Se T for um tipo de array, S`[]`, então o resultado é um tipo de array cujo tipo de componente é a projeção ascendente de S.

  * Se T for um tipo de interseção, então o resultado é um tipo de interseção. Para cada elemento, S, de T, o resultado tem como elemento a projeção ascendente de S.

A projeção descendente de um tipo T em relação a um conjunto de variáveis de tipo restritas é uma função parcial, definida da seguinte forma:

  * Se T não menciona nenhuma variável de tipo restrita, então o resultado é T.

  * Se T for uma variável de tipo restrita, então se T tiver um limite inferior, e se a projeção descendente desse limite for `L`, o resultado é `L`; se T não tiver limite inferior, ou se a projeção descendente desse limite for indefinida, então o resultado é indefinido.

  * Se T for um tipo de classe parametrizado ou um tipo de interface parametrizado, G`<`A1,...,An`>`, então o resultado é G`<`A1',...,An'`>`, se, para 1 ≤ _i_ ≤ _n_ , um argumento de tipo Ai' puder ser derivado de Ai da seguinte forma; caso contrário, o resultado é indefinido:

    * Se Ai não menciona uma variável de tipo restrita, então Ai' = Ai.

    * Se Ai for um tipo que menciona uma variável de tipo restrita, então Ai' é indefinido.

    * Se Ai for um curinga com limite superior que menciona uma variável de tipo restrita, então se a projeção descendente do limite do curinga for U, então Ai' é um curinga com limite superior, `?` `extends` U; se a projeção descendente do limite do curinga for indefinida, então Ai' é indefinido.

    * Se Ai for um curinga com limite inferior que menciona uma variável de tipo restrita, então seja `L` a projeção ascendente do limite do curinga. Ai' é um curinga com limite inferior, `?` `super` `L`.

  * Se T for um tipo de array, S`[]`, então se a projeção descendente de S for S', o resultado é S'`[]`; se a projeção descendente de S for indefinida, então o resultado é indefinido.

  * Se T for um tipo de interseção, então se a projeção descendente for definida para _cada_ elemento de T, o resultado é um tipo de interseção cujos elementos são as projeções descendentes dos elementos de T; se a projeção descendente for indefinida para _qualquer_ elemento de T, então o resultado é indefinido.

Assim como lub ([§4.10.4](<#/doc/jls/jls-04>)), a projeção ascendente e a projeção descendente podem produzir tipos infinitos, devido à recursão nos limites das variáveis de tipo.

## 4.11. Onde os Tipos São Usados

Os tipos são usados na maioria dos tipos de declaração e em certos tipos de expressão. Especificamente, existem 17 _contextos de tipo_ onde os tipos são usados:

  * Em declarações:

    1. Um tipo na cláusula `extends` ou `implements` de uma declaração de classe ([§8.1.4](<#/doc/jls/jls-08>), [§8.1.5](<#/doc/jls/jls-08>))

    2. Um tipo na cláusula `extends` de uma declaração de interface ([§9.1.3](<#/doc/jls/jls-09>))

    3. O tipo de retorno de um método ([§8.4.5](<#/doc/jls/jls-08>), [§9.4](<#/doc/jls/jls-09>)), incluindo o tipo de um elemento de uma interface de anotação ([§9.6.1](<#/doc/jls/jls-09>))

    4. Um tipo na cláusula `throws` de um método ou construtor ([§8.4.6](<#/doc/jls/jls-08>), [§8.8.5](<#/doc/jls/jls-08>), [§9.4](<#/doc/jls/jls-09>))

    5. Um tipo na cláusula `extends` de uma declaração de parâmetro de tipo de uma classe, interface, método ou construtor genérico ([§8.1.2](<#/doc/jls/jls-08>), [§9.1.2](<#/doc/jls/jls-09>), [§8.4.4](<#/doc/jls/jls-08>), [§8.8.4](<#/doc/jls/jls-08>))

    6. O tipo em uma declaração de campo de uma classe ou interface ([§8.3](<#/doc/jls/jls-08>), [§9.3](<#/doc/jls/jls-09>)), incluindo uma constante enum ([§8.9.1](<#/doc/jls/jls-08>))

    7. O tipo em uma declaração de parâmetro formal de um método, construtor ou expressão lambda ([§8.4.1](<#/doc/jls/jls-08>), [§8.8.1](<#/doc/jls/jls-08>), [§9.4](<#/doc/jls/jls-09>), [§15.27.1](<#/doc/jls/jls-15>))

    8. O tipo do parâmetro receptor de um método ([§8.4](<#/doc/jls/jls-08>))

    9. O tipo em uma declaração de variável local em uma instrução ([§14.4.2](<#/doc/jls/jls-14>), [§14.14.1](<#/doc/jls/jls-14>), [§14.14.2](<#/doc/jls/jls-14>), [§14.20.3](<#/doc/jls/jls-14>)) ou um padrão ([§14.30.1](<#/doc/jls/jls-14>))

    10. Um tipo em uma declaração de parâmetro de exceção ([§14.20](<#/doc/jls/jls-14>))

    11. O tipo em uma declaração de componente de record de uma classe record ([§8.10.1](<#/doc/jls/jls-08>))

  * Em expressões:

    12. Um tipo na lista explícita de argumentos de tipo para uma invocação de construtor, expressão de criação de instância de classe, expressão de invocação de método ou expressão de referência de método ([§8.8.7.1](<#/doc/jls/jls-08>), [§15.9](<#/doc/jls/jls-15>), [§15.12](<#/doc/jls/jls-15>), [§15.13](<#/doc/jls/jls-15>))

    13. Em uma expressão de criação de instância de classe não qualificada, como o tipo de classe a ser instanciado ([§15.9](<#/doc/jls/jls-15>)) ou como o tipo de superclasse direta ou tipo de superinterface direta de uma classe anônima a ser instanciada ([§15.9.5](<#/doc/jls/jls-15>))

    14. O tipo de elemento em uma expressão de criação de array ([§15.10.1](<#/doc/jls/jls-15>))

    15. O tipo no operador de cast de uma expressão de cast ([§15.16](<#/doc/jls/jls-15>))

    16. O tipo que segue o operador de comparação de tipo `instanceof` ([§15.20.2](<#/doc/jls/jls-15>))

    17. Em uma expressão de referência de método ([§15.13](<#/doc/jls/jls-15>)), como o tipo de referência para buscar um método membro ou como o tipo de classe ou tipo de array a ser construído.

Além disso, os tipos são usados como:

  * O tipo de elemento de um tipo de array em qualquer um dos contextos acima; e

  * Um argumento de tipo não curinga, ou um limite de um argumento de tipo curinga, de um tipo parametrizado em qualquer um dos contextos acima.

Finalmente, existem três termos especiais na linguagem de programação Java que denotam o uso de um tipo:

  * Um curinga ilimitado ([§4.5.1](<#/doc/jls/jls-04>))

  * Os `...` no tipo de um parâmetro de aridade variável ([§8.4.1](<#/doc/jls/jls-08>)), para indicar um tipo de array

  * O nome simples de um tipo em uma declaração de construtor ([§8.8](<#/doc/jls/jls-08>)), para indicar a classe do objeto construído

O significado dos tipos em contextos de tipo é dado por:

  * [§4.2](<#/doc/jls/jls-04>), para tipos primitivos

  * [§4.4](<#/doc/jls/jls-04>), para parâmetros de tipo

  * [§4.5](<#/doc/jls/jls-04>), para tipos de classe e interface que são parametrizados, ou aparecem como argumentos de tipo em um tipo parametrizado ou como limites de argumentos de tipo curinga em um tipo parametrizado

  * [§4.8](<#/doc/jls/jls-04>), para tipos de classe e interface que são brutos

  * [§4.9](<#/doc/jls/jls-04>), para tipos de interseção nos limites de parâmetros de tipo

  * [§6.5](<#/doc/jls/jls-06>), para tipos de classes, interfaces e variáveis de tipo não genéricas

  * [§10.1](<#/doc/jls/jls-10>), para tipos de array

Alguns contextos de tipo restringem como um tipo de referência pode ser parametrizado:

  * Os seguintes contextos de tipo exigem que, se um tipo for um tipo de referência parametrizado, ele não tenha argumentos de tipo curinga:

    * Em uma cláusula `extends` ou `implements` de uma declaração de classe ([§8.1.4](<#/doc/jls/jls-08>), [§8.1.5](<#/doc/jls/jls-08>))

    * Em uma cláusula `extends` de uma declaração de interface ([§9.1.3](<#/doc/jls/jls-09>))

    * Em uma expressão de criação de instância de classe não qualificada, como o tipo de classe a ser instanciado ([§15.9](<#/doc/jls/jls-15>)) ou como o tipo de superclasse direta ou tipo de superinterface direta de uma classe anônima a ser instanciada ([§15.9.5](<#/doc/jls/jls-15>))

    * Em uma expressão de referência de método ([§15.13](<#/doc/jls/jls-15>)), como o tipo de referência para buscar um método membro ou como o tipo de classe ou tipo de array a ser construído.

Além disso, nenhum argumento de tipo curinga é permitido na lista explícita de argumentos de tipo para uma invocação de construtor ou expressão de criação de instância de classe ou expressão de invocação de método ou expressão de referência de método ([§8.8.7.1](<#/doc/jls/jls-08>), [§15.9](<#/doc/jls/jls-15>), [§15.12](<#/doc/jls/jls-15>), [§15.13](<#/doc/jls/jls-15>)).

  * Os seguintes contextos de tipo exigem que, se um tipo for um tipo de referência parametrizado, ele tenha apenas argumentos de tipo curinga ilimitados (ou seja, é um tipo reificável):

    * Como o tipo de elemento em uma expressão de criação de array ([§15.10.1](<#/doc/jls/jls-15>))

    * Como o tipo que segue o operador relacional `instanceof` ([§15.20.2](<#/doc/jls/jls-15>))

  * Os seguintes contextos de tipo proíbem completamente um tipo de referência parametrizado, porque envolvem exceções e o tipo de uma exceção não é genérico ([§6.1](<#/doc/jls/jls-06>)):

    * Como o tipo de uma exceção que pode ser lançada por um método ou construtor ([§8.4.6](<#/doc/jls/jls-08>), [§8.8.5](<#/doc/jls/jls-08>), [§9.4](<#/doc/jls/jls-09>))

    * Em uma declaração de parâmetro de exceção ([§14.20](<#/doc/jls/jls-14>))

Em qualquer contexto de tipo onde um tipo é usado, é possível anotar a palavra-chave que denota um tipo primitivo ou o _Identificador_ que denota o nome simples de um tipo de referência. Também é possível anotar um tipo de array escrevendo uma anotação à esquerda do `[` no nível desejado de aninhamento no tipo de array. Anotações nesses locais são chamadas de _anotações de tipo_ e são especificadas em [§9.7.4](<#/doc/jls/jls-09>). Aqui estão alguns exemplos:

  * `@Foo int[] f;` anota o tipo primitivo `int`

  * `int @Foo [] f;` anota o tipo de array `int`[]`

  * `int @Foo [][] f;` anota o tipo de array `int`[]`[]`

  * `int[] @Foo [] f;` anota o tipo de array `int`[]` que é o tipo de componente do tipo de array `int`[]`[]`

Alguns dos _contextos de tipo_ que aparecem em declarações ocupam o mesmo espaço sintático que vários _contextos de declaração_ ([§9.6.4.1](<#/doc/jls/jls-09>)):

  * O tipo de retorno de um método (incluindo o tipo de um elemento de uma interface de anotação)

  * O tipo em uma declaração de campo de uma classe ou interface (incluindo uma constante enum)

  * O tipo em uma declaração de parâmetro formal de um método, construtor ou expressão lambda

  * O tipo em uma declaração de variável local

  * O tipo em uma declaração de parâmetro de exceção

  * O tipo em uma declaração de componente de record de uma classe record

O fato de que o mesmo local sintático em um programa pode ser tanto um contexto de tipo quanto um contexto de declaração surge porque os modificadores para uma declaração precedem imediatamente o tipo da entidade declarada. [§9.7.4](<#/doc/jls/jls-09>) explica como uma anotação em tal local é considerada como aparecendo em um contexto de tipo ou em um contexto de declaração ou em ambos.

**Exemplo 4.11-1. Uso de um Tipo**
```
    import java.util.ArrayList;
    import java.util.Collection;
    import java.util.Random;

    class MiscMath<T extends Number> {
        int divisor;
        MiscMath(int divisor) { this.divisor = divisor; }
        float ratio(long l) {
            try {
                l /= divisor;
            } catch (Exception e) {
                if (e instanceof ArithmeticException)
                    l = Long.MAX_VALUE;
                else
                    l = 0;
            }
            return (float)l;
        }
        double gausser() {
            Random r = new Random();
            double[] val = new double[2];
            val[0] = r.nextGaussian();
            val[1] = r.nextGaussian();
            return (val[0] + val[1]) / 2;
        }
        Collection<Number> fromArray(Number[] na) {
            Collection<Number> cn = new ArrayList<Number>();
            for (Number n : na) cn.add(n);
            return cn;
        }
        <S> void loop(S s) { this.<S>loop(s); }
    }


```

Neste exemplo, os tipos são usados em declarações dos seguintes:

  * Campos, que são as variáveis de classe e variáveis de instância de classes ([§8.3](<#/doc/jls/jls-08>)), e constantes de interfaces ([§9.3](<#/doc/jls/jls-09>)); aqui o campo `divisor` na classe `MiscMath` é declarado como sendo do tipo `int`

  * Parâmetros de método ([§8.4.1](<#/doc/jls/jls-08>)); aqui o parâmetro `l` do método `ratio` é declarado como sendo do tipo `long`

  * Resultados de método ([§8.4](<#/doc/jls/jls-08>)); aqui o resultado do método `ratio` é declarado como sendo do tipo `float`, e o resultado do método `gausser` é declarado como sendo do tipo `double`

  * Parâmetros de construtor ([§8.8.1](<#/doc/jls/jls-08>)); aqui o parâmetro do construtor para `MiscMath` é declarado como sendo do tipo `int`

  * Variáveis locais ([§14.4](<#/doc/jls/jls-14>), [§14.14](<#/doc/jls/jls-14>)); as variáveis locais `r` e `val` do método `gausser` são declaradas como sendo dos tipos `Random` e `double`[]` (array de `double`)

  * Parâmetros de exceção ([§14.20](<#/doc/jls/jls-14>)); aqui o parâmetro de exceção `e` da cláusula `catch` é declarado como sendo do tipo `Exception`

  * Parâmetros de tipo ([§4.4](<#/doc/jls/jls-04>)); aqui o parâmetro de tipo de `MiscMath` é uma variável de tipo `T` com o tipo `Number` como seu limite declarado

  * Em qualquer declaração que use um tipo parametrizado; aqui o tipo `Number` é usado como um argumento de tipo ([§4.5.1](<#/doc/jls/jls-04>)) no tipo parametrizado `Collection<Number>`.

e em expressões dos seguintes tipos:

  * Criações de instância de classe ([§15.9](<#/doc/jls/jls-15>)); aqui uma variável local `r` do método `gausser` é inicializada por uma expressão de criação de instância de classe que usa o tipo `Random`

  * Criações de instância de classe genérica ([§8.1.2](<#/doc/jls/jls-08>)) ([§15.9](<#/doc/jls/jls-15>)); aqui `Number` é usado como um argumento de tipo na expressão `new ArrayList<Number>()`

  * Criações de array ([§15.10.1](<#/doc/jls/jls-15>)); aqui a variável local `val` do método `gausser` é inicializada por uma expressão de criação de array que cria um array de `double` com tamanho 2

  * Invocações de método genérico ([§8.4.4](<#/doc/jls/jls-08>)) ou construtor ([§8.8.4](<#/doc/jls/jls-08>)) ([§15.12](<#/doc/jls/jls-15>)); aqui o método `loop` chama a si mesmo com um argumento de tipo explícito `S`

  * Casts ([§15.16](<#/doc/jls/jls-15>)); aqui a instrução `return` do método `ratio` usa o tipo `float` em um cast

  * O operador `instanceof` ([§15.20.2](<#/doc/jls/jls-15>)); aqui o operador `instanceof` testa se `e` é compatível por atribuição com o tipo `ArithmeticException`
## 4.12. Variáveis

Uma variável é um local de armazenamento e possui um tipo associado, às vezes chamado de seu _tipo em tempo de compilação_ , que é um tipo primitivo ([§4.2](<#/doc/jls/jls-04>)) ou um tipo de referência ([§4.3](<#/doc/jls/jls-04>)).

O valor de uma variável é alterado por uma atribuição ([§15.26](<#/doc/jls/jls-15>)) ou por um operador de prefixo ou posfixo `++` (incremento) ou `--` (decremento) ([§15.14.2](<#/doc/jls/jls-15>), [§15.14.3](<#/doc/jls/jls-15>), [§15.15.1](<#/doc/jls/jls-15>), [§15.15.2](<#/doc/jls/jls-15>)).

A compatibilidade do valor de uma variável com seu tipo é garantida pelo design da linguagem de programação Java, desde que um programa não gere avisos não verificados em tempo de compilação (_compile-time unchecked warnings_) ([§4.12.2](<#/doc/jls/jls-04>)). Valores padrão ([§4.12.5](<#/doc/jls/jls-04>)) são compatíveis e todas as atribuições a uma variável são verificadas quanto à compatibilidade de atribuição ([§5.2](<#/doc/jls/jls-05>)), geralmente em tempo de compilação, mas, em um único caso envolvendo arrays, uma verificação em tempo de execução é feita ([§10.5](<#/doc/jls/jls-10>)).

### 4.12.1. Variáveis de Tipo Primitivo

Uma variável de um tipo primitivo sempre contém um valor primitivo daquele tipo primitivo exato.

### 4.12.2. Variáveis de Tipo de Referência

Uma variável de um tipo de classe T pode conter uma referência nula ou uma referência a uma instância da classe T ou de qualquer classe que seja uma subclasse de T.

Uma variável de um tipo de interface pode conter uma referência nula ou uma referência a qualquer instância de qualquer classe que implemente a interface.

Note que não é garantido que uma variável sempre se refira a um subtipo de seu tipo declarado, mas apenas a subclasses ou subinterfaces do tipo declarado. Isso se deve à possibilidade de _heap pollution_ discutida abaixo.

Se T é um tipo primitivo, então uma variável do tipo "array de T" pode conter uma referência nula ou uma referência a qualquer array do tipo "array de T".

Se T é um tipo de referência, então uma variável do tipo "array de T" pode conter uma referência nula ou uma referência a qualquer array do tipo "array de S" tal que o tipo S seja uma subclasse ou subinterface do tipo T.

Uma variável do tipo `Object`[]` pode conter uma referência a um array de qualquer tipo de referência.

Uma variável do tipo `Object` pode conter uma referência nula ou uma referência a qualquer objeto, seja ele uma instância de uma classe ou um array.

É possível que uma variável de um tipo parametrizado se refira a um objeto que não é desse tipo parametrizado. Essa situação é conhecida como _heap pollution_.

_Heap pollution_ só pode ocorrer se o programa realizou alguma operação envolvendo um _raw type_ que geraria um aviso não verificado em tempo de compilação (_compile-time unchecked warning_) ([§4.8](<#/doc/jls/jls-04>), [§5.1.6](<#/doc/jls/jls-05>), [§5.1.9](<#/doc/jls/jls-05>), [§8.4.1](<#/doc/jls/jls-08>), [§8.4.8.3](<#/doc/jls/jls-08>), [§8.4.8.4](<#/doc/jls/jls-08>), [§9.4.1.2](<#/doc/jls/jls-09>), [§15.12.4.2](<#/doc/jls/jls-15>)), ou se o programa cria um alias para uma variável de array de tipo de elemento não-reificável através de uma variável de array de um supertipo que é _raw_ ou não-genérico.

Por exemplo, o código:
```
    List l = new ArrayList<Number>();
    List<String> ls = l;  // Unchecked warning
    
```

gera um aviso não verificado em tempo de compilação (_compile-time unchecked warning_), porque não é possível determinar, nem em tempo de compilação (dentro dos limites das regras de verificação de tipo em tempo de compilação) nem em tempo de execução, se a variável `l` realmente se refere a uma `List<String>`.

Se o código acima for executado, ocorre _heap pollution_, pois a variável `ls`, declarada como `List<String>`, se refere a um valor que na verdade não é uma `List<String>`.

O problema não pode ser identificado em tempo de execução porque as variáveis de tipo não são _reified_, e, portanto, as instâncias não carregam nenhuma informação em tempo de execução sobre os argumentos de tipo usados para criá-las.

Em um exemplo simples como o dado acima, pode parecer que seria fácil identificar a situação em tempo de compilação e gerar um erro. No entanto, no caso geral (e típico), o valor da variável `l` pode ser o resultado de uma invocação de um método compilado separadamente, ou seu valor pode depender de um fluxo de controle arbitrário. O código acima é, portanto, muito atípico e, de fato, um estilo muito ruim.

Além disso, o fato de que `Object`[]` é um supertipo de todos os tipos de array significa que pode ocorrer um aliasing inseguro que leva a _heap pollution_. Por exemplo, o seguinte código compila porque está estaticamente correto em termos de tipo:
```
    
    static void m(List<String>... stringLists) {
        Object[] array = stringLists;
        List<Integer> tmpList = Arrays.asList(42);
        array[0] = tmpList;                // (1)
        String s = stringLists[0].get(0);  // (2)
    }
    
    
```

_Heap pollution_ ocorre em (1) porque um componente no array `stringLists` que deveria se referir a uma `List<String>` agora se refere a uma `List<Integer>`. Não há como detectar essa _pollution_ na presença de um supertipo universal (`Object`[]`) e um tipo não-reificável (o tipo declarado do parâmetro formal, `List<String>`[]`). Nenhum aviso não verificado é justificado em (1); no entanto, em tempo de execução, uma `ClassCastException` ocorrerá em (2).

Um aviso não verificado em tempo de compilação (_compile-time unchecked warning_) será emitido em qualquer invocação do método acima porque uma invocação é considerada pelo sistema de tipos estático da linguagem de programação Java como a criação de um array cujo tipo de elemento, `List<String>`, não é _reifiable_ ([§15.12.4.2](<#/doc/jls/jls-15>)). _Se e somente se_ o corpo do método fosse _type-safe_ em relação ao parâmetro de aridade variável, então o programador poderia usar a anotação `SafeVarargs` para silenciar os avisos nas invocações ([§9.6.4.7](<#/doc/jls/jls-09>)). Como o corpo do método, conforme escrito acima, causa _heap pollution_, seria completamente inadequado usar a anotação para desabilitar avisos para os chamadores.

Finalmente, observe que o array `stringLists` poderia ser aliased através de variáveis de tipos diferentes de `Object`[]`, e _heap pollution_ ainda poderia ocorrer. Por exemplo, o tipo da variável `array` poderia ser `java.util.Collection[]` - um tipo de elemento _raw_ - e o corpo do método acima compilaria sem avisos ou erros e ainda causaria _heap pollution_. E se a Plataforma Java SE definisse, digamos, `Sequence` como um supertipo não-genérico de `List<T>`, então usar `Sequence` como o tipo de `array` também causaria _heap pollution_.

A variável sempre se referirá a um objeto que é uma instância de uma classe que representa o tipo parametrizado.

O valor de `ls` no exemplo acima é sempre uma instância de uma classe que fornece uma representação de uma `List`.

A atribuição de uma expressão de um _raw type_ a uma variável de um tipo parametrizado deve ser usada apenas ao combinar código legado que não utiliza tipos parametrizados com código mais moderno que os utiliza.

Se nenhuma operação que exija a emissão de um aviso não verificado em tempo de compilação ocorrer, e nenhum aliasing inseguro de variáveis de array com tipos de elementos não-reificáveis ocorrer, então _heap pollution_ não pode ocorrer. Note que isso não implica que _heap pollution_ só ocorre se um aviso não verificado em tempo de compilação realmente ocorreu. É possível executar um programa onde alguns dos binários foram produzidos por um compilador para uma versão mais antiga da linguagem de programação Java, ou de fontes que suprimiram explicitamente os avisos não verificados. Essa prática é, na melhor das hipóteses, prejudicial.

Por outro lado, é possível que, apesar de executar código que poderia (e talvez tenha) gerado um aviso não verificado em tempo de compilação, nenhuma _heap pollution_ ocorra. De fato, uma boa prática de programação exige que o programador se certifique de que, apesar de qualquer aviso não verificado, o código está correto e _heap pollution_ não ocorrerá.

### 4.12.3. Tipos de Variáveis

Existem oito tipos de variáveis:

  1. Uma _variável de classe_ é um campo declarado usando a palavra-chave `static` dentro de uma declaração de classe ([§8.3.1.1](<#/doc/jls/jls-08>)), ou com ou sem a palavra-chave `static` dentro de uma declaração de interface ([§9.3](<#/doc/jls/jls-09>)).

Uma variável de classe é criada quando sua classe ou interface é preparada ([§12.3.2](<#/doc/jls/jls-12>)) e é inicializada com um valor padrão ([§4.12.5](<#/doc/jls/jls-04>)). A variável de classe efetivamente deixa de existir quando sua classe ou interface é descarregada ([§12.7](<#/doc/jls/jls-12>)).

  2. Uma _variável de instância_ é um campo declarado dentro de uma declaração de classe sem usar a palavra-chave `static` ([§8.3.1.1](<#/doc/jls/jls-08>)).

Se uma classe T tem um campo `a` que é uma variável de instância, então uma nova variável de instância `a` é criada e inicializada com um valor padrão ([§4.12.5](<#/doc/jls/jls-04>)) como parte de cada objeto recém-criado da classe T ou de qualquer classe que seja uma subclasse de T ([§8.1.4](<#/doc/jls/jls-08>)). A variável de instância efetivamente deixa de existir quando o objeto do qual ela é um campo não é mais referenciado, após qualquer finalização necessária do objeto ([§12.6](<#/doc/jls/jls-12>)) ter sido concluída.

  3. _Componentes de array_ são variáveis sem nome que são criadas e inicializadas com valores padrão ([§4.12.5](<#/doc/jls/jls-04>)) sempre que um novo objeto que é um array é criado ([§10 (_Arrays_)](<#/doc/jls/jls-10>), [§15.10.2](<#/doc/jls/jls-15>)). Os componentes do array efetivamente deixam de existir quando o array não é mais referenciado.

  4. _Parâmetros de método_ ([§8.4.1](<#/doc/jls/jls-08>)) nomeiam valores de argumento passados para um método.

Para cada parâmetro declarado em uma declaração de método, uma nova variável de parâmetro é criada cada vez que esse método é invocado ([§15.12](<#/doc/jls/jls-15>)). A nova variável é inicializada com o valor de argumento correspondente da invocação do método. O parâmetro de método efetivamente deixa de existir quando a execução do corpo do método é concluída.

  5. _Parâmetros de construtor_ ([§8.8.1](<#/doc/jls/jls-08>)) nomeiam valores de argumento passados para um construtor.

Para cada parâmetro declarado em uma declaração de construtor, uma nova variável de parâmetro é criada cada vez que uma expressão de criação de instância de classe ([§15.9](<#/doc/jls/jls-15>)) ou invocação de construtor ([§8.8.7](<#/doc/jls/jls-08>)) invoca esse construtor. A nova variável é inicializada com o valor de argumento correspondente da expressão de criação ou invocação do construtor. O parâmetro do construtor efetivamente deixa de existir quando a execução do corpo do construtor é concluída.

  6. _Parâmetros lambda_ ([§15.27.1](<#/doc/jls/jls-15>)) nomeiam valores de argumento passados para o corpo de uma expressão lambda ([§15.27.2](<#/doc/jls/jls-15>)).

Para cada parâmetro declarado em uma expressão lambda, uma nova variável de parâmetro é criada cada vez que um método implementado pelo corpo lambda é invocado ([§15.12](<#/doc/jls/jls-15>)). A nova variável é inicializada com o valor de argumento correspondente da invocação do método. O parâmetro lambda efetivamente deixa de existir quando a execução do corpo da expressão lambda é concluída.

  7. Um _parâmetro de exceção_ é criado cada vez que uma exceção é capturada por uma cláusula `catch` de uma instrução `try` ([§14.20](<#/doc/jls/jls-14>)).

A nova variável é inicializada com o objeto real associado à exceção ([§11.3](<#/doc/jls/jls-11>), [§14.18](<#/doc/jls/jls-14>)). O parâmetro de exceção efetivamente deixa de existir quando a execução do bloco associado à cláusula `catch` é concluída.

  8. _Variáveis locais_ ([§14.4](<#/doc/jls/jls-14>)) são declaradas por instruções ([§14.4.2](<#/doc/jls/jls-14>), [§14.14.1](<#/doc/jls/jls-14>), [§14.14.2](<#/doc/jls/jls-14>), [§14.20.3](<#/doc/jls/jls-14>)) e por padrões ([§14.30](<#/doc/jls/jls-14>)). Uma variável local declarada por um padrão é chamada de _variável de padrão_.

Uma variável local declarada por uma instrução é criada quando o fluxo de controle entra no bloco mais próximo que a contém ([§14.2](<#/doc/jls/jls-14>)), instrução `for`, ou instrução `try`-with-resources.

Uma variável local declarada por uma instrução é inicializada como parte da execução da instrução, desde que o declarador da variável tenha um inicializador. As regras de atribuição definida ([§16 (_Atribuição Definida_)](<#/doc/jls/jls-16>)) impedem que o valor de uma variável local declarada por uma instrução seja usado antes de ter sido inicializado ou de outra forma atribuído um valor.

Uma variável local declarada por um padrão é criada e inicializada quando o padrão corresponde ([§14.30.2](<#/doc/jls/jls-14>)). As regras de escopo ([§6.3](<#/doc/jls/jls-06>)) impedem que o valor de uma variável local declarada por um padrão seja usado a menos que o padrão tenha correspondido.

Uma variável local deixa de existir quando sua declaração não está mais no escopo.

Se não fosse por uma situação excepcional, uma variável local declarada por uma instrução poderia sempre ser considerada como criada quando a instrução é executada. A situação excepcional envolve a instrução `switch` ([§14.11](<#/doc/jls/jls-14>)), onde é possível que o controle entre em um bloco, mas ignore a execução de uma instrução de declaração de variável local. Por causa das restrições impostas pelas regras de atribuição definida ([§16 (_Atribuição Definida_)](<#/doc/jls/jls-16>)), no entanto, a variável local declarada por tal instrução de declaração de variável local ignorada não pode ser usada antes de ter sido definitivamente atribuída um valor por uma expressão de atribuição ([§15.26](<#/doc/jls/jls-15>)).

**Exemplo 4.12.3-1. Diferentes Tipos de Variáveis**
```
    class Point {
        static int numPoints;   // numPoints is a class variable
        int x, y;               // x and y are instance variables
        int[] w = new int[10];  // w[0] is an array component
        int setX(int x) {       // x is a method parameter
            int oldx = this.x;  // oldx is a local variable
            this.x = x;
            return oldx;
        }
        boolean equalAtX(Object o) {
            if (o instanceof Point p)  // p is a pattern variable
                return this.x == p.x;
            else
                return false;
        }
    }
    
    
```

### 4.12.4. Variáveis `final`

Uma variável pode ser declarada `final`. Uma variável `final` pode ser atribuída apenas uma vez. É um erro em tempo de compilação se uma variável `final` for atribuída, a menos que ela esteja definitivamente não atribuída imediatamente antes da atribuição ([§16 (_Atribuição Definida_)](<#/doc/jls/jls-16>)).

Uma vez que uma variável `final` tenha sido atribuída, ela sempre contém o mesmo valor. Se uma variável `final` contém uma referência a um objeto, então o estado do objeto pode ser alterado por operações no objeto, mas a variável sempre se referirá ao mesmo objeto. Isso se aplica também a arrays, porque arrays são objetos; se uma variável `final` contém uma referência a um array, então os componentes do array podem ser alterados por operações no array, mas a variável sempre se referirá ao mesmo array.

Uma _blank `final`_ é uma variável `final` cuja declaração não possui um inicializador.

Uma _variável constante_ é uma variável `final` de tipo primitivo ou tipo `String` que é inicializada com uma expressão constante ([§15.29](<#/doc/jls/jls-15>)). Se uma variável é uma variável constante ou não pode ter implicações em relação à inicialização de classe ([§12.4.1](<#/doc/jls/jls-12>)), compatibilidade binária ([§13.1](<#/doc/jls/jls-13>)), alcançabilidade ([§14.22](<#/doc/jls/jls-14>)), e atribuição definida ([§16.1.1](<#/doc/jls/jls-16>)).

Três tipos de variáveis são implicitamente declaradas `final`: um campo de uma interface ([§9.3](<#/doc/jls/jls-09>)), uma variável local declarada como um recurso de uma instrução `try`-with-resources ([§14.20.3](<#/doc/jls/jls-14>)), e um parâmetro de exceção de uma cláusula multi-`catch` ([§14.20](<#/doc/jls/jls-14>)). Um parâmetro de exceção de uma cláusula uni-`catch` nunca é implicitamente declarado `final`, mas pode ser _effectively final_.

**Exemplo 4.12.4-1. Variáveis Final**

Declarar uma variável `final` pode servir como documentação útil de que seu valor não mudará e pode ajudar a evitar erros de programação. Neste programa:
```
    class Point {
        int x, y;
        int useCount;
        Point(int x, int y) { this.x = x; this.y = y; }
        static final Point origin = new Point(0, 0);
    }
    
```

a classe `Point` declara uma variável de classe `final` `origin`. A variável `origin` contém uma referência a um objeto que é uma instância da classe `Point` cujas coordenadas são (0, 0). O valor da variável `Point.origin` nunca pode mudar, então ela sempre se refere ao mesmo objeto `Point`, aquele criado por seu inicializador. No entanto, uma operação neste objeto `Point` pode mudar seu estado - por exemplo, modificando seu `useCount` ou até mesmo, enganosamente, sua coordenada `x` ou `y`.

Certas variáveis que não são declaradas `final` são consideradas _effectively final_ :

  * Uma variável local declarada por uma instrução e cujo declarador possui um inicializador ([§14.4](<#/doc/jls/jls-14>)), ou uma variável local declarada por um padrão ([§14.30.1](<#/doc/jls/jls-14>)), é _effectively final_ se todas as seguintes condições forem verdadeiras:

    * Não é declarada `final`.

    * Nunca ocorre como o lado esquerdo em uma expressão de atribuição ([§15.26](<#/doc/jls/jls-15>)). (Note que o declarador de variável local contendo o inicializador _não_ é uma expressão de atribuição.)

    * Nunca ocorre como operando de um operador de incremento ou decremento de prefixo ou posfixo ([§15.14](<#/doc/jls/jls-15>), [§15.15](<#/doc/jls/jls-15>)).

  * Uma variável local declarada por uma instrução e cujo declarador não possui um inicializador é _effectively final_ se todas as seguintes condições forem verdadeiras:

    * Não é declarada `final`.

    * Sempre que ocorre como o lado esquerdo em uma expressão de atribuição, ela está definitivamente não atribuída e não definitivamente atribuída antes da atribuição; ou seja, ela está definitivamente não atribuída e não definitivamente atribuída após o lado direito da expressão de atribuição ([§16 (_Atribuição Definida_)](<#/doc/jls/jls-16>)).

    * Nunca ocorre como operando de um operador de incremento ou decremento de prefixo ou posfixo.

  * Um parâmetro de método, construtor, lambda ou exceção ([§8.4.1](<#/doc/jls/jls-08>), [§8.8.1](<#/doc/jls/jls-08>), [§9.4](<#/doc/jls/jls-09>), [§15.27.1](<#/doc/jls/jls-15>), [§14.20](<#/doc/jls/jls-14>)) é tratado, para fins de determinação se é _effectively final_, como uma variável local cujo declarador possui um inicializador.

Se uma variável é _effectively final_, adicionar o modificador `final` à sua declaração não introduzirá nenhum erro em tempo de compilação. Inversamente, uma variável local ou parâmetro que é declarado `final` em um programa válido torna-se _effectively final_ se o modificador `final` for removido.

### 4.12.5. Valores Iniciais de Variáveis

Toda variável em um programa deve ter um valor antes que seu valor seja usado:

  * Cada variável de classe, variável de instância ou componente de array é inicializado com um _valor padrão_ quando é criado ([§15.9](<#/doc/jls/jls-15>), [§15.10.2](<#/doc/jls/jls-15>)):

    * Para o tipo `byte`, o valor padrão é zero, ou seja, o valor de `(byte)0`.

    * Para o tipo `short`, o valor padrão é zero, ou seja, o valor de `(short)0`.

    * Para o tipo `int`, o valor padrão é zero, ou seja, `0`.

    * Para o tipo `long`, o valor padrão é zero, ou seja, `0L`.

    * Para o tipo `float`, o valor padrão é zero positivo, ou seja, `0.0f`.

    * Para o tipo `double`, o valor padrão é zero positivo, ou seja, `0.0d`.

    * Para o tipo `char`, o valor padrão é o caractere nulo, ou seja, `'\u0000'`.

    * Para o tipo `boolean`, o valor padrão é `false`.

    * Para todos os tipos de referência ([§4.3](<#/doc/jls/jls-04>)), o valor padrão é `null`.

  * Cada parâmetro de método ([§8.4.1](<#/doc/jls/jls-08>)) é inicializado com o valor de argumento correspondente fornecido pelo invocador do método ([§15.12](<#/doc/jls/jls-15>)).

  * Cada parâmetro de construtor ([§8.8.1](<#/doc/jls/jls-08>)) é inicializado com o valor de argumento correspondente fornecido por uma expressão de criação de instância de classe ([§15.9](<#/doc/jls/jls-15>)) ou invocação de construtor ([§8.8.7](<#/doc/jls/jls-08>)).

  * Um parâmetro de exceção ([§14.20](<#/doc/jls/jls-14>)) é inicializado com o objeto lançado que representa a exceção ([§11.3](<#/doc/jls/jls-11>), [§14.18](<#/doc/jls/jls-14>)).

  * Uma variável local declarada por uma instrução ([§14.4.2](<#/doc/jls/jls-14>), [§14.14.1](<#/doc/jls/jls-14>), [§14.14.2](<#/doc/jls/jls-14>), [§14.20.3](<#/doc/jls/jls-14>)) deve receber explicitamente um valor antes de ser usada, seja por inicialização ([§14.4](<#/doc/jls/jls-14>)) ou atribuição ([§15.26](<#/doc/jls/jls-15>)), de uma forma que possa ser verificada usando as regras para atribuição definida ([§16 (_Atribuição Definida_)](<#/doc/jls/jls-16>)).

Uma variável local declarada por um padrão ([§14.30.1](<#/doc/jls/jls-14>)) é inicializada implicitamente, pelo processo de correspondência de padrões ([§14.30.2](<#/doc/jls/jls-14>)).

**Exemplo 4.12.5-1. Valores Iniciais de Variáveis**
```
    class Point {
        static int npoints;
        int x, y;
        Point root;
    }
    
    class Test {
        public static void main(String[] args) {
            System.out.println("npoints=" + Point.npoints);
            Point p = new Point();
            System.out.println("p.x=" + p.x + ", p.y=" + p.y);
            System.out.println("p.root=" + p.root);
        }
    }
    
```

Este programa imprime:
```
    npoints=0
    p.x=0, p.y=0
    p.root=null
    
```

ilustrando a inicialização padrão de `npoints`, que ocorre quando a classe `Point` é preparada ([§12.3.2](<#/doc/jls/jls-12>)), e a inicialização padrão de `x`, `y` e `root`, que ocorre quando um novo `Point` é instanciado. Veja [§12 (_Execução_)](<#/doc/jls/jls-12>) para uma descrição completa de todos os aspectos de carregamento, vinculação e inicialização de classes e interfaces, além de uma descrição da instanciação de classes para criar novas instâncias de classe.

### 4.12.6. Tipos, Classes e Interfaces

Na linguagem de programação Java, toda variável e toda expressão possui um tipo que pode ser determinado em tempo de compilação. O tipo pode ser um tipo primitivo ou um tipo de referência. Tipos de referência incluem tipos de classe e tipos de interface. Tipos de referência são introduzidos por _declarações de tipo_, que incluem declarações de classe ([§8.1](<#/doc/jls/jls-08>)) e declarações de interface ([§9.1](<#/doc/jls/jls-09>)). Frequentemente usamos o termo _tipo_ para nos referir a uma classe ou a uma interface.

Na Java Virtual Machine, todo objeto pertence a alguma classe particular: a classe que foi mencionada na expressão de criação que produziu o objeto ([§15.9](<#/doc/jls/jls-15>)), ou a classe cujo objeto `Class` foi usado para invocar um método reflexivo para produzir o objeto, ou a classe `String` para objetos implicitamente criados pelo operador de concatenação de strings `+` ([§15.18.1](<#/doc/jls/jls-15>)). Esta classe é chamada de _classe do objeto_. Diz-se que um objeto é uma _instância_ de sua classe e de todas as superclasses de sua classe.

Todo array também tem uma classe. O método `getClass`, quando invocado para um objeto array, retornará um objeto de classe (da classe `Class`) que representa a _classe do array_ ([§10.8](<#/doc/jls/jls-10>)).

O tipo em tempo de compilação de uma variável é sempre declarado, e o tipo em tempo de compilação de uma expressão pode ser deduzido em tempo de compilação. O tipo em tempo de compilação limita os valores possíveis que a variável pode conter em tempo de execução ou que a expressão pode produzir em tempo de execução. Se um valor em tempo de execução é uma referência que não é `null`, ele se refere a um objeto ou array que possui uma classe, e essa classe será necessariamente compatível com o tipo em tempo de compilação.

Embora uma variável ou expressão possa ter um tipo em tempo de compilação que seja um tipo de interface, não existem instâncias de interfaces. Uma variável ou expressão cujo tipo é um tipo de interface pode referenciar qualquer objeto cuja classe implemente ([§8.1.5](<#/doc/jls/jls-08>)) essa interface.

Às vezes, diz-se que uma variável ou expressão tem um "tipo em tempo de execução". Isso se refere à classe do objeto referenciado pelo valor da variável ou expressão em tempo de execução, assumindo que o valor não é `null`.

A correspondência entre tipos em tempo de compilação e tipos em tempo de execução é incompleta por duas razões:

  1. Em tempo de execução, classes e interfaces são carregadas pela Java Virtual Machine usando _class loaders_. Cada _class loader_ define seu próprio conjunto de classes e interfaces. Como resultado, é possível que dois _loaders_ carreguem uma definição idêntica de classe ou interface, mas produzam classes ou interfaces distintas em tempo de execução. Consequentemente, o código que compilou corretamente pode falhar em tempo de linkagem se os _class loaders_ que o carregam forem inconsistentes.

Veja o artigo _Dynamic Class Loading in the Java Virtual Machine_, de Sheng Liang e Gilad Bracha, em _Proceedings of OOPSLA '98_, publicado como _ACM SIGPLAN Notices_, Volume 33, Número 10, Outubro de 1998, páginas 36-44, e _The Java Virtual Machine Specification, Java SE 25 Edition_ para mais detalhes.

  2. Variáveis de tipo ([§4.4](<#/doc/jls/jls-04>)) e argumentos de tipo ([§4.5.1](<#/doc/jls/jls-04>)) não são _reified_ em tempo de execução. Como resultado, a mesma classe ou interface em tempo de execução representa múltiplos tipos parametrizados ([§4.5](<#/doc/jls/jls-04>)) do tempo de compilação. Especificamente, todas as parametrizações em tempo de compilação de um dado tipo genérico ([§8.1.2](<#/doc/jls/jls-08>), [§9.1.2](<#/doc/jls/jls-09>)) compartilham uma única representação em tempo de execução.

Sob certas condições, é possível que uma variável de um tipo parametrizado se refira a um objeto que não é desse tipo parametrizado. Essa situação é conhecida como _heap pollution_ ([§4.12.2](<#/doc/jls/jls-04>)). A variável sempre se referirá a um objeto que é uma instância de uma classe que representa o tipo parametrizado.

**Exemplo 4.12.6-1. Tipo de uma Variável versus Classe de um Objeto**
```
    interface Colorable {
        void setColor(byte r, byte g, byte b);
    }
    
    class Point { int x, y; }
    
    class ColoredPoint extends Point implements Colorable {
        byte r, g, b;
        public void setColor(byte rv, byte gv, byte bv) {
            r = rv; g = gv; b = bv;
        }
    }
    
    class Test {
        public static void main(String[] args) {
            Point p = new Point();
            ColoredPoint cp = new ColoredPoint();
            p = cp;
            Colorable c = cp;
        }
    }
    
```

Neste exemplo:

  * A variável local `p` do método `main` da classe `Test` tem o tipo `Point` e é inicialmente atribuída uma referência a uma nova instância da classe `Point`.

  * A variável local `cp` similarmente tem como seu tipo `ColoredPoint`, e é inicialmente atribuída uma referência a uma nova instância da classe `ColoredPoint`.

  * A atribuição do valor de `cp` à variável `p` faz com que `p` contenha uma referência a um objeto `ColoredPoint`. Isso é permitido porque `ColoredPoint` é uma subclasse de `Point`, então a classe `ColoredPoint` é compatível com atribuição ([§5.2](<#/doc/jls/jls-05>)) com o tipo `Point`. Um objeto `ColoredPoint` inclui suporte para todos os métodos de um `Point`. Além de seus campos particulares `r`, `g` e `b`, ele possui os campos da classe `Point`, ou seja, `x` e `y`.

  * A variável local `c` tem como seu tipo o tipo de interface `Colorable`, então ela pode conter uma referência a qualquer objeto cuja classe implemente `Colorable`; especificamente, ela pode conter uma referência a um `ColoredPoint`.

Note que uma expressão como `new Colorable()` não é válida porque não é possível criar uma instância de uma interface, apenas de uma classe. No entanto, a expressão `new Colorable() { public void setColor... }` é válida porque ela declara uma classe anônima ([§15.9.5](<#/doc/jls/jls-15>)) que implementa a interface `Colorable`.

* * *

[Anterior](<#/doc/jls/jls-03>) | | [Próximo](<#/doc/jls/jls-05>)
---|---|---
Capítulo 3. Estrutura Léxica | [Início](<#/doc/jls/jls-01>) | Capítulo 5. Conversões e Contextos

* * *

[ Aviso Legal ](<#/>)