# Mais sobre Classes

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Classes e Objetos ](<#/doc/tutorials/classes-objects>) > Mais sobre Classes

**Anterior na Série**

[Criando e Usando Objetos](<#/doc/tutorials/classes-objects/creating-objects>)

➜

**Tutorial Atual**

Mais sobre Classes

➜

**Próximo na Série**

[Classes Aninhadas](<#/doc/tutorials/classes-objects/nested-classes>)

**Anterior na Série:** [Criando e Usando Objetos](<#/doc/tutorials/classes-objects/creating-objects>)

**Próximo na Série:** [Classes Aninhadas](<#/doc/tutorials/classes-objects/nested-classes>)

# Mais sobre Classes

## Mais sobre Classes

Esta seção aborda mais aspectos das classes que dependem do uso de referências de objeto e do operador ponto que você aprendeu nas seções anteriores sobre objetos:

  * Retornando valores de métodos.
  * A palavra-chave `this`.
  * Membros de classe vs. de instância.
  * Controle de acesso.

## Retornando um Valor de um Método

Um método retorna ao código que o invocou quando ele

  * completa todas as instruções no método,
  * atinge uma instrução `return`, ou
  * lança uma exceção (abordado posteriormente),
  * o que ocorrer primeiro.

Você declara o tipo de retorno de um método em sua declaração. Dentro do corpo do método, você usa a instrução `return` para retornar o valor.

Qualquer método declarado `void` não retorna um valor. Ele não precisa conter uma instrução `return`, mas pode fazê-lo. Nesse caso, uma instrução `return` pode ser usada para sair de um bloco de fluxo de controle e encerrar o método, sendo simplesmente usada assim:

```java
return;
```

Se você tentar retornar um valor de um método que é declarado `void`, você receberá um erro de compilador.

Qualquer método que não seja declarado `void` deve conter uma instrução `return` com um valor de retorno correspondente, assim:

```java
return "Hello World";
```

O tipo de dado do valor de retorno deve corresponder ao tipo de retorno declarado do método; você não pode retornar um valor inteiro de um método declarado para retornar um `boolean`.

O método `getArea()` na classe `Rectangle` que foi discutido nas seções sobre objetos retorna um inteiro:

```java
public int getArea() {
    return width * height;
}
```

Este método retorna o inteiro para o qual a expressão `width*height` é avaliada.

O método `getArea()` retorna um tipo primitivo. Um método também pode retornar um tipo de referência. Por exemplo, em um programa para manipular objetos `Bicycle`, poderíamos ter um método como este:

```java
public Bicycle getMyBike() {
    return myBike;
}
```

## Retornando uma Classe ou Interface

Se esta seção o confundir, pule-a e retorne a ela depois de ter terminado as seções sobre [Herança](<#/doc/tutorials/inheritance>) e [Interfaces](<#/doc/tutorials/interfaces>).

Quando um método usa um nome de classe como seu tipo de retorno, como `seeWhosFastest()` faz, a classe do tipo do objeto retornado deve ser uma subclasse ou a classe exata do tipo de retorno. Suponha que você tenha uma hierarquia de classes na qual `ImaginaryNumber` é uma subclasse de `java.lang.Number`, que por sua vez é uma subclasse de `Object`, conforme ilustrado na figura a seguir.

A hierarquia de classes para `ImaginaryNumber`

Agora suponha que você tenha um método declarado para retornar um `Number`:

```java
public Number returnANumber() {
    ...
}
```

O método `returnANumber()` pode retornar um `ImaginaryNumber`, mas não um `Object`. Uma instância de `ImaginaryNumber` também é uma instância de `Number` porque `ImaginaryNumber` é uma subclasse de `Number`. No entanto, um `Object` não é necessariamente um `Number` — poderia ser uma `String` ou outro tipo.

Você pode sobrescrever um método e defini-lo para retornar uma subclasse do método original, assim:

```java
public class MyClass implements Cloneable {
    @Override
    protected MyClass clone() throws CloneNotSupportedException {
        return (MyClass) super.clone();
    }
}
```

Esta técnica, chamada _tipo de retorno covariante_, significa que o tipo de retorno pode variar na mesma direção que a subclasse.

> Nota: Você também pode usar nomes de interface como tipos de retorno. Neste caso, o objeto retornado deve implementar a interface especificada.

## Usando a Palavra-Chave this

Dentro de um método de instância ou de um construtor, `this` é uma referência ao _objeto atual_ — o objeto cujo método ou construtor está sendo chamado. Você pode se referir a qualquer membro do objeto atual de dentro de um método de instância ou de um construtor usando `this`.

### Usando this com um Campo

A razão mais comum para usar a palavra-chave `this` é porque um campo é sombreado por um parâmetro de método ou construtor.

Por exemplo, a classe `Point` foi escrita assim:

```java
public class Point {
    public int x = 0;
    public int y = 0;
    //constructor
    public Point(int a, int b) {
        x = a;
        y = b;
    }
}
```

mas poderia ter sido escrita assim:

```java
public class Point {
    public int x = 0;
    public int y = 0;
    //constructor
    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
}
```

Cada argumento para o construtor sombreia um dos campos do objeto — dentro do construtor, `x` é uma cópia local do primeiro argumento do construtor. Para se referir ao campo `x` de `Point`, o construtor deve usar `this.x`.

### Usando this com um Construtor

De dentro de um construtor, você também pode usar a palavra-chave `this` para chamar outro construtor na mesma classe. Fazer isso é chamado de invocação explícita de construtor. Aqui está outra classe `Rectangle`, com uma implementação diferente daquela na seção Objetos.

```java
public class Rectangle {
    private int x, y;
    private int width, height;

    public Rectangle() {
        this(0, 0, 1, 1);
    }
    public Rectangle(int width, int height) {
        this(0, 0, width, height);
    }
    public Rectangle(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    ...
}
```

Esta classe contém um conjunto de construtores. Cada construtor inicializa algumas ou todas as variáveis membro do retângulo. Os construtores fornecem um valor padrão para qualquer variável membro cujo valor inicial não seja fornecido por um argumento. Por exemplo, o construtor sem argumentos cria um `Rectangle` 1x1 nas coordenadas 0,0. O construtor de dois argumentos chama o construtor de quatro argumentos, passando `width` e `height`, mas sempre usando as coordenadas 0,0. Como antes, o compilador determina qual construtor chamar, com base no número e no tipo de argumentos.

Até o JDK 25, a invocação de outro construtor deve ser a primeira linha no construtor. A partir do JDK 25, você pode adicionar algum código antes da invocação de outro construtor, mas este código tem restrições. Todo o código antes da invocação do outro construtor é chamado de _prólogo_ do construtor. Você não pode usar a instância em construção neste prólogo, a menos que esteja inicializando um campo de instância. Mas você não pode invocar nenhum método de instância.

## Controlando o Acesso a Membros de uma Classe

Modificadores de nível de acesso determinam se outras classes podem usar um campo específico ou invocar um método específico. Existem dois níveis de controle de acesso:

  * No nível superior—`public`, ou package-private (sem modificador explícito).
  * No nível de membro—`public`, `private`, `protected`, ou package-private (sem modificador explícito).

Uma classe pode ser declarada com o modificador `public`, caso em que essa classe é visível para todas as classes em qualquer lugar. Se uma classe não tiver modificador (o padrão, também conhecido como package-private), ela será visível apenas dentro de seu próprio pacote (pacotes são grupos nomeados de classes relacionadas — você aprenderá sobre eles em uma seção posterior).

No nível de membro, você também pode usar o modificador `public` ou nenhum modificador (package-private) assim como com classes de nível superior, e com o mesmo significado. Para membros, existem dois modificadores de acesso adicionais: `private` e `protected`. O modificador `private` especifica que o membro só pode ser acessado em sua própria classe. O modificador `protected` especifica que o membro só pode ser acessado dentro de seu próprio pacote (assim como com package-private) e, adicionalmente, por uma subclasse de sua classe em outro pacote.

A tabela a seguir mostra o acesso a membros permitido por cada modificador.

Modificador | Classe | Pacote | Subclasse | Mundo
---|---|---|---|---
`public` | S | S | S | S
`protected` | S | S | S | N
_sem modificador_ | S | S | N | N
`private` | S | N | N | N

A primeira coluna de dados indica se a própria classe tem acesso ao membro definido pelo nível de acesso. Como você pode ver, uma classe sempre tem acesso aos seus próprios membros.

A segunda coluna indica se as classes no mesmo pacote que a classe (independentemente de sua ancestralidade) têm acesso ao membro.

A terceira coluna indica se as subclasses da classe declaradas fora deste pacote têm acesso ao membro.

A quarta coluna indica se todas as classes têm acesso ao membro.

Os níveis de acesso o afetam de duas maneiras. Primeiro, quando você usa classes que vêm de outra fonte, como as classes na plataforma Java, os níveis de acesso determinam quais membros dessas classes suas próprias classes podem usar. Segundo, quando você escreve uma classe, você precisa decidir qual nível de acesso cada variável membro e cada método em sua classe deve ter.

### Dicas para Escolher um Nível de Acesso

Se outros programadores usarem sua classe, você quer garantir que erros por uso indevido não possam acontecer. Os níveis de acesso podem ajudá-lo a fazer isso.

Use o nível de acesso mais restritivo que faça sentido para um membro específico. Use `private` a menos que você tenha uma boa razão para não fazê-lo.

Evite campos `public` exceto para constantes. Muitos dos exemplos no tutorial usam campos `public`. Isso pode ajudar a ilustrar alguns pontos de forma concisa, mas não é recomendado para código de produção. Esta não é uma boa prática porque campos `public` tendem a vinculá-lo a uma implementação particular e limitam sua flexibilidade ao alterar seu código.

### Usando o Java Module System ou a Reflection API

Observe que o Java Module System pode adicionar uma camada de controle da visibilidade de classes públicas de fora de seu módulo. Você pode consultar a seção sobre o [Java Module System](<#/doc/tutorials/modules>) para mais informações.

Além disso, observe que a Reflection API pode lhe dar acesso a classes ou membros de classe não visíveis sob certas circunstâncias. Você pode consultar a seção [Reflection API](<#/doc/tutorials/reflection>) para mais informações.

## Entendendo Membros de Classe

Nesta seção, discutimos o uso da palavra-chave `static` para criar campos e métodos que pertencem à classe, em vez de a uma instância da classe.

### Variáveis de Classe

Quando vários objetos são criados a partir do mesmo projeto de classe, cada um deles tem suas próprias cópias distintas de variáveis de instância. No caso da classe `Bicycle`, as variáveis de instância são `cadence`, `gear` e `speed`. Cada objeto `Bicycle` tem seus próprios valores para essas variáveis, armazenados em diferentes locais de memória.

Às vezes, você quer ter variáveis que são comuns a todos os objetos. Isso é conseguido com o modificador `static`. Campos que têm o modificador `static` em sua declaração são chamados de campos `static` ou _variáveis de classe_. Eles estão associados à classe, em vez de a qualquer objeto.

Cada instância da classe compartilha uma variável de classe, que está em um local fixo na memória. Qualquer objeto pode alterar o valor de uma variável de classe, mas as variáveis de classe também podem ser manipuladas sem criar uma instância da classe.

Por exemplo, suponha que você queira criar vários objetos `Bicycle` e atribuir a cada um um número de série, começando com 1 para o primeiro objeto. Este número `ID` é único para cada objeto e, portanto, é uma variável de instância. Ao mesmo tempo, você precisa de um campo para acompanhar quantos objetos `Bicycle` foram criados para que você saiba qual `ID` atribuir ao próximo. Tal campo não está relacionado a nenhum objeto individual, mas à classe como um todo. Para isso, você precisa de uma variável de classe, `numberOfBicycles`, como segue:

```java
public class Bicycle {

    private int cadence;
    private int gear;
    private int speed;
    private int id;
    private static int numberOfBicycles = 0;

    public Bicycle(int startCadence, int startSpeed, int startGear) {
        gear = startGear;
        cadence = startCadence;
        speed = startSpeed;

        id = ++numberOfBicycles;
    }

    public int getID() {
        return id;
    }
    public static int getNumberOfBicycles() {
        return numberOfBicycles;
    }
    ...
}
```

Variáveis de classe são referenciadas pelo próprio nome da classe, como em

```java
Bicycle.numberOfBicycles
```

Isso deixa claro que são variáveis de classe.

> Nota: Você também pode se referir a campos static com uma referência de objeto como `myBike.numberOfBicycles`, mas isso é desencorajado porque não deixa claro que são variáveis de classe.

Você pode usar o construtor `Bicycle` para definir a variável de instância `ID` e incrementar a variável de classe `numberOfBicycles`:

```java
public Bicycle(int startCadence, int startSpeed, int startGear) {
    gear = startGear;
    cadence = startCadence;
    speed = startSpeed;

    id = ++numberOfBicycles;
}
```

### Métodos de Classe

A linguagem de programação Java suporta métodos static, bem como variáveis static. Métodos static, que têm o modificador `static` em suas declarações, devem ser invocados com o nome da classe, sem a necessidade de criar uma instância da classe, como em

```java
Bicycle.getNumberOfBicycles();
```

> Nota: Você também pode se referir a métodos static com uma referência de objeto como `instanceName.methodName(args)`, mas isso é desencorajado porque não deixa claro que são métodos de classe.

Um uso comum para métodos static é acessar campos static. Por exemplo, poderíamos adicionar um método static à classe `Bicycle` para acessar o campo static `numberOfBicycles`:

```java
public static int getNumberOfBicycles() {
    return numberOfBicycles;
}
```

Nem todas as combinações de variáveis e métodos de instância e de classe são permitidas:

  * Métodos de instância podem acessar variáveis de instância e métodos de instância diretamente.
  * Métodos de instância podem acessar variáveis de classe e métodos de classe diretamente.
  * Métodos de classe podem acessar variáveis de classe e métodos de classe diretamente.
  * Métodos de classe não podem acessar variáveis de instância ou métodos de instância diretamente — eles devem usar uma referência de objeto. Além disso, métodos de classe não podem usar a palavra-chave `this`, pois não há instância para `this` se referir.

### Constantes

O modificador `static`, em combinação com o modificador `final`, também é usado para definir constantes. O modificador `final` indica que o valor deste campo não pode mudar.

Por exemplo, a seguinte declaração de variável define uma constante chamada `PI`, cujo valor é uma aproximação de pi (a razão entre a circunferência de um círculo e seu diâmetro):

```java
public static final double PI = 3.141592653589793;
```

Constantes definidas desta forma não podem ser reatribuídas, e é um erro de tempo de compilação se seu programa tentar fazê-lo. Por convenção, os nomes dos valores constantes são escritos em letras maiúsculas. Se o nome for composto por mais de uma palavra, as palavras são separadas por um sublinhado (`_`).

> Nota: Se um tipo primitivo ou uma string for definido como uma constante e o valor for conhecido em tempo de compilação, o compilador substitui o nome da constante em todo o código por seu valor. Isso é chamado de constante de tempo de compilação. Se o valor da constante no mundo exterior mudar (por exemplo, se for legislado que pi na verdade deveria ser 3.975), você precisará recompilar quaisquer classes que usem esta constante para obter o valor atual.

### A Classe Bicycle

Após todas as modificações feitas nesta seção, a classe `Bicycle` agora é:

```java
public class Bicycle {

    private int cadence;
    private int gear;
    private int speed;
    private int id;
    private static int numberOfBicycles = 0;

    public Bicycle(int startCadence, int startSpeed, int startGear) {
        gear = startGear;
        cadence = startCadence;
        speed = startSpeed;

        id = ++numberOfBicycles;
    }

    public int getID() {
        return id;
    }

    public static int getNumberOfBicycles() {
        return numberOfBicycles;
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

## Inicializando Campos

Como você viu, muitas vezes você pode fornecer um valor inicial para um campo em sua declaração:

```java
public class Point {
    public int x = 10;
    public int y = 20;
}
```

Isso funciona bem quando o valor de inicialização está disponível e a inicialização pode ser feita em uma única linha. No entanto, esta forma de inicialização tem limitações devido à sua simplicidade. Se a inicialização requer alguma lógica (por exemplo, tratamento de erros ou um loop `for` para preencher um array complexo), a atribuição simples é inadequada. Variáveis de instância podem ser inicializadas em construtores, onde tratamento de erros ou outra lógica pode ser usada. Para fornecer a mesma capacidade para variáveis de classe, a linguagem de programação Java inclui _blocos de inicialização static_.

> Nota: Não é necessário declarar campos no início da definição da classe, embora esta seja a prática mais comum. É apenas necessário que eles sejam declarados e inicializados antes de serem usados.

### Blocos de Inicialização Static

Um bloco de inicialização static é um bloco de código normal envolto em chaves, `{ }`, e precedido pela palavra-chave `static`. Aqui está um exemplo:

```java
public class Whatever {
    public static final int MAX_SIZE;
    static {
        MAX_SIZE = 1000;
    }
}
```

Uma classe pode ter qualquer número de blocos de inicialização static, e eles podem aparecer em qualquer lugar no corpo da classe. O sistema de tempo de execução garante que os blocos de inicialização static sejam chamados na ordem em que aparecem no código-fonte.

Existe uma alternativa aos blocos static — você pode escrever um método static privado:

```java
public class Whatever {
    public static final int MAX_SIZE = initializeMaxSize();

    private static int initializeMaxSize() {
        // do some complicated logic here
        return 1000;
    }
}
```

A vantagem dos métodos static privados é que eles podem ser reutilizados posteriormente se você precisar reinicializar a variável de classe.

Você deve estar ciente de que não pode redefinir o conteúdo de um bloco static. Uma vez escrito, você não pode impedir que este bloco seja executado. Se o conteúdo do bloco static não puder ser executado por qualquer motivo, então sua aplicação não funcionará corretamente, porque você não será capaz de instanciar nenhum objeto para esta classe. Isso pode acontecer se seu bloco static contiver código que acessa algum recurso externo, como um sistema de arquivos ou uma rede.

### Inicializando Membros de Instância

Normalmente, você colocaria o código para inicializar uma variável de instância em um construtor. Existem duas alternativas para usar um construtor para inicializar variáveis de instância: blocos inicializadores e métodos final.

Blocos inicializadores para variáveis de instância se parecem exatamente com blocos inicializadores static, mas sem a palavra-chave static:

```java
public class Whatever {
    public final int MAX_SIZE;
    {
        MAX_SIZE = 1000;
    }
}
```

O compilador Java copia blocos inicializadores para cada construtor. Portanto, esta abordagem pode ser usada para compartilhar um bloco de código entre vários construtores.

Um _método final_ não pode ser sobrescrito em uma subclasse. Isso é discutido na seção sobre [Herança](<#/doc/tutorials/numbers-strings/strings>). Aqui está um exemplo de uso de um método final para inicializar uma variável de instância:

```java
class Gizmo {
    private int gizmoId;
    {
        gizmoId = generateId();
    }
    private final int generateId() {
        return 1;
    }
}
```

Isso é especialmente útil se as subclasses quiserem reutilizar o método de inicialização. O método é final porque chamar métodos não-final durante a inicialização da instância pode causar problemas.

## Resumo da Criação e Uso de Classes e Objetos

Uma declaração de classe nomeia a classe e envolve o corpo da classe entre chaves. O nome da classe pode ser precedido por modificadores. O corpo da classe contém campos, métodos e construtores para a classe. Uma classe usa campos para conter informações de estado e usa métodos para implementar comportamento. Construtores que inicializam uma nova instância de uma classe usam o nome da classe e se parecem com métodos sem um tipo de retorno.

Você controla o acesso a classes e membros da mesma forma: usando um modificador de acesso como public em sua declaração.

Você especifica uma variável de classe ou um método de classe usando a palavra-chave `static` na declaração do membro. Um membro que não é declarado como `static` é implicitamente um membro de instância. Variáveis de classe são compartilhadas por todas as instâncias de uma classe e podem ser acessadas através do nome da classe, bem como de uma referência de instância. Instâncias de uma classe obtêm sua própria cópia de cada variável de instância, que deve ser acessada através de uma referência de instância.

Você cria um objeto a partir de uma classe usando o operador `new` e um construtor. O operador `new` retorna uma referência ao objeto que foi criado. Você pode atribuir a referência a uma variável ou usá-la diretamente.

Variáveis de instância e métodos que são acessíveis ao código fora da classe em que são declarados podem ser referenciados usando um nome qualificado. O nome qualificado de uma variável de instância se parece com isto:

```java
objectReference.instanceVariable
```

O nome qualificado de um método se parece com isto:

```java
objectReference.instanceMethod(argList)
```

ou:

```java
ClassName.classMethod(argList)
```

O garbage collector limpa automaticamente objetos não utilizados. Um objeto é não utilizado se o programa não mantiver mais referências a ele. Você pode descartar explicitamente uma referência definindo a variável que a contém como `null`.

### Neste tutorial

Mais sobre Classes Retornando um Valor de um Método Retornando uma Classe ou Interface Usando a Palavra-Chave this Controlando o Acesso a Membros de uma Classe Entendendo Membros de Classe Inicializando Campos Resumo da Criação e Uso de Classes e Objetos

Última atualização: 5 de janeiro de 2024

**Anterior na Série**

[Criando e Usando Objetos](<#/doc/tutorials/classes-objects/creating-objects>)

➜

**Tutorial Atual**

Mais sobre Classes

➜

**Próximo na Série**

[Classes Aninhadas](<#/doc/tutorials/classes-objects/nested-classes>)

**Anterior na Série:** [Criando e Usando Objetos](<#/doc/tutorials/classes-objects/creating-objects>)

**Próximo na Série:** [Classes Aninhadas](<#/doc/tutorials/classes-objects/nested-classes>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Classes e Objetos ](<#/doc/tutorials/classes-objects>) > Mais sobre Classes