# Convertendo Iteração com transformação

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Refatorando do Estilo Imperativo para o Funcional ](<#/doc/tutorials/refactoring-to-functional-style>) > Convertendo Iteração com transformação

**Anterior na Série**

[Convertendo foreach com if](<#/doc/tutorials/refactoring-to-functional-style/foreachwithif>)

➜

**Tutorial Atual**

Convertendo Iteração com transformação

➜

**Próximo na Série**

[Convertendo Fontes de Dados para Streams](<#/doc/tutorials/refactoring-to-functional-style/convertingtostreams>)

**Anterior na Série:** [Convertendo foreach com if](<#/doc/tutorials/refactoring-to-functional-style/foreachwithif>)

**Próximo na Série:** [Convertendo Fontes de Dados para Streams](<#/doc/tutorials/refactoring-to-functional-style/convertingtostreams>)

# Convertendo Iteração com transformação

Esta página foi contribuída por [Venkat Subramaniam](</author/VenkatSubramaniam>) sob a [UPL](<https://oss.oracle.com/licenses/upl/>)

## Transformando durante a Iteração

Nos artigos anteriores desta [série de tutoriais](<#/doc/tutorials/refactoring-to-functional-style>), vimos como converter laços com `if` ou declarações condicionais do estilo imperativo para o estilo funcional. Neste artigo, veremos como converter uma iteração de estilo imperativo que transforma dados para o estilo funcional. Além disso, também refatoraremos o código que mistura a transformação de dados com o código que seleciona elementos antes da transformação.

Sempre que estivermos transformando dados em um laço de estilo imperativo, podemos usar a função `map()` no estilo funcional. Vejamos como.

## Do Estilo Imperativo para o Funcional

Aqui está um exemplo de uma iteração, usando o `foreach`, que transforma para maiúsculas uma coleção de nomes:

```java
import java.util.List;

public class IterationTransformation {
  public static void main(String[] args) {
    List<String> names = List.of("Dory", "Gill", "Bruce", "Nemo", "Darla", "Marlin", "Jacques");

    for(String name : names) {
      System.out.println(name.toUpperCase());
    }
  }
}
```

A cada passo da iteração, a variável `name` é vinculada a um novo valor. À medida que a iteração avança de um elemento para o próximo na coleção fornecida, cada nome é transformado para maiúsculas usando a função `toUpperCase()` e o valor resultante é impresso. Já vimos, no artigo anterior, como converter o `foreach` de estilo imperativo para o estilo funcional — usando a iteração interna `stream()`. Se aplicarmos apenas o que vimos antes, o código de estilo funcional resultante seria bastante desajeitado, com a lambda passada para `forEach` realizando tanto a transformação quanto a impressão, assim:

```java
import java.util.List;

public class IterationTransformation {
  public static void main(String[] args) {
    List<String> names = List.of("Dory", "Gill", "Bruce", "Nemo", "Darla", "Marlin", "Jacques");

    names.stream()
      .forEach(name -> System.out.println(name.toUpperCase()));
  }
}
```

Embora o código de estilo funcional acima produza os mesmos resultados que o código de estilo imperativo, a lambda passada para a função `forEach()` não é coesa, é difícil de ler e difícil de mudar.

Antes de refatorar o código de estilo imperativo acima para o estilo funcional, devemos primeiro refatorar o estilo imperativo para outra implementação de estilo imperativo para tornar cada linha mais coesa, assim:

```java
import java.util.List;

public class IterationTransformation {
  public static void main(String[] args) {
    List<String> names = List.of("Dory", "Gill", "Bruce", "Nemo", "Darla", "Marlin", "Jacques");

    for(String name : names) {
      String transformedName = name.toUpperCase();
      System.out.println(transformedName);
    }
  }
}
```

Dos artigos anteriores desta série, sabemos que o `for` pode se transformar em um `stream()` e a impressão do valor pode ser feita de dentro do `forEach()`. Isso nos deixa com a transformação, a chamada para a função `toUpperCase()`. Tais transformações podem ser feitas usando a operação `map()` no `stream()`.

```java
import java.util.List;

public class IterationTransformation {
  public static void main(String[] args) {
    List<String> names = List.of("Dory", "Gill", "Bruce", "Nemo", "Darla", "Marlin", "Jacques");

    names.stream()
      .map(name -> name.toUpperCase())
      .forEach(transformedName -> System.out.println(transformedName));
  }
}
```

A operação `map()` transforma os dados para um valor diferente com base na função invocada de dentro da expressão lambda que é passada para `map()`. Neste exemplo, cada nome é transformado para seu valor em maiúsculas. O valor transformado é então impresso de dentro da expressão lambda passada para `forEach()`.

Podemos tornar o código um pouco mais conciso usando referências de método em vez de expressões lambda, assim:

```java
import java.util.List;

public class IterationTransformation {
  public static void main(String[] args) {
    List<String> names = List.of("Dory", "Gill", "Bruce", "Nemo", "Darla", "Marlin", "Jacques");

    names.stream()
      .map(String::toUpperCase)
      .forEach(System.out::println);
  }
}
```

Use a função `map()` para transformar dados enquanto itera sobre uma coleção de dados.

## Selecionando Elementos para Transformar

Suponha que, no meio da iteração, queremos selecionar alguns valores da coleção com base em alguma condição e aplicar uma transformação apenas nesses elementos. Por exemplo, e se quisermos transformar e imprimir apenas nomes com comprimento 4? No estilo imperativo, poderíamos fazer o seguinte:

```java
import java.util.List;

public class IterationTransformation {
  public static void main(String[] args) {
    List<String> names = List.of("Dory", "Gill", "Bruce", "Nemo", "Darla", "Marlin", "Jacques");

    for(String name : names) {
      if(name.length() == 4) {
        System.out.println(name.toUpperCase());
      }
    }
  }
}
```

Já sabemos que o `if` de estilo imperativo pode ser refatorado para a função `filter()` no estilo funcional. Podemos realizar a transformação, usando `map()`, após a operação `filter()`, assim:

```java
import java.util.List;

public class IterationTransformation {
  public static void main(String[] args) {
    List<String> names = List.of("Dory", "Gill", "Bruce", "Nemo", "Darla", "Marlin", "Jacques");

    names.stream()
      .filter(name -> name.length() == 4)
      .map(String::toUpperCase)
      .forEach(System.out::println);
  }
}
```

A função `filter()` descarta dados que não são desejados e passa apenas os valores que queremos usar. A função `map()` transforma os valores que ela vê após o filtro.

## Mapeamentos

Onde quer que você veja a transformação de dados dentro de um laço `for`, use a função `map()` para realizar a transformação no estilo funcional. Além disso, se o corpo do laço tiver uma declaração `if` para selecionar algum valor para transformação, então use a API `stream()` com a chamada para o método `filter()` antes de usar o método `map()`.

### Neste tutorial

Transformando durante a Iteração Do Estilo Imperativo para o Funcional Selecionando Elementos para Transformar Mapeamentos

Última atualização: 8 de janeiro de 2024

**Anterior na Série**

[Convertendo foreach com if](<#/doc/tutorials/refactoring-to-functional-style/foreachwithif>)

➜

**Tutorial Atual**

Convertendo Iteração com transformação

➜

**Próximo na Série**

[Convertendo Fontes de Dados para Streams](<#/doc/tutorials/refactoring-to-functional-style/convertingtostreams>)

**Anterior na Série:** [Convertendo foreach com if](<#/doc/tutorials/refactoring-to-functional-style/foreachwithif>)

**Próximo na Série:** [Convertendo Fontes de Dados para Streams](<#/doc/tutorials/refactoring-to-functional-style/convertingtostreams>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Refatorando do Estilo Imperativo para o Funcional ](<#/doc/tutorials/refactoring-to-functional-style>) > Convertendo Iteração com transformação