# Classes de Caracteres

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Regulares ](<#/doc/tutorials/regex>) > Classes de Caracteres

**Anterior na Série**

[Literais de String](<#/doc/tutorials/regex/string-literals>)

➜

**Tutorial Atual**

Classes de Caracteres

➜

**Próximo na Série**

[Classes de Caracteres Predefinidas](<#/doc/tutorials/regex/predefined-character-classes>)

**Anterior na Série:** [Literais de String](<#/doc/tutorials/regex/string-literals>)

**Próximo na Série:** [Classes de Caracteres Predefinidas](<#/doc/tutorials/regex/predefined-character-classes>)

# Classes de Caracteres

## Classes de Caracteres

Se você navegar pela especificação da classe [`Pattern`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html>), você verá tabelas que resumem os construtos de expressão regular suportados. Nesta seção, você encontrará o seguinte:

A coluna da esquerda especifica os construtos de expressão regular, enquanto a coluna da direita descreve as condições sob as quais cada construto fará a correspondência.

A palavra _classe_ é usada nesta tabela para denotar _classes de caracteres_. Por exemplo, `[abc]` é uma _classe_ simples. Essas classes não têm nada a ver com as classes Java nas quais você digita seu código. No contexto de expressões regulares, uma classe de caracteres é um conjunto de caracteres delimitado por colchetes. Ela especifica os caracteres que corresponderão com sucesso a um único caractere de uma determinada string de entrada.

Construto | Descrição
---|---
`[abc]` | a, b, ou c (classe simples)
`[^abc]` | Qualquer caractere exceto a, b, ou c (negação)
`[a-zA-Z]` | a até z, ou A até Z, inclusive (intervalo)
`[a-d[m-p]]` | a até d, ou m até p: [a-dm-p] (união)
`[a-z&&[def]]` | d, e, ou f (interseção)
`[a-z&&[^bc]]` | a até z, exceto b e c: [ad-z] (subtração)
`[a-z&&[^m-p]]` | a até z, e não m até p: [a-lq-z] (subtração)

## Classes Simples

A forma mais básica de uma classe de caracteres é simplesmente colocar um conjunto de caracteres lado a lado dentro de colchetes. Por exemplo, a expressão regular `[bcr]at` corresponderá às palavras "bat", "cat" ou "rat" porque ela define uma classe de caracteres (aceitando "b", "c" ou "r") como seu primeiro caractere, seguido pelas duas letras `a` e `t`.

Você pode tentar o seguinte exemplo.

Nos exemplos acima, a correspondência geral só é bem-sucedida quando a primeira letra corresponde a um dos caracteres definidos pela classe de caracteres.

### Negação

Para corresponder a todos os caracteres, exceto os listados, insira o metacaractere "^" no início da classe de caracteres. Esta técnica é conhecida como negação.

A correspondência é bem-sucedida apenas se o primeiro caractere da string de entrada não contiver nenhum dos caracteres definidos pela classe de caracteres.

### Intervalos

Às vezes, você desejará definir uma classe de caracteres que inclua um intervalo de valores, como as letras "a até h" ou os números "1 até 5". Para especificar um intervalo, basta inserir o metacaractere "-" entre o primeiro e o último caractere a ser correspondido, como `[1-5]` ou `[a-h]`. Você também pode colocar diferentes intervalos lado a lado dentro da classe para expandir ainda mais as possibilidades de correspondência. Por exemplo, `[a-zA-Z]` corresponderá a qualquer letra do alfabeto: a a z (minúscula) ou A a Z (maiúscula).

Aqui estão alguns exemplos de intervalos e negação:

### Uniões

Você também pode usar uniões para criar uma única classe de caracteres composta por duas ou mais classes de caracteres separadas. Para criar uma união, basta aninhar uma classe dentro da outra, como `[0-4[6-8]]`. Esta união em particular cria uma única classe de caracteres que corresponde aos números 0, 1, 2, 3, 4, 6, 7 e 8.

### Interseções

Para criar uma única classe de caracteres que corresponda apenas aos caracteres comuns a todas as suas classes aninhadas, use `&&`, como em `[0-5&&[3-9]]`. Esta interseção em particular cria uma única classe de caracteres que corresponde apenas aos números comuns a ambas as classes de caracteres: 3, 4 e 5.

E aqui está um exemplo que mostra a interseção de dois intervalos:

### Subtração

Finalmente, você pode usar a subtração para negar uma ou mais classes de caracteres aninhadas, como `[0-9&&[^345]]`. Este exemplo cria uma única classe de caracteres que corresponde a tudo de 0 a 9, exceto os números 3, 4 e 5.

Agora que cobrimos como as classes de caracteres são criadas, você pode querer revisar a tabela [Classes de Caracteres](<#/doc/tutorials/regex/string-literals>) antes de continuar com a próxima seção.

### Neste tutorial

Classes de Caracteres Classes Simples Negação Intervalos Uniões Interseções Subtração

Última atualização: 10 de janeiro de 2022

**Anterior na Série**

[Literais de String](<#/doc/tutorials/regex/string-literals>)

➜

**Tutorial Atual**

Classes de Caracteres

➜

**Próximo na Série**

[Classes de Caracteres Predefinidas](<#/doc/tutorials/regex/predefined-character-classes>)

**Anterior na Série:** [Literais de String](<#/doc/tutorials/regex/string-literals>)

**Próximo na Série:** [Classes de Caracteres Predefinidas](<#/doc/tutorials/regex/predefined-character-classes>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Regulares ](<#/doc/tutorials/regex>) > Classes de Caracteres