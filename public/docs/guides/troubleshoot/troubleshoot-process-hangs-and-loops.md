# Solucionar Problemas de Processos Travados e em Loop

## 7 Solucionar Problemas de Processos Travados e em Loop

Este capítulo fornece informações e orientações sobre alguns procedimentos específicos para solucionar problemas de processos travados ou em loop.

Podem ocorrer problemas que envolvem processos travados ou em loop. Um travamento pode ocorrer por muitas razões, mas frequentemente decorre de um deadlock em um código de aplicação, código de API ou código de biblioteca. Um travamento pode ser devido a um bug na Java HotSpot VM.

Às vezes, um travamento aparente acaba sendo, na verdade, um loop. Por exemplo, um bug em um processo da VM que faz com que uma ou mais threads entrem em um loop infinito pode consumir todos os CPU cycles disponíveis.

O passo inicial ao diagnosticar um travamento é descobrir se o processo da VM está ocioso ou consumindo todos os CPU cycles disponíveis. Você pode fazer isso usando um utilitário nativo do sistema operacional (OS). Se o processo parecer estar ocupado e estiver consumindo todos os CPU cycles disponíveis, então é provável que o problema seja uma thread em loop em vez de um deadlock.

Este capítulo contém as seguintes seções:

  * [Diagnosticar um Processo em Loop](<#/doc/guides/troubleshoot/troubleshoot-process-hangs-and-loops>)

  * [Diagnosticar um Processo Travado](<#/doc/guides/troubleshoot/troubleshoot-process-hangs-and-loops>)

### Diagnosticar um Processo em Loop

Se um processo da VM parecer estar em loop, tente obter um thread dump. Um thread dump frequentemente deixará claro qual thread está em loop, e o trace stack no thread dump pode fornecer a direção de onde (e talvez por que) a thread está em loop.

Se o console da aplicação (entrada/saída padrão) estiver disponível, pressione a combinação de teclas Control+\ (no Linux) ou Control+Break (no Windows) para fazer com que a HotSpot VM imprima um thread dump, incluindo o estado da thread. Em sistemas operacionais Linux, o thread dump também pode ser obtido enviando um `SIGQUIT` para o processo (comando `kill -QUIT pid`). Neste caso, o thread dump é impresso na saída padrão do processo alvo. A saída pode ser direcionada para um arquivo, dependendo de como o processo foi iniciado.

Se o processo Java for iniciado com a opção de linha de comando `-XX:+PrintClassHistogram`, então o manipulador Control+Break produzirá um heap histogram.

Se um thread dump puder ser obtido, um bom lugar para começar são os thread stacks das threads que estão no estado `RUNNABLE`. Consulte [Thread Dump](<#/doc/guides/troubleshoot/diagnostic-tools>) para mais informações sobre o formato do thread dump, bem como uma tabela dos possíveis estados de thread no thread dump. Em alguns casos, pode ser necessário obter uma sequência de thread dumps para determinar quais threads parecem estar continuamente ocupadas.

Se o console da aplicação não estiver disponível (por exemplo, o processo está sendo executado em segundo plano, ou a saída da VM é direcionada para um local desconhecido), então o utilitário `jstack` ou o utilitário `jhsdb jstack` pode ser usado para obter o stack thread. Consulte [O Utilitário jstack](<#/doc/guides/troubleshoot/diagnostic-tools>) ou o modo `jstack` de [jhsdb](<#/>) para mais informações sobre a saída desses utilitários. O utilitário `jstack` ou o utilitário `jhsdb jstack` também deve ser usado se o thread dump não fornecer nenhuma evidência de que uma thread Java está em loop.

Ao revisar a saída do utilitário `jstack`, concentre-se inicialmente nas threads que estão no estado `RUNNABLE`. Este é o estado mais provável para threads que estão ocupadas e possivelmente em loop. Pode ser necessário executar `jstack` várias vezes para ter uma ideia melhor de quais threads estão em loop. Se uma thread parecer estar sempre no estado `RUNNABLE`, use `jhsdb jstack` com a opção `--mixed` para imprimir os native frames e fornecer uma dica adicional sobre o que a thread está fazendo. Se uma thread parecer estar em loop continuamente enquanto no estado `RUNNABLE`, então esta situação pode indicar um potencial bug da HotSpot VM que precisa de investigação adicional.

Se a VM não responder a Control+\, isso pode indicar um bug da VM em vez de um problema com a aplicação ou código de biblioteca. Neste caso, use `jhsdb jstack` com a opção `--mixed` para obter um thread stack para todas as threads. A saída incluirá os thread stacks para threads internas da VM. Neste stack trace, identifique as threads que não parecem estar esperando. Se parecer que o loop é causado por um bug da VM, colete o máximo de dados possível e envie um relatório de bug. Consulte [Enviar um Relatório de Bug](<#/doc/guides/troubleshoot/submit-bug-report>) para mais informações sobre coleta de dados.

### Diagnosticar um Processo Travado

Use o thread dump para diagnosticar um processo travado.

Se a aplicação parecer travada e o processo parecer ocioso, o primeiro passo é tentar obter um thread dump. Se o console da aplicação estiver disponível, pressione Control+\ (no Linux) ou Control+Break (no Windows) para fazer com que a HotSpot VM imprima um thread dump. No sistema operacional Linux, o thread dump também pode ser obtido enviando um `SIGQUIT` para o processo (comando `kill -QUIT pid`). Se o processo travado puder gerar um thread dump, a saída será impressa na saída padrão do processo alvo.

Após imprimir o thread dump, a HotSpot VM executa um algoritmo de detecção de deadlock.

As seções a seguir descrevem várias situações para um processo travado.

  * [Deadlock Detectado](<#/doc/guides/troubleshoot/troubleshoot-process-hangs-and-loops>)

  * [Deadlock Não Detectado](<#/doc/guides/troubleshoot/troubleshoot-process-hangs-and-loops>)

  * [Sem Thread Dump](<#/doc/guides/troubleshoot/troubleshoot-process-hangs-and-loops>)

#### Deadlock Detectado

Se um deadlock for detectado, ele será impresso junto com o stack trace das threads envolvidas no deadlock.

O exemplo a seguir mostra o stack trace para esta situação.
```
    Found one Java-level deadlock:
    =============================
    "AWT-EventQueue-0":
      waiting to lock monitor 0x000ffbf8 (object 0xf0c30560, a java.awt.Component$AWTTreeLock),
      which is held by "main"
    "main":
      waiting to lock monitor 0x000ffe38 (object 0xf0c41ec8, a java.util.Vector),
      which is held by "AWT-EventQueue-0"
    
    Java stack information for the threads listed above:
    ===================================================
    "AWT-EventQueue-0":
            at java.awt.Container.removeNotify(Container.java:2503)
            - waiting to lock <0xf0c30560> (a java.awt.Component$AWTTreeLock)
            at java.awt.Window$1DisposeAction.run(Window.java:604)
            at java.awt.Window.doDispose(Window.java:617)
            at java.awt.Dialog.doDispose(Dialog.java:625)
            at java.awt.Window.dispose(Window.java:574)
            at java.awt.Window.disposeImpl(Window.java:584)
            at java.awt.Window$1DisposeAction.run(Window.java:598)
            - locked <0xf0c41ec8> (a java.util.Vector)
            at java.awt.Window.doDispose(Window.java:617)
            at java.awt.Window.dispose(Window.java:574)
            at javax.swing.SwingUtilities$SharedOwnerFrame.dispose(SwingUtilities.java:1743)
            at javax.swing.SwingUtilities$SharedOwnerFrame.windowClosed(SwingUtilities.java:1722)
            at java.awt.Window.processWindowEvent(Window.java:1173)
            at javax.swing.JDialog.processWindowEvent(JDialog.java:407)
            at java.awt.Window.processEvent(Window.java:1128)
            at java.awt.Component.dispatchEventImpl(Component.java:3922)
            at java.awt.Container.dispatchEventImpl(Container.java:2009)
            at java.awt.Window.dispatchEventImpl(Window.java:1746)
            at java.awt.Component.dispatchEvent(Component.java:3770)
            at java.awt.EventQueue.dispatchEvent(EventQueue.java:463)
            at java.awt.EventDispatchThread.pumpOneEventForHierarchy(EventDispatchThread.java:214)
            at java.awt.EventDispatchThread.pumpEventsForHierarchy(EventDispatchThread.java:163)
            at java.awt.EventDispatchThread.pumpEvents(EventDispatchThread.java:157)
            at java.awt.EventDispatchThread.pumpEvents(EventDispatchThread.java:149)
            at java.awt.EventDispatchThread.run(EventDispatchThread.java:110)
    "main":
            at java.awt.Window.getOwnedWindows(Window.java:844)
            - waiting to lock <0xf0c41ec8> (a java.util.Vector)
            at javax.swing.SwingUtilities$SharedOwnerFrame.installListeners(SwingUtilities.java:1697)
            at javax.swing.SwingUtilities$SharedOwnerFrame.addNotify(SwingUtilities.java:1690)
            at java.awt.Dialog.addNotify(Dialog.java:370)
            - locked <0xf0c30560> (a java.awt.Component$AWTTreeLock)
            at java.awt.Dialog.conditionalShow(Dialog.java:441)
            - locked <0xf0c30560> (a java.awt.Component$AWTTreeLock)
            at java.awt.Dialog.show(Dialog.java:499)
            at java.awt.Component.show(Component.java:1287)
            at java.awt.Component.setVisible(Component.java:1242)
            at test01.main(test01.java:10)
    
    Found 1 deadlock.
    
```

A detecção de deadlock padrão funciona com locks que são obtidos usando a palavra-chave `synchronized`, bem como com locks que são obtidos usando o pacote `java.util.concurrent`. Se a flag da Java VM `-XX:+PrintConcurrentLocks` estiver definida, então o stack trace também mostra uma lista de proprietários de lock.

Se um deadlock for detectado, você deve examinar a saída em mais detalhes para entender o deadlock. No exemplo anterior, a thread `main` está bloqueando o objeto `0xf0c30560` e está esperando para entrar em `0xf0c41ec8`, que está bloqueado pela thread `AWT-EventQueue-0`. No entanto, a thread `AWT-EventQueue-0` está esperando para entrar em `0xf0c30560`, que está bloqueado por `main`.

Os detalhes nos stack traces fornecem informações para ajudá-lo a encontrar o deadlock.

#### Deadlock Não Detectado

Se o thread dump for impresso e nenhum deadlock for encontrado, então o problema pode ser um bug no qual uma thread está esperando por um monitor que nunca é notificado. Isso pode ser um problema de timing ou um bug de lógica geral.

Para saber mais sobre o problema, examine cada uma das threads no thread dump e cada thread que está bloqueada em `Object.wait()`. O caller frame no stack trace indica a classe e o método que está invocando o método `wait()`. Se o código foi compilado com informações de número de linha (o padrão), então isso fornece uma direção sobre o código a ser examinado. Na maioria dos casos, você deve ter algum conhecimento da lógica da aplicação ou da biblioteca para diagnosticar este problema mais a fundo. Em geral, você deve entender como a sincronização funciona na aplicação e os detalhes e condições de quando e onde os monitors são notificados.

#### Sem Thread Dump

Se a VM estiver em deadlock ou travada, use o comando `jstack` ou `jhsdb jstack`.

Se a VM não responder a Control+\ ou Control+Break, é possível que a VM esteja em deadlock ou travada por alguma outra razão. Nesse caso, use [O Utilitário jstack](<#/doc/guides/troubleshoot/diagnostic-tools>) ou o modo `jstack` de [jhsdb](<#/>) para obter um thread dump. Isso também se aplica no caso em que a aplicação não está acessível, ou a saída é direcionada para um local desconhecido.

No thread dump, examine cada uma das threads no estado `BLOCKED`. O top frame pode, às vezes, indicar por que a thread está bloqueada (por exemplo, `Object.wait` ou `Thread.sleep`). O restante do stack dará uma indicação do que a thread está fazendo. Isso é particularmente verdadeiro quando o código-fonte é compilado com informações de número de linha (o padrão), e você pode fazer referência cruzada ao código-fonte.

Se uma thread estiver no estado `BLOCKED` e a razão não for clara, use `jhsdb jstack --mixed` para obter um mixed stack. Com a saída do mixed stack, deve ser possível identificar por que a thread está bloqueada. Se uma thread estiver bloqueada tentando entrar em um método ou bloco `synchronized`, você verá frames como `ObjectMonitor::enter` perto do topo do stack. O exemplo a seguir mostra uma saída de mixed stack de exemplo.
```
    ----------------- t@13 -----------------
    0xff31e8b8      ___lwp_cond_wait + 0x4
    0xfea8c810      void ObjectMonitor::EnterI(Thread*) + 0x2b8
    0xfeac86b8      void ObjectMonitor::enter2(Thread*) + 0x250
    :
    
```

Threads no estado `RUNNABLE` também podem estar bloqueadas. Os top frames no mixed stack devem indicar o que a thread está fazendo.

Uma thread específica a ser verificada é a `VMThread`. Esta é a thread especial usada para executar operações como garbage collection (GC). Ela pode ser identificada como a thread que está executando `VMThread::run()` em seus frames iniciais. No Linux, ela deve ser identificável usando o nome C++ mangled `_ZN8VMThread4loopEv`.

Em geral, a thread da VM está em um de três estados: esperando para executar uma operação da VM, sincronizando todas as threads em preparação para uma operação da VM, ou executando uma operação da VM. Se você suspeitar que um travamento é um bug da HotSpot VM em vez de um deadlock da aplicação ou da biblioteca de classes, então preste atenção especial à thread da VM.

Se a thread da VM parecer estar presa em `SafepointSynchronize::begin`, isso pode indicar um problema ao levar a VM a um safepoint. Um safepoint indica que todas as threads em execução na VM estão bloqueadas e esperando que uma operação especial, como GC, seja concluída.

Se a thread da VM parecer estar presa em `function`, onde `function` termina em `doit`, isso também pode indicar um problema da VM.

Em geral, se você puder executar a aplicação a partir da linha de comando e chegar a um estado em que a VM não responde a Control+\ ou Control+Break, é mais provável que você tenha descoberto um bug da VM, um problema da biblioteca de threads ou um bug em outra biblioteca. Quando isso ocorrer, obtenha um crash dump. Consulte [Coletar Core Dumps](<#/doc/guides/troubleshoot/submit-bug-report>) para obter instruções sobre como coletar o máximo de informações possível e enviar um relatório de bug ou ligar para o suporte.

Outra ferramenta a ser mencionada no contexto de processos travados no Linux é `lsstack`. Este utilitário está incluído em algumas distribuições e, caso contrário, pode ser obtido em [sourceforge](<http://sourceforge.net>). No momento desta redação, `lsstack` reportava apenas native frames.