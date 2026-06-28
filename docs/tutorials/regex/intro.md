# Introdução às Expressões Regulares

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Regulares ](<#/doc/tutorials/regex>) > Introdução às Expressões Regulares

**Tutorial Atual**

Introdução às Expressões Regulares

➜

**Próximo na Série**

[Literais de String](<#/doc/tutorials/regex/string-literals>)

**Próximo na Série:** [Literais de String](<#/doc/tutorials/regex/string-literals>)

# Introdução às Expressões Regulares

## Introdução às Expressões Regulares

Expressões regulares são uma forma de descrever um conjunto de strings com base em características comuns compartilhadas por cada string no conjunto. Elas podem ser usadas para pesquisar, editar ou manipular texto e dados. Você deve aprender uma sintaxe específica para criar expressões regulares — uma que vai além da sintaxe normal da linguagem de programação Java. Expressões regulares variam em complexidade, mas uma vez que você entende os fundamentos de como elas são construídas, você será capaz de decifrar (ou criar) qualquer expressão regular.

No mundo das expressões regulares, existem muitos "sabores" diferentes para escolher, como grep, Perl, Tcl, Python, PHP e awk. A sintaxe de expressão regular na API [`java.util.regex`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/package-summary.html>) é mais semelhante à encontrada em Perl.

O pacote java.util.regex consiste principalmente em três classes: Pattern, Matcher e PatternSyntaxException.

Um objeto [`Pattern`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html>) é uma representação compilada de uma expressão regular. A classe [`Pattern`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html>) não fornece construtores públicos. Para criar um padrão, você deve primeiro invocar um de seus métodos estáticos públicos [`compile()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#compile\(java.lang.String\)>), que então retornará um objeto [`Pattern`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html>). Esses métodos aceitam uma expressão regular como primeiro argumento; as seções seguintes cobrem a sintaxe necessária.

Um objeto [`Matcher`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html>) é o motor que interpreta o padrão e realiza operações de correspondência contra uma string de entrada. Assim como a classe [`Pattern`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html>), [`Matcher`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html>) não define construtores públicos. Você obtém um objeto [`Matcher`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html>) invocando o método [`matcher()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#matcher\(java.lang.CharSequence\)>) em um objeto [`Pattern`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html>).

Um objeto [`PatternSyntaxException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/PatternSyntaxException.html>) é uma exceção não verificada que indica um erro de sintaxe em um padrão de expressão regular.

Antes de aprofundar em cada classe, você deve entender como as expressões regulares são realmente construídas. Vamos introduzir um simples "test harness" que será usado repetidamente para explorar sua sintaxe.

## Suporte a Unicode

A partir do lançamento do JDK 7, a correspondência de padrões de Expressões Regulares expandiu sua funcionalidade para suportar Unicode 6.0.

### Correspondendo a um Ponto de Código Específico

Você pode corresponder a um ponto de código Unicode específico usando uma sequência de escape da forma \uFFFF, onde FFFF é o valor hexadecimal do ponto de código que você deseja corresponder. Por exemplo, \u6771 corresponde ao caractere Han para "leste".

Alternativamente, você pode especificar um ponto de código usando a notação hexadecimal estilo Perl, `\x{...}`. Por exemplo:

### Propriedades de Caracteres Unicode

Cada caractere Unicode, além de seu valor, possui certos atributos, ou propriedades. Você pode corresponder a um único caractere pertencente a uma categoria específica com a expressão `\p{prop}`. Você pode corresponder a um único caractere que não pertence a uma categoria específica com a expressão `\P{prop}`.

Os três tipos de propriedade suportados são scripts, blocks e uma categoria "geral".

#### Scripts

Para determinar se um ponto de código pertence a um script específico, você pode usar a palavra-chave `script`, ou a forma abreviada `sc`, por exemplo, `\p{script=Hiragana}`. Alternativamente, você pode prefixar o nome do script com a string `Is`, como `\p{IsHiragana}`.

Nomes de script válidos suportados por [`Pattern`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html>) são aqueles aceitos por [`UnicodeScript.forName()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.UnicodeScript.html#forName\(java.lang.String\)>).

#### Blocos

Um bloco pode ser especificado usando a palavra-chave `block`, ou a forma abreviada `blk`, por exemplo, `\p{block=Mongolian}`. Alternativamente, você pode prefixar o nome do bloco com a string `In`, como `\p{InMongolian}`.

Nomes de bloco válidos suportados por [`Pattern`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html>) são aqueles aceitos por [`UnicodeScript.forName()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.UnicodeScript.html#forName\(java.lang.String\)>).

#### Categoria Geral

Categorias podem ser especificadas com o prefixo opcional `Is`. Por exemplo, `IsL` corresponde à categoria de letras Unicode. Categorias também podem ser especificadas usando a palavra-chave `general_category`, ou a forma abreviada `gc`. Por exemplo, uma letra maiúscula pode ser correspondida usando `general_category=Lu` ou `gc=Lu`.

As categorias suportadas são aquelas do [`Unicode Standard`](<http://www.unicode.org/unicode/standard/standard.html>) na versão especificada pela classe [`Character`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html>).

## Test Harness

Esta seção define um "test harness" reutilizável, `RegexTestHarness.java`, para explorar as construções de expressão regular suportadas por esta API. O comando para executar este código é `java RegexTestHarness`; nenhum argumento de linha de comando é aceito. A aplicação executa em loop repetidamente, solicitando ao usuário uma expressão regular e uma string de entrada. Usar este "test harness" é opcional, mas você pode achá-lo conveniente para explorar os casos de teste discutidos nas páginas seguintes.

Antes de continuar para a próxima seção, você pode salvar e compilar este código para garantir que seu ambiente de desenvolvimento suporte os pacotes necessários.

### Neste tutorial

Introdução às Expressões Regulares Suporte a Unicode Test Harness

Última atualização: 10 de janeiro de 2022

**Tutorial Atual**

Introdução às Expressões Regulares

➜

**Próximo na Série**

[Literais de String](<#/doc/tutorials/regex/string-literals>)

**Próximo na Série:** [Literais de String](<#/doc/tutorials/regex/string-literals>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Regulares ](<#/doc/tutorials/regex>) > Introdução às Expressões Regulares