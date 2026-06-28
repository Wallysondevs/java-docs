# Literais de String

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Regulares ](<#/doc/tutorials/regex>) > Literais de String

**Anterior na Série**

[Introdução às Expressões Regulares](<#/doc/tutorials/regex/intro>)

➜

**Tutorial Atual**

Literais de String

➜

**Próximo na Série**

[Classes de Caracteres](<#/doc/tutorials/regex/character-classes>)

**Anterior na Série:** [Introdução às Expressões Regulares](<#/doc/tutorials/regex/intro>)

**Próximo na Série:** [Classes de Caracteres](<#/doc/tutorials/regex/character-classes>)

# Literais de String

## Literais de String

A forma mais básica de correspondência de padrões suportada por esta API é a correspondência de um literal de string. Por exemplo, se a expressão regular for foo e a string de entrada for foo, a correspondência será bem-sucedida porque as strings são idênticas. Experimente isso com o test harness:

Esta correspondência foi um sucesso. Observe que, embora a string de entrada tenha 3 caracteres de comprimento, o índice inicial é 0 e o índice final é 3. Por convenção, os intervalos incluem o índice inicial e excluem o índice final, conforme mostrado na figura a seguir:

O literal de string foo, com células numeradas e valores de índice.

Cada caractere na string reside em sua própria célula, com as posições de índice apontando entre cada célula. A string "foo" começa no índice 0 e termina no índice 3, embora os próprios caracteres ocupem apenas as células 0, 1 e 2.

Com correspondências subsequentes, você notará alguma sobreposição; o índice inicial para a próxima correspondência é o mesmo que o índice final da correspondência anterior:

## Metacaracteres

Esta API também suporta vários caracteres especiais que afetam a forma como um padrão é correspondido. Altere a expressão regular para `cat.` (observe o ponto final) e a string de entrada para `cats`. A saída aparecerá da seguinte forma:

A correspondência ainda é bem-sucedida, mesmo que o ponto "." não esteja presente na string de entrada. Ela é bem-sucedida porque o ponto é um metacaractere — um caractere com significado especial interpretado pelo matcher. O metacaractere "." significa "qualquer caractere", razão pela qual a correspondência é bem-sucedida neste exemplo.

Os metacaracteres suportados por esta API são: `<([{\^-=$!|]})?*+.>`

> Nota: Em certas situações, os caracteres especiais listados acima não serão tratados como metacaracteres. Você encontrará isso à medida que aprender mais sobre como as expressões regulares são construídas. Você pode, no entanto, usar esta lista para verificar se um caractere específico será ou não considerado um metacaractere. Por exemplo, os caracteres `@` e `#` nunca carregam um significado especial.

Existem duas maneiras de forçar um metacaractere a ser tratado como um caractere comum:

*   preceder o metacaractere com uma barra invertida, ou
*   envolvê-lo entre `\Q` (que inicia a citação) e `\E` (que a encerra).

Ao usar esta técnica, `\Q` e `\E` podem ser colocados em qualquer local dentro da expressão, desde que `\Q` venha primeiro.

### Neste tutorial

Literais de String Metacaracteres

Última atualização: 10 de janeiro de 2022

**Anterior na Série**

[Introdução às Expressões Regulares](<#/doc/tutorials/regex/intro>)

➜

**Tutorial Atual**

Literais de String

➜

**Próximo na Série**

[Classes de Caracteres](<#/doc/tutorials/regex/character-classes>)

**Anterior na Série:** [Introdução às Expressões Regulares](<#/doc/tutorials/regex/intro>)

**Próximo na Série:** [Classes de Caracteres](<#/doc/tutorials/regex/character-classes>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Regulares ](<#/doc/tutorials/regex>) > Literais de String