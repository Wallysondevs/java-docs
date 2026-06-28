# O Comando jshell

## Nome

jshell - avalia interativamente declarações, instruções e expressões da linguagem de programação Java em um loop de leitura-avaliação-impressão (REPL)

## Sinopse

`jshell` [_options_] [_load-files_]

_options_
     Opções de linha de comando, separadas por espaços. Veja Opções para jshell.
_load-files_
    

Um ou mais scripts para executar quando a ferramenta é iniciada. Scripts podem conter quaisquer snippets de código válidos ou comandos JShell.

O script pode ser um arquivo local ou um dos seguintes scripts predefinidos:

`DEFAULT`
     Carrega as entradas padrão, que são comumente usadas como imports.
`JAVASE`
     Importa todos os pacotes Java SE.
`PRINTING`
     Define `print`, `println` e `printf` como métodos `jshell` para uso dentro da ferramenta.
`TOOLING`
     Define `javac`, `jar` e outros métodos para executar ferramentas JDK através de sua interface de linha de comando dentro da ferramenta `jshell`.

Para mais de um script, use um espaço para separar os nomes. Os scripts são executados na ordem em que são inseridos na linha de comando. Scripts de linha de comando são executados após os scripts de inicialização. Para executar um script depois que o JShell é iniciado, use o comando `/open`.

Para aceitar entrada da entrada padrão e suprimir a E/S interativa, insira um hífen (-) para _load-files_. Esta opção permite o uso da ferramenta `jshell` em cadeias de pipe.

## Descrição

JShell oferece uma maneira de avaliar interativamente declarações, instruções e expressões da linguagem de programação Java, tornando mais fácil aprender a linguagem, explorar código e APIs desconhecidos e prototipar código complexo. Instruções Java, definições de variáveis, definições de métodos, definições de classes, instruções de importação e expressões são aceitas. Os pedaços de código inseridos são chamados de snippets.

À medida que os snippets são inseridos, eles são avaliados e um feedback é fornecido. O feedback varia desde os resultados e explicações das ações até nada, dependendo do snippet inserido e do modo de feedback escolhido. Erros são descritos independentemente do modo de feedback. Comece com o modo verbose para obter o máximo de feedback enquanto aprende a ferramenta.

Opções de linha de comando estão disponíveis para configurar o ambiente inicial quando o JShell é iniciado. Dentro do JShell, comandos estão disponíveis para modificar o ambiente conforme necessário.

Snippets existentes podem ser carregados de um arquivo para inicializar uma sessão JShell, ou a qualquer momento dentro de uma sessão. Snippets podem ser modificados dentro da sessão para experimentar diferentes variações e fazer correções. Para guardar snippets para uso posterior, salve-os em um arquivo.

## Opções para jshell

`--add-exports` _module_ /_package_
     Especifica um pacote a ser considerado como exportado de seu módulo definidor.
`--add-modules` _module_[`,`_module_...]
     Especifica os módulos raiz a serem resolvidos além do módulo inicial.
`-C` _flag_
     passa _flag_ para o compilador Java dentro do JShell. Por exemplo, `-C-Xlint` habilita todos os avisos lint recomendados, e `-C--release=<N>` compila para Java SE N, como se \--release N tivesse sido especificado.
`--class-path` _path_
     Especifica os diretórios e arquivos que são pesquisados para localizar arquivos de classe. Esta opção sobrescreve o caminho na variável de ambiente `CLASSPATH`. Se a variável de ambiente não estiver definida e esta opção não for usada, então o diretório atual é pesquisado. Para Linux e macOS, use dois pontos (:) para separar itens no caminho. Para Windows, use um ponto e vírgula (;) para separar itens.
`--enable-preview`
     Permite que o código dependa dos recursos de pré-visualização desta versão.
`--execution` _specification_
     Especifica um motor de execução alternativo, onde _specification_ é uma especificação ExecutionControl. Veja a documentação do pacote jdk.jshell.spi para a sintaxe da especificação.
`--feedback` _mode_
    

Define o nível inicial de feedback fornecido em resposta ao que é inserido. O nível inicial pode ser sobrescrito dentro de uma sessão usando o comando `/set feedback` _mode_. O padrão é `normal`.

Os seguintes valores são válidos para _mode_ :

`verbose`
     Fornece feedback detalhado para as entradas. Informações adicionais sobre a ação realizada são exibidas após o resultado da ação. O próximo prompt é separado do feedback por uma linha em branco.
`normal`
     Fornece uma quantidade média de feedback. O próximo prompt é separado do feedback por uma linha em branco.
`concise`
     Fornece feedback mínimo. O próximo prompt segue imediatamente o snippet de código ou o feedback.
`silent`
     Não fornece feedback. O próximo prompt segue imediatamente o snippet de código.
_custom_
     Fornece feedback personalizado com base em como o modo é definido. Modos de feedback personalizados são criados dentro do JShell usando o comando `/set mode`.
`--help` ou `-h` ou `-?`
     Imprime um resumo das opções padrão e sai da ferramenta.
