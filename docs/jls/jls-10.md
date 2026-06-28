# Arrays

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Especificações Java SE](<#/>) > [Especificação da Linguagem Java](<#/doc/jls/jls-01>)

Capítulo 10. Arrays
---
[Anterior](<#/doc/jls/jls-09>) | | [Próximo](<#/doc/jls/jls-11>)
* * *

# Capítulo 10. Arrays

**Sumário**

[10.1. Tipos de Array](<#/doc/jls/jls-10>)
[10.2. Variáveis de Array](<#/doc/jls/jls-10>)
[10.3. Criação de Array](<#/doc/jls/jls-10>)
[10.4. Acesso a Array](<#/doc/jls/jls-10>)
[10.5. Exceção de Armazenamento em Array](<#/doc/jls/jls-10>)
[10.6. Inicializadores de Array](<#/doc/jls/jls-10>)
[10.7. Membros de Array](<#/doc/jls/jls-10>)
[10.8. Objetos `Class` para Arrays](<#/doc/jls/jls-10>)
[10.9. Um Array de Caracteres Não É uma `String`](<#/doc/jls/jls-10>)

Na linguagem de programação Java, _arrays_ são objetos ([§4.3.1](<#/doc/jls/jls-04>)), são criados dinamicamente e podem ser atribuídos a variáveis do tipo `Object` ([§4.3.2](<#/doc/jls/jls-04>)). Todos os métodos da classe `Object` podem ser invocados em um array.

Um objeto array contém um número de variáveis. O número de variáveis pode ser zero, caso em que o array é considerado _vazio_. As variáveis contidas em um array não têm nomes; em vez disso, elas são referenciadas por expressões de acesso a array que usam valores de índice inteiros não negativos. Essas variáveis são chamadas de _componentes_ do array. Se um array tem _n_ componentes, dizemos que _n_ é o comprimento do array; os componentes do array são referenciados usando índices inteiros de 0 a _n_ \- 1, inclusive.

Todos os componentes de um array têm o mesmo tipo, chamado de _tipo de componente_ do array. Se o tipo de componente de um array é T, então o tipo do próprio array é escrito T`[]`.

O tipo de componente de um array pode ser ele próprio um tipo de array. Os componentes de tal array podem conter referências a sub-arrays. Se, começando de qualquer tipo de array, considerarmos seu tipo de componente, e então (se esse também for um tipo de array) o tipo de componente desse tipo, e assim por diante, eventualmente deve-se chegar a um tipo de componente que não seja um tipo de array; este é chamado de _tipo de elemento_ do array original, e os componentes neste nível da estrutura de dados são chamados de _elementos_ do array original.

Existem algumas situações em que um elemento de um array pode ser um array: se o tipo de elemento é `Object` ou `Cloneable` ou `java.io.Serializable`, então alguns ou todos os elementos podem ser arrays, porque qualquer objeto array pode ser atribuído a qualquer variável desses tipos.

## 10.1. Tipos de Array

Tipos de array são usados em declarações e em expressões de cast ([§15.16](<#/doc/jls/jls-15>)).

Um tipo de array é escrito como o nome de um tipo de elemento seguido por um certo número de pares vazios de colchetes `[]`. O número de pares de colchetes indica a profundidade do aninhamento do array.

Cada par de colchetes em um tipo de array pode ser anotado por anotações de tipo ([§9.7.4](<#/doc/jls/jls-09>)). Uma anotação se aplica ao par de colchetes (ou reticências, em uma declaração de parâmetro de aridade variável) que o segue.

O tipo de elemento de um array pode ser qualquer tipo, seja primitivo ou de referência. Em particular:

  * Arrays com um tipo de interface como tipo de elemento são permitidos.

Um elemento de tal array pode ter como seu valor uma referência nula ou uma instância de qualquer tipo que implemente a interface.

  * Arrays com um tipo de classe `abstract` como tipo de elemento são permitidos.

Um elemento de tal array pode ter como seu valor uma referência nula ou uma instância de qualquer subclasse da classe `abstract` que não seja ela própria `abstract`.

O comprimento de um array não faz parte de seu tipo.

Os supertipos de um tipo de array são especificados em [§4.10.3](<#/doc/jls/jls-04>).

A relação de supertipo para tipos de array não é a mesma que a relação de superclasse. O supertipo direto de `Integer`[]` é `Number`[]` de acordo com [§4.10.3](<#/doc/jls/jls-04>), mas a superclasse direta de `Integer`[]` é `Object` de acordo com o objeto `Class` para `Integer`[]` ([§10.8](<#/doc/jls/jls-10>)). Isso não importa na prática, porque `Object` também é um supertipo de todos os tipos de array.

## 10.2. Variáveis de Array

Uma variável de tipo array mantém uma referência a um objeto. Declarar uma variável de tipo array não cria um objeto array nem aloca espaço para componentes do array. Ela cria apenas a própria variável, que pode conter uma referência a um array. No entanto, a parte inicializadora de um declarador ([§8.3](<#/doc/jls/jls-08>), [§9.3](<#/doc/jls/jls-09>), [§14.4.1](<#/doc/jls/jls-14>)) pode criar um array, cuja referência se torna então o valor inicial da variável.

**Exemplo 10.2-1. Declarações de Variáveis de Array**
```java

    int[]     ai;        // array of int
    short[][] as;        // array of array of short
    short     s,         // scalar short
              aas[][];   // array of array of short
    Object[]  ao,        // array of Object
              otherAo;   // array of Object
    Collection<?>[] ca;  // array of Collection of unknown type
    
    
```

As declarações acima não criam objetos array. A seguir estão exemplos de declarações de variáveis de array que criam objetos array:
```java
    
    Exception ae[]  = new Exception[3];
    Object aao[][]  = new Exception[2][3];
    int[] factorial = { 1, 1, 2, 6, 24, 120, 720, 5040 };
    char ac[]       = { 'n', 'o', 't', ' ', 'a', ' ',
                        'S', 't', 'r', 'i', 'n', 'g' };
    String[] aas    = { "array", "of", "String", };
    
    
```

O tipo de array de uma variável depende dos pares de colchetes que podem aparecer como parte do tipo no início de uma declaração de variável, ou como parte do declarador para a variável, ou ambos. Especificamente, na declaração de um campo, parâmetro formal, variável local ou componente de record ([§8.3](<#/doc/jls/jls-08>), [§8.4.1](<#/doc/jls/jls-08>), [§9.3](<#/doc/jls/jls-09>), [§9.4](<#/doc/jls/jls-09>), [§14.4.1](<#/doc/jls/jls-14>), [§14.14.2](<#/doc/jls/jls-14>), [§15.27.1](<#/doc/jls/jls-15>), [§8.10.1](<#/doc/jls/jls-08>)), o tipo de array da variável é denotado por:

  * o tipo de elemento que aparece no início da declaração; então,

  * quaisquer pares de colchetes que seguem o _Identificador_ da variável no declarador (não aplicável para um parâmetro de aridade variável ou um componente de record); então,

  * quaisquer pares de colchetes que aparecem no tipo no início da declaração (onde as reticências de um parâmetro de aridade variável ou componente de record de aridade variável são tratadas como um par de colchetes).

O tipo de retorno de um método ([§8.4.5](<#/doc/jls/jls-08>)) pode ser um tipo de array. O tipo de array preciso depende dos pares de colchetes que podem aparecer como parte do tipo no início da declaração do método, ou após a lista de parâmetros formais do método, ou ambos. O tipo de array é denotado por:

  * o tipo de elemento que aparece no _Resultado_ ; então,

  * quaisquer pares de colchetes que seguem a lista de parâmetros formais; então,

  * quaisquer pares de colchetes que aparecem no _Resultado_.

Não recomendamos a "notação mista" em declarações de variáveis de array, onde pares de colchetes aparecem tanto no tipo quanto nos declaradores; nem em declarações de método, onde pares de colchetes aparecem tanto antes quanto depois da lista de parâmetros formais.

**Exemplo 10.2-2. Variáveis de Array e Tipos de Array**

A instrução de declaração de variável local:
```java
    byte[] rowvector, colvector, matrix[];
    
```

é equivalente a:
```java
    byte rowvector[], colvector[], matrix[][];
    
```

porque o tipo de array de cada variável local permanece inalterado. Similarmente, a instrução de declaração de variável local:
```java
    int a, b[], c[][];
    
```

é equivalente à série de instruções de declaração:
```java
    int a;
    int[] b;
    int[][] c;
    
```

Colchetes são permitidos em declaradores como uma homenagem à tradição de C e C++. As regras gerais para declaração de variáveis, no entanto, permitem que colchetes apareçam tanto no tipo quanto nos declaradores, de modo que a instrução de declaração de variável local:
```java
    float[][] f[][], g[][][], h[];  // Yechh!
    
```

é equivalente à série de declarações:
```java
    float[][][][] f;
    float[][][][][] g;
    float[][][] h;
    
```

Devido à forma como os tipos de array são formados, as seguintes declarações de parâmetro têm o mesmo tipo de array:
```java
    void m(int @A [] @B []  x) {}
    void n(int @A [] @B ... y) {}
    
```

E talvez surpreendentemente, as seguintes declarações de campo têm o mesmo tipo de array:
```java
    int @A [] f @B [];
    int @B [] @A [] g;
    
```

Uma vez que um objeto array é criado, seu comprimento nunca muda. Para fazer com que uma variável de array se refira a um array de comprimento diferente, uma referência a um array diferente deve ser atribuída à variável.

Uma única variável de tipo array pode conter referências a arrays de diferentes comprimentos, porque o comprimento de um array não faz parte de seu tipo.

Se uma variável de array `v` tem o tipo A`[]`, onde A é um tipo de referência, então `v` pode conter uma referência a uma instância de qualquer tipo de array B`[]`, desde que B possa ser atribuído a A ([§5.2](<#/doc/jls/jls-05>)). Isso pode resultar em uma exceção em tempo de execução em uma atribuição _posterior_; veja [§10.5](<#/doc/jls/jls-10>) para uma discussão.

## 10.3. Criação de Array

Um array é criado por uma expressão de criação de array ([§15.10.1](<#/doc/jls/jls-15>)) ou um inicializador de array ([§10.6](<#/doc/jls/jls-10>)).

Uma expressão de criação de array especifica o tipo de elemento, o número de níveis de arrays aninhados e o comprimento do array para pelo menos um dos níveis de aninhamento. O comprimento do array está disponível como uma variável de instância `final` `length`.

Um inicializador de array cria um array e fornece valores iniciais para todos os seus componentes.

## 10.4. Acesso a Array

Um componente de um array é acessado por uma expressão de acesso a array ([§15.10.3](<#/doc/jls/jls-15>)) que consiste em uma expressão cujo valor é uma referência de array seguida por uma expressão de indexação delimitada por `[` e `]`, como em `A[i]`.

Todos os arrays são de origem `0`. Um array com comprimento _n_ pode ser indexado pelos inteiros `0` a _n_ -1.

**Exemplo 10.4-1. Acesso a Array**
```java

    class Gauss {
        public static void main(String[] args) {
            int[] ia = new int[101];
            for (int i = 0; i < ia.length; i++) ia[i] = i;
            int sum = 0;
            for (int e : ia) sum += e;
            System.out.println(sum);
        }
    }
    
```

Este programa produz a saída:
```
    5050
    
```

O programa declara uma variável `ia` que tem o tipo array de `int`, ou seja, `int[]`. A variável `ia` é inicializada para referenciar um objeto array recém-criado, criado por uma expressão de criação de array ([§15.10.1](<#/doc/jls/jls-15>)). A expressão de criação de array especifica que o array deve ter `101` componentes. O comprimento do array está disponível usando o campo `length`, como mostrado. O programa preenche o array com os inteiros de `0` a `100`, soma esses inteiros e imprime o resultado.

Arrays devem ser indexados por valores `int`; valores `short`, `byte` ou `char` também podem ser usados como valores de índice porque são submetidos à promoção numérica unária ([§5.6](<#/doc/jls/jls-05>)) e se tornam valores `int`.

Uma tentativa de acessar um componente de array com um valor de índice `long` resulta em um erro em tempo de compilação.

Todos os acessos a arrays são verificados em tempo de execução; uma tentativa de usar um índice menor que zero ou maior ou igual ao comprimento do array causa o lançamento de uma `ArrayIndexOutOfBoundsException` ([§15.10.4](<#/doc/jls/jls-15>)).

## 10.5. Exceção de Armazenamento em Array

Para um array cujo tipo é A`[]`, onde A é um tipo de referência, uma atribuição a um componente do array é verificada em tempo de execução para garantir que o valor que está sendo atribuído seja atribuível ao componente.

Se o tipo do valor que está sendo atribuído não é compatível com a atribuição ([§5.2](<#/doc/jls/jls-05>)) com o tipo de componente, uma `ArrayStoreException` é lançada.

Se o tipo de componente de um array não fosse reificável ([§4.7](<#/doc/jls/jls-04>)), a Java Virtual Machine não poderia realizar a verificação de armazenamento descrita no parágrafo anterior. É por isso que uma expressão de criação de array com um tipo de elemento não reificável é proibida ([§15.10.1](<#/doc/jls/jls-15>)). Pode-se declarar uma variável de um tipo de array cujo tipo de elemento não é reificável, mas a atribuição do resultado de uma expressão de criação de array à variável necessariamente causará um aviso não verificado ([§5.1.9](<#/doc/jls/jls-05>)).

**Exemplo 10.5-1. `ArrayStoreException`
```java

    class Point { int x, y; }
    class ColoredPoint extends Point { int color; }
    class Test {
        public static void main(String[] args) {
            ColoredPoint[] cpa = new ColoredPoint[10];
            Point[] pa = cpa;
            System.out.println(pa[1] == null);
            try {
                pa[0] = new Point();
            } catch (ArrayStoreException e) {
                System.out.println(e);
            }
        }
    }
    
```

Este programa produz a saída:
```
    true
    java.lang.ArrayStoreException: Point
    
```

A variável `pa` tem o tipo `Point[]` e a variável `cpa` tem como seu valor uma referência a um objeto do tipo `ColoredPoint[]`. Um `ColoredPoint` pode ser atribuído a um `Point`; portanto, o valor de `cpa` pode ser atribuído a `pa`.

Uma referência a este array `pa`, por exemplo, testando se `pa[1]` é `null`, não resultará em um erro de tipo em tempo de execução. Isso ocorre porque o elemento do array do tipo `ColoredPoint[]` é um `ColoredPoint`, e todo `ColoredPoint` pode substituir um `Point`, já que `Point` é a superclasse de `ColoredPoint`.

Por outro lado, uma atribuição ao array `pa` pode resultar em um erro em tempo de execução. Em tempo de compilação, uma atribuição a um elemento de `pa` é verificada para garantir que o valor atribuído seja um `Point`. Mas como `pa` mantém uma referência a um array de `ColoredPoint`, a atribuição é válida apenas se o tipo do valor atribuído em tempo de execução for, mais especificamente, um `ColoredPoint`.

A Java Virtual Machine verifica tal situação em tempo de execução para garantir que a atribuição seja válida; caso contrário, uma `ArrayStoreException` é lançada.

## 10.6. Inicializadores de Array

Um _inicializador de array_ pode ser especificado em uma declaração de campo ([§8.3](<#/doc/jls/jls-08>), [§9.3](<#/doc/jls/jls-09>)) ou declaração de variável local ([§14.4](<#/doc/jls/jls-14>)), ou como parte de uma expressão de criação de array ([§15.10.1](<#/doc/jls/jls-15>)), para criar um array e fornecer alguns valores iniciais.

ArrayInitializer:

`{` [[VariableInitializerList](<#/doc/jls/jls-10>)] [`,`] `}`

VariableInitializerList:

[VariableInitializer](<#/doc/jls/jls-08>) {`,` [VariableInitializer](<#/doc/jls/jls-08>)}

A seguinte produção de [§8.3](<#/doc/jls/jls-08>) é mostrada aqui para conveniência:

VariableInitializer:

[Expression](<#/doc/jls/jls-15>)
[ArrayInitializer](<#/doc/jls/jls-10>)

Um inicializador de array é escrito como uma lista de expressões separadas por vírgulas, delimitadas por chaves `{` e `}`.

Uma vírgula final pode aparecer após a última expressão em um inicializador de array e é ignorada.

Cada inicializador de variável deve ser compatível com a atribuição ([§5.2](<#/doc/jls/jls-05>)) com o tipo de componente do array, ou ocorre um erro em tempo de compilação.

É um erro em tempo de compilação se o tipo de componente do array que está sendo inicializado não é reificável ([§4.7](<#/doc/jls/jls-04>)).

O comprimento do array a ser construído é igual ao número de inicializadores de variável imediatamente delimitados pelas chaves do inicializador de array. O espaço é alocado para um novo array desse comprimento. Se não houver espaço suficiente para alocar o array, a avaliação do inicializador de array é concluída abruptamente lançando um `OutOfMemoryError`. Caso contrário, um array unidimensional é criado com o comprimento especificado, e cada componente do array é inicializado com seu valor padrão ([§4.12.5](<#/doc/jls/jls-04>)).

Os inicializadores de variável imediatamente delimitados pelas chaves do inicializador de array são então executados da esquerda para a direita na ordem textual em que aparecem no código-fonte. O _n_-ésimo inicializador de variável especifica o valor do (_n_-1)-ésimo componente do array. Se a execução de um inicializador de variável for concluída abruptamente, então a execução do inicializador de array é concluída abruptamente pela mesma razão. Se todas as expressões do inicializador de variável forem concluídas normalmente, o inicializador de array é concluído normalmente, com o valor do array recém-inicializado.

Se o tipo de componente é um tipo de array, então o inicializador de variável que especifica um componente pode ser ele próprio um inicializador de array; ou seja, inicializadores de array podem ser aninhados. Neste caso, a execução do inicializador de array aninhado constrói e inicializa um objeto array pela aplicação recursiva do algoritmo acima, e o atribui ao componente.

**Exemplo 10.6-1. Inicializadores de Array**
```java

    class Test {
        public static void main(String[] args) {
            int[][] ia = { { 1, 2 }, null };
            for (int[] ea : ia) {
                for (int e: ea) {
                    System.out.println(e);
                }
            }
        }
    }
    
    
```

Este programa produz a saída:
```
    1
    2
    
```

antes de causar uma `NullPointerException` ao tentar indexar o segundo componente do array `ia`, que é uma referência nula.
## 10.7. Membros de Array

Os membros de um tipo de array são todos os seguintes:

*   O campo `public` `final` `length`, que contém o número de componentes do array. `length` pode ser positivo ou zero.

*   O método `public` `clone`, que sobrescreve o método de mesmo nome na classe `Object` e não lança exceções verificadas (checked exceptions). O tipo de retorno do método `clone` de um tipo de array T`[]` é T`[]`.

Um clone de um array multidimensional é superficial (shallow), o que significa que ele cria apenas um único novo array. Subarrays são compartilhados.

*   Todos os membros herdados da classe `Object`; o único método de `Object` que não é herdado é seu método `clone`.

Veja [§9.6.4.4](<#/doc/jls/jls-09>) para outra situação onde a diferença entre métodos `public` e não-`public` de `Object` requer atenção especial.

Um array, portanto, possui os mesmos campos e métodos `public` que a seguinte classe:
```

    class A<T> implements Cloneable, java.io.Serializable {
        public final int length = X;
        public T[] clone() {
            try {
                return (T[])super.clone();
            } catch (CloneNotSupportedException e) {
                throw new InternalError(e.getMessage());
            }
        }
    }


```

Note que o cast para `T[]` no código acima geraria um aviso não verificado (unchecked warning) ([§5.1.9](<#/doc/jls/jls-05>)) se os arrays fossem realmente implementados dessa forma.

**Exemplo 10.7-1. Arrays São Cloneable**
```

    class Test1 {
        public static void main(String[] args) {
            int[] ia1 = { 1, 2 };
            int[] ia2 = ia1.clone();
            System.out.print((ia1 == ia2) + " ");
            ia1[1]++;
            System.out.println(ia2[1]);
        }
    }


```

Este programa produz a saída:
```

    false 2

```

mostrando que os componentes dos arrays referenciados por `ia1` e `ia2` são variáveis diferentes.

**Exemplo 10.7-2. Subarrays Compartilhados Após Um Clone**

O fato de que subarrays são compartilhados quando um array multidimensional é clonado é demonstrado por este programa:
```
    class Test2 {
        public static void main(String[] args) throws Throwable {
            int[][] ia = { { 1, 2 }, null };
            int[][] ja = ia.clone();
            System.out.print((ia == ja) + " ");
            System.out.println(ia[0] == ja[0] && ia[1] == ja[1]);
        }
    }


```

Este programa produz a saída:
```

    false true

```

mostrando que o array `int[]` que é `ia[0]` e o array `int[]` que é `ja[0]` são o mesmo array.

## 10.8. Objetos `Class` para Arrays

Todo array possui um objeto `Class` associado, compartilhado com todos os outros arrays do mesmo tipo de componente.

Embora um tipo de array não seja uma classe, o objeto `Class` de todo array age como se:

*   A superclasse direta de todo tipo de array fosse `Object`.

*   Todo tipo de array implementasse as interfaces `Cloneable` e `java.io.Serializable`.

**Exemplo 10.8-1. Objeto `Class` de Array**
```

    class Test1 {
        public static void main(String[] args) {
            int[] ia = new int[3];
            System.out.println(ia.getClass());
            System.out.println(ia.getClass().getSuperclass());
            for (Class<?> c : ia.getClass().getInterfaces())
                System.out.println("Superinterface: " + c);
        }
    }

```

Este programa produz a saída:
```

    class [I
    class java.lang.Object
    Superinterface: interface java.lang.Cloneable
    Superinterface: interface java.io.Serializable

```

onde a string "`[I`" é a assinatura de tipo em tempo de execução (run-time type signature) para o objeto `Class` "array com tipo de componente `int`".

**Exemplo 10.8-2. Objetos `Class` de Array São Compartilhados**
```

    class Test2 {
        public static void main(String[] args) {
            int[] ia = new int[3];
            int[] ib = new int[6];
            System.out.println(ia == ib);
            System.out.println(ia.getClass() == ib.getClass());
        }
    }

```

Este programa produz a saída:
```

    false
    true

```

Enquanto `ia` e `ib` se referem a arrays diferentes, o resultado da comparação dos objetos `Class` demonstra que todos os arrays cujos componentes são do tipo `int` são instâncias do mesmo tipo de array (ou seja, `int`[]`).

## 10.9. Um Array de Caracteres Não É uma `String`

Na linguagem de programação Java, diferentemente de C, um array de `char` não é uma `String`, e nem uma `String` nem um array de `char` são terminados por '`\u0000`' (o caractere NUL).

Um objeto `String` é imutável, ou seja, seu conteúdo nunca muda, enquanto um array de `char` possui elementos mutáveis.

O método `toCharArray` na classe `String` retorna um array de caracteres contendo a mesma sequência de caracteres que uma `String`. A classe `StringBuffer` implementa métodos úteis em arrays mutáveis de caracteres.

* * *

[Anterior](<#/doc/jls/jls-09>) | | [Próximo](<#/doc/jls/jls-11>)
---|---|---
Capítulo 9. Interfaces | [Início](<#/doc/jls/jls-01>) | Capítulo 11. Exceções

* * *

[ Aviso Legal ](<#/>)