# Criando um Interceptor com Anotações

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Reflection ](<#/doc/tutorials/reflection>) > Criando um Interceptor com Anotações

**Anterior na Série**

[Lendo Anotações](<#/doc/tutorials/reflection/annotations>)

➜

**Tutorial Atual**

Criando um Interceptor com Anotações

➜

**Próximo na Série**

[Criando um Framework de Injeção de Dependência](<#/doc/tutorials/reflection/dependency-injection>)

**Anterior na Série:** [Lendo Anotações](<#/doc/tutorials/reflection/annotations>)

**Próximo na Série:** [Criando um Framework de Injeção de Dependência](<#/doc/tutorials/reflection/dependency-injection>)

# Criando um Interceptor com Anotações

O primeiro exemplo que você vai executar consiste em projetar um sistema simples de interceptação para métodos de serviço. Este é um sistema que existe em Java EE, Jakarta EE e outros frameworks de aplicação corporativa. O conceito é simples: você adiciona uma anotação em um método, esta anotação recebe uma classe como um atributo, e um método específico desta classe é chamado em vez do seu método de serviço.

## O que é um Interceptor?

O conceito de interceptar uma chamada de método é muito simples. Ele se baseia em dois elementos: um serviço que possui um método de serviço, e um interceptor, que também possui um método. Quando você chama seu método de serviço, o que você quer é que este método do interceptor seja chamado em vez dele.

Então, este método pode fazer muitas coisas.

*   Ele pode validar os argumentos enviados ao seu método de serviço.
*   Ele pode alterar esses argumentos.
*   Além de alguma validação, ele também pode aplicar algumas regras de segurança.
*   Ele pode decidir chamar seu método de serviço, ou não.
*   Ele pode então obter o resultado do seu método de serviço e decidir retorná-lo como está, ou modificá-lo.
*   E ele pode capturar as exceções lançadas pelo seu método de serviço e agir sobre elas.

Este tipo de interceptor pode ser implementado usando objetos [`Proxy`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Proxy.html>), que estão além do escopo deste capítulo. Então, vamos implementar esta funcionalidade de uma maneira mais simples.

## Projetando a Interface e Anotação Intercept

Vamos começar com a anotação que você precisa. Esta anotação precisa informar qual classe de interceptor deve ser usada. Para simplificar, vamos impor que os interceptors implementem uma interface específica.

Observe que esta interface usa tipos parametrizados para o objeto que você intercepta e o tipo de retorno do método que você intercepta.

Então você pode projetar a anotação que você precisa.

## Projetando um Serviço e um Método Interceptado

Vamos agora criar um serviço, com um método que você precisa interceptar. A classe `MessageInterceptor` é uma implementação da interface `Interceptor` que você vai escrever na próxima seção.

Tendo escrito este código, o que você espera é o seguinte.

1.  Você precisa de uma maneira de chamar o método `message()` da sua classe `SomeInterceptedService`.
2.  Quando você o chama, você espera que sua implementação do método `intercept()` da sua classe `MessageInterceptor` seja chamada antes que o método `message()` seja chamado.
3.  Você então espera obter o resultado desta chamada.

O código que você escreve pode ser parecido com o seguinte. Observe que o método `invoke()` recebe a classe do seu serviço, o nome do método e os argumentos que você precisa passar para este método. Em um sistema baseado em [`Proxy`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Proxy.html>), esta chamada seria muito mais simples, pois um proxy dinâmico pode construir implementações para você. Assim, sua chamada se pareceria com uma chamada de método regular em uma classe regular.

Neste ponto, você precisa escrever duas classes: a classe `MessageInterceptor` e a classe `ServiceFactory`.

## Escrevendo a Classe MessageInterceptor

Esta classe é uma implementação da interface `Interceptor` que tem a responsabilidade de decidir, ou não, chamar seu serviço interceptado.

Você poderia escrevê-la especificamente para chamar o método do serviço que você precisa. O que fazemos aqui é que o método interceptado é um parâmetro do método `intercept()`. Assim, como você viu nas seções anteriores deste capítulo, você precisa de três elementos para chamar este método via reflection:

1.  O próprio método, na forma de um objeto [`Method`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/reflect/Method.html>). Observe que você também poderia passar o nome deste método.
2.  O objeto no qual este método é invocado. Este é, na verdade, o seu serviço.
3.  E os argumentos que você precisa passar para este método.

Então, o que você precisa fazer neste método é implementar sua lógica de negócio: por que você precisa interceptar este método, o que você precisa fazer neste interceptor?

Aqui, estamos primeiro fazendo alguma validação de argumentos. O array `arguments` deve conter apenas um elemento do tipo [`String`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/String.html>). Se este não for o caso, lançamos uma exceção, e o método interceptado não é chamado.

Então chamamos o método interceptado e obtemos o resultado que ele produziu. Observe que poderíamos ter modificado os argumentos passados para este método, se necessário.

Então modificamos o resultado adicionando a mensagem `[was intercepted]` a ele.

## Escrevendo a Classe ServiceFactory

Esta classe é mais técnica e aproveita a Reflection API.

Ela recebe a classe na qual o método é declarado, o nome do método que será interceptado e os argumentos que você precisa passar para este método.

Primeiro, ela precisa criar uma instância do serviço. Isso é feito obtendo o construtor vazio deste serviço. Este construtor precisa existir, caso contrário, uma exceção é lançada.

Então, ela precisa localizar o método que precisa chamar. Para isso, ela precisa de dois elementos: o nome do método e os tipos de seus parâmetros em um array. Isso é o que o `stream` está fazendo: ele cria um array de classes a partir do array de argumentos. Com estes dois elementos, ele pode então localizar o método correto.

Então, ela precisa verificar se a anotação está presente neste método. Se estiver, então ela precisa obter a instância desta anotação e chamar o método `value()` nela, que retorna a classe do interceptor. Observe que você precisa fazer um cast para o tipo correto, pois anotações não suportam generics. Este cast emitirá um aviso do compilador, pois o compilador não pode verificar se está correto ou não.

Uma vez que ela conhece a classe do interceptor, ela precisa criar uma instância dela, para chamar seu método `intercept()` com os argumentos corretos. Esta é uma chamada direta, não uma chamada via reflection.

Observe que se a anotação não for encontrada, então ela chama o método de serviço via reflection, sem qualquer interceptação.

Em ambos os casos, ela precisa obter o objeto retornado e retorná-lo.

Como você pode ver, este código é bastante complexo, um tanto obscuro e não type safe em tempo de compilação. Este é na maioria das vezes o caso quando você está usando a Reflection API em casos de uso de aplicações reais.

Vamos adicionar outra classe, para mostrar que o mecanismo de interceptação está funcionando corretamente. Esta classe `SomeNonInterceptedService` é igual à classe `SomeInterceptedService`. A única diferença é que seu método de serviço não declara o interceptor.

Agora que você tem todos os elementos, você pode executar o seguinte código.

Ele imprime o seguinte resultado.

Observe que este exemplo está funcionando bem porque os tipos são definidos de uma maneira elegante. O método `invoke()` está procurando por um método chamado `message()` que recebe uma `String` como parâmetro. O tipo `String` é lido do argumento `message` que você passou para o método `invoke()`. Se o método `message()` fosse definido no tipo `CharSequence` em vez do tipo `String` (o tipo `String` estende o tipo `CharSequence`), então a chamada `getDeclaredMethod()` não teria retornado este método `message()`.

### Neste tutorial

O que é um Interceptor? Projetando a Interface e Anotação Intercept Projetando um Serviço e um Método Interceptado Escrevendo a Classe MessageInterceptor Escrevendo a Classe ServiceFactory

Última atualização: 25 de julho de 2024

**Anterior na Série**

[Lendo Anotações](<#/doc/tutorials/reflection/annotations>)

➜

**Tutorial Atual**

Criando um Interceptor com Anotações

➜

**Próximo na Série**

[Criando um Framework de Injeção de Dependência](<#/doc/tutorials/reflection/dependency-injection>)

**Anterior na Série:** [Lendo Anotações](<#/doc/tutorials/reflection/annotations>)

**Próximo na Série:** [Criando um Framework de Injeção de Dependência](<#/doc/tutorials/reflection/dependency-injection>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API de Reflection ](<#/doc/tutorials/reflection>) > Criando um Interceptor com Anotações