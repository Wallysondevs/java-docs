# Java Discovery Protocol (JDP)

## 5 Java Discovery Protocol (JDP)

O Java Discovery Protocol (JDP) é um protocolo que permite que tecnologias, em particular, o Java Mission Control e o Java Flight Recorder, descubram JVMs gerenciáveis na mesma sub-rede de rede.

Uma JVM gerenciável é aquela que tem o agente Java Management Extensions (JMX) em execução. O JDP é baseado em multicast e funciona como um farol; ele transmite a URL do serviço JMX (veja a classe [JMXServiceURL](<https://docs.oracle.com/en/java/javase/25/docs/api/java.management/javax/management/remote/JMXServiceURL.html>)) necessária para se conectar ao agente JMX externo. Isso permite que as tecnologias detectem JVMs que falharam ou não estão mais disponíveis para monitoramento.

Habilitando e Configurando o JDP

Para habilitar o JDP, especifique a seguinte opção na linha de comando ao iniciar uma aplicação Java:
```
    -Dcom.sun.management.jmxremote.autodiscovery=true
```

Nota:

Habilitar o JDP não afeta a segurança JMX. Para habilitar e configurar a segurança JMX, consulte [Monitoramento e Gerenciamento Usando a Tecnologia JMX](<#/doc/guides/management/monitoring-and-management-using-jmx-technology>).

[Tabela 5-1](<#/doc/guides/management/java-discovery-protocol>) descreve outras propriedades que você pode definir para configurar o JDP:

Tabela 5-1 Propriedades do JDP

Propriedade | Descrição | Valor Padrão
---|---|---
`-Dcom.sun.management.jmxremote.autodiscovery` | Habilita a autodescoberta (JDP) na sub-rede de rede | false
`-Dcom.sun.management.jdp.pause` | Especifica o intervalo de transmissão em segundos | 5
`-Dcom.sun.management.jdp.ttl` | Tempo de vida (time-to-live) em segundos para pacotes de autodescoberta | 1
`-Dcom.sun.management.jdp.address` | Endereço multicast para enviar pacotes de autodescoberta | 224.0.23.178
`-Dcom.sun.management.jdp.port` | Porta multicast para enviar pacotes de autodescoberta. Habilita a autodescoberta mesmo que a propriedade `com.sun.management.jmxremote.autodiscovery` não tenha sido definida. | 7095
`-Dcom.sun.management.jdp.name` | Nome de transmissão da JVM | Sem padrão
`-Dcom.sun.management.jdp.source_addr` | Endereço da interface de origem a ser usada para transmissão | Atribuído automaticamente