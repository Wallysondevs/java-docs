# Acessando o Sistema de Arquivos

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Noções Básicas do Sistema de Arquivos ](<#/doc/tutorials/java-io/file-system>) > Acessando o Sistema de Arquivos

**Anterior na Série**

[Trabalhando com Paths](<#/doc/tutorials/java-io/file-system/path>)

➜

**Tutorial Atual**

Acessando o Sistema de Arquivos

➜

**Próximo na Série**

[Manipulando Arquivos e Diretórios](<#/doc/tutorials/java-io/file-system/move-copy-delete>)

**Anterior na Série:** [Trabalhando com Paths](<#/doc/tutorials/java-io/file-system/path>)

**Próximo na Série:** [Manipulando Arquivos e Diretórios](<#/doc/tutorials/java-io/file-system/move-copy-delete>)

# Acessando o Sistema de Arquivos

## Sistema de Arquivos Padrão

Para recuperar o sistema de arquivos padrão, use o método [`getDefault()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileSystems.html#getDefault\(\)>) da classe de fábrica [`FileSystems`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileSystems.html>). Tipicamente, este método [`FileSystems`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileSystems.html>) (observe o plural) é encadeado a um dos métodos [`FileSystem`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileSystem.html>) (observe o singular), como segue:

```java
FileSystem fs = FileSystems.getDefault();
```

Uma instância de [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) está sempre vinculada a um sistema de arquivos. Se nenhum sistema de arquivos for fornecido quando um path é criado, então o sistema de arquivos padrão é usado.

### Separador de String de Path

O separador de path para sistemas de arquivos POSIX é a barra, `/`, e para Microsoft Windows é a barra invertida, `\`. Outros sistemas de arquivos podem usar outros delimitadores. Para recuperar o separador de [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) para o sistema de arquivos padrão, você pode usar uma das seguintes abordagens:

```java
String separator = FileSystems.getDefault().getSeparator();
// or
String separator = File.separator;
```

O método [`getSeparator()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileSystem.html#getSeparator\(\)>) também é usado para recuperar o separador de path para qualquer sistema de arquivos disponível.

## File Stores

Um sistema de arquivos possui um ou mais file stores para armazenar seus arquivos e diretórios. O file store representa o dispositivo de armazenamento subjacente. Em sistemas operacionais UNIX, cada sistema de arquivos montado é representado por um file store. No Microsoft Windows, cada volume é representado por um file store.

Para recuperar uma lista de todos os file stores para o sistema de arquivos, você pode usar o método [`getFileStores()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileSystem.html#getFileStores\(\)>). Este método retorna um [`Iterable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Iterable.html>), o que permite usar a instrução for aprimorada para iterar sobre todos os diretórios raiz.

```java
for (FileStore store: FileSystems.getDefault().getFileStores()) {
    System.out.println(store.name());
}
```

Em uma máquina Windows, você obterá este tipo de resultado.

```
C:
D:
```

Se você precisar acessar as letras das unidades, pode usar o seguinte código. Lembre-se de que algumas letras de unidade podem ser usadas sem que a unidade tenha sido montada. O código a seguir verifica se cada letra de unidade é legível.

```java
for (char c = 'A'; c <= 'Z'; c++) {
    String drive = c + ":\\";
    File file = new File(drive);
    if (file.canRead()) {
        System.out.println(drive);
    }
}
```

Executar o código anterior no Windows produzirá um resultado semelhante a este.

```
C:\
D:\
```

### Neste tutorial

Sistema de Arquivos Padrão
File Stores

Última atualização: 25 de janeiro de 2023

**Anterior na Série**

[Trabalhando com Paths](<#/doc/tutorials/java-io/file-system/path>)

➜

**Tutorial Atual**

Acessando o Sistema de Arquivos

➜

**Próximo na Série**

[Manipulando Arquivos e Diretórios](<#/doc/tutorials/java-io/file-system/move-copy-delete>)

**Anterior na Série:** [Trabalhando com Paths](<#/doc/tutorials/java-io/file-system/path>)

**Próximo na Série:** [Manipulando Arquivos e Diretórios](<#/doc/tutorials/java-io/file-system/move-copy-delete>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Noções Básicas do Sistema de Arquivos ](<#/doc/tutorials/java-io/file-system>) > Acessando o Sistema de Arquivos