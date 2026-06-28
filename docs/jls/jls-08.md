# Classes

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Especificações Java SE](<#/>) > [Especificação da Linguagem Java](<#/doc/jls/jls-01>)

Capítulo 8. Classes
---
[Anterior](<#/doc/jls/jls-07>) | | [Próximo](<#/doc/jls/jls-09>)
* * *

# Capítulo 8. Classes

**Sumário**

[8.1. Declarações de Classe](<#/doc/jls/jls-08>)
    

[8.1.1. Modificadores de Classe](<#/doc/jls/jls-08>)
    

[8.1.1.1. Classes `abstract`](<#/doc/jls/jls-08>)
[8.1.1.2. Classes `sealed`, `non-sealed` e `final`](<#/doc/jls/jls-08>)
[8.1.1.3. Classes `strictfp`](<#/doc/jls/jls-08>)
[8.1.1.4. Classes `static`](<#/doc/jls/jls-08>)
[8.1.2. Classes Genéricas e Parâmetros de Tipo](<#/doc/jls/jls-08>)
[8.1.3. Inner Classes e Instâncias Envolventes](<#/doc/jls/jls-08>)
[8.1.4. Superclasses e Subclasses](<#/doc/jls/jls-08>)
[8.1.5. Superinterfaces](<#/doc/jls/jls-08>)
[8.1.6. Subclasses Diretas Permitidas](<#/doc/jls/jls-08>)
[8.1.7. Corpo da Classe e Declarações de Membros](<#/doc/jls/jls-08>)
[8.1.8. Classes Declaradas Implicitamente](<#/doc/jls/jls-08>)
[8.2. Membros de Classe](<#/doc/jls/jls-08>)
[8.3. Declarações de Field](<#/doc/jls/jls-08>)
    

[8.3.1. Modificadores de Field](<#/doc/jls/jls-08>)
    

[8.3.1.1. Fields `static`](<#/doc/jls/jls-08>)
[8.3.1.2. Fields `final`](<#/doc/jls/jls-08>)
[8.3.1.3. Fields `transient`](<#/doc/jls/jls-08>)
[8.3.1.4. Fields `volatile`](<#/doc/jls/jls-08>)
[8.3.2. Inicialização de Field](<#/doc/jls/jls-08>)
[8.3.3. Restrições em Referências de Field em Inicializadores](<#/doc/jls/jls-08>)
[8.4. Declarações de Method](<#/doc/jls/jls-08>)
    

[8.4.1. Parâmetros Formais](<#/doc/jls/jls-08>)
[8.4.2. Assinatura de Method](<#/doc/jls/jls-08>)
[8.4.3. Modificadores de Method](<#/doc/jls/jls-08>)
    

[8.4.3.1. Methods `abstract`](<#/doc/jls/jls-08>)
[8.4.3.2. Methods `static`](<#/doc/jls/jls-08>)
[8.4.3.3. Methods `final`](<#/doc/jls/jls-08>)
[8.4.3.4. Methods `native`](<#/doc/jls/jls-08>)
[8.4.3.5. Methods `strictfp`](<#/doc/jls/jls-08>)
[8.4.3.6. Methods `synchronized`](<#/doc/jls/jls-08>)
[8.4.4. Methods Genéricos](<#/doc/jls/jls-08>)
[8.4.5. Resultado de Method](<#/doc/jls/jls-08>)
[8.4.6. Throws de Method](<#/doc/jls/jls-08>)
[8.4.7. Corpo de Method](<#/doc/jls/jls-08>)
[8.4.8. Herança, Sobrescrita e Ocultação](<#/doc/jls/jls-08>)
    

[8.4.8.1. Sobrescrita (por Methods de Instância)](<#/doc/jls/jls-08>)
[8.4.8.2. Ocultação (por Methods de Classe)](<#/doc/jls/jls-08>)
[8.4.8.3. Requisitos em Sobrescrita e Ocultação](<#/doc/jls/jls-08>)
[8.4.8.4. Herdando Methods com Assinaturas Equivalentes a Sobrescrita](<#/doc/jls/jls-08>)
[8.4.9. Sobrecarga](<#/doc/jls/jls-08>)
[8.5. Declarações de Member Class e Interface](<#/doc/jls/jls-08>)
[8.6. Inicializadores de Instância](<#/doc/jls/jls-08>)
[8.7. Inicializadores Estáticos](<#/doc/jls/jls-08>)
[8.8. Declarações de Construtor](<#/doc/jls/jls-08>)
    

[8.8.1. Parâmetros Formais](<#/doc/jls/jls-08>)
[8.8.2. Assinatura de Construtor](<#/doc/jls/jls-08>)
[8.8.3. Modificadores de Construtor](<#/doc/jls/jls-08>)
[8.8.4. Construtores Genéricos](<#/doc/jls/jls-08>)
[8.8.5. Throws de Construtor](<#/doc/jls/jls-08>)
[8.8.6. O Tipo de um Construtor](<#/doc/jls/jls-08>)
[8.8.7. Corpo de Construtor](<#/doc/jls/jls-08>)
    

[8.8.7.1. Invocações de Construtor](<#/doc/jls/jls-08>)
[8.8.8. Sobrecarga de Construtor](<#/doc/jls/jls-08>)
[8.8.9. Construtor Padrão](<#/doc/jls/jls-08>)
[8.8.10. Prevenindo a Instanciação de uma Classe](<#/doc/jls/jls-08>)
[8.9. Enum Classes](<#/doc/jls/jls-08>)
    

[8.9.1. Constantes Enum](<#/doc/jls/jls-08>)
[8.9.2. Declarações de Corpo Enum](<#/doc/jls/jls-08>)
[8.9.3. Membros Enum](<#/doc/jls/jls-08>)
[8.10. Record Classes](<#/doc/jls/jls-08>)
    

[8.10.1. Componentes Record](<#/doc/jls/jls-08>)
[8.10.2. Declarações de Corpo Record](<#/doc/jls/jls-08>)
[8.10.3. Membros Record](<#/doc/jls/jls-08>)
[8.10.4. Declarações de Construtor Record](<#/doc/jls/jls-08>)
    

[8.10.4.1. Construtores Canônicos Normais](<#/doc/jls/jls-08>)
[8.10.4.2. Construtores Canônicos Compactos](<#/doc/jls/jls-08>)

Uma declaração de classe define uma nova classe e descreve como ela é implementada ([§8.1](<#/doc/jls/jls-08>)).

Uma _classe de nível superior_ ([§7.6](<#/doc/jls/jls-07>)) é uma classe declarada diretamente em uma unidade de compilação.

Uma _classe aninhada_ é qualquer classe cuja declaração ocorre dentro do corpo de outra declaração de classe ou interface. Uma classe aninhada pode ser uma member class ([§8.5](<#/doc/jls/jls-08>), [§9.5](<#/doc/jls/jls-09>)), uma local class ([§14.3](<#/doc/jls/jls-14>)), ou uma anonymous class ([§15.9.5](<#/doc/jls/jls-15>)).

Uma classe aninhada pode ser _interna_ (inner) ([§8.1.3](<#/doc/jls/jls-08>)), caso em que ela pode (dependendo de onde sua declaração ocorre precisamente) ser capaz de referenciar instâncias de classes envolventes, variáveis locais e variáveis de tipo.

Uma _enum class_ ([§8.9](<#/doc/jls/jls-08>)) é uma classe declarada com sintaxe abreviada que define um pequeno conjunto de instâncias de classe nomeadas.

Uma _record class_ ([§8.10](<#/doc/jls/jls-08>)) é uma classe declarada com sintaxe abreviada que define um agregado simples de valores.

Este capítulo discute a semântica comum de todas as classes. Detalhes específicos de tipos particulares de classes são discutidos nas seções dedicadas a esses construtos.

Uma classe pode ser declarada `public` ([§8.1.1](<#/doc/jls/jls-08>)) para que possa ser referenciada por código em qualquer pacote de seu módulo e, potencialmente, por código em outros módulos.

Uma classe pode ser declarada `abstract` ([§8.1.1.1](<#/doc/jls/jls-08>)), e deve ser declarada `abstract` se estiver incompletamente implementada; tal classe não pode ser instanciada, mas pode ser estendida por subclasses. O grau em que uma classe pode ser estendida pode ser controlado explicitamente ([§8.1.1.2](<#/doc/jls/jls-08>)): ela pode ser declarada `sealed` para limitar suas subclasses, ou pode ser declarada `final` para garantir que não haja subclasses. Cada classe, exceto `Object`, é uma extensão de (isto é, uma subclasse de) uma única classe existente ([§8.1.4](<#/doc/jls/jls-08>)) e pode implementar interfaces ([§8.1.5](<#/doc/jls/jls-08>)).

Uma classe pode ser _genérica_ ([§8.1.2](<#/doc/jls/jls-08>)), ou seja, sua declaração pode introduzir variáveis de tipo cujas ligações diferem entre diferentes instâncias da classe.

Declarações de classe podem ser decoradas com annotations ([§9.7](<#/doc/jls/jls-09>)) assim como qualquer outro tipo de declaração.

O corpo de uma classe declara membros (fields, methods, classes e interfaces), inicializadores de instância e estáticos, e construtores ([§8.1.7](<#/doc/jls/jls-08>)). O escopo ([§6.3](<#/doc/jls/jls-06>)) de um membro ([§8.2](<#/doc/jls/jls-08>)) é o corpo inteiro da declaração da classe à qual o membro pertence. Declarações de field, method, member class, member interface e constructor podem incluir os modificadores de acesso `public`, `protected` ou `private` ([§6.6](<#/doc/jls/jls-06>)). Os membros de uma classe incluem tanto membros declarados quanto herdados ([§8.2](<#/doc/jls/jls-08>)). Fields recém-declarados podem ocultar fields declarados em uma superclass ou superinterface. Member classes e member interfaces recém-declaradas podem ocultar member classes e member interfaces declaradas em uma superclass ou superinterface. Methods recém-declarados podem ocultar, implementar ou sobrescrever methods declarados em uma superclass ou superinterface.

Declarações de field ([§8.3](<#/doc/jls/jls-08>)) descrevem variáveis de classe, que são encarnadas uma vez, e variáveis de instância, que são encarnadas novamente para cada instância da classe. Um field pode ser declarado `final` ([§8.3.1.2](<#/doc/jls/jls-08>)), caso em que pode ser atribuído apenas uma vez. Qualquer declaração de field pode incluir um inicializador.

Declarações de member class ([§8.5](<#/doc/jls/jls-08>)) descrevem classes aninhadas que são membros da classe envolvente. Member classes podem ser `static`, caso em que não têm acesso às variáveis de instância da classe envolvente; ou podem ser inner classes.

Declarações de member interface ([§8.5](<#/doc/jls/jls-08>)) descrevem interfaces aninhadas que são membros da classe envolvente.

Declarações de method ([§8.4](<#/doc/jls/jls-08>)) descrevem código que pode ser invocado por expressões de invocação de method ([§15.12](<#/doc/jls/jls-15>)). Um method de classe é invocado em relação à classe; um method de instância é invocado em relação a algum objeto particular que é uma instância de uma classe. Um method cuja declaração não indica como ele é implementado deve ser declarado `abstract`. Um method pode ser declarado `final` ([§8.4.3.3](<#/doc/jls/jls-08>)), caso em que não pode ser ocultado ou sobrescrito. Um method pode ser implementado por código `native` dependente da plataforma ([§8.4.3.4](<#/doc/jls/jls-08>)). Um method `synchronized` ([§8.4.3.6](<#/doc/jls/jls-08>)) bloqueia automaticamente um objeto antes de executar seu corpo e desbloqueia automaticamente o objeto no retorno, como se pelo uso de uma instrução `synchronized` ([§14.19](<#/doc/jls/jls-14>)), permitindo assim que suas atividades sejam sincronizadas com as de outras threads ([§17 (_Threads and Locks_)](<#/doc/jls/jls-17>)).

Nomes de method podem ser sobrecarregados (overloaded) ([§8.4.9](<#/doc/jls/jls-08>)).

Inicializadores de instância ([§8.6](<#/doc/jls/jls-08>)) são blocos de código executável que podem ser usados para ajudar a inicializar uma instância quando ela é criada ([§15.9](<#/doc/jls/jls-15>)).

Inicializadores estáticos ([§8.7](<#/doc/jls/jls-08>)) são blocos de código executável que podem ser usados para ajudar a inicializar uma classe.

Construtores ([§8.8](<#/doc/jls/jls-08>)) são semelhantes a methods, mas não podem ser invocados diretamente por uma chamada de method; eles são usados para inicializar novas instâncias de classe. Assim como os methods, eles podem ser sobrecarregados (overloaded) ([§8.8.8](<#/doc/jls/jls-08>)).

## 8.1. Declarações de Classe

Uma _declaração de classe_ especifica uma classe.

Existem três tipos de declarações de classe: _declarações de classe normais_, _declarações enum_ ([§8.9](<#/doc/jls/jls-08>)), e _declarações record_ ([§8.10](<#/doc/jls/jls-08>)).

ClassDeclaration:

[NormalClassDeclaration](<#/doc/jls/jls-08>)   
[EnumDeclaration](<#/doc/jls/jls-08>)   
[RecordDeclaration](<#/doc/jls/jls-08>)

NormalClassDeclaration:

{[ClassModifier](<#/doc/jls/jls-08>)} `class` [TypeIdentifier](<#/doc/jls/jls-03>) [[TypeParameters](<#/doc/jls/jls-08>)] [[ClassExtends](<#/doc/jls/jls-08>)] [[ClassImplements](<#/doc/jls/jls-08>)] [[ClassPermits](<#/doc/jls/jls-08>)] [ClassBody](<#/doc/jls/jls-08>)

Algumas classes são implicitamente declaradas por outros construtos ([§8.1.8](<#/doc/jls/jls-08>)).

O _TypeIdentifier_ em uma declaração de classe especifica o nome da classe.

É um erro em tempo de compilação se uma classe tiver o mesmo nome simples que qualquer uma de suas classes ou interfaces envolventes.

O escopo e o sombreamento de uma declaração de classe são especificados em [§6.3](<#/doc/jls/jls-06>) e [§6.4.1](<#/doc/jls/jls-06>).

### 8.1.1. Modificadores de Classe

Uma declaração de classe pode incluir _modificadores de classe_.

ClassModifier:

(um de)   
[Annotation](<#/doc/jls/jls-09>) `public` `protected` `private`   
`abstract` `static` `final` `sealed` `non-sealed` `strictfp`

As regras relativas aos modificadores de annotation para uma declaração de classe são especificadas em [§9.7.4](<#/doc/jls/jls-09>) e [§9.7.5](<#/doc/jls/jls-09>).

O modificador de acesso `public` ([§6.6](<#/doc/jls/jls-06>)) pertence apenas a classes de nível superior ([§7.6](<#/doc/jls/jls-07>)) e member classes ([§8.5](<#/doc/jls/jls-08>), [§9.5](<#/doc/jls/jls-09>)), não a local classes ([§14.3](<#/doc/jls/jls-14>)) ou anonymous classes ([§15.9.5](<#/doc/jls/jls-15>)).

Os modificadores de acesso `protected` e `private` pertencem apenas a member classes.

O modificador `static` pertence apenas a member classes e local classes.

É um erro em tempo de compilação se a mesma palavra-chave aparecer mais de uma vez como um modificador para uma declaração de classe, ou se uma declaração de classe tiver mais de um dos modificadores de acesso `public`, `protected` e `private`.

É um erro em tempo de compilação se uma declaração de classe tiver mais de um dos modificadores `sealed`, `non-sealed` e `final`.

Se dois ou mais modificadores de classe (distintos) aparecerem em uma declaração de classe, é costumeiro, embora não obrigatório, que eles apareçam na ordem consistente com a mostrada acima na produção para _ClassModifier_.

#### 8.1.1.1. Classes `abstract`

Uma classe `abstract` é uma classe que está incompleta, ou a ser considerada incompleta.

É um erro em tempo de compilação se for feita uma tentativa de criar uma instância de uma classe `abstract` usando uma expressão de criação de instância de classe ([§15.9.1](<#/doc/jls/jls-15>)).

Uma subclasse de uma classe `abstract` que não seja ela própria `abstract` pode ser instanciada, resultando na execução de um construtor para a classe `abstract` e, portanto, na execução dos inicializadores de field para variáveis de instância dessa classe.

Uma classe normal pode ter methods `abstract`, ou seja, methods que são declarados mas ainda não implementados ([§8.4.3.1](<#/doc/jls/jls-08>)), somente se for uma classe `abstract`. É um erro em tempo de compilação se uma classe normal que não é `abstract` tiver um method `abstract`.

Uma classe C tem methods `abstract` se qualquer uma das seguintes condições for verdadeira:

  * Qualquer um dos methods membros ([§8.2](<#/doc/jls/jls-08>)) de C - seja declarado ou herdado - é `abstract`.

  * Qualquer uma das superclasses de C tem um method `abstract` declarado com acesso de pacote, e não existe nenhum method que sobrescreva o method `abstract` de C ou de uma superclasse de C.

É um erro em tempo de compilação declarar um tipo de classe `abstract` de tal forma que não seja possível criar uma subclasse que implemente todos os seus methods `abstract`. Essa situação pode ocorrer se a classe tivesse como membros dois methods `abstract` que têm a mesma assinatura de method ([§8.4.2](<#/doc/jls/jls-08>)) mas tipos de retorno para os quais nenhum tipo é substituível por tipo de retorno com ambos ([§8.4.5](<#/doc/jls/jls-08>)).

**Exemplo 8.1.1.1-1. Declaração de Classe Abstract**
```java
    abstract class Point {
        int x = 1, y = 1;
        void move(int dx, int dy) {
            x += dx;
            y += dy;
            alert();
        }
        abstract void alert();
    }
    abstract class ColoredPoint extends Point {
        int color;
    }
    class SimplePoint extends Point {
        void alert() { }
    }
    
```

Aqui, uma classe `Point` é declarada e deve ser declarada `abstract`, porque contém uma declaração de um method `abstract` chamado `alert`. A subclasse de `Point` chamada `ColoredPoint` herda o method `abstract` `alert`, então ela também deve ser declarada `abstract`. Por outro lado, a subclasse de `Point` chamada `SimplePoint` fornece uma implementação de `alert`, então ela não precisa ser `abstract`.

A instrução:
```java
    Point p = new Point();
    
```

resultaria em um erro em tempo de compilação; a classe `Point` não pode ser instanciada porque é `abstract`. No entanto, uma variável `Point` poderia ser corretamente inicializada com uma referência a qualquer subclasse de `Point`, e a classe `SimplePoint` não é `abstract`, então a instrução:
```java
    Point p = new SimplePoint();
    
```

estaria correta. A instanciação de um `SimplePoint` faz com que o construtor padrão e os inicializadores de field para `x` e `y` de `Point` sejam executados.

**Exemplo 8.1.1.1-2. Declaração de Classe Abstract que Proíbe Subclasses**
```java
    interface Colorable {
        void setColor(int color);
    }
    abstract class Colored implements Colorable {
        public abstract int setColor(int color);
    }
    
```

Essas declarações resultam em um erro em tempo de compilação: seria impossível para qualquer subclasse da classe `Colored` fornecer uma implementação de um method chamado `setColor`, que recebe um argumento do tipo `int`, que possa satisfazer ambas as especificações de method `abstract`, porque a da interface `Colorable` exige que o mesmo method não retorne valor, enquanto a da classe `Colored` exige que o mesmo method retorne um valor do tipo `int` ([§8.4](<#/doc/jls/jls-08>)).

Um tipo de classe deve ser declarado `abstract` apenas se a intenção for que subclasses possam ser criadas para completar a implementação. Se a intenção é simplesmente impedir a instanciação de uma classe, a maneira correta de expressar isso é declarar um construtor ([§8.8.10](<#/doc/jls/jls-08>)) sem argumentos, torná-lo `private`, nunca invocá-lo e não declarar outros construtores. Uma classe dessa forma geralmente contém methods e variáveis de classe.

A classe `Math` é um exemplo de classe que não pode ser instanciada; sua declaração se parece com isto:
```java
    
    public final class Math {
        private Math() { }  // never instantiate this class
        . . . declarations of class variables and methods . . .
    }
    
    
```

#### 8.1.1.2. Classes `sealed`, `non-sealed` e `final`

Uma classe pode ser declarada `sealed` se todas as suas subclasses diretas forem conhecidas quando a classe é declarada ([§8.1.6](<#/doc/jls/jls-08>)), e nenhuma outra subclasse direta for desejada ou exigida.

O controle explícito e exaustivo sobre as subclasses diretas de uma classe é útil quando a hierarquia de classes é usada para modelar os tipos de valores em um domínio, em vez de como um mecanismo para herança e reutilização de código. As subclasses diretas podem ser declaradas `sealed` para controlar ainda mais a hierarquia de classes.

Uma classe pode ser declarada `final` se sua definição estiver completa e nenhuma subclasse for desejada ou exigida.

É um erro em tempo de compilação se uma classe for declarada `final` e `abstract`, porque a implementação de tal classe nunca poderia ser concluída ([§8.1.1.1](<#/doc/jls/jls-08>)).

Como uma classe `final` nunca tem subclasses, os methods de uma classe `final` nunca são sobrescritos ([§8.4.8.1](<#/doc/jls/jls-08>)).

Uma classe é _livremente extensível_ se sua superclass direta não for `sealed` ([§8.1.4](<#/doc/jls/jls-08>)), e nenhuma de suas superinterfaces diretas for `sealed` ([§8.1.5](<#/doc/jls/jls-08>)), e ela mesma não for `sealed` nem `final`.

Uma classe que tem uma superclass direta `sealed` ou uma superinterface direta `sealed` é livremente extensível se e somente se for declarada `non-sealed`.

É um erro em tempo de compilação se uma classe tiver uma superclass direta `sealed` ou uma superinterface direta `sealed`, e não for declarada `final`, `sealed` ou `non-sealed` explicitamente ou implicitamente.

Assim, um efeito da palavra-chave `sealed` é forçar todas as subclasses diretas a declarar explicitamente se são `final`, `sealed` ou `non-sealed`. Isso evita expor acidentalmente uma hierarquia de classes sealed a subclassificação indesejada.

Uma enum class é implicitamente `final` ou implicitamente `sealed`, então ela pode implementar uma interface `sealed`. Da mesma forma, uma record class é implicitamente `final`, então ela também pode implementar uma interface `sealed`.

É um erro em tempo de compilação se uma classe for declarada `non-sealed` mas não tiver uma superclass direta `sealed` nem uma superinterface direta `sealed`.

Assim, uma subclasse de uma classe `non-sealed` não pode ser declarada `non-sealed` por si mesma.

#### 8.1.1.3. Classes `strictfp`

O modificador `strictfp` em uma declaração de classe é obsoleto e não deve ser usado em código novo. Sua presença ou ausência não tem efeito em tempo de compilação ou em tempo de execução.

#### 8.1.1.4. Classes `static`

O modificador `static` especifica que uma classe aninhada não é uma inner class ([§8.1.3](<#/doc/jls/jls-08>)). Assim como um method `static` de uma classe não tem uma instância atual da classe em seu corpo, uma classe aninhada `static` não tem uma instância imediatamente envolvente em seu corpo.

Referências de uma classe aninhada `static` a parâmetros de tipo, variáveis de instância, variáveis locais, parâmetros formais, parâmetros de exceção ou methods de instância de declarações de classe, interface ou method lexicamente envolventes são proibidas ([§6.5.5.1](<#/doc/jls/jls-06>), [§6.5.6.1](<#/doc/jls/jls-06>), e [§15.12.3](<#/doc/jls/jls-15>)).

O modificador `static` não se aplica a todas as classes aninhadas. Ele se aplica apenas a member classes, cujas declarações podem usar o modificador `static`, e não a local classes ou anonymous classes, cujas declarações não podem usar o modificador `static` ([§14.3](<#/doc/jls/jls-14>), [§15.9.5](<#/doc/jls/jls-15>)). No entanto, algumas local classes são implicitamente `static`, a saber, local enum classes e local record classes, porque todas as enum classes aninhadas e record classes aninhadas são implicitamente `static` ([§8.9](<#/doc/jls/jls-08>), [§8.10](<#/doc/jls/jls-08>)).

### 8.1.2. Classes Genéricas e Parâmetros de Tipo

Uma classe é _genérica_ se a declaração da classe declara uma ou mais variáveis de tipo ([§4.4](<#/doc/jls/jls-04>)).

Essas variáveis de tipo são conhecidas como os _parâmetros de tipo_ da classe. A seção de parâmetros de tipo segue o nome da classe e é delimitada por colchetes angulares.

TypeParameters:

`<` [TypeParameterList](<#/doc/jls/jls-08>) `>`

TypeParameterList:

[TypeParameter](<#/doc/jls/jls-04>) {`,` [TypeParameter](<#/doc/jls/jls-04>)}

As seguintes produções de [§4.4](<#/doc/jls/jls-04>) são mostradas aqui para conveniência:

TypeParameter:

{[TypeParameterModifier](<#/doc/jls/jls-04>)} [TypeIdentifier](<#/doc/jls/jls-03>) [[TypeBound](<#/doc/jls/jls-04>)]

TypeParameterModifier:

[Annotation](<#/doc/jls/jls-09>)

TypeBound:

`extends` [TypeVariable](<#/doc/jls/jls-04>)   
`extends` [ClassOrInterfaceType](<#/doc/jls/jls-04>) {[AdditionalBound](<#/doc/jls/jls-04>)}

AdditionalBound:

`&` [InterfaceType](<#/doc/jls/jls-04>)

As regras relativas aos modificadores de annotation para uma declaração de parâmetro de tipo são especificadas em [§9.7.4](<#/doc/jls/jls-09>) e [§9.7.5](<#/doc/jls/jls-09>).

Na seção de parâmetros de tipo de uma classe, uma variável de tipo T _depende diretamente_ de uma variável de tipo S se S é o limite de T, enquanto T _depende_ de S se T depende diretamente de S ou T depende diretamente de uma variável de tipo U que depende de S (usando esta definição recursivamente).

É um erro em tempo de compilação se uma variável de tipo na seção de parâmetros de tipo de uma classe depender de si mesma.

O escopo e o sombreamento do parâmetro de tipo de uma classe são especificados em [§6.3](<#/doc/jls/jls-06>) e [§6.4.1](<#/doc/jls/jls-06>).

Referências ao parâmetro de tipo de uma classe a partir de um contexto `static` ou de uma classe ou interface aninhada são restritas, conforme especificado em [§6.5.5.1](<#/doc/jls/jls-06>).

Uma declaração de classe genérica define um conjunto de tipos parametrizados ([§4.5](<#/doc/jls/jls-04>)), um para cada possível parametrização da seção de parâmetros de tipo por argumentos de tipo. Todos esses tipos parametrizados compartilham a mesma classe em tempo de execução.

Por exemplo, a execução do código:
```java
    
    Vector<String>  x = new Vector<String>();
    Vector<Integer> y = new Vector<Integer>();
    boolean b = x.getClass() == y.getClass();
    
    
```

resultará na variável `b` contendo o valor `true`.

É um erro em tempo de compilação se uma classe genérica for uma subclasse direta ou indireta de `Throwable` ([§11.1.1](<#/doc/jls/jls-11>)).

Essa restrição é necessária, pois o mecanismo de `catch` da Java Virtual Machine funciona apenas com classes não genéricas.

**Exemplo 8.1.2-1. Limites de Variáveis de Tipo Mutuamente Recursivos**
```java
    interface ConvertibleTo<T> {
        T convert();
    }
    class ReprChange<T extends ConvertibleTo<S>,
                     S extends ConvertibleTo<T>> {
        T t;
        void set(S s) { t = s.convert();    }
        S get()       { return t.convert(); }
    }
    
```

**Exemplo 8.1.2-2. Classes Genéricas Aninhadas**
```java
    class Seq<T> {
        T      head;
        Seq<T> tail;
    
        Seq() { this(null, null); }
        Seq(T head, Seq<T> tail) {
            this.head = head;
            this.tail = tail;
        }
        boolean isEmpty() { return tail == null; }
    
        class Zipper<S> {
            Seq<Pair<T,S>> zip(Seq<S> that) {
                if (isEmpty() || that.isEmpty()) {
                    return new Seq<Pair<T,S>>();
                } else {
                    Seq<T>.Zipper<S> tailZipper =
                        tail.new Zipper<S>();
                    return new Seq<Pair<T,S>>(
                        new Pair<T,S>(head, that.head),
                        tailZipper.zip(that.tail));
                }
            }
        }
    }
    class Pair<T, S> {
        T fst; S snd;
        Pair(T f, S s) { fst = f; snd = s; }
    }
    class Test {
        public static void main(String[] args) {
            Seq<String> strs =
                new Seq<String>(
                    "a",
                    new Seq<String>("b",
                                    new Seq<String>()));
            Seq<Number> nums =
                new Seq<Number>(
                    Integer.valueOf(1),
                    new Seq<Number>(Double.valueOf(1.5),
                                    new Seq<Number>()));
    
            Seq<String>.Zipper<Number> zipper =
                strs.new Zipper<Number>();
    
            Seq<Pair<String,Number>> combined =
                zipper.zip(nums);
        }
    }
    
```

### 8.1.3. Inner Classes e Instâncias Envolventes

Uma _inner class_ é uma classe aninhada que não é explícita ou implicitamente `static`.

Uma inner class é uma das seguintes:

  * uma member class que não é explícita ou implicitamente `static` ([§8.5](<#/doc/jls/jls-08>))

  * uma local class que não é implicitamente `static` ([§14.3](<#/doc/jls/jls-14>))

  * uma anonymous class ([§15.9.5](<#/doc/jls/jls-15>))

As seguintes classes aninhadas são implicitamente `static`, portanto não são inner classes:

  * uma member enum class ([§8.9](<#/doc/jls/jls-08>))

  * uma local enum class ([§14.3](<#/doc/jls/jls-14>))

  * uma member record class ([§8.10](<#/doc/jls/jls-08>))

  * uma local record class ([§14.3](<#/doc/jls/jls-14>))

  * uma member class de uma interface ([§9.5](<#/doc/jls/jls-09>))

Todas as regras que se aplicam a classes aninhadas se aplicam a inner classes. Em particular, uma inner class pode declarar e herdar membros `static` ([§8.2](<#/doc/jls/jls-08>)), e declarar inicializadores `static` ([§8.7](<#/doc/jls/jls-08>)), embora a própria inner class não seja `static`.

Não existem "inner interfaces" porque toda interface aninhada é implicitamente `static` ([§9.1.1.3](<#/doc/jls/jls-09>)).

**Exemplo 8.1.3-1. Declarações de Inner Class e Membros Static**
```java
    class HasStatic {
        static int j = 100;
    }
    
    class Outer {
        class Inner extends HasStatic {
            static {
                System.out.println("Hello from Outer.Inner");
            }
    
            static       int x = 3;
            static final int y = 4;
    
            static void hello() {
                System.out.println("Hello from Outer.Inner.hello");
            }
    
            static class VeryNestedButNotInner
                extends NestedButNotInner {}
        }
    
        static class NestedButNotInner {
            int z = Inner.x;
        }
    
        interface NeverInner {}  // Implicitly static, so never inner
    }
    
    
```

Antes do Java SE 16, uma inner class não podia declarar inicializadores `static`, e só podia declarar membros `static` que fossem variáveis constantes ([§4.12.4](<#/doc/jls/jls-04>)).

Um construto (instrução, instrução de declaração de variável local, declaração de classe local, declaração de interface local ou expressão) _ocorre em um contexto static_ se o mais interno:

  * declaração de method,

  * declaração de field,

  * declaração de construtor,

  * inicializador de instância, ou

  * inicializador static.

que envolve o construto é um dos seguintes:

  * uma declaração de method `static` ([§8.4.3.2](<#/doc/jls/jls-08>), [§9.4](<#/doc/jls/jls-09>))

  * uma declaração de field `static` ([§8.3.1.1](<#/doc/jls/jls-08>), [§9.3](<#/doc/jls/jls-09>))

  * um inicializador static ([§8.7](<#/doc/jls/jls-08>))

Note que um construto que aparece em uma declaração de construtor ou um inicializador de instância não ocorre em um contexto static.

O propósito de um contexto static é demarcar código para o qual não há instância atual definida da classe cuja declaração envolve lexicalmente o contexto static. Consequentemente, o código que ocorre em um contexto static é restrito das seguintes maneiras:

  * Expressões `this` (tanto não qualificadas quanto qualificadas) são proibidas ([§15.8.3](<#/doc/jls/jls-15>), [§15.8.4](<#/doc/jls/jls-15>)).
*   Acessos a campos, invocações de métodos e referências a métodos não podem ser qualificados por `super` ([§15.11.2](<#/doc/jls/jls-15>), [§15.12.3](<#/doc/jls/jls-15>), [§15.13.1](<#/doc/jls/jls-15>)).

*   Referências não qualificadas a variáveis de instância de qualquer declaração de classe ou interface lexicamente envolvente são proibidas ([§6.5.6.1](<#/doc/jls/jls-06>)).

*   Invocações não qualificadas de métodos de instância de qualquer declaração de classe ou interface lexicamente envolvente são proibidas ([§15.12.3](<#/doc/jls/jls-15>)).

*   Referências a parâmetros de tipo de quaisquer declarações de classe ou interface lexicamente envolventes são proibidas ([§6.5.5.1](<#/doc/jls/jls-06>)).

*   Referências a parâmetros de tipo, variáveis locais, parâmetros formais e parâmetros de exceção declarados por métodos ou construtores de qualquer declaração de classe ou interface lexicamente envolvente _que esteja fora da declaração de classe ou interface imediatamente envolvente_ são proibidas ([§6.5.5.1](<#/doc/jls/jls-06>), [§6.5.6.1](<#/doc/jls/jls-06>)).

*   Declarações de classes locais normais (em oposição a classes enum locais) e declarações de classes anônimas especificam classes que são internas, mas quando instanciadas não possuem instâncias imediatamente envolventes ([§15.9.2](<#/doc/jls/jls-15>)).

*   Expressões de criação de instância de classe que instanciam classes membro internas devem ser qualificadas ([§15.9](<#/doc/jls/jls-15>)).

Uma classe interna C é uma _classe interna direta de uma classe ou interface O_ se O for a declaração de classe ou interface imediatamente envolvente de C e a declaração de C não ocorrer em um contexto `static`.

Se uma classe interna for uma classe local ou uma classe anônima, ela pode ser declarada em um contexto `static`, e nesse caso não é considerada uma classe interna de nenhuma classe ou interface envolvente.

Uma classe C é uma _classe interna da classe ou interface O_ se for uma classe interna direta de O ou uma classe interna de uma classe interna de O.

É incomum, mas possível, que a declaração de classe ou interface imediatamente envolvente de uma classe interna seja uma interface. Isso só ocorre se a classe for uma classe local ou anônima declarada no corpo de um método `default` ou `static` ([§9.4](<#/doc/jls/jls-09>)).

Uma classe ou interface O é a _declaração de classe ou interface lexicamente envolvente de ordem zero de si mesma_.

Uma classe O é a _n-ésima declaração de classe lexicamente envolvente de uma classe C_ se for a declaração de classe imediatamente envolvente da declaração de classe lexicamente envolvente de ordem _n-1_ de C.

Uma instância `i` de uma classe interna direta C de uma classe ou interface O pode ser associada a uma instância de O, conhecida como a _instância imediatamente envolvente de `i`_. A instância imediatamente envolvente de um objeto, se houver, é determinada quando o objeto é criado ([§15.9.2](<#/doc/jls/jls-15>)).

Um objeto `o` é a _instância lexicamente envolvente de ordem zero de si mesmo_.

Um objeto `o` é a _n-ésima instância lexicamente envolvente de uma instância `i`_ se for a instância imediatamente envolvente da instância lexicamente envolvente de ordem _n-1_ de `i`.

Uma instância de uma classe local interna ou de uma classe anônima cuja declaração ocorre em um contexto `static` não possui instância imediatamente envolvente. Além disso, uma instância de uma classe aninhada `static` ([§8.1.1.4](<#/doc/jls/jls-08>)) não possui instância imediatamente envolvente.

Para cada superclasse S de C que é ela própria uma classe interna direta de uma classe ou interface SO, existe uma instância de SO associada a `i`, conhecida como a _instância imediatamente envolvente de `i` em relação a S_. A instância imediatamente envolvente de um objeto em relação à superclasse direta de sua classe, se houver, é determinada quando o construtor da superclasse é invocado através de uma invocação de construtor ([§8.8.7.1](<#/doc/jls/jls-08>)).

Quando uma classe interna contém uma referência válida a uma variável de instância que é membro de uma declaração de classe ou interface lexicamente envolvente, a variável da instância lexicamente envolvente correspondente é usada.

Qualquer variável local, parâmetro formal ou parâmetro de exceção usado, mas não declarado em uma classe interna, deve ser `final` ou efetivamente final ([§4.12.4](<#/doc/jls/jls-04>)), conforme especificado em [§6.5.6.1](<#/doc/jls/jls-06>)).

Qualquer variável local usada, mas não declarada em uma classe interna, deve ser definitivamente atribuída ([§16 (_Definite Assignment_)](<#/doc/jls/jls-16>)) antes do corpo da classe interna, ou ocorre um erro em tempo de compilação.

Regras semelhantes sobre o uso de variáveis se aplicam no corpo de uma expressão lambda ([§15.27.2](<#/doc/jls/jls-15>)).

Um campo `final` em branco ([§4.12.4](<#/doc/jls/jls-04>)) de uma declaração de classe ou interface lexicamente envolvente não pode ser atribuído dentro de uma classe interna, ou ocorre um erro em tempo de compilação.

**Exemplo 8.1.3-2. Declarações de Classes Internas**
```java
    class Outer {
        int i = 100;
        static void classMethod() {
            final int l = 200;
            class LocalInStaticContext {
                int k = i;  // Compile-time error
                int m = l;  // OK
            }
        }
        void foo() {
            class Local {  // A local class
                int j = i;
            }
        }
    }
    
```

A declaração da classe `LocalInStaticContext` ocorre em um contexto `static` por estar dentro do método `static` `classMethod`. Variáveis de instância da classe `Outer` não estão disponíveis dentro do corpo de um método `static`. Em particular, variáveis de instância de `Outer` não estão disponíveis dentro do corpo de `LocalInStaticContext`. No entanto, variáveis locais do método circundante podem ser referenciadas sem erro (desde que sejam declaradas `final` ou sejam efetivamente final).

Classes internas cujas declarações não ocorrem em um contexto `static` podem referenciar livremente as variáveis de instância de sua declaração de classe envolvente. Uma variável de instância é sempre definida em relação a uma instância. No caso de variáveis de instância de uma declaração de classe envolvente, a variável de instância deve ser definida em relação a uma instância envolvente da classe interna. Por exemplo, a classe `Local` acima possui uma instância envolvente da classe `Outer`. Como um exemplo adicional:
```java
    class WithDeepNesting {
        boolean toBe;
        WithDeepNesting(boolean b) { toBe = b; }
    
        class Nested {
            boolean theQuestion;
            class DeeplyNested {
                DeeplyNested(){
                    theQuestion = toBe || !toBe;
                }
            }
        }
    }
    
```

Aqui, cada instância de `WithDeepNesting.Nested.DeeplyNested` possui uma instância envolvente da classe `WithDeepNesting.Nested` (sua instância imediatamente envolvente) e uma instância envolvente da classe `WithDeepNesting` (sua 2ª instância lexicamente envolvente).

### 8.1.4. Superclasses e Subclasses

A cláusula `extends` opcional em uma declaração de classe normal especifica o _tipo de superclasse direta_ da classe que está sendo declarada.

ClassExtends:

`extends` [ClassType](<#/doc/jls/jls-04>)

A cláusula `extends` não deve aparecer na definição da classe `Object`, ou ocorre um erro em tempo de compilação, pois é a classe primordial e não possui tipo de superclasse direta.

O _ClassType_ deve nomear uma classe acessível ([§6.6](<#/doc/jls/jls-06>)), ou ocorre um erro em tempo de compilação.

É um erro em tempo de compilação se o _ClassType_ nomear uma classe que é `sealed` ([§8.1.1.2](<#/doc/jls/jls-08>)) e a classe que está sendo declarada não for uma subclasse direta permitida da classe nomeada ([§8.1.6](<#/doc/jls/jls-08>)).

É um erro em tempo de compilação se o _ClassType_ nomear uma classe que é `final`, porque classes `final` não são permitidas ter subclasses ([§8.1.1.2](<#/doc/jls/jls-08>)).

É um erro em tempo de compilação se o _ClassType_ nomear a classe `Enum`, que só pode ser estendida por uma classe enum ([§8.9](<#/doc/jls/jls-08>)), ou nomear a classe `Record`, que só pode ser estendida por uma classe record ([§8.10](<#/doc/jls/jls-08>)).

Se o _ClassType_ tiver argumentos de tipo, ele deve denotar um tipo parametrizado bem formado ([§4.5](<#/doc/jls/jls-04>)), e nenhum dos argumentos de tipo pode ser argumentos de tipo curinga, ou ocorre um erro em tempo de compilação.

O tipo de superclasse direta de uma classe cuja declaração não possui uma cláusula `extends` é o seguinte:

*   A classe `Object` não possui tipo de superclasse direta.

*   Para uma classe diferente de `Object` com uma declaração de classe normal, o tipo de superclasse direta é `Object`.

*   Para uma classe enum E, o tipo de superclasse direta é `Enum`<`E`>`.

*   Para uma classe record R, o tipo de superclasse direta é `Record`.

*   Para uma classe anônima, o tipo de superclasse direta é definido em [§15.9.5](<#/doc/jls/jls-15>).

A _superclasse direta_ de uma classe é a classe nomeada por seu tipo de superclasse direta. A superclasse direta é importante porque sua implementação é usada para derivar a implementação da classe que está sendo declarada.

A relação de _superclasse_ é o fecho transitivo da relação de superclasse direta. Uma classe A é uma superclasse da classe C se uma das seguintes condições for verdadeira:

*   A é a superclasse direta de C.

*   Onde uma classe B é a superclasse direta de C, A é uma superclasse de B, aplicando esta definição recursivamente.

Uma classe é considerada uma _subclasse direta_ de sua superclasse direta, e uma _subclasse_ de cada uma de suas superclasses.

**Exemplo 8.1.4-1. Superclasses e Subclasses Diretas**
```java
    class Point { int x, y; }
    final class ColoredPoint extends Point { int color; }
    class Colored3DPoint extends ColoredPoint { int z; }  // error
    
```

Aqui, as relações são as seguintes:

*   A classe `Point` é uma subclasse direta de `Object`.

*   A classe `Object` é a superclasse direta da classe `Point`.

*   A classe `ColoredPoint` é uma subclasse direta da classe `Point`.

*   A classe `Point` é a superclasse direta da classe `ColoredPoint`.

A declaração da classe `Colored3dPoint` causa um erro em tempo de compilação porque tenta estender a classe `final` `ColoredPoint`.

**Exemplo 8.1.4-2. Superclasses e Subclasses**
```java
    class Point { int x, y; }
    class ColoredPoint extends Point { int color; }
    final class Colored3dPoint extends ColoredPoint { int z; }
    
```

Aqui, as relações são as seguintes:

*   A classe `Point` é uma superclasse da classe `ColoredPoint`.

*   A classe `Point` é uma superclasse da classe `Colored3dPoint`.

*   A classe `ColoredPoint` é uma subclasse da classe `Point`.

*   A classe `ColoredPoint` é uma superclasse da classe `Colored3dPoint`.

*   A classe `Colored3dPoint` é uma subclasse da classe `ColoredPoint`.

*   A classe `Colored3dPoint` é uma subclasse da classe `Point`.

Uma classe C _depende diretamente_ de uma classe ou interface A se A for mencionada na cláusula `extends` ou `implements` de C, seja como uma superclasse ou superinterface, ou como um qualificador na forma totalmente qualificada de um nome de superclasse ou superinterface.

Uma classe C _depende_ de uma classe ou interface A se qualquer uma das seguintes condições for verdadeira:

*   C depende diretamente de A.

*   C depende diretamente de uma interface I que depende ([§9.1.3](<#/doc/jls/jls-09>)) de A.

*   C depende diretamente de uma classe B que depende de A, aplicando esta definição recursivamente.

É um erro em tempo de compilação se uma classe depender de si mesma.

Se classes declaradas circularmente forem detectadas em tempo de execução, à medida que as classes são carregadas, então uma `ClassCircularityError` é lançada ([§12.2.1](<#/doc/jls/jls-12>)).

**Exemplo 8.1.4-3. Classe Depende de Si Mesma**
```java
    class Point extends ColoredPoint { int x, y; }
    class ColoredPoint extends Point { int color; }
    
```

Este programa causa um erro em tempo de compilação porque a classe `Point` depende de si mesma.

### 8.1.5. Superinterfaces

A cláusula `implements` opcional em uma declaração de classe especifica os _tipos de superinterface direta_ da classe que está sendo declarada.

ClassImplements:

`implements` [InterfaceTypeList](<#/doc/jls/jls-08>)

InterfaceTypeList:

[InterfaceType](<#/doc/jls/jls-04>) {`,` [InterfaceType](<#/doc/jls/jls-04>)}

Cada _InterfaceType_ deve nomear uma interface acessível ([§6.6](<#/doc/jls/jls-06>)), ou ocorre um erro em tempo de compilação.

É um erro em tempo de compilação se qualquer _InterfaceType_ nomear uma interface que é `sealed` ([§9.1.1.4](<#/doc/jls/jls-09>)) e a classe que está sendo declarada não for uma subclasse direta permitida da interface nomeada ([§9.1.4](<#/doc/jls/jls-09>)).

Se um _InterfaceType_ tiver argumentos de tipo, ele deve denotar um tipo parametrizado bem formado ([§4.5](<#/doc/jls/jls-04>)), e nenhum dos argumentos de tipo pode ser argumentos de tipo curinga, ou ocorre um erro em tempo de compilação.

É um erro em tempo de compilação se a mesma interface for nomeada por um tipo de superinterface direta mais de uma vez em uma única cláusula `implements`. Isso é verdade mesmo que a interface seja nomeada de diferentes maneiras.

**Exemplo 8.1.5-1. Superinterfaces Ilegais**
```java
    class Redundant implements java.lang.Cloneable, Cloneable {
        int x;
    }
    
    
```

Este programa resulta em um erro em tempo de compilação porque os nomes `java.lang.Cloneable` e `Cloneable` referem-se à mesma interface.

Uma classe cuja declaração não possui uma cláusula `implements` não possui tipos de superinterface direta, com uma exceção: uma classe anônima pode ter um tipo de superinterface ([§15.9.5](<#/doc/jls/jls-15>)).

Uma interface é uma _superinterface direta_ de uma classe se a interface for nomeada por um dos tipos de superinterface direta da classe.

Uma interface I é uma _superinterface_ da classe C se qualquer uma das seguintes condições for verdadeira:

*   I é uma superinterface direta de C.

*   C possui alguma superinterface direta J para a qual I é uma superinterface, usando a definição de "superinterface de uma interface" dada em [§9.1.3](<#/doc/jls/jls-09>).

*   I é uma superinterface da superclasse direta de C.

Uma classe pode ter uma superinterface de mais de uma maneira.

Uma classe é considerada como _implementando diretamente_ suas superinterfaces diretas, e como _implementando_ todas as suas superinterfaces.

Uma classe é considerada uma _subclasse direta_ de suas superinterfaces diretas, e uma _subclasse_ de todas as suas superinterfaces.

Uma classe não pode declarar um tipo de superclasse direta e um tipo de superinterface direta, ou dois tipos de superinterface direta, que sejam, ou que tenham supertipos ([§4.10.2](<#/doc/jls/jls-04>)) que sejam, diferentes parametrizações da mesma interface genérica ([§9.1.2](<#/doc/jls/jls-09>)), ou uma parametrização de uma interface genérica e um tipo raw que nomeia essa mesma interface genérica. No caso de tal conflito, ocorre um erro em tempo de compilação.

Este requisito foi introduzido para suportar a tradução por type erasure ([§4.6](<#/doc/jls/jls-04>)).

**Exemplo 8.1.5-2. Superinterfaces**
```java
    interface Colorable {
        void setColor(int color);
        int getColor();
    }
    enum Finish { MATTE, GLOSSY }
    interface Paintable extends Colorable {
        void setFinish(Finish finish);
        Finish getFinish();
    }
    
    class Point { int x, y; }
    class ColoredPoint extends Point implements Colorable {
        int color;
        public void setColor(int color) { this.color = color; }
        public int getColor() { return color; }
    }
    class PaintedPoint extends ColoredPoint implements Paintable {
        Finish finish;
        public void setFinish(Finish finish) {
            this.finish = finish;
        }
        public Finish getFinish() { return finish; }
    }
    
```

Aqui, as relações são as seguintes:

*   A interface `Paintable` é uma superinterface da classe `PaintedPoint`.

*   A interface `Colorable` é uma superinterface da classe `ColoredPoint` e da classe `PaintedPoint`.

*   A interface `Paintable` é uma subinterface da interface `Colorable`, e `Colorable` é uma superinterface de `Paintable`, conforme definido em [§9.1.3](<#/doc/jls/jls-09>).

A classe `PaintedPoint` tem `Colorable` como superinterface tanto porque é uma superinterface de `ColoredPoint` quanto porque é uma superinterface de `Paintable`.

**Exemplo 8.1.5-3. Herança Múltipla Ilegal de uma Interface**
```java
    interface I<T> {}
    class B implements I<Integer> {}
    class C extends B implements I<String> {}
    
```

A classe `C` causa um erro em tempo de compilação porque tenta ser um subtipo de I<`Integer`> e I<`String`>.

A menos que a classe que está sendo declarada seja `abstract`, todos os métodos membro `abstract` de cada superinterface direta devem ser implementados ([§8.4.8.1](<#/doc/jls/jls-08>)) por uma declaração nesta classe ou por uma declaração de método existente herdada da superclasse direta ou de uma superinterface direta, porque uma classe que não é `abstract` não tem permissão para ter métodos `abstract` ([§8.1.1.1](<#/doc/jls/jls-08>)).

Cada método `default` ([§9.4.3](<#/doc/jls/jls-09>)) de uma superinterface da classe pode opcionalmente ser sobrescrito por um método na classe; caso contrário, o método `default` é tipicamente herdado e seu comportamento é conforme especificado por seu corpo `default`.

É permitido que uma única declaração de método em uma classe implemente métodos de mais de uma superinterface.

**Exemplo 8.1.5-4. Implementando Métodos de uma Superinterface**
```java
    interface Colorable {
        void setColor(int color);
        int getColor();
    }
    class Point { int x, y; };
    class ColoredPoint extends Point implements Colorable {
        int color;
    }
    
```

Este programa causa um erro em tempo de compilação, porque `ColoredPoint` não é uma classe `abstract` mas falha em fornecer uma implementação dos métodos `setColor` e `getColor` da interface `Colorable`.

No programa a seguir:
```java
    interface Fish  { int getNumberOfScales(); }
    interface Piano { int getNumberOfScales(); }
    class Tuna implements Fish, Piano {
        // You can tune a piano, but can you tuna fish?
        public int getNumberOfScales() { return 91; }
    }
    
```

o método `getNumberOfScales` na classe `Tuna` tem um nome, assinatura e tipo de retorno que correspondem ao método declarado na interface `Fish` e também correspondem ao método declarado na interface `Piano`; ele é considerado como implementando ambos.

Por outro lado, em uma situação como esta:
```java
    interface Fish       { int    getNumberOfScales(); }
    interface StringBass { double getNumberOfScales(); }
    class Bass implements Fish, StringBass {
        // This declaration cannot be correct,
        // no matter what type is used.
        public ?? getNumberOfScales() { return 91; }
    }
    
```

é impossível declarar um método chamado `getNumberOfScales` cuja assinatura e tipo de retorno sejam compatíveis com os métodos declarados na interface `Fish` e na interface `StringBass`, porque uma classe não pode ter múltiplos métodos com a mesma assinatura e diferentes tipos de retorno primitivos ([§8.4](<#/doc/jls/jls-08>)). Portanto, é impossível para uma única classe implementar ambas as interfaces `Fish` e `StringBass` ([§8.4.8](<#/doc/jls/jls-08>)).

### 8.1.6. Subclasses Diretas Permitidas

A cláusula `permits` opcional em uma declaração de classe normal especifica todas as classes pretendidas como subclasses diretas da classe que está sendo declarada ([§8.1.1.2](<#/doc/jls/jls-08>)).

ClassPermits:

`permits` [TypeName](<#/doc/jls/jls-06>) {`,` [TypeName](<#/doc/jls/jls-06>)}

É um erro em tempo de compilação se uma declaração de classe tiver uma cláusula `permits` mas nenhum modificador `sealed`.

Cada _TypeName_ deve nomear uma classe acessível ([§6.6](<#/doc/jls/jls-06>)), ou ocorre um erro em tempo de compilação.

É um erro em tempo de compilação se a mesma classe for especificada mais de uma vez em uma cláusula `permits`. Isso é verdade mesmo que a classe seja nomeada de diferentes maneiras.

O nome canônico de uma classe não precisa ser usado em uma cláusula `permits`, mas uma cláusula `permits` só pode especificar uma classe uma vez. Por exemplo, o seguinte programa falha ao compilar:
```java
    package p;
    
    sealed class A     permits B, C, p.B {}  // error
    
    non-sealed class B extends A {}
    non-sealed class C extends A {}
    
```

Se uma classe `sealed` C estiver associada a um módulo nomeado ([§7.3](<#/doc/jls/jls-07>)), então cada classe especificada na cláusula `permits` da declaração de C deve estar associada ao mesmo módulo que C, ou ocorre um erro em tempo de compilação.

Se uma classe `sealed` C estiver associada a um módulo não nomeado ([§7.7.5](<#/doc/jls/jls-07>)), então cada classe especificada na cláusula `permits` da declaração de C deve pertencer ao mesmo pacote que C, ou ocorre um erro em tempo de compilação.

Uma classe `sealed` e suas subclasses diretas precisam se referir umas às outras de forma circular, nas cláusulas `permits` e `extends`, respectivamente. Portanto, em uma base de código modular, elas devem estar co-localizadas no mesmo módulo, pois classes em módulos diferentes não podem se referir umas às outras de forma circular. A co-localização é desejável em qualquer caso porque uma hierarquia de classes `sealed` deve ser sempre declarada dentro de um único domínio de manutenção, onde o mesmo desenvolvedor ou grupo de desenvolvedores é responsável por manter a hierarquia. Um módulo nomeado tipicamente representa um domínio de manutenção em uma base de código modular.

Se a declaração de uma classe `sealed` C tiver uma cláusula `permits`, então as _subclasses diretas permitidas_ de C são as classes especificadas pela cláusula `permits`.

Cada subclasse direta permitida especificada pela cláusula `permits` deve ser uma subclasse direta de C ([§8.1.4](<#/doc/jls/jls-08>)), ou ocorre um erro em tempo de compilação.

Se a declaração de uma classe `sealed` C não tiver uma cláusula `permits`, então as subclasses diretas permitidas de C são as seguintes:

*   Se C não for uma classe enum, então suas subclasses diretas permitidas são aquelas classes declaradas na mesma unidade de compilação que C ([§7.3](<#/doc/jls/jls-07>)) que possuem um nome canônico ([§6.7](<#/doc/jls/jls-06>)) e cuja superclasse direta é C.

Ou seja, as subclasses diretas permitidas são inferidas como as classes na mesma unidade de compilação que especificam C como sua superclasse direta. O requisito de um nome canônico significa que nenhuma classe local ou classe anônima será considerada.

É um erro em tempo de compilação se a declaração de uma classe `sealed` C não tiver uma cláusula `permits` e C não tiver subclasses diretas permitidas.

*   Se C for uma classe enum, então suas subclasses diretas permitidas, se houver, são especificadas em [§8.9](<#/doc/jls/jls-08>).

### 8.1.7. Corpo da Classe e Declarações de Membros

Um _corpo de classe_ pode conter declarações de membros da classe, ou seja, campos ([§8.3](<#/doc/jls/jls-08>)), métodos ([§8.4](<#/doc/jls/jls-08>)), classes e interfaces ([§8.5](<#/doc/jls/jls-08>)).

Um corpo de classe também pode conter inicializadores de instância ([§8.6](<#/doc/jls/jls-08>)), inicializadores `static` ([§8.7](<#/doc/jls/jls-08>)) e declarações de construtores ([§8.8](<#/doc/jls/jls-08>)) para a classe.

ClassBody:

`{` {[ClassBodyDeclaration](<#/doc/jls/jls-08>)} `}`

ClassBodyDeclaration:

[ClassMemberDeclaration](<#/doc/jls/jls-08>)
[InstanceInitializer](<#/doc/jls/jls-08>)
[StaticInitializer](<#/doc/jls/jls-08>)
[ConstructorDeclaration](<#/doc/jls/jls-08>)

ClassMemberDeclaration:

[FieldDeclaration](<#/doc/jls/jls-08>)
[MethodDeclaration](<#/doc/jls/jls-08>)
[ClassDeclaration](<#/doc/jls/jls-08>)
[InterfaceDeclaration](<#/doc/jls/jls-09>)
`;`

O escopo e o sombreamento de uma declaração de um membro `m` declarado ou herdado por uma classe C são especificados em [§6.3](<#/doc/jls/jls-06>) e [§6.4.1](<#/doc/jls/jls-06>).

Se C for uma classe aninhada, pode haver definições do mesmo tipo (variável, método ou tipo) e nome que `m` em escopos envolventes. (Os escopos podem ser blocos, classes ou pacotes.) Em todos esses casos, o membro `m` declarado ou herdado por C sombreia as outras definições do mesmo tipo e nome.

### 8.1.8. Classes Declaradas Implicitamente

Nem todas as classes são especificadas por uma declaração de classe. As seguintes construções declaram classes implicitamente:

*   uma expressão de criação de instância de classe que termina com um corpo de classe ([§15.9.5](<#/doc/jls/jls-15>))

*   uma constante enum que termina com um corpo de classe ([§8.9.1](<#/doc/jls/jls-08>))

*   uma unidade de compilação compacta ([§7.3](<#/doc/jls/jls-07>))

Em todos os casos, os membros de qualquer classe implicitamente declarada, incluindo quaisquer membros implicitamente declarados, estão sujeitos às regras usuais para declarações de membros em uma classe.

A seguinte produção de [§7.3](<#/doc/jls/jls-07>) é mostrada aqui para conveniência:

CompactCompilationUnit:

{[ImportDeclaration](<#/doc/jls/jls-07>)} {[ClassMemberDeclarationNoMethod](<#/doc/jls/jls-07>)} [MethodDeclaration](<#/doc/jls/jls-08>) {[ClassMemberDeclaration](<#/doc/jls/jls-08>)}

ClassMemberDeclarationNoMethod:

[FieldDeclaration](<#/doc/jls/jls-08>)
[ClassDeclaration](<#/doc/jls/jls-08>)
[InterfaceDeclaration](<#/doc/jls/jls-09>)
`;`

A classe implicitamente declarada por uma unidade de compilação compacta satisfaz as seguintes propriedades:

*   É uma classe de nível superior ([§7.6](<#/doc/jls/jls-07>)).

*   Seu nome é um identificador válido ([§3.8](<#/doc/jls/jls-03>)) determinado pelo sistema hospedeiro.

Em implementações simples da Plataforma Java SE, onde as unidades de compilação são armazenadas em arquivos, o nome desta classe implicitamente declarada seria tipicamente o nome do arquivo contendo a unidade de compilação compacta menos qualquer extensão (como `.java` ou `.jav`).

*   Não é `abstract` ([§8.1.1.1](<#/doc/jls/jls-08>)).

*   É `final` ([§8.1.1.2](<#/doc/jls/jls-08>)).

*   É um membro de um pacote não nomeado ([§7.4.2](<#/doc/jls/jls-07>)) e tem acesso de pacote.

*   Sua superclasse direta é `Object` ([§8.1.4](<#/doc/jls/jls-08>)).

*   Não possui nenhuma superinterface direta ([§8.1.5](<#/doc/jls/jls-08>)).

*   O corpo da classe contém cada membro de classe declarado na unidade de compilação compacta (estas são declarações de campos ([§8.3](<#/doc/jls/jls-08>)), métodos ([§8.4](<#/doc/jls/jls-08>)), classes membro ([§8.5](<#/doc/jls/jls-08>)) e interfaces membro ([§9.1.1.3](<#/doc/jls/jls-09>))). Não é possível para uma unidade de compilação compacta conter declarações de inicializadores de instância ([§8.6](<#/doc/jls/jls-08>)), inicializadores `static` ([§8.7](<#/doc/jls/jls-08>)) ou construtores ([§8.8](<#/doc/jls/jls-08>)).

*   Possui um construtor `default` implicitamente declarado ([§8.8.9](<#/doc/jls/jls-08>)).

É um erro em tempo de compilação se esta classe não declarar pelo menos um método `main` candidato ([§12.1.4](<#/doc/jls/jls-12>)).

Note que um pacote não nomeado pode ter múltiplas classes implicitamente declaradas como membros.
## 8.2. Membros de Classe

Os membros de uma classe são todos os seguintes:

  * Membros herdados de seu tipo de superclasse direta ([§8.1.4](<#/doc/jls/jls-08>)), exceto na classe `Object`, que não possui tipo de superclasse direta

  * Membros herdados de quaisquer tipos de superinterface diretas ([§8.1.5](<#/doc/jls/jls-08>))

  * Membros declarados no corpo da classe ([§8.1.7](<#/doc/jls/jls-08>))

Membros de uma classe que são declarados `private` não são herdados por subclasses dessa classe.

Apenas membros de uma classe que são declarados `protected` ou `public` são herdados por subclasses declaradas em um pacote diferente daquele em que a classe é declarada.

Construtores, inicializadores estáticos e inicializadores de instância não são membros e, portanto, não são herdados.

Usamos a frase _o tipo de um membro_ para denotar:

  * Para um campo, seu tipo.

  * Para um método, uma 4-tupla ordenada (conhecida como _tipo de método_) consistindo em:

    * parâmetros de tipo: as declarações de quaisquer parâmetros de tipo do membro método ([§8.4.4](<#/doc/jls/jls-08>)).

    * tipos de parâmetro: uma lista dos tipos dos parâmetros formais do membro método ([§8.4.1](<#/doc/jls/jls-08>)).

    * tipo de retorno: o tipo de retorno do membro método ([§8.4.5](<#/doc/jls/jls-08>)).

    * cláusula `throws`: tipos de exceção declarados na cláusula `throws` do membro método ([§8.4.6](<#/doc/jls/jls-08>)).

Campos, métodos, classes membro e interfaces membro de uma classe podem ter o mesmo nome, uma vez que são usados em contextos diferentes e são disambiguados por diferentes procedimentos de busca ([§6.5](<#/doc/jls/jls-06>)). No entanto, isso é desencorajado como uma questão de estilo.

**Exemplo 8.2-1. Uso de Membros de Classe**
```
    class Point {
        int x, y;
        private Point() { reset(); }
        Point(int x, int y) { this.x = x; this.y = y; }
        private void reset() { this.x = 0; this.y = 0; }
    }
    class ColoredPoint extends Point {
        int color;
        void clear() { reset(); }  // error
    }
    class Test {
        public static void main(String[] args) {
            ColoredPoint c = new ColoredPoint(0, 0);  // error
            c.reset();  // error
        }
    }

```

Este programa causa quatro erros em tempo de compilação.

Um erro ocorre porque `ColoredPoint` não possui um construtor declarado com dois parâmetros `int`, conforme solicitado pelo uso em `main`. Isso ilustra o fato de que `ColoredPoint` não herda os construtores de sua superclasse `Point`.

Outro erro ocorre porque `ColoredPoint` não declara construtores e, portanto, um construtor padrão para ela é implicitamente declarado ([§8.8.9](<#/doc/jls/jls-08>)), e este construtor padrão é equivalente a:
```
    ColoredPoint() { super(); }

```

que invoca o construtor, sem argumentos, para a superclasse direta da classe `ColoredPoint`. O erro é que o construtor para `Point` que não recebe argumentos é `private`, e portanto não é acessível fora da classe `Point`, mesmo através de uma invocação de construtor de superclasse ([§8.8.7](<#/doc/jls/jls-08>)).

Mais dois erros ocorrem porque o método `reset` da classe `Point` é `private`, e portanto não é herdado pela classe `ColoredPoint`. As invocações de método no método `clear` da classe `ColoredPoint` e no método `main` da classe `Test` estão, portanto, incorretas.

**Exemplo 8.2-2. Herança de Membros de Classe com Acesso de Pacote**

Considere o exemplo onde o pacote `points` declara duas unidades de compilação:
```
    package points;
    public class Point {
        int x, y;
        public void move(int dx, int dy) { x += dx; y += dy; }
    }

```

e:
```
    package points;
    public class Point3d extends Point {
        int z;
        public void move(int dx, int dy, int dz) {
            x += dx; y += dy; z += dz;
        }
    }

```

e uma terceira unidade de compilação, em outro pacote, é:
```
    import points.Point3d;
    class Point4d extends Point3d {
        int w;
        public void move(int dx, int dy, int dz, int dw) {
            x += dx; y += dy; z += dz; w += dw; // compile-time errors
        }
    }

```

Aqui ambas as classes no pacote `points` compilam. A classe `Point3d` herda os campos `x` e `y` da classe `Point`, porque está no mesmo pacote que `Point`. A classe `Point4d`, que está em um pacote diferente, não herda os campos `x` e `y` da classe `Point` ou o campo `z` da classe `Point3d`, e assim falha na compilação.

Uma maneira melhor de escrever a terceira unidade de compilação seria:
```

    import points.Point3d;
    class Point4d extends Point3d {
        int w;
        public void move(int dx, int dy, int dz, int dw) {
            super.move(dx, dy, dz); w += dw;
        }
    }


```

usando o método `move` da superclasse `Point3d` para processar `dx`, `dy` e `dz`. Se `Point4d` for escrita dessa forma, ela compilará sem erros.

**Exemplo 8.2-3. Herança de Membros de Classe `public` e `protected`

Dada a classe `Point`:
```
    package points;
    public class Point {
        public int x, y;
        protected int useCount = 0;
        static protected int totalUseCount = 0;
        public void move(int dx, int dy) {
            x += dx; y += dy; useCount++; totalUseCount++;
        }
    }

```

os campos `public` e `protected` `x`, `y`, `useCount` e `totalUseCount` são herdados em todas as subclasses de `Point`.

Portanto, este programa de teste, em outro pacote, pode ser compilado com sucesso:
```
    class Test extends points.Point {
        public void moveBack(int dx, int dy) {
            x -= dx; y -= dy; useCount++; totalUseCount++;
        }
    }

```

**Exemplo 8.2-4. Herança de Membros de Classe `private`
```
    class Point {
        int x, y;
        void move(int dx, int dy) {
            x += dx; y += dy; totalMoves++;
        }
        private static int totalMoves;
        void printMoves() { System.out.println(totalMoves); }
    }
    class Point3d extends Point {
        int z;
        void move(int dx, int dy, int dz) {
            super.move(dx, dy); z += dz; totalMoves++; // error
        }
    }

```

Aqui, a variável de classe `totalMoves` pode ser usada apenas dentro da classe `Point`; ela não é herdada pela subclasse `Point3d`. Ocorre um erro em tempo de compilação porque o método `move` da classe `Point3d` tenta incrementar `totalMoves`.

**Exemplo 8.2-5. Acessando Membros de Classes Inacessíveis**

Mesmo que uma classe não seja declarada `public`, instâncias da classe podem estar disponíveis em tempo de execução para código fora do pacote em que ela é declarada por meio de uma superclasse ou superinterface `public`. Uma instância da classe pode ser atribuída a uma variável de tal tipo `public`. Uma invocação de um método `public` do objeto referido por tal variável pode invocar um método da classe se ele implementar ou sobrescrever um método da superclasse ou superinterface `public`. (Nesta situação, o método é necessariamente declarado `public`, mesmo que seja declarado em uma classe que não é `public`.)

Considere a unidade de compilação:
```
    package points;
    public class Point {
        public int x, y;
        public void move(int dx, int dy) {
            x += dx; y += dy;
        }
    }

```

e outra unidade de compilação de outro pacote:
```
    package morePoints;
    class Point3d extends points.Point {
        public int z;
        public void move(int dx, int dy, int dz) {
            super.move(dx, dy); z += dz;
        }
        public void move(int dx, int dy) {
            move(dx, dy, 0);
        }
    }
    public class OnePoint {
        public static points.Point getOne() {
            return new Point3d();
        }
    }

```

Uma invocação `morePoints.OnePoint.getOne()` em um terceiro pacote retornaria um `Point3d` que pode ser usado como um `Point`, mesmo que o tipo `Point3d` não esteja disponível fora do pacote `morePoints`. A versão de dois argumentos do método `move` poderia então ser invocada para esse objeto, o que é permitido porque o método `move` de `Point3d` é `public` (como deve ser, pois qualquer método que sobrescreve um método `public` deve ser `public`, precisamente para que situações como esta funcionem corretamente). Os campos `x` e `y` desse objeto também poderiam ser acessados a partir desse terceiro pacote.

Embora o campo `z` da classe `Point3d` seja `public`, não é possível acessar este campo a partir de código fora do pacote `morePoints`, dada apenas uma referência a uma instância da classe `Point3d` em uma variável `p` do tipo `Point`. Isso ocorre porque a expressão `p.z` não está correta, pois `p` tem o tipo `Point` e a classe `Point` não possui um campo chamado `z`; além disso, a expressão `((Point3d)p).z` não está correta, porque o tipo de classe `Point3d` não pode ser referido fora do pacote `morePoints`.

A declaração do campo `z` como `public` não é inútil, no entanto. Se houvesse, no pacote `morePoints`, uma subclasse `public` `Point4d` da classe `Point3d`:
```
    package morePoints;
    public class Point4d extends Point3d {
        public int w;
        public void move(int dx, int dy, int dz, int dw) {
            super.move(dx, dy, dz); w += dw;
        }
    }

```

então a classe `Point4d` herdaria o campo `z`, que, sendo `public`, poderia então ser acessado por código em pacotes diferentes de `morePoints`, através de variáveis e expressões do tipo `public` `Point4d`.

## 8.3. Declarações de Campo

As variáveis de uma classe são introduzidas por _declarações de campo_.

DeclaraçãoDeCampo:

{[FieldModifier](<#/doc/jls/jls-08>)} [UnannType](<#/doc/jls/jls-08>) [VariableDeclaratorList](<#/doc/jls/jls-08>) `;`

ListaDeDeclaradoresDeVariável:

[VariableDeclarator](<#/doc/jls/jls-08>) {`,` [VariableDeclarator](<#/doc/jls/jls-08>)}

DeclaradorDeVariável:

[VariableDeclaratorId](<#/doc/jls/jls-08>) [`=` [VariableInitializer](<#/doc/jls/jls-08>)]

IdDeclaradorDeVariável:

[Identifier](<#/doc/jls/jls-03>) [[Dims](<#/doc/jls/jls-04>)]
`_`

InicializadorDeVariável:

[Expression](<#/doc/jls/jls-15>)
[ArrayInitializer](<#/doc/jls/jls-10>)

TipoNãoAnotado:

[UnannPrimitiveType](<#/doc/jls/jls-08>)
[UnannReferenceType](<#/doc/jls/jls-08>)

TipoPrimitivoNãoAnotado:

[NumericType](<#/doc/jls/jls-04>)
`boolean`

TipoDeReferênciaNãoAnotado:

[UnannClassOrInterfaceType](<#/doc/jls/jls-08>)
[UnannTypeVariable](<#/doc/jls/jls-08>)
[UnannArrayType](<#/doc/jls/jls-08>)

TipoDeClasseOuInterfaceNãoAnotado:

[UnannClassType](<#/doc/jls/jls-08>)
[UnannInterfaceType](<#/doc/jls/jls-08>)

TipoDeClasseNãoAnotado:

[TypeIdentifier](<#/doc/jls/jls-03>) [[TypeArguments](<#/doc/jls/jls-04>)]
[PackageName](<#/doc/jls/jls-06>) `.` {[Annotation](<#/doc/jls/jls-09>)} [TypeIdentifier](<#/doc/jls/jls-03>) [[TypeArguments](<#/doc/jls/jls-04>)]
[UnannClassOrInterfaceType](<#/doc/jls/jls-08>) `.` {[Annotation](<#/doc/jls/jls-09>)} [TypeIdentifier](<#/doc/jls/jls-03>) [[TypeArguments](<#/doc/jls/jls-04>)]

TipoDeInterfaceNãoAnotado:

[UnannClassType](<#/doc/jls/jls-08>)

VariávelDeTipoNãoAnotado:

[TypeIdentifier](<#/doc/jls/jls-03>)

TipoDeArrayNãoAnotado:

[UnannPrimitiveType](<#/doc/jls/jls-08>) [Dims](<#/doc/jls/jls-04>)
[UnannClassOrInterfaceType](<#/doc/jls/jls-08>) [Dims](<#/doc/jls/jls-04>)
[UnannTypeVariable](<#/doc/jls/jls-08>) [Dims](<#/doc/jls/jls-04>)

A seguinte produção de [§4.3](<#/doc/jls/jls-04>) é mostrada aqui para conveniência:

Dimensões:

{[Annotation](<#/doc/jls/jls-09>)} `[` `]` {{[Annotation](<#/doc/jls/jls-09>)} `[` `]`}

Cada declarador em uma _DeclaraçãoDeCampo_ declara um campo. O declarador deve incluir um _Identificador_, ou ocorre um erro em tempo de compilação. O _Identificador_ pode ser usado em um nome para se referir ao campo.

Mais de um campo pode ser declarado em uma única _DeclaraçãoDeCampo_ usando mais de um declarador; os _ModificadoresDeCampo_ e o _TipoNãoAnotado_ se aplicam a todos os declaradores na declaração.

A cláusula _ModificadorDeCampo_ é descrita em [§8.3.1](<#/doc/jls/jls-08>).

O tipo declarado de um campo é denotado por _TipoNãoAnotado_ se nenhum par de colchetes aparecer em _TipoNãoAnotado_ e _IdDeclaradorDeVariável_, e é especificado por [§10.2](<#/doc/jls/jls-10>) caso contrário.

O escopo e o sombreamento de uma declaração de campo são especificados em [§6.3](<#/doc/jls/jls-06>) e [§6.4.1](<#/doc/jls/jls-06>).

É um erro em tempo de compilação para o corpo de uma declaração de classe declarar dois campos com o mesmo nome.

Se uma classe declara um campo com um certo nome, então a declaração desse campo é dita _esconder_ todas e quaisquer declarações acessíveis de campos com o mesmo nome em superclasses e superinterfaces da classe.

Nesse aspecto, o ocultamento de campos difere do ocultamento de métodos ([§8.4.8.3](<#/doc/jls/jls-08>)), pois não há distinção entre campos `static` e não-`static` no ocultamento de campos, enquanto uma distinção é feita entre métodos `static` e não-`static` no ocultamento de métodos.

Um campo oculto pode ser acessado usando um nome qualificado ([§6.5.6.2](<#/doc/jls/jls-06>)) se for `static`, ou usando uma expressão de acesso a campo que contém a palavra-chave `super` ([§15.11.2](<#/doc/jls/jls-15>)) ou um cast para um tipo de superclasse.

Nesse aspecto, o ocultamento de campos é semelhante ao ocultamento de métodos.

Se uma declaração de campo oculta a declaração de outro campo, os dois campos não precisam ter o mesmo tipo.

Uma classe herda de sua superclasse direta e superinterfaces diretas todos os campos não-`private` da superclasse e superinterfaces que são acessíveis ([§6.6](<#/doc/jls/jls-06>)) ao código na classe e não ocultados por uma declaração na classe.

Um campo `private` de uma superclasse pode ser acessível a uma subclasse - por exemplo, se ambas as classes forem membros da mesma classe. No entanto, um campo `private` nunca é herdado por uma subclasse.

É possível para uma classe herdar mais de um campo com o mesmo nome, seja de sua superclasse e superinterfaces ou apenas de suas superinterfaces. Tal situação não causa por si só um erro em tempo de compilação. No entanto, qualquer tentativa dentro do corpo da classe de se referir a qualquer um desses campos por seu nome simples resultará em um erro em tempo de compilação, porque a referência é ambígua.

Pode haver vários caminhos pelos quais a mesma declaração de campo é herdada de uma interface. Em tal situação, o campo é considerado herdado apenas uma vez, e pode ser referido por seu nome simples sem ambiguidade.

**Exemplo 8.3-1. Campos Multiplamente Herdados**

Uma classe pode herdar dois ou mais campos com o mesmo nome, seja de sua superclasse e uma superinterface ou de duas superinterfaces. Ocorre um erro em tempo de compilação em qualquer tentativa de se referir a qualquer campo ambiguamente herdado por seu nome simples. Um nome qualificado ou uma expressão de acesso a campo que contém a palavra-chave `super` ([§15.11.2](<#/doc/jls/jls-15>)) pode ser usado para acessar tais campos sem ambiguidade. No programa:
```
    interface Frob  { float v = 2.0f; }
    class SuperTest { int   v = 3; }
    class Test extends SuperTest implements Frob {
        public static void main(String[] args) {
            new Test().printV();
        }
        void printV() { System.out.println(v); }
    }

```

a classe `Test` herda dois campos chamados `v`, um de sua superclasse `SuperTest` e outro de sua superinterface `Frob`. Isso por si só é permitido, mas ocorre um erro em tempo de compilação devido ao uso do nome simples `v` no método `printV`: não é possível determinar qual `v` é pretendido.

A seguinte variação usa a expressão de acesso a campo `super.v` para se referir ao campo chamado `v` declarado na classe `SuperTest` e usa o nome qualificado `Frob.v` para se referir ao campo chamado `v` declarado na interface `Frob`:
```
    interface Frob  { float v = 2.0f; }
    class SuperTest { int   v = 3; }
    class Test extends SuperTest implements Frob {
        public static void main(String[] args) {
            new Test().printV();
        }
        void printV() {
            System.out.println((super.v + Frob.v)/2);
        }
    }

```

Ele compila e imprime:
```
    2.5

```

Mesmo que dois campos herdados distintos tenham o mesmo tipo, o mesmo valor e sejam ambos `final`, qualquer referência a qualquer um dos campos por nome simples é considerada ambígua e resulta em um erro em tempo de compilação. No programa:
```
    interface Color        { int RED=0, GREEN=1,  BLUE=2;  }
    interface TrafficLight { int RED=0, YELLOW=1, GREEN=2; }
    class Test implements Color, TrafficLight {
        public static void main(String[] args) {
            System.out.println(GREEN);  // compile-time error
            System.out.println(RED);    // compile-time error
        }
    }

```

não é surpreendente que a referência a `GREEN` deva ser considerada ambígua, porque a classe `Test` herda duas declarações diferentes para `GREEN` com valores diferentes. O objetivo deste exemplo é que a referência a `RED` também é considerada ambígua, porque duas declarações distintas são herdadas. O fato de os dois campos chamados `RED` terem o mesmo tipo e o mesmo valor imutável não afeta este julgamento.

**Exemplo 8.3-2. Re-herança de Campos**

Se a mesma declaração de campo é herdada de uma interface por múltiplos caminhos, o campo é considerado herdado apenas uma vez. Ele pode ser referido por seu nome simples sem ambiguidade. Por exemplo, no código:
```
    interface Colorable {
        int RED = 0xff0000, GREEN = 0x00ff00, BLUE = 0x0000ff;
    }
    interface Paintable extends Colorable {
        int MATTE = 0, GLOSSY = 1;
    }
    class Point { int x, y; }
    class ColoredPoint extends Point implements Colorable {}
    class PaintedPoint extends ColoredPoint implements Paintable {
        int p = RED;
    }

```

os campos `RED`, `GREEN` e `BLUE` são herdados pela classe `PaintedPoint` tanto através de sua superclasse direta `ColoredPoint` quanto através de sua superinterface direta `Paintable`. Os nomes simples `RED`, `GREEN` e `BLUE` podem, no entanto, ser usados sem ambiguidade dentro da classe `PaintedPoint` para se referir aos campos declarados na interface `Colorable`.

### 8.3.1. Modificadores de Campo

ModificadorDeCampo:

(um de)
[Annotation](<#/doc/jls/jls-09>) `public` `protected` `private`
`static` `final` `transient` `volatile`

As regras relativas aos modificadores de anotação para uma declaração de campo são especificadas em [§9.7.4](<#/doc/jls/jls-09>) e [§9.7.5](<#/doc/jls/jls-09>).

É um erro em tempo de compilação se a mesma palavra-chave aparecer mais de uma vez como modificador para uma declaração de campo, ou se uma declaração de campo tiver mais de um dos modificadores de acesso `public`, `protected` e `private` ([§6.6](<#/doc/jls/jls-06>)).

Se dois ou mais modificadores de campo (distintos) aparecerem em uma declaração de campo, é costumeiro, embora não obrigatório, que eles apareçam na ordem consistente com a mostrada acima na produção para _ModificadorDeCampo_.

#### 8.3.1.1. Campos `static`

Se um campo é declarado `static`, existe exatamente uma encarnação do campo, não importa quantas instâncias (possivelmente zero) da classe possam eventualmente ser criadas. Um campo `static`, às vezes chamado de _variável de classe_, é encarnado quando a classe é inicializada ([§12.4](<#/doc/jls/jls-12>)).

Um campo que não é declarado `static` é chamado de _variável de instância_, e às vezes chamado de campo não-`static`. Sempre que uma nova instância de uma classe é criada ([§12.5](<#/doc/jls/jls-12>)), uma nova variável associada a essa instância é criada para cada variável de instância declarada nessa classe ou em qualquer uma de suas superclasses.

A declaração de uma variável de classe introduz um contexto estático ([§8.1.3](<#/doc/jls/jls-08>)), que limita o uso de construções que se referem ao objeto atual. Notavelmente, as palavras-chave `this` e `super` são proibidas em um contexto estático ([§15.8.3](<#/doc/jls/jls-15>), [§15.11.2](<#/doc/jls/jls-15>)), assim como referências não qualificadas a variáveis de instância, métodos de instância e parâmetros de tipo de declarações lexicamente envolventes ([§6.5.5.1](<#/doc/jls/jls-06>), [§6.5.6.1](<#/doc/jls/jls-06>), [§15.12.3](<#/doc/jls/jls-15>)).

Referências a uma variável de instância a partir de um contexto estático ou de uma classe ou interface aninhada são restritas, conforme especificado em [§6.5.6.1](<#/doc/jls/jls-06>).

**Exemplo 8.3.1.1-1. Campos `static`
```
    class Point {
        int x, y, useCount;
        Point(int x, int y) { this.x = x; this.y = y; }
        static final Point origin = new Point(0, 0);
    }
    class Test {
        public static void main(String[] args) {
            Point p = new Point(1,1);
            Point q = new Point(2,2);
            p.x = 3;
            p.y = 3;
            p.useCount++;
            p.origin.useCount++;
            System.out.println("(" + q.x + "," + q.y + ")");
            System.out.println(q.useCount);
            System.out.println(q.origin == Point.origin);
            System.out.println(q.origin.useCount);
        }
    }

```

Este programa imprime:
```
    (2,2)
    0
    true
    1

```

mostrando que a alteração dos campos `x`, `y` e `useCount` de `p` não afeta os campos de `q`, porque esses campos são variáveis de instância em objetos distintos. Neste exemplo, a variável de classe `origin` da classe `Point` é referenciada tanto usando o nome da classe como qualificador, em `Point.origin`, quanto usando variáveis do tipo da classe em expressões de acesso a campo ([§15.11](<#/doc/jls/jls-15>)), como em `p.origin` e `q.origin`. Essas duas formas de acessar a variável de classe `origin` acessam o mesmo objeto, evidenciado pelo fato de que o valor da expressão de igualdade de referência ([§15.21.3](<#/doc/jls/jls-15>)):
```
    q.origin==Point.origin

```

é verdadeiro. Uma evidência adicional é que o incremento:
```
    p.origin.useCount++;

```

faz com que o valor de `q.origin.useCount` seja `1`; isso ocorre porque `p.origin` e `q.origin` se referem à mesma variável.

**Exemplo 8.3.1.1-2. Ocultamento de Variáveis de Classe**
```
    class Point {
        static int x = 2;
    }
    class Test extends Point {
        static double x = 4.7;
        public static void main(String[] args) {
            new Test().printX();
        }
        void printX() {
            System.out.println(x + " " + super.x);
        }
    }

```

Este programa produz a saída:
```
    4.7 2

```

porque a declaração de `x` na classe `Test` oculta a definição de `x` na classe `Point`, então a classe `Test` não herda o campo `x` de sua superclasse `Point`. Dentro da declaração da classe `Test`, o nome simples `x` se refere ao campo declarado dentro da classe `Test`. O código na classe `Test` pode se referir ao campo `x` da classe `Point` como `super.x` (ou, porque `x` é `static`, como `Point.x`). Se a declaração de `Test.x` for excluída:
```
    class Point {
        static int x = 2;
    }
    class Test extends Point {
        public static void main(String[] args) {
            new Test().printX();
        }
        void printX() {
            System.out.println(x + " " + super.x);
        }
    }

```

então o campo `x` da classe `Point` não está mais oculto dentro da classe `Test`; em vez disso, o nome simples `x` agora se refere ao campo `Point.x`. O código na classe `Test` ainda pode se referir a esse mesmo campo como `super.x`. Portanto, a saída deste programa variante é:
```
    2 2

```

**Exemplo 8.3.1.1-3. Ocultamento de Variáveis de Instância**
```
    class Point {
        int x = 2;
    }
    class Test extends Point {
        double x = 4.7;
        void printBoth() {
            System.out.println(x + " " + super.x);
        }
        public static void main(String[] args) {
            Test sample = new Test();
            sample.printBoth();
            System.out.println(sample.x + " " + ((Point)sample).x);
        }
    }

```

Este programa produz a saída:
```
    4.7 2
    4.7 2

```

porque a declaração de `x` na classe `Test` oculta a definição de `x` na classe `Point`, então a classe `Test` não herda o campo `x` de sua superclasse `Point`. Deve-se notar, no entanto, que embora o campo `x` da classe `Point` não seja herdado pela classe `Test`, ele é, no entanto, _implementado_ por instâncias da classe `Test`. Em outras palavras, cada instância da classe `Test` contém dois campos, um do tipo `int` e outro do tipo `double`. Ambos os campos levam o nome `x`, mas dentro da declaração da classe `Test`, o nome simples `x` sempre se refere ao campo declarado dentro da classe `Test`. O código em métodos de instância da classe `Test` pode se referir à variável de instância `x` da classe `Point` como `super.x`.

O código que usa uma expressão de acesso a campo para acessar o campo `x` acessará o campo chamado `x` na classe indicada pelo tipo da expressão de referência. Assim, a expressão `sample.x` acessa um valor `double`, a variável de instância declarada na classe `Test`, porque o tipo da variável `sample` é `Test`, mas a expressão `((Point)sample).x` acessa um valor `int`, a variável de instância declarada na classe `Point`, devido ao cast para o tipo `Point`.

Se a declaração de `x` for excluída da classe `Test`, como no programa:
```
    class Point {
        static int x = 2;
    }
    class Test extends Point {
        void printBoth() {
            System.out.println(x + " " + super.x);
        }
        public static void main(String[] args) {
            Test sample = new Test();
            sample.printBoth();
            System.out.println(sample.x + " " + ((Point)sample).x);
        }
    }

```

então o campo `x` da classe `Point` não está mais oculto dentro da classe `Test`. Dentro dos métodos de instância na declaração da classe `Test`, o nome simples `x` agora se refere ao campo declarado dentro da classe `Point`. O código na classe `Test` ainda pode se referir a esse mesmo campo como `super.x`. A expressão `sample.x` ainda se refere ao campo `x` dentro do tipo `Test`, mas esse campo agora é um campo herdado, e assim se refere ao campo `x` declarado na classe `Point`. A saída deste programa variante é:
```
    2 2
    2 2

```

#### 8.3.1.2. Campos `final`

Um campo pode ser declarado `final` ([§4.12.4](<#/doc/jls/jls-04>)). Tanto variáveis de classe quanto de instância (campos `static` e não-`static`) podem ser declaradas `final`.

Uma variável de classe `final` em branco deve ser definitivamente atribuída por um inicializador estático da classe na qual é declarada, ou ocorre um erro em tempo de compilação ([§8.7](<#/doc/jls/jls-08>), [§16.8](<#/doc/jls/jls-16>)).

Uma variável de instância `final` em branco deve ser definitivamente atribuída e, além disso, não definitivamente não atribuída ao final de cada construtor da classe na qual é declarada, ou ocorre um erro em tempo de compilação ([§8.8](<#/doc/jls/jls-08>), [§16.9](<#/doc/jls/jls-16>)).

#### 8.3.1.3. Campos `transient`

Variáveis podem ser marcadas como `transient` para indicar que não fazem parte do estado persistente de um objeto.

**Exemplo 8.3.1.3-1. Persistência de Campos `transient`

Se uma instância da classe `Point`:
```

    class Point {
        int x, y;
        transient float rho, theta;
    }


```

fosse salva em armazenamento persistente por um serviço de sistema, então apenas os campos `x` e `y` seriam salvos. Esta especificação não detalha tais serviços; veja a especificação de `java.io.Serializable` para um exemplo de tal serviço.

#### 8.3.1.4. Campos `volatile`

A linguagem de programação Java permite que threads acessem variáveis compartilhadas ([§17.1](<#/doc/jls/jls-17>)). Como regra, para garantir que as variáveis compartilhadas sejam atualizadas de forma consistente e confiável, uma thread deve garantir que tenha uso exclusivo de tais variáveis obtendo um bloqueio que, convencionalmente, impõe exclusão mútua para essas variáveis compartilhadas.

A linguagem de programação Java fornece um segundo mecanismo, campos `volatile`, que é mais conveniente do que o bloqueio para alguns propósitos.

Um campo pode ser declarado `volatile`, caso em que o Modelo de Memória Java garante que todas as threads vejam um valor consistente para a variável ([§17.4](<#/doc/jls/jls-17>)).

É um erro em tempo de compilação se uma variável `final` também for declarada `volatile`.

**Exemplo 8.3.1.4-1. Campos `volatile`

Se, no exemplo a seguir, uma thread chamar repetidamente o método `one` (mas não mais do que `Integer.MAX_VALUE` vezes no total), e outra thread chamar repetidamente o método `two`:
```
    class Test {
        static int i = 0, j = 0;
        static void one() { i++; j++; }
        static void two() {
            System.out.println("i=" + i + " j=" + j);
        }
    }

```

então o método `two` poderia ocasionalmente imprimir um valor para `j` que é maior que o valor de `i`, porque o exemplo não inclui sincronização e, sob as regras explicadas em [§17.4](<#/doc/jls/jls-17>), os valores compartilhados de `i` e `j` podem ser atualizados fora de ordem.

Uma maneira de evitar esse comportamento fora de ordem seria declarar os métodos `one` e `two` como `synchronized` ([§8.4.3.6](<#/doc/jls/jls-08>)):
```
    class Test {
        static int i = 0, j = 0;
        static synchronized void one() { i++; j++; }
        static synchronized void two() {
            System.out.println("i=" + i + " j=" + j);
        }
    }

```

Isso impede que o método `one` e o método `two` sejam executados concorrentemente, e ainda garante que os valores compartilhados de `i` e `j` sejam ambos atualizados antes que o método `one` retorne. Portanto, o método `two` nunca observa um valor para `j` maior do que para `i`; de fato, ele sempre observa o mesmo valor para `i` e `j`.
Outra abordagem seria declarar `i` e `j` como `volatile`:
```java
    class Test {
        static volatile int i = 0, j = 0;
        static void one() { i++; j++; }
        static void two() {
            System.out.println("i=" + i + " j=" + j);
        }
    }
    
```

Isso permite que o método `one` e o método `two` sejam executados concorrentemente, mas garante que os acessos aos valores compartilhados para `i` e `j` ocorram exatamente o mesmo número de vezes, e exatamente na mesma ordem, como parecem ocorrer durante a execução do texto do programa por cada thread. Portanto, o valor compartilhado para `j` nunca é maior do que o de `i`, porque cada atualização de `i` deve ser refletida no valor compartilhado para `i` antes que a atualização de `j` ocorra. É possível, no entanto, que qualquer invocação dada do método `two` possa observar um valor para `j` que é muito maior do que o valor observado para `i`, porque o método `one` pode ser executado muitas vezes entre o momento em que o método `two` busca o valor de `i` e o momento em que o método `two` busca o valor de `j`.

Veja [§17.4](<#/doc/jls/jls-17>) para mais discussão e exemplos.

### 8.3.2. Inicialização de Campo

Se um declarador em uma declaração de campo possui um _inicializador de variável_, então o declarador tem a semântica de uma atribuição ([§15.26](<#/doc/jls/jls-15>)) à variável declarada.

Se o declarador é para uma variável de classe (ou seja, um campo `static`) ([§8.3.1.1](<#/doc/jls/jls-08>)), então as seguintes regras se aplicam ao seu inicializador:

  * O inicializador não pode se referir ao objeto atual usando a palavra-chave `this` ou a palavra-chave `super`, conforme especificado em [§15.8.3](<#/doc/jls/jls-15>) e [§15.11.2](<#/doc/jls/jls-15>), nem se referir por nome simples a qualquer variável de instância ou método de instância, conforme especificado em [§6.5.6.1](<#/doc/jls/jls-06>) e [§15.12.3](<#/doc/jls/jls-15>).

  * Em tempo de execução, o inicializador é avaliado e a atribuição é realizada exatamente uma vez, quando a classe é inicializada ([§12.4.2](<#/doc/jls/jls-12>)).

Note que campos `static` que são variáveis constantes ([§4.12.4](<#/doc/jls/jls-04>)) são inicializados antes de outros campos `static` ([§12.4.2](<#/doc/jls/jls-12>), passo 6). Isso também se aplica em interfaces ([§9.3.1](<#/doc/jls/jls-09>)). Quando tais campos são referenciados por nome simples, eles nunca serão observados com seus valores iniciais padrão ([§4.12.5](<#/doc/jls/jls-04>)).

Se o declarador é para uma variável de instância (ou seja, um campo que não é `static`), então as seguintes regras se aplicam ao seu inicializador:

  * O inicializador pode se referir ao objeto atual usando a palavra-chave `this` ou a palavra-chave `super`, e pode se referir por nome simples a qualquer variável de classe declarada ou herdada pela classe, mesmo uma cuja declaração ocorra à direita do inicializador ([§3.5](<#/doc/jls/jls-03>)).

  * Em tempo de execução, o inicializador é avaliado e a atribuição é realizada cada vez que uma instância da classe é criada ([§12.5](<#/doc/jls/jls-12>)).

Referências de inicializadores de variáveis a campos que podem ainda não ter sido inicializados são restritas, conforme especificado em [§8.3.3](<#/doc/jls/jls-08>) e [§16 (_Atribuição Definida_)](<#/doc/jls/jls-16>).

A verificação de exceções para um inicializador de variável em uma declaração de campo é especificada em [§11.2.3](<#/doc/jls/jls-11>).

Inicializadores de variáveis também são usados em declarações de variáveis locais ([§14.4](<#/doc/jls/jls-14>)), onde o inicializador é avaliado e a atribuição é realizada cada vez que a declaração de variável local é executada.

**Exemplo 8.3.2-1. Inicialização de Campo**
```java 
    class Point {
        int x = 1, y = 5;
    }
    class Test {
        public static void main(String[] args) {
            Point p = new Point();
            System.out.println(p.x + ", " + p.y);
        }
    }
    
```

Este programa produz a saída:
```
    1, 5
    
```

porque as atribuições a `x` e `y` ocorrem sempre que um novo `Point` é criado.

**Exemplo 8.3.2-2. Referência Antecipada a uma Variável de Classe**
```java 
    class Test {
        float f = j;
        static int j = 1;
    }
    
```

Este programa compila sem erro; ele inicializa `j` para `1` quando a classe `Test` é inicializada, e inicializa `f` para o valor atual de `j` toda vez que uma instância da classe `Test` é criada.

### 8.3.3. Restrições em Referências de Campo em Inicializadores

Referências a um campo são por vezes restritas, mesmo que o campo esteja no escopo. As seguintes regras restringem referências antecipadas a um campo (onde o uso precede textualmente a declaração do campo), bem como autorreferência (onde o campo é usado em seu próprio inicializador).

Para uma referência por nome simples a uma variável de classe `f` declarada na classe ou interface C, é um erro em tempo de compilação se:

  * A referência aparece em um inicializador de variável de classe de C ou em um inicializador estático de C ([§8.7](<#/doc/jls/jls-08>)); e

  * A referência aparece no inicializador do próprio declarador de `f` ou em um ponto à esquerda do declarador de `f`; e

  * A referência _não_ está no lado esquerdo de uma expressão de atribuição ([§15.26](<#/doc/jls/jls-15>)); e

  * A classe ou interface mais interna que envolve a referência é C.

Para uma referência por nome simples a uma variável de instância `f` declarada na classe C, é um erro em tempo de compilação se:

  * A referência aparece em um inicializador de variável de instância de C ou em um inicializador de instância de C ([§8.6](<#/doc/jls/jls-08>)); e

  * A referência aparece no inicializador do próprio declarador de `f` ou em um ponto à esquerda do declarador de `f`; e

  * A referência _não_ está no lado esquerdo de uma expressão de atribuição ([§15.26](<#/doc/jls/jls-15>)); e

  * A classe mais interna que envolve a referência é C.

**Exemplo 8.3.3-1. Restrições em Referências de Campo**

Ocorre um erro em tempo de compilação para este programa:
```java
    class Test1 {
        int i = j;  // compile-time error:
                    // incorrect forward reference
        int j = 1;
    }
    
```

enquanto o seguinte programa compila sem erro:
```java
    class Test2 {
        Test2() { k = 2; }
        int j = 1;
        int i = j;
        int k;
    }
    
```

mesmo que o construtor para `Test2` ([§8.8](<#/doc/jls/jls-08>)) se refira ao campo `k` que é declarado três linhas depois.

As restrições acima são projetadas para capturar, em tempo de compilação, inicializações circulares ou malformadas. Assim, ambos:
```java
    class Z {
        static int i = j + 2;
        static int j = 4;
    }
    
```

e:
```java
    class Z {
        static { i = j + 2; }
        static int i, j;
        static { j = 4; }
    }
    
```

resultam em erros em tempo de compilação. Acessos por métodos não são verificados dessa forma, então:
```java
    class Z {
        static int peek() { return j; }
        static int i = peek();
        static int j = 1;
    }
    class Test {
        public static void main(String[] args) {
            System.out.println(Z.i);
        }
    }
    
```

produz a saída:
```
    0
    
```

porque o inicializador de variável para `i` usa o método de classe `peek` para acessar o valor da variável `j` antes que `j` tenha sido inicializado por seu inicializador de variável, momento em que ainda possui seu valor padrão ([§4.12.5](<#/doc/jls/jls-04>)).

Um exemplo mais elaborado é:
```java
    class UseBeforeDeclaration {
        static {
            x = 100;
              // ok - assignment
            int y = x + 1;
              // error - read before declaration
            int v = x = 3;
              // ok - x at left hand side of assignment
            int z = UseBeforeDeclaration.x * 2;
              // ok - not accessed via simple name
    
            Object o = new Object() {
                void foo() { x++; }
                  // ok - occurs in a different class
                { x++; }
                  // ok - occurs in a different class
            };
        }
    
        {
            j = 200;
              // ok - assignment
            j = j + 1;
              // error - right hand side reads before declaration
            int k = j = j + 1;
              // error - illegal forward reference to j
            int n = j = 300;
              // ok - j at left hand side of assignment
            int h = j++;
              // error - read before declaration
            int l = this.j * 3;
              // ok - not accessed via simple name
    
            Object o = new Object() {
                void foo(){ j++; }
                  // ok - occurs in a different class
                { j = j + 1; }
                  // ok - occurs in a different class
            };
        }
    
        int w = x = 3;
          // ok - x at left hand side of assignment
        int p = x;
          // ok - instance initializers may access static fields
    
        static int u =
            (new Object() { int bar() { return x; } }).bar();
            // ok - occurs in a different class
    
        static int x;
    
        int m = j = 4;
          // ok - j at left hand side of assignment
        int o =
            (new Object() { int bar() { return j; } }).bar();
            // ok - occurs in a different class
        int j;
    }
    
```

## 8.4. Declarações de Método

Um _método_ declara código executável que pode ser invocado, passando um número fixo de valores como argumentos.

MethodDeclaration:

{[MethodModifier](<#/doc/jls/jls-08>)} [MethodHeader](<#/doc/jls/jls-08>) [MethodBody](<#/doc/jls/jls-08>)

MethodHeader:

[Result](<#/doc/jls/jls-08>) [MethodDeclarator](<#/doc/jls/jls-08>) [[Throws](<#/doc/jls/jls-08>)]   
[TypeParameters](<#/doc/jls/jls-08>) {[Annotation](<#/doc/jls/jls-09>)} [Result](<#/doc/jls/jls-08>) [MethodDeclarator](<#/doc/jls/jls-08>) [[Throws](<#/doc/jls/jls-08>)] 

MethodDeclarator:

[Identifier](<#/doc/jls/jls-03>) `(` [[ReceiverParameter](<#/doc/jls/jls-08>) `,`] [[FormalParameterList](<#/doc/jls/jls-08>)] `)` [[Dims](<#/doc/jls/jls-04>)] 

ReceiverParameter:

{[Annotation](<#/doc/jls/jls-09>)} [UnannType](<#/doc/jls/jls-08>) [[Identifier](<#/doc/jls/jls-03>) `.`] `this`

A seguinte produção de [§4.3](<#/doc/jls/jls-04>) é mostrada aqui para conveniência:

Dims:

{[Annotation](<#/doc/jls/jls-09>)} `[` `]` {{[Annotation](<#/doc/jls/jls-09>)} `[` `]`} 

A cláusula _FormalParameterList_ é descrita em [§8.4.1](<#/doc/jls/jls-08>), a cláusula _MethodModifier_ em [§8.4.3](<#/doc/jls/jls-08>), a cláusula _TypeParameters_ em [§8.4.4](<#/doc/jls/jls-08>), a cláusula _Result_ em [§8.4.5](<#/doc/jls/jls-08>), a cláusula _Throws_ em [§8.4.6](<#/doc/jls/jls-08>), e o _MethodBody_ em [§8.4.7](<#/doc/jls/jls-08>).

O _Identifier_ em um _MethodDeclarator_ pode ser usado em um nome para se referir ao método ([§6.5.7.1](<#/doc/jls/jls-06>), [§15.12](<#/doc/jls/jls-15>)).

O escopo e o sombreamento de uma declaração de método são especificados em [§6.3](<#/doc/jls/jls-06>) e [§6.4.1](<#/doc/jls/jls-06>).

O _parâmetro receptor_ é um dispositivo sintático opcional para um método de instância ou um construtor de classe interna. Para um método de instância, o parâmetro receptor representa o objeto para o qual o método é invocado. Para um construtor de classe interna, o parâmetro receptor representa a instância imediatamente envolvente do objeto recém-construído. Em ambos os casos, o parâmetro receptor existe unicamente para permitir que o tipo do objeto representado seja denotado no código-fonte, para que o tipo possa ser anotado ([§9.7.4](<#/doc/jls/jls-09>)). O parâmetro receptor não é um parâmetro formal; mais precisamente, não é uma declaração de qualquer tipo de variável ([§4.12.3](<#/doc/jls/jls-04>)), nunca é vinculado a nenhum valor passado como argumento em uma expressão de invocação de método ou expressão de criação de instância de classe, e não tem efeito algum em tempo de execução.

Um parâmetro receptor pode aparecer tanto no _MethodDeclarator_ de um método de instância quanto no _ConstructorDeclarator_ de um construtor de uma classe interna onde a classe interna não é declarada em um contexto estático ([§8.1.3](<#/doc/jls/jls-08>)). Se um parâmetro receptor aparece em qualquer outro tipo de método ou construtor, então ocorre um erro em tempo de compilação.

O tipo e o nome de um parâmetro receptor são restringidos da seguinte forma:

  * Em um método de instância, o tipo do parâmetro receptor deve ser a classe ou interface na qual o método é declarado, e o nome do parâmetro receptor deve ser `this`; caso contrário, ocorre um erro em tempo de compilação.

  * Em um construtor de classe interna, o tipo do parâmetro receptor deve ser a classe ou interface que é a declaração de tipo imediatamente envolvente da classe interna, e o nome do parâmetro receptor deve ser _Identifier_ `.` `this` onde _Identifier_ é o nome simples da classe ou interface que é a declaração de tipo imediatamente envolvente da classe interna; caso contrário, ocorre um erro em tempo de compilação.

É um erro em tempo de compilação para o corpo de uma declaração de classe declarar como membros dois métodos com assinaturas equivalentes para sobrescrita ([§8.4.2](<#/doc/jls/jls-08>)).

A declaração de um método que retorna um array permite colocar alguns ou todos os pares de colchetes que denotam o tipo de array após a lista de parâmetros formais. Esta sintaxe é suportada para compatibilidade com versões anteriores da linguagem de programação Java. É fortemente recomendado que esta sintaxe não seja usada em código novo.

### 8.4.1. Parâmetros Formais

Os _parâmetros formais_ de um método ou construtor, se houver, são especificados por uma lista de especificadores de parâmetro separados por vírgulas. Cada especificador de parâmetro consiste em um tipo (opcionalmente precedido pelo modificador `final` e/ou uma ou mais anotações) e um identificador (opcionalmente seguido por colchetes) que especifica o nome do parâmetro.

Se um método ou construtor não possui parâmetros formais, e nenhum parâmetro receptor, então um par vazio de parênteses aparece na declaração do método ou construtor.

FormalParameterList:

[FormalParameter](<#/doc/jls/jls-08>) {`,` [FormalParameter](<#/doc/jls/jls-08>)} 

FormalParameter:

{[VariableModifier](<#/doc/jls/jls-08>)} [UnannType](<#/doc/jls/jls-08>) [VariableDeclaratorId](<#/doc/jls/jls-08>)   
[VariableArityParameter](<#/doc/jls/jls-08>)

VariableArityParameter:

{[VariableModifier](<#/doc/jls/jls-08>)} [UnannType](<#/doc/jls/jls-08>) {[Annotation](<#/doc/jls/jls-09>)} `...` [Identifier](<#/doc/jls/jls-03>)

VariableModifier:

[Annotation](<#/doc/jls/jls-09>)   
`final`

As seguintes produções de [§8.3](<#/doc/jls/jls-08>) e [§4.3](<#/doc/jls/jls-04>) são mostradas aqui para conveniência:

VariableDeclaratorId:

[Identifier](<#/doc/jls/jls-03>) [[Dims](<#/doc/jls/jls-04>)]   
`_`

Dims:

{[Annotation](<#/doc/jls/jls-09>)} `[` `]` {{[Annotation](<#/doc/jls/jls-09>)} `[` `]`} 

Um parâmetro formal de um método ou construtor pode ser um _parâmetro de aridade variável_, indicado por uma elipse após o tipo. No máximo um parâmetro de aridade variável é permitido para um método ou construtor. É um erro em tempo de compilação se um parâmetro de aridade variável aparece em qualquer lugar na lista de especificadores de parâmetro, exceto na última posição.

Na gramática para _VariableArityParameter_, note que a elipse (`...`) é um token por si só ([§3.11](<#/doc/jls/jls-03>)). É possível colocar espaço em branco entre ela e o tipo, mas isso é desencorajado por uma questão de estilo.

Se o último parâmetro formal de um método é um parâmetro de aridade variável, o método é um _método de aridade variável_. Caso contrário, é um _método de aridade fixa_.

As regras relativas aos modificadores de anotação para uma declaração de parâmetro formal e para um parâmetro receptor são especificadas em [§9.7.4](<#/doc/jls/jls-09>) e [§9.7.5](<#/doc/jls/jls-09>).

É um erro em tempo de compilação se `final` aparece mais de uma vez como um modificador para uma declaração de parâmetro formal.

O escopo e o sombreamento de um parâmetro formal são especificados em [§6.3](<#/doc/jls/jls-06>) e [§6.4](<#/doc/jls/jls-06>).

Referências a um parâmetro formal de uma classe ou interface aninhada, ou uma expressão lambda, são restritas, conforme especificado em [§6.5.6.1](<#/doc/jls/jls-06>).

Toda declaração de um parâmetro formal de um método ou construtor deve incluir um _Identifier_, caso contrário, ocorre um erro em tempo de compilação.

É um erro em tempo de compilação para um método ou construtor declarar dois parâmetros formais com o mesmo nome. (Ou seja, suas declarações mencionam o mesmo _Identifier_.)

É um erro em tempo de compilação se um parâmetro formal que é declarado `final` for atribuído dentro do corpo do método ou construtor.

O tipo declarado de um parâmetro formal depende se ele é um parâmetro de aridade variável:

  * Se o parâmetro formal não é um parâmetro de aridade variável, então o tipo declarado é denotado por _UnannType_ se nenhum par de colchetes aparece em _UnannType_ e _VariableDeclaratorId_, e especificado por [§10.2](<#/doc/jls/jls-10>) caso contrário.

  * Se o parâmetro formal é um parâmetro de aridade variável, então o tipo declarado é um tipo de array especificado por [§10.2](<#/doc/jls/jls-10>).

Se o tipo declarado de um parâmetro de aridade variável tem um tipo de elemento não reificável ([§4.7](<#/doc/jls/jls-04>)), então um aviso não verificado em tempo de compilação ocorre para a declaração do método de aridade variável, a menos que o método seja anotado com `@SafeVarargs` ([§9.6.4.7](<#/doc/jls/jls-09>)) ou o aviso seja suprimido por `@SuppressWarnings` ([§9.6.4.5](<#/doc/jls/jls-09>)).

Quando o método ou construtor é invocado ([§15.12](<#/doc/jls/jls-15>)), os valores das expressões de argumento reais inicializam variáveis de parâmetro recém-criadas, cada uma do tipo declarado, antes da execução do corpo do método ou construtor. O _Identifier_ que aparece no _FormalParameter_ pode ser usado como um nome simples no corpo do método ou construtor para se referir ao parâmetro formal.

Invocações de um método de aridade variável podem conter mais expressões de argumento reais do que parâmetros formais. Todas as expressões de argumento reais que não correspondem aos parâmetros formais que precedem o parâmetro de aridade variável serão avaliadas e os resultados armazenados em um array que será passado para a invocação do método ([§15.12.4.2](<#/doc/jls/jls-15>)).

Aqui estão alguns exemplos de parâmetros receptores em métodos de instância e construtores de classes internas:
```java
    
    class Test {
        Test(/* ?? ?? */) {}
          // No receiver parameter is permitted in the constructor of
          // a top level class, as there is no conceivable type or name.
    
        void m(Test this) {}
          // OK: receiver parameter in an instance method
    
        static void n(Test this) {}
          // Illegal: receiver parameter in a static method
    
        class A {
            A(Test Test.this) {}
              // OK: the receiver parameter represents the instance
              // of Test which immediately encloses the instance
              // of A being constructed.
    
            void m(A this) {}
              // OK: the receiver parameter represents the instance
              // of A for which A.m() is invoked.
    
            class B {
                B(Test.A A.this) {}
                  // OK: the receiver parameter represents the instance
                  // of A which immediately encloses the instance of B
                  // being constructed.
    
                void m(Test.A.B this) {}
                  // OK: the receiver parameter represents the instance
                  // of B for which B.m() is invoked.
            }
        }
    }
    
    
```

O construtor e o método de instância de `B` mostram que o tipo do parâmetro receptor pode ser denotado com um _TypeName_ qualificado como qualquer outro tipo; mas que o nome do parâmetro receptor em um construtor de classe interna deve usar o nome simples da classe envolvente.

### 8.4.2. Assinatura de Método

Dois métodos ou construtores, `M` e `N`, têm a _mesma assinatura_ se eles têm o mesmo nome, os mesmos parâmetros de tipo (se houver) ([§8.4.4](<#/doc/jls/jls-08>)), e, após adaptar os tipos de parâmetros formais de `N` aos parâmetros de tipo de `M`, os mesmos tipos de parâmetros formais.

A assinatura de um método `m1` é uma _subassinatura_ da assinatura de um método `m2` se:

  * `m2` tem a mesma assinatura que `m1`, ou

  * a assinatura de `m1` é a mesma que a apagamento ([§4.6](<#/doc/jls/jls-04>)) da assinatura de `m2`.

Duas assinaturas de método `m1` e `m2` são _equivalentes para sobrescrita_ se `m1` é uma subassinatura de `m2` ou `m2` é uma subassinatura de `m1`.

É um erro em tempo de compilação declarar dois métodos com assinaturas equivalentes para sobrescrita em uma classe.

**Exemplo 8.4.2-1. Assinaturas Equivalentes para Sobrescrita**
```java 
    class Point {
        int x, y;
        abstract void move(int dx, int dy);
        void move(int dx, int dy) { x += dx; y += dy; }
    }
    
```

Este programa causa um erro em tempo de compilação porque declara dois métodos `move` com a mesma assinatura (e, portanto, equivalente para sobrescrita). Isso é um erro mesmo que uma das declarações seja `abstract`.

A noção de subassinatura é projetada para expressar uma relação entre dois métodos cujas assinaturas não são idênticas, mas nos quais um pode sobrescrever o outro. Especificamente, ela permite que um método cuja assinatura não usa tipos genéricos sobrescreva qualquer versão generificada desse método. Isso é importante para que os designers de bibliotecas possam generificar métodos livremente, independentemente dos clientes que definem subclasses ou subinterfaces da biblioteca.

Considere o exemplo:
```java
    
    class CollectionConverter {
        List toList(Collection c) {...}
    }
    class Overrider extends CollectionConverter {
        List toList(Collection c) {...}
    }
    
    
```

Agora, suponha que este código foi escrito antes da introdução de genéricos, e agora o autor da classe `CollectionConverter` decide generificar o código, assim:
```java
    
    class CollectionConverter {
        <T> List<T> toList(Collection<T> c) {...}
    }
    
    
```

Sem uma dispensa especial, `Overrider.toList` não sobrescreveria mais `CollectionConverter.toList`. Em vez disso, o código seria ilegal. Isso inibiria significativamente o uso de genéricos, já que os desenvolvedores de bibliotecas hesitariam em migrar o código existente.

### 8.4.3. Modificadores de Método

MethodModifier:

(um de)   
[Annotation](<#/doc/jls/jls-09>) `public` `protected` `private`   
`abstract` `static` `final` `synchronized` `native` `strictfp`

As regras relativas aos modificadores de anotação para uma declaração de método são especificadas em [§9.7.4](<#/doc/jls/jls-09>) e [§9.7.5](<#/doc/jls/jls-09>).

É um erro em tempo de compilação se a mesma palavra-chave aparece mais de uma vez como um modificador para uma declaração de método, ou se uma declaração de método tem mais de um dos modificadores de acesso `public`, `protected` e `private` ([§6.6](<#/doc/jls/jls-06>)).

É um erro em tempo de compilação se uma declaração de método que contém a palavra-chave `abstract` também contém qualquer uma das palavras-chave `private`, `static`, `final`, `native`, `strictfp` ou `synchronized`.

É um erro em tempo de compilação se uma declaração de método que contém a palavra-chave `native` também contém `strictfp`.

Se dois ou mais modificadores de método (distintos) aparecem em uma declaração de método, é costumeiro, embora não obrigatório, que eles apareçam na ordem consistente com a mostrada acima na produção para _MethodModifier_.

#### 8.4.3.1. Métodos `abstract`

Uma declaração de método `abstract` introduz o método como um membro, fornecendo sua assinatura ([§8.4.2](<#/doc/jls/jls-08>)), resultado ([§8.4.5](<#/doc/jls/jls-08>)), e cláusula `throws` se houver ([§8.4.6](<#/doc/jls/jls-08>)), mas não fornece uma implementação ([§8.4.7](<#/doc/jls/jls-08>)). Um método que não é `abstract` pode ser referido como um método _concreto_.

A declaração de um método `abstract` `m` deve aparecer diretamente dentro de uma classe `abstract` (chame-a de A), a menos que ocorra dentro de uma declaração enum ([§8.9](<#/doc/jls/jls-08>)); caso contrário, ocorre um erro em tempo de compilação.

Toda subclasse de A que não é `abstract` ([§8.1.1.1](<#/doc/jls/jls-08>)) deve fornecer uma implementação para `m`, ou ocorre um erro em tempo de compilação.

Uma classe `abstract` pode sobrescrever um método `abstract` fornecendo outra declaração de método `abstract`.

Isso pode fornecer um local para colocar um comentário de documentação, para refinar o tipo de retorno, ou para declarar que o conjunto de exceções verificadas que podem ser lançadas por esse método, quando implementado por suas subclasses, deve ser mais limitado.

Um método de instância que não é `abstract` pode ser sobrescrito por um método `abstract`.

**Exemplo 8.4.3.1-1. Sobrescrita de Método Abstrato/Abstrato**
```java 
    class BufferEmpty extends Exception {
        BufferEmpty() { super(); }
        BufferEmpty(String s) { super(s); }
    }
    class BufferError extends Exception {
        BufferError() { super(); }
        BufferError(String s) { super(s); }
    }
    interface Buffer {
        char get() throws BufferEmpty, BufferError;
    }
    abstract class InfiniteBuffer implements Buffer {
        public abstract char get() throws BufferError;
    }
    
```

A declaração de sobrescrita do método `get` na classe `InfiniteBuffer` afirma que o método `get` em qualquer subclasse de `InfiniteBuffer` nunca lança uma exceção `BufferEmpty`, supostamente porque ele gera os dados no buffer, e assim nunca pode ficar sem dados.

**Exemplo 8.4.3.1-2. Sobrescrita Abstrata/Não Abstrata**

Podemos declarar uma classe `abstract` `Point` que exige que suas subclasses implementem `toString` se elas forem classes completas e instanciáveis:
```java
    abstract class Point {
        int x, y;
        public abstract String toString();
    }
    
```

Esta declaração `abstract` de `toString` sobrescreve o método `toString` não `abstract` da classe `Object`. (`Object` é a superclasse direta implícita da classe `Point`.) Adicionando o código:
```java
    class ColoredPoint extends Point {
        int color;
        public String toString() {
            return super.toString() + ": color " + color;  // error
        }
    }
    
```

resulta em um erro em tempo de compilação porque a invocação `super.toString()` se refere ao método `toString` na classe `Point`, que é `abstract` e, portanto, não pode ser invocado. O método `toString` da classe `Object` pode ser disponibilizado para a classe `ColoredPoint` somente se a classe `Point` o tornar explicitamente disponível através de algum outro método, como em:
```java
    abstract class Point {
        int x, y;
        public abstract String toString();
        protected String objString() { return super.toString(); }
    }
    class ColoredPoint extends Point {
        int color;
        public String toString() {
            return objString() + ": color " + color;  // correct
        }
    }
    
```

#### 8.4.3.2. Métodos `static`

Um método que é declarado `static` é chamado de _método de classe_.

Um método de classe é sempre invocado sem referência a um objeto particular. A declaração de um método de classe introduz um contexto estático ([§8.1.3](<#/doc/jls/jls-08>)), que limita o uso de construções que se referem ao objeto atual. Notavelmente, as palavras-chave `this` e `super` são proibidas em um contexto estático ([§15.8.3](<#/doc/jls/jls-15>), [§15.11.2](<#/doc/jls/jls-15>)), assim como referências não qualificadas a variáveis de instância, métodos de instância e parâmetros de tipo de declarações lexicamente envolventes ([§6.5.5.1](<#/doc/jls/jls-06>), [§6.5.6.1](<#/doc/jls/jls-06>), [§15.12.3](<#/doc/jls/jls-15>)).

Um método que não é declarado `static` é chamado de _método de instância_, e às vezes chamado de método não `static`.

Um método de instância é sempre invocado em relação a um objeto, que se torna o objeto atual ao qual as palavras-chave `this` e `super` se referem durante a execução do corpo do método.

Referências a um método de instância de um contexto estático ou de uma classe ou interface aninhada são restritas, conforme especificado em [§15.12.3](<#/doc/jls/jls-15>).

#### 8.4.3.3. Métodos `final`

Um método pode ser declarado `final` para impedir que subclasses o sobrescrevam ou o ocultem.

É um erro em tempo de compilação tentar sobrescrever ou ocultar um método `final`.

Um método `private` e todos os métodos declarados imediatamente dentro de uma classe `final` ([§8.1.1.2](<#/doc/jls/jls-08>)) se comportam como se fossem `final`, já que é impossível sobrescrevê-los.

Em tempo de execução, um gerador de código de máquina ou otimizador pode "inline" o corpo de um método `final`, substituindo uma invocação do método pelo código em seu corpo. O processo de inlining deve preservar a semântica da invocação do método. Em particular, se o alvo de uma invocação de método de instância for `null`, então uma `NullPointerException` deve ser lançada mesmo que o método seja inlined. Um compilador Java deve garantir que a exceção será lançada no ponto correto, para que os argumentos reais do método sejam vistos como tendo sido avaliados na ordem correta antes da invocação do método.
Considere o exemplo:
```java
    final class Point {
        int x, y;
        void move(int dx, int dy) { x += dx; y += dy; }
    }
    class Test {
        public static void main(String[] args) {
            Point[] p = new Point[100];
            for (int i = 0; i < p.length; i++) {
                p[i] = new Point();
                p[i].move(i, p.length-1-i);
            }
        }
    }
    
```

O inlining do método `move` da classe `Point` no método `main` transformaria o loop `for` para a forma:
```java
    
        for (int i = 0; i < p.length; i++) {
            p[i] = new Point();
            Point pi = p[i];
            int j = p.length-1-i;
            pi.x += i;
            pi.y += j;
        }
    
    
```

O loop poderia então estar sujeito a otimizações adicionais.

Tal inlining não pode ser feito em tempo de compilação a menos que possa ser garantido que `Test` e `Point` serão sempre recompilados juntos, de modo que sempre que `Point` - e especificamente seu método `move` - mudar, o código para `Test.main` também será atualizado.

#### 8.4.3.4. `native` Methods

Um método que é `native` é implementado em código dependente da plataforma, tipicamente escrito em outra linguagem de programação como C. O corpo de um método `native` é dado apenas como um ponto e vírgula, indicando que a implementação é omitida, em vez de um block ([§8.4.7](<#/doc/jls/jls-08>)).

Por exemplo, a classe `RandomAccessFile` do pacote `java.io` pode declarar os seguintes métodos `native`:
```java
    
    package java.io;
    public class RandomAccessFile
        implements DataOutput, DataInput {
        . . .
        public native void open(String name, boolean writeable)
            throws IOException;
        public native int readBytes(byte[] b, int off, int len)
            throws IOException;
        public native void writeBytes(byte[] b, int off, int len)
            throws IOException;
        public native long getFilePointer() throws IOException;
        public native void seek(long pos) throws IOException;
        public native long length() throws IOException;
        public native void close() throws IOException;
    }
    
    
```

#### 8.4.3.5. `strictfp` Methods

O modificador `strictfp` em uma declaração de método é obsoleto e não deve ser usado em código novo. Sua presença ou ausência não tem efeito em tempo de execução.

#### 8.4.3.6. `synchronized` Methods

Um método `synchronized` adquire um monitor ([§17.1](<#/doc/jls/jls-17>)) antes de ser executado.

Para um método de classe (`static`), o monitor associado ao objeto `Class` da classe do método é usado.

Para um instance method, o monitor associado a `this` (o objeto para o qual o método foi invocado) é usado.

**Example 8.4.3.6-1. `synchronized` Monitors**

Estes são os mesmos monitores que podem ser usados pela instrução `synchronized` ([§14.19](<#/doc/jls/jls-14>)).

Assim, o código:
```java
    class Test {
        int count;
        synchronized void bump() {
            count++;
        }
        static int classCount;
        static synchronized void classBump() {
            classCount++;
        }
    }
    
```

tem exatamente o mesmo efeito que:
```java
    class BumpTest {
        int count;
        void bump() {
            synchronized (this) { count++; }
        }
        static int classCount;
        static void classBump() {
            try {
                synchronized (Class.forName("BumpTest")) {
                    classCount++;
                }
            } catch (ClassNotFoundException e) {}
        }
    }
    
```

**Example 8.4.3.6-2. `synchronized` Methods**
```java
    public class Box {
        private Object boxContents;
        public synchronized Object get() {
            Object contents = boxContents;
            boxContents = null;
            return contents;
        }
        public synchronized boolean put(Object contents) {
            if (boxContents != null) return false;
            boxContents = contents;
            return true;
        }
    }
    
```

Este programa define uma classe que é projetada para uso concorrente. Cada instância da classe `Box` possui uma variável de instância `boxContents` que pode conter uma referência para qualquer objeto. Você pode colocar um objeto em uma `Box` invocando `put`, que retorna `false` se a caixa já estiver cheia. Você pode obter algo de uma `Box` invocando `get`, que retorna uma referência nula se a caixa estiver vazia.

Se `put` e `get` não fossem `synchronized`, e duas threads estivessem executando métodos para a mesma instância de `Box` ao mesmo tempo, então o código poderia se comportar de forma inadequada. Poderia, por exemplo, perder o controle de um objeto porque duas invocações a `put` ocorreram ao mesmo tempo.

### 8.4.4. Generic Methods

Um método é _genérico_ se ele declara uma ou mais type variables ([§4.4](<#/doc/jls/jls-04>)).

Essas type variables são conhecidas como os _type parameters_ do método. A forma da seção de type parameters de um método genérico é idêntica à seção de type parameters de uma generic class ([§8.1.2](<#/doc/jls/jls-08>)).

Uma declaração de método genérico define um conjunto de métodos, um para cada possível invocação da seção de type parameters por type arguments. Type arguments podem não precisar ser fornecidos explicitamente quando um método genérico é invocado, pois eles podem frequentemente ser inferidos ([§18 (_Inferência de Tipo_)](<#/doc/jls/jls-18>)).

O scope e shadowing de um type parameter de método são especificados em [§6.3](<#/doc/jls/jls-06>) e [§6.4.1](<#/doc/jls/jls-06>).

Referências ao type parameter de um método a partir de uma nested class ou interface são restritas, conforme especificado em [§6.5.5.1](<#/doc/jls/jls-06>).

Dois métodos ou construtores `M` e `N` têm os _mesmos type parameters_ se ambas as seguintes condições forem verdadeiras:

  * `M` e `N` têm o mesmo número de type parameters (possivelmente zero).

  * Onde A1, ..., An são os type parameters de `M` e B1, ..., Bn são os type parameters de `N`, seja _θ =[B1:=A1, ..., Bn:=An]_. Então, para todo _i_ (1 ≤ _i_ ≤ _n_), o bound de Ai é do mesmo tipo que θ aplicado ao bound de Bi.

Onde dois métodos ou construtores `M` e `N` têm os mesmos type parameters, um tipo mencionado em `N` pode ser _adaptado aos type parameters_ de `M` aplicando θ, conforme definido acima, ao tipo.

### 8.4.5. Method Result

O _resultado_ de uma declaração de método ou declara o tipo de valor que o método retorna (o _return type_), ou usa a palavra-chave `void` para indicar que o método não retorna um valor.

Result:

[UnannType](<#/doc/jls/jls-08>)   
`void`

Se o resultado não for `void`, então o return type de um método é denotado por _UnannType_ se nenhum par de colchetes aparecer após a lista de formal parameters, e é especificado por [§10.2](<#/doc/jls/jls-10>) caso contrário.

Return types podem variar entre métodos que se sobrescrevem se os return types forem reference types. A noção de return-type-substitutability suporta _covariant returns_, ou seja, a especialização do return type para um subtype.

Uma declaração de método `d1` com return type R1 é _return-type-substitutable_ para outro método `d2` com return type R2 se qualquer uma das seguintes condições for verdadeira:

  * Se R1 for `void` então R2 é `void`.

  * Se R1 for um primitive type então R2 é idêntico a R1.

  * Se R1 for um reference type então uma das seguintes condições é verdadeira:

    * R1, adaptado aos type parameters de `d2` ([§8.4.4](<#/doc/jls/jls-08>)), é um subtype de R2.

    * R1 pode ser convertido para um subtype de R2 por unchecked conversion ([§5.1.9](<#/doc/jls/jls-05>)).

    * `d1` não tem a mesma signature que `d2` ([§8.4.2](<#/doc/jls/jls-08>)), e R1 = |R2|.

Uma unchecked conversion é permitida na definição, apesar de ser inconsistente, como uma permissão especial para permitir uma migração suave de código não genérico para genérico. Se uma unchecked conversion for usada para determinar que R1 é return-type-substitutable para R2, então R1 não é necessariamente um subtype de R2 e as regras para overriding ([§8.4.8.3](<#/doc/jls/jls-08>), [§9.4.1](<#/doc/jls/jls-09>)) exigirão um compile-time unchecked warning.

### 8.4.6. Method Throws

Uma `throws` clause é usada para denotar quaisquer checked exception classes ([§11.1.1](<#/doc/jls/jls-11>)) que as instruções no corpo de um método ou construtor podem lançar ([§11.2.2](<#/doc/jls/jls-11>)).

Throws:

`throws` [ExceptionTypeList](<#/doc/jls/jls-08>)

ExceptionTypeList:

[ExceptionType](<#/doc/jls/jls-08>) {`,` [ExceptionType](<#/doc/jls/jls-08>)} 

ExceptionType:

[ClassType](<#/doc/jls/jls-04>)   
[TypeVariable](<#/doc/jls/jls-04>)

É um compile-time error se um _ExceptionType_ mencionado em uma `throws` clause não for um subtype ([§4.10](<#/doc/jls/jls-04>)) de `Throwable`.

Type variables são permitidas em uma `throws` clause, embora não sejam permitidas em uma `catch` clause ([§14.20](<#/doc/jls/jls-14>)).

É permitido, mas não obrigatório, mencionar unchecked exception classes ([§11.1.1](<#/doc/jls/jls-11>)) em uma `throws` clause.

A relação entre uma `throws` clause e a verificação de exceções para o corpo de um método ou construtor é especificada em [§11.2.3](<#/doc/jls/jls-11>).

Essencialmente, para cada checked exception que pode resultar da execução do corpo de um método ou construtor, ocorre um compile-time error a menos que seu exception type ou um supertype de seu exception type seja mencionado em uma `throws` clause na declaração do método ou construtor.

A exigência de declarar checked exceptions permite que um compilador Java garanta que o código para lidar com tais condições de erro tenha sido incluído. Métodos ou construtores que falham em lidar com condições excepcionais lançadas como checked exceptions em seus corpos normalmente causarão compile-time errors se não tiverem os exception types apropriados em suas `throws` clauses. A linguagem de programação Java, portanto, encoraja um estilo de programação onde condições raras e verdadeiramente excepcionais são documentadas dessa forma.

A relação entre a `throws` clause de um método e as `throws` clauses de métodos overridden ou hidden é especificada em [§8.4.8.3](<#/doc/jls/jls-08>).

**Example 8.4.6-1. Type Variables as Thrown Exception Types**
```java
    import java.io.FileNotFoundException;
    
    interface PrivilegedExceptionAction<E extends Exception> {
        void run() throws E;
    }
    class AccessController {
        public static <E extends Exception>
        Object doPrivileged(PrivilegedExceptionAction<E> action) throws E {
            action.run();
            return "success";
        }
    }
    class Test {
        public static void main(String[] args) {
            try {
                AccessController.doPrivileged(
                  new PrivilegedExceptionAction<FileNotFoundException>() {
                      public void run() throws FileNotFoundException {
                          // ... delete a file ...
                      }
                  });
            } catch (FileNotFoundException f) { /* Do something */ }
        }
    }
    
    
```

### 8.4.7. Method Body

Um _method body_ é ou um block de código que implementa o método ou simplesmente um ponto e vírgula, indicando a ausência de uma implementação.

MethodBody:

[Block](<#/doc/jls/jls-14>)   
`;`

O body de um método deve ser um ponto e vírgula se o método for `abstract` ou `native` ([§8.4.3.1](<#/doc/jls/jls-08>), [§8.4.3.4](<#/doc/jls/jls-08>)). Mais precisamente:

  * É um compile-time error se uma declaração de método for `abstract` ou `native` e tiver um block como seu body.

  * É um compile-time error se uma declaração de método não for nem `abstract` nem `native` e tiver um ponto e vírgula como seu body.

Se uma implementação for fornecida para um método declarado `void`, mas a implementação não exigir código executável, o method body deve ser escrito como um block que não contém instruções: "`{ }`".

As regras para `return` statements em um method body são especificadas em [§14.17](<#/doc/jls/jls-14>).

Se um método for declarado para ter um return type ([§8.4.5](<#/doc/jls/jls-08>)), então ocorre um compile-time error se o body do método puder completar normalmente ([§14.1](<#/doc/jls/jls-14>)).

Em outras palavras, um método com um return type deve retornar apenas usando uma `return` statement que fornece um valor de retorno; o método não tem permissão para "cair do final de seu body". Veja [§14.17](<#/doc/jls/jls-14>) para as regras precisas sobre `return` statements em um method body.

É possível que um método tenha um return type e ainda assim não contenha `return` statements. Aqui está um exemplo:
```java
    class DizzyDean {
        int pitch() { throw new RuntimeException("90 mph?!"); }
    }
    
```

### 8.4.8. Inheritance, Overriding, and Hiding

Uma class C _herda_ de seu direct superclass type D todos os métodos concrete `m` (tanto `static` quanto de instância) para os quais todas as seguintes condições são verdadeiras:

  * `m` é um membro de D.

  * `m` é `public`, `protected`, ou declarado com package access no mesmo package que C.

  * Nenhum método declarado em C tem uma signature que é uma subsignature ([§8.4.2](<#/doc/jls/jls-08>)) da signature de `m` como membro de D.

Uma class C _herda_ de seu direct superclass type e direct superinterface types todos os métodos `abstract` e default ([§9.4](<#/doc/jls/jls-09>)) `m` para os quais todas as seguintes condições são verdadeiras:

  * `m` é um membro do direct superclass type ou de um direct superinterface type de C, conhecido em ambos os casos como D.

  * `m` é `public`, `protected`, ou declarado com package access no mesmo package que C.

  * Nenhum método declarado em C tem uma signature que é uma subsignature ([§8.4.2](<#/doc/jls/jls-08>)) da signature de `m` como membro de D.

  * Nenhum método concrete herdado por C de seu direct superclass type tem uma signature que é uma subsignature da signature de `m` como membro de D.

  * Não existe nenhum método `m'` que seja membro do direct superclass type ou de um direct superinterface type de C, D' (`m` distinto de `m'`, D distinto de D'), tal que `m'` overrides da class ou interface de D' a declaração do método `m` ([§8.4.8.1](<#/doc/jls/jls-08>), [§9.4.1.1](<#/doc/jls/jls-09>)).

A herança para interfaces é definida em [§9.1.3](<#/doc/jls/jls-09>).

Uma class não herda métodos `private` ou `static` de seus superinterface types.

Note que os métodos são overridden ou hidden com base em signature por signature. Se, por exemplo, uma class declara dois métodos `public` com o mesmo nome ([§8.4.9](<#/doc/jls/jls-08>)), e uma subclass overrides um deles, a subclass ainda herda o outro método.

**Example 8.4.8-1. Inheritance**
```java
    interface I1 {
        int foo();
    }
    
    interface I2 {
        int foo();
    }
    
    abstract class Test implements I1, I2 {}
    
```

Aqui, a class `abstract` `Test` herda o método `abstract` `foo` da interface `I1` e também o método `abstract` `foo` da interface `I2`. A questão chave para determinar a herança de `foo` de `I1` é: o método `foo` em `I2` overrides "de `I2`" ([§9.4.1.1](<#/doc/jls/jls-09>)) o método `foo` em `I1`? Não, porque `I1` e `I2` não são subinterfaces uma da outra. Assim, do ponto de vista da class `Test`, a herança de `foo` de `I1` é irrestrita; o mesmo ocorre para a herança de `foo` de `I2`. De acordo com [§8.4.8.4](<#/doc/jls/jls-08>), a class `Test` pode herdar ambos os métodos `foo`; obviamente, ela deve ser declarada `abstract`, ou então sobrescrever ambos os métodos `abstract` `foo` com um método concrete.

Note que é possível que um método concrete herdado impeça a herança de um método `abstract` ou default. (O método concrete fará o override do método `abstract` ou default "de C", conforme [§8.4.8.1](<#/doc/jls/jls-08>) e [§9.4.1.1](<#/doc/jls/jls-09>)). Além disso, é possível que um método supertype impeça a herança de outro método supertype se o primeiro "já" fizer o override do segundo - isso é o mesmo que a regra para interfaces ([§9.4.1](<#/doc/jls/jls-09>)), e evita conflitos nos quais múltiplos métodos default são herdados e uma implementação é claramente destinada a substituir a outra.

#### 8.4.8.1. Overriding (by Instance Methods)

Um instance method `mC` declarado ou herdado pela class C, _sobrescreve de C_ outro método `mA` declarado na class A, se todas as seguintes condições forem verdadeiras:

  * C é uma subclass de A.

  * C não herda `mA`.

  * A signature de `mC` é uma subsignature ([§8.4.2](<#/doc/jls/jls-08>)) da signature de `mA` como membro do supertype de C que nomeia A.

  * Uma das seguintes condições é verdadeira:

    * `mA` é `public`.

    * `mA` é `protected`.

    * `mA` é declarado com package access no mesmo package que C, e ou C declara `mC` ou `mA` é um membro do direct superclass type de C.

    * `mA` é declarado com package access e `mC` overrides `mA` de alguma superclass de C.

    * `mA` é declarado com package access e `mC` overrides um método `m'` de C (`m'` distinto de `mC` e `mA`), de tal forma que `m'` overrides `mA` de alguma superclass de C.

Se `mC` não for `abstract` e overrides de C um método `abstract` `mA`, então `mC` é dito _implementar_ `mA` _de C_.

É um compile-time error se o método overridden, `mA`, for um método `static`.

Nesse aspecto, o overriding de métodos difere do hiding de fields ([§8.3](<#/doc/jls/jls-08>)), pois é permitido que uma instance variable esconda uma variável `static`.

Um instance method `mC` declarado ou herdado pela class C, _sobrescreve de C_ outro método `mI` declarado na interface I, se todas as seguintes condições forem verdadeiras:

  * I é uma superinterface de C.

  * `mI` não é `static`.

  * C não herda `mI`.

  * A signature de `mC` é uma subsignature ([§8.4.2](<#/doc/jls/jls-08>)) da signature de `mI` como membro do supertype de C que nomeia I.

  * `mI` é `public`.

A signature de um método overriding pode diferir daquele overridden se um formal parameter em um dos métodos tiver um raw type, enquanto o parameter correspondente no outro tiver um parameterized type. Isso acomoda a migração de código pré-existente para tirar proveito de generics.

A noção de overriding inclui métodos que sobrescrevem outro de alguma subclass de sua declaring class. Isso pode acontecer de duas maneiras:

  * Um método concrete em uma generic superclass pode, sob certas parameterizations, ter a mesma signature que um método `abstract` nessa class. Neste caso, o método concrete é herdado e o método `abstract` não é (conforme descrito acima). O método herdado deve então ser considerado para fazer o override de seu par `abstract` _de C_. (Este cenário é complicado pelo package access: se C estiver em um package diferente, então `mA` não teria sido herdado de qualquer forma, e não deveria ser considerado overridden.)

  * Um método herdado de uma class pode fazer o override de um método superinterface. (Felizmente, package access não é uma preocupação aqui.)

Um método overridden pode ser acessado usando uma method invocation expression ([§15.12](<#/doc/jls/jls-15>)) que contém a palavra-chave `super`. Um qualified name ou um cast para um superclass type não é eficaz ao tentar acessar um método overridden.

Nesse aspecto, o overriding de métodos difere do hiding de fields.

A presença ou ausência do modificador `strictfp` não tem absolutamente nenhum efeito nas regras para overriding de métodos e implementação de métodos `abstract`. Por exemplo, é permitido que um método que não é `strictfp` faça o override de um método `strictfp`, e é permitido que um método `strictfp` faça o override de um método que não é `strictfp`.

**Example 8.4.8.1-1. Overriding**
```java
    class Point {
        int x = 0, y = 0;
        void move(int dx, int dy) { x += dx; y += dy; }
    }
    class SlowPoint extends Point {
        int xLimit, yLimit;
        void move(int dx, int dy) {
            super.move(limit(dx, xLimit), limit(dy, yLimit));
        }
        static int limit(int d, int limit) {
            return d > limit ? limit : d < -limit ? -limit : d;
        }
    }
    
```

Aqui, a class `SlowPoint` sobrescreve as declarações do método `move` da class `Point` com seu próprio método `move`, que limita a distância que o ponto pode se mover em cada invocação do método. Quando o método `move` é invocado para uma instância da class `SlowPoint`, a definição overriding na class `SlowPoint` será sempre chamada, mesmo que a referência ao objeto `SlowPoint` seja obtida de uma variável cujo type é `Point`.

**Example 8.4.8.1-2. Overriding**

Overriding facilita para as subclasses estenderem o comportamento de uma class existente, como mostrado neste exemplo:
```java
    import java.io.IOException;
    import java.io.OutputStream;
    
    class BufferOutput {
        private OutputStream o;
        BufferOutput(OutputStream o) { this.o = o; }
        protected byte[] buf = new byte[512];
        protected int pos = 0;
        public void putchar(char c) throws IOException {
            if (pos == buf.length) flush();
            buf[pos++] = (byte)c;
        }
        public void putstr(String s) throws IOException {
            for (int i = 0; i < s.length(); i++)
                putchar(s.charAt(i));
        }
        public void flush() throws IOException {
            o.write(buf, 0, pos);
            pos = 0;
        }
    }
    class LineBufferOutput extends BufferOutput {
        LineBufferOutput(OutputStream o) { super(o); }
        public void putchar(char c) throws IOException {
            super.putchar(c);
            if (c == '\n') flush();
        }
    }
    class Test {
        public static void main(String[] args) throws IOException {
            LineBufferOutput lbo = new LineBufferOutput(System.out);
            lbo.putstr("lbo\nlbo");
            System.out.print("print\n");
            lbo.putstr("\n");
        }
    }
    
    
```

Este programa produz a saída:
```
    lbo
    print
    lbo
    
```

A class `BufferOutput` implementa uma versão buffered muito simples de um `OutputStream`, flushing a saída quando o buffer está cheio ou `flush` é invocado. A subclass `LineBufferOutput` declara apenas um construtor e um único método `putchar`, que sobrescreve o método `putchar` de `BufferOutput`. Ela herda os métodos `putstr` e `flush` da class `BufferOutput`.

No método `putchar` de um objeto `LineBufferOutput`, se o argumento character for um newline, então ele invoca o método `flush`. O ponto crítico sobre overriding neste exemplo é que o método `putstr`, que é declarado na class `BufferOutput`, invoca o método `putchar` definido pelo objeto atual `this`, que não é necessariamente o método `putchar` declarado na class `BufferOutput`.

Assim, quando `putstr` é invocado em `main` usando o objeto `LineBufferOutput` `lbo`, a invocação de `putchar` no body do método `putstr` é uma invocação do `putchar` do objeto `lbo`, a declaração overriding de `putchar` que verifica por um newline. Isso permite que uma subclass de `BufferOutput` altere o comportamento do método `putstr` sem redefini-lo.

A documentação para uma class como `BufferOutput`, que é projetada para ser estendida, deve indicar claramente qual é o contract entre a class e suas subclasses, e deve indicar claramente que as subclasses podem fazer o override do método `putchar` desta forma. O implementador da class `BufferOutput` não desejaria, portanto, alterar a implementação de `putstr` em uma futura implementação de `BufferOutput` para não usar o método `putchar`, porque isso quebraria o contract pré-existente com as subclasses. Veja a discussão sobre binary compatibility em [§13 (_Compatibilidade Binária_)](<#/doc/jls/jls-13>), especialmente [§13.2](<#/doc/jls/jls-13>).

#### 8.4.8.2. Hiding (by Class Methods)

Se uma class C declara ou herda um método `static` `m`, então `m` é dito _esconder_ qualquer método `m'` declarado em uma class ou interface A para o qual todas as seguintes condições são verdadeiras:

  * A é uma superclass ou superinterface de C.

  * Se A for uma interface, `m'` é um instance method.

  * `m'` é acessível a C ([§6.6](<#/doc/jls/jls-06>)).

  * A signature de `m` é uma subsignature ([§8.4.2](<#/doc/jls/jls-08>)) da signature de `m'` como membro do supertype de C que nomeia A.

É um compile-time error se um método `static` esconde um instance method.

Nesse aspecto, o hiding de métodos difere do hiding de fields ([§8.3](<#/doc/jls/jls-08>)), pois é permitido que uma variável `static` esconda uma instance variable. Hiding também é distinto de shadowing ([§6.4.1](<#/doc/jls/jls-06>)) e obscuring ([§6.4.2](<#/doc/jls/jls-06>)).

Um método hidden pode ser acessado usando um qualified name ou usando uma method invocation expression ([§15.12](<#/doc/jls/jls-15>)) que contém a palavra-chave `super` ou um cast para um superclass type.

Nesse aspecto, o hiding de métodos é semelhante ao hiding de fields.

**Example 8.4.8.2-1. Invocation of Hidden Class Methods**

Um método de class (`static`) que é hidden pode ser invocado usando uma referência cujo type é o type da class que realmente contém a declaração do método. Nesse aspecto, o hiding de métodos `static` é diferente do overriding de instance methods. O exemplo:
```java
    class Super {
        static String greeting() { return "Goodnight"; }
        String name() { return "Richard"; }
    }
    class Sub extends Super {
        static String greeting() { return "Hello"; }
        String name() { return "Dick"; }
    }
    class Test {
        public static void main(String[] args) {
            Super s = new Sub();
            System.out.println(s.greeting() + ", " + s.name());
        }
    }
    
```

produz a saída:
```
    Goodnight, Dick
    
```

porque a invocação de `greeting` usa o type de `s`, ou seja, `Super`, para determinar, em compile time, qual método de class invocar, enquanto a invocação de `name` usa a class de `s`, ou seja, `Sub`, para determinar, em run time, qual instance method invocar.

#### 8.4.8.3. Requirements in Overriding and Hiding

Se uma declaração de método `d1` com return type R1 overrides ou hides a declaração de outro método `d2` com return type R2, então `d1` deve ser return-type-substitutable ([§8.4.5](<#/doc/jls/jls-08>)) para `d2`, ou ocorre um compile-time error.

Esta regra permite covariant return types - refinando o return type de um método ao fazer o override dele.

Se R1 não for um subtype de R2, então ocorre um compile-time unchecked warning, a menos que seja suprimido por `@SuppressWarnings` ([§9.6.4.5](<#/doc/jls/jls-09>)).

Um método que overrides ou hides outro método, incluindo métodos que implementam métodos `abstract` definidos em interfaces, não pode ser declarado para lançar mais checked exceptions do que o método overridden ou hidden.

Nesse aspecto, o overriding de métodos difere do hiding de fields ([§8.3](<#/doc/jls/jls-08>)), pois é permitido que um field esconda um field de outro type.

Mais precisamente, suponha que B seja uma class ou interface, e A seja uma superclass ou superinterface de B, e uma declaração de método `m2` em B overrides ou hides uma declaração de método `m1` em A. Então:

  * Se `m2` tiver uma `throws` clause que menciona quaisquer checked exception types, então `m1` deve ter uma `throws` clause, ou ocorre um compile-time error.

  * Para cada checked exception type listado na `throws` clause de `m2`, essa mesma exception class ou um de seus supertypes deve ocorrer na erasure ([§4.6](<#/doc/jls/jls-04>)) da `throws` clause de `m1`; caso contrário, ocorre um compile-time error.

  * Se a `throws` clause não apagada de `m1` não contiver um supertype de cada exception type na `throws` clause de `m2` (adaptado, se necessário, aos type parameters de `m1`), então ocorre um compile-time unchecked warning, a menos que seja suprimido por `@SuppressWarnings` ([§9.6.4.5](<#/doc/jls/jls-09>)).

É um compile-time error se uma class ou interface C tiver um member method `m1` e existir um método `m2` declarado em C ou em uma superclass ou superinterface de C, A, de tal forma que todas as seguintes condições sejam verdadeiras:

  * `m1` e `m2` têm o mesmo nome.

  * `m2` é acessível ([§6.6](<#/doc/jls/jls-06>)) de C.

  * A signature de `m1` não é uma subsignature ([§8.4.2](<#/doc/jls/jls-08>)) da signature de `m2` como membro do supertype de C que nomeia A.

  * A declared signature de `m1` ou de algum método que `m1` overrides (direta ou indiretamente) tem a mesma erasure que a declared signature de `m2` ou de algum método que `m2` overrides (direta ou indiretamente).

Essas restrições são necessárias porque generics são implementados via erasure. A regra acima implica que métodos declarados na mesma class com o mesmo nome devem ter erasures diferentes. Também implica que uma class ou interface não pode implementar ou estender duas parameterizations distintas da mesma generic interface.

O access modifier de um método overriding ou hiding deve fornecer pelo menos o mesmo nível de access que o método overridden ou hidden, da seguinte forma:

  * Se o método overridden ou hidden for `public`, então o método overriding ou hiding deve ser `public`; caso contrário, ocorre um compile-time error.

  * Se o método overridden ou hidden for `protected`, então o método overriding ou hiding deve ser `protected` ou `public`; caso contrário, ocorre um compile-time error.

  * Se o método overridden ou hidden tiver package access, então o método overriding ou hiding _não_ deve ser `private`; caso contrário, ocorre um compile-time error.

Note que um método `private` não pode ser overridden ou hidden no sentido técnico desses termos. Isso significa que uma subclass pode declarar um método com a mesma signature que um método `private` em uma de suas superclasses, e não há exigência de que o return type ou a `throws` clause de tal método tenha qualquer relação com os do método `private` na superclass.

**Example 8.4.8.3-1. Covariant Return Types**

As seguintes declarações são legais na linguagem de programação Java a partir do Java SE 5.0:
```java
    class C implements Cloneable {
```
```java
        C copy() throws CloneNotSupportedException {
            return (C)clone();
        }
    }
    class D extends C implements Cloneable {
        D copy() throws CloneNotSupportedException {
            return (D)clone();
        }
    }
    
```

A regra relaxada para sobrescrita também permite relaxar as condições em classes `abstract` que implementam interfaces.

**Exemplo 8.4.8.3-2. Aviso Não Verificado do Tipo de Retorno**

Considere:
```java
    
    class StringSorter {
        // turns a collection of strings into a sorted list
        List toList(Collection c) {...}
    }
    
    
```

e assuma que alguém cria uma subclasse de `StringSorter`:
```java
    
    class Overrider extends StringSorter {
        List toList(Collection c) {...}
    }
    
    
```

Agora, em algum momento, o autor de `StringSorter` decide generalizar o código:
```java
    
    class StringSorter {
        // turns a collection of strings into a sorted list
        List<String> toList(Collection<String> c) {...}
    }
    
    
```

Um aviso não verificado (unchecked warning) seria emitido ao compilar `Overrider` contra a nova definição de `StringSorter` porque o tipo de retorno de `Overrider.toList` é `List`, que não é um subtipo do tipo de retorno do método sobrescrito, `List<String>`.

**Exemplo 8.4.8.3-3. Sobrescrita Incorreta por causa de `throws`

Este programa usa a forma usual e convencional para declarar um novo tipo de exceção, em sua declaração da classe `BadPointException`:
```java
    class BadPointException extends Exception {
        BadPointException() { super(); }
        BadPointException(String s) { super(s); }
    }
    class Point {
        int x, y;
        void move(int dx, int dy) { x += dx; y += dy; }
    }
    class CheckedPoint extends Point {
        void move(int dx, int dy) throws BadPointException {
            if ((x + dx) < 0 || (y + dy) < 0)
                throw new BadPointException();
            x += dx; y += dy;
        }
    }
    
```

O programa resulta em um erro em tempo de compilação, porque a sobrescrita do método `move` na classe `CheckedPoint` declara que lançará uma exceção verificada (checked exception) que o `move` na classe `Point` não declarou. Se isso não fosse considerado um erro, um invocador do método `move` em uma referência do tipo `Point` poderia encontrar o contrato entre ele e `Point` quebrado se essa exceção fosse lançada.

Remover a cláusula `throws` não ajuda:
```java
    class CheckedPoint extends Point {
        void move(int dx, int dy) {
            if ((x + dx) < 0 || (y + dy) < 0)
                throw new BadPointException();
            x += dx; y += dy;
        }
    }
    
```

Um erro de tempo de compilação diferente ocorre agora, porque o corpo do método `move` não pode lançar uma exceção verificada, ou seja, `BadPointException`, que não aparece na cláusula `throws` para `move`.

**Exemplo 8.4.8.3-4. Erasure Afeta a Sobrescrita**

Uma classe não pode ter dois métodos membro com o mesmo nome e type erasure:
```java
    
    class C<T> {
        T id (T x) {...}
    }
    class D extends C<String> {
        Object id(Object x) {...}
    }
    
    
```

Isso é ilegal, pois `D.id(Object)` é um membro de `D`, `C<String>.id(String)` é declarado em um supertipo de `D`, e:

*   Os dois métodos têm o mesmo nome, `id`
*   `C<String>.id(String)` é acessível a `D`
*   A assinatura de `D.id(Object)` não é uma subassinatura da de `C<String>.id(String)`
*   Os dois métodos têm o mesmo erasure

Dois métodos diferentes de uma classe não podem sobrescrever métodos com o mesmo erasure:
```java
    
    class C<T> {
        T id(T x) {...}
    }
    interface I<T> {
        T id(T x);
    }
    class D extends C<String> implements I<Integer> {
       public String  id(String x)  {...}
       public Integer id(Integer x) {...}
    }
    
    
```

Isso também é ilegal, pois `D.id(String)` é um membro de `D`, `D.id(Integer)` é declarado em `D`, e:

*   Os dois métodos têm o mesmo nome, `id`
*   `D.id(Integer)` é acessível a `D`
*   Os dois métodos têm assinaturas diferentes (e nenhuma é uma subassinatura da outra)
*   `D.id(String)` sobrescreve `C<String>.id(String)` e `D.id(Integer)` sobrescreve `I.id(Integer)`, mas os dois métodos sobrescritos têm o mesmo erasure

#### 8.4.8.4. Herdando Métodos com Assinaturas Equivalentes para Sobrescrita

É possível para uma classe herdar múltiplos métodos com assinaturas equivalentes para sobrescrita ([§8.4.2](<#/doc/jls/jls-08>)).

É um erro em tempo de compilação se uma classe C herda um método concreto cuja assinatura é equivalente para sobrescrita com outro método herdado por C.

É um erro em tempo de compilação se uma classe C herda um método `default` cuja assinatura é equivalente para sobrescrita com outro método herdado por C, a menos que exista um método `abstract` declarado em uma superclasse de C e herdado por C que seja equivalente para sobrescrita com os dois métodos.

Esta exceção às regras estritas de conflito `default`-`abstract` e `default`-`default` é feita quando um método `abstract` é declarado em uma superclasse: a afirmação de abstrato vinda da hierarquia da superclasse essencialmente anula o método `default`, fazendo com que o método `default` atue como se fosse `abstract`. No entanto, o método `abstract` de uma classe não sobrescreve o(s) método(s) `default`, porque as interfaces ainda podem refinar a _assinatura_ do método `abstract` vindo da hierarquia de classes.

Note que a exceção não se aplica se todos os métodos `abstract` equivalentes para sobrescrita herdados por C foram declarados em interfaces.

Caso contrário, o conjunto de métodos equivalentes para sobrescrita consiste em pelo menos um método `abstract` e zero ou mais métodos `default`; então a classe é necessariamente uma classe `abstract` e é considerada como herdando todos os métodos.

Um dos métodos herdados deve ser substituível pelo tipo de retorno para cada outro método herdado; caso contrário, ocorre um erro em tempo de compilação. (As cláusulas `throws` não causam erros neste caso.)

Pode haver vários caminhos pelos quais a mesma declaração de método é herdada de uma interface. Este fato não causa dificuldade e nunca, por si só, resulta em um erro em tempo de compilação.

**Exemplo 8.4.8.4-1. Herança de métodos equivalentes para sobrescrita**

O primeiro erro em tempo de compilação acima, referente a uma classe C que herda um método concreto, pode acontecer se uma superclasse de C for genérica, e a superclasse tiver dois métodos que eram distintos na declaração genérica, mas têm a mesma assinatura na parametrização ([§4.5](<#/doc/jls/jls-04>)) usada por C. Por exemplo:
```java
    
    class A<T> {
        void m(String s) {} // 1
        void m(T t) {} // 2
    }
    class C extends A<String> {}
    
    
```

C herda dois métodos de seu tipo de superclasse direta `A<String>`: o método `m(String)` marcado em `1`, e (devido à parametrização de A por C) o método `m(String)` marcado em `2`. Esses métodos têm a mesma assinatura, portanto são equivalentes para sobrescrita entre si.

### 8.4.9. Sobrecarga

Se dois métodos de uma classe (sejam ambos declarados na mesma classe, ou ambos herdados por uma classe, ou um declarado e um herdado) têm o mesmo nome, mas assinaturas que não são equivalentes para sobrescrita, então o nome do método é dito ser _sobrecarregado_.

Este fato não causa dificuldade e nunca, por si só, resulta em um erro em tempo de compilação. Não há relação exigida entre os tipos de retorno ou entre as cláusulas `throws` de dois métodos com o mesmo nome, a menos que suas assinaturas sejam equivalentes para sobrescrita.

Quando um método é invocado ([§15.12](<#/doc/jls/jls-15>)), o número de argumentos reais (e quaisquer argumentos de tipo explícitos) e os tipos em tempo de compilação dos argumentos são usados, em tempo de compilação, para determinar a assinatura do método que será invocado ([§15.12.2](<#/doc/jls/jls-15>)). Se o método a ser invocado for um método de instância, o método real a ser invocado será determinado em tempo de execução, usando a pesquisa dinâmica de métodos ([§15.12.4](<#/doc/jls/jls-15>)).

**Exemplo 8.4.9-1. Sobrecarga**
```java
    class Point {
        float x, y;
        void move(int dx, int dy) { x += dx; y += dy; }
        void move(float dx, float dy) { x += dx; y += dy; }
        public String toString() { return "("+x+","+y+")"; }
    }
    
```

Aqui, a classe `Point` tem dois membros que são métodos com o mesmo nome, `move`. O método `move` sobrecarregado da classe `Point` escolhido para qualquer invocação de método particular é determinado em tempo de compilação pelo procedimento de resolução de sobrecarga dado em [§15.12](<#/doc/jls/jls-15>).

No total, os membros da classe `Point` são as variáveis de instância `float` `x` e `y` declaradas em `Point`, os dois métodos `move` declarados, o método `toString` declarado, e os membros que `Point` herda de sua superclasse direta implícita `Object` ([§4.3.2](<#/doc/jls/jls-04>)), como o método `hashCode`. Note que `Point` não herda o método `toString` da classe `Object` porque esse método é sobrescrito pela declaração do método `toString` na classe `Point`.

**Exemplo 8.4.9-2. Sobrecarga, Sobrescrita e Ocultação**
```java
    class Point {
        int x = 0, y = 0;
        void move(int dx, int dy) { x += dx; y += dy; }
        int color;
    }
    class RealPoint extends Point {
        float x = 0.0f, y = 0.0f;
        void move(int dx, int dy) { move((float)dx, (float)dy); }
        void move(float dx, float dy) { x += dx; y += dy; }
    }
    
```

Aqui, a classe `RealPoint` oculta as declarações das variáveis de instância `int` `x` e `y` da classe `Point` com suas próprias variáveis de instância `float` `x` e `y`, e sobrescreve o método `move` da classe `Point` com seu próprio método `move`. Ela também sobrecarrega o nome `move` com outro método com uma assinatura diferente ([§8.4.2](<#/doc/jls/jls-08>)).

Neste exemplo, os membros da classe `RealPoint` incluem a variável de instância `color` herdada da classe `Point`, as variáveis de instância `float` `x` e `y` declaradas em `RealPoint`, e os dois métodos `move` declarados em `RealPoint`.

Qual desses métodos `move` sobrecarregados da classe `RealPoint` será escolhido para qualquer invocação de método particular será determinado em tempo de compilação pelo procedimento de resolução de sobrecarga descrito em [§15.12](<#/doc/jls/jls-15>).

O programa a seguir é uma variação estendida do programa precedente:
```java
    class Point {
        int x = 0, y = 0, color;
        void move(int dx, int dy) { x += dx; y += dy; }
        int getX() { return x; }
        int getY() { return y; }
    }
    class RealPoint extends Point {
        float x = 0.0f, y = 0.0f;
        void move(int dx, int dy) { move((float)dx, (float)dy); }
        void move(float dx, float dy) { x += dx; y += dy; }
        float getX() { return x; }
        float getY() { return y; }
    }
    
```

Aqui, a classe `Point` fornece os métodos `getX` e `getY` que retornam os valores de seus campos `x` e `y`; a classe `RealPoint` então sobrescreve esses métodos declarando métodos com a mesma assinatura. O resultado são dois erros em tempo de compilação, um para cada método, porque os tipos de retorno não correspondem; os métodos na classe `Point` retornam valores do tipo `int`, mas os métodos que "querem" sobrescrever na classe `RealPoint` retornam valores do tipo `float`.

Este programa corrige os erros do programa precedente:
```java
    class Point {
        int x = 0, y = 0;
        void move(int dx, int dy) { x += dx; y += dy; }
        int getX() { return x; }
        int getY() { return y; }
        int color;
    }
    class RealPoint extends Point {
        float x = 0.0f, y = 0.0f;
        void move(int dx, int dy) { move((float)dx, (float)dy); }
        void move(float dx, float dy) { x += dx; y += dy; }
        int getX() { return (int)Math.floor(x); }
        int getY() { return (int)Math.floor(y); }
    }
    
```

Aqui, os métodos sobrescritores `getX` e `getY` na classe `RealPoint` têm os mesmos tipos de retorno que os métodos da classe `Point` que eles sobrescrevem, então este código pode ser compilado com sucesso.

Considere, então, este programa de teste:
```java
    class Test {
        public static void main(String[] args) {
            RealPoint rp = new RealPoint();
            Point p = rp;
            rp.move(1.71828f, 4.14159f);
            p.move(1, -1);
            show(p.x, p.y);
            show(rp.x, rp.y);
            show(p.getX(), p.getY());
            show(rp.getX(), rp.getY());
        }
        static void show(int x, int y) {
            System.out.println("(" + x + ", " + y + ")");
        }
        static void show(float x, float y) {
            System.out.println("(" + x + ", " + y + ")");
        }
    }
    
```

A saída deste programa é:
```
    (0, 0)
    (2.7182798, 3.14159)
    (2, 3)
    (2, 3)
    
```

A primeira linha de saída ilustra o fato de que uma instância de `RealPoint` realmente contém os dois campos inteiros declarados na classe `Point`; é apenas que seus nomes estão ocultos do código que ocorre dentro da declaração da classe `RealPoint` (e de quaisquer subclasses que ela possa ter). Quando uma referência a uma instância da classe `RealPoint` em uma variável do tipo `Point` é usada para acessar o campo `x`, o campo inteiro `x` declarado na classe `Point` é acessado. O fato de seu valor ser zero indica que a invocação do método `p.move(1, -1)` não invocou o método `move` da classe `Point`; em vez disso, invocou o método `move` sobrescritor da classe `RealPoint`.

A segunda linha de saída mostra que o acesso ao campo `rp.x` se refere ao campo `x` declarado na classe `RealPoint`. Este campo é do tipo `float`, e esta segunda linha de saída exibe, consequentemente, valores de ponto flutuante. Incidentalmente, isso também ilustra o fato de que o nome do método `show` está sobrecarregado; os tipos dos argumentos na invocação do método ditam qual das duas definições será invocada.

As duas últimas linhas de saída mostram que as invocações de método `p.getX()` e `rp.getX()` cada uma invocam o método `getX` declarado na classe `RealPoint`. De fato, não há como invocar o método `getX` da classe `Point` para uma instância da classe `RealPoint` de fora do corpo de `RealPoint`, não importa qual seja o tipo da variável que possamos usar para manter a referência ao objeto. Assim, vemos que campos e métodos se comportam de forma diferente: ocultar é diferente de sobrescrever.

## 8.5. Declarações de Classes e Interfaces Membro

Uma _classe membro_ é uma classe cuja declaração está diretamente contida no corpo de outra declaração de classe ou interface ([§8.1.7](<#/doc/jls/jls-08>), [§9.1.5](<#/doc/jls/jls-09>)).

Uma _interface membro_ é uma interface cuja declaração está diretamente contida no corpo de outra declaração de classe ou interface.

Uma classe membro pode ser uma classe normal ([§8.1](<#/doc/jls/jls-08>)), uma classe `enum` ([§8.9](<#/doc/jls/jls-08>)), ou uma classe `record` ([§8.10](<#/doc/jls/jls-08>)).

Uma interface membro pode ser uma interface normal ([§9.1](<#/doc/jls/jls-09>)) ou uma interface de anotação ([§9.6](<#/doc/jls/jls-09>)).

A acessibilidade de uma declaração de classe ou interface membro no corpo de uma declaração de classe é especificada por seu modificador de acesso, ou por [§6.6](<#/doc/jls/jls-06>) se não possuir um modificador de acesso.

As regras para modificadores de uma declaração de classe membro no corpo de uma declaração de classe são especificadas em [§8.1.1](<#/doc/jls/jls-08>).

As regras para modificadores de uma declaração de interface membro no corpo de uma declaração de classe são especificadas em [§9.1.1](<#/doc/jls/jls-09>).

O escopo e o sombreamento (shadowing) de uma classe ou interface membro são especificados em [§6.3](<#/doc/jls/jls-06>) e [§6.4.1](<#/doc/jls/jls-06>).

Se uma classe declara uma classe ou interface membro com um certo nome, então a declaração da classe ou interface membro é dita _ocultar_ (hide) todas e quaisquer declarações acessíveis de classes e interfaces membro com o mesmo nome em superclasses e superinterfaces da classe.

Nesse aspecto, a ocultação de classes e interfaces membro é semelhante à ocultação de campos ([§8.3](<#/doc/jls/jls-08>)).

Uma classe herda de sua superclasse direta e superinterfaces diretas todas as classes e interfaces membro não-`private` da superclasse e superinterfaces que são acessíveis ao código na classe e não são ocultadas por uma declaração na classe.

É possível para uma classe herdar mais de uma classe ou interface membro com o mesmo nome, seja de sua superclasse e superinterfaces ou apenas de suas superinterfaces. Tal situação não causa, por si só, um erro em tempo de compilação. No entanto, qualquer tentativa dentro do corpo da classe de se referir a qualquer classe ou interface membro por seu nome simples resultará em um erro em tempo de compilação, porque a referência é ambígua.

Pode haver vários caminhos pelos quais a mesma declaração de classe ou interface membro é herdada de uma interface. Em tal situação, a classe ou interface membro é considerada herdada apenas uma vez, e pode ser referida por seu nome simples sem ambiguidade.

## 8.6. Inicializadores de Instância

Um _inicializador de instância_ declarado em uma classe é executado quando uma instância da classe é criada ([§12.5](<#/doc/jls/jls-12>), [§15.9](<#/doc/jls/jls-15>), [§8.8.7.1](<#/doc/jls/jls-08>)).

InstanceInitializer:

[Block](<#/doc/jls/jls-14>)

É um erro em tempo de compilação se um inicializador de instância não puder ser concluído normalmente ([§14.22](<#/doc/jls/jls-14>)).

É um erro em tempo de compilação se uma instrução `return` ([§14.17](<#/doc/jls/jls-14>)) aparecer em qualquer lugar dentro de um inicializador de instância.

Um inicializador de instância tem permissão para se referir ao objeto atual usando a palavra-chave `this` ([§15.8.3](<#/doc/jls/jls-15>)) ou a palavra-chave `super` ([§15.11.2](<#/doc/jls/jls-15>), [§15.12](<#/doc/jls/jls-15>)), e para usar quaisquer variáveis de tipo no escopo.

Restrições sobre como um inicializador de instância pode se referir a variáveis de instância, mesmo quando as variáveis de instância estão no escopo, são especificadas em [§8.3.3](<#/doc/jls/jls-08>).

A verificação de exceções para um inicializador de instância é especificada em [§11.2.3](<#/doc/jls/jls-11>).
```
## 8.7. Inicializadores Estáticos

Um _inicializador estático_ declarado em uma classe é executado quando a classe é inicializada (§12.4.2). Juntamente com quaisquer inicializadores de campo para variáveis de classe (§8.3.2), inicializadores estáticos podem ser usados para inicializar as variáveis de classe da classe.

StaticInitializer:

`static` Block

É um erro em tempo de compilação se um inicializador estático não puder ser concluído normalmente (§14.22).

É um erro em tempo de compilação se uma declaração `return` (§14.17) aparecer em qualquer lugar dentro de um inicializador estático.

Um inicializador estático introduz um contexto estático (§8.1.3), o que limita o uso de construções que se referem ao objeto atual. Notavelmente, as palavras-chave `this` e `super` são proibidas em um contexto estático (§15.8.3, §15.11.2), assim como referências não qualificadas a variáveis de instância, métodos de instância e parâmetros de tipo de declarações lexicamente envolventes (§6.5.5.1, §6.5.6.1, §15.12.3).

Restrições sobre como um inicializador estático pode se referir a variáveis de classe, mesmo quando as variáveis de classe estão no escopo, são especificadas em §8.3.3.

A verificação de exceções para um inicializador estático é especificada em §11.2.3.

## 8.8. Declarações de Construtores

Um _construtor_ é usado na criação de um objeto que é uma instância de uma classe (§12.5, §15.9).

ConstructorDeclaration:

{ConstructorModifier} ConstructorDeclarator [Throws] ConstructorBody

ConstructorDeclarator:

[TypeParameters] SimpleTypeName `(` [ReceiverParameter `,`] [FormalParameterList] `)`

SimpleTypeName:

TypeIdentifier

As regras nesta seção se aplicam a construtores em todas as declarações de classe, incluindo declarações enum e declarações record. No entanto, regras especiais se aplicam a declarações enum em relação a modificadores de construtor, corpos de construtor e construtores padrão; essas regras são estabelecidas em §8.9.2. Regras especiais também se aplicam a declarações record em relação a construtores, conforme estabelecido em §8.10.4.

O _SimpleTypeName_ no _ConstructorDeclarator_ deve ser o nome simples da classe que contém a declaração do construtor, ou ocorre um erro em tempo de compilação.

Em todos os outros aspectos, uma declaração de construtor se parece exatamente com uma declaração de método que não tem resultado (§8.4.5).

Declarações de construtores não são membros. Eles nunca são herdados e, portanto, não estão sujeitos a ocultação ou sobrescrita.

Construtores são invocados por expressões de criação de instância de classe (§15.9), pelas conversões e concatenações causadas pelo operador de concatenação de strings `+` (§15.18.1), e por invocações explícitas de construtores de outros construtores (§8.8.7). O acesso a construtores é governado por modificadores de acesso (§6.6), então é possível prevenir a instanciação de classes declarando um construtor inacessível (§8.8.10).

Construtores nunca são invocados por expressões de invocação de método (§15.12).

**Exemplo 8.8-1. Declarações de Construtores**
```
    class Point {
        int x, y;
        Point(int x, int y) { this.x = x; this.y = y; }
    }
```

### 8.8.1. Parâmetros Formais

Os parâmetros formais de um construtor são idênticos em sintaxe e semântica aos de um método (§8.4.1).

Se o último parâmetro formal de um construtor for um parâmetro de aridade variável, o construtor é um _construtor de aridade variável_. Caso contrário, é um _construtor de aridade fixa_.

O construtor de uma classe membro interna não-`private` declara implicitamente, como primeiro parâmetro formal, uma variável que representa a instância imediatamente envolvente da classe (§15.9.2, §15.9.3).

A razão pela qual apenas este tipo de classe possui um parâmetro de construtor implicitamente declarado é sutil. A seguinte explicação pode ser útil:

  1. Em uma expressão de criação de instância de classe para uma classe membro interna não-`private`, §15.9.2 especifica a instância imediatamente envolvente da classe membro. A classe membro pode ter sido emitida por um compilador diferente do compilador da expressão de criação de instância de classe. Portanto, deve haver uma maneira padrão para o compilador da expressão de criação passar uma referência (representando a instância imediatamente envolvente) para o construtor da classe membro. Consequentemente, a linguagem de programação Java considera nesta seção que o construtor de uma classe membro interna não-`private` declara implicitamente um parâmetro inicial para a instância imediatamente envolvente. §15.9.3 especifica que a instância é passada para o construtor.

  2. Em uma expressão de criação de instância de classe para uma classe local interna ou uma classe anônima (não em um contexto estático), §15.9.2 especifica a instância imediatamente envolvente da classe local/anônima. A classe local/anônima é necessariamente emitida pelo mesmo compilador que a expressão de criação de instância de classe. Esse compilador pode representar a instância imediatamente envolvente como desejar. Não há necessidade de a linguagem de programação Java declarar implicitamente um parâmetro no construtor da classe local/anônima.

  3. Em uma expressão de criação de instância de classe para uma classe anônima, e onde a superclasse da classe anônima é uma classe interna (não em um contexto estático), §15.9.2 especifica a instância imediatamente envolvente da classe anônima em relação à superclasse. Esta instância deve ser transmitida da classe anônima para sua superclasse, onde servirá como a instância imediatamente envolvente. Como a superclasse pode ter sido emitida por um compilador diferente do compilador da expressão de criação de instância de classe, é necessário transmitir a instância de forma padrão, passando-a como o primeiro argumento para o construtor da superclasse. No entanto, por consistência, a linguagem de programação Java considera em §15.9.5.1 que, em algumas circunstâncias, o construtor de uma classe anônima declara implicitamente um parâmetro inicial para a instância imediatamente envolvente em relação à superclasse.

O fato de que uma classe membro interna não-`private` pode ser acessada por um compilador diferente daquele que a compilou, enquanto uma classe local interna ou uma classe anônima é sempre acessada pelo mesmo compilador que a compilou, explica por que o nome binário de uma classe membro interna não-`private` é definido como previsível, mas o nome binário de uma classe local interna ou uma classe anônima não é (§13.1).

### 8.8.2. Assinatura do Construtor

É um erro em tempo de compilação declarar dois construtores com assinaturas override-equivalent (§8.4.2) em uma classe.

É um erro em tempo de compilação declarar dois construtores cujas assinaturas tenham a mesma erasure (§4.6) em uma classe.

### 8.8.3. Modificadores de Construtor

ConstructorModifier:

(um de)
Annotation `public` `protected` `private`

As regras relativas aos modificadores de anotação para uma declaração de construtor são especificadas em §9.7.4 e §9.7.5.

É um erro em tempo de compilação se a mesma palavra-chave aparecer mais de uma vez como modificador em uma declaração de construtor, ou se uma declaração de construtor tiver mais de um dos modificadores de acesso `public`, `protected` e `private` (§6.6).

Em uma declaração de classe normal, uma declaração de construtor sem modificadores de acesso tem acesso de pacote.

Se dois ou mais modificadores de método (distintos) aparecerem em uma declaração de método, é costumeiro, embora não obrigatório, que eles apareçam na ordem consistente com a mostrada acima na produção para _MethodModifier_.

Ao contrário dos métodos, um construtor não pode ser `abstract`, `static`, `final`, `native`, `strictfp` ou `synchronized`:

  * Um construtor não é herdado, então não há necessidade de declará-lo `final`.

  * Um construtor `abstract` nunca poderia ser implementado.

  * Um construtor é sempre invocado em relação a um objeto, então não faz sentido que um construtor seja `static`.

  * Não há necessidade prática para um construtor ser `synchronized`, porque ele bloquearia o objeto em construção, que normalmente não é disponibilizado para outras threads até que todos os construtores para o objeto tenham concluído seu trabalho.

  * A ausência de construtores `native` é uma escolha arbitrária de design da linguagem que facilita para uma implementação da Java Virtual Machine verificar se os construtores da superclasse são sempre invocados corretamente durante a criação do objeto.

  * A incapacidade de declarar um construtor como `strictfp` (em contraste com um método (§8.4.3)) é uma escolha intencional de design da linguagem que surgiu da capacidade (agora obsoleta) de declarar uma classe como `strictfp`.

### 8.8.4. Construtores Genéricos

Um construtor é _genérico_ se ele declara uma ou mais variáveis de tipo (§4.4).

Essas variáveis de tipo são conhecidas como os _parâmetros de tipo_ do construtor. A forma da seção de parâmetros de tipo de um construtor genérico é idêntica à seção de parâmetros de tipo de uma classe genérica (§8.1.2).

É possível que um construtor seja genérico independentemente de a classe na qual o construtor é declarado ser genérica.

Uma declaração de construtor genérico define um conjunto de construtores, um para cada possível invocação da seção de parâmetros de tipo por argumentos de tipo. Os argumentos de tipo podem não precisar ser fornecidos explicitamente quando um construtor genérico é invocado, pois muitas vezes podem ser inferidos (§18 (_Inferência de Tipo_)).

O escopo e o sombreamento do parâmetro de tipo de um construtor são especificados em §6.3 e §6.4.1.

Referências ao parâmetro de tipo de um construtor a partir de uma invocação de construtor ou de uma classe ou interface aninhada são restritas, conforme especificado em §6.5.5.1.

### 8.8.5. Cláusula Throws do Construtor

A cláusula `throws` para um construtor é idêntica em estrutura e comportamento à cláusula `throws` para um método (§8.4.6).

### 8.8.6. O Tipo de um Construtor

O tipo de um construtor consiste em sua assinatura e nos tipos de exceção dados por sua cláusula `throws`.

### 8.8.7. Corpo do Construtor

Um corpo de construtor é um bloco de código que é executado como parte do processo de criação de uma nova instância de uma classe (§12.5). Um corpo de construtor pode conter uma invocação explícita de outro construtor da mesma classe ou da superclasse direta (§8.8.7.1).

ConstructorBody:

`{` [BlockStatements] ConstructorInvocation [BlockStatements] `}`
`{` [BlockStatements] `}`

Se um corpo de construtor contém uma invocação explícita de construtor, as _BlockStatements_ que precedem a invocação do construtor são chamadas de _prólogo_ do corpo do construtor. O prólogo de um corpo de construtor pode ser vazio. As _BlockStatements_ em um construtor sem invocação explícita de construtor e as _BlockStatements_ que seguem uma invocação de construtor em um corpo de construtor são chamadas de _epílogo_. O epílogo de um corpo de construtor também pode ser vazio.

Uma construção (declaração, declaração de variável local, declaração de classe local, declaração de interface local ou expressão) _ocorre no contexto de construção inicial de uma classe_ C se estiver contida no prólogo de um corpo de construtor de C, ou se estiver aninhada na invocação do construtor (§8.8.7.1) de um corpo de construtor de C.

Se um corpo de construtor não contém uma invocação explícita de construtor e o construtor sendo declarado não faz parte da classe primordial `Object`, então o corpo do construtor (i) tem um prólogo vazio, (ii) implicitamente começa com uma invocação de construtor de superclasse "`super();`", uma invocação implícita do construtor da superclasse direta que não recebe argumentos, e (iii) as declarações, se houver, dadas no corpo do construtor são consideradas como formando o epílogo do corpo do construtor.

Exceto pela possibilidade de invocações explícitas ou implícitas de construtores, e a proibição de declarações `return` (§14.17), o corpo de um construtor é como o corpo de um método (§8.4.7).

Note que um corpo de construtor contém no máximo uma invocação de construtor. A gramática impossibilita, por exemplo, colocar invocações de construtores em diferentes ramificações de uma declaração `if`.

**Exemplo 8.8.7-1. Corpos de Construtores**
```
    class Point {
        int x, y;
        Point(int x, int y) { this.x = x; this.y = y; }
    }
    class ColoredPoint extends Point {
        static final int WHITE = 0, BLACK = 1;
        int color;
        ColoredPoint(int x, int y) {
            this(x, y, WHITE);
        }
        ColoredPoint(int x, int y, int color) {
            super(x, y);
            this.color = color;
        }
    }
```

Aqui, o primeiro construtor de `ColoredPoint` invoca o segundo, fornecendo um argumento adicional; o segundo construtor de `ColoredPoint` invoca o construtor de sua superclasse `Point`, passando as coordenadas.

#### 8.8.7.1. Invocações de Construtor

ConstructorInvocation:

[TypeArguments] `this` `(` [ArgumentList] `)` `;`
[TypeArguments] `super` `(` [ArgumentList] `)` `;`
ExpressionName `.` [TypeArguments] `super` `(` [ArgumentList] `)` `;`
Primary `.` [TypeArguments] `super` `(` [ArgumentList] `)` `;`

As seguintes produções de §4.5.1 e §15.12 são mostradas aqui para conveniência:

TypeArguments:

`<` TypeArgumentList `>`

ArgumentList:

Expression {`,` Expression}

As invocações de construtores são divididas em dois tipos:

  * _Invocações de construtores alternativos_ começam com a palavra-chave `this` (possivelmente precedida por argumentos de tipo explícitos). Elas são usadas para invocar um construtor alternativo da mesma classe.

  * _Invocações de construtores de superclasse_ começam com a palavra-chave `super` (possivelmente precedida por argumentos de tipo explícitos) ou uma expressão _Primary_ ou um _ExpressionName_. Elas são usadas para invocar um construtor da superclasse direta. Elas são ainda divididas em:

    * _Invocações de construtores de superclasse não qualificadas_ começam com a palavra-chave `super` (possivelmente precedida por argumentos de tipo explícitos).

    * _Invocações de construtores de superclasse qualificadas_ começam com uma expressão _Primary_ ou um _ExpressionName_. Elas permitem que um construtor de subclasse especifique explicitamente a instância imediatamente envolvente do objeto recém-criado em relação à superclasse direta (§8.1.3). Isso pode ser necessário quando a superclasse é uma classe interna.

É um erro em tempo de compilação para um construtor invocar direta ou indiretamente a si mesmo através de uma série de uma ou mais invocações de construtores alternativos.

Uma invocação de construtor introduz um contexto de construção inicial (§8.8.7), o que limita o uso de construções que se referem ao objeto atual. Notavelmente, referências ao objeto atual usando `this` e `super` são restritas em um contexto de construção inicial (§15.8.3, §15.11.2), assim como referências a variáveis de instância (§6.5.6.1) e métodos de instância (§6.5.7.1).

Se _TypeArguments_ estiver presente à esquerda de `this` ou `super`, então é um erro em tempo de compilação se qualquer um dos argumentos de tipo for um wildcard (§4.5.1).

Seja C a classe sendo instanciada, e S a superclasse direta de C.

Se uma invocação de construtor de superclasse não for qualificada, então:

  * Se S for uma classe membro interna, mas S não for membro de uma classe que envolve C, então ocorre um erro em tempo de compilação.

Caso contrário, seja O a classe envolvente mais interna de C da qual S é membro. C deve ser uma classe interna de O (§8.1.3), ou ocorre um erro em tempo de compilação. Se a invocação do construtor da superclasse ocorrer em um contexto de construção inicial da classe O, então ocorre um erro em tempo de compilação.

  * Se S for uma classe local interna, e S não ocorrer em um contexto estático, seja O a declaração de classe ou interface imediatamente envolvente de S. C deve ser uma classe interna de O, ou ocorre um erro em tempo de compilação.

  * Se S for uma classe local interna cuja declaração ocorre em um contexto estático, então seja `N` a declaração de método `static` mais próxima, declaração de campo `static` ou inicializador estático que envolve a declaração de S. Se `N` não for a declaração de método `static` mais próxima, declaração de campo `static` ou inicializador estático que envolve a invocação do construtor da superclasse, então ocorre um erro em tempo de compilação.

Se uma invocação de construtor de superclasse for qualificada, então:

  * Se S não for uma classe interna, ou se a declaração de S ocorrer em um contexto estático, então ocorre um erro em tempo de compilação.

  * Caso contrário, seja `p` a expressão _Primary_ ou o _ExpressionName_ imediatamente precedente a "`.``super`", e seja O a classe imediatamente envolvente de S. É um erro em tempo de compilação se o tipo de `p` não for O ou uma subclasse de O, ou se o tipo de `p` não for acessível (§6.6).

Os tipos de exceção que uma invocação explícita de construtor pode lançar são especificados em §11.2.2.

A avaliação de uma invocação de construtor alternativo prossegue avaliando primeiro os argumentos para o construtor, da esquerda para a direita, como em uma invocação de método comum; e então invocando o construtor.

Seja `i` a instância sendo criada por uma invocação de construtor de superclasse. A instância imediatamente envolvente de `i` em relação a S (se houver) é determinada da seguinte forma:

  * Se S não for uma classe interna, ou se a declaração de S ocorrer em um contexto estático, então nenhuma instância imediatamente envolvente de `i` em relação a S existe.

  * Caso contrário, se a invocação do construtor da superclasse não for qualificada, então S é necessariamente uma classe local interna ou uma classe membro interna.

Se S for uma classe local interna, seja O a declaração de classe ou interface imediatamente envolvente de S.

Se S for uma classe membro interna, seja O a classe envolvente mais interna de C da qual S é membro. Se a invocação do construtor da superclasse ocorrer no contexto de construção inicial da classe O, então ocorre um erro em tempo de compilação.

Seja _n_ um inteiro (_n_ ≥ 1) tal que O é a _n_-ésima declaração de classe ou interface lexicamente envolvente de C.

A instância imediatamente envolvente de `i` em relação a S é a _n_-ésima instância lexicamente envolvente de `this`.

Embora possa ser o caso de S ser um membro de C devido à herança, a instância lexicamente envolvente zero de `this` (ou seja, o próprio `this`) nunca é usada como a instância imediatamente envolvente de _i_ em relação a S.

  * Caso contrário, se a invocação do construtor da superclasse for qualificada, então a instância imediatamente envolvente de `i` em relação a S é o objeto que é o valor da expressão _Primary_ ou do _ExpressionName_.

Se a invocação do construtor da superclasse tiver uma instância imediatamente envolvente, então esta instância é considerada o primeiro argumento real para a invocação do construtor, e os argumentos reais subsequentes para a invocação do construtor são considerados os argumentos na lista de argumentos da invocação do construtor da superclasse, se houver, na ordem em que aparecem. Caso contrário, os argumentos reais para a invocação do construtor são considerados os argumentos na invocação do construtor da superclasse, se houver, na ordem em que aparecem.

A avaliação de uma invocação de construtor de superclasse prossegue da seguinte forma:

  1. Primeiro, se a invocação do construtor da superclasse for qualificada, a expressão _Primary_ ou o _ExpressionName_ é avaliada. Se ela avaliar para `null`, uma `NullPointerException` é lançada e a invocação do construtor da superclasse é concluída abruptamente. Se esta avaliação for concluída abruptamente, então a invocação do construtor da superclasse é concluída abruptamente pela mesma razão.

  2. Os argumentos reais para a invocação do construtor são avaliados, da esquerda para a direita, como em uma invocação de método comum; então o construtor é invocado.

Lembre-se de que o primeiro argumento real para a invocação do construtor pode ser uma instância envolvente.

  3. Finalmente, se a invocação do construtor da superclasse for concluída normalmente, então todos os inicializadores de variáveis de instância de C e todos os inicializadores de instância de C são executados. Se um inicializador de instância ou inicializador de variável de instância `I` precede textualmente outro inicializador de instância ou inicializador de variável de instância `J`, então `I` é executado antes de `J`.

A execução de inicializadores de variáveis de instância e inicializadores de instância é realizada independentemente de a invocação do construtor da superclasse aparecer realmente como uma invocação explícita de construtor ou ser fornecida implicitamente. (Uma invocação de construtor alternativo não realiza esta execução implícita adicional.)

**Exemplo 8.8.7.1-1. Restrições em Invocações de Construtor**

Se o primeiro construtor de `ColoredPoint` no exemplo de §8.8.7 fosse alterado da seguinte forma:
```
    class Point {
        int x, y;
        Point(int x, int y) { this.x = x; this.y = y; }
    }
    class ColoredPoint extends Point {
        static final int WHITE = 0, BLACK = 1;
        int color;
        ColoredPoint(int x, int y) {
            this(x, y, color);  // Changed to color from WHITE
        }
        ColoredPoint(int x, int y, int color) {
            super(x, y);
            this.color = color;
        }
    }
```

então ocorreria um erro em tempo de compilação, porque a variável de instância `color` não pode ser usada por uma invocação de construtor.

**Exemplo 8.8.7.1-2. Invocação Qualificada de Construtor de Superclasse**

No código abaixo, `ChildOfInner` não possui declaração de classe ou interface lexicamente envolvente, então uma instância de `ChildOfInner` não possui instância envolvente. No entanto, a superclasse de `ChildOfInner` (`Inner`) possui uma declaração de classe lexicamente envolvente (`Outer`), e uma instância de `Inner` deve ter uma instância envolvente de `Outer`. A instância envolvente de `Outer` é definida quando uma instância de `Inner` é criada. Portanto, quando criamos uma instância de `ChildOfInner`, que é implicitamente uma instância de `Inner`, devemos fornecer a instância envolvente de `Outer` através de uma invocação qualificada de superclasse no construtor de `ChildOfInner`. A instância de `Outer` é chamada de instância imediatamente envolvente de `ChildOfInner` em relação a `Inner`.
```
    class Outer {
        class Inner {}
    }
    class ChildOfInner extends Outer.Inner {
        ChildOfInner() { (new Outer()).super(); }
    }
```

Talvez surpreendentemente, a mesma instância de `Outer` pode servir como a instância imediatamente envolvente de `ChildOfInner` em relação a `Inner` _para múltiplas instâncias de `ChildOfInner`_. Essas instâncias de `ChildOfInner` estão implicitamente ligadas à mesma instância de `Outer`. O programa abaixo consegue isso passando uma instância de `Outer` para o construtor de `ChildOfInner`, que usa a instância em uma invocação qualificada de construtor de superclasse. As regras para uma invocação de construtor não proíbem o uso de parâmetros formais do construtor que contém a invocação.
```
    class Outer {
        int secret = 5;
        class Inner {
            int  getSecret()      { return secret; }
            void setSecret(int s) { secret = s; }
        }
    }
    class ChildOfInner extends Outer.Inner {
        ChildOfInner(Outer x) { x.super(); }
    }

    public class Test {
        public static void main(String[] args) {
            Outer x = new Outer();
            ChildOfInner a = new ChildOfInner(x);
            ChildOfInner b = new ChildOfInner(x);
            System.out.println(b.getSecret());
            a.setSecret(6);
            System.out.println(b.getSecret());
        }
    }
```

Este programa produz a saída:
```
    5
    6
```

O efeito é que a manipulação de variáveis de instância na instância comum de `Outer` é visível através de referências a diferentes instâncias de `ChildOfInner`, mesmo que tais referências não sejam aliases no sentido convencional.

### 8.8.8. Sobrecarga de Construtores

A sobrecarga de construtores é idêntica em comportamento à sobrecarga de métodos (§8.4.9). A sobrecarga é resolvida em tempo de compilação por cada expressão de criação de instância de classe (§15.9).

### 8.8.9. Construtor Padrão

Se uma classe não contém declarações de construtores, então um construtor padrão é implicitamente declarado. A forma do construtor padrão para uma classe de nível superior, classe membro ou classe local é a seguinte:

  * O construtor padrão tem o mesmo modificador de acesso que a classe, a menos que a classe não tenha um modificador de acesso, caso em que o construtor padrão tem acesso de pacote (§6.6).

  * O construtor padrão não tem parâmetros formais, exceto em uma classe membro interna não-`private`, onde o construtor padrão declara implicitamente um parâmetro formal representando a instância imediatamente envolvente da classe (§8.8.1, §15.9.2, §15.9.3).

  * O construtor padrão não tem cláusula `throws`.

  * Se a classe sendo declarada for a classe primordial `Object`, então o construtor padrão tem um corpo vazio. Caso contrário, o construtor padrão simplesmente invoca o construtor da superclasse sem argumentos. Esta invocação de construtor de superclasse deve satisfazer todas as regras para uma invocação de construtor de superclasse não qualificada (§8.8.7.1).

A forma do construtor padrão para uma classe anônima é especificada em §15.9.5.1.

É um erro em tempo de compilação se um construtor padrão for implicitamente declarado, mas a superclasse não tiver um construtor acessível que não receba argumentos e não tenha cláusula `throws`.

**Exemplo 8.8.9-1. Construtores Padrão**

A declaração:
```

    public class Point {
        int x, y;
    }

```

é equivalente à declaração:
```

    public class Point {
        int x, y;
        public Point() { super(); }
    }

```

onde o construtor padrão é `public` porque a classe `Point` é `public`.

**Exemplo 8.8.9-2. Acessibilidade de Construtores vs. Classes**

A regra de que o construtor padrão de uma classe tem a mesma acessibilidade que a própria classe é simples e intuitiva. Note, no entanto, que isso não implica que o construtor seja acessível sempre que a classe for acessível. Considere:
```
    package p1;
    public class Outer {
        protected class Inner {}
    }
    package p2;
    class SonOfOuter extends p1.Outer {
        void foo() {
            new Inner();  // compile-time access error
        }
    }
```

O construtor padrão para `Inner` é `protected`. No entanto, o construtor é `protected` em relação a `Inner`, enquanto `Inner` é `protected` em relação a `Outer`. Assim, `Inner` é acessível em `SonOfOuter`, já que é uma subclasse de `Outer`. O construtor de `Inner` não é acessível em `SonOfOuter`, porque a classe `SonOfOuter` não é uma subclasse de `Inner`! Consequentemente, mesmo que `Inner` seja acessível, seu construtor padrão não é.
### 8.8.10. Prevenindo a Instanciação de uma Classe

Uma classe pode ser projetada para impedir que o código fora da declaração da classe crie instâncias da classe, declarando pelo menos um construtor, para evitar a criação de um construtor padrão, e declarando todos os construtores como `private` (§6.6.1).

Uma classe `public` pode, da mesma forma, impedir a criação de instâncias fora de seu pacote, declarando pelo menos um construtor, para evitar a criação de um construtor padrão com acesso `public`, e não declarando nenhum construtor que seja `public` ou `protected` (§6.6.2).

**Exemplo 8.8.10-1. Prevenindo a Instanciação via Acessibilidade do Construtor**
```java

    class ClassOnly {
        private ClassOnly() { }
        static String just = "only the lonely";
    }
    
    
```

Aqui, a classe `ClassOnly` não pode ser instanciada, enquanto no código a seguir:
```java

    package just;
    public class PackageOnly {
        PackageOnly() { }
        String[] justDesserts = { "cheesecake", "ice cream" };
    }
    
    
```

a classe `public` `PackageOnly` pode ser instanciada apenas dentro do pacote `just`, no qual é declarada. Essa restrição também se aplicaria se o construtor de `PackageOnly` fosse `protected`, embora, nesse caso, seria possível que o código em outros pacotes instanciasse subclasses de `PackageOnly`.

## 8.9. Classes Enum

Uma _declaração enum_ especifica uma nova _classe enum_, um tipo restrito de classe que define um pequeno conjunto de instâncias de classe nomeadas.

EnumDeclaration:

{ClassModifier} `enum` TypeIdentifier [ClassImplements] EnumBody

Uma declaração enum pode especificar uma classe enum de nível superior (§7.6), uma classe enum membro (§8.5, §9.5), ou uma classe enum local (§14.3).

O _TypeIdentifier_ em uma declaração enum especifica o nome da classe enum.

É um erro em tempo de compilação se uma declaração enum tiver o modificador `abstract`, `final`, `sealed` ou `non-sealed`.

Uma classe enum é implicitamente `final` ou implicitamente `sealed`, da seguinte forma:

*   Uma classe enum é implicitamente `final` se sua declaração não contiver constantes enum que possuam um corpo de classe (§8.9.1).

*   Uma classe enum E é implicitamente `sealed` se sua declaração contiver pelo menos uma constante enum que possua um corpo de classe. As subclasses diretas permitidas (§8.1.6) de E são as classes anônimas implicitamente declaradas pelas constantes enum que possuem um corpo de classe.

Uma classe enum aninhada é implicitamente `static`. Ou seja, toda classe enum membro e classe enum local é `static`. É permitido que a declaração de uma classe enum membro especifique redundantemente o modificador `static`, mas não é permitido para a declaração de uma classe enum local (§14.3).

É um erro em tempo de compilação se a mesma palavra-chave aparecer mais de uma vez como modificador para uma declaração enum, ou se uma declaração enum tiver mais de um dos modificadores de acesso `public`, `protected` e `private` (§6.6).

O tipo da superclasse direta de uma classe enum E é `Enum``<`E`>` (§8.1.4).

Uma declaração enum não possui uma cláusula `extends`, portanto, não é possível declarar explicitamente um tipo de superclasse direta, nem mesmo `Enum``<`E`>`.

Uma classe enum não possui instâncias além daquelas definidas por suas constantes enum. É um erro em tempo de compilação tentar instanciar explicitamente uma classe enum (§15.9.1).

Além do erro em tempo de compilação, três outros mecanismos garantem que nenhuma instância de uma classe enum exista além daquelas definidas por suas constantes enum:

*   O método `final` `clone` em `Enum` garante que as constantes enum nunca possam ser clonadas.

*   A instanciação reflexiva de classes enum é proibida.

*   Um tratamento especial pelo mecanismo de serialização garante que instâncias duplicadas nunca sejam criadas como resultado da desserialização.

### 8.9.1. Constantes Enum

O corpo de uma declaração enum pode conter _constantes enum_. Uma constante enum define uma instância da classe enum.

EnumBody:

`{` [EnumConstantList] [`,`] [EnumBodyDeclarations] `}`

EnumConstantList:

EnumConstant {`,` EnumConstant}

EnumConstant:

{EnumConstantModifier} Identifier `(` [[ArgumentList] `)`] [ClassBody]

EnumConstantModifier:

Annotation

A seguinte produção de §15.12 é mostrada aqui para conveniência:

ArgumentList:

Expression {`,` Expression}

As regras relativas aos modificadores de anotação para uma declaração de constante enum são especificadas em §9.7.4 e §9.7.5.

O _Identifier_ em um _EnumConstant_ fornece o nome de um campo implícito da classe enum (§8.9.3) que pode ser usado para se referir à constante enum.

Uma constante enum pode ser seguida por argumentos, que são passados para o construtor do enum quando a constante é criada durante a inicialização da classe, conforme descrito posteriormente nesta seção. O construtor a ser invocado é escolhido usando as regras normais de resolução de sobrecarga (§15.12.2). Se os argumentos forem omitidos, uma lista de argumentos vazia é assumida.

O corpo de classe opcional de uma constante enum declara implicitamente uma classe anônima (§15.9.5) que (i) é uma subclasse direta da classe enum imediatamente envolvente (§8.1.4), e (ii) é `final` (§8.1.1.2). O corpo da classe é regido pelas regras usuais das classes anônimas; em particular, ele não pode conter nenhum construtor. Métodos de instância declarados nesses corpos de classe podem ser invocados fora da classe enum envolvente apenas se eles sobrescreverem métodos acessíveis na classe enum envolvente (§8.4.8).

É um erro em tempo de compilação para o corpo de classe de uma constante enum declarar um método `abstract`.

Como existe apenas uma instância de cada constante enum, é permitido usar o operador `==` em vez do método `equals` ao comparar duas referências de objeto, se for sabido que pelo menos uma delas se refere a uma constante enum.

O método `equals` em `Enum` é um método `final` que simplesmente invoca `super.equals` em seu argumento e retorna o resultado, realizando assim uma comparação de identidade.

### 8.9.2. Declarações do Corpo do Enum

Além das constantes enum, o corpo de uma declaração enum pode conter declarações de construtores e membros, bem como inicializadores de instância e estáticos.

EnumBodyDeclarations:

`;` {ClassBodyDeclaration}

As seguintes produções de §8.1.7 são mostradas aqui para conveniência:

ClassBodyDeclaration:

ClassMemberDeclaration   
InstanceInitializer   
StaticInitializer   
ConstructorDeclaration

ClassMemberDeclaration:

FieldDeclaration   
MethodDeclaration   
ClassDeclaration   
InterfaceDeclaration   
`;`

Quaisquer declarações de construtores ou membros no corpo de uma declaração enum se aplicam à classe enum exatamente como se tivessem estado presentes no corpo de uma declaração de classe normal, a menos que explicitamente declarado de outra forma.

É um erro em tempo de compilação se uma declaração de construtor em uma declaração enum for `public` ou `protected` (§6.6).

É um erro em tempo de compilação se uma declaração de construtor em uma declaração enum contiver uma invocação de construtor de superclasse (§8.8.7.1).

É um erro em tempo de compilação referir-se a um campo `static` de uma classe enum a partir de um construtor, inicializador de instância ou inicializador de variável de instância na declaração enum da classe, a menos que o campo seja uma variável constante (§4.12.4).

Em uma declaração enum, uma declaração de construtor sem modificadores de acesso é `private`.

Em uma declaração enum sem declarações de construtores, um construtor padrão é implicitamente declarado. O construtor padrão é `private`, não possui parâmetros formais e não possui cláusula `throws`.

Na prática, um compilador provavelmente espelhará a classe `Enum` declarando parâmetros `String` e `int` no construtor padrão de uma classe enum. No entanto, esses parâmetros não são especificados como "implicitamente declarados" porque compiladores diferentes não precisam concordar sobre a forma do construtor padrão. Apenas o compilador de uma declaração enum sabe como instanciar as constantes enum; outros compiladores podem simplesmente confiar nos campos `public` `static` implicitamente declarados da classe enum (§8.9.3) sem se preocupar com a forma como esses campos foram inicializados.

É um erro em tempo de compilação se uma declaração enum E tiver um método `abstract` `m` como membro, a menos que E tenha pelo menos uma constante enum e todas as constantes enum de E tenham corpos de classe que forneçam implementações concretas de `m`.

É um erro em tempo de compilação para uma declaração enum declarar um finalizador (§12.6). Uma instância de uma classe enum nunca pode ser finalizada.

**Exemplo 8.9.2-1. Declarações do Corpo do Enum**
```java
    enum Coin {
        PENNY(1), NICKEL(5), DIME(10), QUARTER(25);
        Coin(int value) { this.value = value; }
    
        private final int value;
        public int value() { return value; }
    }
    
```

Cada constante enum organiza um valor diferente no campo `value`, passado via construtor. O campo representa o valor, em centavos, de uma moeda americana. Note que não há restrições sobre os parâmetros que podem ser declarados pelo construtor de uma classe enum.

**Exemplo 8.9.2-2. Restrição na Auto-Referência de Constantes Enum**

Sem a regra sobre o acesso a campos `static`, um código aparentemente razoável falharia em tempo de execução devido à circularidade de inicialização inerente às classes enum. (Uma circularidade existe em qualquer classe com um campo `static` "auto-tipado".) Aqui está um exemplo do tipo de código que falharia:
```java
    import java.util.HashMap;
    import java.util.Map;
    
    enum Color {
        RED, GREEN, BLUE;
        Color() { colorMap.put(toString(), this); }
    
        static final Map<String,Color> colorMap =
            new HashMap<String,Color>();
    }
    
    
```

A inicialização estática deste enum lançaria uma `NullPointerException` porque a variável `static` `colorMap` não é inicializada quando os construtores para as constantes enum são executados. A restrição acima garante que tal código não possa ser compilado. No entanto, o código pode ser facilmente refatorado para funcionar corretamente:
```java
    import java.util.HashMap;
    import java.util.Map;
    
    enum Color {
        RED, GREEN, BLUE;
    
        static final Map<String,Color> colorMap =
            new HashMap<String,Color>();
        static {
            for (Color c : Color.values())
                colorMap.put(c.toString(), c);
        }
    }
    
    
```

A versão refatorada está claramente correta, pois a inicialização estática ocorre de cima para baixo.

### 8.9.3. Membros Enum

Os membros de uma classe enum E são todos os seguintes:

*   Membros declarados no corpo da declaração de E.

*   Membros herdados de `Enum``<`E`>`.

*   Para cada constante enum `c` declarada no corpo da declaração de E, E possui um campo `public` `static` `final` implicitamente declarado do tipo E que tem o mesmo nome que `c`. O campo possui um inicializador de variável que instancia E e passa quaisquer argumentos de `c` para o construtor escolhido para E. O campo possui as mesmas anotações que `c` (se houver).

Esses campos são implicitamente declarados na mesma ordem que as constantes enum correspondentes, antes de quaisquer campos `static` explicitamente declarados no corpo da declaração de E.

Uma constante enum é considerada _criada_ quando o campo implicitamente declarado correspondente é inicializado.

*   Um método `public` `static` E`[]` `values()` implicitamente declarado, que retorna um array contendo as constantes enum de E, na mesma ordem em que aparecem no corpo da declaração de E.

*   Um método `public` `static` E `valueOf(String name)` implicitamente declarado, que retorna a constante enum de E com o nome especificado.

Conclui-se que a declaração da classe enum E não pode conter campos que entrem em conflito com os campos implicitamente declarados correspondentes às constantes enum de E, nem conter métodos que entrem em conflito com métodos implicitamente declarados ou sobrescrevam métodos `final` da classe `Enum``<`E`>`.

**Exemplo 8.9.3-1. Iterando Sobre Constantes Enum Com Um Loop `for` Aprimorado**
```java
    public class Test {
        enum Season { WINTER, SPRING, SUMMER, FALL }
    
        public static void main(String[] args) {
            for (Season s : Season.values())
                System.out.println(s);
        }
    }
    
```

Este programa produz a saída:
```
    WINTER
    SPRING
    SUMMER
    FALL
    
```

**Exemplo 8.9.3-2. Usando `switch` Com Constantes Enum**

Uma instrução `switch` (§14.11) é útil para simular a adição de um método a uma classe enum de fora da classe. Este exemplo "adiciona" um método `color` à classe `Coin` de §8.9.2, e imprime uma tabela de moedas, seus valores e suas cores.
```java
    class Test {
        enum CoinColor { COPPER, NICKEL, SILVER }
    
        static CoinColor color(Coin c) {
            switch (c) {
                case PENNY:
                    return CoinColor.COPPER;
                case NICKEL:
                    return CoinColor.NICKEL;
                case DIME: case QUARTER:
                    return CoinColor.SILVER;
                default:
                    throw new AssertionError("Unknown coin: " + c);
            }
        }
    
        public static void main(String[] args) {
            for (Coin c : Coin.values())
                System.out.println(c + "\t\t" +
                                   c.value() + "\t" + color(c));
        }
    }
    
```

Este programa produz a saída:
```
    PENNY           1       COPPER
    NICKEL          5       NICKEL
    DIME            10      SILVER
    QUARTER         25      SILVER
    
```

**Exemplo 8.9.3-3. Constantes Enum com Corpos de Classe**

Em vez de usar uma instrução `switch` para "adicionar" comportamento a uma classe enum de fora, é possível usar corpos de classe para anexar comportamentos diretamente às constantes enum.
```java
    enum Operation {
        PLUS {
            double eval(double x, double y) { return x + y; }
        },
        MINUS {
            double eval(double x, double y) { return x - y; }
        },
        TIMES {
            double eval(double x, double y) { return x * y; }
        },
        DIVIDED_BY {
            double eval(double x, double y) { return x / y; }
        };
    
        // Each constant supports an arithmetic operation
        abstract double eval(double x, double y);
    
        public static void main(String[] args) {
            double x = Double.parseDouble(args[0]);
            double y = Double.parseDouble(args[1]);
            for (Operation op : Operation.values())
                System.out.println(x + " " + op + " " + y +
                                   " = " + op.eval(x, y));
        }
    }
    
    
```

O programa produz a saída:
```
    java Operation 2.0 4.0
    2.0 PLUS 4.0 = 6.0
    2.0 MINUS 4.0 = -2.0
    2.0 TIMES 4.0 = 8.0
    2.0 DIVIDED_BY 4.0 = 0.5
    
```

Este padrão é muito mais seguro do que usar uma instrução `switch` porque o padrão impede a possibilidade de esquecer de adicionar um comportamento para uma nova constante (já que a declaração enum causaria um erro em tempo de compilação).

**Exemplo 8.9.3-4. Múltiplas Classes Enum**

No programa a seguir, uma classe de carta de baralho é construída sobre dois enums simples.
```java
    import java.util.ArrayList;
    import java.util.List;
    
    class Card implements Comparable<Card>,
                          java.io.Serializable {
        public enum Rank { DEUCE, THREE, FOUR, FIVE, SIX, SEVEN,
                           EIGHT, NINE, TEN,JACK, QUEEN, KING, ACE }
    
        public enum Suit { CLUBS, DIAMONDS, HEARTS, SPADES }
    
        private final Rank rank;
        private final Suit suit;
        public Rank rank() { return rank; }
        public Suit suit() { return suit; }
    
        private Card(Rank rank, Suit suit) {
            if (rank == null || suit == null)
                throw new NullPointerException(rank + ", " + suit);
            this.rank = rank;
            this.suit = suit;
        }
    
        public String toString() { return rank + " of " + suit; }
    
        // Primary sort on suit, secondary sort on rank
        public int compareTo(Card c) {
            int suitCompare = suit.compareTo(c.suit);
            return (suitCompare != 0 ?
                        suitCompare :
                        rank.compareTo(c.rank));
        }
    
        private static final List<Card> prototypeDeck =
            new ArrayList<Card>(52);
    
        static {
            for (Suit suit : Suit.values())
                for (Rank rank : Rank.values())
                    prototypeDeck.add(new Card(rank, suit));
        }
    
        // Returns a new deck
        public static List<Card> newDeck() {
            return new ArrayList<Card>(prototypeDeck);
        }
    }
    
    
```

O programa a seguir exercita a classe `Card`. Ele recebe dois parâmetros inteiros na linha de comando, representando o número de mãos a serem distribuídas e o número de cartas em cada mão:
```java
    import java.util.ArrayList;
    import java.util.Collections;
    import java.util.List;
    
    class Deal {
        public static void main(String[] args) {
            int numHands     = Integer.parseInt(args[0]);
            int cardsPerHand = Integer.parseInt(args[1]);
            List<Card> deck  = Card.newDeck();
            Collections.shuffle(deck);
            for (int i=0; i < numHands; i++)
                System.out.println(dealHand(deck, cardsPerHand));
        }
    
        /**
         * Returns a new ArrayList consisting of the last n
         * elements of deck, which are removed from deck.
         * The returned list is sorted using the elements'
         * natural ordering.
         */
        public static <E extends Comparable<E>>
        ArrayList<E> dealHand(List<E> deck, int n) {
            int          deckSize = deck.size();
            List<E>      handView = deck.subList(deckSize - n, deckSize);
            ArrayList<E> hand = new ArrayList<E>(handView);
            handView.clear();
            Collections.sort(hand);
            return hand;
        }
    }
    
    
```

O programa produz a saída:
```
    java Deal 4 3
    [DEUCE of CLUBS, SEVEN of CLUBS, QUEEN of DIAMONDS]
    [NINE of HEARTS, FIVE of SPADES, ACE of SPADES]
    [THREE of HEARTS, SIX of HEARTS, TEN of SPADES]
    [TEN of CLUBS, NINE of DIAMONDS, THREE of SPADES
    
```
## 8.10. Classes record

Uma _declaração record_ especifica uma nova classe record, um tipo restrito de classe que define um agregado simples de valores.

RecordDeclaration:

{ClassModifier} `record` TypeIdentifier [TypeParameters] RecordHeader [ClassImplements] RecordBody

Uma declaração record pode especificar uma classe record de nível superior (§7.6), uma classe record membro (§8.5, §9.5), ou uma classe record local (§14.3).

O _TypeIdentifier_ em uma declaração record especifica o nome da classe record.

É um erro em tempo de compilação se uma declaração record tiver o modificador `abstract`, `sealed` ou `non-sealed`.

Uma classe record é implicitamente `final`. É permitido que a declaração de uma classe record especifique redundantemente o modificador `final`.

Uma classe record aninhada é implicitamente `static`. Ou seja, toda classe record membro e classe record local é `static`. É permitido que a declaração de uma classe record membro especifique redundantemente o modificador `static`, mas não é permitido para a declaração de uma classe record local (§14.3).

É um erro em tempo de compilação se a mesma palavra-chave aparecer mais de uma vez como modificador para uma declaração record, ou se uma declaração record tiver mais de um dos modificadores de acesso `public`, `protected` e `private` (§6.6).

O tipo da superclasse direta de uma classe record é `Record` (§8.1.4).

Uma declaração record não possui uma cláusula `extends`, portanto não é possível declarar explicitamente um tipo de superclasse direta, nem mesmo `Record`.

O mecanismo de serialização trata as instâncias de uma classe record de forma diferente dos objetos serializáveis ou externalizáveis comuns. Em particular, um objeto record é desserializado usando o construtor canônico (§8.10.4).

### 8.10.1. Componentes record

Os _componentes record_ de uma classe record, se houver, são especificados no cabeçalho de uma declaração record. Cada componente record consiste em um tipo (opcionalmente precedido por uma ou mais anotações) e um identificador que especifica o nome do componente record. Um componente record corresponde a dois membros da classe record: um campo `private` declarado implicitamente e um método acessor `public` declarado explicitamente ou implicitamente (§8.10.3).

Se uma classe record não tiver componentes record, então um par vazio de parênteses aparece no cabeçalho da declaração record.

RecordHeader:

`(` [RecordComponentList] `)`

RecordComponentList:

RecordComponent {`,` RecordComponent}

RecordComponent:

{RecordComponentModifier} UnannType Identifier   
VariableArityRecordComponent

VariableArityRecordComponent:

{RecordComponentModifier} UnannType {Annotation} `...` Identifier

RecordComponentModifier:

Annotation

Um componente record pode ser um _componente record de aridade variável_, indicado por uma elipse após o tipo. No máximo um componente record de aridade variável é permitido para uma classe record. É um erro em tempo de compilação se um componente record de aridade variável aparecer em qualquer lugar na lista de componentes record, exceto na última posição.

As regras relativas aos modificadores de anotação para um componente record são especificadas em §9.7.4 e §9.7.5.

As anotações em um componente record estão disponíveis via reflection se suas interfaces de anotação forem aplicáveis no contexto do componente record (§9.6.4.1). Independentemente, as anotações em um componente record são propagadas para as declarações de membros e construtores da classe record se suas interfaces de anotação forem aplicáveis em outros contextos (§8.10.3, §8.10.4).

Toda declaração de um componente record deve incluir um _Identifier_, caso contrário, ocorre um erro em tempo de compilação.

É um erro em tempo de compilação se uma declaração record tiver um componente record com o nome `clone`, `finalize`, `getClass`, `hashCode`, `notify`, `notifyAll`, `toString` ou `wait`.

Esses são os nomes dos métodos `public` e `protected` sem argumentos em `Object`. Desabilitá-los como nomes de componentes record evita confusão de várias maneiras. Primeiro, toda classe record fornece implementações de `hashCode` e `toString` que retornam representações de um objeto record como um todo; eles não podem servir como métodos acessores (§8.10.3) para componentes record chamados `hashCode` ou `toString`, e não haveria como acessar tais componentes record de fora da classe record. Da mesma forma, algumas classes record podem fornecer implementações de `clone` e (lamentavelmente) `finalize`, então um componente record chamado `clone` ou `finalize` não poderia ser acessado via um método acessor. Finalmente, os métodos `getClass`, `notify`, `notifyAll` e `wait` em `Object` são `final`, então componentes record com os mesmos nomes não poderiam ter métodos acessores. (Os métodos acessores teriam as mesmas assinaturas que os métodos `final`, e assim tentariam, sem sucesso, sobrescrevê-los.)

É um erro em tempo de compilação para uma declaração record ter dois componentes record com o mesmo nome.

O tipo declarado de um componente record depende se é um componente record de aridade variável:

*   Se o componente record não for um componente record de aridade variável, então o tipo declarado é denotado por _UnannType_.

*   Se o componente record for um componente record de aridade variável, então o tipo declarado é um tipo de array especificado por §10.2.

Se o tipo declarado de um componente record de aridade variável tiver um tipo de elemento não reificável (§4.7), então ocorre um aviso não verificado em tempo de compilação para a declaração do componente record de aridade variável, a menos que o construtor canônico (§8.10.4) seja anotado com `@SafeVarargs` (§9.6.4.7) ou o aviso seja suprimido por `@SuppressWarnings` (§9.6.4.5).

### 8.10.2. Declarações do Corpo da Classe record

O corpo de uma declaração record pode conter declarações de construtores e membros, bem como inicializadores estáticos.

RecordBody:

`{` {RecordBodyDeclaration} `}`

RecordBodyDeclaration:

ClassBodyDeclaration   
CompactConstructorDeclaration

As seguintes produções de §8.1.7 são mostradas aqui para conveniência:

ClassBodyDeclaration:

ClassMemberDeclaration   
InstanceInitializer   
StaticInitializer   
ConstructorDeclaration

ClassMemberDeclaration:

FieldDeclaration   
MethodDeclaration   
ClassDeclaration   
InterfaceDeclaration   
`;`

A cláusula _CompactConstructorDeclaration_ é descrita em §8.10.4.2.

É um erro em tempo de compilação para o corpo de uma declaração record conter uma declaração de campo não-`static` (§8.3.1.1).

É um erro em tempo de compilação para o corpo de uma declaração record conter uma declaração de método que seja `abstract` ou `native` (§8.4.3.1, §8.4.3.4).

É um erro em tempo de compilação para o corpo de uma declaração record conter um inicializador de instância (§8.6).

### 8.10.3. Membros record

Para cada componente record, uma classe record possui um campo com o mesmo nome do componente record e o mesmo tipo do tipo declarado do componente record. Este campo, que é declarado implicitamente, é conhecido como _campo de componente_.

Um campo de componente é `private`, `final` e não-`static`.

Um campo de componente é anotado com as anotações, se houver, que aparecem no componente record correspondente e cujas interfaces de anotação são aplicáveis no contexto de declaração de campo, ou em contextos de tipo, ou em ambos (§9.7.4).

Além disso, para cada componente record, uma classe record possui um método com o mesmo nome do componente record e uma lista de parâmetros formais vazia. Este método, que é declarado explicitamente ou implicitamente, é conhecido como _método acessor_.

Se um método acessor para um componente record for declarado explicitamente, então todas as seguintes condições devem ser verdadeiras, ou ocorre um erro em tempo de compilação:

*   O tipo de retorno do método acessor (§8.4.5) deve ser o mesmo que o tipo declarado do componente record.

*   O método acessor não deve ser genérico (§8.4.4).

*   O método acessor deve ser um método de instância `public` sem parâmetros formais e sem cláusula `throws`.

Se uma classe record tiver um componente record para o qual um método acessor não é declarado explicitamente, então um método acessor para esse componente record é declarado implicitamente, com as seguintes propriedades:

*   Seu nome é o mesmo que o nome do componente record.

*   Seu tipo de retorno é o mesmo que o tipo declarado do componente record.

*   Não é genérico.

*   É um método de instância `public` sem parâmetros formais e sem cláusula `throws`.

*   É anotado com as anotações, se houver, que aparecem no componente record correspondente e cujas interfaces de anotação são aplicáveis no contexto de declaração de método, ou em contextos de tipo, ou em ambos (§9.7.4).

*   Seu corpo retorna o valor do campo de componente correspondente.

As restrições nos nomes dos componentes record (§8.10.1) significam que nenhum método acessor declarado implicitamente tem uma assinatura que seja override-equivalente a um método não-`private` da classe `Object`. Uma declaração de método explícita que usa um dos nomes restritos, como `public void wait() {...}`, não é um método acessor, já que `wait` nunca é um nome de componente record.

As anotações que aparecem em um componente record não são propagadas para um método acessor declarado explicitamente para esse componente record. Em algumas situações, o programador pode precisar duplicar as anotações de um componente record em um método acessor declarado explicitamente, mas isso geralmente não é necessário.

As anotações que são propagadas para um método acessor declarado implicitamente devem resultar em um método legalmente anotado. Por exemplo, na seguinte declaração record, o método acessor `x()` declarado implicitamente seria anotado com `@SafeVarargs`, mas tal anotação é ilegal em um método de aridade fixa (§9.6.4.7):
```
    record BadRecord(@SafeVarargs int x) {}  // Error
    
```

O escopo e o sombreamento do campo de componente e do método acessor são especificados em §6.3 e §6.4.1. (O componente record ao qual eles correspondem não é uma declaração, portanto não tem escopo próprio.)

As classes record podem declarar explicitamente métodos de instância diferentes dos métodos acessores, mas não podem declarar explicitamente variáveis de instância (§8.10.2). Declarações explícitas de métodos de classe e variáveis de classe são permitidas.

Todos os membros de classes record, incluindo membros declarados implicitamente, estão sujeitos às regras usuais para declarações de membros em uma classe (§8.3, §8.4, §8.5).

Todas as regras relativas à herança que se aplicam às classes normais se aplicam às classes record. Em particular, as classes record podem herdar membros de superinterfaces, embora um método de superinterface nunca seja herdado como um método acessor porque a classe record sempre declarará, explicitamente ou implicitamente, um método acessor que sobrescreve o método da superinterface.

Por exemplo, uma classe record pode herdar métodos `default` de suas superinterfaces diretas, embora os corpos dos métodos `default` não tenham conhecimento dos campos de componente da classe record. O programa a seguir imprime `Logged`:
```
    public class Test {
        interface Logging {
            default void logAction() {
                System.out.println("Logged");
            }
        }
    
        record Point(int i, int j) implements Logging {}
    
        public static void main(String[] args) {
            Point p = new Point(10, 20);
            p.logAction();
        }
    }
    
```

Uma classe record fornece implementações de todos os métodos `abstract` declarados na classe `Record`. Para cada um dos seguintes métodos, se uma classe record R não declarar explicitamente um método com os mesmos modificadores, nome e assinatura (§8.4.2), então o método é implicitamente declarado da seguinte forma:

*   Um método `public final boolean equals(Object)` que retorna `true` se e somente se o argumento for uma instância de R, e a instância atual for igual à instância do argumento em cada componente record de R; caso contrário, `false` é retornado.

A igualdade de uma instância `a` de uma classe record R com outra instância `b` da mesma classe record em um componente record `c` é determinada da seguinte forma:

    *   Se o tipo do componente record `c` for um tipo de referência, a igualdade é determinada da seguinte forma: se o valor do campo de componente `c` de `a` e `b` for a referência nula, então `true` é retornado; se o valor do campo de componente `c` de `a` ou `b`, mas não de ambos, for a referência nula, então `false` é retornado; caso contrário, a igualdade é determinada invocando o método `equals` no valor do campo de componente `c` de `a`, com um argumento que é o valor do campo de componente `c` de `b`.

    *   Se o tipo do componente record `c` for um tipo primitivo T, a igualdade é determinada como se fosse invocando o método `static` `compare` da classe wrapper correspondente a T (§5.1.7), com o primeiro argumento dado pelo valor do campo de componente `c` de `a`, e o segundo argumento dado pelo valor do campo de componente `c` de `b`; se o método retornasse `0`, então `true` é retornado, caso contrário, `false` é retornado.

O uso de `compare` em classes wrapper garante que o método `equals` declarado implicitamente seja reflexivo e se comporte consistentemente com o método `hashCode` declarado implicitamente para classes record que possuem componentes de ponto flutuante.

*   Um método `public final int hashCode()` que retorna um valor de hash derivado dos valores de hash de cada componente record de R.

O valor de hash de uma instância `a` de uma classe record em um componente record `c` é o seguinte:

    *   Se o tipo do componente record `c` for um tipo de referência, então o valor de hash é determinado como se fosse invocando o método `hashCode` no valor do campo de componente `c` de `a`.

    *   Se o tipo do componente record `c` for um tipo primitivo T, então o valor de hash é determinado como se fosse submetendo o valor do campo de componente `c` de `a` à conversão boxing (§5.1.7) e então invocando o método `hashCode` da classe wrapper correspondente a T no objeto resultante.

*   Um método `public final String toString()` que retorna uma string derivada do nome da classe record e dos nomes e representações em string de cada componente record de R.

A representação em string de um componente record `c` de uma instância `a` de uma classe record é a seguinte:

    *   Se o tipo do componente record `c` for um tipo de referência, então a representação em string é determinada como se fosse invocando o método `toString` no valor do campo de componente `c` de `a`.

    *   Se o tipo do componente record `c` for um tipo primitivo T, então a representação em string é determinada como se fosse submetendo o valor do campo de componente `c` de `a` à conversão boxing (§5.1.7) e então invocando o método `toString` da classe wrapper correspondente a T no objeto resultante.

Note que a igualdade, os valores de hash e as representações em string são determinados olhando diretamente para os valores dos campos de componente, em vez de invocar métodos acessores.

Considere uma classe record R que possui componentes `c1`, ..., `cn`, e um método acessor declarado implicitamente para cada componente, e um método `equals` declarado implicitamente. Se uma instância `r1` de R for copiada da seguinte forma:
```
    R r2 = new R(r1.c1(), r1.c2(), ..., r1.cn());
    
```

então, assumindo que `r1` não é a referência nula, é sempre o caso que a expressão `r1.equals(r2)` será avaliada como `true`. Métodos acessores e métodos `equals` declarados explicitamente devem respeitar este invariante. Geralmente não é possível para um compilador verificar se os métodos declarados explicitamente respeitam o invariante. A seguinte declaração record é um estilo ruim porque seus métodos acessores cortam os componentes `x` e `y` e, portanto, impedem que `p3` seja `equals` a `p1`:
```
    record SmallPoint(int x, int y) {
        public int x() { return this.x < 100 ? this.x : 100; }
        public int y() { return this.y < 100 ? this.y : 100; }
    
        public static void main(String[] args) {
            SmallPoint p1 = new SmallPoint(200,300);
            SmallPoint p2 = new SmallPoint(200,300);
            System.out.println(p1.equals(p2));  // prints true
    
            SmallPoint p3 = new SmallPoint(p1.x(), p1.y());
            System.out.println(p1.equals(p3));  // prints false
        }
    }
    
```

### 8.10.4. Declarações de Construtores record

Para garantir a inicialização adequada de seus componentes record, uma classe record não declara implicitamente um construtor padrão (§8.8.9). Em vez disso, uma classe record possui um _construtor canônico_, declarado explicitamente ou implicitamente, que inicializa todos os campos de componente da classe record.

Existem duas maneiras de declarar explicitamente um construtor canônico em uma declaração record: declarando um construtor normal com uma assinatura adequada (§8.10.4.1) ou declarando um construtor compacto (§8.10.4.2).

Dada a assinatura de um construtor normal que se qualifica como canônico, e a assinatura derivada para um construtor compacto, as regras de assinaturas de construtores (§8.8.2) significam que é um erro em tempo de compilação se uma declaração record tiver tanto um construtor normal que se qualifica como canônico _quanto_ um construtor compacto.

De qualquer forma, um construtor canônico declarado explicitamente deve fornecer pelo menos o mesmo nível de acesso que a classe record, da seguinte forma:

*   Se a classe record for `public`, então o construtor canônico deve ser `public`; caso contrário, ocorre um erro em tempo de compilação.

*   Se a classe record for `protected`, então o construtor canônico deve ser `protected` ou `public`; caso contrário, ocorre um erro em tempo de compilação.

*   Se a classe record tiver acesso de pacote, então o construtor canônico _não_ deve ser `private`; caso contrário, ocorre um erro em tempo de compilação.

*   Se a classe record for `private`, então o construtor canônico pode ser declarado com qualquer acessibilidade.

Um construtor canônico declarado explicitamente pode ser um construtor de aridade fixa ou um construtor de aridade variável (§8.8.1).

Se um construtor canônico não for declarado explicitamente na declaração de uma classe record R, então um construtor canônico `r` é implicitamente declarado em R com as seguintes propriedades:

*   A assinatura de `r` não possui parâmetros de tipo e possui parâmetros formais dados pela lista de parâmetros formais derivada de R, definida abaixo.

*   `r` possui o mesmo modificador de acesso que R, a menos que R não possua um modificador de acesso, caso em que `r` possui acesso de pacote.

*   `r` não possui cláusula `throws`.

*   O corpo de `r` inicializa cada campo de componente da classe record com o parâmetro formal correspondente de `r`, na ordem em que os componentes record (correspondentes aos campos de componente) aparecem no cabeçalho record.

A _lista de parâmetros formais derivada_ de uma classe record é formada derivando um parâmetro formal de cada componente record no cabeçalho record, em ordem, da seguinte forma:

*   Se o componente record não for um componente record de aridade variável, então o parâmetro formal derivado tem o mesmo nome e tipo declarado que o componente record.

Se o componente record for um componente record de aridade variável, então o parâmetro formal derivado é um parâmetro de aridade variável (§8.4.1) com o mesmo nome e tipo declarado que o componente record.

*   O parâmetro formal derivado é anotado com as anotações, se houver, que aparecem no componente record e cujas interfaces de anotação são aplicáveis no contexto do parâmetro formal, ou em contextos de tipo, ou em ambos (§9.7.4).

Uma declaração record pode conter declarações de construtores que não são construtores canônicos. O corpo de todo construtor não canônico em uma declaração record deve conter uma invocação de construtor alternativa (§8.8.7.1), ou ocorre um erro em tempo de compilação.

#### 8.10.4.1. Construtores Canônicos Normais

Um construtor (não compacto) na declaração da classe record R é o _construtor canônico_ de R se sua assinatura for override-equivalente (§8.4.2) à assinatura do construtor derivada de R.

A _assinatura do construtor derivada_ de uma classe record R é uma assinatura que consiste no nome R, sem parâmetros de tipo, e nos tipos de parâmetros formais derivados do cabeçalho record de R, tomando o tipo declarado de cada componente record em ordem.

Como um construtor canônico tem uma assinatura que é override-equivalente à assinatura do construtor derivada da classe record, pode haver apenas um construtor canônico declarado explicitamente na classe record.

A declaração de um construtor canônico (não compacto) deve satisfazer todas as seguintes condições, ou ocorre um erro em tempo de compilação:

*   Cada parâmetro formal na lista de parâmetros formais deve ter o mesmo nome e tipo declarado que o componente record correspondente.

Um parâmetro formal deve ser um parâmetro de aridade variável se e somente se o componente record correspondente for um componente record de aridade variável.

*   O construtor não deve ser genérico (§8.8.4).

*   O construtor não deve ter uma cláusula `throws`.

*   O corpo do construtor não deve conter uma invocação de construtor explícita (§8.8.7.1).

*   Todas as outras regras para declarações de construtores em uma declaração de classe normal devem ser satisfeitas (§8.8).

Uma consequência dessas regras é que as anotações em um componente record podem diferir das anotações no parâmetro formal correspondente de um construtor canônico declarado explicitamente. Por exemplo, a seguinte declaração record é válida:
```
    import java.lang.annotation.Target;
    import java.lang.annotation.ElementType;
    
    @interface Foo {}
    @interface Bar {}
    
    record Person(@Foo String name) {
        Person(@Bar String name) {
            this.name = name;
        }
    }
    
```

#### 8.10.4.2. Construtores Canônicos Compactos

Uma _declaração de construtor compacto_ é uma forma sucinta de declaração de construtor, disponível apenas em uma declaração record. Ela declara o construtor canônico de uma classe record sem exigir que os componentes record da classe sejam repetidos manualmente como parâmetros formais do construtor.

CompactConstructorDeclaration:

{ConstructorModifier} SimpleTypeName ConstructorBody

As seguintes produções de §8.8, §8.8.3 e §8.8.7 são mostradas aqui para conveniência:

ConstructorModifier:

(um de)   
Annotation `public` `protected` `private`

SimpleTypeName:

TypeIdentifier

ConstructorBody:

`{` [BlockStatements] ConstructorInvocation [BlockStatements] `}`   
`{` [BlockStatements] `}`

É um erro em tempo de compilação para uma declaração record ter mais de uma declaração de construtor compacto.

Os parâmetros formais de um construtor compacto de uma classe record são declarados implicitamente. Eles são dados pela lista de parâmetros formais derivada da classe record (§8.10.4).

O construtor compacto de uma classe record é um construtor de aridade variável (§8.8.1) se a classe record tiver um componente record de aridade variável.

A assinatura de uma declaração de construtor compacto é igual à assinatura do construtor derivada da classe record (§8.10.4.1).

O corpo de uma declaração de construtor compacto deve satisfazer todas as seguintes condições, ou ocorre um erro em tempo de compilação:

*   O corpo não deve conter uma instrução `return` (§14.17).

*   O corpo não deve conter uma invocação de construtor explícita (§8.8.7.1).

*   O corpo não deve conter uma atribuição a um campo de componente da classe record.

*   Todas as outras regras para um construtor em uma declaração de classe normal devem ser satisfeitas (§8.8), _exceto_ pelo requisito de que os campos de componente da classe record devem ser definitivamente atribuídos e, além disso, não definitivamente não atribuídos ao final do construtor compacto (§8.3.1.2).

Se uma declaração record tiver um componente record chamado `c`, então o nome simples `c` no corpo de um construtor compacto denota o parâmetro formal implícito chamado `c`, e não o campo de componente chamado `c`.

Após a última instrução, se houver, no corpo do construtor compacto ter sido concluída normalmente (§14.1), todos os campos de componente da classe record são implicitamente inicializados com os valores dos parâmetros formais correspondentes. Os campos de componente são inicializados na ordem em que os componentes record correspondentes são declarados no cabeçalho record.

A intenção de uma declaração de construtor compacto é que apenas o código para validar ou normalizar parâmetros precise ser fornecido no corpo do construtor; o código de inicialização restante é fornecido pelo compilador. Por exemplo, a seguinte classe record possui um construtor compacto que simplifica um número racional:
```
    record Rational(int num, int denom) {
        private static int gcd(int a, int b) {
            if (b == 0) return Math.abs(a);
            else return gcd(b, a % b);
        }
    
        Rational {
            int gcd = gcd(num, denom);
            num    /= gcd;
            denom  /= gcd;
        }
    }
    
```

O construtor compacto `Rational {...}` se comporta da mesma forma que este construtor normal:
```
    Rational(int num, int denom) {
        int gcd = gcd(num, denom);
        num    /= gcd;
        denom  /= gcd;
        this.num   = num;
        this.denom = denom;
    }
    
```

* * *

Anterior | | Próximo
---|---|---
Capítulo 7. Pacotes e Módulos | Início | Capítulo 9. Interfaces

* * *

 Aviso Legal 