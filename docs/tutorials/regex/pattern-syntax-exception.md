# Métodos da Classe PatternSyntaxException

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Regulares ](<#/doc/tutorials/regex>) > Métodos da Classe PatternSyntaxException

**Anterior na Série**

[A Classe Matcher](<#/doc/tutorials/regex/matchers>)

➜

**Tutorial Atual**

Métodos da Classe PatternSyntaxException

➜

Este é o fim da série!

**Anterior na Série:** [A Classe Matcher](<#/doc/tutorials/regex/matchers>)

# Métodos da Classe PatternSyntaxException

## Métodos da Classe PatternSyntaxException

Uma [`PatternSyntaxException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/PatternSyntaxException.html>) é uma exceção não verificada que indica um erro de sintaxe em um padrão de expressão regular. A classe [`PatternSyntaxException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/PatternSyntaxException.html>) fornece os seguintes métodos para ajudar a determinar o que deu errado:

  * [`public String getDescription()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/PatternSyntaxException.html#getDescription\(\)>): Recupera a descrição do erro.
  * [`public int getIndex()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/PatternSyntaxException.html#getIndex\(\)>): Recupera o índice do erro.
  * [`public String getPattern()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/PatternSyntaxException.html#getPattern\(\)>): Recupera o padrão de expressão regular errôneo.
  * [`public String getMessage()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/PatternSyntaxException.html#getMessage\(\)>): Retorna uma string de várias linhas contendo a descrição do erro de sintaxe e seu índice, o padrão de expressão regular errôneo e uma indicação visual do índice do erro dentro do padrão.

O seguinte código-fonte atualiza nosso conjunto de testes anterior para verificar expressões regulares malformadas:

Para executar este teste, insira `?i)foo` como a expressão regular. Este erro é um cenário comum em que o programador esqueceu o parêntese de abertura na expressão de flag embutida `(?i)`. Fazer isso produzirá os seguintes resultados:

A partir desta saída, podemos ver que o erro de sintaxe é um metacaractere solto (o ponto de interrogação) no índice 0. Um parêntese de abertura ausente é o culpado.

### Neste tutorial

Métodos da Classe PatternSyntaxException

Última atualização: 10 de janeiro de 2022

**Anterior na Série**

[A Classe Matcher](<#/doc/tutorials/regex/matchers>)

➜

**Tutorial Atual**

Métodos da Classe PatternSyntaxException

➜

Este é o fim da série!

**Anterior na Série:** [A Classe Matcher](<#/doc/tutorials/regex/matchers>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Expressões Regulares ](<#/doc/tutorials/regex>) > Métodos da Classe PatternSyntaxException