# Categorias

## 4 Categorias

Com a anotação @Category, você pode atribuir qualquer número de categorias a um evento. As categorias permitem identificar eventos semelhantes que devem ser exibidos juntos, por exemplo, em um gráfico ou uma árvore. Embora você possa atribuir qualquer categoria a um evento (uma categoria é apenas uma string), é melhor primeiro determinar suas categorias.

Se houver a chance de dois ou mais eventos ocorrerem ao mesmo tempo e na mesma thread, mesmo que seus tempos de início e fim possam ser diferentes, então eles devem pertencer a categorias diferentes para evitar sobreposição quando representados em uma interface gráfica de usuário.

Por exemplo, suponha que você queira monitorar uploads de imagens para um servidor web. Você cria um evento chamado File Upload que começa quando um usuário faz upload de um arquivo e termina quando o upload é concluído. Para diagnósticos avançados sobre uploads de imagens, você cria eventos mais detalhados chamados Image Read, Image Resize e Image Write. Durante esses eventos detalhados, outros eventos de baixo nível ocorrem, por exemplo, Socket Read durante Image Read e File Write durante Image Write. Neste exemplo, o evento File Upload se sobreporia aos eventos Image Read, Image Resize e Image Write, o que significa que o evento File Upload pode ocultar os eventos detalhados em alguns visualizadores de eventos. O mesmo problema pode acontecer para Image Read e Socket Read, e Image Write e File Write.

Para evitar a sobreposição de eventos, certifique-se de que os eventos que podem se sobrepor pertençam a categorias diferentes. O diagrama a seguir ilustra um esquema de categorização que evita sobreposições de eventos e como um visualizador de eventos poderia exibi-los:

Figura 4-1 Categorizando Eventos Concorrentes para Prevenir Sobreposições

File Upload pertence à categoria Upload. Image Read, Image Resize e Image Write pertencem à categoria Image Upload. Socket Read e File Write pertencem à categoria Java Application.

O exemplo `CategoriesSample.java` implementa este esquema de categorização e simula a criação de eventos conforme ilustrado na figura:
```java
    import jdk.jfr.Category;
    import jdk.jfr.DataAmount;
    import jdk.jfr.Event;
    import jdk.jfr.Label;
    import jdk.jfr.Name;
    import jdk.jfr.Percentage;
    
    public class CategoriesSample {
    
        public static final String PROGRAMMERS_GUIDE_SAMPLES =
            "Programmer's Guide Samples";
        public static final String UPLOAD = "Upload";
        public static final String IMAGE_UPLOAD = "Image Upload";
        public static final String JAVA_APPLICATION = "Java Application";
    
        @Name("com.oracle.FileUpload")
        @Label("File Upload")
        @Category({PROGRAMMERS_GUIDE_SAMPLES, UPLOAD})
        private static class FileUpload extends Event { }
    
        @Name("com.oracle.ImageRead")
        @Label("Image Read")
        @Category({PROGRAMMERS_GUIDE_SAMPLES, IMAGE_UPLOAD})
        private static class ImageRead extends Event {
            @DataAmount(DataAmount.BYTES)
            long bytesUploaded;
        }
    
        @Name("com.oracle.ImageResize")
        @Label("Image Resize")
        @Category({PROGRAMMERS_GUIDE_SAMPLES, IMAGE_UPLOAD})
        private static class ImageResize extends Event {
            @Percentage
            double scale;
        }
    
        @Name("com.oracle.ImageWrite")
        @Label("Image Write")
        @Category({PROGRAMMERS_GUIDE_SAMPLES, IMAGE_UPLOAD})
        private static class ImageWrite extends Event {
            @DataAmount(DataAmount.BYTES)
            long bytesWritten;
        }
        
        @Name("com.oracle.SocketRead")
        @Label("Socket Read")
        @Category({PROGRAMMERS_GUIDE_SAMPLES, JAVA_APPLICATION})
        private static class SocketRead extends Event {
            @DataAmount(DataAmount.BYTES)
            long bytesRead;
        }  
        
        @Name("com.oracle.FileWrite")
        @Label("File Write")
        @Category({PROGRAMMERS_GUIDE_SAMPLES, JAVA_APPLICATION})
        private static class FileWrite extends Event {
            @DataAmount(DataAmount.BYTES)
            long bytesWritten;
        }        
    
        public static void main(String... args) {
            FileUpload fu = new FileUpload();
            fu.begin();
            
            ImageRead ir = new ImageRead();
            ir.begin();
            ir.bytesUploaded = 2048;
            
            SocketRead sr1 = new SocketRead();
            sr1.begin();
            sr1.bytesRead = 1024;
            sr1.commit();
            
            SocketRead sr2 = new SocketRead();
            sr2.begin();
            sr2.bytesRead = 1024;
            sr2.commit();
            
            ir.commit();
            
            ImageResize irs = new ImageResize();
            irs.begin();
            irs.scale = 0.5;
            irs.commit();
            
            ImageWrite iw = new ImageWrite();
            iw.begin();
            iw.bytesWritten = 1024;
            
            FileWrite fw = new FileWrite();
            fw.begin();
            fw.bytesWritten = 1024;
            fw.commit();
            
            iw.commit();
            fu.commit();
        }
    }
```

Execute `CategoriesSample` com o seguinte comando:
```
    java -XX:StartFlightRecording:filename=categoriessample.jfr CategoriesSample.java
```

Em seguida, abra `categoriessample.jfr` no JDK Mission Control. Na Event Types Tree no Event Browser, encontre os eventos criados por este exemplo na categoria Programmer's Guide Samples:

Figura 4-2 JDK Mission Control Browser Exibindo Eventos de CategoriesSample

O JDK Mission Control categoriza eventos com base em seu atributo `@Category` e os lista por seu atributo `@Label`.