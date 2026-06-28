# Usando Conectores JMX para Gerenciar Recursos Remotamente

## 5 Usando Conectores JMX para Gerenciar Recursos Remotamente

As seções Java Management Extensions Instrument Specification e Agent Specification da [Java Management Extensions (JMX) Specification, versão 1.4](<https://docs.oracle.com/javase/8/docs/technotes/guides/jmx/JMX_1_4_specification.pdf>) definem o conceito de conectores. Um conector torna um servidor MBean da tecnologia JMX acessível a clientes remotos baseados na tecnologia Java. A extremidade do cliente de um conector exporta essencialmente a mesma interface que o servidor MBean.

Um conector consiste em um cliente de conector e um servidor de conector. O servidor de conector é anexado a um servidor MBean e escuta por requisições de conexão de clientes. O cliente de conector estabelece uma conexão com o servidor de conector. Um cliente de conector geralmente está em uma JVM diferente do servidor de conector, e frequentemente executa em uma máquina diferente.

Muitas implementações de conector são possíveis. Em particular, existem muitas possibilidades para o protocolo usado para se comunicar através de uma conexão entre cliente e servidor.

Um servidor de conector geralmente possui um endereço, usado para estabelecer conexões entre clientes de conector e o servidor de conector. Alternativamente, alguns conectores podem fornecer stubs de conexão para estabelecer conexões. A forma como as conexões são estabelecidas depende da tecnologia de descoberta e lookup que você usa. Veja [Discovery and Lookup Services](<#/doc/guides/jmx/discovery-and-lookup-services>).

### Conector RMI

A JMX Remote API define um protocolo padrão baseado em RMI. O conector RMI deve estar presente em toda implementação da JMX Remote API.

O conector RMI suporta o transporte Java Remote Method Protocol (JRMP).

O conector RMI sobre JRMP fornece um mecanismo simples para proteger e autenticar a conexão entre um cliente e um servidor. Este mecanismo oferece um nível básico de segurança para ambientes que utilizam o conector RMI. Observe que o conector JMXMP genérico oferece um nível de segurança mais avançado.

Você pode melhorar a segurança do conector RMI sobre JRMP usando uma RMI socket factory para que a conexão entre o cliente e o servidor utilize o Secure Socket Layer (SSL).

Nota:

JMX possui um filtro embutido para limitar um conjunto de classes permitidas a serem enviadas como parâmetros de desserialização via RMI para o servidor. Especifique o padrão do filtro com a propriedade de gerenciamento `com.sun.management.jmxremote.serial.filter.pattern` no arquivo `$JAVA_HOME/conf/management/management.properties`. Veja [Built-in Filters](<#/>) em Java Platform, Standard Edition Core Libraries para mais informações.

### Protocolos Definidos pelo Usuário

A JMX Remote API não define um conector para cada protocolo. Você pode implementar um conector baseado em um protocolo que não está definido na JMX Remote API. Por exemplo, você pode implementar um conector baseado em um protocolo que usa HTTP/S. A JMX Specification descreve como implementar um conector baseado em um protocolo definido pelo usuário.