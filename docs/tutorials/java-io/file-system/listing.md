# Listando o Conteúdo de um Diretório

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Noções Básicas do Sistema de Arquivos ](<#/doc/tutorials/java-io/file-system>) > Listando o Conteúdo de um Diretório

**Anterior na Série**

[Criando e Lendo Diretórios](<#/doc/tutorials/java-io/file-system/creating-reading-directories>)

➜

**Tutorial Atual**

Listando o Conteúdo de um Diretório

➜

**Próximo na Série**

[Percorrendo a Árvore de Arquivos](<#/doc/tutorials/java-io/file-system/walking-tree>)

**Anterior na Série:** [Criando e Lendo Diretórios](<#/doc/tutorials/java-io/file-system/creating-reading-directories>)

**Próximo na Série:** [Percorrendo a Árvore de Arquivos](<#/doc/tutorials/java-io/file-system/walking-tree>)

# Listando o Conteúdo de um Diretório

## Listando o Conteúdo de um Diretório

Você pode listar todo o conteúdo de um diretório usando o método [`newDirectoryStream(Path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newDirectoryStream\(java.nio.file.Path\)>). Este método retorna um objeto que implementa a interface [`DirectoryStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/DirectoryStream.html>). A classe que implementa a interface [`DirectoryStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/DirectoryStream.html>) também implementa [`Iterable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Iterable.html>), então você pode iterar através do stream do diretório, lendo todos os objetos. Essa abordagem se adapta bem a diretórios muito grandes.

> Lembre-se: O [`DirectoryStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/DirectoryStream.html>) retornado usa recursos do seu sistema de arquivos. Se você não estiver usando uma instrução try-with-resources, não se esqueça de fechar o stream do diretório no bloco finally. A instrução try-with-resources cuida disso para você. Você pode aprender mais sobre a instrução try-with-resources na seção [A Instrução try-with-resources](<#/doc/tutorials/exceptions/catching-handling>).

O trecho de código a seguir mostra como imprimir o conteúdo de um diretório:

```java
Path dir = ...;
try (DirectoryStream<Path> stream = Files.newDirectoryStream(dir)) {
    for (Path entry: stream) {
        System.out.println(entry.getFileName());
    }
} catch (IOException x) {
    // IOException can never be thrown by the iteration.
    // In this case, the IOException is thrown by newDirectoryStream.
    System.err.println(x);
}
```

Os objetos [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) retornados pelo iterador são os nomes das entradas resolvidas em relação ao diretório. Assim, se você estiver listando o conteúdo do diretório `/tmp`, as entradas são retornadas no formato `/tmp/a`, `/tmp/b`, e assim por diante.

Este método retorna todo o conteúdo de um diretório: arquivos, links, subdiretórios e arquivos ocultos. Se você quiser ser mais seletivo sobre o conteúdo que é recuperado, você pode usar um dos outros métodos [`newDirectoryStream()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newDirectoryStream\(java.nio.file.Path\)>), conforme descrito mais adiante nesta página.

Note que se houver uma exceção durante a iteração do diretório, então [`DirectoryIteratorException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/DirectoryIteratorException.html>) é lançada com a [`IOException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOException.html>) como causa. Métodos de [`Iterator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Iterator.html>) não podem lançar exceções.

## Filtrando uma Listagem de Diretório Usando Globbing

Se você deseja buscar apenas arquivos e subdiretórios onde cada nome corresponde a um padrão específico, você pode fazer isso usando o método [`newDirectoryStream(Path, String)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newDirectoryStream\(java.nio.file.Path,java.lang.String\)>), que fornece um filtro glob embutido. Se você não está familiarizado com a sintaxe glob, consulte a seção [O Que é um Glob](<#/doc/tutorials/java-io/file-system/listing>), no final desta página.

Por exemplo, o trecho de código a seguir lista arquivos relacionados a Java: arquivos _.class_ , _.java_ e _.jar_ :

```java
Path dir = ...;
try (DirectoryStream<Path> stream = Files.newDirectoryStream(dir, "*.{java,class,jar}")) {
    for (Path entry: stream) {
        System.out.println(entry.getFileName());
    }
} catch (IOException x) {
    System.err.println(x);
}
```

## Escrevendo Seu Próprio Filtro de Diretório

Talvez você queira filtrar o conteúdo de um diretório com base em alguma condição diferente da correspondência de padrões. Você pode criar seu próprio filtro implementando a interface [`DirectoryStream.Filter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/DirectoryStream.Filter.html>). Esta interface consiste em um método, [`accept()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/DirectoryStream.Filter.html#accept\(T\)>), que determina se um arquivo atende ao requisito de busca.

Por exemplo, o trecho de código a seguir implementa um filtro que recupera apenas diretórios:

```java
DirectoryStream.Filter<Path> filter = new DirectoryStream.Filter<Path>() {
    public boolean accept(Path file) throws IOException {
        return (Files.isDirectory(file));
    }
};
```

Uma vez que o filtro tenha sido criado, ele pode ser invocado usando o método [`newDirectoryStream(Path, DirectoryStream.Filter)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#newDirectoryStream\(java.nio.file.Path,java.nio.file.DirectoryStream.Filter\)>). O trecho de código a seguir usa o filtro `isDirectory()` para imprimir apenas os subdiretórios do diretório na saída padrão:

```java
Path dir = ...;
try (DirectoryStream<Path> stream = Files.newDirectoryStream(dir, filter)) {
    for (Path entry: stream) {
        System.out.println(entry.getFileName());
    }
} catch (IOException x) {
    System.err.println(x);
}
```

Este método é usado para filtrar apenas um único diretório. No entanto, se você quiser encontrar todos os subdiretórios em uma árvore de arquivos, você usaria o mecanismo para [Percorrer a Árvore de Arquivos](<#/doc/tutorials/java-io/file-system/walking-tree>).

## O Que é um Glob

Você pode usar a sintaxe glob para especificar o comportamento de correspondência de padrões.

Um padrão glob é especificado como uma string e é comparado com outras strings, como nomes de diretórios ou arquivos. A sintaxe glob segue várias regras simples:

*   Um asterisco, `*`, corresponde a qualquer número de caracteres (incluindo nenhum).
*   Dois asteriscos, `, funciona como `*` mas atravessa limites de diretório. Esta sintaxe é geralmente usada para corresponder a caminhos completos.
*   Um ponto de interrogação, `?`, corresponde a exatamente um caractere.
*   Chaves especificam uma coleção de subpadrões. Por exemplo:
    *   `{sun,moon,stars}` corresponde a "sun", "moon" ou "stars".
    *   `{temp*,tmp*}` corresponde a todas as strings que começam com "temp" ou "tmp".
*   Colchetes transmitem um conjunto de caracteres únicos ou, quando o caractere hífen (`-`) é usado, um intervalo de caracteres. Por exemplo:
    *   `[aeiou]` corresponde a qualquer vogal minúscula.
    *   `[0-9]` corresponde a qualquer dígito.
    *   `[A-Z]` corresponde a qualquer letra maiúscula.
    *   `[a-z,A-Z]` corresponde a qualquer letra maiúscula ou minúscula. Dentro dos colchetes, `*`, `?` e `\` correspondem a si mesmos.
*   Se o caractere após o `[` for um `!`, então ele é usado para negação. Por exemplo, `[!a-c]` corresponde a qualquer caractere, exceto `a`, `b` ou `c`.
*   Todos os outros caracteres correspondem a si mesmos.
*   Para corresponder a `*`, `?` ou os outros caracteres especiais, você pode escapá-los usando o caractere barra invertida `\`. Por exemplo: `\\\\` corresponde a uma única barra invertida, e `\\?` corresponde ao ponto de interrogação.

Aqui estão alguns exemplos de sintaxe glob:

*   `*.html` – Corresponde a todas as strings que terminam em `.html`
*   `???` – Corresponde a todas as strings com exatamente três caracteres
*   `*[0-9]*` – Corresponde a todas as strings que contêm um valor numérico
*   `*.{htm,html,pdf}` – Corresponde a qualquer string que termine com `.htm`, `.html` ou `.pdf`
*   `a?*.java` – Corresponde a qualquer string que comece com `a`, seguida por pelo menos um caractere, e termine com `.java`
*   `{foo*,*[0-9]*}` – Corresponde a qualquer string que comece com `foo` ou qualquer string que contenha um valor numérico

> Nota: Se você estiver digitando o padrão glob no teclado e ele contiver um dos caracteres especiais, você deve colocar o padrão entre aspas (`"*"`), usar a barra invertida (`\*`), ou usar qualquer mecanismo de escape suportado na linha de comando.

A sintaxe glob é poderosa e fácil de usar. No entanto, se não for suficiente para suas necessidades, você também pode usar uma expressão regular. Para mais informações, consulte a seção sobre Expressões Regulares.

Para mais informações sobre a sintaxe glob, consulte a especificação da API para o método [`getPathMatcher(String)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileSystem.html#getPathMatcher\(java.lang.String\)>) na classe [`FileSystem`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileSystem.html>).

### Neste tutorial

Listando o Conteúdo de um Diretório Filtrando uma Listagem de Diretório Usando Globbing Escrevendo Seu Próprio Filtro de Diretório O Que é um Glob

Última atualização: 25 de janeiro de 2023

**Anterior na Série**

[Criando e Lendo Diretórios](<#/doc/tutorials/java-io/file-system/creating-reading-directories>)

➜

**Tutorial Atual**

Listando o Conteúdo de um Diretório

➜

**Próximo na Série**

[Percorrendo a Árvore de Arquivos](<#/doc/tutorials/java-io/file-system/walking-tree>)

**Anterior na Série:** [Criando e Lendo Diretórios](<#/doc/tutorials/java-io/file-system/creating-reading-directories>)

**Próximo na Série:** [Percorrendo a Árvore de Arquivos](<#/doc/tutorials/java-io/file-system/walking-tree>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Noções Básicas do Sistema de Arquivos ](<#/doc/tutorials/java-io/file-system>) > Listando o Conteúdo de um Diretório