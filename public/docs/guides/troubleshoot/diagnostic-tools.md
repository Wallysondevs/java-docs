# Ferramentas de Diagnóstico

## 2 Ferramentas de Diagnóstico

O Java Development Kit (JDK) fornece ferramentas de diagnóstico e ferramentas de solução de problemas específicas para vários sistemas operacionais. Ferramentas de diagnóstico personalizadas também podem ser desenvolvidas usando as APIs fornecidas pelo JDK.

Este capítulo contém as seguintes seções:

  * [Visão Geral das Ferramentas de Diagnóstico](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [JDK Mission Control](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [Flight Recorder](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [O Utilitário jcmd](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [Native Memory Tracking](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [JConsole](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [O Utilitário jdb](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [O Utilitário jinfo](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [O Utilitário jmap](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [O Utilitário jps](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [O Utilitário jrunscript](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [O Utilitário jstack](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [O Utilitário jstat](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [A Ferramenta visualgc](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [Control+Break Handler](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [Ferramentas Nativas do Sistema Operacional](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [Ferramentas de Diagnóstico Personalizadas](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [Ferramentas de Diagnóstico Post-mortem](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [Ferramentas para Processos Travados](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [Ferramentas de Monitoramento](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [Outras Ferramentas, Opções, Variáveis e Propriedades](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [O Daemon jstatd](<#/doc/guides/troubleshoot/diagnostic-tools>)

### Visão Geral das Ferramentas de Diagnóstico

A maioria dos utilitários de linha de comando descritos nesta seção estão incluídos no JDK ou são ferramentas e utilitários nativos do sistema operacional.

Os utilitários de linha de comando do JDK podem ser usados para diagnosticar problemas e monitorar aplicações que são implantadas no ambiente de tempo de execução Java.

Em geral, as ferramentas e opções de diagnóstico usam vários mecanismos para obter as informações que relatam. Os mecanismos são específicos para a implementação da máquina virtual (VM), sistemas operacionais e versão. Frequentemente, apenas um subconjunto das ferramentas é aplicável a um determinado problema em um momento específico. As opções de linha de comando que são prefixadas com `-XX` são específicas para a Java HotSpot VM. Consulte [Opções de Linha de Comando da Java HotSpot VM](<#/doc/guides/troubleshoot/command-line-options1>).

Nota:

As opções `-XX` não fazem parte da Java API e podem variar de uma versão para outra.

As ferramentas e opções são divididas em várias categorias, dependendo do tipo de problema que você está solucionando. Certas ferramentas e opções podem se enquadrar em mais de uma categoria.

  * Diagnóstico post-mortem Essas ferramentas e opções podem ser usadas para diagnosticar um problema após a falha de uma aplicação. Consulte [Ferramentas de Diagnóstico Post-mortem](<#/doc/guides/troubleshoot/diagnostic-tools>).

  * Processos travados Essas ferramentas podem ser usadas para investigar um processo travado ou em deadlock. Consulte [Ferramentas para Processos Travados](<#/doc/guides/troubleshoot/diagnostic-tools>).

  * Monitoramento Essas ferramentas podem ser usadas para monitorar uma aplicação em execução. Consulte [Ferramentas de Monitoramento](<#/doc/guides/troubleshoot/diagnostic-tools>).

  * Outras Essas ferramentas e opções podem ser usadas para ajudar a diagnosticar outros problemas. Consulte [Outras Ferramentas, Opções, Variáveis e Propriedades](<#/doc/guides/troubleshoot/diagnostic-tools>).

Nota:

Alguns utilitários de linha de comando descritos nesta seção são experimentais. Os utilitários `jstack`, `jinfo` e `jmap` são exemplos de utilitários experimentais. Sugere-se usar o utilitário de diagnóstico mais recente, `jcmd`, em vez dos utilitários anteriores `jstack`, `jinfo` e `jmap`.

### JDK Mission Control

Java Platform, Standard Edition (JMC) é uma ferramenta de perfil e diagnóstico em tempo de produção. Inclui ferramentas para monitorar e gerenciar sua aplicação Java com uma sobrecarga de desempenho muito pequena, e é adequada para monitorar aplicações em execução em produção.

O JMC não faz parte da instalação regular do JDK. Para mais informações sobre downloads e documentação do JMC, consulte a [Página do JDK Mission Control](<https://www.oracle.com/java/technologies/jdk-mission-control.html>).

O JMC consiste em:

  * JVM Browser mostra aplicações Java em execução e suas JVMs.
  * JMX Console é um mecanismo para monitorar e gerenciar JVMs. Ele se conecta a uma JVM em execução, coleta, exibe suas características em tempo real e permite que você altere algumas de suas propriedades de tempo de execução através de Managed Beans (MBeans). Você também pode criar regras que são acionadas em determinados eventos (por exemplo, enviar um e-mail se o uso da CPU pela aplicação atingir 90 por cento).

  * Flight Recorder (JFR) é uma ferramenta para coletar dados de diagnóstico e perfil sobre uma aplicação Java em execução. Ele é integrado à JVM e causa uma sobrecarga de desempenho muito pequena, por isso pode ser usado em ambientes de produção. O JFR salva continuamente grandes quantidades de dados sobre as aplicações em execução. Essas informações de perfil incluem amostras de threads, perfis de bloqueio e detalhes de garbage collection. O JFR apresenta informações de diagnóstico em tabelas e gráficos agrupados logicamente. Ele permite que você selecione o intervalo de tempo e o nível de detalhe necessários para focar no problema. Os dados coletados pelo JFR podem ser essenciais ao entrar em contato com o Oracle support para ajudar a diagnosticar problemas com sua aplicação Java.

  * Plug-ins auxiliam na análise de heap dump e gravação de DTrace. Consulte [Detalhes do Plug-in](<https://docs.oracle.com/javacomponents/doc/JDMUG/installing-jdk-mission-control-and-supported-plugins.htm#JDMUG-GUID-8F03B4DF-F76C-4BFD-AA67-B5E54C317103>). Os plug-ins Java SE se conectam a uma JVM usando o agente Java Management Extensions (JMX). Para mais informações sobre JMX, consulte o Java Platform, Standard Edition Java Management Extensions Guide.

#### Solução de Problemas com JDK Mission Control

O JMC oferece os seguintes recursos ou funcionalidades que podem ajudar na solução de problemas:

  * O console Java Management (JMX) se conecta a uma JVM em execução e coleta e exibe as principais características em tempo real.
  * Aciona ações e regras personalizadas fornecidas pelo usuário para a JVM.
  * Plug-ins experimentais da ferramenta JMC fornecem atividades de solução de problemas.
  * O Flight Recording no JMC está disponível para analisar eventos. As abas pré-configuradas permitem que você explore facilmente várias áreas de interesse comum, como código, memória e garbage collection, threads e I/O. A página Automated Analysis Results das gravações de voo ajuda você a diagnosticar problemas mais rapidamente. As regras e heurísticas fornecidas ajudam você a encontrar problemas funcionais e de desempenho em sua aplicação e fornecem dicas de ajuste. Algumas regras que operam com conceitos relativamente desconhecidos, como safe points, fornecerão explicações e links para informações adicionais. Algumas regras são parametrizadas e podem ser configuradas para fazer mais sentido em seu ambiente específico. Regras individuais podem ser ativadas ou desativadas conforme você achar adequado.
    * O Flight Recorder na aplicação JMC apresenta informações de diagnóstico em tabelas, gráficos e mostradores agrupados logicamente. Ele permite que você selecione o intervalo de tempo e o nível de detalhe necessários para focar no problema.
  * Os plug-ins do JMC se conectam à JVM usando o agente Java Management Extensions (JMX). O JMX é uma API padrão para o gerenciamento e monitoramento de recursos como aplicações, dispositivos, serviços e a Java Virtual Machine.

### Flight Recorder

Flight Recorder (JFR) é um framework de perfil e coleta de eventos integrado ao JDK.

O Flight Recorder permite que administradores e desenvolvedores Java coletem informações detalhadas de baixo nível sobre como uma JVM e aplicações Java estão se comportando. Você pode usar o JMC para visualizar os dados coletados pelo JFR. O Flight Recorder e o JMC juntos criam uma cadeia de ferramentas completa para coletar continuamente informações de tempo de execução detalhadas e de baixo nível, permitindo a análise de incidentes após o ocorrido.

As vantagens de usar o JFR são:

  * Ele registra dados sobre eventos da JVM à medida que ocorrem, com um timestamp.
  * A gravação de eventos com o JFR permite preservar os estados de execução para analisar problemas. Você pode acessar os dados a qualquer momento para entender melhor os problemas e resolvê-los.
  * O JFR pode registrar uma grande quantidade de dados em sistemas de produção, mantendo a sobrecarga do processo de gravação baixa.
  * É mais adequado para registrar latências. Ele registra situações em que a aplicação não está sendo executada como esperado e fornece detalhes sobre os gargalos.
  * Ele fornece insights sobre como os programas interagem com o ambiente de execução como um todo, abrangendo hardware, sistemas operacionais, JVM, JDK e o ambiente da aplicação Java.

As gravações de voo podem ser iniciadas quando a aplicação é iniciada ou enquanto a aplicação está em execução. Os dados são registrados como pontos de dados com timestamp chamados eventos. Os eventos são categorizados da seguinte forma:

  * Eventos de duração: ocorrem em uma duração específica com tempo de início e tempo de parada específicos.
  * Eventos instantâneos: ocorrem instantaneamente e são registrados imediatamente, por exemplo, um thread é bloqueado.
  * Eventos de amostra: ocorrem em intervalos regulares para verificar a saúde geral do sistema, por exemplo, imprimindo diagnósticos de heap a cada minuto.
  * Eventos personalizados: eventos definidos pelo usuário criados usando JMC ou APIs.

Além disso, existem eventos predefinidos que são habilitados em um modelo de gravação. Alguns modelos salvam apenas eventos muito básicos e praticamente não têm impacto no desempenho. Outros modelos podem vir com uma ligeira sobrecarga de desempenho e também podem acionar garbage collections para coletar dados adicionais. Os seguintes modelos são fornecidos com o Flight Recorder no diretório `<JDK_ROOT>/lib/jfr`:

  * `default.jfc`: Coleta um conjunto predefinido de dados com baixa sobrecarga.
  * `profile.jfc`: Fornece mais dados do que o modelo `default.jfc`, mas com sobrecarga e impacto no desempenho.

O Flight Recorder produz os seguintes tipos de gravações:

  * Gravações de tempo fixo: Uma gravação de tempo fixo também é conhecida como gravação de perfil que é executada por um tempo definido e depois para. Geralmente, uma gravação de tempo fixo tem mais eventos habilitados e pode ter um efeito de desempenho ligeiramente maior. Os eventos que estão ativados podem ser modificados de acordo com seus requisitos. As gravações de tempo fixo serão automaticamente despejadas e abertas.

Os casos de uso típicos para uma gravação de tempo fixo são os seguintes:

    * Perfilar quais métodos são executados com mais frequência e onde a maioria dos objetos é criada.

    * Procurar classes que usam cada vez mais heap, o que indica um vazamento de memória.

    * Procurar gargalos devido à sincronização e muitos outros casos de uso semelhantes.

  * Gravações contínuas: Uma gravação contínua é uma gravação que está sempre ativa e salva, por exemplo, as últimas seis horas de dados. Durante esta gravação, o JFR coleta eventos e escreve dados para o buffer global. Quando o buffer global se enche, os dados mais antigos são descartados. Os dados atualmente no buffer são gravados no arquivo especificado sempre que você solicita um dump, ou se o dump é acionado por uma regra.

Uma gravação contínua com o modelo padrão tem baixa sobrecarga e coleta muitos dados úteis. No entanto, este modelo não coleta estatísticas de heap ou perfil de alocação.

#### Produzir uma Gravação de Voo

As seções a seguir descrevem diferentes maneiras de produzir uma gravação de voo.

  * [Iniciar uma Gravação de Voo](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [Usar Gatilhos para Gravações de Voo Automáticas](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [Usar Flags de Inicialização na Linha de Comando para Produzir uma Gravação de Voo](<#/doc/guides/troubleshoot/diagnostic-tools>)

##### Iniciar uma Gravação de Voo

Siga estas etapas para iniciar uma gravação de voo usando o JMC.

  1. Encontre sua JVM no JVM Browser.
  2. Clique com o botão direito na JVM e selecione Start Flight Recording...

A janela Start Flight Recording é aberta.

  3. Clique em Browse para encontrar um local e nome de arquivo adequados para salvar a gravação.
  4. Selecione Time fixed recording (gravação de perfil) ou Continuous recording. Para gravações contínuas, você pode especificar o tamanho máximo ou a idade máxima dos eventos que deseja salvar.
  5. Selecione o modelo de gravação de voo na lista suspensa Event settings. Os modelos definem os eventos que você deseja gravar. Para criar seus próprios modelos, clique em Template Manager. No entanto, para a maioria dos casos de uso, selecione o modelo Continuous (para gravações de baixíssima sobrecarga) ou o modelo Profiling (para mais dados e uma sobrecarga ligeiramente maior).
  6. Clique em Finish para iniciar a gravação ou clique em Next para modificar as opções de evento definidas no modelo selecionado.
  7. Modifique as opções de evento para a gravação de voo. As configurações padrão fornecem um bom equilíbrio entre dados e desempenho. Você pode alterar essas configurações com base em sua necessidade.

Por exemplo:

     * O valor Threshold é a duração da gravação do evento. Por padrão, eventos de sincronização acima de 10 ms são coletados. Isso significa que, se um thread esperar por um bloqueio por mais de 10 ms, um evento é salvo. Você pode diminuir esse valor para obter dados mais detalhados para contenções curtas.
     * A configuração Thread Dump oferece a opção de realizar thread dumps periódicos. Estes são thread dumps textuais normais.

  8. Clique em Finish para iniciar a gravação ou clique em Next para modificar os detalhes do evento definidos no modelo selecionado.
  9. Modifique os detalhes do evento para o modelo de gravação de voo selecionado. Os detalhes do evento definem se o evento deve ser incluído na gravação. Para alguns eventos, você também pode definir se um stack trace deve ser anexado ao evento, especificar o limite de duração (para eventos de duração) e um período de requisição (para eventos requisitáveis).
  10. Clique em Back se quiser modificar alguma das configurações definidas nas etapas anteriores ou clique em Finish para iniciar a gravação.

A nova gravação de voo aparece na Progress View.

Nota:

Expanda o nó no JVM Browser para visualizar as gravações em execução. Clique com o botão direito em qualquer uma das gravações para despejar, despejar tudo, despejar a última parte, editar, parar ou fechar a gravação. Parar uma gravação de perfil ainda produzirá um arquivo de gravação e fechar uma gravação de perfil descartará a gravação.

Nota:

Você pode configurar o JMC para iniciar automaticamente uma gravação de voo se uma condição for atendida usando a aba Triggers no console JMX. Para mais informações, consulte [Usar Gatilhos para Gravações de Voo Automáticas](<#/doc/guides/troubleshoot/diagnostic-tools>).

##### Usar Gatilhos para Gravações de Voo Automáticas

A aba Triggers permite definir e ativar regras que acionam eventos quando uma determinada condição é atendida. Por exemplo, você pode configurar o JDK Mission Control para iniciar automaticamente uma gravação de voo se uma condição for atendida. Isso é útil para rastrear problemas específicos de tempo de execução da JVM.

Isso é feito a partir do console JMX.

  1. Para iniciar o console JMX, encontre sua aplicação no JVM Browser, clique com o botão direito nela e selecione Start JMX Console.
  2. Clique na aba Triggers na parte inferior da tela.
  3. Clique em Add. Você pode escolher qualquer `MBean` na aplicação, incluindo os específicos da sua própria aplicação.

A caixa de diálogo Add New Rule é aberta.

  4. Selecione um atributo para o qual a regra deve ser acionada e clique em Next. Por exemplo, selecione java.lang > OperatingSystem > ProcessCpuLoad.
  5. Defina a condição na qual a regra deve ser acionada e clique em Next. Por exemplo, defina um valor para Maximum trigger value, Sustained period e Limit period.

Nota:

Você pode selecionar a caixa de seleção Trigger when condition is met ou Trigger when recovering from condition.

  6. Selecione qual ação você gostaria que sua regra executasse quando acionada e clique em Next. Por exemplo, escolha Start Time Limited Flight Recording e navegue até o destino do arquivo e o tempo de gravação. Selecione a caixa de seleção Open automatically, se desejar abrir a gravação de voo automaticamente quando ela for acionada.
  7. Selecione as restrições para sua regra e clique em Next. Por exemplo, selecione as datas, dias da semana ou hora do dia específicos em que a regra deve estar ativa.
  8. Digite um nome para sua regra e clique em Finish.

A regra é adicionada à lista My Rules.

Quando você seleciona sua regra na lista Trigger Rules, o painel Rule Details exibe seus componentes nas seguintes abas. Você pode editar as condições, atributos e restrições, se desejar:

  * Condition
  * Action
  * Constraint

##### Usar Flags de Inicialização na Linha de Comando para Produzir uma Gravação de Voo

Use flags de inicialização para iniciar a gravação quando a aplicação for iniciada. Se a aplicação já estiver em execução, use o utilitário `jcmd` para iniciar a gravação.

Use os seguintes métodos para gerar uma gravação de voo:

  * Gerar uma gravação de perfil quando uma aplicação é iniciada.

Você pode configurar uma gravação de tempo fixo no início da aplicação usando a opção `-XX:StartFlightRecording`. O exemplo a seguir mostra como executar a aplicação `MyApp` e iniciar uma gravação de 60 segundos 20 segundos após iniciar a JVM, que será salva em um arquivo chamado `myrecording.jfr`:

`java -XX:StartFlightRecording.delay=20s,duration=60s,name=myrecording,filename=myrecording.jfr,settings=profile MyApp`

O parâmetro `settings` recebe o nome de um modelo. Inclua o caminho se o modelo não estiver no diretório `java-home/lib/jfr`, que é o local dos modelos padrão. Os modelos padrão são: `profile`, que coleta mais dados e é principalmente para gravações de perfil, e `default`, que é uma configuração de baixa sobrecarga feita principalmente para gravações contínuas.

Para uma descrição completa das flags do Flight Recorder para o comando `java`, consulte [Advanced Runtime Options for Java](<#/>) nas Java Development Kit Tool Specifications.

  * Gerar uma gravação contínua quando uma aplicação é iniciada.

Você pode iniciar uma gravação contínua a partir da linha de comando usando a opção `-XX:StartFlightRecording`. A opção `-XX:FlightRecorderOptions` fornece configurações adicionais para gerenciar a gravação. Essas flags iniciam uma gravação contínua que pode ser despejada posteriormente, se necessário. O exemplo a seguir mostra como executar a aplicação `MyApp` com uma gravação contínua que salva 6 horas de dados em disco. Os dados temporários serão salvos na pasta `/tmp`.

`java -XX:StartFlightRecording.disk=true,maxage=6h,settings=default -XX:FlightRecorderOptions=repository=/tmp MyApp`

Nota:

Quando você realmente despeja a gravação, você especifica um novo local para o arquivo despejado, então os arquivos no repositório são apenas temporários.

  * Gerar uma gravação usando comandos de diagnóstico.

Para uma aplicação em execução, você pode gerar gravações usando comandos de diagnóstico de linha de comando Java. A maneira mais simples de executar um comando de diagnóstico é usar a ferramenta `jcmd` localizada no diretório `java-home/bin`. Para mais detalhes, consulte [O Utilitário jcmd](<#/doc/guides/troubleshoot/diagnostic-tools>).

O exemplo a seguir mostra como iniciar uma gravação para a aplicação `MyApp` com o ID de processo `5361`. 30 minutos de dados são gravados e escritos em `/usr/recording/myapp-recording1.jfr`.

`jcmd 5361 JFR.start duration=30m filename=/usr/recordings/myapp-recording1.jfr`

#### Analisar uma Gravação de Voo

As seções a seguir descrevem diferentes maneiras de analisar uma gravação de voo:

  * [Analisar uma Gravação de Voo Usando JMC](<#/doc/guides/troubleshoot/diagnostic-tools>)
  * [Analisar uma Gravação de Voo Usando a ferramenta jfr ou APIs JFR](<#/doc/guides/troubleshoot/diagnostic-tools>)

##### Analisar uma Gravação de Voo Usando JMC

Uma vez que o arquivo de gravação de voo é aberto no JMC, você pode examinar várias áreas diferentes como código, memória, threads, bloqueios e I/O e analisar vários aspectos do comportamento de tempo de execução de sua aplicação.

O arquivo de gravação é automaticamente aberto no JMC quando uma gravação cronometrada termina ou quando um dump de uma gravação em execução é criado. Você também pode abrir qualquer arquivo de gravação clicando duas vezes nele ou abrindo-o através do menu File. A gravação de voo é aberta na página Automated Analysis Results. Esta página ajuda você a diagnosticar problemas mais rapidamente. Por exemplo, se você estiver ajustando o garbage collection, ou rastreando problemas de alocação de memória, então você pode usar a visualização de memória para obter uma visão detalhada sobre eventos individuais de garbage collection, locais de alocação, pausas de garbage collection e assim por diante. Você pode visualizar o perfil de latência de sua aplicação olhando as visualizações de I/O e Threads, e até mesmo aprofundar-se em uma visualização que representa eventos individuais na gravação.

###### Visualizar a Página Automated Analysis Results

O Flight Recorder extrai e analisa os dados das gravações e, em seguida, exibe logs de relatório codificados por cores na página Automated Analysis Results.

Por padrão, os resultados com pontuações amarelas e vermelhas são exibidos para chamar sua atenção para problemas potenciais. Se você quiser ver todos os resultados no relatório, clique no botão Show OK Results (uma marca de seleção) no canto superior direito da página. Da mesma forma, para visualizar os resultados como uma tabela, clique no botão Table.

Os benchmarks são divididos principalmente em problemas relacionados ao seguinte:

  * [Java Application](<#/doc/guides/troubleshoot/diagnostic-tools>)
  * [JVM Internals](<#/doc/guides/troubleshoot/diagnostic-tools>)
  * [Environment](<#/doc/guides/troubleshoot/diagnostic-tools>)

Clicar em um cabeçalho no relatório, por exemplo, Java Application, exibe uma página correspondente.

Nota:

Você pode selecionar uma entrada respectiva na Outline view para navegar entre as páginas da análise automatizada.

###### Analisar a Java Application

O painel Java Application exibe a saúde geral da aplicação Java.

Concentre-se nos parâmetros com pontuações amarelas e vermelhas. O painel fornece referências exatas às situações problemáticas. Navegue até a página específica para analisar os dados e corrigir o problema.

###### Threads

A página Threads fornece um instantâneo de todos os threads que pertencem à aplicação Java. Ela revela informações sobre a atividade de threads de uma aplicação que podem ajudar a diagnosticar problemas e otimizar o desempenho da aplicação e da JVM.

Os threads são representados em uma tabela e cada linha tem um gráfico associado. Os gráficos podem ajudar você a identificar os padrões de execução problemáticos. O estado de cada thread é apresentado como um Stack Trace, que fornece informações contextuais de onde você pode visualizar instantaneamente a área do problema. Por exemplo, você pode localizar facilmente a ocorrência de um deadlock.

Lock Instances

Lock instances fornece mais detalhes sobre threads, especificando as informações de bloqueio, ou seja, se o thread está tentando adquirir um bloqueio ou esperando por uma notificação em um bloqueio. Se um thread adquiriu algum bloqueio, os detalhes são mostrados no stack trace.

###### Memory

Uma maneira de detectar problemas de desempenho da aplicação é ver como ela usa a memória durante o tempo de execução.

Na página Memory, o gráfico representa o uso da memória heap da aplicação Java. Cada ciclo consiste em uma fase de crescimento do heap Java que representa o período de alocações de memória heap, seguida por uma queda curta que representa o garbage collection, e então o ciclo recomeça. A inferência importante do gráfico é que as alocações de memória são de curta duração, pois o garbage collector empurra o heap para a posição inicial em cada ciclo.

Selecione a caixa de seleção Garbage Collection para ver o tempo de pausa do garbage collection no gráfico. Isso indica que o garbage collector parou a aplicação durante o tempo de pausa para fazer seu trabalho. Tempos de pausa longos levam a um desempenho ruim da aplicação, o que precisa ser abordado.

Selecione a caixa de seleção Alloc Total para ver quanta memória é alocada por segundo. Você também pode visualizar isso como um valor percentual na coluna Total Allocation (%).

###### Method Profiling

A página Method Profiling permite que você veja com que frequência um método específico é executado e quanto tempo leva para executá-lo. Os gargalos são determinados identificando os métodos que levam muito tempo para serem executados.

Como o perfil gera muitos dados, ele não é ativado por padrão. Inicie uma nova gravação e selecione Profiling - on server no menu suspenso Event settings. Faça uma gravação de tempo fixo por uma curta duração. O JFR despeja a gravação no nome de arquivo especificado. Abra a página Method Profiling no JMC para ver as principais alocações. Os principais pacotes e classes são exibidos. Verifique os detalhes no stack trace. Inspecione o código para verificar se a alocação de memória está concentrada em um objeto específico. O JFR aponta para o número da linha específica onde o problema persiste.

###### JVM Internals

A página JVM Internals fornece informações detalhadas sobre a JVM e seu comportamento.

Um dos parâmetros mais importantes a serem observados é Garbage Collections. Garbage collection é um processo de exclusão de objetos não utilizados para que o espaço possa ser usado para alocação de novos objetos. A página Garbage Collections ajuda você a entender melhor o comportamento do sistema e o desempenho do garbage collection durante o tempo de execução.

Os gráficos mostram o uso do heap em comparação com os tempos de pausa e como ele varia durante o período especificado. A página também lista todos os eventos de garbage collection que ocorreram durante a gravação. Observe os tempos de pausa mais longos em relação ao heap. O tempo de pausa indica que os garbage collections estão demorando mais durante o processamento da aplicação. Isso implica que os garbage collections estão liberando menos espaço no heap. Essa situação pode levar a vazamentos de memória.
Para uma gestão de memória eficaz, consulte a página Compilations, que fornece detalhes sobre a compilação de código juntamente com a duração. Em aplicações grandes, você pode ter muitos métodos compilados, e a memória pode ser esgotada, resultando em problemas de desempenho.

A página TLAB Allocations fornece informações sobre todas as alocações de objetos. Ela fornece informações sobre Allocations in TLAB e Allocations outside TLAB. A aba Allocation oferece três tipos de visualização, específicas para os eventos TLAB: Allocation by Class (quais instâncias de classe estão sendo alocadas), Allocation by Thread (quais threads alocam a maioria dos objetos) e Allocation Profile (árvore de stack trace agregada de todos os eventos).

Uma nova aba By Top Methods é adicionada à página TLAB Allocations (Thread Local Allocation Buffers), além da aba By Threads existente, para classificar os Item Histograms em relação aos Top Methods. Ambas as abas agora possuem as colunas Alloc in TLABs (%) e Alloc Outside TLABs (%), que fornecem o tamanho estimado da alocação de TLAB como porcentagem. Essas atualizações facilitarão a visualização de áreas relevantes de pressão de alocação.

###### Environment

A página Environment fornece informações sobre o ambiente em que a gravação foi feita. Ela ajuda a entender o uso da CPU, a memória e o sistema operacional que está sendo usado.

Consulte a página Processes para entender os processos concorrentes em execução e o uso competitivo da CPU desses processos. O desempenho da aplicação será afetado se muitos processos usarem CPU e outros recursos do sistema.

Verifique a página Event Browser para ver as estatísticas de todos os tipos de evento. Ela ajuda você a focar nos gargalos e tomar as ações apropriadas para melhorar o desempenho da aplicação.

Você pode criar Custom Pages usando a página Event Browser. Selecione o tipo de evento desejado na Event Type Tree e clique no botão Create a new page using the select event type no canto superior direito da página. A página personalizada é listada como uma nova página de evento abaixo da página do navegador de eventos.

##### Analyze a Flight Recording Using the jfr tool or JFR APIs

Para acessar as informações em uma gravação do Flight Recorder, use a ferramenta `jfr` para imprimir informações de eventos, ou use a API Flight Recorder para processar os dados programaticamente.

O Flight Recorder fornece os seguintes métodos para revisar as informações que foram gravadas:

  * ferramenta `jfr` - Use esta ferramenta de linha de comando para imprimir dados de eventos de uma gravação. A ferramenta está localizada no diretório `java-home/bin`. Para detalhes sobre esta ferramenta, consulte [O Comando jfr](<#/>) nas Especificações da Ferramenta do Java Development Kit.

  * API Flight Recorder - Use a API [jdk.jfr.consumer](<https://docs.oracle.com/en/java/javase/24/docs/api/jdk.jfr/jdk/jfr/consumer/package-summary.html>) para extrair e formatar as informações em uma gravação. Para mais informações, consulte o Guia do Programador da API Flight Recorder.

Os eventos em uma gravação podem ser usados para investigar as seguintes áreas:

  * Informações gerais
    * Número de eventos registrados em cada carimbo de data/hora

    * Uso máximo da heap

    * Uso da CPU ao longo do tempo, uso da CPU da aplicação e uso total da CPU

Fique atento a picos de uso da CPU próximos a 100 por cento ou se o uso da CPU for muito baixo ou pausas muito longas do garbage collection.

    * Tempo de pausa do GC

    * Informações da JVM e propriedades do sistema definidas

  * Memória
    * Uso da memória ao longo do tempo

Tipicamente, objetos temporários são alocados o tempo todo. Quando uma condição é atendida, um Garbage Collection (GC) é acionado e todos os objetos não mais usados são removidos. Portanto, o uso da heap aumenta constantemente até que um GC seja acionado, então ele cai repentinamente. Fique atento a um tamanho de heap que aumenta constantemente ao longo do tempo, o que pode indicar um vazamento de memória.

    * Informações sobre garbage collections, incluindo o tempo gasto neles

    * Alocações de memória realizadas

Quanto mais objetos temporários a aplicação aloca, mais a aplicação deve realizar garbage collection. A revisão das alocações de memória ajuda você a encontrar as maiores alocações e reduzir a pressão do GC em sua aplicação.

    * Classes que possuem o maior conjunto ativo

Observe como cada tipo de objeto aumenta de tamanho durante um flight recording. Um tipo de objeto específico que aumenta muito de tamanho indica um vazamento de memória; no entanto, uma pequena variação é normal. Especialmente, investigue os maiores crescimentos de classes Java não padrão.

  * Código
    * Pacotes e classes que usaram mais tempo de execução

Observe de onde os métodos estão sendo chamados para identificar gargalos em sua aplicação.

    * Exceções lançadas

    * Métodos compilados ao longo do tempo enquanto a aplicação estava em execução

    * Número de classes carregadas, classes carregadas reais e classes descarregadas ao longo do tempo

  * Threads
    * Uso da CPU e o número de threads ao longo do tempo

    * Threads que realizam a maior parte da execução do código

    * Objetos mais aguardados devido à sincronização

  * E/S
    * Informações sobre leituras de arquivo, escritas de arquivo, leituras de socket e escritas de socket

  * Sistema
    * Informações sobre a CPU, memória e SO da máquina que executa a aplicação

    * Variáveis de ambiente e quaisquer outros processos em execução ao mesmo tempo que a JVM

  * Eventos
    * Todos os eventos na gravação

### O Utilitário jcmd

O utilitário `jcmd` é usado para enviar solicitações de comando de diagnóstico para a JVM. Essas solicitações são úteis para gerenciar gravações do Flight Recorder, solução de problemas e diagnóstico de aplicações JVM e Java.

`jcmd` deve ser usado na mesma máquina onde a JVM está em execução, e ter os mesmos identificadores de usuário e grupo efetivos que foram usados para iniciar a JVM.

Um comando especial `jcmd <process id/main class> PerfCounter.print` imprime todos os contadores de desempenho no processo.

O comando `jcmd <process id/main class> <command> [options]` envia o comando para a JVM.

O exemplo a seguir mostra solicitações de comando de diagnóstico para a JVM usando o utilitário `jcmd`.
```
    > jcmd
    5485 jdk.jcmd/sun.tools.jcmd.JCmd
    2125 MyProgram
     
    > jcmd MyProgram (or "jcmd 2125")
    2125:
    The following commands are available:
    Compiler.CodeHeap_Analytics
    Compiler.codecache
    Compiler.codelist
    Compiler.directives_add
    Compiler.directives_clear
    Compiler.directives_print
    Compiler.directives_remove
    Compiler.queue
    GC.class_histogram
    GC.class_stats
    GC.finalizer_info
    GC.heap_dump
    GC.heap_info
    GC.run
    GC.run_finalization
    JFR.check
    JFR.configure
    JFR.dump
    JFR.start
    JFR.stop
    JVMTI.agent_load
    JVMTI.data_dump
    ManagementAgent.start
    ManagementAgent.start_local
    ManagementAgent.status
    ManagementAgent.stop
    Thread.print
    VM.class_hierarchy
    VM.classloader_stats
    VM.classloaders
    VM.command_line
    VM.dynlibs
    VM.events
    VM.flags
    VM.info
    VM.log
    VM.metaspace
    VM.native_memory
    VM.print_touched_methods
    VM.set_flag
    VM.stringtable
    VM.symboltable
    VM.system_properties
    VM.systemdictionary
    VM.uptime
    VM.version
    help
    
    For more information about a specific command use 'help <command>'.
    
    > jcmd MyProgram help Thread.print
    2125:
    Thread.print
    Print all threads with stacktraces.
     
    Impact: Medium: Depends on the number of threads.
     
    Permission: java.lang.management.ManagementPermission(monitor)
     
    Syntax : Thread.print [options]
     
    Options: (options must be specified using the <key> or <key>=<value> syntax)
            -l : [optional] print java.util.concurrent locks (BOOLEAN, false)
            -e : [optional] print extended thread information (BOOLEAN, false)
     
    > jcmd MyProgram Thread.print
    2125:
    2020-01-21 17:05:10
    Full thread dump Java HotSpot(TM) 64-Bit Server VM (14-ea+29-1384 mixed mode):
    ...
```

As seções a seguir descrevem alguns comandos úteis e técnicas de solução de problemas com o utilitário `jcmd`:

  * [Comandos Úteis para o Utilitário jcmd](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [Solução de Problemas com o Utilitário jcmd](<#/doc/guides/troubleshoot/diagnostic-tools>)

#### Comandos Úteis para o Utilitário jcmd

Os comandos de diagnóstico disponíveis dependem da JVM em uso. Use `jcmd <process id/main class> help` para ver todas as opções disponíveis.

A seguir estão alguns dos comandos mais úteis da ferramenta `jcmd`:

  * Imprime o ID completo da versão do HotSpot e do JDK.

`jcmd <process id/main class> VM.version`

  * Imprime todas as propriedades do sistema definidas para uma VM.

Pode haver várias centenas de linhas de informação exibidas.

`jcmd <process id/main class> VM.system_properties`

  * Imprime todas as flags usadas para uma VM.

Mesmo que você não tenha fornecido nenhuma flag, alguns dos valores padrão serão impressos, por exemplo, o tamanho inicial e máximo da heap.

`jcmd <process id/main class> VM.flags`

  * Imprime o tempo de atividade em segundos.

`jcmd <process id/main class> VM.uptime`

  * Cria um histograma de classes.

Os resultados podem ser bastante detalhados, então você pode redirecionar a saída para um arquivo. Classes internas e específicas da aplicação são incluídas na lista. As classes que ocupam mais memória são listadas no topo, e as classes são listadas em ordem decrescente.

`jcmd <process id/main class> GC.class_histogram`

  * Cria um heap dump.

`jcmd GC.heap_dump filename=Myheapdump`

Isso é o mesmo que usar `jmap -dump:file=<file> <pid>`, mas `jcmd` é a ferramenta recomendada para usar.

  * Cria um histograma de heap.

`jcmd <process id/main class> GC.class_histogram filename=Myheaphistogram`

Isso é o mesmo que usar `jmap -histo <pid>`, mas `jcmd` é a ferramenta recomendada para usar.

  * Imprime todas as threads com stack traces.

`jcmd <process id/main class> Thread.print`

#### Solução de Problemas com o Utilitário jcmd

Use o `jcmd` para enviar solicitações de comando de diagnóstico para uma Java Virtual Machine (JVM) ou aplicação Java em execução.

O utilitário `jcmd` fornece as seguintes opções de solução de problemas:

  * Inicia a gravação com Flight Recorder.

Por exemplo, para iniciar uma gravação de 2 minutos no processo Java em execução com o identificador `7060` e salvá-la em `C:\TEMP\myrecording.jfr`, use o seguinte:

`jcmd 7060 JFR.start name=MyRecording settings=profile delay=20s duration=2m filename=C:\TEMP\myrecording.jfr`

  * Verifica uma gravação.

O comando de diagnóstico `JFR.check` verifica uma gravação em execução. Por exemplo:

`jcmd 7060 JFR.check`

  * Para uma gravação.

O comando de diagnóstico `JFR.stop` para uma gravação em execução e tem a opção de descartar os dados da gravação. Por exemplo:

`jcmd 7060 JFR.stop`

  * Despeja uma gravação.

O comando de diagnóstico `JFR.dump` para uma gravação em execução e tem a opção de despejar gravações para um arquivo. Por exemplo:

`jcmd 7060 JFR.dump name=MyRecording filename=C:\TEMP\myrecording.jfr`

  * Cria um heap dump.

A maneira preferida de criar um heap dump é

`jcmd <pid> GC.heap_dump filename=Myheapdump`

  * Cria um histograma de heap.

A maneira preferida de criar um histograma de heap é

`jcmd <pid> GC.class_histogram filename=Myheaphistogram`

### Native Memory Tracking

O Native Memory Tracking (NMT) é um recurso da Java HotSpot VM que rastreia o uso interno de memória para uma Java HotSpot VM.

Como o NMT não rastreia alocações de memória por código não-JVM, você pode ter que usar ferramentas suportadas pelo sistema operacional para detectar vazamentos de memória em código nativo.

As seções a seguir descrevem como monitorar alocações de memória internas da VM e diagnosticar vazamentos de memória da VM.

  * [Como Monitorar a Memória Interna da VM](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [Usar NMT para Detectar um Vazamento de Memória](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [Categorias de Memória NMT](<#/doc/guides/troubleshoot/diagnostic-tools>)

#### Como Monitorar a Memória Interna da VM

O Native Memory Tracking pode ser configurado para monitorar a memória e garantir que uma aplicação não comece a usar quantidades crescentes de memória durante o desenvolvimento ou manutenção.

Consulte a [Tabela 2-1](<#/doc/guides/troubleshoot/diagnostic-tools>) para detalhes sobre as categorias de memória NMT.

As seções a seguir descrevem como obter dados de resumo ou detalhe para NMT e descrevem como interpretar a saída de exemplo.

  * Interpretar a saída de exemplo: Na saída de exemplo a seguir, você verá a memória reservada e comprometida. Observe que apenas a memória comprometida é realmente usada. Por exemplo, se você executar com `-Xms100m -Xmx1000m`, a JVM reservará 1000 MB para a heap Java. Como o tamanho inicial da heap é de apenas 100 MB, apenas 100 MB serão comprometidos inicialmente. Para uma máquina de 64 bits onde o espaço de endereço é quase ilimitado, não há problema se uma JVM reservar muita memória. O problema surge se mais e mais memória for comprometida, o que pode levar a trocas de memória (swapping) ou situações de falta de memória nativa (OOM).

Uma arena é um bloco de memória alocado usando `malloc`. A memória é liberada desses blocos em massa, ao sair de um escopo ou deixar uma área de código. Esses blocos podem ser reutilizados em outros subsistemas para armazenar memória temporária, por exemplo, alocações pré-thread. Uma política `malloc` de arena garante que não haja vazamento de memória. Assim, a arena é rastreada como um todo e não objetos individuais. Alguma memória inicial não pode ser rastreada.

Habilitar o NMT resultará em uma queda de desempenho da JVM de 5-10 por cento, e o uso de memória para NMT adiciona 2 palavras de máquina a toda a memória `malloc` como um cabeçalho `malloc`. O uso de memória do NMT também é rastreado pelo NMT.
```
>jcmd 17320 VM.native_memory
        Native Memory Tracking:
        
        Total: reserved=5699702KB, committed=351098KB
        -                 Java Heap (reserved=4153344KB, committed=260096KB)
                                    (mmap: reserved=4153344KB, committed=260096KB)
        
        -                     Class (reserved=1069839KB, committed=22543KB)
                                    (classes #3554)
                                    (  instance classes #3294, array classes #260)
                                    (malloc=783KB #7965)
                                    (mmap: reserved=1069056KB, committed=21760KB)
                                    (  Metadata:   )
                                    (    reserved=20480KB, committed=18944KB)
                                    (    used=18267KB)
                                    (    free=677KB)
                                    (    waste=0KB =0.00%)
                                    (  Class space:)
                                    (    reserved=1048576KB, committed=2816KB)
                                    (    used=2454KB)
                                    (    free=362KB)
                                    (    waste=0KB =0.00%)
        
        -                    Thread (reserved=24685KB, committed=1205KB)
                                    (thread #24)
                                    (stack: reserved=24576KB, committed=1096KB)
                                    (malloc=78KB #132)
                                    (arena=30KB #46)
        
        -                      Code (reserved=248022KB, committed=7890KB)
                                    (malloc=278KB #1887)
                                    (mmap: reserved=247744KB, committed=7612KB)
        
        -                        GC (reserved=197237KB, committed=52789KB)
                                    (malloc=9717KB #2877)
                                    (mmap: reserved=187520KB, committed=43072KB)
        
        -                  Compiler (reserved=148KB, committed=148KB)
                                    (malloc=19KB #95)
                                    (arena=129KB #5)
        
        -                  Internal (reserved=735KB, committed=735KB)
                                    (malloc=663KB #1914)
                                    (mmap: reserved=72KB, committed=72KB)
        
        -                     Other (reserved=48KB, committed=48KB)
                                    (malloc=48KB #4)
        
        -                    Symbol (reserved=4835KB, committed=4835KB)
                                    (malloc=2749KB #17135)
                                    (arena=2086KB #1)
        
        -    Native Memory Tracking (reserved=539KB, committed=539KB)
                                    (malloc=8KB #109)
                                    (tracking overhead=530KB)
        
        -               Arena Chunk (reserved=187KB, committed=187KB)
                                    (malloc=187KB)
        
        -                   Logging (reserved=4KB, committed=4KB)
                                    (malloc=4KB #179)
        
        -                 Arguments (reserved=18KB, committed=18KB)
                                    (malloc=18KB #467)
        
        -                    Module (reserved=62KB, committed=62KB)
                                    (malloc=62KB #1060)
```

  * Obter dados detalhados: Para obter uma visão mais detalhada do uso de memória nativa, inicie a JVM com a opção de linha de comando: `-XX:NativeMemoryTracking=detail`. Isso rastreará exatamente quais métodos alocam mais memória. Habilitar o NMT resultará em uma queda de desempenho da JVM de 5-10 por cento e o uso de memória para NMT adiciona 2 palavras a toda a memória `malloc` como um cabeçalho `malloc`. O uso de memória do NMT também é rastreado pelo NMT.

O exemplo a seguir mostra a saída de exemplo para memória virtual para o nível de rastreamento definido como detalhe, que é mostrado além da saída de resumo acima. Uma maneira de obter esta saída de exemplo é executar: `jcmd <pid> VM.native_memory detail`.
```
Virtual memory map:
        
        [0x00000000a1000000 - 0x0000000800000000] reserved 30916608KB for Java Heap from
            [0x00007f5b91a2472b] ReservedHeapSpace::try_reserve_heap(unsigned long, unsigned long, bool, char*)+0x20b
            [0x00007f5b91a24de9] ReservedHeapSpace::initialize_compressed_heap(unsigned long, unsigned long, bool)+0x5a9
            [0x00007f5b91a254c6] ReservedHeapSpace::ReservedHeapSpace(unsigned long, unsigned long, bool, char const*)+0x176
            [0x00007f5b919da835] Universe::reserve_heap(unsigned long, unsigned long)+0x65
        
                       [0x00000000a1000000 - 0x0000000117000000] committed 1933312KB from
                    [0x00007f5b9132c9be] G1PageBasedVirtualSpace::commit(unsigned long, unsigned long)+0x18e
                    [0x00007f5b913414d1] G1RegionsLargerThanCommitSizeMapper::commit_regions(unsigned int, unsigned long, WorkGang*)+0x1a1
                    [0x00007f5b913d5c78] HeapRegionManager::commit_regions(unsigned int, unsigned long, WorkGang*)+0x58
                    [0x00007f5b913d6c45] HeapRegionManager::expand(unsigned int, unsigned int, WorkGang*)+0x35
        
                       [0x00000007fe000000 - 0x00000007fef00000] committed 15360KB from
                    [0x00007f5b9132c9be] G1PageBasedVirtualSpace::commit(unsigned long, unsigned long)+0x18e
                    [0x00007f5b913414d1] G1RegionsLargerThanCommitSizeMapper::commit_regions(unsigned int, unsigned long, WorkGang*)+0x1a1
                    [0x00007f5b913d5c78] HeapRegionManager::commit_regions(unsigned int, unsigned long, WorkGang*)+0x58
                    [0x00007f5b913d7355] HeapRegionManager::expand_exact(unsigned int, unsigned int, WorkGang*)+0xd5
        
```

  * Obter diferença da linha de base NMT: Para rastreamento de nível de resumo e detalhe, você pode definir uma linha de base depois que a aplicação estiver em execução. Faça isso executando `jcmd <pid> VM.native_memory baseline` depois que a aplicação aquecer. Em seguida, você pode executar `jcmd <pid> VM.native_memory summary.diff` ou `jcmd <pid> VM.native_memory detail.diff`.

O exemplo a seguir mostra a saída de exemplo para a diferença de resumo no uso de memória nativa desde que a linha de base foi definida, e isso nos mostra as mudanças no uso de memória por categoria:
```
Native Memory Tracking:
        
        Total: reserved=33485260KB +28KB, committed=497784KB +96KB
        
        -                 Java Heap (reserved=30916608KB, committed=393216KB)
                                    (mmap: reserved=30916608KB, committed=393216KB)
         
        -                     Class (reserved=1048702KB, committed=254KB)
                                    (classes #507)
                                    (  instance classes #421, array classes #86)
                                    (malloc=126KB #635)
                                    (mmap: reserved=1048576KB, committed=128KB)
                                    (  Metadata:   )
                                    (    reserved=8192KB, committed=192KB)
                                    (    used=118KB)
                                    (    free=74KB)
                                    (    waste=0KB =0.00%)
                                    (  Class space:)
                                    (    reserved=1048576KB, committed=128KB)
                                    (    used=5KB)
                                    (    free=123KB)
                                    (    waste=0KB =0.00%)
         
        -                    Thread (reserved=35984KB, committed=1432KB +68KB)
                                    (thread #0)
                                    (stack: reserved=35896KB, committed=1344KB +68KB)
                                    (malloc=49KB #212)
                                    (arena=39KB #68)
         
        -                      Code (reserved=247729KB, committed=7593KB)
                                    (malloc=45KB #438)
                                    (mmap: reserved=247684KB, committed=7548KB)
         
        -                        GC (reserved=1209971KB, committed=77267KB)
                                    (malloc=29183KB #872)
                                    (mmap: reserved=1180788KB, committed=48084KB)
         
        -                  Compiler (reserved=168KB, committed=168KB)
                                    (malloc=3KB #34)
                                    (arena=165KB #5)
        
```

O exemplo a seguir é uma saída de exemplo que mostra a diferença detalhada no uso de memória nativa desde a linha de base, e é uma ótima maneira de encontrar vazamentos de memória específicos:
```
[0x00007f5b9175ea8b] MemBaseline::aggregate_virtual_memory_allocation_sites()+0x11b
        [0x00007f5b9175ed68] MemBaseline::baseline_allocation_sites()+0x188
        [0x00007f5b9175efff] MemBaseline::baseline(bool)+0x1cf
        [0x00007f5b917d19a4] NMTDCmd::execute(DCmdSource, Thread*)+0x2b4
                                     (malloc=1KB type=Native Memory Tracking +1KB #18 +18)
        
        [0x00007f5b917635b0] MallocAllocationSiteWalker::do_malloc_site(MallocSite const*)+0x40
        [0x00007f5b91740bc8] MallocSiteTable::walk_malloc_site(MallocSiteWalker*)+0x78
        [0x00007f5b9175ec32] MemBaseline::baseline_allocation_sites()+0x52
        [0x00007f5b9175efff] MemBaseline::baseline(bool)+0x1cf
                                     (malloc=11KB type=Native Memory Tracking +10KB #156 +136)
        
        [0x00007f5b91a2472b] ReservedHeapSpace::try_reserve_heap(unsigned long, unsigned long, bool, char*)+0x20b
        [0x00007f5b91a24de9] ReservedHeapSpace::initialize_compressed_heap(unsigned long, unsigned long, bool)+0x5a9
        [0x00007f5b91a254c6] ReservedHeapSpace::ReservedHeapSpace(unsigned long, unsigned long, bool, char const*)+0x176
        [0x00007f5b919da835] Universe::reserve_heap(unsigned long, unsigned long)+0x65
                                     (mmap: reserved=30916608KB, committed=475136KB +81920KB Type=Java Heap)
        
        [0x00007f5b91804557] thread_native_entry(Thread*)+0xe7
                                     (mmap: reserved=34868KB, committed=1224KB +68KB Type=Thread Stack)
        
        [0x00007f5b91a23c63] ReservedSpace::ReservedSpace(unsigned long, unsigned long)+0x213
        [0x00007f5b912df57c] G1CollectedHeap::create_aux_memory_mapper(char const*, unsigned long, unsigned long)+0x3c
        [0x00007f5b912e4f13] G1CollectedHeap::initialize()+0x333
        [0x00007f5b919da5dd] universe_init()+0xbd
                                     (mmap: reserved=483072KB, committed=7424KB +1280KB Type=GC)
        
        [0x00007f5b91a23c63] ReservedSpace::ReservedSpace(unsigned long, unsigned long)+0x213
        [0x00007f5b912df57c] G1CollectedHeap::create_aux_memory_mapper(char const*, unsigned long, unsigned long)+0x3c
        [0x00007f5b912e4e6a] G1CollectedHeap::initialize()+0x28a
        [0x00007f5b919da5dd] universe_init()+0xbd
                                     (mmap: reserved=60384KB, committed=928KB +160KB Type=GC)
```

#### Usar NMT para Detectar um Vazamento de Memória

Procedimento para usar o Native Memory Tracking para detectar vazamentos de memória.

Siga estes passos para detectar um vazamento de memória:

  1. Inicie a JVM com rastreamento de resumo ou detalhe usando a opção de linha de comando: `-XX:NativeMemoryTracking=summary` ou `-XX:NativeMemoryTracking=detail`.
  2. Estabeleça uma linha de base inicial. Use o recurso de linha de base NMT para obter uma linha de base para comparar durante o desenvolvimento e manutenção, executando: `jcmd <pid> VM.native_memory baseline`.
  3. Monitore as mudanças de memória usando: `jcmd <pid> VM.native_memory detail.diff`.
  4. Se a aplicação vazar uma pequena quantidade de memória, pode demorar um pouco para aparecer.

#### Categorias de Memória NMT

Lista de categorias de memória de rastreamento de memória nativa usadas pelo NMT.

A [Tabela 2-1](<#/doc/guides/troubleshoot/diagnostic-tools>) descreve as categorias de memória nativa usadas pelo NMT. Essas categorias podem mudar com uma versão.

Tabela 2-1 Categorias de Memória do Native Memory Tracking

Categoria | Descrição
---|---
Java Heap | A heap onde seus objetos residem
Class | Metadados de classe
Thread | Memória usada por threads, incluindo estrutura de dados de thread, área de recursos, área de handle, e assim por diante
Code | Código gerado
GC | Dados usados pelo GC, como a tabela de cartões, exceto os conjuntos lembrados
GCCardSet | Dados usados pelos conjuntos lembrados do GC (opcional, apenas G1)
Compiler | Rastreamento de memória usado pelo compilador ao gerar código
Internal | Memória que não se encaixa nas categorias anteriores, como a memória usada pelo analisador de linha de comando, JVMTI, propriedades, e assim por diante
Other | Memória não coberta por outra categoria
Symbol | Memória para símbolos
Native Memory Tracking | Memória usada pelo NMT
Arena Chunk | Memória usada por blocos no pool de blocos da arena
Logging | Memória usada por logging
Arguments | Memória para argumentos
Module | Memória usada por módulos

### JConsole

Outra ferramenta útil incluída no download do JDK é a ferramenta de monitoramento `JConsole`. Esta ferramenta é compatível com JMX. A ferramenta usa a instrumentação JMX integrada na JVM para fornecer informações sobre o desempenho e o consumo de recursos de aplicações em execução.

A ferramenta `JConsole` pode se conectar a qualquer aplicação Java para exibir informações úteis, como uso de threads, consumo de memória e detalhes sobre carregamento de classes, compilação em tempo de execução e o sistema operacional.

Esta saída ajuda no diagnóstico de alto nível de problemas como vazamentos de memória, carregamento excessivo de classes e threads em execução. Também pode ser útil para ajuste e dimensionamento da heap.

Além do monitoramento, o `JConsole` pode ser usado para alterar dinamicamente vários parâmetros no sistema em execução. Por exemplo, a configuração da opção `-verbose:gc` pode ser alterada para que a saída de rastreamento do garbage collection possa ser habilitada ou desabilitada dinamicamente para uma aplicação em execução.

As seções a seguir descrevem técnicas de solução de problemas com a ferramenta JConsole.

  * [Solução de Problemas com a Ferramenta JConsole](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [Monitorar Aplicações Locais e Remotas com JConsole](<#/doc/guides/troubleshoot/diagnostic-tools>)

#### Solução de Problemas com a Ferramenta JConsole

Use a ferramenta `JConsole` para monitorar dados.

A lista a seguir fornece uma ideia dos dados que podem ser monitorados usando a ferramenta `JConsole`. Cada título corresponde a um painel de abas na ferramenta.

  * Visão Geral

Este painel exibe gráficos que mostram o uso da memória heap, o número de threads, o número de classes e o uso da CPU ao longo do tempo. Esta visão geral permite visualizar a atividade de vários recursos ao mesmo tempo.

  * Memória

    * Para uma área de memória selecionada (heap, non-heap, vários pools de memória):

      * Gráfico mostrando o uso da memória ao longo do tempo

      * Tamanho atual da memória

      * Quantidade de memória comprometida

      * Tamanho máximo da memória

    * Informações do garbage collector, incluindo o número de coletas realizadas e o tempo total gasto realizando garbage collection

    * Gráfico mostrando a porcentagem de memória heap e non-heap atualmente usada

Além disso, neste painel você pode solicitar que o garbage collection seja realizado.

  * Threads

    * Gráfico mostrando o uso de threads ao longo do tempo.

    * Threads ativas: Número atual de threads ativas.

    * Pico: Maior número de threads ativas desde que a JVM foi iniciada.

    * Para uma thread selecionada, o nome, estado e stack trace, bem como, para uma thread bloqueada, o sincronizador que a thread está esperando para adquirir e a thread que possui o lock.

    * O botão Deadlock Detection envia uma solicitação para a aplicação alvo realizar detecção de deadlock e exibe cada ciclo de deadlock em uma aba separada.

  * Classes

    * Gráfico mostrando o número de classes carregadas ao longo do tempo

    * Número de classes atualmente carregadas na memória

    * Número total de classes carregadas na memória desde que a JVM foi iniciada, incluindo aquelas subsequentemente descarregadas

    * Número total de classes descarregadas da memória desde que a JVM foi iniciada

  * Resumo da VM

    * Informações gerais, como os dados de conexão do `JConsole`, tempo de atividade da JVM, tempo de CPU consumido pela JVM, nome do compilador, tempo total de compilação, e assim por diante.

    * Informações de resumo de threads e classes

    * Informações de memória e garbage collection, incluindo o número de objetos pendentes de finalização, e assim por diante

    * Informações sobre o sistema operacional, incluindo características físicas, a quantidade de memória virtual para o processo em execução e espaço de troca

    * Informações sobre a própria JVM, como os argumentos e class path

  * MBeans

Este painel exibe uma estrutura em árvore que mostra todos os MBeans de plataforma e aplicação que estão registrados no agente JMX conectado. Quando você seleciona um MBean na árvore, seus atributos, operações, notificações e outras informações são exibidos.

    * Você pode invocar operações, se houver. Por exemplo, a operação `dumpHeap` para o `HotSpotDiagnostic` MBean, que está no domínio `com.sun.management`, realiza um heap dump. O parâmetro de entrada para esta operação é o nome do caminho do arquivo de heap dump na máquina onde a VM alvo está em execução.

    * Você pode definir o valor de atributos graváveis. Por exemplo, você pode definir, desdefinir ou alterar o valor de certas flags da VM invocando a operação `setVMOption` do `HotSpotDiagnostic` MBean. As flags são indicadas pela lista de valores do atributo `DiagnosticOptions`.

    * Você pode assinar notificações, se houver, usando os botões Subscribe e Unsubscribe.

#### Monitorar Aplicações Locais e Remotas com JConsole

O JConsole pode monitorar tanto aplicações locais quanto remotas. Se você iniciar a ferramenta com um argumento especificando um agente JMX para conectar, a ferramenta começará automaticamente a monitorar a aplicação especificada.

Para monitorar uma aplicação local, execute o comando `jconsolepid`, onde `pid` é o ID do processo da aplicação.
Para monitorar uma aplicação remota, execute o comando `jconsolehostname:` portnumber, onde `hostname` é o nome do host executando a aplicação, e `portnumber` é o número da porta que você especificou ao habilitar o JMX agent.

Se você executar o comando `jconsole` sem argumentos, a ferramenta iniciará exibindo a janela Nova Conexão, onde você especifica o processo local ou remoto a ser monitorado. Você pode se conectar a um host diferente a qualquer momento usando o menu Conexão.

Com as últimas versões do JDK, nenhuma opção é necessária ao iniciar a aplicação a ser monitorada.

Como exemplo da saída da ferramenta de monitoramento, [Figura 2-1](<#/doc/guides/troubleshoot/diagnostic-tools>) mostra um gráfico do uso da memória heap.

Figura 2-1 Exemplo de Saída do JConsole

[Descrição de "Figura 2-1 Exemplo de Saída do JConsole"](<#/>)

### O Utilitário jdb

O utilitário `jdb` está incluído no JDK como um exemplo de depurador de linha de comando. O utilitário `jdb` usa a Java Debug Interface (JDI) para iniciar ou conectar-se à JVM de destino.

A JDI é uma API Java de alto nível que fornece informações úteis para depuradores e sistemas semelhantes que precisam de acesso ao estado de execução de uma máquina virtual (geralmente remota). A JDI é um componente da Java Platform Debugger Architecture (JPDA). Consulte [Java Platform Debugger Architecture](<#/doc/guides/troubleshoot/diagnostic-tools>).

A seção a seguir fornece técnicas de solução de problemas para o utilitário `jdb`.

*   [Solução de Problemas com o Utilitário jdb](<#/doc/guides/troubleshoot/diagnostic-tools>)

#### Solução de Problemas com o Utilitário jdb

O utilitário `jdb` é usado para monitorar os conectores de depurador usados para depuração remota.

Na JDI, um conector é a forma como o depurador se conecta à JVM de destino. O JDK tradicionalmente vem com conectores que iniciam e estabelecem uma sessão de depuração com uma JVM de destino, bem como conectores que são usados para depuração remota (usando transportes TCP/IP ou de memória compartilhada).

Esses conectores são geralmente usados com depuradores empresariais, como o ambiente de desenvolvimento integrado (IDE) NetBeans ou IDEs comerciais.

O comando `jdb -listconnectors` imprime uma lista dos conectores disponíveis. O comando `jdb -help` imprime a ajuda de uso do comando.

Consulte [O Comando jdb](<#/>) nas Especificações da Ferramenta do Java Development Kit

### O Utilitário jinfo

O utilitário de linha de comando `jinfo` obtém informações de configuração de um processo Java em execução ou de um crash dump, e imprime as propriedades do sistema ou as flags de linha de comando que foram usadas para iniciar a JVM.

JDK Mission Control, Flight Recorder e o utilitário `jcmd` podem ser usados para diagnosticar problemas com JVM e aplicações Java. Sugere-se usar o utilitário mais recente, `jcmd`, em vez do utilitário `jinfo` anterior para diagnósticos aprimorados e sobrecarga de desempenho reduzida.

Com a opção `-flag`, o utilitário `jinfo` pode definir, desdefinir ou alterar dinamicamente o valor de certas flags da JVM para o processo Java especificado. Consulte [Opções de Linha de Comando da Java HotSpot VM](<#/doc/guides/troubleshoot/command-line-options1>).

A saída do utilitário `jinfo` para um processo Java com número PID 19256 é mostrada no exemplo a seguir.
```
    c:\Program Files\Java\jdk-13\bin>jinfo 19256
    Java System Properties:
    java.specification.version=13
    sun.cpu.isalist=amd64
    sun.jnu.encoding=Cp1252
    sun.awt.enableExtraMouseButtons=true
    java.class.path=C\:\\sampleApps\\DynamicTreeDemo\\dist\\DynamicTreeDemo.jar
    java.vm.vendor=Oracle Corporation
    sun.arch.data.model=64
    user.variant=
    java.vendor.url=https\://java.oracle.com/
    os.name=Windows 10
    java.vm.specification.version=13
    sun.java.launcher=SUN_STANDARD
    user.country=US
    sun.boot.library.path=C\:\\Program Files\\Java\\jdk-13\\bin
    sun.java.command=C\:\\sampleApps\\DynamicTreeDemo\\dist\\DynamicTreeDemo.jar
    jdk.debug=release
    sun.cpu.endian=little
    user.home=C\:\\Users\\user1
    user.language=en
    java.specification.vendor=Oracle Corporation
    java.version.date=2019-09-17
    java.home=C\:\\Program Files\\Java\\jdk-13
    file.separator=\\
    java.vm.compressedOopsMode=Zero based
    line.separator=\r\n
    java.specification.name=Java Platform API Specification
    java.vm.specification.vendor=Oracle Corporation
    user.script=
    sun.management.compiler=HotSpot 64-Bit Tiered Compilers
    java.runtime.version=13-ea+29
    user.name=user1
    path.separator=;
    os.version=10.0
    java.runtime.name=Java(TM) SE Runtime Environment
    file.encoding=Cp1252
    java.vm.name=Java HotSpot(TM) 64-Bit Server VM
    java.vendor.url.bug=https\://bugreport.java.com/bugreport/
    java.io.tmpdir=C\:\\Users\\user1\\AppData\\Local\\Temp\\
    java.version=13-ea
    user.dir=C\:\\Users\\user1
    os.arch=amd64
    java.vm.specification.name=Java Virtual Machine Specification
    sun.os.patch.level=
    java.library.path=C\:\\Program Files\\Java\\jdk-13\\bin;....
    java.vm.info=mixed mode, sharing
    java.vendor=Oracle Corporation
    java.vm.version=13-ea+29
    sun.io.unicode.encoding=UnicodeLittle
    java.class.version=57.0
    
    VM Flags:
    
```

O tópico a seguir descreve a técnica de solução de problemas com o utilitário `jinfo`.

*   [Solução de Problemas com o Utilitário jinfo](<#/doc/guides/troubleshoot/diagnostic-tools>)

#### Solução de Problemas com o Utilitário jinfo

A saída do `jinfo` fornece as configurações para `java.class.path` e `sun.boot.class.path`.

Se você iniciar a JVM de destino com os argumentos `-classpath` e `-Xbootclasspath`, a saída do `jinfo` fornecerá as configurações para `java.class.path` e `sun.boot.class.path`. Essa informação pode ser necessária ao investigar problemas de class loader.

Além de obter informações de um processo, a ferramenta `jhsdb jinfo` pode usar um core file como entrada. No sistema operacional Linux, por exemplo, o utilitário `gcore` pode ser usado para obter um core file do processo no exemplo anterior. O core file será nomeado `core.19256` e será gerado no diretório de trabalho do processo. O caminho para o arquivo executável Java e o core file devem ser especificados como argumentos para o utilitário `jhsdb jinfo`, conforme mostrado no exemplo a seguir.
```
    $ jhsdb jinfo --exe java-home/bin/java --core core.19256
    
```

Às vezes, o nome do binário não será `java`. Isso acontece quando a VM é criada usando a JNI invocation API. A ferramenta `jhsdb jinfo` requer o binário do qual o core file foi gerado.

### O Utilitário jmap

O utilitário de linha de comando `jmap` imprime estatísticas relacionadas à memória para uma VM em execução ou um core file. Para um core file, use `jhsdb jmap`.

JDK Mission Control, Flight Recorder e o utilitário `jcmd` podem ser usados para diagnosticar problemas com JVM e aplicações Java. Sugere-se usar o utilitário mais recente, `jcmd`, em vez do utilitário `jmap` anterior para diagnósticos aprimorados e sobrecarga de desempenho reduzida.

Se `jmap` for usado com um processo ou core file sem nenhuma opção de linha de comando, ele imprimirá a lista de objetos compartilhados carregados. Para informações mais específicas, você pode usar as opções `-heap`, `-histo` ou `-clstats`. Essas opções são descritas nas subseções a seguir.

Além disso, a versão do JDK 7 introduziu a opção `-dump:format=b,file=filename`, que faz com que `jmap` despeje o heap Java em formato binário para um arquivo especificado.

Se o comando `jmap pid` não responder devido a um processo travado, use o utilitário `jhsdb jmap` para executar o Serviceability Agent.

As seções a seguir descrevem técnicas de solução de problemas com exemplos que imprimem estatísticas relacionadas à memória para uma VM em execução ou um core file.

*   [Configuração e Uso do Heap](<#/doc/guides/troubleshoot/diagnostic-tools>)

*   [Histograma do Heap](<#/doc/guides/troubleshoot/diagnostic-tools>)

*   [Estatísticas do Class Loader](<#/doc/guides/troubleshoot/diagnostic-tools>)

#### Configuração e Uso do Heap

Use o comando `jhsdb jmap --heap` para obter informações do heap Java.

A opção `--heap` é usada para obter as seguintes informações do heap Java:

*   Informações específicas do algoritmo de garbage collection (GC), incluindo o nome do algoritmo de GC (por exemplo, parallel GC) e detalhes específicos do algoritmo (como o número de threads para parallel GC).

*   Configuração do heap que pode ter sido especificada como opções de linha de comando ou selecionada pela VM com base na configuração da máquina.

*   Resumo de uso do heap: Para cada geração (área do heap), a ferramenta imprime a capacidade total do heap, a memória em uso e a memória livre disponível. Se uma geração for organizada como uma coleção de espaços (por exemplo, a new generation), um resumo do tamanho da memória específico do espaço será incluído.

O exemplo a seguir mostra a saída do comando `jhsdb jmap --heap`.
```
    c:\Program Files\Java\jdk-13\bin>jhsdb jmap --heap --pid 19256
    Attaching to process ID 19256, please wait...
    Debugger attached successfully.
    Server compiler detected.
    JVM version is 13-ea+29
    
    using thread-local object allocation.
    Garbage-First (G1) GC with 4 thread(s)
    
    Heap Configuration:
       MinHeapFreeRatio         = 40
       MaxHeapFreeRatio         = 70
       MaxHeapSize              = 4253024256 (4056.0MB)
       NewSize                  = 1363144 (1.2999954223632812MB)
       MaxNewSize               = 2551185408 (2433.0MB)
       OldSize                  = 5452592 (5.1999969482421875MB)
       NewRatio                 = 2
       SurvivorRatio            = 8
       MetaspaceSize            = 21807104 (20.796875MB)
       CompressedClassSpaceSize = 1073741824 (1024.0MB)
       MaxMetaspaceSize         = 17592186044415 MB
       G1HeapRegionSize         = 1048576 (1.0MB)
    
    Heap Usage:
    G1 Heap:
       regions  = 4056
       capacity = 4253024256 (4056.0MB)
       used      = 7340032 (7.0MB)
       free     = 4245684224 (4049.0MB)
       0.17258382642998027% used
    G1 Young Generation:
    Eden Space:
       regions  = 7
       capacity = 15728640 (15.0MB)
       used      = 7340032 (7.0MB)
       free      = 8388608 (8.0MB)
       46.666666666666664% used
    Survivor Space:
       regions  = 0
       capacity = 0 (0.0MB)
       used      = 0 (0.0MB)
       free      = 0 (0.0MB)
       0.0% used
    G1 Old Generation:
       regions  = 0
       capacity = 250609664 (239.0MB)
       used      = 0 (0.0MB)
       free      = 250609664 (239.0MB)
       0.0% used
```

#### Histograma do Heap

O comando `jmap` com a opção `-histo` ou o comando `jhsdb jmap --histo` pode ser usado para obter um histograma do heap específico da classe.

O comando `jmap -histo` pode imprimir o histograma do heap para um processo em execução. Use `jhsdb jmap --histo` para imprimir o histograma do heap para um core file.

Quando o comando `jmap -histo` é executado em um processo em execução, a ferramenta imprime o número de objetos, o tamanho da memória em bytes e o nome de classe totalmente qualificado para cada classe. Classes internas na Java HotSpot VM são incluídas entre colchetes angulares. O histograma é útil para entender como o heap é usado. Para obter o tamanho de um objeto, você deve dividir o tamanho total pela contagem desse tipo de objeto.

O exemplo a seguir mostra a saída do comando `jmap -histo` quando executado em um processo com número PID 19256.
```
    c:\Program Files\Java\jdk-13\bin>jmap -histo 19256
    No dump file specified
     num     #instances         #bytes  class name (module)
    -------------------------------------------------------
       1:         20913        1658720  [B (java.base@13-ea)
       2:          3647        1516888  [I (java.base@13-ea)
       3:         12321         492840  java.security.AccessControlContext (java.base@13-ea)
       4:         14806         355344  java.lang.String (java.base@13-ea)
       5:          2441         298464  java.lang.Class (java.base@13-ea)
       6:          5169         289464  jdk.internal.org.objectweb.asm.SymbolTable$Entry (java.base@13-ea)
       7:          5896         284216  [Ljava.lang.Object; (java.base@13-ea)
       8:          6887         220384  java.util.HashMap$Node (java.base@13-ea)
       9:           237         194640  [Ljdk.internal.org.objectweb.asm.SymbolTable$Entry; (java.base@13-ea)
      10:          5119         163808  java.util.ArrayList$Itr (java.base@13-ea)
      11:          1922         153760  java.awt.event.MouseEvent (java.desktop@13-ea)
      12:           672         139776  sun.java2d.SunGraphics2D (java.desktop@13-ea)
      13:          4101         131232  java.lang.ref.WeakReference (java.base@13-ea)
      14:           655         101848  [Ljava.util.HashMap$Node; (java.base@13-ea)
      15:          3915          93960  sun.awt.EventQueueItem (java.desktop@13-ea)
      16:           367          89008  [C (java.base@13-ea)
      17:          3708          88992  java.awt.Point (java.desktop@13-ea)
      18:          2158          86320  java.lang.invoke.MethodType (java.base@13-ea)
      19:          3026          81832  [Ljava.lang.Class; (java.base@13-ea)
      20:           348          77952  jdk.internal.org.objectweb.asm.MethodWriter (java.base@13-ea)
      21:          1016          73152  java.awt.geom.AffineTransform (java.desktop@13-ea)
      22:          1017          65088  java.awt.event.InvocationEvent (java.desktop@13-ea)
      23:          2013          64416  java.awt.Rectangle (java.desktop@13-ea)
      24:          1341          64368  java.lang.invoke.MemberName (java.base@13-ea)
      25:          1849          59168  java.util.concurrent.ConcurrentHashMap$Node (java.base@13-ea)
    ... more lines removed here to reduce output...
    1414:             1             16  sun.util.resources.LocaleData$LocaleDataStrategy (java.base@13-ea)
    1415:             1             16  sun.util.resources.provider.NonBaseLocaleDataMetaInfo (jdk.localedata@13-ea)
    Total        145508        8388608
    
```

Quando o comando `jhsdb jmap --histo` é executado em um core file, a ferramenta imprime o número de série, o número de instâncias, os bytes e o nome da classe para cada classe. Classes internas na Java HotSpot VM são prefixadas com um asterisco (*).

O exemplo a seguir mostra a saída do comando `jhsdb jmap --histo` quando executado em um core file.
```
    & jhsdb jmap --exe /usr/java/jdk_12/bin/java --core core.16395 --histo
    Attaching to core core.16395 from executable /usr/java/jdk_12/bin/java please wait...
    Debugger attached successfully.
    Server compiler detected.
    JVM version is 12-ea+30
    Iterating over heap. This may take a while...
    Object Histogram:
    
    num     #instances     #bytes   Class description
    --------------------------------------------------------------------------
    1:           11102     564520   byte[]
    2:           10065     241560   java.lang.String
    3:            1421     163392   java.lang.Class
    4:           26403    2997816   * ConstMethodKlass
    5:           26403    2118728   * MethodKlass
    6:           39750    1613184   * SymbolKlass
    7:            2011    1268896   * ConstantPoolKlass
    8:            2011    1097040   * InstanceKlassKlass
    9:            1906     882048   * ConstantPoolCacheKlass
    10:           1614     125752   java.lang.Object[]
    11:           1160      64960   jdk.internal.org.objectweb.asm.Item
    12:           1834      58688   java.util.HashMap$Node
    13:            359      40880   java.util.HashMap$Node[]
    14:           1189      38048   java.util.concurrent.ConcurrentHashMap$Node
    15:             46      37280   jdk.internal.org.objectweb.asm.Item[]
    16:             29      35600   char[]
    17:            968      32320   int[]
    18:            650      26000   java.lang.invoke.MethodType
    19:            475      22800   java.lang.invoke.MemberName
    
```

#### Estatísticas do Class Loader

Use o comando `jmap` com a opção `-clstats` para imprimir estatísticas do class loader para o heap Java.

O comando `jmap` conecta-se a um processo em execução usando o ID do processo e imprime informações detalhadas sobre as classes carregadas no Metaspace:

*   Index - Índice único para a classe
*   Super - Número do índice da superclasse
*   InstBytes - Número de bytes por instância
*   KlassBytes - Número de bytes para a classe
*   annotations - Tamanho das anotações
*   CpAll - Tamanho combinado das constantes, tags, cache e operandos por classe
*   MethodCount - Número de métodos por classe
*   Bytecodes - Número de bytes usados para byte codes
*   MethodAll - Tamanho combinado dos bytes por método, CONSTMETHOD, stack map e dados do método
*   ROAll - Tamanho dos metadados da classe que poderiam ser colocados em memória somente leitura
*   RWAll - Tamanho dos metadados da classe que devem ser colocados em memória de leitura/escrita
*   Total - Soma de ROAll + RWAll
*   ClassName - Nome da classe carregada

O exemplo a seguir mostra um subconjunto da saída do comando `jmap -clstats` quando executado em um processo com número PID 10952.
```
    c:\Program Files\Java\jdk-11.0.5\bin>jmap -clstats 10952
    Index Super InstBytes KlassBytes annotations   CpAll MethodCount Bytecodes MethodAll   ROAll   RWAll    Total ClassName
        1    -1    304816        512           0       0           0         0         0      24     624      648 [B
        2    51    285264        784           0   23344         147      5815     48848   28960   46640    75600 java.lang.Class
        3    -1    256368        512           0       0           0         0         0      24     624      648 [I
        4    51    166344        680         136   17032         123      5433     48256   23920   44160    68080 java.lang.String
        5    -1    146360        512           0       0           0         0         0      24     624      648 [Ljava.lang.Object;
        6    51    123680        600           0    1384           7       149      1888    1200    3024     4224 java.util.HashMap$Node
        7    51     52928        608           0    1360           9       213      2472    1632    3184     4816 java.util.concurrent.ConcurrentHashMap$Node
        8    -1     51888        512           0       0           0         0         0      24     624      648 [C
        9    -1     49904        512           0       0           0         0         0      32     624      656 [Ljava.util.HashMap$Node;
       10    51     30400        624           0    1512           8       240      2224    1472    3256     4728 java.util.Hashtable$Entry
       11    51     25488        592           0   11520          89      4365     47936   16696   45072    61768 java.lang.invoke.MemberName
       12  1604     19296       1024           0    7904          51      4071     27568   14664   23024    37688 java.util.HashMap
       13    -1     18304        512           0       0           0         0         0      32     624      656 [Ljava.util.concurrent.ConcurrentHashMap$Node;
       14    51     17504        544         120    5464          37      1783     16648    7416   16072    23488 java.lang.invoke.LambdaForm$Name
       15    -1     16680        512           0       0           0         0         0      80     624      704 [Ljava.lang.Class;
    ...lines removed to reduce output...
     2320  1955         0        560           0    1912           7       170      1520    1312    3016     4328 sun.util.logging.internal.LoggingProviderImpl
     2321    51         0        528           0     232           1         0       144     128     936     1064 sun.util.logging.internal.LoggingProviderImpl$LogManagerAccess
                  2055400    1621472       10680 5092080       27820   1288076   7335944 5407792 9513160 14920952 Total
                    13.8%      10.9%        0.1%   34.1%           -      8.6%     49.2%   36.2%   63.8%   100.0%
    Index Super InstBytes KlassBytes annotations   CpAll MethodCount Bytecodes MethodAll   ROAll   RWAll    Total ClassName
```

### O Utilitário jps

O utilitário `jps` lista todas as VMs Java HotSpot instrumentadas para o usuário atual no sistema de destino.

O utilitário é muito útil em ambientes onde a VM está incorporada, ou seja, onde é iniciada usando a JNI Invocation API em vez do launcher `java`. Nesses ambientes, nem sempre é fácil reconhecer os processos Java na lista de processos.

O exemplo a seguir mostra o uso do utilitário `jps`.
```
    $ jps
    16217 MyApplication
    16342 jps
    
```

O utilitário `jps` lista as máquinas virtuais para as quais o usuário tem direitos de acesso. Isso é determinado por mecanismos de controle de acesso específicos do sistema operacional.

Além de listar o PID, o utilitário oferece opções para exibir os argumentos passados para o método `main` da aplicação, a lista completa de argumentos da VM e o nome completo do pacote da classe `main` da aplicação. O utilitário `jps` também pode listar processos em um sistema remoto se o sistema remoto estiver executando o daemon `jstatd`.

### O Utilitário jrunscript

O utilitário `jrunscript` é um shell de script de linha de comando.

Ele suporta a execução de scripts tanto no modo interativo quanto no modo batch. Por padrão, o shell usa JavaScript, mas você pode especificar qualquer outra linguagem de script para a qual você forneça o caminho para o arquivo JAR do motor de script de arquivos `.class`.

Graças à comunicação entre a linguagem Java e a linguagem de script, o utilitário `jrunscript` suporta um estilo de programação exploratório.

### O Utilitário jstack

Use o utilitário `jcmd` ou `jhsdb jstack`, em vez do utilitário `jstack`, para diagnosticar problemas com JVM e aplicações Java.

JDK Mission Control, Flight Recorder e o utilitário `jcmd` podem ser usados para diagnosticar problemas com JVM e aplicações Java. Sugere-se usar o utilitário mais recente, `jcmd`, em vez do utilitário `jstack` anterior para diagnósticos aprimorados e sobrecarga de desempenho reduzida.

As seções a seguir descrevem técnicas de solução de problemas com os utilitários `jstack` e `jhsdb jstack`.

*   [Solução de Problemas com o Utilitário jstack](<#/doc/guides/troubleshoot/diagnostic-tools>)

*   [Stack Trace de um Core Dump](<#/doc/guides/troubleshoot/diagnostic-tools>)

*   [Stack Misto](<#/doc/guides/troubleshoot/diagnostic-tools>)

#### Solução de Problemas com o Utilitário jstack

O utilitário de linha de comando `jstack` anexa-se ao processo especificado e imprime os stack traces de todas as threads anexadas à máquina virtual, incluindo threads Java e threads internas da VM, e opcionalmente frames de stack nativos. O utilitário também realiza detecção de deadlock. Para core files, use `jhsdb jstack`.

Um stack trace de todas as threads pode ser útil para diagnosticar vários problemas, como deadlocks ou travamentos.

A opção `-l` instrui o utilitário a procurar sincronizadores próprios no heap e imprimir informações sobre `java.util.concurrent.locks`. Sem esta opção, o thread dump inclui informações apenas sobre monitores.

A saída da opção `jstack pid` é a mesma que a obtida pressionando Ctrl+\ no console da aplicação (entrada padrão) ou enviando um sinal de saída ao processo. Consulte [Manipulador Control+Break](<#/doc/guides/troubleshoot/diagnostic-tools>) para um exemplo da saída.

Thread dumps também podem ser obtidos programaticamente usando o método `Thread.getAllStackTraces`, ou no depurador usando a opção do depurador para imprimir todos os stacks de threads (o comando `where` no caso do depurador de exemplo `jdb`).

#### Stack Trace de um Core Dump

Use o comando `jhsdb jstack` para obter stack traces de um core dump.

Para obter stack traces de um core dump, execute o comando `jhsdb jstack` em um core file, conforme mostrado no exemplo a seguir.
```
    $ jhsdb jstack --exe java-home/bin/java --core core-file
    
```

#### Stack Misto

O utilitário `jhsdb jstack` também pode ser usado para imprimir um stack misto; ou seja, ele pode imprimir frames de stack nativos além do stack Java. Frames nativos são os frames C/C++ associados ao código da VM e ao código JNI/nativo.

Para imprimir um stack misto, use a opção `--mixed`, conforme mostrado no exemplo a seguir.
```
    >jhsdb jstack --mixed --pid 21177
    Attaching to process ID 21177, please wait...Debugger attached successfully.
    Server compiler detected.
    JVM version is 14-ea+29-1384
    Deadlock Detection:
    
    No deadlocks found.
    
    ----------------- 0 -----------------
    ----------------- 1 -----------------
    "DestroyJavaVM" #18 prio=5 tid=0x000001df4706f000 nid=0x744 waiting on condition [0x0000000000000000]
       java.lang.Thread.State: RUNNABLE
       JavaThread state: _thread_blocked
    0x00007ffa4529f9f4      ntdll!ZwWaitForAlertByThreadId + 0x14
    0x000001df2533dc50              ????????
    ----------------- 2 -----------------
    0x00007ffa4529c144      ntdll!NtWaitForSingleObject + 0x14
    ----------------- 3 -----------------
    0x00007ffa4529f9f4      ntdll!ZwWaitForAlertByThreadId + 0x14
    ----------------- 4 -----------------
    0x00007ffa4529c144      ntdll!NtWaitForSingleObject + 0x14
    ----------------- 5 -----------------
    0x00007ffa4529f9f4      ntdll!ZwWaitForAlertByThreadId + 0x14
    ----------------- 6 -----------------
    0x00007ffa4529f9f4      ntdll!ZwWaitForAlertByThreadId + 0x14
    ----------------- 7 -----------------
    0x00007ffa4529f9f4      ntdll!ZwWaitForAlertByThreadId + 0x14
    ----------------- 8 -----------------
    "Reference Handler" #2 daemon prio=10 tid=0x000001df47020000 nid=0x4728 waiting on condition [0x000000a733aff000]
       java.lang.Thread.State: RUNNABLE
       JavaThread state: _thread_blocked
    0x00007ffa4529f9f4      ntdll!ZwWaitForAlertByThreadId + 0x14
    0x000001df2533e280              ????????
    ----------------- 9 -----------------
    "Finalizer" #3 daemon prio=8 tid=0x000001df4702b000 nid=0x5278 in Object.wait() [0x000000a733bfe000]
       java.lang.Thread.State: WAITING (on object monitor)
       JavaThread state: _thread_blocked
    0x00007ffa4529c144      ntdll!NtWaitForSingleObject + 0x14
    ----------------- 10 -----------------
    "Signal Dispatcher" #4 daemon prio=9 tid=0x000001df47053800 nid=0xac0 runnable [0x0000000000000000]
       java.lang.Thread.State: RUNNABLE
       JavaThread state: _thread_blocked
    0x00007ffa4529c144      ntdll!NtWaitForSingleObject + 0x14
    ----------------- 11 -----------------
    "Attach Listener" #5 daemon prio=5 tid=0x000001df47058800 nid=0x3980 runnable [0x0000000000000000]
       java.lang.Thread.State: RUNNABLE
       JavaThread state: _thread_blocked
    0x00007ffa4529c144      ntdll!NtWaitForSingleObject + 0x14
    0x000001df47059390              ????????
    ----------------- 12 -----------------
    "Service Thread" #6 daemon prio=9 tid=0x000001df4705b800 nid=0x3350 runnable [0x0000000000000000]
       java.lang.Thread.State: RUNNABLE
       JavaThread state: _thread_blocked
    0x00007ffa4529f9f4      ntdll!ZwWaitForAlertByThreadId + 0x14
    ----------------- 13 -----------------
    "C2 CompilerThread0" #7 daemon prio=9 tid=0x000001df47068800 nid=0x51e8 waiting on condition [0x0000000000000000]
       java.lang.Thread.State: RUNNABLE
       JavaThread state: _thread_blocked
    0x00007ffa4529f9f4      ntdll!ZwWaitForAlertByThreadId + 0x14
    0x000001df2533d590              ????????
    ----------------- 14 -----------------
    "C1 CompilerThread0" #9 daemon prio=9 tid=0x000001df4705d800 nid=0xc20 waiting on condition [0x0000000000000000]
       java.lang.Thread.State: RUNNABLE
       JavaThread state: _thread_blocked
    0x00007ffa4529f9f4      ntdll!ZwWaitForAlertByThreadId + 0x14
    0x000001df2533d590              ????????
    ----------------- 15 -----------------
    "Sweeper thread" #10 daemon prio=9 tid=0x000001df4706c000 nid=0x1a64 runnable [0x0000000000000000]
       java.lang.Thread.State: RUNNABLE
       JavaThread state: _thread_blocked
    0x00007ffa4529f9f4      ntdll!ZwWaitForAlertByThreadId + 0x14
    ----------------- 16 -----------------
    "Notification Thread" #11 daemon prio=9 tid=0x000001df47070000 nid=0xddc runnable [0x0000000000000000]
       java.lang.Thread.State: RUNNABLE
       JavaThread state: _thread_blocked
    0x00007ffa4529f9f4      ntdll!ZwWaitForAlertByThreadId + 0x14
    ----------------- 17 -----------------
    0x00007ffa4529f9f4      ntdll!ZwWaitForAlertByThreadId + 0x14
    0x00000f3e40772a94              ????????
    ----------------- 18 -----------------
    "Common-Cleaner" #12 daemon prio=8 tid=0x000001df4706b000 nid=0x2054 in Object.wait() [0x000000a7344fe000]
       java.lang.Thread.State: TIMED_WAITING (on object monitor)
       JavaThread state: _thread_blocked
    0x00007ffa4529c144      ntdll!NtWaitForSingleObject + 0x14
    ----------------- 19 -----------------
    "Java2D Disposer" #13 daemon prio=10 tid=0x000001df4706c800 nid=0x4770 in Object.wait() [0x000000a7345ff000]
       java.lang.Thread.State: WAITING (on object monitor)
       JavaThread state: _thread_blocked
    0x00007ffa4529c144      ntdll!NtWaitForSingleObject + 0x14
    ----------------- 20 -----------------
    "AWT-Shutdown" #14 prio=5 tid=0x000001df4706d800 nid=0x4ed4 in Object.wait() [0x000000a7346fe000]
       java.lang.Thread.State: WAITING (on object monitor)
       JavaThread state: _thread_blocked
    0x00007ffa4529c144      ntdll!NtWaitForSingleObject + 0x14
    ----------------- 21 -----------------
    "AWT-Windows" #15 daemon prio=6 tid=0x000001df4706e800 nid=0x15e8 runnable [0x000000a7347ff000]
       java.lang.Thread.State: RUNNABLE
       JavaThread state: _thread_in_native
    ----------------- 22 -----------------
    "AWT-EventQueue-0" #17 prio=6 tid=0x000001df4706a000 nid=0x2f54 waiting on condition [0x000000a7348fe000]
       java.lang.Thread.State: WAITING (parking)
       JavaThread state: _thread_blocked
    0x00007ffa4529c144      ntdll!NtWaitForSingleObject + 0x14
    ----------------- 23 -----------------
    ----------------- 24 -----------------
    ----------------- 25 -----------------
```

Frames que são prefixados com um asterisco (*) são frames Java, enquanto frames que não são prefixados com um asterisco são frames C/C++ nativos.

A saída do utilitário pode ser redirecionada através de `c++filt` para desmangler nomes de símbolos C++ mangled. Como a Java HotSpot VM é desenvolvida na linguagem C++, o utilitário `jhsdb jstack` imprime nomes de símbolos C++ mangled para as funções internas do Java HotSpot.
O utilitário `c++filt` é entregue com o pacote de compiladores C++ nativos `gnu` no Linux.

### O Utilitário jstat

O utilitário `jstat` usa a instrumentação embutida na Java HotSpot VM para fornecer informações sobre o desempenho e o consumo de recursos de aplicações em execução.

A ferramenta pode ser usada ao diagnosticar problemas de desempenho, e em particular problemas relacionados ao dimensionamento da heap e à garbage collection. O utilitário `jstat` não exige que a VM seja iniciada com quaisquer opções especiais. A instrumentação embutida na Java HotSpot VM é habilitada por padrão. Este utilitário está incluído no download do JDK para todas as plataformas de sistema operacional suportadas pela Oracle.

Nota:

A instrumentação não é acessível em um sistema de arquivos FAT32.

Consulte [O Comando jstat](<#/>) nas Especificações da Ferramenta do Java Development Kit.

O utilitário `jstat` usa o identificador de máquina virtual (VMID) para identificar o processo alvo. A documentação descreve a sintaxe do VMID, mas seu único componente obrigatório é o identificador de máquina virtual local (LVMID). O LVMID é tipicamente (mas nem sempre) o PID do sistema operacional para o processo JVM alvo.

O utilitário `jstat` fornece dados semelhantes aos dados fornecidos por `vmstat` e `iostat` em sistemas operacionais Linux.

Para uma representação gráfica dos dados, você pode usar a ferramenta `visualgc`. Consulte [A Ferramenta visualgc](<#/doc/guides/troubleshoot/diagnostic-tools>).

O exemplo a seguir ilustra o uso da opção `-gcutil`, onde o utilitário `jstat` se conecta ao LVMID número 2834 e coleta 7 amostras em intervalos de 250 milissegundos.
```
    $ jstat -gcutil 2834 250 7
      S0     S1     E      O      M     YGC     YGCT    FGC    FGCT     GCT   
      0.00  99.74  13.49   7.86  95.82      3    0.124     0    0.000    0.124
      0.00  99.74  13.49   7.86  95.82      3    0.124     0    0.000    0.124
      0.00  99.74  13.49   7.86  95.82      3    0.124     0    0.000    0.124
      0.00  99.74  13.49   7.86  95.82      3    0.124     0    0.000    0.124
      0.00  99.74  13.49   7.86  95.82      3    0.124     0    0.000    0.124
      0.00  99.74  13.49   7.86  95.82      3    0.124     0    0.000    0.124
      0.00  99.74  13.49   7.86  95.82      3    0.124     0    0.000    0.124
```

A saída deste exemplo mostra que uma coleta de geração jovem ocorreu entre a terceira e a quarta amostras. A coleta levou 0,017 segundos e promoveu objetos do espaço eden (E) para o espaço old (O), resultando em um aumento da utilização do espaço old de 46,56% para 54,60%.

O exemplo a seguir ilustra o uso da opção `-gcnew` onde o utilitário `jstat` se conecta ao LVMID número 2834, coleta amostras em intervalos de 250 milissegundos e exibe a saída. Além disso, ele usa a opção `-h3` para exibir os cabeçalhos das colunas após cada 3 linhas de dados.
```
    $ jstat -gcnew -h3 2834 250
    S0C    S1C    S0U    S1U   TT MTT  DSS      EC       EU     YGC     YGCT  
     192.0  192.0    0.0    0.0 15  15   96.0   1984.0    942.0    218    1.999
     192.0  192.0    0.0    0.0 15  15   96.0   1984.0   1024.8    218    1.999
     192.0  192.0    0.0    0.0 15  15   96.0   1984.0   1068.1    218    1.999
     S0C    S1C    S0U    S1U   TT MTT  DSS      EC       EU     YGC     YGCT  
     192.0  192.0    0.0   103.2  1  15   96.0   1984.0      0.0    219    2.019
     192.0  192.0    0.0   103.2  1  15   96.0   1984.0     71.6    219    2.019
     192.0  192.0    0.0   103.2  1  15   96.0   1984.0     73.7    219    2.019
     S0C    S1C    S0U    S1U   TT MTT  DSS      EC       EU     YGC     YGCT  
     192.0  192.0    0.0   103.2  1  15   96.0   1984.0     78.0    219    2.019
     192.0  192.0    0.0   103.2  1  15   96.0   1984.0    116.1    219    2.019
    
```

Além de mostrar a string de cabeçalho repetida, este exemplo mostra que entre a quarta e a quinta amostras, ocorreu uma coleta de geração jovem, cuja duração foi de 0,02 segundos. A coleta encontrou dados vivos suficientes para que a utilização do espaço survivor 1 (S1U) excedesse o tamanho desejado do survivor (DSS). Como resultado, os objetos foram promovidos para a geração old (não visível nesta saída), e o tenuring threshold (TT) foi reduzido de 15 para 1.

O exemplo a seguir ilustra o uso da opção `-gcoldcapacity`, onde o utilitário `jstat` se conecta ao LVMID número 21891 e coleta 3 amostras em intervalos de 250 milissegundos. A opção `-t` é usada para gerar um carimbo de data/hora para cada amostra na primeira coluna.
```
    $ jstat -gcoldcapacity -t 21891 250 3
    Timestamp    OGCMN     OGCMX       OGC        OC   YGC   FGC     FGCT     GCT
        150.1   1408.0   60544.0   11696.0   11696.0   194    80    2.874   3.799
        150.4   1408.0   60544.0   13820.0   13820.0   194    81    2.938   3.863
        150.7   1408.0   60544.0   13820.0   13820.0   194    81    2.938   3.863
    
```

A coluna Timestamp relata o tempo decorrido em segundos desde o início da JVM alvo. Além disso, a saída de `-gcoldcapacity` mostra a capacidade da geração old (OGC) e a capacidade do espaço old (OC) aumentando à medida que a heap se expande para atender às demandas de alocação ou promoção. A OGC cresceu de 11696 KB para 13820 KB após a 81ª coleta de capacidade de geração completa (FGC). A capacidade máxima da geração (e do espaço) é de 60544 KB (OGCMX), então ainda há espaço para expandir.

### A Ferramenta visualgc

A ferramenta `visualgc` fornece uma visão gráfica do sistema de garbage collection (GC).

A ferramenta `visualgc` está relacionada à ferramenta `jstat`. Consulte [O Utilitário jstat](<#/doc/guides/troubleshoot/diagnostic-tools>). A ferramenta `visualgc` fornece uma visão gráfica do sistema de garbage collection (GC). Assim como o `jstat`, ela usa a instrumentação embutida da Java HotSpot VM.

A ferramenta `visualgc` não está incluída na versão do JDK, mas está disponível como um download separado na página da [tecnologia jvmstat](<http://www.oracle.com/technetwork/java/jvmstat-1422257.html>).

[A Figura 2-2](<#/doc/guides/troubleshoot/diagnostic-tools>) mostra como o GC e a heap são visualizados.

Figura 2-2 Exemplo de Saída do `visualgc`

[Descrição da "Figura 2-2 Exemplo de Saída do visualgc"](<#/>)

### Manipulador Control+Break

Em sistemas operacionais Linux, a combinação de pressionar a tecla Control e a tecla barra invertida (\\) no console da aplicação (entrada padrão) faz com que a Java HotSpot VM imprima um thread dump na saída padrão da aplicação. No Windows, a sequência de teclas equivalente são as teclas Control e Break. O termo geral para essas combinações de teclas é o manipulador Control+Break.

Em sistemas operacionais Linux, um thread dump é impresso se o processo Java receber um sinal de quit. Portanto, o comando `kill -QUIT pid` faz com que o processo com o ID `pid` imprima um thread dump na saída padrão.

As seções a seguir descrevem os dados rastreados pelo manipulador Control+Break:

  * [Thread Dump](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [Estados de Thread para um Thread Dump](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [Detectar Deadlocks](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [Resumo da Heap](<#/doc/guides/troubleshoot/diagnostic-tools>)

#### Thread Dump

O thread dump consiste na pilha de threads, incluindo o estado da thread, para todas as threads Java na máquina virtual.

O thread dump não encerra a aplicação: ela continua após as informações da thread serem impressas.

O exemplo a seguir ilustra um thread dump.
```
    Full thread dump Java HotSpot(TM) Client VM (1.6.0-rc-b100 mixed mode):
    
    "DestroyJavaVM" prio=10 tid=0x00030400 nid=0x2 waiting on condition [0x00000000..0xfe77fbf0]
       java.lang.Thread.State: RUNNABLE
    
    "Thread2" prio=10 tid=0x000d7c00 nid=0xb waiting for monitor entry [0xf36ff000..0xf36ff8c0]
       java.lang.Thread.State: BLOCKED (on object monitor)
            at Deadlock$DeadlockMakerThread.run(Deadlock.java:32)
            - waiting to lock <0xf819a938> (a java.lang.String)
            - locked <0xf819a970> (a java.lang.String)
    
    "Thread1" prio=10 tid=0x000d6c00 nid=0xa waiting for monitor entry [0xf37ff000..0xf37ffbc0]
       java.lang.Thread.State: BLOCKED (on object monitor)
            at Deadlock$DeadlockMakerThread.run(Deadlock.java:32)
            - waiting to lock <0xf819a970> (a java.lang.String)
            - locked <0xf819a938> (a java.lang.String)
    
    "Low Memory Detector" daemon prio=10 tid=0x000c7800 nid=0x8 runnable [0x00000000..0x00000000]
       java.lang.Thread.State: RUNNABLE
    
    "CompilerThread0" daemon prio=10 tid=0x000c5400 nid=0x7 waiting on condition [0x00000000..0x00000000]
       java.lang.Thread.State: RUNNABLE
    
    "Signal Dispatcher" daemon prio=10 tid=0x000c4400 nid=0x6 waiting on condition [0x00000000..0x00000000]
       java.lang.Thread.State: RUNNABLE
    
    "Finalizer" daemon prio=10 tid=0x000b2800 nid=0x5 in Object.wait() [0xf3f7f000..0xf3f7f9c0]
       java.lang.Thread.State: WAITING (on object monitor)
            at java.lang.Object.wait(Native Method)
            - waiting on <0xf4000b40> (a java.lang.ref.ReferenceQueue$Lock)
            at java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:116)
            - locked <0xf4000b40> (a java.lang.ref.ReferenceQueue$Lock)
            at java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:132)
            at java.lang.ref.Finalizer$FinalizerThread.run(Finalizer.java:159)
    
    "Reference Handler" daemon prio=10 tid=0x000ae000 nid=0x4 in Object.wait() [0xfe57f000..0xfe57f940]
       java.lang.Thread.State: WAITING (on object monitor)
            at java.lang.Object.wait(Native Method)
            - waiting on <0xf4000a40> (a java.lang.ref.Reference$Lock)
            at java.lang.Object.wait(Object.java:485)
            at java.lang.ref.Reference$ReferenceHandler.run(Reference.java:116)
            - locked <0xf4000a40> (a java.lang.ref.Reference$Lock)
    
    "VM Thread" prio=10 tid=0x000ab000 nid=0x3 runnable 
    
    "VM Periodic Task Thread" prio=10 tid=0x000c8c00 nid=0x9 waiting on condition 
    
```

A saída consiste em várias entradas de thread separadas por uma linha vazia. As Threads Java (threads capazes de executar código da linguagem Java) são impressas primeiro, e estas são seguidas por informações sobre threads internas da VM. Cada entrada de thread consiste em uma linha de cabeçalho seguida pelo stack trace da thread.

A linha de cabeçalho contém as seguintes informações sobre a thread:

  * Nome da thread.

  * Indicação se a thread é uma thread daemon.

  * Prioridade da thread (prio).

  * ID da thread (tid), que é o endereço de uma estrutura de thread na memória.

  * ID da thread nativa (nid).

  * Estado da thread, que indica o que a thread estava fazendo no momento do thread dump. Consulte [Tabela 2-2](<#/doc/guides/troubleshoot/diagnostic-tools>) para mais detalhes.

  * Intervalo de endereços, que fornece uma estimativa da região de pilha válida para a thread.

#### Estados de Thread para um Thread Dump

Lista de possíveis estados de thread para um thread dump.

[A Tabela 2-2](<#/doc/guides/troubleshoot/diagnostic-tools>) lista os possíveis estados de thread para um thread dump usando o [Manipulador Control+Break](<#/doc/guides/troubleshoot/diagnostic-tools>).

Tabela 2-2 Estados de Thread para um Thread Dump

Estado da Thread | Descrição
---|---
NEW | A thread ainda não foi iniciada.
RUNNABLE | A thread está sendo executada na JVM.
BLOCKED | A thread está bloqueada, aguardando um monitor lock.
WAITING | A thread está aguardando indefinidamente que outra thread execute uma ação específica.
TIMED_WAITING | A thread está aguardando que outra thread execute uma ação por até um tempo de espera especificado.
TERMINATED | A thread foi encerrada.

#### Detectar Deadlocks

O manipulador Control+Break pode ser usado para detectar deadlocks em threads.

Além das pilhas de threads, o manipulador Control+Break executa um algoritmo de detecção de deadlock. Se algum deadlock for detectado, o manipulador Control+Break, conforme mostrado no exemplo a seguir, imprime informações adicionais após o thread dump sobre cada thread em deadlock.
```
    Found one Java-level deadlock:
    =============================
    "Thread2":
      waiting to lock monitor 0x000af330 (object 0xf819a938, a java.lang.String),
      which is held by "Thread1"
    "Thread1":
      waiting to lock monitor 0x000af398 (object 0xf819a970, a java.lang.String),
      which is held by "Thread2"
    
    Java stack information for the threads listed above:
    ===================================================
    "Thread2":
            at Deadlock$DeadlockMakerThread.run(Deadlock.java:32)
            - waiting to lock <0xf819a938> (a java.lang.String)
            - locked <0xf819a970> (a java.lang.String)
    "Thread1":
            at Deadlock$DeadlockMakerThread.run(Deadlock.java:32)
            - waiting to lock <0xf819a970> (a java.lang.String)
            - locked <0xf819a938> (a java.lang.String)
    
    Found 1 deadlock.
    
```

Se a flag JVM `-XX:+PrintConcurrentLocks` estiver definida, o manipulador Control+Break também imprimirá a lista de locks concorrentes possuídos por cada thread.

#### Resumo da Heap

O manipulador Control+Break pode ser usado para imprimir um resumo da heap.

O exemplo a seguir mostra as diferentes gerações (áreas da heap), com o tamanho, a quantidade usada e o intervalo de endereços. O intervalo de endereços é especialmente útil se você também estiver examinando o processo com ferramentas como `pmap`.
```
    Heap
     def new generation   total 1152K, used 435K [0x22960000, 0x22a90000, 0x22e40000
    )
      eden space 1088K,  40% used [0x22960000, 0x229ccd40, 0x22a70000)
      from space 64K,   0% used [0x22a70000, 0x22a70000, 0x22a80000)
      to   space 64K,   0% used [0x22a80000, 0x22a80000, 0x22a90000)
     tenured generation   total 13728K, used 6971K [0x22e40000, 0x23ba8000, 0x269600
    00)
       the space 13728K,  50% used [0x22e40000, 0x2350ecb0, 0x2350ee00, 0x23ba8000)
     compacting perm gen  total 12288K, used 1417K [0x26960000, 0x27560000, 0x2a9600
    00)
       the space 12288K,  11% used [0x26960000, 0x26ac24f8, 0x26ac2600, 0x27560000)
        ro space 8192K,  62% used [0x2a960000, 0x2ae5ba98, 0x2ae5bc00, 0x2b160000)
        rw space 12288K,  52% used [0x2b160000, 0x2b79e410, 0x2b79e600, 0x2bd60000)
    
```

Se a flag JVM `-XX:+PrintClassHistogram` estiver definida, o manipulador Control+Break produzirá um histograma da heap.

### Ferramentas Nativas do Sistema Operacional

Os sistemas operacionais Windows e Linux fornecem ferramentas nativas que são úteis para fins de solução de problemas ou monitoramento.

Uma breve descrição é fornecida para cada ferramenta. Para mais detalhes, consulte a documentação do sistema operacional ou as páginas man para o sistema operacional Linux.

O formato dos arquivos de log e a saída dos utilitários de linha de comando dependem da versão. Por exemplo, se você desenvolver um script que depende do formato do log de erro fatal, o mesmo script pode não funcionar se o formato do arquivo de log mudar em uma versão futura.

Você também pode procurar suporte de depuração específico do Windows na [rede de desenvolvedores MSDN](<http://msdn.microsoft.com>).

As seções a seguir descrevem técnicas de solução de problemas e melhorias em algumas ferramentas nativas do sistema operacional.

  * [Ferramentas de Solução de Problemas Baseadas no Sistema Operacional](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [Provedores de Sonda na Java HotSpot VM](<#/doc/guides/troubleshoot/diagnostic-tools>)

#### Ferramentas de Solução de Problemas Baseadas no Sistema Operacional

Lista de ferramentas nativas do Windows que podem ser usadas para solucionar problemas.

[A Tabela 2-3](<#/doc/guides/troubleshoot/diagnostic-tools>) lista as ferramentas de solução de problemas disponíveis no sistema operacional Windows.

Tabela 2-3 Ferramentas Nativas de Solução de Problemas no Windows

Ferramenta | Descrição
---|---
`dumpchk` | Utilitário de linha de comando para verificar se um arquivo de despejo de memória foi criado corretamente. Esta ferramenta está incluída no download do Debugging Tools for Windows disponível no site da Microsoft. Consulte [Coletar Despejos de Falha no Windows](<#/doc/guides/troubleshoot/submit-bug-report>).
`msdev` debugger | Utilitário de linha de comando que pode ser usado para iniciar o Visual C++ e o depurador Win32.
`userdump` | O User Mode Process Dumper está incluído no download do OEM Support Tools disponível no site da Microsoft. Consulte [Coletar Despejos de Falha no Windows](<#/doc/guides/troubleshoot/submit-bug-report>).
`windbg` | O depurador do Windows pode ser usado para depurar aplicações Windows ou despejos de falha. Esta ferramenta está incluída no download do Debugging Tools for Windows disponível no site da Microsoft. Consulte [Coletar Despejos de Falha no Windows](<#/doc/guides/troubleshoot/submit-bug-report>).
`/Md` e `/Mdd` compiler options | Opções do compilador que incluem automaticamente suporte extra para rastreamento de alocações de memória.

[A Tabela 2-4](<#/doc/guides/troubleshoot/diagnostic-tools>) descreve algumas ferramentas de solução de problemas introduzidas ou melhoradas na versão 10 do sistema operacional Linux.

Tabela 2-4 Ferramentas Nativas de Solução de Problemas no Linux

Ferramenta | Descrição
---|---
`c++filt` | Desmangler nomes de símbolos C++ mangled. Este utilitário é entregue com o pacote de compiladores C++ nativos: `gcc` no Linux.
`gdb` | Depurador GNU
`libnjamd` | Rastreamento de alocação de memória
`lsstack` | Imprimir pilha de threads. Nem todas as distribuições fornecem esta ferramenta por padrão; portanto, você pode ter que baixá-la do [SourceForge](<http://sourceforge.net>).
`ltrace` | Rastreador de chamadas de biblioteca. Nem todas as distribuições fornecem esta ferramenta por padrão; portanto, você pode ter que baixá-la do [SourceForge](<http://sourceforge.net>).
`mtrace` e `muntrace` | Rastreador `malloc` do GNU
`/proc` filesystem | Sistema de arquivos virtual que contém informações sobre processos e outras informações do sistema.
`strace` | Rastreador de chamadas de sistema.
`top` | Exibir os processos que mais consomem CPU.
`vmstat` | Relatar informações sobre processos, memória, paginação, E/S de bloco, traps e atividade da CPU.

#### Provedores de Sonda na Java HotSpot VM

A Java HotSpot VM contém dois provedores de sonda embutidos `hotspot` e `hotspot_jni`.

Esses provedores entregam sondas que podem ser usadas para monitorar o estado interno e as atividades da VM, bem como a aplicação Java que está em execução.

Os provedores de sonda da JVM podem ser categorizados da seguinte forma:

  * Ciclo de vida da VM: início e fim da inicialização da VM, e desligamento da VM.

  * Ciclo de vida da thread: início e parada da thread, nome da thread, ID da thread, e assim por diante.

  * Carregamento de classes: carregamento e descarregamento de classes Java.

  * Garbage collection: início e parada da garbage collection, em todo o sistema ou por pool de memória.

  * Compilação de métodos: início e fim da compilação de métodos, e carregamento e descarregamento de métodos.

  * Sondagens de monitor: eventos de espera, eventos de notificação, entrada e saída de monitor contencioso.

  * Rastreamento de aplicação: entrada e retorno de método, alocação de um objeto Java.

Para chamar código Java a partir de código nativo, o código nativo deve fazer uma chamada através da interface JNI. O provedor `hotspot_jni` gerencia sondas DTrace no ponto de entrada e no ponto de retorno para cada um dos métodos que a interface JNI fornece para invocar código Java e examinar o estado da VM.

Nos pontos de sonda, você pode imprimir o stack trace da thread atual usando a função embutida ustack. Esta função imprime nomes de métodos Java além de nomes de funções nativas C/C++. O exemplo a seguir é um script D simples que imprime um stack trace completo sempre que uma thread chama a chamada de sistema read.
```
    #!/usr/sbin/dtrace -s
    syscall::read:entry 
    /pid == $1 && tid == 1/ {    
       ustack(50, 0x2000);
    }
    
```

O script do exemplo anterior é armazenado em um arquivo chamado `read.d` e é executado especificando o PID do processo Java que está sendo rastreado, conforme mostrado no exemplo a seguir.
```
    read.d pid
    
```

Se sua aplicação Java gerou muita E/S ou teve alguma latência inesperada, a ferramenta DTrace e sua ação ustack() podem ajudá-lo a diagnosticar o problema.

### Ferramentas de Diagnóstico Personalizadas

O JDK possui APIs extensas para desenvolver ferramentas personalizadas para observar, monitorar, perfilar, depurar e diagnosticar problemas em aplicações que são implantadas no ambiente de tempo de execução Java.

O desenvolvimento de novas ferramentas está além do escopo deste documento. Em vez disso, esta seção fornece uma breve visão geral das APIs disponíveis.

Todos os pacotes mencionados nesta seção são descritos na [especificação da API Java SE](<https://docs.oracle.com/en/java/javase/24/docs/api/index.html>).

Consulte o código de exemplo e demonstração que está incluído no download do JDK.

As seções a seguir descrevem pacotes, classes de interface e o depurador Java que podem ser usados como ferramentas de diagnóstico personalizadas para solução de problemas.

  * [O Pacote java.lang.management](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [O Pacote java.lang.instrument](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [A Classe java.lang.Thread](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [Interface de Ferramentas da JVM](<#/doc/guides/troubleshoot/diagnostic-tools>)

  * [Arquitetura do Depurador da Plataforma Java](<#/doc/guides/troubleshoot/diagnostic-tools>)

#### O Pacote java.lang.management

O pacote `java.lang.management` fornece a interface de gerenciamento para o monitoramento e gerenciamento da JVM e do sistema operacional.

Especificamente, ele abrange interfaces para os seguintes sistemas:

  * Carregamento de classes

  * Compilação

  * Garbage collection

  * Gerenciador de memória

  * Tempo de execução

  * Threads

Além do pacote `java.lang.management`, a versão do JDK inclui extensões de plataforma no pacote `com.sun.management`. As extensões de plataforma incluem uma interface de gerenciamento para obter estatísticas detalhadas de garbage collectors que realizam coletas em ciclos. Essas extensões também incluem uma interface de gerenciamento para obter estatísticas de memória adicionais do sistema operacional.

#### O Pacote java.lang.instrument

O pacote `java.lang.instrument` fornece serviços que permitem que os agentes da linguagem de programação Java instrumentem programas em execução na JVM.

A instrumentação é usada por ferramentas como profilers, ferramentas para rastrear chamadas de método e muitas outras. O pacote facilita tanto a instrumentação em tempo de carregamento quanto a dinâmica. Ele também inclui métodos para obter informações sobre as classes carregadas e informações sobre a quantidade de armazenamento consumida por um determinado objeto.

#### A Classe java.lang.Thread

A classe `java.lang.Thread` possui um método estático chamado getAllStackTraces, que retorna um mapa de stack traces para todas as threads ativas.

A classe `Thread` também possui um método chamado getState, que retorna o estado da thread; os estados são definidos pela enumeração `java.lang.Thread.State`. Esses métodos podem ser úteis ao adicionar recursos de diagnóstico ou monitoramento a uma aplicação.

#### Interface de Ferramentas da JVM

A Interface de Ferramentas da JVM (JVM TI) é uma interface de programação nativa (C/C++) que pode ser usada por uma ampla gama de ferramentas de desenvolvimento e monitoramento.

A JVM TI fornece uma interface para toda a gama de ferramentas que precisam de acesso ao estado da VM, incluindo, mas não se limitando a, profiling, depuração, monitoramento, análise de threads e ferramentas de análise de cobertura.

Alguns exemplos de agentes que dependem da JVM TI são os seguintes:

  * Java Debug Wire Protocol (JDWP)

  * O pacote `java.lang.instrument`

A especificação para JVM TI pode ser encontrada na documentação da [Interface de Ferramentas da JVM](<https://docs.oracle.com/en/java/javase/24/docs/specs/jvmti.html>).

#### Arquitetura do Depurador da Plataforma Java

A Arquitetura do Depurador da Plataforma Java (JPDA) é a arquitetura projetada para uso por depuradores e ferramentas semelhantes a depuradores.

A [Arquitetura do Depurador da Plataforma Java](<https://docs.oracle.com/en/java/javase/24/docs/specs/jpda/jpda.html>) consiste em duas interfaces de programação e um protocolo de comunicação:

  * A Java Virtual Machine Tool Interface (JVM TI) é a interface para a máquina virtual. Consulte [Interface de Ferramentas da JVM](<#/doc/guides/troubleshoot/diagnostic-tools>).

  * A Java Debug Interface (JDI) define informações e requisições no nível do código do usuário. É uma interface de programação puramente Java para depurar aplicações da linguagem de programação Java. Na JPDA, a JDI é uma visão remota no processo do depurador de uma máquina virtual no processo que está sendo depurado. Ela é implementada pelo front-end, enquanto uma aplicação semelhante a um depurador (por exemplo, IDE, depurador, rastreador ou ferramenta de monitoramento) é o cliente. Consulte o módulo [jdk.jdi](<https://docs.oracle.com/en/java/javase/24/docs/api/jdk.jdi/module-summary.html>).

  * O [Java Debug Wire Protocol (JDWP)](<https://docs.oracle.com/en/java/javase/24/docs/specs/jdwp/jdwp-spec.html>) define o formato das informações e requisições transferidas entre o processo que está sendo depurado e o front-end do depurador, que implementa a JDI.

O utilitário `jdb` está incluído no JDK como um exemplo de depurador de linha de comando. O utilitário `jdb` usa a JDI para iniciar ou conectar-se à VM alvo. Consulte [O Utilitário jdb](<#/doc/guides/troubleshoot/diagnostic-tools>).

Além das ferramentas tradicionais de depuração, a JDI também pode ser usada para desenvolver ferramentas que auxiliam no diagnóstico post-mortem e em cenários onde a ferramenta precisa se conectar a um processo de maneira não cooperativa (por exemplo, um processo travado).

### Ferramentas de Diagnóstico Post-mortem

Lista de ferramentas e opções disponíveis para diagnóstico post-mortem de problemas entre a aplicação e a Java HotSpot VM.

[A Tabela 2-5](<#/doc/guides/troubleshoot/diagnostic-tools>) resume as opções e ferramentas que são projetadas para diagnóstico post-mortem. Se uma aplicação falhar, essas opções e ferramentas podem ser usadas para obter informações adicionais, seja no momento da falha ou posteriormente usando informações do despejo de falha.

Tabela 2-5 Ferramentas de Diagnóstico Post-mortem

Ferramenta ou Opção | Descrição e Uso
---|---
Fatal Error Log | Quando ocorre um erro irrecuperável (fatal), um log de erro é criado. Este arquivo contém informações obtidas no momento do erro fatal. Em muitos casos, é o primeiro item a ser examinado quando ocorre uma falha. Consulte [Log de Erro Fatal](<#/doc/guides/troubleshoot/location-fatal-error-log>).
Opção `-XX:+HeapDumpOnOutOfMemoryError` | Esta opção de linha de comando especifica a geração de um heap dump quando a VM detecta um erro nativo de falta de memória. Consulte [A Opção -XX:HeapDumpOnOutOfMemoryError](<#/doc/guides/troubleshoot/command-line-options1>).
Opção `-XX:OnError` | Esta opção de linha de comando especifica uma sequência de scripts ou comandos fornecidos pelo usuário a serem executados quando ocorre um erro fatal. Por exemplo, no Windows, esta opção pode executar um comando para forçar um despejo de falha. Esta opção é muito útil em sistemas onde um depurador post-mortem não está configurado. Consulte [A Opção -XX:OnError](<#/doc/guides/troubleshoot/command-line-options1>).
Opção `-XX:+ShowMessageBoxOnError` | Esta opção de linha de comando suspende um processo quando ocorre um erro fatal. Dependendo da resposta do usuário, a opção pode iniciar o depurador nativo (por exemplo, `dbx`, `gdb`, `msdev`) para se conectar à VM. Consulte [A Opção -XX:ShowMessageBoxOnError](<#/doc/guides/troubleshoot/command-line-options1>).
Outras opções `-XX` | Várias outras opções de linha de comando `-XX` podem ser úteis na solução de problemas. Consulte [Outras Opções -XX](<#/doc/guides/troubleshoot/command-line-options1>).
Utilitário `jhsdb jinfo` | Este utilitário pode obter informações de configuração de um arquivo core obtido de uma falha ou de um arquivo core obtido usando o utilitário `gcore`. Consulte [O Utilitário jinfo](<#/doc/guides/troubleshoot/diagnostic-tools>).
Utilitário `jhsdb jmap` | Este utilitário pode obter informações de mapa de memória, incluindo um histograma da heap, de um arquivo core obtido de uma falha ou de um arquivo core obtido usando o utilitário `gcore`. Consulte [O Utilitário jmap](<#/doc/guides/troubleshoot/diagnostic-tools>).
Utilitário `jstack` | Este utilitário pode obter informações de pilha Java e nativa de um processo Java. No sistema operacional Linux, o utilitário também pode obter as informações de um arquivo core ou de um servidor de depuração remoto. Consulte [O Utilitário jstack](<#/doc/guides/troubleshoot/diagnostic-tools>).
Ferramentas Nativas | Cada sistema operacional possui ferramentas e utilitários nativos que podem ser usados para diagnóstico post-mortem. Consulte [Ferramentas Nativas do Sistema Operacional](<#/doc/guides/troubleshoot/diagnostic-tools>).

### Ferramentas para Processos Travados

Ferramentas e opções para diagnosticar problemas entre a aplicação e a Java HotSpot VM em um processo travado estão disponíveis no JDK e no sistema operacional.

[Tabela 2-6](<#/doc/guides/troubleshoot/diagnostic-tools>) resume as opções e ferramentas que podem ajudar em cenários envolvendo um processo travado ou em deadlock. Essas ferramentas não exigem nenhuma opção especial para iniciar a aplicação.

JDK Mission Control, Flight Recorder e o utilitário `jcmd` podem ser usados para diagnosticar problemas com JVM e aplicações Java. Sugere-se usar o utilitário mais recente, `jcmd`, em vez dos utilitários anteriores `jstack`, `jinfo` e `jmap` para diagnósticos aprimorados e sobrecarga de desempenho reduzida.

Tabela 2-6 Ferramentas para Processos Travados

Ferramenta ou Opção | Descrição e Uso
---|---
Manipulador Ctrl+Break (Control+\ ou `kill -QUIT pid` no sistema operacional Linux, e Control+Break no Windows) | Esta combinação de teclas executa um thread dump e detecção de deadlock. O manipulador Ctrl+Break pode opcionalmente imprimir uma lista de locks concorrentes e seus proprietários, bem como um heap histogram. Consulte [Manipulador Control+Break](<#/doc/guides/troubleshoot/diagnostic-tools>).
utilitário `jcmd` | Este utilitário é usado para enviar requisições de comandos de diagnóstico para a JVM, onde essas requisições são úteis para controlar gravações do Flight Recorder. As gravações são usadas para solucionar e diagnosticar eventos de gravação de voo. Consulte [O Utilitário jcmd](<#/doc/guides/troubleshoot/diagnostic-tools>).
utilitário `jdb` | O suporte ao debugger inclui conectores de anexação, que permitem que `jdb` e outros debuggers da linguagem Java se anexem a um processo. Isso pode ajudar a mostrar o que cada thread está fazendo no momento de um travamento ou deadlock. Consulte [O Utilitário jdb](<#/doc/guides/troubleshoot/diagnostic-tools>).
utilitário `jinfo` | Este utilitário pode obter informações de configuração de um processo Java. Consulte [O Utilitário jinfo](<#/doc/guides/troubleshoot/diagnostic-tools>).
utilitário `jmap` | Este utilitário pode obter informações do mapa de memória, incluindo um heap histogram, de um processo Java. O utilitário `jhsdb jmap` pode ser usado se o processo estiver travado. Consulte [O Utilitário jmap](<#/doc/guides/troubleshoot/diagnostic-tools>).
utilitário `jstack` | Este utilitário pode obter informações de stack Java e nativa de um processo Java. Consulte [O Utilitário jstack](<#/doc/guides/troubleshoot/diagnostic-tools>).
Ferramentas Nativas | Cada sistema operacional possui ferramentas e utilitários nativos que podem ser úteis em situações de travamento ou deadlock. Consulte [Ferramentas Nativas do Sistema Operacional](<#/doc/guides/troubleshoot/diagnostic-tools>).

### Ferramentas de Monitoramento

Ferramentas e opções para monitorar aplicações em execução e detectar problemas estão disponíveis no JDK e no sistema operacional.

As ferramentas listadas na [Tabela 2-7](<#/doc/guides/troubleshoot/diagnostic-tools>) são projetadas para monitorar aplicações que estão em execução.

JDK Mission Control, Flight Recorder e o utilitário `jcmd` podem ser usados para diagnosticar problemas com JVM e aplicações Java. Sugere-se usar o utilitário mais recente, `jcmd`, em vez dos utilitários anteriores `jstack`, `jinfo` e `jmap` para diagnósticos aprimorados e sobrecarga de desempenho reduzida.

Tabela 2-7 Ferramentas de Monitoramento

Ferramenta ou Opção | Descrição e Uso
---|---
JDK Mission Control | JDK Mission Control (JMC) é uma plataforma de ferramentas de profiling e diagnóstico do JDK para HotSpot JVM. É um conjunto de ferramentas para monitoramento básico, gerenciamento e profiling e diagnóstico em tempo de produção com alto desempenho. O JMC minimiza a sobrecarga de desempenho que geralmente é um problema com ferramentas de profiling.
utilitário `jcmd` | Este utilitário é usado para enviar requisições de comandos de diagnóstico para a JVM, onde essas requisições são úteis para controlar gravações do Flight Recorder. As gravações são usadas para solucionar e diagnosticar aplicações JVM e Java com eventos de gravação de voo. Consulte [O Utilitário jcmd](<#/doc/guides/troubleshoot/diagnostic-tools>).
utilitário JConsole | Este utilitário é uma ferramenta de monitoramento baseada em Java Management Extensions (JMX). A ferramenta usa a instrumentação JMX integrada na Java Virtual Machine para fornecer informações sobre o desempenho e o consumo de recursos de aplicações em execução. Consulte [JConsole](<#/doc/guides/troubleshoot/diagnostic-tools>).
utilitário `jmap` | Este utilitário pode obter informações do mapa de memória, incluindo um heap histogram, de um processo Java ou de um arquivo core. Consulte [O Utilitário jmap](<#/doc/guides/troubleshoot/diagnostic-tools>).
utilitário `jps` | Este utilitário lista as Java HotSpot VMs instrumentadas no sistema de destino. O utilitário é muito útil em ambientes onde a VM está embarcada, ou seja, é iniciada usando a JNI Invocation API em vez do launcher `java`. Consulte [O Utilitário jps](<#/doc/guides/troubleshoot/diagnostic-tools>).
utilitário `jstack` | Este utilitário pode obter informações de stack Java e nativa de um processo Java ou de um arquivo core. Consulte [O Utilitário jstack](<#/doc/guides/troubleshoot/diagnostic-tools>).
utilitário `jstat` | Este utilitário usa a instrumentação integrada no Java para fornecer informações sobre o desempenho e o consumo de recursos de aplicações em execução. A ferramenta pode ser usada ao diagnosticar problemas de desempenho, especialmente aqueles relacionados ao dimensionamento do heap e ao garbage collection. Consulte [O Utilitário jstat](<#/doc/guides/troubleshoot/diagnostic-tools>).
daemon `jstatd` | Esta ferramenta é uma aplicação de servidor Remote Method Invocation (RMI) que monitora a criação e o término de Java Virtual Machines instrumentadas e fornece uma interface para permitir que ferramentas de monitoramento remoto se anexem a VMs em execução no host local. Consulte [O Daemon jstatd](<#/doc/guides/troubleshoot/diagnostic-tools>).
utilitário `visualgc` | Este utilitário fornece uma visão gráfica do sistema de garbage collection. Assim como o `jstat`, ele usa a instrumentação integrada da Java HotSpot VM. Consulte [A Ferramenta visualgc](<#/doc/guides/troubleshoot/diagnostic-tools>).
Ferramentas Nativas | Cada sistema operacional possui ferramentas e utilitários nativos que podem ser úteis para fins de monitoramento. Consulte [Ferramentas Nativas do Sistema Operacional](<#/doc/guides/troubleshoot/diagnostic-tools>).

### Outras Ferramentas, Opções, Variáveis e Propriedades

Ferramentas, opções, variáveis e propriedades gerais de solução de problemas que podem ajudar a diagnosticar questões estão disponíveis no JDK e no sistema operacional.

Além das ferramentas projetadas para tipos específicos de problemas, as ferramentas, opções, variáveis e propriedades listadas na [Tabela 2-8](<#/doc/guides/troubleshoot/diagnostic-tools>) podem ajudar no diagnóstico de outras questões.

JDK Mission Control, Flight Recorder e o utilitário `jcmd` podem ser usados para diagnosticar problemas com JVM e aplicações Java. Sugere-se usar o utilitário mais recente, `jcmd`, em vez dos utilitários anteriores `jstack`, `jinfo` e `jmap` para diagnósticos aprimorados e sobrecarga de desempenho reduzida.

Tabela 2-8 Ferramentas e Opções Gerais de Solução de Problemas

Ferramenta ou Opção | Descrição e Uso
---|---
JDK Mission Control | JDK Mission Control (JMC) é uma plataforma de ferramentas de profiling e diagnóstico do JDK para HotSpot JVM. É um conjunto de ferramentas para monitoramento básico, gerenciamento e profiling e diagnóstico em tempo de produção com alto desempenho. O JMC minimiza a sobrecarga de desempenho que geralmente é um problema com ferramentas de profiling.
utilitário `jcmd` | Este utilitário é usado para enviar requisições de comandos de diagnóstico para a JVM, onde essas requisições são úteis para controlar gravações do Flight Recorder. As gravações são usadas para solucionar e diagnosticar aplicações JVM e Java com eventos de gravação de voo.
utilitário `jinfo` | Este utilitário pode definir, remover e alterar dinamicamente os valores de certas flags da JVM para um processo Java especificado. Em sistemas operacionais Linux, ele também pode imprimir informações de configuração.
utilitário `jrunscript` | Este utilitário é um shell de script de linha de comando, que suporta execução de script nos modos interativo e em lote.
opção `-Xcheck:jni` | Esta opção é útil para diagnosticar problemas com aplicações que usam a Java Native Interface (JNI) ou que empregam bibliotecas de terceiros (alguns drivers JDBC, por exemplo). Consulte [A Opção -Xcheck:jni](<#/doc/guides/troubleshoot/command-line-options1>).
opção `-verbose:class` | Esta opção habilita o registro de carregamento e descarregamento de classes. Consulte [A Opção -verbose:class](<#/doc/guides/troubleshoot/command-line-options1>).
opção `-verbose:gc` | Esta opção habilita o registro de informações de garbage collection. Consulte [A Opção -verbose:gc](<#/doc/guides/troubleshoot/command-line-options1>).
opção `-verbose:jni` | Esta opção habilita o registro de JNI. Consulte [A Opção -verbose:jni](<#/doc/guides/troubleshoot/command-line-options1>).
variável de ambiente `JAVA_TOOL_OPTIONS` | Esta variável de ambiente permite especificar a inicialização de ferramentas, especificamente o lançamento de agentes de linguagem de programação nativa ou Java usando as opções `-agentlib` ou `-javaagent`. Consulte [Variáveis de Ambiente e Propriedades do Sistema](<#/doc/guides/troubleshoot/environment-variables-and-system-properties>).
propriedade de sistema `java.security.debug` | Esta propriedade de sistema controla se as verificações de segurança no ambiente de tempo de execução Java imprimem mensagens de rastreamento durante a execução. Consulte [A Propriedade de Sistema java.security.debug](<#/doc/guides/troubleshoot/environment-variables-and-system-properties>).

### O Daemon jstatd

O daemon `jstatd` é uma aplicação de servidor RMI que monitora a criação e o término de cada Java HotSpot instrumentada, e fornece uma interface para permitir que ferramentas de monitoramento remoto se anexem a JVMs em execução no host local.

Por exemplo, este daemon permite que o utilitário `jps` liste processos em um sistema remoto.

Nota:

A instrumentação não é acessível em sistemas de arquivos FAT32.