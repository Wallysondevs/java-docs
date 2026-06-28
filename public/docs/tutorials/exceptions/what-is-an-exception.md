# O Que É uma Exceção?

[Home](<#/>) > [Tutorials](<#/doc/tutorials/learn>) > [ Exceptions ](<#/doc/tutorials/exceptions>) > O Que É uma Exceção?

**Tutorial Atual**

O Que É uma Exceção?

➜

**Próximo na Série**

[Capturando e Tratando Exceções](<#/doc/tutorials/exceptions/catching-handling>)

**Próximo na Série:** [Capturando e Tratando Exceções](<#/doc/tutorials/exceptions/catching-handling>)

# O Que É uma Exceção?

 

## O que é uma Exceção?

O termo _exception_ é uma abreviação para a frase "evento excepcional".

> _Definição_ : Uma _exception_ é um evento, que ocorre durante a execução de um programa, que interrompe o fluxo normal das instruções do programa.

Quando um erro ocorre dentro de um método, o método cria um objeto e o entrega ao runtime system. O objeto, chamado de exception object, contém informações sobre o erro, incluindo seu tipo e o estado do programa quando o erro ocorreu. Criar um exception object e entregá-lo ao runtime system é chamado de lançar uma exception.

Depois que um método lança uma exception, o runtime system tenta encontrar algo para tratá-la. O conjunto de possíveis "algumas coisas" para tratar a exception é a lista ordenada de métodos que foram chamados para chegar ao método onde o erro ocorreu. A lista de métodos é conhecida como call stack (veja a próxima figura).

A call stack

O runtime system busca na call stack por um método que contenha um bloco de código que possa tratar a exception. Este bloco de código é chamado de exception handler. A busca começa com o método no qual o erro ocorreu e prossegue pela call stack na ordem inversa em que os métodos foram chamados. Quando um handler apropriado é encontrado, o runtime system passa a exception para o handler. Um exception handler é considerado apropriado se o tipo do exception object lançado corresponder ao tipo que pode ser tratado pelo handler.

O exception handler escolhido é dito capturar a exception. Se o runtime system buscar exaustivamente em todos os métodos na call stack sem encontrar um exception handler apropriado, como mostrado na próxima figura, a thread na qual o erro ocorreu é encerrada. Se esta thread for a main thread, então o runtime system (e, consequentemente, o programa) é encerrado.

Buscando na call stack pelo exception handler

Usar exceptions para gerenciar erros tem algumas vantagens sobre as técnicas tradicionais de gerenciamento de erros. Você pode aprender mais em [Vantagens das Exceções](<#/doc/tutorials/exceptions/unchecked-exception-controversy>).

 

## O Requisito Catch or Specify

O código válido da linguagem de programação Java deve honrar o _Requisito Catch or Specify_. Isso significa que o código que pode lançar certas exceptions deve ser envolvido por um dos seguintes:

  * Uma instrução `try` que captura a exception. O `try` deve fornecer um handler para a exception, conforme descrito em [`Capturando e Tratando Exceções`](<#/doc/tutorials/exceptions/catching-handling>).
  * Um método que especifica que pode lançar a exception. O método deve fornecer uma cláusula `throws` que lista a exception, conforme descrito em [Especificando as Exceções Lançadas por um Método](<#/doc/tutorials/exceptions/throwing>).



O código que não honrar o Requisito Catch or Specify não será compilado.

Nem todas as exceptions estão sujeitas ao Requisito Catch or Specify. Para entender o porquê, precisamos analisar as três categorias básicas de exceptions, das quais apenas uma está sujeita ao Requisito.

 

## Os Três Tipos de Exceções

O primeiro tipo de exception é a _checked exception_. Estas são condições excepcionais que uma aplicação bem escrita deve antecipar e das quais deve se recuperar. Por exemplo, suponha que uma aplicação solicite ao usuário um nome de arquivo de entrada e, em seguida, abra o arquivo passando o nome para o construtor de [`java.io.FileReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/FileReader.html>). Normalmente, o usuário fornece o nome de um arquivo existente e legível, então a construção do objeto [`FileReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/FileReader.html>) é bem-sucedida, e a execução da aplicação prossegue normalmente. Mas, às vezes, o usuário fornece o nome de um arquivo inexistente, e o construtor lança [`java.io.FileNotFoundException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/FileNotFoundException.html>). Um programa bem escrito irá capturar esta exception e notificar o usuário do erro, possivelmente solicitando um nome de arquivo corrigido.

Checked exceptions estão sujeitas ao Requisito Catch or Specify. Todas as exceptions são checked exceptions, exceto aquelas indicadas por [`Error`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Error.html>), [`RuntimeException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/RuntimeException.html>), e suas subclasses.

O segundo tipo de exception é o error. Estas são condições excepcionais que são externas à aplicação, e das quais a aplicação geralmente não pode antecipar ou se recuperar. Por exemplo, suponha que uma aplicação abra com sucesso um arquivo para entrada, mas não consiga ler o arquivo devido a uma falha de hardware ou sistema. A leitura malsucedida lançará [`java.io.IOError`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOError.html>). Uma aplicação pode optar por capturar esta exception, a fim de notificar o usuário do problema — mas também pode fazer sentido para o programa imprimir um stack trace e sair.

Errors não estão sujeitos ao Requisito Catch or Specify. Errors são aquelas exceptions indicadas por [`Error`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Error.html>) e suas subclasses.

O terceiro tipo de exception é a runtime exception. Estas são condições excepcionais que são internas à aplicação, e das quais a aplicação geralmente não pode antecipar ou se recuperar. Estas geralmente indicam bugs de programação, como erros de lógica ou uso impróprio de uma API. Por exemplo, considere a aplicação descrita anteriormente que passa um nome de arquivo para o construtor de [`FileReader`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/FileReader.html>). Se um erro de lógica fizer com que um `null` seja passado para o construtor, o construtor lançará [`NullPointerException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/NullPointerException.html>). A aplicação pode capturar esta exception, mas provavelmente faz mais sentido eliminar o bug que causou a ocorrência da exception.

Runtime exceptions não estão sujeitas ao Requisito Catch or Specify. Runtime exceptions são aquelas indicadas por [`RuntimeException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/RuntimeException.html>) e suas subclasses.

Errors e runtime exceptions são coletivamente conhecidas como _unchecked exceptions_.

 

## Contornando o Catch or Specify

Alguns programadores consideram o Requisito Catch or Specify uma falha grave no mecanismo de exceptions e o contornam usando unchecked exceptions no lugar de checked exceptions. Em geral, isso não é recomendado. A seção [Unchecked Exceptions — A Controvérsia](<#/doc/tutorials/exceptions/unchecked-exception-controversy>) discute quando é apropriado usar unchecked exceptions.

### Neste tutorial

O que é uma Exceção? O Requisito Catch or Specify Os Três Tipos de Exceções Contornando o Catch or Specify

  


Última atualização: 14 de setembro de 2021

  


**Tutorial Atual**

O Que É uma Exceção?

➜

**Próximo na Série**

[Capturando e Tratando Exceções](<#/doc/tutorials/exceptions/catching-handling>)

**Próximo na Série:** [Capturando e Tratando Exceções](<#/doc/tutorials/exceptions/catching-handling>)

[Home](<#/>) > [Tutorials](<#/doc/tutorials/learn>) > [ Exceptions ](<#/doc/tutorials/exceptions>) > O Que É uma Exceção?