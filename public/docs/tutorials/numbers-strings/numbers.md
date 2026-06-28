# Números

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Números e Strings ](<#/doc/tutorials/numbers-strings>) > Números

**Tutorial Atual**

Números

➜

**Próximo na Série**

[Caracteres](<#/doc/tutorials/numbers-strings/characters>)

**Próximo na Série:** [Caracteres](<#/doc/tutorials/numbers-strings/characters>)

# Números

## Números

Esta seção começa com uma discussão da classe [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>) no pacote [`java.lang`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/package-summary.html>), suas subclasses e as situações em que você usaria instanciações dessas classes em vez dos tipos numéricos primitivos.

Esta seção também apresenta as classes [`PrintStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html>) e [`DecimalFormat`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/text/DecimalFormat.html>), que fornecem métodos para escrever saída numérica formatada.

Finalmente, a classe [`Math`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html>) em [`java.lang`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/package-summary.html>) é discutida. Ela contém funções matemáticas para complementar os operadores embutidos na linguagem. Esta classe possui métodos para funções trigonométricas, funções exponenciais e assim por diante.

Ao trabalhar com números, na maioria das vezes você usa os tipos primitivos em seu código. Por exemplo:

Existem, no entanto, razões para usar objetos em vez de primitivos, e a plataforma Java fornece classes wrapper para cada um dos tipos de dados primitivos. Essas classes "envolvem" o primitivo em um objeto. Frequentemente, o empacotamento é feito pelo compilador — se você usa um primitivo onde um objeto é esperado, o compilador empacota o primitivo em sua classe wrapper para você. Da mesma forma, se você usa um objeto numérico quando um primitivo é esperado, o compilador desempacota o objeto para você. Para mais informações, consulte a seção [`Autoboxing and Unboxing`](<#/doc/tutorials/numbers-strings/autoboxing>).

Todas as classes wrapper numéricas são subclasses da classe abstrata [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>):

A Hierarquia da Classe Number

> Nota: Existem outras quatro subclasses de [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>) que não são discutidas aqui. [`BigDecimal`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/math/BigDecimal.html>) e [`BigInteger`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/math/BigInteger.html>) são usadas para cálculos de alta precisão. [`AtomicInteger`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/atomic/AtomicInteger.html>) e [`AtomicLong`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/atomic/AtomicLong.html>) são usadas para aplicações multi-threaded.

Existem três razões pelas quais você pode usar um objeto [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>) em vez de um primitivo:

  1. Como argumento de um método que espera um objeto (frequentemente usado ao manipular coleções de números).
  2. Para usar constantes definidas pela classe, como [`MIN_VALUE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#MIN_VALUE>) e [`MAX_VALUE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#MAX_VALUE>), que fornecem os limites superior e inferior do tipo de dados.
  3. Para usar métodos de classe para converter valores de e para outros tipos primitivos, para converter de e para strings, e para converter entre sistemas numéricos (decimal, octal, hexadecimal, binário).

A tabela a seguir lista os métodos de instância que todas as subclasses da classe Number implementam.

Os métodos a seguir convertem o valor deste objeto [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>) para o tipo de dados primitivo retornado.

  * [`byte byteValue()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html#byteValue\(\)>)
  * [`short shortValue()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html#shortValue\(\)>)
  * [`int intValue()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html#intValue\(\)>)
  * [`long longValue()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html#longValue\(\)>)
  * [`float floatValue()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html#floatValue\(\)>)
  * [`double doubleValue()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html#doubleValue\(\)>)

Os métodos a seguir comparam este objeto [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>) com o argumento.

  * [`int compareTo(Byte anotherByte)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Byte.html#compareTo\(java.lang.Byte\)>)
  * [`int compareTo(Double anotherDouble)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Double.html#compareTo\(java.lang.Double\)>)
  * [`int compareTo(Float anotherFloat)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Float.html#compareTo\(java.lang.Float\)>)
  * [`int compareTo(Integer anotherInteger)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#compareTo\(java.lang.Integer\)>)
  * [`int compareTo(Long anotherLong)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Long.html#compareTo\(java.lang.Long\)>)
  * [`int compareTo(Short anotherShort)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Short.html#compareTo\(java.lang.Short\)>)
  * [`boolean equals(Object obj)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#equals\(java.lang.Object\)>)

O método `equals(Object obj)` determina se este objeto numérico é igual ao argumento. Os métodos retornam `true` se o argumento não for `null` e for um objeto do mesmo tipo e com o mesmo valor numérico. Existem alguns requisitos extras para objetos [`Double`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Double.html>) e [`Float`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Float.html>) que são descritos na documentação da API Java.

Cada classe [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>) contém outros métodos úteis para converter números de e para strings e para converter entre sistemas numéricos. A tabela a seguir lista esses métodos na classe [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>). Os métodos para as outras subclasses de [`Number`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Number.html>) são semelhantes:

Método | Descrição
---|---
[`static Integer decode(String s)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#decode\(java.lang.String\)>) | Decodifica uma string em um inteiro. Pode aceitar representações de string de números decimais, octais ou hexadecimais como entrada.
[`static int parseInt(String s)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#parseInt\(java.lang.String\)>) | Retorna um inteiro (somente decimal).
[`static int parseInt(String s, int radix)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#parseInt\(java.lang.String,int\)>) | Retorna um inteiro, dada uma representação de string de números decimais, binários, octais ou hexadecimais (radix igual a 10, 2, 8 ou 16, respectivamente) como entrada.
[`String toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#toString\(\)>) | Retorna um objeto [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) representando o valor deste [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>).
[`static String toString(int i)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#toString\(int\)>) | Retorna um objeto [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) representando o inteiro especificado.
[`static Integer valueOf(int i)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#valueOf\(int\)>) | Retorna um objeto [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) contendo o valor do primitivo especificado.
[`static Integer valueOf(String s)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#valueOf\(java.lang.String\)>) | Retorna um objeto [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) contendo o valor da representação de string especificada.
[`static Integer valueOf(String s, int radix)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#valueOf\(java.lang.String,int\)>) | Retorna um objeto [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) contendo o valor inteiro da representação de string especificada, analisado com o valor de radix. Por exemplo, se s = "333" e radix = 8, o método retorna o inteiro equivalente em base dez do número octal 333.

## Formatação da Saída Numérica Impressa

Anteriormente, você viu o uso dos métodos [`print`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#print\(int\)>) e [`println`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#println\(int\)>) para imprimir strings na saída padrão [`System.out`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/System.html#out>). Como todos os números podem ser convertidos em strings, você pode usar esses métodos para imprimir uma mistura arbitrária de strings e números. A linguagem de programação Java possui outros métodos, no entanto, que permitem um controle muito maior sobre sua saída de impressão quando números são incluídos.

### Os Métodos Printf e Format

O pacote [`java.io`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/package-summary.html>) inclui uma classe [`PrintStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html>) que possui dois métodos de formatação que você pode usar para substituir [`print`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#print\(int\)>) e [`println`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#println\(int\)>). Esses métodos, [`format`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#format\(java.lang.String,java.lang.Object...\)>) e [`printf`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#printf\(java.lang.String,java.lang.Object...\)>), são equivalentes entre si. O familiar [`System.out`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/System.html#out>) que você tem usado é, por acaso, um objeto [`PrintStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html>), então você pode invocar métodos [`PrintStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html>) em [`System.out`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/System.html#out>). Assim, você pode usar [`format`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#format\(java.lang.String,java.lang.Object...\)>) ou [`printf`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#printf\(java.lang.String,java.lang.Object...\)>) em qualquer lugar do seu código onde você tenha usado anteriormente [`print`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#print\(int\)>) ou [`println`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#println\(int\)>). Por exemplo,

A sintaxe para esses dois métodos [`java.io.PrintStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html>) é a mesma:

```java
public PrintStream format(String format, Object... args)
public PrintStream printf(String format, Object... args)
```

onde [`format`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#format\(java.lang.String,java.lang.Object...\)>) é uma string que especifica a formatação a ser usada e args é uma lista das variáveis a serem impressas usando essa formatação. Um exemplo simples seria

```java
System.out.format("The value of " + "the float variable is %f, while " + "the value of the integer " + "variable is %d, and the string " + "is %s", floatVar, intVar, stringVar);
```

O primeiro parâmetro, [`format`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#format\(java.lang.String,java.lang.Object...\)>), é uma string de formato que especifica como os objetos no segundo parâmetro, `args`, devem ser formatados. A string [`format`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#format\(java.lang.String,java.lang.Object...\)>) contém texto simples, bem como especificadores de formato, que são caracteres especiais que formatam os argumentos de `Object...` args. (A notação `Object...` args é chamada de _varargs_, o que significa que o número de argumentos pode variar.)

Os especificadores de formato começam com um sinal de porcentagem (`%`) e terminam com um conversor. O conversor é um caractere que indica o tipo de argumento a ser formatado. Entre o sinal de porcentagem (`%`) e o conversor, você pode ter flags e especificadores opcionais. Existem muitos conversores, flags e especificadores, que estão documentados em [`java.util.Formatter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Formatter.html>).

Aqui está um exemplo básico:

```java
System.out.format("The value of the integer is %d%n", i);
```

O `%d` especifica que a única variável é um inteiro decimal. O `%n` é um caractere de nova linha independente da plataforma. A saída é:

```
The value of the integer is 10
```

Os métodos [`printf`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#printf\(java.lang.String,java.lang.Object...\)>) e [`format`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#format\(java.lang.String,java.lang.Object...\)>) são sobrecarregados. Cada um possui uma versão com a seguinte sintaxe:

```java
public PrintStream format(Locale l, String format, Object... args)
public PrintStream printf(Locale l, String format, Object... args)
```

Para imprimir números no sistema francês (onde uma vírgula é usada no lugar do ponto decimal na representação inglesa de números de ponto flutuante), por exemplo, você usaria:

```java
System.out.format(Locale.FRANCE, "The value of the float " + "variable is %f, while the value of the " + "integer variable is %d, and the string " + "is %s%n", floatVar, intVar, stringVar);
```

### Um Exemplo

A tabela a seguir lista alguns dos conversores e flags que são usados no programa de exemplo, `TestFormat.java`, que segue a tabela.

Conversor | Flag | Explicação
---|---|---
d | | Um inteiro decimal.
f | | Um float.
n | | Um caractere de nova linha apropriado para a plataforma que executa a aplicação. Você deve sempre usar `%n`, em vez de `\n`.
tB | | Uma conversão de data e hora — nome completo do mês específico da localidade.
td, te | | Uma conversão de data e hora — dia do mês com 2 dígitos. td tem zeros à esquerda conforme necessário, te não.
ty, tY | | Uma conversão de data e hora — ty = ano com 2 dígitos, tY = ano com 4 dígitos.
tl | | Uma conversão de data e hora — hora no formato de 12 horas.
tM | | Uma conversão de data e hora — minutos em 2 dígitos, com zeros à esquerda conforme necessário.
tp | | Uma conversão de data e hora — am/pm específico da localidade (minúsculas).
tm | | Uma conversão de data e hora — meses em 2 dígitos, com zeros à esquerda conforme necessário.
tD | | Uma conversão de data e hora — data como %tm%td%ty
| 08 | Oito caracteres de largura, com zeros à esquerda conforme necessário.
| + | Inclui sinal, seja positivo ou negativo.
| , | Inclui caracteres de agrupamento específicos da localidade.
| - | Justificado à esquerda.
| .3 | Três casas decimais após o ponto.
| 10.3 | Dez caracteres de largura, justificado à direita, com três casas decimais após o ponto.

O programa a seguir mostra algumas das formatações que você pode fazer com format. A saída é mostrada entre aspas duplas no comentário embutido:

```java
import java.util.Locale;

public class TestFormat {
    public static void main(String[] args) {
        long n = 461012;
        System.out.format("%d%n", n);      //  -->  "461012"
        System.out.format("%08d%n", n);    //  -->  "00461012"
        System.out.format("%+8d%n", n);    //  -->  " +461012"
        System.out.format("%,8d%n", n);    //  -->  " 461,012"
        System.out.format("%+,8d%n%n", n); //  -->  "+461,012"

        double pi = Math.PI;
        System.out.format("%f%n", pi);       // --> "3.141593"
        System.out.format("%.3f%n", pi);     // --> "3.142"
        System.out.format("%10.3f%n", pi);   // --> "     3.142"
        System.out.format("%-10.3f%n", pi);  // --> "3.142     "
        System.out.format(Locale.FRANCE,
                          "%-10.4f%n%n", pi); // --> "3,1416    "

        java.util.Calendar c = java.util.Calendar.getInstance();
        System.out.format("%tB %te, %tY%n", c, c, c); // --> "May 29, 2006"
        System.out.format("%tl:%tM %tp%n", c, c, c);  // --> "2:34 am"
        System.out.format("%tD%n", c);    // --> "05/29/06"
    }
}
```

> Nota: A discussão nesta seção aborda apenas o básico dos métodos [`format`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#format\(java.lang.String,java.lang.Object...\)>) e [`printf`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#printf\(java.lang.String,java.lang.Object...\)>). Mais detalhes podem ser encontrados na seção Basic I/O deste tutorial, na página "Formatting". O uso de [`String.format()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#format\(java.lang.String,java.lang.Object...\)>) para criar strings é abordado em [`Strings`](<#/doc/tutorials/numbers-strings/strings>).

## A Classe DecimalFormat

Você pode usar a classe [`java.text.DecimalFormat`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/text/DecimalFormat.html>) para controlar a exibição de zeros à esquerda e à direita, prefixos e sufixos, separadores de agrupamento (milhares) e o separador decimal. [`DecimalFormat`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/text/DecimalFormat.html>) oferece grande flexibilidade na formatação de números, mas pode tornar seu código mais complexo.

O exemplo a seguir cria um objeto [`DecimalFormat`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/text/DecimalFormat.html>), `myFormatter`, passando uma string de padrão para o construtor [`DecimalFormat`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/text/DecimalFormat.html>). O método [`format`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#format\(java.lang.String,java.lang.Object...\)>), que [`DecimalFormat`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/text/DecimalFormat.html>) herda de [`NumberFormat`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/text/NumberFormat.html>), é então invocado por `myFormatter` — ele aceita um valor double como argumento e retorna o número formatado em uma string.

Aqui está um programa de exemplo que ilustra o uso de [`DecimalFormat`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/text/DecimalFormat.html>):

```java
import java.text.*;

public class DecimalFormatDemo {

   static public void customFormat(String pattern, double value ) {
      DecimalFormat myFormatter = new DecimalFormat(pattern);
      String output = myFormatter.format(value);
      System.out.println(value + "  " + pattern + "  " + output);
   }

   static public void main(String[] args) {

      customFormat("###,###.###", 123456.789);
      customFormat("###.##", 123456.789);
      customFormat("000000.000", 123.78);
      customFormat("$###,###.###", 12345.67);
   }
}
```

A saída é:

```
123456.789  ###,###.###  123,456.789
123456.789  ###.##  123456.79
123.78  000000.000  000123.780
12345.67  $###,###.###  $12,345.67
```

A tabela a seguir explica cada linha da saída.

Valor | Padrão | Saída | Explicação
---|---|---|---
123456.789 | ###,###.### | 123,456.789 | O sinal de cerquilha (`#`) denota um dígito, a vírgula é um marcador para o separador de agrupamento e o ponto é um marcador para o separador decimal.
123456.789 | ###.## | 123456.79 | O `value` tem três dígitos à direita do ponto decimal, mas o padrão tem apenas dois. O método format lida com isso arredondando para cima.
123.78 | 000000.000 | 000123.780 | O `pattern` especifica zeros à esquerda e à direita, porque o caractere 0 é usado em vez do sinal de cerquilha (#).
12345.67 | $###,###.### | $12,345.67 | O primeiro caractere no `pattern` é o cifrão (`$`). Observe que ele precede imediatamente o dígito mais à esquerda na `output` formatada.
## Além da Aritmética Básica

A linguagem de programação Java suporta aritmética básica com seus operadores aritméticos: `+`, `-`, `*`, `/` e `%`. A classe [`Math`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html>) no pacote [`java.lang`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/package-summary.html>) fornece métodos e constantes para realizar cálculos matemáticos mais avançados.

Os métodos na classe [`Math`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html>) são todos estáticos, então você os chama diretamente da classe, assim:

> Nota: Usando o recurso de linguagem `static import`, você não precisa escrever [`Math`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html>) na frente de cada função matemática: `import static java.lang.Math.*;` Isso permite que você invoque os métodos da classe [`Math`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html>) pelos seus nomes simples. Por exemplo: `cos(angle);`

### Constantes e Métodos Básicos

A classe [`Math`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html>) inclui duas constantes:

  * [`Math.E`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#E>), que é a base dos logaritmos naturais, e
  * [`Math.PI`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#PI>), que é a razão entre a circunferência de um círculo e seu diâmetro.

A classe [`Math`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html>) também inclui mais de 40 métodos estáticos. A tabela a seguir lista alguns dos métodos básicos.

#### Calculando um Valor Absoluto

  * [`double abs(double d)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#abs\(double\)>)
  * [`float abs(float f)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#abs\(float\)>)
  * [`int abs(int i)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#abs\(int\)>)
  * [`long abs(long lng)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#abs\(long\)>)

#### Arredondando um Valor

  * [`double ceil(double d)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#ceil\(double\)>): Retorna o menor inteiro que é maior ou igual ao argumento. Retornado como um `double`.
  * [`double floor(double d)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#floor\(double\)>): Retorna o maior inteiro que é menor ou igual ao argumento. Retornado como um `double`.
  * [`double rint(double d)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#rint\(double\)>): Retorna o inteiro que é mais próximo em valor ao argumento. Retornado como um `double`.
  * [`long round(double d)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#round\(double\)>) e [`int round(float f)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#round\(float\)>): Retorna o `long` ou `int` mais próximo, conforme indicado pelo tipo de retorno do método, ao argumento.

#### Calculando um Mínimo

  * [`double min(double arg1, double arg2)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#min\(double,double\)>)
  * [`float min(float arg1, float arg2)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#min\(float,float\)>)
  * [`int min(int arg1, int arg2)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#min\(int,int\)>)
  * [`long min(long arg1, long arg2)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#min\(long,long\)>)

#### Calculando um Máximo

  * [`double max(double arg1, double arg2)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#max\(double,double\)>)
  * [`float max(float arg1, float arg2)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#max\(float,float\)>)
  * [`int max(int arg1, int arg2)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#max\(int,int\)>)
  * [`long max(long arg1, long arg2)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#max\(long,long\)>)

O programa a seguir, `BasicMathDemo`, ilustra como usar alguns desses métodos:

```java
public class BasicMathDemo {
    public static void main(String[] args) {
        double a = -191.635;
        double b = 43.74;
        int c = 16;
        int d = 45;

        System.out.printf("The absolute value of %.3f is %.3f%n", a, Math.abs(a));
        System.out.printf("The ceiling of %.2f is %.2f%n", b, Math.ceil(b));
        System.out.printf("The floor of %.2f is %.2f%n", b, Math.floor(b));
        System.out.printf("The rint of %.2f is %.2f%n", b, Math.rint(b));
        System.out.printf("The round of %.2f is %d%n", b, Math.round(b));
        System.out.printf("The max of %d and %d is %d%n", c, d, Math.max(c, d));
        System.out.printf("The min of %d and %d is %d%n", c, d, Math.min(c, d));
    }
}
```

Aqui está a saída deste programa:

```
The absolute value of -191.635 is 191.635
The ceiling of 43.74 is 44.00
The floor of 43.74 is 43.00
The rint of 43.74 is 44.00
The round of 43.74 is 44
The max of 16 and 45 is 45
The min of 16 and 45 is 16
```

### Métodos Exponenciais e Logarítmicos

A próxima tabela lista os métodos exponenciais e logarítmicos da classe [`Math`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html>).

  * [`double exp(double d)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#exp\(double\)>): Retorna a base dos logaritmos naturais, e, elevada à potência do argumento.
  * [`double log(double d)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#log\(double\)>): Retorna o logaritmo natural do argumento.
  * [`double pow(double base, double exponent)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#pow\(double,double\)>): Retorna o valor do primeiro argumento elevado à potência do segundo argumento.
  * [`double sqrt(double d)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#sqrt\(double\)>): Retorna a raiz quadrada do argumento.

O programa a seguir, `ExponentialDemo`, exibe o valor de `e`, e então chama cada um dos métodos listados na tabela anterior em números escolhidos arbitrariamente:

```java
public class ExponentialDemo {
    public static void main(String[] args) {
        double x = 11.635;
        double y = 2.76;

        System.out.printf("The value of e is %.4f%n", Math.E);
        System.out.printf("exp(%.3f) is %.3f%n", x, Math.exp(x));
        System.out.printf("log(%.3f) is %.3f%n", x, Math.log(x));
        System.out.printf("pow(%.3f, %.3f) is %.3f%n", x, y, Math.pow(x, y));
        System.out.printf("sqrt(%.3f) is %.3f%n", x, Math.sqrt(x));
    }
}
```

Aqui está a saída que você verá ao executar `ExponentialDemo`:

```
The value of e is 2.7183
exp(11.635) is 112000.000
log(11.635) is 2.454
pow(11.635, 2.760) is 874.000
sqrt(11.635) is 3.411
```

### Métodos Trigonométricos

A classe [`Math`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html>) também fornece uma coleção de funções trigonométricas, que são resumidas na tabela a seguir. O valor passado para cada um desses métodos é um ângulo expresso em radianos. Você pode usar o método [`toRadians(double d)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#toRadians\(double\)>) para converter de graus para radianos.

  * [`double sin(double d)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#sin\(double\)>): Retorna o seno do valor `double` especificado.
  * [`double cos(double d)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#cos\(double\)>): Retorna o cosseno do valor `double` especificado.
  * [`double tan(double d)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#tan\(double\)>): Retorna a tangente do valor `double` especificado.
  * [`double asin(double d)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#asin\(double\)>): Retorna o arco seno do valor `double` especificado.
  * [`double acos(double d)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#acos\(double\)>): Retorna o arco cosseno do valor `double` especificado.
  * [`double atan(double d)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#atan\(double\)>): Retorna o arco tangente do valor `double` especificado.
  * [`double atan2(double y, double x)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#atan2\(double,double\)>): Converte coordenadas retangulares (x, y) para coordenadas polares (r, theta) e retorna theta.
  * [`double toDegrees(double d)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#toDegrees\(double\)>) e [`double toRadians(double d)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#toRadians\(double\)>): Converte o argumento para graus ou radianos.

Aqui está um programa, `TrigonometricDemo`, que usa cada um desses métodos para calcular vários valores trigonométricos para um ângulo de 45 graus:

```java
public class TrigonometricDemo {
    public static void main(String[] args) {
        double angle = 45.0;
        double radians = Math.toRadians(angle);

        System.out.printf("The sine of %.1f degrees is %.4f%n", angle, Math.sin(radians));
        System.out.printf("The cosine of %.1f degrees is %.4f%n", angle, Math.cos(radians));
        System.out.printf("The tangent of %.1f degrees is %.4f%n", angle, Math.tan(radians));
        System.out.printf("The arcsine of %.4f is %.4f degrees%n", Math.sin(radians), Math.toDegrees(Math.asin(Math.sin(radians))));
        System.out.printf("The arccosine of %.4f is %.4f degrees%n", Math.cos(radians), Math.toDegrees(Math.acos(Math.cos(radians))));
        System.out.printf("The arctangent of %.4f is %.4f degrees%n", Math.tan(radians), Math.toDegrees(Math.atan(Math.tan(radians))));
    }
}
```

A saída deste programa é a seguinte:

```
The sine of 45.0 degrees is 0.7071
The cosine of 45.0 degrees is 0.7071
The tangent of 45.0 degrees is 1.0000
The arcsine of 0.7071 is 45.0000 degrees
The arccosine of 0.7071 is 45.0000 degrees
The arctangent of 1.0000 is 45.0000 degrees
```

## Números Aleatórios

O método [`random()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#random\(\)>) retorna um número pseudoaleatório selecionado entre 0.0 e 1.0. O intervalo inclui 0.0, mas não 1.0. Em outras palavras: `0.0 <= Math.random() < 1.0`. Para obter um número em um intervalo diferente, você pode realizar operações aritméticas no valor retornado pelo método `random`. Por exemplo, para gerar um inteiro entre 0 e 9, você escreveria:

```java
int number = (int)(Math.random() * 10);
```

Ao multiplicar o valor por 10, o intervalo de valores possíveis se torna `0.0 <= number < 10.0`.

Usar [`Math.random`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#random\(\)>) funciona bem quando você precisa gerar um único número aleatório. Se você precisar gerar uma série de números aleatórios, você deve criar uma instância de [`java.util.Random`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Random.html>) e invocar métodos nesse objeto para gerar números.

### Neste tutorial

Números
Formatando Saída Numérica Impressa
A Classe DecimalFormat
Além da Aritmética Básica
Números Aleatórios

Última atualização: 14 de setembro de 2021

**Tutorial Atual**

Números

➜

**Próximo na Série**

[Caracteres](<#/doc/tutorials/numbers-strings/characters>)

**Próximo na Série:** [Caracteres](<#/doc/tutorials/numbers-strings/characters>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Números e Strings ](<#/doc/tutorials/numbers-strings>) > Números