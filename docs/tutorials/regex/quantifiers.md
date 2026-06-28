# Quantificadores

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Regulares ](<#/doc/tutorials/regex>) > Quantificadores

**Anterior na Série**

[Classes de Caracteres Predefinidas](<#/doc/tutorials/regex/predefined-character-classes>)

➜

**Tutorial Atual**

Quantificadores

➜

**Próximo na Série**

[Grupos de Captura](<#/doc/tutorials/regex/groups>)

**Anterior na Série:** [Classes de Caracteres Predefinidas](<#/doc/tutorials/regex/predefined-character-classes>)

**Próximo na Série:** [Grupos de Captura](<#/doc/tutorials/regex/groups>)

# Quantificadores

## Quantificadores

Quantificadores permitem que você especifique o número de ocorrências a serem correspondidas. Para sua conveniência, as três seções da especificação da API Pattern que descrevem quantificadores gulosos, relutantes e possessivos são apresentadas abaixo.

À primeira vista, pode parecer que os quantificadores `X?`, `X??` e `X?+` fazem exatamente a mesma coisa, já que todos prometem corresponder a "X, uma vez ou nenhuma". Existem diferenças sutis de implementação que serão explicadas perto do final desta seção.

Greedy | Reluctant | Possessive | Meaning
---|---|---|---
`X?` | `X??` | `X?+` | `X`, uma vez ou nenhuma
`X*` | `X*?` | `X*+` | `X`, zero ou mais vezes
`X+` | `X+?` | `X++` | `X`, uma ou mais vezes
`X{n}` | `X{n}?` | `X{n}+` | `X`, exatamente `n` vezes
`X{n,}` | `X{n,}?` | `X{n,}+` | `X`, pelo menos `n` vezes
`X{n,m}` | `X{n,m}?` | `X{n,m}+` | `X`, pelo menos `n` mas não mais que `m` vezes

Vamos começar nossa análise dos quantificadores gulosos criando três expressões regulares diferentes: a letra "a" seguida por `?`, `*`, ou `+`. Vamos ver o que acontece quando essas expressões são testadas contra uma string de entrada vazia "":

## Correspondências de Comprimento Zero

No exemplo acima, a correspondência é bem-sucedida nos dois primeiros casos porque as expressões `a?` e `a*` ambas permitem zero ocorrências da letra `a`. Você também notará que os índices de início e fim são ambos zero, o que é diferente de qualquer um dos exemplos que vimos até agora. A string de entrada vazia "" não tem comprimento, então o teste simplesmente não corresponde a nada no índice 0. Correspondências desse tipo são conhecidas como _correspondências de comprimento zero_.

Uma correspondência de comprimento zero pode ocorrer em vários casos:

  * em uma string de entrada vazia,
  * no início de uma string de entrada,
  * após o último caractere de uma string de entrada, ou entre quaisquer dois caracteres de uma string de entrada.

Correspondências de comprimento zero são facilmente identificáveis porque sempre começam e terminam na mesma posição de índice.

Vamos explorar correspondências de comprimento zero com mais alguns exemplos. Mude a string de entrada para uma única letra "a" e você notará algo interessante:

Todos os três quantificadores encontraram a letra "a", mas os dois primeiros também encontraram uma correspondência de comprimento zero no índice 1; ou seja, após o último caractere da string de entrada. Lembre-se, o matcher vê o caractere "a" como estando na célula entre o índice 0 e o índice 1, e nosso sistema de teste (test harness) faz um loop até não conseguir mais encontrar uma correspondência. Dependendo do quantificador usado, a presença de "nada" no índice após o último caractere pode ou não acionar uma correspondência.

Agora mude a string de entrada para a letra "a" cinco vezes seguidas e você obterá o seguinte:

A expressão `a?` encontra uma correspondência individual para cada caractere, já que corresponde quando "a" aparece zero ou uma vez. A expressão `a*` encontra duas correspondências separadas: todas as letras "a" na primeira correspondência, e então a correspondência de comprimento zero após o último caractere no índice 5. E finalmente, `a+` corresponde a todas as ocorrências da letra "a", ignorando a presença de "nada" no último índice.

Neste ponto, você pode estar se perguntando quais seriam os resultados se os dois primeiros quantificadores encontrassem uma letra diferente de "a". Por exemplo, o que acontece se ele encontrar a letra "b", como em "ababaaaab"?

Vamos descobrir:

Mesmo que a letra "b" apareça nas células 1, 3 e 8, a saída relata uma correspondência de comprimento zero nesses locais. A expressão regular `a?` não está procurando especificamente pela letra "b"; ela está apenas procurando pela presença (ou ausência) da letra "a". Se o quantificador permite uma correspondência de "a" zero vezes, qualquer coisa na string de entrada que não seja um "a" aparecerá como uma correspondência de comprimento zero. Os "a" restantes são correspondidos de acordo com as regras discutidas nos exemplos anteriores.

Para corresponder a um padrão exatamente `n` vezes, basta especificar o número dentro de um conjunto de chaves:

Aqui, a expressão regular `a{3}` está procurando por três ocorrências da letra "a" em sequência. O primeiro teste falha porque a string de entrada não tem "a"s suficientes para corresponder. O segundo teste contém exatamente 3 "a"s na string de entrada, o que aciona uma correspondência. O terceiro teste também aciona uma correspondência porque há exatamente 3 "a"s no início da string de entrada. Qualquer coisa que se siga a isso é irrelevante para a primeira correspondência. Se o padrão aparecer novamente após esse ponto, ele acionaria correspondências subsequentes:

Para exigir que um padrão apareça pelo menos `n` vezes, adicione uma vírgula após o número:

Com a mesma string de entrada, este teste encontra apenas uma correspondência, porque os 9 "a"s em sequência satisfazem a necessidade de "pelo menos" 3 "a"s.

Finalmente, para especificar um limite superior no número de ocorrências, adicione um segundo número dentro das chaves:

Aqui a primeira correspondência é forçada a parar no limite superior de 6 caracteres. A segunda correspondência inclui o que sobrou, que por acaso são três "a"s — o número mínimo de caracteres permitido para esta correspondência. Se a string de entrada fosse um caractere mais curta, não haveria uma segunda correspondência, já que apenas dois "a"s restariam.

## Grupos de Captura e Classes de Caracteres com Quantificadores

Até agora, testamos quantificadores apenas em strings de entrada contendo um caractere. Na verdade, os quantificadores só podem se anexar a um caractere por vez, então a expressão regular `abc+` significaria "a, seguido por b, seguido por c uma ou mais vezes". Não significaria "abc" uma ou mais vezes. No entanto, os quantificadores também podem se anexar a [Classes de Caracteres e Grupos de Captura](<#/doc/tutorials/regex/groups>), como `[abc]+` (a ou b ou c, uma ou mais vezes) ou `(abc)+` (o grupo "abc", uma ou mais vezes).

Vamos ilustrar especificando o grupo `(dog)`, três vezes seguidas.

Aqui o primeiro exemplo encontra três correspondências, já que o quantificador se aplica a todo o grupo de captura. Remova os parênteses, no entanto, e a correspondência falha porque o quantificador `{3}` agora se aplica apenas à letra "g".

Similarmente, podemos aplicar um quantificador a uma classe de caracteres inteira:

Aqui o quantificador `{3}` se aplica a toda a classe de caracteres no primeiro exemplo, mas apenas à letra "c" no segundo.

## Diferenças Entre Quantificadores Gulosos, Relutantes e Possessivos

Existem diferenças sutis entre os quantificadores _gulosos_ , _relutantes_ e _possessivos_.

Quantificadores gulosos são considerados "gulosos" porque forçam o matcher a ler, ou "comer", a string de entrada inteira antes de tentar a primeira correspondência. Se a primeira tentativa de correspondência (a string de entrada inteira) falhar, o matcher recua na string de entrada em um caractere e tenta novamente, repetindo o processo até que uma correspondência seja encontrada ou não haja mais caracteres para recuar. Dependendo do quantificador usado na expressão, a última coisa que ele tentará corresponder é 1 ou 0 caracteres.

Os quantificadores relutantes, no entanto, adotam a abordagem oposta: eles começam no início da string de entrada, então relutantemente "comem" um caractere por vez procurando por uma correspondência. A última coisa que eles tentam é a string de entrada inteira.

Finalmente, os quantificadores possessivos sempre "comem" a string de entrada inteira, tentando uma vez (e apenas uma vez) por uma correspondência. Ao contrário dos quantificadores gulosos, os quantificadores possessivos nunca recuam, mesmo que isso permitisse que a correspondência geral fosse bem-sucedida.

Para ilustrar, considere a string de entrada `xfooxxxxxxfoo`.

O primeiro exemplo usa o quantificador guloso `.*` para encontrar "qualquer coisa", zero ou mais vezes, seguido pelas letras "f" "o" "o". Como o quantificador é guloso, a parte `.*` da expressão primeiro "come" a string de entrada inteira. Neste ponto, a expressão geral não pode ser bem-sucedida, porque as últimas três letras ("f" "o" "o") já foram consumidas. Então o matcher recua lentamente uma letra por vez até que a ocorrência mais à direita de "foo" tenha sido "regurgitada", momento em que a correspondência é bem-sucedida e a busca termina.

O segundo exemplo, no entanto, é relutante, então ele começa consumindo "nada". Como "foo" não aparece no início da string, ele é forçado a "engolir" a primeira letra (um "x"), o que aciona a primeira correspondência em 0 e 4. Nosso sistema de teste (test harness) continua o processo até que a string de entrada seja esgotada. Ele encontra outra correspondência em 4 e 13.

O terceiro exemplo falha em encontrar uma correspondência porque o quantificador é possessivo. Neste caso, a string de entrada inteira é consumida por `.*+`, não deixando nada para satisfazer o "foo" no final da expressão. Use um quantificador possessivo para situações em que você deseja "apreender" tudo de algo sem nunca recuar; ele superará o quantificador guloso equivalente em casos onde a correspondência não é encontrada imediatamente.

### Neste tutorial

Classes de Caracteres Predefinidas
Correspondências de Comprimento Zero
Grupos de Captura e Classes de Caracteres com Quantificadores
Diferenças Entre Quantificadores Gulosos, Relutantes e Possessivos

Última atualização: 10 de janeiro de 2022

**Anterior na Série**

[Classes de Caracteres Predefinidas](<#/doc/tutorials/regex/predefined-character-classes>)

➜

**Tutorial Atual**

Quantificadores

➜

**Próximo na Série**

[Grupos de Captura](<#/doc/tutorials/regex/groups>)

**Anterior na Série:** [Classes de Caracteres Predefinidas](<#/doc/tutorials/regex/predefined-character-classes>)

**Próximo na Série:** [Grupos de Captura](<#/doc/tutorials/regex/groups>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Regulares ](<#/doc/tutorials/regex>) > Quantificadores