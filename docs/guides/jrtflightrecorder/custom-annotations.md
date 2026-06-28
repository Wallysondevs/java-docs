# Anotações Personalizadas

## 8 Anotações Personalizadas

A criação de anotações personalizadas para eventos é a mesma que a criação de anotações Java. O exemplo `CustomAnnotationSample.java` demonstra isso.
```java
    import java.lang.annotation.ElementType;
    import java.lang.annotation.Retention;
    import java.lang.annotation.RetentionPolicy;
    import java.lang.annotation.Target;
    
    import jdk.jfr.Description;
    import jdk.jfr.Event;
    import jdk.jfr.Label;
    import jdk.jfr.MetadataDefinition;
    import jdk.jfr.Name;
    import jdk.jfr.Relational;
    
    public class CustomAnnotationSample {
        
        @MetadataDefinition
        @Name("com.oracle.Severity")
        @Label("Severity")
        @Description("Value between 0 and 100 that indicates " +
            "severity. 100 is most severe.")
        @Retention(RetentionPolicy.RUNTIME)
        @Target({ ElementType.TYPE })
        public @interface Severity {
           int value() default 50;
        }
    
        @MetadataDefinition
        @Name("com.oracle.TransactionId")
        @Label("Transaction ID")
        @Relational
        @Retention(RetentionPolicy.RUNTIME)
        @Target({ ElementType.FIELD })
        public @interface TransactionId { }
    
        @Name("com.oracle.TransactionBlocked")
        @Severity(80)
        @Label("Transaction Blocked")
        static class TransactionBlocked extends Event {
            @TransactionId
            @Label("Transaction")
            long transaction;
    
            @TransactionId
            @Label("Transaction Blocker")
            long transactionBlocker;
        }
    
        public static void main(String... args) {
            TransactionBlocked event = new TransactionBlocked();
            event.begin();
            event.transaction = 1;
            event.transactionBlocker = 2;
            event.commit();
        }
    }
```

Execute `CustomAnnotationSample` com o seguinte comando:
```bash
    java -XX:StartFlightRecording:filename=ca.jfr CustomAnnotationSample.java
```

Para visualizar anotações, categorias, layouts de campo e outras informações sobre todos os eventos em `customannotationsample.jfr`, execute o seguinte comando:
```bash
    jfr metadata ca.jfr
```

A saída do comando anterior inclui o seguinte:
```java
    @Name("com.oracle.Severity")
    @Label("Severity")
    @Description("Value between 0 and 100 that indicates severity. 100 is most severe.")
    class Severity extends java.lang.annotation.Annotation {
      int value;
    }
    
    @Name("com.oracle.TransactionId")
    @Label("Transaction ID")
    @Relational
    class TransactionId extends java.lang.annotation.Annotation {
    }
    ...
    @Name("com.oracle.TransactionBlocked")
    @Severity(80)
    @Label("Transaction Blocked")
    class TransactionBlocked extends jdk.jfr.Event {
      @Label("Start Time")
      @Timestamp("TICKS")
      long startTime;
    
      @Label("Duration")
      @Timespan("TICKS")
      long duration;
    
      @Label("Event Thread")
      @Description("Thread in which event was committed in")
      Thread eventThread;
    
      @Label("Stack Trace")
      @Description("Stack Trace starting from the method the event was committed in")
      StackTrace stackTrace;
    
      @TransactionId
      @Label("Transaction")
      long transaction;
    
      @TransactionId
      @Label("Transaction Blocker")
      long transactionBlocker;
    }
```

Para acessar valores de anotações personalizadas, use o método EventType.getAnnotation, que recebe um argumento, o objeto Class que corresponde ao tipo de anotação. Por exemplo, o código a seguir imprime os eventos cuja severidade é maior que 50:
```java
    for (var e : RecordingFile.readAllEvents(file)) { 
        EventType t = e.getEventType();
        Severity s = t.getAnnotation(Severity.class);
        if (s != null && s.getValue() > 50) {
            System.out.println(e); 
        }
    }
```

Consulte [Declaring an Annotation Type](<https://docs.oracle.com/javase/tutorial/java/annotations/declaring.html>) nos Tutoriais Java.