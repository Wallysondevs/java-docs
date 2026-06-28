# Visão Geral do ZGC

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Visão Geral da Coleta de Lixo em Java ](<#/doc/tutorials/jvm/tool/garbage-collection>) > Visão Geral do ZGC

**Anterior na Série**

[Coleta de Lixo em Java](<#/doc/tutorials/jvm/tool/garbage-collection/java-specifics>)

➜

**Tutorial Atual**

Visão Geral do ZGC

➜

**Próximo na Série**

[Aprofundamento na Arquitetura do ZGC](<#/doc/tutorials/jvm/tool/garbage-collection/zgc-deepdive>)

**Anterior na Série:** [Coleta de Lixo em Java](<#/doc/tutorials/jvm/tool/garbage-collection/java-specifics>)

**Próximo na Série:** [Aprofundamento na Arquitetura do ZGC](<#/doc/tutorials/jvm/tool/garbage-collection/zgc-deepdive>)

# Visão Geral do ZGC

## Introdução

ZGC é um garbage collector quase inteiramente concorrente, escalável e de baixa latência. Capaz de suportar heaps de 8 MB a 16 TB, mantendo um tempo de pausa consistente de sub-milissegundos, independentemente do tamanho do liveset.

O ZGC foi introduzido como um recurso experimental no JDK 11; e tornou-se um recurso de produção com o lançamento do JDK 15. Este artigo fornecerá uma explicação de alto nível do ZGC, como começar a usá-lo e como configurá-lo.

## Começando com o ZGC

O ZGC pode ser ativado com o seguinte comando:

```
-XX:+UseZGC
```

Ao usar o ZGC pela primeira vez, é recomendado habilitar o log do GC, o que pode fornecer informações diagnósticas adicionais sobre o que o ZGC está fazendo, útil para fins de ajuste e comparação de melhorias ou regressões de desempenho ao usar o ZGC em relação a outros GCs. A configuração do log do GC para info pode ser ativada com:

```
-Xlog:gc*=info
```

Para informações mais detalhadas sobre como habilitar e configurar o log do GC, consulte o [guia de referência aqui.](<https://docs.oracle.com/en/java/javase/19/docs/specs/man/java.html#enable-logging-with-the-jvm-unified-logging-framework>)

## Configurando o ZGC

O ZGC foi projetado para exigir configuração mínima. Na maioria dos casos, a única configuração necessária é definir o tamanho máximo do heap `-Xmx`. Ao definir o tamanho máximo do heap, é importante fornecer uma margem de segurança além do tamanho esperado do liveset. Quanto mais margem de segurança for fornecida, menor será a pressão de alocação sobre o ZGC e, consequentemente, melhor será o desempenho. No entanto, isso precisa ser ponderado em relação ao desejo de não desperdiçar memória. O equilíbrio específico da quantidade de margem de segurança a ser fornecida será caso a caso, exigindo testes e ajustes para encontrar a configuração ideal para suas necessidades.

### Configuração Adicional do ZGC

*   `-XX:ConcGCThreads` - O ZGC definirá automaticamente o número de threads concorrentes que usará por meio de heurísticas internas do GC, no entanto, essa configuração pode ser configurada manualmente para
*   `-XX:UseLargePages` - Em sistemas Linux, o ZGC pode ser configurado para usar large pages. Isso geralmente proporciona melhorias de desempenho com poucas desvantagens, mas requer uma configuração complicada, incluindo acesso root. Para mais informações sobre esta opção de configuração, leia [aqui](<https://wiki.openjdk.org/display/zgc/Main#Main-EnablingLargePagesOnLinux>).
*   `-XX:+UseTransparentHugePages` - Huge pages podem ser usadas como uma alternativa às Large Pages em sistemas baseados em Linux. No entanto, pode haver algumas regressões de desempenho ao usar huge pages; certifique-se de ler mais [aqui](<https://wiki.openjdk.org/display/zgc/Main#Main-EnablingTransparentHugePagesOnLinux>) sobre como configurar huge pages e algumas das desvantagens envolvidas.
*   `-XX:+UseNUMA` - O ZGC oferece [Suporte NUMA](<https://www.kernel.org/doc/html/v5.0/vm/numa.html>), que é habilitado por padrão. Isso pode ser explicitamente habilitado com `-XX:+UseNUMA` e desabilitado com `-XX:-UseNUMA`.
*   `-XX:ZAllocationSpikeTolerance=factor` - Define a tolerância a picos de alocação para o ZGC. Por padrão, esta opção é definida como 2.0. Este fator descreve o nível de picos de alocação a serem esperados. Por exemplo, usar um fator de 3.0 significa que a taxa de alocação atual pode triplicar a qualquer momento.
*   `-XX:ZCollectionInterval=seconds` - Define o intervalo máximo (em segundos) entre dois ciclos de GC ao usar o ZGC. Por padrão, esta opção é definida como 0 (desabilitada).
*   `-XX:ZFragmentationLimit=percent` - Define a fragmentação máxima aceitável do heap (em porcentagem) para o ZGC. Por padrão, esta opção é definida como 25. Usar um valor menor fará com que o heap seja compactado de forma mais agressiva, para recuperar mais memória ao custo de usar mais tempo de CPU.
*   `-XX:+ZProactive` - Habilita ciclos de GC proativos ao usar o ZGC. Por padrão, esta opção é habilitada. O ZGC iniciará um ciclo de GC proativo se isso for esperado para ter um impacto mínimo na aplicação em execução. Isso é útil se a aplicação estiver principalmente ociosa ou alocar muito poucos objetos, mas você ainda deseja manter o tamanho do heap baixo e permitir que o processamento de referências ocorra mesmo quando há muito espaço livre no heap.
*   `-XX:+ZUncommit` - Habilita a descommitagem de memória heap não utilizada ao usar o ZGC. Por padrão, esta opção é habilitada. A descommitagem de memória heap não utilizada reduzirá o consumo de memória da JVM e tornará essa memória disponível para outros processos.
*   `-XX:ZUncommitDelay=seconds` - Define a quantidade de tempo (em segundos) que a memória heap deve ter permanecido sem uso antes de ser descommitada. Por padrão, esta opção é definida como 300 (5 minutos). Commitar e descommitar memória são operações relativamente caras. Usar um valor menor fará com que a memória heap seja descommitada mais cedo, com o risco de ter que commitar novamente em breve.

## Quando Usar ZGC e Quando Evitar ZGC

O ZGC não foi projetado ou pretendido para ser uma atualização geral em relação aos GCs existentes como G1 GC, Parallel GC ou Serial GC, mas para satisfazer um nicho específico de minimizar tempos de latência e escalar para grandes livesets. Consequentemente, você pode não ver uma melhoria de desempenho e possivelmente uma regressão de desempenho nas métricas ao mudar para o ZGC a partir de outros garbage collectors.

A baixa latência do ZGC e a capacidade de escalar para lidar com grandes livesets o tornariam um bom candidato para aplicações web. Aplicações web frequentemente atendem a muitas requisições simultaneamente, resultando muitas vezes na manutenção de livesets maiores. A responsividade consistente também ajuda na estabilidade do sistema. Isso se alinha bem com os pontos fortes do ZGC.

Por outro lado, embora o ZGC possa operar com heaps tão pequenos quanto 8 MB, é fortemente desencorajado usar o ZGC em tal cenário. O ZGC é um GC concorrente e apresentaria problemas significativos de desempenho quando usado em um sistema com um processador de núcleo único ou recursos de CPU limitados.

O benefício de escalabilidade no ZGC é projetado principalmente para escalar _para cima_ para lidar com cargas de trabalho muito grandes, não para escalar _para baixo_ cargas de trabalho muito pequenas.

## Mais Aprendizado

### Neste tutorial

Introdução Começando com o ZGC Configurando o ZGC Quando Usar ZGC e Quando Evitar ZGC Mais Aprendizado

Última atualização: 6 de março de 2022

**Anterior na Série**

[Coleta de Lixo em Java](<#/doc/tutorials/jvm/tool/garbage-collection/java-specifics>)

➜

**Tutorial Atual**

Visão Geral do ZGC

➜

**Próximo na Série**

[Aprofundamento na Arquitetura do ZGC](<#/doc/tutorials/jvm/tool/garbage-collection/zgc-deepdive>)

**Anterior na Série:** [Coleta de Lixo em Java](<#/doc/tutorials/jvm/tool/garbage-collection/java-specifics>)

**Próximo na Série:** [Aprofundamento na Arquitetura do ZGC](<#/doc/tutorials/jvm/tool/garbage-collection/zgc-deepdive>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Visão Geral da Coleta de Lixo em Java ](<#/doc/tutorials/jvm/tool/garbage-collection>) > Visão Geral do ZGC