`--help-extra` ou `-X`
     Imprime um resumo das opções não padrão e sai da ferramenta. Opções não padrão estão sujeitas a alterações sem aviso prévio.
`-J` _flag_
     passa _flag_ para o sistema de tempo de execução, mas não tem efeito na execução de snippets de código. Para especificar flags que afetam a execução de snippets de código, use `-R` _flag_. Alternativamente, use `-J` _flag_ com `--execution local`.
`--module-path` _modulepath_
     Especifica onde encontrar módulos de aplicação. Para Linux e macOS, use dois pontos (:) para separar itens no caminho. Para Windows, use um ponto e vírgula (;) para separar itens.
`--no-startup`
     Impede que scripts de inicialização sejam executados quando o JShell inicia. Use esta opção para executar apenas os scripts inseridos na linha de comando quando o JShell é iniciado, ou para iniciar o JShell sem nenhuma informação pré-carregada se nenhum script for inserido. Esta opção não pode ser usada se a opção `--startup` for usada.
`-q`
     Define o modo de feedback para `concise`, o que é o mesmo que inserir `--feedback concise`.
`-R` _flag_
     passa _flag_ para o sistema de tempo de execução apenas quando snippets de código são executados. Por exemplo, `-R-Dfoo=bar` significa que a execução do snippet `System.getProperty("foo")` retornará `"bar"`.
`-s`
     Define o modo de feedback para `silent`, o que é o mesmo que inserir `--feedback silent`.
`--show-version`
     Imprime informações de versão e entra na ferramenta.
`--startup` _file_
    

Sobrescreve o script de inicialização padrão para esta sessão. O script pode conter quaisquer snippets de código ou comandos válidos.

O script pode ser um arquivo local ou um dos seguintes scripts predefinidos:

`DEFAULT`
     Carrega as entradas padrão, que são comumente usadas como imports.
`JAVASE`
     Importa todos os pacotes Java SE.
`PRINTING`
     Define `print`, `println` e `printf` como métodos `jshell` para uso dentro da ferramenta.
`TOOLING`
     Define `javac`, `jar` e outros métodos para executar ferramentas JDK através de sua interface de linha de comando dentro da ferramenta `jshell`.

Para mais de um script, forneça uma instância separada desta opção para cada script. Scripts de inicialização são executados quando o JShell é iniciado pela primeira vez e quando a sessão é reiniciada com os comandos `/reset`, `/reload` ou `/env`. Scripts de inicialização são executados na ordem em que são inseridos na linha de comando.

Esta opção não pode ser usada se a opção `--no-startup` for usada.

`-v`
     Define o modo de feedback para `verbose`, o que é o mesmo que inserir `--feedback verbose`.
`--version`
     Imprime informações de versão e sai da ferramenta.

## Comandos jshell

Dentro da ferramenta `jshell`, comandos são usados para modificar o ambiente e gerenciar snippets de código.

`/drop` {_name_ |_id_ |_startID_`-`_endID_} [{_name_ |_id_ |_startID_`-`_endID_}...]
     Descarta snippets identificados por nome, ID ou intervalo de IDs, tornando-os inativos. Para um intervalo de IDs, forneça o ID inicial e o ID final separados por um hífen. Para fornecer uma lista, separe os itens da lista com um espaço. Use o comando `/list` para ver os IDs dos snippets de código.
`/edit` [_option_]
    

Abre um editor. Se nenhuma opção for inserida, o editor abre com os snippets ativos.

As seguintes opções são válidas:

{_name_ |_id_ |_startID_`-`_endID_} [{_name_ |_id_ |_startID_`-`_endID_}...]
     Abre o editor com os snippets identificados por nome, ID ou intervalo de IDs. Para um intervalo de IDs, forneça o ID inicial e o ID final separados por um hífen. Para fornecer uma lista, separe os itens da lista com um espaço. Use o comando `/list` para ver os IDs dos snippets de código.
`-all`
     Abre o editor com todos os snippets, incluindo snippets de inicialização e snippets que falharam, foram sobrescritos ou descartados.
`-start`
     Abre o editor com os snippets de inicialização que foram avaliados quando o JShell foi iniciado.

Para sair do modo de edição, feche a janela do editor, ou responda ao prompt fornecido se a opção `-wait` foi usada quando o editor foi configurado.

Use o comando `/set editor` para especificar o editor a ser usado. Se nenhum editor for definido, as seguintes variáveis de ambiente são verificadas em ordem: `JSHELLEDITOR`, `VISUAL` e `EDITOR`. Se nenhum editor for definido no JShell e nenhuma das variáveis de ambiente do editor for definida, então um editor padrão simples é usado.

`/env` [_options_]
    

