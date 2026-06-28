# Herança

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Herança ](<#/doc/tutorials/inheritance>) > Herança

**Tutorial Atual**

Herança

➜

**Próximo na Série**

[Sobrescrevendo e Ocultando Métodos](<#/doc/tutorials/inheritance/overriding>)

**Próximo na Série:** [Sobrescrevendo e Ocultando Métodos](<#/doc/tutorials/inheritance/overriding>)

# Herança

## Herança

Nas seções anteriores, você viu a herança mencionada várias vezes. Na linguagem Java, as classes podem ser derivadas de outras classes, herdando assim campos e métodos dessas classes.

> Definições: Uma classe que é derivada de outra classe é chamada de subclasse (também uma classe derivada, classe estendida ou classe filha). A classe da qual a subclasse é derivada é chamada de superclasse (também uma classe base ou classe pai).
>
> Exceto [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>), que não possui superclasse, toda classe tem uma e apenas uma superclasse direta (herança única). Na ausência de qualquer outra superclasse explícita, toda classe é implicitamente uma subclasse de [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>).
>
> As classes podem ser derivadas de classes que são derivadas de classes que são derivadas de classes, e assim por diante, e, em última análise, derivadas da classe mais alta, [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>). Tal classe é considerada descendente de todas as classes na cadeia de herança que se estende até [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>).

A ideia de herança é simples, mas poderosa: Quando você deseja criar uma nova classe e já existe uma classe que inclui parte do código que você quer, você pode derivar sua nova classe da classe existente. Ao fazer isso, você pode reutilizar os campos e métodos da classe existente sem ter que escrevê-los (e depurá-los!) você mesmo.

Uma subclasse herda todos os membros (campos, métodos e classes aninhadas) de sua superclasse. Construtores não são membros, então eles não são herdados por subclasses, mas o construtor da superclasse pode ser invocado da subclasse.

A classe [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>), definida no pacote [`java.lang`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/package-summary.html>), define e implementa o comportamento comum a todas as classes — incluindo as que você escreve. Na plataforma Java, muitas classes derivam diretamente de [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>), outras classes derivam de algumas dessas classes, e assim por diante, formando uma hierarquia de classes.

No topo da hierarquia, [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>) é a mais geral de todas as classes. Classes próximas à base da hierarquia fornecem um comportamento mais especializado.

## Um Exemplo de Herança

Aqui está o código de exemplo para uma possível implementação de uma classe `Bicycle` que foi apresentada na seção Classes e Objetos:

Uma declaração de classe para uma classe `MountainBike` que é uma subclasse de `Bicycle` pode ser assim:

`MountainBike` herda todos os campos e métodos de `Bicycle` e adiciona o campo `seatHeight` e um método para defini-lo. Exceto pelo construtor, é como se você tivesse escrito uma nova classe `MountainBike` inteiramente do zero, com quatro campos e cinco métodos. No entanto, você não precisou fazer todo o trabalho. Isso seria especialmente valioso se os métodos na classe `Bicycle` fossem complexos e tivessem levado um tempo considerável para depurar.

## O Que Você Pode Fazer em uma Subclasse

Uma subclasse herda todos os membros `public` e `protected` de seu pai, independentemente do pacote em que a subclasse esteja. Se a subclasse estiver no mesmo pacote que seu pai, ela também herda os membros package-private do pai. Você pode usar os membros herdados como estão, substituí-los, ocultá-los ou complementá-los com novos membros:

  * Os campos herdados podem ser usados diretamente, assim como quaisquer outros campos.
  * Você pode declarar um campo na subclasse com o mesmo nome do campo na superclasse, ocultando-o assim (não recomendado).
  * Você pode declarar novos campos na subclasse que não estão na superclasse.
  * Os métodos herdados podem ser usados diretamente como estão.
  * Você pode escrever um novo método de instância na subclasse que tenha a mesma assinatura do método na superclasse, sobrescrevendo-o assim.
  * Você pode escrever um novo método `static` na subclasse que tenha a mesma assinatura do método na superclasse, ocultando-o assim.
  * Você pode declarar novos métodos na subclasse que não estão na superclasse.
  * Você pode escrever um construtor de subclasse que invoca o construtor da superclasse, seja implicitamente ou usando a palavra-chave `super`.
  * As seções seguintes desta lição irão expandir esses tópicos.

## Membros Private em uma Superclasse

Uma subclasse não herda os membros `private` de sua classe pai. No entanto, se a superclasse tiver métodos `public` ou `protected` para acessar seus campos `private`, estes também podem ser usados pela subclasse.

Uma classe aninhada tem acesso a todos os membros `private` de sua classe envolvente — tanto campos quanto métodos. Portanto, uma classe aninhada `public` ou `protected` herdada por uma subclasse tem acesso indireto a todos os membros `private` da superclasse.

## Casting de Objetos

Vimos que um objeto é do tipo de dado da classe da qual foi instanciado. Por exemplo, se escrevermos

```java
MountainBike myBike = new MountainBike();
```

então `myBike` é do tipo `MountainBike`.

`MountainBike` é descendente de `Bicycle` e [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>). Portanto, uma `MountainBike` é uma `Bicycle` e também um [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>), e pode ser usada onde quer que objetos `Bicycle` ou [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>) sejam solicitados.

O inverso não é necessariamente verdadeiro: uma `Bicycle` pode ser uma `MountainBike`, mas não é necessariamente. Da mesma forma, um [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>) pode ser uma `Bicycle` ou uma `MountainBike`, mas não é necessariamente.

Casting mostra o uso de um objeto de um tipo no lugar de outro tipo, entre os objetos permitidos por herança e implementações. Por exemplo, se escrevermos

```java
Object obj = new MountainBike();
```

então `obj` é tanto um [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>) quanto uma `MountainBike` (até o momento em que `obj` receba outro objeto que não seja uma `MountainBike`). Isso é chamado de _casting implícito_.

Se, por outro lado, escrevermos

```java
MountainBike myBike = obj;
```

obteríamos um erro em tempo de compilação porque `obj` não é conhecido pelo compilador como sendo uma `MountainBike`. No entanto, podemos dizer ao compilador que prometemos atribuir uma `MountainBike` a `obj` por meio de casting explícito:

```java
MountainBike myBike = (MountainBike)obj;
```

Este cast insere uma verificação em tempo de execução de que `obj` é atribuído a uma `MountainBike` para que o compilador possa assumir com segurança que `obj` é uma `MountainBike`. Se `obj` não for uma `MountainBike` em tempo de execução, uma exceção será lançada.

> Nota: Você pode fazer um teste lógico quanto ao tipo de um objeto particular usando o operador `instanceof`. Isso pode salvá-lo de um erro em tempo de execução devido a um cast impróprio. Por exemplo:

```java
if (obj instanceof MountainBike) {
    MountainBike myBike = (MountainBike)obj;
}
```

> Aqui o operador `instanceof` verifica que `obj` se refere a uma `MountainBike` para que possamos fazer o cast com o conhecimento de que nenhuma exceção em tempo de execução será lançada.

## Herança Múltipla de Estado, Implementação e Tipo

Uma diferença significativa entre classes e interfaces é que classes podem ter campos, enquanto interfaces não podem. Além disso, você pode instanciar uma classe para criar um objeto, o que você não pode fazer com interfaces. Conforme explicado na seção O Que É um Objeto?, um objeto armazena seu estado em campos, que são definidos em classes. Uma razão pela qual a linguagem de programação Java não permite que você estenda mais de uma classe é para evitar os problemas de herança múltipla de estado, que é a capacidade de herdar campos de múltiplas classes. Por exemplo, suponha que você seja capaz de definir uma nova classe que estende múltiplas classes. Quando você cria um objeto instanciando essa classe, esse objeto herdará campos de todas as superclasses da classe. E se métodos ou construtores de diferentes superclasses instanciarem o mesmo campo? Qual método ou construtor terá precedência? Como as interfaces não contêm campos, você não precisa se preocupar com problemas resultantes da herança múltipla de estado.

A _herança múltipla de implementação_ é a capacidade de herdar definições de métodos de múltiplas classes. Problemas surgem com este tipo de herança múltipla, como conflitos de nomes e ambiguidade. Quando compiladores de linguagens de programação que suportam este tipo de herança múltipla encontram superclasses que contêm métodos com o mesmo nome, eles às vezes não conseguem determinar qual membro ou método acessar ou invocar. Além disso, um programador pode introduzir inadvertidamente um conflito de nomes adicionando um novo método a uma superclasse. Métodos `default` introduzem uma forma de herança múltipla de implementação. Uma classe pode implementar mais de uma interface, que pode conter métodos `default` que têm o mesmo nome. O compilador Java fornece algumas regras para determinar qual método `default` uma classe particular usa.

A linguagem de programação Java suporta herança múltipla de tipo, que é a capacidade de uma classe implementar mais de uma interface. Um objeto pode ter múltiplos tipos: o tipo de sua própria classe e os tipos de todas as interfaces que a classe implementa. Isso significa que se uma variável é declarada como sendo do tipo de uma interface, então seu valor pode referenciar qualquer objeto que seja instanciado de qualquer classe que implemente a interface. Isso é discutido na seção Usando uma Interface como um Tipo.

Assim como na herança múltipla de implementação, uma classe pode herdar diferentes implementações de um método definido (como `default` ou `static`) nas interfaces que ela estende. Neste caso, o compilador ou o usuário deve decidir qual usar.

### Neste tutorial

Herança Um Exemplo de Herança O Que Você Pode Fazer em uma Subclasse Membros Private em uma Superclasse Casting de Objetos Herança Múltipla de Estado, Implementação e Tipo

Última atualização: 14 de setembro de 2021

**Tutorial Atual**

Herança

➜

**Próximo na Série**

[Sobrescrevendo e Ocultando Métodos](<#/doc/tutorials/inheritance/overriding>)

**Próximo na Série:** [Sobrescrevendo e Ocultando Métodos](<#/doc/tutorials/inheritance/overriding>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Herança ](<#/doc/tutorials/inheritance>) > Herança