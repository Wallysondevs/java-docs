# Estrutura Léxica

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Especificações Java SE](<#/>) > [Especificação da Linguagem Java](<#/doc/jls/jls-01>)

Capítulo 3. Estrutura Léxica
---
[Anterior](<#/doc/jls/jls-02>) | | [Próximo](<#/doc/jls/jls-04>)
* * *

# Capítulo 3. Estrutura Léxica

**Sumário**

[3.1. Unicode](<#/doc/jls/jls-03>)
[3.2. Traduções Léxicas](<#/doc/jls/jls-03>)
[3.3. Escapes Unicode](<#/doc/jls/jls-03>)
[3.4. Terminadores de Linha](<#/doc/jls/jls-03>)
[3.5. Elementos de Entrada e Tokens](<#/doc/jls/jls-03>)
[3.6. Espaços em Branco](<#/doc/jls/jls-03>)
[3.7. Comentários](<#/doc/jls/jls-03>)
[3.8. Identificadores](<#/doc/jls/jls-03>)
[3.9. Palavras-Chave](<#/doc/jls/jls-03>)
[3.10. Literais](<#/doc/jls/jls-03>)
    

[3.10.1. Literais Inteiros](<#/doc/jls/jls-03>)
[3.10.2. Literais de Ponto Flutuante](<#/doc/jls/jls-03>)
[3.10.3. Literais Booleanos](<#/doc/jls/jls-03>)
[3.10.4. Literais de Caractere](<#/doc/jls/jls-03>)
[3.10.5. Literais de String](<#/doc/jls/jls-03>)
[3.10.6. Blocos de Texto](<#/doc/jls/jls-03>)
[3.10.7. Sequências de Escape](<#/doc/jls/jls-03>)
[3.10.8. O Literal Nulo](<#/doc/jls/jls-03>)
[3.11. Separadores](<#/doc/jls/jls-03>)
[3.12. Operadores](<#/doc/jls/jls-03>)

Este capítulo especifica a estrutura léxica da linguagem de programação Java.

Programas são escritos em Unicode ([§3.1](<#/doc/jls/jls-03>)), mas traduções léxicas são fornecidas ([§3.2](<#/doc/jls/jls-03>)) para que escapes Unicode ([§3.3](<#/doc/jls/jls-03>)) possam ser usados para incluir qualquer caractere Unicode usando apenas caracteres ASCII. Terminadores de linha são definidos ([§3.4](<#/doc/jls/jls-03>)) para suportar as diferentes convenções de sistemas hospedeiros existentes, mantendo números de linha consistentes.

Os caracteres Unicode resultantes das traduções léxicas são reduzidos a uma sequência de elementos de entrada ([§3.5](<#/doc/jls/jls-03>)), que são espaços em branco ([§3.6](<#/doc/jls/jls-03>)), comentários ([§3.7](<#/doc/jls/jls-03>)) e tokens. Os tokens são os identificadores ([§3.8](<#/doc/jls/jls-03>)), palavras-chave ([§3.9](<#/doc/jls/jls-03>)), literais ([§3.10](<#/doc/jls/jls-03>)), separadores ([§3.11](<#/doc/jls/jls-03>)) e operadores ([§3.12](<#/doc/jls/jls-03>)) da gramática sintática.

## 3.1. Unicode

Programas são escritos usando o conjunto de caracteres Unicode ([§1.7](<#/doc/jls/jls-01>)). Informações sobre este conjunto de caracteres e suas codificações de caracteres associadas podem ser encontradas em [`https://www.unicode.org/`](<https://www.unicode.org/>).

A Plataforma Java SE acompanha o Padrão Unicode à medida que ele evolui. A versão precisa do Unicode usada por um determinado lançamento é especificada na documentação da classe `Character`.

O padrão Unicode foi originalmente projetado como uma codificação de caracteres de 16 bits de largura fixa. Desde então, foi alterado para permitir caracteres cuja representação requer mais de 16 bits. O intervalo de pontos de código válidos é agora U+0000 a U+10FFFF, usando a notação hexadecimal _U+n_. Caracteres cujos pontos de código são maiores que U+FFFF são chamados de _caracteres suplementares_. Para representar o intervalo completo de caracteres usando apenas unidades de 16 bits, o padrão Unicode define uma codificação chamada UTF-16. Nesta codificação, caracteres suplementares são representados como pares de unidades de código de 16 bits, a primeira do intervalo de substitutos altos (U+D800 a U+DBFF), e a segunda do intervalo de substitutos baixos (U+DC00 a U+DFFF). Para caracteres no intervalo U+0000 a U+FFFF, os valores dos pontos de código e das unidades de código UTF-16 são os mesmos.

A linguagem de programação Java representa texto em sequências de unidades de código de 16 bits, usando a codificação UTF-16.

Algumas APIs da Plataforma Java SE, principalmente na classe `Character`, usam inteiros de 32 bits para representar pontos de código como entidades individuais. A Plataforma Java SE fornece métodos para converter entre representações de 16 bits e 32 bits.

Esta especificação usa os termos _ponto de código_ e _unidade de código UTF-16_ onde a representação é relevante, e o termo genérico _caractere_ onde a representação é irrelevante para a discussão.

Exceto por comentários ([§3.7](<#/doc/jls/jls-03>)), identificadores ([§3.8](<#/doc/jls/jls-03>)), e o conteúdo de literais de caractere, literais de string e blocos de texto ([§3.10.4](<#/doc/jls/jls-03>), [§3.10.5](<#/doc/jls/jls-03>), [§3.10.6](<#/doc/jls/jls-03>)), todos os elementos de entrada ([§3.5](<#/doc/jls/jls-03>)) em um programa são formados apenas por caracteres ASCII (ou escapes Unicode ([§3.3](<#/doc/jls/jls-03>)) que resultam em caracteres ASCII).

ASCII (ANSI X3.4) é o Código Padrão Americano para Intercâmbio de Informações. Os primeiros 128 caracteres da codificação Unicode UTF-16 são os caracteres ASCII.

## 3.2. Traduções Léxicas

Um fluxo de caracteres Unicode bruto é traduzido em uma sequência de tokens, usando os três passos de tradução léxica a seguir, que são aplicados em sequência:

  1. Uma tradução de escapes Unicode ([§3.3](<#/doc/jls/jls-03>)) no fluxo bruto de caracteres Unicode para o caractere Unicode correspondente. Um escape Unicode da forma `\u _xxxx_`, onde `_xxxx_` é um valor hexadecimal, representa a unidade de código UTF-16 cuja codificação é `_xxxx_`. Este passo de tradução permite que qualquer programa seja expresso usando apenas caracteres ASCII.

  2. Uma tradução do fluxo Unicode resultante do passo 1 em um fluxo de caracteres de entrada e terminadores de linha ([§3.4](<#/doc/jls/jls-03>)).

  3. Uma tradução do fluxo de caracteres de entrada e terminadores de linha resultante do passo 2 em uma sequência de elementos de entrada ([§3.5](<#/doc/jls/jls-03>)) que, após espaços em branco ([§3.6](<#/doc/jls/jls-03>)) e comentários ([§3.7](<#/doc/jls/jls-03>)) serem descartados, compreendem os tokens que são os símbolos terminais da gramática sintática ([§2.3](<#/doc/jls/jls-02>)).

A tradução mais longa possível é usada em cada passo, mesmo que o resultado não produza, em última instância, um programa correto, enquanto outra tradução léxica o faria. Existem duas exceções para lidar com situações que necessitam de uma tradução mais granular: no passo 1, para o processamento de caracteres `\` contíguos ([§3.3](<#/doc/jls/jls-03>)), e no passo 3, para o processamento de palavras-chave contextuais e caracteres `>` adjacentes ([§3.5](<#/doc/jls/jls-03>)).

Os caracteres de entrada `a--b` são tokenizados como `a`, `--` e `b`, o que não faz parte de nenhum programa gramaticalmente correto, embora a tokenização `a`, `-`, `-`, `b` pudesse fazer parte de um programa gramaticalmente correto. A tokenização `a`, `-`, `-`, `b` pode ser realizada com os caracteres de entrada `a- -b` (com um caractere ASCII SP entre os dois caracteres `-`).

Poder-se-ia supor que a entrada bruta `\\u1234` é traduzida para um caractere `\` e (seguindo a regra do "mais longo possível") um escape Unicode da forma `\u1234`. Na verdade, o caractere `\` inicial faz com que esta entrada bruta seja traduzida para sete caracteres distintos: `\ \ u 1 2 3 4`.

## 3.3. Escapes Unicode

Um compilador para a linguagem de programação Java ("compilador Java") primeiro reconhece escapes Unicode em sua entrada bruta, traduzindo os caracteres ASCII `\u` seguidos por quatro dígitos hexadecimais para um _caractere de entrada bruto_ que denota a unidade de código UTF-16 ([§3.1](<#/doc/jls/jls-03>)) para o valor hexadecimal indicado. Um escape Unicode pode representar caracteres no intervalo U+0000 a U+FFFF; representar caracteres suplementares no intervalo U+010000 a U+10FFFF requer dois escapes Unicode consecutivos. Todos os outros caracteres na entrada bruta do compilador são reconhecidos como caracteres de entrada brutos e passados inalterados.

Este passo de tradução resulta em uma sequência de caracteres de entrada Unicode, todos os quais são caracteres de entrada brutos (quaisquer escapes Unicode tendo sido reduzidos a caracteres de entrada brutos).

UnicodeInputCharacter:

[UnicodeEscape](<#/doc/jls/jls-03>)   
[RawInputCharacter](<#/doc/jls/jls-03>)

UnicodeEscape:

`\` [UnicodeMarker](<#/doc/jls/jls-03>) [HexDigit](<#/doc/jls/jls-03>) [HexDigit](<#/doc/jls/jls-03>) [HexDigit](<#/doc/jls/jls-03>) [HexDigit](<#/doc/jls/jls-03>)

UnicodeMarker:

`u` {`u`} 

HexDigit:

(um de)   
`0 1 2 3 4 5 6 7 8 9 a b c d e f A B C D E F`

RawInputCharacter:

qualquer caractere Unicode representável em UTF-16

Os caracteres `\`, `u` e os dígitos hexadecimais aqui são todos caracteres ASCII.

A produção _UnicodeInputCharacter_ é ambígua porque um caractere ASCII `\` na entrada bruta do compilador poderia ser reduzido a um _RawInputCharacter_ ou ao `\` de um _UnicodeEscape_ (a ser seguido por um `u` ASCII). Para evitar ambiguidade, para cada caractere ASCII `\` na entrada bruta do compilador, o processamento da entrada deve considerar os caracteres de entrada brutos mais recentes que resultaram deste passo de tradução:

  * Se o caractere de entrada bruto mais recente no resultado foi ele próprio traduzido de um escape Unicode na entrada bruta do compilador, então o caractere ASCII `\` é elegível para iniciar um escape Unicode.

Por exemplo, se o caractere de entrada bruto mais recente no resultado foi uma barra invertida que surgiu de um escape Unicode `\u005c` na entrada bruta, então um caractere ASCII `\` que aparece em seguida na entrada bruta é elegível para iniciar outro escape Unicode.

  * Caso contrário, considere quantas barras invertidas apareceram contiguamente como caracteres de entrada brutos no resultado, voltando a um caractere não-barra invertida ou ao início do resultado. (É irrelevante se tal barra invertida surgiu de um caractere ASCII `\` na entrada bruta do compilador ou de um escape Unicode `\u005c` na entrada bruta do compilador.) Se este número for par, então o caractere ASCII `\` é elegível para iniciar um escape Unicode; se o número for ímpar, então o caractere ASCII `\` não é elegível para iniciar um escape Unicode.

Por exemplo, a entrada bruta `"\\u2122=\u2122"` resulta nos onze caracteres `" \ \ u 2 1 2 2 = ™ "` porque, embora o segundo caractere ASCII `\` na entrada bruta não seja elegível para iniciar um escape Unicode, o terceiro caractere ASCII `\` é elegível, e `\u2122` é a codificação Unicode do caractere `™`.

Se um `\` elegível não for seguido por `u`, então ele é tratado como um _RawInputCharacter_ e permanece parte do fluxo Unicode escapado.

Se um `\` elegível for seguido por `u`, ou mais de um `u`, e o último `u` não for seguido por quatro dígitos hexadecimais, então ocorre um erro em tempo de compilação.

O caractere produzido por um escape Unicode não participa de escapes Unicode adicionais.

Por exemplo, a entrada bruta `\u005cu005a` resulta nos seis caracteres `\ u 0 0 5 a`, porque `005c` é o valor Unicode para uma barra invertida. Não resulta no caractere `Z`, que é o valor Unicode `005a`, porque a barra invertida que resultou do processamento do escape Unicode `\u005c` não é interpretada como o início de um escape Unicode adicional.

Note que `\u005cu005a` não pode ser escrito em um literal de string para denotar os seis caracteres `\ u 0 0 5 a`. Isso ocorre porque os dois primeiros caracteres resultantes da tradução, `\` e `u`, são interpretados em um literal de string como uma sequência de escape ilegal ([§3.10.7](<#/doc/jls/jls-03>)).

Felizmente, a regra sobre caracteres de barra invertida contíguos ajuda os programadores a criar entradas brutas que denotam escapes Unicode em um literal de string. Denotar os seis caracteres `\ u 0 0 5 a` em um literal de string simplesmente requer que outra `\` seja colocada adjacente à `\` existente, como `"\\u005a is Z"`. Isso funciona porque o segundo `\` na entrada bruta `\\u005a` não é elegível para iniciar um escape Unicode, então o primeiro `\` e o segundo `\` são preservados como caracteres de entrada brutos, assim como os próximos cinco caracteres `u 0 0 5 a`. Os dois caracteres `\` são subsequentemente interpretados em um literal de string como a sequência de escape para uma barra invertida, resultando em uma string com os seis caracteres desejados `\ u 0 0 5 a`. Sem a regra, a entrada bruta `\\u005a` seria processada como um caractere de entrada bruto `\` seguido por um escape Unicode `\u005a` que se torna um caractere de entrada bruto `Z`; isso seria inútil porque `\Z` é uma sequência de escape ilegal em um literal de string. (Note que a regra traduz `\u005c\u005c` para `\\` porque a tradução do primeiro escape Unicode para um caractere de entrada bruto `\` não impede a tradução do segundo escape Unicode para outro caractere de entrada bruto `\`.)

A regra também permite que os programadores criem entradas brutas que denotam sequências de escape em um literal de string. Por exemplo, a entrada bruta `\\\u006e` resulta nos três caracteres `\ \ n` porque o primeiro `\` e o segundo `\` são preservados como caracteres de entrada brutos, enquanto o terceiro `\` é elegível para iniciar um escape Unicode e, portanto, `\u006e` é traduzido para um caractere de entrada bruto `n`. Os três caracteres `\ \ n` são subsequentemente interpretados em um literal de string como `\ n`, que denota a sequência de escape para uma quebra de linha (linefeed). (Note que `\\\u006e` pode ser escrito como `\u005c\u005c\u006e` porque cada escape Unicode `\u005c` é traduzido para um caractere de entrada bruto `\` e, assim, a entrada bruta restante `\u006e` é precedida por um número par de barras invertidas e processada como o escape Unicode para `n`.)

A linguagem de programação Java especifica uma forma padrão de transformar um programa escrito em Unicode para ASCII que altera um programa para uma forma que pode ser processada por ferramentas baseadas em ASCII. A transformação envolve converter quaisquer escapes Unicode no texto fonte do programa para ASCII adicionando um `u` extra - por exemplo, `\u _xxxx_` torna-se `\uu _xxxx_` - enquanto simultaneamente converte caracteres não-ASCII no texto fonte para escapes Unicode contendo um único `u` cada.

Esta versão transformada é igualmente aceitável para um compilador Java e representa exatamente o mesmo programa. A fonte Unicode exata pode ser restaurada posteriormente a partir desta forma ASCII, convertendo cada sequência de escape onde múltiplos `u`s estão presentes para uma sequência de caracteres Unicode com um `u` a menos, enquanto simultaneamente converte cada sequência de escape com um único `u` para o caractere Unicode único correspondente.

Um compilador Java deve usar a notação `\u _xxxx_` como formato de saída para exibir caracteres Unicode quando uma fonte adequada não estiver disponível.

## 3.4. Terminadores de Linha

Um compilador Java divide em seguida a sequência de caracteres de entrada Unicode em linhas, reconhecendo _terminadores de linha_.

LineTerminator:

o caractere ASCII LF, também conhecido como "newline"   
o caractere ASCII CR, também conhecido como "return"   
o caractere ASCII CR seguido pelo caractere ASCII LF

InputCharacter:

[UnicodeInputCharacter](<#/doc/jls/jls-03>) mas não CR ou LF

As linhas são terminadas pelos caracteres ASCII CR, ou LF, ou CR LF. Os dois caracteres CR imediatamente seguidos por LF são contados como um terminador de linha, não dois.

Um terminador de linha especifica o término da forma `//` de um comentário ([§3.7](<#/doc/jls/jls-03>)).

As linhas definidas pelos terminadores de linha podem determinar os números de linha produzidos por um compilador Java.

O resultado é uma sequência de terminadores de linha e caracteres de entrada, que são os símbolos terminais para o terceiro passo no processo de tokenização.

## 3.5. Elementos de Entrada e Tokens

Os caracteres de entrada e terminadores de linha que resultam do processamento de escapes Unicode ([§3.3](<#/doc/jls/jls-03>)) e, em seguida, do reconhecimento de linhas de entrada ([§3.4](<#/doc/jls/jls-03>)) são reduzidos a uma sequência de _elementos de entrada_.

Input:

{[InputElement](<#/doc/jls/jls-03>)} [[Sub](<#/doc/jls/jls-03>)] 

InputElement:

[WhiteSpace](<#/doc/jls/jls-03>)   
[Comment](<#/doc/jls/jls-03>)   
[Token](<#/doc/jls/jls-03>)

Token:

[Identifier](<#/doc/jls/jls-03>)   
[Keyword](<#/doc/jls/jls-03>)   
[Literal](<#/doc/jls/jls-03>)   
[Separator](<#/doc/jls/jls-03>)   
[Operator](<#/doc/jls/jls-03>)

Sub:

o caractere ASCII SUB, também conhecido como "control-Z"

Aqueles elementos de entrada que não são espaços em branco ou comentários são _tokens_. Os tokens são os símbolos terminais da gramática sintática ([§2.3](<#/doc/jls/jls-02>)).

Espaços em branco ([§3.6](<#/doc/jls/jls-03>)) e comentários ([§3.7](<#/doc/jls/jls-03>)) podem servir para separar tokens que, se adjacentes, poderiam ser tokenizados de outra maneira.

Por exemplo, os caracteres de entrada `-` e `=` podem formar o token de operador `-=` ([§3.12](<#/doc/jls/jls-03>)) somente se não houver espaço em branco ou comentário interveniente. Como outro exemplo, os dez caracteres de entrada `staticvoid` formam um único token identificador, enquanto os onze caracteres de entrada `static void` (com um caractere ASCII SP entre `c` e `v`) formam um par de tokens de palavra-chave, `static` e `void`, separados por espaço em branco.

Como uma concessão especial para compatibilidade com certos sistemas operacionais, o caractere ASCII SUB (`\u001a`, ou control-Z) é ignorado se for o último caractere no fluxo de entrada escapado.

A produção _Input_ é ambígua, o que significa que para algumas sequências de caracteres de entrada, há mais de uma maneira de reduzir os caracteres de entrada a elementos de entrada (ou seja, de tokenizar os caracteres de entrada). As ambiguidades são resolvidas da seguinte forma:

  * Uma sequência de caracteres de entrada que poderia ser reduzida a um token identificador ou a um token literal é sempre reduzida a um token literal.

  * Uma sequência de caracteres de entrada que poderia ser reduzida a um token identificador ou a um token de palavra-chave reservada ([§3.9](<#/doc/jls/jls-03>)) é sempre reduzida a um token de palavra-chave reservada.

  * Uma sequência de caracteres de entrada que poderia ser reduzida a um token de palavra-chave contextual ou a outros tokens (não-palavra-chave) é reduzida de acordo com o contexto, conforme especificado em [§3.9](<#/doc/jls/jls-03>).

  * Se o caractere de entrada `>` aparecer em um contexto de tipo ([§4.11](<#/doc/jls/jls-04>)), ou seja, como parte de um _Type_ ou um _UnannType_ na gramática sintática ([§4.1](<#/doc/jls/jls-04>), [§8.3](<#/doc/jls/jls-08>)), ele é sempre reduzido ao operador de comparação numérica `>`, mesmo quando poderia ser combinado com um caractere `>` adjacente para formar um operador diferente.

Sem esta regra para caracteres `>`, dois colchetes `>` consecutivos em um tipo como `List<List<String>>` seriam tokenizados como o operador de deslocamento à direita com sinal `>>`, enquanto três colchetes `>` consecutivos em um tipo como `List<List<List<String>>>` seriam tokenizados como o operador de deslocamento à direita sem sinal `>>>`. Pior, a tokenização de quatro ou mais colchetes `>` consecutivos em um tipo como `List<List<List<List<String>>>>` seria ambígua, pois várias combinações de tokens `>`, `>>` e `>>>` poderiam representar os caracteres `>`>`>`>`.

Considere dois tokens `_x_` e `_y_` no fluxo de entrada resultante. Se `_x_` precede `_y_`, então dizemos que `_x_` está _à esquerda de_ `_y_` e que `_y_` está _à direita de_ `_x_`.

Por exemplo, neste simples trecho de código:
```
    class Empty {
    }
    
```
dizemos que o token `}` está à direita do token `{`, embora apareça, nesta representação bidimensional, para baixo e à esquerda do token `{`. Esta convenção sobre o uso das palavras esquerda e direita nos permite falar, por exemplo, do operando do lado direito de um operador binário ou do lado esquerdo de uma atribuição.
## 3.6. White Space

Espaço em branco é definido como o caractere de espaço ASCII, caractere de tabulação horizontal, caractere de avanço de formulário e caracteres de terminador de linha ([§3.4](<#/doc/jls/jls-03>)).

WhiteSpace:

o caractere SP ASCII, também conhecido como "espaço"
o caractere HT ASCII, também conhecido como "tabulação horizontal"
o caractere FF ASCII, também conhecido como "avanço de formulário"
[LineTerminator](<#/doc/jls/jls-03>)

## 3.7. Comments

Existem dois tipos de comentários:

  * `/`*` _text_ `*`/`

Um _comentário tradicional_ : todo o texto dos caracteres ASCII `/`*` até os caracteres ASCII `*`/` é ignorado (assim como em C e C++).

  * `/`/` _text_

Um _comentário de fim de linha_ : todo o texto dos caracteres ASCII `/`/` até o final da linha é ignorado (assim como em C++).

Comment:

[TraditionalComment](<#/doc/jls/jls-03>)
[EndOfLineComment](<#/doc/jls/jls-03>)

TraditionalComment:

`/` `*` [CommentTail](<#/doc/jls/jls-03>)

CommentTail:

`*` [CommentTailStar](<#/doc/jls/jls-03>)
[NotStar](<#/doc/jls/jls-03>) [CommentTail](<#/doc/jls/jls-03>)

CommentTailStar:

`/`
`*` [CommentTailStar](<#/doc/jls/jls-03>)
[NotStarNotSlash](<#/doc/jls/jls-03>) [CommentTail](<#/doc/jls/jls-03>)

NotStar:

[InputCharacter](<#/doc/jls/jls-03>) but not `*`
[LineTerminator](<#/doc/jls/jls-03>)

NotStarNotSlash:

[InputCharacter](<#/doc/jls/jls-03>) but not `*` or `/`
[LineTerminator](<#/doc/jls/jls-03>)

EndOfLineComment:

`/` `/` {[InputCharacter](<#/doc/jls/jls-03>)}

Essas produções implicam todas as seguintes propriedades:

  * Comentários não se aninham.

  * `/`*` e `*`/` não têm significado especial em comentários que começam com `/`/`.

  * `/`/` não tem significado especial em comentários que começam com `/`*` ou `/`*`*`.

Como resultado, o texto a seguir é um único comentário completo:
```
    /* this comment /* // /** ends here: */
    
```

A gramática léxica implica que comentários não ocorrem dentro de literais de caractere, literais de string ou blocos de texto ([§3.10.4](<#/doc/jls/jls-03>), [§3.10.5](<#/doc/jls/jls-03>), [§3.10.6](<#/doc/jls/jls-03>)).

## 3.8. Identifiers

Um _identificador_ é uma sequência de comprimento ilimitado de _letras Java_ e _dígitos Java_ , cujo primeiro caractere deve ser uma _letra Java_.

Identifier:

[IdentifierChars](<#/doc/jls/jls-03>) but not a [ReservedKeyword](<#/doc/jls/jls-03>) or [BooleanLiteral](<#/doc/jls/jls-03>) or [NullLiteral](<#/doc/jls/jls-03>)

IdentifierChars:

[JavaLetter](<#/doc/jls/jls-03>) {[JavaLetterOrDigit](<#/doc/jls/jls-03>)}

JavaLetter:

qualquer caractere Unicode que seja uma "letra Java"

JavaLetterOrDigit:

qualquer caractere Unicode que seja uma "letra ou dígito Java"

Uma "letra Java" é um caractere para o qual o método `Character.isJavaIdentifierStart(int)` retorna true.

Uma "letra ou dígito Java" é um caractere para o qual o método `Character.isJavaIdentifierPart(int)` retorna true.

As "letras Java" incluem letras latinas ASCII maiúsculas e minúsculas `A-Z` (`\u0041-\u005a`), e `a-z` (`\u0061-\u007a`), e, por razões históricas, o cifrão ASCII (`$`, ou `\u0024`) e o sublinhado (`_`, ou `\u005f`). O cifrão deve ser usado apenas em código-fonte gerado mecanicamente ou, raramente, para acessar nomes pré-existentes em sistemas legados. O sublinhado pode ser usado em identificadores formados por dois ou mais caracteres, mas não pode ser usado como um identificador de um único caractere por ser uma palavra-chave.

Os "dígitos Java" incluem os dígitos ASCII `0-9` (`\u0030-\u0039`).

Letras e dígitos podem ser extraídos de todo o conjunto de caracteres Unicode, que suporta a maioria dos sistemas de escrita em uso no mundo hoje, incluindo os grandes conjuntos para chinês, japonês e coreano. Isso permite que os programadores usem identificadores em seus programas que são escritos em suas línguas nativas.

Dois identificadores são iguais somente se, após ignorar caracteres que são ignoráveis, os identificadores tiverem o mesmo caractere Unicode para cada letra ou dígito. Um caractere ignorável é um caractere para o qual o método `Character.isIdentifierIgnorable(int)` retorna true. Identificadores que têm a mesma aparência externa podem, no entanto, ser diferentes.

Por exemplo, os identificadores que consistem nas letras únicas LATIN CAPITAL LETTER A (`A`, `\u0041`), LATIN SMALL LETTER A (`a`, `\u0061`), GREEK CAPITAL LETTER ALPHA (`A`, `\u0391`), CYRILLIC SMALL LETTER A (`a`, `\u0430`) e MATHEMATICAL BOLD ITALIC SMALL A (`a`, `\ud835\udc82`) são todos diferentes.

Caracteres compostos Unicode são diferentes de seus caracteres decompostos equivalentes canônicos. Por exemplo, um LATIN CAPITAL LETTER A ACUTE (`Á`, `\u00c1`) é diferente de um LATIN CAPITAL LETTER A (`A`, `\u0041`) imediatamente seguido por um NON-SPACING ACUTE (`´`, `\u0301`) em identificadores. Veja The Unicode Standard, Seção 3.11 "Normalization Forms".

Exemplos de identificadores são:

  * `String`

  * `i3`

  * αρετη

  * `MAX_VALUE`

  * `isLetterOrDigit`

Um identificador nunca tem a mesma grafia (sequência de caracteres Unicode) que uma palavra-chave reservada ([§3.9](<#/doc/jls/jls-03>)), um literal boolean ([§3.10.3](<#/doc/jls/jls-03>)) ou o literal null ([§3.10.8](<#/doc/jls/jls-03>)), devido às regras de tokenização ([§3.5](<#/doc/jls/jls-03>)). No entanto, um identificador pode ter a mesma grafia que uma palavra-chave contextual, porque a tokenização de uma sequência de caracteres de entrada como um identificador ou uma palavra-chave contextual depende de onde a sequência aparece no programa.

Para facilitar o reconhecimento de palavras-chave contextuais, a gramática sintática ([§2.3](<#/doc/jls/jls-02>)) às vezes proíbe certos identificadores definindo uma produção para aceitar apenas um subconjunto de identificadores. Os subconjuntos são os seguintes:

TypeIdentifier:

[Identifier](<#/doc/jls/jls-03>) but not `permits`, `record`, `sealed`, `var`, or `yield`

UnqualifiedMethodIdentifier:

[Identifier](<#/doc/jls/jls-03>) but not `yield`

_TypeIdentifier_ é usado na declaração de classes, interfaces e parâmetros de tipo ([§8.1](<#/doc/jls/jls-08>), [§9.1](<#/doc/jls/jls-09>), [§4.4](<#/doc/jls/jls-04>)), e ao se referir a tipos ([§6.5](<#/doc/jls/jls-06>)). Por exemplo, o nome de uma classe deve ser um _TypeIdentifier_ , então é ilegal declarar uma classe chamada `permits`, `record`, `sealed`, `var` ou `yield`.

_UnqualifiedMethodIdentifier_ é usado quando uma expressão de invocação de método se refere a um método pelo seu nome simples ([§6.5.7.1](<#/doc/jls/jls-06>)). Como o termo `yield` é excluído de _UnqualifiedMethodIdentifier_ , qualquer invocação de um método chamado `yield` deve ser qualificada, distinguindo assim a invocação de uma instrução `yield` ([§14.21](<#/doc/jls/jls-14>)).

## 3.9. Keywords

51 sequências de caracteres, formadas por caracteres ASCII, são reservadas para uso como palavras-chave e não podem ser usadas como identificadores ([§3.8](<#/doc/jls/jls-03>)). Outras 17 sequências de caracteres, também formadas por caracteres ASCII, podem ser interpretadas como palavras-chave ou como outros tokens, dependendo do contexto em que aparecem.

Keyword:

[ReservedKeyword](<#/doc/jls/jls-03>)
[ContextualKeyword](<#/doc/jls/jls-03>)

ReservedKeyword:

(um de)

```
    abstract   continue   for          new         switch
    assert     default    if           package     synchronized
    boolean    do         goto         private     this
    break      double     implements   protected   throw
    byte       else       import       public      throws
    case       enum       instanceof   return      transient
    catch      extends    int          short       try
    char       final      interface    static      void
    class      finally    long         strictfp    volatile
    const      float      native       super       while
    _ (underscore)
```

ContextualKeyword:

(um de)

```
    exports      opens      requires     uses   yield
    module       permits    sealed       var         
    non-sealed   provides   to           when        
    open         record     transitive   with        
    
```

As palavras-chave `const` e `goto` são reservadas, embora não sejam usadas atualmente. Isso pode permitir que um compilador Java produza melhores mensagens de erro se essas palavras-chave de C++ aparecerem incorretamente nos programas.

A palavra-chave `strictfp` está obsoleta e não deve ser usada em código novo.

A palavra-chave `_` (sublinhado) pode ser usada em certas declarações no lugar de um identificador ([§6.1](<#/doc/jls/jls-06>)).

`true` e `false` não são palavras-chave, mas sim literais boolean ([§3.10.3](<#/doc/jls/jls-03>)).

`null` não é uma palavra-chave, mas sim o literal null ([§3.10.8](<#/doc/jls/jls-03>)).

Durante a redução de caracteres de entrada para elementos de entrada ([§3.5](<#/doc/jls/jls-03>)), uma sequência de caracteres de entrada que conceitualmente corresponde a uma palavra-chave contextual é reduzida a uma palavra-chave contextual se e somente se ambas as seguintes condições forem verdadeiras:

  1. A sequência é reconhecida como um terminal especificado em um contexto adequado da gramática sintática ([§2.3](<#/doc/jls/jls-02>)), da seguinte forma:

     * Para `module`, quando reconhecido como um terminal em uma _SingleModuleImportDeclaration_ ([§7.5.5](<#/doc/jls/jls-07>)), ou uma _ModuleDeclaration_ ([§7.7](<#/doc/jls/jls-07>)).

     * Para `open`, quando reconhecido como um terminal em uma _ModuleDeclaration_ ([§7.7](<#/doc/jls/jls-07>)).

     * Para `exports`, `opens`, `provides`, `requires`, `to`, `uses` e `with`, quando reconhecido como um terminal em uma _ModuleDirective_.

     * Para `transitive`, quando reconhecido como um terminal em um _RequiresModifier_.

Por exemplo, reconhecer a sequência `requires` `transitive` `;` não faz uso de _RequiresModifier_ , então o termo `transitive` é reduzido aqui a um identificador e não a uma palavra-chave contextual.

     * Para `var`, quando reconhecido como um terminal em um _LocalVariableType_ ([§14.4](<#/doc/jls/jls-14>)) ou um _LambdaParameterType_ ([§15.27.1](<#/doc/jls/jls-15>)).

Em outros contextos, tentar usar `var` como um identificador causará um erro, porque `var` não é um _TypeIdentifier_ ([§3.8](<#/doc/jls/jls-03>)).

     * Para `yield`, quando reconhecido como um terminal em uma _YieldStatement_ ([§14.21](<#/doc/jls/jls-14>)).

Em outros contextos, tentar usar `yield` como um identificador causará um erro, porque `yield` não é nem um _TypeIdentifier_ nem um _UnqualifiedMethodIdentifier_.

     * Para `record`, quando reconhecido como um terminal em uma _RecordDeclaration_ ([§8.10](<#/doc/jls/jls-08>)).

     * Para `non-sealed`, `permits` e `sealed`, quando reconhecido como um terminal em uma _NormalClassDeclaration_ ([§8.1](<#/doc/jls/jls-08>)) ou uma _NormalInterfaceDeclaration_ ([§9.1](<#/doc/jls/jls-09>)).

     * Para `when`, quando reconhecido como um terminal em um _Guard_ ([§14.11.1](<#/doc/jls/jls-14>)).

  2. A sequência não é imediatamente precedida ou imediatamente seguida por um caractere de entrada que corresponde a _JavaLetterOrDigit_.

Em geral, omitir acidentalmente espaços em branco no código-fonte fará com que uma sequência de caracteres de entrada seja tokenizada como um identificador, devido à regra da "tradução mais longa possível" ([§3.2](<#/doc/jls/jls-03>)). Por exemplo, a sequência de doze caracteres de entrada `p u b l i c s t a t i c` é sempre tokenizada como o identificador `publicstatic`, em vez de como as palavras-chave reservadas `public` e `static`. Se dois tokens forem pretendidos, eles devem ser separados por espaço em branco ou um comentário.

A regra acima funciona em conjunto com a regra da "tradução mais longa possível" para produzir um resultado intuitivo em contextos onde palavras-chave contextuais podem aparecer. Por exemplo, a sequência de onze caracteres de entrada `v a r f i l e n a m e` é geralmente tokenizada como o identificador `varfilename`, mas em uma declaração de variável local, os três primeiros caracteres de entrada são tentativamente reconhecidos como a palavra-chave contextual `var` pela primeira condição da regra acima. No entanto, seria confuso ignorar a falta de espaço em branco na sequência reconhecendo os próximos oito caracteres de entrada como o identificador `filename`. (Isso significaria que a sequência passa por tokenização diferente em contextos diferentes: um identificador na maioria dos contextos, mas uma palavra-chave contextual e um identificador em declarações de variáveis locais.) Consequentemente, a segunda condição impede o reconhecimento da palavra-chave contextual `var` com base no fato de que o caractere de entrada imediatamente seguinte `f` é um _JavaLetterOrDigit_. A sequência `v a r f i l e n a m e` é, portanto, tokenizada como o identificador `varfilename` em uma declaração de variável local.

Como outro exemplo do reconhecimento cuidadoso de palavras-chave contextuais, considere a sequência de 15 caracteres de entrada `n o n - s e a l e d c l a s s`. Esta sequência é geralmente traduzida para três tokens - o identificador `non`, o operador `-`, e o identificador `sealedclass` - mas em uma declaração de classe normal, onde a primeira condição é verdadeira, os dez primeiros caracteres de entrada são tentativamente reconhecidos como a palavra-chave contextual `non-sealed`. Para evitar traduzir a sequência para dois tokens de palavra-chave (`non-sealed` e `class`) em vez de três tokens não-palavra-chave, e para evitar recompensar o programador por omitir espaço em branco antes de `class`, a segunda condição impede o reconhecimento da palavra-chave contextual. A sequência `n o n - s e a l e d c l a s s` é, portanto, tokenizada como três tokens em uma declaração de classe.

Na regra acima, a primeira condição depende dos detalhes da gramática sintática, mas um compilador para a linguagem de programação Java pode implementar a regra sem analisar completamente o programa de entrada. Por exemplo, uma heurística poderia ser usada para rastrear o estado contextual do tokenizador, desde que a heurística garanta que usos válidos de palavras-chave contextuais sejam tokenizados como palavras-chave, e usos válidos de identificadores sejam tokenizados como identificadores. Alternativamente, um compilador poderia sempre tokenizar uma palavra-chave contextual como um identificador, deixando para uma fase posterior o reconhecimento de usos especiais desses identificadores.

## 3.10. Literals

Um _literal_ é a representação no código-fonte de um valor de um tipo primitivo ([§4.2](<#/doc/jls/jls-04>)), do tipo `String` ([§4.3.3](<#/doc/jls/jls-04>)), ou do tipo null ([§4.1](<#/doc/jls/jls-04>)).

Literal:

[IntegerLiteral](<#/doc/jls/jls-03>)
[FloatingPointLiteral](<#/doc/jls/jls-03>)
[BooleanLiteral](<#/doc/jls/jls-03>)
[CharacterLiteral](<#/doc/jls/jls-03>)
[StringLiteral](<#/doc/jls/jls-03>)
[TextBlock](<#/doc/jls/jls-03>)
[NullLiteral](<#/doc/jls/jls-03>)

### 3.10.1. Integer Literals

Um _literal inteiro_ pode ser expresso em decimal (base 10), hexadecimal (base 16), octal (base 8) ou binário (base 2).

IntegerLiteral:

[DecimalIntegerLiteral](<#/doc/jls/jls-03>)
[HexIntegerLiteral](<#/doc/jls/jls-03>)
[OctalIntegerLiteral](<#/doc/jls/jls-03>)
[BinaryIntegerLiteral](<#/doc/jls/jls-03>)

DecimalIntegerLiteral:

[DecimalNumeral](<#/doc/jls/jls-03>) [[IntegerTypeSuffix](<#/doc/jls/jls-03>)]

HexIntegerLiteral:

[HexNumeral](<#/doc/jls/jls-03>) [[IntegerTypeSuffix](<#/doc/jls/jls-03>)]

OctalIntegerLiteral:

[OctalNumeral](<#/doc/jls/jls-03>) [[IntegerTypeSuffix](<#/doc/jls/jls-03>)]

BinaryIntegerLiteral:

[BinaryNumeral](<#/doc/jls/jls-03>) [[IntegerTypeSuffix](<#/doc/jls/jls-03>)]

IntegerTypeSuffix:

(um de)
`l` `L`

Um literal inteiro é do tipo `long` se for sufixado com uma letra ASCII `L` ou `l` (ele); caso contrário, é do tipo `int` ([§4.2.1](<#/doc/jls/jls-04>)).

O sufixo `L` é preferido, porque a letra `l` (ele) é frequentemente difícil de distinguir do dígito `1` (um).

Sublinhados são permitidos como separadores entre dígitos que denotam o inteiro.

Em um literal hexadecimal ou binário, o inteiro é denotado apenas pelos dígitos após os caracteres `0x` ou `0b` e antes de qualquer sufixo de tipo. Portanto, sublinhados não podem aparecer imediatamente após `0x` ou `0b`, ou após o último dígito no numeral.

Em um literal decimal ou octal, o inteiro é denotado por _todos_ os dígitos no literal antes de qualquer sufixo de tipo. Portanto, sublinhados não podem aparecer antes do primeiro dígito ou depois do último dígito no numeral. Sublinhados podem aparecer após o `0` inicial em um numeral octal (já que `0` é um dígito que denota parte do inteiro) e após o dígito inicial não-zero em um literal decimal não-zero.

Um numeral decimal é o único dígito ASCII `0`, representando o inteiro zero, ou consiste em um dígito ASCII de `1` a `9` opcionalmente seguido por um ou mais dígitos ASCII de `0` a `9` intercalados com sublinhados, representando um inteiro positivo.

DecimalNumeral:

`0`
[NonZeroDigit](<#/doc/jls/jls-03>) [[Digits](<#/doc/jls/jls-03>)]
[NonZeroDigit](<#/doc/jls/jls-03>) [Underscores](<#/doc/jls/jls-03>) [Digits](<#/doc/jls/jls-03>)

NonZeroDigit:

(um de)
`1 2 3 4 5 6 7 8 9`

Digits:

[Digit](<#/doc/jls/jls-03>)
[Digit](<#/doc/jls/jls-03>) [[DigitsAndUnderscores](<#/doc/jls/jls-03>)] [Digit](<#/doc/jls/jls-03>)

Digit:

`0`
[NonZeroDigit](<#/doc/jls/jls-03>)

DigitsAndUnderscores:

[DigitOrUnderscore](<#/doc/jls/jls-03>) {[DigitOrUnderscore](<#/doc/jls/jls-03>)}

DigitOrUnderscore:

[Digit](<#/doc/jls/jls-03>)
`_`

Underscores:

`_` {`_`}

Um numeral hexadecimal consiste nos caracteres ASCII iniciais `0x` ou `0X` seguidos por um ou mais dígitos hexadecimais ASCII intercalados com sublinhados, e pode representar um inteiro positivo, zero ou negativo.

Dígitos hexadecimais com valores de 10 a 15 são representados pelas letras ASCII `a` a `f` ou `A` a `F`, respectivamente; cada letra usada como um dígito hexadecimal pode ser maiúscula ou minúscula.

HexNumeral:

`0` `x` [HexDigits](<#/doc/jls/jls-03>)
`0` `X` [HexDigits](<#/doc/jls/jls-03>)

HexDigits:

[HexDigit](<#/doc/jls/jls-03>)
[HexDigit](<#/doc/jls/jls-03>) [[HexDigitsAndUnderscores](<#/doc/jls/jls-03>)] [HexDigit](<#/doc/jls/jls-03>)

HexDigit:

(um de)
`0 1 2 3 4 5 6 7 8 9 a b c d e f A B C D E F`

HexDigitsAndUnderscores:

[HexDigitOrUnderscore](<#/doc/jls/jls-03>) {[HexDigitOrUnderscore](<#/doc/jls/jls-03>)}

HexDigitOrUnderscore:

[HexDigit](<#/doc/jls/jls-03>)
`_`

A produção _HexDigit_ acima vem de [§3.3](<#/doc/jls/jls-03>).

Um numeral octal consiste em um dígito ASCII `0` seguido por um ou mais dos dígitos ASCII `0` a `7` intercalados com sublinhados, e pode representar um inteiro positivo, zero ou negativo.

OctalNumeral:

`0` [OctalDigits](<#/doc/jls/jls-03>)
`0` [Underscores](<#/doc/jls/jls-03>) [OctalDigits](<#/doc/jls/jls-03>)

OctalDigits:

[OctalDigit](<#/doc/jls/jls-03>)
[OctalDigit](<#/doc/jls/jls-03>) [[OctalDigitsAndUnderscores](<#/doc/jls/jls-03>)] [OctalDigit](<#/doc/jls/jls-03>)

OctalDigit:

(um de)
`0 1 2 3 4 5 6 7`

OctalDigitsAndUnderscores:

[OctalDigitOrUnderscore](<#/doc/jls/jls-03>) {[OctalDigitOrUnderscore](<#/doc/jls/jls-03>)}

OctalDigitOrUnderscore:

[OctalDigit](<#/doc/jls/jls-03>)
`_`

Note que os numerais octais sempre consistem em dois ou mais dígitos, pois `0` sozinho é sempre considerado um numeral decimal - não que isso importe muito na prática, pois os numerais `0`, `00` e `0x0` todos representam exatamente o mesmo valor inteiro.

Um numeral binário consiste nos caracteres ASCII iniciais `0b` ou `0B` seguidos por um ou mais dos dígitos ASCII `0` ou `1` intercalados com sublinhados, e pode representar um inteiro positivo, zero ou negativo.

BinaryNumeral:

`0` `b` [BinaryDigits](<#/doc/jls/jls-03>)
`0` `B` [BinaryDigits](<#/doc/jls/jls-03>)

BinaryDigits:

[BinaryDigit](<#/doc/jls/jls-03>)
[BinaryDigit](<#/doc/jls/jls-03>) [[BinaryDigitsAndUnderscores](<#/doc/jls/jls-03>)] [BinaryDigit](<#/doc/jls/jls-03>)

BinaryDigit:

(um de)
`0` `1`

BinaryDigitsAndUnderscores:

[BinaryDigitOrUnderscore](<#/doc/jls/jls-03>) {[BinaryDigitOrUnderscore](<#/doc/jls/jls-03>)}

BinaryDigitOrUnderscore:

[BinaryDigit](<#/doc/jls/jls-03>)
`_`

O maior literal decimal do tipo `int` é `2147483648` (231).

Todos os literais decimais de `0` a `2147483647` podem aparecer em qualquer lugar onde um literal `int` possa aparecer. O literal decimal `2147483648` pode aparecer apenas como operando do operador de menos unário `-` ([§15.15.4](<#/doc/jls/jls-15>)).

É um erro em tempo de compilação se o literal decimal `2147483648` aparecer em qualquer lugar que não seja como operando do operador de menos unário; ou se um literal decimal do tipo `int` for maior que `2147483648` (231).

Os maiores literais positivos hexadecimal, octal e binário do tipo `int` - cada um dos quais representa o valor decimal `2147483647` (231-1) - são, respectivamente:

  * `0x7fff_ffff`,

  * `0177_7777_7777`, e

  * `0b0111_1111_1111_1111_1111_1111_1111_1111`

Os literais mais negativos hexadecimal, octal e binário do tipo `int` - cada um dos quais representa o valor decimal `-2147483648` (-231) - são, respectivamente:

  * `0x8000_0000`,

  * `0200_0000_0000`, e

  * `0b1000_0000_0000_0000_0000_0000_0000_0000`

Os seguintes literais hexadecimal, octal e binário representam o valor decimal `-1`:

  * `0xffff_ffff`,

  * `0377_7777_7777`, e

  * `0b1111_1111_1111_1111_1111_1111_1111_1111`

É um erro em tempo de compilação se um literal `int` hexadecimal, octal ou binário não couber em 32 bits.

O maior literal decimal do tipo `long` é `9223372036854775808L` (263).

Todos os literais decimais de `0L` a `9223372036854775807L` podem aparecer em qualquer lugar onde um literal `long` possa aparecer. O literal decimal `9223372036854775808L` pode aparecer apenas como operando do operador de menos unário `-` ([§15.15.4](<#/doc/jls/jls-15>)).

É um erro em tempo de compilação se o literal decimal `9223372036854775808L` aparecer em qualquer lugar que não seja como operando do operador de menos unário; ou se um literal decimal do tipo `long` for maior que `9223372036854775808L` (263).

Os maiores literais positivos hexadecimal, octal e binário do tipo `long` - cada um dos quais representa o valor decimal `9223372036854775807L` (263-1) - são, respectivamente:

  * `0x7fff_ffff_ffff_ffffL`,

  * `07_7777_7777_7777_7777_7777L`, e

  * ` 0b0111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111L `

Os literais mais negativos hexadecimal, octal e binário do tipo `long` - cada um dos quais representa o valor decimal `-9223372036854775808L` (-263) - são, respectivamente:

  * `0x8000_0000_0000_0000L`, e

  * `010_0000_0000_0000_0000_0000L`, e

  * ` 0b1000_0000_0000_0000_0000_0000_0000_0000_0000_0000_0000_0000_0000_0000_0000_0000L `

Os seguintes literais hexadecimal, octal e binário representam o valor decimal `-1L`:

  * `0xffff_ffff_ffff_ffffL`,

  * `017_7777_7777_7777_7777_7777L`, e

  * ` 0b1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111L `

É um erro em tempo de compilação se um literal `long` hexadecimal, octal ou binário não couber em 64 bits.

Exemplos de literais `int`:
```
    0    2    0372    0xDada_Cafe    1996    0x00_FF__00_FF
    
```

Exemplos de literais `long`:
```
    0l    0777L    0x100000000L    2_147_483_648L    0xC0B0L
    
```

### 3.10.2. Floating-Point Literals

Um _literal de ponto flutuante_ possui as seguintes partes: uma parte de número inteiro, um ponto decimal ou hexadecimal (representado por um caractere de ponto ASCII), uma parte fracionária, um expoente e um sufixo de tipo.

Um literal de ponto flutuante pode ser expresso em decimal (base 10) ou hexadecimal (base 16).

Para literais de ponto flutuante decimais, é necessário pelo menos um dígito (na parte inteira ou na parte fracionária) e um ponto decimal, um expoente ou um sufixo de tipo float. Todas as outras partes são opcionais. O expoente, se presente, é indicado pela letra ASCII `e` ou `E` seguida por um inteiro opcionalmente com sinal.

Para literais de ponto flutuante hexadecimais, é necessário pelo menos um dígito (na parte inteira ou na parte fracionária), e o expoente é obrigatório, e o sufixo de tipo float é opcional. O expoente é indicado pela letra ASCII `p` ou `P` seguida por um inteiro opcionalmente com sinal.

Sublinhados são permitidos como separadores entre dígitos que denotam a parte inteira, e entre dígitos que denotam a parte fracionária, e entre dígitos que denotam o expoente.

FloatingPointLiteral:

[DecimalFloatingPointLiteral](<#/doc/jls/jls-03>)
[HexadecimalFloatingPointLiteral](<#/doc/jls/jls-03>)

DecimalFloatingPointLiteral:

[Digits](<#/doc/jls/jls-03>) `.` [[Digits](<#/doc/jls/jls-03>)] [[ExponentPart](<#/doc/jls/jls-03>)] [[FloatTypeSuffix](<#/doc/jls/jls-03>)]
`.` [Digits](<#/doc/jls/jls-03>) [[ExponentPart](<#/doc/jls/jls-03>)] [[FloatTypeSuffix](<#/doc/jls/jls-03>)]
[Digits](<#/doc/jls/jls-03>) [ExponentPart](<#/doc/jls/jls-03>) [[FloatTypeSuffix](<#/doc/jls/jls-03>)]
[Digits](<#/doc/jls/jls-03>) [[ExponentPart](<#/doc/jls/jls-03>)] [FloatTypeSuffix](<#/doc/jls/jls-03>)

ExponentPart:

[ExponentIndicator](<#/doc/jls/jls-03>) [SignedInteger](<#/doc/jls/jls-03>)

ExponentIndicator:

(um de)
`e E`

SignedInteger:

[[Sign](<#/doc/jls/jls-03>)] [Digits](<#/doc/jls/jls-03>)

Sign:

(um de)
`+ -`

FloatTypeSuffix:

(um de)
`f F d D`

HexadecimalFloatingPointLiteral:

[HexSignificand](<#/doc/jls/jls-03>) [BinaryExponent](<#/doc/jls/jls-03>) [[FloatTypeSuffix](<#/doc/jls/jls-03>)]

HexSignificand:

[HexNumeral](<#/doc/jls/jls-03>) [`.`]
`0` `x` [[HexDigits](<#/doc/jls/jls-03>)] `.` [HexDigits](<#/doc/jls/jls-03>)
`0` `X` [[HexDigits](<#/doc/jls/jls-03>)] `.` [HexDigits](<#/doc/jls/jls-03>)

BinaryExponent:

[BinaryExponentIndicator](<#/doc/jls/jls-03>) [SignedInteger](<#/doc/jls/jls-03>)

BinaryExponentIndicator:

(um de)
`p P`

Um literal de ponto flutuante é do tipo `float` se for sufixado com uma letra ASCII `F` ou `f`; caso contrário, seu tipo é `double` e pode ser opcionalmente sufixado com uma letra ASCII `D` ou `d`.

Os elementos dos tipos `float` e `double` são aqueles valores que podem ser representados usando os formatos de ponto flutuante binário IEEE 754 binary32 e IEEE 754 binary64, respectivamente ([§4.2.3](<#/doc/jls/jls-04>)).

Os detalhes da conversão de entrada adequada de uma representação de string Unicode de um número de ponto flutuante para a representação interna de ponto flutuante binário IEEE 754 são descritos para os métodos `valueOf` da classe `Float` e da classe `Double` do pacote `java.lang`.

Os maiores e menores literais positivos do tipo `float` são os seguintes:

  * O maior valor `float` finito positivo é numericamente igual a (2 - 2-23) ⋅ 2127.

O literal decimal mais curto que arredonda para este valor é `3.4028235e38f`.

Um literal hexadecimal para este valor é `0x1.fffffeP+127f`.

  * O menor valor `float` finito positivo não-zero é numericamente igual a 2-149.

O literal decimal mais curto que arredonda para este valor é `1.4e-45f`.

Dois literais hexadecimais para este valor são `0x0.000002P-126f` e `0x1.0P-149f`.

Os maiores e menores literais positivos do tipo `double` são os seguintes:

  * O maior valor `double` finito positivo é numericamente igual a (2 - 2-52) ⋅ 21023.

O literal decimal mais curto que arredonda para este valor é `1.7976931348623157e308`.

Um literal hexadecimal para este valor é `0x1.f_ffff_ffff_ffffP+1023`.

  * O menor valor `double` finito positivo não-zero é numericamente igual a 2-1074.

O literal decimal mais curto que arredonda para este valor é `4.9e-324`.

Dois literais hexadecimais para este valor são `0x0.0_0000_0000_0001P-1022` e `0x1.0P-1074`.

É um erro em tempo de compilação se um literal de ponto flutuante não-zero for muito grande, de modo que, na conversão arredondada para sua representação interna, ele se torne um infinito IEEE 754.

Um programa pode representar infinitos sem produzir um erro em tempo de compilação usando expressões constantes como `1f/0f` ou `-1d/0d` ou usando as constantes predefinidas `POSITIVE_INFINITY` e `NEGATIVE_INFINITY` das classes `Float` e `Double`.

É um erro em tempo de compilação se um literal de ponto flutuante não-zero for muito pequeno, de modo que, na conversão arredondada para sua representação interna, ele se torne um zero.

Um erro em tempo de compilação não ocorre se um literal de ponto flutuante não-zero tiver um valor pequeno que, na conversão arredondada para sua representação interna, se torne um número subnormal não-zero.
Constantes predefinidas que representam valores Not-a-Number são definidas nas classes `Float` e `Double` como `Float.NaN` e `Double.NaN`.

Exemplos de literais `float`:
```
    1e1f    2.f    .3f    0f    3.14f    6.022137e+23f
    
```

Exemplos de literais `double`:
```
    1e1    2.    .3    0.0    3.14    1e-9d    1e137
    
```

### 3.10.3. Literais Booleanos

O tipo `boolean` possui dois valores, representados pelos _literais booleanos_ `true` e `false`, formados por letras ASCII.

LiteralBooleano:

(um de)   
`true` `false`

Um literal booleano é sempre do tipo `boolean` ([§4.2.5](<#/doc/jls/jls-04>)).

### 3.10.4. Literais de Caractere

Um _literal de caractere_ é expresso como um caractere ou uma sequência de escape ([§3.10.7](<#/doc/jls/jls-03>)), delimitado por aspas simples ASCII. (O caractere de aspa simples, ou apóstrofo, é `\u0027`.)

LiteralDeCaractere:

`'` [CaractereUnico](<#/doc/jls/jls-03>) `'`   
`'` [SequenciaDeEscape](<#/doc/jls/jls-03>) `'`

CaractereUnico:

[CaractereDeEntrada](<#/doc/jls/jls-03>) mas não `'` ou `\`

Um literal de caractere é sempre do tipo `char` ([§4.2.1](<#/doc/jls/jls-04>)).

O _conteúdo_ de um literal de caractere é o _CaractereUnico_ ou a _SequenciaDeEscape_ que segue a aspa simples de abertura `'`.

É um erro em tempo de compilação se o caractere que segue o conteúdo não for um `'`.

É um erro em tempo de compilação se um terminador de linha ([§3.4](<#/doc/jls/jls-03>)) aparecer após a aspa simples de abertura `'` e antes da aspa simples de fechamento `'`.

Os caracteres CR e LF nunca são um _CaractereDeEntrada_; cada um é reconhecido como constituindo um _TerminadorDeLinha_, portanto não podem aparecer em um literal de caractere, mesmo na sequência de escape `\` _TerminadorDeLinha_.

O _caractere representado por um literal de caractere_ é o conteúdo do literal de caractere com qualquer sequência de escape interpretada, como se fosse pela execução de `String.translateEscapes` no conteúdo.

Literais de caractere só podem representar unidades de código UTF-16 ([§3.1](<#/doc/jls/jls-03>)), ou seja, são limitados a valores de `\u0000` a `\uffff`. É um erro em tempo de compilação tentar representar um caractere suplementar em um literal de caractere. Caracteres suplementares devem ser representados como um par substituto dentro de uma sequência `char`, ou como um inteiro, dependendo da API com a qual são usados.

Os seguintes são exemplos de literais `char`:

  * `'a'`

  * `'%'`

  * `'\t'`

  * `'\\'`

  * `'\''`

  * `'\u03a9'`

  * `'\uFFFF'`

  * `'\177'`

  * `'™'`

Como os escapes Unicode são processados muito cedo, não é correto escrever `'\u000a'` para um literal de caractere cujo valor é linefeed (LF); o escape Unicode `\u000a` é transformado em um linefeed real na etapa de tradução 1 ([§3.3](<#/doc/jls/jls-03>)) e o linefeed se torna um _TerminadorDeLinha_ na etapa 2 ([§3.4](<#/doc/jls/jls-03>)), então o literal de caractere não é válido na etapa 3. Em vez disso, deve-se usar a sequência de escape `'\n'`. Da mesma forma, não é correto escrever `'\u000d'` para um literal de caractere cujo valor é carriage return (CR). Em vez disso, use `'\r'`. Finalmente, não é possível escrever `'\u0027'` para um literal de caractere contendo um apóstrofo (`'`).

Em C e C++, um literal de caractere pode conter representações de mais de um caractere, mas o valor de tal literal de caractere é definido pela implementação. Na linguagem de programação Java, um literal de caractere sempre representa exatamente um caractere.

### 3.10.5. Literais de String

Um _literal de string_ consiste em zero ou mais caracteres delimitados por aspas duplas. Caracteres como quebras de linha podem ser representados por sequências de escape ([§3.10.7](<#/doc/jls/jls-03>)).

LiteralDeString:

`"` {[CaractereDeString](<#/doc/jls/jls-03>)} `"`

CaractereDeString:

[CaractereDeEntrada](<#/doc/jls/jls-03>) mas não `"` ou `\`   
[SequenciaDeEscape](<#/doc/jls/jls-03>)

Um literal de string é sempre do tipo `String` ([§4.3.3](<#/doc/jls/jls-04>)).

O _conteúdo_ de um literal de string é a sequência de caracteres que começa imediatamente após a aspa dupla de abertura `"` e termina imediatamente antes da aspa dupla de fechamento correspondente `"`.

É um erro em tempo de compilação se um terminador de linha ([§3.4](<#/doc/jls/jls-03>)) aparecer após a aspa dupla de abertura `"` e antes da aspa dupla de fechamento correspondente `"`.

Os caracteres CR e LF nunca são um _CaractereDeEntrada_; cada um é reconhecido como constituindo um _TerminadorDeLinha_, portanto não podem aparecer em um literal de string, mesmo na sequência de escape `\` _TerminadorDeLinha_.

A string representada por um literal de string é o conteúdo do literal de string com cada sequência de escape interpretada, como se fosse pela execução de `String.translateEscapes` no conteúdo.

Os seguintes são exemplos de literais de string:
```
    ""                    // the empty string
    "\""                  // a string containing " alone
    "This is a string"    // a string containing 16 characters
    "This is a " +        // actually a string-valued constant expression,
        "two-line string"    // formed from two string literals
    
```

Como os escapes Unicode são processados muito cedo, não é correto escrever `"\u000a"` para um literal de string contendo um único linefeed (LF); o escape Unicode `\u000a` é transformado em um linefeed real na etapa de tradução 1 ([§3.3](<#/doc/jls/jls-03>)) e o linefeed se torna um _TerminadorDeLinha_ na etapa 2 ([§3.4](<#/doc/jls/jls-03>)), então o literal de string não é válido na etapa 3. Em vez disso, deve-se usar a sequência de escape `"\n"`. Da mesma forma, não é correto escrever `"\u000d"` para um literal de string contendo um único carriage return (CR). Em vez disso, use `"\r"`. Finalmente, não é possível escrever `"\u0022"` para um literal de string contendo uma aspa dupla (`"`).

Um literal de string longo pode sempre ser dividido em partes menores e escrito como uma expressão (possivelmente entre parênteses) usando o operador de concatenação de string `+` ([§15.18.1](<#/doc/jls/jls-15>)).

Em tempo de execução, um literal de string é uma referência a uma instância da classe `String` ([§4.3.3](<#/doc/jls/jls-04>)) que denota a string representada pelo literal de string.

Além disso, um literal de string sempre se refere à _mesma_ instância da classe `String`. Isso ocorre porque os literais de string - ou, mais geralmente, strings que são os valores de expressões constantes ([§15.29](<#/doc/jls/jls-15>)) - são "internados" para compartilhar instâncias únicas, como se fosse pela execução do método `String.intern` ([§12.5](<#/doc/jls/jls-12>)).

**Exemplo 3.10.5-1. Literais de String**

O programa consistindo da unidade de compilação ([§7.3](<#/doc/jls/jls-07>)):
```
    package testPackage;
    class Test {
        public static void main(String[] args) {
            String hello = "Hello", lo = "lo";
            System.out.println(hello == "Hello");
            System.out.println(Other.hello == hello);
            System.out.println(other.Other.hello == hello);
            System.out.println(hello == ("Hel"+"lo"));
            System.out.println(hello == ("Hel"+lo));
            System.out.println(hello == ("Hel"+lo).intern());
        }
    }
    class Other { static String hello = "Hello"; }
    
```

e da unidade de compilação:
```
    package other;
    public class Other { public static String hello = "Hello"; }
    
```

produz a saída:
```
    true
    true
    true
    true
    false
    true
    
```

Este exemplo ilustra seis pontos:

  * Literais de string na mesma classe e pacote representam referências ao mesmo objeto `String` ([§4.3.1](<#/doc/jls/jls-04>)).

  * Literais de string em classes diferentes no mesmo pacote representam referências ao mesmo objeto `String`.

  * Literais de string em classes diferentes em pacotes diferentes também representam referências ao mesmo objeto `String`.

  * Strings concatenadas a partir de expressões constantes ([§15.29](<#/doc/jls/jls-15>)) são computadas em tempo de compilação e então tratadas como se fossem literais.

  * Strings computadas por concatenação em tempo de execução são recém-criadas e, portanto, distintas.

  * O resultado de internar explicitamente uma string computada é o mesmo objeto `String` que qualquer literal de string pré-existente com o mesmo conteúdo.

### 3.10.6. Blocos de Texto

Um _bloco de texto_ consiste em zero ou mais caracteres delimitados por delimitadores de abertura e fechamento. Caracteres podem ser representados por sequências de escape ([§3.10.7](<#/doc/jls/jls-03>)), mas os caracteres de nova linha e aspas duplas que devem ser representados com sequências de escape em um literal de string ([§3.10.5](<#/doc/jls/jls-03>)) podem ser representados diretamente em um bloco de texto.

BlocoDeTexto:

`"` `"` `"` {[EspacoEmBrancoDeBlocoDeTexto](<#/doc/jls/jls-03>)} [TerminadorDeLinha](<#/doc/jls/jls-03>) {[CaractereDeBlocoDeTexto](<#/doc/jls/jls-03>)} `"` `"` `"`

EspacoEmBrancoDeBlocoDeTexto:

[EspacoEmBranco](<#/doc/jls/jls-03>) mas não [TerminadorDeLinha](<#/doc/jls/jls-03>)

CaractereDeBlocoDeTexto:

[CaractereDeEntrada](<#/doc/jls/jls-03>) mas não `\`   
[SequenciaDeEscape](<#/doc/jls/jls-03>)   
[TerminadorDeLinha](<#/doc/jls/jls-03>)

As seguintes produções de [§3.3](<#/doc/jls/jls-03>), [§3.4](<#/doc/jls/jls-03>) e [§3.6](<#/doc/jls/jls-03>) são mostradas aqui para conveniência:

EspacoEmBranco:

o caractere ASCII SP, também conhecido como "espaço"   
o caractere ASCII HT, também conhecido como "tabulação horizontal"   
o caractere ASCII FF, também conhecido como "salto de página"   
[TerminadorDeLinha](<#/doc/jls/jls-03>)

TerminadorDeLinha:

o caractere ASCII LF, também conhecido como "nova linha"   
o caractere ASCII CR, também conhecido como "retorno de carro"   
o caractere ASCII CR seguido pelo caractere ASCII LF

CaractereDeEntrada:

[CaractereDeEntradaUnicode](<#/doc/jls/jls-03>) mas não CR ou LF

CaractereDeEntradaUnicode:

[EscapeUnicode](<#/doc/jls/jls-03>)   
[CaractereDeEntradaBruto](<#/doc/jls/jls-03>)

EscapeUnicode:

`\` [MarcadorUnicode](<#/doc/jls/jls-03>) [DigitoHexadecimal](<#/doc/jls/jls-03>) [DigitoHexadecimal](<#/doc/jls/jls-03>) [DigitoHexadecimal](<#/doc/jls/jls-03>) [DigitoHexadecimal](<#/doc/jls/jls-03>)

CaractereDeEntradaBruto:

qualquer caractere Unicode representável em UTF-16

Um bloco de texto é sempre do tipo `String` ([§4.3.3](<#/doc/jls/jls-04>)).

O _delimitador de abertura_ é uma sequência que começa com três caracteres de aspas duplas (`"""`), continua com zero ou mais caracteres de espaço, tabulação e salto de página, e conclui com um terminador de linha.

O _delimitador de fechamento_ é uma sequência de três caracteres de aspas duplas.

O _conteúdo_ de um bloco de texto é a sequência de caracteres que começa imediatamente após o terminador de linha do delimitador de abertura e termina imediatamente antes da primeira aspa dupla do delimitador de fechamento.

Ao contrário de um literal de string ([§3.10.5](<#/doc/jls/jls-03>)), _não_ é um erro em tempo de compilação para um terminador de linha aparecer no conteúdo de um bloco de texto.

**Exemplo 3.10.6-1. Blocos de Texto**

Quando strings de várias linhas são desejadas, um bloco de texto é geralmente mais legível do que uma concatenação de literais de string. Por exemplo, compare estas representações alternativas de um trecho de HTML:
```
    
    String html = "<html>\n" +
                  "    <body>\n" +
                  "        <p>Hello, world</p>\n" +
                  "    </body>\n" +
                  "</html>\n";
    
    String html = """
                  <html>
                      <body>
                          <p>Hello, world</p>
                      </body>
                  </html>
                  """;
    
    
```

Os seguintes são exemplos de blocos de texto:
```
    class Test {
        public static void main(String[] args) {
            // The six characters w i n t e r
            String season = """
                            winter""";
    
            // The seven characters w i n t e r LF
            String period = """
                            winter
                            """;
    
            // The ten characters H i , SP " B o b " LF
            String greeting = """
                              Hi, "Bob"
                              """;
    
            // The eleven characters H i , LF SP " B o b " LF
            String salutation = """
                                Hi,
                                 "Bob"
                                """;
    
            // The empty string (zero length)
            String empty = """
                           """;
    
            // The two characters " LF
            String quote = """
                           "
                           """;
    
            // The two characters \ LF
            String backslash = """
                               \\
                               """;
        }
    }
    
    
```

O uso das sequências de escape `\n` e `\"` para representar um caractere de nova linha e um caractere de aspas duplas, respectivamente, é permitido em um bloco de texto, embora geralmente não seja necessário. A exceção é quando três caracteres de aspas duplas consecutivos aparecem e não se destinam a ser o delimitador de fechamento `"""` - neste caso, é necessário escapar pelo menos um dos caracteres de aspas duplas para evitar imitar o delimitador de fechamento.

**Exemplo 3.10.6-2. Sequências de escape em blocos de texto**

No programa a seguir, o valor da variável `story` seria menos legível se caracteres de aspas duplas individuais fossem escapados:
```
    class Story1 {
        public static void main(String[] args) {
            String story = """
                "When I use a word," Humpty Dumpty said,
                in rather a scornful tone, "it means just what I
                choose it to mean - neither more nor less."
                "The question is," said Alice, "whether you
                can make words mean so many different things."
                "The question is," said Humpty Dumpty,
                "which is to be master - that's all."
            """;
        }
    }
    
```

Se o programa for modificado para colocar o delimitador de fechamento na última linha do conteúdo, ocorrerá um erro porque os três primeiros caracteres de aspas duplas consecutivos na última linha são traduzidos ([§3.2](<#/doc/jls/jls-03>)) para o delimitador de fechamento `"""` e, assim, um caractere de aspas duplas solto permanece:
```
    class Story2 {
        public static void main(String[] args) {
            String story = """
                "When I use a word," Humpty Dumpty said,
                in rather a scornful tone, "it means just what I
                choose it to mean - neither more nor less."
                "The question is," said Alice, "whether you
                can make words mean so many different things."
                "The question is," said Humpty Dumpty,
                "which is to be master - that's all."""";  // error
        }
    }
    
```

O erro pode ser evitado escapando o caractere de aspas duplas final no conteúdo:
```
    class Story3 {
        public static void main(String[] args) {
            String story = """
                "When I use a word," Humpty Dumpty said,
                in rather a scornful tone, "it means just what I
                choose it to mean - neither more nor less."
                "The question is," said Alice, "whether you
                can make words mean so many different things."
                "The question is," said Humpty Dumpty,
                "which is to be master - that's all.\"""";  // OK
        }
    }
    
```

Se um bloco de texto se destina a denotar outro bloco de texto, então é recomendado escapar o primeiro caractere de aspas duplas dos delimitadores de abertura e fechamento incorporados:
```
    class Code {
        public static void main(String[] args) {
            String text = """
                The quick brown fox jumps over the lazy dog
            """;
    
            String code =
                """
                String text = \"""
                    The quick brown fox jumps over the lazy dog
                \""";
                """;
        }
    }
    
```

A string representada por um bloco de texto _não_ é a sequência literal de caracteres no conteúdo. Em vez disso, a string representada por um bloco de texto é o resultado da aplicação das seguintes transformações ao conteúdo, em ordem:

  1. Terminadores de linha são _normalizados_ para o caractere ASCII LF, da seguinte forma:

     * Um caractere ASCII CR seguido por um caractere ASCII LF é traduzido para um caractere ASCII LF.

     * Um caractere ASCII CR é traduzido para um caractere ASCII LF.

  2. Espaços em branco incidentais são removidos, como se fosse pela execução de `String.stripIndent` nos caracteres resultantes da etapa 1.

  3. Sequências de escape são interpretadas, como se fosse pela execução de `String.translateEscapes` nos caracteres resultantes da etapa 2.

Quando esta especificação diz que um bloco de texto _contém_ um caractere ou sequência de caracteres particular, ou que um caractere ou sequência de caracteres particular está _em_ um bloco de texto, significa que a string representada pelo bloco de texto (em oposição à sequência literal de caracteres no conteúdo) contém o caractere ou sequência de caracteres.

**Exemplo 3.10.6-3. Ordem das transformações no conteúdo do bloco de texto**

Interpretar as sequências de escape por último permite aos programadores usar `\n`, `\f` e `\r` para formatação vertical de uma string sem afetar a normalização dos terminadores de linha, e usar `\b` e `\t` para formatação horizontal de uma string sem afetar a remoção de espaços em branco incidentais. Por exemplo, considere este bloco de texto que menciona a sequência de escape `\r` (CR):
```
    
    String html = """
                  <html>\r
                      <body>\r
                          <p>Hello, world</p>\r
                      </body>\r
                  </html>\r
                  """;
    
    
```

As sequências de escape `\r` não são interpretadas até que os terminadores de linha tenham sido normalizados para LF. Usando escapes Unicode para visualizar LF (`\u000A`) e CR (`\u000D`), e usando `|` para visualizar a margem esquerda, a string representada pelo bloco de texto é:
```
    
    |<html>\u000D\u000A
    |    <body>\u000D\u000A
    |        <p>Hello, world</p>\u000D\u000A
    |    </body>\u000D\u000A
    |</html>\u000D\u000A
    
    
```

Em tempo de execução, um bloco de texto é uma referência a uma instância da classe `String` que denota a string representada pelo bloco de texto.

Além disso, um bloco de texto sempre se refere à _mesma_ instância da classe `String`. Isso ocorre porque as strings representadas por blocos de texto - ou, mais geralmente, strings que são os valores de expressões constantes ([§15.29](<#/doc/jls/jls-15>)) - são "internadas" para compartilhar instâncias únicas, como se fosse pela execução do método `String.intern` ([§12.5](<#/doc/jls/jls-12>)).

**Exemplo 3.10.6-4. Blocos de texto avaliam para `String`

Blocos de texto podem ser usados onde quer que uma expressão do tipo `String` seja permitida, como na concatenação de strings ([§15.18.1](<#/doc/jls/jls-15>)), na invocação de métodos em instâncias de `String`, e em anotações com elementos `String`:
```
    
    System.out.println("ab" + """
                              cde
                              """);
    
    String cde = """
                 abcde""".substring(2);
    
    String math = """
                  1+1 equals \
                  """ + String.valueOf(2);
    
    @Preconditions("""
        rate > 0 &&
        rate <= MAX_REFRESH_RATE
    """)
    public void setRefreshRate(int rate) { ... }
    
    
```

### 3.10.7. Sequências de Escape

Em literais de caractere, literais de string e blocos de texto ([§3.10.4](<#/doc/jls/jls-03>), [§3.10.5](<#/doc/jls/jls-03>), [§3.10.6](<#/doc/jls/jls-03>)), as _sequências de escape_ permitem a representação de alguns caracteres não gráficos sem usar escapes Unicode ([§3.3](<#/doc/jls/jls-03>)), bem como os caracteres de aspa simples, aspa dupla e barra invertida.

SequenciaDeEscape:

`\ b ` (backspace BS, Unicode `\u0008`)   
`\ s ` (espaço SP, Unicode `\u0020`)   
`\ t ` (tabulação horizontal HT, Unicode `\u0009`)   
`\ n ` (linefeed LF, Unicode `\u000a`)   
`\ f ` (salto de página FF, Unicode `\u000c`)   
`\ r ` (retorno de carro CR, Unicode `\u000d`)   
`\` [TerminadorDeLinha](<#/doc/jls/jls-03>) (continuação de linha, sem representação Unicode)   
`\ " ` (aspas duplas `"`, Unicode `\u0022`)   
`\ ' ` (aspas simples `'`, Unicode `\u0027`)   
`\ \ ` (barra invertida `\`, Unicode `\u005c`)   
[EscapeOctal](<#/doc/jls/jls-03>) (valor octal, Unicode `\u0000` a `\u00ff`)

EscapeOctal:

`\` [DigitoOctal](<#/doc/jls/jls-03>)   
`\` [DigitoOctal](<#/doc/jls/jls-03>) [DigitoOctal](<#/doc/jls/jls-03>)   
`\` [ZeroATres](<#/doc/jls/jls-03>) [DigitoOctal](<#/doc/jls/jls-03>) [DigitoOctal](<#/doc/jls/jls-03>)   

DigitoOctal:

(um de)   
`0 1 2 3 4 5 6 7`

ZeroATres:

(um de)   
`0 1 2 3`

A produção _DigitoOctal_ acima vem de [§3.10.1](<#/doc/jls/jls-03>). Escapes octais são fornecidos para compatibilidade com C, mas podem expressar apenas valores Unicode `\u0000` a `\u00FF`, então escapes Unicode são geralmente preferidos.

É um erro em tempo de compilação se o caractere que segue uma barra invertida em uma sequência de escape não for um _TerminadorDeLinha_ ou um ASCII `b`, `s`, `t`, `n`, `f`, `r`, `"`, `'`, `\`, `0`, `1`, `2`, `3`, `4`, `5`, `6`, ou `7`.

Uma sequência de escape no conteúdo de um literal de caractere, literal de string ou bloco de texto é _interpretada_ substituindo seu `\` e caractere(s) subsequente(s) pelo único caractere denotado pelo escape Unicode na gramática _SequenciaDeEscape_. A sequência de escape de continuação de linha não possui escape Unicode correspondente, então é interpretada substituindo-a por nada.

A sequência de escape de continuação de linha pode aparecer em um bloco de texto, mas não pode aparecer em um literal de caractere ou em um literal de string porque cada um proíbe um _TerminadorDeLinha_.

### 3.10.8. O Literal Nulo

O tipo nulo possui um valor, a referência nula, representada pelo _literal nulo_ `null`, que é formado por caracteres ASCII.

LiteralNulo:

`null`

Um literal nulo é sempre do tipo nulo ([§4.1](<#/doc/jls/jls-04>)).
## 3.11. Separadores

Doze tokens, formados por caracteres ASCII, são os _separadores_ (pontuadores).

Separador:

(um de)

```
    (   )   {   }   [   ]   ;   ,   .   ...   @   ::
```

## 3.12. Operadores

38 tokens, formados por caracteres ASCII, são os _operadores_.

Operador:

(um de)

```
    =   >   <   !   ~   ?   :   ->
    ==  >=  <=  !=  &&  ||  ++  --
    +   -   *   /   &   |   ^   %   <<   >>   >>>
    +=  -=  *=  /=  &=  |=  ^=  %=  <<=  >>=  >>>=
```

* * *

[Anterior](<#/doc/jls/jls-02>) | | [Próximo](<#/doc/jls/jls-04>)
---|---|---
Capítulo 2. Gramáticas | [Início](<#/doc/jls/jls-01>) | Capítulo 4. Tipos, Valores e Variáveis

* * *

[ Aviso Legal ](<#/>)