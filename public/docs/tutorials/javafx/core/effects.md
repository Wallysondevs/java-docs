# Efeitos, Gradientes e Animações

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos JavaFX ](<#/doc/tutorials/javafx/core>) > Efeitos, Gradientes e Animações

**Anterior na Série**

[Controles de Layout JavaFX](<#/doc/tutorials/javafx/core/layout>)

➜

**Tutorial Atual**

Efeitos, Gradientes e Animações

➜

**Próximo na Série**

[Propriedades JavaFX](<#/doc/tutorials/javafx/core/properties>)

**Anterior na Série:** [Controles de Layout JavaFX](<#/doc/tutorials/javafx/core/layout>)

**Próximo na Série:** [Propriedades JavaFX](<#/doc/tutorials/javafx/core/properties>)

# Efeitos, Gradientes e Animações

Esta página foi contribuída por [Gail C. Anderson](</author/GailC.Anderson>) e [Paul Anderson](</author/PaulAnderson>) sob a [UPL](<https://oss.oracle.com/licenses/upl/>) e é de [The Definitive Guide to Modern Java Clients with JavaFX 17](<https://link.springer.com/book/10.1007/978-1-4842-7268-8>) gentilmente cedido pela Apress.

## Aprimorando a Aplicação MyShapes

Uma das vantagens do JavaFX sobre toolkits de UI mais antigos é a facilidade com que você pode aplicar efeitos, gradientes e animação a nodes em seu scene graph. Retornaremos ao conceito de nodes do scene graph repetidamente, pois é assim que o runtime do JavaFX renderiza eficientemente as partes visuais de sua aplicação. Vamos aplicar algumas modificações ao `MyShapes` agora para mostrar alguns desses recursos. Como o JavaFX é capaz de interpolar cores, você pode usar cores para definir gradientes. Gradientes dão profundidade a uma forma e podem ser radiais ou lineares. Vamos mostrar um gradiente linear.

## Gradiente Linear

Gradientes lineares requerem duas ou mais cores, chamadas Stops. Um stop de gradiente consiste em uma cor e um offset entre 0 e 1. Este offset especifica onde colocar a cor ao longo do gradiente. O gradiente calcula o sombreamento proporcional de um color stop para o próximo. Em nosso exemplo, usaremos três color stops: `Color.DODGERBLUE`, `Color.LIGHTBLUE` e `Color.GREEN`. O primeiro stop terá offset 0, o segundo offset .5 e o terceiro offset 1.0, como segue:

O construtor [`LinearGradient`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/paint/LinearGradient.html>) especifica o intervalo do eixo x seguido pelo intervalo do eixo y. O seguinte gradiente linear tem um eixo x constante, mas varia seu eixo y. Isso é chamado de gradiente vertical.

Boolean true indica que o gradiente se estende pela forma (onde 0 e 1 são proporcionais à forma), e `NO_CYCLE` significa que o padrão não se repete. Boolean false indica que os valores x e y do gradiente são, em vez disso, relativos ao sistema de coordenadas local do parent. Para fazer um gradiente horizontal, especifique um intervalo para o eixo x e torne o eixo y constante, como segue:

Outras combinações permitem especificar gradientes diagonais ou gradientes reversos, onde as cores aparecem na ordem oposta.

## DropShadow

Em seguida, vamos adicionar um efeito drop shadow à elipse. Você especifica a cor do drop shadow, bem como um radius e offsets x e y. Quanto maior o radius, maior a sombra. Os offsets representam o posicionamento da sombra em relação à borda externa da forma. Aqui, especificamos um radius de 30 pixels com um offset de 10 pixels para a direita e abaixo da forma:

Esses offsets simulam uma fonte de luz emanando do canto superior esquerdo da cena. Quando os offsets são 0, a sombra envolve toda a forma, como se a fonte de luz estivesse brilhando diretamente acima da cena.

## Reflection

Um efeito reflection espelha um componente e desvanece para transparente, dependendo de como você configura suas opacidades superior e inferior, fraction e offset. Vamos adicionar um efeito reflection ao nosso Text node. Usaremos `.8` para a fraction, de modo que a reflection será oito décimos do componente refletido. O offset especifica a que distância abaixo da borda inferior a reflection começa em pixels. Especificamos 1 pixel (o padrão é 0). A reflection começa totalmente opaca (opacidade superior) e transiciona para totalmente transparente (opacidade inferior), a menos que você modifique os valores de opacidade superior e inferior:

Você pode observar abaixo o programa MyShapes aprimorado sendo executado em uma janela. Você vê o preenchimento de gradiente linear aplicado à elipse, um drop shadow na elipse e o efeito reflection aplicado ao texto. [](<https://dev.java/assets/images/javafx/enhanced-myshapes-application.png>)

## Configurando Ações

Agora é hora de fazer nossa aplicação fazer algo. O JavaFX define vários tipos de eventos de entrada padrão com o mouse, gestos, toque ou teclas. Esses tipos de eventos de entrada possuem handlers específicos que os processam.

Vamos manter as coisas simples por enquanto. Mostraremos como escrever um event handler para processar um único evento de clique do mouse. Criaremos o handler e o anexaremos a um node em nosso scene graph. O comportamento do programa variará dependendo de qual node adquire o handler. Podemos configurar o mouse click handler no node de texto, elipse ou stack pane. Aqui está o código para adicionar um action event handler ao node de texto:

```java
text.setOnMouseClicked(mouseEvent -> {
    System.out.println(mouseEvent.getSource().getClass() + " clicked.");
});
```

Quando o usuário clica dentro do texto, o programa exibe a linha `class javafx.scene.text.Text` clicked.

Se o usuário clica na área de fundo (o stack pane) ou dentro da elipse, nada acontece. Se anexarmos o mesmo listener à elipse em vez do texto, veremos a linha `class javafx.scene.shape.Ellipse` clicked.

Note que, como o objeto de texto aparece na frente da elipse no stack pane, clicar no objeto de texto não invoca o event handler. Embora esses nodes do scene graph apareçam um sobre o outro, eles são nodes separados na hierarquia. Ou seja, um não está dentro do outro; em vez disso, ambos são distinct leaf nodes gerenciados pelo stack pane. Neste caso, se você quiser que ambos os nodes respondam a um clique do mouse, você anexaria o mouse event handler a ambos os nodes. Ou você poderia anexar apenas um event handler ao node stack pane. Então, um clique do mouse em qualquer lugar dentro da janela aciona o handler com a seguinte linha de saída: `class javafx.scene.layout.StackPane` clicked. Vamos fazer algo um pouco mais emocionante e aplicar uma animation ao programa `MyShape`s.

## Animação

O JavaFX torna a animation muito fácil quando você usa as APIs de transition integradas. Cada tipo de JavaFX Transition controla uma ou mais propriedades de Node (ou Shape). Por exemplo, o `FadeTransition` controla a opacity de um node, variando a propriedade ao longo do tempo. Para desvanecer algo gradualmente, você altera sua opacity de totalmente opaca (1) para completamente transparente (0). O `TranslateTransition` move um node modificando suas propriedades translateX e translateY (ou translateZ se você estiver trabalhando em 3D).

Você pode reproduzir múltiplas transitions em paralelo com um [`ParallelTransition`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/ParallelTransition.html>) ou sequencialmente com um [`SequentialTransition`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/SequentialTransition.html>). Para controlar o timing entre duas transitions sequenciais, use [`PauseTransition`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/PauseTransition.html>) ou configure um delay antes que uma transition comece com o método [`Transition`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/Transition.html>) `setDelay()`. Você também pode definir uma ação quando uma [`Transition`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/Transition.html>) é concluída usando a propriedade `onFinished` do action event handler de [`Transition`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/Transition.html>).

Transitions começam com o método `play()` ou `playFromStart()`. O método `play()` inicia a transition em seu tempo atual; o método `playFromStart()` sempre começa no tempo 0. Outros métodos incluem `stop()` e `pause()`. Você pode consultar o status de uma transition com `getStatus()`, que retorna um dos valores enum de [`Animation.Status`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/Animation.Status.html>): `RUNNING`, `PAUSED` ou `STOPPED`.

Todas as transitions suportam as propriedades comuns `duration`, `autoReverse`, `cycleCount`, `onFinished`, `currentTime` e `node` ou `shape` (para transitions específicas de Shape).

Vamos definir um [`RotateTransition`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/RotateTransition.html>) agora para o nosso programa `MyShapes`. A rotação começa quando um usuário clica dentro da janela.

```java
RotateTransition rt = new RotateTransition(Duration.millis(2500), stackPane);
rt.setFromAngle(0);
rt.setToAngle(360);
stackPane.setOnMouseClicked(mouseEvent -> {
    if (rt.getStatus().equals(Animation.Status.RUNNING)) {
        rt.pause();
    } else {
        rt.play();
    }
});
```

O construtor [`RotateTransition`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/RotateTransition.html>) especifica uma duration de 2500 milissegundos e aplica a transition ao node [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>). A animação de rotação começa no ângulo 0 e prossegue linearmente até o ângulo 360, proporcionando uma rotação completa. A animação começa quando o usuário clica em qualquer lugar dentro do controle de layout [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>).

Há algumas coisas interessantes a serem observadas neste exemplo. Primeiro, como definimos a transition no node [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>), a rotação se aplica a todos os filhos do [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>). Isso significa que não apenas as formas [`Ellipse`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/shape/Ellipse.html>) e [`Text`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/text/Text.html>) girarão, mas também os efeitos drop shadow e reflection.

Segundo, o event handler verifica o status da transition. Se a animação estiver em andamento (running), o event handler pausa a transition. Se não estiver running, ele a inicia com `play()`. Como `play()` começa no tempo atual da transition, um `pause()` seguido por `play()` retoma a transition de onde ela foi pausada.

Abaixo você pode ver o programa sendo executado durante a rotate transition.

[](<https://dev.java/assets/images/javafx/rotate-transition-myshapes-application.png>)

### Neste tutorial

Aprimorando a Aplicação MyShapes Gradiente Linear DropShadow Reflection Configurando Ações Animação

Última atualização: 23 de março de 2026

**Anterior na Série**

[Controles de Layout JavaFX](<#/doc/tutorials/javafx/core/layout>)

➜

**Tutorial Atual**

Efeitos, Gradientes e Animações

➜

**Próximo na Série**

[Propriedades JavaFX](<#/doc/tutorials/javafx/core/properties>)

**Anterior na Série:** [Controles de Layout JavaFX](<#/doc/tutorials/javafx/core/layout>)

**Próximo na Série:** [Propriedades JavaFX](<#/doc/tutorials/javafx/core/properties>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos JavaFX ](<#/doc/tutorials/javafx/core>) > Efeitos, Gradientes e Animações