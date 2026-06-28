# Configurar Eventos e Flight Recorder

## Parte III Configurar Eventos e Flight Recorder

Esta seção descreve como configurar eventos e o Flight Recorder para otimizar seu desempenho e controlar seu comportamento.

Cada evento possui as seguintes configurações predefinidas:

  * @Enabled: Especifica se o evento é registrado. O valor padrão é `true`. Consulte [Habilitar e Desabilitar Eventos](<#/doc/guides/jrtflightrecorder/enable-and-disable-events>).
  * @Threshold: Especifica a duração abaixo da qual um evento não é registrado. O padrão é `0` (sem limite). Consulte [Limite de Evento](<#/doc/guides/jrtflightrecorder/event-threshold>).
  * @Period: Especifica o intervalo no qual o evento é emitido, se for periódico. O valor padrão é `everyChunk`, o que significa que o evento periódico será emitido pelo menos uma vez na gravação. Consulte [Eventos Periódicos](<#/doc/guides/jrtflightrecorder/periodic-events>)
  * @StackTrace: Especifica se o stack trace do método Event::commit() é registrado. O valor padrão é `true`. Consulte [Imprimindo o Stack Trace do Evento](<#/doc/guides/jrtflightrecorder/printing-event-stack-trace>).

O Flight Recorder oferece várias opções para filtrar eventos; consulte [Filtrar Eventos com SettingDefinition](<#/doc/guides/jrtflightrecorder/filter-events-settingdefinition>).

Recomenda-se que você especifique uma configuração predefinida, que contém uma coleção de configurações que controlam a quantidade de informações que o Flight Recorder gera; consulte [Configurações do Flight Recorder](<#/doc/guides/jrtflightrecorder/flight-recorder-configurations>). Se você não especificar uma configuração predefinida, o Flight Recorder registrará informações sobre todos os eventos; ele monitora o sistema em execução com um nível de detalhe extremamente alto e produz enormes quantidades de dados.