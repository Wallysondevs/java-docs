# Limites

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Regulares ](<#/doc/tutorials/regex>) > Limites

**Anterior na Série**

[Grupos de Captura](<#/doc/tutorials/regex/groups>)

➜

**Tutorial Atual**

Limites

➜

**Próximo na Série**

[A Classe Pattern](<#/doc/tutorials/regex/patterns>)

**Anterior na Série:** [Grupos de Captura](<#/doc/tutorials/regex/groups>)

**Próximo na Série:** [A Classe Pattern](<#/doc/tutorials/regex/patterns>)

# Limites

## Quantificadores

Até agora, só nos interessava se uma correspondência era encontrada em alguma localização dentro de uma determinada string de entrada. Nunca nos importamos com onde na string a correspondência estava ocorrendo.

Você pode tornar suas correspondências de padrão mais precisas especificando tais informações com matchers de limite. Por exemplo, talvez você esteja interessado em encontrar uma palavra específica, mas apenas se ela aparecer no início ou no fim de uma linha. Ou talvez você queira saber se a correspondência está ocorrendo em um limite de palavra, ou no fim da correspondência anterior.

A tabela a seguir lista e explica todos os matchers de limite.

Construto de Limite | Descrição
---|---
`^` | O início de uma linha
`$` | O fim de uma linha
`\b` | Um limite de palavra
`\B` | Um limite de não-palavra
`\A` | O início da entrada
`\G` | O fim da correspondência anterior
`\Z` | O fim da entrada, exceto pelo terminador final, se houver
`\z` | O fim da entrada

Os exemplos a seguir demonstram o uso dos matchers de limite `^` e `$`. Como observado acima, `^` corresponde ao início de uma linha, e `$` corresponde ao fim.

O primeiro exemplo é bem-sucedido porque o padrão ocupa a string de entrada inteira. O segundo exemplo falha porque a string de entrada contém whitespace extra no início. O terceiro exemplo especifica uma expressão que permite whitespace ilimitado, seguido por "dog" no fim da linha. O quarto exemplo exige que "dog" esteja presente no início de uma linha, seguido por um número ilimitado de caracteres de palavra.

Para verificar se um padrão começa e termina em um limite de palavra (em oposição a uma substring dentro de uma string mais longa), basta usar `\b` em ambos os lados; por exemplo, `\bdog\b`.

Para corresponder à expressão em um limite de não-palavra, use `\B` em vez disso:

Para exigir que a correspondência ocorra apenas no fim da correspondência anterior, use `\G`:

Aqui o segundo exemplo encontra apenas uma correspondência, porque a segunda ocorrência de "dog" não começa no fim da correspondência anterior.

### Neste tutorial

Matchers de Limite

Última atualização: 10 de janeiro de 2022

**Anterior na Série**

[Grupos de Captura](<#/doc/tutorials/regex/groups>)

➜

**Tutorial Atual**

Limites

➜

**Próximo na Série**

[A Classe Pattern](<#/doc/tutorials/regex/patterns>)

**Anterior na Série:** [Grupos de Captura](<#/doc/tutorials/regex/groups>)

**Próximo na Série:** [A Classe Pattern](<#/doc/tutorials/regex/patterns>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Regulares ](<#/doc/tutorials/regex>) > Limites