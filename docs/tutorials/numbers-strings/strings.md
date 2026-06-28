# Strings

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Números e Strings ](<#/doc/tutorials/numbers-strings>) > Strings

**Anterior na Série**

[Caracteres](<#/doc/tutorials/numbers-strings/characters>)

➜

**Tutorial Atual**

Strings

➜

**Próximo na Série**

[String Builders](<#/doc/tutorials/numbers-strings/string-builders>)

**Anterior na Série:** [Caracteres](<#/doc/tutorials/numbers-strings/characters>)

**Próximo na Série:** [String Builders](<#/doc/tutorials/numbers-strings/string-builders>)

# Strings

## Criando Strings

Strings, que são amplamente utilizadas na programação Java, são uma sequência de caracteres. Na linguagem de programação Java, strings são objetos.

A plataforma Java fornece a classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) para criar e manipular strings.

Se você está ansioso para praticar a criação e manipulação de strings, pode pular diretamente para o final desta página: [Praticando a Criação e Manipulação de Strings](<#/doc/tutorials/numbers-strings/strings>)

A maneira mais direta de criar uma string é escrever:

```java
String greeting = "Hello world!";
```

Neste caso, "Hello world!" é um literal de string — uma série de caracteres em seu código que é delimitada por aspas duplas. Sempre que encontra um literal de string em seu código, o compilador cria um objeto [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) com seu valor — neste caso, _Hello world!_.

Assim como com qualquer outro objeto, você pode criar objetos [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) usando a palavra-chave `new` e um construtor. A classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) possui treze construtores que permitem fornecer o valor inicial da string usando diferentes fontes, como um array de caracteres:

```java
char[] helloArray = { 'h', 'e', 'l', 'l', 'o', '.' };
String helloString = new String(helloArray);
System.out.println(helloString);
```

A última linha deste trecho de código exibe o seguinte.

```
hello.
```

> Nota: A classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) é imutável, de modo que, uma vez criado, um objeto [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) não pode ser alterado. A classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) possui vários métodos, alguns dos quais serão discutidos abaixo, que parecem modificar strings. Como as strings são imutáveis, o que esses métodos realmente fazem é criar e retornar uma nova string que contém o resultado da operação.

## Comprimento da String

Métodos usados para obter informações sobre um objeto são conhecidos como métodos acessores. Um método acessor que você pode usar com strings é o método [`length()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#length\(\)>), que retorna o número de caracteres contidos no objeto string. Após as duas linhas de código a seguir serem executadas, `length` é igual a 17:

```java
String palindrome = "Dot saw I was Tod";
int len = palindrome.length();
```

Um _palíndromo_ é uma palavra ou frase simétrica — é escrita da mesma forma de frente para trás e de trás para frente, ignorando maiúsculas/minúsculas e pontuação. Aqui está um programa curto e ineficiente para inverter uma string palíndromo. Ele invoca o método [`charAt(i)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#charAt\(int\)>) da classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>), que retorna o _i-ésimo_ caractere na string, contando a partir de 0.

```java
public class StringDemo {
    public static void main(String[] args) {
        String palindrome = "Dot saw I was Tod";
        int len = palindrome.length();
        char[] tempCharArray = new char[len];
        char[] charArray = new char[len];

        // put original string in an array of chars
        for (int i = 0; i < len; i++) {
            tempCharArray[i] = palindrome.charAt(i);
        }

        // reverse array of chars
        for (int j = 0; j < len; j++) {
            charArray[j] = tempCharArray[len - 1 - j];
        }

        String reversePalindrome = new String(charArray);
        System.out.println(reversePalindrome);
    }
}
```

A execução do programa produz esta saída:

```
doT saw I was toD
```

Para realizar a inversão da string, o programa teve que converter a string para um array de caracteres (primeiro loop `for`), inverter o array em um segundo array (segundo loop `for`) e então converter de volta para uma string. A classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) inclui um método, [`getChars()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#getChars\(int,int,char%5B%5D,int\)>), para converter uma string, ou uma porção de uma string, em um array de caracteres, de modo que poderíamos substituir o primeiro for loop no programa acima por

```java
palindrome.getChars(0, len, tempCharArray, 0);
```

## Concatenando Strings

A classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) inclui um método [`String.concat()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#concat\(java.lang.String\)>) para concatenar duas strings:

```java
string1.concat(string2);
```

Isso retorna uma nova string que é `string1` com `string2` adicionada a ela no final.

Você também pode usar o método [`concat()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#concat\(java.lang.String\)>) com literais de string, como em:

```java
"My name is ".concat("Rumplestiltskin");
```

Strings são mais comumente concatenadas com o operador `+`, como em

```java
"Hello," + " world" + "!"
```

o que resulta em

```
"Hello, world!"
```

O operador `+` é amplamente utilizado em instruções de impressão. Por exemplo:

```java
String string1 = "saw I was ";
String string2 = "Tod";
System.out.println("Dot " + string1 + string2);
```

O código anterior imprime o seguinte.

```
Dot saw I was Tod
```

Tal concatenação pode ser uma mistura de quaisquer objetos. Para cada objeto que não é uma [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>), seu método [`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#toString\(\)>) é chamado para convertê-lo em uma [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>).

> Nota: Até o Java SE 15, a linguagem de programação Java não permite que literais de string se estendam por várias linhas em arquivos-fonte, então você deve usar o operador de concatenação `+` no final de cada linha em uma string multi-linha. Por exemplo:

```java
String longString = "This is a long string that " +
                    "continues on the next line.";
```

Quebrar strings entre linhas usando o operador de concatenação `+` é, mais uma vez, muito comum em instruções `print`.

A partir do Java SE 15, você pode escrever literais de string bidimensionais conhecidos como blocos de texto. Um literal de string bidimensional deve começar com uma aspa tripla (`"""`) imediatamente seguida por um caractere de terminação de linha. Você pode ter espaços em branco entre esta aspa tripla e seu terminador de linha. Para fechá-lo, você precisa adicionar outra aspa tripla (`"""`), que pode estar na mesma linha ou em uma nova linha do seu bloco de texto.

```java
String textBlock = """
        This is a text block.
        It can span multiple lines.
        """;
System.out.println(textBlock);
```

A execução do código anterior imprime o seguinte.

```
This is a text block.
It can span multiple lines.
```

## Criando Strings Formatadas

Você já viu o uso dos métodos [`printf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#printf\(java.lang.String,java.lang.Object...\)>) e [`format()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#format\(java.lang.String,java.lang.Object...\)>) para imprimir saída com números formatados. A classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) possui um método de classe equivalente, [`format()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#format\(java.lang.String,java.lang.Object...\)>), que retorna um objeto [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) em vez de um objeto [`PrintStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html>).

Usar o método estático [`format()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#format\(java.lang.String,java.lang.Object...\)>) da classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) permite criar uma string formatada que você pode reutilizar, em vez de uma instrução de impressão única. Por exemplo, em vez de

```java
System.out.printf("The value of the float variable is %f, while " +
                  "the value of the integer variable is %d, and " +
                  "the string is %s", floatVar, intVar, stringVar);
```

você pode escrever o seguinte. Observe o uso de um bloco de texto. O caractere `\s` preserva o espaço em branco final no fim da linha, e o caractere `\` impede que o caractere de nova linha seja inserido no bloco de texto resultante.

```java
String fs = String.format("""
    The value of the float variable is %f,\s
    while the value of the integer variable is %d,\s
    and the string is %s""", floatVar, intVar, stringVar);
System.out.println(fs);
```

A execução do código anterior imprime o seguinte.

```
The value of the float variable is 1.618034,
while the value of the integer variable is 12,
and the string is true
```

## Convertendo Strings para Números

Frequentemente, um programa acaba com dados numéricos em um objeto string — um valor inserido pelo usuário, por exemplo.

As subclasses de [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>) que envolvem tipos numéricos primitivos ([`Byte`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Byte.html>), [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>), [`Double`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Double.html>), [`Float`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Float.html>), [`Long`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Long.html>) e [`Short`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Short.html>)) cada uma fornece um método de classe chamado [`valueOf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#valueOf\(java.lang.String\)>) que converte uma string para um objeto desse tipo. Aqui está um exemplo que obtém duas strings da linha de comando, as converte para números e realiza operações aritméticas nos valores:

```java
public class ValueOfDemo {
    public static void main(String[] args) {
        // this program requires two
        // command-line arguments
        if (args.length == 2) {
            // convert strings to numbers
            float a = (Float.valueOf(args[0])).floatValue();
            float b = (Float.valueOf(args[1])).floatValue();

            // do some arithmetic
            System.out.println("a + b = " +
                               (a + b));
            System.out.println("a - b = " +
                               (a - b));
            System.out.println("a * b = " +
                               (a * b));
            System.out.println("a / b = " +
                               (a / b));
        } else {
            System.out.println("This program requires two command-line arguments.");
        }
    }
}
```

A seguir está a saída do programa quando você usa `4.5` e `87.2` como argumentos de linha de comando:

```
a + b = 91.7
a - b = -82.7
a * b = 392.4
a / b = 0.0516055
```

> Nota: Cada uma das subclasses de [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>) que envolvem tipos numéricos primitivos também fornece um método `parseXXXX()`. Por exemplo, [`parseFloat()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Float.html#parseFloat\(java.lang.String\)>) pode ser usado para converter strings em números primitivos. Como um tipo primitivo é retornado em vez de um objeto, o método [`parseFloat()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Float.html#parseFloat\(java.lang.String\)>) é mais direto do que o método [`valueOf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#valueOf\(java.lang.String\)>). Por exemplo, neste programa, poderíamos usar:

```java
float a = Float.parseFloat(args[0]);
float b = Float.parseFloat(args[1]);
```

## Convertendo Números para Strings

Às vezes, você precisa converter um número para uma string porque precisa operar o valor em sua forma de string. Existem várias maneiras fáceis de converter um número para uma string:

```java
int i = 10;
System.out.println(String.valueOf(i));
```

ou

```java
int i = 10;
System.out.println(Integer.toString(i));
```

Cada uma das subclasses de [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>) inclui um método de classe, [`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html#toString\(\)>), que converterá seu tipo primitivo para uma string. Por exemplo:

```java
Integer.toString(int i);
Float.toString(float f);
Double.toString(double d);
Long.toString(long l);
Short.toString(short s);
Byte.toString(byte b);
```

O exemplo a seguir usa o método [`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#toString\(\)>) para converter um número em uma string. Em seguida, ele usa alguns métodos de string para calcular o número de dígitos antes e depois do ponto decimal:

```java
public class ToStringDemo {
    public static void main(String[] args) {
        double d = 858.48;
        String s = Double.toString(d);

        int dot = s.indexOf('.');
        System.out.println(dot + " digits before decimal point.");
        System.out.println((s.length() - dot - 1) +
                           " digits after decimal point.");
    }
}
```

A saída deste programa é a seguinte.

```
3 digits before decimal point.
2 digits after decimal point.
```

## Obtendo Caracteres e Substrings por Índice

A classe String possui vários métodos para examinar o conteúdo de strings, encontrar caracteres ou substrings dentro de uma string, alterar maiúsculas/minúsculas e outras tarefas.

Você pode obter o caractere em um índice específico dentro de uma string invocando o método acessor [`charAt()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#charAt\(int\)>). O índice do primeiro caractere é 0, enquanto o índice do último caractere é `length() - 1`. Por exemplo, o código a seguir obtém o caractere no índice 9 em uma string:

```java
String anotherPalindrome = "Niagara. O roar again!";
char charAtIndex9 = anotherPalindrome.charAt(9);
System.out.println(charAtIndex9);
```

A execução do código anterior imprime o seguinte.

```
O
```

Os índices começam em 0, então o caractere no índice 9 é 'O', como ilustrado na figura a seguir:

```
N i a g a r a .   O   r o a r   a g a i n !
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
```

Índices de caracteres em uma string

Se você deseja obter mais de um caractere consecutivo de uma string, pode usar o método [`String.substring()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#substring\(int,int\)>). Este possui duas versões:

  * [`String substring(int beginIndex, int endIndex)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#substring\(int,int\)>): Retorna uma nova string que é uma substring desta string. A substring começa no `beginIndex` especificado e se estende até o caractere no índice `endIndex - 1`.
  * [`String substring(int beginIndex)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#substring\(int\)>): Retorna uma nova string que é uma substring desta string. O argumento inteiro especifica o índice do primeiro caractere. Aqui, a substring retornada se estende até o final da string original.

O código a seguir obtém do palíndromo Niagara a substring que se estende do índice 11 até, mas não incluindo, o índice 15, que é a palavra "roar":

```java
String anotherPalindrome = "Niagara. O roar again!";
String roar = anotherPalindrome.substring(11, 15);
System.out.println(roar);
```

A execução do código anterior imprime o seguinte.

```
roar
```

```
N i a g a r a .   O   r o a r   a g a i n !
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
                      ^ ^ ^ ^
                      1 2 3 4
```

Extraindo caracteres de uma string com substring

## Outros Métodos para Manipular Strings

Aqui estão vários outros métodos da classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) para manipular strings:

  * [`String[] split(String regex)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#split\(java.lang.String\)>) e [`String[] split(String regex, int limit)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#split\(java.lang.String,int\)>): Procura por uma correspondência conforme especificado pelo argumento string (que contém uma expressão regular) e divide esta string em um array de strings de acordo. O argumento inteiro opcional especifica o tamanho máximo do array retornado. Expressões regulares são abordadas na seção intitulada [Expressões Regulares](<#/doc/tutorials/regex>).
  * [`CharSequence subSequence(int beginIndex, int endIndex)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#subSequence\(int,int\)>): Retorna uma nova sequência de caracteres construída a partir do índice `beginIndex` até `endIndex - 1`.
  * [`String trim()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#trim\(\)>): Retorna uma cópia desta string com espaços em branco iniciais e finais removidos.
  * [`String toLowerCase()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#toLowerCase\(\)>) e [`String toUpperCase()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#toUpperCase\(\)>): Retorna uma cópia desta string convertida para minúsculas ou maiúsculas. Se nenhuma conversão for necessária, esses métodos retornam a string original.

## Buscando Caracteres e Substrings em uma String

Aqui estão alguns outros métodos da classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) para encontrar caracteres ou substrings dentro de uma string. A classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) fornece métodos acessores que retornam a posição dentro da string de um caractere ou substring específico: [`indexOf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#indexOf\(java.lang.String\)>) e [`lastIndexOf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#lastIndexOf\(java.lang.String\)>). Os métodos [`indexOf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#indexOf\(java.lang.String\)>) pesquisam para frente a partir do início da string, e os métodos [`lastIndexOf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#lastIndexOf\(java.lang.String\)>) pesquisam para trás a partir do final da string. Se um caractere ou substring não for encontrado, [`indexOf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#indexOf\(java.lang.String\)>) e [`lastIndexOf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#lastIndexOf\(java.lang.String\)>) retornam -1.

A classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) também fornece um método de busca, contains, que retorna `true` se a string contém uma sequência de caracteres específica. Use este método quando você só precisa saber que a string contém uma sequência de caracteres, mas a localização precisa não é importante.

Os métodos de busca são os seguintes:

  * [`int indexOf(int ch)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#indexOf\(int\)>) e [`int lastIndexOf(int ch)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#lastIndexOf\(int\)>): Retorna o índice da primeira (última) ocorrência do caractere especificado.
  * [`int indexOf(int ch, int fromIndex)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#indexOf\(int,int\)>) e [`int lastIndexOf(int ch, int fromIndex)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#lastIndexOf\(int,int\)>): Retorna o índice da primeira (última) ocorrência do caractere especificado, buscando para frente (para trás) a partir do índice especificado.
  * [`int indexOf(String str)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#indexOf\(java.lang.String\)>) e [`int lastIndexOf(String str)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#lastIndexOf\(java.lang.String\)>): Retorna o índice da primeira (última) ocorrência da substring especificada.
  * [`int indexOf(String str, int fromIndex)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#indexOf\(java.lang.String,int\)>) e [`int lastIndexOf(String str, int fromIndex)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#lastIndexOf\(java.lang.String,int\)>): Retorna o índice da primeira (última) ocorrência da substring especificada, buscando para frente (para trás) a partir do índice especificado.
  * [`boolean contains(CharSequence s)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#contains\(java.lang.CharSequence\)>): Retorna `true` se a string contém a sequência de caracteres especificada.

> Nota: [`CharSequence`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/CharSequence.html>) é uma interface que é implementada pela classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>). Portanto, você pode usar uma string como argumento para o método [`contains()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#contains\(java.lang.CharSequence\)>).
## Substituindo Caracteres e Substrings em uma String

A classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) possui poucos métodos para inserir caracteres ou substrings em uma string. Em geral, eles não são necessários: Você pode criar uma nova string pela concatenação de substrings que você removeu de uma string com a substring que você deseja inserir.

A classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) possui, no entanto, quatro métodos para substituir caracteres ou substrings encontrados. Eles são:

  * [`String replace(char oldChar, char newChar)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#replace\(char,char\)>): Retorna uma nova string resultante da substituição de todas as ocorrências de `oldChar` nesta string por `newChar`.
  * [`String replace(CharSequence target, CharSequence replacement)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#replace\(java.lang.CharSequence,java.lang.CharSequence\)>): Substitui cada substring desta string que corresponde à sequência literal `target` pela sequência literal de substituição especificada.
  * [`String replaceAll(String regex, String replacement)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#replaceAll\(java.lang.String,java.lang.String\)>): Substitui cada substring desta string que corresponde à expressão regular fornecida pela substituição fornecida.
  * [`String replaceFirst(String regex, String replacement)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#replaceFirst\(java.lang.String,java.lang.String\)>): Substitui a primeira substring desta string que corresponde à expressão regular fornecida pela substituição fornecida.

Expressões regulares são discutidas na lição intitulada [Expressões Regulares](<#/doc/tutorials/regex>).

## A Classe String em Ação

O exemplo a seguir ilustra o uso de [`lastIndexOf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#lastIndexOf\(java.lang.String\)>) e [`substring()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#substring\(int,int\)>) para isolar diferentes partes de um nome de arquivo.

> Nota: Os métodos na seguinte classe `Filename` não realizam nenhuma verificação de erro e assumem que seu argumento contém um caminho de diretório completo e um nome de arquivo com uma extensão. Se esses métodos fossem código de produção, eles verificariam se seus argumentos foram construídos corretamente.

E aqui está a saída do programa.

Nosso método `extension` usa [`lastIndexOf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#lastIndexOf\(java.lang.String\)>) para localizar a última ocorrência do ponto (`.`) no nome do arquivo. Em seguida, `substring` usa o valor de retorno de [`lastIndexOf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#lastIndexOf\(java.lang.String\)>) para extrair a extensão do nome do arquivo — ou seja, a substring do ponto até o final da string.

Se o nome do arquivo não tiver um ponto, [`lastIndexOf()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#lastIndexOf\(java.lang.String\)>) retorna -1. Assim, o método `extension()` retorna uma string vazia.

Além disso, observe que o método `extension` usa `dot + 1` como argumento para [`substring()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#substring\(int,int\)>). Se o caractere de ponto (`.`) for o último caractere da string, `dot + 1` é igual ao `length` da string, que é um a mais do que o maior índice na string (porque os índices começam em 0). Este é um argumento legal para [`substring()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#substring\(int,int\)>) porque esse método aceita um índice igual, mas não maior, que o `length` da string e o interpreta como "o final da string".

## Comparando Strings e Partes de Strings

A classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) possui vários métodos para comparar strings e partes de strings. A tabela a seguir lista esses métodos.

  * [`boolean endsWith(String suffix)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#endsWith\(java.lang.String\)>) e [`boolean startsWith(String prefix)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#startsWith\(java.lang.String\)>): Retorna `true` se esta string termina ou começa com a substring especificada como argumento para o método.
  * [`boolean startsWith(String prefix, int offset)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#startsWith\(java.lang.String,int\)>): Considera a string começando no índice `offset`, e retorna `true` se ela começa com a substring especificada como argumento.
  * [`int compareTo(String anotherString)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#compareTo\(java.lang.String\)>): Compara duas strings lexicograficamente. Retorna um inteiro indicando se esta string é maior que (resultado é > 0), igual a (resultado é = 0), ou menor que (resultado é < 0) o argumento.
  * [`int compareToIgnoreCase(String str)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#compareToIgnoreCase\(java.lang.String\)>): Compara duas strings lexicograficamente, ignorando diferenças de maiúsculas/minúsculas. Retorna um inteiro indicando se esta string é maior que (resultado é > 0), igual a (resultado é = 0), ou menor que (resultado é < 0) o argumento.
  * [`boolean equals(Object anObject)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#equals\(java.lang.Object\)>): Retorna `true` se e somente se o argumento for um objeto [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) que representa a mesma sequência de caracteres que este objeto.
  * [`boolean equalsIgnoreCase(String anotherString)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#equalsIgnoreCase\(java.lang.String\)>): Retorna `true` se e somente se o argumento for um objeto [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) que representa a mesma sequência de caracteres que este objeto, ignorando diferenças de maiúsculas/minúsculas.
  * [`boolean regionMatches(int toffset, String other, int ooffset, int len)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#regionMatches\(int,java.lang.String,int,int\)>): Testa se a região especificada desta string corresponde à região especificada do argumento [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>). A região tem `len` de comprimento e começa no índice `toffset` para esta string e `ooffset` para a outra string.
  * [`boolean regionMatches(boolean ignoreCase, int toffset, String other, int ooffset, int len)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#regionMatches\(boolean,int,java.lang.String,int,int\)>): Testa se a região especificada desta string corresponde à região especificada do argumento [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>). A região tem `len` de comprimento e começa no índice `toffset` para esta string e `ooffset` para a outra string. O argumento booleano indica se a distinção entre maiúsculas e minúsculas deve ser ignorada; se `true`, a distinção entre maiúsculas e minúsculas é ignorada ao comparar caracteres.
  * [`boolean matches(String regex)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#matches\(java.lang.String\)>): Testa se esta string corresponde à expressão regular especificada. Expressões regulares são discutidas na lição intitulada [Expressões Regulares](<#/doc/tutorials/regex>).

O exemplo a seguir usa o método [`regionMatches()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#regionMatches\(int,java.lang.String,int,int\)>) para procurar uma string dentro de outra string:

A execução do código anterior imprime o seguinte.

O programa percorre a string referenciada por `searchMe` um caractere por vez. Para cada caractere, o programa chama o método [`regionMatches()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#regionMatches\(int,java.lang.String,int,int\)>) para determinar se a substring que começa com o caractere atual corresponde à string que o programa está procurando.

## Praticando Criação e Manipulação de Strings

### Criação de Strings

Existem vários padrões para criar strings, que você pode experimentar aqui.

A execução do código anterior imprime o seguinte.

### Concatenando Strings

Existem diferentes maneiras de concatenar strings.

A primeira consiste em usar o operador `+`.

A execução do código anterior imprime o seguinte.

Você também pode usar um método `concat()`.

A execução do código anterior imprime a mesma frase.

Você também pode misturar tipos diferentes, que são convertidos para strings para você.

A execução do código anterior imprime o seguinte.

### Extraindo Caracteres e Substrings

Você pode extrair caracteres com o método `charAt()`.

A execução do código anterior imprime o seguinte.

Você pode extrair substrings com o método `substring()`.

A execução do código anterior imprime o seguinte.

### Procurando Substrings em uma String

Você pode procurar por substrings com o método `indexOf()`.

A execução do código anterior imprime o seguinte.

Se a string que você está procurando estiver presente várias vezes, você pode usar o seguinte padrão para encontrar todas elas.

A execução do código anterior imprime o seguinte.

### Neste tutorial

Criando Strings
Comprimento de Strings
Concatenando Strings
Criando Strings Formatadas
Convertendo Strings para Números
Convertendo Números para Strings
Obtendo Caracteres e Substrings por Índice
Outros Métodos para Manipular Strings
Procurando por Caracteres e Substrings em uma String
Substituindo Caracteres e Substrings em uma String
A Classe String em Ação
Comparando Strings e Partes de Strings
Praticando Criação e Manipulação de Strings

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Caracteres](<#/doc/tutorials/numbers-strings/characters>)

➜

**Tutorial Atual**

Strings

➜

**Próximo na Série**

[String Builders](<#/doc/tutorials/numbers-strings/string-builders>)

**Anterior na Série:** [Caracteres](<#/doc/tutorials/numbers-strings/characters>)

**Próximo na Série:** [String Builders](<#/doc/tutorials/numbers-strings/string-builders>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Números e Strings ](<#/doc/tutorials/numbers-strings>) > Strings