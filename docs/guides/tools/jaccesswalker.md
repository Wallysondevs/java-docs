# O Comando jaccesswalker

## Nome

jaccesswalker - navega pelas árvores de componentes em uma Java Virtual Machine específica e apresenta a hierarquia em uma visualização em árvore

## Descrição

Você seleciona um nó na árvore e, no menu **Panels**, seleciona **Accessibility API Panel**. A ferramenta `jaccesswalker` mostra as informações de acessibilidade para o objeto na janela.

## Executando a Ferramenta jaccesswalker

Para usar o `jaccesswalker`, inicie a ferramenta `jaccesswalker` após iniciar uma aplicação Java. Por exemplo, para iniciar o `jaccesswalker`, digite o seguinte comando:

**Nota:**

`JAVA_HOME` é uma variável de ambiente e deve ser definida para o caminho do JDK ou JRE, como, `c:\Program Files\Java\jdk-10`.

> `%JAVA_HOME%\bin\jaccesswalker.exe`

Agora você tem duas janelas abertas: A janela da aplicação Java e a janela da ferramenta `jaccesswalker`. Existem duas tarefas que você pode realizar com o `jaccesswalker`. Você pode construir uma visualização em árvore da hierarquia da GUI das aplicações Java e pode consultar as informações da Java Accessibility API de um elemento específico na hierarquia da GUI.

## Construindo a Hierarquia da GUI

No menu **File**, selecione o menu **Refresh Tree**. A ferramenta `jaccesswalker` constrói uma lista das janelas de nível superior pertencentes às aplicações Java. A ferramenta então consulta recursivamente os elementos nessas janelas e constrói uma árvore de todos os componentes da GUI em todas as aplicações Java em todas as JVMs em execução no sistema.

## Examinando um Componente da GUI

Depois que uma árvore da GUI é construída, você pode visualizar informações detalhadas de acessibilidade sobre um componente individual da GUI selecionando-o na árvore, depois selecionando **Panels** e, em seguida, **Display Accessibility Information**.