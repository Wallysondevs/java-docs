# O Comando jcmd

## Nome

jcmd - envia requisições de comandos de diagnóstico para uma Java Virtual Machine (JVM) em execução

## Sinopse

`jcmd` [_pid_ | _main-class_] _command_... | `PerfCounter.print` | `-f` _filename_

`jcmd` [`-l`]

`jcmd` `-h`

_pid_
     Quando usado, o utilitário `jcmd` envia a requisição de comando de diagnóstico para o ID do processo Java.
_main-class_
     Quando usado, o utilitário `jcmd` envia a requisição de comando de diagnóstico para todos os processos Java com o nome especificado da classe principal.
_command_
     O `command` deve ser um comando `jcmd` válido para a JVM selecionada. A lista de comandos disponíveis para `jcmd` é obtida executando o comando `help` (`jcmd` _pid_ `help`) onde _pid_ é o ID do processo Java em execução.
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

O utilitário `jcmd` é usado para enviar requisições de comandos de diagnóstico para a JVM. Ele deve ser usado na mesma máquina em que a JVM está em execução e deve ter os mesmos identificadores de usuário e grupo efetivos que foram usados para iniciar a JVM. Cada comando de diagnóstico tem seu próprio conjunto de opções e argumentos. Para exibir a descrição, sintaxe e uma lista de opções e argumentos disponíveis para um comando de diagnóstico, use o nome do comando como argumento. Por exemplo:

> `jcmd` _pid_ `help` _command_

