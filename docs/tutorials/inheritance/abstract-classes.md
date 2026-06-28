# Métodos e Classes Abstratas

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Herança ](<#/doc/tutorials/inheritance>) > Métodos e Classes Abstratas 

**Anterior na Série**

[Object as a Superclass](<#/doc/tutorials/inheritance/objects>)

➜

**Tutorial Atual**

Métodos e Classes Abstratas

➜

Este é o fim da série! 

**Anterior na Série:** [Object as a Superclass](<#/doc/tutorials/inheritance/objects>)

# Métodos e Classes Abstratas

 

## Métodos e Classes Abstratas

Uma classe abstrata é uma classe que é declarada `abstract`—ela pode ou não incluir métodos abstratos. Classes abstratas não podem ser instanciadas, mas podem ser subclasseadas.

Um método abstrato é um método que é declarado sem uma implementação (sem chaves, e seguido por um ponto e vírgula), assim:

Se uma classe inclui métodos abstratos, então a própria classe deve ser declarada `abstract`, como em:

Quando uma classe abstrata é subclasseada, a subclasse geralmente fornece implementações para todos os métodos abstratos em sua classe pai. No entanto, se não o fizer, então a subclasse também deve ser declarada `abstract`.

> Nota: Métodos em uma interface (veja a [seção Interfaces](<#/doc/tutorials/interfaces>)) que não são declarados como default ou static são implicitamente abstratos, então o modificador abstract não é usado com métodos de interface. (Ele pode ser usado, mas é desnecessário.)

 

## Classes Abstratas Comparadas a Interfaces

Classes abstratas são semelhantes a interfaces. Você não pode instanciá-las, e elas podem conter uma mistura de métodos declarados com ou sem uma implementação. No entanto, com classes abstratas, você pode declarar campos que não são static e final, e definir métodos concretos `public`, `protected` e `private`. Com interfaces, todos os campos são automaticamente `public`, `static` e `final`, e todos os métodos que você declara ou define (como default methods) são `public`. Além disso, você pode estender apenas uma classe, seja ela abstrata ou não, enquanto você pode implementar qualquer número de interfaces.

Qual você deve usar, classes abstratas ou interfaces?

  * Considere usar classes abstratas se alguma destas afirmações se aplicar à sua situação:

    * Você deseja compartilhar código entre várias classes intimamente relacionadas.
    * Você espera que as classes que estendem sua classe abstrata tenham muitos métodos ou campos comuns, ou exijam modificadores de acesso diferentes de public (como `protected` e `private`).
    * Você deseja declarar campos não-static ou não-final. Isso permite que você defina métodos que podem acessar e modificar o estado do objeto ao qual eles pertencem.
  * Considere usar interfaces se alguma destas afirmações se aplicar à sua situação:

    * Você espera que classes não relacionadas implementem sua interface. Por exemplo, as interfaces [`Comparable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Comparable.html>) e [`Cloneable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Cloneable.html>) são implementadas por muitas classes não relacionadas.
    * Você deseja especificar o comportamento de um tipo de dado particular, mas não está preocupado com quem implementa seu comportamento.
    * Você deseja tirar proveito da herança múltipla de tipo.



Um exemplo de uma classe abstrata no JDK é [`AbstractMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/AbstractMap.html>), que faz parte do Collections Framework. Suas subclasses (que incluem [`HashMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashMap.html>), [`TreeMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/TreeMap.html>) e [`ConcurrentHashMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html>)) compartilham muitos métodos (incluindo [`get()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/AbstractMap.html#get\(java.lang.Object\)>), [`put()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/AbstractMap.html#put\(K,V\)>), [`isEmpty()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/AbstractMap.html#isEmpty\(\)>), [`containsKey()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/AbstractMap.html#containsKey\(java.lang.Object\)>) e [`containsValue()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/AbstractMap.html#containsValue\(java.lang.Object\)>)) que [`AbstractMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/AbstractMap.html>) define.

Um exemplo de uma classe no JDK que implementa várias interfaces é [`HashMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashMap.html>), que implementa as interfaces [`Serializable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Serializable.html>), [`Cloneable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Cloneable.html>) e [`Map<K, V>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>). Ao ler esta lista de interfaces, você pode inferir que uma instância de [`HashMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashMap.html>) (independentemente do desenvolvedor ou empresa que implementou a classe) pode ser clonada, é serializável (o que significa que pode ser convertida em um byte stream; veja a seção Objetos Serializáveis), e tem a funcionalidade de um mapa. Além disso, a interface [`Map<K, V>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html>) foi aprimorada com muitos default methods como [`merge()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#merge\(K,V,java.util.function.BiFunction\)>) e [`forEach()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Map.html#forEach\(java.util.function.BiConsumer\)>) que classes mais antigas que implementaram esta interface não precisam definir.

Observe que muitas bibliotecas de software usam tanto classes abstratas quanto interfaces; a classe [`HashMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashMap.html>) implementa várias interfaces e também estende a classe abstrata [`AbstractMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/AbstractMap.html>).

 

## Um Exemplo de Classe Abstrata

Em uma aplicação de desenho orientada a objetos, você pode desenhar círculos, retângulos, linhas, curvas de Bezier e muitos outros objetos gráficos. Esses objetos todos têm certos estados (por exemplo: posição, orientação, cor da linha, cor de preenchimento) e comportamentos (por exemplo: moveTo, rotate, resize, draw) em comum. Alguns desses estados e comportamentos são os mesmos para todos os objetos gráficos (por exemplo: posição, cor de preenchimento e moveTo). Outros exigem implementações diferentes (por exemplo, resize ou draw). 

Todos os GraphicObjects devem ser capazes de se desenhar ou redimensionar; eles apenas diferem na forma como o fazem. Esta é uma situação perfeita para uma superclasse abstrata. Você pode tirar proveito das semelhanças e declarar todos os objetos gráficos para herdar do mesmo objeto pai abstrato, por exemplo, `GraphicObject`.

Primeiro, você declara uma classe abstrata, `GraphicObject`, para fornecer variáveis de membro e métodos que são totalmente compartilhados por todas as subclasses, como a posição atual e o método `moveTo()`. `GraphicObject` também declara métodos abstratos para métodos, como `draw()` ou `resize()`, que precisam ser implementados por todas as subclasses, mas devem ser implementados de maneiras diferentes. A classe `GraphicObject` pode se parecer com isto:

Cada subclasse não-abstrata de `GraphicObject`, como `Circle` e `Rectangle`, deve fornecer implementações para os métodos `draw()` e `resize()`:

 

## Quando uma Classe Abstrata Implementa uma Interface

Na seção sobre Interfaces, foi observado que uma classe que implementa uma interface deve implementar todos os métodos da interface. É possível, no entanto, definir uma classe que não implementa todos os métodos da interface, desde que a classe seja declarada como `abstract`. Por exemplo,

Neste caso, a classe `X` deve ser abstrata porque ela não implementa completamente `Y`, mas a classe `XX` de fato implementa `Y`.

 

## Membros de Classe

Uma classe abstrata pode ter campos `static` e métodos `static`. Você pode usar esses membros `static` com uma referência de classe (por exemplo, `AbstractClass.staticMethod()`) como faria com qualquer outra classe.

### Neste tutorial

Métodos e Classes Abstratas Classes Abstratas Comparadas a Interfaces Um Exemplo de Classe Abstrata Quando uma Classe Abstrata Implementa uma Interface Membros de Classe

  


Última atualização: 14 de setembro de 2021

  


**Anterior na Série**

[Object as a Superclass](<#/doc/tutorials/inheritance/objects>)

➜

**Tutorial Atual**

Métodos e Classes Abstratas

➜

Este é o fim da série! 

**Anterior na Série:** [Object as a Superclass](<#/doc/tutorials/inheritance/objects>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Herança ](<#/doc/tutorials/inheritance>) > Métodos e Classes Abstratas