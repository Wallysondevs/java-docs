# Binários

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Especificações Java SE](<#/>) > [Especificação da Linguagem Java](<#/doc/jls/jls-01>)

Capítulo 13. Compatibilidade Binária
---
[Anterior](<#/doc/jls/jls-12>) | | [Próximo](<#/doc/jls/jls-14>)
  
* * *

# Capítulo 13. Compatibilidade Binária

**Sumário**

[13.1. A Forma de um Binário](<#/doc/jls/jls-13>)
[13.2. O Que É e o Que Não É Compatibilidade Binária](<#/doc/jls/jls-13>)
[13.3. Evolução de Pacotes e Módulos](<#/doc/jls/jls-13>)
[13.4. Evolução de Classes](<#/doc/jls/jls-13>)
    

[13.4.1. Classes `abstract`](<#/doc/jls/jls-13>)
[13.4.2. Classes `sealed`, `non-sealed` e `final`](<#/doc/jls/jls-13>)
    

[13.4.2.1. Classes `sealed`](<#/doc/jls/jls-13>)
[13.4.2.2. Classes `non-sealed`](<#/doc/jls/jls-13>)
[13.4.2.3. Classes `final`](<#/doc/jls/jls-13>)
[13.4.3. Classes `public`](<#/doc/jls/jls-13>)
[13.4.4. Superclasses e Superinterfaces](<#/doc/jls/jls-13>)
[13.4.5. Parâmetros de Tipo de Classe](<#/doc/jls/jls-13>)
[13.4.6. Corpo da Classe e Declarações de Membros](<#/doc/jls/jls-13>)
[13.4.7. Acesso a Membros e Construtores](<#/doc/jls/jls-13>)
[13.4.8. Declarações de Campos](<#/doc/jls/jls-13>)
[13.4.9. Campos `final` e Variáveis Constantes `static`](<#/doc/jls/jls-13>)
[13.4.10. Campos `static`](<#/doc/jls/jls-13>)
[13.4.11. Campos `transient`](<#/doc/jls/jls-13>)
[13.4.12. Declarações de Métodos e Construtores](<#/doc/jls/jls-13>)
[13.4.13. Parâmetros de Tipo de Métodos e Construtores](<#/doc/jls/jls-13>)
[13.4.14. Parâmetros Formais de Métodos e Construtores](<#/doc/jls/jls-13>)
[13.4.15. Tipo de Retorno de Método](<#/doc/jls/jls-13>)
[13.4.16. Métodos `abstract`](<#/doc/jls/jls-13>)
[13.4.17. Métodos `final`](<#/doc/jls/jls-13>)
[13.4.18. Métodos `native`](<#/doc/jls/jls-13>)
[13.4.19. Métodos `static`](<#/doc/jls/jls-13>)
[13.4.20. Métodos `synchronized`](<#/doc/jls/jls-13>)
[13.4.21. Lançamentos de Métodos e Construtores](<#/doc/jls/jls-13>)
[13.4.22. Corpo de Métodos e Construtores](<#/doc/jls/jls-13>)
[13.4.23. Sobrecarga de Métodos e Construtores](<#/doc/jls/jls-13>)
[13.4.24. Sobrescrita de Métodos](<#/doc/jls/jls-13>)
[13.4.25. Inicializadores Estáticos](<#/doc/jls/jls-13>)
[13.4.26. Evolução de Classes Enum](<#/doc/jls/jls-13>)
[13.4.27. Evolução de Classes Record](<#/doc/jls/jls-13>)
[13.5. Evolução de Interfaces](<#/doc/jls/jls-13>)
    

[13.5.1. Interfaces `public`](<#/doc/jls/jls-13>)
[13.5.2. Interfaces `sealed` e `non-sealed`](<#/doc/jls/jls-13>)
[13.5.3. Superinterfaces](<#/doc/jls/jls-13>)
[13.5.4. Membros de Interface](<#/doc/jls/jls-13>)
[13.5.5. Parâmetros de Tipo de Interface](<#/doc/jls/jls-13>)
[13.5.6. Declarações de Campos](<#/doc/jls/jls-13>)
[13.5.7. Declarações de Métodos de Interface](<#/doc/jls/jls-13>)
[13.5.8. Interfaces de Anotação](<#/doc/jls/jls-13>)

Ferramentas de desenvolvimento para a linguagem de programação Java devem suportar a recompilação automática conforme necessário sempre que o código-fonte estiver disponível. Implementações particulares também podem armazenar as representações de código-fonte e binária de classes e interfaces em um banco de dados de versionamento e implementar um `ClassLoader` que usa mecanismos de integridade do banco de dados para prevenir erros de vinculação, fornecendo versões binariamente compatíveis de classes e interfaces aos clientes.

Desenvolvedores de pacotes, classes e interfaces que serão amplamente distribuídos enfrentam um conjunto diferente de problemas. Na Internet, que é nosso exemplo favorito de um sistema amplamente distribuído, muitas vezes é impraticável ou impossível recompilar automaticamente os binários pré-existentes que dependem direta ou indiretamente de uma classe ou interface que será alterada. Em vez disso, esta especificação define um conjunto de mudanças que os desenvolvedores podem fazer em um pacote ou em uma classe ou interface, preservando (não quebrando) a compatibilidade com binários pré-existentes.

Dentro da estrutura de _Release-to-Release Binary Compatibility in SOM_ (Forman, Conner, Danforth e Raper, _Proceedings of OOPSLA '95_), os binários da linguagem de programação Java são binariamente compatíveis sob todas as transformações relevantes que os autores identificam (com algumas ressalvas em relação à adição de variáveis de instância). Usando seu esquema, aqui está uma lista de algumas mudanças importantes binariamente compatíveis que a linguagem de programação Java suporta:

  * Reimplementar métodos, construtores e inicializadores existentes para melhorar o desempenho.

  * Alterar métodos ou construtores para retornar valores em entradas para as quais eles anteriormente lançavam exceções que normalmente não deveriam ocorrer ou falhavam entrando em um loop infinito ou causando um deadlock.

  * Adicionar novos campos, métodos ou construtores a uma classe ou interface existente.

  * Excluir campos, métodos ou construtores `private` de uma classe.

  * Quando um pacote inteiro é atualizado, excluir campos, métodos ou construtores de acesso a pacote de classes e interfaces no pacote.

  * Reordenar os campos, métodos ou construtores em uma declaração de classe ou interface existente.

  * Mover um método para cima na hierarquia de classes.

  * Reordenar a lista de superinterfaces diretas de uma classe ou interface.

  * Inserir novos tipos de classe ou interface na hierarquia de tipos.

Este capítulo especifica padrões mínimos para compatibilidade binária garantidos por todas as implementações. A linguagem de programação Java garante compatibilidade quando binários de classes e interfaces são misturados, os quais não se sabe se são de fontes compatíveis, mas cujas fontes foram modificadas das maneiras compatíveis aqui descritas. Observe que estamos discutindo a compatibilidade entre lançamentos de uma aplicação. Uma discussão sobre a compatibilidade entre lançamentos da Plataforma Java SE está além do escopo deste capítulo.

Encorajamos os sistemas de desenvolvimento a fornecerem facilidades que alertem os desenvolvedores sobre o impacto das mudanças em binários pré-existentes que não podem ser recompilados.

Este capítulo primeiro especifica algumas propriedades que qualquer formato binário para a linguagem de programação Java deve ter ([§13.1](<#/doc/jls/jls-13>)). Em seguida, define compatibilidade binária, explicando o que é e o que não é ([§13.2](<#/doc/jls/jls-13>)). Finalmente, enumera um grande conjunto de possíveis mudanças em pacotes ([§13.3](<#/doc/jls/jls-13>)), classes ([§13.4](<#/doc/jls/jls-13>)) e interfaces ([§13.5](<#/doc/jls/jls-13>)), especificando quais dessas mudanças são garantidas para preservar a compatibilidade binária e quais não são.

## 13.1. A Forma de um Binário

Os programas devem ser compilados para o formato de arquivo `class` especificado por _The Java Virtual Machine Specification, Java SE 25 Edition_, ou para uma representação que possa ser mapeada para esse formato por um class loader escrito na linguagem de programação Java.

Um arquivo `class` correspondente a uma declaração de classe ou interface deve ter certas propriedades. Várias dessas propriedades são especificamente escolhidas para suportar transformações de código-fonte que preservam a compatibilidade binária. As propriedades exigidas são:

  1. A classe ou interface deve ser nomeada por seu _nome binário_, que deve atender às seguintes restrições:

     * O nome binário de uma classe ou interface de nível superior ([§7.6](<#/doc/jls/jls-07>)) é seu nome canônico ([§6.7](<#/doc/jls/jls-06>)).

Observe que o nome canônico da classe de nível superior implicitamente declarada por uma unidade de compilação compacta é determinado pelo sistema host ([§8.1.8](<#/doc/jls/jls-08>)).

     * O nome binário de uma classe ou interface membro ([§8.5](<#/doc/jls/jls-08>), [§9.5](<#/doc/jls/jls-09>)) consiste no nome binário de sua classe ou interface imediatamente envolvente, seguido por `$`, seguido pelo nome simples do membro.

     * O nome binário de uma classe ou interface local ([§14.3](<#/doc/jls/jls-14>)) consiste no nome binário de sua classe ou interface imediatamente envolvente, seguido por `$`, seguido por uma sequência não vazia de dígitos, seguido pelo nome simples da classe local.

     * O nome binário de uma classe anônima ([§15.9.5](<#/doc/jls/jls-15>)) consiste no nome binário de sua classe ou interface imediatamente envolvente, seguido por `$`, seguido por uma sequência não vazia de dígitos.

     * O nome binário de uma variável de tipo declarada por uma classe ou interface genérica ([§8.1.2](<#/doc/jls/jls-08>), [§9.1.2](<#/doc/jls/jls-09>)) é o nome binário de sua classe ou interface imediatamente envolvente, seguido por `$`, seguido pelo nome simples da variável de tipo.

     * O nome binário de uma variável de tipo declarada por um método genérico ([§8.4.4](<#/doc/jls/jls-08>)) é o nome binário da classe ou interface que declara o método, seguido por `$`, seguido pelo descritor do método (JVMS §4.3.3), seguido por `$`, seguido pelo nome simples da variável de tipo.

     * O nome binário de uma variável de tipo declarada por um construtor genérico ([§8.8.4](<#/doc/jls/jls-08>)) é o nome binário da classe que declara o construtor, seguido por `$`, seguido pelo descritor do construtor (JVMS §4.3.3), seguido por `$`, seguido pelo nome simples da variável de tipo.

  2. Uma referência a outra classe ou interface deve ser simbólica, usando o nome binário da classe ou interface.

  3. Uma referência a um campo que é uma variável constante ([§4.12.4](<#/doc/jls/jls-04>)) deve ser resolvida em tempo de compilação para o valor V denotado pelo inicializador da variável constante.

Se tal campo for `static`, nenhuma referência ao campo deve estar presente no código em um arquivo binário, incluindo a classe ou interface que declarou o campo. Tal campo deve sempre parecer ter sido inicializado ([§12.4.2](<#/doc/jls/jls-12>)); o valor inicial padrão para o campo (se diferente de V) nunca deve ser observado.

Se tal campo não for `static`, nenhuma referência ao campo deve estar presente no código em um arquivo binário, exceto na classe que contém o campo. (Será uma classe em vez de uma interface, já que uma interface tem apenas campos `static`.) A classe deve ter código para definir o valor do campo como V durante a criação da instância ([§12.5](<#/doc/jls/jls-12>)).

  4. Dada uma expressão legal que denota um acesso a campo em uma classe C, referenciando um campo chamado `f` que não é uma variável constante e é declarado em uma classe ou interface D (possivelmente distinta), definimos a _classe ou interface qualificadora da referência de campo_ da seguinte forma:

     * Se a expressão for referenciada por um nome simples, então se `f` for um membro da classe ou interface atual, C, então seja Q igual a C. Caso contrário, seja Q a declaração de classe ou interface lexicamente mais interna da qual `f` é um membro. Em ambos os casos, Q é a classe ou interface qualificadora da referência.

     * Se a referência for da forma _TypeName_`.`f`, onde _TypeName_ denota uma classe ou interface, então a classe ou interface denotada por _TypeName_ é a classe ou interface qualificadora da referência.

     * Se a expressão for da forma _ExpressionName_`.`f` ou _Primary_`.`f`, então:

       * Se o tipo em tempo de compilação de _ExpressionName_ ou _Primary_ for um tipo de interseção V1 `&` ... `&` Vn ([§4.9](<#/doc/jls/jls-04>)), então a classe ou interface qualificadora da referência é a eliminação ([§4.6](<#/doc/jls/jls-04>)) de V1.

       * Caso contrário, a eliminação do tipo em tempo de compilação de _ExpressionName_ ou _Primary_ é a classe ou interface qualificadora da referência.

     * Se a expressão for da forma `super`.`f`, então a superclasse de C é a classe ou interface qualificadora da referência.

     * Se a expressão for da forma _TypeName_`.`super`.`f`, então a superclasse da classe denotada por _TypeName_ é a classe ou interface qualificadora da referência.

A referência a `f` deve ser compilada em uma referência simbólica à classe ou interface qualificadora da referência, mais o nome simples do campo, `f`.

A referência também deve incluir uma referência simbólica à eliminação do tipo declarado do campo, para que o verificador possa checar se o tipo é o esperado.

  5. Dada uma expressão de invocação de método ou uma expressão de referência de método em uma classe ou interface C, referenciando um método chamado `m` declarado (ou implicitamente declarado ([§9.2](<#/doc/jls/jls-09>))) em uma classe ou interface D (possivelmente distinta), definimos a _classe ou interface qualificadora da invocação de método_ da seguinte forma:

     * Se D for `Object`, então a classe ou interface qualificadora da invocação de método é `Object`.

     * Caso contrário:

       * Se o método for referenciado por um nome simples, então se `m` for um membro da classe ou interface atual C, seja Q igual a C; caso contrário, seja Q a declaração de classe ou interface lexicamente mais interna da qual `m` é um membro. Em ambos os casos, Q é a classe ou interface qualificadora da invocação de método.

       * Se a expressão for da forma _TypeName_`.`m` ou _ReferenceType_`::`m`, então a classe ou interface denotada por _TypeName_, ou a eliminação de _ReferenceType_, é a classe ou interface qualificadora da invocação de método.

       * Se a expressão for da forma _ExpressionName_`.`m` ou _Primary_`.`m` ou _ExpressionName_`::`m` ou _Primary_`::`m`, então:

         * Se o tipo em tempo de compilação de _ExpressionName_ ou _Primary_ for um tipo de interseção V1 `&` ... `&` Vn, então a classe ou interface qualificadora da invocação de método é a eliminação de V1.

         * Caso contrário, a eliminação do tipo em tempo de compilação de _ExpressionName_ ou _Primary_ é a classe ou interface qualificadora da invocação de método.

       * Se a expressão for da forma `super`.`m` ou `super`::`m`, então a superclasse de C é a classe ou interface qualificadora da invocação de método.

       * Se a expressão for da forma _TypeName_`.`super`.`m` ou _TypeName_`.`super`::`m`, então se _TypeName_ denota uma classe X, a superclasse de X é a classe ou interface qualificadora da invocação de método; se _TypeName_ denota uma interface X, X é a classe ou interface qualificadora da invocação de método.

Uma referência a um método deve ser resolvida em tempo de compilação para uma referência simbólica à classe ou interface qualificadora da invocação de método, mais a eliminação da assinatura declarada ([§8.4.2](<#/doc/jls/jls-08>)) do método. A assinatura de um método deve incluir tudo o que segue, conforme determinado por [§15.12.3](<#/doc/jls/jls-15>):

     * O nome simples do método

     * O número de parâmetros do método

     * Uma referência simbólica ao tipo de cada parâmetro

Uma referência a um método também deve incluir uma referência simbólica à eliminação do tipo de retorno do método denotado ou uma indicação de que o método denotado é declarado `void` e não retorna um valor.

  6. Dada uma expressão de criação de instância de classe ([§15.9](<#/doc/jls/jls-15>)) ou uma invocação explícita de construtor ([§8.8.7.1](<#/doc/jls/jls-08>)) ou uma expressão de referência de método da forma _ClassType`::` `new`_ ([§15.13](<#/doc/jls/jls-15>)) em uma classe ou interface C, referenciando um construtor `m` declarado em uma classe ou interface D (possivelmente distinta), definimos a _classe qualificadora da invocação de construtor_ da seguinte forma:

     * Se a expressão for da forma `new` D`(...)` ou _ExpressionName_`.`new` D`(...)` ou _Primary_`.`new` D`(...)` ou D `::` `new`, então a classe qualificadora da invocação de construtor é D.

     * Se a expressão for da forma `new` D`(...){...}` ou _ExpressionName_`.`new` D`(...){...}` ou _Primary_`.`new` D`(...){...}`, então a classe qualificadora da invocação de construtor é a classe anônima declarada pela expressão.

     * Se a expressão for da forma `super`(...)` ou _ExpressionName_`.`super`(...)` ou _Primary_`.`super`(...)`, então a classe qualificadora da invocação de construtor é a superclasse direta de C.

     * Se a expressão for da forma `this`(...)`, então a classe qualificadora da invocação de construtor é C.

Uma referência a um construtor deve ser resolvida em tempo de compilação para uma referência simbólica à classe qualificadora da invocação de construtor, mais a assinatura declarada do construtor ([§8.8.2](<#/doc/jls/jls-08>)). A assinatura de um construtor deve incluir ambos:

     * O número de parâmetros do construtor

     * Uma referência simbólica ao tipo de cada parâmetro formal

Uma representação binária para uma classe ou interface também deve conter tudo o que segue:

  1. Se for uma classe e não for `Object`, então uma referência simbólica à superclasse direta desta classe.

  2. Uma referência simbólica a cada superinterface direta, se houver.

  3. Uma especificação de cada campo declarado na classe ou interface, dada como o nome simples do campo e uma referência simbólica à eliminação do tipo do campo.

  4. Se for uma classe, então a assinatura eliminada de cada construtor, conforme descrito acima.

  5. Para cada método declarado na classe ou interface (excluindo, para uma interface, seus métodos implicitamente declarados ([§9.2](<#/doc/jls/jls-09>))), sua assinatura eliminada e tipo de retorno, conforme descrito acima.

  6. O código necessário para implementar a classe ou interface:

     * Para uma interface, código para os inicializadores de campo e a implementação de cada método com um corpo de bloco ([§9.4.3](<#/doc/jls/jls-09>)).

     * Para uma classe, código para os inicializadores de campo, os inicializadores de instância e estáticos, a implementação de cada método com um corpo de bloco ([§8.4.7](<#/doc/jls/jls-08>)), e a implementação de cada construtor.

  7. Toda classe ou interface deve conter informações suficientes para recuperar seu nome canônico ([§6.7](<#/doc/jls/jls-06>)).

  8. Toda classe ou interface membro deve ter informações suficientes para recuperar seu modificador de acesso em nível de código-fonte ([§6.6](<#/doc/jls/jls-06>)).

  9. Toda classe ou interface aninhada deve ter uma referência simbólica à sua classe ou interface imediatamente envolvente ([§8.1.3](<#/doc/jls/jls-08>)).

  10. Toda classe ou interface deve conter referências simbólicas a todas as suas classes e interfaces membro ([§8.5](<#/doc/jls/jls-08>), [§9.5](<#/doc/jls/jls-09>)), e a todas as outras classes e interfaces aninhadas declaradas dentro de seu corpo.

  11. Um construto emitido por um compilador Java deve ser marcado como _synthetic_ se não corresponder a um construto declarado explicitamente ou implicitamente no código-fonte, a menos que o construto emitido seja um método de inicialização de classe (JVMS §2.9).

  12. Um construto emitido por um compilador Java deve ser marcado como _mandated_ se corresponder a um parâmetro formal declarado implicitamente no código-fonte ([§8.8.1](<#/doc/jls/jls-08>), [§8.8.9](<#/doc/jls/jls-08>), [§8.9.3](<#/doc/jls/jls-08>), [§15.9.5.1](<#/doc/jls/jls-15>)).

Os seguintes parâmetros formais são declarados implicitamente no código-fonte:

  * O primeiro parâmetro formal de um construtor de uma classe membro interna não-`private` ([§8.8.1](<#/doc/jls/jls-08>), [§8.8.9](<#/doc/jls/jls-08>)).

  * O primeiro parâmetro formal de um construtor anônimo de uma classe anônima cuja superclasse é uma classe interna (não em um contexto estático) ([§15.9.5.1](<#/doc/jls/jls-15>)).

  * O parâmetro formal `name` do método `valueOf` que é implicitamente declarado em uma classe enum ([§8.9.3](<#/doc/jls/jls-08>)).

  * Os parâmetros formais de um construtor compacto de uma classe record ([§8.10.4](<#/doc/jls/jls-08>)).

Para referência, os seguintes construtos são declarados implicitamente no código-fonte, mas não são marcados como mandated porque apenas parâmetros formais e módulos podem ser assim marcados em um arquivo `class` (JVMS §4.7.24, JVMS §4.7.25):

  * Construtores padrão de classes normais e enum ([§8.8.9](<#/doc/jls/jls-08>), [§8.9.2](<#/doc/jls/jls-08>))

  * Construtores canônicos de classes record ([§8.10.4](<#/doc/jls/jls-08>))

  * Construtores anônimos ([§15.9.5.1](<#/doc/jls/jls-15>))

  * Os métodos `values` e `valueOf` de classes enum ([§8.9.3](<#/doc/jls/jls-08>))

  * Certos campos `public` de classes enum ([§8.9.3](<#/doc/jls/jls-08>))

  * Certos campos `private` e métodos `public` de classes record ([§8.10.3](<#/doc/jls/jls-08>))

  * Certos métodos `public` de interfaces ([§9.2](<#/doc/jls/jls-09>))

  * Anotações de contêiner ([§9.7.5](<#/doc/jls/jls-09>))

  * Classes implicitamente declaradas por uma unidade de compilação compacta ([§8.1.8](<#/doc/jls/jls-08>)).

Um arquivo `class` correspondente a uma declaração de módulo deve ter as propriedades de um arquivo `class` para uma classe cujo nome binário é `module-info` e que não possui superclasse, superinterfaces, campos e métodos. Além disso, a representação binária do módulo deve conter tudo o que segue:

  * Uma especificação do nome do módulo, dada como uma referência simbólica ao nome indicado após `module`. Além disso, a especificação deve incluir se o módulo é normal ou aberto ([§7.7](<#/doc/jls/jls-07>)).

  * Uma especificação de cada dependência denotada por uma diretiva `requires`, dada como uma referência simbólica ao nome do módulo indicado pela diretiva ([§7.7.1](<#/doc/jls/jls-07>)). Além disso, a especificação deve incluir se a dependência é `transitive` e se a dependência é `static`.

  * Uma especificação de cada pacote denotado por uma diretiva `exports` ou `opens`, dada como uma referência simbólica ao nome do pacote indicado pela diretiva ([§7.7.2](<#/doc/jls/jls-07>)). Além disso, se a diretiva foi qualificada, a especificação deve fornecer referências simbólicas aos nomes dos módulos indicados pela cláusula `to` da diretiva.

  * Uma especificação de cada serviço denotado por uma diretiva `uses`, dada como uma referência simbólica ao nome da classe ou interface indicada pela diretiva ([§7.7.3](<#/doc/jls/jls-07>)).

  * Uma especificação dos provedores de serviço denotados por uma diretiva `provides`, dada como referências simbólicas aos nomes das classes e interfaces indicadas pela cláusula `with` da diretiva ([§7.7.4](<#/doc/jls/jls-07>)). Além disso, a especificação deve fornecer uma referência simbólica ao nome da classe ou interface indicada como o serviço pela diretiva.

As seções a seguir discutem as alterações que podem ser feitas nas declarações de classes e interfaces sem quebrar a compatibilidade com binários pré-existentes. Sob os requisitos de tradução fornecidos acima, a Java Virtual Machine e seu formato de arquivo `class` suportam essas alterações. Qualquer outro formato binário válido, como uma representação compactada ou criptografada que é mapeada de volta para arquivos `class` por um class loader sob os requisitos acima, necessariamente também suportará essas alterações.
## 13.2. O Que É e o Que Não É Compatibilidade Binária

Uma alteração em um tipo é _compatível binariamente com_ (equivalentemente, não _quebra a compatibilidade binária_ com) binários pré-existentes se os binários pré-existentes que anteriormente foram vinculados sem erro continuarem a ser vinculados sem erro.

Binários são compilados para depender dos membros e construtores acessíveis de outras classes e interfaces. Para preservar a compatibilidade binária, uma classe ou interface deve tratar seus membros e construtores acessíveis, sua existência e comportamento, como um _contrato_ com seus usuários.

A linguagem de programação Java é projetada para evitar que adições a contratos e colisões acidentais de nomes quebrem a compatibilidade binária. Especificamente, a adição de mais métodos sobrecarregando um nome de método particular não quebra a compatibilidade com binários pré-existentes. A assinatura do método que o binário pré-existente usará para a pesquisa de método é escolhida pelo algoritmo de resolução de sobrecarga em tempo de compilação ([§15.12.2](<#/doc/jls/jls-15>)).

Se a linguagem de programação Java tivesse sido projetada de forma que o método particular a ser executado fosse escolhido em tempo de execução, então tal ambiguidade poderia ser detectada em tempo de execução. Tal regra implicaria que adicionar um método sobrecarregado adicional para tornar a ambiguidade possível em um local de chamada poderia quebrar a compatibilidade com um número desconhecido de binários pré-existentes. Veja [§13.4.23](<#/doc/jls/jls-13>) para mais discussão.

Compatibilidade binária não é o mesmo que compatibilidade de código-fonte. Em particular, o exemplo em [§13.4.6](<#/doc/jls/jls-13>) mostra que um conjunto de binários compatíveis pode ser produzido a partir de fontes que não serão compiladas todas juntas. Este exemplo é típico: uma nova declaração é adicionada, alterando o significado de um nome em uma parte inalterada do código-fonte, enquanto o binário pré-existente para essa parte inalterada do código-fonte retém o significado anterior e totalmente qualificado do nome. Produzir um conjunto consistente de código-fonte requer fornecer um nome qualificado ou uma expressão de acesso a campo correspondente ao significado anterior.

## 13.3. Evolução de Pacotes e Módulos

Uma nova classe ou interface de nível superior pode ser adicionada a um pacote sem quebrar a compatibilidade com binários pré-existentes, desde que a nova classe ou interface não reutilize um nome previamente dado a uma classe ou interface não relacionada. Se uma nova classe ou interface reutilizar um nome previamente dado a uma classe ou interface não relacionada, então um conflito pode resultar, já que os binários para ambas as classes ou interfaces não poderiam ser carregados pelo mesmo class loader.

Alterações em classes e interfaces de nível superior que não são `public` e que não são uma superclasse ou superinterface, respectivamente, de uma classe ou interface `public`, afetam apenas classes e interfaces dentro do pacote em que são declaradas. Tais classes e interfaces podem ser excluídas ou alteradas de outra forma, mesmo que incompatibilidades sejam descritas aqui, desde que os binários afetados desse pacote sejam atualizados juntos.

Se um módulo que foi declarado para exportar ou abrir um pacote for alterado para não exportar ou abrir o pacote, ou para exportar ou abrir o pacote para um conjunto diferente de amigos, então um `IllegalAccessError` é lançado se um binário pré-existente for vinculado e precisar, mas não tiver mais acesso às classes e interfaces `public` e `protected` do pacote. Tal alteração não é recomendada para módulos que foram amplamente distribuídos.

Se um módulo não foi declarado para exportar ou abrir um determinado pacote, então alterar o módulo para exportar ou abrir o pacote não quebra a compatibilidade com binários pré-existentes. No entanto, alterar o módulo para exportar o pacote pode impedir que o programa inicie, já que qualquer módulo que lê o módulo também pode ler algum outro módulo que exporta um pacote com o mesmo nome.

Adicionar uma diretiva `requires` a uma declaração de módulo, ou adicionar o modificador `transitive` a uma diretiva `requires`, não quebra a compatibilidade com binários pré-existentes. No entanto, pode impedir que o programa inicie, já que o módulo pode agora ler múltiplos módulos que exportam pacotes com o mesmo nome.

Excluir uma diretiva `requires` em uma declaração de módulo, ou excluir o modificador `transitive` de uma diretiva `requires`, pode quebrar a compatibilidade com qualquer binário pré-existente que dependia da diretiva ou modificador para a legibilidade de um determinado módulo no curso de referenciar classes e interfaces exportadas por esse módulo. Um `IllegalAccessError` pode ser lançado quando tal referência de um binário pré-existente é vinculada.

Adicionar ou excluir uma diretiva `uses` ou `provides` em uma declaração de módulo não quebra a compatibilidade com binários pré-existentes.

## 13.4. Evolução de Classes

Esta seção descreve os efeitos de alterações na declaração de uma classe e seus membros e construtores em binários pré-existentes.

### 13.4.1. Classes `abstract`

Se uma classe que não foi declarada `abstract` for alterada para ser declarada `abstract`, então binários pré-existentes que tentarem criar novas instâncias dessa classe lançarão um `InstantiationError` em tempo de vinculação, ou (se um método reflexivo for usado) um `InstantiationException` em tempo de execução; tal alteração, portanto, não é recomendada para classes amplamente distribuídas.

Alterar uma classe que é declarada `abstract` para não ser mais declarada `abstract` não quebra a compatibilidade com binários pré-existentes.

### 13.4.2. Classes `sealed`, `non-sealed` e `final`

#### 13.4.2.1. Classes `sealed`

Se uma classe que era livremente extensível ([§8.1.1.2](<#/doc/jls/jls-08>)) for alterada para ser declarada `sealed`, então um `IncompatibleClassChangeError` é lançado se um binário de uma subclasse pré-existente desta classe for carregado e não for uma subclasse direta permitida desta classe ([§8.1.6](<#/doc/jls/jls-08>)); tal alteração não é recomendada para classes amplamente distribuídas.

Alterar uma classe que foi declarada `final` para ser declarada `sealed` não quebra a compatibilidade com binários pré-existentes.

Adicionar uma classe ao conjunto de subclasses diretas permitidas de uma classe `sealed` não quebrará a compatibilidade com binários pré-existentes.

Note que evoluir uma classe `sealed` adicionando uma subclasse direta permitida é considerada uma alteração binariamente compatível porque binários pré-existentes que anteriormente foram vinculados sem erro (por exemplo, um arquivo de classe que contém um `switch` exaustivo ([§14.11.1](<#/doc/jls/jls-14>))) continuarão a ser vinculados sem erro. Um arquivo de classe que contém um `switch` exaustivo não falhará na vinculação se a classe `sealed` sobre a qual ele alterna for expandida pelo proprietário da hierarquia para ter uma nova subclasse direta permitida. A JVM não é obrigada a realizar verificações de exaustividade ao vincular um arquivo de classe que contém um `switch` exaustivo.

A execução de um `switch` exaustivo pode falhar com um erro (uma `MatchException` é lançada) se encontrar uma instância de uma subclasse direta permitida que não era conhecida em tempo de compilação ([§14.11.3](<#/doc/jls/jls-14>), [§15.28.2](<#/doc/jls/jls-15>)). Estritamente falando, o erro não está sinalizando uma alteração binariamente incompatível da classe `sealed`, mas mais precisamente uma alteração _incompatível com a migração_ da classe `sealed`.

Se uma classe for removida do conjunto de subclasses diretas permitidas de uma classe `sealed`, então um `IncompatibleClassChangeError` é lançado se o binário pré-existente da classe removida for carregado.

Excluir o modificador `sealed` de uma classe que não possui uma superclasse direta `sealed` ou uma superinterface direta `sealed` não quebra a compatibilidade com binários pré-existentes.

Se uma classe `sealed` C tivesse uma superclasse direta `sealed` ou uma superinterface direta `sealed`, então excluir o modificador `sealed` impediria C de ser recompilada, pois toda classe com uma superclasse direta `sealed` ou uma superinterface direta `sealed` deve ser `final`, `sealed` ou `non-sealed`.

#### 13.4.2.2. Classes `non-sealed`

Alterar uma classe que foi declarada `sealed` para ser declarada `non-sealed` não quebra a compatibilidade com binários pré-existentes.

Alterar uma classe que foi declarada `final` para ser declarada `non-sealed` não quebra a compatibilidade com binários pré-existentes.

Uma classe `non-sealed` C deve ter uma superclasse direta `sealed` ou uma superinterface direta `sealed` ([§8.1.1.2](<#/doc/jls/jls-08>)). Excluir o modificador `non-sealed` impediria C de ser recompilada, pois toda classe com uma superclasse direta `sealed` ou uma superinterface direta `sealed` deve ser `final`, `sealed` ou `non-sealed`.

#### 13.4.2.3. Classes `final`

Se uma classe que não foi declarada `final` for alterada para ser declarada `final`, então um `IncompatibleClassChangeError` é lançado se um binário de uma subclasse pré-existente desta classe for carregado, porque classes `final` não podem ter subclasses; tal alteração não é recomendada para classes amplamente distribuídas.

Excluir o modificador `final` de uma classe que não possui uma superclasse direta `sealed` ou uma superinterface direta `sealed` não quebra a compatibilidade com binários pré-existentes.

Se uma classe `final` C tivesse uma superclasse direta `sealed` ou uma superinterface direta `sealed`, então excluir o modificador `final` impediria C de ser recompilada, pois toda classe com uma superclasse direta `sealed` ou uma superinterface direta `sealed` deve ser `final`, `sealed` ou `non-sealed` ([§8.1.1.2](<#/doc/jls/jls-08>)).

### 13.4.3. Classes `public`

Alterar uma classe que não é declarada `public` para ser declarada `public` não quebra a compatibilidade com binários pré-existentes.

Se uma classe que foi declarada `public` for alterada para não ser mais declarada `public`, então um `IllegalAccessError` é lançado se um binário pré-existente for vinculado e precisar, mas não tiver mais acesso ao tipo da classe; tal alteração não é recomendada para classes amplamente distribuídas.

### 13.4.4. Superclasses e Superinterfaces

Um `ClassCircularityError` é lançado em tempo de carregamento se uma classe fosse uma superclasse de si mesma. Alterações na hierarquia de classes que poderiam resultar em tal circularidade quando binários recém-compilados são carregados com binários pré-existentes não são recomendadas para classes amplamente distribuídas.

Alterar o tipo da superclasse direta ou o conjunto de tipos de superinterfaces diretas de uma classe não quebrará a compatibilidade com binários pré-existentes, desde que o conjunto total de superclasses ou superinterfaces, respectivamente, da classe não perca nenhum membro.

Por exemplo, é binariamente compatível substituir um supertipo bruto de uma classe por uma parametrização da classe ou interface nomeada pelo tipo bruto.

Se uma alteração na superclasse direta ou no conjunto de superinterfaces diretas resultar em qualquer classe ou interface não sendo mais uma superclasse ou superinterface, respectivamente, então erros de vinculação podem ocorrer se binários pré-existentes forem carregados com o binário da classe modificada. Tais alterações não são recomendadas para classes amplamente distribuídas.

**Exemplo 13.4.4-1. Alterando Uma Superclasse**

Suponha que o seguinte programa de teste:
```java
    class Hyper { char h = 'h'; }
    class Super extends Hyper { char s = 's'; }
    class Test extends Super {
        public static void printH(Hyper h) {
            System.out.println(h.h);
        }
        public static void main(String[] args) {
            printH(new Super());
        }
    }
    
```

seja compilado e executado, produzindo a saída:
```
    h
    
```

Suponha que uma nova versão da classe `Super` seja então compilada:
```java
    class Super { char s = 's'; }
    
```

Esta versão da classe `Super` não é uma subclasse de `Hyper`. Se então executarmos os binários existentes de `Hyper` e `Test` com a nova versão de `Super`, então um `VerifyError` é lançado em tempo de vinculação. O verificador reclama porque o resultado de `new Super()` não pode ser passado como um argumento no lugar de um parâmetro formal do tipo `Hyper`, porque `Super` não é uma subclasse de `Hyper`.

É instrutivo considerar o que poderia acontecer sem a etapa de verificação: o programa poderia rodar e imprimir:
```
    s
    
```

Isso demonstra que, sem o verificador, o sistema de tipos Java poderia ser burlado vinculando arquivos binários inconsistentes, mesmo que cada um tenha sido produzido por um compilador Java correto.

A lição é que uma implementação que não possui um verificador ou falha em usá-lo não manterá a segurança de tipos e, portanto, não é uma implementação válida.

**Exemplo 13.4.4-2. Introduzindo uma Superclasse**

De modo geral, existem várias situações em que uma transformação de classe que é binariamente compatível para um cliente pode não ser compatível com o código-fonte para esse cliente.

Por exemplo, o requisito de que as alternativas em uma cláusula multi-`catch` ([§14.20](<#/doc/jls/jls-14>)) não sejam subclasses ou superclasses umas das outras é apenas uma restrição de código-fonte. O seguinte código:
```java
    try {
        failByThrowingAorB();
    } catch (A|B e) {
        ...
    }
    
```

é legal, desde que A e B não tenham uma relação de subclasse/superclasse quando o código é compilado. Posteriormente, é binariamente compatível em relação a este cliente que A e B sejam alterados para ter tal relação. O código previamente compilado continuará a ser executado, mas como a alteração não é compatível com o código-fonte em relação a este cliente, o código não pode ser recompilado.

### 13.4.5. Parâmetros de Tipo de Classe

Adicionar ou excluir um parâmetro de tipo de uma classe não tem, por si só, quaisquer implicações para a compatibilidade binária.

Se tal parâmetro de tipo for usado no tipo de um campo ou método, isso pode ter as implicações normais de alterar o tipo mencionado.

Renomear um parâmetro de tipo de uma classe não tem efeito em relação a binários pré-existentes.

Alterar o primeiro limite de um parâmetro de tipo de uma classe pode alterar a erasure ([§4.6](<#/doc/jls/jls-04>)) de qualquer membro que use esse parâmetro de tipo em seu próprio tipo, e isso pode afetar a compatibilidade binária. A alteração de tal limite é análoga à alteração do primeiro limite de um parâmetro de tipo de um método ou construtor ([§13.4.13](<#/doc/jls/jls-13>)).

Alterar qualquer outro limite não tem efeito na compatibilidade binária.

### 13.4.6. Corpo da Classe e Declarações de Membros

Nenhuma incompatibilidade com binários pré-existentes é causada pela adição de um membro de instância (respectivamente `static`) que tem o mesmo nome e acessibilidade (para campos), ou o mesmo nome e acessibilidade e assinatura e tipo de retorno (para métodos), como um membro de instância (respectivamente `static`) de uma superclasse ou subclasse. Nenhum erro ocorre mesmo que o conjunto de classes sendo vinculadas encontrasse um erro em tempo de compilação.

Excluir um membro de classe ou construtor que não é declarado `private` pode causar um erro de vinculação se o membro ou construtor for usado por um binário pré-existente.

**Exemplo 13.4.6-1. Alterando o Corpo de uma Classe**
```java 
    class Hyper {
        void hello() { System.out.println("hello from Hyper"); }
    }
    class Super extends Hyper {
        void hello() { System.out.println("hello from Super"); }
    }
    class Test {
        public static void main(String[] args) {
            new Super().hello();
        }
    }
    
```

Este programa produz a saída:
```
    hello from Super
    
```

Suponha que uma nova versão da classe `Super` seja produzida:
```java
    class Super extends Hyper {}
    
```

Então, recompilar `Super` e executar este novo binário com os binários originais para `Test` e `Hyper` produz a saída:
```
    hello from Hyper
    
```

como esperado.

A palavra-chave `super` pode ser usada para acessar um método declarado em uma superclasse, ignorando quaisquer métodos declarados na classe atual. A expressão `super`.`_Identificador_ é resolvida, em tempo de compilação, para um método `m` na superclasse S. Se o método `m` for um método de instância, então o método que é invocado em tempo de execução é o método com a mesma assinatura que `m` que é um membro da superclasse direta da classe que contém a expressão envolvendo `super`.

**Exemplo 13.4.6-2. Alterando Uma Superclasse**
```java 
    class Hyper {
        void hello() { System.out.println("hello from Hyper"); }
    }
    class Super extends Hyper { }
    class Test extends Super {
        public static void main(String[] args) {
            new Test().hello();
        }
        void hello() {
            super.hello();
        }
    }
    
```

Este programa produz a saída:
```
    hello from Hyper
    
```

Suponha que uma nova versão da classe `Super` seja produzida:
```java
    class Super extends Hyper {
        void hello() { System.out.println("hello from Super"); }
    }
    
```

Então, se `Super` e `Hyper` forem recompilados, mas não `Test`, a execução dos novos binários com o binário existente de `Test` produz a saída:
```
    hello from Super
    
```

como você poderia esperar.

### 13.4.7. Acesso a Membros e Construtores

Alterar o acesso declarado de um membro ou construtor para permitir menos acesso pode quebrar a compatibilidade com binários pré-existentes, causando o lançamento de um erro de vinculação quando esses binários são resolvidos. Menos acesso é permitido se o modificador de acesso for alterado de acesso de pacote para acesso `private`; de acesso `protected` para acesso de pacote ou `private`; ou de acesso `public` para acesso `protected`, de pacote ou `private`. Alterar um membro ou construtor para permitir menos acesso não é, portanto, recomendado para classes amplamente distribuídas.

Talvez surpreendentemente, o formato binário é definido de modo que alterar um membro ou construtor para ser mais acessível não causa um erro de vinculação quando uma subclasse (já) define um método para ter menos acesso.

**Exemplo 13.4.7-1. Alterando a Acessibilidade**

Se o pacote `points` define a classe `Point`:
```java
    package points;
    public class Point {
        public int x, y;
        protected void print() {
            System.out.println("(" + x + "," + y + ")");
        }
    }
    
```

usado pelo programa:
```java
    class Test extends points.Point {
        public static void main(String[] args) {
            Test t = new Test();
            t.print();
        }
        protected void print() {
            System.out.println("Test");
        }
    }
    
```

então essas classes compilam e `Test` executa para produzir a saída:
```
    Test
    
```

Se o método `print` na classe `Point` for alterado para ser `public`, e então apenas a classe `Point` for recompilada, e então executada com o binário previamente existente para `Test`, então nenhum erro de vinculação ocorre. Isso acontece mesmo que seja impróprio, em tempo de compilação, para um método `public` ser sobrescrito por um método `protected` (como mostrado pelo fato de que a classe `Test` não poderia ser recompilada usando esta nova classe `Point` a menos que `print` em `Test` fosse alterado para ser `public`.)

Permitir que superclasses alterem métodos `protected` para serem `public` sem quebrar binários de subclasses pré-existentes ajuda a tornar os binários menos frágeis. A alternativa, onde tal alteração causaria um erro de vinculação, criaria incompatibilidades binárias adicionais.

### 13.4.8. Declarações de Campos

Programas amplamente distribuídos não devem expor nenhum campo aos seus clientes. Além das questões de compatibilidade binária discutidas abaixo, esta é geralmente uma boa prática de engenharia de software. Adicionar um campo a uma classe pode quebrar a compatibilidade com binários pré-existentes que não são recompilados.

Assuma uma referência a um campo `f` com a classe qualificadora C. Assuma ainda que `f` é de fato um campo de instância (respectivamente `static`) declarado em uma superclasse de C, S, e que o tipo de `f` é X.

Se um novo campo do tipo X com o mesmo nome que `f` for adicionado a uma subclasse de S que é uma superclasse de C ou C mesma, então um erro de vinculação pode ocorrer. Tal erro de vinculação ocorrerá apenas se, além do acima, uma das seguintes condições for verdadeira:

  * O novo campo é menos acessível que o antigo.

  * O novo campo é um campo `static` (respectivamente de instância).

Em particular, nenhum erro de vinculação ocorrerá no caso em que uma classe não poderia mais ser recompilada porque um acesso a campo anteriormente referenciava um campo de uma superclasse com um tipo incompatível. A classe previamente compilada com tal referência continuará a referenciar o campo declarado em uma superclasse.

**Exemplo 13.4.8-1. Adicionando Uma Declaração de Campo**
```java 
    class Hyper { String h = "hyper"; }
    class Super extends Hyper { String s = "super"; }
    class Test {
        public static void main(String[] args) {
            System.out.println(new Super().h);
        }
    }
    
```

Este programa produz a saída:
```
    hyper
    
```

Suponha que uma nova versão da classe `Super` seja produzida:
```java
    class Super extends Hyper {
        String s = "super";
        int h = 0;
    }
    
```

Então, recompilar `Hyper` e `Super`, e executar os novos binários resultantes com o binário antigo de `Test` produz a saída:
```
    hyper
    
```

O campo `h` de `Hyper` é exibido pelo binário original de `Test`. Embora isso possa parecer surpreendente à primeira vista, serve para reduzir o número de incompatibilidades que ocorrem em tempo de execução. (Em um mundo ideal, todos os arquivos-fonte que precisassem de recompilação seriam recompilados sempre que qualquer um deles fosse alterado, eliminando tais surpresas. Mas tal recompilação em massa é frequentemente impraticável ou impossível, especialmente na Internet. E, como foi notado anteriormente, tal recompilação às vezes exigiria mais alterações no código-fonte.)

Como outro exemplo, se o programa:
```java
    class Hyper { String h = "Hyper"; }
    class Super extends Hyper { }
    class Test extends Super {
        public static void main(String[] args) {
            String s = new Test().h;
            System.out.println(s);
        }
    }
    
```

for compilado e executado, ele produz a saída:
```
    Hyper
    
```

Suponha que uma nova versão da classe `Super` seja então compilada:
```java
    class Super extends Hyper { char h = 'h'; }
    
```

Se o binário resultante for usado com os binários existentes para `Hyper` e `Test`, então a saída ainda é:
```
    Hyper
    
```

mesmo que a compilação do código-fonte para esses binários:
```java
    class Hyper { String h = "Hyper"; }
    class Super extends Hyper { char h = 'h'; }
    class Test extends Super {
        public static void main(String[] args) {
            String s = new Test().h;
            System.out.println(s);
        }
    }
    
```

resultaria em um erro em tempo de compilação, porque o `h` no código-fonte para `main` seria agora interpretado como referindo-se ao campo `char` declarado em `Super`, e um valor `char` não pode ser atribuído a uma `String`.

Excluir um campo de uma classe quebrará a compatibilidade com quaisquer binários pré-existentes que referenciem este campo, e um `NoSuchFieldError` será lançado quando tal referência de um binário pré-existente for vinculada. Apenas campos `private` podem ser excluídos com segurança de uma classe amplamente distribuída.

Para fins de compatibilidade binária, adicionar ou excluir um campo `f` cujo tipo envolve variáveis de tipo ([§4.4](<#/doc/jls/jls-04>)) ou tipos parametrizados ([§4.5](<#/doc/jls/jls-04>)) é equivalente à adição (respectivamente, exclusão) de um campo com o mesmo nome cujo tipo é a erasure ([§4.6](<#/doc/jls/jls-04>)) do tipo de `f`.

### 13.4.9. Campos `final` e Variáveis Constantes `static`

Se um campo que não foi declarado `final` for alterado para ser declarado `final`, então isso pode quebrar a compatibilidade com binários pré-existentes que tentam atribuir novos valores ao campo.

**Exemplo 13.4.9-1. Alterando Uma Variável Para Ser `final`
```java 
    class Super { char s; }
    class Test extends Super {
        public static void main(String[] args) {
            Super x = new Super();
            x.s = 'a';
            System.out.println(x.s);
        }
    }
    
```

Este programa produz a saída:
```
    a
    
```

Suponha que uma nova versão da classe `Super` seja produzida:
```java
    class Super { final char s = 'b'; }
    
```

Se `Super` for recompilada, mas não `Test`, então a execução do novo binário com o binário existente de `Test` resulta em um `IllegalAccessError`.

Excluir a palavra-chave `final` ou alterar o valor para o qual um campo é inicializado não quebra a compatibilidade com binários existentes.

Se um campo é uma variável constante ([§4.12.4](<#/doc/jls/jls-04>)), e além disso é `static`, então excluir a palavra-chave `final` ou alterar seu valor não quebrará a compatibilidade com binários pré-existentes fazendo com que eles não executem, mas eles não verão nenhum novo valor para um uso do campo a menos que sejam recompilados. Este resultado é um efeito colateral da decisão de suportar a compilação condicional ([§14.22](<#/doc/jls/jls-14>)). (Pode-se supor que o novo valor não é visto se o uso ocorre em uma expressão constante ([§15.29](<#/doc/jls/jls-15>)) mas é visto de outra forma. Não é assim; binários pré-existentes não veem o novo valor de forma alguma.)

A melhor maneira de evitar problemas com "constantes inconstantes" em código amplamente distribuído é usar variáveis constantes `static` apenas para valores que realmente são improváveis de mudar. Além das verdadeiras constantes matemáticas, recomendamos que o código-fonte faça uso muito parcimonioso de variáveis constantes `static`.

Se a natureza somente leitura de `final` for necessária, uma escolha melhor é declarar uma variável `private` `static` e um método acessor adequado para obter seu valor. Assim, recomendamos:
```java
    
    private static int N;
    public static int getN() { return N; }
    
    
```

em vez de:
```java
    
    public static final int N = ...;
    
    
```

Não há problema com:
```java
    
    public static int N = ...;
    
    
```

se `N` não precisar ser somente leitura.

### 13.4.10. Campos `static`

Se um campo que não é declarado `private` não foi declarado `static` e for alterado para ser declarado `static`, ou vice-versa, então um erro de vinculação, especificamente um `IncompatibleClassChangeError`, resultará se o campo for usado por um binário pré-existente que esperava um campo do outro tipo. Tais alterações não são recomendadas em código que foi amplamente distribuído.

### 13.4.11. Campos `transient`

Adicionar ou excluir um modificador `transient` de um campo não quebra a compatibilidade com binários pré-existentes.

### 13.4.12. Declarações de Métodos e Construtores

Adicionar um método ou construtor a uma classe não quebrará a compatibilidade com quaisquer binários pré-existentes, mesmo no caso em que uma classe não poderia mais ser recompilada porque uma invocação anteriormente referenciava um método ou construtor de uma superclasse com um tipo incompatível. A classe previamente compilada com tal referência continuará a referenciar o método ou construtor declarado em uma superclasse.

Assuma uma referência a um método `m` com a classe qualificadora C. Assuma ainda que `m` é de fato um método de instância (respectivamente `static`) declarado em uma superclasse de C, S.

Se um novo método do tipo X com a mesma assinatura e tipo de retorno que `m` for adicionado a uma subclasse de S que é uma superclasse de C ou C mesma, então um erro de vinculação pode ocorrer. Tal erro de vinculação ocorrerá apenas se, além do acima, uma das seguintes condições for verdadeira:

  * O novo método é menos acessível que o antigo.

  * O novo método é um método `static` (respectivamente de instância).

Excluir um método ou construtor de uma classe pode quebrar a compatibilidade com qualquer binário pré-existente que referenciou este método ou construtor; um `NoSuchMethodError` pode ser lançado quando tal referência de um binário pré-existente é vinculada. Tal erro ocorrerá apenas se nenhum método com uma assinatura e tipo de retorno correspondentes for declarado em uma superclasse.

Se o código-fonte para uma classe não-interna não contiver construtores declarados, então um construtor padrão sem parâmetros é implicitamente declarado ([§8.8.9](<#/doc/jls/jls-08>)). Adicionar uma ou mais declarações de construtores ao código-fonte de tal classe impedirá que este construtor padrão seja implicitamente declarado, efetivamente excluindo um construtor, a menos que um dos novos construtores também não tenha parâmetros, substituindo assim o construtor padrão. O construtor padrão sem parâmetros recebe o mesmo modificador de acesso que a classe de sua declaração, então qualquer substituição deve ter tanto ou mais acesso se a compatibilidade com binários pré-existentes for preservada.

### 13.4.13. Parâmetros de Tipo de Métodos e Construtores

Adicionar ou excluir um parâmetro de tipo de um método ou construtor não tem, por si só, quaisquer implicações para a compatibilidade binária.

Se tal parâmetro de tipo for usado no tipo do método ou construtor, isso pode ter as implicações normais de alterar o tipo mencionado.

Renomear um parâmetro de tipo de um método ou construtor não tem efeito em relação a binários pré-existentes.

Alterar o primeiro limite de um parâmetro de tipo de um método ou construtor pode alterar a erasure ([§4.6](<#/doc/jls/jls-04>)) de qualquer membro que use esse parâmetro de tipo em seu próprio tipo, e isso pode afetar a compatibilidade binária. Especificamente:

  * Se o parâmetro de tipo for usado como o tipo de um campo, o efeito é como se o campo fosse excluído e um campo com o mesmo nome, cujo tipo é a nova erasure da variável de tipo, fosse adicionado.

  * Se o parâmetro de tipo for usado como o tipo de qualquer parâmetro formal de um método, mas não como o tipo de retorno, o efeito é como se esse método fosse excluído e substituído por um novo método idêntico, exceto pelos tipos dos parâmetros formais mencionados, que agora têm a nova erasure do parâmetro de tipo como seu tipo.

  * Se o parâmetro de tipo for usado como um tipo de retorno de um método, mas não como o tipo de qualquer parâmetro formal do método, o efeito é como se esse método fosse excluído e substituído por um novo método idêntico, exceto pelo tipo de retorno, que agora é a nova erasure do parâmetro de tipo.

  * Se o parâmetro de tipo for usado como um tipo de retorno de um método e como o tipo de um ou mais parâmetros formais do método, o efeito é como se esse método fosse excluído e substituído por um novo método idêntico, exceto pelo tipo de retorno, que agora é a nova erasure do parâmetro de tipo, e exceto pelos tipos dos parâmetros formais mencionados, que agora têm a nova erasure do parâmetro de tipo como seus tipos.

Alterar qualquer outro limite não tem efeito na compatibilidade binária.

### 13.4.14. Parâmetros Formais de Métodos e Construtores

Alterar o nome de um parâmetro formal de um método ou construtor não afeta binários pré-existentes.

Alterar o nome de um método, ou o tipo de um parâmetro formal para um método ou construtor, ou adicionar um parâmetro ou excluir um parâmetro de uma declaração de método ou construtor cria um método ou construtor com uma nova assinatura, e tem o efeito combinado de excluir o método ou construtor com a assinatura antiga e adicionar um método ou construtor com a nova assinatura ([§13.4.12](<#/doc/jls/jls-13>)).

Alterar o tipo do último parâmetro formal de um método de T`[]` para um parâmetro de aridade variável do tipo T, ou seja, para T`...` ([§8.4.1](<#/doc/jls/jls-08>)), e vice-versa, não afeta binários pré-existentes.

Para fins de compatibilidade binária, adicionar ou excluir um método ou construtor `m` cuja assinatura envolve variáveis de tipo ([§4.4](<#/doc/jls/jls-04>)) ou tipos parametrizados ([§4.5](<#/doc/jls/jls-04>)) é equivalente à adição (respectivamente, exclusão) de um método de outra forma equivalente cuja assinatura é a erasure ([§4.6](<#/doc/jls/jls-04>)) da assinatura de `m`.
### 13.4.15. Tipo de Resultado do Método

Alterar o tipo de resultado de um método, ou substituir um tipo de resultado por `void`, ou substituir `void` por um tipo de resultado, tem o efeito combinado de deletar o método antigo e adicionar um novo método com o novo tipo de resultado ou resultado `void` recém-adicionado (veja [§13.4.12](<#/doc/jls/jls-13>)).

Para fins de compatibilidade binária, adicionar ou deletar um método ou construtor `m` cujo tipo de retorno envolve variáveis de tipo ([§4.4](<#/doc/jls/jls-04>)) ou tipos parametrizados ([§4.5](<#/doc/jls/jls-04>)) é equivalente à adição (respectivamente, deleção) de um método de outra forma equivalente cujo tipo de retorno é a *erasure* ([§4.6](<#/doc/jls/jls-04>)) do tipo de retorno de `m`.

### 13.4.16. Métodos `abstract`

Alterar um método que é declarado `abstract` para não ser mais declarado `abstract` não quebra a compatibilidade com binários pré-existentes.

Alterar um método que não é declarado `abstract` para ser declarado `abstract` quebrará a compatibilidade com binários pré-existentes que anteriormente invocavam o método, causando um `AbstractMethodError`.

**Exemplo 13.4.16-1. Alterando Um Método Para Ser `abstract`
```java
    class Super { void out() { System.out.println("Out"); } }
    class Test extends Super {
        public static void main(String[] args) {
            Test t = new Test();
            System.out.println("Way ");
            t.out();
        }
    }
```

Este programa produz a saída:
```
    Way
    Out
```

Suponha que uma nova versão da classe `Super` seja produzida:
```java
    abstract class Super {
        abstract void out();
    }
```

Se `Super` for recompilada, mas `Test` não, então executar o novo binário com o binário existente de `Test` resulta em um `AbstractMethodError`, porque a classe `Test` não tem implementação do método `out`, e é, portanto, (ou deveria ser) `abstract`.

### 13.4.17. Métodos `final`

Alterar um método que é declarado `final` para não ser mais declarado `final` não quebra a compatibilidade com binários pré-existentes.

Alterar um método de instância que não é declarado `final` para ser declarado `final` pode quebrar a compatibilidade com binários existentes que dependem da capacidade de sobrescrever o método.

**Exemplo 13.4.17-1. Alterando Um Método Para Ser `final`
```java
    class Super { void out() { System.out.println("out"); } }
    class Test extends Super {
        public static void main(String[] args) {
            Test t = new Test();
            t.out();
        }
        void out() { super.out(); }
    }
```

Este programa produz a saída:
```
    out
```

Suponha que uma nova versão da classe `Super` seja produzida:
```java
    class Super { final void out() { System.out.println("!"); } }
```

Se `Super` for recompilada, mas `Test` não, então executar o novo binário com o binário existente de `Test` resulta em um `IncompatibleClassChangeError` porque a classe `Test` tenta sobrescrever indevidamente o método de instância `out`.

Alterar um método de classe (`static`) que não é declarado `final` para ser declarado `final` não quebra a compatibilidade com binários existentes, porque o método não poderia ter sido sobrescrito.

### 13.4.18. Métodos `native`

Adicionar ou deletar um modificador `native` de um método não quebra a compatibilidade com binários pré-existentes.

O impacto de mudanças em tipos em métodos `native` pré-existentes que não são recompilados está além do escopo desta especificação e deve ser fornecido com a descrição de uma implementação. As implementações são encorajadas, mas não obrigadas, a implementar métodos `native` de uma forma que limite tal impacto.

### 13.4.19. Métodos `static`

Se um método que não é declarado `private` também é declarado `static` (ou seja, um método de classe) e é alterado para não ser declarado `static` (ou seja, para um método de instância), ou vice-versa, então a compatibilidade com binários pré-existentes pode ser quebrada, resultando em um erro de tempo de *linkage*, ou seja, um `IncompatibleClassChangeError`, se esses métodos forem usados pelos binários pré-existentes. Tais mudanças não são recomendadas em código que foi amplamente distribuído.

### 13.4.20. Métodos `synchronized`

Adicionar ou deletar um modificador `synchronized` de um método não quebra a compatibilidade com binários pré-existentes.

### 13.4.21. Cláusulas `throws` de Métodos e Construtores

Alterações na cláusula `throws` de métodos ou construtores não quebram a compatibilidade com binários pré-existentes; essas cláusulas são verificadas apenas em tempo de compilação.

### 13.4.22. Corpo de Métodos e Construtores

Alterações no corpo de um método ou construtor não quebram a compatibilidade com binários pré-existentes.

A palavra-chave `final` em um método não significa que o método pode ser seguramente *inlined*; significa apenas que o método não pode ser sobrescrito. Ainda é possível que uma nova versão desse método seja fornecida em tempo de *linkage*. Além disso, a estrutura do programa original deve ser preservada para fins de *reflection*.

Portanto, notamos que um compilador Java não pode expandir um método *inline* em tempo de compilação. Em geral, sugerimos que as implementações usem geração e otimização de código de ligação tardia (tempo de execução).

### 13.4.23. Sobrecarga de Métodos e Construtores

Adicionar novos métodos ou construtores que sobrecarregam métodos ou construtores existentes não quebra a compatibilidade com binários pré-existentes. A assinatura a ser usada para cada invocação foi determinada quando esses binários existentes foram compilados; portanto, métodos ou construtores recém-adicionados não serão usados, mesmo que suas assinaturas sejam aplicáveis e mais específicas do que a assinatura originalmente escolhida.

Embora adicionar um novo método ou construtor sobrecarregado possa causar um erro em tempo de compilação na próxima vez que uma classe ou interface for compilada porque não há método ou construtor que seja o mais específico ([§15.12.2.5](<#/doc/jls/jls-15>)), nenhum erro desse tipo ocorre quando um programa é executado, porque nenhuma resolução de sobrecarga é feita em tempo de execução.

**Exemplo 13.4.23-1. Adicionando Um Método Sobrecarrregado**
```java
    class Super {
        static void out(float f) {
            System.out.println("float");
        }
    }
    class Test {
        public static void main(String[] args) {
            Super.out(2);
        }
    }
```

Este programa produz a saída:
```
    float
```

Suponha que uma nova versão da classe `Super` seja produzida:
```java
    class Super {
        static void out(float f) { System.out.println("float"); }
        static void out(int i)   { System.out.println("int");   }
    }
```

Se `Super` for recompilada, mas `Test` não, então executar o novo binário com o binário existente de `Test` ainda produz a saída:
```
    float
```

No entanto, se `Test` for então recompilada, usando esta nova `Super`, a saída será:
```
    int
```

como poderia ter sido ingenuamente esperado no caso anterior.

### 13.4.24. Sobrescrita de Métodos

Se um método de instância for adicionado a uma subclasse e ele sobrescrever um método em uma superclasse, então o método da subclasse será encontrado por invocações de método em binários pré-existentes, e esses binários não serão impactados.

Se um método de classe for adicionado a uma classe, então este método não será encontrado a menos que a classe qualificadora da invocação do método seja a subclasse.

### 13.4.25. Inicializadores `static`

Adicionar, deletar ou alterar um inicializador `static` ([§8.7](<#/doc/jls/jls-08>)) de uma classe não impacta binários pré-existentes.

### 13.4.26. Evolução de Classes `enum`

Adicionar ou reordenar constantes `enum` em uma classe `enum` não quebrará a compatibilidade com binários pré-existentes.

Assim como nas classes `sealed` ([§13.4.2.1](<#/doc/jls/jls-13>)), embora adicionar uma constante `enum` a uma classe `enum` seja considerado uma mudança binariamente compatível, isso pode fazer com que a execução de um `switch` exaustivo ([§14.11.1](<#/doc/jls/jls-14>)) falhe se o `switch` encontrar a nova constante `enum` que não era conhecida em tempo de compilação ([§14.11.3](<#/doc/jls/jls-14>), [§15.28.2](<#/doc/jls/jls-15>)).

Deletar uma constante `enum` de uma classe `enum` deletará o campo `public` que corresponde à constante `enum` ([§8.9.3](<#/doc/jls/jls-08>)). As consequências são especificadas em [§13.4.8](<#/doc/jls/jls-13>). Tal mudança não é recomendada para classes `enum` amplamente distribuídas.

Em todos os outros aspectos, as regras de compatibilidade binária para classes `enum` são idênticas às das classes normais.

### 13.4.27. Evolução de Classes `record`

Adicionar, deletar, alterar ou reordenar componentes `record` em uma classe `record` pode quebrar a compatibilidade com binários pré-existentes que não são recompilados; tal mudança não é recomendada para classes `record` amplamente distribuídas.

Mais precisamente, adicionar, deletar, alterar ou reordenar componentes `record` pode mudar as declarações implícitas correspondentes de campos de componente e métodos *accessor*, bem como alterar a assinatura e implementação do construtor canônico e outros métodos de suporte, com consequências especificadas em [§13.4.8](<#/doc/jls/jls-13>) e [§13.4.12](<#/doc/jls/jls-13>).

Em todos os outros aspectos, as regras de compatibilidade binária para classes `record` são idênticas às das classes normais.

## 13.5. Evolução de Interfaces

Esta seção descreve o impacto de mudanças na declaração de uma interface e seus membros em binários pré-existentes.

### 13.5.1. Interfaces `public`

Alterar uma interface que não é declarada `public` para ser declarada `public` não quebra a compatibilidade com binários pré-existentes.

Se uma interface que é declarada `public` for alterada para não ser declarada `public`, então um `IllegalAccessError` é lançado se um binário pré-existente for *linked* que precisa, mas não tem mais acesso ao tipo de interface, então tal mudança não é recomendada para interfaces amplamente distribuídas.

### 13.5.2. Interfaces `sealed` e `non-sealed`

Se uma interface que era livremente extensível ([§9.1.1.4](<#/doc/jls/jls-09>)) for alterada para ser declarada `sealed`, então um `IncompatibleClassChangeError` é lançado se um binário de uma subclasse ou subinterface pré-existente desta interface for carregado e não for uma subclasse ou subinterface direta permitida desta interface ([§9.1.4](<#/doc/jls/jls-09>)); tal mudança não é recomendada para classes amplamente distribuídas.

Adicionar uma classe ou interface ao conjunto de subclasses ou subinterfaces diretas permitidas, respectivamente, de uma interface `sealed` não quebrará a compatibilidade com binários pré-existentes.

Assim como nas classes `sealed` ([§13.4.2.1](<#/doc/jls/jls-13>)), embora adicionar uma subclasse ou subinterface direta permitida de uma interface `sealed` seja considerado uma mudança binariamente compatível, isso pode fazer com que a execução de um `switch` exaustivo ([§14.11.1](<#/doc/jls/jls-14>)) falhe com um erro (uma `MatchException` pode ser lançada) se o `switch` encontrar uma instância da nova subclasse ou subinterface direta permitida que não era conhecida em tempo de compilação ([§14.11.3](<#/doc/jls/jls-14>), [§15.28.2](<#/doc/jls/jls-15>)).

Se uma classe ou interface for removida do conjunto de subclasses ou subinterfaces diretas permitidas de uma interface `sealed`, então um `IncompatibleClassChangeError` é lançado se o binário pré-existente da classe ou interface removida for carregado.

Alterar uma interface que foi declarada `sealed` para ser declarada `non-sealed` não quebra a compatibilidade com binários pré-existentes.

Uma interface `non-sealed` I deve ter uma superinterface direta `sealed`. Deletar o modificador `non-sealed` impediria que I fosse recompilada, pois toda interface com uma superinterface direta `sealed` deve ser `sealed` ou `non-sealed`.

Deletar o modificador `sealed` de uma interface que não tem uma superinterface direta `sealed` não quebra a compatibilidade com binários pré-existentes.

Se uma interface `sealed` I tivesse uma superinterface direta `sealed`, então deletar o modificador `sealed` impediria que I fosse recompilada, pois toda interface com uma superinterface direta `sealed` deve ser `sealed` ou `non-sealed`.

### 13.5.3. Superinterfaces

Alterações na hierarquia de interfaces causam erros da mesma forma que as alterações na hierarquia de classes, conforme descrito em [§13.4.4](<#/doc/jls/jls-13>). Em particular, alterações que resultam em qualquer superinterface anterior de uma classe não sendo mais uma superinterface podem quebrar a compatibilidade com binários pré-existentes, resultando em um `VerifyError`.

### 13.5.4. Membros de Interface

Adicionar um método `abstract`, `private` ou `static` a uma interface não quebra a compatibilidade com binários pré-existentes.

Adicionar um campo a uma superinterface de C pode ocultar um campo herdado de uma superclasse de C. Se a referência original era para um campo de instância, um `IncompatibleClassChangeError` resultará. Se a referência original era uma atribuição, um `IllegalAccessError` resultará.

Deletar um membro de uma interface pode causar erros de *linkage* em binários pré-existentes.

**Exemplo 13.5.4-1. Deletando Um Membro de Interface**
```java
    interface I { void hello(); }
    class Test implements I {
        public static void main(String[] args) {
            I anI = new Test();
            anI.hello();
        }
        public void hello() { System.out.println("hello"); }
    }
```

Este programa produz a saída:
```
    hello
```

Suponha que uma nova versão da interface `I` seja compilada:
```java
    interface I {}
```

Se `I` for recompilada, mas `Test` não, então executar o novo binário com o binário existente para `Test` resultará em um `NoSuchMethodError`.

### 13.5.5. Parâmetros de Tipo de Interface

Os efeitos de mudanças nos parâmetros de tipo de uma interface são os mesmos que os de mudanças análogas nos parâmetros de tipo de uma classe.

### 13.5.6. Declarações de Campo

As considerações para alterar declarações de campo em interfaces são as mesmas que para campos `static final` em classes, conforme descrito em [§13.4.8](<#/doc/jls/jls-13>) e [§13.4.9](<#/doc/jls/jls-13>).

### 13.5.7. Declarações de Método de Interface

As considerações para alterar declarações de método em interfaces incluem aquelas para alterar métodos em classes, conforme descrito em [§13.4.7](<#/doc/jls/jls-13>), [§13.4.14](<#/doc/jls/jls-13>), [§13.4.15](<#/doc/jls/jls-13>), [§13.4.19](<#/doc/jls/jls-13>), [§13.4.21](<#/doc/jls/jls-13>), [§13.4.22](<#/doc/jls/jls-13>), e [§13.4.23](<#/doc/jls/jls-13>).

Adicionar um método `default`, ou alterar um método de `abstract` para `default`, não quebra a compatibilidade com binários pré-existentes, mas pode causar um `IncompatibleClassChangeError` se um binário pré-existente tentar invocar o método. Este erro ocorre se a interface qualificadora da invocação do método, K, for uma subinterface de duas interfaces, I e J, onde ambas I e J declaram um método `default` com a mesma assinatura e resultado, e nem I nem J é uma subinterface da outra.

Em outras palavras, adicionar um método `default` é uma mudança binariamente compatível porque não introduz erros em tempo de *link*, mesmo que introduza erros em tempo de compilação ou tempo de invocação. Na prática, o risco de colisões acidentais ao introduzir um método `default` é semelhante aos associados à adição de um novo método a uma classe não-`final`. No caso de uma colisão, adicionar um método a uma classe é improvável que dispare um `LinkageError`, mas uma sobrescrita acidental do método em um filho pode levar a um comportamento imprevisível do método. Ambas as mudanças podem causar erros em tempo de compilação.

**Exemplo 13.5.7-1. Adicionando Um Método `default`
```java
    interface Painter {
        default void draw() {
            System.out.println("Here's a picture...");
        }
    }
    
    interface Cowboy {}
    
    public class CowboyArtist implements Cowboy, Painter {
        public static void main(String... args) {
            new CowboyArtist().draw();
       }
    }
```

Este programa produz a saída:
```
    Here's a picture...
```

Suponha que um método `default` seja adicionado a `Cowboy`:
```java
    interface Cowboy {
        default void draw() {
            System.out.println("Bang!");
        }
    }
```

Se `Cowboy` for recompilada, mas `CowboyArtist` não, então executar o novo binário com o binário existente para `CowboyArtist` fará o *link* sem erro, mas causará um `IncompatibleClassChangeError` quando `main` tentar invocar `draw()`.

### 13.5.8. Interfaces de Anotação

Interfaces de anotação se comportam exatamente como qualquer outra interface. Adicionar ou deletar um elemento de uma interface de anotação é análogo a adicionar ou deletar um método. Existem considerações importantes que regem outras mudanças em interfaces de anotação, como tornar uma interface de anotação repetível ([§9.6.3](<#/doc/jls/jls-09>)), mas estas não têm efeito no *linkage* de binários pela Java Virtual Machine. Em vez disso, tais mudanças afetam o comportamento das APIs de *reflection* na Plataforma Java SE que revelam a presença de anotações em um programa. As especificações da API descrevem seu comportamento quando várias mudanças são feitas nas interfaces de anotação subjacentes ([§1.4](<#/doc/jls/jls-01>)).

Adicionar ou deletar anotações não tem efeito no *linkage* correto das representações binárias de programas na linguagem de programação Java.

* * *

[Prev](<#/doc/jls/jls-12>) | | [Next](<#/doc/jls/jls-14>)
---|---|---
Chapter 12. Execution | [Home](<#/doc/jls/jls-01>) | Chapter 14. Blocks, Statements, and Patterns

* * *

[ Legal Notice ](<#/>)