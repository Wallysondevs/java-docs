# A Classe Pattern

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Regulares ](<#/doc/tutorials/regex>) > A Classe Pattern

**Anterior na Série**

[Limites](<#/doc/tutorials/regex/boundary-matchers>)

➜

**Tutorial Atual**

A Classe Pattern

➜

**Próximo na Série**

[A Classe Matcher](<#/doc/tutorials/regex/matchers>)

**Anterior na Série:** [Limites](<#/doc/tutorials/regex/boundary-matchers>)

**Próximo na Série:** [A Classe Matcher](<#/doc/tutorials/regex/matchers>)

# A Classe Pattern

## Criando um Pattern com Flags

A classe [`Pattern`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html>) define um método `compile` alternativo que aceita um conjunto de flags que afetam a forma como o padrão é correspondido. O parâmetro `flags` é uma máscara de bits que pode incluir qualquer um dos seguintes campos `public static`:

  * [`Pattern.CANON_EQ`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#CANON_EQ>) Habilita a equivalência canônica. Quando esta flag é especificada, dois caracteres serão considerados correspondentes se, e somente se, suas decomposições canônicas completas corresponderem. A expressão "a\u030A", por exemplo, corresponderá à string "\u00E5" quando esta flag for especificada. Por padrão, a correspondência não leva em conta a equivalência canônica. A especificação desta flag pode impor uma penalidade de desempenho.
  * [`Pattern.CASE_INSENSITIVE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#CASE_INSENSITIVE>) Habilita a correspondência que ignora maiúsculas/minúsculas (case-insensitive). Por padrão, a correspondência case-insensitive assume que apenas caracteres no charset US-ASCII estão sendo correspondidos. A correspondência case-insensitive com reconhecimento Unicode pode ser habilitada especificando a flag `UNICODE_CASE` em conjunto com esta flag. A correspondência case-insensitive também pode ser habilitada através da expressão de flag embutida `(?i)`. A especificação desta flag pode impor uma ligeira penalidade de desempenho.
  * [`Pattern.COMMENTS`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#COMMENTS>) Permite espaços em branco e comentários no padrão. Neste modo, espaços em branco são ignorados, e comentários embutidos que começam com `#` são ignorados até o final de uma linha. O modo de comentários também pode ser habilitado através da expressão de flag embutida `(?x)`.
  * [`Pattern.DOTALL`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#DOTALL>) Habilita o modo dotall. No modo dotall, a expressão `.` corresponde a qualquer caractere, incluindo um terminador de linha. Por padrão, esta expressão não corresponde a terminadores de linha. O modo dotall também pode ser habilitado através da expressão de flag embutida `(?s)`. (O `s` é um mnemônico para o modo "single-line", que é como é chamado em Perl.)
  * [`Pattern.LITERAL`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#LITERAL>) Habilita a análise literal do padrão. Quando esta flag é especificada, a string de entrada que especifica o padrão é tratada como uma sequência de caracteres literais. Metacaracteres ou sequências de escape na sequência de entrada não terão significado especial. As flags [`Pattern.CASE_INSENSITIVE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#CASE_INSENSITIVE>) e [`Pattern.UNICODE_CASE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#UNICODE_CASE>) mantêm seu impacto na correspondência quando usadas em conjunto com esta flag. As outras flags tornam-se supérfluas. Não há caractere de flag embutido para habilitar a análise literal.
  * [`Pattern.MULTILINE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#MULTILINE>) Habilita o modo multiline. No modo multiline, as expressões `^` e `$` correspondem logo após ou logo antes, respectivamente, um terminador de linha ou o final da sequência de entrada. Por padrão, essas expressões correspondem apenas no início e no final de toda a sequência de entrada. O modo multiline também pode ser habilitado através da expressão de flag embutida `(?m)`.
  * [`Pattern.UNICODE_CASE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#UNICODE_CASE>) Habilita o dobramento de maiúsculas/minúsculas com reconhecimento Unicode. Quando esta flag é especificada, a correspondência case-insensitive, quando habilitada pela flag `CASE_INSENSITIVE`, é feita de maneira consistente com o Padrão Unicode. Por padrão, a correspondência case-insensitive assume que apenas caracteres no charset US-ASCII estão sendo correspondidos. O dobramento de maiúsculas/minúsculas com reconhecimento Unicode também pode ser habilitado através da expressão de flag embutida `(?u)`. A especificação desta flag pode impor uma penalidade de desempenho.
  * [`Pattern.UNIX_LINES`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#UNIX_LINES>) Habilita o modo de linhas UNIX. Neste modo, apenas o terminador de linha `\n` é reconhecido no comportamento de `.`, `^` e `$`. O modo de linhas UNIX também pode ser habilitado através da expressão de flag embutida `(?d)`.

Nos passos seguintes, modificaremos o harness de teste, [`RegexTestHarness.java`](<#/doc/tutorials/regex>) para criar um padrão com correspondência case-insensitive.

Primeiro, modifique o código para invocar a versão alternativa de `compile`:

```java
Pattern p = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
```

Em seguida, compile e execute o harness de teste para obter os seguintes resultados:

```
Enter your regex: dog
Enter input string to search: dog
I found the text "dog" starting at index 0 and ending at index 3.
Enter input string to search: Dog
I found the text "Dog" starting at index 0 and ending at index 3.
Enter input string to search: DOG
I found the text "DOG" starting at index 0 and ending at index 3.
```

Como você pode ver, o literal de string "dog" corresponde a ambas as ocorrências, independentemente de maiúsculas/minúsculas. Para compilar um padrão com múltiplas flags, separe as flags a serem incluídas usando o operador OR bit a bit `|`. Para maior clareza, os exemplos de código a seguir codificam a expressão regular em vez de lê-la do Console:

```java
Pattern p = Pattern.compile("dog", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE);
```

Você também pode especificar uma variável `int` em vez disso:

```java
int flag = Pattern.CASE_INSENSITIVE | Pattern.MULTILINE;
Pattern p = Pattern.compile("dog", flag);
```

## Expressões de Flag Embutidas

Também é possível habilitar várias flags usando expressões de flag embutidas. As expressões de flag embutidas são uma alternativa à versão de dois argumentos de `compile`, e são especificadas na própria expressão regular. O exemplo a seguir usa o harness de teste original, [`RegexTestHarness.java`](<#/doc/tutorials/regex>) com a expressão de flag embutida `(?i)` para habilitar a correspondência case-insensitive.

```
Enter your regex: (?i)dog
Enter input string to search: dog
I found the text "dog" starting at index 0 and ending at index 3.
Enter input string to search: Dog
I found the text "Dog" starting at index 0 and ending at index 3.
Enter input string to search: DOG
I found the text "DOG" starting at index 0 and ending at index 3.
```

Mais uma vez, todas as correspondências são bem-sucedidas independentemente de maiúsculas/minúsculas.

As expressões de flag embutidas que correspondem aos campos publicamente acessíveis de `Pattern` são apresentadas na tabela a seguir:

Constante | Expressão de Flag Embutida Equivalente
---|---
`Pattern.CANON_EQ` | None
`Pattern.CASE_INSENSITIVE` | `(?i)`
`Pattern.COMMENTS` | `(?x)`
`Pattern.MULTILINE` | `(?m)`
`Pattern.DOTALL` | `(?s)`
`Pattern.LITERAL` | None
`Pattern.UNICODE_CASE` | `(?u)`
`Pattern.UNIX_LINES` | `(?d)`

## Usando o Método Estático Match

A classe [`Pattern`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html>) define um método `matches` conveniente que permite verificar rapidamente se um padrão está presente em uma determinada string de entrada. Assim como em todos os métodos `public static`, você deve invocar `matches` pelo nome de sua classe, como `Pattern.matches("\\d","1");`. Neste exemplo, o método retorna `true`, porque o dígito "1" corresponde à expressão regular `\d`.

## Usando o Método Split

O método [`split()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#split\(java.lang.CharSequence\)>) é uma ótima ferramenta para coletar o texto que se encontra em ambos os lados do padrão que foi correspondido. Como mostrado abaixo, o método [`split()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#split\(java.lang.CharSequence\)>) poderia extrair as palavras "one two three four five" da string "one:two:three:four:five":

```java
Pattern p = Pattern.compile(":");
String[] items = p.split("one:two:three:four:five");
for(String s : items) {
    System.out.println(s);
}
```

A execução deste código produz o seguinte resultado:

```
one
two
three
four
five
```

Para simplificar, você correspondeu a um literal de string, o dois-pontos (`:`) em vez de uma expressão regular complexa. Como ainda estamos usando objetos [`Pattern`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html>) e [`Matcher`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html>), você pode usar [`split()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#split\(java.lang.CharSequence\)>) para obter o texto que cai em ambos os lados de qualquer expressão regular. Aqui está o mesmo exemplo, modificado para dividir em dígitos em vez disso:

```java
Pattern p = Pattern.compile("\\d");
String[] items = p.split("one9two4three7four2five");
for(String s : items) {
    System.out.println(s);
}
```

A execução deste código produz o mesmo resultado:

```
one
two
three
four
five
```

## Outros Métodos Utilitários

Você também pode achar os seguintes métodos úteis:

  * [`public static String quote(String s)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#quote\(java.lang.String\)>) Retorna um [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) de padrão literal para a [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) especificada. Este método produz uma [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) que pode ser usada para criar um [`Pattern`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html>) que corresponderia a `String s` como se fosse um padrão literal. Metacaracteres ou sequências de escape na sequência de entrada não terão significado especial.
  * [`public String toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#toString\(\)>) Retorna a representação [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) deste padrão. Esta é a expressão regular a partir da qual este padrão foi compilado.

## Equivalentes de Métodos Pattern em String

O suporte a expressões regulares também existe em [`java.lang.String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) através de vários métodos que imitam o comportamento de [`java.util.regex.Pattern`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html>). Para conveniência, trechos chave de sua API são apresentados abaixo.

  * [`public boolean matches(String regex)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#matches\(java.lang.String\)>): Informa se esta string corresponde ou não à expressão regular fornecida. Uma invocação deste método na forma `str.matches(regex)` produz exatamente o mesmo resultado que a expressão [`Pattern.matches(regex, str)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#matches\(java.lang.CharSequence,int\)>).
  * [`public String[] split(String regex, int limit)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#matches\(java.lang.String,int\)>): Divide esta string em torno das correspondências da expressão regular fornecida. Uma invocação deste método na forma `str.split(regex, n)` produz o mesmo resultado que a expressão `Pattern.compile(regex).split(str, n)`
  * [`public String[] split(String regex)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#split\(java.lang.String\)>): Divide esta string em torno das correspondências da expressão regular fornecida. Este método funciona da mesma forma como se você invocasse o método `split` de dois argumentos com a expressão fornecida e um argumento `limit` de zero. Strings vazias finais não são incluídas no array resultante.

Existe também um método [`replace()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#replace\(java.lang.CharSequence,java.lang.CharSequence\)>), que substitui um [`CharSequence`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/CharSequence.html>) por outro:

  * [`public String replace(CharSequence target,CharSequence replacement)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#replace\(java.lang.CharSequence,java.lang.CharSequence\)>): Substitui cada substring desta string que corresponde à sequência literal `target` pela sequência literal de substituição especificada. A substituição prossegue do início da string para o fim, por exemplo, substituir "aa" por "b" na string "aaa" resultará em "ba" em vez de "ab".

### Neste tutorial

Criando um Pattern com Flags Expressões de Flag Embutidas Usando o Método Estático Match Usando o Método Split Outros Métodos Utilitários Equivalentes de Métodos Pattern em String

Última atualização: 10 de janeiro de 2022

**Anterior na Série**

[Limites](<#/doc/tutorials/regex/boundary-matchers>)

➜

**Tutorial Atual**

A Classe Pattern

➜

**Próximo na Série**

[A Classe Matcher](<#/doc/tutorials/regex/matchers>)

**Anterior na Série:** [Limites](<#/doc/tutorials/regex/boundary-matchers>)

**Próximo na Série:** [A Classe Matcher](<#/doc/tutorials/regex/matchers>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Regulares ](<#/doc/tutorials/regex>) > A Classe Pattern