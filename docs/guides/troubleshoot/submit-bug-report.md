# Enviar um Relatório de Bug

## 17 Enviar um Relatório de Bug

Este capítulo mostra como enviar um relatório de bug. Ele inclui sugestões sobre o que tentar antes de enviar um relatório e quais dados coletar para o relatório.

Este capítulo contém as seguintes seções:

  * [Verificar Correções em Lançamentos de Atualização](<#/doc/guides/troubleshoot/submit-bug-report>)

  * [Preparar para Enviar um Relatório de Bug](<#/doc/guides/troubleshoot/submit-bug-report>)

  * [Coletar Dados para um Relatório de Bug](<#/doc/guides/troubleshoot/submit-bug-report>)

  * [Relatar um Bug](<#/doc/guides/troubleshoot/submit-bug-report>)

  * [Coletar Core Dumps](<#/doc/guides/troubleshoot/submit-bug-report>)

### Verificar Correções em Lançamentos de Atualização

Atualizações programadas regularmente para cada lançamento contêm correções para um conjunto de bugs críticos identificados desde o lançamento inicial da plataforma.

Quando um lançamento de atualização se torna disponível, ele se torna o default download na página [Java SE Downloads](<https://www.oracle.com/java/technologies/javase-downloads.html>).

O site de download inclui um link para as release notes que listam as correções de bug no lançamento. Cada bug na lista está vinculado à descrição do bug no bug database. As release notes também incluem a lista de correções em lançamentos de atualização anteriores. Se você encontrar um problema, ou suspeitar de um bug, então, como um passo inicial no diagnóstico, verifique a lista de correções que estão disponíveis no lançamento de atualização mais recente.

Às vezes, não é óbvio se um problema é uma duplicata de um bug que já foi corrigido.

### Preparar para Enviar um Relatório de Bug

O procedimento recomendado para enviar um relatório de bug é o seguinte.

Antes de enviar um relatório de bug, considere as seguintes recomendações:

  * Coletar o máximo de dados relevantes possível. Por exemplo, gerar um thread dump no caso de um deadlock, ou localizar o core file (quando aplicável) e o arquivo `hs_err` no caso de um crash. Em todos os casos, é importante documentar o ambiente e as ações realizadas pouco antes do problema acontecer. Consulte [Coletar Dados para um Relatório de Bug](<#/doc/guides/troubleshoot/submit-bug-report>).
  * Quando aplicável, tente restaurar o estado original e reproduzir o problema usando os passos documentados. Isso ajuda a determinar se o problema é reproduzível ou um intermittent issue.
  * Se o problema for reproduzível, tente restringir o problema. Em alguns casos, um bug pode ser demonstrado com um pequeno standalone test case. Bugs que são demonstrados por pequenos test cases serão tipicamente fáceis de diagnosticar em comparação com test cases que consistem em uma aplicação grande e complexa.
  * Pesquise no [Java Bug Database](<https://bugs.java.com/bugdatabase/index.jsp>) para ver se este problema ou um problema similar já foi relatado. Se o problema já foi relatado, então o relatório de bug pode ter informações adicionais, como as seguintes:

    * Se o problema já foi corrigido, então o lançamento em que foi corrigido é indicado.

    * Um workaround para o problema.

    * Comentários na evaluation que explicam, em mais detalhes, as circunstâncias que causam o problema.

  * Se você concluir que o problema ainda não foi relatado, então relate-o em [Report a Bug or Request a Feature](<https://bugreport.java.com/bugreport/>).

Antes de relatar um problema, verifique se o ambiente onde o problema ocorre é uma supported configuration. Consulte [Oracle JDK 25 Certified System Configurations](<https://www.oracle.com/java/technologies/javase/products-doc-jdk25certconfig.html>).

Além das system configurations, verifique a lista de supported locales. Consulte [JDK 25 Supported Locales](<https://www.oracle.com/java/technologies/javase/jdk25-suported-locales.html>).

### Coletar Dados para um Relatório de Bug

As seções a seguir listam os comandos ou recomendam um procedimento geral para obter os dados:

  * [Descrição Detalhada do Problema](<#/doc/guides/troubleshoot/submit-bug-report>)

  * [Detalhes de Hardware](<#/doc/guides/troubleshoot/submit-bug-report>)

  * [Detalhes do Sistema Operacional](<#/doc/guides/troubleshoot/submit-bug-report>)

  * [Versão do Java SE](<#/doc/guides/troubleshoot/submit-bug-report>)

  * [Opções de Linha de Comando](<#/doc/guides/troubleshoot/submit-bug-report>)

  * [Variáveis de Ambiente](<#/doc/guides/troubleshoot/submit-bug-report>)

  * [Log de Erro Fatal](<#/doc/guides/troubleshoot/submit-bug-report>)

  * [Core e Crash Dump](<#/doc/guides/troubleshoot/submit-bug-report>)

  * [Logs e Traces](<#/doc/guides/troubleshoot/submit-bug-report>)

#### Descrição Detalhada do Problema

Ao criar uma descrição do problema, tente incluir o máximo de informações relevantes possível.

Descreva a aplicação, o ambiente e os eventos mais importantes que antecederam o momento em que o problema ocorreu.

Relate todos os passos de troubleshooting e resultados que já ocorreram.

Às vezes, o problema pode ser reproduzido apenas em um ambiente de aplicação complexo. Neste caso, a descrição, juntamente com logs, core file e outras informações relevantes, pode ser a única maneira de diagnosticar o problema. Nestas situações, a descrição deve indicar se o remetente está disposto a executar diagnósticos adicionais ou executar test binaries no sistema onde o problema ocorre.

  * Se o problema for reproduzível à vontade, então liste os passos necessários para demonstrar o problema.
  * Se o problema puder ser demonstrado com um pequeno test case, então inclua o test case e os comandos para compilar e executar o test case.
  * Se o test case ou problema exigir third-party code, como uma commercial or open source library or package, então forneça detalhes sobre onde e como obter a library.

#### Detalhes de Hardware

Os detalhes de hardware são armazenados nos logs de erro quando ocorre um erro fatal.

Às vezes, um bug acontece ou pode ser reproduzido apenas em certas hardware configurations. Se ocorrer um erro fatal, o log de erro pode conter os detalhes de hardware. Se um log de erro não estiver disponível, documente no relatório de bug o número e o tipo de processadores na máquina, a clock speed e, quando aplicável e se conhecido, alguns detalhes sobre as features desse processador. Por exemplo, no caso de processadores Intel, pode ser relevante que o hyper-threading esteja disponível.

#### Detalhes do Sistema Operacional

Os sistemas operacionais fornecem comandos que você pode usar para obter os detalhes do sistema operacional.

No Linux, é importante saber qual distribuição e versão são usadas. Às vezes, o arquivo `/etc/*release` indica as informações de lançamento, mas como componentes e packages podem ser atualizados independentemente, nem sempre é uma indicação confiável da configuration. Portanto, além das informações do arquivo `*release`, colete as seguintes informações:

  * A kernel version: Isso pode ser obtido usando o comando `uname -a`.
  * A versão do `glibc`: O comando `rpm -q glibc` indica o patch level do `glibc`.
  * A thread library: Existem duas thread libraries para Linux, a saber `LinuxThreads` e `NPTL`. A library `LinuxThreads` é usada em kernels 2.4 e anteriores e possui variantes de fixed stack e floating stack. A Native POSIX Thread Library (`NPTL`) é usada no kernel 2.6. Alguns lançamentos do Linux (como RHEL3) incluem backports de `NPTL` para o kernel 2.4. Use o comando `getconf GNU_LIBPTHREAD_VERSION` para determinar qual thread library é usada. Se o comando `getconf` retornar um erro indicando que a variável não existe, é provável que você esteja usando um kernel antigo com a library `LinuxThreads`.

#### Versão do Java SE

Obtenha a string de versão do Java SE com o comando `java -version`.

Múltiplas versões do Java SE podem ser instaladas na mesma máquina. Portanto, certifique-se de usar a versão do comando `java` utilizada pela aplicação com falha. É muito provável que seja diferente do comando `java` padrão incluído na variável de ambiente `PATH` de um usuário.

#### Opções de Linha de Comando

Se o relatório de bug não incluir um fatal error log, é importante documentar a linha de comando completa e todas as suas opções. Isso inclui quaisquer opções que especifiquem configurações de heap, por exemplo, a opção `-Xmx`, ou quaisquer opções `-XX` que especifiquem opções específicas do HotSpot.

Se você puder reproduzir o problema à vontade e for capaz de ler a standard output (stdout) para a JVM, então você pode adicionar a opção `-XX:+PrintCommandLineFlags` para obter a lista completa de opções de linha de comando usadas pela aplicação. Esta opção estará ativa na próxima vez que a JVM for reiniciada.

Você também pode executar o comando [`jcmd`](<#/>) da seguinte forma para obter as opções de linha de comando de uma VM em execução:
```
    jcmd <process ID for the Java process> VM.command_line
```

Além disso, você pode alterar as flags de uma JVM em execução através do `jcmd`. Consulte o comando `VM.set_flag`.

#### Variáveis de Ambiente

Às vezes, problemas surgem devido a configurações de environment variable. Ao criar o relatório de bug, indique os valores das seguintes environment variables Java (se definidas).

  * `JAVA_TOOL_OPTIONS`

  * `_JAVA_OPTIONS`

  * `CLASSPATH`

  * `JAVA_COMPILER`

  * `PATH`

  * `USERNAME`

Nota:

Você deve obter os valores das environment variables do contexto da aplicação com falha. Além disso, um ou mais arquivos de configuration podem definir os valores dessas environment variables para essa aplicação com falha.

Além disso, colete as seguintes environment variables específicas do sistema operacional.

  * No sistema operacional Linux, colete os valores das seguintes environment variables:

    * `LD_LIBRARY_PATH`

    * `LD_PRELOAD`

  * No Windows, colete os valores das seguintes environment variables:

    * `OS`

    * `PROCESSOR_IDENTIFIER`

    * `_ALT_JAVA_HOME_DIR`

#### Log de Erro Fatal

Quando ocorre um fatal error, um error log é criado. Consulte [Fatal Error Log](<#/doc/guides/troubleshoot/location-fatal-error-log>).

O error log contém informações obtidas no momento do fatal error, como informações de versão e ambiente, detalhes sobre os threads que provocaram o crash, e assim por diante.

Se o fatal error log for gerado, certifique-se de incluí-lo no relatório de bug ou relatá-lo durante uma chamada de suporte.

#### Core e Crash Dump

Se um core file ou crash dump foi criado devido ao problema relatado, inclua-o com o bug, se o tamanho permitir.

Um Linux core file ou um Windows crash dump contém o memory state de uma aplicação ou do sistema operacional no momento em que o core ou dump foi criado. Dependendo da configuration de um sistema, um core ou crash dump pode ser criado automaticamente quando um crash acontece. Consulte o system administrator para determinar se um core file será gerado automaticamente e onde.

No caso de um hung process, o procedimento para gerar um dump é descrito em [Coletar Core Dumps](<#/doc/guides/troubleshoot/submit-bug-report>).

#### Logs e Traces

A saída de log ou trace pode ajudar a determinar rapidamente a causa de um problema.

Por exemplo, no caso de um performance issue, a saída da opção de linha de comando `-Xlog:gc` da JVM pode ajudar no diagnóstico do problema. Esta opção habilita a saída do garbage collector.

Em outros casos, você pode usar [Java Flight Recorder](<#/doc/guides/troubleshoot/diagnostic-tools>) e [JDK Mission Control](<https://docs.oracle.com/en/java/java-components/jdk-mission-control/>) para capturar informações estatísticas sobre o período de tempo que antecedeu o problema.

No caso de um deadlock ou uma hung VM, os thread stacks podem ajudar a diagnosticar o problema. Obtenha thread stacks pressionando `Control+\` no Linux ou `Control+Break` no Windows. Alternativamente, use a opção `Thread.dump_to_file` no comando [`jcmd`](<#/>).

Em geral, forneça todos os logs, traces e outras saídas relevantes no relatório de bug ou durante a chamada de suporte.

### Relatar um Bug

Depois de concluir que seu problema ainda não foi relatado e de coletar dados sobre ele, relate-o em [Report a Bug or Request a Feature](<https://bugreport.java.com/bugreport/>).

### Coletar Core Dumps

Um core dump ou um crash dump é um memory snapshot de um processo.

Um core dump pode ser criado automaticamente pelo sistema operacional quando ocorre um fatal ou unhandled error. Alternativamente, um core dump pode ser forçado usando utilities de linha de comando fornecidas pelo sistema. Às vezes, um core dump é útil ao diagnosticar um processo que parece estar hung; o core dump pode revelar informações sobre a causa do hang.

As seções a seguir descrevem cenários para coletar core dumps.

  * [Coletar Core Dumps no Linux](<#/doc/guides/troubleshoot/submit-bug-report>)

  * [Razões para Não Obter um Core File](<#/doc/guides/troubleshoot/submit-bug-report>)

  * [Coletar Crash Dumps no Windows](<#/doc/guides/troubleshoot/submit-bug-report>)

#### Coletar Core Dumps no Linux

Por padrão, o core dump é criado no current working directory do processo. O nome do core dump file é `core.pid`, onde `pid` é o process ID do processo Java que crashou.

Nem todos os sistemas são configurados para permitir a criação de core files. A utility `ulimit` é usada para obter ou definir as limitations nos system resources disponíveis para o current shell e seus descendentes. Use o comando `ulimit -c` para verificar ou definir o core file size limit. Certifique-se de que o limit esteja definido como `unlimited`; caso contrário, o core file pode ser truncated ou não produzido.

Nota:

`ulimit` é um built-in command do Bash shell; em um C shell, use o comando `limit`.

Certifique-se de que quaisquer scripts usados para launch a VM ou sua aplicação não desabilitem a criação de core dump.

Você pode usar o comando `gcore` na interface do `gdb` (GNU debugger) para obter uma core image de um processo em execução. Esta utility aceita o `pid` do processo para o qual você deseja forçar o core dump.

Para obter a lista de processos Java em execução na máquina, você pode usar qualquer um dos seguintes comandos:

  * `jcmd`
  * `ps -ef | grep java`
  * `pgrep java`

Você pode usar a opção `ShowMessageBoxOnError` para coletar core dumps no Linux. Inicie um processo Java com a opção de linha de comando `-XX:+ShowMessageBoxOnError`. Quando um fatal error ocorre, o processo imprime uma mensagem para a standard error e aguarda uma resposta `yes` ou `no` da standard input.

#### Razões para Não Obter um Core File

A seguir está uma lista de razões pelas quais um core file pode não ser gerado no Linux:

  * O application user não tem permissão para escrever no current working directory do processo.

  * O application user tem permissão de escrita no current working directory, mas já existe um arquivo chamado `core` que tem permissão de read-only.

  * O current directory não tem espaço suficiente.

  * O current directory tem um subdirectory chamado `core`.

  * O current working directory é remoto. Ele pode estar mapeado para um Network File System (NFS), e o NFS falhou no momento em que o core dump estava prestes a ser criado.

  * O processo está executando um programa `setuid`, e, portanto, o sistema operacional não fará o dump do core a menos que seja configurado explicitamente.

  * Específico do Java: Se o processo recebeu `SIGSEGV` ou `SIGILL` mas não produziu um core file, é possível que o processo o tenha handled. Por exemplo, a HotSpot VM usa o signal `SIGSEGV` para propósitos legítimos, como lançar `NullPointerException`, deoptimization, e assim por diante. O signal é unhandled pela Java VM apenas se a current instruction (PC) cair fora do código gerado pela Java VM. Estes são os únicos casos em que a HotSpot faz o dump do core.

  * Específico do Java: A JNI Invocation API foi usada para criar a VM. O standard Java launcher não foi usado. O custom Java launcher program handled o signal consumindo-o e produziu o log entry silenciosamente. Esta situação ocorreu com certos application servers e web servers. Estes Java VM embedding programs tentam transparentemente reiniciar (fail over) o sistema após uma abnormal termination. Neste caso, o fato de um core dump não ser produzido é uma feature e não um bug.

#### Coletar Crash Dumps no Windows

No sistema operacional Windows, existem três tipos de crash dumps: Dr. Watson log file, user minidump e Dr. Watson full dump.

  * Dr. Watson log file, que é um text error log file que inclui faulting stack trace e alguns outros detalhes.

  * User minidump, que é considerado um partial core dump. Não é um complete core dump, porque não contém todas as useful memory pages do processo.

  * Dr. Watson full dump, que é equivalente a um UNIX core dump. Este dump contém a maioria das memory pages do processo, exceto as code pages.

Quando uma unexpected exception ocorre no Windows, a ação tomada depende de dois valores na seguinte registry key:
```
    \\HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion\AeDebug
    
```

Os dois valores são nomeados `Debugger` e `Auto`. O valor `Auto` indica se o debugger especificado no valor da entrada `Debugger` inicia automaticamente quando um application error ocorre.

  * Um valor de `0` para `Auto` significa que o sistema exibe um message box notificando o user quando um application error ocorre.

  * Um valor de `1` para `Auto` significa que o debugger inicia automaticamente.

O valor de `Debugger` é o debugger command que deve ser usado para debug program errors.

Quando um program error ocorre, o Windows examina o valor `Auto`, e se o valor for `0`, então ele executa o comando no valor `Debugger`. Se o valor para `Debugger` for um valid command, então um message box é criado com dois botões: OK e Cancel. Se o user clicar em OK, o programa é terminated. Se o user clicar em Cancel, o specified debugger é iniciado. Se o valor para a entrada `Auto` for definido como `1` e o valor para a entrada `Debugger` especificar o command para um valid debugger, então o sistema automaticamente inicia o debugger e não gera um message box.

A seguir estão duas maneiras de coletar crash dump no Windows.

  * Configurar Dr.Watson:

O Dr. Watson debugger é usado para criar crash dump files. Por padrão, o Dr. Watson debugger (`drwtsn32.exe`) é instalado na Windows system folder (`%SystemRoot%\System32`).

Para instalar o Dr. Watson como o postmortem debugger, execute o seguinte comando:
```
drwtsn32 -i
        
```

Para configurar o nome e a location dos crash dump files, execute `drwtsn32` sem nenhuma option.

Na Dr. Watson GUI window, certifique-se de que o Create Crash Dump File check box esteja selecionado e que o crash dump file path e o log file path estejam configurados em seus respectivos text fields.

O Dr. Watson pode ser configurado para criar um full dump usando o registry. A registry key é mostrada no seguinte exemplo.
```
System Key: [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\DrWatson]
        Entry Name: CreateCrashDump
        Value: (0 = disabled, 1 = enabled)
        
```

Nota:

Se a aplicação handles a exception, então o registry-configured debugger não é invocado. Nesse caso, pode ser apropriado usar a opção de linha de comando `-XX:+ShowMessageBoxOnError` para forçar o processo a esperar por user intervention em fatal error conditions.

  * Forçar um crash dump:

A utility de linha de comando `userdump` pode ser usada para forçar um Dr. Watson dump de um processo em execução. A utility `userdump` não é fornecida com o Windows. Ela é lançada como um component do OEM Support Tools package.

Uma maneira alternativa de forçar um crash dump é usar o `windbg` debugger. A principal advantage de usar o `windbg` é que ele pode attach a um processo de uma non-invasive manner (ou seja, read-only). Geralmente, o Windows terminates um processo depois que um crash dump é obtido, mas com o noninvasive attach, é possível obter um crash dump e deixar o processo continuar. Para attach o debugger check box, é necessário selecionar a opção Attach to Process e o Noninvasive check box.

Quando o debugger está attached, um crash dump pode ser obtido usando o command mostrado no seguinte exemplo.
```
.dump /f crash.dmp
        
```

O `windbg` debugger está incluído no Debugging Tools for Windows download.

Uma additional utility neste download é a utility `dumpchk.exe`, que pode verificar se um memory dump file foi criado corretamente.

Ambos `userdump.exe` e `windbg` exigem o `pid` do processo. O comando `userdump -p` lista o processo e o programa para todos os processos. Isso é útil se você souber que a aplicação é iniciada com o `java.exe` launcher. No entanto, se um custom launcher for usado (embedded VM), pode ser difícil reconhecer o processo. Nesse caso, você pode usar a utility de linha de comando `jps` porque ela lista apenas os PIDs dos processos Java.

Você também pode usar a opção de linha de comando `-XX:+ShowMessageBoxOnError` no Windows. Quando um fatal error ocorre, o processo mostra um message box e aguarda uma resposta `yes` ou `no` do user.

Antes de clicar em Yes ou No, você pode usar a utility `userdump.exe` para gerar o Dr. Watson dump para o processo Java. Esta utility também pode ser usada em casos em que o processo parece estar hung.