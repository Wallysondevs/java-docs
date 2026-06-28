# O Comando ktab

## Nome

ktab - gerencia os nomes de principal e chaves de serviço armazenados em uma tabela de chaves local

## Sinopse

`ktab` [_commands_] [_options_]

[_commands_] [_options_]
     Lista o nome e as entradas da keytab, adiciona novas entradas de chave à keytab, exclui entradas de chave existentes e exibe instruções. Veja Comandos e Opções.

## Descrição

O `ktab` permite ao usuário gerenciar os nomes de principal e as chaves de serviço armazenados em uma tabela de chaves local. Pares de principal e chave listados na keytab permitem que serviços em execução em um host se autentiquem no Key Distribution Center (KDC).

Antes de configurar um servidor para usar Kerberos, você deve configurar uma keytab no host que executa o servidor. Observe que quaisquer atualizações feitas na keytab usando a ferramenta `ktab` não afetam o banco de dados Kerberos.

Uma _keytab_ é uma cópia da lista de chaves de um host, que é análoga à senha de um usuário. Um servidor de aplicação que precisa se autenticar no Key Distribution Center (KDC) deve ter uma keytab que contenha seu próprio principal e chave. Se você alterar as chaves na keytab, também deve fazer as alterações correspondentes no banco de dados Kerberos. A ferramenta `ktab` permite listar, adicionar, atualizar ou excluir nomes de principal e pares de chaves na tabela de chaves. Nenhuma dessas operações afeta o banco de dados Kerberos.

## Alerta de Segurança

Não especifique sua senha na linha de comando. Fazer isso pode ser um risco de segurança. Por exemplo, um invasor pode descobrir sua senha ao executar o comando UNIX `ps`.

Assim como é importante para os usuários protegerem suas senhas, é igualmente importante para os hosts protegerem suas keytabs. Você deve sempre armazenar arquivos keytab no disco local e torná-los legíveis apenas por root. Você nunca deve enviar um arquivo keytab por uma rede em texto claro.

## Comandos e Opções

`-l` [`-e`] [`-t`]
     Lista o nome e as entradas da keytab. Quando `-e` é especificado, o encryption type para cada entrada é exibido. Quando `-t` é especificado, o timestamp para cada entrada é exibido.
`-a` _principal_name_ [_password_] [`-n` _kvno_] [`-s` _salt_ | `-f`] [`-append`]
    

Adiciona novas entradas de chave à keytab para o nome de principal fornecido com uma _password_ opcional. Se um _kvno_ for especificado, os Key Version Numbers das novas chaves serão iguais ao valor; caso contrário, os Key Version Numbers serão incrementados automaticamente. Se _salt_ for especificado, ele será usado em vez do salt padrão. Se `-f` for especificado, o KDC será contatado para buscar o salt. Se `-append` for especificado, novas chaves são anexadas à keytab; caso contrário, chaves antigas para o mesmo principal são removidas.

Nenhuma alteração é feita no banco de dados Kerberos. **Não especifique a senha na linha de comando ou em um script.** Esta ferramenta solicitará uma senha se ela não for especificada.

`-d` _principal_name_ [`-f`] [`-e` _etype_] [_kvno_ | `all`| `old`]
    

Exclui entradas de chave da keytab para o principal especificado. Nenhuma alteração é feita no banco de dados Kerberos.

  * Se _kvno_ for especificado, a ferramenta exclui chaves cujos Key Version Numbers correspondem a kvno. Se `all` for especificado, exclui todas as chaves.

  * Se `old` for especificado, a ferramenta exclui todas as chaves, exceto aquelas com o _kvno_ mais alto. A ação padrão é `all`.

  * Se _etype_ for especificado, a ferramenta exclui apenas chaves deste encryption type. _etype_ deve ser especificado como o valor numérico _etype_ definido em RFC 3961, section 8. Um prompt para confirmar a exclusão é exibido, a menos que `-f` seja especificado.

Quando _etype_ é fornecido, apenas a entrada que corresponde a este encryption type é excluída. Caso contrário, todas as entradas são excluídas.

`-help`
     Exibe instruções.

## Opções Comuns

Esta opção pode ser usada com os comandos `-l`, `-a` ou `-d`.

`-k` _keytab name_
     Especifica o nome e o caminho da keytab com o prefixo `FILE:`.

## Exemplos

  * Lista todas as entradas na keytable padrão

> `ktab -l`

  * Adiciona um novo principal à tabela de chaves (observe que você será solicitado a inserir sua senha)

> `ktab -a duke@example.com`

  * Exclui um principal da tabela de chaves

> `ktab -d duke@example.com`