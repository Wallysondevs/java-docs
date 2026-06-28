# Polimorfismo

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Herança ](<#/doc/tutorials/inheritance>) > Polimorfismo

**Anterior na Série**

[Sobrescrevendo e Ocultando Métodos](<#/doc/tutorials/inheritance/overriding>)

➜

**Tutorial Atual**

Polimorfismo

➜

**Próximo na Série**

[Object como Superclasse](<#/doc/tutorials/inheritance/objects>)

**Anterior na Série:** [Sobrescrevendo e Ocultando Métodos](<#/doc/tutorials/inheritance/overriding>)

**Próximo na Série:** [Object como Superclasse](<#/doc/tutorials/inheritance/objects>)

# Polimorfismo

## Polimorfismo

A definição de dicionário de polimorfismo refere-se a um princípio na biologia em que um organismo ou espécie pode ter muitas formas ou estágios diferentes. Este princípio também pode ser aplicado à programação orientada a objetos e linguagens como a linguagem Java. Subclasses de uma classe podem definir seus próprios comportamentos únicos e ainda compartilhar algumas das mesmas funcionalidades da classe pai.

O polimorfismo pode ser demonstrado com uma pequena modificação na classe `Bicycle`. Por exemplo, um método `printDescription()` poderia ser adicionado à classe que exibe todos os dados atualmente armazenados em uma instância.

Para demonstrar recursos polimórficos na linguagem Java, estenda a classe `Bicycle` com uma classe `MountainBike` e uma classe `RoadBike`. Para `MountainBike`, adicione um campo para suspensão, que é um valor [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) que indica se a bicicleta tem um amortecedor dianteiro, `Front`. Ou, se a bicicleta tem amortecedores dianteiro e traseiro, `Dual`.

Aqui está a classe atualizada:

```java
public class Bicycle {

    public int cadence;
    public int gear;
    public int speed;

    public Bicycle(int startCadence, int startSpeed, int startGear) {
        gear = startGear;
        cadence = startCadence;
        speed = startSpeed;
    }

    public void setCadence(int newValue) {
        cadence = newValue;
    }

    public void setGear(int newValue) {
        gear = newValue;
    }

    public void applyBrake(int decrement) {
        speed -= decrement;
    }

    public void speedUp(int increment) {
        speed += increment;
    }

    public void printDescription(){
        System.out.println("\nBike is in " + "gear " + this.gear + " with a cadence of " + this.cadence +
            " and travelling at a speed of " + this.speed + ". ");
    }
}
```

Observe o método `printDescription()` sobrescrito. Além das informações fornecidas anteriormente, dados adicionais sobre a suspensão são incluídos na saída.

```java
public class MountainBike extends Bicycle {

    public String suspension;

    public MountainBike(int startCadence, int startSpeed, int startGear,
                        String suspensionType) {
        super(startCadence,
              startSpeed,
              startGear);
        this.suspension = suspensionType;
    }

    public void setSuspension(String suspensionType) {
        this.suspension = suspensionType;
    }

    public void printDescription() {
        System.out.println("\nBike is in " + this.gear + " gear with a cadence of " + this.cadence +
            " and travelling at a speed of " + this.speed + ". " + "Suspension: " + suspension);
    }
}
```

Em seguida, crie a classe `RoadBike`. Como bicicletas de estrada ou de corrida têm pneus finos, adicione um atributo para rastrear a largura do pneu. Aqui está a classe `RoadBike`:

```java
public class RoadBike extends Bicycle {

    // In millimeters (mm)
    private int tireWidth;

    public RoadBike(int startCadence, int startSpeed, int startGear, int newTireWidth) {
        super(startCadence, startSpeed, startGear);
        this.tireWidth = newTireWidth;
    }

    public void setTireWidth(int newTireWidth) {
        this.tireWidth = newTireWidth;
    }

    public void printDescription() {
        System.out.println("\nBike is in " + this.gear + " gear with a cadence of " + this.cadence +
            " and travelling at a speed of " + this.speed + ". " + "Tire width " + tireWidth + " mm.");
    }
}
```

Observe que, mais uma vez, o método `printDescription()` foi sobrescrito. Desta vez, informações sobre a largura do pneu são exibidas.

Para resumir, existem três classes: `Bicycle`, `MountainBike` e `RoadBike`. As duas subclasses sobrescrevem o método `printDescription()` e imprimem informações únicas.

Aqui está um programa de teste que cria três variáveis `Bicycle`. Cada variável é atribuída a uma das três classes de bicicleta. Cada variável é então impressa.

```java
public class TestBikes {
    public static void main (String[] args){
        Bicycle bike01, bike02, bike03;

        bike01 = new Bicycle(20, 10, 1);
        bike02 = new MountainBike(20, 10, 5, "Dual");
        bike03 = new RoadBike(40, 20, 8, 23);

        bike01.printDescription();
        bike02.printDescription();
        bike03.printDescription();
    }
}
```

A seguir está a saída do programa de teste:

```
Bike is in gear 1 with a cadence of 20 and travelling at a speed of 10. 
Bike is in 5 gear with a cadence of 20 and travelling at a speed of 10. Suspension: Dual
Bike is in 8 gear with a cadence of 40 and travelling at a speed of 20. Tire width 23 mm.
```

A máquina virtual Java (JVM) chama o método apropriado para o objeto que é referenciado em cada variável. Ela não chama o método que é definido pelo tipo da variável. Este comportamento é conhecido como invocação de método virtual e demonstra um aspecto das importantes características de polimorfismo na linguagem Java.

## Ocultando Campos

Dentro de uma classe, um campo que tem o mesmo nome de um campo na superclasse oculta o campo da superclasse, mesmo que seus tipos sejam diferentes. Dentro da subclasse, o campo na superclasse não pode ser referenciado por seu nome simples. Em vez disso, o campo deve ser acessado através de `super`, o que é abordado na próxima seção. De modo geral, não recomendamos ocultar campos, pois isso torna o código difícil de ler.

## Usando a Palavra-Chave Super

### Acessando Membros da Superclasse

Se seu método sobrescreve um dos métodos de sua superclasse, você pode invocar o método sobrescrito através do uso da palavra-chave `super`. Você também pode usar `super` para se referir a um campo oculto (embora ocultar campos seja desencorajado). Considere esta classe, `Superclass`:

```java
public class Superclass {

    public void printMethod() {
        System.out.println("Printed in Superclass.");
    }
}
```

Aqui está uma subclasse, chamada `Subclass`, que sobrescreve `printMethod()`:

```java
public class Subclass extends Superclass {

    // Overrides printMethod in Superclass
    public void printMethod() {
        super.printMethod();
        System.out.println("Printed in Subclass.");
    }

    public static void main(String[] args) {
        Subclass s = new Subclass();
        s.printMethod();
    }
}
```

Dentro de `Subclass`, o nome simples `printMethod()` refere-se ao declarado em `Subclass`, que sobrescreve o da `Superclass`. Assim, para se referir a `printMethod()` herdado de `Superclass`, `Subclass` deve usar um nome qualificado, usando `super` conforme mostrado. Compilar e executar `Subclass` imprime o seguinte:

```
Printed in Superclass.
Printed in Subclass.
```

### Construtores de Subclasses

O exemplo a seguir ilustra como usar a palavra-chave `super` para invocar o construtor de uma superclasse. Lembre-se do exemplo `Bicycle` que `MountainBike` é uma subclasse de `Bicycle`. Aqui está o construtor de `MountainBike` (subclasse) que chama o construtor da superclasse e então adiciona seu próprio código de inicialização:

```java
public MountainBike(int startCadence, int startSpeed, int startGear,
                    String suspensionType) {
    super(startCadence,
          startSpeed,
          startGear);
    this.suspension = suspensionType;
}
```

A invocação de um construtor de superclasse deve ser a primeira linha no construtor da subclasse até o Java 25, onde você pode executar código antes desta invocação.

A sintaxe para chamar um construtor de superclasse é

```java
super();
```

ou

```java
super(parameterList);
```

Com `super()`, o construtor sem argumentos da superclasse é chamado. Com `super(parameter list)`, o construtor da superclasse com uma lista de parâmetros correspondente é chamado.

> Nota: Se um construtor não invocar explicitamente um construtor de superclasse, o compilador Java insere automaticamente uma chamada para o construtor sem argumentos da superclasse. Se a superclasse não tiver um construtor sem argumentos, você receberá um erro em tempo de compilação. `Object` possui tal construtor, então se [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>) for a única superclasse, não há problema.

Se um construtor de subclasse invoca um construtor de sua superclasse, seja explicitamente ou implicitamente, você pode pensar que haverá uma cadeia inteira de construtores chamados, desde o construtor de [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>). De fato, este é o caso. É chamado de _encadeamento de construtores_ e você precisa estar ciente disso quando há uma longa linha de descendência de classes.

## Escrevendo Classes e Métodos Finais

Você pode declarar alguns ou todos os métodos de uma classe como `final`. Você usa a palavra-chave `final` em uma declaração de método para indicar que o método não pode ser sobrescrito por subclasses. A classe [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>) faz isso — vários de seus métodos são `final`.

Você pode desejar tornar um método `final` se ele tiver uma implementação que não deve ser alterada e for crítico para o estado consistente do objeto. Por exemplo, você pode querer tornar o método `getFirstPlayer()` nesta classe `ChessAlgorithm` final:

```java
class ChessAlgorithm {
    enum ChessPlayer { WHITE, BLACK }
    
    final ChessPlayer getFirstPlayer() {
        return ChessPlayer.WHITE;
    }
}
```

Métodos chamados de construtores geralmente devem ser declarados como `final`. Se um construtor chama um método não `final`, uma subclasse pode redefinir esse método com resultados surpreendentes ou indesejáveis.

Observe que você também pode declarar uma classe inteira como `final`. Uma classe que é declarada `final` não pode ser estendida (subclassificada). Isso é particularmente útil, por exemplo, ao criar uma classe imutável como a classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>).

### Neste tutorial

Polimorfismo Ocultando Campos Usando a Palavra-Chave super Escrevendo Classes e Métodos Finais

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Sobrescrevendo e Ocultando Métodos](<#/doc/tutorials/inheritance/overriding>)

➜

**Tutorial Atual**

Polimorfismo

➜

**Próximo na Série**

[Object como Superclasse](<#/doc/tutorials/inheritance/objects>)

**Anterior na Série:** [Sobrescrevendo e Ocultando Métodos](<#/doc/tutorials/inheritance/overriding>)

**Próximo na Série:** [Object como Superclasse](<#/doc/tutorials/inheritance/objects>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Herança ](<#/doc/tutorials/inheritance>) > Polimorfismo