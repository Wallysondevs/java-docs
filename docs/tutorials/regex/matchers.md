# A Classe Matcher

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Regulares ](<#/doc/tutorials/regex>) > A Classe Matcher

**Anterior na Série**

[A Classe Pattern](<#/doc/tutorials/regex/patterns>)

➜

**Tutorial Atual**

A Classe Matcher

➜

**Próximo na Série**

[Métodos da Classe PatternSyntaxException](<#/doc/tutorials/regex/pattern-syntax-exception>)

**Anterior na Série:** [A Classe Pattern](<#/doc/tutorials/regex/patterns>)

**Próximo na Série:** [Métodos da Classe PatternSyntaxException](<#/doc/tutorials/regex/pattern-syntax-exception>)

# A Classe Matcher

## Métodos de Índice

Os métodos de índice fornecem valores de índice úteis que mostram precisamente onde a correspondência foi encontrada na string de entrada:

  * [`public int start()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#start\(\)>): Retorna o índice inicial da correspondência anterior.
  * [`public int start(int group)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#start\(int\)>): Retorna o índice inicial da subsequência capturada pelo grupo fornecido durante a operação de correspondência anterior.
  * [`public int end()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#end\(\)>): Retorna o deslocamento após o último caractere correspondido.
  * [`public int end(int group)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#end\(int\)>): Retorna o deslocamento após o último caractere da subsequência capturada pelo grupo fornecido durante a operação de correspondência anterior.

## Métodos de Estudo

Os métodos de estudo revisam a string de entrada e retornam um booleano indicando se o padrão foi encontrado ou não.

  * [`public boolean lookingAt()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#lookingAt\(\)>): Tenta corresponder a sequência de entrada, começando no início da região, contra o padrão.
  * [`public boolean find()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#find\(\)>): Tenta encontrar a próxima subsequência da sequência de entrada que corresponde ao padrão.
  * [`public boolean find(int start)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#find\(int\)>): Reinicia este matcher e então tenta encontrar a próxima subsequência da sequência de entrada que corresponde ao padrão, começando no índice especificado.
  * [`public boolean matches()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#matches\(\)>): Tenta corresponder a região inteira contra o padrão.

## Métodos de Substituição

Os métodos de substituição são métodos úteis para substituir texto em uma string de entrada.

  * [`public Matcher appendReplacement(StringBuffer sb, String replacement)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#appendReplacement\(java.lang.StringBuilder,java.lang.String\)>): Implementa uma etapa de anexar e substituir não-terminal.
  * [`public StringBuilder appendTail(StringBuilder sb)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#appendTail\(java.lang.StringBuilder\)>): Implementa uma etapa de anexar e substituir terminal.
  * [`public String replaceAll(String replacement)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#replaceAll\(java.lang.String\)>): Substitui cada subsequência da sequência de entrada que corresponde ao padrão pela string de substituição fornecida.
  * [`public String replaceFirst(String replacement)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#replaceFirst\(java.lang.String\)>): Substitui a primeira subsequência da sequência de entrada que corresponde ao padrão pela string de substituição fornecida.
  * [`public static String quoteReplacement(String s)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#quoteReplacement\(java.lang.String\)>): Retorna uma String de substituição literal para a String especificada. Este método produz uma String que funcionará como uma substituição literal s no método appendReplacement da classe Matcher. A String produzida corresponderá à sequência de caracteres em s tratada como uma sequência literal. Barras invertidas ('') e cifrões ('$') não terão significado especial.

## Usando os Métodos Start e End

Aqui está um exemplo que conta o número de vezes que a palavra "dog" aparece na string de entrada.

A execução deste código produz o seguinte resultado.

Você pode ver que este exemplo usa limites de palavra para garantir que as letras "d", "o", "g" não sejam meramente uma substring em uma palavra mais longa. Ele também fornece algumas informações úteis sobre onde na string de entrada a correspondência ocorreu. O método [`start()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#start\(\)>) retorna o índice inicial da subsequência capturada pelo grupo fornecido durante a operação de correspondência anterior, e [`end()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#end\(\)>) retorna o índice do último caractere correspondido, mais um.

## Usando os Métodos Matches e LookingAt

Os métodos [`matches()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#matches\(\)>) e [`lookingAt()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#lookingAt\(\)>) ambos tentam corresponder uma sequência de entrada a um padrão. A diferença, no entanto, é que [`matches()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#matches\(\)>) exige que toda a sequência de entrada seja correspondida, enquanto [`lookingAt()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#lookingAt\(\)>) não. Ambos os métodos sempre começam no início da string de entrada. Aqui está o código completo:

A execução deste código produz o seguinte resultado.

## Usando ReplaceFirst e ReplaceAll

Os métodos [`replaceFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#replaceFirst\(java.lang.String\)>) e [`replaceAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#replaceAll\(java.lang.String\)>) substituem o texto que corresponde a uma dada expressão regular. Como seus nomes indicam, [`replaceFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#replaceFirst\(java.lang.String\)>) substitui a primeira ocorrência, e [`replaceAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#replaceAll\(java.lang.String\)>) substitui todas as ocorrências. Aqui está o código:

A execução deste código produz o seguinte resultado.

Nesta primeira versão, todas as ocorrências de "dog" são substituídas por "cat". Mas por que parar aqui? Em vez de substituir um literal simples como "dog", você pode substituir texto que corresponde a qualquer expressão regular. A API para este método afirma que "dada a expressão regular `a*b`, a entrada `aabfooaabfooabfoob`, e a string de substituição `-`, uma invocação deste método em um matcher para essa expressão resultaria na string `-foo-foo-foo-`.".

Vamos escrever o seguinte exemplo.

A execução deste código produz o seguinte resultado.

Para substituir apenas a primeira ocorrência do padrão, basta chamar [`replaceFirst()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#replaceFirst\(java.lang.String\)>) em vez de [`replaceAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#replaceAll\(java.lang.String\)>). Ele aceita o mesmo parâmetro.

## Usando AppendReplacement e AppendTail

A classe [`Matcher`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html>) também fornece os métodos [`appendReplacement()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#appendReplacement\(java.lang.StringBuilder,java.lang.String\)>) e [`appendTail()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#appendTail\(java.lang.StringBuilder\)>) para substituição de texto. O exemplo a seguir usa esses dois métodos para alcançar o mesmo efeito que [`replaceAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html#replaceAll\(java.lang.String\)>).

A execução deste código produz o mesmo resultado que anteriormente.

## Equivalentes dos Métodos Matcher em String

Para conveniência, a classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) também imita alguns métodos de [`Matcher`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Matcher.html>):

  * [`public String replaceFirst(String regex, String replacement)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#replaceFirst\(java.lang.String,java.lang.String\)>): Substitui a primeira substring desta string que corresponde à expressão regular fornecida pela substituição fornecida. Uma invocação deste método na forma `string.replaceFirst(regex, repl)` produz exatamente o mesmo resultado que a expressão `Pattern.compile(regex).matcher(str).replaceFirst(repl)`
  * [`public String replaceAll(String regex, String replacement)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#replaceAll\(java.lang.String,java.lang.String\)>): Substitui cada substring desta string que corresponde à expressão regular fornecida pela substituição fornecida. Uma invocação deste método na forma `string.replaceAll(regex, repl)` produz exatamente o mesmo resultado que a expressão `Pattern.compile(regex).matcher(str).replaceAll(repl)`

### Neste tutorial

Métodos de Índice Métodos de Estudo Métodos de Substituição Usando os Métodos Start e End Usando os Métodos Matches e LookingAt Usando ReplaceFirst e ReplaceAll Usando AppendReplacement e AppendTail Equivalentes dos Métodos Matcher em String

Última atualização: 10 de janeiro de 2022

**Anterior na Série**

[A Classe Pattern](<#/doc/tutorials/regex/patterns>)

➜

**Tutorial Atual**

A Classe Matcher

➜

**Próximo na Série**

[Métodos da Classe PatternSyntaxException](<#/doc/tutorials/regex/pattern-syntax-exception>)

**Anterior na Série:** [A Classe Pattern](<#/doc/tutorials/regex/patterns>)

**Próximo na Série:** [Métodos da Classe PatternSyntaxException](<#/doc/tutorials/regex/pattern-syntax-exception>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Regulares ](<#/doc/tutorials/regex>) > A Classe Matcher