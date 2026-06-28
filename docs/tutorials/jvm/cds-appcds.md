# CDS e AppCDS no Hotspot

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > CDS e AppCDS no Hotspot

# CDS e AppCDS no Hotspot

CDS é um recurso do HotSpot JVM fácil de usar e robusto que pode ajudar a melhorar o desempenho de inicialização. Neste artigo, aprenderemos sobre o histórico, a arquitetura e como usar e depurar o CDS.

## O que é CDS?

CDS foi um recurso adicionado ao HotSpot JVM durante uma atualização como parte do JDK 5. Ele foi aprimorado e expandido em versões subsequentes do JDK. O objetivo do CDS é reduzir o tempo de inicialização da JVM carregando a partir de um arquivo pré-processado de classes Java e metadados da JVM que são usados durante o processo de inicialização.

Este artigo abordará os benefícios do CDS, como ele funciona, como usar o CDS em suas aplicações Java e como depurar e solucionar problemas do CDS.

### Inicialização da JVM

Durante a inicialização, o HotSpot JVM deve carregar e inicializar um conjunto de classes principais, por exemplo, muitas das classes localizadas no pacote `java.lang`. Este processo muda pouco, independentemente das aplicações sendo executadas na JVM. Este processo repetitivo representa uma oportunidade de otimização.

A partir do JDK 5, o comando `-Xshare:dump` podia ser usado para criar um arquivo pré-processado das classes principais que o HotSpot normalmente precisaria carregar na inicialização. Este arquivo compartilhado está localizado em: `$JAVA_HOME/lib/server/classes.jsa` (Windows: `$JAVA_HOME/bin/server/classes.jsa`).

Na inicialização, o HotSpot JVM, se instruído, procuraria este diretório pelo arquivo compartilhado e, se encontrado, carregaria o arquivo em um local mapeado em memória somente leitura. Isso economiza tempo, pois carregar o arquivo pré-processado é mais rápido do que carregar as classes, pois etapas como descompactar o arquivo de um formato arquivado, verificá-lo e gerar bytecode são ignoradas.

### Arquivo CDS Padrão

Com o lançamento do JDK 12, um arquivo CDS padrão específico da arquitetura é fornecido para compilações de 64 bits de imagens JDK. Isso contorna a exigência de executar o comando `-Xshare:dump` para aproveitar o CDS que as versões anteriores do JDK exigiam. O arquivo CDS padrão está localizado em: `$JAVA_HOME/lib/server/classes.jsa` (Windows: `$JAVA_HOME/bin/server/classes.jsa`).

### Sobre "Class Data-Sharing"

Historicamente, "CDS" era um acrônimo para Class Data-Sharing, e ainda é frequentemente usado na documentação sobre CDS. Este nome se relacionava com a forma como o arquivo pré-processado era mapeado em memória e compartilhado com outros processos JVM em execução na mesma máquina. Isso reduziria o consumo geral de memória dos processos JVM.

Este recurso do CDS não é mais ativamente suportado, pois os custos de memória diminuíram significativamente e a disponibilidade de memória aumentou significativamente. Além disso, o modelo de implantação para aplicações em execução em servidores é em contêineres bem ajustados, onde a JVM é o único processo em execução, o que anula a vantagem de compartilhar o mapeamento de memória. Consequentemente, "CDS" não significa mais Class Data-Sharing.

## Usando CDS

O CDS é controlado pelo argumento `-Xshare:<value>`, que aceita os seguintes valores;

*   `auto`: Permite que o CDS seja usado quando um arquivo compartilhado estiver presente. **Padrão****Nota:** `auto` tornou-se o valor padrão a partir do JDK 12 para todas as compilações de 64 bits e assume que o arquivo compartilhado está localizado em: `$JAVA_HOME/lib/server/classes.jsa` (Windows: `$JAVA_HOME/bin/server/classes.jsa`)
*   `on`: Exige que o CDS seja usado. Se a JVM encontrar um problema ao tentar carregar o arquivo compartilhado, a JVM imprimirá uma mensagem de erro e sairá. **Nota:** Isso deve ser **usado apenas para fins de teste** e nunca em um ambiente de produção.
*   `off`: Desabilita o CDS.
*   `dump`: Gera um arquivo CDS.

