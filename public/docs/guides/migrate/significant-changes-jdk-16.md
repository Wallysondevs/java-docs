# Mudanças Significativas na Versão JDK 16

## Mudanças Significativas na Versão JDK 16

Consulte as [Notas de Lançamento do JDK 16](<https://www.oracle.com/java/technologies/javase/16-relnotes.html#NewFeature>) para descrições adicionais dos novos recursos e aprimoramentos, e a especificação da API no JDK 16.

A seguir estão algumas das atualizações no Java SE 16 e JDK 16:

  * A linguagem de programação Java é aprimorada com o pattern matching para o operador `instanceof`. Este recurso permite que a lógica comum em um programa, ou seja, a extração condicional de componentes de objetos, seja expressa de forma mais concisa e segura. Consulte [JEP 394: Pattern Matching for instanceof](<http://openjdk.java.net/jeps/394>) e [Pattern Matching for instanceof](<https://docs.oracle.com/en/java/javase/16/language/pattern-matching-instanceof-operator.html>) no guia Java Platform, Standard Edition Java Language Updates.
  * Records, primeiramente em pré-visualização no Java SE 14, é um recurso permanente nesta versão. As restrições anteriores foram flexibilizadas, permitindo que as classes internas declarem membros que são explícita ou implicitamente static. Isso inclui membros de classes record, que são implicitamente static. Consulte [JEP 395: Records](<http://openjdk.java.net/jeps/395>) e [Record Classes](<https://docs.oracle.com/en/java/javase/16/language/records.html>) no guia Java Platform, Standard Edition Java Language Updates.
  * Por padrão, todos os elementos internos do JDK são fortemente encapsulados, exceto por APIs internas críticas como `sun.misc.Unsafe`. Você pode escolher o encapsulamento forte relaxado que tem sido o padrão desde o JDK 9. Consulte [JEP 396: Strongly Encapsulate JDK Internals by Default](<http://openjdk.java.net/jeps/396>) e [Strong Encapsulation in the JDK](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>).
  * Canais de socket de domínio UNIX foram integrados ao JDK 16. Consulte [JEP 380: Unix-Domain Socket Channels](<http://openjdk.java.net/jeps/380>) e [Internet Protocol and UNIX Domain Sockets NIO Example](<https://docs.oracle.com/en/java/javase/16/core/internet-protocol-and-unix-domain-sockets-nio-example.html>) no Java Platform, Standard Edition Core Libraries.
  * O Z Garbage Collector processa as pilhas de threads concorrentemente. Isso permite que todas as raízes na JVM sejam processadas pelo ZGC em uma fase concorrente. Consulte [JEP 376: ZGC: Concurrent Thread-Stack Processing](<https://openjdk.java.net/jeps/376>) e [The Z Garbage Collector](<https://docs.oracle.com/en/java/javase/16/gctuning/z-garbage-collector.html>) no Java Platform, Standard Edition HotSpot Virtual Machine Garbage Collection Tuning Guide.
  * A ferramenta `jpackage`, que foi incubada no JDK 14, agora é um recurso permanente. A ferramenta empacota uma aplicação Java em um pacote específico da plataforma que inclui as dependências necessárias. Consulte [JEP 392: Packaging Tool](<https://openjdk.java.net/jeps/392>) e [Java Platform, Standard Edition Packaging Tool User's Guide](<https://docs.oracle.com/en/java/javase/16/jpackage/packaging-overview.html>).
  * O metaspace elástico reformula a implementação interna do metaspace e do class-space da VM. A memória de metadados de classe HotSpot não utilizada (ou seja, metaspace) é retornada ao sistema operacional. Isso reduz a pegada do metaspace e simplifica o código do metaspace para reduzir os custos de manutenção. Consulte [JEP 387: Elastic Metaspace](<https://openjdk.java.net/jeps/387>).

Recursos de Pré-visualização e Módulos Incubadores

Consulte [Java Language Preview Feature](<http://openjdk.java.net/jeps/12>) para mais informações sobre recursos de pré-visualização.

  * Sealed classes, um recurso de pré-visualização do JDK 15, é novamente apresentado em pré-visualização nesta versão. Sealed classes e interfaces restringem quais outras classes ou interfaces podem estendê-las ou implementá-las. Houve vários refinamentos nesta versão, incluindo a introdução das sequências de caracteres `sealed`, `non-sealed` e `permits` como palavras-chave contextuais. Consulte [JEP 397: Sealed Classes (Second Preview)](<https://openjdk.java.net/jeps/397>) e [Sealed Classes](<#/>) no guia Java Platform, Standard Edition Java Language Updates.
  * A iteração inicial de um módulo incubador, `jdk.incubator.vector`, é fornecida para expressar computações vetoriais. Ele compila de forma confiável em tempo de execução para instruções de hardware vetoriais ótimas em arquiteturas de CPU suportadas e, assim, alcança desempenho superior em comparação com computações escalares equivalentes. Consulte [JEP 338: Vector API (Incubator)](<https://openjdk.java.net/jeps/338>).
  * A Foreign Linker API é introduzida e oferece acesso a código nativo de forma estaticamente tipada e puramente Java. Esta API, juntamente com a Foreign-Memory Access API (JEP 393), simplificará o processo, de outra forma propenso a erros, de ligação a uma biblioteca nativa. Consulte [JEP 389: Foreign Linker API (Incubator)](<https://openjdk.java.net/jeps/389>).
  * A Foreign-Memory Access API permite que programas Java acessem de forma segura e eficiente memória externa fora do heap Java. Consulte [JEP 393: Foreign-Memory Access API (Third Incubator)](<https://openjdk.java.net/jeps/393>).

APIs, Ferramentas e Componentes Removidos

Consulte:

  * [API Removida no Java SE 16](<#/doc/guides/migrate/removed-apis>)
  * [Ferramentas e Componentes Removidos e Descontinuados no JDK 16](<#/doc/guides/migrate/removed-tools-and-components>)

Além disso, há atualizações relacionadas à segurança das quais você precisa estar ciente. Consulte: [Atualizações de Segurança no JDK 16](<#/doc/guides/migrate/security-updates>).