Exibe as configurações do ambiente, ou atualiza as configurações do ambiente e reinicia a sessão. Se nenhuma opção for inserida, as configurações atuais do ambiente são exibidas. Se uma ou mais opções forem inseridas, a sessão é reiniciada da seguinte forma:

  * Atualiza as configurações do ambiente com as opções fornecidas.

  * Reinicia o estado de execução.

  * Executa os scripts de inicialização.

  * Reproduz silenciosamente o histórico na ordem inserida. O histórico inclui todos os snippets válidos ou comandos `/drop` inseridos no prompt `jshell`, em scripts inseridos na linha de comando, ou scripts inseridos com o comando `/open`.

As configurações de ambiente inseridas na linha de comando ou fornecidas com um comando `/reset`, `/env` ou `/reload` anterior são mantidas, a menos que uma _option_ seja inserida que sobrescreva a configuração.

As seguintes opções são válidas:

`--add-modules` _module_[`,`_module_...]
     Especifica os módulos raiz a serem resolvidos além do módulo inicial.
`--add-exports` _source-module_`/`_package_`=`_target-module_[`,`_target-module_]*
     Adiciona uma exportação de _package_ de _source-module_ para _target-module_.
`--class-path` _path_
     Especifica os diretórios e arquivos que são pesquisados para localizar arquivos de classe. Esta opção sobrescreve o caminho na variável de ambiente `CLASSPATH`. Se a variável de ambiente não estiver definida e esta opção não for usada, então o diretório atual é pesquisado. Para Linux e macOS, use dois pontos (`:`) para separar itens no caminho. Para Windows, use um ponto e vírgula (`;`) para separar itens.
`--module-path` _modulepath_
     Especifica onde encontrar módulos de aplicação. Para Linux e macOS, use dois pontos (`:`) para separar itens no caminho. Para Windows, use um ponto e vírgula (`;`) para separar itens.
`/exit` [_integer-expression-snippet_]
     Sai da ferramenta. Se nenhum snippet for inserido, o status de saída é zero. Se um snippet for inserido e o resultado do snippet for um inteiro, o resultado é usado como status de saída. Se ocorrer um erro, ou o resultado do snippet não for um inteiro, um erro é exibido e a ferramenta permanece ativa.
`/history`
     Exibe o que foi inserido nesta sessão.
`/help` [_command_ |_subject_]
    

Exibe informações sobre comandos e assuntos. Se nenhuma opção for inserida, um resumo das informações para todos os comandos e uma lista de assuntos disponíveis são exibidos. Se um comando válido for fornecido, informações expandidas para esse comando são exibidas. Se um assunto válido for inserido, informações sobre esse assunto são exibidas.

Os seguintes valores para _subject_ são válidos:

`context`
     Descreve as opções disponíveis para configurar o ambiente.
`intro`
     Fornece uma introdução à ferramenta.
`shortcuts`
     Descreve atalhos de teclado para completar comandos e snippets. Veja Atalhos de Entrada.
`/imports`
     Exibe os imports ativos atuais, incluindo aqueles dos scripts de inicialização e scripts que foram inseridos na linha de comando quando o JShell foi iniciado.
`/list` [_option_]
    

Exibe uma lista de snippets e seus IDs. Se nenhuma opção for inserida, todos os snippets ativos são exibidos, mas os snippets de inicialização não.

As seguintes opções são válidas:

{_name_ |_id_ |_startID_`-`_endID_} [{_name_ |_id_ |_startID_`-`_endID_}...]
     Exibe os snippets identificados por nome, ID ou intervalo de IDs. Para um intervalo de IDs, forneça o ID inicial e o ID final separados por um hífen. Para fornecer uma lista, separe os itens da lista com um espaço.
`-all`
     Exibe todos os snippets, incluindo snippets de inicialização e snippets que falharam, foram sobrescritos ou descartados. IDs que começam com `s` são snippets de inicialização. IDs que começam com `e` são snippets que falharam.
`-start`
     Exibe os snippets de inicialização que foram avaliados quando o JShell foi iniciado.
`/methods` [_option_]
    

Exibe informações sobre os métodos que foram inseridos. Se nenhuma opção for inserida, o nome, os tipos de parâmetros e o tipo de retorno de todos os métodos ativos são exibidos.

As seguintes opções são válidas:

{_name_ |_id_ |_startID_`-`_endID_} [{_name_ |_id_ |_startID_`-`_endID_}...]
     Exibe informações para métodos identificados por nome, ID ou intervalo de IDs. Para um intervalo de IDs, forneça o ID inicial e o ID final separados por um hífen. Para fornecer uma lista, separe os itens da lista com um espaço. Use o comando `/list` para ver os IDs dos snippets de código.
`-all`
     Exibe informações para todos os métodos, incluindo aqueles adicionados quando o JShell foi iniciado, e métodos que falharam, foram sobrescritos ou descartados.
`-start`
     Exibe informações para métodos de inicialização que foram adicionados quando o JShell foi iniciado.
`/open` _file_
    

Abre o script especificado e lê os snippets para a ferramenta. O script pode ser um arquivo local ou um dos seguintes scripts predefinidos:

`DEFAULT`
     Carrega as entradas padrão, que são comumente usadas como imports.