Se os argumentos contiverem espaços, você deve envolvê-los com aspas simples ou duplas (`'` ou `"`). Além disso, você deve escapar as aspas simples ou duplas com uma barra invertida (`\`) para evitar que o shell do sistema operacional processe as aspas. Alternativamente, você pode envolver esses argumentos com aspas simples e depois com aspas duplas (ou com aspas duplas e depois com aspas simples).

Se você especificar o identificador de processo (_pid_) ou a classe principal (_main-class_) como o primeiro argumento, o utilitário `jcmd` enviará a requisição de comando de diagnóstico para o processo Java com o identificador especificado ou para todos os processos Java com o nome especificado da classe principal. Você também pode enviar a requisição de comando de diagnóstico para todos os processos Java disponíveis especificando `0` como o identificador de processo.

## Comandos para jcmd

O _command_ deve ser um comando de diagnóstico `jcmd` válido para a JVM selecionada. A lista de comandos disponíveis para `jcmd` é obtida executando o comando `help` (`jcmd` _pid_ `help`) onde _pid_ é o ID do processo Java em execução. Se o _pid_ for `0`, os comandos serão enviados para todos os processos Java. O argumento da classe principal será usado para corresponder, parcial ou totalmente, à classe usada para iniciar o Java. Se nenhuma opção for fornecida, ele lista os identificadores de processo Java em execução que não estão em processos docker separados, juntamente com a classe principal e os argumentos de linha de comando que foram usados para iniciar o processo (o mesmo que usar `-l`).

Os _commands_ do `jcmd` podem aceitar opções e argumentos. As _options_ são especificadas usando a sintaxe _key_ ou _key_`=`_value_. Os _arguments_ são fornecidos apenas como um valor, nunca name=value.

Os seguintes comandos estão disponíveis:

`help` [_options_] [_arguments_]
    

Para mais informações sobre um comando específico.

_arguments_ :

  * _command name_ : O nome do comando para o qual queremos ajuda (STRING, sem valor padrão)

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `-all`: (Opcional) Mostra ajuda para todos os comandos (BOOLEAN, false) .

`Compiler.CodeHeap_Analytics` [_function_] [_granularity_]
    

Imprime análises do CodeHeap

Impacto: Baixo: Depende do tamanho e conteúdo do code heap. Mantém CodeCache_lock durante a etapa de análise, geralmente com duração de sub-segundo.

_arguments_ :

  * _function_ : (Opcional) Função a ser executada (aggregate, UsedSpace, FreeSpace, MethodCount, MethodSpace, MethodAge, MethodNames, discard (STRING, all)

  * _granularity_ : (Opcional) Nível de detalhe - valor menor -> mais detalhes (INT, 4096)

`Compiler.codecache`
    

Imprime o layout e os limites do code cache.

Impacto: Baixo

`Compiler.codelist`
    

Imprime todos os métodos compilados no code cache que estão ativos.

Impacto: Médio

`Compiler.directives_add` _arguments_
    

Adiciona diretivas do compilador de um arquivo.

Impacto: Baixo

_arguments_ :

  * _filename_ : O nome do arquivo de diretivas (STRING, sem valor padrão)

`Compiler.directives_clear`
    

Remove todas as diretivas do compilador.

Impacto: Baixo

`Compiler.directives_print`
    

Imprime todas as diretivas do compilador ativas.

Impacto: Baixo

`Compiler.directives_remove`
    

Remove a última diretiva do compilador adicionada.

Impacto: Baixo

`Compiler.memory` [_options_]
    

Imprime o footprint de compilação

Impacto: Médio: O tempo de pausa depende do número de métodos compilados

**Nota:**

As _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `-H`: (Opcional) Formato legível por humanos (BOOLEAN, false)
  * `-s`: (Opcional) Tamanho mínimo de memória (MEMORY SIZE, 0)

`Compiler.perfmap` [_arguments_] (Somente Linux)
    

Escreve arquivo de mapa para a ferramenta Linux perf.

Impacto: Baixo

_arguments_ :

  * _filename_ : (Opcional) O nome do arquivo de mapa. Se %p for especificado no nome do arquivo, ele é expandido para o PID da JVM. (FILE, "/tmp/perf-%p.map")

`Compiler.queue`
    

Imprime métodos enfileirados para compilação.

Impacto: Baixo

`GC.class_histogram` [_options_]
    

Fornece estatísticas sobre o uso do heap Java.

Impacto: Alto --- depende do tamanho e conteúdo do heap Java.

**Nota:**

As _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `-all`: (Opcional) Inspeciona todos os objetos, incluindo objetos inalcançáveis (BOOLEAN, false)
  * `-parallel`: (Opcional) Número de threads paralelas a serem usadas para inspeção do heap. 0 (o padrão) significa deixar a VM determinar o número de threads a serem usadas. 1 significa usar uma thread (desabilitar paralelismo). Para qualquer outro valor, a VM tentará usar o número especificado de threads, mas pode usar menos. (INT, 0)

`GC.finalizer_info`
    

Fornece informações sobre a fila de finalização Java.

Impacto: Médio

`GC.heap_dump` [_options_] _filename_
    

Gera um dump do heap Java no formato HPROF.

Impacto: Alto --- depende do tamanho e conteúdo do heap Java. Solicita um GC completo, a menos que a opção `-all` seja especificada.

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `-all`: (Opcional) Faz dump de todos os objetos, incluindo objetos inalcançáveis (BOOLEAN, false)
  * `-gz`: (Opcional) Se especificado, o heap dump é escrito no formato gzipped usando o nível de compressão fornecido. 1 (recomendado) é o mais rápido, 9 a compressão mais forte. (INT, 1)
  * `-overwrite`: (Opcional) Se especificado, o arquivo de dump será sobrescrito se existir (BOOLEAN, false)
  * `-parallel`: (Opcional) Número de threads paralelas a serem usadas para o heap dump. A VM tentará usar o número especificado de threads, mas pode usar menos. (INT, 1)

_arguments_ :

  * _filename_ : O nome do arquivo de dump. Se %p for especificado no nome do arquivo, ele é expandido para o PID da JVM. (FILE, sem valor padrão)

`GC.heap_info`
    

Fornece informações genéricas do heap Java.

Impacto: Médio

`GC.run`
    

Chama `java.lang.System.gc()`.

Impacto: Médio --- depende do tamanho e conteúdo do heap Java.

`GC.run_finalization`
    

Chama `java.lang.System.runFinalization()`.

Impacto: Médio --- depende do conteúdo Java.

`JFR.check` [_options_]
    

Mostra informações sobre uma flight recording em execução

Impacto: Baixo

**Nota:**

As _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_. Se nenhum parâmetro for inserido, as informações para todas as gravações ativas serão mostradas.

_options_ :

  * `name`: (Opcional) Nome da flight recording. (STRING, sem valor padrão)

  * `verbose`: (Opcional) Flag para imprimir as configurações de evento para a gravação (BOOLEAN, false)

`JFR.configure` [_options_]
    

Define os parâmetros para uma flight recording

Impacto: Baixo

**Nota:**

As _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_. Se nenhum parâmetro for inserido, as configurações atuais serão exibidas.

_options_ :

  * `dumppath`: (Opcional) Caminho para o local onde um arquivo de gravação é escrito caso a VM encontre um erro crítico, como uma falha do sistema. (STRING, O local padrão é o diretório atual)

  * `globalbuffercount`: (Opcional) Número de buffers globais. Esta opção é uma opção legada: altere o parâmetro `memorysize` para alterar o número de buffers globais. Este valor não pode ser alterado uma vez que o JFR tenha sido inicializado. (STRING, padrão determinado pelo valor de `memorysize`)

  * `globalbuffersize`: (Opcional) Tamanho dos buffers globais, em bytes. Esta opção é uma opção legada: altere o parâmetro `memorysize` para alterar o tamanho dos buffers globais. Este valor não pode ser alterado uma vez que o JFR tenha sido inicializado. (STRING, padrão determinado pelo valor de `memorysize`)

  * `maxchunksize`: (Opcional) Tamanho máximo de um chunk de dados individual em bytes se um dos seguintes sufixos não for usado: 'm' ou 'M' para megabytes OU 'g' ou 'G' para gigabytes. Este valor não pode ser alterado uma vez que o JFR tenha sido inicializado. (STRING, 12M)

  * `memorysize`: (Opcional) Tamanho total da memória, em bytes se um dos seguintes sufixos não for usado: 'm' ou 'M' para megabytes OU 'g' ou 'G' para gigabytes. Este valor não pode ser alterado uma vez que o JFR tenha sido inicializado. (STRING, 10M)

  * `repositorypath`: (Opcional) Caminho para o local onde as gravações são armazenadas até serem escritas em um arquivo permanente. (STRING, O local padrão é o diretório temporário do sistema operacional. Em sistemas operacionais Linux, o diretório temporário é `/tmp`. No Windows, o diretório temporário é especificado pela variável de ambiente `TMP`.)

  * `preserve-repository=`{`true`|`false`} : Especifica se os arquivos armazenados no repositório em disco devem ser mantidos após a saída da JVM. Se false, os arquivos são excluídos. Por padrão, este parâmetro está desabilitado.

  * `stackdepth`: (Opcional) Profundidade da stack para stack traces. Definir este valor maior que o padrão de 64 pode causar uma degradação de desempenho. Este valor não pode ser alterado uma vez que o JFR tenha sido inicializado. (LONG, 64)

  * `thread_buffer_size`: (Opcional) Tamanho do buffer local para cada thread em bytes se um dos seguintes sufixos não for usado: 'k' ou 'K' para kilobytes ou 'm' ou 'M' para megabytes. Sobrescrever este parâmetro pode reduzir o desempenho e não é recomendado. Este valor não pode ser alterado uma vez que o JFR tenha sido inicializado. (STRING, 8k)

  * `samplethreads`: (Opcional) Flag para ativar a amostragem de threads. (BOOLEAN, true)

`JFR.dump` [_options_]
    

Escreve dados em um arquivo enquanto uma flight recording está em execução

Impacto: Baixo

**Nota:**

As _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_. Nenhuma opção é necessária. A gravação continua a ser executada após os dados serem escritos.

_options_ :

  * `begin`: (Opcional) Especifica o tempo a partir do qual os dados da gravação serão incluídos no arquivo de dump. O formato é especificado como hora local. (STRING, sem valor padrão)

  * `end`: (Opcional) Especifica o tempo até o qual os dados da gravação serão incluídos no arquivo de dump. O formato é especificado como hora local. (STRING, sem valor padrão)

**Nota:** Para `begin` e `end`, o tempo deve estar em um formato que possa ser lido por java.time.LocalTime::parse(STRING), java.time.LocalDateTime::parse(STRING) ou java.time.Instant::parse(STRING). Por exemplo, "13:20:15", "2020-03-17T09:00:00" ou "2020-03-17T09:00:00Z".

**Nota:** Os tempos `begin` e `end` correspondem aos timestamps encontrados dentro das informações gravadas nos dados da flight recording.

Outra opção é usar um tempo relativo ao tempo atual que é especificado por um inteiro negativo seguido por "s", "m" ou "h". Por exemplo, "-12h", "-15m" ou "-30s"

  * `filename`: (Opcional) Nome do arquivo para o qual os dados da flight recording são despejados. Se nenhum nome de arquivo for fornecido, um nome de arquivo é gerado a partir do PID e da data atual. O nome do arquivo também pode ser um diretório, caso em que o nome do arquivo é gerado a partir do PID e da data atual no diretório especificado. Se %p e/ou %t for especificado no nome do arquivo, ele se expande para o PID da JVM e o timestamp atual, respectivamente. (FILE, sem valor padrão)

  * `maxage`: (Opcional) Duração para despejar os dados da flight recording em um arquivo. (INTEGER seguido por 's' para segundos, 'm' para minutos ou 'h' para horas, sem valor padrão)

  * `maxsize`: (Opcional) Tamanho máximo para a quantidade de dados a serem despejados de uma flight recording em bytes se um dos seguintes sufixos não for usado: 'm' ou 'M' para megabytes OU 'g' ou 'G' para gigabytes. (STRING, sem valor padrão)

  * `name`: (Opcional) Nome da gravação. Se nenhum nome for fornecido, os dados de todas as gravações são despejados. (STRING, sem valor padrão)

  * `path-to-gc-roots`: (Opcional) Flag para salvar o caminho para as raízes do garbage collection (GC) no momento em que os dados da gravação são despejados. As informações do caminho são úteis para encontrar memory leaks, mas coletá-las pode fazer com que o aplicativo pause por um curto período de tempo. Ative esta flag apenas quando você tiver um aplicativo que suspeita ter um memory leak. (BOOLEAN, false)

`JFR.start` [_options_]
    

Inicia uma flight recording

Impacto: Baixo

**Nota:**

As _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_. Se nenhum parâmetro for inserido, uma gravação é iniciada com valores padrão.

_options_ :

  * `delay`: (Opcional) Tempo de espera antes de iniciar a gravação (INTEGER seguido por 's' para segundos, 'm' para minutos ou 'h' para horas, 0s)

  * `disk`: (Opcional) Flag para também escrever os dados em disco durante a gravação (BOOLEAN, true)

  * `dumponexit`: (Opcional) Flag para escrever a gravação em disco quando a Java Virtual Machine (JVM) é encerrada. Se definido como 'true' e nenhum valor for fornecido para `filename`, a gravação é escrita em um arquivo no diretório onde o processo foi iniciado. O nome do arquivo é um nome gerado pelo sistema que contém o ID do processo, o ID da gravação e o timestamp atual. (Por exemplo: `id-1-2019_12_12_10_41.jfr`) (BOOLEAN, false)

  * `duration`: (Opcional) Duração da gravação. Note que `0s` significa para sempre (INTEGER seguido por 's' para segundos, 'm' para minutos ou 'h' para horas, 0s)

  * `filename`: (Opcional) Nome do arquivo para o qual os dados da flight recording são escritos quando a gravação é interrompida. Se nenhum nome de arquivo for fornecido, um nome de arquivo é gerado a partir do PID e da data atual e é colocado no diretório onde o processo foi iniciado. O nome do arquivo também pode ser um diretório, caso em que o nome do arquivo é gerado a partir do PID e da data atual no diretório especificado. Se %p e/ou %t for especificado no nome do arquivo, ele se expande para o PID da JVM e o timestamp atual, respectivamente. (FILE, sem valor padrão)

  * `maxage`: (Opcional) Tempo máximo para manter os dados gravados em disco. Este parâmetro é válido apenas quando o parâmetro `disk` é definido como `true`. Note que `0s` significa para sempre. (INTEGER seguido por 's' para segundos, 'm' para minutos ou 'h' para horas, 0s)

  * `maxsize`: (Opcional) Tamanho máximo dos dados a serem mantidos em disco em bytes se um dos seguintes sufixos não for usado: 'm' ou 'M' para megabytes OU 'g' ou 'G' para gigabytes. Este parâmetro é válido apenas quando o parâmetro `disk` é definido como 'true'. O valor não deve ser menor que o valor do parâmetro `maxchunksize` definido com o comando `JFR.configure`. (STRING, 0 (sem tamanho máximo))

  * `name`: (Opcional) Nome da gravação. Se nenhum nome for fornecido, um nome é gerado. Anote o nome gerado que é mostrado na resposta ao comando para que você possa usá-lo com outros comandos. (STRING, nome padrão gerado pelo sistema)

  * `path-to-gc-roots`: (Opcional) Flag para salvar o caminho para as raízes do garbage collection (GC) no final de uma gravação. As informações do caminho são úteis para encontrar memory leaks, mas coletá-las consome tempo. Ative esta flag apenas quando você tiver um aplicativo que suspeita ter um memory leak. Se o parâmetro `settings` for definido como 'profile', as informações coletadas incluem o stack trace de onde o objeto potencialmente vazando foi alocado. (BOOLEAN, false)

  * `settings`: (Opcional) Nome do arquivo de configurações que identifica quais eventos gravar. Para especificar mais de um arquivo, separe os nomes com uma vírgula (','). Inclua o caminho se o arquivo não estiver em `JAVA-HOME`/lib/jfr. Os seguintes perfis estão incluídos no JDK no diretório `JAVA-HOME`/lib/jfr: 'default.jfc': coleta um conjunto predefinido de informações com baixo overhead, então tem impacto mínimo no desempenho e pode ser usado com gravações que são executadas continuamente; 'profile.jfc': Fornece mais dados do que o perfil 'default.jfc', mas com mais overhead e impacto no desempenho. Use esta configuração por curtos períodos de tempo quando mais informações forem necessárias. Use `none` para iniciar uma gravação sem um arquivo de configuração predefinido. (STRING, `JAVA-HOME`/lib/jfr/default.jfc)

As configurações de evento e as opções .jfc podem ser especificadas usando a seguinte sintaxe:

  * `option`: (Opcional) Especifica o valor da opção a ser modificado. Para listar as opções disponíveis, use a ferramenta `JAVA_HOME`/bin/jfr.

  * `event-setting`: (Opcional) Especifica o valor da configuração de evento a ser modificado. Use o formato: `<event-name>#<setting-name>=<value>` Para adicionar uma nova configuração de evento, prefixe o nome do evento com '+'.

Você pode especificar valores para múltiplas configurações de evento e opções .jfc separando-os com um espaço em branco. Em caso de conflito entre um parâmetro e uma opção .jfc, o parâmetro terá precedência. O delimitador de espaço em branco pode ser omitido para valores de timespan, ou seja, 20ms. Para mais informações sobre a sintaxe das configurações, consulte o Javadoc do pacote jdk.jfr.

`JFR.stop` [_options_]
    

Para uma flight recording

Impacto: Baixo

**Nota:**

As _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_. Se nenhum parâmetro for inserido, nenhuma gravação será interrompida.

_options_ :

  * `filename`: (Opcional) Nome do arquivo para o qual a gravação é escrita quando a gravação é interrompida. Se %p e/ou %t for especificado no nome do arquivo, ele se expande para o PID da JVM e o timestamp atual, respectivamente. Se nenhum caminho for fornecido, os dados da gravação são descartados. (FILE, sem valor padrão)

  * `name`: (Opcional) Nome da gravação (STRING, sem valor padrão)

`JFR.view` [_options_]
    

Exibe dados de evento em visualizações predefinidas.

Impacto: Médio

**Nota:**

As _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_. Se nenhum parâmetro for inserido, uma lista de visualizações disponíveis será exibida.

_options_ :

  * `cell-height`: (Opcional) Número máximo de linhas em uma célula de tabela. (INT, valor padrão depende da visualização)

  * `maxage`: (Opcional) Duração para a visualização abranger. (INT seguido por 's' para segundos, 'm' para minutos ou 'h' para horas, valor padrão é 10m)

  * `maxsize`: (Opcional) Tamanho máximo para a visualização abranger em bytes se um dos seguintes sufixos não for usado: 'm' ou 'M' para megabytes OU 'g' ou 'G' para gigabytes. (STRING, valor padrão é 32MB)

  * `truncate`: (Opcional) Número máximo de linhas em uma célula de tabela. (INT, valor padrão depende da visualização)

  * `verbose`: (Opcional) Exibe a query que compõe a visualização. (BOOLEAN, valor padrão é false)

  * `width`: (Opcional) A largura da visualização em caracteres. (INT, valor padrão depende da visualização)

_arguments_ :

  * `view`: Nome da visualização ou tipo de evento a ser exibido. Use `help JFR.view` para ver uma lista de visualizações disponíveis. (STRING, sem valor padrão)

O parâmetro view pode ser um nome de tipo de evento. Use `JFR.view types` para ver uma lista. Para exibir todas as visualizações, use `JFR.view all-views`. Para exibir todos os eventos, use `JFR.view all-events`.

`JVMTI.agent_load` [_arguments_]
    

Carrega o agente nativo JVMTI.

Impacto: Baixo

_arguments_ :

  * _library path_ : Caminho absoluto do agente JVMTI a ser carregado. (STRING, sem valor padrão)

  * _agent option_ : (Opcional) String de opção para passar ao agente. (STRING, sem valor padrão)

`JVMTI.data_dump`
    

Sinaliza a JVM para fazer uma requisição de data-dump para JVMTI.

Impacto: Alto

`ManagementAgent.start` [_options_]
    

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

`ManagementAgent.stop`
    

Para o agente de gerenciamento remoto.

Impacto: Baixo --- sem impacto

`System.dump_map` [_options_] (Somente Linux)
    

Faz dump de um mapa de memória de processo anotado para um arquivo de saída.

Impacto: Baixo

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `-H`: (Opcional) Formato legível por humanos (BOOLEAN, false)
  * `-F`: (Opcional) Caminho do arquivo. Se %p for especificado no nome do arquivo, ele é expandido para o PID da JVM. (FILE, "vm_memory_map_%p.txt")

`System.map` [_options_] (Somente Linux)
    

Imprime um mapa de memória de processo anotado do processo da VM.

Impacto: Baixo

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `-H`: (Opcional) Formato legível por humanos (BOOLEAN, false)

`System.native_heap_info` (Somente Linux)
    

Tenta exibir informações sobre o uso do native heap através de malloc_info(3). Se não for bem-sucedido, exibe "Error: " e uma razão.

Impacto: Baixo

`System.trim_native_heap` (Somente Linux)
    

Tenta liberar memória aparando o C-heap.

Impacto: Baixo

`Thread.dump_to_file` [_options_] _filepath_
    

Faz dump de threads, com stack traces, para um arquivo em formato de texto simples ou JSON.

Impacto: Médio: Depende do número de threads.

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `-overwrite`: (Opcional) Pode sobrescrever arquivo existente (BOOLEAN, false)
  * `-format`: (Opcional) Formato de saída ("plain" ou "json") (STRING, plain)

_arguments_ :

  * _filepath_ : O caminho do arquivo de saída. Se %p for especificado no nome do arquivo, ele é expandido para o PID da JVM. (FILE, sem valor padrão)

`Thread.print` [_options_]
    

Imprime todas as threads com stacktraces.

Impacto: Médio --- depende do número de threads.

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `-e`: (Opcional) Imprime informações estendidas da thread (BOOLEAN, false)
  * `-l`: (Opcional) Imprime locks de `java.util.concurrent` (BOOLEAN, false)

`Thread.vthread_scheduler`
    

Imprime o escalonador de threads virtuais e os escalonadores de tarefas atrasadas que suportam threads virtuais realizando operações temporizadas.

Impacto: Baixo

`Thread.vthread_pollers`
    

Imprime os I/O pollers que suportam threads virtuais realizando operações de I/O de rede bloqueantes.

Impacto: Baixo

`VM.cds` [_arguments_]
    

Faz dump de um arquivo compartilhado estático ou dinâmico que inclui todas as classes atualmente carregadas.

Impacto: Médio --- o tempo de pausa depende do número de classes carregadas

_arguments_ :

  * _subcmd_ : deve ser `static_dump` ou `dynamic_dump` (STRING, sem valor padrão)
  * _filename_ : (Opcional) Nome do arquivo compartilhado a ser despejado. Se %p for especificado no nome do arquivo, ele é expandido para o PID da JVM. (FILE, "java_pid%p_&lt;subcmd&gt;.jsa")

Se `dynamic_dump` for especificado, a JVM de destino deve ser iniciada com a opção JVM `-XX:+RecordDynamicDumpInfo`.

`VM.class_hierarchy` [_options_] [_arguments_]
    

Imprime uma lista de todas as classes carregadas, indentadas para mostrar a hierarquia de classes. O nome de cada classe é seguido pelo ClassLoaderData* de seu ClassLoader, ou "null" se for carregada pelo bootstrap class loader.

Impacto: Médio --- depende do número de classes carregadas.

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `-i`: (Opcional) Interfaces herdadas devem ser impressas. (BOOLEAN, false)

  * `-s`: (Opcional) Se um classname for especificado, imprime suas subclasses além de suas superclasses. Sem esta opção, apenas as superclasses serão impressas. (BOOLEAN, false)

_arguments_ :

  * _classname_ : (Opcional) O nome da classe cuja hierarquia deve ser impressa. Se não especificado, todas as hierarquias de classes são impressas. (STRING, sem valor padrão)

`VM.classes` [_options_]
    

Imprime todas as classes carregadas

Impacto: Médio: Depende do número de classes carregadas.

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `-verbose`: (Opcional) Faz dump do conteúdo detalhado de uma classe Java. Algumas classes são anotadas com flags: `F` = possui, ou herda, um método finalize não vazio, `f` = possui método final, `W` = métodos reescritos, `C` = marcado com anotação `@Contended`, `R` = foi redefinida, `S` = é classe compartilhada (BOOLEAN, false)

`VM.classloader_stats`
    

Imprime estatísticas sobre todos os ClassLoaders.

Impacto: Baixo

`VM.classloaders` [_options_]
    

Imprime a hierarquia de classloader.

Impacto: Médio --- Depende do número de class loaders e classes carregadas.

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `show-classes`: (Opcional) Imprime classes carregadas. (BOOLEAN, false)
  * `verbose`: (Opcional) Imprime informações detalhadas. (BOOLEAN, false)
  * `fold`: (Opcional) Mostra loaders com o mesmo nome e classe como um só. (BOOLEAN, true)

`VM.command_line`
    

Imprime a linha de comando usada para iniciar esta instância da VM.

Impacto: Baixo

`VM.dynlibs`
    

Imprime bibliotecas dinâmicas carregadas.

Impacto: Baixo

`VM.events` [_options_]
    

Imprime logs de eventos da VM

Impacto: Baixo --- Depende do tamanho do log de eventos.

_options_ :

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

  * `log`: (Opcional) Nome do log a ser impresso. Se omitido, todos os logs são impressos. (STRING, sem valor padrão)
  * `max`: (Opcional) Número máximo de eventos a serem impressos (os mais recentes primeiro). Se omitido ou zero, todos os eventos são impressos. (INT, 0)

`VM.flags` [_options_]
    

Imprime as opções de flag da VM e seus valores atuais.

Impacto: Baixo

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `-all`: (Opcional) Imprime todas as flags suportadas pela VM (BOOLEAN, false).

`VM.info`
    

Imprime informações sobre o ambiente e status da JVM.

Impacto: Baixo

`VM.log` [_options_]
    

Lista a configuração de log atual, habilita/desabilita/configura uma saída de log, ou rotaciona todos os logs.

Impacto: Baixo

_options_ :

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

  * `output`: (Opcional) O nome ou índice (#) da saída a ser configurada. (STRING, sem valor padrão)

  * `output_options`: (Opcional) Opções para a saída. (STRING, sem valor padrão)

  * `what`: (Opcional) Configura quais tags registrar. (STRING, sem valor padrão)

  * `decorators`: (Opcional) Configura quais decorators usar. Use 'none' ou um valor vazio para remover todos. (STRING, sem valor padrão)

  * `disable`: (Opcional) Desativa todo o logging e limpa a configuração de log. (BOOLEAN, sem valor padrão)

  * `list`: (Opcional) Lista a configuração de log atual. (BOOLEAN, sem valor padrão)

  * `rotate`: (Opcional) Rotaciona todos os logs. (BOOLEAN, sem valor padrão)

`VM.metaspace` [_options_]
    

Imprime as estatísticas para o metaspace

Impacto: Médio --- Depende do número de classes carregadas.

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `basic`: (Opcional) Imprime um resumo básico (não precisa de um safepoint). (BOOLEAN, false)
  * `show-loaders`: (Opcional) Mostra o uso por class loader. (BOOLEAN, false)
  * `show-classes`: (Opcional) Se show-loaders estiver definido, mostra as classes carregadas para cada loader. (BOOLEAN, false)
  * `by-chunktype`: (Opcional) Detalha os números por tipo de chunk. (BOOLEAN, false)
  * `by-spacetype`: (Opcional) Detalha os números por tipo de loader. (BOOLEAN, false)
  * `vslist`: (Opcional) Mostra detalhes sobre o espaço virtual subjacente. (BOOLEAN, false)
  * `chunkfreelist`: (Opcional) Mostra detalhes sobre as listas globais de chunks livres (ChunkManager). (BOOLEAN, false)
  * `scale`: (Opcional) Unidade de escala para o uso de memória. Valores válidos são: 1, KB, MB ou GB (escala fixa) ou "dynamic" para uma escala escolhida dinamicamente. (STRING, dynamic)

`VM.native_memory` [_options_]
    

Imprime o uso de memória nativa

Impacto: Médio

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `summary`: (Opcional) Solicita ao runtime que relate o resumo atual da memória, que inclui a memória total reservada e comprometida, juntamente com o resumo do uso da memória por cada subsistema. (BOOLEAN, false)

  * `detail`: (Opcional) Solicita ao runtime que relate a alocação de memória >= 1K por cada callsite. (BOOLEAN, false)

  * `baseline`: (Opcional) Solicita ao runtime que estabeleça uma linha de base para o uso atual da memória, para que possa ser comparado posteriormente. (BOOLEAN, false)

  * `summary.diff`: (Opcional) Solicita ao runtime que relate a comparação do resumo da memória com a linha de base anterior. (BOOLEAN, false)

  * `detail.diff`: (Opcional) Solicita ao runtime que relate a comparação detalhada da memória com a linha de base anterior, que mostra as atividades de alocação de memória em diferentes callsites. (BOOLEAN, false)

  * `statistics`: (Opcional) Imprime estatísticas do tracker para fins de ajuste. (BOOLEAN, false)

  * `scale`: (Opcional) Unidade de escala para o uso de memória, KB, MB ou GB (STRING, KB)

`VM.set_flag` [_arguments_]
    

Define o valor de uma flag da VM.

Impacto: Baixo

_arguments_ :

  * _name_ : O nome da flag a ser definida. (STRING, sem valor padrão)
  * _value_ : O valor para o qual a flag deve ser definida. (STRING, sem valor padrão)

`VM.stringtable`
    

Imprime estatísticas da tabela de strings.

Impacto: Baixo

`VM.symboltable`
    

Imprime estatísticas da tabela de símbolos.

Impacto: Baixo

`VM.system_properties`
    

Imprime as propriedades do sistema.

Impacto: Baixo

`VM.uptime`
    

Imprime o tempo de atividade da JVM.

Impacto: Baixo

`VM.version`
    

Imprime informações da versão da JVM.

Impacto: Baixo
Define a opção de flag da VM usando o valor fornecido.

Impacto: Baixo

_argumentos_ :

  * _flag name_ : O nome da flag que você deseja definir (STRING, sem valor padrão)

  * _string value_ : (Opcional) O valor que você deseja definir (STRING, sem valor padrão)



`VM.stringtable` [_options_]
    

Despeja a tabela de strings.

Impacto: Médio --- depende do conteúdo Java.

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `-verbose`: (Opcional) Despeja o conteúdo de cada string na tabela (BOOLEAN, false)


`VM.symboltable` [_options_]
    

Despeja a tabela de símbolos.

Impacto: Médio --- depende do conteúdo Java.

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_).

_options_ :

  * `-verbose`: (Opcional) Despeja o conteúdo de cada símbolo na tabela (BOOLEAN, false)


`VM.system_properties`
    

Imprime as propriedades do sistema.

Impacto: Baixo

`VM.systemdictionary`
    

Imprime as estatísticas para os tamanhos de hashtable do dicionário e o comprimento dos buckets.

Impacto: Médio

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `verbose`: (Opcional) Despeja o conteúdo de cada entrada do dicionário para todos os class loaders (BOOLEAN, false) .


`VM.uptime` [_options_]
    

Imprime o tempo de atividade da VM.

Impacto: Baixo

**Nota:**

As seguintes _options_ devem ser especificadas usando a sintaxe _key_ ou _key_`=`_value_.

_options_ :

  * `-date`: (Opcional) Adiciona um prefixo com a data atual (BOOLEAN, false)


`VM.version`
    

Imprime as informações de versão da JVM.

Impacto: Baixo