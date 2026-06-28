# Grupos de Captura

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Regulares ](<#/doc/tutorials/regex>) > Grupos de Captura

**Anterior na Série**

[Quantificadores](<#/doc/tutorials/regex/quantifiers>)

➜

**Tutorial Atual**

Grupos de Captura

➜

**Próximo na Série**

[Delimitadores](<#/doc/tutorials/regex/boundary-matchers>)

**Anterior na Série:** [Quantificadores](<#/doc/tutorials/regex/quantifiers>)

**Próximo na Série:** [Delimitadores](<#/doc/tutorials/regex/boundary-matchers>)

# Grupos de Captura

## Grupos de Captura

Na seção anterior, você viu como os quantificadores se anexam a um caractere, classe de caractere ou grupo de captura por vez. Mas até agora, não discutimos a noção de grupos de captura em detalhes.

Grupos de captura são uma forma de tratar múltiplos caracteres como uma única unidade. Eles são criados colocando os caracteres a serem agrupados dentro de um conjunto de parênteses. Por exemplo, a expressão regular `(dog)` cria um único grupo contendo as letras "d", "o" e "g". A porção da string de entrada que corresponde ao grupo de captura será salva na memória para posterior recuperação via backreferences (conforme discutido abaixo na seção, [Backreferences](<#/doc/tutorials/regex/groups>)).

## Numeração

Conforme descrito na [API Pattern](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html>), os grupos de captura são numerados contando seus parênteses de abertura da esquerda para a direita. Na expressão `((A)(B(C)))`, por exemplo, existem quatro desses grupos:

  1. `((A)(B(C)))`
  2. `(A)`
  3. `(B(C))`
  4. `(C)`

Para descobrir quantos grupos estão presentes na expressão, chame o método [`groupCount()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#groupCount\(\)>) em um objeto [`matcher`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html>). O método [`groupCount()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#groupCount\(\)>) retorna um `int` mostrando o número de grupos de captura presentes no padrão do matcher. Neste exemplo, [`groupCount()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#groupCount\(\)>) retornaria o número 4, mostrando que o padrão contém 4 grupos de captura.

Existe também um grupo especial, o grupo 0, que sempre representa a expressão inteira. Este grupo não está incluído no total reportado por [`groupCount()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#groupCount\(\)>). Grupos que começam com `(?` são grupos puros, não de captura, que não capturam texto e não contam para o total de grupos. Você verá exemplos de grupos não de captura mais tarde na seção Métodos da Classe Pattern.

É importante entender como os grupos são numerados porque alguns métodos de [`Matcher`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html>) aceitam um `int` especificando um número de grupo particular como parâmetro:

  * [`public int start(int group)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#start\(int\)>): Retorna o índice inicial da subsequência capturada pelo grupo fornecido durante a operação de correspondência anterior.
  * [`public int end(int group)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#end\(int\)>): Retorna o índice do último caractere, mais um, da subsequência capturada pelo grupo fornecido durante a operação de correspondência anterior.
  * [`public String group(int group)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#group\(int\)>): Retorna a subsequência de entrada capturada pelo grupo fornecido durante a operação de correspondência anterior.

## Retroreferências

A seção da string de entrada que corresponde ao(s) grupo(s) de captura é salva na memória para posterior recuperação via _retroreferência_. Uma retroreferência é especificada na expressão regular como uma barra invertida (`\`) seguida por um dígito indicando o número do grupo a ser recuperado. Por exemplo, a expressão `(\d\d)` define um grupo de captura que corresponde a dois dígitos em sequência, que pode ser recuperado posteriormente na expressão via a retroreferência `\1`.

Para corresponder a quaisquer 2 dígitos, seguidos pelos exatos mesmos dois dígitos, você usaria (\d\d)\1 como a expressão regular:

Se você mudar os dois últimos dígitos, a correspondência falhará:

Para grupos de captura aninhados, a retroreferência funciona exatamente da mesma maneira: especifique uma barra invertida seguida pelo número do grupo a ser recuperado.

### Neste tutorial

Grupos de Captura Numeração Retroreferências

Última atualização: 10 de janeiro de 2022

**Anterior na Série**

[Quantificadores](<#/doc/tutorials/regex/quantifiers>)

➜

**Tutorial Atual**

Grupos de Captura

➜

**Próximo na Série**

[Delimitadores](<#/doc/tutorials/regex/boundary-matchers>)

**Anterior na Série:** [Quantificadores](<#/doc/tutorials/regex/quantifiers>)

**Próximo na Série:** [Delimitadores](<#/doc/tutorials/regex/boundary-matchers>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Regulares ](<#/doc/tutorials/regex>) > Grupos de Captura