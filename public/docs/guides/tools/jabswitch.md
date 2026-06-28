# O Comando jabswitch

## Nome

jabswitch - habilita ou desabilita o Java Access Bridge

## Sinopse

`jabswitch` [ -enable|/enable | -disable|/disable | -version|/version | -?|/? ]

## Opções

`-enable` ou `/enable` : Habilita o Java Access Bridge

`-disable` ou `/disable` : Desabilita o Java Access Bridge

`-version` ou `/version` : Exibe informações de versão para o comando `jabswitch`.

`-?` ou `/?` : Exibe informações de uso para o comando `jabswitch`.

## Descrição

O comando `jabswitch` é um programa utilitário que permite que o Java Access Bridge seja carregado pelo JDK em plataformas Windows. O Java Access Bridge é usado por Tecnologias Assistivas para interagir com as Java Accessibility APIs da plataforma Java SE. Para ter qualquer efeito, a tecnologia assistiva deve suportar o Java Access Bridge.

Este comando cria ou atualiza um arquivo chamado `.accessibility.properties`, no diretório inicial do usuário. Ao selecionar a opção `-enable`, o arquivo é preenchido com as informações necessárias para carregar o Java Access Bridge. Este arquivo é então lido e usado de acordo com a especificação da API [`java.awt.Toolkit.getDefaultToolkit()`](<#/>) do Java SE, na inicialização.

Nota: Este comando é fornecido apenas com o JDK para Windows.