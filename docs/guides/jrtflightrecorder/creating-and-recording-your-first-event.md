# Criando e Registrando Seu Primeiro Evento

## 1 Criando e Registrando Seu Primeiro Evento

O exemplo `HelloWorldSample.java` cria um evento chamado `com.oracle.Hello`.
```java
    import jdk.jfr.Event;
    import jdk.jfr.Label;
    import jdk.jfr.Name;
    
    public class HelloWorldSample {
    
        @Name("com.oracle.Hello")
        @Label("Hello World!")
        static class Hello extends Event {
            @Label("Message")
            String message;
        }
    
        public static void main(String... args) {
            Hello event = new Hello();
            event.begin();
            event.message = "Hello world!";
            event.commit();
        }
    }
```

Execute `HelloWorldSample` com o seguinte comando:
```bash
    java -XX:StartFlightRecording:filename=hw.jfr HelloWorldSample.java
```

Ele executa `HelloWorldSample` e cria um arquivo de gravação chamado `hw.jfr`.

Para visualizar o conteúdo do arquivo de gravação, execute este comando:
```bash
    jfr print hw.jfr
```

Ele imprime todos os eventos registrados pelo Flight Recorder.

Se você quiser visualizar apenas o evento `Hello` que você criou, então execute este comando:
```bash
    jfr print --events Hello hw.jfr
```

Ele imprime uma saída similar à seguinte:
```
    com.oracle.Hello {
      startTime = 16:44:14.841
      duration = 0.0170 ms
      message = "Hello world!"
      eventThread = "main" (javaThreadId = 1)
      stackTrace = [
        HelloWorldSample.main(String[]) line: 18
        jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Method, Object, Object[])
        jdk.internal.reflect.NativeMethodAccessorImpl.invoke(Object, Object[]) line: 64
        jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(Object, Object[]) line: 43
        java.lang.reflect.Method.invoke(Object, Object[]) line: 564
        ...
      ]
    }
```