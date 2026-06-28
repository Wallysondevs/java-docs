# AWT

## 11 AWT

Este capítulo fornece informações e orientações sobre alguns procedimentos específicos para solucionar problemas comuns que podem ocorrer no Java SE Abstract Window Toolkit (AWT).

Este capítulo contém as seguintes seções:

  * [Dicas de Depuração para AWT](<#/doc/guides/troubleshoot/awt>)

  * [Problemas com Gerenciadores de Layout](<#/doc/guides/troubleshoot/awt>)

  * [Eventos de Teclado](<#/doc/guides/troubleshoot/awt>)

  * [Problemas de Modalidade](<#/doc/guides/troubleshoot/awt>)

  * [Falhas do AWT](<#/doc/guides/troubleshoot/awt>)

  * [Eventos de Foco](<#/doc/guides/troubleshoot/awt>)

  * [Transferência de Dados](<#/doc/guides/troubleshoot/awt>)

  * [Outros Problemas](<#/doc/guides/troubleshoot/awt>)

  * [Mistura de Componentes Heavyweight e Lightweight](<#/doc/guides/troubleshoot/awt>)

### Dicas de Depuração para AWT

Esta seção descreve dicas úteis para depurar problemas relacionados ao AWT.

Para despejar a hierarquia de componentes AWT, pressione Control+Shift+F1.

Se o aplicativo travar, obtenha um stack trace pressionando Control+Break no Windows (que envia o sinal SIGBREAK) ou Control+\ no sistema operacional Linux (que envia o sinal SIGQUIT).

Para rastrear erros X11 no sistema operacional Linux, defina a propriedade de sistema `sun.awt.noisyerrorhandler` como `true`.

Loggers podem produzir uma saída útil ao depurar problemas do AWT. Consulte a descrição do pacote [`java.util.logging`](<https://docs.oracle.com/en/java/javase/24/docs/api/java.logging/java/util/logging/package-summary.html>).

Os seguintes loggers estão disponíveis:

  * `java.awt`
  * `java.awt.focus`
  * `java.awt.event`
  * `java.awt.mixing`
  * `sun.awt`
  * `sun.awt.windows`
  * `sun.awt.X11`

### Problemas com Gerenciadores de Layout

Esta seção descreve possíveis problemas com gerenciadores de layout e fornece soluções alternativas quando disponíveis.

Os seguintes problemas ocorrem com gerenciadores de layout e soluções alternativas:

  1. Chamada a invalidate() e validate() aumenta o tamanho do componente

Causa: Devido a algumas especificidades do gerenciador de layout `GridBagLayout`, se `ipadx` ou `ipady` for definido, e invalidate() e validate() forem chamados, então o tamanho do componente aumenta para o valor de `ipadx` ou `ipady`. Isso acontece porque o gerenciador de layout `GridBagLayout` calcula iterativamente a quantidade de espaço necessária para armazenar o componente dentro do contêiner.

Solução alternativa: O JDK não fornece uma maneira confiável e simples de detectar se o gerenciador de layout deve reorganizar os componentes ou não em tal caso, mas há uma solução alternativa simples. Use componentes com o método getPreferredSize() sobrescrito, que retorna o tamanho atual necessário, conforme mostrado no exemplo a seguir.
```java
public Dimension getPreferredSize(){
            return new Dimension(size+xpad*2+1, size+ypad*2+1);
         }

```

  2. Recursão infinita com validate() a partir de qualquer método Container.doLayout()

Causa: Invocar validate() a partir de qualquer método Container.doLayout() pode levar a uma recursão infinita porque o próprio AWT invoca doLayout() a partir de validate().

### Eventos de Teclado

Alguns problemas relacionados ao tratamento de eventos de teclado não possuem uma solução na versão atual.

Os seguintes problemas de teclado estão atualmente sem solução:

  * Em alguns teclados não-ingleses, certas teclas acentuadas são gravadas na tecla e, portanto, são caracteres da camada primária. No entanto, elas não podem ser usadas para mnemônicos porque não há um keycode Java correspondente.

  * Alterar o locale padrão em tempo de execução não altera o texto exibido para as teclas aceleradoras de menu.

  * Em um teclado japonês padrão de 109 teclas, a tecla do iene e a tecla da barra invertida geram uma barra invertida, porque elas têm o mesmo código de caractere para a mensagem `WM_CHAR`. O AWT deveria distingui-las.

### Problemas de Modalidade

Esta seção fornece informações sobre problemas relacionados ao uso de modalidade.

A seção aborda os seguintes problemas.

  * Gerenciadores de janela UNIX:

Muitas das melhorias de modalidade não estão disponíveis em alguns ambientes Linux, por exemplo, ao usar gerenciadores de janela Common Desktop Environment (CDE). Para verificar se um tipo de modalidade ou tipo de exclusão modal é suportado em uma configuração específica, use os seguintes métodos:

    * `Toolkit.isModalityTypeSupported()`

    * `Toolkit.isModalExclusionTypeSupported()`

Quando uma caixa de diálogo modal aparece na tela, o gerenciador de janelas pode ocultar algumas das janelas de nível superior Java na mesma aplicação da barra de tarefas. Isso pode confundir os usuários finais, mas não afeta muito o seu trabalho, porque todas as janelas ocultas estão bloqueadas modalmente e não podem ser operadas.

  * Outros problemas de modalidade:

Para mais informações sobre recursos relacionados à modalidade e como usá-los, consulte a [especificação de Modalidade AWT](<https://docs.oracle.com/en/java/javase/24/docs/api/java.desktop/java/awt/doc-files/Modality.html>).

Uma das seções dessa especificação descreve alguns recursos AWT que podem estar relacionados ou ser afetados por caixas de diálogo modais: propriedade "sempre no topo", tratamento de foco, estados de janela e assim por diante. O comportamento do aplicativo em tais casos geralmente não é especificado ou depende da plataforma; portanto, não dependa de nenhum comportamento específico.

### Falhas do AWT

Esta seção mostra como identificar e solucionar falhas relacionadas ao AWT.

  * Distinguir uma falha do AWT:

Quando ocorre uma falha, um log de erro é criado com informações e o estado obtido no momento da falha. Consulte [Log de Erro Fatal](<#/doc/guides/troubleshoot/location-fatal-error-log>).

Uma linha próxima ao topo do arquivo indica a biblioteca onde o erro ocorreu. O exemplo a seguir mostra parte do arquivo de log de erro no caso em que a falha estava relacionada à biblioteca AWT.
```
...
        # Java VM: Java HotSpot(TM) Client VM (1.6.0-beta2-b76 mixed mode, sharing)
        # Problematic frame:
        # C  [awt.dll+0x123456]
        ...

```

No entanto, a falha pode ocorrer em algum lugar profundo nas bibliotecas do sistema, embora ainda causada pelo AWT. Nesses casos, a indicação `awt.dll` não aparece como um frame problemático, e você precisa procurar mais adiante no arquivo, na seção `Stack: Native frames: Java frames`, conforme mostrado no exemplo a seguir.
```
Stack: [0x0aeb0000,0x0aef0000),  sp=0x0aeefa44,  free space=254k
        Native frames: (J=compiled Java code, j=interpreted, Vv=VM code, C=native code)
        C  0x00abc751
        C  [USER32.dll+0x3a5f]
        C  [USER32.dll+0x3b2e]
        C  [USER32.dll+0x5874]
        C  [USER32.dll+0x58a4]
        C  [ntdll.dll+0x108f]
        C  [USER32.dll+0x5e7e]
        C  [awt.dll+0xec889]
        C  [awt.dll+0xf877d]
        j  sun.awt.windows.WToolkit.eventLoop()V+0
        j  sun.awt.windows.WToolkit.run()V+69
        j  java.lang.Thread.run()V+11
        v  ~StubRoutines::call_stub
        V  [jvm.dll+0x83c86]
        V  [jvm.dll+0xd870f]
        V  [jvm.dll+0x83b48]
        V  [jvm.dll+0x838a5]
        V  [jvm.dll+0x9ebc8]
        V  [jvm.dll+0x108ba1]
        V  [jvm.dll+0x108b6f]
        C  [MSVCRT.dll+0x27fb8]
        C  [kernel32.dll+0x202ed]

        Java frames: (J=compiled Java code, j=interpreted, Vv=VM code)
        j  sun.awt.windows.WToolkit.eventLoop()V+0
        j  sun.awt.windows.WToolkit.run()V+69
        j  java.lang.Thread.run()V+11
        v  ~StubRoutines::call_stub

```

Se o texto `awt.dll` aparecer em algum lugar nos frames nativos, então a falha pode estar relacionada ao AWT.

  * Solucionar uma falha do AWT:

Uma das possíveis causas de falhas é que muitas operações AWT são assíncronas. Por exemplo, se você mostra um frame com uma chamada para frame.setVisible(true), então você não pode ter certeza de que será a janela ativa após o retorno desta chamada.

Outro exemplo diz respeito a diálogos de arquivo nativos. Leva algum tempo para o sistema operacional inicializar e mostrar esses diálogos, e se você os descartar imediatamente após a chamada para setVisible(true), então uma falha pode ocorrer. Portanto, se seu aplicativo contém algumas chamadas AWT sendo executadas simultaneamente ou imediatamente uma após a outra, é uma boa ideia inserir alguns atrasos entre elas ou adicionar alguma sincronização.

### Eventos de Foco

As seções a seguir discutem os problemas de solução de problemas relacionados a eventos de foco:

  * [Como Rastrear Eventos de Foco](<#/doc/guides/troubleshoot/awt>)

  * [Sistema de Foco Nativo](<#/doc/guides/troubleshoot/awt>)

  * [Modelos de Foco Suportados por Gerenciadores de Janela X](<#/doc/guides/troubleshoot/awt>)

  * [Problemas Diversos com Foco](<#/doc/guides/troubleshoot/awt>)

#### Como Rastrear Eventos de Foco

Você pode rastrear eventos de foco adicionando um focus listener ao toolkit, conforme mostrado no exemplo a seguir.
```java

    Toolkit.getDefaultToolkit().addAWTEventListener(new AWTEventListener(
       public void eventDispatched(AWTEvent e) {
          System.err.println(e);
       }
    ), FocusEvent.FOCUS_EVENT_MASK | WindowEvent.WINDOW_FOCUS_EVENT_MASK |
       WindowEvent.WINDOW_EVENT_MASK);

```

O stream `System.err` é usado aqui porque não armazena a saída em buffer.

Lembre-se:

A ordem correta dos eventos de foco é a seguinte:

  * `FOCUS_LOST` no componente perdendo o foco

  * `WINDOW_LOST_FOCUS` no top-level perdendo o foco

  * `WINDOW_DEACTIVATED` no top-level perdendo a ativação

  * `WINDOW_ACTIVATED` no top-level tornando-se janela ativa

  * `WINDOW_GAINED_FOCUS` no top-level tornando-se janela focada

  * `FOCUS_GAINED` no componente ganhando o foco

Quando o foco é transferido entre componentes dentro da janela focada, apenas os eventos `FOCUS_LOST` e `FOCUS_GAINED` devem ser gerados. Quando o foco é transferido entre janelas pertencentes ao mesmo proprietário ou entre uma janela pertencente e seu proprietário, então os seguintes eventos devem ser gerados:

  * `FOCUS_LOST`

  * `WINDOW_LOST_FOCUS`

  * `WINDOW_GAINED_FOCUS`

  * `FOCUS_GAINED`

Nota:

Os eventos de perda de foco ou ativação devem vir primeiro.

#### Sistema de Foco Nativo

Às vezes, um problema pode ser causado pela plataforma nativa. Para verificar isso, investigue os eventos nativos relacionados ao foco.

Certifique-se de que a janela que você deseja focar seja ativada e que o componente que você deseja focar receba o evento de foco nativo.

Na plataforma Windows, os eventos de foco nativos são os seguintes:

  * `WM_ACTIVATE` para um top-level. `WPARAM` é `WA_ACTIVE` ao ativar e `WA_INACTIVE` ao desativar.

  * `WM_SETFOCUS` e `WM_KILLFOCUS` para um componente.

Na plataforma Windows, um conceito de foco sintético foi implementado. Isso significa que um componente proprietário de foco apenas emula seu estado focável, enquanto o foco nativo real é definido para um componente proxy de foco. Este componente recebe mensagens nativas de teclado e método de entrada e as despacha para um proprietário de foco. Nas últimas versões do JDK, um frame ou caixa de diálogo serve como um proxy de foco. Agora, ele faz proxy de foco não apenas para componentes em uma janela pertencente, mas também para todos os componentes filhos. Uma janela simples nunca recebe foco nativo e depende do proxy de foco de seu proprietário. Este mecanismo é transparente para o usuário, mas deve ser levado em consideração durante a depuração.

No sistema operacional Linux, o XToolkit usa um modelo de foco que permite ao AWT gerenciar o foco por si mesmo. Com este modelo, o gerenciador de janelas não define diretamente o foco de entrada em uma janela de nível superior, mas em vez disso, envia apenas a mensagem de cliente `WM_TAKE_FOCUS` para indicar que o foco deve ser definido. O AWT então define explicitamente o foco na janela de nível superior, se permitido.

Nota:

O servidor X e alguns gerenciadores de janela podem enviar eventos de foco para uma janela. No entanto, esses eventos são descartados pelo AWT.

O AWT não gera as cadeias hierárquicas de eventos de foco quando um componente dentro de um top-level ganha foco. Além disso, a janela nativa mapeada para o componente não recebe um evento de foco nativo. Na plataforma Linux, assim como na plataforma Windows, o AWT usa o mecanismo de proxy de foco. Portanto, o foco no componente é definido pela síntese de um evento de foco, enquanto o proxy de foco invisível tem foco nativo.

Uma janela nativa que é mapeada para um objeto `Window` (não um objeto `Frame` ou `Dialog`) tem a flag `override-redirect` definida. Assim, o gerenciador de janelas não notifica a janela sobre a mudança de foco. O foco é solicitado na janela apenas em resposta a um clique do mouse. Esta janela não receberá eventos de foco nativos de forma alguma. Portanto, você pode rastrear apenas eventos `FocusIn` ou `FocusOut` em um frame ou caixa de diálogo. Como o processamento principal do foco ocorre no nível Java, depurar o foco com o XToolkit é mais simples do que com o WToolkit.

#### Modelos de Foco Suportados por Gerenciadores de Janela X

Os seguintes modelos de foco são suportados por gerenciadores de janela X:

  * **Click-to-focus** é um modelo de foco comumente usado. (Por exemplo, o Microsoft Windows usa este modelo.)

  * **Focus-follows-mouse** é um modelo de foco no qual o foco vai para a janela sobre a qual o mouse passa.

#### Problemas Diversos com Foco

Esta seção discute problemas relacionados ao foco no AWT que podem ocorrer e soluções sugeridas.

  1. Linux + KDE, o XToolkit não pode ser alternado entre dois frames quando o título de um frame é clicado.

Clicar em um componente dentro de um frame faz com que o foco mude.

Solução: Verifique a versão do seu gerenciador de janelas e atualize-o para 3.0 ou superior.

  2. Você deseja gerenciar o foco usando `KeyListener` para transferir o foco em resposta a Tab/Shift+Tab, mas o evento de teclado não aparece.

Solução: Para capturar eventos de tecla de travessia, você deve habilitá-los chamando Component.setFocusTraversalKeysEnabled(true).

  3. Uma janela é definida como modal excluída com Window.setModalExclusionType(ModalExclusionType).

O frame, seu proprietário, está bloqueado modalmente. Neste caso, a janela também permanecerá bloqueada modalmente.

Solução: Uma janela não pode se tornar a janela focada quando seu proprietário não tem permissão para obter o foco. A solução é excluir o proprietário da modalidade.

  4. No Windows, um componente solicita foco e é removido simultaneamente de seu contêiner.

Às vezes, `java.lang.NullPointerException: null pData` é lançada.

Solução: A maneira mais fácil de evitar lançar a exceção é fazer a remoção junto com a solicitação de foco na EDT. Outra abordagem, mais complicada, é sincronizar a solicitação de foco e a remoção se você precisar realizar essas ações em threads diferentes.

  5. Quando o foco é solicitado em um componente e o proprietário do foco é imediatamente removido, o foco vai para o componente após o componente removido.

Por exemplo, o Componente A é o proprietário do foco. O foco é solicitado no Componente B, e imediatamente após isso o Componente A é removido de seu contêiner. Eventualmente, o foco vai para o Componente C, que está localizado após o Componente A no contêiner, mas não para o Componente B.

Solução: Neste caso, certifique-se de que a solicitação de foco seja executada após a remoção do Componente A, e não antes.

  6. No Windows, quando uma janela é definida como `alwaysOnTop` em um frame inativo, a janela não pode receber eventos de teclado.

Por exemplo, um frame é exibido com uma janela que ele possui. O frame está inativo, então a janela não está focada. Então, a janela é definida como `alwaysOnTop`. A janela ganha foco, mas seu proprietário permanece inativo. Portanto, a janela não pode receber eventos de teclado.

Solução: Traga o frame para a frente (o método Frame.toFront()) antes de definir a janela como `alwaysOnTop`.

  7. Quando uma tela de splash é exibida e um frame é exibido após o fechamento da janela da tela de splash, o frame não é ativado.

Solução: Traga o frame para a frente (o método Frame.toFront()) após exibi-lo (o método Frame.setVisible(true)).

  8. O método WindowFocusListener.windowGainedFocus(WindowEvent) não retorna o proprietário de foco mais recente do frame.

Por exemplo, um frame é a janela focada, e um de seus componentes é o proprietário do foco. Outra janela é clicada, e então o frame é clicado novamente. `WINDOW_GAINED_FOCUS` chega ao frame e o método WindowFocusListener.windowGainedFocus(WindowEvent) é chamado. No entanto, dentro deste callback, você não pode determinar o proprietário de foco mais recente do frame, porque Frame.getMostRecentFocusOwner() retorna `null`.

Solução: Você pode obter o proprietário de foco mais recente do frame dentro do callback WindowListener.windowActivated(WindowEvent). No entanto, a esta altura, o frame terá se tornado a janela focada apenas se não tiver janelas pertencentes.

Nota:

Esta abordagem não funciona para a janela, apenas para o frame ou caixa de diálogo.

  9. Uma janela é desabilitada com Component.setEnabled(false), mas não se torna completamente infocável.

Solução: Não presuma que a condição definida ao chamar Component.setEnabled(false) ou Component.setFocusable(false) será mantida infocável junto com todo o seu conteúdo. Em vez disso, use o método Window.setFocusableWindowState(boolean).

### Transferência de Dados

As seções a seguir discutem possíveis problemas com recursos de transferência de dados, que permitem adicionar operações de arrastar e soltar (DnD) e recortar, copiar e colar (CCP) ao aplicativo.

  * [Depurar Aplicativos Drag-and-Drop](<#/doc/guides/troubleshoot/awt>)

  * [Problemas Frequentes com Transferência de Dados](<#/doc/guides/troubleshoot/awt>)

#### Depurar Aplicativos Drag-and-Drop

É difícil usar um depurador para solucionar problemas de recursos de DnD, porque durante a operação de arrastar e soltar, toda a entrada é capturada. Portanto, se você colocar um breakpoint durante o DnD, pode ser necessário reiniciar seu servidor X. Tente usar a depuração remota em vez disso.

Dois métodos simples podem ser usados para solucionar a maioria dos problemas com DnD:

  * Imprimir todas as instâncias de `DataFlavor`
  * Imprimir dados recebidos

Uma alternativa à depuração remota é a função System.err.println(), que imprime a saída sem atraso.

#### Problemas Frequentes com Transferência de Dados

Esta seção descreve problemas que ocorrem frequentemente com operações de transferência de dados no AWT e sugere soluções de problemas.

  1. Colar uma grande quantidade de dados da área de transferência leva muito tempo.

Usar a função Clipboard.getContents() para uma operação de colar às vezes faz com que o aplicativo trave por um tempo, especialmente se um aplicativo rico fornece os dados para colar.

A função Clipboard.getContents() busca dados da área de transferência em todos os tipos disponíveis (por exemplo, alguns tipos de texto e imagem), e isso pode ser caro e desnecessário.

Solução: Use o método Clipboard.getData() para obter apenas dados específicos da área de transferência. Se dados em apenas um ou poucos tipos forem necessários, então use um dos seguintes métodos `Clipboard` em vez de getContents():

     * DataFlavor[] getAvailableDataFlavors()

     * boolean isDataFlavorAvailable(DataFlavor flavor)

     * Object getData(DataFlavor flavor)

  2. Quando um aplicativo Java usa Transferable.getTransferData() para operações de DnD, o arrasto parece levar muito tempo.

Para inicializar os dados transferidos apenas se forem necessários, o código de inicialização foi colocado em Transferable.getTransferData().

Os dados `Transferable` são caros para gerar, e durante uma operação de DnD, Transferable.getTransferData() é invocado mais de uma vez, causando uma lentidão.

Solução: Armazene em cache os dados `Transferable` para que sejam gerados apenas uma vez.

  3. Arquivos não podem ser transferidos entre um aplicativo Java e o desktop e navegador de arquivos GNOME/KDE.

No Windows e em alguns gerenciadores de janela, listas de arquivos transferidos podem ser representadas como o tipo de dados `DataFlavor.javaFileListFlavor`. Mas nem todos os gerenciadores de janela representam listas de arquivos neste formato. Por exemplo, o gerenciador de janela GNOME representa uma lista de arquivos como uma lista de URIs.

Solução alternativa: Para obter arquivos, solicite dados do tipo `String` e, em seguida, traduza a string para uma lista de arquivos de acordo com o formato text/uri-list descrito na RFC 2483. Para permitir o arrasto de arquivos de um aplicativo Java para o desktop e navegador de arquivos GNOME/KDE, exporte os dados no formato text/uri-list. Para um exemplo, consulte a seção [Work Around do RFE](<http://bugs.java.com/bugdatabase/view_bug.do?bug_id=4899516>).

  4. Uma imagem é passada para um dos métodos startDrag() de `DragGestureEvent` ou `DragSource`, mas a imagem não é exibida durante a operação de DnD subsequente.

Solução: Mova uma janela com uma imagem renderizada nela conforme o cursor do mouse se move durante uma operação de DnD. Consulte o exemplo de código na seção [Work Around do RFE](<http://bugs.java.com/bugdatabase/view_bug.do?bug_id=4899516>).

  5. Não há como transferir um array usando DnD.

A classe `DataFlavor` não possui um construtor que lide com arrays. O tipo MIME para um array contém caracteres que escapam. O código no exemplo a seguir lança uma `IllegalArgumentException`.
```java
new DataFlavor(DataFlavor.javaJVMLocalObjectMimeType +
         "; class=" +
         (new String[0]).getClass().getName())

```

Solução: "Cite" o valor do parâmetro da classe de representação, conforme mostrado no exemplo a seguir, onde as aspas escapam:
```java
new DataFlavor(DataFlavor.javaJVMLocalObjectMimeType +
         "; class=" +
         "\"" +
         (new String[0]).getClass().getName() +
         "\"")

```

Consulte o [relatório de bug](<http://bugs.java.com/bugdatabase/view_bug.do?bug_id=4276926>).

  6. Existem problemas ao usar o suporte AWT DnD com componentes Swing.

Vários problemas podem acontecer, por exemplo, eventos estranhos são disparados durante uma operação de DnD, múltiplos itens não podem ser arrastados e soltos, uma `InvalidDnDOperationException` é lançada.

Solução: Use o suporte DnD do Swing com componentes Swing. Embora a implementação do DnD do Swing seja baseada na implementação do DnD do AWT, você não pode misturar Swing e AWT DnD. Consulte a Lição: [Arrastar e Soltar e Transferência de Dados](<https://docs.oracle.com/javase/tutorial/uiswing/dnd/>) nos Tutoriais Java.

  7. Não há como alterar o estado da origem para depender do destino.

Para alterar o estado da origem para depender do destino, você deve ter referências aos componentes de origem e destino na mesma área de código, mas isso não está atualmente implementado na API de DnD.

Solução alternativa: Uma solução alternativa é adicionar flags ao objeto transferível que permitem determinar o contexto do evento.

Para a transferência de dados dentro de uma única Java VM, a seguinte solução alternativa é proposta:

     * Implemente seu componente de destino como `DragSourceListener`.

     * Em DragGestureRecognizer.dragGestureRecognized(), adicione o destino ao listener da fonte de arrasto, conforme mostrado no exemplo a seguir.
```java
public void dragGestureRecognized(DragGestureEvent dge) {
                        dge.startDrag(null, new StringSelection("SomeTransferedText"));
                        dge.getDragSource().addDragSourceListener(target);
                   }

```

     * Agora você pode obter o destino e a origem nos métodos dragEnter(), dragOver(), dropActionChanged() e dragDropEnd() de DragSourceListener().

  8. A transferência de objetos em um aplicativo leva muito tempo.

A transferência de um grande pacote de dados ou a criação de objetos transferidos leva muito tempo. O usuário deve esperar muito tempo para que a transferência de dados seja concluída.

Esta operação cara torna a transferência muito longa porque você deve esperar até que Transferable.getTransferData() termine.

Solução: Esta solução é válida apenas para a transferência de dados dentro de uma única Java VM. Crie ou obtenha recursos caros antes da operação de arrasto. Por exemplo, obtenha o conteúdo do arquivo ao criar dados transferíveis, para que Transferable.getTransferData() não seja muito demorado.

### Outros Problemas

As subseções a seguir discutem dicas de solução de problemas para outras questões:

  * [Problemas com a Tela de Splash](<#/doc/guides/troubleshoot/awt>)

  * [Problemas com o Ícone da Bandeja](<#/doc/guides/troubleshoot/awt>)

  * [Problemas com Menus Pop-up](<#/doc/guides/troubleshoot/awt>)

  * [Herança de Cor de Fundo ou Primeiro Plano](<#/doc/guides/troubleshoot/awt>)

  * [Restrição de Tamanho do Painel AWT](<#/doc/guides/troubleshoot/awt>)

  * [Travamentos Durante a Depuração de Menus Pop-up e Componentes Semelhantes no X11](<#/doc/guides/troubleshoot/awt>)

  * [Comportamento de Window.toFront()/toBack() no X11](<#/doc/guides/troubleshoot/awt>)

#### Problemas com a Tela de Splash

Problemas que podem ocorrer com a tela de splash do AWT e soluções.

Esta seção descreve alguns problemas que podem ocorrer com a tela de splash no AWT:

  1. O usuário especificou um arquivo JAR com um `MANIFEST.MF` apropriado no `-classpath`, mas a tela de splash não funciona.

Solução: Consulte a solução para o próximo problema.

  2. Não está claro qual dos vários arquivos JAR em um aplicativo deve conter a imagem da tela de splash.

Solução: A imagem da tela de splash será selecionada de um arquivo JAR somente se o arquivo for usado com a opção de linha de comando `-jar`. Este arquivo JAR deve conter tanto a opção de manifesto `SplashScreen-Image` quanto o arquivo de imagem. Arquivos JAR no `-classpath` nunca serão verificados quanto a telas de splash no `MANIFEST.MF`. Se você não usar `-jar`, ainda poderá usar `-splash` para especificar a imagem da tela de splash na linha de comando.

  3. Telas de splash PNG translúcidas não funcionam no sistema operacional Linux.

Solução: Esta é uma limitação nativa do X11. No sistema operacional Linux, o canal alfa de uma imagem translúcida será comparado com o limiar de 50%. Valores alfa acima de 0.5 tornarão os pixels opacos, e pixels com valores alfa abaixo de 0.5 serão completamente transparentes.

#### Problemas com o Ícone da Bandeja

Se um `SecurityManager` estiver instalado, então o valor de `AWTPermission` deve ser definido como `accessSystemTray` para criar um objeto `TrayIcon`.

#### Problemas com Menus Pop-up

No método JPopupMenu.setInvoker(), o invoker é o componente no qual o menu pop-up deve ser exibido. Se esta propriedade for definida como `null`, então o menu pop-up não funcionará corretamente.

A solução é definir o invoker do menu pop-up para ele mesmo.

#### Herança de Cor de Fundo ou Primeiro Plano

Para garantir a consistência do seu aplicativo em todas as plataformas, use atribuição explícita de cores (tanto de primeiro plano quanto de fundo) para cada componente ou contêiner.

Muitos componentes AWT usam seus próprios padrões para cores de fundo e primeiro plano em vez de usar as cores dos pais.

Este comportamento é dependente da plataforma; o mesmo componente pode se comportar de forma diferente em plataformas distintas. Além disso, alguns componentes usam o valor padrão para uma das cores de fundo ou primeiro plano, mas pegam o valor do pai para outra cor.

#### Restrição de Tamanho do Painel AWT

O contêiner AWT tem uma limitação de tamanho. Na maioria das plataformas, este limite é de 32.767 pixels.

Isso significa que, por exemplo, se os objetos da tela tiverem 25 pixels de altura, então um painel Java AWT não pode exibir mais de 1310 objetos.

Infelizmente, não há como alterar este limite, nem com código Java nem com código nativo. O limite depende do tipo de dado que o sistema operacional usa para armazenar o tamanho do widget. Por exemplo, o sistema de janelas X do Linux usa o tipo `integer`, e, portanto, é limitado ao tamanho máximo de um inteiro. Outros sistemas operacionais podem usar tipos diferentes, como `long`, e neste caso, o limite poderia ser maior.

Consulte a documentação da sua plataforma.

A seguir estão exemplos de soluções alternativas para este limite que podem ser úteis:

  * Exibir componentes, página por página.
  * Usar abas para exibir alguns componentes por vez.

#### Travamentos Durante a Depuração de Menus Pop-up e Componentes Semelhantes no X11

Defina a propriedade de sistema `-Dsun.awt.disablegrab=true` durante a depuração de certos componentes de interface gráfica de usuário (GUI).

Certas ações de interface gráfica de usuário (GUI) exigem a captura de todos os eventos de entrada para determinar quando a ação deve terminar (por exemplo, navegar em menus pop-up). Enquanto a captura está ativa, nenhuma outra aplicação recebe eventos de entrada. Se um aplicativo Java estiver sendo depurado, e um breakpoint for atingido enquanto a captura está ativa, então o sistema operacional parece travar. Isso acontece porque o aplicativo Java que mantém a captura é parado pelo depurador e não pode processar nenhum evento de entrada, e outros aplicativos não recebem os eventos devido à captura instalada. Para permitir a depuração de tais aplicativos, a seguinte propriedade de sistema deve ser definida ao executar o aplicativo a partir do depurador:
```
    -Dsun.awt.disablegrab=true

```

Esta propriedade desativa efetivamente a configuração da captura e não trava o sistema. No entanto, com esta opção definida, em alguns casos, isso pode levar à incapacidade de encerrar ações da GUI que normalmente seriam encerradas. Por exemplo, menus pop-up podem não ser fechados ao clicar na barra de título de uma janela.

#### Comportamento de Window.toFront()/toBack() no X11

Devido a restrições impostas por software de terceiros (em particular, por gerenciadores de janela como o Metacity), os métodos toFront()/toBack() podem não funcionar como esperado e fazer com que a janela não altere sua ordem de empilhamento em relação a outras janelas de nível superior.

Mais detalhes estão disponíveis no CR 6472274.

Se um aplicativo deseja trazer uma janela para o topo, ele pode tentar contornar o problema chamando Window.setAlwaysOnTop(true) para temporariamente fazer a janela sempre ficar no topo e, em seguida, chamando setAlwaysOnTop(false) para redefinir o estado "sempre no topo".

Nota:

Esta solução alternativa não é garantida para funcionar porque os gerenciadores de janela podem impor mais restrições. Além disso, definir uma janela como "sempre no topo" está disponível apenas para aplicativos confiáveis.

No entanto, aplicativos nativos experimentam problemas semelhantes, e esta peculiaridade faz com que os aplicativos Java se comportem de forma similar aos aplicativos nativos.

### Mistura de Componentes Heavyweight e Lightweight

Os seguintes problemas são abordados no recurso de mistura de componentes heavyweight ou lightweight (HW/LW):

  * Validar a hierarquia de componentes:

Alterar quaisquer propriedades de um componente relacionadas ao layout, como seu tamanho, localização ou fonte, invalida o componente, bem como seus ancestrais. Para que o recurso de Mistura HW/LW funcione corretamente, a hierarquia de componentes deve ser validada após fazer tais alterações. Por padrão, a invalidação para no contêiner de nível superior da hierarquia (por exemplo, um objeto `Frame`). Portanto, para restaurar a validade da hierarquia, o aplicativo deve chamar o método `Frame.validate()`. Por exemplo:
```java
component.setFont(myFont);
        frame.validate();

```

`frame` refere-se a um frame que contém `component`.

Nota:

Aplicativos Swing e a biblioteca Swing frequentemente usam o seguinte padrão:
component.setFont(myFont);
        component.revalidate();
        
```

A chamada `revalidate()` não é suficiente porque ela valida a hierarquia começando apenas do `validate root` mais próximo do componente, deixando assim os contêineres superiores `invalid`. Nesse caso, o recurso HW/LW pode não calcular as formas corretas para os `HW components`, e artefatos visuais podem ser vistos na tela.

Para verificar a validade de toda a hierarquia de componentes, um usuário pode usar a combinação de teclas `Control+Shift+F1`, conforme descrito em Dicas de Depuração para AWT. Um componente marcado como `invalid` pode indicar uma chamada `validate()` ausente em algum lugar.

  * `Validate roots`:

O conceito de `validate roots` mencionado em Validar a hierarquia de componentes foi introduzido no `Swing` para acelerar o processo de validação de hierarquias de componentes, pois pode levar uma quantidade significativa de tempo. Embora tal otimização deixe as partes superiores das hierarquias `invalid`, isso não criou problemas porque o layout dos componentes dentro de um `validate root` não afeta o layout da hierarquia de componentes externa (ou seja, os irmãos do `validate root`). No entanto, quando `HW` e `LW components` são misturados em uma hierarquia, esta afirmação não é mais verdadeira. É por isso que o recurso exige que toda a hierarquia de componentes seja válida.

Chamar `frame.validate()` pode ser ineficiente, e o `AWT` suporta uma maneira alternativa e otimizada de lidar com a invalidação/validação de hierarquias de componentes. Este recurso é ativado com uma propriedade de sistema:
```
-Djava.awt.smartInvalidate=true
        
```

Uma vez que esta propriedade é especificada, o método `invalidate()` interromperá a invalidação da hierarquia quando atingir o `validate root` mais próximo de um componente no qual o método `invalidate()` foi invocado. Posteriormente, para restaurar a validade da hierarquia de componentes, o aplicativo deve simplesmente chamar:
```
component.revalidate();
        
```

Nota:

Neste caso, chamar `frame.validate()` seria efetivamente um `no-op` (uma instrução que não faz nada) porque `frame` ainda é válido. Como alguns aplicativos dependem de chamar `validate()` diretamente em um componente superior ao `validate root` da hierarquia (por exemplo, um `frame`), este novo comportamento otimizado pode causar problemas de incompatibilidade e, portanto, está disponível apenas ao especificar a propriedade de sistema.

Se um aplicativo tiver dificuldades ao executar neste novo modo otimizado, um usuário pode usar a combinação de teclas `Control+Shift+F1`, conforme descrito em Dicas de Depuração para AWT, para investigar quais partes da hierarquia de componentes são deixadas `invalid` e, assim, possivelmente causar os problemas.

  * Otimização de pintura do `Swing`:

Por padrão, a biblioteca `Swing` assume que não há `HW components` na hierarquia de componentes e, portanto, usa técnicas de desenho otimizadas para aumentar o desempenho da GUI do `Swing`. Se uma hierarquia de componentes contiver `HW components`, as otimizações devem ser desativadas. Isso é relevante para `JScrollPanes` do `Swing` em primeiro lugar. Você pode alterar o modo de rolagem usando o método `JViewPort.setScrollMode(int)`.

  * `LW components` não opacos:

`LW components` não opacos não são suportados pela implementação do recurso de mistura HW/LW por padrão. Para habilitar a mistura de `LW components` não retangulares com `HW components`, o aplicativo deve usar a API não pública `com.sun.awt.AWTUtilities.setComponentMixingCutoutShape()`.

Nota:

Os `LW components` não retangulares ainda devem se pintar usando cores opacas (`alpha = 1.0`) ou transparentes (`alpha = 0.0`). O uso de cores translúcidas (com `0.0 < alpha < 1.0`) não é suportado.

  * Desabilitar o recurso de mistura HW/LW padrão:

No passado, alguns desenvolvedores implementaram seu próprio suporte para casos em que `HW` e `LW components` devem ser misturados. Para desabilitar o recurso integrado, o aplicativo deve ser iniciado com a seguinte propriedade de sistema:
```
-Dsun.awt.disableMixing=true
        