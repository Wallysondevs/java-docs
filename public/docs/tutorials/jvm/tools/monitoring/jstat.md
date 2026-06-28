# Jstat - Monitorando as Estatísticas das suas JVMs

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Monitoramento ](<#/doc/tutorials/jvm/tools/monitoring>) > Jstat - Monitorando as Estatísticas das suas JVMs

**Anterior na Série**

[Jps - Listando suas JVMs Instrumentadas](<#/doc/tutorials/jvm/tools/monitoring/jps>)

➜

**Tutorial Atual**

Jstat - Monitorando as Estatísticas das suas JVMs

➜

**Próximo na Série**

[Jstatd - Monitorando a Criação e Término das Suas JVMs](<#/doc/tutorials/jvm/tools/monitoring/jstatd>)

**Anterior na Série:** [Jps - Listando suas JVMs Instrumentadas](<#/doc/tutorials/jvm/tools/monitoring/jps>)

**Próximo na Série:** [Jstatd - Monitorando a Criação e Término das Suas JVMs](<#/doc/tutorials/jvm/tools/monitoring/jstatd>)

# Jstat - Monitorando as Estatísticas das suas JVMs

## Introduzindo Jstat

[jstat](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jstat.html>) - monitora estatísticas da JVM

## Sinopse

**Nota:** Este comando é experimental e não suportado.

_generalOptions_

Uma única opção geral de linha de comando. Veja Opções Gerais.

_outputOptions_

Uma opção reportada pela opção `-options`. Uma ou mais opções de saída que consistem em uma única `statOption`, mais qualquer uma das opções `-t`, `-h` e `-J`. Veja Opções de Saída para o Comando jstat.

`-t`

Exibe uma coluna de carimbo de data/hora como a primeira coluna da saída. O carimbo de data/hora é o tempo desde o início da JVM de destino.

`-h` _n_

Exibe um cabeçalho de coluna a cada _n_ amostras (linhas de saída), onde _n_ é um inteiro positivo. O valor padrão é `0`, que exibe o cabeçalho da coluna da primeira linha de dados.

_vmid_

Um identificador de máquina virtual, que é uma string que indica a JVM de destino. Veja Identificador de Máquina Virtual.

_interval_

O intervalo de amostragem nas unidades especificadas, segundos (s) ou milissegundos (ms). As unidades padrão são milissegundos. Deve ser um inteiro positivo. Quando especificado, o comando `jstat` produz sua saída a cada intervalo.

_count_

O número de amostras a serem exibidas. O valor padrão é infinito, o que faz com que o comando `jstat` exiba estatísticas até que a JVM de destino seja encerrada ou o comando `jstat` seja encerrado. Este valor deve ser um inteiro positivo.

## Descrição

O comando `jstat` exibe estatísticas de desempenho para uma Java HotSpot VM instrumentada. A JVM de destino é identificada pelo seu identificador de máquina virtual, ou opção `vmid`.

O comando `jstat` suporta dois tipos de opções: opções gerais e opções de saída. As opções gerais fazem com que o comando `jstat` exiba informações simples de uso e versão. As opções de saída determinam o conteúdo e o formato da saída estatística.

Todas as opções e suas funcionalidades estão sujeitas a alterações ou remoção em futuras versões.

## Opções Gerais

Se você especificar uma das opções gerais, não poderá especificar nenhuma outra opção ou parâmetro.

`-help`

Exibe uma mensagem de ajuda.

`-options`

Exibe uma lista de opções estáticas. Veja Opções de Saída para o Comando jstat.

## Opções de Saída para o Comando Jstat

Se você não especificar uma opção geral, poderá especificar opções de saída. As opções de saída determinam o conteúdo e o formato da saída do comando `jstat`, e consistem em uma única `statOption`, mais qualquer uma das outras opções de saída (`-h`, `-t` e `-J`). A `statOption` deve vir primeiro.

A saída é formatada como uma tabela, com colunas separadas por espaços. Uma linha de cabeçalho com títulos descreve as colunas. Use a opção `-h` para definir a frequência com que o cabeçalho é exibido. Os nomes dos cabeçalhos das colunas são consistentes entre as diferentes opções. Em geral, se duas opções fornecem uma coluna com o mesmo nome, a fonte de dados para as duas colunas é a mesma.

Use a opção `-t` para exibir uma coluna de carimbo de data/hora, rotulada Timestamp como a primeira coluna da saída. A coluna Timestamp contém o tempo decorrido, em segundos, desde o início da JVM de destino. A resolução do carimbo de data/hora depende de vários fatores e está sujeita a variações devido ao agendamento atrasado de threads em sistemas com alta carga.

Use os parâmetros _interval_ e _count_ para determinar com que frequência e quantas vezes, respectivamente, o comando `jstat` exibe sua saída.

**Nota:**

Não escreva scripts para analisar a saída do comando `jstat` porque o formato pode mudar em futuras versões. Se você escrever scripts que analisam a saída do comando `jstat`, espere modificá-los para futuras versões desta ferramenta.

`-statOption`

Determina as informações estatísticas que o comando `jstat` exibe. A seguir, são listadas as opções disponíveis. Use a opção geral `-options` para exibir a lista de opções para uma instalação de plataforma específica. Veja Opções de Estatísticas e Saída.

`class`: Exibe estatísticas sobre o comportamento do carregador de classes.

`compiler`: Exibe estatísticas sobre o comportamento do compilador Just-in-Time da Java HotSpot VM.

`gc`: Exibe estatísticas sobre o comportamento do heap coletado pelo garbage collector.

`gccapacity`: Exibe estatísticas sobre as capacidades das gerações e seus espaços correspondentes.

`gccause`: Exibe um resumo das estatísticas de garbage collection (o mesmo que `-gcutil`), com a causa dos eventos de garbage collection mais recente e atual (quando aplicável).

`gcnew`: Exibe estatísticas sobre o comportamento da geração nova.

`gcnewcapacity`: Exibe estatísticas sobre os tamanhos das gerações novas e seus espaços correspondentes.

`gcold`: Exibe estatísticas sobre o comportamento da geração antiga e estatísticas do metaspace.

`gcoldcapacity`: Exibe estatísticas sobre os tamanhos da geração antiga.

`gcmetacapacity`: Exibe estatísticas sobre os tamanhos do metaspace.

`gcutil`: Exibe um resumo das estatísticas de garbage collection.

`printcompilation`: Exibe estatísticas de métodos de compilação da Java HotSpot VM.

`-J` _javaOption_

Passa _javaOption_ para o lançador de aplicativos Java. Por exemplo, `-J-Xms48m` define a memória inicial para 48 MB. Para uma lista completa de opções, veja [java](<#/doc/tutorials/jvm/tools/core/java>).

## Opções de Estatísticas e Saída

As informações a seguir resumem as colunas que o comando `jstat` exibe para cada _statOption_.

`-class` _option_

Estatísticas do carregador de classes.

`-compiler` _option_

Estatísticas do compilador Just-in-Time da Java HotSpot VM.

`-gc` _option_

Estatísticas do heap coletado pelo garbage collector.

`-gccapacity` _option_

Capacidades de geração e espaço do pool de memória.

`-gccause` _option_

Esta opção exibe o mesmo resumo das estatísticas de garbage collection que a opção `-gcutil`, mas inclui as causas do último evento de garbage collection e (quando aplicável), do evento de garbage collection atual. Além das colunas listadas para `-gcutil`, esta opção adiciona as seguintes colunas:

`-gcnew` _option_

Estatísticas da geração nova.

`-gcnewcapacity` _option_

Estatísticas de tamanho do espaço da geração nova.

`-gcold` _option_

Estatísticas de tamanho da geração antiga.

`-gcoldcapacity` _option_

Estatísticas da geração antiga.

`-gcmetacapacity` _option_

Estatísticas de tamanho do metaspace.

`-gcutil` _option_

Resumo das estatísticas de garbage collection.

`-printcompilation` _option_

Estatísticas de métodos do compilador da Java HotSpot VM.

## Identificador de Máquina Virtual

A sintaxe da string `vmid` corresponde à sintaxe de uma URI:

A sintaxe da string `vmid` corresponde à sintaxe de uma URI. A string `vmid` pode variar de um inteiro simples que representa uma JVM local a uma construção mais complexa que especifica um protocolo de comunicação, número de porta e outros valores específicos da implementação.

_protocol_

O protocolo de comunicação. Se o valor _protocol_ for omitido e um nome de host não for especificado, o protocolo padrão é um protocolo local otimizado específico da plataforma. Se o valor _protocol_ for omitido e um nome de host for especificado, o protocolo padrão é `rmi`.

_lvmid_

O identificador de máquina virtual local para a JVM de destino. O _lvmid_ é um valor específico da plataforma que identifica unicamente uma JVM em um sistema. O _lvmid_ é o único componente obrigatório de um identificador de máquina virtual. O _lvmid_ é tipicamente, mas não necessariamente, o identificador de processo do sistema operacional para o processo da JVM de destino. Você pode usar o comando `jps` para determinar o _lvmid_, desde que o processo da JVM não esteja sendo executado em uma instância docker separada. Você também pode determinar o _lvmid_ nas plataformas Linux e OS X com o comando `ps`, e no Windows com o Gerenciador de Tarefas do Windows.

_hostname_

Um nome de host ou endereço IP que indica o host de destino. Se o valor _hostname_ for omitido, o host de destino é o host local.

_port_

A porta padrão para comunicação com o servidor remoto. Se o valor _hostname_ for omitido ou o valor _protocol_ especificar um protocolo local otimizado, o valor _port_ será ignorado. Caso contrário, o tratamento do parâmetro _port_ é específico da implementação. Para o protocolo `rmi` padrão, o valor _port_ indica o número da porta para o `rmiregistry` no host remoto. Se o valor _port_ for omitido e o valor _protocol_ indicar `rmi`, a porta padrão do `rmiregistry` (1099) será usada.

_servername_

O tratamento do parâmetro _servername_ depende da implementação. Para o protocolo local otimizado, este campo é ignorado. Para o protocolo `rmi`, ele representa o nome do objeto remoto RMI no host remoto.

## Exemplos

Esta seção apresenta alguns exemplos de monitoramento de uma JVM local com um _lvmid_ de 21891.

## A Opção Gcutil

Este exemplo se conecta ao _lvmid_ 21891 e coleta 7 amostras em intervalos de 250 milissegundos, exibindo a saída conforme especificado pela opção `-gcutil`.

A saída deste exemplo mostra que uma coleta da geração jovem (young generation collection) ocorreu entre a terceira e a quarta amostra. A coleta levou 0.078 segundos e promoveu objetos do eden space (E) para o old space (O), resultando em um aumento da utilização do old space de 66.80% para 68.19%. Antes da coleta, o survivor space estava 97.02% utilizado, mas após esta coleta, está 91.03% utilizado.

## Repetir a String do Cabeçalho da Coluna

Este exemplo se conecta ao _lvmid_ 21891 e coleta amostras em intervalos de 250 milissegundos, exibindo a saída conforme especificado pela opção `-gcnew`. Além disso, ele usa a opção `-h3` para exibir o cabeçalho da coluna a cada 3 linhas de dados.

Além de mostrar a string de cabeçalho repetida, este exemplo mostra que entre a segunda e a terceira amostras, ocorreu um young GC. Sua duração foi de 0.001 segundos. A coleta encontrou dados ativos suficientes para que a utilização do survivor space 0 (S0U) excedesse o tamanho desejado do survivor (DSS). Como resultado, objetos foram promovidos para a geração antiga (não visível nesta saída), e o tenuring threshold (TT) foi reduzido de 31 para 2.

Outra coleta ocorre entre a quinta e a sexta amostras. Esta coleta encontrou muito poucos sobreviventes e retornou o tenuring threshold para 31.

## Incluir um Carimbo de Data/Hora para Cada Amostra

Este exemplo se conecta ao _lvmid_ 21891 e coleta 3 amostras em intervalos de 250 milissegundos. A opção `-t` é usada para gerar um carimbo de data/hora para cada amostra na primeira coluna.

A coluna Timestamp reporta o tempo decorrido em segundos desde o início da JVM de destino. Além disso, a saída `-gcoldcapacity` mostra a capacidade da geração antiga (OGC) e a capacidade do old space (OC) aumentando à medida que o heap se expande para atender às demandas de alocação ou promoção. A capacidade da geração antiga (OGC) cresceu de 11.696 KB para 13.820 KB após a octogésima primeira full garbage collection (FGC). A capacidade máxima da geração (e do espaço) é de 60.544 KB (OGCMX), então ainda há espaço para expandir.

## Monitorar Instrumentação para uma JVM Remota

Este exemplo se conecta ao _lvmid_ 40496 no sistema chamado `remote.domain` usando a opção `-gcutil`, com amostras coletadas a cada segundo indefinidamente.

O _lvmid_ é combinado com o nome do host remoto para construir um _vmid_ de `[email protected]`. Este _vmid_ resulta no uso do protocolo `rmi` para se comunicar com o servidor `jstatd` padrão no host remoto. O servidor `jstatd` é localizado usando o comando `rmiregistry` em `remote.domain` que está vinculado à porta padrão do comando `rmiregistry` (porta 1099).

### Neste tutorial

Introduzindo Jstat Sinopse Descrição Opções Gerais Opções de Saída para o Comando Jstat Opções de Estatísticas e Saída Identificador de Máquina Virtual Exemplos A Opção Gcutil Repetir a String do Cabeçalho da Coluna Incluir um Carimbo de Data/Hora para Cada Amostra Monitorar Instrumentação para uma JVM Remota

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Jps - Listando suas JVMs Instrumentadas](<#/doc/tutorials/jvm/tools/monitoring/jps>)

➜

**Tutorial Atual**

Jstat - Monitorando as Estatísticas das suas JVMs

➜

**Próximo na Série**

[Jstatd - Monitorando a Criação e Término das Suas JVMs](<#/doc/tutorials/jvm/tools/monitoring/jstatd>)

**Anterior na Série:** [Jps - Listando suas JVMs Instrumentadas](<#/doc/tutorials/jvm/tools/monitoring/jps>)

**Próximo na Série:** [Jstatd - Monitorando a Criação e Término das Suas JVMs](<#/doc/tutorials/jvm/tools/monitoring/jstatd>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Monitoramento ](<#/doc/tutorials/jvm/tools/monitoring>) > Jstat - Monitorando as Estatísticas das suas JVMs