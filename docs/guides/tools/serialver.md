# O Comando serialver

## Nome

serialver - retorna o `serialVersionUID` para uma ou mais classes em um formato adequado para ser copiado para uma classe em evolução

## Sinopse

`serialver` [_options_] [_classnames_]

_options_
     Isso representa as opções de linha de comando para o comando `serialver`. Consulte Opções para serialver.
_classnames_
     As classes para as quais o `serialVersionUID` deve ser retornado.

## Descrição

O comando `serialver` retorna o `serialVersionUID` para uma ou mais classes em um formato adequado para ser copiado para uma classe em evolução. Quando chamado sem argumentos, o comando `serialver` imprime uma linha de uso.

## Opções para serialver

`-classpath` _path-files_
     Define o caminho de busca para classes e recursos de aplicação. Separe classes e recursos com dois pontos (:).
`-J` _option_
     Passa a _opção_ especificada para a Java Virtual Machine, onde _option_ é uma das opções descritas na página de referência para o lançador de aplicações Java. Por exemplo, `-J-Xms48m` define a memória de inicialização para 48 MB.

## Aviso

O comando `serialver` carrega e inicializa as classes especificadas para determinar seus valores de `serialVersionUID`. _NÃO EXECUTE_ o `serialver` em classes não confiáveis.