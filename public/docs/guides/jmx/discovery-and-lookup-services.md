# Serviços de Descoberta e Consulta

## 6 Serviços de Descoberta e Consulta

A [Especificação Java Management Extensions (JMX), versão 1.4](<https://docs.oracle.com/javase/8/docs/technotes/guides/jmx/JMX_1_4_specification.pdf>) descreve como você pode anunciar e encontrar agentes da API JMX usando infraestruturas de descoberta e consulta existentes. A especificação não define nenhuma API de descoberta e consulta específica para a tecnologia JMX.

Este capítulo fornece um breve resumo das infraestruturas de descoberta e consulta existentes que você pode usar com a tecnologia JMX.

### Primeiros Passos com Serviços de Consulta

Agentes JMX e clientes JMX podem usar serviços de consulta. Uma única JVM pode conter muitos agentes JMX e/ou clientes JMX.

Um agente JMX é uma aplicação de servidor lógica composta pelas seguintes características:

  * Um servidor de managed bean (MBean)
  * Um ou mais servidores de conector JMX que permitem que clientes remotos acessem os MBeans contidos nesse servidor MBean

Um cliente JMX é uma aplicação cliente lógica que abre uma conexão cliente com um agente JMX.

O [Tutorial da Tecnologia Java Management Extensions (JMX)](<#/doc/guides/jmx/java-management-extensions-jmx-technology-tutorial>) demonstra como usar serviços de consulta para anunciar e encontrar agentes JMX.

Nota:

O uso de serviços de descoberta e consulta existentes é opcional. Alternativamente, você pode codificar os endereços dos seus agentes da API JMX na forma de URLs e comunicar essas URLs ao gerenciador.

Usando o Service Location Protocol (SLP)

O Service Location Protocol (SLP) fornece uma estrutura que permite que aplicações de rede descubram a existência, localização e configuração de serviços em rede em ambientes corporativos.

Os passos a seguir resumem o procedimento definido na Especificação JMX para usar o serviço de consulta SLP para anunciar e encontrar agentes JMX:

  * O agente JMX cria um ou mais servidores de conector JMX.
  * Para cada conector exposto, o agente JMX registra o endereço com o serviço de consulta SLP, possivelmente fornecendo atributos adicionais que qualificam o agente e/ou o conector, e que podem ser usados como filtros.
  * O cliente JMX consulta o serviço de consulta SLP e recupera um ou mais endereços que correspondem à consulta.
  * Finalmente, o cliente JMX obtém um conector que está conectado ao servidor identificado por um endereço recuperado.

Na Especificação JMX, a seção JMX Remote API Specification define esquemas de URL que são compatíveis com o protocolo SLP. A especificação também define atributos de consulta SLP obrigatórios e opcionais que são fornecidos no momento do registro.

Usando a API Java Naming and Directory Interface (JNDI) com um Backend LDAP

A API Java Naming and Directory Interface (JNDI) é uma extensão padrão da plataforma Java. Ela fornece às aplicações habilitadas para tecnologia Java uma interface unificada para múltiplos serviços de nomes e diretórios.

A Especificação JMX descreve como um servidor LDAP é usado para armazenar e recuperar informações sobre conectores JMX que são expostos por agentes JMX.

Os passos a seguir resumem o procedimento definido na Especificação JMX para usar o serviço de consulta JNDI:

  * O agente JMX cria um ou mais servidores de conector JMX.
  * Para cada conector a ser exposto, o agente JMX registra o endereço com o serviço de consulta JNDI, possivelmente fornecendo atributos adicionais que qualificam o agente e/ou o conector, e que podem ser usados como filtros.
  * O cliente JMX consulta o serviço de consulta JNDI e recupera um ou mais endereços que correspondem à consulta.
  * Finalmente, o cliente JMX obtém um conector que está conectado ao servidor identificado por um endereço recuperado.

Na Especificação JMX, a seção JMX Remote API Specification define um esquema LDAP para registrar endereços e explica como um cliente pode descobrir um agente registrado. A especificação também define um mecanismo de lease.