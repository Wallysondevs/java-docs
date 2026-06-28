# O Comando jstat

## Nome

jstat - monitora estatísticas da JVM

## Sinopse

**Nota:** Este comando é experimental e não suportado.

`jstat` _generalOptions_

`jstat` _outputOptions_ [`-t`] [`-h` _lines_] _vmid_ [_interval_ [_count_]]

_generalOptions_
     Uma única opção geral de linha de comando. Veja Opções Gerais.
_outputOptions_
     Uma opção reportada pela opção `-options`. Uma ou mais opções de saída que consistem em uma única `statOption`, mais qualquer uma das opções `-t`, `-h` e `-J`. Veja Opções de Saída para o Comando jstat.
`-t`
     Exibe uma coluna de carimbo de data/hora como a primeira coluna da saída. O carimbo de data/hora é o tempo desde o início da JVM alvo.
`-h` _n_
     Exibe um cabeçalho de coluna a cada _n_ amostras (linhas de saída), onde _n_ é um inteiro positivo. O valor padrão é `0`, que exibe o cabeçalho da coluna da primeira linha de dados.
_vmid_
     Um identificador de máquina virtual, que é uma string que indica a JVM alvo. Veja Identificador de Máquina Virtual.
_interval_
     O intervalo de amostragem nas unidades especificadas, segundos (s) ou milissegundos (ms). As unidades padrão são milissegundos. Deve ser um inteiro positivo. Quando especificado, o comando `jstat` produz sua saída a cada intervalo.
_count_
     O número de amostras a serem exibidas. O valor padrão é infinito, o que faz com que o comando `jstat` exiba estatísticas até que a JVM alvo seja encerrada ou o comando `jstat` seja encerrado. Este valor deve ser um inteiro positivo.

## Descrição

O comando `jstat` exibe estatísticas de desempenho para uma Java HotSpot VM instrumentada. A JVM alvo é identificada pelo seu identificador de máquina virtual, ou opção `vmid`.

O comando `jstat` suporta dois tipos de opções: opções gerais e opções de saída. As opções gerais fazem com que o comando `jstat` exiba informações simples de uso e versão. As opções de saída determinam o conteúdo e o formato da saída estatística.

Todas as opções e suas funcionalidades estão sujeitas a alterações ou remoção em futuras versões.

## Opções Gerais

Se você especificar uma das opções gerais, então não poderá especificar nenhuma outra opção ou parâmetro.

`-help`
     Exibe uma mensagem de ajuda.
`-options`
     Exibe uma lista de opções estáticas. Veja Opções de Saída para o Comando jstat.

## Opções de Saída para o Comando jstat

Se você não especificar uma opção geral, então poderá especificar opções de saída. As opções de saída determinam o conteúdo e o formato da saída do comando `jstat`, e consistem em uma única `statOption`, mais qualquer uma das outras opções de saída (`-h`, `-t` e `-J`). A `statOption` deve vir primeiro.

A saída é formatada como uma tabela, com colunas separadas por espaços. Uma linha de cabeçalho com títulos descreve as colunas. Use a opção `-h` para definir a frequência com que o cabeçalho é exibido. Os nomes dos cabeçalhos das colunas são consistentes entre as diferentes opções. Em geral, se duas opções fornecem uma coluna com o mesmo nome, então a fonte de dados para as duas colunas é a mesma.

Use a opção `-t` para exibir uma coluna de carimbo de data/hora, rotulada Timestamp como a primeira coluna da saída. A coluna Timestamp contém o tempo decorrido, em segundos, desde o início da JVM alvo. A resolução do carimbo de data/hora depende de vários fatores e está sujeita a variações devido ao agendamento atrasado de threads em sistemas com alta carga.

Use os parâmetros _interval_ e _count_ para determinar com que frequência e quantas vezes, respectivamente, o comando `jstat` exibe sua saída.

**Nota:**

Não escreva scripts para analisar a saída do comando `jstat` porque o formato pode mudar em futuras versões. Se você escrever scripts que analisam a saída do comando `jstat`, então espere modificá-los para futuras versões desta ferramenta.

`-statOption`
    

Determina as informações estatísticas que o comando `jstat` exibe. A seguir, lista as opções disponíveis. Use a opção geral `-options` para exibir a lista de opções para uma instalação de plataforma específica. Veja Opções de Estatísticas e Saída.

