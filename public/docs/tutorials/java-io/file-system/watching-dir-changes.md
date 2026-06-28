# Monitorando um Diretório em Busca de Alterações

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Fundamentos do Sistema de Arquivos ](<#/doc/tutorials/java-io/file-system>) > Monitorando um Diretório em Busca de Alterações

**Anterior na Série**

[Percorrendo a Árvore de Arquivos](<#/doc/tutorials/java-io/file-system/walking-tree>)

➜

**Tutorial Atual**

Monitorando um Diretório em Busca de Alterações

➜

Este é o fim da série!

**Anterior na Série:** [Percorrendo a Árvore de Arquivos](<#/doc/tutorials/java-io/file-system/walking-tree>)

# Monitorando um Diretório em Busca de Alterações

Para implementar a _notificação de alteração de arquivo_, um programa deve ser capaz de detectar o que está acontecendo com o diretório relevante no sistema de arquivos. Uma maneira de fazer isso é sondar o sistema de arquivos em busca de alterações, mas essa abordagem é ineficiente. Ela não se adapta a aplicações que possuem centenas de arquivos ou diretórios abertos para monitorar.

O pacote [`java.nio.file`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/package-summary.html>) fornece uma API de notificação de alteração de arquivo, chamada _Watch Service API_. Esta API permite registrar um diretório (ou diretórios) com o serviço de monitoramento. Ao registrar, você informa ao serviço os tipos de eventos nos quais está interessado: criação de arquivo, exclusão de arquivo ou modificação de arquivo. Quando o serviço detecta um evento de interesse, ele é encaminhado para o processo registrado. O processo registrado possui uma thread (ou um pool de threads) dedicada a monitorar quaisquer eventos para os quais se registrou. Quando um evento chega, ele é tratado conforme necessário.

## Visão Geral do Watch Service

A API [`WatchService`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/WatchService.html>) é de nível bastante baixo, permitindo que você a personalize. Você pode usá-la como está, ou pode optar por criar uma API de alto nível sobre este mecanismo para que ela se adapte às suas necessidades particulares.

Aqui estão os passos básicos necessários para implementar um serviço de monitoramento:

  * Crie um "watcher" [`WatchService`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/WatchService.html>) para o sistema de arquivos.
  * Para cada diretório que você deseja monitorar, registre-o com o watcher. Ao registrar um diretório, você especifica o tipo de eventos para os quais deseja notificação. Você recebe uma instância de [`WatchKey`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/WatchKey.html>) para cada diretório que você registra.
  * Implemente um loop infinito para aguardar eventos de entrada. Quando um evento ocorre, a chave é sinalizada e colocada na fila do watcher.
  * Recupere a chave da fila do watcher. Você pode obter o nome do arquivo a partir da chave.
  * Recupere cada evento pendente para a chave (pode haver múltiplos eventos) e processe conforme necessário.
  * Reinicie a chave e retome a espera por eventos.
  * Feche o serviço: O serviço de monitoramento é encerrado quando a thread é encerrada ou quando ele é fechado (invocando seu método [`close()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/WatchService.html#close\(\)>)).

`WatchKeys` são thread-safe e podem ser usadas com o pacote [`java.nio.concurrent`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/package-summary.html>). Você pode dedicar um pool de threads a este esforço.

## Experimente

Como esta API é mais avançada, experimente-a antes de prosseguir. Veja o exemplo [`WatchDir`](<#/doc/tutorials/java-io/file-system/watching-dir-changes>) no final desta seção. Salve-o em seu computador e compile-o. Crie um diretório de teste que será passado para o exemplo. [`WatchDir`](<#/doc/tutorials/java-io/file-system/watching-dir-changes>) usa uma única thread para processar todos os eventos, então ele bloqueia a entrada do teclado enquanto aguarda eventos. Execute o programa em uma janela separada, ou em segundo plano, da seguinte forma:

```bash
java WatchDir /tmp/test &
```

Brinque com a criação, exclusão e edição de arquivos no diretório de teste. Quando qualquer um desses eventos ocorre, uma mensagem é impressa no console. Quando terminar, exclua o diretório de teste e `WatchDir` será encerrado. Ou, se preferir, você pode encerrar o processo manualmente.

Você também pode monitorar uma árvore de arquivos inteira especificando a opção `-r`. Quando você especifica `-r`, `WatchDir` percorre a árvore de arquivos, registrando cada diretório com o serviço de monitoramento.

## Criando um Watch Service e Registrando para Eventos

O primeiro passo é criar um novo [`WatchService`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/WatchService.html>) usando o método [`newWatchService()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/FileSystem.html#newWatchService\(\)>) na classe FileSystem, da seguinte forma:

```java
WatchService watcher = FileSystems.getDefault().newWatchService();
```

Em seguida, registre um ou mais objetos com o serviço de monitoramento. Qualquer objeto que implemente a interface [`Watchable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Watchable.html>) pode ser registrado. A classe [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) implementa a interface [`Watchable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Watchable.html>), então cada diretório a ser monitorado é registrado como um objeto [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>).

Assim como qualquer [`Watchable`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Watchable.html>), a interface [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) implementa dois métodos de registro. Esta página usa a versão de dois argumentos, [`register(WatchService, WatchEvent.Kind...)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html#register\(java.nio.file.WatchService,java.nio.file.WatchEvent.Kind...\)>). (A versão de três argumentos aceita um [`WatchEvent.Modifier`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/WatchEvent.Modifier.html>), que não está implementado atualmente.)

Ao registrar um objeto com o serviço de monitoramento, você especifica os tipos de eventos que deseja monitorar. Os tipos de evento [`StandardWatchEventKinds`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardWatchEventKinds.html>) suportados são os seguintes:

  * [`ENTRY_CREATE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardWatchEventKinds.html#ENTRY_CREATE>) – Uma entrada de diretório é criada.
  * [`ENTRY_DELETE`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardWatchEventKinds.html#ENTRY_DELETE>) – Uma entrada de diretório é excluída.
  * [`ENTRY_MODIFY`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardWatchEventKinds.html#ENTRY_MODIFY>) – Uma entrada de diretório é modificada.
  * [`OVERFLOW`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardWatchEventKinds.html#OVERFLOW>) – Indica que eventos podem ter sido perdidos ou descartados. Você não precisa se registrar para o evento [`OVERFLOW`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardWatchEventKinds.html#OVERFLOW>) para recebê-lo.

O trecho de código a seguir mostra como registrar uma instância de [`Path`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Path.html>) para todos os três tipos de evento:

```java
Path dir = ...;
dir.register(watcher, ENTRY_CREATE, ENTRY_DELETE, ENTRY_MODIFY);
```

## Processando Eventos

A ordem dos eventos em um loop de processamento de eventos é a seguinte:

  1. Obtenha uma chave de monitoramento. Três métodos são fornecidos na classe [`WatchService`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/WatchService.html>):
     * [`poll()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/WatchService.html#poll\(\)>) – Retorna uma chave enfileirada, se disponível. Retorna imediatamente com um valor nulo, se indisponível.
     * [`poll(long, TimeUnit)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/WatchService.html#poll\(long,java.util.concurrent.TimeUnit\)>) – Retorna uma chave enfileirada, se uma estiver disponível. Se uma chave enfileirada não estiver imediatamente disponível, o programa aguarda até o tempo especificado. O argumento [`TimeUnit`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/TimeUnit.html>) determina se o tempo especificado é em nanossegundos, milissegundos ou alguma outra unidade de tempo.
     * [`take()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/WatchService.html#take\(\)>) – Retorna uma chave enfileirada. Se nenhuma chave enfileirada estiver disponível, este método aguarda.
  2. Processe os eventos pendentes para a chave. Você obtém a `List` de objetos [`WatchEvent`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/WatchEvent.html>) do método [`pollEvents()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/WatchService.html#pollEvents\(\)>).
  3. Recupere o tipo de evento usando o método [`kind()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/WatchEvent.html#kind\(\)>) do seu objeto [`WatchEvent`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/WatchEvent.html>). Não importa para quais eventos a chave tenha se registrado, é possível receber um evento [`OVERFLOW`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/StandardWatchEventKinds.html#OVERFLOW>). Você pode optar por lidar com o overflow ou ignorá-lo, mas deve testá-lo.
  4. Recupere o nome do arquivo associado ao evento. O nome do arquivo é armazenado como o contexto do evento, então o método [`context()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/WatchEvent.html#context\(\)>) é usado para recuperá-lo.
  5. Após os eventos para a chave terem sido processados, você precisa colocar a chave de volta em um estado `ready` invocando o [`reset()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/WatchKey.html#reset\(\)>) deste objeto [`WatchKey`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/WatchKey.html>). Se este método retornar `false`, a chave não é mais válida e o loop pode ser encerrado. Este passo é muito importante. Se você falhar em invocar [`reset()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/WatchKey.html#reset\(\)>), esta chave não receberá mais eventos.

Uma chave de monitoramento possui um estado. A qualquer momento, seu estado pode ser um dos seguintes:

  * `Ready` indica que a chave está pronta para aceitar eventos. Quando criada pela primeira vez, uma chave está no estado ready.
  * `Signaled` indica que um ou mais eventos estão enfileirados. Uma vez que a chave foi sinalizada, ela não está mais no estado ready até que o método [`reset()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/WatchKey.html#reset\(\)>) seja invocado.
  * `Invalid` indica que a chave não está mais ativa. Este estado ocorre quando um dos seguintes eventos acontece:
    * O processo cancela explicitamente a chave usando o método [`cancel()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/WatchKey.html#cancel\(\)>).
    * O diretório se torna inacessível.
    * O serviço de monitoramento é fechado.

Aqui está um exemplo de um loop de processamento de eventos. Ele monitora um diretório, aguardando o aparecimento de novos arquivos. Quando um novo arquivo se torna disponível, ele é examinado para determinar se é um arquivo text/plain usando o método [`probeContentType(Path)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/nio/file/Files.html#probeContentType\(java.nio.file.Path\)>).

```java
for (;;) {

    // wait for key to be signaled
    WatchKey key;
    try {
        key = watcher.take();
    } catch (InterruptedException x) {
        return;
    }

    Path dir = (Path)key.watchable();

    for (WatchEvent<?> event: key.pollEvents()) {
        WatchEvent.Kind kind = event.kind();

        // TBD - provide example of how OVERFLOW event is handled
        if (kind == OVERFLOW) {
            continue;
        }

        // Context for directory entry event is the file name of entry
        WatchEvent<Path> ev = (WatchEvent<Path>)event;
        Path filename = ev.context();

        // Resolve the filename against the directory.
        // If the file is not a regular file, then it is a directory.
        Path child = dir.resolve(filename);
        if (!Files.isRegularFile(child)) {
            System.out.format("%s is not a regular file%n", child);
            continue;
        }

        // Print type of event
        System.out.format("%s: %s%n", event.kind().name(), child);

        // Email the file to the specified email address.
        // ...
        // Details omitted for brevity
    }

    // Reset the key -- this step is critical if you want to receive
    // further watch events. If the key is no longer valid, the directory
    // is inaccessible so exit the loop.
    boolean valid = key.reset();
    if (!valid) {
        break;
    }
}
```

## Recuperando o Nome do Arquivo

O nome do arquivo é recuperado do contexto do evento. O exemplo anterior recupera o nome do arquivo com este código:

```java
WatchEvent<Path> ev = (WatchEvent<Path>)event;
Path filename = ev.context();
```

Ao compilar este exemplo, ele gera o seguinte aviso:

```
warning: [unchecked] unchecked cast
found   : WatchEvent
required: WatchEvent<Path>
        WatchEvent<Path> ev = (WatchEvent<Path>)event;
```

Este aviso é resultado da linha de código que faz o cast de `WatchEvent<?>` (na verdade `WatchEvent<capture<?>>`) para um `WatchEvent<Path>`.

O exemplo [`WatchDir`](<#/doc/tutorials/java-io/file-system/watching-dir-changes>) evita este aviso criando um método de cast utilitário que suprime o aviso unchecked, da seguinte forma:

```java
@SuppressWarnings("unchecked")
static <T> WatchEvent<T> cast(WatchEvent<?> event) {
    return (WatchEvent<T>)event;
}
```

Se você não está familiarizado com a sintaxe [`@SuppressWarnings`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/SuppressWarnings.html>), consulte a seção sobre [Annotations](<#/doc/tutorials/annotations>).

## Quando Usar e Não Usar Esta API

A Watch Service API é projetada para aplicações que precisam ser notificadas sobre eventos de alteração de arquivo. Ela é bem adequada para qualquer aplicação, como um editor ou IDE, que potencialmente possui muitos arquivos abertos e precisa garantir que os arquivos estejam sincronizados com o sistema de arquivos. Ela também é bem adequada para um servidor de aplicações que monitora um diretório, talvez aguardando que arquivos `.jsp` ou `.jar` sejam colocados, a fim de implantá-los.

Esta API não é projetada para indexar um disco rígido. A maioria das implementações de sistema de arquivos possui suporte nativo para notificação de alteração de arquivo. A Watch Service API aproveita este suporte onde disponível. No entanto, quando um sistema de arquivos não suporta este mecanismo, o Watch Service sondará o sistema de arquivos, aguardando eventos.

## O Exemplo WatchDir

### Neste tutorial

Visão Geral do Watch Service
Experimente
Criando um Watch Service e Registrando para Eventos
Processando Eventos
Recuperando o Nome do Arquivo
Quando Usar e Não Usar Esta API
O Exemplo WatchDir

Última atualização: 25 de janeiro de 2023

**Anterior na Série**

[Percorrendo a Árvore de Arquivos](<#/doc/tutorials/java-io/file-system/walking-tree>)

➜

**Tutorial Atual**

Monitorando um Diretório em Busca de Alterações

➜

Este é o fim da série!

**Anterior na Série:** [Percorrendo a Árvore de Arquivos](<#/doc/tutorials/java-io/file-system/walking-tree>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ A API Java I/O ](<#/doc/tutorials/java-io>) > [ Fundamentos do Sistema de Arquivos ](<#/doc/tutorials/java-io/file-system>) > Monitorando um Diretório em Busca de Alterações