# Exceções

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Java SE Specifications](<#/>) > [Java Language Specification](<#/doc/jls/jls-01>)

Capítulo 11. Exceções
---
[Anterior](<#/doc/jls/jls-10>) | | [Próximo](<#/doc/jls/jls-12>)

* * *

# Capítulo 11. Exceções

**Sumário**

[11.1. Os Tipos e Causas de Exceções](<#/doc/jls/jls-11>)


[11.1.1. Os Tipos de Exceções](<#/doc/jls/jls-11>)
[11.1.2. As Causas de Exceções](<#/doc/jls/jls-11>)
[11.1.3. Exceções Assíncronas](<#/doc/jls/jls-11>)
[11.2. Verificação de Exceções em Tempo de Compilação](<#/doc/jls/jls-11>)


[11.2.1. Análise de Exceções de Expressões](<#/doc/jls/jls-11>)
[11.2.2. Análise de Exceções de Declarações e Invocações de Construtores](<#/doc/jls/jls-11>)
[11.2.3. Verificação de Exceções](<#/doc/jls/jls-11>)
[11.3. Tratamento de Exceções em Tempo de Execução](<#/doc/jls/jls-11>)

Quando um programa viola as restrições semânticas da linguagem de programação Java, a Java Virtual Machine sinaliza esse erro ao programa como uma _exceção_.

Um exemplo de tal violação é uma tentativa de indexar fora dos limites de um array. Algumas linguagens de programação e suas implementações reagem a tais erros terminando o programa peremptoriamente; outras linguagens de programação permitem que uma implementação reaja de maneira arbitrária ou imprevisível. Nenhuma dessas abordagens é compatível com os objetivos de design da Plataforma Java SE: fornecer portabilidade e robustez.

Em vez disso, a linguagem de programação Java especifica que uma exceção será lançada quando as restrições semânticas forem violadas e causará uma transferência de controle não local do ponto onde a exceção ocorreu para um ponto que pode ser especificado pelo programador.

Diz-se que uma exceção é _lançada_ do ponto onde ocorreu e é _capturada_ no ponto para o qual o controle é transferido.

Os programas também podem lançar exceções explicitamente, usando declarações `throw` ([§14.18](<#/doc/jls/jls-14>)).

O uso explícito de declarações `throw` oferece uma alternativa ao estilo antiquado de lidar com condições de erro retornando valores estranhos, como o valor inteiro `-1` onde um valor negativo normalmente não seria esperado. A experiência mostra que, com muita frequência, esses valores estranhos são ignorados ou não verificados pelos chamadores, levando a programas que não são robustos, exibem comportamento indesejável ou ambos.

Cada exceção é representada por uma instância da classe `Throwable` ou uma de suas subclasses ([§11.1](<#/doc/jls/jls-11>)). Tal objeto pode ser usado para transportar informações do ponto em que uma exceção ocorre para o manipulador que a captura. Os manipuladores são estabelecidos por cláusulas `catch` de declarações `try` ([§14.20](<#/doc/jls/jls-14>)).

Durante o processo de lançamento de uma exceção, a Java Virtual Machine completa abruptamente, uma por uma, quaisquer expressões, declarações, invocações de métodos e construtores, inicializadores e expressões de inicialização de campo que tenham começado, mas não concluído a execução no thread atual. Este processo continua até que um manipulador seja encontrado que indique que ele manipula aquela exceção particular, nomeando a classe da exceção ou uma superclasse da classe da exceção ([§11.2](<#/doc/jls/jls-11>)). Se nenhum manipulador for encontrado, a exceção pode ser tratada por uma das hierarquias de manipuladores de exceções não capturadas ([§11.3](<#/doc/jls/jls-11>)) - assim, todo esforço é feito para evitar que uma exceção não seja tratada.

O mecanismo de exceção da Plataforma Java SE é integrado ao seu modelo de sincronização ([§17.1](<#/doc/jls/jls-17>)), de modo que os monitores são desbloqueados à medida que as declarações `synchronized` ([§14.19](<#/doc/jls/jls-14>)) e as invocações de métodos `synchronized` ([§8.4.3.6](<#/doc/jls/jls-08>), [§15.12](<#/doc/jls/jls-15>)) são concluídas abruptamente.

## 11.1. Os Tipos e Causas de Exceções

### 11.1.1. Os Tipos de Exceções

Uma exceção é representada por uma instância da classe `Throwable` (uma subclasse direta de `Object`) ou uma de suas subclasses.

`Throwable` e todas as suas subclasses são, coletivamente, as _classes de exceção_.

As classes `Exception` e `Error` são subclasses diretas de `Throwable`:

  * `Exception` é a superclasse de todas as exceções das quais programas comuns podem desejar se recuperar.

A classe `RuntimeException` é uma subclasse direta de `Exception`. `RuntimeException` é a superclasse de todas as exceções que podem ser lançadas por muitas razões durante a avaliação de expressões, mas das quais a recuperação ainda pode ser possível.

`RuntimeException` e todas as suas subclasses são, coletivamente, as _classes de exceção em tempo de execução_.

  * `Error` é a superclasse de todas as exceções das quais programas comuns não são normalmente esperados para se recuperar.

`Error` e todas as suas subclasses são, coletivamente, as _classes de erro_.

As _classes de exceção não verificadas_ são as classes de exceção em tempo de execução e as classes de erro.

As _classes de exceção verificadas_ são todas as classes de exceção, exceto as classes de exceção não verificadas. Ou seja, as classes de exceção verificadas são `Throwable` e todas as suas subclasses, exceto `RuntimeException` e suas subclasses e `Error` e suas subclasses.

Os programas podem usar as classes de exceção preexistentes da API da Plataforma Java SE em declarações `throw`, ou definir classes de exceção adicionais como subclasses de `Throwable` ou de qualquer uma de suas subclasses, conforme apropriado. Para aproveitar a verificação em tempo de compilação para manipuladores de exceção ([§11.2](<#/doc/jls/jls-11>)), é típico definir a maioria das novas classes de exceção como classes de exceção verificadas, ou seja, como subclasses de `Exception` que não são subclasses de `RuntimeException`.

A classe `Error` é uma subclasse separada de `Throwable`, distinta de `Exception` na hierarquia de classes, para permitir que os programas usem o idioma "`} catch (Exception e) {`" ([§11.2.3](<#/doc/jls/jls-11>)) para capturar todas as exceções das quais a recuperação pode ser possível sem capturar erros dos quais a recuperação geralmente não é possível.

Observe que uma subclasse de `Throwable` não pode ser genérica ([§8.1.2](<#/doc/jls/jls-08>)).

### 11.1.2. As Causas de Exceções

Uma exceção é lançada por uma das quatro razões:

  * Uma declaração `throw` ([§14.18](<#/doc/jls/jls-14>)) foi executada.

  * Uma declaração `assert` habilitada foi executada, e a avaliação de sua expressão booleana resultou em `false` ([§14.10](<#/doc/jls/jls-14>)).

  * Uma condição de execução anormal foi detectada sincronicamente pela Java Virtual Machine, a saber:

    * a avaliação de uma expressão viola a semântica normal da linguagem de programação Java ([§15.6](<#/doc/jls/jls-15>)), como uma divisão inteira por zero.

    * ocorre um erro durante o carregamento, vinculação ou inicialização de parte do programa ([§12.2](<#/doc/jls/jls-12>), [§12.3](<#/doc/jls/jls-12>), [§12.4](<#/doc/jls/jls-12>)); neste caso, uma instância de uma subclasse de `LinkageError` é lançada.

    * um erro interno ou limitação de recurso impede que a Java Virtual Machine implemente a semântica da linguagem de programação Java; neste caso, uma instância de uma subclasse de `VirtualMachineError` é lançada.

Essas exceções não são lançadas em um ponto arbitrário do programa, mas sim em um ponto onde são especificadas como um possível resultado de uma avaliação de expressão ou execução de declaração.

  * Ocorreu uma exceção assíncrona ([§11.1.3](<#/doc/jls/jls-11>)).

### 11.1.3. Exceções Assíncronas

A maioria das exceções ocorre sincronicamente como resultado de uma ação pelo thread em que ocorrem, e em um ponto no programa que é especificado para possivelmente resultar em tal exceção. Uma _exceção assíncrona_ é, por outro lado, uma exceção que pode potencialmente ocorrer em qualquer ponto na execução de um programa.

Exceções assíncronas ocorrem apenas como resultado de um erro interno ou limitação de recurso na Java Virtual Machine que a impede de implementar a semântica da linguagem de programação Java. A exceção assíncrona que é lançada é uma instância de uma subclasse de `VirtualMachineError`.

Observe que `StackOverflowError`, uma subclasse de `VirtualMachineError`, pode ser lançada sincronicamente por invocação de método ([§15.12.4.5](<#/doc/jls/jls-15>)) bem como assincronicamente devido à execução de método `native` ou limitações de recurso da Java Virtual Machine. Da mesma forma, `OutOfMemoryError`, outra subclasse de `VirtualMachineError`, pode ser lançada sincronicamente durante a criação de instância de classe ([§15.9.4](<#/doc/jls/jls-15>), [§12.5](<#/doc/jls/jls-12>)), criação de array ([§15.10.2](<#/doc/jls/jls-15>), [§10.6](<#/doc/jls/jls-10>)), inicialização de classe ([§12.4.2](<#/doc/jls/jls-12>)), e conversão boxing ([§5.1.7](<#/doc/jls/jls-05>)), bem como assincronicamente.

A Plataforma Java SE permite que uma quantidade pequena, mas limitada, de execução ocorra antes que uma exceção assíncrona seja lançada.

Exceções assíncronas são raras, mas a compreensão adequada de sua semântica é necessária para que um código de máquina de alta qualidade seja gerado.

O atraso observado acima é permitido para permitir que o código otimizado detecte e lance essas exceções em pontos onde é prático tratá-las, obedecendo à semântica da linguagem de programação Java. Uma implementação simples pode sondar por exceções assíncronas no ponto de cada instrução de transferência de controle. Como um programa tem um tamanho finito, isso fornece um limite para o atraso total na detecção de uma exceção assíncrona. Como nenhuma exceção assíncrona ocorrerá entre as transferências de controle, o gerador de código tem alguma flexibilidade para reordenar a computação entre as transferências de controle para maior desempenho. O artigo _Polling Efficiently on Stock Hardware_ de Marc Feeley, _Proc. 1993 Conference on Functional Programming and Computer Architecture_ , Copenhagen, Dinamarca, pp. 179-187, é recomendado como leitura adicional.

## 11.2. Verificação de Exceções em Tempo de Compilação

A linguagem de programação Java exige que um programa contenha manipuladores para _exceções verificadas_ que podem resultar da execução de um método ou construtor ([§8.4.6](<#/doc/jls/jls-08>), [§8.8.5](<#/doc/jls/jls-08>)). Esta verificação em tempo de compilação para a presença de manipuladores de exceção é projetada para reduzir o número de exceções que não são tratadas adequadamente. Para cada exceção verificada que é um resultado possível, a cláusula `throws` para o método ou construtor deve mencionar a classe dessa exceção ou uma das superclasses da classe dessa exceção ([§11.2.3](<#/doc/jls/jls-11>)).

As classes de exceção verificadas ([§11.1.1](<#/doc/jls/jls-11>)) nomeadas na cláusula `throws` fazem parte do contrato entre o implementador e o usuário do método ou construtor. A cláusula `throws` de um método sobrescrito não pode especificar que este método resultará no lançamento de qualquer exceção verificada que o método sobrescrito não tenha permissão, por sua cláusula `throws`, para lançar ([§8.4.8.3](<#/doc/jls/jls-08>)). Quando interfaces estão envolvidas, mais de uma declaração de método pode ser sobrescrita por uma única declaração de sobrescrita. Neste caso, a declaração de sobrescrita deve ter uma cláusula `throws` que seja compatível com todas as declarações sobrescritas ([§9.4.1](<#/doc/jls/jls-09>)).

As classes de exceção não verificadas ([§11.1.1](<#/doc/jls/jls-11>)) são isentas da verificação em tempo de compilação.

As classes de erro são isentas porque podem ocorrer em muitos pontos do programa e a recuperação delas é difícil ou impossível. Um programa que declarasse tais exceções seria desnecessariamente poluído. Programas sofisticados podem, no entanto, desejar capturar e tentar se recuperar de algumas dessas condições.

As classes de exceção em tempo de execução são isentas porque, no julgamento dos designers da linguagem de programação Java, ter que declarar tais exceções não ajudaria significativamente a estabelecer a correção dos programas. Muitas das operações e construções da linguagem de programação Java podem resultar em exceções em tempo de execução. As informações disponíveis para um compilador Java, e o nível de análise que um compilador realiza, geralmente não são suficientes para estabelecer que tais exceções em tempo de execução não podem ocorrer, mesmo que isso possa ser óbvio para o programador. Exigir que tais classes de exceção sejam declaradas seria simplesmente uma irritação para os programadores.

Por exemplo, certo código pode implementar uma estrutura de dados circular que, por construção, nunca pode envolver referências nulas; o programador pode então ter certeza de que uma `NullPointerException` não pode ocorrer, mas seria difícil para um compilador Java provar isso. A tecnologia de prova de teoremas necessária para estabelecer tais propriedades globais de estruturas de dados está além do escopo desta especificação.

Dizemos que uma declaração ou expressão _pode lançar_ uma classe de exceção E se, de acordo com as regras em [§11.2.1](<#/doc/jls/jls-11>) e [§11.2.2](<#/doc/jls/jls-11>), a execução da declaração ou expressão pode resultar no lançamento de uma exceção da classe E.

Dizemos que uma cláusula `catch` _pode capturar_ suas classes de exceção capturáveis:

  * A classe de exceção capturável de uma cláusula uni-`catch` é o tipo declarado de seu parâmetro de exceção ([§14.20](<#/doc/jls/jls-14>)).

  * As classes de exceção capturáveis de uma cláusula multi-`catch` são as alternativas na união que denota o tipo de seu parâmetro de exceção.

### 11.2.1. Análise de Exceções de Expressões

Uma expressão de criação de instância de classe ([§15.9](<#/doc/jls/jls-15>)) pode lançar uma classe de exceção E se e somente se:

  * A expressão é uma expressão de criação de instância de classe qualificada e a expressão qualificadora pode lançar E; ou

  * Alguma expressão da lista de argumentos pode lançar E; ou

  * E é um dos tipos de exceção do tipo de invocação do construtor escolhido ([§15.12.2.6](<#/doc/jls/jls-15>)); ou

  * A expressão de criação de instância de classe inclui um _ClassBody_ , e algum inicializador de instância ou inicializador de variável de instância no _ClassBody_ pode lançar E.

Uma expressão de invocação de método ([§15.12](<#/doc/jls/jls-15>)) pode lançar uma classe de exceção E se e somente se:

  * A expressão de invocação de método é da forma _Primary_ `.` _[TypeArguments]_ _Identifier_ e a expressão _Primary_ pode lançar E; ou

  * Alguma expressão da lista de argumentos pode lançar E; ou

  * E é um dos tipos de exceção do tipo de invocação do método escolhido ([§15.12.2.6](<#/doc/jls/jls-15>)).

Uma expressão lambda ([§15.27](<#/doc/jls/jls-15>)) não pode lançar classes de exceção.

Uma expressão `switch` ([§15.28](<#/doc/jls/jls-15>)) pode lançar uma classe de exceção E se e somente se:

  * A expressão seletora pode lançar E; ou

  * Alguma expressão de regra `switch`, bloco de regra `switch`, declaração `throw` de regra `switch`, ou grupo de declaração rotulada `switch` no bloco `switch` pode lançar E.

Para qualquer outro tipo de expressão, a expressão pode lançar uma classe de exceção E se e somente se uma de suas subexpressões imediatas puder lançar E.

Observe que uma expressão de referência de método ([§15.13](<#/doc/jls/jls-15>)) da forma _Primary`::` [TypeArguments] Identifier_ pode lançar uma classe de exceção se a subexpressão _Primary_ puder lançar uma classe de exceção. Em contraste, uma expressão lambda não pode lançar nada e não possui subexpressões imediatas para realizar a análise de exceções. É o _corpo_ de uma expressão lambda, contendo expressões e declarações, que pode lançar classes de exceção.

### 11.2.2. Análise de Exceções de Declarações e Invocações de Construtores

Uma declaração `throw` ([§14.18](<#/doc/jls/jls-14>)) cuja expressão lançada tem tipo estático E e não é um parâmetro de exceção `final` ou `effectively final` pode lançar E ou qualquer classe de exceção que a expressão lançada possa lançar.

Por exemplo, a declaração `throw new java.io.FileNotFoundException();` pode lançar apenas `java.io.FileNotFoundException`. Formalmente, não é o caso que ela "pode lançar" uma subclasse ou superclasse de `java.io.FileNotFoundException`.

Uma declaração `throw` cuja expressão lançada é um parâmetro de exceção `final` ou `effectively final` de uma cláusula `catch` C pode lançar uma classe de exceção E se e somente se:

  * E é uma classe de exceção que o bloco `try` da declaração `try` que declara C pode lançar; e

  * E é compatível por atribuição com qualquer uma das classes de exceção capturáveis de C; e

  * E não é compatível por atribuição com nenhuma das classes de exceção capturáveis das cláusulas `catch` declaradas à esquerda de C na mesma declaração `try`.

Uma declaração `try` ([§14.20](<#/doc/jls/jls-14>)) pode lançar uma classe de exceção E se e somente se:

  * O bloco `try` pode lançar E, ou uma expressão usada para inicializar um recurso (em uma declaração `try`-with-resources) pode lançar E, ou a invocação automática do método `close()` de um recurso (em uma declaração `try`-with-resources) pode lançar E, e E não é compatível por atribuição com nenhuma classe de exceção capturável de qualquer cláusula `catch` da declaração `try`, e ou nenhum bloco `finally` está presente ou o bloco `finally` pode ser concluído normalmente; ou

  * Algum bloco `catch` da declaração `try` pode lançar E e ou nenhum bloco `finally` está presente ou o bloco `finally` pode ser concluído normalmente; ou

  * Um bloco `finally` está presente e pode lançar E.

Uma declaração `switch` ([§14.11](<#/doc/jls/jls-14>)) pode lançar uma classe de exceção E se e somente se:

  * A expressão seletora pode lançar E; ou

  * Alguma expressão de regra `switch`, bloco de regra `switch`, declaração `throw` de regra `switch`, ou grupo de declaração rotulada `switch` no bloco `switch` pode lançar E.

Qualquer outra declaração _S_ pode lançar uma classe de exceção E se e somente se uma expressão ou declaração imediatamente contida em _S_ puder lançar E.

Uma invocação de construtor ([§8.8.7.1](<#/doc/jls/jls-08>)) pode lançar uma classe de exceção E se e somente se:

  * Alguma expressão da lista de parâmetros da invocação do construtor pode lançar E; ou

  * E é determinada como uma classe de exceção da cláusula `throws` do construtor que é invocado ([§15.12.2.6](<#/doc/jls/jls-15>)).

### 11.2.3. Verificação de Exceções

É um erro em tempo de compilação se um corpo de método ou construtor _pode lançar_ alguma classe de exceção E quando E é uma classe de exceção verificada e E não é uma subclasse de alguma classe declarada na cláusula `throws` do método ou construtor.

É um erro em tempo de compilação se um corpo lambda _pode lançar_ alguma classe de exceção E quando E é uma classe de exceção verificada e E não é uma subclasse de alguma classe declarada na cláusula `throws` do tipo de função visado pela expressão lambda.

É um erro em tempo de compilação se um inicializador de variável de classe ([§8.3.2](<#/doc/jls/jls-08>)) ou inicializador estático ([§8.7](<#/doc/jls/jls-08>)) de uma classe ou interface nomeada _pode lançar_ uma classe de exceção verificada.

É um erro em tempo de compilação se um inicializador de variável de instância ([§8.3.2](<#/doc/jls/jls-08>)) ou inicializador de instância ([§8.6](<#/doc/jls/jls-08>)) de uma classe nomeada _pode lançar_ uma classe de exceção verificada, a menos que a classe nomeada tenha pelo menos um construtor explicitamente declarado e a classe de exceção ou uma de suas superclasses seja explicitamente declarada na cláusula `throws` de cada construtor.

Observe que nenhum erro em tempo de compilação ocorre se um inicializador de variável de instância ou inicializador de instância de uma classe anônima ([§15.9.5](<#/doc/jls/jls-15>)) puder lançar uma classe de exceção. Em uma classe nomeada, é responsabilidade do programador propagar informações sobre quais classes de exceção podem ser lançadas pelos inicializadores, declarando uma cláusula `throws` adequada em qualquer declaração de construtor explícito. Essa relação entre as classes de exceção verificadas lançadas pelos inicializadores de uma classe e as classes de exceção verificadas declaradas pelos construtores de uma classe é assegurada para uma declaração de classe anônima, porque nenhuma declaração de construtor explícito é possível e um compilador Java sempre gera um construtor com uma cláusula `throws` adequada para a declaração de classe anônima com base nas classes de exceção verificadas que seus inicializadores podem lançar.

É um erro em tempo de compilação se uma cláusula `catch` _pode capturar_ a classe de exceção verificada E1 e não for o caso que o bloco `try` correspondente à cláusula `catch` _pode lançar_ uma classe de exceção verificada que seja uma subclasse ou superclasse de E1, a menos que E1 seja `Exception` ou uma superclasse de `Exception`.

É um erro em tempo de compilação se uma cláusula `catch` _pode capturar_ uma classe de exceção E1 e uma cláusula `catch` precedente da declaração `try` imediatamente envolvente _pode capturar_ E1 ou uma superclasse de E1.

Um compilador Java é encorajado a emitir um aviso se uma cláusula `catch` pode capturar a classe de exceção verificada E1 e o bloco `try` correspondente à cláusula `catch` pode lançar a classe de exceção verificada E2, onde E2 `<:` E1, e uma cláusula `catch` precedente da declaração `try` imediatamente envolvente pode capturar a classe de exceção verificada E3, onde E2 `<:` E3 `<:` E1.

**Exemplo 11.2.3-1. Capturando Exceções Verificadas**
```
    import java.io.FileNotFoundException;
    import java.io.IOException;
    
    class StaticallyThrownExceptionsIncludeSubtypes {
        public static void main(String[] args) {
            try {
                throw new FileNotFoundException();
            } catch (IOException ioe) {
                // "catch IOException" catches IOException
                // and any subtype.
            }
    
            try {
                throw new FileNotFoundException();
                  // Statement "can throw" FileNotFoundException.
                  // It is not the case that statement "can throw"
                  // a subtype or supertype of FileNotFoundException.
            } catch (FileNotFoundException fnfe) {
                // ... Handle exception ...
            } catch (IOException ioe) {
                // Legal, but compilers are encouraged to give
                // warnings as of Java SE 7, because all subtypes of
                // IOException that the try block "can throw" have
                // already been caught by the prior catch clause.
            }
    
            try {
                m();
                  // m's declaration says "throws IOException", so
                  // m "can throw" IOException. It is not the case
                  // that m "can throw" a subtype or supertype of
                  // IOException (e.g. Exception).
            } catch (FileNotFoundException fnfe) {
                // Legal, because the dynamic type of the exception
                // might be FileNotFoundException.
            } catch (IOException ioe) {
                // Legal, because the dynamic type of the exception
                // might be a different subtype of IOException.
            } catch (Throwable t) {
                // Can always catch Throwable.
            }
        }
    
        static void m() throws IOException {
            throw new FileNotFoundException();
        }
    }
    
    
```

Pelas regras acima, cada alternativa em uma cláusula multi-`catch` ([§14.20](<#/doc/jls/jls-14>)) deve ser capaz de capturar alguma classe de exceção lançada pelo bloco `try` e não capturada por cláusulas `catch` anteriores. Por exemplo, a segunda cláusula `catch` abaixo causaria um erro em tempo de compilação porque a análise de exceção determina que `SubclassOfFoo` já é capturada pela primeira cláusula `catch`:
```
    try { ... }
    catch (Foo f) { ... }
    catch (Bar | SubclassOfFoo e) { ... }
    
```
## 11.3. Manipulação de Exceções em Tempo de Execução

Quando uma exceção é lançada ([§14.18](<#/doc/jls/jls-14>)), o controle é transferido do código que causou a exceção para a cláusula `catch` dinamicamente envolvente mais próxima, se houver, de uma instrução `try` ([§14.20](<#/doc/jls/jls-14>)) que possa manipular a exceção.

Uma instrução ou expressão é _dinamicamente envolvida_ por uma cláusula `catch` se ela aparece dentro do bloco `try` da instrução `try` da qual a cláusula `catch` faz parte, ou se o chamador da instrução ou expressão é dinamicamente envolvido pela cláusula `catch`.

O chamador de uma instrução ou expressão depende de onde ela ocorre:

  * Se dentro de um método, então o chamador é a expressão de invocação de método ([§15.12](<#/doc/jls/jls-15>)) que foi executada para fazer com que o método fosse invocado.

  * Se dentro de um construtor ou de um inicializador de instância ou do inicializador para uma variável de instância, então o chamador é a expressão de criação de instância de classe ([§15.9](<#/doc/jls/jls-15>)) ou a invocação do método `newInstance` que foi executada para fazer com que um objeto fosse criado.

  * Se dentro de um inicializador `static` ou de um inicializador para uma variável `static`, então o chamador é a expressão que usou a classe ou interface de modo a fazer com que ela fosse inicializada ([§12.4](<#/doc/jls/jls-12>)).

Se uma cláusula `catch` específica _pode manipular_ uma exceção é determinado comparando a classe do objeto que foi lançado com as classes de exceção capturáveis da cláusula `catch`. A cláusula `catch` pode manipular a exceção se uma de suas classes de exceção capturáveis for a classe da exceção ou uma superclasse da classe da exceção.

Equivalentemente, uma cláusula `catch` capturará qualquer objeto de exceção que seja um `instanceof` ([§15.20.2](<#/doc/jls/jls-15>)) de uma de suas classes de exceção capturáveis.

A transferência de controle que ocorre quando uma exceção é lançada causa a conclusão abrupta de expressões ([§15.6](<#/doc/jls/jls-15>)) e instruções ([§14.1](<#/doc/jls/jls-14>)) até que uma cláusula `catch` capaz de manipular a exceção seja encontrada; a execução então continua executando o bloco dessa cláusula `catch`. O código que causou a exceção nunca é retomado.

Todas as exceções (síncronas e assíncronas) são _precisas_: quando a transferência de controle ocorre, todos os efeitos das instruções executadas e expressões avaliadas antes do ponto de onde a exceção é lançada devem parecer ter ocorrido. Nenhuma expressão, instrução ou parte delas que ocorra após o ponto de onde a exceção é lançada pode parecer ter sido avaliada.

Se o código otimizado executou especulativamente algumas das expressões ou instruções que seguem o ponto em que a exceção ocorre, tal código deve estar preparado para ocultar essa execução especulativa do estado visível ao usuário do programa.

Se nenhuma cláusula `catch` que possa manipular uma exceção for encontrada, então a thread atual (a thread que encontrou a exceção) é terminada. Antes da terminação, todas as cláusulas `finally` são executadas e a exceção não capturada é manipulada de acordo com as seguintes regras:

  * Se a thread atual tiver um manipulador de exceção não capturada definido, então esse manipulador é executado.

  * Caso contrário, o método `uncaughtException` é invocado para o `ThreadGroup` que é o pai da thread atual. Se o `ThreadGroup` e seus `ThreadGroup`s pai não sobrescreverem `uncaughtException`, então o método `uncaughtException` do manipulador padrão é invocado.

Em situações onde é desejável garantir que um bloco de código seja sempre executado após outro, mesmo que esse outro bloco de código seja concluído abruptamente, uma instrução `try` com uma cláusula `finally` ([§14.20.2](<#/doc/jls/jls-14>)) pode ser usada.

Se um bloco `try` ou `catch` em uma instrução `try`-`finally` ou `try`-`catch`-`finally` for concluído abruptamente, então a cláusula `finally` é executada durante a propagação da exceção, mesmo que nenhuma cláusula `catch` correspondente seja finalmente encontrada.

Se uma cláusula `finally` é executada devido à conclusão abrupta de um bloco `try` e a própria cláusula `finally` é concluída abruptamente, então a razão para a conclusão abrupta do bloco `try` é descartada e a nova razão para a conclusão abrupta é propagada a partir daí.

As regras exatas para conclusão abrupta e para a captura de exceções são especificadas em detalhes com a especificação de cada instrução em [§14 (_Blocks, Statements, and Patterns_)](<#/doc/jls/jls-14>) e para expressões em [§15 (_Expressions_)](<#/doc/jls/jls-15>) (especialmente [§15.6](<#/doc/jls/jls-15>)).

**Exemplo 11.3-1. Lançando e Capturando Exceções**

O programa a seguir declara uma classe de exceção `TestException`. O método `main` da classe `Test` invoca o método `thrower` quatro vezes, fazendo com que exceções sejam lançadas em três das quatro vezes. A instrução `try` no método `main` captura cada exceção que o `thrower` lança. Independentemente de a invocação de `thrower` ser concluída normalmente ou abruptamente, uma mensagem é impressa descrevendo o que aconteceu.
```java
    class TestException extends Exception {
        TestException()         { super(); }
        TestException(String s) { super(s); }
    }
    
    class Test {
        public static void main(String[] args) {
            for (String arg : args) {
                try {
                    thrower(arg);
                    System.out.println("Test \"" + arg +
                                       "\" didn't throw an exception");
                } catch (Exception e) {
                    System.out.println("Test \"" + arg +
                                       "\" threw a " + e.getClass() +
                                       "\n    with message: " +
                                       e.getMessage());
                }
            }
        }
        static int thrower(String s) throws TestException {
            try {
                if (s.equals("divide")) {
                    int i = 0;
                    return i/i;
                }
                if (s.equals("null")) {
                    s = null;
                    return s.length();
                }
                if (s.equals("test")) {
                    throw new TestException("Test message");
                }
                return 0;
            } finally {
                System.out.println("[thrower(\"" + s + "\") done]");
            }
        }
    }
    
```

Se executarmos o programa, passando os argumentos:
```
    divide null not test
    
```

ele produz a saída:
```
    [thrower("divide") done]
    Test "divide" threw a class java.lang.ArithmeticException
        with message: / by zero
    [thrower("null") done]
    Test "null" threw a class java.lang.NullPointerException
        with message: null
    [thrower("not") done]
    Test "not" didn't throw an exception
    [thrower("test") done]
    Test "test" threw a class TestException
        with message: Test message
    
```

A declaração do método `thrower` deve ter uma cláusula `throws` porque ele pode lançar instâncias de `TestException`, que é uma classe de exceção verificada ([§11.1.1](<#/doc/jls/jls-11>)). Um erro em tempo de compilação ocorreria se a cláusula `throws` fosse omitida.

Observe que a cláusula `finally` é executada em cada invocação de `thrower`, ocorra ou não uma exceção, como mostrado pela saída "`[thrower(...) done]`" que ocorre para cada invocação.

* * *

[Prev](<#/doc/jls/jls-10>) | | [Next](<#/doc/jls/jls-12>)
---|---|---
Chapter 10. Arrays | [Home](<#/doc/jls/jls-01>) | Chapter 12. Execution

* * *

[ Legal Notice ](<#/>)