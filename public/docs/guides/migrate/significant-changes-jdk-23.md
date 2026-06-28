# Mudanças Significativas na Versão JDK 23

## Mudanças Significativas na Versão JDK 23

Consulte as [Notas de Lançamento do JDK 23](<https://www.oracle.com/java/technologies/javase/23-relnote-issues.html#NewFeature>) para descrições adicionais dos novos recursos e aprimoramentos, e a especificação da API no JDK 23.

A seguir estão algumas das atualizações no Java SE 23 e JDK 23:

Recursos de Pré-visualização da Linguagem

  * O pattern matching agora é aprimorado permitindo padrões de tipos primitivos em todos os contextos de padrão. Os operadores, expressões e declarações `instanceof` e `switch` funcionam com todos os tipos primitivos.

Consulte [JEP 455: Primitive Types in Patterns, instanceof, and switch (Preview)](<https://openjdk.org/jeps/455>) e as seguintes seções em Java Platform, Standard Edition Java Language Updates:

    * [When Clauses](<#/>)
    * [Type Patterns with Primitive Types](<#/>)
    * [Primitive Types in Record Patterns](<#/>)
    * [Primitive Values in switch Expressions and Statements](<#/>)
    * [Safe casting with instanceof and switch](<#/>)
  * As Module Import Declarations permitem importar sucintamente todos os pacotes exportados por um módulo com uma declaração de importação de módulo. Isso simplifica a reutilização de bibliotecas modulares sem exigir que o código importado esteja em um módulo.

Consulte [JEP 476: Module Import Declarations (Preview)](<https://openjdk.org/jeps/476>) e [Module Import Declarations](<#/>) em Java Platform, Standard Edition Java Language Updates.

  * Os Flexible Constructor Bodies permitem adicionar declarações que não referenciam a instância que está sendo criada antes de uma invocação explícita do construtor. Este recurso ajuda a preparar argumentos para um construtor de superclasse realizando computações não triviais ou a validar argumentos que você deseja passar para um construtor de superclasse.

Consulte [JEP 482: Flexible Constructor Bodies (Second Preview)](<https://openjdk.org/jeps/482>) e [Flexible Constructor Bodies](<#/>) em Java Platform, Standard Edition Java Language Updates.

  * As Implicitly Declared Classes e Instance Main Methods permitem que os alunos escrevam seus primeiros programas mesmo sem aprender o conjunto completo de recursos da linguagem projetados para programas grandes. Os alunos podem escrever declarações simplificadas para programas de classe única e, em seguida, expandir seus programas de forma contínua para usar recursos mais avançados à medida que suas habilidades crescem.

Consulte [JEP 477: Implicitly Declared Classes and Instance Main Methods (Third Preview)](<https://openjdk.org/jeps/477>) e [Implicitly Declared Classes and Instance Main Methods](<#/>) em Java Platform, Standard Edition Java Language Updates.

  * Os String Templates foram pré-visualizados pela primeira vez no JDK 21 (JEP 430) e no JDK 22 (JEP 459). Os String Templates pretendiam ser novamente pré-visualizados no JDK 23 (JEP 465). No entanto, após extenso feedback e discussão, concluímos que o recurso é inadequado em sua forma atual. Não há consenso sobre qual seria um design melhor; portanto, retiramos o recurso por enquanto, e o JDK 23 não o incluirá.

Consulte [March 2024 Archives by thread](<https://mail.openjdk.org/pipermail/amber-spec-experts/2024-March/thread.html>) e [Update on String Templates (JEP 459)](<https://mail.openjdk.org/pipermail/amber-spec-experts/2024-April/004106.html>) da lista de e-mails amber-spec-experts do Project Amber para discussão adicional.

Consulte [JEP 12: Preview Features](<https://openjdk.org/jeps/12>) e [Preview Language and VM Features](<#/>) em Java Platform, Standard Edition Java Language Updates.

Melhorias na Biblioteca (Pré-visualizações e Incubadora)

  * A Class-File API é usada para analisar, gerar e transformar arquivos de classe Java.

Consulte [JEP 466: Class-File API (Second Preview)](<https://openjdk.org/jeps/466>) e [Class-File API](<#/>) em Java Platform, Standard Edition Java Virtual Machine Guide.

  * Os Stream gatherers permitem criar operações intermediárias personalizadas, o que permite que os pipelines de stream transformem dados de maneiras que não são facilmente alcançáveis com as operações intermediárias integradas existentes.

Consulte [JEP 473: Stream Gatherers (Second Preview)](<https://openjdk.org/jeps/473>) e [Stream Gatherers](<#/>) em Java Platform, Standard Edition Core Libraries.

  * A Structured concurrency trata múltiplas tarefas executadas em diferentes threads como uma única unidade de trabalho, simplificando assim o tratamento de erros e o cancelamento, melhorando a confiabilidade e aprimorando a observabilidade.

Consulte [JEP 480: Structured Concurrency (Third Preview)](<https://openjdk.org/jeps/480>) e [Structured Concurrency](<#/>) em Java Platform, Standard Edition Core Libraries.

  * Os Scoped values permitem o compartilhamento de dados imutáveis dentro e entre threads. Eles são preferidos em relação às variáveis thread-local, especialmente ao usar um grande número de virtual threads.

Consulte [JEP 481: Scoped Values (Third Preview)](<https://openjdk.org/jeps/481>) e a classe `[ScopedValue](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/ScopedValue.html>)` na Java API Specification.

  * A Vector API é introduzida para expressar computações vetoriais que compilam de forma confiável em tempo de execução para instruções vetoriais ótimas em arquiteturas de CPU suportadas, alcançando assim um desempenho superior às computações escalares equivalentes. Consulte [JEP 469: Vector API (Eighth Incubator)](<https://openjdk.org/jeps/469>).

Consulte [JEP 11: Incubator Modules](<https://openjdk.org/jeps/11>).

Melhorias em Tempo de Execução

  * O garbage collector ZGC agora executa no modo geracional por padrão. O modo não geracional do ZGC foi descontinuado para remoção. Isso geralmente melhorará o desempenho da aplicação, embora um pequeno número de cargas de trabalho que são de natureza não geracional possam ser impactadas negativamente.

Consulte [JEP 474: ZGC: Generational Mode by Default](<https://openjdk.org/jeps/474>) e a seção [The Z Garbage Collector](<#/>) em Java Platform, Standard Edition HotSpot Virtual Machine Garbage Collection Tuning Guide.

  * O compilador JIT Oracle GraalVM (Graal JIT) agora está disponível como uma opção experimental entre os JITs disponíveis como parte do Oracle JDK. Esta integração oferece inovações anteriormente disponibilizadas através do [Oracle GraalVM](<https://docs.oracle.com/en/graalvm/>), como novas técnicas de otimização de código JIT (consulte [Compiler Advantages](<https://www.graalvm.org/latest/reference-manual/java/compiler/#compiler-advantages>) na documentação do GraalVM). Isso oferece aos desenvolvedores e administradores de sistema mais opções para ajudar a ajustar e melhorar o desempenho máximo de suas aplicações. O Graal JIT é ativado passando as opções de linha de comando para o executável Java:
`-XX:+UnlockExperimentalVMOptions -XX:+UseGraalJIT
```

Se você não passar essas flags na inicialização da JVM, o JIT padrão do Oracle JDK (C2) será executado normalmente.

Ferramentas

  * Os comentários de documentação JavaDoc agora podem ser escritos na sintaxe Markdown, juntamente com elementos HTML e tags JavaDoc.

Consulte JEP 467: Markdown Documentation Comments e Markdown in Documentation Comments em Java Platform, Standard Edition JavaDoc Guide.

APIs, Ferramentas e Componentes Removidos

Para mais detalhes sobre remoções e descontinuações, consulte Features and Options Removed and Deprecated in JDK 23.

Além disso, há atualizações relacionadas à segurança das quais você precisa estar ciente. Consulte Security Updates in JDK 23.