`JAVASE`
     Importa todos os pacotes Java SE.
`PRINTING`
     Define `print`, `println` e `printf` como métodos `jshell` para uso dentro da ferramenta.
`TOOLING`
     Define `javac`, `jar` e outros métodos para executar ferramentas JDK através de sua interface de linha de comando dentro da ferramenta `jshell`.
`/reload` [_options_]
    

Reinicia a sessão da seguinte forma:

  * Atualiza as configurações do ambiente com as opções fornecidas, se houver.

  * Reinicia o estado de execução.

  * Executa os scripts de inicialização.

  * Reproduz o histórico na ordem inserida. O histórico inclui todos os snippets válidos ou comandos `/drop` inseridos no prompt `jshell`, em scripts inseridos na linha de comando, ou scripts inseridos com o comando `/open`.

As configurações de ambiente inseridas na linha de comando ou fornecidas com um comando `/reset`, `/env` ou `/reload` anterior são mantidas, a menos que uma _option_ seja inserida que sobrescreva a configuração.

As seguintes opções são válidas:

`--add-modules` _module_[`,`_module_...]
     Especifica os módulos raiz a serem resolvidos além do módulo inicial.
`--add-exports` _source-module_`/`_package_`=`_target-module_[`,`_target-module_]*
     Adiciona uma exportação de _package_ de _source-module_ para _target-module_.
`--class-path` _path_
     Especifica os diretórios e arquivos que são pesquisados para localizar arquivos de classe. Esta opção sobrescreve o caminho na variável de ambiente `CLASSPATH`. Se a variável de ambiente não estiver definida e esta opção não for usada, então o diretório atual é pesquisado. Para Linux e macOS, use dois pontos (`:`) para separar itens no caminho. Para Windows, use um ponto e vírgula (`;`) para separar itens.
`--module-path` _modulepath_
     Especifica onde encontrar módulos de aplicação. Para Linux e macOS, use dois pontos (`:`) para separar itens no caminho. Para Windows, use um ponto e vírgula (`;`) para separar itens.
`-quiet`
     Reproduz o histórico válido sem exibi-lo. Erros são exibidos.
`-restore`
     Reinicia o ambiente para o estado no início da execução anterior da ferramenta ou para a última vez que um comando `/reset`, `/reload` ou `/env` foi executado na execução anterior. O histórico válido desde esse ponto é reproduzido. Use esta opção para restaurar uma sessão JShell anterior.
`/reset` [_options_]
    

Descarta todos os snippets inseridos e reinicia a sessão da seguinte forma:

  * Atualiza as configurações do ambiente com as opções fornecidas, se houver.

  * Reinicia o estado de execução.

  * Executa os scripts de inicialização.

O histórico não é reproduzido. Todo o código que foi inserido é perdido.

As configurações de ambiente inseridas na linha de comando ou fornecidas com um comando `/reset`, `/env` ou `/reload` anterior são mantidas, a menos que uma _option_ seja inserida que sobrescreva a configuração.

As seguintes opções são válidas:

`--add-modules` _module_[`,`_module_...]
     Especifica os módulos raiz a serem resolvidos além do módulo inicial.
`--add-exports` _source-module_`/`_package_`=`_target-module_[`,`_target-module_]*
     Adiciona uma exportação de _package_ de _source-module_ para _target-module_.
`--class-path` _path_
     Especifica os diretórios e arquivos que são pesquisados para localizar arquivos de classe. Esta opção sobrescreve o caminho na variável de ambiente `CLASSPATH`. Se a variável de ambiente não estiver definida e esta opção não for usada, então o diretório atual é pesquisado. Para Linux e macOS, use dois pontos (`:`) para separar itens no caminho. Para Windows, use um ponto e vírgula (`;`) para separar itens.
`--module-path` _modulepath_
     Especifica onde encontrar módulos de aplicação. Para Linux e macOS, use dois pontos (`:`) para separar itens no caminho. Para Windows, use um ponto e vírgula (`;`) para separar itens.
`/save` [_options_] _file_
    

Salva snippets e comandos no arquivo especificado. Se nenhuma opção for inserida, os snippets ativos são salvos.

As seguintes opções são válidas:

{_name_ |_id_ |_startID_`-`_endID_} [{_name_ |_id_ |_startID_`-`_endID_}...]
     Salva os snippets e comandos identificados por nome, ID ou intervalo de IDs. Para um intervalo de IDs, forneça o ID inicial e o ID final separados por um hífen. Para fornecer uma lista, separe os itens da lista com um espaço. Use o comando `/list` para ver os IDs dos snippets de código.
`-all`
     Salva todos os snippets, incluindo snippets de inicialização e snippets que foram sobrescritos ou falharam.
`-history`
     Salva o histórico sequencial de todos os comandos e snippets inseridos na sessão atual.
`-start`
     Salva as configurações de inicialização atuais. Se nenhum script de inicialização foi fornecido, um arquivo vazio é salvo.
`/set` [_setting_]
    

