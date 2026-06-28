# Inferência de Tipos

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Especificações Java SE](<#/>) > [Especificação da Linguagem Java](<#/doc/jls/jls-01>)

Capítulo 18. Inferência de Tipos
---
[Anterior](<#/doc/jls/jls-17>) | | [Próximo](<#/doc/jls/jls-19>)

* * *

# Capítulo 18. Inferência de Tipos

**Sumário**

[18.1. Conceitos e Notação](<#/doc/jls/jls-18>)
    

[18.1.1. Variáveis de Inferência](<#/doc/jls/jls-18>)
[18.1.2. Fórmulas de Restrição](<#/doc/jls/jls-18>)
[18.1.3. Limites](<#/doc/jls/jls-18>)
[18.2. Redução](<#/doc/jls/jls-18>)
    

[18.2.1. Restrições de Compatibilidade de Expressão](<#/doc/jls/jls-18>)
[18.2.2. Restrições de Compatibilidade de Tipo](<#/doc/jls/jls-18>)
[18.2.3. Restrições de Subtipagem](<#/doc/jls/jls-18>)
[18.2.4. Restrições de Igualdade de Tipo](<#/doc/jls/jls-18>)
[18.2.5. Restrições de Exceção Verificada](<#/doc/jls/jls-18>)
[18.3. Incorporação](<#/doc/jls/jls-18>)
    

[18.3.1. Pares Complementares de Limites](<#/doc/jls/jls-18>)
[18.3.2. Limites Envolvendo Conversão de Captura](<#/doc/jls/jls-18>)
[18.4. Resolução](<#/doc/jls/jls-18>)
[18.5. Usos da Inferência](<#/doc/jls/jls-18>)
    

[18.5.1. Inferência de Aplicabilidade de Invocação](<#/doc/jls/jls-18>)
[18.5.2. Inferência de Tipo de Invocação](<#/doc/jls/jls-18>)
    

[18.5.2.1. Compatibilidade de Invocação de Método Polimórfico](<#/doc/jls/jls-18>)
[18.5.2.2. Restrições de Argumentos Adicionais](<#/doc/jls/jls-18>)
[18.5.3. Inferência de Parametrização de Interface Funcional](<#/doc/jls/jls-18>)
[18.5.4. Inferência de Método Mais Específico](<#/doc/jls/jls-18>)
[18.5.5. Inferência de Tipo de Padrão de Record](<#/doc/jls/jls-18>)

Uma variedade de análises em tempo de compilação requer raciocínio sobre tipos que ainda não são conhecidos. Os principais entre eles são o teste de aplicabilidade de método genérico ([§18.5.1](<#/doc/jls/jls-18>)) e a inferência de tipo de invocação de método genérico ([§18.5.2](<#/doc/jls/jls-18>)). Em geral, nos referimos ao processo de raciocínio sobre tipos desconhecidos como _inferência de tipos_.

Em um nível alto, a inferência de tipos pode ser decomposta em três processos:

  * A _Redução_ pega uma asserção de compatibilidade sobre uma expressão ou tipo, chamada de _fórmula de restrição_, e a reduz a um conjunto de _limites_ em _variáveis de inferência_. Frequentemente, uma fórmula de restrição se reduz a _outras_ fórmulas de restrição, que devem ser reduzidas recursivamente. Um procedimento é seguido para identificar essas fórmulas de restrição adicionais e, finalmente, para expressar, por meio de um conjunto de limites, as condições sob as quais as escolhas para os tipos inferidos tornariam cada fórmula de restrição verdadeira.

  * A _Incorporação_ mantém um conjunto de limites de variáveis de inferência, garantindo que estes sejam consistentes à medida que novos limites são adicionados. Como os limites em uma variável podem, às vezes, impactar as possíveis escolhas para outra variável, este processo propaga limites entre essas variáveis interdependentes.

  * A _Resolução_ examina os limites em uma variável de inferência e determina uma _instanciação_ que é compatível com esses limites. Ela também decide a ordem em que as variáveis de inferência interdependentes devem ser resolvidas.

Esses processos interagem de perto: a redução pode desencadear a incorporação; a incorporação pode levar a uma redução adicional; e a resolução pode causar uma incorporação posterior.

  * [§18.1](<#/doc/jls/jls-18>) define mais precisamente os conceitos usados como resultados intermediários e a notação usada para expressá-los.

  * [§18.2](<#/doc/jls/jls-18>) descreve a redução em detalhes.

  * [§18.3](<#/doc/jls/jls-18>) descreve a incorporação em detalhes.

  * [§18.4](<#/doc/jls/jls-18>) descreve a resolução em detalhes.

  * [§18.5](<#/doc/jls/jls-18>) define como essas ferramentas de inferência são usadas para resolver certos problemas de análise em tempo de compilação.

Em comparação com a Edição Java SE 7 de _The Java® Language Specification_, mudanças importantes na inferência incluem:

  * Adicionar suporte para expressões lambda e referências de método como argumentos de invocação de método.

  * Generalizar para definir a inferência em termos de expressões polimórficas (poly expressions), que podem não ter tipos bem definidos até _depois_ que a inferência esteja completa. Isso tem o efeito notável de melhorar a inferência para invocações aninhadas de métodos genéricos e construtores diamond.

  * Descrever como a inferência é usada para lidar com tipos de destino de interface funcional parametrizados por curingas e análise de método mais específico.

  * Esclarecer a distinção entre o teste de aplicabilidade de invocação (que envolve apenas os argumentos da invocação) e a inferência de tipo de invocação (que incorpora um tipo de destino).

  * Atrasar a resolução de todas as variáveis de inferência, mesmo aquelas com limites inferiores, até a inferência de tipo de invocação, a fim de obter melhores resultados.

  * Melhorar o comportamento da inferência para variáveis interdependentes (ou autodependentes).

  * Eliminar bugs e potenciais fontes de confusão. Esta revisão lida com mais cuidado e precisão com a distinção entre contextos de conversão específicos e subtipagem, e descreve a redução paralelizando as relações correspondentes sem inferência. Onde há desvios intencionais das relações sem inferência, estes são explicitamente identificados como tal.

  * Lançar as bases para a evolução futura: aprimoramentos ou novas aplicações de inferência serão mais fáceis de integrar na especificação.

## 18.1. Conceitos e Notação

Esta seção define _variáveis de inferência_, _fórmulas de restrição_ e _limites_, conforme os termos serão usados ao longo deste capítulo. Ela também apresenta a notação.

### 18.1.1. Variáveis de Inferência

_Variáveis de inferência_ são _meta-variáveis_ para tipos - ou seja, são nomes especiais que permitem o raciocínio abstrato sobre tipos. Para distingui-las das _variáveis de tipo_, as variáveis de inferência são representadas com letras gregas, principalmente α.

O termo "tipo" é usado de forma flexível neste capítulo para incluir sintaxes semelhantes a tipos que contêm variáveis de inferência. O termo _tipo próprio_ exclui tais "tipos" que mencionam variáveis de inferência. Asserções que envolvem variáveis de inferência são asserções sobre cada tipo próprio que pode ser produzido substituindo cada variável de inferência por um tipo próprio.

### 18.1.2. Fórmulas de Restrição

_Fórmulas de restrição_ são asserções de compatibilidade ou subtipagem que podem envolver variáveis de inferência. As fórmulas podem assumir uma das seguintes formas:

  * ‹ _Expression_ -> T›: Uma expressão é compatível em um contexto de invocação flexível com o tipo T ([§5.3](<#/doc/jls/jls-05>)).

  * ‹S -> T›: Um tipo S é compatível em um contexto de invocação flexível com o tipo T ([§5.3](<#/doc/jls/jls-05>)).

  * ‹S `<:` T›: Um tipo de referência S é um subtipo de um tipo de referência T ([§4.10](<#/doc/jls/jls-04>)).

  * ‹S `<=` T›: Um argumento de tipo S é contido por um argumento de tipo T ([§4.5.1](<#/doc/jls/jls-04>)).

  * ‹S = T›: Um tipo S é o mesmo que um tipo T ([§4.3.4](<#/doc/jls/jls-04>)), ou um argumento de tipo S é o mesmo que um argumento de tipo T.

  * ‹ _LambdaExpression_ ->_throws_ T›: As exceções verificadas lançadas pelo corpo da _LambdaExpression_ são declaradas pela cláusula `throws` do tipo de função derivado de T.

  * ‹ _MethodReference_ ->_throws_ T›: As exceções verificadas lançadas pelo método referenciado são declaradas pela cláusula `throws` do tipo de função derivado de T.

Exemplos de fórmulas de restrição:

  * De `Collections.singleton("hi")`, temos a fórmula de restrição ‹`"hi"` -> α›. Através da redução, isso se tornará a fórmula de restrição: ‹`String` `<:` α›.

  * De `Arrays.asList(1, 2.0)`, temos as fórmulas de restrição ‹`1` -> α› e ‹`2.0` -> α›. Através da redução, estas se tornarão as fórmulas de restrição ‹`int` -> α› e ‹`double` -> α›, e então ‹`Integer` `<:` α› e ‹`Double` `<:` α›.

  * Do tipo de destino da invocação do construtor `List<Thread> lt = new ArrayList<>()`, temos a fórmula de restrição ‹`ArrayList`<`α`>` -> `List`<`Thread`>`›. Através da redução, isso se tornará a fórmula de restrição ‹α `<=` `Thread`›, e então ‹α = `Thread`›.

### 18.1.3. Limites

Durante o processo de inferência, um conjunto de _limites_ em variáveis de inferência é mantido. Um limite tem uma das seguintes formas:

  * S = T, onde pelo menos um de S ou T é uma variável de inferência: S é o mesmo que T.

  * S `<:` T, onde pelo menos um de S ou T é uma variável de inferência: S é um subtipo de T.

  * _false_ : Nenhuma escolha válida de variáveis de inferência existe.

  * G`<`α1, ..., αn`>` = capture(G`<`A1, ..., An`>`): As variáveis α1, ..., αn representam o resultado da conversão de captura ([§5.1.10](<#/doc/jls/jls-05>)) aplicada a G`<`A1, ..., An`>` (onde A1, ..., An podem ser tipos ou curingas e podem mencionar variáveis de inferência).

  * `throws` α: A variável de inferência α aparece em uma cláusula `throws`.

Um limite é _satisfeito_ por uma substituição de variável de inferência se, após aplicar a substituição, a asserção for verdadeira. O limite _false_ nunca pode ser satisfeito.

Alguns limites relacionam uma variável de inferência a um tipo próprio. Seja T um tipo próprio. Dado um limite da forma α = T ou T = α, dizemos que T é uma _instanciação_ de α. Similarmente, dado um limite da forma α `<:` T, dizemos que T é um _limite superior próprio_ de α, e dado um limite da forma T `<:` α, dizemos que T é um _limite inferior próprio_ de α.

Outros limites relacionam duas variáveis de inferência, ou uma variável de inferência a um tipo que contém variáveis de inferência. Tais limites, da forma S = T ou S `<:` T, são chamados de _dependências_.

Um limite da forma G`<`α1, ..., αn`>` = capture(G`<`A1, ..., An`>`) indica que α1, ..., αn são placeholders para os resultados da conversão de captura. Isso é necessário porque a conversão de captura só pode ser realizada em um tipo próprio, e as variáveis de inferência em A1, ..., An podem ainda não estar resolvidas.

Um limite da forma `throws` α é puramente informativo: ele direciona a resolução para otimizar a instanciação de α para que, se possível, não seja um tipo de exceção verificada.

Um resultado intermediário importante da inferência é um _conjunto de limites_. Às vezes, é conveniente referir-se a um conjunto de limites _vazio_ com o símbolo _true_; isso é meramente por conveniência, e os dois são intercambiáveis.

Exemplos de conjuntos de limites:

  * { α = `String` } contém um único limite, instanciando α como `String`.

  * { `Integer` `<:` α, `Double` `<:` α, α `<:` `Object` } descreve dois limites inferiores próprios e um limite superior próprio para α.

  * { α `<:` `Iterable<?>`, β `<:` `Object`, α `<:` `List`<`β`>` } descreve um limite superior próprio para cada um de α e β, juntamente com uma dependência entre eles.

  * { } não contém limites nem dependências, e pode ser referido como _true_.

  * { _false_ } expressa o fato de que nenhuma instanciação satisfatória existe.

Quando a inferência começa, um conjunto de limites é tipicamente gerado a partir de uma lista de declarações de parâmetros de tipo P1, ..., Pp e variáveis de inferência associadas α1, ..., αp. Tal conjunto de limites é gerado da seguinte forma. Para cada _l_ (1 ≤ _l_ ≤ _p_):

  * Se Pl não tiver um _TypeBound_, o limite _α l `<:` `Object`_ aparece no conjunto.

  * Caso contrário, para cada tipo T delimitado por `&` no _TypeBound_, o limite αl `<:` T`[`P1:=α1, ..., Pp:=αp`]` aparece no conjunto; se isso resultar em nenhum limite superior próprio para αl (apenas dependências), então o limite αl `<:` `Object` também aparece no conjunto.

## 18.2. Redução

A _Redução_ é o processo pelo qual um conjunto de fórmulas de restrição ([§18.1.2](<#/doc/jls/jls-18>)) é simplificado para produzir um conjunto de limites ([§18.1.3](<#/doc/jls/jls-18>)).

Cada fórmula de restrição é considerada por sua vez. As regras nesta seção especificam como a fórmula é reduzida a um ou ambos:

  * Um limite ou conjunto de limites, que deve ser incorporado ao conjunto de limites "atual". Inicialmente, o conjunto de limites atual está vazio.

  * Fórmulas de restrição adicionais, que devem ser reduzidas recursivamente.

A redução é concluída quando não restam mais fórmulas de restrição a serem reduzidas.

Os resultados de uma etapa de redução são sempre _preservadores de correção_ (soundness-preserving): se uma instanciação de variável de inferência satisfaz as restrições e limites reduzidos, ela também satisfará a restrição original. Por outro lado, a redução não é _preservadora de completude_ (completeness-preserving): pode existir instanciações de variáveis de inferência que satisfazem a restrição original, mas _não_ satisfazem uma restrição ou limite reduzido. Isso se deve a limitações inerentes do algoritmo, juntamente com o desejo de evitar complexidade indevida. Um efeito é que existem expressões para as quais a inferência de argumentos de tipo falha em encontrar uma solução, mas que podem ser bem tipadas se o programador inserir explicitamente os tipos apropriados.

### 18.2.1. Restrições de Compatibilidade de Expressão

Uma fórmula de restrição da forma ‹ _Expression_ -> T› é reduzida da seguinte forma:

  * Se T é um tipo próprio, a restrição se reduz a _true_ se a expressão for compatível em um contexto de invocação flexível com T ([§5.3](<#/doc/jls/jls-05>)), e _false_ caso contrário.

  * Caso contrário, se a expressão for uma expressão autônoma ([§15.2](<#/doc/jls/jls-15>)) do tipo S, a restrição se reduz a ‹S -> T›.

  * Caso contrário, a expressão é uma expressão polimórfica (poly expression) ([§15.2](<#/doc/jls/jls-15>)). O resultado depende da forma da expressão:

    * Se a expressão for uma expressão entre parênteses da forma `(` _Expression_ ' `)`, a restrição se reduz a ‹ _Expression_ ' -> T›.

    * Se a expressão for uma expressão de criação de instância de classe ou uma expressão de invocação de método, a restrição se reduz ao conjunto de limites B3 que seria usado para determinar a compatibilidade da expressão com o tipo de destino T, conforme definido em [§18.5.2.1](<#/doc/jls/jls-18>). (Para uma expressão de criação de instância de classe, o "método" correspondente usado para inferência é definido em [§15.9.3](<#/doc/jls/jls-15>)).

Este conjunto de limites pode conter novas variáveis de inferência, bem como dependências entre essas novas variáveis e as variáveis de inferência em T.

    * Se a expressão for uma expressão condicional da forma `e1` `?` `e2` `:` `e3`, a restrição se reduz a duas fórmulas de restrição, ‹`e2` -> T› e ‹`e3` -> T›.

    * Se a expressão for uma expressão lambda ou uma expressão de referência de método, o resultado é especificado abaixo.

    * Se a expressão for uma expressão `switch` com expressões de resultado `e1`, ..., `en`, a restrição se reduz a _n_ fórmulas de restrição, ‹`e1` -> T›, ..., ‹`en` -> T›.

Ao tratar invocações de métodos genéricos aninhados como expressões polimórficas, melhoramos o comportamento da inferência para invocações aninhadas. Por exemplo, o seguinte é ilegal no Java SE 7, mas legal no Java SE 8:
```java
    ProcessBuilder b = new ProcessBuilder(Collections.emptyList());
      // ProcessBuilder's constructor expects a List<String>
    
```

Quando _tanto_ a invocação externa quanto a aninhada requerem inferência, o problema é mais difícil. Por exemplo:
```java
    List<String> ls = new ArrayList<>(Collections.emptyList());
```

Nossa abordagem é "elevar" os limites inferidos para a invocação aninhada (simplesmente { α `<:` `Object` } no caso de `emptyList`) para o processo de inferência externo (neste caso, tentando inferir β onde o construtor é para o tipo `ArrayList`<`β`>`). Também inferimos dependências entre as variáveis de inferência aninhadas e as variáveis de inferência externas (a restrição ‹`List`<`α`>` -> `Collection`<`β`>`› se reduziria à dependência α = β). Dessa forma, a resolução das variáveis de inferência na invocação aninhada pode esperar até que informações adicionais possam ser inferidas da invocação externa (com base no tipo de destino da atribuição, β = `String`).

Uma fórmula de restrição da forma ‹ _LambdaExpression_ -> T›, onde T menciona pelo menos uma variável de inferência, é reduzida da seguinte forma:

  * Se T não for um tipo de interface funcional ([§9.8](<#/doc/jls/jls-09>)), a restrição se reduz a _false_.

  * Caso contrário, seja T' o tipo de destino base derivado de T, conforme especificado em [§15.27.3](<#/doc/jls/jls-15>). Se [§18.5.3](<#/doc/jls/jls-18>) for usado para derivar um tipo de interface funcional que é parametrizado, então o teste de que F`<`A'1, ..., A'm`>` é um subtipo de F`<`A1, ..., Am`>` não é realizado (em vez disso, é asserido com uma fórmula de restrição abaixo). Seja o tipo de função de destino para a expressão lambda o tipo de função de T'. Então:

    * Se nenhum tipo de função válido puder ser encontrado, a restrição se reduz a _false_.

    * Caso contrário, a congruência de _LambdaExpression_ com o tipo de função de destino é asserida da seguinte forma:

      * Se o número de parâmetros lambda difere do número de tipos de parâmetros do tipo de função, a restrição se reduz a _false_.

      * Se a expressão lambda for implicitamente tipada e um ou mais dos tipos de parâmetros do tipo de função não for um tipo próprio, a restrição se reduz a _false_.

Esta condição nunca surge na prática, devido ao tratamento de expressões lambda implicitamente tipadas em [§18.5.1](<#/doc/jls/jls-18>) e à substituição aplicada ao tipo de destino em [§18.5.2.2](<#/doc/jls/jls-18>).

      * Se o resultado do tipo de função for `void` e o corpo lambda não for uma expressão de instrução nem um bloco compatível com void, a restrição se reduz a _false_.

      * Se o resultado do tipo de função não for `void` e o corpo lambda for um bloco que não é compatível com valor, a restrição se reduz a _false_.

      * Caso contrário, a restrição se reduz a todas as seguintes fórmulas de restrição:

        * Se os parâmetros lambda tiverem tipos declarados explicitamente F1, ..., Fn e o tipo de função tiver tipos de parâmetros G1, ..., Gn, então (i) para todo _i_ (1 ≤ _i_ ≤ _n_), ‹Fi = Gi›, e (ii) ‹T' `<:` T›.

        * Se o tipo de retorno do tipo de função for um tipo R (não-`void`), assuma que os tipos de parâmetros do lambda são os mesmos que os tipos de parâmetros do tipo de função. Então:

          * Se R for um tipo próprio, e se o corpo lambda ou alguma expressão de resultado no corpo lambda não for compatível em um contexto de atribuição com R, então _false_.

          * Caso contrário, se R não for um tipo próprio, então onde o corpo lambda tem a forma _Expression_, a restrição ‹ _Expression_ -> R›; ou onde o corpo lambda é um bloco com expressões de resultado `e1`, ..., `em`, para todo _i_ (1 ≤ _i_ ≤ _m_), ‹`ei` -> R›.

A principal informação a ser derivada de uma restrição de compatibilidade envolvendo uma expressão lambda é o conjunto de limites nas variáveis de inferência que aparecem no tipo de retorno do tipo de função de destino. Isso é crucial, porque as interfaces funcionais são frequentemente genéricas, e muitos métodos que operam nesses tipos também são genéricos.

No caso mais simples, uma expressão lambda pode simplesmente fornecer um limite inferior para uma variável de inferência:
```java
    <T> List<T> makeThree(Factory<T> factory) { ... }
    String s = makeThree(() -> "abc").get(2);
    
```

Em casos mais complexos, uma expressão de resultado pode ser uma expressão polimórfica - talvez até outra expressão lambda - e, portanto, a variável de inferência pode ser passada por múltiplas fórmulas de restrição com diferentes tipos de destino antes que um limite seja produzido.

A maior parte do trabalho descrito nesta seção precede as asserções sobre as expressões de resultado; seu propósito é derivar o tipo de função da expressão lambda e verificar expressões que são claramente desqualificadas para compatibilidade.

Nós _não_ tentamos produzir limites em variáveis de inferência que aparecem na cláusula `throws` do tipo de função de destino. Isso ocorre porque a contenção de exceções não faz parte da compatibilidade ([§15.27.3](<#/doc/jls/jls-15>)) - em particular, não deve influenciar a aplicabilidade do método ([§18.5.1](<#/doc/jls/jls-18>)). No entanto, nós _obtemos_ limites nessas variáveis mais tarde, porque a inferência de tipo de invocação ([§18.5.2.2](<#/doc/jls/jls-18>)) produz fórmulas de restrição de contenção de exceção ([§18.2.5](<#/doc/jls/jls-18>)).

Note que se o tipo de destino for uma variável de inferência, ou se os tipos de parâmetros do tipo de destino contiverem variáveis de inferência, produzimos _false_. Durante a inferência de tipo de invocação ([§18.5.2.2](<#/doc/jls/jls-18>)), substituições extras são realizadas para instanciar essas variáveis de inferência, evitando assim este cenário. (Em outras palavras, a redução, na prática, nunca será "invocada" com um tipo de destino de uma dessas formas.)

Finalmente, note que as expressões de resultado de uma expressão lambda são exigidas por [§15.27.3](<#/doc/jls/jls-15>) para serem compatíveis em um contexto de atribuição com o tipo de retorno do tipo de destino, R. Se R for um tipo próprio, como `Byte` derivado de `Function`<`α,`Byte`>`, então a atribuibilidade é fácil de testar, e a redução o faz acima. Se R não for um tipo próprio, como α derivado de `Function`<`String,α`>`, então fazemos a suposição simplificadora acima de que a compatibilidade de invocação flexível será suficiente. A diferença entre a compatibilidade de atribuição e a compatibilidade de invocação flexível é que apenas a atribuição permite o estreitamento de expressões constantes, como `Byte b = 100;`. Consequentemente, nossa suposição simplificadora não preserva a completude: dado o tipo de retorno de destino α e uma expressão de resultado literal inteiro `100`, é concebível que α possa ser instanciado para `Byte`, mas a redução não produzirá tal limite.

Uma fórmula de restrição da forma ‹ _MethodReference_ -> T›, onde T menciona pelo menos uma variável de inferência, é reduzida da seguinte forma:

  * Se T não for um tipo de interface funcional, ou se T for um tipo de interface funcional que não possui um tipo de função ([§9.9](<#/doc/jls/jls-09>)), a restrição se reduz a _false_.

  * Caso contrário, se não existir um método potencialmente aplicável para a referência de método ao direcionar T, a restrição se reduz a _false_.

  * Caso contrário, se a referência de método for exata ([§15.13.1](<#/doc/jls/jls-15>)), então sejam P1, ..., Pn os tipos de parâmetros do tipo de função de T, e sejam F1, ..., Fk os tipos de parâmetros do método potencialmente aplicável. A restrição se reduz a um novo conjunto de restrições, da seguinte forma:

    * No caso especial em que _n_ = _k_ +1, o parâmetro do tipo P1 deve atuar como a referência de destino da invocação. A expressão de referência de método necessariamente tem a forma _ReferenceType`::` [TypeArguments] Identifier_. A restrição se reduz a ‹P1 `<:` _ReferenceType_ › e, para todo _i_ (2 ≤ _i_ ≤ _n_), ‹Pi -> Fi-1›.

Em todos os outros casos, _n_ = _k_, e a restrição se reduz a, para todo _i_ (1 ≤ _i_ ≤ _n_), ‹Pi -> Fi›.

    * Se o resultado do tipo de função não for `void`, seja R seu tipo de retorno. Então, se o resultado da declaração em tempo de compilação potencialmente aplicável for `void`, a restrição se reduz a _false_. Caso contrário, a restrição se reduz a ‹R' -> R›, onde R' é o resultado da aplicação da conversão de captura ([§5.1.10](<#/doc/jls/jls-05>)) ao tipo de retorno da declaração em tempo de compilação potencialmente aplicável.

  * Caso contrário, a referência de método é inexata, e:

    * Se um ou mais dos tipos de parâmetros do tipo de função não for um tipo próprio, a restrição se reduz a _false_.

Esta condição nunca surge na prática, devido ao tratamento de referências de método inexatas em [§18.5.1](<#/doc/jls/jls-18>) e à substituição aplicada ao tipo de destino em [§18.5.2.2](<#/doc/jls/jls-18>).

    * Caso contrário, uma busca por uma declaração em tempo de compilação é realizada, conforme especificado em [§15.13.1](<#/doc/jls/jls-15>). Se não houver declaração em tempo de compilação para a referência de método, a restrição se reduz a _false_. Caso contrário, há uma declaração em tempo de compilação, e: (seja R o resultado do tipo de função)

      * Se R for `void`, a restrição se reduz a _true_.

      * Caso contrário, se a expressão de referência de método omitir _TypeArguments_, e a declaração em tempo de compilação for um método genérico, e o tipo de retorno da declaração em tempo de compilação mencionar pelo menos um dos parâmetros de tipo do método, então:

        * Se R mencionar um dos parâmetros de tipo do tipo de função, a restrição se reduz a _false_.

Neste caso, uma restrição em termos de R pode levar uma variável de inferência a ser limitada por uma variável de tipo fora do escopo. Como instanciar uma variável de inferência com uma variável de tipo fora do escopo não faz sentido, preferimos evitar a situação desistindo imediatamente sempre que a possibilidade surgir. Esta simplificação não preserva a completude.

        * Se R não mencionar um dos parâmetros de tipo do tipo de função, então a restrição se reduz ao conjunto de limites B3 que seria usado para determinar a compatibilidade da referência de método ao direcionar o tipo de retorno do tipo de função, conforme definido em [§18.5.2.1](<#/doc/jls/jls-18>). B3 pode conter novas variáveis de inferência, bem como dependências entre essas novas variáveis e as variáveis de inferência em T.

A estratégia usada para determinar um tipo de retorno para um método genérico referenciado segue o padrão usado anteriormente nesta seção para invocações de métodos genéricos. Isso pode envolver "elevar" limites para o contexto externo e inferir dependências entre os dois conjuntos de variáveis de inferência.

      * Caso contrário, seja R' o resultado da aplicação da conversão de captura ([§5.1.10](<#/doc/jls/jls-05>)) ao tipo de retorno do tipo de invocação ([§15.12.2.6](<#/doc/jls/jls-15>)) da declaração em tempo de compilação. Se R' for `void`, a restrição se reduz a _false_; caso contrário, a restrição se reduz a ‹R' -> R›.

### 18.2.2. Restrições de Compatibilidade de Tipo

Uma fórmula de restrição da forma ‹S -> T› é reduzida da seguinte forma:

  * Se S e T são tipos próprios, a restrição se reduz a _true_ se S for compatível em um contexto de invocação flexível com T ([§5.3](<#/doc/jls/jls-05>)), e _false_ caso contrário.

  * Caso contrário, se S for um tipo primitivo, seja S' o resultado da aplicação da conversão boxing ([§5.1.7](<#/doc/jls/jls-05>)) a S. Então a restrição se reduz a ‹S' -> T›.

  * Caso contrário, se T for um tipo primitivo, seja T' o resultado da aplicação da conversão boxing ([§5.1.7](<#/doc/jls/jls-05>)) a T. Então a restrição se reduz a ‹S = T'›.

  * Caso contrário, se T for um tipo parametrizado da forma G`<`T1, ..., Tn`>`, e não existir nenhum tipo da forma G`<`...`>` que seja um supertipo de S, mas o tipo raw G for um supertipo de S, então a restrição se reduz a _true_.

  * Caso contrário, se T for um tipo array da forma G`<`T1, ..., Tn`>`[]`k, e não existir nenhum tipo da forma G`<`...`>`[]`k que seja um supertipo de S, mas o tipo raw G`[]`k for um supertipo de S, então a restrição se reduz a _true_. (A notação `[]`k indica um tipo array de _k_ dimensões.)

  * Caso contrário, a restrição se reduz a ‹S `<:` T›.

Os quarto e quinto casos são usos implícitos de conversão não verificada ([§5.1.9](<#/doc/jls/jls-05>)). Estes, juntamente com qualquer uso de conversão não verificada no primeiro caso, podem resultar em avisos de não verificação em tempo de compilação e podem influenciar o tipo de invocação de um método ([§15.12.2.6](<#/doc/jls/jls-15>)).

O boxing de T para T' não preserva a completude; por exemplo, se T fosse `long`, S poderia ser instanciado para `Integer`, que não é um subtipo de `Long`, mas poderia ser unboxed e então ampliado para `long`. Evitamos esse problema na maioria dos casos dando tratamento especial a tipos de retorno de variáveis de inferência que sabemos já estarem restritos a certos tipos primitivos empacotados; veja [§18.5.2.1](<#/doc/jls/jls-18>).

Similarmente, o tratamento da conversão não verificada sacrifica a completude em casos em que T não é um tipo parametrizado (por exemplo, se T é uma variável de inferência). Não é geralmente claro em tais situações se a conversão não verificada é necessária ou não. Como as conversões não verificadas introduzem avisos de não verificação, a inferência prefere evitá-las, a menos que seja claramente necessário.

### 18.2.3. Restrições de Subtipagem

Uma fórmula de restrição da forma ‹S `<:` T› é reduzida da seguinte forma:

  * Se S e T são tipos próprios, a restrição se reduz a _true_ se S for um subtipo de T ([§4.10](<#/doc/jls/jls-04>)), e _false_ caso contrário.

  * Caso contrário, se S for o tipo nulo, a restrição se reduz a _true_.

  * Caso contrário, se T for o tipo nulo, a restrição se reduz a _false_.

  * Caso contrário, se S for uma variável de inferência, α, a restrição se reduz ao limite α `<:` T.

  * Caso contrário, se T for uma variável de inferência, α, a restrição se reduz ao limite S `<:` α.

  * Caso contrário, a restrição é reduzida de acordo com a forma de T:

    * Se T for uma classe ou tipo de interface parametrizado, ou um tipo de classe interna de uma classe ou tipo de interface parametrizado (direta ou indiretamente), sejam A1, ..., An os argumentos de tipo de T. Entre os supertipos de S, um tipo de classe ou interface correspondente é identificado, com argumentos de tipo B1, ..., Bn. Se tal tipo não existir, a restrição se reduz a _false_. Caso contrário, a restrição se reduz às seguintes novas restrições: para todo _i_ (1 ≤ _i_ ≤ _n_), ‹Bi `<=` Ai›.

    * Se T for qualquer outro tipo de classe ou interface, então a restrição se reduz a _true_ se T estiver entre os supertipos de S, e _false_ caso contrário.

    * Se T for um tipo array, T'`[]`, então entre os supertipos de S que são tipos array, um tipo mais específico é identificado, S'`[]` (este pode ser o próprio S). Se tal tipo array não existir, a restrição se reduz a _false_. Caso contrário:

      * Se nem S' nem T' for um tipo primitivo, a restrição se reduz a ‹S' `<:` T'›.

      * Caso contrário, a restrição se reduz a _true_ se S' e T' forem o mesmo tipo primitivo, e _false_ caso contrário.

    * Se T for uma variável de tipo, há três casos:

      * Se S for um tipo de interseção do qual T é um elemento, a restrição se reduz a _true_.

      * Caso contrário, se T tiver um limite inferior, B, a restrição se reduz a ‹S `<:` B›.

      * Caso contrário, a restrição se reduz a _false_.

    * Se T for um tipo de interseção, I1 `&` ... `&` In, a restrição se reduz às seguintes novas restrições: para todo _i_ (1 ≤ _i_ ≤ _n_), ‹S `<:` Ii›.

Uma fórmula de restrição da forma ‹S `<=` T›, onde S e T são argumentos de tipo ([§4.5.1](<#/doc/jls/jls-04>)), é reduzida da seguinte forma:

  * Se T for um tipo:

    * Se S for um tipo, a restrição se reduz a ‹S = T›.

    * Se S for um curinga, a restrição se reduz a _false_.

  * Se T for um curinga da forma `?`, a restrição se reduz a _true_.

  * Se T for um curinga da forma `?` `extends` T':

    * Se S for um tipo, a restrição se reduz a ‹S `<:` T'›.

    * Se S for um curinga da forma `?`, a restrição se reduz a ‹`Object` `<:` T'›.

    * Se S for um curinga da forma `?` `extends` S', a restrição se reduz a ‹S' `<:` T'›.

    * Se S for um curinga da forma `?` `super` S', a restrição se reduz a ‹`Object` = T'›.
  * Se T é um wildcard da forma `?` `super` T':

    * Se S é um tipo, a restrição se reduz a ‹T' `<:` S›.

    * Se S é um wildcard da forma `?` `super` S', a restrição se reduz a ‹T' `<:` S'›.

    * Caso contrário, a restrição se reduz a _false_.

### 18.2.4. Restrições de Igualdade de Tipo

Uma fórmula de restrição da forma ‹S = T›, onde S e T são tipos, é reduzida da seguinte forma:

  * Se S e T são tipos próprios, a restrição se reduz a _true_ se S é o mesmo que T ([§4.3.4](<#/doc/jls/jls-04>)), e _false_ caso contrário.

  * Caso contrário, se S ou T é o tipo nulo, a restrição se reduz a _false_.

  * Caso contrário, se S é uma variável de inferência, α, e T não é um tipo primitivo, a restrição se reduz ao limite α = T.

  * Caso contrário, se T é uma variável de inferência, α, e S não é um tipo primitivo, a restrição se reduz ao limite S = α.

  * Caso contrário, se S e T são tipos de classe ou interface com a mesma *erasure*, onde S tem argumentos de tipo B1, ..., Bn e T tem argumentos de tipo A1, ..., An, a restrição se reduz às seguintes novas restrições: para todo _i_ (1 ≤ _i_ ≤ _n_), ‹Bi = Ai›.

  * Caso contrário, se S e T são tipos de array, S'`[]` e T'`[]`, a restrição se reduz a ‹S' = T'›.

  * Caso contrário, se S e T são tipos de interseção, uma correspondência entre os elementos de S e os elementos de T é estabelecida. Um elemento de S, Si, corresponde a um elemento de T, Tj, se Si e Tj são o mesmo tipo, ou ambas são parametrizações da mesma classe ou interface genérica, ou ambos são tipos de array.

Se cada elemento de S corresponde a exatamente um elemento de T, e vice-versa, então a restrição se reduz às seguintes novas restrições: para cada elemento Si de S e o elemento correspondente Tj de T, ‹Si = Tj›. Caso contrário, a restrição se reduz a _false_.

Esta regra não acomoda variáveis de inferência que aparecem diretamente como elementos de um tipo de interseção (em vez de aninhadas em um tipo parametrizado). Devido às restrições nas declarações de parâmetros de tipo ([§4.4](<#/doc/jls/jls-04>)), tais tipos de interseção não surgem na prática.

  * Caso contrário, a restrição se reduz a _false_.

Uma fórmula de restrição da forma ‹S = T›, onde S e T são argumentos de tipo ([§4.5.1](<#/doc/jls/jls-04>)), é reduzida da seguinte forma:

  * Se S e T são tipos, a restrição é reduzida conforme descrito acima.

  * Se S tem a forma `?` e T tem a forma `?`, a restrição se reduz a _true_.

  * Se S tem a forma `?` e T tem a forma `?` `extends` T', a restrição se reduz a ‹`Object` = T'›.

  * Se S tem a forma `?` `extends` S' e T tem a forma `?`, a restrição se reduz a ‹S' = `Object`›.

  * Se S tem a forma `?` `extends` S' e T tem a forma `?` `extends` T', a restrição se reduz a ‹S' = T'›.

  * Se S tem a forma `?` `super` S' e T tem a forma `?` `super` T', a restrição se reduz a ‹S' = T'›.

  * Caso contrário, a restrição se reduz a _false_.

### 18.2.5. Restrições de Exceções Verificadas

Uma fórmula de restrição da forma ‹ _LambdaExpression_ ->_throws_ T› é reduzida da seguinte forma:

  * Se T não é um tipo de interface funcional ([§9.8](<#/doc/jls/jls-09>)), a restrição se reduz a _false_.

  * Caso contrário, seja o tipo de função alvo para a expressão lambda determinado conforme especificado em [§15.27.3](<#/doc/jls/jls-15>). Se nenhum tipo de função válido puder ser encontrado, a restrição se reduz a _false_.

  * Caso contrário, se a expressão lambda é implicitamente tipada, e um ou mais dos tipos de parâmetro do tipo de função não é um tipo próprio, a restrição se reduz a _false_.

Esta condição nunca ocorre na prática, devido à substituição aplicada ao tipo alvo em [§18.5.2.2](<#/doc/jls/jls-18>).

  * Caso contrário, se o tipo de retorno do tipo de função não é `void` nem um tipo próprio, a restrição se reduz a _false_.

Esta condição nunca ocorre na prática, devido à substituição aplicada ao tipo alvo em [§18.5.2.2](<#/doc/jls/jls-18>).

  * Caso contrário, sejam E1, ..., En os tipos na cláusula `throws` do tipo de função que _não_ são tipos próprios. Se a expressão lambda é implicitamente tipada, sejam seus tipos de parâmetro os tipos de parâmetro do tipo de função. Se o corpo da lambda é uma *poly expression* ou um bloco contendo uma *poly result expression*, seja o tipo de retorno alvo o tipo de retorno do tipo de função. Sejam X1, ..., Xm os tipos de exceção verificados que o corpo da lambda pode lançar ([§11.2](<#/doc/jls/jls-11>)). Então há dois casos:

    * Se _n_ = `0` (a cláusula `throws` do tipo de função consiste apenas em tipos próprios), então se existe algum _i_ (1 ≤ _i_ ≤ _m_) tal que Xi não é um subtipo de qualquer tipo próprio na cláusula `throws`, a restrição se reduz a _false_ ; caso contrário, a restrição se reduz a _true_.

    * Se _n_ > `0`, a restrição se reduz a um conjunto de restrições de subtipo: para todo _i_ (1 ≤ _i_ ≤ _m_), se Xi não é um subtipo de qualquer tipo próprio na cláusula `throws`, então as restrições incluem, para todo _j_ (1 ≤ _j_ ≤ _n_), ‹Xi `<:` Ej›. Além disso, para todo _j_ (1 ≤ _j_ ≤ _n_), a restrição se reduz ao limite `throws` Ej.

Uma fórmula de restrição da forma ‹ _MethodReference_ ->_throws_ T› é reduzida da seguinte forma:

  * Se T não é um tipo de interface funcional, ou se T é um tipo de interface funcional mas não tem um tipo de função ([§9.9](<#/doc/jls/jls-09>)), a restrição se reduz a _false_.

  * Caso contrário, seja o tipo de função alvo para a expressão de referência de método o tipo de função de T. Se a referência de método é inexata ([§15.13.1](<#/doc/jls/jls-15>)) e um ou mais dos tipos de parâmetro do tipo de função não é um tipo próprio, a restrição se reduz a _false_.

  * Caso contrário, se a referência de método é inexata e o resultado do tipo de função não é `void` nem um tipo próprio, a restrição se reduz a _false_.

  * Caso contrário, sejam E1, ..., En os tipos na cláusula `throws` do tipo de função que _não_ são tipos próprios. Sejam X1, ..., Xm as exceções verificadas na cláusula `throws` do tipo de invocação da declaração em tempo de compilação da referência de método ([§15.13.2](<#/doc/jls/jls-15>)) (conforme derivado dos tipos de parâmetro e tipo de retorno do tipo de função). Então há dois casos:

    * Se _n_ = `0` (a cláusula `throws` do tipo de função consiste apenas em tipos próprios), então se existe algum _i_ (1 ≤ _i_ ≤ _m_) tal que Xi não é um subtipo de qualquer tipo próprio na cláusula `throws`, a restrição se reduz a _false_ ; caso contrário, a restrição se reduz a _true_.

    * Se _n_ > `0`, a restrição se reduz a um conjunto de restrições de subtipo: para todo _i_ (1 ≤ _i_ ≤ _m_), se Xi não é um subtipo de qualquer tipo próprio na cláusula `throws`, então as restrições incluem, para todo _j_ (1 ≤ _j_ ≤ _n_), ‹Xi `<:` Ej›. Além disso, para todo _j_ (1 ≤ _j_ ≤ _n_), a restrição se reduz ao limite `throws` Ej.

As restrições sobre exceções verificadas são tratadas separadamente das restrições sobre tipos de retorno, porque a compatibilidade do tipo de retorno influencia a aplicabilidade de métodos ([§18.5.1](<#/doc/jls/jls-18>)), enquanto as exceções influenciam o tipo de invocação somente após a resolução de sobrecarga ser concluída ([§18.5.2](<#/doc/jls/jls-18>)). Isso poderia ser simplificado incluindo a compatibilidade de exceção na definição de compatibilidade de expressão lambda ([§15.27.3](<#/doc/jls/jls-15>)), mas isso levaria a casos possivelmente surpreendentes em que exceções que podem ser lançadas por um corpo de lambda explicitamente tipado alteram a resolução de sobrecarga.

As exceções lançadas por um corpo de lambda não podem ser determinadas até que (i) os tipos de parâmetro da lambda sejam conhecidos, e (ii) o tipo alvo das expressões de resultado no corpo seja conhecido. (O segundo requisito é para considerar invocações de métodos genéricos nos quais, por exemplo, o mesmo parâmetro de tipo aparece no tipo de retorno e na cláusula `throws`.) Portanto, exigimos que ambos, conforme derivados do tipo alvo T, sejam tipos próprios.

Uma consequência é que expressões lambda retornadas de _outras_ expressões lambda não podem gerar restrições a partir de suas exceções lançadas. Essas restrições só podem ser geradas a partir de expressões lambda de nível superior.

Note que o tratamento do caso em que mais de uma variável de inferência aparece na cláusula `throws` de um tipo de função não preserva a completude. Qualquer uma das variáveis pode, por si só, satisfazer a restrição de que cada exceção verificada seja declarada, mas não podemos ter certeza de qual delas é a pretendida. Assim, para previsibilidade, restringimos ambas.

## 18.3. Incorporação

À medida que os conjuntos de limites (bound sets) são gerados e crescem durante a inferência, é possível que novos limites possam ser inferidos com base nas asserções dos limites originais. O processo de _incorporação_ identifica esses novos limites e os adiciona ao conjunto de limites.

A incorporação pode ocorrer em dois cenários. Um cenário é que o conjunto de limites contém pares complementares de limites; isso implica novas fórmulas de restrição, conforme especificado em [§18.3.1](<#/doc/jls/jls-18>). O outro cenário é que o conjunto de limites contém um limite envolvendo conversão de captura; isso implica novos limites e pode implicar novas fórmulas de restrição, conforme especificado em [§18.3.2](<#/doc/jls/jls-18>). Em ambos os cenários, quaisquer novas fórmulas de restrição são reduzidas, e quaisquer novos limites são adicionados ao conjunto de limites. Isso pode desencadear uma incorporação adicional; em última análise, o conjunto atingirá um ponto fixo e nenhum outro limite poderá ser inferido.

Se a incorporação de um conjunto de limites atingiu um ponto fixo, e o conjunto não contém o limite _false_ , então o conjunto de limites possui as seguintes propriedades:

  * Para cada combinação de um limite inferior próprio `L` e um limite superior próprio U de uma variável de inferência, `L` `<:` U.

  * Se cada variável de inferência mencionada por um limite tem uma instanciação, o limite é satisfeito pela substituição correspondente.

  * Dada uma dependência α = β, cada limite de α corresponde a um limite de β, e vice-versa.

  * Dada uma dependência α `<:` β, cada limite inferior de α é um limite inferior de β, e cada limite superior de β é um limite superior de α.

A afirmação de que a incorporação atinge um ponto fixo simplifica um pouco a questão. Baseando-se no trabalho de Kennedy e Pierce, _[On Decidability of Nominal Subtyping with Variance](<http://research.microsoft.com/apps/pubs/default.aspx?id=64041>)_ , esta propriedade pode ser provada argumentando que o conjunto de tipos que podem aparecer no conjunto de limites é finito. O argumento baseia-se em duas suposições:

  * Novas variáveis de captura não são geradas ao reduzir restrições de subtipo ([§18.2.3](<#/doc/jls/jls-18>)).

  * Caminhos de herança expansivos não são seguidos.

Esta especificação atualmente não garante essas propriedades (é imprecisa sobre o tratamento de wildcards ao reduzir restrições de subtipo, e não detecta caminhos de herança expansivos), mas pode fazê-lo em uma versão futura. (Este não é um problema novo: o algoritmo de subtipo Java também corre o risco de não terminação.)

### 18.3.1. Pares Complementares de Limites

(Nesta seção, S e T são variáveis de inferência ou tipos, e U é um tipo próprio. Para concisão, um limite da forma α = T também pode corresponder a um limite da forma T = α.)

Quando um conjunto de limites contém um par de limites que correspondem a uma das seguintes regras, uma nova fórmula de restrição é implicada:

  * α = S e α = T implicam ‹S = T›

  * α = S e α `<:` T implicam ‹S `<:` T›

  * α = S e T `<:` α implicam ‹T `<:` S›

  * S `<:` α e α `<:` T implicam ‹S `<:` T›

  * α = U e S = T implicam ‹S`[`α:=U`]` = T`[`α:=U`]`›

  * α = U e S `<:` T implicam ‹S`[`α:=U`]` `<:` T`[`α:=U`]`›

Quando um conjunto de limites contém um par de limites α `<:` S e α `<:` T, e existe um supertipo de S da forma G`<`S1, ..., Sn`>` e um supertipo de T da forma G`<`T1, ..., Tn`>` (para alguma classe ou interface genérica, G), então para todo _i_ (1 ≤ _i_ ≤ _n_), se Si e Ti são tipos (não wildcards), a fórmula de restrição ‹Si = Ti› é implicada.

### 18.3.2. Limites Envolvendo Conversão de Captura

Quando um conjunto de limites contém um limite da forma G`<`α1, ..., αn`>` = capture(G`<`A1, ..., An`>`), novos limites são implicados e novas fórmulas de restrição podem ser implicadas, da seguinte forma.

Sejam P1, ..., Pn os parâmetros de tipo de G e B1, ..., Bn os limites desses parâmetros de tipo. Seja θ a substituição `[`P1:=α1, ..., Pn:=αn`]`. Seja R um tipo que _não_ é uma variável de inferência (mas não é necessariamente um tipo próprio).

Um conjunto de limites em α1, ..., αn é implicado, gerado a partir dos limites declarados de P1, ..., Pn conforme especificado em [§18.1.3](<#/doc/jls/jls-18>).

Além disso, para todo _i_ (1 ≤ _i_ ≤ _n_):

  * Se Ai não é um wildcard, então o limite αi = Ai é implicado.

  * Se Ai é um wildcard da forma `?`:

    * αi = R implica o limite _false_

    * αi `<:` R implica a fórmula de restrição ‹Bi θ `<:` R›

    * R `<:` αi implica o limite _false_

  * Se Ai é um wildcard da forma `?` `extends` T:

    * αi = R implica o limite _false_

    * Se Bi é `Object`, então αi `<:` R implica a fórmula de restrição ‹T `<:` R›

    * Se T é `Object`, então αi `<:` R implica a fórmula de restrição ‹Bi θ `<:` R›

    * R `<:` αi implica o limite _false_

  * Se Ai é um wildcard da forma `?` `super` T:

    * αi = R implica o limite _false_

    * αi `<:` R implica a fórmula de restrição ‹Bi θ `<:` R›

    * R `<:` αi implica a fórmula de restrição ‹R `<:` T›

## 18.4. Resolução

Dado um conjunto de limites que não contém o limite _false_ , um subconjunto das variáveis de inferência mencionadas pelo conjunto de limites pode ser _resolvido_. Isso significa que uma instanciação satisfatória pode ser adicionada ao conjunto para cada variável de inferência, até que todas as variáveis solicitadas tenham instanciações.

As dependências no conjunto de limites podem exigir que as variáveis sejam resolvidas em uma ordem particular, ou que variáveis adicionais sejam resolvidas. As dependências são especificadas da seguinte forma:

  * Dado um limite de uma das seguintes formas, onde T é uma variável de inferência β ou um tipo que menciona β:

    * α = T

    * α `<:` T

    * T = α

    * T `<:` α

Se α aparece no lado esquerdo de outro limite da forma G`<`..., α, ...`>` = capture(G`<`...`>`), então β depende da resolução de α. Caso contrário, α depende da resolução de β.

  * Uma variável de inferência α que aparece no lado esquerdo de um limite da forma G`<`..., α, ...`>` = capture(G`<`...`>`) depende da resolução de todas as outras variáveis de inferência mencionadas neste limite (em ambos os lados do sinal =).

  * Uma variável de inferência α depende da resolução de uma variável de inferência β se existe uma variável de inferência γ tal que α depende da resolução de γ e γ depende da resolução de β.

  * Uma variável de inferência α depende da resolução de si mesma.

Dado um conjunto de variáveis de inferência a serem resolvidas, seja V a união deste conjunto e de todas as variáveis das quais a resolução de pelo menos uma variável neste conjunto depende.

Se cada variável em V tem uma instanciação, então a resolução é bem-sucedida e este procedimento termina.

Caso contrário, seja { α1, ..., αn } um subconjunto não vazio de variáveis não instanciadas em V tal que (i) para todo _i_ (1 ≤ _i_ ≤ _n_), se αi depende da resolução de uma variável β, então β tem uma instanciação ou existe algum _j_ tal que β = αj; e (ii) não existe um subconjunto próprio não vazio de { α1, ..., αn } com esta propriedade. A resolução prossegue gerando uma instanciação para cada uma de α1, ..., αn com base nos limites no conjunto de limites:

  * Se o conjunto de limites não contém um limite da forma G`<`..., αi, ...`>` = capture(G`<`...`>`) para todo _i_ (1 ≤ _i_ ≤ _n_), então uma instanciação candidata Ti é definida para cada αi:

    * Se αi tem um ou mais limites inferiores _próprios_, `L1`, ..., `Lk`, então Ti = lub(`L1`, ..., `Lk`) ([§4.10.4](<#/doc/jls/jls-04>)).

    * Caso contrário, se o conjunto de limites contém `throws` αi, e cada limite superior próprio de αi é um supertipo de `RuntimeException`, então Ti = `RuntimeException`.

    * Caso contrário, onde αi tem limites superiores _próprios_ U1, ..., Uk, Ti = glb(U1, ..., Uk) ([§5.1.10](<#/doc/jls/jls-05>)).

Os limites α1 = T1, ..., αn = Tn são incorporados ao conjunto de limites atual.

Se o resultado não contém o limite _false_ , então o resultado se torna o novo conjunto de limites, e a resolução prossegue selecionando um novo conjunto de variáveis para instanciar (se necessário), conforme descrito acima.

Caso contrário, o resultado contém o limite _false_ , então uma segunda tentativa é feita para instanciar { α1, ..., αn } realizando o passo abaixo.

  * Se o conjunto de limites contém um limite da forma G`<`..., αi, ...`>` = capture(G`<`...`>`) para algum _i_ (1 ≤ _i_ ≤ _n_), ou;

Se o conjunto de limites produzido no passo acima contém o limite _false_ ;

então sejam Y1, ..., Yn novas variáveis de tipo cujos limites são os seguintes:

    * Para todo _i_ (1 ≤ _i_ ≤ _n_), se αi tem um ou mais limites inferiores _próprios_ `L1`, ..., `Lk`, então seja o limite inferior de Yi lub(`L1`, ..., `Lk`); se não, então Yi não tem limite inferior.

    * Para todo _i_ (1 ≤ _i_ ≤ _n_), onde αi tem limites superiores U1, ..., Uk, seja o limite superior de Yi glb(U1 θ, ..., Uk θ), onde θ é a substituição `[`α1:=Y1, ..., αn:=Yn`]`.

Se as variáveis de tipo Y1, ..., Yn não têm limites bem formados (ou seja, um limite inferior não é um subtipo de um limite superior, ou um tipo de interseção é inconsistente), então a resolução falha.

Caso contrário, para todo _i_ (1 ≤ _i_ ≤ _n_), todos os limites da forma G`<`..., αi, ...`>` = capture(G`<`...`>`) são removidos do conjunto de limites atual, e os limites α1 = Y1, ..., αn = Yn são incorporados.

Se o resultado não contém o limite _false_ , então o resultado se torna o novo conjunto de limites, e a resolução prossegue selecionando um novo conjunto de variáveis para instanciar (se necessário), conforme descrito acima.

Caso contrário, o resultado contém o limite _false_ , e a resolução falha.

O primeiro método de instanciação de uma variável de inferência deriva a instanciação dos limites dessa variável. Às vezes, no entanto, dependências complexas significam que o resultado não está dentro dos limites da variável. Nesse caso, um método diferente de instanciação é realizado, análogo à conversão de captura ([§5.1.10](<#/doc/jls/jls-05>)): novas variáveis de tipo são introduzidas, com limites derivados dos limites das variáveis de inferência. Note que os limites inferiores dessas variáveis de "captura" são calculados usando apenas tipos próprios: isso é importante para evitar tentativas de realizar cálculos de tipagem em variáveis de tipo não instanciadas.
## 18.5. Usos da Inferência

Utilizando os processos de inferência definidos acima, as seguintes análises são realizadas em tempo de compilação.

### 18.5.1. Inferência de Aplicabilidade de Invocação

Dada uma invocação de método que não fornece argumentos de tipo explícitos, o processo para determinar se um método genérico `m` potencialmente aplicável é aplicável é o seguinte:

  * Onde P1, ..., Pp (_p_ ≥ 1) são os parâmetros de tipo de `m`, sejam α1, ..., αp variáveis de inferência, e seja θ a substituição `[`P1:=α1, ..., Pp:=αp`]`.

  * Um conjunto de limites inicial, B0, é gerado a partir dos limites declarados de P1, ..., Pp, conforme descrito em [§18.1.3](<#/doc/jls/jls-18>).

  * Para todo _i_ (1 ≤ _i_ ≤ _p_), se Pi aparece na cláusula `throws` de `m`, então o limite `throws` αi é implícito. Esses limites, se houver, são incorporados a B0 para produzir um novo conjunto de limites, B1.

  * Um conjunto de fórmulas de restrição, C, é gerado da seguinte forma.

Sejam F1, ..., Fn os tipos de parâmetros formais de `m`, e sejam `e1`, ..., `ek` as expressões de argumento reais da invocação. Então:

    * Para testar a _aplicabilidade por invocação estrita_ :

Se _k_ ≠ _n_ , ou se existe um _i_ (1 ≤ _i_ ≤ _n_) tal que `ei` é pertinente à aplicabilidade ([§15.12.2.2](<#/doc/jls/jls-15>)) e (i) `ei` é uma expressão autônoma de um tipo primitivo, mas Fi é um tipo de referência, ou (ii) Fi é um tipo primitivo, mas `ei` não é uma expressão autônoma de um tipo primitivo; então o método não é aplicável e não há necessidade de prosseguir com a inferência.

Caso contrário, C inclui, para todo _i_ (1 ≤ _i_ ≤ _k_) onde `ei` é pertinente à aplicabilidade, ‹`ei` -> Fi θ›.

    * Para testar a _aplicabilidade por invocação flexível_ :

Se _k_ ≠ _n_ , o método não é aplicável e não há necessidade de prosseguir com a inferência.

Caso contrário, C inclui, para todo _i_ (1 ≤ _i_ ≤ _k_) onde `ei` é pertinente à aplicabilidade, ‹`ei` -> Fi θ›.

    * Para testar a _aplicabilidade por invocação de aridade variável_ :

Sejam F'1, ..., F'k os primeiros _k_ tipos de parâmetros de aridade variável de `m` ([§15.12.2.4](<#/doc/jls/jls-15>)). C inclui, para todo _i_ (1 ≤ _i_ ≤ _k_) onde `ei` é pertinente à aplicabilidade, ‹`ei` -> F'i θ›.

  * C é reduzido ([§18.2](<#/doc/jls/jls-18>)) e os limites resultantes são incorporados a B1 para produzir um novo conjunto de limites, B2.

  * Finalmente, o método `m` é aplicável se B2 não contiver o limite _false_ e a resolução de todas as variáveis de inferência em B2 for bem-sucedida ([§18.4](<#/doc/jls/jls-18>)).

Considere a seguinte invocação e atribuição de método:
```java
    List<Number> ln = Arrays.asList(1, 2.0);
```

Um método aplicável mais específico para a invocação deve ser identificado conforme descrito em [§15.12](<#/doc/jls/jls-15>). O único método potencialmente aplicável ([§15.12.2.1](<#/doc/jls/jls-15>)) é declarado da seguinte forma:
```java
    public static <T> List<T> asList(T... a)
```

Trivialmente (por causa de sua aridade), este método não é aplicável por invocação estrita ([§15.12.2.2](<#/doc/jls/jls-15>)) nem aplicável por invocação flexível ([§15.12.2.3](<#/doc/jls/jls-15>)). Mas como não há outros candidatos, em uma terceira fase o método é verificado quanto à aplicabilidade por invocação de aridade variável.

O conjunto de limites inicial, B, é um limite superior trivial para uma única variável de inferência, α:

```
{ α <:` `Object` }
```

O conjunto de fórmulas de restrição inicial é o seguinte:

```
{ ‹`1` -> α›, ‹`2.0` -> α› }
```

Estes são reduzidos a um novo conjunto de limites, B1:

```
{ α <:` `Object`, `Integer` <:` α, `Double` <:` α }
```

Então, para testar se o método é aplicável, tentamos resolver esses limites. Conseguimos, produzindo a instanciação bastante complexa

```
α = `Number & Comparable<? extends Number & Comparable<?>>`
```

Demonstramos assim que o método é aplicável; como não existem outros candidatos, ele é o método aplicável mais específico. Ainda assim, o tipo da invocação do método, e sua compatibilidade com o tipo de destino na atribuição, não é determinado até que ocorra inferência adicional, conforme descrito na próxima seção.

### 18.5.2. Inferência de Tipo de Invocação

Dada uma expressão de invocação de método que não fornece argumentos de tipo explícitos, e um método genérico `m` aplicável mais específico correspondente, o processo para inferir o tipo de invocação ([§15.12.2.6](<#/doc/jls/jls-15>)) do método escolhido pode exigir a resolução de restrições adicionais, tanto para afirmar a compatibilidade com um tipo de destino quanto para afirmar a validade das expressões de argumento da invocação do método.

É importante notar que múltiplas "rodadas" de inferência estão envolvidas na descoberta do tipo de uma invocação de método. Isso é necessário, por exemplo, para permitir que um tipo de destino influencie o tipo da invocação sem permitir que ele influencie a escolha de um método aplicável. A primeira rodada ([§18.5.1](<#/doc/jls/jls-18>)) produz um conjunto de limites e testa se uma resolução existe, mas não se compromete com essa resolução. Rodadas subsequentes reduzem restrições adicionais até que uma etapa de resolução final determine o tipo "real" da expressão.

#### 18.5.2.1. Compatibilidade de Invocação de Método Polimórfico

Se a expressão de invocação de método for uma expressão polimórfica ([§15.12](<#/doc/jls/jls-15>)), sua compatibilidade com um tipo de destino T é determinada da seguinte forma.

Se a expressão de invocação de método aparecer em um contexto de invocação estrita e T for um tipo primitivo, a expressão não é compatível com T.

Caso contrário:

  * Seja B2 o conjunto de limites produzido pela redução para demonstrar que `m` é aplicável em [§18.5.1](<#/doc/jls/jls-18>).

(Embora tenha sido necessário em [§18.5.1](<#/doc/jls/jls-18>) demonstrar que as variáveis de inferência em B2 poderiam ser resolvidas, a fim de estabelecer a aplicabilidade, as instanciações produzidas por esta etapa de resolução _não_ são consideradas parte de B2.)

  * Seja B3 o conjunto de limites derivado de B2 da seguinte forma.

Seja R o tipo de retorno de `m`, e seja θ a substituição `[`P1:=α1, ..., Pp:=αp`]` definida em [§18.5.1](<#/doc/jls/jls-18>) para substituir os parâmetros de tipo de `m` por variáveis de inferência, e seja T o tipo de destino da invocação. Então:

    * Se a conversão não verificada foi necessária para que o método fosse aplicável durante a redução do conjunto de restrições em [§18.5.1](<#/doc/jls/jls-18>), a fórmula de restrição ‹|R| -> T› é reduzida e incorporada a B2.

    * Caso contrário, se R θ for um tipo parametrizado, G`<`A1, ..., An`>`, e um dos A1, ..., An for um wildcard, então, para novas variáveis de inferência β1, ..., βn, a fórmula de restrição ‹G`<`β1, ..., βn`>` -> T› é reduzida e incorporada, juntamente com o limite G`<`β1, ..., βn`>` = capture(G`<`A1, ..., An`>`), a B2.

    * Caso contrário, se R θ for uma variável de inferência α, e uma das seguintes condições for verdadeira:

      * T é um tipo de referência, mas não é um tipo parametrizado por wildcard, e (i) B2 contém um limite de uma das formas α = S ou S `<:` α, onde S é um tipo parametrizado por wildcard, ou (ii) B2 contém dois limites das formas S1 `<:` α e S2 `<:` α, onde S1 e S2 têm supertipos que são duas parametrizações diferentes da mesma classe ou interface genérica.

      * T é uma parametrização de uma classe ou interface genérica, G, e B2 contém um limite de uma das formas α = S ou S `<:` α, onde não existe nenhum tipo da forma G`<`...`>` que seja um supertipo de S, mas o tipo raw |G`<`...`>`| é um supertipo de S.

      * T é um tipo primitivo, e uma das classes wrapper primitivas mencionadas em [§5.1.7](<#/doc/jls/jls-05>) é uma instanciação, limite superior ou limite inferior para α em B2.

então α é resolvido em B2, e onde a captura da instanciação resultante de α é U, a fórmula de restrição ‹U -> T› é reduzida e incorporada a B2.

    * Caso contrário, a fórmula de restrição ‹R θ -> T› é reduzida e incorporada a B2.

  * A expressão de invocação de método é compatível com T se B3 não contiver o limite _false_ e a resolução de todas as variáveis de inferência em B3 for bem-sucedida ([§18.4](<#/doc/jls/jls-18>)).

Considere o exemplo da seção anterior:
```java
    List<Number> ln = Arrays.asList(1, 2.0);
```

O método aplicável mais específico foi identificado como:
```java
    public static <T> List<T> asList(T... a)
```

Para completar a verificação de tipo da invocação do método, devemos determinar se ela é compatível com seu tipo de destino, `List`<`Number`>`.

O conjunto de limites usado para demonstrar a aplicabilidade na seção anterior, B2, foi:

```
{ α <:` `Object`, `Integer` <:` α, `Double` <:` α }
```

O novo conjunto de fórmulas de restrição é o seguinte:

```
{ ‹`List`<`α`>`` -> `List`<`Number`>``› }
```

Esta restrição de compatibilidade produz um limite de igualdade para α, que é incluído no novo conjunto de limites, B3:

```
{ α <:` `Object`, `Integer` <:` α, `Double` <:` α, α = `Number` }
```

Esses limites são trivialmente resolvidos:

```
α = `Number`
```

Finalmente, realizamos uma substituição no tipo de retorno declarado de `asList` para determinar que a invocação do método tem o tipo `List`<`Number`>`; claramente, isso é compatível com o tipo de destino.

Esta estratégia de inferência é diferente da edição Java SE 7 de _The Java® Language Specification_, que teria instanciado α com base em seus limites inferiores (antes mesmo de considerar o tipo de destino da invocação), como fizemos na seção anterior. Isso resultaria em um erro de tipo, já que o tipo resultante não é um subtipo de `List`<`Number`>`.

Sob várias circunstâncias especiais, com base nos limites que aparecem em B2, resolvemos ansiosamente uma variável de inferência que aparece como o tipo de retorno da invocação. Isso é para evitar situações infelizes em que a restrição usual, ‹R θ -> T›, não preserva a completude. É, infelizmente, possível que, ao resolver ansiosamente a variável, não consigamos usar limites que seriam inferidos posteriormente. Também é possível que, em alguns casos, limites que seriam inferidos posteriormente a partir dos argumentos da invocação (como expressões lambda implicitamente tipadas) teriam causado um resultado diferente se tivessem estado presentes em B2. Apesar dessas limitações, a estratégia permite resultados razoáveis em casos de uso típicos e é compatível com o algoritmo da edição Java SE 7 de _The Java® Language Specification_.

#### 18.5.2.2. Restrições de Argumentos Adicionais

O tipo de invocação para o método escolhido é determinado após considerar restrições adicionais que podem ser implicadas pelas expressões de argumento da expressão de invocação de método, da seguinte forma:

  * Se a expressão de invocação de método for uma expressão polimórfica, seja B3 o conjunto de limites gerado em [§18.5.2.1](<#/doc/jls/jls-18>) para demonstrar compatibilidade com o tipo de destino real da invocação do método.

Se a expressão de invocação de método não for uma expressão polimórfica, seja B3 o mesmo que o conjunto de limites produzido pela redução para demonstrar que `m` é aplicável em [§18.5.1](<#/doc/jls/jls-18>).

(Embora tenha sido necessário em [§18.5.1](<#/doc/jls/jls-18>) e [§18.5.2.1](<#/doc/jls/jls-18>) demonstrar que as variáveis de inferência no conjunto de limites poderiam ser resolvidas, as instanciações produzidas por essas etapas de resolução _não_ são consideradas parte de B3.)

  * Um conjunto de fórmulas de restrição, C, é gerado da seguinte forma.

Sejam `e1`, ..., `ek` as expressões de argumento reais da expressão de invocação de método.

Se `m` for aplicável por invocação estrita ou flexível, sejam F1, ..., Fk os tipos de parâmetros formais de `m`; se `m` for aplicável por invocação de aridade variável, sejam F1, ..., Fk os primeiros _k_ tipos de parâmetros de aridade variável de `m` ([§15.12.2.4](<#/doc/jls/jls-15>)).

Seja θ a substituição `[`P1:=α1, ..., Pp:=αp`]` definida em [§18.5.1](<#/doc/jls/jls-18>) para substituir os parâmetros de tipo de `m` por variáveis de inferência.

Então, para todo _i_ (1 ≤ _i_ ≤ _k_):

    * Se `ei` não for pertinente à aplicabilidade, C contém ‹`ei` -> Fi θ›.

    * Restrições adicionais podem ser incluídas, dependendo da forma de `ei`:

      * Se `ei` for uma _LambdaExpression_ , C contém ‹ _LambdaExpression_ ->_throws_ Fi θ›, e o corpo da lambda é pesquisado por restrições adicionais:

        * Para um corpo de lambda de bloco, a pesquisa é aplicada recursivamente a cada uma de suas expressões de resultado.

        * Para uma expressão de criação de instância de classe polimórfica ou uma expressão de invocação de método polimórfica , C contém todas as fórmulas de restrição que apareceriam no conjunto C gerado por [§18.5.2](<#/doc/jls/jls-18>) ao inferir o tipo de invocação da expressão polimórfica.

        * Para uma expressão entre parênteses, a pesquisa é aplicada recursivamente à expressão contida.

        * Para uma expressão condicional, a pesquisa é aplicada recursivamente ao segundo e terceiro operandos.

        * Para uma expressão lambda, a pesquisa é aplicada recursivamente ao corpo da lambda.

        * Para uma expressão `switch`, a pesquisa é aplicada recursivamente a cada uma de suas expressões de resultado.

      * Se `ei` for uma _MethodReference_ , C contém ‹ _MethodReference_ ->_throws_ Fi θ›.

      * Se `ei` for uma expressão de criação de instância de classe polimórfica ou uma expressão de invocação de método polimórfica, C contém todas as fórmulas de restrição que apareceriam no conjunto C gerado por [§18.5.2](<#/doc/jls/jls-18>) ao inferir o tipo de invocação da expressão polimórfica.

      * Se `ei` for uma expressão entre parênteses, essas regras são aplicadas recursivamente à expressão contida.

      * Se `ei` for uma expressão condicional, essas regras são aplicadas recursivamente ao segundo e terceiro operandos.

      * Se `ei` for uma expressão `switch`, essas regras são aplicadas recursivamente a cada uma de suas expressões de resultado.

  * Enquanto C não estiver vazio, o seguinte processo é repetido, começando com o conjunto de limites B3 e acumulando novos limites em um conjunto de limites "atual", produzindo finalmente um novo conjunto de limites, B4:

    1. Um subconjunto de restrições é selecionado em C, satisfazendo a propriedade de que, para cada restrição, nenhuma variável de entrada pode influenciar uma variável de saída de qualquer outra restrição em C. Os termos _variável de entrada_ e _variável de saída_ são definidos abaixo. Uma variável de inferência α _pode influenciar_ uma variável de inferência β se α depender da resolução de β ([§18.4](<#/doc/jls/jls-18>)), ou vice-versa; ou se existir uma terceira variável de inferência γ tal que α possa influenciar γ e γ possa influenciar β.

Se este subconjunto estiver vazio, então há um ciclo (ou ciclos) no grafo de dependências entre as restrições. Neste caso, as restrições em C que participam de um ciclo (ou ciclos) de dependência e não dependem de nenhuma restrição fora do ciclo (ou ciclos) são consideradas. Uma única restrição é selecionada entre essas restrições consideradas, da seguinte forma:

       * Se alguma das restrições consideradas tiver a forma ‹ _Expression_ -> T›, então a restrição selecionada é a restrição considerada desta forma que contém a expressão à esquerda ([§3.5](<#/doc/jls/jls-03>)) da expressão de todas as outras restrições consideradas desta forma.

       * Se nenhuma restrição considerada tiver a forma ‹ _Expression_ -> T›, então a restrição selecionada é a restrição considerada que contém a expressão à esquerda da expressão de todas as outras restrições consideradas.

    2. As restrições selecionadas são removidas de C.

    3. As variáveis de entrada α1, ..., αm de todas as restrições selecionadas são resolvidas.

    4. Onde T1, ..., Tm são as instanciações de α1, ..., αm, a substituição `[`α1:=T1, ..., αm:=Tm`]` é aplicada a cada restrição.

    5. As restrições resultantes da substituição são reduzidas e incorporadas ao conjunto de limites atual.

  * Finalmente, se B4 não contiver o limite _false_ , as variáveis de inferência em B4 são resolvidas.

Se a resolução for bem-sucedida com as instanciações T1, ..., Tp para as variáveis de inferência α1, ..., αp, seja θ' a substituição `[`P1:=T1, ..., Pp:=Tp`]`. Então:

    * Se a conversão não verificada foi necessária para que o método fosse aplicável durante a redução do conjunto de restrições em [§18.5.1](<#/doc/jls/jls-18>), então os tipos de parâmetros do tipo de invocação de `m` são obtidos aplicando θ' aos tipos de parâmetros do tipo de `m`, e o tipo de retorno e os tipos lançados do tipo de invocação de `m` são dados pela eliminação do tipo de retorno e dos tipos lançados do tipo de `m`.

    * Se a conversão não verificada não foi necessária para que o método fosse aplicável, então o tipo de invocação de `m` é obtido aplicando θ' ao tipo de `m`.

Se B4 contiver o limite _false_ , ou se a resolução falhar, então ocorre um erro em tempo de compilação.

O processo de redução de restrições de argumentos adicionais pode exigir a ordenação cuidadosa de fórmulas de restrição das formas ‹ _Expression_ -> T›, ‹ _LambdaExpression_ ->_throws_ T› e ‹ _MethodReference_ ->_throws_ T›. Para facilitar essa ordenação, as _variáveis de entrada_ dessas restrições são definidas da seguinte forma:

  * Para ‹ _LambdaExpression_ -> T›:

    * Se T for uma variável de inferência, ela é a (única) variável de entrada.

    * Se T for um tipo de interface funcional, e um tipo de função puder ser derivado de T ([§15.27.3](<#/doc/jls/jls-15>)), então as variáveis de entrada incluem (i) se a expressão lambda for implicitamente tipada, as variáveis de inferência mencionadas pelos tipos de parâmetros do tipo de função; e (ii) se o tipo de retorno do tipo de função, R, não for `void`, então para cada expressão de resultado `e` no corpo da lambda (ou para o próprio corpo se for uma expressão), as variáveis de entrada de ‹`e` -> R›.

    * Caso contrário, não há variáveis de entrada.

  * Para ‹ _LambdaExpression_ ->_throws_ T›:

    * Se T for uma variável de inferência, ela é a (única) variável de entrada.

    * Se T for um tipo de interface funcional, e um tipo de função puder ser derivado, conforme descrito em [§15.27.3](<#/doc/jls/jls-15>), as variáveis de entrada incluem (i) se a expressão lambda for implicitamente tipada, as variáveis de inferência mencionadas pelos tipos de parâmetros do tipo de função; e (ii) as variáveis de inferência mencionadas pelo tipo de retorno do tipo de função.

    * Caso contrário, não há variáveis de entrada.

  * Para ‹ _MethodReference_ -> T›:

    * Se T for uma variável de inferência, ela é a (única) variável de entrada.

    * Se T for um tipo de interface funcional com um tipo de função, e se a referência de método for inexata ([§15.13.1](<#/doc/jls/jls-15>)), as variáveis de entrada são as variáveis de inferência mencionadas pelos tipos de parâmetros do tipo de função.

    * Caso contrário, não há variáveis de entrada.

  * Para ‹ _MethodReference_ ->_throws_ T›:

    * Se T for uma variável de inferência, ela é a (única) variável de entrada.

    * Se T for um tipo de interface funcional com um tipo de função, e se a referência de método for inexata ([§15.13.1](<#/doc/jls/jls-15>)), as variáveis de entrada são as variáveis de inferência mencionadas pelos tipos de parâmetros do tipo de função e pelo tipo de retorno do tipo de função.

    * Caso contrário, não há variáveis de entrada.

  * Para ‹ _Expression_ -> T›, se _Expression_ for uma expressão entre parênteses:

Onde a expressão contida de _Expression_ é _Expression_ ', as variáveis de entrada são as variáveis de entrada de ‹ _Expression_ ' -> T›.

  * Para ‹ _ConditionalExpression_ -> T›:

Onde a expressão condicional tem a forma `e1` `?` `e2` `:` `e3`, as variáveis de entrada são as variáveis de entrada de ‹`e2` -> T› e ‹`e3` -> T›.

  * Para ‹ _SwitchExpression_ -> T›:

Onde a expressão `switch` tem expressões de resultado `e1`, ..., `en`, as variáveis de entrada são, para todo _i_ (1 ≤ _i_ ≤ _n_), as variáveis de entrada de ‹`ei` -> T›.

  * Para todas as outras fórmulas de restrição, não há variáveis de entrada.

As _variáveis de saída_ dessas restrições são todas as variáveis de inferência mencionadas pelo tipo no lado direito da restrição, T, que não são variáveis de entrada.

### 18.5.3. Inferência de Parametrização de Interface Funcional

Onde uma expressão lambda com tipos de parâmetros explícitos P1, ..., Pn tem como alvo um tipo de interface funcional F`<`A1, ..., Am`>` com pelo menos um argumento de tipo wildcard, uma parametrização de F pode ser derivada como o tipo de destino base da expressão lambda da seguinte forma.

Sejam Q1, ..., Qk os tipos de parâmetros do tipo de função do tipo F`<`α1, ..., αm`>`, onde α1, ..., αm são novas variáveis de inferência.

Se _n_ ≠ _k_ , nenhuma parametrização válida existe. Caso contrário, um conjunto de fórmulas de restrição é formado com, para todo _i_ (1 ≤ _i_ ≤ _n_), ‹Pi = Qi›. Este conjunto de fórmulas de restrição é reduzido para formar o conjunto de limites B.

Se B contiver o limite _false_ , nenhuma parametrização válida existe. Caso contrário, uma nova parametrização do tipo de interface funcional, F`<`A'1, ..., A'm`>`, é construída da seguinte forma, para 1 ≤ _i_ ≤ _m_ :

  * Se B contiver uma instanciação ([§18.1.3](<#/doc/jls/jls-18>)) para αi, T, então A'i = T.

  * Caso contrário, A'i = Ai.

Se F`<`A'1, ..., A'm`>` não for um tipo bem-formado (ou seja, os argumentos de tipo não estiverem dentro de seus limites), ou se F`<`A'1, ..., A'm`>` não for um subtipo de F`<`A1, ..., Am`>`, nenhuma parametrização válida existe. Caso contrário, a parametrização inferida é F`<`A'1, ..., A'm`>`, se todos os argumentos de tipo forem tipos, ou a parametrização sem wildcard ([§9.9](<#/doc/jls/jls-09>)) de F`<`A'1, ..., A'm`>`, se um ou mais argumentos de tipo ainda forem wildcards.

Para determinar o tipo de função de uma interface funcional parametrizada por wildcard, temos que "instanciar" os argumentos de tipo wildcard com tipos específicos. A abordagem "padrão" é simplesmente substituir os wildcards por seus limites, conforme descrito em [§9.8](<#/doc/jls/jls-09>), mas isso produz erros espúrios em casos onde uma expressão lambda tem tipos de parâmetros explícitos que _não_ correspondem aos limites do wildcard. Por exemplo:
```java
    Predicate<? super Integer> p = (Number n) -> n.equals(23);
```

A expressão lambda é um `Predicate<Number>`, que é um subtipo de `Predicate<? super Integer>` mas não `Predicate<Integer>`. A análise nesta seção é usada para inferir que `Number` é uma escolha apropriada para o argumento de tipo para `Predicate`.

Dito isso, a análise aqui, embora descrita em termos de inferência de tipo geral, é intencionalmente bastante simples. As únicas restrições são restrições de igualdade, o que significa que a redução se resume a uma simples correspondência de padrões. Uma estratégia mais poderosa também poderia inferir restrições do corpo da expressão lambda. Mas, dadas as possíveis interações com a inferência para invocações de métodos genéricos circundantes e/ou aninhadas, isso introduziria muita complexidade extra.

### 18.5.4. Inferência de Método Mais Específico

Ao testar se um método aplicável é _mais específico_ que outro ([§15.12.2.5](<#/doc/jls/jls-15>)), onde o segundo método é genérico, é necessário testar se alguma instanciação dos parâmetros de tipo do segundo método pode ser inferida para tornar o primeiro método mais específico que o segundo.

Seja `m1` o primeiro método e `m2` o segundo método. Onde `m2` tem parâmetros de tipo P1, ..., Pp, sejam α1, ..., αp variáveis de inferência, e seja θ a substituição `[`P1:=α1, ..., Pp:=αp`]`.

Sejam `e1`, ..., `ek` as expressões de argumento da invocação correspondente. Então:

  * Se `m1` e `m2` forem aplicáveis por invocação estrita ou flexível ([§15.12.2.2](<#/doc/jls/jls-15>), [§15.12.2.3](<#/doc/jls/jls-15>)), então sejam S1, ..., Sk os tipos de parâmetros formais de `m1`, e sejam T1, ..., Tk o resultado de θ aplicado aos tipos de parâmetros formais de `m2`.

  * Se `m1` e `m2` forem aplicáveis por invocação de aridade variável ([§15.12.2.4](<#/doc/jls/jls-15>)), então sejam S1, ..., Sk os primeiros _k_ tipos de parâmetros de aridade variável de `m1`, e sejam T1, ..., Tk o resultado de θ aplicado aos primeiros _k_ tipos de parâmetros de aridade variável de `m2`.

Note que nenhuma substituição é aplicada a S1, ..., Sk; mesmo que `m1` seja genérico, os parâmetros de tipo de `m1` são tratados como variáveis de tipo, não variáveis de inferência.

O processo para determinar se `m1` é mais específico que `m2` é o seguinte:

  * Primeiro, um conjunto de limites inicial, B, é gerado a partir dos limites declarados de P1, ..., Pp, conforme especificado em [§18.1.3](<#/doc/jls/jls-18>).

  * Segundo, para todo _i_ (1 ≤ _i_ ≤ _k_), um conjunto de fórmulas de restrição ou limites é gerado.

Se Ti for um tipo próprio, o resultado é _true_ se Si for mais específico que Ti para `ei` ([§15.12.2.5](<#/doc/jls/jls-15>)), e _false_ caso contrário. (Note que Si é sempre um tipo próprio.)

Caso contrário, se Si e Ti não forem ambos tipos de interface funcional, a fórmula de restrição ‹Si `<:` Ti› é gerada.

Caso contrário, se a interface de Si for uma superinterface ou uma subinterface da interface de Ti (ou, onde Si ou Ti for um tipo de interseção, alguma interface de Si for uma superinterface ou uma subinterface de alguma interface de Ti), a fórmula de restrição ‹Si `<:` Ti› é gerada.

Caso contrário, seja MTS o tipo de função da captura de Si, seja MTS' o tipo de função de Si (sem captura), e seja MTT o tipo de função de Ti. Se MTS e MTT tiverem um número diferente de parâmetros formais ou parâmetros de tipo, ou se MTS e MTS' não tiverem os mesmos parâmetros de tipo ([§8.4.4](<#/doc/jls/jls-08>)), o resultado é _false_. Caso contrário, as seguintes fórmulas de restrição ou limites são gerados a partir dos parâmetros de tipo, tipos de parâmetros formais e tipos de retorno de MTS e MTT:

    * Sejam A1, ..., An os parâmetros de tipo de MTS, e sejam B1, ..., Bn os parâmetros de tipo de MTT.

Seja θ' a substituição `[`B1:=A1, ..., Bn:=An`]`. Então, para todo _j_ (1 ≤ _j_ ≤ _n_):

      * Se o limite de Aj mencionar um dos A1, ..., An, e o limite de Bj não for um tipo próprio, _false_.

      * Caso contrário, onde X é o limite de Aj e Y é o limite de Bj, ‹X = Y θ'›.

Se o limite Aj mencionar um dos A1, ..., An, e o limite de Bj não for um tipo próprio, então produzir uma restrição de igualdade levantaria a possibilidade de uma variável de inferência ser limitada por uma variável de tipo fora do escopo. Como instanciar uma variável de inferência com uma variável de tipo fora do escopo não faz sentido, preferimos evitar a situação desistindo imediatamente sempre que a possibilidade surgir. Esta simplificação não preserva a completude. (O mesmo comentário se aplica ao tratamento de tipos de parâmetros formais e tipos de retorno abaixo.)

    * Sejam U1, ..., Uk os tipos de parâmetros formais de MTS, e sejam V1, ..., Vk os tipos de parâmetros formais de MTT. Então, para todo _j_ (1 ≤ _j_ ≤ _k_):

      * Se Uj mencionar um dos A1, ..., An, e Vj não for um tipo próprio, _false_.

      * Caso contrário, ‹Vj θ' `<:` Uj›, e, onde U1', ..., Uk' são os tipos de parâmetros formais de MTS', e A1', ..., An' são os parâmetros de tipo de MTS', ‹Vj`[`B1:=A1', ..., Bn:=An'`]` = Uj'›

    * Seja RS o tipo de retorno de MTS, e seja RT o tipo de retorno de MTT. Então:

      * Se RS mencionar um dos A1, ..., An, e RT não for um tipo próprio, _false_.

      * Caso contrário, se `ei` for uma expressão lambda explicitamente tipada:

        * Se RT for `void`, _true_.

        * Caso contrário, se RS e RT forem tipos de interface funcional, e `ei` tiver pelo menos uma expressão de resultado, então para cada expressão de resultado em `ei`, esta segunda etapa inteira é repetida para inferir restrições sob as quais RS é mais específico que RT θ' para a expressão de resultado dada.

        * Caso contrário, se RS for um tipo primitivo e RT não for, e `ei` tiver pelo menos uma expressão de resultado, e cada expressão de resultado de `ei` for uma expressão autônoma ([§15.2](<#/doc/jls/jls-15>)) de um tipo primitivo, _true_.

        * Caso contrário, se RT for um tipo primitivo e RS não for, e `ei` tiver pelo menos uma expressão de resultado, e cada expressão de resultado de `ei` for uma expressão autônoma de um tipo de referência ou uma expressão polimórfica, _true_.

        * Caso contrário, ‹RS `<:` RT θ'›.

      * Caso contrário, se `ei` for uma referência de método exata:

        * Se RT for `void`, _true_.

        * Caso contrário, se RS for um tipo primitivo e RT não for, e a declaração em tempo de compilação para `ei` tiver um tipo de retorno primitivo, _true_.

        * Caso contrário, se RT for um tipo primitivo e RS não for, e a declaração em tempo de compilação para `ei` tiver um tipo de retorno de referência, _true_.

        * Caso contrário, ‹RS `<:` RT θ'›.

      * Caso contrário, se `ei` for uma expressão entre parênteses, essas regras para restrições derivadas de RS e RT são aplicadas recursivamente para a expressão contida.

      * Caso contrário, se `ei` for uma expressão condicional, essas regras para restrições derivadas de RS e RT são aplicadas recursivamente para cada um dos segundo e terceiro operandos.

      * Caso contrário, se `ei` for uma expressão `switch`, essas regras para restrições derivadas de RS e RT são aplicadas recursivamente para cada uma de suas expressões de resultado.

      * Caso contrário, _false_.

  * Terceiro, se `m2` for aplicável por invocação de aridade variável e tiver _k_ +1 parâmetros, então onde Sk+1 é o tipo de parâmetro de aridade variável de `m1` na posição _k_ +1 e Tk+1 é o resultado de θ aplicado ao tipo de parâmetro de aridade variável de `m2` na posição _k_ +1, a restrição ‹Sk+1 `<:` Tk+1› é gerada.

  * Quarto, os limites e fórmulas de restrição gerados são reduzidos e incorporados a B para produzir um conjunto de limites B'.

Se B' não contiver o limite _false_ , e a resolução de todas as variáveis de inferência em B' for bem-sucedida, então `m1` é mais específico que `m2`.

Caso contrário, `m1` não é mais específico que `m2`.

### 18.5.5. Inferência de Tipo de Padrão Record

Quando um padrão record ([§14.30.1](<#/doc/jls/jls-14>)) para uma classe record genérica R aparece em um contexto no qual valores de um tipo T serão comparados a ele, e o padrão não fornece argumentos de tipo para R, os argumentos de tipo são inferidos, conforme descrito abaixo.

  1. Se T não for conversível por cast verificado ([§5.5](<#/doc/jls/jls-05>)) para o tipo raw R, a inferência falha.

  2. Caso contrário, onde P1, ..., Pn (_n_ ≥ 1) são os parâmetros de tipo de R, sejam α1, ..., αn variáveis de inferência. Um conjunto de limites inicial, B0, é gerado a partir dos limites declarados de P1, ..., Pn, conforme descrito em [§18.1.3](<#/doc/jls/jls-18>).

  3. Um tipo T' é derivado de T, da seguinte forma:

Se T for um tipo parametrizado, seja Tc o resultado da conversão de captura ([§5.1.10](<#/doc/jls/jls-05>)) aplicada a T, e sejam Z1, ..., Zk (_k_ ≥ 0) as variáveis de tipo produzidas pela captura que são argumentos de tipo em Tc. (Isso inclui variáveis de tipo produzidas pela conversão de captura nesta etapa, e variáveis de tipo produzidas pela conversão de captura em outro lugar.) Sejam β1, ..., βk (_k_ ≥ 0) variáveis de inferência, e seja θ a substituição `[`Z1:=β1, ..., Zk:=βk`]`. T' é Tc θ.
Limites adicionais para β1, ..., βk são incorporados em B0 para formar um conjunto de limites B1, da seguinte forma:

*   Se βi (1 ≤ _i_ ≤ _k_) substituiu uma variável de tipo com um limite superior U, então o limite βi `<:` U θ aparece no conjunto de limites.

*   Se βi (1 ≤ _i_ ≤ _k_) substituiu uma variável de tipo com um limite inferior `L`, então o limite `L` θ `<:` βi aparece no conjunto de limites.

*   Se nenhum limite superior próprio existir para βi (1 ≤ _i_ ≤ _k_), o limite βi `<:` `Object` aparece no conjunto de limites.

*   Se T for qualquer outra classe ou tipo de interface, então T' é o mesmo que T, e B1 é o mesmo que B0.

*   Se T for uma variável de tipo ou um tipo de interseção, então para cada limite superior da variável de tipo ou elemento do tipo de interseção, esta etapa e a etapa 4 são repetidas recursivamente. Todos os limites produzidos nas etapas 3 e 4 são incorporados em um único conjunto de limites.

4.  Se T' for uma parametrização de uma classe genérica G, e existir um supertipo de R`<`α1, ..., αn`>` que também seja uma parametrização de G, seja R' esse supertipo. A fórmula de restrição ‹T'=R'› é reduzida ([§18.2](<#/doc/jls/jls-18>)) e os limites resultantes são incorporados em B1 para produzir um novo conjunto de limites, B2.

Caso contrário, B2 é o mesmo que B1.

Se B2 contiver o limite _false_ , a inferência falha.

5.  Caso contrário, as variáveis de inferência α1, ..., αn são resolvidas em B2 ([§18.4](<#/doc/jls/jls-18>)). Ao contrário da resolução normal, neste caso a resolução pula a etapa que tenta produzir uma instanciação para uma variável de inferência a partir de seus limites inferiores próprios ou limites superiores próprios; em vez disso, quaisquer novas instanciações são criadas pulando diretamente para a etapa que introduz novas variáveis de tipo.

Se a resolução falhar, então a inferência falha.

6.  Caso contrário, sejam A1, ..., An as instanciações resolvidas para α1, ..., αn, e sejam Y1, ..., Yp (_p_ ≥ 0) quaisquer novas variáveis de tipo introduzidas pela resolução.

O tipo do record pattern é a projeção ascendente de R`<`A1, ..., An`>` em relação a Y1, ..., Yp ([§4.10.5](<#/doc/jls/jls-04>)).

**Exemplo 18.5.5-1. Inferência de Tipo de Record Pattern**

O programa a seguir infere uma parametrização para um record pattern:
```java
    import java.util.function.UnaryOperator;
    
    record Mapper<T>(T in, T out) implements UnaryOperator<T> {
        public T apply(T arg) {
            return in.equals(arg) ? out : null;
        }
    }
    
    class IllustrateRecordPatternTypeInference{
        void test(UnaryOperator<? extends CharSequence> op) {
            if (op instanceof Mapper(var in, var out)) {
                boolean shorter = out.length() < in.length();
            }
        }
    }
    
```

Neste caso, R é a classe `record` `Mapper`, e T é o tipo `UnaryOperator`<`?` `extends` `CharSequence`>. T é convertível por checked cast para `Mapper` raw, então inferiremos uma instanciação para α em `Mapper`<α>. T' é o tipo `UnaryOperator`<β>, onde β tem limite superior `CharSequence`.

`Mapper`<α> tem o supertipo `UnaryOperator`<α>, então reduziremos a fórmula de restrição ‹`UnaryOperator`<β>= `UnaryOperator`<α>›. Isso leva ao limite α=β. A incorporação infere ainda que α `<:` `CharSequence`.

Agora resolvemos α, resultando em α = Y, uma nova variável de tipo com limite superior `CharSequence`. Finalmente, encontramos a projeção ascendente de `Mapper`&lt;Y&gt; em relação a Y, inferindo que o tipo do record pattern é `Mapper`<`?` `extends` `CharSequence`>.

Uma vez que sabemos o tipo do record pattern, podemos encontrar seus tipos de componente, que são comparados com os component patterns do record pattern. As variáveis de padrão `in` e `out` ambas têm o tipo `CharSequence`.

* * *

[Anterior](<#/doc/jls/jls-17>) | | [Próximo](<#/doc/jls/jls-19>)
---|---|---
Capítulo 17. Threads e Locks | [Início](<#/doc/jls/jls-01>) | Capítulo 19. Sintaxe

* * *

[ Aviso Legal ](<#/>)