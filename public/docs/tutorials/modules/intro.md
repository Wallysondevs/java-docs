# Introdução a Módulos em Java

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > Introdução a Módulos em Java

**Tutorial Atual**

Introdução a Módulos em Java

➜

**Próximo na Série**

[Acesso Reflexivo com Módulos Abertos e Pacotes Abertos](<#/doc/tutorials/modules/opening-for-reflection>)

**Próximo na Série:** [Acesso Reflexivo com Módulos Abertos e Pacotes Abertos](<#/doc/tutorials/modules/opening-for-reflection>)

# Introdução a Módulos em Java

As Java APIs são organizadas em methods, classes, packages e - no nível mais alto - modules. Um module possui várias informações essenciais anexadas a ele:

  * um name
  * uma list de dependencies em outros modules
  * uma public API (com todo o resto sendo module internal e inacessível)
  * uma list de services que ele usa e fornece

Não apenas as Java APIs vêm com essas informações, você também tem a opção de criar modules para seus próprios projetos. Ao implantar seu projeto como modules, você aumenta a reliability e maintainability, previne o uso acidental de internal APIs e pode criar mais facilmente runtime images que contêm apenas o código do JDK que você precisa (com a opção de incluir seu próprio app na image para torná-lo standalone).

Antes de chegarmos a esses benefícios, exploraremos como definir um module e suas properties, como transformá-lo em um JAR entregável e como o module system os gerencia. Para facilitar, vamos assumir que tudo (código no JDK, libraries, frameworks, apps) é um module - [por que isso não é necessário](<#/doc/tutorials/modules/unnamed-module>) e [como modules podem ser criados incrementalmente](<#/doc/tutorials/modules/automatic-module>) são abordados em artigos dedicados.

## Declarações de Módulo

No centro de cada module está a _module declaration_, um file com o name `module-info.java` que define todas as properties de um module. Como exemplo, aqui está a do [`java.sql`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.sql/module-summary.html>), o platform module que define a JDBC API:

Ele define o module's name (_java.sql_), suas dependencies em outros modules ([`java.logging`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.logging/module-summary.html>), [`java.transaction.xa`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.transaction.xa/module-summary.html>), [`java.xml`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.xml/module-summary.html>)), os packages que compõem sua public API (`java.sql` e `javax.sql`), e quais services ele usa (`java.sql.Driver`). Este module já emprega uma forma mais refinada para definir dependencies adicionando a keyword `transitive`, mas é claro que não usa todas as capabilities do module system. De modo geral, uma module declaration tem a seguinte forma básica:

```java
module <module-name> {
    requires <other-module>;
    exports <package-name>;
    opens <package-name>;
    uses <service-type>;
    provides <service-type> with <implementation-type>;
}
```

(O module inteiro pode ser `open` e as directives `requires`, `exports` e `opens` podem ser ainda mais refinadas, mas esses são tópicos para mais tarde.)

Você pode criar module declarations para seus projetos. Sua localização recomendada - onde todas as tools as encontrarão mais facilmente - é na source root folder de um projeto, ou seja, a folder contendo seus package directories, frequentemente `src/main/java`. Para uma library, uma module declaration pode se parecer com isto:

```java
module com.example.lib {
    requires java.sql;
    requires com.sample.other;
    exports com.example.lib.api;
    exports com.example.lib.spi;
    uses com.example.lib.spi.Service;
}
```

Para um app, pode ser algo assim:

```java
module com.example.app {
    requires com.example.lib;
    opens com.example.app.entities;
    provides com.example.lib.spi.Service with com.example.app.MyService;
}
```

Vamos rapidamente revisar os detalhes. Esta section foca no que precisa ir na module declaration:

  * module name
  * dependencies
  * exported packages
  * used and provided services

Os effects são discutidos em uma section posterior.

### Nome do Módulo

Module names têm os mesmos requirements e guidelines que package names:

  * legal letters incluem `A`-`Z`, `a`-`z`, `0`-`9`, `_`, e `$`, separados por `.`
  * por convention module names são todos em lower case e `$` é usado apenas para código gerado mecanicamente
  * names devem ser globally unique

No exemplo anterior, a declaration do JDK module começou com `module java.sql`, que definiu o module com o name _java.sql_. Os dois custom modules foram nomeados `com.example.lib` e `com.example.app`.

Dado um JAR, o module name correspondente pode ser inferido da documentation do projeto, com uma olhada no file `module-info.class` no JAR (mais sobre isso depois), com a ajuda de uma IDE, ou executando `jar --describe-module --file $FILE` contra o JAR file.

Em relação à unicidade do module name, a recommendation é a mesma para packages: Escolha uma URL que esteja associada ao projeto e inverta-a para obter a primeira parte do module name, depois refine a partir daí. (Isso implica que os dois example modules estão associados ao domain example.com.) Se você aplicar este process a module names e package names, o primeiro geralmente será um prefixo do segundo porque modules são mais gerais que packages. Isso de forma alguma é required, mas é um indicador de que os names foram bem escolhidos.

### Requerendo Dependências

As directives `requires` listam todas as direct dependencies pelos seus module names. Dê uma olhada nas dos três modules acima:

```java
module com.example.lib {
    requires java.sql;
    requires com.sample.other;
    // ...
}

module com.example.app {
    requires com.example.lib;
    // ...
}

module java.sql {
    requires java.logging;
    requires java.transaction.xa;
    requires java.xml;
    // ...
}
```

Podemos ver que o app module _com.example.app_ depende da library _com.example.lib_, que por sua vez precisa do unrelated module _com.sample.other_ e do platform module _java.sql_. Não temos a declaration de _com.sample.other_, mas sabemos que _java.sql_ depende de _java.logging_, _java.transaction.xa_ e _java.xml_. Se os procurarmos, veremos que eles não têm further dependencies. (Ou melhor, nenhuma explicit dependency - verifique a section sobre o base module abaixo para mais detalhes.)

Também é possible lidar com [optional dependencies](<#/doc/tutorials/modules/optional-dependencies>) (com `requires static`) e [to "forward" dependencies](<#/doc/tutorials/modules/implied-readability>) que fazem parte da API de um module (com `requires transitive`), mas isso é abordado em artigos separados.

A list de external dependencies é, com toda a probabilidade, muito similar às dependencies listadas em sua build configuration. Isso frequentemente leva à question se isso é redundant e deveria ser auto-generated. Não é redundant porque um module name não contém version ou realmente qualquer outra information que uma build tool precise para obter um JAR (como group ID e artifact ID) e build configurations listam essas information, mas não o name de um module. Como o module name pode ser inferido dado um JAR, é possible gerar esta section de `module-info.java`. Não está claro se isso vale o effort, no entanto, particularmente com a added complexity de dependencies em platform modules e de modifiers `static` e `transitive`, bem como o fact de que IDEs já propõem adicionar directives `requires` quando são needed (muito parecido com package imports), o que torna a atualização de module declarations muito simple.

### Exportando e Abrindo Pacotes

Por default, todos os types, mesmo os `public`, são acessíveis apenas dentro de um module. Para dar acesso a um type a código fora de um module, o package contendo o type precisa ser _exported_ ou _opened_. Isso é alcançado usando as directives `exports` e `opens`, que incluem o name de um package que o module contém. O effect exato de exporting é discutido na section sobre strong encapsulation abaixo, de opening em [um article sobre reflection](<#/doc/tutorials/modules/opening-for-reflection>), mas a essência é:

  * public types e members em exported packages estão disponíveis em compile e run time
  * todos os types e members em open packages podem ser acessados em run time via reflection

Aqui estão as directives `exports` e `opens` dos três example modules:

```java
module com.example.lib {
    // ...
    exports com.example.lib.api;
    exports com.example.lib.spi;
}

module com.example.app {
    // ...
    opens com.example.app.entities;
}

module java.sql {
    // ...
    exports java.sql;
    exports javax.sql;
}
```

Isso mostra que _java.sql_ exports um package de mesmo name, bem como `javax.sql` - o module contém muitos mais packages, é claro, mas eles não fazem parte de sua API e não nos preocupam. O library module exports dois packages para serem usados por outros modules - novamente, todos os outros (potential) packages estão seguramente trancados. O app module exports nenhum package, o que não é incomum, pois o module que lança a application raramente é uma dependency de outros modules e, portanto, ninguém o chama. Ele abre `com.example.app.entities` para reflection, no entanto - a julgar pelo name, provavelmente porque contém entities com as quais outros modules querem interagir via reflection (pense em JPA).

Existem também [qualified variants](<#/doc/tutorials/modules/qualified-exports-opens>) das directives `exports` e `opens` que permitem exportar/abrir um package para specific modules apenas.

Como regra geral, tente exportar o mínimo de packages possível - assim como manter fields private, tornando methods package-visible ou public apenas se needed, e tornando classes package-visible por default e apenas public se needed em outro package. Isso reduz a quantidade de código que é visible em outro lugar, o que reduz a complexity.

### Usando e Fornecendo Serviços

[Services são um tópico próprio](<#/doc/tutorials/modules/services>) - por enquanto, basta dizer que você pode usá-los para desacoplar o user de uma API de sua implementation, tornando mais fácil substituí-la tão tarde quanto no lançamento da application. Se um module usa um type (uma interface ou uma class) como um service, ele precisa declarar isso na module declaration com a directive `uses`, que inclui o fully qualified type name. Modules que fornecem um service expressam em sua module declaration quais de seus próprios types fazem isso (geralmente implementando ou estendendo-o).

Os example modules de library e app mostram os dois lados:

```java
module com.example.lib {
    // ...
    uses com.example.lib.spi.Service;
}

module com.example.app {
    // ...
    provides com.example.lib.spi.Service with com.example.app.MyService;
}
```

O lib module usa `Service`, um de seus próprios types, como um service e o app module, que depende do lib module, o fornece com `MyService`. Em run time, o lib module acessará todas as classes que implementam / estendem o service type usando a `ServiceLoader` API com uma call tão simple quanto `ServiceLoader.load(Service.class)`. Isso significa que o library module executa behavior definido no app module, mesmo que não dependa dele - isso é ótimo para desvincular dependencies e manter modules focados em suas concerns.

## Construindo e Lançando Módulos

A module declaration `module-info.java` é um source file como qualquer outro e, portanto, leva alguns steps antes de estar rodando na JVM. Felizmente, estes são exatamente os mesmos steps que seu source code leva e a maioria das build tools e IDEs entendem isso bem o suficiente para se adaptar à sua presence. Com toda a probabilidade, você não precisa fazer nada manually para construir e lançar uma modular code base. Claro que há value em entender os nitty, gritty details, então [um dedicated article](<#/doc/tutorials/modules/building>) leva você do source code à JVM em execução com apenas command line tools.

Aqui, ficaremos em um higher level of abstraction e, em vez disso, discutiremos alguns concepts que desempenham um important role na construção e execução de modular code:

  * modular JARs
  * module path
  * module resolution e module graph
  * o base module

### JARs Modulares

Um file `module-info.java` (também conhecido como module declaration) é compilado para `module-info.class` (chamado _module descriptor_), que pode então ser colocado no root directory de um JAR ou em um version-specific directory, se for [um multi-release JAR](<#/doc/tutorials/jvm/tools/core/jar>). Um JAR contendo um module descriptor é chamado de _modular JAR_ e está pronto para ser usado como um module - JARs sem um descriptor são _plain JARs_. Se um module JAR for colocado no module path (veja abaixo), ele se torna um module em run time, mas ainda pode ser usado no class path também, onde se torna parte do [unnamed module](<#/doc/tutorials/modules/unnamed-module>) assim como plain JARs no class path.

### Caminho do Módulo

O _module path_ é um new concept que se assemelha ao class path: É uma list de artifacts (JARs ou bytecode folders) e directories que contêm artifacts. O module system o usa para localizar required modules que não são encontrados no runtime, então geralmente todos os app, library e framework modules. Ele transforma todos os artifacts no module path em modules, mesmo plain JARs, que são transformados em [automatic modules, o que permite a modularização incremental](<#/doc/tutorials/modules/automatic-module>). Tanto `javac` quanto `java`, bem como outros commands relacionados a modules, entendem e processam o module path.

**Nota lateral:** Esta e a previous section juntas revelaram um possibly surprising behavior do module system: Se um JAR é modular ou não, não determina se ele é tratado como um module! Todos os JARs no class path são tratados como [um single barely-a-module](<#/doc/tutorials/modules/unnamed-module>), todos os JARs no module path são transformados em modules. Isso significa que a person responsável por um project decide quais dependencies acabam como individual modules e quais não (ao contrário dos maintainers das dependencies).

### Resolução de Módulo e Grafo de Módulo

Para lançar um modular app, execute o command `java` com um module path e um chamado _initial module_ - o module que contém o `main` method:

```bash
java --module-path mods -m com.example.app/com.example.app.Main
```

Isso iniciará um process chamado _module resolution_: Começando com o initial module's name, o module system o procurará no module path. Se o encontrar, verificará suas directives `requires` para ver quais modules ele precisa e então repetirá o process para eles. Se não encontrar um module, ele lançará um error naquele momento, informando que uma dependency está missing. Você pode observar este process adicionando a command line option `--show-module-resolution`.

O result deste process é o _module graph_. Seus nodes são modules, suas edges são um pouco mais complicated: Cada directive `requires` gera uma edge entre os dois modules, chamada _readability edge_, onde o requiring module _reads_ o required one. Existem [outras ways de criar edges](<#/doc/tutorials/modules/implied-readability>), mas isso não precisa nos preocupar agora porque não muda nada fundamental.

Se imaginarmos um average Java program, por exemplo, um backend para um web app, podemos visualizar seu module graph: No top encontraremos o initial module, mais abaixo os outros app modules, bem como os frameworks e libraries que eles usam. Em seguida, vêm suas dependencies e, em algum point, os JDK modules com _java.base_ no bottom - continue lendo para detalhes sobre isso.

### Módulo Base

Existe um module para governar todos eles: _java.base_, o chamado _base module_. Ele contém classes como `Class` e `ClassLoader`, packages como `java.lang` e `java.util`, e todo o module system. Sem ele, um program na JVM não pode funcionar e, portanto, ele recebe um status especial:

  * o module system está ciente dele especificamente
  * não há necessidade de colocar `requires java.base` em uma module declaration - uma dependency no base module vem de graça

Então, quando uma section anterior discutiu as dependencies dos vários modules, isso não estava totalmente complete. Todos eles também dependem implicitamente do base module - porque eles têm que. E quando a previous section disse que o module system começa com module resolution, isso também não está 100% correto. A primeira thing que acontece é que, em um profundo quebra-cabeça de galinha e ovo, o module system resolve o base module e se bootstraps.

## Benefícios do Sistema de Módulos

Então, o que você ganha com o trabalho de criar module declarations para seus projetos? Aqui estão os três benefícios mais proeminentes:

  * strong encapsulation
  * reliable configuration
  * scalable platform

### Encapsulamento Forte

Sem modules, toda public class ou member é livre para ser usada por qualquer outra class - não há como tornar algo visible dentro de um JAR, mas não além de seus boundaries. E mesmo a visibilidade non-public não é realmente um deterrent porque sempre há reflection que pode ser usada para invadir private APIs. A reason é que JARs não têm boundaries, eles são apenas containers para o class loader carregar classes.

Modules são diferentes, eles _têm_ um boundary que o compiler e o runtime reconhecem. Um type de um module só pode ser usado se:

  * o type for public (como antes)
  * o package for exported
  * o module que usa o type lê o module que contém o type

Isso significa que o creator de um module tem muito mais control sobre quais types compõem a public API. Não é mais _all public types_, agora é _all public types in exported packages_, o que finalmente nos permite trancar functionality que contém public types que não deveriam ser usados fora de um sub-project.

Isso é obviamente crucial para as JDK APIs em si, cujos developers não precisam mais nos implorar para não usar packages como `sun.*` ou `com.sun.*` (para mais sobre o que aconteceu com essas internal APIs e por que você ainda pode usar `sun.misc.Unsafe`, veja [este article sobre strong encapsulation de JDK internals](<#/doc/tutorials/modules/strong-encapsulation>)). O JDK também não precisa mais depender da manual approach do security manager para prevenir o acesso a security-sensitive types e methods, eliminando assim uma entire class de potential security hazards. Libraries e frameworks também podem se beneficiar de comunicar e impor claramente quais APIs são destinadas a serem public e (presumivelmente) stable e quais são internal.

Application code bases, pequenas e grandes, podem ter certeza de não usar acidentalmente internal APIs de suas dependencies que podem mudar em qualquer patch release. Larger code bases podem se beneficiar ainda mais da criação de multiple modules com strong boundaries. Dessa forma, developers que implementam uma feature podem comunicar claramente a seus colleagues quais partes do código adicionado são destinadas ao uso em outras partes do app e quais são apenas internal scaffolding - não mais uso acidental de uma API que "nunca foi destinada para aquele use case".

Dito tudo isso, se você absolutamente precisa usar internal APIs, do JDK ou de outros modules, você ainda pode com [estas duas command line flags](<#/doc/tutorials/modules/add-exports-opens>), assumindo que você tem control sobre o launch command da application.

### Configuração Confiável

Durante a module resolution, o module system verifica se todas as required dependencies, direct e transitive, estão presentes e reporta um error se algo estiver missing. Mas vai além de apenas verificar a presence.

Não deve haver ambiguity, ou seja, nenhum two artifacts podem alegar que são o mesmo module. Isso é particularmente interesting no case em que two versions do mesmo module estão presentes. Como o module system não tem concept de versions (além de registrá-las como uma string), ele trata isso como um duplicate module. Accordingly, ele reporta um error se encontrar esta situation.

Não deve haver static dependency cycles entre modules. Em run time, é possible e até necessary para modules acessarem uns aos outros (pense em código usando Spring annotations e Spring refletindo sobre esse código), mas estes não devem ser compile dependencies (Spring obviamente não é compilado contra o código sobre o qual reflete).

Packages devem ter uma unique origin, então nenhum two modules podem conter types no mesmo package. Se o fizerem, isso é chamado de _split package_, e o module system se recusará a compilar ou lançar tais configurations.

Esta verification não é airtight, é claro, e é possible que problems se escondam por tempo suficiente para crash uma running application. Se, por exemplo, a wrong version de um module acabar no right place, a application será lançada (todos os required modules estão presentes), mas crashará mais tarde, quando, por exemplo, uma class ou method estiver missing. No entanto, ele detecta uma série de common problems early, reduzindo a chance de que uma application que foi lançada falhe em run time devido a dependency issues.

### Plataforma Escalável

Com o JDK dividido em modules para tudo, desde XML handling até JDBC API, finalmente é possible criar manualmente uma _runtime image_ que contém apenas as JDK features que você precisa e enviá-la com seu app. Se sua code base estiver fully modularized, você pode ir um step além e incluir seus modules nessa image, tornando-a uma _application image_ self-contained que vem com tudo o que precisa, desde seu código até dependencies, JDK APIs e a JVM. [Este article explica como fazer isso.](<#/doc/tutorials/jlink>)
## Leitura Adicional

Agora você tem um entendimento básico do funcionamento e dos benefícios do sistema de módulos e está pronto para explorar muitos outros tópicos para aprofundar seu conhecimento. Os artigos a seguir não precisam ser lidos em ordem - cada um menciona logo no início quais outros você deveria ter lido antes.

Gerenciamento de dependências e API mais sofisticado:

  * [Acesso Reflexivo com Módulos Abertos e Pacotes Abertos](<#/doc/tutorials/modules/opening-for-reflection>)
  * [Dependências Opcionais com `requires static`](<#/doc/tutorials/modules/optional-dependencies>)
  * [Legibilidade Implícita com `requires transitive`](<#/doc/tutorials/modules/implied-readability>)
  * [`exports` e `opens` Qualificados](<#/doc/tutorials/modules/qualified-exports-opens>)
  * [Desacoplando Módulos com Services](<#/doc/tutorials/modules/services>)



De JARs para módulos e para imagens:

  * [Código no Class Path - o Módulo Não Nomeado](<#/doc/tutorials/modules/unnamed-module>)
  * [Modularização Incremental com Módulos Automáticos](<#/doc/tutorials/modules/automatic-module>)
  * [Criando Imagens de Tempo de Execução e Imagens de Aplicação com jlink](<#/doc/tutorials/jlink>)



Conhecimento mais aprofundado do sistema de módulos:

  * [Construindo Módulos na Linha de Comando](<#/doc/tutorials/modules/building>)
  * [Encapsulamento Forte (de Internos do JDK)](<#/doc/tutorials/modules/strong-encapsulation>)
  * [Contornando o Encapsulamento Forte com `--add-exports` e `--add-opens`](<#/doc/tutorials/modules/add-exports-opens>)
  * [Estendendo o Grafo de Módulos com `--add-modules` e `--add-reads`](<#/doc/tutorials/modules/add-modules-reads>)



## Mais Aprendizado

### Neste tutorial

Declarações de Módulos Construindo e Lançando Módulos Benefícios do Sistema de Módulos Leitura Adicional Mais Aprendizado

Última atualização: 14 de setembro de 2021

**Tutorial Atual**

Introdução aos Módulos em Java

➜

**Próximo na Série**

[Acesso Reflexivo com Módulos Abertos e Pacotes Abertos](<#/doc/tutorials/modules/opening-for-reflection>)

**Próximo na Série:** [Acesso Reflexivo com Módulos Abertos e Pacotes Abertos](<#/doc/tutorials/modules/opening-for-reflection>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > Introdução aos Módulos em Java