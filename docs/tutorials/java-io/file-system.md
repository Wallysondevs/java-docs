# Noções Básicas do Sistema de Arquivos

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > Noções Básicas do Sistema de Arquivos

# Noções Básicas do Sistema de Arquivos

Esta parte do tutorial cobre todas as interações com o sistema de arquivos. Inclui manipulação de arquivos com a classe [`File`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/File.html>) e a interface [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>), e criação de diretórios. Mostra como acessar metadados de arquivos, dependendo do sistema de arquivos com o qual você está trabalhando. Apresenta os padrões para explorar o conteúdo de uma árvore de diretórios usando um padrão visitor, e como monitorar um diretório para eventos de criação e exclusão de arquivos.

1.  [Acessando Recursos usando Paths](<#/doc/tutorials/java-io/file-system/file-path>)

    Como acessar recursos usando a interface Path, e como refatorar seu código File de estilo antigo para usar Path.

2.  [Trabalhando com Paths](<#/doc/tutorials/java-io/file-system/path>)

    A interface Path inclui vários métodos que podem ser usados para obter informações sobre o path, acessar elementos do path, converter o path para outras formas ou extrair porções de um path. Existem também métodos para corresponder à string do path e métodos para remover redundâncias em um path. Esta seção aborda esses métodos Path, às vezes chamados de operações sintáticas, porque eles operam no próprio path e não acessam o sistema de arquivos.

3.  [Acessando o Sistema de Arquivos](<#/doc/tutorials/java-io/file-system/file-system>)

    Como acessar sistemas de arquivos e armazenamentos de arquivos.

4.  [Manipulando Arquivos e Diretórios](<#/doc/tutorials/java-io/file-system/move-copy-delete>)

    Esta seção mostra como verificar a existência e diferentes elementos de arquivos e diretórios, e como copiar, mover e excluir arquivos e diretórios.

5.  [Links, Simbólicos e Outros](<#/doc/tutorials/java-io/file-system/links>)

    Como criar links simbólicos (soft links) e links físicos (hard links), como detectar um link simbólico e como encontrar o destino de um link.

6.  [Gerenciando Atributos de Arquivos](<#/doc/tutorials/java-io/file-system/metadata>)

    A definição de metadados é: dados sobre outros dados. Em um sistema de arquivos, os dados estão contidos em seus arquivos e diretórios, e os metadados rastreiam informações sobre cada um desses objetos: É um arquivo regular, um diretório ou um link? Qual é o seu tamanho, data de criação, data da última modificação, proprietário do arquivo, proprietário do grupo e permissões de acesso?

7.  [Criando e Lendo Diretórios](<#/doc/tutorials/java-io/file-system/creating-reading-directories>)

    Como ler, criar e excluir diretórios em um sistema de arquivos. Esta seção cobre a funcionalidade específica para diretórios.

8.  [Listando o Conteúdo de um Diretório](<#/doc/tutorials/java-io/file-system/listing>)

    Como listar e filtrar eficientemente o conteúdo de um diretório em um sistema de arquivos.

9.  [Percorrendo a Árvore de Arquivos](<#/doc/tutorials/java-io/file-system/walking-tree>)

    Como percorrer uma árvore de arquivos, visitando cada arquivo e diretório recursivamente com um visitor de arquivos.

10. [Monitorando um Diretório para Alterações](<#/doc/tutorials/java-io/file-system/watching-dir-changes>)

    Como escrever um programa para detectar o que está acontecendo em um diretório no sistema de arquivos.

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)