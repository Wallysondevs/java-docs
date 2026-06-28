# Prepare o Java para Solução de Problemas

## 1 Prepare o Java para Solução de Problemas

Esta seção fornece algumas diretrizes para configurar o Java e uma aplicação Java para facilitar a solução de problemas. Essas etapas proativas permitem a coleta de dados úteis e ajudam a definir problemas que surgem de uma aplicação.

Tópicos

  * [Atualizar o Java Runtime](<#/doc/guides/troubleshoot/prepare-java-troubleshooting>)
  * [Habilitar Opções e Flags para Solução de Problemas da JVM](<#/doc/guides/troubleshoot/prepare-java-troubleshooting>)
  * [Tornar uma Aplicação Java Mais Fácil de Depurar](<#/doc/guides/troubleshoot/prepare-java-troubleshooting>)
  * [Coletar Dados Relevantes](<#/doc/guides/troubleshoot/prepare-java-troubleshooting>)

### Atualizar o Java Runtime

Use a versão mais recente do Java SE para evitar gastar tempo na solução de problemas do Java SE que já foram corrigidos. Frequentemente, um problema causado por um bug no Java runtime é corrigido na versão de atualização mais recente. Trabalhar com a versão mais recente do Java SE ajuda a evitar alguns problemas conhecidos e comuns.

Nota:

Dependendo da sua situação ou circunstâncias, pode não ser possível atualizar ou fazer upgrade para a versão mais recente do Java SE.

### Habilitar Opções e Flags para Solução de Problemas da JVM

Configure opções e flags da JVM para permitir a coleta de dados relevantes para a solução de problemas.

Os dados que você coleta dependem do sistema operacional e do tipo de problema que você está tendo ou espera ter. Considere coletar os seguintes dados:

  1. Habilitar core files: Se o Java travar, o OS pode salvar um core file no disco. Um core file é um dump completo do uso de memória da aplicação. A criação de core files é tipicamente desabilitada por padrão. Consulte o administrador do seu sistema ou a documentação do OS para detalhes sobre como habilitar a produção de core files.

Por exemplo, no Linux, os core files às vezes são desabilitados por padrão. Para habilitar core files no Linux, geralmente é suficiente executar o `ulimit -c unlimited` antes de iniciar o comando da aplicação. Alguns sistemas podem ter diferentes maneiras de lidar com esses limites.

Nota:

Core files podem ocupar muito espaço em disco, dependendo do uso de memória da aplicação.

Core files fornecem informações detalhadas sobre o estado de uma aplicação no momento de uma falha. Eles nem sempre são úteis para diagnosticar um problema, mas são inestimáveis quando necessários. Como as falhas são frequentemente difíceis de reproduzir, ter core files da aplicação habilitados pode economizar tempo e fornecer informações valiosas. Cabe a você e à sua organização decidir se o seu sistema pode atender aos requisitos potenciais de espaço.

  2. Adicione -XX:+HeapDumpOnOutOfMemoryError às flags da JVM: A flag `-XX:+HeapDumpOnOutOfMemoryError` salva um heap dump do Java no disco se a aplicação encontrar um `OutOfMemoryError`.

Um heap dump fornece informações sobre a porção do uso de memória de uma aplicação que é gerenciada diretamente pela JVM. Assim como os core files, os heap dumps podem ser muito grandes. Um heap dump pode identificar se parte de uma aplicação está crescendo desproporcionalmente ao restante, o que pode causar um OutOfMemoryError.

  3. Execute uma gravação de voo contínua: Configure o Java para rodar com uma gravação de voo contínua.

Gravações de voo contínuas fornecem um registro baseado em arquivo de eventos da JVM. Isso oferece um meio de baixo overhead para monitorar uma aplicação Java que pode ser usado em caso de um problema. Veja [Produzir uma Gravação de Voo](<#/doc/guides/troubleshoot/diagnostic-tools>) para saber como configurar tais gravações.

  4. Adicione a opção de linha de comando -Xlog:gc*: A opção `-Xlog:gc` imprime informações detalhadas sobre a garbage collection, o que ajuda a diagnosticar problemas de desempenho e gerenciamento de memória da aplicação.

Veja [Habilitar Logging com o JVM Unified Logging Framework](<#/>) na documentação do comando `java` para mais informações sobre esta opção e outras informações que o JVM Unified Logging Framework pode imprimir.

Nota:

Criar um arquivo de log de garbage collection discreto facilita a leitura. Ele também persiste após uma falha ou reinício da aplicação. Configurar a rotação de logs permite gerenciar a quantidade de informações retidas e por quanto tempo. Veja [-Xlog Output](<#/>) na documentação do comando `java` para saber como fazer isso.

  5. Imprima a versão do Java e as flags da JVM: O Suporte Oracle, e até mesmo fóruns, pedem a versão exata do Java que sua aplicação usa e suas flags da JVM.

Execute `java -version` na linha de comando para obter a versão padrão do Java do seu sistema. Se sua aplicação iniciar com um script, leia-o e quaisquer arquivos de configuração associados para descobrir se sua aplicação está usando algo diferente da versão padrão do Java. Alternativamente, adicione `-XX:PrintFlagsFinal` e `-showversion` aos argumentos da JVM da sua aplicação, reinicie sua aplicação e leia os logs da aplicação para os resultados.

  6. Configure Java Management Extensions (JMX) para monitoramento remoto: JMX é um framework para monitorar aplicações Java. É tipicamente usado através de ferramentas como Mission Control ou VisualVM. Garantir que a aplicação esteja aberta para monitoramento remoto ajuda se você não tiver acesso direto à aplicação ou ao seu sistema. Não há overhead para abrir o JMX para acesso remoto. Para fazer isso, adicione `com.sun.management.jmxremote.port=portNum` às flags da JVM da aplicação e, em seguida, reinicie sua aplicação. Veja [Monitoramento e Gerenciamento Usando a Tecnologia JMX](<#/>) no Guia de Monitoramento e Gerenciamento do Java Platform, Standard Edition para detalhes.

### Tornar uma Aplicação Java Mais Fácil de Depurar

Usar um framework de logging é uma boa maneira de habilitar a depuração futura.

Se você encontrar problemas em um módulo específico, você deve ser capaz de habilitar o logging nesse módulo. Também é bom especificar diferentes níveis de logging, por exemplo, info, debug e trace. Para mais informações sobre logging em Java, veja [Visão Geral do Logging em Java](<#/>).

### Coletar Dados Relevantes

Se sua aplicação encontrar um problema e você quiser iniciar o processo de depuração, coletar dados sobre o problema é o primeiro passo. Isso é especialmente verdadeiro, pois reiniciar uma aplicação ou sistema moverá ou excluirá arquivos.

  * Se sua aplicação travou, então colete estes arquivos:

    * Core files
    * Arquivo de log de erro fatal: Veja [Localização do Log de Erro Fatal](<#/doc/guides/troubleshoot/location-fatal-error-log>)
    * Logs do Java e da aplicação
    * Heap dumps do Java de `-XX:+HeapDumpOnOutOfMemoryError`
    * Gravações de voo: Se o problema não encerrou a aplicação, despeje as gravações contínuas

  * Se a aplicação parou de responder, então colete estes arquivos:

    * Stack traces: Tire vários stack traces usando `jcmd <pid> Thread.print` antes de reiniciar o sistema
    * Despeje as gravações de voo
    * Core file forçado: Consulte a documentação do seu sistema operacional para saber como forçar um core file