# Mudanças Significativas na Versão JDK 15

## Mudanças Significativas na Versão JDK 15

Consulte as [Notas de Lançamento do JDK 15](<https://www.oracle.com/java/technologies/javase/15-relnote-issues.html#NewFeature>) para a lista completa de novos recursos e aprimoramentos no JDK 15.

A seguir estão algumas das atualizações no Java SE 15 e JDK 15:

  * Text Blocks, primeiramente pré-visualizado no Java SE 13, é um recurso permanente nesta versão e pode ser usado sem habilitar recursos de pré-visualização.

Text blocks são literais de string multilinhas que evitam a necessidade da maioria das sequências de escape, formatam automaticamente a string de forma previsível e dão ao desenvolvedor controle sobre o formato quando desejado. Consulte [JEP 378: Text Blocks](<https://openjdk.java.net/jeps/378>) e o [Guia do Programador para Text Blocks](<https://docs.oracle.com/en/java/javase/15/text-blocks/index.html>).

  * O Z Garbage Collector (ZGC) está pronto para uso em produção e não é mais um recurso experimental. Habilite o ZGC usando a opção de linha de comando `-XX:+UseZGC`. Consulte [JEP 377: ZGC: Um Garbage Collector Escalável de Baixa Latência (Produção)](<https://openjdk.java.net/jeps/377>).
  * Hidden classes são classes que não podem ser usadas diretamente pelo bytecode de outras classes. Hidden classes são destinadas ao uso por frameworks que geram classes em tempo de execução e as utilizam indiretamente através de reflection. Consulte [JEP 371: Hidden Classes](<https://openjdk.java.net/jeps/371>).

## Recursos de Pré-visualização e Incubação

Consulte [Java Language Preview Feature](<http://openjdk.java.net/jeps/12>) para mais informações sobre recursos de pré-visualização.

  * Sealed Classes é um recurso de pré-visualização da linguagem Java. Sealed classes e interfaces restringem quais outras classes ou interfaces podem estendê-las ou implementá-las. Consulte [JEP 360: Sealed Classes (Preview)](<https://openjdk.java.net/jeps/360>) e [Sealed Classes](<https://docs.oracle.com/en/java/javase/15/language/sealed-classes-and-interfaces.html>) no guia Java Platform, Standard Edition Java Language Updates.
  * Pattern Matching for `instanceof`, um recurso de pré-visualização do Java SE 14, é novamente pré-visualizado para esta versão. Este recurso permite que a lógica comum em um programa, ou seja, a extração condicional de componentes de objetos, seja expressa de forma mais concisa e segura. Consulte [JEP 375: Pattern Matching for instanceof (Second Preview)](<https://openjdk.java.net/jeps/375>) e [Pattern Matching for the instanceof](<https://docs.oracle.com/en/java/javase/15/language/pattern-matching-instanceof-operator.html>) no guia Java Platform, Standard Edition Java Language Updates.
  * Records, um recurso de pré-visualização do Java SE 14, é novamente pré-visualizado para esta versão. Records são classes que atuam como portadores transparentes para dados imutáveis. Consulte [JEP 384: Records (Second Preview)](<https://openjdk.java.net/jeps/384>) e [Record Classes](<https://docs.oracle.com/en/java/javase/15/language/records.html>) no guia Java Platform, Standard Edition Java Language Updates.
  * A Foreign Memory Access API permite que programas Java acessem de forma eficiente e segura memória externa fora do heap Java. Consulte [JEP 383: Foreign-Memory Access API (Second Incubator)](<https://openjdk.java.net/jeps/383>).

## APIs, Ferramentas e Componentes Removidos

Consulte:

  * [APIs Removidas no Java SE 15](<#/doc/guides/migrate/removed-apis>)
  * [Ferramentas e Componentes Removidos e Descontinuados no JDK 15](<#/doc/guides/migrate/removed-tools-and-components>)

Além disso, há atualizações relacionadas à segurança das quais você precisa estar ciente. Consulte: [Atualizações de Segurança no JDK 15](<#/doc/guides/migrate/security-updates>).