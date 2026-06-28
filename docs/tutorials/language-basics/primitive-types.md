# Criando Variáveis de Tipo Primitivo em Seus Programas

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos da Linguagem Java ](<#/doc/tutorials/language-basics>) > Criando Variáveis de Tipo Primitivo em Seus Programas

**Anterior na Série**

[Criando Variáveis e Nomeando-as](<#/doc/tutorials/language-basics/variables>)

➜

**Tutorial Atual**

Criando Variáveis de Tipo Primitivo em Seus Programas

➜

**Próximo na Série**

[Criando Arrays em Seus Programas](<#/doc/tutorials/language-basics/arrays>)

**Anterior na Série:** [Criando Variáveis e Nomeando-as](<#/doc/tutorials/language-basics/variables>)

**Próximo na Série:** [Criando Arrays em Seus Programas](<#/doc/tutorials/language-basics/arrays>)

# Criando Variáveis de Tipo Primitivo em Seus Programas

Você já aprendeu que objetos armazenam seu estado em fields. No entanto, a linguagem de programação Java também usa o termo _variável_. Esta seção discute essa relação, além das regras e convenções de nomenclatura de variáveis, tipos de dados básicos (tipos primitivos, strings de caracteres e arrays), valores padrão e literais.

## Tipos Primitivos

A linguagem de programação Java é estaticamente tipada, o que significa que todas as variáveis devem ser declaradas antes de poderem ser usadas. Isso envolve declarar o tipo e o nome da variável, como você já viu:

```java
int gear = 1;
```

Fazer isso informa ao seu programa que um field chamado `gear` existe, armazena dados numéricos e tem um valor inicial de `1`. O tipo de dado de uma variável determina os valores que ela pode conter, além das operações que podem ser realizadas nela. Além de `int`, a linguagem de programação Java suporta sete outros tipos de dados primitivos. Um tipo primitivo é predefinido pela linguagem e é nomeado por uma palavra-chave reservada. Valores primitivos não compartilham estado com outros valores primitivos. Os oito tipos de dados primitivos suportados pela linguagem de programação Java são:

  * `byte`: O tipo de dado `byte` é um inteiro de 8 bits com sinal em complemento de dois. Ele tem um valor mínimo de -128 e um valor máximo de 127 (inclusive). O tipo de dado `byte` pode ser útil para economizar memória em grandes arrays, onde a economia de memória realmente importa. Eles também podem ser usados no lugar de `int` onde seus limites ajudam a clarificar seu código; o fato de que o range de uma variável é limitado pode servir como uma forma de documentação.
  * `short`: O tipo de dado `short` é um inteiro de 16 bits com sinal em complemento de dois. Ele tem um valor mínimo de -32.768 e um valor máximo de 32.767 (inclusive). Assim como com `byte`, as mesmas diretrizes se aplicam: você pode usar um `short` para economizar memória em grandes arrays, em situações onde a economia de memória realmente importa.
  * `int`: Por padrão, o tipo de dado `int` é um inteiro de 32 bits com sinal em complemento de dois, que tem um valor mínimo de -231 e um valor máximo de 231-1.
  * `long`: O tipo de dado `long` é um inteiro de 64 bits em complemento de dois. O `long` com sinal tem um valor mínimo de -263 e um valor máximo de 263-1.
  * `float`: O tipo de dado `float` é um ponto flutuante IEEE 754 de 32 bits de precisão simples. Seu range de valores está além do escopo desta discussão, mas é especificado na seção [Floating-Point Types, Formats, and Values](<https://docs.oracle.com/javase/specs/jls/se26/html/jls-4.html#jls-4.2.3>) da [Java Language Specification](<https://docs.oracle.com/javase/specs/jls/se26/html/index.html>). Assim como nas recomendações para `byte` e `short`, use um `float` (em vez de `double`) se precisar economizar memória em grandes arrays de números de ponto flutuante. Este tipo de dado nunca deve ser usado para valores precisos, como moeda. Para isso, você precisará usar a classe [`java.math.BigDecimal`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/math/BigDecimal.html>) em vez disso. [Numbers and Strings](<#/doc/tutorials/numbers-strings>) aborda [`BigDecimal`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/math/BigDecimal.html>) e outras classes úteis fornecidas pela plataforma Java.
  * `double`: O tipo de dado `double` é um ponto flutuante IEEE 754 de 64 bits de precisão dupla. Seu range de valores está além do escopo desta discussão, mas é especificado na seção [Floating-Point Types, Formats, and Values](<https://docs.oracle.com/javase/specs/jls/se26/html/jls-4.html#jls-4.2.3>) da [Java Language Specification](<https://docs.oracle.com/javase/specs/jls/se26/html/index.html>). Para valores decimais, este tipo de dado é geralmente a escolha padrão. Como mencionado acima, este tipo de dado nunca deve ser usado para valores precisos, como moeda.
  * `boolean`: O tipo de dado `boolean` tem apenas dois valores possíveis: `true` e `false`. Use este tipo de dado para flags simples que rastreiam condições `true`/`false`. Este tipo de dado representa um bit de informação, mas seu "tamanho" não é algo precisamente definido.
  * `char`: O tipo de dado `char` é um único caractere Unicode de 16 bits. Ele tem um valor mínimo de `\u0000` (ou 0) e um valor máximo de `\uffff` (ou 65.535 inclusive).

Note que no Java SE 8 e posterior, você pode usar o tipo de dado `int` para representar um inteiro de 32 bits sem sinal, que tem um valor mínimo de 0 e um valor máximo de 232-1. Use a classe [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) para usar o tipo de dado `int` como um inteiro sem sinal. Consulte a seção [The Number Classes](<#/doc/tutorials/numbers-strings/numbers>) para mais informações. Métodos estáticos como [`Integer.compareUnsigned()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#compareUnsigned\(int,int\)>) foram adicionados à classe [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) para suportar as operações aritméticas para inteiros sem sinal.

No Java SE 8 e posterior, você também pode usar o tipo de dado `long` para representar um `long` de 64 bits sem sinal, que tem um valor mínimo de 0 e um valor máximo de 264-1. Use este tipo de dado quando precisar de um range de valores mais amplo do que os fornecidos por `int`. A classe [`Long`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Long.html>) também contém métodos como [`Long.compareUnsigned()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Long.html#compareUnsigned\(long,long\)>), [`Long.divideUnsigned()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Long.html#divideUnsigned\(long,long\)>) etc para suportar operações aritméticas para `long` sem sinal.

Além dos oito tipos de dados primitivos listados acima, a linguagem de programação Java também oferece suporte especial para strings de caracteres através da classe [`java.lang.String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>). Envolver sua string de caracteres entre aspas duplas criará automaticamente um novo objeto [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>); por exemplo:

```java
String myString = "This is a string";
```

Objetos [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) são imutáveis, o que significa que, uma vez criados, seus valores não podem ser alterados. A classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) não é tecnicamente um tipo de dado primitivo, mas considerando o suporte especial dado a ela pela linguagem, você provavelmente tenderá a pensar nela como tal. Você aprenderá mais sobre a classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) na seção [Strings](<#/doc/tutorials/numbers-strings>).

## Inicializando uma Variável com um Valor Padrão

Nem sempre é necessário atribuir um valor quando um field é declarado. Fields que são declarados, mas não inicializados, serão definidos para um valor padrão razoável pelo compilador. De modo geral, este padrão será zero ou null, dependendo do tipo de dado. No entanto, depender de tais valores padrão é geralmente considerado um estilo de programação ruim.

A tabela a seguir resume os valores padrão para os tipos de dados acima.

Tipo de Dado | Valor Padrão (para fields)
---|---
byte | 0
short | 0
int | 0
long | 0L
float | 0.0f
double | 0.0d
char | `\u0000`
String (ou qualquer objeto) | null
boolean | `false`

Variáveis locais são ligeiramente diferentes; o compilador nunca atribui um valor padrão a uma variável local não inicializada. Se você não puder inicializar sua variável local onde ela é declarada, certifique-se de atribuir um valor a ela antes de tentar usá-la. Acessar uma variável local não inicializada resultará em um erro em tempo de compilação.

## Criando Valores com Literais

Você deve ter notado que a palavra-chave `new` não é usada ao inicializar uma variável de um tipo primitivo. Tipos primitivos são tipos de dados especiais incorporados à linguagem; eles não são objetos criados a partir de uma classe. Um literal é a representação no código-fonte de um valor fixo; literais são representados diretamente em seu código sem exigir computação. Como mostrado abaixo, é possível atribuir um literal a uma variável de um tipo primitivo:

```java
int decimalValue = 26;
```

## Literais Inteiros

Um literal inteiro é do tipo `long` se terminar com a letra `L` ou `l`; caso contrário, é do tipo `int`. Recomenda-se que você use a letra maiúscula `L` porque a letra minúscula `l` é difícil de distinguir do dígito `1`.

Valores dos tipos integrais `byte`, `short`, `int` e `long` podem ser criados a partir de literais `int`. Valores do tipo `long` que excedem o range de `int` podem ser criados a partir de literais `long`. Literais inteiros podem ser expressos por estes sistemas numéricos:

  * Decimal: Base 10, cujos dígitos consistem nos números de 0 a 9; este é o sistema numérico que você usa todos os dias
  * Hexadecimal: Base 16, cujos dígitos consistem nos números de 0 a 9 e nas letras A a F
  * Binário: Base 2, cujos dígitos consistem nos números 0 e 1 (você pode criar literais binários no Java SE 7 e posterior)

Para programação de uso geral, o sistema decimal provavelmente será o único sistema numérico que você usará. No entanto, se você precisar usar outro sistema numérico, o exemplo a seguir mostra a sintaxe correta. O prefixo `0x` indica hexadecimal e `0b` indica binário:

```java
int decimal = 26;
int octal = 032;
int hex = 0x1A;
int binary = 0b11010;
```

## Literais de Ponto Flutuante

Um literal de ponto flutuante é do tipo `float` se terminar com a letra `F` ou `f`; caso contrário, seu tipo é `double` e ele pode opcionalmente terminar com a letra `D` ou `d`.

Os tipos de ponto flutuante (`float` e `double`) também podem ser expressos usando `E` ou `e` (para notação científica), `F` ou `f` (literal `float` de 32 bits) e `D` ou `d` (literal `double` de 64 bits; este é o padrão e por convenção é omitido).

```java
double d1 = 123.4;
double d2 = 1.234e2;
float f1 = 123.4f;
```

## Literais de Caractere e String

Literais dos tipos `char` e `String` podem conter quaisquer caracteres Unicode (UTF-16). Se seu editor e sistema de arquivos permitirem, você pode usar tais caracteres diretamente em seu código. Caso contrário, você pode usar um "escape Unicode" como `\u0108` (C maiúsculo com circunflexo), ou "S\u00ED Se\u00F1or" (Sí Señor em espanhol). Sempre use 'aspas simples' para literais `char` e "aspas duplas" para literais `String`. Sequências de escape Unicode podem ser usadas em outras partes de um programa (como em nomes de fields, por exemplo), não apenas em literais `char` ou `String`.

A linguagem de programação Java também suporta algumas sequências de escape especiais para literais `char` e `String`: `\b` (backspace), `\t` (tab), `\n` (line feed), `\f` (form feed), `\r` (carriage return), `\"` (double quote), `\'` (single quote) e `\\` (backslash).

Existe também um literal `null` especial que pode ser usado como valor para qualquer tipo de referência. O literal `null` pode ser atribuído a qualquer variável, exceto variáveis de tipos primitivos. Há pouco que você pode fazer com um valor `null` além de testar sua presença. Portanto, `null` é frequentemente usado em programas como um marcador para indicar que algum objeto está indisponível.

Finalmente, existe também um tipo especial de literal chamado _literal de classe_, formado ao pegar um nome de tipo e anexar `.class`; por exemplo, `String.class`. Isso se refere ao objeto que representa o próprio tipo, do tipo [`Class`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>).

## Usando Caracteres Underscore em Literais Numéricos

No Java SE 7 e posterior, qualquer número de caracteres underscore (`_`) pode aparecer em qualquer lugar entre dígitos em um literal numérico. Este recurso permite, por exemplo, separar grupos de dígitos em literais numéricos, o que pode melhorar a legibilidade do seu código.

Por exemplo, se seu código contém números com muitos dígitos, você pode usar um caractere underscore para separar dígitos em grupos de três, de forma semelhante a como você usaria um sinal de pontuação como uma vírgula, ou um espaço, como separador.

O exemplo a seguir mostra outras maneiras de usar o underscore em literais numéricos:

```java
long creditCardNumber = 1234_5678_9012_3456L;
long socialSecurityNumber = 999_99_9999L;
float pi = 3.14_15F;
long hexBytes = 0xFF_EC_DE_5EL;
long hexWords = 0xCAFE_BABE;
long maxLong = 0x7fff_ffff_ffff_ffffL;
byte nybbles = 0b0001_0101;
long bytes = 0b11010010_01101001_10010100_10010010L;
```

Você pode colocar underscores apenas entre dígitos; você não pode colocar underscores nos seguintes locais:

  * No início ou fim de um número
  * Adjacente a um ponto decimal em um literal de ponto flutuante
  * Antes de um sufixo `F` ou `L`
  * Em posições onde uma sequência de dígitos é esperada

Os exemplos a seguir demonstram posicionamentos válidos e inválidos de underscores em literais numéricos:

```java
// Válido
int x1 = 5_2;
int x2 = 5_2_1;
int x3 = 5_2_1_0;

// Inválido
// int x4 = _52; // Erro: não pode começar com underscore
// int x5 = 52_; // Erro: não pode terminar com underscore
// int x6 = 5_2.; // Erro: adjacente a um ponto decimal
// int x7 = 5_.2; // Erro: adjacente a um ponto decimal
// int x8 = 5__2; // Erro: underscores consecutivos
// int x9 = 0x_52; // Erro: não pode começar com underscore em hexadecimal
// int x10 = 0x52_L; // Erro: antes de um sufixo L
```

### Neste tutorial

Tipos Primitivos
Inicializando uma Variável com um Valor Padrão
Criando Valores com Literais
Literais Inteiros
Literais de Ponto Flutuante
Literais de Caractere e String
Usando Caracteres Underscore em Literais Numéricos

Última atualização: 22 de setembro de 2021

**Anterior na Série**

[Criando Variáveis e Nomeando-as](<#/doc/tutorials/language-basics/variables>)

➜

**Tutorial Atual**

Criando Variáveis de Tipo Primitivo em Seus Programas

➜

**Próximo na Série**

[Criando Arrays em Seus Programas](<#/doc/tutorials/language-basics/arrays>)

**Anterior na Série:** [Criando Variáveis e Nomeando-as](<#/doc/tutorials/language-basics/variables>)

**Próximo na Série:** [Criando Arrays em Seus Programas](<#/doc/tutorials/language-basics/arrays>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos da Linguagem Java ](<#/doc/tutorials/language-basics>) > Criando Variáveis de Tipo Primitivo em Seus Programas