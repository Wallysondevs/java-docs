# Coleta de Lixo em Java

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Visão Geral da Coleta de Lixo em Java ](<#/doc/tutorials/jvm/tool/garbage-collection>) > Coleta de Lixo em Java

**Anterior na Série**

[Introdução à Coleta de Lixo](<#/doc/tutorials/jvm/tool/garbage-collection/intro>)

➜

**Tutorial Atual**

Coleta de Lixo em Java

➜

**Próximo na Série**

[Visão Geral do ZGC](<#/doc/tutorials/jvm/tool/garbage-collection/zgc-overview>)

**Anterior na Série:** [Introdução à Coleta de Lixo](<#/doc/tutorials/jvm/tool/garbage-collection/intro>)

**Próximo na Série:** [Visão Geral do ZGC](<#/doc/tutorials/jvm/tool/garbage-collection/zgc-overview>)

# Coleta de Lixo em Java

## Coleta de Lixo em Java

Na seção anterior, aprendemos que Java usa um garbage collector para gerenciamento de memória. Mas como um garbage collector realmente funciona? Vamos analisar isso mais de perto nesta seção.

### Tipos de Garbage Collectors

Dentro da HotSpot JVM, o Garbage Collector não é um conceito unificado único, mas possui múltiplas implementações. Qual implementação de garbage collector usar dependerá dos recursos de hardware disponíveis e dos requisitos de desempenho da sua aplicação.

  * **Serial Garbage Collector** \- Realiza toda a coleta de lixo em uma única thread. Ele tem tempos de pausa maiores, mas menor uso de recursos. Melhor usado em sistemas com apenas um único processador.
  * **Parallel Garbage Collector** \- Semelhante ao serial garbage collector, mas pode utilizar múltiplas threads para realizar o trabalho de coleta de lixo.
  * **Concurrent Mark Sweep (CMS) Garbage Collector** (Descontinuado no JDK 9, Removido no JDK 14) - Reduz os tempos de pausa da coleta de lixo realizando parte do trabalho do garbage collector enquanto a aplicação está em execução.
  * **Garbage First (G1) Garbage Collector** (Padrão desde o JDK 9) - Aprimora e substitui o CMS GC. O G1 é idealmente adequado para máquinas multiprocessadoras com acesso a grandes quantidades de memória.
  * **ZGC** (Experimental no JDK 11, Produção no JDK 15) - GC de latência ultrabaixa que pode ser escalado para aplicações com heaps de múltiplos terabytes. A implementação interna e o comportamento do ZGC são distintamente diferentes dos outros garbage collectors listados, e uma descrição de seu comportamento será abordada em um artigo separado.

## Memória Heap

A memória heap é uma alocação de memória do sistema que a JVM controla. O tamanho da memória heap disponível para a JVM é controlado principalmente com os argumentos JVM `-Xms<value>` e `-Xmx<value>`. `-Xms<value>` define o tamanho inicial e mínimo da heap. Enquanto `-Xmx<value>` definirá o tamanho máximo da heap.

Se a memória heap ficar cheia, isso fará com que a JVM lance exceções `java.lang.OutOfMemoryError` quando a JVM tentar alocar espaço para novos objetos. Para a maioria das implementações de garbage collectors em Java, a memória heap é dividida em múltiplas regiões com base na "idade" de um objeto. O número e os tipos de regiões variarão dependendo da implementação específica do garbage collector.

### Coleta de Lixo Geracional

A maioria dos garbage collectors em Java são garbage collectors geracionais. Garbage collectors geracionais são projetados para tirar proveito da hipótese geracional fraca, que postula que a maioria dos objetos tem vida curta. Consequentemente, garbage collectors geracionais dividem a heap em gerações jovem e antiga. Na alocação, os objetos começam em uma geração jovem; objetos em gerações jovens são frequentemente verificados para ver se não são mais alcançáveis. Se um objeto sobreviver a ciclos de coleta de lixo suficientes, ele será copiado para uma geração antiga, que é verificada com menos frequência.

A vantagem que os garbage collectors geracionais proporcionam é um uso mais eficiente do tempo de CPU. O garbage collector gastará o tempo de CPU de forma mais produtiva escaneando um subconjunto da heap onde é mais provável encontrar objetos que são candidatos à remoção. Este uso mais eficiente do tempo de CPU pode então ser usado para reduzir os tempos de pausa, melhorar o throughput ou reduzir o uso de memória; a melhoria exata nessas áreas dependeria das heurísticas do garbage collector e de como ele foi configurado.

#### Gerações

Como mencionado anteriormente, a heap de memória em garbage collectors geracionais é dividida em espaços. Vamos analisar essas gerações em mais detalhes.

  * **Espaço Jovem** \- A Região Jovem, como o nome sugere, é a região da heap que contém objetos recém-alocados. A Região Jovem é, por sua vez, dividida em mais regiões.

    * **Espaço Eden** \- Na alocação, um objeto é armazenado na região Eden da heap até sua primeira coleta de lixo.
    * **Espaços Survivor** \- Objetos que sobreviveram a um ciclo de GC são copiados para uma região survivor. Collectors geracionais geralmente têm múltiplas regiões "survivor"; o objetivo é melhorar a eficiência do garbage collector copiando objetos sobreviventes para uma nova região survivor e então desalocando toda a região survivor antiga.
  * **Região Antiga** \- Se um objeto atingir "idade" suficiente ao sobreviver a ciclos de GC, ele será copiado para a região antiga. Como abordado anteriormente, o garbage collector raramente escaneia a região antiga em busca de objetos que não são mais alcançáveis.

  * **Região Permanent/Metaspace** \- A região final é a região permanent ou metaspace. Objetos armazenados aqui são tipicamente metadados da JVM, classes de sistema centrais e outros dados que geralmente existem por quase toda a duração da vida da JVM.

## Processo de Coleta de Lixo

Em um nível alto, os garbage collectors têm três fases: marcação, varredura e compactação. Cada uma dessas etapas tem responsabilidades distintas. No entanto, observe que, dependendo da implementação do garbage collector, pode haver subfases adicionais dentro de cada fase que não são abordadas aqui.

### Marcação

Na criação de um objeto, cada objeto recebe, pela VM, um valor de marcação de 1 bit, inicialmente definido como false (`0`). O garbage collector usa esse valor para marcar se um objeto é alcançável. No início de uma coleta de lixo, o garbage collector percorre o grafo de objetos e marca qualquer objeto que ele possa alcançar como true (`1`).

O garbage collector não escaneia cada objeto individualmente, mas começa a partir de objetos "raiz". Exemplos de objetos raiz são: variáveis locais, campos de classe estáticos, threads Java ativas e referências JNI.

### Varredura

Durante a fase de varredura, todos os objetos que são inalcançáveis, aqueles cujo bit de marcação está atualmente false (`0`), são removidos.

### Compactação

A fase final de uma coleta de lixo é a fase de compactação. Objetos vivos na região eden ou em uma região survivor ocupada são movidos e/ou copiados para uma região survivor vazia. Se um objeto em uma região survivor ganhou tempo de vida suficiente, ele é movido ou copiado para uma região antiga.

### Pausa da Coleta de Lixo

Durante uma coleta de lixo, pode haver períodos em que parte, ou até todo, o processamento dentro da JVM é pausado; estes são chamados de Eventos Stop-the-World. Como mencionado na introdução da seção Memória Heap, objetos armazenados na memória heap não são thread safe. Isso, por sua vez, significa que, durante uma coleta de lixo, parte, ou toda, da JVM deve ser pausada por um período enquanto o garbage collector trabalha para evitar que erros ocorram à medida que os objetos são verificados quanto ao uso, excluídos e movidos ou copiados.

Ferramentas como JDK Flight Recorder (JFR) e Visual VM podem ser usadas para monitorar a frequência e a duração das pausas que ocorrem devido à coleta de lixo. Como ajustar um garbage collector está fora do escopo deste tutorial, mas monitorar o comportamento do garbage collector e, subsequentemente, ajustá-lo através de argumentos da JVM, pode ser uma maneira fundamental de melhorar o desempenho de uma aplicação.

### Tipos de Coletas de Lixo

Assim como existem diferentes regiões de memória heap, também existem diferentes tipos de coletas de lixo.

  * **Minor** \- Coletas de lixo minor apenas escaneiam as Regiões Jovens da memória heap. Coletas de lixo minor ocorrem com muita frequência e geralmente têm tempos de pausa muito baixos associados a elas.
  * **Major** \- Coletas de lixo major escaneiam tanto as regiões Jovem quanto Antiga da memória heap. Coletas de lixo major ocorrem com muito menos frequência do que as coletas de lixo minor, sendo frequentemente acionadas por condições específicas dentro da VM, por exemplo, quando uma porcentagem limite da memória heap foi usada.

## Mais Aprendizado

### Neste tutorial

Coleta de Lixo em Java Memória Heap Processo de Coleta de Lixo Mais Aprendizado

Última atualização: 6 de março de 2022

**Anterior na Série**

[Introdução à Coleta de Lixo](<#/doc/tutorials/jvm/tool/garbage-collection/intro>)

➜

**Tutorial Atual**

Coleta de Lixo em Java

➜

**Próximo na Série**

[Visão Geral do ZGC](<#/doc/tutorials/jvm/tool/garbage-collection/zgc-overview>)

**Anterior na Série:** [Introdução à Coleta de Lixo](<#/doc/tutorials/jvm/tool/garbage-collection/intro>)

**Próximo na Série:** [Visão Geral do ZGC](<#/doc/tutorials/jvm/tool/garbage-collection/zgc-overview>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Visão Geral da Coleta de Lixo em Java ](<#/doc/tutorials/jvm/tool/garbage-collection>) > Coleta de Lixo em Java