# Chamando Métodos e Construtores

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Classes e Objetos ](<#/doc/tutorials/classes-objects>) > Chamando Métodos e Construtores

**Anterior na Série**

[Fornecendo Construtores para suas Classes](<#/doc/tutorials/classes-objects/defining-constructors>)

➜

**Tutorial Atual**

Chamando Métodos e Construtores

➜

**Próximo na Série**

[Criando e Usando Objetos](<#/doc/tutorials/classes-objects/creating-objects>)

**Anterior na Série:** [Fornecendo Construtores para suas Classes](<#/doc/tutorials/classes-objects/defining-constructors>)

**Próximo na Série:** [Criando e Usando Objetos](<#/doc/tutorials/classes-objects/creating-objects>)

# Chamando Métodos e Construtores

## Passando Informações para um Método ou um Construtor

A declaração de um método ou de um construtor declara o número e o tipo dos argumentos para esse método ou construtor. Por exemplo, o seguinte é um método que calcula os pagamentos mensais de um empréstimo imobiliário, com base no valor do empréstimo, na taxa de juros, na duração do empréstimo (o número de períodos) e no valor futuro do empréstimo:

```java
public double computePayment(
  double loanAmt,
  double rate,
  double futureValue,
  int numPeriods) {
  double interest = rate / 1200;
  double partial1 = Math.pow((1 + interest), - numPeriods);
  double denominator = (1 - partial1) / interest;
  double result =
    ((-loanAmt / denominator) - futureValue) / (partial1 / interest);
  return result;
}
```

Este método possui quatro parâmetros: o valor do empréstimo, a taxa de juros, o valor futuro e o número de períodos. Os três primeiros são números de ponto flutuante de dupla precisão, e o quarto é um inteiro. Os parâmetros são usados no corpo do método e em tempo de execução assumirão os valores dos argumentos que são passados.

> Nota: _Parâmetros_ refere-se à lista de variáveis em uma declaração de método. Argumentos são os valores reais que são passados quando o método é invocado. Ao invocar um método, os argumentos usados devem corresponder aos parâmetros da declaração em tipo e ordem.

## Tipos de Parâmetros

Você pode usar qualquer tipo de dado para um parâmetro de um método ou de um construtor. Isso inclui tipos de dados primitivos, como doubles, floats e integers, como você viu no método `computePayment()`, e tipos de dados de referência, como objetos e arrays.

Aqui está um exemplo de um método que aceita um array como argumento. Neste exemplo, o método cria um novo objeto `Polygon` e o inicializa a partir de um array de objetos `Point` (assuma que `Point` é uma classe que representa uma coordenada `x`, `y`):

```java
public Polygon polygonFrom(Point[] corners) {
  // construct a Polygon from the given points
  ...
}
```

## Número Arbitrário de Argumentos

Você pode usar uma construção chamada _varargs_ para passar um número arbitrário de valores para um método. Você usa varargs quando não sabe quantos argumentos de um tipo específico serão passados para o método. É um atalho para criar um array manualmente (o método anterior poderia ter usado varargs em vez de um array).

Para usar varargs, você segue o tipo do último parâmetro com uma elipse (três pontos, ...), depois um espaço, e o nome do parâmetro. O método pode então ser chamado com qualquer número desse parâmetro, incluindo nenhum.

```java
public Polygon polygonFrom(Point... corners) {
  int numberOfSides = corners.length;
  double squareOfSide1, lengthOfSide1;
  // compute length of sides and other properties
  // of the polygon
  ...
}
```

Você pode ver que, dentro do método, `corners` é tratado como um array. O método pode ser chamado tanto com um array quanto com uma sequência de argumentos. O código no corpo do método tratará o parâmetro como um array em ambos os casos.

Você verá varargs mais comumente com os métodos de impressão; por exemplo, este método `printf()`:

```java
public PrintStream printf(String format, Object... args)
```

permite imprimir um número arbitrário de objetos. Ele pode ser chamado assim:

```java
System.out.printf("%s: %s %s %s%n", name, num, str, val);
```

ou assim

```java
System.out.printf("%s: %s %s %s %s %s%n", name, num, str, val, val2, val3);
```

ou com um número diferente de argumentos.

## Nomes de Parâmetros

Ao declarar um parâmetro para um método ou um construtor, você fornece um nome para esse parâmetro. Este nome é usado dentro do corpo do método para se referir ao argumento passado.

O nome de um parâmetro deve ser único em seu escopo. Ele não pode ser o mesmo nome de outro parâmetro para o mesmo método ou construtor, e não pode ser o nome de uma variável local dentro do método ou construtor.

Um parâmetro pode ter o mesmo nome que um dos campos da classe. Se este for o caso, diz-se que o parâmetro sombreia o campo. Sombrear campos pode tornar seu código difícil de ler e é convencionalmente usado apenas dentro de construtores e métodos que definem um campo específico. Por exemplo, considere a seguinte classe `Circle` e seu método `setOrigin()`:

```java
public class Circle {
  private int x, y, radius;
  public void setOrigin(int x, int y) {
    x = x;
    y = y;
  }
}
```

A classe `Circle` possui três campos: `x`, `y` e `radius`. O método `setOrigin()` possui dois parâmetros, cada um com o mesmo nome de um dos campos. Cada parâmetro do método sombreia o campo que compartilha seu nome. Assim, usar os nomes simples `x` ou `y` dentro do corpo do método refere-se ao parâmetro, não ao campo. Para acessar o campo, você deve usar um nome qualificado. Isso será discutido mais adiante nesta lição na seção intitulada "Usando a Palavra-Chave `this`."

## Passando Argumentos de Tipo de Dado Primitivo

Argumentos primitivos, como um `int` ou um `double`, são passados para métodos por valor. Isso significa que quaisquer alterações nos valores dos parâmetros existem apenas dentro do escopo do método. Quando o método retorna, os parâmetros desaparecem e quaisquer alterações neles são perdidas. Aqui está um exemplo:

```java
public class PassPrimitiveByValue {

  public static void main(String[] args) {

    int x = 3;

    // invoke passMethod() with
    // x as argument
    passMethod(x);

    // print x to see if its
    // value has changed
    System.out.println("After invoking passMethod, x = " + x);

  }

  public static void passMethod(int p) {
    p = 10;
  }
}
```

Ao executar este programa, a saída é:

```
After invoking passMethod, x = 3
```

## Passando Argumentos de Tipo de Dado de Referência

Parâmetros de tipo de dado de referência, como objetos, também são passados para métodos por valor. Isso significa que, quando o método retorna, a referência passada ainda referencia o mesmo objeto de antes. No entanto, os valores dos campos do objeto podem ser alterados no método, se tiverem o nível de acesso apropriado.

Por exemplo, considere um método em uma classe arbitrária que move objetos `Circle`:

```java
public void moveCircle(Circle circle, int deltaX, int deltaY) {
  circle.x += deltaX;
  circle.y += deltaY;
}
```

Seja o método invocado com estes argumentos:

```java
moveCircle(myCircle, 23, 56);
```

Dentro do método, `circle` inicialmente se refere a `myCircle`. O método altera as coordenadas `x` e `y` do objeto que `circle` referencia (ou seja, `myCircle`) em 23 e 56, respectivamente. Essas alterações persistirão quando o método retornar. Então `circle` é atribuído a uma referência a um novo objeto `Circle` com `x = y = 0`. No entanto, essa reatribuição não tem permanência, porque a referência foi passada por valor e não pode ser alterada. Dentro do método, o objeto apontado por `circle` foi alterado, mas, quando o método retorna, `myCircle` ainda referencia o mesmo objeto `Circle` de antes da chamada do método.

### Neste tutorial

Passando Informações para um Método ou um Construtor Tipos de Parâmetros Número Arbitrário de Argumentos Nomes de Parâmetros Passando Argumentos de Tipo de Dado Primitivo Passando Argumentos de Tipo de Dado de Referência

Última atualização: 5 de janeiro de 2024

**Anterior na Série**

[Fornecendo Construtores para suas Classes](<#/doc/tutorials/classes-objects/defining-constructors>)

➜

**Tutorial Atual**

Chamando Métodos e Construtores

➜

**Próximo na Série**

[Criando e Usando Objetos](<#/doc/tutorials/classes-objects/creating-objects>)

**Anterior na Série:** [Fornecendo Construtores para suas Classes](<#/doc/tutorials/classes-objects/defining-constructors>)

**Próximo na Série:** [Criando e Usando Objetos](<#/doc/tutorials/classes-objects/creating-objects>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Classes e Objetos ](<#/doc/tutorials/classes-objects>) > Chamando Métodos e Construtores