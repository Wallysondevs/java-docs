# Começando com o JDK Flight Recorder

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ JDK Flight Recorder ](<#/doc/tutorials/jvm/jfr>) > Começando com o JDK Flight Recorder

**Anterior na Série**

[Introdução ao JDK Flight Recorder](<#/doc/tutorials/jvm/jfr/intro>)

➜

**Tutorial Atual**

Começando com o JDK Flight Recorder

➜

**Próximo na Série**

[Configurando o JDK Flight Recorder](<#/doc/tutorials/jvm/jfr/configure>)

**Anterior na Série:** [Introdução ao JDK Flight Recorder](<#/doc/tutorials/jvm/jfr/intro>)

**Próximo na Série:** [Configurando o JDK Flight Recorder](<#/doc/tutorials/jvm/jfr/configure>)

# Começando com o JDK Flight Recorder

Esta seção abordará o básico de como iniciar uma gravação JFR e extrair dados de uma gravação. Na maioria dos casos, os usuários desejarão fornecer uma configuração ao iniciar o JFR, mas abordaremos a configuração do JFR na próxima seção.

## Iniciando uma Gravação JFR

O JFR pode ser iniciado na inicialização da JVM, bem como ativado em uma JVM já em execução. Na maioria dos casos, inicializar o JFR na inicialização é a melhor opção para fornecer a imagem mais completa de uma JVM; no entanto, habilitar o JFR em uma JVM em execução pode ser útil se uma JVM começar a encontrar problemas e você quiser coletar dados sobre ela antes de desligá-la.

### Habilitando o JFR na Inicialização

Para habilitar o JFR na inicialização, inclua o argumento de VM `-XX:StartFlightRecording` ao seu comando `java` como neste exemplo:

```bash
java -XX:StartFlightRecording ApplicationMain
```

Esta é apenas uma maneira muito básica de executar o JFR e é improvável que atenda às necessidades da maioria dos usuários do JFR. `-XX:StartFlightRecording` é capaz de receber vários argumentos de configuração. Os quais, como mencionado, serão abordados na próxima seção.

### Habilitando o JFR em uma JVM em Execução com JCMD

O JFR também pode ser habilitado em uma JVM em execução usando `jcmd`. O primeiro passo será obter o ID do processo (pid) do processo Java no qual você deseja habilitar o JFR. O utilitário de linha de comando Java `jps` pode ser usado para isso, como neste exemplo:

```bash
jps -l
```

Se você quisesse habilitar o JFR no processo Java `ApplicationMain`, então você executaria:

```bash
jcmd <pid> JFR.start
```

Assim como `-XX:StartFlightRecording`, `JFR.start` também pode receber argumentos de configuração.

## Recuperando Dados do JFR

Com o JFR em execução em um processo Java, naturalmente, haveria interesse em examinar os dados que estão sendo coletados. Existem várias maneiras de fazer isso, nesta seção exploraremos a extração de dados do JFR usando `jcmd`.

### Extraindo Dados JFR com JCMD

`jcmd` pode ser usado para extrair manualmente dados do JFR, referidos como *data dumps*. Você pode executar um *dump* com o seguinte comando:

```bash
jcmd <pid> JFR.dump
```

Além disso, `JFR.dump` pode receber os argumentos abaixo, todos opcionais:

  * `begin`: Especifica o horário a partir do qual os dados de gravação serão incluídos no arquivo de *dump*. O formato é especificado como horário local. (STRING, sem valor padrão)

  * `end`: Especifica o horário até o qual os dados de gravação serão incluídos no arquivo de *dump*. O formato é especificado como horário local. (STRING, sem valor padrão)

    * *Nota*: Para `begin` e `end`, o horário deve estar em um formato que possa ser lido por `java.time.LocalTime::parse(STRING)`, `java.time.LocalDateTime::parse(STRING)` ou `java.time.Instant::parse(STRING)`. Por exemplo, "13:20:15", "2020-03-17T09:00:00" ou "2020-03-17T09:00:00Z".

    * *Nota*: Os horários de `begin` e `end` correspondem aos *timestamps* encontrados nas informações gravadas nos dados de gravação de voo.

    * Outra opção é usar um horário relativo ao horário atual, especificado por um número inteiro negativo seguido de "s", "m" ou "h". Por exemplo, "-12h", "-15m" ou "-30s".

  * `filename`: Nome do arquivo para o qual os dados de gravação de voo são despejados (*dumped*). Se nenhum nome de arquivo for fornecido, um nome de arquivo é gerado a partir do PID e da data atual. O nome do arquivo também pode ser um diretório, caso em que o nome do arquivo é gerado a partir do PID e da data atual no diretório especificado. (STRING, sem valor padrão)

  * `maxage`: Duração para despejar (*dumping*) os dados de gravação de voo para um arquivo. (INTEIRO seguido por 's' para segundos, 'm' para minutos ou 'h' para horas, sem valor padrão)

  * `maxsize`: Tamanho máximo para a quantidade de dados a serem despejados (*dumped*) de uma gravação de voo em bytes, se um dos seguintes sufixos não for usado: 'm' ou 'M' para megabytes OU 'g' ou 'G' para gigabytes. (STRING, sem valor padrão)

  * `name`: (Opcional) Nome da gravação. Se nenhum nome for fornecido, os dados de todas as gravações são despejados (*dumped*). (STRING, sem valor padrão)

  * `path-to-gc-root`: Flag para salvar o caminho para as raízes do *garbage collection* (GC) no momento em que os dados de gravação são despejados (*dumped*). As informações de caminho são úteis para encontrar vazamentos de memória, mas coletá-las pode fazer com que a aplicação pause por um curto período de tempo. Ative esta *flag* apenas quando você tiver uma aplicação que suspeita ter um vazamento de memória. (BOOLEAN, false)

## Ações Administrativas ao Executar o JFR

Além das ações `jcmd`; `JFR.start` e `JFR.dump` já abordadas, `jcmd` fornece outras três ações administrativas.

  * `JFR.configure` : Usado para atualizar a configuração do JFR.
  * `JFR.check` : Fornece informações de diagnóstico básicas sobre uma JVM executando o JFR.
  * `JFR.stop name=[recording name]` : Usado para parar uma gravação JFR. `name` é um argumento obrigatório.

### Neste tutorial

Iniciando uma Gravação JFR Recuperando Dados do JFR Ações Administrativas ao Executar o JFR

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Introdução ao JDK Flight Recorder](<#/doc/tutorials/jvm/jfr/intro>)

➜

**Tutorial Atual**

Começando com o JDK Flight Recorder

➜

**Próximo na Série**

[Configurando o JDK Flight Recorder](<#/doc/tutorials/jvm/jfr/configure>)

**Anterior na Série:** [Introdução ao JDK Flight Recorder](<#/doc/tutorials/jvm/jfr/intro>)

**Próximo na Série:** [Configurando o JDK Flight Recorder](<#/doc/tutorials/jvm/jfr/configure>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ JDK Flight Recorder ](<#/doc/tutorials/jvm/jfr>) > Começando com o JDK Flight Recorder