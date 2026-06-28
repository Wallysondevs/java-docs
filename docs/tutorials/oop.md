# Objetos, Classes, Interfaces, Pacotes e Herança

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Objetos, Classes, Interfaces, Pacotes e Herança

# Objetos, Classes, Interfaces, Pacotes e Herança

Se você nunca usou uma linguagem de programação orientada a objetos antes, precisará aprender alguns conceitos básicos antes de começar a escrever qualquer código. Esta seção irá apresentá-lo a objetos, classes, herança, interfaces e pacotes. Cada discussão foca em como esses conceitos se relacionam com o mundo real, ao mesmo tempo em que fornece uma introdução à sintaxe da linguagem de programação Java.

## O que é um Objeto?

Um objeto é um pacote de software de estado e comportamento relacionados. Esta seção explica como o estado e o comportamento são representados dentro de um objeto, introduz o conceito de encapsulamento de dados e explica os benefícios de projetar seu software dessa maneira.

Objetos compartilham duas características: todos possuem estado e comportamento. Cães têm estado (nome, cor, raça, faminto) e comportamento (latir, buscar, abanar o rabo). Bicicletas também têm estado (marcha atual, cadência de pedal atual, velocidade atual) e comportamento (mudar de marcha, mudar cadência de pedal, aplicar freios). Identificar o estado e o comportamento para objetos do mundo real é uma ótima maneira de começar a pensar em termos de programação orientada a objetos.

Reserve um minuto agora para observar os objetos do mundo real que estão em sua área imediata. Para cada objeto que você vê, faça a si mesmo duas perguntas: "Quais estados possíveis este objeto pode ter?" e "Qual comportamento possível este objeto pode realizar?". Certifique-se de anotar suas observações. Ao fazer isso, você notará que os objetos do mundo real variam em complexidade; sua luminária de mesa pode ter apenas dois estados possíveis (ligada e desligada) e dois comportamentos possíveis (ligar, desligar), mas seu rádio de mesa pode ter estados adicionais (ligado, desligado, volume atual, estação atual) e comportamento (ligar, desligar, aumentar volume, diminuir volume, buscar, escanear e sintonizar). Você também pode notar que alguns objetos, por sua vez, também conterão outros objetos. Essas observações do mundo real são um ponto de partida para entender o mundo da programação orientada a objetos.

Um objeto de software

Objetos de software consistem em estado e comportamento relacionado. Um objeto armazena seu estado em _fields_ (variáveis em algumas linguagens de programação) e expõe seu comportamento através de _methods_ (funções em algumas linguagens de programação). Métodos operam no estado interno de um objeto e servem como o mecanismo primário para comunicação objeto-a-objeto. Ocultar o estado interno e exigir que toda a interação seja realizada através dos métodos de um objeto é conhecido como _encapsulamento de dados_ — um princípio fundamental da programação orientada a objetos.

Considere uma bicicleta, por exemplo:

Uma bicicleta modelada como um objeto de software

Ao atribuir estado (velocidade atual, cadência de pedal atual e marcha atual) e fornecer métodos para alterar esse estado, o objeto permanece no controle de como o mundo exterior pode usá-lo. Por exemplo, se a bicicleta tiver apenas 6 marchas, um método para mudar as marchas poderia rejeitar qualquer valor menor que 1 ou maior que 6.

Agrupar código em objetos de software individuais oferece uma série de benefícios, incluindo:

  1. Modularidade: O código-fonte de um objeto pode ser escrito e mantido independentemente do código-fonte de outros objetos. Uma vez criado, um objeto pode ser facilmente passado pelo sistema.
  2. Ocultamento de informação: Ao interagir apenas com os métodos de um objeto, os detalhes de sua implementação interna permanecem ocultos do mundo exterior.
  3. Reutilização de código: Se um objeto já existe (talvez escrito por outro desenvolvedor de software), você pode usar esse objeto em seu programa. Isso permite que especialistas implementem/testem/depurem objetos complexos e específicos de tarefas, nos quais você pode então confiar para executar em seu próprio código.
  4. Capacidade de conexão (Pluggability) e facilidade de depuração: Se um objeto específico se mostrar problemático, você pode simplesmente removê-lo de sua aplicação e conectar um objeto diferente como seu substituto. Isso é análogo a consertar problemas mecânicos no mundo real. Se um parafuso quebra, você o substitui, não a máquina inteira.

## O que é uma Classe?

