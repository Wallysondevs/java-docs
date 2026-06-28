# Expressões, Declarações e Blocos

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos da Linguagem Java ](<#/doc/tutorials/language-basics>) > Expressões, Declarações e Blocos

**Anterior na Série**

[Resumo de Operadores](<#/doc/tutorials/language-basics/all-operators>)

➜

**Tutorial Atual**

Expressões, Declarações e Blocos

➜

**Próximo na Série**

[Declarações de Controle de Fluxo](<#/doc/tutorials/language-basics/controlling-flow>)

**Anterior na Série:** [Resumo de Operadores](<#/doc/tutorials/language-basics/all-operators>)

**Próximo na Série:** [Declarações de Controle de Fluxo](<#/doc/tutorials/language-basics/controlling-flow>)

# Expressões, Declarações e Blocos

## Expressões

Uma _expressão_ é uma construção composta por variáveis, operadores e invocações de métodos, que são construídos de acordo com a sintaxe da linguagem, e que avalia para um único valor. Você já viu exemplos de expressões, ilustrados no código abaixo:

```java
int cadence = 0;
AnArray[0] = 100;
System.out.println("Element 1 of AnArray: " + AnArray[0]);
int result = 1 + 2; // result is now 3
if (value1 == value2)
    System.out.println("value1 == value2");
```

O tipo de dado do valor retornado por uma expressão depende dos elementos usados na expressão. A expressão `cadence = 0` retorna um `int` porque o operador de atribuição retorna um valor do mesmo tipo de dado que seu operando esquerdo; neste caso, `cadence` é um `int`. Como você pode ver nas outras expressões, uma expressão pode retornar outros tipos de valores também, como `boolean` ou `String`.

A linguagem de programação Java permite construir expressões compostas a partir de várias expressões menores, desde que o tipo de dado exigido por uma parte da expressão corresponda ao tipo de dado da outra. Aqui está um exemplo de uma expressão composta:

```java
1 * 2 * 3
```

Neste exemplo particular, a ordem em que a expressão é avaliada é sem importância porque o resultado da multiplicação é independente da ordem; o resultado é sempre o mesmo, não importa em que ordem você aplique as multiplicações. No entanto, isso não é verdade para todas as expressões. Por exemplo, a seguinte expressão fornece resultados diferentes, dependendo se você executa a operação de adição ou a de divisão primeiro:

```java
x + y / 100    // ambíguo
```

Você pode especificar exatamente como uma expressão será avaliada usando parênteses balanceados: `(` e `)`. Por exemplo, para tornar a expressão anterior inequívoca, você poderia escrever o seguinte:

```java
(x + y) / 100  // inequívoco
```

Se você não indicar explicitamente a ordem em que as operações devem ser realizadas, a ordem é determinada pela precedência atribuída aos operadores em uso dentro da expressão. Operadores que têm uma precedência maior são avaliados primeiro. Por exemplo, o operador de divisão tem uma precedência maior do que o operador de adição. Portanto, as duas declarações a seguir são equivalentes:

```java
int i = 14;
int j = 2;
int k = 3;
int l = i + j / k; // l é 14
int m = i + (j / k); // m é 14
```

Ao escrever expressões compostas, seja explícito e indique com parênteses quais operadores devem ser avaliados primeiro. Essa prática torna o código mais fácil de ler e manter.

## Aritmética de Ponto Flutuante

A aritmética de ponto flutuante é um mundo especial no qual operações comuns podem se comportar de forma inesperada. Considere o seguinte código.

```java
System.out.println(0.1 + 0.2 == 0.3);
```

Você provavelmente esperaria que ele imprimisse `true`. Devido à forma como a adição de ponto flutuante é realizada e arredondada, ele imprime `false`.

Apresentar como a aritmética de ponto flutuante é implementada em Java está além do escopo deste tutorial. Se você precisar aprender mais sobre este tópico, pode assistir ao seguinte vídeo.

## Declarações

Declarações são aproximadamente equivalentes a frases em linguagens naturais. Uma declaração forma uma unidade completa de execução. Os seguintes tipos de expressões podem ser transformados em uma declaração terminando a expressão com um ponto e vírgula (`;`).

  * Expressões de atribuição
  * Qualquer uso de `++` ou `--`
  * Invocações de método
  * Expressões de criação de objeto
  * Tais declarações são chamadas de declarações de expressão. Aqui estão alguns exemplos de declarações de expressão.

```java
aValue = 8933.234;
aValue++;
System.out.println("Hello World!");
Bicycle myBike = new Bicycle();
```

Além das declarações de expressão, existem outros dois tipos de declarações: declarações de declaração e declarações de controle de fluxo. Uma declaração de declaração declara uma variável. Você já viu muitos exemplos de declarações de declaração:

```java
double aValue = 8933.234;
```

Finalmente, as declarações de controle de fluxo regulam a ordem em que as declarações são executadas. Você aprenderá sobre declarações de controle de fluxo na próxima seção, Declarações de Controle de Fluxo.

## Blocos

Um _bloco_ é um grupo de zero ou mais declarações entre chaves balanceadas e pode ser usado em qualquer lugar onde uma única declaração é permitida. O exemplo a seguir, `BlockDemo`, ilustra o uso de blocos:

```java
class BlockDemo {
    public static void main(String[] args) {
        boolean condition = true;
        if (condition) {
            System.out.println("Condition is true.");
        } else {
            System.out.println("Condition is false.");
        }
    }
}
```

### Neste tutorial

Expressões Aritmética de Ponto Flutuante Declarações Blocos

Última atualização: 22 de setembro de 2021

**Anterior na Série**

[Resumo de Operadores](<#/doc/tutorials/language-basics/all-operators>)

➜

**Tutorial Atual**

Expressões, Declarações e Blocos

➜

**Próximo na Série**

[Declarações de Controle de Fluxo](<#/doc/tutorials/language-basics/controlling-flow>)

**Anterior na Série:** [Resumo de Operadores](<#/doc/tutorials/language-basics/all-operators>)

**Próximo na Série:** [Declarações de Controle de Fluxo](<#/doc/tutorials/language-basics/controlling-flow>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos da Linguagem Java ](<#/doc/tutorials/language-basics>) > Expressões, Declarações e Blocos