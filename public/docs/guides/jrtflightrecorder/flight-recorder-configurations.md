# Configurações do Flight Recorder

## 17 Configurações do Flight Recorder

As configurações do Flight Recorder controlam a quantidade de dados que é gravada.

O Flight Recorder usa duas configurações pré-configuradas, `default.jfc` e `profile.jfc`. Essas configurações possuem definições predefinidas para cada event type. Ambas as configurações estão localizadas em `<java_home>/lib/jfr`. Por padrão, o Flight Recorder usa a configuração `default.jfc` ao iniciar uma gravação. A configuração `default.jfc` é recomendada para gravações contínuas. Ela oferece um bom equilíbrio entre dados e desempenho (tipicamente, menos de 1% de overhead). A configuração `profile.jfc` grava mais events e é útil ao perfilar uma aplicação.

Na maioria dos casos, as configurações pré-configuradas são suficientes. No entanto, pode haver um cenário, ao analisar uma gravação, em que alguns events estejam desabilitados por padrão. Para habilitar esses events, crie uma configuração personalizada. Use o JDK Mission Control para configurar as definições de event usando uma das configurações existentes. Faça uma cópia de uma configuração existente e então modifique-a. Não modifique as configurações padrão. Especifique qual configuração usar com a opção de linha de comando `settings` ao iniciar uma gravação. Por exemplo:

`-XX:StartFlightRecording:filename=recording.jfr,dumponexit=true,settings=default.jfc`

`-XX:StartFlightRecording:filename=recording.jfr,dumponexit=true,settings=mysettings.jfc`