# A Estrutura da Máquina Virtual Java

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Especificações Java SE](<#/>) > [Especificação da Máquina Virtual Java](<#/doc/jvms/jvms-01>)

Capítulo 2. A Estrutura da Máquina Virtual Java
---
[Anterior](<#/doc/jvms/jvms-01>) | | [Próximo](<#/doc/jvms/jvms-03>)
  
* * *

# Capítulo 2. A Estrutura da Máquina Virtual Java

**Sumário**

[2.1. O Formato de Arquivo `class`](<#/doc/jvms/jvms-02>)
[2.2. Tipos de Dados](<#/doc/jvms/jvms-02>)
[2.3. Tipos e Valores Primitivos](<#/doc/jvms/jvms-02>)
    

[2.3.1. Tipos e Valores Integrais](<#/doc/jvms/jvms-02>)
[2.3.2. Tipos e Valores de Ponto Flutuante](<#/doc/jvms/jvms-02>)
[2.3.3. O Tipo e Valores `returnAddress`](<#/doc/jvms/jvms-02>)
[2.3.4. O Tipo `boolean`](<#/doc/jvms/jvms-02>)
[2.4. Tipos e Valores de Referência](<#/doc/jvms/jvms-02>)
[2.5. Áreas de Dados em Tempo de Execução](<#/doc/jvms/jvms-02>)
    

[2.5.1. O Registro `pc`](<#/doc/jvms/jvms-02>)
[2.5.2. Pilhas da Máquina Virtual Java](<#/doc/jvms/jvms-02>)
[2.5.3. Heap](<#/doc/jvms/jvms-02>)
[2.5.4. Área de Métodos](<#/doc/jvms/jvms-02>)
[2.5.5. Pool de Constantes em Tempo de Execução](<#/doc/jvms/jvms-02>)
[2.5.6. Pilhas de Métodos Nativos](<#/doc/jvms/jvms-02>)
[2.6. Quadros](<#/doc/jvms/jvms-02>)
    

[2.6.1. Variáveis Locais](<#/doc/jvms/jvms-02>)
[2.6.2. Pilhas de Operandos](<#/doc/jvms/jvms-02>)
[2.6.3. Ligação Dinâmica](<#/doc/jvms/jvms-02>)
[2.6.4. Conclusão Normal da Invocação de Método](<#/doc/jvms/jvms-02>)
[2.6.5. Conclusão Abrupta da Invocação de Método](<#/doc/jvms/jvms-02>)
[2.7. Representação de Objetos](<#/doc/jvms/jvms-02>)
[2.8. Aritmética de Ponto Flutuante](<#/doc/jvms/jvms-02>)
[2.9. Métodos Especiais](<#/doc/jvms/jvms-02>)
    

[2.9.1. Métodos de Inicialização de Instância](<#/doc/jvms/jvms-02>)
[2.9.2. Métodos de Inicialização de Classe](<#/doc/jvms/jvms-02>)
[2.9.3. Métodos Polimórficos por Assinatura](<#/doc/jvms/jvms-02>)
[2.10. Exceções](<#/doc/jvms/jvms-02>)
[2.11. Sumário do Conjunto de Instruções](<#/doc/jvms/jvms-02>)
    

[2.11.1. Tipos e a Máquina Virtual Java](<#/doc/jvms/jvms-02>)
[2.11.2. Instruções de Carregamento e Armazenamento](<#/doc/jvms/jvms-02>)
[2.11.3. Instruções Aritméticas](<#/doc/jvms/jvms-02>)
[2.11.4. Instruções de Conversão de Tipo](<#/doc/jvms/jvms-02>)
[2.11.5. Criação e Manipulação de Objetos](<#/doc/jvms/jvms-02>)
[2.11.6. Instruções de Gerenciamento da Pilha de Operandos](<#/doc/jvms/jvms-02>)
[2.11.7. Instruções de Transferência de Controle](<#/doc/jvms/jvms-02>)
[2.11.8. Instruções de Invocação e Retorno de Método](<#/doc/jvms/jvms-02>)
[2.11.9. Lançando Exceções](<#/doc/jvms/jvms-02>)
[2.11.10. Sincronização](<#/doc/jvms/jvms-02>)
[2.12. Bibliotecas de Classes](<#/doc/jvms/jvms-02>)
[2.13. Design Público, Implementação Privada](<#/doc/jvms/jvms-02>)

Este documento especifica uma máquina abstrata. Ele não descreve nenhuma implementação particular da Máquina Virtual Java.

Para implementar a Máquina Virtual Java corretamente, você só precisa ser capaz de ler o formato de arquivo `class` e executar corretamente as operações especificadas nele. Detalhes de implementação que não fazem parte da especificação da Máquina Virtual Java restringiriam desnecessariamente a criatividade dos implementadores. Por exemplo, o layout de memória das áreas de dados em tempo de execução, o algoritmo de garbage collection usado e qualquer otimização interna das instruções da Máquina Virtual Java (por exemplo, traduzi-las para código de máquina) são deixados a critério do implementador.

Todas as referências a Unicode nesta especificação são dadas em relação a _The Unicode Standard, Version 16.0.0_, disponível em [`https://www.unicode.org/`](<https://www.unicode.org/>).

## 2.1. O Formato de Arquivo `class`

O código compilado a ser executado pela Máquina Virtual Java é representado usando um formato binário independente de hardware e sistema operacional, tipicamente (mas não necessariamente) armazenado em um arquivo, conhecido como formato de arquivo `class`. O formato de arquivo `class` define precisamente a representação de uma classe ou interface, incluindo detalhes como a ordem de bytes que poderiam ser dados como certos em um formato de arquivo objeto específico de plataforma.

O Capítulo 4, "O Formato de Arquivo `class`", aborda o formato de arquivo `class` em detalhes.

## 2.2. Tipos de Dados

Assim como a linguagem de programação Java, a Máquina Virtual Java opera com dois tipos de dados: _tipos primitivos_ e _tipos de referência_. Existem, correspondentemente, dois tipos de valores que podem ser armazenados em variáveis, passados como argumentos, retornados por métodos e operados: _valores primitivos_ e _valores de referência_.

A Máquina Virtual Java espera que quase toda a verificação de tipo seja feita antes do tempo de execução, tipicamente por um compilador, e não precise ser feita pela própria Máquina Virtual Java. Valores de tipos primitivos não precisam ser marcados ou inspecionáveis de outra forma para determinar seus tipos em tempo de execução, ou para serem distinguidos de valores de tipos de referência. Em vez disso, o conjunto de instruções da Máquina Virtual Java distingue seus tipos de operandos usando instruções destinadas a operar em valores de tipos específicos. Por exemplo, _iadd_, _ladd_, _fadd_ e _dadd_ são todas instruções da Máquina Virtual Java que adicionam dois valores numéricos e produzem resultados numéricos, mas cada uma é especializada para seu tipo de operando: `int`, `long`, `float` e `double`, respectivamente. Para um resumo do suporte a tipos no conjunto de instruções da Máquina Virtual Java, consulte [§2.11.1](<#/doc/jvms/jvms-02>).

A Máquina Virtual Java contém suporte explícito para objetos. Um objeto é uma instância de classe alocada dinamicamente ou um array. Uma referência a um objeto é considerada do tipo `reference` da Máquina Virtual Java. Referências são polimórficas: uma única referência também pode ser um valor de múltiplos tipos de classe, tipos de interface ou tipos de array. Valores do tipo `reference` podem ser pensados como ponteiros para objetos. Mais de uma referência a um objeto pode existir. Objetos são sempre operados, passados e testados através de valores do tipo `reference`.

## 2.3. Tipos e Valores Primitivos

Os tipos de dados primitivos suportados pela Máquina Virtual Java são os _tipos numéricos_, o tipo `boolean` ([§2.3.4](<#/doc/jvms/jvms-02>)) e o tipo `returnAddress` ([§2.3.3](<#/doc/jvms/jvms-02>)).

Os tipos numéricos consistem nos _tipos integrais_ ([§2.3.1](<#/doc/jvms/jvms-02>)) e nos _tipos de ponto flutuante_ ([§2.3.2](<#/doc/jvms/jvms-02>)).

Os tipos integrais são:

  * `byte`, cujos valores são inteiros de 8 bits com sinal em complemento de dois, e cujo valor padrão é zero

  * `short`, cujos valores são inteiros de 16 bits com sinal em complemento de dois, e cujo valor padrão é zero

  * `int`, cujos valores são inteiros de 32 bits com sinal em complemento de dois, e cujo valor padrão é zero

  * `long`, cujos valores são inteiros de 64 bits com sinal em complemento de dois, e cujo valor padrão é zero

  * `char`, cujos valores são inteiros de 16 bits sem sinal representando pontos de código Unicode no Plano Multilíngue Básico, codificados com UTF-16, e cujo valor padrão é o ponto de código nulo (`'\u0000'`)

Os tipos de ponto flutuante são:

  * `float`, cujos valores correspondem exatamente aos valores representáveis no formato IEEE 754 binary32 de 32 bits, e cujo valor padrão é zero positivo

  * `double`, cujos valores correspondem exatamente aos valores do formato IEEE 754 binary64 de 64 bits, e cujo valor padrão é zero positivo

Os valores do tipo `boolean` codificam os valores de verdade `true` e `false`, e o valor padrão é `false`.

A Primeira Edição de _The Java® Virtual Machine Specification_ não considerava `boolean` como um tipo da Máquina Virtual Java. No entanto, os valores `boolean` têm suporte limitado na Máquina Virtual Java. A Segunda Edição de _The Java® Virtual Machine Specification_ esclareceu a questão tratando `boolean` como um tipo.

Os valores do tipo `returnAddress` são ponteiros para os opcodes das instruções da Máquina Virtual Java. Dos tipos primitivos, apenas o tipo `returnAddress` não está diretamente associado a um tipo da linguagem de programação Java.

### 2.3.1. Tipos e Valores Integrais

Os valores dos tipos integrais da Máquina Virtual Java são:

  * Para `byte`, de -128 a 127 (-27 a 27 \- 1), inclusive

  * Para `short`, de -32768 a 32767 (-215 a 215 \- 1), inclusive

  * Para `int`, de -2147483648 a 2147483647 (-231 a 231 \- 1), inclusive

  * Para `long`, de -9223372036854775808 a 9223372036854775807 (-263 a 263 \- 1), inclusive

  * Para `char`, de 0 a 65535 inclusive

### 2.3.2. Tipos e Valores de Ponto Flutuante

Os tipos de ponto flutuante são `float` e `double`, que estão conceitualmente associados aos formatos de ponto flutuante binary32 de 32 bits e binary64 de 64 bits para valores e operações IEEE 754, conforme especificado no Padrão IEEE 754 (JLS §1.7).

No Java SE 15 e posterior, a Máquina Virtual Java usa a versão 2019 do Padrão IEEE 754. Antes do Java SE 15, a Máquina Virtual Java usava a versão 1985 do Padrão IEEE 754, onde o formato binary32 era conhecido como formato single e o formato binary64 era conhecido como formato double.

O IEEE 754 inclui não apenas números positivos e negativos que consistem em um sinal e magnitude, mas também zeros positivos e negativos, _infinitos_ positivos e negativos, e valores especiais _Not-a-Number_ (doravante abreviado NaN). Um valor NaN é usado para representar o resultado de certas operações inválidas, como dividir zero por zero. Constantes NaN dos tipos `float` e `double` são predefinidas como `Float.NaN` e `Double.NaN`.

Os valores finitos não nulos de um tipo de ponto flutuante podem ser todos expressos na forma _s_ ⋅ _m_ ⋅ 2(_e_ \- `N` \+ 1), onde:

  * _s_ é +1 ou -1,

  * _m_ é um inteiro positivo menor que 2`N`,

  * _e_ é um inteiro entre _E min_ = -(2K-1-2) e _E max_ = 2K-1-1, inclusive, e

  * `N` e K são parâmetros que dependem do tipo.

Alguns valores podem ser representados nesta forma de mais de uma maneira. Por exemplo, supondo que um valor `v` de um tipo de ponto flutuante possa ser representado nesta forma usando certos valores para _s_, _m_ e _e_, então, se acontecesse que _m_ fosse par e _e_ fosse menor que 2K-1, poder-se-ia dividir _m_ pela metade e aumentar _e_ em 1 para produzir uma segunda representação para o mesmo valor `v`.

Uma representação nesta forma é chamada _normalizada_ se _m_ ≥ 2`N`-1; caso contrário, a representação é dita _subnormal_. Se um valor de um tipo de ponto flutuante não pode ser representado de tal forma que _m_ ≥ 2`N`-1, então o valor é dito ser um _valor subnormal_, porque sua magnitude está abaixo da magnitude do menor valor normalizado.

As restrições nos parâmetros `N` e K (e nos parâmetros derivados _E min_ e _E max_) para `float` e `double` são resumidas na [Tabela 2.3.2-A](<#/doc/jvms/jvms-02>).

**Tabela 2.3.2-A. Parâmetros de ponto flutuante**

Parâmetro | `float` | `double`
---|---|---
`N` | 24 | 53
K | 8 | 11
_E max_ | +127 | +1023
_E min_ | -126 | -1022
  
Exceto por NaN, os valores de ponto flutuante são _ordenados_. Quando organizados do menor para o maior, eles são infinito negativo, valores finitos não nulos negativos, zero positivo e negativo, valores finitos não nulos positivos e infinito positivo.

O IEEE 754 permite múltiplos valores NaN distintos para cada um de seus formatos de ponto flutuante binary32 e binary64. No entanto, a Plataforma Java SE geralmente trata os valores NaN de um determinado tipo de ponto flutuante como se estivessem colapsados em um único valor canônico, e, portanto, esta especificação normalmente se refere a um NaN arbitrário como se fosse um valor canônico.

Sob o IEEE 754, uma operação de ponto flutuante com argumentos não-NaN pode gerar um resultado NaN. O IEEE 754 especifica um conjunto de padrões de bits NaN, mas não exige qual padrão de bits NaN particular é usado para representar um resultado NaN; isso é deixado para a arquitetura de hardware. Um programador pode criar NaNs com diferentes padrões de bits para codificar, por exemplo, informações de diagnóstico retrospectivas. Esses valores NaN podem ser criados com os métodos `Float.intBitsToFloat` e `Double.longBitsToDouble` para `float` e `double`, respectivamente. Inversamente, para inspecionar os padrões de bits dos valores NaN, os métodos `Float.floatToRawIntBits` e `Double.doubleToRawLongBits` podem ser usados para `float` e `double`, respectivamente.

Zero positivo e zero negativo comparam-se como iguais, mas existem outras operações que podem distingui-los; por exemplo, dividir `1.0` por `0.0` produz infinito positivo, mas dividir `1.0` por `-0.0` produz infinito negativo.

NaN é _não ordenado_, então comparações numéricas e testes de igualdade numérica têm o valor `false` se um ou ambos os seus operandos forem NaN. Em particular, um teste de igualdade numérica de um valor contra si mesmo tem o valor `false` se e somente se o valor for NaN. Um teste de desigualdade numérica tem o valor `true` se qualquer um dos operandos for NaN.

### 2.3.3. O Tipo e Valores `returnAddress`

O tipo `returnAddress` é usado pelas instruções _jsr_, _ret_ e _jsr_w_ da Máquina Virtual Java ([§ _jsr_](<#/doc/jvms/jvms-06>), [§ _ret_](<#/doc/jvms/jvms-06>), [§ _jsr_w_](<#/doc/jvms/jvms-06>)). Os valores do tipo `returnAddress` são ponteiros para os opcodes das instruções da Máquina Virtual Java. Ao contrário dos tipos primitivos numéricos, o tipo `returnAddress` não corresponde a nenhum tipo da linguagem de programação Java e não pode ser modificado pelo programa em execução.

### 2.3.4. O Tipo `boolean`

Embora a Máquina Virtual Java defina um tipo `boolean`, ela oferece suporte muito limitado para ele. Não há instruções da Máquina Virtual Java dedicadas exclusivamente a operações em valores `boolean`. Em vez disso, expressões na linguagem de programação Java que operam em valores `boolean` são compiladas para usar valores do tipo de dado `int` da Máquina Virtual Java.

A Máquina Virtual Java suporta diretamente arrays `boolean`. Sua instrução _newarray_ ([§ _newarray_](<#/doc/jvms/jvms-06>)) permite a criação de arrays `boolean`. Arrays do tipo `boolean` são acessados e modificados usando as instruções de array `byte` _baload_ e _bastore_ ([§ _baload_](<#/doc/jvms/jvms-06>), [§ _bastore_](<#/doc/jvms/jvms-06>)).

Na implementação da Máquina Virtual Java da Oracle, arrays `boolean` na linguagem de programação Java são codificados como arrays `byte` da Máquina Virtual Java, usando 8 bits por elemento `boolean`.

A Máquina Virtual Java codifica componentes de array `boolean` usando `1` para representar `true` e `0` para representar `false`. Onde os valores `boolean` da linguagem de programação Java são mapeados por compiladores para valores do tipo `int` da Máquina Virtual Java, os compiladores devem usar a mesma codificação.

## 2.4. Tipos e Valores de Referência

Existem três tipos de tipos de `reference`: tipos de classe, tipos de array e tipos de interface. Seus valores são referências a instâncias de classe criadas dinamicamente, arrays, ou instâncias de classe ou arrays que implementam interfaces, respectivamente.

Um tipo de array consiste em um _tipo de componente_ com uma única dimensão (cujo comprimento não é dado pelo tipo). O tipo de componente de um tipo de array pode ser ele próprio um tipo de array. Se, começando de qualquer tipo de array, considerarmos seu tipo de componente, e então (se este também for um tipo de array) o tipo de componente desse tipo, e assim por diante, eventualmente deve-se chegar a um tipo de componente que não seja um tipo de array; este é chamado de _tipo de elemento_ do tipo de array. O tipo de elemento de um tipo de array é necessariamente um tipo primitivo, um tipo de classe ou um tipo de interface.

Um valor `reference` também pode ser a referência nula especial, uma referência a nenhum objeto, que será denotada aqui por `null`. A referência `null` inicialmente não tem tipo em tempo de execução, mas pode ser convertida para qualquer tipo. O valor padrão de um tipo `reference` é `null`.

Esta especificação não exige uma codificação de valor concreta para `null`.

## 2.5. Áreas de Dados em Tempo de Execução

A Máquina Virtual Java define várias áreas de dados em tempo de execução que são usadas durante a execução de um programa. Algumas dessas áreas de dados são criadas na inicialização da Máquina Virtual Java e são destruídas apenas quando a Máquina Virtual Java termina. Outras áreas de dados são por thread. As áreas de dados por thread são criadas quando um thread é criado e destruídas quando o thread termina.

### 2.5.1. O Registro `pc`

A Máquina Virtual Java pode suportar muitos threads de execução simultaneamente (JLS §17). Cada thread da Máquina Virtual Java tem seu próprio registro `pc` (contador de programa). A qualquer momento, cada thread da Máquina Virtual Java está executando o código de um único método, ou seja, o método atual ([§2.6](<#/doc/jvms/jvms-02>)) para aquele thread. Se esse método não for `native`, o registro `pc` contém o endereço da instrução da Máquina Virtual Java atualmente em execução. Se o método atualmente em execução pelo thread for `native`, o valor do registro `pc` da Máquina Virtual Java é indefinido. O registro `pc` da Máquina Virtual Java é largo o suficiente para conter um `returnAddress` ou um ponteiro nativo na plataforma específica.

### 2.5.2. Pilhas da Máquina Virtual Java

Cada thread da Máquina Virtual Java possui uma _pilha da Máquina Virtual Java_ privada, criada ao mesmo tempo que o thread. Uma pilha da Máquina Virtual Java armazena quadros ([§2.6](<#/doc/jvms/jvms-02>)). Uma pilha da Máquina Virtual Java é análoga à pilha de uma linguagem convencional como C: ela contém variáveis locais e resultados parciais, e desempenha um papel na invocação e retorno de métodos. Como a pilha da Máquina Virtual Java nunca é manipulada diretamente, exceto para empilhar e desempilhar quadros, os quadros podem ser alocados no heap. A memória para uma pilha da Máquina Virtual Java não precisa ser contígua.

Na Primeira Edição de _The Java® Virtual Machine Specification_, a pilha da Máquina Virtual Java era conhecida como _pilha Java_.

Esta especificação permite que as pilhas da Máquina Virtual Java sejam de tamanho fixo ou que se expandam e contraiam dinamicamente conforme exigido pela computação. Se as pilhas da Máquina Virtual Java forem de tamanho fixo, o tamanho de cada pilha da Máquina Virtual Java pode ser escolhido independentemente quando essa pilha é criada.

Uma implementação da Máquina Virtual Java pode fornecer ao programador ou ao usuário controle sobre o tamanho inicial das pilhas da Máquina Virtual Java, bem como, no caso de pilhas da Máquina Virtual Java que se expandem ou contraem dinamicamente, controle sobre os tamanhos máximo e mínimo.

As seguintes condições excepcionais estão associadas às pilhas da Máquina Virtual Java:

  * Se a computação em um thread requer uma pilha da Máquina Virtual Java maior do que o permitido, a Máquina Virtual Java lança um `StackOverflowError`.

  * Se as pilhas da Máquina Virtual Java puderem ser expandidas dinamicamente, e a expansão for tentada, mas memória insuficiente puder ser disponibilizada para efetuar a expansão, ou se memória insuficiente puder ser disponibilizada para criar a pilha inicial da Máquina Virtual Java para um novo thread, a Máquina Virtual Java lança um `OutOfMemoryError`.

### 2.5.3. Heap

A Máquina Virtual Java possui um _heap_ que é compartilhado entre todos os threads da Máquina Virtual Java. O heap é a área de dados em tempo de execução da qual a memória para todas as instâncias de classe e arrays é alocada.

O heap é criado na inicialização da máquina virtual. O armazenamento do heap para objetos é recuperado por um sistema automático de gerenciamento de armazenamento (conhecido como _garbage collector_); objetos nunca são desalocados explicitamente. A Máquina Virtual Java não assume nenhum tipo particular de sistema automático de gerenciamento de armazenamento, e a técnica de gerenciamento de armazenamento pode ser escolhida de acordo com os requisitos do sistema do implementador. O heap pode ser de tamanho fixo ou pode ser expandido conforme exigido pela computação e pode ser contraído se um heap maior se tornar desnecessário. A memória para o heap não precisa ser contígua.

Uma implementação da Máquina Virtual Java pode fornecer ao programador ou ao usuário controle sobre o tamanho inicial do heap, bem como, se o heap puder ser expandido ou contraído dinamicamente, controle sobre os tamanhos máximo e mínimo do heap.

A seguinte condição excepcional está associada ao heap:

  * Se uma computação requer mais heap do que pode ser disponibilizado pelo sistema automático de gerenciamento de armazenamento, a Máquina Virtual Java lança um `OutOfMemoryError`.

### 2.5.4. Área de Métodos

A Máquina Virtual Java possui uma _área de métodos_ que é compartilhada entre todos os threads da Máquina Virtual Java. A área de métodos é análoga à área de armazenamento para código compilado de uma linguagem convencional ou análoga ao segmento "text" em um processo de sistema operacional. Ela armazena estruturas por classe, como o pool de constantes em tempo de execução, dados de campos e métodos, e o código para métodos e construtores, incluindo os métodos especiais usados na inicialização de classes e interfaces e na inicialização de instâncias ([§2.9](<#/doc/jvms/jvms-02>)).

A área de métodos é criada na inicialização da máquina virtual. Embora a área de métodos seja logicamente parte do heap, implementações simples podem optar por não fazer garbage collection ou compactá-la. Esta especificação não exige a localização da área de métodos ou as políticas usadas para gerenciar o código compilado. A área de métodos pode ser de tamanho fixo ou pode ser expandida conforme exigido pela computação e pode ser contraída se uma área de métodos maior se tornar desnecessária. A memória para a área de métodos não precisa ser contígua.

Uma implementação da Máquina Virtual Java pode fornecer ao programador ou ao usuário controle sobre o tamanho inicial da área de métodos, bem como, no caso de uma área de métodos de tamanho variável, controle sobre os tamanhos máximo e mínimo da área de métodos.

A seguinte condição excepcional está associada à área de métodos:

  * Se a memória na área de métodos não puder ser disponibilizada para satisfazer uma solicitação de alocação, a Máquina Virtual Java lança um `OutOfMemoryError`.

### 2.5.5. Pool de Constantes em Tempo de Execução

Um _pool de constantes em tempo de execução_ é uma representação em tempo de execução por classe ou por interface da tabela `constant_pool` em um arquivo `class` ([§4.4](<#/doc/jvms/jvms-04>)). Ele contém vários tipos de constantes, que vão desde literais numéricos conhecidos em tempo de compilação até referências de métodos e campos que devem ser resolvidas em tempo de execução. O pool de constantes em tempo de execução serve a uma função semelhante à de uma tabela de símbolos para uma linguagem de programação convencional, embora contenha uma gama mais ampla de dados do que uma tabela de símbolos típica.

Cada pool de constantes em tempo de execução é alocado da área de métodos da Máquina Virtual Java ([§2.5.4](<#/doc/jvms/jvms-02>)). O pool de constantes em tempo de execução para uma classe ou interface é construído quando a classe ou interface é criada ([§5.3](<#/doc/jvms/jvms-05>)) pela Máquina Virtual Java.

A seguinte condição excepcional está associada à construção do pool de constantes em tempo de execução para uma classe ou interface:

  * Ao criar uma classe ou interface, se a construção do pool de constantes em tempo de execução exigir mais memória do que pode ser disponibilizada na área de métodos da Máquina Virtual Java, a Máquina Virtual Java lança um `OutOfMemoryError`.

Consulte [§5 (_Carregamento, Ligação e Inicialização_)](<#/doc/jvms/jvms-05>) para obter informações sobre a construção do pool de constantes em tempo de execução.

### 2.5.6. Pilhas de Métodos Nativos

Uma implementação da Máquina Virtual Java pode usar pilhas convencionais, coloquialmente chamadas de "pilhas C", para suportar métodos `native` (métodos escritos em uma linguagem diferente da linguagem de programação Java). Pilhas de métodos nativos também podem ser usadas pela implementação de um interpretador para o conjunto de instruções da Máquina Virtual Java em uma linguagem como C. Implementações da Máquina Virtual Java que não podem carregar métodos `native` e que não dependem de pilhas convencionais não precisam fornecer pilhas de métodos nativos. Se fornecidas, as pilhas de métodos nativos são tipicamente alocadas por thread quando cada thread é criado.

Esta especificação permite que as pilhas de métodos nativos sejam de tamanho fixo ou que se expandam e contraiam dinamicamente conforme exigido pela computação. Se as pilhas de métodos nativos forem de tamanho fixo, o tamanho de cada pilha de métodos nativos pode ser escolhido independentemente quando essa pilha é criada.

Uma implementação da Máquina Virtual Java pode fornecer ao programador ou ao usuário controle sobre o tamanho inicial das pilhas de métodos nativos, bem como, no caso de pilhas de métodos nativos de tamanho variável, controle sobre os tamanhos máximo e mínimo da pilha de métodos.

As seguintes condições excepcionais estão associadas às pilhas de métodos nativos:

  * Se a computação em um thread requer uma pilha de métodos nativos maior do que o permitido, a Máquina Virtual Java lança um `StackOverflowError`.

  * Se as pilhas de métodos nativos puderem ser expandidas dinamicamente e a expansão da pilha de métodos nativos for tentada, mas memória insuficiente puder ser disponibilizada, ou se memória insuficiente puder ser disponibilizada para criar a pilha de métodos nativos inicial para um novo thread, a Máquina Virtual Java lança um `OutOfMemoryError`.
## 2.6. Frames

Um _frame_ é usado para armazenar dados e resultados parciais, bem como para realizar ligação dinâmica, retornar valores para métodos e despachar exceções.

Um novo frame é criado cada vez que um método é invocado. Um frame é destruído quando a invocação do seu método é concluída, seja essa conclusão normal ou abrupta (lança uma exceção não capturada). Frames são alocados da pilha da Java Virtual Machine ([§2.5.2](<#/doc/jvms/jvms-02>)) da thread que cria o frame. Cada frame possui seu próprio array de variáveis locais ([§2.6.1](<#/doc/jvms/jvms-02>)), sua própria pilha de operandos ([§2.6.2](<#/doc/jvms/jvms-02>)), e uma referência ao pool de constantes em tempo de execução ([§2.5.5](<#/doc/jvms/jvms-02>)) da class do método atual.

Um frame pode ser estendido com informações adicionais específicas da implementação, como informações de depuração.

Os tamanhos do array de variáveis locais e da pilha de operandos são determinados em tempo de compilação e são fornecidos junto com o código para o método associado ao frame ([§4.7.3](<#/doc/jvms/jvms-04>)). Assim, o tamanho da estrutura de dados do frame depende apenas da implementação da Java Virtual Machine, e a memória para essas estruturas pode ser alocada simultaneamente na invocação do método.

Apenas um frame, o frame para o método em execução, está ativo a qualquer momento em um dado thread de controle. Este frame é referido como o _frame atual_, e seu método é conhecido como o _método atual_. A class na qual o método atual é definido é a _class atual_. As operações em variáveis locais e na pilha de operandos são tipicamente com referência ao frame atual.

Um frame deixa de ser atual se seu método invoca outro método ou se seu método é concluído. Quando um método é invocado, um novo frame é criado e se torna atual quando o controle é transferido para o novo método. No retorno do método, o frame atual passa o resultado de sua invocação de método, se houver, para o frame anterior. O frame atual é então descartado à medida que o frame anterior se torna o atual.

Note que um frame criado por um thread é local a esse thread e não pode ser referenciado por nenhum outro thread.

### 2.6.1. Variáveis Locais

Cada frame ([§2.6](<#/doc/jvms/jvms-02>)) contém um array de variáveis conhecido como suas _variáveis locais_. O comprimento do array de variáveis locais de um frame é determinado em tempo de compilação e fornecido na representação binária de uma class ou interface junto com o código para o método associado ao frame ([§4.7.3](<#/doc/jvms/jvms-04>)).

Uma única variável local pode armazenar um valor do tipo `int`, `float`, `reference` ou `returnAddress`. Um par de variáveis locais pode armazenar um valor do tipo `long` ou `double`.

As variáveis locais são endereçadas por indexação. O índice da primeira variável local é zero. Um inteiro é considerado um índice no array de variáveis locais se e somente se esse inteiro estiver entre zero e um a menos que o tamanho do array de variáveis locais.

Um valor do tipo `long` ou `double` ocupa duas variáveis locais consecutivas. Tal valor só pode ser endereçado usando o índice menor. Por exemplo, um valor do tipo `double` armazenado no array de variáveis locais no índice _n_ ocupa, na verdade, as variáveis locais com índices _n_ e _n_ +1; no entanto, a variável local no índice _n_ +1 não pode ser carregada. Ela pode ser armazenada. No entanto, ao fazer isso, o conteúdo da variável local _n_ é invalidado.

A Java Virtual Machine não exige que _n_ seja par. Em termos intuitivos, valores dos tipos `long` e `double` não precisam estar alinhados em 64 bits no array de variáveis locais. Os implementadores são livres para decidir a maneira apropriada de representar tais valores usando as duas variáveis locais reservadas para o valor.

A Java Virtual Machine usa variáveis locais para passar parâmetros na invocação de métodos. Na invocação de métodos de class, quaisquer parâmetros são passados em variáveis locais consecutivas começando da variável local _0_. Na invocação de métodos de instância, a variável local _0_ é sempre usada para passar uma referência ao objeto no qual o método de instância está sendo invocado (`this` na linguagem de programação Java). Quaisquer parâmetros são subsequentemente passados em variáveis locais consecutivas começando da variável local _1_.

### 2.6.2. Pilhas de Operandos

Cada frame ([§2.6](<#/doc/jvms/jvms-02>)) contém uma pilha last-in-first-out (LIFO) conhecida como sua _pilha de operandos_. A profundidade máxima da pilha de operandos de um frame é determinada em tempo de compilação e é fornecida junto com o código para o método associado ao frame ([§4.7.3](<#/doc/jvms/jvms-04>)).

Onde for claro pelo contexto, às vezes nos referiremos à pilha de operandos do frame atual simplesmente como a pilha de operandos.

A pilha de operandos está vazia quando o frame que a contém é criado. A Java Virtual Machine fornece instruções para carregar constantes ou valores de variáveis locais ou campos para a pilha de operandos. Outras instruções da Java Virtual Machine pegam operandos da pilha de operandos, operam sobre eles e empurram o resultado de volta para a pilha de operandos. A pilha de operandos também é usada para preparar parâmetros a serem passados para métodos e para receber resultados de métodos.

Por exemplo, a instrução _iadd_ ([§ _iadd_](<#/doc/jvms/jvms-06>)) soma dois valores `int`. Ela exige que os valores `int` a serem somados sejam os dois valores superiores da pilha de operandos, empurrados para lá por instruções anteriores. Ambos os valores `int` são removidos da pilha de operandos. Eles são somados, e sua soma é empurrada de volta para a pilha de operandos. Subcomputações podem ser aninhadas na pilha de operandos, resultando em valores que podem ser usados pela computação abrangente.

Cada entrada na pilha de operandos pode conter um valor de qualquer tipo da Java Virtual Machine, incluindo um valor do tipo `long` ou `double`.

Os valores da pilha de operandos devem ser operados de maneiras apropriadas aos seus tipos. Não é possível, por exemplo, empurrar dois valores `int` e subsequentemente tratá-los como um `long` ou empurrar dois valores `float` e subsequentemente adicioná-los com uma instrução _iadd_. Um pequeno número de instruções da Java Virtual Machine (as instruções _dup_ ([§ _dup_](<#/doc/jvms/jvms-06>)) e _swap_ ([§ _swap_](<#/doc/jvms/jvms-06>))) operam em áreas de dados em tempo de execução como valores brutos, sem considerar seus tipos específicos; essas instruções são definidas de tal forma que não podem ser usadas para modificar ou quebrar valores individuais. Essas restrições na manipulação da pilha de operandos são impostas através da verificação de arquivos `class` ([§4.10](<#/doc/jvms/jvms-04>)).

A qualquer momento, uma pilha de operandos tem uma profundidade associada, onde um valor do tipo `long` ou `double` contribui com duas unidades para a profundidade e um valor de qualquer outro tipo contribui com uma unidade.

### 2.6.3. Ligação Dinâmica

Cada frame ([§2.6](<#/doc/jvms/jvms-02>)) contém uma referência ao pool de constantes em tempo de execução ([§2.5.5](<#/doc/jvms/jvms-02>)) para o tipo do método atual, a fim de suportar a _ligação dinâmica_ do código do método. O código do arquivo `class` para um método refere-se a métodos a serem invocados e variáveis a serem acessadas via referências simbólicas. A ligação dinâmica traduz essas referências simbólicas de método em referências de método concretas, carregando classes conforme necessário para resolver símbolos ainda não definidos, e traduz acessos a variáveis em offsets apropriados em estruturas de armazenamento associadas à localização em tempo de execução dessas variáveis.

Essa ligação tardia de métodos e variáveis torna menos provável que alterações em outras classes que um método utiliza quebrem este código.

### 2.6.4. Conclusão Normal da Invocação de Método

Uma invocação de método _é concluída normalmente_ se essa invocação não causa o lançamento de uma exceção ([§2.10](<#/doc/jvms/jvms-02>)), seja diretamente da Java Virtual Machine ou como resultado da execução de uma instrução `throw` explícita. Se a invocação do método atual é concluída normalmente, então um valor pode ser retornado ao método invocador. Isso ocorre quando o método invocado executa uma das instruções de retorno ([§2.11.8](<#/doc/jvms/jvms-02>)), cuja escolha deve ser apropriada para o tipo do valor que está sendo retornado (se houver).

O frame atual ([§2.6](<#/doc/jvms/jvms-02>)) é usado neste caso para restaurar o estado do invocador, incluindo suas variáveis locais e pilha de operandos, com o contador de programa do invocador incrementado apropriadamente para pular a instrução de invocação do método. A execução então continua normalmente no frame do método invocador com o valor retornado (se houver) empurrado para a pilha de operandos desse frame.

### 2.6.5. Conclusão Abrupta da Invocação de Método

Uma invocação de método _é concluída abruptamente_ se a execução de uma instrução da Java Virtual Machine dentro do método faz com que a Java Virtual Machine lance uma exceção ([§2.10](<#/doc/jvms/jvms-02>)), e essa exceção não é tratada dentro do método. A execução de uma instrução _athrow_ ([§ _athrow_](<#/doc/jvms/jvms-06>)) também faz com que uma exceção seja explicitamente lançada e, se a exceção não for capturada pelo método atual, resulta em conclusão abrupta da invocação do método. Uma invocação de método que é concluída abruptamente nunca retorna um valor ao seu invocador.

## 2.7. Representação de Objetos

A Java Virtual Machine não impõe nenhuma estrutura interna particular para objetos.

Em algumas implementações da Java Virtual Machine da Oracle, uma referência a uma instância de class é um ponteiro para um _handle_ que é, por si só, um par de ponteiros: um para uma tabela contendo os métodos do objeto e um ponteiro para o objeto `Class` que representa o tipo do objeto, e o outro para a memória alocada do heap para os dados do objeto.

## 2.8. Aritmética de Ponto Flutuante

A Java Virtual Machine incorpora um subconjunto da aritmética de ponto flutuante especificada no Padrão IEEE 754 (JLS §1.7).

No Java SE 15 e posterior, a Java Virtual Machine usa a versão 2019 do Padrão IEEE 754. Antes do Java SE 15, a Java Virtual Machine usava a versão 1985 do Padrão IEEE 754, onde o formato binary32 era conhecido como formato single e o formato binary64 era conhecido como formato double.

Muitas das instruções da Java Virtual Machine para aritmética ([§2.11.3](<#/doc/jvms/jvms-02>)) e conversão de tipo ([§2.11.4](<#/doc/jvms/jvms-02>)) funcionam com números de ponto flutuante. Essas instruções tipicamente correspondem a operações IEEE 754 ([Tabela 2.8-A](<#/doc/jvms/jvms-02>)), exceto por certas instruções descritas abaixo.

**Tabela 2.8-A. Correspondência com operações IEEE 754**

Instruction | IEEE 754 operation
---|---
_dcmp &lt;op&gt;_ ([§ _dcmp &lt;op&gt;_](<#/doc/jvms/jvms-06>)), _fcmp &lt;op&gt;_ ([§ _fcmp &lt;op&gt;_](<#/doc/jvms/jvms-06>)) | compareQuietLess, compareQuietLessEqual, compareQuietGreater, compareQuietGreaterEqual, compareQuietEqual, compareQuietNotEqual
_dadd_ ([§ _dadd_](<#/doc/jvms/jvms-06>)), _fadd_ ([§ _fadd_](<#/doc/jvms/jvms-06>)) | addition
_dsub_ ([§ _dsub_](<#/doc/jvms/jvms-06>)), _fsub_ ([§ _fsub_](<#/doc/jvms/jvms-06>)) | subtraction
_dmul_ ([§ _dmul_](<#/doc/jvms/jvms-06>)), _fmul_ ([§ _fmul_](<#/doc/jvms/jvms-06>)) | multiplication
_ddiv_ ([§ _ddiv_](<#/doc/jvms/jvms-06>)), _fdiv_ ([§ _fdiv_](<#/doc/jvms/jvms-06>)) | division
_dneg_ ([§ _dneg_](<#/doc/jvms/jvms-06>)), _fneg_ ([§ _fneg_](<#/doc/jvms/jvms-06>)) | negate
_i2d_ ([§ _i2d_](<#/doc/jvms/jvms-06>)), _i2f_ ([§ _i2f_](<#/doc/jvms/jvms-06>)), _l2d_ ([§ _l2d_](<#/doc/jvms/jvms-06>)), _l2f_ ([§ _l2f_](<#/doc/jvms/jvms-06>)) | convertFromInt
_d2i_ ([§ _d2i_](<#/doc/jvms/jvms-06>)), _d2l_ ([§ _d2l_](<#/doc/jvms/jvms-06>)), _f2i_ ([§ _f2i_](<#/doc/jvms/jvms-06>)), _f2l_ ([§ _f2l_](<#/doc/jvms/jvms-06>)) | convertToIntegerTowardZero
_d2f_ ([§ _d2f_](<#/doc/jvms/jvms-06>)), _f2d_ ([§ _f2d_](<#/doc/jvms/jvms-06>)) | convertFormat

As principais diferenças entre a aritmética de ponto flutuante suportada pela Java Virtual Machine e o Padrão IEEE 754 são:

  * As instruções de resto de ponto flutuante _drem_ ([§ _drem_](<#/doc/jvms/jvms-06>)) e _frem_ ([§ _frem_](<#/doc/jvms/jvms-06>)) não correspondem à operação de resto IEEE 754. As instruções são baseadas em uma divisão implícita usando a política de arredondamento "round toward zero"; o resto IEEE 754 é, em vez disso, baseado em uma divisão implícita usando a política de arredondamento "round to nearest". (As políticas de arredondamento são discutidas abaixo.)

  * As instruções de negação de ponto flutuante _dneg_ ([§ _dneg_](<#/doc/jvms/jvms-06>)) e _fneg_ ([§ _fneg_](<#/doc/jvms/jvms-06>)) não correspondem precisamente à operação de negação IEEE 754. Em particular, as instruções não exigem que o bit de sinal de um operando NaN seja invertido.

  * As instruções de ponto flutuante da Java Virtual Machine não lançam exceções, não capturam ou sinalizam de outra forma as condições excepcionais IEEE 754 de operação inválida, divisão por zero, overflow, underflow ou inexatidão.

  * A Java Virtual Machine não suporta comparações de ponto flutuante de sinalização IEEE 754 e não possui um valor NaN de sinalização.

  * O IEEE 754 inclui atributos de direção de arredondamento que não correspondem a uma política de arredondamento na Java Virtual Machine. A Java Virtual Machine não fornece nenhum meio para alterar a política de arredondamento usada por uma dada instrução de ponto flutuante.

  * A Java Virtual Machine não suporta os formatos de ponto flutuante estendidos binary32 e binary64 definidos pelo IEEE 754. Nem o intervalo estendido nem a precisão estendida além daqueles especificados para os tipos `float` e `double` podem ser usados ao operar ou armazenar valores de ponto flutuante.

Algumas operações IEEE 754 sem instruções correspondentes na Java Virtual Machine são fornecidas por meio de métodos nas classes `Math` e `StrictMath`, incluindo o método `sqrt` para a operação squareRoot do IEEE 754, o método `fma` para a operação fusedMultiplyAdd do IEEE 754 e o método `IEEEremainder` para a operação remainder do IEEE 754.

A Java Virtual Machine exige suporte para números de ponto flutuante _subnormais_ IEEE 754 e _underflow gradual_, o que facilita a prova de propriedades desejáveis de algoritmos numéricos específicos.

A aritmética de ponto flutuante é uma aproximação da aritmética real. Embora haja um número infinito de números reais, um formato de ponto flutuante particular possui apenas um número finito de valores. Na Java Virtual Machine, uma _política de arredondamento_ é uma função usada para mapear um número real para um valor de ponto flutuante em um determinado formato. Para números reais no intervalo representável de um formato de ponto flutuante, um segmento contínuo da linha de números reais é mapeado para um único valor de ponto flutuante. O número real cujo valor é numericamente igual a um valor de ponto flutuante é mapeado para esse valor de ponto flutuante; por exemplo, o número real 1.5 é mapeado para o valor de ponto flutuante 1.5 em um determinado formato. A Java Virtual Machine define duas políticas de arredondamento, como segue:

  * A política de arredondamento _round to nearest_ se aplica a todas as instruções de ponto flutuante, exceto (i) conversão para um valor inteiro e (ii) resto. Sob a política de arredondamento round to nearest, resultados inexatos devem ser arredondados para o valor representável mais próximo do resultado infinitamente preciso; se os dois valores representáveis mais próximos estiverem igualmente próximos, então o valor cujo bit menos significativo é zero é escolhido.

A política de arredondamento round to nearest corresponde ao atributo de direção de arredondamento padrão para aritmética binária no IEEE 754, _roundTiesToEven_.

O atributo de direção de arredondamento _roundTiesToEven_ era conhecido como o modo de arredondamento "round to nearest" na versão de 1985 do Padrão IEEE 754. A política de arredondamento na Java Virtual Machine é nomeada em homenagem a este modo de arredondamento.

  * A política de arredondamento _round toward zero_ se aplica a (i) conversão de um valor de ponto flutuante para um valor inteiro pelas instruções _d2i_, _d2l_, _f2i_ e _f2l_ ([§ _d2i_](<#/doc/jvms/jvms-06>), [§ _d2l_](<#/doc/jvms/jvms-06>), [§ _f2i_](<#/doc/jvms/jvms-06>), [§ _f2l_](<#/doc/jvms/jvms-06>)), e (ii) as instruções de resto de ponto flutuante _drem_ e _frem_ ([§ _drem_](<#/doc/jvms/jvms-06>), [§ _frem_](<#/doc/jvms/jvms-06>)). Sob a política de arredondamento round toward zero, resultados inexatos são arredondados para o valor representável mais próximo que não é maior em magnitude do que o resultado infinitamente preciso. Para conversão para inteiro, a política de arredondamento round toward zero é equivalente ao truncamento onde os bits fracionários do significando são descartados.

A política de arredondamento round toward zero corresponde ao atributo de direção de arredondamento _roundTowardZero_ para aritmética binária no IEEE 754.

O atributo de direção de arredondamento _roundTowardZero_ era conhecido como o modo de arredondamento "round toward zero" na versão de 1985 do Padrão IEEE 754. A política de arredondamento na Java Virtual Machine é nomeada em homenagem a este modo de arredondamento.

A Java Virtual Machine exige que cada instrução de ponto flutuante arredonde seu resultado de ponto flutuante para a precisão do resultado. A política de arredondamento usada por cada instrução é "round to nearest" ou "round toward zero", conforme especificado acima.

Java 1.0 e 1.1 exigiam avaliação _estrita_ de expressões de ponto flutuante. Avaliação estrita significa que cada operando `float` corresponde a um valor representável no formato IEEE 754 binary32, cada operando `double` corresponde a um valor representável no formato IEEE 754 binary64, e cada operador de ponto flutuante com uma operação IEEE 754 correspondente corresponde ao resultado IEEE 754 para os mesmos operandos.

A avaliação estrita fornece resultados previsíveis, mas causou problemas de desempenho nas implementações da Java Virtual Machine para algumas famílias de processadores comuns na era Java 1.0/1.1. Consequentemente, no Java 1.2 até o Java SE 16, a Plataforma Java SE permitiu que uma implementação da Java Virtual Machine tivesse um ou dois _conjuntos de valores_ associados a cada tipo de ponto flutuante. O tipo `float` foi associado ao _float value set_ e ao _float-extended-exponent value set_, enquanto o tipo `double` foi associado ao _double value set_ e ao _double-extended-exponent value set_. O float value set correspondia aos valores representáveis no formato IEEE 754 binary32; o float-extended-exponent value set tinha o mesmo número de bits de precisão, mas um intervalo de expoente maior. Similarmente, o double value set correspondia aos valores representáveis no formato IEEE 754 binary64; o double-extended-exponent value set tinha o mesmo número de bits de precisão, mas um intervalo de expoente maior. Permitir o uso dos conjuntos de valores de expoente estendido por padrão amenizou os problemas de desempenho em algumas famílias de processadores.

Para compatibilidade, o Java 1.2 permitiu que um arquivo `class` proibisse uma implementação de usar os conjuntos de valores de expoente estendido. Um arquivo `class` expressava isso definindo a flag `ACC_STRICT` na declaração de um método. `ACC_STRICT` restringia a semântica de ponto flutuante das instruções do método para usar o float value set para operandos `float` e o double value set para operandos `double`, garantindo que os resultados de tais instruções fossem totalmente previsíveis. Métodos marcados como `ACC_STRICT` tinham, portanto, a mesma semântica de ponto flutuante especificada no Java 1.0 e 1.1.

No Java SE 17 e posterior, a Plataforma Java SE sempre exige avaliação estrita de expressões de ponto flutuante. Membros mais recentes das famílias de processadores que tinham problemas de desempenho ao implementar a avaliação estrita não têm mais essa dificuldade. Esta especificação não associa mais `float` e `double` aos quatro conjuntos de valores descritos acima, e a flag `ACC_STRICT` não afeta mais a avaliação de operações de ponto flutuante. Para compatibilidade, o padrão de bits atribuído para denotar `ACC_STRICT` em um arquivo `class` cujo número de versão principal é 46-60 é não atribuído (ou seja, não denota nenhuma flag) em um arquivo `class` cujo número de versão principal é maior que 60 ([§4.6](<#/doc/jvms/jvms-04>)). Versões futuras da Java Virtual Machine podem atribuir um significado diferente ao padrão de bits em futuros arquivos `class`.
## 2.9. Métodos Especiais

### 2.9.1. Métodos de Inicialização de Instância

Uma classe possui zero ou mais _métodos de inicialização de instância_, cada um tipicamente correspondendo a um construtor escrito na linguagem de programação Java.

Um método é um método de inicialização de instância se todas as seguintes condições forem verdadeiras:

  * Ele é definido em uma classe (não em uma interface).

  * Ele tem o nome especial `<init>`.

  * Ele é `void` ([§4.3.3](<#/doc/jvms/jvms-04>)).

Em uma classe, qualquer método não-`void` chamado `<init>` não é um método de inicialização de instância. Em uma interface, qualquer método chamado `<init>` não é um método de inicialização de instância. Tais métodos não podem ser invocados por nenhuma instrução da Java Virtual Machine ([§4.4.2](<#/doc/jvms/jvms-04>), [§4.9.2](<#/doc/jvms/jvms-04>)) e são rejeitados pela verificação de formato ([§4.6](<#/doc/jvms/jvms-04>), [§4.8](<#/doc/jvms/jvms-04>)).

A declaração e o uso de um método de inicialização de instância são restritos pela Java Virtual Machine. Para a declaração, o item `access_flags` do método e o array `code` são restritos ([§4.6](<#/doc/jvms/jvms-04>), [§4.9.2](<#/doc/jvms/jvms-04>)). Para um uso, um método de inicialização de instância pode ser invocado apenas pela instrução _invokespecial_ em uma instância de classe não inicializada ([§4.10.1.9](<#/doc/jvms/jvms-04>)).

Como o nome `<init>` não é um identificador válido na linguagem de programação Java, ele não pode ser usado diretamente em um programa escrito na linguagem de programação Java.

### 2.9.2. Métodos de Inicialização de Classe

Uma classe ou interface possui no máximo um _método de inicialização de classe ou interface_ e é inicializada pela Java Virtual Machine invocando esse método ([§5.5](<#/doc/jvms/jvms-05>)).

Um método é um _método de inicialização de classe ou interface_ se todas as seguintes condições forem verdadeiras:

  * Ele tem o nome especial `<clinit>`.

  * Ele é `void` ([§4.3.3](<#/doc/jvms/jvms-04>)).

  * Em um arquivo `class` cujo número de versão é 51.0 ou superior, o método tem sua flag `ACC_STATIC` definida e não aceita argumentos ([§4.6](<#/doc/jvms/jvms-04>)).

O requisito para `ACC_STATIC` foi introduzido no Java SE 7, e para não aceitar argumentos no Java SE 9. Em um arquivo `class` cujo número de versão é 50.0 ou inferior, um método chamado `<clinit>` que é `void` é considerado o método de inicialização de classe ou interface, independentemente da configuração de sua flag `ACC_STATIC` ou se ele aceita argumentos.

Outros métodos chamados `<clinit>` em um arquivo `class` não são métodos de inicialização de classe ou interface. Eles nunca são invocados pela própria Java Virtual Machine, não podem ser invocados por nenhuma instrução da Java Virtual Machine ([§4.9.1](<#/doc/jvms/jvms-04>)), e são rejeitados pela verificação de formato ([§4.6](<#/doc/jvms/jvms-04>), [§4.8](<#/doc/jvms/jvms-04>)).

Como o nome `<clinit>` não é um identificador válido na linguagem de programação Java, ele não pode ser usado diretamente em um programa escrito na linguagem de programação Java.

### 2.9.3. Métodos Polimórficos por Assinatura

Um método é _polimórfico por assinatura_ se todas as seguintes condições forem verdadeiras:

  * Ele é declarado na classe `java.lang.invoke.MethodHandle` ou na classe `java.lang.invoke.VarHandle`.

  * Ele tem um único parâmetro formal do tipo `Object`[]`.

  * Ele tem as flags `ACC_VARARGS` e `ACC_NATIVE` definidas.

A Java Virtual Machine dá tratamento especial aos métodos polimórficos por assinatura na instrução _invokevirtual_ ([§ _invokevirtual_](<#/doc/jvms/jvms-06>)), a fim de efetuar a invocação de um _method handle_ ou de efetuar o acesso a uma variável referenciada por uma instância de `java.lang.invoke.VarHandle`.

Um method handle é uma referência dinamicamente fortemente tipada e diretamente executável para um método subjacente, construtor, campo ou operação de baixo nível similar ([§5.4.3.5](<#/doc/jvms/jvms-05>)), com transformações opcionais de argumentos ou valores de retorno. Uma instância de `java.lang.invoke.VarHandle` é uma referência dinamicamente fortemente tipada a uma variável ou família de variáveis, incluindo campos `static`, campos não-`static`, elementos de array ou componentes de uma estrutura de dados fora do heap. Consulte o pacote `java.lang.invoke` na API da Plataforma Java SE para mais informações.

## 2.10. Exceções

Uma exceção na Java Virtual Machine é representada por uma instância da classe `Throwable` ou uma de suas subclasses. Lançar uma exceção resulta em uma transferência imediata e não local de controle do ponto onde a exceção foi lançada.

A maioria das exceções ocorre de forma síncrona como resultado de uma ação pela thread na qual elas ocorrem. Uma exceção assíncrona, por outro lado, pode potencialmente ocorrer em qualquer ponto da execução de um programa. A Java Virtual Machine lança uma exceção por uma das três razões:

  * Uma instrução _athrow_ ([§ _athrow_](<#/doc/jvms/jvms-06>)) foi executada.

  * Uma condição de execução anormal foi detectada sincronicamente pela Java Virtual Machine. Essas exceções não são lançadas em um ponto arbitrário do programa, mas apenas sincronicamente após a execução de uma instrução que:

    * Especifica a exceção como um resultado possível, como:

      * Quando a instrução incorpora uma operação que viola a semântica da linguagem de programação Java, por exemplo, indexar fora dos limites de um array.

      * Quando ocorre um erro no carregamento ou ligação de parte do programa.

    * Causa a superação de algum limite de um recurso, por exemplo, quando muita memória é usada.

  * Uma exceção assíncrona ocorreu porque um erro interno ocorreu na implementação da Java Virtual Machine ([§6.3](<#/doc/jvms/jvms-06>)).

Uma implementação da Java Virtual Machine pode permitir que uma quantidade pequena, mas limitada, de execução ocorra antes que uma exceção assíncrona seja lançada. Esse atraso é permitido para permitir que o código otimizado detecte e lance essas exceções em pontos onde seja prático tratá-las, obedecendo à semântica da linguagem de programação Java.

Uma implementação simples pode verificar exceções assíncronas no ponto de cada instrução de transferência de controle. Como um programa tem um tamanho finito, isso fornece um limite para o atraso total na detecção de uma exceção assíncrona. Como nenhuma exceção assíncrona ocorrerá entre as transferências de controle, o gerador de código tem alguma flexibilidade para reordenar a computação entre as transferências de controle para maior desempenho. O artigo _Polling Efficiently on Stock Hardware_ de Marc Feeley, _Proc. 1993 Conference on Functional Programming and Computer Architecture_, Copenhague, Dinamarca, pp. 179-187, é recomendado como leitura adicional.

As exceções lançadas pela Java Virtual Machine são precisas: quando a transferência de controle ocorre, todos os efeitos das instruções executadas antes do ponto de onde a exceção é lançada devem parecer ter ocorrido. Nenhuma instrução que ocorra após o ponto de onde a exceção é lançada pode parecer ter sido avaliada. Se o código otimizado executou especulativamente algumas das instruções que seguem o ponto em que a exceção ocorre, tal código deve estar preparado para ocultar essa execução especulativa do estado visível ao usuário do programa.

Cada método na Java Virtual Machine pode ser associado a zero ou mais _manipuladores de exceção_. Um manipulador de exceção especifica o intervalo de offsets no código da Java Virtual Machine que implementa o método para o qual o manipulador de exceção está ativo, descreve o tipo de exceção que o manipulador de exceção é capaz de tratar e especifica a localização do código que deve tratar essa exceção. Uma exceção corresponde a um manipulador de exceção se o offset da instrução que causou a exceção estiver no intervalo de offsets do manipulador de exceção e o tipo de exceção for da mesma classe ou uma subclasse da classe de exceção que o manipulador de exceção trata. Quando uma exceção é lançada, a Java Virtual Machine procura por um manipulador de exceção correspondente no método atual. Se um manipulador de exceção correspondente for encontrado, o sistema ramifica para o código de tratamento de exceção especificado pelo manipulador correspondente.

Se nenhum manipulador de exceção for encontrado no método atual, a invocação do método atual é concluída abruptamente ([§2.6.5](<#/doc/jvms/jvms-02>)). Na conclusão abrupta, a pilha de operandos e as variáveis locais da invocação do método atual são descartadas, e seu frame é removido, reinstaurando o frame do método invocador. A exceção é então relançada no contexto do frame do invocador e assim por diante, continuando pela cadeia de invocação de métodos. Se nenhum manipulador de exceção adequado for encontrado antes que o topo da cadeia de invocação de métodos seja atingido, a execução da thread na qual a exceção foi lançada é encerrada. Antes do encerramento da thread, a exceção não capturada é tratada de acordo com as seguintes regras:

  * Se a thread tiver um manipulador de exceção não capturada definido, então esse manipulador é executado.

  * Caso contrário, o método `uncaughtException` é invocado para o `ThreadGroup` que é o pai da thread. Se o `ThreadGroup` e seus `ThreadGroup`s pais não sobrescreverem `uncaughtException`, então o método `uncaughtException` do manipulador padrão é invocado.

A ordem em que os manipuladores de exceção de um método são pesquisados para uma correspondência é importante. Dentro de um arquivo `class`, os manipuladores de exceção para cada método são armazenados em uma tabela ([§4.7.3](<#/doc/jvms/jvms-04>)). Em tempo de execução, quando uma exceção é lançada, a Java Virtual Machine pesquisa os manipuladores de exceção do método atual na ordem em que aparecem na tabela de manipuladores de exceção correspondente no arquivo `class`, começando do início dessa tabela.

Note que a Java Virtual Machine não impõe aninhamento ou qualquer ordenação das entradas da tabela de exceções de um método. A semântica de tratamento de exceções da linguagem de programação Java é implementada apenas através da cooperação com o compilador ([§3.12](<#/doc/jvms/jvms-03>)). Quando arquivos `class` são gerados por outros meios, o procedimento de busca definido garante que todas as implementações da Java Virtual Machine se comportarão de forma consistente.

## 2.11. Sumário do Conjunto de Instruções

Uma instrução da Java Virtual Machine consiste em um _opcode_ de um byte especificando a operação a ser realizada, seguido por zero ou mais _operandos_ fornecendo argumentos ou dados que são usados pela operação. Muitas instruções não possuem operandos e consistem apenas em um opcode.

Ignorando exceções, o loop interno de um interpretador da Java Virtual Machine é efetivamente
```
    do {
        atomically calculate pc and fetch opcode at pc;
        if (operands) fetch operands;
        execute the action for the opcode;
    } while (there is more to do);

```

O número e o tamanho dos operandos são determinados pelo opcode. Se um operando tiver mais de um byte de tamanho, ele é armazenado em ordem _big-endian_ - byte de ordem superior primeiro. Por exemplo, um índice de 16 bits sem sinal nas variáveis locais é armazenado como dois bytes sem sinal, _byte1_ e _byte2_, de modo que seu valor é (_byte1_ `<<` 8) | _byte2_.

O fluxo de instruções bytecode é alinhado apenas em um byte. As duas exceções são as instruções _lookupswitch_ e _tableswitch_ ([§ _lookupswitch_](<#/doc/jvms/jvms-06>), [§ _tableswitch_](<#/doc/jvms/jvms-06>)), que são preenchidas para forçar o alinhamento interno de alguns de seus operandos em limites de 4 bytes.

A decisão de limitar o opcode da Java Virtual Machine a um byte e de abrir mão do alinhamento de dados dentro do código compilado reflete um viés consciente em favor da compacidade, possivelmente ao custo de algum desempenho em implementações ingênuas. Um opcode de um byte também limita o tamanho do conjunto de instruções. Não assumir o alinhamento de dados significa que dados imediatos maiores que um byte devem ser construídos a partir de bytes em tempo de execução em muitas máquinas.

### 2.11.1. Tipos e a Java Virtual Machine

A maioria das instruções no conjunto de instruções da Java Virtual Machine codifica informações de tipo sobre as operações que elas realizam. Por exemplo, a instrução _iload_ ([§ _iload_](<#/doc/jvms/jvms-06>)) carrega o conteúdo de uma variável local, que deve ser um `int`, para a pilha de operandos. A instrução _fload_ ([§ _fload_](<#/doc/jvms/jvms-06>)) faz o mesmo com um valor `float`. As duas instruções podem ter implementações idênticas, mas possuem opcodes distintos.

Para a maioria das instruções tipadas, o tipo da instrução é representado explicitamente no mnemônico do opcode por uma letra: _i_ para uma operação `int`, _l_ para `long`, _s_ para `short`, _b_ para `byte`, _c_ para `char`, _f_ para `float`, _d_ para `double`, e _a_ para `reference`. Algumas instruções para as quais o tipo é inequívoco não possuem uma letra de tipo em seu mnemônico. Por exemplo, _arraylength_ sempre opera em um objeto que é um array. Algumas instruções, como _goto_, uma transferência de controle incondicional, não operam em operandos tipados.

Dado o tamanho de um byte do opcode da Java Virtual Machine, a codificação de tipos em opcodes pressiona o design de seu conjunto de instruções. Se cada instrução tipada suportasse todos os tipos de dados em tempo de execução da Java Virtual Machine, haveria mais instruções do que poderiam ser representadas em um byte. Em vez disso, o conjunto de instruções da Java Virtual Machine fornece um nível reduzido de suporte a tipos para certas operações. Em outras palavras, o conjunto de instruções não é intencionalmente ortogonal. Instruções separadas podem ser usadas para converter entre tipos de dados não suportados e suportados conforme necessário.

[Tabela 2.11.1-A](<#/doc/jvms/jvms-02>) resume o suporte a tipos no conjunto de instruções da Java Virtual Machine. Uma instrução específica, com informações de tipo, é construída substituindo o _T_ no modelo de instrução na coluna do opcode pela letra na coluna do tipo. Se a coluna do tipo para algum modelo de instrução e tipo estiver em branco, então nenhuma instrução existe suportando esse tipo de operação. Por exemplo, existe uma instrução de carregamento para o tipo `int`, _iload_, mas não há instrução de carregamento para o tipo `byte`.

Note que a maioria das instruções na [Tabela 2.11.1-A](<#/doc/jvms/jvms-02>) não possui formas para os tipos integrais `byte`, `char` e `short`. Nenhuma possui formas para o tipo `boolean`. Sempre que valores dos tipos `byte` e `short` são carregados na pilha de operandos, eles são implicitamente convertidos por extensão de sinal para valores do tipo `int`. Similarmente, sempre que valores dos tipos `boolean` e `char` são carregados na pilha de operandos, eles são implicitamente convertidos por extensão de zero para valores do tipo `int`. Assim, a maioria das operações em valores originalmente armazenados em variáveis dos tipos `boolean`, `byte`, `char` e `short` são corretamente realizadas por instruções que operam em valores do tipo computacional `int`.

**Tabela 2.11.1-A. Suporte a tipos no conjunto de instruções da Java Virtual Machine**

opcode | `byte` | `short` | `int` | `long` | `float` | `double` | `char` | `reference`
---|---|---|---|---|---|---|---|---
_Tipush_ | _bipush_ | _sipush_ | | | | | |
_Tconst_ | | | _iconst_ | _lconst_ | _fconst_ | _dconst_ | | _aconst_
_Tload_ | | | _iload_ | _lload_ | _fload_ | _dload_ | | _aload_
_Tstore_ | | | _istore_ | _lstore_ | _fstore_ | _dstore_ | | _astore_
_Tinc_ | | | _iinc_ | | | | |
_Taload_ | _baload_ | _saload_ | _iaload_ | _laload_ | _faload_ | _daload_ | _caload_ | _aaload_
_Tastore_ | _bastore_ | _sastore_ | _iastore_ | _lastore_ | _fastore_ | _dastore_ | _castore_ | _aastore_
_Tadd_ | | | _iadd_ | _ladd_ | _fadd_ | _dadd_ | |
_Tsub_ | | | _isub_ | _lsub_ | _fsub_ | _dsub_ | |
_Tmul_ | | | _imul_ | _lmul_ | _fmul_ | _dmul_ | |
_Tdiv_ | | | _idiv_ | _ldiv_ | _fdiv_ | _ddiv_ | |
_Trem_ | | | _irem_ | _lrem_ | _frem_ | _drem_ | |
_Tneg_ | | | _ineg_ | _lneg_ | _fneg_ | _dneg_ | |
_Tshl_ | | | _ishl_ | _lshl_ | | | |
_Tshr_ | | | _ishr_ | _lshr_ | | | |
_Tushr_ | | | _iushr_ | _lushr_ | | | |
_Tand_ | | | _iand_ | _land_ | | | |
_Tor_ | | | _ior_ | _lor_ | | | |
_Txor_ | | | _ixor_ | _lxor_ | | | |
_i2T_ | _i2b_ | _i2s_ | | _i2l_ | _i2f_ | _i2d_ | _i2c_ |
_l2T_ | | | _l2i_ | | _l2f_ | _l2d_ | |
_f2T_ | | | _f2i_ | _f2l_ | | _f2d_ | |
_d2T_ | | | _d2i_ | _d2l_ | _d2f_ | | |
_Tcmp_ | | | | _lcmp_ | | | |
_Tcmpl_ | | | | | _fcmpl_ | _dcmpl_ | |
_Tcmpg_ | | | | | _fcmpg_ | _dcmpg_ | |
_if_TcmpOP_ | | | _if_icmpOP_ | | | | | _if_acmpOP_
_Treturn_ | | | _ireturn_ | _lreturn_ | _freturn_ | _dreturn_ | | _areturn_

O mapeamento entre os tipos de armazenamento da Java Virtual Machine e os tipos computacionais da Java Virtual Machine é resumido pela [Tabela 2.11.1-B](<#/doc/jvms/jvms-02>).

Certas instruções da Java Virtual Machine, como _pop_ e _swap_, operam na pilha de operandos sem considerar o tipo; no entanto, tais instruções são restritas a serem usadas apenas em valores de certas categorias de tipos computacionais, também fornecidas na [Tabela 2.11.1-B](<#/doc/jvms/jvms-02>).

**Tabela 2.11.1-B. Tipos de Armazenamento e Computacionais na Java Virtual Machine**

Tipo de armazenamento | Tipo computacional | Categoria
---|---|---
`boolean` | `int` | 1
`byte` | `int` | 1
`char` | `int` | 1
`short` | `int` | 1
`int` | `int` | 1
`float` | `float` | 1
`reference` | `reference` | 1
`returnAddress` | `returnAddress` | 1
`long` | `long` | 2
`double` | `double` | 2

### 2.11.2. Instruções de Carregamento e Armazenamento

As instruções de carregamento e armazenamento transferem valores entre as variáveis locais ([§2.6.1](<#/doc/jvms/jvms-02>)) e a pilha de operandos ([§2.6.2](<#/doc/jvms/jvms-02>)) de um frame da Java Virtual Machine ([§2.6](<#/doc/jvms/jvms-02>)):

  * Carregar uma variável local para a pilha de operandos: _iload_, _iload_ &lt;n&gt;_, _lload_, _lload_ &lt;n&gt;_, _fload_, _fload_ &lt;n&gt;_, _dload_, _dload_ &lt;n&gt;_, _aload_, _aload_ &lt;n&gt;_.

  * Armazenar um valor da pilha de operandos em uma variável local: _istore_, _istore_ &lt;n&gt;_, _lstore_, _lstore_ &lt;n&gt;_, _fstore_, _fstore_ &lt;n&gt;_, _dstore_, _dstore_ &lt;n&gt;_, _astore_, _astore_ &lt;n&gt;_.

  * Carregar uma constante para a pilha de operandos: _bipush_, _sipush_, _ldc_, _ldc_w_, _ldc2_w_, _aconst_null_, _iconst_m1_, _iconst_ <i>_, _lconst_ &lt;l&gt;_, _fconst_ &lt;f&gt;_, _dconst_ &lt;d&gt;_.

  * Obter acesso a mais variáveis locais usando um índice mais amplo, ou a um operando imediato maior: _wide_.

Instruções que acessam campos de objetos e elementos de arrays ([§2.11.5](<#/doc/jvms/jvms-02>)) também transferem dados para e da pilha de operandos.

Mnemônicos de instrução mostrados acima com letras finais entre colchetes angulares (por exemplo, _iload_ &lt;n&gt;_) denotam famílias de instruções (com membros _iload_0_, _iload_1_, _iload_2_ e _iload_3_ no caso de _iload_ &lt;n&gt;_). Tais famílias de instruções são especializações de uma instrução genérica adicional (_iload_) que aceita um operando. Para as instruções especializadas, o operando é implícito e não precisa ser armazenado ou buscado. A semântica é a mesma (_iload_0_ significa o mesmo que _iload_ com o operando _0_). A letra entre os colchetes angulares especifica o tipo do operando implícito para essa família de instruções: para _< n>_, um inteiro não negativo; para _< i>_, um `int`; para _< l>_, um `long`; para _< f>_, um `float`; e para _< d>_, um `double`.

Esta notação para famílias de instruções é usada em toda esta especificação.

### 2.11.3. Instruções Aritméticas

As instruções aritméticas calculam um resultado que é tipicamente uma função de dois valores na pilha de operandos, empurrando o resultado de volta para a pilha de operandos. Existem dois tipos principais de instruções aritméticas: aquelas que operam em valores inteiros e aquelas que operam em valores de ponto flutuante. Dentro de cada um desses tipos, as instruções aritméticas são especializadas para os tipos numéricos da Java Virtual Machine. Não há suporte direto para aritmética de inteiros em valores dos tipos `byte`, `short` e `char` ([§2.11.1](<#/doc/jvms/jvms-02>)), ou para valores do tipo `boolean`; essas operações são tratadas por instruções que operam no tipo `int`. As instruções de inteiros e de ponto flutuante também diferem em seu comportamento em caso de overflow e divisão por zero. As instruções aritméticas são as seguintes:

  * Adição: _iadd_, _ladd_, _fadd_, _dadd_.

  * Subtração: _isub_, _lsub_, _fsub_, _dsub_.

  * Multiplicação: _imul_, _lmul_, _fmul_, _dmul_.

  * Divisão: _idiv_, _ldiv_, _fdiv_, _ddiv_.

  * Resto: _irem_, _lrem_, _frem_, _drem_.

  * Negação: _ineg_, _lneg_, _fneg_, _dneg_.

  * Deslocamento: _ishl_, _ishr_, _iushr_, _lshl_, _lshr_, _lushr_.

  * OR bit a bit: _ior_, _lor_.

  * AND bit a bit: _iand_, _land_.

  * OR exclusivo bit a bit: _ixor_, _lxor_.

  * Incremento de variável local: _iinc_.

  * Comparação: _dcmpg_, _dcmpl_, _fcmpg_, _fcmpl_, _lcmp_.

A semântica dos operadores da linguagem de programação Java em valores inteiros e de ponto flutuante (JLS §4.2.2, JLS §4.2.4) é diretamente suportada pela semântica do conjunto de instruções da Java Virtual Machine.

A Java Virtual Machine não indica overflow durante operações em tipos de dados inteiros. As únicas operações inteiras que podem lançar uma exceção são as instruções de divisão de inteiros (_idiv_ e _ldiv_) e as instruções de resto de inteiros (_irem_ e _lrem_), que lançam uma `ArithmeticException` se o divisor for zero.

A Java Virtual Machine não indica overflow ou underflow durante operações em tipos de dados de ponto flutuante. Ou seja, as instruções de ponto flutuante nunca fazem com que a Java Virtual Machine lance uma exceção em tempo de execução (não confundir com uma exceção de ponto flutuante IEEE 754). Uma operação que causa overflow produz um infinito com sinal; uma operação que causa underflow produz um valor subnormal ou um zero com sinal; uma operação que não tem um resultado matematicamente definido único produz NaN. Todas as operações numéricas com NaN como operando produzem NaN como resultado.

Comparações em valores do tipo `long` (_lcmp_) realizam uma comparação com sinal.

Comparações em valores de tipos de ponto flutuante (_dcmpg_, _dcmpl_, _fcmpg_, _fcmpl_) são realizadas usando comparações não sinalizadoras IEEE 754.

### 2.11.4. Instruções de Conversão de Tipo

As instruções de conversão de tipo permitem a conversão entre tipos numéricos da Java Virtual Machine. Elas podem ser usadas para implementar conversões explícitas no código do usuário ou para mitigar a falta de ortogonalidade no conjunto de instruções da Java Virtual Machine.

A Java Virtual Machine suporta diretamente as seguintes conversões numéricas de alargamento (widening):

  * `int` para `long`, `float` ou `double`

  * `long` para `float` ou `double`

  * `float` para `double`

As instruções de conversão numérica de alargamento são _i2l_, _i2f_, _i2d_, _l2f_, _l2d_ e _f2d_. Os mnemônicos para esses opcodes são diretos, dadas as convenções de nomenclatura para instruções tipadas e o uso lúdico de "2" para significar "para". Por exemplo, a instrução _i2d_ converte um valor `int` para um `double`.

A maioria das conversões numéricas de alargamento não perde informações sobre a magnitude geral de um valor numérico. De fato, as conversões de alargamento de `int` para `long` e de `int` para `double` não perdem nenhuma informação; o valor numérico é preservado exatamente. As conversões de alargamento de `float` para `double` também preservam o valor numérico exatamente.

As conversões de `int` para `float`, ou de `long` para `float`, ou de `long` para `double`, podem perder _precisão_, ou seja, podem perder alguns dos bits menos significativos do valor; o valor de ponto flutuante resultante é uma versão corretamente arredondada do valor inteiro, usando a política de arredondamento para o mais próximo ([§2.8](<#/doc/jvms/jvms-02>)).

Apesar do fato de que a perda de precisão pode ocorrer, as conversões numéricas de alargamento nunca fazem com que a Java Virtual Machine lance uma exceção em tempo de execução (não confundir com uma exceção de ponto flutuante IEEE 754).

Uma conversão numérica de alargamento de um `int` para um `long` simplesmente estende o sinal da representação em complemento de dois do valor `int` para preencher o formato mais amplo. Uma conversão numérica de alargamento de um `char` para um tipo integral estende com zeros a representação do valor `char` para preencher o formato mais amplo.

Note que as conversões numéricas de alargamento não existem de tipos integrais `byte`, `char` e `short` para o tipo `int`. Como observado em [§2.11.1](<#/doc/jvms/jvms-02>), valores dos tipos `byte`, `char` e `short` são internamente alargados para o tipo `int`, tornando essas conversões implícitas.

A Java Virtual Machine também suporta diretamente as seguintes conversões numéricas de estreitamento (narrowing):

  * `int` para `byte`, `short` ou `char`

  * `long` para `int`

  * `float` para `int` ou `long`

  * `double` para `int`, `long` ou `float`

As instruções de conversão numérica de estreitamento são _i2b_, _i2c_, _i2s_, _l2i_, _f2i_, _f2l_, _d2i_, _d2l_ e _d2f_. Uma conversão numérica de estreitamento pode resultar em um valor com sinal diferente, uma ordem de magnitude diferente, ou ambos; ela pode, assim, perder precisão.

Uma conversão numérica de estreitamento de um `int` ou `long` para um tipo integral T simplesmente descarta todos os bits, exceto os _n_ bits de ordem mais baixa, onde _n_ é o número de bits usados para representar o tipo T. Isso pode fazer com que o valor resultante não tenha o mesmo sinal que o valor de entrada.

Em uma conversão numérica de estreitamento de um valor de ponto flutuante para um tipo integral T, onde T é `int` ou `long`, o valor de ponto flutuante é convertido da seguinte forma:

  * Se o valor de ponto flutuante for NaN, o resultado da conversão é um `int` ou `long` `0`.

  * Caso contrário, se o valor de ponto flutuante não for um infinito, o valor de ponto flutuante é arredondado para um valor inteiro V usando a política de arredondamento em direção a zero ([§2.8](<#/doc/jvms/jvms-02>)). Existem dois casos:

    * Se T for `long` e este valor inteiro puder ser representado como um `long`, então o resultado é o valor `long` V.

    * Se T for do tipo `int` e este valor inteiro puder ser representado como um `int`, então o resultado é o valor `int` V.

  * Caso contrário:

    * Ou o valor deve ser muito pequeno (um valor negativo de grande magnitude ou infinito negativo), e o resultado é o menor valor representável do tipo `int` ou `long`.

    * Ou o valor deve ser muito grande (um valor positivo de grande magnitude ou infinito positivo), e o resultado é o maior valor representável do tipo `int` ou `long`.

Uma conversão numérica de estreitamento de `double` para `float` se comporta de acordo com o IEEE 754. O resultado é corretamente arredondado usando a política de arredondamento para o mais próximo ([§2.8](<#/doc/jvms/jvms-02>)). Um valor muito pequeno para ser representado como um `float` é convertido para um zero positivo ou negativo do tipo `float`; um valor muito grande para ser representado como um `float` é convertido para um infinito positivo ou negativo. Um `double` NaN é sempre convertido para um `float` NaN.

Apesar do fato de que overflow, underflow ou perda de precisão podem ocorrer, as conversões de estreitamento entre tipos numéricos nunca fazem com que a Java Virtual Machine lance uma exceção em tempo de execução (não confundir com uma exceção de ponto flutuante IEEE 754).

### 2.11.5. Criação e Manipulação de Objetos

Embora tanto as instâncias de classe quanto os arrays sejam objetos, a Java Virtual Machine cria e manipula instâncias de classe e arrays usando conjuntos distintos de instruções:

  * Criar uma nova instância de classe: _new_.

  * Criar um novo array: _newarray_, _anewarray_, _multianewarray_.

  * Acessar campos de classes (campos `static`, conhecidos como variáveis de classe) e campos de instâncias de classe (campos não-`static`, conhecidos como variáveis de instância): _getstatic_, _putstatic_, _getfield_, _putfield_.

  * Carregar um componente de array para a pilha de operandos: _baload_, _caload_, _saload_, _iaload_, _laload_, _faload_, _daload_, _aaload_.

  * Armazenar um valor da pilha de operandos como um componente de array: _bastore_, _castore_, _sastore_, _iastore_, _lastore_, _fastore_, _dastore_, _aastore_.

  * Obter o comprimento do array: _arraylength_.

  * Verificar propriedades de instâncias de classe ou arrays: _instanceof_, _checkcast_.

### 2.11.6. Instruções de Gerenciamento da Pilha de Operandos

Várias instruções são fornecidas para a manipulação direta da pilha de operandos: _pop_, _pop2_, _dup_, _dup2_, _dup_x1_, _dup2_x1_, _dup_x2_, _dup2_x2_, _swap_.

### 2.11.7. Instruções de Transferência de Controle

As instruções de transferência de controle, condicionalmente ou incondicionalmente, fazem com que a Java Virtual Machine continue a execução com uma instrução diferente daquela que segue a instrução de transferência de controle. Elas são:

  * Desvio condicional: _ifeq_, _ifne_, _iflt_, _ifle_, _ifgt_, _ifge_, _ifnull_, _ifnonnull_, _if_icmpeq_, _if_icmpne_, _if_icmplt_, _if_icmple_, _if_icmpgt_ _if_icmpge_, _if_acmpeq_, _if_acmpne_.

  * Desvio condicional composto: _tableswitch_, _lookupswitch_.

  * Desvio incondicional: _goto_, _goto_w_, _jsr_, _jsr_w_, _ret_.

A Java Virtual Machine possui conjuntos distintos de instruções que desviam condicionalmente na comparação com dados dos tipos `int` e `reference`. Ela também possui instruções de desvio condicional distintas que testam a referência nula e, portanto, não é necessário especificar um valor concreto para `null` ([§2.4](<#/doc/jvms/jvms-02>)).

Desvios condicionais em comparações entre dados dos tipos `boolean`, `byte`, `char` e `short` são realizados usando instruções de comparação `int` ([§2.11.1](<#/doc/jvms/jvms-02>)). Um desvio condicional em uma comparação entre dados dos tipos `long`, `float` ou `double` é iniciado usando uma instrução que compara os dados e produz um resultado `int` da comparação ([§2.11.3](<#/doc/jvms/jvms-02>)). Uma instrução de comparação `int` subsequente testa este resultado e efetua o desvio condicional. Devido à sua ênfase em comparações `int`, a Java Virtual Machine fornece um rico complemento de instruções de desvio condicional para o tipo `int`.

Todas as instruções de transferência de controle condicional `int` realizam comparações com sinal.

### 2.11.8. Instruções de Invocação e Retorno de Método

As cinco instruções a seguir invocam métodos:

  * _invokevirtual_ invoca um método de instância de um objeto, despachando no tipo (virtual) do objeto.

  * _invokeinterface_ invoca um método de interface, buscando os métodos implementados pelo objeto em tempo de execução específico para encontrar o método apropriado.

  * _invokespecial_ invoca um método de instância que requer tratamento especial, seja um método de inicialização de instância ([§2.9.1](<#/doc/jvms/jvms-02>)) ou um método da classe atual ou de seus supertipos.

  * _invokestatic_ invoca um método de classe (`static`) em uma classe nomeada.

  * _invokedynamic_ invoca o método que é o alvo do objeto _call site_ ligado à instrução _invokedynamic_. O objeto _call site_ foi ligado a uma ocorrência lexical específica da instrução _invokedynamic_ pela Java Virtual Machine como resultado da execução de um método bootstrap antes da primeira execução da instrução. Portanto, cada ocorrência de uma instrução _invokedynamic_ tem um estado de ligação único, ao contrário das outras instruções que invocam métodos.
As instruções de retorno de método, que são distinguidas pelo tipo de retorno, são _ireturn_ (usada para tipos de retorno `boolean`, `byte`, `char`, `short` e `int`), _lreturn_ , _freturn_ , _dreturn_ e _areturn_. Além disso, a instrução _return_ é usada para retornar de métodos declarados como `void`, métodos de inicialização de instância e métodos de inicialização de classe ou interface.

### 2.11.9. Lançando Exceções

Uma exceção é lançada programaticamente usando a instrução _athrow_. Exceções também podem ser lançadas por várias instruções da Java Virtual Machine se elas detectarem uma condição anormal.

### 2.11.10. Sincronização

A Java Virtual Machine suporta a sincronização de métodos e sequências de instruções dentro de um método por meio de um único construto de sincronização: o _monitor_.

A sincronização em nível de método é realizada implicitamente, como parte da invocação e retorno de método ([§2.11.8](<#/doc/jvms/jvms-02>)). Um método `synchronized` é distinguido na estrutura `method_info` do pool de constantes em tempo de execução ([§4.6](<#/doc/jvms/jvms-04>)) pela flag `ACC_SYNCHRONIZED`, que é verificada pelas instruções de invocação de método. Ao invocar um método para o qual `ACC_SYNCHRONIZED` está definido, a thread em execução entra em um monitor, invoca o próprio método e sai do monitor, quer a invocação do método seja concluída normalmente ou abruptamente. Durante o tempo em que a thread em execução possui o monitor, nenhuma outra thread pode entrar nele. Se uma exceção for lançada durante a invocação do método `synchronized` e o método `synchronized` não tratar a exceção, o monitor para o método é automaticamente encerrado antes que a exceção seja relançada para fora do método `synchronized`.

A sincronização de sequências de instruções é tipicamente usada para codificar o bloco `synchronized` da linguagem de programação Java. A Java Virtual Machine fornece as instruções _monitorenter_ e _monitorexit_ para suportar tais construtos de linguagem. A implementação adequada de blocos `synchronized` requer cooperação de um compilador que visa a Java Virtual Machine ([§3.14](<#/doc/jvms/jvms-03>)).

_Bloqueio estruturado_ é a situação em que, durante a invocação de um método, cada saída em um dado monitor corresponde a uma entrada precedente nesse monitor. Como não há garantia de que todo o código submetido à Java Virtual Machine realizará bloqueio estruturado, as implementações da Java Virtual Machine são permitidas, mas não obrigadas, a impor as duas regras a seguir que garantem o bloqueio estruturado. Seja _T_ uma thread e _M_ um monitor. Então:

  1. O número de entradas de monitor realizadas por _T_ em _M_ durante uma invocação de método deve ser igual ao número de saídas de monitor realizadas por _T_ em _M_ durante a invocação de método, quer a invocação do método seja concluída normalmente ou abruptamente.

  2. Em nenhum momento durante uma invocação de método, o número de saídas de monitor realizadas por _T_ em _M_ desde a invocação do método pode exceder o número de entradas de monitor realizadas por _T_ em _M_ desde a invocação do método.

Note que a entrada e saída do monitor realizadas automaticamente pela Java Virtual Machine ao invocar um método `synchronized` são consideradas como ocorrendo durante a invocação do método chamador.

## 2.12. Bibliotecas de Classes

A Java Virtual Machine deve fornecer suporte suficiente para a implementação das bibliotecas de classes da Plataforma Java SE. Algumas das classes nessas bibliotecas não podem ser implementadas sem a cooperação da Java Virtual Machine.

Classes que podem exigir suporte especial da Java Virtual Machine incluem aquelas que suportam:

  * Reflexão, como as classes no pacote `java.lang.reflect` e a classe `Class`.

  * Carregamento e criação de uma classe ou interface. O exemplo mais óbvio é a classe `ClassLoader`.

  * Vinculação e inicialização de uma classe ou interface. As classes de exemplo citadas acima também se enquadram nesta categoria.

  * O sistema de módulos, como a classe `ModuleLayer`.

  * Multithread, como a classe `Thread`.

  * Referências fracas, como as classes no pacote `java.lang.ref`.

A lista acima tem a intenção de ser ilustrativa, e não abrangente. Uma lista exaustiva dessas classes ou da funcionalidade que elas fornecem está além do escopo desta especificação. Consulte as especificações das bibliotecas de classes da Plataforma Java SE para obter detalhes.

## 2.13. Design Público, Implementação Privada

Até agora, esta especificação esboçou a visão pública da Java Virtual Machine: o formato de arquivo `class` e o conjunto de instruções. Esses componentes são vitais para a independência de hardware, sistema operacional e implementação da Java Virtual Machine. O implementador pode preferir pensar neles como um meio de comunicar fragmentos de programas de forma segura entre hosts, cada um implementando a Plataforma Java SE, em vez de como um projeto a ser seguido exatamente.

É importante entender onde reside a linha entre o design público e a implementação privada. Uma implementação da Java Virtual Machine deve ser capaz de ler arquivos `class` e deve implementar exatamente a semântica do código da Java Virtual Machine contido neles. Uma maneira de fazer isso é tomar este documento como uma especificação e implementar essa especificação literalmente. Mas também é perfeitamente viável e desejável para o implementador modificar ou otimizar a implementação dentro das restrições desta especificação. Desde que o formato de arquivo `class` possa ser lido e a semântica de seu código seja mantida, o implementador pode implementar essa semântica de qualquer maneira. O que está "sob o capô" é assunto do implementador, desde que a interface externa correta seja cuidadosamente mantida.

Existem algumas exceções: depuradores, profilers e geradores de código just-in-time podem cada um exigir acesso a elementos da Java Virtual Machine que são normalmente considerados "sob o capô". Quando apropriado, a Oracle trabalha com outros implementadores da Java Virtual Machine e com fornecedores de ferramentas para desenvolver interfaces comuns para a Java Virtual Machine para uso por tais ferramentas, e para promover essas interfaces em toda a indústria.

O implementador pode usar essa flexibilidade para adaptar as implementações da Java Virtual Machine para alto desempenho, baixo uso de memória ou portabilidade. O que faz sentido em uma dada implementação depende dos objetivos dessa implementação. A gama de opções de implementação inclui o seguinte:

  * Traduzir o código da Java Virtual Machine no tempo de carregamento ou durante a execução para o conjunto de instruções de outra máquina virtual.

  * Traduzir o código da Java Virtual Machine no tempo de carregamento ou durante a execução para o conjunto de instruções nativo da CPU do host (às vezes referido como geração de código _just-in-time_ , ou _JIT_ ).

A existência de uma máquina virtual e um formato de arquivo de objeto precisamente definidos não precisa restringir significativamente a criatividade do implementador. A Java Virtual Machine é projetada para suportar muitas implementações diferentes, fornecendo soluções novas e interessantes, mantendo a compatibilidade entre as implementações.

* * *

[Anterior](<#/doc/jvms/jvms-01>)  |   |  [Próximo](<#/doc/jvms/jvms-03>)
---|---|---
Capítulo 1. Introdução  | [Início](<#/doc/jvms/jvms-01>) |  Capítulo 3. Compilando para a Java Virtual Machine

* * *

[ Aviso Legal ](<#/>)