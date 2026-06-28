# O Comando jconsole

## Nome

jconsole - inicia um console gráfico para monitorar e gerenciar aplicações Java

## Sinopse

`jconsole` [`-interval=`_n_] [`-notile`] [`-plugin` _path_] [`-version`] [_connection_ ... ] [`-J` _input_arguments_]

`jconsole` `-help`

## Opções

`-interval`
     Define o intervalo de atualização para `n` segundos (o padrão é 4 segundos).
`-notile`
     Não organiza as janelas lado a lado para duas ou mais conexões.
`-pluginpath` _path_
     Especifica o caminho que `jconsole` usa para procurar plug-ins. O _path_ do plug-in deve conter um arquivo de configuração de provedor (provider-configuration file) chamado `META-INF/services/com.sun.tools.jconsole.JConsolePlugin` que contém uma linha para cada plug-in. A linha especifica o nome de classe totalmente qualificado (fully qualified class name) da classe que implementa a classe `com.sun.tools.jconsole.JConsolePlugin`.
`-version`
     Imprime a versão do programa.
_connection_ = _pid_ | _host_`:`_port_ | _jmxURL_
    

Uma conexão é descrita por _pid_ , _host_`:`_port_ ou _jmxURL_.

  * O valor _pid_ é o ID do processo de um processo alvo. A JVM deve estar sendo executada com o mesmo user ID do user ID que executa o comando `jconsole`.

  * Os valores _host_`:`_port_ são o nome do sistema host no qual a JVM está sendo executada e o número da porta especificado pela system property `com.sun.management.jmxremote.port` quando a JVM foi iniciada.

  * O valor _jmxUrl_ é o endereço do JMX agent a ser conectado, conforme descrito em JMXServiceURL.

`-J` _input_arguments_
     Passa _input_arguments_ para a JVM na qual o comando `jconsole` é executado.
`-help` ou `--help`
     Exibe a mensagem de ajuda para o comando.

## Descrição

O comando `jconsole` inicia uma ferramenta de console gráfica que permite monitorar e gerenciar aplicações Java e máquinas virtuais em uma máquina local ou remota.

No Windows, o comando `jconsole` não se associa a uma janela de console. No entanto, ele exibe uma caixa de diálogo com informações de erro quando o comando `jconsole` falha.