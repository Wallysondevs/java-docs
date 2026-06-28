# Construtores de String (String Builders)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Números e Strings ](<#/doc/tutorials/numbers-strings>) > Construtores de String

**Anterior na Série**

[Strings](<#/doc/tutorials/numbers-strings/strings>)

➜

**Tutorial Atual**

Construtores de String

➜

**Próximo na Série**

[Autoboxing e Unboxing](<#/doc/tutorials/numbers-strings/autoboxing>)

**Anterior na Série:** [Strings](<#/doc/tutorials/numbers-strings/strings>)

**Próximo na Série:** [Autoboxing e Unboxing](<#/doc/tutorials/numbers-strings/autoboxing>)

# Construtores de String (String Builders)

## A Classe StringBuilder

Objetos [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) são como objetos [`StringBuilder`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html>), exceto que [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) são imodificáveis, enquanto [`StringBuilder`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html>) podem ser modificados.

Internamente, objetos [`StringBuilder`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html>) são tratados como arrays de comprimento variável que contêm uma sequência de caracteres. A qualquer momento, o comprimento e o conteúdo da sequência podem ser alterados através de invocações de métodos.

Strings devem ser sempre usadas, a menos que os string builders ofereçam uma vantagem em termos de código mais simples (veja o programa de exemplo no final desta seção) ou melhor desempenho. Antes do Java SE 9, se você precisasse concatenar um grande número de strings, anexar a um objeto StringBuilder poderia ser mais eficiente. A concatenação de strings foi otimizada no Java SE 9, tornando a concatenação mais eficiente do que a anexação de [`StringBuilder`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html>).

## Comprimento e Capacidade

A classe [`StringBuilder`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html>), assim como a classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>), possui um método [`length()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#length\(\)>) que retorna o comprimento da sequência de caracteres no builder.

Ao contrário das strings, todo string builder também tem uma capacidade, o número de espaços de caracteres que foram alocados. A capacidade, que é retornada pelo método [`capacity()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#capacity\(\)>), é sempre maior ou igual ao comprimento (geralmente maior) e se expandirá automaticamente conforme necessário para acomodar adições ao string builder.

Você pode usar os seguintes construtores da classe [`StringBuilder`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html>):

  * [`StringBuilder()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#%3Cinit%3E\(\)>): Cria um string builder vazio com capacidade de 16 (16 elementos vazios).
  * [`StringBuilder(CharSequence cs)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#%3Cinit%3E\(java.lang.CharSequence\)>): Constrói um string builder contendo os mesmos caracteres que o [`CharSequence`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/CharSequence.html>) especificado, mais 16 elementos vazios adicionais após o [`CharSequence`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/CharSequence.html>).
  * [`StringBuilder(int initCapacity)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#%3Cinit%3E\(int\)>): Cria um string builder vazio com a capacidade inicial especificada.
  * [`StringBuilder(String s)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#%3Cinit%3E\(java.lang.String\)>): Cria um string builder cujo valor é inicializado pela string especificada, mais 16 elementos vazios adicionais após a string.

Por exemplo, o seguinte código

```java
StringBuilder sb = new StringBuilder("Greetings");
```

produzirá um string builder com comprimento de 9 e capacidade de 16:

Comprimento e capacidade de um `StringBuilder`

A classe [`StringBuilder`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html>) possui alguns métodos relacionados a comprimento e capacidade que a classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) não possui:

  * [`void setLength(int newLength)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#setLength\(int\)>): Define o comprimento da sequência de caracteres. Se `newLength` for menor que [`length()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#length\(\)>), os últimos caracteres na sequência de caracteres são truncados. Se `newLength` for maior que [`length()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#length\(\)>), caracteres `null` são adicionados ao final da sequência de caracteres.
  * [`void ensureCapacity(int minCapacity)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#ensureCapacity\(int\)>): Garante que a capacidade seja pelo menos igual ao mínimo especificado.

Várias operações (por exemplo, [`append()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#append\(java.lang.Object\)>), [`insert()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#insert\(int,java.lang.Object\)>) ou [`setLength()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#setLength\(int\)>)) podem aumentar o comprimento da sequência de caracteres no string builder de modo que o [`length()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#length\(\)>) resultante seja maior que a [`capacity()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#capacity\(\)>) atual. Quando isso acontece, a capacidade é automaticamente aumentada.

## Operações StringBuilder

As principais operações em um [`StringBuilder`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html>) que não estão disponíveis em [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) são os métodos [`append()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#append\(java.lang.Object\)>) e [`insert()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#insert\(int,java.lang.Object\)>), que são sobrecarregados para aceitar dados de qualquer tipo. Cada um converte seu argumento para uma string e então anexa ou insere os caracteres dessa string na sequência de caracteres do string builder. O método append sempre adiciona esses caracteres ao final da sequência de caracteres existente, enquanto o método insert adiciona os caracteres em um ponto especificado.

Aqui estão alguns dos métodos da classe [`StringBuilder`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html>).

  * Você pode anexar qualquer tipo primitivo ou objeto a um string builder com um método [`append()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#append\(java.lang.Object\)>). Os dados são convertidos para uma string antes que a operação de anexação ocorra.
  * O método [`delete(int start, int end)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#delete\(int,int\)>) exclui a subsequência de `start` a `end - 1` (inclusive) na sequência de caracteres do [`StringBuilder`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html>).
  * Você pode excluir o `char` no índice `index` com o método [`deleteCharAt(int index)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#deleteCharAt\(int\)>).
  * Você pode inserir qualquer tipo primitivo ou objeto no `offset` fornecido com um dos métodos [`insert(int offset, Object)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#insert\(int,java.lang.Object\)>). Esses métodos recebem o elemento a ser inserido como um segundo argumento. Os dados são convertidos para uma string antes que a operação de inserção ocorra. Observe que este método possui sobrecargas para cada um dos tipos primitivos, para arrays de `char`, para String e CharSequence.
  * Você pode substituir caracteres com os métodos [`replace(int start, int end, String s)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#replace\(int,int,java.lang.String\)>) e [`setCharAt(int index, char c)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#setCharAt\(int,char\)>).
  * Você pode inverter a sequência de caracteres neste string builder com o método [`reverse()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#reverse\(\)>).
  * Você pode retornar uma string que contém a sequência de caracteres no builder com o método [`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#toString\(\)>).

> Nota: Você pode usar qualquer método [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) em um objeto [`StringBuilder`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html>) primeiro convertendo o string builder para uma string com o método [`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#toString\(\)>) da classe [`StringBuilder`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html>). Em seguida, converta a string de volta para um string builder usando o construtor [`StringBuilder(String string)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#%3Cinit%3E\(java.lang.String\)>).

## StringBuilder em Ação

O programa `StringDemo` que foi listado na seção intitulada "Strings" é um exemplo de um programa que seria mais eficiente se um [`StringBuilder`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html>) fosse usado em vez de uma [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>).

`StringDemo` inverteu um palíndromo. Aqui, mais uma vez, está sua listagem:

```java
class StringDemo {
    public static void main(String[] args) {
        String palindrome = "Dot saw I was Tod";
        int len = palindrome.length();
        char[] tempCharArray = new char[len];
        char[] charArray = new char[len];

        // put original string in an
        // array of chars
        for (int i = 0; i < len; i++) {
            tempCharArray[i] = 
                palindrome.charAt(i);
        }

        // reverse array of chars
        for (int j = 0; j < len; j++) {
            charArray[j] = 
                tempCharArray[len - 1 - j];
        }

        String reversePalindrome =
            new String(charArray);
        System.out.println(reversePalindrome);
    }
}
```

A execução do programa produz esta saída:

```
doT saw I was toD
```

Para realizar a inversão da string, o programa converte a string em um array de caracteres (primeiro loop `for`), inverte o array em um segundo array (segundo loop `for`) e então converte de volta para uma string.

Se você converter a string do palíndromo para um string builder, você pode usar o método [`reverse()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html#reverse\(\)>) na classe [`StringBuilder`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html>). Isso torna o código mais simples e fácil de ler:

```java
class StringDemo {
    public static void main(String[] args) {
        String palindrome = "Dot saw I was Tod";
        StringBuilder sb = new StringBuilder(palindrome);

        sb.reverse();  // reverse it

        System.out.println(sb);
    }
}
```

A execução deste programa produz a mesma saída:

```
doT saw I was toD
```

Observe que [`println()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#println\(java.lang.Object\)>) imprime um string builder, como em:

```java
System.out.println(sb);
```

porque `sb.toString()` é chamado implicitamente, assim como acontece com qualquer outro objeto em uma invocação de [`println`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintStream.html#println\(java.lang.Object\)>).

> Nota: Existe também uma classe [`StringBuffer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuffer.html>) que é exatamente igual à classe [`StringBuilder`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuilder.html>), exceto que ela é thread-safe por ter seus métodos sincronizados. A menos que você precise absolutamente de uma classe thread-safe, você não precisa usar [`StringBuffer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuffer.html>).

### Neste tutorial

A Classe StringBuilder Comprimento e Capacidade Operações StringBuilder StringBuilder em Ação

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Strings](<#/doc/tutorials/numbers-strings/strings>)

➜

**Tutorial Atual**

Construtores de String

➜

**Próximo na Série**

[Autoboxing e Unboxing](<#/doc/tutorials/numbers-strings/autoboxing>)

**Anterior na Série:** [Strings](<#/doc/tutorials/numbers-strings/strings>)

**Próximo na Série:** [Autoboxing e Unboxing](<#/doc/tutorials/numbers-strings/autoboxing>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Números e Strings ](<#/doc/tutorials/numbers-strings>) > Construtores de String