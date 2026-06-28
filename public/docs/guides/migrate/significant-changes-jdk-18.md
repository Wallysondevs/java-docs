# Mudanças Significativas na Versão JDK 18

## Mudanças Significativas na Versão JDK 18

Consulte as [Notas de Lançamento do JDK 18](<https://www.oracle.com/java/technologies/javase/18-relnote-issues.html#NewFeature>) para descrições adicionais dos novos recursos e aprimoramentos, e a especificação da API no JDK 18.

A seguir estão algumas das atualizações no Java SE 18 e JDK 18:

Ferramentas

  * A nova ferramenta de linha de comando [`jwebserver`](<https://docs.oracle.com/en/java/javase/25/docs/specs/man/jwebserver.html>) permite iniciar um servidor web mínimo que serve arquivos estáticos. Esta ferramenta é útil para prototipagem e testes. Consulte [JEP 408: Simple Web Server](<https://openjdk.java.net/jeps/408>).
  * Uma tag `@snippet` foi adicionada ao Standard Doclet do JavaDoc, o que simplifica a inclusão de código-fonte de exemplo na documentação da API. Consulte [JEP 413: Code Snippets in Java API Documentation](<https://openjdk.java.net/jeps/413>) e [Programmer's Guide to Snippets](<https://docs.oracle.com/en/java/javase/18/code-snippet/index.html>).

Mudanças na Biblioteca

  * UTF-8 é agora o charset padrão para as APIs do Java SE. Com esta mudança, as APIs que dependem do charset padrão se comportarão de forma consistente em todas as implementações, sistemas operacionais, localidades e configurações. Consulte [JEP 400: UTF-8 by Default](<http://openjdk.java.net/jeps/400>) e [Be Aware of the Default Charset](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>).
  * Uma service-provider interface (SPI) é definida para a resolução de nomes de host e endereços, para que `[java.net.InetAddress](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/net/InetAddress.html>)` possa usar resolvedores diferentes do resolvedor integrado da plataforma. Consulte [JEP 418: Internet-Address Resolution SPI](<http://openjdk.java.net/jeps/418>). Consulte também a seção [Specify Mappings from Host Names to IP Addresses](<https://docs.oracle.com/en/java/javase/18/core/java-networking.html#GUID-BB67932A-C2AA-421B-BE62-E1D2BF1C1308>) em Java Platform, Standard Edition Core Libraries para obter informações sobre a propriedade de sistema `jdk.net.hosts.file`, que permite configurar o InetAddress para usar um arquivo `hosts` específico, em vez do resolvedor de todo o sistema, para mapear nomes de host para endereços IP.
  * A reflexão central com method handles foi reimplementada. Isso reduzirá o custo de manutenção e desenvolvimento das APIs `java.lang.reflect` e `java.lang.invoke`. Consulte [JEP 416: Reimplement Core Reflection with Method Handles](<https://openjdk.java.net/jeps/416>).

Recursos de Preview e Módulos Incubadores

Consulte [JEP 12: Preview Features](<http://openjdk.java.net/jeps/12>) para mais informações sobre recursos de preview e [JEP 11: Incubator Modules](<https://openjdk.java.net/jeps/11>) para mais informações sobre módulos incubadores.

  * O recurso de preview Pattern Matching for `switch` Expressions and Statements foi re-previewed nesta versão. Este recurso permite que uma expressão seja testada contra vários padrões, cada um com uma ação específica, para que consultas complexas orientadas a dados possam ser expressas de forma concisa e segura. Consulte [JEP 420: Pattern Matching for switch (Second Preview)](<https://openjdk.java.net/jeps/420>) e [Pattern Matching for switch Expressions and Statements](<https://docs.oracle.com/en/java/javase/18/language/pattern-matching-switch-expressions-and-statements.html>) em Java Platform, Standard Edition Java Language Updates.
  * A Foreign Function and Memory API, que foi introduzida no Java SE 17, permite que programas Java interoperem com código e dados fora do runtime Java. A API é re-incubada nesta versão juntamente com aprimoramentos. Consulte [JEP 419: Foreign Function & Memory API (Second Incubator)](<https://openjdk.java.net/jeps/419>).
  * A Vector API foi introduzida no Java SE 16 como uma API incubadora. Nesta versão, a API é re-incubada com aprimoramentos e melhorias de desempenho. Consulte [JEP 417: Vector API (Third Incubator)](<https://openjdk.java.net/jeps/417>).

APIs, Ferramentas e Componentes Removidos

Para mais detalhes sobre remoções e depreciações, consulte:

  * [Finalization Deprecated for Removal](<#/doc/guides/migrate/migrating-jdk-8-later-jdk-releases>)
  * [APIs Removidas no Java SE 18](<#/doc/guides/migrate/removed-apis>)

Além disso, há atualizações relacionadas à segurança das quais você precisa estar ciente. Consulte [Security Updates in JDK 18](<#/doc/guides/migrate/security-updates>).