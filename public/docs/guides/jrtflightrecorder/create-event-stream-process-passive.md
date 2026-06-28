# Criar Event Stream em Processo, Passivo

## 19 Criar Event Stream em Processo, Passivo

O exemplo `PassiveEventStreamSample.java` inicia um event stream passivo com o método `EventStream.openRepository()`. Assim como qualquer event stream, um event stream passivo escuta por eventos; neste exemplo, ele escuta por eventos `jdk.CPULoad`. No entanto, o que é gravado é controlado por meios externos, por exemplo, pela opção de linha de comando `-XX:StartFlightRecording`, o comando `jcmd JFR.start`, ou uma API (por exemplo, `Recording::start()`).

O exemplo `PassiveEventStreamSample.java` cria um event stream não com `RecordingStream`, mas com `EventStream.openRepository()`. Um event stream requer uma gravação; este exemplo a obtém da opção de linha de comando `-XX:StartFlightRecording`.
```java
    import java.util.concurrent.atomic.AtomicInteger;
    
    import jdk.jfr.consumer.EventStream;
    
    public class PassiveEventStreamSample {
    
        static int NUMBER_CPULOAD_EVENTS = 3;
    
        public static void main(String... args) throws Exception {
    
            AtomicInteger timer = new AtomicInteger();
    
            try (EventStream es = EventStream.openRepository()) {
                es.onEvent("jdk.CPULoad", event -> {
                    System.out.println("CPU Load " + event.getEndTime());
                    System.out.println(" Machine total: "
                        + 100 * event.getFloat("machineTotal") + "%");
                    System.out.println(
                        " JVM User: " + 100 * event.getFloat("jvmUser") +
                        "%");
                    System.out.println(
                        " JVM System: " + 100 * event.getFloat("jvmSystem") +
                        "%");
                    System.out.println();
                    if (timer.incrementAndGet() == NUMBER_CPULOAD_EVENTS) {
                        System.exit(0);
                    }
                });
                es.start();
            }
        }
    }
```

Execute `PassiveEventStreamSample` com o seguinte comando:
```
    java -XX:StartFlightRecording PassiveEventStreamSample.java
```

Ele imprime uma saída similar à seguinte:
```
    Started recording 1. No limit specified, using maxsize=250MB as default.
    
    Use jcmd 12352 JFR.dump name=1 filename=FILEPATH to copy recording data to file.
    CPU Load 2020-01-24T05:34:36.265584686Z
     Machine total: 19.3799%
     JVM User: 5.2175264%
     JVM System: 1.8634024%
    
    CPU Load 2020-01-24T05:34:37.310049859Z
     Machine total: 5.2533073%
     JVM User: 0.0%
     JVM System: 0.3899041%
    
    CPU Load 2020-01-24T05:34:38.373796070Z
     Machine total: 7.242967%
     JVM User: 0.0%
     JVM System: 1.1451485%
```