# Mudanças Significativas na Versão JDK 21

## Mudanças Significativas na Versão JDK 21

Consulte as [Notas de Lançamento do JDK 21](<https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#NewFeature>) para descrições adicionais dos novos recursos e aprimoramentos, e a especificação da API no JDK 21.

A seguir estão algumas das atualizações no Java SE 21 e JDK 21:

Recursos da Linguagem

  * Record patterns e type patterns podem ser aninhados para permitir uma forma poderosa, declarativa e composível de navegação e processamento de dados. Você pode usar um record pattern para testar se um valor é uma instância de um tipo de record class e, se for, para realizar recursivamente pattern matching em seus valores de componente. Nesta versão, o suporte para record patterns que aparecem no cabeçalho de uma instrução `for` aprimorada foi removido.

Consulte [JEP 440: Record Patterns](<https://openjdk.org/jeps/440>) e [Record Patterns](<#/>) em Java Platform, Standard Edition Java Language Updates.

  * Uma instrução `switch` transfere o controle para uma das várias instruções ou expressões, dependendo do valor de sua expressão seletora. Estender o pattern matching para `switch` permite que uma expressão seja testada contra vários patterns, cada um com uma ação específica, para que consultas complexas orientadas a dados possam ser expressas de forma concisa e segura. Nesta versão:
    * Parenthesized patterns foram removidos.
    * Constantes `enum` qualificadas como constantes `case` em expressões e instruções `switch` são permitidas.

Consulte [JEP 441: Pattern Matching for switch](<https://openjdk.org/jeps/441>) e [Pattern Matching for switch Expressions and Statements](<#/>) em Java Platform, Standard Edition Java Language Updates.

Recursos de Linguagem em Preview

  * String templates complementam os string literals e text blocks existentes do Java, acoplando texto literal com expressões incorporadas e template processors para produzir resultados especializados.

Consulte [JEP 430: String Templates (Preview)](<https://openjdk.org/jeps/430>) e [String Templates](<#/>) em Java Platform, Standard Edition Java Language Updates.

  * Unnamed patterns correspondem a um record component sem declarar o nome ou tipo do componente. Unnamed variables são variáveis que podem ser inicializadas, mas não usadas. Você as denota com o caractere underscore (`_`).

Consulte [JEP 443: Unnamed Patterns and Variables (Preview)](<https://openjdk.org/jeps/443>) e [Unnamed Patterns and Variables](<#/>) em Java Platform, Standard Edition Java Language Updates.

  * Unnamed classes e instance main methods permitem que os alunos escrevam declarações simplificadas para programas de classe única e, em seguida, expandam seus programas de forma contínua para usar recursos mais avançados à medida que suas habilidades crescem.

Consulte [JEP 445: Unnamed Classes and Instance Main Methods (Preview)](<https://openjdk.org/jeps/445>) e [Unnamed Classes and Instance Main Methods](<#/>) em Java Platform, Standard Edition Java Language Updates.

Consulte [Preview Language and VM Features](<#/>) para mais informações sobre recursos de preview.

Melhorias na Biblioteca

  * Virtual threads são threads leves que reduzem o esforço de escrever, manter e depurar aplicações concorrentes de alta vazão.

Consulte [JEP 444: Virtual Threads](<https://openjdk.org/jeps/444>) e [Virtual Threads](<#/>) em Java Platform, Standard Edition Core Libraries.

  * Sequenced collections são coleções com uma ordem de encontro definida. Cada uma dessas coleções tem um primeiro elemento, segundo elemento e assim por diante, bem definidos, até o último elemento. É uma interface que representa uma sequenced collection, fornece APIs uniformes para acessar seus primeiros e últimos elementos, e para processar seus elementos em ordem inversa.

Consulte [JEP 431: Sequenced Collections](<https://openjdk.org/jeps/431>) e [Creating Sequenced Collections, Sets, and Maps](<#/>) em Java Platform, Standard Edition Core Libraries.

  * A Key Encapsulation Mechanism API é introduzida para key encapsulation mechanisms (KEMs), uma técnica de criptografia para proteger chaves simétricas usando criptografia de chave pública.

Consulte [JEP 452: Key Encapsulation Mechanism API](<https://openjdk.org/jeps/452>) e [The KEM Class](<#/>) em Java Platform, Standard Edition Security Developer's Guide.

Previews e Incubator de Melhorias na Biblioteca

  * A preview API Foreign Function and Memory API foi ainda mais refinada da seguinte forma:
    * Centralizou o gerenciamento do tempo de vida de segmentos nativos na interface `Arena`
    * Aprimorou os layout paths com um novo elemento para desreferenciar address layouts
    * Forneceu uma opção de linker para otimizar chamadas para funções de curta duração que não farão upcall para Java (por exemplo, `clock_gettime`)
    * Forneceu uma implementação de linker nativo de fallback, baseada em `libffi`, para facilitar o porting
    * Removeu a classe `VaList`
Consulte [JEP 442: Foreign Function & Memory API (Third Preview)](<https://openjdk.org/jeps/442>) e [Foreign Function and Memory API](<#/>) em Java Platform, Standard Edition Core Libraries.
  * Structured concurrency trata múltiplas tarefas executando em diferentes threads como uma única unidade de trabalho, simplificando assim o tratamento de erros e o cancelamento, melhorando a confiabilidade e aprimorando a observabilidade.

Consulte [JEP 453: Structured Concurrency (Preview)](<https://openjdk.org/jeps/453>) e [Structured Concurrency](<#/>) em Java Platform, Standard Edition Core Libraries.

  * Scoped values permite o compartilhamento de dados imutáveis dentro e entre threads. Eles são preferidos em relação a thread-local variables, especialmente ao usar um grande número de virtual threads.

Consulte [JEP 446: Scoped Values (Preview)](<https://openjdk.org/jeps/446>) e a classe `[ScopedValue](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/ScopedValue.html>)` na Java API Specification.

  * A Vector API é introduzida para expressar computações vetoriais que compilam de forma confiável em tempo de execução para instruções vetoriais ótimas em arquiteturas de CPU suportadas, alcançando assim um desempenho superior às computações escalares equivalentes. Consulte [JEP 448: Vector API (Sixth Incubator)](<https://openjdk.org/jeps/448>).

Consulte [JEP 12: Preview Features](<https://openjdk.org/jeps/12>) e [JEP 11: Incubator Modules](<https://openjdk.org/jeps/11>) para mais informações sobre preview features e incubating APIs.

Melhorias de Desempenho

O desempenho da aplicação foi aprimorado estendendo o Z Garbage Collector ([ZGC](<https://openjdk.org/jeps/377>)) para manter [gerações](<https://en.wikipedia.org/wiki/Tracing_garbage_collection#Generational_GC_\(ephemeral_GC\)>) separadas para young e old objects. Isso permitirá que o ZGC colete young objects, que tendem a morrer jovens, com mais frequência.

Consulte [JEP 439: Generational ZGC](<https://openjdk.org/jeps/439>) e [The Z Garbage Collector](<#/>) em Java Platform, Standard Edition HotSpot Virtual Machine Garbage Collection Tuning Guide.

Stewardship

Avisos são emitidos quando agents são carregados dinamicamente em uma JVM em execução. Esses avisos visam preparar os usuários para uma futura versão que desabilitará o carregamento dinâmico de agents por padrão, a fim de melhorar a integridade por padrão.

Consulte [JEP 451: Prepare to Disallow the Dynamic Loading of Agents](<https://openjdk.org/jeps/451>).

APIs, Ferramentas e Componentes Removidos

Para mais detalhes sobre remoções e depreciações, consulte [Features and Options Removed and Deprecated in JDK 21](<#/doc/guides/migrate/removed-tools-and-components>).

Além disso, há atualizações relacionadas à segurança das quais você precisa estar ciente. Consulte [Security Updates in JDK 21](<#/doc/guides/migrate/security-updates>).