Em suas aplicações, você frequentemente encontrará muitos objetos individuais do mesmo tipo. Pode haver milhares de outras bicicletas em existência, todas da mesma marca e modelo. Cada bicicleta foi construída a partir do mesmo conjunto de projetos e, portanto, contém os mesmos componentes. Em termos de orientação a objetos, dizemos que sua bicicleta é uma instância da _classe de objetos_ conhecida como bicicletas. Uma _classe_ é o projeto a partir do qual objetos individuais são criados.

A seguinte classe `Bicycle` é uma possível implementação de uma bicicleta:

```java
class Bicycle {

    int cadence = 0;
    int speed = 0;
    int gear = 1;

    void changeCadence(int newValue) {
        cadence = newValue;
    }

    void changeGear(int newValue) {
        gear = newValue;
    }

    void speedUp(int increment) {
        speed = speed + increment;   
    }

    void applyBrakes(int decrement) {
        speed = speed - decrement;
    }

    void printStates() {
        System.out.println("cadence:" +
            cadence + " speed:" + 
            speed + " gear:" + gear);
    }
}
```

A sintaxe da linguagem de programação Java pode parecer nova para você, mas o design desta classe é baseado na discussão anterior sobre objetos de bicicleta. Os campos `cadence`, `speed` e `gear` representam o estado do objeto, e os métodos (`changeCadence()`, `changeGear()`, `speedUp()` etc.) definem sua interação com o mundo exterior.

Você deve ter notado que a classe `Bicycle` não contém um método `main()`. Isso ocorre porque ela não é uma aplicação completa; é apenas o projeto para bicicletas que podem ser usadas em uma aplicação. A responsabilidade de criar e usar novos objetos `Bicycle` pertence a alguma outra classe em sua aplicação.

Aqui está uma classe `BicycleDemo` que cria dois objetos `Bicycle` separados e invoca seus métodos:

```java
class BicycleDemo {
    public static void main(String[] args) {

        // Create two different Bicycle objects
        Bicycle bike1 = new Bicycle();
        Bicycle bike2 = new Bicycle();

        // Invoke methods on those objects
        bike1.changeCadence(50);
        bike1.speedUp(10);
        bike1.changeGear(2);
        bike1.printStates();

        bike2.changeCadence(50);
        bike2.speedUp(10);
        bike2.changeGear(2);
        bike2.changeCadence(40);
        bike2.speedUp(10);
        bike2.changeGear(3);
        bike2.printStates();
    }
}
```

A saída deste teste imprime a cadência de pedal final, velocidade e marcha para as duas bicicletas:

```
cadence:50 speed:10 gear:2
cadence:40 speed:20 gear:3
```

## O que é Herança?

Diferentes tipos de objetos frequentemente têm uma certa quantidade em comum uns com os outros. Bicicletas de montanha, bicicletas de estrada e bicicletas tandem, por exemplo, todas compartilham as características de bicicletas (velocidade atual, cadência de pedal atual, marcha atual). No entanto, cada uma também define características adicionais que as tornam diferentes: bicicletas tandem têm dois assentos e dois conjuntos de guidões; bicicletas de estrada têm guidões curvos; algumas bicicletas de montanha têm uma coroa adicional, dando-lhes uma relação de marcha mais baixa.

A programação orientada a objetos permite que as classes herdem estado e comportamento comumente usados de outras classes. Neste exemplo, `Bicycle` agora se torna a superclasse de `MountainBike`, `RoadBike` e `TandemBike`. Na linguagem de programação Java, cada classe pode ter _uma_ superclasse direta, e cada superclasse tem o potencial para um número ilimitado de subclasses:

Uma hierarquia de classes de bicicleta

A sintaxe para criar uma subclasse é simples. No início da declaração da sua classe, use a palavra-chave `extends`, seguida pelo nome da classe da qual herdar:

```java
class MountainBike extends Bicycle {

    // new fields and methods defining 
    // a mountain bike would go here
}
```

Isso dá a `MountainBike` todos os mesmos campos e métodos que `Bicycle`, mas permite que seu código se concentre exclusivamente nas características que a tornam única. Isso torna o código para suas subclasses fácil de ler. No entanto, você deve ter o cuidado de documentar adequadamente o estado e o comportamento que cada superclasse define, já que esse código não aparecerá no arquivo-fonte de cada subclasse.

## O que é uma Interface?

