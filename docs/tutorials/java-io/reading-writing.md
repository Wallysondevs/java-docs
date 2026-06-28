# Noções Básicas de Operações de Arquivo

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > Noções Básicas de Operações de Arquivo

# Noções Básicas de Operações de Arquivo

Esta parte aborda a escrita e leitura de arquivos. Ela explica a diferença entre arquivos pequenos que você pode carregar na memória e arquivos grandes que você precisa acessar através de buffers. Ela mostra como você pode usar o decorator pattern para adicionar funcionalidades ao acesso básico a arquivos.

1.  [Liberando Recursos e Capturando Exceções](<#/doc/tutorials/java-io/reading-writing/common-operations>)

    O acesso a arquivos ou sistemas de arquivos vem com duas restrições. Primeiro, você precisa liberar adequadamente os recursos do sistema que abriu, e segundo, você precisa gerenciar exceções. Esta seção mostra os padrões que você deve usar para isso.

2.  [Lendo e Escrevendo Arquivos Pequenos](<#/doc/tutorials/java-io/reading-writing/small-files>)

    Esta seção discute os detalhes de leitura, escrita, criação e abertura de arquivos pequenos ou arquivos temporários.

3.  [Lendo e Escrevendo Arquivos de Texto](<#/doc/tutorials/java-io/reading-writing/buffered-text>)

    Esta seção discute os detalhes de leitura e escrita de arquivos de texto usando I/O streams com buffer.

4.  [Lendo e Escrevendo Arquivos Binários](<#/doc/tutorials/java-io/reading-writing/binary-files>)

    Esta seção discute a leitura, escrita, criação e abertura de arquivos usando Stream I/O e Channels.

5.  [Decorando I/O Streams](<#/doc/tutorials/java-io/reading-writing/decorating>)

    Usando decoração para aprimorar as capacidades de IO streams.

6.  [I/O Streams em Memória](<#/doc/tutorials/java-io/reading-writing/in-memory>)

    Configurando streams de caracteres ou binários em estruturas em memória.

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)