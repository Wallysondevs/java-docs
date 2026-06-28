# Gramáticas

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Especificações Java SE](<#/>) > [Especificação da Linguagem Java](<#/doc/jls/jls-01>)

Capítulo 2. Gramáticas
---
[Anterior](<#/doc/jls/jls-01>) | | [Próximo](<#/doc/jls/jls-03>)
* * *

# Capítulo 2. Gramáticas

**Sumário**

[2.1. Gramáticas Livres de Contexto](<#/doc/jls/jls-02>)
[2.2. A Gramática Léxica](<#/doc/jls/jls-02>)
[2.3. A Gramática Sintática](<#/doc/jls/jls-02>)
[2.4. Notação da Gramática](<#/doc/jls/jls-02>)

Este capítulo descreve as gramáticas livres de contexto usadas nesta especificação para definir a estrutura léxica e sintática de um programa.

## 2.1. Gramáticas Livres de Contexto

Uma _gramática livre de contexto_ consiste em um número de _produções_. Cada produção tem um símbolo abstrato chamado _não-terminal_ como seu _lado esquerdo_ , e uma sequência de um ou mais símbolos não-terminais e _terminais_ como seu _lado direito_. Para cada gramática, os símbolos terminais são extraídos de um _alfabeto_ especificado.

Começando de uma sentença que consiste em um único não-terminal distinto, chamado _símbolo objetivo_ , uma dada gramática livre de contexto especifica uma linguagem, ou seja, o conjunto de possíveis sequências de símbolos terminais que podem resultar da substituição repetida de qualquer não-terminal na sequência por um lado direito de uma produção para a qual o não-terminal é o lado esquerdo.

## 2.2. A Gramática Léxica

Uma _gramática léxica_ para a linguagem de programação Java é apresentada em [§3 (_Estrutura Léxica_)](<#/doc/jls/jls-03>). Esta gramática tem como seus símbolos terminais os caracteres do conjunto de caracteres Unicode. Ela define um conjunto de produções, começando do símbolo objetivo _Input_ ([§3.5](<#/doc/jls/jls-03>)), que descrevem como sequências de caracteres Unicode ([§3.1](<#/doc/jls/jls-03>)) são traduzidas em uma sequência de elementos de entrada ([§3.2](<#/doc/jls/jls-03>)).

Esses elementos de entrada, com espaços em branco ([§3.6](<#/doc/jls/jls-03>)) e comentários ([§3.7](<#/doc/jls/jls-03>)) descartados, formam os símbolos terminais para a gramática sintática da linguagem de programação Java e são chamados de _tokens_ ([§3.5](<#/doc/jls/jls-03>)). Esses tokens são os identificadores ([§3.8](<#/doc/jls/jls-03>)), palavras-chave ([§3.9](<#/doc/jls/jls-03>)), literais ([§3.10](<#/doc/jls/jls-03>)), separadores ([§3.11](<#/doc/jls/jls-03>)) e operadores ([§3.12](<#/doc/jls/jls-03>)) da linguagem de programação Java.

## 2.3. A Gramática Sintática

A _gramática sintática_ para a linguagem de programação Java é apresentada nos Capítulos 4, 6-10, 14 e 15. Esta gramática tem como seus símbolos terminais os tokens definidos pela gramática léxica. Ela define um conjunto de produções, começando do símbolo objetivo _CompilationUnit_ ([§7.3](<#/doc/jls/jls-07>)), que descrevem como sequências de tokens podem formar programas sintaticamente corretos.

Para conveniência, a gramática sintática é apresentada em conjunto no Capítulo 19.

## 2.4. Notação da Gramática

Símbolos terminais são mostrados em fonte de `largura fixa` nas produções das gramáticas léxica e sintática, e em toda esta especificação sempre que o texto se refere diretamente a tal símbolo terminal. Estes devem aparecer em um programa exatamente como escritos.

Símbolos não-terminais são mostrados em tipo _itálico_. A definição de um não-terminal é introduzida pelo nome do não-terminal sendo definido, seguido por dois pontos. Uma ou mais definições alternativas para o não-terminal seguem nas linhas subsequentes.

Por exemplo, a produção sintática:

IfThenStatement:

`if` `(` Expression `)` Statement

afirma que o não-terminal _IfThenStatement_ representa o token `if`, seguido por um token de parêntese esquerdo, seguido por uma _Expression_ , seguido por um token de parêntese direito, seguido por um _Statement_.

A sintaxe _{x}_ no lado direito de uma produção denota zero ou mais ocorrências de _x_.

Por exemplo, a produção sintática:

ArgumentList:

Argument {, Argument}

afirma que uma _ArgumentList_ consiste em um _Argument_ , seguido por zero ou mais ocorrências de uma vírgula e um _Argument_. O resultado é que uma _ArgumentList_ pode conter qualquer número positivo de argumentos.

A sintaxe _[x]_ no lado direito de uma produção denota zero ou uma ocorrência de _x_. Ou seja, _x_ é um _símbolo opcional_. A alternativa que contém o símbolo opcional na verdade define duas alternativas: uma que omite o símbolo opcional e outra que o inclui.

Isso significa que:

BreakStatement:

`break` [Identifier] `;`

é uma abreviação conveniente para:

BreakStatement:

`break` `;`
`break` Identifier `;`

Como outro exemplo, significa que:

BasicForStatement:

`for` `(` [ForInit] `;` [Expression] `;` [ForUpdate] `)` Statement

é uma abreviação conveniente para:

BasicForStatement:

`for` `(` `;` [Expression] `;` [ForUpdate] `)` Statement
`for` `(` ForInit `;` [Expression] `;` [ForUpdate] `)` Statement

que por sua vez é uma abreviação para:

BasicForStatement:

`for` `(` `;` `;` [ForUpdate] `)` Statement
`for` `(` `;` Expression `;` [ForUpdate] `)` Statement
`for` `(` ForInit `;` `;` [ForUpdate] `)` Statement
`for` `(` ForInit `;` Expression `;` [ForUpdate] `)` Statement

que por sua vez é uma abreviação para:

BasicForStatement:

`for` `(` `;` `;` `)` Statement
`for` `(` `;` `;` ForUpdate `)` Statement
`for` `(` `;` Expression `;` `)` Statement
`for` `(` `;` Expression `;` ForUpdate `)` Statement
`for` `(` ForInit `;` `;` `)` Statement
`for` `(` ForInit `;` `;` ForUpdate `)` Statement
`for` `(` ForInit `;` Expression `;` `)` Statement
`for` `(` ForInit `;` Expression `;` ForUpdate `)` Statement

assim, o não-terminal _BasicForStatement_ na verdade tem oito lados direitos alternativos.

Um lado direito muito longo pode ser continuado em uma segunda linha, indentando claramente a segunda linha.

Por exemplo, a gramática sintática contém esta produção:

NormalClassDeclaration:

{[ClassModifier](<#/doc/jls/jls-08>)} `class` [TypeIdentifier](<#/doc/jls/jls-03>) [[TypeParameters](<#/doc/jls/jls-08>)] [[ClassExtends](<#/doc/jls/jls-08>)] [[ClassImplements](<#/doc/jls/jls-08>)] [[ClassPermits](<#/doc/jls/jls-08>)] [ClassBody](<#/doc/jls/jls-08>)

que define um lado direito para o não-terminal _NormalClassDeclaration_.

A frase _(um de)_ no lado direito de uma produção significa que cada um dos símbolos na linha ou linhas seguintes é uma definição alternativa.

Por exemplo, a gramática léxica contém a produção:

ZeroToThree:

(um de)
`0 1 2 3`

que é meramente uma abreviação conveniente para:

ZeroToThree:

`0`
`1`
`2`
`3`

Quando uma alternativa em uma produção parece ser um token, ela representa a sequência de caracteres que comporia tal token.

Assim, a produção:

BooleanLiteral:

(um de)
`true` `false`

é uma abreviação para:

BooleanLiteral:

`t r u e`
`f a l s e`

O lado direito de uma produção pode especificar que certas expansões não são permitidas usando a frase "mas não" e então indicando as expansões a serem excluídas.

Por exemplo:

Identifier:

[IdentifierChars](<#/doc/jls/jls-03>) mas não um [ReservedKeyword](<#/doc/jls/jls-03>) ou [BooleanLiteral](<#/doc/jls/jls-03>) ou [NullLiteral](<#/doc/jls/jls-03>)

Finalmente, alguns não-terminais são definidos por uma frase narrativa em tipo romano onde seria impraticável listar todas as alternativas.

Por exemplo:

RawInputCharacter:

any Unicode character representable in UTF-16

* * *

[Anterior](<#/doc/jls/jls-01>) | | [Próximo](<#/doc/jls/jls-03>)
---|---|---
Capítulo 1. Introdução | [Início](<#/doc/jls/jls-01>) | Capítulo 3. Estrutura Léxica
* * *

[ Aviso Legal ](<#/>)