Como você já aprendeu, objetos definem sua interação com o mundo exterior através dos métodos que eles expõem. Métodos formam a interface do objeto com o mundo exterior; os botões na frente do seu aparelho de televisão, por exemplo, são a interface entre você e a fiação elétrica do outro lado de sua carcaça plástica. Você pressiona o botão "power" para ligar e desligar a televisão.

Em sua forma mais comum, uma interface é um grupo de métodos relacionados com corpos vazios. O comportamento de uma bicicleta, se especificado como uma interface, pode aparecer da seguinte forma:

```java
interface Bicycle {

    //  wheel revolutions per minute
    void changeCadence(int newValue);

    void changeGear(int newValue);

    void speedUp(int increment);

    void applyBrakes(int decrement);
}
```

Para implementar esta interface, o nome da sua classe mudaria (para uma marca específica de bicicleta, por exemplo, como `ACMEBicycle`), e você usaria a palavra-chave `implements` na declaração da classe:

```java
class ACMEBicycle implements Bicycle {

    int cadence = 0;
    int speed = 0;
    int gear = 1;

    // The compiler will now require that methods
    // changeCadence, changeGear, speedUp, and applyBrakes
    // all be implemented. Compilation will fail if
    // those methods are missing.

    void changeCadence(int newValue) {
        cadence = newValue;
    }

    void changeGear(int newValue) {
        gear = newValue;
    }

    void speedUp(int increment) {
        speed = speed + increment;
    }

    void applyBrakes(int decrement) {
        speed = speed - decrement;
    }

    void printStates() {
        System.out.println("cadence:" +
            cadence + " speed:" +
            speed + " gear:" + gear);
    }
}
```

Implementar uma interface permite que uma classe se torne mais formal sobre o comportamento que ela promete fornecer. Interfaces formam um contrato entre a classe e o mundo exterior, e este contrato é imposto em tempo de compilação pelo compilador. Se sua classe afirma implementar uma interface, todos os métodos definidos por essa interface devem aparecer em seu código-fonte antes que a classe compile com sucesso.

Nota: Para realmente compilar a classe `ACMEBicycle`, você precisará adicionar a palavra-chave `public` ao início dos métodos da interface implementada. Você aprenderá os motivos para isso mais tarde nas seções sobre [Classes e Objetos](<#/doc/tutorials/classes-objects>), [Interfaces](<#/doc/tutorials/interfaces>) e [Herança](<#/doc/tutorials/inheritance>).

## O que é um Pacote?

Um pacote é um namespace que organiza um conjunto de classes e interfaces relacionadas. Conceitualmente, você pode pensar em pacotes como sendo semelhantes a diferentes pastas em seu computador. Você pode manter páginas HTML em uma pasta, imagens em outra e scripts ou aplicações em ainda outra. Como o software escrito na linguagem de programação Java pode ser composto por centenas ou milhares de classes individuais, faz sentido manter as coisas organizadas colocando classes e interfaces relacionadas em pacotes.

A plataforma Java fornece uma enorme biblioteca de classes (um conjunto de pacotes) adequada para uso em suas próprias aplicações. Esta biblioteca é conhecida como "Application Programming Interface", ou "API" para abreviar. Seus pacotes representam as tarefas mais comumente associadas à programação de propósito geral. Por exemplo, um objeto [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) contém estado e comportamento para cadeias de caracteres; um objeto [`File`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/File.html>) permite que um programador crie, exclua, inspecione, compare ou modifique facilmente um arquivo no sistema de arquivos; um objeto [`Socket`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/net/Socket.html>) permite a criação e uso de sockets de rede; vários objetos GUI controlam botões e caixas de seleção e qualquer outra coisa relacionada a interfaces gráficas de usuário. Existem literalmente milhares de classes para escolher. Isso permite que você, o programador, se concentre no design de sua aplicação particular, em vez da infraestrutura necessária para fazê-la funcionar.

[A Especificação da API da Plataforma Java](<https://docs.oracle.com/en/java/javase/26/docs/api/index.html>) contém a listagem completa de todos os pacotes, interfaces, classes, campos e métodos fornecidos pela plataforma Java SE. Carregue a página em seu navegador e adicione-a aos favoritos. Como programador, ela se tornará sua peça mais importante de documentação de referência.

### Neste tutorial

O que é um Objeto? O que é uma Classe? O que é Herança? O que é uma Interface? O que é um Pacote?

Última atualização: 14 de setembro de 2021

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Objetos, Classes, Interfaces, Pacotes e Herança

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)