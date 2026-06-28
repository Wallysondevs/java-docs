# Definindo Métodos

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Classes e Objetos ](<#/doc/tutorials/classes-objects>) > Definindo Métodos

**Anterior na Série**

[Criando Classes](<#/doc/tutorials/classes-objects/creating-classes>)

➜

**Tutorial Atual**

Definindo Métodos

➜

**Próximo na Série**

[Fornecendo Construtores para suas Classes](<#/doc/tutorials/classes-objects/defining-constructors>)

**Anterior na Série:** [Criando Classes](<#/doc/tutorials/classes-objects/creating-classes>)

**Próximo na Série:** [Fornecendo Construtores para suas Classes](<#/doc/tutorials/classes-objects/defining-constructors>)

# Definindo Métodos

## Definindo um Método

Aqui está um exemplo de uma declaração de método típica:

```java
public double calculateAnswer(double input) {
    // some statements
}
```

Os únicos elementos obrigatórios de uma declaração de método são o tipo de retorno do método, o nome, um par de parênteses, `()`, e um corpo entre chaves, `{}`.

De forma mais geral, as declarações de método possuem seis componentes, em ordem:

1.  Modificadores—como `public`, `private`, e outros que você aprenderá mais tarde.
2.  O tipo de retorno—o tipo de dado do valor retornado pelo método, ou `void` se o método não retornar um valor.
3.  O nome do método—as regras para nomes de campos também se aplicam a nomes de métodos, mas a convenção é um pouco diferente.
4.  A lista de parâmetros entre parênteses—uma lista de parâmetros de entrada delimitada por vírgulas, precedida por seus tipos de dados, entre parênteses, `()`. Se não houver parâmetros, você deve usar parênteses vazios.
5.  Uma lista de exceções—a ser discutida mais tarde.
6.  O corpo do método, entre chaves—o código do método, incluindo a declaração de variáveis locais, vai aqui.

Modificadores, tipos de retorno e parâmetros serão discutidos mais tarde nesta seção. Exceções são discutidas em uma seção posterior.

> Definição: Dois dos componentes de uma declaração de método compõem a assinatura do método—o nome do método e os tipos de parâmetros.

A assinatura do método declarado acima é:

```java
calculateAnswer(double)
```

## Nomeando um Método

Embora um nome de método possa ser qualquer identificador legal, as convenções de código restringem os nomes de métodos. Por convenção, os nomes de métodos devem ser um verbo em minúsculas ou um nome composto que começa com um verbo em minúsculas, seguido por adjetivos, substantivos, etc. Em nomes compostos, a primeira letra de cada uma das palavras seguintes deve ser capitalizada. Aqui estão alguns exemplos:

```java
run
runFast
getBackground
getFinalData
compareTo
setX
isEmpty
```

Tipicamente, um método tem um nome único dentro de sua classe. No entanto, um método pode ter o mesmo nome que outros métodos devido ao _method overloading_.

## Overloading de Métodos

A linguagem de programação Java suporta o overloading de métodos, e Java pode distinguir entre métodos com diferentes assinaturas de método. Isso significa que métodos dentro de uma classe podem ter o mesmo nome se tiverem listas de parâmetros diferentes (existem algumas qualificações para isso que serão discutidas na seção intitulada [Herança](<#/doc/tutorials/numbers-strings/strings>)).

Suponha que você tenha uma classe que pode usar caligrafia para desenhar vários tipos de dados (strings, inteiros e assim por diante) e que contém um método para desenhar cada tipo de dado. É complicado usar um novo nome para cada método—por exemplo, `drawString()`, `drawInteger()`, `drawFloat()`, e assim por diante. Na linguagem de programação Java, você pode usar o mesmo nome para todos os métodos de desenho, mas passar uma lista de argumentos diferente para cada método. Assim, a classe de desenho de dados pode declarar quatro métodos chamados `draw()`, cada um com uma lista de parâmetros diferente.

```java
public class DataArtist {
    ...
    public void draw(String s) {
        // ...
    }
    public void draw(int i) {
        // ...
    }
    public void draw(double f) {
        // ...
    }
    public void draw(int i, double f) {
        // ...
    }
}
```

Métodos overloaded são diferenciados pelo número e pelo tipo dos argumentos passados para o método. No exemplo de código, `draw(String s)` e `draw(int i)` são métodos distintos e únicos porque exigem tipos de argumentos diferentes.

Você não pode declarar mais de um método com o mesmo nome e o mesmo número e tipo de argumentos, porque o compilador não consegue distingui-los.

O compilador não considera o tipo de retorno ao diferenciar métodos, então você não pode declarar dois métodos com a mesma assinatura mesmo que eles tenham um tipo de retorno diferente.

> Nota: Métodos overloaded devem ser usados com moderação, pois podem tornar o código muito menos legível.

### Neste tutorial

Definindo um Método Nomeando um Método Overloading de Métodos

Última atualização: 5 de janeiro de 2024

**Anterior na Série**

[Criando Classes](<#/doc/tutorials/classes-objects/creating-classes>)

➜

**Tutorial Atual**

Definindo Métodos

➜

**Próximo na Série**

[Fornecendo Construtores para suas Classes](<#/doc/tutorials/classes-objects/defining-constructors>)

**Anterior na Série:** [Criando Classes](<#/doc/tutorials/classes-objects/creating-classes>)

**Próximo na Série:** [Fornecendo Construtores para suas Classes](<#/doc/tutorials/classes-objects/defining-constructors>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Classes e Objetos ](<#/doc/tutorials/classes-objects>) > Definindo Métodos