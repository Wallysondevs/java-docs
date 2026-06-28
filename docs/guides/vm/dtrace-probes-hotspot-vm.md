# Probes DTrace na HotSpot VM

## 10 Probes DTrace na HotSpot VM

Este capítulo descreve o suporte a DTrace na HotSpot VM da Oracle. Os providers hotspot e hotspot_jni permitem acessar probes que você pode usar para monitorar a aplicação Java em execução, juntamente com o estado interno e as atividades da Java Virtual Machine (JVM). Todas as probes são probes USDT e você pode acessá-las usando o process-id do processo da JVM.

Tópicos:

  * [Usando o Provider hotspot](<#/doc/guides/vm/dtrace-probes-hotspot-vm>)

    * [Probes de Ciclo de Vida da VM](<#/doc/guides/vm/dtrace-probes-hotspot-vm>)

    * [Probes de Ciclo de Vida de Thread](<#/doc/guides/vm/dtrace-probes-hotspot-vm>)

    * [Probes de Carregamento de Classes](<#/doc/guides/vm/dtrace-probes-hotspot-vm>)

    * [Probes de Garbage Collection](<#/doc/guides/vm/dtrace-probes-hotspot-vm>)

    * [Probes de Compilação de Métodos](<#/doc/guides/vm/dtrace-probes-hotspot-vm>)

    * [Probes de Monitor](<#/doc/guides/vm/dtrace-probes-hotspot-vm>)

    * [Probes de Rastreamento de Aplicação](<#/doc/guides/vm/dtrace-probes-hotspot-vm>)

  * [Usando o Provider hotspot_jni](<#/doc/guides/vm/dtrace-probes-hotspot-vm>)

  * [Exemplo de Probes DTrace](<#/doc/guides/vm/dtrace-probes-hotspot-vm>)




### Usando o Provider hotspot

O provider hotspot permite acessar probes que você pode usar para rastrear o tempo de vida da VM, eventos de início e parada de threads, estatísticas do garbage collector (GC) e do pool de memória, compilações de métodos e atividade de monitor. Uma flag de inicialização pode habilitar probes adicionais que você pode usar para monitorar o programa Java em execução, como alocações de objetos e probes de entrada e retorno de métodos. As probes hotspot se originam na biblioteca da VM (libjvm.so), então elas são fornecidas por programas que incorporam a VM.

Muitas das probes no provider possuem argumentos para fornecer detalhes adicionais sobre o estado da VM. Muitos desses argumentos são IDs opacos que podem ser usados para vincular os disparos das probes entre si. No entanto, strings e outros dados também são fornecidos. Quando valores de string são fornecidos, eles estão sempre presentes como um par: um ponteiro para dados UTF-8 modificados não terminados (consulte a [Especificação da JVM](<https://docs.oracle.com/javase/specs/>)), e um valor de comprimento que indica a extensão desses dados. Não há garantia de que os dados da string sejam terminados por um caractere NUL, e é necessário usar o intrínseco `copyinstr()` terminado por comprimento para ler os dados da string. Isso é verdade mesmo quando nenhum dos caracteres está fora do intervalo ASCII.

#### Probes de Ciclo de Vida da VM

As seguintes probes estão disponíveis para rastrear atividades do ciclo de vida da VM. Nenhuma possui argumentos.

Tabela 10-1 Probes de Ciclo de Vida da VM

Probe | Descrição
---|---
`vm-init-begin` | Probe que inicia quando a inicialização da VM começa
`vm-init-end` | Probe que inicia quando a inicialização da VM termina, e a VM está pronta para começar a executar o código da aplicação
`vm-shutdown` | Probe que inicia quando a VM é desligada devido à terminação do programa ou a um erro

#### Probes de Ciclo de Vida de Thread

As seguintes probes estão disponíveis para rastrear eventos de início e parada de threads.

Probe | Descrição
---|---
`thread-start` | Probe que inicia quando uma thread começa.
`thread-stop` | Probe que inicia quando a thread foi concluída.

Os seguintes argumentos estão disponíveis para as probes de ciclo de vida de thread:

Argumentos da Probe | Descrição
---|---
`args[0]` | Um ponteiro para dados de string UTF-8 que contém o nome da thread.
`args[1]` | O comprimento dos dados do nome da thread (em bytes).
`args[2]` | O ID da thread Java. Este valor corresponde a outras probes da HotSpot VM que contêm um argumento de thread.
`args[3]` | O ID da thread nativa ou do SO. Este ID é atribuído pelo sistema operacional hospedeiro.
`args[4]` | Um valor booleano que indica se esta thread é um daemon ou não. Um valor de 0 indica uma thread não-daemon.

#### Probes de Carregamento de Classes

As seguintes probes estão disponíveis para rastrear a atividade de carregamento e descarregamento de classes.

Probe | Descrição
---|---
`class-loaded` | Probe que dispara quando uma classe é carregada
`class-unloaded` | Probe que dispara quando uma classe é descarregada do sistema

Os seguintes argumentos estão disponíveis para as probes de `classloading`:

Argumentos da Probe | Descrição
---|---
`args[0]` | Um ponteiro para dados de string UTF-8 que contém o nome da classe que é carregada
`args[1]` | O comprimento dos dados do nome da classe (em bytes)
`args[2]` | O ID do class loader, que é um identificador único para um class loader na VM. (Este é o class loader que carregou a classe.)
`args[3]` | Um valor booleano que indica se a classe é uma classe compartilhada (se a classe foi carregada do arquivo compartilhado)

#### Probes de Garbage Collection

Probes estão disponíveis que você pode usar para medir a duração de um ciclo de garbage collection em todo o sistema (para aqueles garbage collectors que têm um início e fim definidos). Cada pool de memória é rastreado independentemente. As probes para pools individuais passam o nome do gerenciador de memória, o nome do pool e informações de uso do pool tanto no início quanto no fim da coleta do pool.

As seguintes probes estão disponíveis para atividades de garbage collection:

Probe | Descrição
---|---
`gc-begin` | Probe que inicia quando uma coleta em todo o sistema começa. O único argumento disponível para esta probe, (`arg[0]`), é um valor booleano que indica se deve ser realizado um Full GC.
`gc-end` | Probe que inicia quando uma coleta em todo o sistema é concluída. Sem argumentos.
`mem-pool-gc-begin` | Probe que inicia quando um pool de memória individual é coletado.
`mem-pool-gc-end` | Probe que inicia depois que um pool de memória individual é coletado.

Os seguintes argumentos estão disponíveis para as probes de pool de memória:

Argumentos da Probe | Descrição
---|---
`args[0]` | Um ponteiro para os dados de string UTF-8 que contém o nome do gerenciador que gerencia este pool de memória.
`args[1]` | O comprimento dos dados do nome do gerenciador (em bytes).
`args[2]` | Um ponteiro para os dados de string UTF-8 que contém o nome do pool de memória.
`args[3]` | O comprimento dos dados do nome do pool de memória (em bytes).
`args[4]` | O tamanho inicial do pool de memória (em bytes).
`args[5]` | A quantidade de memória em uso no pool de memória (em bytes).
`args[6]` | O número de páginas comprometidas no pool de memória.
`args[7]` | O tamanho máximo do pool de memória.

#### Probes de Compilação de Métodos

Probes estão disponíveis para indicar quais métodos estão sendo compilados e por qual compilador, e para rastrear quando os métodos compilados são instalados ou desinstalados.

As seguintes probes estão disponíveis para marcar o início e o fim da compilação de métodos:

Probe | Descrição
---|---
`method-compile-begin` | Probe que inicia quando a compilação do método começa.
`method-compile-end` | Probe que inicia quando a compilação do método é concluída. Além dos seguintes argumentos, o argumento `argv[8]` é um valor booleano que indica se a compilação foi bem-sucedida.

Os seguintes argumentos estão disponíveis para as probes de compilação de métodos:

Argumentos da Probe | Descrição
---|---
`args[0]` | Um ponteiro para dados de string UTF-8 que contém o nome do compilador que está compilando este método.
`args[1]` | O comprimento dos dados do nome do compilador (em bytes).
`args[2]` | Um ponteiro para dados de string UTF-8 que contém o nome da classe do método que está sendo compilado.
`args[3]` | O comprimento dos dados do nome da classe (em bytes).
`args[4]` | Um ponteiro para dados de string UTF-8 que contém o nome do método que está sendo compilado.
`args[5]` | O comprimento dos dados do nome do método (em bytes).
`args[6]` | Um ponteiro para dados de string UTF-8 que contém a assinatura do método que está sendo compilado.
`args[7]` | O comprimento dos dados da assinatura (em bytes).

As seguintes probes estão disponíveis quando métodos compilados são instalados para execução ou desinstalados:

Probe | Descrição
---|---
`compiled-method-load` | Probe que inicia quando um método compilado é instalado. O argumento adicional, `argv[6]`, contém um ponteiro para o código compilado, e `argv[7]` é o tamanho do código compilado.
`compiled-method-unload` | Probe que inicia quando um método compilado é desinstalado.

Os seguintes argumentos estão disponíveis para a probe de carregamento de método compilado:

Argumentos da Probe | Descrição
---|---
`args[0]` | Um ponteiro para dados de string UTF-8 que contém o nome da classe do método que está sendo instalado.
`args[1]` | O comprimento dos dados do nome da classe (em bytes).
`args[2]` | Um ponteiro para dados de string UTF-8 que contém o nome do método que está sendo instalado.
`args[3]` | O comprimento dos dados do nome do método (em bytes).
`args[4]` | Um ponteiro para dados de string UTF-8 que contém a assinatura do método que está sendo instalado.
`args[5]` | O comprimento dos dados da assinatura (em bytes).

#### Probes de Monitor

Quando sua aplicação Java é executada, threads entram e saem de monitores, aguardam em monitores e realizam notificações. Probes estão disponíveis para todos os eventos de espera e notificação, e para eventos de entrada e saída de monitores contenciosos.

Uma entrada de monitor contencioso ocorre quando uma thread tenta entrar em um monitor enquanto outra thread está no monitor. Um evento de saída de monitor contencioso ocorre quando uma thread sai de um monitor enquanto outras threads estão esperando para entrar no monitor. Os eventos de entrada e saída de monitor contencioso podem não corresponder entre si em relação à thread que encontra esses eventos, embora uma saída contenciosa de uma thread seja esperada para corresponder a uma entrada contenciosa em outra thread (a thread esperando para entrar no monitor).

Eventos de monitor fornecem o ID da thread, um ID do monitor e o tipo da classe do objeto como argumentos. O ID da thread e o tipo da classe podem ser mapeados de volta para o programa Java, enquanto o ID do monitor pode fornecer informações de correspondência entre os disparos das probes.

A existência dessas probes na VM degrada o desempenho e elas só iniciam quando a flag `-XX:+ExtendedDTraceProbes` é definida na linha de comando Java. Esta flag é ativada e desativada dinamicamente em tempo de execução usando o utilitário `jinfo`.

Se a flag estiver desativada, as probes de monitor estão presentes na listagem de probes que pode ser obtida do Dtrace, mas as probes permanecem dormentes e não iniciam. A remoção desta restrição está planejada para futuras versões da VM, e essas probes serão habilitadas sem impacto no desempenho.

As seguintes probes estão disponíveis para monitorar eventos:

Probe | Descrição
---|---
`monitor-contended-enter` | Probe que inicia quando uma thread tenta entrar em um monitor contencioso
`monitor-contended-entered` | Probe que inicia quando uma thread entra com sucesso no monitor contencioso
`monitor-contended-exit` | Probe que inicia quando uma thread sai de um monitor e outras threads estão esperando para entrar
`monitor-wait` | Probe que inicia quando uma thread começa uma espera em um monitor usando `Object.wait()`. O argumento adicional, `args[4]`, é um valor long que indica o timeout sendo usado.
`monitor-waited` | Probe que inicia quando uma thread completa uma ação `Object.wait()`.
`monitor-notify` | Probe que inicia quando uma thread chama `Object.notify()` para notificar os esperadores em um monitor.
`monitor-notifyAll` | Probe que inicia quando uma thread chama `Object.notifyAll()` para notificar os esperadores em um monitor.

Os seguintes argumentos estão disponíveis para o monitor:

Argumentos da Probe | Descrição
---|---
`args[0]` | O identificador da thread Java para a thread que executa a operação do monitor.
`args[1]` | Um identificador único, mas opaco, para o monitor específico sobre o qual a ação é realizada.
`args[2]` | Um ponteiro para dados de string UTF-8 que contém o nome da classe do objeto sobre o qual a ação está sendo realizada.
`args[3]` | O comprimento dos dados do nome da classe (em bytes).

#### Probes de Rastreamento de Aplicação

Você pode usar probes para permitir uma análise detalhada da execução de threads Java. Probes de rastreamento de aplicação iniciam quando um método é entrado ou retornado, ou quando um objeto Java foi alocado.

A existência dessas probes na VM degrada o desempenho e elas só iniciam quando a VM tem a flag `ExtendedDTraceProbes` habilitada. Por padrão, as probes estão presentes em qualquer listagem de probes na VM, mas ficam dormentes sem a flag apropriada. A remoção desta restrição está planejada para futuras versões da VM, e essas probes serão habilitadas sem impacto no desempenho.

As seguintes probes estão disponíveis para a entrada e saída de métodos:

Probe | Descrição
---|---
`method-entry` | Probe que inicia quando um método está sendo entrado.
`method-return` | Probe que inicia quando um método retorna, seja normalmente ou devido a uma exceção.

Os seguintes argumentos estão disponíveis para a entrada e saída de métodos:

Argumentos da Probe | Descrição
---|---
`args[0]` | O ID da thread Java da thread que está entrando ou saindo do método.
`args[1]` | Um ponteiro para dados de string UTF-8 que contém o nome da classe do método.
`args[2]` | O comprimento dos dados do nome da classe (em bytes).
`args[3]` | Um ponteiro para dados de string UTF-8 que contém o nome do método.
`args[4]` | O comprimento dos dados do nome do método (em bytes).
`args[5]` | Um ponteiro para dados de string UTF-8 que contém a assinatura do método.
`args[6]` | O comprimento dos dados da assinatura (em bytes).

A seguinte probe está disponível para a alocação de objetos:

Probe | Descrição
---|---
`object-alloc` | Probe que inicia quando qualquer objeto é alocado, desde que a flag `ExtendedDTraceProbes` esteja habilitada.

Os seguintes argumentos estão disponíveis para a probe de alocação de objetos:

Argumentos da Probe | Descrição
---|---
`args[0]` | O ID da thread Java da thread que está alocando o objeto.
`args[1]` | Um ponteiro para dados de string UTF-8 que contém o nome da classe do objeto que está sendo alocado.
`args[2]` | O comprimento dos dados do nome da classe (em bytes).
`args[3]` | O tamanho do objeto que está sendo alocado.

### Usando o Provider hotspot_jni

Para chamar código Java a partir de código nativo, devido à incorporação da VM em uma aplicação ou à execução de código nativo dentro de uma aplicação Java, o código nativo deve fazer uma chamada através da Java Native Interface (JNI). A JNI fornece vários métodos para invocar código Java e examinar o estado da VM. Probes DTrace são fornecidas no ponto de entrada e no ponto de retorno para cada um desses métodos. As probes são fornecidas pelo provider hotspot_jni. O nome da probe é o nome do método JNI, anexado com `-entry` para probes de entrada, e `-return` para probes de retorno. Os argumentos disponíveis em cada probe de entrada são os argumentos que foram fornecidos à função, com exceção dos métodos `Invoke*`, que omitem os argumentos que são passados para o método Java. As probes de retorno têm o valor de retorno do método como um argumento (se disponível).

### Exemplo de Probes DTrace
```
    provider hotspot {
      probe vm-init-begin();
      probe vm-init-end();
      probe vm-shutdown();
      probe class-loaded(
          char* class_name, uintptr_t class_name_len, uintptr_t class_loader_id, bool is_shared);
      probe class-unloaded(
          char* class_name, uintptr_t class_name_len, uintptr_t class_loader_id, bool is_shared);
      probe gc-begin(bool is_full);
      probe gc-end();
      probe mem-pool-gc-begin(
          char* mgr_name, uintptr_t mgr_name_len, char* pool_name, uintptr_t pool_name_len, 
          uintptr_t initial_size, uintptr_t used, uintptr_t committed, uintptr_t max_size);
      probe mem-pool-gc-end(
          char* mgr_name, uintptr_t mgr_name_len, char* pool_name, uintptr_t pool_name_len, 
          uintptr_t initial_size, uintptr_t used, uintptr_t committed, uintptr_t max_size);
      probe thread-start(
          char* thread_name, uintptr_t thread_name_length, 
          uintptr_t java_thread_id, uintptr_t native_thread_id, bool is_daemon);
      probe thread-stop(
          char* thread_name, uintptr_t thread_name_length, 
          uintptr_t java_thread_id, uintptr_t native_thread_id, bool is_daemon);
      probe method-compile-begin(
          char* class_name, uintptr_t class_name_len, 
          char* method_name, uintptr_t method_name_len,
          char* signature, uintptr_t signature_len);
      probe method-compile-end(
          char* class_name, uintptr_t class_name_len, 
          char* method_name, uintptr_t method_name_len,
          char* signature, uintptr_t signature_len,
          bool is_success);
      probe compiled-method-load(
          char* class_name, uintptr_t class_name_len, 
          char* method_name, uintptr_t method_name_len,
          char* signature, uintptr_t signature_len,
          void* code, uintptr_t code_size);
      probe compiled-method-unload(
          char* class_name, uintptr_t class_name_len, 
          char* method_name, uintptr_t method_name_len,
          char* signature, uintptr_t signature_len);
      probe monitor-contended-enter(
          uintptr_t java_thread_id, uintptr_t monitor_id, 
          char* class_name, uintptr_t class_name_len);
      probe monitor-contended-entered(
          uintptr_t java_thread_id, uintptr_t monitor_id, 
          char* class_name, uintptr_t class_name_len);
      probe monitor-contended-exit(
          uintptr_t java_thread_id, uintptr_t monitor_id, 
          char* class_name, uintptr_t class_name_len);
      probe monitor-wait(
          uintptr_t java_thread_id, uintptr_t monitor_id, 
          char* class_name, uintptr_t class_name_len,
          uintptr_t timeout);
      probe monitor-waited(
          uintptr_t java_thread_id, uintptr_t monitor_id, 
          char* class_name, uintptr_t class_name_len);
      probe monitor-notify(
          uintptr_t java_thread_id, uintptr_t monitor_id, 
          char* class_name, uintptr_t class_name_len);
      probe monitor-notifyAll(
          uintptr_t java_thread_id, uintptr_t monitor_id, 
          char* class_name, uintptr_t class_name_len);
      probe method-entry(
          uintptr_t java_thread_id, char* class_name, uintptr_t class_name_len,
          char* method_name, uintptr_t method_name_len,
          char* signature, uintptr_t signature_len);
      probe method-return(
          uintptr_t java_thread_id, char* class_name, uintptr_t class_name_len,
          char* method_name, uintptr_t method_name_len,
          char* signature, uintptr_t signature_len);
      probe object-alloc(
          uintptr_t java_thread_id, char* class_name, uintptr_t class_name_len,
          uintptr_t size);
    };
    
    provider hotspot_jni {
      probe AllocObject-entry(void*, void*);
      probe AllocObject-return(void*);
      probe AttachCurrentThreadAsDaemon-entry(void*, void**, void*);
      probe AttachCurrentThreadAsDaemon-return(uint32_t);
      probe AttachCurrentThread-entry(void*, void**, void*);
      probe AttachCurrentThread-return(uint32_t);
      probe CallBooleanMethodA-entry(void*, void*, uintptr_t);
      probe CallBooleanMethodA-return(uintptr_t);
      probe CallBooleanMethod-entry(void*, void*, uintptr_t);
      probe CallBooleanMethod-return(uintptr_t);
      probe CallBooleanMethodV-entry(void*, void*, uintptr_t);
      probe CallBooleanMethodV-return(uintptr_t);
      probe CallByteMethodA-entry(void*, void*, uintptr_t);
      probe CallByteMethodA-return(char);
      probe CallByteMethod-entry(void*, void*, uintptr_t);
      probe CallByteMethod-return(char);
      probe CallByteMethodV-entry(void*, void*, uintptr_t);
    
      probe CallByteMethodV-return(char);
      probe CallCharMethodA-entry(void*, void*, uintptr_t);
      probe CallCharMethodA-return(uint16_t);
      probe CallCharMethod-entry(void*, void*, uintptr_t);
      probe CallCharMethod-return(uint16_t);
      probe CallCharMethodV-entry(void*, void*, uintptr_t);
      probe CallCharMethodV-return(uint16_t);
      probe CallDoubleMethodA-entry(void*, void*, uintptr_t);
      probe CallDoubleMethodA-return(double);
      probe CallDoubleMethod-entry(void*, void*, uintptr_t);
      probe CallDoubleMethod-return(double);
      probe CallDoubleMethodV-entry(void*, void*, uintptr_t);
      probe CallDoubleMethodV-return(double);
      probe CallFloatMethodA-entry(void*, void*, uintptr_t);
      probe CallFloatMethodA-return(float);
      probe CallFloatMethod-entry(void*, void*, uintptr_t);
      probe CallFloatMethod-return(float);
      probe CallFloatMethodV-entry(void*, void*, uintptr_t);
      probe CallFloatMethodV-return(float);
      probe CallIntMethodA-entry(void*, void*, uintptr_t);
      probe CallIntMethodA-return(uint32_t);
      probe CallIntMethod-entry(void*, void*, uintptr_t);
      probe CallIntMethod-return(uint32_t);
      probe CallIntMethodV-entry(void*, void*, uintptr_t);
      probe CallIntMethodV-return(uint32_t);
      probe CallLongMethodA-entry(void*, void*, uintptr_t);
      probe CallLongMethodA-return(uintptr_t);
      probe CallLongMethod-entry(void*, void*, uintptr_t);
      probe CallLongMethod-return(uintptr_t);
      probe CallLongMethodV-entry(void*, void*, uintptr_t);
      probe CallLongMethodV-return(uintptr_t);
      probe CallNonvirtualBooleanMethodA-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualBooleanMethodA-return(uintptr_t);
      probe CallNonvirtualBooleanMethod-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualBooleanMethod-return(uintptr_t);
      probe CallNonvirtualBooleanMethodV-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualBooleanMethodV-return(uintptr_t);
      probe CallNonvirtualByteMethodA-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualByteMethodA-return(char);
      probe CallNonvirtualByteMethod-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualByteMethod-return(char);
      probe CallNonvirtualByteMethodV-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualByteMethodV-return(char);
      probe CallNonvirtualCharMethodA-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualCharMethodA-return(uint16_t);
      probe CallNonvirtualCharMethod-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualCharMethod-return(uint16_t);
      probe CallNonvirtualCharMethodV-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualCharMethodV-return(uint16_t);
      probe CallNonvirtualDoubleMethodA-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualDoubleMethodA-return(double);
      probe CallNonvirtualDoubleMethod-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualDoubleMethod-return(double);
      probe CallNonvirtualDoubleMethodV-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualDoubleMethodV-return(double);
      probe CallNonvirtualFloatMethodA-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualFloatMethodA-return(float);
      probe CallNonvirtualFloatMethod-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualFloatMethod-return(float);
      probe CallNonvirtualFloatMethodV-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualFloatMethodV-return(float);
      probe CallNonvirtualIntMethodA-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualIntMethodA-return(uint32_t);
      probe CallNonvirtualIntMethod-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualIntMethod-return(uint3t);
      probe CallNonvirtualIntMethodV-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualIntMethodV-return(uint32_t);
      probe CallNonvirtualLongMethodA-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualLongMethodA-return(uintptr_t);
      probe CallNonvirtualLongMethod-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualLongMethod-return(uintptr_t);
      probe CallNonvirtualLongMethodV-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualLongMethodV-return(uintptr_t);
      probe CallNonvirtualObjectMethodA-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualObjectMethodA-return(void*);
      probe CallNonvirtualObjectMethod-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualObjectMethod-return(void*);
      probe CallNonvirtualObjectMethodV-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualObjectMethodV-return(void*);
      probe CallNonvirtualShortMethodA-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualShortMethodA-return(uint16_t);
      probe CallNonvirtualShortMethod-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualShortMethod-return(uint16_t);
      probe CallNonvirtualShortMethodV-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualShortMethodV-return(uint16_t);
      probe CallNonvirtualVoidMethodA-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualVoidMethodA-return();
      probe CallNonvirtualVoidMethod-entry(void*, void*, void*, uintptr_t);
      probe CallNonvirtualVoidMethod-return();
      probe CallNonvirtualVoidMethodV-entry(void*, void*, void*, uintptr_t);  
      probe CallNonvirtualVoidMethodV-return();
      probe CallObjectMethodA-entry(void*, void*, uintptr_t);
      probe CallObjectMethodA-return(void*);
      probe CallObjectMethod-entry(void*, void*, uintptr_t);
      probe CallObjectMethod-return(void*);
      probe CallObjectMethodV-entry(void*, void*, uintptr_t);
      probe CallObjectMethodV-return(void*);
      probe CallShortMethodA-entry(void*, void*, uintptr_t);
      probe CallShortMethodA-return(uint16_t);
      probe CallShortMethod-entry(void*, void*, uintptr_t);
      probe CallShortMethod-return(uint16_t);
      probe CallShortMethodV-entry(void*, void*, uintptr_t);
      probe CallShortMethodV-return(uint16_t);
      probe CallStaticBooleanMethodA-entry(void*, void*, uintptr_t);
      probe CallStaticBooleanMethodA-return(uintptr_t);
      probe CallStaticBooleanMethod-entry(void*, void*, uintptr_t);
      probe CallStaticBooleanMethod-return(uintptr_t);
      probe CallStaticBooleanMethodV-entry(void*, void*, uintptr_t);
      probe CallStaticBooleanMethodV-return(uintptr_t);
      probe CallStaticByteMethodA-entry(void*, void*, uintptr_t);
      probe CallStaticByteMethodA-return(char);
      probe CallStaticByteMethod-entry(void*, void*, uintptr_t);
      probe CallStaticByteMethod-return(char);
      probe CallStaticByteMethodV-entry(void*, void*, uintptr_t);
      probe CallStaticByteMethodV-return(char);
      probe CallStaticCharMethodA-entry(void*, void*, uintptr_t);
      probe CallStaticCharMethodA-return(uint16_t);
      probe CallStaticCharMethod-entry(void*, void*, uintptr_t);
      probe CallStaticCharMethod-return(uint16_t);
      probe CallStaticCharMethodV-entry(void*, void*, uintptr_t);
      probe CallStaticCharMethodV-return(uint16_t);
      probe CallStaticDoubleMethodA-entry(void*, void*, uintptr_t);
      probe CallStaticDoubleMethodA-return(double);
      probe CallStaticDoubleMethod-entry(void*, void*, uintptr_t);
      probe CallStaticDoubleMethod-return(double);
      probe CallStaticDoubleMethodV-entry(void*, void*, uintptr_t);
      probe CallStaticDoubleMethodV-return(double);
      probe CallStaticFloatMethodA-entry(void*, void*, uintptr_t);
      probe CallStaticFloatMethodA-return(float);
      probe CallStaticFloatMethod-entry(void*, void*, uintptr_t);
      probe CallStaticFloatMethod-return(float);
      probe CallStaticFloatMethodV-entry(void*, void*, uintptr_t);
      probe CallStaticFloatMethodV-return(float);
      probe CallStaticIntMethodA-entry(void*, void*, uintptr_t);
      probe CallStaticIntMethodA-return(uint32_t);
      probe CallStaticIntMethod-entry(void*, void*, uintptr_t);
      probe CallStaticIntMethod-return(uint32_t);
      probe CallStaticIntMethodentry(void*, void*, uintptr_t);
      probe CallStaticIntMethodV-return(uint32_t);
      probe CallStaticLongMethodA-entry(void*, void*, uintptr_t);
      probe CallStaticLongMethodA-return(uintptr_t);
      probe CallStaticLongMethod-entry(void*, void*, uintptr_t);
      probe CallStaticLongMethod-return(uintptr_t);
      probe CallStaticLongMethodV-entry(void*, void*, uintptr_t);
      probe CallStaticLongMethodV-return(uintptr_t);
      probe CallStaticObjectMethodA-entry(void*, void*, uintptr_t);
      probe CallStaticObjectMethodA-return(void*);
      probe CallStaticObjectMethod-entry(void*, void*, uintptr_t);
      probe CallStaticObjectMethod-return(void*);
      probe CallStaticObjectMethodV-entry(void*, void*, uintptr_t);
      probe CallStaticObjectMethodV-return(void*);
      probe CallStaticShortMethodA-entry(void*, void*, uintptr_t);
      probe CallStaticShortMethodA-return(uint16_t);
      probe CallStaticShortMethod-entry(void*, void*, uintptr_t);
      probe CallStaticShortMethod-return(uint16_t);
      probe CallStaticShortMethodV-entry(void*, void*, uintptr_t);
      probe CallStaticShortMethodV-return(uint16_t);
      probe CallStaticVoidMethodA-entry(void*, void*, uintptr_t);
      probe CallStaticVoidMethodA-return();
      probe CallStaticVoidMethod-entry(void*, void*, uintptr_t);
      probe CallStaticVoidMethod-return(); 
      probe CallStaticVoidMethodV-entry(void*, void*, uintptr_t);  
      probe CallStaticVoidMethodV-return();
      probe CallVoidMethodA-entry(void*, void*, uintptr_t);  
      probe CallVoidMethodA-return();
      probe CallVoidMethod-entry(void*, void*, uintptr_t);  
      probe CallVoidMethod-return(); 
      probe CallVoidMethodV-entry(void*, void*, uintptr_t);  
      probe CallVoidMethodV-return();
      probe CreateJavaVM-entry(void**, void**, void*);
      probe CreateJavaVM-return(uint32_t);
      probe DefineClass-entry(void*, const char*, void*, char, uintptr_t);
      probe DefineClass-return(void*);
      probe DeleteGlobalRef-entry(void*, void*);
      probe DeleteGlobalRef-return();
      probe DeleteLocalRef-entry(void*, void*);
      probe DeleteLocalRef-return();
      probe DeleteWeakGlobalRef-entry(void*, void*);
      probe DeleteWeakGlobalRef-return();
      probe DestroyJavaVM-entry(void*);
      probe DestroyJavaVM-return(uint32_t);
      probe DetachCurrentThread-entry(void*);
      probe DetachCurrentThread-return(uint32_t);
      probe EnsureLocalCapacity-entry(void*, uint32_t);
      probe EnsureLocalCapacity-return(uint32_t);
      probe ExceptionCheck-entry(void*);
      probe ExceptionCheck-return(uintptr_t);
      probe ExceptionClear-entry(void*);
      probe ExceptionClear-return();
      probe ExceptionDescribe-entry(void*);  
      probe ExceptionDescribe-return();
      probe ExceptionOccurred-entry(void*);
      probe ExceptionOccurred-return(void*);
      probe FatalError-entry(void* env, const char*);
      probe FindClass-entry(void*, const char*);
      probe FindClass-return(void*);
      probe FromReflectedField-entry(void*, void*);
      probe FromReflectedField-return(uintptr_t);
      probe FromReflectedMethod-entry(void*, void*);
      probe FromReflectedMethod-return(uintptr_t);
      probe GetArrayLength-entry(void*, void*);
      probe GetArrayLength-return(uintptr_t);
      probe GetBooleanArrayElements-entry(void*, void*, uintptr_t*);
      probe GetBooleanArrayElements-return(uintptr_t*);
      probe GetBooleanArrayRegion-entry(void*, void*, uintptr_t, uintptr_t, uintptr_t*);
      probe GetBooleanArrayRegion-return();
      probe GetBooleanField-entry(void*, void*, uintptr_t);
      probe GetBooleanField-return(uintptr_t);
      probe GetByteArrayElements-entry(void*, void*, uintptr_t*);
      probe GetByteArrayElements-return(char*);
      probe GetByteArrayRegion-entry(void*, void*, uintptr_t, uintptr_t, char*);
      probe GetByteArrayRegion-return();
      probe GetByteField-entry(void*, void*, uintptr_t);
      probe GetByteField-return(char);
      probe GetCharArrayElements-entry(void*, void*, uintptr_t*);
      probe GetCharArrayElements-return(uint16_t*);
      probe GetCharArrayRegion-entry(void*, void*, uintptr_t, uintptr_t, uint16_t*);
```
      probe GetCharArrayRegion-return();
      probe GetCharField-entry(void*, void*, uintptr_t);
      probe GetCharField-return(uint16_t);
      probe GetCreatedJavaVMs-eintptr_t*);
      probe GetCreatedJavaVMs-return(uintptr_t);
      probe GetCreateJavaVMs-entry(void*, uintptr_t, uintptr_t*);
      probe GetCreateJavaVMs-return(uint32_t);
      probe GetDefaultJavaVMInitArgs-entry(void*);
      probe GetDefaultJavaVMInitArgs-return(uint32_t);
      probe GetDirectBufferAddress-entry(void*, void*);
      probe GetDirectBufferAddress-return(void*);
      probe GetDirectBufferCapacity-entry(void*, void*);
      probe GetDirectBufferCapacity-return(uintptr_t);
      probe GetDoubleArrayElements-entry(void*, void*, uintptr_t*);
      probe GetDoubleArrayElements-return(double*);
      probe GetDoubleArrayRegion-entry(void*, void*, uintptr_t, uintptr_t, double*);
      probe GetDoubleArrayRegion-return();
      probe GetDoubleField-entry(void*, void*, uintptr_t);
      probe GetDoubleField-return(double);
      probe GetEnv-entry(void*, void*, void*);
      probe GetEnv-return(uint32_t);
      probe GetFieldID-entry(void*, void*, const char*, const char*);
      probe GetFieldID-return(uintptr_t);
      probe GetFloatArrayElements-entry(void*, void*, uintptr_t*);
      probe GetFloatArrayElements-return(float*);
      probe GetFloatArrayRegion-entry(void*, void*, uintptr_t, uintptr_t, float*);
      probe GetFloatArrayRegion-return();
      probe GetFloatField-entry(void*, void*, uintptr_t);
      probe GetFloatField-return(float);
      probe GetIntArrayElements-entry(void*, void*, uintptr_t*);
      probe GetIntArrayElements-return(uint32_t*);
      probe GetIntArrayRegion-entry(void*, void*, uintptr_t, uintptr_t, uint32_t*);
      probe GetIntArrayRegion-return();
      probe GetIntField-entry(void*, void*, uintptr_t);
      probe GetIntField-return(uint32_t);
      probe GetJavaVM-entry(void*, void**);
      probe GetJavaVM-return(uint32_t);
      probe GetLongArrayElements-entry(void*, void*, uintptr_t*);
      probe GetLongArrayElements-return(uintptr_t*);
      probe GetLongArrayRegion-entry(void*, void*, uintptr_t, uintptr_t, uintptr_t*);
      probe GetLongArrayRegion-return();
      probe GetLongField-entry(void*, void*, uintptr_t);
      probe GetLongField-return(uintptr_t);
      probe GetMethodID-entry(void*, void*, const char*, const char*);
      probe GetMethodID-return(uintptr_t);
      probe GetObjectArrayElement-entry(void*, void*, uintptr_t);
      probe GetObjectArrayElement-return(void*);
      probe GetObjectClass-entry(void*, void*);
      probe GetObjectClass-return(void*);
      probe GetObjectField-entry(void*, void*, uintptr_t);
      probe GetObjectField-return(void*);
      probe GetObjectRefType-entry(void*, void*);
      probe GetObjectRefType-return(void*);
      probe GetPrimitiveArrayCritical-entry(void*, void*, uintptr_t*);
      probe GetPrimitiveArrayCritical-return(void*);
      probe GetShortArrayElements-entry(void*, void*, uintptr_t*);
      probe GetShortArrayElements-return(uint16_t*);
      probe GetShortArrayRegion-entry(void*, void*, uintptr_t, uintptr_t, uint16_t*);
      probe GetShortArrayRegion-return();
      probe GetShortField-entry(void*, void*, uintptr_t);
      probe GetShortField-return(uint16_t);
      probe GetStaticBooleanField-entry(void*, void*, uintptr_t);
      probe GetStaticBooleanField-return(uintptr_t);
      probe GetStaticByteField-entry(void*, void*, uintptr_t);
      probe GetStaticByteField-return(char);
      probe GetStaticCharField-entry(void*, void*, uintptr_t);
      probe GetStaticCharField-return(uint16_t);
      probe GetStaticDoubleField-entry(void*, void*, uintptr_t);
      probe GetStaticDoubleField-return(double);
      probe GetStaticFieldID-entry(void*, void*, const char*, const char*);
      probe GetStaticFieldID-return(uintptr_t);
      probe GetStaticFloatField-entry(void*, void*, uintptr_t);
      probe GetStaticFloatField-return(float);
      probe GetStaticIntField-entry(void*, void*, uintptr_t);
      probe GetStaticIntField-return(uint32_t);
      probe GetStaticLongField-entry(void*, void*, uintptr_t);
      probe GetStaticLongField-return(uintptr_t);
      probe GetStaticMethodID-entry(void*, void*, const char*, const char*);
      probe GetStaticMethodID-return(uintptr_t);
      probe GetStaticObjectField-entry(void*, void*, uintptr_t);
      probe GetStaticObjectField-return(void*);
      probe GetStaticShortField-entry(void*, void*, uintptr_t);
      probe GetStaticShortField-return(uint16_t);
      pro GetStringChars-entry(void*, void*, uintptr_t*);
      probe GetStringChars-return(const uint16_t*);
      probe GetStringCritical-entry(void*, void*, uintptr_t*);
      probe GetStringCritical-return(const uint16_t*);
      probe GetStringLength-entry(void*, void*);
      probe GetStringLength-return(uintptr_t);
      probe GetStringRegion-entry(void*, void*, uintptr_t, uintptr_t, uint16_t*);
      probe GetStringRegion-return();
      probe GetStringUTFChars-entry(void*, void*, uintptr_t*);
      probe GetStringUTFChars-return(const char*);
      probe GetStringUTFLength-entry(void*, void*);
      probe GetStringUTFLength-return(uintptr_t);
      probe GetStringUTFRegion-entry(void*, void*, uintptr_t, uintptr_t, char*);
      probe GetStringUTFRegion-return();
      probe GetSuperclass-entry(void*, void*);
      probe GetSuperclass-return(void*);
      probe GetVersion-entry(void*);
      probe GetVersion-return(uint32_t);
      probe IsAssignableFrom-entry(void*, void*, void*);
      probe IsAssignableFrom-return(uintptr_t);
      probe IsInstanceOf-entry(void*, void*, void*);
      probe IsInstanceOf-return(uintptr_t);
      probe IsSameObject-entry(void*, void*, void*);
      probe IsSameObject-return(uintptr_t);
      probe MonitorEnter-entry(void*, void*);
      probe MonitorEnter-return(uint32_t);
      probe MonitorExit-entry(void*, void*);
      probe MonitorExit-return(uint32_t);
      probe NewBooleanArray-entry(void*, uintptr_t);
      probe NewBooleanArray-return(void*);
      probe NewByteArray-entry(void*, uintptr_t);
      probe NewByteArray-return(void*);
      probe NewCharArray-entry(void*, uintptr_t);
      probe NewCharArray-return(void*);
      probe NewDirectByteBuffer-entry(void*, void*, uintptr_t);
      probe NewDirectByteBuffer-return(void*);
      probe NewDoubleArray-entry(void*, uintptr_t);
      probe NewDoubleArray-return(void*);
      probe NewFloatArray-entry(void*, uintptr_t);
      probe NewFloatArray-return(void*);
      probe NewGlobalRef-entry(void*, void*);
      probe NewGlobalRef-return(void*);
      probe NewIntArray-entry(void*, uintptr_t);
      probe NewIntArray-return(void*);
      probe NewLocalRef-entry(void*, void*);
      probe NewLocalRef-return(void*);
      probe NewLongArray-entry(void*, uintptr_t);
      probe NewLongArray-return(void*);
      probe NewObjectA-entry(void*, void*, uintptr_t);  
      probe NewObjectA-return(void*);
      probe NewObjectArray-entry(void*, uintptr_t, void*, void*);
      probe NewObjectArray-return(void*);
      probe NewObject-entry(void*, void*, uintptr_t); 
      probe NewObject-return(void*);
      probe NewObjectV-entry(void*, void*, uintptr_t);  
      probe NewObjectV-return(void*);
      probe NewShortArray-entry(void*, uintptr_t);
      probe NewShortArray-return(void*);
      probe NewString-entry(void*, const uint16_t*, uintptr_t);
      probe NewString-return(void*);
      probe NewStringUTF-entry(void*, const char*);
      probe NewStringUTF-return(void*);
      probe NewWeakGlobalRef-entry(void*, void*);
      probe NewWeakGlobalRef-return(void*);
      probe PopLocalFrame-entry(void*, void*);
      probe PopLocalFrame-return(void*);
      probe PushLocalFrame-entry(void*, uint32_t);
      probe PushLocalFrame-return(uint32_t);
      probe RegisterNatives-entry(void*, void*, const void*, uint32_t);  
      probe RegisterNatives-return(uint32_t);
      probe ReleaseBooleanArrayElements-entry(void*, void*, uintptr_t*, uint32_t);
      probe ReleaseBooleanArrayElements-return();
      probe ReleaseByteArrayElements-entry(void*, void*, char*, uint32_t);
      probe ReleaseByteArrayElements-return();
      probe ReleaseCharArrayElements-entry(void*, void*, uint16_t*, uint32_t);
      probe ReleaseCharArrayElements-return();
      probe ReleaseDoubleArrayElements-entry(void*, void*, double*, uint32_t);
      probe ReleaseDoubleArrayElements-return();
      probe ReleaseFloatArrayElements-entry(void*, void*, float*, uint32_t);
      probe ReleaseFloatArrayElements-return();
      probe ReleaseIntArrayElements-entry(void*, void*, uint32_t*, uint32_t);
      probe ReleaseIntArrayElements-return();
      probe ReleaseLongArrayElements-entry(void*, void*, uintptr_t*, uint32_t);
      probe ReleaseLongArrayElements-return();
      probe ReleaseObjectArrayElements-entry(void*, void*, void**, uint32_t);
      probe ReleaseObjectArrayElements-return();
      probe Releasey(void*, void*, void*, uint32_t);
      probe ReleasePrimitiveArrayCritical-return();
      probe ReleaseShortArrayElements-entry(void*, void*, uint16_t*, uint32_t);
      probe ReleaseShortArrayElements-return();
      probe ReleaseStringChars-entry(void*, void*, const uint16_t*);
      probe ReleaseStringChars-return();
      probe ReleaseStringCritical-entry(void*, void*, const uint16_t*);
      probe ReleaseStringCritical-return();
      probe ReleaseStringUTFChars-entry(void*, void*, const char*);
      probe ReleaseStringUTFChars-return();
      probe SetBooleanArrayRegion-entry(void*, void*, uintptr_t, uintptr_t, const uintptr_t*);
      probe SetBooleanArrayRegion-return();
      probe SetBooleanField-entry(void*, void*, uintptr_t, uintptr_t);
      probe SetBooleanField-return();
      probe SetByteArrayRegion-entry(void*, void*, uintptr_t, uintptr_t, const char*);
      probe SetByteArrayRegion-return();
      probe SetByteField-entry(void*, void*, uintptr_t, char);
      probe SetByteField-return();
      probe SetCharArrayRegion-entry(void*, void*, uintptr_t, uintptr_t, const uint16_t*);
      probe SetCharArrayRegion-return();
      probe SetCharField-entry(void*, void*, uintptr_t, uint16_t);
      probe SetCharField-return();
      probe SetDoubleArrayRegion-entry(void*, void*, uintptr_t, uintptr_t, const double*);
      probe SetDoubleArrayRegion-return();
      probe SetDoubleField-entry(void*, void*, uintptr_t, double);
      probe SetDoubleField-return();
      probe SetFloatArrayRegion-entry(void*, void*, uintptr_t, uintptr_t, const float*);
      probe SetFloatArrayRegion-return();
      probe SetFloatField-entry(void*, void*, uintptr_t, float);
      probe SetFloatField-return();
      probe SetIntArrayRegion-entry(void*, void*, uintptr_t, uintptr_t, const uint32_t*);
      probe SetIntArrayRegion-return();
      probe SetIntField-entry(void*, void*, uintptr_t, uint32_t);
      probe SetIntField-return();
      probe SetLongArrayRegion-entry(void*, void*, uintptr_t, uintptr_t, const uintptr_t*);
      probe SetLongArrayRegion-return();
      probe SetLongField-entry(void*, void*, uintptr_t, uintptr_t);
      probe SetLongField-return();
      probe SetObjectArrayElement-entry(void*, void*, uintptr_t, void*);
      probe SetObjectArrayElement-return();
      probe SetObjectField-entry(void*, void*, uintptr_t, void*);
      probe SetObjectField-return();
      probe SetShortArrayRegion-entry(void*, void*, uintptr_t, uintptr_t, const uint16_t*);
      probe SetShortArrayRegion-return();
      probe SetShortField-entry(void*, void*, uintptr_t, uint16_t);
      probe SetShortField-return();
      probe SetStaticBooleanField-entry(void*, void*, uintptr_t, uintptr_t);
      probe SetStaticBooleanField-return();
      probe SetStaticByteField-entry(void*, void*, uintptr_t, char);
      probe SetStaticByteField-return();
      probe SetStaticCharField-entry(void*, void*, uintptr_t, uint16_t);
      probe SetStaticCharField-return();
      probe SetStaticDoubleField-entry(void*, void*, uintptr_t, double);
      probe SetStaticDoubleField-return();
      probe SetStaticFloatField-entry(void*, void*, uintptr_t, float);
      probe SetStaticFloatField-return();
      probe SetStaticIntField-entry(void*, void*, uintptr_t, uint32_t);
      probe SetStaticIntField-return();
      probe SetStaticLongField-entry(void*, void*, uintptr_t, uintptr_t);
      probe SetStaticLongField-return();
      probe SetStaticObjectField-entry(void*, void*, uintptr_t, void*);
      probe SetStaticObjectField-return();
      probe SetStaticShortField-entry(void*, void*, uintptr_t, uint16_t);
      probe SetStaticShortField-return();
      probe Throw-entry(void*, void*);
      probe ThrowNew-entry(void*, void*, const char*);  
      probe ThrowNew-return(uint32_t);
      probe Throw-return(uint32_t);
      probe ToReflectedField-entry(void*, void*, uintptr_t, uintptr_t);
      probe ToReflectedField-return(void*);
      probe ToReflectedMethod-entry(void*, void*, uintptr_t, uintptr_t);
      probe ToReflectedMethod-return(void*);
      probe UnregisterNatives-entry(void*, void*);  
      probe UnregisterNatives-return(uint32_t);
    };
    