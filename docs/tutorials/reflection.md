# A API de Reflection

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > A API de Reflection

# A API de Reflection

Reflection é comumente usada por programas que exigem a capacidade de examinar ou modificar o comportamento em tempo de execução de aplicações rodando na Java virtual machine. Esta é uma funcionalidade relativamente avançada e deve ser usada apenas por desenvolvedores que possuem um forte domínio dos fundamentos da linguagem. Com essa ressalva em mente, reflection é uma técnica poderosa e pode permitir que aplicações realizem operações que de outra forma seriam impossíveis.

1.  [Introduzindo a API de Reflection](<#/doc/tutorials/reflection/intro>)

    Introduzindo a API de Reflection: como examinar ou modificar o comportamento em tempo de execução de aplicações rodando na Java virtual machine.

2.  [Recuperando Classes](<#/doc/tutorials/reflection/classes>)

    Como recuperar uma instância de classe, a partir de seu nome, ou de um objeto, incluindo arrays e primitive types.

3.  [Lendo Nomes de Classes](<#/doc/tutorials/reflection/names>)

    Qual é o nome de uma classe, e como você pode lê-lo, incluindo arrays e primitive types.

4.  [Lendo Modificadores](<#/doc/tutorials/reflection/modifiers>)

    Como descobrir os modifiers de uma classe ou de qualquer membro de classe: fields, methods e constructors.

5.  [Lendo e Escrevendo Fields](<#/doc/tutorials/reflection/fields>)

    Um field tem um type e um valor associado para um dado objeto. Métodos na classe Field podem recuperar informações sobre o field, como seu nome, type, modifiers e annotations. Existem também métodos que permitem acesso e modificação dinâmica do valor do field.

6.  [Invocando Methods](<#/doc/tutorials/reflection/methods>)

    Um method contém código executável que pode ser invocado. Methods são herdados e em código não-reflectivo, comportamentos como overloading, overriding e hiding são impostos pelo compiler. Em contraste, o código reflectivo torna possível que a seleção de method seja restrita a uma classe específica sem considerar suas superclasses. Methods de superclasse podem ser acessados, mas é possível determinar sua declaring class; isso é impossível de descobrir programaticamente sem reflection e é a fonte de muitos bugs sutis.

7.  [Invocando Constructors](<#/doc/tutorials/reflection/constructors>)

    Um constructor é usado na criação de um objeto que é uma instância de uma classe. Tipicamente, ele realiza operações necessárias para inicializar a classe antes que methods sejam invocados ou fields sejam acessados. Constructors nunca são herdados.

8.  [Trabalhando com Arrays](<#/doc/tutorials/reflection/arrays>)

    Um array é um objeto de reference type que contém um número fixo de componentes do mesmo type; o length de um array é immutable. Criar uma instância de um array requer conhecimento do length e do component type. Cada componente pode ser um primitive type (como byte, int, ou double), um reference type (como String, Object, ou java.nio.CharBuffer), ou um array. Arrays multi-dimensionais são, na verdade, apenas arrays que contêm componentes de array type.

9.  [Trabalhando com Enumerations](<#/doc/tutorials/reflection/enums>)

    Um enum é um constructo de linguagem que é usado para definir enumerations type-safe que podem ser usadas quando um conjunto fixo de valores nomeados é desejado. Todos os enums implicitamente estendem java.lang.Enum. Enums podem conter um ou mais enum constants, que definem instâncias únicas do enum type. Uma declaração de enum define um enum type que é muito similar a uma class, pois pode ter membros como fields, methods e constructors (com algumas restrições).

10. [Trabalhando com Records](<#/doc/tutorials/reflection/records>)

    Como identificar record types, obter informações sobre seus components e acessar seus fields.

11. [Lendo Annotations](<#/doc/tutorials/reflection/annotations>)

    Como descobrir annotations em elementos de classes e em types.

12. [Criando um Interceptor com Annotations](<#/doc/tutorials/reflection/interceptor>)

    Esta seção o guiará pela criação de um interceptor simples em um service method, usando annotations e a API de Reflection.

13. [Criando um Framework de Dependency Injection](<#/doc/tutorials/reflection/dependency-injection>)

    Esta seção o guiará pela criação de um framework simples de Dependency Injection, usando annotations e a API de Reflection.

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)