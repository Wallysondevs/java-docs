# Registrar e Desregistrar um Evento Manualmente

## 16 Registrar e Desregistrar um Evento Manualmente

Por padrão, um evento é registrado automaticamente quando a classe do evento é inicializada. Alternativamente, você pode registrar um evento manualmente com a anotação @Registered. Uma razão para fazer isso é assumir o controle do contexto de segurança no qual o evento é inicializado.

A diferença entre a anotação @Enabled e a anotação @Registered é que, quando um evento é desregistrado, seus metadados, como o layout do campo, não estão disponíveis para inspeção. Uma chamada para FlightRecorder::register pode garantir que uma classe de evento seja visível para configuração, por exemplo, para um cliente Java Management Extensions (JMX).

O exemplo `RegistrationSample.java` demonstra isso:
```java
    import jdk.jfr.Event;
    import jdk.jfr.FlightRecorder;
    import jdk.jfr.Label;
    import jdk.jfr.Name;
    import jdk.jfr.Registered;
    
    public class RegistrationSample {
    
        @Name("com.oracle.Message")
        @Label("Message")
        @Registered(false)
        static class Message extends Event {
            String message;
        }
    
        public static void main(String... args) {
                
            Message event1 = new Message();
            event1.message = "Not registered, so you won't see this";
            event1.commit();
            
            FlightRecorder.register(Message.class);
            Message event2 = new Message();
            event2.message = "Now registered, so you will see this!";
            event2.commit();
            
            FlightRecorder.unregister(Message.class);
            
            Message event3 = new Message();
            event3.message = "Not registered again, so you won't see this";
            event3.commit();
        }
    }
```