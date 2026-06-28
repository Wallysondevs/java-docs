# Caracteres

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Números e Strings ](<#/doc/tutorials/numbers-strings>) > Caracteres

**Anterior na Série**

[Números](<#/doc/tutorials/numbers-strings/numbers>)

➜

**Tutorial Atual**

Caracteres

➜

**Próximo na Série**

[Strings](<#/doc/tutorials/numbers-strings/strings>)

**Anterior na Série:** [Números](<#/doc/tutorials/numbers-strings/numbers>)

**Próximo na Série:** [Strings](<#/doc/tutorials/numbers-strings/strings>)

# Caracteres

## Caracteres

Na maioria das vezes, se você estiver usando um único valor de caractere, usará o tipo primitivo `char`. Por exemplo:

```java
char ch = 'a';
```

Há momentos, no entanto, em que você precisa usar um `char` como um objeto — por exemplo, como um argumento de método onde um objeto é esperado. A linguagem de programação Java fornece uma classe wrapper que "envolve" o `char` em um objeto [`Character`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html>) para esse fim. Um objeto do tipo [`Character`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html>) contém um único campo, cujo tipo é `char`. Esta classe [`Character`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html>) também oferece vários métodos de classe úteis (ou seja, estáticos) para manipular caracteres.

Você pode criar um objeto [`Character`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html>) com o construtor [`Character`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html>):

```java
Character ch = new Character('a');
```

O compilador Java também criará um objeto [`Character`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html>) para você em algumas circunstâncias. Por exemplo, se você passar um `char` primitivo para um método que espera um objeto, o compilador converterá automaticamente o `char` para um [`Character`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html>) para você. Este recurso é chamado de _autoboxing_ — ou _unboxing_, se a conversão for no sentido inverso. Para mais informações sobre autoboxing e unboxing, consulte a seção [Autoboxing e Unboxing](<#/doc/tutorials/numbers-strings/autoboxing>).

> Nota: A classe [`Character`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html>) é imutável, de modo que, uma vez criado, um objeto [`Character`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html>) não pode ser alterado.

A tabela a seguir lista alguns dos métodos mais úteis na classe [`Character`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html>), mas não é exaustiva. Para uma lista completa de todos os métodos nesta classe (existem mais de 50), consulte a especificação da API [`Character`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html>).

*   [`boolean isLetter(char ch)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html#isLetter\(char\)>) e [`boolean isDigit(char ch)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html#isDigit\(char\)>) : Determina se o valor `char` especificado é uma letra ou um dígito, respectivamente.
*   [`boolean isWhitespace(char ch)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html#isWhitespace\(char\)>): Determina se o valor `char` especificado é um espaço em branco.
*   [`boolean isUpperCase(char ch)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html#isUpperCase\(char\)>) e [`boolean isLowerCase(char ch)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html#isLowerCase\(char\)>): Determina se o valor `char` especificado está em maiúsculas ou minúsculas, respectivamente.
*   [`char toUpperCase(char ch)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html#toUpperCase\(char\)>) e [`char toLowerCase(char ch)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html#toLowerCase\(char\)>): Retorna a forma maiúscula ou minúscula do valor `char` especificado.
*   [`toString(char ch)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html#toString\(char\)>): Retorna um objeto [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) representando o valor de caractere especificado — ou seja, uma string de um caractere.

## Caracteres e Pontos de Código

A plataforma Java suporta o Padrão Unicode desde o JDK 1.0.2. Aqui estão as versões suportadas por versão do JDK.

| Lançamento Java | Versão Unicode |
| :-------------- | :------------- |
| Java SE 26      | Unicode 17.0   |
| Java SE 24      | Unicode 16.0   |
| Java SE 22      | Unicode 15.1   |
| Java SE 20      | Unicode 15.0   |
| Java SE 19      | Unicode 14.0   |
| Java SE 15      | Unicode 13.0   |
| Java SE 13      | Unicode 12.1   |
| Java SE 12      | Unicode 11.0   |
| Java SE 11      | Unicode 10.0   |
| Java SE 9       | Unicode 8.0    |
| Java SE 8       | Unicode 6.2    |
| Java SE 7       | Unicode 6.0    |
| Java SE 5.0     | Unicode 4.0    |
| Java SE 1.4     | Unicode 3.0    |
| JDK 1.1         | Unicode 2.0    |
| JDK 1.0.2       | Unicode 1.1.5  |

O tipo de dado `char` e a classe [`Character`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html>) são baseados na especificação Unicode original, que definia caracteres como entidades de 16 bits de largura fixa. O Padrão Unicode foi alterado desde então para permitir caracteres cuja representação requer mais de 16 bits. O intervalo de pontos de código válidos agora é U+0000 a U+10FFFF, conhecido como valor escalar Unicode.

Um valor `char` é codificado com 16 bits. Ele pode, portanto, representar números de `0x0000` a `0xFFFF`. Este conjunto de caracteres é às vezes referido como o _Plano Multilíngue Básico (BMP)_. Caracteres cujos pontos de código são maiores que `0xFFFF` (notado U+FFFF) são chamados de _caracteres suplementares_.

Um valor `char`, portanto, representa pontos de código do Plano Multilíngue Básico (BMP). Um valor `int` representa todos os pontos de código Unicode, incluindo pontos de código suplementares. Salvo especificação em contrário, o comportamento em relação a caracteres suplementares e valores `char` substitutos é o seguinte:

*   Os métodos que aceitam apenas um valor `char` não podem suportar caracteres suplementares. Eles tratam os valores `char` dos intervalos substitutos como caracteres indefinidos.
*   Os métodos que aceitam um valor `int` suportam todos os caracteres Unicode, incluindo caracteres suplementares.

Você pode consultar a documentação da classe [`Character`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html>) para mais informações.

## Sequência de Escape

Um caractere precedido por uma barra invertida (`\`) é uma sequência de escape e tem um significado especial para o compilador. A tabela a seguir mostra as sequências de escape Java:

| Sequência de Escape              | Descrição                                                              |
| :------------------------------- | :--------------------------------------------------------------------- |
| `\t`                             | Insere uma tabulação no texto neste ponto.                             |
| `\b`                             | Insere um backspace no texto neste ponto.                              |
| `\n`                             | Insere uma nova linha no texto neste ponto.                            |
| `\r`                             | Insere um retorno de carro no texto neste ponto.                       |
| `\f`                             | Insere um avanço de página no texto neste ponto.                       |
| `\s`                             | Insere um espaço no texto neste ponto.                                |
| `\'`                             | Insere um caractere de aspas simples no texto neste ponto.             |
| `\"`                             | Insere um caractere de aspas duplas no texto neste ponto.              |
| `\\`                             | Insere um caractere de barra invertida no texto neste ponto.           |
| `\` seguido por um terminador de linha | Não insere o terminador de linha no texto neste ponto.                 |

Quando uma sequência de escape é encontrada em uma instrução de impressão, o compilador a interpreta de acordo. Por exemplo, se você quiser colocar aspas dentro de aspas, deve usar a sequência de escape, `\"`, nas aspas internas. Para imprimir a frase

```
"When in the course of human events, it becomes necessary for one people..."
```

você escreveria

```java
System.out.println("\"When in the course of human events, it becomes necessary for one people...\"");
```

### Neste tutorial

Caracteres Caracteres e Pontos de Código Sequências de Escape

Última atualização: 10 de maio de 2026

**Anterior na Série**

[Números](<#/doc/tutorials/numbers-strings/numbers>)

➜

**Tutorial Atual**

Caracteres

➜

**Próximo na Série**

[Strings](<#/doc/tutorials/numbers-strings/strings>)

**Anterior na Série:** [Números](<#/doc/tutorials/numbers-strings/numbers>)

**Próximo na Série:** [Strings](<#/doc/tutorials/numbers-strings/strings>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Números e Strings ](<#/doc/tutorials/numbers-strings>) > Caracteres