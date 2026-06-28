# Metadados de Evento

## 2 Metadados de Evento

O exemplo `SetMetadataSample.java` define um evento chamado `com.oracle.Hello` e define as anotações @Name, @Description, @Label e @Category. (Observe que este exemplo está no pacote `frexamples`.)
```java
    package frexamples;
    
    import jdk.jfr.Category;
    import jdk.jfr.Description;
    import jdk.jfr.Event;
    import jdk.jfr.Label;
    import jdk.jfr.Name;
    
    public class SetMetadataSample {
    
        @Name("com.oracle.Hello")
        @Label("Set Metadata Example")
        @Description("Demonstrates how to set the annotations "
            + "@Name, @Description, @Label, and @Category")
        @Category({ "Demonstration", "Tutorial" })
        static class Hello extends Event {
            @Label("Message")
            String message;
        }
    
        public static void main(String... args) {
            Hello event = new Hello();
            event.begin();
            event.message = "Hello Event!";
            event.commit();
        }
    }
```

Certifique-se de que o exemplo esteja em um diretório chamado `frexamples`, então execute `SetMetadataSample` a partir deste diretório com os seguintes comandos:
```bash
    java -XX:StartFlightRecording:filename=sm.jfr SetMetadataSample.java
    jfr print --events Hello sm.jfr
```

O último comando imprime uma saída semelhante à seguinte:
```
    com.oracle.Hello {
      startTime = 23:43:48.444
      duration = 0.0177 ms
      message = "Hello Event!"
      ...
    }
```

Você também pode usar o comando `jfr print` para filtrar eventos que pertencem a uma ou mais categorias:
```bash
    jfr print --categories Demonstration sm.jfr
```

A anotação @Name sobrescreve o nome padrão para um tipo de evento. Por exemplo, o nome padrão para o evento criado neste exemplo teria sido `frexamples.SetMetadataSample$Hello` se a anotação @Name não tivesse sido definida. Veja [Diretrizes para Nomear Eventos](<#/doc/guides/jrtflightrecorder/guidelines-naming-and-labeling-events>).

As anotações @Description e @Label permitem adicionar informações adicionais sobre um tipo de evento. Observe que você não deve usar @Label como um identificador; use a anotação @Name em vez disso. Veja [Diretrizes para Rotular Eventos](<#/doc/guides/jrtflightrecorder/guidelines-naming-and-labeling-events>)

A anotação @Category permite associar uma ou mais categorias a um tipo de evento. Para especificar uma categoria, use uma string. Para especificar mais de uma categoria, use uma lista de strings separadas por vírgulas e cercadas por chaves (`{}`). Veja [Categorias](<#/doc/guides/jrtflightrecorder/categories>).