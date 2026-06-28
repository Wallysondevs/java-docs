# Herança de Anotações, Configurações e Campos

## 9 Herança de Anotações, Configurações e Campos

Quando uma classe estende um event, ela herda as annotations, settings e fields do event. No entanto, uma classe não herda private fields ou annotations que não possuem a meta-annotation @java.lang.Inherited.

O exemplo `InheritanceSample.java` demonstra isso. Ele define três events: `FileAction`, `FileUpload` e `ImageUpload`.
```java
    import jdk.jfr.Category;
    import jdk.jfr.Description;
    import jdk.jfr.Event;
    import jdk.jfr.Label;
    import jdk.jfr.Name;
    import jdk.jfr.StackTrace;
     
    public class InheritanceSample {
    
        @Category("Files")
        @StackTrace(false)
        abstract static class FileAction extends Event {
            @Label("In Progress")
            boolean inProgress;
        }
    
        @Name("com.oracle.FileUpload")
        @Description("Uploaded file that might be a text file")
        @Label("File Upload")
        static class FileUpload extends FileAction {
            @Label("Text file")
            private boolean isText;
        }
    
        @Name("com.oracle.ImageUpload")
        @Label("Image Upload")
        static class ImageUpload extends FileUpload {
        }
    
        public static void main(String... args) {
            FileUpload fu = new FileUpload();
            fu.inProgress = true;
            fu.isText = false;
            fu.commit();
    
            ImageUpload iu = new ImageUpload();
            iu.inProgress = false;
            iu.commit();
        }
    }
```

Execute `InheritanceSample` com os seguintes comandos:
```
    java -XX:StartFlightRecording:filename=i.jfr InheritanceSample.java
    jfr print --events FileUpload,ImageUpload i.jfr
```

O último comando imprime uma saída semelhante à seguinte:
```
    com.oracle.FileUpload {
      startTime = 15:22:28.794
      isText = false
      inProgress = true
      ...
    }
    
    com.oracle.ImageUpload {
      startTime = 15:22:28.822
      inProgress = false
      ...
    }
```

Classes de event abstratas, como `FileAction`, não são registradas, então seus metadata nunca estão disponíveis para inspeção.

Classes não herdam annotations que não possuem a annotation `@java.lang.Inherited`, como `@Name` e `@Description`.

Como o field `isText` é private, `ImageUpload` não o herda.