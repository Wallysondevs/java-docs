# Carregamento, Vinculação e Inicialização

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Java SE Specifications](<#/>) > [Java Virtual Machine Specification](<#/doc/jvms/jvms-01>)

Chapter 5. Loading, Linking, and Initializing
---
[Prev](<#/doc/jvms/jvms-04>) | | [Next](<#/doc/jvms/jvms-06>)
* * *
# Capítulo 5. Carregamento, Vinculação e Inicialização

**Sumário**

[5.1. O Pool de Constantes em Tempo de Execução](<#/doc/jvms/jvms-05>)
[5.2. Inicialização da Java Virtual Machine](<#/doc/jvms/jvms-05>)
[5.3. Criação e Carregamento](<#/doc/jvms/jvms-05>)
    

[5.3.1. Carregamento Usando o Bootstrap Class Loader](<#/doc/jvms/jvms-05>)
[5.3.2. Carregamento Usando um Class Loader Definido pelo Usuário](<#/doc/jvms/jvms-05>)
[5.3.3. Criando Classes Array](<#/doc/jvms/jvms-05>)
[5.3.4. Restrições de Carregamento](<#/doc/jvms/jvms-05>)
[5.3.5. Derivando uma Classe a Partir de uma Representação de Arquivo `class`](<#/doc/jvms/jvms-05>)
[5.3.6. Módulos e Camadas](<#/doc/jvms/jvms-05>)
[5.4. Vinculação](<#/doc/jvms/jvms-05>)
    

[5.4.1. Verificação](<#/doc/jvms/jvms-05>)
[5.4.2. Preparação](<#/doc/jvms/jvms-05>)
[5.4.3. Resolução](<#/doc/jvms/jvms-05>)
    

[5.4.3.1. Resolução de Classe e Interface](<#/doc/jvms/jvms-05>)
[5.4.3.2. Resolução de Campo](<#/doc/jvms/jvms-05>)
[5.4.3.3. Resolução de Método](<#/doc/jvms/jvms-05>)
[5.4.3.4. Resolução de Método de Interface](<#/doc/jvms/jvms-05>)
[5.4.3.5. Resolução de Tipo de Método e Method Handle](<#/doc/jvms/jvms-05>)
[5.4.3.6. Resolução de Constante Computada Dinamicamente e Call Site](<#/doc/jvms/jvms-05>)
[5.4.4. Controle de Acesso](<#/doc/jvms/jvms-05>)
[5.4.5. Sobrescrita de Método](<#/doc/jvms/jvms-05>)
[5.4.6. Seleção de Método](<#/doc/jvms/jvms-05>)
[5.5. Inicialização](<#/doc/jvms/jvms-05>)
[5.6. Vinculando Implementações de Métodos Nativos](<#/doc/jvms/jvms-05>)
[5.7. Término da Java Virtual Machine](<#/doc/jvms/jvms-05>)

A Java Virtual Machine carrega, vincula e inicializa classes e interfaces dinamicamente. Carregamento é o processo de encontrar a representação binária de um tipo de classe ou interface com um nome particular e _criar_ uma classe ou interface a partir dessa representação binária. Vinculação é o processo de pegar uma classe ou interface e combiná-la no estado de tempo de execução da Java Virtual Machine para que possa ser executada. A inicialização de uma classe ou interface consiste na execução do método de inicialização de classe ou interface `<clinit>` ([§2.9.2](<#/doc/jvms/jvms-02>)).

Neste capítulo, [§5.1](<#/doc/jvms/jvms-05>) descreve como a Java Virtual Machine deriva referências simbólicas da representação binária de uma classe ou interface. [§5.2](<#/doc/jvms/jvms-05>) explica como os processos de carregamento, vinculação e inicialização são iniciados pela primeira vez pela Java Virtual Machine. [§5.3](<#/doc/jvms/jvms-05>) especifica como as representações binárias de classes e interfaces são carregadas por class loaders e como as classes e interfaces são criadas. A vinculação é descrita em [§5.4](<#/doc/jvms/jvms-05>). [§5.5](<#/doc/jvms/jvms-05>) detalha como classes e interfaces são inicializadas. [§5.6](<#/doc/jvms/jvms-05>) introduz a noção de vinculação de métodos nativos. Finalmente, [§5.7](<#/doc/jvms/jvms-05>) descreve quando a Java Virtual Machine termina.

## 5.1. O Pool de Constantes em Tempo de Execução

A Java Virtual Machine mantém um pool de constantes em tempo de execução para cada classe e interface ([§2.5.5](<#/doc/jvms/jvms-02>)). Esta estrutura de dados serve a muitos dos propósitos da tabela de símbolos de uma implementação de linguagem de programação convencional. A tabela `constant_pool` na representação binária de uma classe ou interface ([§4.4](<#/doc/jvms/jvms-04>)) é usada para construir o pool de constantes em tempo de execução na criação de classe ou interface ([§5.3](<#/doc/jvms/jvms-05>)).

Existem dois tipos de entrada no pool de constantes em tempo de execução: referências simbólicas, que podem ser resolvidas posteriormente ([§5.4.3](<#/doc/jvms/jvms-05>)), e constantes estáticas, que não requerem processamento adicional.

As referências simbólicas no pool de constantes em tempo de execução são derivadas de entradas na tabela `constant_pool` de acordo com a estrutura de cada entrada:

  * Uma referência simbólica a uma classe ou interface é derivada de uma estrutura `CONSTANT_Class_info` ([§4.4.1](<#/doc/jvms/jvms-04>)). Tal referência fornece o nome da classe ou interface na seguinte forma:

    * Para uma classe não-array ou uma interface, o nome é o nome binário ([§4.2.1](<#/doc/jvms/jvms-04>)) da classe ou interface.

    * Para uma classe array de _n_ dimensões, o nome começa com _n_ ocorrências do caractere ASCII `[` seguido por uma representação do tipo de elemento:

      * Se o tipo de elemento for um tipo primitivo, ele é representado pelo descritor de campo correspondente ([§4.3.2](<#/doc/jvms/jvms-04>)).

      * Caso contrário, se o tipo de elemento for um tipo `reference`, ele é representado pelo caractere ASCII `L` seguido pelo nome binário do tipo de elemento seguido pelo caractere ASCII `;`.

Sempre que este capítulo se refere ao nome de uma classe ou interface, o nome deve ser entendido na forma acima. (Esta é também a forma retornada pelo método `Class.getName`.)

  * Uma referência simbólica a um campo de uma classe ou interface é derivada de uma estrutura `CONSTANT_Fieldref_info` ([§4.4.2](<#/doc/jvms/jvms-04>)). Tal referência fornece o nome e o descritor do campo, bem como uma referência simbólica à classe ou interface na qual o campo deve ser encontrado.

  * Uma referência simbólica a um método de uma classe é derivada de uma estrutura `CONSTANT_Methodref_info` ([§4.4.2](<#/doc/jvms/jvms-04>)). Tal referência fornece o nome e o descritor do método, bem como uma referência simbólica à classe na qual o método deve ser encontrado.

  * Uma referência simbólica a um método de uma interface é derivada de uma estrutura `CONSTANT_InterfaceMethodref_info` ([§4.4.2](<#/doc/jvms/jvms-04>)). Tal referência fornece o nome e o descritor do método de interface, bem como uma referência simbólica à interface na qual o método deve ser encontrado.

  * Uma referência simbólica a um method handle é derivada de uma estrutura `CONSTANT_MethodHandle_info` ([§4.4.8](<#/doc/jvms/jvms-04>)). Tal referência fornece uma referência simbólica a um campo de uma classe ou interface, ou um método de uma classe, ou um método de uma interface, dependendo do tipo do method handle.

  * Uma referência simbólica a um tipo de método é derivada de uma estrutura `CONSTANT_MethodType_info` ([§4.4.9](<#/doc/jvms/jvms-04>)). Tal referência fornece um descritor de método ([§4.3.3](<#/doc/jvms/jvms-04>)).

  * Uma referência simbólica a uma _constante computada dinamicamente_ é derivada de uma estrutura `CONSTANT_Dynamic_info` ([§4.4.10](<#/doc/jvms/jvms-04>)). Tal referência fornece:

    * uma referência simbólica a um method handle, que será invocado para calcular o valor da constante;

    * uma sequência de referências simbólicas e constantes estáticas, que servirão como _argumentos estáticos_ quando o method handle for invocado;

    * um nome não qualificado e um descritor de campo.

  * Uma referência simbólica a um _call site computado dinamicamente_ é derivada de uma estrutura `CONSTANT_InvokeDynamic_info` ([§4.4.10](<#/doc/jvms/jvms-04>)). Tal referência fornece:

    * uma referência simbólica a um method handle, que será invocado no curso de uma instrução _invokedynamic_ ([§ _invokedynamic_](<#/doc/jvms/jvms-06>)) para computar uma instância de `java.lang.invoke.CallSite`;

    * uma sequência de referências simbólicas e constantes estáticas, que servirão como _argumentos estáticos_ quando o method handle for invocado;

    * um nome não qualificado e um descritor de método.

As constantes estáticas no pool de constantes em tempo de execução também são derivadas de entradas na tabela `constant_pool` de acordo com a estrutura de cada entrada:

  * Uma constante string é uma `reference` para uma instância da classe `String`, e é derivada de uma estrutura `CONSTANT_String_info` ([§4.4.3](<#/doc/jvms/jvms-04>)). Para derivar uma constante string, a Java Virtual Machine examina a sequência de pontos de código fornecida pela estrutura `CONSTANT_String_info`:

    * Se o método `String.intern` foi invocado anteriormente em uma instância da classe `String` contendo uma sequência de pontos de código Unicode idêntica à fornecida pela estrutura `CONSTANT_String_info`, então a constante string é uma `reference` para essa mesma instância da classe `String`.

    * Caso contrário, uma nova instância da classe `String` é criada contendo a sequência de pontos de código Unicode fornecida pela estrutura `CONSTANT_String_info`. A constante string é uma `reference` para a nova instância. Finalmente, o método `String.intern` é invocado na nova instância.

  * Constantes numéricas são derivadas das estruturas `CONSTANT_Integer_info`, `CONSTANT_Float_info`, `CONSTANT_Long_info` e `CONSTANT_Double_info` ([§4.4.4](<#/doc/jvms/jvms-04>), [§4.4.5](<#/doc/jvms/jvms-04>)).

Note que as estruturas `CONSTANT_Float_info` representam valores no formato IEEE 754 single e as estruturas `CONSTANT_Double_info` representam valores no formato IEEE 754 double. As constantes numéricas derivadas dessas estruturas devem, portanto, ser valores que podem ser representados usando os formatos IEEE 754 single e double, respectivamente.

As estruturas restantes na tabela `constant_pool` - as estruturas descritivas `CONSTANT_NameAndType_info`, `CONSTANT_Module_info` e `CONSTANT_Package_info`, e a estrutura fundamental `CONSTANT_Utf8_info` - são usadas apenas indiretamente na construção do pool de constantes em tempo de execução. Nenhuma entrada no pool de constantes em tempo de execução corresponde diretamente a essas estruturas.

Algumas entradas no pool de constantes em tempo de execução são _carregáveis_ (loadable), o que significa:

  * Elas podem ser empilhadas pelas instruções da família _ldc_ ([§ _ldc_](<#/doc/jvms/jvms-06>), [§ _ldc_w_](<#/doc/jvms/jvms-06>), [§ _ldc2_w_](<#/doc/jvms/jvms-06>)).

  * Elas podem ser argumentos estáticos para métodos bootstrap para constantes e call sites computados dinamicamente ([§5.4.3.6](<#/doc/jvms/jvms-05>)).

Uma entrada no pool de constantes em tempo de execução é carregável se for derivada de uma entrada na tabela `constant_pool` que é carregável (veja [Tabela 4.4-C](<#/doc/jvms/jvms-04>)). Consequentemente, as seguintes entradas no pool de constantes em tempo de execução são carregáveis:

  * Referências simbólicas a classes e interfaces

  * Referências simbólicas a method handles

  * Referências simbólicas a tipos de método

  * Referências simbólicas a constantes computadas dinamicamente

  * Constantes estáticas

## 5.2. Inicialização da Java Virtual Machine

A Java Virtual Machine inicia criando uma classe ou interface inicial usando o bootstrap class loader ([§5.3.1](<#/doc/jvms/jvms-05>)) ou um class loader definido pelo usuário ([§5.3.2](<#/doc/jvms/jvms-05>)). A Java Virtual Machine então vincula a classe ou interface inicial, a inicializa, cria uma instância dela (se necessário) e invoca um método `main` conforme especificado em (JLS §12.1.4). A invocação deste método impulsiona toda a execução subsequente. A execução das instruções da Java Virtual Machine do método de inicialização de instância (se necessário) e do método `main` da classe ou interface inicial pode causar a vinculação (e consequentemente a criação) de classes e interfaces adicionais, bem como a invocação de métodos adicionais.

A classe ou interface inicial é especificada de maneira dependente da implementação. Por exemplo, a classe ou interface inicial poderia ser fornecida como um argumento de linha de comando. Alternativamente, a implementação da Java Virtual Machine poderia fornecer uma classe inicial que configura um class loader que, por sua vez, carrega uma aplicação. Outras escolhas da classe ou interface inicial são possíveis, desde que sejam consistentes com a especificação dada no parágrafo anterior.

Em contraste, a seleção e invocação de um método `main` da classe ou interface inicial procede de acordo com as regras independentes da implementação dadas em (JLS §12.1.4).

## 5.3. Criação e Carregamento

A criação de uma classe ou interface C denotada pelo nome `N` consiste na construção de uma representação interna específica da implementação de C na área de métodos da Java Virtual Machine ([§2.5.4](<#/doc/jvms/jvms-02>)).

A criação de classe ou interface é acionada por outra classe ou interface D, cujo pool de constantes em tempo de execução referencia simbolicamente C por meio do nome `N` ([§5.4.3.1](<#/doc/jvms/jvms-05>)). Se `N` não denota uma classe array, então a Java Virtual Machine depende de um _class loader_ para localizar uma representação binária para uma classe ou interface chamada `N` ([§4.1](<#/doc/jvms/jvms-04>)). Uma vez que um class loader localiza uma representação binária, ele depende, por sua vez, da Java Virtual Machine para derivar a classe ou interface C da representação binária e, em seguida, para criar C na área de métodos. Classes array não possuem uma representação binária externa; elas são criadas pela Java Virtual Machine por meio de um processo diferente.

A criação de classe ou interface também pode ser acionada por D invocando métodos em certas bibliotecas de classes da Plataforma Java SE ([§2.12](<#/doc/jvms/jvms-02>)), como reflection.

Existem dois tipos de class loaders: o bootstrap class loader fornecido pela Java Virtual Machine e os class loaders definidos pelo usuário. Cada class loader definido pelo usuário é uma instância de uma subclasse da classe `abstract` `ClassLoader`. As aplicações empregam class loaders definidos pelo usuário para estender a maneira como a Java Virtual Machine cria classes dinamicamente. Class loaders definidos pelo usuário podem ser usados para criar classes que se originam de fontes definidas pelo usuário. Por exemplo, uma classe pode ser baixada por uma rede, gerada em tempo real ou extraída de um arquivo criptografado.

Quando a Java Virtual Machine pede a um class loader `L` para localizar uma representação binária para uma classe ou interface chamada `N`, `L` _carrega_ a classe ou interface C denotada por `N`. `L` pode carregar C diretamente, localizando uma representação binária e pedindo à Java Virtual Machine para derivar e criar C a partir da representação binária. Alternativamente, `L` pode carregar C indiretamente, delegando o carregamento a outro class loader que carrega C direta ou indiretamente.

Se `L` carrega C diretamente, dizemos que `L` _define_ C ou, equivalentemente, que `L` é o _defining loader_ de C.

Seja `L` carregando C direta ou indiretamente, dizemos que `L` _inicia_ o carregamento de C ou, equivalentemente, que `L` é um _initiating loader_ de C.

Devido à delegação de class loader, o loader `L1` que inicia o carregamento a pedido da Java Virtual Machine pode não ser o mesmo que o loader `L2` que completa o carregamento definindo a classe ou interface. Neste caso, dizemos que cada um de `L1` e `L2` _inicia_ o carregamento de C ou, equivalentemente, que cada um de `L1` e `L2` é um _initiating loader_ de C. Quaisquer loaders em uma cadeia de delegação entre `L1` e `L2` não são considerados initiating loaders de C.

Às vezes, representaremos uma classe ou interface usando a seguinte notação, em vez de usar um identificador como C ou D:

  * `<`N`, `Ld`>` \- onde `N` denota o nome da classe ou interface e `Ld` denota o defining loader da classe ou interface.

  * `N`Li` \- onde `N` denota o nome da classe ou interface e `Li` denota um initiating loader da classe ou interface.

Deve ficar claro que _carregar_ uma classe ou interface é um esforço conjunto entre a Java Virtual Machine e um class loader (ou múltiplos class loaders, se houver delegação). O resultado final do carregamento é que a Java Virtual Machine cria uma classe ou interface em sua área de métodos, então é frequentemente conveniente dizer que uma classe ou interface é _carregada e, consequentemente, criada_.

A natureza complexa de idas e vindas do carregamento, combinada com a capacidade dos class loaders definidos pelo usuário de exibir comportamento arbitrário, significa que exceções podem ser lançadas _depois_ que a Java Virtual Machine criou uma classe ou interface, mas _antes_ que cada class loader participante no carregamento tenha sido concluído. Esta especificação considera tais exceções no que é frequentemente referido como _o processo de carregamento e criação de uma classe ou interface_.

A Java Virtual Machine usa um dos três procedimentos para criar uma classe ou interface C denotada pelo nome `N` no pool de constantes em tempo de execução de uma classe ou interface D:

  * Se `N` denota uma classe não-array ou uma interface, e D foi definida pelo bootstrap class loader, então o bootstrap class loader inicia o carregamento de C ([§5.3.1](<#/doc/jvms/jvms-05>)).

  * Se `N` denota uma classe não-array ou uma interface, e D foi definida por um class loader definido pelo usuário, então esse mesmo class loader definido pelo usuário inicia o carregamento de C ([§5.3.2](<#/doc/jvms/jvms-05>)).

  * Se `N` denota uma classe array, então a Java Virtual Machine cria uma classe array C denotada por `N`, em associação com o defining loader de D ([§5.3.3](<#/doc/jvms/jvms-05>)).

Embora o defining loader de D seja relevante no curso da criação de uma classe array, ele não é usado para carregar e, consequentemente, criar a classe array.

Se ocorrer um erro durante o carregamento de uma classe ou interface - seja quando um class loader está localizando uma representação binária, ou quando a Java Virtual Machine está derivando e criando uma classe a partir dela - então o erro deve ser lançado em um ponto do programa que (direta ou indiretamente) usa a classe ou interface que está sendo carregada.

Um class loader bem-comportado deve manter três propriedades:

  * Dado o mesmo nome, um bom class loader deve sempre retornar o mesmo objeto `Class`.

  * Se um class loader `L1` delega o carregamento de uma classe C para outro loader `L2`, então para qualquer tipo T que ocorra como a superclasse direta ou uma superinterface direta de C, ou como o tipo de um campo em C, ou como o tipo de um parâmetro formal de um método ou construtor em C, ou como um tipo de retorno de um método em C, `L1` e `L2` devem retornar o mesmo objeto `Class`.

  * Se um class loader definido pelo usuário pré-busca representações binárias de classes e interfaces, ou carrega um grupo de classes relacionadas juntas, então ele deve refletir os erros de carregamento apenas em pontos do programa onde eles poderiam ter surgido sem pré-busca ou carregamento em grupo.

Após a criação, uma classe ou interface é determinada não apenas pelo seu nome, mas por um par: seu nome binário ([§4.2.1](<#/doc/jvms/jvms-04>)) e seu defining loader. Cada classe ou interface pertence a um único _run-time package_. O run-time package de uma classe ou interface é determinado pelo nome do pacote e pelo defining loader da classe ou interface.

### 5.3.1. Carregamento Usando o Bootstrap Class Loader

O processo de carregamento e criação da classe não-array ou interface C denotada por `N` usando o bootstrap class loader é o seguinte.

Primeiro, a Java Virtual Machine determina se o bootstrap class loader já foi registrado como um initiating loader de uma classe ou interface denotada por `N`. Se sim, esta classe ou interface é C, e nenhum carregamento ou criação de classe é necessário.

Caso contrário, a Java Virtual Machine passa o argumento `N` para uma invocação de um método no bootstrap class loader. Para carregar C, o bootstrap class loader localiza uma suposta representação de C de maneira dependente da plataforma, então pede à Java Virtual Machine para derivar uma classe ou interface C denotada por `N` da suposta representação usando o bootstrap class loader, e então para criar C, através do algoritmo de [§5.3.5](<#/doc/jvms/jvms-05>).

Tipicamente, uma classe ou interface será representada usando um arquivo em um sistema de arquivos hierárquico, e o nome da classe ou interface será codificado no caminho do arquivo para auxiliar na sua localização.

Se nenhuma suposta representação de C for encontrada, o bootstrap class loader lança uma `ClassNotFoundException`. O processo de carregamento e criação de C então falha com um `NoClassDefFoundError` cuja causa é a `ClassNotFoundException`.

Se uma suposta representação de C for encontrada, mas a derivação de C a partir da suposta representação falhar, então o processo de carregamento e criação de C falha pela mesma razão.

Caso contrário, o processo de carregamento e criação de C é bem-sucedido.

### 5.3.2. Carregamento Usando um Class Loader Definido pelo Usuário

O processo de carregamento e criação da classe não-array ou interface C denotada por `N` usando um class loader definido pelo usuário `L` é o seguinte.

Primeiro, a Java Virtual Machine determina se `L` já foi registrado como um initiating loader de uma classe ou interface denotada por `N`. Se sim, esta classe ou interface é C, e nenhum carregamento ou criação de classe é necessário.

Caso contrário, a Java Virtual Machine invoca o método `loadClass` da classe `ClassLoader` em `L`, passando o nome `N` de uma classe ou interface. `L` deve realizar uma das duas operações a seguir para carregar e, consequentemente, criar uma classe ou interface C:

  1. O class loader `L` pode carregar C diretamente. Isso é realizado obtendo um array de bytes que supostamente representa C como uma estrutura `ClassFile` ([§4.1](<#/doc/jvms/jvms-04>)), e então invocando o método `defineClass` da classe `ClassLoader`. Invocar `defineClass` faz com que a Java Virtual Machine derive uma classe ou interface C denotada por `N` do array de bytes usando `L`, e então crie C, através do algoritmo de [§5.3.5](<#/doc/jvms/jvms-05>). `L` deve usar o resultado de `defineClass` como o resultado de `loadClass`.

  2. O class loader `L` pode carregar C indiretamente, delegando o carregamento de C para algum outro class loader `L`'. Isso é realizado passando o argumento `N` para uma invocação de um método em `L`' (tipicamente o método `loadClass` da classe `ClassLoader`). `L` deve usar o resultado desse método como o resultado de `loadClass`.

As seguintes regras se aplicam independentemente da operação realizada:

  * Se um class loader não consegue encontrar uma suposta representação de uma classe ou interface denotada por `N`, ele deve lançar uma `ClassNotFoundException`. O processo de carregamento e criação de C então falha com um `NoClassDefFoundError` cuja causa é a `ClassNotFoundException`.

  * Se um class loader encontra uma suposta representação de C, mas a derivação de C a partir da suposta representação falha, então o processo de carregamento e criação de C falha pela mesma razão.

  * Se um class loader lança uma exceção diferente de `ClassNotFoundException`, então o processo de carregamento e criação de C falha pela mesma razão.

Se a invocação de `loadClass` em `L` tiver um resultado, então:

  * Se o resultado for `null`, ou o resultado for uma classe ou interface com um nome diferente de `N`, então o resultado é descartado, e o processo de carregamento e criação falha com um `NoClassDefFoundError`.

  * Caso contrário, o resultado é a classe ou interface C criada. A Java Virtual Machine registra que `L` é um initiating loader de C ([§5.3.4](<#/doc/jvms/jvms-05>)). O processo de carregamento e criação de C é bem-sucedido.

Desde o JDK 1.1, a implementação da Java Virtual Machine da Oracle invoca o método `loadClass` de um argumento em um class loader para fazer com que ele carregue uma classe ou interface. O argumento para `loadClass` é o nome da classe ou interface a ser carregada. Existe também uma versão de dois argumentos do método `loadClass`, onde o segundo argumento é um `boolean` que indica se a classe ou interface deve ser vinculada ou não. Apenas a versão de dois argumentos foi fornecida no JDK 1.0.2, e a implementação da Java Virtual Machine da Oracle dependia dela para vincular a classe ou interface carregada. Do JDK 1.1 em diante, a implementação da Java Virtual Machine da Oracle vincula a classe ou interface diretamente, sem depender do class loader.

### 5.3.3. Criando Classes Array

Os seguintes passos são usados para criar a classe array C denotada pelo nome `N` em associação com o class loader `L`. `L` pode ser o bootstrap class loader ou um class loader definido pelo usuário.

Primeiro, a Java Virtual Machine determina se `L` já foi registrado como um initiating loader de uma classe array com o mesmo tipo de componente que `N`. Se sim, esta classe é C, e nenhuma criação de classe array é necessária.

Caso contrário, os seguintes passos são realizados para criar C:

  1. Se o tipo de componente for um tipo `reference`, o algoritmo desta seção ([§5.3](<#/doc/jvms/jvms-05>)) é aplicado recursivamente usando `L` para carregar e, consequentemente, criar o tipo de componente de C.

  2. A Java Virtual Machine cria uma nova classe array com o tipo de componente e o número de dimensões indicados.

Se o tipo de componente for um tipo `reference`, a Java Virtual Machine marca C para ter o defining loader do tipo de componente como seu defining loader. Caso contrário, a Java Virtual Machine marca C para ter o bootstrap class loader como seu defining loader.

Em qualquer caso, a Java Virtual Machine então registra que `L` é um initiating loader para C ([§5.3.4](<#/doc/jvms/jvms-05>)).

Se o tipo de componente for um tipo `reference`, a acessibilidade da classe array é determinada pela acessibilidade de seu tipo de componente ([§5.4.4](<#/doc/jvms/jvms-05>)). Caso contrário, a classe array é acessível a todas as classes e interfaces.

### 5.3.4. Restrições de Carregamento

Garantir a vinculação segura de tipos na presença de class loaders requer atenção especial. É possível que, quando dois class loaders diferentes iniciam o carregamento de uma classe ou interface denotada por `N`, o nome `N` possa denotar uma classe ou interface diferente em cada loader.

Quando uma classe ou interface C = `<`N1`, `L1`>` faz uma referência simbólica a um campo ou método de outra classe ou interface D = `<`N2`, `L2`>`, a referência simbólica inclui um descritor especificando o tipo do campo, ou os tipos de retorno e argumento do método. É essencial que qualquer nome de classe ou interface `N` mencionado no descritor de campo ou método ([§4.3.2](<#/doc/jvms/jvms-04>), [§4.3.3](<#/doc/jvms/jvms-04>)) denote a mesma classe ou interface quando carregada por `L1` e quando carregada por `L2`.

Para garantir isso, a Java Virtual Machine impõe _restrições de carregamento_ da forma `N`L1` = `N`L2` durante a preparação ([§5.4.2](<#/doc/jvms/jvms-05>)) e resolução ([§5.4.3](<#/doc/jvms/jvms-05>)). Para fazer cumprir essas restrições, a Java Virtual Machine, em certos momentos prescritos (veja [§5.3.1](<#/doc/jvms/jvms-05>), [§5.3.2](<#/doc/jvms/jvms-05>), [§5.3.3](<#/doc/jvms/jvms-05>) e [§5.3.5](<#/doc/jvms/jvms-05>)), registrará que um determinado loader é um initiating loader de uma determinada classe. Após registrar que um loader é um initiating loader de uma classe, a Java Virtual Machine deve verificar imediatamente se alguma restrição de carregamento foi violada. Se sim, o registro é retraído, a Java Virtual Machine lança uma `LinkageError`, e a operação de carregamento que causou o registro falha.

Similarmente, após impor uma restrição de carregamento (veja [§5.4.2](<#/doc/jvms/jvms-05>), [§5.4.3.2](<#/doc/jvms/jvms-05>), [§5.4.3.3](<#/doc/jvms/jvms-05>) e [§5.4.3.4](<#/doc/jvms/jvms-05>)), a Java Virtual Machine deve verificar imediatamente se alguma restrição de carregamento foi violada. Se sim, a restrição de carregamento recém-imposta é retraída, a Java Virtual Machine lança uma `LinkageError`, e a operação que causou a imposição da restrição (seja resolução ou preparação, conforme o caso) falha.

As situações descritas aqui são as únicas vezes em que a Java Virtual Machine verifica se alguma restrição de carregamento foi violada. Uma restrição de carregamento é violada se, e somente se, todas as quatro condições a seguir forem verdadeiras:

  * Existe um loader `L` tal que `L` foi registrado pela Java Virtual Machine como um initiating loader de uma classe C chamada `N`.

  * Existe um loader `L`' tal que `L`' foi registrado pela Java Virtual Machine como um initiating loader de uma classe C ' chamada `N`.

  * A relação de equivalência definida pelo conjunto de restrições impostas (fechamento reflexivo e transitivo) implica `N`L` = `N`L`'.

  * C ≠ C '.

Uma discussão completa sobre class loaders e segurança de tipos está além do escopo desta especificação. Para uma discussão mais abrangente, os leitores são encaminhados a _Dynamic Class Loading in the Java Virtual Machine_ por Sheng Liang e Gilad Bracha (_Proceedings of the 1998 ACM SIGPLAN Conference on Object-Oriented Programming Systems, Languages and Applications_).

### 5.3.5. Derivando uma Classe a Partir de uma Representação de Arquivo `class`

Class loaders requerem a cooperação da Java Virtual Machine para derivar e criar uma classe ou interface a partir de uma representação binária fornecida pelo loader ([§5.3.1](<#/doc/jvms/jvms-05>), [§5.3.2](<#/doc/jvms/jvms-05>)). Os seguintes passos são usados para derivar uma classe ou interface C denotada por `N` de uma suposta representação no formato de arquivo `class` quando solicitada por um class loader `L`.

  1. Primeiro, a Java Virtual Machine determina se a solicitação do class loader `L` para derivar uma classe ou interface denotada por `N` é permitida.

Se `L` já foi registrado como um initiating loader de uma classe ou interface denotada por `N`, a derivação lança uma `LinkageError`.

Se a Java Virtual Machine já estiver no processo de derivar uma classe ou interface denotada por `N` conforme solicitado pelo class loader `L`, a derivação lança uma `ClassCircularityError`.

  2. Em seguida, a Java Virtual Machine tenta analisar a suposta representação. A suposta representação pode, de fato, não ser uma representação válida de C, então a derivação deve detectar os seguintes problemas:

     * Se a suposta representação não for uma estrutura `ClassFile` ([§4.1](<#/doc/jvms/jvms-04>), [§4.8](<#/doc/jvms/jvms-04>)), a derivação lança uma `ClassFormatError`.
* Caso contrário, se a representação alegada não for de uma versão principal ou secundária suportada ([§4.1](<#/doc/jvms/jvms-04>)), a derivação lança um `UnsupportedClassVersionError`.

`UnsupportedClassVersionError`, uma subclasse de `ClassFormatError`, foi introduzida no JDK 1.2 para permitir a fácil identificação de um `ClassFormatError` causado por uma tentativa de carregar uma classe cuja representação usa uma versão não suportada do formato de arquivo `class`. No JDK 1.1 e anteriores, uma instância de `NoClassDefFoundError` ou `ClassFormatError` era lançada em caso de versão não suportada, dependendo se a classe estava sendo carregada pelo carregador de classes do sistema ou por um carregador de classes definido pelo usuário.

* Caso contrário, se a representação alegada não representar de fato uma classe ou interface nomeada `N`, a derivação lança um `NoClassDefFoundError`.

Isso ocorre quando a representação alegada possui um item `this_class` que especifica um nome diferente de `N`, ou um item `access_flags` que tem a flag `ACC_MODULE` definida.

3. Se C tiver uma superclasse direta, a referência simbólica de C para sua superclasse direta é resolvida usando o algoritmo de [§5.4.3.1](<#/doc/jvms/jvms-05>), com `L` atuando como o carregador definidor de C. Note que se C for uma interface, ela deve ter `Object` como sua superclasse direta, que já deve ter sido carregada. Somente `Object` não tem superclasse direta.

Qualquer exceção que possa ser lançada como resultado de falha na resolução de classe ou interface pode ser lançada como resultado da derivação. Além disso, a derivação deve detectar os seguintes problemas:

* Se a classe ou interface nomeada como superclasse direta de C for de fato uma interface ou uma classe `final`, a derivação lança um `IncompatibleClassChangeError`.

* Caso contrário, se a classe nomeada como superclasse direta de C tiver um atributo `PermittedSubclasses` ([§4.7.31](<#/doc/jvms/jvms-04>)) e qualquer um dos seguintes for verdadeiro, a derivação lança um `IncompatibleClassChangeError`:

  * A superclasse está em um módulo de tempo de execução diferente de C ([§5.3.6](<#/doc/jvms/jvms-05>)).

  * C não tem sua flag `ACC_PUBLIC` definida ([§4.1](<#/doc/jvms/jvms-04>)) e a superclasse está em um pacote de tempo de execução diferente de C ([§5.3](<#/doc/jvms/jvms-05>)).

  * Nenhuma entrada no array `classes` do atributo `PermittedSubclasses` da superclasse se refere a uma classe ou interface com o nome `N`.

* Caso contrário, se C for uma classe e algum método de instância declarado em C puder sobrescrever ([§5.4.5](<#/doc/jvms/jvms-05>)) um método de instância `final` declarado em uma superclasse de C, a derivação lança um `IncompatibleClassChangeError`.

4. Se C tiver quaisquer superinterfaces diretas, as referências simbólicas de C para suas superinterfaces diretas são resolvidas usando o algoritmo de [§5.4.3.1](<#/doc/jvms/jvms-05>), com `L` atuando como o carregador definidor de C.

Qualquer exceção que possa ser lançada como resultado de falha na resolução de classe ou interface pode ser lançada como resultado da derivação. Além disso, a derivação deve detectar os seguintes problemas:

* Se qualquer classe ou interface nomeada como superinterface direta de C não for de fato uma interface, a derivação lança um `IncompatibleClassChangeError`.

* Caso contrário, para cada superinterface direta nomeada por C, se a superinterface tiver um atributo `PermittedSubclasses` ([§4.7.31](<#/doc/jvms/jvms-04>)) e qualquer um dos seguintes for verdadeiro, a derivação lança um `IncompatibleClassChangeError`:

  * A superinterface está em um módulo de tempo de execução diferente de C.

  * C não tem sua flag `ACC_PUBLIC` definida ([§4.1](<#/doc/jvms/jvms-04>)) e a superinterface está em um pacote de tempo de execução diferente de C.

  * Nenhuma entrada no array `classes` do atributo `PermittedSubclasses` da superinterface se refere a uma classe ou interface com o nome `N`.

Se nenhuma exceção for lançada nas etapas 1-4, a derivação da classe ou interface C é bem-sucedida. A Java Virtual Machine marca C para ter `L` como seu carregador definidor, registra que `L` é um carregador iniciador de C ([§5.3.4](<#/doc/jvms/jvms-05>)), e cria C na área de métodos ([§2.5.4](<#/doc/jvms/jvms-02>)).

Quando a derivação é bem-sucedida, o processo de carregamento e criação de C não está completo até que cada carregador de classes que esteve envolvido no carregamento de C (direta ou indiretamente) retorne C como seu resultado. Dependendo do comportamento dos carregadores de classes definidos pelo usuário, o processo de carregamento e criação de C ainda pode falhar ([§5.3.2](<#/doc/jvms/jvms-05>)).

Se uma exceção for lançada nas etapas 1-4, a derivação da classe ou interface C falha com essa exceção.

Solicitações para derivar uma classe ou interface podem ser feitas concorrentemente por código de carregador de classes executando em múltiplas threads, mas o processo de derivação é sequencial. A Java Virtual Machine garante que apenas uma solicitação por um dado carregador de classes para derivar uma classe ou interface de um dado nome seja processada por vez, enquanto todas as outras solicitações aguardam até que a primeira solicitação seja concluída.

Conforme especificado pelo processo de derivação, se a primeira solicitação for bem-sucedida, nenhuma solicitação subsequente será permitida. A API `ClassLoader` fornece mecanismos para sincronizar solicitações de derivação e armazenar em cache resultados bem-sucedidos para que solicitações de derivação redundantes não ocorram.

### 5.3.6. Módulos e Camadas

A Java Virtual Machine suporta a organização de classes e interfaces em módulos. A associação de uma classe ou interface C a um módulo `M` é usada para controlar o acesso a C a partir de classes e interfaces em módulos diferentes de `M` ([§5.4.4](<#/doc/jvms/jvms-05>)).

A associação a módulos é definida em termos de pacotes de tempo de execução ([§5.3](<#/doc/jvms/jvms-05>)). Um programa determina os nomes dos pacotes em cada módulo e os carregadores de classes que criarão as classes e interfaces dos pacotes nomeados; ele então especifica os pacotes e carregadores de classes para uma invocação do método `defineModules` da classe `ModuleLayer`. Invocar `defineModules` faz com que a Java Virtual Machine crie novos _módulos de tempo de execução_ que são associados aos pacotes de tempo de execução dos carregadores de classes.

Cada módulo de tempo de execução indica os pacotes de tempo de execução que ele _exporta_, o que influencia o acesso às classes e interfaces `public` nesses pacotes de tempo de execução. Cada módulo de tempo de execução também indica os outros módulos de tempo de execução que ele _lê_, o que influencia o acesso de seu próprio código aos tipos e interfaces `public` nesses módulos de tempo de execução.

Dizemos que _uma classe está em um módulo de tempo de execução_ se o pacote de tempo de execução da classe estiver associado (ou será associado, se a classe for realmente criada) a esse módulo de tempo de execução.

Uma classe criada por um carregador de classes está em exatamente um pacote de tempo de execução e, portanto, em exatamente um módulo de tempo de execução, porque a Java Virtual Machine não suporta que um pacote de tempo de execução seja associado a (ou, de forma mais evocativa, "dividido entre") múltiplos módulos de tempo de execução.

Um módulo de tempo de execução é implicitamente vinculado a exatamente um carregador de classes, pela semântica de `defineModules`. Por outro lado, um carregador de classes pode criar classes em mais de um módulo de tempo de execução, porque a Java Virtual Machine não exige que todos os pacotes de tempo de execução de um carregador de classes sejam associados ao mesmo módulo de tempo de execução.

Em outras palavras, a relação entre carregadores de classes e módulos de tempo de execução não precisa ser 1:1. Para um dado conjunto de módulos a serem carregados, se um programa puder determinar que os nomes dos pacotes em cada módulo são encontrados apenas naquele módulo, então o programa pode especificar apenas um carregador de classes para a invocação de `defineModules`. Este carregador de classes criará classes em múltiplos módulos de tempo de execução.

Cada módulo de tempo de execução criado por `defineModules` faz parte de uma _camada_. Uma camada representa um conjunto de carregadores de classes que, em conjunto, servem para criar classes em um conjunto de módulos de tempo de execução. Existem dois tipos de camadas: a camada de inicialização fornecida pela Java Virtual Machine e as camadas definidas pelo usuário. A camada de inicialização é criada na inicialização da Java Virtual Machine de uma maneira dependente da implementação. Ela associa o módulo de tempo de execução padrão `java.base` a pacotes de tempo de execução padrão definidos pelo carregador de classes bootstrap, como `java.lang`. Camadas definidas pelo usuário são criadas por programas a fim de construir conjuntos de módulos de tempo de execução que dependem de `java.base` e outros módulos de tempo de execução padrão.

Um módulo de tempo de execução é implicitamente parte de exatamente uma camada, pela semântica de `defineModules`. No entanto, um carregador de classes pode criar classes nos módulos de tempo de execução de diferentes camadas, porque o mesmo carregador de classes pode ser especificado para múltiplas invocações de `defineModules`. O controle de acesso é governado pelo módulo de tempo de execução de uma classe, e não pelo carregador de classes que criou a classe ou pela(s) camada(s) que o carregador de classes atende.

O conjunto de carregadores de classes especificados para uma camada, e o conjunto de módulos de tempo de execução que fazem parte de uma camada, são imutáveis após a criação da camada. No entanto, a classe `ModuleLayer` oferece aos programas um certo grau de controle dinâmico sobre as relações entre os módulos de tempo de execução em uma camada definida pelo usuário.

Se uma camada definida pelo usuário contiver mais de um carregador de classes, então qualquer delegação entre os carregadores de classes é responsabilidade do programa que criou a camada. A Java Virtual Machine não verifica se os carregadores de classes da camada delegam uns aos outros de acordo com a forma como os módulos de tempo de execução da camada se leem. Além disso, se os módulos de tempo de execução da camada forem modificados via classe `ModuleLayer` para ler módulos de tempo de execução adicionais, então a Java Virtual Machine não verifica se os carregadores de classes da camada são modificados por algum mecanismo externo para delegar de forma correspondente.

Existem semelhanças e diferenças entre carregadores de classes e camadas. Por um lado, uma camada é semelhante a um carregador de classes, pois cada um pode delegar, respectivamente, a uma ou mais camadas pai ou carregadores de classes que criaram, respectivamente, módulos ou classes em um momento anterior. Ou seja, o conjunto de módulos especificados para uma camada pode depender de módulos não especificados para a camada, e sim especificados anteriormente para uma ou mais camadas pai. Por outro lado, uma camada pode ser usada para criar novos módulos apenas uma vez, enquanto um carregador de classes pode ser usado para criar novas classes ou interfaces a qualquer momento através de múltiplas invocações do método `defineClass`.

É possível que um carregador de classes defina uma classe ou interface em um pacote de tempo de execução que não foi associado a um módulo de tempo de execução por nenhuma das camadas que o carregador de classes atende. Isso pode ocorrer se o pacote de tempo de execução incorporar um pacote nomeado que não foi especificado para `defineModules`, ou se a classe ou interface tiver um nome binário simples ([§4.2.1](<#/doc/jvms/jvms-04>)) e, portanto, for um membro de um pacote de tempo de execução que incorpora um pacote sem nome (JLS §7.4.2). Em ambos os casos, a classe ou interface é tratada como um membro de um módulo de tempo de execução especial que é implicitamente vinculado ao carregador de classes. Este módulo de tempo de execução especial é conhecido como o _módulo sem nome_ do carregador de classes. O pacote de tempo de execução da classe ou interface é associado ao módulo sem nome do carregador de classes. Existem regras especiais para módulos sem nome, projetadas para maximizar sua interoperabilidade com outros módulos de tempo de execução, da seguinte forma:

* O módulo sem nome de um carregador de classes é distinto de todos os outros módulos de tempo de execução vinculados ao mesmo carregador de classes.

* O módulo sem nome de um carregador de classes é distinto de todos os módulos de tempo de execução (incluindo módulos sem nome) vinculados a outros carregadores de classes.

* Cada módulo sem nome lê cada módulo de tempo de execução.

* Cada módulo sem nome exporta, para cada módulo de tempo de execução, cada pacote de tempo de execução associado a si mesmo.

## 5.4. Vinculação

Vincular uma classe ou interface envolve verificar e preparar essa classe ou interface, sua superclasse direta, suas superinterfaces diretas e seu tipo de elemento (se for um tipo array), se necessário. A vinculação também envolve a resolução de referências simbólicas na classe ou interface, embora não necessariamente ao mesmo tempo em que a classe ou interface é verificada e preparada.

Esta especificação permite flexibilidade de implementação quanto ao momento em que as atividades de vinculação (e, devido à recursão, carregamento) ocorrem, desde que todas as seguintes propriedades sejam mantidas:

* Uma classe ou interface é completamente carregada antes de ser vinculada.

* Uma classe ou interface é completamente verificada e preparada antes de ser inicializada.

* Erros detectados durante a vinculação são lançados em um ponto do programa onde alguma ação é tomada pelo programa que pode, direta ou indiretamente, exigir a vinculação à classe ou interface envolvida no erro.

* Uma referência simbólica a uma constante computada dinamicamente não é resolvida até que (i) uma instrução _ldc_ , _ldc_w_ ou _ldc2_w_ que se refere a ela seja executada, ou (ii) um método bootstrap que se refere a ela como um argumento estático seja invocado.

Uma referência simbólica a um _call site_ computado dinamicamente não é resolvida até que um método bootstrap que se refere a ela como um argumento estático seja invocado.

Por exemplo, uma implementação da Java Virtual Machine pode escolher uma estratégia de vinculação "preguiçosa" (lazy), onde cada referência simbólica em uma classe ou interface (além das referências simbólicas acima) é resolvida individualmente quando é usada. Alternativamente, uma implementação pode escolher uma estratégia de vinculação "ansiosa" (eager), onde todas as referências simbólicas são resolvidas de uma vez quando a classe ou interface está sendo verificada. Isso significa que o processo de resolução pode continuar, em algumas implementações, depois que uma classe ou interface foi inicializada. Qualquer que seja a estratégia seguida, qualquer erro detectado durante a resolução deve ser lançado em um ponto do programa que (direta ou indiretamente) usa uma referência simbólica à classe ou interface.

Como a vinculação envolve a alocação de novas estruturas de dados, ela pode falhar com um `OutOfMemoryError`.

### 5.4.1. Verificação

A _Verificação_ ([§4.10](<#/doc/jvms/jvms-04>)) garante que a representação binária de uma classe ou interface esteja estruturalmente correta ([§4.9](<#/doc/jvms/jvms-04>)). A verificação pode fazer com que classes e interfaces adicionais sejam carregadas ([§5.3](<#/doc/jvms/jvms-05>)), mas não precisa fazer com que elas sejam verificadas ou preparadas.

Se a representação binária de uma classe ou interface não satisfizer as restrições estáticas ou estruturais listadas em [§4.9](<#/doc/jvms/jvms-04>), então um `VerifyError` deve ser lançado no ponto do programa que causou a verificação da classe ou interface.

Se uma tentativa da Java Virtual Machine de verificar uma classe ou interface falhar porque um erro que é uma instância de `LinkageError` (ou uma subclasse) é lançado, então as tentativas subsequentes de verificar a classe ou interface sempre falharão com o mesmo erro que foi lançado como resultado da tentativa de verificação inicial.

### 5.4.2. Preparação

A _Preparação_ envolve a criação dos campos estáticos para uma classe ou interface e a inicialização de tais campos com seus valores padrão ([§2.3](<#/doc/jvms/jvms-02>), [§2.4](<#/doc/jvms/jvms-02>)). Isso não requer a execução de nenhum código da Java Virtual Machine; inicializadores explícitos para campos estáticos são executados como parte da inicialização ([§5.5](<#/doc/jvms/jvms-05>)), não da preparação.

Durante a preparação de uma classe ou interface C, a Java Virtual Machine também impõe restrições de carregamento ([§5.3.4](<#/doc/jvms/jvms-05>)):

1. Seja `L1` o carregador definidor de C. Para cada método de instância `m` declarado em C que pode sobrescrever ([§5.4.5](<#/doc/jvms/jvms-05>)) um método de instância declarado em uma superclasse ou superinterface D = `<`N2`, `L2`>`, para cada nome de classe ou interface `N` mencionado pelo descritor de `m` ([§4.3.3](<#/doc/jvms/jvms-04>)), a Java Virtual Machine impõe a restrição de carregamento `N`L1` = `N`L2`.

2. Para cada método de instância `m` declarado em uma superinterface I = `<`N3`, `L3`>` de C, se C não declarar um método de instância que possa sobrescrever `m`, então um método é selecionado ([§5.4.6](<#/doc/jvms/jvms-05>)) em relação a C e ao método `m` em I. Seja D = `<`N2`, `L2`>` a classe ou interface que declara o método selecionado. Para cada nome de classe ou interface `N` mencionado pelo descritor de `m`, a Java Virtual Machine impõe a restrição de carregamento `N`L2` = `N`L3`.

A preparação pode ocorrer a qualquer momento após a criação, mas deve ser concluída antes da inicialização.

### 5.4.3. Resolução

Muitas instruções da Java Virtual Machine - _anewarray_ , _checkcast_ , _getfield_ , _getstatic_ , _instanceof_ , _invokedynamic_ , _invokeinterface_ , _invokespecial_ , _invokestatic_ , _invokevirtual_ , _ldc_ , _ldc_w_ , _ldc2_w_ , _multianewarray_ , _new_ , _putfield_ e _putstatic_ - dependem de referências simbólicas no pool de constantes de tempo de execução. A execução de qualquer uma dessas instruções requer a _resolução_ da referência simbólica.

Resolução é o processo de determinar dinamicamente um ou mais valores concretos a partir de uma referência simbólica no pool de constantes de tempo de execução. Inicialmente, todas as referências simbólicas no pool de constantes de tempo de execução estão não resolvidas.

A resolução de uma referência simbólica não resolvida para (i) uma classe ou interface, (ii) um campo, (iii) um método, (iv) um tipo de método, (v) um _method handle_, ou (vi) uma constante computada dinamicamente, prossegue de acordo com as regras dadas em [§5.4.3.1](<#/doc/jvms/jvms-05>) até [§5.4.3.5](<#/doc/jvms/jvms-05>). Nas três primeiras dessas seções, a classe ou interface em cujo pool de constantes de tempo de execução a referência simbólica aparece é rotulada D. Então:

* Se nenhum erro ocorrer durante a resolução da referência simbólica, então a resolução é bem-sucedida.

Tentativas subsequentes de resolver a referência simbólica sempre são bem-sucedidas trivialmente e resultam na mesma entidade produzida pela resolução inicial. Se a referência simbólica for para uma constante computada dinamicamente, o método bootstrap não é reexecutado para essas tentativas subsequentes.

* Se um erro ocorrer durante a resolução da referência simbólica, então é (i) uma instância de `IncompatibleClassChangeError` (ou uma subclasse); (ii) uma instância de `Error` (ou uma subclasse) que surgiu da resolução ou invocação de um método bootstrap; ou (iii) uma instância de `LinkageError` (ou uma subclasse) que surgiu porque o carregamento da classe falhou ou uma restrição do carregador foi violada. O erro deve ser lançado em um ponto do programa que (direta ou indiretamente) usa a referência simbólica.

Tentativas subsequentes de resolver a referência simbólica sempre falham com o mesmo erro que foi lançado como resultado da tentativa de resolução inicial. Se a referência simbólica for para uma constante computada dinamicamente, o método bootstrap não é reexecutado para essas tentativas subsequentes.

Como os erros que ocorrem em uma tentativa inicial de resolução são lançados novamente em tentativas subsequentes, uma classe em um módulo que tenta acessar, via resolução de uma referência simbólica em seu pool de constantes de tempo de execução, um tipo `public` não exportado em um módulo diferente sempre receberá o mesmo erro indicando um tipo inacessível ([§5.4.4](<#/doc/jvms/jvms-05>)), _mesmo que a Java SE Platform API seja usada para exportar dinamicamente o pacote do tipo `public` em algum momento após a primeira tentativa da classe_.

A resolução de uma referência simbólica não resolvida para um _call site_ computado dinamicamente prossegue de acordo com as regras dadas em [§5.4.3.6](<#/doc/jvms/jvms-05>). Então:

* Se nenhum erro ocorrer durante a resolução da referência simbólica, então a resolução é bem-sucedida _apenas para a instrução no arquivo `class` que exigiu resolução_. Esta instrução necessariamente tem um opcode de _invokedynamic_.

Tentativas subsequentes de resolver a referência simbólica _por essa instrução no arquivo `class`_ sempre são bem-sucedidas trivialmente e resultam na mesma entidade produzida pela resolução inicial. O método bootstrap não é reexecutado para essas tentativas subsequentes.

A referência simbólica ainda permanece não resolvida para todas as outras instruções no arquivo `class`, de qualquer opcode, que indicam a mesma entrada no pool de constantes de tempo de execução que a instrução _invokedynamic_ acima.

* Se um erro ocorrer durante a resolução da referência simbólica, então é (i) uma instância de `IncompatibleClassChangeError` (ou uma subclasse); (ii) uma instância de `Error` (ou uma subclasse) que surgiu da resolução ou invocação de um método bootstrap; ou (iii) uma instância de `LinkageError` (ou uma subclasse) que surgiu porque o carregamento da classe falhou ou uma restrição do carregador foi violada. O erro deve ser lançado em um ponto do programa que (direta ou indiretamente) usa a referência simbólica.

Tentativas subsequentes _pela mesma instrução no arquivo `class`_ de resolver a referência simbólica sempre falham com o mesmo erro que foi lançado como resultado da tentativa de resolução inicial. O método bootstrap não é reexecutado para essas tentativas subsequentes.

A referência simbólica ainda permanece não resolvida para todas as outras instruções no arquivo `class`, de qualquer opcode, que indicam a mesma entrada no pool de constantes de tempo de execução que a instrução _invokedynamic_ acima.

Certas das instruções acima exigem verificações de vinculação adicionais ao resolver referências simbólicas. Por exemplo, para que uma instrução _getfield_ resolva com sucesso a referência simbólica ao campo no qual ela opera, ela deve não apenas completar as etapas de resolução de campo dadas em [§5.4.3.2](<#/doc/jvms/jvms-05>), mas também verificar se o campo não é `static`. Se for um campo `static`, uma exceção de vinculação deve ser lançada.

Exceções de vinculação geradas por verificações específicas da execução de uma instrução particular da Java Virtual Machine são dadas na descrição dessa instrução e não são abordadas nesta discussão geral sobre resolução. Note que tais exceções, embora descritas como parte da execução de instruções da Java Virtual Machine em vez de resolução, ainda são consideradas falhas de resolução.

#### 5.4.3.1. Resolução de Classe e Interface

Para resolver uma referência simbólica não resolvida de D para uma classe ou interface C denotada por `N`, as seguintes etapas são realizadas:

1. O carregador definidor de D é usado para carregar e, assim, criar uma classe ou interface denotada por `N`. Esta classe ou interface é C. Os detalhes do processo são dados em [§5.3](<#/doc/jvms/jvms-05>).

Qualquer exceção que possa ser lançada como resultado de falha no carregamento e, assim, na criação de C pode, portanto, ser lançada como resultado de falha na resolução de classe e interface.

2. Se C for uma classe array e seu tipo de elemento for um tipo `reference`, então uma referência simbólica para a classe ou interface que representa o tipo de elemento é resolvida invocando o algoritmo em [§5.4.3.1](<#/doc/jvms/jvms-05>) recursivamente.

3. Finalmente, o controle de acesso é aplicado para o acesso de D a C ([§5.4.4](<#/doc/jvms/jvms-05>)).

Se as etapas 1 e 2 forem bem-sucedidas, mas a etapa 3 falhar, C ainda é válida e utilizável. No entanto, a resolução falha, e D é proibido de acessar C.

#### 5.4.3.2. Resolução de Campo

Para resolver uma referência simbólica não resolvida de D para um campo em uma classe ou interface C, a referência simbólica para C dada pela referência de campo deve primeiro ser resolvida ([§5.4.3.1](<#/doc/jvms/jvms-05>)). Portanto, qualquer exceção que possa ser lançada como resultado de falha na resolução de uma referência de classe ou interface pode ser lançada como resultado de falha na resolução de campo. Se a referência a C puder ser resolvida com sucesso, uma exceção relacionada à falha na resolução da própria referência de campo pode ser lançada.

Ao resolver uma referência de campo, a resolução de campo primeiro tenta procurar o campo referenciado em C e suas superclasses:

1. Se C declara um campo com o nome e descritor especificados pela referência de campo, a busca de campo é bem-sucedida. O campo declarado é o resultado da busca de campo.

2. Caso contrário, a busca de campo é aplicada recursivamente às superinterfaces diretas da classe ou interface C especificada.

3. Caso contrário, se C tiver uma superclasse S, a busca de campo é aplicada recursivamente a S.

4. Caso contrário, a busca de campo falha.

Então, o resultado da resolução de campo é determinado:

* Se a busca de campo falhou, a resolução de campo lança um `NoSuchFieldError`.

* Caso contrário, a busca de campo foi bem-sucedida. O controle de acesso é aplicado para o acesso de D ao campo que é o resultado da busca de campo ([§5.4.4](<#/doc/jvms/jvms-05>)). Então:

  * Se o controle de acesso falhou, a resolução de campo falha pela mesma razão.

  * Caso contrário, o controle de acesso foi bem-sucedido. Restrições de carregamento são impostas, como segue.

Seja `<`E, `L1`>` a classe ou interface na qual o campo referenciado é realmente declarado. Seja `L2` o carregador definidor de D.

Para qualquer nome de classe ou interface `N` mencionado pelo descritor do campo referenciado ([§4.3.2](<#/doc/jvms/jvms-04>)), a Java Virtual Machine impõe a restrição de carregamento `N`L1` = `N`L2` ([§5.3.4](<#/doc/jvms/jvms-05>)).

Se a imposição desta restrição resultar na violação de quaisquer restrições de carregamento, então a resolução de campo falha. Caso contrário, a resolução de campo é bem-sucedida.

#### 5.4.3.3. Resolução de Método

Para resolver uma referência simbólica não resolvida de D para um método em uma classe C, a referência simbólica para C dada pela referência de método é primeiro resolvida ([§5.4.3.1](<#/doc/jvms/jvms-05>)). Portanto, qualquer exceção que possa ser lançada como resultado de falha na resolução de uma referência de classe pode ser lançada como resultado de falha na resolução de método. Se a referência a C puder ser resolvida com sucesso, exceções relacionadas à resolução da própria referência de método podem ser lançadas.

Ao resolver uma referência de método:

1. Se C for uma interface, a resolução de método lança um `IncompatibleClassChangeError`.

2. Caso contrário, a resolução de método tenta localizar o método referenciado em C e suas superclasses:

   * Se C declara exatamente um método com o nome especificado pela referência de método, e a declaração é um método polimórfico de assinatura ([§2.9.3](<#/doc/jvms/jvms-02>)), então a busca de método é bem-sucedida. O descritor especificado pela referência de método é resolvido, como se fosse pela resolução de uma referência simbólica não resolvida para um tipo de método ([§5.4.3.5](<#/doc/jvms/jvms-05>)).

_O método resolvido é a declaração de método polimórfico de assinatura._ Não é necessário que C declare um método com o descritor especificado pela referência de método.

   * Caso contrário, se C declara um método com o nome e descritor especificados pela referência de método, a busca de método é bem-sucedida.

   * Caso contrário, se C tiver uma superclasse, a etapa 2 da resolução de método é invocada recursivamente na superclasse direta de C.

3. Caso contrário, a resolução de método tenta localizar o método referenciado nas superinterfaces da classe C especificada:

   * Se os _métodos de superinterface maximamente específicos_ de C para o nome e descritor especificados pela referência de método incluírem exatamente um método que não tenha sua flag `ACC_ABSTRACT` definida, então este método é escolhido e a busca de método é bem-sucedida.

   * Caso contrário, se qualquer superinterface de C declarar um método com o nome e descritor especificados pela referência de método que não tenha sua flag `ACC_PRIVATE` nem sua flag `ACC_STATIC` definida, um destes é arbitrariamente escolhido e a busca de método é bem-sucedida.

   * Caso contrário, a busca de método falha.

Um _método de superinterface maximamente específico_ de uma classe ou interface C para um nome e descritor de método particular é qualquer método para o qual todas as seguintes condições são verdadeiras:

* O método é declarado em uma superinterface (direta ou indireta) de C.

* O método é declarado com o nome e descritor especificados.

* O método não tem sua flag `ACC_PRIVATE` nem sua flag `ACC_STATIC` definida.

* Onde o método é declarado na interface I, não existe nenhum outro método de superinterface maximamente específico de C com o nome e descritor especificados que seja declarado em uma subinterface de I.

O resultado da resolução de método é determinado da seguinte forma:

* Se a busca de método falhou, a resolução de método lança um `NoSuchMethodError`.

* Caso contrário, a busca de método foi bem-sucedida. O controle de acesso é aplicado para o acesso de D ao método que é o resultado da busca de método ([§5.4.4](<#/doc/jvms/jvms-05>)). Então:

  * Se o controle de acesso falhou, a resolução de método falha pela mesma razão.

  * Caso contrário, o controle de acesso foi bem-sucedido. Restrições de carregamento são impostas, como segue.

Seja `<`E, `L1`>` a classe ou interface na qual o método referenciado `m` é realmente declarado. Seja `L2` o carregador definidor de D.

Para cada nome de classe ou interface `N` mencionado pelo descritor do método referenciado ([§4.3.3](<#/doc/jvms/jvms-04>)), a Java Virtual Machine impõe a restrição de carregamento `N`L1` = `N`L2` ([§5.3.4](<#/doc/jvms/jvms-05>)).

Se a imposição destas restrições resultar na violação de quaisquer restrições de carregamento, então a resolução de método falha. Caso contrário, a resolução de método é bem-sucedida.

Quando a resolução busca por um método nas superinterfaces da classe, o melhor resultado é identificar um método não-`abstract` maximamente específico. É possível que este método seja escolhido pela seleção de método, então é desejável adicionar restrições de carregador de classes para ele.

Caso contrário, o resultado é não determinístico. Isso não é novo: _The Java® Virtual Machine Specification_ nunca identificou exatamente qual método é escolhido e como os "empates" devem ser resolvidos. Antes do Java SE 8, essa era principalmente uma distinção não observável. No entanto, a partir do Java SE 8, o conjunto de métodos de interface é mais heterogêneo, então deve-se ter cuidado para evitar problemas com comportamento não determinístico. Assim:

* Métodos de superinterface que são `private` e `static` são ignorados pela resolução. Isso é consistente com a linguagem de programação Java, onde tais métodos de interface não são herdados.

* Qualquer comportamento controlado pelo método resolvido não deve depender se o método é `abstract` ou não.

Note que se o resultado da resolução for um método `abstract`, a classe C referenciada pode ser não-`abstract`. Exigir que C seja `abstract` entraria em conflito com a escolha não determinística de métodos de superinterface. Em vez disso, a resolução assume que a classe de tempo de execução do objeto invocado tem uma implementação concreta do método.

#### 5.4.3.4. Resolução de Método de Interface

Para resolver uma referência simbólica não resolvida de D para um método de interface em uma interface C, a referência simbólica para C dada pela referência de método de interface é primeiro resolvida ([§5.4.3.1](<#/doc/jvms/jvms-05>)). Portanto, qualquer exceção que possa ser lançada como resultado de falha na resolução de uma referência de interface pode ser lançada como resultado de falha na resolução de método de interface. Se a referência a C puder ser resolvida com sucesso, exceções relacionadas à resolução da própria referência de método de interface podem ser lançadas.
Ao resolver uma referência de método de interface:

1.  Se C não for uma interface, a resolução do método de interface lança um `IncompatibleClassChangeError`.
2.  Caso contrário, se C declarar um método com o nome e descritor especificados pela referência de método de interface, a busca pelo método é bem-sucedida.
3.  Caso contrário, se a classe `Object` declarar um método com o nome e descritor especificados pela referência de método de interface, que tenha sua flag `ACC_PUBLIC` definida e não tenha sua flag `ACC_STATIC` definida, a busca pelo método é bem-sucedida.
4.  Caso contrário, se os métodos de superinterface maximamente específicos ([§5.4.3.3](<#/doc/jvms/jvms-05>)) de C para o nome e descritor especificados pela referência de método de interface incluírem exatamente um método que não tenha sua flag `ACC_ABSTRACT` definida, então este método é escolhido e a busca pelo método é bem-sucedida.
5.  Caso contrário, se qualquer superinterface de C declarar um método com o nome e descritor especificados pela referência de método que não tenha sua flag `ACC_PRIVATE` nem sua flag `ACC_STATIC` definidas, um destes é arbitrariamente escolhido e a busca pelo método é bem-sucedida.
6.  Caso contrário, a busca pelo método falha.

O resultado da resolução de método de interface é determinado da seguinte forma:

*   Se a busca pelo método falhou, a resolução do método de interface lança um `NoSuchMethodError`.
*   Caso contrário, a busca pelo método foi bem-sucedida. O controle de acesso é aplicado para o acesso de D ao método que é o resultado da busca pelo método ([§5.4.4](<#/doc/jvms/jvms-05>)). Então:
    *   Se o controle de acesso falhou, a resolução do método de interface falha pela mesma razão.
    *   Caso contrário, o controle de acesso foi bem-sucedido. Restrições de carregamento são impostas, da seguinte forma.

Seja `<`E, `L1`>` a classe ou interface na qual o método de interface referenciado `m` é realmente declarado. Seja `L2` o carregador definidor de D.

Para cada nome de classe ou interface `N` mencionado pelo descritor do método referenciado ([§4.3.3](<#/doc/jvms/jvms-04>)), a Java Virtual Machine impõe a restrição de carregamento `N`L1` = `N`L2` ([§5.3.4](<#/doc/jvms/jvms-05>)).

Se a imposição dessas restrições resultar na violação de quaisquer restrições de carregamento, então a resolução do método de interface falha. Caso contrário, a resolução do método de interface é bem-sucedida.

O controle de acesso é necessário porque a resolução de método de interface pode escolher um método `private` da interface C. (Antes do Java SE 8, o resultado da resolução de método de interface poderia ser um método não-`public` da classe `Object` ou um método `static` da classe `Object`; tais resultados não eram consistentes com o modelo de herança da linguagem de programação Java, e são proibidos no Java SE 8 e versões posteriores.)

#### 5.4.3.5. Resolução de Tipo de Método e Method Handle

Para resolver uma referência simbólica não resolvida a um tipo de método, é como se a resolução ocorresse de referências simbólicas não resolvidas às classes e interfaces ([§5.4.3.1](<#/doc/jvms/jvms-05>)) cujos nomes são mencionados pelo descritor do método ([§4.3.3](<#/doc/jvms/jvms-04>)), na ordem em que são mencionados.

Qualquer exceção que possa ser lançada como resultado de uma falha na resolução de uma referência a uma classe ou interface pode, portanto, ser lançada como resultado de uma falha na resolução de tipo de método.

O resultado da resolução bem-sucedida de tipo de método é uma `reference` a uma instância de `java.lang.invoke.MethodType` que representa o descritor do método.

A resolução de tipo de método ocorre independentemente de o pool de constantes em tempo de execução realmente conter referências simbólicas a classes e interfaces indicadas no descritor do método. Além disso, a resolução é considerada como ocorrendo em referências simbólicas _não resolvidas_, de modo que uma falha ao resolver um tipo de método não levará necessariamente a uma falha posterior ao resolver outro tipo de método com o mesmo descritor de método textual, se classes e interfaces adequadas puderem ser carregadas posteriormente.

A resolução de uma referência simbólica não resolvida a um method handle é mais complicada. Cada method handle resolvido pela Java Virtual Machine possui uma sequência de instruções equivalente chamada seu _comportamento de bytecode_, indicada pelo _tipo_ do method handle. Os valores inteiros e as descrições dos nove tipos de method handle são fornecidos na [Tabela 5.4.3.5-A](<#/doc/jvms/jvms-05>).

Referências simbólicas por uma sequência de instruções a campos ou métodos são indicadas por `C.x:T`, onde `x` e `T` são o nome e o descritor ([§4.3.2](<#/doc/jvms/jvms-04>), [§4.3.3](<#/doc/jvms/jvms-04>)) do campo ou método, e `C` é a classe ou interface na qual o campo ou método deve ser encontrado.

**Tabela 5.4.3.5-A. Comportamentos de Bytecode para Method Handles**

Kind | Descrição | Interpretação
---|---|---
1 | `REF_getField` | `getfield C.f:T`
2 | `REF_getStatic` | `getstatic C.f:T`
3 | `REF_putField` | `putfield C.f:T`
4 | `REF_putStatic` | `putstatic C.f:T`
5 | `REF_invokeVirtual` | `invokevirtual C.m:(A*)T`
6 | `REF_invokeStatic` | `invokestatic C.m:(A*)T`
7 | `REF_invokeSpecial` | `invokespecial C.m:(A*)T`
8 | `REF_newInvokeSpecial` | `new C; dup; invokespecial C.`&lt;init&gt;`:(A*)V`
9 | `REF_invokeInterface` | `invokeinterface C.m:(A*)T`

Seja `MH` a referência simbólica a um method handle ([§5.1](<#/doc/jvms/jvms-05>)) sendo resolvida. Além disso:

*   Seja R a referência simbólica a um campo ou método dada por `MH`.

Por exemplo, R é uma referência simbólica a C `.` `f` para o comportamento de bytecode do tipo 1, e uma referência simbólica a C `.` `<init>` para o comportamento de bytecode do tipo 8.

*   Seja C a classe, interface ou tipo de array referenciado por R.
*   Seja T o tipo dado pelo descritor de campo de R, ou o tipo de retorno dado pelo descritor de método de R. Seja A* a sequência (talvez vazia) de tipos de parâmetros dados pelo descritor de método de R.

Para resolver `MH`, todas as referências simbólicas a classes, interfaces, campos e métodos no comportamento de bytecode de `MH` são resolvidas, usando os três passos seguintes:

1.  R é resolvido. Isso ocorre como se por resolução de campo ([§5.4.3.2](<#/doc/jvms/jvms-05>)) quando o comportamento de bytecode de `MH` é do tipo 1, 2, 3 ou 4, e como se por resolução de método ([§5.4.3.3](<#/doc/jvms/jvms-05>)) quando o comportamento de bytecode de `MH` é do tipo 5, 6, 7 ou 8, e como se por resolução de método de interface ([§5.4.3.4](<#/doc/jvms/jvms-05>)) quando o comportamento de bytecode de `MH` é do tipo 9.
2.  As seguintes restrições se aplicam ao resultado da resolução de R. Essas restrições correspondem àquelas que seriam impostas durante a verificação ou execução da sequência de instruções para o comportamento de bytecode relevante.
    *   Se o comportamento de bytecode de `MH` for do tipo 7 (`REF_invokeSpecial`), então C deve ser a classe ou interface atual, uma superclasse da classe atual, uma superinterface direta da classe ou interface atual, ou `Object`.
    *   Se o comportamento de bytecode de `MH` for do tipo 8 (`REF_newInvokeSpecial`), então R deve ser resolvido para um método de inicialização de instância declarado na classe C.
    *   Se R for resolvido para um membro `protected`, então as seguintes regras se aplicam dependendo do tipo do comportamento de bytecode de `MH`:
        *   Para os tipos 1, 3 e 5 (`REF_getField`, `REF_putField` e `REF_invokeVirtual`): Se `C.f` ou `C.m` foram resolvidos para um campo ou método `protected`, e C está em um pacote de tempo de execução diferente da classe atual, então C deve ser uma subclasse da classe atual.
        *   Para o tipo 8 (`REF_newInvokeSpecial`): Se C `.` `<init>` foi resolvido para um método `protected`, então C deve ser declarado no mesmo pacote de tempo de execução que a classe atual.
    *   R deve ser resolvido para um membro `static` ou não-`static` dependendo do tipo do comportamento de bytecode de `MH`:
        *   Para os tipos 1, 3, 5, 7 e 9 (`REF_getField`, `REF_putField`, `REF_invokeVirtual`, `REF_invokeSpecial` e `REF_invokeInterface`): `C.f` ou `C.m` devem ser resolvidos para um campo ou método não-`static`.
        *   Para os tipos 2, 4 e 6 (`REF_getStatic`, `REF_putStatic` e `REF_invokeStatic`): `C.f` ou `C.m` devem ser resolvidos para um campo ou método `static`.
3.  Uma referência a uma instância de `java.lang.invoke.MethodType` é obtida como se por resolução de uma referência simbólica não resolvida a um tipo de método que contém o descritor de método especificado na [Tabela 5.4.3.5-B](<#/doc/jvms/jvms-05>) para o tipo de `MH`.

É como se a referência simbólica a um method handle contivesse uma referência simbólica ao tipo de método que o method handle resolvido eventualmente terá. A estrutura detalhada do tipo de método é obtida inspecionando a [Tabela 5.4.3.5-B](<#/doc/jvms/jvms-05>).

**Tabela 5.4.3.5-B. Descritores de Método para Method Handles**

Kind | Descrição | Descritor de método
---|---|---
1 | `REF_getField` | `(C)T`
2 | `REF_getStatic` | `()T`
3 | `REF_putField` | `(C,T)V`
4 | `REF_putStatic` | `(T)V`
5 | `REF_invokeVirtual` | `(C,A*)T`
6 | `REF_invokeStatic` | `(A*)T`
7 | `REF_invokeSpecial` | `(C,A*)T`
8 | `REF_newInvokeSpecial` | `(A*)C`
9 | `REF_invokeInterface` | `(C,A*)T`

Nos passos 1 e 3, qualquer exceção que possa ser lançada como resultado de uma falha na resolução de uma referência simbólica a uma classe, interface, campo ou método pode ser lançada como resultado de uma falha na resolução de method handle. No passo 2, qualquer falha devido às restrições especificadas causa uma falha na resolução de method handle devido a um `IllegalAccessError`.

A intenção é que a resolução de um method handle possa ser feita exatamente nas mesmas circunstâncias em que a Java Virtual Machine verificaria e resolveria com sucesso as referências simbólicas no comportamento de bytecode. Em particular, method handles para membros `private`, `protected` e `static` podem ser criados exatamente naquelas classes para as quais os acessos normais correspondentes são legais.

O resultado da resolução bem-sucedida de method handle é uma `reference` a uma instância de `java.lang.invoke.MethodHandle` que representa o method handle `MH`.

O descritor de tipo desta instância de `java.lang.invoke.MethodHandle` é a instância de `java.lang.invoke.MethodType` produzida no terceiro passo da resolução de method handle acima.

O descritor de tipo de um method handle é tal que uma chamada válida a `invokeExact` em `java.lang.invoke.MethodHandle` no method handle tem exatamente os mesmos efeitos de pilha que o comportamento de bytecode. Chamar este method handle com um conjunto válido de argumentos tem exatamente o mesmo efeito e retorna o mesmo resultado (se houver) que o comportamento de bytecode correspondente.

Se o método referenciado por R tiver a flag `ACC_VARARGS` definida ([§4.6](<#/doc/jvms/jvms-04>)), então a instância de `java.lang.invoke.MethodHandle` é um method handle de aridade variável; caso contrário, é um method handle de aridade fixa.

Um method handle de aridade variável realiza o boxing da lista de argumentos (JLS §15.12.4.2) quando invocado via `invoke`, enquanto seu comportamento em relação a `invokeExact` é como se a flag `ACC_VARARGS` não estivesse definida.

A resolução de method handle lança um `IncompatibleClassChangeError` se o método referenciado por R tiver a flag `ACC_VARARGS` definida e A* for uma sequência vazia ou o último tipo de parâmetro em A* não for um tipo de array. Ou seja, a criação de um method handle de aridade variável falha.

Uma implementação da Java Virtual Machine não é obrigada a internar tipos de método ou method handles. Ou seja, duas referências simbólicas distintas a tipos de método ou method handles que são estruturalmente idênticas podem não ser resolvidas para a mesma instância de `java.lang.invoke.MethodType` ou `java.lang.invoke.MethodHandle`, respectivamente.

A classe `java.lang.invoke.MethodHandles` na API da Plataforma Java SE permite a criação de method handles sem comportamento de bytecode. Seu comportamento é definido pelo método de `java.lang.invoke.MethodHandles` que os cria. Por exemplo, um method handle pode, quando invocado, primeiro aplicar transformações aos seus valores de argumento, depois fornecer os valores transformados para a invocação de outro method handle, depois aplicar uma transformação ao valor retornado dessa invocação, e então retornar o valor transformado como seu próprio resultado.

#### 5.4.3.6. Resolução de Constante Computada Dinamicamente e Call Site

Para resolver uma referência simbólica não resolvida R a uma constante computada dinamicamente ou a um call site, há três tarefas. Primeiro, R é examinado para determinar qual código servirá como seu _método bootstrap_, e quais argumentos serão passados para esse código. Segundo, os argumentos são empacotados em um array e o método bootstrap é invocado. Terceiro, o resultado do método bootstrap é validado e usado como resultado da resolução.

A primeira tarefa envolve os seguintes passos:

1.  R fornece uma referência simbólica a um _method handle bootstrap_. O method handle bootstrap é resolvido ([§5.4.3.5](<#/doc/jvms/jvms-05>)) para obter uma `reference` a uma instância de `java.lang.invoke.MethodHandle`.

Qualquer exceção que possa ser lançada como resultado de uma falha na resolução de uma referência simbólica a um method handle pode ser lançada neste passo.

Se R for uma referência simbólica a uma constante computada dinamicamente, então seja D o descritor de tipo do method handle bootstrap. (Ou seja, D é uma `reference` a uma instância de `java.lang.invoke.MethodType`.) O primeiro tipo de parâmetro indicado por D deve ser `java.lang.invoke.MethodHandles.Lookup`, ou então a resolução falha com um `BootstrapMethodError`. Por razões históricas, o method handle bootstrap para um call site computado dinamicamente não é restrito de forma semelhante.

2.  Se R for uma referência simbólica a uma constante computada dinamicamente, então ela fornece um descritor de campo.

Se o descritor de campo indicar um tipo primitivo, então uma `reference` ao objeto `Class` pré-definido que representa esse tipo é obtida (veja o método `isPrimitive` na classe `Class`).

Caso contrário, o descritor de campo indica um tipo de classe ou interface, ou um tipo de array. Uma `reference` ao objeto `Class` que representa o tipo indicado pelo descritor de campo é obtida, como se por resolução de uma referência simbólica não resolvida a uma classe ou interface ([§5.4.3.1](<#/doc/jvms/jvms-05>)) cujo nome corresponde ao tipo indicado pelo descritor de campo.

Qualquer exceção que possa ser lançada como resultado de uma falha na resolução de uma referência simbólica a uma classe ou interface pode ser lançada neste passo.

3.  Se R for uma referência simbólica a um call site computado dinamicamente, então ela fornece um descritor de método.

Uma `reference` a uma instância de `java.lang.invoke.MethodType` é obtida, como se por resolução de uma referência simbólica não resolvida a um tipo de método ([§5.4.3.5](<#/doc/jvms/jvms-05>)) com os mesmos tipos de parâmetro e retorno que o descritor de método.

Qualquer exceção que possa ser lançada como resultado de uma falha na resolução de uma referência simbólica a um tipo de método pode ser lançada neste passo.

4.  R fornece zero ou mais _argumentos estáticos_, que comunicam metadados específicos da aplicação ao método bootstrap. Cada argumento estático A é resolvido, na ordem dada por R, da seguinte forma:

    *   Se A for uma constante de string, então uma `reference` à sua instância da classe `String` é obtida.
    *   Se A for uma constante numérica, então uma `reference` a um objeto que representa o número é obtida pelo seguinte procedimento:
        1.  Seja `v` o valor da constante numérica, e seja T um descritor de campo que corresponde ao tipo da constante numérica.
        2.  Seja `MH` um method handle produzido como se por invocação do método `identity` de `java.lang.invoke.MethodHandles` com um argumento representando a classe `Object`.
        3.  Uma `reference` a um objeto é obtida como se pela invocação `MH.invoke(v)` com o descritor de método `(T)Ljava/lang/Object;`.
    *   Se A for uma referência simbólica a uma constante computada dinamicamente com um descritor de campo indicando um tipo primitivo T, então A é resolvido, produzindo um valor primitivo `v`. Dados `v` e T, uma `reference` é obtida para um objeto que codifica `v` de acordo com o procedimento especificado acima para constantes numéricas.
    *   Se A for qualquer outro tipo de referência simbólica, então o resultado é o resultado da resolução de A.

Entre as referências simbólicas no pool de constantes em tempo de execução, as referências simbólicas a constantes computadas dinamicamente são especiais porque são derivadas de entradas de `constant_pool` que podem se referir sintaticamente a si mesmas através do atributo `BootstrapMethods` ([§4.7.23](<#/doc/jvms/jvms-04>)). No entanto, a Java Virtual Machine não suporta a resolução de uma referência simbólica a uma constante computada dinamicamente que dependa de si mesma (ou seja, como um argumento estático para seu próprio método bootstrap). Consequentemente, quando R e A são referências simbólicas a constantes computadas dinamicamente, se A for o mesmo que R ou A fornecer um argumento estático que (direta ou indiretamente) referencia R, então a resolução falha com um `StackOverflowError` no ponto onde a re-resolução de R seria necessária.

Ao contrário da inicialização de classes ([§5.5](<#/doc/jvms/jvms-05>)), onde ciclos são permitidos entre classes não inicializadas, a resolução não permite ciclos em referências simbólicas a constantes computadas dinamicamente. Se uma implementação de resolução fizer uso recursivo de uma pilha, então um `StackOverflowError` ocorrerá naturalmente. Caso contrário, a implementação é obrigada a detectar o ciclo em vez de, por exemplo, entrar em loop infinito ou retornar um valor padrão para a constante computada dinamicamente.

Um ciclo semelhante pode surgir se o corpo de um método bootstrap fizer referência a uma constante computada dinamicamente que está sendo resolvida. Isso sempre foi possível para bootstraps _invokedynamic_, e não requer tratamento especial na resolução; as chamadas recursivas de `invokeWithArguments` levarão naturalmente a um `StackOverflowError`.

Qualquer exceção que possa ser lançada como resultado de uma falha na resolução de uma referência simbólica pode ser lançada neste passo.

A segunda tarefa, invocar o method handle bootstrap, envolve os seguintes passos:

1.  Um array é alocado com tipo de componente `Object` e comprimento _n_ +3, onde _n_ é o número de argumentos estáticos dados por R (_n_ ≥ 0).

O componente zero do array é definido como uma `reference` a uma instância de `java.lang.invoke.MethodHandles.Lookup` para a classe na qual R ocorre, produzida como se por invocação do método `lookup` de `java.lang.invoke.MethodHandles`.

O primeiro componente do array é definido como uma `reference` a uma instância de `String` que denota `N`, o nome não qualificado dado por R.

O segundo componente do array é definido como a `reference` a uma instância de `Class` ou `java.lang.invoke.MethodType` que foi obtida anteriormente para o descritor de campo ou descritor de método dado por R.

Componentes subsequentes do array são definidos como as `reference`s que foram obtidas anteriormente da resolução dos argumentos estáticos de R, se houver. As `reference`s aparecem no array na mesma ordem em que os argumentos estáticos correspondentes são dados por R.

Uma implementação da Java Virtual Machine pode ser capaz de pular a alocação do array e, sem qualquer mudança no comportamento observável, passar os argumentos diretamente para o método bootstrap.

2.  O method handle bootstrap é invocado, como se pela invocação `BMH.invokeWithArguments(args)`, onde `BMH` é o method handle bootstrap e `args` é o array alocado acima.

Devido ao comportamento do método `invokeWithArguments` de `java.lang.invoke.MethodHandle`, o descritor de tipo do method handle bootstrap não precisa corresponder exatamente aos tipos em tempo de execução dos argumentos. Por exemplo, o segundo tipo de parâmetro do method handle bootstrap (correspondendo ao nome não qualificado dado no primeiro componente do array acima) poderia ser `Object` em vez de `String`. Se o method handle bootstrap for de aridade variável, então alguns ou todos os argumentos podem ser coletados em um parâmetro de array final.

A invocação ocorre dentro de um thread que está tentando a resolução desta referência simbólica. Se houver vários desses threads, o method handle bootstrap pode ser invocado concorrentemente. Métodos bootstrap que acessam dados globais da aplicação devem tomar as precauções usuais contra condições de corrida.

Se a invocação falhar lançando uma instância de `Error` ou uma subclasse de `Error`, a resolução falha com essa exceção.

Se a invocação falhar lançando uma exceção que não é uma instância de `Error` ou uma subclasse de `Error`, a resolução falha com um `BootstrapMethodError` cuja causa é a exceção lançada.

Se vários threads invocarem concorrentemente o method handle bootstrap para esta referência simbólica, a Java Virtual Machine escolhe o resultado de uma invocação e o instala visivelmente para todos os threads. Quaisquer outros métodos bootstrap em execução para esta referência simbólica podem ser concluídos, mas seus resultados são ignorados.

A terceira tarefa, validar a `reference`, `o`, produzida pela invocação do method handle bootstrap, é a seguinte:

*   Se R for uma referência simbólica a uma constante computada dinamicamente, então `o` é convertido para o tipo T, o tipo indicado pelo descritor de campo dado por R.

A conversão de `o` ocorre como se pela invocação `MH.invoke(o)` com o descritor de método `(Ljava/lang/Object;)T`, onde `MH` é um method handle produzido como se por invocação do método `identity` de `java.lang.invoke.MethodHandles` com um argumento representando a classe `Object`.

O resultado da conversão de `o` é o resultado da resolução.

Se a conversão falhar lançando uma `NullPointerException` ou uma `ClassCastException`, a resolução falha com um `BootstrapMethodError`.

*   Se R for uma referência simbólica a um call site computado dinamicamente, então `o` é o resultado da resolução se possuir todas as seguintes propriedades:
    *   `o` não é `null`.
    *   `o` é uma instância de `java.lang.invoke.CallSite` ou uma subclasse de `java.lang.invoke.CallSite`.
    *   O tipo do `java.lang.invoke.CallSite` é semanticamente igual ao descritor de método dado por R.

Se `o` não possuir essas propriedades, a resolução falha com um `BootstrapMethodError`.

Muitos dos passos acima realizam computações "como se por invocação" de certos métodos. Em cada caso, o comportamento de invocação é dado em detalhes pelas especificações para _invokestatic_ e _invokevirtual_. A invocação ocorre no thread e da classe que está tentando a resolução da referência simbólica R. No entanto, nenhuma referência de método correspondente é exigida para aparecer no pool de constantes em tempo de execução, nenhuma pilha de operandos de método particular é necessariamente usada, e o valor do item `max_stack` do atributo `Code` de qualquer método não é imposto para a invocação.

### 5.4.4. Controle de Acesso

O controle de acesso é aplicado durante a resolução ([§5.4.3](<#/doc/jvms/jvms-05>)) para garantir que uma referência a uma classe, interface, campo ou método seja permitida. O controle de acesso é bem-sucedido se uma classe, interface, campo ou método especificado for _acessível_ à classe ou interface de referência.

Uma classe ou interface C é acessível a uma classe ou interface D se e somente se uma das seguintes condições for verdadeira:

*   C é `public`, e um membro do mesmo módulo de tempo de execução que D ([§5.3.6](<#/doc/jvms/jvms-05>)).
*   C é `public`, e um membro de um módulo de tempo de execução diferente de D, e o módulo de tempo de execução de C é lido pelo módulo de tempo de execução de D, e o módulo de tempo de execução de C exporta o pacote de tempo de execução de C para o módulo de tempo de execução de D.
*   C não é `public`, e C e D são membros do mesmo pacote de tempo de execução.

Se C não for acessível a D, então o controle de acesso lança um `IllegalAccessError`. Caso contrário, o controle de acesso é bem-sucedido.

Um campo ou método R é acessível a uma classe ou interface D se e somente se qualquer uma das seguintes condições for verdadeira:

*   R é `public`.
*   R é `protected` e é declarado em uma classe C, e D é uma subclasse de C ou a própria C.

Além disso, se R não for `static`, então a referência simbólica a R deve conter uma referência simbólica a uma classe T, de modo que T seja uma subclasse de D, uma superclasse de D, ou a própria D.

Durante a verificação de D, foi exigido que, mesmo que T seja uma superclasse de D, a referência de destino de um acesso a campo `protected` ou invocação de método deve ser uma instância de D ou uma subclasse de D ([§4.10.1.8](<#/doc/jvms/jvms-04>)).

*   R é `protected` ou tem acesso padrão (ou seja, nem `public` nem `protected` nem `private`), e é declarado por uma classe no mesmo pacote de tempo de execução que D.
*   R é `private` e é declarado por uma classe ou interface C que pertence ao mesmo nest que D, de acordo com o teste de nestmate abaixo.

Se R não for acessível a D, então o controle de acesso lança um `IllegalAccessError`. Caso contrário, o controle de acesso é bem-sucedido.

Um _nest_ é um conjunto de classes e interfaces que permitem acesso mútuo aos seus membros `private`. Uma das classes ou interfaces é o _nest host_. Ele enumera as classes e interfaces que pertencem ao nest, usando o atributo `NestMembers` ([§4.7.29](<#/doc/jvms/jvms-04>)). Cada uma delas, por sua vez, o designa como o nest host, usando o atributo `NestHost` ([§4.7.28](<#/doc/jvms/jvms-04>)). Uma classe ou interface que não possui um atributo `NestHost` pertence ao nest hospedado por si mesma; se também não possuir um atributo `NestMembers`, então este nest é um singleton consistindo apenas da própria classe ou interface.

A Java Virtual Machine determina o nest ao qual uma dada classe ou interface pertence (ou seja, o nest host designado pela classe ou interface) como parte do controle de acesso, em vez de quando a classe ou interface é carregada. Certos métodos da API da Plataforma Java SE podem determinar o nest ao qual uma dada classe ou interface pertence antes do controle de acesso, caso em que a Java Virtual Machine respeita essa determinação prévia durante o controle de acesso.

Para determinar se uma classe ou interface C pertence ao mesmo nest que uma classe ou interface D, o _teste de nestmate_ é aplicado. C e D pertencem ao mesmo nest se e somente se o teste de nestmate for bem-sucedido. O teste de nestmate é o seguinte:

*   Se C e D forem a mesma classe ou interface, então o teste de nestmate é bem-sucedido.
*   Caso contrário, os seguintes passos são realizados, em ordem:
    1.  Seja H o nest host de D, se o nest host de D tiver sido determinado anteriormente. Se o nest host de D _não_ tiver sido determinado anteriormente, então ele é determinado usando o algoritmo abaixo, resultando em H.
    2.  Seja H' o nest host de C, se o nest host de C tiver sido determinado anteriormente. Se o nest host de C _não_ tiver sido determinado anteriormente, então ele é determinado usando o algoritmo abaixo, resultando em H'.
    3.  H e H' são comparados. Se H e H' forem a mesma classe ou interface, então o teste de nestmate é bem-sucedido. Caso contrário, o teste de nestmate falha.

O nest host de uma classe ou interface `M` é determinado da seguinte forma:

*   Se `M` não possuir um atributo `NestHost`, então `M` é seu próprio nest host.
*   Caso contrário, `M` possui um atributo `NestHost`, e seu item `host_class_index` é usado como um índice no pool de constantes em tempo de execução de `M`. A referência simbólica nesse índice é resolvida ([§5.4.3.1](<#/doc/jvms/jvms-05>)).

Se a resolução da referência simbólica falhar, então `M` é seu próprio nest host. Qualquer exceção lançada como resultado de falha na resolução de classe ou interface _não_ é relançada.

Caso contrário, a resolução da referência simbólica é bem-sucedida. Seja H a classe ou interface resolvida. O nest host de `M` é determinado pelas seguintes regras:

*   Se qualquer uma das seguintes condições for verdadeira, então `M` é seu próprio nest host:
    *   H não está no mesmo pacote de tempo de execução que `M`.
    *   H não possui um atributo `NestMembers`.
    *   H possui um atributo `NestMembers`, mas não há nenhuma entrada em seu array `classes` que se refira a uma classe ou interface com o nome `N`, onde `N` é o nome de `M`.
*   Caso contrário, H é o nest host de `M`.

### 5.4.5. Sobrescrita de Método

Um método de instância `mC` _pode sobrescrever_ outro método de instância `mA` se e somente se todas as seguintes condições forem verdadeiras:

*   `mC` tem o mesmo nome e descritor que `mA`.
*   `mC` não está marcado como `ACC_PRIVATE`.
*   Uma das seguintes condições é verdadeira:
    *   `mA` está marcado como `ACC_PUBLIC`.
    *   `mA` está marcado como `ACC_PROTECTED`.
    *   `mA` não está marcado como `ACC_PUBLIC` nem `ACC_PROTECTED` nem `ACC_PRIVATE`, e (a) a declaração de `mA` aparece no mesmo pacote de tempo de execução que a declaração de `mC`, ou (b) se `mA` é declarado em uma classe A e `mC` é declarado em uma classe C, então existe um método `mB` declarado em uma classe B tal que C é uma subclasse de B e B é uma subclasse de A e `mC` pode sobrescrever `mB` e `mB` pode sobrescrever `mA`.

A parte (b) do caso final permite a "sobrescrita transitiva" de métodos com acesso padrão. Por exemplo, dadas as seguintes declarações de classe em um pacote P:
```java
    public class A           {        void m() {} }
    public class B extends A { public void m() {} }
    public class C extends B {        void m() {} }
    
```

e a seguinte declaração de classe em um pacote diferente:
```java
    public class D extends P.C { void m() {} }
    
```

então:

*   `B.m` pode sobrescrever `A.m`.
*   `C.m` pode sobrescrever `B.m` e `A.m`.
*   `D.m` pode sobrescrever `B.m` e, transitivamente, `A.m`, mas não pode sobrescrever `C.m`.

### 5.4.6. Seleção de Método

Durante a execução de uma instrução _invokeinterface_ ou _invokevirtual_, um método é _selecionado_ em relação a (i) o tipo em tempo de execução do objeto na pilha, e (ii) um método que foi previamente _resolvido_ pela instrução. As regras para selecionar um método em relação a uma classe ou interface C e um método `mR` são as seguintes:

1.  Se `mR` estiver marcado como `ACC_PRIVATE`, então ele é o método selecionado.
2.  Caso contrário, o método selecionado é determinado pelo seguinte procedimento de busca:
    *   Se C contiver uma declaração de um método de instância `m` que pode sobrescrever `mR` ([§5.4.5](<#/doc/jvms/jvms-05>)), então `m` é o método selecionado.
    *   Caso contrário, se C tiver uma superclasse, uma busca por uma declaração de um método de instância que pode sobrescrever `mR` é realizada, começando com a superclasse direta de C e continuando com a superclasse direta dessa classe, e assim por diante, até que um método seja encontrado ou não existam mais superclasses. Se um método for encontrado, ele é o método selecionado.
    *   Caso contrário, os métodos de superinterface maximamente específicos de C são determinados ([§5.4.3.3](<#/doc/jvms/jvms-05>)). Se exatamente um corresponder ao nome e descritor de `mR` e não for `abstract`, então ele é o método selecionado.

Qualquer método de superinterface maximamente específico selecionado neste passo pode sobrescrever `mR`; não há necessidade de verificar isso explicitamente.

Embora C seja tipicamente uma classe, pode ser uma interface quando estas regras são aplicadas durante a preparação ([§5.4.2](<#/doc/jvms/jvms-05>)).
## 5.5. Inicialização

A _inicialização_ de uma classe ou interface envolve a atribuição de quaisquer valores de atributo `ConstantValue` aos seus campos `static` e a execução de qualquer método de inicialização de classe ou interface declarado ([§2.9.2](<#/doc/jvms/jvms-02>)).

Uma classe ou interface C pode ser inicializada apenas como resultado de:

*   A execução de qualquer uma das instruções da Java Virtual Machine _new_ , _getstatic_ , _putstatic_ , ou _invokestatic_ que referencia C ([§ _new_](<#/doc/jvms/jvms-06>), [§ _getstatic_](<#/doc/jvms/jvms-06>), [§ _putstatic_](<#/doc/jvms/jvms-06>), [§ _invokestatic_](<#/doc/jvms/jvms-06>)).

Após a execução de uma instrução _new_ , a classe a ser inicializada é a classe referenciada pela instrução.

Após a execução de uma instrução _getstatic_ , _putstatic_ , ou _invokestatic_ , a classe ou interface a ser inicializada é a classe ou interface que declara o campo ou método resolvido.

*   A primeira invocação de uma instância de `java.lang.invoke.MethodHandle` que foi o resultado da resolução de method handle ([§5.4.3.5](<#/doc/jvms/jvms-05>)) para um method handle do tipo 2 (`REF_getStatic`), 4 (`REF_putStatic`), 6 (`REF_invokeStatic`), ou 8 (`REF_newInvokeSpecial`).

Isso implica que a classe de um método bootstrap é inicializada quando o método bootstrap é invocado para uma instrução _invokedynamic_ ([§ _invokedynamic_](<#/doc/jvms/jvms-06>)), como parte da resolução contínua do especificador do call site.

*   Invocação de certos métodos reflexivos na biblioteca de classes ([§2.12](<#/doc/jvms/jvms-02>)), por exemplo, na classe `Class` ou no pacote `java.lang.reflect`.

*   Se C é uma classe, a inicialização de uma de suas subclasses.

*   Se C é uma interface que declara um método não-`abstract`, não-`static`, a inicialização de uma classe que implementa C direta ou indiretamente.

*   Sua designação como a classe ou interface inicial na inicialização da Java Virtual Machine ([§5.2](<#/doc/jvms/jvms-05>)).

Antes da inicialização, uma classe ou interface deve ser ligada (linked), ou seja, verificada, preparada e opcionalmente resolvida.

Como a Java Virtual Machine é multithreaded, a inicialização de uma classe ou interface requer sincronização cuidadosa, já que alguma outra thread pode estar tentando inicializar a mesma classe ou interface ao mesmo tempo. Há também a possibilidade de que a inicialização de uma classe ou interface possa ser solicitada recursivamente como parte da inicialização dessa classe ou interface. A implementação da Java Virtual Machine é responsável por cuidar da sincronização e da inicialização recursiva usando o seguinte procedimento. Ela assume que a classe ou interface já foi verificada e preparada, e que a classe ou interface contém um estado que indica uma das quatro situações:

*   Esta classe ou interface é verificada e preparada, mas não inicializada.

*   Esta classe ou interface está sendo inicializada por alguma thread específica.

*   Esta classe ou interface está totalmente inicializada e pronta para uso.

*   Esta classe ou interface está em um estado errôneo, talvez porque a inicialização foi tentada e falhou.

A forma precisa do estado de inicialização é deixada a critério da implementação da JVM.

Para cada classe ou interface C, existe um lock de inicialização único `LC`. O mapeamento de C para `LC` também é deixado a critério da implementação da Java Virtual Machine. Por exemplo, `LC` poderia ser o objeto `Class` para C, ou o monitor associado a esse objeto `Class`. O procedimento para inicializar C é então o seguinte:

1.  Sincronize no lock de inicialização, `LC`, para C. Isso envolve esperar até que a thread atual possa adquirir `LC`.

2.  Se o estado de inicialização de C indica que a inicialização está em andamento para C por alguma outra thread, então libere `LC` e bloqueie a thread atual até ser informada de que a inicialização em andamento foi concluída, momento em que este procedimento é repetido.

O status de interrupção da thread não é afetado pela execução do procedimento de inicialização.

3.  Se o estado de inicialização de C indica que a inicialização está em andamento para C pela thread atual, então isso deve ser uma solicitação recursiva de inicialização. Libere `LC` e complete normalmente.

4.  Se o estado de inicialização de C indica que C já foi inicializada, nenhuma ação adicional é necessária. Libere `LC` e complete normalmente.

5.  Se o estado de inicialização de C está em um estado errôneo, então a inicialização não é possível. Libere `LC` e lance uma `NoClassDefFoundError`.

6.  Caso contrário, registre o fato de que a inicialização de C está em andamento pela thread atual e libere `LC`.

Em seguida, inicialize cada campo `static` de C com o valor constante em seu atributo `ConstantValue` ([§4.7.2](<#/doc/jvms/jvms-04>)), na ordem em que os campos aparecem na estrutura `ClassFile`.

7.  Em seguida, se C é uma classe em vez de uma interface, então seja SC sua superclasse e sejam SI1, ..., SIn todas as superinterfaces de C (diretas ou indiretas) que declaram pelo menos um método não-`abstract`, não-`static`. A ordem das superinterfaces é dada por uma enumeração recursiva sobre a hierarquia de superinterfaces de cada interface diretamente implementada por C. Para cada interface I diretamente implementada por C (na ordem do array `interfaces` de C), a enumeração recursiva ocorre nas superinterfaces de I (na ordem do array `interfaces` de I) antes de retornar I.

Para cada S na lista [ SC, SI1, ..., SIn ], se S ainda não foi inicializada, então execute recursivamente todo este procedimento para S. Se necessário, verifique e prepare S primeiro.

Se a inicialização de S for concluída abruptamente devido a uma exceção lançada, então adquira `LC`, rotule C como errônea, notifique todas as threads em espera, libere `LC` e complete abruptamente, lançando a mesma exceção que resultou da inicialização de S.

8.  Em seguida, determine se as asserções estão habilitadas para C consultando seu carregador definidor.

9.  Em seguida, se C declara um método de inicialização de classe ou interface, execute esse método.

10. Se a execução do método de inicialização de classe ou interface for concluída normalmente, ou se C não declarar nenhum método de inicialização de classe ou interface, então adquira `LC`, rotule C como totalmente inicializada, notifique todas as threads em espera, libere `LC` e complete este procedimento normalmente.

11. Caso contrário, o método de inicialização de classe ou interface deve ter sido concluído abruptamente lançando alguma exceção E. Se a classe de E não for `Error` ou uma de suas subclasses, então crie uma nova instância da classe `ExceptionInInitializerError` com E como argumento, e use este objeto no lugar de E na etapa seguinte. Se uma nova instância de `ExceptionInInitializerError` não puder ser criada porque ocorre uma `OutOfMemoryError`, então use um objeto `OutOfMemoryError` no lugar de E na etapa seguinte.

12. Adquira `LC`, rotule C como errônea, notifique todas as threads em espera, libere `LC` e complete este procedimento abruptamente com a razão E ou seu substituto conforme determinado na etapa anterior.

Uma implementação da Java Virtual Machine pode otimizar este procedimento omitindo a aquisição do lock na etapa 1 (e a liberação nas etapas 4/5) quando pode determinar que a inicialização da classe já foi concluída, desde que, em termos do modelo de memória Java, todas as ordenações _happens-before_ (JLS §17.4.5) que existiriam se o lock fosse adquirido, ainda existam quando a otimização é realizada.

## 5.6. Binding Native Method Implementations

_Binding_ é o processo pelo qual uma função escrita em uma linguagem diferente da linguagem de programação Java e que implementa um método `native` é integrada à Java Virtual Machine para que possa ser executada. Embora este processo seja tradicionalmente referido como linking, o termo binding é usado na especificação para evitar confusão com o linking de classes ou interfaces pela Java Virtual Machine.

## 5.7. Java Virtual Machine Termination

A Java Virtual Machine executa código em threads ([§2.5](<#/doc/jvms/jvms-02>)). Uma thread é uma thread não-daemon, uma thread daemon ou um shutdown hook.

Os leitores são encaminhados às especificações da API de `Thread` e `Runtime` para detalhes sobre como as threads obtêm o status daemon e como os shutdown hooks são registrados.

Uma thread _termina_ se (i) seu método `run` for concluído normalmente, ou (ii) seu método `run` for concluído abruptamente e o manipulador de exceção não capturada relevante ([§2.10](<#/doc/jvms/jvms-02>)) for concluído normalmente ou abruptamente. Sem código restante para executar, a thread concluiu a execução e, portanto, não possui um método atual ([§2.5.1](<#/doc/jvms/jvms-02>)).

A Java Virtual Machine _termina_ quando uma das seguintes situações ocorre:

1.  Uma thread invocou `System.exit` ou `Runtime.exit`, e todos os shutdown hooks que consequentemente foram iniciados pela Java Virtual Machine, se houver, terminaram.

2.  Uma thread invocou `Runtime.halt`. (Nenhum shutdown hook é iniciado nesta situação.)

3.  A implementação da Java Virtual Machine reconheceu um evento externo como solicitando a terminação da Java Virtual Machine, e todos os shutdown hooks que consequentemente foram iniciados pela Java Virtual Machine, se houver, terminaram.

A natureza do evento está fora do escopo desta especificação, mas é necessariamente algo que uma implementação da Java Virtual Machine pode lidar de forma confiável. Um exemplo é o recebimento de um sinal do sistema operacional.

4.  Ocorreu um evento externo que a implementação da Java Virtual Machine não pode lidar. (Nenhum shutdown hook é iniciado nesta situação.)

A natureza do evento está fora do escopo desta especificação, mas é necessariamente algo que uma implementação da Java Virtual Machine não pode reconhecer ou recuperar de forma alguma. Exemplos incluem um erro fatal ocorrendo no processo que executa a implementação, ou a remoção de energia do computador que executa a implementação.

Após a terminação da Java Virtual Machine, qualquer thread daemon ou não-daemon que ainda não tenha terminado não executará mais código Java. O método atual da thread não é concluído normalmente ou abruptamente.

Se a Java Virtual Machine terminar porque uma thread invocou `Runtime.halt` _enquanto os shutdown hooks estavam em execução_ , então, além das threads daemon e não-daemon, qualquer shutdown hook que ainda não tenha terminado não executará mais código Java.

Aplicativos nativos podem usar a JNI Invocation API para criar e destruir a Java Virtual Machine de tal forma que um programa Java, tendo iniciado a execução no método `main` de uma classe inicial (JLS §12.1), é encerrado quando todas as suas threads não-daemon terminam (JLS §12.8). A Java Virtual Machine não termina "automaticamente" quando a última thread não-daemon termina.

* * *

[Anterior](<#/doc/jvms/jvms-04>) | | [Próximo](<#/doc/jvms/jvms-06>)
---|---|---
Capítulo 4. O Formato do Arquivo `class` | [Início](<#/doc/jvms/jvms-01>) | Capítulo 6. O Conjunto de Instruções da Java Virtual Machine

* * *

[ Aviso Legal ](<#/>)