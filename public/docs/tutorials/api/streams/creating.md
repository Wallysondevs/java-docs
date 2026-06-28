# Criando Streams

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A Stream API ](<#/doc/tutorials/api/streams>) > Criando Streams

**Anterior na Série**

[Adicionando Operações Intermediárias em um Stream](<#/doc/tutorials/api/streams/intermediate-operation>)

➜

**Tutorial Atual**

Criando Streams

➜

**Próximo na Série**

[Reduzindo um Stream](<#/doc/tutorials/api/streams/reducing>)

**Anterior na Série:** [Adicionando Operações Intermediárias em um Stream](<#/doc/tutorials/api/streams/intermediate-operation>)

**Próximo na Série:** [Reduzindo um Stream](<#/doc/tutorials/api/streams/reducing>)

# Criando Streams

## Criando um Stream

Você já criou muitos streams neste tutorial, todos chamando o método [`stream()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#stream\(\)>) da interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>). Este método é muito conveniente: criar streams dessa forma requer apenas duas linhas de código simples, e você pode usar este stream para experimentar quase qualquer recurso da Stream API.

Como você verá, existem muitas outras maneiras de criar streams em diversos objetos. Conhecer essas formas permite que você aproveite a Stream API em muitos lugares da sua aplicação e escreva um código mais legível e de fácil manutenção.

Vamos rapidamente dar uma olhada naqueles que você verá neste tutorial antes de nos aprofundarmos em cada um deles.

O primeiro conjunto de padrões usa métodos de fábrica da interface [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>). Com eles, você pode criar streams a partir dos seguintes elementos:

  * um argumento vararg;
  * um supplier;
  * um operador unário, que gera o próximo elemento a partir do anterior;
  * um builder.

Você pode até criar um stream vazio, o que pode ser conveniente em algumas circunstâncias.

Você já viu que pode criar um stream em uma collection. Se o que você tem é apenas um iterator e não uma collection completa, então há um padrão para você: você pode criar um stream em um iterator. Se você tem um array, então também há um padrão para criar um stream nos elementos de um array.

Não para por aí. Muitos padrões também foram adicionados a objetos bem conhecidos do JDK. Você pode então criar streams a partir dos seguintes elementos:

  * os caracteres de uma string;
  * as linhas de um arquivo de texto;
  * os elementos criados dividindo uma string de caracteres com uma expressão regular;
  * uma variável aleatória, que pode criar um stream de números aleatórios.

Você também pode criar um stream com um padrão builder.

## Criando um Stream a partir de uma Collection ou um Iterator

Você já sabe que existe um método [`stream()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html#stream\(\)>) disponível na interface [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>). Esta é provavelmente a maneira mais clássica de criar streams.

Em alguns casos, você pode precisar criar um stream sobre o conteúdo de um map. Não há um método `stream()` na interface [`Map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>), então você não pode criar tal stream diretamente. Mas você pode acessar o conteúdo de um map através de três collections:

  * o conjunto das chaves, com [`keySet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#keySet\(\)>)
  * o conjunto dos pares chave-valor, com [`entrySet()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#entrySet\(\)>)
  * a collection dos valores, com [`values()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#values\(\)>).

O padrão correto a ser usado é obter uma dessas collections e criar um stream sobre ela.

A Stream API oferece um padrão para criar um stream a partir de um iterator simples. Um iterator é um objeto muito simples de criar, então pode ser uma maneira muito conveniente de criar um stream em uma fonte de dados não padrão. O padrão é o seguinte.

```java
import java.util.Iterator;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;
import java.util.Spliterator;
import java.util.Spliterators;

public class IteratorToStream {
    public static void main(String[] args) {
        Iterator<String> iterator = new Iterator<String>() {
            private int count = 0;
            private String[] data = {"A", "B", "C", "D", "E"};

            @Override
            public boolean hasNext() {
                return count < data.length;
            }

            @Override
            public String next() {
                return data[count++];
            }
        };

        Stream<String> stream = StreamSupport.stream(
            Spliterators.spliteratorUnknownSize(
                iterator, Spliterator.ORDERED), false);

        stream.forEach(System.out::println);
    }
}
```

A execução do código anterior produz o seguinte resultado.

```
A
B
C
D
E
```

Este padrão contém vários elementos "mágicos" que serão abordados mais adiante neste tutorial. Vamos rapidamente dar uma olhada neles.

O `estimateSize` é o número de elementos que você acha que este stream consumirá. Há casos em que esta informação é simples de obter: por exemplo, se você está criando um stream em um array ou uma collection. Mas também há casos em que esta informação é desconhecida.

O parâmetro `characteristics` será abordado mais adiante neste tutorial. Ele é usado para otimizar o processamento dos seus dados.

O argumento `parallel` informa à API se o stream que você deseja criar é um parallel stream ou não. Parallel streams também serão abordados mais adiante neste tutorial.

## Criando um Stream Vazio

Vamos começar com o mais simples desses padrões: a criação de um stream vazio. Existe um método de fábrica para isso na interface [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>). Você pode usá-lo da seguinte maneira.

```java
import java.util.stream.Stream;

public class EmptyStream {
    public static void main(String[] args) {
        Stream<String> emptyStream = Stream.empty();
        emptyStream.forEach(System.out::println);
    }
}
```

A execução deste código exibe o seguinte.

```
```

Há casos em que criar um stream vazio pode ser muito útil. Na verdade, você viu um na [parte anterior deste tutorial](<#/doc/tutorials/api/streams/intermediate-operation>). O padrão que você viu usa streams vazios e flatmap para remover elementos inválidos de um stream. A partir do Java SE 16, este padrão foi substituído pelo padrão [`mapMulti()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#mapMulti\(java.util.function.BiConsumer\)>).

## Criando um Stream a partir de um Vararg ou um Array

Estes dois primeiros padrões são muito semelhantes. O primeiro usa o método de fábrica [`of()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#of\(T...\)>) na interface [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>). O segundo usa o método de fábrica [`stream()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html#stream\(int%5B%5D\)>) da classe de fábrica [`Arrays`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html>). E, de fato, se você verificar o código-fonte do método [`Stream.of()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#of\(T...\)>), verá que ele chama [`Arrays.stream()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html#stream\(int%5B%5D\)>).

Aqui está este primeiro padrão em ação.

```java
import java.util.stream.Stream;

public class VarargStream {
    public static void main(String[] args) {
        Stream<String> stream = Stream.of("A", "B", "C", "D", "E");
        stream.forEach(System.out::println);
    }
}
```

A execução deste primeiro exemplo fornece o seguinte:

```
A
B
C
D
E
```

Aqui está o segundo.

```java
import java.util.Arrays;
import java.util.stream.Stream;

public class ArrayStream {
    public static void main(String[] args) {
        String[] data = {"A", "B", "C", "D", "E"};
        Stream<String> stream = Arrays.stream(data);
        stream.forEach(System.out::println);
    }
}
```

A execução deste segundo exemplo fornece o seguinte:

```
A
B
C
D
E
```

## Criando um Stream a partir de um Supplier

Existem dois métodos de fábrica na interface [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>) para isso.

O primeiro é [`generate()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#generate\(java.util.function.Supplier\)>) que recebe um supplier como argumento. Toda vez que um novo elemento é necessário, este supplier é chamado.

Você pode criar um stream assim com o seguinte código, mas não o faça!

```java
import java.util.stream.Stream;

public class GenerateStream {
    public static void main(String[] args) {
        Stream<String> stream = Stream.generate(() -> "A").limit(5);
        stream.forEach(System.out::println);
    }
}
```

A execução do exemplo anterior produz o seguinte resultado.

```
A
A
A
A
A
```

Se você executar este código sem o `limit()`, verá que ele nunca irá parar. Se você o fez e foi paciente o suficiente, poderá ver um [`OutOfMemoryError`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/OutOfMemoryError.html>). Caso contrário, você pode encerrar sua aplicação através do seu IDE. Este stream produz elementos e nunca para. Ele realmente produz um stream infinito.

Ainda não abordamos este ponto, mas é perfeitamente legal ter tais streams! Você pode estar se perguntando qual seria o uso deles? Na verdade, há muitos. Para usá-los, você precisa "cortar" este stream em algum ponto, e a Stream API oferece várias maneiras de fazer isso. Adicionar uma operação intermediária `limit()` é uma delas, e há mais por vir.

O método [`limit()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#limit\(long\)>) é chamado de método _short-circuiting_: ele pode interromper o consumo dos elementos de um stream. Você deve se lembrar que os dados são processados um elemento por vez em um stream: cada elemento atravessa todas as operações definidas em seu stream, da primeira à última. Esta é a razão pela qual esta operação de limite pode interromper a geração de mais elementos.

## Criando um Stream a partir de um UnaryOperator e uma Seed

Usar um supplier é ótimo se você precisa gerar streams constantes. Se você precisa de um stream infinito com valores variáveis, então você pode usar o padrão [`iterate()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#iterate\(T,java.util.function.UnaryOperator\)>).

Este padrão funciona com uma seed, que é o primeiro elemento gerado. Em seguida, ele usa um [`UnaryOperator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/UnaryOperator.html>) para gerar o próximo elemento do stream transformando o elemento anterior.

```java
import java.util.stream.Stream;

public class IterateStream {
    public static void main(String[] args) {
        Stream<Integer> stream = Stream.iterate(0, n -> n + 2).limit(5);
        stream.forEach(System.out::println);
    }
}
```

Você deve ver o seguinte resultado.

```
0
2
4
6
8
```

Não se esqueça de limitar o número de elementos processados pelo seu stream ao usar este padrão.

A partir do Java SE 9, este padrão possui uma sobrecarga, que recebe um predicate como argumento. O método [`iterate()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#iterate\(T,java.util.function.UnaryOperator\)>) para de gerar elementos quando este predicate se torna falso. O código anterior pode usar este padrão da seguinte maneira.

```java
import java.util.stream.Stream;

public class IterateStreamWithPredicate {
    public static void main(String[] args) {
        Stream<Integer> stream = Stream.iterate(0, n -> n < 10, n -> n + 2);
        stream.forEach(System.out::println);
    }
}
```

A execução deste código fornece o mesmo resultado que o anterior.

```
0
2
4
6
8
```

## Criando um Stream a partir de um Intervalo de Números

É fácil criar um intervalo de números com o padrão anterior. Mas é ainda mais fácil com os streams especializados de números e seus métodos de fábrica [`range()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#range\(int,int\)>).

O método [`range()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#range\(int,int\)>) recebe o valor inicial e o limite superior do intervalo, excluído. Você também pode incluir o limite superior com o método [`rangeClosed()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#rangeClosed\(int,int\)>). Chamar [`LongStream.range(0L, 10L)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/LongStream.html#range\(long,long\)>) simplesmente gerará um stream com todos os longs entre 0 e 9.

Este método [`range()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#range\(int,int\)>) também pode ser usado para iterar pelos elementos de um array. Veja como você pode fazer isso.

```java
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class RangeStream {
    public static void main(String[] args) {
        String[] data = {"A", "B", "C", "D", "E"};
        Stream<String> stream = IntStream.range(0, data.length)
                                         .mapToObj(i -> data[i]);
        stream.forEach(System.out::println);
    }
}
```

O resultado é o seguinte.

```
A
B
C
D
E
```

Há muitas coisas que você pode fazer, com base neste padrão. Observe que, como [`IntStream.range()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#range\(int,int\)>) cria um [`IntStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html>), você precisa usar o método [`mapToObj()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#mapToObj\(java.util.function.IntFunction\)>) para mapeá-lo para um stream de objetos.

## Criando um Stream de Números Aleatórios

A classe [`Random`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Random.html>) é usada para criar séries aleatórias de números. A partir do Java SE 8, vários métodos foram adicionados a esta classe para criar streams de números aleatórios de diferentes tipos: `int`, `long` e `double`.

Você pode criar uma instância de [`Random`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Random.html>) fornecendo uma seed. Esta seed é um parâmetro `long`. Os números aleatórios dependem dessa seed. Para uma dada seed, você sempre obterá a mesma sequência de números. Isso pode ser útil em muitas circunstâncias, incluindo a escrita de testes. Nesse caso, você pode confiar em uma sequência de números que é conhecida antecipadamente.

Existem três métodos para gerar tal stream, todos definidos na classe [`Random`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Random.html>): [`ints()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Random.html#ints\(\)>), [`longs()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Random.html#longs\(\)>) e [`doubles()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Random.html#doubles\(\)>).

Várias sobrecargas estão disponíveis para todos esses métodos, que aceitam os seguintes argumentos:

  * o número de elementos que este stream gerará;
  * os limites superior e inferior dos números aleatórios gerados. Observe que o limite inferior está incluído no intervalo, e o limite superior não.

Aqui está um primeiro padrão de código que gera 10 inteiros aleatórios entre 1 e 4.

```java
import java.util.Random;
import java.util.stream.Stream;

public class RandomIntStream {
    public static void main(String[] args) {
        Random random = new Random(123456789L);
        Stream<Integer> stream = random.ints(10, 1, 5).boxed();
        stream.forEach(System.out::println);
    }
}
```

Se você usou a mesma seed que a usada neste exemplo, você terá o seguinte em seu console.

```
1
4
4
3
1
3
2
4
3
1
```

Observe que usamos o método [`boxed()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html#boxed\(\)>) disponível no stream especializado de números, que simplesmente mapeia este stream para o stream equivalente de tipos wrapper. Assim, um [`IntStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html>) é mapeado para um [`Stream<Integer>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>) por este método.

Aqui está um segundo padrão que gera um stream de booleanos aleatórios. Qualquer elemento desse stream é true com uma probabilidade de 80%.

```java
import java.util.Random;
import java.util.stream.Stream;

public class RandomBooleanStream {
    public static void main(String[] args) {
        Random random = new Random(123456789L);
        Stream<Boolean> stream = random.doubles(10)
                                       .mapToObj(d -> d < 0.8);
        stream.forEach(System.out::println);
    }
}
```

Se você usou a mesma seed que a que usamos neste exemplo, verá o seguinte resultado.

```
true
true
true
true
true
true
true
true
true
false
```

Você pode adaptar este padrão para gerar qualquer tipo de objeto com a probabilidade que precisar. Aqui está outro exemplo que gera um stream com as letras A, B, C e D. A probabilidade para cada letra é a seguinte:

  * 50% de A;
  * 30% de B;
  * 10% de C;
  * 10% de D.

```java
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class RandomLetterStream {
    public static void main(String[] args) {
        Random random = new Random(123456789L);
        Stream<String> stream = random.doubles(100)
                                      .mapToObj(d -> {
                                          if (d < 0.5) return "A";
                                          if (d < 0.8) return "B";
                                          if (d < 0.9) return "C";
                                          return "D";
                                      });

        Map<String, Long> result = stream.collect(
            Collectors.groupingBy(s -> s, Collectors.counting()));

        System.out.println(result);
    }
}
```

Com a mesma seed, você obterá o seguinte resultado.

```
{A=51, B=29, C=10, D=10}
```

A construção do map com este [`groupingBy()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#groupingBy\(java.util.function.Function,java.util.stream.Collector\)>) pode parecer confusa para você neste momento. Não se preocupe; este padrão será abordado mais adiante neste tutorial.

## Criando um Stream a partir dos Caracteres de uma String

A classe [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) teve a adição de um método [`chars()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#chars\(\)>) no Java SE 8. Este método retorna um [`IntStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/IntStream.html>) que fornece os caracteres desta string.

Cada caractere é dado como um code point, um inteiro que pode lembrá-lo dos códigos ASCII. Em alguns casos, você pode precisar converter este inteiro para uma string, apenas contendo este caractere.

Você tem dois padrões para fazer isso, dependendo da versão do JDK que você está usando.

Até o Java SE 10, você pode usar o seguinte código.

```java
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class StringCharsStreamOld {
    public static void main(String[] args) {
        String s = "Hello World";
        Stream<String> stream = s.chars()
                                 .mapToObj(c -> String.valueOf((char) c));
        stream.forEach(System.out::println);
    }
}
```

A execução do código anterior fornece o seguinte resultado.

```
H
e
l
l
o
 
W
o
r
l
d
```

Um método de fábrica [`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html#toString\(int\)>) foi adicionado à classe [`Character`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Character.html>) no Java SE 11, que você pode usar para simplificar este código.

```java
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class StringCharsStreamNew {
    public static void main(String[] args) {
        String s = "Hello World";
        Stream<String> stream = s.chars()
                                 .mapToObj(Character::toString);
        stream.forEach(System.out::println);
    }
}
```

Este código produz a mesma saída.

```
H
e
l
l
o
 
W
o
r
l
d
```

## Criando um Stream a partir das Linhas de um Arquivo de Texto

Ser capaz de abrir um stream em um arquivo de texto é um padrão muito poderoso.

A API de I/O do Java possui um padrão para ler uma única linha de um arquivo de texto: [`BufferedReader.readLine()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html#readLine\(\)>). Você pode chamar este método de um loop e ler seu arquivo de texto inteiro linha por linha para processá-lo.

Ser capaz de processar essas linhas com a Stream API oferece um código mais legível e de fácil manutenção.

Existem vários padrões para criar tal stream.

Se você precisa refatorar um código existente baseado no uso de um buffered reader, então você pode usar o método [`lines()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html#lines\(\)>) definido neste objeto. Se você está escrevendo um novo código para processar o conteúdo do seu arquivo de texto, então você pode usar o método de fábrica [`Files.lines()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#lines\(java.nio.file.Path\)>). Este último método recebe um [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) como argumento e possui um método sobrecarregado que recebe um [`Charset`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/charset/Charset.html>) caso o arquivo que você está lendo não esteja codificado em UTF-8.

Você deve estar ciente de que um recurso de arquivo, como qualquer recurso de I/O, deve ser fechado quando você não precisar mais dele. Como você está usando este recurso de arquivo através da Stream API, você pode estar se perguntando como irá lidar com isso.

Bem, a boa notícia é que a interface [`Stream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>) estende a interface [`BaseStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/BaseStream.html>) que estende a interface [`AutoCloseable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/AutoCloseable.html>). Um stream é, por si só, um recurso que você pode fechar caso precise. Isso não era realmente necessário em todos os exemplos em memória que você viu, mas ao lidar com recursos de I/O, torna-se obrigatório.

Aqui está um exemplo que conta o número de warnings em um arquivo de log. Observe que, devido às limitações do Playground, você não pode executar este código em seu navegador. Para executá-lo, você precisa copiá-lo, colá-lo em seu IDE e ajustar o path para se adequar à sua instalação local.

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

public class LogFileStream {
    public static void main(String[] args) {
        Path logFile = Paths.get("path/to/your/logfile.log"); // Adjust this path
        long warningCount = 0;

        try (Stream<String> lines = Files.lines(logFile)) {
            warningCount = lines.filter(line -> line.contains("WARNING"))
                                .count();
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
        }

        System.out.println("Number of warnings: " + warningCount);
    }
}
```

O padrão try-with-resources chamará o método [`close()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/AutoCloseable.html#close\(\)>) do seu stream, que por sua vez fechará corretamente o arquivo de texto que você analisou.
## Criando um Stream a partir de uma Expressão Regular

O último exemplo desta série de padrões é um método adicionado à classe [`Pattern`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html>) para criar um stream sobre os elementos gerados pela aplicação de uma expressão regular a uma string de caracteres.

Suponha que você precise dividir uma string em um determinado separador. Você tem dois padrões para fazer isso.

  * Você pode chamar o método [`String.split()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html#split\(java.lang.String\)>);
  * Ou, você pode usar o padrão [`Pattern.compile().split()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#split\(java.lang.CharSequence\)>).

Ambos os padrões fornecem um array de strings, contendo os elementos resultantes da divisão.

Você viu o padrão para criar um stream a partir deste array. Vamos escrever este código.

```java
import java.util.Arrays;
import java.util.regex.Pattern;
import java.util.stream.Stream;

public class SplitExample {
    public static void main(String[] args) {
        String text = "one,two,three,four";
        String[] parts = text.split(",");
        Stream<String> stream = Arrays.stream(parts);
        stream.forEach(System.out::println);

        System.out.println("--- Using Pattern.compile().split() ---");
        Pattern pattern = Pattern.compile(",");
        String[] patternParts = pattern.split(text);
        Stream<String> patternStream = Arrays.stream(patternParts);
        patternStream.forEach(System.out::println);
    }
}
```

Executar o código anterior imprime o seguinte.

```
one
two
three
four
--- Using Pattern.compile().split() ---
one
two
three
four
```

A classe [`Pattern`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html>) também tem um método para você. O que você pode fazer é chamar [`Pattern.compile().splitAsStream()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#splitAsStream\(java.lang.CharSequence\)>). Aqui está um exemplo de código que você pode escrever usando este método.

```java
import java.util.regex.Pattern;
import java.util.stream.Stream;

public class SplitAsStreamExample {
    public static void main(String[] args) {
        String text = "one,two,three,four";
        Pattern pattern = Pattern.compile(",");
        Stream<String> stream = pattern.splitAsStream(text);
        stream.forEach(System.out::println);
    }
}
```

Executar este código produz o mesmo resultado.

```
one
two
three
four
```

Você pode estar se perguntando qual dos dois padrões é o melhor. Para responder a esta pergunta, você precisa analisar de perto o primeiro padrão. Primeiro, você cria um array para armazenar o resultado da divisão, então você cria um stream sobre este array.

```java
String[] parts = text.split(",");
Stream<String> stream = Arrays.stream(parts);
```

Não há criação de array no segundo padrão, portanto, menos overhead.

```java
Stream<String> stream = pattern.splitAsStream(text);
```

Você já viu que alguns streams podem usar operações de _short-circuit_ (mais sobre este ponto mais adiante neste tutorial). Se você tiver um stream assim, dividir a string inteira e criar o array resultante pode ser um overhead importante, mas inútil. Não é certo que seu pipeline de stream consumirá todos os seus elementos para produzir um resultado.

Mesmo que seu stream precise consumir todos os elementos para produzir seu resultado, armazenar todos esses elementos em um array ainda é um overhead de memória que você não precisa pagar.

Então, em ambos os casos, usar o padrão [`splitAsStream()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/regex/Pattern.html#splitAsStream\(java.lang.CharSequence\)>) é melhor. É melhor em termos de memória e, em alguns casos, em termos de CPU.

## Criando um Stream com o Padrão Builder

Criar um stream usando este padrão é um processo de duas etapas. Primeiro, você adiciona os elementos que seu stream consumirá no builder. Em seguida, você cria o stream a partir deste builder. Uma vez que seu builder tenha sido usado para criar seu stream, você não pode adicionar mais elementos a ele, nem pode usá-lo novamente para construir outro stream. Você receberá uma [`IllegalStateException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IllegalStateException.html>) se fizer isso.

O padrão é o seguinte.

```java
import java.util.stream.Stream;

public class StreamBuilderExample {
    public static void main(String[] args) {
        Stream.Builder<String> builder = Stream.builder();
        builder.add("apple");
        builder.add("banana");
        builder.add("orange");

        Stream<String> fruitStream = builder.build();
        fruitStream.forEach(System.out::println);

        // Trying to add more elements after building will throw IllegalStateException
        // builder.add("grape"); // This would throw an exception
    }
}
```

Executar este código imprime o seguinte.

```
apple
banana
orange
```

## Criando um Stream a partir de uma Fonte HTTP

O último padrão que abordamos neste tutorial é sobre a análise do corpo de uma resposta HTTP. Você viu que pode criar um stream sobre as linhas de um arquivo de texto, e pode fazer o mesmo sobre o corpo de uma resposta HTTP. Este padrão é fornecido pela HTTP Client API, adicionada ao JDK 11.

Veja como funciona. Vamos usá-lo em um texto disponível online: _A Tale of Two Cities_ , de Charles Dickens, disponibilizado online pelo Projeto Gutenberg aqui: <https://www.gutenberg.org/files/98/98-0.txt>

O início do arquivo de texto fornece informações sobre o próprio texto. O livro começa na linha que contém "A TALE OF TWO CITIES". O final do arquivo é a licença sob a qual este arquivo é distribuído.

Precisamos apenas do texto do livro e gostaríamos de remover o cabeçalho e o rodapé deste arquivo distribuído. Observe que você não pode executar este código em seu navegador. Você precisa copiá-lo e colá-lo em sua IDE.

```java
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class HttpStreamExample {
    public static void main(String[] args) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://www.gutenberg.org/files/98/98-0.txt"))
                .build();

        HttpResponse<Stream<String>> response = client.send(request, HttpResponse.BodyHandlers.ofLines());

        List<String> bookLines = response.body()
                .dropWhile(line -> !line.contains("A TALE OF TWO CITIES"))
                .takeWhile(line -> !line.contains("End of the Project Gutenberg EBook"))
                .collect(Collectors.toList());

        bookLines.stream()
                .limit(10) // Print only the first 10 lines for brevity
                .forEach(System.out::println);
    }
}
```

Executar este código imprimirá o seguinte.

```
A TALE OF TWO CITIES
A STORY OF THE FRENCH REVOLUTION
BY CHARLES DICKENS
BOOK THE FIRST. RECALLED TO LIFE
CHAPTER I. THE PERIOD
IT was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way—in short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.
```

O stream é criado pelo body handler que você fornece como argumento para o método [`send()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.net.http/java/net/http/HttpClient.html#send\(java.net.http.HttpRequest,java.net.http.HttpResponse.BodyHandler\)>). A HTTP Client API oferece vários body handlers. O que você precisa para consumir o corpo como um stream é aquele criado pelo método de fábrica [`HttpResponse.BodyHandlers.ofLines()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.net.http/java/net/http/HttpResponse.BodyHandlers.html#ofLines\(\)>). Esta forma de consumir o corpo da resposta é muito eficiente em termos de memória. Se você escrever seu stream cuidadosamente, o corpo da resposta nunca será armazenado na memória.

Decidimos colocar todas as linhas do texto em uma lista, mas, dependendo do processamento que você precisa realizar nesses dados, você não precisa necessariamente fazer isso. Na verdade, na maioria dos casos, provavelmente é uma má ideia armazenar esses dados na memória.

### Neste tutorial

Criando um Stream Criando um Stream a partir de uma Coleção ou um Iterator Criando um Stream Vazio Criando um Stream a partir de um Vararg ou um Array Criando um Stream a partir de um Supplier Criando um Stream a partir de um UnaryOperator e uma Seed Criando um Stream a partir de um Intervalo de Números Criando um Stream de Números Aleatórios Criando um Stream a partir dos Caracteres de uma String Criando um Stream a partir das Linhas de um Arquivo de Texto Criando um Stream a partir de uma Expressão Regular Criando um Stream com o Padrão Builder Criando um Stream a partir de uma Fonte HTTP

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Adicionando Operações Intermediárias em um Stream](<#/doc/tutorials/api/streams/intermediate-operation>)

➜

**Tutorial Atual**

Criando Streams

➜

**Próximo na Série**

[Reduzindo um Stream](<#/doc/tutorials/api/streams/reducing>)

**Anterior na Série:** [Adicionando Operações Intermediárias em um Stream](<#/doc/tutorials/api/streams/intermediate-operation>)

**Próximo na Série:** [Reduzindo um Stream](<#/doc/tutorials/api/streams/reducing>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A Stream API ](<#/doc/tutorials/api/streams>) > Criando Streams