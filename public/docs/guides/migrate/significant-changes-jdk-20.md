# Mudanças Significativas na Versão JDK 20

## Mudanças Significativas na Versão JDK 20

Consulte as [Notas de Lançamento do JDK 20](<https://www.oracle.com/java/technologies/javase/20-relnote-issues.html#NewFeature>) para descrições adicionais dos novos recursos e aprimoramentos, e a especificação da API no JDK 20.

A seguir estão algumas das atualizações no Java SE 20 e JDK 20:

Pré-visualizações e Incubadoras do Modelo de Concorrência

  * Virtual threads são threads leves que reduzem o esforço de escrever, manter e depurar aplicações concorrentes de alta vazão. Esta é uma API de pré-visualização. Pequenas alterações foram feitas nesta API desde o último lançamento. Consulte [JEP 436: Virtual Threads (Second Preview)](<https://openjdk.org/jeps/436>) e [Virtual Threads](<#/>) em Java Platform, Standard Edition Core Libraries.
  * Structured Concurrency trata múltiplas tarefas executando em diferentes threads como uma única unidade de trabalho, simplificando assim o tratamento de erros e o cancelamento, melhorando a confiabilidade e aprimorando a observabilidade. Consulte [JEP 437: Structured Concurrency (Second Incubator)](<https://openjdk.org/jeps/437>). Consulte [JEP 11: Incubator Modules](<https://openjdk.org/jeps/11>) para mais informações sobre APIs incubadoras.
  * Scoped values permite o compartilhamento de dados imutáveis dentro e entre threads. Eles são preferíveis a variáveis thread-local, especialmente ao usar um grande número de virtual threads. Consulte [JEP 429: Scoped Values (Incubator)](<https://openjdk.org/jeps/429>) e [JEP 11: Incubator Modules](<https://openjdk.org/jeps/11>).
  * Uma API é introduzida para expressar computações vetoriais que compilam de forma confiável em tempo de execução para instruções vetoriais ótimas em arquiteturas de CPU suportadas, alcançando assim um desempenho superior às computações escalares equivalentes. Consulte [JEP 438: Vector API (Fifth Incubator)](<https://openjdk.org/jeps/438>).

Mudanças na Linguagem

  * O recurso de pré-visualização Pattern Matching for `switch` Expressions and Statements foi aprimorado da seguinte forma:
    * Um `switch` exaustivo (ou seja, uma expressão `switch` ou uma instrução `switch` de padrão) sobre uma classe `enum` lança uma `MatchException` em vez de um `IncompatibleClassChangeError` se nenhum rótulo `switch` se aplicar em tempo de execução.
    * A gramática para rótulos `switch` é mais simples.
    * O compilador pode inferir o tipo dos argumentos de tipo para padrões de record genéricos em todas as construções que aceitam padrões: instruções e expressões `switch`, expressões `instanceof` e instruções `for` aprimoradas.
Consulte [JEP 433: Pattern Matching for switch (Fourth Preview)](<https://openjdk.org/jeps/433>) e [Pattern Matching for switch Expressions and Statements](<#/>) em Java Platform, Standard Edition Java Language Updates.
  * O recurso de pré-visualização Record Patterns foi aprimorado da seguinte forma:
    * O compilador pode inferir o tipo dos argumentos de tipo para padrões de record genéricos.
    * Padrões de record podem aparecer em uma instrução `for` aprimorada.
    * Padrões de record nomeados não são mais suportados.
Consulte [JEP 432: Record Patterns (Second Preview)](<https://openjdk.org/jeps/432>) e [Record Patterns](<#/>) em Java Platform, Standard Edition Java Language Updates.

Consulte [Recursos de Linguagem e VM em Pré-visualização](<#/>) para mais informações sobre recursos de pré-visualização.

Mudanças na Biblioteca

  * A API de pré-visualização Foreign Function and Memory API foi aprimorada da seguinte forma:
    * As abstrações `MemorySegment` e `MemoryAddress` são unificadas (endereços de memória agora são modelados por segmentos de memória de comprimento zero).
    * A hierarquia `MemoryLayout` sealed é aprimorada para facilitar o uso com pattern matching em expressões e instruções `switch`. Consulte [Pattern Matching for switch Expressions and Statements](<#/>).
    * `MemorySession` foi dividida em Arena e `SegmentScope` para facilitar o compartilhamento de segmentos entre limites de manutenção.
Consulte [JEP 434: Foreign Function & Memory API (Second Preview)](<https://openjdk.org/jeps/434>) e [Foreign Function and Memory API](<#/>) em Java Platform, Standard Edition Core Libraries.

APIs, Ferramentas e Componentes Removidos

Para mais detalhes sobre remoções e depreciações, consulte [Recursos e Opções Depreciados no JDK 20](<#/doc/guides/migrate/removed-tools-and-components>).

Além disso, há atualizações relacionadas à segurança das quais você precisa estar ciente. Consulte [Atualizações de Segurança no JDK 20](<#/doc/guides/migrate/security-updates>).