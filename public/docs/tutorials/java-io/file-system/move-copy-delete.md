# Manipulando Arquivos e Diretórios

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Fundamentos do Sistema de Arquivos ](<#/doc/tutorials/java-io/file-system>) > Manipulando Arquivos e Diretórios

**Anterior na Série**

[Acessando o Sistema de Arquivos](<#/doc/tutorials/java-io/file-system/file-system>)

➜

**Tutorial Atual**

Manipulando Arquivos e Diretórios

➜

**Próximo na Série**

[Links, Simbólicos e Outros](<#/doc/tutorials/java-io/file-system/links>)

**Anterior na Série:** [Acessando o Sistema de Arquivos](<#/doc/tutorials/java-io/file-system/file-system>)

**Próximo na Série:** [Links, Simbólicos e Outros](<#/doc/tutorials/java-io/file-system/links>)

# Manipulando Arquivos e Diretórios

## Verificando um Arquivo ou Diretório

Você tem uma instância de [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) representando um arquivo ou diretório, mas esse arquivo existe no sistema de arquivos? É legível? Gravável? Executável?

### Verificando a Existência de um Arquivo ou Diretório

Os métodos na classe [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) são sintáticos, o que significa que eles operam na instância de [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>). Mas, eventualmente, você deve acessar o sistema de arquivos para verificar se um [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) específico existe ou não existe. Você pode fazer isso com os métodos [`exists(Path, LinkOption...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#exists\(java.nio.file.Path,java.nio.file.LinkOption...\)>) e [`notExists(Path, LinkOption...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#notExists\(java.nio.file.Path,java.nio.file.LinkOption...\)>). Note que [`!Files.exists(path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#exists\(java.nio.file.Path,java.nio.file.LinkOption...\)>) não é equivalente a [`Files.notExists(path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#notExists\(java.nio.file.Path,java.nio.file.LinkOption...\)>). Ao testar a existência de um arquivo, três resultados são possíveis:

  * O arquivo é verificado como existente.
  * O arquivo é verificado como não existente.
  * O status do arquivo é desconhecido. Este resultado pode ocorrer quando o programa não tem acesso ao arquivo.

Se ambos [`exists()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#exists\(java.nio.file.Path,java.nio.file.LinkOption...\)>) e [`notExists()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#notExists\(java.nio.file.Path,java.nio.file.LinkOption...\)>) retornarem `false`, a existência do arquivo não pode ser verificada.

### Verificando a Acessibilidade do Arquivo

Para verificar se o programa pode acessar um arquivo conforme necessário, você pode usar os métodos [`isReadable(Path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#isReadable\(java.nio.file.Path\)>), [`isWritable(Path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#isWritable\(java.nio.file.Path\)>) e [`isExecutable(Path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#isExecutable\(java.nio.file.Path\)>).

O trecho de código a seguir verifica se um arquivo específico existe e se o programa tem a capacidade de executar o arquivo.

> Nota: Uma vez que qualquer um desses métodos seja concluído, não há garantia de que o arquivo possa ser acessado. Uma falha de segurança comum em muitas aplicações é realizar uma verificação e depois acessar o arquivo. Para mais informações, use seu mecanismo de busca favorito para pesquisar TOCTTOU (pronuncia-se TOCK-tu).

### Verificando se Dois Paths Localizam o Mesmo Arquivo

Quando você tem um sistema de arquivos que usa links simbólicos, é possível ter dois paths diferentes que localizam o mesmo arquivo. O método [`isSameFile(Path, Path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#isSameFile\(java.nio.file.Path,java.nio.file.Path\)>) compara dois paths para determinar se eles localizam o mesmo arquivo no sistema de arquivos. Por exemplo:

## Excluindo um Arquivo ou Diretório

Você pode excluir arquivos, diretórios ou links. Com links simbólicos, o link é excluído e não o destino do link. Com diretórios, o diretório deve estar vazio, ou a exclusão falha.

A classe [`Files`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html>) fornece dois métodos de exclusão.

O método [`delete(Path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#delete\(java.nio.file.Path\)>) exclui o arquivo ou lança uma exceção se a exclusão falhar. Por exemplo, se o arquivo não existir, uma [NoSuchFileException](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/NoSuchFileException.html>) é lançada. Você pode capturar a exceção para determinar por que a exclusão falhou, da seguinte forma:

O método [`deleteIfExists(Path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#deleteIfExists\(java.nio.file.Path\)>) também exclui o arquivo, mas se o arquivo não existir, nenhuma exceção é lançada. Falhar silenciosamente é útil quando você tem várias threads excluindo arquivos e não quer lançar uma exceção apenas porque uma thread o fez primeiro.

## Copiando um Arquivo ou Diretório

Você pode copiar um arquivo ou diretório usando o método [`copy(Path, Path, CopyOption...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#copy\(java.nio.file.Path,java.nio.file.Path,java.nio.file.CopyOption...\)>). A cópia falha se o arquivo de destino existir, a menos que a opção [`REPLACE_EXISTING`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardCopyOption.html#REPLACE_EXISTING>) seja especificada.

Diretórios podem ser copiados. No entanto, os arquivos dentro do diretório não são copiados, então o novo diretório fica vazio mesmo quando o diretório original contém arquivos.

Ao copiar um link simbólico, o destino do link é copiado. Se você quiser copiar o próprio link, e não o conteúdo do link, especifique a opção [`NOFOLLOW_LINKS`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/LinkOption.html#NOFOLLOW_LINKS>) ou [`REPLACE_EXISTING`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardCopyOption.html#REPLACE_EXISTING>).

Este método aceita um argumento varargs. Os seguintes enums [`StandardCopyOption`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardCopyOption.html>) e [`LinkOption`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/LinkOption.html>) são suportados:

  * [`REPLACE_EXISTING`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardCopyOption.html#REPLACE_EXISTING>) – Realiza a cópia mesmo quando o arquivo de destino já existe. Se o destino for um link simbólico, o próprio link é copiado (e não o destino do link). Se o destino for um diretório não vazio, a cópia falha com a exceção [`DirectoryNotEmptyException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/DirectoryNotEmptyException.html>).
  * [`COPY_ATTRIBUTES`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardCopyOption.html#COPY_ATTRIBUTES>) – Copia os atributos de arquivo associados ao arquivo para o arquivo de destino. Os atributos de arquivo exatos suportados dependem do sistema de arquivos e da plataforma, mas o tempo da última modificação é suportado em todas as plataformas e é copiado para o arquivo de destino.
  * [`NOFOLLOW_LINKS`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/LinkOption.html#NOFOLLOW_LINKS>) – Indica que links simbólicos não devem ser seguidos. Se o arquivo a ser copiado for um link simbólico, o link é copiado (e não o destino do link).

Se você não está familiarizado com enums, consulte a seção [Tipos Enum](<#/doc/tutorials/classes-objects/enums>).

O exemplo a seguir mostra como usar o método `copy`:

Além da cópia de arquivos, a classe [`Files`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html>) também define métodos que podem ser usados para copiar entre um arquivo e um stream. O método [`copy(InputStream, Path, CopyOptions...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#copy\(java.nio.file.Path,java.io.OutputStream\)>) pode ser usado para copiar todos os bytes de um input stream para um arquivo. O método [`copy(Path, OutputStream)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#copy\(java.nio.file.Path,java.io.OutputStream\)>) pode ser usado para copiar todos os bytes de um arquivo para um output stream.

## Movendo um Arquivo ou Diretório

Você pode mover um arquivo ou diretório usando o método [`move(Path, Path, CopyOption...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#move\(java.nio.file.Path,java.nio.file.Path,java.nio.file.CopyOption...\)>). A movimentação falha se o arquivo de destino existir, a menos que a opção [`REPLACE_EXISTING`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardCopyOption.html#REPLACE_EXISTING>) seja especificada.

### Usando Varargs

Vários métodos da classe `Files` aceitam um número arbitrário de argumentos quando flags são especificadas. Por exemplo, na assinatura do método a seguir, a notação de reticências após o argumento [`CopyOption`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/CopyOption.html>) indica que o método aceita um número variável de argumentos, ou _varargs_, como são tipicamente chamados:

Quando um método aceita um argumento varargs, você pode passar uma lista de valores separados por vírgulas ou um array (`CopyOption[]`) de valores.

No exemplo a seguir, o método pode ser invocado da seguinte forma:

### Movendo Diretórios

Diretórios vazios podem ser movidos. Se o diretório não estiver vazio, a movimentação é permitida quando o diretório pode ser movido sem mover o conteúdo desse diretório. Em sistemas UNIX, mover um diretório dentro da mesma partição geralmente consiste em renomear o diretório. Nessa situação, este método funciona mesmo quando o diretório contém arquivos.

Este método aceita um argumento varargs – os seguintes enums [`StandardCopyOption`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardCopyOption.html>) são suportados:

  * [`REPLACE_EXISTING`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardCopyOption.html#REPLACE_EXISTING>) – Realiza a movimentação mesmo quando o arquivo de destino já existe. Se o destino for um link simbólico, o link simbólico é substituído, mas o que ele aponta não é afetado.
  * [`ATOMIC_MOVE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardCopyOption.html#ATOMIC_MOVE>) – Realiza a movimentação como uma operação de arquivo atômica. Se o sistema de arquivos não suportar uma movimentação atômica, uma exceção é lançada. Com um [`ATOMIC_MOVE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardCopyOption.html#ATOMIC_MOVE>), você pode mover um arquivo para um diretório e ter a garantia de que qualquer processo que esteja observando o diretório acessa um arquivo completo.

O exemplo a seguir mostra como usar o método `move`:

Embora você possa implementar o método [`move()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#move\(java.nio.file.Path,java.nio.file.Path,java.nio.file.CopyOption...\)>) em um único diretório, como mostrado, o método é mais frequentemente usado com o mecanismo de recursão de árvore de arquivos. Para mais informações, consulte a seção [Percorrendo a Árvore de Arquivos](<#/doc/tutorials/java-io/file-system/walking-tree>).

## Operações Atômicas

Vários métodos da classe [`Files`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html>), como [`move()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#move\(java.nio.file.Path,java.nio.file.Path,java.nio.file.CopyOption...\)>), podem realizar certas operações atomicamente em alguns sistemas de arquivos.

Uma operação de arquivo atômica é uma operação que não pode ser interrompida ou realizada "parcialmente". Ou a operação inteira é realizada ou a operação falha. Isso é importante quando você tem múltiplos processos operando na mesma área do sistema de arquivos, e você precisa garantir que cada processo acesse um arquivo completo.

## Consciência de Links

A classe [`Files`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html>) é "consciente de links". Cada método da classe [`Files`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html>) detecta o que fazer quando um link simbólico é encontrado, ou fornece uma opção que permite configurar o comportamento quando um link simbólico é encontrado. Para mais informações sobre como você pode lidar com links em um sistema de arquivos, você pode verificar a seção [Links, Simbólicos e Outros](<#/doc/tutorials/java-io/file-system/links>).

### Neste tutorial

Verificando um Arquivo ou Diretório Excluindo um Arquivo ou Diretório Copiando um Arquivo ou Diretório Movendo um Arquivo ou Diretório Operações Atômicas Consciência de Links

Última atualização: 25 de janeiro de 2023

**Anterior na Série**

[Acessando o Sistema de Arquivos](<#/doc/tutorials/java-io/file-system/file-system>)

➜

**Tutorial Atual**

Manipulando Arquivos e Diretórios

➜

**Próximo na Série**

[Links, Simbólicos e Outros](<#/doc/tutorials/java-io/file-system/links>)

**Anterior na Série:** [Acessando o Sistema de Arquivos](<#/doc/tutorials/java-io/file-system/file-system>)

**Próximo na Série:** [Links, Simbólicos e Outros](<#/doc/tutorials/java-io/file-system/links>)

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Fundamentos do Sistema de Arquivos ](<#/doc/tutorials/java-io/file-system>) > Manipulando Arquivos e Diretórios