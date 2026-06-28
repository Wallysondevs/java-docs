# Descritores MBean

## 17 Descritores MBean

Este exemplo demonstra o uso de Descritores MBean. O código-fonte contido nesta seção é usado para criar os arquivos correspondentes no diretório `examples/` especificado no procedimento de configuração apropriado e inclui:

*   Arquivo README
*   Author
*   DisplayName
*   Main
*   QueueSample
*   QueueSampler
*   QueueSamplerMXBean
*   Version

### examples/Descriptors/README
```
    # ==============================================================================
    #
    #  JMX Tutorial Introductory Example : Instrumenting Your Own Applications.
    #                                      Using Descriptors and the DescriptorKey
    #                                      meta-annotation.
    #
    #  The aim of this example is to show how the new DescriptorKey meta-annotation
    #  can be used in order to add new descriptor items to the Descriptors for a
    #  Standard MBean (or MXBean) via annotations in the Standard MBean (or MXBean)
    #  interface. The MXBeans example will be the starting point for this example.
    #
    # ==============================================================================
    #
    # In order to compile and run the example, make a copy of this README file, and
    # then simply cut and paste all the commands as needed into a terminal window.
    #
    # This README makes the assumption that you are running under Java SE 6 on Unix,
    # you are familiar with the JMX technology, and with the bourne shell or korn
    # shell syntax.
    #
    # All the commands below are defined using Unix korn shell syntax.
    #
    # If you are not running Unix and korn shell you are expected to be able to
    # adapt these commands to your favorite OS and shell environment.
    #
    
    # Compile Java classes
    #
    # The Java classes used in this example are contained in the com.example.mxbeans
    # Java package.
    #
    # * Main.java: gets the Platform MBean Server, and creates
    #              and registers the QueueSampler MXBean on it.
    #
    # * QueueSampler.java: implements the QueueSampler MXBean.
    #
    # * QueueSamplerMXBean.java: the management interface exposed
    #                            by the QueueSampler MXBean.
    #
    # * QueueSample.java: the Java type returned by the getQueueSample()
    #                     method in the QueueSampler MXBean interface.
    #
    # * DisplayName.java: This annotation is used in QueueSamplerMXBean to supply
    #                     a display name for a method in the MBean interface.
    #
    # * Author.java: This annotation is used in QueueSamplerMXBean to supply
    #                the name of the creator of the MBean interface.
    #
    # * Version.java: This annotation is used in QueueSamplerMXBean to supply
    #                 the current version of the MBean interface.
    #
    
    javac com/example/mxbeans/*.java
    
    # Start the Main application
    #
    
    java com.example.mxbeans.Main
    
    # Start jconsole on a different shell window on the same machine
    #
    # JConsole is located in $(J2SE_HOME)/bin/jconsole
    #
    
    jconsole
    
    # ==============================================================================
    
```

### examples/Descriptors/com/example/mxbeans/Author.java
```
    /**
     * Author.java - Esta anotação permite fornecer
     * o nome do criador da interface MBean.
     */
    
    package com.example.mxbeans;
    
    import java.lang.annotation.Documented;
    import java.lang.annotation.ElementType;
    import java.lang.annotation.Retention;
    import java.lang.annotation.RetentionPolicy;
    import java.lang.annotation.Target;
    import javax.management.DescriptorKey;
    
    @Documented
    @Target(ElementType.TYPE)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface Author {
        @DescriptorKey("author")
        String value();
    }
    
```

### examples/Descriptors/com/example/mxbeans/DisplayName.java
```
    /**
     * DisplayName.java - Esta anotação permite fornecer
     * um nome de exibição para um método na interface MBean.
     */
    
    package com.example.mxbeans;
    
    import java.lang.annotation.Documented;
    import java.lang.annotation.ElementType;
    import java.lang.annotation.Retention;
    import java.lang.annotation.RetentionPolicy;
    import java.lang.annotation.Target;
    import javax.management.DescriptorKey;
    
    @Documented
    @Target(ElementType.TYPE)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface DisplayName {
        @DescriptorKey("displayName")
        String value();
    }
    
```

### examples/Descriptors/com/example/mxbeans/Main.java
```
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
        /* For simplicity, we declare "throws Exception".  Real programs
           will usually want finer-grained exception handling.  */
        public static void main(String[] args) throws Exception {
            // Get the Platform MBean Server
            MBeanServer mbs = ManagementFactory.getPlatformMBeanServer();
    
            // Construct the ObjectName for the MBean we will register
            ObjectName name =
                    new ObjectName("com.example.mxbeans:type=QueueSampler");
    
            // Create the Queue Sampler MXBean
            Queue<String> queue = new ArrayBlockingQueue<String>(10);
            queue.add("Request-1");
            queue.add("Request-2");
            queue.add("Request-3");
            QueueSampler mxbean = new QueueSampler(queue);
    
            // Register the Queue Sampler MXBean
            mbs.registerMBean(mxbean, name);
    
            // Wait forever
            System.out.println("Waiting...");
            Thread.sleep(Long.MAX_VALUE);
        }
    }
    
```

### examples/Descriptors/com/example/mxbeans/QueueSample.java
```
    /**
     * QueueSample.java - Tipo Java que representa um instantâneo de uma dada fila.
     * Ele agrupa o instante em que o instantâneo foi tirado, o tamanho da fila
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

### examples/Descriptors/com/example/mxbeans/QueueSampler.java
```
    /**
     * QueueSampler.java - Implementação MXBean para o QueueSampler MXBean.
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

### examples/Descriptors/com/example/mxbeans/QueueSamplerMXBean.java
```
    /**
     * QueueSamplerMXBean.java - Interface MXBean descrevendo as operações
     * de gerenciamento e atributos para o QueueSampler MXBean. Neste caso,
     * há um atributo somente leitura "QueueSample" e uma operação "clearQueue".
     */
    
    package com.example.mxbeans;
    
    @Author("Mr Bean")
    @Version("1.0")
    public interface QueueSamplerMXBean {
        @DisplayName("GETTER: QueueSample")
        public QueueSample getQueueSample();
        @DisplayName("OPERATION: clearQueue")
        public void clearQueue();
    }
    
```

### examples/Descriptors/com/example/mxbeans/Version.java
```
    /**
     * Version.java - Esta anotação permite fornecer
     * a versão atual da interface MBean.
     */
    
    package com.example.mxbeans;
    
    import java.lang.annotation.Documented;
    import java.lang.annotation.ElementType;
    import java.lang.annotation.Retention;
    import java.lang.annotation.RetentionPolicy;
    import java.lang.annotation.Target;
    import javax.management.DescriptorKey;
    
    @Documented
    @Target(ElementType.TYPE)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface Version {
        @DescriptorKey("version")
        String value();
    }
    
```