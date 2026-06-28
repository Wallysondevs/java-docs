# Introdução à Tecnologia JMX

## 1 Introdução à Tecnologia JMX

Se você já está familiarizado com a tecnologia Java Management Extensions (JMX), consulte [Versões da Tecnologia JMX](<#/doc/guides/jmx/jmx-technology-versions>) para obter informações sobre a versão.

A tecnologia JMX oferece uma maneira simples e padronizada de gerenciar recursos como aplicações, dispositivos e serviços. Como a tecnologia JMX é dinâmica, você pode usá-la para monitorar e gerenciar recursos à medida que são criados, instalados e implementados. Você também pode usar a tecnologia JMX para monitorar e gerenciar a Java Virtual Machine (Java VM).

A tecnologia JMX foi desenvolvida através do Java Community Process (JCP) como duas Java Specification Requests (JSRs) intimamente relacionadas:

  * JSR 3: Java Management Extensions (JMX) Specification
  * JSR 160: Java Management Extensions (JMX) Remote API

As JSRs são definidas pela documentação da API que é gerada pela ferramenta JavaDoc, e na Java Management Extensions (JMX) Specification, versão 1.4 (JMX Specification).

Como o nome indica, a JMX Remote API adiciona capacidades remotas à JMX Specification, permitindo que você monitore e gerencie aplicações, sistemas e redes remotamente. Neste guia, o termo tecnologia JMX é usado para descrever tanto a JMX Specification quanto a JMX Remote API.

Este capítulo apresenta a tecnologia JMX nas seguintes seções:

  * [O Que É a Tecnologia JMX?](<#/doc/guides/jmx/introduction-jmx-technology>)
  * [Por Que Usar a Tecnologia JMX?](<#/doc/guides/jmx/introduction-jmx-technology>)

### O Que É a Tecnologia JMX?

A JMX Specification define na linguagem de programação Java uma arquitetura, os padrões de design, as APIs e os serviços para gerenciamento e monitoramento de aplicações e redes. A tecnologia Java Management Extensions (JMX) é uma parte padrão da Java Platform, Standard Edition (plataforma Java SE).

Ao usar a tecnologia JMX, um ou mais objetos Java conhecidos como Managed Beans (MBeans) instrumentarão um recurso especificado. Esses MBeans são registrados em um servidor de objetos gerenciados central, conhecido como MBean server. O MBean server atua como um agente de gerenciamento e pode ser executado na maioria dos dispositivos habilitados para a linguagem de programação Java.

A especificação define agentes JMX que você pode usar para gerenciar recursos que são instrumentados em conformidade com a especificação. Um agente JMX consiste em um MBean server, no qual os MBeans são registrados, e um conjunto de serviços para lidar com MBeans. Os agentes JMX controlam diretamente os recursos e os disponibilizam para aplicações de gerenciamento remoto.

A forma como os recursos são instrumentados é completamente independente da infraestrutura de gerenciamento. Os recursos podem, portanto, ser tornados gerenciáveis independentemente de como suas aplicações de gerenciamento são implementadas.

A tecnologia JMX define conectores padrão (JMX connectors) que permitem acessar agentes JMX a partir de aplicações de gerenciamento remoto. Os JMX connectors usam diferentes protocolos para fornecer a mesma interface de gerenciamento. Uma aplicação de gerenciamento pode gerenciar recursos de forma transparente, independentemente do protocolo de comunicação utilizado. Os agentes JMX podem ser usados por sistemas e aplicações que não são compatíveis com a JMX Specification, mas que suportam agentes JMX.

### Por Que Usar a Tecnologia JMX?

A tecnologia JMX oferece aos desenvolvedores Java um meio flexível para instrumentar código Java, criar agentes Java inteligentes, implementar middleware e gerentes de gerenciamento distribuídos e integrar essas soluções de forma suave em sistemas de gerenciamento e monitoramento existentes.

  * A tecnologia JMX permite o gerenciamento de aplicações Java sem grandes investimentos: Um agente de tecnologia JMX pode ser executado na maioria dos dispositivos habilitados para a tecnologia Java, assim as aplicações Java podem se tornar gerenciáveis com pouco impacto em seu design. Uma aplicação Java precisa incorporar um servidor de objetos gerenciados e disponibilizar parte de sua funcionalidade como um ou vários managed beans (MBeans) registrados no servidor de objetos; isso é tudo o que é preciso para se beneficiar da infraestrutura de gerenciamento.
  * A tecnologia JMX oferece uma maneira padrão de gerenciar aplicações, sistemas e redes baseados na tecnologia Java: Por exemplo, o Java Platform, Enterprise Edition (Java EE) 5 Application Server está em conformidade com a arquitetura JMX e, consequentemente, pode ser gerenciado usando a tecnologia JMX.
  * A tecnologia JMX pode ser usada para gerenciamento "out-of-the-box" da JVM: A JVM é altamente instrumentada usando a tecnologia JMX. Você pode iniciar um agente JMX para acessar a instrumentação integrada da JVM e para monitorar e gerenciar a JVM remotamente.
  * A tecnologia JMX oferece uma arquitetura de gerenciamento escalável e dinâmica: Cada serviço de agente JMX é um módulo independente que pode ser conectado ao agente de gerenciamento. Essa abordagem baseada em componentes significa que as soluções JMX podem escalar de dispositivos de pequena pegada a grandes centrais de telecomunicações e além. A JMX Specification fornece um conjunto de serviços de agente centrais. Serviços adicionais podem ser desenvolvidos e carregados, descarregados ou atualizados dinamicamente na infraestrutura de gerenciamento.
  * A tecnologia JMX aproveita as tecnologias Java padrão existentes: Quando necessário, a JMX Specification faz referência a especificações Java existentes, por exemplo, o Java Naming and Directory Interface (JNDI).