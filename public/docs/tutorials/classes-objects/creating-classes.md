# Criando Classes

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Classes e Objetos ](<#/doc/tutorials/classes-objects>) > Criando Classes

**Tutorial Atual**

Criando Classes

➜

**Próximo na Série**

[Definindo Métodos](<#/doc/tutorials/classes-objects/defining-methods>)

**Próximo na Série:** [Definindo Métodos](<#/doc/tutorials/classes-objects/defining-methods>)

# Criando Classes

## Declarando Classes

A introdução aos conceitos de orientação a objetos na seção intitulada [Objeto, Classes e Interfaces](<#/doc/tutorials/oop>) usou uma classe `Bicycle` como exemplo, com bicicletas de corrida, mountain bikes e bicicletas tandem como subclasses. Aqui está um código de exemplo para uma possível implementação de uma classe `Bicycle`, para lhe dar uma visão geral de uma declaração de classe. As seções subsequentes irão retroceder e explicar as declarações de classe passo a passo. Por enquanto, não se preocupe com os detalhes.

Uma declaração de classe para uma classe `MountainBike` que é uma subclasse de `Bicycle` pode ser assim:

```java
class MountainBike extends Bicycle {
    public int seatHeight;

    public MountainBike(int startHeight, int startCadence,
                        int startSpeed, int startGear) {
        super(startCadence, startSpeed, startGear);
        seatHeight = startHeight;
    }

    public void setHeight(int newValue) {
        seatHeight = newValue;
    }
}
```

`MountainBike` herda todos os campos e métodos de `Bicycle` e adiciona o campo `seatHeight` e um método para defini-lo (mountain bikes têm assentos que podem ser movidos para cima e para baixo conforme o terreno exige).

Você já viu classes definidas da seguinte maneira:

```java
class MyClass {

}
```

Esta é uma declaração de classe. O corpo da classe (a área entre as chaves) contém todo o código que provê o ciclo de vida dos objetos criados a partir da classe: construtores para inicializar novos objetos, declarações para os campos que fornecem o estado da classe e seus objetos, e métodos para implementar o comportamento da classe e seus objetos.

A declaração de classe precedente é mínima. Ela contém apenas os componentes de uma declaração de classe que são necessários. Você pode fornecer mais informações sobre a classe, como o nome de sua superclasse, se ela implementa alguma interface, e assim por diante, no início da declaração da classe. Por exemplo,

```java
public class MyClass extends MySuperClass implements YourInterface {
    // field, constructor, and method declarations
}
```

significa que `MyClass` é uma subclasse de `MySuperClass` e que ela implementa a interface `YourInterface`.

Você também pode adicionar modificadores como `public` ou `private` logo no início — então você pode ver que a linha de abertura de uma declaração de classe pode se tornar bastante complicada. Os modificadores `public` e `private`, que determinam quais outras classes podem acessar `MyClass`, são discutidos mais adiante nesta seção. A seção sobre interfaces e herança explicará como e por que você usaria as palavras-chave `extends` e `implements` em uma declaração de classe. Por enquanto, você não precisa se preocupar com essas complicações extras.

Em geral, as declarações de classe podem incluir estes componentes, em ordem:

1.  Modificadores como `public`, `private`, e vários outros que você encontrará mais tarde. (No entanto, observe que o modificador `private` só pode ser aplicado a `Nested Classes`.)
2.  O nome da classe, com a letra inicial capitalizada por convenção.
3.  O nome da classe pai (superclasse), se houver, precedido pela palavra-chave `extends`. Uma classe pode estender (subclassificar) apenas um pai.
4.  Uma lista separada por vírgulas de interfaces implementadas pela classe, se houver, precedida pela palavra-chave `implements`. Uma classe pode implementar mais de uma interface.
5.  O corpo da classe, cercado por chaves, `{}`.

## Declarando Variáveis Membro

Existem vários tipos de variáveis:

*   Variáveis membro em uma classe — estas são chamadas de campos.
*   Variáveis em um método ou bloco de código — estas são chamadas de variáveis locais.
*   Variáveis em declarações de método — estas são chamadas de parâmetros.
*   A classe `Bicycle` usa as seguintes linhas de código para definir seus campos:

```java
public int cadence;
public int gear;
public int speed;
```

As declarações de campo são compostas por três componentes, em ordem:

1.  Zero ou mais modificadores, como `public` ou `private`.
2.  O tipo do campo.
3.  O nome do campo.

Os campos de `Bicycle` são nomeados `cadence`, `gear` e `speed` e são todos do tipo de dado inteiro (`int`). A palavra-chave `public` identifica esses campos como membros públicos, acessíveis por qualquer objeto que possa acessar a classe.

## Controlando quem tem Acesso a um Membro

O primeiro modificador (mais à esquerda) usado permite controlar quais outras classes têm acesso a um campo membro. Por enquanto, considere apenas `public` e `private`. Outros modificadores de acesso serão discutidos mais tarde.

*   Modificador `public` — o campo é acessível de todas as classes.
*   Modificador `private` — o campo é acessível apenas dentro de sua própria classe.

Observe que existem algumas exceções a essas regras, que são abordadas mais adiante nesta seção.

No espírito da encapsulamento, é comum tornar os campos privados. Isso significa que eles só podem ser acessados diretamente da classe `Bicycle`. No entanto, ainda precisamos de acesso a esses valores. Isso pode ser feito indiretamente adicionando métodos públicos que obtêm os valores dos campos para nós:

```java
public class Bicycle {
    private int cadence;
    private int gear;
    private int speed;

    public Bicycle(int startCadence, int startSpeed, int startGear) {
        this.cadence = startCadence;
        this.speed = startSpeed;
        this.gear = startGear;
    }

    public int getCadence() {
        return cadence;
    }

    public int getGear() {
        return gear;
    }

    public int getSpeed() {
        return speed;
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
}
```

## Definindo o Tipo de uma Variável

Todas as variáveis devem ter um tipo. Você pode usar tipos primitivos como `int`, `float`, `boolean`, etc. Ou você pode usar tipos de referência, como `strings`, `arrays` ou `objects`.

## Nomeando uma Variável

Todas as variáveis, sejam elas campos, variáveis locais ou parâmetros, seguem as mesmas regras e convenções de nomenclatura que foram abordadas na seção Noções Básicas da Linguagem, [Nomenclatura de Variáveis](<#/doc/tutorials/language-basics/variables>).

Nesta seção, esteja ciente de que as mesmas regras e convenções de nomenclatura são usadas para nomes de métodos e classes, exceto que

*   a primeira letra de um nome de classe deve ser capitalizada, e
*   a primeira (ou única) palavra em um nome de método deve ser um verbo.

### Neste tutorial

Declarando Classes Declarando Variáveis Membro Controlando quem tem Acesso a um Membro Definindo o Tipo de uma Variável Nomeando uma Variável

Última atualização: 5 de janeiro de 2024

**Tutorial Atual**

Criando Classes

➜

**Próximo na Série**

[Definindo Métodos](<#/doc/tutorials/classes-objects/defining-methods>)

**Próximo na Série:** [Definindo Métodos](<#/doc/tutorials/classes-objects/defining-methods>)

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Classes e Objetos ](<#/doc/tutorials/classes-objects>) > Criando Classes