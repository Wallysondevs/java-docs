# Swing

## 14 Swing

Este capítulo fornece informações e orientações sobre alguns procedimentos específicos para solucionar os problemas mais comuns que podem ser encontrados na API Java SE Swing.

Este capítulo contém as seguintes seções:

  * [Dicas Gerais de Depuração para Swing](<#/doc/guides/troubleshoot/swing>)

  * [Dicas Específicas de Depuração para Swing](<#/doc/guides/troubleshoot/swing>)




### Dicas Gerais de Depuração para Swing

Ao depurar o código Swing que é executado enquanto qualquer menu é exibido, é recomendado usar o depurador remotamente. Caso contrário, o processo de depuração e a execução da aplicação se bloqueiam mutuamente, e isso impede o trabalho posterior com o sistema. Se isso acontecer, a única ação que pode ser tomada é encerrar o X server para Linux.

A seguir estão alguns problemas comuns do Swing:

  * Pintura.

  * Renderers.

  * Atualização de modelos a partir de thread incorreta.

  * Travamentos.

  * Responsividade.

  * Problemas de repintura.

  * Uso de `isOpaque`.

  * Inicialização: pode ser causada por heap pequeno, carregamento de classes desnecessárias.




A seguir estão algumas coisas a considerar:

  * Recurso de buffer por janela.

  * Fidelidade do look-and-feel nativo: Gnome vs Windows

  * Pegada de memória de aplicações Swing.

  * `JTable`, `JTree` e `JList` todos usam renderers.

  * Certifique-se de que os renderers personalizados façam o mínimo possível.

  * Atualize os modelos apenas a partir da event dispatch thread. Caso contrário, a exibição não refletirá o estado do modelo.




Os seguintes itens identificam renderers ruins:

  * Aplicação lenta, especialmente ao rolar.

  * Use um otimizador para observar as chamadas de pintura, procure por chamadas para `getTableCellTRendererComponent`.




### Dicas Específicas de Depuração para Swing

Os tópicos a seguir descrevem problemas no Swing e técnicas de solução de problemas:

  * [Threading Incorreto](<#/doc/guides/troubleshoot/swing>)

  * [Sobreposição de Filhos de JComponent](<#/doc/guides/troubleshoot/swing>)

  * [Atualização da Exibição](<#/doc/guides/troubleshoot/swing>)

  * [Mudança de Modelo](<#/doc/guides/troubleshoot/swing>)

  * [Adicionar ou Remover Componentes](<#/doc/guides/troubleshoot/swing>)

  * [Sobrescrita de Opacidade](<#/doc/guides/troubleshoot/swing>)

  * [Alterações Permanentes em Graphics](<#/doc/guides/troubleshoot/swing>)

  * [Pintura Personalizada e Double Buffering](<#/doc/guides/troubleshoot/swing>)

  * [Content Pane Opaco](<#/doc/guides/troubleshoot/swing>)

  * [Chamada de Renderer para Performance de Cada Célula](<#/doc/guides/troubleshoot/swing>)

  * [Possíveis Vazamentos](<#/doc/guides/troubleshoot/swing>)

  * [Misturar Componentes Heavyweight e Lightweight](<#/doc/guides/troubleshoot/swing>)

  * [Usar Synth](<#/doc/guides/troubleshoot/swing>)

  * [Rastrear Atividade na Event Dispatch Thread](<#/doc/guides/troubleshoot/swing>)

  * [Especificar Layout Manager Padrão](<#/doc/guides/troubleshoot/swing>)

  * [Objeto Listener Despachado para Componente Incorreto](<#/doc/guides/troubleshoot/swing>)

  * [Adicionar um Componente ao Content Pane](<#/doc/guides/troubleshoot/swing>)

  * [Suporte a Drag and Drop](<#/doc/guides/troubleshoot/swing>)

  * [Um Pai para um Componente](<#/doc/guides/troubleshoot/swing>)

  * [Problemas do JFileChooser com Atalhos do Windows](<#/doc/guides/troubleshoot/swing>)




#### Threading Incorreto

Exceções aleatórias e problemas de pintura são geralmente o resultado do uso incorreto de threading pelo Swing.

Todo acesso a componentes Swing, a menos que especificamente observado na documentação da JavaDoc API, deve ser feito na event dispatch thread. Isso inclui quaisquer modelos (`TableModel`, `ListModel` e outros) que estejam anexados a componentes Swing.

A melhor maneira de verificar o uso incorreto do Swing é usando um `RepaintManager` instrumentado, como ilustrado no exemplo a seguir.
```
    public class CheckThreadViolationRepaintManager extends RepaintManager {
         // it is recommended to pass the complete check
         private boolean completeCheck = true;
    
         public boolean isCompleteCheck() {
             return completeCheck;
         }
    
         public void setCompleteCheck(boolean completeCheck) {
             this.completeCheck = completeCheck;
         }
    
         public synchronized void addInvalidComponent(JComponent component) {
             checkThreadViolations(component);
             super.addInvalidComponent(component);
         }
    
         public void addDirtyRegion(JComponent component, int x, int y, int w, int 
    h) {
             checkThreadViolations(component);
             super.addDirtyRegion(component, x, y, w, h);
         }
    
         private void checkThreadViolations(JComponent c) {
             if (!SwingUtilities.isEventDispatchThread() && (completeCheck || 
    c.isShowing())) {
                 Exception exception = new Exception();
                 boolean repaint = false;
                 boolean fromSwing = false;
                 StackTraceElement[] stackTrace = exception.getStackTrace();
                 for (StackTraceElement st : stackTrace) {
                     if (repaint && st.getClassName().startsWith("javax.swing.")) {
                         fromSwing = true;
                     }
                     if ("repaint".equals(st.getMethodName())) {
                         repaint = true;
                     }
                 }
                 if (repaint && !fromSwing) {
                     //no problems here, since repaint() is thread safe
                     return;
                 }
                 exception.printStackTrace();
             }
         }
    }
    
```

#### Sobreposição de Filhos de JComponent

Outra possível fonte de problemas de pintura pode ocorrer se você permitir que os filhos de um `JComponent` se sobreponham.

Nesse caso, o pai deve sobrescrever `isOptimizedDrawingEnabled` para retornar `false`. Se você não sobrescrever `isOptimizedDrawingEnabled`, os componentes podem aparecer aleatoriamente uns sobre os outros, dependendo de qual componente `repaint` foi invocado.

#### Atualização da Exibição

Outra fonte de problemas de pintura pode ocorrer se você não invocar `repaint` corretamente quando precisar atualizar a exibição.

Alterar uma propriedade visível de um componente Swing, como a fonte, acionará um `repaint` ou `revalidate`. Se você estiver escrevendo um componente personalizado, deverá invocar `repaint` e possivelmente `revalidate` sempre que as informações de exibição ou dimensionamento forem atualizadas. Se você não o fizer, a exibição só será atualizada na próxima vez que alguém acionar um `repaint`.

Uma boa maneira de diagnosticar isso é redimensionar a janela. Se o conteúdo aparecer após um redimensionamento, isso implica que o componente não invocou `repaint` ou `revalidate` corretamente.

#### Mudança de Modelo

Invoque `repaint` quando você alterar uma propriedade visível de um componente Swing, mas você não precisa invocar `repaint` quando seu modelo muda.

Se o seu modelo enviar a notificação de mudança correta, o `JComponent` invocará `repaint` ou `revalidate` conforme apropriado.

No entanto, se você alterar seu modelo, mas não enviar uma notificação, um evento `repaint` pode nem funcionar. Em particular, isso não funcionará com `JTree`. O correto a fazer é enviar a notificação de modelo apropriada. Isso geralmente pode ser diagnosticado redimensionando a janela e percebendo que a exibição não foi atualizada corretamente.

#### Adicionar ou Remover Componentes

Ao adicionar ou remover componentes, você deve invocar manualmente `repaint` ou `revalidate` Swing e AWT.

#### Sobrescrita de Opacidade

Outra possível área de problemas de pintura é se um componente não sobrescreve `opaque`.

Além disso, se você não invocar a implementação, você deve honrar a propriedade `opaque`; ou seja, se este componente for `opaque`, você deve preencher completamente o fundo com uma cor não opaca. Se você não honrar a propriedade `opaque`, provavelmente verá artefatos visuais.

A única maneira de verificar isso é procurar por artefatos visuais consistentes quando o componente invoca `repaint`.

#### Alterações Permanentes em Graphics

Não faça alterações permanentes em um objeto `Graphics` que é passado para `paint`, `paintComponent` ou `paintChildren`.

Nota:

Se você sobrescrever os gráficos em uma subclasse, não deve fazer alterações permanentes em `paint`, `paintComponent` ou `paintChildren` passados no objeto `Graphics`. Por exemplo, você não deve alterar o `clip Rectangle` ou modificar a transformação. Se você precisar fazer essas operações, pode ser mais fácil criar um novo objeto `Graphics` a partir do objeto `Graphics` passado e manipulá-lo em vez disso.

Se você ignorar essa restrição, o resultado será recorte ou outros artefatos visuais estranhos.

#### Pintura Personalizada e Double Buffering

Embora você possa sobrescrever `paint` e fazer pintura personalizada na sobrescrita, você deve, em vez disso, sobrescrever `paintComponent`.

O método `JComponent.paint` garante que a pintura ocorra no double buffer. Se você sobrescrever `paint` diretamente, poderá perder o double buffering.

#### Content Pane Opaco

A arquitetura de pintura do Swing requer um content pane opaco.

A arquitetura de pintura do Swing requer que um `JComponent` opaco exista na hierarquia de contenção acima de todos os outros componentes. Isso é tipicamente fornecido usando o content pane. Se você substituir o content pane, é recomendado que você o torne opaco usando `setOpaque(true)`. Além disso, se o content pane sobrescrever `paintComponent`, ele precisará preencher completamente o fundo com uma cor opaca em `paintComponent`.

#### Chamada de Renderer para Performance de Cada Célula

Renderers são pintados para cada célula, então certifique-se de que o renderer faça o mínimo possível.

Qualquer lentidão no renderer é amplificada em todas as células. Por exemplo, se você repintar a região visível de uma tabela com 50x20 células visíveis, haverá 1000 chamadas para o renderer.

#### Possíveis Vazamentos

Se o ciclo de vida do seu modelo for mais longo do que o de uma janela com um componente usando o modelo, você deve explicitamente definir o modelo do componente Swing como `null`.

Se você não definir o modelo como `null`, seu modelo reterá uma referência ao `Component`, o que impedirá que todos os componentes na janela sejam `garbage collected`. Veja o exemplo a seguir.
```
    TableModel myModel = ...;
    JFrame frame = new JFrame();
    frame.setContentPane(new JScrollPane(new JTable(myModel)));
    frame.dispose();
    
```

Se sua aplicação ainda mantiver uma referência a `myModel`, então `frame` e todos os seus filhos ainda serão alcançáveis por meio das instalações do listener `JTable` em `myModel`. A solução é invocar `table.setModel(new DefaultTableModel())`.

#### Misturar Componentes Heavyweight e Lightweight

Misturar componentes `heavyweight` e `lightweight` pode funcionar em certos cenários, desde que o componente `heavyweight` não se sobreponha a nenhum componente Swing existente.

Por exemplo, um `heavyweight` não funcionará em um `internal frame`, porque quando o usuário arrastar o `internal frame`, ele se sobreporá a outros `internal frames`. Se você usar `heavyweights`, então invoque os seguintes métodos:

  * `JPopupMenu.setDefaultLightWeightPopupEnabled(false)`
  * `ToolTipManager.sharedInstance().setLightWeightPopupEnabled(false)`



#### Usar Synth

`Synth` é uma tela vazia.

Para usar `Synth`, você deve fornecer um arquivo XML completo que configure o look and feel, ou estender `SynthLookAndFeel` e fornecer seu próprio `SynthStyleFactory`.

#### Rastrear Atividade na Event Dispatch Thread

Se uma aplicação Swing tentar fazer muito na event dispatch thread, então a aplicação parecerá lenta e sem resposta.

Uma maneira de detectar essa situação é empurrar uma nova `EventQueue` que pode gerar informações de log se um evento demorar muito para ser processado. Essa abordagem não é perfeita, pois tem problemas com eventos de foco e modalidade, mas é boa para testes ad-hoc.

#### Especificar Layout Manager Padrão

Problemas podem ser causados por classes de `Layout Manager` padrão diferentes em um componente Swing.

Por exemplo, o padrão para a classe `JPanel` é `FlowLayout`, mas o padrão para a classe `JFrame` é `BorderLayout`. Essa situação é facilmente corrigida especificando um `LayoutManager`.

#### Objeto Listener Despachado para Componente Incorreto

Objetos `MouseListener` são despachados para o componente mais profundo que possui objetos `MouseListener` (ou que habilitou objetos `MouseEvent`).

Uma ramificação disso é que, se você anexar um `MouseListener` a um componente cujos descendentes possuem objetos `MouseListener`, seu objeto `MouseListener` nunca será chamado.

Isso é facilmente reproduzido com um componente composto, como um `JComboBox` editável. Como um `JComboBox` possui componentes filhos que têm um `MouseListener`, um `MouseListener` anexado a um `JComboBox` editável nunca será notificado.

Se o seu `MouseListener` de repente parar de receber eventos, isso pode ser o resultado de uma mudança na aplicação em que um componente descendente agora possui um `MouseListener`. Uma boa maneira de verificar isso é iterar sobre os descendentes perguntando se eles têm algum `mouse listener`.

Um cenário semelhante ocorre com a classe `KeyListener`. Um objeto `KeyListener` é despachado apenas para o componente focado.

O caso do `JComboBox` é outro exemplo dessa situação. No caso do `JComboBox` editável, o editor recebe o foco, não o `JComboBox`. Como resultado, um `KeyListener` anexado a um `JComboBox` editável nunca será notificado.

#### Adicionar um Componente ao Content Pane

Você deve adicionar um componente `JFrame`, `JWindow` ou `JDialog` ao content pane.

Um componente adicionado a um componente Swing de nível superior deve ir para o content pane, mas o método `add` (e alguns outros métodos) nas classes `JFrame`, `JWindow` e `JDialog` redirecionam para o content pane. Em outras palavras, `frame.getContentPane().add(component)` é o mesmo que `frame.add(component)`.

Os seguintes métodos redirecionam para o content pane para você: `add` (e suas variantes), `remove` (e suas variantes) e `setLayout`.

Isso é puramente uma conveniência, mas pode causar confusão. Em particular, `getChildren`, `getLayout` e vários outros não redirecionam para o content pane.

Essa mudança afeta `LayoutManagers` que funcionam apenas com um componente, como `GroupLayout` e `BoxLayout`. Por exemplo, `new GroupLayout(frame)` não funcionará; em vez disso, você deve usar `GroupLayout(frame.getContentPane())`.

#### Suporte a Drag and Drop

Ao usar Swing, você deve usar o suporte a `drag-and-drop` do Swing fornecido por `TransferHandler`.

#### Um Pai para um Componente

Lembre-se de que um componente só pode existir em um pai por vez.

Problemas ocorrem quando você compartilha itens de menu entre menus. Por exemplo, `JMenuItem` é um componente e, portanto, pode existir em apenas um menu por vez.

#### Problemas do JFileChooser com Atalhos do Windows

A classe `JFileChooser` não suporta atalhos no sistema operacional Windows (arquivos `.lnk`).

Ao contrário dos seletores de arquivo padrão do Windows, o `JFileChooser` não permite que o usuário siga atalhos do Windows ao navegar no sistema de arquivos, porque ele não mostra o caminho correto para o arquivo.

Para reproduzir o problema, siga estas etapas:

  1. Crie um arquivo de texto na Área de Trabalho chamado, por exemplo, `MyFile.txt`. Abra o arquivo de texto e digite algum texto, por exemplo: `This is the contents of MyFile.txt`.
  2. Crie um atalho para o novo arquivo de texto da seguinte forma: Arraste o arquivo com o botão direito do mouse para outro local na Área de Trabalho e escolha `Criar Atalho(s) aqui`.
  3. Execute a aplicação de teste `JFileChooser`, navegue até a Área de Trabalho, selecione `Atalho para MyFile.txt` e clique em `Abrir`.
  4. O arquivo resultante é `PathToDesktop\Shortcut to MyFile.txt.lnk`, mas deveria ser `PathToDesktop\MyFile.txt`.
  5. Além disso, o conteúdo do arquivo resultante na área de texto mostra o conteúdo do arquivo `shortcut to MyFile.txt.lnk`, mas o conteúdo deveria ser `This is the contents of MyFile.txt`, que foi digitado na etapa [1](<#/doc/guides/troubleshoot/swing>).