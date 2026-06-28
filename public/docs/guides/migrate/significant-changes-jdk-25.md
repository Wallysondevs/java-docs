# Mudanças Significativas na Versão JDK 25

## Mudanças Significativas na Versão JDK 25

Consulte as [Notas de Lançamento do JDK 25](<https://www.oracle.com/java/technologies/javase/25-relnote-issues.html#NewFeature>) para descrições adicionais dos novos recursos e aprimoramentos, e a especificação da API no JDK 25.

A seguir estão algumas das atualizações no Java SE 25 e JDK 25:

Recursos de Pré-visualização da Linguagem

  * Pattern Matching é aprimorado permitindo tipos primitivos em todos os contextos de pattern. O operador `instanceof` e as expressões e declarações `switch` são estendidos para funcionar com todos os tipos primitivos.

Primeiramente pré-visualizado no Java SE 23, este recurso é novamente pré-visualizado para esta versão. Não há mudanças significativas entre o Java SE 23 e esta versão.

Consulte [JEP 507: Primitive Types in Patterns, instanceof, and switch (Third Preview)](<https://openjdk.org/jeps/507>) e as seguintes seções em Java Platform, Standard Edition Java Language Updates:

    * [Cláusulas When](<#/>)
    * [Type Patterns com Tipos Primitivos](<#/>)
    * [Tipos Primitivos em Record Patterns](<#/>)
    * [Valores Primitivos em Expressões e Declarações switch](<#/>)
    * [Casting Seguro com instanceof e switch](<#/>)
  * Module Import Declarations permitem importar sucintamente todos os pacotes exportados por um módulo. Isso simplifica a reutilização de bibliotecas modulares sem exigir que o código importador esteja em um módulo.

Primeiramente pré-visualizado no Java SE 23, este recurso é novamente pré-visualizado para esta versão. Não há mudanças significativas entre o Java SE 23 e esta versão.

Consulte [JEP 511: Module Import Declarations](<https://openjdk.org/jeps/511>) e [Module Import Declarations](<#/>) em Java Platform, Standard Edition Java Language Updates.

  * Arquivos-fonte compactos e métodos `main` de instância permitem que os alunos escrevam seus primeiros programas sem a necessidade de entender o conjunto completo de recursos da linguagem projetados para programas grandes.

Primeiramente pré-visualizado no Java SE 21 como JEP 445: Unnamed Classes and Instance Main Methods (Preview) e novamente pré-visualizado no Java SE 22, 23 e 24, este recurso é permanente nesta versão com um título revisado. Nesta versão:
    * A nova classe `IO` para I/O básico de console agora está no pacote `java.lang` em vez do pacote `java.io`. Assim, ela é implicitamente importada por cada arquivo-fonte.
    * Os métodos `static` da classe `IO` não são mais implicitamente importados para arquivos-fonte compactos. Assim, as invocações desses métodos devem nomear a classe, por exemplo, `IO.println("Hello, world!")`, a menos que os métodos sejam explicitamente importados.
    * A implementação da classe `IO` agora é baseada em `System.out` e `System.in` em vez da classe `java.io.Console`.

Consulte [JEP 512: Compact Source Files and Instance Main Methods](<https://openjdk.org/jeps/512>) e [Compact Source Files and Instance main Methods](<#/>) em Java Platform, Standard Edition Java Language Updates.

  * Flexible Constructor Bodies permitem que declarações em um construtor apareçam antes de uma invocação explícita de construtor, como `super(..)` ou `this(..)`. Essas declarações não podem referenciar a instância em construção, mas podem inicializar seus campos. Inicializar campos antes de invocar outro construtor torna uma classe mais confiável quando os métodos são sobrescritos.

Primeiramente pré-visualizado no Java SE 22 como JEP 447: Statements before super(...) (Preview) e novamente pré-visualizado no Java SE 23 e Java SE 24, este recurso é permanente nesta versão sem quaisquer mudanças significativas.

Consulte [JEP 513: Flexible Constructor Bodies](<https://openjdk.org/jeps/513>) e [Flexible Constructor Bodies](<#/>) em Java Platform, Standard Edition Java Language Updates.

Consulte [JEP 12: Preview Features](<https://openjdk.org/jeps/12>) e [Preview Language and VM Features](<#/>) em Java Platform, Standard Edition Java Language Updates.

Melhorias de Biblioteca, Pré-visualizações e Incubator

  * Structured Concurrency é uma API que simplifica a programação concorrente. Ela trata grupos de tarefas relacionadas executadas em diferentes threads como uma única unidade de trabalho, simplificando assim o tratamento de erros e o cancelamento, melhorando a confiabilidade e aprimorando a observabilidade.

Consulte [JEP 505: Structured Concurrency (Fifth Preview)](<https://openjdk.org/jeps/505>) e [Structured Concurrency](<#/>) em Java Platform, Standard Edition Core Libraries.

  * Scoped Values permitem que um método compartilhe dados imutáveis tanto com seus chamadores dentro de uma thread quanto com threads filhas. Eles são mais fáceis de entender do que variáveis thread-local. Eles também têm custos de espaço e tempo mais baixos, especialmente quando usados em conjunto com virtual threads e structured concurrency.

Consulte [JEP 506: Scoped Values](<https://openjdk.org/jeps/506>) e a classe `[ScopedValue](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/ScopedValue.html>)` na Especificação da API Java.

  * A API Stable Values armazena dados imutáveis. Eles são tratados como constantes pela JVM, permitindo as mesmas otimizações de desempenho que são habilitadas ao declarar um campo `final`. Comparado aos campos `final`, os stable values oferecem maior flexibilidade quanto ao momento de sua inicialização.

Consulte [JEP 502: Stable Values (Preview)](<https://openjdk.org/jeps/502>), `[StableValue](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/StableValue.html>)` na Especificação da API Java, e os [Stable Values](<#/>) em Java Platform, Standard Edition Core Libraries.

  * A Vector API expressa computações vetoriais que compilam de forma confiável em tempo de execução para instruções vetoriais ótimas em arquiteturas de CPU suportadas, alcançando assim um desempenho superior às computações escalares equivalentes.

Consulte [JEP 508: Vector API (Tenth Incubator)](<https://openjdk.org/jeps/508>) e [JEP 11: Incubator Modules](<https://openjdk.org/jeps/11>).

Bibliotecas de Segurança

  * Uma API foi introduzida para codificar objetos que representam chaves criptográficas, certificados e listas de revogação de certificados no formato de transporte Privacy-Enhanced Mail (PEM) amplamente utilizado, e para decodificar desse formato de volta para objetos.

Consulte [JEP 470: PEM Encodings of Cryptographic Objects (Preview)](<https://openjdk.org/jeps/470>) e [The DEREncodable Interface](<https://docs.oracle.com/en/java/javase/25/security/java-cryptography-architecture-jca-reference-guide.html#GUID-334CA23A-80AE-4CF9-A66F-49A8D75F62F5>) em Java Platform, Standard Edition Security Developer's Guide.

  * Uma API foi introduzida para Key Derivation Functions (KDFs), que são algoritmos criptográficos para derivar chaves adicionais a partir de uma chave secreta e outros dados.

Consulte [JEP 510: Key Derivation Function API](<https://openjdk.org/jeps/510>) e [The KDF Class](<https://docs.oracle.com/en/java/javase/25/security/java-cryptography-architecture-jca-reference-guide.html#GUID-EED38EFE-2B79-44CA-B72B-8368EFFE0E5B>) em Java Platform, Standard Edition Security Developer's Guide.

Melhorias de Desempenho e Tempo de Execução

  * O tamanho dos cabeçalhos de objeto na HotSpot JVM é reduzido de 96 e 128 bits para 64 bits em arquiteturas de 64 bits. Isso reduzirá o tamanho da heap, melhorará a densidade de implantação e aumentará a localidade dos dados. Este recurso experimental agora foi alterado para um recurso de produto.

Consulte [JEP 519: Compact Object Headers](<https://openjdk.org/jeps/519>).

  * Ahead-of-Time (AOT) Command-Line Ergonomics simplifica o processo de criação de caches ahead-of-time (AOT), reduzindo a complexidade dos comandos necessários para casos de uso comuns. Os caches AOT ajudam a acelerar a inicialização de aplicações Java, tornando-as mais eficientes e responsivas.

Primeiramente introduzido no JEP 483: Ahead-of-Time Class Loading and Linking, este aprimoramento traz novas otimizações relacionadas a AOT para a HotSpot JVM.

Consulte [JEP 514: Ahead-of-Time Command-Line Ergonomics](<https://openjdk.org/jeps/514>).

  * Ahead-of-Time Method Profiling melhora o tempo de inicialização, tornando os perfis de execução de métodos de uma execução anterior de uma aplicação instantaneamente disponíveis quando a HotSpot Java Virtual Machine é iniciada. Isso permite que o compilador JIT gere o código nativo logo na inicialização da aplicação, eliminando a necessidade de esperar que os dados de perfil sejam coletados durante a execução atual.

Consulte [JEP 515: Ahead-of-Time Method Profiling](<https://openjdk.org/jeps/515>).

Monitoramento

  * JFR CPU-Time Profiling: O JDK Flight Recorder (JFR) foi aprimorado para coletar dados de perfil de tempo de CPU mais precisos no Linux. Este recurso é atualmente experimental.

Consulte [JEP 509: JFR CPU-Time Profiling (Experimental)](<https://openjdk.org/jeps/509>) e [JDK Flight Recorder](<https://dev.java/learn/jvm/jfr/>).

  * JFR Cooperative Sampling: A estabilidade do JDK Flight Recorder (JFR) foi aprimorada ao amostrar assincronamente pilhas de threads Java, restringindo a travessia da pilha de chamadas a safepoints, enquanto reduz o viés de safepoint.

Consulte [JEP 518: JFR Cooperative Sampling](<https://openjdk.org/jeps/518>).

  * JFR Method Timing and Tracing: O JDK Flight Recorder (JFR) foi estendido para suportar o timing e tracing de métodos usando [bytecode instrumentation](<https://docs.oracle.com/en/java/javase/25/docs/api/java.instrument/java/lang/instrument/Instrumentation.html>). O timing e tracing de invocações de métodos pode ajudar a identificar gargalos de desempenho, otimizar código e encontrar as causas-raiz de bugs.

Consulte [JEP 520: JFR Method Timing & Tracing](<https://openjdk.org/jeps/520>).

Remoções e Avisos para Futuras Mudanças

Remoção de Recursos Experimentais Graal JIT: O compilador Graal JIT experimental opcional foi removido.

Para detalhes sobre remoções e depreciações, consulte [Features and Options Removed and Deprecated in JDK 25](<#/doc/guides/migrate/removed-tools-and-components>).

Além disso, há atualizações relacionadas à segurança das quais você precisa estar ciente. Consulte [Security Updates in JDK 25](<#/doc/guides/migrate/security-updates>).