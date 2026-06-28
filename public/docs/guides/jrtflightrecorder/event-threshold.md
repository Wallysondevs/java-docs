# Limite de Eventos

## 11 Limite de Eventos

Definir um limite (threshold) em um evento significa que o Flight Recorder não o registrará se sua duração for menor que o limite. Isso permite limitar o número de eventos que o Flight Recorder registra. Por padrão, os eventos têm um limite de 0 ms. Recomenda-se definir um limite se uma operação ocorrer com frequência e os valores atípicos (outliers) forem a maior preocupação.

O exemplo `SetThresholdSample.java` cria dez eventos com uma duração aleatória. O Flight Recorder registra apenas os eventos cuja duração é maior que 50 ms.
```
    import java.util.Random;
    import jdk.jfr.Event;
    import jdk.jfr.Label;
    import jdk.jfr.Name;
    import jdk.jfr.Threshold;
    
    public class SetThresholdSample {
    
        @Name("com.oracle.RandomSleep")
        @Label("Random Sleep")
        @Threshold("50 ms")
        static class RandomSleep extends Event {
            @Label("Event number")
            int eventNumber;
            @Label("Random Value")
            int randomValue;
        }
    
        public static void main(String... args) throws Exception {
            Random randNum = new Random();
            for (int i = 0; i < 10; i++) {
                RandomSleep event = new RandomSleep();
                event.begin();
                event.eventNumber = i;
                event.randomValue = Math.abs(randNum.nextInt() % 100);
                System.out.println("Event #" + i + ": " + event.randomValue);
                Thread.sleep(event.randomValue);
                event.commit();
            }
        }
    }
```

Observe que o método `commit` encerra a cronometragem de um evento sem a necessidade de uma chamada explícita ao método `end`.

Execute `SetThresholdSample` com os seguintes comandos:
```
    java -XX:StartFlightRecording:filename=st.jfr SetThresholdSample.java
    jfr print --events RandomSleep st.jfr
```

O primeiro comando imprime uma saída semelhante à seguinte:
```
    Event #0: 97
    Event #1: 15
    Event #2: 25
    Event #3: 73
    Event #4: 38
    Event #5: 11
    Event #6: 5
    Event #7: 28
    Event #8: 42
    Event #9: 37
```

O último comando imprime uma saída semelhante à seguinte:
```
    com.oracle.RandomSleep {
      startTime = 23:17:42.050
      duration = 103.813 ms
      eventNumber = 0
      randomValue = 97
      ...
    }
    
    com.oracle.RandomSleep {
      startTime = 23:17:42.197
      duration = 77.726 ms
      eventNumber = 3
      randomValue = 73
      ...
    }
```

### O Método shouldCommit

Você pode reduzir a sobrecarga de operações custosas com o método `Event.shouldCommit`, que só faz o commit de um evento se sua duração estiver dentro de um limite especificado.

O exemplo `ShouldCommit.java` cria dez eventos com uma duração aleatória. O Flight Recorder faz o commit apenas dos eventos cuja duração é maior que 20 ms.
```
    import java.util.Random;
    
    import jdk.jfr.Event;
    import jdk.jfr.Label;
    import jdk.jfr.Name;
    import jdk.jfr.Threshold;
    
    public class ShouldCommitSample {
    
        @Name("com.oracle.RandomSleep")
        @Label("Random Sleep")
        @Threshold("20 ms")
        static class RandomSleep extends Event {
            @Label("ID")
            int id;
            @Label("Value Kind")
            String valueKind;
        }
    
        public static void main(String... args) throws Exception {
            Random randNum = new Random();
            for (int i = 0; i < 10; i++) {
                RandomSleep event = new RandomSleep();
                event.begin();
                event.id = i;
                int value = randNum.nextInt(40);
                System.out.println("ID " + i + ": " + value);
                Thread.sleep(value);
                event.end();
                if (event.shouldCommit()) {
                    // Format message outside timing of event
                    if (value < 10) {
                        event.valueKind = "It was a low value of " +
                            value + "!";
                    } else if (value < 20) {
                        event.valueKind = "It was a normal value of " +
                            value + "!";
                    } else {
                        event.valueKind = "It was a high value of " +
                            value + "!";
                    }
                    event.commit();
                }
            }
        }
    }
```

Execute este exemplo com os seguintes comandos:
```
    java -XX:StartFlightRecording:filename=shouldcommit.jfr ShouldCommit.java
    jfr print --events RandomSleep shouldcommit.jfr
```

O primeiro comando imprime uma saída semelhante à seguinte:
```
    ID 0: 8
    ID 1: 2
    ID 2: 34
    ID 3: 0
    ID 4: 11
    ID 5: 2
    ID 6: 14
    ID 7: 28
    ID 8: 27
    ID 9: 11
```

O último comando imprime uma saída semelhante à seguinte:
```
    com.oracle.RandomSleep {
      startTime = 23:27:10.642
      duration = 36.711 ms
      id = 2
      valueKind = "It was a high value of 34!"
      ...
    }
    
    com.oracle.RandomSleep {
      startTime = 23:27:10.711
      duration = 29.390 ms
      id = 7
      valueKind = "It was a high value of 28!"
      ...
    }
    
    com.oracle.RandomSleep {
      startTime = 23:27:10.741
      duration = 28.475 ms
      id = 8
      valueKind = "It was a high value of 27!" 
      ...
    }
```