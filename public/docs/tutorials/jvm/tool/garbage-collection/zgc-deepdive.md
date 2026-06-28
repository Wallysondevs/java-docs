# Aprofundamento na Arquitetura do ZGC

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Visão Geral da Coleta de Lixo em Java ](<#/doc/tutorials/jvm/tool/garbage-collection>) > Aprofundamento na Arquitetura do ZGC

**Anterior na Série**

[Visão Geral do ZGC](<#/doc/tutorials/jvm/tool/garbage-collection/zgc-overview>)

➜

**Tutorial Atual**

Aprofundamento na Arquitetura do ZGC

➜

Este é o fim da série!

**Anterior na Série:** [Visão Geral do ZGC](<#/doc/tutorials/jvm/tool/garbage-collection/zgc-overview>)

# Aprofundamento na Arquitetura do ZGC

## Introdução

No artigo anterior, fizemos uma visão geral de alto nível do ZGC e como configurá-lo. Este artigo aprofundará os principais detalhes de implementação e as decisões arquitetônicas que guiam o ZGC.

## Concorrência e Ciclo do GC

Uma das principais vantagens do ZGC são seus tempos de pausa extremamente baixos, abaixo de 1 ms. Isso é conseguido pelo ZGC ser um garbage collector quase inteiramente concorrente. Abaixo está uma tabela de alguns dos processos de alto nível pelos quais os GCs passam em cada ciclo do GC e se o processo é executado concorrentemente (✅):

| Serial | Parallel | G1 | ZGC
---|---|---|---|---
Marking | ❌ | ❌ | ✅* | ✅
Relocation/Compaction | ❌ | ❌ | ❌ | ✅
Reference Processing | ❌ | ❌ | ❌** | ✅
Relocation Set Selection | ❌ | ❌ | ❌ | ✅
JNI WeakRef Cleaning | ❌ | ❌ | ❌ | ✅
JNI GlobalRefs Scanning | ❌ | ❌ | ❌ | ✅
Class Unloading | ❌ | ❌ | ❌ | ✅
Thread Stack Scanning | ❌ | ❌ | ❌ | ✅

**Nota:** Tabela baseada no JDK 19

* Apenas Old Gen

** Parcialmente concorrente

O fato de o ZGC ser capaz de lidar com quase todos os processos do GC concorrentemente transforma as fases de pausa em curtos pontos de sincronização que não aumentam com o tamanho do live set e fornecem desempenho consistente, independentemente da escala.

### Ciclo do GC do ZGC

O ciclo do GC consiste em três pausas e três fases concorrentes, cada uma com responsabilidades distintas. Abaixo está um diagrama mostrando uma visão simplificada do ciclo do GC do ZGC:

#### Pausa de Início da Marcação

Ponto de sincronização para sinalizar o início da fase de marcação.

Durante esta e todas as fases de pausa, apenas ações menores são realizadas, como a definição de flags booleanas e quais são as "boas" cores globais atuais; veja Colored Pointers.

#### Marcação Concorrente

Durante esta fase concorrente, o ZGC percorrerá todo o grafo de objetos e marcará todos os objetos.

#### Pausa de Fim da Marcação

Ponto de sincronização para sinalizar o fim da marcação.

#### Preparação Concorrente para Relocação

Durante esta fase concorrente, o ZGC removerá objetos

#### Pausa de Início da Relocação

Ponto de sincronização sinaliza às threads que os objetos serão movidos no heap.

#### Relocação Concorrente

Durante esta fase concorrente, o ZGC moverá objetos e compactará regiões no heap para liberar espaço. Para mais informações sobre esta fase, consulte a seção sobre compactação.

## Colored Pointers

Uma parte central do trabalho do GC é mover objetos no heap, evitando que a aplicação use uma referência desatualizada para um objeto movido. Uma maneira direta de conseguir isso é pausar a aplicação durante esse trabalho, mas para o ZGC atingir seu objetivo de baixos tempos de pausa, ele deve realizar quase todo o seu trabalho concorrentemente. Você pode ver o problema potencial: mesmo que o ZGC execute seu trabalho enquanto a aplicação está em execução, ele deve garantir que a aplicação sempre obtenha a referência correta. Ele consegue isso através de duas decisões arquitetônicas chave: colored pointers e load barriers. Vamos dar uma olhada nos colored pointers.

O ZGC usa um ponteiro de 64 bits com 20 bits reservados para metadados sobre o ponteiro. Os 20 bits de metadados fornecem "cor" ao ponteiro, que pode fornecer informações sobre o estado atual do ponteiro. Colored pointers são semelhantes aos ponteiros de tag e versão usados em outras implementações de GC. A partir do JDK 19, os colored pointers no ZGC se parecem com este diagrama:

Atualmente, 4 bits estão em uso, enquanto os outros 16 permanecem em reserva para uso futuro. O propósito de cada bit é o seguinte:

*   **Finalizable:** Este bit indica se o objeto é alcançável apenas através de um finalizer. Observe que a finalização foi designada como obsoleta para remoção no JDK 18 com [JEP 421: Deprecate Finalization for Removal](<https://openjdk.org/jeps/421>).
*   **Remapped:** Este bit indica se o ponteiro é conhecido _não_ apontar para o relocation set.
*   **Marked0 & Marked1:** Estes bits indicam se o objeto é conhecido por ser marcado pelo GC. O ZGC alterna entre esses dois bits quanto a qual é "bom" para cada ciclo do GC.

Cada bit tem uma cor "boa" e uma "ruim"; no entanto, o que é uma cor "boa" ou "ruim" seria específico do contexto de quando o objeto é acessado. A própria aplicação não estaria ciente dos colored pointers; a leitura dos colored pointers é tratada por load barriers quando um objeto é carregado da memória do heap.

### Multi-Mapeamento do Heap

Como o ZGC pode mover a localização física de um objeto na memória do heap enquanto a aplicação está em execução, múltiplos caminhos precisam ser fornecidos para a localização física atual onde o objeto reside. No ZGC, isso é realizado através do multi-mapeamento do heap. Com o multi-mapeamento, a localização física de um objeto é mapeada para três visualizações na memória virtual, correspondendo a cada uma das potenciais "cores" do ponteiro. Isso permite que um load barrier localize um objeto se ele foi movido desde o último ponto de sincronização.

Uma consequência desta decisão de design é que um sistema pode relatar o uso de memória do ZGC como sendo maior do que seu uso real. Esta é uma consequência do endereçamento triplicado de um objeto na memória _virtual_; no entanto, o uso real da memória é apenas de onde o objeto real está localizado. Isso pode ser mais facilmente compreendido quando um sistema relata o uso de memória maior do que a memória física instalada no sistema. A tabela abaixo demonstra como o multi-mapeamento funciona na prática:

## Load Barriers

Na seção anterior, abordamos como os colored pointers foram uma das principais decisões arquitetônicas do ZGC para permitir o processamento concorrente; esta seção aborda a outra decisão arquitetônica chave, os load barriers.

Load barriers são segmentos de código injetados pelo compilador C2, parte do JIT, em arquivos de classe quando a JVM os analisa. Load barriers são adicionados em arquivos de classe onde um objeto seria recuperado do heap. O exemplo de código Java abaixo mostra onde um load barrier seria adicionado:

```java
class MyClass {
    Object field;

    Object getField() {
        // Load barrier would be injected here
        return field;
    }
}
```

O load barrier adiciona um comportamento que verificará as "cores" do ponteiro de um objeto quando carregado do heap. Os load barriers são otimizados para o caso de cor "boa", que é o caso comum, para permitir uma passagem mais rápida. Suponha que um load barrier encontre uma cor "ruim". Nesse caso, ele tentará "curar" a cor, o que pode significar atualizar o ponteiro para colocar a nova localização do objeto no heap ou até mesmo realocar o próprio objeto antes de retornar a referência ao sistema. Essa "cura" garante que as cargas subsequentes do objeto do heap sigam o caminho rápido.

## Regiões

O ZGC não trata o heap como um único balde para jogar objetos, mas divide dinamicamente o heap em regiões de memória separadas, como neste diagrama (simplificado) abaixo:

Isso segue um padrão semelhante ao G1 GC, que também usa regiões de memória. No entanto, as regiões do ZGC, internamente definidas como ZPages, são mais dinâmicas, com tamanhos pequeno, médio e grande; o número de regiões ativas pode aumentar e diminuir dependendo das necessidades do live set.

Dividir o heap em regiões pode proporcionar vários benefícios ao desempenho do GC, incluindo: o custo de alocar e desalocar uma região de um tamanho definido seria constante, o GC pode desalocar uma região inteira quando todos os objetos dentro dela não são mais alcançáveis, objetos relacionados podem ser agrupados em uma região.

### Tamanhos das Regiões

Conforme a tabela acima, o ZGC possui três tamanhos diferentes para regiões: pequena, média e grande. Também se destaca que, paradoxalmente, uma região grande pode ser menor que uma região média. Abaixo são abordados os diferentes tamanhos de região e seus propósitos.

#### Regiões Pequenas

Regiões pequenas têm 2 MB de tamanho. Objetos com menos de 1/8 (12,5%) do tamanho de uma região pequena, ou seja, menores ou iguais a 256 KB, são armazenados em uma região pequena.

#### Regiões Médias

O tamanho de uma região média pode variar dependendo do valor definido para o max heap size (`-Xmx`). Com 1 GB ou mais, as regiões médias são definidas para 32 MB de tamanho; abaixo de 128 MB, as regiões médias são desativadas. Assim como nas regiões pequenas, objetos com 1/8 (12,5%) ou menos do tamanho definido de uma região média serão armazenados lá. Abaixo está a tabela para os intervalos de tamanho da região média:

Tamanho Máximo do Heap | Tamanho da Região Média
---|---
>= 1024 MB | 32 MB
>= 512 MB | 16 MB
>= 256 MB | 8 MB
>= 128 MB | 4 MB
< 128 MB | desativado

#### Regiões Grandes

Regiões grandes são reservadas para humongous objects e são ajustadas em incrementos de 2 MB ao tamanho do objeto. Assim, um objeto de 13 MB seria armazenado em uma região grande de 14 MB. Qualquer objeto muito grande para caber em uma região média será colocado em sua própria região grande.

## Compactação e Relocação

As regiões são projetadas para aproveitar o fato de que a _maioria_ dos objetos criados ao mesmo tempo sairão do escopo ao mesmo tempo. No entanto, como implícito com o qualificador _maioria_, nem sempre é esse o caso. Através de heurísticas internas do GC, o GC pode eventualmente copiar objetos de uma região populada principalmente por objetos inacessíveis para uma nova região, a fim de permitir que a região antiga seja desalocada e a memória seja liberada. Isso é chamado de compactação e relocação. O ZGC, desde o JDK 16, realiza a compactação através de dois métodos de relocação: in-place e not-in-place.

A relocação not-in-place é realizada quando regiões vazias estão disponíveis e é o método de relocação preferido do ZGC. Abaixo está um exemplo de como a relocação not-in-place se parece:

Se nenhuma região vazia estiver disponível, o ZGC usará a relocação in-place. Neste cenário, o ZGC moverá objetos para uma região esparsamente populada. Abaixo está um exemplo de relocação in-place:

Com a relocação in-place, o ZGC deve primeiro compactar os objetos dentro da região designada para onde os objetos serão realocados. Isso pode impactar negativamente o desempenho, pois apenas uma única thread pode realizar este trabalho. Aumentar o tamanho do heap pode ajudar o ZGC a evitar o uso da relocação in-place.

## Leitura Adicional

Aqui estão alguns links que podem valer a pena conferir para aprender mais sobre o ZGC.

Wiki da Equipe ZGC: <https://wiki.openjdk.org/display/zgc/Main>

Blog de Per Liden (desenvolvedor original do ZGC): [https://malloc.se/](<>)

Aprofundamento no ZGC: Um Garbage Collector Moderno no OpenJDK: <https://dl.acm.org/doi/full/10.1145/3538532>

## Mais Aprendizado

### Neste tutorial

Introdução Concorrência e Ciclo do GC Colored Pointers Load Barriers Regiões Compactação e Relocação Leitura Adicional Mais Aprendizado

Última atualização: 6 de março de 2022

**Anterior na Série**

[Visão Geral do ZGC](<#/doc/tutorials/jvm/tool/garbage-collection/zgc-overview>)

➜

**Tutorial Atual**

Aprofundamento na Arquitetura do ZGC

➜

Este é o fim da série!

**Anterior na Série:** [Visão Geral do ZGC](<#/doc/tutorials/jvm/tool/garbage-collection/zgc-overview>)

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Visão Geral da Coleta de Lixo em Java ](<#/doc/tutorials/jvm/tool/garbage-collection>) > Aprofundamento na Arquitetura do ZGC