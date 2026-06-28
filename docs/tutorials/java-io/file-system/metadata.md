# Gerenciando Atributos de Arquivo

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Fundamentos do Sistema de Arquivos ](<#/doc/tutorials/java-io/file-system>) > Gerenciando Atributos de Arquivo

**Anterior na Série**

[Links, Symbolic and Otherwise](<#/doc/tutorials/java-io/file-system/links>)

➜

**Tutorial Atual**

Gerenciando Atributos de Arquivo

➜

**Próximo na Série**

[Creating and Reading Directories](<#/doc/tutorials/java-io/file-system/creating-reading-directories>)

**Anterior na Série:** [Links, Symbolic and Otherwise](<#/doc/tutorials/java-io/file-system/links>)

**Próximo na Série:** [Creating and Reading Directories](<#/doc/tutorials/java-io/file-system/creating-reading-directories>)

# Gerenciando Atributos de Arquivo

## Atributos de Arquivo e de Armazenamento de Arquivo

Os metadados de um sistema de arquivos são tipicamente referidos como seus atributos de arquivo. A classe [`Files`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html>) inclui métodos que podem ser usados para obter um único atributo de um arquivo, ou para definir um atributo.

Métodos | Comentários
---|---
[`size(Path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#size\(java.nio.file.Path\)>) | Retorna o tamanho do arquivo especificado em bytes.
[`isDirectory(Path, LinkOption...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#isDirectory\(java.nio.file.Path,java.nio.file.LinkOption...\)>) | Retorna true se o [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) especificado localiza um arquivo que é um diretório.
[`isRegularFile(Path, LinkOption...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#isRegularFile\(java.nio.file.Path,java.nio.file.LinkOption...\)>) | Retorna true se o [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) especificado localiza um arquivo que é um arquivo regular.
[`isSymbolicLink(Path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#isSymbolicLink\(java.nio.file.Path\)>) | Retorna true se o [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) especificado localiza um arquivo que é um link simbólico.
[`isHidden(Path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#isHidden\(java.nio.file.Path\)>) | Retorna true se o [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) especificado localiza um arquivo que é considerado oculto pelo sistema de arquivos.
[`getLastModifiedTime(Path, LinkOption...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#getLastModifiedTime\(java.nio.file.Path,java.nio.file.LinkOption...\)>) [`setLastModifiedTime(Path, FileTime)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#setLastModifiedTime\(java.nio.file.Path,java.nio.file.attribute.FileTime\)>) | Retorna ou define a última hora de modificação do arquivo especificado.
[`getOwner(Path, LinkOption...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#getOwner\(java.nio.file.Path,java.nio.file.LinkOption...\)>) [`setOwner(Path, UserPrincipal)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#setOwner\(java.nio.file.Path,java.nio.file.attribute.UserPrincipal\)>) | Retorna ou define o proprietário do arquivo.
[`getPosixFilePermissions(Path, LinkOption...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#getPosixFilePermissions\(java.nio.file.Path,java.nio.file.LinkOption...\)>) [`setPosixFilePermissions(Path, Set<PosixFilePermission>)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#setPosixFilePermissions\(java.nio.file.Path,java.util.Set\)>) | Retorna ou define as permissões de arquivo POSIX de um arquivo.
[`getAttribute(Path, String, LinkOption...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#getAttribute\(java.nio.file.Path,java.lang.String,java.nio.file.LinkOption...\)>) [`setAttribute(Path, String, Object, LinkOption...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#setAttribute\(java.nio.file.Path,java.lang.String,java.lang.Object,java.nio.file.LinkOption...\)>) | Retorna ou define o valor de um atributo de arquivo.

Se um programa precisa de múltiplos atributos de arquivo aproximadamente ao mesmo tempo, pode ser ineficiente usar métodos que recuperam um único atributo. Acessar repetidamente o sistema de arquivos para recuperar um único atributo pode afetar negativamente o desempenho. Por essa razão, a classe [`Files`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html>) fornece dois métodos `readAttributes()` para buscar os atributos de um arquivo em uma única operação em massa.

Métodos | Comentários
---|---
[`readAttributes(Path, String, LinkOption...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#readAttributes\(java.nio.file.Path,java.lang.String,java.nio.file.LinkOption...\)>) | Lê os atributos de um arquivo como uma operação em massa. O parâmetro [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) identifica os atributos a serem lidos.
[`readAttributes(Path, Class<A>, LinkOption...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#readAttributes\(java.nio.file.Path,java.lang.Class,java.nio.file.LinkOption...\)>) | Lê os atributos de um arquivo como uma operação em massa. O parâmetro [`Class<A>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Class.html>) é o tipo de atributos solicitados e o método retorna um objeto dessa classe.

Antes de mostrar exemplos dos métodos `readAttributes()`, deve-se mencionar que diferentes sistemas de arquivos têm diferentes noções sobre quais atributos devem ser rastreados. Por essa razão, atributos de arquivo relacionados são agrupados em *views*. Uma *view* mapeia para uma implementação específica de sistema de arquivos, como POSIX ou DOS, ou para uma funcionalidade comum, como a propriedade de arquivo.

As *views* suportadas são as seguintes:

  * [`BasicFileAttributeView`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/BasicFileAttributeView.html>) – Fornece uma *view* de um conjunto básico de atributos de arquivo comum a muitos sistemas de arquivos, consistindo em atributos de arquivo obrigatórios e opcionais.
  * [`DosFileAttributeView`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/DosFileAttributeView.html>) – Estende a *view* de atributo básica com os quatro bits padrão suportados em sistemas de arquivos que suportam os atributos DOS.
  * [`PosixFileAttributeView`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/PosixFileAttributeView.html>) – Estende a *view* de atributo básica com atributos suportados em sistemas de arquivos que suportam a família de padrões POSIX, como UNIX. Esses atributos incluem proprietário do arquivo, proprietário do grupo e as nove permissões de acesso relacionadas.
  * [`FileOwnerAttributeView`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/FileOwnerAttributeView.html>) – Suportado por qualquer implementação de sistema de arquivos que suporte o conceito de proprietário de arquivo.
  * [`AclFileAttributeView`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/AclFileAttributeView.html>) – Suporta a leitura ou atualização das Listas de Controle de Acesso (ACL) de um arquivo. O modelo ACL NFSv4 é suportado. Qualquer modelo ACL, como o modelo ACL do Windows, que tenha um mapeamento bem definido para o modelo NFSv4 também pode ser suportado.
  * [`UserDefinedFileAttributeView`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/UserDefinedFileAttributeView.html>) – Permite o suporte a metadados definidos pelo usuário. Esta *view* pode ser mapeada para quaisquer mecanismos de extensão que um sistema suporte. No SO Solaris, por exemplo, você pode usar esta *view* para armazenar o tipo MIME de um arquivo.

Uma implementação específica de sistema de arquivos pode suportar apenas a *view* de atributo de arquivo básica, ou pode suportar várias dessas *views* de atributo de arquivo. Uma implementação de sistema de arquivos pode suportar outras *views* de atributo não incluídas nesta API.

Na maioria dos casos, você não deve precisar lidar diretamente com nenhuma das interfaces [`FileAttributeView`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/FileAttributeView.html>). (Se você precisar trabalhar diretamente com a [`FileAttributeView`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/FileAttributeView.html>), você pode acessá-la através do método [`getFileAttributeView(Path, Class<V>, LinkOption...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#getFileAttributeView\(java.nio.file.Path,java.lang.Class,java.nio.file.LinkOption...\)>).)

Os métodos `readAttributes()` usam *generics* e podem ser usados para ler os atributos de qualquer uma das *views* de atributos de arquivo. Os exemplos no restante desta página usam os métodos `readAttributes()`.

## Atributos Básicos de Arquivo

Como mencionado anteriormente, para ler os atributos básicos de um arquivo, você pode usar um dos métodos `Files.readAttributes()`, que lê todos os atributos básicos em uma única operação em massa. Isso é muito mais eficiente do que acessar o sistema de arquivos separadamente para ler cada atributo individual. O argumento *varargs* atualmente suporta o enum [`LinkOption`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/LinkOption.html>), [`NOFOLLOW_LINKS`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/LinkOption.html#NOFOLLOW_LINKS>). Use esta opção quando você não quiser que links simbólicos sejam seguidos.

> Uma palavra sobre *timestamps*: O conjunto de atributos básicos inclui três *timestamps*: `creationTime`, `lastModifiedTime` e `lastAccessTime`. Qualquer um desses *timestamps* pode não ser suportado em uma implementação específica, caso em que o método acessor correspondente retorna um valor específico da implementação. Quando suportado, o *timestamp* é retornado como um objeto [`FileTime`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/FileTime.html>).

O trecho de código a seguir lê e imprime os atributos básicos de arquivo para um determinado arquivo e usa os métodos da classe [`BasicFileAttributes`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/BasicFileAttributes.html>).

```java
Path file = ...;
BasicFileAttributes attr = Files.readAttributes(file, BasicFileAttributes.class);

System.out.println("creationTime: " + attr.creationTime());
System.out.println("lastAccessTime: " + attr.lastAccessTime());
System.out.println("lastModifiedTime: " + attr.lastModifiedTime());
System.out.println("isDirectory: " + attr.isDirectory());
System.out.println("isOther: " + attr.isOther());
System.out.println("isRegularFile: " + attr.isRegularFile());
System.out.println("isSymbolicLink: " + attr.isSymbolicLink());
System.out.println("size: " + attr.size());
```

Além dos métodos acessores mostrados neste exemplo, existe um método [`fileKey()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/BasicFileAttributes.html#fileKey\(\)>) que retorna um objeto que identifica unicamente o arquivo ou `null` se nenhuma chave de arquivo estiver disponível.

### Definindo Timestamps

O trecho de código a seguir define a última hora de modificação em milissegundos:

```java
long time = System.currentTimeMillis();
FileTime ft = FileTime.fromMillis(time);
Files.setLastModifiedTime(file, ft);
```

## Atributos de Arquivo DOS

Os atributos de arquivo DOS também são suportados em sistemas de arquivos diferentes do DOS, como o Samba. O trecho a seguir usa os métodos da classe [`DosFileAttributes`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/DosFileAttributes.html>).

```java
Path file = ...;
DosFileAttributes attr = Files.readAttributes(file, DosFileAttributes.class);

System.out.println("isArchive: " + attr.isArchive());
System.out.println("isHidden: " + attr.isHidden());
System.out.println("isReadOnly: " + attr.isReadOnly());
System.out.println("isSystem: " + attr.isSystem());
```

No entanto, você pode definir um atributo DOS usando o método [`setAttribute(Path, String, Object, LinkOption...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#setAttribute\(java.nio.file.Path,java.lang.String,java.lang.Object,java.nio.file.LinkOption...\)>), da seguinte forma:

```java
Files.setAttribute(file, "dos:hidden", true);
Files.setAttribute(file, "dos:readonly", true);
```

## Permissões de Arquivo POSIX

`_POSIX_` é um acrônimo para *Portable Operating System Interface for UNIX* e é um conjunto de padrões IEEE e ISO projetados para garantir a interoperabilidade entre diferentes *flavors* de UNIX. Se um programa está em conformidade com esses padrões POSIX, ele deve ser facilmente portado para outros sistemas operacionais compatíveis com POSIX.

Além do proprietário do arquivo e do proprietário do grupo, POSIX suporta nove permissões de arquivo: permissões de _leitura_, _escrita_ e _execução_ para o proprietário do arquivo, membros do mesmo grupo e "todos os outros".

O trecho de código a seguir lê os atributos de arquivo POSIX para um determinado arquivo e os imprime na saída padrão. O código usa os métodos da classe [`PosixFileAttributes`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/PosixFileAttributes.html>).

```java
Path file = ...;
PosixFileAttributes attr = Files.readAttributes(file, PosixFileAttributes.class);

System.out.println("Owner: " + attr.owner().getName());
System.out.println("Group: " + attr.group().getName());
System.out.println("Permissions: " + PosixFilePermissions.toString(attr.permissions()));
```

A classe auxiliar [`PosixFilePermissions`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/PosixFilePermissions.html>) fornece vários métodos úteis, como segue:

  * O método [`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/PosixFilePermissions.html#toString\(java.util.Set\)>), usado no trecho de código anterior, converte as permissões de arquivo para uma *string* (por exemplo, `rw-r--r--`).
  * O método [`fromString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/PosixFilePermissions.html#fromString\(java.lang.String\)>) aceita uma *string* que representa as permissões de arquivo e constrói um [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) de permissões de arquivo.
  * O método [`asFileAttribute()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/PosixFilePermissions.html#asFileAttribute\(java.util.Set\)>) aceita um [`Set`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Set.html>) de permissões de arquivo e constrói um atributo de arquivo que pode ser passado para o método [`Files.createFile()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#createFile\(java.nio.file.Path,java.nio.file.attribute.FileAttribute...\)>) ou [`Files.createDirectory()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#createDirectory\(java.nio.file.Path,java.nio.file.attribute.FileAttribute...\)>).

O trecho de código a seguir lê os atributos de um arquivo e cria um novo arquivo, atribuindo os atributos do arquivo original ao novo arquivo:

```java
Path file = ...;
PosixFileAttributes attr = Files.readAttributes(file, PosixFileAttributes.class);
FileAttribute<Set<PosixFilePermission>> fileAttributes = PosixFilePermissions.asFileAttribute(attr.permissions());
Files.createFile(file, fileAttributes);
```

O método [`asFileAttribute()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/PosixFilePermissions.html#asFileAttribute\(java.util.Set\)>) envolve as permissões como um [`FileAttribute`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/FileAttribute.html>). O código então tenta criar um novo arquivo com essas permissões. Observe que o _umask_ também se aplica, então o novo arquivo pode ser mais seguro do que as permissões solicitadas.

Para definir as permissões de um arquivo para valores representados como uma *string* codificada, você pode usar o seguinte código:

```java
Set<PosixFilePermission> perms = PosixFilePermissions.fromString("rw-r--r--");
FileAttribute<Set<PosixFilePermission>> fileAttributes = PosixFilePermissions.asFileAttribute(perms);
Files.createFile(file, fileAttributes);
```

## Definindo um Proprietário de Arquivo ou Grupo

Para traduzir um nome em um objeto que você pode armazenar como proprietário de arquivo ou proprietário de grupo, você pode usar o serviço [`UserPrincipalLookupService`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/UserPrincipalLookupService.html>). Este serviço pesquisa um nome ou nome de grupo como uma *string* e retorna um objeto [`UserPrincipal`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/UserPrincipal.html>) representando essa *string*. Você pode obter o serviço de pesquisa de *user principal* para o sistema de arquivos padrão usando o método [`FileSystem.getUserPrincipalLookupService()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileSystem.html#getUserPrincipalLookupService\(\)>).

O trecho de código a seguir mostra como definir o proprietário do arquivo usando o método [`setOwner()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#setOwner\(java.nio.file.Path,java.nio.file.attribute.UserPrincipal\)>):

```java
Path file = ...;
UserPrincipalLookupService lookupService = FileSystems.getDefault().getUserPrincipalLookupService();
UserPrincipal owner = lookupService.lookupPrincipalByName("sally");
Files.setOwner(file, owner);
```

Não há um método de propósito específico na classe [`Files`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html>) para definir um proprietário de grupo. No entanto, uma maneira segura de fazer isso diretamente é através da *view* de atributo de arquivo POSIX, como segue:

```java
Path file = ...;
GroupPrincipal group = lookupService.lookupPrincipalByGroupName("green");
Files.getFileAttributeView(file, PosixFileAttributeView.class).setGroup(group);
```

## Atributos de Arquivo Definidos pelo Usuário

Se os atributos de arquivo suportados pela sua implementação de sistema de arquivos não forem suficientes para suas necessidades, você pode usar a `UserDefinedAttributeView` para criar e rastrear seus próprios atributos de arquivo.

Algumas implementações mapeiam este conceito para recursos como *NTFS Alternative Data Streams* e atributos estendidos em sistemas de arquivos como ext3 e ZFS. A maioria das implementações impõe restrições ao tamanho do valor, por exemplo, ext3 limita o tamanho a 4 kilobytes.

O tipo MIME de um arquivo pode ser armazenado como um atributo definido pelo usuário usando este trecho de código. Este recurso é dependente do sistema: alguns sistemas de arquivos podem não suportá-lo.

```java
UserDefinedFileAttributeView view = Files.getFileAttributeView(file, UserDefinedFileAttributeView.class);
view.write("user.mimetype", Charset.defaultCharset().encode("text/html"));
```

Para ler o atributo de tipo MIME, você usaria este trecho de código:

```java
UserDefinedFileAttributeView view = Files.getFileAttributeView(file, UserDefinedFileAttributeView.class);
String name = "user.mimetype";
ByteBuffer buf = ByteBuffer.allocate(view.size(name));
view.read(name, buf);
buf.flip();
String value = Charset.defaultCharset().decode(buf).toString();
```

Nota: No Linux, você pode ter que habilitar atributos estendidos para que os atributos definidos pelo usuário funcionem. Se você receber uma [`UnsupportedOperationException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/UnsupportedOperationException.html>) ao tentar acessar a *view* de atributo definida pelo usuário, você precisa remontar o sistema de arquivos. O comando a seguir remonta a partição raiz com atributos estendidos para o sistema de arquivos ext3. Se este comando não funcionar para a sua versão do Linux, consulte a documentação.

```bash
mount -o remount,user_xattr /
```

Se você quiser tornar a alteração permanente, adicione uma entrada a `/etc/fstab`.

## Atributos de Armazenamento de Arquivo

Você pode usar a classe [`FileStore`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileStore.html>) para obter informações sobre um armazenamento de arquivo, como quanto espaço está disponível. O método [`getFileStore(Path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#getFileStore\(java.nio.file.Path\)>) busca o armazenamento de arquivo para o arquivo especificado.

O trecho de código a seguir imprime o uso de espaço para o armazenamento de arquivo onde um arquivo específico reside. Esses métodos retornam um número de bytes.

```java
Path file = ...;
FileStore store = Files.getFileStore(file);
long total = store.getTotalSpace() / 1024;
long used = (store.getTotalSpace() - store.getUnallocatedSpace()) / 1024;
long avail = store.getUsableSpace() / 1024;

System.out.println("Total: " + total);
System.out.println("Used: " + used);
System.out.println("Available: " + avail);
```
## Determinando o MIME Type

Para determinar o MIME type de um arquivo, você pode achar o método [`probeContentType(Path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#probeContentType\(java.nio.file.Path\)>) útil. Por exemplo:

Observe que este método retorna null se o content type não puder ser determinado.

A implementação deste método é altamente específica da plataforma e não é infalível. O content type é determinado pelo detector de tipo de arquivo padrão da plataforma. Por exemplo, se o detector determinar que o content type de um arquivo é `application/x-java` com base na extensão `.class`, ele pode ser enganado.

Você pode fornecer um [`FileTypeDetector`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/spi/FileTypeDetector.html>) personalizado se o padrão não for suficiente para suas necessidades.

### Neste tutorial

*   Atributos de Arquivo e Armazenamento de Arquivos
*   Atributos Básicos de Arquivo
*   Atributos de Arquivo DOS
*   Permissões de Arquivo POSIX
*   Definindo um Proprietário de Arquivo ou Grupo
*   Atributos de Arquivo Definidos pelo Usuário
*   Atributos de Armazenamento de Arquivos
*   Determinando o MIME Type

Última atualização: 25 de janeiro de 2023

**Anterior na Série**

[Links, Simbólicos e Outros](<#/doc/tutorials/java-io/file-system/links>)

➜

**Tutorial Atual**

Gerenciando Atributos de Arquivo

➜

**Próximo na Série**

[Criando e Lendo Diretórios](<#/doc/tutorials/java-io/file-system/creating-reading-directories>)

**Anterior na Série:** [Links, Simbólicos e Outros](<#/doc/tutorials/java-io/file-system/links>)

**Próximo na Série:** [Criando e Lendo Diretórios](<#/doc/tutorials/java-io/file-system/creating-reading-directories>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Fundamentos do Sistema de Arquivos ](<#/doc/tutorials/java-io/file-system>) > Gerenciando Atributos de Arquivo