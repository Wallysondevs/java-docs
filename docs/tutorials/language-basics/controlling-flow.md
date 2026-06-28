# Instruções de Controle de Fluxo

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos da Linguagem Java ](<#/doc/tutorials/language-basics>) > Instruções de Controle de Fluxo

**Anterior na Série**

[Expressões, Instruções e Blocos](<#/doc/tutorials/language-basics/expressions-statements-blocks>)

➜

**Tutorial Atual**

Instruções de Controle de Fluxo

➜

**Próximo na Série**

[Ramificação com Instruções Switch](<#/doc/tutorials/language-basics/switch-statement>)

**Anterior na Série:** [Expressões, Instruções e Blocos](<#/doc/tutorials/language-basics/expressions-statements-blocks>)

**Próximo na Série:** [Ramificação com Instruções Switch](<#/doc/tutorials/language-basics/switch-statement>)

# Instruções de Controle de Fluxo

## A Instrução If-Then

A instrução `if-then` é a mais básica de todas as instruções de controle de fluxo. Ela instrui seu programa a executar uma determinada seção de código somente se um teste específico for avaliado como `true`. Por exemplo, a classe `Bicycle` poderia permitir que os freios diminuíssem a velocidade da bicicleta apenas se a bicicleta já estivesse em movimento. Uma possível implementação do método `applyBrakes()` poderia ser a seguinte:

```java
void applyBrakes() {
    // the "if" clause: if (isMoving)
    if (isMoving) {
        // the "then" clause: decrease currentSpeed
        currentSpeed--;
    }
}
```

Se este teste for avaliado como `false` (o que significa que a bicicleta não está em movimento), o controle salta para o final da instrução `if-then`.

Além disso, as chaves de abertura e fechamento são opcionais, desde que a cláusula "then" contenha apenas uma instrução:

```java
void applyBrakes() {
    if (isMoving)
        currentSpeed--;
}
```

Decidir quando omitir as chaves é uma questão de gosto pessoal. Omiti-las pode tornar o código mais frágil. Se uma segunda instrução for adicionada posteriormente à cláusula "then", um erro comum seria esquecer de adicionar as chaves recém-necessárias. O compilador não consegue detectar esse tipo de erro; você apenas obterá resultados errados.

## A Instrução If-Then-Else

A instrução `if-then-else` fornece um caminho secundário de execução quando uma cláusula "if" é avaliada como `false`. Você poderia usar uma instrução `if-then-else` no método `applyBrakes()` para realizar alguma ação se os freios forem aplicados quando a bicicleta não estiver em movimento. Neste caso, a ação é simplesmente imprimir uma mensagem de erro informando que a bicicleta já parou.

```java
void applyBrakes() {
    if (isMoving) {
        currentSpeed--;
    } else {
        System.err.println("The bicycle has already stopped.");
    }
}
```

O programa a seguir, `IfElseDemo`, atribui uma nota com base no valor de uma pontuação de teste: um A para uma pontuação de 90% ou mais, um B para uma pontuação de 80% ou mais, e assim por diante.

```java
class IfElseDemo {
    public static void main(String[] args) {
        int testscore = 76;
        char grade;

        if (testscore >= 90) {
            grade = 'A';
        } else if (testscore >= 80) {
            grade = 'B';
        } else if (testscore >= 70) {
            grade = 'C';
        } else if (testscore >= 60) {
            grade = 'D';
        } else {
            grade = 'F';
        }
        System.out.println("Grade = " + grade);
    }
}
```

A saída do programa é:

```
Grade = C
```

Você deve ter notado que o valor de `testscore` pode satisfazer mais de uma expressão na instrução composta: `76 >= 70` e `76 >= 60`. No entanto, uma vez que uma condição é satisfeita, as instruções apropriadas são executadas (`grade = 'C';`) e as condições restantes não são avaliadas.

## As Instruções While e Do-while

A instrução `while` executa continuamente um bloco de instruções enquanto uma condição particular é `true`. Sua sintaxe pode ser expressa como:

```java
while (expression) {
     statement(s)
}
```

A instrução `while` avalia a `expression`, que deve retornar um valor `boolean`. Se a expressão for avaliada como `true`, a instrução `while` executa as `statement(s)` no bloco `while`. A instrução `while` continua testando a expressão e executando seu bloco até que a expressão seja avaliada como `false`. Usar a instrução `while` para imprimir os valores de 1 a 10 pode ser realizado como no seguinte programa `WhileDemo`:

```java
class WhileDemo {
    public static void main(String[] args){
        int count = 1;
        while (count < 11) {
            System.out.println("Count is: " + count);
            count++;
        }
    }
}
```

Você pode implementar um loop infinito usando a instrução `while` da seguinte forma:

```java
while (true){
    // your code goes here
}
```

A linguagem de programação Java também fornece uma instrução `do-while`, que pode ser expressa da seguinte forma:

```java
do {
     statement(s)
} while (expression);
```

A diferença entre `do-while` e `while` é que `do-while` avalia sua expressão no final do loop em vez de no início. Portanto, as instruções dentro do bloco `do` são sempre executadas pelo menos uma vez, como mostrado no seguinte programa `DoWhileDemo`:

```java
class DoWhileDemo {
    public static void main(String[] args){
        int count = 1;
        do {
            System.out.println("Count is: " + count);
            count++;
        } while (count < 11);
    }
}
```

## A Instrução For

A instrução `for` fornece uma maneira compacta de iterar sobre um intervalo de valores. Os programadores frequentemente se referem a ela como o "for loop" devido à maneira como ela se repete até que uma condição particular seja satisfeita. A forma geral da instrução `for` pode ser expressa da seguinte forma:

```java
for (initialization; termination; increment) {
    statement(s)
}
```

Ao usar esta versão da instrução `for`, tenha em mente que:

*   A expressão de _inicialização_ inicializa o loop; ela é executada uma vez, quando o loop começa.
*   Quando a expressão de _terminação_ avalia como `false`, o loop termina.
*   A expressão de _incremento_ é invocada após cada iteração do loop; é perfeitamente aceitável que esta expressão incremente _ou_ decremente um valor.

O programa a seguir, `ForDemo`, usa a forma geral da instrução `for` para imprimir os números de 1 a 10 na saída padrão:

```java
class ForDemo {
    public static void main(String[] args){
        for (int i = 1; i < 11; i++){
            System.out.println("Count is: " + i);
        }
    }
}
```

A saída deste programa é:

```
Count is: 1
Count is: 2
Count is: 3
Count is: 4
Count is: 5
Count is: 6
Count is: 7
Count is: 8
Count is: 9
Count is: 10
```

Observe como o código declara uma variável dentro da expressão de inicialização. O escopo desta variável se estende de sua declaração até o final do bloco governado pela instrução `for`, então ela pode ser usada nas expressões de terminação e incremento também. Se a variável que controla uma instrução `for` não for necessária fora do loop, é melhor declarar a variável na expressão de inicialização. Os nomes `i`, `j` e `k` são frequentemente usados para controlar `for` loops; declará-los dentro da expressão de inicialização limita sua vida útil e reduz erros.

As três expressões do `for` loop são opcionais; um loop infinito pode ser criado da seguinte forma:

```java
for ( ; ; ) {
    // your code goes here
}
```

A instrução `for` também tem outra forma projetada para iteração através de Collections e arrays. Esta forma é às vezes referida como a instrução _enhanced for_, e pode ser usada para tornar seus loops mais compactos e fáceis de ler. Para demonstrar, considere o seguinte array, que contém os números de 1 a 10:

```java
int[] numbers = {1,2,3,4,5,6,7,8,9,10};
```

O programa a seguir, `EnhancedForDemo`, usa o _enhanced for_ para iterar pelo array:

```java
class EnhancedForDemo {
    public static void main(String[] args){
        int[] numbers = {1,2,3,4,5,6,7,8,9,10};
        for (int item : numbers) {
            System.out.println("Count is: " + item);
        }
    }
}
```

Neste exemplo, a variável `item` contém o valor atual do array `numbers`. A saída deste programa é a mesma de antes:

```
Count is: 1
Count is: 2
Count is: 3
Count is: 4
Count is: 5
Count is: 6
Count is: 7
Count is: 8
Count is: 9
Count is: 10
```

Recomendamos usar esta forma da instrução `for` em vez da forma geral sempre que possível.

## A Instrução Break

A instrução `break` tem duas formas: rotulada e não rotulada. Você viu a forma não rotulada na discussão anterior da instrução `switch`. Você também pode usar um `break` não rotulado para encerrar um loop `for`, `while` ou `do-while`, como mostrado no seguinte programa `BreakDemo`:

```java
class BreakDemo {
    public static void main(String[] args) {

        int[] arrayOfInts =
            { 32, 87, 3, 589,
              12, 1076, 2000,
              8, 622, 127 };
        int searchfor = 12;

        int i;
        boolean foundIt = false;

        for (i = 0; i < arrayOfInts.length; i++) {
            if (arrayOfInts[i] == searchfor) {
                foundIt = true;
                break;
            }
        }

        if (foundIt) {
            System.out.println("Found " + searchfor + " at index " + i);
        } else {
            System.out.println(searchfor + " not in the array");
        }
    }
}
```

Este programa procura pelo número 12 em um array. A instrução `break` encerra o `for` loop quando esse valor é encontrado. O fluxo de controle então é transferido para a instrução após o `for` loop. A saída deste programa é:

```
Found 12 at index 4
```

Uma instrução `break` não rotulada encerra a instrução `switch`, `for`, `while` ou `do-while` mais interna, mas um `break` rotulado encerra uma instrução externa. O programa a seguir, `BreakWithLabelDemo`, é semelhante ao programa anterior, mas usa `for` loops aninhados para procurar um valor em um array bidimensional. Quando o valor é encontrado, um `break` rotulado encerra o `for` loop externo (rotulado "search"):

```java
class BreakWithLabelDemo {
    public static void main(String[] args) {

        int[][] arrayOfInts = {
            { 32, 87, 3, 589 },
            { 12, 1076, 2000, 8 },
            { 622, 127, 77, 955 }
        };
        int searchfor = 12;

        int i;
        int j = 0;
        boolean foundIt = false;

    search:
        for (i = 0; i < arrayOfInts.length; i++) {
            for (j = 0; j < arrayOfInts[i].length;
                 j++) {
                if (arrayOfInts[i][j] == searchfor) {
                    foundIt = true;
                    break search;
                }
            }
        }

        if (foundIt) {
            System.out.println("Found " + searchfor + " at " + i + ", " + j);
        } else {
            System.out.println(searchfor + " not in the array");
        }
    }
}
```

Esta é a saída do programa.

```
Found 12 at 1, 0
```

A instrução `break` encerra a instrução rotulada; ela não transfere o fluxo de controle para o rótulo. O fluxo de controle é transferido para a instrução imediatamente após a instrução rotulada (encerrada).

## A Instrução Continue

A instrução `continue` pula a iteração atual de um loop `for`, `while` ou `do-while`. A forma não rotulada pula para o final do corpo do loop mais interno e avalia a expressão booleana que controla o loop. O programa a seguir, `ContinueDemo`, percorre uma `String`, contando as ocorrências da letra `p`. Se o caractere atual não for um `p`, a instrução `continue` pula o restante do loop e prossegue para o próximo caractere. Se for um `p`, o programa incrementa a contagem da letra.

```java
class ContinueDemo {
    public static void main(String[] args) {
        String searchMe = "peter piper picked a peck of pickled peppers";
        int max = searchMe.length();
        int numPs = 0;

        for (int i = 0; i < max; i++) {
            // interested only in p's
            if (searchMe.charAt(i) != 'p')
                continue;

            numPs++;
        }
        System.out.println("Found " + numPs + " p's in the string.");
    }
}
```

Aqui está a saída deste programa:

```
Found 9 p's in the string.
```

Para ver este efeito mais claramente, tente remover a instrução `continue` e recompilar. Quando você executar o programa novamente, a contagem estará errada, dizendo que encontrou 35 `p`'s em vez de 9.

Uma instrução `continue` rotulada pula a iteração atual de um loop externo marcado com o rótulo fornecido. O exemplo de programa a seguir, `ContinueWithLabelDemo`, usa loops aninhados para procurar uma substring dentro de outra string. Dois loops aninhados são necessários: um para iterar sobre a substring e outro para iterar sobre a string que está sendo pesquisada. O programa a seguir, `ContinueWithLabelDemo`, usa o `test` rotulado de `continue` para pular uma iteração no loop externo.

```java
class ContinueWithLabelDemo {
    public static void main(String[] args) {
        String searchMe = "Look for a substring in me";
        String substring = "sub";
        boolean foundIt = false;

        int max = searchMe.length() - substring.length();

    test:
        for (int i = 0; i <= max; i++) {
            int n = substring.length();
            int j = i;
            int k = 0;
            while (n-- != 0) {
                if (searchMe.charAt(j++) != substring.charAt(k++)) {
                    continue test;
                }
            }
            foundIt = true;
            break test;
        }
        System.out.println(foundIt ? "Found it" : "Didn't find it");
    }
}
```

Aqui está a saída deste programa.

```
Found it
```

## A Instrução Return

A próxima instrução de ramificação é a instrução `return`. A instrução `return` sai do método atual, e o fluxo de controle retorna para onde o método foi invocado. A instrução `return` tem duas formas: uma que retorna um valor e outra que não retorna. Para retornar um valor, basta colocar o valor (ou uma expressão que calcula o valor) após a palavra-chave `return`.

```java
return ++count;
```

O tipo de dado do valor retornado deve corresponder ao tipo do valor `return` declarado do método. Quando um método é declarado `void`, use a forma de `return` que não retorna um valor.

```java
return;
```

A seção Classes e Objetos cobrirá tudo o que você precisa saber sobre como escrever métodos.

## A Instrução Yield

A última instrução de ramificação é a instrução `yield`. A instrução `yield` sai da expressão `switch` atual em que está. Uma instrução `yield` é sempre seguida por uma expressão que deve produzir um valor. Esta expressão não deve ser `void`. O valor desta expressão é o valor produzido pela expressão `switch` envolvente.

Aqui está um exemplo de uma instrução `yield`.

```java
int k = switch (day) {
    case MONDAY, FRIDAY, SUNDAY -> 6;
    case TUESDAY                -> 7;
    case THURSDAY, SATURDAY     -> 8;
    case WEDNESDAY              -> 9;
    default -> {
        System.out.println("Looking forward to the Weekend");
        yield 0;
    }
};
```

### Neste tutorial

A Instrução If-Then A Instrução If-Then-Else As Instruções While e Do-While A Instrução For A Instrução Break A Instrução Continue A Instrução Return A Instrução Yield

Última atualização: 22 de setembro de 2021

**Anterior na Série**

[Expressões, Instruções e Blocos](<#/doc/tutorials/language-basics/expressions-statements-blocks>)

➜

**Tutorial Atual**

Instruções de Controle de Fluxo

➜

**Próximo na Série**

[Ramificação com Instruções Switch](<#/doc/tutorials/language-basics/switch-statement>)

**Anterior na Série:** [Expressões, Instruções e Blocos](<#/doc/tutorials/language-basics/expressions-statements-blocks>)

**Próximo na Série:** [Ramificação com Instruções Switch](<#/doc/tutorials/language-basics/switch-statement>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos da Linguagem Java ](<#/doc/tutorials/language-basics>) > Instruções de Controle de Fluxo