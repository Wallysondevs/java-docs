# Excluir Campos de Serem Persistidos com a Palavra-Chave transient

## 15 Excluir Campos de Serem Persistidos com a Palavra-Chave transient

Você pode excluir campos de serem persistidos com a palavra-chave transient. O exemplo `ExcludeFieldsSample.java` demonstra isso.
```java
    import jdk.jfr.Event;
    import jdk.jfr.Label;
    import jdk.jfr.Name;
    
    public class ExcludeFieldsSample {
    
        @Name("com.oracle.Message")
        @Label("Message")
        static class Message extends Event {
            String messageA;
            transient String messageB;
            String messageC;
        }
    
        public static void main(String... args) {
            Message event = new Message();
            event.messageA = "hello";
            event.messageB = "world"; // will not be persisted.
            event.messageC = "!";
            event.commit();
        }
    }
```

Execute `ExcludeFieldsSample` com os seguintes comandos:
```bash
    java -XX:StartFlightRecording:filename=excludefieldssample.jfr ExcludeFieldsSample.java
    jfr print --events Message excludefieldssample.jfr
```

O último comando imprime uma saída semelhante à seguinte:
```
    com.oracle.Message {
      startTime = 23:41:15.425
      messageA = "hello"
      messageC = "!"
      ...
    }
```