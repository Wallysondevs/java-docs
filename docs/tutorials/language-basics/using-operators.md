# Usando Operadores em Seus Programas

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos da Linguagem Java ](<#/doc/tutorials/language-basics>) > Usando Operadores em Seus Programas

**Anterior na Série**

[Usando o Identificador de Tipo Var](<#/doc/tutorials/language-basics/using-var>)

➜

**Tutorial Atual**

Usando Operadores em Seus Programas

➜

**Próximo na Série**

[Resumo dos Operadores](<#/doc/tutorials/language-basics/all-operators>)

**Anterior na Série:** [Usando o Identificador de Tipo Var](<#/doc/tutorials/language-basics/using-var>)

**Próximo na Série:** [Resumo dos Operadores](<#/doc/tutorials/language-basics/all-operators>)

# Usando Operadores em Seus Programas

## Operadores

Agora que você aprendeu como declarar e inicializar variáveis, você provavelmente quer saber como _fazer algo_ com elas. Aprender os operadores da linguagem de programação Java é um bom ponto de partida. Operadores são símbolos especiais que realizam operações específicas em um, dois ou três operandos, e então retornam um resultado.

À medida que exploramos os operadores da linguagem de programação Java, pode ser útil para você saber de antemão quais operadores têm a maior precedência. Os operadores na tabela a seguir são listados de acordo com a ordem de precedência. Quanto mais próximo do topo da tabela um operador aparece, maior sua precedência. Operadores com maior precedência são avaliados antes de operadores com precedência relativamente menor. Operadores na mesma linha têm precedência igual. Quando operadores de igual precedência aparecem na mesma expressão, uma regra deve governar qual é avaliado primeiro. Todos os operadores binários, exceto os operadores de atribuição, são avaliados da esquerda para a direita; os operadores de atribuição são avaliados da direita para a esquerda.

Operadores | Precedência
---|---
postfix | `expr++` `expr--`
unary | `++expr` `--expr` `+expr` `-expr` `~` `!`
multiplicative | `*` `/` `%`
additive | `+` `-`
shift | `<<` `>>` `>>>`
relational | `<` `>` `<=` `>=` `instanceof`
equality | `==` `!=`
bitwise AND | `&`
bitwise exclusive OR | `^`
bitwise inclusive OR | `|`
logical AND | `&&`
logical OR | `||`
ternary | `? :`
assignment | `=` `+=` `-=` `*=` `/=` `%=` `&=` `^=` `|=` `<<=` `>>=` `>>>=`

Na programação de propósito geral, certos operadores tendem a aparecer com mais frequência do que outros; por exemplo, o operador de atribuição `=` é muito mais comum do que o operador de deslocamento à direita sem sinal `>>>`. Com isso em mente, a discussão a seguir foca primeiro nos operadores que você provavelmente usará regularmente, e termina focando naqueles que são menos comuns. Cada discussão é acompanhada por um código de exemplo que você pode compilar e executar. Estudar sua saída ajudará a reforçar o que você acabou de aprender.

## O Operador de Atribuição Simples

Um dos operadores mais comuns que você encontrará é o operador de atribuição simples `=`. Você viu este operador na classe `Bicycle`; ele atribui o valor à sua direita ao operando à sua esquerda:

```java
int cadence = 0;
```

Este operador também pode ser usado em objetos para atribuir referências de objetos, conforme discutido na seção [Criando Objetos](<#/doc/tutorials/classes-objects/creating-objects>).

## Os Operadores Aritméticos

A linguagem de programação Java fornece operadores que realizam adição, subtração, multiplicação e divisão. Há uma boa chance de você reconhecê-los por seus equivalentes na matemática básica. O único símbolo que pode parecer novo para você é `%`, que divide um operando por outro e retorna o resto como seu resultado.

Operador | Descrição
---|---
`+` | Operador aditivo (também usado para concatenação de String)
`-` | Operador de subtração
`*` | Operador de multiplicação
`/` | Operador de divisão
`%` | Operador de resto

O programa a seguir, `ArithmeticDemo`, testa os operadores aritméticos.

```java
class ArithmeticDemo {

    public static void main (String[] args) {

        int result = 1 + 2; // result is now 3
        System.out.println("1 + 2 = " + result);
        int original_result = result;

        result = result - 1; // result is now 2
        System.out.println(original_result + " - 1 = " + result);
        original_result = result;

        result = result * 2; // result is now 4
        System.out.println(original_result + " * 2 = " + result);
        original_result = result;

        result = result / 2; // result is now 2
        System.out.println(original_result + " / 2 = " + result);
        original_result = result;

        result = result + 8; // result is now 10
        System.out.println(original_result + " + 8 = " + result);
        original_result = result;

        result = result % 7; // result is now 3
        System.out.println(original_result + " % 7 = " + result);
    }
}
```

Este programa imprime o seguinte:

```
1 + 2 = 3
3 - 1 = 2
2 * 2 = 4
4 / 2 = 2
2 + 8 = 10
10 % 7 = 3
```

Você também pode combinar os operadores aritméticos com o operador de atribuição simples para criar atribuições compostas. Por exemplo, `x += 1;` e `x = x + 1;` ambos incrementam o valor de `x` em 1.

O operador `+` também pode ser usado para concatenar (unir) duas strings, como mostrado no seguinte programa `ConcatDemo`:

```java
class ConcatDemo {
    public static void main(String[] args) {
        String firstString = "This is";
        String secondString = " a concatenated string.";
        String thirdString = firstString + secondString;
        System.out.println(thirdString);
    }
}
```

Ao final deste programa, a variável `thirdString` contém `This is a concatenated string.`, que é impressa na saída padrão.

## Os Operadores Unários

Os operadores unários requerem apenas um operando; eles realizam várias operações, como incrementar/decrementar um valor em um, negar uma expressão ou inverter o valor de um boolean.

Operador | Descrição
---|---
`+` | Operador unário de mais; indica valor positivo (números são positivos sem isso, no entanto)
`-` | Operador unário de menos; nega uma expressão
`++` | Operador de incremento; incrementa um valor em 1
`--` | Operador de decremento; decrementa um valor em 1
`!` | Operador de complemento lógico; inverte o valor de um boolean

O programa a seguir, `UnaryDemo`, testa os operadores unários:

```java
class UnaryDemo {

    public static void main(String[] args) {

        int result = +1;
        // result is now 1
        System.out.println(result);

        result--;
        // result is now 0
        System.out.println(result);

        result++;
        // result is now 1
        System.out.println(result);

        result = -result;
        // result is now -1
        System.out.println(result);

        boolean success = false;
        // false
        System.out.println(success);
        System.out.println(!success);
        // true
    }
}
```

Os operadores de incremento/decremento podem ser aplicados antes (prefixo) ou depois (pós-fixo) do operando. O código `result++;` e `++result;` ambos resultarão em `result` sendo incrementado em um. A única diferença é que a versão prefixo (`++result`) avalia para o valor incrementado, enquanto a versão pós-fixo (`result++`) avalia para o valor original. Se você está apenas realizando um incremento/decremento simples, não importa qual versão você escolha. Mas se você usar este operador como parte de uma expressão maior, a escolha pode fazer uma diferença significativa.

O programa a seguir, `PrePostDemo`, ilustra o operador unário de incremento prefixo/pós-fixo:

```java
class PrePostDemo {
    public static void main(String[] args) {
        int i = 3;
        i++;
        // prints 4
        System.out.println(i);
        ++i;
        // prints 5
        System.out.println(i);
        // prints 6
        System.out.println(++i);
        // prints 6
        System.out.println(i++);
        // prints 7
        System.out.println(i);
    }
}
```

## Os Operadores de Igualdade e Relacionais

Os operadores de igualdade e relacionais determinam se um operando é maior que, menor que, igual a, ou diferente de outro operando. A maioria desses operadores provavelmente parecerá familiar para você também. Lembre-se de que você deve usar `==`, não `=`, ao testar se dois valores primitivos são iguais.

Operador | Descrição
---|---
`==` | igual a
`!=` | diferente de
`>` | maior que
`>=` | maior ou igual a
`<` | menor que
`<=` | menor ou igual a

O programa a seguir, `ComparisonDemo`, testa os operadores de comparação:

```java
class ComparisonDemo {

    public static void main(String[] args) {
        int value1 = 1;
        int value2 = 2;
        if (value1 == value2)
            System.out.println("value1 == value2");
        if (value1 != value2)
            System.out.println("value1 != value2");
        if (value1 > value2)
            System.out.println("value1 > value2");
        if (value1 < value2)
            System.out.println("value1 < value2");
        if (value1 <= value2)
            System.out.println("value1 <= value2");
    }
}
```

A execução deste programa produz a seguinte saída:

```
value1 != value2
value1 < value2
value1 <= value2
```

## Os Operadores Condicionais

Os operadores `&&` e `||` realizam operações AND Condicional e OR Condicional em duas expressões boolean. Esses operadores exibem um comportamento de "curto-circuito", o que significa que o segundo operando é avaliado apenas se necessário.

Operador | Descrição
---|---
`&&` | AND Condicional
`||` | OR Condicional

O programa a seguir, `ConditionalDemo1`, testa esses operadores:

```java
class ConditionalDemo1 {

    public static void main(String[] args) {
        int value1 = 1;
        int value2 = 2;
        if ((value1 == 1) && (value2 == 2))
            System.out.println("value1 is 1 AND value2 is 2");
        if ((value1 == 1) || (value2 == 1))
            System.out.println("value1 is 1 OR value2 is 1");
    }
}
```

Outro operador condicional é `?:`, que pode ser considerado uma abreviação para uma instrução `if-then-else` (discutida na seção [Instruções de Controle de Fluxo](<#/doc/tutorials/language-basics/controlling-flow>)). Este operador também é conhecido como operador _ternário_ porque usa três operandos. No exemplo a seguir, este operador deve ser lido como: "Se someCondition for true, atribua o valor de value1 a result. Caso contrário, atribua o valor de value2 a result."

```java
(someCondition ? value1 : value2)
```

O programa a seguir, `ConditionalDemo2`, testa o operador `?:`:

```java
class ConditionalDemo2 {

    public static void main(String[] args) {
        int value1 = 1;
        int value2 = 2;
        int result;
        boolean someCondition = true;
        result = someCondition ? value1 : value2;

        System.out.println(result);
    }
}
```

Como `someCondition` é true, este programa imprime "1" na tela. Use o operador `?:` em vez de uma instrução `if-then-else` se isso tornar seu código mais legível; por exemplo, quando as expressões são compactas e sem efeitos colaterais (como atribuições).

## O Operador de Comparação de Tipo Instanceof

O operador `instanceof` compara um objeto a um tipo especificado. Você pode usá-lo para testar se um objeto é uma instância de uma classe, uma instância de uma subclasse ou uma instância de uma classe que implementa uma interface específica.

O programa a seguir, `InstanceofDemo`, define uma classe pai (chamada `Parent`), uma interface simples (chamada `MyInterface`) e uma classe filha (chamada `Child`) que herda da pai e implementa a interface.

```java
class Parent {}
class Child extends Parent implements MyInterface {}
interface MyInterface {}

class InstanceofDemo {
    public static void main(String[] args) {
        Parent obj1 = new Parent();
        Parent obj2 = new Child();

        // obj1 é uma instância de Parent
        System.out.println("obj1 instanceof Parent: "
            + (obj1 instanceof Parent));

        // obj1 não é uma instância de Child
        System.out.println("obj1 instanceof Child: "
            + (obj1 instanceof Child));

        // obj1 não é uma instância de MyInterface
        System.out.println("obj1 instanceof MyInterface: "
            + (obj1 instanceof MyInterface));

        // obj2 é uma instância de Parent
        System.out.println("obj2 instanceof Parent: "
            + (obj2 instanceof Parent));

        // obj2 é uma instância de Child
        System.out.println("obj2 instanceof Child: "
            + (obj2 instanceof Child));

        // obj2 é uma instância de MyInterface
        System.out.println("obj2 instanceof MyInterface: "
            + (obj2 instanceof MyInterface));
    }
}
```

O programa a seguir produz a seguinte saída:

```
obj1 instanceof Parent: true
obj1 instanceof Child: false
obj1 instanceof MyInterface: false
obj2 instanceof Parent: true
obj2 instanceof Child: true
obj2 instanceof MyInterface: true
```

Ao usar o operador `instanceof`, lembre-se de que `null` não é uma instância de nada.

## Operadores Bit a Bit e de Deslocamento de Bits

A linguagem de programação Java também fornece operadores que realizam operações bit a bit e de deslocamento de bits em tipos integrais. Os operadores discutidos nesta seção são menos comumente usados. Portanto, sua cobertura é breve; a intenção é simplesmente fazer com que você saiba que esses operadores existem.

O operador de complemento bit a bit unário `~` inverte um padrão de bits; ele pode ser aplicado a qualquer um dos tipos integrais, transformando cada "0" em "1" e cada "1" em "0". Por exemplo, um byte contém 8 bits; aplicar este operador a um valor cujo padrão de bits é `00000000` mudaria seu padrão para `11111111`.

O operador de deslocamento à esquerda com sinal `<<` desloca um padrão de bits para a esquerda, e o operador de deslocamento à direita com sinal `>>` desloca um padrão de bits para a direita. O padrão de bits é dado pelo operando da esquerda, e o número de posições a deslocar pelo operando da direita. O operador de deslocamento à direita sem sinal `>>>` desloca um zero para a posição mais à esquerda, enquanto a posição mais à esquerda após `>>` depende da extensão de sinal.

O operador bit a bit `&` realiza uma operação AND bit a bit.

O operador bit a bit `^` realiza uma operação OR exclusivo bit a bit.

O operador bit a bit `|` realiza uma operação OR inclusivo bit a bit.

O programa a seguir, `BitDemo`, usa o operador AND bit a bit para imprimir o número "2" na saída padrão.

```java
class BitDemo {
    public static void main(String[] args) {
        int bitmask = 0x000F;
        int val = 0x2222;
        // prints "2"
        System.out.println(val & bitmask);
    }
}
```

### Neste tutorial

Operadores
O Operador de Atribuição Simples
Os Operadores Aritméticos
Os Operadores Unários
Os Operadores de Igualdade e Relacionais
Os Operadores Condicionais
O Operador de Comparação de Tipo Instanceof
Operadores Bit a Bit e de Deslocamento de Bits

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Usando o Identificador de Tipo Var](<#/doc/tutorials/language-basics/using-var>)

➜

**Tutorial Atual**

Usando Operadores em Seus Programas

➜

**Próximo na Série**

[Resumo dos Operadores](<#/doc/tutorials/language-basics/all-operators>)

**Anterior na Série:** [Usando o Identificador de Tipo Var](<#/doc/tutorials/language-basics/using-var>)

**Próximo na Série:** [Resumo dos Operadores](<#/doc/tutorials/language-basics/all-operators>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos da Linguagem Java ](<#/doc/tutorials/language-basics>) > Usando Operadores em Seus Programas