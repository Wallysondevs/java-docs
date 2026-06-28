# Liberando Recursos e Capturando Exceções

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Noções Básicas de Operações de Arquivo ](<#/doc/tutorials/java-io/reading-writing>) > Liberando Recursos e Capturando Exceções

**Tutorial Atual**

Liberando Recursos e Capturando Exceções

➜

**Próximo na Série**

[Lendo e Escrevendo Arquivos Pequenos](<#/doc/tutorials/java-io/reading-writing/small-files>)

**Próximo na Série:** [Lendo e Escrevendo Arquivos Pequenos](<#/doc/tutorials/java-io/reading-writing/small-files>)

# Liberando Recursos e Capturando Exceções

## Liberando Recursos do Sistema

Muitos dos recursos utilizados nesta API, como streams ou canais, implementam ou estendem a interface [`java.io.Closeable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Closeable.html>). Um requisito de um recurso [`Closeable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Closeable.html>) é que o método [`close()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/Closeable.html#close\(\)>) deve ser invocado para liberar o recurso quando não for mais necessário. Negligenciar o fechamento de um recurso pode ter uma implicação negativa no desempenho de uma aplicação. A instrução _try-with-resources_, descrita na próxima seção, lida com esta etapa para você.

### Fechando um Recurso

Em prol da simplicidade, os exemplos anteriores omitem duas coisas: o tratamento das exceções e o fechamento do seu reader.

Todas as operações de I/O lançam a mesma exceção padrão na API Java I/O: a [`IOException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOException.html>). Dependendo do tipo de recurso que você está acessando, exceções adicionais podem ser lançadas. Por exemplo, se o seu `reader` lê caracteres de um arquivo, você pode ter que lidar com a [`FileNotFoundException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/FileNotFoundException.html>).

Fechar um recurso de I/O é uma obrigação em sua aplicação. Deixar recursos abertos fará com que sua aplicação falhe a longo prazo.

A partir do Java SE 7, o fechamento de recursos de I/O pode ser feito usando a instrução _try-with-resources_. Vamos reescrever o código anterior usando este padrão.

Neste exemplo, o objeto `reader` pode ser usado no bloco _try_. Quando o programa sai deste bloco, seja normalmente ou excepcionalmente, o método `close()` do objeto `reader` será chamado para você.

### Fechando Vários Recursos

Você pode ver file readers e buffered readers criados usando seus construtores. Estes eram os padrões usados antes da introdução da classe factory [`Files`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html>) no Java SE 7. Neste caso, você verá a criação de vários recursos de I/O intermediários, que devem ser fechados na ordem correta.

No caso de um buffered reader criado usando um file reader, o padrão correto é o seguinte.

## Capturando Exceções

Com I/O de arquivo, condições inesperadas são um fato da vida: um arquivo existe (ou não existe) quando esperado, o programa não tem acesso ao sistema de arquivos, a implementação padrão do sistema de arquivos não suporta uma função particular, e assim por diante. Numerosos erros podem ser encontrados.

Todos os métodos que acessam o sistema de arquivos podem lançar uma [`IOException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOException.html>). É uma boa prática capturar essas exceções incorporando esses métodos em uma _instrução try-with-resources_, introduzida na versão Java SE 7. A instrução _try-with-resources_ tem a vantagem de que o compilador gera automaticamente o código para fechar o(s) recurso(s) quando não for(em) mais necessário(s). O código a seguir mostra como isso pode parecer:

Para mais informações, consulte a seção [A Instrução try-with-resources](<#/doc/tutorials/exceptions/catching-handling>).

Alternativamente, você pode incorporar os métodos de I/O de arquivo em um bloco _try_ e então capturar quaisquer exceções em um bloco `catch`. Se o seu código abriu quaisquer streams ou canais, você deve fechá-los em um bloco `finally`. O exemplo anterior se pareceria com o seguinte usando a abordagem _try-catch-finally_:

Para mais informações, consulte a seção [Capturando e Tratando Exceções](<#/doc/tutorials/exceptions/catching-handling>).

Além de [`IOException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/IOException.html>), muitas exceções específicas estendem [`FileSystemException`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileSystemException.html>). Esta classe possui alguns métodos úteis que retornam o arquivo envolvido ([`getFile()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileSystemException.html#getFile\(\)>)), a string da mensagem detalhada ([`getMessage()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileSystemException.html#getMessage\(\)>)), a razão pela qual a operação do sistema de arquivos falhou ([`getReason()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileSystemException.html#getReason\(\)>)), e o "outro" arquivo envolvido, se houver ([`getOtherFile()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileSystemException.html#getOtherFile\(\)>)).

O trecho de código a seguir mostra como o método [`getFile()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileSystemException.html#getFile\(\)>) pode ser usado:

Para fins de clareza, os exemplos de I/O de arquivo nesta seção podem não mostrar o tratamento de exceções, mas seu código deve sempre incluí-lo.

## Usando Varargs

Vários métodos de Files aceitam um número arbitrário de argumentos quando flags são especificadas. Por exemplo, na seguinte assinatura de método, a notação de reticências após o argumento [`CopyOption`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/CopyOption.html>) indica que o método aceita um número variável de argumentos, ou _varargs_, como são tipicamente chamados:

Quando um método aceita um argumento varargs, você pode passar a ele uma lista de valores separados por vírgulas ou um array (`CopyOption[]`) de valores.

No exemplo a seguir, o método pode ser invocado da seguinte forma:

Para mais informações sobre a sintaxe de varargs, consulte a seção [Número Arbitrário de Argumentos](<#/doc/tutorials/classes-objects/calling-methods-constructors>).

## Encadeamento de Métodos

Muitos dos métodos de I/O de arquivo suportam o conceito de encadeamento de métodos.

Você primeiro invoca um método que retorna um objeto. Em seguida, você invoca imediatamente um método nesse objeto, que retorna outro objeto, e assim por diante. Muitos dos exemplos de I/O usam a seguinte técnica:

Esta técnica produz código compacto e permite evitar a declaração de variáveis temporárias que você não precisa.

### Neste tutorial

Liberando Recursos do Sistema Capturando Exceções Usando Varargs Encadeamento de Métodos

Última atualização: 25 de janeiro de 2023

**Tutorial Atual**

Liberando Recursos e Capturando Exceções

➜

**Próximo na Série**

[Lendo e Escrevendo Arquivos Pequenos](<#/doc/tutorials/java-io/reading-writing/small-files>)

**Próximo na Série:** [Lendo e Escrevendo Arquivos Pequenos](<#/doc/tutorials/java-io/reading-writing/small-files>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Noções Básicas de Operações de Arquivo ](<#/doc/tutorials/java-io/reading-writing>) > Liberando Recursos e Capturando Exceções