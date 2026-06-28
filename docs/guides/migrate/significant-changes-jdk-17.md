# Mudanças Significativas na Versão JDK 17

## Mudanças Significativas na Versão JDK 17

Consulte as [Notas de Lançamento do JDK 17](<https://www.oracle.com/java/technologies/javase/17-relnote-issues.html#NewFeature>) para descrições adicionais dos novos recursos e aprimoramentos, e a especificação da API no JDK 17.

A seguir estão algumas das atualizações no Java SE 17 e JDK 17:

Novo Recurso de Linguagem

  * Sealed Classes, primeiramente pré-visualizadas no Java SE 15, são um recurso permanente nesta versão. Sealed classes e interfaces restringem quais outras classes ou interfaces podem estendê-las ou implementá-las. Consulte [JEP 409: Sealed Classes](<https://openjdk.java.net/jeps/409>) e [Sealed Classes](<#/>) no guia Java Platform, Standard Edition Java Language Updates.

Mudanças na Biblioteca

  * Aplicações agora podem configurar filtros de desserialização específicos de contexto e selecionados dinamicamente usando uma fábrica de filtros em toda a JVM, que é invocada para selecionar um filtro para cada operação de desserialização individual. Consulte [JEP 415: Context-Specific Deserialization Filters](<https://openjdk.java.net/jeps/415>) e [Serialization Filtering](<https://docs.oracle.com/en/java/javase/17/core/serialization-filtering1.html#GUID-3ECB288D-E5BD-4412-892F-E9BB11D4C98A>) no guia Java Platform, Standard Edition Core Libraries.
  * Novos tipos de interface e implementações para geradores de números pseudoaleatórios (PRNGs) estão agora disponíveis, incluindo PRNGs "jumpable" e uma classe adicional de algoritmos PRNG "splittable" (LXM). Consulte [JEP 356: Enhanced Pseudo-Random Number Generators](<https://openjdk.java.net/jeps/356>) e [Pseudorandom Number Generators](<https://docs.oracle.com/en/java/javase/17/core/pseudorandom-number-generators.html#GUID-08E418B9-036F-4D11-8E1C-5EB19B23D8A1>) no guia Java Platform, Standard Edition Core Libraries.
  * Um novo pipeline de renderização interno do Java 2D para macOS é implementado usando a Apple Metal API. Esta é uma alternativa ao pipeline existente, que usa a Apple OpenGL API, agora descontinuada. Consulte [JEP 382: New macOS Rendering Pipeline](<https://openjdk.java.net/jeps/382>).

Outras Mudanças

  * Por padrão, todos os elementos internos do JDK são fortemente encapsulados, exceto por APIs internas críticas como `sun.misc.Unsafe`. No entanto, não será mais possível relaxar o forte encapsulamento de elementos internos usando uma única opção de linha de comando, como era possível do JDK 9 ao JDK 16. Consulte [JEP 403: Strongly Encapsulate JDK Internals by Default](<http://openjdk.java.net/jeps/403>).
  * As operações de ponto flutuante agora são consistentemente estritas, em vez de ter tanto semânticas de ponto flutuante estritas (`strictfp`) quanto semânticas de ponto flutuante padrão sutilmente diferentes. Consulte [JEP 306: Restore Always-Strict Floating-Point Semantics](<https://openjdk.java.net/jeps/306>).

Descontinuações

  * O Security Manager e as APIs relacionadas a ele foram descontinuados para remoção em uma versão futura. Consulte [JEP 411: Deprecate the Security Manager for Removal](<https://openjdk.java.net/jeps/411>).

Recursos de Pré-visualização e Módulos Incubadores

Consulte [JEP 12: Preview Features](<http://openjdk.java.net/jeps/12>) para mais informações sobre recursos de pré-visualização e [JEP 11: Incubator Modules](<https://openjdk.java.net/jeps/11>) para mais informações sobre módulos incubadores.

  * O "pattern matching" para expressões e declarações `switch` é introduzido nesta versão. Este recurso permite que uma expressão seja testada contra vários padrões, cada um com uma ação específica, para que consultas complexas orientadas a dados possam ser expressas de forma concisa e segura. Consulte [JEP 406: Pattern Matching for switch (Preview)](<https://openjdk.java.net/jeps/406>) e [Pattern Matching for Switch Expressions and Statements](<https://docs.oracle.com/en/java/javase/17/language/pattern-matching-switch-expressions-and-statements.html>) no guia Java Platform, Standard Edition Java Language Updates.
  * A Foreign Function & Memory API permite que programas Java interoperem com código e dados fora do tempo de execução do Java. Consulte [JEP 412: Foreign Function & Memory API (Incubator)](<https://openjdk.java.net/jeps/412>).
  * A Vector API foi introduzida no Java SE 16 como uma API incubadora. Nesta versão, aprimoramentos foram incorporados juntamente com melhorias de desempenho. Consulte [JEP 414: Vector API (Second Incubator)](<https://openjdk.java.net/jeps/414>).

APIs, Ferramentas e Componentes Removidos

Consulte:

  * [APIs Removidas no Java SE 17](<#/doc/guides/migrate/removed-apis>)
  * [Ferramentas e Componentes Removidos e Descontinuados no JDK 17](<#/doc/guides/migrate/removed-tools-and-components>)

Além disso, há atualizações relacionadas à segurança das quais você precisa estar ciente. Consulte: [Atualizações de Segurança no JDK 17](<#/doc/guides/migrate/security-updates>).