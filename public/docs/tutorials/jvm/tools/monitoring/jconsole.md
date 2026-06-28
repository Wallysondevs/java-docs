# Jconsole - o Monitor Gráfico da Sua Aplicação

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Monitoramento ](<#/doc/tutorials/jvm/tools/monitoring>) > Jconsole - o Monitor Gráfico da Sua Aplicação

**Anterior na Série**

[Jfr - Analisar e Imprimir Arquivos do Flight Recorder](<#/doc/tutorials/jvm/tools/monitoring/jfr>)

➜

**Tutorial Atual**

Jconsole - o Monitor Gráfico da Sua Aplicação

➜

**Próximo na Série**

[Jps - Listando suas JVMs Instrumentadas](<#/doc/tutorials/jvm/tools/monitoring/jps>)

**Anterior na Série:** [Jfr - Analisar e Imprimir Arquivos do Flight Recorder](<#/doc/tutorials/jvm/tools/monitoring/jfr>)

**Próximo na Série:** [Jps - Listando suas JVMs Instrumentadas](<#/doc/tutorials/jvm/tools/monitoring/jps>)

# Jconsole - o Monitor Gráfico da Sua Aplicação

## Apresentando o Jconsole

[jconsole](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jconsole.html>) - inicia um console gráfico para monitorar e gerenciar aplicações Java

## Sinopse

## Opções

`-interval`

Define o intervalo de atualização para `n` segundos (o padrão é 4 segundos).

`-notile`

Não organiza as janelas lado a lado para duas ou mais conexões.

`-pluginpath` _path_

Especifica o caminho que o `jconsole` usa para procurar plug-ins. O caminho do plug-in deve conter um arquivo de configuração de provedor chamado `META-INF/services/com.sun.tools.jconsole.JConsolePlugin` que contém uma linha para cada plug-in. A linha especifica o nome de classe totalmente qualificado da classe que implementa a classe `com.sun.tools.jconsole.JConsolePlugin`.

`-version`

Imprime a versão do programa.

_connection_ = _pid_ | _host_`:`_port_ | _jmxURL_

Uma conexão é descrita por _pid_ , _host_`:`_port_ ou _jmxURL_.

  * O valor _pid_ é o ID do processo de um processo alvo. A JVM deve estar sendo executada com o mesmo ID de usuário que o ID de usuário que executa o comando `jconsole`.

  * Os valores _host_`:`_port_ são o nome do sistema host no qual a JVM está sendo executada e o número da porta especificado pela propriedade de sistema `com.sun.management.jmxremote.port` quando a JVM foi iniciada.

  * O valor _jmxUrl_ é o endereço do agente JMX ao qual se conectar, conforme descrito em `JMXServiceURL`.

`-J` _input_arguments_

Passa _input_arguments_ para a JVM na qual o comando `jconsole` é executado.

`-help` ou `--help`

Exibe a mensagem de ajuda para o comando.

## Descrição

O comando `jconsole` inicia uma ferramenta de console gráfico que permite monitorar e gerenciar aplicações Java e máquinas virtuais em uma máquina local ou remota.

No Windows, o comando `jconsole` não se associa a uma janela de console. Ele, no entanto, exibe uma caixa de diálogo com informações de erro quando o comando `jconsole` falha.

### Neste tutorial

Apresentando o Jconsole Sinopse Opções Descrição

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Jfr - Analisar e Imprimir Arquivos do Flight Recorder](<#/doc/tutorials/jvm/tools/monitoring/jfr>)

➜

**Tutorial Atual**

Jconsole - o Monitor Gráfico da Sua Aplicação

➜

**Próximo na Série**

[Jps - Listando suas JVMs Instrumentadas](<#/doc/tutorials/jvm/tools/monitoring/jps>)

**Anterior na Série:** [Jfr - Analisar e Imprimir Arquivos do Flight Recorder](<#/doc/tutorials/jvm/tools/monitoring/jfr>)

**Próximo na Série:** [Jps - Listando suas JVMs Instrumentadas](<#/doc/tutorials/jvm/tools/monitoring/jps>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Monitoramento ](<#/doc/tutorials/jvm/tools/monitoring>) > Jconsole - o Monitor Gráfico da Sua Aplicação