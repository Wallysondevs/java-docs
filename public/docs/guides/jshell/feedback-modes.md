# Modos de Feedback

## 6 Modos de Feedback

O modo de feedback determina os prompts, feedback e outras interações dentro do JShell. Modos predefinidos com diferentes níveis de feedback são fornecidos. Modos personalizados podem ser criados conforme necessário.

Tópicos

  * [Configurando o Modo de Feedback](<#/doc/guides/jshell/feedback-modes>)

  * [Definindo um Modo de Feedback](<#/doc/guides/jshell/feedback-modes>)

### Configurando o Modo de Feedback

Um modo de feedback é uma configuração de interação do usuário nomeada. Um modo de feedback define os prompts e o feedback que são usados em sua interação com o JShell. Modos predefinidos são fornecidos para sua conveniência. Você pode criar modos personalizados conforme necessário.

Os modos predefinidos não podem ser modificados, mas podem ser usados como base para um modo personalizado. Os modos predefinidos, em ordem decrescente de verbosidade, são `verbose`, `normal`, `concise` e `silent`.

A tabela a seguir mostra as diferenças nos modos predefinidos.

Modo | Snippets de Valor | Declaração | Atualizações | Comandos | Prompt
---|---|---|---|---|---
verbose | name ==> value (and description) | Sim | Sim | Sim | jshell>
normal | name ==> value | Sim | Não | Sim | jshell>
concise | name ==> value (only expressions) | Não | Não | Não | jshell>
silent | Não | Não | Não | Não | ->

  * A coluna Modo indica o modo que está sendo descrito.

  * A coluna Snippets de Valor indica o que é mostrado para snippets que possuem valores, como expressões, atribuições e declarações de variáveis.

  * A coluna Declaração indica se o feedback é fornecido para declarações ou métodos, classes, enum, interfaces e interfaces de anotação.

  * A coluna Atualizações indica se as alterações em snippets diferentes do atual são mostradas.

  * A coluna Comandos indica se os comandos fornecem feedback indicando sucesso.

  * A coluna Prompt indica o prompt que é usado.

O modo de feedback padrão é `normal`. Altere o modo de feedback definindo uma opção de linha de comando ou usando o comando `/set feedback` conforme mostrado no exemplo a seguir:
```
    jshell> /set feedback verbose
    |  Feedback mode: verbose

    jshell> 2 + 2
    $1 ==> 4
    |  created scratch variable $1 : int

    jshell> /set feedback silent
    -> 2 + 2
    -> /set feedback normal
    |  Feedback mode: normal

    jshell> 2 + 2
    $3 ==> 4

    jshell> /set feedback concise
    jshell> 2 + 2
    $4 ==> 4
    jshell>
```

Observe que quando a configuração é `normal` ou `verbose`, o feedback do comando mostra a configuração, mas os modos `concise` e `silent` não. Observe também que as três formas diferentes de feedback para a expressão `2+2` não incluem feedback quando o modo é definido como `silent`.

Para ver os modos de feedback atuais e disponíveis, use o comando `/set feedback` sem opções. Observe que o modo atual é mostrado como o comando que o definiu:
```
    jshell> /set feedback
    |  /set feedback verbose
    |
    |  Available feedback modes:
    |     concise
    |     normal
    |     silent
    |     verbose
```

### Definindo um Modo de Feedback

Modos de feedback personalizados permitem que você defina os prompts que deseja ver e o feedback que deseja receber para os diferentes elementos que você insere no JShell.

Um modo de feedback possui as seguintes configurações:

  * Prompts: Regular e de continuação

  * Truncamento: Comprimento máximo dos valores exibidos

  * Formato: Formato do feedback fornecido

Os modos predefinidos não podem ser alterados, mas você pode facilmente criar uma cópia de um modo existente, conforme mostrado no exemplo a seguir:
```
    jshell> /set mode mine normal -command
    |  Created new feedback mode: mine
```

O novo modo `mine` é uma cópia do modo `normal`. A opção `-command` indica que você deseja feedback de comando. Se você não quiser que os comandos descrevam a ação ocorrida, use `-quiet` em vez de `-command`.

Definir Prompts

Assim como em todos os comandos `/set`, use o comando `/set prompt` sem configurações para mostrar a configuração atual:
```
    jshell> /set prompt normal
    |  /set prompt normal "\njshell> " "   ...> "
```

No feedback fornecido para o exemplo anterior, a primeira string é o prompt regular, e a segunda string é o prompt de continuação que é usado se o snippet se estender por várias linhas. O exemplo a seguir mostra como mudar para o novo modo para testá-lo:
```
    jshell> /set prompt mine "\nmy mode: "  ".......: "

    jshell> /set feedback mine
    |  Feedback mode: mine

    my mode: class C {
    .......:    int x;
    .......: }
    |  created class C

    my mode:
```

As strings de prompt podem conter `%s`, que é substituído pelo próximo ID do snippet. No entanto, se um comando for inserido ou o snippet resultar em um erro, o valor que os usuários inserem no prompt pode não receber esse ID.

Todas as configurações têm a duração da sessão atual; elas não são redefinidas pelo comando `/reset`. Se você quiser que as configurações sejam o padrão para sessões futuras, use a opção `-retain` para mantê-las. O exemplo a seguir mostra como manter seu modo personalizado entre sessões:
```
    my mode: /set mode mine -retain

    my mode: /set feedback mine -retain
    |  Feedback mode: mine

    my mode: /exit
    |  Goodbye
    % jshell
    |  Welcome to JShell -- Version 9
    |  For an introduction type: /help intro

    my mode:
```

Definir Truncamento

Se os valores forem muito longos, eles são truncados quando exibidos. Use o comando `/set truncation` para definir o comprimento máximo exibido para um valor. Se nenhuma configuração for inserida com o comando, a configuração atual será exibida. O exemplo a seguir mostra as configurações que foram herdadas do modo `normal`:
```
    my mode: /set truncation mine
    |  /set truncation mine 80
    |  /set truncation mine 1000 expression,varvalue

    my mode: String big = IntStream.range(0,1200).mapToObj(n -> "" + (char) ('a' + n % 26)).collect(Collectors.joining())
    big ==> "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv ... fghijklmnopqrstuvwxyzabcd"
```

As condições sob as quais uma configuração de truncamento está em vigor são determinadas pelos seletores opcionais que são inseridos após o comprimento de truncamento. Dois tipos de seletores (chamados de tipos de seletor na ajuda online) são definidos:

  * Um seletor de caso indica o tipo de snippet cujo valor é exibido.

  * Um seletor de ação descreve o que aconteceu com o snippet.

Digite `/help /set truncation` para detalhes sobre seletores.

A configuração mostrada no exemplo anterior significa que os valores são truncados para 80 caracteres, a menos que o valor seja o valor de uma expressão (o seletor de caso `expression`) ou o valor de uma variável, conforme explicitamente solicitado ao inserir apenas o nome da variável (o seletor de caso `varvalue`). A ordem é importante; o último inserido é usado. Se a ordem fosse invertida, todos os valores seriam truncados para 80 caracteres.

O exemplo a seguir define o truncamento padrão para `100` e só mostra valores longos se forem explicitamente solicitados:
```
    my mode: /set truncation mine 100

    my mode: /set truncation mine 300 varvalue

    my mode: big + big
    $2 ==> "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghi ... yzabcdefghijklmnopqrstuvwxyzabcd"

    my mode: big
    big ==> "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstu
    vwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijkl ... jklmnopq
    rstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcd"

    my mode: /set mode mine -retain
```

Para manter as novas configurações, retenha as alterações conforme mostrado no final do exemplo.

Definir Formatos

A saída do snippet é outra configuração que você pode personalizar. No formato herdado do modo `normal`, um import não fornece feedback, e o tipo de um valor não é mostrado:
```
    my mode: import java.beans.*

    my mode: Locale.CANADA.getUnicodeLocaleAttributes()
    $5 ==> []
```

O formato da saída do snippet é definido com o comando `/set format`. Insira-o com o nome do modo e sem configurações para ver as configurações de formato atuais:
```
    my mode: /set format mine
```

Ajuda extensa sobre este comando está disponível com o comando `/help /set format`. Você pode querer consultá-lo como referência para o restante desta seção, que menciona os campos usados ao definir os formatos.

O feedback principal exibido é determinado pelo campo `display`. Outros campos podem ser definidos para auxiliar na definição do campo `display`. Modos predefinidos, exceto `silent`, definem vários desses campos, como pode ser visto na saída do comando `/help /set format`. Esses campos são herdados no modo de exemplo. Definições de exibição para import são mostradas no exemplo a seguir:
```
    my mode: /set format mine display "{pre}added import {name}{post}" import-added

    my mode: /set format mine display "{pre}re-added import {name}{post}" import-modified,replaced
```

O campo `name` é predefinido como o nome do snippet. O exemplo a seguir mostra que o feedback agora é fornecido para imports:
```
    my mode: import java.beans.*
    |  re-added import java.beans.*
```

Os campos `pre` e `post` usados na definição de exibição são os caracteres de prefixo e postfix para cada linha de saída de feedback. O exemplo a seguir altera o prefixo de barra vertical para a string vazia:
```
    my mode: /set format mine pre ""

    my mode: void m() {}
    created method m()

    my mode: import java.beans.*
    re-added import java.beans.*

    my mode: /set truncation mine
    /set truncation mine 100
    /set truncation mine 300 varvalue
```

Nota:

A alteração no caractere de prefixo afeta todo o feedback, incluindo o feedback de comando.

Para mostrar o tipo ao exibir valores, altere o campo `result` definido pelos modos predefinidos:
```
    my mode: /set format mine result "{type} {name} = {value}{post}" added,modified,replaced-primary-ok

    my mode: Locale.CANADA.getUnicodeLocaleAttributes()
    Set<String> $11 = []

    my mode: 2 + 2
    int $12 = 4
```

Essa alteração torna `result` não vazio apenas quando é novo ou atualizado (`added,modified,replaced`), está no snippet inserido (`primary`) e não possui erros (`ok`).

Para excluir permanentemente um modo retido, use a opção `-retain` com a opção `-delete`:
```
    my mode: /set feedback verbose -retain
    |  Feedback mode: verbose

    jshell> /set mode mine -delete -retain
```