# Execução

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Especificações Java SE](<#/>) > [Especificação da Linguagem Java](<#/doc/jls/jls-01>)

Capítulo 12. Execução
---
[Anterior](<#/doc/jls/jls-11>) | | [Próximo](<#/doc/jls/jls-13>)
* * *

# Capítulo 12. Execução

**Sumário**

[12.1. Inicialização da Java Virtual Machine](<#/doc/jls/jls-12>)
    

[12.1.1. Carregar a Classe ou Interface Inicial](<#/doc/jls/jls-12>)
[12.1.2. Vincular a Classe ou Interface Inicial: Verificar, Preparar, (Opcionalmente) Resolver](<#/doc/jls/jls-12>)
[12.1.3. Inicializar a Classe ou Interface Inicial: Executar Inicializadores](<#/doc/jls/jls-12>)
[12.1.4. Invocar um Método `main`](<#/doc/jls/jls-12>)
[12.2. Carregamento de Classes e Interfaces](<#/doc/jls/jls-12>)
    

[12.2.1. O Processo de Carregamento](<#/doc/jls/jls-12>)
[12.2.2. Consistência do Class Loader](<#/doc/jls/jls-12>)
[12.3. Vinculação de Classes e Interfaces](<#/doc/jls/jls-12>)
    

[12.3.1. Verificação da Representação Binária](<#/doc/jls/jls-12>)
[12.3.2. Preparação de uma Classe ou Interface](<#/doc/jls/jls-12>)
[12.3.3. Resolução de Referências Simbólicas](<#/doc/jls/jls-12>)
[12.4. Inicialização de Classes e Interfaces](<#/doc/jls/jls-12>)
    

[12.4.1. Quando a Inicialização Ocorre](<#/doc/jls/jls-12>)
[12.4.2. Procedimento Detalhado de Inicialização](<#/doc/jls/jls-12>)
[12.5. Criação de Novas Instâncias de Classe](<#/doc/jls/jls-12>)
[12.6. Finalização de Instâncias de Classe](<#/doc/jls/jls-12>)
    

[12.6.1. Implementando a Finalização](<#/doc/jls/jls-12>)
[12.6.2. Interação com o Modelo de Memória](<#/doc/jls/jls-12>)
[12.7. Descarregamento de Classes e Interfaces](<#/doc/jls/jls-12>)
[12.8. Saída do Programa](<#/doc/jls/jls-12>)

Este capítulo especifica as atividades que ocorrem durante a execução de um programa. Ele é organizado em torno do ciclo de vida da Java Virtual Machine e das classes, interfaces e objetos que formam um programa.

A Java Virtual Machine inicia carregando uma classe ou interface especificada, e então invocando um método `main` nesta classe ou interface especificada. A Seção [§12.1](<#/doc/jls/jls-12>) descreve as etapas de carregamento, vinculação e inicialização envolvidas na execução deste método, como uma introdução aos conceitos deste capítulo. Seções posteriores especificam os detalhes de carregamento ([§12.2](<#/doc/jls/jls-12>)), vinculação ([§12.3](<#/doc/jls/jls-12>)) e inicialização ([§12.4](<#/doc/jls/jls-12>)).

O capítulo continua com uma especificação dos procedimentos para criação de novas instâncias de classe ([§12.5](<#/doc/jls/jls-12>)); e finalização de instâncias de classe ([§12.6](<#/doc/jls/jls-12>)). Ele conclui descrevendo o descarregamento de classes ([§12.7](<#/doc/jls/jls-12>)) e o procedimento seguido quando um programa é encerrado ([§12.8](<#/doc/jls/jls-12>)).

## 12.1. Inicialização da Java Virtual Machine

A Java Virtual Machine inicia a execução invocando um método `main` de alguma classe ou interface especificada. Se este método tiver um parâmetro formal, ele recebe um único argumento que é um array de strings.

A semântica precisa da inicialização da Java Virtual Machine é dada no Capítulo 5 de _The Java Virtual Machine Specification, Java SE 25 Edition_. Aqui apresentamos uma visão geral do processo do ponto de vista da linguagem de programação Java.

A maneira pela qual a classe ou interface inicial é especificada para a Java Virtual Machine está além do escopo desta especificação, mas é típico, em ambientes de host que usam linhas de comando, que o nome totalmente qualificado da classe ou interface inicial seja especificado como um argumento de linha de comando e que os argumentos de linha de comando seguintes sejam usados como strings que são tomadas como os componentes de um array que é passado como um argumento para o método `main`. Se a unidade de compilação original era uma unidade de compilação compacta ([§7.3](<#/doc/jls/jls-07>)), então o nome do arquivo que continha a unidade de compilação, menos qualquer extensão, é tipicamente usado para especificar o nome da classe ou interface inicial.

Por exemplo, em uma implementação UNIX, a linha de comando:
```
    java Test reboot Bob Dot Enzo
    
```
tipicamente iniciará uma Java Virtual Machine invocando um método `main` da classe `Test` (uma classe em um pacote sem nome), passando-lhe um array de argumentos contendo as quatro strings "`reboot`", "`Bob`", "`Dot`" e "`Enzo`".

Enquanto que se o arquivo `HelloWorld.java` contivesse a seguinte unidade de compilação compacta:
```
    
    void main() {
        System.out.println("Hello, World!");
    }
    
```
que foi compilada, então a linha de comando:
```
    java HelloWorld
    
```
tipicamente iniciará uma Java Virtual Machine invocando o método `main` da classe implicitamente declarada ([§8.1.8](<#/doc/jls/jls-08>)), produzindo a saída:
```
    Hello, World!
    
```
Agora descrevemos as etapas que a Java Virtual Machine pode tomar para executar a classe ou interface inicial; estas são descritas mais detalhadamente em seções posteriores.

### 12.1.1. Carregar a Classe ou Interface Inicial

A tentativa de executar um método `main` da classe ou interface inicial descobre que ela não está carregada - ou seja, que a Java Virtual Machine não contém atualmente uma representação binária para esta classe ou interface. A Java Virtual Machine então usa um class loader para tentar encontrar tal representação binária. Se este processo falhar, um erro é lançado. Este processo de carregamento é descrito mais detalhadamente em [§12.2](<#/doc/jls/jls-12>).

### 12.1.2. Vincular a Classe ou Interface Inicial: Verificar, Preparar, (Opcionalmente) Resolver

Depois que a classe ou interface é carregada, ela deve ser inicializada antes que um método `main` possa ser invocado. A classe inicial, como todas as classes e interfaces, deve ser vinculada antes de ser inicializada. A vinculação envolve verificação, preparação e (opcionalmente) resolução. A vinculação é descrita mais detalhadamente em [§12.3](<#/doc/jls/jls-12>).

A verificação checa se a representação carregada da classe ou interface inicial está bem formada, com uma tabela de símbolos apropriada. A verificação também checa se o código que implementa a classe ou interface inicial obedece aos requisitos semânticos da linguagem de programação Java e da Java Virtual Machine. Se um problema for detectado durante a verificação, um erro é lançado. A verificação é descrita mais detalhadamente em [§12.3.1](<#/doc/jls/jls-12>).

A preparação envolve a alocação de armazenamento estático e quaisquer estruturas de dados que são usadas internamente pela implementação da Java Virtual Machine, como tabelas de métodos. A preparação é descrita mais detalhadamente em [§12.3.2](<#/doc/jls/jls-12>).

A resolução é o processo de verificar referências simbólicas da classe ou interface inicial para outras classes e interfaces, carregando as outras classes e interfaces que são mencionadas e verificando se as referências estão corretas.

A etapa de resolução é opcional no momento da vinculação inicial. Uma implementação pode resolver referências simbólicas de uma classe ou interface que está sendo vinculada muito cedo, até o ponto de resolver todas as referências simbólicas das classes e interfaces que são referenciadas posteriormente, recursivamente. (Esta resolução pode resultar em erros dessas etapas adicionais de carregamento e vinculação.) Esta escolha de implementação representa um extremo e é semelhante ao tipo de vinculação "estática" que tem sido feita por muitos anos em implementações simples da linguagem C. (Nessas implementações, um programa compilado é tipicamente representado como um arquivo "`a.out`" que contém uma versão totalmente vinculada do programa, incluindo links completamente resolvidos para rotinas de biblioteca usadas pelo programa. Cópias dessas rotinas de biblioteca são incluídas no arquivo "`a.out`".)

Uma implementação pode, em vez disso, optar por resolver uma referência simbólica apenas quando ela é usada ativamente; o uso consistente desta estratégia para todas as referências simbólicas representaria a forma "mais preguiçosa" de resolução. Neste caso, se a classe ou interface inicial tivesse várias referências simbólicas a outra classe, então as referências poderiam ser resolvidas uma de cada vez, à medida que são usadas, ou talvez nem mesmo, se essas referências nunca fossem usadas durante a execução do programa.

O único requisito sobre quando a resolução é realizada é que quaisquer erros detectados durante a resolução devem ser lançados em um ponto do programa onde alguma ação é tomada pelo programa que possa, direta ou indiretamente, exigir vinculação à classe ou interface envolvida no erro. Usando a escolha de implementação de exemplo "estática" descrita acima, erros de carregamento e vinculação poderiam ocorrer antes que o programa fosse executado se envolvessem uma classe ou interface mencionada na classe ou interface inicial ou em qualquer uma das classes e interfaces referenciadas recursivamente. Em um sistema que implementasse a resolução "mais preguiçosa", esses erros seriam lançados apenas quando uma referência simbólica incorreta fosse usada ativamente.

O processo de resolução é descrito mais detalhadamente em [§12.3.3](<#/doc/jls/jls-12>).

### 12.1.3. Inicializar a Classe ou Interface Inicial: Executar Inicializadores

Nesta fase, a Java Virtual Machine ainda está tentando executar um método `main` da classe ou interface inicial. Isso é permitido apenas se a classe ou interface tiver sido inicializada ([§12.4.1](<#/doc/jls/jls-12>)).

A inicialização consiste na execução de quaisquer inicializadores de variáveis de classe e inicializadores estáticos da classe ou interface inicial, em ordem textual. Mas antes que possa ser inicializada, sua superclasse direta deve ser inicializada, assim como a superclasse direta de sua superclasse direta, e assim por diante, recursivamente. No caso mais simples, a classe inicial tem `Object` como sua superclasse direta implícita; se a classe `Object` ainda não foi inicializada, então ela deve ser inicializada antes que a classe ou interface inicial seja inicializada. A classe `Object` não tem superclasse, então a recursão termina aqui.

Se a classe inicial tiver outra classe `Super` como sua superclasse, então `Super` deve ser inicializada antes da classe inicial. Isso requer carregar, verificar e preparar `Super` se isso ainda não foi feito e, dependendo da implementação, também pode envolver a resolução das referências simbólicas de `Super` e assim por diante, recursivamente.

A inicialização pode, portanto, causar erros de carregamento, vinculação e inicialização, incluindo tais erros envolvendo outras classes e interfaces.

O processo de inicialização é descrito mais detalhadamente em [§12.4](<#/doc/jls/jls-12>).

### 12.1.4. Invocar um Método `main`

Finalmente, após a conclusão da inicialização da classe ou interface inicial (durante a qual outros carregamentos, vinculações e inicializações consequentes podem ter ocorrido), um método `main` declarado em, ou herdado por, a classe ou interface inicial é invocado.

Um método `main` declarado em, ou herdado por, uma dada classe é um _método `main` candidato_ se:

  * Ele tem um único parâmetro formal ([§8.4.1](<#/doc/jls/jls-08>)) cujo tipo declarado é um array de `String`, um resultado `void`, e acesso `public`, `protected` ou de pacote; ou

  * Ele não tem parâmetros formais, um resultado `void`, e acesso `public`, `protected` ou de pacote.

Note que um método `main` candidato pode ser um método `static` ou de instância. Ele pode opcionalmente ter uma cláusula `throws` ([§8.4.6](<#/doc/jls/jls-08>)). O tipo do único parâmetro formal pode ser dado como `String[]` ou `String...`, pois eles denotam o mesmo tipo.

A forma de um método `main` candidato expandiu significativamente no Java SE 25. Antes disso, ele tinha que ser `public`, `static` e ter um único parâmetro formal; a única variação possível era `String[]` versus `String...` para o tipo do único parâmetro formal.

Note que _não_ é um erro em tempo de compilação se a classe ou interface inicial contar com mais de um método `main` candidato entre seus membros.

A presença de um método `main` candidato em uma classe ou interface pode não ser imediatamente aparente porque ele pode ser herdado. Por exemplo, um método `default` em uma interface é um método de instância ([§9.4](<#/doc/jls/jls-09>)), então pode ser um método `main` candidato quando herdado por uma classe que implementa a interface.

Um método `main` candidato da classe ou interface inicial é invocado como se pela aplicação das seguintes regras:

  * Se houver um método `main` candidato com um único parâmetro formal, então este método é invocado. Se este método for `static`, ele é invocado diretamente, passando o array de argumentos ([§12.1](<#/doc/jls/jls-12>)). Se o método `main` candidato for um método de instância, então primeiro uma instância da classe inicial deve ser criada. Esta instância de classe é o resultado da avaliação de uma expressão de criação de instância de classe não qualificada ([§15.9](<#/doc/jls/jls-15>)) sem argumentos de tipo, sem argumentos reais, sem corpo de classe, e onde o _ClassOrInterfaceTypeToInstantiate_ é o nome da classe inicial. O método `main` candidato é então invocado na instância resultante, passando o array de argumentos.

  * Caso contrário, se houver um método `main` candidato sem parâmetros formais, então este método é invocado. Se este método for `static`, ele é invocado diretamente. Se o método `main` candidato for um método de instância, então primeiro uma instância da classe inicial deve ser criada. Esta instância de classe é o resultado da avaliação de uma expressão de criação de instância de classe não qualificada ([§15.9](<#/doc/jls/jls-15>)) sem argumentos de tipo, sem argumentos reais, sem corpo de classe, e onde o _ClassOrInterfaceTypeToInstantiate_ é o nome da classe inicial. O método `main` candidato é então invocado na instância resultante sem argumentos reais.

Note que não é possível para uma classe ter um método `static` e um método de instância com a mesma assinatura ([§8.4.2](<#/doc/jls/jls-08>)).

Se não houver método `main` candidato para invocar, ou se a criação de uma instância da classe inicial ao invocar um método `main` de instância falhar, então a execução falha; o comportamento preciso de uma implementação neste caso está além do escopo desta especificação.

## 12.2. Carregamento de Classes e Interfaces

_Carregamento_ refere-se ao processo de encontrar a forma binária de uma classe ou interface com um nome particular, talvez calculando-a em tempo real, mas mais tipicamente recuperando uma representação binária previamente calculada a partir do código-fonte por um compilador Java, e construindo, a partir dessa forma binária, um objeto `Class` para representar a classe ou interface ([§1.4](<#/doc/jls/jls-01>)).

A semântica precisa do carregamento é dada no Capítulo 5 de _The Java Virtual Machine Specification, Java SE 25 Edition_. Aqui apresentamos uma visão geral do processo do ponto de vista da linguagem de programação Java.

A representação binária de uma classe ou interface é normalmente o formato de arquivo `class` descrito no Capítulo 4 de _The Java Virtual Machine Specification, Java SE 25 Edition_, mas outras representações são possíveis, desde que atendam aos requisitos especificados em [§13.1](<#/doc/jls/jls-13>).

### 12.2.1. O Processo de Carregamento

O processo de carregamento é implementado pela classe `ClassLoader` e suas subclasses. O método `defineClass` da classe `ClassLoader` pode ser usado para construir objetos `Class` a partir de representações binárias no formato de arquivo `class` ([§1.4](<#/doc/jls/jls-01>)).

Diferentes subclasses de `ClassLoader` podem implementar diferentes políticas de carregamento. Em particular, um class loader pode armazenar em cache representações binárias de classes e interfaces, pré-carregá-las com base no uso esperado, ou carregar um grupo de classes relacionadas juntas. Essas atividades podem não ser completamente transparentes para uma aplicação em execução se, por exemplo, uma versão recém-compilada de uma classe não for encontrada porque uma versão mais antiga está em cache por um class loader. É responsabilidade de um class loader, no entanto, refletir erros de carregamento apenas em pontos do programa onde eles poderiam ter surgido sem pré-carregamento ou carregamento em grupo.

Se ocorrer um erro durante o carregamento da classe, uma instância de uma das seguintes subclasses da classe `LinkageError` será lançada em qualquer ponto do programa que (direta ou indiretamente) use a classe ou interface solicitada:

  * `ClassCircularityError`: Uma classe ou interface solicitada não pôde ser carregada porque seria sua própria superclasse ou superinterface ([§8.1.4](<#/doc/jls/jls-08>), [§9.1.3](<#/doc/jls/jls-09>), [§13.4.4](<#/doc/jls/jls-13>)).

  * `ClassFormatError`: Os dados binários que pretendem especificar uma classe ou interface compilada solicitada estão malformados.

  * `NoClassDefFoundError`: Nenhuma definição para uma classe ou interface solicitada pôde ser encontrada pelo class loader relevante.

Como o carregamento envolve a alocação de novas estruturas de dados, ele pode falhar com um `OutOfMemoryError`.

### 12.2.2. Consistência do Class Loader

Class loaders bem-comportados mantêm estas propriedades:

  * Dado o mesmo nome, um class loader deve sempre retornar o mesmo objeto `Class`.

  * Se um class loader `L1` delega o carregamento de uma classe ou interface C para outro loader `L2`, então para qualquer classe ou interface D que seja nomeada pelo tipo de superclasse direta de C, ou por um tipo de superinterface direta de C, ou pelo tipo de um campo em C, ou pelo tipo de um parâmetro formal de um método ou construtor em C, `L1` e `L2` devem retornar o mesmo objeto `Class` para D.

Um class loader malicioso poderia violar essas propriedades. No entanto, ele não poderia minar a segurança do sistema de tipos, porque a Java Virtual Machine se protege contra isso.

Para mais discussões sobre esses tópicos, consulte _The Java Virtual Machine Specification, Java SE 25 Edition_ e o artigo _Dynamic Class Loading in the Java Virtual Machine_, de Sheng Liang e Gilad Bracha, em _Proceedings of OOPSLA '98_, publicado como _ACM SIGPLAN Notices_, Volume 33, Número 10, Outubro de 1998, páginas 36-44. Um princípio básico do design da linguagem de programação Java é que o sistema de tipos em tempo de execução não pode ser subvertido por código escrito na linguagem de programação Java, nem mesmo por implementações de classes de sistema sensíveis como `ClassLoader`.
## 12.3. Vinculação de Classes e Interfaces

_Vinculação_ é o processo de pegar uma forma binária de uma class ou interface e combiná-la com o estado de tempo de execução da Java Virtual Machine, para que possa ser executada. Uma class ou interface é sempre carregada antes de ser vinculada.

A semântica precisa da vinculação é dada no Capítulo 5 de _The Java Virtual Machine Specification, Java SE 25 Edition_. Aqui apresentamos uma visão geral do processo do ponto de vista da linguagem de programação Java.

Três atividades diferentes estão envolvidas na vinculação: verificação, preparação e resolução de referências simbólicas.

Esta especificação permite flexibilidade a uma implementação quanto a quando as atividades de vinculação (e, devido à recursão, carregamento) ocorrem, desde que a semântica da linguagem de programação Java seja respeitada, que uma class ou interface seja completamente verificada e preparada antes de ser inicializada, e que erros detectados durante a vinculação sejam lançados em um ponto do programa onde alguma ação é tomada pelo programa que possa exigir a vinculação à class ou interface envolvida no erro.

Por exemplo, uma implementação pode optar por resolver cada referência simbólica em uma class ou interface individualmente, apenas quando ela é usada (resolução preguiçosa ou tardia), ou por resolvê-las todas de uma vez enquanto a class está sendo verificada (resolução estática). Isso significa que o processo de resolução pode continuar, em algumas implementações, depois que uma class ou interface foi inicializada.

Como a vinculação envolve a alocação de novas estruturas de dados, ela pode falhar com um `OutOfMemoryError`.

### 12.3.1. Verificação da Representação Binária

_Verificação_ garante que a representação binária de uma class ou interface esteja estruturalmente correta. Por exemplo, ela verifica se cada instrução possui um código de operação válido; se cada instrução de desvio desvia para o início de alguma outra instrução, em vez de para o meio de uma instrução; se cada método é fornecido com uma assinatura estruturalmente correta; e se cada instrução obedece à disciplina de tipos da Java Virtual Machine.

Se ocorrer um erro durante a verificação, uma instância da seguinte subclasse da class `LinkageError` será lançada no ponto do programa que causou a verificação da class:

  * `VerifyError`: A definição binária para uma class ou interface falhou ao passar por um conjunto de verificações exigidas para atestar que ela obedece à semântica da linguagem da Java Virtual Machine e que não pode violar a integridade da Java Virtual Machine. (Veja [§13.4.2](<#/doc/jls/jls-13>), [§13.4.4](<#/doc/jls/jls-13>), [§13.4.9](<#/doc/jls/jls-13>), e [§13.4.17](<#/doc/jls/jls-13>) para alguns exemplos.)

### 12.3.2. Preparação de uma Classe ou Interface

_Preparação_ envolve a criação dos campos `static` (variáveis de class e constantes) para uma class ou interface e a inicialização de tais campos com os valores padrão ([§4.12.5](<#/doc/jls/jls-04>)). Isso não requer a execução de nenhum código-fonte; inicializadores explícitos para campos `static` são executados como parte da inicialização ([§12.4](<#/doc/jls/jls-12>)), não da preparação.

Implementações da Java Virtual Machine podem pré-computar estruturas de dados adicionais no momento da preparação para tornar operações posteriores em uma class ou interface mais eficientes. Uma estrutura de dados particularmente útil é uma "tabela de métodos" ou outra estrutura de dados que permite que qualquer método seja invocado em instâncias de uma class sem exigir uma busca em superclasses no momento da invocação.

### 12.3.3. Resolução de Referências Simbólicas

A representação binária de uma class ou interface referencia outras classes e interfaces e seus campos, métodos e construtores simbolicamente, usando os nomes binários ([§13.1](<#/doc/jls/jls-13>)) das outras classes e interfaces. Para campos e métodos, essas referências simbólicas incluem o nome da class ou interface da qual o campo ou método é membro, bem como o nome do próprio campo ou método, juntamente com informações de tipo apropriadas.

Antes que uma referência simbólica possa ser usada, ela deve passar por resolução, na qual uma referência simbólica é verificada quanto à sua correção e, tipicamente, substituída por uma referência direta que pode ser processada de forma mais eficiente se a referência for usada repetidamente.

Se ocorrer um erro durante a resolução, um erro será lançado. Mais tipicamente, esta será uma instância de uma das seguintes subclasses da class `IncompatibleClassChangeError`, mas também pode ser uma instância de alguma outra subclasse de `IncompatibleClassChangeError` ou mesmo uma instância da própria class `IncompatibleClassChangeError`. Este erro pode ser lançado em qualquer ponto do programa que use uma referência simbólica, direta ou indiretamente:

  * `IllegalAccessError`: Uma referência simbólica foi encontrada que especifica um uso ou atribuição de um campo, ou invocação de um método, ou criação de uma instância de uma class, à qual o código que contém a referência não tem acesso porque o campo ou método foi declarado com acesso `private`, `protected` ou de pacote (não `public`), ou porque a class não foi declarada `public` em um pacote que é exportado ou aberto para o código que contém a referência.

Isso pode ocorrer, por exemplo, se um campo que foi originalmente declarado `public` for alterado para `private` depois que outra class que se refere ao campo foi compilada ([§13.4.7](<#/doc/jls/jls-13>)); ou se o pacote no qual uma class `public` é declarada deixar de ser exportado por seu módulo depois que outro módulo que se refere à class foi compilado ([§13.3](<#/doc/jls/jls-13>)).

  * `InstantiationError`: Uma referência simbólica foi encontrada que é usada em uma expressão de criação de instância de class, mas uma instância não pode ser criada porque a referência acaba se referindo a uma interface ou a uma class `abstract`.

Isso pode ocorrer, por exemplo, se uma class que originalmente não é `abstract` for alterada para `abstract` depois que outra class que se refere à class em questão foi compilada ([§13.4.1](<#/doc/jls/jls-13>)).

  * `NoSuchFieldError`: Uma referência simbólica foi encontrada que se refere a um campo específico de uma class ou interface específica, mas a class ou interface não contém um campo com esse nome.

Isso pode ocorrer, por exemplo, se uma declaração de campo foi excluída de uma class depois que outra class que se refere ao campo foi compilada ([§13.4.8](<#/doc/jls/jls-13>)).

  * `NoSuchMethodError`: Uma referência simbólica foi encontrada que se refere a um método específico de uma class ou interface específica, mas a class ou interface não contém um método com essa assinatura.

Isso pode ocorrer, por exemplo, se uma declaração de método foi excluída de uma class depois que outra class que se refere ao método foi compilada ([§13.4.12](<#/doc/jls/jls-13>)).

Adicionalmente, um `UnsatisfiedLinkError`, uma subclasse de `LinkageError`, pode ser lançado se uma class declarar um método `native` para o qual nenhuma implementação pode ser encontrada. O erro ocorrerá se o método for usado, ou antes, dependendo do tipo de estratégia de resolução que está sendo usada por uma implementação da Java Virtual Machine ([§12.3](<#/doc/jls/jls-12>)).

## 12.4. Inicialização de Classes e Interfaces

_Inicialização de uma class_ consiste na execução de seus inicializadores `static` e dos inicializadores para campos `static` (variáveis de class) declarados na class.

_Inicialização de uma interface_ consiste na execução dos inicializadores para campos (constantes) declarados na interface.

### 12.4.1. Quando a Inicialização Ocorre

Uma class ou interface T será inicializada imediatamente antes da primeira ocorrência de qualquer um dos seguintes:

  * T é uma class e uma instância de T é criada.

  * Um método `static` declarado por T é invocado.

  * Um campo `static` declarado por T é atribuído.

  * Um campo `static` declarado por T é usado e o campo não é uma variável constante ([§4.12.4](<#/doc/jls/jls-04>)).

Quando uma class é inicializada, suas superclasses são inicializadas (se ainda não tiverem sido inicializadas), bem como quaisquer superinterfaces ([§8.1.5](<#/doc/jls/jls-08>)) que declarem quaisquer métodos `default` ([§9.4.3](<#/doc/jls/jls-09>)) (se ainda não tiverem sido inicializadas). A inicialização de uma interface não causa, por si só, a inicialização de nenhuma de suas superinterfaces.

Uma referência a um campo `static` ([§8.3.1.1](<#/doc/jls/jls-08>)) causa a inicialização apenas da class ou interface que realmente o declara, mesmo que possa ser referenciada através do nome de uma subclasse, uma subinterface ou uma class que implementa uma interface.

A invocação de certos métodos reflexivos na class `Class` e no pacote `java.lang.reflect` também causa a inicialização de class ou interface.

Uma class ou interface não será inicializada sob nenhuma outra circunstância.

Note que um compilador pode gerar métodos `default` _sintéticos_ em uma interface, ou seja, métodos `default` que não são declarados nem explicitamente nem implicitamente ([§13.1](<#/doc/jls/jls-13>)). Tais métodos acionarão a inicialização da interface, apesar de o código-fonte não dar nenhuma indicação de que a interface deveria ser inicializada.

A intenção é que uma class ou interface tenha um conjunto de inicializadores que a coloquem em um estado consistente, e que este estado seja o primeiro estado observado por outras classes. Os inicializadores `static` e os inicializadores de variáveis de class são executados em ordem textual, e não podem se referir a variáveis de class declaradas na class cujas declarações aparecem textualmente após o uso, mesmo que essas variáveis de class estejam no escopo ([§8.3.3](<#/doc/jls/jls-08>)). Esta restrição é projetada para detectar, em tempo de compilação, a maioria das inicializações circulares ou malformadas.

O fato de o código de inicialização ser irrestrito permite que exemplos sejam construídos onde o valor de uma variável de class pode ser observado quando ela ainda tem seu valor padrão inicial, antes que sua expressão de inicialização seja avaliada, mas tais exemplos são raros na prática. (Tais exemplos também podem ser construídos para inicialização de variáveis de instância ([§12.5](<#/doc/jls/jls-12>)).) Todo o poder da linguagem de programação Java está disponível nesses inicializadores; os programadores devem ter algum cuidado. Este poder impõe um ônus extra aos geradores de código, mas esse ônus surgiria de qualquer forma porque a linguagem de programação Java é concorrente ([§12.4.2](<#/doc/jls/jls-12>)).

**Exemplo 12.4.1-1. Superclasses São Inicializadas Antes das Subclasses**
```
    class Super {
        static { System.out.print("Super "); }
    }
    class One {
        static { System.out.print("One "); }
    }
    class Two extends Super {
        static { System.out.print("Two "); }
    }
    class Test {
        public static void main(String[] args) {
            One o = null;
            Two t = new Two();
            System.out.println((Object)o == (Object)t);
        }
    }

```

Este programa produz a saída:
```
    Super Two false

```

A class `One` nunca é inicializada, porque não é usada ativamente e, portanto, nunca é vinculada. A class `Two` é inicializada somente depois que sua superclass `Super` foi inicializada.

**Exemplo 12.4.1-2. Apenas a Class Que Declara o Campo `static` É Inicializada**
```
    class Super {
        static int taxi = 1729;
    }
    class Sub extends Super {
        static { System.out.print("Sub "); }
    }
    class Test {
        public static void main(String[] args) {
            System.out.println(Sub.taxi);
        }
    }

```

Este programa imprime apenas:
```
    1729

```

porque a class `Sub` nunca é inicializada; a referência a `Sub.taxi` é uma referência a um campo realmente declarado na class `Super` e não aciona a inicialização da class `Sub`.

**Exemplo 12.4.1-3. A Inicialização da Interface Não Inicializa Superinterfaces**
```
    interface I {
        int i = 1, ii = Test.out("ii", 2);
    }
    interface J extends I {
        int j = Test.out("j", 3), jj = Test.out("jj", 4);
    }
    interface K extends J {
        int k = Test.out("k", 5);
    }
    class Test {
        public static void main(String[] args) {
            System.out.println(J.i);
            System.out.println(K.j);
        }
        static int out(String s, int i) {
            System.out.println(s + "=" + i);
            return i;
        }
    }

```

Este programa produz a saída:
```
    1
    j=3
    jj=4
    3

```

A referência a `J.i` é para um campo que é uma variável constante ([§4.12.4](<#/doc/jls/jls-04>)); portanto, não causa a inicialização de `I` ([§13.4.9](<#/doc/jls/jls-13>)).

A referência a `K.j` é uma referência a um campo realmente declarado na interface `J` que não é uma variável constante; isso causa a inicialização dos campos da interface `J`, mas não os de sua superinterface `I`, nem os da interface `K`.

Apesar do fato de o nome `K` ser usado para se referir ao campo `j` da interface `J`, a interface `K` não é inicializada.

### 12.4.2. Procedimento Detalhado de Inicialização

Como a linguagem de programação Java é multithreaded, a inicialização de uma class ou interface requer sincronização cuidadosa, já que alguma outra thread pode estar tentando inicializar a mesma class ou interface ao mesmo tempo. Existe também a possibilidade de que a inicialização de uma class ou interface possa ser solicitada recursivamente como parte da inicialização dessa class ou interface; por exemplo, um inicializador de variável na class A pode invocar um método de uma class B não relacionada, que por sua vez pode invocar um método da class A. A implementação da Java Virtual Machine é responsável por cuidar da sincronização e da inicialização recursiva usando o seguinte procedimento.

O procedimento assume que o objeto `Class` já foi verificado e preparado, e que o objeto `Class` contém um estado que indica uma das quatro situações:

  * Este objeto `Class` é verificado e preparado, mas não inicializado.

  * Este objeto `Class` está sendo inicializado por alguma thread `T` particular.

  * Este objeto `Class` está totalmente inicializado e pronto para uso.

  * Este objeto `Class` está em um estado errôneo, talvez porque a inicialização foi tentada e falhou.

Para cada class ou interface C, existe um lock de inicialização único `LC`. O mapeamento de C para `LC` é deixado a critério da implementação da Java Virtual Machine. O procedimento para inicializar C é então o seguinte:

  1. Sincronize no lock de inicialização, `LC`, para C. Isso envolve esperar até que a thread atual possa adquirir `LC`.

  2. Se o objeto `Class` para C indicar que a inicialização está em andamento para C por alguma outra thread, então libere `LC` e bloqueie a thread atual até ser informado de que a inicialização em andamento foi concluída, momento em que este passo deve ser repetido.

  3. Se o objeto `Class` para C indicar que a inicialização está em andamento para C pela thread atual, então isso deve ser uma solicitação recursiva de inicialização. Libere `LC` e complete normalmente.

  4. Se o objeto `Class` para C indicar que C já foi inicializado, então nenhuma ação adicional é necessária. Libere `LC` e complete normalmente.

  5. Se o objeto `Class` para C estiver em um estado errôneo, então a inicialização não é possível. Libere `LC` e lance um `NoClassDefFoundError`.

  6. Caso contrário, registre o fato de que a inicialização do objeto `Class` para C está em andamento pela thread atual, e libere `LC`.

Em seguida, inicialize os campos `static` de C que são variáveis constantes ([§4.12.4](<#/doc/jls/jls-04>), [§8.3.2](<#/doc/jls/jls-08>), [§9.3.1](<#/doc/jls/jls-09>)).

  7. Em seguida, se C for uma class em vez de uma interface, então seja SC sua superclass e SI1, ..., SIn sejam todas as superinterfaces de C que declaram pelo menos um método `default`. A ordem das superinterfaces é dada por uma enumeração recursiva sobre a hierarquia de superinterfaces de cada interface diretamente implementada por C (na ordem da esquerda para a direita da cláusula `implements` de C). Para cada interface I diretamente implementada por C, a enumeração recursa nas superinterfaces de I (na ordem da esquerda para a direita da cláusula `extends` de I) antes de retornar I.

Para cada S na lista [ SC, SI1, ..., SIn ], se S ainda não foi inicializado, então execute recursivamente todo este procedimento para S. Se necessário, verifique e prepare S primeiro.

Se a inicialização de S for concluída abruptamente devido a uma exceção lançada, então adquira `LC`, rotule o objeto `Class` para C como errôneo, notifique todas as threads em espera, libere `LC` e complete abruptamente, lançando a mesma exceção que resultou da inicialização de S.

  8. Em seguida, determine se as asserções estão habilitadas ([§14.10](<#/doc/jls/jls-14>)) para C consultando seu class loader definidor.

  9. Em seguida, execute os inicializadores de variáveis de class e os inicializadores `static` da class, ou os inicializadores de campo da interface, em ordem textual, como se fossem um único bloco.

  10. Se a execução dos inicializadores for concluída normalmente, então adquira `LC`, rotule o objeto `Class` para C como totalmente inicializado, notifique todas as threads em espera, libere `LC` e complete este procedimento normalmente.

  11. Caso contrário, os inicializadores devem ter sido concluídos abruptamente lançando alguma exceção E. Se a class de E não for `Error` ou uma de suas subclasses, então crie uma nova instância da class `ExceptionInInitializerError`, com E como argumento, e use este objeto no lugar de E no passo seguinte. Se uma nova instância de `ExceptionInInitializerError` não puder ser criada porque ocorre um `OutOfMemoryError`, então use um objeto `OutOfMemoryError` no lugar de E no passo seguinte.

  12. Adquira `LC`, rotule o objeto `Class` para C como errôneo, notifique todas as threads em espera, libere `LC` e complete este procedimento abruptamente com a razão E ou seu substituto conforme determinado no passo anterior.

Uma implementação pode otimizar este procedimento omitindo a aquisição do lock no passo 1 (e a liberação nos passos 4/5) quando puder determinar que a inicialização da class já foi concluída, desde que, em termos do modelo de memória, todas as ordenações happens-before que existiriam se o lock fosse adquirido, ainda existam quando a otimização é realizada.

Geradores de código precisam preservar os pontos de possível inicialização de uma class ou interface, inserindo uma invocação do procedimento de inicialização descrito acima. Se este procedimento de inicialização for concluído normalmente e o objeto `Class` estiver totalmente inicializado e pronto para uso, então a invocação do procedimento de inicialização não é mais necessária e pode ser eliminada do código - por exemplo, por meio de correção ou regeneração do código.

A análise em tempo de compilação pode, em alguns casos, ser capaz de eliminar muitas das verificações de que uma class ou interface foi inicializada do código gerado, se uma ordem de inicialização para um grupo de classes e interfaces relacionadas puder ser determinada. Tal análise deve, no entanto, levar em conta totalmente a concorrência e o fato de que o código de inicialização é irrestrito.
## 12.5. Criação de Novas Instâncias de Classe

Uma nova instância de classe é explicitamente criada quando a avaliação de uma expressão de criação de instância de classe ([§15.9](<#/doc/jls/jls-15>)) causa a instanciação de uma classe.

Uma nova instância de classe pode ser implicitamente criada nas seguintes situações:

  * O carregamento de uma classe ou interface que contém um literal de string ([§3.10.5](<#/doc/jls/jls-03>)) ou um bloco de texto ([§3.10.6](<#/doc/jls/jls-03>)) pode criar um novo objeto `String` para denotar a string representada pelo literal de string ou bloco de texto. (Esta criação de objeto não ocorrerá se uma instância de `String` denotando a mesma sequência de pontos de código Unicode que a string representada pelo literal de string ou bloco de texto tiver sido previamente internada.)

  * A execução de uma operação que causa conversão boxing ([§5.1.7](<#/doc/jls/jls-05>)). A conversão boxing pode criar um novo objeto de uma classe wrapper (`Boolean`, `Byte`, `Short`, `Character`, `Integer`, `Long`, `Float`, `Double`) associada a um dos tipos primitivos.

  * A execução de um operador de concatenação de string `+` ([§15.18.1](<#/doc/jls/jls-15>)) que não faz parte de uma expressão constante ([§15.29](<#/doc/jls/jls-15>)) sempre cria um novo objeto `String` para representar o resultado. Operadores de concatenação de string também podem criar objetos wrapper temporários para um valor de um tipo primitivo.

  * A avaliação de uma expressão de referência de método ([§15.13.3](<#/doc/jls/jls-15>)) ou uma expressão lambda ([§15.27.4](<#/doc/jls/jls-15>)) pode exigir que uma nova instância seja criada de uma classe que implementa um tipo de interface funcional ([§9.8](<#/doc/jls/jls-09>)).

Cada uma dessas situações identifica um construtor particular ([§8.8](<#/doc/jls/jls-08>)) a ser chamado com argumentos especificados (possivelmente nenhum) como parte do processo de criação de instância de classe.

Sempre que uma nova instância de classe é criada, espaço de memória é alocado para ela com espaço para todas as variáveis de instância declaradas na classe e todas as variáveis de instância declaradas em cada superclasse da classe, incluindo todas as variáveis de instância que podem estar ocultas ([§8.3](<#/doc/jls/jls-08>)).

Se não houver espaço suficiente disponível para alocar memória para o objeto, então a criação da instância de classe é concluída abruptamente com um `OutOfMemoryError`. Caso contrário, todas as variáveis de instância no novo objeto, incluindo aquelas declaradas em superclasses, são inicializadas com seus valores padrão ([§4.12.5](<#/doc/jls/jls-04>)).

Pouco antes de uma referência ao objeto recém-criado ser retornada como resultado, o construtor indicado é processado para inicializar o novo objeto usando o seguinte procedimento:

  1. Atribua os argumentos para o construtor a variáveis de parâmetro recém-criadas para esta invocação de construtor.

  2. Se este construtor não contiver uma invocação explícita de construtor ([§8.8.7.1](<#/doc/jls/jls-08>)) então continue a partir do passo 5.

  3. Execute os _BlockStatements_ , se houver, do prólogo do corpo do construtor. Se a execução de qualquer instrução for concluída abruptamente, então a execução do construtor será concluída abruptamente pela mesma razão, caso contrário, continue com o próximo passo.

  4. A invocação explícita do construtor é uma invocação de outro construtor na mesma classe (usando `this`) ou uma invocação de um construtor de superclasse (usando `super`). Avalie os argumentos da invocação do construtor e processe a invocação do construtor recursivamente usando estes mesmos sete passos. Se a invocação do construtor for concluída abruptamente, então este procedimento será concluído abruptamente pela mesma razão. Caso contrário, continue a partir do passo 7 se a invocação for de outro construtor na mesma classe, e continue a partir do passo 6 se a invocação for de um construtor de superclasse.

  5. Se este construtor for para uma classe diferente de `Object`, então este construtor contém uma invocação implícita de um construtor de superclasse sem argumentos. Neste caso, processe a invocação implícita do construtor recursivamente usando estes mesmos sete passos. Se essa invocação de construtor for concluída abruptamente, então este procedimento será concluído abruptamente pela mesma razão, caso contrário, continue com o próximo passo.

  6. Execute os inicializadores de instância e inicializadores de variáveis de instância para esta classe, atribuindo os valores dos inicializadores de variáveis de instância às variáveis de instância correspondentes, na ordem da esquerda para a direita em que aparecem textualmente no código-fonte da classe. Se a execução de qualquer um desses inicializadores resultar em uma exceção, então nenhum outro inicializador será processado e este procedimento será concluído abruptamente com a mesma exceção, caso contrário, continue com o próximo passo.

  7. Execute os _BlockStatements_ , se houver, do epílogo deste construtor. Se a execução de qualquer instrução for concluída abruptamente, então este procedimento será concluído abruptamente pela mesma razão. Caso contrário, este procedimento será concluído normalmente.

Ao contrário de C++, a linguagem de programação Java não especifica regras alteradas para o despacho de métodos durante a criação de uma nova instância de classe. Se métodos que são sobrescritos em subclasses no objeto que está sendo inicializado forem invocados, então esses métodos sobrescritos são usados, mesmo antes que o novo objeto esteja completamente inicializado. As classes podem evitar a exposição indesejada de estado não inicializado atribuindo valores aos seus campos no prólogo do corpo do construtor.

**Exemplo 12.5-1. Avaliação da Criação de Instância**
```java
    class Point {
        int x, y;
        Point() { x = 1; y = 1; }
    }
    class ColoredPoint extends Point {
        int color = 0xFF00FF;
    }
    class Test {
        public static void main(String[] args) {
            ColoredPoint cp = new ColoredPoint();
            System.out.println(cp.color);
        }
    }
    
```

Aqui, uma nova instância de `ColoredPoint` é criada. Primeiro, espaço é alocado para o novo `ColoredPoint`, para armazenar os campos `x`, `y` e `color`. Todos esses campos são então inicializados com seus valores padrão (neste caso, `0` para cada campo). Em seguida, o construtor de `ColoredPoint` sem argumentos é invocado pela primeira vez. Como `ColoredPoint` não declara construtores, um construtor padrão da seguinte forma é implicitamente declarado:
```java
    ColoredPoint() { super(); }
    
```

Este construtor então invoca o construtor de `Point` sem argumentos. O construtor de `Point` não começa com uma invocação de construtor, então o compilador Java fornece uma invocação implícita de seu construtor de superclasse sem argumentos, como se tivesse sido escrito:
```java
    Point() { super(); x = 1; y = 1; }
    
```

Portanto, o construtor para `Object` que não recebe argumentos é invocado.

A classe `Object` não tem superclasse, então a recursão termina aqui. Em seguida, quaisquer inicializadores de instância e inicializadores de variáveis de instância de `Object` são invocados. Em seguida, o corpo do construtor de `Object` que não recebe argumentos é executado. Nenhum construtor desse tipo é declarado em `Object`, então o compilador Java fornece um padrão, que neste caso especial é:
```java
    Object() { }
    
```

Este construtor é executado sem efeito e retorna.

Em seguida, todos os inicializadores para as variáveis de instância da classe `Point` são executados. Acontece que as declarações de `x` e `y` não fornecem nenhuma expressão de inicialização, então nenhuma ação é necessária para esta etapa do exemplo. Então o corpo do construtor de `Point` é executado, definindo `x` para `1` e `y` para `1`.

Em seguida, os inicializadores para as variáveis de instância da classe `ColoredPoint` são executados. Esta etapa atribui o valor `0xFF00FF` a `color`. Finalmente, o epílogo do construtor de `ColoredPoint` é executado (a parte após a invocação de `super`); não há instruções no epílogo, então nenhuma ação adicional é necessária e a inicialização está completa.

**Exemplo 12.5-2. Despacho Dinâmico Durante a Criação de Instância**
```java
    class Super {
        Super() { printThree(); }
        void printThree() { System.out.println("three"); }
    }
    class Test extends Super {
        int three = (int)Math.PI;  // That is, 3
        void printThree() { System.out.println(three); }
    
        public static void main(String[] args) {
            Test t = new Test();
            t.printThree();
        }
    }
    
```

Este programa produz a saída:
```
    0
    3
    
```

Isso mostra que a invocação de `printThree` no construtor da classe `Super` não invoca a definição de `printThree` na classe `Super`, mas sim invoca a definição sobrescrita de `printThree` na classe `Test`. Este método, portanto, é executado antes que os inicializadores de campo de `Test` tenham sido executados, razão pela qual o primeiro valor de saída é `0`, o valor padrão para o qual o campo `three` de `Test` é inicializado. A invocação posterior de `printThree` no método `main` invoca a mesma definição de `printThree`, mas nesse ponto o inicializador para a variável de instância `three` já foi executado, e então o valor `3` é impresso.

**Exemplo 12.5-3. Inicialização de Campos no Prólogo**
```java
    
    class Super {
        Super() { printThree(); }
        void printThree() { System.out.println("three"); }
    }
    class Test extends Super {
        int three;
    
        public Test() {
            three = (int)Math.PI;  // That is, 3
            super();
        }
    
        void printThree() { System.out.println(three); }
    
        public static void main(String[] args) {
            Test t = new Test();
            t.printThree();
        }
    }
    
    
```

Esta alternativa ao Exemplo 12.5-2 produz a saída:
```
    3
    3
    
```

Como o campo `three` é inicializado no prólogo do construtor de `Test`, sua atribuição ocorre no Passo 3 do procedimento de inicialização do objeto, antes da execução do construtor de `Super` no Passo 4. Quando `three` é inicializado desta forma, é impossível observá-lo com o valor padrão `0`.

## 12.6. Finalização de Instâncias de Classe

A partir do Java SE 25, a Especificação da Plataforma Java SE permite que a finalização de instâncias de classe seja desabilitada em uma implementação da Plataforma Java SE, em antecipação à remoção da finalização de uma futura versão da Plataforma Java SE.

A classe `Object` possui um método `protected` chamado `finalize`; este método pode ser sobrescrito por outras classes. A definição particular de `finalize` que pode ser invocada para um objeto é chamada de _finalizador_ desse objeto. Antes que o armazenamento para um objeto seja recuperado pelo garbage collector, a Java Virtual Machine invocará o finalizador desse objeto.

Finalizadores oferecem uma chance de liberar recursos que não podem ser liberados automaticamente por um gerenciador de armazenamento automático. Em tais situações, simplesmente recuperar a memória usada por um objeto não garantiria que os recursos que ele mantinha seriam recuperados.

A linguagem de programação Java não especifica quão cedo um finalizador será invocado, exceto para dizer que isso acontecerá antes que o armazenamento para o objeto seja reutilizado.

A linguagem de programação Java não especifica qual thread invocará o finalizador para qualquer objeto dado.

É importante notar que muitas threads de finalizador podem estar ativas (isso é às vezes necessário em multiprocessadores de memória compartilhada grandes), e que se uma grande estrutura de dados conectada se tornar garbage, todos os métodos `finalize` para cada objeto nessa estrutura de dados poderiam ser invocados ao mesmo tempo, cada invocação de finalizador sendo executada em uma thread diferente.

A linguagem de programação Java não impõe nenhuma ordem nas chamadas de método `finalize`. Finalizadores podem ser chamados em qualquer ordem, ou mesmo concorrentemente.

Como exemplo, se um grupo de objetos não finalizados ligados circularmente se tornar inalcançável (ou alcançável-por-finalizador), então todos os objetos podem se tornar finalizáveis juntos. Eventualmente, os finalizadores para esses objetos podem ser invocados, em qualquer ordem, ou mesmo concorrentemente usando múltiplas threads. Se o gerenciador de armazenamento automático mais tarde descobrir que os objetos são inalcançáveis, então seu armazenamento pode ser recuperado.

É simples implementar uma classe que fará com que um conjunto de métodos semelhantes a finalizadores seja invocado em uma ordem especificada para um conjunto de objetos quando todos os objetos se tornarem inalcançáveis. A definição de tal classe é deixada como um exercício para o leitor.

É garantido que a thread que invoca o finalizador não estará segurando nenhum bloqueio de sincronização visível ao usuário quando o finalizador for invocado.

Se uma exceção não capturada for lançada durante a finalização, a exceção é ignorada e a finalização desse objeto é encerrada.

A conclusão do construtor de um objeto acontece-antes ([§17.4.5](<#/doc/jls/jls-17>)) da execução de seu método `finalize` (no sentido formal de happens-before).

O método `finalize` declarado na classe `Object` não realiza nenhuma ação. O fato de a classe `Object` declarar um método `finalize` significa que o método `finalize` para qualquer classe pode sempre invocar o método `finalize` de sua superclasse. Isso deve ser sempre feito, a menos que seja a intenção do programador anular as ações do finalizador na superclasse. (Ao contrário dos construtores, os finalizadores não invocam automaticamente o finalizador da superclasse; tal invocação deve ser codificada explicitamente.)

Para eficiência, uma implementação pode rastrear classes que não sobrescrevem o método `finalize` da classe `Object`, ou o sobrescrevem de forma trivial.

Por exemplo:
```java
    
    protected void finalize() throws Throwable {
        super.finalize();
    }
    
    
```

Encorajamos as implementações a tratar tais objetos como tendo um finalizador que não é sobrescrito, e a finalizá-los de forma mais eficiente, conforme descrito em [§12.6.1](<#/doc/jls/jls-12>).

Um finalizador pode ser invocado explicitamente, assim como qualquer outro método.

O pacote `java.lang.ref` descreve referências fracas, que interagem com a coleta de lixo e a finalização. Assim como com qualquer API que tenha interações especiais com a linguagem de programação Java, os implementadores devem estar cientes de quaisquer requisitos impostos pela API `java.lang.ref`. Esta especificação não discute referências fracas de forma alguma. Os leitores são encaminhados à documentação da API para detalhes.

### 12.6.1. Implementando a Finalização

Todo objeto pode ser caracterizado por dois atributos: ele pode ser _alcançável_ , _alcançável-por-finalizador_ , ou _inalcançável_ , e também pode ser _não-finalizado_ , _finalizável_ , ou _finalizado_.

Um objeto _alcançável_ é qualquer objeto que pode ser acessado em qualquer computação contínua potencial a partir de qualquer thread ativa.

Um objeto _alcançável-por-finalizador_ pode ser alcançado a partir de algum objeto finalizável através de alguma cadeia de referências, mas não a partir de qualquer thread ativa.

Um objeto _inalcançável_ não pode ser alcançado por nenhum dos meios.

Um objeto _não-finalizado_ nunca teve seu finalizador invocado automaticamente.

Um objeto _finalizado_ teve seu finalizador invocado automaticamente.

Um objeto _finalizável_ nunca teve seu finalizador invocado automaticamente, mas a Java Virtual Machine pode eventualmente invocar automaticamente seu finalizador.

Um objeto `o` não é finalizável até que seu construtor tenha invocado o construtor para `Object` em `o` e essa invocação tenha sido concluída com sucesso (ou seja, sem lançar uma exceção). Toda escrita pré-finalização em um campo de um objeto deve ser visível para a finalização desse objeto. Além disso, nenhuma das leituras pré-finalização de campos desse objeto pode ver escritas que ocorrem após o início da finalização desse objeto.

Transformações de otimização de um programa podem ser projetadas para reduzir o número de objetos alcançáveis para ser menor do que aqueles que seriam ingenuamente considerados alcançáveis. Por exemplo, um compilador Java ou gerador de código pode optar por definir uma variável ou parâmetro que não será mais usado como `null` para fazer com que o armazenamento para tal objeto seja potencialmente recuperável mais cedo.

Outro exemplo disso ocorre se os valores nos campos de um objeto forem armazenados em registradores. O programa pode então acessar os registradores em vez do objeto, e nunca mais acessar o objeto. Isso implicaria que o objeto é lixo. Note que este tipo de otimização só é permitido se as referências estiverem na stack, não armazenadas na heap.

Por exemplo, considere o padrão _Finalizer Guardian_ :
```java
    
    class Foo {
        private final Object finalizerGuardian = new Object() {
            protected void finalize() throws Throwable {
                /* finalize outer Foo object */
            }
        }
    }
    
    
```

O finalizer guardian força `super.finalize` a ser chamado se uma subclasse sobrescreve `finalize` e não chama explicitamente `super.finalize`.

Se essas otimizações forem permitidas para referências que são armazenadas na heap, então um compilador Java pode detectar que o campo `finalizerGuardian` nunca é lido, anulá-lo, coletar o objeto imediatamente e chamar o finalizador cedo. Isso vai contra a intenção: o programador provavelmente queria chamar o finalizador de `Foo` quando a instância de `Foo` se tornasse inalcançável. Este tipo de transformação, portanto, não é legal: o objeto da classe interna deve ser alcançável enquanto o objeto da classe externa for alcançável.

Transformações desse tipo podem resultar em invocações do método `finalize` ocorrendo mais cedo do que o esperado. Para permitir que o usuário evite isso, impomos a noção de que a sincronização pode manter o objeto vivo. _Se o finalizador de um objeto pode resultar em sincronização nesse objeto, então esse objeto deve estar vivo e ser considerado alcançável sempre que um bloqueio for mantido nele._

Note que isso não impede a eliminação de sincronização: a sincronização só mantém um objeto vivo se um finalizador puder sincronizar nele. Como o finalizador ocorre em outra thread, em muitos casos a sincronização não poderia ser removida de qualquer forma.

### 12.6.2. Interação com o Modelo de Memória

Deve ser possível para o modelo de memória ([§17.4](<#/doc/jls/jls-17>)) decidir quando pode confirmar ações que ocorrem em um finalizador. Esta seção descreve a interação da finalização com o modelo de memória.

Cada execução possui um número de _pontos de decisão de alcançabilidade_ , rotulados _di_. Cada ação ou _ocorre-antes de di_ ou _ocorre-depois de di_. Exceto conforme explicitamente mencionado, a ordenação ocorre-antes descrita nesta seção não está relacionada a todas as outras ordenações no modelo de memória.

Se _r_ é uma leitura que vê uma escrita _w_ e _r_ ocorre-antes de _di_ , então _w_ deve ocorrer-antes de _di_.

Se _x_ e _y_ são ações de sincronização na mesma variável ou monitor tal que _so(x, y)_ ([§17.4.4](<#/doc/jls/jls-17>)) e _y_ ocorre-antes de _di_ , então _x_ deve ocorrer-antes de _di_.

Em cada ponto de decisão de alcançabilidade, um conjunto de objetos é marcado como inalcançável, e um subconjunto desses objetos é marcado como finalizável. Esses pontos de decisão de alcançabilidade são também os pontos nos quais as referências são verificadas, enfileiradas e limpas de acordo com as regras fornecidas na documentação da API para o pacote `java.lang.ref`.

Os únicos objetos que são considerados definitivamente alcançáveis em um ponto _di_ são aqueles que podem ser demonstrados como alcançáveis pela aplicação destas regras:

  * Um objeto `B` é definitivamente alcançável em _di_ a partir de campos `static` se existir uma escrita _w1_ para um campo `static` `v` de uma classe C tal que o valor escrito por _w1_ é uma referência para `B`, a classe C é carregada por um classloader alcançável, e não existe uma escrita _w2_ para `v` tal que _hb(w2, w1)_ não seja verdadeiro e ambos _w1_ e _w2_ ocorram-antes de _di_.

  * Um objeto `B` é definitivamente alcançável a partir de `A` em _di_ se houver uma escrita _w1_ para um elemento `v` de `A` tal que o valor escrito por _w1_ é uma referência para `B` e não existe uma escrita _w2_ para `v` tal que _hb(w2, w1)_ não seja verdadeiro e ambos _w1_ e _w2_ ocorram-antes de _di_.

  * Se um objeto `C` é definitivamente alcançável a partir de um objeto `B`, e o objeto `B` é definitivamente alcançável a partir de um objeto `A`, então `C` é definitivamente alcançável a partir de `A`.

Se um objeto `X` é marcado como inalcançável em _di_ , então:

  * `X` não deve ser definitivamente alcançável em _di_ a partir de campos `static`; e

  * Todos os _usos ativos_ de `X` na thread `t` que ocorrem-depois de _di_ devem ocorrer na invocação do finalizador para `X` ou como resultado da thread `t` realizando uma leitura que ocorre-depois de _di_ de uma referência para `X`; e

  * Todas as leituras que ocorrem-depois de _di_ que veem uma referência para `X` devem ver escritas em elementos de objetos que eram inalcançáveis em _di_ , ou ver escritas que ocorreram-depois de _di_.

Uma ação _a_ é um uso ativo de `X` se e somente se pelo menos uma das seguintes condições for verdadeira:

  * _a_ lê ou escreve um elemento de `X`

  * _a_ bloqueia ou desbloqueia `X` e há uma ação de bloqueio em `X` que acontece-depois da invocação do finalizador para `X`

  * _a_ escreve uma referência para `X`

  * _a_ é um uso ativo de um objeto `Y`, e `X` é definitivamente alcançável a partir de `Y`

Se um objeto `X` é marcado como finalizável em _di_ , então:

  * `X` deve ser marcado como inalcançável em _di_ ; e

  * _di_ deve ser o único local onde `X` é marcado como finalizável; e

  * ações que acontecem-depois da invocação do finalizador devem ocorrer-depois de _di_.
## 12.7. Descarregamento de Classes e Interfaces

Uma implementação da linguagem de programação Java pode _descarregar_ classes.

Uma classe ou interface pode ser descarregada se e somente se seu class loader definidor puder ser recuperado pelo garbage collector, conforme discutido em [§12.6](<#/doc/jls/jls-12>).

Classes e interfaces carregadas pelo bootstrap loader não podem ser descarregadas.

O descarregamento de classes é uma otimização que ajuda a reduzir o uso de memória. Obviamente, a semântica de um programa não deve depender de se e como um sistema escolhe implementar uma otimização como o descarregamento de classes. Fazer o contrário comprometeria a portabilidade dos programas. Consequentemente, se uma classe ou interface foi descarregada ou não, deve ser transparente para um programa.

No entanto, se uma classe ou interface C foi descarregada enquanto seu loader definidor estava potencialmente acessível, então C poderia ser recarregada. Nunca se poderia garantir que isso não aconteceria. Mesmo que a classe não fosse referenciada por nenhuma outra classe atualmente carregada, ela poderia ser referenciada por alguma classe ou interface, D, que ainda não havia sido carregada. Quando D é carregada pelo loader definidor de C, sua execução pode causar o recarregamento de C.

O recarregamento pode não ser transparente se, por exemplo, a classe tiver variáveis `static` (cujo estado seria perdido), inicializadores estáticos (que podem ter efeitos colaterais) ou métodos `native` (que podem reter estado estático). Além disso, o valor hash do objeto `Class` depende de sua identidade. Portanto, é, em geral, impossível recarregar uma classe ou interface de maneira completamente transparente.

Como nunca podemos garantir que o descarregamento de uma classe ou interface cujo loader é potencialmente acessível não causará o recarregamento, e o recarregamento nunca é transparente, mas o descarregamento deve ser transparente, segue-se que não se deve descarregar uma classe ou interface enquanto seu loader for potencialmente acessível. Uma linha de raciocínio semelhante pode ser usada para deduzir que classes e interfaces carregadas pelo bootstrap loader nunca podem ser descarregadas.

Deve-se também argumentar por que é seguro descarregar uma classe C se seu class loader definidor puder ser recuperado. Se o loader definidor puder ser recuperado, então nunca poderá haver referências ativas a ele (isso inclui referências que não estão ativas, mas podem ser ressuscitadas por finalizadores). Isso, por sua vez, só pode ser verdade se nunca puder haver referências ativas a nenhuma das classes definidas por esse loader, incluindo C, seja de suas instâncias ou de código.

O descarregamento de classes é uma otimização que é significativa apenas para aplicações que carregam um grande número de classes e que param de usar a maioria dessas classes após algum tempo. Um excelente exemplo de tal aplicação é um navegador web, mas existem outros. Uma característica de tais aplicações é que elas gerenciam classes através do uso explícito de class loaders. Como resultado, a política descrita acima funciona bem para elas.

Estritamente falando, não é essencial que a questão do descarregamento de classes seja discutida por esta especificação, pois o descarregamento de classes é meramente uma otimização. No entanto, a questão é muito sutil, e por isso é mencionada aqui a título de esclarecimento.

## 12.8. Saída do Programa

Um programa consiste em uma ou mais threads de execução. Uma thread é uma non-daemon thread, uma daemon thread ou um shutdown hook.

Os leitores são encaminhados às especificações da API de `Thread` e `Runtime` para detalhes sobre como as threads obtêm o status de daemon e como os shutdown hooks são registrados.

Uma thread _termina_ se (i) seu método `run` for concluído normalmente, ou (ii) seu método `run` for concluído abruptamente e o manipulador de exceção não capturada relevante ([§11.3](<#/doc/jls/jls-11>)) for concluído normalmente ou abruptamente. Sem código restante para executar, a thread concluiu a execução e, portanto, não possui método atual (JVMS §2.5.1).

Um programa _sai_ quando uma das seguintes situações ocorre:

  1. Todas as suas non-daemon threads terminaram, e todos os shutdown hooks que consequentemente foram iniciados pela Java Virtual Machine, se houver, terminaram.

  2. Uma thread invocou `System.exit` ou `Runtime.exit`, e todos os shutdown hooks que consequentemente foram iniciados pela Java Virtual Machine, se houver, terminaram.

  3. Uma thread invocou `Runtime.halt`. (Nenhum shutdown hook é iniciado nesta situação.)

  4. A implementação da Java Virtual Machine reconheceu um evento externo como solicitando o encerramento da Java Virtual Machine, e todos os shutdown hooks que consequentemente foram iniciados pela Java Virtual Machine, se houver, terminaram.

A natureza do evento está fora do escopo desta especificação, mas é necessariamente algo que uma implementação da Java Virtual Machine pode lidar de forma confiável. Um exemplo é o recebimento de um sinal do sistema operacional.

  5. Ocorreu um evento externo que a implementação da Java Virtual Machine não pode lidar. (Nenhum shutdown hook é iniciado nesta situação.)

A natureza do evento está fora do escopo desta especificação, mas é necessariamente algo que uma implementação da Java Virtual Machine não pode reconhecer ou recuperar de forma alguma. Exemplos incluem um erro fatal ocorrendo no processo que executa a implementação, ou a remoção de energia do computador que executa a implementação.

Após a saída do programa, qualquer daemon ou non-daemon thread que ainda não tenha terminado não executará mais código Java. O método atual da thread não é concluído normalmente ou abruptamente. Nenhuma cláusula `finally` de qualquer método na thread é executada, nem qualquer manipulador de exceção não capturada.

Se a saída do programa ocorrer porque uma thread invocou `Runtime.halt` _enquanto os shutdown hooks estavam em execução_, então, além das daemon e non-daemon threads, qualquer shutdown hook que ainda não tenha terminado não executará mais código Java.

Exceto por esta situação incomum envolvendo `Runtime.halt`, a saída do programa depende do término de quaisquer shutdown hooks que foram iniciados. A justificativa é a seguinte. Quando o número de non-daemon threads cai para zero ou uma thread invoca `System.exit` ou `Runtime.exit`, é provável que o programa não tenha mais trabalho a fazer e esteja em transição para a saída; no entanto, o programa ainda pode ter outras threads que estão realizando tarefas auxiliares, e seria indesejável pará-las abruptamente. Os shutdown hooks permitem que o programa interrompa e encerre graciosamente tais threads de maneira específica da aplicação; consequentemente, o programa ainda não saiu se os shutdown hooks ainda estiverem em execução.

Aplicações nativas podem usar a JNI Invocation API para criar e destruir a Java Virtual Machine de tal forma que um programa Java, tendo iniciado a execução no método `main` de uma classe inicial ([§12.1](<#/doc/jls/jls-12>)), saia conforme descrito na primeira situação acima.

* * *

[Anterior](<#/doc/jls/jls-11>) | | [Próximo](<#/doc/jls/jls-13>)
---|---|---
Capítulo 11. Exceções | [Início](<#/doc/jls/jls-01>) | Capítulo 13. Compatibilidade Binária

* * *

[ Aviso Legal ](<#/>)