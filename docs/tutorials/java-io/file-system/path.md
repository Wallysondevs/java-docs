[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de I/O do Java ](<#/doc/tutorials/java-io>) > [ Fundamentos do Sistema de Arquivos ](<#/doc/tutorials/java-io/file-system>) > Trabalhando com Paths

**Anterior na Série**

[Acessando Recursos usando Paths](<#/doc/tutorials/java-io/file-system/file-path>)

➜

**Tutorial Atual**

Trabalhando com Paths

➜

**Próximo na Série**

[Acessando o Sistema de Arquivos](<#/doc/tutorials/java-io/file-system/file-system>)

**Anterior na Série:** [Acessando Recursos usando Paths](<#/doc/tutorials/java-io/file-system/file-path>)

**Próximo na Série:** [Acessando o Sistema de Arquivos](<#/doc/tutorials/java-io/file-system/file-system>)

# Trabalhando com Paths

## Criando um Path

### Usando a Classe de Fábrica Paths

Uma instância de [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) contém as informações usadas para especificar a localização de um arquivo ou diretório. No momento em que é definido, um [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) é fornecido com uma série de um ou mais nomes. Um elemento raiz ou um nome de arquivo pode ser incluído, mas nenhum dos dois é obrigatório. Um [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) pode consistir em apenas um único nome de diretório ou arquivo.

Você pode facilmente criar um objeto [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) usando um dos seguintes métodos get da classe auxiliar [`Paths`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Paths.html>) (observe o plural):

```java
Path p1 = Paths.get("/tmp/foo");
Path p2 = Paths.get(args[0]);
Path p3 = Paths.get(URI_string);
```

O método [`Paths.get(String)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Paths.html#get\(java.lang.String,java.lang.String...\)>) é uma abreviação para o seguinte código:

```java
Path p4 = FileSystems.getDefault().getPath("/tmp/foo");
```

O exemplo a seguir cria `/u/joe/logs/foo.log` assumindo que seu diretório home é `/u/joe`, ou `C:\joe\logs\foo.log` se você estiver no Windows.

```java
Path p5 = Paths.get("/u/joe", "logs", "foo.log");
```

### Usando os métodos de Fábrica Path.of()

Dois métodos de fábrica foram adicionados à interface [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) no Java SE 9.

O primeiro método recebe uma string de caracteres, denotando a string do path ou a parte inicial da string do path. Ele pode receber outras strings de caracteres como um vararg que são unidas para formar a string do path.

O segundo método recebe um [`URI`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/net/URI.html>), que é convertido para este path.

O código a seguir usa o primeiro método de fábrica para criar um path.

```java
Path p1 = Path.of("/tmp/foo");
Path p2 = Path.of(args[0]);
Path p3 = Path.of(URI_string);
Path p4 = Path.of("/u/joe", "logs", "foo.log");
```

## Recuperando Informações sobre um Path

Você pode pensar no [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) como armazenando esses elementos de nome como uma sequência. O elemento mais alto na estrutura de diretórios estaria localizado no índice `0`. O elemento mais baixo na estrutura de diretórios estaria localizado no índice `[n-1]`, onde `n` é o número de elementos de nome no [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>). Métodos estão disponíveis para recuperar elementos individuais ou uma subsequência do [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) usando esses índices.

Os exemplos nesta seção usam a seguinte estrutura de diretórios.

Estrutura de Diretórios de Exemplo

```
/home/joe/foo
```

O trecho de código a seguir define uma instância de [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) e então invoca vários métodos para obter informações sobre o path:

```java
Path p = Paths.get("/home/joe/foo");

System.out.format("toString: %s%n", p.toString());
System.out.format("getFileName: %s%n", p.getFileName());
System.out.format("getName(0): %s%n", p.getName(0));
System.out.format("getNameCount: %s%n", p.getNameCount());
System.out.format("subpath(0,2): %s%n", p.subpath(0,2));
System.out.format("getParent: %s%n", p.getParent());
System.out.format("getRoot: %s%n", p.getRoot());
```

Aqui está a saída para Windows e para o SO Solaris:

Método invocado | Retorna no SO Solaris | Retorna no Microsoft Windows | Comentários
---|---|---|---
[`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#toString\(\)>) | `/home/joe/foo` | `C:\home\joe\foo` | Retorna a representação em string do [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>). Se o path foi criado usando [`Filesystems.getDefault().getPath(String)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileSystem.html#getPath\(java.lang.String,java.lang.String...\)>) ou [`Paths.get()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Paths.html#get\(java.lang.String,java.lang.String...\)>) ou [`Path.of()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#of\(java.lang.String,java.lang.String...\)>) (este último é um método de conveniência para getPath), o método realiza uma pequena limpeza sintática. Por exemplo, em um sistema operacional UNIX, ele corrigirá a string de entrada `//home/joe/foo` para `/home/joe/foo`.
[`getFileName()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#getFileName\(\)>) | `foo` | `foo` | Retorna o nome do arquivo ou o último elemento da sequência de elementos de nome.
[`getName(0)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#getName\(int\)>) | `home` | `home` | `home`
[`getNameCount()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#getNameCount\(\)>) | `3` | `3` | Retorna o número de elementos no path.
[`subpath(0, 2)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#subpath\(int,int\)>) | `home/joe` | `home\joe` | Retorna a subsequência do Path (não incluindo um elemento raiz) conforme especificado pelos índices inicial e final.
[`getParent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#getParent\(\)>) | `/home/joe` | `\home\joe` | Retorna o path do diretório pai.
[`getRoot()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#getRoot\(\)>) | `/` | `C:\` | Retorna a raiz do path.

O exemplo anterior mostra a saída para um path absoluto. No exemplo a seguir, um path relativo é especificado:

```java
Path p = Paths.get("sally/bar");

System.out.format("toString: %s%n", p.toString());
System.out.format("getFileName: %s%n", p.getFileName());
System.out.format("getName(0): %s%n", p.getName(0));
System.out.format("getNameCount: %s%n", p.getNameCount());
System.out.format("subpath(0,1): %s%n", p.subpath(0,1));
System.out.format("getParent: %s%n", p.getParent());
System.out.format("getRoot: %s%n", p.getRoot());
```

Aqui está a saída para Windows e para o SO Solaris:

Método invocado | Retorna no SO Solaris | Retorna no Microsoft Windows
---|---|---
[`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#toString\(\)>) | `sally/bar` | `sally\bar`
[`getFileName()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#getFileName\(\)>) | `bar` | `bar`
[`getName(0)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#getName\(int\)>) | `sally` | `sally`
[`getNameCount()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#getNameCount\(\)>) | `2` | `2`
[`subpath(0, 1)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#subpath\(int,int\)>) | `sally` | `sally`
[`getParent()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#getParent\(\)>) | `sally` | `sally`
[`getRoot()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#getRoot\(\)>) | `null` | `null`

## Removendo Redundâncias de um Path

Muitos sistemas de arquivos usam a notação "." para indicar o diretório atual e ".." para indicar o diretório pai. Você pode ter uma situação em que um [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) contém informações de diretório redundantes. Talvez um servidor esteja configurado para salvar seus arquivos de log no diretório `/dir/logs/.`, e você queira excluir a notação "`/.`" final do path.

Os exemplos a seguir incluem redundâncias:

```java
/home/./joe/foo
/home/sally/../joe/foo
```

O método [`normalize()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#normalize\(\)>) remove quaisquer elementos redundantes, o que inclui quaisquer ocorrências de "." ou "directory/..". Ambos os exemplos anteriores normalizam para `/home/joe/foo`.

É importante notar que normalize não verifica o sistema de arquivos ao limpar um path. É uma operação puramente sintática. No segundo exemplo, se `sally` fosse um link simbólico, remover `sally/..` poderia resultar em um [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) que não localiza mais o arquivo pretendido.

Para limpar um path garantindo que o resultado localize o arquivo correto, você pode usar o método [`toRealPath()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#toRealPath\(java.nio.file.LinkOption...\)>). Este método é descrito na próxima seção.

## Convertendo um Path

Você pode usar três métodos para converter o [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>). Se você precisar converter o path para uma string que possa ser aberta em um navegador, você pode usar [`toUri()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#toUri\(\)>). Por exemplo:

```java
Path p1 = Paths.get("/home/joe/foo");
System.out.format("%s%n", p1.toUri());
```

A execução deste código produz o seguinte resultado:

```
file:///home/joe/foo
```

O método [`toAbsolutePath()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#toAbsolutePath\(\)>) converte um path para um path absoluto. Se o path fornecido já for absoluto, ele retorna o mesmo objeto [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>). O método [`toAbsolutePath()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#toAbsolutePath\(\)>) pode ser muito útil ao processar nomes de arquivos inseridos pelo usuário. Por exemplo:

```java
Path p1 = Paths.get("sally/bar");
System.out.format("%s%n", p1.toAbsolutePath());
```

O método [`toAbsolutePath()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#toAbsolutePath\(\)>) converte a entrada do usuário e retorna um [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) que retorna um path absoluto para este path. O arquivo não precisa existir para que este método funcione.

O método [`toRealPath()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#toRealPath\(java.nio.file.LinkOption...\)>) retorna o path real de um arquivo existente. Por padrão, links simbólicos são resolvidos para seu destino final. Este método realiza várias operações em uma:

  * Se [`LinkOption.NOFOLLOW_LINKS`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/LinkOption.html#NOFOLLOW_LINKS>) for passado para este método, os links simbólicos não são seguidos.
  * Se o path for relativo, ele retorna um path absoluto.
  * Se o path contiver quaisquer elementos redundantes, ele retorna um path com esses elementos removidos.

Este método lança uma exceção se o arquivo não existir ou não puder ser acessado. Você pode capturar a exceção quando quiser lidar com qualquer um desses casos. Por exemplo:

```java
try {
    Path p1 = Paths.get("sally/bar");
    System.out.format("%s%n", p1.toRealPath());
} catch (IOException x) {
    System.err.println(x);
}
```

## Unindo Dois Paths

Você pode combinar paths usando o método [`resolve()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#resolve\(java.lang.String\)>). Você passa um path parcial, que é um path que não inclui um elemento raiz, e esse path parcial é anexado ao path original.

Por exemplo, considere o seguinte trecho de código:

```java
Path p1 = Paths.get("/home/joe/foo");
System.out.format("%s%n", p1.resolve("bar"));
```

ou

```java
Path p2 = Paths.get("joe/foo");
System.out.format("%s%n", p2.resolve("bar"));
```

Passar um path absoluto para o método [`resolve()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#resolve\(java.lang.String\)>) retorna o path passado:

```java
Path p3 = Paths.get("joe/foo");
System.out.format("%s%n", p3.resolve("/home/joe/bar"));
```

## Criando um Path Entre Dois Paths

Um requisito comum ao escrever código de I/O de arquivo é a capacidade de construir um path de um local no sistema de arquivos para outro local. Você pode conseguir isso usando o método [`relativize()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#relativize\(java.nio.file.Path\)>). Este método constrói um path que se origina do path original e termina no local especificado pelo path fornecido. O novo path é relativo ao path original.

Por exemplo, considere dois paths relativos definidos como `joe` e `sally`:

```java
Path p1 = Paths.get("joe");
Path p2 = Paths.get("sally");
```

Na ausência de qualquer outra informação, assume-se que `joe` e `sally` são irmãos, ou seja, nós que residem no mesmo nível na estrutura em árvore. Para navegar de `joe` para `sally`, você esperaria primeiro navegar um nível acima para o nó pai e depois para `sally`:

```java
Path p1_to_p2 = p1.relativize(p2);
// Result is ../sally
Path p2_to_p1 = p2.relativize(p1);
// Result is ../joe
```

Considere um exemplo um pouco mais complicado:

```java
Path p1 = Paths.get("home");
Path p3 = Paths.get("home/sally/bar");
```

Neste exemplo, os dois paths compartilham o mesmo nó, home. Para navegar de `home` para `bar`, você primeiro navega um nível para baixo até `sally` e depois mais um nível para baixo até `bar`. Navegar de `bar` para `home` requer subir dois níveis.

```java
Path p1_to_p3 = p1.relativize(p3);
// Result is sally/bar
Path p3_to_p1 = p3.relativize(p1);
// Result is ../..
```

Um path relativo não pode ser construído se apenas um dos paths incluir um elemento raiz. Se ambos os paths incluírem um elemento raiz, a capacidade de construir um path relativo é dependente do sistema.

O exemplo recursivo `Copy` usa os métodos [`relativize()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#relativize\(java.nio.file.Path\)>) e resolve.

## Comparando Dois Paths

### Um Path é Igual a Outro Path?

A interface [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) suporta [`equals()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#equals\(java.lang.Object\)>), permitindo que você teste dois paths quanto à igualdade. Observe que esta comparação é dependente do sistema de arquivos. Você pode considerar usar [`Files.isSameFile()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#isSameFile\(java.nio.file.Path,java.nio.file.Path\)>) para verificar se dois paths localizam o mesmo arquivo.

### Um Path Começa com Outro Path?

Existem duas sobrecargas do método `Path.startsWith()`. A primeira recebe um argumento [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>): [`startsWith(String)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#startsWith\(java.lang.String\)>) e a segunda recebe um [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>): [`startsWith(Path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#startsWith\(java.nio.file.Path\)>). O método que recebe uma [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) converte a [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) para um [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) e então chama o outro método.

Um path começa com outro path se o componente raiz deste path começar com o componente raiz do path fornecido, e este path começar com os mesmos elementos de nome que o path fornecido. Se o path fornecido tiver mais elementos de nome do que este path, então `false` é retornado.

### Um Path Termina com Outro Path?

Existem também duas sobrecargas do método `Path.endsWith()`. A primeira recebe um argumento [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>): [`endsWith(String)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#endsWith\(java.lang.String\)>) e a segunda recebe um [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>). O método que recebe uma [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) converte a [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) para um [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) e então chama o outro método.

Se este path não tiver um componente raiz e o path fornecido tiver um componente raiz, então este path não termina com o path fornecido.

Se o path fornecido não tiver um componente raiz, e _N_ elementos, e este path tiver _N_ ou mais elementos, então este path termina com o path fornecido se os últimos _N_ elementos de cada path, começando pelo elemento mais distante da raiz, forem iguais.

Se ambos os paths tiverem um componente raiz, então este path termina com o path fornecido se o componente raiz deste path terminar com o componente raiz do path fornecido, e os elementos correspondentes de ambos os paths forem iguais. Se o componente raiz deste path termina ou não com o componente raiz do path fornecido é específico do sistema de arquivos.

A interface [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) estende a interface [`Iterable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Iterable.html>). O método [`iterator()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Iterable.html#iterator\(\)>) retorna um objeto que permite iterar sobre os elementos de nome no path. O primeiro elemento retornado é o mais próximo da raiz na árvore de diretórios. O trecho de código a seguir itera sobre um path, imprimindo cada elemento de nome:

```java
Path p = Paths.get("/home/joe/foo");
for (Path name: p) {
    System.out.println(name);
}
```

A interface [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) também estende a interface [`Comparable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html>). Você pode comparar objetos [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) usando [`compareTo()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html#compareTo\(T\)>), o que é útil para ordenação.

Você também pode colocar objetos [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) em uma [`Collection`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collection.html>). Consulte o [tutorial de Collections](<#/doc/tutorials/api/collections-framework>) para mais informações sobre este recurso poderoso.

Quando você quiser verificar se dois objetos [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) localizam o mesmo arquivo, você pode usar o método [`isSameFile()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#isSameFile\(java.nio.file.Path,java.nio.file.Path\)>) da classe [`Files`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html>), conforme descrito na seção [Verificando se Dois Paths Localizam o Mesmo Arquivo](<#/doc/tutorials/java-io/file-system/move-copy-delete>).

### Neste tutorial

Criando um Path
Recuperando Informações sobre um Path
Removendo Redundâncias de um Path
Convertendo um Path
Unindo Dois Paths
Criando um Path Entre Dois Paths
Comparando Dois Paths

Última atualização: 25 de janeiro de 2023

**Anterior na Série**

[Acessando Recursos usando Paths](<#/doc/tutorials/java-io/file-system/file-path>)

➜

**Tutorial Atual**

Trabalhando com Paths

➜

**Próximo na Série**

[Acessando o Sistema de Arquivos](<#/doc/tutorials/java-io/file-system/file-system>)

**Anterior na Série:** [Acessando Recursos usando Paths](<#/doc/tutorials/java-io/file-system/file-path>)

**Próximo na Série:** [Acessando o Sistema de Arquivos](<#/doc/tutorials/java-io/file-system/file-system>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de I/O do Java ](<#/doc/tutorials/java-io>) > [ Fundamentos do Sistema de Arquivos ](<#/doc/tutorials/java-io/file-system>) > Trabalhando com Paths