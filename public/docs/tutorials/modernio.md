# Tarefas Comuns de E/S no Java Moderno

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Tarefas Comuns de E/S no Java Moderno

# Tarefas Comuns de E/S no Java Moderno

Esta página foi contribuída por [Cay Horstmann](</author/CayHorstmann>) sob a [UPL](<https://oss.oracle.com/licenses/upl/>)

## Introdução

Este artigo foca em tarefas que programadores de aplicações provavelmente encontrarão, particularmente em aplicações web, tais como:

  * Leitura e escrita de arquivos de texto
  * Leitura de texto, imagens, JSON da web
  * Visitando arquivos em um diretório
  * Lendo um arquivo ZIP
  * Criando um arquivo ou diretório temporário

A API Java suporta muitas outras tarefas, que são explicadas em detalhes no [tutorial da API Java I/O](<#/doc/tutorials/java-io>).

Este artigo foca nas melhorias da API desde o Java 8. Em particular:

  * UTF-8 é o padrão para I/O desde o Java 18 (desde [JEP 400: UTF-8 por Padrão](<https://openjdk.org/jeps/400>))
  * A classe [`java.nio.file.Files`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html>), que apareceu pela primeira vez no Java 7, adicionou métodos úteis no Java 8, 11 e 12
  * [`java.io.InputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/InputStream.html>) ganhou métodos úteis no Java 9, 11 e 12
  * As classes [`java.io.File`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/File.html>) e [`java.io.BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>) estão agora completamente obsoletas, embora apareçam frequentemente em pesquisas na web e chats de IA.

## Lendo Arquivos de Texto

Você pode ler um arquivo de texto em uma string assim:

```java
String contents = Files.readString(path);
```

Aqui, `path` é uma instância de [`java.nio.file.Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>), obtida assim:

```java
Path path = Path.of("myfile.txt");
```

Antes do Java 18, era fortemente recomendado especificar a codificação de caracteres em qualquer operação de arquivo que lesse ou escrevesse strings. Atualmente, a codificação de caracteres mais comum é UTF-8, mas para compatibilidade retroativa, o Java usava a "codificação da plataforma", que pode ser uma codificação legada no Windows. Para garantir a portabilidade, as operações de I/O de texto precisavam dos parâmetros [`StandardCharsets.UTF_8`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/charset/StandardCharsets.html#UTF_8>). Isso não é mais necessário.

Se você quiser o arquivo como uma sequência de linhas, chame

```java
List<String> lines = Files.readAllLines(path);
```

Se o arquivo for grande, processe as linhas de forma preguiçosa como um [`Stream<String>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html>):

```java
try (Stream<String> lines = Files.lines(path)) {
   // Process lines
}
```

Também use [`Files.lines`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#lines\(java.nio.file.Path\)>) se você puder processar linhas naturalmente com operações de stream (como [`map`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#map\(java.util.function.Function\)>), [`filter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/stream/Stream.html#filter\(java.util.function.Predicate\)>)). Observe que o stream retornado por [`Files.lines`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#lines\(java.nio.file.Path\)>) precisa ser fechado. Para garantir que isso aconteça, use uma instrução _try-with-resources_, como no trecho de código anterior.

Não há mais uma boa razão para usar o método [`readLine`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html#readLine\(\)>) de [`java.io.BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>).

Para dividir sua entrada em algo diferente de linhas, use um [`java.util.Scanner`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Scanner.html>). Por exemplo, veja como você pode ler palavras, separadas por não-letras:

```java
try (Scanner in = new Scanner(path)) {
   in.useDelimiter("[^\\p{L}]+");
   while (in.hasNext()) {
      String word = in.next();
      // Process word
   }
}
```

A classe [`Scanner`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Scanner.html>) também possui métodos para ler números, mas geralmente é mais simples ler a entrada como uma string por linha, ou uma única string, e então analisá-la.

Tenha cuidado ao analisar números de arquivos de texto, pois seu formato pode depender da localidade. Por exemplo, a entrada `100.000` é 100.0 na localidade dos EUA, mas 100000.0 na localidade alemã. Use [`java.text.NumberFormat`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/text/NumberFormat.html>) para análise específica da localidade. Alternativamente, você pode usar [`Integer.parseInt`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#parseInt\(java.lang.String\)>)/[`Double.parseDouble`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Double.html#parseDouble\(java.lang.String\)>).

## Escrevendo Arquivos de Texto

Você pode escrever uma string em um arquivo de texto com uma única chamada:

```java
Files.writeString(path, contents);
```

Se você tiver uma lista de linhas em vez de uma única string, use:

```java
Files.write(path, lines);
```

Para uma saída mais geral, use um [`PrintWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintWriter.html>) se quiser usar o método [`printf`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintWriter.html#printf\(java.lang.String,java.lang.Object...\)>):

```java
try (PrintWriter out = new PrintWriter(path.toFile())) {
   out.printf("Hello, %s!%n", "World");
}
```

Observe que [`printf`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintWriter.html#printf\(java.lang.String,java.lang.Object...\)>) é específico da localidade. Ao escrever números, certifique-se de escrevê-los no formato apropriado. Em vez de usar [`printf`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintWriter.html#printf\(java.lang.String,java.lang.Object...\)>), considere [`java.text.NumberFormat`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/text/NumberFormat.html>) ou [`Integer.toString`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#toString\(\)>)/[`Double.toString`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Double.html#Double.html#toString\(double\)>).

Estranhamente, a partir do Java 21, não há construtor de [`PrintWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintWriter.html>) com um parâmetro [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>).

Se você não usar [`printf`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintWriter.html#printf\(java.lang.String,java.lang.Object...\)>), você pode usar a classe [`BufferedWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedWriter.html>) e escrever strings com o método [`write`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedWriter.html#write\(int\)>).

```java
try (BufferedWriter writer = Files.newBufferedWriter(path)) {
   writer.write("Hello");
   writer.newLine();
   writer.write("World");
}
```

Lembre-se de fechar o `writer` quando terminar.

## Lendo de um Input Stream

Talvez a razão mais comum para usar um stream seja ler algo de um site.

Se você precisar definir cabeçalhos de requisição ou ler cabeçalhos de resposta, use o [`HttpClient`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.net.http/java/net/http/HttpClient.html>):

```java
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder(new URI("https://example.com/data"))
   .header("Accept", "application/json")
   .build();
HttpResponse<InputStream> response = client.send(request, HttpResponse.BodyHandlers.ofInputStream());
try (InputStream in = response.body()) {
   // Process input stream
}
```

Isso é um exagero se tudo o que você quer são os dados. Em vez disso, use:

```java
try (InputStream in = new URL("https://example.com/data").openStream()) {
   // Process input stream
}
```

Então leia os dados em um array de bytes e opcionalmente transforme-os em uma string:

```java
byte[] bytes = in.readAllBytes();
String contents = new String(bytes, StandardCharsets.UTF_8);
```

Ou transfira os dados para um output stream:

```java
in.transferTo(out);
```

Observe que nenhum loop é necessário se você simplesmente quiser ler todos os bytes de um input stream.

Mas você realmente precisa de um input stream? Muitas APIs oferecem a opção de ler de um arquivo ou URL.

Sua biblioteca JSON favorita provavelmente terá métodos para ler de um arquivo ou URL. Por exemplo, com [Jackson jr](<https://github.com/FasterXML/jackson-jr>):

```java
Map<String, Object> result = JSON.std.mapFrom(new URL("https://dog.ceo/api/breeds/image/random"));
```

Aqui está como ler a imagem do cachorro da chamada anterior:

```java
BufferedImage image = ImageIO.read(new URL("https://images.dog.ceo/breeds/terrier-tibetan/n02097474_1000.jpg"));
```

Isso é melhor do que passar um input stream para o método [`read`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.desktop/javax/imageio/ImageIO.html#read\(java.net.URL\)>), porque a biblioteca pode usar informações adicionais da URL para determinar o tipo de imagem.

## A API Files

A classe [`java.nio.file.Files`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html>) fornece um conjunto abrangente de operações de arquivo, como criar, copiar, mover e excluir arquivos e diretórios. O tutorial [Noções Básicas do Sistema de Arquivos](<#/doc/tutorials/java-io/file-system>) oferece uma descrição completa. Nesta seção, destaco algumas tarefas comuns.

### Percorrendo Entradas em Diretórios e Subdiretórios

Para a maioria das situações, você pode usar um de dois métodos. O método [`Files.list`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#list\(java.nio.file.Path\)>) visita todas as entradas (arquivos, subdiretórios, links simbólicos) de um diretório.

```java
try (Stream<Path> entries = Files.list(directory)) {
   // Process entries
}
```

Use uma instrução _try-with-resources_ para garantir que o objeto stream, que mantém o controle da iteração, será fechado.

Se você também quiser visitar as entradas de diretórios descendentes, use o método [`Files.walk`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#walk\(java.nio.file.Path,java.nio.file.FileVisitOption...\)>)

```java
try (Stream<Path> entries = Files.walk(directory)) {
   // Process entries
}
```

Então, simplesmente use métodos de stream para focar nas entradas de seu interesse e coletar os resultados:

```java
List<Path> result = Files.walk(directory)
   .filter(Files::isRegularFile)
   .filter(p -> p.getFileName().toString().endsWith(".java"))
   .collect(Collectors.toList());
```

Aqui estão os outros métodos para percorrer entradas de diretório:

  * Uma versão sobrecarregada de [`Files.walk`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#walk\(java.nio.file.Path,int,java.nio.file.FileVisitOption...\)>) permite limitar a profundidade da árvore percorrida.
  * Dois métodos [`Files.walkFileTree`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#walkFileTree\(java.nio.file.Path,java.nio.file.FileVisitor\)>) fornecem mais controle sobre o processo de iteração, notificando um [`FileVisitor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html>) quando um diretório é visitado pela primeira e última vez. Isso pode ser ocasionalmente útil, particularmente para esvaziar e excluir uma árvore de diretórios. Consulte o tutorial [Percorrendo a Árvore de Arquivos](<#/doc/tutorials/java-io/file-system/walking-tree>) para detalhes. A menos que você precise desse controle, use o método [`Files.walk`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#walk\(java.nio.file.Path,java.nio.file.FileVisitOption...\)>) mais simples.
  * O método [`Files.find`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#find\(java.nio.file.Path,int,java.util.function.BiPredicate,java.nio.file.FileVisitOption...\)>) é como [`Files.walk`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#walk\(java.nio.file.Path,java.nio.file.FileVisitOption...\)>), mas você fornece um filtro que inspeciona cada path e seus [`BasicFileAttributes`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/BasicFileAttributes.html>). Isso é ligeiramente mais eficiente do que ler os atributos separadamente para cada arquivo.
  * Dois métodos [`Files.newDirectoryStream(Path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newDirectoryStream\(java.nio.file.Path\)>) produzem instâncias de [`DirectoryStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/DirectoryStream.html>), que podem ser usadas em loops `for` aprimorados. Não há vantagem sobre o uso de [`Files.list`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#list\(java.nio.file.Path\)>).
  * Os métodos legados [`File.list`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/File.html#list\(\)>) ou [`File.listFiles`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/File.html#listFiles\(\)>) retornam nomes de arquivos ou objetos [`File`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/File.html>). Estes estão agora obsoletos.

### Trabalhando com Arquivos ZIP

Desde o Java 1.1, as classes [`ZipInputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/zip/ZipInputStream.html>) e [`ZipOutputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/zip/ZipOutputStream.html>) fornecem uma API para processar arquivos ZIP. Mas a API é um pouco desajeitada. O Java 8 introduziu um _sistema de arquivos ZIP_ muito mais agradável:

```java
Path zipfile = Path.of("archive.zip");
Map<String, String> env = Map.of("create", "true");
try (FileSystem fs = FileSystems.newFileSystem(zipfile, env)) {
   // Process ZIP file
}
```

A instrução _try-with-resources_ garante que o método [`close`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/AutoCloseable.html#close\(\)>) seja chamado após as operações do arquivo ZIP. Esse método atualiza o arquivo ZIP para refletir quaisquer alterações no sistema de arquivos.

Você pode então usar os métodos da classe [`Files`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html>). Aqui obtemos uma lista de todos os arquivos no arquivo ZIP:

```java
Path root = fs.getPath("/");
List<Path> entries = Files.walk(root)
   .filter(Files::isRegularFile)
   .collect(Collectors.toList());
```

Para ler o conteúdo do arquivo, basta usar [`Files.readString`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#readString\(java.nio.file.Path\)>) ou [`Files.readAllBytes`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#readAllBytes\(java.nio.file.Path\)>):

```java
String contents = Files.readString(fs.getPath("/README.txt"));
```

Você pode remover arquivos com [`Files.delete`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#delete\(java.nio.file.Path\)>). Para adicionar ou substituir arquivos, basta usar [`Files.writeString`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#writeString\(java.nio.file.Path,java.lang.CharSequence,java.nio.file.OpenOption...\)>) ou [`Files.write`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#write\(java.nio.file.Path,byte%5B%5D,java.nio.file.OpenOption...\)>).

### Criando Arquivos e Diretórios Temporários

Com bastante frequência, preciso coletar entrada do usuário, produzir arquivos e executar um processo externo. Então, uso arquivos temporários, que desaparecem após a próxima reinicialização, ou um diretório temporário que apago após a conclusão do processo.

Para isso, uso os dois métodos [`Files.createTempFile`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#createTempFile\(java.lang.String,java.lang.String,java.nio.file.attribute.FileAttribute...\)>) e [`Files.createTempDirectory`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#createTempDirectory\(java.nio.file.Path,java.lang.String,java.nio.file.attribute.FileAttribute...\)>).

```java
Path tempFile = Files.createTempFile("myapp", ".txt");
Path tempDir = Files.createTempDirectory("myapp");
```

Isso cria um arquivo ou diretório temporário em um local adequado (`/tmp` no Linux) com o prefixo fornecido e, para um arquivo, sufixo.

## Conclusão

Pesquisas na web e chats de IA podem sugerir códigos desnecessariamente complexos para operações comuns de I/O. Frequentemente, existem alternativas melhores:

  1. Você não precisa de um loop para ler ou escrever strings ou arrays de bytes.
  2. Você pode nem precisar de um stream, reader ou writer.
  3. Familiarize-se com os métodos [`Files`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html>) para criar, copiar, mover e excluir arquivos e diretórios.
  4. Use [`Files.list`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#list\(java.nio.file.Path\)>) ou [`Files.walk`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#walk\(java.nio.file.Path,java.nio.file.FileVisitOption...\)>) para percorrer entradas de diretório.
  5. Use um sistema de arquivos ZIP para processar arquivos ZIP.
  6. Mantenha-se afastado da classe legada [`File`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/File.html>).

### Neste tutorial

Introdução Lendo Arquivos de Texto Escrevendo Arquivos de Texto A API Files Conclusão

Última atualização: 24 de outubro de 2025

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Tarefas Comuns de E/S no Java Moderno

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)