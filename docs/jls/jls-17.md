# Threads e Locks

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Especificações Java SE](<#/>) > [Java Language Specification](<#/doc/jls/jls-01>)

Capítulo 17. Threads e Locks
---
[Anterior](<#/doc/jls/jls-16>) | | [Próximo](<#/doc/jls/jls-18>)
* * *

# Capítulo 17. Threads e Locks

**Sumário**

[17.1. Sincronização](<#/doc/jls/jls-17>)
[17.2. Conjuntos de Espera e Notificação](<#/doc/jls/jls-17>)
    

[17.2.1. Espera](<#/doc/jls/jls-17>)
[17.2.2. Notificação](<#/doc/jls/jls-17>)
[17.2.3. Interrupções](<#/doc/jls/jls-17>)
[17.2.4. Interações de Esperas, Notificação e Interrupção](<#/doc/jls/jls-17>)
[17.3. Sleep e Yield](<#/doc/jls/jls-17>)
[17.4. Modelo de Memória](<#/doc/jls/jls-17>)
    

[17.4.1. Variáveis Compartilhadas](<#/doc/jls/jls-17>)
[17.4.2. Ações](<#/doc/jls/jls-17>)
[17.4.3. Programas e Ordem de Programa](<#/doc/jls/jls-17>)
[17.4.4. Ordem de Sincronização](<#/doc/jls/jls-17>)
[17.4.5. Ordem Happens-before](<#/doc/jls/jls-17>)
[17.4.6. Execuções](<#/doc/jls/jls-17>)
[17.4.7. Execuções Bem-Formadas](<#/doc/jls/jls-17>)
[17.4.8. Execuções e Requisitos de Causalidade](<#/doc/jls/jls-17>)
[17.4.9. Comportamento Observável e Execuções Não Terminantes](<#/doc/jls/jls-17>)
[17.5. Semântica de Campos `final`](<#/doc/jls/jls-17>)
    

[17.5.1. Semântica de Campos `final`](<#/doc/jls/jls-17>)
[17.5.2. Leitura de Campos `final` Durante a Construção](<#/doc/jls/jls-17>)
[17.5.3. Modificação Subsequente de Campos `final`](<#/doc/jls/jls-17>)
[17.5.4. Campos Protegidos contra Escrita](<#/doc/jls/jls-17>)
[17.6. Word Tearing](<#/doc/jls/jls-17>)
[17.7. Tratamento Não Atômico de `double` e `long`](<#/doc/jls/jls-17>)

Embora a maior parte da discussão nos capítulos anteriores se preocupe apenas com o comportamento do código executado uma única instrução ou expressão por vez, ou seja, por uma única _thread_, a Java Virtual Machine pode suportar muitas threads de execução simultaneamente. Essas threads executam independentemente o código que opera em valores e objetos residentes em uma memória principal compartilhada. As threads podem ser suportadas por muitos processadores de hardware, por fatiamento de tempo (time-slicing) de um único processador de hardware, ou por fatiamento de tempo de muitos processadores de hardware.

As threads são representadas pela classe `Thread`. A única maneira de um usuário criar uma thread é criar um objeto desta classe; cada thread está associada a tal objeto. Uma thread será iniciada quando o método `start()` for invocado no objeto `Thread` correspondente.

O comportamento das threads, particularmente quando não estão corretamente sincronizadas, pode ser confuso e contraintuitivo. Este capítulo descreve a semântica de programas multithreaded; ele inclui regras para quais valores podem ser vistos por uma leitura de memória compartilhada que é atualizada por múltiplas threads. Como a especificação é semelhante aos _modelos de memória_ para diferentes arquiteturas de hardware, essa semântica é conhecida como o _modelo de memória da linguagem de programação Java_. Quando não houver confusão, nos referiremos a essas regras simplesmente como "o modelo de memória".

Essa semântica não prescreve como um programa multithreaded deve ser executado. Em vez disso, ela descreve os comportamentos que os programas multithreaded podem exibir. Qualquer estratégia de execução que gere apenas comportamentos permitidos é uma estratégia de execução aceitável.

## 17.1. Sincronização

A linguagem de programação Java fornece múltiplos mecanismos para comunicação entre threads. O mais básico desses métodos é a _sincronização_, que é implementada usando _monitores_. Cada objeto em Java está associado a um monitor, que uma thread pode _bloquear_ (lock) ou _desbloquear_ (unlock). Apenas uma thread por vez pode manter um bloqueio em um monitor. Quaisquer outras threads que tentarem bloquear esse monitor são bloqueadas até que possam obter um bloqueio nesse monitor. Uma thread _t_ pode bloquear um monitor específico múltiplas vezes; cada desbloqueio reverte o efeito de uma operação de bloqueio.

A instrução `synchronized` ([§14.19](<#/doc/jls/jls-14>)) calcula uma referência a um objeto; ela então tenta realizar uma ação de bloqueio no monitor desse objeto e não prossegue até que a ação de bloqueio tenha sido concluída com sucesso. Após a ação de bloqueio ter sido realizada, o corpo da instrução `synchronized` é executado. Se a execução do corpo for concluída, seja normalmente ou abruptamente, uma ação de desbloqueio é automaticamente realizada nesse mesmo monitor.

Um método `synchronized` ([§8.4.3.6](<#/doc/jls/jls-08>)) realiza automaticamente uma ação de bloqueio quando é invocado; seu corpo não é executado até que a ação de bloqueio tenha sido concluída com sucesso. Se o método for um método de instância, ele bloqueia o monitor associado à instância para a qual foi invocado (ou seja, o objeto que será conhecido como `this` durante a execução do corpo do método). Se o método for `static`, ele bloqueia o monitor associado ao objeto `Class` que representa a classe na qual o método é definido. Se a execução do corpo do método for concluída, seja normalmente ou abruptamente, uma ação de desbloqueio é automaticamente realizada nesse mesmo monitor.

A linguagem de programação Java não impede nem exige a detecção de condições de deadlock. Programas onde as threads mantêm (direta ou indiretamente) bloqueios em múltiplos objetos devem usar técnicas convencionais para evitar deadlocks, criando primitivas de bloqueio de nível superior que não causem deadlock, se necessário.

Outros mecanismos, como leituras e escritas de variáveis `volatile` e o uso de classes no pacote `java.util.concurrent`, fornecem maneiras alternativas de sincronização.

## 17.2. Conjuntos de Espera e Notificação

Todo objeto, além de ter um monitor associado, tem um _conjunto de espera_ associado. Um conjunto de espera é um conjunto de threads.

Quando um objeto é criado pela primeira vez, seu conjunto de espera está vazio. Ações elementares que adicionam e removem threads de conjuntos de espera são atômicas. Os conjuntos de espera são manipulados exclusivamente através dos métodos `Object.wait`, `Object.notify` e `Object.notifyAll`.

As manipulações do conjunto de espera também podem ser afetadas pelo status de interrupção de uma thread e pelos métodos da classe `Thread` que lidam com interrupção. Além disso, os métodos da classe `Thread` para dormir e juntar-se a outras threads têm propriedades derivadas das ações de espera e notificação.

### 17.2.1. Espera

_Ações de espera_ ocorrem na invocação de `wait()`, ou das formas temporizadas `wait(long millisecs)` e `wait(long millisecs, int nanosecs)`.

Uma chamada de `wait(long millisecs)` com um parâmetro zero, ou uma chamada de `wait(long millisecs, int nanosecs)` com dois parâmetros zero, é equivalente a uma invocação de `wait()`.

Uma thread _retorna normalmente_ de uma espera se ela retornar sem lançar uma `InterruptedException`.

Seja a thread _t_ a thread executando o método `wait` no objeto _m_, e seja _n_ o número de ações de bloqueio por _t_ em _m_ que não foram correspondidas por ações de desbloqueio. Uma das seguintes ações ocorre:

  * Se _n_ for zero (ou seja, a thread _t_ ainda não possui o bloqueio para o alvo _m_), então uma `IllegalMonitorStateException` é lançada.

  * Se esta for uma espera temporizada e o argumento `nanosecs` não estiver no intervalo de `0-999999` ou o argumento `millisecs` for negativo, então uma `IllegalArgumentException` é lançada.

  * Se a thread _t_ for interrompida, então uma `InterruptedException` é lançada e o status de interrupção de _t_ é definido como false.

  * Caso contrário, a seguinte sequência ocorre:

    1. A thread _t_ é adicionada ao conjunto de espera do objeto _m_, e realiza _n_ ações de desbloqueio em _m_.

    2. A thread _t_ não executa mais nenhuma instrução até ser removida do conjunto de espera de _m_. A thread pode ser removida do conjunto de espera devido a qualquer uma das seguintes ações, e será retomada algum tempo depois:

       * Uma ação `notify` sendo realizada em _m_ na qual _t_ é selecionada para remoção do conjunto de espera.

       * Uma ação `notifyAll` sendo realizada em _m_.

       * Uma ação `interrupt` sendo realizada em _t_.

       * Se esta for uma espera temporizada, uma ação interna removendo _t_ do conjunto de espera de _m_ que ocorre após pelo menos `millisecs` milissegundos mais `nanosecs` nanossegundos decorrerem desde o início desta ação de espera.

       * Uma ação interna pela implementação. As implementações são permitidas, embora não encorajadas, a realizar "despertadas espúrias" (spurious wake-ups), ou seja, remover threads de conjuntos de espera e assim permitir a retomada sem instruções explícitas para fazê-lo.

Observe que esta provisão exige a prática de codificação Java de usar `wait` apenas dentro de loops que terminam somente quando alguma condição lógica pela qual a thread está esperando é satisfeita.

Cada thread deve determinar uma ordem sobre os eventos que poderiam causar sua remoção de um conjunto de espera. Essa ordem não precisa ser consistente com outras ordenações, mas a thread deve se comportar como se esses eventos tivessem ocorrido nessa ordem.

Por exemplo, se uma thread _t_ está no conjunto de espera para _m_, e então ocorrem tanto uma interrupção de _t_ quanto uma notificação de _m_, deve haver uma ordem sobre esses eventos. Se a interrupção for considerada como tendo ocorrido primeiro, então _t_ eventualmente retornará de `wait` lançando `InterruptedException`, e alguma outra thread no conjunto de espera para _m_ (se houver alguma no momento da notificação) deve receber a notificação. Se a notificação for considerada como tendo ocorrido primeiro, então _t_ eventualmente retornará normalmente de `wait` com uma interrupção ainda pendente.

    3. A thread _t_ realiza _n_ ações de bloqueio em _m_.

    4. Se a thread _t_ foi removida do conjunto de espera de _m_ na etapa 2 devido a uma interrupção, então o status de interrupção de _t_ é definido como false e o método `wait` lança `InterruptedException`.

### 17.2.2. Notificação

As ações de notificação ocorrem na invocação dos métodos `notify` e `notifyAll`.

Seja a thread _t_ a thread executando qualquer um desses métodos no objeto _m_, e seja _n_ o número de ações de bloqueio por _t_ em _m_ que não foram correspondidas por ações de desbloqueio. Uma das seguintes ações ocorre:

  * Se _n_ for zero, então uma `IllegalMonitorStateException` é lançada.

Este é o caso em que a thread _t_ ainda não possui o bloqueio para o alvo _m_.

  * Se _n_ for maior que zero e esta for uma ação `notify`, então se o conjunto de espera de _m_ não estiver vazio, uma thread _u_ que é membro do conjunto de espera atual de _m_ é selecionada e removida do conjunto de espera.

Não há garantia sobre qual thread no conjunto de espera é selecionada. Esta remoção do conjunto de espera permite a retomada de _u_ em uma ação de espera. Observe, no entanto, que as ações de bloqueio de _u_ após a retomada não podem ser bem-sucedidas até algum tempo depois que _t_ desbloquear completamente o monitor para _m_.

  * Se _n_ for maior que zero e esta for uma ação `notifyAll`, então todas as threads são removidas do conjunto de espera de _m_, e assim são retomadas.

Observe, no entanto, que apenas uma delas por vez bloqueará o monitor necessário durante a retomada da espera.

### 17.2.3. Interrupções

As ações de interrupção ocorrem na invocação de `Thread.interrupt`, bem como métodos definidos para invocá-lo por sua vez, como `ThreadGroup.interrupt`.

Seja _t_ a thread invocando _u_`.interrupt`, para alguma thread _u_, onde _t_ e _u_ podem ser as mesmas. Esta ação faz com que o status de interrupção de _u_ seja definido como true.

Além disso, se existir algum objeto _m_ cujo conjunto de espera contenha _u_, então _u_ é removida do conjunto de espera de _m_. Isso permite que _u_ seja retomada em uma ação de espera, caso em que esta espera, após rebloquear o monitor de _m_, lançará `InterruptedException`.

As invocações de `Thread.isInterrupted` podem determinar o status de interrupção de uma thread. O método `static` `Thread.interrupted` pode ser invocado por uma thread para observar e limpar seu próprio status de interrupção.

### 17.2.4. Interações de Esperas, Notificação e Interrupção

As especificações acima nos permitem determinar várias propriedades relacionadas à interação de esperas, notificação e interrupção.

Se uma thread for notificada e interrompida enquanto espera, ela pode:

  * retornar normalmente de `wait`, ainda tendo uma interrupção pendente (em outras palavras, uma chamada para `Thread.interrupted` retornaria true)

  * retornar de `wait` lançando uma `InterruptedException`.

A thread não pode redefinir seu status de interrupção e retornar normalmente da chamada para `wait`.

Da mesma forma, as notificações não podem ser perdidas devido a interrupções. Suponha que um conjunto _s_ de threads esteja no conjunto de espera de um objeto _m_, e outra thread realize um `notify` em _m_. Então, ou:

  * pelo menos uma thread em _s_ deve retornar normalmente de `wait`, ou

  * todas as threads em _s_ devem sair de `wait` lançando `InterruptedException`.

Note que se uma thread for interrompida e despertada via `notify`, e essa thread retornar de `wait` lançando uma `InterruptedException`, então alguma outra thread no conjunto de espera deve ser notificada.

## 17.3. Sleep e Yield

`Thread.sleep` faz com que a thread atualmente em execução durma (cesse temporariamente a execução) pela duração especificada, sujeita à precisão e exatidão dos temporizadores e agendadores do sistema. A thread não perde a propriedade de nenhum monitor, e a retomada da execução dependerá do agendamento e da disponibilidade de processadores nos quais a thread possa ser executada.

É importante notar que nem `Thread.sleep` nem `Thread.yield` possuem qualquer semântica de sincronização. Em particular, o compilador não precisa descarregar as escritas armazenadas em cache nos registradores para a memória compartilhada antes de uma chamada para `Thread.sleep` ou `Thread.yield`, nem o compilador precisa recarregar os valores armazenados em cache nos registradores após uma chamada para `Thread.sleep` ou `Thread.yield`.

Por exemplo, no seguinte fragmento de código (quebrado), suponha que `this.done` seja um campo `boolean` não-`volatile`:
```java
    while (!this.done)
        Thread.sleep(1000);
    
```

O compilador é livre para ler o campo `this.done` apenas uma vez e reutilizar o valor em cache em cada execução do loop. Isso significaria que o loop nunca terminaria, mesmo que outra thread alterasse o valor de `this.done`.

## 17.4. Modelo de Memória

Um _modelo de memória_ descreve, dado um programa e um rastro de execução desse programa, se o rastro de execução é uma execução legal do programa. O modelo de memória da linguagem de programação Java funciona examinando cada leitura em um rastro de execução e verificando se a escrita observada por essa leitura é válida de acordo com certas regras.

O modelo de memória descreve os possíveis comportamentos de um programa. Uma implementação é livre para produzir qualquer código que desejar, desde que todas as execuções resultantes de um programa produzam um resultado que possa ser previsto pelo modelo de memória.

Isso proporciona uma grande liberdade para o implementador realizar uma miríade de transformações de código, incluindo a reordenação de ações e a remoção de sincronização desnecessária.

**Exemplo 17.4-1. Programas Incorretamente Sincronizados Podem Exibir Comportamento Surpreendente**

A semântica da linguagem de programação Java permite que compiladores e microprocessadores realizem otimizações que podem interagir com código incorretamente sincronizado de maneiras que podem produzir comportamentos que parecem paradoxais. Aqui estão alguns exemplos de como programas incorretamente sincronizados podem exibir comportamentos surpreendentes.

Considere, por exemplo, os rastros de programa de exemplo mostrados na [Tabela 17.4-A](<#/doc/jls/jls-17>). Este programa usa variáveis locais `r1` e `r2` e variáveis compartilhadas `A` e `B`. Inicialmente, `A == B == 0`.

**Tabela 17.4-A. Resultados surpreendentes causados pela reordenação de instruções - código original**

Thread 1 | Thread 2
---|---
1: `r2 = A;` | 3: `r1 = B;`
2: `B = 1;` | 4: `A = 2;`
  


Pode parecer que o resultado `r2 == 2` e `r1 == 1` é impossível. Intuitivamente, ou a instrução 1 ou a instrução 3 deveria vir primeiro em uma execução. Se a instrução 1 vier primeiro, ela não deveria ser capaz de ver a escrita na instrução 4. Se a instrução 3 vier primeiro, ela não deveria ser capaz de ver a escrita na instrução 2.

Se alguma execução exibisse esse comportamento, então saberíamos que a instrução 4 veio antes da instrução 1, que veio antes da instrução 2, que veio antes da instrução 3, que veio antes da instrução 4. Isso é, à primeira vista, absurdo.

No entanto, os compiladores são permitidos a reordenar as instruções em qualquer thread, quando isso não afeta a execução dessa thread isoladamente. Se a instrução 1 for reordenada com a instrução 2, como mostrado no rastro na [Tabela 17.4-B](<#/doc/jls/jls-17>), então é fácil ver como o resultado `r2 == 2` e `r1 == 1` pode ocorrer.

**Tabela 17.4-B. Resultados surpreendentes causados pela reordenação de instruções - transformação válida do compilador**

Thread 1 | Thread 2
---|---
`B = 1;` | `r1 = B;`
`r2 = A;` | `A = 2;`
  


Para alguns programadores, esse comportamento pode parecer "quebrado". No entanto, deve-se notar que este código está sincronizado incorretamente:

  * há uma escrita em uma thread,

  * uma leitura da mesma variável por outra thread,

  * e a escrita e a leitura não são ordenadas por sincronização.

Esta situação é um exemplo de uma _condição de corrida de dados_ (data race) ([§17.4.5](<#/doc/jls/jls-17>)). Quando o código contém uma condição de corrida de dados, resultados contraintuitivos são frequentemente possíveis.

Vários mecanismos podem produzir a reordenação na [Tabela 17.4-B](<#/doc/jls/jls-17>). Um compilador Just-In-Time em uma implementação da Java Virtual Machine pode rearranjar o código, ou o processador. Além disso, a hierarquia de memória da arquitetura na qual uma implementação da Java Virtual Machine é executada pode fazer parecer que o código está sendo reordenado. Neste capítulo, nos referiremos a qualquer coisa que possa reordenar o código como um _compilador_.

Outro exemplo de resultados surpreendentes pode ser visto na [Tabela 17.4-C](<#/doc/jls/jls-17>). Inicialmente, `p == q` e `p.x == 0`. Este programa também está sincronizado incorretamente; ele escreve na memória compartilhada sem impor qualquer ordenação entre essas escritas.

**Tabela 17.4-C. Resultados surpreendentes causados pela substituição direta**

Thread 1 | Thread 2
---|---
`r1 = p;` | `r6 = p;`
`r2 = r1.x;` | `r6.x = 3;`
`r3 = q;` |
`r4 = r3.x;` |
`r5 = r1.x;` |
  


Uma otimização comum do compilador envolve a reutilização do valor lido para `r2` para `r5`: ambas são leituras de `r1.x` sem nenhuma escrita intermediária. Esta situação é mostrada na [Tabela 17.4-D](<#/doc/jls/jls-17>).

**Tabela 17.4-D. Resultados surpreendentes causados pela substituição direta**

Thread 1 | Thread 2
---|---
`r1 = p;` | `r6 = p;`
`r2 = r1.x;` | `r6.x = 3;`
`r3 = q;` |
`r4 = r3.x;` |
`r5 = r2;` |
  


Agora considere o caso em que a atribuição a `r6.x` na Thread 2 acontece entre a primeira leitura de `r1.x` e a leitura de `r3.x` na Thread 1. Se o compilador decidir reutilizar o valor de `r2` para `r5`, então `r2` e `r5` terão o valor `0`, e `r4` terá o valor `3`. Da perspectiva do programador, o valor armazenado em `p.x` mudou de `0` para `3` e depois voltou.

O modelo de memória determina quais valores podem ser lidos em cada ponto do programa. As ações de cada thread isoladamente devem se comportar conforme regido pela semântica dessa thread, com a exceção de que os valores vistos por cada leitura são determinados pelo modelo de memória. Quando nos referimos a isso, dizemos que o programa obedece à _semântica intra-thread_. A semântica intra-thread é a semântica para programas de thread única e permite a previsão completa do comportamento de uma thread com base nos valores vistos pelas ações de leitura dentro da thread. Para determinar se as ações da thread _t_ em uma execução são legais, simplesmente avaliamos a implementação da thread _t_ como seria realizada em um contexto de thread única, conforme definido no restante desta especificação.

Cada vez que a avaliação da thread _t_ gera uma ação inter-thread, ela deve corresponder à ação inter-thread _a_ de _t_ que vem a seguir na ordem do programa. Se _a_ for uma leitura, então a avaliação posterior de _t_ usa o valor visto por _a_ conforme determinado pelo modelo de memória.

Esta seção fornece a especificação do modelo de memória da linguagem de programação Java, exceto para questões relacionadas a campos `final`, que são descritas em [§17.5](<#/doc/jls/jls-17>).

O modelo de memória aqui especificado não se baseia fundamentalmente na natureza orientada a objetos da linguagem de programação Java. Para concisão e simplicidade em nossos exemplos, frequentemente exibimos fragmentos de código sem definições de classe ou método, ou desreferenciação explícita. A maioria dos exemplos consiste em duas ou mais threads contendo instruções com acesso a variáveis locais, variáveis globais compartilhadas ou campos de instância de um objeto. Geralmente usamos nomes de variáveis como `r1` ou `r2` para indicar variáveis locais a um método ou thread. Tais variáveis não são acessíveis por outras threads.

### 17.4.1. Variáveis Compartilhadas

A memória que pode ser compartilhada entre threads é chamada de _memória compartilhada_ ou _memória heap_.

Todos os campos de instância, campos `static` e elementos de array são armazenados na memória heap. Neste capítulo, usamos o termo _variável_ para nos referir tanto a campos quanto a elementos de array.

Variáveis locais ([§14.4](<#/doc/jls/jls-14>)), parâmetros formais de método ([§8.4.1](<#/doc/jls/jls-08>)) e parâmetros de manipulador de exceção ([§14.20](<#/doc/jls/jls-14>)) nunca são compartilhados entre threads e não são afetados pelo modelo de memória.

Dois acessos (leituras ou escritas) à mesma variável são considerados _conflitantes_ se pelo menos um dos acessos for uma escrita.

### 17.4.2. Ações

Uma _ação inter-thread_ é uma ação realizada por uma thread que pode ser detectada ou diretamente influenciada por outra thread. Existem vários tipos de ações inter-thread que um programa pode realizar:

  * _Leitura_ (normal, ou não-volatile). Leitura de uma variável.

  * _Escrita_ (normal, ou não-volatile). Escrita em uma variável.

  * _Ações de sincronização_, que são:

    * _Leitura volatile_. Uma leitura volatile de uma variável.

    * _Escrita volatile_. Uma escrita volatile em uma variável.

    * _Bloqueio_ (Lock). Bloquear um monitor.

    * _Desbloqueio_ (Unlock). Desbloquear um monitor.

    * A primeira e a última ação (sintéticas) de uma thread.

    * Ações que iniciam uma thread ou detectam que uma thread terminou ([§17.4.4](<#/doc/jls/jls-17>)).

  * _Ações Externas_. Uma ação externa é uma ação que pode ser observável fora de uma execução e tem um resultado baseado em um ambiente externo à execução.

  * _Ações de divergência de thread_ ([§17.4.9](<#/doc/jls/jls-17>)). Uma ação de divergência de thread é realizada apenas por uma thread que está em um loop infinito no qual nenhuma ação de memória, sincronização ou externa é realizada. Se uma thread realiza uma ação de divergência de thread, ela será seguida por um número infinito de ações de divergência de thread.

As ações de divergência de thread são introduzidas para modelar como uma thread pode fazer com que todas as outras threads parem e falhem em progredir.

Esta especificação se preocupa apenas com ações inter-thread. Não precisamos nos preocupar com ações intra-thread (por exemplo, adicionar duas variáveis locais e armazenar o resultado em uma terceira variável local). Como mencionado anteriormente, todas as threads precisam obedecer à semântica intra-thread correta para programas Java. Geralmente nos referiremos às ações inter-thread de forma mais sucinta como simplesmente _ações_.

Uma ação _a_ é descrita por uma tupla < _t_, _k_, _v_, _u_ >, compreendendo:

  * _t_ - a thread realizando a ação

  * _k_ - o tipo de ação

  * _v_ - a variável ou monitor envolvido na ação.

Para ações de bloqueio, _v_ é o monitor sendo bloqueado; para ações de desbloqueio, _v_ é o monitor sendo desbloqueado.

Se a ação for uma leitura (volatile ou não-volatile), _v_ é a variável sendo lida.

Se a ação for uma escrita (volatile ou não-volatile), _v_ é a variável sendo escrita.

  * _u_ - um identificador único arbitrário para a ação

Uma tupla de ação externa contém um componente adicional, que contém os resultados da ação externa conforme percebidos pela thread que realiza a ação. Isso pode ser informações sobre o sucesso ou falha da ação e quaisquer valores lidos pela ação.

Os parâmetros para a ação externa (por exemplo, quais bytes são escritos em qual socket) não fazem parte da tupla de ação externa. Esses parâmetros são configurados por outras ações dentro da thread e podem ser determinados examinando a semântica intra-thread. Eles não são explicitamente discutidos no modelo de memória.

Em execuções não terminantes, nem todas as ações externas são observáveis. Execuções não terminantes e ações observáveis são discutidas em [§17.4.9](<#/doc/jls/jls-17>).

### 17.4.3. Programas e Ordem de Programa

Entre todas as ações inter-thread realizadas por cada thread _t_, a _ordem de programa_ de _t_ é uma ordem total que reflete a ordem em que essas ações seriam realizadas de acordo com a semântica intra-thread de _t_.

Um conjunto de ações é _sequencialmente consistente_ se todas as ações ocorrem em uma ordem total (a ordem de execução) que é consistente com a ordem de programa, e, além disso, cada leitura _r_ de uma variável _v_ vê o valor escrito pela escrita _w_ em _v_ tal que:

  * _w_ vem antes de _r_ na ordem de execução, e

  * não há outra escrita _w'_ tal que _w_ vem antes de _w'_ e _w'_ vem antes de _r_ na ordem de execução.

A consistência sequencial é uma garantia muito forte que é feita sobre a visibilidade e ordenação em uma execução de um programa. Dentro de uma execução sequencialmente consistente, há uma ordem total sobre todas as ações individuais (como leituras e escritas) que é consistente com a ordem do programa, e cada ação individual é atômica e é imediatamente visível para cada thread.

Se um programa não tiver condições de corrida de dados, então todas as execuções do programa parecerão ser sequencialmente consistentes.

A consistência sequencial e/ou a ausência de condições de corrida de dados ainda permite erros decorrentes de grupos de operações que precisam ser percebidas atomicamente e não o são.

Se usássemos a consistência sequencial como nosso modelo de memória, muitas das otimizações de compilador e processador que discutimos seriam ilegais. Por exemplo, no rastro na [Tabela 17.4-C](<#/doc/jls/jls-17>), assim que a escrita de `3` em `p.x` ocorresse, as leituras subsequentes desse local seriam obrigadas a ver esse valor.

### 17.4.4. Ordem de Sincronização

Toda execução tem uma _ordem de sincronização_. Uma ordem de sincronização é uma ordem total sobre todas as ações de sincronização de uma execução. Para cada thread _t_, a ordem de sincronização das ações de sincronização ([§17.4.2](<#/doc/jls/jls-17>)) em _t_ é consistente com a ordem de programa ([§17.4.3](<#/doc/jls/jls-17>)) de _t_.

As ações de sincronização induzem a relação _sincroniza-com_ (synchronized-with) nas ações, definida da seguinte forma:

  * Uma ação de desbloqueio em um monitor _m_ _sincroniza-com_ todas as ações de bloqueio subsequentes em _m_ (onde "subsequente" é definido de acordo com a ordem de sincronização).

  * Uma escrita em uma variável `volatile` _v_ ([§8.3.1.4](<#/doc/jls/jls-08>)) _sincroniza-com_ todas as leituras subsequentes de _v_ por qualquer thread (onde "subsequente" é definido de acordo com a ordem de sincronização).

  * Uma ação que inicia uma thread _sincroniza-com_ a primeira ação na thread que ela inicia.

  * A escrita do valor padrão (zero, `false` ou `null`) para cada variável _sincroniza-com_ a primeira ação em cada thread.

Embora possa parecer um pouco estranho escrever um valor padrão em uma variável antes que o objeto que contém a variável seja alocado, conceitualmente todo objeto é criado no início do programa com seus valores padrão inicializados.

  * A ação final em uma thread `T1` _sincroniza-com_ qualquer ação em outra thread `T2` que detecta que `T1` terminou.

`T2` pode conseguir isso chamando `T1.isAlive()` ou `T1.join()`.

  * Se a thread `T1` interromper a thread `T2`, a interrupção por `T1` _sincroniza-com_ qualquer ponto onde qualquer outra thread (incluindo `T2`) determine que `T2` foi interrompida (por ter uma `InterruptedException` lançada ou por invocar `Thread.interrupted` ou `Thread.isInterrupted`).

A origem de uma aresta _sincroniza-com_ é chamada de _liberação_ (release), e o destino é chamado de _aquisição_ (acquire).

### 17.4.5. Ordem Happens-before

Duas ações podem ser ordenadas por uma relação _happens-before_. Se uma ação _happens-before_ outra, então a primeira é visível para e ordenada antes da segunda.

Se temos duas ações _x_ e _y_, escrevemos _hb(x, y)_ para indicar que _x happens-before y_.

  * Se _x_ e _y_ são ações da mesma thread e _x_ vem antes de _y_ na ordem de programa, então _hb(x, y)_.

  * Existe uma aresta _happens-before_ do final de um construtor de um objeto para o início de um finalizador ([§12.6](<#/doc/jls/jls-12>)) para esse objeto.

  * Se uma ação _x_ _sincroniza-com_ uma ação _y_ subsequente, então também temos _hb(x, y)_.

  * Se _hb(x, y)_ e _hb(y, z)_, então _hb(x, z)_.

Os métodos `wait` da classe `Object` ([§17.2.1](<#/doc/jls/jls-17>)) têm ações de bloqueio e desbloqueio associadas a eles; suas relações _happens-before_ são definidas por essas ações associadas.

Deve-se notar que a presença de uma relação _happens-before_ entre duas ações não implica necessariamente que elas devam ocorrer nessa ordem em uma implementação. Se a reordenação produzir resultados consistentes com uma execução legal, ela não é ilegal.

Por exemplo, a escrita de um valor padrão para cada campo de um objeto construído por uma thread não precisa acontecer antes do início dessa thread, desde que nenhuma leitura observe esse fato.

Mais especificamente, se duas ações compartilham uma relação _happens-before_, elas não precisam necessariamente parecer ter acontecido nessa ordem para qualquer código com o qual não compartilham uma relação _happens-before_. Escritas em uma thread que estão em uma condição de corrida de dados com leituras em outra thread podem, por exemplo, parecer ocorrer fora de ordem para essas leituras.

A relação _happens-before_ define quando ocorrem condições de corrida de dados.

Um conjunto de arestas de sincronização, _S_, é _suficiente_ se for o conjunto mínimo tal que o fecho transitivo de _S_ com a ordem de programa determina todas as arestas _happens-before_ na execução. Este conjunto é único.

Segue-se das definições acima que:

  * Um desbloqueio em um monitor _happens-before_ todo bloqueio subsequente nesse monitor.

  * Uma escrita em um campo `volatile` ([§8.3.1.4](<#/doc/jls/jls-08>)) _happens-before_ toda leitura subsequente desse campo.

  * Uma chamada para `start()` em uma thread _happens-before_ qualquer ação na thread iniciada.

  * Todas as ações em uma thread _happens-before_ qualquer outra thread que retorne com sucesso de um `join()` nessa thread.

  * A inicialização padrão de qualquer objeto _happens-before_ qualquer outra ação (além de escritas padrão) de um programa.

Quando um programa contém dois acessos conflitantes ([§17.4.1](<#/doc/jls/jls-17>)) que não são ordenados por uma relação happens-before, diz-se que ele contém uma _condição de corrida de dados_ (data race).

A semântica de operações que não sejam ações inter-thread, como leituras de comprimentos de array ([§10.7](<#/doc/jls/jls-10>)), execuções de casts verificados ([§5.5](<#/doc/jls/jls-05>), [§15.16](<#/doc/jls/jls-15>)), e invocações de métodos virtuais ([§15.12](<#/doc/jls/jls-15>)), não são diretamente afetadas por condições de corrida de dados.
Portanto, uma data race não pode causar comportamento incorreto, como retornar o comprimento errado para um array.

Um programa é _corretamente sincronizado_ se e somente se todas as execuções sequencialmente consistentes estiverem livres de data races.

Se um programa é corretamente sincronizado, então todas as execuções do programa parecerão ser sequencialmente consistentes ([§17.4.3](<#/doc/jls/jls-17>)).

Esta é uma garantia extremamente forte para os programadores. Os programadores não precisam raciocinar sobre reordenações para determinar que seu código contém data races. Portanto, eles não precisam raciocinar sobre reordenações ao determinar se seu código está corretamente sincronizado. Uma vez feita a determinação de que o código está corretamente sincronizado, o programador não precisa se preocupar que as reordenações afetarão seu código.

Um programa deve ser corretamente sincronizado para evitar os tipos de comportamentos contraintuitivos que podem ser observados quando o código é reordenado. O uso de sincronização correta não garante que o comportamento geral de um programa esteja correto. No entanto, seu uso permite que um programador raciocine sobre os possíveis comportamentos de um programa de maneira simples; o comportamento de um programa corretamente sincronizado é muito menos dependente de possíveis reordenações. Sem sincronização correta, comportamentos muito estranhos, confusos e contraintuitivos são possíveis.

Dizemos que uma leitura _r_ de uma variável _v_ tem permissão para observar uma escrita _w_ em _v_ se, na ordem parcial _happens-before_ do trace de execução:

  * _r_ não é ordenada antes de _w_ (ou seja, não é o caso que _hb(r, w)_), e

  * não há escrita _w_ ' interveniente em _v_ (ou seja, nenhuma escrita _w_ ' em _v_ tal que _hb(w, w')_ e _hb(w', r)_).

Informalmente, uma leitura _r_ tem permissão para ver o resultado de uma escrita _w_ se não houver uma ordenação _happens-before_ para impedir essa leitura.

Um conjunto de ações _A_ é _happens-before consistent_ se para todas as leituras _r_ em _A_ , onde _W(r)_ é a ação de escrita vista por _r_ , não for o caso que _hb(r, W(r))_ ou que exista uma escrita _w_ em _A_ tal que _w.v_ = _r.v_ e _hb(W(r), w)_ e _hb(w, r)_.

Em um conjunto de ações _happens-before consistent_ , cada leitura vê uma escrita que lhe é permitido ver pela ordenação _happens-before_.

**Exemplo 17.4.5-1. Consistência Happens-before**

Para o trace na [Tabela 17.4.5-A](<#/doc/jls/jls-17>), inicialmente `A == B == 0`. O trace pode observar `r2 == 0` e `r1 == 0` e ainda ser _happens-before consistent_ , já que existem ordens de execução que permitem que cada leitura veja a escrita apropriada.

**Tabela 17.4.5-A. Comportamento permitido pela consistência happens-before, mas não pela consistência sequencial.**

Thread 1 | Thread 2
---|---
`B = 1;` | `A = 2;`
`r2 = A;` | `r1 = B;`

Como não há sincronização, cada leitura pode ver a escrita do valor inicial ou a escrita pela outra thread. Uma ordem de execução que exibe este comportamento é:
```java
    1: B = 1;
    3: A = 2;
    2: r2 = A;  // vê escrita inicial de 0
    4: r1 = B;  // vê escrita inicial de 0
    
```

Outra ordem de execução que é happens-before consistent é:
```java
    1: r2 = A;  // vê escrita de A = 2
    3: r1 = B;  // vê escrita de B = 1
    2: B = 1;
    4: A = 2;
    
```

Nesta execução, as leituras veem escritas que ocorrem mais tarde na ordem de execução. Isso pode parecer contraintuitivo, mas é permitido pela consistência _happens-before_. Permitir que as leituras vejam escritas posteriores pode, às vezes, produzir comportamentos inaceitáveis.

### 17.4.6. Execuções

Uma execução _E_ é descrita por uma tupla < _P, A, po, so, W, V, sw, hb_ >, compreendendo:

  * _P_ - um programa

  * _A_ - um conjunto de ações

  * _po_ - ordem de programa, que para cada thread _t_ , é uma ordem total sobre todas as ações realizadas por _t_ em _A_

  * _so_ - ordem de sincronização, que é uma ordem total sobre todas as ações de sincronização em _A_

  * _W_ - uma função de escrita-vista, que para cada leitura _r_ em _A_ , fornece _W(r)_ , a ação de escrita vista por _r_ em _E_.

  * _V_ - uma função de valor-escrito, que para cada escrita _w_ em _A_ , fornece _V(w)_ , o valor escrito por _w_ em _E_.

  * _sw_ - synchronizes-with, uma ordem parcial sobre ações de sincronização

  * _hb_ - happens-before, uma ordem parcial sobre ações

Note que os elementos synchronizes-with e happens-before são determinados unicamente pelos outros componentes de uma execução e pelas regras para execuções bem-formadas ([§17.4.7](<#/doc/jls/jls-17>)).

Uma execução é _happens-before consistent_ se seu conjunto de ações for _happens-before consistent_ ([§17.4.5](<#/doc/jls/jls-17>)).

### 17.4.7. Execuções Bem-Formadas

Consideramos apenas execuções bem-formadas. Uma execução _E_ = < _P, A, po, so, W, V, sw, hb_ > é bem-formada se o seguinte for verdadeiro:

  1. Cada leitura vê uma escrita para a mesma variável na execução.

Todas as leituras e escritas de variáveis volatile são ações volatile. Para todas as leituras _r_ em _A_ , temos _W(r)_ em _A_ e _W(r).v_ = _r.v_. A variável _r.v_ é volatile se e somente se _r_ for uma leitura volatile, e a variável _w.v_ é volatile se e somente se _w_ for uma escrita volatile.

  2. A ordem happens-before é uma ordem parcial.

A ordem happens-before é dada pelo fecho transitivo das arestas synchronizes-with e da ordem de programa. Deve ser uma ordem parcial válida: reflexiva, transitiva e antissimétrica.

  3. A execução obedece à consistência intra-thread.

Para cada thread _t_ , as ações realizadas por _t_ em _A_ são as mesmas que seriam geradas por essa thread na ordem de programa em isolamento, com cada escrita _w_ escrevendo o valor _V(w)_ , dado que cada leitura _r_ vê o valor _V(W(r))_. Os valores vistos por cada leitura são determinados pelo modelo de memória. A ordem de programa dada deve refletir a ordem de programa na qual as ações seriam realizadas de acordo com a semântica intra-thread de _P_.

  4. A execução é _happens-before consistent_ ([§17.4.6](<#/doc/jls/jls-17>)).

  5. A execução obedece à consistência da ordem de sincronização.

Para todas as leituras volatile _r_ em _A_ , não é o caso que _so(r, W(r))_ ou que exista uma escrita _w_ em _A_ tal que _w.v_ = _r.v_ e _so(W(r), w)_ e _so(w, r)_.

### 17.4.8. Execuções e Requisitos de Causalidade

Usamos _f_ |_d_ para denotar a função dada pela restrição do domínio de _f_ a _d_. Para todo _x_ em _d_ , _f_ |_d_(_x_) = _f_(_x_), e para todo _x_ não em _d_ , _f_ |_d_(_x_) é indefinido.

Usamos _p_ |_d_ para representar a restrição da ordem parcial _p_ aos elementos em _d_. Para todo _x_ ,_y_ em _d_ , _p_(_x_ ,_y_) se e somente se _p_ |_d_(_x_ ,_y_). Se _x_ ou _y_ não estiverem em _d_ , então não é o caso que _p_ |_d_(_x_ ,_y_).

Uma execução bem-formada _E_ = < _P, A, po, so, W, V, sw, hb_ > é validada por _cometer_ ações de _A_. Se todas as ações em _A_ puderem ser cometidas, então a execução satisfaz os requisitos de causalidade do modelo de memória da linguagem de programação Java.

Começando com o conjunto vazio como _C 0_, realizamos uma sequência de passos onde pegamos ações do conjunto de ações _A_ e as adicionamos a um conjunto de ações cometidas _C i_ para obter um novo conjunto de ações cometidas _C i+1_. Para demonstrar que isso é razoável, para cada _C i_ precisamos demonstrar uma execução _E_ contendo _C i_ que atenda a certas condições.

Formalmente, uma execução _E satisfaz os requisitos de causalidade do modelo de memória da linguagem de programação Java_ se e somente se existirem:

  * Conjuntos de ações _C 0_, _C 1_, ... tais que:

    * _C 0_ é o conjunto vazio

    * _C i_ é um subconjunto próprio de _C i+1_

    * _A_ = ∪ (_C 0_, _C 1_, ...)

Se _A_ for finito, então a sequência _C 0_, _C 1_, ... será finita, terminando em um conjunto _C n_ = _A_.

Se _A_ for infinito, então a sequência _C 0_, _C 1_, ... pode ser infinita, e deve ser o caso que a união de todos os elementos desta sequência infinita seja igual a _A_.

  * Execuções bem-formadas _E 1_, ..., onde _E i_ = < _P, A i, poi, soi, Wi, Vi, swi, hbi_ >.

Dados esses conjuntos de ações _C 0_, ... e execuções _E 1_, ... , cada ação em _C i_ deve ser uma das ações em _E i_. Todas as ações em _C i_ devem compartilhar a mesma ordem happens-before relativa e ordem de sincronização tanto em _E i_ quanto em _E_. Formalmente:

  1. _C i_ é um subconjunto de _A i_

  2. _hb i_|_C i_ = _hb_ |_C i_

  3. _so i_|_C i_ = _so_ |_C i_

Os valores escritos pelas escritas em _C i_ devem ser os mesmos tanto em _E i_ quanto em _E_. Apenas as leituras em _C i-1_ precisam ver as mesmas escritas em _E i_ que em _E_. Formalmente:

  4. _V i_|_C i_ = _V_ |_C i_

  5. _W i_|_C i-1_ = _W_ |_C i-1_

Todas as leituras em _E i_ que não estão em _C i-1_ devem ver escritas que acontecem antes delas. Cada leitura _r_ em (_C i_ \- _C i-1_) deve ver escritas em _C i-1_ tanto em _E i_ quanto em _E_ , mas pode ver uma escrita diferente em _E i_ daquela que vê em _E_. Formalmente:

  6. Para qualquer leitura _r_ em _A i_ \- _C i-1_, temos _hb i(Wi(r), r)_

  7. Para qualquer leitura _r_ em (_C i_ \- _C i-1_), temos _W i(r)_ em _C i-1_ e _W(r)_ em _C i-1_

Dado um conjunto de arestas synchronizes-with suficientes para _E i_, se houver um par release-acquire que happens-before ([§17.4.5](<#/doc/jls/jls-17>)) uma ação que você está cometendo, então esse par deve estar presente em todos os _E j_, onde _j_ ≥ _i_. Formalmente:

  8. Seja _ssw i_ as arestas _sw i_ que também estão na redução transitiva de _hb i_ mas não em _po_. Chamamos _ssw i_ de _arestas synchronizes-with suficientes para _E i__. Se _ssw i(x, y)_ e _hb i(y, z)_ e _z_ em _C i_, então _sw j(x, y)_ para todo _j_ ≥ _i_.

Se uma ação _y_ é cometida, todas as ações externas que happens-before _y_ também são cometidas.

  9. Se _y_ está em _C i_, _x_ é uma ação externa e _hb i(x, y)_, então _x_ em _C i_.

**Exemplo 17.4.8-1. Consistência Happens-before Não É Suficiente**

A consistência happens-before é um conjunto de restrições necessário, mas não suficiente. Meramente impor a consistência happens-before permitiria comportamentos inaceitáveis - aqueles que violam os requisitos que estabelecemos para os programas. Por exemplo, a consistência happens-before permite que valores apareçam "do nada" (out of thin air). Isso pode ser visto por um exame detalhado do trace na [Tabela 17.4.8-A](<#/doc/jls/jls-17>).

**Tabela 17.4.8-A. Consistência happens-before não é suficiente**

Thread 1 | Thread 2
---|---
`r1 = x;` | `r2 = y;`
`if (r1 != 0) y = 1;` | `if (r2 != 0) x = 1;`

O código mostrado na [Tabela 17.4.8-A](<#/doc/jls/jls-17>) está corretamente sincronizado. Isso pode parecer surpreendente, já que ele não realiza nenhuma ação de sincronização. Lembre-se, no entanto, que um programa é corretamente sincronizado se, quando executado de maneira sequencialmente consistente, não houver data races. Se este código for executado de forma sequencialmente consistente, cada ação ocorrerá na ordem do programa, e nenhuma das escritas ocorrerá. Como nenhuma escrita ocorre, não pode haver data races: o programa está corretamente sincronizado.

Como este programa está corretamente sincronizado, os únicos comportamentos que podemos permitir são comportamentos sequencialmente consistentes. No entanto, existe uma execução deste programa que é happens-before consistent, mas não sequencialmente consistente:
```java
    r1 = x;  // vê escrita de x = 1
    y = 1;
    r2 = y;  // vê escrita de y = 1
    x = 1;
    
```

Este resultado é happens-before consistent: não há relação happens-before que o impeça de ocorrer. No entanto, é claramente inaceitável: não há execução sequencialmente consistente que resultaria neste comportamento. O fato de permitirmos que uma leitura veja uma escrita que vem mais tarde na ordem de execução pode, às vezes, resultar em comportamentos inaceitáveis.

Embora permitir que as leituras vejam escritas que vêm mais tarde na ordem de execução seja às vezes indesejável, também é às vezes necessário. Como vimos acima, o trace na [Tabela 17.4.5-A](<#/doc/jls/jls-17>) exige que algumas leituras vejam escritas que ocorrem mais tarde na ordem de execução. Como as leituras vêm primeiro em cada thread, a primeira ação na ordem de execução deve ser uma leitura. Se essa leitura não puder ver uma escrita que ocorre mais tarde, então ela não poderá ver nenhum valor além do valor inicial para a variável que lê. Isso claramente não reflete todos os comportamentos.

Referimo-nos à questão de quando as leituras podem ver escritas futuras como _causalidade_ , devido a problemas que surgem em casos como o encontrado na [Tabela 17.4.8-A](<#/doc/jls/jls-17>). Nesse caso, as leituras causam as escritas, e as escritas causam as leituras. Não há uma "primeira causa" para as ações. Nosso modelo de memória, portanto, precisa de uma maneira consistente de determinar quais leituras podem ver escritas cedo.

Exemplos como o encontrado na [Tabela 17.4.8-A](<#/doc/jls/jls-17>) demonstram que a especificação deve ser cuidadosa ao declarar se uma leitura pode ver uma escrita que ocorre mais tarde na execução (tendo em mente que se uma leitura vê uma escrita que ocorre mais tarde na execução, isso representa o fato de que a escrita é realmente realizada cedo).

O modelo de memória recebe como entrada uma dada execução e um programa, e determina se essa execução é uma execução legal do programa. Ele faz isso construindo gradualmente um conjunto de ações "cometidas" que refletem quais ações foram executadas pelo programa. Geralmente, a próxima ação a ser cometida refletirá a próxima ação que pode ser realizada por uma execução sequencialmente consistente. No entanto, para refletir leituras que precisam ver escritas posteriores, permitimos que algumas ações sejam cometidas antes de outras ações que happens-before elas.

Obviamente, algumas ações podem ser cometidas cedo e outras não. Se, por exemplo, uma das escritas na [Tabela 17.4.8-A](<#/doc/jls/jls-17>) fosse cometida antes da leitura dessa variável, a leitura poderia ver a escrita, e o resultado "do nada" (out-of-thin-air) poderia ocorrer. Informalmente, permitimos que uma ação seja cometida cedo se soubermos que a ação pode ocorrer sem assumir que uma data race ocorre. Na [Tabela 17.4.8-A](<#/doc/jls/jls-17>), não podemos realizar nenhuma das escritas cedo, porque as escritas não podem ocorrer a menos que as leituras vejam o resultado de uma data race.

### 17.4.9. Comportamento Observável e Execuções Não Terminantes

Para programas que sempre terminam em algum período de tempo finito e limitado, seu comportamento pode ser entendido (informalmente) simplesmente em termos de suas execuções permitidas. Para programas que podem falhar em terminar em uma quantidade limitada de tempo, surgem questões mais sutis.

O comportamento observável de um programa é definido pelos conjuntos finitos de ações externas que o programa pode realizar. Um programa que, por exemplo, simplesmente imprime "Hello" para sempre é descrito por um conjunto de comportamentos que, para qualquer inteiro não negativo _i_ , inclui o comportamento de imprimir "Hello" _i_ vezes.

A terminação não é explicitamente modelada como um comportamento, mas um programa pode ser facilmente estendido para gerar uma ação externa adicional _executionTermination_ que ocorre quando todas as threads terminaram.

Também definimos uma ação especial de _hang_. Se o comportamento é descrito por um conjunto de ações externas incluindo uma ação de _hang_, isso indica um comportamento onde, após as ações externas serem observadas, o programa pode rodar por um tempo ilimitado sem realizar nenhuma ação externa adicional ou terminar. Programas podem entrar em _hang_ se todas as threads estiverem bloqueadas ou se o programa puder realizar um número ilimitado de ações sem realizar nenhuma ação externa.

Uma thread pode ser bloqueada em uma variedade de circunstâncias, como quando está tentando adquirir um lock ou realizar uma ação externa (como uma leitura) que depende de dados externos.

Uma execução pode resultar em uma thread sendo bloqueada indefinidamente e a execução não terminando. Nesses casos, as ações geradas pela thread bloqueada devem consistir em todas as ações geradas por essa thread até e incluindo a ação que causou o bloqueio da thread, e nenhuma ação que seria gerada pela thread após essa ação.

Para raciocinar sobre comportamentos observáveis, precisamos falar sobre conjuntos de ações observáveis.

Se _O_ é um conjunto de ações observáveis para uma execução _E_ , então o conjunto _O_ deve ser um subconjunto das ações de _E_ , _A_ , e deve conter apenas um número finito de ações, mesmo que _A_ contenha um número infinito de ações. Além disso, se uma ação _y_ está em _O_ , e _hb(x, y)_ ou _so(x, y)_ , então _x_ está em _O_.

Note que um conjunto de ações observáveis não se restringe a ações externas. Em vez disso, apenas as ações externas que estão em um conjunto de ações observáveis são consideradas ações externas observáveis.

Um comportamento _B_ é um comportamento permitido de um programa _P_ se e somente se _B_ for um conjunto finito de ações externas e, ou:

  * Existe uma execução _E_ de _P_ , e um conjunto _O_ de ações observáveis para _E_ , e _B_ é o conjunto de ações externas em _O_ (Se quaisquer threads em _E_ terminarem em um estado bloqueado e _O_ contiver todas as ações em _E_ , então _B_ também pode conter uma ação de _hang_); ou

  * Existe um conjunto _O_ de ações tal que _B_ consiste em uma ação de _hang_ mais todas as ações externas em _O_ e para todo _k_ ≥ | _O_ |, existe uma execução _E_ de _P_ com ações _A_ , e existe um conjunto de ações _O_ ' tal que:

    * Ambos _O_ e _O_ ' são subconjuntos de _A_ que cumprem os requisitos para conjuntos de ações observáveis.

    * _O_ ⊆ _O_ ' ⊆ _A_

    * | _O_ ' | ≥ _k_

    * _O_ ' - _O_ não contém ações externas

Note que um comportamento _B_ não descreve a ordem em que as ações externas em _B_ são observadas, mas outras restrições (internas) sobre como as ações externas são geradas e realizadas podem impor tais restrições.
## 17.5. Semântica de Campos `final`

Campos declarados `final` são inicializados uma vez, mas nunca alterados em circunstâncias normais. A semântica detalhada dos campos `final` é um tanto diferente da dos campos normais. Em particular, os compiladores têm grande liberdade para mover leituras de campos `final` através de barreiras de sincronização e chamadas para métodos arbitrários ou desconhecidos. Correspondentemente, os compiladores podem manter o valor de um campo `final` em cache em um registrador e não recarregá-lo da memória em situações onde um campo não-`final` teria que ser recarregado.

Campos `final` também permitem que os programadores implementem objetos imutáveis thread-safe sem sincronização. Um objeto imutável thread-safe é visto como imutável por todas as threads, mesmo que uma data race seja usada para passar referências ao objeto imutável entre threads. Isso pode fornecer garantias de segurança contra o uso indevido de uma classe imutável por código incorreto ou malicioso. Campos `final` devem ser usados corretamente para fornecer uma garantia de imutabilidade.

Um objeto é considerado _completamente inicializado_ quando seu construtor termina. Uma thread que só pode ver uma referência a um objeto depois que esse objeto foi completamente inicializado tem a garantia de ver os valores corretamente inicializados para os campos `final` desse objeto.

O modelo de uso para campos `final` é simples: Defina os campos `final` para um objeto no construtor desse objeto; e não escreva uma referência ao objeto que está sendo construído em um local onde outra thread possa vê-lo antes que o construtor do objeto seja finalizado. Se isso for seguido, então quando o objeto for visto por outra thread, essa thread sempre verá a versão corretamente construída dos campos `final` desse objeto. Ela também verá versões de qualquer objeto ou array referenciado por esses campos `final` que estejam pelo menos tão atualizadas quanto os campos `final`.

**Exemplo 17.5-1. Campos `final` No Modelo de Memória Java**

O programa abaixo ilustra como os campos `final` se comparam aos campos normais.
```java
    class FinalFieldExample {
        final int x;
        int y;
        static FinalFieldExample f;
    
        public FinalFieldExample() {
            x = 3;
            y = 4;
        }
    
        static void writer() {
            f = new FinalFieldExample();
        }
    
        static void reader() {
            if (f != null) {
                int i = f.x;  // guaranteed to see 3
                int j = f.y;  // could see 0
            }
        }
    }
    
```

A classe `FinalFieldExample` possui um campo `int` `final` `x` e um campo `int` não-`final` `y`. Uma thread pode executar o método `writer` e outra pode executar o método `reader`.

Como o método `writer` escreve `f` _depois_ que o construtor do objeto termina, o método `reader` terá a garantia de ver o valor corretamente inicializado para `f.x`: ele lerá o valor `3`. No entanto, `f.y` não é `final`; o método `reader` não tem, portanto, a garantia de ver o valor `4` para ele.

**Exemplo 17.5-2. Campos `final` Para Segurança**

Campos `final` são projetados para permitir as garantias de segurança necessárias. Considere o seguinte programa. Uma thread (que chamaremos de thread 1) executa:
```java
    Global.s = "/tmp/usr".substring(4);
    
```

enquanto outra thread (thread 2) executa
```java
    String myS = Global.s;
    if (myS.equals("/tmp"))System.out.println(myS);
    
```

Objetos `String` são destinados a serem imutáveis e operações de string não realizam sincronização. Embora a implementação de `String` não tenha nenhuma data race, outro código poderia ter data races envolvendo o uso de objetos `String`, e o modelo de memória oferece garantias fracas para programas que têm data races. Em particular, se os campos da classe `String` não fossem `final`, então seria possível (embora improvável) que a thread 2 pudesse inicialmente ver o valor padrão de `0` para o offset do objeto string, permitindo que ele fosse comparado como igual a "`/tmp`". Uma operação posterior no objeto `String` poderia ver o offset correto de `4`, de modo que o objeto `String` fosse percebido como sendo "`/usr`". Muitos recursos de segurança da linguagem de programação Java dependem de objetos `String` serem percebidos como verdadeiramente imutáveis, mesmo que código malicioso esteja usando data races para passar referências de `String` entre threads.

### 17.5.1. Semântica de Campos `final`

Seja _o_ um objeto, e _c_ um construtor para _o_ no qual um campo `final` _f_ é escrito. Uma ação de _congelamento_ (freeze) no campo `final` _f_ de _o_ ocorre quando _c_ é encerrado, seja normalmente ou abruptamente.

Note que se um construtor invoca outro construtor, e o construtor invocado define um campo `final`, o congelamento para o campo `final` ocorre no final do construtor invocado.

Para cada execução, o comportamento das leituras é influenciado por duas ordens parciais adicionais, a cadeia de desreferência _dereferences()_ e a cadeia de memória _mc()_, que são consideradas parte da execução (e, portanto, fixas para qualquer execução particular). Essas ordens parciais devem satisfazer as seguintes restrições (que não precisam ter uma solução única):

*   Cadeia de Desreferência: Se uma ação _a_ é uma leitura ou escrita de um campo ou elemento de um objeto _o_ por uma thread _t_ que não inicializou _o_, então deve existir alguma leitura _r_ pela thread _t_ que vê o endereço de _o_ tal que _r_ _dereferences(r, a)_.

*   Cadeia de Memória: Existem várias restrições na ordenação da cadeia de memória:

    *   Se _r_ é uma leitura que vê uma escrita _w_, então deve ser o caso que _mc(w, r)_.

    *   Se _r_ e _a_ são ações tais que _dereferences(r, a)_, então deve ser o caso que _mc(r, a)_.

    *   Se _w_ é uma escrita do endereço de um objeto _o_ por uma thread _t_ que não inicializou _o_, então deve existir alguma leitura _r_ pela thread _t_ que vê o endereço de _o_ tal que _mc(r, w)_.

Dada uma escrita _w_, um congelamento _f_, uma ação _a_ (que não é uma leitura de um campo `final`), uma leitura _r 1_ do campo `final` congelado por _f_, e uma leitura _r 2_ tal que _hb(w, f)_, _hb(f, a)_, _mc(a, r 1)_, e _dereferences(r 1, r2)_, então ao determinar quais valores podem ser vistos por _r 2_, consideramos _hb(w, r 2)_. (Esta ordenação _happens-before_ não se fecha transitivamente com outras ordenações _happens-before_.)

Note que a ordem _dereferences_ é reflexiva, e _r 1_ pode ser o mesmo que _r 2_.

Para leituras de campos `final`, as únicas escritas que são consideradas anteriores à leitura do campo `final` são aquelas derivadas através da semântica do campo `final`.

### 17.5.2. Lendo Campos `final` Durante a Construção

Uma leitura de um campo `final` de um objeto dentro da thread que constrói esse objeto é ordenada em relação à inicialização desse campo dentro do construtor pelas regras usuais de _happens-before_. Se a leitura ocorrer depois que o campo é definido no construtor, ela vê o valor atribuído ao campo `final`, caso contrário, ela vê o valor padrão.

### 17.5.3. Modificação Subsequente de Campos `final`

Em alguns casos, como a desserialização, o sistema precisará alterar os campos `final` de um objeto após a construção. Campos `final` podem ser alterados via reflection e outros meios dependentes da implementação. O único padrão em que isso tem semântica razoável é aquele em que um objeto é construído e, em seguida, os campos `final` do objeto são atualizados. O objeto não deve ser tornado visível para outras threads, nem os campos `final` devem ser lidos, até que todas as atualizações dos campos `final` do objeto estejam completas. Congelamentos de um campo `final` ocorrem tanto no final do construtor em que o campo `final` é definido, quanto imediatamente após cada modificação de um campo `final` via reflection ou outro mecanismo especial.

Mesmo assim, há uma série de complicações. Se um campo `final` é inicializado com uma expressão constante ([§15.29](<#/doc/jls/jls-15>)) na declaração do campo, as alterações no campo `final` podem não ser observadas, uma vez que os usos desse campo `final` são substituídos em tempo de compilação pelo valor da expressão constante.

Outro problema é que a especificação permite otimização agressiva de campos `final`. Dentro de uma thread, é permitido reordenar leituras de um campo `final` com aquelas modificações de um campo `final` que não ocorrem no construtor.

**Exemplo 17.5.3-1. Otimização Agressiva de Campos `final`
```java
    class A {
        final int x;
        A() {
            x = 1;
        }
    
        int f() {
            return d(this,this);
        }
    
        int d(A a1, A a2) {
            int i = a1.x;
            g(a1);
            int j = a2.x;
            return j - i;
        }
    
        static void g(A a) {
            // uses reflection to change a.x to 2
        }
    }
    
```

No método `d`, o compilador pode reordenar livremente as leituras de `x` e a chamada para `g`. Assim, `new A().f()` poderia retornar `-1`, `0` ou `1`.

Uma implementação pode fornecer uma maneira de executar um bloco de código em um _contexto seguro para campos `final`_ (`final`-field-safe context). Se um objeto é construído dentro de um contexto seguro para campos `final`, as leituras de um campo `final` desse objeto não serão reordenadas com modificações desse campo `final` que ocorrem dentro desse contexto seguro para campos `final`.

Um contexto seguro para campos `final` possui proteções adicionais. Se uma thread viu uma referência incorretamente publicada para um objeto que permite à thread ver o valor padrão de um campo `final`, e então, dentro de um contexto seguro para campos `final`, lê uma referência corretamente publicada para o objeto, ela terá a garantia de ver o valor correto do campo `final`. No formalismo, o código executado dentro de um contexto seguro para campos `final` é tratado como uma thread separada (apenas para os propósitos da semântica de campos `final`).

Em uma implementação, um compilador não deve mover um acesso a um campo `final` para dentro ou para fora de um contexto seguro para campos `final` (embora possa ser movido em torno da execução de tal contexto, desde que o objeto não seja construído dentro desse contexto).

Um local onde o uso de um contexto seguro para campos `final` seria apropriado é em um executor ou pool de threads. Ao executar cada `Runnable` em um contexto seguro para campos `final` separado, o executor poderia garantir que o acesso incorreto por um `Runnable` a um objeto _o_ não removerá as garantias de campo `final` para outros `Runnable`s tratados pelo mesmo executor.

### 17.5.4. Campos Protegidos Contra Escrita

Normalmente, um campo que é `final` e `static` não pode ser modificado. No entanto, `System.in`, `System.out` e `System.err` são campos `static` `final` que, por razões de legado, devem ter permissão para serem alterados pelos métodos `System.setIn`, `System.setOut` e `System.setErr`. Referimo-nos a esses campos como sendo _protegidos contra escrita_ (write-protected) para distingui-los dos campos `final` comuns.

O compilador precisa tratar esses campos de forma diferente de outros campos `final`. Por exemplo, uma leitura de um campo `final` comum é "imune" à sincronização: a barreira envolvida em um lock ou leitura `volatile` não precisa afetar o valor lido de um campo `final`. Como o valor dos campos protegidos contra escrita pode ser visto como alterável, os eventos de sincronização devem ter um efeito sobre eles. Portanto, a semântica dita que esses campos sejam tratados como campos normais que não podem ser alterados por código de usuário, a menos que esse código de usuário esteja na classe `System`.

## 17.6. Word Tearing

Uma consideração para as implementações da Java Virtual Machine é que cada campo e elemento de array é considerado distinto; atualizações em um campo ou elemento não devem interagir com leituras ou atualizações de qualquer outro campo ou elemento. Em particular, duas threads que atualizam elementos adjacentes de um array de bytes separadamente não devem interferir ou interagir e não precisam de sincronização para garantir a consistência sequencial.

Alguns processadores não fornecem a capacidade de escrever em um único byte. Seria ilegal implementar atualizações de array de bytes em tal processador simplesmente lendo uma palavra inteira, atualizando o byte apropriado e, em seguida, escrevendo a palavra inteira de volta para a memória. Este problema é às vezes conhecido como _word tearing_, e em processadores que não conseguem atualizar facilmente um único byte isoladamente, alguma outra abordagem será necessária.

**Exemplo 17.6-1. Detecção de Word Tearing**

O programa a seguir é um caso de teste para detectar word tearing:
```java
    public class WordTearing extends Thread {
        static final int LENGTH = 8;
        static final int ITERS  = 1000000;
        static byte[] counts    = new byte[LENGTH];
        static Thread[] threads = new Thread[LENGTH];
    
        final int id;
        WordTearing(int i) {
            id = i;
        }
    
        public void run() {
            byte v = 0;
            for (int i = 0; i < ITERS; i++) {
                byte v2 = counts[id];
                if (v != v2) {
                    System.err.println("Word-Tearing found: " +
                                  "counts[" + id + "] = "+ v2 +
                                  ", should be " + v);
                    return;
                }
                v++;
                counts[id] = v;
            }
        }
    
        public static void main(String[] args) {
            for (int i = 0; i < LENGTH; ++i)
                (threads[i] = new WordTearing(i)).start();
        }
    }
    
```

Isso ressalta que os bytes não devem ser sobrescritos por escritas em bytes adjacentes.

## 17.7. Tratamento Não Atômico de `double` e `long`

Para os propósitos do modelo de memória da linguagem de programação Java, uma única escrita em um valor `long` ou `double` não-`volatile` é tratada como duas escritas separadas: uma para cada metade de 32 bits. Isso pode resultar em uma situação onde uma thread vê os primeiros 32 bits de um valor de 64 bits de uma escrita, e os segundos 32 bits de outra escrita.

Escritas e leituras de valores `long` e `double` `volatile` são sempre atômicas.

Escritas e leituras de referências são sempre atômicas, independentemente de serem implementadas como valores de 32 ou 64 bits.

Algumas implementações podem achar conveniente dividir uma única ação de escrita em um valor `long` ou `double` de 64 bits em duas ações de escrita em valores adjacentes de 32 bits. Por uma questão de eficiência, este comportamento é específico da implementação; uma implementação da Java Virtual Machine é livre para realizar escritas em valores `long` e `double` atomicamente ou em duas partes.

As implementações da Java Virtual Machine são encorajadas a evitar a divisão de valores de 64 bits sempre que possível. Os programadores são encorajados a declarar valores compartilhados de 64 bits como `volatile` ou a sincronizar seus programas corretamente para evitar possíveis complicações.

* * *

[Prev](<#/doc/jls/jls-16>) | | [Next](<#/doc/jls/jls-18>)
---|---|---
Capítulo 16. Atribuição Definida | [Home](<#/doc/jls/jls-01>) | Capítulo 18. Inferência de Tipo

* * *

[ Aviso Legal ](<#/>)