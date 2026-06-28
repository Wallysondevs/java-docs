# Threads Virtuais

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Threads Virtuais

# Threads Virtuais

Esta página foi contribuída por [Cay Horstmann](</author/CayHorstmann>) sob a [UPL](<https://oss.oracle.com/licenses/upl/>)

## Por que Threads Virtuais?

Quando o Java 1.0 foi lançado em 1995, sua API tinha cerca de cem classes, entre elas [`java.lang.Thread`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Thread.html>). Java foi a primeira linguagem de programação mainstream a suportar diretamente a programação concorrente.

Desde o Java 1.2, cada thread Java é executada em uma _platform thread_ fornecida pelo sistema operacional subjacente. (Até o Java 1.1, em algumas plataformas, todas as threads Java eram executadas por uma única platform thread.)

Platform threads têm custos não triviais. Elas exigem alguns milhares de instruções de CPU para iniciar e consomem alguns megabytes de memória. Aplicações de servidor podem atender a tantas requisições concorrentes que se torna inviável ter cada uma delas executando em uma platform thread separada. Em uma aplicação de servidor típica, essas requisições passam grande parte do tempo _bloqueando_, esperando por um resultado de um banco de dados ou outro serviço.

O remédio clássico para aumentar o throughput é uma API não bloqueante. Em vez de esperar por um resultado, o programador indica qual método deve ser chamado quando o resultado estiver disponível, e talvez outro método que é chamado em caso de falha. Isso se torna desagradável rapidamente, à medida que os callbacks se aninham cada vez mais profundamente.

A JEP 425 introduziu as _virtual threads_ no Java 19. Muitas virtual threads são executadas em uma platform thread. Sempre que uma virtual thread bloqueia, ela é _desmontada_, e a platform thread executa outra virtual thread. (O nome "virtual thread" é para ser uma reminiscência da memória virtual que é mapeada para a RAM real.) As virtual threads se tornaram um recurso de preview no Java 20 (JEP 436) e são finais no Java 21.

Com virtual threads, o bloqueio é barato. Quando um resultado não está imediatamente disponível, você simplesmente bloqueia em uma virtual thread. Você usa estruturas de programação familiares — ramificações, loops, blocos try — em vez de um pipeline de callbacks.

Virtual threads são úteis quando o número de tarefas concorrentes é grande, e as tarefas bloqueiam principalmente em I/O de rede. Elas não oferecem benefício para tarefas intensivas em CPU. Para tais tarefas, considere [parallel streams](<https://dev.java/learn/api/streams/parallel-streams/>) ou [recursive fork-join tasks](<https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/RecursiveTask.html>).

## Criando Threads Virtuais

O método de fábrica [`Executors.newVirtualThreadPerTaskExecutor()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/Executors.html#newVirtualThreadPerTaskExecutor\(\)>) retorna um [`ExecutorService`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ExecutorService.html>) que executa cada tarefa em uma virtual thread separada. Por exemplo:

```java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    Future<String> future = executor.submit(() -> {
        LockSupport.parkNanos(1_000_000_000); // Simulate work
        return "Hello";
    });
    System.out.println(future.get());
}
```

A propósito, o código usa [`LockSupport.parkNanos()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/locks/LockSupport.html#parkNanos\(long\)>) em vez de [`Thread.sleep()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Thread.html#sleep\(long\)>) para que não tenhamos que capturar a incômoda [`InterruptedException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/InterruptedException.html>).

Talvez você esteja usando uma API de nível inferior que pede uma fábrica de threads. Para obter uma fábrica para virtual threads, use a nova interface [`Thread.Builder`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Thread.Builder.html>):

```java
ThreadFactory factory = Thread.ofVirtual().name("request-", 0).factory();
```

Agora, chamar [`factory.newThread(myRunnable)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ThreadFactory.html#newThread\(java.lang.Runnable\)>) cria uma nova virtual thread (não iniciada). O método [`name()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Thread.Builder.html#name\(java.lang.String\)>) configura o builder para definir os nomes das threads `request-1`, `request-2`, e assim por diante.

Você também pode usar um builder para criar uma única virtual thread:

```java
Thread thread = Thread.ofVirtual().name("MyThread").unstarted(() -> {
    System.out.println("Hello from my virtual thread!");
});
thread.start();
```

Alternativamente, se você quiser iniciar a thread imediatamente:

```java
Thread.ofVirtual().name("MyThread").start(() -> {
    System.out.println("Hello from my virtual thread!");
});
```

Finalmente, para uma demonstração rápida, existe um método de conveniência:

```java
Thread.startVirtualThread(() -> {
    System.out.println("Hello from my virtual thread!");
});
```

Note que apenas a primeira abordagem, com um executor service, funciona com tarefas que retornam resultados (callables).

## Mudanças na API de Thread

Após uma série de experimentos com diferentes APIs, os designers das virtual threads do Java decidiram simplesmente reutilizar a familiar API [`Thread`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Thread.html>). Uma virtual thread é uma instância de [`Thread`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Thread.html>). O cancelamento funciona da mesma forma que para platform threads, chamando [`Thread.interrupt()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Thread.html#interrupt\(\)>). Como sempre, o código da thread deve verificar a flag `interrupted` ou chamar um método que o faça. (A maioria dos métodos de bloqueio o faz.)

Existem algumas diferenças. Em particular, todas as virtual threads:

*   Estão em um único grupo de threads
*   Têm prioridade `NORM_PRIORITY`
*   São threads daemon

Não há API para construir uma virtual thread com outro grupo de threads. Tentar chamar `setPriority` ou `setDaemon` em uma virtual thread não tem efeito.

O método estático [`Thread.getAllStackTraces()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Thread.html#getAllStackTraces\(\)>) retorna um mapa de stack traces de todas as _platform_ threads. Virtual threads não estão incluídas.

Um novo método de instância [`Thread.isVirtual()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Thread.html#isVirtual\(\)>) informa se uma thread é virtual.

Note que não há como encontrar a platform thread na qual uma virtual thread é executada.

O Java 19 possui algumas mudanças na API [`Thread`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Thread.html>) que não têm relação com virtual threads:

*   Foi adicionada uma sobrecarga do método [`Thread.join()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Thread.html#join\(\)>), que recebe um [`Duration`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/time/Duration.html>) como parâmetro: [`Thread.join(Duration)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Thread.html#join\(java.time.Duration\)>) .
*   O mesmo vale para o método [`Thread.sleep()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Thread.html#sleep\(long\)>). Um método [`Thread.sleep(Duration)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Thread.html#sleep\(java.time.Duration\)>) foi adicionado.
*   O método não-final [`Thread.getId()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Thread.html#getId\(\)>) está obsoleto, pois alguém poderia sobrescrevê-lo para retornar algo diferente do ID da thread. Chame o método final [`Thread.threadId()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Thread.html#threadId\(\)>) em vez disso.

Note que `Thread.suspend()` e `Thread.resume()` foram removidos do JDK 23, e `Thread.stop()` foi removido do JDK 26. Esses métodos foram descontinuados desde o Java 1.2 e descontinuados para remoção desde o Java 18.

## Capturando Resultados de Tarefas

Frequentemente, você deseja combinar os resultados de múltiplas tarefas concorrentes:

```java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    Future<String> future1 = executor.submit(() -> { . . . });
    Future<String> future2 = executor.submit(() -> { . . . });
    String result1 = future1.get();
    String result2 = future2.get();
    // Combine results
}
```

Antes das virtual threads, você poderia se sentir mal com as chamadas `get` bloqueantes. Mas agora o bloqueio é barato. Aqui está um programa de exemplo com um exemplo mais concreto:

```java
import java.time.Duration;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.locks.LockSupport;

public class FutureDemo {
    public static String getGreeting(String name) {
        LockSupport.parkNanos(Duration.ofSeconds(1).toNanos()); // Simulate work
        return "Hello, " + name + "!";
    }

    public static void main(String[] args) throws Exception {
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            Future<String> future1 = executor.submit(() -> getGreeting("Alice"));
            Future<String> future2 = executor.submit(() -> getGreeting("Bob"));
            String result1 = future1.get();
            String result2 = future2.get();
            System.out.println(result1);
            System.out.println(result2);
        }
    }
}
```

Se você tem uma lista de tarefas com o mesmo tipo de resultado, você pode usar o método [`ExecutorService.invokeAll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ExecutorService.html#invokeAll\(java.util.Collection\)>) e então chamar [`Future.get()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/Future.html#get\(\)>) em cada [`Future`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/Future.html>):

```java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    List<Callable<String>> tasks = List.of(
        () -> { . . . },
        () -> { . . . }
    );
    List<Future<String>> futures = executor.invokeAll(tasks);
    for (Future<String> future : futures) {
        String result = future.get();
        // Process result
    }
}
```

Novamente, um programa de exemplo mais concreto:

```java
import java.time.Duration;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.locks.LockSupport;

public class InvokeAllDemo {
    public static String getGreeting(String name) {
        LockSupport.parkNanos(Duration.ofSeconds(1).toNanos()); // Simulate work
        return "Hello, " + name + "!";
    }

    public static void main(String[] args) throws Exception {
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            List<Callable<String>> tasks = List.of(
                () -> getGreeting("Alice"),
                () -> getGreeting("Bob"),
                () -> getGreeting("Charlie")
            );
            List<Future<String>> futures = executor.invokeAll(tasks);
            for (Future<String> future : futures) {
                String result = future.get();
                System.out.println(result);
            }
        }
    }
}
```

## Limitação de Taxa

Virtual threads melhoram o throughput da aplicação, pois você pode ter muito mais tarefas concorrentes do que com platform threads. Isso pode colocar pressão sobre os serviços que as tarefas invocam. Por exemplo, um serviço web pode não tolerar um grande número de requisições concorrentes.

Com platform threads, um fator de ajuste fácil (ainda que rudimentar) é o tamanho do pool de threads para essas tarefas. Mas você não deve agrupar virtual threads. Agendar tarefas em virtual threads que são então agendadas em platform threads é claramente ineficiente. E qual é a vantagem? Limitar o número de virtual threads ao pequeno número de requisições concorrentes que seu serviço tolera? Então, por que você está usando virtual threads em primeiro lugar?

Com virtual threads, você deve usar mecanismos alternativos para controlar o acesso a recursos limitados. Em vez de um limite geral para tarefas concorrentes, proteja cada recurso de maneira apropriada. Para conexões de banco de dados, o pool de conexões já pode fazer o certo. Ao acessar um serviço web, você conhece seu serviço e pode fornecer uma limitação de taxa apropriada.

Como exemplo, no meu site pessoal, eu forneço serviços de demonstração para produzir itens aleatórios. Se um grande número de requisições chega instantaneamente do mesmo endereço IP, a empresa de hospedagem coloca o endereço IP na lista negra.

O programa de exemplo a seguir mostra a limitação de taxa com um semáforo simples que permite um pequeno número de requisições concorrentes. Quando o máximo é excedido, o método [`Semaphore.acquire()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/Semaphore.html#acquire\(\)>) bloqueia, mas isso está ok. Com virtual threads, o bloqueio é barato.

```java
import java.time.Duration;
import java.util.concurrent.Executors;
import java.util.concurrent.Semaphore;
import java.util.concurrent.locks.LockSupport;

public class RateLimitingDemo {
    private static final Semaphore SEMAPHORE = new Semaphore(2); // Allow 2 concurrent requests

    public static String getResource(String id) throws InterruptedException {
        SEMAPHORE.acquire(); // Acquire a permit, blocks if none available
        try {
            System.out.println(Thread.currentThread().getName() + " acquiring resource " + id);
            LockSupport.parkNanos(Duration.ofSeconds(2).toNanos()); // Simulate work
            return "Resource " + id + " processed by " + Thread.currentThread().getName();
        } finally {
            SEMAPHORE.release(); // Release the permit
            System.out.println(Thread.currentThread().getName() + " releasing resource " + id);
        }
    }

    public static void main(String[] args) {
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 5; i++) {
                final int taskId = i;
                executor.submit(() -> {
                    try {
                        System.out.println(getResource("Task-" + taskId));
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                });
            }
        }
    }
}
```

## Fixação (Pinning)

O agendador de virtual threads monta virtual threads em carrier threads. Por padrão, há tantas carrier threads quanto núcleos de CPU. Você pode ajustar essa contagem com a opção de VM `jdk.virtualThreadScheduler.parallelism`.

Quando uma virtual thread executa uma operação de bloqueio, ela deve ser desmontada de sua carrier thread, que pode então executar uma virtual thread diferente. No entanto, há situações em que essa desmontagem não é possível. Em algumas situações, o agendador de virtual threads compensará iniciando outra carrier thread. Por exemplo, no JDK 21, isso acontece para muitas operações de I/O de arquivo e ao chamar [`Object.wait()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html#wait\(\)>). Você pode controlar o número máximo de carrier threads com a opção de VM `jdk.virtualThreadScheduler.maxPoolSize`.

Uma thread é chamada de _fixada_ (pinned) em qualquer uma das duas situações a seguir:

1.  Ao executar um método ou bloco `synchronized` (isso é verdade no JDK 21, 22 e 23)
2.  Ao chamar um método nativo ou função estrangeira

Estar fixado (pinned) não é ruim em si. Mas quando uma thread fixada bloqueia, ela não pode ser desmontada. A carrier thread é bloqueada e, no Java 21, nenhuma carrier thread adicional é iniciada. Isso deixa menos carrier threads para executar virtual threads.

A fixação (pinning) é inofensiva se `synchronized` for usado para evitar uma condição de corrida em uma operação em memória. No entanto, se houver chamadas de bloqueio, seria melhor substituir `synchronized` por um [`ReentrantLock`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/locks/ReentrantLock.html>). Isso é, claro, apenas uma opção se você tiver controle sobre o código-fonte. Mais uma vez, este problema é corrigido no JDK 24 e posterior.

Para descobrir se as threads fixadas estão bloqueadas, inicie a JVM com uma das opções

```
-Djdk.tracePinnedThreads=full
-Djdk.tracePinnedThreads=short
```

Você obtém um stack trace que mostra quando uma thread fixada bloqueia:

```
"VirtualThread[#10]/run-on-carrier" os_thread_id=12345
    java.base/java.lang.Thread.sleep(Native Method)
    . . .
    - locked <0x0000000700000000> (a java.lang.Object)
    at PinningDemo.lambda$main$0(PinningDemo.java:15)
    at PinningDemo$$Lambda/0x0000000800000000.run(Unknown Source)
```

Note que você recebe apenas um aviso por local de fixação!

Alternativamente, grave com Java Flight Recorder, visualize com seu visualizador de mission control favorito e procure pelos eventos `VirtualThreadPinned` e `VirtualThreadSubmitFailed`.

O programa de exemplo a seguir mostra a fixação (pinning) em ação até o JDK 24. Lançamos várias virtual threads que dormem em um método sincronizado, bloqueando suas carrier threads. Várias virtual threads são adicionadas que não fazem trabalho algum. Mas elas não podem ser agendadas porque o pool de carrier threads foi completamente esgotado. Note que o problema desaparece quando você

*   usa um [`ReentrantLock`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/locks/ReentrantLock.html>)
*   não usa virtual threads
*   executa o código com JDK 24 e posterior

```java
import java.time.Duration;
import java.util.concurrent.Executors;
import java.util.concurrent.locks.LockSupport;

public class PinningDemo {
    public synchronized static void doWork() {
        LockSupport.parkNanos(Duration.ofSeconds(1).toNanos()); // Simulate work
    }

    public static void main(String[] args) {
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 100; i++) {
                executor.submit(PinningDemo::doWork);
            }
            // Add some more tasks that do no work
            for (int i = 0; i < 100; i++) {
                executor.submit(() -> System.out.println("Hello from " + Thread.currentThread().getName()));
            }
        }
    }
}
```

## Variáveis Locais de Thread (Thread Locals)

Uma _variável local de thread_ (thread-local variable) é uma instância da classe [`ThreadLocal`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ThreadLocal.html>) cujos métodos [`get()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ThreadLocal.html#get\(\)>) e [`set()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/ThreadLocal.html#set\(T\)>) acessam um valor que depende da thread atual. Por que você desejaria algo assim em vez de usar uma variável global ou local? A aplicação clássica é um serviço que não é thread-safe, como [`SimpleDateFormat`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/text/SimpleDateFormat.html>), ou que sofreria de contenção, como um gerador de números aleatórios. Instâncias por thread podem ter um desempenho melhor do que uma instância global protegida por um lock.

Outro uso comum para thread locals é fornecer um contexto "implícito", como uma conexão de banco de dados, que é configurado corretamente para cada tarefa. Em vez de passar o contexto de um método para outro, o código da tarefa simplesmente lê a variável local de thread sempre que precisa acessar o banco de dados.

Thread locals podem ser um problema ao migrar para virtual threads. Provavelmente haverá muito mais virtual threads do que threads em um pool de threads, e agora você terá muito mais instâncias de thread-local. Em tal situação, você deve repensar sua estratégia de compartilhamento.

Para localizar usos de thread locals em seu aplicativo, execute com a flag de VM `jdk.traceVirtualThreadLocals`. Você receberá um stack trace quando uma virtual thread modificar uma variável thread-local.

## Conclusão

*   Use virtual threads para aumentar o throughput quando você tem muitas tarefas que bloqueiam principalmente em I/O de rede
*   O principal benefício é o estilo de programação "síncrono" familiar, sem callbacks
*   Não agrupe virtual threads; use outros mecanismos para limitação de taxa
*   Verifique a fixação (pinning) e mitigue se necessário
*   Minimize as variáveis locais de thread em virtual threads

### Neste tutorial

Por que Threads Virtuais? Criando Threads Virtuais Mudanças na API de Thread Capturando Resultados de Tarefas Limitação de Taxa Fixação (Pinning) Variáveis Locais de Thread (Thread Locals) Conclusão

Última atualização: 10 de maio de 2026

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Threads Virtuais

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)