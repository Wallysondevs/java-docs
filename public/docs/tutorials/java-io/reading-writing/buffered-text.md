# Lendo e Escrevendo Arquivos de Texto

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Noções Básicas de Operações de Arquivo ](<#/doc/tutorials/java-io/reading-writing>) > Lendo e Escrevendo Arquivos de Texto

**Anterior na Série**

[Lendo e Escrevendo Arquivos Pequenos](<#/doc/tutorials/java-io/reading-writing/small-files>)

➜

**Tutorial Atual**

Lendo e Escrevendo Arquivos de Texto

➜

**Próximo na Série**

[Lendo e Escrevendo Arquivos Binários](<#/doc/tutorials/java-io/reading-writing/binary-files>)

**Anterior na Série:** [Lendo e Escrevendo Arquivos Pequenos](<#/doc/tutorials/java-io/reading-writing/small-files>)

**Próximo na Série:** [Lendo e Escrevendo Arquivos Binários](<#/doc/tutorials/java-io/reading-writing/binary-files>)

# Lendo e Escrevendo Arquivos de Texto

O pacote [`java.nio.file`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/package-summary.html>) suporta I/O de canal, que move dados em buffers, contornando algumas das camadas que podem estrangular o I/O de stream.

## Entendendo o Tratamento de Caracteres

A plataforma Java armazena valores de caracteres usando convenções Unicode. O I/O de stream de caracteres traduz automaticamente este formato interno de e para o conjunto de caracteres local. Em localidades ocidentais, o conjunto de caracteres local é geralmente um superconjunto de 8 bits de ASCII ou UTF-8.

A entrada e saída realizadas com classes de stream traduzem-se automaticamente de e para o conjunto de caracteres local. Até o Java SE 17, um programa que usa streams de caracteres se adapta automaticamente ao conjunto de caracteres local e está pronto para internacionalização — tudo sem esforço extra por parte do programador. A partir do Java SE 18, o charset padrão da sua aplicação Java é UTF-8.

Se a internacionalização não for uma prioridade, você pode simplesmente usar as classes de stream de caracteres sem prestar muita atenção aos problemas de conjunto de caracteres. Mais tarde, se a internacionalização se tornar uma prioridade, seu programa poderá ser adaptado sem uma recodificação extensa.

## Lendo um Arquivo de Texto Usando I/O de Stream Bufferizado

O método [`newBufferedReader(Path, Charset)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newBufferedReader\(java.nio.file.Path,java.nio.charset.Charset\)>) abre um arquivo para leitura, retornando um [`BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>) que pode ser usado para ler texto de um arquivo de forma eficiente.

A classe `BufferedReader` oferece um método para ler o conteúdo do seu arquivo de texto linha por linha. A partir do Java SE 8, ela também oferece um método para criar um `Stream<String>` nas linhas do seu arquivo de texto. Você pode aprender mais sobre streams na seção [Stream API](<#/doc/tutorials/api/streams>).

O código a seguir lê seu arquivo linha por linha.

```java
Path file = ...;
Charset charset = Charset.forName("US-ASCII");
try (BufferedReader reader = Files.newBufferedReader(file, charset)) {
    String line = null;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException x) {
    System.err.format("IOException: %s%n", x);
}
```

Observe que a string `line` não contém os caracteres de terminação de linha de cada linha. Quando o final do arquivo é atingido, a linha retornada é `null`.

A partir do Java SE 8, você pode escrever o seguinte código.

```java
Path file = ...;
Charset charset = Charset.forName("US-ASCII");
try (BufferedReader reader = Files.newBufferedReader(file, charset)) {
    reader.lines().forEach(System.out::println);
} catch (IOException x) {
    System.err.format("IOException: %s%n", x);
}
```

O método `reader.lines()` é definido na classe `BufferedReader`. Como a interface `Stream` estende a interface `AutoCloseable`, você pode abrir seu stream em uma instrução _try-with-resources_. Nesse caso, o `reader` é fechado corretamente.

## Escrevendo um Arquivo de Texto Usando I/O de Stream Bufferizado

Você pode usar o método [`newBufferedWriter(Path, Charset, OpenOption...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newBufferedWriter\(java.nio.file.Path,java.nio.charset.Charset,java.nio.file.OpenOption...\)>) para escrever em um arquivo usando um [`BufferedWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedWriter.html>).

O trecho de código a seguir mostra como criar um arquivo codificado em "US-ASCII" usando este método:

```java
Path file = ...;
Charset charset = Charset.forName("US-ASCII");
String s = ...;
try (BufferedWriter writer = Files.newBufferedWriter(file, charset)) {
    writer.write(s, 0, s.length());
} catch (IOException x) {
    System.err.format("IOException: %s%n", x);
}
```

### Neste tutorial

Entendendo o Tratamento de Caracteres Lendo um Arquivo de Texto Usando Stream Bufferizado Escrevendo um Arquivo de Texto Usando Stream Bufferizado

Última atualização: 25 de janeiro de 2023

**Anterior na Série**

[Lendo e Escrevendo Arquivos Pequenos](<#/doc/tutorials/java-io/reading-writing/small-files>)

➜

**Tutorial Atual**

Lendo e Escrevendo Arquivos de Texto

➜

**Próximo na Série**

[Lendo e Escrevendo Arquivos Binários](<#/doc/tutorials/java-io/reading-writing/binary-files>)

**Anterior na Série:** [Lendo e Escrevendo Arquivos Pequenos](<#/doc/tutorials/java-io/reading-writing/small-files>)

**Próximo na Série:** [Lendo e Escrevendo Arquivos Binários](<#/doc/tutorials/java-io/reading-writing/binary-files>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Noções Básicas de Operações de Arquivo ](<#/doc/tutorials/java-io/reading-writing>) > Lendo e Escrevendo Arquivos de Texto