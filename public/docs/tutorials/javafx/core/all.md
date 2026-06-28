# Juntando tudo

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos JavaFX ](<#/doc/tutorials/javafx/core>) > Juntando tudo

**Anterior na Série**

[Usando FXML](<#/doc/tutorials/javafx/core/fxml>)

➜

**Tutorial Atual**

Juntando tudo

➜

Este é o fim da série!

**Anterior na Série:** [Usando FXML](<#/doc/tutorials/javafx/core/fxml>)

# Juntando tudo

Esta página foi contribuída por [Gail C. Anderson](</author/GailC.Anderson>) e [Paul Anderson](</author/PaulAnderson>) sob a [UPL](<https://oss.oracle.com/licenses/upl/>) e é de [The Definitive Guide to Modern Java Clients with JavaFX 17](<https://link.springer.com/book/10.1007/978-1-4842-7268-8>) gentilmente contribuído pela Apress.

## Visão Geral

É hora de construir uma aplicação JavaFX mais interessante, uma que implemente uma visão mestre-detalhe. Ao apresentarmos esta aplicação, explicaremos vários recursos do JavaFX que o ajudam a controlar a UI e a manter seus dados e a aplicação consistentes.

Primeiro, usamos o Scene Builder para construir e configurar a UI. Nosso exemplo inclui uma classe modelo `Person` e uma [`ObservableList`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.base/javafx/collections/ObservableList.html>) subjacente que contém dados. O programa permite que os usuários façam alterações, mas não persistimos nenhum dado. O JavaFX possui [`ObservableList`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.base/javafx/collections/ObservableList.html>)s que gerenciam coleções de dados, e você pode escrever listeners e expressões de binding que respondem a quaisquer alterações de dados. O programa usa uma combinação de event handlers e expressões de binding para manter o estado da aplicação consistente.

## UI Mestre-Detalhe

Para a UI, usamos um controle JavaFX ListView na janela esquerda (a visão mestre) e um Formulário na direita (a visão detalhe). No Scene Builder, selecionamos um [`AnchorPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/AnchorPane.html>) como o componente de nível superior e a raiz do grafo de cena. Um painel de layout [`SplitPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/SplitPane.html>) divide a visão da aplicação em duas partes, e cada parte tem um [`AnchorPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/AnchorPane.html>) como seu contêiner principal.

[](<https://dev.java/assets/images/javafx/person-ui-app.png>)

O controle [`ListView`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/ListView.html>) permite que você realize seleções para um objeto `Person`. Aqui, a primeira `Person` é selecionada, e os detalhes dessa `Person` aparecem no controle de formulário à direita. O controle de formulário tem o seguinte layout:

*   O formulário contém um [`GridPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/GridPane.html>) (duas colunas por quatro linhas) que contém `TextField`s para os campos `firstname` e `lastname` de `Person`.
*   Um [`TextArea`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/TextArea.html>) contém o campo `notes` para `Person`. Rótulos na primeira coluna marcam cada um desses controles.
*   A linha inferior do [`GridPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/GridPane.html>) consiste em um [`ButtonBar`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/ButtonBar.html>) que abrange ambas as colunas e se alinha no lado direito por padrão. O [`ButtonBar`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/ButtonBar.html>) ajusta o tamanho de todos os seus botões à largura do rótulo do botão mais largo para que os botões tenham um tamanho uniforme.
*   Os botões permitem que você realize Novo (criar uma `Person` e adicionar essa `Person` à lista), Atualizar (editar uma `Person` selecionada) e Excluir (remover uma `Person` selecionada da lista).
*   Expressões de binding consultam o estado da aplicação e habilitam ou desabilitam os botões.

A visão hierárquica do nosso grafo de cena para a aplicação UI de Pessoa é a seguinte:

[](<https://dev.java/assets/images/javafx/person-ui-scene-graph.png>)

A estrutura de arquivos da aplicação está listada abaixo:

[](<https://dev.java/assets/images/javafx/person-ui-file-struct.png>)

`Person.java` contém o código do modelo `Person`, e `SampleData.java` fornece os dados para inicializar a aplicação. `FXMLController.java` é a classe controller JavaFX, e `PersonUI.java` contém a classe principal da aplicação. Em `resources`, o arquivo FXML `Scene.fxml` descreve a UI.

## O Modelo

A classe `Person` é o "modelo" que usamos para esta aplicação.

## Listas Observáveis

Ao trabalhar com coleções JavaFX, você normalmente usará [`ObservableList`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.base/javafx/collections/ObservableList.html>)s que detectam mudanças na lista com listeners. Além disso, os controles JavaFX que exibem listas de dados esperam listas observáveis. Esses controles atualizam automaticamente a UI em resposta a modificações na lista. Explicaremos algumas dessas complexidades enquanto o guiamos pelo nosso programa de exemplo.

## Implementando Seleção de ListView

Um controle [`ListView`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/ListView.html>) exibe itens em uma lista observável e permite selecionar um ou possivelmente múltiplos itens. Para exibir uma `Person` selecionada nos campos do formulário na visão direita, você usa um change listener para a `selectedItemProperty`. Este change listener é invocado cada vez que o usuário seleciona um item diferente da [`ListView`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/ListView.html>) ou desseleciona o item selecionado. Você pode usar o mouse para selecionar, bem como as teclas de seta, Home (para o primeiro item) e End (para o último item). Em um Mac, use Fn + Seta Esquerda para Home e Fn + Seta Direita para End. Para desselecionar (Command-click para Mac ou Control-click no Linux ou Windows), o novo valor é null, e limpamos todos os campos do controle de formulário. Abaixo você pode observar o change listener de seleção da [`ListView`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/ListView.html>).

A propriedade booleana `modifiedProperty` rastreia se o usuário alterou qualquer um dos três controles de texto no formulário. Redefinimos essa flag após cada seleção de [`ListView`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/ListView.html>) e usamos essa propriedade em uma expressão de binding para controlar a propriedade `disable` do botão Update.

## Usando Seleção Múltipla

Por padrão, um controle [`ListView`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/ListView.html>) implementa seleção única, de modo que no máximo um item pode ser selecionado. [`ListView`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/ListView.html>) também oferece seleção múltipla, que você habilita configurando o modo de seleção, como segue:

Com esta configuração, cada vez que o usuário adiciona outro item à seleção com CTRL-Shift ou CTRL-Command, o listener de `selectedItemProperty` é invocado com a nova seleção. O método `getSelectedItems()` retorna todos os itens atualmente selecionados, e o argumento `newValue` é o valor selecionado mais recentemente. Por exemplo, o seguinte change listener coleta múltiplos itens selecionados e os imprime:

Nossa aplicação UI de Pessoa usa o modo de seleção única para a ListView.

## ListView e Ordenação

Suponha que você queira ordenar a lista de nomes por sobrenome e depois por nome. O JavaFX tem várias maneiras de ordenar listas. Como precisamos manter os nomes ordenados, envolveremos a `observableArrayList` subjacente em uma [`SortedList`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.base/javafx/collections/transformation/SortedList.html>). Para manter a lista ordenada na ListView, invocamos o método `setItems()` da [`ListView`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/ListView.html>) com a lista ordenada. Um comparator especifica a ordenação. Primeiro, comparamos o sobrenome de cada pessoa para ordenação e, se necessário, os nomes. Para definir a ordenação, o método `setComparator()` usa uma classe anônima ou, mais sucintamente, uma expressão lambda:

Observe que os argumentos do comparator p1 e p2 são inferidos como tipos `Person`, já que [`SortedList`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.base/javafx/collections/transformation/SortedList.html>) é genérica.

## Ações da Aplicação UI de Pessoa

Nossa aplicação UI de Pessoa implementa três ações: Excluir (remove o objeto `Person` selecionado da lista subjacente), Novo (cria um objeto `Person` e o adiciona à lista subjacente) e Atualizar (faz alterações no objeto `Person` selecionado e atualiza a lista subjacente). Vamos analisar cada ação em detalhes, com o objetivo de aprender mais sobre os recursos do JavaFX que o ajudam a construir este tipo de aplicação.

### Excluir uma Pessoa

A classe controller inclui um action event handler para o botão Excluir. Aqui está o trecho FXML que define o botão Excluir:

O atributo `fx:id` nomeia o botão para que a classe controller JavaFX possa acessá-lo. O atributo `onAction` corresponde ao handler de `ActionEvent` no código do controller. Não estamos usando atalhos de teclado nesta aplicação, então definimos o atributo `mnemonicParsing` como false.

*   *   *

**NOTA**

Quando a análise mnemônica é verdadeira, você pode especificar um atalho de teclado para ativar um controle rotulado, como Alt-F para abrir um menu Arquivo, por exemplo. Você define o atalho de teclado precedendo a letra alvo com um caractere de sublinhado no rótulo.

*   *   *

Você não pode atualizar uma [`SortedList`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.base/javafx/collections/transformation/SortedList.html>) diretamente, mas pode aplicar alterações à sua lista subjacente (`ObservableList personList`). A [`SortedList`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.base/javafx/collections/transformation/SortedList.html>) sempre mantém seus elementos ordenados sempre que você adiciona ou exclui itens.

Aqui está o event handler na classe controller:

Este handler remove o objeto `Person` selecionado da lista de array observável de apoio. O selection change listener do controle [`ListView`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/ListView.html>) define `selectedPerson`.

Observe que não precisamos verificar `selectedPerson` contra null aqui. Por que não? Você verá que desabilitamos o botão Excluir quando a `selectedItemProperty` é null. Isso significa que o action event handler do botão Excluir nunca pode ser invocado quando o usuário desseleciona um elemento no controle ListView. Aqui está a expressão de binding que controla a propriedade `disable` do botão Excluir:

Esta declaração elegante torna o event handler mais compacto e, consequentemente, menos propenso a erros. Tanto a `disableProperty` do botão quanto a `selectedItemProperty` do modelo de seleção são observables JavaFX. Você pode, portanto, usá-los em expressões de binding. A propriedade que invoca `bind()` é atualizada automaticamente quando os valores dos argumentos de `bind()` mudam.

### Adicionar uma Pessoa

O botão Novo adiciona uma `Person` à lista e, consequentemente, atualiza o controle [`ListView`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/ListView.html>). Um novo item é sempre ordenado porque a lista reordena quando elementos são adicionados à lista envolvida. Aqui está o FXML que define o botão Novo. Semelhante ao botão Excluir, definimos os atributos `fx:id` e `onAction`:

Em que circunstâncias devemos desabilitar o botão Novo?

*   Ao clicar em Novo, nenhum item na [`ListView`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/ListView.html>) deve estar selecionado. Portanto, desabilitamos o botão Novo se a `selectedItemProperty` não for null. Observe que você pode desselecionar o item selecionado com Command-click ou Control-click.
*   Não devemos criar uma nova `Person` se o campo de nome ou sobrenome estiver vazio. Então, desabilitamos o botão Novo se qualquer um desses campos estiver vazio. No entanto, permitimos que o campo Notas esteja vazio. Aqui está a expressão de binding que implementa essas restrições:

Agora, vamos mostrar o event handler do botão Novo:

Primeiro, criamos um novo objeto `Person` usando os controles de texto do formulário e adicionamos esta `Person` à lista envolvida (`ObservableList personList`). Para tornar os dados da `Person` visíveis e editáveis imediatamente, selecionamos a `Person` recém-adicionada.

### Atualizar uma Pessoa

Uma atualização de uma `Person` não é tão direta quanto as outras operações. Antes de nos aprofundarmos nos detalhes do porquê, vamos primeiro olhar o código FXML do botão Atualizar, que é semelhante aos outros botões:

Por padrão, uma lista ordenada não responde a elementos de array individuais que mudam. Por exemplo, se a `Person` "Ethan Nieto" mudar para "Ethan Abraham", a lista não será reordenada da mesma forma que acontece quando itens são adicionados ou removidos. Há duas maneiras de corrigir isso. A primeira é remover o item e adicioná-lo novamente com os novos valores.

A segunda maneira é definir um extractor para o objeto subjacente. Um extractor define properties que devem ser observadas quando ocorrem mudanças. Normalmente, as mudanças em elementos individuais da lista não são observadas. Objetos observáveis retornados pelo extractor sinalizam mudanças de atualização em um `ChangeListener` de lista. Assim, para fazer com que um controle [`ListView`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/ListView.html>) exiba uma lista corretamente ordenada após alterações em elementos individuais, você precisa definir uma [`ObservableList`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.base/javafx/collections/ObservableList.html>) com um extractor.

O benefício dos extractors é que você inclui apenas as properties que afetam a ordenação. Em nosso exemplo, as properties `firstname` e `lastname` afetam a ordem da lista. Essas properties devem ir no extractor.

Um extractor é um método de callback estático na classe modelo. Aqui está o extractor para nossa classe `Person`:

Agora a classe controller pode usar este extractor para declarar uma [`ObservableList`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.base/javafx/collections/ObservableList.html>) chamada `personList`, como segue:

Com o extractor configurado, a lista ordenada detecta mudanças em `firstnameProperty` e `lastnameProperty` e reordena conforme necessário.

Em seguida, definimos quando o botão Atualizar é habilitado. Em nossa aplicação, o botão Atualizar deve ser desabilitado se nenhum item estiver selecionado ou se o campo de texto `firstname` ou `lastname` ficar vazio. E, finalmente, desabilitamos Atualizar se o usuário ainda não fez alterações nos componentes de texto do formulário. Rastreamos essas mudanças com uma propriedade booleana JavaFX chamada `modifiedProperty`, criada com a classe auxiliar de propriedade booleana JavaFX, `SimpleBooleanProperty`. Inicializamos este booleano como false na classe controller JavaFX, como segue:

Redefinimos esta propriedade booleana para false no selection change listener da [`ListView`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/ListView.html>). A `modifiedProperty` é definida como true quando uma tecla é pressionada em qualquer um dos três campos que podem mudar: os controles de nome, sobrenome e notas. Aqui está o event handler de pressionamento de tecla, que é invocado quando um pressionamento de tecla é detectado dentro do foco para cada um desses três controles:

Claro, a marcação FXML deve configurar o atributo `onKeyReleased` para todos os três controles de texto para invocar o event handler de pressionamento de tecla. Aqui está o FXML para o `TextField` de `firstname`, que vincula o event handler `handleKeyAction` a um evento de liberação de tecla para este controle:

E aqui está a expressão de binding para o botão Atualizar, que é desabilitado se a `selectedItemProperty` for null, a `modifiedProperty` for false, ou os controles de texto estiverem vazios:

Agora, vamos mostrar o action event handler do botão Atualizar. Este handler é invocado quando o usuário clica no botão Atualizar após selecionar um item no controle [`ListView`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/ListView.html>) e fazer pelo menos uma alteração em qualquer um dos campos de texto.

Mas há mais uma tarefa de organização a fazer. Antes de iniciar a atualização do item selecionado com os valores dos controles do formulário, devemos remover o listener na `selectedItemProperty`. Por quê? Lembre-se de que as alterações nas properties `firstname` ou `lastname` afetarão a lista dinamicamente e possivelmente a reordenarão. Além disso, isso pode mudar a ideia da [`ListView`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/ListView.html>) sobre o item atualmente selecionado e invocar o `ChangeListener`. Para evitar isso, removemos o listener durante a atualização e o adicionamos de volta quando a atualização termina. Durante a atualização, o item selecionado permanece inalterado (mesmo que a lista seja reordenada). Assim, limpamos a flag `modifiedProperty` para garantir que o botão Atualizar seja desabilitado:

## UI de Pessoa com Records

Uma das novas e empolgantes features no Java 16 são os records. Records permitem modelar classes que contêm dados imutáveis e descrevem estado, muitas vezes com uma única linha de código. Vamos refatorar nosso exemplo de UI de Pessoa para usar records Java para a classe modelo `Person`. Fazemos isso por várias razões.

*   Clientes Java modernos com JavaFX continuarão a evoluir à medida que as aplicações aproveitarem novas features do Java. Afinal, JavaFX é implementado com APIs Java e certamente pode tirar proveito de novas features à medida que elas se tornam disponíveis.
*   Nosso exemplo de UI é um bom candidato para records, já que usar um record `Person` em vez de uma classe é uma abordagem direta.
*   Originalmente implementamos `Person` com properties JavaFX, que são observáveis e mutáveis. Mas, no contexto da nossa aplicação, essa mutabilidade é necessária ou mesmo desejável? • Records Java ajudam a tornar seu código mais legível, já que muitas vezes uma única linha define o estado da sua classe modelo.

### Record de Pessoa

Declaramos um record com seu nome e seus componentes imutáveis; cada componente tem um nome e tipo. Esses componentes são campos de instância `final` na classe gerada. Java gera métodos accessor para os campos, um construtor e implementações padrão para os métodos `equals()`, `hashCode()` e `toString()`.

Aqui está a nova classe `Person`, que é muito mais curta que a versão não-record:

Observe que fornecemos nossa própria implementação de `toString()` para substituir o `toString()` gerado automaticamente, já que a [`ListView`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/ListView.html>) usa isso para exibir cada objeto `Person`. Os métodos accessor gerados são `firstname()`, `lastname()` e `notes()` para corresponder aos elementos declarados no cabeçalho do record. Atualizamos nossa aplicação para usar esses nomes em vez das formas getter convencionais. Isso afeta o change listener de `selectedItemProperty` e o comparator da lista ordenada.

Nenhuma alteração é necessária nos event handlers `createButtonAction` ou `removeButtonAction`. Também não há alteração no código que cria nossa lista de exemplo de objetos `Person` (`SampleData.java`).

Records, no entanto, exigem alterações no event handler `updateButtonAction`. Como um objeto `Person` agora é imutável, não podemos atualizar seus campos. Portanto, para atualizar uma `Person`, devemos criar um novo objeto `Person`, remover o antigo e adicionar o novo à lista de apoio. A lista ordenada é atualizada automaticamente com os novos dados. Aqui está o novo event handler `updateButtonAction`.

Removendo e adicionando uma `Person`, o processo de atualização se torna mais simples. O extractor para detectar mudanças não é mais necessário, nem precisamos remover temporariamente o change listener de `selectedItemProperty` durante as atualizações.

Ao restringir `Person` a ser um contêiner imutável, simplificamos muito `Person` e a legibilidade do nosso programa. No entanto, as properties JavaFX e o binding ainda são features ideais para manter o estado da UI.
## Resumo dos Pontos Chave

Esta série cobriu bastante terreno. Vamos revisar os pontos chave:

  * JavaFX é um toolkit de UI moderno que executa eficientemente em ambientes desktop, mobile e embarcados.
  * JavaFX usa uma metáfora teatral. O sistema de tempo de execução cria o primary stage e invoca o método `start()` da sua aplicação.
  * Você cria um scene graph hierárquico e instala o root node na cena.
  * O sistema de tempo de execução do JavaFX realiza todas as atualizações de UI e modificações do scene graph na JavaFX Application Thread. Qualquer trabalho de longa duração deve ser relegado a tarefas em segundo plano em threads separadas para manter a UI responsiva. JavaFX possui uma biblioteca de concorrência bem desenvolvida que ajuda a manter o código da UI separado do código de segundo plano.
  * JavaFX suporta gráficos 2D e 3D. A origem em gráficos 2D é o canto superior esquerdo da cena.
  * JavaFX inclui um rico conjunto de controles de layout que permitem organizar componentes em uma cena. Você pode aninhar controles de layout e especificar critérios de redimensionamento.
  * JavaFX define um scene graph como uma coleção hierárquica de Nodes. Nodes são descritos por suas properties.
  * As properties do JavaFX são observáveis. Você pode anexar listeners e usar as ricas APIs de bindings para vincular properties umas às outras e detectar mudanças.
  * JavaFX permite definir animações de alto nível chamadas transitions.
  * A natureza hierárquica do scene graph significa que os parent nodes podem delegar o trabalho de renderização aos seus children.
  * JavaFX suporta uma ampla gama de events que permitem reagir a entradas do usuário e mudanças em um scene graph.
  * Embora você possa escrever aplicações JavaFX completamente em Java, uma abordagem melhor é escrever descrições visuais em FXML, uma linguagem de marcação para especificar conteúdo de UI. FXML ajuda a separar o código visual do código do model e do controller.
  * Cada arquivo FXML tipicamente descreve uma scene e configura um controller.

### Neste tutorial

Visão Geral UI Mestre-Detalhe O Model Observable Lists Implementando Seleção de ListView Usando Seleção Múltipla ListView e Ordenação UI de Pessoa Ações da Aplicação UI de Pessoa com Records Resumo dos Pontos Chave

Última atualização: 23 de março de 2026

**Anterior na Série**

[Usando FXML](<#/doc/tutorials/javafx/core/fxml>)

➜

**Tutorial Atual**

Juntando tudo

➜

Este é o fim da série!

**Anterior na Série:** [Usando FXML](<#/doc/tutorials/javafx/core/fxml>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos de JavaFX ](<#/doc/tutorials/javafx/core>) > Juntando tudo