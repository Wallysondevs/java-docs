# Links, Simbólicos e Outros

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Fundamentos do Sistema de Arquivos ](<#/doc/tutorials/java-io/file-system>) > Links, Simbólicos e Outros

**Anterior na Série**

[Manipulando Arquivos e Diretórios](<#/doc/tutorials/java-io/file-system/move-copy-delete>)

➜

**Tutorial Atual**

Links, Simbólicos e Outros

➜

**Próximo na Série**

[Gerenciando Atributos de Arquivo](<#/doc/tutorials/java-io/file-system/metadata>)

**Anterior na Série:** [Manipulando Arquivos e Diretórios](<#/doc/tutorials/java-io/file-system/move-copy-delete>)

**Próximo na Série:** [Gerenciando Atributos de Arquivo](<#/doc/tutorials/java-io/file-system/metadata>)

# Links, Simbólicos e Outros

Como mencionado anteriormente, o pacote [`java.nio.file`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/package-summary.html>), e a classe [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) em particular, é "sensível a links". Cada método [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) ou detecta o que fazer quando um link simbólico é encontrado, ou fornece uma opção que permite configurar o comportamento quando um link simbólico é encontrado.

A discussão até agora tem sido sobre links simbólicos ou soft links, mas alguns sistemas de arquivos também suportam hard links. Hard links são mais restritivos que links simbólicos, da seguinte forma:

  * O destino do link deve existir.
  * Hard links geralmente não são permitidos em diretórios.
  * Hard links não são permitidos atravessar partições ou volumes. Portanto, eles não podem existir entre sistemas de arquivos.
  * Um hard link se parece e se comporta como um arquivo regular, então eles podem ser difíceis de encontrar.
  * Um hard link é, para todos os efeitos, a mesma entidade que o arquivo original. Eles têm as mesmas permissões de arquivo, carimbos de data/hora e assim por diante. Todos os atributos são idênticos.

Devido a essas restrições, hard links não são usados com tanta frequência quanto links simbólicos, mas os métodos [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) funcionam perfeitamente com hard links.

## Criando um Link Simbólico

Se o seu sistema de arquivos o suportar, você pode criar um link simbólico usando o método [`createSymbolicLink(Path, Path, FileAttribute)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#createSymbolicLink\(java.nio.file.Path,java.nio.file.Path,java.nio.file.attribute.FileAttribute...\)>). O segundo argumento [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) representa o arquivo ou diretório de destino e pode ou não existir. O seguinte trecho de código cria um link simbólico com permissões padrão:

```java
Path newLink = Files.createSymbolicLink(
    link, target, perms);
```

O vararg [`FileAttribute`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/FileAttribute.html>) permite que você especifique atributos de arquivo iniciais que são definidos atomicamente quando o link é criado.

## Criando um Hard Link

Você pode criar um hard link (ou link regular) para um arquivo existente usando o método [`createLink(Path, Path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#createLink\(java.nio.file.Path,java.nio.file.Path\)>). O segundo argumento [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) localiza o arquivo existente, e ele deve existir ou uma [`NoSuchFileException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/NoSuchFileException.html>) será lançada. O seguinte trecho de código mostra como criar um link:

```java
Path newLink = Files.createLink(link, existingFile);
```

## Detectando um Link Simbólico

Para determinar se uma instância de [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) é um link simbólico, você pode usar o método [`isSymbolicLink(Path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#isSymbolicLink\(java.nio.file.Path\)>). O seguinte trecho de código mostra como:

```java
Path file = ...;
boolean isSymbolicLink = Files.isSymbolicLink(file);
```

Para mais informações, consulte a seção [Gerenciando Metadados](<#/doc/tutorials/java-io/file-system/metadata>).

## Encontrando o Destino de um Link

Você pode obter o destino de um link simbólico usando o método [`readSymbolicLink(Path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#readSymbolicLink\(java.nio.file.Path\)>), da seguinte forma:

```java
Path link = ...;
Path target = Files.readSymbolicLink(link);
```

Se o [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) não for um link simbólico, este método lança uma [`NotLinkException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/NotLinkException.html>).

### Neste tutorial

Criando um Link Simbólico
Criando um Hard Link
Detectando um Link Simbólico
Encontrando o Destino de um Link

Última atualização: 25 de janeiro de 2023

**Anterior na Série**

[Manipulando Arquivos e Diretórios](<#/doc/tutorials/java-io/file-system/move-copy-delete>)

➜

**Tutorial Atual**

Links, Simbólicos e Outros

➜

**Próximo na Série**

[Gerenciando Atributos de Arquivo](<#/doc/tutorials/java-io/file-system/metadata>)

**Anterior na Série:** [Manipulando Arquivos e Diretórios](<#/doc/tutorials/java-io/file-system/move-copy-delete>)

**Próximo na Série:** [Gerenciando Atributos de Arquivo](<#/doc/tutorials/java-io/file-system/metadata>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Fundamentos do Sistema de Arquivos ](<#/doc/tutorials/java-io/file-system>) > Links, Simbólicos e Outros