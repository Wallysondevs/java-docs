# Jcmd - Enviar Comandos de Diagnóstico para uma JVM

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Solução de Problemas ](<#/doc/tutorials/jvm/tool/troubleshooting>) > Jcmd - Enviar Comandos de Diagnóstico para uma JVM

**Tutorial Atual**

Jcmd - Enviar Comandos de Diagnóstico para uma JVM

➜

**Próximo na Série**

[Jdb - Corrigindo Bugs em Programas Java](<#/doc/tutorials/jvm/tool/troubleshooting/jdb>)

**Próximo na Série:** [Jdb - Corrigindo Bugs em Programas Java](<#/doc/tutorials/jvm/tool/troubleshooting/jdb>)

# Jcmd - Enviar Comandos de Diagnóstico para uma JVM

## Apresentando Jcmd

[jcmd](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jcmd.html>) - envia requisições de comandos de diagnóstico para uma Java Virtual Machine (JVM) em execução

## Sinopse

_pid_

Quando usado, o utilitário `jcmd` envia a requisição de comando de diagnóstico para o ID do processo Java.

_main-class_

Quando usado, o utilitário `jcmd` envia a requisição de comando de diagnóstico para todos os processos Java com o nome especificado da classe principal.

_command_

O `command` deve ser um comando `jcmd` válido para a JVM selecionada. A lista de comandos disponíveis para `jcmd` é obtida executando o comando `help` (`jcmd` _pid_ `help`) onde _pid_ é o ID do processo Java em execução. Se o _pid_ for `0`, os comandos serão enviados para todos os processos Java. O argumento da classe principal será usado para corresponder, parcial ou totalmente, à classe usada para iniciar o Java. Se nenhuma opção for fornecida, ele lista os identificadores de processo Java em execução com a classe principal e os argumentos de linha de comando que foram usados para iniciar o processo (o mesmo que usar `-l`).

`Perfcounter.print`

Imprime os contadores de desempenho expostos pelo processo Java especificado.

`-f` _filename_

Lê e executa comandos de um arquivo especificado, _filename_.

`-l`

Exibe a lista de identificadores de processo da Java Virtual Machine que não estão sendo executados em um processo docker separado, juntamente com a classe principal e os argumentos de linha de comando que foram usados para iniciar o processo. Se a JVM estiver em um processo docker, você deve usar ferramentas como `ps` para procurar o PID.

**Nota:**

Usar `jcmd` sem argumentos é o mesmo que usar `jcmd -l`.

`-h`

Exibe a ajuda de linha de comando do utilitário `jcmd`.

## Descrição

O utilitário `jcmd` é usado para enviar requisições de comandos de diagnóstico para a JVM. Ele deve ser usado na mesma máquina em que a JVM está sendo executada e ter os mesmos identificadores de usuário e grupo efetivos que foram usados para iniciar a JVM. Cada comando de diagnóstico tem seu próprio conjunto de argumentos. Para exibir a descrição, sintaxe e uma lista de argumentos disponíveis para um comando de diagnóstico, use o nome do comando como argumento. Por exemplo:

Se os argumentos contiverem espaços, você deve envolvê-los com aspas simples ou duplas (' ou "). Além disso, você deve escapar as aspas simples ou duplas com uma barra invertida (\) para evitar que o shell do sistema operacional processe as aspas. Alternativamente, você pode envolver esses argumentos com aspas simples e depois com aspas duplas (ou com aspas duplas e depois com aspas simples).

Se você especificar o identificador de processo (_pid_) ou a classe principal (_main-class_) como o primeiro argumento, o utilitário `jcmd` enviará a requisição de comando de diagnóstico para o processo Java com o identificador especificado ou para todos os processos Java com o nome especificado da classe principal. Você também pode enviar a requisição de comando de diagnóstico para todos os processos Java disponíveis especificando `0` como o identificador de processo.

## Comandos para Jcmd

O _command_ deve ser um comando de diagnóstico `jcmd` válido para a JVM selecionada. A lista de comandos disponíveis para `jcmd` é obtida executando o comando `help` (`jcmd` _pid_ `help`) onde _pid_ é o ID do processo Java em execução. Se o _pid_ for `0`, os comandos serão enviados para todos os processos Java. O argumento da classe principal será usado para corresponder, parcial ou totalmente, à classe usada para iniciar o Java. Se nenhuma opção for fornecida, ele lista os identificadores de processo Java em execução que não estão em processos docker separados, juntamente com a classe principal e os argumentos de linha de comando que foram usados para iniciar o processo (o mesmo que usar `-l`).

Os seguintes comandos estão disponíveis:

Para mais informações sobre um comando específico.

_arguments_ :

  * _command name_ : O nome do comando para o qual queremos ajuda (STRING, sem valor padrão)

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `-all`: (Opcional) Mostra ajuda para todos os comandos (BOOLEAN, false) .

`Compiler.codecache`

Imprime o layout e os limites do cache de código.

Impacto: Baixo

Permissão: `java.lang.management.ManagementPermission(monitor)`

`Compiler.codelist`

Imprime todos os métodos compilados no cache de código que estão ativos.

Impacto: Médio

Permissão: `java.lang.management.ManagementPermission(monitor)`

`Compiler.queue`

Imprime métodos enfileirados para compilação.

Impacto: Baixo

Permissão: `java.lang.management.ManagementPermission(monitor)`

`Compiler.directives_add *filename* *arguments*`

Adiciona diretivas do compilador de um arquivo.

Impacto: Baixo

Permissão: `java.lang.management.ManagementPermission(monitor)`

_arguments_ :

_filename_ : O nome do arquivo de diretivas (STRING, sem valor padrão)

`Compiler.directives_clear`

Remove todas as diretivas do compilador.

Impacto: Baixo

Permissão: `java.lang.management.ManagementPermission(monitor)`

`Compiler.directives_print`

Imprime todas as diretivas do compilador ativas.

Impacto: Baixo

Permissão: `java.lang.management.ManagementPermission(monitor)`

`Compiler.directives_remove`

Remove a última diretiva do compilador adicionada.

Impacto: Baixo

Permissão: `java.lang.management.ManagementPermission(monitor)`

`GC.class_histogram` _options_

Fornece estatísticas sobre o uso da heap Java.

Impacto: Alto --- depende do tamanho e conteúdo da heap Java.

Permissão: `java.lang.management.ManagementPermission(monitor)`

**Nota:**

As _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `-all`: (Opcional) Inspeciona todos os objetos, incluindo objetos inalcançáveis (BOOLEAN, false)

`GC.finalizer_info`

Fornece informações sobre a fila de finalização Java.

Impacto: Médio

Permissão: `java.lang.management.ManagementPermission(monitor)`

`GC.heap_dump` _options_ _arguments_

Gera um dump da heap Java no formato HPROF.

Impacto: Alto --- depende do tamanho e conteúdo da heap Java. Solicita um GC completo, a menos que a opção `-all` seja especificada.

Permissão: `java.lang.management.ManagementPermission(monitor)`

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `-all`: (Opcional) Despeja todos os objetos, incluindo objetos inalcançáveis (BOOLEAN, false)

_arguments_ :

  * _filename_ : O nome do arquivo de dump (STRING, sem valor padrão)

`GC.heap_info`

Fornece informações genéricas da heap Java.

Impacto: Médio

Permissão: `java.lang.management.ManagementPermission(monitor)`

`GC.run`

Chama `java.lang.System.gc()`.

Impacto: Médio --- depende do tamanho e conteúdo da heap Java.

`GC.run_finalization`

Chama `java.lang.System.runFinalization()`.

Impacto: Médio --- depende do conteúdo Java.

`JFR.check` _options_

Mostra informações sobre uma gravação de voo em execução

Impacto: Baixo

**Nota:**

As _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_. Se nenhum parâmetro for inserido, as informações para todas as gravações ativas serão mostradas.

_options_ :

  * `name`: (Opcional) Nome da gravação de voo. (STRING, sem valor padrão)

  * `verbose`: (Opcional) Flag para imprimir as configurações de evento para a gravação (BOOLEAN, false)

`JFR.configure` _options_

Define os parâmetros para uma gravação de voo

Impacto: Baixo

**Nota:**

As _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_. Se nenhum parâmetro for inserido, as configurações atuais serão exibidas.

_options_ :

  * `globalbuffercount`: (Opcional) Número de buffers globais. Esta opção é uma opção legada: altere o parâmetro `memorysize` para modificar o número de buffers globais. Este valor não pode ser alterado uma vez que o JFR tenha sido inicializado. (STRING, padrão determinado pelo valor de `memorysize`)

  * `globalbuffersize`: (Opcional) Tamanho dos buffers globais, em bytes. Esta opção é uma opção legada: altere o parâmetro `memorysize` para modificar o tamanho dos buffers globais. Este valor não pode ser alterado uma vez que o JFR tenha sido inicializado. (STRING, padrão determinado pelo valor de `memorysize`)

  * `maxchunksize`: (Opcional) Tamanho máximo de um bloco de dados individual em bytes se um dos seguintes sufixos não for usado: 'm' ou 'M' para megabytes OU 'g' ou 'G' para gigabytes. Este valor não pode ser alterado uma vez que o JFR tenha sido inicializado. (STRING, 12M)

  * `memorysize`: (Opcional) Tamanho total da memória, em bytes se um dos seguintes sufixos não for usado: 'm' ou 'M' para megabytes OU 'g' ou 'G' para gigabytes. Este valor não pode ser alterado uma vez que o JFR tenha sido inicializado. (STRING, 10M)

  * `repositorypath`: (Opcional) Caminho para o local onde as gravações são armazenadas até serem gravadas em um arquivo permanente. (STRING, O local padrão é o diretório temporário do sistema operacional. Em sistemas operacionais Linux, o diretório temporário é `/tmp`. No Windows, o diretório temporário é especificado pela variável de ambiente `TMP`.)

  * `stackdepth`: (Opcional) Profundidade da pilha para stack traces. Definir este valor maior que o padrão de 64 pode causar uma degradação de desempenho. Este valor não pode ser alterado uma vez que o JFR tenha sido inicializado. (LONG, 64)

  * `thread_buffer_size`: (Opcional) Tamanho do buffer local para cada thread em bytes se um dos seguintes sufixos não for usado: 'k' ou 'K' para kilobytes ou 'm' ou 'M' para megabytes. Sobrescrever este parâmetro pode reduzir o desempenho e não é recomendado. Este valor não pode ser alterado uma vez que o JFR tenha sido inicializado. (STRING, 8k)

  * `samplethreads`: (Opcional) Flag para ativar a amostragem de threads. (BOOLEAN, true)

`JFR.dump` _options_

Grava dados em um arquivo enquanto uma gravação de voo está em execução

Impacto: Baixo

**Nota:**

As _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_. Nenhuma opção é necessária. A gravação continua a ser executada após os dados serem gravados.

_options_ :

  * `begin`: (Opcional) Especifica o tempo a partir do qual os dados de gravação serão incluídos no arquivo de dump. O formato é especificado como hora local. (STRING, sem valor padrão)

  * `end`: (Opcional) Especifica o tempo até o qual os dados de gravação serão incluídos no arquivo de dump. O formato é especificado como hora local. (STRING, sem valor padrão)

**Nota:** Para `begin` e `end`, o tempo deve estar em um formato que possa ser lido por java.time.LocalTime::parse(STRING), java.time.LocalDateTime::parse(STRING) ou java.time.Instant::parse(STRING). Por exemplo, "13:20:15", "2020-03-17T09:00:00" ou "2020-03-17T09:00:00Z".

**Nota:** Os tempos `begin` e `end` correspondem aos carimbos de data/hora encontrados nas informações gravadas nos dados da gravação de voo.

Outra opção é usar um tempo relativo ao tempo atual que é especificado por um inteiro negativo seguido por "s", "m" ou "h". Por exemplo, "-12h", "-15m" ou "-30s"

  * `filename`: (Opcional) Nome do arquivo para o qual os dados da gravação de voo são despejados. Se nenhum nome de arquivo for fornecido, um nome de arquivo é gerado a partir do PID e da data atual. O nome do arquivo também pode ser um diretório, caso em que o nome do arquivo é gerado a partir do PID e da data atual no diretório especificado. (STRING, sem valor padrão)

  * `maxage`: (Opcional) Duração para despejar os dados da gravação de voo em um arquivo. (INTEIRO seguido por 's' para segundos, 'm' para minutos ou 'h' para horas, sem valor padrão)

  * `maxsize`: (Opcional) Tamanho máximo para a quantidade de dados a serem despejados de uma gravação de voo em bytes se um dos seguintes sufixos não for usado: 'm' ou 'M' para megabytes OU 'g' ou 'G' para gigabytes. (STRING, sem valor padrão)

  * `name`: (Opcional) Nome da gravação. Se nenhum nome for fornecido, os dados de todas as gravações são despejados. (STRING, sem valor padrão)

  * `path-to-gc-root`: (Opcional) Flag para salvar o caminho para as raízes do garbage collection (GC) no momento em que os dados da gravação são despejados. As informações do caminho são úteis para encontrar vazamentos de memória, mas coletá-las pode fazer com que o aplicativo pause por um curto período de tempo. Ative esta flag apenas quando você tiver um aplicativo que suspeita ter um vazamento de memória. (BOOLEAN, false)

`JFR.start` _options_

Inicia uma gravação de voo

Impacto: Baixo

**Nota:**

As _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_. Se nenhum parâmetro for inserido, uma gravação é iniciada com valores padrão.

_options_ :

  * `delay`: (Opcional) Duração para esperar antes de iniciar a gravação (INTEIRO seguido por 's' para segundos, 'm' para minutos ou 'h' para horas, 0s)

  * `disk`: (Opcional) Flag para também gravar os dados em disco durante a gravação (BOOLEAN, true)

  * `dumponexit`: (Opcional) Flag para gravar a gravação em disco quando a Java Virtual Machine (JVM) é desligada. Se definido como 'true' e nenhum valor for fornecido para `filename`, a gravação é gravada em um arquivo no diretório onde o processo foi iniciado. O nome do arquivo é um nome gerado pelo sistema que contém o ID do processo, o ID da gravação e o carimbo de data/hora atual. (Por exemplo: `id-1-2019_12_12_10_41.jfr`) (BOOLEAN, false)

  * `duration`: (Opcional) Duração da gravação. Note que `0s` significa para sempre (INTEIRO seguido por 's' para segundos, 'm' para minutos ou 'h' para horas, 0s)

  * `filename`: (Opcional) Nome do arquivo para o qual os dados da gravação de voo são gravados quando a gravação é interrompida. Se nenhum nome de arquivo for fornecido, um nome de arquivo é gerado a partir do PID e da data atual e é colocado no diretório onde o processo foi iniciado. O nome do arquivo também pode ser um diretório, caso em que o nome do arquivo é gerado a partir do PID e da data atual no diretório especificado. (STRING, sem valor padrão)

  * `maxage`: (Opcional) Tempo máximo para manter os dados gravados em disco. Este parâmetro é válido apenas quando o parâmetro `disk` é definido como `true`. Note que `0s` significa para sempre. (INTEIRO seguido por 's' para segundos, 'm' para minutos ou 'h' para horas, 0s)

  * `maxsize`: (Opcional) Tamanho máximo dos dados a serem mantidos em disco em bytes se um dos seguintes sufixos não for usado: 'm' ou 'M' para megabytes OU 'g' ou 'G' para gigabytes. Este parâmetro é válido apenas quando o parâmetro `disk` é definido como 'true'. O valor não deve ser menor que o valor do parâmetro `maxchunksize` definido com o comando `JFR.configure`. (STRING, 0 (sem tamanho máximo))

  * `name`: (Opcional) Nome da gravação. Se nenhum nome for fornecido, um nome é gerado. Anote o nome gerado que é mostrado na resposta ao comando para que você possa usá-lo com outros comandos. (STRING, nome padrão gerado pelo sistema)

  * `path-to-gc-root`: (Opcional) Flag para salvar o caminho para as raízes do garbage collection (GC) no final de uma gravação. As informações do caminho são úteis para encontrar vazamentos de memória, mas coletá-las consome tempo. Ative esta flag apenas quando você tiver um aplicativo que suspeita ter um vazamento de memória. Se o parâmetro `settings` for definido como 'profile', as informações coletadas incluem o stack trace de onde o objeto potencialmente vazando foi alocado. (BOOLEAN, false)

  * `settings`: (Opcional) Nome do arquivo de configurações que identifica quais eventos gravar. Para especificar mais de um arquivo, separe os nomes com uma vírgula (','). Inclua o caminho se o arquivo não estiver em `JAVA-HOME`/lib/jfr. Os seguintes perfis estão incluídos no JDK no diretório `JAVA-HOME`/lib/jfr: 'default.jfc': coleta um conjunto predefinido de informações com baixa sobrecarga, portanto, tem impacto mínimo no desempenho e pode ser usado com gravações que são executadas continuamente; 'profile.jfc': Fornece mais dados do que o perfil 'default.jfc', mas com mais sobrecarga e impacto no desempenho. Use esta configuração por curtos períodos de tempo quando mais informações forem necessárias. Use `none` para iniciar uma gravação sem um arquivo de configuração predefinido. (STRING, `JAVA-HOME`/lib/jfr/default.jfc)

`JFR.stop` _options_

Para uma gravação de voo

Impacto: Baixo

**Nota:**

As _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_. Se nenhum parâmetro for inserido, nenhuma gravação será interrompida.

_options_ :

  * `filename`: (Opcional) Nome do arquivo para o qual a gravação é gravada quando a gravação é interrompida. Se nenhum caminho for fornecido, os dados da gravação são descartados. (STRING, sem valor padrão)

  * `name`: (Opcional) Nome da gravação (STRING, sem valor padrão)

`JVMTI.agent_load` _arguments_

Carrega o agente nativo JVMTI.

Impacto: Baixo

Permissão: `java.lang.management.ManagementPermission(control)`

_arguments_ :

  * _library path_ : Caminho absoluto do agente JVMTI a ser carregado. (STRING, sem valor padrão)

  * _agent option_ : (Opcional) String de opção para passar ao agente. (STRING, sem valor padrão)

`JVMTI.data_dump`

Sinaliza à JVM para fazer uma requisição de data-dump para JVMTI.

Impacto: Alto

Permissão: `java.lang.management.ManagementPermission(monitor)`

`ManagementAgent.start` _options_

Inicia o agente de gerenciamento remoto.

Impacto: Baixo --- sem impacto

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `config.file`: (Opcional) Define `com.sun.management.config.file` (STRING, sem valor padrão)

  * `jmxremote.host`: (Opcional) Define `com.sun.management.jmxremote.host` (STRING, sem valor padrão)

  * `jmxremote.port`: (Opcional) Define `com.sun.management.jmxremote.port` (STRING, sem valor padrão)

  * `jmxremote.rmi.port`: (Opcional) Define `com.sun.management.jmxremote.rmi.port` (STRING, sem valor padrão)

  * `jmxremote.ssl`: (Opcional) Define `com.sun.management.jmxremote.ssl` (STRING, sem valor padrão)

  * `jmxremote.registry.ssl`: (Opcional) Define `com.sun.management.jmxremote.registry.ssl` (STRING, sem valor padrão)

  * `jmxremote.authenticate`: (Opcional) Define `com.sun.management.jmxremote.authenticate` (STRING, sem valor padrão)

  * jmxremote.password.file: (Opcional) Define `com.sun.management.jmxremote.password.file` (STRING, sem valor padrão)

  * `jmxremote.access.file`: (Opcional) Define `com.sun.management.jmxremote.acce ss.file` (STRING, sem valor padrão)

  * `jmxremote.login.config`: (Opcional) Define `com.sun.management.jmxremote.log in.config` (STRING, sem valor padrão)

  * `jmxremote.ssl.enabled.cipher.suites`: (Opcional) Define `com.sun.management`.

  * `jmxremote.ssl.enabled.cipher.suite`: (STRING, sem valor padrão)

  * `jmxremote.ssl.enabled.protocols`: (Opcional) Define `com.sun.management.jmxr emote.ssl.enabled.protocols` (STRING, sem valor padrão)

  * `jmxremote.ssl.need.client.auth`: (Opcional) Define `com.sun.management.jmxre mote.need.client.auth` (STRING, sem valor padrão)

  * `jmxremote.ssl.config.file`: (Opcional) Define `com.sun.management.jmxremote. ssl_config_file` (STRING, sem valor padrão)

  * `jmxremote.autodiscovery`: (Opcional) Define `com.sun.management.jmxremote.au todiscovery` (STRING, sem valor padrão)

  * `jdp.port`: (Opcional) Define `com.sun.management.jdp.port` (INT, sem valor padrão)

  * `jdp.address`: (Opcional) Define `com.sun.management.jdp.address` (STRING, sem valor padrão)

  * `jdp.source_addr`: (Opcional) Define `com.sun.management.jdp.source_addr` (STRING, sem valor padrão)

  * `jdp.ttl`: (Opcional) Define `com.sun.management.jdp.ttl` (INT, sem valor padrão)

  * `jdp.pause`: (Opcional) Define `com.sun.management.jdp.pause` (INT, sem valor padrão)

  * `jdp.name`: (Opcional) Define `com.sun.management.jdp.name` (STRING, sem valor padrão)

`ManagementAgent.start_local`

Inicia o agente de gerenciamento local.

Impacto: Baixo --- sem impacto

`ManagementAgent.status`

Imprime o status do agente de gerenciamento.

Impacto: Baixo --- sem impacto

Permissão: `java.lang.management.ManagementPermission(monitor)`

`ManagementAgent.stop`

Para o agente de gerenciamento remoto.

Impacto: Baixo --- sem impacto

`Thread.print` _options_

Imprime todas as threads com stacktraces.

Impacto: Médio --- depende do número de threads.

Permissão: `java.lang.management.ManagementPermission(monitor)`

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `-l`: (Opcional) Imprime locks de `java.util.concurrent` (BOOLEAN, false)

`VM.classloader_stats`

Imprime estatísticas sobre todos os ClassLoaders.

Impacto: Baixo

Permissão: `java.lang.management.ManagementPermission(monitor)`

`VM.class_hierarchy` _options_ _arguments_

Imprime uma lista de todas as classes carregadas, indentadas para mostrar a hierarquia de classes. O nome de cada classe é seguido pelo ClassLoaderData* de seu ClassLoader, ou "null" se for carregada pelo class loader de bootstrap.

Impacto: Médio --- depende do número de classes carregadas.

Permissão: `java.lang.management.ManagementPermission(monitor)`

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `-i`: (Opcional) Interfaces herdadas devem ser impressas. (BOOLEAN, false)

  * `-s`: (Opcional) Se um nome de classe for especificado, ele imprime as subclasses. Se o nome da classe não for especificado, apenas as superclasses são impressas. (BOOLEAN, false)

_arguments_ :

  * _classname_ : (Opcional) O nome da classe cuja hierarquia deve ser impressa. Se não especificado, todas as hierarquias de classes são impressas. (STRING, sem valor padrão)

`VM.command_line`

Imprime a linha de comando usada para iniciar esta instância da VM.

Impacto: Baixo

Permissão: `java.lang.management.ManagementPermission(monitor)`

`VM.dynlibs`

Imprime as bibliotecas dinâmicas carregadas.

Impacto: Baixo

Permissão: `java.lang.management.ManagementPermission(monitor)`

`VM.info`

Imprime informações sobre o ambiente e status da JVM.

Impacto: Baixo

Permissão: `java.lang.management.ManagementPermission(monitor)`

`VM.log` _options_

Lista a configuração de log atual, habilita/desabilita/configura uma saída de log, ou rotaciona todos os logs.

Impacto: Baixo

Permissão: `java.lang.management.ManagementPermission(control)`

_options_ :

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

  * `output`: (Opcional) O nome ou índice (#) da saída a ser configurada. (STRING, sem valor padrão)

  * `output_options`: (Opcional) Opções para a saída. (STRING, sem valor padrão)

  * `what`: (Opcional) Configura quais tags registrar. (STRING, sem valor padrão )

  * `decorators`: (Opcional) Configura quais decoradores usar. Use 'none' ou um valor vazio para remover todos. (STRING, sem valor padrão)

  * `disable`: (Opcional) Desliga todo o registro e limpa a configuração de log. (BOOLEAN, sem valor padrão)

  * `list`: (Opcional) Lista a configuração de log atual. (BOOLEAN, sem valor padrão)

  * `rotate`: (Opcional) Rotaciona todos os logs. (BOOLEAN, sem valor padrão)

`VM.flags` _options_

Imprime as opções de flag da VM e seus valores atuais.

Impacto: Baixo

Permissão: `java.lang.management.ManagementPermission(monitor)`

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `-all`: (Opcional) Imprime todas as flags suportadas pela VM (BOOLEAN, false).

`VM.native_memory` _options_

Imprime o uso de memória nativa

Impacto: Médio

Permissão: `java.lang.management.ManagementPermission(monitor)`

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `summary`: (Opcional) Solicita ao runtime que relate o resumo da memória atual, que inclui a memória total reservada e comprometida, juntamente com o resumo do uso da memória por cada subsistema. (BOOLEAN, false)

  * `detail`: (Opcional) Solicita ao runtime que relate a alocação de memória >= 1K por cada callsite. (BOOLEAN, false)

  * `baseline`: (Opcional) Solicita ao runtime que estabeleça uma linha de base para o uso atual da memória, para que possa ser comparado posteriormente. (BOOLEAN, false)

  * `summary.diff`: (Opcional) Solicita ao runtime que relate a comparação do resumo da memória com a linha de base anterior. (BOOLEAN, false)

  * `detail.diff`: (Opcional) Solicita ao runtime que relate a comparação detalhada da memória com a linha de base anterior, que mostra as atividades de alocação de memória em diferentes callsites. (BOOLEAN, false)

  * `shutdown`: (Opcional) Solicita ao runtime que se desligue e libere a memória usada pelo runtime. (BOOLEAN, false)

  * `statistics`: (Opcional) Imprime estatísticas do rastreador para fins de ajuste. (BOOLEAN, false)

  * `scale`: (Opcional) Uso da memória em qual escala, KB, MB ou GB (STRING, KB)

`VM.print_touched_methods`

Imprime todos os métodos que foram acessados durante a vida útil desta JVM.

Impacto: Médio --- depende do conteúdo Java.

`VM.set_flag` _arguments_

Define a opção de flag da VM usando o valor fornecido.

Impacto: Baixo

Permissão: `java.lang.management.ManagementPermission(control)`

_arguments_ :

  * _flag name_ : O nome da flag que você deseja definir (STRING, sem valor padrão)

  * _string value_ : (Opcional) O valor que você deseja definir (STRING, sem valor padrão)

`VM.stringtable` _options_

Despeja a tabela de strings.

Impacto: Médio --- depende do conteúdo Java.

Permissão: `java.lang.management.ManagementPermission(monitor)`

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `-verbose`: (Opcional) Despeja o conteúdo de cada string na tabela (BOOLEAN, false)

`VM.symboltable` _options_

Despeja a tabela de símbolos.

Impacto: Médio --- depende do conteúdo Java.

Permissão: `java.lang.management.ManagementPermission(monitor)`

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_).

_options_ :

  * `-verbose`: (Opcional) Despeja o conteúdo de cada símbolo na tabela (BOOLEAN, false)

`VM.systemdictionary`

Imprime as estatísticas para os tamanhos da hashtable do dicionário e o comprimento do bucket.

Impacto: Médio

Permissão: `java.lang.management.ManagementPermission(monitor)`

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `verbose`: (Opcional) Despeja o conteúdo de cada entrada do dicionário para todos os class loaders (BOOLEAN, false) .

`VM.system_properties`

Imprime as propriedades do sistema.

Impacto: Baixo

Permissão: `java.util.PropertyPermission(*, read)`

`VM.uptime` _options_

Imprime o tempo de atividade da VM.

Impacto: Baixo

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `-date`: (Opcional) Adiciona um prefixo com a data atual (BOOLEAN, false)

`VM.version`

Imprime informações da versão da JVM.

Impacto: Baixo

Permissão: `java.util.PropertyPermission(java.vm.version, read)`

### Neste tutorial

Apresentando Jcmd Sinopse Descrição Comandos para Jcmd

Última atualização: 14 de setembro de 2021

**Tutorial Atual**

Jcmd - Enviar Comandos de Diagnóstico para uma JVM

➜

**Próximo na Série**

[Jdb - Corrigindo Bugs em Programas Java](<#/doc/tutorials/jvm/tool/troubleshooting/jdb>)

**Próximo na Série:** [Jdb - Corrigindo Bugs em Programas Java](<#/doc/tutorials/jvm/tool/troubleshooting/jdb>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Solução de Problemas ](<#/doc/tutorials/jvm/tool/troubleshooting>) > Jcmd - Enviar Comandos de Diagnóstico para uma JVM