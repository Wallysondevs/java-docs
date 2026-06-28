# Introdução a Problemas de Cliente

## 10 Introdução a Problemas de Cliente

Este capítulo explica como as diferentes tecnologias Java SE Desktop interagem entre si. Além disso, o capítulo ajuda a identificar a tecnologia a partir da qual você pode começar a solucionar seu problema e fornece dicas gerais de solução de problemas.

Este capítulo contém as seguintes seções:

  * [Tecnologias Java SE Desktop](<#/doc/guides/troubleshoot/introduction-client-issues>)

  * [Etapas Gerais para Solucionar um Problema](<#/doc/guides/troubleshoot/introduction-client-issues>)

  * [Identificar o Tipo de Problema](<#/doc/guides/troubleshoot/introduction-client-issues>)

  * [Ferramentas Básicas](<#/doc/guides/troubleshoot/introduction-client-issues>)

  * [Java Debug Wire Protocol](<#/doc/guides/troubleshoot/introduction-client-issues>)




### Tecnologias Java SE Desktop

Java SE Desktop consiste em várias tecnologias usadas para criar aplicações cliente ricas.

As ferramentas e bibliotecas de desktop fornecem uma interface entre a aplicação Java e as ferramentas e bibliotecas centrais da plataforma, conforme mostrado na [Figura 10-1](<#/doc/guides/troubleshoot/introduction-client-issues>).

Figura 10-1 Visão Geral do Java SE Desktop

[Descrição de "Figura 10-1 Visão Geral do Java SE Desktop"](<#/>)

Este tópico descreve técnicas de solução de problemas para as seguintes tecnologias Java SE desktop:

  * Abstract Window Toolkit (AWT) fornece um conjunto de interfaces de programação de aplicações (APIs) para a construção de componentes de interface gráfica do usuário (GUI), como menus, botões, campos de texto, caixas de diálogo, caixas de seleção, e para o tratamento da entrada do usuário através desses componentes. Além disso, o AWT permite a renderização de formas simples como ovais e polígonos e permite aos desenvolvedores controlar o layout da interface e as fontes usadas por suas aplicações. Ele também inclui classes de transferência de dados (incluindo arrastar e soltar) que permitem recortar e colar através da área de transferência da plataforma nativa.

As classes desta API estão na base da pilha de software (mais próximas do sistema operacional e de desktop subjacente).

O AWT também fornece um conjunto de componentes heavyweight.

Aplicações puramente AWT geralmente não estão relacionadas ao Swing. Se uma aplicação AWT faz renderização personalizada, ela usa Java 2D.

  * Java 2D é um conjunto de classes para gráficos 2D avançados e imagens. Ele engloba arte de linha, texto e imagens em um único modelo abrangente. A API fornece suporte extensivo para composição de imagens e imagens com canal alfa, um conjunto de classes para fornecer definição e conversão precisas de espaço de cores, e um rico conjunto de operadores de imagem orientados para exibição. Essas classes são fornecidas como adições aos pacotes `java.awt` e `java.awt.image`.

Assim como o AWT, o Java 2D também está na base da pilha de software (mais próximo do sistema operacional e de desktop subjacente).

  * Swing fornece um conjunto abrangente de componentes e serviços GUI que permite o desenvolvimento de aplicações desktop e Internet/Intranet de qualidade comercial.

Swing é construído sobre muitas das outras tecnologias Java SE Desktop, incluindo AWT, Java2D e Internationalization. Na maioria dos casos, os componentes de alto nível do Swing são recomendados em vez daqueles do AWT. No entanto, existem muitas APIs no AWT que são importantes de entender ao programar em Swing.

Como o Swing é um toolkit lightweight, ele tem muito pouca interação com a plataforma nativa. O Swing usa Java 2D para renderização, e o AWT fornece a criação e manipulação de componentes de nível superior, como Windows, Frames e Dialogs.

  * Internationalization é o processo de projetar software para que ele possa ser adaptado (localizado) para vários idiomas e regiões de forma fácil, econômica e, em particular, sem alterações de engenharia no software. A localização é realizada simplesmente adicionando componentes específicos do locale, como texto traduzido, dados que descrevem o comportamento específico do locale, fontes e métodos de entrada.

No Java SE, o suporte à internationalization está totalmente integrado nas classes e pacotes que fornecem funcionalidade dependente de idioma ou cultura.

Para saber mais sobre as APIs de internationalization e recursos do Java SE, consulte [Visão Geral da Internationalization](<#/>).

  * Java Sound fornece suporte de baixo nível para operações de áudio, como reprodução e captura de áudio (gravação), mixagem, sequenciamento MIDI (musical instrument digital interface) e síntese MIDI em uma estrutura extensível e flexível. Esta API é suportada por um eficiente motor de som que garante mixagem de áudio de alta qualidade e capacidades de síntese MIDI para a plataforma.

Quanto melhor você entender as relações entre essas tecnologias, mais rapidamente poderá identificar a área em que seu problema se encaixa.

### Etapas Gerais para Solucionar um Problema

Etapas gerais para solucionar problemas em sua aplicação.

Quando você encontrar problemas ao executar sua aplicação, siga as etapas abaixo para solucionar o problema.

  1. Identifique o sintoma:

     * [Identificar o Tipo de Problema](<#/doc/guides/troubleshoot/introduction-client-issues>).

     * Encontre a área do problema.

     * Anote as informações de configuração vant.

  2. Elimine não-problemas:

     * Certifique-se de que os patches, drivers e sistemas operacionais corretos estejam instalados.

     * Experimente versões anteriores (back-tracing).

     * Minimize o teste. Restrinja o teste ao menor número possível de problemas por vez.

     * Minimize a configuração de hardware e software. Determine se o problema é reproduzível em um único sistema e em vários sistemas. Determine se o problema muda com a versão do navegador.

     * Determine se o problema depende da instalação de múltiplas VMs.

  3. Encontre a causa:

     * Verifique as causas típicas na área.

     * Use flags para alterar os padrões.

     * Use tracing.

     * Em casos excepcionais, use propriedades de sistema para alterar temporariamente o comportamento do sistema de pintura.

  4. Encontre a correção:

     * Encontre uma possível solução alternativa.

     * Registre um bug.

Para orientação sobre como enviar um relatório de bug e sugestões sobre quais dados coletar para o relatório, consulte [Enviar um Relatório de Bug](<#/doc/guides/troubleshoot/submit-bug-report>).

     * Corrija a configuração.

     * Corrija a aplicação.




### Identificar o Tipo de Problema

Orientação sobre como identificar o problema que você está enfrentando e encontrar a causa e a solução.

Primeiramente, reserve um momento para categorizar o problema que você está enfrentando. Isso o ajudará a identificar a área específica do problema, encontrar a causa e, finalmente, determinar uma solução ou uma solução alternativa.

As subseções a seguir fornecem informações sobre tipos comuns de problemas:

  * [Falhas do Cliente Java](<#/doc/guides/troubleshoot/introduction-client-issues>)

  * [Problemas de Desempenho](<#/doc/guides/troubleshoot/introduction-client-issues>)

  * [Problemas de Comportamento](<#/doc/guides/troubleshoot/introduction-client-issues>)




Alguns deles podem parecer óbvios, mas é sempre útil considerar todas as possibilidades e eliminar o que não é um problema.

#### Falhas do Cliente Java

Um log de erro é criado contendo informações e o estado obtido no momento do erro fatal, quando o cliente Java falha.

O nome padrão do arquivo de log de erro é hs_err_pid.log, onde pid é o identificador de processo (PID) do processo que falhou. Para uma aplicação Java standalone, este arquivo é criado no diretório atual.

Para saber mais sobre o log de erro fatal, consulte [Log de Erro Fatal](<#/doc/guides/troubleshoot/location-fatal-error-log>).

Uma linha perto do topo da seção de cabeçalho indica a biblioteca onde o erro ocorreu. O exemplo a seguir mostra que a falha estava relacionada à biblioteca AWT.
```
    ...
    # Java VM: Java HotSpot(TM) Client VM (1.6.0-beta2-b76 mixed mode, sharing)
    # Problematic frame:
    # C  [awt.dll+0x123456]
    ...
```

Se a falha ocorreu na Java Native Interface (JNI), provavelmente foi causada pelas bibliotecas de desktop. Uma falha em uma biblioteca nativa geralmente significa um problema em Java 2D ou AWT porque o Swing não possui muito código nativo. A pequena quantidade de código nativo no Swing está então relacionada ao look and feel nativo, e se sua aplicação estiver usando look and feel nativo, então a falha pode estar relacionada a esta área.

O log de erro geralmente mostra a biblioteca exata onde a falha ocorreu, e isso pode lhe dar uma boa ideia da causa. Falhas em bibliotecas que não fazem parte do Java Development Kit (JDK) geralmente indicam problemas com o ambiente, por exemplo, drivers de vídeo ruins ou gerenciadores de desktop.

#### Problemas de Desempenho

Problemas de desempenho são mais difíceis de diagnosticar porque geralmente você não tem tanta informação.

Primeiro, você deve determinar qual tecnologia apresenta o problema. Por exemplo, problemas de desempenho de renderização provavelmente estão em Java 2D, e problemas de responsividade podem estar relacionados ao Swing.

Problemas relacionados ao desempenho podem ser divididos nas seguintes categorias:

  * Inicialização

Quanto tempo a aplicação leva para iniciar e se tornar útil para o usuário?

  * Pegada de Memória

Quanta memória a aplicação consome? Isso pode ser medido por ferramentas como Task Manager no Windows ou `top` e `prstat` no sistema operacional Linux.

  * Tempo de Execução

Com que rapidez a aplicação completa a tarefa para a qual foi projetada? Por exemplo, se a aplicação calcula algo, quanto tempo leva para finalizar os cálculos? No caso de um jogo, a taxa de quadros é aceitável e a animação parece suave?

Nota: Isso não é o mesmo que responsividade, que é o próximo tópico.

  * Responsividade

Com que rapidez a aplicação responde à interação do usuário? Se o usuário clica em um menu, quanto tempo leva para o menu aparecer? Uma tarefa de longa duração pode ser interrompida? A aplicação repinta rápido o suficiente para não parecer lenta?




#### Problemas de Comportamento

Esta seção fornece orientação sobre como lidar com vários problemas na aplicação.

Além de falhas, vários problemas relacionados ao comportamento podem ocorrer. Alguns desses problemas estão listados abaixo. Suas descrições podem guiá-lo à tecnologia Java SE Desktop para solução de problemas.

  * Congelamentos (Hangs) ocorrem quando a aplicação para de responder à entrada do usuário. Consulte [Solucionar Congelamentos e Loops de Processos](<#/doc/guides/troubleshoot/troubleshoot-process-hangs-and-loops>).

  * Exceções no código Java são visivelmente lançadas para o console ou para os arquivos de log da aplicação. Uma análise dessa saída o guiará para a área do problema.

  * Problemas de renderização e repintura indicam um problema em Java 2D ou em Swing. Por exemplo, a aparência da aplicação está incorreta após uma repintura que foi causada por outra aplicação sendo arrastada sobre ela. Outros exemplos são fonte incorreta, cores erradas, rolagem, danificação do frame da aplicação ao arrastar outra janela sobre ele e atualização de uma área danificada.

Um teste rápido é o seguinte: Se o problema é reproduzível em uma plataforma diferente (por exemplo, o problema foi originalmente visto no Windows, e também está presente no Linux), é muito provável que seja um problema do `PaintManager` do Swing.

Para as formas de alterar os pipelines de renderização do Java 2D com algumas flags, consulte [Java 2D](<#/doc/guides/troubleshoot/java-2d>). Isso também pode ajudar a determinar se o problema está relacionado a Java 2D ou a Swing.

Problemas de repintura relacionados a múltiplos monitores pertencem ao Java 2D (por exemplo, problemas de repintura ao mover uma janela de uma tela para outra, ou outro comportamento incomum causado pela interação com um dispositivo de tela não padrão).

  * Problemas relacionados à interação com o desktop indicam um problema no AWT. Alguns exemplos de tais problemas ocorrem ao mover, redimensionar, minimizar e maximizar janelas, manipular o foco, enumerar múltiplas telas, usar modalidade, interagir com a área de notificação (system tray) e visualizar telas de splash.

  * Problemas de arrastar e soltar estão relacionados ao AWT.

  * Problemas de impressão podem estar relacionados a Java 2D ou AWT, dependendo da API utilizada.

  * Problemas de renderização de texto em aplicações AWT podem ser um problema nas propriedades da fonte ou na internationalization.

No entanto, se sua aplicação é puramente AWT, problemas de renderização de texto também podem ser causados por Java 2D. No Linux, a renderização de texto é realizada por Java 2D.

A renderização de texto no Swing é realizada por Java 2D. Portanto, se sua aplicação usa Swing e você tem problemas de renderização de texto (como glifos ausentes, renderização incorreta de glifos, espaçamento incorreto entre linhas ou caracteres, má qualidade de renderização de fonte), então o problema provavelmente está em Java 2D.

  * Problemas de pintura são muito provavelmente um problema do Swing.

  * Problemas de tela cheia estão relacionados à API Java 2D.

  * Problemas de codificação e locales (por exemplo, nenhum caractere específico do locale exibido) indicam problemas de internalization.




### Ferramentas Básicas

Esta seção fornece uma lista de ferramentas básicas que podem ajudar a solucionar certos tipos de problemas.

Esta seção lista algumas ferramentas que podem ajudar a solucionar certos tipos de problemas.

  * Desempenho: Benchmarks, profilers, DTrace, Java probe.

  * Pegada de Memória: `jmap`, profilers

  * Falhas: Depuradores nativos

  * Congelamentos: JConsole, `jstack`, Control+Break




### Java Debug Wire Protocol

O Java Debug Wire Protocol (JDWP) é muito útil para depurar aplicações.

Para depurar uma aplicação usando JDWP:

  1. Abra a linha de comando e defina a variável de ambiente `PATH` para `jdk/bin`, onde `jdk` é o diretório de instalação do JDK.
  2. Use o seguinte comando para executar a aplicação (chamada `Test` neste exemplo) que você deseja depurar:
     * No Windows:
```java -Xdebug -Xrunjdwp:transport=dt_shmem,address=debug,server=y,suspend=y Test
```

     * No sistema operacional Linux:
```java -Xdebug -Xrunjdwp:transport=dt_socket,address=8888,server=y,suspend=y Test
```

A classe `Test` iniciará no modo de depuração e aguardará que um depurador se conecte a ela no endereço `debug` (no Windows) ou `8888` (no sistema operacional Linux).

  3. Abra outra linha de comando e use o seguinte comando para executar `jdb` e conectá-lo ao servidor de depuração em execução:
     * No Windows:
```jdb -attach 'debug'
```

     * No sistema operacional Linux:
```jdb -attach 8888
```

Depois que `jdb` inicializar e se conectar a `Test`, você poderá realizar a depuração em nível Java.

  4. Defina seus breakpoints e execute a aplicação. Por exemplo, para definir o breakpoint no início do método `main` em `Test`, execute o seguinte comando:
```stop in Test.main run
```

Quando o utilitário `jdb` atingir o breakpoint, você poderá inspecionar o ambiente em que a aplicação está sendo executada e verificar se ela está funcionando conforme o esperado.

  5. (Opcional) Para realizar a depuração em nível nativo juntamente com a depuração em nível Java, use depuradores nativos para se conectar ao processo Java em execução com JDWP.
     * No Linux, você pode usar o utilitário `gdb`.
     * No Windows, você pode usar o Visual Studio para depuração em nível nativo da seguinte forma:
       1. Abra o Visual Studio.

       2. No menu Debug, selecione Attach to Process. Selecione o processo Java que está em execução com JDWP.

       3. No menu Project, selecione Settings e abra a aba Debug. Na lista suspensa Category, selecione Additional DLLs e adicione a DLL nativa que você deseja depurar (por exemplo, `Test.dll`).

       4. Abra o arquivo fonte (um ou mais) de `Test.dll` e defina seus breakpoints.

       5. Digite `cont` na janela `jdb`. O processo atingirá o breakpoint no Visual Studio.