# Juntando Tudo

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > Juntando Tudo

# Juntando Tudo

## Apresentando o Exemplo do Soneto de Shakespeare

Shakespeare escreveu várias peças e 154 sonetos, que você pode encontrar [aqui](<https://www.gutenberg.org/cache/epub/1041/pg1041.txt>) no [site do Gutenberg](<https://www.gutenberg.org/>). Aqui está o primeiro soneto:

Este caso de uso consiste em criar um arquivo para armazená-los todos, de forma compactada. Aqui está o formato do arquivo que você precisa criar.

O Formato do Arquivo de Sonetos

Este formato é composto por vários elementos.

  1. O número total de sonetos. É muito improvável que Shakespeare escreva mais sonetos (ele morreu em 1616), mas você ainda precisa escrever este número aqui.
  2. Para cada soneto, você deseja escrever dois elementos: um offset e um length. O length é o número de bytes que você precisa para armazenar cada soneto. Este número pode variar de um soneto para outro. O offset é o offset do primeiro byte de cada soneto no arquivo.
  3. E então vem o texto de cada soneto, compactado com GZIP.

Este formato de arquivo armazena arquivos de texto de forma compactada e números inteiros. Ele requer vários elementos da API Java I/O que você pode misturar usando o padrão decorator.

## Lendo o Arquivo de Texto dos Sonetos

Existem duas maneiras de ler este arquivo de texto. Você pode simplesmente baixá-lo e armazená-lo localmente em sua máquina. Ou você pode escrever algum código para lê-lo diretamente online. Isso, é claro, exigiria uma conexão com a Internet.

Aqui está o código para lê-lo online. Ele é construído sobre a API HttpClient. Ele produz um [`InputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/InputStream.html>) que você converterá para um [`Reader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Reader.html>) na próxima seção.

Aqui está o código para lê-lo de um arquivo, usando a classe factory [`Files`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html>).

Nenhuma dessas duas partes de código está completa: a parte de tratamento de exceções está faltando, assim como o fechamento dos recursos.

## Analisando o Arquivo de Texto dos Sonetos

Primeiro, você precisa ler e analisar o arquivo de texto fornecido no site do Gutenberg, e ler o texto dos sonetos.

O texto dos sonetos começa na linha 33 do arquivo de texto. O arquivo é então estruturado da seguinte forma:

  1. algumas linhas em branco,
  2. o número do soneto, escrito como um numeral romano,
  3. então mais algumas linhas em branco,
  4. e então o texto do próprio soneto.

Você sabe que chegou ao fim do ebook quando encontra uma linha que começa com o seguinte.

Para resolver este problema, você pode estender a classe [`BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>), mantendo suas funcionalidades e adicionando as suas próprias. Existem três funcionalidades específicas para este problema:

  1. pular as primeiras linhas do arquivo de texto,
  2. pular o cabeçalho do soneto,
  3. e ler o texto do soneto, verificando se você chegou ao fim do arquivo.

Para ler os sonetos, você pode escrever o seguinte código. Duas partes estão faltando: a classe `SonnetReader` e a classe `Sonnet`. A variável `inputStream` vem da leitura do arquivo de texto ou da URL, usando o exemplo de código `HttpClient`.

A classe `SonnetReader` é uma extensão da classe [`BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>) que você pode construir usando qualquer [`Reader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Reader.html>) ou [`InputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/InputStream.html>). Aqui está um exemplo do código que você pode escrever.

Executar este código deve exibir o seguinte em seu console.

O método `skipLines()` é usado para pular o cabeçalho do arquivo que contém algumas informações técnicas e legais sobre o próprio arquivo. Ele chama o método [`readLine()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html#readLine\(\)>) definido na classe [`BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>).

O método `skipSonnetHeader()` lê e descarta o cabeçalho de cada soneto no arquivo. Ele é composto por algumas linhas em branco, o número do soneto (em algarismos romanos) e mais algumas linhas em branco.

O método `readNextSonnet()` lê o texto do soneto. Não há linha em branco neste texto. Se uma linha em branco for encontrada, então o soneto foi lido completamente.

Esta classe cria uma instância da classe `Sonnet`, que é a seguinte.

Esta classe é um wrapper simples em uma `List<String>` com um método `add(String)` simples. Usar este tipo de classe simples torna seu código mais legível e fácil de manter. Lidar com uma instância de uma classe `Sonnet` torna seu código mais claro do que lidar com uma `List<String>`.

Como é uma extensão da classe [`BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>), sua classe `SonnetReader` pode ser usada em uma instrução _try-with-resources_. O fechamento desta classe será tratado por esta instrução, sem que você precise implementar nenhum método `close()`. O método `close()` que será chamado pela instrução _try-with-resources_ é o da classe [`BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>). Você ainda pode implementar seu próprio método `close()` se precisar. Nesse caso, você precisa chamar o método `close()` da classe que você estende, para fechar corretamente os recursos abertos por esta classe.

## Escrevendo um Único Soneto Compactado

Vamos começar escrevendo um único soneto em um arquivo compactado.

Este arquivo compactado é um arquivo binário, compactado com GZIP. Felizmente, a API Java I/O oferece a classe [`GZIPOutputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/zip/GZIPOutputStream.html>) que lida com a compactação para você. Como todos os sonetos compactados serão escritos em um arquivo, vamos começar armazenando este stream compactado em um array de bytes.

Você pode adicionar o seguinte método à classe `Sonnet`.

Este método escreve as linhas de um soneto em um [`ByteArrayOutputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/ByteArrayOutputStream.html>), decorado com um [`GZIPOutputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/zip/GZIPOutputStream.html>), ele próprio decorado com um [`PrintWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintWriter.html>). Este [`PrintWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintWriter.html>) é muito útil para você porque ele fornece o método `println()` que você precisa.

Mesmo que nenhum recurso de I/O seja usado neste método, usar uma instrução _try-with-resources_ ainda é muito útil: ela irá descarregar para você os buffers internos do [`PrintWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/PrintWriter.html>) e do [`GZIPOutputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/zip/GZIPOutputStream.html>), garantindo que todos os bytes sejam escritos no array.

## Escrevendo Todos os Sonetos

Escrever todos os sonetos consiste em concatenar todos os sonetos compactados em um array de bytes e armazenar o offset e o length de cada soneto.

Uma vez que você tenha todas essas informações, a escrita dos bytes pode ser feita com um [`BufferedOutputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedOutputStream.html>) simples, e a escrita dos offsets e lengths pode ser feita com um [`DataOutputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/DataOutputStream.html>). Então, mais uma vez, você precisa brincar com a decoração para produzir este stream.

Você pode escrever o seguinte código para criar o arquivo final.

A primeira parte deste código percorre todos os sonetos e os compacta em um primeiro array de bytes. Em seguida, o offset e o length para este soneto são armazenados nas listas de inteiros correspondentes, e os bytes são adicionados a `encodedSonnets` do tipo [`ByteArrayOutputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/ByteArrayOutputStream.html>).

No final das contas, tudo o que você precisa fazer é seguir o formato do arquivo, ou seja:

  1. escrever o número dos sonetos,
  2. para cada soneto: escrever o offset e o length,
  3. então escrever o array contendo todos os sonetos compactados.

Note que os offsets são calculados a partir do início do array contendo todos os sonetos compactados, não do início do arquivo. Se você preferir tê-los a partir do início do arquivo, basta adicionar `4 + 2*4*numberOfSonnets` a cada offset, o que representa o tamanho do cabeçalho do arquivo.

## Lendo um Único Soneto

Ler de volta um único soneto consiste em localizar o array de bytes compactado correto no arquivo e decodificá-lo. A leitura, na verdade, não é tão complexa quanto a escrita, porque todas as informações de que você precisa podem ser lidas do arquivo.

Vamos começar escrevendo o código para ler o número de sonetos e, para cada soneto, o offset e o length.

Suponha que você precise ler o soneto número 75. O que você precisa fazer é pular os sonetos anteriores a este e ler o número correto de bytes.

Pular um número fixo de elementos de um stream de I/O é um pouco complicado. Você precisa ter em mente que um stream pode ser muito longo, e muito longo para ser mantido na memória. Então, na verdade, quando você chama o método `skip(n)`, o sistema pode não ter pulado a quantidade correta de bytes. O código correto para pular uma quantidade fixa de bytes precisa verificar o número exato de bytes pulados e tentar pular novamente.

O mesmo vale para a leitura de uma quantidade fixa de bytes. É possível que a quantidade de bytes lida pelo input stream seja menor do que o que você pediu. Seu código precisa verificar isso e garantir que todos os bytes foram lidos corretamente.

Com esses dois métodos, você pode adicionar o seguinte código após a leitura dos offsets e dos lengths.

Este código lê os bytes do soneto compactado. Em seguida, ele constrói um [`ByteArrayInputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/ByteArrayInputStream.html>) neste array e o decora com um [`GZIPInputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/zip/GZIPInputStream.html>) para descompactá-lo. O que você precisa ler é uma lista de linhas, então você precisa decorar ainda mais este stream binário com um stream de caracteres: [`InputStreamReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/InputStreamReader.html>). Você poderia ler o texto a partir daí, mas é mais fácil usar um dos métodos da classe [`BufferedReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/BufferedReader.html>), que permite ler este texto linha por linha.

Aqui está o texto deste soneto, que deve ser impresso em seu console.

### Neste tutorial

Apresentando o Exemplo do Soneto de Shakespeare Lendo o Arquivo de Texto dos Sonetos Analisando o Arquivo de Texto dos Sonetos Escrevendo um Único Soneto Compactado Escrevendo Todos os Sonetos Lendo um Único Soneto

Última atualização: 25 de janeiro de 2023

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > Juntando Tudo

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)