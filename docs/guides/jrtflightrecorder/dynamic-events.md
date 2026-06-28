# Eventos Dinâmicos

## 7 Eventos Dinâmicos

Eventos dinâmicos permitem que você defina eventos em tempo de execução, incluindo suas anotações e campos.

Nota:

Use eventos dinâmicos apenas se você não souber o layout de um evento até executar sua aplicação.

O exemplo `DynamicSample.java` cria um evento dinâmico chamado `com.oracle.RandomString`, que inclui um campo cujo nome é uma string aleatória:
```java
    import java.util.ArrayList;
    import java.util.Collections;
    import java.util.List;
    
    import jdk.jfr.AnnotationElement;
    import jdk.jfr.Category;
    import jdk.jfr.Description;
    import jdk.jfr.Event;
    import jdk.jfr.EventFactory;
    import jdk.jfr.Label;
    import jdk.jfr.Name;
    import jdk.jfr.ValueDescriptor;
    
    public class DynamicSample {
    
        private static String randomString(int n) {
    
            var ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var builder = new StringBuilder();
            while (n-- != 0) {
                int character = (int) (Math.random()
                    * ALPHA_NUMERIC_STRING.length());
                builder.append(ALPHA_NUMERIC_STRING.charAt(character));
            }
            return builder.toString();
        }
    
        public static void main(String[] args) {
    
            String[] category = { "Demonstration", "Tutorial" };
            var eventAnnotations = new ArrayList<AnnotationElement>();
            eventAnnotations
                .add(new AnnotationElement(
                    Name.class, "com.oracle.RandomString"));
            eventAnnotations.add(new AnnotationElement(Label.class,
                "Field Named with Random String"));
            eventAnnotations.add(new AnnotationElement(Description.class,
                "Demonstrates how to create a dynamic event"));
            eventAnnotations.add(new AnnotationElement(
                Category.class, category));
    
            var fields = new ArrayList<ValueDescriptor>();
            var messageAnnotations = Collections
                .singletonList(new AnnotationElement(Label.class, "Message"));
            var randomFieldName = DynamicSample.randomString(8);
            fields.add(new ValueDescriptor(String.class, randomFieldName,
                messageAnnotations));
            var numberAnnotations = Collections
                .singletonList(new AnnotationElement(Label.class, "Number"));
            fields.add(new ValueDescriptor(
                int.class, "number", numberAnnotations));
    
            var f = EventFactory.create(eventAnnotations, fields);
    
            Event event = f.newEvent();
            event.set(0, "hello, world!");
            event.set(1, 100);
            event.commit();
        }
    }
```

Execute `DynamicSample` com os seguintes comandos:
```
    java -XX:StartFlightRecording:filename=d.jfr DynamicSample.java
    jfr print --events RandomString d.jfr
```

O último comando imprime uma saída semelhante à seguinte:
```
    com.oracle.RandomString {
      startTime = 12:56:32.782
      ZZEIUMTG = "hello, world!"
      number = 100
      ...
    }
```

Para criar um evento dinâmico, chame o método estático EventFactory.create<List&lt;AnnotationElement&gt;, List&lt;ValueDescriptor&gt;):
```java
    var f = EventFactory.create(eventAnnotations, fields);
```

O primeiro argumento é uma lista das anotações do seu evento, que podem incluir anotações embutidas como @Name e @Description.

O segundo argumento é uma lista dos campos do seu evento. Defina-os com a classe ValueDescriptor.