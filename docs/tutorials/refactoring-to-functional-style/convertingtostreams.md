# Convertendo Fontes de Dados para Streams

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Refatorando do Estilo Imperativo para o Funcional ](<#/doc/tutorials/refactoring-to-functional-style>) > Convertendo Fontes de Dados para Streams

**Anterior na Série**

[Convertendo Iteração com transformação](<#/doc/tutorials/refactoring-to-functional-style/iteartionwithtransformation>)

➜

**Tutorial Atual**

Convertendo Fontes de Dados para Streams

➜

Este é o fim da série!

**Anterior na Série:** [Convertendo Iteração com transformação](<#/doc/tutorials/refactoring-to-functional-style/iteartionwithtransformation>)

# Convertendo Fontes de Dados para Streams

Esta página foi contribuída por [Venkat Subramaniam](</author/VenkatSubramaniam>) sob a [UPL](<https://oss.oracle.com/licenses/upl/>)

## Pensando em Streams

Nos artigos anteriores desta [série de tutoriais](<#/doc/tutorials/refactoring-to-functional-style>), vimos como converter loops escritos no estilo imperativo para o estilo funcional. Neste artigo, veremos como visualizar a fonte de dados, através dos olhos funcionais, como um stream de dados e converter a iteração para usar a Streams API.

Vimos como podemos usar as funções `filter()` e `map()` para selecionar e transformar dados, respectivamente. Podemos realizar essas operações no meio do pipeline funcional. Nos exemplos dos artigos anteriores, usamos funções como `range()` e `rangeClosed()` para criar um stream de valores em um intervalo de números. Isso funcionou bem quando queremos iterar sobre um intervalo conhecido de valores, mas, frequentemente, podemos querer trabalhar com dados que vêm de recursos externos, como de um arquivo, por exemplo. Se formos capazes de trabalhar com o recurso externo como um stream, então podemos aplicar prontamente as operações do pipeline funcional. Neste artigo, veremos um exemplo que ilustra essa ideia.

## Do Estilo Imperativo para o Funcional

Suponha que queremos iterar sobre um arquivo e contar o número de linhas com uma ou mais ocorrências de uma palavra. Aqui está um código de estilo imperativo bastante familiar para realizar essa tarefa:

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class WordCounterImperative {
  public static void main(String[] args) throws IOException {
    final Path filePath = Paths.get("src/main/java/WordCounterImperative.java");
    final String wordOfInterest = "public";

    int count = 0;
    try (BufferedReader reader = Files.newBufferedReader(filePath)) {
      String line = reader.readLine();
      while (line != null) {
        if (line.contains(wordOfInterest)) {
          count++;
        }
        line = reader.readLine();
      }
    }
    System.out.printf("O arquivo %s tem %d linhas com a palavra %s%n",
      filePath, count, wordOfInterest);
  }
}
```

Para facilitar o trabalho com este exemplo, procuramos o número de linhas com a palavra "public" no mesmo arquivo-fonte onde o código reside. Você pode alterar o valor de `filePath` para se referir a um arquivo diferente e/ou o valor de `wordOfInterest` para outra coisa, se desejar.

Existem duas partes principais neste exemplo. Usamos o `BufferedReader` retornado pelo método `newBufferedReader()` para acessar o conteúdo do arquivo que nos interessa. Em seguida, no loop `while`, verificamos cada linha para ver se ela contém a palavra desejada e, se sim, incrementamos o `count` para indicar que encontramos outra linha com a palavra. Vamos examinar as duas partes, começando pela segunda.

Olhando atentamente para o loop, a partir de nossas discussões nos artigos anteriores, podemos reconhecer que a presença de `if` é um sinal de que podemos usar a operação `filter()` se pudermos escrever o código como um pipeline funcional. Uma vez que filtramos ou selecionamos as linhas com a palavra desejada, podemos contar o número de linhas, usando o método `count()` do stream. Você provavelmente está curioso e ansioso para perguntar: "mas, onde está o Stream?" Para responder a essa pergunta, vamos dar uma olhada na primeira parte do código.

Os dados, ou seja, as linhas de texto, vêm do arquivo cujo caminho é fornecido na variável `filePath`. Estamos lendo os dados usando o método `readLine()` do `BufferedReader` e o estilo imperativo para iterar sobre cada linha de texto. Para usar o pipeline funcional, com operações como `filter()`, precisamos de um `Stream` de dados. Daí a pergunta: "é possível obter um Stream de dados para o conteúdo de um arquivo?"

A resposta, felizmente, é um sonoro sim. Os desenvolvedores por trás do JDK e da linguagem Java não apenas introduziram a capacidade de fazer programação funcional e disseram "boa sorte". Eles se esforçaram para aprimorar o JDK, adicionando funções para que nós, como programadores, possamos fazer bom uso das capacidades funcionais do Java para nossas tarefas rotineiras.

Uma maneira fácil de transformar o conteúdo de um arquivo em um stream de dados é usando o método `lines()` da classe `Files`, que faz parte do pacote `java.nio.file`. Vamos refatorar o código de estilo imperativo anterior para o estilo funcional, com a ajuda do método `lines()` que nos fornece o `Stream` sobre o conteúdo de um arquivo, assim:

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class WordCounterFunctional {
  public static void main(String[] args) throws IOException {
    final Path filePath = Paths.get("src/main/java/WordCounterFunctional.java");
    final String wordOfInterest = "public";

    final long count = Files.lines(filePath)
      .filter(line -> line.contains(wordOfInterest))
      .count();

    System.out.printf("O arquivo %s tem %d linhas com a palavra %s%n",
      filePath, count, wordOfInterest);
  }
}
```

O método `lines()` não apenas fornece um stream de dados sobre o conteúdo de um arquivo, mas também remove grande parte da complexidade em torno da leitura das linhas. Em vez do iterador externo, onde buscávamos uma linha por vez, o stream possibilita o uso do iterador interno, onde podemos nos concentrar no que fazer para cada linha de texto à medida que ela surge no pipeline do stream.

## Mapeamentos

Sempre que estiver trabalhando com uma coleção de dados de um recurso externo, pergunte se há uma maneira de obter um stream de dados sobre o conteúdo desse recurso. As chances são de que você encontre uma função para isso dentro do JDK ou de uma biblioteca de terceiros. Uma vez que obtemos um stream, podemos usar os operadores funcionais altamente eficazes como `filter()`, `map()`, etc., para iterar fluentemente sobre a coleção de dados que faz parte do recurso.

### Neste tutorial

Pensando em Streams Do Estilo Imperativo para o Funcional Mapeamentos

Última atualização: 23 de abril de 2024

**Anterior na Série**

[Convertendo Iteração com transformação](<#/doc/tutorials/refactoring-to-functional-style/iteartionwithtransformation>)

➜

**Tutorial Atual**

Convertendo Fontes de Dados para Streams

➜

Este é o fim da série!

**Anterior na Série:** [Convertendo Iteração com transformação](<#/doc/tutorials/refactoring-to-functional-style/iteartionwithtransformation>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Refatorando do Estilo Imperativo para o Funcional ](<#/doc/tutorials/refactoring-to-functional-style>) > Convertendo Fontes de Dados para Streams