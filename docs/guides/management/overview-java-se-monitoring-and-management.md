# Visão Geral de Monitoramento e Gerenciamento do Java SE

## 1 Visão Geral de Monitoramento e Gerenciamento do Java SE

Este tópico apresenta os recursos e utilitários que fornecem serviços de monitoramento e gerenciamento para a Plataforma Java, Standard Edition (plataforma Java SE).

### Principais Recursos de Monitoramento e Gerenciamento

A plataforma Java SE inclui recursos significativos de monitoramento e gerenciamento. Esses recursos se enquadram em quatro grandes categorias:

  * [Instrumentação da Java Virtual Machine](<#/doc/guides/management/overview-java-se-monitoring-and-management>)

  * [API de Monitoramento e Gerenciamento](<#/doc/guides/management/overview-java-se-monitoring-and-management>)

  * [Ferramentas de Monitoramento e Gerenciamento](<#/doc/guides/management/overview-java-se-monitoring-and-management>)

  * [Tecnologia Java Management Extensions](<#/doc/guides/management/overview-java-se-monitoring-and-management>)




#### Instrumentação da Java Virtual Machine

A Java Virtual Machine (Java VM) é instrumentada para monitoramento e gerenciamento, permitindo capacidades de gerenciamento integradas (ou prontas para uso) que podem ser acessadas tanto remotamente quanto localmente.

Veja [ Monitoramento e Gerenciamento Usando a Tecnologia JMX](<#/doc/guides/management/monitoring-and-management-using-jmx-technology>).

A Java VM inclui um servidor MBean de plataforma e MBeans de plataforma para uso por aplicações de gerenciamento que estão em conformidade com a especificação Java Management Extensions (JMX). Essas plataformas são implementações da API de monitoramento e gerenciamento. Os MXBeans de plataforma e os servidores MBean são introduzidos nos tópicos [MXBeans de Plataforma](<#/doc/guides/management/overview-java-se-monitoring-and-management>) e [Servidor MBean de Plataforma](<#/doc/guides/management/overview-java-se-monitoring-and-management>).

#### API de Monitoramento e Gerenciamento

Java SE inclui as seguintes APIs para monitoramento e gerenciamento:

  * [java.lang.management](<https://docs.oracle.com/en/java/javase/25/docs/api/java.management/java/lang/management/package-summary.html>): Permite monitorar e gerenciar a Java virtual machine e o sistema operacional subjacente. A API permite que as aplicações se monitorem, e permite que ferramentas compatíveis com JMX monitorem e gerenciem uma virtual machine localmente e remotamente. Esta API fornece acesso aos seguintes tipos de informação:
    * Número de classes carregadas e threads em execução

    * Tempo de atividade da Java VM, propriedades do sistema e argumentos de entrada da VM

    * Estado da thread, estatísticas de contenção de thread e stack trace de threads ativas

    * Consumo de memória

    * Estatísticas de garbage collection

    * Detecção de pouca memória

    * Detecção de deadlock sob demanda

    * Informações do sistema operacional

  * [Attach](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.attach/module-summary.html>): Permite que um agente de gerenciamento seja carregado dinamicamente em uma virtual machine.

  * [JConsole](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.jconsole/module-summary.html>): Fornece uma interface programática para acessar o JConsole, como adicionar um plug-in do JConsole.




#### Ferramentas de Monitoramento e Gerenciamento

A plataforma Java SE fornece uma ferramenta gráfica de monitoramento chamada JConsole. O JConsole implementa a API JMX e permite monitorar o desempenho de uma Java VM e de quaisquer aplicações instrumentadas. Ele fornece informações para ajudar a otimizar o desempenho.

Algumas das melhorias no JConsole são as seguintes:

  * Suporte a plug-ins do JConsole, que permite construir seus próprios plug-ins para rodar com o JConsole. Por exemplo, você pode adicionar uma aba personalizada para acessar os MBeans da aplicação.

  * Capacidade de attach dinâmico, permitindo conectar o JConsole a qualquer aplicação que suporte a API Attach.

  * Interface de usuário aprimorada, que torna os dados mais facilmente acessíveis.

  * Abas Overview e VM Summary para informações gerais sobre sua Java VM.

  * HotSpot Diagnostic MBean, que fornece uma API para solicitar heap dump em tempo de execução e também alterar a configuração de certas opções da VM.

  * Apresentação aprimorada de MBeans para facilitar o acesso às operações e atributos dos MBeans.




O JConsole é apresentado em detalhes no tópico [ Usando o JConsole](<#/doc/guides/management/using-jconsole>).

Outras ferramentas de linha de comando também são fornecidas com a plataforma Java SE.

#### Tecnologia Java Management Extensions

A plataforma Java SE, release 25, inclui a especificação Java Management Extensions (JMX), versão 1.4. A API JMX permite instrumentar aplicações para monitoramento e gerenciamento. Um conector de invocação de método remoto (RMI) permite que esta instrumentação seja acessível remotamente, por exemplo, usando o JConsole.

Veja a [documentação da tecnologia JMX](<#/>) no Guia Java Management Extensions da Plataforma Java, Standard Edition.

As seções a seguir fornecem uma breve introdução aos principais componentes da API JMX.

##### O Que São MBeans?

MBeans da tecnologia JMX são managed beans, ou seja, objetos Java que representam recursos a serem gerenciados. Um MBean possui uma interface de gerenciamento que consiste no seguinte:

  * Atributos nomeados e tipados que podem ser lidos e escritos.

  * Operações nomeadas e tipadas que podem ser invocadas.

  * Notificações tipadas que podem ser emitidas pelo MBean.




Por exemplo, um MBean que representa a configuração de uma aplicação pode ter atributos que representam diferentes parâmetros de configuração, como um `CacheSize`. A leitura do atributo `CacheSize` retornará o tamanho atual do cache. Escrever em `CacheSize` atualiza o tamanho do cache, potencialmente alterando o comportamento da aplicação em execução. Uma operação como `save` armazena a configuração atual de forma persistente. O MBean pode enviar uma notificação como `ConfigurationChangedNotification` quando a configuração muda.

MBeans podem ser padrão ou dinâmicos. MBeans padrão são objetos Java que estão em conformidade com padrões de design derivados do modelo de componentes JavaBeans. MBeans dinâmicos definem sua interface de gerenciamento em tempo de execução. Um tipo adicional de MBean, chamado MXBean, é adicionado à plataforma Java.

  * Um MBean padrão expõe o recurso a ser gerenciado diretamente através de seus atributos e operações. Atributos são expostos através de métodos `getter` e `setter`. Operações são os outros métodos da classe que estão disponíveis para os gerentes. Todos esses métodos são definidos estaticamente na interface MBean e são visíveis para um agente JMX através de introspecção. Este método é a maneira mais direta de tornar um novo recurso gerenciável.

  * Um MBean dinâmico é um MBean que define sua interface de gerenciamento em tempo de execução. Por exemplo, um MBean de configuração determina os nomes e tipos dos atributos que ele expõe, analisando um arquivo XML.

  * Um MXBean é um tipo de MBean que fornece uma maneira simples de codificar um MBean que referencia apenas um conjunto predefinido de tipos. Dessa forma, você pode garantir que o MBean seja utilizável por qualquer cliente. Isso inclui clientes remotos sem qualquer requisito de que o cliente tenha acesso a classes específicas do modelo, que representam os tipos de seus MBeans. Os MBeans de plataforma são todos MXBeans.




##### Servidor MBean

Para ser útil, um MBean deve ser registrado em um servidor MBean. Um servidor MBean é um repositório de MBeans. Cada MBean é registrado com um nome único dentro do servidor MBean. Geralmente, o único acesso aos MBeans é através do servidor MBean. Em outras palavras, o código não acessa um MBean diretamente, mas sim acessa o MBean pelo nome através do servidor MBean.

A plataforma Java SE inclui um servidor MBean de plataforma integrado. Veja [ Usando o Servidor MBean de Plataforma e os MXBeans de Plataforma](<#/doc/guides/management/using-platform-mbean-server-and-platform-mxbeans>).

##### Criando e Registrando MBeans

Existem duas maneiras de criar um MBean. Uma é construir um objeto Java que será o MBean e, em seguida, usar o método `registerMBean` para registrá-lo no servidor MBean. O outro método é criar e registrar o MBean em uma única operação usando um dos métodos `createMBean`.

O método `registerMBean` é mais simples para uso local, mas não pode ser usado remotamente. O método `createMBean` pode ser usado remotamente, mas às vezes requer atenção às questões de carregamento de classes. Um MBean pode executar ações quando é registrado ou desregistrado de um servidor MBean se implementar a interface `MBeanRegistration`.

##### Instrumentando Aplicações

Instruções gerais sobre como instrumentar suas aplicações para gerenciamento pela API JMX estão além do escopo deste documento.

### MXBeans de Plataforma

Um MXBean de plataforma é um MBean para monitorar e gerenciar a Java VM e outros componentes do ambiente de tempo de execução Java. Cada MXBean encapsula uma parte da funcionalidade da VM, como o sistema de carregamento de classes, o sistema de compilação just-in-time (JIT), o garbage collector e assim por diante.

[Tabela 1-1](<#/doc/guides/management/overview-java-se-monitoring-and-management>) lista todos os MXBeans de plataforma e o aspecto da VM que eles gerenciam. Cada MXBean de plataforma possui um `javax.management.ObjectName` único para registro no servidor MBean de plataforma. Uma Java VM pode ter zero, uma ou mais de uma instância de cada MXBean, dependendo de sua função, conforme mostrado na tabela.

Tabela 1-1 MXBeans de Plataforma

Interface | Parte da VM Gerenciada | Object Name | Instâncias por VM
---|---|---|---
`ClassLoadingMXBean` | Sistema de carregamento de classes | `java.lang:type= ClassLoading` | Uma
`CompilationMXBean` | Sistema de compilação | `java.lang:type= Compilation` | Zero ou uma
`GarbageCollectorMXBean` | Garbage collector | `java.lang:type= GarbageCollector, name=collectorName` | Uma ou mais
`PlatformLoggingMXBean` | Sistema de logging | `java.util.logging:type =Logging` | Uma
`MemoryManagerMXBean` (subinterface de `GarbageCollectorMXBean`) | Pool de memória | `java.lang: typeMemoryManager, name=managerName` | Uma ou mais
`MemoryPoolMXBean` | Memória | `java.lang: type= MemoryPool, name=poolName` | Uma ou mais
`MemoryMXBean` | Sistema de memória | `java.lang:type= Memory` | Uma
`OperatingSystemMXBean` | Sistema operacional subjacente | `java.lang:type= OperatingSystem` | Uma
`RuntimeMXBean` | Sistema de tempo de execução | `java.lang:type= Runtime` | Uma
`ThreadMXBean` | Sistema de threads | `java.lang:type= Threading` | Uma

Os detalhes sobre os MXBeans de plataforma são descritos na referência da API [java.lang.management](<https://docs.oracle.com/en/java/javase/25/docs/api/java.management/java/lang/management/package-summary.html>).

### Servidor MBean de Plataforma

O servidor MBean de plataforma pode ser compartilhado por diferentes componentes gerenciados executando na mesma Java VM. Você pode acessar o servidor MBean de plataforma com o método `ManagementFactory.getPlatformMBeanServer()`. A primeira chamada a este método cria o servidor MBean de plataforma e registra os MXBeans de plataforma usando seus nomes de objeto únicos. Subsequentemente, este método retorna a instância `MBeanServer` de plataforma criada inicialmente.

MXBeans que são criados e destruídos dinamicamente (por exemplo, pools de memória e gerentes) serão automaticamente registrados e desregistrados no servidor MBean de plataforma. Se a propriedade de sistema `javax.management.builder.initial` for definida, então o servidor MBean de plataforma será criado pelo parâmetro `MBeanServerBuilder` especificado.

Você pode usar o servidor MBean de plataforma para registrar outros MBeans além dos MXBeans de plataforma. Isso permite que todos os MBeans sejam publicados através do mesmo servidor MBean e facilita a publicação e descoberta em rede.