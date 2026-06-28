# O Comando jaccessinspector

## Nome

jaccessinspector - examina informações acessíveis sobre os objetos na Java Virtual Machine usando a Java Accessibility Utilities API

## Descrição

A ferramenta `jaccessinspector` permite selecionar diferentes métodos para examinar as informações de acessibilidade do objeto:

  * Quando eventos ocorrem, como uma mudança de foco, movimento do mouse, alteração de propriedade, seleção de menu e a exibição de um menu pop-up

  * Quando você pressiona a tecla F1 com o mouse sobre um objeto, ou F2 com o mouse sobre uma janela

Depois que um objeto é selecionado para exame, a ferramenta `jaccessinspector` exibe os resultados da chamada de métodos da Java Accessibility API nesse objeto.

## Executando a Ferramenta jaccessinspector

Para usar a ferramenta `jaccessinspector`, inicie a ferramenta `jaccessinspector` após iniciar uma aplicação Java. Para iniciar `jaccessinspector`, execute o seguinte comando:

**Nota:**

`JAVA_HOME` é uma variável de ambiente e deve ser definida para o caminho do JDK ou JRE, como `c:\Program Files\Java\jdk-10`.

> `%JAVA_HOME%\bin\jaccessinspector.exe`

Agora você tem duas janelas abertas: A janela da aplicação Java e a janela `jaccessinspector`. A janela `jaccessinspector` contém cinco menus:

  * Menu Arquivo

  * Menu UpdateSettings

  * Menu JavaEvents

  * Menu AccessibilityEvents

  * Menu Opções

Os itens nos menus **UpdateSettings**, **JavaEvents** e **AccessibilityEvents** permitem consultar aplicações Java de várias maneiras.

## Menu Arquivo

Esta seção descreve os itens do menu **Arquivo**.

AccessBridge DLL Carregada
     Ativa e desativa AccessBridge DLL Carregada.
Sair
     Sai da ferramenta.

## Menu UpdateSettings

Esta seção descreve os itens do menu **UpdateSettings**.

Atualizar pelo Mouse
     Determina as coordenadas x e y do mouse (assumindo que a janela da ferramenta `jaccessinspector` está em primeiro plano) quando o mouse parou de se mover, e então consulta a aplicação Java pelo objeto acessível sob o mouse, despejando a saída na janela `jaccessinspector`.
Atualizar com F2 (Mouse HWND)
     Determina as coordenadas x e y do mouse (assumindo que a janela da ferramenta `jaccessinspector` está em primeiro plano), e então consulta a aplicação Java pelo objeto acessível do HWND sob o mouse, despejando a saída na janela `jaccessinspector`.
Atualizar com F1 (Ponto do Mouse)
     Determina as coordenadas x e y do mouse (assumindo que a janela da ferramenta `jaccessinspector` está em primeiro plano), e então consulta a aplicação Java pelo objeto acessível sob o cursor, despejando a saída na janela `jaccessinspector`.

## Menu JavaEvents

Esta seção descreve os itens do menu **JavaEvents**.

Rastrear Eventos do Mouse
    

Registra na aplicação Java todos os eventos Java Mouse Entered, e ao receber um, consulta o objeto que foi inserido pelo cursor e despeja a saída na janela `jaccessinspector`.

**Nota:** Se o mouse for movido rapidamente, pode haver algum atraso antes que as informações exibidas sejam atualizadas.

Rastrear Eventos de Foco
     Registra na aplicação Java todos os eventos Java Focus Gained, e ao receber um evento, consulta o objeto que recebeu o foco e despeja a saída na janela `jaccessinspector`.
Rastrear Eventos de Caret
    

Registra na aplicação Java todos os eventos Java Caret Update, e ao receber um evento, consulta o objeto no qual o caret foi atualizado e despeja a saída na janela `jaccessinspector`.

**Nota:** Como objetos que contêm carets são quase por definição objetos de texto rico, isso não parecerá tão responsivo quanto as outras opções de rastreamento de eventos. No uso real, far-se-iam menos chamadas de acessibilidade em situações de Caret Update (por exemplo, apenas obter a nova letra, palavra, frase na localização do caret), o que seria significativamente mais rápido.

Rastrear Eventos de Menu Selecionado | Desselecionado | Cancelado
     Registra na aplicação Java todos os eventos de Menu, e ao receber um evento, consulta o objeto no qual o caret foi atualizado e despeja a saída na janela `jaccessinspector`.
Rastrear Eventos de Pop-up Visível | Invisível | Cancelado
     Registra na aplicação Java todos os eventos de Menu Pop-up, e ao receber um evento, consulta o objeto no qual o caret foi atualizado e despeja a saída na janela `jaccessinspector`.