`class`: Exibe estatísticas sobre o comportamento do class loader.

`compiler`: Exibe estatísticas sobre o comportamento do compilador Just-in-Time da Java HotSpot VM.

`gc`: Exibe estatísticas sobre o comportamento do heap com garbage collection.

`gccapacity`: Exibe estatísticas sobre as capacidades das gerações e seus espaços correspondentes.

`gccause`: Exibe um resumo sobre estatísticas de garbage collection (o mesmo que `-gcutil`), com a causa dos eventos de garbage collection mais recentes e atuais (quando aplicável).

`gcnew`: Exibe estatísticas sobre o comportamento da new generation.

`gcnewcapacity`: Exibe estatísticas sobre os tamanhos das new generations e seus espaços correspondentes.

`gcold`: Exibe estatísticas sobre o comportamento da old generation e estatísticas do metaspace.

`gcoldcapacity`: Exibe estatísticas sobre os tamanhos da old generation.

`gcmetacapacity`: Exibe estatísticas sobre os tamanhos do metaspace.

`gcutil`: Exibe um resumo sobre estatísticas de garbage collection.

`printcompilation`: Exibe estatísticas de método de compilação da Java HotSpot VM.

`-J` _javaOption_
     Passa _javaOption_ para o lançador de aplicações Java. Por exemplo, `-J-Xms48m` define a memória de inicialização para 48 MB. Para uma lista completa de opções, veja [java](<#/doc/guides/tools/java>).

## Opções de Estatísticas e Saída

As informações a seguir resumem as colunas que o comando `jstat` exibe para cada _statOption_.

`-class` _option_
    

Estatísticas do class loader.

`Loaded`: Número de classes carregadas.

`Bytes`: Número de KB carregados.

`Unloaded`: Número de classes descarregadas.

`Bytes`: Número de KB descarregados.

`Time`: Tempo gasto realizando operações de carregamento e descarregamento de classes.

`-compiler` _option_
    

Estatísticas do compilador Just-in-Time da Java HotSpot VM.

`Compiled`: Número de tarefas de compilação realizadas.

`Failed`: Número de tarefas de compilação que falharam.

`Invalid`: Número de tarefas de compilação que foram invalidadas.

`Time`: Tempo gasto realizando tarefas de compilação.

`FailedType`: Tipo de compilação da última compilação falha.

`FailedMethod`: Nome da classe e método da última compilação falha.

`-gc` _option_
    

Estatísticas do heap com garbage collection.

`S0C`: Capacidade atual do survivor space 0 (KB).

`S1C`: Capacidade atual do survivor space 1 (KB).

`S0U`: Utilização do survivor space 0 (KB).

`S1U`: Utilização do survivor space 1 (KB).

`EC`: Capacidade atual do eden space (KB).

`EU`: Utilização do eden space (KB).

`OC`: Capacidade atual do old space (KB).

`OU`: Utilização do old space (KB).

`MC`: Tamanho comprometido do Metaspace (KB).

`MU`: Utilização do Metaspace (KB).

`CCSC`: Tamanho comprometido da compressed class (KB).

`CCSU`: Espaço de classe comprimido usado (KB).

`YGC`: Número de eventos de garbage collection (GC) da young generation.

`YGCT`: Tempo de garbage collection da young generation.

`FGC`: Número de eventos de full GC.

`FGCT`: Tempo de full garbage collection.

`GCT`: Tempo total de garbage collection.

`-gccapacity` _option_
    

Capacidades de geração e espaço do memory pool.

`NGCMN`: Capacidade mínima da new generation (KB).

`NGCMX`: Capacidade máxima da new generation (KB).

`NGC`: Capacidade atual da new generation (KB).

`S0C`: Capacidade atual do survivor space 0 (KB).

`S1C`: Capacidade atual do survivor space 1 (KB).

`EC`: Capacidade atual do eden space (KB).

`OGCMN`: Capacidade mínima da old generation (KB).

`OGCMX`: Capacidade máxima da old generation (KB).

`OGC`: Capacidade atual da old generation (KB).

`OC`: Capacidade atual do old space (KB).

`MCMN`: Capacidade mínima do metaspace (KB).

`MCMX`: Capacidade máxima do metaspace (KB).

`MC`: Tamanho comprometido do Metaspace (KB).

`CCSMN`: Capacidade mínima do compressed class space (KB).

`CCSMX`: Capacidade máxima do compressed class space (KB).

`CCSC`: Tamanho comprometido da compressed class (KB).

`YGC`: Número de eventos de GC da young generation.

`FGC`: Número de eventos de full GC.

`-gccause` _option_
    

Esta opção exibe o mesmo resumo de estatísticas de garbage collection que a opção `-gcutil`, mas inclui as causas do último evento de garbage collection e (quando aplicável), do evento de garbage collection atual. Além das colunas listadas para `-gcutil`, esta opção adiciona as seguintes colunas:

`LGCC`: Causa do último garbage collection

`GCC`: Causa do garbage collection atual

`-gcnew` _option_
    

Estatísticas da new generation.

`S0C`: Capacidade atual do survivor space 0 (KB).

`S1C`: Capacidade atual do survivor space 1 (KB).

`S0U`: Utilização do survivor space 0 (KB).

`S1U`: Utilização do survivor space 1 (KB).

`TT`: Tenuring threshold.

`MTT`: Tenuring threshold máximo.

`DSS`: Tamanho desejado do survivor (KB).

`EC`: Capacidade atual do eden space (KB).

`EU`: Utilização do eden space (KB).

`YGC`: Número de eventos de GC da young generation.

`YGCT`: Tempo de garbage collection da young generation.

`-gcnewcapacity` _option_
    

Estatísticas de tamanho do espaço da new generation.

`NGCMN`: Capacidade mínima da new generation (KB).

`NGCMX`: Capacidade máxima da new generation (KB).

`NGC`: Capacidade atual da new generation (KB).

`S0CMX`: Capacidade máxima do survivor space 0 (KB).

`S0C`: Capacidade atual do survivor space 0 (KB).

`S1CMX`: Capacidade máxima do survivor space 1 (KB).

`S1C`: Capacidade atual do survivor space 1 (KB).

`ECMX`: Capacidade máxima do eden space (KB).

`EC`: Capacidade atual do eden space (KB).

`YGC`: Número de eventos de GC da young generation.

`FGC`: Número de eventos de full GC.

`-gcold` _option_
    

Estatísticas de tamanho da old generation.

`MC`: Tamanho comprometido do Metaspace (KB).

`MU`: Utilização do Metaspace (KB).

`CCSC`: Tamanho comprometido da compressed class (KB).

`CCSU`: Espaço de classe comprimido usado (KB).

`OC`: Capacidade atual do old space (KB).

`OU`: Utilização do old space (KB).

`YGC`: Número de eventos de GC da young generation.

`FGC`: Número de eventos de full GC.

`FGCT`: Tempo de full garbage collection.

`GCT`: Tempo total de garbage collection.

`-gcoldcapacity` _option_
    

Estatísticas da old generation.

`OGCMN`: Capacidade mínima da old generation (KB).

`OGCMX`: Capacidade máxima da old generation (KB).

`OGC`: Capacidade atual da old generation (KB).

`OC`: Capacidade atual do old space (KB).

`YGC`: Número de eventos de GC da young generation.

`FGC`: Número de eventos de full GC.

`FGCT`: Tempo de full garbage collection.

`GCT`: Tempo total de garbage collection.

`-gcmetacapacity` _option_
    

Estatísticas de tamanho do metaspace.

`MCMN`: Capacidade mínima do metaspace (KB).

`MCMX`: Capacidade máxima do metaspace (KB).

`MC`: Tamanho comprometido do Metaspace (KB).

`CCSMN`: Capacidade mínima do compressed class space (KB).

`CCSMX`: Capacidade máxima do compressed class space (KB).

`YGC`: Número de eventos de GC da young generation.

`FGC`: Número de eventos de full GC.

`FGCT`: Tempo de full garbage collection.

`GCT`: Tempo total de garbage collection.

`-gcutil` _option_
    

Resumo das estatísticas de garbage collection.

`S0`: Utilização do survivor space 0 como porcentagem da capacidade atual do espaço.

`S1`: Utilização do survivor space 1 como porcentagem da capacidade atual do espaço.

`E`: Utilização do eden space como porcentagem da capacidade atual do espaço.

`O`: Utilização do old space como porcentagem da capacidade atual do espaço.

`M`: Utilização do Metaspace como porcentagem da capacidade atual do espaço.

`CCS`: Utilização do compressed class space como porcentagem.

`YGC`: Número de eventos de GC da young generation.

`YGCT`: Tempo de garbage collection da young generation.

`FGC`: Número de eventos de full GC.

`FGCT`: Tempo de full garbage collection.

`GCT`: Tempo total de garbage collection.

`-printcompilation` _option_
    

Estatísticas de método do compilador da Java HotSpot VM.

`Compiled`: Número de tarefas de compilação realizadas pelo método compilado mais recentemente.

`Size`: Número de bytes de byte code do método compilado mais recentemente.

`Type`: Tipo de compilação do método compilado mais recentemente.

`Method`: Nome da classe e nome do método que identificam o método compilado mais recentemente. O nome da classe usa uma barra (/) em vez de um ponto (.) como separador de namespace. O nome do método é o método dentro da classe especificada. O formato para esses dois campos é consistente com a opção HotSpot `-XX:+PrintCompilation`.

## Identificador de Máquina Virtual

A sintaxe da string `vmid` corresponde à sintaxe de uma URI:

> [_protocol_`:`][`//`]_lvmid_[`@`_hostname_[`:`_port_][`/`_servername_]

A sintaxe da string `vmid` corresponde à sintaxe de uma URI. A string `vmid` pode variar de um inteiro simples que representa uma JVM local a uma construção mais complexa que especifica um protocolo de comunicação, número de porta e outros valores específicos da implementação.

_protocol_
     O protocolo de comunicação. Se o valor de _protocol_ for omitido e um nome de host não for especificado, então o protocolo padrão é um protocolo local otimizado específico da plataforma. Se o valor de _protocol_ for omitido e um nome de host for especificado, então o protocolo padrão é `rmi`.
_lvmid_
     O identificador de máquina virtual local para a JVM alvo. O _lvmid_ é um valor específico da plataforma que identifica unicamente uma JVM em um sistema. O _lvmid_ é o único componente obrigatório de um identificador de máquina virtual. O _lvmid_ é tipicamente, mas não necessariamente, o identificador de processo do sistema operacional para o processo da JVM alvo. Você pode usar o comando `jps` para determinar o _lvmid_ desde que o processo da JVM não esteja rodando em uma instância `docker` separada. Você também pode determinar o _lvmid_ nas plataformas Linux e macOS com o comando `ps`, e no Windows com o Windows Task Manager.
_hostname_
     Um nome de host ou endereço IP que indica o host alvo. Se o valor de _hostname_ for omitido, então o host alvo é o host local.
_port_
     A porta padrão para comunicação com o servidor remoto. Se o valor de _hostname_ for omitido ou o valor de _protocol_ especificar um protocolo local otimizado, então o valor de _port_ é ignorado. Caso contrário, o tratamento do parâmetro _port_ é específico da implementação. Para o protocolo `rmi` padrão, o valor da porta indica o número da porta para o `rmiregistry` no host remoto. Se o valor de _port_ for omitido e o valor de _protocol_ indicar `rmi`, então a porta padrão do `rmiregistry` (1099) é usada.
_servername_
     O tratamento do parâmetro _servername_ depende da implementação. Para o protocolo local otimizado, este campo é ignorado. Para o protocolo `rmi`, ele representa o nome do objeto remoto RMI no host remoto.

## Exemplos

Esta seção apresenta alguns exemplos de monitoramento de uma JVM local com um _lvmid_ de 21891.

## A Opção gcutil

Este exemplo se conecta ao _lvmid_ 21891 e coleta 7 amostras em intervalos de 250 milissegundos e exibe a saída conforme especificado pela opção `-gcutil`.

A saída deste exemplo mostra que uma coleta da young generation ocorreu entre a terceira e a quarta amostra. A coleta levou 0.078 segundos e promoveu objetos do eden space (E) para o old space (O), resultando em um aumento da utilização do old space de 66.80% para 68.19%. Antes da coleta, o survivor space estava 97.02% utilizado, mas após esta coleta está 91.03% utilizado.
```
    jstat -gcutil 21891 250 7
      S0     S1     E      O      M     CCS    YGC     YGCT    FGC    FGCT     GCT
      0.00  97.02  70.31  66.80  95.52  89.14      7    0.300     0    0.000    0.300
      0.00  97.02  86.23  66.80  95.52  89.14      7    0.300     0    0.000    0.300
      0.00  97.02  96.53  66.80  95.52  89.14      7    0.300     0    0.000    0.300
     91.03   0.00   1.98  68.19  95.89  91.24      8    0.378     0    0.000    0.378
     91.03   0.00  15.82  68.19  95.89  91.24      8    0.378     0    0.000    0.378
     91.03   0.00  17.80  68.19  95.89  91.24      8    0.378     0    0.000    0.378
     91.03   0.00  17.80  68.19  95.89  91.24      8    0.378     0    0.000    0.378
```

## Repetir a String do Cabeçalho da Coluna

Este exemplo se conecta ao _lvmid_ 21891 e coleta amostras em intervalos de 250 milissegundos e exibe a saída conforme especificado pela opção `-gcnew`. Além disso, ele usa a opção `-h3` para exibir o cabeçalho da coluna após cada 3 linhas de dados.

Além de mostrar a string de cabeçalho repetida, este exemplo mostra que entre a segunda e a terceira amostras, ocorreu um young GC. Sua duração foi de 0.001 segundos. A coleta encontrou dados ativos suficientes para que a utilização do survivor space 0 (S0U) excedesse o desired survivor size (DSS). Como resultado, os objetos foram promovidos para a old generation (não visível nesta saída), e o tenuring threshold (TT) foi reduzido de 31 para 2.

Outra coleta ocorre entre a quinta e a sexta amostras. Esta coleta encontrou muito poucos survivors e retornou o tenuring threshold para 31.
```
    jstat -gcnew -h3 21891 250
     S0C    S1C    S0U    S1U   TT MTT  DSS      EC       EU     YGC     YGCT
      64.0   64.0    0.0   31.7 31  31   32.0    512.0    178.6    249    0.203
      64.0   64.0    0.0   31.7 31  31   32.0    512.0    355.5    249    0.203
      64.0   64.0   35.4    0.0  2  31   32.0    512.0     21.9    250    0.204
     S0C    S1C    S0U    S1U   TT MTT  DSS      EC       EU     YGC     YGCT
      64.0   64.0   35.4    0.0  2  31   32.0    512.0    245.9    250    0.204
      64.0   64.0   35.4    0.0  2  31   32.0    512.0    421.1    250    0.204
      64.0   64.0    0.0   19.0 31  31   32.0    512.0     84.4    251    0.204
     S0C    S1C    S0U    S1U   TT MTT  DSS      EC       EU     YGC     YGCT
      64.0   64.0    0.0   19.0 31  31   32.0    512.0    306.7    251    0.204
```

## Incluir um Carimbo de Data/Hora para Cada Amostra

Este exemplo se conecta ao _lvmid_ 21891 e coleta 3 amostras em intervalos de 250 milissegundos. A opção `-t` é usada para gerar um carimbo de data/hora para cada amostra na primeira coluna.

A coluna Timestamp reporta o tempo decorrido em segundos desde o início da JVM alvo. Além disso, a saída de `-gcoldcapacity` mostra a capacidade da old generation (OGC) e a capacidade do old space (OC) aumentando à medida que o heap se expande para atender às demandas de alocação ou promoção. A capacidade da old generation (OGC) cresceu de 11.696 KB para 13.820 KB após o octogésimo primeiro full garbage collection (FGC). A capacidade máxima da geração (e do espaço) é de 60.544 KB (OGCMX), então ainda há espaço para expandir.
```
    Timestamp      OGCMN    OGCMX     OGC       OC       YGC   FGC    FGCT    GCT
              150.1   1408.0  60544.0  11696.0  11696.0   194    80    2.874   3.799
              150.4   1408.0  60544.0  13820.0  13820.0   194    81    2.938   3.863
              150.7   1408.0  60544.0  13820.0  13820.0   194    81    2.938   3.863
```
## Instrumentação de Monitoramento para uma JVM Remota

Este exemplo se conecta ao lvmid 40496 no sistema chamado `remote.domain` usando a opção `-gcutil`, com amostras coletadas a cada segundo indefinidamente.

O lvmid é combinado com o nome do host remoto para construir um vmid de `40496@remote.domain`. Este vmid resulta no uso do protocolo `rmi` para se comunicar com o servidor `jstatd` padrão no host remoto. O servidor `jstatd` é localizado usando o comando `rmiregistry` em `remote.domain` que está vinculado à porta padrão do comando `rmiregistry` (porta 1099).
```
    jstat -gcutil 40496@remote.domain 1000
    ... saída omitida
```