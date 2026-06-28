# Interfaces

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Interfaces ](<#/doc/tutorials/interfaces>) > Interfaces

**Tutorial Atual**

Interfaces

➜

**Próximo na Série**

[Implementando uma Interface](<#/doc/tutorials/interfaces/examples>)

**Próximo na Série:** [Implementando uma Interface](<#/doc/tutorials/interfaces/examples>)

# Interfaces

## Interfaces em Java

Existem diversas situações na engenharia de software em que é importante que grupos distintos de programadores concordem com um "contrato" que especifica como seus softwares interagem. Cada grupo deve ser capaz de escrever seu código sem qualquer conhecimento de como o código do outro grupo é escrito. De modo geral, _interfaces_ são esses contratos.

Por exemplo, imagine uma sociedade futurista onde carros robóticos controlados por computador transportam passageiros pelas ruas da cidade sem um operador humano. Fabricantes de automóveis escrevem software (Java, é claro) que opera o automóvel — parar, ligar, acelerar, virar à esquerda e assim por diante. Outro grupo industrial, fabricantes de instrumentos de orientação eletrônica, criam sistemas de computador que recebem dados de posição GPS (Global Positioning System) e transmissão sem fio de condições de tráfego e usam essas informações para dirigir o carro.

Os fabricantes de automóveis devem publicar uma interface padrão da indústria que detalha quais métodos podem ser invocados para fazer o carro se mover (qualquer carro, de qualquer fabricante). Os fabricantes de sistemas de orientação podem então escrever software que invoca os métodos descritos na interface para comandar o carro. Nenhum dos grupos industriais precisa saber como o software do outro grupo é implementado. Na verdade, cada grupo considera seu software altamente proprietário e reserva o direito de modificá-lo a qualquer momento, desde que continue a aderir à interface publicada.

Na linguagem de programação Java, uma _interface_ é um tipo de referência, semelhante a uma classe, que pode conter _apenas_ constantes, assinaturas de métodos, métodos default, métodos estáticos (private ou public, não protected), métodos de instância não abstratos (private, não public, não protected) e tipos aninhados. Corpos de métodos existem apenas para métodos default, métodos private e métodos estáticos. Interfaces não podem ser instanciadas — elas só podem ser implementadas por classes ou estendidas por outras interfaces. A extensão é discutida mais adiante nesta seção.

Definir uma interface é semelhante a criar uma nova classe:

```java
public interface OperateCar {
    // Declare constant fields
    // An enum is a special kind of class.
    enum Direction {RIGHT, LEFT};

    // Declare method signatures
    void turn(Direction direction, double radius);
    double getSpeed();
    String getManufacturer();
}
```

Observe que as assinaturas dos métodos não possuem chaves e são terminadas com um ponto e vírgula.

Para usar uma interface, você escreve uma classe que implementa a interface. Quando uma classe instanciável implementa uma interface, ela fornece um corpo de método para cada um dos métodos declarados na interface. Por exemplo,

```java
public class OperateBMW760i implements OperateCar {

    // Implement method turn
    public void turn(Direction direction, double radius) {
        // ...
    }

    // Implement method getSpeed
    public double getSpeed() {
        return 0.0; // ...
    }

    // Implement method getManufacturer
    public String getManufacturer() {
        return "BMW"; // ...
    }
}
```

No exemplo do carro robótico acima, são os fabricantes de automóveis que implementarão a interface. A implementação da Chevrolet será substancialmente diferente da da Toyota, é claro, mas ambos os fabricantes aderirão à mesma interface. Os fabricantes de sistemas de orientação, que são os clientes da interface, construirão sistemas que usam dados de GPS sobre a localização de um carro, mapas digitais de ruas e dados de tráfego para dirigir o carro. Ao fazer isso, os sistemas de orientação invocarão os métodos da interface: turn, change lanes, brake, accelerate, e assim por diante.

## Interfaces como APIs

O exemplo do carro robótico mostra uma interface sendo usada como uma _Application Programming Interface_ (API) padrão da indústria. APIs também são comuns em produtos de software comerciais. Tipicamente, uma empresa vende um pacote de software que contém métodos complexos que outra empresa deseja usar em seu próprio produto de software. Um exemplo seria um pacote de métodos de processamento de imagem digital que são vendidos para empresas que criam programas gráficos para usuários finais:

*   A empresa de processamento de imagem escreve suas classes para implementar uma interface, que ela torna pública para seus clientes.
*   A empresa de gráficos então invoca os métodos de processamento de imagem usando as assinaturas e tipos de retorno definidos na interface.

Embora a API da empresa de processamento de imagem seja tornada pública (para seus clientes), sua implementação da API é mantida como um segredo bem guardado — na verdade, ela pode revisar a implementação em uma data posterior, desde que continue a implementar a interface original na qual seus clientes confiaram. Interfaces são tipos de referência versáteis que permitem definir métodos `default` e adicionar funcionalidade a um determinado tipo sem quebrar as classes implementadoras. Além disso, às vezes você pode extrair partes comuns de código em métodos `private`, reduzindo assim a duplicação de código em métodos `default`. Confira o próximo tutorial desta série para saber mais sobre a definição de métodos dentro de uma interface.

## Definindo uma Interface

Uma declaração de interface consiste em modificadores, a palavra-chave `interface`, o nome da interface, uma lista separada por vírgulas de interfaces pai (se houver) e o corpo da interface. Por exemplo:

```java
public interface GroupedInterface extends Interface1, Interface2, Interface3 {

    // constant declarations
    double E = 2.718282;    // base of natural logarithms

    // method signatures
    void doSomething(int i, double x);
    int doSomethingElse(String s);
}
```

O especificador de acesso `public` indica que a interface pode ser usada por qualquer classe em qualquer pacote. Se você não especificar que a interface é public, então sua interface será acessível apenas a classes definidas no mesmo pacote que a interface.

Uma interface pode estender outras interfaces, assim como uma classe pode ser subclasse ou estender outra classe. No entanto, enquanto uma classe pode estender apenas uma outra classe, uma interface pode estender qualquer número de interfaces. A declaração da interface inclui uma lista separada por vírgulas de todas as interfaces que ela estende.

Uma interface pode conter constantes, assinaturas de métodos, métodos default, métodos estáticos (private ou public, não protected), métodos de instância não abstratos (private, não public, não protected) e tipos aninhados.

Um método abstrato dentro de uma interface é seguido por um ponto e vírgula, mas sem chaves (um método abstrato não contém uma implementação).

Métodos default são definidos com o modificador `default`, e métodos estáticos com a palavra-chave `static`. Todos os métodos abstratos, default e estáticos em uma interface são implicitamente public, então você pode omitir o modificador `public`.

Além disso, uma interface pode conter declarações de constantes. Todos os valores constantes definidos em uma interface são implicitamente `public`, `static` e `final`. Mais uma vez, você pode omitir esses modificadores.

### Neste tutorial

Interfaces em Java Interfaces como APIs Definindo uma Interface

Última atualização: 5 de janeiro de 2024

**Tutorial Atual**

Interfaces

➜

**Próximo na Série**

[Implementando uma Interface](<#/doc/tutorials/interfaces/examples>)

**Próximo na Série:** [Implementando uma Interface](<#/doc/tutorials/interfaces/examples>)

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Interfaces ](<#/doc/tutorials/interfaces>) > Interfaces