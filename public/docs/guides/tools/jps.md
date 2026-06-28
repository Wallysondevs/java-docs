# O Comando jps

## Nome

jps - lista as JVMs instrumentadas no sistema de destino

## Sinopse

**Nota:** Este comando é experimental e não suportado.

`jps` [`-q`] [`-mlvV`] [_hostid_]

`jps` [`-help`]

## Opções

`-q`
     Suprime a saída do nome da classe, nome do arquivo JAR e argumentos passados para o método `main`, produzindo uma lista apenas de identificadores de JVM locais.
`-mlvV`
    

Você pode especificar qualquer combinação dessas opções.

  * `-m` exibe os argumentos passados para o método `main`. A saída pode ser `null` para JVMs embarcadas.

  * `-l` exibe o nome completo do pacote para a classe `main` da aplicação ou o nome completo do caminho para o arquivo JAR da aplicação.

  * `-v` exibe os argumentos passados para a JVM.

  * `-V` suprime a saída do nome da classe, nome do arquivo JAR e argumentos passados para o método `main`, produzindo uma lista apenas de identificadores de JVM locais.

_hostid_
     O identificador do host para o qual o relatório de processo deve ser gerado. O `hostid` pode incluir componentes opcionais que indicam o protocolo de comunicação, número da porta e outros dados específicos da implementação. Consulte Identificador de Host.
`-help`
     Exibe a mensagem de ajuda para o comando `jps`.

## Descrição

O comando `jps` lista as Java HotSpot VMs instrumentadas no sistema de destino. O comando é limitado a relatar informações sobre JVMs para as quais possui permissões de acesso.

Se o comando `jps` for executado sem especificar um `hostid`, ele procura por JVMs instrumentadas no host local. Se iniciado com um `hostid`, ele procura por JVMs no host indicado, usando o protocolo e a porta especificados. Assume-se que um processo `jstatd` esteja em execução no host de destino.

O comando `jps` relata o identificador de JVM local, ou `lvmid`, para cada JVM instrumentada encontrada no sistema de destino. O `lvmid` é tipicamente, mas não necessariamente, o identificador de processo do sistema operacional para o processo da JVM. Sem opções, o comando `jps` lista o `lvmid` de cada aplicação Java seguido pela forma abreviada do nome da classe da aplicação ou nome do arquivo jar. A forma abreviada do nome da classe ou nome do arquivo JAR omite as informações de pacote da classe ou as informações de caminho dos arquivos JAR.

O comando `jps` usa o launcher Java para encontrar o nome da classe e os argumentos passados para o método main. Se a JVM de destino for iniciada com um launcher personalizado, então o nome da classe ou do arquivo JAR, e os argumentos para o método `main` não estarão disponíveis. Neste caso, o comando `jps` exibe a string `Unknown` para o nome da classe, ou nome do arquivo JAR, e para os argumentos do método `main`.

A lista de JVMs produzida pelo comando `jps` pode ser limitada pelas permissões concedidas ao principal que executa o comando. O comando lista apenas as JVMs para as quais o principal possui direitos de acesso, conforme determinado pelos mecanismos de controle de acesso específicos do sistema operacional.

## Identificador de Host

O identificador de host, ou `hostid`, é uma string que indica o sistema de destino. A sintaxe da string `hostid` corresponde à sintaxe de uma URI:

> [_protocol_`:`][[`//`]_hostname_][`:`_port_][`/`_servername_]

_protocol_
     O protocolo de comunicação. Se o _protocol_ for omitido e um _hostname_ não for especificado, então o protocolo padrão é um protocolo local, otimizado e específico da plataforma. Se o protocolo for omitido e um nome de host for especificado, então o protocolo padrão é `rmi`.
_hostname_
     Um nome de host ou endereço IP que indica o host de destino. Se você omitir o parâmetro _hostname_, então o host de destino é o host local.
_port_
     A porta padrão para comunicação com o servidor remoto. Se o parâmetro _hostname_ for omitido ou o parâmetro _protocol_ especificar um protocolo local otimizado, então o parâmetro _port_ é ignorado. Caso contrário, o tratamento do parâmetro _port_ é específico da implementação. Para o protocolo `rmi` padrão, o parâmetro _port_ indica o número da porta para o `rmiregistry` no host remoto. Se o parâmetro _port_ for omitido, e o parâmetro _protocol_ indicar `rmi`, então a porta `rmiregistry` padrão (`1099`) é usada.
_servername_
     O tratamento deste parâmetro depende da implementação. Para o protocolo local otimizado, este campo é ignorado. Para o protocolo `rmi`, este parâmetro é uma string que representa o nome do objeto remoto RMI no host remoto. Consulte a opção `-n` do comando [jstatd](<#/doc/guides/tools/jstatd>).

## Formato de Saída do Comando jps

A saída do comando `jps` tem o seguinte padrão:

> _lvmid_ [ [ _classname_ | _JARfilename_ | `"Unknown"`] [ _arg_ * ] [ _jvmarg_ * ] ]

Todos os tokens de saída são separados por espaço em branco. Um valor `arg` que inclui espaço em branco embutido introduz ambiguidade ao tentar mapear argumentos para seus parâmetros posicionais reais.

**Nota:**

É recomendado que você não escreva scripts para analisar a saída do `jps` porque o formato pode mudar em futuras versões. Se você escrever scripts que analisam a saída do `jps`, então espere modificá-los para futuras versões desta ferramenta.

## Exemplos

Esta seção fornece exemplos do comando `jps`.

Lista as JVMs instrumentadas no host local:
```
    jps
    18027 Java2Demo.JAR
    18032 jps
    18005 jstat
```

O exemplo a seguir lista as JVMs instrumentadas em um host remoto. Este exemplo assume que o servidor `jstat` e seu registro RMI interno ou um processo `rmiregistry` externo separado estão em execução no host remoto na porta padrão (porta `1099`). Também assume que o host local tem as permissões apropriadas para acessar o host remoto. Este exemplo inclui a opção `-l` para exibir a forma longa dos nomes das classes ou nomes dos arquivos JAR.
```
    jps -l remote.domain
    3002 /opt/jdk1.7.0/demo/jfc/Java2D/Java2Demo.JAR
    2857 sun.tools.jstatd.jstatd
```

O exemplo a seguir lista as JVMs instrumentadas em um host remoto com uma porta não padrão para o registro RMI. Este exemplo assume que o servidor `jstatd`, com um registro RMI interno vinculado à porta `2002`, está em execução no host remoto. Este exemplo também usa a opção `-m` para incluir os argumentos passados para o método `main` de cada uma das aplicações Java listadas.
```
    jps -m remote.domain:2002
    3002 /opt/jdk1.7.0/demo/jfc/Java2D/Java2Demo.JAR
    3102 sun.tools.jstatd.jstatd -p 2002
```