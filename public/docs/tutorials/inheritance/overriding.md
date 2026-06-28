# Sobrescrevendo e Ocultando Métodos

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Herança ](<#/doc/tutorials/inheritance>) > Sobrescrevendo e Ocultando Métodos

**Anterior na Série**

[Herança](<#/doc/tutorials/inheritance/what-is-inheritance>)

➜

**Tutorial Atual**

Sobrescrevendo e Ocultando Métodos

➜

**Próximo na Série**

[Polimorfismo](<#/doc/tutorials/inheritance/polymorphism>)

**Anterior na Série:** [Herança](<#/doc/tutorials/inheritance/what-is-inheritance>)

**Próximo na Série:** [Polimorfismo](<#/doc/tutorials/inheritance/polymorphism>)

# Sobrescrevendo e Ocultando Métodos

## Métodos de Instância

Um método de instância em uma subclasse com a mesma signature (nome, mais o número e o tipo de seus parâmetros) e return type que um método de instância na superclasse sobrescreve o método da superclasse.

A capacidade de uma subclasse sobrescrever um método permite que uma classe herde de uma superclasse cujo comportamento é "próximo o suficiente" e, em seguida, modifique o comportamento conforme necessário. O método sobrescritor tem o mesmo nome, número e tipo de parâmetros, e return type que o método que ele sobrescreve. Um método sobrescritor também pode retornar um subtipo do tipo retornado pelo método sobrescrito. Este subtipo é chamado de tipo de retorno covariante.

Ao sobrescrever um método, você pode querer usar a anotação [`@Override`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Override.html>) que instrui o compiler que você pretende sobrescrever um método na superclasse. Se, por algum motivo, o compiler detectar que o método não existe em uma das superclasses, ele gerará um erro. Para mais informações sobre [`@Override`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Override.html>), consulte a seção [Annotations](<#/doc/tutorials/annotations>).

## Métodos Estáticos

Se uma subclasse define um método static com a mesma signature que um método static na superclasse, então o método na subclasse oculta o da superclasse.

A distinção entre ocultar um método static e sobrescrever um método de instância tem implicações importantes:

*   A versão do método de instância sobrescrito que é invocada é a da subclasse.

*   A versão do método static oculto que é invocada depende se ele é invocado da superclasse ou da subclasse.

*   Considere um exemplo que contém duas classes. A primeira é `Animal`, que contém um método de instância e um método static:

```java
public class Animal {
    public static void testClassMethod() {
        System.out.println("The static method in Animal");
    }
    public void testInstanceMethod() {
        System.out.println("The instance method in Animal");
    }
}
```

A segunda classe, uma subclasse de `Animal`, é chamada `Cat`:

```java
public class Cat extends Animal {
    public static void testClassMethod() {
        System.out.println("The static method in Cat");
    }
    public void testInstanceMethod() {
        System.out.println("The instance method in Cat");
    }

    public static void main(String[] args) {
        Cat myCat = new Cat();
        Animal myAnimal = myCat;
        Animal.testClassMethod();
        myAnimal.testInstanceMethod();
    }
}
```

A classe `Cat` sobrescreve o método de instância em `Animal` e oculta o método static em `Animal`. O método `main` nesta classe cria uma instância de `Cat` e invoca `testClassMethod` na classe e `testInstanceMethod` na instância.

A saída deste programa é a seguinte:

```
The static method in Animal
The instance method in Cat
```

Conforme prometido, a versão do método static oculto que é invocada é a da superclasse, e a versão do método de instância sobrescrito que é invocada é a da subclasse.

## Métodos de Interface

Default methods e abstract methods em interfaces são herdados como métodos de instância. No entanto, quando os supertypes de uma classe ou interface fornecem múltiplos default methods com a mesma signature, o Java compiler segue as regras de herança para resolver o conflito de nomes. Essas regras são impulsionadas pelos dois princípios a seguir.

*   Métodos de instância são preferidos em relação aos default methods de interface.

Considere as seguintes classes e interfaces:

```java
public interface Horse {
    default public String identifyMyself() {
        return "I am a horse";
    }
}
public interface Pegasus extends Horse {
    default public String identifyMyself() {
        return "I am a pegasus";
    }
}
public class Animal {
    public String identifyMyself() {
        return "I am an animal";
    }
}
public class Fantasy extends Animal implements Pegasus {
}
```

O método `Pegasus.identifyMyself()` retorna a string `I am a horse`.

*   Métodos que já foram sobrescritos por outros candidatos são ignorados. Esta circunstância pode surgir quando supertypes compartilham um ancestral comum.

Considere as seguintes interfaces e classes:

```java
public interface EggLayer {
    default public String identifyMyself() {
        return "I am able to lay eggs.";
    }
}
public interface Wagoner {
    default public String identifyMyself() {
        return "I am able to pull a wagon.";
    }
}
public interface Dragon extends EggLayer, Wagoner {
    default public String identifyMyself() {
        return "I am a dragon.";
    }
}
public class Animal {
    public String identifyMyself() {
        return "I am an animal.";
    }
}
public class Mythical extends Animal implements Dragon {
}
```

O método `Dragon.identifyMyself()` retorna a string `I am able to lay eggs`.

Se dois ou mais default methods definidos independentemente entrarem em conflito, ou um default method entrar em conflito com um abstract method, então o Java compiler produzirá um erro de compilação. Você deve sobrescrever explicitamente os métodos do supertype.

Considere o exemplo sobre carros controlados por computador que agora podem voar. Você tem duas interfaces (`OperateCar` e `FlyCar`) que fornecem implementações default para o mesmo método, (`startEngine()`):

```java
public interface OperateCar {
    // ...
    default public void startEngine() {
        System.out.println("OperateCar::startEngine");
    }
}
public interface FlyCar {
    // ...
    default public void startEngine() {
        System.out.println("FlyCar::startEngine");
    }
}
```

Uma classe que implementa `OperateCar` e `FlyCar` deve sobrescrever o método `startEngine()`. Você pode invocar qualquer uma das implementações default com a palavra-chave `super`.

```java
public class FlyingCar implements OperateCar, FlyCar {
    // ...
    @Override
    public void startEngine() {
        FlyCar.super.startEngine(); // Invokes default method from FlyCar
        OperateCar.super.startEngine(); // Invokes default method from OperateCar
        System.out.println("FlyingCar::startEngine");
    }
}
```

O nome que precede `super` (neste exemplo, `FlyCar` ou `OperateCar`) deve se referir a uma superinterface direta que define ou herda um default para o método invocado. Esta forma de invocação de método não se restringe a diferenciar entre múltiplas interfaces implementadas que contêm default methods com a mesma signature. Você pode usar a palavra-chave `super` para invocar um default method tanto em classes quanto em interfaces.

Métodos de instância herdados de classes podem sobrescrever abstract interface methods. Considere as seguintes interfaces e classes:

```java
public interface Mammal {
    String identifyMyself();
}
public class Horse {
    public String identifyMyself() {
        return "I am a horse";
    }
}
public class Mustang extends Horse implements Mammal {
}
```

O método `Mustang.identifyMyself()` retorna a string `I am a horse`. A classe `Mustang` herda o método `identifyMyself()` da classe `Horse`, que sobrescreve o método abstrato de mesmo nome na interface `Mammal`.

> Nota: Métodos estáticos em interfaces nunca são herdados.

## Modificadores

O access specifier para um método sobrescritor pode permitir mais, mas não menos, acesso do que o método sobrescrito. Por exemplo, um método de instância `protected` na superclasse pode ser tornado `public`, mas não `private`, na subclasse.

Você receberá um compile-time error se tentar mudar um método de instância na superclasse para um método static na subclasse, e vice-versa.

## Resumo

A tabela a seguir resume o que acontece quando você define um método com a mesma signature que um método em uma superclasse.

| | Método de Instância da Superclasse | Método Estático da Superclasse |
|---|---|---|
| **Método de Instância da Subclasse** | Sobrescreve | Gera um erro em tempo de compilação |
| **Método Estático da Subclasse** | Gera um erro em tempo de compilação | Oculta |

> Nota: Em uma subclasse, você pode sobrecarregar os métodos herdados da superclasse. Tais métodos sobrecarregados não ocultam nem sobrescrevem os métodos de instância da superclasse — eles são novos métodos, únicos da subclasse.

### Neste tutorial

Métodos de Instância
Métodos Estáticos
Métodos de Interface
Modificadores
Resumo

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Herança](<#/doc/tutorials/inheritance/what-is-inheritance>)

➜

**Tutorial Atual**

Sobrescrevendo e Ocultando Métodos

➜

**Próximo na Série**

[Polimorfismo](<#/doc/tutorials/inheritance/polymorphism>)

**Anterior na Série:** [Herança](<#/doc/tutorials/inheritance/what-is-inheritance>)

**Próximo na Série:** [Polimorfismo](<#/doc/tutorials/inheritance/polymorphism>)

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Herança ](<#/doc/tutorials/inheritance>) > Sobrescrevendo e Ocultando Métodos