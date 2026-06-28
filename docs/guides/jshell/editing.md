# Edição

## 4 Edição

O JShell suporta a edição de entrada no prompt `jshell` e a edição em um editor externo de sua escolha.

A edição de shell permite editar snippets e comandos conforme você os insere, e recuperar e alterar snippets e comandos inseridos anteriormente. Um editor externo oferece uma maneira alternativa de editar e criar snippets, o que é mais fácil ao trabalhar com snippets de várias linhas.

Tópicos

  * [Edição de Shell](<#/doc/guides/jshell/editing>)

  * [Editor Externo](<#/doc/guides/jshell/editing>)

### Edição de Shell

A edição de entrada no prompt de comando facilita a correção de sua entrada e a recuperação e modificação de comandos e snippets inseridos anteriormente.

A edição de shell no JShell é construída sobre o JLine2, que é funcionalmente similar ao `editline` do BSD e ao `readline` do GNU no modo Emacs. Consulte [informações do usuário do JLine2](<https://github.com/jline/jline2/wiki/Using-JLine>) e [documentação do GNU Readline](<https://tiswww.case.edu/php/chet/readline/rltop.html>).

Tópicos

  * [Navegação da Linha de Entrada](<#/doc/guides/jshell/editing>)

  * [Navegação do Histórico](<#/doc/guides/jshell/editing>)

  * [Modificação da Linha de Entrada](<#/doc/guides/jshell/editing>)

  * [Pesquisa e Mais](<#/doc/guides/jshell/editing>)

#### Navegação da Linha de Entrada

A edição de shell é suportada para editar a linha atual ou acessar o histórico através de sessões anteriores do JShell.

Para navegar na linha de entrada, as teclas Ctrl e Meta são usadas em combinações de teclas. Se o seu teclado não tiver uma tecla Meta, a tecla Alt é frequentemente mapeada para fornecer a funcionalidade da tecla Meta.

Para navegação básica dentro de uma linha, use as teclas de seta para a direita e para a esquerda ou Ctrl+B para trás e Ctrl+F para frente. Para navegação entre linhas no histórico, use as teclas de seta para cima e para baixo. Pressionar a seta para cima uma vez substitui a linha atual pela linha de comando ou snippet anterior. Pressionar a seta para cima novamente leva você à linha anterior a essa. O histórico contém comandos e linhas de snippet. Se um snippet tiver várias linhas, as setas para cima e para baixo navegam por cada linha de um snippet.

A tabela a seguir identifica as teclas usadas e as ações realizadas para navegar na linha de entrada.

Teclas | Ação
---|---
Return | Insere a linha atual
Left arrow | Move para trás um caractere
Right arrow | Move para frente um caractere
Up arrow | Move para cima uma linha, para trás no histórico
Down arrow | Move para baixo uma linha, para frente no histórico
Ctrl+A | Move para o início da linha
Ctrl+E | Move para o final da linha
Meta+B | Move para trás uma palavra
Meta+F | Move para frente uma palavra

#### Navegação do Histórico

Um histórico de snippets e comandos é mantido entre as sessões do JShell. Este histórico fornece acesso a itens que você inseriu nas sessões atual e anteriores.

Para reinserir ou editar entradas anteriores, navegue no histórico usando as setas para cima, para baixo, para a esquerda e para a direita. O texto inserido é inserido no cursor. A tecla Delete é usada para apagar texto. Pressione a tecla Enter para reinserir a linha do histórico, modificada ou não.

As teclas de seta para cima e para baixo movem para trás e para frente no histórico, uma linha por vez, por exemplo:
```
    jshell> class C {
       ...>    int x;
       ...> }
    |  created class                                                                                           
    jshell> /list
    
       1 : class C 
             int x;
           }
    
    jshell> <up arrow>
```

A tecla de seta para cima mostra a seguinte linha:
```
    jshell> /list
```

Pressionar a seta para cima novamente mostra a última linha da definição da classe:
```
    jshell> }
```

Pressionar a seta para baixo retorna ao comando `/list`. Pressionar Enter o executa:
```
    jshell> /list
    
       1 : class C {
             int x;
           }
```

Ctrl+seta para cima avança por snippets. Para snippets de linha única, Ctrl+seta para cima se comporta da mesma forma que a seta para cima. Para snippets de várias linhas, como a classe `C`, Ctrl+seta para cima pula as linhas adicionais e vai para o início do snippet.

#### Modificação da Linha de Entrada

As linhas de entrada recuperadas do histórico podem ser modificadas conforme necessário e reinseridas, o que evita que você precise redigitar uma linha apenas para fazer pequenas alterações.

Adicione texto na posição atual do cursor simplesmente digitando-o. Consulte [Navegação da Linha de Entrada](<#/doc/guides/jshell/editing>) para as teclas usadas para mover o cursor dentro de uma linha.

A tabela a seguir identifica as teclas usadas e as ações realizadas para modificar a linha de entrada.

Teclas | Ação
---|---
Delete | Apaga o caractere no cursor ou após ele, dependendo do sistema operacional.
Backspace | Apaga o caractere antes do cursor.
Ctrl+K | Apaga o texto do cursor até o final da linha.
Meta+D | Apaga o texto do cursor até o final da palavra.
Ctrl+W | Apaga o texto do cursor até o espaço em branco anterior.
Ctrl+Y | Cola o texto excluído mais recentemente na linha.
Meta+Y | Após Ctrl+Y, Meta+Y alterna entre textos excluídos anteriormente.

#### Pesquisa e Mais

A pesquisa no histórico é um recurso do JShell que facilita encontrar a linha desejada sem ter que percorrer o histórico linha por linha.

Para iniciar sua pesquisa, pressione Ctrl+R. No prompt, insira a string de pesquisa. A pesquisa prossegue para trás a partir de sua entrada mais recente e inclui sessões anteriores do JShell. O exemplo a seguir mostra o prompt que é apresentado após pressionar Ctrl+R:
```
    jshell> <Ctrl+R>
    ((reverse-i-search)`': 
```

Com base no exemplo em [Navegação do Histórico](<#/doc/guides/jshell/editing>), digitar `class` altera a exibição para mostrar a linha mais recente com o texto `class`:
```
    (reverse-i-search)`class': class C {
```

A pesquisa é incremental, então esta linha é recuperada com apenas o primeiro caractere c. Você pode continuar a pesquisar mais cedo no histórico pressionando Ctrl+R repetidamente. Ctrl+S move a pesquisa para frente em direção ao presente.

Você pode definir uma macro de teclado digitando `Ctrl+x (`, em seguida, inserindo seu texto e, finalmente, digitando `Ctrl+x )`. Para usar sua macro, digite `Ctrl+x e`.

A tabela a seguir mostra as combinações de teclas para pesquisar e criar macros.

Teclas | Ação
---|---
Ctrl+R | Pesquisa para trás no histórico
Ctrl+S | Pesquisa para frente no histórico
Ctrl+X ( | Inicia uma definição de macro
Ctrl+X ) | Finaliza uma definição de macro
Ctrl+X e | Executa uma macro

### Editor Externo

Uma alternativa à edição no prompt de comando é usar um editor externo. Este editor pode ser usado para editar e criar snippets, e é especialmente útil para snippets de várias linhas. Você pode configurar o JShell para usar o editor de sua escolha.

Para editar todos os snippets existentes de uma vez em um editor, use `/edit` sem uma opção. Para editar um snippet específico em um editor, use o comando `/edit` com o nome ou ID do snippet. Use o comando `/list` para obter os IDs dos snippets. O exemplo a seguir abre um editor para editar o snippet chamado `volume`, que foi definido em [Referências Antecipadas](<#/doc/guides/jshell/snippets>):
```
    jshell> /edit volume
```

Você também pode inserir novos snippets no editor. Ao salvar no editor, qualquer snippet que tenha sido alterado ou seja novo é inserido na sessão do JShell. O feedback dos snippets é mostrado na janela do JShell, no entanto, nenhum prompt do JShell é exibido. Você não pode inserir comandos ou snippets na janela do JShell até que o editor seja fechado.

Se você não especificar um editor, as seguintes variáveis de ambiente são verificadas em ordem: `JSHELLEDITOR`, `VISUAL` e `EDITOR`. Se nenhuma delas estiver definida, um editor padrão simples é usado. Para configurar o JShell para abrir o editor de sua escolha, use o comando `/set editor`. O argumento para o comando `/set editor` é o comando necessário para iniciar o editor externo que você deseja usar. O exemplo a seguir define `kwrite` como o editor e abre o editor com todos os snippets existentes:
```
    jshell> /set editor kwrite
    |  Editor set to: kwrite
    
    jshell> /edit
```

Definir `x` na janela do editor externo e salvar a alteração gera a seguinte saída na janela do JShell:
```
    |  created variable x of type int with initial value 6
```

Fechar o editor externo restaura o prompt do JShell.
```
    jshell> 
```