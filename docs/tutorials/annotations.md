# Anotações

[Home](<#/>) > [Tutorials](<#/doc/tutorials/learn>) > Anotações

# Anotações

## Anotações

Anotações têm diversos usos, entre eles:

*   Informações para o compilador — Anotações podem ser usadas pelo compilador para detectar erros ou suprimir avisos.
*   Processamento em tempo de compilação e implantação — Ferramentas de software podem processar informações de anotação para gerar código, arquivos XML, e assim por diante.
*   Processamento em tempo de execução — Algumas anotações estão disponíveis para serem examinadas em tempo de execução.

Esta seção explica onde as anotações podem ser usadas, como aplicá-las, quais tipos de anotação predefinidos estão disponíveis na Java Platform, Standard Edition (Java SE API), como as anotações de tipo podem ser usadas em conjunto com sistemas de tipo plugáveis para escrever código com verificação de tipo mais forte, e como implementar anotações repetíveis.

## O Formato de uma Anotação

Em sua forma mais simples, uma anotação se parece com o seguinte:

O caractere arroba (`@`) indica ao compilador que o que se segue é uma anotação. No exemplo a seguir, o nome da anotação é [`Override`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Override.html>):

```java
@Override
void mySuperMethod() { }
```

A anotação pode incluir _elementos_, que podem ser nomeados ou não nomeados, e há valores para esses elementos:

```java
@Author(
   name = "Jane Doe",
   date = "7/12/2012"
)
class MyClass() { }
```

ou

```java
@SuppressWarnings(value = "unchecked")
void myMethod() { }
```

Se houver apenas um elemento chamado `value`, então o nome pode ser omitido, como em:

```java
@SuppressWarnings("unchecked")
void myMethod() { }
```

Se a anotação não tiver elementos, então os parênteses podem ser omitidos, como mostrado no exemplo anterior de [`@Override`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Override.html>).

Também é possível usar múltiplas anotações na mesma declaração:

```java
@Author(name = "Jane Doe")
@Ebook(name = "My Book")
class MyClass() { }
```

Se as anotações tiverem o mesmo tipo, isso é chamado de anotação repetível:

```java
@Schedule(dayOfMonth="last")
@Schedule(dayOfWeek="Fri", time="23:00")
public void doPeriodicCleanup() { }
```

Anotações repetíveis são suportadas a partir do lançamento do Java SE 8. Para mais informações, consulte a seção Anotações Repetíveis.

O tipo de anotação pode ser um dos tipos definidos nos pacotes [`java.lang`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/package-summary.html>) ou [`java.lang.annotations`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/package-summary.html>) da Java SE API. Nos exemplos anteriores, [`Override`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Override.html>) e [`SuppressWarnings`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/SuppressWarnings.html>) são anotações Java predefinidas. Também é possível definir seu próprio tipo de anotação. As anotações `Author` e `Ebook` no exemplo anterior são tipos de anotação personalizados.

## Onde as Anotações Podem Ser Usadas

Anotações podem ser aplicadas a declarações: declarações de classes, campos, métodos e outros elementos de programa. Quando usadas em uma declaração, cada anotação geralmente aparece, por convenção, em sua própria linha.

A partir do lançamento do Java SE 8, as anotações também podem ser aplicadas ao uso de tipos. Aqui estão alguns exemplos:

*   Expressão de criação de instância de classe:

    ```java
    new @Interned MyObject();
    ```

*   Type cast:

    ```java
    myString = (@NonNull String) str;
    ```

*   Cláusula implements:

    ```java
    class MyClass implements @ReadOnly Comparable<String> { }
    ```

*   Declaração de exceção lançada:

    ```java
    void monitorTemperature() throws @Critical TemperatureException { }
    ```

Esta forma de anotação é chamada de _anotação de tipo_.

## Declarando um Tipo de Anotação

Muitas anotações substituem comentários no código.

Suponha que um grupo de software tradicionalmente inicia o corpo de cada classe com comentários fornecendo informações importantes:

```java
/***********************************************************************
 * @author Jane Doe
 * @version 1.0
 * @since 7/12/2012
 ***********************************************************************/
class MyClass() { }
```

Para adicionar esses mesmos metadados com uma anotação, você deve primeiro definir o tipo de anotação. A sintaxe para fazer isso é:

```java
@interface ClassPreamble {
   String author();
   String date();
   int currentRevision() default 1;
   String lastModified() default "N/A";
   String lastModifiedBy() default "N/A";
   // Note: Array types are not currently supported
   String[] reviewers();
}
```

A definição do tipo de anotação se parece com uma definição de interface onde a palavra-chave interface é precedida pelo caractere arroba (`@`) (`@` = AT, como em tipo de anotação). Tipos de anotação são uma forma de interface, que será abordada em uma seção posterior. Por enquanto, você não precisa entender interfaces.

O corpo da definição de anotação anterior contém declarações de elementos de tipo de anotação, que se parecem muito com métodos. Observe que eles podem definir valores padrão opcionais.

Depois que o tipo de anotação é definido, você pode usar anotações desse tipo, com os valores preenchidos, assim:

```java
@ClassPreamble (
   author = "Jane Doe",
   date = "7/12/2012",
   currentRevision = 6,
   lastModified = "4/12/2014",
   lastModifiedBy = "John Doe",
   reviewers = {"John Doe", "Mary Doe", "Tom Smith"}
)
class MyClass() { }
```

> Nota: Para fazer com que as informações em `@ClassPreamble` apareçam na documentação gerada pelo Javadoc, você deve anotar a definição de `@ClassPreamble` com a anotação [`@Documented`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/Documented.html>):

```java
@Documented
@interface ClassPreamble {
   // ...
}
```

## Tipos de Anotação Predefinidos

Um conjunto de tipos de anotação é predefinido na Java SE API. Alguns tipos de anotação são usados pelo compilador Java, e alguns se aplicam a outras anotações.

### Tipos de Anotação Usados pela Linguagem Java

Os tipos de anotação predefinidos definidos em java.lang são [`@Deprecated`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Deprecated.html>), [`@Override`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Override.html>) e [`@SuppressWarnings`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/SuppressWarnings.html>).

#### @Deprecated

A anotação [`@Deprecated`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Deprecated.html>) indica que o elemento marcado está obsoleto e não deve mais ser usado. O compilador gera um aviso sempre que um programa usa um método, classe ou campo com a anotação [`@Deprecated`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Deprecated.html>). Quando um elemento está obsoleto, ele também deve ser documentado usando a tag Javadoc `@deprecated`, como mostrado no exemplo a seguir. O uso do caractere arroba (`@`) tanto em comentários Javadoc quanto em anotações não é coincidência: eles estão conceitualmente relacionados. Além disso, observe que a tag Javadoc começa com um `d` minúsculo e a anotação começa com um `D` maiúsculo.

```java
// Javadoc comment:
/**
 * @deprecated
 * explanation of why it was deprecated
 */
@Deprecated
static void deprecatedMethod() { }
```

Observe que, a partir do Java SE 9, um atributo [`forRemoval`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Deprecated.html#forRemoval\(\)>) foi adicionado à anotação [`@Deprecated`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Deprecated.html>). Ele indica se o elemento anotado está sujeito a remoção em uma versão futura. O valor padrão é `false`.

#### @Override

A anotação [`@Override`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Override.html>) informa ao compilador que o elemento se destina a sobrescrever um elemento declarado em uma superclasse. Métodos de sobrescrita são discutidos na seção [Sobrescrevendo e Ocultando Métodos](<#/doc/tutorials/inheritance/overriding>).

Embora não seja obrigatório usar esta anotação ao sobrescrever um método, ela ajuda a prevenir erros. Se um método marcado com [`@Override`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Override.html>) falhar em sobrescrever corretamente um método em uma de suas superclasses, o compilador gera um erro.

#### @SuppressWarnings

A anotação [`@SuppressWarnings`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/SuppressWarnings.html>) instrui o compilador a suprimir avisos específicos que ele geraria de outra forma. No exemplo a seguir, um método obsoleto é usado, e o compilador geralmente gera um aviso. Neste caso, no entanto, a anotação faz com que o aviso seja suprimido.

```java
// Use of a deprecated method.
// This will not generate a warning because the @SuppressWarnings is used.
@SuppressWarnings("deprecation")
void useDeprecatedMethod() {
    // Deprecated method
    MyClass.deprecatedMethod();
}
```

Cada aviso do compilador pertence a uma categoria. A Especificação da Linguagem Java lista quatro categorias:

1.  Avisos não verificados são especificados pela string `unchecked`.
2.  Avisos de obsolescência são especificados pela string `deprecation`.
3.  Avisos de remoção são especificados pela string `removal`.
4.  Avisos de pré-visualização são especificados pela string `preview`.

O aviso `unchecked` pode ocorrer ao interagir com código legado escrito antes do advento dos generics. Para suprimir múltiplas categorias de avisos, use a seguinte sintaxe:

```java
@SuppressWarnings({"unchecked", "deprecation"})
void useDeprecatedMethod() {
    // Deprecated method
    MyClass.deprecatedMethod();
}
```

#### @SafeVarargs

A anotação [`@SafeVarargs`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/SafeVarargs.html>), quando aplicada a um método ou construtor, afirma que o código não realiza operações potencialmente inseguras em seu parâmetro varargs. Quando este tipo de anotação é usado, avisos não verificados relacionados ao uso de varargs são suprimidos.

#### @FunctionalInterface

A anotação [`@FunctionalInterface`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/FunctionalInterface.html>), introduzida no Java SE 8, indica que a declaração de tipo se destina a ser uma interface funcional, conforme definido pela Especificação da Linguagem Java.

### Anotações que se Aplicam a Outras Anotações

Anotações que se aplicam a outras anotações são chamadas de meta-anotações. Existem vários tipos de meta-anotação definidos em [`java.lang.annotation`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/package-summary.html>).

#### @Retention

A anotação [`@Retention`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/Retention.html>) especifica como a anotação marcada é armazenada:

*   [`RetentionPolicy.SOURCE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/RetentionPolicy.html#SOURCE>) – A anotação marcada é retida apenas no nível do código-fonte e é ignorada pelo compilador.
*   [`RetentionPolicy.CLASS`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/RetentionPolicy.html#CLASS>) – A anotação marcada é retida pelo compilador em tempo de compilação, mas é ignorada pela Java Virtual Machine (JVM).
*   [`RetentionPolicy.RUNTIME`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/RetentionPolicy.html#RUNTIME>) – A anotação marcada é retida pela JVM para que possa ser usada pelo ambiente de tempo de execução.

#### @Documented

A anotação [`@Documented`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/Documented.html>) indica que sempre que a anotação especificada for usada, esses elementos devem ser documentados usando a ferramenta Javadoc. (Por padrão, as anotações não são incluídas no Javadoc.) Para mais informações, consulte a página de ferramentas Javadoc.

#### @Target

A anotação [`@Target`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/Target.html>) marca outra anotação para restringir a que tipo de elementos Java a anotação pode ser aplicada. Uma anotação target especifica um dos seguintes tipos de elemento como seu valor:

*   [`ElementType.ANNOTATION_TYPE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/ElementType.html#ANNOTATION_TYPE>) pode ser aplicada a um tipo de anotação.
*   [`ElementType.CONSTRUCTOR`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/ElementType.html#CONSTRUCTOR>) pode ser aplicada a um construtor.
*   [`ElementType.FIELD`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/ElementType.html#FIELD>) pode ser aplicada a um campo ou propriedade.
*   [`ElementType.LOCAL_VARIABLE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/ElementType.html#LOCAL_VARIABLE>) pode ser aplicada a uma variável local.
*   [`ElementType.METHOD`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/ElementType.html#METHOD>) pode ser aplicada a uma anotação de nível de método.
*   [`ElementType.MODULE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/ElementType.html#MODULE>) pode ser aplicada a uma declaração de módulo.
*   [`ElementType.PACKAGE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/ElementType.html#PACKAGE>) pode ser aplicada a uma declaração de pacote.
*   [`ElementType.PARAMETER`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/ElementType.html#PARAMETER>) pode ser aplicada aos parâmetros de um método.
*   [`ElementType.RECORD_COMPONENT`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/ElementType.html#RECORD_COMPONENT>) pode ser aplicada ao componente de um record.
*   [`ElementType.TYPE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/ElementType.html#TYPE>) pode ser aplicada à declaração de uma classe, uma classe abstrata, uma interface, uma interface de anotação, uma enumeração ou uma declaração de record.
*   [`ElementType.TYPE_PARAMETER`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/ElementType.html#TYPE_PARAMETER>) pode ser aplicada aos parâmetros de um tipo.
*   [`ElementType.TYPE_USE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/ElementType.html#TYPE_USE>) pode ser aplicada onde um tipo é usado, por exemplo, na declaração de um campo.

#### @Inherited

A anotação [`@Inherited`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/Inherited.html>) indica que o tipo de anotação pode ser herdado da superclasse. (Isso não é verdade por padrão.) Quando o usuário consulta o tipo de anotação e a classe não possui anotação para este tipo, a superclasse da classe é consultada para o tipo de anotação. Esta anotação se aplica apenas a declarações de classe.

#### @Repeatable

A anotação [`@Repeatable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/Repeatable.html>), introduzida no Java SE 8, indica que a anotação marcada pode ser aplicada mais de uma vez à mesma declaração ou uso de tipo. Para mais informações, consulte a seção Anotações Repetíveis.

## Anotações de Tipo e Sistemas de Tipo Plugáveis

Antes do lançamento do Java SE 8, as anotações só podiam ser aplicadas a declarações. A partir do lançamento do Java SE 8, as anotações também podem ser aplicadas a qualquer uso de tipo. Isso significa que as anotações podem ser usadas em qualquer lugar onde você usa um tipo. Alguns exemplos de onde os tipos são usados são expressões de criação de instância de classe (`new`), casts, cláusulas implements e cláusulas throws. Esta forma de anotação é chamada de anotação de tipo e vários exemplos são fornecidos na seção [Onde as Anotações Podem Ser Usadas](<#/doc/tutorials/annotations>).

As anotações de tipo foram criadas para suportar uma análise aprimorada de programas Java, garantindo uma verificação de tipo mais forte. O lançamento do Java SE 8 não fornece uma estrutura de verificação de tipo, mas permite que você escreva (ou baixe) uma estrutura de verificação de tipo que é implementada como um ou mais módulos plugáveis que são usados em conjunto com o compilador Java.

Por exemplo, você deseja garantir que uma variável específica em seu programa nunca seja atribuída a null; você deseja evitar o acionamento de uma [`NullPointerException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NullPointerException.html>). Você pode escrever um plug-in personalizado para verificar isso. Você então modificaria seu código para anotar essa variável específica, indicando que ela nunca é atribuída a null. A declaração da variável pode ser assim:

```java
@NonNull String str;
```

Quando você compila o código, incluindo o módulo `NonNull` na linha de comando, o compilador imprime um aviso se detectar um problema potencial, permitindo que você modifique o código para evitar o erro. Depois de corrigir o código para remover todos os avisos, este erro específico não ocorrerá quando o programa for executado.

Você pode usar múltiplos módulos de verificação de tipo, onde cada módulo verifica um tipo diferente de erro. Dessa forma, você pode construir sobre o sistema de tipos Java, adicionando verificações específicas quando e onde desejar.

Com o uso criterioso de anotações de tipo e a presença de verificadores de tipo plugáveis, você pode escrever um código mais robusto e menos propenso a erros.

Em muitos casos, você não precisa escrever seus próprios módulos de verificação de tipo. Existem terceiros que fizeram o trabalho para você. Por exemplo, você pode querer aproveitar o Checker Framework criado pela Universidade de Washington. Este framework inclui um módulo `NonNull`, bem como um módulo de expressão regular e um módulo de bloqueio de mutex. Para mais informações, consulte o [Checker Framework](<http://types.cs.washington.edu/checker-framework/>).

## Anotações Repetíveis

Existem algumas situações em que você deseja aplicar a mesma anotação a uma declaração ou uso de tipo. A partir do lançamento do Java SE 8, as anotações repetíveis permitem que você faça isso.

Por exemplo, você está escrevendo código para usar um serviço de temporizador que permite executar um método em um determinado horário ou em uma certa programação, semelhante ao serviço cron do UNIX. Agora você deseja configurar um temporizador para executar um método, `doPeriodicCleanup()`, no último dia do mês e toda sexta-feira às 23:00. Para configurar o temporizador para executar, crie uma anotação `@Schedule` e aplique-a duas vezes ao método `doPeriodicCleanup()`. O primeiro uso especifica o último dia do mês e o segundo especifica sexta-feira às 23:00, como mostrado no exemplo de código a seguir:

```java
@Schedule(dayOfMonth="last")
@Schedule(dayOfWeek="Fri", time="23:00")
public void doPeriodicCleanup() { ... }
```

O exemplo anterior aplica uma anotação a um método. Você pode repetir uma anotação em qualquer lugar onde usaria uma anotação padrão. Por exemplo, você tem uma classe para lidar com exceções de acesso não autorizado. Você anota a classe com uma anotação `@Alert` para gerentes e outra para administradores:

```java
@Alert(role="Manager")
@Alert(role="Administrator")
public class UnauthorizedAccessException extends Exception { ... }
```

Por razões de compatibilidade, as anotações repetíveis são armazenadas em uma anotação contêiner que é gerada automaticamente pelo compilador Java. Para que o compilador faça isso, duas declarações são necessárias em seu código.

### Passo 1: Declarar um Tipo de Anotação Repetível

O tipo de anotação deve ser marcado com a meta-anotação [`@Repeatable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/Repeatable.html>). O exemplo a seguir define um tipo de anotação repetível `@Schedule` personalizado:

```java
@Repeatable(Schedules.class)
public @interface Schedule {
  String dayOfMonth() default "first";
  String dayOfWeek() default "Mon";
  String time() default "12:00";
}
```

O valor da meta-anotação [`@Repeatable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/Repeatable.html>), entre parênteses, é o tipo da anotação contêiner que o compilador Java gera para armazenar anotações repetíveis. Neste exemplo, o tipo de anotação contêiner é `@Schedules`, então as anotações `@Schedule` repetíveis são armazenadas em uma anotação `@Schedules`.

Aplicar a mesma anotação a uma declaração sem primeiro declará-la como repetível resulta em um erro em tempo de compilação.

### Passo 2: Declarar o Tipo de Anotação Contêiner

O tipo de anotação contêiner deve ter um elemento `value` com um tipo de array. O tipo de componente do tipo de array deve ser o tipo de anotação repetível. A declaração para o tipo de anotação contêiner `@Schedules` é a seguinte:

```java
public @interface Schedules {
    Schedule[] value();
}
```

### Recuperando Anotações

Existem vários métodos disponíveis na Reflection API que podem ser usados para recuperar anotações. O comportamento dos métodos que retornam uma única anotação, como [`AnnotatedElement.getAnnotation(Class)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AnnotatedElement.html#getAnnotation\(java.lang.Class\)>), permanece inalterado, pois eles retornam apenas uma única anotação se uma anotação do tipo solicitado estiver presente. Se mais de uma anotação do tipo solicitado estiver presente, você pode obtê-las primeiro obtendo sua anotação contêiner. Dessa forma, o código legado continua funcionando. Outros métodos foram introduzidos no Java SE 8 que varrem a anotação contêiner para retornar múltiplas anotações de uma vez, como [`AnnotatedElement.getAnnotationsByType(Class)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AnnotatedElement.html#getAnnotationsByType\(java.lang.Class\)>). Consulte a especificação da classe [`AnnotatedElement`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/AnnotatedElement.html>) para obter informações sobre todos os métodos disponíveis.

### Considerações de Design

Ao projetar um tipo de anotação, você deve considerar a cardinalidade das anotações desse tipo. Agora é possível usar uma anotação zero vezes, uma vez ou, se o tipo da anotação for marcado como [`@Repeatable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/Repeatable.html>), mais de uma vez. Também é possível restringir onde um tipo de anotação pode ser usado, utilizando a meta-anotação [`@Target`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/annotation/Target.html>). Por exemplo, você pode criar um tipo de anotação repetível que só pode ser usado em métodos e campos. É importante projetar seu tipo de anotação cuidadosamente para garantir que o programador que a utiliza a considere o mais flexível e poderosa possível.

### Neste tutorial

Anotações O Formato de uma Anotação Onde as Anotações Podem Ser Usadas Declarando um Tipo de Anotação Tipos de Anotação Predefinidos Anotações de Tipo e Sistemas de Tipo Plugáveis Anotações Repetíveis

Última atualização: 14 de setembro de 2021

[Home](<#/>) > [Tutorials](<#/doc/tutorials/learn>) > Anotações

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)