### Benefícios de Desempenho do CDS

Os ganhos de desempenho do CDS são de cerca de 33% quando testados usando uma aplicação simples "Hello World", como visto nos resultados de teste abaixo:

Com `-Xshare:off`, o tempo de execução da aplicação foi de 0,10 segundos, enquanto com `-Xshare:on` foi de 0,05 segundos.

Os benefícios de desempenho mensuráveis do uso do CDS apenas para classes principais do JDK tornam-se menores à medida que o tamanho e a complexidade do processo Java sendo iniciado aumentam. Esta foi uma das motivações para a introdução do AppCDS.

## AppCDS

O AppCDS foi adicionado ao HotSpot JVM como parte do lançamento do JDK 10 com [JEP 310: Application Class-Data Sharing](<https://openjdk.org/jeps/310>). O AppCDS visa estender os benefícios do CDS para incluir classes de aplicação. O AppCDS teve mais aprimoramentos, incluindo grandes melhorias com os lançamentos do JDK 13 e 19, que melhoram seu desempenho e facilidade de uso. O AppCDS permite um benefício mais consistente do uso do CDS à medida que o tamanho e a complexidade de uma aplicação Java crescem.

O AppCDS suporta os seguintes locais:

*   Classes de plataforma da imagem de tempo de execução
*   Classes de aplicação da imagem de tempo de execução
*   Classes de aplicação do classpath
*   Classes de aplicação do module path

### Usando AppCDS

Como o CDS cobria apenas as classes Java principais incluídas no JDK, era possível incluir um arquivo compartilhado pré-processado como parte do JDK. Isso permitiu que os desenvolvedores usassem o CDS prontamente, sem qualquer interação adicional (para todas as plataformas a partir do JDK 12). No entanto, para usar o AppCDS, é necessária alguma intervenção ativa do desenvolvedor.

#### Gerando um Arquivo Compartilhado Dinâmico

Adicionado no JDK 13, o recurso de arquivo compartilhado dinâmico foi projetado para facilitar o uso do AppCDS para a maioria dos casos de uso e fornecer melhor suporte para aplicações que usam carregadores de classe definidos pelo usuário. Para gerar um arquivo compartilhado dinâmico, você precisará usar o comando `-XX:ArchiveClassesAtExit=<name of archive file>`, que gerará um arquivo compartilhado na saída da aplicação. Um exemplo concreto do uso deste comando seria assim:

**Nota:** A geração de um arquivo compartilhado terá um impacto significativo no desempenho durante os processos de inicialização e encerramento da JVM.

Para usar o arquivo gerado em lançamentos subsequentes, o `-XX:SharedArchiveFile=<name of archive file>` precisará ser usado. Usar o arquivo gerado do exemplo anterior seria assim:

##### Arquivo Dinâmico sem Arquivo Padrão

Quando um arquivo dinâmico é gerado, ele não incluirá classes principais que estão incluídas no arquivo padrão. Em vez disso, o arquivo dinâmico fará referência ao local padrão para o arquivo padrão. Suponha que o arquivo de arquivo esteja faltando ou corrompido. Nesse caso, as classes principais e os metadados do JDK serão carregados normalmente, impactando negativamente o desempenho da inicialização (ou, se `-Xshare:on` for usado, o sistema sairá).

##### Autogerando um Arquivo Dinâmico

Com o lançamento do JDK 19, [JDK-8261455](<https://bugs.openjdk.org/browse/JDK-8261455>) introduziu a capacidade da JVM de gerar automaticamente um arquivo compartilhado com `-XX:+AutoCreateSharedArchive`. Este comando instruirá a JVM a procurar o arquivo compartilhado definido com `-XX:SharedArchiveFile`; se o arquivo não estiver presente ou não estiver em um estado válido, um arquivo será gerado. Uma vantagem fundamental deste recurso é que o mesmo comando `java` usado para iniciar uma aplicação pode gerar o arquivo, reduzindo o trabalho de manutenção.

Um novo arquivo será gerado se o arquivo existente estiver corrompido, gerado usando uma versão mais antiga do JDK, ou se qualquer um dos JARs dependentes tiver sido alterado.

#### Arquivos Estáticos

Na maioria dos casos de uso, um arquivo dinâmico será suficiente. No entanto, pode haver casos em que um arquivo estático pode ser vantajoso. Algumas dessas situações podem ser:

*   Armazenar dados adicionais de símbolos e strings
*   Desempenho de inicialização ligeiramente melhorado em alguns cenários

Para criar um arquivo estático, primeiro, uma classlist deve ser gerada usando o comando `-XX:DumpLoadedClassList=<classlist name>`. Durante este processo, o CDS também deve ser desativado (`-Xshare:off`). Continuando o exemplo acima de usar o aplicativo Spring Boot Petclinic, para criar uma classlist, execute o seguinte comando:

Em seguida, o arquivo compartilhado deve ser gerado usando o comando `-XX:SharedArchiveFile=<name of archive file>` com `-Xshare:dump` e a classlist gerada na etapa anterior `-XX:SharedClassListFile=<classlist name>`, como neste exemplo:

Para usar o arquivo gerado em lançamentos subsequentes, o `-XX:SharedArchiveFile=<name of archive file>` precisará ser usado. Usar o arquivo gerado do exemplo anterior seria assim:

##### Arquivo Estático de Classes Compartilhadas

Abaixo está um exemplo de uso do recurso de arquivo estático para criar um arquivo de classes/bibliotecas compartilhadas que são usadas em várias aplicações Java:

> Para incluir classes de hello.jar e hi.jar, os arquivos .jar devem ser adicionados ao classpath especificado pelo parâmetro -cp.

> Crie uma lista de todas as classes usadas pela aplicação Hello e outra lista para a aplicação Hi:

> > Crie uma única lista de classes usadas por todas as aplicações que compartilharão o arquivo de arquivo compartilhado.

> Linux e macOS Os seguintes comandos combinam os arquivos hello.classlist e hi.classlist em um único arquivo, common.classlist:

> > Windows Os seguintes comandos combinam os arquivos hello.classlist e hi.classlist em um único arquivo, common.classlist:

> > Crie um arquivo compartilhado chamado common.jsa que contém todas as classes em common.classlist:

> > O parâmetro classpath usado é o prefixo de classpath comum compartilhado pelas aplicações Hello e Hi.

> Execute as aplicações Hello e Hi com o mesmo arquivo compartilhado:

> > [Fonte](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/java.html#sharing-a-shared-archive-across-multiple-application-processes>)

##### Arquivo Estático com Arquivo CDS Padrão

Ao contrário de um arquivo dinâmico, um arquivo estático _inclui_ classes principais do JDK. Portanto, se o arquivo CDS padrão tiver sido excluído ou corrompido no sistema, isso não afetaria um processo JVM na inicialização que está referenciando um arquivo estático.

## Depurando CDS

O CDS é projetado para ser à prova de falhas e deve funcionar perfeitamente em segundo plano. O CDS, quando usado com a configuração padrão de `-Xshare:auto`, deve, se o arquivo compartilhado estiver faltando, corrompido ou inválido, retornar ao carregamento das classes do sistema de arquivos.

No entanto, pode haver ocasiões em que o CDS realmente cause a falha da JVM na inicialização. Esta seção abordará problemas comuns que fazem o CDS falhar, bem como problemas que podem ocorrer ao tentar criar um arquivo CDS e como diagnosticar e depurar esses problemas.

### Mensagens de Erro

A forma mais imediata de depuração seria quando o CDS encontra um problema na inicialização que causa a saída da JVM. Isso só deve acontecer quando `-Xshare:on` é usado. Se a JVM encontrar um erro ao tentar carregar um arquivo compartilhado quando `-Xshare:auto` está definido (padrão), a JVM ignorará silenciosamente o erro e carregará as classes normalmente. Por esse motivo, `-Xshare:on` é desencorajado em ambientes de produção.

#### Arquivo Compartilhado Inválido ou Ausente

Se o arquivo compartilhado definido por `-XX:SharedArchiveFile` não puder ser encontrado, o HotSpot JVM imprimirá esta mensagem no console:

Se o arquivo compartilhado definido por `-XX:SharedArchiveFile` estiver corrompido ou inválido, o HotSpot JVM imprimirá esta mensagem no console:

Se o arquivo CDS padrão estiver faltando ou corrompido, o HotSpot JVM imprimirá esta mensagem no console:

#### Classlist Inválida ou Ausente

Ao gerar um arquivo compartilhado estático e a classlist definida por `-XX: SharedClassListFile` não for encontrada, o seguinte erro será impresso:

Ao gerar um arquivo compartilhado estático e a classlist definida por `-XX: SharedClassListFile` estiver corrompida, o seguinte erro será impresso:

### Relatório de Geração de Arquivo

Ao gerar um arquivo compartilhado, o processo JVM, por padrão, imprimirá muitas informações de diagnóstico no console. Essas informações podem ser usadas para ver quais classes e bibliotecas estão ou não sendo adicionadas ao arquivo compartilhado.

Classes/bibliotecas sendo adicionadas ao arquivo compartilhado:

Classes/bibliotecas que não puderam ser adicionadas ao arquivo compartilhado:

### Classlist Gerada

Ao gerar um arquivo estático, o arquivo classlist pode ser inspecionado para ver quais classes e outros metadados da JVM serão adicionados ao arquivo compartilhado. Conforme observado nos comentários no topo do arquivo gerado, este arquivo não deve ser modificado manualmente. Abaixo está uma amostra de como um arquivo classlist se pareceria:

### Log de Depuração

Existem algumas opções para configurar o HotSpot para gerar logs adicionais no console para detalhar melhor o comportamento interno do CDS.

#### Log de Depuração do CDS

*   `-Xlog:cds=debug`: Pode ser usado tanto durante a geração quanto o carregamento de um arquivo compartilhado para fornecer estatísticas detalhadas sobre classes e metadados adicionais sendo adicionados ao arquivo compartilhado, ou durante
*   `-Xlog:cds+lambda=debug`: Assim como `-Xlog:cds=debug`, pode ser usado tanto na geração quanto no carregamento do arquivo. Esta opção fornece informações adicionais especificamente sobre o tratamento de lambdas pelo CDS.

#### Log de Depuração de Carregamento de Classes

Ao carregar um arquivo compartilhado, o argumento JVM `-verbose:class` pode ser usado para ver quais classes estão sendo carregadas do arquivo compartilhado, ou através do processo normal de carregamento de classes do HotSpot. Se uma classe estiver sendo carregada de um arquivo compartilhado, ela reportará sua origem como `shared objects file`. Como neste exemplo de saída abaixo:

Se a classe não estiver sendo carregada de um arquivo compartilhado, ela reportará sua localização de origem como aqui com `java.lang.Object` e `java.io.Serializable` sendo carregadas do módulo `jrt:/java.base`:

## Mais Aprendizado

### Neste tutorial

O que é CDS? Usando CDS AppCDS Depurando CDS Mais Aprendizado

Última atualização: 14 de setembro de 2021

[Home](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > CDS e AppCDS no Hotspot

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)