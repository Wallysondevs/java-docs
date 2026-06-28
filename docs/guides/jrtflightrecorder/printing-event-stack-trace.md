# Imprimindo Stack Trace de Evento

## 13 Imprimindo Stack Trace de Evento

O exemplo `StackTraceSample.java` imprime informações sobre o stack trace de um evento.

`StackTraceSample` usa a Event Streaming API (veja [Monitorar Eventos com a Flight Recorder Event Streaming API](<#/doc/guides/jrtflightrecorder/monitor-events-flight-recorder-event-streaming-api>)) para imprimir informações de stack trace de eventos `WithStackTrace`. O exemplo chama recursivamente o método `firstFunc` seis vezes. Este método cria um evento chamado `WithStackTrace`. Toda vez que um `WithStackTrace` ocorre, informações sobre o stack trace do evento são impressas.
```java
    import java.util.List;
    import java.util.function.Consumer;
    
    import jdk.jfr.Event;
    import jdk.jfr.EventType;
    import jdk.jfr.Label;
    import jdk.jfr.Name;
    import jdk.jfr.StackTrace;
    import jdk.jfr.consumer.RecordedEvent;
    import jdk.jfr.consumer.RecordedFrame;
    import jdk.jfr.consumer.RecordedStackTrace;
    import jdk.jfr.consumer.RecordingStream;
    
    public class StackTraceSample {
    
        @Name("com.oracle.WithStackTrace")
        @Label("With Stack Trace")
        @StackTrace(true)
        static class WithStackTrace extends Event {
            String message;
        }
    
        public static void main(String... args) throws Exception {
            Consumer<RecordedEvent> myCon = x -> {
                EventType et = x.getEventType();
                System.out.println("Label: " + et.getLabel());
                System.out.println("Message: " + x.getValue("message"));
                RecordedStackTrace rst = x.getStackTrace();
                if (rst != null) {
                    List<RecordedFrame> frames = rst.getFrames();
                    System.out.println(
                        "Number of frames: " + frames.size());
                    for (RecordedFrame rf : frames) {
                        System.out.println("Method, line number: "
                            + rf.getMethod().getName() + ", "
                            + rf.getLineNumber());
                    }
                }
                System.out.println("");
            };
    
            try (RecordingStream rs = new RecordingStream()) {
                rs.onEvent("com.oracle.WithStackTrace", myCon);
                rs.startAsync();
                firstFunc(5);
                rs.awaitTermination();
            }
        }
    
        static void firstFunc(int n) {
            if (n > 0) {
                secondFunc(n - 1);
            }
            WithStackTrace event = new WithStackTrace();
            event.message = "n = " + n;
            event.commit();
    
        }
    
        static void secondFunc(int n) {
            firstFunc(n);
        }
    }
```

O exemplo `StackTraceSample` imprime uma saída semelhante à seguinte:
```
    Label: With Stack Trace
    Message: n = 0
    Number of frames: 12
    Method, line number: firstFunc, 97
    Method, line number: secondFunc, 102
    Method, line number: firstFunc, 93
    Method, line number: secondFunc, 102
    Method, line number: firstFunc, 93
    Method, line number: secondFunc, 102
    Method, line number: firstFunc, 93
    Method, line number: secondFunc, 102
    Method, line number: firstFunc, 93
    Method, line number: secondFunc, 102
    Method, line number: firstFunc, 93
    Method, line number: main, 86
    
    Label: With Stack Trace
    Message: n = 1
    Number of frames: 10
    Method, line number: firstFunc, 97
    Method, line number: secondFunc, 102
    Method, line number: firstFunc, 93
    Method, line number: secondFunc, 102
    Method, line number: firstFunc, 93
    Method, line number: secondFunc, 102
    Method, line number: firstFunc, 93
    Method, line number: secondFunc, 102
    Method, line number: firstFunc, 93
    Method, line number: main, 86
    
    Label: With Stack Trace
    Message: n = 2
    Number of frames: 8
    Method, line number: firstFunc, 97
    Method, line number: secondFunc, 102
    Method, line number: firstFunc, 93
    Method, line number: secondFunc, 102
    Method, line number: firstFunc, 93
    Method, line number: secondFunc, 102
    Method, line number: firstFunc, 93
    Method, line number: main, 86
    
    Label: With Stack Trace
    Message: n = 3
    Number of frames: 6
    Method, line number: firstFunc, 97
    Method, line number: secondFunc, 102
    Method, line number: firstFunc, 93
    Method, line number: secondFunc, 102
    Method, line number: firstFunc, 93
    Method, line number: main, 86
    
    Label: With Stack Trace
    Message: n = 4
    Number of frames: 4
    Method, line number: firstFunc, 97
    Method, line number: secondFunc, 102
    Method, line number: firstFunc, 93
    Method, line number: main, 86
    
    Label: With Stack Trace
    Message: n = 5
    Number of frames: 2
    Method, line number: firstFunc, 97
    Method, line number: main, 86
```

O stack trace de um evento, uma instância de `RecordedStackTrace`, consiste em uma lista de instâncias de `RecordedFrame`. Você pode obter as seguintes informações de um `RecordedFrame` com estes métodos:

  * `getMethod()`: Retorna o método do qual o evento foi executado.
  * `getLineNumber()`: Retorna o número da linha do qual o evento foi executado.
  * `isJavaFrame()`: Indica se o `RecordedFrame` é um frame Java.
  * `getBytecodeIndex()`: Retorna o índice de bytecode do qual o evento foi executado.
  * `getType()`: Retorna o tipo de frame; valores possíveis incluem `Interpreted`, `JIT compiled` e `Inlined`.

O Flight Recorder usa uma profundidade de stack padrão de 64 chamadas de método, o que é mais do que suficiente para este exemplo. Você pode alterar isso com a opção de linha de comando `stackdepth`:
```
    -XX:FlightRecorderOptions:stackdepth=depth
```

Observe que valores maiores que 64 podem criar uma sobrecarga significativa e reduzir o desempenho.