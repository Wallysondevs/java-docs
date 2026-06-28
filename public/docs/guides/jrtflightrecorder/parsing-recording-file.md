# Analisando um Arquivo de Gravação

## Parte V Analisando um Arquivo de Gravação

O exemplo `ParseRecordingFileSample.java` descreve várias maneiras de analisar um arquivo de gravação. Ele inicia uma gravação para registrar vários eventos `Hello` e `Message`.
```java
    import java.io.IOException;
    import java.nio.file.Files;
    import java.nio.file.Path;
    
    import jdk.jfr.Event;
    import jdk.jfr.EventType;
    import jdk.jfr.Label;
    import jdk.jfr.Name;
    import jdk.jfr.Recording;
    import jdk.jfr.consumer.EventStream;
    import jdk.jfr.consumer.RecordingFile;
    
    public class ParseRecordingFileSample {
        
        @Name("com.oracle.Hello")
        @Label("Hello World!")
        static class Hello extends Event {
            @Label("Greeting")
            String greeting;
        }
        
        @Name("com.oracle.Message")
        @Label("Message")
        static class Message extends Event {
            @Label("Text")
            String text;
        }
    
        public static void main(String... args) throws IOException {
    
            try (Recording r = new Recording()) {
                r.start();
                for (int i = 0; i < 3; i++) {
                    Message messageEvent = new Message();
                    messageEvent.begin();
                    messageEvent.text = "message " + i;
                    messageEvent.commit();
                    
                    Hello helloEvent = new Hello();
                    helloEvent.begin();
                    helloEvent.greeting = "hello " + i;
                    helloEvent.commit();
                }
                r.stop();
                Path file = Files.createTempFile("recording", ".jfr");
                r.dump(file);
              
                try (var recordingFile = new RecordingFile(file)) {
                    System.out.println("Reading events one by one");
                    System.out.println("=========================");
                    while (recordingFile.hasMoreEvents()) {
                        var e = recordingFile.readEvent();
                        String eventName = e.getEventType().getName();
                        System.out.println("Name: " + eventName);
                    }
                    System.out.println();
                    System.out.println("List of registered event types");
                    System.out.println("==============================");
                    for (EventType eventType : recordingFile.readEventTypes())
                    {
                        System.out.println(eventType.getName());
                    }
                }
                System.out.println();
    
                System.out.println("Reading all events at once");
                System.out.println("==========================");
                
                for (var e : RecordingFile.readAllEvents(file)) {
                    String eventName = e.getEventType().getName();
                    System.out.println("Name: " + eventName);
                }
                System.out.println();
                
                System.out.println("Reading events one by one, printing only "
                        + "com.oracle.Message events");
                System.out.println("========================================="
                        + "=========================");
                
                try (EventStream eventStream = EventStream.openFile(file)) {
                    eventStream.onEvent("com.oracle.Message", e -> {
                        System.out.println(
                            "Name: " + e.getEventType().getName());
                    });
                    eventStream.start();
                }
            }
        }
    }
```

Execute `ParseRecordingFileSample` com este comando:
```bash
    java ParseRecordingFileSample.java
```

Ao executar `ParseRecordingFileSample`, você não precisa iniciar o Flight Recorder com a opção de linha de comando `-XX:StartFlightRecording`; o método Recording.start() o inicia. `ParseRecordingFileSample` imprime o seguinte:
```
    Reading events one by one
    =========================
    Name: com.oracle.Message
    Name: com.oracle.Hello
    Name: com.oracle.Message
    Name: com.oracle.Hello
    Name: com.oracle.Message
    Name: com.oracle.Hello
    
    List of registered event types
    ==============================
    jdk.ThreadStart
    jdk.ThreadEnd
    jdk.ThreadSleep
    ...
    jdk.X509Validation
    com.oracle.Message
    com.oracle.Hello
    
    Reading all events at once
    ==========================
    Name: com.oracle.Message
    Name: com.oracle.Hello
    Name: com.oracle.Message
    Name: com.oracle.Hello
    Name: com.oracle.Message
    Name: com.oracle.Hello
    
    Reading events one by one, printing only com.oracle.Message events
    ==================================================================
    Name: com.oracle.Message
    Name: com.oracle.Message
    Name: com.oracle.Message
```

Gravar Dados de Gravação em um Arquivo

`ParseRecordingFileSample` demonstra várias maneiras de analisar um arquivo de gravação. No entanto, você primeiro precisa de um arquivo de gravação, e este exemplo não cria um na linha de comando. Em vez disso, ele chama Recording.dump(Path) para gravar dados de gravação em um arquivo temporário:
```java
    Path file = Files.createTempFile("recording", ".jfr");
    r.dump(file);
```

Observe que a gravação deve ser iniciada, mas não necessariamente parada.

Ler Eventos Um por Um

Use esta técnica para gravações grandes e se precisar acessar metadados.

O método RecordingFile.readEvent() lê o próximo evento na gravação enquanto RecordingEvent.hasMoreEvents() retorna `true` se existirem eventos não lidos no arquivo de gravação:
```java 
    while (recordingFile.hasMoreEvents()) {
        var e = recordingFile.readEvent();
        String eventName = e.getEventType().getName();
        System.out.println("Name: " + eventName);
    }
```

Listar Tipos de Eventos Registrados

O método RecordingFile.readEventTypes() retorna uma lista de todos os tipos de eventos na gravação.

Ler Todos os Eventos de Uma Vez

Use esta técnica para gravações menores que cabem na memória.

O método RecordingFile.readAllEvents(Path) retorna uma lista de todos os eventos no arquivo de gravação. É destinado a arquivos de gravação pequenos, onde é mais conveniente ler todos os eventos em uma única operação. Não é destinado à leitura de arquivos de gravação grandes.

Ler Apenas Eventos Específicos com a API de Event Streaming

Para processar apenas eventos específicos, você poderia ler os eventos um por um com RecordingFile.readEvent(), conforme descrito anteriormente, e então verificar o nome do evento. No entanto, se você usar a API de event streaming, os objetos de evento do mesmo tipo são reutilizados para reduzir a pressão de alocação.

Esta técnica envolve a criação de um event stream com EventStream.openFile(Path), e então chamando EventStream.onEvent(String eventName, Consumer) para registrar uma ação que será executada se `eventName` corresponder ao nome do evento:
```java 
    try (EventStream eventStream = EventStream.openFile(file)) {
        eventStream.onEvent("com.oracle.Message", e -> {
            System.out.println("Name: " +
                e.getEventType().getName());
        });
        eventStream.start();
    }
```