# Fundamentos da API JMX

## 10 Fundamentos da API JMX

Este capítulo apresenta os managed beans (MBeans), que são um componente central da API Java Management Extensions (JMX).

Um MBean é um objeto Java gerenciado, semelhante a um JavaBean, que segue os padrões de design estabelecidos no nível de instrumentação da Especificação JMX. Um MBean pode representar um dispositivo, uma aplicação ou qualquer recurso que seja gerenciado. MBeans expõem uma interface de gerenciamento, que é um conjunto de atributos legíveis e/ou graváveis e um conjunto de operações invocáveis, juntamente com uma autodescrição. A interface de gerenciamento não muda ao longo da vida de uma instância de MBean. MBeans também podem emitir notificações quando certos eventos definidos ocorrem.

A Especificação JMX define quatro tipos de MBean: standard MBeans, dynamic MBeans, open MBeans e model MBeans. Os exemplos neste tutorial demonstram o tipo mais simples de MBean, ou seja, os standard MBeans.

### Standard MBeans

Você pode definir um standard MBean escrevendo uma interface Java chamada `SomethingMBean` e uma classe Java chamada `Something` que implementa essa interface. Cada método na interface define um atributo ou uma operação no MBean. Por padrão, cada método define uma operação. Atributos e operações são simplesmente métodos que seguem certos padrões de design. Um standard MBean é composto pela interface MBean que lista os métodos para todos os atributos e operações expostos, e pela classe que implementa esta interface e fornece a funcionalidade do recurso instrumentado.

