# Criar Fluxo de Eventos em Processo, Ativo

## 18 Criar Fluxo de Eventos em Processo, Ativo

O exemplo `StreamEventsSample.java` cria um fluxo de eventos ao mesmo tempo em que uma gravação é criada. Um fluxo de eventos é uma sequência de eventos.

A classe `RecordingStream` inicia uma gravação e cria um fluxo de eventos ao mesmo tempo. O exemplo chama `Thread.sleep(1000)` três vezes, o que cria três eventos `jdk.ThreadSleep`. A Event Streaming API imprime os eventos `jdk.ThreadSleep` quando eles ocorrem:
```java
    import jdk.jfr.Configuration;
    import jdk.jfr.consumer.RecordingStream;
    
    public class StreamEventsSample {
    
        public static void main(String... args) throws Exception {
            Configuration c = Configuration.getConfiguration("profile");
            try (RecordingStream rs = new RecordingStream(c)) {           
                rs.onEvent("jdk.ThreadSleep", System.out::println);
                System.out.println("Starting recording stream ...");
                rs.startAsync();            
                for (int i = 0; i < 3; i++) {
                    System.out.println("Sleeping for 1s...");
                    Thread.sleep(1000);
                }
            }
        }
    }
```

Execute `StreamEventsSample` com o seguinte comando:
```bash
    java -XX:StartFlightRecording StreamEventsSample.java
```

Ele imprime uma saída semelhante à seguinte:
```
    Started recording 1. No limit specified, using maxsize=250MB as default.
    
    Use jcmd 7400 JFR.dump name=1 filename=FILEPATH to copy recording data to file.
    Starting recording stream ...
    Sleeping for 1s...
    Sleeping for 1s...
    jdk.ThreadSleep {
      startTime = 00:26:42.463
      duration = 2.14 s
      time = 1.00 s
      ...
    }
    
    Sleeping for 1s...
    jdk.ThreadSleep {
      startTime = 00:26:44.602
      duration = 1.04 s
      time = 1.00 s
      ...
    }
```

Siga estes passos para criar um fluxo de eventos a partir de uma gravação com a classe `RecordingStream`:

  1. Opcionalmente, especifique uma configuração predefinida ("default" ou "profile") com a classe `Configuration`.
  2. Crie uma instância de `RecordingStream` com o método `Configuration.getConfiguration()` ou `Configuration.getConfiguration(Configuration)`.
  3. Opcionalmente, habilite os eventos que você deseja incluir no fluxo de eventos com o método `RecordingStream::enable(String)`.
  4. Especifique ações a serem executadas em eventos no fluxo. Para especificar uma ação a ser executada em todos os eventos, use o método `onEvent(Consumer<RecordedEvent>)`. Por exemplo, a seguinte instrução imprime o nome de todos os eventos no fluxo para a saída padrão:
```java
 rs.onEvent(e -> { System.out.println(e.getEventType().getName()); });
```

Use o `onEvent(String, Consumer<RecordedEvent>)` para especificar uma ação a ser executada em um evento específico. Por exemplo, a seguinte instrução imprime eventos cujo nome corresponde a `jdk.ThreadSleep`:
```java
rs.onEvent("jdk.ThreadSleep", System.out::println);
```

  5. Inicie o fluxo de eventos com o método `start()` ou `startAsync()`. Este exemplo chama `startAsync()`, que executa o fluxo em uma thread em segundo plano. Se você chamar o método `start()`, a aplicação não prosseguirá além desta chamada de método até que o fluxo seja fechado.