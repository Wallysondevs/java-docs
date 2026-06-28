# Usando Agentes JMX

## 4 Usando Agentes JMX

Um agente JMX é uma entidade de gerenciamento que é executada em uma JVM e atua como o elo entre os managed beans (MBeans) e a management application. Os vários componentes de um agente JMX são descritos nas seções a seguir:

  * [MBean Server](<#/doc/guides/jmx/using-jmx-agents>)
  * [Agent Services](<#/doc/guides/jmx/using-jmx-agents>)
  * [Protocol Adaptors and Connectors](<#/doc/guides/jmx/using-jmx-agents>)

### MBean Server

O MBean server é o componente central de um agente JMX. É um registro para objetos em um agente JMX que são expostos a management operations. Um objeto que é registrado no MBean server é visível para as management applications. O MBean server expõe apenas a management interface de um MBean, nunca sua direct object reference.

Qualquer recurso que você deseja gerenciar de fora da JVM do agente deve ser registrado como um MBean no server. O MBean server fornece uma interface padronizada para acessar MBeans dentro da mesma JVM, dando aos objetos locais todos os benefícios de manipular recursos gerenciáveis. MBeans podem ser instanciados e registrados por:

  * Outro MBean
  * O próprio agente
  * Uma remote management application

Ao registrar um MBean, você deve atribuir a ele um unique object name. Uma management application usa o object name para identificar o objeto no qual ela deve realizar uma management operation. As operações disponíveis em MBeans incluem:

  * Descobrir a management interface de MBeans
  * Ler e escrever seus attribute values
  * Realizar operations definidas pelos MBeans
  * Obter notifications emitidas por MBeans
  * Consultar MBeans usando seu object name ou seus attribute values

### Agent Services

Agent services são objetos que podem realizar management operations nos MBeans que são registrados no MBean server. Ao incluir inteligência de gerenciamento dentro do agente, JMX permite que você construa soluções de gerenciamento mais poderosas. Agent services também podem ser fornecidos por MBeans, permitindo que eles e sua funcionalidade sejam controlados através do MBean server. [Java Management Extensions (JMX) Specification, version 1.4](<https://docs.oracle.com/javase/8/docs/technotes/guides/jmx/JMX_1_4_specification.pdf>) define os seguintes agent services:

  * Monitors: Monitora o valor numérico ou de string dos MBean attributes e pode notificar outros objetos sobre vários tipos de alterações.
  * Timers: Timers fornecem um mecanismo de agendamento e podem enviar notifications em intervalos predeterminados.
  * Relation service: O relation service define associações entre MBeans e mantém a consistência da relation.

### Protocol Adaptors and Connectors

Protocol adaptors e connectors tornam os agentes acessíveis a partir de remote management applications. Eles fornecem uma visão, através de um protocolo específico, dos MBeans que são instanciados e registrados no MBean server. Eles permitem que uma management application fora da JVM possa:

  * Obter ou definir attributes de MBeans existentes
  * Realizar operations em MBeans existentes
  * Instanciar e registrar novos MBeans
  * Registrar-se para e receber notifications emitidas por MBeans

Consequentemente, para que um agente JMX seja gerenciável, ele deve incluir pelo menos um protocol adaptor ou connector. A plataforma Java SE inclui o standard Remote Method Invocation (RMI) connector. Um agente pode incluir um ou mais protocol adaptors e connectors, permitindo que ele seja gerenciado e monitorado remotamente através de diferentes protocolos simultaneamente.

#### Protocol Adaptors

Protocol adaptors fornecem uma management view do agente JMX através de um dado protocolo. Eles adaptam as operations de MBeans e do MBean server em uma representação no protocolo dado, e possivelmente em um information model diferente. A plataforma Java SE não inclui nenhum protocol adaptor como padrão.

Management applications que se conectam a um protocol adaptor são geralmente específicas do protocolo dado. Este é tipicamente o caso para legacy management solutions que dependem de um management protocol específico. Elas acessam o agente JMX não através de uma remote representation do MBean server, mas através de operations que são mapeadas para as do MBean server.

#### Connectors

Connectors são usados para conectar um agente a uma remote management application habilitada para a tecnologia JMX, ou seja, uma management application desenvolvida usando os distributed services da JMX specification. Este tipo de comunicação envolve um connector server no agente e um connector client no manager.

Esses componentes transmitem management operations de forma transparente ponto a ponto sobre um protocolo específico. A JMX Remote API fornece uma remote interface para o MBean server através da qual a management application pode realizar operations. Um connector é específico para um dado protocolo, mas a management application pode usar qualquer connector indiferentemente porque a remote interface é a mesma.

Consulte [Using JMX Connectors to Manage Resources Remotely](<#/doc/guides/jmx/using-jmx-connectors-manage-resources-remotely>) para mais informações sobre standard JMX connectors.