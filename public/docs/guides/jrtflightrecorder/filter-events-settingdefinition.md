# Filtrar Eventos com SettingDefinition

## 14 Filtrar Eventos com SettingDefinition

O exemplo `FilteringSample.java` (juntamente com `RegExpControl.java`) usa uma SettingDefinition para filtrar quais eventos o Flight Recorder registra. Neste exemplo, ele registra eventos `Hello` que possuem um valor que começa com `g` em seu campo `message`.
```java
    import java.io.IOException;
    
    import jdk.jfr.Description;
    import jdk.jfr.Event;
    import jdk.jfr.Label;
    import jdk.jfr.Name;
    import jdk.jfr.Recording;
    import jdk.jfr.SettingDefinition;
    
    public class FilteringSample {
    
        @Name("com.oracle.FilteredHello")
        @Label("Hello With Message Filter")
        static class FilteredHello extends Event {
            @Label("Message")
            String message;
    
            @Label("Message Filter")
            @Description("Filters messages with regular expressions")
            @SettingDefinition
            protected boolean messageFilter(RegExpControl control) {
                return control.matches(message);
            }
        }
    
        public static void main(String[] args) throws IOException {
    
            try (Recording r = new Recording()) {
                r.enable(FilteredHello.class).with("messageFilter", "g.*");
                r.start();
                FilteredHello greenEvent = new FilteredHello();
                FilteredHello yellowEvent = new FilteredHello();
                FilteredHello redEvent = new FilteredHello();
                greenEvent.message = "green";
                yellowEvent.message = "yellow";
                redEvent.message = "red";
                greenEvent.commit();
                yellowEvent.commit();
                redEvent.commit();
            }
        }
    }
```

O exemplo `FilteringSample` requer `RegExpControl.java`:
```java
    import java.util.Set;
    import java.util.regex.Pattern;
    
    import jdk.jfr.SettingControl;
    
    public class RegExpControl extends SettingControl {
    
        private Pattern pattern = Pattern.compile(".*");
    
        @Override
        public void setValue(String value) {
            this.pattern = Pattern.compile(value);
        }
    
        @Override
        public String combine(Set<String> values) {
            return String.join("|", values);
        }
    
        @Override
        public String getValue() {
            return pattern.toString();
        }
    
        public boolean matches(String s) {
            return pattern.matcher(s).find();
        }
    }
```

Compile `FilteringSample.java` e `RegExpControl.java`, então execute `FilteringSample` com os seguintes comandos:
```
    java -XX:StartFlightRecording:filename=filteringsample.jfr FilteringSample
    jfr print --events FilteredHello filteringsample.jfr
```

O último comando imprime uma saída semelhante à seguinte:
```
    com.oracle.FilteredHello {
      startTime = 23:38:28.364
      message = "green"
      ...
    }
```

A anotação `@SettingDefinition` especifica qual método o Flight Recorder chama para determinar se ele registra um evento específico. Neste exemplo, ele chama `messageFilter(RegExpControl)`:
```java
    @SettingDefinition
    protected boolean messageFilter(RegExpControl control) {
        return control.matches(message);
    } 
```

O parâmetro deste método, `RegExpControl`, estende a classe SettingControl. Neste exemplo, `RegExpControl.java` implementa um controle de configuração de expressão regular; o método `matches(String)` retorna `true` quando sua string corresponde ao campo `pattern` (que uma aplicação pode alterar com o método `setValue(String)`).

Os métodos `setValue()`, `getValue()` e `combine(Set<String>)` são invocados quando um valor de configuração muda, o que geralmente acontece quando uma gravação é iniciada ou parada. O método `combine(Set<String>)` é invocado para resolver qual valor usar quando múltiplas gravações estão sendo executadas simultaneamente.