# Habilitar e Desabilitar Eventos

## 10 Habilitar e Desabilitar Eventos

Você pode habilitar e desabilitar eventos com a anotação @Enabled. O exemplo `EnablementSample.java` demonstra isso.
```
    import jdk.jfr.Enabled;
    import jdk.jfr.Event;
    import jdk.jfr.Label;
    import jdk.jfr.Name;
    
    public class EnablementSample {
    
        @Name("com.oracle.WontSeeMe")
        @Label("Won't See Me")
        @Enabled(false)
        static class WontSeeMe extends Event {
        }
    
        @Name("com.oracle.WillSeeMe")
        @Label("Will See Me")
        @Enabled(true)
        static class WillSeeMe extends Event {
        }
    
        public static void main(String... args) throws Exception {
            WontSeeMe event1 = new WontSeeMe();
            event1.commit();
    
            WillSeeMe event2 = new WillSeeMe();
            event2.commit();
        }
    }
```