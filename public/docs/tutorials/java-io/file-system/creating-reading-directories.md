# Criando e Lendo Diretórios

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Fundamentos do Sistema de Arquivos ](<#/doc/tutorials/java-io/file-system>) > Criando e Lendo Diretórios

**Anterior na Série**

[Gerenciando Atributos de Arquivo](<#/doc/tutorials/java-io/file-system/metadata>)

➜

**Tutorial Atual**

Criando e Lendo Diretórios

➜

**Próximo na Série**

[Listando o Conteúdo de um Diretório](<#/doc/tutorials/java-io/file-system/listing>)

**Anterior na Série:** [Gerenciando Atributos de Arquivo](<#/doc/tutorials/java-io/file-system/metadata>)

**Próximo na Série:** [Listando o Conteúdo de um Diretório](<#/doc/tutorials/java-io/file-system/listing>)

# Criando e Lendo Diretórios

Alguns dos métodos discutidos anteriormente, como `delete()`, funcionam em arquivos, links e diretórios. Mas como você lista todos os diretórios no topo de um sistema de arquivos? Como você lista o conteúdo de um diretório ou cria um diretório?

## Listando os Diretórios Raiz de um Sistema de Arquivos

Você pode listar todos os diretórios raiz de um sistema de arquivos usando o método [`FileSystem.getRootDirectories()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileSystem.html#getRootDirectories\(\)>). Este método retorna um [`Iterable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Iterable.html>), o que permite usar a instrução for aprimorada para iterar sobre todos os diretórios raiz.

O trecho de código a seguir imprime os diretórios raiz para o sistema de arquivos padrão:

```java
Iterable<Path> rootDirectories = FileSystems.getDefault().getRootDirectories();
for (Path name : rootDirectories) {
    System.err.println(name);
}
```

## Criando um Diretório

Você pode criar um novo diretório usando o método [`Files.createDirectory(Path, FileAttribute)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#createDirectory\(java.nio.file.Path,java.nio.file.attribute.FileAttribute...\)>). Se você não especificar nenhum [`FileAttribute`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/FileAttribute.html>), o novo diretório terá atributos padrão. Por exemplo:

```java
Path dir = Paths.get("C:/rafaelnadal/grandslam/2014");
Files.createDirectory(dir);
```

O trecho de código a seguir cria um novo diretório em um sistema de arquivos POSIX que possui permissões específicas:

```java
Set<PosixFilePermission> perms = PosixFilePermissions.fromString("rwxr-x---");
FileAttribute<Set<PosixFilePermission>> attr = PosixFilePermissions.asFileAttribute(perms);
Files.createDirectory(dir, attr);
```

Para criar um diretório com vários níveis de profundidade quando um ou mais dos diretórios pai ainda não existirem, você pode usar o método de conveniência [`Files.createDirectories(Path, FileAttribute)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#createDirectories\(java.nio.file.Path,java.nio.file.attribute.FileAttribute...\)>). Assim como no método [`Files.createDirectory(Path, FileAttribute)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#createDirectory\(java.nio.file.Path,java.nio.file.attribute.FileAttribute...\)>), você pode especificar um conjunto opcional de atributos de arquivo iniciais. O trecho de código a seguir usa atributos padrão:

```java
Files.createDirectories(path);
```

Os diretórios são criados, conforme necessário, de cima para baixo. No exemplo `foo/bar/test`, se o diretório `foo` não existir, ele é criado. Em seguida, o diretório `bar` é criado, se necessário, e, finalmente, o diretório `test` é criado.

É possível que este método falhe após criar alguns, mas não todos, os diretórios pai.

## Criando um Diretório Temporário

Você pode criar um diretório temporário usando um dos métodos createTempDirectory:

  * [`createTempDirectory(Path, String, FileAttribute...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#createTempDirectory\(java.nio.file.Path,java.lang.String,java.nio.file.attribute.FileAttribute...\)>)
  * [`createTempDirectory(String, FileAttribute...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#createTempDirectory\(java.lang.String,java.nio.file.attribute.FileAttribute...\)>)

O primeiro método permite que o código especifique um local para o diretório temporário e o segundo método cria um novo diretório no diretório de arquivos temporários padrão.

### Neste tutorial

Listando os Diretórios Raiz de um Sistema de Arquivos Criando um Diretório Criando um Diretório Temporário

Última atualização: 25 de janeiro de 2023

**Anterior na Série**

[Gerenciando Atributos de Arquivo](<#/doc/tutorials/java-io/file-system/metadata>)

➜

**Tutorial Atual**

Criando e Lendo Diretórios

➜

**Próximo na Série**

[Listando o Conteúdo de um Diretório](<#/doc/tutorials/java-io/file-system/listing>)

**Anterior na Série:** [Gerenciando Atributos de Arquivo](<#/doc/tutorials/java-io/file-system/metadata>)

**Próximo na Série:** [Listando o Conteúdo de um Diretório](<#/doc/tutorials/java-io/file-system/listing>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Fundamentos do Sistema de Arquivos ](<#/doc/tutorials/java-io/file-system>) > Criando e Lendo Diretórios