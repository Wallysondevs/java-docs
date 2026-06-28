# O Comando jstatd

## Nome

jstatd - monitora a criação e o encerramento de VMs Java HotSpot instrumentadas

## Sinopse

**AVISO:** Este comando é experimental, sem suporte e obsoleto. Ele será removido em uma versão futura.

`jstatd` [_options_]

_options_
     Representa as opções de linha de comando do `jstatd`. Consulte Opções para o Comando jstatd.

## Descrição

O comando `jstatd` é uma aplicação de servidor RMI que monitora a criação e o encerramento de VMs Java HotSpot instrumentadas e fornece uma interface para permitir que ferramentas de monitoramento remoto, `jstat` e `jps`, se conectem a JVMs que estão sendo executadas no host local e coletem informações sobre o processo da JVM.

O servidor `jstatd` requer um RMI registry no host local. O servidor `jstatd` tenta se conectar ao RMI registry na porta padrão, ou na porta que você especificar com a opção `-p` `port`. Se um RMI registry não for encontrado, então um é criado dentro da aplicação `jstatd` que está vinculado à porta indicada pela opção `-p` `port` ou à porta padrão do RMI registry quando a opção `-p` `port` é omitida. Você pode impedir a criação de um RMI registry interno especificando a opção `-nr`.

## Opções para o Comando jstatd

`-nr`
     Esta opção não tenta criar um RMI registry interno dentro do processo `jstatd` quando um RMI registry existente não é encontrado.
`-p` _port_
     Esta opção define o número da porta onde o RMI registry é esperado ser encontrado, ou, quando não encontrado, criado se a opção `-nr` não for especificada.
`-r` _rmiport_
     Esta opção define o número da porta à qual o RMI connector está vinculado. Se não for especificado, uma porta aleatória disponível é usada.
`-n` _rminame_
     Esta opção define o nome ao qual o objeto RMI remoto está vinculado no RMI registry. O nome padrão é `JStatRemoteHost`. Se vários servidores `jstatd` forem iniciados no mesmo host, o nome do objeto RMI exportado para cada servidor pode ser tornado único especificando esta opção. No entanto, fazer isso exige que o nome exclusivo do servidor seja incluído nas strings `hostid` e `vmid` do cliente de monitoramento.
`-J` _option_
     Esta opção passa uma `option` Java para a JVM, onde a opção é uma daquelas descritas na página de referência para o Java application launcher. Por exemplo, `-J-Xms48m` define a memória de inicialização para 48 MB. Consulte [java](<#/doc/guides/tools/java>).

## Segurança

O servidor `jstatd` pode monitorar apenas JVMs para as quais possui as permissões de acesso nativo apropriadas. Portanto, o processo `jstatd` deve estar sendo executado com as mesmas credenciais de usuário das JVMs de destino. Algumas credenciais de usuário, como o root user em sistemas operacionais Linux e macOS, têm permissão para acessar a instrumentação exportada por qualquer JVM no sistema. Um processo `jstatd` executado com tais credenciais pode monitorar qualquer JVM no sistema, mas introduz preocupações de segurança adicionais.

O servidor `jstatd` não fornece nenhuma autenticação de remote clients. Portanto, executar um processo de servidor `jstatd` expõe a instrumentação exportada por todas as JVMs para as quais o processo `jstatd` tem permissões de acesso a qualquer usuário na network. Essa exposição pode ser indesejável em seu ambiente e, portanto, local security policies devem ser consideradas antes de iniciar o processo `jstatd`, particularmente em production environments ou em networks que não são seguras.

Para fins de segurança, o servidor `jstatd` usa um RMI ObjectInputFilter para permitir que apenas classes essenciais sejam deserialized.

Se suas security concerns não puderem ser resolvidas, a safest action é não executar o servidor `jstatd` e usar as ferramentas `jstat` e `jps` localmente. No entanto, ao usar `jps` para obter uma lista de JVMs instrumentadas, a lista não incluirá nenhuma JVM em execução em docker containers.

## Interface Remota

A interface exportada pelo processo `jstatd` é proprietária e garantida a mudar. Usuários e desenvolvedores são desencorajados a escrever para esta interface.

## Exemplos

A seguir estão exemplos do comando `jstatd`. Os scripts `jstatd` iniciam automaticamente o servidor em background.

## RMI Registry Interno

Este exemplo mostra como iniciar uma sessão `jstatd` com um RMI registry interno. Este exemplo assume que nenhum outro servidor está vinculado à porta padrão do RMI registry (porta `1099`).

> `jstatd`

## RMI Registry Externo

Este exemplo inicia uma sessão `jstatd` com um RMI registry externo.
```
    rmiregistry&
    jstatd
```

Este exemplo inicia uma sessão `jstatd` com um servidor RMI registry externo na porta `2020`.
```
    jrmiregistry 2020&
    jstatd -p 2020
```

Este exemplo inicia uma sessão `jstatd` com um servidor RMI registry externo na porta `2020` e um JMX connector vinculado à porta `2021`.
```
    jrmiregistry 2020&
    jstatd -p 2020 -r 2021
```

Este exemplo inicia uma sessão `jstatd` com um RMI registry externo na porta 2020 que está vinculado a `AlternateJstatdServerName`.
```
    rmiregistry 2020&
    jstatd -p 2020 -n AlternateJstatdServerName
```

## Parar a Criação de um RMI Registry Em-Processo

Este exemplo inicia uma sessão `jstatd` que não cria um RMI registry quando um não é encontrado. Este exemplo assume que um RMI registry já está em execução. Se um RMI registry não estiver em execução, uma error message será exibida.

> `jstatd -nr`

## Habilitar Log RMI

Este exemplo inicia uma sessão `jstatd` com as capacidades de log RMI habilitadas. Esta técnica é útil como um auxílio de troubleshooting ou para monitoring server activities.

> `jstatd -J-Djava.rmi.server.logCalls=true`