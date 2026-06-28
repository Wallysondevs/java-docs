# Introdução

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Java SE Specifications](<#/>) > [Java Language Specification](<#/doc/jls/jls-01>)

Capítulo 1. Introdução  
---  
[Prev](<#/doc/jls/jls-01>)  |   |  [Next](<#/doc/jls/jls-02>)  
  
* * *

# Capítulo 1. Introdução 

**Sumário**

[1.1. Organização da Especificação](<#/doc/jls/jls-01>)
[1.2. Programas de Exemplo](<#/doc/jls/jls-01>)
[1.3. Notação](<#/doc/jls/jls-01>)
[1.4. Relação com Classes e Interfaces Predefinidas](<#/doc/jls/jls-01>)
[1.5. Recursos de Pré-visualização](<#/doc/jls/jls-01>)
    

[1.5.1. Restrições ao Uso de Recursos de Pré-visualização](<#/doc/jls/jls-01>)
[1.5.2. Recursos de Linguagem de Pré-visualização Atuais](<#/doc/jls/jls-01>)
[1.6. Feedback](<#/doc/jls/jls-01>)
[1.7. Referências](<#/doc/jls/jls-01>)

A linguagem de programação Java® é uma linguagem de propósito geral, concorrente, baseada em classes e orientada a objetos. Ela é projetada para ser simples o suficiente para que muitos programadores possam alcançar fluência na linguagem. A linguagem de programação Java está relacionada a C e C++, mas é organizada de forma bastante diferente, com vários aspectos de C e C++ omitidos e algumas ideias de outras linguagens incluídas. Ela se destina a ser uma linguagem de produção, não uma linguagem de pesquisa, e assim, como C. A. R. Hoare sugeriu em seu artigo clássico sobre design de linguagem, o design evitou incluir recursos novos e não testados. 

A linguagem de programação Java é fortemente e estaticamente tipada. Esta especificação distingue claramente entre os _erros em tempo de compilação_ que podem e devem ser detectados em tempo de compilação, e aqueles que ocorrem em tempo de execução. O tempo de compilação normalmente consiste em traduzir programas para uma representação de bytecode independente de máquina. As atividades em tempo de execução incluem o carregamento e a vinculação das classes necessárias para executar um programa, geração opcional de código de máquina e otimização dinâmica do programa, e a execução real do programa. 

A linguagem de programação Java é uma linguagem de nível relativamente alto, no sentido de que os detalhes da representação da máquina não estão disponíveis através da linguagem. Ela inclui gerenciamento automático de armazenamento, tipicamente usando um garbage collector, para evitar os problemas de segurança da desalocação explícita (como em `free` do C ou `delete` do C++). Implementações de alto desempenho com garbage collection podem ter pausas limitadas para suportar programação de sistemas e aplicações em tempo real. A linguagem não inclui quaisquer construções inseguras, como acessos a arrays sem verificação de índice, uma vez que tais construções inseguras fariam com que um programa se comportasse de maneira não especificada. 

A linguagem de programação Java é normalmente compilada para o conjunto de instruções bytecode e formato binário definidos em _The Java Virtual Machine Specification, Java SE 25 Edition_. 

## 1.1. Organização da Especificação 

O Capítulo 2 descreve gramáticas e a notação usada para apresentar as gramáticas léxicas e sintáticas para a linguagem. 

O Capítulo 3 descreve a estrutura léxica da linguagem de programação Java, que é baseada em C e C++. A linguagem é escrita no conjunto de caracteres Unicode. Ela suporta a escrita de caracteres Unicode em sistemas que suportam apenas ASCII. 

O Capítulo 4 descreve tipos, valores e variáveis. Os tipos são subdivididos em tipos primitivos e tipos de referência. 

Os tipos primitivos são definidos para serem os mesmos em todas as máquinas e em todas as implementações, e são inteiros de complemento de dois de vários tamanhos, números de ponto flutuante IEEE 754, um tipo `boolean` e um tipo de caractere Unicode `char`. Valores dos tipos primitivos não compartilham estado. 

Tipos de referência são os tipos de classe, os tipos de interface e os tipos de array. Os tipos de referência são implementados por objetos criados dinamicamente que são instâncias de classes ou arrays. Muitas referências a cada objeto podem existir. Todos os objetos (incluindo arrays) suportam os métodos da classe `Object`, que é a raiz (única) da hierarquia de classes. Uma classe `String` predefinida suporta strings de caracteres Unicode. Existem classes para empacotar valores primitivos dentro de objetos. Em muitos casos, o empacotamento e desempacotamento são realizados automaticamente pelo compilador (nesse caso, o empacotamento é chamado de boxing, e o desempacotamento é chamado de unboxing). Classes e interfaces podem ser genéricas, ou seja, podem ser parametrizadas por tipos de referência. Tipos parametrizados de tais classes e interfaces podem então ser invocados com argumentos de tipo específicos. 

Variáveis são locais de armazenamento tipados. Uma variável de um tipo primitivo contém um valor desse tipo primitivo exato. Uma variável de um tipo de classe pode conter uma referência nula ou uma referência a um objeto que é uma instância da classe nomeada ou de qualquer subclasse dessa classe. Uma variável de um tipo de interface pode conter uma referência nula ou uma referência a uma instância de qualquer classe que implemente a interface nomeada. Uma variável de um tipo de array pode conter uma referência nula ou uma referência a um array. Uma variável do tipo de classe `Object` pode conter uma referência nula ou uma referência a qualquer objeto, seja instância de classe ou array. 

O Capítulo 5 descreve conversões e promoções numéricas. As conversões alteram o tipo em tempo de compilação e, às vezes, o valor de uma expressão. Essas conversões incluem as conversões boxing e unboxing entre tipos primitivos e tipos de referência. Promoções numéricas são usadas para converter os operandos de um operador numérico para um tipo comum onde uma operação pode ser realizada. Não há brechas na linguagem; casts em tipos de referência são verificados em tempo de execução para garantir a segurança de tipos. 

O Capítulo 6 descreve declarações e nomes, e como determinar o que os nomes significam (ou seja, qual declaração um nome denota). A linguagem de programação Java não exige que classes e interfaces, ou seus membros, sejam declarados antes de serem usados. A ordem de declaração é significativa apenas para variáveis locais, classes locais, interfaces locais e a ordem dos inicializadores de campo em uma classe ou interface. Convenções de nomenclatura recomendadas que tornam os programas mais legíveis são descritas aqui. 

O Capítulo 7 descreve a estrutura de um programa, que é organizada em pacotes. Os membros de um pacote são classes, interfaces e subpacotes. Pacotes, e consequentemente seus membros, têm nomes em um espaço de nomes hierárquico; o sistema de nomes de domínio da Internet pode ser geralmente usado para formar nomes de pacotes únicos. Unidades de compilação contêm declarações das classes e interfaces que são membros de um determinado pacote, e podem importar classes e interfaces de outros pacotes para lhes dar nomes curtos. 

Pacotes podem ser agrupados em módulos que servem como blocos de construção na elaboração de programas muito grandes. A declaração de um módulo especifica quais outros módulos (e, portanto, pacotes, e, portanto, classes e interfaces) são necessários para compilar e executar código em seus próprios pacotes. 

A linguagem de programação Java suporta limitações no acesso externo aos membros de pacotes, classes e interfaces. Os membros de um pacote podem ser acessíveis apenas por outros membros no mesmo pacote, ou por membros em outros pacotes do mesmo módulo, ou por membros de pacotes em módulos diferentes. Restrições semelhantes se aplicam aos membros de classes e interfaces. 

O Capítulo 8 descreve classes. Os membros das classes são classes, interfaces, campos (variáveis) e métodos. Variáveis de classe existem uma vez por classe. Métodos de classe operam sem referência a um objeto específico. Variáveis de instância são criadas dinamicamente em objetos que são instâncias de classes. Métodos de instância são invocados em instâncias de classes; tais instâncias tornam-se o objeto atual `this` durante sua execução, suportando o estilo de programação orientada a objetos. 

Classes suportam herança única, na qual cada classe tem uma única superclasse. Cada classe herda membros de sua superclasse, e, em última instância, da classe `Object`. Variáveis de um tipo de classe podem referenciar uma instância da classe nomeada ou qualquer subclasse dessa classe, permitindo que novas classes sejam usadas com métodos existentes, polimorficamente. 

Classes suportam programação concorrente com métodos `synchronized`. Métodos declaram as checked exceptions que podem surgir de sua execução, o que permite a verificação em tempo de compilação para garantir que condições excepcionais sejam tratadas. Objetos podem declarar um método `finalize` que será invocado antes que os objetos sejam descartados pelo garbage collector, permitindo que os objetos limpem seu estado. 

Para simplificar, a linguagem não possui "cabeçalhos" de declaração separados da implementação de uma classe, nem hierarquias de tipo e classe separadas. 

Um tipo restrito de classe, as classes enum, suporta a definição de pequenos conjuntos de valores e sua manipulação de maneira type safe. Ao contrário das enumerações em outras linguagens, as constantes enum são objetos e podem ter seus próprios métodos. 

Outro tipo restrito de classe, as classes record, suporta a expressão compacta de objetos simples que servem como agregados de valores. 

O Capítulo 9 descreve interfaces. Os membros das interfaces são classes, interfaces, campos constantes e métodos. Classes que são de outra forma não relacionadas podem implementar a mesma interface. Uma variável de um tipo de interface pode conter uma referência a qualquer objeto que implemente a interface. 

Classes e interfaces suportam herança múltipla de interfaces. Uma classe que implementa uma ou mais interfaces pode herdar métodos de instância tanto de sua superclasse quanto de suas superinterfaces. 

Annotations são metadados que podem ser aplicados a declarações em um programa, bem como aos usos de tipos em declarações e expressões. A forma de uma annotation é definida por uma interface de annotation, um tipo especializado de interface. Annotations não são permitidas para afetar a semântica de programas na linguagem de programação Java de forma alguma. No entanto, elas fornecem entrada útil para várias ferramentas. 

O Capítulo 10 descreve arrays. Acessos a arrays incluem verificação de limites. Arrays são objetos criados dinamicamente e podem ser atribuídos a variáveis do tipo `Object`. A linguagem suporta arrays de arrays, em vez de arrays multidimensionais. 

O Capítulo 11 descreve exceções, que não são retomáveis e são totalmente integradas com a semântica da linguagem e mecanismos de concorrência. Existem três tipos de exceções: checked exceptions, run-time exceptions e errors. O compilador garante que as checked exceptions sejam tratadas corretamente, exigindo que um método ou construtor possa resultar em uma checked exception somente se o método ou construtor a declarar. Isso fornece verificação em tempo de compilação de que existem manipuladores de exceção, e auxilia na programação em larga escala. A maioria das exceções definidas pelo usuário devem ser checked exceptions. Operações inválidas no programa detectadas pela Java Virtual Machine resultam em run-time exceptions, como `NullPointerException`. Errors resultam de falhas detectadas pela Java Virtual Machine, como `OutOfMemoryError`. A maioria dos programas simples não tenta lidar com errors. 

O Capítulo 12 descreve atividades que ocorrem durante a execução de um programa. Um programa é normalmente armazenado como arquivos binários representando classes e interfaces compiladas. Esses arquivos binários podem ser carregados em uma Java Virtual Machine, vinculados a outras classes e interfaces, e inicializados. 

Após a inicialização, métodos de classe e variáveis de classe podem ser usados. Algumas classes podem ser instanciadas para criar novos objetos do tipo de classe. Objetos que são instâncias de classe também contêm uma instância de cada superclasse da classe, e a criação de objetos envolve a criação recursiva dessas instâncias de superclasse. 

Quando um objeto não é mais referenciado, ele pode ser recuperado pelo garbage collector. Se um objeto declara um finalizer, o finalizer é executado antes que o objeto seja recuperado para dar ao objeto uma última chance de limpar recursos que de outra forma não seriam liberados. Quando uma classe não é mais necessária, ela pode ser descarregada. 

O Capítulo 13 descreve a compatibilidade binária, especificando o impacto de mudanças em classes e interfaces em outras classes e interfaces que usam as classes e interfaces alteradas, mas que não foram recompiladas. Essas considerações são de interesse para desenvolvedores de classes e interfaces que serão amplamente distribuídas, em uma série contínua de versões, frequentemente através da Internet. Bons ambientes de desenvolvimento de programas recompilam automaticamente o código dependente sempre que uma classe ou interface é alterada, então a maioria dos programadores não precisa se preocupar com esses detalhes. 

O Capítulo 14 descreve blocos e declarações, que são baseados em C e C++. A linguagem não possui a declaração `goto`, mas inclui as declarações `break` e `continue` rotuladas. Ao contrário de C, a linguagem de programação Java exige expressões `boolean` (ou `Boolean`) em declarações de controle de fluxo, e não converte tipos para `boolean` implicitamente (exceto através de unboxing), na esperança de capturar mais erros em tempo de compilação. Uma declaração `synchronized` fornece bloqueio de monitor básico em nível de objeto. Uma declaração `try` pode incluir cláusulas `catch` e `finally` para proteger contra transferências de controle não locais. O Capítulo 14 também descreve padrões, que são usados dentro de declarações (e expressões) para declarar e inicializar condicionalmente variáveis locais. 

O Capítulo 15 descreve expressões. Este documento especifica completamente a ordem (aparente) de avaliação de expressões, para maior determinismo e portabilidade. Métodos e construtores sobrecarregados são resolvidos em tempo de compilação escolhendo o método ou construtor mais específico dentre os aplicáveis. 

O Capítulo 16 descreve a maneira precisa pela qual a linguagem garante que as variáveis locais sejam definitivamente definidas antes do uso. Enquanto todas as outras variáveis são automaticamente inicializadas para um valor padrão, a linguagem de programação Java não inicializa automaticamente variáveis locais para evitar mascarar erros de programação. 

O Capítulo 17 descreve a semântica de threads e locks, que são baseados na concorrência baseada em monitor originalmente introduzida com a linguagem de programação Mesa. A linguagem de programação Java especifica um modelo de memória para multiprocessadores de memória compartilhada que suporta implementações de alto desempenho. 

O Capítulo 18 descreve uma variedade de algoritmos de inferência de tipo usados para testar a aplicabilidade de métodos genéricos e para inferir tipos em uma invocação de método genérico. 

O Capítulo 19 apresenta uma gramática sintática para a linguagem. 

## 1.2. Programas de Exemplo 

A maioria dos programas de exemplo fornecidos no texto estão prontos para serem executados e são semelhantes em forma a: 
```
    class Test {
        public static void main(String[] args) {
            for (int i = 0; i < args.length; i++)
                System.out.print(i == 0 ? args[i] : " " + args[i]);
            System.out.println();
        }
    }
    
```

Em uma máquina com o Oracle JDK instalado, esta classe, armazenada no arquivo `Test.java`, pode ser compilada e executada pelos comandos: 
```
    javac Test.java
    java Test Hello, world.
    
```

produzindo a saída: 
```
    Hello, world.
    
```

## 1.3. Notação 

Ao longo desta especificação, nos referimos a classes e interfaces extraídas da API da Plataforma Java SE. Sempre que nos referimos a uma classe ou interface (que não sejam as declaradas em um exemplo) usando um único identificador `N`, a referência pretendida é à classe ou interface nomeada `N` no pacote `java.lang`. Usamos o nome canônico ([§6.7](<#/doc/jls/jls-06>)) para classes ou interfaces de pacotes diferentes de `java.lang`. 

Uma referência cruzada dentro desta especificação é mostrada como (§x.y). Ocasionalmente, nos referimos a conceitos em _The Java Virtual Machine Specification, Java SE 25 Edition_ através de referências cruzadas na forma (JVMS §x.y). 

Texto não normativo, projetado para esclarecer o texto normativo desta especificação, é apresentado em texto menor e recuado. 

Este é um texto não normativo. Ele fornece intuição, justificativa, conselhos, exemplos, etc. 

Para encurtar a descrição de algumas regras, especialmente aquelas que analisam sistematicamente as construções da linguagem de programação Java, a abreviação usual "iff" é usada para significar "se e somente se". 

O sistema de tipos da linguagem de programação Java ocasionalmente se baseia na noção de uma _substituição_. A notação `[F1:=T1,...,Fn:=Tn]` denota a substituição de Fi por Ti para 1 ≤ _i_ ≤ _n_. 

## 1.4. Relação com Classes e Interfaces Predefinidas 

Como observado acima, esta especificação frequentemente se refere a classes e interfaces da API da Plataforma Java SE. Em particular, algumas classes e interfaces têm uma relação especial com a linguagem de programação Java. Exemplos incluem classes como `Object`, `Class`, `ClassLoader`, `String` e `Thread`, e as classes e interfaces no pacote `java.lang.reflect`, entre outras. Esta especificação restringe o comportamento de tais classes e interfaces, mas não fornece uma especificação completa para elas. O leitor é remetido à documentação da API da Plataforma Java SE. 

Consequentemente, esta especificação não descreve a reflexão em detalhes. Muitas construções linguísticas têm análogos na Core Reflection API (`java.lang.reflect`) e na Language Model API (`javax.lang.model`), mas estas geralmente não são discutidas aqui. Por exemplo, quando listamos as maneiras pelas quais um objeto pode ser criado, geralmente não incluímos as maneiras pelas quais a Core Reflection API pode realizar isso. Os leitores devem estar cientes desses mecanismos adicionais, mesmo que não sejam mencionados no texto. 

## 1.5. Recursos de Pré-visualização 

Um _recurso de pré-visualização_ é: 

  * um novo recurso da linguagem de programação Java ("recurso de linguagem de pré-visualização"), ou 

  * um novo recurso da Java Virtual Machine ("recurso de VM de pré-visualização"), ou 

  * um novo módulo, pacote, classe, interface, campo, método, construtor ou constante enum no namespace `java.*` ou `javax.*` ("API de pré-visualização") 




que é totalmente especificado, totalmente implementado e, no entanto, impermanente. Ele está disponível em implementações de uma determinada versão da Plataforma Java SE para provocar feedback de desenvolvedores com base no uso no mundo real; isso pode levar a que se torne permanente em uma versão futura da Plataforma Java SE. 

Os recursos de pré-visualização definidos por uma determinada versão da Plataforma Java SE são enumerados na Especificação da Plataforma Java SE para essa versão. Os recursos de pré-visualização são especificados da seguinte forma: 

  * Recursos de linguagem de pré-visualização são especificados em documentos autônomos que indicam mudanças ("diffs") em _The Java® Language Specification_ para essa versão. As especificações dos recursos de linguagem de pré-visualização são incorporadas em _The Java® Language Specification_ por referência, e tornam-se parte dela, se e somente se os recursos de pré-visualização estiverem habilitados em tempo de compilação. 

  * Recursos de VM de pré-visualização são especificados em documentos autônomos que indicam mudanças ("diffs") em _The Java® Virtual Machine Specification_ para essa versão. As especificações dos recursos de VM de pré-visualização são incorporadas em _The Java® Virtual Machine Specification_ por referência, e tornam-se parte dela, se e somente se os recursos de pré-visualização estiverem habilitados em tempo de execução. 

  * APIs de pré-visualização são especificadas dentro da Especificação da API Java SE para essa versão. 




### 1.5.1. Restrições ao Uso de Recursos de Pré-visualização 

Implementações da Plataforma Java SE desabilitam, tanto em tempo de compilação quanto em tempo de execução, os recursos de pré-visualização definidos por uma determinada versão, a menos que o usuário indique via sistema host, tanto em tempo de compilação quanto em tempo de execução, que os recursos de pré-visualização estão habilitados. As implementações não fornecem uma maneira de habilitar apenas alguns dos recursos de pré-visualização da versão dada. 

Em tempo de compilação, as regras para o uso de recursos de linguagem de pré-visualização são as seguintes: 

  * Se os recursos de pré-visualização estiverem desabilitados, então qualquer referência no código-fonte a um recurso de linguagem de pré-visualização, ou a uma classe ou interface declarada usando um recurso de linguagem de pré-visualização, causa um erro em tempo de compilação. 

  * Se os recursos de pré-visualização estiverem habilitados, então qualquer referência no código-fonte a uma classe ou interface declarada usando um recurso de linguagem de pré-visualização causa um _aviso de pré-visualização_, a menos que uma das seguintes condições seja verdadeira: 

    * A referência aparece em uma declaração que é anotada para suprimir avisos de pré-visualização ([§9.6.4.5](<#/doc/jls/jls-09>)). 

    * A referência aparece em uma declaração de importação ([§7.5](<#/doc/jls/jls-07>)). 

Quando os recursos de pré-visualização estão habilitados, os compiladores Java são fortemente encorajados a emitir um aviso não suprimível para cada referência no código-fonte a um recurso de linguagem de pré-visualização. Detalhes deste aviso estão além do escopo desta especificação, mas a intenção deve ser alertar os programadores sobre a possibilidade de o código ser afetado por futuras mudanças nos recursos de linguagem de pré-visualização. 




Algumas APIs de pré-visualização são descritas como _reflexivas_ pela Especificação da Plataforma Java SE, principalmente nos pacotes `java.lang.reflect`, `java.lang.invoke` e `javax.lang.model`. Em tempo de compilação, a regra para o uso de APIs de pré-visualização reflexivas é a seguinte: 

  * Quer os recursos de pré-visualização estejam habilitados ou desabilitados, qualquer referência no código-fonte a um elemento de API de pré-visualização reflexiva causa um aviso de pré-visualização, a menos que uma das seguintes condições seja verdadeira: 

    * A declaração onde a referência aparece está dentro do mesmo módulo que a declaração do elemento de API de pré-visualização reflexiva. 

    * A referência aparece em uma declaração que é anotada para suprimir avisos de pré-visualização. 

    * A referência aparece em uma declaração de importação. 




Todas as APIs de pré-visualização não descritas como reflexivas na Especificação da Plataforma Java SE são _normais_. Em tempo de compilação, as regras para o uso de APIs de pré-visualização normais são as seguintes: 

  * Se os recursos de pré-visualização estiverem desabilitados, então qualquer referência no código-fonte a um elemento de API de pré-visualização normal causa um erro em tempo de compilação, a menos que: 

    * A declaração onde a referência aparece está dentro do mesmo módulo que a declaração do elemento de API de pré-visualização normal. 

  * Se os recursos de pré-visualização estiverem habilitados, então qualquer referência no código-fonte a um elemento de API de pré-visualização normal causa um aviso de pré-visualização, a menos que uma das seguintes condições seja verdadeira: 

    * A declaração onde a referência aparece está dentro do mesmo módulo que a declaração do elemento de API de pré-visualização normal. 

    * A referência aparece em uma declaração que é anotada para suprimir avisos de pré-visualização. 

    * A referência aparece em uma declaração de importação. 




### 1.5.2. Recursos de Linguagem de Pré-visualização Atuais 

Java SE 25 define um recurso de linguagem de pré-visualização: 

  * _Tipos Primitivos em Padrões, `instanceof`, e `switch`_




Os documentos autônomos que especificam este recurso de pré-visualização estão disponíveis no site que hospeda esta edição de _The Java® Language Specification_. 

## 1.6. Feedback

Leitores são convidados a relatar erros técnicos e ambiguidades em _The Java® Language Specification_ para `jls-jvms-spec-comments@openjdk.org`.

Perguntas sobre o comportamento de `javac` (o compilador de referência para a linguagem de programação Java), e em particular sua conformidade com esta especificação, podem ser enviadas para `compiler-dev@openjdk.org`.

## 1.7. Referências

### Bibliografia

Apple Computer. _Dylan Reference Manual_. Apple Computer Inc., Cupertino, Califórnia. 29 de setembro de 1995.

Bobrow, Daniel G., Linda G. DeMichiel, Richard P. Gabriel, Sonya E. Keene, Gregor Kiczales, e David A. Moon. _Common Lisp Object System Specification_ , X3J13 Document 88-002R, junho de 1988; aparece como Capítulo 28 de Steele, Guy. _Common Lisp: The Language_ , 2ª ed. Digital Press, 1990, ISBN 1-55558-041-6, 770-864.

Ellis, Margaret A., e Bjarne Stroustrup. _The Annotated C++ Reference Manual_. Addison-Wesley, Reading, Massachusetts, 1990, reimpresso com correções em outubro de 1992, ISBN 0-201-51459-1.

Goldberg, Adele e Robson, David. _Smalltalk-80: The Language_. Addison-Wesley, Reading, Massachusetts, 1989, ISBN 0-201-13688-0.

Harbison, Samuel. _Modula-3_. Prentice Hall, Englewood Cliffs, Nova Jersey, 1992, ISBN 0-13-596396.

Hoare, C. A. R. _Hints on Programming Language Design_. Stanford University Computer Science Department Technical Report No. CS-73-403, dezembro de 1973. Reimpresso no Simpósio SIGACT/SIGPLAN sobre Princípios de Linguagens de Programação. Association for Computing Machinery, Nova Iorque, outubro de 1973.

IEEE. _IEEE Standard for Floating-Point Arithmetic_. IEEE Std 754-2019 (Revisão de IEEE 754-2008). julho de 2019, ISBN 978-1-5044-5924-2.

Kernighan, Brian W., e Dennis M. Ritchie. _The C Programming Language_ , 2ª ed. Prentice Hall, Englewood Cliffs, Nova Jersey, 1988, ISBN 0-13-110362-8.

Madsen, Ole Lehrmann, Birger Møller-Pedersen, e Kristen Nygaard. _Object-Oriented Programming in the Beta Programming Language_. Addison-Wesley, Reading, Massachusetts, 1993, ISBN 0-201-62430-3.

Mitchell, James G., William Maybury, e Richard Sweet. _The Mesa Programming Language, Version 5.0_. Xerox PARC, Palo Alto, Califórnia, CSL 79-3, abril de 1979.

Stroustrup, Bjarne. _The C++ Programming Language_ , 2ª ed. Addison-Wesley, Reading, Massachusetts, 1991, reimpresso com correções em janeiro de 1994, ISBN 0-201-53992-6.

Unicode Consortium, The. _The Unicode Standard, Version 16.0.0_. South San Francisco: The Unicode Consortium, 2024. ISBN 978-1-936213-34-4.

* * *

[Anterior](<#/doc/jls/jls-01>) | | [Próximo](<#/doc/jls/jls-02>)
---|---|---
The Java® Language Specification | [Início](<#/doc/jls/jls-01>) | Capítulo 2. Gramáticas

* * *

[ Aviso Legal ](<#/>)