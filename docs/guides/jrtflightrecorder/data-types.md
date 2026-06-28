# Tipos de Dados

## 6 Tipos de Dados

O exemplo `PersistFieldTypesSample.java` mostra quais tipos de campo você pode persistir em um evento, que são os seguintes:

  * java.lang.String, que pode ser null
  * java.lang.Thread, que pode ser null
  * java.lang.Class, que pode ser null
  * byte
  * short
  * int
  * long
  * float
  * double
  * char
  * boolean

Nota:

Eventos não suportam arrays.

A seguir está o exemplo `PersistFieldTypesSample.java`:
```java
    import jdk.jfr.Event;
    import jdk.jfr.Label;
    import jdk.jfr.Name;
    
    public class PersistFieldTypesSample {
    
        @Name("com.oracle.FieldTypes")
        @Label("Allowed Field Types")
        static class FieldTypes extends Event {
            @Label("Class Value")
            Class<?> classValue;
    
            @Label("Thread Value")
            Thread threadValue; // thread must be started
    
            @Label("String Value")
            String stringValue;
    
            @Label("Byte Value")
            byte byteValue;
    
            @Label("Short Value")
            short shortValue;
    
            @Label("Int Value")
            int intValue;
    
            @Label("Long Value")
            long longValue;
    
            @Label("Float Value")
            float floatValue;
    
            @Label("Double Value")
            double doubleValue;
    
            @Label("Character Value")
            char characterValue;
    
            @Label("Boolean Value")
            boolean booleanValue;
        }
    
        public static void main(String... args) {
            FieldTypes event = new FieldTypes();
            event.classValue = Math.class;
            event.threadValue = Thread.currentThread();
            event.stringValue = "Hello";
            event.byteValue = 42;
            event.shortValue = 4711;
            event.intValue = Integer.MAX_VALUE;
            event.longValue = Long.MAX_VALUE;
            event.doubleValue = Math.PI;
            event.floatValue = Float.NaN;
            event.characterValue = '!';
            event.booleanValue = true;
            event.commit();
        }
    }
```

Execute `PersistFieldTypesSample` com os seguintes comandos:
```bash
    java -XX:StartFlightRecording:filename=pft.jfr PersistFieldTypesSample.java
    jfr print --events FieldTypes pft.jfr
```

O último comando imprime uma saída semelhante à seguinte:
```
    com.oracle.FieldTypes {
      startTime = 12:33:12.434
      classValue = java.lang.Math (classLoader = bootstrap)
      threadValue = "main" (javaThreadId = 1)
      stringValue = "Hello"
      byteValue = 42
      shortValue = 4711
      intValue = 2147483647
      longValue = 9223372036854775807
      floatValue = N/A
      doubleValue = 3.141592653589793
      characterValue = !
      booleanValue = true
      ...
    }
```