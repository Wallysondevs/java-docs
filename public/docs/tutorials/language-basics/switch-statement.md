# Ramificação com Declarações Switch

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos da Linguagem Java ](<#/doc/tutorials/language-basics>) > Ramificação com Declarações Switch

**Anterior na Série**

[Declarações de Controle de Fluxo](<#/doc/tutorials/language-basics/controlling-flow>)

➜

**Tutorial Atual**

Ramificação com Declarações Switch

➜

**Próximo na Série**

[Ramificação com Expressões Switch](<#/doc/tutorials/language-basics/switch-expression>)

**Anterior na Série:** [Declarações de Controle de Fluxo](<#/doc/tutorials/language-basics/controlling-flow>)

**Próximo na Série:** [Ramificação com Expressões Switch](<#/doc/tutorials/language-basics/switch-expression>)

# Ramificação com Declarações Switch

## Usando Declarações Switch para Controlar o Fluxo do Seu Programa

A declaração `switch` é uma das cinco declarações de controle de fluxo disponíveis na linguagem Java. Ela permite qualquer número de caminhos de execução. Uma declaração `switch` recebe uma variável seletora como argumento e usa o valor dessa variável para escolher o caminho que será executado.

Você deve escolher o tipo da sua variável seletora entre os seguintes tipos:

  * tipos de dados primitivos `byte`, `short`, `char` e `int`
  * tipos wrapper `Character`, `Byte`, `Short` e `Integer`
  * tipos enumerados
  * o tipo `String`.

É importante notar que os seguintes tipos primitivos não podem ser usados para o tipo da sua variável seletora: `boolean`, `long`, `float` e `double`.

Vejamos um primeiro exemplo de uma declaração `switch`.

O corpo de uma declaração `switch` é conhecido como um bloco `switch`. Uma declaração dentro do bloco `switch` pode ser rotulada com um ou mais rótulos `case` ou `default`. A declaração `switch` avalia sua expressão e, em seguida, executa todas as declarações que seguem o rótulo `case` correspondente.

Você deve ter notado o uso da palavra-chave `break`. Cada declaração `break` encerra a declaração `switch` que a contém. O fluxo de controle continua com a primeira declaração após o bloco `switch`. As declarações `break` são necessárias porque, sem elas, as declarações nos blocos `switch` caem em cascata (fall through). Todas as declarações após o rótulo `case` correspondente são executadas em sequência, independentemente da expressão dos rótulos `case` subsequentes, até que uma declaração `break` seja encontrada.

O código a seguir usa o fall through para preencher a lista `futureMonths`.

Tecnicamente, o `break` final não é obrigatório porque o fluxo sai da declaração `switch`. O uso de um `break` é recomendado para que a modificação do código seja mais fácil e menos propensa a erros.

A seção `default` lida com todos os valores que não são explicitamente tratados por uma das seções `case`.

O exemplo de código a seguir mostra como uma declaração pode ter múltiplos rótulos `case`. O exemplo de código calcula o número de dias em um determinado mês:

Este código tem uma declaração para mais de um `case`.

## Escolhendo Entre Declarações Switch e Declarações If-then-else

Decidir se deve usar declarações `if-then-else` ou uma declaração `switch` baseia-se na legibilidade e na expressão que a declaração está testando. Uma declaração `if-then-else` pode testar expressões baseadas em intervalos de valores ou condições, enquanto uma declaração `switch` testa expressões baseadas apenas em um único inteiro, valor enumerado ou objeto `String`.

Por exemplo, o código a seguir poderia ser escrito com uma declaração `switch`.

Por outro lado, o seguinte não poderia ser escrito com uma declaração `switch`, porque as declarações `switch` não suportam rótulos do tipo `boolean`.

## Usando String como Tipo para os Rótulos Case

No Java SE 7 e posterior, você pode usar um objeto `String` na expressão da declaração `switch`. O exemplo de código a seguir exibe o número do mês com base no valor da `String` chamada month.

A `String` na expressão `switch` é comparada com as expressões associadas a cada rótulo `case` como se o método `String.equals()` estivesse sendo usado. Para que este exemplo aceite qualquer mês, independentemente do caso, month é convertido para minúsculas (com o método `toLowerCase()`), e todas as strings associadas aos rótulos `case` estão em minúsculas.

## Variáveis Seletoras Nulas

A variável seletora de uma declaração `switch` pode ser um objeto, então este objeto pode ser null. Você deve proteger seu código de variáveis seletoras nulas, porque neste caso a declaração switch lançará uma `NullPointerException`.

### Neste tutorial

Usando Declarações Switch para Controlar o Fluxo do Seu Programa Escolhendo Entre Declarações Switch e Declarações If-then-else Usando String como Tipo para os Rótulos Case Variáveis Seletoras Nulas

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Declarações de Controle de Fluxo](<#/doc/tutorials/language-basics/controlling-flow>)

➜

**Tutorial Atual**

Ramificação com Declarações Switch

➜

**Próximo na Série**

[Ramificação com Expressões Switch](<#/doc/tutorials/language-basics/switch-expression>)

**Anterior na Série:** [Declarações de Controle de Fluxo](<#/doc/tutorials/language-basics/controlling-flow>)

**Próximo na Série:** [Ramificação com Expressões Switch](<#/doc/tutorials/language-basics/switch-expression>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos da Linguagem Java ](<#/doc/tutorials/language-basics>) > Ramificação com Declarações Switch