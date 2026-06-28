# Configurando o JDK Flight Recorder

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ JDK Flight Recorder ](<#/doc/tutorials/jvm/jfr>) > Configurando o JDK Flight Recorder

**Anterior na Série**

[Introdução ao JDK Flight Recorder](<#/doc/tutorials/jvm/jfr/getting-started>)

➜

**Tutorial Atual**

Configurando o JDK Flight Recorder

➜

**Próximo na Série**

[A ferramenta de linha de comando JFR](<#/doc/tutorials/jvm/jfr/tools>)

**Anterior na Série:** [Introdução ao JDK Flight Recorder](<#/doc/tutorials/jvm/jfr/getting-started>)

**Próximo na Série:** [A ferramenta de linha de comando JFR](<#/doc/tutorials/jvm/jfr/tools>)

# Configurando o JDK Flight Recorder

O JDK Flight Recorder vem com um conjunto padrão de heurísticas e configurações. Essas configurações padrão podem funcionar para casos triviais, mas na maioria dos ambientes de produção, os usuários precisarão configurar o JFR para melhor atender às suas necessidades específicas. Existem quatro níveis distintos de configuração do JFR: opções de gravação, configurações, configurações de evento e opções do flight recorder. Cada um será abordado nesta seção.

## Opções de Gravação

As opções de gravação governam o comportamento geral do JFR, cobrindo configurações como por quanto tempo os dados serão retidos, quais configurações serão usadas e muito mais. As opções de gravação são fornecidas na inicialização do JFR; `-XX:StartFlightRecording` ou `JFR.start`, ou com `JFR.config`.

**Nota:** `-XX:StartFlightRecording`, e `JFR.start` e `JFR.config` todos aceitam as mesmas opções, no entanto, ao usar `-XX:StartFlightRecording`, cada opção é delimitada por uma vírgula (`,`) enquanto com `JFR.start` e `JFR.config` usa um espaço (` `). Os exemplos abaixo resultam na mesma configuração:

  * `delay=time`: Especifica o atraso entre o tempo de inicialização da aplicação Java e o início da gravação. Anexe `s` para especificar o tempo em segundos, `m` para minutos, `h` para horas ou `d` para dias (por exemplo, especificar `10m` significa 10 minutos). Por padrão, não há atraso, e este parâmetro é definido como 0.
  * `disk={[true]|false}`: Especifica se os dados devem ser gravados em disco durante a gravação. Por padrão, este parâmetro está habilitado.
  * `dumponexit={true|[false]}`: Especifica se a gravação em execução é despejada quando a JVM é encerrada. Se habilitado e um nome de arquivo não for inserido, a gravação é gravada em um arquivo no diretório onde o processo foi iniciado. O nome do arquivo é um nome gerado pelo sistema que contém o ID do processo, ID da gravação e o timestamp atual, similar a `hotspot-pid-47496-id-1-2018_01_25_19_10_41.jfr`. Por padrão, este parâmetro está desabilitado.
  * `duration=time`: Especifica a duração da gravação. Anexe `s` para especificar o tempo em segundos, `m` para minutos, `h` para horas ou `d` para dias (por exemplo, especificar `5h` significa 5 horas). Por padrão, a duração não é limitada, e este parâmetro é definido como 0.
  * `filename=path`: Especifica o caminho e o nome do arquivo para o qual a gravação é escrita quando a gravação é interrompida, por exemplo:

  * `name=identifier`: Aceita tanto o nome quanto o identificador de uma gravação.

  * `maxage=time`: Especifica a idade máxima dos dados em disco a serem mantidos para a gravação. Este parâmetro é válido apenas quando o parâmetro `disk` é definido como `true`. Anexe `s` para especificar o tempo em segundos, `m` para minutos, `h` para horas ou `d` para dias (por exemplo, especificar `30s` significa 30 segundos). Por padrão, a idade máxima não é limitada, e este parâmetro é definido como `0s`.

  * `maxsize=size`: Especifica o tamanho máximo (em bytes) dos dados em disco a serem mantidos para a gravação. Este parâmetro é válido apenas quando o parâmetro `disk` é definido como `true`. O valor não deve ser menor que o valor do parâmetro `maxchunksize` definido com `-XX:FlightRecorderOptions`. Anexe `m` ou `M` para especificar o tamanho em megabytes, ou `g` ou `G` para especificar o tamanho em gigabytes. Por padrão, o tamanho máximo dos dados em disco é limitado a 250 MB.

  * `path-to-gc-roots={true|false}`: Especifica se o caminho para as raízes do garbage collection (GC) deve ser coletado no final de uma gravação. Por padrão, este parâmetro está desabilitado.
    * O caminho para as raízes do GC é útil para encontrar vazamentos de memória, mas coletá-lo consome tempo. Habilite esta opção apenas quando iniciar uma gravação para uma aplicação que você suspeita ter um vazamento de memória. Se o parâmetro `settings` for definido como `profile`, o stack trace de onde o objeto potencialmente vazando foi alocado é incluído nas informações coletadas.

  * `settings=path`: Especifica o caminho e o nome do arquivo de configurações de evento (do tipo JFC).

Você pode especificar valores para múltiplos parâmetros separando-os com uma vírgula. As configurações de evento e as opções `.jfc` podem ser especificadas usando a seguinte sintaxe:

    * `option=value`: Especifica o valor da opção a ser modificada. Para listar as opções disponíveis, use a ferramenta `JAVA_HOME/bin/jfr`. event-setting=value
    * `<event-name>#<setting-name>=<value>`: Especifica o valor da configuração do evento a ser modificado. Para adicionar uma nova configuração de evento, prefixe o nome do evento com `+`.

## Configurações

As configurações são definidas em arquivos de configuração JFR (`.jfc`) e são fornecidas ao JFR através da opção `settings`. Eles contêm as configurações de evento, bem como controles que o JDK Mission Control usará. O JFR vem com dois arquivos de configuração predefinidos; `default.jfc` e `profile.jfc`, que estão localizados em `JAVA_HOME/lib/jfr`.

**Nota:** A partir do JDK 19, é fortemente recomendado usar o utilitário `jfr configure` para criar arquivos de configuração.

### Opções de Evento

Definidas principalmente em arquivos de configuração, as opções de evento governam como o JFR coleta eventos. Desde o JDK 17, esses valores também podem ser fornecidos através de `-XX:StartFlightRecording`, `JFR.start` e `JFR.config`. As configurações de opção de evento fornecidas via linha de comando substituem as configurações fornecidas em arquivos `.jfc`, e ambas substituem as configurações fornecidas por anotações na classe de um evento.

  * `enabled`: `Boolean`, governa se o JFR coletará um evento. O padrão é `true`.
  * `period`: `Duration`, governa o tempo mínimo que o JFR esperará antes de registrar outra instância deste evento. O padrão é `0`. Forneça `ns` para nanossegundos, `ms` para milissegundos, `s` para segundos, `m` para minutos, `h` para horas.
  * `threshold`: `Duration`, governa o tempo mínimo que este evento leva para ser executado antes que o JFR o registre. O padrão é `0`. Forneça `ns` para nanossegundos, `ms` para milissegundos, `s` para segundos, `m` para minutos, `h` para horas.
  * `stackTrace`: `Boolean`, governa se o JFR registrará o `stackTrace` associado ao evento. O padrão é `true`.

## Opções do Flight Recorder

Este conjunto de configurações, fornecido através do argumento JVM `-XX:FlightRecorderOptions`, geralmente governa como o JFR lida com o fluxo de dados desde a gravação de eventos até o armazenamento em memória ou em disco. Frequentemente, os valores padrão serão suficientes para a maioria dos usuários, mas um usuário pode precisar alterar os padrões para melhor atender aos seus objetivos de desempenho.

Cada opção é delimitada por uma vírgula (`,`) como neste exemplo:

  * `globalbuffersize=size`: Especifica a quantidade total de memória primária usada para retenção de dados. O valor padrão é baseado no valor especificado para `memorysize`. Altere o parâmetro `memorysize` para modificar o tamanho dos buffers globais.
  * `maxchunksize=size`: Especifica o tamanho máximo (em bytes) dos blocos de dados em uma gravação. Anexe `m` ou `M` para especificar o tamanho em megabytes (MB), ou `g` ou `G` para especificar o tamanho em gigabytes (GB). Por padrão, o tamanho máximo dos blocos de dados é definido como 12 MB. O mínimo permitido é 1 MB.
  * `memorysize=size`: Determina quanta memória de buffer deve ser usada e define os parâmetros `globalbuffersize` e `numglobalbuffers` com base no tamanho especificado. Anexe `m` ou `M` para especificar o tamanho em megabytes (MB), ou `g` ou `G` para especificar o tamanho em gigabytes (GB). Por padrão, o tamanho da memória é definido como 10 MB.
  * `numglobalbuffers`: Especifica o número de buffers globais usados. O valor padrão é baseado no tamanho da memória especificado. Altere o parâmetro `memorysize` para modificar o número de buffers globais.
  * `old-object-queue-size=number-of-objects`: Número máximo de objetos antigos a serem rastreados. Por padrão, o número de objetos é definido como 256.
  * `repository=path`: Especifica o repositório (um diretório) para armazenamento temporário em disco. Por padrão, o diretório temporário do sistema é usado.
  * `retransform={[true]|false}`: Especifica se as classes de evento devem ser retransformadas usando JVMTI (Java Virtual Machine Tool Interface). Se `false`, a instrumentação é adicionada quando as classes de evento são carregadas. Por padrão, este parâmetro está habilitado.
  * `stackdepth=depth`: Profundidade da pilha para stack traces. Por padrão, a profundidade é definida como 64 chamadas de método. O máximo é 2048. Valores maiores que 64 podem criar uma sobrecarga significativa e reduzir o desempenho.
  * `threadbuffersize=size`: Especifica o tamanho do buffer local por thread (em bytes). Por padrão, o tamanho do buffer local é definido como 8 kilobytes, com um valor mínimo de 4 kilobytes. Sobrescrever este parâmetro pode reduzir o desempenho e não é recomendado.

### Neste tutorial

Opções de Gravação Configurações Opções do Flight Recorder

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Introdução ao JDK Flight Recorder](<#/doc/tutorials/jvm/jfr/getting-started>)

➜

**Tutorial Atual**

Configurando o JDK Flight Recorder

➜

**Próximo na Série**

[A ferramenta de linha de comando JFR](<#/doc/tutorials/jvm/jfr/tools>)

**Anterior na Série:** [Introdução ao JDK Flight Recorder](<#/doc/tutorials/jvm/jfr/getting-started>)

**Próximo na Série:** [A ferramenta de linha de comando JFR](<#/doc/tutorials/jvm/jfr/tools>)

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ JDK Flight Recorder ](<#/doc/tutorials/jvm/jfr>) > Configurando o JDK Flight Recorder