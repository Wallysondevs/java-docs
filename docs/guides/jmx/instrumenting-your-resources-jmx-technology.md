# Instrumentando Seus Recursos para a Tecnologia JMX

## 3 Instrumentando Seus Recursos para a Tecnologia JMX   
  
Este capítulo descreve os conceitos por trás da instrumentação de recursos para gerenciamento usando a tecnologia JMX nas seguintes seções:

  * [Recursos Gerenciáveis](<#/doc/guides/jmx/instrumenting-your-resources-jmx-technology>)
  * [Managed Beans (MBeans)](<#/doc/guides/jmx/instrumenting-your-resources-jmx-technology>)
  * [Instrumentação da JVM](<#/doc/guides/jmx/instrumenting-your-resources-jmx-technology>)



### Recursos Gerenciáveis

Diferentes tipos de recursos podem ser gerenciados usando a tecnologia JMX, por exemplo, uma aplicação, uma implementação de um serviço, um dispositivo ou um usuário. Para que um determinado recurso seja gerenciado pela tecnologia JMX, ele deve ser desenvolvido na linguagem Java, ou pelo menos oferecer um wrapper em linguagem Java. O recurso também deve ser instrumentado por um ou mais objetos Java conhecidos como managed beans (MBeans), em conformidade com a JMX Specification.

Desenvolvedores de aplicações e dispositivos podem escolher a granularidade dos objetos que são instrumentados como MBeans. Um MBean pode representar o menor objeto em uma aplicação, ou pode representar a aplicação inteira. Componentes de aplicação projetados com sua interface de gerenciamento em mente podem tipicamente ser escritos como MBeans. MBeans podem ser usados como wrappers para código legado sem uma interface de gerenciamento ou como proxies para código com uma interface de gerenciamento legada.

### Managed Beans (MBeans)

Os objetos Java que implementam recursos e sua instrumentação são chamados de managed beans (MBeans). MBeans devem seguir os padrões de design e interfaces definidos na [Java Management Extensions (JMX) Specification, version 1.4](<https://docs.oracle.com/javase/8/docs/technotes/guides/jmx/JMX_1_4_specification.pdf>) para garantir que todos os MBeans forneçam a instrumentação de recursos gerenciados de forma padronizada. 

A instrumentação de um determinado recurso é fornecida por um ou mais MBeans que são padrão ou dinâmicos. Standard MBeans são objetos Java que estão em conformidade com certos padrões de design derivados do modelo de componente JavaBeans. Dynamic MBeans estão em conformidade com uma interface específica que oferece mais flexibilidade em tempo de execução. MXBeans referenciam apenas um conjunto predefinido de tipos. 

A instrumentação de um recurso permite que ele seja gerenciável através do nível de agente descrito em [Usando Agentes JMX](<#/doc/guides/jmx/using-jmx-agents>). MBeans não exigem conhecimento do agente JMX com o qual operam. 

MBeans são projetados para serem flexíveis, simples e fáceis de implementar. Objetos existentes podem ser facilmente evoluídos para produzir standard MBeans ou envolvidos como dynamic MBeans, tornando assim os recursos existentes gerenciáveis com o mínimo esforço. Com MBeans, desenvolvedores de aplicações, serviços ou dispositivos podem tornar seus produtos gerenciáveis de forma padrão sem ter que entender ou investir em sistemas de gerenciamento complexos. 

O nível de instrumentação especifica um mecanismo de notificação que permite aos MBeans gerar e propagar eventos de notificação para componentes dos outros níveis.

A interface de gerenciamento de um MBean consiste em:

  * Atributos nomeados e tipados que podem ser lidos e/ou escritos
  * Operações nomeadas e tipadas que podem ser invocadas
  * Notificações tipadas que podem ser emitidas pelo MBean



A classe Java de um standard MBean expõe o recurso a ser gerenciado diretamente através de seus atributos e operações. Atributos são entidades internas que são expostas através de métodos getter e setter. Operações são os outros métodos da classe que estão disponíveis para os gerentes. Todos esses métodos são métodos estáticos na interface MBean e são visíveis para um agente JMX através de introspecção. Esta é a maneira mais direta de tornar um novo recurso gerenciável.

Um dynamic MBean define sua interface de gerenciamento em tempo de execução. Por exemplo, um MBean de configuração poderia determinar os nomes e tipos dos atributos que expõe analisando um arquivo XML.

Um MXBean é um tipo de MBean que fornece uma maneira simples de codificar um MBean que referencia apenas um conjunto predefinido de tipos. Dessa forma, você pode ter certeza de que seu MBean será utilizável por qualquer cliente, incluindo clientes remotos, sem qualquer requisito de que o cliente tenha acesso a classes específicas do modelo que representam os tipos de seus MBeans.

### Instrumentação da JVM

A JVM é altamente instrumentada usando a tecnologia JMX. Você pode facilmente iniciar um agente JMX para acessar a instrumentação JVM integrada e, assim, monitorar e gerenciar a JVM remotamente pela tecnologia JMX.

Para saber mais sobre como usar a tecnologia JMX para monitorar e gerenciar a JVM, consulte o Java Platform, Standard Edition Monitoring and Management Guide.