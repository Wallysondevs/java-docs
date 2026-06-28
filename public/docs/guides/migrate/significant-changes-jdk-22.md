# Mudanças Significativas na Versão JDK 22

## Mudanças Significativas na Versão JDK 22

Consulte as [Notas de Lançamento do JDK 22](<https://www.oracle.com/java/technologies/javase/22-relnote-issues.html#NewFeature>) para descrições adicionais dos novos recursos e aprimoramentos, e a especificação da API no JDK 22.

A seguir estão algumas das atualizações no Java SE 22 e JDK 22:

Recursos da Linguagem

  * Variáveis não nomeadas e padrões não nomeados podem ser usados quando declarações de variáveis ou padrões aninhados são necessários, mas nunca utilizados. Padrões não nomeados podem aparecer em uma lista de padrões de um record pattern e podem ser usados em vez de um type pattern. Você os denota com o caractere de sublinhado `(_)`.

Consulte [JEP 456: Unnamed Variables & Patterns](<https://openjdk.org/jeps/456>) e [Unnamed Variables and Patterns](<#/>) em Java Platform, Standard Edition Java Language Updates.

Recursos de Linguagem em Pré-visualização

  * Em construtores, você pode adicionar declarações que não referenciam a instância que está sendo criada antes de uma invocação explícita do construtor. Você pode usar este recurso para preparar argumentos para um construtor de superclasse, realizando computações não triviais ou validando argumentos que deseja passar para um construtor de superclasse.

Consulte [JEP 447: Statements before super(...) ](<https://openjdk.org/jeps/447>) e [Statements Before super(...)](<#/>) em Java Platform, Standard Edition Java Language Updates.

  * String templates complementam os literais de string e blocos de texto existentes do Java, acoplando texto literal com expressões embutidas e template processors para produzir resultados especializados. Expressões embutidas são expressões Java com sintaxe adicional que as diferencia do texto literal no string template. Um template processor combina o texto literal no template com os valores das expressões embutidas para produzir um resultado.

Consulte [JEP 459: String Templates (Second Preview)](<https://openjdk.org/jeps/459>) e [String Templates](<#/>) em Java Platform, Standard Edition Java Language Updates.

  * Os recursos de pré-visualização Instance Main Methods e Implicitly Declared Classes permitem que os alunos escrevam seus primeiros programas sem a necessidade de entender o conjunto completo de recursos da linguagem projetados para programas grandes. Eles podem escrever declarações simplificadas para programas de classe única e, em seguida, expandir seus programas de forma contínua para usar recursos mais avançados à medida que suas habilidades crescem.

Consulte [JEP 463: Implicitly Declared Classes and Instance Main Methods (Second Preview)](<https://openjdk.org/jeps/463>) e [Implicitly Declared Classes and Instance Main Methods](<#/>) em Java Platform, Standard Edition Java Language Updates.

Consulte [Preview Language and VM Features](<#/>) para mais informações sobre recursos de pré-visualização.

Melhorias na Biblioteca

  * A Foreign Function and Memory (FFM) API permite que programas Java interoperem com código e dados fora do ambiente de execução Java. Esta API permite que programas Java chamem bibliotecas nativas e processem dados nativos sem a fragilidade e o perigo do JNI. A API invoca funções estrangeiras, código fora da JVM, e acessa com segurança memória estrangeira, memória não gerenciada pela JVM.

Consulte [JEP 454: Foreign Function & Memory API](<https://openjdk.org/jeps/454>) e [Foreign Function and Memory API](<#/>) em Java Platform, Standard Edition Core Libraries.

Pré-visualizações e Incubadoras de Melhorias na Biblioteca

  * Stream gatherers permitem criar operações intermediárias personalizadas, o que permite que pipelines de stream transformem dados de maneiras que não são facilmente alcançáveis com as operações intermediárias embutidas existentes.

Consulte [JEP 461: Stream Gatherers (Preview)](<https://openjdk.org/jeps/461>) e [Stream Gatherers](<#/>) em Java Platform, Standard Edition Core Libraries.

  * A Class-File API é usada para analisar, gerar e transformar arquivos de classe Java.

Consulte [JEP 457: Class-File API (Preview)](<https://openjdk.org/jeps/457>) e [Class-File API](<#/>) em Java Platform, Standard Edition Java Virtual Machine Guide.

  * Structured concurrency trata múltiplas tarefas executadas em diferentes threads como uma única unidade de trabalho, simplificando assim o tratamento de erros e o cancelamento, melhorando a confiabilidade e aprimorando a observabilidade.

Consulte [JEP 462: Structured Concurrency (Second Preview)](<https://openjdk.org/jeps/462>) e [Structured Concurrency](<#/>) em Java Platform, Standard Edition Core Libraries.

  * Scoped values permite o compartilhamento de dados imutáveis dentro e entre threads. Eles são preferidos em relação às variáveis thread-local, especialmente ao usar um grande número de virtual threads.

Consulte [JEP 464: Scoped Values (Second Preview)](<https://openjdk.org/jeps/464>) e a classe `[ScopedValue](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/ScopedValue.html>)` na Java API Specification.

  * A Vector API é introduzida para expressar computações vetoriais que compilam de forma confiável em tempo de execução para instruções vetoriais ótimas em arquiteturas de CPU suportadas, alcançando assim um desempenho superior às computações escalares equivalentes. Consulte [JEP 460: Vector API (Seventh Incubator)](<https://openjdk.org/jeps/460>).

Consulte [JEP 12: Preview Features](<https://openjdk.org/jeps/12>) e [JEP 11: Incubator Modules](<https://openjdk.org/jeps/11>) para mais informações sobre recursos de pré-visualização e APIs em incubação.

Melhorias de Desempenho

O region pinning no G1 reduz a latência para que a garbage collection não precise ser desabilitada durante regiões críticas do Java Native Interface (JNI).

Consulte [JEP 423: Region Pinning for G1](<https://openjdk.org/jeps/423>) e a seção [Evacuation Failure](<#/>) no Java Platform, Standard Edition HotSpot Virtual Machine Garbage Collection Tuning Guide.

Ferramentas

O Java application launcher foi aprimorado para executar um programa fornecido como múltiplos arquivos de código-fonte Java. Isso permitirá uma transição gradual de programas pequenos para programas maiores.

Consulte [JEP 458: Launch Multi-File Source-Code Programs](<https://openjdk.org/jeps/458>).

APIs, Ferramentas e Componentes Removidos

Para mais detalhes sobre remoções e depreciações, consulte [Features and Options Removed and Deprecated in JDK 22](<#/doc/guides/migrate/removed-tools-and-components>).

Além disso, há atualizações relacionadas à segurança das quais você precisa estar ciente. Consulte [Security Updates in JDK 22](<#/doc/guides/migrate/security-updates>).