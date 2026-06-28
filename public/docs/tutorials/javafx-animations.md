# Introdução às animações JavaFX

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Introdução às animações JavaFX

# Introdução às animações JavaFX

Esta página foi contribuída por [Connor Schweighöfer](</author/ConnorSchweighöfer>) sob a [UPL](<https://oss.oracle.com/licenses/upl/>)

O pacote [javafx.animation](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/package-summary.html>) oferece um framework simples para criar animações e transições em uma aplicação JavaFX. Ele opera com base no princípio de [`WritableValue<T>`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.base/javafx/beans/value/WritableValue.html>), que é usado em todo o JavaFX. `WritableValue<T>` é uma interface que encapsula um valor que pode ser lido e definido. É comumente usada para armazenar propriedades em elementos da UI JavaFX, como `width` ou `height` na forma [`Rectangle`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/shape/Rectangle.html>). Além disso, ele fornece uma variedade de transições embutidas para efeitos comuns, suporte para transições paralelas e sequenciais, e a capacidade de lidar com eventos após a conclusão da animação.

Este artigo aborda todos os tipos de animações, começando com `Animation` e suas subclasses `Transition` e `Timeline`, antes de representar uma animação de nível inferior com `AnimationTimer`. Enquanto `Transition` oferece uma maneira mais simples e amigável de criar animações, `Timeline` oferece maior flexibilidade e é adequado para animações mais complexas. Em contraste, `AnimationTimer` é projetado para atualizações quadro a quadro e não faz uso de `WritableValue<T>`.

## Animation

A classe abstrata [`Animation`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/Animation.html>) fornece a funcionalidade central para as animações `Transition` e `Timeline` e não pode ser estendida diretamente.

Uma `Animation` consiste em múltiplas propriedades:

  * O `targetFramerate` é a taxa de quadros máxima (quadros por segundo) na qual esta `Animation` será executada.
  * O `currentTime` é o ponto atual no tempo na `Animation` como uma [`Duration`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.base/javafx/util/Duration.html>).
  * O `rate` define a direção e a velocidade em que a `Animation` deve ser reproduzida. Ele suporta números positivos e negativos.
  * O `cycleCount` define o número de ciclos desta `Animation`. Não pode ser alterado durante a execução e deve ser positivo.
  * O `cycleDuration` é a `Duration` de um ciclo desta `Animation`. É o tempo que leva para reproduzir do início ao fim da `Animation` **na taxa padrão de 1.0**.
  * O `totalDuration` indica a duração total desta `Animation`, incluindo repetições. É o resultado de `cycleDuration * cycleCount` ou possivelmente `Duration.INDEFINITE`.
  * O `delay` é a `Duration` que atrasa a `Animation` ao iniciar.
  * A propriedade `autoReverse` especifica se a `Animation` será reproduzida na direção inversa em ciclos alternados.
  * O manipulador de eventos `onFinished` é usado para definir um comportamento adicional quando a `Animation` termina.
  * O `status` representa o estado atual da `Animation`, os estados possíveis são `PAUSED`, `RUNNING` e `STOPPED`.

Além disso, ele fornece vários métodos úteis, como `play()`, `playFrom(String cuePoint)`, `pause()`, `stop()` e mais para controlar o fluxo das animações. Uma rápida olhada em [sua documentação](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/Animation.html>) oferece uma ótima visão geral de suas funcionalidades.

## Transition

A classe abstrata [`Transition`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/Transition.html>) serve como a classe fundamental para todas as transições, apresentando uma forma comum de `Animation`. JavaFX fornece uma variedade de transições embutidas para propriedades comuns de [`Node`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/Node.html>) e [`Shape`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/shape/Shape.html>).

### Fade Transition

A [`FadeTransition`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/FadeTransition.html>) cria um efeito de fade (esmaecimento). Isso é feito atualizando a propriedade `opacity` do `Node` em intervalos regulares.

(Para um guia completo sobre como configurar uma aplicação JavaFX, consulte este artigo: [JavaFX Application Basic Structure By Example](<#/doc/tutorials/javafx/core/structure>))

### Fill Transition

A [`FillTransition`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/FillTransition.html>) cria uma animação que altera o preenchimento de uma forma. Isso é feito atualizando a propriedade `fill` do `Shape` em intervalos regulares.

### Translate Transition

A [`TranslateTransition`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/TranslateTransition.html>) cria uma animação de movimento/translação de uma posição para outra em linha reta. Isso é feito atualizando as propriedades `translateX`, `translateY` e `translateZ` do `Node` em intervalos regulares.

### Path Transition

A [`PathTransition`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/PathTransition.html>) cria uma animação de movimento usando um caminho complexo predefinido especificado por uma sequência de formas. A translação ao longo do caminho é feita atualizando as propriedades `translateX` e `translateY` do `Node`, e a variável `rotate` será atualizada se `orientation` for definido como `OrientationType.ORTHOGONAL_TO_TANGENT`, em intervalos regulares.

### Rotate Transition

A [`RotateTransition`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/RotateTransition.html>) cria uma animação de rotação. Isso é feito atualizando a propriedade `rotate` do `Node` em intervalos regulares. O valor do ângulo é especificado em graus.

### Scale Transition

A [`ScaleTransition`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/ScaleTransition.html>) cria uma animação de escala, que altera o tamanho de um nó. Isso é feito atualizando as propriedades `scaleX`, `scaleY` e `scaleZ` do `Node` em intervalos regulares.

### Stroke Transition

A [`StrokeTransition`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/StrokeTransition.html>) cria uma animação que altera a cor do traço de uma forma. Isso é feito atualizando a propriedade `stroke` do `Shape` em intervalos regulares.

### Sequential Transition

A [`SequentialTransition`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/SequentialTransition.html>) reproduz uma série de animações em ordem sequencial. Não é recomendado conter uma `Animation` que não seja a última com `Duration.INDEFINITE`, pois isso bloqueará todas as animações posteriores na sequência.

### Pause Transition

A [`PauseTransition`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/PauseTransition.html>) cria uma pausa por uma `duration` especificada. Este comportamento é útil para criar um atraso em uma `SequentialTransition` na qual nenhuma propriedade muda.

Observe que este código apenas define um `Node` na `SequentialTransition`, que é a transição pai aqui, e não nas transições filhas individuais. Elas usarão implicitamente o `Node` de sua transição pai.

### Parallel Transition

A [`ParallelTransition`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/ParallelTransition.html>) reproduz um grupo de animações em paralelo.

## Timeline

Uma [`Timeline`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/Timeline.html>) é usada para definir uma `Animation` de forma livre em qualquer `WritableValue<T>`. É útil se nenhuma das transições embutidas operar nas propriedades necessárias. Ela consiste em uma série sequencial de `KeyFrame`s, cada um dos quais encapsula um momento no tempo. Coletivamente, eles especificam como as propriedades alvo evoluem ao longo de toda a duração.

> **Aviso:** Uma `Timeline` em execução está sendo referenciada pelo runtime do FX. Em uma timeline infinita, os objetos com propriedades animadas não seriam coletados pelo garbage collector, o que poderia resultar em um vazamento de memória. Portanto, certifique-se de parar a instância da timeline quando ela não for mais necessária.

### KeyFrame

Um [`KeyFrame`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/KeyFrame.html>) representa um momento específico em uma sequência de animação (**Ponto de Referência**) e compreende uma coleção de instâncias de `KeyValue` que mudam ao longo da `Duration` fornecida. Um KeyFrame pode ter um nome que pode ser usado para identificar este `KeyFrame` em uma animação, por exemplo, para iniciar a partir deste `KeyFrame` específico usando `playFrom(String cuePoint)`. Também é possível fornecer uma implementação `onFinished`, que será invocada ao atingir este ponto de referência.

### KeyValue

Um [`KeyValue`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/KeyValue.html>) estabelece um mapeamento entre um `WritableValue<T>` e um valor alvo do tipo `T`. Isso é usado para definir a mudança de um valor. Um `Interpolator` pode ser adicionalmente definido para ajustar a taxa de mudança para este valor. A classe `KeyValue` é imutável.

### Exemplo

Este exemplo de `Timeline` cria um `Circle` que se move 200px na direção x durante 5 segundos:

## Interpolator

A classe abstrata [`Interpolator`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/Interpolator.html>) define a taxa de mudança na qual os valores mudam ao longo do tempo, influenciando a suavidade das animações. Existem várias implementações embutidas para técnicas de interpolação comuns.

**Nota:** Por padrão, todas as transições, excluindo `ParallelTransition` e `SequentialTransition`, utilizam o `Interpolator#EASE_BOTH`.

Aqui está uma visualização do `Interpolator` usando o exemplo de `Timeline`:

### Discrete

O interpolador [`Interpolator.DISCRETE`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/Interpolator.html#DISCRETE>) cria uma transição **súbita** entre valores sem quaisquer etapas intermediárias.

### Linear

O interpolador [`Interpolator.LINEAR`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/Interpolator.html#LINEAR>) produz uma taxa de mudança **constante** entre valores ao longo do tempo.

### Ease In

O interpolador [`Interpolator.EASE_IN`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/Interpolator.html#EASE_IN>) inicia a animação lentamente e acelera à medida que progride.

### Ease Out

O interpolador [`Interpolator.EASE_OUT`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/Interpolator.html#EASE_OUT>) inicia rapidamente e desacelera à medida que progride.

### Ease Both

O interpolador [`Interpolator.EASE_BOTH`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/Interpolator.html#EASE_BOTH>) inicia lentamente, acelera no meio e desacelera no final. Ele combina as características de `EASE_IN` e `EASE_OUT`.

Além disso, existem dois métodos de fábrica estáticos para interpolação [`Interpolator.SPLINE`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/Interpolator.html#SPLINE\(double,double,double,double\)>) e [`Interpolator.TANGENT`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/Interpolator.html#TANGENT\(javafx.util.Duration,double,javafx.util.Duration,double\)>).

## Animation Timer

A classe abstrata [`AnimationTimer`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/animation/AnimationTimer.html>) fornece a opção de nível mais baixo para criar uma animação. O método `handle(long now)` é chamado em cada quadro enquanto está ativo. O timestamp `now` é o tempo do quadro atual em nanossegundos e será o mesmo para todos os `AnimationTimer`s chamados durante aquele quadro. Além disso, o `AnimationTimer` adiciona os métodos `start()` e `stop()` para gerenciar o ciclo de vida da animação.

**Nota:** O método `handle` será chamado na **JavaFX Application Thread**, portanto, deve evitar operações de longa duração e bloqueio. Para manter uma taxa de quadros suave de 30 quadros por segundo, a aplicação JavaFX idealmente aloca não mais que 33 milissegundos por quadro.

## Conclusão

Neste tutorial, você explorou o pacote `javafx.animation` e aprendeu como criar animações dinâmicas em aplicações JavaFX. Começamos entendendo a classe base `Animation`, e então passamos para as classes `Transition` e `Timeline`, que fornecem diferentes maneiras de criar e controlar animações. Além disso, você aprendeu como controlar a progressão de uma animação através de vários exemplos de `Interpolator`. Finalmente, abordamos a classe `AnimationTimer`, que permite animações com atualizações precisas quadro a quadro. Com essas ferramentas, você está agora equipado para criar animações ricas em suas aplicações JavaFX.

### Neste tutorial

Animation Transition Timeline Interpolator Animation Timer Conclusão

Última atualização: 31 de maio de 2024

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Introdução às animações JavaFX

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)