# Usando FXML

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos do JavaFX ](<#/doc/tutorials/javafx/core>) > Usando FXML

**Anterior na Série**

[Propriedades JavaFX](<#/doc/tutorials/javafx/core/properties>)

➜

**Tutorial Atual**

Usando FXML

➜

**Próximo na Série**

[Juntando tudo](<#/doc/tutorials/javafx/core/all>)

**Anterior na Série:** [Propriedades JavaFX](<#/doc/tutorials/javafx/core/properties>)

**Próximo na Série:** [Juntando tudo](<#/doc/tutorials/javafx/core/all>)

# Usando FXML

Esta página foi contribuída por [Gail C. Anderson](</author/GailC.Anderson>) e [Paul Anderson](</author/PaulAnderson>) sob a [UPL](<https://oss.oracle.com/licenses/upl/>) e é de [The Definitive Guide to Modern Java Clients with JavaFX 17](<https://link.springer.com/book/10.1007/978-1-4842-7268-8>) gentilmente contribuído pela Apress.

## Declarar Nós do Grafo de Cena com FXML

Você viu como as APIs JavaFX criam nós do grafo de cena e os configuram para você. Os programas `MyShapes` e `MyShapesProperties` usam apenas código JavaFX para construir e configurar esses objetos. Uma abordagem alternativa é declarar nós do grafo de cena com FXML, uma notação de marcação baseada em XML. O FXML permite que você descreva e configure seu grafo de cena em um formato declarativo. Esta abordagem tem várias vantagens:

  * A estrutura de marcação FXML é hierárquica, então ela reflete a estrutura do seu grafo de cena.
  * O FXML descreve sua view e suporta uma arquitetura Model-View-Controller (MVC), proporcionando uma estrutura melhor para aplicações maiores.
  * O FXML reduz o código JavaFX que você precisa escrever para criar e configurar nós do grafo de cena.
  * Você pode projetar sua UI com o Scene Builder. Esta ferramenta de arrastar e soltar é uma aplicação autônoma que fornece uma renderização visual da sua cena. E o Scene Builder gera a marcação FXML para você.
  * Você também pode editar sua marcação FXML com editores de texto e IDE.

O FXML afeta a estrutura do seu programa. A classe principal da aplicação agora invoca um [`FXMLLoader`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.fxml/javafx/fxml/FXMLLoader.html>). Este carregador analisa sua marcação FXML, cria objetos JavaFX e insere o grafo de cena na cena no nó raiz. Você pode ter vários arquivos FXML, e tipicamente cada um tem uma classe controladora JavaFX correspondente. Esta classe controladora pode incluir manipuladores de eventos ou outras declarações que atualizam dinamicamente a cena. O controlador também inclui lógica de negócios que gerencia uma view específica.

Vamos retornar ao nosso exemplo `MyShapes` (agora chamado `MyShapesFXML`) e usar um arquivo FXML para a view e CSS para estilização. Abaixo você pode ver os arquivos em nosso programa, organizados para uso com ferramentas de construção ou IDEs.

[](<https://dev.java/assets/images/javafx/myshapes-fxml-css.png>)

O código fonte JavaFX aparece sob o subdiretório `java`. O subdiretório `resources` contém os arquivos FXML e CSS (aqui `Scene.fxml` e `Styles.css`).

Este programa inclui um controle [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>) rotativo, [`VBox`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/VBox.html>) e um segundo objeto [`Text`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/text/Text.html>). `Scene.fxml` descreve nosso grafo de cena: um [`VBox`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/VBox.html>) de nível superior que inclui um [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>) e um elemento [`Text`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/text/Text.html>). O [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>) inclui as formas [`Ellipse`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/shape/Ellipse.html>) e [`Text`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/text/Text.html>).

O contêiner de nível superior inclui o nome da classe controladora JavaFX com o atributo `fx:controller`. O [`VBox`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/VBox.html>) especifica seu alinhamento, tamanhos preferenciais e espaçamento, seguido por seus filhos: o [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>) e o [`Text`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>). Aqui, configuramos o [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>) com dimensionamento preferencial. Um atributo especial `fx:id` especifica um nome de variável correspondente a este nó. Na classe controladora JavaFX, você verá agora este nome de variável anotado com `@FXML` para o [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>). É assim que você acessa objetos na classe controladora que são declarados em arquivos FXML.

Além disso, o [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>) especifica um manipulador de eventos `onMouseClicked` chamado `#handleMouseClick`. Este manipulador de eventos também é anotado com `@FXML` na classe controladora JavaFX.

Aqui, os filhos do [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>), [`Ellipse`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/shape/Ellipse.html>) e [`Text`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/text/Text.html>), são declarados dentro do nó FXML `Children`. Nenhum deles possui atributos `fx:id` associados, já que a classe controladora não precisa acessar esses objetos. Você também vê as configurações de gradiente linear, sombra projetada e efeito de reflexão.

Observe que o objeto [`Text`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/text/Text.html>) com `fx:id text2` aparece após a definição do [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>). Isso faz com que o segundo objeto [`Text`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/text/Text.html>) apareça sob o [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>) no [`VBox`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/VBox.html>). Também especificamos um atributo `fx:id` para acessar este nó a partir do controlador JavaFX.

## Classe Controladora

Vamos mostrar a classe controladora agora. Você notará que o código é mais compacto, já que as instanciações de objetos e o código de configuração não são mais feitos com declarações Java. Tudo isso agora é especificado na marcação FXML.

A classe controladora implementa [`Initializable`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.fxml/javafx/fxml/Initializable.html>) e sobrescreve o método `initialize()`, que é invocado para você em tempo de execução. Importante, os campos de classe privados `stackPane` e `text2` são anotados com `@FXML`. A anotação `@FXML` associa nomes de variáveis na classe controladora aos objetos descritos no arquivo FXML. Não há código na classe controladora que crie esses objetos porque o [`FXMLLoader`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.fxml/javafx/fxml/FXMLLoader.html>) faz isso por você.

O método `initialize()` faz três coisas aqui. Primeiro, ele cria e configura o [`RotateTransition`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/RotateTransition.html>) e o aplica ao nó `stackPane`. Segundo, ele adiciona um listener de mudança à propriedade de status da transição. E terceiro, uma expressão de ligação para a propriedade `stroke` de `text2` especifica sua cor com base no status da transição de rotação.

A anotação `@FXML` com `handleMouseClick()` indica que o arquivo FXML configura o manipulador de eventos. Este manipulador de eventos de clique do mouse inicia e para a animação da transição de rotação.

## Classe de Aplicação JavaFX

A classe principal da aplicação, `MyShapesFXML`, agora se torna muito simples. Sua função é invocar o [`FXMLLoader`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.fxml/javafx/fxml/FXMLLoader.html>), que analisa o FXML (`Scene.fxml`), constrói o grafo de cena e retorna a raiz do grafo de cena. Tudo o que você precisa fazer é construir o objeto `scene` e configurar o `stage` como antes, conforme mostrado abaixo.

## Adicionando CSS

Agora vamos mostrar como incorporar seus próprios estilos com CSS. Uma vantagem do JavaFX é sua capacidade de estilizar nós com CSS. O JavaFX vem com uma folha de estilo padrão, `Modena.css`. Você pode aumentar esses estilos padrão ou substituí-los por novos. Nosso arquivo CSS de exemplo encontrado no arquivo `Styles.css` é uma única classe de estilo (`mytext`) que define seu estilo de fonte como itálico:

Para usar esta folha de estilo, você deve primeiro carregar o arquivo, seja no método `start()` da aplicação ou no arquivo FXML. Uma vez que o arquivo é adicionado às folhas de estilo disponíveis, você pode aplicar as classes de estilo a um nó. Para aplicar classes de estilo definidas individualmente a um nó específico, por exemplo, use:

Aqui, `mytext` é a classe de estilo e `text2` é o segundo objeto [`Text`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/text/Text.html>) em nosso programa. Alternativamente, você pode especificar a folha de estilo no arquivo FXML. A vantagem desta abordagem é que os estilos agora estão disponíveis dentro do Scene Builder. Aqui está o arquivo `Scene.fxml` modificado que carrega este arquivo CSS personalizado e aplica a classe de estilo CSS personalizada ao nó `text2 Text`:

## Usando o Scene Builder

O Scene Builder foi originalmente desenvolvido na Oracle e agora é de código aberto. Ele está disponível para download na Gluon aqui: <https://gluonhq.com/products/scene-builder/>. O Scene Builder é uma ferramenta autônoma de arrastar e soltar para criar UIs JavaFX. Você pode ver abaixo a janela principal do Scene Builder com o arquivo `Scene.fxml` do programa `MyShapesFXML`.

[](<https://dev.java/assets/images/javafx/scene-builder.png>)

A janela superior esquerda mostra a biblioteca de componentes JavaFX. Esta biblioteca inclui contêineres, controles, formas, 3D e muito mais. Desta janela, você seleciona componentes e os arrasta para sua cena na visualização central ou para a janela `Document` mostrada na área inferior esquerda.

A janela `Document` mostra a hierarquia do grafo de cena. Você pode selecionar componentes e movê-los dentro da árvore. A janela direita é uma janela `Inspector` que permite configurar cada componente, incluindo suas propriedades, configurações de layout e código. Nesta figura, o [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>) é selecionado na janela de hierarquia `Document` e aparece na visualização visual central. Na janela `Inspector`, a propriedade `OnMouseClicked` é definida como `#handleMouseClick`, que é o nome do método correspondente na classe controladora JavaFX.

O Scene Builder é particularmente útil ao construir UIs baseadas em formulários do mundo real. Você pode visualizar sua hierarquia de cena e configurar facilmente as configurações de layout e alinhamento.

### Neste tutorial

  * Declarar Nós do Grafo de Cena com FXML
  * Classe Controladora
  * Classe de Aplicação JavaFX
  * Adicionando CSS
  * Usando o Scene Builder

Última atualização: 23 de março de 2026

**Anterior na Série**

[Propriedades JavaFX](<#/doc/tutorials/javafx/core/properties>)

➜

**Tutorial Atual**

Usando FXML

➜

**Próximo na Série**

[Juntando tudo](<#/doc/tutorials/javafx/core/all>)

**Anterior na Série:** [Propriedades JavaFX](<#/doc/tutorials/javafx/core/properties>)

**Próximo na Série:** [Juntando tudo](<#/doc/tutorials/javafx/core/all>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos do JavaFX ](<#/doc/tutorials/javafx/core>) > Usando FXML