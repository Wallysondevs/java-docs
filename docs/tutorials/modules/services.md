# Desacoplando Módulos com Serviços

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > Desacoplando Módulos com Serviços

**Anterior na Série**

[exports e opens qualificados](<#/doc/tutorials/modules/qualified-exports-opens>)

➜

**Tutorial Atual**

Desacoplando Módulos com Serviços

➜

**Próximo na Série**

[Código no Class Path - o Módulo Sem Nome](<#/doc/tutorials/modules/unnamed-module>)

**Anterior na Série:** [exports e opens qualificados](<#/doc/tutorials/modules/qualified-exports-opens>)

**Próximo na Série:** [Código no Class Path - o Módulo Sem Nome](<#/doc/tutorials/modules/unnamed-module>)

# Desacoplando Módulos com Serviços

Em Java, é comum modelar APIs como interfaces (ou, às vezes, classes abstratas) e então escolher a melhor implementação dadas as circunstâncias. Idealmente, o consumidor da API é completamente desacoplado das implementações, o que significa que não há dependência direta entre eles. A API Service Loader do Java permite aplicar essa abordagem a JARs (modulares ou não) e o sistema de módulos a integra como um conceito de primeira classe com as diretivas `uses` e `provides` na declaração do módulo.

**Nota** : Você precisa conhecer [os fundamentos do sistema de módulos](<#/doc/tutorials/modules/intro>) para aproveitar ao máximo este artigo.

## Serviços no Sistema de Módulos Java

### Exemplificando o Problema

Vamos começar com um exemplo que usa estes três tipos em três módulos:

  * classe `Main` em _com.example.app_
  * interface `Service` em _com.example.api_
  * classe `Implementation` (implementa `Service`) em _com.example.impl_

`Main` quer usar `Service`, mas precisa criar `Implementation` para obter uma instância:

```java
// com.example.app/com/example/app/Main.java
package com.example.app;

import com.example.api.Service;
import com.example.impl.Implementation;

public class Main {
  public static void main(String[] args) {
    Service service = new Implementation();
    System.out.println(service.getClass().getName());
  }
}
```

Isso leva às seguintes declarações de módulo:

```java
// com.example.app/module-info.java
module com.example.app {
  requires com.example.api;
  requires com.example.impl;
}
```

```java
// com.example.api/module-info.java
module com.example.api {
  exports com.example.api;
}
```

```java
// com.example.impl/module-info.java
module com.example.impl {
  requires com.example.api;
  exports com.example.impl;
}
```

Como você pode ver, o desafio de usar interfaces para desacoplar o usuário e o provedor de uma API é que, em algum momento, uma implementação específica precisa ser instanciada. Se isso acontecer como uma chamada de construtor regular (como em `Main`), cria uma dependência da implementação e, portanto, uma dependência entre os dois módulos. É isso que os serviços resolvem.

### Padrão Service Locator como Solução

Java resolve esse problema implementando o [padrão Service Locator](<https://en.wikipedia.org/wiki/Service_locator_pattern>) com a classe [`ServiceLoader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ServiceLoader.html>) atuando como o registro central. Veja como funciona.

Um serviço é um tipo acessível (não precisa ser uma interface; classes abstratas e até mesmo concretas também funcionam) que um módulo deseja usar e outro módulo fornece uma instância:

  * O módulo _consumindo_ o serviço deve expressar seu requisito com uma diretiva `uses $SERVICE` em seu descritor de módulo, onde `$SERVICE` é o nome totalmente qualificado do tipo de serviço.
  * O módulo _fornecendo_ o serviço deve expressar sua oferta com uma diretiva `provides $SERVICE with $PROVIDER`, onde `$SERVICE` é o mesmo tipo da diretiva `uses` e `$PROVIDER` o nome totalmente qualificado de outra classe, que é...
    * _ou_ uma classe concreta que `extends` ou `implements $SERVICE` e possui um construtor `public` e sem parâmetros (chamado de _construtor de provedor_)
    * _ou_ um tipo arbitrário com um método `public`, `static` e sem parâmetros `provide` que retorna um tipo que `extends` ou `implements $SERVICE` (chamado de _método de provedor_)

Em tempo de execução, o módulo dependente pode usar a classe `ServiceLoader` para obter todas as implementações fornecidas de um serviço chamando `ServiceLoader.load($SERVICE.class)`. O sistema de módulos então retornará um `ServiceLoader<$SERVICE>` que você pode usar de várias maneiras para obter acesso aos provedores de serviço. O Javadoc de [`ServiceLoader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/ServiceLoader.html>) detalha isso (e, de fato, tudo o mais relacionado a serviços).

### Exemplificando a Solução

Veja como as três classes e módulos que examinamos anteriormente podem usar serviços. Começamos com as declarações de módulo:

```java
// com.example.app/module-info.java
module com.example.app {
  requires com.example.api;
  uses com.example.api.Service;
}
```

```java
// com.example.api/module-info.java
module com.example.api {
  exports com.example.api;
}
```

```java
// com.example.impl/module-info.java
module com.example.impl {
  requires com.example.api;
  provides com.example.api.Service with com.example.impl.Implementation;
}
```

Observe que _com.example.app_ não requer mais _com.example.impl_. Em vez disso, ele declara que usa `Service` e _com.example.impl_ declara que o fornece com `Implementation`. Além disso, _com.example.impl_ não exporta mais o pacote `com.example.impl`. O service loader não exige que a implementação do serviço seja acessível fora do módulo e, se nenhuma outra classe nesse pacote precisar ser, podemos parar de exportá-lo. Este é um bônus adicional dos serviços, pois pode reduzir a superfície da API de um módulo.

Veja como `Main` pode obter uma implementação de `Service`:

```java
// com.example.app/com/example/app/Main.java
package com.example.app;

import com.example.api.Service;
import java.util.ServiceLoader;

public class Main {
  public static void main(String[] args) {
    ServiceLoader<Service> serviceLoader = ServiceLoader.load(Service.class);
    for (Service service : serviceLoader) {
      System.out.println(service.getClass().getName());
    }
  }
}
```

### Alguns Serviços do JDK

O próprio JDK também usa serviços. Por exemplo, o módulo _java.sql_, que contém a API JDBC, usa `java.sql.Driver` como um serviço:

```java
// java.sql/module-info.java
module java.sql {
  exports java.sql;
  exports javax.sql;
  exports javax.transaction.xa;

  uses java.sql.Driver;
}
```

Isso também demonstra que um módulo pode usar um de seus próprios tipos como um serviço.

Outro uso exemplar de serviços no JDK é `java.lang.System.LoggerFinder`. Isso faz parte de uma API que permite aos usuários direcionar as mensagens de log do JDK (não as do runtime!) para o framework de logging de sua escolha (por exemplo, Log4J ou Logback). Simplificando, em vez de escrever para a saída padrão, o JDK usa um `LoggerFinder` para criar instâncias de `Logger` e então registra todas as mensagens com elas. E como ele usa `LoggerFinder` como um serviço, os frameworks de logging podem fornecer implementações dele.

## Serviços Durante a Resolução de Módulos

Se você já iniciou uma aplicação modular simples com a opção de linha de comando `--show-module-resolution` e observou o que exatamente o sistema de módulos está fazendo, pode ter se surpreendido com o número de módulos de plataforma que são resolvidos. Com uma aplicação simples o suficiente, os únicos módulos de plataforma deveriam ser _java.base_ e talvez mais um ou dois, então por que há tantos outros? Serviços são a resposta.

Lembre-se de [os fundamentos do sistema de módulos](<#/doc/tutorials/modules/intro>) que apenas os módulos que entram no grafo durante a resolução de módulos estão disponíveis em tempo de execução. Para garantir que isso aconteça para todos os provedores de um serviço, o processo de resolução leva em consideração as diretivas `uses` e `provides`. Assim, além de rastrear dependências, uma vez que ele resolve um módulo que usa um serviço, ele também adiciona ao grafo todos os módulos que fornecem esse serviço. Este processo é chamado de _ligação de serviço_ (service binding).

### Neste tutorial

Serviços no Sistema de Módulos Java
Serviços Durante a Resolução de Módulos

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[exports e opens qualificados](<#/doc/tutorials/modules/qualified-exports-opens>)

➜

**Tutorial Atual**

Desacoplando Módulos com Serviços

➜

**Próximo na Série**

[Código no Class Path - o Módulo Sem Nome](<#/doc/tutorials/modules/unnamed-module>)

**Anterior na Série:** [exports e opens qualificados](<#/doc/tutorials/modules/qualified-exports-opens>)

**Próximo na Série:** [Código no Class Path - o Módulo Sem Nome](<#/doc/tutorials/modules/unnamed-module>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > Desacoplando Módulos com Serviços