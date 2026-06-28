# Mudanças Significativas na Versão JDK 24

## Mudanças Significativas na Versão JDK 24

Consulte as [Notas de Lançamento do JDK 24](<https://www.oracle.com/java/technologies/javase/24-relnote-issues.html#NewFeature>) para descrições adicionais dos novos recursos e aprimoramentos, e a especificação da API no JDK 24.

A seguir estão algumas das atualizações no Java SE 24 e JDK 24:

Recursos de Pré-visualização da Linguagem

  * O Pattern Matching é aprimorado ao permitir tipos primitivos em todos os contextos de padrão. O operador `instanceof` e as expressões e declarações `switch` são estendidos para funcionar com todos os tipos primitivos.

Primeiramente pré-visualizado no Java SE 23, este recurso é novamente pré-visualizado para esta versão. Ele permanece inalterado entre o Java SE 23 e esta versão.

Consulte [JEP 488: Primitive Types in Patterns, instanceof, and switch (Second Preview)](<https://openjdk.org/jeps/488>) e as seguintes seções em Java Platform, Standard Edition Java Language Updates:

    * [Cláusulas When](<#/>)
    * [Padrões de Tipo com Tipos Primitivos](<#/>)
    * [Tipos Primitivos em Padrões Record](<#/>)
    * [Valores Primitivos em Expressões e Declarações switch](<#/>)
    * [Conversão segura com instanceof e switch](<#/>)
  * As Module Import Declarations permitem importar sucintamente todos os pacotes exportados por um módulo. Isso simplifica a reutilização de bibliotecas modulares sem exigir que o código importador esteja em um módulo.

Primeiramente pré-visualizado no Java SE 23, este recurso é novamente pré-visualizado para esta versão. Nesta versão:
    * As declarações Type-import-on-demand sombreiam as declarações module import.
    * Módulos podem declarar uma dependência transitiva no módulo `java.base`.
    * O módulo `java.se` requer transitivamente o módulo `java.base`. Consequentemente, importar o módulo `java.se` importa toda a API Java SE.

Consulte [JEP 494: Module Import Declarations (Second Preview)](<https://openjdk.org/jeps/494>) e [Module Import Declarations](<#/>) em Java Platform, Standard Edition Java Language Updates.

  * Os Flexible Constructor Bodies permitem que declarações em um construtor apareçam antes de uma invocação explícita de construtor, como `super(..)` ou `this(..)`. Essas declarações não podem referenciar a instância em construção, mas podem inicializar seus campos. Inicializar campos antes de invocar outro construtor torna uma classe mais confiável quando os métodos são sobrescritos.

Primeiramente pré-visualizado no Java SE 22 como JEP 447: Statements before super(...) (Preview) e novamente pré-visualizado no Java SE 23 como JEP 482: Flexible Constructor Bodies (Second Preview). Este recurso é novamente pré-visualizado para esta versão sem quaisquer mudanças significativas.

Consulte [JEP 492: Flexible Constructor Bodies (Third Preview)](<https://openjdk.org/jeps/492>) e [Flexible Constructor Bodies](<#/>) em Java Platform, Standard Edition Java Language Updates.

  * Os Simple Source Files e Instance Main Methods permitem que iniciantes escrevam seus primeiros programas sem a necessidade de entender recursos da linguagem projetados para programas grandes. Longe de usar um dialeto separado da linguagem, os iniciantes podem escrever declarações simplificadas para programas de classe única e, em seguida, expandir seus programas de forma contínua para usar recursos mais avançados à medida que suas habilidades crescem. Desenvolvedores experientes também podem desfrutar de escrever pequenos programas de forma sucinta, sem a necessidade de construções destinadas à programação em larga escala.

Primeiramente pré-visualizado no Java SE 21 como JEP 445: Unnamed Classes and Instance Main Methods (Preview) e novamente pré-visualizado no Java SE 23. Este recurso é novamente pré-visualizado para esta versão com nova terminologia e um título revisado, mas inalterado de outra forma.

Consulte [JEP 495: Simple Source Files and Instance Main Methods (Fourth Preview)](<https://openjdk.org/jeps/495>) e [Simple Source Files and Instance Main Methods](<#/>) em Java Platform, Standard Edition Java Language Updates.

Consulte [JEP 12: Preview Features](<https://openjdk.org/jeps/12>) e [Preview Language and VM Features](<#/>) em Java Platform, Standard Edition Java Language Updates.

Melhorias de Desempenho e Tempo de Execução

  * O tamanho dos cabeçalhos de objeto na HotSpot JVM é reduzido de 96 e 128 bits para 64 bits em arquiteturas de 64 bits. Isso reduzirá o tamanho da heap, melhorará a densidade de implantação e aumentará a localidade dos dados. Este é um recurso experimental e pode ser ativado passando as opções de linha de comando:
```
+UnlockExperimentalVMOptions -XX:+UseCompactObjectHeaders
```

Consulte [JEP 450: Compact Object Headers (Experimental)](<https://openjdk.org/jeps/450>).

  * A implementação das barreiras do garbage collector G1 foi simplificada, as quais registram informações sobre acessos à memória da aplicação, ao deslocar sua expansão do início do pipeline de compilação do C2 JIT para mais tarde.

Consulte [JEP 475: Late Barrier Expansion for G1](<https://openjdk.org/jeps/475>).

  * O Ahead-of-Time Class Loading and Linking melhora o tempo de inicialização ao tornar as classes de uma aplicação instantaneamente disponíveis, em um estado carregado e vinculado, quando a HotSpot Java Virtual Machine é iniciada. Isso é alcançado monitorando a aplicação durante uma execução e armazenando as formas carregadas e vinculadas de todas as classes em um cache para execuções subsequentes.

Consulte [JEP 483: Ahead-of-Time Class Loading & Linking](<https://openjdk.org/jeps/483>)

  * O garbage collector ZGC executa no modo geracional por padrão. O modo não geracional do ZGC é removido.

Consulte [JEP 490: ZGC: Remove the Non-Generational Mode](<https://openjdk.org/jeps/474>) e a seção [The Z Garbage Collector](<#/>) em Java Platform, Standard Edition HotSpot Virtual Machine Garbage Collection Tuning Guide.

  * O Synchronize Virtual Threads without Pinning melhora a escalabilidade do código Java que usa métodos e declarações `synchronized`, fazendo com que threads virtuais que bloqueiam em tais construções liberem suas threads de plataforma subjacentes para uso por outras threads virtuais.

Consulte [JEP 491: Synchronize Virtual Threads without Pinning](<https://openjdk.org/jeps/491>).

Melhorias de Biblioteca, Pré-visualizações e Incubadora

  * A Class-File API é uma API padrão para analisar, gerar e transformar arquivos de classe Java.

Consulte [JEP 484: Class-File API](<https://openjdk.org/jeps/484>) e [Class-File API](<#/>) em Java Platform, Standard Edition Java Virtual Machine Guide.

  * Os Stream Gatherers permitem criar operações intermediárias personalizadas, que possibilitam que pipelines de stream transformem dados de maneiras que não são facilmente alcançáveis com as operações intermediárias embutidas existentes.

Consulte [JEP 485: Stream Gatherers](<https://openjdk.org/jeps/485>) e [Stream Gatherers](<#/>) em Java Platform, Standard Edition Core Libraries.

  * Structured Concurrency é uma API que simplifica a programação concorrente. Ela trata grupos de tarefas relacionadas executando em diferentes threads como uma única unidade de trabalho, simplificando assim o tratamento de erros e o cancelamento, melhorando a confiabilidade e aprimorando a observabilidade.

Consulte [JEP 499: Structured Concurrency (Fourth Preview)](<https://openjdk.org/jeps/499>) e [Structured Concurrency](<#/>) em Java Platform, Standard Edition Core Libraries.

  * Os Scoped Values permitem que um método compartilhe dados imutáveis tanto com seus chamados dentro de uma thread quanto com threads filhas. Eles são mais fáceis de raciocinar do que variáveis thread-local. Eles também têm custos de espaço e tempo mais baixos, especialmente quando usados em conjunto com virtual threads e structured concurrency.

Consulte [JEP 487: Scoped Values (Fourth Preview)](<https://openjdk.org/jeps/487>) e a classe `[ScopedValue](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/ScopedValue.html>)` na Java API Specification.

  * A Vector API expressa computações vetoriais que compilam de forma confiável em tempo de execução para instruções vetoriais ótimas em arquiteturas de CPU suportadas, alcançando assim um desempenho superior às computações escalares equivalentes.

Consulte [JEP 489: Vector API (Ninth Incubator)](<https://openjdk.org/jeps/489>) e [JEP 11: Incubator Modules](<https://openjdk.org/jeps/11>).

Bibliotecas de Segurança

  * Uma API foi introduzida para Key Derivation Functions (KDFs), que são algoritmos criptográficos para derivar chaves adicionais a partir de uma chave secreta e outros dados. Esta é uma API de pré-visualização.

Consulte [JEP 478: Key Derivation Function API (Preview)](<https://openjdk.org/jeps/478>) e [The KDF Class](<https://docs.oracle.com/en/java/javase/24/security/java-cryptography-architecture-jca-reference-guide.html#GUID-EED38EFE-2B79-44CA-B72B-8368EFFE0E5B>) em Java Platform, Standard Edition Security Developer's Guide.

  * A segurança das aplicações Java é aprimorada ao fornecer uma implementação do Module-Lattice-Based Key-Encapsulation Mechanism (ML-KEM) resistente a quantum. Mecanismos de encapsulamento de chave (KEMs) são usados para proteger chaves simétricas em canais de comunicação inseguros usando criptografia de chave pública.

Consulte [JEP 496: Quantum-Resistant Module-Lattice-Based Key Encapsulation Mechanism](<https://openjdk.org/jeps/496>).

  * A segurança das aplicações Java é aprimorada ao fornecer uma implementação do Module-Lattice-Based Digital Signature Algorithm (ML-DSA) resistente a quantum. Assinaturas digitais são usadas para detectar modificações não autorizadas em dados e para autenticar a identidade dos signatários.

Consulte [JEP 497: Quantum-Resistant Module-Lattice-Based Digital Signature Algorithm](<https://openjdk.org/jeps/497>).

Remoções e Avisos para Futuras Mudanças

  * Prepare-se para Restringir o Uso de JNI: Avisos são emitidos sobre o uso da Java Native Interface (JNI), e a Foreign Function and Memory (FFM) API é ajustada para emitir avisos de forma consistente. Todos esses avisos visam preparar os desenvolvedores para uma futura versão que garanta a integridade por padrão, restringindo uniformemente a JNI e a FFM API.

Consulte [JEP 472: Prepare to Restrict the Use of JNI](<https://openjdk.org/jeps/472>) e [Restrições e Avisos ao Acessar Código Nativo](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>).

  * Desabilitar Permanentemente o Security Manager: O Security Manager é permanentemente desabilitado, e a Security Manager API será removida em uma versão futura.

Consulte [JEP 486: Permanently Disable the Security Manager](<https://openjdk.org/jeps/486>) e [The Security Manager Is Permanently Disabled](<https://docs.oracle.com/en/java/javase/24/security/security-manager-is-permanently-disabled.html>) em Java Platform, Standard Edition Security Developer's Guide.

  * ZGC: Remover o Modo Não Geracional: O garbage collector ZGC executa no modo geracional por padrão. O modo não geracional do ZGC é removido.

Consulte [JEP 490: ZGC: Remove the Non-Generational Mode](<https://openjdk.org/jeps/490>) e a seção [The Z Garbage Collector](<#/>) em Java Platform, Standard Edition HotSpot Virtual Machine Garbage Collection Tuning Guide.

  * Avisar sobre o Uso de Métodos de Acesso à Memória em sun.misc.Unsafe: Um aviso é emitido em tempo de execução na primeira vez que qualquer método de acesso à memória em `sun.misc.Unsafe` é invocado. Todos esses métodos não suportados foram descontinuados terminalmente no JDK 23. Eles foram substituídos por APIs padrão, a saber, a VarHandle API e a Foreign Function & Memory API.

Consulte [JEP 498: Warn upon Use of Memory-Access Methods in sun.misc.Unsafe](<https://openjdk.org/jeps/498>).

Para mais detalhes sobre remoções e descontinuações, consulte [Recursos e Opções Removidos e Descontinuados no JDK 24](<#/doc/guides/migrate/removed-tools-and-components>).

Além disso, há atualizações relacionadas à segurança das quais você precisa estar ciente. Consulte [Atualizações de Segurança no JDK 24](<#/doc/guides/migrate/security-updates>).