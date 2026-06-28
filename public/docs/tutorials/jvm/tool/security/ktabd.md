# Ktab - Gerenciando Sua Tabela de Chaves Local

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Segurança ](<#/doc/tutorials/jvm/tool/security>) > Ktab - Gerenciando Sua Tabela de Chaves Local

**Anterior na Série**

[Klist - Exibindo Sua Tabela de Chaves](<#/doc/tutorials/jvm/tool/security/klist>)

➜

**Tutorial Atual**

Ktab - Gerenciando Sua Tabela de Chaves Local

➜

Este é o fim da série!

**Anterior na Série:** [Klist - Exibindo Sua Tabela de Chaves](<#/doc/tutorials/jvm/tool/security/klist>)

# Ktab - Gerenciando Sua Tabela de Chaves Local

## Apresentando o ktab

[ktab](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/ktab.html>) - gerencia os nomes de principal e as chaves de serviço armazenados em uma tabela de chaves local

## Sinopse

`[commands] [options]` Lista o nome e as entradas da keytab, adiciona novas entradas de chave à keytab, exclui entradas de chave existentes e exibe instruções. Consulte Comandos e Opções.

## Descrição

O `ktab` permite ao usuário gerenciar os nomes de principal e as chaves de serviço armazenados em uma tabela de chaves local. Pares de principal e chave listados na keytab permitem que serviços em execução em um host se autentiquem no Key Distribution Center (KDC). Antes de configurar um servidor para usar Kerberos, você deve configurar uma keytab no host que executa o servidor. Observe que quaisquer atualizações feitas na keytab usando a ferramenta `ktab` não afetam o Kerberos database.

Uma _keytab_ é uma cópia da keylist de um host, que é análoga à password de um usuário. Um servidor de aplicação que precisa se autenticar no Key Distribution Center (KDC) deve ter uma keytab que contenha seu próprio principal e chave. Se você alterar as chaves na keytab, também deve fazer as alterações correspondentes no Kerberos database. A ferramenta `ktab` permite listar, adicionar, atualizar ou excluir nomes de principal e pares de chaves na tabela de chaves. Nenhuma dessas operações afeta o Kerberos database.

## Alerta de Segurança

Não especifique sua password na linha de comando. Fazer isso pode ser um risco de segurança. Por exemplo, um invasor poderia descobrir sua password ao executar o comando UNIX `ps`. Assim como é importante para os usuários protegerem suas passwords, é igualmente importante para os hosts protegerem suas keytabs. Você deve sempre armazenar arquivos keytab no disco local e torná-los legíveis apenas pelo root. Você nunca deve enviar um arquivo keytab pela rede em texto claro.

## Comandos e Opções

`-l [-e] [-t]`

Lista o nome e as entradas da keytab. Quando `-e` é especificado, o tipo de criptografia para cada entrada é exibido. Quando `-t` é especificado, o timestamp para cada entrada é exibido.

`-a principal_name [password] [-n kvno] [-append]`

Adiciona novas entradas de chave à keytab para o principal name fornecido com uma _password_ opcional. Se um _kvno_ for especificado, os Key Version Numbers das novas chaves serão iguais ao valor, caso contrário, os Key Version Numbers serão incrementados automaticamente. Se `-append` for especificado, novas chaves são anexadas à keytab, caso contrário, chaves antigas para o mesmo principal são removidas.

Nenhuma alteração é feita no Kerberos database. **Não especifique a password na linha de comando ou em um script.** Esta ferramenta solicitará uma password se ela não for especificada.

`-d principal_name [-f] [-e etype] [kvno | all| old]` Exclui entradas de chave da keytab para o principal especificado. Nenhuma alteração é feita no Kerberos database.

  * Se _kvno_ for especificado, a ferramenta exclui chaves cujos Key Version Numbers correspondem a kvno. Se `all` for especificado, exclui todas as chaves.
  * Se `old` for especificado, a ferramenta exclui todas as chaves, exceto aquelas com o _kvno_ mais alto. A ação padrão é `all`.
  * Se _etype_ for especificado, a ferramenta exclui apenas chaves deste tipo de criptografia. _etype_ deve ser especificado como o valor numérico _etype_ definido em RFC 3961, seção 8. Um prompt para confirmar a exclusão é exibido, a menos que `-f` seja especificado.

Quando _etype_ é fornecido, apenas a entrada que corresponde a este tipo de criptografia é excluída. Caso contrário, todas as entradas são excluídas.

`-help`

Exibe instruções.

## Opções Comuns

Esta opção pode ser usada com os comandos `-l`, `-a` ou `-d`.

`-k keytab name`

Especifica o nome e o caminho da keytab com o prefixo `FILE:`.

## Exemplos

  * Lista todas as entradas na keytable padrão

  * Adiciona um novo principal à tabela de chaves (observe que você será solicitado a inserir sua password)

  * Exclui um principal da tabela de chaves

### Neste tutorial

Apresentando Ktabd Sinopse Descrição Alerta de Segurança Comandos e Opções Opções Comuns Exemplos

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Klist - Exibindo Sua Tabela de Chaves](<#/doc/tutorials/jvm/tool/security/klist>)

➜

**Tutorial Atual**

Ktab - Gerenciando Sua Tabela de Chaves Local

➜

Este é o fim da série!

**Anterior na Série:** [Klist - Exibindo Sua Tabela de Chaves](<#/doc/tutorials/jvm/tool/security/klist>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Segurança ](<#/doc/tutorials/jvm/tool/security>) > Ktab - Gerenciando Sua Tabela de Chaves Local