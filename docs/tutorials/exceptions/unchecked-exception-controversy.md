# Exceções Não Verificadas — A Controvérsia

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Exceções ](<#/doc/tutorials/exceptions>) > Exceções Não Verificadas — A Controvérsia

**Anterior na Série**

[Lançando Exceções](<#/doc/tutorials/exceptions/throwing>)

➜

**Tutorial Atual**

Exceções Não Verificadas — A Controvérsia

➜

Este é o fim da série!

**Anterior na Série:** [Lançando Exceções](<#/doc/tutorials/exceptions/throwing>)

# Exceções Não Verificadas — A Controvérsia

## Exceções Não Verificadas — A Controvérsia

Como a linguagem de programação Java não exige que os métodos capturem ou especifiquem exceções não verificadas ([`RuntimeException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/RuntimeException.html>), [`Error`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Error.html>) e suas subclasses), os programadores podem ser tentados a escrever código que lança apenas exceções não verificadas ou a fazer com que todas as suas subclasses de exceção herdem de [`RuntimeException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/RuntimeException.html>). Ambos os atalhos permitem que os programadores escrevam código sem se preocupar com erros do compilador e sem se preocupar em especificar ou capturar quaisquer exceções. Embora isso possa parecer conveniente para o programador, ele desvia da intenção do requisito de capturar ou especificar e pode causar problemas para outros que usam suas classes.

Por que os projetistas decidiram forçar um método a especificar todas as exceções verificadas não capturadas que podem ser lançadas dentro de seu escopo? Qualquer [`Exception`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Exception.html>) que pode ser lançada por um método faz parte da interface de programação pública do método. Aqueles que chamam um método devem saber sobre as exceções que um método pode lançar para que possam decidir o que fazer a respeito delas. Essas exceções são tanto parte da interface de programação desse método quanto seus parâmetros e valor de retorno.

A próxima pergunta pode ser: "Se é tão bom documentar a API de um método, incluindo as exceções que ele pode lançar, por que não especificar também as exceções de tempo de execução?" Exceções de tempo de execução representam problemas que são resultado de um problema de programação e, como tal, não se pode razoavelmente esperar que o código cliente da API se recupere delas ou as trate de alguma forma. Tais problemas incluem exceções aritméticas, como divisão por zero; exceções de ponteiro, como tentar acessar um objeto através de uma referência nula; e exceções de indexação, como tentar acessar um elemento de array através de um índice muito grande ou muito pequeno.

Exceções de tempo de execução podem ocorrer em qualquer lugar em um programa, e em um programa típico elas podem ser muito numerosas. Ter que adicionar exceções de tempo de execução em cada declaração de método reduziria a clareza de um programa. Assim, o compilador não exige que você capture ou especifique exceções de tempo de execução (embora você possa).

Um caso em que é prática comum lançar uma [`RuntimeException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/RuntimeException.html>) é quando o usuário chama um método incorretamente. Por exemplo, um método pode verificar se um de seus argumentos é nulo incorretamente. Se um argumento for nulo, o método pode lançar uma [`NullPointerException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NullPointerException.html>), que é uma exceção não verificada.

De modo geral, não lance uma [`RuntimeException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/RuntimeException.html>) ou crie uma subclasse de [`RuntimeException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/RuntimeException.html>) simplesmente porque você não quer se incomodar em especificar as exceções que seus métodos podem lançar.

Aqui está a diretriz final: Se um cliente pode razoavelmente ser esperado para se recuperar de uma exceção, torne-a uma exceção verificada. Se um cliente não pode fazer nada para se recuperar da exceção, torne-a uma exceção não verificada.

## Vantagens das Exceções

Agora que você sabe o que são exceções e como usá-las, é hora de aprender as vantagens de usar exceções em seus programas.

### Vantagem 1: Separando o Código de Tratamento de Erros do Código "Regular"

Exceções fornecem os meios para separar os detalhes do que fazer quando algo fora do comum acontece da lógica principal de um programa. Na programação tradicional, a detecção, o relatório e o tratamento de erros frequentemente levam a um código espaguete confuso. Por exemplo, considere o método em pseudocódigo aqui que lê um arquivo inteiro para a memória.

À primeira vista, esta função parece bastante simples, mas ignora todos os seguintes erros potenciais.

*   O que acontece se o arquivo não puder ser aberto?
*   O que acontece se o comprimento do arquivo não puder ser determinado?
*   O que acontece se memória suficiente não puder ser alocada?
*   O que acontece se a leitura falhar?
*   O que acontece se o arquivo não puder ser fechado?

Para lidar com tais casos, a função `readFile` deve ter mais código para fazer detecção, relatório e tratamento de erros. Aqui está um exemplo de como a função pode parecer.

Há tanta detecção, relatório e retorno de erros aqui que as sete linhas originais de código se perdem na desordem. Pior ainda, o fluxo lógico do código também foi perdido, tornando difícil dizer se o código está fazendo a coisa certa: O arquivo está realmente sendo fechado se a função falhar em alocar memória suficiente? É ainda mais difícil garantir que o código continue a fazer a coisa certa quando você modifica o método três meses depois de escrevê-lo. Muitos programadores resolvem esse problema simplesmente ignorando-o — os erros são relatados quando seus programas travam.

Exceções permitem que você escreva o fluxo principal do seu código e lide com os casos excepcionais em outro lugar. Se a função `readFile` usasse exceções em vez de técnicas tradicionais de gerenciamento de erros, ela se pareceria mais com o seguinte.

Observe que as exceções não o poupam do esforço de fazer o trabalho de detectar, relatar e tratar erros, mas elas o ajudam a organizar o trabalho de forma mais eficaz.

### Vantagem 2: Propagando Erros Pela Pilha de Chamadas

Uma segunda vantagem das exceções é a capacidade de propagar o relatório de erros pela pilha de chamadas de métodos. Suponha que o método `readFile` seja o quarto método em uma série de chamadas de métodos aninhadas feitas pelo programa principal: `method1` chama `method2`, que chama `method3`, que finalmente chama `readFile`.

Suponha também que `method1` seja o único método interessado nos erros que podem ocorrer dentro de `readFile`. Técnicas tradicionais de notificação de erros forçam `method2` e `method3` a propagar os códigos de erro retornados por `readFile` pela pilha de chamadas até que os códigos de erro finalmente cheguem a `method1` — o único método interessado neles.

Lembre-se de que o ambiente de tempo de execução Java pesquisa para trás na pilha de chamadas para encontrar quaisquer métodos interessados em tratar uma exceção específica. Um método pode "ignorar" quaisquer exceções lançadas dentro dele, permitindo assim que um método mais acima na pilha de chamadas a capture.

Portanto, apenas os métodos que se importam com erros precisam se preocupar em detectá-los.

No entanto, como o pseudocódigo mostra, "ignorar" uma exceção requer algum esforço por parte dos métodos intermediários. Quaisquer exceções verificadas que podem ser lançadas dentro de um método devem ser especificadas em sua cláusula `throws`.

### Vantagem 3: Agrupando e Diferenciando Tipos de Erro

Como todas as exceções lançadas dentro de um programa são objetos, o agrupamento ou categorização de exceções é um resultado natural da hierarquia de classes. Um exemplo de um grupo de classes de exceção relacionadas na plataforma Java são aquelas definidas em [`java.io`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/package-summary.html>) — [`IOException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOException.html>) e seus descendentes. [`IOException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOException.html>) é a mais geral e representa qualquer tipo de erro que pode ocorrer ao realizar I/O. Seus descendentes representam erros mais específicos. Por exemplo, [`FileNotFoundException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/FileNotFoundException.html>) significa que um arquivo não pôde ser localizado no disco.

Um método pode escrever manipuladores específicos que podem tratar uma exceção muito específica. A classe [`FileNotFoundException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/FileNotFoundException.html>) não tem descendentes, então o seguinte manipulador pode tratar apenas um tipo de exceção.

Um método pode capturar uma exceção com base em seu grupo ou tipo geral, especificando qualquer uma das superclasses da exceção na instrução `catch`. Por exemplo, para capturar todas as exceções de I/O, independentemente de seu tipo específico, um manipulador de exceção especifica um argumento [`IOException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOException.html>).

Este manipulador será capaz de capturar todas as exceções de I/O, incluindo [`FileNotFoundException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/FileNotFoundException.html>), [`EOFException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/EOFException.html>), e assim por diante. Você pode encontrar detalhes sobre o que ocorreu consultando o argumento passado para o manipulador de exceção. Por exemplo, use o seguinte para imprimir o stack trace.

Você poderia até configurar um manipulador de exceção que trata qualquer [`Exception`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Exception.html>) com o manipulador aqui.

A classe [`Exception`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Exception.html>) está próxima do topo da hierarquia de classes [`Throwable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Throwable.html>). Portanto, este manipulador capturará muitas outras exceções, além daquelas que o manipulador se destina a capturar. Você pode querer tratar exceções dessa forma se tudo o que você deseja que seu programa faça, por exemplo, é imprimir uma mensagem de erro para o usuário e depois sair.

Na maioria das situações, no entanto, você deseja que os manipuladores de exceção sejam o mais específicos possível. A razão é que a primeira coisa que um manipulador deve fazer é determinar que tipo de exceção ocorreu antes que ele possa decidir a melhor estratégia de recuperação. Na prática, ao não capturar erros específicos, o manipulador deve acomodar qualquer possibilidade. Manipuladores de exceção muito gerais podem tornar o código mais propenso a erros, capturando e tratando exceções que não foram antecipadas pelo programador e para as quais o manipulador não foi projetado.

Como observado, você pode criar grupos de exceções e tratá-las de forma geral, ou pode usar o tipo de exceção específico para diferenciar exceções e tratá-las de forma exata.

## Resumo

Um programa pode usar exceções para indicar que ocorreu um erro. Para lançar uma exceção, use a instrução `throw` e forneça a ela um objeto de exceção — um descendente de [`Throwable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Throwable.html>) — para fornecer informações sobre o erro específico que ocorreu. Um método que lança uma exceção verificada não capturada deve incluir uma cláusula `throws` em sua declaração.

Um programa pode capturar exceções usando uma combinação dos blocos `try`, `catch` e `finally`.

*   O bloco `try` identifica um bloco de código no qual uma exceção pode ocorrer.
*   O bloco `catch` identifica um bloco de código, conhecido como manipulador de exceção, que pode tratar um tipo particular de exceção.
*   O bloco `finally` identifica um bloco de código que tem garantia de execução e é o lugar certo para fechar arquivos, recuperar recursos e, de outra forma, limpar após o código contido no bloco `try`.

A instrução `try` deve conter pelo menos um bloco `catch` ou um bloco `finally` e pode ter múltiplos blocos `catch`.

A classe do objeto de exceção indica o tipo de exceção lançada. O objeto de exceção pode conter informações adicionais sobre o erro, incluindo uma mensagem de erro. Com o encadeamento de exceções, uma exceção pode apontar para a exceção que a causou, que por sua vez pode apontar para a exceção que a causou, e assim por diante.

### Neste tutorial

A Controvérsia das Exceções Não Verificadas Vantagens das Exceções Resumo

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Lançando Exceções](<#/doc/tutorials/exceptions/throwing>)

➜

**Tutorial Atual**

Exceções Não Verificadas — A Controvérsia

➜

Este é o fim da série!

**Anterior na Série:** [Lançando Exceções](<#/doc/tutorials/exceptions/throwing>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Exceções ](<#/doc/tutorials/exceptions>) > Exceções Não Verificadas — A Controvérsia