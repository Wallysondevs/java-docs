# Mudanças Significativas na Versão JDK 14

## Mudanças Significativas na Versão JDK 14

A seguir estão algumas das mudanças no Java SE 14 e JDK 14:

  * Switch é estendido para que possa ser usado como uma instrução ou uma expressão, de modo que ambas as formas possam usar rótulos tradicionais `case ... :` (com fall through) ou novos rótulos `case ... ->` (sem fall through), com uma nova instrução adicional para produzir um valor a partir de uma expressão switch. Consulte [JEP 361: Switch Expressions (Standard)](<https://openjdk.java.net/jeps/361>) e [Java Language Changes](<#/>).
  * O G1 é aprimorado para melhorar o desempenho da alocação em sistemas de memória de acesso não uniforme (NUMA). Consulte [JEP 345: NUMA-Aware Memory Allocation for G1](<http://openjdk.java.net/jeps/345>).
  * Os dados do JDK Flight Recorder agora estão disponíveis como um stream de dados, permitindo monitoramento contínuo. Consulte [JEP 349: JFR Event Streaming](<https://openjdk.java.net/jeps/349>).
  * Novos modos de mapeamento de arquivo específicos do JDK foram adicionados para que a API `FileChannel` possa ser usada para criar instâncias de `MappedByteBuffer` que se referem à memória não volátil (NVM). Consulte [JEP 352: Non-Volatile Mapped Byte Buffers](<https://openjdk.java.net/jeps/352>).
  * Permite que moedas sejam formatadas com formatos contábeis específicos de locale, por exemplo, ($3.27) em vez de -$3.27. Consulte [Accounting Currency Format Support](<https://bugs.openjdk.java.net/browse/JDK-8229146>).
  * Aprimorado `com.sun.management.OperatingSystemMXBean` para garantir que ele reporte valores com base no ambiente operacional atual, como um ambiente de container. O MXBean para ferramentas obterem informações sobre o sistema operacional foi melhorado para ambientes de container. Consulte [OperatingSystemMXBean made container aware](<https://bugs.openjdk.java.net/browse/JDK-8226575>).

Recursos Experimentais, de Preview e Incubadores

  * `Records` é um [recurso de preview da linguagem Java](<http://openjdk.java.net/jeps/12>), que fornece uma sintaxe compacta para declarar classes que são detentores transparentes para dados imutáveis superficialmente. Consulte [JEP 359: Records (Preview)](<http://openjdk.java.net/jeps/359>).
  * Pattern Matching para `instanceof` é um [recurso de preview da linguagem Java](<http://openjdk.java.net/jeps/12>) que simplifica o idioma `instanceof-and-cast`. Consulte [JEP 305: Pattern Matching for instanceof (Preview)](<https://openjdk.java.net/jeps/305>).
  * Text blocks são literais de string multi-linha que evitam a necessidade da maioria das sequências de escape, formatam automaticamente a string de forma previsível e dão ao desenvolvedor controle sobre o formato quando desejado. [Text Blocks foram introduzidos no JDK 13](<http://openjdk.java.net/jeps/355>) como um [Recurso de Preview](<http://openjdk.java.net/jeps/12>). Text Blocks está sendo novamente disponibilizado em preview no JDK 14 com a adição de duas novas sequências de escape. Consulte [JEP 368: Text Blocks (Second Preview)](<https://openjdk.java.net/jeps/368>).
  * `jpackage`, uma ferramenta simples para empacotar aplicações Java autocontidas. Consulte [JEP 343: Packaging Tool (Incubator)](<https://openjdk.java.net/jeps/343>).
  * É introduzida uma API que permite que programas Java acessem eficientemente memória externa fora do heap Java. Consulte [JEP 370: Foreign-Memory Access API (Incubator)](<https://openjdk.java.net/jeps/370>).
  * O Z Garbage Collector (ZGC), anteriormente disponível apenas para Linux, é introduzido como um [recurso experimental](<http://openjdk.java.net/jeps/12>) no Windows e macOS. Consulte [JEP 364: ZGC on macOS](<http://openjdk.java.net/jeps/364>) e [JEP 365: ZGC on Windows](<http://openjdk.java.net/jeps/365>).

APIs, Ferramentas e Componentes Removidos

Consulte:

  * [APIs Removidas no Java SE 14](<#/doc/guides/migrate/removed-apis>)
  * [Recursos e Componentes Removidos no JDK 14](<#/doc/guides/migrate/removed-tools-and-components>)

Além disso, há atualizações relacionadas à segurança das quais você precisa estar ciente. Consulte: [Atualizações de Segurança no JDK 14](<#/doc/guides/migrate/security-updates>).