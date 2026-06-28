# Java Accessibility Overview

## 1 Java Accessibility Overview

Java SE fornece Java Access Bridge, Java Accessibility API (JAAPI) e Java Accessibility Utilities para permitir que você crie aplicações acessíveis.

Tópicos

  * [Java Access Bridge](<#/doc/guides/access/java-accessibility-overview>)
  * [Java Accessibility API](<#/doc/guides/access/java-accessibility-overview>)
  * [Java Accessibility Utilities](<#/doc/guides/access/java-accessibility-overview>)
  * [Pluggable Look and Feel](<#/doc/guides/access/java-accessibility-overview>)

Java Access Bridge

Java Access Bridge permite que certas aplicações Java sejam visíveis para tecnologias assistivas no Microsoft Windows. Consulte [Habilitando e Testando o Java Access Bridge](<#/doc/guides/access/enabling-and-testing-java-access-bridge>).

Java Accessibility API

A Java Accessibility API (JAAPI), contida no package [javax.accessibility](<https://docs.oracle.com/en/java/javase/25/docs/api/java.desktop/javax/accessibility/package-summary.html>), é uma das partes centrais das Java Foundation Classes (JFC). As JFCs são um conjunto abrangente de componentes de interface gráfica do usuário e serviços de base projetados para simplificar a implantação de aplicações de Internet, intranet e desktop. A JAAPI permite que você crie aplicações Java que são acessíveis a pessoas com deficiência. Aplicações Java acessíveis são compatíveis com tecnologias assistivas, como leitores de tela, lupas de tela, sistemas de reconhecimento de fala e displays braille atualizáveis. A JAAPI disponibiliza informações de componentes GUI para tecnologias assistivas, oferecendo aos usuários apresentação e controle alternativos de aplicações Java.

O suporte para JAAPI é integrado aos componentes Swing; consulte [Como Suportar Tecnologias Assistivas](<https://docs.oracle.com/javase/tutorial/uiswing/misc/access.html>) nos Java Tutorials (Java SE 8 e anteriores).

Java Accessibility Utilities

Java Accessibility Utilities, que está contido no package [com.sun.java.accessibility.util](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.accessibility/com/sun/java/accessibility/util/package-summary.html>), é um conjunto de utility classes que ajudam tecnologias assistivas a fornecer acesso a GUI toolkits que implementam a Java Accessibility API. Java Accessibility Utilities monitoram eventos relacionados a UI components. Eles também ajudam tecnologias assistivas a obter informações adicionais sobre uma GUI, como a posição atual do mouse, ou a window que atualmente tem foco. Consulte [Visão Geral das Java Accessibility Utilities](<#/doc/guides/access/java-accessibility-utilities-overview>).

Pluggable Look and Feel

As Java Foundation Classes implementam uma arquitetura Pluggable Look and Feel. Esta arquitetura permite que manifestações não visuais de uma user interface substituam ou aprimorem a apresentação visual de uma aplicação. A expressão da user interface é separada da estrutura e dos dados subjacentes de cada component individual. Isso é realizado separando a user interface do component de seu model. O model de um component é a estrutura que encapsula o estado e as informações que são apresentadas ao usuário pela user interface. Para mais informações sobre esta arquitetura, consulte [Sobre JFC e Swing](<https://docs.oracle.com/javase/tutorial/uiswing/start/about.html>) nos Java Tutorials (Java SE 8 e anteriores).