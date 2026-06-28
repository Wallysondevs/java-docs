# Interfaces

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Java SE Specifications](<#/>) > [Java Language Specification](<#/doc/jls/jls-01>)

Capítulo 9. Interfaces
---
[Anterior](<#/doc/jls/jls-08>) | | [Próximo](<#/doc/jls/jls-10>)
  
* * *

# Capítulo 9. Interfaces 

**Sumário**

[9.1. Declarações de Interface](<#/doc/jls/jls-09>)
    

[9.1.1. Modificadores de Interface](<#/doc/jls/jls-09>)
    

[9.1.1.1. Interfaces `abstract`](<#/doc/jls/jls-09>)
[9.1.1.2. Interfaces `strictfp`](<#/doc/jls/jls-09>)
[9.1.1.3. Interfaces `static`](<#/doc/jls/jls-09>)
[9.1.1.4. Interfaces `sealed` e `non-sealed`](<#/doc/jls/jls-09>)
[9.1.2. Interfaces Genéricas e Parâmetros de Tipo](<#/doc/jls/jls-09>)
[9.1.3. Superinterfaces e Subinterfaces](<#/doc/jls/jls-09>)
[9.1.4. Subclasses e Subinterfaces Diretas Permitidas](<#/doc/jls/jls-09>)
[9.1.5. Corpo da Interface e Declarações de Membros](<#/doc/jls/jls-09>)
[9.2. Membros de Interface](<#/doc/jls/jls-09>)
[9.3. Declarações de Campo (Constante)](<#/doc/jls/jls-09>)
    

[9.3.1. Inicialização de Campos em Interfaces](<#/doc/jls/jls-09>)
[9.4. Declarações de Método](<#/doc/jls/jls-09>)
    

[9.4.1. Herança e Sobrescrita](<#/doc/jls/jls-09>)
    

[9.4.1.1. Sobrescrita (por Métodos de Instância)](<#/doc/jls/jls-09>)
[9.4.1.2. Requisitos na Sobrescrita](<#/doc/jls/jls-09>)
[9.4.1.3. Métodos de Herança com Assinaturas Equivalentes para Sobrescrita](<#/doc/jls/jls-09>)
[9.4.2. Sobrecarga](<#/doc/jls/jls-09>)
[9.4.3. Corpo do Método de Interface](<#/doc/jls/jls-09>)
[9.5. Declarações de Classe e Interface Membro](<#/doc/jls/jls-09>)
[9.6. Interfaces de Anotação](<#/doc/jls/jls-09>)
    

[9.6.1. Elementos de Interface de Anotação](<#/doc/jls/jls-09>)
[9.6.2. Padrões para Elementos de Interface de Anotação](<#/doc/jls/jls-09>)
[9.6.3. Interfaces de Anotação Repetíveis](<#/doc/jls/jls-09>)
[9.6.4. Interfaces de Anotação Predefinidas](<#/doc/jls/jls-09>)
    

[9.6.4.1. `@Target`](<#/doc/jls/jls-09>)
[9.6.4.2. `@Retention`](<#/doc/jls/jls-09>)
[9.6.4.3. `@Inherited`](<#/doc/jls/jls-09>)
[9.6.4.4. `@Override`](<#/doc/jls/jls-09>)
[9.6.4.5. `@SuppressWarnings`](<#/doc/jls/jls-09>)
[9.6.4.6. `@Deprecated`](<#/doc/jls/jls-09>)
[9.6.4.7. `@SafeVarargs`](<#/doc/jls/jls-09>)
[9.6.4.8. `@Repeatable`](<#/doc/jls/jls-09>)
[9.6.4.9. `@FunctionalInterface`](<#/doc/jls/jls-09>)
[9.7. Anotações](<#/doc/jls/jls-09>)
    

[9.7.1. Anotações Normais](<#/doc/jls/jls-09>)
[9.7.2. Anotações Marcadoras](<#/doc/jls/jls-09>)
[9.7.3. Anotações de Elemento Único](<#/doc/jls/jls-09>)
[9.7.4. Onde as Anotações Podem Aparecer](<#/doc/jls/jls-09>)
[9.7.5. Múltiplas Anotações da Mesma Interface](<#/doc/jls/jls-09>)
[9.8. Interfaces Funcionais](<#/doc/jls/jls-09>)
[9.9. Tipos de Função](<#/doc/jls/jls-09>)

Uma declaração de interface define uma nova interface que pode ser implementada por uma ou mais classes. Programas podem usar interfaces para fornecer um supertipo comum para classes que de outra forma não estariam relacionadas, e para tornar desnecessário que classes relacionadas compartilhem uma superclasse `abstract` comum.

Interfaces não possuem variáveis de instância e tipicamente declaram um ou mais métodos `abstract`; classes que de outra forma não estariam relacionadas podem implementar uma interface fornecendo implementações para seus métodos `abstract`. Interfaces não podem ser instanciadas diretamente.

Uma _interface de nível superior_ ([§7.6](<#/doc/jls/jls-07>)) é uma interface declarada diretamente em uma unidade de compilação.

Uma _interface aninhada_ é qualquer interface cuja declaração ocorre dentro do corpo de outra declaração de classe ou interface. Uma interface aninhada pode ser uma interface membro ([§8.5](<#/doc/jls/jls-08>), [§9.5](<#/doc/jls/jls-09>)) ou uma interface local ([§14.3](<#/doc/jls/jls-14>)).

Uma _interface de anotação_ ([§9.6](<#/doc/jls/jls-09>)) é uma interface declarada com sintaxe distinta, destinada a ser implementada por representações reflexivas de _anotações_ ([§9.7](<#/doc/jls/jls-09>)).

Este capítulo discute a semântica comum de todas as interfaces. Detalhes específicos para tipos particulares de interfaces são discutidos nas seções dedicadas a essas construções.

Uma interface pode ser declarada como uma _extensão direta_ de uma ou mais outras interfaces, o que significa que ela herda todas as classes e interfaces membro, métodos de instância e campos `static` das interfaces que ela estende, exceto por quaisquer membros que ela possa sobrescrever ou ocultar.

Uma classe pode ser declarada para _implementar diretamente_ uma ou mais interfaces ([§8.1.5](<#/doc/jls/jls-08>)), o que significa que qualquer instância da classe implementa todos os métodos `abstract` especificados pela interface ou interfaces. Uma classe necessariamente implementa todas as interfaces que suas superclasses diretas e superinterfaces diretas implementam. Essa herança (múltipla) de interfaces permite que objetos suportem comportamentos comuns (múltiplos) sem compartilhar uma superclasse.

Ao contrário de uma classe, uma interface não pode ser declarada `final`. No entanto, uma interface pode ser declarada `sealed` ([§9.1.1.4](<#/doc/jls/jls-09>)) para limitar suas subclasses e subinterfaces.

Uma variável cujo tipo declarado é um tipo de interface pode ter como valor uma referência a qualquer instância de uma classe que implementa a interface especificada. Não é suficiente que a classe por acaso implemente todos os métodos `abstract` da interface; a classe ou uma de suas superclasses deve ser realmente declarada para implementar a interface, caso contrário, a classe não é considerada como implementando a interface.

## 9.1. Declarações de Interface

Uma _declaração de interface_ especifica uma interface.

Existem dois tipos de declarações de interface: _declarações de interface normais_ e _declarações de interface de anotação_ ([§9.6](<#/doc/jls/jls-09>)).

InterfaceDeclaration:

[NormalInterfaceDeclaration](<#/doc/jls/jls-09>)   
[AnnotationInterfaceDeclaration](<#/doc/jls/jls-09>)

NormalInterfaceDeclaration:

{[InterfaceModifier](<#/doc/jls/jls-09>)} `interface` [TypeIdentifier](<#/doc/jls/jls-03>) [[TypeParameters](<#/doc/jls/jls-08>)] [[InterfaceExtends](<#/doc/jls/jls-09>)] [[InterfacePermits](<#/doc/jls/jls-09>)] [InterfaceBody](<#/doc/jls/jls-09>)

O _TypeIdentifier_ em uma declaração de interface especifica o nome da interface.

É um erro em tempo de compilação se uma interface tiver o mesmo nome simples que qualquer uma de suas classes ou interfaces envolventes.

O escopo e o sombreamento de uma declaração de interface são especificados em [§6.3](<#/doc/jls/jls-06>) e [§6.4.1](<#/doc/jls/jls-06>).

### 9.1.1. Modificadores de Interface

Uma declaração de interface pode incluir _modificadores de interface_.

InterfaceModifier:

(um de)   
[Annotation](<#/doc/jls/jls-09>) `public` `protected` `private`   
`abstract` `static` `sealed` `non-sealed` `strictfp`

As regras relativas aos modificadores de anotação para uma declaração de interface são especificadas em [§9.7.4](<#/doc/jls/jls-09>) e [§9.7.5](<#/doc/jls/jls-09>).

O modificador de acesso `public` ([§6.6](<#/doc/jls/jls-06>)) se aplica apenas a interfaces de nível superior ([§7.6](<#/doc/jls/jls-07>)) e interfaces membro ([§8.5](<#/doc/jls/jls-08>), [§9.5](<#/doc/jls/jls-09>)), não a interfaces locais ([§14.3](<#/doc/jls/jls-14>)).

Os modificadores de acesso `protected` e `private` se aplicam apenas a interfaces membro.

O modificador `static` se aplica apenas a interfaces membro e interfaces locais.

É um erro em tempo de compilação se a mesma palavra-chave aparecer mais de uma vez como um modificador para uma declaração de interface, ou se uma declaração de interface tiver mais de um dos modificadores de acesso `public`, `protected` e `private`.

É um erro em tempo de compilação se uma declaração de interface tiver mais de um dos modificadores `sealed` e `non-sealed`.

Se dois ou mais modificadores de interface (distintos) aparecerem em uma declaração de interface, é costumeiro, embora não obrigatório, que eles apareçam na ordem consistente com a mostrada acima na produção para _InterfaceModifier_.

#### 9.1.1.1. Interfaces `abstract`

Toda interface é implicitamente `abstract`.

Este modificador é obsoleto e não deve ser usado em código novo.

#### 9.1.1.2. Interfaces `strictfp`

O modificador `strictfp` em uma declaração de interface é obsoleto e não deve ser usado em código novo. Sua presença ou ausência não tem efeito em tempo de compilação ou em tempo de execução.

#### 9.1.1.3. Interfaces `static`

Uma interface aninhada é implicitamente `static`. Ou seja, toda interface membro e interface local é `static`. É permitido que a declaração de uma interface membro especifique redundantemente o modificador `static` ([§9.5](<#/doc/jls/jls-09>)), mas não é permitido para a declaração de uma interface local ([§14.3](<#/doc/jls/jls-14>)).

Como uma interface aninhada é `static`, ela não possui uma instância imediatamente envolvente ([§8.1.3](<#/doc/jls/jls-08>)). Referências de uma interface aninhada a parâmetros de tipo, variáveis de instância, variáveis locais, parâmetros formais, parâmetros de exceção ou métodos de instância em declarações de classe, interface ou método lexicamente envolventes são proibidas ([§6.5.5.1](<#/doc/jls/jls-06>), [§6.5.6.1](<#/doc/jls/jls-06>), [§15.12.3](<#/doc/jls/jls-15>)).

#### 9.1.1.4. Interfaces `sealed` e `non-sealed`

Uma interface pode ser declarada `sealed` se todas as suas subclasses diretas e subinterfaces diretas forem conhecidas quando a interface é declarada ([§9.1.4](<#/doc/jls/jls-09>)), e nenhuma outra subclasse direta ou subinterface direta for desejada ou exigida.

É útil lembrar que uma classe é considerada uma _subclasse direta_ de suas superinterfaces diretas ([§8.1.5](<#/doc/jls/jls-08>)).

Uma interface é _livremente extensível_ se nenhuma de suas superinterfaces diretas for `sealed` ([§9.1.3](<#/doc/jls/jls-09>)), e ela própria não for `sealed`.

Uma interface que possui uma superinterface direta `sealed` é livremente extensível se e somente se for declarada `non-sealed`.

É um erro em tempo de compilação se uma interface tiver uma superinterface direta `sealed` e não for declarada `sealed` ou `non-sealed`.

É um erro em tempo de compilação se uma interface for declarada `non-sealed` mas não tiver uma superinterface direta `sealed`.

### 9.1.2. Interfaces Genéricas e Parâmetros de Tipo

Uma interface é _genérica_ se a declaração da interface declarar uma ou mais variáveis de tipo ([§4.4](<#/doc/jls/jls-04>)).

Essas variáveis de tipo são conhecidas como os _parâmetros de tipo_ da interface. A seção de parâmetros de tipo segue o nome da interface e é delimitada por colchetes angulares.

As seguintes produções de [§8.1.2](<#/doc/jls/jls-08>) e [§4.4](<#/doc/jls/jls-04>) são mostradas aqui para conveniência:

TypeParameters:

`<` [TypeParameterList](<#/doc/jls/jls-08>) `>`

TypeParameterList:

[TypeParameter](<#/doc/jls/jls-04>) {`,` [TypeParameter](<#/doc/jls/jls-04>)} 

TypeParameter:

{[TypeParameterModifier](<#/doc/jls/jls-04>)} [TypeIdentifier](<#/doc/jls/jls-03>) [[TypeBound](<#/doc/jls/jls-04>)] 

TypeParameterModifier:

[Annotation](<#/doc/jls/jls-09>)

TypeBound:

`extends` [TypeVariable](<#/doc/jls/jls-04>)   
`extends` [ClassOrInterfaceType](<#/doc/jls/jls-04>) {[AdditionalBound](<#/doc/jls/jls-04>)} 

AdditionalBound:

`&` [InterfaceType](<#/doc/jls/jls-04>)

As regras relativas aos modificadores de anotação para uma declaração de parâmetro de tipo são especificadas em [§9.7.4](<#/doc/jls/jls-09>) e [§9.7.5](<#/doc/jls/jls-09>).

Na seção de parâmetros de tipo de uma interface, uma variável de tipo T _depende diretamente_ de uma variável de tipo S se S é o limite de T, enquanto T _depende_ de S se T depende diretamente de S ou T depende diretamente de uma variável de tipo U que depende de S (usando esta definição recursivamente). É um erro em tempo de compilação se uma variável de tipo na seção de parâmetros de tipo de uma interface depender de si mesma.

O escopo e o sombreamento do parâmetro de tipo de uma interface são especificados em [§6.3](<#/doc/jls/jls-06>) e [§6.4.1](<#/doc/jls/jls-06>).

Referências ao parâmetro de tipo de uma interface a partir de um contexto `static` ou de uma classe ou interface aninhada são restritas, conforme especificado em [§6.5.5.1](<#/doc/jls/jls-06>).

Uma declaração de interface genérica define um conjunto de tipos parametrizados ([§4.5](<#/doc/jls/jls-04>)), um para cada possível parametrização da seção de parâmetros de tipo por argumentos de tipo. Todos esses tipos parametrizados compartilham a mesma interface em tempo de execução.

### 9.1.3. Superinterfaces e Subinterfaces

Se uma cláusula `extends` for fornecida, a interface que está sendo declarada estende cada um dos tipos de interface especificados e, portanto, herda as classes membro, interfaces membro, métodos de instância e campos `static` de cada um desses tipos de interface.

Os tipos de interface especificados são os _tipos de superinterface diretas_ da interface que está sendo declarada.

Qualquer classe que `implements` a interface declarada também é considerada como implementando todas as interfaces que esta interface `extends`.

InterfaceExtends:

`extends` [InterfaceTypeList](<#/doc/jls/jls-08>)

A seguinte produção de [§8.1.5](<#/doc/jls/jls-08>) é mostrada aqui para conveniência:

InterfaceTypeList:

[InterfaceType](<#/doc/jls/jls-04>) {`,` [InterfaceType](<#/doc/jls/jls-04>)} 

Cada _InterfaceType_ na cláusula `extends` de uma declaração de interface deve nomear uma interface acessível ([§6.6](<#/doc/jls/jls-06>)), ou ocorre um erro em tempo de compilação.

É um erro em tempo de compilação se qualquer _InterfaceType_ nomear uma interface que seja `sealed` ([§9.1.1.4](<#/doc/jls/jls-09>)) e a interface que está sendo declarada não for uma subinterface direta permitida da interface nomeada ([§9.1.4](<#/doc/jls/jls-09>)).

Se um _InterfaceType_ tiver argumentos de tipo, ele deve denotar um tipo parametrizado bem formado ([§4.5](<#/doc/jls/jls-04>)), e nenhum dos argumentos de tipo pode ser argumentos de tipo curinga, ou ocorre um erro em tempo de compilação.

Uma interface é uma _superinterface direta_ de outra interface se a primeira interface for nomeada por um dos tipos de superinterface diretas da segunda interface.

A relação de _superinterface_ é o fecho transitivo da relação de superinterface direta. Uma interface I é uma superinterface da interface K se uma das seguintes condições for verdadeira:

  * I é uma superinterface direta de K. 

  * Onde J é uma superinterface direta de K, I é uma superinterface de J, aplicando esta definição recursivamente. 

Uma interface é considerada uma _subinterface direta_ de sua superinterface direta, e uma _subinterface_ de cada uma de suas superinterfaces.

Embora toda classe seja uma extensão da classe `Object`, não existe uma única interface da qual todas as interfaces sejam extensões.

Uma interface I _depende diretamente_ de uma classe ou interface A se A for mencionada na cláusula `extends` de I, seja como uma superinterface ou como um qualificador na forma totalmente qualificada de um nome de superinterface.

Uma interface I _depende_ de uma classe ou interface A se qualquer uma das seguintes condições for verdadeira:

  * I depende diretamente de A. 

  * I depende diretamente de uma classe C que depende de A ([§8.1.5](<#/doc/jls/jls-08>)). 

  * I depende diretamente de uma interface J que depende de A, aplicando esta definição recursivamente. 

É um erro em tempo de compilação se uma interface depender de si mesma.

Se interfaces declaradas circularmente forem detectadas em tempo de execução, à medida que as interfaces são carregadas, então uma `ClassCircularityError` é lançada ([§12.2.1](<#/doc/jls/jls-12>)).

### 9.1.4. Subclasses e Subinterfaces Diretas Permitidas

A cláusula `permits` opcional em uma declaração de interface normal especifica todas as classes e interfaces destinadas como subclasses diretas e subinterfaces diretas da interface que está sendo declarada ([§9.1.1.4](<#/doc/jls/jls-09>)).

InterfacePermits:

`permits` [TypeName](<#/doc/jls/jls-06>) {`,` [TypeName](<#/doc/jls/jls-06>)} 

É um erro em tempo de compilação se uma declaração de interface tiver uma cláusula `permits` mas nenhum modificador `sealed`.

Cada _TypeName_ deve nomear uma classe ou interface acessível ([§6.6](<#/doc/jls/jls-06>)), ou ocorre um erro em tempo de compilação.

É um erro em tempo de compilação se a mesma classe ou interface for especificada mais de uma vez em uma cláusula `permits`. Isso é verdade mesmo se a classe ou interface for nomeada de maneiras diferentes.

O nome canônico de uma classe ou interface não precisa ser usado em uma cláusula `permits`, mas uma cláusula `permits` só pode especificar uma classe ou interface uma vez. Por exemplo, o seguinte programa falha ao compilar: 
```
    package p;
    
    sealed interface I permits C, D, p.C {}  // error
    
    non-sealed class C implements I {}
    non-sealed class D implements I {}
    
```

Se uma interface `sealed` I estiver associada a um módulo nomeado ([§7.3](<#/doc/jls/jls-07>)), então cada classe ou interface especificada na cláusula `permits` da declaração de I deve estar associada ao mesmo módulo que I, ou ocorre um erro em tempo de compilação.

Se uma interface `sealed` I estiver associada a um módulo sem nome ([§7.7.5](<#/doc/jls/jls-07>)), então cada classe ou interface especificada na cláusula `permits` da declaração de I deve pertencer ao mesmo pacote que I, ou ocorre um erro em tempo de compilação.

Uma interface `sealed` e suas subclasses diretas e subinterfaces diretas precisam se referir umas às outras de forma circular, nas cláusulas `permits`, `implements` e `extends`, respectivamente. Portanto, em uma base de código modular, elas devem ser co-localizadas no mesmo módulo, pois classes e interfaces em módulos diferentes não podem se referir umas às outras de forma circular. A co-localização é desejável em qualquer caso porque uma hierarquia de interface `sealed` deve ser sempre declarada dentro de um único domínio de manutenção, onde o mesmo desenvolvedor ou grupo de desenvolvedores é responsável por manter a hierarquia. Um módulo nomeado tipicamente representa um domínio de manutenção em uma base de código modular.

Se a declaração de uma interface `sealed` I tiver uma cláusula `permits`, então as _subclasses diretas e subinterfaces permitidas_ de I são as classes e interfaces especificadas pela cláusula `permits`.

Cada subclasse direta e subinterface permitida especificada pela cláusula `permits` deve ser uma subclasse direta de I ([§8.1.5](<#/doc/jls/jls-08>)) ou uma subinterface direta de I ([§9.1.3](<#/doc/jls/jls-09>)), ou ocorre um erro em tempo de compilação.

Se a declaração de uma interface `sealed` I não tiver uma cláusula `permits`, então as subclasses diretas e subinterfaces permitidas de I são aquelas classes e interfaces declaradas na mesma unidade de compilação que I ([§7.3](<#/doc/jls/jls-07>)) que possuem um nome canônico ([§6.7](<#/doc/jls/jls-06>)) e cujas superinterfaces diretas incluem I.

Ou seja, as subclasses diretas e subinterfaces permitidas são inferidas como as classes e interfaces na mesma unidade de compilação que especificam I como uma superinterface direta. O requisito para um nome canônico significa que nenhuma classe local, interface local ou classe anônima será considerada.

É um erro em tempo de compilação se a declaração de uma interface `sealed` I não tiver uma cláusula `permits` e I não tiver subclasses diretas ou subinterfaces permitidas.

### 9.1.5. Corpo da Interface e Declarações de Membros

Um _corpo de interface_ pode conter declarações de membros da interface, ou seja, campos ([§9.3](<#/doc/jls/jls-09>)), métodos ([§9.4](<#/doc/jls/jls-09>)), classes e interfaces ([§9.5](<#/doc/jls/jls-09>)).

InterfaceBody:

`{` {[InterfaceMemberDeclaration](<#/doc/jls/jls-09>)} `}`

InterfaceMemberDeclaration:

[ConstantDeclaration](<#/doc/jls/jls-09>)   
[InterfaceMethodDeclaration](<#/doc/jls/jls-09>)   
[ClassDeclaration](<#/doc/jls/jls-08>)   
[InterfaceDeclaration](<#/doc/jls/jls-09>)   
`;`

O escopo de uma declaração de um membro `m` declarado ou herdado por uma interface I é especificado em [§6.3](<#/doc/jls/jls-06>).
## 9.2. Membros de Interface

Os membros de uma interface são:

*   Membros declarados no corpo da declaração da interface ([§9.1.5](<#/doc/jls/jls-09>)).
*   Membros herdados de quaisquer tipos de superinterfaces diretas ([§9.1.3](<#/doc/jls/jls-09>)).
*   Se uma interface não possui tipos de superinterfaces diretas, então a interface declara implicitamente um método membro `public` `abstract` `m` com assinatura s, tipo de retorno r, e cláusula `throws` t correspondente a cada método de instância `public` `m` com assinatura s, tipo de retorno r, e cláusula `throws` t declarados em `Object` ([§4.3.2](<#/doc/jls/jls-04>)), a menos que um método `abstract` com a mesma assinatura, mesmo tipo de retorno e uma cláusula `throws` compatível seja explicitamente declarado pela interface.

É um erro em tempo de compilação se a interface declara explicitamente tal método `m` no caso em que `m` é declarado como `final` em `Object`.

É um erro em tempo de compilação se a interface declara explicitamente um método com uma assinatura que é equivalente para sobrescrita ([§8.4.2](<#/doc/jls/jls-08>)) a um método `public` de `Object`, mas que possui um tipo de retorno diferente, ou uma cláusula `throws` incompatível, ou não é `abstract`.

A interface herda, das interfaces que ela estende, todos os membros dessas interfaces, exceto por (i) campos, classes e interfaces que ela oculta, (ii) métodos `abstract` e métodos default que ela sobrescreve ([§9.4.1](<#/doc/jls/jls-09>)), (iii) métodos `private`, e (iv) métodos `static`.

Campos, métodos, classes membro e interfaces membro de uma interface podem ter o mesmo nome, uma vez que são usados em contextos diferentes e são desambiguados por diferentes procedimentos de busca ([§6.5](<#/doc/jls/jls-06>)). No entanto, isso é desencorajado como uma questão de estilo.

## 9.3. Declarações de Campo (Constante)

ConstantDeclaration:

{[ConstantModifier](<#/doc/jls/jls-09>)} [UnannType](<#/doc/jls/jls-08>) [VariableDeclaratorList](<#/doc/jls/jls-08>) `;`

ConstantModifier:

(um de)
[Annotation](<#/doc/jls/jls-09>) `public`
`static` `final`

Veja [§8.3](<#/doc/jls/jls-08>) para _UnannType_. As seguintes produções de [§4.3](<#/doc/jls/jls-04>) e [§8.3](<#/doc/jls/jls-08>) são mostradas aqui para conveniência:

VariableDeclaratorList:

[VariableDeclarator](<#/doc/jls/jls-08>) {`,` [VariableDeclarator](<#/doc/jls/jls-08>)}

VariableDeclarator:

[VariableDeclaratorId](<#/doc/jls/jls-08>) [`=` [VariableInitializer](<#/doc/jls/jls-08>)]

VariableDeclaratorId:

[Identifier](<#/doc/jls/jls-03>) [[Dims](<#/doc/jls/jls-04>)]
`_`

Dims:

{[Annotation](<#/doc/jls/jls-09>)} `[` `]` {{[Annotation](<#/doc/jls/jls-09>)} `[` `]`}

VariableInitializer:

[Expression](<#/doc/jls/jls-15>)
[ArrayInitializer](<#/doc/jls/jls-10>)

As regras relativas aos modificadores de anotação para uma declaração de campo de interface são especificadas em [§9.7.4](<#/doc/jls/jls-09>) e [§9.7.5](<#/doc/jls/jls-09>).

Toda declaração de campo no corpo de uma declaração de interface é implicitamente `public`, `static` e `final`. É permitido especificar redundantemente qualquer ou todos esses modificadores para tais campos.

É um erro em tempo de compilação se a mesma palavra-chave aparecer mais de uma vez como um modificador para uma declaração de campo.

Se dois ou mais modificadores de campo (distintos) aparecerem em uma declaração de campo, é costumeiro, embora não obrigatório, que eles apareçam na ordem consistente com a mostrada acima na produção para _ConstantModifier_.

O tipo declarado de um campo é denotado por _UnannType_ se nenhum par de colchetes aparecer em _UnannType_ e _VariableDeclaratorId_ , e é especificado por [§10.2](<#/doc/jls/jls-10>) caso contrário.

Toda declaração de um campo de interface deve incluir um _Identifier_ , ou ocorrerá um erro em tempo de compilação.

O escopo e o sombreamento de uma declaração de campo de interface são especificados em [§6.3](<#/doc/jls/jls-06>) e [§6.4.1](<#/doc/jls/jls-06>).

Como um campo de interface é `static`, sua declaração introduz um contexto estático ([§8.1.3](<#/doc/jls/jls-08>)), o que limita o uso de construções que se referem ao objeto atual. Notavelmente, as palavras-chave `this` e `super` são proibidas em um contexto estático ([§15.8.3](<#/doc/jls/jls-15>), [§15.11.2](<#/doc/jls/jls-15>)), assim como referências não qualificadas a variáveis de instância, métodos de instância e parâmetros de tipo de declarações lexicamente envolventes ([§6.5.5.1](<#/doc/jls/jls-06>), [§6.5.6.1](<#/doc/jls/jls-06>), [§15.12.3](<#/doc/jls/jls-15>)).

É um erro em tempo de compilação para o corpo de uma declaração de interface declarar dois campos com o mesmo nome.

Se a interface declara um campo com um certo nome, então a declaração desse campo é dita _ocultar_ quaisquer e todas as declarações acessíveis de campos com o mesmo nome em superinterfaces da interface.

É possível para uma interface herdar mais de um campo com o mesmo nome. Tal situação não causa, por si só, um erro em tempo de compilação. No entanto, qualquer tentativa dentro do corpo da declaração da interface de se referir a qualquer campo por seu nome simples resultará em um erro em tempo de compilação, porque a referência é ambígua.

Pode haver vários caminhos pelos quais a mesma declaração de campo é herdada de uma interface. Em tal situação, o campo é considerado herdado apenas uma vez, e pode ser referido por seu nome simples sem ambiguidade.

**Exemplo 9.3-1. Campos Herdados Ambíguos**

Se dois campos com o mesmo nome são herdados por uma interface porque, por exemplo, duas de suas superinterfaces diretas declaram campos com esse nome, então um único membro ambíguo resulta. Qualquer uso deste membro ambíguo resultará em um erro em tempo de compilação. No programa:
```java
    interface BaseColors {
        int RED = 1, GREEN = 2, BLUE = 4;
    }
    interface RainbowColors extends BaseColors {
        int YELLOW = 3, ORANGE = 5, INDIGO = 6, VIOLET = 7;
    }
    interface PrintColors extends BaseColors {
        int YELLOW = 8, CYAN = 16, MAGENTA = 32;
    }
    interface LotsOfColors extends RainbowColors, PrintColors {
        int FUCHSIA = 17, VERMILION = 43, CHARTREUSE = RED+90;
    }
```

a interface `LotsOfColors` herda dois campos chamados `YELLOW`. Isso está correto, desde que a interface não contenha nenhuma referência por nome simples ao campo `YELLOW`. (Tal referência poderia ocorrer dentro de um inicializador de variável para um campo.)

Mesmo que a interface `PrintColors` atribuísse o valor `3` a `YELLOW` em vez do valor `8`, uma referência ao campo `YELLOW` dentro da interface `LotsOfColors` ainda seria considerada ambígua.

**Exemplo 9.3-2. Campos Herdados Multiplamente**

Se um único campo é herdado múltiplas vezes da mesma interface porque, por exemplo, tanto esta interface quanto uma das superinterfaces diretas desta interface estendem a interface que declara o campo, então apenas um único membro resulta. Esta situação não causa, por si só, um erro em tempo de compilação.

No exemplo anterior, os campos `RED`, `GREEN` e `BLUE` são herdados pela interface `LotsOfColors` de mais de uma maneira, através da interface `RainbowColors` e também através da interface `PrintColors`, mas a referência ao campo `RED` na interface `LotsOfColors` não é considerada ambígua porque apenas uma declaração real do campo `RED` está envolvida.

### 9.3.1. Inicialização de Campos em Interfaces

Todo declarador em uma declaração de campo de uma interface deve ter um inicializador de variável, ou ocorrerá um erro em tempo de compilação.

O inicializador não precisa ser uma expressão constante ([§15.29](<#/doc/jls/jls-15>)).

É um erro em tempo de compilação se o inicializador de um campo de interface usa o nome simples do mesmo campo ou de outro campo cuja declaração ocorre à direita do inicializador ([§3.5](<#/doc/jls/jls-03>)) na mesma interface.

O inicializador de um campo de interface não pode se referir ao objeto atual usando a palavra-chave `this` ou a palavra-chave `super`, conforme especificado em [§15.8.3](<#/doc/jls/jls-15>), [§15.11.2](<#/doc/jls/jls-15>), e [§15.12.3](<#/doc/jls/jls-15>)).

Em tempo de execução, o inicializador é avaliado e a atribuição do campo é realizada exatamente uma vez, quando a interface é inicializada ([§12.4.2](<#/doc/jls/jls-12>)).

Note que os campos de interface que são variáveis constantes ([§4.12.4](<#/doc/jls/jls-04>)) são inicializados antes de outros campos de interface. Isso também se aplica a campos `static` que são variáveis constantes em classes ([§8.3.2](<#/doc/jls/jls-08>)). Tais campos nunca serão observados com seus valores iniciais padrão ([§4.12.5](<#/doc/jls/jls-04>)), mesmo por programas ardilosos.

**Exemplo 9.3.1-1. Referência Antecipada a um Campo**
```java
    interface Test {
        float f = j;
        int   j = 1;
        int   k = k + 1;
    }
```

Este programa causa dois erros em tempo de compilação, porque `j` é referenciado na inicialização de `f` antes de `j` ser declarado, e porque a inicialização de `k` se refere a `k` a si mesmo.

## 9.4. Declarações de Método

InterfaceMethodDeclaration:

{[InterfaceMethodModifier](<#/doc/jls/jls-09>)} [MethodHeader](<#/doc/jls/jls-08>) [MethodBody](<#/doc/jls/jls-08>)

InterfaceMethodModifier:

(um de)
[Annotation](<#/doc/jls/jls-09>) `public` `private`
`abstract` `default` `static` `strictfp`

As seguintes produções de [§8.4](<#/doc/jls/jls-08>), [§8.4.5](<#/doc/jls/jls-08>), e [§8.4.7](<#/doc/jls/jls-08>) são mostradas aqui para conveniência:

MethodHeader:

[Result](<#/doc/jls/jls-08>) [MethodDeclarator](<#/doc/jls/jls-08>) [[Throws](<#/doc/jls/jls-08>)]
[TypeParameters](<#/doc/jls/jls-08>) {[Annotation](<#/doc/jls/jls-09>)} [Result](<#/doc/jls/jls-08>) [MethodDeclarator](<#/doc/jls/jls-08>) [[Throws](<#/doc/jls/jls-08>)]

Result:

[UnannType](<#/doc/jls/jls-08>)
`void`

MethodDeclarator:

[Identifier](<#/doc/jls/jls-03>) `(` [[ReceiverParameter](<#/doc/jls/jls-08>) `,`] [[FormalParameterList](<#/doc/jls/jls-08>)] `)` [[Dims](<#/doc/jls/jls-04>)]

MethodBody:

[Block](<#/doc/jls/jls-14>)
`;`

As regras relativas aos modificadores de anotação para uma declaração de método de interface são especificadas em [§9.7.4](<#/doc/jls/jls-09>) e [§9.7.5](<#/doc/jls/jls-09>).

Um método no corpo de uma declaração de interface pode ser declarado `public` ou `private` ([§6.6](<#/doc/jls/jls-06>)). Se nenhum modificador de acesso for fornecido, o método é implicitamente `public`. É permitido, mas desencorajado como uma questão de estilo, especificar redundantemente o modificador `public` para uma declaração de método em uma declaração de interface.

Um _método default_ é um método de instância declarado em uma interface com o modificador `default`. Seu corpo é sempre representado por um bloco, que fornece uma implementação padrão para qualquer classe que implementa a interface sem sobrescrever o método. Métodos default são distintos de métodos concretos ([§8.4.3.1](<#/doc/jls/jls-08>)), que são declarados em classes, e de métodos de interface `private`, que não são herdados nem sobrescritos.

Uma interface pode declarar métodos `static`, que são invocados sem referência a um objeto específico. Métodos de interface `static` são distintos de métodos default, métodos de interface `abstract` e métodos de interface `private` não-`static`, todos os quais são métodos de instância.

A declaração de um método de interface `static` introduz um contexto estático ([§8.1.3](<#/doc/jls/jls-08>)), o que limita o uso de construções que se referem ao objeto atual. Notavelmente, as palavras-chave `this` e `super` são proibidas em um contexto estático ([§15.8.3](<#/doc/jls/jls-15>), [§15.11.2](<#/doc/jls/jls-15>)), assim como referências não qualificadas a variáveis de instância, métodos de instância e parâmetros de tipo de declarações lexicamente envolventes ([§6.5.5.1](<#/doc/jls/jls-06>), [§6.5.6.1](<#/doc/jls/jls-06>), [§15.12.3](<#/doc/jls/jls-15>)).

Referências a um método de instância a partir de um contexto estático ou de uma classe ou interface aninhada são restritas ([§15.12.3](<#/doc/jls/jls-15>)).

O modificador `strictfp` em uma declaração de método de interface é obsoleto e não deve ser usado em código novo. Sua presença ou ausência não tem efeito em tempo de execução.

Um método de interface que não possui um modificador `private`, `default` ou `static` é implicitamente `abstract`. Seu corpo é representado por um ponto e vírgula, não por um bloco. É permitido, mas desencorajado como uma questão de estilo, especificar redundantemente o modificador `abstract` para tal declaração de método.

Note que um método de interface não pode ser declarado com acesso `protected` ou de pacote, ou com os modificadores `final`, `synchronized` ou `native`.

É um erro em tempo de compilação se a mesma palavra-chave aparecer mais de uma vez como um modificador para uma declaração de método de interface, ou se uma declaração de método de interface tiver mais de um dos modificadores de acesso `public` e `private` ([§6.6](<#/doc/jls/jls-06>)).

É um erro em tempo de compilação se uma declaração de método de interface tiver mais de uma das palavras-chave `abstract`, `default` ou `static`.

É um erro em tempo de compilação se uma declaração de método de interface que contém a palavra-chave `private` também contém a palavra-chave `abstract` ou `default`. É permitido que uma declaração de método de interface contenha `private` e `static`.

É um erro em tempo de compilação se uma declaração de método de interface que contém a palavra-chave `abstract` também contém a palavra-chave `strictfp`.

É um erro em tempo de compilação para o corpo de uma declaração de interface declarar, explicitamente ou implicitamente, dois métodos com assinaturas equivalentes para sobrescrita ([§8.4.2](<#/doc/jls/jls-08>)). No entanto, uma interface pode herdar vários métodos `abstract` com tais assinaturas ([§9.4.1](<#/doc/jls/jls-09>)).

Um método declarado em uma interface pode ser genérico. As regras para parâmetros de tipo de um método genérico em uma interface são as mesmas que para um método genérico em uma classe ([§8.4.4](<#/doc/jls/jls-08>)).

### 9.4.1. Herança e Sobrescrita

Uma interface I _herda_ de seus tipos de superinterfaces diretas todos os métodos `abstract` e default `m` para os quais todas as seguintes condições são verdadeiras:

*   `m` é um membro de um tipo de superinterface direta de I, J.
*   Nenhum método declarado em I possui uma assinatura que é uma subassinatura ([§8.4.2](<#/doc/jls/jls-08>)) da assinatura de `m` como membro de J.
*   Não existe um método `m'` que seja membro de uma superinterface direta de I, J' (`m` distinto de `m'`, J distinto de J'), tal que `m'` sobrescreva da interface de J' a declaração do método `m` ([§9.4.1.1](<#/doc/jls/jls-09>)).

Note que os métodos são sobrescritos com base em assinatura por assinatura. Se, por exemplo, uma interface declara dois métodos `public` com o mesmo nome ([§9.4.2](<#/doc/jls/jls-09>)), e uma subinterface sobrescreve um deles, a subinterface ainda herda o outro método.

A terceira cláusula acima impede que uma subinterface re-herde um método que já foi sobrescrito por outra de suas superinterfaces. Por exemplo, neste programa:
```java
    interface Top {
        default String name() { return "unnamed"; }
    }
    interface Left extends Top {
        default String name() { return getClass().getName(); }
    }
    interface Right extends Top {}

    interface Bottom extends Left, Right {}
```

`Right` herda `name()` de `Top`, mas `Bottom` herda `name()` de `Left`, não de `Right`. Isso ocorre porque `name()` de `Left` sobrescreve a declaração de `name()` em `Top`.

Uma interface não herda métodos `private` ou `static` de suas superinterfaces.

Se uma interface I declara um método `private` ou `static` `m`, e a assinatura de `m` é uma subassinatura de um método de instância `public` `m'` em um tipo de superinterface de I, e `m'` seria de outra forma acessível ao código em I, então ocorre um erro em tempo de compilação.

Em essência, um método `static` em uma interface não pode ocultar um método de instância em um tipo de superinterface. Isso é semelhante à regra em [§8.4.8.2](<#/doc/jls/jls-08>) pela qual um método `static` em uma classe não pode ocultar um método de instância em um tipo de superclasse ou tipo de superinterface. Note que a regra em [§8.4.8.2](<#/doc/jls/jls-08>) fala de uma classe que "declara ou herda um método `static`", enquanto a regra acima fala apenas de uma interface que "declara um método `static`", já que uma interface não pode herdar um método `static`. Observe também que a regra em [§8.4.8.2](<#/doc/jls/jls-08>) permite ocultar métodos de instância e `static` em superclasses/superinterfaces, enquanto a regra acima considera apenas métodos de instância `public` em tipos de superinterfaces.

Da mesma forma, um método `private` em uma interface não pode sobrescrever um método de instância - seja `public` ou `private` - em um tipo de superinterface. Isso é semelhante às regras em [§8.4.8.1](<#/doc/jls/jls-08>) e [§8.4.8.3](<#/doc/jls/jls-08>) pelas quais um método `private` em uma classe não pode sobrescrever nenhum método de instância em um tipo de superclasse ou tipo de superinterface, porque [§8.4.8.1](<#/doc/jls/jls-08>) exige que o método sobrescrito não seja `private` e [§8.4.8.3](<#/doc/jls/jls-08>) exige que o método sobrescritor forneça pelo menos o mesmo nível de acesso que o método sobrescrito. Em resumo, apenas métodos `public` em interfaces podem ser sobrescritos, e apenas por métodos `public` em subinterfaces ou em classes implementadoras.

#### 9.4.1.1. Sobrescrita (por Métodos de Instância)

Um método de instância `mI` declarado ou herdado pela interface I, _sobrescreve de I_ outro método de instância `mJ` declarado na interface J, se e somente se todas as seguintes condições forem verdadeiras:

*   I é uma subinterface de J.
*   I não herda `mJ`.
*   A assinatura de `mI` é uma subassinatura ([§8.4.2](<#/doc/jls/jls-08>)) da assinatura de `mJ` como membro do supertipo de I que nomeia J.
*   `mJ` é `public`.

A presença ou ausência do modificador `strictfp` não tem absolutamente nenhum efeito nas regras para sobrescrever métodos. Por exemplo, é permitido que um método que não é `strictfp` sobrescreva um método `strictfp`, e é permitido que um método `strictfp` sobrescreva um método que não é `strictfp`.

Um método default sobrescrito pode ser acessado usando uma expressão de invocação de método ([§15.12](<#/doc/jls/jls-15>)) que contém a palavra-chave `super` qualificada por um nome de superinterface.

#### 9.4.1.2. Requisitos na Sobrescrita

A relação entre o tipo de retorno de um método de interface e os tipos de retorno de quaisquer métodos de interface sobrescritos é especificada em [§8.4.8.3](<#/doc/jls/jls-08>).

A relação entre a cláusula `throws` de um método de interface e as cláusulas `throws` de quaisquer métodos de interface sobrescritos é especificada em [§8.4.8.3](<#/doc/jls/jls-08>).

A relação entre a assinatura de um método de interface e as assinaturas de quaisquer métodos de interface sobrescritos é especificada em [§8.4.8.3](<#/doc/jls/jls-08>).

A relação entre a acessibilidade de um método de interface e a acessibilidade de quaisquer métodos de interface sobrescritos é especificada em [§8.4.8.3](<#/doc/jls/jls-08>).

É um erro em tempo de compilação se um método default é equivalente para sobrescrita ([§8.4.2](<#/doc/jls/jls-08>)) com um método não-`private` da classe `Object`, porque qualquer classe que implementa a interface herdará sua própria implementação do método.

A proibição de declarar um dos métodos de `Object` como um método default pode ser surpreendente. Existem, afinal, casos como `java.util.List` em que o comportamento de `toString` e `equals` são precisamente definidos. A motivação se torna mais clara, no entanto, quando algumas decisões de design mais amplas são compreendidas:

*   Primeiro, métodos herdados de uma superclasse podem sobrescrever métodos herdados de superinterfaces ([§8.4.8.1](<#/doc/jls/jls-08>)). Assim, toda classe implementadora sobrescreveria automaticamente o `toString` default de uma interface. Este é um comportamento de longa data na linguagem de programação Java. Não é algo que desejamos mudar com o design de métodos default, porque isso entraria em conflito com o objetivo de permitir que as interfaces evoluam de forma discreta, fornecendo comportamento default apenas quando uma classe ainda não o possui através da hierarquia de classes.
*   Segundo, interfaces _não_ herdam de `Object`, mas sim declaram implicitamente muitos dos mesmos métodos que `Object` ([§9.2](<#/doc/jls/jls-09>)). Assim, não há um ancestral comum para o `toString` declarado em `Object` e o `toString` declarado em uma interface. Na melhor das hipóteses, se ambos fossem candidatos para herança por uma classe, eles entrariam em conflito. Contornar esse problema exigiria uma mistura desajeitada das árvores de herança de classes e interfaces.
*   Terceiro, casos de uso para declarar métodos de `Object` em interfaces tipicamente assumem uma hierarquia de interface linear; o recurso não se generaliza muito bem para cenários de herança múltipla.
*   Quarto, os métodos de `Object` são tão fundamentais que parece perigoso permitir que uma superinterface arbitrária adicione silenciosamente um método default que altere seu comportamento.

Uma interface é livre, no entanto, para definir outro método que forneça um comportamento útil para classes que sobrescrevem os métodos de `Object`. Por exemplo, a interface `java.util.List` poderia declarar um método `elementString` que produz a string descrita pelo contrato de `toString`; implementadores de `toString` em classes poderiam então delegar a este método.

#### 9.4.1.3. Herdando Métodos com Assinaturas Equivalentes para Sobrescrita

É possível para uma interface herdar vários métodos com assinaturas equivalentes para sobrescrita ([§8.4.2](<#/doc/jls/jls-08>)).

Se uma interface I herda um método default cuja assinatura é equivalente para sobrescrita com outro método herdado por I, então ocorre um erro em tempo de compilação. (Este é o caso, seja o outro método `abstract` ou `default`.)

Caso contrário, todos os métodos herdados são `abstract`, e a interface é considerada como herdando todos os métodos.

Um dos métodos herdados deve ser substituível pelo tipo de retorno para cada outro método herdado, ou então ocorre um erro em tempo de compilação. (As cláusulas `throws` não causam erros neste caso.)

Pode haver vários caminhos pelos quais a mesma declaração de método é herdada de uma interface. Este fato não causa dificuldade e nunca, por si só, resulta em um erro em tempo de compilação.

Naturalmente, quando dois métodos default diferentes com assinaturas correspondentes são herdados por uma subinterface, há um conflito comportamental. Nós detectamos ativamente este conflito e notificamos o programador com um erro, em vez de esperar que o problema surja quando uma classe concreta é compilada. O erro pode ser evitado declarando um novo método que sobrescreve, e assim impede a herança de, todos os métodos conflitantes.

Similarmente, quando um método `abstract` e um método `default` com assinaturas correspondentes são herdados por uma subinterface, nós produzimos um erro. Neste caso, seria possível dar prioridade a um ou outro - talvez assumiríamos que o método default fornece uma implementação razoável para o método `abstract`. Mas isso é arriscado, pois, além do nome e assinatura coincidentes, não temos razão para acreditar que o método default se comporta consistentemente com o contrato do método `abstract` - o método default pode nem ter existido quando a subinterface foi originalmente desenvolvida. É mais seguro nesta situação pedir ao usuário que afirme ativamente que a implementação default é apropriada (através de uma declaração de sobrescrita).

Em contraste, o comportamento de longa data para métodos concretos herdados em classes é que eles sobrescrevem métodos `abstract` declarados em interfaces (veja [§8.4.8](<#/doc/jls/jls-08>)). O mesmo argumento sobre potencial violação de contrato se aplica aqui, mas neste caso há um desequilíbrio inerente entre classes e interfaces. Preferimos, para preservar a natureza independente das hierarquias de classes, minimizar os conflitos entre classes e interfaces simplesmente dando prioridade aos métodos concretos.

### 9.4.2. Sobrecarga

Se dois métodos de uma interface (seja ambos declarados na mesma interface, ou ambos herdados por uma interface, ou um declarado e um herdado) têm o mesmo nome, mas assinaturas diferentes que não são equivalentes para sobrescrita ([§8.4.2](<#/doc/jls/jls-08>)), então o nome do método é dito ser _sobrecarregado_.

Este fato não causa dificuldade e nunca, por si só, resulta em um erro em tempo de compilação. Não há relação exigida entre os tipos de retorno ou entre as cláusulas `throws` de dois métodos com o mesmo nome, mas assinaturas diferentes que não são equivalentes para sobrescrita.

**Exemplo 9.4.2-1. Sobrecarga de uma Declaração de Método `abstract`
```java
    interface PointInterface {
        void move(int dx, int dy);
    }
    interface RealPointInterface extends PointInterface {
        void move(float dx, float dy);
        void move(double dx, double dy);
    }
```

Aqui, o método chamado `move` é sobrecarregado na interface `RealPointInterface` com três assinaturas diferentes, duas delas declaradas e uma herdada. Qualquer classe não-`abstract` que implementa a interface `RealPointInterface` deve fornecer implementações de todas as três assinaturas de método.

### 9.4.3. Corpo do Método de Interface

Um método default possui um corpo de bloco. Este bloco de código fornece uma implementação do método caso uma classe implemente a interface, mas não forneça sua própria implementação do método.

Um método de interface `private` ou `static` também possui um corpo de bloco, que fornece a implementação do método.

É um erro em tempo de compilação se uma declaração de método de interface é `abstract` (explicitamente ou implicitamente) e possui um bloco como seu corpo.

É um erro em tempo de compilação se uma declaração de método de interface é `default`, `private` ou `static`, e possui um ponto e vírgula como seu corpo.

As regras para as instruções `return` em um corpo de método são especificadas em [§14.17](<#/doc/jls/jls-14>).

Se um método é declarado para ter um tipo de retorno ([§8.4.5](<#/doc/jls/jls-08>)), então ocorre um erro em tempo de compilação se o corpo do método pode completar normalmente ([§14.1](<#/doc/jls/jls-14>)).
## 9.5. Declarações de Classes e Interfaces Membro

O corpo de uma interface ([§9.1.5](<#/doc/jls/jls-09>)) pode conter declarações de classes membro e interfaces membro ([§8.5](<#/doc/jls/jls-08>)).

Toda declaração de classe ou interface membro no corpo de uma declaração de interface é implicitamente `public` e `static` ([§9.1.1.3](<#/doc/jls/jls-09>)). É permitido especificar redundantemente um ou ambos esses modificadores.

É um erro em tempo de compilação se uma declaração de classe ou interface membro em uma interface tiver o modificador `protected` ou `private`.

As regras para modificadores de uma declaração de classe membro no corpo de uma declaração de interface são especificadas em [§8.1.1](<#/doc/jls/jls-08>).

As regras para modificadores de uma declaração de interface membro no corpo de uma declaração de interface são especificadas em [§9.1.1](<#/doc/jls/jls-09>).

Se uma interface declara uma classe ou interface membro com um certo nome, então a declaração da classe ou interface membro é dita _ocultar_ todas e quaisquer declarações acessíveis de classes e interfaces membro com o mesmo nome em superinterfaces da interface.

Uma interface herda de suas superinterfaces diretas todas as classes e interfaces membro das superinterfaces diretas que não são ocultadas por uma declaração na interface.

É possível que uma interface herde mais de uma classe ou interface membro com o mesmo nome. Tal situação não causa, por si só, um erro em tempo de compilação. No entanto, qualquer tentativa dentro do corpo da interface de se referir a qualquer classe ou interface membro por seu nome simples resultará em um erro em tempo de compilação, porque a referência é ambígua.

Pode haver vários caminhos pelos quais a mesma declaração de classe ou interface membro é herdada de uma interface. Em tal situação, a classe ou interface membro é considerada herdada apenas uma vez, e pode ser referenciada por seu nome simples sem ambiguidade.

## 9.6. Interfaces de Anotação

Uma _declaração de interface de anotação_ especifica uma _interface de anotação_, um tipo especializado de interface. Para distinguir uma declaração de interface de anotação de uma declaração de interface normal, a palavra-chave `interface` é precedida por um sinal de arroba (`@`).

AnnotationInterfaceDeclaration:

{[InterfaceModifier](<#/doc/jls/jls-09>)} `@` `interface` [TypeIdentifier](<#/doc/jls/jls-03>) [AnnotationInterfaceBody](<#/doc/jls/jls-09>)

Note que o sinal de arroba (`@`) e a palavra-chave `interface` são tokens distintos. É possível separá-los com espaço em branco, mas isso é desencorajado como uma questão de estilo.

A menos que explicitamente modificadas nesta seção e suas subseções, todas as regras que se aplicam às declarações de interface normais ([§9.1](<#/doc/jls/jls-09>)) se aplicam às declarações de interface de anotação.

Por exemplo, as declarações de interface de anotação têm as mesmas regras de escopo que as declarações de interface normais.

É um erro em tempo de compilação se uma declaração de interface de anotação tiver o modificador `sealed` ou `non-sealed` ([§9.1.1.4](<#/doc/jls/jls-09>)).

Uma declaração de interface de anotação pode especificar uma interface de nível superior ou uma interface membro, mas não uma interface local ([§14.3](<#/doc/jls/jls-14>)).

Uma declaração de interface de anotação não é permitida sintaticamente de aparecer dentro de um bloco, em virtude da produção _LocalClassOrInterfaceDeclaration_ em [§14.3](<#/doc/jls/jls-14>).

É um erro em tempo de compilação se uma declaração de interface de anotação aparecer direta ou indiretamente no corpo de uma classe local, interface local ou declaração de classe anônima ([§14.3](<#/doc/jls/jls-14>), [§15.9.5](<#/doc/jls/jls-15>)).

Esta regra, juntamente com a restrição sintática sobre declarações de interface de anotação mencionada acima, garante que uma interface de anotação sempre tenha um nome canônico ([§6.7](<#/doc/jls/jls-06>)). Ter tal nome é importante porque o propósito de uma interface de anotação é ser usada por anotações em outras unidades de compilação. Como uma classe ou interface local não tem um nome canônico, uma interface de anotação declarada em qualquer lugar dentro de seu corpo sintático (se isso fosse permitido) também não teria um nome canônico.

O código a seguir mostra o efeito desta regra e da restrição sintática relacionada:
```java
    class C {
        @interface A1 {}  /* Legal: an annotation interface can be a
                             member interface */
    
        void m() {
            @interface A2 {}  /* Illegal: an annotation interface cannot
                                 be a local interface */
    
            class D {
                @interface A3 {}  /* Illegal: an annotation interface
                                     cannot be specified anywhere within
                                     the body of local class D */
    
                class E {
                    @interface A4 {}
                      /* Illegal: an annotation interface cannot be
                         specified anywhere within the body of local class
                         D, even as a member of a class E nested in D */
                }
            }
        }
    }
    
    
```

Uma interface de anotação nunca é genérica ([§9.1.2](<#/doc/jls/jls-09>)).

Ao contrário de uma declaração de interface normal, uma declaração de interface de anotação não pode declarar nenhuma variável de tipo, em virtude da produção _AnnotationTypeDeclaration_.

O tipo de superinterface direta de uma interface de anotação é sempre `java.lang.annotation.Annotation` ([§9.1.3](<#/doc/jls/jls-09>)).

Ao contrário de uma declaração de interface normal, uma declaração de interface de anotação não pode escolher o tipo de superinterface direta através de uma cláusula `extends`, em virtude da produção _AnnotationTypeDeclaration_.

Uma consequência do fato de que uma declaração de interface de anotação não especifica explicitamente um tipo de superinterface via `extends` é que uma subinterface de uma interface de anotação nunca é, por si só, uma interface de anotação, uma vez que a declaração da subinterface necessariamente usa uma cláusula `extends`. Da mesma forma, `java.lang.annotation.Annotation` não é, por si só, uma interface de anotação.

Uma interface de anotação herda vários métodos de `java.lang.annotation.Annotation`, incluindo os métodos declarados implicitamente correspondentes aos métodos de instância de `Object` ([§9.2](<#/doc/jls/jls-09>)), mas esses métodos não definem elementos da interface de anotação ([§9.6.1](<#/doc/jls/jls-09>)).

Como esses métodos não definem elementos da interface de anotação, é ilegal usá-los em anotações que estejam em conformidade com a interface de anotação ([§9.7](<#/doc/jls/jls-09>)). Sem esta regra, não poderíamos garantir que os elementos fossem dos tipos representáveis em anotações, ou que os métodos acessores para eles estariam disponíveis.

### 9.6.1. Elementos da Interface de Anotação

O corpo de uma declaração de interface de anotação pode conter declarações de método, cada uma das quais define um _elemento_ da interface de anotação. Uma interface de anotação não tem outros elementos além daqueles definidos pelos métodos declarados explicitamente na declaração da interface de anotação.

AnnotationInterfaceBody:

`{` {[AnnotationInterfaceMemberDeclaration](<#/doc/jls/jls-09>)} `}`

AnnotationInterfaceMemberDeclaration:

[AnnotationInterfaceElementDeclaration](<#/doc/jls/jls-09>)   
[ConstantDeclaration](<#/doc/jls/jls-09>)   
[ClassDeclaration](<#/doc/jls/jls-08>)   
[InterfaceDeclaration](<#/doc/jls/jls-09>)   
`;`

AnnotationInterfaceElementDeclaration:

{[AnnotationInterfaceElementModifier](<#/doc/jls/jls-09>)} [UnannType](<#/doc/jls/jls-08>) [Identifier](<#/doc/jls/jls-03>) `(` `)` [[Dims](<#/doc/jls/jls-04>)] [[DefaultValue](<#/doc/jls/jls-09>)] `;`

AnnotationInterfaceElementModifier:

(um de)   
[Annotation](<#/doc/jls/jls-09>) `public`   
`abstract`

A seguinte produção de [§4.3](<#/doc/jls/jls-04>) é mostrada aqui para conveniência:

Dims:

{[Annotation](<#/doc/jls/jls-09>)} `[` `]` {{[Annotation](<#/doc/jls/jls-09>)} `[` `]`} 

Em virtude da gramática acima, uma declaração de método em uma declaração de interface de anotação não pode ter parâmetros formais, parâmetros de tipo ou uma cláusula `throws`; e não pode ser `private`, `default` ou `static`. Assim, uma interface de anotação não pode ter a mesma variedade de métodos que uma interface normal. Note que ainda é possível para uma interface de anotação herdar um método `default` de sua superinterface implícita, `java.lang.annotation.Annotation`, embora nenhum método `default` desse tipo exista a partir do Java SE 25.

Por convenção, os únicos modificadores que devem estar presentes na declaração de um elemento de interface de anotação são anotações.

O tipo de retorno de um método declarado no corpo de uma interface de anotação deve ser um dos seguintes, ou ocorre um erro em tempo de compilação:

*   Um tipo primitivo
*   `String`
*   `Class` ou uma invocação de `Class` ([§4.5](<#/doc/jls/jls-04>))
*   Um tipo de classe `enum`
*   Um tipo de interface de anotação
*   Um tipo de array cujo tipo de componente é um dos tipos precedentes ([§10.1](<#/doc/jls/jls-10>)).

Esta regra impede elementos com tipos de array aninhados, como:
```java
    @interface Verboten {
        String[][] value();
    }
    
```

A declaração de um método que retorna um array é permitida a colocar o par de colchetes que denota o tipo de array após a lista de parâmetros formais vazia. Esta sintaxe é suportada para compatibilidade com versões anteriores da linguagem de programação Java. É fortemente recomendado que esta sintaxe não seja usada em código novo.

É um erro em tempo de compilação se qualquer método declarado em uma interface de anotação tiver uma assinatura que seja equivalente para sobrescrita ([§8.4.2](<#/doc/jls/jls-08>)) à de qualquer método `public` ou `protected` declarado na classe `Object` ou na interface `java.lang.annotation.Annotation`.

É um erro em tempo de compilação se a declaração de uma interface de anotação T contiver um elemento do tipo T, direta ou indiretamente.

Por exemplo, isso é ilegal:
```java
    @interface SelfRef { SelfRef value(); }
    
```

e também é isto:
```java
    @interface Ping { Pong value(); }
    @interface Pong { Ping value(); }
    
```

Uma interface de anotação sem elementos é chamada de _interface de anotação marcadora_.

Uma interface de anotação com um elemento é chamada de _interface de anotação de elemento único_.

Por convenção, o nome do único elemento em uma interface de anotação de elemento único é `value`. O suporte linguístico para esta convenção é fornecido por anotações de elemento único ([§9.7.3](<#/doc/jls/jls-09>)).

**Exemplo 9.6.1-1. Declaração de Interface de Anotação**

A seguinte declaração de interface de anotação define uma interface de anotação com vários elementos:
```java
    /**
     * Describes the "request-for-enhancement" (RFE)
     * that led to the presence of the annotated API element.
     */
    @interface RequestForEnhancement {
        int    id();        // Unique ID number associated with RFE
        String synopsis();  // Synopsis of RFE
        String engineer();  // Name of engineer who implemented RFE
        String date();      // Date RFE was implemented
    }
    
```

**Exemplo 9.6.1-2. Declaração de Interface de Anotação Marcadora**

A seguinte declaração de interface de anotação define uma interface de anotação marcadora:
```java
    /**
     * An annotation with this type indicates that the
     * specification of the annotated API element is
     * preliminary and subject to change.
     */
    @interface Preliminary {}
    
```

**Exemplo 9.6.1-3. Declarações de Interfaces de Anotação de Elemento Único**

A convenção de que uma interface de anotação de elemento único define um elemento chamado `value` é ilustrada na seguinte declaração de interface de anotação:
```java
    /**
     * Associates a copyright notice with the annotated API element.
     */
    @interface Copyright {
        String value();
    }
    
```

A seguinte declaração de interface de anotação define uma interface de anotação de elemento único cujo único elemento tem um tipo de array:
```java
    /**
     * Associates a list of endorsers with the annotated class.
     */
    @interface Endorsers {
        String[] value();
    }
    
```

A seguinte declaração de interface de anotação mostra um elemento do tipo `Class` cujo valor é restrito por um wildcard limitado:
```java
    interface Formatter {}
    
    // Designates a formatter to pretty-print the annotated class
    @interface PrettyPrinter {
        Class<? extends Formatter> value();
    }
    
```

A seguinte declaração de interface de anotação contém um elemento cujo tipo é um tipo de interface de anotação:
```java
    /**
     * Indicates the author of the annotated program element.
     */
    @interface Author {
        Name value();
    }
    /**
     * A person's name.  This annotation interface is not
     * designed to be used directly to annotate program elements,
     * but to define elements of other annotation interfaces.
     */
    @interface Name {
        String first();
        String last();
    }
    
```

A gramática para declarações de interface de anotação permite outras declarações de membro além das declarações de método. Por exemplo, pode-se optar por declarar uma classe `enum` aninhada para uso por um elemento da interface de anotação:
```java
    @interface Quality {
        enum Level { BAD, INDIFFERENT, GOOD }
        Level value();
    }
    
```

### 9.6.2. Valores Padrão para Elementos da Interface de Anotação

Um elemento de interface de anotação pode ter um _valor padrão_, especificado anexando a palavra-chave `default` e um valor à declaração do método que define o elemento.

DefaultValue:

`default` [ElementValue](<#/doc/jls/jls-09>)

As seguintes produções de [§9.7.1](<#/doc/jls/jls-09>) são mostradas aqui para conveniência:

ElementValue:

[ConditionalExpression](<#/doc/jls/jls-15>)   
[ElementValueArrayInitializer](<#/doc/jls/jls-09>)   
[Annotation](<#/doc/jls/jls-09>)

ElementValueArrayInitializer:

`{` [[ElementValueList](<#/doc/jls/jls-09>)] [`,`] `}`

ElementValueList:

[ElementValue](<#/doc/jls/jls-09>) {`,` [ElementValue](<#/doc/jls/jls-09>)} 

Note que um elemento de interface de anotação que é especificado para ter um valor padrão não é um método `default` ([§9.4](<#/doc/jls/jls-09>)). A declaração de uma interface de anotação não pode declarar métodos `default` ([§9.6.1](<#/doc/jls/jls-09>)).

É um erro em tempo de compilação se o tipo do elemento não for compatível ([§9.7](<#/doc/jls/jls-09>)) com o valor padrão especificado.

Os valores padrão não são compilados em anotações, mas sim aplicados dinamicamente no momento em que as anotações são lidas. Assim, a alteração de um valor padrão afeta as anotações mesmo em classes que foram compiladas antes da alteração ser feita (presumindo que essas anotações não tenham um valor explícito para o elemento com valor padrão).

**Exemplo 9.6.2-1. Declaração de Interface de Anotação com Valores Padrão**

Aqui está um refinamento da interface de anotação `RequestForEnhancement` de [§9.6.1](<#/doc/jls/jls-09>):
```java
    @interface RequestForEnhancement {
        int    id();       // No default - must be specified in
                           // each annotation
        String synopsis(); // No default - must be specified in
                           // each annotation
        String engineer()  default "[unassigned]";
        String date()      default "[unimplemented]";
    }
    
```

### 9.6.3. Interfaces de Anotação Repetíveis

Uma interface de anotação A é _repetível_ se sua declaração for (meta-)anotada com uma anotação `@Repeatable` ([§9.6.4.8](<#/doc/jls/jls-09>)) cujo elemento `value` indica uma _interface de anotação contêiner de A_.

Uma interface de anotação AC é uma _interface de anotação contêiner de A_ se todas as seguintes condições forem verdadeiras:

1.  AC declara um método `value()` cujo tipo de retorno é A`[]`.
2.  Quaisquer métodos declarados por AC, exceto `value()`, têm um valor padrão.
3.  AC é retida por pelo menos o mesmo tempo que A, onde a retenção é expressa explicitamente ou implicitamente com a anotação `@Retention` ([§9.6.4.2](<#/doc/jls/jls-09>)). Especificamente:
    *   Se a retenção de AC for `java.lang.annotation.RetentionPolicy.SOURCE`, então a retenção de A é `java.lang.annotation.RetentionPolicy.SOURCE`.
    *   Se a retenção de AC for `java.lang.annotation.RetentionPolicy.CLASS`, então a retenção de A é `java.lang.annotation.RetentionPolicy.CLASS` ou `java.lang.annotation.RetentionPolicy.SOURCE`.
    *   Se a retenção de AC for `java.lang.annotation.RetentionPolicy.RUNTIME`, então a retenção de A é `java.lang.annotation.RetentionPolicy.SOURCE`, `java.lang.annotation.RetentionPolicy.CLASS` ou `java.lang.annotation.RetentionPolicy.RUNTIME`.
4.  A é aplicável a pelo menos os mesmos tipos de elementos de programa que AC ([§9.6.4.1](<#/doc/jls/jls-09>)). Especificamente, se os tipos de elementos de programa onde A é aplicável são denotados pelo conjunto `m1`, e os tipos de elementos de programa onde AC é aplicável são denotados pelo conjunto `m2`, então cada tipo em `m2` deve ocorrer em `m1`, exceto que:
    *   Se o tipo em `m2` for `java.lang.annotation.ElementType.ANNOTATION_TYPE`, então pelo menos um de `java.lang.annotation.ElementType.ANNOTATION_TYPE` ou `java.lang.annotation.ElementType.TYPE` ou `java.lang.annotation.ElementType.TYPE_USE` deve ocorrer em `m1`.
    *   Se o tipo em `m2` for `java.lang.annotation.ElementType.TYPE`, então pelo menos um de `java.lang.annotation.ElementType.TYPE` ou `java.lang.annotation.ElementType.TYPE_USE` deve ocorrer em `m1`.
    *   Se o tipo em `m2` for `java.lang.annotation.ElementType.TYPE_PARAMETER`, então pelo menos um de `java.lang.annotation.ElementType.TYPE_PARAMETER` ou `java.lang.annotation.ElementType.TYPE_USE` deve ocorrer em `m1`.

Esta cláusula implementa a política de que uma interface de anotação pode ser _repetível_ apenas em alguns dos tipos de elementos de programa onde ela é _aplicável_.

5.  Se a declaração de A tiver uma (meta-)anotação que corresponde a `java.lang.annotation.Documented`, então a declaração de AC deve ter uma (meta-)anotação que corresponde a `java.lang.annotation.Documented`.

Note que é permitido que AC seja `@Documented` enquanto A não é `@Documented`.

6.  Se a declaração de A tiver uma (meta-)anotação que corresponde a `java.lang.annotation.Inherited`, então a declaração de AC deve ter uma (meta-)anotação que corresponde a `java.lang.annotation.Inherited`.

Note que é permitido que AC seja `@Inherited` enquanto A não é `@Inherited`.

É um erro em tempo de compilação se uma interface de anotação A for (meta-)anotada com uma anotação `@Repeatable` cujo elemento `value` indica um tipo que não é uma interface de anotação contêiner de A.

**Exemplo 9.6.3-1. Interface de Anotação Contêiner Malformada**

Considere as seguintes declarações:
```java
    import java.lang.annotation.Repeatable;
    
    @Repeatable(FooContainer.class)
    @interface Foo {}
    
    @interface FooContainer { Object[] value(); }
    
```

A compilação da declaração `Foo` produz um erro em tempo de compilação porque `Foo` usa `@Repeatable` para tentar especificar `FooContainer` como sua interface de anotação contêiner, mas `FooContainer` não é de fato uma interface de anotação contêiner de `Foo`. (O tipo de retorno de `FooContainer.value()` não é `Foo`[]`.)

A anotação `@Repeatable` não pode ser repetida, então apenas uma interface de anotação contêiner pode ser especificada por uma interface de anotação repetível.

Permitir que mais de uma interface de anotação contêiner seja especificada causaria uma escolha indesejável em tempo de compilação, quando múltiplas anotações da interface de anotação repetível são logicamente substituídas por uma anotação contêiner ([§9.7.5](<#/doc/jls/jls-09>)).

Uma interface de anotação pode ser a interface de anotação contêiner de no máximo uma interface de anotação.

Isso é implícito pelo requisito de que se a declaração de uma interface de anotação A especifica uma interface de anotação contêiner de AC, então o método `value()` de AC tem um tipo de retorno envolvendo A, especificamente A`[]`.

Uma interface de anotação não pode especificar a si mesma como sua interface de anotação contêiner.

Isso é implícito pelo requisito no método `value()` da interface de anotação contêiner. Especificamente, se uma interface de anotação A especificasse a si mesma (via `@Repeatable`) como sua interface de anotação contêiner, então o tipo de retorno do método `value()` de A teria que ser A`[]`; mas isso causaria um erro em tempo de compilação, já que uma interface de anotação não pode se referir a si mesma em seus elementos ([§9.6.1](<#/doc/jls/jls-09>)). Mais geralmente, duas interfaces de anotação não podem especificar uma à outra como suas interfaces de anotação contêiner, porque declarações de interface de anotação cíclicas são ilegais.

Uma interface de anotação AC pode ser a interface de anotação contêiner de alguma interface de anotação A, enquanto também tem sua própria interface de anotação contêiner SC. Ou seja, uma interface de anotação contêiner pode ser, por si mesma, uma interface de anotação repetível.

**Exemplo 9.6.3-2. Restringindo Onde as Anotações Podem se Repetir**

Uma anotação cuja declaração de interface indica um alvo de `java.lang.annotation.ElementType.TYPE` pode aparecer em pelo menos tantos locais quanto uma anotação cuja declaração de interface indica um alvo de `java.lang.annotation.ElementType.ANNOTATION_TYPE`. Por exemplo, dadas as seguintes declarações de interfaces de anotação repetíveis e contêineres:
```java
    import java.lang.annotation.ElementType;
    import java.lang.annotation.Repeatable;
    import java.lang.annotation.Target;
    
    @Target(ElementType.TYPE)
    @Repeatable(FooContainer.class)
    @interface Foo {}
    
    @Target(ElementType.ANNOTATION_TYPE)
    @interface FooContainer {
        Foo[] value();
    }
    
    
```

`@Foo` pode aparecer em qualquer declaração de classe ou interface, enquanto `@FooContainer` pode aparecer apenas em declarações de interface de anotação. Portanto, a seguinte declaração de interface de anotação é legal:
```java
    @Foo @Foo
    @interface Anno {}
    
```

enquanto a seguinte declaração de interface é ilegal:
```java
    @Foo @Foo
    interface Intf {}
    
```

De forma mais ampla, se `Foo` é uma interface de anotação repetível e `FooContainer` é sua interface de anotação contêiner, então:

*   Se `Foo` não tem meta-anotação `@Target` e `FooContainer` não tem meta-anotação `@Target`, então `@Foo` pode ser repetida em qualquer elemento de programa que suporte anotações.

*   Se `Foo` não tem meta-anotação `@Target`, mas `FooContainer` tem uma meta-anotação `@Target`, então `@Foo` pode ser repetida apenas em elementos de programa onde `@FooContainer` pode aparecer.

*   Se `Foo` tem uma meta-anotação `@Target`, então, no julgamento dos designers da linguagem de programação Java, `FooContainer` deve ser declarada com conhecimento da aplicabilidade de `Foo`. Especificamente, os tipos de elementos de programa onde `FooContainer` pode aparecer devem ser logicamente os mesmos ou um subconjunto dos tipos de `Foo`.

Por exemplo, se `Foo` é aplicável a declarações de campo e método, então `FooContainer` pode legitimamente servir como interface de anotação contêiner de `Foo` se `FooContainer` for aplicável apenas a declarações de campo (impedindo que `@Foo` seja repetida em declarações de método). Mas se `FooContainer` for aplicável apenas a declarações de parâmetros formais, então `FooContainer` foi uma escolha ruim de interface de anotação contêiner por `Foo` porque `@FooContainer` não pode ser implicitamente declarada em alguns elementos de programa onde `@Foo` é repetida.

Da mesma forma, se `Foo` é aplicável a declarações de campo e método, então `FooContainer` não pode legitimamente servir como interface de anotação contêiner de `Foo` se `FooContainer` for aplicável a declarações de campo e parâmetro. Embora fosse possível pegar a interseção dos elementos de programa e tornar `Foo` repetível apenas em declarações de campo, a presença de elementos de programa adicionais para `FooContainer` indica que `FooContainer` não foi projetada como uma interface de anotação contêiner para `Foo`. Seria, portanto, perigoso para `Foo` depender dela.

**Exemplo 9.6.3-3. Uma Interface de Anotação Contêiner Repetível**

As seguintes declarações são legais:
```java
    import java.lang.annotation.Repeatable;
    
    // Foo: Repeatable annotation interface
    @Repeatable(FooContainer.class)
    @interface Foo { int value(); }
    
    // FooContainer: Containing annotation interface of Foo
    // Also a repeatable annotation interface itself
    @Repeatable(FooContainerContainer.class)
    @interface FooContainer { Foo[] value(); }
    
    // FooContainerContainer: Containing annotation interface
    // of FooContainer
    @interface FooContainerContainer { FooContainer[] value(); }
    
```

Assim, uma anotação cuja interface é uma interface de anotação contêiner pode ser repetida:
```java
    @FooContainer({@Foo(1)}) @FooContainer({@Foo(2)})
    class Test {}
    
```

Uma interface de anotação que é tanto repetível quanto contêiner está sujeita às regras sobre a mistura de anotações de interface de anotação repetível com anotações de interface de anotação contêiner ([§9.7.5](<#/doc/jls/jls-09>)). Por exemplo, não é possível escrever múltiplas anotações `@Foo` juntamente com múltiplas anotações `@FooContainer`, nem é possível escrever múltiplas anotações `@FooContainer` juntamente com múltiplas anotações `@FooContainerContainer`. No entanto, se a interface de anotação `FooContainerContainer` fosse ela mesma repetível, então seria possível escrever múltiplas anotações `@Foo` juntamente com múltiplas anotações `@FooContainerContainer`.

### 9.6.4. Interfaces de Anotação Predefinidas

Várias interfaces de anotação são predefinidas na API da Plataforma Java SE. Algumas das interfaces de anotação predefinidas têm semânticas especiais na linguagem de programação Java e exigem comportamento especial por parte de um compilador Java, conforme especificado nesta seção. Esta seção não fornece uma especificação completa para as interfaces de anotação predefinidas, para as quais o leitor é remetido à documentação da API da Plataforma Java SE ([§1.4](<#/doc/jls/jls-01>)).

#### 9.6.4.1. `@Target`

Uma anotação do tipo `java.lang.annotation.Target` é usada na declaração de uma interface de anotação A para especificar os contextos nos quais A é _aplicável_. `java.lang.annotation.Target` tem um único elemento, `value`, do tipo `java.lang.annotation.ElementType`[]`, para especificar contextos.

As interfaces de anotação podem ser aplicáveis em _contextos de declaração_, onde as anotações se aplicam a declarações, ou em _contextos de tipo_, onde as anotações se aplicam a tipos usados em declarações e expressões.

Existem dez contextos de declaração, cada um correspondendo a uma constante `enum` de `java.lang.annotation.ElementType`:

1.  Declarações de módulo ([§7.7](<#/doc/jls/jls-07>))

Corresponde a `java.lang.annotation.ElementType.MODULE`

2.  Declarações de pacote ([§7.4.1](<#/doc/jls/jls-07>))

Corresponde a `java.lang.annotation.ElementType.PACKAGE`

3.  Declarações de classe (incluindo declarações `enum` e declarações `record`) e declarações de interface (incluindo declarações de interface de anotação) ([§8.1.1](<#/doc/jls/jls-08>), [§8.5](<#/doc/jls/jls-08>), [§8.9](<#/doc/jls/jls-08>), [§8.10](<#/doc/jls/jls-08>), [§9.1.1](<#/doc/jls/jls-09>), [§9.5](<#/doc/jls/jls-09>), [§9.6](<#/doc/jls/jls-09>))

Corresponde a `java.lang.annotation.ElementType.TYPE`

Adicionalmente, declarações de interface de anotação correspondem a `java.lang.annotation.ElementType.ANNOTATION_TYPE`

4.  Declarações de método (incluindo elementos de interfaces de anotação) ([§8.4.3](<#/doc/jls/jls-08>), [§9.4](<#/doc/jls/jls-09>), [§9.6.1](<#/doc/jls/jls-09>))

Corresponde a `java.lang.annotation.ElementType.METHOD`

5.  Declarações de construtor ([§8.8.3](<#/doc/jls/jls-08>))

Corresponde a `java.lang.annotation.ElementType.CONSTRUCTOR`

6.  Declarações de parâmetros de tipo de classes genéricas, interfaces, métodos e construtores ([§8.1.2](<#/doc/jls/jls-08>), [§9.1.2](<#/doc/jls/jls-09>), [§8.4.4](<#/doc/jls/jls-08>), [§8.8.4](<#/doc/jls/jls-08>))

Corresponde a `java.lang.annotation.ElementType.TYPE_PARAMETER`

7.  Declarações de campo (incluindo constantes `enum`) ([§8.3.1](<#/doc/jls/jls-08>), [§9.3](<#/doc/jls/jls-09>), [§8.9.1](<#/doc/jls/jls-08>))

Corresponde a `java.lang.annotation.ElementType.FIELD`

8.  Declarações de parâmetros formais e de exceção ([§8.4.1](<#/doc/jls/jls-08>), [§9.4](<#/doc/jls/jls-09>), [§14.20](<#/doc/jls/jls-14>))

Corresponde a `java.lang.annotation.ElementType.PARAMETER`

9.  Declarações de variáveis locais em instruções ([§14.4.2](<#/doc/jls/jls-14>), [§14.14.1](<#/doc/jls/jls-14>), [§14.14.2](<#/doc/jls/jls-14>), [§14.20.3](<#/doc/jls/jls-14>)) e em padrões ([§14.30.1](<#/doc/jls/jls-14>))

Corresponde a `java.lang.annotation.ElementType.LOCAL_VARIABLE`

10. Declarações de componentes de `record` ([§8.10.1](<#/doc/jls/jls-08>))

Corresponde a `java.lang.annotation.ElementType.RECORD_COMPONENT`

Existem 17 contextos de tipo ([§4.11](<#/doc/jls/jls-04>)), todos representados pela constante `enum` `TYPE_USE` de `java.lang.annotation.ElementType`.

É um erro em tempo de compilação se a mesma constante `enum` aparecer mais de uma vez no elemento `value` de uma anotação do tipo `java.lang.annotation.Target`.
Se uma anotação do tipo `java.lang.annotation.Target` não estiver presente na declaração de uma interface de anotação A, então A é aplicável em todos os contextos de declaração e em nenhum contexto de tipo.

#### 9.6.4.2. `@Retention`

Anotações podem estar presentes apenas no código-fonte, ou podem estar presentes na forma binária de uma classe ou interface. Uma anotação que está presente na forma binária pode ou não estar disponível em tempo de execução através das bibliotecas de reflexão da Plataforma Java SE. A interface de anotação `java.lang.annotation.Retention` é usada para escolher entre essas possibilidades.

Se uma anotação `a` corresponde a uma interface de anotação A, e A possui uma (meta-)anotação `m` que corresponde a `java.lang.annotation.Retention`, então:

  * Se `m` possui um elemento cujo valor é `java.lang.annotation.RetentionPolicy.SOURCE`, então um compilador Java deve garantir que `a` não esteja presente na representação binária da classe ou interface na qual `a` aparece.

  * Se `m` possui um elemento cujo valor é `java.lang.annotation.RetentionPolicy.CLASS` ou `java.lang.annotation.RetentionPolicy.RUNTIME`, então um compilador Java deve garantir que `a` seja representada na representação binária da classe ou interface na qual `a` aparece, a menos que `a` anote uma declaração de variável local ou `a` anote uma declaração de parâmetro formal de uma expressão lambda.

Uma anotação na declaração de uma variável local, ou na declaração de um parâmetro formal de uma expressão lambda, nunca é retida na representação binária. Em contraste, uma anotação no tipo de uma variável local, ou no tipo de um parâmetro formal de uma expressão lambda, é retida na representação binária se a interface de anotação especificar uma política de retenção adequada.

Note que não é ilegal para uma interface de anotação ser meta-anotada com `@Target`(`java.lang.annotation.ElementType.LOCAL_VARIABLE`)` _e_ `@Retention`(`java.lang.annotation.RetentionPolicy.CLASS`)` ou `@Retention`(`java.lang.annotation.RetentionPolicy.RUNTIME`)`.

Se `m` possui um elemento cujo valor é `java.lang.annotation.RetentionPolicy.RUNTIME`, as bibliotecas de reflexão da Plataforma Java SE devem tornar `a` disponível em tempo de execução.

Se A não possui uma (meta-)anotação que corresponde a `java.lang.annotation.Retention`, então um compilador Java deve tratar A como se tivesse uma (meta-)anotação que corresponde a `java.lang.annotation.Retention` com um elemento cujo valor é `java.lang.annotation.RetentionPolicy.CLASS`.

#### 9.6.4.3. `@Inherited`

A interface de anotação `java.lang.annotation.Inherited` é usada para indicar que anotações em uma classe C correspondentes a uma dada interface de anotação são herdadas pelas subclasses de C.

#### 9.6.4.4. `@Override`

Programadores ocasionalmente sobrecarregam uma declaração de método quando pretendem sobrescrevê-la, levando a problemas sutis. A interface de anotação `Override` suporta a detecção precoce de tais problemas.

O exemplo clássico diz respeito ao método `equals`. Programadores escrevem o seguinte na classe `Foo`:
```
    public boolean equals(Foo that) { ... }
    
```

quando pretendem escrever:
```
    public boolean equals(Object that) { ... }
    
```

Isso é perfeitamente legal, mas a classe `Foo` herda a implementação de `equals` de `Object`, o que pode causar alguns bugs sutis.

Se uma declaração de método na classe ou interface Q for anotada com `@Override`, então uma das três condições a seguir deve ser verdadeira, ou ocorre um erro em tempo de compilação:

  * o método sobrescreve de Q um método declarado em um supertipo de Q ([§8.4.8.1](<#/doc/jls/jls-08>), [§9.4.1.1](<#/doc/jls/jls-09>))

  * o método é override-equivalent a um método `public` de `Object` ([§4.3.2](<#/doc/jls/jls-04>), [§8.4.2](<#/doc/jls/jls-08>))

  * Q é uma classe `record` ([§8.10](<#/doc/jls/jls-08>)), e o método é um método acessor para um componente `record` de Q ([§8.10.3](<#/doc/jls/jls-08>))

Este comportamento difere do Java SE 5.0, onde `@Override` só causava um erro em tempo de compilação se aplicado a um método que implementava um método de uma superinterface que não estava também presente em uma superclasse.

A cláusula sobre sobrescrever um método `public` de `Object` é motivada pelo uso de `@Override` em uma interface. Considere as seguintes declarações:
```
    class Foo     { @Override public int hashCode() {..} }
    interface Bar { @Override int hashCode(); }
    
```

O uso de `@Override` na declaração da classe é legal pela primeira cláusula, porque `Foo.hashCode` sobrescreve de `Foo` o método `Object.hashCode`.

Para a declaração da interface, considere que uma interface possui membros `public` `abstract` que correspondem aos membros `public` de `Object` ([§9.2](<#/doc/jls/jls-09>)). Se uma interface optar por declará-los explicitamente (isto é, declarar membros que são override-equivalent a métodos `public` de `Object`), então a interface é considerada como sobrescrevendo-os, e o uso de `@Override` é permitido.

No entanto, considere uma interface que tenta usar `@Override` em um método `clone`: (`finalize` também poderia ser usado neste exemplo)
```
    interface Quux { @Override Object clone(); }
    
```

Como `Object.clone` não é `public`, não há nenhum membro chamado `clone` implicitamente declarado em `Quux`. Portanto, a declaração explícita de `clone` em `Quux` não é considerada como "implementando" nenhum outro método, e é errôneo usar `@Override`. (O fato de `Quux.clone` ser `public` não é relevante.)

Em contraste, uma declaração de classe que declara `clone` está simplesmente sobrescrevendo `Object.clone`, então é capaz de usar `@Override`:
```
    class Beep { @Override protected Object clone() {..} }
    
```

A cláusula sobre uma classe `record` é devido ao significado especial de `@Override` em uma declaração `record`. Ou seja, pode ser usada para especificar que uma declaração de método é um método acessor para um componente `record`. Considere a seguinte declaração `record`:
```
    record Roo(int x) {
        @Override
        public int x() {
            return Math.abs(x);
        }
    }
    
```

O uso de `@Override` no método acessor `int x()` garante que, se o componente `record` `x` for modificado ou removido, o método acessor correspondente também deverá ser modificado ou removido.

#### 9.6.4.5. `@SuppressWarnings`

Compiladores Java são cada vez mais capazes de emitir avisos úteis "tipo lint". Para encorajar o uso de tais avisos, deve haver alguma maneira de desabilitar um aviso em uma parte do programa quando o programador sabe que o aviso é inadequado.

A interface de anotação `SuppressWarnings` suporta o controle do programador sobre avisos que seriam emitidos por um compilador Java. Ela define um único elemento que é um array de `String`.

Se uma declaração for anotada com `@SuppressWarnings`(value = {S1, ..., Sk})`, então um compilador Java deve suprimir (isto é, não reportar) qualquer aviso especificado por um dos S1 ... Sk se esse aviso tivesse sido gerado como resultado da declaração anotada ou de qualquer uma de suas partes.

A linguagem de programação Java define quatro tipos de avisos que podem ser especificados por `@SuppressWarnings`:

  * Avisos `unchecked` ([§4.8](<#/doc/jls/jls-04>), [§5.1.6](<#/doc/jls/jls-05>), [§5.1.9](<#/doc/jls/jls-05>), [§8.4.1](<#/doc/jls/jls-08>), [§8.4.8.3](<#/doc/jls/jls-08>), [§15.12.4.2](<#/doc/jls/jls-15>), [§15.13.2](<#/doc/jls/jls-15>), [§15.27.3](<#/doc/jls/jls-15>)) são especificados pela string "`unchecked`".

  * Avisos de `deprecation` ([§9.6.4.6](<#/doc/jls/jls-09>)) são especificados pela string "`deprecation`".

  * Avisos de `removal` ([§9.6.4.6](<#/doc/jls/jls-09>)) são especificados pela string "`removal`".

  * Avisos de `preview` ([§1.5](<#/doc/jls/jls-01>)) são especificados pela string "`preview`".

Qualquer outra string especifica um aviso não padrão. Um compilador Java deve ignorar qualquer string que não reconheça.

Os fornecedores de compiladores são encorajados a documentar as strings que suportam para `@SuppressWarnings`, e a cooperar para garantir que as mesmas strings sejam reconhecidas em múltiplos compiladores.

#### 9.6.4.6. `@Deprecated`

Programadores são por vezes desencorajados a usar certos elementos de programa (módulos, classes, interfaces, campos, métodos e construtores) porque são considerados perigosos ou porque existe uma alternativa melhor. A interface de anotação `Deprecated` permite que um compilador avise sobre o uso desses elementos de programa.

Um elemento de programa _deprecated_ é um módulo, classe, interface, campo, método ou construtor cuja declaração é anotada com `@Deprecated`. A maneira como um elemento de programa é `deprecated` depende do valor do elemento `forRemoval` da anotação:

  * Se `forRemoval=false` (o padrão), então o elemento de programa é _ordinariamente deprecated_.

Um elemento de programa ordinariamente `deprecated` não se destina a ser removido em uma versão futura, mas os programadores devem, no entanto, migrar para longe de usá-lo.

  * Se `forRemoval=true`, então o elemento de programa é _terminally deprecated_.

Um elemento de programa `terminally deprecated` destina-se a ser removido em uma versão futura. Os programadores devem parar de usá-lo ou arriscar incompatibilidades de código-fonte e binárias ([§13.2](<#/doc/jls/jls-13>)) ao atualizar para uma versão mais recente.

Um compilador Java deve produzir um _aviso de deprecation_ quando um elemento de programa ordinariamente `deprecated` é usado (sobrescrito, invocado ou referenciado por nome) na declaração de um elemento de programa (seja explicitamente ou implicitamente declarado), a menos que:

  * O uso esteja dentro de uma declaração que é ela própria `deprecated`, seja ordinariamente ou `terminally`; ou

  * O uso esteja dentro de uma declaração que é anotada para suprimir avisos de `deprecation` ([§9.6.4.5](<#/doc/jls/jls-09>)); ou

  * A declaração onde o uso aparece e a declaração do elemento de programa ordinariamente `deprecated` estejam ambas dentro da mesma classe mais externa; ou

  * O uso esteja dentro de uma declaração `import` que importa a classe, interface ou membro ordinariamente `deprecated`; ou

  * O uso esteja dentro de uma diretiva `exports` ou `opens` ([§7.7.2](<#/doc/jls/jls-07>)).

Um compilador Java deve produzir um _aviso de removal_ quando um elemento de programa `terminally deprecated` é usado (sobrescrito, invocado ou referenciado por nome) na declaração de um elemento de programa (seja explicitamente ou implicitamente declarado), a menos que:

  * O uso esteja dentro de uma declaração que é anotada para suprimir avisos de `removal` ([§9.6.4.5](<#/doc/jls/jls-09>)); ou

  * A declaração onde o uso aparece e a declaração do elemento de programa `terminally deprecated` estejam ambas dentro da mesma classe mais externa; ou

  * O uso esteja dentro de uma declaração `import` que importa a classe, interface ou membro `terminally deprecated`; ou

  * O uso esteja dentro de uma diretiva `exports` ou `opens`.

A `deprecation` terminal é suficientemente urgente que o uso de um elemento `terminally deprecated` causará um aviso de `removal` _mesmo que o elemento que o utiliza seja ele próprio deprecated_, uma vez que não há garantia de que ambos os elementos serão removidos ao mesmo tempo. Para ignorar o aviso, mas continuar a usar o elemento, o programador deve reconhecer manualmente o risco através de uma anotação `@SuppressWarnings`.

Nenhum aviso de `deprecation` ou aviso de `removal` é produzido quando:

  * uma variável local ou parâmetro formal é usado (referenciado por nome), mesmo que a declaração da variável local ou parâmetro formal seja anotada com `@Deprecated`.

  * o nome de um pacote é usado (referenciado por um nome de tipo qualificado, ou uma declaração `import`, ou uma diretiva `exports` ou `opens`), mesmo que a declaração do pacote seja anotada com `@Deprecated`.

  * o nome de um módulo é usado por uma diretiva `exports` ou `opens` qualificada, mesmo que a declaração do módulo amigo seja anotada com `@Deprecated`.

Uma declaração de módulo que exporta ou abre um pacote é geralmente controlada pelo mesmo programador ou equipe que controla a declaração do pacote. Como tal, há pouco benefício em avisar que a declaração do pacote é anotada com `@Deprecated` quando o pacote é exportado ou aberto pela declaração do módulo. Em contraste, uma declaração de módulo que exporta ou abre um pacote _para um módulo amigo_ geralmente não é controlada pelo mesmo programador ou equipe que controla o módulo amigo. Simplesmente exportar ou abrir o pacote não faz com que a declaração do módulo dependa do módulo amigo, então há pouco valor em avisar se o módulo amigo está `deprecated`; o programador da declaração do módulo quase sempre desejaria suprimir tal aviso.

A única declaração implícita que pode causar um aviso de `deprecation` ou aviso de `removal` é uma anotação contêiner ([§9.7.5](<#/doc/jls/jls-09>)). Ou seja, se T é uma interface de anotação `repeatable` e TC é sua interface de anotação contêiner, e TC é `deprecated`, então repetir a anotação `@T` causará um aviso. O aviso é devido à anotação contêiner `@TC` implícita. É fortemente desencorajado `deprecate` uma interface de anotação contêiner sem `deprecate` a interface de anotação `repeatable` correspondente.

#### 9.6.4.7. `@SafeVarargs`

Um parâmetro de aridade variável com um tipo de elemento não-reificável ([§4.7](<#/doc/jls/jls-04>)) pode causar poluição de heap ([§4.12.2](<#/doc/jls/jls-04>)) e dar origem a avisos `unchecked` em tempo de compilação ([§5.1.9](<#/doc/jls/jls-05>)). No entanto, tais avisos são pouco informativos se o corpo do método de aridade variável se comportar bem em relação ao parâmetro de aridade variável.

A interface de anotação `SafeVarargs`, quando usada para anotar uma declaração de método ou construtor, faz uma asserção do programador que impede um compilador Java de reportar avisos `unchecked` para a declaração ou invocação de um método ou construtor de aridade variável onde o compilador o faria de outra forma devido ao parâmetro de aridade variável ter um tipo de elemento não-reificável.

A anotação `@SafeVarargs` tem efeitos não-locais porque suprime avisos `unchecked` em expressões de invocação de método, além de um aviso `unchecked` referente à declaração do próprio método de aridade variável ([§8.4.1](<#/doc/jls/jls-08>)). Em contraste, a anotação `@SuppressWarnings`("unchecked")` tem efeitos locais porque suprime apenas avisos `unchecked` referentes à declaração de um método.

O alvo canônico para `@SafeVarargs` é um método como `java.util.Collections.addAll`, cuja declaração começa com:
```
    public static <T> boolean
      addAll(Collection<? super T> c, T... elements)
    
```

O parâmetro de aridade variável tem o tipo declarado `T`[]`, que é não-reificável. No entanto, o método fundamentalmente apenas lê do array de entrada e adiciona os elementos a uma coleção, ambas operações seguras em relação ao array. Portanto, quaisquer avisos `unchecked` em tempo de compilação em expressões de invocação de método para `java.util.Collections.addAll` são, discutivelmente, espúrios e pouco informativos. Aplicar `@SafeVarargs` à declaração do método impede a geração desses avisos `unchecked` nas expressões de invocação de método.

É um erro em tempo de compilação se um método de aridade fixa ou declaração de construtor for anotado com a anotação `@SafeVarargs`.

É um erro em tempo de compilação se uma declaração de método de aridade variável que não é nem `static` nem `final` nem `private` for anotada com a anotação `@SafeVarargs`.

Como `@SafeVarargs` é aplicável apenas a métodos `static`, métodos de instância `final` e/ou `private`, e construtores, a anotação não é utilizável onde ocorre sobrescrita de método. A herança de anotações funciona apenas para anotações em classes (não em métodos, interfaces ou construtores), então uma anotação no estilo `@SafeVarargs` não pode ser passada através de métodos de instância em classes ou através de interfaces.

#### 9.6.4.8. `@Repeatable`

A interface de anotação `java.lang.annotation.Repeatable` é usada na declaração de uma _interface de anotação `repeatable`_ para indicar sua interface de anotação contêiner ([§9.6.3](<#/doc/jls/jls-09>)).

Note que uma meta-anotação `@Repeatable` na declaração de A, indicando AC, _não_ é suficiente para tornar AC a interface de anotação contêiner de A. Existem inúmeras regras de boa formação para que AC seja considerada a interface de anotação contêiner de A.

#### 9.6.4.9. `@FunctionalInterface`

A interface de anotação `FunctionalInterface` é usada para indicar que uma interface se destina a ser uma interface funcional ([§9.8](<#/doc/jls/jls-09>)). Ela facilita a detecção precoce de declarações de métodos inapropriadas que aparecem ou são herdadas por uma interface que se destina a ser funcional.

É um erro em tempo de compilação se uma declaração de interface for anotada com `@FunctionalInterface` mas não for, de fato, uma interface funcional.

Como algumas interfaces são funcionais incidentalmente, não é necessário nem desejável que todas as declarações de interfaces funcionais sejam anotadas com `@FunctionalInterface`.
## 9.7. Anotações

Uma _anotação_ é um marcador que associa informações a um elemento de programa, mas não tem efeito em tempo de execução. Uma anotação denota uma instância específica de uma interface de anotação ([§9.6](<#/doc/jls/jls-09>)) e geralmente fornece valores para os elementos dessa interface.

Existem três tipos de anotações. O primeiro tipo é o mais geral, enquanto os outros tipos são meramente abreviações para o primeiro tipo.

Annotation:

[NormalAnnotation](<#/doc/jls/jls-09>)
[MarkerAnnotation](<#/doc/jls/jls-09>)
[SingleElementAnnotation](<#/doc/jls/jls-09>)

Anotações normais são descritas em [§9.7.1](<#/doc/jls/jls-09>), anotações de marcador em [§9.7.2](<#/doc/jls/jls-09>), e anotações de elemento único em [§9.7.3](<#/doc/jls/jls-09>). As anotações podem aparecer em vários locais sintáticos em um programa, conforme descrito em [§9.7.4](<#/doc/jls/jls-09>). O número de anotações da mesma interface que podem aparecer em um local é determinado pela declaração da interface, conforme descrito em [§9.7.5](<#/doc/jls/jls-09>).

### 9.7.1. Anotações Normais

Uma _anotação normal_ especifica o nome de uma interface de anotação e, opcionalmente, uma lista de _pares elemento-valor_ separados por vírgulas. Cada par contém um _valor de elemento_ que é associado a um elemento da interface de anotação ([§9.6.1](<#/doc/jls/jls-09>)).

NormalAnnotation:

`@` [TypeName](<#/doc/jls/jls-06>) `(` [[ElementValuePairList](<#/doc/jls/jls-09>)] `)`

ElementValuePairList:

[ElementValuePair](<#/doc/jls/jls-09>) {`,` [ElementValuePair](<#/doc/jls/jls-09>)}

ElementValuePair:

[Identifier](<#/doc/jls/jls-03>) `=` [ElementValue](<#/doc/jls/jls-09>)

ElementValue:

[ConditionalExpression](<#/doc/jls/jls-15>)
[ElementValueArrayInitializer](<#/doc/jls/jls-09>)
[Annotation](<#/doc/jls/jls-09>)

ElementValueArrayInitializer:

`{` [[ElementValueList](<#/doc/jls/jls-09>)] [`,`] `}`

ElementValueList:

[ElementValue](<#/doc/jls/jls-09>) {`,` [ElementValue](<#/doc/jls/jls-09>)}

Note que o sinal de arroba (`@`) é um token por si só ([§3.11](<#/doc/jls/jls-03>)). É possível colocar espaço em branco entre ele e o _TypeName_, mas isso é desencorajado como uma questão de estilo.

O _TypeName_ especifica a interface de anotação correspondente à anotação. Diz-se que a anotação é "dessa" interface.

O _TypeName_ deve nomear uma interface de anotação acessível ([§6.6](<#/doc/jls/jls-06>)), ou ocorre um erro em tempo de compilação.

O _Identifier_ em um par elemento-valor deve ser o nome simples de um dos elementos (ou seja, métodos) da interface de anotação, ou ocorre um erro em tempo de compilação.

O tipo de retorno deste método define o _tipo de elemento_ do par elemento-valor.

Se o tipo de elemento for um tipo de array, não é necessário usar chaves para especificar o valor do elemento do par elemento-valor. Se o valor do elemento não for um _ElementValueArrayInitializer_, então um valor de array cujo único elemento é o valor do elemento é associado ao elemento. Se o valor do elemento for um _ElementValueArrayInitializer_, então o valor de array representado pelo _ElementValueArrayInitializer_ é associado ao elemento.

É um erro em tempo de compilação se o tipo de elemento não for _comensurável_ com o valor do elemento. Um tipo de elemento T é comensurável com um valor de elemento `v` se e somente se uma das seguintes condições for verdadeira:

*   T é um tipo de array E`[]`, e:

    *   Se `v` for uma _ConditionalExpression_ ou uma _Annotation_, então `v` é comensurável com E; ou

    *   Se `v` for um _ElementValueArrayInitializer_, então cada valor de elemento que `v` contém é comensurável com E.

Um _ElementValueArrayInitializer_ é semelhante a um inicializador de array normal ([§10.6](<#/doc/jls/jls-10>)), exceto que um _ElementValueArrayInitializer_ pode sintaticamente conter anotações, bem como expressões e inicializadores aninhados. No entanto, inicializadores aninhados não são semanticamente legais em um _ElementValueArrayInitializer_ porque nunca são comensuráveis com elementos de tipo array em declarações de interface de anotação (tipos de array aninhados não são permitidos).

*   T não é um tipo de array, e o tipo de `v` é compatível com atribuição ([§5.2](<#/doc/jls/jls-05>)) com T, e:

    *   Se T for um tipo primitivo ou `String`, então `v` é uma expressão constante ([§15.29](<#/doc/jls/jls-15>)).

    *   Se T for `Class` ou uma invocação de `Class` ([§4.5](<#/doc/jls/jls-04>)), então `v` é um literal de classe ([§15.8.2](<#/doc/jls/jls-15>)).

    *   Se T for um tipo de classe enum ([§8.9](<#/doc/jls/jls-08>)), então `v` é uma constante enum ([§8.9.1](<#/doc/jls/jls-08>)).

    *   `v` não é `null`.

Note que se T não for um tipo de array ou uma interface de anotação, o valor do elemento deve ser uma _ConditionalExpression_ ([§15.25](<#/doc/jls/jls-15>)). O uso de _ConditionalExpression_ em vez de uma produção mais geral como _Expression_ é um truque sintático para evitar expressões de atribuição como valores de elemento. Como uma expressão de atribuição não é uma expressão constante, ela não pode ser um valor de elemento comensurável para um elemento de tipo primitivo ou `String`.

Uma anotação normal deve conter um par elemento-valor para cada elemento da interface de anotação correspondente, exceto para aqueles elementos com valores padrão, ou ocorre um erro em tempo de compilação.

Uma anotação normal pode, mas não é obrigada a, conter pares elemento-valor para elementos com valores padrão.

É costumeiro, embora não obrigatório, que os pares elemento-valor em uma anotação sejam apresentados na mesma ordem que os elementos correspondentes na declaração da interface de anotação.

Uma anotação em uma declaração de interface de anotação é conhecida como _meta-anotação_.

Uma anotação da interface A pode aparecer como uma meta-anotação na declaração da própria interface A. Mais geralmente, circularidades no fechamento transitivo da relação "anota" são permitidas.

Por exemplo, é legal anotar a declaração de uma interface de anotação S com uma meta-anotação da interface T, e anotar a própria declaração de T com uma meta-anotação da interface S. As interfaces de anotação predefinidas ([§9.6.4](<#/doc/jls/jls-09>)) contêm várias dessas circularidades.

**Exemplo 9.7.1-1. Anotações Normais**

Aqui está um exemplo de uma anotação normal usando a interface de anotação de [§9.6.1](<#/doc/jls/jls-09>):
```
    @RequestForEnhancement(
        id       = 2868724,
        synopsis = "Provide time-travel functionality",
        engineer = "Mr. Peabody",
        date     = "4/1/2004"
    )
    public static void travelThroughTime(Date destination) { ... }
    
```

Aqui está um exemplo de uma anotação normal que aproveita os valores padrão, usando a interface de anotação de [§9.6.2](<#/doc/jls/jls-09>):
```
    
    @RequestForEnhancement(
        id       = 4561414,
        synopsis = "Balance the federal budget"
    )
    public static void balanceFederalBudget() {
        throw new UnsupportedOperationException("Not implemented");
    }
    
    
```

### 9.7.2. Anotações de Marcador

Uma _anotação de marcador_ é uma abreviação projetada para uso com interfaces de anotação de marcador ([§9.6.1](<#/doc/jls/jls-09>)).

MarkerAnnotation:

`@` [TypeName](<#/doc/jls/jls-06>)

É uma abreviação para a anotação normal:
```
    @_TypeName_()
    
```

É legal usar anotações de marcador para interfaces de anotação com elementos, desde que todos os elementos tenham valores padrão ([§9.6.2](<#/doc/jls/jls-09>)).

**Exemplo 9.7.2-1. Anotações de Marcador**

Aqui está um exemplo usando a interface de anotação de marcador `Preliminary` de [§9.6.1](<#/doc/jls/jls-09>):
```
    @Preliminary public class TimeTravel { ... }
    
```

### 9.7.3. Anotações de Elemento Único

Uma _anotação de elemento único_ é uma abreviação projetada para uso com interfaces de anotação de elemento único ([§9.6.1](<#/doc/jls/jls-09>)).

SingleElementAnnotation:

`@` [TypeName](<#/doc/jls/jls-06>) `(` [ElementValue](<#/doc/jls/jls-09>) `)`

É uma abreviação para a anotação normal:
```
    @_TypeName_(value = _ElementValue_)
    
```

É legal usar anotações de elemento único para interfaces de anotação com múltiplos elementos, desde que um elemento seja nomeado `value` e todos os outros elementos tenham valores padrão ([§9.6.2](<#/doc/jls/jls-09>)).

**Exemplo 9.7.3-1. Anotações de Elemento Único**

As seguintes anotações usam todas as interfaces de anotação de elemento único de [§9.6.1](<#/doc/jls/jls-09>).

Aqui está um exemplo de uma anotação de elemento único:
```
    
    @Copyright("2002 Yoyodyne Propulsion Systems, Inc.")
    public class OscillationOverthruster { ... }
    
    
```

Aqui está um exemplo de uma anotação de elemento único com valor de array:
```
    
    @Endorsers({"Children", "Unscrupulous dentists"})
    public class Lollipop { ... }
    
    
```

Aqui está um exemplo de uma anotação de elemento único com valor de array de elemento único: (note que as chaves são omitidas)
```
    
    @Endorsers("Epicurus")
    public class Pleasure { ... }
    
    
```

Aqui está um exemplo de uma anotação de elemento único com um elemento de tipo `Class` cujo valor é restrito por um wildcard limitado.
```
    
    class GorgeousFormatter implements Formatter { ... }
    
    @PrettyPrinter(GorgeousFormatter.class)
    public class Petunia { ... }
    
    // Illegal; String is not a subtype of Formatter
    @PrettyPrinter(String.class)
    public class Begonia { ... }
    
    
```

Aqui está um exemplo de uma anotação de elemento único que contém uma anotação normal:
```
    
    @Author(@Name(first = "Joe", last = "Hacker"))
    public class BitTwiddle { ... }
    
    
```

Aqui está um exemplo de uma anotação de elemento único que usa uma classe enum definida dentro da declaração da interface de anotação:
```
    
    @Quality(Quality.Level.GOOD)
    public class Karma { ... }
    
    
```

### 9.7.4. Onde as Anotações Podem Aparecer

Uma _anotação de declaração_ é uma anotação que se aplica a uma declaração, e cuja interface de anotação é aplicável no contexto de declaração ([§9.6.4.1](<#/doc/jls/jls-09>)) representado por essa declaração; ou uma anotação que se aplica a uma declaração de classe, interface ou parâmetro de tipo, e cuja interface de anotação é aplicável em contextos de tipo ([§4.11](<#/doc/jls/jls-04>)).

Uma _anotação de tipo_ é uma anotação que se aplica a um tipo (ou qualquer parte de um tipo), e cuja interface de anotação é aplicável em contextos de tipo.

Por exemplo, dada a declaração de campo:
```
    @Foo int f;
```

`@Foo` é uma anotação de declaração em `f` se `Foo` for meta-anotada por `@Target(ElementType.FIELD)`, e uma anotação de tipo em `int` se `Foo` for meta-anotada por `@Target(ElementType.TYPE_USE)`. É possível que `@Foo` seja simultaneamente uma anotação de declaração e uma anotação de tipo.

Anotações de tipo podem ser aplicadas a um tipo de array ou a qualquer tipo de componente dele ([§10.1](<#/doc/jls/jls-10>)). Por exemplo, assumindo que `A`, `B` e `C` são interfaces de anotação meta-anotadas com `@Target(ElementType.TYPE_USE)`, então dada a declaração de campo:
```
    @C int @A [] @B [] f;
```

`@A` se aplica ao tipo de array `int`[]`[]`, `@B` se aplica ao seu tipo de componente `int`[]`, e `@C` se aplica ao tipo de elemento `int`. Para mais exemplos, veja [§10.2](<#/doc/jls/jls-10>).

Uma propriedade importante desta sintaxe é que, em duas declarações que diferem apenas no número de níveis de array, as anotações à esquerda do tipo se referem ao mesmo tipo. Por exemplo, `@C` se aplica ao tipo `int` em todas as seguintes declarações:
```
    @C int f;
    @C int[] f;
    @C int[][] f;
    
```

É costumeiro, embora não obrigatório, escrever anotações de declaração antes de todos os outros modificadores, e anotações de tipo imediatamente antes do tipo ao qual se aplicam.

É possível que uma anotação apareça em um local sintático em um programa onde ela poderia plausivelmente se aplicar a uma declaração, a um tipo, ou a ambos. Isso pode acontecer em qualquer um dos seis contextos de declaração onde os modificadores precedem imediatamente o tipo da entidade declarada:

*   Declarações de método (incluindo elementos de interfaces de anotação)

*   Declarações de construtor

*   Declarações de campo (incluindo constantes enum)

*   Declarações de parâmetro formal e de exceção

*   Declarações de variável local

*   Declarações de componente de record

A gramática da linguagem de programação Java trata inequivocamente as anotações nesses locais como modificadores para uma declaração ([§8.3](<#/doc/jls/jls-08>)), mas isso é puramente uma questão sintática. Se uma anotação se aplica à declaração ou ao tipo da entidade declarada - e, portanto, se a anotação é uma _anotação de declaração_ ou uma _anotação de tipo_ - depende da aplicabilidade da interface da anotação:

*   Se a interface da anotação for aplicável no contexto de declaração correspondente à declaração, e não em contextos de tipo, então a anotação é considerada aplicável apenas à declaração.

*   Se a interface da anotação for aplicável em contextos de tipo, e não no contexto de declaração correspondente à declaração, então a anotação é considerada aplicável apenas ao tipo que está mais próximo da anotação.

*   Se a interface da anotação for aplicável no contexto de declaração correspondente à declaração _e_ em contextos de tipo, então a anotação é considerada aplicável tanto à declaração _quanto_ ao tipo que está mais próximo da anotação.

Nos segundo e terceiro casos acima, o tipo que está _mais próximo_ da anotação é determinado da seguinte forma:

*   Se a anotação aparecer antes de uma declaração de método `void` ou de uma declaração de variável que usa `var` ([§14.4](<#/doc/jls/jls-14>), [§15.27.1](<#/doc/jls/jls-15>)), então não há tipo mais próximo. Se a interface da anotação for considerada aplicável apenas ao tipo que está mais próximo da anotação, ocorre um erro em tempo de compilação.

*   Se a anotação aparecer antes de uma declaração de construtor, então o tipo mais próximo é o tipo do objeto recém-construído. O tipo do objeto recém-construído é o nome totalmente qualificado do tipo que imediatamente envolve a declaração do construtor. Dentro desse nome totalmente qualificado, a anotação se aplica ao nome de tipo simples indicado pela declaração do construtor.

*   Em todos os outros casos, o tipo mais próximo é o tipo escrito no código-fonte para a entidade declarada; se esse tipo for um tipo de array, então o tipo de elemento é considerado o mais próximo da anotação.

Por exemplo, na declaração de campo `@Foo public static String f;`, o tipo que está mais próximo de `@Foo` é `String`. (Se o tipo da declaração de campo tivesse sido escrito como `java.lang.String`, então `java.lang.String` seria o tipo mais próximo de `@Foo`, e regras posteriores proibiriam uma anotação de tipo de se aplicar ao nome do pacote `java`.) Na declaração de método genérico `@Foo <T> int[] m() {...}`, o tipo escrito para a entidade declarada é `int`[]`, então `@Foo` se aplica ao tipo de elemento `int`.

Declarações de variáveis locais que não usam `var` são semelhantes às declarações de parâmetros formais de expressões lambda, pois ambas permitem anotações de declaração e anotações de tipo no código-fonte, mas apenas as anotações de tipo podem ser armazenadas no arquivo `class`.

É um erro em tempo de compilação se uma anotação da interface A for sintaticamente um modificador para:

*   uma declaração de módulo, mas A não é aplicável a declarações de módulo.

*   uma declaração de pacote, mas A não é aplicável a declarações de pacote.

*   uma declaração de classe ou interface, mas A não é aplicável a declarações de tipo ou em contextos de tipo; ou

uma declaração de interface de anotação, mas A não é aplicável a declarações de interface de anotação ou declarações de tipo ou em contextos de tipo.

*   uma declaração de método (incluindo um elemento de uma interface de anotação), mas A não é aplicável a declarações de método ou em contextos de tipo.

*   uma declaração de construtor, mas A não é aplicável a declarações de construtor ou em contextos de tipo.

*   uma declaração de parâmetro de tipo de uma classe, interface, método ou construtor genérico, mas A não é aplicável a declarações de parâmetro de tipo ou em contextos de tipo.

*   uma declaração de campo (ou uma constante enum), mas A não é aplicável a declarações de campo ou em contextos de tipo.

*   uma declaração de parâmetro formal ou de exceção, mas A não é aplicável a declarações de parâmetro formal e de exceção ou em contextos de tipo.

*   um parâmetro receptor, mas A não é aplicável em contextos de tipo.

*   uma declaração de variável local em uma instrução ou um padrão, mas A não é aplicável a declarações de variável local ou em contextos de tipo.

*   um componente de record, mas A não é aplicável a declarações de componente de record, declarações de campo, declarações de método ou declarações de parâmetro formal e de exceção, ou em contextos de tipo.

Seis dessas onze cláusulas mencionam "... ou em contextos de tipo" porque elas caracterizam os seis locais sintáticos, mencionados anteriormente nesta seção, onde uma anotação poderia plausivelmente se aplicar a uma declaração ou a um tipo. Além disso, duas das onze cláusulas - para declarações de classe e interface, e para declarações de parâmetro de tipo - mencionam "... ou em contextos de tipo" porque às vezes é conveniente poder aplicar uma anotação cuja interface é meta-anotada com `@Target(ElementType.TYPE_USE)` (portanto, aplicável em contextos de tipo) à declaração de uma classe, interface ou parâmetro de tipo.

Uma anotação de tipo é _admissível_ se ambas as seguintes condições forem verdadeiras:

*   O nome simples ao qual a anotação está mais próxima é classificado como um _TypeName_, não um _PackageName_.

*   Se o nome simples ao qual a anotação está mais próxima for seguido por "`.`" e outro _TypeName_ - ou seja, a anotação aparece como `@Foo T.U` - então `U` denota uma classe interna de `T`.

A intuição por trás da segunda cláusula é que, se `A.this` for legal em uma classe aninhada contida por `A`, então `A` pode ser anotada porque representa o tipo de algum objeto em tempo de execução. Por outro lado, se `A.this` não for legal - porque a classe onde aparece não tem uma instância envolvente de `A` em tempo de execução - então `A` não pode ser anotada porque é logicamente apenas um nome, semelhante aos componentes de um nome de pacote em um nome de tipo totalmente qualificado.

Por exemplo, no programa a seguir, não é possível escrever `A.this` no corpo de `B`, pois `B` não possui instâncias lexicamente envolventes. Portanto, não é possível aplicar `@Foo` a `A` no tipo `A.B`, porque `A` é logicamente apenas um nome, não um tipo.
```
    
    @Target(ElementType.TYPE_USE)
    @interface Foo {}
    
    class A {
        static class B {}
    }
    
    @Foo A.B x;  // Illegal
    
    
```

Por outro lado, no programa a seguir, é possível escrever `C.this` no corpo de `D`. Portanto, é possível aplicar `@Foo` a `C` no tipo `C.D`, porque `C` representa o tipo de algum objeto em tempo de execução.
```
    
    @Target(ElementType.TYPE_USE)
    @interface Foo {}
    
    class Test {
        static class C {
            class D {}
        }
    
        @Foo C.D x;  // Legal
    }
    
    
```

É um erro em tempo de compilação se uma anotação da interface A se aplica ao nível mais externo de um tipo em um contexto de tipo, e A não é aplicável em contextos de tipo ou no contexto de declaração (se houver) que ocupa o mesmo local sintático.

É um erro em tempo de compilação se uma anotação da interface A se aplica a uma parte de um tipo (ou seja, não o nível mais externo) em um contexto de tipo, e A não é aplicável em contextos de tipo.

É um erro em tempo de compilação se uma anotação da interface A se aplica a um tipo (ou qualquer parte de um tipo) em um contexto de tipo, e A é aplicável em contextos de tipo, mas a anotação não é admissível.

Por exemplo, assuma uma interface de anotação `TA` que é meta-anotada apenas com `@Target(ElementType.TYPE_USE)`. Os termos `@TA java.lang.Object` e `java.@TA lang.Object` são ilegais porque o nome simples ao qual `@TA` está mais próximo é classificado como um nome de pacote. Por outro lado, `java.lang.@TA Object` é legal.

Note que os termos ilegais são ilegais "em todos os lugares". A proibição de anotar nomes de pacotes se aplica amplamente: a locais que são apenas contextos de tipo, como `class ... extends @TA java.lang.Object {...}`, e a locais que são tanto contextos de declaração quanto de tipo, como `@TA java.lang.Object f;`. (Não há locais que sejam apenas contextos de declaração onde um nome de pacote poderia ser anotado, pois declarações de pacote, classe, interface e parâmetro de tipo introduzem apenas nomes simples.)

Se `TA` for adicionalmente meta-anotada com `@Target(ElementType.FIELD)`, então o termo `@TA java.lang.Object` é legal em locais que são tanto contextos de declaração quanto de tipo, como uma declaração de campo `@TA java.lang.Object f;`. Aqui, `@TA` é considerada aplicável à declaração de `f` (e não ao tipo `java.lang.Object`) porque `TA` é aplicável no contexto de declaração de campo.

### 9.7.5. Múltiplas Anotações da Mesma Interface

É um erro em tempo de compilação se múltiplas anotações da mesma interface A aparecerem em um contexto de declaração ou contexto de tipo, a menos que A seja repetível ([§9.6.3](<#/doc/jls/jls-09>)) e tanto A quanto a interface de anotação contendo A sejam aplicáveis no contexto de declaração ou contexto de tipo ([§9.6.4.1](<#/doc/jls/jls-09>)).

É costumeiro, embora não obrigatório, que múltiplas anotações da mesma interface apareçam consecutivamente.

Se um contexto de declaração ou contexto de tipo tiver múltiplas anotações de uma interface de anotação repetível A, então é como se o contexto não tivesse anotações explicitamente declaradas da interface A e uma anotação implicitamente declarada da interface de anotação contendo A.

A anotação implicitamente declarada é chamada de _anotação contêiner_, e as múltiplas anotações da interface A que apareceram no contexto são chamadas de _anotações base_. Os elementos do elemento `value` (do tipo array) da anotação contêiner são todas as anotações base na ordem da esquerda para a direita em que apareceram no contexto.

É um erro em tempo de compilação se, em um contexto de declaração ou contexto de tipo, houver múltiplas anotações de uma interface de anotação repetível A e quaisquer anotações da interface de anotação contendo A.

Em outras palavras, não é possível repetir anotações onde uma anotação da mesma interface que seu contêiner também aparece. Isso proíbe código obscuro como:
```
    
    @Foo(0) @Foo(1) @FooContainer({@Foo(2)})
    class A {}
    
    
```

Se este código fosse legal, então múltiplos níveis de contenção seriam necessários: primeiro as anotações base da interface `Foo` seriam contidas por uma anotação contêiner implicitamente declarada da interface `FooContainer`, então essa anotação e a anotação explicitamente declarada da interface `FooContainer` seriam contidas em outra anotação implicitamente declarada. Essa complexidade é indesejável no julgamento dos designers da linguagem de programação Java. Outra abordagem, tratando as anotações base da interface `Foo` como se tivessem ocorrido junto com `@Foo(2)` na anotação `@FooContainer` explícita, é indesejável porque poderia mudar como programas reflexivos interpretam a anotação `@FooContainer`.

É um erro em tempo de compilação se, em um contexto de declaração ou contexto de tipo, houver uma anotação de uma interface de anotação repetível A e múltiplas anotações da interface de anotação contendo A.

Esta regra foi projetada para permitir o seguinte código:
```
    
    @Foo(1) @FooContainer({@Foo(2)})
    class A {}
    
    
```

Com apenas uma anotação base da interface de anotação repetível `Foo`, nenhuma anotação contêiner é implicitamente declarada, mesmo que `FooContainer` seja a interface de anotação contendo `Foo`. No entanto, repetir a anotação da interface `FooContainer`, como em:
```
    
    @Foo(1) @FooContainer({@Foo(2)}) @FooContainer({@Foo(3)})
    class A {}
    
    
```

é proibido, mesmo que `FooContainer` seja repetível com uma interface de anotação contendo a sua própria. É obscuro repetir anotações que são elas próprias contêineres quando uma anotação da interface repetível subjacente está presente.
## 9.8. Interfaces Funcionais

Uma _interface funcional_ é uma interface que não é declarada `sealed` e possui apenas um método `abstract` (além dos métodos de `Object`), e, portanto, representa um único contrato de função. Este método "único" pode assumir a forma de múltiplos métodos `abstract` com assinaturas equivalentes para sobrescrita herdadas de superinterfaces; neste caso, os métodos herdados representam logicamente um único método.

Para uma interface I que não é declarada `sealed`, seja `M` o conjunto de métodos `abstract` que são membros de I e que não possuem a mesma assinatura que qualquer método de instância `public` da classe `Object` ([§4.3.2](<#/doc/jls/jls-04>)). Então, I é uma _interface funcional_ se existir um método `m` em `M` para o qual ambas as seguintes condições são verdadeiras:

  * A assinatura de `m` é uma subassinatura ([§8.4.2](<#/doc/jls/jls-08>)) da assinatura de cada método em `M`.

  * `m` é return-type-substitutable ([§8.4.5](<#/doc/jls/jls-08>)) para cada método em `M`.

Além do processo usual de criação de uma instância de interface declarando e instanciando uma classe ([§15.9](<#/doc/jls/jls-15>)), instâncias de interfaces funcionais podem ser criadas com expressões de referência de método e expressões lambda ([§15.13](<#/doc/jls/jls-15>), [§15.27](<#/doc/jls/jls-15>)).

A definição de _interface funcional_ exclui métodos em uma interface que também são métodos `public` em `Object`. Isso permite o tratamento funcional de uma interface como `java.util.Comparator<T>` que declara múltiplos métodos `abstract` dos quais apenas um é realmente "novo" - `int compare(T,T)`. O outro \- `boolean equals(Object)` \- é uma declaração explícita de um método `abstract` que, de outra forma, seria implicitamente declarado na interface ([§9.2](<#/doc/jls/jls-09>)) e automaticamente implementado por toda classe que `implements` a interface.

Note que se métodos não-`public` de `Object`, como `clone()`, forem explicitamente declarados em uma interface como `public`, eles _não_ são automaticamente implementados por toda classe que `implements` a interface. A implementação herdada de `Object` é `protected` enquanto o método da interface é `public`, então a única maneira de implementar a interface seria para uma classe sobrescrever o método `Object` não-`public` com um método `public`.

**Exemplo 9.8-1. Interfaces Funcionais**

Um exemplo simples de uma interface funcional é:
```
    interface Runnable {
        void run();
    }
    
```

A seguinte interface não é funcional porque não declara nada que já não seja um membro de `Object`:
```
    interface NonFunc {
        boolean equals(Object obj);
    }
    
```

No entanto, sua subinterface pode ser funcional declarando um método `abstract` que não é um membro de `Object`:
```
    interface Func extends NonFunc {
        int compare(String o1, String o2);
    }
    
```

Similarmente, a conhecida interface `java.util.Comparator<T>` é funcional porque possui um método `abstract` que não é de `Object`:
```
    interface Comparator<T> {
        boolean equals(Object obj);
        int compare(T o1, T o2);
    }
    
```

A seguinte interface não é funcional porque, embora declare apenas um método `abstract` que não é um membro de `Object`, ela declara _dois_ métodos `abstract` que não são membros `public` de `Object`:
```
    interface Foo {
        int m();
        Object clone();
    }
    
```

**Exemplo 9.8-2. Interfaces Funcionais e Erasure**

Na seguinte hierarquia de interfaces, `Z` é uma interface funcional porque, embora herde dois métodos `abstract` que não são membros de `Object`, eles possuem a mesma assinatura, então os métodos herdados representam logicamente um único método:
```
    interface X { int m(Iterable<String> arg); }
    interface Y { int m(Iterable<String> arg); }
    interface Z extends X, Y {}
    
```

Similarmente, `Z` é uma interface funcional na seguinte hierarquia de interfaces porque `Y.m` é uma subassinatura de `X.m` e é return-type-substitutable para `X.m`:
```
    interface X { Iterable m(Iterable<String> arg); }
    interface Y { Iterable<String> m(Iterable arg); }
    interface Z extends X, Y {}
    
```

A definição de _interface funcional_ respeita o fato de que uma interface não pode ter dois membros que não são subassinaturas um do outro, mas que possuem a mesma erasure ([§9.4.1.2](<#/doc/jls/jls-09>)). Assim, nas três hierarquias de interfaces a seguir, onde `Z` causa um erro em tempo de compilação, `Z` não é uma interface funcional: (porque nenhum de seus membros `abstract` é subassinatura de todos os outros membros `abstract`)
```
    interface X { int m(Iterable<String> arg); }
    interface Y { int m(Iterable<Integer> arg); }
    interface Z extends X, Y {}
    
    interface X { int m(Iterable<String> arg, Class c); }
    interface Y { int m(Iterable arg, Class<?> c); }
    interface Z extends X, Y {}
    
    interface X<T> { void m(T arg); }
    interface Y<T> { void m(T arg); }
    interface Z<A, B> extends X<A>, Y<B> {}
    
```

Similarmente, a definição de "interface funcional" respeita o fato de que uma interface pode ter métodos com assinaturas equivalentes para sobrescrita apenas se um for return-type-substitutable para todos os outros. Assim, na seguinte hierarquia de interfaces onde `Z` causa um erro em tempo de compilação, `Z` não é uma interface funcional: (porque nenhum de seus membros `abstract` é return-type-substitutable para todos os outros membros `abstract`)
```
    interface X { long m(); }
    interface Y { int  m(); }
    interface Z extends X, Y {}
    
```

No exemplo a seguir, as declarações de `Foo<T,N>` e `Bar` são legais: em cada uma, os métodos chamados `m` não são subassinaturas um do outro, mas possuem erasures diferentes. Ainda assim, o fato de que os métodos em cada uma não são subassinaturas significa que `Foo<T,N>` e `Bar` não são interfaces funcionais. No entanto, `Baz` é uma interface funcional porque os métodos que herda de `Foo<Integer,Integer>` possuem a mesma assinatura e, portanto, representam logicamente um único método.
```
    interface Foo<T, N extends Number> {
        void m(T arg);
        void m(N arg);
    }
    interface Bar extends Foo<String, Integer> {}
    interface Baz extends Foo<Integer, Integer> {}
    
```

Finalmente, os exemplos a seguir demonstram as mesmas regras acima, mas com métodos genéricos:
```
    interface Exec { <T> T execute(Action<T> a); }
      // Functional
    
    interface X { <T> T execute(Action<T> a); }
    interface Y { <S> S execute(Action<S> a); }
    interface Exec extends X, Y {}
      // Functional: signatures are logically "the same"
    
    interface X { <T>   T execute(Action<T> a); }
    interface Y { <S,T> S execute(Action<S> a); }
    interface Exec extends X, Y {}
      // Error: different signatures, same erasure
    
```

**Exemplo 9.8-3. Interfaces Funcionais Genéricas**

Interfaces funcionais podem ser genéricas, como `java.util.function.Predicate<T>`. Tal interface funcional pode ser parametrizada de uma forma que produza métodos `abstract` distintos - ou seja, múltiplos métodos que não podem ser legalmente sobrescritos com uma única declaração. Por exemplo:
```
    interface I    { Object m(Class c); }
    interface J<S> { S m(Class<?> c); }
    interface K<T> { T m(Class<?> c); }
    interface Functional<S,T> extends I, J<S>, K<T> {}
    
```

`Functional<S,T>` é uma interface funcional - `I.m` é return-type-substitutable para `J.m` e `K.m` \- mas o tipo de interface funcional `Functional<String,Integer>` claramente não pode ser implementado com um único método. No entanto, outras parametrizações de `Functional<S,T>` que são tipos de interface funcional são possíveis.

A declaração de uma interface funcional permite que um _tipo de interface funcional_ seja usado em um programa. Existem quatro tipos de tipo de interface funcional:

  * O tipo de uma interface funcional não-genérica ([§6.1](<#/doc/jls/jls-06>))

  * Um tipo parametrizado que é uma parametrização ([§4.5](<#/doc/jls/jls-04>)) de uma interface funcional genérica

  * O raw type ([§4.8](<#/doc/jls/jls-04>)) de uma interface funcional genérica

  * Um tipo de interseção ([§4.9](<#/doc/jls/jls-04>)) que induz uma interface funcional nocional

Em circunstâncias especiais, é útil tratar um tipo de interseção como um tipo de interface funcional. Tipicamente, isso se parecerá com uma interseção de um tipo de interface funcional com um ou mais tipos de interface marcadora, como `Runnable & `java.io.Serializable`. Tal interseção pode ser usada em casts ([§15.16](<#/doc/jls/jls-15>)) que forçam uma expressão lambda a se conformar a um determinado tipo. Se um dos tipos de interface na interseção for `java.io.Serializable`, um suporte especial em tempo de execução para serialização é acionado ([§15.27.4](<#/doc/jls/jls-15>)).

## 9.9. Tipos de Função

O _tipo de função_ de uma interface funcional I é um tipo de método ([§8.2](<#/doc/jls/jls-08>)) que pode ser usado para sobrescrever ([§8.4.8](<#/doc/jls/jls-08>)) o(s) método(s) `abstract` de I.

Seja `M` o conjunto de métodos `abstract` definidos para I. O tipo de função de I consiste no seguinte:

  * Parâmetros de tipo, tipos de parâmetros formais e tipo de retorno:

    Seja `m` um método em `M` com:

    1. uma assinatura que é uma subassinatura da assinatura de cada método em `M`; e

    2. um tipo de retorno R (possivelmente `void`), onde R é o mesmo que o tipo de retorno de cada método em `M`, ou R é um tipo de referência e é um subtipo do tipo de retorno de cada método em `M` (após adaptação para quaisquer parâmetros de tipo ([§8.4.4](<#/doc/jls/jls-08>)) se os dois métodos tiverem a mesma assinatura).

    Se nenhum método assim existir, então seja `m` um método em `M` com:

    1. uma assinatura que é uma subassinatura da assinatura de cada método em `M`; e

    2. um tipo de retorno tal que `m` é return-type-substitutable ([§8.4.5](<#/doc/jls/jls-08>)) para cada método em `M`.

    Os parâmetros de tipo, tipos de parâmetros formais e tipo de retorno do tipo de função são conforme dados por `m`.

  * Cláusula `throws`:

    A cláusula `throws` do tipo de função é derivada das cláusulas `throws` dos métodos em `M`, da seguinte forma:

    1. Se o tipo de função for genérico, as cláusulas `throws` são primeiro adaptadas aos parâmetros de tipo do tipo de função ([§8.4.4](<#/doc/jls/jls-08>)).

    Se o tipo de função não for genérico, mas pelo menos um método em `M` for genérico, as cláusulas `throws` são primeiro apagadas (erased).

    2. Então, a cláusula `throws` do tipo de função inclui todo tipo E que satisfaz as seguintes restrições:

       * E é mencionado em uma das cláusulas `throws`.

       * Para cada cláusula `throws`, E é um subtipo de algum tipo nomeado nessa cláusula.

Quando alguns tipos de retorno em `M` são raw e outros não, a definição de um tipo de função tenta escolher o tipo mais específico, se possível. Por exemplo, se os tipos de retorno são `LinkedList` e `LinkedList<String>`, então o último é imediatamente escolhido como o tipo de retorno do tipo de função. Quando não há um tipo mais específico, a definição compensa encontrando o tipo de retorno mais substitutable. Por exemplo, se houver um terceiro tipo de retorno, `List<?>`, então não é o caso de que um dos tipos de retorno seja um subtipo de todos os outros (já que `LinkedList` raw não é um subtipo de `List<?>`); em vez disso, `LinkedList<String>` é escolhido como o tipo de retorno do tipo de função porque é return-type-substitutable para `LinkedList` e `List<?>`.

O objetivo que impulsiona a definição dos tipos de exceção lançados por um tipo de função é suportar o invariante de que um método com a cláusula `throws` resultante poderia sobrescrever cada método `abstract` da interface funcional. Conforme [§8.4.6](<#/doc/jls/jls-08>), isso significa que o tipo de função não pode lançar "mais" exceções do que qualquer método único no conjunto `M`, então procuramos por tantos tipos de exceção quanto possível que sejam "cobertos" pela cláusula `throws` de cada método.

O tipo de função de um tipo de interface funcional é especificado da seguinte forma:

  * O tipo de função do tipo de uma interface funcional não-genérica I é simplesmente o tipo de função da interface funcional I, conforme definido acima.

  * O tipo de função de um tipo de interface funcional parametrizado I`<`A1...An`>`, onde A1...An são tipos e os parâmetros de tipo correspondentes de I são P1...Pn, é derivado aplicando a substituição `[`P1:=A1, ..., Pn:=An`]` ao tipo de função da interface funcional genérica I`<`P1...Pn`>`.

  * O tipo de função de um tipo de interface funcional parametrizado I`<`A1...An`>`, onde um ou mais de A1...An é um wildcard, é o tipo de função da _parametrização não-wildcard_ de I, I`<`T1...Tn`>`. A parametrização não-wildcard é determinada da seguinte forma.

    Sejam P1...Pn os parâmetros de tipo de I com os limites correspondentes B1...Bn. Para todo _i_ (1 ≤ _i_ ≤ _n_), Ti é derivado de acordo com a forma de Ai:

    * Se Ai é um tipo, então Ti = Ai.

    * Se Ai é um wildcard, e o limite do parâmetro de tipo correspondente, Bi, menciona um de P1...Pn, então Ti é indefinido e não há tipo de função.

    * Caso contrário:

      * Se Ai é um wildcard não-delimitado `?`, então Ti = Bi.

      * Se Ai é um wildcard com limite superior `?` `extends` Ui, então Ti = glb(Ui, Bi) ([§5.1.10](<#/doc/jls/jls-05>)).

      * Se Ai é um wildcard com limite inferior `?` `super` `Li`, então Ti = `Li`.

  * O tipo de função do raw type de uma interface funcional genérica I`<`...`>` é a erasure do tipo de função da interface funcional genérica I`<`...`>`.

  * O tipo de função de um tipo de interseção que induz uma interface funcional nocional é o tipo de função da interface funcional nocional.

**Exemplo 9.9-1. Tipos de Função**

Dadas as seguintes interfaces:
```
    interface X { void m() throws IOException; }
    interface Y { void m() throws EOFException; }
    interface Z { void m() throws ClassNotFoundException; }
    
```

o tipo de função de:
```
    interface XY extends X, Y {}
    
```

é:
```
    ()->void throws EOFException
    
```

enquanto o tipo de função de:
```
    interface XYZ extends X, Y, Z {}
    
```

é:
```
    ()->void (throws nothing)
    
```

Dadas as seguintes interfaces:
```
    interface A {
        List<String> foo(List<String> arg)
          throws IOException, SQLTransientException;
    }
    interface B {
        List foo(List<String> arg)
          throws EOFException, SQLException, TimeoutException;
    }
    interface C {
        List foo(List arg) throws Exception;
    }
    
```

o tipo de função de:
```
    interface D extends A, B {}
    
```

é:
```
    (List<String>)->List<String>
      throws EOFException, SQLTransientException
    
```

enquanto o tipo de função de:
```
    interface E extends A, B, C {}
    
```

é:
```
    (List)->List throws EOFException, SQLTransientException
    
```

O tipo de função de uma interface funcional é definido de forma não determinística: embora as assinaturas em `M` sejam "as mesmas", elas podem ser sintaticamente diferentes (`HashMap.Entry` e `Map.Entry`, por exemplo); o tipo de retorno pode ser um subtipo de todos os outros tipos de retorno, mas pode haver outros tipos de retorno que são _também_ subtipos (`List<?>` e `List<? extends Object>`, por exemplo); e a ordem dos tipos lançados não é especificada. Essas distinções são sutis, mas às vezes podem ser importantes. No entanto, os tipos de função não são usados na linguagem de programação Java de tal forma que o não determinismo importe. Note que o tipo de retorno e a cláusula `throws` de um "método mais específico" também são definidos de forma não determinística quando há múltiplos métodos `abstract` ([§15.12.2.5](<#/doc/jls/jls-15>)).

Quando uma interface funcional genérica é parametrizada por wildcards, existem muitas instanciações diferentes que poderiam satisfazer o wildcard e produzir tipos de função diferentes. Por exemplo, cada um de `Predicate<Integer>` (tipo de função `Integer `->` boolean`), `Predicate<Number>` (tipo de função `Number `->` boolean`) e `Predicate<Object>` (tipo de função `Object `->` boolean`) é um `Predicate<? super Integer>`. Às vezes, é possível saber pelo contexto, como os tipos de parâmetros de uma expressão lambda, qual tipo de função é pretendido ([§15.27.3](<#/doc/jls/jls-15>)). Outras vezes, é necessário escolher um; nestas circunstâncias, os limites são usados. (Esta estratégia simples não pode garantir que o tipo resultante satisfará certos limites complexos, então nem todos os casos complexos são suportados.)

**Exemplo 9.9-2. Tipos de Função Genéricos**

Um tipo de função pode ser genérico, pois o método `abstract` de uma interface funcional pode ser genérico. Por exemplo, na seguinte hierarquia de interfaces:
```
    interface G1 {
        <E extends Exception> Object m() throws E;
    }
    interface G2 {
        <F extends Exception> String m() throws Exception;
    }
    interface G extends G1, G2 {}
    
```

o tipo de função de `G` é:
```
    <F extends Exception> ()->String throws F
    
```

Um tipo de função genérico para uma interface funcional pode ser implementado por uma expressão de referência de método ([§15.13](<#/doc/jls/jls-15>)), mas não por uma expressão lambda ([§15.27](<#/doc/jls/jls-15>)), pois não há sintaxe para expressões lambda genéricas.

* * *

[Anterior](<#/doc/jls/jls-08>) | | [Próximo](<#/doc/jls/jls-10>)
---|---|---
Capítulo 8. Classes | [Início](<#/doc/jls/jls-01>) | Capítulo 10. Arrays

* * *

[ Aviso Legal ](<#/>)