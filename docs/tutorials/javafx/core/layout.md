# Controles de Layout JavaFX

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos do JavaFX ](<#/doc/tutorials/javafx/core>) > Controles de Layout JavaFX

**Anterior na Série**

[Estrutura Básica de Aplicação JavaFX por Exemplo](<#/doc/tutorials/javafx/core/structure>)

➜

**Tutorial Atual**

Controles de Layout JavaFX

➜

**Próximo na Série**

[Efeitos, Gradientes e Animações](<#/doc/tutorials/javafx/core/effects>)

**Anterior na Série:** [Estrutura Básica de Aplicação JavaFX por Exemplo](<#/doc/tutorials/javafx/core/structure>)

**Próximo na Série:** [Efeitos, Gradientes e Animações](<#/doc/tutorials/javafx/core/effects>)

# Controles de Layout JavaFX

Esta página foi contribuída por [Gail C. Anderson](</author/GailC.Anderson>) e [Paul Anderson](</author/PaulAnderson>) sob a [UPL](<https://oss.oracle.com/licenses/upl/>) e é de [The Definitive Guide to Modern Java Clients with JavaFX 17](<https://link.springer.com/book/10.1007/978-1-4842-7268-8>) gentilmente contribuído pela Apress.

## Introdução

Para gerenciar os nós de uma cena, você usa um ou mais desses controles. Cada controle é projetado para uma configuração de layout específica. Além disso, você pode aninhar controles de layout para gerenciar grupos de nós e especificar como o layout deve reagir a eventos, como redimensionamento ou alterações nos nós gerenciados. Você pode especificar configurações de alinhamento, bem como controles de margem e preenchimento (padding).

Existem várias maneiras de adicionar nós a contêineres de layout. Você pode adicionar nós filhos com o construtor do contêiner de layout. Você também pode usar o método `getChildren().add()` para um único nó e o método `getChildren().addAll()` para múltiplos nós. Além disso, alguns controles de layout possuem métodos especializados para adicionar nós. Vamos analisar alguns controles de layout comumente usados agora para mostrar como o JavaFX pode compor uma cena para você.

## StackPane

Um contêiner de layout conveniente e fácil é [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>). Este controle de layout empilha seus filhos de trás para frente na ordem em que você adiciona os nós. Observe que adicionamos a elipse primeiro para que ela apareça atrás do nó de texto. Na ordem oposta, a elipse obscureceria o elemento de texto.

Por padrão, [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>) centraliza todos os seus filhos. Você pode fornecer um alinhamento diferente para os filhos ou aplicar um alinhamento a um nó específico no [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>). Por exemplo,

centraliza o nó de texto ao longo da borda inferior do StackPane. Agora, quando você redimensiona a janela, a elipse permanece centralizada e o texto permanece ancorado na borda inferior da janela. Para especificar o alinhamento de todos os nós gerenciados à borda inferior, use

Embora tanto a elipse quanto o texto apareçam na parte inferior da janela, eles não estarão centralizados um em relação ao outro. Por que não?

## AnchorPane

[`AnchorPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/AnchorPane.html>) gerencia seus filhos de acordo com pontos de ancoragem configurados, mesmo quando um contêiner é redimensionado. Você especifica um deslocamento da borda do painel para um componente. Aqui, adicionamos um Label a um AnchorPane e o ancoramos ao lado inferior esquerdo do painel com um deslocamento de 10 pixels:

[`AnchorPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/AnchorPane.html>) é tipicamente usado como um gerenciador de layout de nível superior para controlar margens, mesmo quando a janela é redimensionada.

## GridPane

[`GridPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/GridPane.html>) permite que você coloque nós filhos em uma grade bidimensional de tamanho flexível. Os componentes podem abranger linhas e/ou colunas, mas o tamanho da linha é consistente para todos os componentes em uma determinada linha. Da mesma forma, a largura da coluna é consistente para uma determinada coluna. [`GridPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/GridPane.html>) possui métodos especializados que adicionam nós a uma célula específica designada por um número de coluna e linha. Argumentos opcionais permitem especificar valores de abrangência de coluna e linha. Por exemplo, o primeiro label aqui é colocado na célula correspondente à coluna 0 e linha 0. O segundo label vai para a célula correspondente à coluna 1 e linha 0, e abrange duas colunas (a segunda e a terceira colunas). Também devemos fornecer um valor de abrangência de linha (aqui ele é definido como 1):

[`GridPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/GridPane.html>) é útil para organizar componentes em formulários que acomodam colunas ou linhas de vários tamanhos. [`GridPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/GridPane.html>) também permite que os nós abranjam várias colunas ou linhas. Usamos [`GridPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/GridPane.html>) em nosso exemplo de UI mestre-detalhe (consulte a seção _Putting It All Together_ desta série).

## FlowPane e TilePane

[`FlowPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/FlowPane.html>) gerencia seus filhos em um fluxo horizontal ou vertical. A orientação padrão é horizontal. Você pode especificar a direção do fluxo com o construtor ou usar o método `setOrientation()`. Aqui, especificamos uma orientação vertical com o construtor:

[`FlowPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/FlowPane.html>) envolve nós filhos de acordo com um limite configurável. Se você redimensionar um painel que contém um [`FlowPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/FlowPane.html>), o layout ajustará o fluxo conforme necessário. O tamanho das células depende do tamanho dos nós, e não será uma grade uniforme a menos que todos os nós tenham o mesmo tamanho. Este layout é conveniente para nós cujos tamanhos podem variar, como nós `ImageView` ou formas. `TilePane` é semelhante ao [`FlowPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/FlowPane.html>), exceto que `TilePane` usa células de tamanho igual.

## BorderPane

[`BorderPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/BorderPane.html>) é conveniente para aplicações desktop com seções discretas, incluindo uma barra de ferramentas superior (Top), uma barra de status inferior (Bottom), uma área de trabalho central (Center) e duas áreas laterais (Right e Left). Qualquer uma das cinco seções pode estar vazia. Aqui está um exemplo de um [`BorderPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/BorderPane.html>) com um retângulo no centro e um label no topo:

Observe que [`BorderPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/BorderPane.html>) usa um alinhamento central por padrão para a área central e um alinhamento à esquerda para o topo. Para manter o label da área superior centralizado, configuramos seu alinhamento com `Pos.CENTER`. Também definimos margens ao redor do label com o método estático `setMargin()` de BorderPane. O construtor `Insets` aceita quatro valores correspondentes às bordas superior, direita, inferior e esquerda. Configurações semelhantes de alinhamento e margem também se aplicam a outros componentes de layout.

## SplitPane

[`SplitPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/SplitPane.html>) divide o espaço de layout em múltiplas áreas configuradas horizontal ou verticalmente. O divisor é móvel, e você tipicamente usa outros controles de layout em cada uma das áreas do [`SplitPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/SplitPane.html>). Usamos [`SplitPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/SplitPane.html>) em nosso exemplo de UI mestre-detalhe (confira a parte _Putting It All Together_ desta série).

## HBox, VBox e ButtonBar

Os controles de layout [`HBox`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/HBox.html>) e [`VBox`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/VBox.html>) fornecem posicionamentos horizontais ou verticais únicos para nós filhos. Você pode aninhar nós [`HBox`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/HBox.html>) dentro de um [`VBox`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/VBox.html>) para um efeito de grade ou aninhar nós `VBox` dentro de um componente `HBox`. [`ButtonBar`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/ButtonBar.html>) é conveniente para colocar uma linha de botões de tamanho igual em um contêiner horizontal.

## Criando uma Cena

Voltando a `MyShapes`, a Scene contém o grafo de cena, definido por seu nó raiz.

Primeiro, construímos a [`Scene`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/Scene.html>) e fornecemos `stackPane` como o nó raiz. Em seguida, especificamos sua largura e altura em pixels e fornecemos um argumento de preenchimento opcional para o fundo (`Color.LIGHTYELLOW`). O que resta é configurar o Stage. Fornecemos um título, definimos a cena e exibimos o stage. O runtime JavaFX renderiza nossa cena. Abaixo está uma visão hierárquica do grafo de cena para nossa aplicação `MyShapes`. O nó raiz é o [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>), que contém seus dois nós filhos, `Ellipse` e `Text`.

[](<https://dev.java/assets/images/javafx/myshapes-scene-graph.png>)

### Neste tutorial

Introdução StackPane AnchorPane GridPane FlowPane e TilePane BorderPane SplitPane HBox, VBox e ButtonBar Criando uma Cena

Última atualização: 23 de março de 2026

**Anterior na Série**

[Estrutura Básica de Aplicação JavaFX por Exemplo](<#/doc/tutorials/javafx/core/structure>)

➜

**Tutorial Atual**

Controles de Layout JavaFX

➜

**Próximo na Série**

[Efeitos, Gradientes e Animações](<#/doc/tutorials/javafx/core/effects>)

**Anterior na Série:** [Estrutura Básica de Aplicação JavaFX por Exemplo](<#/doc/tutorials/javafx/core/structure>)

**Próximo na Série:** [Efeitos, Gradientes e Animações](<#/doc/tutorials/javafx/core/effects>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos do JavaFX ](<#/doc/tutorials/javafx/core>) > Controles de Layout JavaFX