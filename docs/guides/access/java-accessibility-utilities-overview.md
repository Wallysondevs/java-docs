# Visão Geral dos Utilitários de Acessibilidade Java

## 7 Visão Geral dos Utilitários de Acessibilidade Java

Para fornecer acesso a uma aplicação Java, uma tecnologia assistiva requer mais do que a Java Accessibility API; ela também requer suporte para localizar objetos de interface de usuário (UI) que implementam a Java Accessibility API, carregar o suporte da tecnologia assistiva na JVM e rastrear eventos. Os Java Accessibility Utilities fornecem essa assistência.

Os Java Accessibility Utilities, contidos no pacote [com.sun.java.accessibility.util](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.accessibility/com/sun/java/accessibility/util/package-summary.html>), fornecem o suporte necessário para que tecnologias assistivas localizem e consultem objetos de UI dentro de uma aplicação Java em execução em uma JVM. Ele também oferece suporte para a instalação de event listeners nesses objetos. Esses event listeners permitem que objetos de UI saibam sobre eventos específicos que ocorrem em outros objetos de UI usando a abordagem peer-to-peer definida pelo modelo de delegação de eventos. Este pacote é composto pelas seguintes partes principais:

  * [Informações Chave sobre Aplicações Java](<#/doc/guides/access/java-accessibility-utilities-overview>)
  * [Carregamento Automático de Tecnologias Assistivas](<#/doc/guides/access/java-accessibility-utilities-overview>)
  * [Suporte a Eventos](<#/doc/guides/access/java-accessibility-utilities-overview>)

### Informações Chave sobre Aplicações Java

O pacote [com.sun.java.accessibility.util](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.accessibility/com/sun/java/accessibility/util/package-summary.html>) contém métodos para recuperar informações chave sobre aplicações Java em execução em uma JVM. Este suporte fornece uma lista das janelas de nível superior de todas as aplicações Java; uma arquitetura de event listener para ser informado quando janelas de nível superior aparecem (e desaparecem); e meios para localizar a janela que tem o foco de entrada, localizar a posição do mouse e inserir eventos na fila de eventos do sistema.

### Carregamento Automático de Tecnologias Assistivas

Para que uma tecnologia assistiva funcione com uma aplicação Java, carregue-a na mesma JVM da aplicação Java à qual ela está fornecendo acesso. Isso é feito através do uso da propriedade `assistive_technologies`; veja [Carregando Tecnologias Assistivas](<#/doc/guides/access/accessibility-properties>). Este suporte está na classe [EventQueueMonitor](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.accessibility/com/sun/java/accessibility/util/EventQueueMonitor.html>).

### Suporte a Eventos

Os Java Accessibility Utilities incluem três classes para monitorar eventos na Java Virtual Machine. A primeira classe, AWTEventMonitor, fornece uma maneira de monitorar todos os eventos AWT em todos os componentes AWT em execução na JVM. Esta classe essencialmente fornece monitoramento de eventos AWT em todo o sistema, registrando um listener individual para cada tipo de evento AWT em cada componente AWT que suporta esse tipo de listener. Assim, uma tecnologia assistiva pode registrar um "Focused listener" com AWTEventMonitor, que por sua vez registrará um "Focused listener" com cada componente AWT em cada aplicação Java na JVM. Esses listeners individuais encaminharão os eventos que eles detectam para a tecnologia assistiva que registrou o listener com AWTEventMonitor em primeiro lugar. Assim, sempre que um componente ganha ou perde o foco (por exemplo, o usuário pressiona a tecla Tab), a tecnologia assistiva será notificada.

A segunda classe, SwingEventMonitor, estende AWTEventMonitor para fornecer suporte adicional para monitorar os eventos Swing suportados pelos componentes Swing. Como SwingEventMonitor estende AWTEventMonitor, não há necessidade de usar ambas as classes se você estiver usando SwingEventMonitor em sua tecnologia assistiva.

A terceira classe, AccessibilityEventMonitor, fornece suporte para eventos de mudança de propriedade em objetos Accessible. Quando uma tecnologia assistiva solicita notificação de eventos de mudança de propriedade Accessible usando AccessibilityEventMonitor, o AccessibilityEventMonitor registrará automaticamente Accessible property change listeners em todos os componentes. Além disso, ele detectará quando os componentes são adicionados e removidos da hierarquia de componentes e adicionará e removerá os property change listeners de acordo. Quando uma mudança de propriedade Accessible ocorre em qualquer um dos componentes, o AccessibilityEventMonitor notificará a tecnologia assistiva.