# Mudanças Significativas no Lançamento do JDK 19

## Mudanças Significativas no Lançamento do JDK 19

Consulte as [Notas de Lançamento do JDK 19](<https://www.oracle.com/java/technologies/javase/19-relnote-issues.html#NewFeature>) para descrições adicionais dos novos recursos e aprimoramentos, e a especificação da API no JDK 19.

A seguir estão algumas das atualizações no Java SE 19 e JDK 19:

Pré-visualizações de Atualização do Modelo de Concorrência

  * Virtual threads são threads leves que reduzem o esforço de escrever, manter e depurar aplicativos concorrentes de alta vazão. Esta é uma [API de pré-visualização](<https://openjdk.java.net/jeps/12>). Consulte [JEP 425: Virtual Threads (Preview)](<https://openjdk.org/jeps/425>) e [Virtual Threads](<#/>) em Java Platform, Standard Edition Core Libraries.
  * Uma API é introduzida para simplificar a programação multithread para structured concurrency. Structured concurrency trata múltiplas tarefas executadas em diferentes threads como uma única unidade de trabalho, otimizando assim o tratamento de erros e o cancelamento, melhorando a confiabilidade e aprimorando a observabilidade. Consulte [JEP 428: Structured Concurrency (Incubator)](<https://openjdk.org/jeps/428>).

Mudanças na Linguagem

  * Record Patterns é introduzido como um recurso de pré-visualização para este lançamento. Um record pattern consiste em um tipo, uma lista de padrões de componentes de record usada para corresponder aos componentes de record correspondentes, e um identificador opcional. Você pode aninhar record patterns e type patterns para permitir uma forma poderosa, declarativa e composível de navegação e processamento de dados. Consulte [JEP 405: Record Patterns (Preview)](<https://openjdk.org/jeps/405>) e [Record Patterns](<#/>) em Java Platform, Standard Edition Java Language Updates.
  * O recurso de pré-visualização Pattern Matching for `switch` Expressions and Statements foi novamente pré-visualizado neste lançamento. Este recurso permite que uma expressão seja testada contra vários padrões, cada um com uma ação específica, para que consultas complexas orientadas a dados possam ser expressas de forma concisa e segura. Consulte [JEP 427: Pattern Matching for switch (Third Preview)](<https://openjdk.org/jeps/427>) e [Pattern Matching for switch Expressions and Statements](<#/>) em Java Platform, Standard Edition Java Language Updates.

Mudanças na Biblioteca

  * A Foreign Function and Memory API permite que programas Java interoperem com código e dados fora do ambiente de execução Java. Esta API permite que programas Java chamem bibliotecas nativas e processem dados nativos sem a fragilidade e o perigo do JNI. A API invoca funções estrangeiras, código fora da JVM, e acessa com segurança memória estrangeira que não é gerenciada pela JVM. Esta é uma [API de pré-visualização](<https://openjdk.java.net/jeps/12>). Consulte [JEP 424: Foreign Function & Memory API (Preview)](<https://openjdk.org/jeps/424>) e [Foreign Function and Memory API](<#/>) em Java Platform, Standard Edition Core Libraries.
  * A Vector API é introduzida para expressar computações vetoriais que compilam de forma confiável em tempo de execução para instruções vetoriais ótimas em arquiteturas de CPU suportadas, alcançando assim um desempenho superior às computações escalares equivalentes. Consulte [JEP 426: Vector API (Fourth Incubator)](<https://openjdk.org/jeps/426>).

APIs, Ferramentas e Componentes Removidos

Para mais detalhes sobre remoções e descontinuações, consulte [Recursos e Opções Descontinuados no JDK 19](<#/doc/guides/migrate/removed-tools-and-components>).

Além disso, há atualizações relacionadas à segurança das quais você precisa estar ciente. Consulte [Atualizações de Segurança no JDK 19](<#/doc/guides/migrate/security-updates>).