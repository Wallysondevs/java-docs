# O Comando rmiregistry

## Nome

rmiregistry - cria e inicia um registro de objeto remoto na porta especificada no host atual

## Sinopse

`rmiregistry` [_options_] [_port_]

_options_
     Isso representa a opção para o comando `rmiregistry`. Veja Opções

_port_
     O número de uma porta no host atual na qual iniciar o registro de objeto remoto.

## Descrição

O comando `rmiregistry` cria e inicia um registro de objeto remoto na porta especificada no host atual. Se a porta for omitida, o registro é iniciado na porta 1099. O comando `rmiregistry` não produz saída e é tipicamente executado em segundo plano, por exemplo:

> `rmiregistry &`

Um registro de objeto remoto é um serviço de nomes de bootstrap que é usado por servidores RMI no mesmo host para vincular objetos remotos a nomes. Clientes em hosts locais e remotos podem então procurar objetos remotos e fazer invocações de métodos remotos.

O registro é tipicamente usado para localizar o primeiro objeto remoto no qual uma aplicação precisa chamar métodos. Esse objeto então fornece suporte específico da aplicação para encontrar outros objetos.

Os métodos da classe `java.rmi.registry.LocateRegistry` são usados para obter um registro operando no host local ou no host e porta locais.

Os métodos baseados em URL da classe `java.rmi.Naming` operam em um registro e podem ser usados para:

  * Vincular o nome especificado a um objeto remoto

  * Retornar um array dos nomes vinculados no registro

  * Retornar uma referência, um stub, para o objeto remoto associado ao nome especificado

  * Rebind (reassociar) o nome especificado a um novo objeto remoto

  * Destruir a vinculação para o nome especificado que está associado a um objeto remoto

## Opções

`-J` _option_
     Usado com qualquer opção Java para passar a _option_ que segue o `-J` (sem espaços entre o `-J` e a opção) para o interpretador Java.