Rastrear Eventos de Desligamento
     Registra na aplicação Java para receber um evento Property Changed quando uma aplicação Java é encerrada.

## Menu AccessibilityEvents

Esta seção descreve os itens do menu **AccessibilityEvents**.

**Nota:** Os itens listados no menu **AccessibilityEvents** são os mais importantes para testar aplicações, especialmente para aplicações de tecnologia assistiva.

Rastrear Eventos da Propriedade Name
     Registra na aplicação Java todos os eventos Java Property Changed especificamente em objetos acessíveis nos quais a propriedade Name foi alterada, e ao receber um evento, despeja a saída na janela de rolagem, juntamente com informações sobre a propriedade que foi alterada.
Rastrear Eventos da Propriedade Description
     Registra na aplicação Java todos os eventos Java Property Changed especificamente em objetos acessíveis nos quais a propriedade Description foi alterada, e ao receber um evento, despeja a saída na janela `jaccessinspector`, juntamente com informações sobre a propriedade que foi alterada.
Rastrear Eventos da Propriedade State
     Registra na aplicação Java todos os eventos Java Property Changed especificamente em objetos acessíveis nos quais a propriedade State foi alterada, e ao receber um evento, despeja a saída na janela `jaccessinspector`, juntamente com informações sobre a propriedade que foi alterada.
Rastrear Eventos da Propriedade Value
     Registra na aplicação Java todos os eventos Java Property Changed especificamente em objetos acessíveis nos quais a propriedade Value foi alterada, e ao receber um evento, despeja a saída na janela de rolagem, juntamente com informações sobre a propriedade que foi alterada.
Rastrear Eventos da Propriedade Selection
     Registra na aplicação Java todos os eventos Java Property Changed especificamente em objetos acessíveis nos quais a propriedade Selection foi alterada, e ao receber um evento, despeja a saída na janela `jaccessinspector`, juntamente com informações sobre a propriedade que foi alterada.
Rastrear Eventos da Propriedade Text
     Registra na aplicação Java todos os eventos Java Property Changed especificamente em objetos acessíveis nos quais a propriedade Text foi alterada, e ao receber um evento, despeja a saída na janela `jaccessinspector`, juntamente com informações sobre a propriedade que foi alterada.
Rastrear Eventos da Propriedade Caret
     Registra na aplicação Java todos os eventos Java Property Changed especificamente em objetos acessíveis nos quais a propriedade Caret foi alterada, e ao receber um evento, despeja a saída na janela `jaccessinspector`, juntamente com informações sobre a propriedade que foi alterada.
Rastrear Eventos da Propriedade VisibleData
     Registra na aplicação Java todos os eventos Java Property Changed especificamente em objetos acessíveis nos quais a propriedade VisibleData foi alterada, e ao receber um evento, despeja a saída na janela `jaccessinspector`, juntamente com informações sobre a propriedade que foi alterada.
Rastrear Eventos da Propriedade Child
     Registra na aplicação Java todos os eventos Java Property Changed especificamente em objetos acessíveis nos quais a propriedade Child foi alterada, e ao receber um evento, despeja a saída na janela `jaccessinspector`, juntamente com informações sobre a propriedade que foi alterada.
Rastrear Eventos da Propriedade Active Descendent
     Registra na aplicação Java todos os eventos Java Property Changed especificamente em objetos acessíveis nos quais a propriedade Active Descendent foi alterada, e ao receber um evento, despeja a saída na janela `jaccessinspector`, juntamente com informações sobre a propriedade que foi alterada.
Rastrear Eventos da Propriedade Table Model Change
     Registra na aplicação Java todos os eventos Property Changed especificamente em objetos acessíveis nos quais a propriedade Table Model Change foi alterada, e ao receber um evento, despeja a saída na janela `jaccessinspector`, juntamente com informações sobre a propriedade que foi alterada.

## Menu Opções

Esta seção descreve os itens do menu **Opções**.

Monitorar os mesmos eventos que o JAWS
     Ativa o monitoramento apenas dos eventos também monitorados pelo JAWS.
Monitorar Todos os Eventos
     Ativa o monitoramento de todos os eventos na janela `jaccessinspector`.
Redefinir Todos os Eventos
     Redefine as Opções selecionadas para as configurações padrão.
Ir Para Mensagem
     Abre a caixa de diálogo **Ir Para Mensagem** que permite exibir uma mensagem registrada inserindo seu número de mensagem.
Limpar Histórico de Mensagens
     Limpa o histórico de mensagens registradas da janela `jaccessinspector`.