# Mudanças Significativas na Versão JDK 13

## Mudanças Significativas na Versão JDK 13

A seguir estão algumas das melhorias importantes no Java SE 13 e JDK 13:

  * Dynamic CDS Archiving estende o compartilhamento de dados de classe de aplicação (ApsCDS), que permite o arquivamento dinâmico de classes quando a aplicação Java é encerrada. Veja [JEP 350: Dynamic CDS Archives](<http://openjdk.java.net/jeps/350>).
  * Text blocks foram adicionados à linguagem Java, que fornecem aos desenvolvedores controle sobre o formato quando desejado. Esta é uma funcionalidade de linguagem de pré-visualização. Veja [JEP 355 Text Blocks (Preview)](<http://openjdk.java.net/jeps/355>) e [JEP 12: Preview Language and VM Features](<http://openjdk.java.net/jeps/12>).
  * A expressão `switch`, uma funcionalidade de linguagem de pré-visualização, foi estendida para ser usada tanto como uma instrução quanto como uma expressão, de modo que ambas as formas podem usar rótulos tradicionais (com fall through) ou novos rótulos (sem fall through). Ela é usada com uma nova instrução adicional para produzir um valor a partir de uma expressão `switch`. Veja [JEP 354: Switch Expressions (Preview)](<https://openjdk.java.net/jeps/354>) e [JEP 12: Preview Language and VM Features](<http://openjdk.java.net/jeps/12>).
  * A implementação usada pelas APIs `java.net.Socket` e `java.net.ServerSocket` foi substituída por uma implementação mais simples e moderna, fácil de manter e depurar. Veja [JEP 353: Reimplement the Legacy Socket API](<https://openjdk.java.net/jeps/353>).
  * Suporte para Unicode 12.1. Veja [Unicode 12.1](<https://www.oracle.com/java/technologies/javase/13-relnote-issues.html#JDK-8221431>).
  * O ZGC foi aprimorado para retornar a memória heap não utilizada ao sistema operacional, o que melhora o consumo de memória das aplicações. Veja [JEP 351 ZGC Uncommit Unused Memory](<http://openjdk.java.net/jeps/351>).