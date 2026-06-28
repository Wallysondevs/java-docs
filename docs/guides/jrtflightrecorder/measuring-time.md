# Medindo o Tempo

## 5 Medindo o Tempo

O exemplo `MeasureTimeSample.java` mostra como medir o tempo de uma operação chamando os métodos Event.begin e Event.commit.
```java
    import jdk.jfr.Event;
    import jdk.jfr.Label;
    import jdk.jfr.Name;
    public class MeasureTimeSample {
    
        @Name("com.oracle.MeasureDuration")
        @Label("Measure Duration")
        static class MeasureMyDuration extends Event { }
    
        public static void main(String... args) throws Exception {
            MeasureMyDuration event = new MeasureMyDuration();
            event.begin();
            Thread.sleep(42);
            event.commit();
        }
    }
```

Note que o método commit encerra a medição de tempo de um evento sem a necessidade de uma chamada explícita ao método end.

Execute `MeasureTimeSample` com os seguintes comandos:
```bash
    java -XX:StartFlightRecording:filename=mt.jfr MeasureTimeSample.java
    jfr print --events MeasureDuration mt.jfr
```

O último comando imprime uma saída similar à seguinte:
```
    com.oracle.MeasureDuration {
      startTime = 12:26:43.169
      duration = 45.3 ms
      ...
    }
```