Define informações de configuração, incluindo o editor externo, configurações de inicialização e modo de feedback. Este comando também é usado para criar um modo de feedback personalizado com valores customizados de prompt, formato e truncamento. Se nenhuma configuração for inserida, as configurações atuais para o editor, configurações de inicialização e modo de feedback são exibidas.

Os seguintes valores são válidos para `setting`:

`editor` [_options_] [_command_]
    

Define o comando usado para iniciar um editor externo quando o comando `/edit` é inserido. O comando pode incluir argumentos de comando separados por espaços. Se nenhum comando ou opção for inserido, a configuração atual é exibida.

As seguintes opções são válidas:

`-default`
     Define o editor para o editor padrão fornecido com o JShell. Esta opção não pode ser usada se um comando para iniciar um editor for inserido.
`-delete`
    

Define o editor para aquele em vigor quando a sessão foi iniciada. Se usado com a opção `-retain`, a configuração do editor retida é excluída e o editor é definido para a primeira das seguintes variáveis de ambiente encontradas: `JSHELLEDITOR`, `VISUAL` ou `EDITOR`. Se nenhuma das variáveis de ambiente do editor estiver definida, esta opção define o editor para o editor padrão.

Esta opção não pode ser usada se um comando para iniciar um editor for inserido.

`-retain`
     Salva a configuração do editor entre sessões. Se nenhuma outra opção ou comando for inserido, a configuração atual é salva.
`-wait`
     Solicita ao usuário que indique quando a edição está completa. Caso contrário, o controle retorna ao JShell quando o editor é fechado. Use esta opção se o editor em uso for fechado imediatamente, por exemplo, quando uma janela de edição já existe. Esta opção é válida apenas quando um comando para iniciar um editor é inserido.
`feedback` [_mode_]
    

Define o modo de feedback usado para responder à entrada. Se nenhum modo for inserido, o modo atual é exibido.

Os seguintes modos são válidos: `concise`, `normal`, `silent`, `verbose`, e qualquer modo personalizado criado com o comando `/set mode`.

`format` _mode_ _field_ `"`_format-string_`"` _selector_
    

Define o formato do feedback fornecido em resposta à entrada. Se nenhum modo for inserido, os formatos atuais para todos os campos de todos os modos de feedback são exibidos. Se apenas um modo for inserido, os formatos atuais para esse modo são exibidos. Se apenas um modo e um campo forem inseridos, os formatos atuais para esse campo são exibidos.

Para definir um formato, os seguintes argumentos são necessários:

_mode_
     Especifica um modo de feedback ao qual o formato de resposta é aplicado. Apenas modos personalizados criados com o comando `/set mode` podem ser modificados.
_field_
     Especifica um campo específico de contexto ao qual o formato de resposta é aplicado. Os campos são descritos na ajuda online, que é acessada do JShell usando o comando `/help /set format`.
`"`_format-string_`"`
     Especifica a string a ser usada como formato de resposta para o campo e seletor especificados. A estrutura da string de formato é descrita na ajuda online, que é acessada do JShell usando o comando `/help /set format`.
_selector_
     Especifica o contexto no qual o formato de resposta é aplicado. Os seletores são descritos na ajuda online, que é acessada do JShell usando o comando `/help /set format`.
`mode` [_mode-name_] [_existing-mode_] [_options_]
    

Cria um modo de feedback personalizado com o nome de modo fornecido. Se nenhum nome de modo for inserido, as configurações para todos os modos são exibidas, o que inclui as configurações de modo, prompt, formato e truncamento. Se o nome de um modo existente for fornecido, as configurações do modo existente são copiadas para o modo que está sendo criado.

As seguintes opções são válidas:

`-command`|`-quiet`
     Especifica o nível de feedback exibido para comandos ao usar o modo. Esta opção é necessária ao criar um modo de feedback. Use `-command` para mostrar informações e feedback de verificação para comandos. Use `-quiet` para mostrar apenas feedback essencial para comandos, como mensagens de erro.
`-delete`
     Exclui o modo de feedback nomeado para esta sessão. O nome do modo a ser excluído é obrigatório. Para excluir permanentemente um modo retido, use a opção `-retain` com esta opção. Modos predefinidos não podem ser excluídos.
`-retain`
     Salva o modo de feedback nomeado entre sessões. O nome do modo a ser retido é obrigatório.

Configure o novo modo de feedback usando os comandos `/set prompt`, `/set format` e `/set truncation`.

Para começar a usar o novo modo, use o comando `/set feedback`.

`prompt` _mode_ `"`_prompt-string_`"` `"`_continuation-prompt-string_`"`
    

Define os prompts para entrada dentro do JShell. Se nenhum modo for inserido, os prompts atuais para todos os modos de feedback são exibidos. Se apenas um modo for inserido, os prompts atuais para esse modo são exibidos.

Para definir um prompt, os seguintes argumentos são necessários:

_mode_
     Especifica o modo de feedback ao qual os prompts são aplicados. Apenas modos personalizados criados com o comando `/set mode` podem ser modificados.
