# Criando Arrays em Seus Programas

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos da Linguagem Java ](<#/doc/tutorials/language-basics>) > Criando Arrays em Seus Programas

**Anterior na Série**

[Criando Variáveis de Tipos Primitivos em Seus Programas](<#/doc/tutorials/language-basics/primitive-types>)

➜

**Tutorial Atual**

Criando Arrays em Seus Programas

➜

**Próximo na Série**

[Usando o Identificador de Tipo Var](<#/doc/tutorials/language-basics/using-var>)

**Anterior na Série:** [Criando Variáveis de Tipos Primitivos em Seus Programas](<#/doc/tutorials/language-basics/primitive-types>)

**Próximo na Série:** [Usando o Identificador de Tipo Var](<#/doc/tutorials/language-basics/using-var>)

# Criando Arrays em Seus Programas

## Arrays

Um _array_ é um objeto contêiner que armazena um número fixo de valores de um único tipo. O comprimento de um array é estabelecido quando o array é criado. Após a criação, seu comprimento é fixo. Você já viu um exemplo de arrays, no método main da aplicação "Hello World!". Esta seção discute arrays em maior detalhe.

Se você está ansioso para praticar a criação e manipulação de arrays, pode pular diretamente para o final desta página: [Praticando Criação e Manipulação de Arrays](<#/doc/tutorials/language-basics/arrays>)

Um array de 8 elementos.

Cada item em um array é chamado de _elemento_, e cada elemento é acessado por seu _índice_ numérico. Como mostrado na ilustração anterior, a numeração começa com 0. O 6º elemento, por exemplo, seria, portanto, acessado no índice 5.

O exemplo a seguir cria um array de inteiros, insere alguns valores no array e imprime cada valor na saída padrão.

```java
class ArrayDemo {
    public static void main(String[] args) {
        // declara um array de inteiros
        int[] anArray;

        // aloca memória para 10 inteiros
        anArray = new int[10];

        // inicializa o primeiro elemento
        anArray[0] = 100;
        // inicializa o segundo elemento
        anArray[1] = 200;
        // e assim por diante
        anArray[2] = 300;
        anArray[3] = 400;
        anArray[4] = 500;
        anArray[5] = 600;
        anArray[6] = 700;
        anArray[7] = 800;
        anArray[8] = 900;
        anArray[9] = 1000;

        System.out.println("Elemento no índice 0: "
                           + anArray[0]);
        System.out.println("Elemento no índice 1: "
                           + anArray[1]);
        System.out.println("Elemento no índice 2: "
                           + anArray[2]);
        System.out.println("Elemento no índice 3: "
                           + anArray[3]);
        System.out.println("Elemento no índice 4: "
                           + anArray[4]);
        System.out.println("Elemento no índice 5: "
                           + anArray[5]);
        System.out.println("Elemento no índice 6: "
                           + anArray[6]);
        System.out.println("Elemento no índice 7: "
                           + anArray[7]);
        System.out.println("Elemento no índice 8: "
                           + anArray[8]);
        System.out.println("Elemento no índice 9: "
                           + anArray[9]);
    }
}
```

A saída deste programa é:

```
Elemento no índice 0: 100
Elemento no índice 1: 200
Elemento no índice 2: 300
Elemento no índice 3: 400
Elemento no índice 4: 500
Elemento no índice 5: 600
Elemento no índice 6: 700
Elemento no índice 7: 800
Elemento no índice 8: 900
Elemento no índice 9: 1000
```

Em uma situação de programação do mundo real, você provavelmente usaria uma das construções de loop suportadas para iterar por cada elemento do array, em vez de escrever cada linha individualmente como no exemplo anterior. No entanto, o exemplo ilustra claramente a sintaxe do array. Você aprenderá sobre as várias construções de loop (for, while e do-while) na seção [Controle de Fluxo](<#/doc/tutorials/language-basics/controlling-flow>).

## Declarando uma Variável para Referenciar um Array

Seu programa pode declarar um array (chamado `anArray`) com a seguinte linha de código:

```java
int[] anArray;
```

Assim como as declarações para variáveis de outros tipos, uma declaração de array tem dois componentes: o tipo do array e o nome do array. O tipo de um array é escrito como `type[]`, onde `type` é o tipo de dado dos elementos contidos; os colchetes são símbolos especiais que indicam que esta variável armazena um array. O tamanho do array não faz parte de seu tipo (razão pela qual os colchetes estão vazios). O nome de um array pode ser o que você quiser, desde que siga as regras e convenções discutidas na seção [Classes](<#/doc/tutorials/classes-objects/creating-classes>). Assim como acontece com variáveis de outros tipos, a declaração não cria realmente um array; ela simplesmente informa ao compilador que esta variável armazenará um array do tipo especificado.

Da mesma forma, você pode declarar arrays de outros tipos:

```java
byte[] anArrayOfBytes;
short[] anArrayOfShorts;
long[] anArrayOfLongs;
float[] anArrayOfFloats;
double[] anArrayOfDoubles;
boolean[] anArrayOfBooleans;
char[] anArrayOfChars;
String[] anArrayOfStrings;
```

Você também pode colocar os colchetes após o nome do array, embora esta não seja a sintaxe recomendada.

```java
float anArrayOfFloats[]; // esta forma é desencorajada
```

No entanto, a convenção desencoraja esta forma; os colchetes identificam o tipo do array e devem aparecer com a designação do tipo.

## Criando, Inicializando e Acessando um Array

Uma maneira de criar um array é com o operador `new`. A próxima instrução aloca um array com memória suficiente para 10 elementos inteiros e atribui o array à variável `anArray`.

```java
anArray = new int[10];
```

Se esta instrução estiver faltando, você receberá um erro de compilador.

As próximas linhas atribuem valores a cada elemento do array:

```java
anArray[0] = 100;
anArray[1] = 200;
anArray[2] = 300;
anArray[3] = 400;
anArray[4] = 500;
anArray[5] = 600;
anArray[6] = 700;
anArray[7] = 800;
anArray[8] = 900;
anArray[9] = 1000;
```

Cada elemento do array é acessado por seu índice numérico:

```java
System.out.println("Elemento no índice 0: " + anArray[0]);
System.out.println("Elemento no índice 1: " + anArray[1]);
System.out.println("Elemento no índice 9: " + anArray[9]);
```

Alternativamente, você pode usar a sintaxe de atalho para criar e inicializar um array:

```java
int[] anArray = {
    100, 200, 300,
    400, 500, 600,
    700, 800, 900, 1000
};
```

Aqui o comprimento do array é determinado pelo número de valores fornecidos entre chaves e separados por vírgulas.

## Criando Arrays Multidimensionais

Como um array pode conter qualquer referência, e como um array é ele próprio uma referência, você pode facilmente criar arrays de arrays.

Arrays de arrays também são conhecidos como arrays multidimensionais. Você pode declará-los usando dois ou mais conjuntos de colchetes, como `String[][] names`. Cada elemento, portanto, deve ser acessado por um número correspondente de valores de índice.

Na linguagem de programação Java, um array multidimensional é um array cujos componentes são eles próprios arrays. Isso é diferente dos arrays em C ou Fortran, onde um array bidimensional é uma zona contígua de memória, acessada diretamente usando um ponteiro. Em Java, um array é uma zona contígua de memória, mas como um array bidimensional é um array de referências, ele não é ele próprio uma zona contígua de memória.

Uma consequência disso é que as linhas podem variar em comprimento, como mostrado no exemplo a seguir.

```java
class MultiDimArrayDemo {
    public static void main(String[] args) {
        String[][] names = {
            {"Sr. ", "Sra. ", "Srtª. "},
            {"Smith", "Jones"}
        };
        System.out.println(names[0][0] + names[1][0]); // Sr. Smith
        System.out.println(names[0][2] + names[1][1]); // Srtª. Jones
    }
}
```

A execução do código anterior imprime o seguinte.

```
Sr. Smith
Srtª. Jones
```

Esses arrays são às vezes chamados de arrays irregulares, ou arrays denteados (jagged arrays).

## Usando o Comprimento de um Array

Finalmente, você pode usar a propriedade `length` embutida definida em qualquer array para determinar o tamanho deste array. O código a seguir imprime o tamanho do array na saída padrão:

```java
System.out.println(anArray.length);
```

Isso é especialmente útil para arrays de arrays, nos quais cada array pode ter um comprimento diferente. Seu código não deve assumir que todos esses arrays têm o mesmo comprimento, e deve depender desta propriedade `length`, como no código a seguir.

```java
class ArrayLengthDemo {
    public static void main(String[] args) {
        String[][] names = {
            {"Sr. ", "Sra. ", "Srtª. "},
            {"Smith", "Jones", "Doe"}
        };
        System.out.println("Número de linhas: " + names.length);
        System.out.println("Número de colunas na primeira linha: " + names[0].length);
        System.out.println("Número de colunas na segunda linha: " + names[1].length);
    }
}
```

Este código imprime o seguinte.

```
Número de linhas: 2
Número de colunas na primeira linha: 3
Número de colunas na segunda linha: 3
```

## Copiando Arrays

A classe [`System`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/System.html>) possui um método [`arraycopy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/System.html#arraycopy\(java.lang.Object,int,java.lang.Object,int,int\)>) que você pode usar para copiar dados de forma eficiente de um array para outro:

```java
public static void arraycopy(Object src, int srcPos,
                             Object dest, int destPos, int length)
```

Os dois argumentos `Object` especificam o array de origem e o array de destino. Os três argumentos `int` especificam a posição inicial no array de origem, a posição inicial no array de destino e o número de elementos do array a serem copiados.

O exemplo a seguir declara um array de elementos `String`. Ele usa o método [`System.arraycopy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/System.html#arraycopy\(java.lang.Object,int,java.lang.Object,int,int\)>) para copiar uma subsequência de componentes do array para um segundo array:

```java
class ArrayCopyDemo {
    public static void main(String[] args) {
        String[] copyFrom = {
            "Affogato", "Americano", "Cappuccino", "Corretto", "Cortado",
            "Doppio", "Espresso", "Frappucino", "Freddo", "Lungo", "Macchiato",
            "Marocchino", "Ristretto" };
        String[] copyTo = new String[7];
        System.arraycopy(copyFrom, 2, copyTo, 0, 7);
        for (String coffee : copyTo) {
            System.out.print(coffee + " ");
        }
    }
}
```

A execução do código anterior imprime o seguinte.

```
Cappuccino Corretto Cortado Doppio Espresso Frappucino Freddo
```

## Manipulações de Array

Arrays são um conceito poderoso e útil usado em programação. Java SE fornece métodos para realizar algumas das manipulações mais comuns relacionadas a arrays.

O exemplo anterior usa o método [`arraycopy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/System.html#arraycopy\(java.lang.Object,int,java.lang.Object,int,int\)>) da classe [`System`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/System.html>) em vez de iterar manualmente pelos elementos do array de origem e colocar cada um no array de destino. Isso é realizado nos bastidores, permitindo ao desenvolvedor usar apenas uma linha de código para chamar o método.

Outras tarefas comuns, como copiar, ordenar e pesquisar arrays, são implementadas por métodos da classe [`Arrays`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html>). Por exemplo, o exemplo anterior pode ser modificado para usar o método [`Arrays.copyOfRange()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html#copyOfRange\(T%5B%5D,int,int\)>) da classe [`Arrays`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html>). A diferença é que usar o método [`Arrays.copyOfRange()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html#copyOfRange\(T%5B%5D,int,int\)>) não exige que você crie o array de destino antes de chamar o método, pois o array de destino é retornado pelo método. Observe que este método possui várias sobrecargas para acomodar arrays de tipos primitivos.

```java
import java.util.Arrays;
class ArrayCopyOfRangeDemo {
    public static void main(String[] args) {
        String[] copyFrom = {
            "Affogato", "Americano", "Cappuccino", "Corretto", "Cortado",
            "Doppio", "Espresso", "Frappucino", "Freddo", "Lungo", "Macchiato",
            "Marocchino", "Ristretto" };
        String[] copyTo = Arrays.copyOfRange(copyFrom, 2, 9);
        for (String coffee : copyTo) {
            System.out.print(coffee + " ");
        }
    }
}
```

Como você pode ver, a saída deste programa é a mesma, embora exija menos linhas de código. Observe que o segundo parâmetro do método [`Arrays.copyOfRange()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html#copyOfRange\(T%5B%5D,int,int\)>) é o índice inicial do intervalo a ser copiado, inclusivamente, enquanto o terceiro parâmetro é o índice final do intervalo a ser copiado, exclusivamente. Neste exemplo, o intervalo a ser copiado não inclui o elemento do array no índice 9 (que contém a string `Lungo`).

Algumas outras operações úteis fornecidas por métodos na classe [`Arrays`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html>) são:

*   Pesquisar um array por um valor específico para obter o índice em que ele está posicionado (o método [`binarySearch()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html#binarySearch\(int%5B%5D,int\)>)).
*   Comparar dois arrays para determinar se são iguais ou não (o método [`equals()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html#equals\(int%5B%5D,int%5B%5D\)>)).
*   Preencher um array para colocar um valor específico em cada índice (o método [`fill()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html#fill\(int%5B%5D,int\)>)).
*   Ordenar um array em ordem crescente. Isso pode ser feito sequencialmente, usando o método [`sort()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html#sort\(int%5B%5D\)>), ou concorrentemente, usando o método [`parallelSort()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html#parallelSort\(int%5B%5D\)>) introduzido no Java SE 8. A ordenação paralela de grandes arrays em sistemas multiprocessadores é mais rápida do que a ordenação sequencial de arrays.
*   Criar um stream que usa um array como sua fonte (o método [`stream()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html#stream\(int%5B%5D\)>)). Por exemplo, a seguinte instrução imprime o conteúdo do array `coffees` da mesma forma que no exemplo anterior:

```java
import java.util.Arrays;
class ArrayStreamDemo {
    public static void main(String[] args) {
        String[] coffees = {
            "Affogato", "Americano", "Cappuccino", "Corretto", "Cortado",
            "Doppio", "Espresso", "Frappucino", "Freddo", "Lungo", "Macchiato",
            "Marocchino", "Ristretto" };
        Arrays.stream(coffees).forEach(coffee -> System.out.print(coffee + " "));
    }
}
```

Você pode verificar a [seção sobre Streams](<#/doc/tutorials/api/streams>) para mais informações.

*   Converter um array para uma string. O método [`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html#toString\(int%5B%5D\)>) converte cada elemento do array para uma string, os separa com vírgulas e os envolve com colchetes. Por exemplo, a seguinte instrução converte o array `coffees` para uma string e o imprime:

```java
import java.util.Arrays;
class ArrayToStringDemo {
    public static void main(String[] args) {
        String[] coffees = {
            "Affogato", "Americano", "Cappuccino", "Corretto", "Cortado",
            "Doppio", "Espresso", "Frappucino", "Freddo", "Lungo", "Macchiato",
            "Marocchino", "Ristretto" };
        System.out.println(Arrays.toString(coffees));
    }
}
```

A execução do código anterior imprime o seguinte.

```
[Affogato, Americano, Cappuccino, Corretto, Cortado, Doppio, Espresso, Frappucino, Freddo, Lungo, Macchiato, Marocchino, Ristretto]
```

## Concluindo Variáveis e Arrays

A linguagem de programação Java usa tanto "fields" quanto "variables" como parte de sua terminologia. Variáveis de instância (fields não-estáticos) são únicas para cada instância de uma classe. Variáveis de classe (fields estáticos) são fields declarados com o modificador `static`; existe exatamente uma cópia de uma variável de classe, independentemente de quantas vezes a classe tenha sido instanciada. Variáveis locais armazenam estado temporário dentro de um método. Parâmetros são variáveis que fornecem informações extras a um método; tanto variáveis locais quanto parâmetros são sempre classificados como "variáveis" (não "fields"). Ao nomear seus fields ou variáveis, existem regras e convenções que você deve (ou precisa) seguir.

Os oito tipos de dados primitivos são: `byte`, `short`, `int`, `long`, `float`, `double`, `boolean` e `char`. A classe `java.lang.String` representa cadeias de caracteres. O compilador atribuirá um valor padrão razoável para fields dos tipos acima; para variáveis locais, um valor padrão nunca é atribuído.

Um literal é a representação em código-fonte de um valor fixo. Um array é um objeto contêiner que armazena um número fixo de valores de um único tipo. O comprimento de um array é estabelecido quando o array é criado. Após a criação, seu comprimento é fixo.

## Praticando Criação e Manipulação de Arrays

### Criando e Preenchendo Arrays

Você pode começar com a criação e acesso básicos de arrays.

```java
class ArrayPractice {
    public static void main(String[] args) {
        int[] numbers = new int[5]; // Declara e aloca um array de 5 inteiros

        // Preenche o array
        numbers[0] = 10;
        numbers[1] = 20;
        numbers[2] = 30;
        numbers[3] = 40;
        numbers[4] = 50;

        // Acessa e imprime elementos
        System.out.println("Primeiro elemento: " + numbers[0]);
        System.out.println("Terceiro elemento: " + numbers[2]);
        System.out.println("Último elemento: " + numbers[4]);
    }
}
```

A execução do código anterior imprime o seguinte.

```
Primeiro elemento: 10
Terceiro elemento: 30
Último elemento: 50
```

### Iterando sobre Arrays e Diferentes Tipos

Você pode usar o padrão _for-each_ para visitar os elementos de um array.

```java
class ForEachArrayPractice {
    public static void main(String[] args) {
        String[] fruits = {"Maçã", "Banana", "Cereja", "Damasco"};

        System.out.println("Frutas:");
        for (String fruit : fruits) {
            System.out.println(fruit);
        }
    }
}
```

A execução do código anterior imprime o seguinte.

```
Frutas:
Maçã
Banana
Cereja
Damasco
```

Você pode usar outros tipos de dados para arrays. Aqui está um exemplo com um array de `double`.

```java
class DoubleArrayPractice {
    public static void main(String[] args) {
        double[] temperatures = {25.5, 28.1, 22.0, 30.7};

        System.out.println("Temperaturas:");
        for (double temp : temperatures) {
            System.out.println(temp + "°C");
        }
    }
}
```

A execução do código anterior imprime o seguinte.

```
Temperaturas:
25.5°C
28.1°C
22.0°C
30.7°C
```

Você também pode criar arrays de tipos de referência.

```java
class ReferenceArrayPractice {
    public static void main(String[] args) {
        // Array de objetos String
        String[] greetings = new String[3];
        greetings[0] = "Olá";
        greetings[1] = "Mundo";
        greetings[2] = "Java";

        System.out.println("Saudações:");
        for (String greeting : greetings) {
            System.out.println(greeting);
        }
    }
}
```

A execução do código anterior imprime o seguinte.

```
Saudações:
Olá
Mundo
Java
```

### Praticando Arrays Multidimensionais

Vamos brincar com arrays 2D e operações de matriz. Lembre-se de que um array bidimensional é um array de referências em Java, mesmo para tipos primitivos. Não é uma zona contígua de memória como em C ou Fortran.

```java
class MultiDimArrayPractice {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        System.out.println("Elementos da matriz:");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println(); // Nova linha para cada linha da matriz
        }
    }
}
```

A execução do código anterior imprime o seguinte.

```
Elementos da matriz:
1 2 3
4 5 6
7 8 9
```

Você pode ter arrays multidimensionais de qualquer tipo. Aqui está um exemplo com um tipo de referência.

```java
class MultiDimStringArrayPractice {
    public static void main(String[] args) {
        String[][] board = {
            {"X", "O", "X"},
            {"O", "X", "O"},
            {"X", "O", "X"}
        };

        System.out.println("Tabuleiro:");
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[i].length; j++) {
                System.out.print(board[i][j] + " ");
            }
            System.out.println();
        }
    }
}
```

A execução do código anterior imprime o seguinte.

```
Tabuleiro:
X O X
O X O
X O X
```

### Praticando Cálculos com Arrays

Você pode realizar cálculos com arrays.

```java
class ArrayCalculationsPractice {
    public static void main(String[] args) {
        int[] data = {10, 20, 30, 40, 50};
        int sum = 0;
        double average;

        for (int num : data) {
            sum += num;
        }

        average = (double) sum / data.length;

        System.out.println("Soma dos elementos: " + sum);
        System.out.println("Média dos elementos: " + average);
    }
}
```

Com os valores originais, a execução do código anterior imprime o seguinte.

```
Soma dos elementos: 150
Média dos elementos: 30.0
```

### Praticando Cópia de Arrays

Você pode copiar o conteúdo de um array para um novo array um elemento por vez, mesmo que seja uma maneira tediosa de copiar arrays.

```java
class ManualArrayCopyPractice {
    public static void main(String[] args) {
        int[] sourceArray = {1, 2, 3, 4, 5};
        int[] destinationArray = new int[sourceArray.length];

        for (int i = 0; i < sourceArray.length; i++) {
            destinationArray[i] = sourceArray[i];
        }

        System.out.print("Array de origem: ");
        for (int num : sourceArray) {
            System.out.print(num + " ");
        }
        System.out.println();

        System.out.print("Array de destino (cópia manual): ");
        for (int num : destinationArray) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
```

A execução do código anterior imprime o seguinte.

```
Array de origem: 1 2 3 4 5
Array de destino (cópia manual): 1 2 3 4 5
```

Você também pode usar [`System.arraycopy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/System.html#arraycopy\(java.lang.Object,int,java.lang.Object,int,int\)>). Nesse caso, você precisa criar o array de destino por conta própria.

```java
class SystemArrayCopyPractice {
    public static void main(String[] args) {
        int[] sourceArray = {10, 20, 30, 40, 50, 60, 70};
        int[] destinationArray = new int[5]; // Array de destino com tamanho 5

        // Copia 5 elementos a partir do índice 1 do sourceArray para o índice 0 do destinationArray
        System.arraycopy(sourceArray, 1, destinationArray, 0, 5);

        System.out.print("Array de origem: ");
        for (int num : sourceArray) {
            System.out.print(num + " ");
        }
        System.out.println();

        System.out.print("Array de destino (System.arraycopy): ");
        for (int num : destinationArray) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
```

A execução do código anterior imprime o seguinte.

```
Array de origem: 10 20 30 40 50 60 70
Array de destino (System.arraycopy): 20 30 40 50 60
```

Você também pode usar [`Arrays.copyOfRange()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html#copyOfRange\(T%5B%5D,int,int\)>), que cria o array de destino para você.

```java
import java.util.Arrays;

class ArraysCopyOfRangePractice {
    public static void main(String[] args) {
        int[] sourceArray = {100, 200, 300, 400, 500, 600};

        // Copia do índice 2 (inclusive) ao índice 5 (exclusive)
        int[] destinationArray = Arrays.copyOfRange(sourceArray, 2, 5);

        System.out.print("Array de origem: ");
        for (int num : sourceArray) {
            System.out.print(num + " ");
        }
        System.out.println();

        System.out.print("Array de destino (Arrays.copyOfRange): ");
        for (int num : destinationArray) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
```

A execução do código anterior imprime o seguinte.

```
Array de origem: 100 200 300 400 500 600
Array de destino (Arrays.copyOfRange): 300 400 500
```

## Mais Aprendizado

### Neste tutorial

Arrays
Declarando uma Variável para Referenciar um Array
Criando, Inicializando e Acessando um Array
Declarando um Array Multidimensional
Usando o Comprimento de um Array
Copiando Arrays
Manipulações de Array
Concluindo Variáveis e Arrays
Praticando Criação e Manipulação de Arrays
Mais Aprendizado

Última atualização: 27 de agosto de 2022

**Anterior na Série**

[Criando Variáveis de Tipos Primitivos em Seus Programas](<#/doc/tutorials/language-basics/primitive-types>)

➜

**Tutorial Atual**

Criando Arrays em Seus Programas

➜

**Próximo na Série**

[Usando o Identificador de Tipo Var](<#/doc/tutorials/language-basics/using-var>)

**Anterior na Série:** [Criando Variáveis de Tipos Primitivos em Seus Programas](<#/doc/tutorials/language-basics/primitive-types>)

**Próximo na Série:** [Usando o Identificador de Tipo Var](<#/doc/tutorials/language-basics/using-var>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos da Linguagem Java ](<#/doc/tutorials/language-basics>) > Criando Arrays em Seus Programas