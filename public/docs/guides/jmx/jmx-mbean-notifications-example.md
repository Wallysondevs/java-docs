# Notificações de JMX MBean

## 15 Notificações de JMX MBean

Este exemplo implementa notificações de MBean. O código-fonte contido nesta seção é usado para criar os arquivos correspondentes no diretório `examples/` especificado no procedimento de configuração apropriado e inclui:

  * [Arquivo README](<#/doc/guides/jmx/jmx-mbean-notifications-example>)

  * [Main](<#/doc/guides/jmx/jmx-mbean-notifications-example>)

  * [Hello](<#/doc/guides/jmx/jmx-mbean-notifications-example>)

  * [HelloMBean](<#/doc/guides/jmx/jmx-mbean-notifications-example>)

### examples/Notification/README
```
    # ==============================================================================
    #
    #  Exemplo Introdutório do Tutorial JMX: Instrumentando Suas Próprias Aplicações.
    #                                      Usando Notificações.
    #
    #  Este exemplo é o mesmo do exemplo essencial anterior, com a
    #  única diferença de que o MBean Hello World foi modificado para enviar
    #  notificações.
    #
    #  O MBean Hello World implementa a interface NotificationBroadcaster
    #  estendendo a classe NotificationBroadcasterSupport e emite
    #  AttributeChangeNotifications toda vez que o atributo CacheSize
    #  é alterado.
    #
    # ==============================================================================
    #
    # Para compilar e executar o exemplo, faça uma cópia deste arquivo README e
    # então simplesmente copie e cole todos os comandos conforme necessário em uma janela de terminal.
    #
    # Este README assume que você está executando Java SE 6 no Unix,
    # você está familiarizado com a tecnologia JMX e com a sintaxe do bourne shell ou korn
    # shell.
    #
    # Todos os comandos abaixo são definidos usando a sintaxe do korn shell do Unix.
    #
    # Se você não estiver executando Unix e korn shell, espera-se que você seja capaz de
    # adaptar esses comandos ao seu sistema operacional e ambiente de shell favoritos.
    #
    
    # Compilar classes Java
    #
    # As classes Java usadas neste exemplo estão contidas no pacote Java
    # com.example.mbeans.
    #
    # * Main.java: obtém o Platform MBean Server e cria
    #              e registra o MBean Hello World nele.
    #
    # * Hello.java: implementa o MBean padrão Hello World.
    #               Este MBean emite notificações toda vez
    #               que o atributo CacheSize é alterado.
    #
    # * HelloMBean.java: a interface de gerenciamento exposta pelo
    #                    MBean padrão Hello World.
    #
    
    javac com/example/mbeans/*.java
    
    # Iniciar a aplicação Main
    #
    
    java com.example.mbeans.Main
    
    # Iniciar jconsole em uma janela de shell diferente na mesma máquina
    #
    # JConsole está localizado em $(J2SE_HOME)/bin/jconsole
    #
    
    jconsole
    
    # ==============================================================================
    
```

### examples/Notification/com/example/mbeans/Main.java
```
    /* Main.java - classe principal para o exemplo Hello World. Cria o
       MBean HelloWorld, o registra e então espera para sempre (ou até que o
       programa seja interrompido). */
    
    package com.example.mbeans;
    
    import java.lang.management.*;
    import javax.management.*;
    
    public class Main {
        /* Para simplificar, declaramos "throws Exception". Programas reais
           geralmente desejarão um tratamento de exceções mais granular. */
        public static void main(String[] args) throws Exception {
            // Obtém o Platform MBean Server
            MBeanServer mbs = ManagementFactory.getPlatformMBeanServer();
    
            // Constrói o ObjectName para o MBean que iremos registrar
            ObjectName name = new ObjectName("com.example.mbeans:type=Hello");
    
            // Cria o MBean Hello World
            Hello mbean = new Hello();
    
            // Registra o MBean Hello World
            mbs.registerMBean(mbean, name);
    
            // Espera para sempre
            System.out.println("Waiting forever...");
            Thread.sleep(Long.MAX_VALUE);
        }
    }
    
```

### examples/Notification/com/example/mbeans/Hello.java
```
    /* Hello.java - implementação MBean para o MBean Hello World.
       Esta classe deve implementar todos os métodos Java declarados na
       interface HelloMBean, com o comportamento apropriado para cada um. */
    
    package com.example.mbeans;
    
    import javax.management.*;
    
    public class Hello
            extends NotificationBroadcasterSupport implements HelloMBean {
    
        public void sayHello() {
            System.out.println("hello, world");
        }
    
        public int add(int x, int y) {
            return x + y;
        }
    
        /* Getter para o atributo Name. O padrão mostrado aqui é
           frequente: o getter retorna um campo privado que representa o
           valor do atributo. No nosso caso, o valor do atributo nunca
           muda, mas para outros atributos ele pode mudar conforme a
           aplicação é executada. Considere um atributo que representa
           estatísticas como tempo de atividade ou uso de memória, por exemplo. Ser
           somente leitura significa apenas que ele não pode ser alterado através da
           interface de gerenciamento. */
        public String getName() {
            return this.name;
        }
    
        /* Getter para o atributo CacheSize. O padrão mostrado aqui é
           frequente: o getter retorna um campo privado que representa o
           valor do atributo, e o setter altera esse campo. */
        public int getCacheSize() {
            return this.cacheSize;
        }
    
        /* Setter para o atributo CacheSize. Para evitar problemas com
           valores obsoletos em situações multi-thread, é uma boa ideia
           que os setters sejam sincronizados. */
        public synchronized void setCacheSize(int size) {
            int oldSize = this.cacheSize;
            this.cacheSize = size;
    
            /* Em uma aplicação real, a alteração do atributo
               tipicamente teria efeitos além de apenas modificar o campo
               cacheSize. Por exemplo, redimensionar o cache pode significar
               descartar entradas ou alocar novas. A lógica para
               esses efeitos estaria aqui. */
            System.out.println("Cache size now " + this.cacheSize);
    
            /* Constrói uma notificação que descreve a mudança. A
               "fonte" de uma notificação é o ObjectName do MBean
               que a emitiu. Mas um MBean pode colocar uma referência a
               si mesmo ("this") na fonte, e o MBean server
               substituirá isso pelo ObjectName antes de enviar a
               notificação para seus clientes.
    
               Para uma boa medida, mantemos um número de sequência para cada
               notificação emitida por este MBean.
    
               Os parâmetros oldValue e newValue para o construtor são
               do tipo Object, então estamos contando com o autoboxing do Tiger
               aqui. */
            Notification n =
                new AttributeChangeNotification(this,
                                                sequenceNumber++,
                                                System.currentTimeMillis(),
                                                "CacheSize changed",
                                                "CacheSize",
                                                "int",
                                                oldSize,
                                                this.cacheSize);
    
            /* Agora envia a notificação usando o método sendNotification
               herdado da classe pai
               NotificationBroadcasterSupport. */
            sendNotification(n);
        }
    
        @Override
        public MBeanNotificationInfo[] getNotificationInfo() {
            String[] types = new String[] {
                AttributeChangeNotification.ATTRIBUTE_CHANGE
            };
            String name = AttributeChangeNotification.class.getName();
            String description = "Um atributo deste MBean foi alterado";
            MBeanNotificationInfo info =
                new MBeanNotificationInfo(types, name, description);
            return new MBeanNotificationInfo[] {info};
        }
    
        private final String name = "Reginald";
        private int cacheSize = DEFAULT_CACHE_SIZE;
        private static final int DEFAULT_CACHE_SIZE = 200;
    
        private long sequenceNumber = 1;
    }
    
```

### examples/Notification/com/example/mbeans/HelloMBean.java
```
    /* HelloMBean.java - interface MBean que descreve as operações de
       gerenciamento e atributos para o MBean Hello World. Neste caso,
       existem duas operações, "sayHello" e "add", e dois atributos,
       "Name" e "CacheSize". */
    
    package com.example.mbeans;
    
    public interface HelloMBean {
        // operações
    
        public void sayHello();
        public int add(int x, int y);
    
        // atributos
    
        // um atributo somente leitura chamado Name do tipo String
        public String getName();
    
        // um atributo de leitura e escrita chamado CacheSize do tipo int
        public int getCacheSize();
        public void setCacheSize(int size);
    }
    
```