`"`_prompt-string_`"`
     Especifica a string a ser usada como prompt para a primeira linha de entrada.
`"`_continuation-prompt-string_`"`
     Especifica a string a ser usada como prompt para as linhas de entrada adicionais necessárias para completar um snippet.
`start` [`-retain`] [_file_ [_file_...]|_option_]
    

Define os nomes dos scripts de inicialização usados quando o próximo comando `/reset`, `/reload` ou `/env` é inserido. Se mais de um script for inserido, os scripts são executados na ordem inserida. Se nenhum script ou opção for inserido, as configurações de inicialização atuais são exibidas.

Os scripts podem ser arquivos locais ou um dos seguintes scripts predefinidos:

`DEFAULT`
     Carrega as entradas padrão, que são comumente usadas como imports.
`JAVASE`
     Importa todos os pacotes Java SE.
`PRINTING`
     Define `print`, `println` e `printf` como métodos `jshell` para uso dentro da ferramenta.
`TOOLING`
     Define `javac`, `jar` e outros métodos para executar ferramentas JDK através de sua interface de linha de comando dentro da ferramenta `jshell`.

As seguintes opções são válidas:

`-default`
     Define as configurações de inicialização para as configurações padrão.
`-none`
     Especifica que nenhuma configuração de inicialização é usada.

Use a opção `-retain` para salvar a configuração de inicialização entre sessões.

`truncation` _mode_ _length_ _selector_
    

Define o comprimento máximo de um valor exibido. Se nenhum modo for inserido, os valores de truncamento atuais para todos os modos de feedback são exibidos. Se apenas um modo for inserido, os valores de truncamento atuais para esse modo são exibidos.

Para definir valores de truncamento, os seguintes argumentos são necessários:

_mode_
     Especifica o modo de feedback ao qual o valor de truncamento é aplicado. Apenas modos personalizados criados com o comando `/set mode` podem ser modificados.
_length_
     Especifica o inteiro sem sinal a ser usado como comprimento máximo para o seletor especificado.
_selector_
     Especifica o contexto no qual o valor de truncamento é aplicado. Os seletores são descritos na ajuda online, que é acessada do JShell usando o comando `/help /set truncation`.
`/types` [_option_]
    

Exibe classes, interfaces e enums que foram inseridos. Se nenhuma opção for inserida, todas as classes, interfaces e enums ativos atuais são exibidos.

As seguintes opções são válidas:

{_name_ |_id_ |_startID_`-`_endID_} [{_name_ |_id_ |_startID_`-`_endID_}...]
     Exibe informações para classes, interfaces e enums identificados por nome, ID ou intervalo de IDs. Para um intervalo de IDs, forneça o ID inicial e o ID final separados por um hífen. Para fornecer uma lista, separe os itens da lista com um espaço. Use o comando `/list` para ver os IDs dos snippets de código.
`-all`
     Exibe informações para todas as classes, interfaces e enums, incluindo aqueles adicionados quando o JShell foi iniciado, e classes, interfaces e enums que falharam, foram sobrescritos ou descartados.
`-start`
     Exibe informações para classes, interfaces e enums de inicialização que foram adicionados quando o JShell foi iniciado.
`/vars` [_option_]
    

Exibe o nome, tipo e valor das variáveis que foram inseridas. Se nenhuma opção for inserida, todas as variáveis ativas atuais são exibidas.

As seguintes opções são válidas:

{_name_ |_id_ |_startID_`-`_endID_} [{_name_ |_id_ |_startID_`-`_endID_}...]
     Exibe informações para variáveis identificadas por nome, ID ou intervalo de IDs. Para um intervalo de IDs, forneça o ID inicial e o ID final separados por um hífen. Para fornecer uma lista, separe os itens da lista com um espaço. Use o comando `/list` para ver os IDs dos snippets de código.
`-all`
     Exibe informações para todas as variáveis, incluindo aquelas adicionadas quando o JShell foi iniciado, e variáveis que falharam, foram sobrescritas ou descartadas.
`-start`
     Exibe informações para variáveis de inicialização que foram adicionadas quando o JShell foi iniciado.
`/?`
     O mesmo que o comando `/help`.
`/!`
     Reexecuta o último snippet.
`/`{_name_ |_id_ |_startID_`-`_endID_} [{_name_ |_id_ |_startID_`-`_endID_}...]
     Reexecuta os snippets identificados por ID, intervalo de IDs ou nome. Para um intervalo de IDs, forneça o ID inicial e o ID final separados por um hífen. Para fornecer uma lista, separe os itens da lista com um espaço. O primeiro item da lista deve ser um ID ou intervalo de IDs. Use o comando `/list` para ver os IDs dos snippets de código.
`/-`_n_
     Reexecuta o -_n_º snippet anterior. Por exemplo, se 15 snippets de código foram inseridos, então `/-4` executa o 11º snippet. Comandos não são incluídos na contagem.
## Atalhos de Entrada

