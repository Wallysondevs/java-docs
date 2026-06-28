# Eventos Periódicos

## 12 Eventos Periódicos

O exemplo `PeriodicSample.java` cria um evento periódico chamado `StartedThreadCount` que registra o número total de threads que foram criadas e iniciadas a cada segundo.
```java
    import java.lang.management.ManagementFactory;
    import java.lang.management.ThreadMXBean;
    
    import jdk.jfr.Event;
    import jdk.jfr.FlightRecorder;
    import jdk.jfr.Label;
    import jdk.jfr.Name;
    import jdk.jfr.Period;
    
    public class PeriodicSample {
    
        private static ThreadMXBean tBean =
            ManagementFactory.getThreadMXBean();
    
        @Name("com.oracle.StartedThreadCount")
        @Label("Total number of started threads")
        @Period("1 s")
        static class StartedThreadCount extends Event {
            long totalStartedThreadCount;
        }
    
        public static void main(String[] args) throws InterruptedException {
    
            Runnable hook = () -> {
                StartedThreadCount event = new StartedThreadCount();
                event.totalStartedThreadCount =
                    tBean.getTotalStartedThreadCount();
                event.commit();
            };
    
            FlightRecorder.addPeriodicEvent(StartedThreadCount.class, hook);
    
            for (int i = 0; i < 4; i++) {
                Thread.sleep(1500);
                Thread t = new Thread();
                t.start();
            }
          
            FlightRecorder.removePeriodicEvent(hook);
        }
    }
```

Execute `PeriodicSample` com os seguintes comandos:
```bash
    java -XX:StartFlightRecording:filename=periodic.jfr PeriodicSample.java
    jfr print --events StartedThreadCount periodic.jfr 
```

O último comando imprime uma saída semelhante à seguinte:
```
    com.oracle.StartedThreadCount {
      startTime = 00:59:40.769
      totalStartedThreadCount = 12
        ...
    }
    
    com.oracle.StartedThreadCount {
      startTime = 00:59:41.816
      totalStartedThreadCount = 12
        ...
    }
    
    com.oracle.StartedThreadCount {
      startTime = 00:59:42.866
      totalStartedThreadCount = 13
        ...
    }
    
    com.oracle.StartedThreadCount {
      startTime = 00:59:43.918
      totalStartedThreadCount = 14
        ...
    }
    
    com.oracle.StartedThreadCount {
      startTime = 00:59:44.962
      totalStartedThreadCount = 14
        ...
    }
```

Para criar um evento periódico, siga estes dois passos:

  1. Especifique a frequência com que o evento deve ser emitido com a anotação @Period:
```java
@Name("com.oracle.StartedThreadCount")
         @Label("Total number of started threads")
         @Period("1 s")
         static class StartedThreadCount extends Event {
             long totalStartedThreadCount;
         }
```

Unidades válidas para um período são: `ns`, `us`, `ms`, `s`, `m`, `h` e `d`.

Você também pode especificar um dos seguintes:

     * `everyChunk`: Um evento periódico será emitido pelo menos uma vez na gravação.
     * `beginChunk`: Um evento periódico será emitido no início de uma gravação.
     * `endChunk`: Um evento periódico será emitido no final de uma gravação.
  2. Adicione o evento periódico com o método estático FlightRecorder.addPeriodicEvent(Class<? extends Event>, Runnable). O primeiro argumento é o nome da classe do evento periódico. O segundo argumento é um método de callback que é representado por uma expressão lambda que cria e commita o evento:
```java
Runnable hook = () -> {
             StartedThreadCount event = new StartedThreadCount();
             event.totalStartedThreadCount =
                 tBean.getTotalStartedThreadCount();
             event.commit();
         };
         
         FlightRecorder.addPeriodicEvent(StartedThreadCount.class, hook);
```

O método FlightRecorder.removePeriodicEvent(Runnable) remove a expressão lambda associada a um evento periódico. Na maioria dos casos, você não precisará deste método; se quiser desabilitar um evento periódico, você pode chamar Recording.disable(Class<? extends Event>). No entanto, uma razão para chamar removePeriodicEvent é evitar vazamentos de memória. Por exemplo, suponha que você tenha um servidor de aplicação onde os dados são carregados e descarregados. Se o método de callback referenciar dados que o servidor carrega e descarrega, isso pode impedir que esses dados sejam garbage collected. Você pode evitar isso removendo o método de callback quando os dados são descarregados.