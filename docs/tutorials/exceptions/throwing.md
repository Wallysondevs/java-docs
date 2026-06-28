# Lançando Exceções

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Exceções ](<#/doc/tutorials/exceptions>) > Lançando Exceções

**Anterior na Série**

[Capturando e Manipulando Exceções](<#/doc/tutorials/exceptions/catching-handling>)

➜

**Tutorial Atual**

Lançando Exceções

➜

**Próximo na Série**

[Exceções Não Verificadas — A Controvérsia](<#/doc/tutorials/exceptions/unchecked-exception-controversy>)

**Anterior na Série:** [Capturando e Manipulando Exceções](<#/doc/tutorials/exceptions/catching-handling>)

**Próximo na Série:** [Exceções Não Verificadas — A Controvérsia](<#/doc/tutorials/exceptions/unchecked-exception-controversy>)

# Lançando Exceções

## Especificando as Exceções Lançadas por um Método

A seção anterior mostrou como escrever um manipulador de exceções para o método `writeList()` na classe `ListOfNumbers`. Às vezes, é apropriado que o código capture exceções que podem ocorrer dentro dele. Em outros casos, no entanto, é melhor deixar que um método mais acima na pilha de chamadas manipule a exceção. Por exemplo, se você estivesse fornecendo a classe `ListOfNumbers` como parte de um pacote de classes, provavelmente não conseguiria antecipar as necessidades de todos os usuários do seu pacote. Neste caso, é melhor não capturar a exceção e permitir que um método mais acima na pilha de chamadas a manipule.

Se o método `writeList()` não capturar as exceções verificadas que podem ocorrer dentro dele, o método `writeList()` deve especificar que ele pode lançar essas exceções. Vamos modificar o método `writeList()` original para especificar as exceções que ele pode lançar em vez de capturá-las. Para lembrá-lo, aqui está a versão original do método `writeList()` que não irá compilar.

Para especificar que `writeList()` pode lançar duas exceções, adicione uma cláusula `throws` à declaração do método `writeList()`. A cláusula `throws` é composta pela palavra-chave `throws` seguida por uma lista separada por vírgulas de todas as exceções lançadas por esse método. A cláusula vem depois do nome do método e da lista de argumentos e antes da chave que define o escopo do método; aqui está um exemplo.

Lembre-se de que [`IndexOutOfBoundsException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IndexOutOfBoundsException.html>) é uma exceção não verificada; incluí-la na cláusula `throws` não é obrigatório. Você poderia simplesmente escrever o seguinte.

## Como Lançar Exceções

Antes que você possa capturar uma exceção, algum código em algum lugar deve lançar uma. Qualquer código pode lançar uma exceção: seu código, código de um pacote escrito por outra pessoa, como os pacotes que vêm com a plataforma Java, ou o ambiente de tempo de execução Java. Independentemente do que lança a exceção, ela é sempre lançada com a instrução `throw`.

Como você provavelmente notou, a plataforma Java fornece inúmeras classes de exceção. Todas as classes são descendentes da classe [`Throwable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Throwable.html>), e todas permitem que os programas diferenciem entre os vários tipos de exceções que podem ocorrer durante a execução de um programa.

Você também pode criar suas próprias classes de exceção para representar problemas que podem ocorrer dentro das classes que você escreve. Na verdade, se você é um desenvolvedor de pacotes, pode ter que criar seu próprio conjunto de classes de exceção para permitir que os usuários diferenciem um erro que pode ocorrer em seu pacote de erros que ocorrem na plataforma Java ou em outros pacotes.

Você também pode criar exceções encadeadas. Para mais informações, consulte a seção [Exceções Encadeadas](<#/doc/tutorials/exceptions/throwing>).

## A Instrução Throw

Todos os métodos usam a instrução `throw` para lançar uma exceção. A instrução `throw` requer um único argumento: um objeto `throwable`. Objetos `throwable` são instâncias de qualquer subclasse da classe [`Throwable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Throwable.html>). Aqui está um exemplo de uma instrução `throw`.

Vamos analisar a instrução `throw` em contexto. O método `pop()` a seguir é retirado de uma classe que implementa um objeto de pilha comum. O método remove o elemento superior da pilha e retorna o objeto.

O método `pop()` verifica se há algum elemento na pilha. Se a pilha estiver vazia (seu tamanho for igual a 0), `pop` instancia um novo objeto [`EmptyStackException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/EmptyStackException.html>), um membro de [`java.util`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/package-summary.html>) e o lança. A seção Criando Classes de Exceção neste capítulo explica como criar suas próprias classes de exceção. Por enquanto, tudo o que você precisa lembrar é que você só pode lançar objetos que herdam da classe [`java.lang.Throwable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Throwable.html>).

Observe que a declaração do método `pop()` não contém uma cláusula `throws`. [`EmptyStackException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/EmptyStackException.html>) não é uma exceção verificada, então `pop` não é obrigado a declarar que ela pode ocorrer.

## Classe Throwable e Suas Subclasses

Os objetos que herdam da classe [`Throwable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Throwable.html>) incluem descendentes diretos (objetos que herdam diretamente da classe [`Throwable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Throwable.html>)) e descendentes indiretos (objetos que herdam de filhos ou netos da classe [`Throwable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Throwable.html>)). A figura abaixo ilustra a hierarquia de classes da classe [`Throwable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Throwable.html>) e suas subclasses mais significativas. Como você pode ver, [`Throwable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Throwable.html>) tem dois descendentes diretos: [`Error`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Error.html>) e [`Exception`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Exception.html>).

A hierarquia de Throwable

## Classe Error

Quando ocorre uma falha de vinculação dinâmica ou outra falha grave na Java virtual machine, a máquina virtual lança um [`Error`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Error.html>). Programas simples geralmente não capturam nem lançam instâncias de [`Error`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Error.html>).

## Classe Exception

A maioria dos programas lança e captura objetos que derivam da classe [`Exception`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Exception.html>). Uma [`Exception`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Exception.html>) indica que um problema ocorreu, mas não é um problema sério do sistema. A maioria dos programas que você escreve lançará e capturará instâncias de [`Exception`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Exception.html>) em vez de [`Error`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Error.html>).

A plataforma Java define os muitos descendentes da classe [`Exception`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Exception.html>). Esses descendentes indicam vários tipos de exceções que podem ocorrer. Por exemplo, [`IllegalAccessException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/IllegalAccessException.html>) sinaliza que um método específico não pôde ser encontrado, e [`NegativeArraySizeException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NegativeArraySizeException.html>) indica que um programa tentou criar um array com um tamanho negativo.

Uma subclasse de [`Exception`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Exception.html>), [`RuntimeException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/RuntimeException.html>), é reservada para exceções que indicam uso incorreto de uma API. Um exemplo de exceção de tempo de execução é [`NullPointerException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NullPointerException.html>), que ocorre quando um método tenta acessar um membro de um objeto através de uma referência nula. A seção [Exceções Não Verificadas — A Controvérsia](<#/doc/tutorials/exceptions/unchecked-exception-controversy>) discute por que a maioria das aplicações não deve lançar exceções de tempo de execução ou subclasse [`RuntimeException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/RuntimeException.html>).

## Exceções Encadeadas

Uma aplicação frequentemente responde a uma exceção lançando outra exceção. Na prática, a primeira exceção causa a segunda exceção. Pode ser muito útil saber quando uma exceção causa outra. Exceções encadeadas ajudam o programador a fazer isso.

A seguir estão os métodos e construtores em [`Throwable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Throwable.html>) que suportam exceções encadeadas.

O argumento [`Throwable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Throwable.html>) para `initCause()` e os construtores de [`Throwable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Throwable.html>) é a exceção que causou a exceção atual. [`getCause()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Throwable.html#getCause\(\)>) retorna a exceção que causou a exceção atual, e `initCause()` define a causa da exceção atual.

O exemplo a seguir mostra como usar uma exceção encadeada.

Neste exemplo, quando uma [`IOException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOException.html>) é capturada, uma nova exceção `SampleException` é criada com a causa original anexada e a cadeia de exceções é lançada para o próximo manipulador de exceções de nível superior.

## Acessando Informações de Stack Trace

Agora, vamos supor que o manipulador de exceções de nível superior queira despejar o stack trace em seu próprio formato.

> Definição: Um stack trace fornece informações sobre o histórico de execução da thread atual e lista os nomes das classes e métodos que foram chamados no ponto em que a exceção ocorreu. Um stack trace é uma ferramenta de depuração útil que você normalmente aproveitará quando uma exceção for lançada.

### Logando Usando System.err

O código a seguir mostra como chamar o método [`getStackTrace()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Throwable.html#getStackTrace\(\)>) no objeto de exceção e, em seguida, registrar algumas informações relevantes em [`System.err`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/System.html#err>). Apenas o bloco `catch` é mostrado.

### Logando para um Arquivo com a API de Logging

Logar para [`System.err`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/System.html#err>) pode não ser possível para algumas aplicações. Nesse caso, você pode usar a API Logger para enviar as informações de que precisa para um arquivo. Você pode consultar a página [java.util.logging](<https://docs.oracle.com/en/java/javase/26/docs/api/java.logging/java/util/logging/package-summary.html>) para mais informações.

O próximo trecho de código registra a exceção e envia as informações para a API Logger, que envia mensagens para o arquivo de saída que você especificou. Observe que a mensagem enviada é uma string de caracteres construída a partir de um [`MessageFormat`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/text/MessageFormat.html>). Construir tal string de caracteres pode ser caro e o logger pode decidir não registrá-la se o nível de log não for o correto. Então, em vez de enviar a própria string, você pode enviar um [`Supplier`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/function/Supplier.html>) que pode construir essa string, e que é invocado pelo seu logger apenas se necessário.

## Criando Classes de Exceção

Ao se deparar com a escolha do tipo de exceção a ser lançada, você pode usar uma escrita por outra pessoa — a plataforma Java fornece muitas classes de exceção que você pode usar — ou pode escrever uma própria. Você deve escrever suas próprias classes de exceção se responder sim a qualquer uma das seguintes perguntas; caso contrário, você provavelmente pode usar as de outra pessoa.

  * Você precisa de um tipo de exceção que não seja representado pelas da plataforma Java?
  * Ajudaria os usuários se eles pudessem diferenciar suas exceções daquelas lançadas por classes escritas por outros fornecedores?
  * Seu código lança mais de uma exceção relacionada?
  * Se você usar exceções de outra pessoa, os usuários terão acesso a essas exceções? Uma pergunta semelhante é: seu pacote deve ser independente e autocontido?

### Um Exemplo

Suponha que você esteja escrevendo uma classe de lista encadeada. A classe suporta os seguintes métodos, entre outros:

  * `objectAt(int n)` — Retorna o objeto na n-ésima posição da lista. Se esta lista tiver _N_ elementos, uma exceção é lançada se _n_ for menor que 0 ou maior que _N - 1_.
  * `firstObject()` — Retorna o primeiro objeto da lista. Lança uma exceção se a lista não contiver objetos.
  * `indexOf(Object o)` — Procura na lista o `Object` especificado e retorna sua posição na lista. Lança uma exceção se o objeto passado para o método não estiver na lista.

A classe de lista encadeada pode lançar múltiplas exceções, e seria conveniente poder capturar todas as exceções lançadas pela lista encadeada com um único manipulador de exceções. Além disso, se você planeja distribuir sua lista encadeada em um pacote, todo o código relacionado deve ser empacotado junto. Assim, a lista encadeada deve fornecer seu próprio conjunto de classes de exceção.

A próxima figura ilustra uma possível hierarquia de classes para as exceções lançadas pela lista encadeada.

Hierarquia de exemplo de classes de exceção

### Escolhendo uma Superclasse

Qualquer subclasse de [`Exception`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Exception.html>) pode ser usada como a classe pai de `LinkedListException`. No entanto, uma rápida análise dessas subclasses mostra que elas são inadequadas porque são muito especializadas ou completamente não relacionadas a `LinkedListException`. Portanto, a classe pai de `LinkedListException` deve ser `Exception`.

A maioria das aplicações que você escreve lançará objetos que são instâncias de [`Exception`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Exception.html>). Instâncias de [`Error`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Error.html>) são normalmente usadas para erros graves e difíceis no sistema, como aqueles que impedem a execução da JVM.

Nota: Para um código legível, é uma boa prática anexar a string [`Exception`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Exception.html>) aos nomes de todas as classes que herdam (direta ou indiretamente) da classe [`Exception`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Exception.html>).

### Neste tutorial

Especificando as Exceções Lançadas por um Método Como Lançar Exceções A Instrução Throw Classe Throwable e Suas Subclasses Classe Error Classe Exception Exceções Encadeadas Acessando Informações de Stack Trace Criando Classes de Exceção

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Capturando e Manipulando Exceções](<#/doc/tutorials/exceptions/catching-handling>)

➜

**Tutorial Atual**

Lançando Exceções

➜

**Próximo na Série**

[Exceções Não Verificadas — A Controvérsia](<#/doc/tutorials/exceptions/unchecked-exception-controversy>)

**Anterior na Série:** [Capturando e Manipulando Exceções](<#/doc/tutorials/exceptions/catching-handling>)

**Próximo na Série:** [Exceções Não Verificadas — A Controvérsia](<#/doc/tutorials/exceptions/unchecked-exception-controversy>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Exceções ](<#/doc/tutorials/exceptions>) > Lançando Exceções