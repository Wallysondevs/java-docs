# APIs da JVM

## 6 APIs da JVM

As APIs da Java Virtual Machine (JVM) fornecem um conjunto de classes e métodos que permitem interagir e controlar vários aspectos da JVM. Essas APIs oferecem uma maneira de interagir com a JVM em tempo de execução, permitindo monitorar e controlar a execução de aplicações Java.

Tópicos:

Este tópico apresenta algumas das novas e importantes APIs que você precisa conhecer.

  * [JVM Constants API](<#/doc/guides/vm/jvm-apis>)
  * [Class-File API](<#/doc/guides/vm/jvm-apis>)



### JVM Constants API

A JVM Constants API é definida no pacote `java.lang.constant`, que contém os descritores nominais de vários tipos de constantes carregáveis. Esses descritores nominais são úteis para aplicações que manipulam class files e ferramentas de análise de programa em tempo de compilação ou link-time.

Um descritor nominal não é o valor de uma constante carregável, mas uma descrição de seu valor, que pode ser reconstituído dado um contexto de carregamento de classe. Uma constante carregável é uma entrada do constant pool que pode ser empurrada para o operand stack ou pode aparecer na lista de argumentos estáticos de um bootstrap method para a instrução `invokedynamic`. O operand stack é onde as instruções da JVM obtêm sua entrada e armazenam sua saída. Todo class file Java possui um constant pool, que contém vários tipos de constantes, desde literais numéricos conhecidos em tempo de compilação até referências de métodos e campos que devem ser resolvidas em tempo de execução.

O problema de trabalhar com constantes carregáveis não nominais, como objetos `Class`, cujas referências são resolvidas em tempo de execução, é que essas referências dependem da correção e consistência do contexto de carregamento de classe. O carregamento de classe pode ter side effects, como a execução de código que você não deseja que seja executado e o lançamento de exceções relacionadas a acesso e out-of-memory, que você pode evitar com descrições nominais. Além disso, o carregamento de classe pode não ser possível.

Consulte o pacote [`java.lang.constant`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/constant/package-summary.html>).

### Class-File API

A Class-File API é definida no pacote `java.lang.classfile`, que é usado para parsing, geração e transformação de class files Java. A API processa os class files que rastreiam o formato de arquivo `class` definido pelo capítulo "The `class` File Format" na The Java Virtual Machine Specification. Consulte [Java Language and Virtual Machine Specifications](<https://docs.oracle.com/javase/specs/>).

Para informações de background, consulte [JEP 484: Class-File API](<https://openjdk.org/jeps/484>).

A Class-File API é definida por vários princípios-chave, tais como:

  * Ela trata todas as entidades de class file, como fields, methods, attributes e instruções bytecode, como immutable objects. Essa representação imutável garante o compartilhamento confiável quando um class file passa por transformações.
  * Ela usa uma tree structure para representar a natureza hierárquica dos class files.
  * Ela permite navegação orientada pelo usuário para parsing eficiente.
  * Ela enfatiza a laziness no parsing, processando apenas os class files que são exigidos pelo usuário.
  * Ela se transforma como uma propriedade emergente se as APIs de parsing e geração de class file estiverem suficientemente alinhadas. Isso não requer seu próprio modo especial ou uma nova e significativa superfície de API.

A Class-File API incorpora três abstrações principais: elements, builders e transforms. Elements são descrições imutáveis de componentes de class file. Um builder facilita a construção de class files usando métodos de construção específicos. Há um build para cada tipo de elemento composto. Transforms representam funções que modificam elements durante o processo de construção.

A API também introduz novos métodos para parsing de class files usando patterns. Isso permite expressões mais diretas e concisas, aproveitando as pattern-matching capabilities do Java. Os frameworks e tools que usam esta API suportam automaticamente os class files do JDK mais recente.

Consulte o pacote [`java.lang.classfile`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/classfile/package-summary.html>).