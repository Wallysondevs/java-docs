# Jstatd - Monitorando a Criação e Término das Suas JVMs

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Monitoramento ](<#/doc/tutorials/jvm/tools/monitoring>) > Jstatd - Monitorando a Criação e Término das Suas JVMs

**Anterior na Série**

[Jstat - Monitorando as Estatísticas das Suas JVMs](<#/doc/tutorials/jvm/tools/monitoring/jstat>)

➜

**Tutorial Atual**

Jstatd - Monitorando a Criação e Término das Suas JVMs

➜

Este é o fim da série!

**Anterior na Série:** [Jstat - Monitorando as Estatísticas das Suas JVMs](<#/doc/tutorials/jvm/tools/monitoring/jstat>)

# Jstatd - Monitorando a Criação e Término das Suas JVMs

## Apresentando o Jstatd

[jstatd](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jstatd.html>) - monitora a criação e o término de VMs Java HotSpot instrumentadas

## Sinopse

**Nota:** Este comando é experimental e não suportado.

_opções_

Isso representa as opções de linha de comando do `jstatd`. Veja Opções para o Comando jstatd.

## Descrição

O comando `jstatd` é uma aplicação de servidor RMI que monitora a criação e o término de VMs Java HotSpot instrumentadas e fornece uma interface para permitir que ferramentas de monitoramento remoto, `jstat` e `jps`, se conectem a JVMs que estão sendo executadas no host local e coletem informações sobre o processo da JVM.

O servidor `jstatd` requer um registro RMI no host local. O servidor `jstatd` tenta se conectar ao registro RMI na porta padrão, ou na porta que você especificar com a opção `-p` `port`. Se um registro RMI não for encontrado, então um é criado dentro da aplicação `jstatd` que está vinculado à porta indicada pela opção `-p` `port` ou à porta padrão do registro RMI quando a opção `-p` `port` é omitida. Você pode impedir a criação de um registro RMI interno especificando a opção `-nr`.

## Opções para o Comando Jstatd

`-nr`

Esta opção não tenta criar um registro RMI interno dentro do processo `jstatd` quando um registro RMI existente não é encontrado.

`-p` _port_

Esta opção define o número da porta onde o registro RMI é esperado ser encontrado, ou, se não encontrado, criado caso a opção `-nr` não seja especificada.

`-r` _rmiport_

Esta opção define o número da porta à qual o conector RMI está vinculado. Se não especificado, uma porta aleatória disponível é usada.

`-n` _rminame_

Esta opção define o nome ao qual o objeto RMI remoto está vinculado no registro RMI. O nome padrão é `JStatRemoteHost`. Se vários servidores `jstatd` forem iniciados no mesmo host, o nome do objeto RMI exportado para cada servidor pode ser tornado único especificando esta opção. No entanto, fazer isso exige que o nome único do servidor seja incluído nas strings `hostid` e `vmid` do cliente de monitoramento.

`-J` _option_

Esta opção passa uma `option` Java para a JVM, onde a opção é uma daquelas descritas na página de referência para o launcher de aplicação Java. Por exemplo, `-J-Xms48m` define a memória de inicialização para 48 MB. Veja [java](<#/doc/tutorials/jvm/tools/core/java>).

## Segurança

O servidor `jstatd` pode monitorar apenas JVMs para as quais ele possui as permissões de acesso nativo apropriadas. Portanto, o processo `jstatd` deve estar sendo executado com as mesmas credenciais de usuário das JVMs de destino. Algumas credenciais de usuário, como o usuário root nos sistemas operacionais Linux e OS X, têm permissão para acessar a instrumentação exportada por qualquer JVM no sistema. Um processo `jstatd` executado com tais credenciais pode monitorar qualquer JVM no sistema, mas introduz preocupações de segurança adicionais.

O servidor `jstatd` não fornece nenhuma autenticação de clientes remotos. Portanto, executar um processo de servidor `jstatd` expõe a instrumentação exportada por todas as JVMs para as quais o processo `jstatd` tem permissões de acesso a qualquer usuário na rede. Essa exposição pode ser indesejável em seu ambiente e, portanto, as políticas de segurança locais devem ser consideradas antes de iniciar o processo `jstatd`, particularmente em ambientes de produção ou em redes que não são seguras.

O servidor `jstatd` instala uma instância de `RMISecurityPolicy` quando nenhum outro security manager está instalado e, portanto, requer que um arquivo de política de segurança seja especificado. O arquivo de política deve estar em conformidade com Default Policy Implementation and Policy File Syntax.

Se suas preocupações de segurança não puderem ser resolvidas com um arquivo de política personalizado, a ação mais segura é não executar o servidor `jstatd` e usar as ferramentas `jstat` e `jps` localmente. No entanto, ao usar `jps` para obter uma lista de JVMs instrumentadas, a lista não incluirá nenhuma JVM em execução em contêineres docker.

## Interface Remota

A interface exportada pelo processo `jstatd` é proprietária e garantida a mudar. Usuários e desenvolvedores são desencorajados a escrever para esta interface.

## Exemplos

A seguir estão exemplos do comando `jstatd`. Os scripts `jstatd` iniciam automaticamente o servidor em segundo plano.

### Registro RMI Interno

Este exemplo mostra como iniciar uma sessão `jstatd` com um registro RMI interno. Este exemplo assume que nenhum outro servidor está vinculado à porta padrão do registro RMI (porta `1099`).

### Registro RMI Externo

Este exemplo inicia uma sessão `jstatd` com um registro RMI externo.

Este exemplo inicia uma sessão `jstatd` com um servidor de registro RMI externo na porta `2020`.

Este exemplo inicia uma sessão `jstatd` com um servidor de registro RMI externo na porta `2020` e um conector JMX vinculado à porta `2021`.

Este exemplo inicia uma sessão `jstatd` com um registro RMI externo na porta 2020 que está vinculado a `AlternateJstatdServerName`.

### Parar a Criação de um Registro RMI Em-Processo

Este exemplo inicia uma sessão `jstatd` que não cria um registro RMI quando um não é encontrado. Este exemplo assume que um registro RMI já está em execução. Se um registro RMI não estiver em execução, uma mensagem de erro será exibida.

### Habilitar Log RMI

Este exemplo inicia uma sessão `jstatd` com capacidades de log RMI habilitadas. Esta técnica é útil como auxílio para solução de problemas ou para monitorar atividades do servidor.

### Neste tutorial

Apresentando o Jstatd Sinopse Descrição Opções para o Comando Jstatd Segurança Interface Remota Exemplos

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Jstat - Monitorando as Estatísticas das Suas JVMs](<#/doc/tutorials/jvm/tools/monitoring/jstat>)

➜

**Tutorial Atual**

Jstatd - Monitorando a Criação e Término das Suas JVMs

➜

Este é o fim da série!

**Anterior na Série:** [Jstat - Monitorando as Estatísticas das Suas JVMs](<#/doc/tutorials/jvm/tools/monitoring/jstat>)

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Monitoramento ](<#/doc/tutorials/jvm/tools/monitoring>) > Jstatd - Monitorando a Criação e Término das Suas JVMs