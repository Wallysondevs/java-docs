# Estrutura Básica de Aplicação JavaFX Por Exemplo

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos do JavaFX ](<#/doc/tutorials/javafx/core>) > Estrutura Básica de Aplicação JavaFX Por Exemplo

**Tutorial Atual**

Estrutura Básica de Aplicação JavaFX Por Exemplo

➜

**Próximo na Série**

[Controles de Layout JavaFX](<#/doc/tutorials/javafx/core/layout>)

**Próximo na Série:** [Controles de Layout JavaFX](<#/doc/tutorials/javafx/core/layout>)

# Estrutura Básica de Aplicação JavaFX Por Exemplo

Esta página foi contribuída por [Gail C. Anderson](</author/GailC.Anderson>) e [Paul Anderson](</author/PaulAnderson>) sob a [UPL](<https://oss.oracle.com/licenses/upl/>) e é de [The Definitive Guide to Modern Java Clients with JavaFX 17](<https://link.springer.com/book/10.1007/978-1-4842-7268-8>) gentilmente cedido pela Apress.

## JavaFX Stage e Grafo de Cena

Uma aplicação JavaFX é controlada pela plataforma JavaFX, um sistema de tempo de execução que constrói o objeto da sua aplicação e a `JavaFX Application Thread`. Para construir uma aplicação JavaFX, você deve estender a classe `JavaFX Application`. O sistema de tempo de execução JavaFX controla o ciclo de vida da Aplicação e invoca o método `start()` da Aplicação.

JavaFX usa uma metáfora teatral: o contêiner de nível superior é o [`Stage`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/stage/Stage.html>) e é construído pela plataforma para você. Em aplicações desktop, o [`Stage`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/stage/Stage.html>) é a janela. Sua aparência depende do sistema hospedeiro e varia entre as plataformas Mac OS X, Windows e Linux. Normalmente, a janela é decorada com controles que redimensionam, minimizam e encerram sua aplicação. Também é possível construir janelas sem decoração. Você pode especializar a classe Application para outros ambientes também. Por exemplo, com o framework `Gluon Mobile Application`, seu programa estende Mobile Application, uma classe de aplicação especificamente escrita para dispositivos móveis.

## JavaFX É Single-Threaded

Você deve sempre construir e modificar o [`Stage`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/stage/Stage.html>) e seus objetos de cena na `JavaFX Application Thread`. Observe que JavaFX (assim como `Swing`) é um modelo de UI single-threaded. Para o desenvolvedor JavaFX, esta é principalmente uma restrição direta. Ao criar elementos de UI, responder a manipuladores de eventos, gerenciar conteúdo dinâmico com animação ou fazer alterações no grafo de cena, o trabalho continua a ser executado na JavaFX Application Thread.

Para manter a UI responsiva, no entanto, você deve atribuir trabalhos de longa duração a tarefas em segundo plano em threads separadas. Neste caso, o trabalho que modifica a UI deve ser separado do trabalho que está sendo executado em uma thread em segundo plano. Felizmente, JavaFX possui uma API de concorrência bem desenvolvida que ajuda os desenvolvedores a atribuir tarefas de longa duração a uma ou mais threads separadas. Isso mantém a thread da UI responsiva aos eventos do usuário.

## Estrutura Hierárquica de Nós

Continuando com a metáfora teatral, o [`Stage`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/stage/Stage.html>) contém uma cena. A cena consiste em elementos JavaFX como a raiz, que é o elemento de cena superior e contém o que é chamado de grafo de cena.

O grafo de cena é uma estrutura estritamente hierárquica de elementos que visualizam sua aplicação. Esses elementos são chamados de Nodes. Um Node tem exatamente um pai (exceto o nó raiz) e pode conter outros Nodes. Ou, um Node pode ser um nó folha sem filhos. Os Nodes devem ser adicionados ao grafo de cena para participar da renderização dessa cena. Além disso, um Node pode ser adicionado apenas uma vez a uma cena, a menos que seja primeiro removido e depois adicionado em outro lugar.

Nós pais, em geral, gerenciam seus filhos organizando-os dentro da cena de acordo com as regras de layout e quaisquer restrições que você configurar. JavaFX usa um sistema de coordenadas bidimensional para gráficos 2D com a origem no canto superior esquerdo da cena, conforme mostrado na figura abaixo. Os valores das coordenadas no eixo x aumentam para a direita, e os valores do eixo y aumentam à medida que você se move para baixo na cena.

[](<https://dev.java/assets/images/javafx/javafx-coordinates.png>)

JavaFX também suporta gráficos 3D e representa a terceira dimensão com valores do eixo z, fornecendo profundidade. JavaFX possui um sistema de coordenadas absoluto, além de sistemas de coordenadas locais que são relativos ao pai. Em cada caso, a origem do sistema de coordenadas é o canto superior esquerdo do pai. Em geral, os controles de layout ocultam as complexidades do posicionamento de componentes dentro da cena e gerenciam o posicionamento de seus filhos para você. O posicionamento do componente é baseado no controle de layout específico e em como você o configura. Também é possível aninhar controles de layout. Por exemplo, você pode colocar vários controles VBox em um [`HBox`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/HBox.html>) ou colocar um [`AnchorPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/AnchorPane.html>) em um painel de um controle [`SplitPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/SplitPane.html>). Outros nós pais são nós visuais mais complexos, como [`TextField`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/TextField.html>), [`TextArea`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/TextArea.html>) e [`Button`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/Button.html>). Esses nós possuem subpartes gerenciadas. Por exemplo, [`Button`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/Button.html>) inclui uma parte de texto rotulada e um gráfico opcional. Este gráfico pode ser de qualquer tipo de nó, mas é tipicamente uma imagem ou ícone.

Lembre-se que os nós folha não possuem nós filhos. Exemplos incluem [`Shape`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/shape/Shape.html>) (como [`Rectangle`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/shape/Rectangle.html>), [`Ellipse`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/shape/Ellipse.html>), [`Line`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/shape/Line.html>), [`Path`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/shape/Path.html>) e [`Text`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/text/Text.html>)) e [`ImageView`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/image/ImageView.html>), um nó para renderizar uma imagem.

Apenas um aviso: você deve usar um editor de texto simples para criar e salvar este arquivo. Usar um processador de texto não funcionará.

## Um Exemplo de Forma Simples

A imagem abaixo mostra uma aplicação JavaFX simples chamada `MyShapes` que exibe uma elipse e um elemento de texto centralizados em uma janela de aplicação. A aparência desta janela varia dependendo da plataforma subjacente. Ao redimensionar a janela, os elementos visíveis permanecerão centralizados no espaço redimensionado. Embora este seja um programa simples, há muito a aprender aqui sobre renderização JavaFX, recursos de layout e nós.

[](<https://dev.java/assets/images/javafx/myshapes-application.png>)

O código-fonte para esta aplicação está no programa `MyShapes`. A classe `MyShapes` é a classe principal e estende [`Application`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/application/Application.html>). O sistema de tempo de execução JavaFX instancia `MyShapes`, bem como o Stage primário, que ele passa para o método `start()` sobrescrito. O sistema de tempo de execução invoca o método `start()` para você.

Observe as declarações de importação que referenciam pacotes em `javafx.application`, `javafx.scene` e `javafx.stage`.

* * *

**NOTA** : Certifique-se de especificar o pacote correto para quaisquer declarações de importação. Algumas classes JavaFX, como Rectangle, têm o mesmo nome de classe que suas contrapartes AWT ou Swing. Todas as classes JavaFX fazem parte do pacote `javafx`.

* * *

Este programa cria vários nós e os adiciona a um contêiner de layout [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>). O programa também cria a cena, configura o stage e exibe o stage. Vamos analisar esses passos em detalhes.

Primeiro, criamos uma forma [`Ellipse`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/shape/Ellipse.html>), fornecendo uma largura e altura em pixels. Como [`Ellipse`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/shape/Ellipse.html>) estende [`Shape`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/shape/Shape.html>), também podemos configurar qualquer propriedade de [`Shape`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/shape/Shape.html>). Isso inclui `fill`, que permite especificar um valor de preenchimento interior.

## Cor

A propriedade `fill` de um [`Shape`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/shape/Shape.html>) pode ser uma cor JavaFX, um gradiente linear, um gradiente radial ou uma imagem. Vamos discutir brevemente a cor. Você pode especificar cores em JavaFX de várias maneiras. Aqui, definimos a propriedade `fill` da [`Ellipse`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/shape/Ellipse.html>) para `Color.LIGHTBLUE`.

Atualmente, existem 147 cores predefinidas na classe JavaFX Color, nomeadas alfabeticamente de `ALICEBLUE` a `YELLOWGREEN`. No entanto, você também pode especificar [`Color`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/paint/Color.html>) usando valores RGB da web com notação hexadecimal ou números decimais. Você pode opcionalmente fornecer um valor alfa para transparência. Totalmente opaco é 1 e totalmente transparente é 0. Uma transparência de .5, por exemplo, mostra a cor, mas também permite que a cor de fundo apareça. Aqui estão alguns exemplos que definem o preenchimento de uma forma com [`Color`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/paint/Color.html>):

```java
// Set fill to a predefined color
ellipse.setFill(Color.LIGHTBLUE);

// Set fill to a web RGB value
ellipse.setFill(Color.web("#0000FF")); // Blue

// Set fill to a web RGB value with alpha
ellipse.setFill(Color.web("#0000FF", 0.5)); // 50% transparent blue

// Set fill using decimal RGB values
ellipse.setFill(Color.rgb(0, 0, 255)); // Blue

// Set fill using decimal RGB values with alpha
ellipse.setFill(Color.rgb(0, 0, 255, 0.5)); // 50% transparent blue
```

Notavelmente, você pode interpolar os valores de uma cor, e é assim que JavaFX constrói gradientes. Mostraremos como criar um gradiente linear em breve.

## Texto

Em seguida, criamos um objeto Text. Text também é um [`Shape`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/shape/Shape.html>) com propriedades adicionais, como fonte, alinhamento de texto, texto e largura de quebra de linha. O construtor fornece o texto e o método `setFont()` define sua fonte.

```java
Text message = new Text("MyShapes");
message.setFont(Font.font("Serif", 80));
```

## O Sistema de Coordenadas JavaFX

Observe que criamos os nós de elipse e texto, mas eles ainda não estão em nosso grafo de cena. Antes de adicioná-los à cena, devemos colocar esses nós em algum tipo de contêiner de layout. Os controles de layout são extremamente importantes no gerenciamento do seu grafo de cena. Esses controles não apenas organizam os componentes para você, mas também respondem a eventos como redimensionamento, adição ou remoção de elementos e quaisquer alterações nos tamanhos de um ou mais nós no grafo de cena.

Para mostrar o quão importantes são os controles de layout, vamos substituir o [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>) do exemplo original por um [`Group`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/Group.html>) e especificar o posicionamento manualmente. [`Group`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/Group.html>) é um nó pai que gerencia seus filhos, mas não oferece nenhuma capacidade de layout. Aqui criamos um grupo e adicionamos os elementos de elipse e texto com o construtor. Em seguida, especificamos o grupo como o nó raiz da cena:

```java
Group group = new Group(ellipse, message);
Scene scene = new Scene(group, 350, 230);
```

Group usa configurações de alinhamento padrão para seus filhos e posiciona tudo na origem (0,0), o canto superior esquerdo da cena. Para Text, o posicionamento padrão é a borda inferior esquerda do elemento de texto. Neste caso, as únicas porções visíveis serão as letras que se estendem abaixo da borda inferior (as letras minúsculas `y` e `p` de `MyShapes`). A elipse será centralizada na origem do grupo (0,0), e, portanto, apenas o quadrante inferior direito será visível. Este arranjo claramente não é o que queremos. Para corrigir isso, vamos centralizar manualmente as formas na cena de 350 × 230, da seguinte forma:

```java
ellipse.setCenterX(175);
ellipse.setCenterY(115);
message.setX(175 - message.getLayoutBounds().getWidth() / 2);
message.setY(115 + message.getLayoutBounds().getHeight() / 4);
```

Agora as formas estarão bem centralizadas na cena. Mas isso ainda não é o ideal. As formas permanecerão presas na cena nessas coordenadas quando a janela for redimensionada (a menos que você escreva código que detecte e reaja ao redimensionamento da janela). E você não quer fazer isso. Em vez disso, use os controles de layout JavaFX!

### Neste tutorial

JavaFX Stage e Grafo de Cena JavaFX É Single-Threaded Estrutura Hierárquica de Nós Um Exemplo de Forma Simples Cor Texto É uma Forma O Sistema de Coordenadas JavaFX

Última atualização: 23 de março de 2026

**Tutorial Atual**

Estrutura Básica de Aplicação JavaFX Por Exemplo

➜

**Próximo na Série**

[Controles de Layout JavaFX](<#/doc/tutorials/javafx/core/layout>)

**Próximo na Série:** [Controles de Layout JavaFX](<#/doc/tutorials/javafx/core/layout>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos do JavaFX ](<#/doc/tutorials/javafx/core>) > Estrutura Básica de Aplicação JavaFX Por Exemplo