# Lendo e Escrevendo Arquivos Binários

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de I/O do Java ](<#/doc/tutorials/java-io>) > [ Noções Básicas de Operações de Arquivo ](<#/doc/tutorials/java-io/reading-writing>) > Lendo e Escrevendo Arquivos Binários

**Anterior na Série**

[Lendo e Escrevendo Arquivos de Texto](<#/doc/tutorials/java-io/reading-writing/buffered-text>)

➜

**Tutorial Atual**

Lendo e Escrevendo Arquivos Binários

➜

**Próximo na Série**

[Decorando Streams de I/O](<#/doc/tutorials/java-io/reading-writing/decorating>)

**Anterior na Série:** [Lendo e Escrevendo Arquivos de Texto](<#/doc/tutorials/java-io/reading-writing/buffered-text>)

**Próximo na Série:** [Decorando Streams de I/O](<#/doc/tutorials/java-io/reading-writing/decorating>)

# Lendo e Escrevendo Arquivos Binários

## Lendo um Arquivo Usando I/O de Stream

Para abrir um arquivo para leitura, você pode usar o método [`newInputStream(Path, OpenOption...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newInputStream\(java.nio.file.Path,java.nio.file.OpenOption...\)>). Este método retorna um input stream não armazenado em buffer para leitura de bytes do arquivo.

## Criando e Escrevendo um Arquivo Usando I/O de Stream

Você pode criar um arquivo, anexar a um arquivo ou escrever em um arquivo usando o método [`newOutputStream(Path, OpenOption...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newOutputStream\(java.nio.file.Path,java.nio.file.OpenOption...\)>). Este método abre ou cria um arquivo para escrita de bytes e retorna um output stream não armazenado em buffer.

O método aceita um parâmetro [`OpenOption`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/OpenOption.html>) opcional. Se nenhuma opção de abertura for especificada e o arquivo não existir, um novo arquivo é criado. Se o arquivo existir, ele é truncado. Esta opção é equivalente a invocar o método com as opções [`CREATE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardOpenOption.html#CREATE>) e [`TRUNCATE_EXISTING`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardOpenOption.html#TRUNCATE_EXISTING>).

O exemplo a seguir abre um arquivo de log. Se o arquivo não existir, ele é criado. Se o arquivo existir, ele é aberto para anexação.

## Lendo e Escrevendo Arquivos Usando I/O de Canal

Enquanto a I/O de stream lê um caractere por vez, a I/O de canal lê um buffer por vez. A interface [`ByteChannel`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/ByteChannel.html>) fornece funcionalidade básica de leitura e escrita. Um [`SeekableByteChannel`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/SeekableByteChannel.html>) é um [`ByteChannel`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/ByteChannel.html>) que tem a capacidade de manter uma posição no canal e de alterar essa posição. Um [`SeekableByteChannel`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/SeekableByteChannel.html>) também suporta truncar o arquivo associado ao canal e consultar o arquivo para seu tamanho.

A capacidade de mover para diferentes pontos no arquivo e então ler ou escrever nessa localização torna possível o acesso aleatório a um arquivo. Veja a seção [Arquivos de Acesso Aleatório](<#/doc/tutorials/java-io/reading-writing/small-files>) para mais informações.

Existem dois métodos em [`Files`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html>) para leitura e escrita de I/O de canal.

  * [`newByteChannel(Path, OpenOption...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newByteChannel\(java.nio.file.Path,java.nio.file.OpenOption...\)>)
  * [`newByteChannel(Path, Set<? extends OpenOption>, FileAttribute<?>...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newByteChannel\(java.nio.file.Path,java.util.Set,java.nio.file.attribute.FileAttribute...\)>)

E outros dois na classe [`FileChannel`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/FileChannel.html>).

  * [`FileChannel.open(Path, OpenOption)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/FileChannel.html#open\(java.nio.file.Path,java.nio.file.OpenOption...\)>): que aceita um [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) e um número variável de instâncias de [`OpenOption`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/OpenOption.html>).
  * [`FileChannel.open(Path,Set,FileAttributes)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/FileChannel.html#open\(java.nio.file.Path,java.util.Set,java.nio.file.attribute.FileAttribute...\)>): que aceita um [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>), um [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) de instâncias de [`OpenOption`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/OpenOption.html>), e um número variável de instâncias de [`FileAttribute`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/FileAttribute.html>).

> Nota: Os métodos [`newByteChannel()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newByteChannel\(java.nio.file.Path,java.nio.file.OpenOption...\)>) retornam uma instância de um [`SeekableByteChannel`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/SeekableByteChannel.html>). Com um sistema de arquivos padrão, você pode converter este canal de bytes buscável para um [`FileChannel`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/FileChannel.html>) fornecendo acesso a recursos mais avançados, como mapear uma região do arquivo diretamente na memória para acesso mais rápido, bloquear uma região do arquivo para que outros processos não possam acessá-la, ou ler e escrever bytes de uma posição absoluta sem afetar a posição atual do canal.

Ambos os métodos [`newByteChannel()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newByteChannel\(java.nio.file.Path,java.nio.file.OpenOption...\)>) permitem que você especifique uma lista de opções [`OpenOption`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/OpenOption.html>). As mesmas opções de abertura usadas pelos métodos [`newOutputStream()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newOutputStream\(java.nio.file.Path,java.nio.file.OpenOption...\)>) são suportadas, além de mais uma opção: [`READ`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardOpenOption.html#READ>) é necessária porque o [`SeekableByteChannel`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/channels/SeekableByteChannel.html>) suporta tanto leitura quanto escrita.

Especificar [`READ`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardOpenOption.html#READ>) abre o canal para leitura. Especificar [`WRITE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardOpenOption.html#WRITE>) ou [`APPEND`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardOpenOption.html#APPEND>) abre o canal para escrita. Se nenhuma dessas opções for especificada, o canal é aberto para leitura.

O trecho de código a seguir lê um arquivo e o imprime na saída padrão:

O exemplo a seguir, escrito para UNIX e outros sistemas de arquivos POSIX, cria um arquivo de log com um conjunto específico de permissões de arquivo. Este código cria um arquivo de log ou anexa ao arquivo de log se ele já existir. O arquivo de log é criado com permissões de leitura/escrita para o proprietário e permissões de somente leitura para o grupo.

### Neste tutorial

Lendo um Arquivo Usando I/O de Streams
Criando e Escrevendo um Arquivo Usando I/O de Streams
Lendo e Escrevendo Arquivos Usando I/O de Canais

Última atualização: 25 de janeiro de 2023

**Anterior na Série**

[Lendo e Escrevendo Arquivos de Texto](<#/doc/tutorials/java-io/reading-writing/buffered-text>)

➜

**Tutorial Atual**

Lendo e Escrevendo Arquivos Binários

➜

**Próximo na Série**

[Decorando Streams de I/O](<#/doc/tutorials/java-io/reading-writing/decorating>)

**Anterior na Série:** [Lendo e Escrevendo Arquivos de Texto](<#/doc/tutorials/java-io/reading-writing/buffered-text>)

**Próximo na Série:** [Decorando Streams de I/O](<#/doc/tutorials/java-io/reading-writing/decorating>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de I/O do Java ](<#/doc/tutorials/java-io>) > [ Noções Básicas de Operações de Arquivo ](<#/doc/tutorials/java-io/reading-writing>) > Lendo e Escrevendo Arquivos Binários