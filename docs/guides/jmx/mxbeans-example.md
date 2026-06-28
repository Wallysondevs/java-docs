# MXBeans

## 16 MXBeans

Este exemplo demonstra o uso de MXBeans. O código-fonte contido nesta seção é usado para criar os arquivos correspondentes no diretório `examples/` especificado no procedimento de configuração apropriado e inclui:

  * arquivo README
  * Main
  * QueueSample
  * QueueSampler
  * QueueSamplerMXBean

### examples/MXBean/README
```
    # ==============================================================================
    #
    #  Exemplo Introdutório do Tutorial JMX: Instrumentando Suas Próprias Aplicações.
    #                                        Usando MXBeans.
    #
    #  O objetivo deste exemplo introdutório é mostrar as funcionalidades básicas da
    #  tecnologia JMX, primeiro instrumentando um recurso simples usando o novo
    #  tipo de MBean, ou seja, MXBeans, e segundo, realizando operações nele usando
    #  a ferramenta jconsole. Este exemplo mostra a implementação de um MXBean, como
    #  registrá-lo no Platform MBean Server e como realizar operações remotas
    #  nele conectando-se ao RMI connector server usando a ferramenta jconsole. O
    #  objetivo deste exemplo é mostrar um MXBean simples que gerencia um recurso do
    #  tipo Queue<String>. O MXBean declara um getter getQueueSample que tira
    #  um "snapshot" da fila quando invocado e retorna uma classe Java QueueSample
    #  que agrupa os seguintes valores: o tempo em que o "snapshot" foi tirado,
    #  o tamanho da fila e o cabeçalho da fila naquele dado momento. O MXBean também
    #  declara uma operação clearQueue que limpa todos os elementos da fila
    #  sendo gerenciada. O exemplo também mostra como registrar este MXBean no
    #  Platform MBean Server junto com os MBeans que você já pode ver no jconsole.
    #  Este exemplo também mostra como o Platform MBean Server existente pode ser
    #  compartilhado entre a JVM e a própria aplicação para registrar os MBeans da
    #  aplicação, evitando assim a criação de múltiplas instâncias do MBean Server na
    #  mesma JVM.
    #
    # ==============================================================================
    #
    # Para compilar e executar o exemplo, faça uma cópia deste arquivo README e
    # então simplesmente recorte e cole todos os comandos conforme necessário em uma janela de terminal.
    #
    # Este README assume que você está executando Java SE 6 no Unix,
    # você está familiarizado com a tecnologia JMX e com a sintaxe do bourne shell ou korn
    # shell.
    #
    # Todos os comandos abaixo são definidos usando a sintaxe do Unix korn shell.
    #
    # Se você não estiver executando Unix e korn shell, espera-se que você seja capaz de
    # adaptar esses comandos ao seu sistema operacional e ambiente de shell favoritos.
    #
    
    # Compilar classes Java
    #
    # As classes Java usadas neste exemplo estão contidas no pacote Java
    # com.example.mxbeans.
    #
    # * Main.java: obtém o Platform MBean Server e cria
    #              e registra o QueueSampler MXBean nele.
    #
    # * QueueSampler.java: implementa o QueueSampler MXBean.
    #
    # * QueueSamplerMXBean.java: a interface de gerenciamento exposta
    #                            pelo QueueSampler MXBean.
    #
    # * QueueSample.java: o tipo Java retornado pelo método getQueueSample()
    #                     na interface QueueSampler MXBean.
    #
    
    javac com/example/mxbeans/*.java
    
    # Iniciar a aplicação Main
    #
    
    java com.example.mxbeans.Main
    
    # Iniciar jconsole em uma janela de shell diferente na mesma máquina
    #
    # JConsole está localizado em $(J2SE_HOME)/bin/jconsole
    #
    
    jconsole
    
    # ==============================================================================
```

### examples/MXBean/com/example/mxbeans/Main.java
```java
    /**
     * Main.java - classe principal para o exemplo QueueSampler. Cria o Queue Sampler
     * MXBean, o registra e então espera indefinidamente (ou até que o programa seja interrompido).
     */
    
    package com.example.mxbeans;
    
    import java.lang.management.ManagementFactory;
    import java.util.Queue;
    import java.util.concurrent.ArrayBlockingQueue;
    import javax.management.MBeanServer;
    import javax.management.ObjectName;
    
    public class Main {
        /* Para simplificar, declaramos "throws Exception". Programas reais
           geralmente desejarão um tratamento de exceções mais granular. */
        public static void main(String[] args) throws Exception {
            // Obtém o Platform MBean Server
            MBeanServer mbs = ManagementFactory.getPlatformMBeanServer();
    
            // Constrói o ObjectName para o MBean que iremos registrar
            ObjectName name =
                    new ObjectName("com.example.mxbeans:type=QueueSampler");
    
            // Cria o Queue Sampler MXBean
            Queue<String> queue = new ArrayBlockingQueue<String>(10);
            queue.add("Request-1");
            queue.add("Request-2");
            queue.add("Request-3");
            QueueSampler mxbean = new QueueSampler(queue);
    
            // Registra o Queue Sampler MXBean
            mbs.registerMBean(mxbean, name);
    
            // Espera indefinidamente
            System.out.println("Waiting...");
            Thread.sleep(Long.MAX_VALUE);
        }
    }
    
```

### examples/MXBean/com/example/mxbeans/QueueSamplerMXBean.java
```java
    /**
     * QueueSamplerMXBean.java - interface MXBean descrevendo as operações de gerenciamento
     * e atributos para o QueueSampler MXBean. Neste caso,
     * há um atributo somente leitura "QueueSample" e uma operação "clearQueue".
     */
    
    package com.example.mxbeans;
    
    public interface QueueSamplerMXBean {
        public QueueSample getQueueSample();
        public void clearQueue();
    }
    
```

### examples/MXBean/com/example/mxbeans/QueueSampler.java
```java
    /**
     * QueueSampler.java - implementação MXBean para o QueueSampler MXBean.
     * Esta classe deve implementar todos os métodos Java declarados na
     * interface QueueSamplerMXBean, com o comportamento apropriado para cada um.
     */
    
    package com.example.mxbeans;
    
    import java.util.Date;
    import java.util.Queue;
    
    public class QueueSampler implements QueueSamplerMXBean {
    
        private Queue<String> queue;
    
        public QueueSampler(Queue<String> queue) {
            this.queue = queue;
        }
    
        public QueueSample getQueueSample() {
            synchronized (queue) {
                return new QueueSample(new Date(), queue.size(), queue.peek());
            }
        }
    
        public void clearQueue() {
            synchronized (queue) {
                queue.clear();
            }
        }
    }
    
```

### examples/MXBean/com/example/mxbeans/QueueSample.java
```java
    /**
     * QueueSample.java - tipo Java representando um "snapshot" de uma dada fila.
     * Ele agrupa o instante em que o "snapshot" foi tirado, o tamanho da fila
     * e o cabeçalho da fila.
     */
    
    package com.example.mxbeans;
    
    import java.beans.ConstructorProperties;
    import java.util.Date;
    
    public class QueueSample {
    
        private final Date date;
        private final int size;
        private final String head;
    
        @ConstructorProperties({"date", "size", "head"})
        public QueueSample(Date date, int size, String head) {
            this.date = date;
            this.size = size;
            this.head = head;
        }
    
        public Date getDate() {
            return date;
        }
    
        public int getSize() {
            return size;
        }
    
        public String getHead() {
            return head;
        }
    }
    
```