# Lendo e Escrevendo Arquivos Pequenos

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Noções Básicas de Operações de Arquivo ](<#/doc/tutorials/java-io/reading-writing>) > Lendo e Escrevendo Arquivos Pequenos

**Anterior na Série**

[Liberando Recursos e Capturando Exceções](<#/doc/tutorials/java-io/reading-writing/common-operations>)

➜

**Tutorial Atual**

Lendo e Escrevendo Arquivos Pequenos

➜

**Próximo na Série**

[Lendo e Escrevendo Arquivos de Texto](<#/doc/tutorials/java-io/reading-writing/buffered-text>)

**Anterior na Série:** [Liberando Recursos e Capturando Exceções](<#/doc/tutorials/java-io/reading-writing/common-operations>)

**Próximo na Série:** [Lendo e Escrevendo Arquivos de Texto](<#/doc/tutorials/java-io/reading-writing/buffered-text>)

# Lendo e Escrevendo Arquivos Pequenos

## Escolhendo o Método Certo para Leitura

Há uma vasta gama de métodos de I/O de arquivo para escolher. Para ajudar a entender a API, a tabela a seguir mostra os métodos de I/O de arquivo disponíveis na classe [`Files`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html>) e seus casos de uso, juntamente com as classes e interfaces retornadas por esses métodos.

Leitura | Retorna | Comentários
---|---|---
[`readAllBytes()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#readAllBytes\(java.nio.file.Path\)>) | `byte[]` | Projetado para casos de uso simples e comuns.
[`readAllLines()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#readAllLines\(java.nio.file.Path\)>) | `List<String>` | Projetado para casos de uso simples e comuns.
[`lines()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#lines\(java.nio.file.Path\)>) | `Stream<String>` | Lê as linhas de um arquivo de texto de forma preguiçosa (lazy), permitindo um processamento eficiente linha por linha.
[`newBufferedReader()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newBufferedReader\(java.nio.file.Path\)>) | [`BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>) | Itera sobre linhas de texto.
[`newInputStream()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newInputStream\(java.nio.file.Path,java.nio.file.OpenOption...\)>) | [`InputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/InputStream.html>) |
[`newByteChannel()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newByteChannel\(java.nio.file.Path,java.nio.file.OpenOption...\)>) | [`SeekableByteChannel`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/SeekableByteChannel.html>), veja também [`ByteBuffer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/ByteBuffer.html>) e [`FileChannel`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/FileChannel.html>) | Canais de byte e buffers de byte podem ser usados para leitura e escrita.

## Escolhendo o Método Certo para Escrita

Escrita | Retorna | Comentários
---|---|---
[`write()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#write\(java.nio.file.Path,byte%5B%5D,java.nio.file.OpenOption...\)>) | [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) | Projetado para casos de uso simples e comuns.
[`newBufferedWriter()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newBufferedWriter\(java.nio.file.Path,java.nio.charset.Charset,java.nio.file.OpenOption...\)>) | [`BufferedWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedWriter.html>) | Escreve linhas de texto.
[`newOutputStream()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newOutputStream\(java.nio.file.Path,java.nio.file.OpenOption...\)>) | [`OutputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/OutputStream.html>) |
[`newByteChannel()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newByteChannel\(java.nio.file.Path,java.nio.file.OpenOption...\)>) | [`SeekableByteChannel`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/SeekableByteChannel.html>), veja também [`ByteBuffer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/ByteBuffer.html>) e [`FileChannel`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/FileChannel.html>) | Canais de byte e buffers de byte podem ser usados para leitura e escrita.

> Nota: Os métodos para criar um novo arquivo permitem que você especifique um conjunto opcional de atributos iniciais para o arquivo. Por exemplo, em um sistema de arquivos que suporta o conjunto de padrões POSIX (como UNIX), você pode especificar um proprietário de arquivo, proprietário de grupo ou permissões de arquivo no momento em que o arquivo é criado. A seção [Gerenciando Metadados](<#/doc/tutorials/java-io/file-system/metadata>) explica os atributos de arquivo e como acessá-los e defini-los.

## O Parâmetro OpenOptions

Vários dos métodos nesta seção aceitam um parâmetro [`OpenOption`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/OpenOption.html>) opcional. Este parâmetro é opcional e a API informa qual é o comportamento padrão quando nenhum é especificado.

Vários métodos da classe Files aceitam um número arbitrário de argumentos quando flags são especificadas. Quando você vê uma elipse após o tipo do argumento, isso indica que o método aceita um número variável de argumentos, ou _varargs_. Quando um método aceita um argumento varargs, você pode passar uma lista de valores separados por vírgulas ou um array de valores.

Os seguintes enums [`StandardOpenOption`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardOpenOption.html>) são suportados:

  * [`WRITE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardOpenOption.html#WRITE>) – Abre o arquivo para acesso de escrita.
  * [`APPEND`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardOpenOption.html#APPEND>) – Anexa os novos dados ao final do arquivo. Esta opção é usada com as opções WRITE ou CREATE.
  * [`TRUNCATE_EXISTING`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardOpenOption.html#TRUNCATE_EXISTING>) – Trunca o arquivo para zero bytes. Esta opção é usada com a opção WRITE.
  * [`CREATE_NEW`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardOpenOption.html#CREATE_NEW>) – Cria um novo arquivo e lança uma exceção se o arquivo já existir.
  * [`CREATE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardOpenOption.html#CREATE>) – Abre o arquivo se ele existir ou cria um novo arquivo se não existir.
  * [`DELETE_ON_CLOSE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardOpenOption.html#DELETE_ON_CLOSE>) – Exclui o arquivo quando o stream é fechado. Esta opção é útil para arquivos temporários.
  * [`SPARSE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardOpenOption.html#SPARSE>) – Sugere que um arquivo recém-criado será esparso. Esta opção avançada é respeitada em alguns sistemas de arquivos, como NTFS, onde arquivos grandes com "lacunas" de dados podem ser armazenados de forma mais eficiente, onde essas lacunas vazias não consomem espaço em disco.
  * [`SYNC`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardOpenOption.html#SYNC>) – Mantém o arquivo (tanto conteúdo quanto metadados) sincronizado com o dispositivo de armazenamento subjacente.
  * [`DSYNC`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardOpenOption.html#DSYNC>) – Mantém o conteúdo do arquivo sincronizado com o dispositivo de armazenamento subjacente.

## Métodos Comumente Usados para Arquivos Pequenos

### Lendo Todos os Bytes ou Linhas de um Arquivo

Se você tem um arquivo de tamanho pequeno e gostaria de ler todo o seu conteúdo de uma só vez, você pode usar o método [`readAllBytes(Path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#readAllBytes\(java.nio.file.Path\)>) ou [`readAllLines(Path, Charset)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#readAllLines\(java.nio.file.Path,java.nio.charset.Charset\)>). Esses métodos cuidam da maior parte do trabalho para você, como abrir e fechar o stream, mas não são destinados ao tratamento de arquivos grandes. O código a seguir mostra como usar o método [`readAllBytes()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#readAllBytes\(java.nio.file.Path\)>):

```java
Path file = ...;
byte[] fileArray;
try {
    fileArray = Files.readAllBytes(file);
} catch (IOException e) {
    System.err.println(e);
}
```

### Escrevendo Todos os Bytes ou Linhas em um Arquivo

Você pode usar um dos métodos de escrita para escrever bytes, ou linhas, em um arquivo.

  * [`write(Path, byte[], OpenOption...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#write\(java.nio.file.Path,byte%5B%5D,java.nio.file.OpenOption...\)>)
  * [`write(Path, Iterable< extends CharSequence>, Charset, OpenOption...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#write\(java.nio.file.Path,java.lang.Iterable,java.nio.charset.Charset,java.nio.file.OpenOption...\)>)

O trecho de código a seguir mostra como usar um método `write()`.

```java
Path file = ...;
byte[] buf = "Hello World".getBytes();
try {
    Files.write(file, buf);
} catch (IOException e) {
    System.err.println(e);
}
```

## Métodos para Criar Arquivos Regulares e Temporários

### Criando Arquivos

Você pode criar um arquivo vazio com um conjunto inicial de atributos usando o método [`createFile(Path, FileAttribute<?>)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#createFile\(java.nio.file.Path,java.nio.file.attribute.FileAttribute...\)>). Por exemplo, se, no momento da criação, você deseja que um arquivo tenha um conjunto particular de permissões de arquivo, use o método [`createFile()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#createFile\(java.nio.file.Path,java.nio.file.attribute.FileAttribute...\)>) para isso. Se você não especificar nenhum atributo, o arquivo é criado com atributos padrão. Se o arquivo já existir, [`createFile()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#createFile\(java.nio.file.Path,java.nio.file.attribute.FileAttribute...\)>) lança uma exceção.

Em uma única operação atômica, o método [`createFile()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#createFile\(java.nio.file.Path,java.nio.file.attribute.FileAttribute...\)>) verifica a existência do arquivo e o cria com os atributos especificados, o que torna o processo mais seguro contra código malicioso.

O trecho de código a seguir cria um arquivo com atributos padrão:

```java
Path file = ...;
try {
    Files.createFile(file);
} catch (FileAlreadyExistsException x) {
    System.err.println("file exists already");
} catch (IOException x) {
    System.err.println(x);
}
```

A seção [Permissões de Arquivo POSIX](<#/doc/tutorials/java-io/file-system/metadata>) tem um exemplo que usa [`createFile(Path, FileAttribute<?>)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#createFile\(java.nio.file.Path,java.nio.file.attribute.FileAttribute...\)>) para criar um arquivo com permissões predefinidas.

Você também pode criar um novo arquivo usando os métodos [`newOutputStream()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newOutputStream\(java.nio.file.Path,java.nio.file.OpenOption...\)>), conforme descrito na seção [Criando e Escrevendo um Arquivo usando I/O de Stream](<#/doc/tutorials/java-io/reading-writing/binary-files>). Se você abrir um novo output stream e fechá-lo imediatamente, um arquivo vazio será criado.

### Criando Arquivos Temporários

Você pode criar um arquivo temporário usando um dos seguintes métodos `createTempFile()`:

  * [`createTempFile(Path, String, String, FileAttribute<?>)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#createTempFile\(java.nio.file.Path,java.lang.String,java.lang.String,java.nio.file.attribute.FileAttribute...\)>)
  * [`createTempFile(String, String, FileAttribute<?>)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#createTempFile\(java.lang.String,java.lang.String,java.nio.file.attribute.FileAttribute...\)>)

O primeiro método permite que o código especifique um diretório para o arquivo temporário e o segundo método cria um novo arquivo no diretório de arquivos temporários padrão. Ambos os métodos permitem que você especifique um sufixo para o nome do arquivo e o primeiro método também permite que você especifique um prefixo. O trecho de código a seguir apresenta um exemplo do segundo método:

```java
try {
    Path tempFile = Files.createTempFile(null, ".myapp");
    System.err.format("The temporary file has been created: %s%n", tempFile);
} catch (IOException x) {
    System.err.println(x);
}
```

O resultado da execução deste arquivo seria algo como o seguinte:

```
The temporary file has been created: /tmp/1310249818090794306.myapp
```

O formato específico do nome do arquivo temporário é dependente da plataforma.

## Arquivos de Acesso Aleatório

Arquivos de acesso aleatório permitem acesso não sequencial, ou aleatório, ao conteúdo de um arquivo. Para acessar um arquivo aleatoriamente, você abre o arquivo, busca uma localização específica e lê ou escreve nesse arquivo.

Essa funcionalidade é possível com a interface [`SeekableByteChannel`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/SeekableByteChannel.html>). A interface [`SeekableByteChannel`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/SeekableByteChannel.html>) estende o I/O de canal com a noção de uma posição atual. Os métodos permitem que você defina ou consulte a posição, e você pode então ler os dados ou escrever os dados nessa localização. A API consiste em alguns métodos fáceis de usar:

  * [`position()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/SeekableByteChannel.html#position\(\)>) – Retorna a posição atual do canal
  * [`position(long)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/SeekableByteChannel.html#position\(long\)>) – Define a posição do canal
  * [`read(ByteBuffer)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/SeekableByteChannel.html#read\(java.nio.ByteBuffer\)>) – Lê bytes do canal para o buffer
  * [`write(ByteBuffer)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/SeekableByteChannel.html#write\(java.nio.ByteBuffer\)>) – Escreve bytes do buffer para o canal
  * [`truncate(long)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/SeekableByteChannel.html#truncate\(long\)>) – Trunca o arquivo (ou outra entidade) conectado ao canal

Os métodos [`Files.newByteChannel()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newByteChannel\(java.nio.file.Path,java.nio.file.OpenOption...\)>) retornam uma instância de um [`SeekableByteChannel`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/SeekableByteChannel.html>). No sistema de arquivos padrão, você pode usar esse canal como está, ou pode convertê-lo para um [`FileChannel`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/FileChannel.html>), dando acesso a recursos mais avançados, como mapear uma região do arquivo diretamente na memória para acesso mais rápido, bloquear uma região do arquivo ou ler e escrever bytes de uma localização absoluta sem afetar a posição atual do canal.

O trecho de código a seguir abre um arquivo para leitura e escrita usando um dos métodos [`newByteChannel()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newByteChannel\(java.nio.file.Path,java.nio.file.OpenOption...\)>). O [`SeekableByteChannel`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/SeekableByteChannel.html>) retornado é convertido para um [`FileChannel`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/FileChannel.html>). Em seguida, 12 bytes são lidos do início do arquivo, e a string "I was here!" é escrita nessa localização. A posição atual no arquivo é movida para o final, e os 12 bytes do início são anexados. Finalmente, a string "I was here!" é anexada, e o canal no arquivo é fechado.

```java
Path file = ...;
ByteBuffer buf = ByteBuffer.allocate(12);
String warning = "I was here!";
byte[] warningBytes = warning.getBytes();

try (FileChannel fc = (FileChannel)Files.newByteChannel(file,
    EnumSet.of(StandardOpenOption.READ,
               StandardOpenOption.WRITE,
               StandardOpenOption.CREATE))) {

    // Read the first 12 bytes of the file.
    int nread;
    do {
        nread = fc.read(buf);
    } while (nread != -1 && buf.hasRemaining());

    // Write "I was here!" at the beginning of the file.
    buf.rewind();
    fc.position(0);
    fc.write(ByteBuffer.wrap(warningBytes));

    // Move to the end of the file.  Copy the first 12 bytes to
    // the end of the file.  Then write "I was here!" again.
    long length = fc.size();
    fc.position(length);
    buf.rewind();
    fc.write(buf);
    fc.write(ByteBuffer.wrap(warningBytes));
} catch (IOException x) {
    System.out.println("IOException: " + x);
}
```

### Neste tutorial

Escolhendo o Método Certo para Leitura
Escolhendo o Método Certo para Escrita
O Parâmetro OpenOptions
Métodos Comumente Usados para Arquivos Pequenos
Métodos para Criar Arquivos Regulares e Temporários
Arquivos de Acesso Aleatório

Última atualização: 25 de janeiro de 2023

**Anterior na Série**

[Liberando Recursos e Capturando Exceções](<#/doc/tutorials/java-io/reading-writing/common-operations>)

➜

**Tutorial Atual**

Lendo e Escrevendo Arquivos Pequenos

➜

**Próximo na Série**

[Lendo e Escrevendo Arquivos de Texto](<#/doc/tutorials/java-io/reading-writing/buffered-text>)

**Anterior na Série:** [Liberando Recursos e Capturando Exceções](<#/doc/tutorials/java-io/reading-writing/common-operations>)

**Próximo na Série:** [Lendo e Escrevendo Arquivos de Texto](<#/doc/tutorials/java-io/reading-writing/buffered-text>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Noções Básicas de Operações de Arquivo ](<#/doc/tutorials/java-io/reading-writing>) > Lendo e Escrevendo Arquivos Pequenos