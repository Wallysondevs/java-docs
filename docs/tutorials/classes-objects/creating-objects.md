# Criando e Usando Objetos

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Classes e Objetos ](<#/doc/tutorials/classes-objects>) > Criando e Usando Objetos

**Anterior na Série**

[Chamando Métodos e Construtores](<#/doc/tutorials/classes-objects/calling-methods-constructors>)

➜

**Tutorial Atual**

Criando e Usando Objetos

➜

**Próximo na Série**

[Mais sobre Classes](<#/doc/tutorials/classes-objects/more-on-classes>)

**Anterior na Série:** [Chamando Métodos e Construtores](<#/doc/tutorials/classes-objects/calling-methods-constructors>)

**Próximo na Série:** [Mais sobre Classes](<#/doc/tutorials/classes-objects/more-on-classes>)

# Criando e Usando Objetos

## Entendendo o que são Objetos

Um programa Java típico cria muitos objetos, que, como você sabe, interagem invocando métodos. Através dessas interações de objetos, um programa pode realizar várias tarefas, como implementar uma GUI, executar uma animação ou enviar e receber informações por uma rede. Uma vez que um objeto tenha concluído o trabalho para o qual foi criado, seus recursos são reciclados para uso por outros objetos.

O exemplo a seguir cria três objetos: um objeto `Point` e dois objetos `Rectangle`.

A execução do código anterior imprime o seguinte.

As três seções a seguir usam o exemplo acima para descrever o ciclo de vida de um objeto dentro de um programa. A partir delas, você aprenderá como escrever código que cria e usa objetos em seus próprios programas. Você também aprenderá como o sistema faz a limpeza após um objeto quando sua vida útil termina.

## Criando Objetos

Como você sabe, uma classe fornece o projeto para objetos; você cria um objeto a partir de uma classe. Cada uma das seguintes declarações, retiradas do exemplo anterior, cria um objeto e o atribui a uma variável.

A primeira linha cria um objeto da classe `Point`, e a segunda linha cria um objeto da classe `Rectangle`.

Cada uma dessas declarações tem três partes (discutidas em detalhes abaixo):

  1. Declaração: `Point origin` e `Rectangle rectangle` são declarações de variáveis que associam um nome de variável a um tipo de objeto.
  2. Instanciação: A palavra-chave `new` é um operador Java que cria o objeto.
  3. Inicialização: O operador `new` é seguido por uma chamada a um construtor, que inicializa o novo objeto.

### Declarando uma Variável para Referenciar um Objeto

Anteriormente, você aprendeu que para declarar uma variável, você escreve:

```java
type name;
```

Isso notifica o compilador de que você usará name para se referir a dados cujo type é type. Com uma variável primitiva, essa declaração também reserva a quantidade adequada de memória para a variável.

Você também pode declarar uma variável de referência em sua própria linha. Por exemplo:

```java
Point originOne;
```

Se você declarar `origin` dessa forma, seu valor será indeterminado até que um objeto seja realmente criado e atribuído a ele. Simplesmente declarar uma variável de referência não cria um objeto. Para isso, você precisa usar o operador `new`, conforme descrito na próxima seção. Você deve atribuir um objeto a `origin` antes de usá-lo em seu código. Caso contrário, você receberá um erro de compilação.

Uma variável neste estado, atualmente não referencia nenhum objeto.

### Instanciando uma Classe

O operador `new` instancia uma classe alocando memória para um novo objeto e retornando uma referência a essa memória. O operador `new` também invoca o construtor do objeto.

> Nota: A frase "instanciando uma classe" significa o mesmo que "criando um objeto". Quando você cria um objeto, você está criando uma "instância" de uma classe, portanto "instanciando" uma classe.

O operador `new` requer um único argumento pós-fixado: uma chamada a um construtor. O nome do construtor fornece o nome da classe a ser instanciada.

```java
new ClassName(arguments);
```

O operador `new` retorna uma referência ao objeto que ele criou. Essa referência geralmente é atribuída a uma variável do tipo apropriado, como:

```java
Point originOne = new Point(23, 94);
```

A referência retornada pelo operador `new` não precisa ser atribuída a uma variável. Ela também pode ser usada diretamente em uma expressão. Por exemplo:

```java
System.out.println("Width of rectangle: " + new Rectangle().width);
```

Esta declaração será discutida na próxima seção.

### Inicializando um Objeto

Esta classe `Point` do exemplo anterior contém um único construtor. Você pode reconhecer um construtor porque sua declaração usa o mesmo nome da classe e não possui tipo de retorno. O construtor na classe `Point` recebe dois argumentos inteiros, conforme declarado pelo código `(int x, int y)`. A seguinte declaração fornece 23 e 94 como valores para esses argumentos:

```java
Point originOne = new Point(23, 94);
```

O resultado da execução desta declaração pode ser ilustrado na próxima figura:

Um Objeto Point

Você pode criar quantos construtores precisar em uma classe. Aqui está o exemplo da classe `Rectangle`, que contém quatro construtores.

```java
public class Rectangle {
    public int width = 0;
    public int height = 0;
    public Point origin;

    // four constructors
    public Rectangle() {
        origin = new Point(0, 0);
    }

    public Rectangle(Point p) {
        origin = p;
    }

    public Rectangle(int w, int h) {
        origin = new Point(0, 0);
        width = w;
        height = h;
    }

    public Rectangle(Point p, int w, int h) {
        origin = p;
        width = w;
        height = h;
    }

    // a method for moving the rectangle
    public void move(int x, int y) {
        origin.x = x;
        origin.y = y;
    }

    // a method for computing the area of the rectangle
    public int area() {
        return width * height;
    }
}
```

A execução do código anterior imprime o seguinte.

Cada construtor permite que você forneça valores iniciais para `origin`, `width` e `height` do retângulo, usando tipos primitivos e de referência. Se uma classe tiver vários construtores, eles devem ter assinaturas diferentes. O compilador Java diferencia os construtores com base no número e no tipo dos argumentos. Quando o compilador Java encontra o seguinte código, ele sabe que deve chamar o construtor na classe `Rectangle` que requer um argumento `Point` seguido por dois argumentos inteiros:

```java
Rectangle rectTwo = new Rectangle(originOne, 100, 200);
```

Isso chama um dos construtores de `Rectangle` que inicializa `origin` para `origin`. Além disso, o construtor define `width` como 100 e `height` como 200. Agora existem duas referências para o mesmo objeto `Point` — um objeto pode ter múltiplas referências a ele, como mostrado na próxima figura:

Um Objeto Rectangle

A seguinte linha de código chama o construtor `Rectangle` que requer dois argumentos inteiros, que fornecem os valores iniciais para `width` e `height`. Se você inspecionar o código dentro do construtor, verá que ele cria um novo objeto `Point` cujos valores `x` e `y` são inicializados para 0:

```java
Rectangle rect = new Rectangle(50, 100);
```

O construtor `Rectangle` usado na seguinte declaração não recebe nenhum argumento, por isso é chamado de construtor sem argumentos:

```java
Rectangle rectThree = new Rectangle();
```

Todas as classes têm pelo menos um construtor. Se uma classe não declarar explicitamente nenhum, o compilador Java fornece automaticamente um construtor sem argumentos, chamado de construtor padrão. Este construtor padrão chama o construtor sem argumentos da classe pai, ou o construtor `Object` se a classe não tiver outro pai. Se o pai não tiver construtor (`Object` tem um), o compilador rejeitará o programa.

## Usando Objetos

Depois de criar um objeto, você provavelmente desejará usá-lo para algo. Você pode precisar usar o valor de um de seus campos, alterar um de seus campos ou chamar um de seus métodos para realizar uma ação.

### Referenciando os Campos de um Objeto

Os campos de objeto são acessados por seus nomes. Você deve usar um nome que seja inequívoco.

Você pode usar um nome simples para um campo dentro de sua própria classe. Por exemplo, podemos adicionar uma declaração dentro da classe `Rectangle` que imprime `width` e `height`:

```java
System.out.println("Width of rectangle: " + width);
System.out.println("Height of rectangle: " + height);
```

Neste caso, `width` e `height` são nomes simples.

O código que está fora da classe do objeto deve usar uma referência de objeto ou expressão, seguida pelo operador ponto (`.`), seguido por um nome de campo simples, como em:

```java
objectReference.fieldName
```

Por exemplo, o código a seguir está fora do código da classe `Rectangle`. Assim, para se referir aos campos `origin`, `width` e `height` dentro do objeto `Rectangle` chamado `rectangle`, este código deve usar os nomes `rectangle.origin`, `rectangle.width` e `rectangle.height`, respectivamente. O programa usa dois desses nomes para imprimir o `width` e o `height` de `rectangle`:

```java
System.out.println("Width of rectangle: " + rectangle.width);
System.out.println("Height of rectangle: " + rectangle.height);
```

Tentar usar os nomes simples `width` e `height` a partir do código fora da classe `Rectangle` não faz sentido — esses campos existem apenas dentro de um objeto — e resulta em um erro de compilação.

Você pode usar um código semelhante para exibir informações sobre outra instância de `Rectangle`. Objetos do mesmo tipo têm sua própria cópia dos mesmos campos de instância. Assim, cada objeto `Rectangle` tem campos chamados `origin`, `width` e `height`. Quando você acessa um campo de instância através de uma referência de objeto, você referencia o campo daquele objeto em particular. Se você tiver dois objetos `rectangle1` e `rectangle2`, eles terão campos `origin`, `width` e `height` diferentes.

Para acessar um campo, você pode usar uma referência nomeada a um objeto, como nos exemplos anteriores, ou pode usar qualquer expressão que retorne uma referência de objeto. Lembre-se de que o operador `new` retorna uma referência a um objeto. Assim, você poderia usar o valor retornado por `new` para acessar os campos de um novo objeto:

```java
System.out.println("Width of rectangle: " + new Rectangle().width);
```

Esta declaração cria um novo objeto `Rectangle` e imediatamente obtém seu `height`. Em essência, a declaração calcula a altura padrão de um `Rectangle`. Observe que, após a execução desta declaração, o programa não possui mais uma referência ao `Rectangle` criado, porque o programa nunca armazenou a referência em nenhum lugar. O objeto fica sem referência, e seus recursos estão livres para serem reciclados pela Java Virtual Machine.

### Chamando os Métodos de um Objeto

Você também usa uma referência de objeto para invocar o método de um objeto. Você anexa o nome simples do método à referência do objeto, com um operador ponto (`.`) intermediário. Além disso, você fornece, entre parênteses, quaisquer argumentos para o método. Se o método não exigir argumentos, use parênteses vazios.

```java
objectReference.methodName(arguments);
```

ou:

```java
objectReference.methodName();
```

Vamos adicionar três métodos à nossa classe `Rectangle`:

  * `area()` para calcular a área do retângulo,
  * `move()` para mudar a origem do retângulo,
  * e `print()` para imprimir algumas informações sobre o retângulo no console.

```java
public class Rectangle {
    public int width = 0;
    public int height = 0;
    public Point origin;

    // four constructors
    public Rectangle() {
        origin = new Point(0, 0);
    }

    public Rectangle(Point p) {
        origin = p;
    }

    public Rectangle(int w, int h) {
        origin = new Point(0, 0);
        width = w;
        height = h;
    }

    public Rectangle(Point p, int w, int h) {
        origin = p;
        width = w;
        height = h;
    }

    // a method for moving the rectangle
    public void move(int x, int y) {
        origin.x = x;
        origin.y = y;
    }

    // a method for computing the area of the rectangle
    public int area() {
        return width * height;
    }

    // a method for printing the rectangle's attributes
    public void printRectangle() {
        System.out.println("   Origin: (" + origin.x + ", " + origin.y + ")");
        System.out.println("   Width: " + width);
        System.out.println("   Height: " + height);
    }
}
```

A execução do código anterior imprime o seguinte.

Assim como nos campos de instância, `objectReference` deve ser uma referência a um objeto. Você pode usar um nome de variável, mas também pode usar qualquer expressão que retorne uma referência de objeto. O operador `new` retorna uma referência de objeto, então você pode usar o valor retornado por `new` para invocar os métodos de um novo objeto:

```java
System.out.println("Area of rectangle: " + new Rectangle(100, 50).area());
```

A expressão `new Rectangle(100, 50)` retorna uma referência de objeto que se refere a um objeto `Rectangle`. Como mostrado, você pode usar a notação de ponto para invocar o método `area()` do novo `Rectangle` para calcular a área do novo retângulo.

Alguns métodos, como `area()`, retornam um valor. Para métodos que retornam um valor, você pode usar a invocação do método em expressões. Você pode atribuir o valor de retorno a uma variável, usá-lo para tomar decisões ou controlar um loop. Este código atribui o valor retornado por `area()` à variável `area`:

```java
int area = new Rectangle(100, 50).area();
```

Neste caso, o objeto no qual `area()` é invocado é o retângulo retornado pelo construtor.

## O Garbage Collector

Algumas linguagens orientadas a objetos exigem que você acompanhe todos os objetos que cria e que os destrua explicitamente quando não forem mais necessários. Gerenciar a memória explicitamente é tedioso e propenso a erros. A plataforma Java permite que você crie quantos objetos quiser (limitado, é claro, pelo que seu sistema pode suportar), e você não precisa se preocupar em destruí-los. O ambiente de tempo de execução Java exclui objetos quando determina que eles não estão mais sendo usados. Este processo é chamado de garbage collection.

Um objeto é elegível para garbage collection quando não há mais referências a esse objeto. Referências que são mantidas em uma variável geralmente são descartadas quando a variável sai do escopo. Ou, você pode descartar explicitamente uma referência de objeto definindo a variável para o valor especial `null`. Lembre-se de que um programa pode ter múltiplas referências ao mesmo objeto; todas as referências a um objeto devem ser descartadas antes que o objeto seja elegível para garbage collection.

O ambiente de tempo de execução Java possui um garbage collector que libera periodicamente a memória usada por objetos que não são mais referenciados. O garbage collector faz seu trabalho automaticamente quando determina que é o momento certo.

### Neste tutorial

Entendendo o que são Objetos Criando Objetos Usando Objetos O Garbage Collector

Última atualização: 5 de janeiro de 2024

**Anterior na Série**

[Chamando Métodos e Construtores](<#/doc/tutorials/classes-objects/calling-methods-constructors>)

➜

**Tutorial Atual**

Criando e Usando Objetos

➜

**Próximo na Série**

[Mais sobre Classes](<#/doc/tutorials/classes-objects/more-on-classes>)

**Anterior na Série:** [Chamando Métodos e Construtores](<#/doc/tutorials/classes-objects/calling-methods-constructors>)

**Próximo na Série:** [Mais sobre Classes](<#/doc/tutorials/classes-objects/more-on-classes>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Classes e Objetos ](<#/doc/tutorials/classes-objects>) > Criando e Usando Objetos