Os seguintes atalhos estão disponíveis para inserir comandos e snippets no JShell.

### Preenchimento com Tab

**< tab>**
    

Ao inserir snippets, comandos, subcomandos, argumentos de comando ou opções de comando, use a tecla Tab para preencher automaticamente o item. Se o item não puder ser determinado a partir do que foi inserido, as opções possíveis serão fornecidas.

Ao inserir uma chamada de método, use a tecla Tab após o parêntese de abertura da chamada do método para ver os parâmetros do método. Se o método tiver mais de uma assinatura, todas as assinaturas serão exibidas. Pressionar a tecla Tab uma segunda vez exibe a descrição do método e os parâmetros para a primeira assinatura. Continue pressionando a tecla Tab para obter uma descrição de quaisquer assinaturas adicionais.

**Shift+ &lt;Tab&gt; V**
     Após inserir uma expressão completa, use esta sequência de teclas para converter a expressão em uma declaração de variável de um tipo determinado pelo tipo da expressão. 
**Shift+ &lt;Tab&gt; M**
     Após inserir uma expressão ou instrução completa, use esta sequência de teclas para converter a expressão ou instrução em uma declaração de método. Se uma expressão for inserida, o tipo de retorno será baseado no tipo da expressão. 
**Shift+ &lt;Tab&gt; I**
     Quando um identificador que não pode ser resolvido é inserido, use esta sequência de teclas para mostrar possíveis imports que resolvem o identificador com base no conteúdo do classpath especificado. 

### Abreviações de Comando

Uma abreviação de um comando é aceita se a abreviação identificar o comando de forma única. Por exemplo, `/l` é reconhecido como o comando `/list`. No entanto, `/s` não é uma abreviação válida porque não pode ser determinado se o comando `/set` ou `/save` é o pretendido. Use `/se` para o comando `/set` ou `/sa` para o comando `/save`.

Abreviações também são aceitas para subcomandos, argumentos de comando e opções de comando. Por exemplo, use `/m -a` para exibir todos os métodos.

### Navegação no Histórico

Um histórico do que foi inserido é mantido entre as sessões. Use as setas para cima e para baixo para rolar pelos comandos e snippets das sessões atuais e passadas. Use a tecla Ctrl com as setas para cima e para baixo para pular todas as linhas, exceto a primeira, de snippets de várias linhas.

### Busca no Histórico

Use a combinação de teclas Ctrl+R para buscar no histórico pela string inserida. O prompt muda para mostrar a string e a correspondência. Ctrl+R busca para trás a partir da localização atual no histórico através de entradas anteriores. Ctrl+S busca para frente a partir da localização atual no histórico através de entradas posteriores.

## Edição de Entrada

As capacidades de edição do JShell são semelhantes às de outros shells comuns. Teclas do teclado e combinações de teclas fornecem atalhos de edição de linha. A tecla Ctrl e a tecla Meta são usadas em combinações de teclas. Se o seu teclado não tiver uma tecla Meta, a tecla Alt é frequentemente mapeada para fornecer a funcionalidade da tecla Meta.

| Tecla ou Combinação de Teclas | Ação |
|---|---|
| Return | Insere a linha atual. |
| Left arrow | Move o cursor um caractere para a esquerda. |
| Right arrow | Move o cursor um caractere para a direita. |
| Ctrl+A | Move o cursor para o início da linha. |
| Ctrl+E | Move o cursor para o final da linha. |
| Meta+B | Move o cursor uma palavra para a esquerda. |
| Meta+F | Move o cursor uma palavra para a direita. |
| Delete | Exclui o caractere sob o cursor. |
| Backspace | Exclui o caractere antes do cursor. |
| Ctrl+K | Exclui o texto do cursor até o final da linha. |
| Meta+D | Exclui o texto do cursor até o final da palavra. |
| Ctrl+W | Exclui o texto do cursor até o espaço em branco anterior. |
| Ctrl+Y | Cola o texto excluído mais recentemente na linha. |
| Meta+Y | Após Ctrl+Y, pressione para alternar entre os textos excluídos anteriormente. |
  
## Exemplo de Início e Parada de uma Sessão JShell

O JShell é fornecido com o JDK. Para iniciar uma sessão, digite `jshell` na linha de comando. Uma mensagem de boas-vindas é impressa e um prompt para inserir comandos e snippets é fornecido.
```
    % jshell
    |  Welcome to JShell -- Version 9
    |  For an introduction type: /help intro
    
    jshell>
```

Para ver quais snippets foram carregados automaticamente quando o JShell iniciou, use o comando `/list -start`. Os snippets de inicialização padrão são declarações de import para pacotes comuns. O ID de cada snippet começa com a letra _s_, o que indica que é um snippet de inicialização.
```
    jshell> /list -start
    
      s1 : import java.io.*;
      s2 : import java.math.*;
      s3 : import java.net.*;
      s4 : import java.nio.file.*;
      s5 : import java.util.*;
      s6 : import java.util.concurrent.*;
      s7 : import java.util.function.*;
      s8 : import java.util.prefs.*;
      s9 : import java.util.regex.*;
     s10 : import java.util.stream.*;
    
    jshell>
```

