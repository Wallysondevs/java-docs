# Percorrendo a Árvore de Arquivos

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Fundamentos do Sistema de Arquivos ](<#/doc/tutorials/java-io/file-system>) > Percorrendo a Árvore de Arquivos

**Anterior na Série**

[Listando o Conteúdo de um Diretório](<#/doc/tutorials/java-io/file-system/listing>)

➜

**Tutorial Atual**

Percorrendo a Árvore de Arquivos

➜

**Próximo na Série**

[Monitorando um Diretório para Alterações](<#/doc/tutorials/java-io/file-system/watching-dir-changes>)

**Anterior na Série:** [Listando o Conteúdo de um Diretório](<#/doc/tutorials/java-io/file-system/listing>)

**Próximo na Série:** [Monitorando um Diretório para Alterações](<#/doc/tutorials/java-io/file-system/watching-dir-changes>)

# Percorrendo a Árvore de Arquivos

Você precisa criar uma aplicação que visitará recursivamente todos os arquivos em uma árvore de arquivos? Talvez você precise excluir todos os arquivos `.class` em uma árvore, ou encontrar todos os arquivos que não foram acessados no último ano. Você pode fazer isso com a interface [`FileVisitor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html>).

## A Interface FileVisitor

Para percorrer uma árvore de arquivos, você primeiro precisa implementar um [`FileVisitor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html>). Um [`FileVisitor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html>) especifica o comportamento necessário em pontos chave do processo de travessia: quando um arquivo é visitado, antes de um diretório ser acessado, depois de um diretório ser acessado, ou quando ocorre uma falha. A interface possui quatro métodos que correspondem a essas situações:

  * [`preVisitDirectory()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html#preVisitDirectory\(T,java.nio.file.attribute.BasicFileAttributes\)>) – Invocado antes que as entradas de um diretório sejam visitadas.
  * [`postVisitDirectory()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html#postVisitDirectory\(T,java.io.IOException\)>) – Invocado depois que todas as entradas em um diretório são visitadas. Se quaisquer erros forem encontrados, a exceção específica é passada para o método.
  * [`visitFile()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html#visitFile\(T,java.nio.file.attribute.BasicFileAttributes\)>) – Invocado no arquivo que está sendo visitado. O [`BasicFileAttributes`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/BasicFileAttributes.html>) do arquivo é passado para o método, ou você pode usar o pacote de atributos de arquivo para ler um conjunto específico de atributos. Por exemplo, você pode optar por ler o [`DosFileAttributeView`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/attribute/DosFileAttributeView.html>) do arquivo para determinar se o arquivo tem o bit "hidden" (oculto) definido.
  * [`visitFileFailed()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html#visitFileFailed\(T,java.io.IOException\)>) – Invocado quando o arquivo não pode ser acessado. A exceção específica é passada para o método. Você pode escolher se deseja lançar a exceção, imprimi-la no console ou em um arquivo de log, e assim por diante.

Se você não precisar implementar todos os quatro métodos da interface [`FileVisitor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html>), em vez de implementar a interface [`FileVisitor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html>), você pode estender a classe [`SimpleFileVisitor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/SimpleFileVisitor.html>). Esta classe é um adaptador, que implementa a interface [`FileVisitor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html>), visita todos os arquivos em uma árvore e lança um [`IOError`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOError.html>) quando um erro é encontrado. Você pode estender esta classe e sobrescrever apenas os métodos que você precisa.

Aqui está um exemplo que estende [`SimpleFileVisitor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/SimpleFileVisitor.html>) para imprimir todas as entradas em uma árvore de arquivos. Ele imprime a entrada, seja ela um arquivo regular, um link simbólico, um diretório ou algum outro tipo de arquivo "não especificado". Ele também imprime o tamanho, em bytes, de cada arquivo. Qualquer exceção encontrada é impressa no console.

Os métodos [`FileVisitor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html>) são mostrados no código a seguir:

## Iniciando o Processo

Depois de implementar seu [`FileVisitor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html>), como você inicia a travessia do arquivo? Existem dois métodos `walkFileTree()` na classe Files.

  * [`walkFileTree(Path, FileVisitor)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#walkFileTree\(java.nio.file.Path,java.nio.file.FileVisitor\)>)
  * [`walkFileTree(Path, Set, int, FileVisitor)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#walkFileTree\(java.nio.file.Path,java.util.Set,int,java.nio.file.FileVisitor\)>)

O primeiro método requer apenas um ponto de partida e uma instância do seu [`FileVisitor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html>). Você pode invocar o `PrintFiles` file visitor da seguinte forma:

O segundo método `walkFileTree()` permite que você especifique adicionalmente um limite no número de níveis visitados e um conjunto de enums [`FileVisitOption`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitOption.html>). Se você quiser garantir que este método percorra toda a árvore de arquivos, você pode especificar [`Integer.MAX_VALUE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html#MAX_VALUE>) para o argumento de profundidade máxima.

Você pode especificar o enum [`FileVisitOption`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitOption.html>), [`FOLLOW_LINKS`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitOption.html#FOLLOW_LINKS>), que indica que links simbólicos devem ser seguidos.

Este trecho de código mostra como o método de quatro argumentos pode ser invocado:

## Considerações ao Criar um FileVisitor

Uma árvore de arquivos é percorrida em profundidade primeiro, mas você não pode fazer suposições sobre a ordem de iteração em que os subdiretórios são visitados.

Se o seu programa for alterar o sistema de arquivos, você precisa considerar cuidadosamente como implementa seu [`FileVisitor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html>).

Por exemplo, se você estiver escrevendo uma exclusão recursiva, você primeiro exclui os arquivos em um diretório antes de excluir o próprio diretório. Neste caso, você exclui o diretório em [`postVisitDirectory()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html#postVisitDirectory\(T,java.io.IOException\)>).

Se você estiver escrevendo uma cópia recursiva, você cria o novo diretório em [`preVisitDirectory()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html#preVisitDirectory\(T,java.nio.file.attribute.BasicFileAttributes\)>) antes de tentar copiar os arquivos para ele (em `visitFiles()`). Se você quiser preservar os atributos do diretório de origem (semelhante ao comando UNIX `cp -p`), você precisa fazer isso depois que os arquivos forem copiados, em [`postVisitDirectory()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html#postVisitDirectory\(T,java.io.IOException\)>). O exemplo [`Copy`](<#/doc/tutorials/java-io/file-system/walking-tree>) mostra como fazer isso.

Se você estiver escrevendo uma busca de arquivos, você realiza a comparação no método [`visitFile()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html#visitFile\(T,java.nio.file.attribute.BasicFileAttributes\)>). Este método encontra todos os arquivos que correspondem aos seus critérios, mas não encontra os diretórios. Se você quiser encontrar arquivos e diretórios, você também deve realizar a comparação no método [`preVisitDirectory()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html#preVisitDirectory\(T,java.nio.file.attribute.BasicFileAttributes\)>) ou [`postVisitDirectory()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html#postVisitDirectory\(T,java.io.IOException\)>). O exemplo [`Find`](<#/doc/tutorials/java-io/file-system/walking-tree>) mostra como fazer isso.

Você precisa decidir se deseja que links simbólicos sejam seguidos. Se você estiver excluindo arquivos, por exemplo, seguir links simbólicos pode não ser aconselhável. Se você estiver copiando uma árvore de arquivos, você pode querer permitir isso. Por padrão, `walkFileTree()` não segue links simbólicos.

O método [`visitFile()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html#visitFile\(T,java.nio.file.attribute.BasicFileAttributes\)>) é invocado para arquivos. Se você especificou a opção [`FOLLOW_LINKS`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitOption.html#FOLLOW_LINKS>) e sua árvore de arquivos tem um link circular para um diretório pai, o diretório em loop é reportado no método [`visitFileFailed()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html#visitFileFailed\(T,java.io.IOException\)>) com a [`FileSystemLoopException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileSystemLoopException.html>). O trecho de código a seguir mostra como capturar um link circular e é do exemplo [`Copy`](<#/doc/tutorials/java-io/file-system/walking-tree>):

Este caso pode ocorrer apenas quando o programa está seguindo links simbólicos.

## Controlando o Fluxo

Talvez você queira percorrer a árvore de arquivos procurando por um diretório específico e, quando encontrado, você queira que o processo termine. Talvez você queira pular diretórios específicos.

Os métodos [`FileVisitor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html>) retornam um valor [`FileVisitResult`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitResult.html>). Você pode abortar o processo de travessia de arquivos ou controlar se um diretório é visitado pelos valores que você retorna nos métodos [`FileVisitor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html>):

  * [`CONTINUE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitResult.html#CONTINUE>) – Indica que a travessia de arquivos deve continuar. Se o método [`preVisitDirectory()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html#preVisitDirectory\(T,java.nio.file.attribute.BasicFileAttributes\)>) retornar [`CONTINUE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitResult.html#CONTINUE>), o diretório é visitado.
  * [`TERMINATE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitResult.html#TERMINATE>) – Aborta imediatamente a travessia de arquivos. Nenhum outro método de travessia de arquivos é invocado após este valor ser retornado.
  * [`SKIP_SUBTREE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitResult.html#SKIP_SUBTREE>) – Quando [`preVisitDirectory()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html#preVisitDirectory\(T,java.nio.file.attribute.BasicFileAttributes\)>) retorna este valor, o diretório especificado e seus subdiretórios são ignorados. Este ramo é "podado" da árvore.
  * [`SKIP_SIBLINGS`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitResult.html#SKIP_SIBLINGS>) – Quando [`preVisitDirectory()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html#preVisitDirectory\(T,java.nio.file.attribute.BasicFileAttributes\)>) retorna este valor, o diretório especificado não é visitado, [`postVisitDirectory()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html#postVisitDirectory\(T,java.io.IOException\)>) não é invocado, e nenhum outro irmão não visitado é visitado. Se retornado do método [`postVisitDirectory()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html#postVisitDirectory\(T,java.io.IOException\)>), nenhum outro irmão é visitado. Essencialmente, nada mais acontece no diretório especificado.

Neste trecho de código, qualquer diretório chamado SCCS é ignorado:

Neste trecho de código, assim que um arquivo específico é localizado, o nome do arquivo é impresso na saída padrão, e a travessia de arquivos é encerrada:

## Encontrando Arquivos

Se você já usou um shell script, provavelmente usou a correspondência de padrões (pattern matching) para localizar arquivos. Na verdade, você provavelmente a usou extensivamente. Se você não a usou, a correspondência de padrões usa caracteres especiais para criar um padrão e, em seguida, os nomes dos arquivos podem ser comparados com esse padrão. Por exemplo, na maioria dos shell scripts, o asterisco, `*`, corresponde a qualquer número de caracteres. Por exemplo, o comando a seguir lista todos os arquivos no diretório atual que terminam em `.html`:

O pacote [`java.nio.file`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/package-summary.html>) fornece suporte programático para este recurso útil. Cada implementação de sistema de arquivos fornece um [`PathMatcher`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/PathMatcher.html>). Você pode recuperar o [`PathMatcher`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/PathMatcher.html>) de um sistema de arquivos usando o método [`getPathMatcher(String)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileSystem.html#getPathMatcher\(java.lang.String\)>) na classe [`FileSystem`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileSystem.html>). O trecho de código a seguir obtém o path matcher para o sistema de arquivos padrão:

O argumento de string passado para [`getPathMatcher(String)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileSystem.html#getPathMatcher\(java.lang.String\)>) especifica o tipo de sintaxe e o padrão a ser correspondido. Este exemplo especifica a sintaxe glob. Se você não está familiarizado com a sintaxe glob, consulte a seção [O que é um Glob](<#/doc/tutorials/java-io/file-system/listing>).

A sintaxe glob é fácil de usar e flexível, mas, se preferir, você também pode usar a sintaxe de expressões regulares, ou regex. Para mais informações sobre regex, consulte a seção [Expressões Regulares](<#/doc/tutorials/regex>). Algumas implementações de sistema de arquivos podem suportar outras sintaxes.

Se você quiser usar alguma outra forma de correspondência de padrões baseada em string, você pode criar sua própria classe [`PathMatcher`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/PathMatcher.html>). Os exemplos nesta página usam a sintaxe glob.

Depois de criar sua instância de [`PathMatcher`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/PathMatcher.html>), você está pronto para comparar arquivos com ela. A interface [`PathMatcher`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/PathMatcher.html>) possui um único método, [`matches()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/PathMatcher.html#matches\(java.nio.file.Path\)>), que recebe um argumento [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) e retorna um `boolean`: Ele corresponde ao padrão, ou não. O trecho de código a seguir procura por arquivos que terminam em `.java` ou `.class` e imprime esses arquivos na saída padrão:

### Correspondência de Padrões Recursiva

A busca por arquivos que correspondem a um padrão específico anda de mãos dadas com a travessia de uma árvore de arquivos. Quantas vezes você sabe que um arquivo está em algum lugar no sistema de arquivos, mas não sabe onde? Ou talvez você precise encontrar todos os arquivos em uma árvore de arquivos que tenham uma extensão de arquivo específica.

O exemplo [`Find`](<#/doc/tutorials/java-io/file-system/walking-tree>) faz exatamente isso. [`Find`](<#/doc/tutorials/java-io/file-system/walking-tree>) é semelhante ao utilitário UNIX `find`, mas tem funcionalidade reduzida. Você pode estender este exemplo para incluir outras funcionalidades. Por exemplo, o utilitário `find` suporta a flag `-prune` para excluir uma subárvore inteira da busca. Você poderia implementar essa funcionalidade retornando [`SKIP_SUBTREE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitResult.html#SKIP_SUBTREE>) no método [`preVisitDirectory()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html#preVisitDirectory\(T,java.nio.file.attribute.BasicFileAttributes\)>). Para implementar a opção `-L`, que segue links simbólicos, você poderia usar o método [`walkFileTree(Path, Set, int, FileVisitor)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#walkFileTree\(java.nio.file.Path,java.util.Set,int,java.nio.file.FileVisitor\)>) de quatro argumentos e passar o enum [`FOLLOW_LINKS`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitOption.html#FOLLOW_LINKS>) (mas certifique-se de testar links circulares no método [`visitFile()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileVisitor.html#visitFile\(T,java.nio.file.attribute.BasicFileAttributes\)>)).

Para executar a aplicação [`Find`](<#/doc/tutorials/java-io/file-system/walking-tree>), use o seguinte formato:

O padrão é colocado entre aspas para que quaisquer curingas não sejam interpretados pelo shell. Por exemplo:
## O Exemplo Find

Aqui está o código-fonte para o exemplo [`Find`](<#/doc/tutorials/java-io/file-system/walking-tree>):

## O Exemplo Copy

## O Exemplo Chmod

### Neste tutorial

A Interface FileVisitor
Iniciando o Processo
Considerações ao Criar um FileVisitor
Controlando o Fluxo
Encontrando Arquivos
O Exemplo Find
O Exemplo Copy
O Exemplo Chmod

Última atualização: 4 de janeiro de 2024

**Anterior na Série**

[Listando o Conteúdo de um Diretório](<#/doc/tutorials/java-io/file-system/listing>)

➜

**Tutorial Atual**

Percorrendo a Árvore de Arquivos

➜

**Próximo na Série**

[Monitorando um Diretório por Alterações](<#/doc/tutorials/java-io/file-system/watching-dir-changes>)

**Anterior na Série:** [Listando o Conteúdo de um Diretório](<#/doc/tutorials/java-io/file-system/listing>)

**Próximo na Série:** [Monitorando um Diretório por Alterações](<#/doc/tutorials/java-io/file-system/watching-dir-changes>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Fundamentos do Sistema de Arquivos ](<#/doc/tutorials/java-io/file-system>) > Percorrendo a Árvore de Arquivos