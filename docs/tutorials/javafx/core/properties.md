# Propriedades JavaFX

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos JavaFX ](<#/doc/tutorials/javafx/core>) > Propriedades JavaFX

**Anterior na Série**

[Efeitos, Gradientes e Animações](<#/doc/tutorials/javafx/core/effects>)

➜

**Tutorial Atual**

Propriedades JavaFX

➜

**Próximo na Série**

[Usando FXML](<#/doc/tutorials/javafx/core/fxml>)

**Anterior na Série:** [Efeitos, Gradientes e Animações](<#/doc/tutorials/javafx/core/effects>)

**Próximo na Série:** [Usando FXML](<#/doc/tutorials/javafx/core/fxml>)

# Propriedades JavaFX

Esta página foi contribuída por [Gail C. Anderson](</author/GailC.Anderson>) e [Paul Anderson](</author/PaulAnderson>) sob a [UPL](<https://oss.oracle.com/licenses/upl/>) e é de [The Definitive Guide to Modern Java Clients with JavaFX 17](<https://link.springer.com/book/10.1007/978-1-4842-7268-8>) gentilmente contribuído pela Apress.

## Introdução

Os listeners de propriedade JavaFX que se aplicam a propriedades de objeto (não coleções) vêm em dois tipos: listeners de invalidação e listeners de mudança. Listeners de invalidação são acionados quando o valor de uma propriedade não é mais válido. Para este exemplo e os que se seguem, discutiremos o programa MyShapesProperties, que é baseado na aplicação `MyShapes` anterior. Neste novo programa, adicionamos um segundo objeto [`Text`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/text/Text.html>) colocado em um controle de layout [`VBox`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/VBox.html>) abaixo do [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>) rotativo. Abaixo você pode ver o grafo de cena atualizado com o [`VBox`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/VBox.html>) de nível superior.

[](<https://dev.java/assets/images/javafx/myshapes-properties.png>)

## Listeners de Invalidação

Listeners de invalidação possuem um único método que você sobrescreve com expressões lambda. Vamos mostrar a expressão não-lambda primeiro, para que você possa ver a definição completa do método. Quando você clica no [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>), o manipulador de clique do mouse gira o controle [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>) como antes. O segundo objeto [`Text`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/text/Text.html>) exibe o status da animação [`RotateTransition`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/RotateTransition.html>), que é gerenciado pela propriedade de status somente leitura. Você verá RUNNING, PAUSED ou STOPPED. A figura abaixo mostra a animação pausada.

[](<https://dev.java/assets/images/javafx/myshapes-properties-invalidation.png>)

O listener de invalidação inclui um objeto observável que permite acessar a propriedade. Como o observável não é genérico, você deve aplicar um type cast apropriado para acessar o valor da propriedade. Aqui está uma maneira de acessar o valor da propriedade de status da animação em um listener anexado a essa propriedade. Observe que anexamos o listener com o método getter da propriedade `statusProperty()`:

```java
animation.statusProperty().addListener(new InvalidationListener() {
    @Override
    public void invalidated(Observable observable) {
        text2.setText("Status: " + ((RotateTransition) observable).getStatus());
    }
});
```

Aqui implementamos o mesmo listener com uma expressão lambda:

```java
animation.statusProperty().addListener(observable ->
    text2.setText("Status: " + ((RotateTransition) observable).getStatus()));
```

Como acessamos apenas o valor da propriedade de status, podemos ignorar o observável com o método `getStatus()`, que retorna um enum. Isso evita a expressão de casting:

```java
animation.statusProperty().addListener(observable ->
    text2.setText("Status: " + animation.getStatus()));
```

## Listeners de Mudança

Quando você precisa acessar o valor anterior de um observável, bem como seu valor atual, use um listener de mudança. Listeners de mudança fornecem o observável e os valores novo e antigo. Listeners de mudança podem ser mais caros, pois precisam rastrear mais informações. Aqui está a versão não-lambda de um listener de mudança que exibe os valores antigo e novo. Observe que você não precisa fazer cast desses parâmetros, pois os listeners de mudança são genéricos:

```java
animation.statusProperty().addListener(new ChangeListener<Animation.Status>() {
    @Override
    public void changed(ObservableValue<? extends Animation.Status> observable,
                        Animation.Status oldValue, Animation.Status newValue) {
        text2.setText("Status: " + oldValue + " -> " + newValue);
    }
});
```

Aqui está a versão com uma expressão lambda mais compacta:

```java
animation.statusProperty().addListener((observable, oldValue, newValue) ->
    text2.setText("Status: " + oldValue + " -> " + newValue));
```

Abaixo você pode ver o `MyShapesProperties` sendo executado com um listener de mudança anexado à propriedade de status da animação. Agora podemos exibir tanto os valores anteriores quanto os atuais.

[](<https://dev.java/assets/images/javafx/myshapes-properties-change.png>)

## Binding

O binding JavaFX é um mecanismo flexível e rico em API que permite evitar a escrita de listeners em muitas situações. Você usa o binding para vincular o valor de uma propriedade JavaFX a uma ou mais outras propriedades JavaFX. Bindings de propriedade podem ser unidirecionais ou bidirecionais. Quando as propriedades são do mesmo tipo, o método `bind()` unidirecional pode ser tudo o que você precisa. No entanto, quando as propriedades têm tipos diferentes ou você deseja calcular um valor com base em mais de uma propriedade, então você precisará das APIs fluent e bindings. Você também pode criar seus próprios métodos de binding com custom binding.

## Binding Unidirecional

A forma mais simples de binding vincula o valor de uma propriedade ao valor de outra. Aqui, vinculamos a propriedade rotate de text2 à propriedade rotate de `stackPane`:

```java
text2.rotateProperty().bind(stackPane.rotateProperty());
```

Isso significa que quaisquer mudanças na rotação de `stackPane` atualizarão imediatamente a propriedade rotate de text2. Quando este binding é definido no programa `MyShapesProperties`, quaisquer cliques dentro do [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>) iniciam uma transição de rotação. Isso faz com que tanto o [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>) quanto os componentes text2 girem juntos. O [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>) gira porque iniciamos o `RotateTransition` definido para aquele nó. O nó text2 gira por causa da expressão de bind.

Observe que, ao vincular uma propriedade, você não pode definir explicitamente seu valor a menos que desvincule a propriedade primeiro.

## Binding Bidirecional

O binding bidirecional fornece um relacionamento bidirecional entre duas propriedades. Quando uma propriedade é atualizada, a outra também é atualizada. Aqui está um exemplo com duas propriedades de texto:

```java
text1.textProperty().bindBidirectional(text2.textProperty());
```

Ambos os controles de texto exibem inicialmente "My Shapes". Quando o usuário clica dentro do `stackPane` e o `stackPane` gira, ambas as propriedades de texto agora conterão o status da animação por causa do change listener.

O binding bidirecional não é completamente simétrico; o valor inicial de ambas as propriedades assume o valor da propriedade passada na chamada para `bindBidirectional()`. Ao contrário de `bind()`, você pode definir explicitamente qualquer uma das propriedades ao usar o binding bidirecional.

## API Fluent e API de Bindings

As APIs fluent e bindings ajudam você a construir expressões de bind quando mais de uma propriedade precisa participar de um binding ou quando é necessário realizar algum tipo de cálculo ou conversão. Por exemplo, a seguinte expressão de bind exibe o ângulo de rotação do [`StackPane`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/StackPane.html>) enquanto ele gira de 0 a 360 graus. A propriedade de texto é uma `String`, e a propriedade rotate é um double. O método de binding `asString()` converte o double para [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>), formatando o número com um único dígito à direita do ponto decimal:

```java
text2.textProperty().bind(stackPane.rotateProperty().asString("Angle: %.1f"));
```

Para um exemplo mais complexo, vamos atualizar a propriedade stroke de `text2` (sua cor) dependendo se a animação está em execução ou não. Aqui construímos um binding com [`When`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.base/javafx/beans/binding/When.html>) baseado em uma expressão ternária. Isso define a cor do stroke para verde quando a animação está em execução e para vermelho quando a animação está parada ou pausada:

```java
text2.strokeProperty().bind(
    new When(animation.statusProperty().isEqualTo(Animation.Status.RUNNING))
        .then(Color.GREEN)
        .otherwise(Color.RED));
```

A propriedade de texto `text2` é definida no change listener que está anexado à propriedade de status da animação que mostramos anteriormente. Você pode ver abaixo a aplicação `MyShapesProperties` com a complexa expressão de bind anexada à `text2 strokeProperty`. Como a animação está em execução, a propriedade stroke é definida como `Color.GREEN`.

[](<https://dev.java/assets/images/javafx/myshapes-properties-fluent.png>)

### Neste tutorial

Introdução
Listeners de Invalidação
Listeners de Mudança
Binding
Binding Bidirecional
Binding Unidirecional
API Fluent e API de Bindings

Última atualização: 23 de março de 2026

**Anterior na Série**

[Efeitos, Gradientes e Animações](<#/doc/tutorials/javafx/core/effects>)

➜

**Tutorial Atual**

Propriedades JavaFX

➜

**Próximo na Série**

[Usando FXML](<#/doc/tutorials/javafx/core/fxml>)

**Anterior na Série:** [Efeitos, Gradientes e Animações](<#/doc/tutorials/javafx/core/effects>)

**Próximo na Série:** [Usando FXML](<#/doc/tutorials/javafx/core/fxml>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos JavaFX ](<#/doc/tutorials/javafx/core>) > Propriedades JavaFX