[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Java SE Specifications](<#/>) > [Java Language Specification](<#/doc/jls/jls-01>)

Capítulo 14. Blocos, Declarações e Padrões  
---  
[Anterior](<#/doc/jls/jls-13>)  |   |  [Próximo](<#/doc/jls/jls-15>)  
  
* * *

# Capítulo 14. Blocos, Declarações e Padrões 

**Sumário**

[14.1. Conclusão Normal e Abrupta de Declarações](<#/doc/jls/jls-14>)
[14.2. Blocos](<#/doc/jls/jls-14>)
[14.3. Declarações de Classes e Interfaces Locais](<#/doc/jls/jls-14>)
[14.4. Declarações de Variáveis Locais](<#/doc/jls/jls-14>)
    

[14.4.1. Declaradores e Tipos de Variáveis Locais](<#/doc/jls/jls-14>)
[14.4.2. Instruções de Declaração de Variáveis Locais](<#/doc/jls/jls-14>)
[14.5. Declarações](<#/doc/jls/jls-14>)
[14.6. A Declaração Vazia](<#/doc/jls/jls-14>)
[14.7. Declarações Rotuladas](<#/doc/jls/jls-14>)
[14.8. Declarações de Expressão](<#/doc/jls/jls-14>)
[14.9. A Declaração `if`](<#/doc/jls/jls-14>)
    

[14.9.1. A Declaração `if`-`then`](<#/doc/jls/jls-14>)
[14.9.2. A Declaração `if`-`then`-`else`](<#/doc/jls/jls-14>)
[14.10. A Declaração `assert`](<#/doc/jls/jls-14>)
[14.11. A Declaração `switch`](<#/doc/jls/jls-14>)
    

[14.11.1. Blocos `switch`](<#/doc/jls/jls-14>)
    

[14.11.1.1. Blocos `switch` Exaustivos](<#/doc/jls/jls-14>)
[14.11.1.2. Determinando qual Rótulo `switch` se Aplica em Tempo de Execução](<#/doc/jls/jls-14>)
[14.11.2. O Bloco `switch` de uma Declaração `switch`](<#/doc/jls/jls-14>)
[14.11.3. Execução de uma Declaração `switch`](<#/doc/jls/jls-14>)
[14.12. A Declaração `while`](<#/doc/jls/jls-14>)
    

[14.12.1. Conclusão Abrupta da Declaração `while`](<#/doc/jls/jls-14>)
[14.13. A Declaração `do`](<#/doc/jls/jls-14>)
    

[14.13.1. Conclusão Abrupta da Declaração `do`](<#/doc/jls/jls-14>)
[14.14. A Declaração `for`](<#/doc/jls/jls-14>)
    

[14.14.1. A Declaração `for` básica](<#/doc/jls/jls-14>)
    

[14.14.1.1. Inicialização da Declaração `for`](<#/doc/jls/jls-14>)
[14.14.1.2. Iteração da Declaração `for`](<#/doc/jls/jls-14>)
[14.14.1.3. Conclusão Abrupta da Declaração `for`](<#/doc/jls/jls-14>)
[14.14.2. A declaração `for` aprimorada](<#/doc/jls/jls-14>)
[14.15. A Declaração `break`](<#/doc/jls/jls-14>)
[14.16. A Declaração `continue`](<#/doc/jls/jls-14>)
[14.17. A Declaração `return`](<#/doc/jls/jls-14>)
[14.18. A Declaração `throw`](<#/doc/jls/jls-14>)
[14.19. A Declaração `synchronized`](<#/doc/jls/jls-14>)
[14.20. A declaração `try`](<#/doc/jls/jls-14>)
    

[14.20.1. Execução de `try`-`catch`](<#/doc/jls/jls-14>)
[14.20.2. Execução de `try`-`finally` e `try`-`catch`-`finally`](<#/doc/jls/jls-14>)
[14.20.3. `try`-with-resources](<#/doc/jls/jls-14>)
    

[14.20.3.1. `try`-with-resources` Básico](<#/doc/jls/jls-14>)
[14.20.3.2. `try`-with-resources` Estendido](<#/doc/jls/jls-14>)
[14.21. A Declaração `yield`](<#/doc/jls/jls-14>)
[14.22. Declarações Inalcançáveis](<#/doc/jls/jls-14>)
[14.30. Padrões](<#/doc/jls/jls-14>)
    

[14.30.1. Tipos de Padrões](<#/doc/jls/jls-14>)
[14.30.2. Casamento de Padrões](<#/doc/jls/jls-14>)
[14.30.3. Propriedades dos Padrões](<#/doc/jls/jls-14>)

A sequência de execução de um programa é controlada por _declarações_ , que são executadas por seu efeito e não possuem valores.

Algumas declarações _contêm_ outras declarações como parte de sua estrutura; tais outras declarações são _subdeclarações_ da declaração. Dizemos que a declaração S _contém imediatamente_ a declaração U se não houver uma declaração T diferente de S e U tal que S contenha T e T contenha U. Da mesma forma, algumas declarações contêm expressões ([§15 (_Expressões_)](<#/doc/jls/jls-15>)) como parte de sua estrutura.

A primeira seção deste capítulo discute a distinção entre conclusão normal e abrupta de declarações ([§14.1](<#/doc/jls/jls-14>)). A maioria das seções restantes explica os vários tipos de declarações, descrevendo em detalhes tanto seu comportamento normal quanto qualquer tratamento especial de conclusão abrupta.

Blocos são explicados primeiro ([§14.2](<#/doc/jls/jls-14>)), tanto porque podem aparecer em certos locais onde declarações não são permitidas quanto porque um tipo de declaração, uma instrução de declaração de variável local ([§14.4.2](<#/doc/jls/jls-14>)), deve ser imediatamente contida por um bloco. Declarações de classes e interfaces locais ([§14.3](<#/doc/jls/jls-14>)) não são declarações, mas também devem ser imediatamente contidas por um bloco.

Em seguida, uma manobra gramatical que contorna o familiar problema do "else pendente" ([§14.5](<#/doc/jls/jls-14>)) é explicada.

Toda declaração deve ser _alcançável_ em um certo sentido técnico ([§14.22](<#/doc/jls/jls-14>)).

As seções 14.23-14.29 não são utilizadas para permitir a introdução de novos tipos de declarações no futuro.

A última seção deste capítulo ([§14.30](<#/doc/jls/jls-14>)) descreve _padrões_ , que são usados dentro de declarações e expressões para declarar e inicializar condicionalmente variáveis locais. Um padrão fornece uma descrição concisa de como um valor, como um objeto, pode ser composto a partir de um ou mais outros valores, denotados por declarações de variáveis. O _casamento de padrões_ tenta extrair um ou mais valores de um dado valor, como se fosse para decompô-lo, e usa os valores extraídos para inicializar as variáveis declaradas pelo padrão.

## 14.1. Conclusão Normal e Abrupta de Declarações

Toda declaração possui um modo de execução normal no qual certas etapas computacionais são realizadas. As seções a seguir descrevem o modo de execução normal para cada tipo de declaração.

Se todas as etapas forem realizadas conforme descrito, sem indicação de conclusão abrupta, a declaração é considerada como _concluída normalmente_. No entanto, certos eventos podem impedir que uma declaração seja concluída normalmente:

  * As declarações `break`, `yield`, `continue` e `return` ([§14.15](<#/doc/jls/jls-14>), [§14.21](<#/doc/jls/jls-14>), [§14.16](<#/doc/jls/jls-14>), [§14.17](<#/doc/jls/jls-14>)) causam uma transferência de controle que pode impedir a conclusão normal de expressões, declarações e blocos que as contêm.

  * A avaliação de certas expressões pode lançar exceções da Java Virtual Machine ([§15.6](<#/doc/jls/jls-15>)). Uma declaração `throw` explícita ([§14.18](<#/doc/jls/jls-14>)) também resulta em uma exceção. Uma exceção causa uma transferência de controle que pode impedir a conclusão normal de declarações.

Se tal evento ocorrer, a execução de uma ou mais declarações pode ser encerrada antes que todas as etapas de seu modo de execução normal tenham sido concluídas; tais declarações são consideradas como _concluídas abruptamente_.

Uma conclusão abrupta sempre tem uma _razão_ associada, que é uma das seguintes:

  * Um `break` sem rótulo

  * Um `break` com um rótulo dado

  * Um `continue` sem rótulo

  * Um `continue` com um rótulo dado

  * Um `return` sem valor

  * Um `return` com um valor dado

  * Um `throw` com um valor dado, incluindo exceções lançadas pela Java Virtual Machine

  * Um `yield` com um valor dado

Os termos "concluir normalmente" e "concluir abruptamente" também se aplicam à avaliação de expressões ([§15.6](<#/doc/jls/jls-15>)). A única razão pela qual uma expressão pode ser concluída abruptamente é que uma exceção é lançada, seja por um `throw` com um valor dado ([§14.18](<#/doc/jls/jls-14>)) ou por uma exceção ou erro em tempo de execução ([§11 (_Exceções_)](<#/doc/jls/jls-11>), [§15.6](<#/doc/jls/jls-15>)).

Se uma declaração avalia uma expressão, a conclusão abrupta da expressão sempre causa a conclusão abrupta imediata da declaração, com a mesma razão. Todas as etapas subsequentes no modo de execução normal não são realizadas.

Salvo especificação em contrário neste capítulo, a conclusão abrupta de uma subdeclaração causa a conclusão abrupta imediata da própria declaração, com a mesma razão, e todas as etapas subsequentes no modo de execução normal da declaração não são realizadas.

Salvo especificação em contrário, uma declaração é concluída normalmente se todas as expressões que ela avalia e todas as subdeclarações que ela executa forem concluídas normalmente.

## 14.2. Blocos

Um _bloco_ é uma sequência de declarações, instruções de declaração de variáveis locais e declarações de classes e interfaces locais dentro de chaves.

Block:

`{` [[BlockStatements](<#/doc/jls/jls-14>)] `}`

BlockStatements:

[BlockStatement](<#/doc/jls/jls-14>) {[BlockStatement](<#/doc/jls/jls-14>)}

BlockStatement:

[LocalClassOrInterfaceDeclaration](<#/doc/jls/jls-14>)   
[LocalVariableDeclarationStatement](<#/doc/jls/jls-14>)   
[Statement](<#/doc/jls/jls-14>)

Um bloco é executado pela execução de cada uma das instruções de declaração de variáveis locais e outras declarações em ordem, da primeira para a última (da esquerda para a direita). Se todas essas declarações de bloco forem concluídas normalmente, então o bloco é concluído normalmente. Se alguma dessas declarações de bloco for concluída abruptamente por qualquer motivo, então o bloco é concluído abruptamente pela mesma razão.

## 14.3. Declarações de Classes e Interfaces Locais

Uma _classe local_ é uma classe aninhada ([§8 (_Classes_)](<#/doc/jls/jls-08>)) cuja declaração é imediatamente contida por um bloco ([§14.2](<#/doc/jls/jls-14>)).

Uma _interface local_ é uma interface aninhada ([§9 (_Interfaces_)](<#/doc/jls/jls-09>)) cuja declaração é imediatamente contida por um bloco.

LocalClassOrInterfaceDeclaration:

[ClassDeclaration](<#/doc/jls/jls-08>)   
[NormalInterfaceDeclaration](<#/doc/jls/jls-09>)

As seguintes produções são mostradas aqui por conveniência:

ClassDeclaration:

[NormalClassDeclaration](<#/doc/jls/jls-08>)   
[EnumDeclaration](<#/doc/jls/jls-08>)   
[RecordDeclaration](<#/doc/jls/jls-08>)

NormalClassDeclaration:

{[ClassModifier](<#/doc/jls/jls-08>)} `class` [TypeIdentifier](<#/doc/jls/jls-03>) [[TypeParameters](<#/doc/jls/jls-08>)] [[ClassExtends](<#/doc/jls/jls-08>)] [[ClassImplements](<#/doc/jls/jls-08>)] [[ClassPermits](<#/doc/jls/jls-08>)] [ClassBody](<#/doc/jls/jls-08>)

EnumDeclaration:

{[ClassModifier](<#/doc/jls/jls-08>)} `enum` [TypeIdentifier](<#/doc/jls/jls-03>) [[ClassImplements](<#/doc/jls/jls-08>)] [EnumBody](<#/doc/jls/jls-08>)

NormalInterfaceDeclaration:

{[InterfaceModifier](<#/doc/jls/jls-09>)} `interface` [TypeIdentifier](<#/doc/jls/jls-03>) [[TypeParameters](<#/doc/jls/jls-08>)] [[InterfaceExtends](<#/doc/jls/jls-09>)] [[InterfacePermits](<#/doc/jls/jls-09>)] [InterfaceBody](<#/doc/jls/jls-09>)

Declarações de classes e interfaces locais podem ser livremente intermisturadas com declarações (incluindo instruções de declaração de variáveis locais) no bloco que as contém.

É um erro em tempo de compilação se uma declaração de classe ou interface local tiver qualquer um dos modificadores de acesso `public`, `protected` ou `private` ([§6.6](<#/doc/jls/jls-06>)).

É um erro em tempo de compilação se uma declaração de classe ou interface local tiver o modificador `static` ([§8.1.1.4](<#/doc/jls/jls-08>)), `sealed` ou `non-sealed` ([§8.1.1.2](<#/doc/jls/jls-08>), [§9.1.1.4](<#/doc/jls/jls-09>)).

É um erro em tempo de compilação se a superclasse direta ou uma superinterface direta de uma classe local for `sealed`.

É um erro em tempo de compilação se uma superinterface direta de uma interface local for `sealed`.

Uma classe local pode ser uma classe normal ([§8.1](<#/doc/jls/jls-08>)), uma classe `enum` ([§8.9](<#/doc/jls/jls-08>)) ou uma classe `record` ([§8.10](<#/doc/jls/jls-08>)). Toda classe normal local é uma classe interna ([§8.1.3](<#/doc/jls/jls-08>)). Toda classe `enum` local e classe `record` local é implicitamente `static` ([§8.1.1.4](<#/doc/jls/jls-08>)), e portanto não é uma classe interna.

Uma interface local pode ser uma interface normal ([§9.1](<#/doc/jls/jls-09>)), mas não uma interface de anotação ([§9.6](<#/doc/jls/jls-09>)). Toda interface local é implicitamente `static` ([§9.1.1.3](<#/doc/jls/jls-09>)).

Assim como uma classe anônima ([§15.9.5](<#/doc/jls/jls-15>)), uma classe ou interface local não é membro de nenhum `package`, classe ou interface ([§7.1](<#/doc/jls/jls-07>), [§8.5](<#/doc/jls/jls-08>)). Diferente de uma classe anônima, uma classe ou interface local tem um nome simples ([§6.2](<#/doc/jls/jls-06>), [§6.7](<#/doc/jls/jls-06>)).

O escopo e o sombreamento de uma declaração de classe ou interface local são especificados em [§6.3](<#/doc/jls/jls-06>) e [§6.4](<#/doc/jls/jls-06>).

**Exemplo 14.3-1. Declarações de Classes Locais**

Aqui está um exemplo que ilustra vários aspectos das regras dadas acima:
```java
    class Global {
        class Cyclic {}
    
        void foo() {
            new Cyclic(); // create a Global.Cyclic
            class Cyclic extends Cyclic {} // circular definition
    
            {
                class Local {}
                {
                    class Local {} // compile-time error
                }
                class Local {} // compile-time error
                class AnotherLocal {
                    void bar() {
                        class Local {} // ok
                    }
                }
            }
            class Local {} // ok, not in scope of prior Local
        }
    }
    
```

A primeira declaração do método `foo` cria uma instância da classe membro `Global.Cyclic` em vez de uma instância da classe local `Cyclic`, porque a declaração aparece antes do escopo da declaração da classe local.

O fato de que o escopo de uma declaração de classe local abrange toda a sua declaração (não apenas seu corpo) significa que a definição da classe local `Cyclic` é de fato cíclica porque ela se estende a si mesma em vez de `Global.Cyclic`. Consequentemente, a declaração da classe local `Cyclic` é rejeitada em tempo de compilação.

Como nomes de classes locais não podem ser redeclarados dentro do mesmo método (ou construtor ou inicializador, conforme o caso), a segunda e terceira declarações de `Local` resultam em erros em tempo de compilação. No entanto, `Local` pode ser redeclarada no contexto de outra classe, mais profundamente aninhada, como `AnotherLocal`.

A declaração final de `Local` é legal, uma vez que ocorre fora do escopo de qualquer declaração anterior de `Local`.

## 14.4. Declarações de Variáveis Locais

Uma _declaração de variável local_ declara e opcionalmente inicializa uma ou mais variáveis locais ([§4.12.3](<#/doc/jls/jls-04>)).

LocalVariableDeclaration:

{[VariableModifier](<#/doc/jls/jls-08>)} [LocalVariableType](<#/doc/jls/jls-14>) [VariableDeclaratorList](<#/doc/jls/jls-08>)

LocalVariableType:

[UnannType](<#/doc/jls/jls-08>)   
`var`

Veja [§8.3](<#/doc/jls/jls-08>) para _UnannType_. As seguintes produções de [§4.3](<#/doc/jls/jls-04>), [§8.3](<#/doc/jls/jls-08>) e [§8.4.1](<#/doc/jls/jls-08>) são mostradas aqui por conveniência:

VariableModifier:

[Annotation](<#/doc/jls/jls-09>)   
`final`

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

Uma declaração de variável local pode aparecer nos seguintes locais:

  * uma instrução de declaração de variável local em um bloco ([§14.4.2](<#/doc/jls/jls-14>))

  * o cabeçalho de uma declaração `for` básica ([§14.14.1](<#/doc/jls/jls-14>))

  * o cabeçalho de uma declaração `for` aprimorada ([§14.14.2](<#/doc/jls/jls-14>))

  * a especificação de recurso de uma declaração `try`-with-resources ([§14.20.3](<#/doc/jls/jls-14>))

  * um padrão ([§14.30.1](<#/doc/jls/jls-14>))

As regras relativas aos modificadores de anotação para uma declaração de variável local são especificadas em [§9.7.4](<#/doc/jls/jls-09>) e [§9.7.5](<#/doc/jls/jls-09>).

Se a palavra-chave `final` aparecer como um modificador para uma declaração de variável local, então a variável local é uma variável `final` ([§4.12.4](<#/doc/jls/jls-04>)).

É um erro em tempo de compilação se `final` aparecer mais de uma vez como um modificador para uma declaração de variável local.

É um erro em tempo de compilação se uma declaração de variável local que (i) não inclui um _Identificador_ e (ii) não possui um inicializador, aparecer em qualquer um dos seguintes locais:

  * uma instrução de declaração de variável local em um bloco ([§14.4.2](<#/doc/jls/jls-14>))

  * o cabeçalho de uma declaração `for` básica ([§14.14.1](<#/doc/jls/jls-14>))

É um erro em tempo de compilação se o _LocalVariableType_ for `var` e qualquer um dos seguintes for verdadeiro:

  * Mais de um _VariableDeclarator_ estiver listado.

  * O _VariableDeclaratorId_ tiver um ou mais pares de colchetes.

  * O _VariableDeclarator_ não tiver um inicializador.

  * O inicializador do _VariableDeclarator_ for um _ArrayInitializer_.

  * O inicializador do _VariableDeclarator_ contiver uma referência à variável.

**Exemplo 14.4-1. Variáveis Locais Declaradas Com `var`

O código a seguir ilustra essas regras que restringem o uso de `var`:
```java
    
    var a = 1;            // Legal
    var b = 2, c = 3.0;   // Illegal: multiple declarators
    var d[] = new int[4]; // Illegal: extra bracket pairs
    var e;                // Illegal: no initializer
    var f = { 6 };        // Illegal: array initializer
    var g = (g = 7);      // Illegal: self reference in initializer
    
    
```

Essas restrições ajudam a evitar confusão sobre o tipo representado por `var`.

### 14.4.1. Declaradores e Tipos de Variáveis Locais

Cada _declarador_ em uma declaração de variável local declara uma variável local. Se o declarador incluir um _Identifier_, então este é o nome da variável local, caso contrário, a variável local é sem nome ([§6.1](<#/doc/jls/jls-06>)).

Se a palavra-chave opcional `final` aparecer no início da declaração, a variável sendo declarada é uma variável `final` ([§4.12.4](<#/doc/jls/jls-04>)).

O tipo declarado de uma variável local é determinado da seguinte forma:

  * Se o _LocalVariableType_ for _UnannType_ , e nenhum par de colchetes aparecer em _UnannType_ ou _VariableDeclaratorId_ , então o tipo da variável local é denotado por _UnannType_.

  * Se o _LocalVariableType_ for _UnannType_ , e pares de colchetes aparecerem em _UnannType_ ou _VariableDeclaratorId_ , então o tipo da variável local é especificado por [§10.2](<#/doc/jls/jls-10>).

  * Se o _LocalVariableType_ for `var`, então seja T o tipo da expressão inicializadora quando tratada como se não aparecesse em um contexto de atribuição, e fosse, portanto, uma expressão autônoma ([§15.2](<#/doc/jls/jls-15>)). O tipo da variável local é a projeção ascendente de T em relação a todas as variáveis de tipo sintéticas mencionadas por T ([§4.10.5](<#/doc/jls/jls-04>)).

É um erro em tempo de compilação se T for o tipo `null`.

Como o inicializador é tratado como se não aparecesse em um contexto de atribuição, ocorre um erro se for uma expressão `lambda` ([§15.27](<#/doc/jls/jls-15>)) ou uma expressão de referência de método ([§15.13](<#/doc/jls/jls-15>)).

O escopo e o sombreamento de uma declaração de variável local são especificados em [§6.3](<#/doc/jls/jls-06>) e [§6.4](<#/doc/jls/jls-06>).

Referências a uma variável local de uma classe ou interface aninhada, ou uma expressão `lambda`, são restritas, conforme especificado em [§6.5.6.1](<#/doc/jls/jls-06>).

**Exemplo 14.4.1-1. Tipo de Variáveis Locais Declaradas Com `var`

O código a seguir ilustra a tipagem de variáveis declaradas com `var`:
```java
    
    var a = 1;                // a has type 'int'
    var b = java.util.List.of(1, 2);  // b has type 'List<Integer>'
    var c = "x".getClass();   // c has type 'Class<? extends String>'
                              // (see JLS 15.12.2.6)
    var d = new Object() {};  // d has the type of the anonymous class
    var e = (CharSequence & Comparable<String>) "x";
                              // e has type CharSequence & Comparable<String>
    var f = () -> "hello";    // Illegal: lambda not in an assignment context
    var g = null;             // Illegal: null type
    
    
```

Note que algumas variáveis declaradas com `var` não podem ser declaradas com um tipo explícito, porque o tipo da variável não é denotável.

A projeção ascendente é aplicada ao tipo do inicializador ao determinar o tipo da variável. Se o tipo do inicializador contiver variáveis de captura, esta projeção mapeia o tipo do inicializador para um supertipo que não contém variáveis de captura.

Embora fosse possível permitir que o tipo da variável mencionasse variáveis de captura, ao projetá-las para fora, impomos um invariante atraente de que o escopo de uma variável de captura nunca é maior do que a declaração que contém a expressão cujo tipo é capturado. Informalmente, variáveis de captura não podem "vazar" para declarações subsequentes.

### 14.4.2. Instruções de Declaração de Variáveis Locais

Uma _instrução de declaração de variável local_ consiste em uma declaração de variável local.

LocalVariableDeclarationStatement:

[LocalVariableDeclaration](<#/doc/jls/jls-14>) `;`

Toda instrução de declaração de variável local é imediatamente contida por um bloco, enquanto outros tipos de declaração ([§14.5](<#/doc/jls/jls-14>)) podem ser imediatamente contidos por um bloco ou por outra declaração.

No bloco que a contém, as instruções de declaração de variáveis locais podem ser livremente intermisturadas com outros tipos de declarações e com declarações de classes e interfaces locais.

Uma instrução de declaração de variável local é uma declaração executável. Toda vez que é executada, os declaradores são processados em ordem da esquerda para a direita. Se um declarador tiver um inicializador, o inicializador é avaliado e seu valor é atribuído à variável.

Se um declarador não tiver um inicializador, então toda referência à variável deve ser precedida pela execução de uma atribuição à variável, ou um erro em tempo de compilação ocorre pelas regras de [§16 (_Atribuição Definida_)](<#/doc/jls/jls-16>).

Cada inicializador (exceto o primeiro) é avaliado somente se a avaliação do inicializador precedente for concluída normalmente.

A execução da instrução de declaração de variável local é concluída normalmente somente se a avaliação do último inicializador for concluída normalmente.

Se nenhum dos declaradores em uma instrução de declaração de variável local tiver um inicializador, então a execução da declaração sempre é concluída normalmente.
## 14.5. Instruções

Existem muitos tipos de instruções na linguagem de programação Java. A maioria corresponde a instruções nas linguagens C e C++, mas algumas são únicas.

Assim como em C e C++, a instrução `if` da linguagem de programação Java sofre do chamado "problema do `else` pendente", ilustrado por este exemplo formatado de forma enganosa:
```java
    if (door.isOpen())
        if (resident.isVisible())
            resident.greet("Hello!");
    else door.bell.ring();  // Um "else" pendente
    
```

O problema é que tanto a instrução `if` externa quanto a instrução `if` interna poderiam concebivelmente pertencer à cláusula `else`. Neste exemplo, pode-se supor que o programador pretendia que a cláusula `else` pertencesse à instrução `if` externa.

A linguagem de programação Java, assim como C e C++ e muitas linguagens de programação antes delas, decreta arbitrariamente que uma cláusula `else` pertence à instrução `if` mais interna à qual ela possa pertencer. Esta regra é capturada pela seguinte gramática:

Statement:

[StatementWithoutTrailingSubstatement](<#/doc/jls/jls-14>)   
[LabeledStatement](<#/doc/jls/jls-14>)   
[IfThenStatement](<#/doc/jls/jls-14>)   
[IfThenElseStatement](<#/doc/jls/jls-14>)   
[WhileStatement](<#/doc/jls/jls-14>)   
[ForStatement](<#/doc/jls/jls-14>)

StatementNoShortIf:

[StatementWithoutTrailingSubstatement](<#/doc/jls/jls-14>)   
[LabeledStatementNoShortIf](<#/doc/jls/jls-14>)   
[IfThenElseStatementNoShortIf](<#/doc/jls/jls-14>)   
[WhileStatementNoShortIf](<#/doc/jls/jls-14>)   
[ForStatementNoShortIf](<#/doc/jls/jls-14>)

StatementWithoutTrailingSubstatement:

[Block](<#/doc/jls/jls-14>)   
[EmptyStatement](<#/doc/jls/jls-14>)   
[ExpressionStatement](<#/doc/jls/jls-14>)   
[AssertStatement](<#/doc/jls/jls-14>)   
[SwitchStatement](<#/doc/jls/jls-14>)   
[DoStatement](<#/doc/jls/jls-14>)   
[BreakStatement](<#/doc/jls/jls-14>)   
[ContinueStatement](<#/doc/jls/jls-14>)   
[ReturnStatement](<#/doc/jls/jls-14>)   
[SynchronizedStatement](<#/doc/jls/jls-14>)   
[ThrowStatement](<#/doc/jls/jls-14>)   
[TryStatement](<#/doc/jls/jls-14>)   
[YieldStatement](<#/doc/jls/jls-14>)

As seguintes produções de [§14.9](<#/doc/jls/jls-14>) são mostradas aqui para conveniência:

IfThenStatement:

`if` `(` [Expression](<#/doc/jls/jls-15>) `)` [Statement](<#/doc/jls/jls-14>)

IfThenElseStatement:

`if` `(` [Expression](<#/doc/jls/jls-15>) `)` [StatementNoShortIf](<#/doc/jls/jls-14>) `else` [Statement](<#/doc/jls/jls-14>)

IfThenElseStatementNoShortIf:

`if` `(` [Expression](<#/doc/jls/jls-15>) `)` [StatementNoShortIf](<#/doc/jls/jls-14>) `else` [StatementNoShortIf](<#/doc/jls/jls-14>)

As instruções são, portanto, gramaticalmente divididas em duas categorias: aquelas que podem terminar em uma instrução `if` que não possui uma cláusula `else` (uma "instrução `if` curta") e aquelas que definitivamente não.

Apenas instruções que definitivamente não terminam em uma instrução `if` curta podem aparecer como uma subinstrução imediata antes da palavra-chave `else` em uma instrução `if` que possui uma cláusula `else`.

Esta regra simples previne o problema do "`else` pendente". O comportamento de execução de uma instrução com a restrição "sem `if` curto" é idêntico ao comportamento de execução do mesmo tipo de instrução sem a restrição "sem `if` curto"; a distinção é feita puramente para resolver a dificuldade sintática.

## 14.6. A Instrução Vazia

Uma instrução vazia não faz nada.

EmptyStatement:

`;`

A execução de uma instrução vazia sempre completa normalmente.

## 14.7. Instruções Rotuladas

As instruções podem ter prefixos de _rótulo_.

LabeledStatement:

[Identifier](<#/doc/jls/jls-03>) `:` [Statement](<#/doc/jls/jls-14>)

LabeledStatementNoShortIf:

[Identifier](<#/doc/jls/jls-03>) `:` [StatementNoShortIf](<#/doc/jls/jls-14>)

O _Identifier_ é declarado como o rótulo da _Statement_ imediatamente contida.

Ao contrário de C e C++, a linguagem de programação Java não possui instrução `goto`; rótulos de instrução identificadores são usados com as instruções `break` ou `continue` ([§14.15](<#/doc/jls/jls-14>), [§14.16](<#/doc/jls/jls-14>)) aparecendo em qualquer lugar dentro da instrução rotulada.

O escopo de um rótulo de uma instrução rotulada é a _Statement_ imediatamente contida.

É um erro em tempo de compilação se o nome de um rótulo de uma instrução rotulada for usado dentro do escopo do rótulo como um rótulo de outra instrução rotulada.

Não há restrição contra o uso do mesmo identificador como rótulo e como nome de um pacote, classe, interface, método, campo, parâmetro ou variável local. O uso de um identificador para rotular uma instrução não obscurece ([§6.4.2](<#/doc/jls/jls-06>)) um pacote, classe, interface, método, campo, parâmetro ou variável local com o mesmo nome. O uso de um identificador como classe, interface, método, campo, variável local ou como parâmetro de um manipulador de exceção ([§14.20](<#/doc/jls/jls-14>)) não obscurece um rótulo de instrução com o mesmo nome.

Uma instrução rotulada é executada executando a _Statement_ imediatamente contida.

Se a instrução for rotulada por um _Identifier_ e a _Statement_ contida completar abruptamente devido a um `break` com o mesmo _Identifier_, então a instrução rotulada completa normalmente. Em todos os outros casos de conclusão abrupta da _Statement_, a instrução rotulada completa abruptamente pela mesma razão.

**Exemplo 14.7-1. Rótulos e Identificadores**

O código a seguir foi retirado de uma versão da classe `String` e seu método `indexOf`, onde o rótulo era originalmente chamado `test`. Alterar o rótulo para ter o mesmo nome da variável local `i` não obscurece o rótulo no escopo da declaração de `i`. Assim, o código é válido.
```java
    class Test {
        char[] value;
        int offset, count;
        int indexOf(TestString str, int fromIndex) {
            char[] v1 = value, v2 = str.value;
            int max = offset + (count - str.count);
            int start = offset + ((fromIndex < 0) ? 0 : fromIndex);
        i:
            for (int i = start; i <= max; i++) {
                int n = str.count, j = i, k = str.offset;
                while (n-- != 0) {
                    if (v1[j++] != v2[k++])
                        continue i;
                }
                return i - offset;
            }
            return -1;
        }
    }
    
```

O identificador `max` também poderia ter sido usado como rótulo da instrução; o rótulo não obscureceria a variável local `max` dentro da instrução rotulada.

## 14.8. Instruções de Expressão

Certos tipos de expressões podem ser usados como instruções, seguindo-as com ponto e vírgula.

ExpressionStatement:

[StatementExpression](<#/doc/jls/jls-14>) `;`

StatementExpression:

[Assignment](<#/doc/jls/jls-15>)   
[PreIncrementExpression](<#/doc/jls/jls-15>)   
[PreDecrementExpression](<#/doc/jls/jls-15>)   
[PostIncrementExpression](<#/doc/jls/jls-15>)   
[PostDecrementExpression](<#/doc/jls/jls-15>)   
[MethodInvocation](<#/doc/jls/jls-15>)   
[ClassInstanceCreationExpression](<#/doc/jls/jls-15>)

Uma _instrução de expressão_ é executada avaliando a expressão; se a expressão tiver um valor, o valor é descartado.

A execução da instrução de expressão completa normalmente se e somente se a avaliação da expressão completar normalmente.

Ao contrário de C e C++, a linguagem de programação Java permite apenas certas formas de expressões serem usadas como instruções de expressão. Por exemplo, é legal usar uma expressão de invocação de método ([§15.12](<#/doc/jls/jls-15>)):
```java
    System.out.println("Hello world");  // OK
    
```

mas não é legal usar uma expressão entre parênteses ([§15.8.5](<#/doc/jls/jls-15>)):
```java
    (System.out.println("Hello world"));  // ilegal
    
```

Note que a linguagem de programação Java não permite um "cast para `void`" - `void` não é um tipo - então o truque tradicional de C de escrever uma instrução de expressão como:
```java
    (void)... ;  // incorreto!
    
```

não funciona. Por outro lado, a linguagem de programação Java permite todos os tipos mais úteis de expressões em instruções de expressão, e não exige que uma invocação de método usada como instrução de expressão invoque um método `void`, então tal truque quase nunca é necessário. Se um truque for necessário, uma instrução de atribuição ([§15.26](<#/doc/jls/jls-15>)) ou uma instrução de declaração de variável local ([§14.4](<#/doc/jls/jls-14>)) pode ser usada em vez disso.

## 14.9. A Instrução `if`

A instrução `if` permite a execução condicional de uma instrução ou uma escolha condicional de duas instruções, executando uma ou outra, mas não ambas.

IfThenStatement:

`if` `(` [Expression](<#/doc/jls/jls-15>) `)` [Statement](<#/doc/jls/jls-14>)

IfThenElseStatement:

`if` `(` [Expression](<#/doc/jls/jls-15>) `)` [StatementNoShortIf](<#/doc/jls/jls-14>) `else` [Statement](<#/doc/jls/jls-14>)

IfThenElseStatementNoShortIf:

`if` `(` [Expression](<#/doc/jls/jls-15>) `)` [StatementNoShortIf](<#/doc/jls/jls-14>) `else` [StatementNoShortIf](<#/doc/jls/jls-14>)

A _Expression_ deve ter o tipo `boolean` ou `Boolean`, ou ocorre um erro em tempo de compilação.

### 14.9.1. A Instrução `if`-`then`

Uma instrução `if`-`then` é executada primeiro avaliando a _Expression_. Se o resultado for do tipo `Boolean`, ele é submetido à conversão de unboxing ([§5.1.8](<#/doc/jls/jls-05>)).

Se a avaliação da _Expression_ ou a conversão de unboxing subsequente (se houver) completar abruptamente por alguma razão, a instrução `if`-`then` completa abruptamente pela mesma razão.

Caso contrário, a execução continua fazendo uma escolha com base no valor resultante:

  * Se o valor for `true`, então a _Statement_ contida é executada; a instrução `if`-`then` completa normalmente se e somente se a execução da _Statement_ completar normalmente.

  * Se o valor for `false`, nenhuma ação adicional é tomada e a instrução `if`-`then` completa normalmente.

### 14.9.2. A Instrução `if`-`then`-`else`

Uma instrução `if`-`then`-`else` é executada primeiro avaliando a _Expression_. Se o resultado for do tipo `Boolean`, ele é submetido à conversão de unboxing ([§5.1.8](<#/doc/jls/jls-05>)).

Se a avaliação da _Expression_ ou a conversão de unboxing subsequente (se houver) completar abruptamente por alguma razão, então a instrução `if`-`then`-`else` completa abruptamente pela mesma razão.

Caso contrário, a execução continua fazendo uma escolha com base no valor resultante:

  * Se o valor for `true`, então a primeira _Statement_ contida (aquela antes da palavra-chave `else`) é executada; a instrução `if`-`then`-`else` completa normalmente se e somente se a execução dessa instrução completar normalmente.

  * Se o valor for `false`, então a segunda _Statement_ contida (aquela depois da palavra-chave `else`) é executada; a instrução `if`-`then`-`else` completa normalmente se e somente se a execução dessa instrução completar normalmente.

## 14.10. A Instrução `assert`

Uma _asserção_ é uma instrução `assert` contendo uma expressão booleana. Uma asserção é _habilitada_ ou _desabilitada_. Se uma asserção é habilitada, a execução da asserção causa a avaliação da expressão booleana e um erro é reportado se a expressão avalia para `false`. Se a asserção é desabilitada, a execução da asserção não tem efeito algum.

AssertStatement:

`assert` [Expression](<#/doc/jls/jls-15>) `;`   
`assert` [Expression](<#/doc/jls/jls-15>) `:` [Expression](<#/doc/jls/jls-15>) `;`

Para facilitar a apresentação, a primeira _Expression_ em ambas as formas da instrução `assert` é referida como _Expression1_. Na segunda forma da instrução `assert`, a segunda _Expression_ é referida como _Expression2_.

É um erro em tempo de compilação se _Expression1_ não tiver o tipo `boolean` ou `Boolean`.

É um erro em tempo de compilação se, na segunda forma da instrução `assert`, _Expression2_ for `void` ([§15.1](<#/doc/jls/jls-15>)).

Uma instrução `assert` que é executada _depois_ que sua classe ou interface completou a inicialização é habilitada se e somente se o sistema hospedeiro determinou que a classe ou interface de nível superior que contém lexicalmente a instrução `assert` habilita asserções.

Se uma classe ou interface de nível superior habilita asserções é determinado o mais tardar no primeiro de (i) a inicialização da classe ou interface de nível superior, e (ii) a inicialização de qualquer classe ou interface aninhada na classe ou interface de nível superior. Se uma classe ou interface de nível superior habilita asserções não pode ser alterado depois de ter sido determinado.

Uma instrução `assert` que é executada _antes_ que sua classe ou interface tenha completado a inicialização é habilitada.

Esta regra é motivada por um caso que exige tratamento especial. Lembre-se de que o status de asserção de uma classe é definido o mais tardar no momento em que é inicializada. É possível, embora geralmente não desejável, executar métodos ou construtores antes da inicialização. Isso pode acontecer quando uma hierarquia de classes contém uma circularidade em sua inicialização estática, como no exemplo a seguir:
```java
    public class Foo {
        public static void main(String[] args) {
            Baz.testAsserts();
            // Será executado depois que Baz for inicializada.
        }
    }
    class Bar {
        static {
            Baz.testAsserts();
            // Será executado antes que Baz seja inicializada!
        }
    }
    class Baz extends Bar {
        static void testAsserts() {
            boolean enabled = false;
            assert  enabled = true;
            System.out.println("Asserts " +
                               (enabled ? "enabled" : "disabled"));
        }
    }
    
```

Invocar `Baz.testAsserts()` faz com que `Baz` seja inicializada. Antes que isso possa acontecer, `Bar` deve ser inicializada. O inicializador estático de `Bar` invoca novamente `Baz.testAsserts()`. Como a inicialização de `Baz` já está em andamento pela thread atual, a segunda invocação é executada imediatamente, embora `Baz` não esteja inicializada ([§12.4.2](<#/doc/jls/jls-12>)).

Devido à regra acima, se o programa acima for executado sem habilitar asserções, ele deve imprimir:
```
    Asserts enabled
    Asserts disabled
    
```

Uma instrução `assert` desabilitada não faz nada. Em particular, nem _Expression1_ nem _Expression2_ (se presente) são avaliadas. A execução de uma instrução `assert` desabilitada sempre completa normalmente.

Uma instrução `assert` habilitada é executada primeiro avaliando _Expression1_. Se o resultado for do tipo `Boolean`, ele é submetido à conversão de unboxing ([§5.1.8](<#/doc/jls/jls-05>)).

Se a avaliação de _Expression1_ ou a conversão de unboxing subsequente (se houver) completar abruptamente por alguma razão, a instrução `assert` completa abruptamente pela mesma razão.

Caso contrário, a execução continua fazendo uma escolha com base no valor de _Expression1_:

  * Se o valor for `true`, nenhuma ação adicional é tomada e a instrução `assert` completa normalmente.

  * Se o valor for `false`, o comportamento de execução depende se _Expression2_ está presente:

    * Se _Expression2_ estiver presente, ela é avaliada. Então:

      * Se a avaliação completar abruptamente por alguma razão, a instrução `assert` completa abruptamente pela mesma razão.

      * Se a avaliação completar normalmente, uma instância de `AssertionError` cuja "mensagem de detalhe" é o valor resultante de _Expression2_ é criada. Então:

        * Se a criação da instância completar abruptamente por alguma razão, a instrução `assert` completa abruptamente pela mesma razão.

        * Se a criação da instância completar normalmente, a instrução `assert` completa abruptamente lançando o objeto `AssertionError` recém-criado.

    * Se _Expression2_ não estiver presente, uma instância de `AssertionError` sem "mensagem de detalhe" é criada. Então:

      * Se a criação da instância completar abruptamente por alguma razão, a instrução `assert` completa abruptamente pela mesma razão.

      * Se a criação da instância completar normalmente, a instrução `assert` completa abruptamente lançando o objeto `AssertionError` recém-criado.

Tipicamente, a verificação de asserções é habilitada durante o desenvolvimento e teste do programa, e desabilitada para implantação, a fim de melhorar o desempenho.

Como as asserções podem ser desabilitadas, os programas não devem assumir que as expressões contidas nas asserções serão avaliadas. Assim, essas expressões booleanas devem geralmente ser livres de efeitos colaterais. Avaliar tal expressão booleana não deve afetar nenhum estado que seja visível após a conclusão da avaliação. Não é ilegal que uma expressão booleana contida em uma asserção tenha um efeito colateral, mas é geralmente inadequado, pois isso poderia fazer com que o comportamento do programa variasse dependendo se as asserções foram habilitadas ou desabilitadas.

Diante disso, as asserções não devem ser usadas para verificação de argumentos em métodos `public`. A verificação de argumentos é tipicamente parte do contrato de um método, e este contrato deve ser mantido independentemente de as asserções estarem habilitadas ou desabilitadas.

Um problema secundário com o uso de asserções para verificação de argumentos é que argumentos errôneos devem resultar em uma exceção de tempo de execução apropriada (como `IllegalArgumentException`, `ArrayIndexOutOfBoundsException` ou `NullPointerException`). Uma falha de asserção não lançará uma exceção apropriada. Novamente, não é ilegal usar asserções para verificação de argumentos em métodos `public`, mas é geralmente inadequado. Pretende-se que `AssertionError` nunca seja capturada, mas é possível fazê-lo, portanto, as regras para instruções `try` devem tratar as asserções que aparecem em um bloco `try` de forma semelhante ao tratamento atual das instruções `throw`.
## 14.11. A Instrução `switch`

A instrução `switch` transfere o controle para uma de várias instruções ou expressões, dependendo do valor de uma expressão.

SwitchStatement:

`switch` `(` [Expression](<#/doc/jls/jls-15>) `)` [SwitchBlock](<#/doc/jls/jls-14>)

A _Expression_ é chamada de _expressão seletora_. O tipo da expressão seletora deve ser `char`, `byte`, `short`, `int`, ou um tipo de referência, caso contrário, ocorre um erro em tempo de compilação.

### 14.11.1. Blocos `switch`

O corpo tanto de uma instrução `switch` quanto de uma expressão `switch` ([§15.28](<#/doc/jls/jls-15>)) é chamado de _bloco `switch`_. Esta subseção apresenta regras gerais que se aplicam a todos os blocos `switch`, quer apareçam em instruções `switch` ou em expressões `switch`. Outras subseções apresentam regras adicionais que se aplicam a blocos `switch` em instruções `switch` ([§14.11.2](<#/doc/jls/jls-14>)) ou a blocos `switch` em expressões `switch` ([§15.28.1](<#/doc/jls/jls-15>)).

SwitchBlock:

`{` [SwitchRule](<#/doc/jls/jls-14>) {[SwitchRule](<#/doc/jls/jls-14>)} `}`   
`{` {[SwitchBlockStatementGroup](<#/doc/jls/jls-14>)} {[SwitchLabel](<#/doc/jls/jls-14>) `:`} `}`

SwitchRule:

[SwitchLabel](<#/doc/jls/jls-14>) `->` [Expression](<#/doc/jls/jls-15>) `;`   
[SwitchLabel](<#/doc/jls/jls-14>) `->` [Block](<#/doc/jls/jls-14>)   
[SwitchLabel](<#/doc/jls/jls-14>) `->` [ThrowStatement](<#/doc/jls/jls-14>)

SwitchBlockStatementGroup:

[SwitchLabel](<#/doc/jls/jls-14>) `:` {[SwitchLabel](<#/doc/jls/jls-14>) `:`} [BlockStatements](<#/doc/jls/jls-14>)

SwitchLabel:

`case` [CaseConstant](<#/doc/jls/jls-14>) {`,` [CaseConstant](<#/doc/jls/jls-14>)}   
`case` `null` [`,` `default`]   
`case` [CasePattern](<#/doc/jls/jls-14>) {`,` [CasePattern](<#/doc/jls/jls-14>)} [[Guard](<#/doc/jls/jls-14>)]   
`default`

CaseConstant:

[ConditionalExpression](<#/doc/jls/jls-15>)

CasePattern:

[Pattern](<#/doc/jls/jls-14>)

Guard:

`when` [Expression](<#/doc/jls/jls-15>)

Um bloco `switch` pode consistir em:

  * _Regras `switch`_ , que usam `->` para introduzir uma _expressão de regra `switch`_ , um _bloco de regra `switch`_ , ou uma _instrução `throw` de regra `switch`_; ou

  * _Grupos de instruções rotuladas `switch`_ , que usam `:` para introduzir _instruções de bloco rotuladas `switch`_.

Toda regra `switch` e grupo de instruções rotuladas `switch` começa com um _rótulo `switch`_, que é um rótulo `case` ou um rótulo `default`. Múltiplos rótulos `switch` são permitidos para um grupo de instruções rotuladas `switch`.

Um rótulo `case` possui uma lista (não vazia) de constantes `case`, um literal `null`, ou uma lista (não vazia) de padrões `case`.

Toda constante `case` deve ser uma expressão constante ([§15.29](<#/doc/jls/jls-15>)), ou o nome de uma constante `enum` ([§8.9.1](<#/doc/jls/jls-08>)), caso contrário, ocorre um erro em tempo de compilação.

Um rótulo `case` com um literal `null` pode ter um `default` opcional.

Um rótulo `case` com padrões `case` pode ter uma expressão `when` opcional, conhecida como _guard_ (guarda), que representa um teste adicional sobre os valores que correspondem aos padrões. Um rótulo `case` é considerado _unguarded_ (não guardado) se (i) não possui guarda, ou (ii) possui uma guarda que é uma expressão constante ([§15.29](<#/doc/jls/jls-15>)) com valor `true`; e _guarded_ (guardado) caso contrário.

É um erro em tempo de compilação para um rótulo `case` ter mais de um padrão `case` e declarar quaisquer variáveis de padrão (além daquelas declaradas por uma guarda associada ao rótulo `case`).

Se um rótulo `case` com mais de um padrão `case` pudesse declarar variáveis de padrão, não ficaria claro quais variáveis seriam inicializadas se o rótulo `case` fosse aplicado. Por exemplo:
```

    Object obj = ...;
    switch (obj) {
      case Integer i, Boolean b -> {
        ...       // Error! Is i or b initialized?
      }
      ...
    }

```

Mesmo que apenas um dos padrões `case` declare uma variável de padrão, ainda não ficaria claro se a variável foi inicializada ou não; por exemplo:
```

    Object obj = ...;
    switch (obj) {
      case Integer i, Boolean _ -> {
        ...       // Error! Is i initialized?
      }
      ...
    }

```

O seguinte não resulta em um erro em tempo de compilação:
```

    Object obj = ...;
    switch (obj) {
      case Integer _, Boolean _ -> {
        ...       // Matches both an Integer and a Boolean
      }
      ...
    }

```

Os rótulos `switch` e suas constantes `case`, literais `null` e padrões `case` são considerados _associados_ ao bloco `switch`.

Para um dado bloco `switch`, ambas as seguintes condições devem ser verdadeiras, caso contrário, ocorre um erro em tempo de compilação:

  * Nenhuma das duas constantes `case` associadas a um bloco `switch` pode ter o mesmo valor.

  * Não mais de um literal `null` pode ser associado a um bloco `switch`.

  * Não mais de um rótulo `default` pode ser associado a um bloco `switch`.

Uma guarda associada a um rótulo `case` deve satisfazer todas as seguintes condições, caso contrário, ocorre um erro em tempo de compilação:

  * Uma guarda deve ter o tipo `boolean` ou `Boolean`.

  * Qualquer variável local, parâmetro formal ou parâmetro de exceção usado, mas não declarado em uma guarda, deve ser `final` ou efetivamente final ([§4.12.4](<#/doc/jls/jls-04>)).

  * Qualquer variável `final` em branco usada, mas não declarada em uma guarda, deve ser definitivamente atribuída ([§16 (_Definite Assignment_)](<#/doc/jls/jls-16>)) antes da guarda.

  * Uma guarda não pode ser uma expressão constante ([§15.29](<#/doc/jls/jls-15>)) com o valor `false`.

O bloco `switch` de uma instrução `switch` ou de uma expressão `switch` é _compatível com `switch`_ com o tipo da expressão seletora, T, se todas as seguintes condições forem verdadeiras:

  * Se um literal `null` estiver associado ao bloco `switch`, então T é um tipo de referência, ou o tipo `null` ([§4.1](<#/doc/jls/jls-04>)).

  * Para cada constante `case` associada ao bloco `switch` que nomeia uma constante `enum`, o tipo da constante `case` é compatível com T para atribuição ([§5.2](<#/doc/jls/jls-05>)).

  * Para cada constante `case` associada ao bloco `switch` que é uma expressão constante, a constante é compatível com T para atribuição, e T é um dos tipos `char`, `byte`, `short`, `int`, `Character`, `Byte`, `Short`, `Integer`, ou `String`.

  * Todo padrão `p` associado ao bloco `switch` é aplicável ao tipo T ([§14.30.3](<#/doc/jls/jls-14>)).

Blocos `switch` não são projetados para funcionar com os tipos `boolean`, `long`, `float` e `double`. A expressão seletora de uma instrução `switch` ou expressão `switch` não pode ter um desses tipos.

O bloco `switch` de uma instrução `switch` ou de uma expressão `switch` deve ser compatível com `switch` com o tipo da expressão seletora, caso contrário, ocorre um erro em tempo de compilação.

Um rótulo `switch` em um bloco `switch` é considerado _dominado_ se, para cada valor ao qual ele se aplica, pode-se determinar que um dos rótulos `switch` precedentes também se aplicaria. É um erro em tempo de compilação se qualquer rótulo `switch` em um bloco `switch` for dominado. As regras para determinar se um rótulo `switch` é dominado são as seguintes:

  * Um rótulo `case` com um padrão `case` `q` é dominado se houver um rótulo `case` não guardado precedente no bloco `switch` com um padrão `case` `p`, e `p` domina `q` ([§14.30.3](<#/doc/jls/jls-14>)).

A definição de um padrão dominando outro padrão é baseada em tipos. Por exemplo, o padrão de tipo `Object` `o` domina o padrão de tipo `String` `s`, e, portanto, o seguinte resulta em um erro em tempo de compilação:
`Object obj = ...
        switch (obj) {
            case Object o ->
                System.out.println("An object");
            case String s ->                 // Error!
                System.out.println("A string");
        }
            
```

Um rótulo `case` guardado com um padrão `case` é dominado por um rótulo `case` com o mesmo padrão, mas sem a guarda. Por exemplo, o seguinte resulta em um erro em tempo de compilação:
`String str = ...;
        switch (str) {
            case String s ->
                System.out.println("A string");
            case String s when s.length() == 2 ->  // Error!
                System.out.println("Two character string");
            ...
        }
            
```

Por outro lado, um rótulo `case` guardado com um padrão `case` não é considerado para dominar um rótulo `case` não guardado com o mesmo padrão `case`. Isso permite o seguinte estilo comum de programação de padrões:
`Integer j = ...;
        switch (j) {
            case Integer i when i <= 0 ->
                System.out.println("Less than or equal to zero");
            case Integer i ->
                System.out.println("An integer");
        }
            
```

A única exceção é quando a guarda é uma expressão constante que tem o valor `true`, por exemplo:
`Integer j = ...;
        switch (j) {
            case Integer i when true ->            // Ok
                System.out.println("An integer");
            case Integer i ->                      // Error!
                System.out.println("An integer");
        }
            
```

Um rótulo `case` com mais de um padrão `case` é dominado se qualquer um desses padrões for dominado por um padrão que aparece como um padrão `case` em um rótulo `case` não guardado precedente, e, portanto, o seguinte resulta em um erro em tempo de compilação (já que o padrão de tipo `Integer` `_` é dominado pelo padrão de tipo `Number` `_`):
`Object obj = ...
            switch (obj) {
              case Number _ ->
                System.out.println("A Number");
              case Integer _, String _ ->       // Error - dominated!
                System.out.println("An Integer or a String");
              ...
            }
            
```

  * Um rótulo `case` com uma constante `case` `c` é dominado se uma das seguintes condições for verdadeira:

    * `c` é uma expressão constante de um tipo primitivo S, e há um rótulo `case` precedente no bloco `switch` com um padrão `case` não guardado `p`, onde `p` é incondicional para a classe wrapper de S.

    * `c` é uma expressão constante de um tipo de referência T, e há um rótulo `case` precedente no bloco `switch` com um padrão `case` não guardado `p`, onde `p` é incondicional para o tipo T.

    * `c` nomeia uma constante `enum` da classe `enum` E, e há um rótulo `case` precedente no bloco `switch` com um padrão `case` não guardado `p`, onde `p` é incondicional para o tipo E.

Por exemplo, um rótulo `case` com um padrão de tipo `Integer` domina um rótulo `case` com um literal inteiro:
`Integer j = ...;
    switch (j) {
        case Integer i ->
            System.out.println("An integer");
        case 42 ->                              // Error - dominated!
            System.out.println("42!");
    }
        
```

  * Um rótulo `default` ou um rótulo `case` `null`,` `default` é dominado se houver um rótulo `case` não guardado precedente no bloco `switch` com um padrão `case` `p` onde `p` é incondicional para o tipo da expressão seletora ([§14.30.3](<#/doc/jls/jls-14>)).

Um rótulo `case` com um padrão `case` que é incondicional para o tipo da expressão seletora irá, como o nome sugere, corresponder a todo valor e, portanto, se comportar como um rótulo `default`. Um bloco `switch` não pode ter mais de um rótulo `switch` que atue como um `default`.

É um erro em tempo de compilação se houver um rótulo `case` com _n_ (_n_ >1) padrões `case` `p1`, ..., `pn` em um bloco `switch` onde um dos padrões `pi` (1≤ _i_ <_n_) domina outro dos padrões `pj` (_i_ <_j_ ≤ _n_).

É um erro em tempo de compilação se qualquer uma das seguintes condições for verdadeira:

  * Há um rótulo `default` no bloco `switch` que precede um rótulo `case` com padrões `case`.

  * Há um rótulo `default` no bloco `switch` que precede um rótulo `case` com um literal `null`.

  * Há um rótulo `case` `null`,` `default` no bloco `switch` seguido por qualquer outro rótulo `switch`.

Se usado, um rótulo `default` deve vir por último em um bloco `switch`.

Por razões de compatibilidade, um rótulo `default` pode aparecer antes de rótulos `case` que não possuem um literal `null` ou padrões `case`.
```

    int i = ...;
    switch(i) {
        default ->
            System.out.println("Some other integer");
        case 42 -> // allowed
            System.out.println("42");
    }
    
```

Se usado, um rótulo `case` `null`,` `default` deve vir por último em um bloco `switch`.

É um erro em tempo de compilação se, em um bloco `switch` que consiste em grupos de instruções rotuladas `switch`, uma instrução for rotulada com um rótulo `case` que declara uma ou mais variáveis de padrão ([§6.3.3](<#/doc/jls/jls-06>)), e qualquer uma das seguintes condições for verdadeira:

  * Uma instrução imediatamente precedente no bloco `switch` pode ser concluída normalmente ([§14.22](<#/doc/jls/jls-14>)), ou

  * A instrução é rotulada com mais de um rótulo `switch`.

A primeira condição impede que um grupo de instruções "caia" em outro grupo de instruções sem inicializar variáveis de padrão. Por exemplo, se a instrução rotulada por `case` `Integer` `i` fosse alcançável a partir do grupo de instruções precedente, a variável de padrão `i` não teria sido inicializada:
```

    Object o = "Hello";
    switch (o) {
        case String s:
            System.out.println("String: " + s );  // No break!
        case Integer i:
            System.out.println(i + 1);            // Error! Can be reached
                                                  // without matching the
                                                  // pattern `Integer i`
        default:
    }
    
```

Blocos `switch` que consistem em grupos de instruções rotuladas `switch` permitem que múltiplos rótulos se apliquem a um grupo de instruções. A segunda condição impede que um grupo de instruções seja executado com base em um rótulo sem inicializar as variáveis de padrão de outro rótulo. Por exemplo:
```

    Object o = "Hello World";
    switch (o) {
        case String s:
        case Integer i:
            System.out.println(i + 1);  // Error! Can be reached
                                        // without matching the
                                        // pattern `Integer i`
        default:
    }
    Object obj = null;
    switch (obj) {
        case null:
        case String s:
            System.out.println(s);      // Error! Can be reached
                                        // without matching the
                                        // pattern `String s`
        default:
    }
    
```

Ambas as condições se aplicam apenas quando o padrão `case` declara variáveis de padrão. Os exemplos a seguir, em contraste, não são problemáticos:
```

    record R() {}
    record S() {}
    Object o = "Hello World";
    switch (o) {
        case String s:
            System.out.println(s);      // No break
        case R():                       // No pattern variables declared
            System.out.println("It's either an R or a string");
            break;
        default:
    }
    Object ob = new R();
    switch (ob) {
        case R():
        case S():                       // Multiple case labels
            System.out.println("Either R or an S");
            break;
        default:
    }
    Object obj = null;
    switch (obj) {
        case null:
        case R():                       // Multiple case labels
            System.out.println("Either null or an R");
            break;
        default:
    }
    
```

#### 14.11.1.1. Blocos `switch` Exaustivos

O bloco `switch` de uma expressão `switch` ou instrução `switch` é _exaustivo_ para uma expressão seletora `e` se um dos seguintes casos se aplica:

  * Há um rótulo `default` associado ao bloco `switch`.

  * Há um rótulo `case` `null`,` `default` associado ao bloco `switch`.

  * O conjunto contendo todas as constantes `case` e padrões `case` que aparecem em um rótulo `case` não guardado (coletivamente conhecidos como _elementos `case`_) associado ao bloco `switch` não é vazio e cobre o tipo da expressão seletora `e`.

Um conjunto de elementos `case`, P, _cobre_ um tipo T se um dos seguintes casos se aplica:

  * P cobre um tipo U onde T e U têm a mesma apagamento (erasure).

  * P contém um padrão que é incondicional para T.

  * T é uma variável de tipo com limite superior B e P cobre B.

  * T é um tipo de interseção T1`&` ... `&`Tn e P cobre Ti, para um dos tipos Ti (1≤ _i_ ≤ _n_).

  * O tipo T é um tipo de classe `enum` E e P contém todos os nomes das constantes `enum` de E.

Um rótulo `default` é permitido, mas não obrigatório, no caso em que os nomes de todas as constantes `enum` aparecem como constantes `case`. Por exemplo:
`enum E { F, G, H }
        static int testEnumExhaustive(E e) {
          return switch(e) {
              case F -> 0;
              case G -> 1;
              case H -> 2;    // No default required!
          };
        }
        
            
```

  * O tipo T nomeia uma classe `abstract` `sealed` ou interface `sealed` C e para cada subclasse direta ou subinterface D permitida de C, uma das duas condições a seguir é verdadeira:

    1. Não há tipo que nomeie D e seja um subtipo de T, ou

    2. Há um tipo U que nomeia D e é um subtipo de T, e P cobre U.

Um rótulo `default` é permitido, mas não obrigatório, no caso em que o bloco `switch` exaure todas as subclasses e subinterfaces diretas permitidas de uma classe `abstract` `sealed` ou interface `sealed`. Por exemplo:
`sealed interface I permits A, B, C {}
    final class A   implements I {}
    final class B   implements I {}
    record C(int j) implements I {}  // Implicitly final
    
    static int testExhaustive1(I i) {
        return switch(i) {
            case A a -> 0;
            case B b -> 1;
            case C c -> 2;           // No default required!
        };
    }
        
```

Como o bloco `switch` contém padrões `case` que correspondem a todos os valores dos tipos `A`, `B` e `C`, e nenhuma outra instância do tipo `I` é permitida, este bloco `switch` é exaustivo.

O fato de que uma subclasse ou subinterface direta permitida pode estender apenas uma parametrização particular de uma superclasse ou superinterface `sealed` genérica significa que nem sempre precisa ser considerada ao determinar se um bloco `switch` é exaustivo. Por exemplo:
`sealed interface J&lt;X&gt; permits D, E {}
    final class D<Y> implements J<String> {}
    final class E<X> implements J<X> {}
    
    static int testExhaustive2(J<Integer> ji) {
        return switch(ji) {          // Exhaustive!
            case E<Integer> e -> 42;
        };
    }
        
```

Como a expressão seletora tem o tipo `J`<`Integer`>, a subclasse direta permitida `D` não precisa ser considerada, pois não há possibilidade de que o valor de `ji` seja uma instância de `D`.

  * O tipo T nomeia uma classe `record` R, e P contém um padrão `record` `p` com um tipo que nomeia R e para cada componente `record` de R do tipo U, se houver, o conjunto singleton contendo o padrão de componente correspondente de `p` cobre U.

Um padrão `record` cujos padrões de componente cobrem todos o tipo do componente `record` correspondente é considerado para cobrir o tipo `record`. Por exemplo:
`record Test<X>(Object o, X x){}
            static int testExhaustiveRecordPattern(Test<String> r) {
            return switch(r) {                           // Exhaustive!
                case Test<String>(Object o, String s) -> 0;
            };
        }
            
```

  * P reescreve para um conjunto Q e Q cobre T.

Um conjunto de elementos `case`, P, _reescreve_ para o conjunto Q, se um subconjunto de P se reduz a um padrão `p`, e Q consiste nos elementos restantes de P juntamente com o padrão `p`.

Um conjunto não vazio de padrões, RP, _reduz_ a um único padrão rp se uma das seguintes condições for verdadeira:

    * RP cobre algum tipo U, e rp é um padrão de tipo U.

    * RP consiste em padrões `record` cujos tipos todos se apagam para a mesma classe `record` R com _k_ (_k_ ≥1) componentes e há um componente distinguido `cr` (1≤ _r_ ≤ _k_) de R tal que para cada outro componente `ci` (1≤ _i_ ≤ _k_ , _i_ ≠ _r_) o conjunto contendo os padrões de componente dos padrões `record` correspondentes ao componente `ci` é equivalente a um único padrão `qi`, o conjunto contendo os padrões de componente dos padrões `record` correspondentes ao componente `cr` se reduz a um único padrão `q`, e rp é o padrão `record` do tipo R com uma lista de padrões consistindo nos padrões `q1`, ..., `qr-1`, `q`, `qr+1`, ..., `qk`.

Um conjunto não vazio de padrões EP é _equivalente_ a um único padrão ep se uma das seguintes condições for verdadeira:

      * EP consiste em padrões de tipo cujos tipos todos têm o mesmo apagamento T, e ep é um padrão de tipo T.

      * EP consiste em padrões `record` cujos tipos todos se apagam para a mesma classe `record` R com _k_ (_k_ ≥1) componentes e para cada componente `record` o conjunto contendo os padrões de componente correspondentes dos padrões `record` é equivalente a um único padrão `qj` (1≤ _j_ ≤ _k_), e ep é o padrão `record` do tipo R com uma lista de padrões de componente consistindo nos padrões de componente `q1`,...`qk`.

Normalmente, os padrões `record` correspondem apenas a um subconjunto dos valores do tipo `record`. No entanto, vários padrões `record` em um bloco `switch` podem se combinar para realmente corresponder a todos os valores do tipo `record`. Por exemplo:
```

    sealed interface I permits A, B, C {}
    final class A   implements I {}
    final class B   implements I {}
    record C(int j) implements I {}  // Implicitly final
    record Box(I i) {}
    
    int testExhaustiveRecordPatterns(Box b) {
        return switch (b) {     // Exhaustive!
            case Box(A a) -> 0;
            case Box(B b) -> 1;
            case Box(C c) -> 2;
        };
    }
    
```

Determinar se este bloco `switch` é exaustivo requer a análise da combinação dos padrões `record`. O conjunto contendo o padrão `record` `Box(I i)` cobre o tipo `Box`, e, portanto, o conjunto contendo os padrões `Box(A a)`, `Box(B b)` e `Box(C c)` pode ser reescrito para o conjunto contendo o padrão `Box(I i)`. Isso ocorre porque o conjunto contendo os padrões `A a`, `B b`, `C c` se reduz ao padrão `I i` (porque o mesmo conjunto cobre o tipo `I`), e, assim, o conjunto contendo os padrões `Box(A a)`, `Box(B b)`, `Box(C c)` se reduz ao padrão `Box(I i)`.

No entanto, reescrever um conjunto de padrões `record` nem sempre é tão simples. Por exemplo:
```

    record IPair(I i, I j){}
    
    int testNonExhaustiveRecordPatterns(IPair p) {
        return switch (p) {     // Not Exhaustive!
            case IPair(A a, A a) -> 0;
            case IPair(B b, B b) -> 1;
            case IPair(C c, C c) -> 2;
        };
    }
    
```

É tentador aplicar a lógica do exemplo anterior para reescrever o conjunto contendo os padrões `IPair(A a, A a)`, `IPair(B b, B b)`, `IPair(C c, C c)` para o conjunto contendo o padrão `IPair(I i, I j)`, e, assim, concluir que o bloco `switch` exaure o tipo `IPair`. Mas isso está incorreto, pois, por exemplo, o bloco `switch` na verdade não possui um rótulo que corresponda a um valor `IPair` cujo primeiro componente é um valor `A` e o segundo componente é um valor `B`. É válido combinar padrões `record` em um componente apenas se eles corresponderem aos mesmos valores nos outros componentes. Por exemplo, o conjunto contendo os três padrões `record` `IPair(A a, I i)`, `IPair(B b, I i)` e `IPair(C c, I i)` pode ser reduzido ao padrão `IPair(I j, I i)`.

Uma instrução `switch` ou expressão é _exaustiva_ se seu bloco `switch` for exaustivo para a expressão seletora.

#### 14.11.1.2. Determinando Qual Rótulo `switch` se Aplica em Tempo de Execução

Tanto a execução de uma instrução `switch` ([§14.11.3](<#/doc/jls/jls-14>)) quanto a avaliação de uma expressão `switch` ([§15.28.2](<#/doc/jls/jls-15>)) precisam determinar se um rótulo `switch` associado ao bloco `switch` _se aplica_ ao valor da expressão seletora. Isso ocorre da seguinte forma:

  1. Se o valor for a referência `null`, então um rótulo `case` com um literal `null` se aplica.

  2. Se o valor não for a referência `null`, então determinamos o primeiro (se houver) rótulo `case` no bloco `switch` que se aplica ao valor da seguinte forma:

     * Um rótulo `case` com uma constante `case` `c` se aplica a um valor do tipo `Character`, `Byte`, `Short` ou `Integer`, se o valor for primeiro submetido à conversão de unboxing ([§5.1.8](<#/doc/jls/jls-05>)) e a constante `c` for igual ao valor unboxed.

Qualquer conversão de unboxing será concluída normalmente, pois o valor sendo unboxed é garantido não ser a referência `null`.

A igualdade é definida em termos do operador `==` ([§15.21](<#/doc/jls/jls-15>)).

     * Um rótulo `case` com uma constante `case` `c` se aplica a um valor que é do tipo `char`, `byte`, `short`, `int`, ou `String` ou um tipo `enum` se a constante `c` for igual ao valor.

A igualdade é definida em termos do operador `==`, a menos que o valor seja uma `String`, caso em que a igualdade é definida em termos do método `equals` da classe `String`.

     * Determinar que um rótulo `case` com padrões `case` `p1`, ..., `pn` (_n_ ≥1) _se aplica_ a um valor prossegue encontrando o primeiro (se houver) padrão `case` `pi` (1≤ _i_ ≤ _n_) que se aplica ao valor.

Determinar que um padrão `case` se aplica a um valor prossegue primeiro verificando se o valor corresponde ao padrão ([§14.30.2](<#/doc/jls/jls-14>)). Então:

       * Se a correspondência de padrão for concluída abruptamente, então todo o processo de determinação de qual rótulo `switch` se aplica é concluído abruptamente pela mesma razão.

       * Se a correspondência de padrão for bem-sucedida e o rótulo `case` não for guardado, então este padrão `case` se aplica.

       * Se a correspondência de padrão for bem-sucedida e o rótulo `case` for guardado, então a guarda é avaliada. Se o resultado for do tipo `Boolean`, ele é submetido à conversão de unboxing ([§5.1.8](<#/doc/jls/jls-05>)).

Se a avaliação da guarda ou a subsequente conversão de unboxing (se houver) for concluída abruptamente por algum motivo, então todo o processo de determinação de qual rótulo `switch` se aplica é concluído abruptamente pela mesma razão.

Caso contrário, se o valor resultante for `true`, então o padrão `case` se aplica.

     * Um rótulo `case` `null`,` `default` se aplica a todo valor.

  3. Se o valor não for a referência `null`, e nenhum rótulo `case` se aplicar de acordo com as regras do passo 2, mas houver um rótulo `default` associado ao bloco `switch`, então o rótulo `default` se aplica.

Um único rótulo `case` pode conter várias constantes `case`. O rótulo se aplica ao valor da expressão seletora se qualquer uma de suas constantes for igual ao valor da expressão seletora. Por exemplo, no código a seguir, o rótulo `case` se aplica se a variável `enum` `day` for uma das constantes `enum` mostradas:
```

    switch (day) {
        ...
        case SATURDAY, SUNDAY :
            System.out.println("It's the weekend!");
            break;
        ...
    }
    
```

Se um rótulo `case` com um padrão `case` se aplica, isso ocorre porque o processo de correspondência de padrão do valor com o padrão foi bem-sucedido ([§14.30.2](<#/doc/jls/jls-14>)). Se um valor corresponde com sucesso a um padrão, então o processo de correspondência de padrão inicializa quaisquer variáveis de padrão declaradas pelo padrão.

Em C e C++, o corpo de uma instrução `switch` pode ser uma instrução e as instruções com rótulos `case` não precisam estar imediatamente contidas por essa instrução. Considere o loop simples:
```

    for (i = 0; i < n; ++i) foo();
    
```

onde `n` é conhecido por ser positivo. Um truque conhecido como _Duff's device_ pode ser usado em C ou C++ para desenrolar o loop, mas este não é um código válido na linguagem de programação Java:
```

    int q = (n+7)/8;
    switch (n%8) {
        case 0: do { foo();    // Great C hack, Tom,
        case 7:      foo();    // but it's not valid here.
        case 6:      foo();
        case 5:      foo();
        case 4:      foo();
        case 3:      foo();
        case 2:      foo();
        case 1:      foo();
                } while (--q > 0);
    }
    
```

Felizmente, este truque não parece ser amplamente conhecido ou usado. Além disso, é menos necessário hoje em dia; este tipo de transformação de código está propriamente na alçada de compiladores otimizadores de última geração.

### 14.11.2. O Bloco `switch` de uma Instrução `switch`

Além das regras gerais para blocos `switch` ([§14.11.1](<#/doc/jls/jls-14>)), existem regras adicionais para blocos `switch` em instruções `switch`.

Uma instrução `switch` _aprimorada_ é aquela onde (i) o tipo da expressão seletora não é `char`, `byte`, `short`, `int`, `Character`, `Byte`, `Short`, `Integer`, `String`, ou um tipo `enum`, ou (ii) há um padrão `case` ou literal `null` associado ao bloco `switch`.

Todas as seguintes condições devem ser verdadeiras para o bloco `switch` de uma instrução `switch`, caso contrário, ocorre um erro em tempo de compilação:

  * Toda expressão de regra `switch` no bloco `switch` é uma expressão de instrução ([§14.8](<#/doc/jls/jls-14>)).

As instruções `switch` diferem das expressões `switch` em termos de quais expressões podem aparecer à direita de uma seta (`->`) no bloco `switch`, ou seja, quais expressões podem ser usadas como _expressões de regra `switch`_. Em uma instrução `switch`, apenas uma expressão de instrução pode ser usada como expressão de regra `switch`, mas em uma expressão `switch`, qualquer expressão pode ser usada ([§15.28.1](<#/doc/jls/jls-15>)).

  * Se a instrução `switch` for uma instrução `switch` aprimorada, então ela deve ser exaustiva ([§14.11.1.1](<#/doc/jls/jls-14>)).

Antes do Java SE 21, as instruções `switch` (e expressões `switch`) eram limitadas de duas maneiras: (i) o tipo da expressão seletora era restrito a um tipo integral (excluindo `long`), um tipo `enum` ou `String` e (ii) nenhum rótulo `case` `null` era suportado. Além disso, ao contrário das expressões `switch`, as instruções `switch` não precisavam ser exaustivas. Isso é frequentemente a causa de bugs difíceis de detectar, onde nenhum rótulo `switch` se aplica e a instrução `switch` silenciosamente não faz nada. Por exemplo:
```

    enum E { A, B, C }
    E e = ...;
    switch (e) {
       case A -> System.out.println("A");
       case B -> System.out.println("B");
       // No case for C!
    }
    
```

No Java SE 21, além de suportar padrões `case`, as duas limitações das instruções `switch` (e expressões `switch`) listadas acima foram flexibilizadas para (i) permitir uma expressão seletora de qualquer tipo de referência, e (ii) permitir um rótulo `case` com um literal `null`. Os designers da linguagem de programação Java também decidiram que as instruções `switch` aprimoradas deveriam se alinhar com as expressões `switch` e ser exigidas como exaustivas. Isso é frequentemente alcançado com a adição de um rótulo `default` trivial. Por exemplo, a seguinte instrução `switch` aprimorada não é exaustiva:
    Object o = ...;
    switch (o) {    // Error - non-exhaustive switch!
        case String s -> System.out.println("A string!");
    }
    
```

mas pode ser facilmente tornado exaustivo:
```
    Object o = ...;
    switch (o) {
        case String s -> System.out.println("A string!");
        default -> {}
    }
    
```

Por razões de compatibilidade, as declarações `switch` que não são declarações `switch` aprimoradas não são obrigadas a ser exaustivas.

### 14.11.3. Execução de uma Declaração `switch`

Uma declaração `switch` é executada avaliando-se primeiro a expressão seletora. Se a avaliação da expressão seletora for concluída abruptamente, então toda a declaração `switch` é concluída abruptamente pela mesma razão.

Se a avaliação da expressão seletora for concluída normalmente, então a execução da declaração `switch` continua determinando se um rótulo `switch` associado ao bloco `switch` se aplica ao valor da expressão seletora (§14.11.1.2). Então:

  * Se o processo de determinação de qual rótulo `switch` se aplica for concluído abruptamente, então toda a declaração `switch` é concluída abruptamente pela mesma razão.

  * Se nenhum rótulo `switch` se aplicar, então uma das seguintes condições se aplica:

    * Se o valor da expressão seletora for `null`, então uma `NullPointerException` é lançada e toda a declaração `switch` é concluída abruptamente por essa razão.

    * Se a declaração `switch` for uma declaração `switch` aprimorada, então uma `MatchException` é lançada e toda a declaração `switch` é concluída abruptamente por essa razão.

    * Se o valor da expressão seletora não for `null`, e a declaração `switch` não for uma declaração `switch` aprimorada, então toda a declaração `switch` é concluída normalmente.

  * Se um rótulo `switch` se aplicar, então uma das seguintes condições se aplica:

    * Se for o rótulo `switch` para uma expressão de regra `switch`, então a expressão de regra `switch` é necessariamente uma expressão de declaração (§14.11.2). A expressão de declaração é avaliada. Se a avaliação for concluída normalmente, então a declaração `switch` é concluída normalmente. Se o resultado da avaliação for um valor, ele é descartado.

    * Se for o rótulo `switch` para um bloco de regra `switch`, então o bloco é executado. Se este bloco for concluído normalmente, então a declaração `switch` é concluída normalmente.

    * Se for o rótulo `switch` para uma declaração `throw` de regra `switch`, então a declaração `throw` é executada.

    * Se for o rótulo `switch` para um grupo de declarações rotuladas `switch`, então todas as declarações no bloco `switch` que seguem o rótulo `switch` são executadas em ordem. Se essas declarações forem concluídas normalmente, então a declaração `switch` é concluída normalmente.

    * Caso contrário, não há declarações no bloco `switch` que sigam o rótulo `switch` que se aplica, e a declaração `switch` é concluída normalmente.

Se a execução de qualquer declaração ou expressão no bloco `switch` for concluída abruptamente, ela é tratada da seguinte forma:

  * Se a execução de uma declaração for concluída abruptamente devido a um `break` sem rótulo, nenhuma ação adicional é tomada e a declaração `switch` é concluída normalmente.

A conclusão abrupta devido a um `break` com um rótulo é tratada pela regra geral para declarações rotuladas (§14.7).

  * Se a execução de uma declaração ou expressão for concluída abruptamente por qualquer outra razão, então a declaração `switch` é concluída abruptamente pela mesma razão.

A conclusão abrupta devido a uma declaração `yield` é tratada pela regra geral para expressões `switch` (§15.28.2).

**Exemplo 14.11.3-1. Fall-Through na Declaração `switch`**

Quando um rótulo `switch` se aplica, e esse rótulo `switch` é para uma regra `switch`, a expressão ou declaração de regra `switch` introduzida pelo rótulo `switch` é executada, e nada mais. No caso de um rótulo `switch` para um grupo de declarações, todas as declarações de bloco no bloco `switch` que seguem o rótulo `switch` são executadas, incluindo aquelas que aparecem após rótulos `switch` subsequentes. O efeito é que, como em C e C++, a execução de declarações pode "cair através dos rótulos" (fall through labels).

Por exemplo, o programa:
```
    class TooMany {
        static void howMany(int k) {
            switch (k) {
                case 1: System.out.print("one ");
                case 2: System.out.print("too ");
                case 3: System.out.println("many");
            }
        }
        public static void main(String[] args) {
            howMany(3);
            howMany(2);
            howMany(1);
        }
    }
    
```

contém um bloco `switch` no qual o código para cada `case` "cai" (falls through) no código do próximo `case`. Como resultado, o programa imprime:
```
    many
    too many
    one too many
    
```

O "fall through" pode ser a causa de bugs sutis. Se o código não deve "cair" de `case` para `case` dessa maneira, então as declarações `break` podem ser usadas para indicar quando o controle deve ser transferido, ou as regras `switch` podem ser usadas, como no programa:
```
    class TwoMany {
        static void howMany(int k) {
            switch (k) {
                case 1: System.out.println("one");
                        break;  // exit the switch
                case 2: System.out.println("two");
                        break;  // exit the switch
                case 3: System.out.println("many");
                        break;  // not needed, but good style
            }
        }
        static void howManyAgain(int k) {
            switch (k) {
                case 1 -> System.out.println("one");
                case 2 -> System.out.println("two");
                case 3 -> System.out.println("many");
            }
        }
        public static void main(String[] args) {
            howMany(1);
            howMany(2);
            howMany(3);
            howManyAgain(1);
            howManyAgain(2);
            howManyAgain(3);
        }
    }
    
    
```

Este programa imprime:
```
    one
    two
    many
    one
    two
    many
    
```

## 14.12. A Declaração `while`

A declaração `while` executa uma _Expressão_ e uma _Declaração_ repetidamente até que o valor da _Expressão_ seja `false`.

WhileStatement:

`while` `(` Expression `)` Statement

WhileStatementNoShortIf:

`while` `(` Expression `)` StatementNoShortIf

A _Expressão_ deve ter o tipo `boolean` ou `Boolean`, ou ocorre um erro em tempo de compilação.

Uma declaração `while` é executada avaliando-se primeiro a _Expressão_. Se o resultado for do tipo `Boolean`, ele é submetido à conversão de unboxing (§5.1.8).

Se a avaliação da _Expressão_ ou a subsequente conversão de unboxing (se houver) for concluída abruptamente por alguma razão, a declaração `while` é concluída abruptamente pela mesma razão.

Caso contrário, a execução continua fazendo uma escolha com base no valor resultante:

  * Se o valor for `true`, então a _Declaração_ contida é executada. Então há uma escolha:

    * Se a execução da _Declaração_ for concluída normalmente, então toda a declaração `while` é executada novamente, começando pela reavaliação da _Expressão_.

    * Se a execução da _Declaração_ for concluída abruptamente, consulte §14.12.1.

  * Se o valor (possivelmente unboxed) da _Expressão_ for `false`, nenhuma ação adicional é tomada e a declaração `while` é concluída normalmente.

Se o valor (possivelmente unboxed) da _Expressão_ for `false` na primeira vez que for avaliado, então a _Declaração_ não é executada.

### 14.12.1. Conclusão Abrupta da Declaração `while`

A conclusão abrupta da _Declaração_ contida é tratada da seguinte forma:

  * Se a execução da _Declaração_ for concluída abruptamente devido a um `break` sem rótulo, nenhuma ação adicional é tomada e a declaração `while` é concluída normalmente.

  * Se a execução da _Declaração_ for concluída abruptamente devido a um `continue` sem rótulo, então toda a declaração `while` é executada novamente.

  * Se a execução da _Declaração_ for concluída abruptamente devido a um `continue` com rótulo `L`, então há uma escolha:

    * Se a declaração `while` tiver o rótulo `L`, então toda a declaração `while` é executada novamente.

    * Se a declaração `while` não tiver o rótulo `L`, a declaração `while` é concluída abruptamente devido a um `continue` com rótulo `L`.

  * Se a execução da _Declaração_ for concluída abruptamente por qualquer outra razão, a declaração `while` é concluída abruptamente pela mesma razão.

O caso de conclusão abrupta devido a um `break` com um rótulo é tratado pela regra geral para declarações rotuladas (§14.7).

## 14.13. A Declaração `do`

A declaração `do` executa uma _Declaração_ e uma _Expressão_ repetidamente até que o valor da _Expressão_ seja `false`.

DoStatement:

`do` Statement `while` `(` Expression `)` `;`

A _Expressão_ deve ter o tipo `boolean` ou `Boolean`, ou ocorre um erro em tempo de compilação.

Uma declaração `do` é executada primeiro executando a _Declaração_. Então há uma escolha:

  * Se a execução da _Declaração_ for concluída normalmente, então a _Expressão_ é avaliada. Se o resultado for do tipo `Boolean`, ele é submetido à conversão de unboxing (§5.1.8).

Se a avaliação da _Expressão_ ou a subsequente conversão de unboxing (se houver) for concluída abruptamente por alguma razão, a declaração `do` é concluída abruptamente pela mesma razão.

Caso contrário, há uma escolha com base no valor resultante:

    * Se o valor for `true`, então toda a declaração `do` é executada novamente.

    * Se o valor for `false`, nenhuma ação adicional é tomada e a declaração `do` é concluída normalmente.

  * Se a execução da _Declaração_ for concluída abruptamente, consulte §14.13.1.

A execução de uma declaração `do` sempre executa a _Declaração_ contida pelo menos uma vez.

### 14.13.1. Conclusão Abrupta da Declaração `do`

A conclusão abrupta da _Declaração_ contida é tratada da seguinte forma:

  * Se a execução da _Declaração_ for concluída abruptamente devido a um `break` sem rótulo, nenhuma ação adicional é tomada e a declaração `do` é concluída normalmente.

  * Se a execução da _Declaração_ for concluída abruptamente devido a um `continue` sem rótulo, então a _Expressão_ é avaliada. Então há uma escolha com base no valor resultante:

    * Se o valor for `true`, então toda a declaração `do` é executada novamente.

    * Se o valor for `false`, nenhuma ação adicional é tomada e a declaração `do` é concluída normalmente.

  * Se a execução da _Declaração_ for concluída abruptamente devido a um `continue` com rótulo `L`, então há uma escolha:

    * Se a declaração `do` tiver o rótulo `L`, então a _Expressão_ é avaliada. Então há uma escolha:

      * Se o valor da _Expressão_ for `true`, então toda a declaração `do` é executada novamente.

      * Se o valor da _Expressão_ for `false`, nenhuma ação adicional é tomada e a declaração `do` é concluída normalmente.

    * Se a declaração `do` não tiver o rótulo `L`, a declaração `do` é concluída abruptamente devido a um `continue` com rótulo `L`.

  * Se a execução da _Declaração_ for concluída abruptamente por qualquer outra razão, a declaração `do` é concluída abruptamente pela mesma razão.

O caso de conclusão abrupta devido a um `break` com um rótulo é tratado pela regra geral para declarações rotuladas (§14.7).

**Exemplo 14.13-1. A Declaração `do`**

O código a seguir é uma possível implementação do método `toHexString` da classe `Integer`:
```
    
    public static String toHexString(int i) {
        StringBuffer buf = new StringBuffer(8);
        do {
            buf.append(Character.forDigit(i & 0xF, 16));
            i >>>= 4;
        } while (i != 0);
        return buf.reverse().toString();
    }
    
    
```

Como pelo menos um dígito deve ser gerado, a declaração `do` é uma estrutura de controle apropriada.

## 14.14. A Declaração `for`

A declaração `for` possui duas formas:

  * A declaração `for` básica.

  * A declaração `for` aprimorada.

ForStatement:

BasicForStatement   
EnhancedForStatement

ForStatementNoShortIf:

BasicForStatementNoShortIf   
EnhancedForStatementNoShortIf

### 14.14.1. A Declaração `for` básica

A declaração `for` básica executa um código de inicialização, depois executa uma _Expressão_, uma _Declaração_ e um código de atualização repetidamente até que o valor da _Expressão_ seja `false`.

BasicForStatement:

`for` `(` [ForInit] `;` [Expression] `;` [ForUpdate] `)` Statement

BasicForStatementNoShortIf:

`for` `(` [ForInit] `;` [Expression] `;` [ForUpdate] `)` StatementNoShortIf

ForInit:

StatementExpressionList   
LocalVariableDeclaration

ForUpdate:

StatementExpressionList

StatementExpressionList:

StatementExpression {`,` StatementExpression} 

O tipo da _Expressão_ deve ser `boolean` ou `Boolean`, ou ocorre um erro em tempo de compilação.

O escopo e o sombreamento de uma variável local declarada na parte _ForInit_ de uma declaração `for` básica são especificados em §6.3 e §6.4.

Referências a uma variável local declarada na parte _ForInit_ de uma declaração `for` básica a partir de uma classe ou interface aninhada, ou uma expressão lambda, são restritas, conforme especificado em §6.5.6.1.

#### 14.14.1.1. Inicialização da Declaração `for`

Uma declaração `for` é executada primeiro executando o código _ForInit_:

  * Se o código _ForInit_ for uma lista de expressões de declaração (§14.8), as expressões são avaliadas em sequência da esquerda para a direita; seus valores, se houver, são descartados.

Se a avaliação de qualquer expressão for concluída abruptamente por alguma razão, a declaração `for` é concluída abruptamente pela mesma razão; quaisquer expressões de declaração _ForInit_ à direita daquela que foi concluída abruptamente não são avaliadas.

  * Se o código _ForInit_ for uma declaração de variável local (§14.4), ele é executado como se fosse uma declaração de variável local aparecendo em um bloco (§14.4.2).

Se a execução da declaração de variável local for concluída abruptamente por qualquer razão, a declaração `for` é concluída abruptamente pela mesma razão.

  * Se a parte _ForInit_ não estiver presente, nenhuma ação é tomada.

#### 14.14.1.2. Iteração da Declaração `for`

Em seguida, um passo de iteração `for` é realizado, da seguinte forma:

  * Se a _Expressão_ estiver presente, ela é avaliada. Se o resultado for do tipo `Boolean`, ele é submetido à conversão de unboxing (§5.1.8).

Se a avaliação da _Expressão_ ou a subsequente conversão de unboxing (se houver) for concluída abruptamente, a declaração `for` é concluída abruptamente pela mesma razão.

Caso contrário, há então uma escolha baseada na presença ou ausência da _Expressão_ e no valor resultante se a _Expressão_ estiver presente; veja o próximo item.

  * Se a _Expressão_ não estiver presente, ou se estiver presente e o valor resultante de sua avaliação (incluindo qualquer possível unboxing) for `true`, então a _Declaração_ contida é executada. Então há uma escolha:

    * Se a execução da _Declaração_ for concluída normalmente, então os dois passos seguintes são realizados em sequência:

      1. Primeiro, se a parte _ForUpdate_ estiver presente, as expressões são avaliadas em sequência da esquerda para a direita; seus valores, se houver, são descartados.

Se a parte _ForUpdate_ não estiver presente, nenhuma ação é tomada.

      2. Segundo, outro passo de iteração `for` é realizado.

    * Se a execução da _Declaração_ for concluída abruptamente, consulte §14.14.1.3.

  * Se a _Expressão_ estiver presente e o valor resultante de sua avaliação (incluindo qualquer possível unboxing) for `false`, nenhuma ação adicional é tomada e a declaração `for` é concluída normalmente.

Se o valor (possivelmente unboxed) da _Expressão_ for `false` na primeira vez que for avaliado, então a _Declaração_ não é executada.

Se a _Expressão_ não estiver presente, então a única maneira de uma declaração `for` ser concluída normalmente é pelo uso de uma declaração `break`.

#### 14.14.1.3. Conclusão Abrupta da Declaração `for`

A conclusão abrupta da _Declaração_ contida é tratada da seguinte forma:

  * Se a execução da _Declaração_ for concluída abruptamente devido a um `break` sem rótulo, nenhuma ação adicional é tomada e a declaração `for` é concluída normalmente.

  * Se a execução da _Declaração_ for concluída abruptamente devido a um `continue` sem rótulo, então os dois passos seguintes são realizados em sequência:

    1. Primeiro, se a parte _ForUpdate_ estiver presente, as expressões são avaliadas em sequência da esquerda para a direita; seus valores, se houver, são descartados.

Se a parte _ForUpdate_ não estiver presente, nenhuma ação é tomada.

    2. Segundo, outro passo de iteração `for` é realizado.

  * Se a execução da _Declaração_ for concluída abruptamente devido a um `continue` com rótulo `L`, então há uma escolha:

    * Se a declaração `for` tiver o rótulo `L`, então os dois passos seguintes são realizados em sequência:

      1. Primeiro, se a parte _ForUpdate_ estiver presente, as expressões são avaliadas em sequência da esquerda para a direita; seus valores, se houver, são descartados.

Se o _ForUpdate_ não estiver presente, nenhuma ação é tomada.

      2. Segundo, outro passo de iteração `for` é realizado.

    * Se a declaração `for` não tiver o rótulo `L`, a declaração `for` é concluída abruptamente devido a um `continue` com rótulo `L`.

  * Se a execução da _Declaração_ for concluída abruptamente por qualquer outra razão, a declaração `for` é concluída abruptamente pela mesma razão.

Note que o caso de conclusão abrupta devido a um `break` com um rótulo é tratado pela regra geral para declarações rotuladas (§14.7).

### 14.14.2. A declaração `for` aprimorada

A declaração `for` aprimorada tem a forma:

EnhancedForStatement:

`for` `(` LocalVariableDeclaration `:` Expression `)` Statement

EnhancedForStatementNoShortIf:

`for` `(` LocalVariableDeclaration `:` Expression `)` StatementNoShortIf

As seguintes produções de §4.3, §8.3, §8.4.1 e §14.4 são mostradas aqui para conveniência:

LocalVariableDeclaration:

{VariableModifier} LocalVariableType VariableDeclaratorList

VariableModifier:

Annotation   
`final`

LocalVariableType:

UnannType   
`var`

VariableDeclaratorList:

VariableDeclarator {`,` VariableDeclarator} 

VariableDeclarator:

VariableDeclaratorId `=` [VariableInitializer] 

VariableDeclaratorId:

Identifier [Dims]   
`_`

Dims:

{Annotation} `[` `]` {{Annotation} `[` `]`} 

O tipo da _Expressão_ deve ser um tipo de array (§10.1) ou um subtipo do tipo raw `Iterable`, ou ocorre um erro em tempo de compilação.

O cabeçalho da declaração `for` aprimorada declara uma variável local cujo nome é o identificador dado por _VariableDeclaratorId_, ou declara uma variável local sem nome (§6.3). Quando a declaração `for` aprimorada é executada, a variável local é inicializada, em cada iteração do loop, para elementos sucessivos do `Iterable` ou do array produzido pela expressão.

As regras para uma variável local declarada no cabeçalho de uma declaração `for` aprimorada são especificadas em §14.4, desconsiderando quaisquer regras nessa seção que se aplicam quando o _LocalVariableType_ é `var`. Além disso, todas as seguintes condições devem ser verdadeiras, ou ocorre um erro em tempo de compilação:

  * O _VariableDeclaratorList_ consiste em um único _VariableDeclarator_.

  * O _VariableDeclarator_ não possui inicializador.

  * O _VariableDeclaratorId_ não possui pares de colchetes se o _LocalVariableType_ for `var`.

O escopo e o sombreamento de uma variável local declarada no cabeçalho de uma declaração `for` aprimorada são especificados em §6.3 e §6.4.

Referências à variável local a partir de uma classe ou interface aninhada, ou uma expressão lambda, são restritas, conforme especificado em §6.5.6.1.

O tipo T da variável local declarada no cabeçalho da declaração `for` aprimorada é determinado da seguinte forma:

  * Se o _LocalVariableType_ for _UnannType_, e nenhum par de colchetes aparecer em _UnannType_ ou _VariableDeclaratorId_, então T é o tipo denotado por _UnannType_.

  * Se o _LocalVariableType_ for _UnannType_, e pares de colchetes aparecerem em _UnannType_ ou _VariableDeclaratorId_, então T é especificado por §10.2.

  * Se o _LocalVariableType_ for `var`, então seja R derivado do tipo da _Expressão_, da seguinte forma:

    * Se a _Expressão_ tiver um tipo de array, então R é o tipo de componente do tipo de array.

    * Caso contrário, se a _Expressão_ tiver um tipo que é um subtipo de `Iterable``<`X`>`, para algum tipo X, então R é X.

    * Caso contrário, a _Expressão_ tem um tipo que é um subtipo do tipo raw `Iterable`, e R é `Object`.

T é a projeção ascendente de R em relação a todas as variáveis de tipo sintéticas mencionadas por R (§4.10.5).

O significado preciso da declaração `for` aprimorada é dado pela tradução para uma declaração `for` básica, da seguinte forma:

  * Se o tipo da _Expressão_ for um subtipo de `Iterable`, então a declaração `for` básica tem esta forma:
```for (I #i = _Expression_.iterator(); #i.hasNext(); ) {
            _{VariableModifier} T VarDeclId_ = (TargetType) #i.next();
            _Statement_
        }
```

onde:

    * Se o tipo da _Expressão_ for um subtipo de `Iterable``<`X`>` para algum argumento de tipo X, então I é o tipo `java.util.Iterator``<`X`>`. Caso contrário, I é o tipo raw `java.util.Iterator`.

    * `#i` é um identificador gerado automaticamente que é distinto de quaisquer outros identificadores (gerados automaticamente ou não) que estão no escopo (§6.3) no ponto onde a declaração `for` aprimorada ocorre.

    * _{VariableModifier}_ é como dado no cabeçalho da declaração `for` aprimorada.

    * T é o tipo da variável local conforme determinado acima.

    * Se T for um tipo de referência, então _TargetType_ é T. Caso contrário, _TargetType_ é o limite superior da conversão de captura (§5.1.10) do argumento de tipo de I, ou `Object` se I for raw.

    * Se a declaração de uma variável local no cabeçalho incluir um identificador, então _VarDeclId_ é definido como _Identifier_ conforme dado no cabeçalho; caso contrário, _VarDeclId_ é definido como `_` (underscore).

  * Caso contrário, a _Expressão_ necessariamente tem um tipo de array, S`[]`, e a declaração `for` básica tem esta forma:
```S[] #a = _Expression_ ;
        L1: L2: ... Lm:
        for (int #i = 0; #i < #a.length; #i++) {
            _{VariableModifier} T VarDeclId_ = #a[#i];
            _Statement_
        }
```

onde:

    * `L1` ... `Lm` é a sequência (possivelmente vazia) de rótulos imediatamente precedendo a declaração `for` aprimorada.

    * `#a` e `#i` são identificadores gerados automaticamente que são distintos de quaisquer outros identificadores (gerados automaticamente ou não) que estão no escopo no ponto onde a declaração `for` aprimorada ocorre.

    * _{VariableModifier}_ é como dado no cabeçalho da declaração `for` aprimorada.

    * T é o tipo da variável local conforme determinado acima.

    * Se a declaração de uma variável local no cabeçalho incluir um identificador, então _VarDeclId_ é definido como _Identifier_ conforme dado no cabeçalho; caso contrário, _VarDeclId_ é definido como `_` (underscore).

Por exemplo, este código:
```
    List<? extends Integer> l = ...
    for (float i : l) ...
    
```

será traduzido para:
```
    for (Iterator<Integer> #i = l.iterator(); #i.hasNext(); ) {
        float #i0 = (Integer)#i.next();
        ...
    
```

**Exemplo 14.14-1. `for` Aprimorado e Arrays**

O programa a seguir, que calcula a soma de um array de inteiros, mostra como o `for` aprimorado funciona para arrays:
```
    
    int sum(int[] a) {
        int sum = 0;
        for (int i : a) sum += i;
        return sum;
    }
    
    
```

**Exemplo 14.14-2. `for` Aprimorado e Conversão de Unboxing**

O programa a seguir combina a declaração `for` aprimorada com auto-unboxing para traduzir um histograma em uma tabela de frequência:
```
    
    Map<String, Integer> histogram = ...;
    double total = 0;
    for (int i : histogram.values())
        total += i;
    for (Map.Entry<String, Integer> e : histogram.entrySet())
        System.out.println(e.getKey() + " " + e.getValue() / total);
    }
    
    
## 14.15. A Instrução `break`

Uma instrução `break` transfere o controle para fora de uma instrução englobadora.

BreakStatement:

`break` [[Identifier](<#/doc/jls/jls-03>)] `;`

Existem dois tipos de instrução `break`:

  * Uma instrução `break` sem rótulo.

  * Uma instrução `break` com o rótulo _Identifier_.

Uma instrução `break` sem rótulo tenta transferir o controle para a instrução `switch`, `while`, `do` ou `for` englobadora mais interna; esta instrução englobadora, que é chamada de _alvo do break_, então é concluída imediatamente de forma normal.

Uma instrução `break` com o rótulo _Identifier_ tenta transferir o controle para a instrução rotulada englobadora ([§14.7](<#/doc/jls/jls-14>)) que possui o mesmo _Identifier_ como seu rótulo; esta instrução englobadora, que é chamada de _alvo do break_, então é concluída imediatamente de forma normal. Neste caso, o alvo do break não precisa ser uma instrução `switch`, `while`, `do` ou `for`.

É um erro em tempo de compilação se uma instrução `break` não tiver um alvo do break.

É um erro em tempo de compilação se o alvo do break contiver qualquer método, construtor, inicializador de instância, inicializador estático, expressão lambda ou expressão switch que englobe a instrução `break`. Ou seja, não há saltos não locais.

A execução de uma instrução `break` sem rótulo sempre é concluída abruptamente, sendo a razão um `break` sem rótulo.

A execução de uma instrução `break` com o rótulo _Identifier_ sempre é concluída abruptamente, sendo a razão um `break` com o rótulo _Identifier_.

Pode-se observar, então, que uma instrução `break` sempre é concluída abruptamente.

As descrições anteriores dizem "tenta transferir o controle" em vez de apenas "transfere o controle" porque, se houver quaisquer instruções `try` ([§14.20](<#/doc/jls/jls-14>)) dentro do alvo do break cujos blocos `try` ou cláusulas `catch` contêm a instrução `break`, então quaisquer cláusulas `finally` dessas instruções `try` são executadas, em ordem, da mais interna para a mais externa, antes que o controle seja transferido para o alvo do break. A conclusão abrupta de uma cláusula `finally` pode interromper a transferência de controle iniciada por uma instrução `break`.

**Exemplo 14.15-1. A Instrução `break`

No exemplo a seguir, um grafo matemático é representado por um array de arrays. Um grafo consiste em um conjunto de nós e um conjunto de arestas; cada aresta é uma seta que aponta de algum nó para algum outro nó, ou de um nó para si mesmo. Neste exemplo, assume-se que não há arestas redundantes; ou seja, para quaisquer dois nós `P` e `Q`, onde `Q` pode ser o mesmo que `P`, há no máximo uma aresta de `P` para `Q`.

Os nós são representados por inteiros, e há uma aresta do nó `i` para o nó `edges[`i`][`j`]` para cada `i` e `j` para os quais a referência de array `edges[`i`][`j`]` não lança uma `ArrayIndexOutOfBoundsException`.

A tarefa do método `loseEdges`, dados os inteiros `i` e `j`, é construir um novo grafo copiando um grafo dado, mas omitindo a aresta do nó `i` para o nó `j`, se houver, e a aresta do nó `j` para o nó `i`, se houver:
```java
    class Graph {
        int[][] edges;
        public Graph(int[][] edges) { this.edges = edges; }
    
        public Graph loseEdges(int i, int j) {
            int n = edges.length;
            int[][] newedges = new int[n][];
            for (int k = 0; k < n; ++k) {
    edgelist:
    {
                int z;
    search:
    {
                if (k == i) {
                    for (z = 0; z < edges[k].length; ++z) {
                        if (edges[k][z] == j) break search;
                    }
                } else if (k == j) {
                    for (z = 0; z < edges[k].length; ++z) {
                        if (edges[k][z] == i) break search;
                    }
                }
    
                // No edge to be deleted; share this list.
                newedges[k] = edges[k];
                break edgelist;
    } //search
    
                // Copy the list, omitting the edge at position z.
                int   m  = edges[k].length - 1;
                int[] ne = new int[m];
                System.arraycopy(edges[k], 0, ne, 0, z);
                System.arraycopy(edges[k], z+1, ne, z, m-z);
                newedges[k] = ne;
    } //edgelist
            }
            return new Graph(newedges);
        }
    }
```

Observe o uso de dois rótulos de instrução, `edgelist` e `search`, e o uso de instruções `break`. Isso permite que o código que copia uma lista, omitindo uma aresta, seja compartilhado entre dois testes separados, o teste para uma aresta do nó `i` para o nó `j`, e o teste para uma aresta do nó `j` para o nó `i`.

## 14.16. A Instrução `continue`

Uma instrução `continue` pode ocorrer apenas em uma instrução `while`, `do` ou `for`; instruções desses três tipos são chamadas de _instruções de iteração_. O controle passa para o ponto de continuação do loop de uma instrução de iteração.

ContinueStatement:

`continue` [[Identifier](<#/doc/jls/jls-03>)] `;`

Existem dois tipos de instrução `continue`:

  * Uma instrução `continue` sem rótulo.

  * Uma instrução `continue` com o rótulo _Identifier_.

Uma instrução `continue` sem rótulo tenta transferir o controle para a instrução `while`, `do` ou `for` englobadora mais interna; esta instrução englobadora, que é chamada de _alvo do continue_, então encerra imediatamente a iteração atual e inicia uma nova.

Uma instrução `continue` com o rótulo _Identifier_ tenta transferir o controle para a instrução rotulada englobadora ([§14.7](<#/doc/jls/jls-14>)) que possui o mesmo _Identifier_ como seu rótulo; esta instrução englobadora, que é chamada de _alvo do continue_, então encerra imediatamente a iteração atual e inicia uma nova. Neste caso, o alvo do continue deve ser uma instrução `while`, `do` ou `for`, ou ocorre um erro em tempo de compilação.

É um erro em tempo de compilação se uma instrução `continue` não tiver um alvo do continue.

É um erro em tempo de compilação se o alvo do continue contiver qualquer método, construtor, inicializador de instância, inicializador estático, expressão lambda ou expressão switch que englobe a instrução `continue`. Ou seja, não há saltos não locais.

A execução de uma instrução `continue` sem rótulo sempre é concluída abruptamente, sendo a razão um `continue` sem rótulo.

A execução de uma instrução `continue` com o rótulo _Identifier_ sempre é concluída abruptamente, sendo a razão um `continue` com o rótulo _Identifier_.

Pode-se observar, então, que uma instrução `continue` sempre é concluída abruptamente.

Consulte as descrições da instrução `while` ([§14.12](<#/doc/jls/jls-14>)), instrução `do` ([§14.13](<#/doc/jls/jls-14>)) e instrução `for` ([§14.14](<#/doc/jls/jls-14>)) para uma discussão sobre o tratamento de terminação abrupta devido ao `continue`.

As descrições anteriores dizem "tenta transferir o controle" em vez de apenas "transfere o controle" porque, se houver quaisquer instruções `try` ([§14.20](<#/doc/jls/jls-14>)) dentro do alvo do continue cujos blocos `try` ou cláusulas `catch` contêm a instrução `continue`, então quaisquer cláusulas `finally` dessas instruções `try` são executadas, em ordem, da mais interna para a mais externa, antes que o controle seja transferido para o alvo do continue. A conclusão abrupta de uma cláusula `finally` pode interromper a transferência de controle iniciada por uma instrução `continue`.

**Exemplo 14.16-1. A Instrução `continue`

Na classe `Graph` em [§14.15](<#/doc/jls/jls-14>), uma das instruções `break` é usada para finalizar a execução de todo o corpo do loop `for` mais externo. Este break pode ser substituído por um `continue` se o próprio loop `for` for rotulado:
```java
    class Graph {
        int[][] edges;
        public Graph(int[][] edges) { this.edges = edges; }
    
        public Graph loseEdges(int i, int j) {
            int n = edges.length;
            int[][] newedges = new int[n][];
    edgelists:
            for (int k = 0; k < n; ++k) {
                int z;
    search:
    {
                if (k == i) {
                    for (z = 0; z < edges[k].length; ++z) {
                        if (edges[k][z] == j) break search;
                    }
                } else if (k == j) {
                    for (z = 0; z < edges[k].length; ++z) {
                        if (edges[k][z] == i) break search;
                    }
                }
    
                // No edge to be deleted; share this list.
                newedges[k] = edges[k];
                continue edgelists;
    } //search
    
                // Copy the list, omitting the edge at position z.
                int   m  = edges[k].length - 1;
                int[] ne = new int[m];
                System.arraycopy(edges[k], 0, ne, 0, z);
                System.arraycopy(edges[k], z+1, ne, z, m-z);
                newedges[k] = ne;
            } //edgelists
            return new Graph(newedges);
        }
    }
```

Qual usar, se for o caso, é em grande parte uma questão de estilo de programação.

## 14.17. A Instrução `return`

Uma instrução `return` retorna o controle para o invocador de um método ([§8.4](<#/doc/jls/jls-08>), [§15.12](<#/doc/jls/jls-15>)) ou construtor ([§8.8](<#/doc/jls/jls-08>), [§15.9](<#/doc/jls/jls-15>)).

ReturnStatement:

`return` [[Expression](<#/doc/jls/jls-15>)] `;`

Existem dois tipos de instrução `return`:

  * Uma instrução `return` sem valor.

  * Uma instrução `return` com valor _Expression_.

Uma instrução `return` tenta transferir o controle para o invocador do construtor, método ou expressão lambda englobadora mais interna; esta declaração ou expressão englobadora é chamada de _alvo do return_. No caso de uma instrução `return` com valor _Expression_, o valor da _Expression_ torna-se o valor da invocação.

É um erro em tempo de compilação se uma instrução `return` não tiver um alvo do return.

É um erro em tempo de compilação se o alvo do return contiver (i) um inicializador de instância ou estático que englobe a instrução `return`, ou (ii) uma expressão `switch` que englobe a instrução `return`.

É um erro em tempo de compilação se o alvo do return de uma instrução `return` sem valor for um método, e esse método não for declarado `void`.

É um erro em tempo de compilação se o alvo do return de uma instrução `return` for um construtor, e a instrução `return` aparecer no prólogo deste construtor ([§8.8.7](<#/doc/jls/jls-08>)).

É um erro em tempo de compilação se o alvo do return de uma instrução `return` com valor _Expression_ for um construtor, ou um método que é declarado `void`.

É um erro em tempo de compilação se o alvo do return de uma instrução `return` com valor _Expression_ for um método com tipo de retorno declarado T, e o tipo de _Expression_ não for compatível para atribuição ([§5.2](<#/doc/jls/jls-05>)) com T.

A execução de uma instrução `return` sem valor sempre é concluída abruptamente, sendo a razão um return sem valor.

A execução de uma instrução `return` com valor _Expression_ primeiro avalia a _Expression_. Se a avaliação da _Expression_ for concluída abruptamente por algum motivo, então a instrução `return` é concluída abruptamente por esse motivo. Se a avaliação da _Expression_ for concluída normalmente, produzindo um valor `V`, então a instrução `return` é concluída abruptamente, sendo a razão um return com valor `V`.

Pode-se observar, então, que uma instrução `return` sempre é concluída abruptamente.

As descrições anteriores dizem "tenta transferir o controle" em vez de apenas "transfere o controle" porque, se houver quaisquer instruções `try` ([§14.20](<#/doc/jls/jls-14>)) dentro do método ou construtor cujos blocos `try` ou cláusulas `catch` contêm a instrução `return`, então quaisquer cláusulas `finally` dessas instruções `try` serão executadas, em ordem, da mais interna para a mais externa, antes que o controle seja transferido para o invocador do método ou construtor. A conclusão abrupta de uma cláusula `finally` pode interromper a transferência de controle iniciada por uma instrução `return`.

## 14.18. A Instrução `throw`

Uma instrução `throw` faz com que uma exceção ([§11 (_Exceptions_)](<#/doc/jls/jls-11>)) seja lançada. O resultado é uma transferência imediata de controle ([§11.3](<#/doc/jls/jls-11>)) que pode sair de múltiplas instruções e múltiplas avaliações de construtores, inicializadores de instância, inicializadores estáticos e inicializadores de campo, e invocações de métodos até que uma instrução `try` ([§14.20](<#/doc/jls/jls-14>)) seja encontrada que capture o valor lançado. Se nenhuma instrução `try` for encontrada, então a execução da thread ([§17 (_Threads and Locks_)](<#/doc/jls/jls-17>)) que executou o `throw` é terminada ([§11.3](<#/doc/jls/jls-11>)) após a invocação do método `uncaughtException` para o grupo de threads ao qual a thread pertence.

ThrowStatement:

`throw` [Expression](<#/doc/jls/jls-15>) `;`

A _Expression_ em uma instrução `throw` deve denotar uma variável ou valor de um tipo de referência que seja atribuível ([§5.2](<#/doc/jls/jls-05>)) ao tipo `Throwable`, ou denotar a referência nula, ou ocorre um erro em tempo de compilação.

O tipo de referência da _Expression_ será sempre um tipo de classe (já que nenhum tipo de interface é atribuível a `Throwable`) que não é parametrizado (já que uma subclasse de `Throwable` não pode ser genérica ([§8.1.2](<#/doc/jls/jls-08>))).

Pelo menos uma das três condições a seguir deve ser verdadeira, ou ocorre um erro em tempo de compilação:

  * O tipo da _Expression_ é uma classe de exceção não verificada ([§11.1.1](<#/doc/jls/jls-11>)) ou o tipo nulo ([§4.1](<#/doc/jls/jls-04>)).

  * A instrução `throw` está contida no bloco `try` de uma instrução `try` ([§14.20](<#/doc/jls/jls-14>)) e não é o caso que a instrução `try` possa lançar uma exceção do tipo da _Expression_. (Neste caso, dizemos que o valor lançado é _capturado_ pela instrução `try`.)

  * A instrução `throw` está contida em uma declaração de método ou construtor e o tipo da _Expression_ é atribuível ([§5.2](<#/doc/jls/jls-05>)) a pelo menos um tipo listado na cláusula `throws` ([§8.4.6](<#/doc/jls/jls-08>), [§8.8.5](<#/doc/jls/jls-08>)) da declaração.

Os tipos de exceção que uma instrução `throw` pode lançar são especificados em [§11.2.2](<#/doc/jls/jls-11>).

Uma instrução `throw` primeiro avalia a _Expression_. Então:

  * Se a avaliação da _Expression_ for concluída abruptamente por algum motivo, então o `throw` é concluído abruptamente por esse motivo.

  * Se a avaliação da _Expression_ for concluída normalmente, produzindo um valor não-`null` `V`, então a instrução `throw` é concluída abruptamente, sendo a razão um `throw` com valor `V`.

  * Se a avaliação da _Expression_ for concluída normalmente, produzindo um valor `null`, então uma instância `V'` da classe `NullPointerException` é criada e lançada em vez de `null`. A instrução `throw` então é concluída abruptamente, sendo a razão um `throw` com valor `V'`.

Pode-se observar, então, que uma instrução `throw` sempre é concluída abruptamente.

Se houver quaisquer instruções `try` englobadoras ([§14.20](<#/doc/jls/jls-14>)) cujos blocos `try` contêm a instrução `throw`, então quaisquer cláusulas `finally` dessas instruções `try` são executadas à medida que o controle é transferido para fora, até que o valor lançado seja capturado. Observe que a conclusão abrupta de uma cláusula `finally` pode interromper a transferência de controle iniciada por uma instrução `throw`.

Se uma instrução `throw` estiver contida em uma declaração de método ou uma expressão lambda, mas seu valor não for capturado por alguma instrução `try` que a contenha, então a invocação do método é concluída abruptamente por causa do `throw`.

Se uma instrução `throw` estiver contida em uma declaração de construtor, mas seu valor não for capturado por alguma instrução `try` que a contenha, então a expressão de criação de instância de classe que invocou o construtor será concluída abruptamente por causa do `throw` ([§15.9.4](<#/doc/jls/jls-15>)).

Se uma instrução `throw` estiver contida em um inicializador estático ([§8.7](<#/doc/jls/jls-08>)), então uma verificação em tempo de compilação ([§11.2.3](<#/doc/jls/jls-11>)) garante que seu valor seja sempre uma exceção não verificada ou que seu valor seja sempre capturado por alguma instrução `try` que a contenha. Se em tempo de execução, apesar dessa verificação, o valor não for capturado por alguma instrução `try` que contenha a instrução `throw`, então o valor é relançado se for uma instância da classe `Error` ou uma de suas subclasses; caso contrário, ele é encapsulado em um objeto `ExceptionInInitializerError`, que é então lançado ([§12.4.2](<#/doc/jls/jls-12>)).

Se uma instrução `throw` estiver contida em um inicializador de instância ([§8.6](<#/doc/jls/jls-08>)), então uma verificação em tempo de compilação ([§11.2.3](<#/doc/jls/jls-11>)) garante que seu valor seja sempre uma exceção não verificada ou que seu valor seja sempre capturado por alguma instrução `try` que a contenha, ou que o tipo da exceção lançada (ou uma de suas superclasses) ocorra na cláusula `throws` de cada construtor da classe.

Por convenção, os tipos lançáveis declarados pelo usuário devem ser geralmente declarados como subclasses da classe `Exception`, que é uma subclasse da classe `Throwable` ([§11.1.1](<#/doc/jls/jls-11>)).
## 14.19. A Instrução `synchronized`

Uma instrução `synchronized` adquire um bloqueio de exclusão mútua ([§17.1](<#/doc/jls/jls-17>)) em nome da thread em execução, executa um bloco e, em seguida, libera o bloqueio. Enquanto a thread em execução possui o bloqueio, nenhuma outra thread pode adquiri-lo.

SynchronizedStatement:

`synchronized` `(` [Expression](<#/doc/jls/jls-15>) `)` [Block](<#/doc/jls/jls-14>)

O tipo de _Expression_ deve ser um tipo de referência, ou ocorre um erro em tempo de compilação.

Uma instrução `synchronized` é executada avaliando-se primeiro a _Expression_. Então:

  * Se a avaliação da _Expression_ for concluída abruptamente por algum motivo, a instrução `synchronized` será concluída abruptamente pelo mesmo motivo.

  * Caso contrário, se o valor da _Expression_ for `null`, uma `NullPointerException` é lançada.

  * Caso contrário, seja `V` o valor não-`null` da _Expression_. A thread em execução bloqueia o monitor associado a `V`. Em seguida, o _Block_ é executado, e então há uma escolha:

    * Se a execução do _Block_ for concluída normalmente, o monitor é desbloqueado e a instrução `synchronized` é concluída normalmente.

    * Se a execução do _Block_ for concluída abruptamente por qualquer motivo, o monitor é desbloqueado e a instrução `synchronized` é concluída abruptamente pelo mesmo motivo.

Os bloqueios adquiridos por instruções `synchronized` são os mesmos que os bloqueios adquiridos implicitamente por métodos `synchronized` ([§8.4.3.6](<#/doc/jls/jls-08>)). Uma única thread pode adquirir um bloqueio mais de uma vez.

Adquirir o bloqueio associado a um objeto não impede, por si só, que outras threads acessem campos do objeto ou invoquem métodos não-`synchronized` no objeto. Outras threads também podem usar métodos `synchronized` ou a instrução `synchronized` de maneira convencional para alcançar a exclusão mútua.

**Exemplo 14.19-1. A Instrução `synchronized`
```java
    class Test {
        public static void main(String[] args) {
            Test t = new Test();
            synchronized(t) {
                synchronized(t) {
                    System.out.println("made it!");
                }
            }
        }
    }
    
```

Este programa produz a seguinte saída:
```
    made it!
    
```

Note que este programa entraria em deadlock se uma única thread não tivesse permissão para bloquear um monitor mais de uma vez.

## 14.20. A Instrução `try`

Uma instrução `try` executa um bloco. Se um valor for lançado e a instrução `try` tiver uma ou mais cláusulas `catch` que possam capturá-lo, o controle será transferido para a primeira cláusula `catch` desse tipo. Se a instrução `try` tiver uma cláusula `finally`, outro bloco de código será executado, independentemente de o bloco `try` ser concluído normalmente ou abruptamente, e independentemente de uma cláusula `catch` receber o controle primeiro.

TryStatement:

`try` [Block](<#/doc/jls/jls-14>) [Catches](<#/doc/jls/jls-14>)   
`try` [Block](<#/doc/jls/jls-14>) [[Catches](<#/doc/jls/jls-14>)] [Finally](<#/doc/jls/jls-14>)   
[TryWithResourcesStatement](<#/doc/jls/jls-14>)

Catches:

[CatchClause](<#/doc/jls/jls-14>) {[CatchClause](<#/doc/jls/jls-14>)} 

CatchClause:

`catch` `(` [CatchFormalParameter](<#/doc/jls/jls-14>) `)` [Block](<#/doc/jls/jls-14>)

CatchFormalParameter:

{[VariableModifier](<#/doc/jls/jls-08>)} [CatchType](<#/doc/jls/jls-14>) [VariableDeclaratorId](<#/doc/jls/jls-08>)

CatchType:

[UnannClassType](<#/doc/jls/jls-08>) {`|` [ClassType](<#/doc/jls/jls-04>)} 

Finally:

`finally` [Block](<#/doc/jls/jls-14>)

Veja [§8.3](<#/doc/jls/jls-08>) para _UnannClassType_. As seguintes produções de [§4.3](<#/doc/jls/jls-04>), [§8.3](<#/doc/jls/jls-08>) e [§8.4.1](<#/doc/jls/jls-08>) são mostradas aqui para conveniência:

VariableModifier:

[Annotation](<#/doc/jls/jls-09>)   
`final`

VariableDeclaratorId:

[Identifier](<#/doc/jls/jls-03>) [[Dims](<#/doc/jls/jls-04>)]   
`_`

Dims:

{[Annotation](<#/doc/jls/jls-09>)} `[` `]` {{[Annotation](<#/doc/jls/jls-09>)} `[` `]`} 

O _Block_ imediatamente após a palavra-chave `try` é chamado de _bloco `try`_ da instrução `try`.

O _Block_ imediatamente após a palavra-chave `finally` é chamado de _bloco `finally`_ da instrução `try`.

Uma instrução `try` pode ter cláusulas `catch`, também chamadas de _manipuladores de exceção_.

Uma cláusula `catch` declara exatamente um parâmetro, que é chamado de _parâmetro de exceção_.

É um erro em tempo de compilação se `final` aparecer mais de uma vez como modificador para uma declaração de parâmetro de exceção.

O escopo e o sombreamento de um parâmetro de exceção são especificados em [§6.3](<#/doc/jls/jls-06>) e [§6.4](<#/doc/jls/jls-06>).

Referências a um parâmetro de exceção de uma classe ou interface aninhada, ou de uma expressão lambda, são restritas, conforme especificado em [§6.5.6.1](<#/doc/jls/jls-06>).

Um parâmetro de exceção pode denotar seu tipo como um único tipo de classe ou uma união de dois ou mais tipos de classe (chamados de _alternativas_). As alternativas de uma união são sintaticamente separadas por `|`.

Uma cláusula `catch` cujo parâmetro de exceção é denotado como um único tipo de classe é chamada de _cláusula uni-`catch`_.

Uma cláusula `catch` cujo parâmetro de exceção é denotado como uma união de tipos é chamada de _cláusula multi-`catch`_.

Cada tipo de classe usado na denotação do tipo de um parâmetro de exceção deve ser a classe `Throwable` ou uma subclasse de `Throwable`, ou ocorre um erro em tempo de compilação.

É um erro em tempo de compilação se uma variável de tipo for usada na denotação do tipo de um parâmetro de exceção.

É um erro em tempo de compilação se uma união de tipos contiver duas alternativas Di e Dj (_i_ ≠ _j_) onde Di é um subtipo de Dj ([§4.10.2](<#/doc/jls/jls-04>)).

O tipo declarado de um parâmetro de exceção que denota seu tipo com um único tipo de classe é esse tipo de classe.

O tipo declarado de um parâmetro de exceção que denota seu tipo como uma união com alternativas D1 `|` D2 `|` ... `|` Dn é lub(D1, D2, ..., Dn).

Um parâmetro de exceção de uma cláusula multi-`catch` é implicitamente declarado `final` se não for explicitamente declarado `final`.

É um erro em tempo de compilação se um parâmetro de exceção que é implícita ou explicitamente declarado `final` receber uma atribuição dentro do corpo da cláusula `catch`.

Um parâmetro de exceção de uma cláusula uni-`catch` nunca é implicitamente declarado `final`, mas pode ser explicitamente declarado `final` ou ser efetivamente final ([§4.12.4](<#/doc/jls/jls-04>)).

Um parâmetro de exceção implicitamente `final` é final em virtude de sua declaração, enquanto um parâmetro de exceção efetivamente final é (por assim dizer) final em virtude de como é usado. Um parâmetro de exceção de uma cláusula multi-`catch` é implicitamente declarado `final`, portanto, nunca ocorrerá como operando esquerdo de um operador de atribuição, mas _não_ é considerado efetivamente final.

Se um parâmetro de exceção for efetivamente final (em uma cláusula uni-`catch`) ou implicitamente final (em uma cláusula multi-`catch`), adicionar um modificador `final` explícito à sua declaração não introduzirá nenhum erro em tempo de compilação. Por outro lado, se o parâmetro de exceção de uma cláusula uni-`catch` for explicitamente declarado `final`, remover o modificador `final` pode introduzir erros em tempo de compilação porque o parâmetro de exceção, agora considerado efetivamente final, não pode mais ser referenciado por declarações de classes anônimas e locais no corpo da cláusula `catch`. Se não houver erros em tempo de compilação, é possível alterar ainda mais o programa para que o parâmetro de exceção seja reatribuído no corpo da cláusula `catch` e, assim, não será mais considerado efetivamente final.

Os tipos de exceção que uma instrução `try` pode lançar são especificados em [§11.2.2](<#/doc/jls/jls-11>).

A relação das exceções lançadas pelo bloco `try` de uma instrução `try` e capturadas pelas cláusulas `catch` (se houver) da instrução `try` é especificada em [§11.2.3](<#/doc/jls/jls-11>).

Os manipuladores de exceção são considerados da esquerda para a direita: a cláusula `catch` mais à esquerda possível aceita a exceção, recebendo como argumento o objeto de exceção lançado, conforme especificado em [§11.3](<#/doc/jls/jls-11>).

Uma cláusula multi-`catch` pode ser pensada como uma sequência de cláusulas uni-`catch`. Ou seja, uma cláusula `catch` onde o tipo do parâmetro de exceção é denotado como uma união D1`|`D2`|`...`|`Dn é equivalente a uma sequência de _n_ cláusulas `catch` onde os tipos dos parâmetros de exceção são os tipos de classe D1, D2, ..., Dn, respectivamente. No _Block_ de cada uma das _n_ cláusulas `catch`, o tipo declarado do parâmetro de exceção é lub(D1, D2, ..., Dn). Por exemplo, o seguinte código:
```java
    try {
        ... throws ReflectiveOperationException ...
    }
    catch (ClassNotFoundException | IllegalAccessException ex) {
        ... body ...
    }
    
```

é semanticamente equivalente ao seguinte código:
```java
    try {
        ... throws ReflectiveOperationException ...
    }
    catch (final ClassNotFoundException ex1) {
        final ReflectiveOperationException ex = ex1;
        ... body ...
    }
    catch (final IllegalAccessException ex2) {
        final ReflectiveOperationException ex = ex2;
        ... body ...
    }
    
```

onde a cláusula multi-`catch` com duas alternativas foi traduzida em duas cláusulas uni-`catch`, uma para cada alternativa. Um compilador Java não é obrigado nem recomendado a compilar uma cláusula multi-`catch` duplicando código dessa maneira, pois é possível representar a cláusula multi-`catch` em um arquivo `class` sem duplicação.

Uma cláusula `finally` garante que o bloco `finally` seja executado após o bloco `try` e qualquer bloco `catch` que possa ser executado, independentemente de como o controle sai do bloco `try` ou do bloco `catch`. O tratamento do bloco `finally` é bastante complexo, então os dois casos de uma instrução `try` com e sem um bloco `finally` são descritos separadamente ([§14.20.1](<#/doc/jls/jls-14>), [§14.20.2](<#/doc/jls/jls-14>)).

Uma instrução `try` pode omitir cláusulas `catch` e uma cláusula `finally` se for uma instrução _`try`-with-resources_ ([§14.20.3](<#/doc/jls/jls-14>)).

### 14.20.1. Execução de `try`-`catch`

Uma instrução `try` sem um bloco `finally` é executada primeiro executando o bloco `try`. Então há uma escolha:

  * Se a execução do bloco `try` for concluída normalmente, nenhuma outra ação será tomada e a instrução `try` será concluída normalmente.

  * Se a execução do bloco `try` for concluída abruptamente devido a um `throw` de um valor `V`, então há uma escolha:

    * Se o tipo em tempo de execução de `V` for compatível com atribuição ([§5.2](<#/doc/jls/jls-05>)) com uma classe de exceção capturável de qualquer cláusula `catch` da instrução `try`, então a primeira (mais à esquerda) cláusula `catch` desse tipo é selecionada. O valor `V` é atribuído ao parâmetro da cláusula `catch` selecionada, e o _Block_ dessa cláusula `catch` é executado, e então há uma escolha:

      * Se esse bloco for concluído normalmente, a instrução `try` será concluída normalmente.

      * Se esse bloco for concluído abruptamente por qualquer motivo, a instrução `try` será concluída abruptamente pelo mesmo motivo.

    * Se o tipo em tempo de execução de `V` não for compatível com atribuição com uma classe de exceção capturável de qualquer cláusula `catch` da instrução `try`, então a instrução `try` será concluída abruptamente devido a um `throw` do valor `V`.

  * Se a execução do bloco `try` for concluída abruptamente por qualquer outro motivo, a instrução `try` será concluída abruptamente pelo mesmo motivo.

**Exemplo 14.20.1-1. Capturando Uma Exceção**
```java
    class BlewIt extends Exception {
        BlewIt() { }
        BlewIt(String s) { super(s); }
    }
    class Test {
        static void blowUp() throws BlewIt { throw new BlewIt(); }
    
        public static void main(String[] args) {
            try {
                blowUp();
            } catch (RuntimeException r) {
                System.out.println("Caught RuntimeException");
            } catch (BlewIt b) {
                System.out.println("Caught BlewIt");
            }
        }
    }
    
```

Aqui, a exceção `BlewIt` é lançada pelo método `blowUp`. A instrução `try`-`catch` no corpo de `main` tem duas cláusulas `catch`. O tipo em tempo de execução da exceção é `BlewIt`, que não é atribuível a uma variável do tipo `RuntimeException`, mas é atribuível a uma variável do tipo `BlewIt`, então a saída do exemplo é:
```
    Caught BlewIt
    
```

### 14.20.2. Execução de `try`-`finally` e `try`-`catch`-`finally`

Uma instrução `try` com um bloco `finally` é executada primeiro executando o bloco `try`. Então há uma escolha:

  * Se a execução do bloco `try` for concluída normalmente, o bloco `finally` será executado, e então há uma escolha:

    * Se o bloco `finally` for concluído normalmente, a instrução `try` será concluída normalmente.

    * Se o bloco `finally` for concluído abruptamente pela razão `S`, a instrução `try` será concluída abruptamente pela razão `S`.

  * Se a execução do bloco `try` for concluída abruptamente devido a um `throw` de um valor `V`, então há uma escolha:

    * Se o tipo em tempo de execução de `V` for compatível com atribuição com uma classe de exceção capturável de qualquer cláusula `catch` da instrução `try`, então a primeira (mais à esquerda) cláusula `catch` desse tipo é selecionada. O valor `V` é atribuído ao parâmetro da cláusula `catch` selecionada, e o _Block_ dessa cláusula `catch` é executado. Então há uma escolha:

      * Se o bloco `catch` for concluído normalmente, o bloco `finally` será executado. Então há uma escolha:

        * Se o bloco `finally` for concluído normalmente, a instrução `try` será concluída normalmente.

        * Se o bloco `finally` for concluído abruptamente por qualquer motivo, a instrução `try` será concluída abruptamente pelo mesmo motivo.

      * Se o bloco `catch` for concluído abruptamente pela razão `R`, o bloco `finally` será executado. Então há uma escolha:

        * Se o bloco `finally` for concluído normalmente, a instrução `try` será concluída abruptamente pela razão `R`.

        * Se o bloco `finally` for concluído abruptamente pela razão `S`, a instrução `try` será concluída abruptamente pela razão `S` (e a razão `R` é descartada).

    * Se o tipo em tempo de execução de `V` não for compatível com atribuição com uma classe de exceção capturável de qualquer cláusula `catch` da instrução `try`, o bloco `finally` será executado. Então há uma escolha:

      * Se o bloco `finally` for concluído normalmente, a instrução `try` será concluída abruptamente devido a um `throw` do valor `V`.

      * Se o bloco `finally` for concluído abruptamente pela razão `S`, a instrução `try` será concluída abruptamente pela razão `S` (e o `throw` do valor `V` é descartado e esquecido).

  * Se a execução do bloco `try` for concluída abruptamente por qualquer outra razão `R`, o bloco `finally` será executado, e então há uma escolha:

    * Se o bloco `finally` for concluído normalmente, a instrução `try` será concluída abruptamente pela razão `R`.

    * Se o bloco `finally` for concluído abruptamente pela razão `S`, a instrução `try` será concluída abruptamente pela razão `S` (e a razão `R` é descartada).

**Exemplo 14.20.2-1. Tratando Uma Exceção Não Capturada Com `finally`
```java
    class BlewIt extends Exception {
        BlewIt() { }
        BlewIt(String s) { super(s); }
    }
    class Test {
        static void blowUp() throws BlewIt {
            throw new NullPointerException();
        }
        public static void main(String[] args) {
            try {
                blowUp();
            } catch (BlewIt b) {
                System.out.println("Caught BlewIt");
            } finally {
                System.out.println("Uncaught Exception");
            }
        }
    }
    
```

Este programa produz a seguinte saída:
```
    Uncaught Exception
    Exception in thread "main" java.lang.NullPointerException
            at Test.blowUp(Test.java:7)
            at Test.main(Test.java:11)
    
```

A `NullPointerException` (que é um tipo de `RuntimeException`) lançada pelo método `blowUp` não é capturada pela instrução `try` em `main`, porque uma `NullPointerException` não é atribuível a uma variável do tipo `BlewIt`. Isso faz com que a cláusula `finally` seja executada, após o que a thread executando `main`, que é a única thread do programa de teste, termina devido a uma exceção não capturada, o que tipicamente resulta na impressão do nome da exceção e de um rastreamento de pilha simples. No entanto, um rastreamento de pilha não é exigido por esta especificação.

O problema de exigir um rastreamento de pilha é que uma exceção pode ser criada em um ponto do programa e lançada em outro. É proibitivamente caro armazenar um rastreamento de pilha em uma exceção, a menos que ela seja realmente lançada (nesse caso, o rastreamento pode ser gerado durante o desenrolamento da pilha). Portanto, não exigimos um rastreamento de pilha em todas as exceções.

### 14.20.3. `try`-with-resources

Uma instrução `try`-with-resources é parametrizada com variáveis (conhecidas como _recursos_) que são inicializadas antes da execução do bloco `try` e fechadas automaticamente, na ordem inversa da sua inicialização, após a execução do bloco `try`. Cláusulas `catch` e uma cláusula `finally` são frequentemente desnecessárias quando os recursos são fechados automaticamente.

TryWithResourcesStatement:

`try` [ResourceSpecification](<#/doc/jls/jls-14>) [Block](<#/doc/jls/jls-14>) [[Catches](<#/doc/jls/jls-14>)] [[Finally](<#/doc/jls/jls-14>)] 

ResourceSpecification:

`(` [ResourceList](<#/doc/jls/jls-14>) [`;`] `)`

ResourceList:

[Resource](<#/doc/jls/jls-14>) {`;` [Resource](<#/doc/jls/jls-14>)} 

Resource:

[LocalVariableDeclaration](<#/doc/jls/jls-14>)   
[VariableAccess](<#/doc/jls/jls-14>)

VariableAccess:

[ExpressionName](<#/doc/jls/jls-06>)   
[FieldAccess](<#/doc/jls/jls-15>)

As seguintes produções de [§4.3](<#/doc/jls/jls-04>), [§8.3](<#/doc/jls/jls-08>), [§8.4.1](<#/doc/jls/jls-08>) e [§14.4](<#/doc/jls/jls-14>) são mostradas aqui para conveniência:

LocalVariableDeclaration:

{[VariableModifier](<#/doc/jls/jls-08>)} [LocalVariableType](<#/doc/jls/jls-14>) [VariableDeclaratorList](<#/doc/jls/jls-08>)

VariableModifier:

[Annotation](<#/doc/jls/jls-09>)   
`final`

LocalVariableType:

[UnannType](<#/doc/jls/jls-08>)   
`var`

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

Veja [§8.3](<#/doc/jls/jls-08>) para _UnannType_.

A _especificação de recurso_ denota os recursos da instrução `try`-with-resources, seja declarando variáveis locais com expressões inicializadoras ou referenciando variáveis existentes. Uma variável existente é referenciada por um nome de expressão ([§6.5.6](<#/doc/jls/jls-06>)) ou uma expressão de acesso a campo ([§15.11](<#/doc/jls/jls-15>)).

As regras para uma variável local declarada em uma especificação de recurso são especificadas em [§14.4](<#/doc/jls/jls-14>). Além disso, todas as seguintes condições devem ser verdadeiras, ou ocorre um erro em tempo de compilação:

  * A _VariableDeclaratorList_ consiste em um único _VariableDeclarator_.

  * O _VariableDeclarator_ tem um inicializador.

  * O _VariableDeclaratorId_ não tem pares de colchetes.

O escopo e o sombreamento de uma variável local declarada em uma especificação de recurso são especificados em [§6.3](<#/doc/jls/jls-06>) e [§6.4](<#/doc/jls/jls-06>).

Referências à variável local de uma classe ou interface aninhada, ou de uma expressão lambda, são restritas, conforme especificado em [§6.5.6.1](<#/doc/jls/jls-06>).

O tipo de uma variável local declarada em uma especificação de recurso é especificado em [§14.4.1](<#/doc/jls/jls-14>).

O tipo de uma variável local declarada em uma especificação de recurso, ou o tipo de uma variável existente referenciada em uma especificação de recurso, deve ser um subtipo de `AutoCloseable`, ou ocorre um erro em tempo de compilação.

É um erro em tempo de compilação para uma especificação de recurso declarar duas variáveis locais com o mesmo nome.

Note que uma especificação de recurso pode declarar mais de uma variável local sem nome ([§6.1](<#/doc/jls/jls-06>)).

Recursos são `final`, no sentido de que:

  * Uma variável local declarada em uma especificação de recurso é implicitamente declarada `final` se não for explicitamente declarada `final` ([§4.12.4](<#/doc/jls/jls-04>)).

  * Uma variável existente referenciada em uma especificação de recurso deve ser uma variável `final` ou efetivamente `final` que é definitivamente atribuída antes da instrução `try`-with-resources ([§16 (_Atribuição Definida_)](<#/doc/jls/jls-16>)), ou ocorre um erro em tempo de compilação.

Os recursos são inicializados da esquerda para a direita. Se um recurso falhar na inicialização (ou seja, sua expressão inicializadora lançar uma exceção), todos os recursos inicializados até então pela instrução `try`-with-resources são fechados. Se todos os recursos inicializarem com sucesso, o bloco `try` é executado normalmente e então todos os recursos não-nulos da instrução `try`-with-resources são fechados.

Os recursos são fechados na ordem inversa daquela em que foram inicializados. Um recurso é fechado apenas se foi inicializado para um valor não-nulo. Uma exceção do fechamento de um recurso não impede o fechamento de outros recursos. Tal exceção é _suprimida_ se uma exceção foi lançada anteriormente por um inicializador, o bloco `try`, ou o fechamento de um recurso.

Uma instrução `try`-with-resources cuja especificação de recurso indica múltiplos recursos é tratada como se fossem múltiplas instruções `try`-with-resources, cada uma das quais tem uma especificação de recurso que indica um único recurso. Quando uma instrução `try`-with-resources com _n_ recursos (_n_ > 1) é traduzida, o resultado é uma instrução `try`-with-resources com _n_ -1 recursos. Após _n_ tais traduções, há _n_ instruções `try`-`catch`-`finally` aninhadas, e a tradução geral é completa.

#### 14.20.3.1. `try`-with-resources Básico

Uma instrução `try`-with-resources sem cláusulas `catch` ou cláusula `finally` é chamada de instrução _`try`-with-resources básico_.

Se uma instrução `try`-with-resources básica for da forma:
```java
    try (VariableAccess ...)
        _Block_
    
```

então o recurso é primeiro convertido em uma declaração de variável local pela seguinte tradução:
```java
    try (T #r = VariableAccess ...) {
        _Block_
    }
    
```

`T` é o tipo da variável denotada por _VariableAccess_ e `#r` é um identificador gerado automaticamente que é distinto de quaisquer outros identificadores (gerados automaticamente ou não) que estão no escopo no ponto onde a instrução `try`-with-resources ocorre. A instrução `try`-with-resources é então traduzida de acordo com o restante desta seção.

O significado de uma instrução `try`-with-resources básica da forma:
```java
    try (_{VariableModifier} R VariableDeclaratorId_ = _Expression_ ...)
        _Block_
    
```

é dado pela seguinte tradução para uma declaração de variável local e uma instrução `try`-`catch`-`finally`:
```java
    {
        final _{VariableModifierNoFinal} R Identifier_ = _Expression_ ;
        Throwable #primaryExc = null;
    
        try _ResourceSpecification_tail_
            _Block_
        catch (Throwable #t) {
            #primaryExc = #t;
            throw #t;
        } finally {
            if (_Identifier_ != null) {
                if (#primaryExc != null) {
                    try {
                        _Identifier_.close();
                    } catch (Throwable #suppressedExc) {
                        #primaryExc.addSuppressed(#suppressedExc);
                    }
                } else {
                    _Identifier_.close();
                }
            }
        }
    }
    
```

_{VariableModifierNoFinal}_ é definido como _{VariableModifier}_ sem `final`, se presente.

Se _VariableDeclaratorId_ for um identificador, então _Identifier_ é definido como esse identificador; caso contrário, _Identifier_ é definido como um identificador gerado automaticamente que é distinto de quaisquer outros identificadores (gerados automaticamente ou não) que estão no escopo no ponto onde a instrução `try`-with-resources ocorre.

`#t`, `#primaryExc` e `#suppressedExc` são identificadores gerados automaticamente que são distintos de quaisquer outros identificadores (gerados automaticamente ou não) que estão no escopo no ponto onde a instrução `try`-with-resources ocorre.

Se a especificação de recurso indicar um recurso, então _ResourceSpecification_tail_ está vazia (e a instrução `try`-`catch`-`finally` não é, por si só, uma instrução `try`-with-resources).

Se a especificação de recurso indicar _n_ > 1 recursos, então _ResourceSpecification_tail_ consiste nos 2º, 3º, ..., _n_-ésimos recursos indicados na especificação de recurso, na mesma ordem (e a instrução `try`-`catch`-`finally` é, por si só, uma instrução `try`-with-resources).

As regras de alcançabilidade e atribuição definida para a instrução `try`-with-resources básica são implicitamente especificadas pela tradução acima.

Em uma instrução `try`-with-resources básica que gerencia um único recurso:

  * Se a inicialização do recurso for concluída abruptamente devido a um `throw` de um valor `V`, então a instrução `try`-with-resources será concluída abruptamente devido a um `throw` do valor `V`.

  * Se a inicialização do recurso for concluída normalmente, e o bloco `try` for concluído abruptamente devido a um `throw` de um valor `V`, então:

    * Se o fechamento automático do recurso for concluído normalmente, então a instrução `try`-with-resources será concluída abruptamente devido a um `throw` do valor `V`.

    * Se o fechamento automático do recurso for concluído abruptamente devido a um `throw` de um valor `V2`, então a instrução `try`-with-resources será concluída abruptamente devido a um `throw` do valor `V`, com `V2` adicionado à lista de exceções suprimidas de `V`.

  * Se a inicialização do recurso for concluída normalmente, e o bloco `try` for concluído normalmente, e o fechamento automático do recurso for concluído abruptamente devido a um `throw` de um valor `V`, então a instrução `try`-with-resources será concluída abruptamente devido a um `throw` do valor `V`.

Em uma instrução `try`-with-resources básica que gerencia múltiplos recursos:

  * Se a inicialização de um recurso for concluída abruptamente devido a um `throw` de um valor `V`, então:

    * Se os fechamentos automáticos de todos os recursos inicializados com sucesso (possivelmente zero) forem concluídos normalmente, então a instrução `try`-with-resources será concluída abruptamente devido a um `throw` do valor `V`.

    * Se os fechamentos automáticos de todos os recursos inicializados com sucesso (possivelmente zero) forem concluídos abruptamente devido a `throw`s dos valores `V1`...`Vn`, então a instrução `try`-with-resources será concluída abruptamente devido a um `throw` do valor `V`, com quaisquer valores restantes `V1`...`Vn` adicionados à lista de exceções suprimidas de `V`.

  * Se a inicialização de todos os recursos for concluída normalmente, e o bloco `try` for concluído abruptamente devido a um `throw` de um valor `V`, então:

    * Se os fechamentos automáticos de todos os recursos inicializados forem concluídos normalmente, então a instrução `try`-with-resources será concluída abruptamente devido a um `throw` do valor `V`.

    * Se os fechamentos automáticos de um ou mais recursos inicializados forem concluídos abruptamente devido a `throw`s dos valores `V1`...`Vn`, então a instrução `try`-with-resources será concluída abruptamente devido a um `throw` do valor `V`, com quaisquer valores restantes `V1`...`Vn` adicionados à lista de exceções suprimidas de `V`.

  * Se a inicialização de cada recurso for concluída normalmente, e o bloco `try` for concluído normalmente, então:

    * Se um fechamento automático de um recurso inicializado for concluído abruptamente devido a um `throw` do valor `V`, e todos os outros fechamentos automáticos de recursos inicializados forem concluídos normalmente, então a instrução `try`-with-resources será concluída abruptamente devido a um `throw` do valor `V`.

    * Se mais de um fechamento automático de um recurso inicializado for concluído abruptamente devido a `throw`s dos valores `V1`...`Vn` (onde `V1` é a exceção do recurso mais à direita que falhou ao fechar e `Vn` é a exceção do recurso mais à esquerda que falhou ao fechar), então a instrução `try`-with-resources será concluída abruptamente devido a um `throw` do valor `V1`, com quaisquer valores restantes `V2`...`Vn` adicionados à lista de exceções suprimidas de `V1`.

#### 14.20.3.2. `try`-with-resources Estendido

Uma instrução `try`-with-resources com pelo menos uma cláusula `catch` e/ou uma cláusula `finally` é chamada de instrução _`try`-with-resources estendido_.

O significado de uma instrução `try`-with-resources estendida:
```java
    try _ResourceSpecification_
        _Block_
    _[Catches]_
    _[Finally]_
    
```

é dado pela seguinte tradução para uma instrução `try`-with-resources básica aninhada dentro de uma instrução `try`-`catch` ou `try`-`finally` ou `try`-`catch`-`finally`:
```java
    try {
        try _ResourceSpecification_
            Block
    }
    _[Catches]_
    _[Finally]_
    
```

O efeito da tradução é colocar a especificação de recurso "dentro" da instrução `try`. Isso permite que uma cláusula `catch` de uma instrução `try`-with-resources estendida capture uma exceção devido à inicialização ou fechamento automático de qualquer recurso.

Além disso, todos os recursos terão sido fechados (ou tentados a serem fechados) no momento em que o bloco `finally` for executado, em conformidade com a intenção da palavra-chave `finally`.
## 14.21. A Instrução `yield`

Uma instrução `yield` transfere o controle fazendo com que uma expressão `switch` envolvente ([§15.28](<#/doc/jls/jls-15>)) produza um valor especificado.

YieldStatement:

`yield` [Expression](<#/doc/jls/jls-15>) `;`

Uma instrução `yield` tenta transferir o controle para a expressão `switch` envolvente mais interna; esta expressão envolvente, que é chamada de _alvo de yield_ , então completa imediatamente normalmente e o valor da _Expression_ se torna o valor da expressão `switch`.

É um erro em tempo de compilação se uma instrução `yield` não tiver um alvo de yield.

É um erro em tempo de compilação se o alvo de yield contiver qualquer método, construtor, inicializador de instância, inicializador estático ou expressão lambda que envolva a instrução `yield`. Ou seja, não há saltos não locais.

É um erro em tempo de compilação se a _Expression_ de uma instrução `yield` for void ([§15.1](<#/doc/jls/jls-15>)).

A execução de uma instrução `yield` primeiro avalia a _Expression_. Se a avaliação da _Expression_ for concluída abruptamente por algum motivo, então a instrução `yield` será concluída abruptamente por esse motivo. Se a avaliação da _Expression_ for concluída normalmente, produzindo um valor `V`, então a instrução `yield` será concluída abruptamente, sendo o motivo um yield com valor `V`.

Pode-se ver, então, que uma instrução `yield` sempre é concluída abruptamente.

**Exemplo 14.21-1. A Instrução `yield`

No exemplo a seguir, uma instrução `yield` é usada para produzir um valor para a expressão `switch` envolvente.
```
    class Test {
        enum Day {
            MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY,
            SATURDAY, SUNDAY
        }
    
        public int calculate(Day d) {
            return switch (d) {
                case SATURDAY, SUNDAY -> d.ordinal();
                default -> {
                    int len = d.toString().length();
                    yield len*len;
                }
            };
        }
    }
    
```

## 14.22. Instruções Inalcançáveis

É um erro em tempo de compilação se uma instrução não puder ser executada porque é _inalcançável_.

Esta seção é dedicada a uma explicação precisa da palavra "alcançável". A ideia é que deve haver algum caminho de execução possível desde o início do construtor, método, inicializador de instância ou inicializador estático que contém a instrução até a própria instrução. A análise leva em consideração a estrutura das instruções. Exceto pelo tratamento especial das instruções `while`, `do` e `for` cuja expressão de condição tem o valor constante `true`, os valores das expressões não são levados em consideração na análise de fluxo.

Por exemplo, um compilador Java aceitará o código:
```
    {
        int n = 5;
        while (n > 7) k = 2;
    }
    
```

mesmo que o valor de `n` seja conhecido em tempo de compilação e, em princípio, possa ser conhecido em tempo de compilação que a atribuição a `k` nunca poderá ser executada.

As regras nesta seção definem dois termos técnicos:

  * se uma instrução é _alcançável_

  * se uma instrução _pode ser concluída normalmente_

As regras permitem que uma instrução seja concluída normalmente apenas se for alcançável.

Dois termos técnicos adicionais são usados:

  * Uma instrução `break` alcançável _sai de uma instrução_ se, dentro do alvo do break, não houver instruções `try` cujos blocos `try` contenham a instrução `break`, ou houver instruções `try` cujos blocos `try` contenham a instrução `break` e todas as cláusulas `finally` dessas instruções `try` puderem ser concluídas normalmente.

Esta definição é baseada na lógica em torno de "tentativas de transferir o controle" em [§14.15](<#/doc/jls/jls-14>).

  * Uma instrução `continue` _continua uma instrução `do`_ se, dentro da instrução `do`, não houver instruções `try` cujos blocos `try` contenham a instrução `continue`, ou houver instruções `try` cujos blocos `try` contenham a instrução `continue` e todas as cláusulas `finally` dessas instruções `try` puderem ser concluídas normalmente.

As regras são as seguintes:

  * O bloco que é o corpo de um construtor, método, inicializador de instância, inicializador estático, expressão lambda ou expressão `switch` é alcançável.

  * Um bloco vazio que não é um bloco `switch` pode ser concluído normalmente se e somente se for alcançável.

Um bloco não vazio que não é um bloco `switch` ou um corpo de construtor contendo uma invocação de construtor pode ser concluído normalmente se e somente se a última instrução nele puder ser concluída normalmente.

A primeira instrução em um bloco não vazio que não é um bloco `switch` ou um corpo de construtor contendo uma invocação de construtor é alcançável se e somente se o bloco for alcançável.

Qualquer outra instrução `S` em um bloco não vazio que não é um bloco `switch` ou um corpo de construtor contendo uma invocação de construtor é alcançável se e somente se a instrução que precede `S` puder ser concluída normalmente.

  * Um bloco não vazio que é o corpo de um construtor contendo uma invocação de construtor pode ser concluído normalmente se e somente se a última instrução nele puder ser concluída normalmente.

A primeira instrução em um prólogo não vazio de um corpo de construtor contendo uma invocação de construtor é alcançável se e somente se o bloco for alcançável.

Qualquer outra instrução S no prólogo de um corpo de construtor contendo uma invocação de construtor é alcançável se e somente se a instrução que precede S puder ser concluída normalmente.

A primeira instrução em um epílogo não vazio de um construtor contendo uma invocação de construtor e um prólogo vazio é alcançável se e somente se o bloco for alcançável.

A primeira instrução em um epílogo não vazio de um construtor contendo uma invocação de construtor e um prólogo não vazio é alcançável se e somente se a última instrução do prólogo do construtor puder ser concluída normalmente.

Qualquer outra instrução S no epílogo de um construtor contendo uma invocação de construtor é alcançável se e somente se a instrução que precede S puder ser concluída normalmente.

  * Uma instrução de declaração de classe local pode ser concluída normalmente se e somente se for alcançável.

  * Uma instrução de declaração de variável local pode ser concluída normalmente se e somente se for alcançável.

  * Uma instrução vazia pode ser concluída normalmente se e somente se for alcançável.

  * Uma instrução rotulada pode ser concluída normalmente se pelo menos uma das seguintes condições for verdadeira:

    * A instrução contida pode ser concluída normalmente.

    * Existe uma instrução `break` alcançável que sai da instrução rotulada.

A instrução contida é alcançável se e somente se a instrução rotulada for alcançável.

  * Uma instrução de expressão pode ser concluída normalmente se e somente se for alcançável.

  * Uma instrução `if`-`then` pode ser concluída normalmente se e somente se for alcançável.

A instrução `then` é alcançável se e somente se a instrução `if`-`then` for alcançável.

Uma instrução `if`-`then`-`else` pode ser concluída normalmente se e somente se a instrução `then` puder ser concluída normalmente ou a instrução `else` puder ser concluída normalmente.

A instrução `then` é alcançável se e somente se a instrução `if`-`then`-`else` for alcançável.

A instrução `else` é alcançável se e somente se a instrução `if`-`then`-`else` for alcançável.

Este tratamento de uma instrução `if`, tenha ela uma parte `else` ou não, é bastante incomum. A justificativa é dada no final desta seção.

  * Uma instrução `assert` pode ser concluída normalmente se e somente se for alcançável.

  * Uma instrução `switch` cujo bloco `switch` é vazio, ou contém apenas rótulos `switch`, pode ser concluída normalmente.

  * Uma instrução `switch` _cujo bloco `switch` consiste em grupos de instruções rotuladas `switch`_ pode ser concluída normalmente se pelo menos uma das seguintes condições for verdadeira:

    * A última instrução no bloco `switch` pode ser concluída normalmente.

    * Existe pelo menos um rótulo `switch` após o último grupo de instruções do bloco `switch`.

    * Existe uma instrução `break` alcançável que sai da instrução `switch`.

    * A instrução `switch` não é aprimorada ([§14.11.2](<#/doc/jls/jls-14>)) e seu bloco `switch` não contém um rótulo `default`.

  * Uma instrução `switch` _cujo bloco `switch` consiste em regras `switch`_ pode ser concluída normalmente se pelo menos uma das seguintes condições for verdadeira:

    * Uma das regras `switch` introduz uma expressão de regra `switch` (que é necessariamente uma expressão de instrução).

    * Uma das regras `switch` introduz um bloco de regra `switch` que pode ser concluído normalmente.

    * Uma das regras `switch` introduz um bloco de regra `switch` que contém uma instrução `break` alcançável que sai da instrução `switch`.

    * A instrução `switch` não é aprimorada ([§14.11.2](<#/doc/jls/jls-14>)) e seu bloco `switch` não contém um rótulo `default`.

  * Um bloco `switch` é alcançável se e somente se sua instrução `switch` for alcançável.

  * Uma instrução em um bloco `switch` _que consiste em grupos de instruções rotuladas `switch`_ é alcançável se e somente se o bloco `switch` for alcançável e pelo menos uma das seguintes condições for verdadeira:

    * Ela possui um rótulo `case` ou `default`.

    * Existe uma instrução que a precede no bloco `switch` e essa instrução precedente pode ser concluída normalmente.

  * Um bloco de regra `switch` em um bloco `switch` é alcançável se e somente se o bloco `switch` for alcançável.

  * Uma instrução `throw` de regra `switch` em um bloco `switch` é alcançável se e somente se o bloco `switch` for alcançável.

  * Uma instrução `while` pode ser concluída normalmente se pelo menos uma das seguintes condições for verdadeira:

    * A instrução `while` é alcançável e a expressão de condição não é uma expressão constante ([§15.29](<#/doc/jls/jls-15>)) com valor `true`.

    * Existe uma instrução `break` alcançável que sai da instrução `while`.

A instrução contida é alcançável se e somente se a instrução `while` for alcançável e a expressão de condição não for uma expressão constante cujo valor seja `false`.

  * Uma instrução `do` pode ser concluída normalmente se pelo menos uma das seguintes condições for verdadeira:

    * A instrução contida pode ser concluída normalmente e a expressão de condição não é uma expressão constante ([§15.29](<#/doc/jls/jls-15>)) com valor `true`.

    * A instrução `do` contém uma instrução `continue` alcançável sem rótulo, e a instrução `do` é a instrução `while`, `do` ou `for` mais interna que contém essa instrução `continue`, e a instrução `continue` continua essa instrução `do`, e a expressão de condição não é uma expressão constante com valor `true`.

    * A instrução `do` contém uma instrução `continue` alcançável com rótulo `L`, e a instrução `do` tem o rótulo `L`, e a instrução `continue` continua essa instrução `do`, e a expressão de condição não é uma expressão constante com valor `true`.

    * Existe uma instrução `break` alcançável que sai da instrução `do`.

A instrução contida é alcançável se e somente se a instrução `do` for alcançável.

  * Uma instrução `for` básica pode ser concluída normalmente se pelo menos uma das seguintes condições for verdadeira:

    * A instrução `for` é alcançável, existe uma expressão de condição, e a expressão de condição não é uma expressão constante ([§15.29](<#/doc/jls/jls-15>)) com valor `true`.

    * Existe uma instrução `break` alcançável que sai da instrução `for`.

A instrução contida é alcançável se e somente se a instrução `for` for alcançável e a expressão de condição não for uma expressão constante cujo valor seja `false`.

  * Uma instrução `for` aprimorada pode ser concluída normalmente se e somente se for alcançável.

  * Uma instrução `break`, `continue`, `return`, `throw` ou `yield` não pode ser concluída normalmente.

  * Uma instrução `synchronized` pode ser concluída normalmente se e somente se a instrução contida puder ser concluída normalmente.

A instrução contida é alcançável se e somente se a instrução `synchronized` for alcançável.

  * Uma instrução `try` pode ser concluída normalmente se ambas as seguintes condições forem verdadeiras:

    * O bloco `try` pode ser concluído normalmente ou qualquer bloco `catch` pode ser concluído normalmente.

    * Se a instrução `try` tiver um bloco `finally`, então o bloco `finally` pode ser concluído normalmente.

  * O bloco `try` é alcançável se e somente se a instrução `try` for alcançável.

  * Um bloco `catch` `C` é alcançável se e somente se ambas as seguintes condições forem verdadeiras:

    * Ou o tipo do parâmetro de `C` é um tipo de exceção não verificada ou `Exception` ou uma superclasse de `Exception`, ou alguma expressão ou instrução `throw` no bloco `try` é alcançável e pode lançar uma exceção verificada cujo tipo é compatível por atribuição ([§5.2](<#/doc/jls/jls-05>)) com o tipo do parâmetro de `C`. (Uma expressão é alcançável se e somente se a instrução mais interna que a contém for alcançável.)

Consulte [§15.6](<#/doc/jls/jls-15>) para conclusão normal e abrupta de expressões.

    * Não há um bloco `catch` `A` anterior na instrução `try` tal que o tipo do parâmetro de `C` seja o mesmo que, ou uma subclasse de, o tipo do parâmetro de `A`.

  * O _Block_ de um bloco `catch` é alcançável se e somente se o bloco `catch` for alcançável.

  * Se um bloco `finally` estiver presente, ele é alcançável se e somente se a instrução `try` for alcançável.

Poder-se-ia _esperar_ que a instrução `if` fosse tratada da seguinte maneira:

  * Uma instrução `if`-`then` pode ser concluída normalmente se pelo menos uma das seguintes condições for verdadeira:

    * A instrução `if`-`then` é alcançável e a expressão de condição não é uma expressão constante cujo valor é `true`.

    * A instrução `then` pode ser concluída normalmente.

A instrução `then` é alcançável se e somente se a instrução `if`-`then` for alcançável e a expressão de condição não for uma expressão constante cujo valor seja `false`.

  * Uma instrução `if`-`then`-`else` pode ser concluída normalmente se e somente se a instrução `then` puder ser concluída normalmente ou a instrução `else` puder ser concluída normalmente.

A instrução `then` é alcançável se e somente se a instrução `if`-`then`-`else` for alcançável e a expressão de condição não for uma expressão constante cujo valor seja `false`.

A instrução `else` é alcançável se e somente se a instrução `if`-`then`-`else` for alcançável e a expressão de condição não for uma expressão constante cujo valor seja `true`.

Esta abordagem seria consistente com o tratamento de outras estruturas de controle. No entanto, para permitir que a instrução `if` seja usada convenientemente para fins de "compilação condicional", as regras reais diferem.

Como exemplo, a seguinte instrução resulta em um erro em tempo de compilação:
```
    while (false) { x=3; }
    
```

porque a instrução `x=3;` não é alcançável; mas o caso superficialmente similar:
```
    if (false) { x=3; }
    
```

não resulta em um erro em tempo de compilação. Um compilador otimizador pode perceber que a instrução `x=3;` nunca será executada e pode optar por omitir o código para essa instrução do arquivo `class` gerado, mas a instrução `x=3;` não é considerada "inalcançável" no sentido técnico especificado aqui.

A justificativa para este tratamento diferenciado é permitir que os programadores definam variáveis "flag" como:
```
    static final boolean DEBUG = false;
    
```

e então escrevam código como:
```
    if (DEBUG) { x=3; }
    
```

A ideia é que deve ser possível alterar o valor de `DEBUG` de `false` para `true` ou de `true` para `false` e então compilar o código corretamente sem outras alterações no texto do programa.

A compilação condicional vem com uma ressalva. Se um conjunto de classes que usam uma variável "flag" - ou mais precisamente, qualquer variável constante `static` ([§4.12.4](<#/doc/jls/jls-04>)) - for compilado e o código condicional for omitido, não basta posteriormente distribuir apenas uma nova versão da classe ou interface que contém a definição da flag. As classes que usam a flag não verão seu novo valor, então seu comportamento pode ser surpreendente. Em essência, uma mudança no valor de uma flag é binariamente compatível com binários pré-existentes (nenhum `LinkageError` ocorre), mas não é comportamentalmente compatível.

Outra razão para "inlining" de valores de variáveis constantes `static` é devido às instruções `switch`. Elas são o único tipo de instrução que depende de expressões constantes, ou seja, que cada rótulo `case` de uma instrução `switch` deve ser uma expressão constante cujo valor é diferente de todos os outros rótulos `case`. Os rótulos `case` são frequentemente referências a variáveis constantes `static`, então pode não ser imediatamente óbvio que todos os rótulos têm valores diferentes. Se for provado que não há rótulos duplicados em tempo de compilação, então o inlining dos valores no arquivo `class` garante que não haverá rótulos duplicados em tempo de execução também - uma propriedade muito desejável.

**Exemplo 14.22-1. Compilação Condicional**

Se o exemplo:
```
    class Flags { static final boolean DEBUG = true; }
    class Test {
        public static void main(String[] args) {
            if (Flags.DEBUG)
                System.out.println("DEBUG is true");
        }
    }
    
```

for compilado e executado, ele produz a saída:
```
    DEBUG is true
    
```

Suponha que uma nova versão da classe `Flags` seja produzida:
```
    class Flags { static final boolean DEBUG = false; }
    
```

Se `Flags` for recompilado, mas `Test` não, então executar o novo binário com o binário existente de `Test` produz a saída:
```
    DEBUG is true
    
```

porque `DEBUG` é uma variável constante `static`, então seu valor poderia ter sido usado na compilação de `Test` sem fazer uma referência à classe `Flags`.

Este comportamento também ocorreria se `Flags` fosse uma interface, como no exemplo modificado:
```
    interface Flags { boolean DEBUG = true; }
    class Test {
        public static void main(String[] args) {
            if (Flags.DEBUG)
                System.out.println("DEBUG is true");
        }
    }
    
```

De fato, como os campos de interfaces são sempre `static` e `final`, recomendamos que apenas expressões constantes sejam atribuídas a campos de interfaces. Observamos, mas não recomendamos, que se um campo de tipo primitivo de uma interface puder mudar, seu valor pode ser expresso idiomaticamente como em:
```
    interface Flags {
        boolean debug = Boolean.valueOf(true).booleanValue();
    }
    
```

garantindo que este valor não seja uma expressão constante. Idiomas semelhantes existem para os outros tipos primitivos.
## 14.30. Padrões

Um _padrão_ descreve um teste que pode ser realizado em um valor. Padrões aparecem como operandos de instruções e expressões, que fornecem os valores a serem testados. Padrões declaram zero ou mais variáveis locais, também conhecidas como variáveis de padrão.

O processo de testar um valor contra um padrão é conhecido como _casamento de padrões_. Se um valor casa com sucesso com um padrão, então o processo de casamento de padrões inicializa as variáveis de padrão, se houver, declaradas pelo padrão.

Variáveis de padrão estão em escopo ([§6.3](<#/doc/jls/jls-06>)) apenas onde o casamento de padrões é bem-sucedido e, assim, as variáveis de padrão terão sido inicializadas. Não é possível usar uma variável de padrão que não tenha sido inicializada.

### 14.30.1. Tipos de Padrões

Um _padrão de tipo_ é usado para testar se um valor é uma instância do tipo que aparece no padrão. Um _padrão de record_ é usado para testar se um valor é uma instância de um tipo de classe record e, se for, para realizar recursivamente o casamento de padrões nos valores dos componentes do record.

Pattern:

[TypePattern](<#/doc/jls/jls-14>)   
[RecordPattern](<#/doc/jls/jls-14>)

TypePattern:

[LocalVariableDeclaration](<#/doc/jls/jls-14>)

RecordPattern:

[ReferenceType](<#/doc/jls/jls-04>) `(` [[ComponentPatternList](<#/doc/jls/jls-14>)] `)`

ComponentPatternList:

[ComponentPattern](<#/doc/jls/jls-14>) {`,` [ComponentPattern](<#/doc/jls/jls-14>) } 

ComponentPattern:

[Pattern](<#/doc/jls/jls-14>)   
[MatchAllPattern](<#/doc/jls/jls-14>)

MatchAllPattern:

`_`

As seguintes produções de [§4.3](<#/doc/jls/jls-04>), [§8.3](<#/doc/jls/jls-08>), [§8.4.1](<#/doc/jls/jls-08>) e [§14.4](<#/doc/jls/jls-14>) são mostradas aqui por conveniência:

LocalVariableDeclaration:

{[VariableModifier](<#/doc/jls/jls-08>)} [LocalVariableType](<#/doc/jls/jls-14>) [VariableDeclaratorList](<#/doc/jls/jls-08>)

VariableModifier:

[Annotation](<#/doc/jls/jls-09>)   
`final`

LocalVariableType:

[UnannType](<#/doc/jls/jls-08>)   
`var`

VariableDeclaratorList:

[VariableDeclarator](<#/doc/jls/jls-08>) {`,` [VariableDeclarator](<#/doc/jls/jls-08>)} 

VariableDeclarator:

[VariableDeclaratorId](<#/doc/jls/jls-08>) [`=` [VariableInitializer](<#/doc/jls/jls-08>)] 

VariableDeclaratorId:

[Identifier](<#/doc/jls/jls-03>) [[Dims](<#/doc/jls/jls-04>)]   
`_`

Dims:

{[Annotation](<#/doc/jls/jls-09>)} `[` `]` {{[Annotation](<#/doc/jls/jls-09>)} `[` `]`} 

Veja [§8.3](<#/doc/jls/jls-08>) para _UnannType_.

Um padrão é _aninhado_ em um padrão de record se (1) ele aparece diretamente na lista de padrões de componente do padrão de record, ou (2) ele está aninhado em um padrão de record que aparece diretamente na lista de padrões de componente do padrão de record. Um padrão é _de nível superior_ se não estiver aninhado em um padrão de record.

Um padrão de tipo declara uma variável local, conhecida como variável de padrão. Se a declaração incluir um identificador, isso especifica o nome da variável de padrão; caso contrário, a variável de padrão é chamada de _variável de padrão sem nome_.

As regras para uma variável local declarada em um padrão de tipo são especificadas em [§14.4](<#/doc/jls/jls-14>). Além disso, todas as seguintes condições devem ser verdadeiras, ou ocorre um erro em tempo de compilação:

  * O _LocalVariableType_ em um padrão de tipo de nível superior denota um tipo de referência (e, além disso, não é `var`). 

  * O _VariableDeclaratorList_ consiste em um único _VariableDeclarator_. 

  * O _VariableDeclarator_ não possui inicializador. 

  * O _VariableDeclaratorId_ não possui pares de colchetes. 

O tipo de uma variável de padrão declarada em um padrão de tipo de nível superior é o tipo de referência denotado por _LocalVariableType_.

O tipo de uma variável de padrão declarada em um padrão de tipo aninhado é determinado da seguinte forma:

  * Se o _LocalVariableType_ for _UnannType_, então o tipo da variável de padrão é denotado por _UnannType_. 

  * Se o _LocalVariableType_ for `var`, então o padrão de tipo deve aparecer diretamente na lista de padrões de componente de um padrão de record, ou ocorre um erro em tempo de compilação. 

Seja R o tipo do padrão de record, e seja T o tipo do campo de componente correspondente em R ([§8.10.3](<#/doc/jls/jls-08>)). O tipo da variável de padrão é a projeção ascendente de T em relação a todas as variáveis de tipo sintéticas mencionadas por T.

Considere a seguinte declaração de uma classe record: 
`record R&lt;T&gt;(ArrayList&lt;T&gt; a){}
            
```

Dado o padrão de record `R`<`String`>`(var b)`, o tipo da variável de padrão `b` é `ArrayList`<`String`>. 

Um padrão de tipo é considerado _compatível com nulo_ se ele aparece diretamente na lista de padrões de componente de um padrão de record com tipo R, onde o componente de record correspondente de R tem tipo U, e o padrão de tipo é incondicional para o tipo U (§14.30.3).

Note que esta propriedade de tempo de compilação dos padrões de tipo é usada no processo de tempo de execução de casamento de padrões (§14.30.2), então ela é associada ao padrão de tipo para uso em tempo de execução.

Um padrão de record consiste em um _ReferenceType_ e uma lista de padrões de componente contendo padrões de componente, se houver. Se _ReferenceType_ não for um tipo de classe record (§8.10), então ocorre um erro em tempo de compilação.

Se o _ReferenceType_ for um tipo bruto, então o tipo do padrão de record é inferido, conforme descrito em §18.5.5. É um erro em tempo de compilação se nenhum tipo puder ser inferido para o padrão de record.

Se o _ReferenceType_ (ou qualquer parte dele) for anotado, então ocorre um erro em tempo de compilação.

Versões futuras da Linguagem de Programação Java podem remover esta restrição sobre anotações.

Caso contrário, o tipo do padrão de record é _ReferenceType_.

O comprimento da lista de padrões de componente do padrão de record deve ser o mesmo que o comprimento da lista de componentes de record na declaração da classe record nomeada por _ReferenceType_, caso contrário, ocorre um erro em tempo de compilação.

Um padrão de record não declara diretamente nenhuma variável de padrão, mas pode conter declarações de variáveis de padrão na lista de padrões de componente.

É um erro em tempo de compilação se um padrão de record contiver mais de uma declaração de uma variável de padrão com o mesmo nome.

O _padrão curinga_ é um padrão especial que não declara variáveis de padrão e só pode aparecer diretamente na lista de padrões de componente de um padrão de record `r`.

Seja R o tipo do padrão de record `r`, e seja T o tipo do campo de componente correspondente em R (§8.10.3). O tipo do padrão curinga é a projeção ascendente de T em relação a todas as variáveis de tipo sintéticas mencionadas por T.

Pode-se observar que um padrão curinga é equivalente a um padrão de tipo aninhado que declara uma variável de padrão _sem nome_ e cujo _LocalVariableType_ é `var`.

### 14.30.2. Casamento de Padrões

_Casamento de padrões_ é o processo de testar um valor contra um padrão em tempo de execução. O casamento de padrões é distinto da execução de instruções (§14.1) e da avaliação de expressões (§15.1). Se um valor casa com sucesso com um padrão, então o processo de casamento de padrões inicializará todas as variáveis de padrão declaradas pelo padrão, se houver.

O processo de casamento de padrões pode envolver avaliação de expressão ou execução de instrução. Consequentemente, o casamento de padrões é considerado _concluído abruptamente_ se a avaliação de uma expressão ou a execução de uma instrução for concluída abruptamente. Uma conclusão abrupta sempre tem uma razão associada, que é sempre um `throw` com um determinado valor. O casamento de padrões é considerado _concluído normalmente_ se não for concluído abruptamente.

As regras para determinar se um valor casa com um padrão e para inicializar variáveis de padrão são as seguintes:

  * A referência nula _casa_ com um padrão de tipo se o padrão de tipo for compatível com nulo (§14.30.1); e _não casa_ caso contrário. 

Se a referência nula casar, então a variável de padrão declarada pelo padrão de tipo é inicializada com a referência nula.

Se a referência nula não casar, então a variável de padrão declarada pelo padrão de tipo não é inicializada.

  * Um valor `v` que não é a referência nula _casa_ com um padrão de tipo T se `v` puder ser convertido por conversão de teste (§5.7) para o tipo de destino T sem levantar uma `ClassCastException`; e _não casa_ caso contrário. 

Se `v` casar, então a variável de padrão declarada pelo padrão de tipo é inicializada com `v`.

Se `v` não casar, então a variável de padrão declarada pelo padrão de tipo não é inicializada.

  * A referência nula _não casa_ com um padrão de record. 

Neste caso, quaisquer variáveis de padrão que apareçam em declarações contidas no padrão de record não são inicializadas.

  * Um valor `v` que não é a referência nula _casa_ com um padrão de record com tipo R e lista de padrões de componente `L` se (i) `v` puder ser convertido por conversão de teste (§5.7) para o tipo de destino R sem levantar uma `ClassCastException`; e (ii) cada componente de record de `v` casar com o padrão de componente correspondente em `L`; e _não casa_ caso contrário. 

Cada componente de record de `v` é determinado invocando o método acessor de `v` correspondente a esse componente. Se a execução da invocação do método acessor for concluída abruptamente pela razão S, então o casamento de padrões é concluído abruptamente lançando uma `MatchException` com a causa S.

Uma variável de padrão declarada por um padrão que aparece na lista de padrões de componente de um padrão de record é inicializada somente se _todos_ os padrões na lista casarem.

  * Todo valor _casa_ com um padrão curinga. 

### 14.30.3. Propriedades de Padrões

Um padrão `p` é considerado _aplicável_ a um tipo T se uma das seguintes regras se aplicar:

  * Um padrão de tipo que declara uma variável de padrão de um tipo de referência U é aplicável a um tipo de referência T se houver uma conversão de teste (§5.7) do tipo T para o tipo U. 

  * Um padrão de tipo que declara uma variável de padrão de um tipo primitivo P é aplicável ao tipo P. 

  * Um padrão de record com tipo R e lista de padrões `L` é aplicável ao tipo T se (i) houver uma conversão de teste (§5.7) do tipo T para o tipo R, e (ii) para cada padrão de componente `p` que aparece em `L`, se houver, `p` for aplicável ao tipo do campo de componente correspondente em R. 

  * Um padrão curinga é aplicável a todo tipo T. 

Um padrão `p` é considerado _incondicional_ para um tipo T se puder ser determinado em tempo de compilação que todo valor do tipo T casará com `p`, e assim o aspecto de teste em tempo de execução do casamento de padrões poderia ser omitido. Ele é definido da seguinte forma:

  * Um padrão de tipo que declara uma variável de padrão de um tipo de referência S é incondicional para um tipo de referência T se o apagamento de T for um subtipo do apagamento de S. 

  * Um padrão de tipo que declara uma variável de padrão de um tipo primitivo P é incondicional para o tipo P. 

  * Um padrão curinga é incondicional para todo tipo T. 

Note que nenhum padrão de record é incondicional porque a referência nula não casa com nenhum padrão de record.

Um padrão `p` é considerado _dominar_ outro padrão `q` se todo valor que casa com `q` também casar com `p`, e é definido da seguinte forma:

  * Um padrão `p` domina um padrão de tipo que declara uma variável de padrão do tipo T se `p` for incondicional para T. 

  * Um padrão `p` domina um padrão de record com tipo R se `p` for incondicional para R. 

  * Um padrão de record com tipo R e lista de padrões de componente `L` domina outro padrão de record com tipo S e lista de padrões de componente `M` se (i) R e S nomeiam a mesma classe record, e (ii) cada padrão de componente, se houver, em `L` dominar o padrão de componente correspondente em `M`. 

  * Um padrão `p` domina um padrão curinga com tipo T se `p` for incondicional para T. 

* * *

Anterior | | Próximo
---|---|---
Capítulo 13. Compatibilidade Binária | Início | Capítulo 15. Expressões

* * *

 Aviso Legal 