Para encerrar a sessão, use o comando `/exit`.
```
    jshell> /exit
    |  Goodbye
    
    %
```

## Exemplo de Inserção de Snippets

Snippets são instruções Java, definições de variáveis, definições de métodos, definições de classes, instruções de import e expressões. Ponto e vírgulas de terminação são adicionados automaticamente ao final de um snippet completo, se estiverem faltando.

O exemplo a seguir mostra duas variáveis e um método sendo definidos, e o método sendo executado. Observe que uma variável temporária é criada automaticamente para armazenar o resultado, pois nenhuma variável foi fornecida.
```
    jshell> int a=4
    a ==> 4
    
    jshell> int b=8
    b ==> 8
    
    jshell> int square(int i1) {
       ...> return i1 * i1;
       ...> }
    |  created method square(int)
    
    jshell> square(b)
    $5 ==> 64
```

## Exemplo de Alteração de Snippets

Altere a definição de uma variável, método ou classe inserindo-a novamente.

Os exemplos a seguir mostram um método sendo definido e o método executado:
```
    jshell> String grade(int testScore) {
       ...>     if (testScore >= 90) {
       ...>         return "Pass";
       ...>     }
       ...>     return "Fail";
       ...> }
    |  created method grade(int)
    
    jshell> grade(88)
    $3 ==> "Fail"
```

Para alterar o método `grade` para permitir que mais alunos passem, insira a definição do método novamente e altere a pontuação de aprovação para `80`. Use a tecla de seta para cima para recuperar as entradas anteriores e evitar ter que digitá-las novamente e fazer a alteração na instrução `if`. O exemplo a seguir mostra a nova definição e executa novamente o método para mostrar o novo resultado:
```
    jshell> String grade(int testScore) {
       ...>     if (testScore >= 80) {
       ...>         return "Pass";
       ...>     }
       ...>     return "Fail";
       ...> }
    |  modified method grade(int)
    
    jshell> grade(88)
    $5 ==> "Pass"
```

Para snippets com mais de algumas linhas, ou para fazer mais de algumas alterações, use o comando `/edit` para abrir o snippet em um editor. Após as alterações serem concluídas, feche a janela de edição para retornar o controle à sessão JShell. O exemplo a seguir mostra o comando e o feedback fornecido quando a janela de edição é fechada. O comando `/list` é usado para mostrar que a pontuação de aprovação foi alterada para `85`.
```
    jshell> /edit grade
    |  modified method grade(int)
    jshell> /list grade
    
       6 : String grade(int testScore) {
               if (testScore >= 85) {
                   return "Pass";
               }
               return "Fail";
           }
```

## Exemplo de Criação de um Modo de Feedback Personalizado

O modo de feedback determina o prompt exibido, as mensagens de feedback fornecidas à medida que os snippets são inseridos e o comprimento máximo de um valor exibido. Modos de feedback predefinidos são fornecidos. Comandos para criar modos de feedback personalizados também são fornecidos.

Use o comando `/set mode` para criar um novo modo de feedback. No exemplo a seguir, o novo modo `mymode` é baseado no modo de feedback predefinido, `normal`, e o feedback de verificação de comando é exibido:
```
    jshell> /set mode mymode normal -command
    |  Created new feedback mode: mymode
```

Como o novo modo é baseado no modo `normal`, os prompts são os mesmos. O exemplo a seguir mostra como ver quais prompts são usados e, em seguida, altera os prompts para strings personalizadas. A primeira string representa o prompt padrão do JShell. A segunda string representa o prompt para linhas adicionais em snippets de várias linhas.
```
    jshell> /set prompt mymode
    |  /set prompt mymode "\njshell> " "   ...> "
    
    jshell> /set prompt mymode "\nprompt$ " "   continue$ "
```

O comprimento máximo de um valor exibido é controlado pela configuração de truncamento. Diferentes tipos de valores podem ter comprimentos diferentes. O exemplo a seguir define um valor de truncamento geral de 72 e um valor de truncamento de 500 para expressões de valor de variável:
```
    jshell> /set truncation mymode 72
    
    jshell> /set truncation mymode 500 varvalue
```

O feedback exibido após a inserção de snippets é controlado pela configuração de formato e é baseado no tipo de snippet inserido e na ação realizada para esse snippet. No modo predefinido `normal`, a string `created` é exibida quando um método é criado. O exemplo a seguir mostra como alterar essa string para `defined`:
```
    jshell> /set format mymode action "defined" added-primary
```

Use o comando `/set feedback` para começar a usar o modo de feedback que acabou de ser criado. O exemplo a seguir mostra o modo personalizado em uso:
```
    jshell> /set feedback mymode
    |  Feedback mode: mymode
    
    prompt$ int square (int num1){
       continue$ return num1*num1;
       continue$ }
    |  defined method square(int)
    
    prompt$
```