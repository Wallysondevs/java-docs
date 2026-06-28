# Compreendendo os Principais Conceitos de I/O em Java

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > Compreendendo os Principais Conceitos de I/O em Java

# Compreendendo os Principais Conceitos de I/O em Java

## Introduzindo a API Java I/O

O I/O em "Java I/O" significa Entrada / Saída. A API Java I/O fornece todas as ferramentas que sua aplicação precisa para acessar informações externas. Para sua aplicação, "externo" significa dois elementos: seus discos, ou mais geralmente, seus sistemas de arquivos (sistemas de arquivos nem sempre modelam discos, por exemplo, eles podem residir na memória), e sua rede. Acontece que você pode acessar um terceiro elemento usando Java I/O e suas extensões: a memória _off-heap_.

Com a API Java I/O, você pode ler e escrever arquivos, bem como obter e enviar dados por uma rede usando diferentes protocolos. As APIs que fornecem acesso a um banco de dados (a Java Database Connectivity API) usam a API Java I/O para acessar bancos de dados via TCP/IP. Existem muitas APIs conhecidas que são construídas sobre a API Java I/O.

## Compreendendo Java I/O, Java NIO e Java NIO2

A API Java I/O foi criada em meados dos anos 90 junto com as primeiras versões do JDK.

Em 2002, com o Java SE 1.4, o Java NIO foi lançado, com novas classes, conceitos e funcionalidades. Originalmente, NIO significaria New Input / Output (Nova Entrada / Saída). Mas o que é novo em um determinado momento deixa de ser tão novo com o passar do tempo. Então, agora as pessoas tendem a entender NIO como Non-blocking Input/Output (Entrada/Saída Não Bloqueante), o que resume as principais funcionalidades trazidas por esta extensão. O lançamento do Java NIO não mudou realmente a forma como sua aplicação pode usar o Java I/O. Você pode sentir a necessidade de reescrever parte do seu código de I/O para aproveitar as melhorias trazidas pelo Java NIO, mas os padrões de Java I/O permanecem os mesmos.

Em 2011, com o Java SE 7, o Java NIO2 foi lançado, com mais classes e conceitos. Ele também trouxe novos padrões para Java I/O. Algumas classes do Java NIO2 foram atualizadas no Java SE 8, trazendo ainda mais padrões para Java I/O.

Este tutorial de Java I/O cobre as três partes da API: Java I/O, Java NIO e Java NIO2.

## Acessando um Arquivo

Existem dois conceitos principais em Java I/O: localizar o recurso que você precisa acessar (pode ser um arquivo ou um recurso de rede), e abrir um stream para este recurso. Nas seções seguintes, você verá como acessar arquivos de um sistema de arquivos e como a API Java I/O é organizada em relação aos streams.

Existem duas maneiras de acessar arquivos na API Java I/O: a primeira usa a classe [`File`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/File.html>) e a segunda usa a interface [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>).

A classe [`File`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/File.html>) foi introduzida no Java SE 1.0: ela representa a maneira legada de acessar arquivos. Você pode ver esta classe como um wrapper sobre uma string de caracteres que representa um caminho no seu sistema de arquivos padrão. O caminho pode ser absoluto ou relativo e pode representar um arquivo regular ou um diretório. Você pode verificar se este arquivo existe, se você pode lê-lo ou modificá-lo. Você também pode agir sobre este arquivo: criá-lo, copiá-lo ou verificar seu conteúdo.

A partir do Java SE 7, a interface [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) foi introduzida, como parte da API Java NIO2. O papel desta interface é corrigir várias desvantagens que a classe [`File`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/File.html>) possui:

  * Muitos métodos da classe [`File`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/File.html>) não lançam exceções quando falham, tornando impossível obter uma mensagem de erro útil. Por exemplo, se você chamar [`file.delete()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/File.html#delete\(\)>) e a exclusão não funcionar, seu programa recebe um valor `false`. Mas você não pode saber se é porque o arquivo não existe, o usuário não tem permissões, ou se houve algum outro problema.
  * O método de renomeação não funciona de forma consistente entre plataformas.
  * Não há suporte real para links simbólicos.
  * Mais suporte para metadados é desejado, como permissões de arquivo, proprietário do arquivo e outros atributos de segurança.
  * Acessar metadados de arquivo é ineficiente.
  * Muitos dos métodos da classe [`File`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/File.html>) não escalam. Solicitar uma listagem de diretório grande em um servidor pode resultar em travamento. Diretórios grandes também podem causar problemas de recursos de memória, resultando em uma negação de serviço.
  * Não é possível escrever código confiável que possa percorrer recursivamente uma árvore de arquivos e responder apropriadamente se houver links simbólicos circulares.

Todos esses problemas são corrigidos pela interface [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>). Portanto, o uso da classe [`File`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/File.html>) não é mais recomendado.

Este tutorial [possui uma seção](<#/doc/tutorials/java-io/file-system/file-path>) sobre como você pode refatorar seu código [`File`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/File.html>) de estilo antigo para usar a interface [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>).

## Compreendendo I/O Streams

Um _I/O Stream_ representa uma fonte de entrada ou um destino de saída. Um stream pode representar muitos tipos diferentes de fontes e destinos, incluindo arquivos em disco, dispositivos, outros programas e arrays de memória.

Streams suportam muitos tipos diferentes de dados, incluindo bytes simples, tipos de dados primitivos, caracteres localizados e objetos. Alguns streams simplesmente transmitem dados; outros manipulam e transformam os dados de maneiras úteis.

Não importa como funcionam internamente, todos os streams apresentam o mesmo modelo simples para os programas que os utilizam: um stream é uma sequência de dados. Um programa usa um input stream para ler dados de uma fonte, um item por vez, e um output stream para escrever dados em um destino, um item por vez.

A fonte de dados e o destino de dados podem ser qualquer coisa que armazene, gere ou consuma dados. Obviamente, isso inclui arquivos em disco, mas uma fonte ou destino também pode ser outro programa, um dispositivo periférico, um socket de rede ou um array.

I/O streams são um conceito diferente dos streams da [Stream API](<#/doc/tutorials/api/streams>) introduzida no Java SE 8. Mesmo que o nome seja o mesmo, o que pode levar à confusão, os conceitos são diferentes.

A API Java I/O define dois tipos de conteúdo para um recurso:

  * conteúdo de caractere, pense em um arquivo de texto, um documento XML ou JSON,
  * e conteúdo de byte, pense em uma imagem ou um vídeo.

Ela também define duas operações sobre este conteúdo: leitura e escrita.

Seguindo isso, a API Java I/O define quatro classes base, que são abstratas, cada uma modelando um tipo de I/O stream e uma operação específica.

| Leitura | Escrita
---|---|---
Streams de caractere | [`Reader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Reader.html>) | [`Writer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Writer.html>)
Streams de bytes | [`InputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/InputStream.html>) | [`OutputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/OutputStream.html>)

Todos os byte streams são descendentes de [`InputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/InputStream.html>) e [`OutputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/OutputStream.html>), e existem muitos deles. Alguns deles são abordados neste tutorial.

Todas as classes de character stream são descendentes de [`Reader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Reader.html>) e [`Writer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Writer.html>).

### Neste tutorial

Introduzindo a API Java I/O
Compreendendo Java I/O, Java NIO e Java NIO2
Acessando um Arquivo
Compreendendo I/O Streams

Última atualização: 25 de janeiro de 2023

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > Compreendendo os Principais Conceitos de I/O em Java

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)