# Streams de E/S em Memória

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Noções Básicas de Operações de Arquivo ](<#/doc/tutorials/java-io/reading-writing>) > Streams de E/S em Memória

**Anterior na Série**

[Decorando Streams de E/S](<#/doc/tutorials/java-io/reading-writing/decorating>)

➜

**Tutorial Atual**

Streams de E/S em Memória

➜

Este é o fim da série!

**Anterior na Série:** [Decorando Streams de E/S](<#/doc/tutorials/java-io/reading-writing/decorating>)

# Streams de E/S em Memória

## Introduzindo Streams de E/S em Estruturas em Memória

A API JAVA I/O também oferece classes para acessar o conteúdo de estruturas em memória, ou seja, arrays de caracteres ou bytes, e strings de caracteres. Existem vários casos de uso onde este recurso é muito útil.

Certos formatos de arquivo (este é o caso para o formato de arquivo JPEG) exigem um campo especial no início do arquivo, que fornece o comprimento de certas porções ou campos do arquivo. Há casos em que não é possível calcular essas porções antecipadamente. Pense em dados compactados: calcular o tamanho de um conjunto de 100 inteiros é fácil, mas calculá-lo depois de ter sido gzipped é muito mais difícil. Com a classe certa, você pode criar este stream gzipped em um array de bytes e simplesmente obter o número de bytes escritos. Este exemplo é abordado no final desta seção.

## Lendo e Escrevendo Arrays de Caracteres

As classes [`CharArrayReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/CharArrayReader.html>) e [`CharArrayWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/CharArrayWriter.html>) ambas envolvem um array de `char`, especificado na construção dessas classes. Ambas são extensões de [`Reader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Reader.html>) e [`Writer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Writer.html>) (respectivamente), e não adicionam nenhum método a essas classes.

## Lendo e Escrevendo Strings de Caracteres

A classe [`StringReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/StringReader.html>) também é uma extensão da classe abstrata [`Reader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Reader.html>). Ela é construída sobre uma [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>), passada como argumento para seu construtor. Ela não adiciona nenhum método à classe [`Reader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Reader.html>).

A [`StringWriter`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/StringWriter.html>) é um pouco diferente. Ela envolve um [`StringBuffer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuffer.html>) interno e pode anexar caracteres a ele. Você pode então obter este [`StringBuffer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuffer.html>) chamando um dos dois métodos a seguir.

1.  [`getBuffer()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/StringWriter.html#getBuffer\(\)>): retorna o [`StringBuffer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuffer.html>) interno. Nenhuma cópia defensiva é feita aqui.
2.  [`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/StringWriter.html#toString\(\)>): retorna uma string de caracteres construída chamando o método [`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuffer.html#toString\(\)>) do [`StringBuffer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/StringBuffer.html>) interno.

## Lendo e Escrevendo Arrays de Bytes

Duas classes estão disponíveis para ler e escrever bytes em arrays: [`ByteArrayInputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/ByteArrayInputStream.html>) e [`ByteArrayOutputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/ByteArrayOutputStream.html>).

A primeira permite ler o conteúdo de um array de bytes como um [`InputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/InputStream.html>), fornecido como argumento para o construtor desta classe.

A segunda permite escrever bytes em um array de bytes. Você pode definir o tamanho inicial deste array, e ele crescerá automaticamente se ficar cheio. Uma vez que os bytes foram escritos, você pode obter o conteúdo deste array de diferentes maneiras.

1.  [`size()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/ByteArrayOutputStream.html#size\(\)>) fornece o número de bytes contidos neste array.
2.  [`toString()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/ByteArrayOutputStream.html#toString\(\)>) retorna o conteúdo do array como uma string de caracteres. Este método precisa de uma implementação concreta de [`Charset`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/charset/Charset.html>) para decodificar corretamente esses bytes, então você precisa fornecer o nome do [`Charset`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/charset/Charset.html>) que ele deve usar.
3.  [`toByteArray()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/ByteArrayOutputStream.html#toByteArray\(\)>) retorna uma cópia do array interno deste [`ByteArrayOutputStream`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/ByteArrayOutputStream.html>).

### Neste tutorial

Introduzindo Streams de E/S em Estruturas em Memória Lendo e Escrevendo Arrays de Caracteres Lendo e Escrevendo Strings de Caracteres Lendo e Escrevendo Arrays de Bytes

Última atualização: 25 de janeiro de 2023

**Anterior na Série**

[Decorando Streams de E/S](<#/doc/tutorials/java-io/reading-writing/decorating>)

➜

**Tutorial Atual**

Streams de E/S em Memória

➜

Este é o fim da série!

**Anterior na Série:** [Decorando Streams de E/S](<#/doc/tutorials/java-io/reading-writing/decorating>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Noções Básicas de Operações de Arquivo ](<#/doc/tutorials/java-io/reading-writing>) > Streams de E/S em Memória