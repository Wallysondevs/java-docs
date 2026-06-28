# Arquitetura da Tecnologia JMX

## 2 Arquitetura da Tecnologia JMX

A tecnologia Java Management Extensions (JMX) fornece uma API padrão para o gerenciamento e monitoramento de recursos. A API inclui acesso remoto, para que uma aplicação de gerenciamento remoto possa gerenciar e monitorar aplicações, sistemas e redes.

Este capítulo descreve a arquitetura JMX nas seguintes seções:

  * [Visão Geral da Arquitetura](<#/doc/guides/jmx/jmx-technology-architecture>)


  * [Instrumentando Recursos Usando MBeans](<#/doc/guides/jmx/jmx-technology-architecture>)


  * [Criando um Agente JMX](<#/doc/guides/jmx/jmx-technology-architecture>)


  * [Gerenciando Recursos Remotamente](<#/doc/guides/jmx/jmx-technology-architecture>)



### Visão Geral da Arquitetura

A tecnologia JMX foi desenvolvida através do Java Community Process (JCP) como duas Java Specification Requests (JSRs) intimamente relacionadas:

  * JSR 3: Java Management Extensions (JMX) Specification - define os níveis de instrumentação e agente
  * JSR 160: Java Management Extensions (JMX) Remote API - define o nível de gerenciamento remoto



A tabela a seguir mostra os níveis na arquitetura de gerenciamento.

Nível | Descrição
---|---
Instrumentação | Recursos, como aplicações, dispositivos ou serviços, são instrumentados usando objetos Java chamados Managed Beans (MBeans). MBeans expõem suas interfaces de gerenciamento, compostas por atributos e operações, através de um agente JMX para gerenciamento e monitoramento remoto.
Agente | O componente principal de um agente JMX é o MBean server. Este é um servidor de objetos gerenciados central no qual os MBeans são registrados. Um agente JMX também inclui um conjunto de serviços para lidar com MBeans. O agente JMX controla diretamente os recursos e os disponibiliza para agentes de gerenciamento remoto.
Gerenciamento remoto | Adaptadores de protocolo e conectores padrão tornam um agente JMX acessível a partir de aplicações de gerenciamento remoto fora da Java Virtual Machine (JVM) do agente.

### Instrumentando Recursos Usando MBeans

Para gerenciar recursos usando a tecnologia JMX, você deve primeiro instrumentar os recursos na linguagem de programação Java. Você pode usar objetos Java conhecidos como MBeans para implementar o acesso à instrumentação de recursos. Os MBeans devem seguir os padrões de design e interfaces definidos na JMX Specification para garantir que todos os MBeans forneçam a instrumentação de recursos gerenciados de forma padronizada.

Depois que um recurso é instrumentado por MBeans, ele pode ser gerenciado através de um agente JMX. Os MBeans não exigem conhecimento do agente JMX com o qual operam.

Os MBeans são projetados para serem flexíveis, simples e fáceis de implementar. Desenvolvedores de aplicações, sistemas e redes podem tornar seus produtos gerenciáveis de forma padrão sem investir em sistemas de gerenciamento complexos. Recursos existentes podem ser tornados gerenciáveis com o mínimo de esforço.

Além disso, o nível de instrumentação da JSR 3: Java Management Extensions (JMX) Specification especifica um mecanismo de notificação que permite aos MBeans gerar e propagar eventos de notificação para componentes dos outros níveis.

### Criando um Agente JMX

Um agente JMX é um agente de gerenciamento padrão que controla diretamente os recursos e os disponibiliza para aplicações de gerenciamento remoto. Um agente JMX geralmente está localizado no mesmo sistema que os recursos que ele controla, mas isso não é um requisito.

O componente central de um agente JMX é o MBean server, um servidor de objetos gerenciados no qual os MBeans são registrados. Um agente JMX também inclui um conjunto de serviços para gerenciar MBeans e pelo menos um adaptador ou conector de comunicação para permitir o acesso por uma aplicação de gerenciamento.

Ao implementar um agente JMX, você não precisa conhecer a semântica ou as funções dos recursos que o agente será usado para gerenciar. Na verdade, um agente JMX nem precisa saber quais recursos ele atenderá, porque qualquer recurso instrumentado em conformidade com a JMX Specification pode usar qualquer agente JMX que ofereça os serviços de que necessita. Além disso, o agente não precisa conhecer as funções das aplicações de gerenciamento que o acessarão.

### Gerenciando Recursos Remotamente

O MBean server depende de adaptadores de protocolo e conectores para tornar um agente JMX acessível a partir de aplicações de gerenciamento fora da JVM do agente. Cada adaptador fornece uma visão, através de um protocolo específico, de todos os MBeans registrados no MBean server.

Os conectores fornecem uma interface do lado do gerenciador que lida com a comunicação entre o gerenciador e o agente JMX. Cada conector fornece a mesma interface de gerenciamento remoto através de um protocolo diferente. Quando uma aplicação de gerenciamento remoto usa esta interface, ela pode se conectar a um agente JMX de forma transparente através da rede, independentemente do protocolo.

A tecnologia JMX fornece uma solução padrão para exportar a instrumentação da JMX API para aplicações remotas, baseada em Remote Method Invocation (RMI). Consulte [Versões da Tecnologia JMX](<#/doc/guides/jmx/jmx-technology-versions>) para obter mais informações.

A seção JMX Remote API da especificação descreve como você pode anunciar e encontrar agentes JMX usando infraestruturas de descoberta e lookup existentes. Para exemplos, consulte [Tutorial da Tecnologia Java Management Extensions (JMX)](<#/doc/guides/jmx/java-management-extensions-jmx-technology-tutorial>). A JMX Specification não define seu próprio serviço de descoberta e lookup. O uso de serviços de descoberta e lookup existentes é opcional. Alternativamente, você pode codificar os endereços de seus agentes JMX na forma de URLs e, em seguida, comunicar esses URLs ao gerenciador.