# Fundamentos de JMX

## 14 Fundamentos de JMX

Este exemplo introduz a noção fundamental da API JMX, ou seja, os managed beans (MBeans). O código-fonte contido nesta seção é usado para criar os arquivos correspondentes no diretório `examples/` especificado no procedimento de configuração apropriado e inclui:

  * Arquivo README

  * Main

  * Hello

  * HelloMBean

### examples/Essential/README
```
    # ==============================================================================
    #
    #  Exemplo Introdutório do Tutorial JMX: Instrumentando Suas Próprias Aplicações.
    #
    #  O objetivo deste exemplo introdutório é mostrar os recursos básicos da
    #  tecnologia JMX, primeiro instrumentando um recurso simples e, segundo,
    #  realizando operações nele usando a ferramenta jconsole. Este exemplo
    #  mostra a implementação de um MBean padrão, como registrá-lo no
    #  MBean Server da plataforma e como realizar operações remotas nele
    #  conectando-se ao RMI connector server usando a ferramenta jconsole. Além
    #  de monitorar a aplicação, o jconsole também permitirá observar a
    #  instrumentação JVM integrada, pois os MBeans da JVM também são registrados no
    #  MBean Server da plataforma. Este exemplo também mostra como o
    #  MBean Server da plataforma existente pode ser compartilhado entre a JVM e a
    #  própria aplicação para registrar os MBeans da aplicação, evitando assim a
    #  criação de múltiplas instâncias de MBean Server na mesma JVM.
    #
    # ==============================================================================
    #
    # Para compilar e executar o exemplo, faça uma cópia deste arquivo README e,
    # em seguida, simplesmente copie e cole todos os comandos conforme necessário em
    # uma janela de terminal.
    #
    # Este README pressupõe que você está executando sob Java SE 6 no Unix,
    # que você está familiarizado com a tecnologia JMX e com a sintaxe do
    # bourne shell ou korn shell.
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
    #              e registra o Hello World MBean nele.
    #
    # * Hello.java: implementa o Hello World standard MBean.
    #
    # * HelloMBean.java: a interface de gerenciamento exposta pelo
    #                    Hello World standard MBean.
    #
    
    javac com/example/mbeans/*.java
    
    # Iniciar a aplicação Main
    #
    
    java com.example.mbeans.Main
    
    # Iniciar o jconsole em uma janela de shell diferente na mesma máquina
    #
    # O jconsole está localizado em $(J2SE_HOME)/bin/jconsole
    #
    
    jconsole
    
    # ==============================================================================
    
```

### examples/Essential/com/example/mbeans/Main.java
```java
    /* Main.java - classe principal para o exemplo Hello World. Cria o
       HelloWorld MBean, o registra e então espera para sempre (ou até que o
       programa seja interrompido).  */
    
    package com.example.mbeans;
    
    import java.lang.management.*;
    import javax.management.*;
    
    public class Main {
        /* Para simplificar, declaramos "throws Exception". Programas reais
           geralmente desejarão um tratamento de exceções mais granular.  */
        public static void main(String[] args) throws Exception {
            // Obtém o Platform MBean Server
            MBeanServer mbs = ManagementFactory.getPlatformMBeanServer();
    
            // Constrói o ObjectName para o MBean que iremos registrar
            ObjectName name = new ObjectName("com.example.mbeans:type=Hello");
    
            // Cria o Hello World MBean
            Hello mbean = new Hello();
    
            // Registra o Hello World MBean
            mbs.registerMBean(mbean, name);
    
            // Espera para sempre
            System.out.println("Waiting forever...");
            Thread.sleep(Long.MAX_VALUE);
        }
    }
    
```

### examples/Essential/com/example/mbeans/Hello.java
```java
    /* Hello.java - implementação MBean para o Hello World MBean.
       Esta classe deve implementar todos os métodos Java declarados na
       interface HelloMBean, com o comportamento apropriado para cada um.  */
    
    package com.example.mbeans;
    
    public class Hello implements HelloMBean {
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
           estatísticas como tempo de atividade (uptime) ou uso de memória, por exemplo. Ser
           somente leitura significa apenas que ele não pode ser alterado através da
           interface de gerenciamento.  */
        public String getName() {
            return this.name;
        }
    
        /* Getter para o atributo CacheSize. O padrão mostrado aqui é
           frequente: o getter retorna um campo privado que representa o
           valor do atributo, e o setter altera esse campo.  */
        public int getCacheSize() {
            return this.cacheSize;
        }
    
        /* Setter para o atributo CacheSize. Para evitar problemas com
           valores desatualizados em situações multithread, é uma boa ideia
           que os setters sejam sincronizados.  */
        public synchronized void setCacheSize(int size) {
            this.cacheSize = size;
    
            /* Em uma aplicação real, a alteração do atributo normalmente
               teria efeitos além de apenas modificar o campo cacheSize.
               Por exemplo, redimensionar o cache pode significar
               descartar entradas ou alocar novas. A lógica para
               esses efeitos estaria aqui.  */
            System.out.println("Cache size now " + this.cacheSize);
        }
    
        private final String name = "Reginald";
        private int cacheSize = DEFAULT_CACHE_SIZE;
        private static final int DEFAULT_CACHE_SIZE = 200;
    }
    
```

### examples/Essential/com/example/mbeans/HelloMBean.java
```java
    /* HelloMBean.java - interface MBean que descreve as operações de gerenciamento
       e atributos para o Hello World MBean. Neste caso,
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