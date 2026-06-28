# Criar Stream de Eventos a partir de Processo Externo

## 20 Criar Stream de Eventos a partir de Processo Externo

O exemplo `StreamExternalEventsWithAttachAPISample.java` cria um stream de eventos a partir de um processo Java separado, o exemplo `SleepOneSecondIntervals.java`.

`SleepOneSecondIntervals` dorme repetidamente em intervalos de 1 segundo; conforme demonstrado em [Criar Stream de Eventos em Processo, Ativo](<#/doc/guides/jrtflightrecorder/create-event-stream-process-active>), toda vez que `Thread.sleep()` é chamado, um evento `jdk.ThreadSleep` ocorre.
```java
    public class SleepOneSecondIntervals {
    
        public static void main(String... args) throws Exception {
            long pid = ProcessHandle.current().pid();
            System.out.println("Process ID: " + pid);
            while(true) {
                System.out.println("Sleeping for 1s...");
                Thread.sleep(1000);
            }
        }
    }
```

`StreamExternalEventsWithAttachAPISample` usa a Attach API para obter a máquina virtual na qual `SleepOneSecondIntervals` está sendo executado. A partir desta máquina virtual, `StreamExternalEventsWithAttachAPISample` obtém a localização do seu repositório Flight Recorder através da propriedade `jdk.jfr.repository`. Ele então cria um `EventStream` com este repositório através do método `EventStream::openRepository(Paths)`.
```java
    import java.nio.file.Paths;
    import java.util.Optional;
    import java.util.Properties;
    
    import com.sun.tools.attach.VirtualMachine;
    import com.sun.tools.attach.VirtualMachineDescriptor;
    
    import jdk.jfr.consumer.EventStream;
    
    public class StreamExternalEventsWithAttachAPISample {
        public static void main(String... args) throws Exception {
    
            Optional<VirtualMachineDescriptor> vmd =
                VirtualMachine.list().stream()
                .filter(v -> v.displayName()
                    .contains("SleepOneSecondIntervals"))
                .findFirst();
    
            if (vmd.isEmpty()) {
                throw new RuntimeException("Cannot find VM for SleepOneSecondIntervals");
            }
    
            VirtualMachine vm = VirtualMachine.attach(vmd.get());
    
            // Get system properties from attached VM
    
            Properties props = vm.getSystemProperties();
            String repository = props.getProperty("jdk.jfr.repository");
            System.out.println("jdk.jfr.repository: " + repository);
    
            try (EventStream es = EventStream
                .openRepository(Paths.get(repository))) {
                System.out.println("Found repository ...");
                es.onEvent("jdk.ThreadSleep", System.out::println);
                es.start();
            }
        }
    }
```

Compile `SleepOneSecondIntervals.java` e `StreamExternalEventsWithAttachAPISample.java`. Em seguida, execute `SleepOneSecondIntervals` com este comando:
```bash
    java -XX:StartFlightRecording SleepOneSecondIntervals
```

Em um novo shell de comando, execute `StreamExternalEventsWithAttachAPISample`:
```bash
    java StreamExternalEventsWithAttachAPISample
```

Ele imprime uma saída semelhante à seguinte:
```
    jdk.jfr.repository: C:\Users\<your user name>\AppData\Local\Temp\2019_12_08_23_32_47_5100
    Found repository ...
    jdk.ThreadSleep {
      startTime = 00:15:31.643
      duration = 1.04 s
      time = 1.00 s
      eventThread = "main" (javaThreadId = 1)
      stackTrace = [
        java.lang.Thread.sleep(long)
        SleepOneSecondIntervals.main(String[]) line: 8
      ]
    }
    
    jdk.ThreadSleep {
      startTime = 00:15:32.689
      duration = 1.05 s
      time = 1.00 s
      eventThread = "main" (javaThreadId = 1)
      stackTrace = [
        java.lang.Thread.sleep(long)
        SleepOneSecondIntervals.main(String[]) line: 8
      ]
    }
    ...
```

O exemplo `StreamExternalEventsWithJcmdSample.java` é semelhante a `StreamExternalEventsWithAttachAPISample`, exceto que ele inicia o Flight Recorder para `SleepOneSecondIntervals` com a Attach API. Com esta API, o exemplo executa o comando `jcmd <PID> JFR.start` com o PID de `SleepOneSecondIntervals`:
```java
    import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.nio.file.Paths;
    import java.util.Properties;
    
    import com.sun.tools.attach.VirtualMachine;
    
    import jdk.jfr.consumer.EventStream;
    
    public class StreamExternalEventsWithJcmdSample {
        public static void main(String... args) throws Exception {
            if (args[0] == null) {
                System.err.println("Requires PID of process as argument");
                System.exit(1);
            }
    
            String pid = args[0];
    
            Process p = Runtime.getRuntime().exec(
                "jcmd " + pid + " JFR.start");
    
            printOutput(p);
    
            // Wait for jcmd to start the recording
            Thread.sleep(1000);
    
            VirtualMachine vm = VirtualMachine.attach(pid);
            Properties props = vm.getSystemProperties();
            String repository = props.getProperty("jdk.jfr.repository");
            System.out.println("jdk.jfr.repository: " + repository);
    
            try (EventStream es = EventStream
                .openRepository(Paths.get(repository))) {
                System.out.println("Found repository ...");
                es.onEvent("jdk.ThreadSleep", System.out::println);
                es.start();
            }
        }
    
        private static void printOutput(Process proc) throws IOException {
            BufferedReader stdInput = new BufferedReader(
                new InputStreamReader(proc.getInputStream()));
    
            BufferedReader stdError = new BufferedReader(
                new InputStreamReader(proc.getErrorStream()));
    
            // Read the output from the command
            System.out.println(
                "Here is the standard output of the command:\n");
            String s = null;
            while ((s = stdInput.readLine()) != null) {
                System.out.println(s);
            }
    
            // Read any errors from the attempted command
            System.out.println(
                "Here is the standard error of the " + "command (if any):\n");
            while ((s = stdError.readLine()) != null) {
                System.out.println(s);
            }
        }
    }
```

Compile `SleepOneSecondIntervals.java` e `StreamExternalEventsWithJcmdSample.java`. Em seguida, execute `SleepOneSecondIntervals` com este comando:
```bash
    java -XX:StartFlightRecording SleepOneSecondIntervals
```

Ele imprime uma saída semelhante à seguinte:
```
    Started recording 1. No limit specified, using maxsize=250MB as default.
    
    Use jcmd 5100 JFR.dump name=1 filename=FILEPATH to copy recording data to file.
    Process ID: 5100
    Sleeping for 1s...
    Sleeping for 1s...
    Sleeping for 1s...
    ...
```

Observe o PID para `SleepOneSecondIntervals` (neste exemplo, é 5100). Enquanto este exemplo estiver em execução, em um novo shell de comando, execute `StreamExternalEventsWithJcmdSample` com este comando.
```bash
    java StreamExternalEventsWithJcmdSample <PID of SleepOneSecondIntervals>
```

Ele imprime uma saída semelhante a `StreamExternalEventsWithAttachAPISample`.