# Visão Geral do Java Access Bridge

## 2 Visão Geral do Java Access Bridge

Java Access Bridge é uma tecnologia que permite que aplicações Java que implementam a Java Accessibility API sejam visíveis para tecnologias assistivas em sistemas Microsoft Windows.

Java Access Bridge é uma tecnologia que expõe a [Java Accessibility API](<https://docs.oracle.com/en/java/javase/25/docs/api/java.desktop/javax/accessibility/package-summary.html>) em uma biblioteca de vínculo dinâmico (DLL) do Microsoft Windows, permitindo que aplicações Java que implementam a Java Accessibility API sejam visíveis para tecnologias assistivas em sistemas Microsoft Windows.

Para que as tecnologias assistivas existentes disponíveis em sistemas Microsoft Windows forneçam acesso a aplicações Java, elas precisam de alguma forma de se comunicar com a Java Accessibility API. O Java Access Bridge suporta essa comunicação.

Uma aplicação de tecnologia assistiva executada no Microsoft Windows (por exemplo, um leitor de tela) se comunica com as DLLs do Java Access Bridge, que por sua vez se comunicam com a Java Virtual Machine através das bibliotecas Java do Java Access Bridge. Essas bibliotecas Java se comunicam com a Java Accessibility API. A Java Accessibility API coleta informações sobre o que está acontecendo na aplicação Java, as quais ela encaminha para o leitor de tela através do Java Access Bridge.