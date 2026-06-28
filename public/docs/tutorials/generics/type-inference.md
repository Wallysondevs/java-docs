# Inferência de Tipo

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Generics ](<#/doc/tutorials/generics>) > Inferência de Tipo

**Anterior na Série**

[Introdução aos Generics](<#/doc/tutorials/generics/intro>)

➜

**Tutorial Atual**

Inferência de Tipo

➜

**Próximo na Série**

[Wildcards](<#/doc/tutorials/generics/wildcards>)

**Anterior na Série:** [Introdução aos Generics](<#/doc/tutorials/generics/intro>)

**Próximo na Série:** [Wildcards](<#/doc/tutorials/generics/wildcards>)

# Inferência de Tipo

## Inferência de Tipo e Métodos Genéricos

_Inferência de tipo_ é a capacidade de um Java compiler de analisar cada invocação de método e a declaração correspondente para determinar o type argument (ou argumentos) que tornam a invocação aplicável. O inference algorithm determina os tipos dos argumentos e, se disponível, o tipo ao qual o resultado está sendo atribuído ou retornado. Finalmente, o inference algorithm tenta encontrar o tipo mais específico que funciona com todos os argumentos.

Para ilustrar este último ponto, no exemplo a seguir, a inferência determina que o segundo argumento passado para o método `pick` é do tipo [`Serializable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Serializable.html>):

Generic Methods apresentou a você a inferência de tipo, que permite invocar um método genérico como você faria com um método comum, sem especificar um tipo entre colchetes angulares. Considere o exemplo a seguir, `BoxDemo`, que requer a classe `Box`:

O seguinte é a saída deste exemplo:

O método genérico `addBox()` define um type parameter chamado `U`. Geralmente, um Java compiler pode inferir os type parameters de uma chamada de método genérico. Consequentemente, na maioria dos casos, você não precisa especificá-los. Por exemplo, para invocar o método genérico `addBox()`, você pode especificar o type parameter com um type witness da seguinte forma:

Alternativamente, se você omitir o type witness, um Java compiler infere automaticamente (a partir dos argumentos do método) que o type parameter é [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>):

## Inferência de Tipo e Instanciação de Classes Genéricas

Você pode substituir os type arguments necessários para invocar o constructor de uma generic class por um conjunto vazio de type parameters (`<>`), desde que o compiler possa inferir os type arguments a partir do context. Este par de colchetes angulares é informalmente chamado de diamond.

Por exemplo, considere a seguinte declaração de variável:

Você pode substituir o tipo parametrizado do constructor por um conjunto vazio de type parameters (`<>`):

Observe que, para aproveitar a inferência de tipo durante a instanciação de classes genéricas, você deve usar o diamond. No exemplo a seguir, o compiler gera um unchecked conversion warning porque o constructor [`HashMap()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashMap.html#%3Cinit%3E\(\)>) se refere ao [`HashMap`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/HashMap.html>) raw type, e não ao tipo `Map<String, List<String>>`:

## Inferência de Tipo e Construtores Genéricos de Classes Genéricas e Não Genéricas

Observe que os constructors podem ser genéricos (em outras palavras, declarar seus próprios formal type parameters) tanto em generic classes quanto em non-generic classes. Considere o exemplo a seguir:

Considere a seguinte instanciação da classe `MyClass`:

Esta instrução cria uma instância do tipo parametrizado `MyClass<Integer>;` a instrução especifica explicitamente o tipo [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) para o formal type parameter, `X`, da generic `class MyClass<X>`. Observe que o constructor para esta generic class contém um formal type parameter, `T`. O compiler infere o tipo [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) para o formal type parameter, `T`, do constructor desta generic class (porque o actual parameter deste constructor é um objeto [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>)).

Compilers de versões anteriores ao Java SE 7 são capazes de inferir os actual type parameters de generic constructors, de forma semelhante aos generic methods. No entanto, compilers no Java SE 7 e posteriores podem inferir os actual type parameters da generic class que está sendo instanciada se você usar o diamond (`<>`). Considere o exemplo a seguir:

Neste exemplo, o compiler infere o tipo [`Integer`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Integer.html>) para o formal type parameter, `X`, da generic class `MyClass<X>`. Ele infere o tipo [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>) para o formal type parameter, `T`, do constructor desta generic class.

> Nota: É importante observar que o inference algorithm usa apenas invocation arguments, target types e, possivelmente, um expected return type óbvio para inferir tipos. O inference algorithm não usa resultados de etapas posteriores no programa.

## Target Types

O Java compiler aproveita o target typing para inferir os type parameters de uma generic method invocation. O target type de uma expression é o data type que o Java compiler espera, dependendo de onde a expression aparece. Considere o método [`Collections.emptyList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html#emptyList\(\)>), que é declarado da seguinte forma:

Considere a seguinte instrução de atribuição:

Esta instrução espera uma instância de `List<String>`; este data type é o target type. Como o método [`emptyList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html#emptyList\(\)>) retorna um valor do tipo `List<T>`, o compiler infere que o type argument `T` deve ser o valor [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>). Isso funciona tanto no Java SE 7 quanto no 8. Alternativamente, você poderia usar um type witness e especificar o valor de `T` da seguinte forma:

No entanto, isso não é necessário neste context. Foi necessário em outros contexts, no entanto. Considere o seguinte método:

Suponha que você queira invocar o método `processStringList()` com uma lista vazia. No Java SE 7, a seguinte instrução não compila:

O Java SE 7 compiler gera uma mensagem de erro semelhante à seguinte:

O compiler requer um valor para o type argument `T`, então ele começa com o valor [`Object`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Object.html>). Consequentemente, a invocação de [`Collections.emptyList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html#emptyList\(\)>) retorna um valor do tipo `List<Object>`, que é incompatível com o método `processStringList()`. Assim, no Java SE 7, você deve especificar o valor do type argument da seguinte forma:

Isso não é mais necessário no Java SE 8. A noção do que é um target type foi expandida para incluir method arguments, como o argumento para o método `processStringList()`. Neste caso, `processStringList()` requer um argumento do tipo `List<String>`. O método [`Collections.emptyList()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Collections.html#emptyList\(\)>) retorna um valor de `List<T>`, então, usando o target type de `List<String>`, o compiler infere que o type argument `T` tem um valor de [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>). Assim, no Java SE 8, a seguinte instrução compila:

## Target Typing em Lambda Expressions

Suponha que você tenha os seguintes métodos:

e

Você então escreve o seguinte código para chamar esses métodos:

e

Como você determina o tipo da lambda expression nestes casos?

Quando o Java runtime invoca o método `printPersons()`, ele espera um data type de `CheckPerson`, então a lambda expression é deste tipo. No entanto, quando o Java runtime invoca o método `printPersonsWithPredicate()`, ele espera um data type de [`Predicate<Person>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Predicate.html>), então a lambda expression é deste tipo. O data type que esses métodos esperam é chamado de target type. Para determinar o tipo de uma lambda expression, o Java compiler usa o target type do context ou situação em que a lambda expression foi encontrada. Segue-se que você só pode usar lambda expressions em situações em que o Java compiler pode determinar um target type:

*   Declarações de variáveis
*   Atribuições
*   Instruções de retorno
*   Inicializadores de array
*   Argumentos de método ou constructor
*   Corpos de lambda expression
*   Expressões condicionais, `?:`
*   Expressões de cast

## Target Types e Argumentos de Método

Para method arguments, o Java compiler determina o target type com duas outras características da linguagem: overload resolution e type argument inference.

Considere as duas functional interfaces a seguir ([`java.lang.Runnable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Runnable.html>) e [`java.util.concurrent.Callable<V>`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/Callable.html>):

O método [`Runnable.run()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Runnable.html#run\(\)>) não retorna um valor, enquanto [`Callable<V>.call()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/Callable.html#call\(\)>) retorna.

Suponha que você tenha sobrecarregado o método `invoke` da seguinte forma (consulte a seção [Definindo Métodos](<#/doc/tutorials/classes-objects/defining-methods>) para obter mais informações sobre overloading methods):

Qual método será invocado na seguinte instrução?

O método `invoke(Callable<T>)` será invocado porque esse método retorna um valor; o método `invoke(Runnable)` não. Neste caso, o tipo da lambda expression `() -> "done"` é `Callable<T>`.

### Neste tutorial

Inferência de Tipo e Métodos Genéricos Inferência de Tipo e Instanciação de Classes Genéricas Inferência de Tipo e Construtores Genéricos de Classes Genéricas e Não Genéricas Target Types Target Typing em Lambda Expressions Target Types e Argumentos de Método

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Introdução aos Generics](<#/doc/tutorials/generics/intro>)

➜

**Tutorial Atual**

Inferência de Tipo

➜

**Próximo na Série**

[Wildcards](<#/doc/tutorials/generics/wildcards>)

**Anterior na Série:** [Introdução aos Generics](<#/doc/tutorials/generics/intro>)

**Próximo na Série:** [Wildcards](<#/doc/tutorials/generics/wildcards>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Generics ](<#/doc/tutorials/generics>) > Inferência de Tipo