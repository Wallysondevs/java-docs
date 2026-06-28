# Decorando Streams de I/O

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de I/O do Java ](<#/doc/tutorials/java-io>) > [ Noções Básicas de Operações de Arquivo ](<#/doc/tutorials/java-io/reading-writing>) > Decorando Streams de I/O

**Anterior na Série**

[Lendo e Escrevendo Arquivos Binários](<#/doc/tutorials/java-io/reading-writing/binary-files>)

➜

**Tutorial Atual**

Decorando Streams de I/O

➜

**Próximo na Série**

[Streams de I/O em Memória](<#/doc/tutorials/java-io/reading-writing/in-memory>)

**Anterior na Série:** [Lendo e Escrevendo Arquivos Binários](<#/doc/tutorials/java-io/reading-writing/binary-files>)

**Próximo na Série:** [Streams de I/O em Memória](<#/doc/tutorials/java-io/reading-writing/in-memory>)

# Decorando Streams de I/O

## O Propósito da Decoração

O _Decorator Pattern_ é um dos 23 Design Patterns do Gang of Four. A API de I/O do Java usa este padrão para estender ou modificar o comportamento de algumas de suas classes.

A hierarquia da classe [`Reader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Reader.html>) ilustra como a decoração tem sido usada para projetar o I/O do Java.

A Hierarquia da Classe Reader

A classe [`Reader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Reader.html>) é uma classe abstrata que define a leitura de caracteres de um meio. Este meio não é conhecido pela classe [`Reader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Reader.html>), ele deve ser fornecido por suas extensões. Pode ser um arquivo em disco, um socket de rede, ou uma estrutura em memória como um array de caracteres ou uma string.

O JDK oferece várias extensões. Entre elas:

  1. [`CharArrayReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/CharArrayReader.html>) é construído sobre um array de `char`.
  2. [`StringReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/StringReader.html>) é construído sobre uma [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>).
  3. [`InputStreamReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/InputStreamReader.html>) é construído sobre um [`InputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/InputStream.html>), do qual ele lê caracteres.
  4. [`FileReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/FileReader.html>) estende [`InputStreamReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/InputStreamReader.html>) e é construído sobre um [`File`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/File.html>) do qual os caracteres são lidos.

Então [`BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>) estende [`Reader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Reader.html>) e o decora. Para criar uma instância de [`BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>), você deve fornecer um objeto [`Reader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Reader.html>) que atua como um delegate para o objeto [`BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>). A classe [`BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>) então adiciona vários métodos à classe base [`Reader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Reader.html>).

A decoração da classe [`BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>) permite a sobrescrita dos métodos concretos existentes da classe [`Reader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Reader.html>), bem como a adição de novos métodos.

O mesmo vale para a classe [`LineNumberReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/LineNumberReader.html>), que estende [`BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>) e precisa de uma instância de [`Reader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Reader.html>) para ser construída.

## Escrevendo e Lendo Caracteres em Streams Binários

Você viu na introdução desta seção que as classes da API de I/O do Java são divididas em duas categorias, uma para lidar com caracteres e outra para lidar com bytes. Não faria sentido tentar ler ou escrever bytes de text files. Mas escrever caracteres em binary files é algo amplamente utilizado em aplicações.

A API de I/O do Java oferece duas classes para isso:

  * [`InputStreamReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/InputStreamReader.html>) é um reader que pode ler caracteres de um [`InputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/InputStream.html>), e
  * [`OutputStreamWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/OutputStreamWriter.html>) é um writer que pode escrever caracteres em um [`OutputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/OutputStream.html>).

[`InputStreamReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/InputStreamReader.html>) é uma decoração da classe [`Reader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Reader.html>), construída sobre um objeto [`InputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/InputStream.html>). Você pode fornecer um charset se necessário. O mesmo vale para a classe [`OutputStreamWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/OutputStreamWriter.html>), que estende [`Writer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Writer.html>) e que precisa de um objeto [`OutputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/OutputStream.html>) para ser construída.

### Escrevendo Caracteres usando um OutputStreamWriter

Vamos usar um [`OutputStreamWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/OutputStreamWriter.html>) para escrever uma mensagem em um text file.

```java
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class OutputStreamWriterExample {

    public static void main(String[] args) throws IOException {
        Path path = Path.of("files", "sonnet.txt");
        Charset charset = StandardCharsets.UTF_8;

        String sonnet = """
                From fairest creatures we desire increase,
                That thereby beauty's rose might never die,
                But as the riper should by time decease,
                His tender heir might bear his memory:
                But thou, contracted to thine own bright eyes,
                Feed'st thy light's flame with self-substantial fuel,
                Making a famine where abundance lies,
                Thyself thy foe, to thy sweet self too cruel.
                Thou that art now the world's fresh ornament
                And only herald to the gaudy spring,
                Within thine own bud buriest thy content
                And, tender churl, makest waste in niggarding.
                Pity the world, or else this glutton be,
                To eat the world's due, by the grave and thee.
                """;

        Files.createDirectories(path.getParent());

        try (OutputStream outputStream = Files.newOutputStream(path, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
             Writer writer = new OutputStreamWriter(outputStream, charset)) {
            writer.write(sonnet);
        }
    }
}
```

A execução deste código criará um arquivo chamado `sonnet.txt` no diretório `files` com o texto do primeiro soneto de Shakespeare.

Várias coisas merecem ser notadas neste exemplo.

  * O [`OutputStreamWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/OutputStreamWriter.html>) é um objeto [`Writer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Writer.html>) que escreve no [`OutputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/OutputStream.html>) criado com o método de fábrica da classe [`Files`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html>).
  * Tanto o output stream quanto o writer são criados como argumentos do padrão try-with-resources, garantindo assim que ambos serão flushed e closed na ordem correta. Se você esquecer isso, poderá ter caracteres faltando em seu arquivo, simplesmente porque um buffer interno não foi devidamente flushed.

A execução deste código exibe o seguinte resultado.

```bash
$ java OutputStreamWriterExample.java
```

### Lendo Caracteres usando um InputStreamReader

A leitura do arquivo `sonnet.txt` que você criou na seção anterior segue o mesmo padrão. Aqui está o código.

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class InputStreamReaderExample {

    public static void main(String[] args) throws IOException {
        Path path = Path.of("files", "sonnet.txt");
        Charset charset = StandardCharsets.UTF_8;

        try (InputStream inputStream = Files.newInputStream(path);
             Reader reader = new InputStreamReader(inputStream, charset);
             BufferedReader bufferedReader = new BufferedReader(reader);
             Stream<String> lines = bufferedReader.lines()) {
            String text = lines.collect(Collectors.joining(System.lineSeparator()));
            System.out.println(text);
        }
    }
}
```

O objeto `reader` é criado a partir do objeto `inputStream`. É um objeto [`Reader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Reader.html>), mas que lerá de um [`InputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/InputStream.html>). Este código vai um pouco além, no entanto.

  * Ele decora este objeto `reader` simples para criar um [`BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>). A classe [`BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>) possui vários métodos para ler um text file linha por linha, que usaremos neste exemplo.
  * Ele chama o método [`lines()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html#lines\(\)>) no objeto [`BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>). Este método retorna um stream das linhas deste text file. Como stream implementa [`AutoCloseable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/AutoCloseable.html>), você pode criá-lo como um argumento deste padrão try-with-resources.

Coletar o stream com o collector [`Collectors.joining()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Collectors.html#joining\(\)>) é uma maneira muito fácil de concatenar todos os elementos deste stream, separados por uma _newline_ (neste exemplo).

A execução deste código produz o seguinte resultado.

```bash
$ java InputStreamReaderExample.java
From fairest creatures we desire increase,
That thereby beauty's rose might never die,
But as the riper should by time decease,
His tender heir might bear his memory:
But thou, contracted to thine own bright eyes,
Feed'st thy light's flame with self-substantial fuel,
Making a famine where abundance lies,
Thyself thy foe, to thy sweet self too cruel.
Thou that art now the world's fresh ornament
And only herald to the gaudy spring,
Within thine own bud buriest thy content
And, tender churl, makest waste in niggarding.
Pity the world, or else this glutton be,
To eat the world's due, by the grave and thee.
```

## Lidando com Streams Binários Comprimidos

O Decorator pattern é usado de forma muito eficiente para ler e escrever arquivos gzip. Gzip é uma implementação do deflate algorithm. Este formato é especificado na RFC 1952. Duas classes implementam este algoritmo no JDK: [`GZIPInputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/zip/GZIPInputStream.html>) e [`GZIPOutputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/zip/GZIPOutputStream.html>).

Estas duas classes são extensões das classes base [`InputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/InputStream.html>) e [`OutputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/OutputStream.html>). Elas apenas sobrescrevem a leitura e a escrita de bytes, sem adicionar nenhum método. A decoração é usada aqui para sobrescrever um comportamento padrão.

Graças ao decorator pattern, modificar os dois exemplos anteriores para escrever e ler este texto em um arquivo comprimido é apenas uma pequena modificação do código.

### Escrevendo Dados com um GzipOutputStream

Aqui está o código que você pode usar para escrever texto em um arquivo gzip.

```java
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.zip.GZIPOutputStream;

public class GzipOutputStreamExample {

    public static void main(String[] args) throws IOException {
        Path path = Path.of("files", "sonnet.gzip");
        Charset charset = StandardCharsets.UTF_8;

        String sonnet = """
                From fairest creatures we desire increase,
                That thereby beauty's rose might never die,
                But as the riper should by time decease,
                His tender heir might bear his memory:
                But thou, contracted to thine own bright eyes,
                Feed'st thy light's flame with self-substantial fuel,
                Making a famine where abundance lies,
                Thyself thy foe, to thy sweet self too cruel.
                Thou that art now the world's fresh ornament
                And only herald to the gaudy spring,
                Within thine own bud buriest thy content
                And, tender churl, makest waste in niggarding.
                Pity the world, or else this glutton be,
                To eat the world's due, by the grave and thee.
                """;

        Files.createDirectories(path.getParent());

        try (OutputStream outputStream = Files.newOutputStream(path, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
             GZIPOutputStream gzipOutputStream = new GZIPOutputStream(outputStream);
             Writer writer = new OutputStreamWriter(gzipOutputStream, charset)) {
            writer.write(sonnet);
        }
    }
}
```

Note que o objeto `gzipOutputStream` é criado decorando o `outputStream` regular, e é usado para criar o objeto `writer`. Nada mais é alterado no código.

Como este arquivo agora está comprimido, seu tamanho é menor. A execução deste código exibe o seguinte.

```bash
$ java GzipOutputStreamExample.java
$ ls -l files/sonnet.gzip
-rw-r--r--  1 jean-michel  staff  453 Jan 25 10:00 files/sonnet.gzip
```

Note que você pode abrir este arquivo com qualquer software capaz de ler arquivos gzip.

### Lendo Dados com um GzipInputStream

O código a seguir lê o texto de volta.

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.zip.GZIPInputStream;

public class GzipInputStreamExample {

    public static void main(String[] args) throws IOException {
        Path path = Path.of("files", "sonnet.gzip");
        Charset charset = StandardCharsets.UTF_8;

        try (InputStream inputStream = Files.newInputStream(path);
             GZIPInputStream gzipInputStream = new GZIPInputStream(inputStream);
             Reader reader = new InputStreamReader(gzipInputStream, charset);
             BufferedReader bufferedReader = new BufferedReader(reader);
             Stream<String> lines = bufferedReader.lines()) {
            String text = lines.collect(Collectors.joining(System.lineSeparator()));
            System.out.println(text);
        }
    }
}
```

Note que o objeto `gzipInputStream` é criado decorando o `inputStream` regular. Este objeto `gzipInputStream` é então decorado para criar o objeto `reader`. O restante do código permanece inalterado.

```bash
$ java GzipInputStreamExample.java
From fairest creatures we desire increase,
That thereby beauty's rose might never die,
But as the riper should by time decease,
His tender heir might bear his memory:
But thou, contracted to thine own bright eyes,
Feed'st thy light's flame with self-substantial fuel,
Making a famine where abundance lies,
Thyself thy foe, to thy sweet self too cruel.
Thou that art now the world's fresh ornament
And only herald to the gaudy spring,
Within thine own bud buriest thy content
And, tender churl, makest waste in niggarding.
Pity the world, or else this glutton be,
To eat the world's due, by the grave and thee.
```

## Lidando com Streams de Tipos Primitivos

A API de I/O do Java oferece mais duas decorações de [`InputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/InputStream.html>) e [`OutputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/OutputStream.html>): [`DataInputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataInputStream.html>) e [`DataOutputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataOutputStream.html>).

Essas classes adicionam métodos para ler e escrever primitive types em binary streams.

### Escrevendo Tipos Primitivos

A classe [`DataOutputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataOutputStream.html>) delega todas as suas operações de escrita para a instância de [`OutputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/OutputStream.html>) que ela envolve. Esta classe fornece os seguintes métodos para escrever primitive types:

  * [`writeByte(int)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataOutputStream.html#writeByte\(int\)>): escreve os oito bits de baixa ordem do argumento para o stream subjacente. Os 24 bits de alta ordem do argumento são ignorados.

Estes outros métodos são autoexplicativos.

  * [`writeBoolean(boolean)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataOutputStream.html#writeBoolean\(boolean\)>)
  * [`writeChar(char)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataOutputStream.html#writeChar\(int\)>)
  * [`writeShort(short)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataOutputStream.html#writeShort\(int\)>)
  * [`writeInt(int)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataOutputStream.html#writeInt\(int\)>)
  * [`writeLong(long)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataOutputStream.html#writeLong\(long\)>)
  * [`writeFloat(float)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataOutputStream.html#writeFloat\(float\)>)
  * [`writeDouble(double)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataOutputStream.html#writeDouble\(double\)>)

A classe [`DataOutputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataOutputStream.html>) também fornece métodos para escrever bytes e chars de arrays.

  * [`writeBytes(String)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataOutputStream.html#writeBytes\(java.lang.String\)>): escreve os caracteres da string como uma sequência de bytes. Cada byte corresponde aos 8 bits de baixa ordem de cada caractere. Os 8 bits de alta ordem são ignorados.
  * [`writeChars(String)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataOutputStream.html#writeChars\(java.lang.String\)>): escreve os caracteres da string.
  * [`writeUTF(String)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataOutputStream.html#writeUTF\(java.lang.String\)>): escreve uma string para o output stream subjacente usando [`modified UTF-8 encoding`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataInput.html#modified-utf-8>).

O código a seguir escreve 6 ints em um binary file.

```java
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class DataOutputStreamExample {

    public static void main(String[] args) throws IOException {
        Path path = Path.of("files", "ints.bin");

        Files.createDirectories(path.getParent());

        try (OutputStream outputStream = Files.newOutputStream(path, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
             DataOutputStream dataOutputStream = new DataOutputStream(outputStream)) {
            dataOutputStream.writeInt(1);
            dataOutputStream.writeInt(2);
            dataOutputStream.writeInt(3);
            dataOutputStream.writeInt(4);
            dataOutputStream.writeInt(5);
            dataOutputStream.writeInt(6);
        }
    }
}
```

A execução deste código exibe o seguinte.

```bash
$ java DataOutputStreamExample.java
$ ls -l files/ints.bin
-rw-r--r--  1 jean-michel  staff  24 Jan 25 10:00 files/ints.bin
```

Como cada `int` tem 4 bytes, o tamanho do arquivo é de 24 bytes, conforme mostrado no console.

### Lendo Tipos Primitivos

O [`DataInputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataInputStream.html>) lê primitive types de binary streams. Ele decora um [`InputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/InputStream.html>) que você deve fornecer para construir qualquer instância de [`DataInputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataInputStream.html>). Esta nova instância delega todas as operações de leitura para o [`InputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/InputStream.html>) que você forneceu.

Ele fornece os seguintes métodos, que são autoexplicativos. Cada método retorna o tipo correspondente.

  * [`readBoolean()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataInputStream.html#readBoolean\(\)>)
  * [`readChar()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataInputStream.html#readChar\(\)>)
  * [`readShort()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataInputStream.html#readShort\(\)>)
  * [`readInt()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataInputStream.html#readInt\(\)>)
  * [`readLong()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataInputStream.html#readLong\(\)>)
  * [`readFloat()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataInputStream.html#readFloat\(\)>)
  * [`readDouble()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataInputStream.html#readDouble\(\)>)

Ele fornece métodos para ler bytes e shorts sem sinal:

  * [`readUnsignedByte()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataInputStream.html#readUnsignedByte\(\)>): lê um único byte sem sinal e o retorna na forma de um `int` no intervalo de 0 a 255.
  * [`readUnsignedShort()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataInputStream.html#readUnsignedShort\(\)>): lê dois bytes e os decodifica como um inteiro de 16 bits sem sinal. O valor é retornado como um `int` no intervalo de 0 a 65535.

Ele também fornece métodos para ler vários bytes e organizá-los em uma string de caracteres.

  * [`readUTF()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataInputStream.html#readUTF\(\)>): este método lê uma string de caracteres codificada no [formato modified UTF-8](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataInput.html#modified-utf-8>).
  * [`readFully(byte[])`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataInputStream.html#readFully\(byte%5B%5D\)>): este método lê bytes do input stream e os armazena no array fornecido. Ele tentará preencher o array e bloqueará se necessário. Ele lançará uma [`EOFException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/EOFException.html>) se o fim do stream for atingido antes que o array tenha sido preenchido.
  * [`readFully(byte[], int offset, int length)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataInputStream.html#readFully\(byte%5B%5D,int,int\)>): faz o mesmo que o método anterior, preenchendo `length` bytes a partir do `offset` fornecido.

Aqui está o código que você pode escrever para ler os inteiros que você escreveu no arquivo criado no exemplo anterior.

```java
import java.io.DataInputStream;
import java.io.EOFException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;

public class DataInputStreamExample {

    public static void main(String[] args) throws IOException {
        Path path = Path.of("files", "ints.bin");

        try (InputStream inputStream = Files.newInputStream(path);
             DataInputStream dataInputStream = new DataInputStream(inputStream)) {
            while (true) {
                int value = dataInputStream.readInt();
                System.out.println(value);
            }
        } catch (EOFException e) {
            // End of file reached
        }
    }
}
```

```bash
$ java DataInputStreamExample.java
1
2
3
4
5
6
```

### Neste tutorial

O Propósito da Decoração Escrevendo e Lendo Caracteres em Streams Binários Lidando com Streams Binários Comprimidos Lidando com Streams de Tipos Primitivos

Última atualização: 25 de janeiro de 2023

**Anterior na Série**

[Lendo e Escrevendo Arquivos Binários](<#/doc/tutorials/java-io/reading-writing/binary-files>)

➜

**Tutorial Atual**

Decorando Streams de I/O

➜

**Próximo na Série**

[Streams de I/O em Memória](<#/doc/tutorials/java-io/reading-writing/in-memory>)

**Anterior na Série:** [Lendo e Escrevendo Arquivos Binários](<#/doc/tutorials/java-io/reading-writing/binary-files>)

**Próximo na Série:** [Streams de I/O em Memória](<#/doc/tutorials/java-io/reading-writing/in-memory>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de I/O do Java ](<#/doc/tutorials/java-io>) > [ Noções Básicas de Operações de Arquivo ](<#/doc/tutorials/java-io/reading-writing>) > Decorando Streams de I/O