As seções a seguir descrevem um exemplo de standard MBean e um agente JMX simples que gerencia o MBean. Os exemplos de código são fornecidos em [JMX Essentials](<#/doc/guides/jmx/jmx-essentials-example>). Você pode executar os exemplos a partir do diretório `work_dir/jmx_examples/Essential/com/example/mbeans.`

#### Interface MBean

Um exemplo de uma interface MBean básica, chamada `HelloMBean`, é mostrado no exemplo de código a seguir.

EXEMPLO DE CÓDIGO 10-1 Interface MBean, HelloMBean
```
     
    package com.example.mbeans; 
     
    public interface HelloMBean { 
     
        public void sayHello(); 
        public int add(int x, int y); 
     
        public String getName(); 
     
        public int getCacheSize(); 
        public void setCacheSize(int size); 
    } 
     
    
```

Uma interface MBean adota o nome da classe Java que a implementa, com o sufixo MBean adicionado. A interface é chamada `HelloMBean`. A classe `Hello` que implementa esta interface é descrita em [Implementação do MBean](<#/doc/guides/jmx/essentials-jmx-api>).

De acordo com a Especificação JMX, uma interface MBean consiste em atributos nomeados e tipados que são legíveis e possivelmente graváveis, e operações nomeadas e tipadas que podem ser invocadas pelas aplicações gerenciadas pelo MBean. A interface `HelloMBean` mostrada no EXEMPLO DE CÓDIGO 10-1 Interface MBean, HelloMBean, declara duas operações: os métodos Java `add()` e `sayHello()`.

Dos dois atributos declarados por `HelloMbean`, `Name` é uma string somente leitura, e `CacheSize` é um inteiro que pode ser lido e gravado. Métodos getter e setter são declarados para permitir que a aplicação gerenciada acesse e possivelmente altere os valores dos atributos. Conforme definido pela Especificação JMX, um getter é qualquer método público cujo nome começa com get e que não retorna void. Um getter permite que um gerenciador leia o valor do atributo, cujo tipo é o do objeto retornado. Um setter é qualquer método público cujo nome começa com set e que aceita um único parâmetro. Um setter permite que um gerenciador escreva um novo valor no atributo, cujo tipo é o mesmo do parâmetro.

A implementação dessas operações e atributos é mostrada na seção a seguir.

#### Implementação do MBean

A classe `Hello` mostrada no exemplo de código a seguir implementa `HelloMBean`.

EXEMPLO DE CÓDIGO 10-2 Classe de Implementação MBean, Hello
```
     
    package com.example.mbeans; 
     
    public class Hello implements HelloMBean { 
        public void sayHello() { 
            System.out.println("hello, world"); 
        } 
     
        public int add(int x, int y) { 
            return x + y; 
        } 
     
        public String getName() { 
            return this.name; 
        } 
     
     
        public int getCacheSize() { 
            return this.cacheSize; 
        } 
     
        public synchronized void setCacheSize(int size) { 
            this.cacheSize = size; 
     
            System.out.println("Cache size now " + this.cacheSize); 
        } 
     
        private final String name = "Reginald"; 
        private int cacheSize = DEFAULT_CACHE_SIZE; 
        private static final int DEFAULT_CACHE_SIZE = 200; 
    } 
     
    
```

No Exemplo 10-2, a classe Java `Hello` fornece as definições das operações e atributos declarados por `HelloMBean`. Como você pode ver, as operações de exemplo `sayHello()` e `add()` são extremamente simples, mas operações da vida real podem ser tão simples ou tão sofisticadas quanto você desejar.

Métodos para obter o atributo `Name` e para obter e definir o atributo `cacheSize` também são definidos. Neste exemplo, o valor do atributo `Name` nunca muda, mas em um cenário real ele pode mudar à medida que o recurso gerenciado é executado. Por exemplo, o atributo pode representar estatísticas como tempo de atividade ou uso de memória. Aqui, é meramente o nome “Reginald”.

Chamar o método `setCacheSize` permite alterar o atributo `cacheSize` de seu valor padrão declarado de 200. Na realidade, alterar o atributo `cacheSize` pode exigir a execução de outras operações, como descartar entradas ou alocar novas. Este exemplo apenas imprime uma mensagem para confirmar que o tamanho do cache foi alterado, mas você pode definir operações mais sofisticadas no lugar da chamada para `println()`.

Com o MBean `Hello` e sua interface definidos, eles podem ser usados para gerenciar o recurso que representam, conforme mostrado na seção a seguir.

#### Gerenciando um Recurso

Conforme descrito no [Guia do Usuário da Tecnologia Java Management Extensions](<#/doc/guides/jmx/java-management-extensions-jmx-user-guide>), depois que um recurso é instrumentado por MBeans, o gerenciamento desse recurso é realizado por um agente JMX.

O componente central de um agente JMX é o MBean server, um servidor de objetos gerenciados no qual os MBeans são registrados. Consulte a documentação da API para a interface `MBeanServer` para detalhes da implementação do MBean server. Um agente JMX também inclui um conjunto de serviços para gerenciar MBeans. O exemplo de código a seguir apresenta um agente JMX básico, chamado `Main`.

EXEMPLO DE CÓDIGO 10-3 Criando um Agente JMX
```
     
    package com.example.mbeans; 
     
    import java.lang.management.*; 
    import javax.management.*; 
     
    public class Main { 
     
       public static void main(String[] args) throws Exception { 
     
          MBeanServer mbs = ManagementFactory.getPlatformMBeanServer(); 
     
          ObjectName name = new ObjectName("com.example.mbeans:type=Hello"); 
     
          Hello mbean = new Hello(); 
     
          mbs.registerMBean(mbean, name); 
     
          System.out.println("Waiting forever..."); 
          Thread.sleep(Long.MAX_VALUE); 
       } 
    } 
     
    
```

No Exemplo 10-3, o agente JMX `Main` começa obtendo qualquer MBean server que esteja em execução na plataforma, chamando o método `getPlatformMBeanServer()` da classe `java.lang.management.ManagementFactory`. Se nenhum MBean server já estiver em execução na plataforma, então `getPlatformMBeanServer()` cria um automaticamente chamando o método JMX `MBeanServerFactory.createMBeanServer()`. A instância `MBeanServer` obtida por `Main` é nomeada `mbs`.

Em seguida, `Main` define um nome de objeto para a instância MBean que criará. Todo MBean JMX deve ter um nome de objeto. O nome do objeto é uma instância da classe JMX `ObjectName` e deve estar em conformidade com a sintaxe definida pela Especificação JMX, ou seja, deve compreender um domínio e uma lista de key-properties. Consulte a documentação da API para a classe `ObjectName` para detalhes desta sintaxe. No nome do objeto definido por `Main`, `name`, o domínio é `com.example.mbeans` (o pacote no qual os MBeans de exemplo estão contidos) e a key-property declara que este objeto é do tipo `Hello`.

Uma instância de um objeto `Hello` é criada, nomeada `mbean`. Este objeto `Hello` é uma instância do MBean `Hello` que foi definido em [Implementação do MBean](<#/doc/guides/jmx/essentials-jmx-api>).

O objeto `Hello` nomeado `mbean` é registrado como um MBean no MBean server `mbs` com o nome de objeto `name`, passando o objeto e o nome do objeto em uma chamada para o método JMX `MBeanServer.registerMBean()`.

Com o MBean `Hello` registrado no MBean server, `Main` simplesmente aguardará que operações de gerenciamento sejam realizadas em `Hello`. No escopo deste exemplo, essas operações de gerenciamento são invocar `sayHello()` e `add()`, e obter e definir os valores dos atributos.

#### Executando o Exemplo de Standard MBean

Tendo examinado as classes de exemplo, você pode executar o exemplo. A Java Platform, Standard Edition inclui um console de gerenciamento e monitoramento, chamado JConsole, que é usado para interagir com o MBean neste exemplo. O JConsole está localizado em `JavaSE_HOME/bin/jconsole`, onde `JavaSE_HOME` é o diretório de instalação da Java Platform, Standard Edition (plataforma Java SE).

Para executar o exemplo:

  1. Copie o código-fonte contido na seção [JMX Essentials](<#/doc/guides/jmx/jmx-essentials-example>) e crie os arquivos correspondentes no diretório `work_dir/jmx_examples/Essential`.

  2. Compile as classes Java de exemplo.

`$ javac com/example/mbeans/*.java`

  3. Inicie a aplicação `Main`.

`$ java com.example.mbeans.Main`

Você verá uma confirmação de que `Main` está aguardando algo acontecer.

  4. Inicie o JConsole em uma janela de terminal diferente na mesma máquina.

`$ jconsole`

Você verá a ferramenta JConsole abrir, apresentando uma lista de agentes JMX em execução aos quais você pode se conectar.

  5. Selecione `com.example.mbeans.Main` na lista na janela “New Connection” e clique em Connect.

Você verá um resumo da atividade atual da sua plataforma.

  6. Clique na aba MBeans.

Este painel mostra todos os MBeans atualmente registrados no MBean server.

  7. No painel esquerdo, expanda o nó `com.example.mbeans` na árvore MBean.

Você verá o MBean de exemplo `Hello`, que foi criado e registrado por `Main`. Se você clicar em `Hello`, verá seus nós Attributes e Operations associados na árvore MBean.

  8. Clique no nó do MBean `Hello` na árvore MBean para exibir os metadados do MBean `Hello` e seu Descriptor associado.
  9. Clique no nó `Attributes` do MBean `Hello` na árvore MBean.

Isso exibe os atributos do MBean que foram definidos pela classe `Hello`.

  10. Altere o valor do atributo `CacheSize` para 150.

Na janela do terminal em que você iniciou `Main`, você verá a confirmação desta alteração de atributo.

  11. Clique no nó `Operations` do MBean Hello na árvore MBean.

Aqui você verá as duas operações declaradas pelo MBean `Hello`, `sayHello()` e `add()`.

  12. Invoque a operação `sayHello()`, clicando no botão `sayHello`.

Uma caixa de diálogo do JConsole informará que o método foi invocado com sucesso, e você verá a mensagem “hello, world” na janela do terminal em que `Main` está em execução.

  13. Forneça dois inteiros para a operação `add()` somar e clique no botão `add`.

Você será informado da resposta em uma caixa de diálogo do JConsole.

  14. Clique em Connection e depois em Exit, para sair do JConsole.

### Enviando Notificações

MBeans podem gerar notificações, por exemplo, para sinalizar uma mudança de estado, um evento detectado ou um problema.

Para um MBean gerar notificações, ele deve implementar a interface `NotificationBroadcaster`, ou sua subinterface `NotificationEmitter`. Tudo o que você precisa fazer para enviar uma notificação é construir uma instância da classe `javax.management.Notification` ou uma subclasse (como `AttributeChangedNotification`), e passá-la para `NotificationBroadcasterSupport.sendNotification`.

Toda notificação tem uma fonte. A fonte é o nome do objeto do MBean que emitiu a notificação.

Toda notificação tem um número de sequência. Este número pode ser usado para ordenar notificações vindas da mesma fonte quando a ordem importa e há o perigo de as notificações serem processadas na ordem errada. Não há problema para o número de sequência ser zero, mas é melhor que ele seja incrementado para cada notificação de um determinado MBean.

Existe um exemplo de um standard MBean que emite notificações no diretório `work_dir/jmx_examples/Notification/com/example/mbeans`. Este exemplo é essencialmente o mesmo do exemplo em [Standard MBeans](<#/doc/guides/jmx/essentials-jmx-api>), exceto que o MBean `Hello` implementa a interface `NotificationBroadcaster`.

#### Interface NotificationBroadcaster

Conforme declarado anteriormente, a única diferença entre este exemplo e o apresentado em [Standard MBeans](<#/doc/guides/jmx/essentials-jmx-api>) é que a implementação do MBean permite o envio de notificações. As notificações são ativadas pela implementação da interface `NotificationBroadcaster`, conforme mostrado no exemplo de código a seguir.

EXEMPLO DE CÓDIGO 10-4 Implementando Notificações MBean
```
     
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
     
        public String getName() { 
            return this.name; 
        } 
     
        public int getCacheSize() { 
            return this.cacheSize; 
        } 
     
        public synchronized void setCacheSize(int size) { 
            int oldSize = this.cacheSize; 
            this.cacheSize = size; 
     
            System.out.println("Cache size now " + this.cacheSize); 
     
            Notification n = 
                new AttributeChangeNotification(this, 
                                                sequenceNumber++, 
                                                System.currentTimeMillis(), 
                                                "CacheSize changed", 
                                                "CacheSize", 
                                                "int", 
                                                oldSize, 
                                                this.cacheSize); 
     
            sendNotification(n); 
        } 
     
        @Override 
        public MBeanNotificationInfo[] getNotificationInfo() { 
            String[] types = new String[] { 
                AttributeChangeNotification.ATTRIBUTE_CHANGE 
            }; 
            String name = AttributeChangeNotification.class.getName(); 
            String description = "An attribute of this MBean has changed"; 
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

Como você pode ver no EXEMPLO DE CÓDIGO 10-4 Implementando Notificações MBean, esta implementação do MBean `Hello` estende a classe `NotificationBroadcasterSupport`, que por sua vez implementa a interface `NotificationEmitter`.

As operações e atributos são definidos da mesma forma que antes, com a única exceção de que o método setter do atributo `cacheSize` agora define um novo valor `oldSize`, que registra o valor do atributo `cacheSize` antes da operação de definição.

A notificação é construída a partir de uma instância, `n`, da classe JMX `AttributeChangeNotification`, que estende `javax.management.Notification`. A notificação é construída dentro da definição do método `setCacheSize()`, a partir das seguintes informações, que são passadas para `AttributeChangeNotification` como parâmetros:

  * O nome do objeto da fonte da notificação, ou seja, o MBean `Hello`, representado simplesmente por `this`
  * Um número de sequência, que neste exemplo é um long chamado `sequenceNumber`, que é definido como 1 e que aumenta incrementalmente
  * Um timestamp
  * O conteúdo da mensagem de notificação
  * O nome do atributo que foi alterado, neste caso `cacheSize`
  * O tipo de atributo que foi alterado
  * O valor antigo do atributo, neste caso `oldSize`
  * O novo valor do atributo, neste caso `this.cacheSize`

A notificação n é então passada para o método `NotificationBroadcasterSupport.sendNotification()`.

Finalmente, o `MBeanNotification` é definido para descrever as características das diferentes instâncias de notificação emitidas pelo MBean para uma dada classe Java de notificação, que neste caso são notificações `AttributeChangeNotification`.

A interface MBean, `HelloMBean`, e o agente JMX `Main` são idênticos aos usados no exemplo anterior.

#### Executando o Exemplo de Notificação MBean

Tendo examinado as classes de exemplo, você pode agora executar o exemplo. Este exemplo usa o JConsole para interagir com o MBean `Hello`. Para executar o exemplo:

  1. Copie os exemplos de código-fonte contidos na seção [Notificações JMX MBean](<#/doc/guides/jmx/jmx-mbean-notifications-example>) para `work_dir/jmx_examples/Notification`.

  2. Compile as classes Java de exemplo.
``` $ javac com/example/mbeans/*.java
```

  3. Inicie a aplicação `Main`.
``` $ java com.example.mbeans.Main
```

Você verá a confirmação de que `Main` está aguardando algo acontecer.

  4. Inicie o JConsole em uma janela de terminal diferente na mesma máquina.
``` $ jconsole
```

Você verá a ferramenta JConsole abrir, apresentando uma lista de agentes JMX em execução aos quais você pode se conectar.

  5. Selecione `com.example.mbeans.Main` na lista na janela New Connection e clique em Connect.

Você verá um resumo da atividade atual da sua plataforma.

  6. Clique na aba MBeans.

Este painel mostra todos os MBeans atualmente registrados no MBean server.

  7. No painel esquerdo, expanda o nó `com.example.mbeans` na árvore MBean.

Você verá o MBean de exemplo `Hello`, que foi criado e registrado por `Main`. Se você clicar em `Hello`, verá seus nós `Attributes`, `Operations` e `Notifications` associados na árvore MBean.

  8. Clique no nó do MBean `Hello` na árvore MBean.

Isso exibe os metadados do MBean e seu Descriptor associado.

  9. Clique no nó `Notifications` do MBean Hello na árvore MBean.

Você verá que o painel está em branco.

  10. Clique no botão “Subscribe”.

O número atual de notificações recebidas (0) será exibido no rótulo do nó Notifications.

  11. Clique no nó `Attributes` do MBean `Hello` na árvore MBean e altere o valor do atributo `CacheSize` para 150.

Na janela do terminal em que você iniciou `Main`, você verá a confirmação desta alteração de atributo. Você também verá que o número de notificações recebidas exibido no nó Notifications mudou para 1.

  12. Clique no nó `Notifications` do MBean `Hello` na árvore MBean novamente.

Você verá os detalhes da notificação que foi enviada.

  13. Clique em Connection e depois em Exit, para sair do JConsole.

### Introduzindo MXBeans

Um MXBean é um tipo de MBean que oferece uma maneira simples de codificar um MBean que referencia apenas um conjunto predefinido de tipos. Dessa forma, você pode ter certeza de que seu MBean será utilizável por qualquer cliente, incluindo clientes remotos, sem a necessidade de que o cliente tenha acesso a classes específicas do modelo que representam os tipos de seus MBeans. MXBeans fornecem uma maneira conveniente de agrupar valores relacionados sem exigir que os clientes sejam configurados especialmente para lidar com os agrupamentos.

Da mesma forma que para standard MBeans, um MXBean é definido escrevendo uma interface Java chamada Something`MXBean` e uma classe Java que implementa essa interface. No entanto, ao contrário dos standard MBeans, os MXBeans não exigem que a classe Java seja chamada `Something`. Cada método na interface define um atributo ou uma operação no MXBean. A anotação `@MXBean` também pode ser usada para anotar a interface Java em vez de exigir que o nome da interface seja seguido pelo sufixo MXBean.

MXBeans fornecem uma maneira conveniente de agrupar valores relacionados em um MBean sem exigir que os clientes sejam configurados especialmente para lidar com os agrupamentos ao interagir com esse MBean. MXBeans existem na Java 2 Platform, Standard Edition (J2SE) 5.0, no pacote `java.lang.management`. Com a plataforma Java SE 6, os usuários agora podem definir seus próprios MXBeans, além do conjunto padrão definido em `java.lang.management`.

A ideia chave por trás dos MXBeans é que tipos como `java.lang.management.MemoryUsage` que são referenciados na interface MXBean, `java.lang.management.MemoryMXBean` neste caso, são mapeados para um conjunto padrão de tipos, os chamados Open Types que são definidos no pacote `javax.management.openmbean`. As regras exatas de mapeamento aparecem na especificação MXBean, mas para simplificar excessivamente, poderíamos dizer que tipos simples como `int` ou `String` permanecem inalterados, enquanto tipos complexos como `MemoryUsage` são mapeados para o tipo padrão `CompositeDataSupport`.

A operação dos MXBeans é demonstrada por programas de exemplo em [MXBeans](<#/doc/guides/jmx/mxbeans-example>). O exemplo de MXBean contém os seguintes arquivos:

  * Interface `QueueSamplerMXBean`.
  * Classe `QueueSampler` que implementa a interface MXBean.
  * Tipo Java `QueueSample` retornado pelo método `getQueueSample()` na interface MXBean.
  * `Main`, o programa que configura e executa o exemplo.

O exemplo de MXBean executa as seguintes ações.

  * Define um MXBean simples que gerencia um recurso do `type Queue<String>`.
  * Declara um getter, `getQueueSample`, no MXBean que tira um snapshot da fila quando invocado e retorna uma classe Java `QueueSample` que agrupa os seguintes valores:
    * A hora em que o snapshot foi tirado.
    * O tamanho da fila.
    * O elemento principal da fila naquele momento.
  * Registra o MXBean em um MBean server.

#### Interface QueueSamplerMXBean

O exemplo de código a seguir mostra o código-fonte para a interface de exemplo `QueueSamplerMXBean`.

EXEMPLO DE CÓDIGO 10-5 Interface QueueSamplerMXBean
```
     
    package com.example.mxbeans; 
     
    public interface QueueSamplerMXBean { 
        public QueueSample getQueueSample(); 
        public void clearQueue(); 
    } 
     
    
```

Como você pode ver, você declara uma interface MXBean exatamente da mesma forma que declara um standard MBean. A interface `QueueSamplerMXBean` declara duas operações, `getQueueSample` e `clearQueue`.

#### Classe QueueSampler

A classe `QueueSampler` implementa a interface `QueueSamplerMXBean` mostrada no exemplo de código a seguir.

EXEMPLO DE CÓDIGO 10-6 Classe QueueSampler
```
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

As operações MXBean `getQueueSample()` e `clearQueue()` declaradas pela interface MXBean são definidas em `QueueSampler`. A operação `getQueueSample()` simplesmente retorna uma instância do tipo Java `QueueSample`, criada com os valores retornados pelos métodos `peek()` e `size()` de `java.util.Queue` e uma instância de `java.util.Date`.

#### Classe QueueSample

A instância `QueueSample` retornada por `QueueSampler` é definida na classe `QueueSample` mostrada no exemplo de código a seguir.

EXEMPLO DE CÓDIGO 10-7 Classe QueueSample
```
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

Na classe `QueueSample`, o framework MXBean chama todos os getters em `QueueSample` para converter a instância dada em um `CompositeData` e usa a anotação `@ConstructorProperties` para reconstruir uma instância `QueueSample` a partir de um `CompositeData`.

#### Criando e Registrando o MXBean no MBean Server

Tendo definido uma interface MXBean e a classe que a implementa, bem como o tipo Java que é retornado, o MXBean deve agora ser criado e registrado em um MBean server. Essas ações são realizadas pela seguinte classe de exemplo de código `Main`.

EXEMPLO DE CÓDIGO 10-8 Classe Main de exemplo de MXBean
```
    package com.example.mxbeans; 
     
    import java.lang.management.ManagementFactory; 
    import java.util.Queue; 
    import java.util.concurrent.ArrayBlockingQueue; 
    import javax.management.MBeanServer; 
    import javax.management.ObjectName; 
     
    public class Main { 
     
        public static void main(String[] args) throws Exception { 
            MBeanServer mbs = ManagementFactory.getPlatformMBeanServer(); 
             
            ObjectName name = 
                    new ObjectName("com.example.mxbeans:type=QueueSampler"); 
             
            Queue<String> queue = new ArrayBlockingQueue<String>(10); 
            queue.add("Request-1"); 
            queue.add("Request-2"); 
            queue.add("Request-3"); 
            QueueSampler mxbean = new QueueSampler(queue); 
             
            mbs.registerMBean(mxbean, name); 
             
            System.out.println("Waiting..."); 
            Thread.sleep(Long.MAX_VALUE); 
        } 
    } 
     
    
```

A classe `Main` obtém o MBean server da plataforma, cria um nome de objeto para o MXBean `QueueSampler`, cria uma instância `Queue` para o MXBean `QueueSampler` processar e alimenta esta instância Queue a um MXBean `QueueSampler` recém-criado. O MXBean é então registrado no MBean server exatamente da mesma forma que um standard MBean.

#### Executando o Exemplo de MXBean

Para executar o exemplo de MXBean:

  1. Copie o código-fonte contido na seção [MXBeans](<#/doc/guides/jmx/mxbeans-example>) para `work_dir/jmx_examples/MXBean`.

  2. Compile as classes Java de exemplo.
``` $ javac com/example/mxbeans/*.java
```

  3. Inicie a aplicação `Main`.
``` $ java com.example.mxbeans.Main
```

Você verá a confirmação de que `Main` está aguardando algo acontecer.

  4. Inicie o JConsole em uma janela de terminal diferente na mesma máquina.
``` $ jconsole
```

Você verá a ferramenta JConsole abrir, apresentando uma lista de agentes JMX em execução aos quais você pode se conectar.

  5. Selecione `com.example.mxbeans.Main` na lista na janela New Connection e clique em Connect.

Você verá um resumo da atividade atual da sua plataforma.

  6. Clique na aba MBeans.

Este painel mostra todos os MBeans atualmente registrados no MBean server.

  7. No painel esquerdo, expanda o nó `com.example.mxbeans` na árvore MBean.

Você verá o MBean de exemplo `QueueSampler`, que foi criado e registrado por Main. Se você clicar em `QueueSampler`, verá seus nós Attributes e Operations associados na árvore MBean.

  8. Selecione o nó `Attributes`.

Você verá o atributo `QueueSample` aparecer no painel direito, com seu valor de `javax.management.openmbean.CompositeDataSupport`.

  9. Dê um clique duplo no valor `CompositeDataSupport`.

Você pode ver os valores `date`, `head` e `size` de `QueueSample` porque o framework MXBean converteu a instância `QueueSample` em `CompositeData`. Se você tivesse definido `QueueSampler` como um Standard MBean em vez de um MXBean, o JConsole não teria encontrado a classe `QueueSample` porque ela não estaria em seu classpath. Se `QueueSampler` tivesse sido um standard MBean, você teria recebido uma `ClassNotFoundException` ao recuperar o valor do atributo `QueueSample`. Isso demonstra a utilidade de usar MXBeans ao conectar-se a agentes JMX através de clientes JMX genéricos, como o JConsole.

  10. Selecione o nó Operations.

Você verá um botão para invocar a operação `clearQueue`.

  11. Clique no botão `clearQueue`.

Você será informado de que o método foi invocado com sucesso.

  12. Selecione o nó Attributes novamente e dê um clique duplo no valor `CompositeDataSupport`.

A fila foi redefinida agora.

  13. Clique em Connection e depois em Exit, para sair do JConsole.

Neste exemplo, o JConsole foi usado como cliente JMX, mas se você fosse acessar seu MXBean programaticamente em um cliente JMX que você mesmo escrevesse, então você poderia fazê-lo de duas maneiras:

  * Genericamente, usando o seguinte código:
```MBeanServer mbs = ...whatever...; 
        ObjectName name = new ObjectName("com.example.mxbeans:type=QueueSampler"); 
        CompositeData queueSample = (CompositeData) mbs.getAttribute(name,  
                                     "QueueSample"); 
        int size = (Integer) queueSample.get("size"); 
        
```

  * Via um proxy, usando o seguinte código:
```MBeanServer mbs = ...whatever...; 
        ObjectName name = new ObjectName("com.example.mxbeans:type=QueueSampler"); 
        QueueSamplerMXBean proxy = JMX.newMXBeanProxy(mbs, name,  
                                                      QueueSamplerMXBean.class); 
        QueueSample queueSample = proxy.getQueueSample(); 
        int size = queueSample.getSize(); 
        
```

Este código usa o método `newMXBeanProxy` para criar o proxy MXBean. Um método equivalente, `newMBeanProxy`, existe para criar proxies para outros tipos de MBeans. Os métodos `newMBeanProxy` e `newMXBeanProxy` são usados exatamente da mesma forma.

### MBean Descriptors

Descriptors permitem que você forneça informações adicionais sobre MBeans a clientes de gerenciamento. Por exemplo, um Descriptor em um atributo MBean pode indicar em que unidades ele é medido, ou quais são seus valores mínimos e máximos possíveis. A partir do Java SE 6, os Descriptors são uma parte integrada da API JMX e estão disponíveis em todos os tipos de MBeans.

Descriptors oferecem uma maneira conveniente de anexar metadados extras arbitrários aos seus MBeans. Descriptors sempre existiram na API JMX, mas até o Java SE 6 eles estavam disponíveis apenas em conjunto com Model MBeans.

Para a maioria dos construtores nas classes `MBean*Info` (`MBeanInfo`, `MBeanAttributeInfo`, e assim por diante), existe um construtor paralelo com os mesmos parâmetros mais um parâmetro `javax.management.Descriptor` adicional. O mesmo é verdadeiro para `OpenMBean*InfoSupport`. As classes `MBean*Info` e `OpenMBean*InfoSupport` contêm um método `getDescriptor()`.

Open MBeans retornam informações sobre valores padrão e válidos dos métodos `getDefaultValue()`, `getLegalValues()`, `getMaxValue()`, `getMinValue()` de `OpenMBeanParameterInfo` e `OpenMBeanAttributeInfo`. Esta informação agora também está presente nos Descriptors correspondentes, e outros tipos de MBean também podem retornar a informação em seus Descriptors.
Os MBean Descriptors são demonstrados nas classes de exemplo que você encontrará no diretório work_dir`/jmx_examples/Descriptors/com/example/mxbeans` depois de baixar e descompactar o arquivo `jmx_examples.zip`. O exemplo de MBean Descriptor contém os seguintes arquivos.

  * `Author`, uma annotation que fornece o nome do autor da interface MBean.
  * `DisplayName`, uma annotation que fornece um nome de exibição para métodos na interface MBean.
  * `Main`, o programa que configura e executa o exemplo.
  * Interface `QueueSamplerMXBean`.
  * Classe `QueueSampler` que implementa a interface MXBean.
  * Tipo Java `QueueSample` retornado pelo método `getQueueSample()` na interface MXBean.
  * `Version`, uma annotation que fornece a versão atual da interface MBean.

O MXBean `QueueSampler` neste exemplo basicamente executa as mesmas ações que o exemplo de MXBean apresentado em [Introduzindo MXBeans](<#/doc/guides/jmx/essentials-jmx-api>), exceto pela adição de MBean Descriptors. Este exemplo mostra como a meta-annotation `DescriptorKey` pode ser usada para adicionar novos itens de descriptor aos Descriptors para um MBean padrão (ou um MXBean) via annotations na interface do MBean padrão (ou MXBean).

#### Annotations DescriptorKey

A annotation `DescriptorKey` pode ser usada para adicionar informações aos Descriptors para um MBean padrão ou um MXBean através de annotations na interface Standard MBean ou MXBean. Isso torna possível para uma ferramenta que gera MBeans padrão a partir de um modelo de gerenciamento existente incluir informações do modelo nas interfaces MBean geradas, em vez de em arquivos separados. O exemplo de código a seguir demonstra a definição da annotation `Author`.

EXEMPLO DE CÓDIGO 10-9 Annotation Author
```
     
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

Esta annotation fornece o nome do criador da interface MBean. Um novo campo `author` será adicionado ao Descriptor `MBeanInfo` com o valor definido pela annotation `@Author`. Os arquivos `Version` e `DisplayName` definem annotations com esses nomes exatamente da mesma forma que para `Author` acima. Em cada um de `Version` e `DisplayName`, o valor de `@DescriptorKey` é `“version”` e `“displayname”` respectivamente.

No caso de Version, um novo campo `version` será adicionado ao Descriptor `MBeanInfo` com o valor definido pela annotation `@Version`.

Para `DisplayName`, o novo campo `displayName` será adicionado ao Descriptor `MBeanAttributeInfo` ou ao Descriptor `MBeanOperationInfo` com o valor definido pela annotation `@DisplayName`, dependendo se o método anotado é um getter/setter ou uma operation, respectivamente.

#### Usando MBean Descriptors

A interface `QueueSamplerMXBean` usada no exemplo de código a seguir é ligeiramente diferente daquela usada no exemplo de MXBeans. Ela implementa MBean Descriptors para publicar algumas de suas informações.

EXEMPLO DE CÓDIGO 10-10 QueueSamplerMXBean com Descriptors
```
     
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

Aqui, a annotation `@Author` é definida como `Mr. Bean`, a annotation `@Version` é definida como `1.0`, e o `@DisplayName` é definido para os nomes do attribute `QueueSample` ou da operation `clearQueue`.

#### Executando o Exemplo de MBean Descriptors

Para executar o exemplo:

  1. Copie o código-fonte contido na seção [MBean Descriptors](<#/doc/guides/jmx/mbean-descriptors-example>) para `work_dir/jmx_examples/Descriptors`.

  2. Compile as classes Java de exemplo.
``` $ javac com/example/mxbeans/*.java
```

  3. Inicie a aplicação `Main`.
``` $ java com.example.mxbeans.Main
```

Você verá a confirmação de que `Main` está aguardando algo acontecer.

  4. Inicie o JConsole em uma janela de terminal diferente na mesma máquina.
``` $ jconsole
```

Você verá a ferramenta JConsole abrir, apresentando uma lista de agentes JMX em execução aos quais você pode se conectar.

  5. Selecione `com.example.mxbeans.Main` da lista na janela New Connection e clique em Connect.

Você verá um resumo da atividade atual da sua plataforma.

  6. Clique na aba MBeans.

Este painel mostra todos os MBeans atualmente registrados no MBean server.

  7. No painel esquerdo, expanda o nó `com.example.mxbeans` na árvore MBean.

Você verá o MBean de exemplo `QueueSampler`, que foi criado e registrado por Main. Se você clicar em `QueueSampler`, verá seus nós Attributes e Operations associados na árvore MBean. Você também verá os campos `author` e `version` na tabela `MBeanInfo` Descriptor.

  8. Expanda os nós `Attributes` e `Operations` sob o nó MBean `QueueSampler`.

Você verá os Attributes e Operations individuais.

  9. Selecione o nó `QueueSample`.

Você verá o campo `displayName` na tabela `MBeanAttributeInfo` Descriptor.

  10. Selecione o nó `clearQueue`.

Você verá o campo `displayName` na tabela `MBeanOperationInfo` Descriptor.

  11. Clique em Connection e depois em Exit, para sair do JConsole.