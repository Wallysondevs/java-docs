# Configurações de Fuso Horário na JRE

## 9 Configurações de Fuso Horário na JRE

Este capítulo descreve alguns problemas que podem surgir com as configurações de fuso horário no Java Runtime Environment (JRE) no sistema operacional Windows. Ele descreve ainda técnicas de solução de problemas e soluções alternativas para resolver essas questões.

Este capítulo contém as seguintes seções:

  * [Informações Nativas de Fuso Horário e a JRE](<#/doc/guides/troubleshoot/time-zone-settings-jre>)

  * [Determinar o Fuso Horário Padrão no Windows](<#/doc/guides/troubleshoot/time-zone-settings-jre>)

### Informações Nativas de Fuso Horário e a JRE

O Java Runtime Environment (JRE) lê as informações nativas de fuso horário para determinar seu fuso horário padrão.

Por exemplo, no Windows, a JRE consulta o registro para determinar o fuso horário padrão.

No entanto, a JRE também mantém seu próprio banco de dados de fuso horário. Isso fornece suporte multiplataforma porque as diferentes APIs do sistema operacional não são suficientes para suportar as APIs Java. O banco de dados de fuso horário Java suporta IDs de fuso horário e determina as regras de horário de verão para todos os fusos horários que a JRE suporta. A ferramenta `tzupdater` está disponível para download na [Página de Download do Java SE](<http://www.oracle.com/technetwork/java/javase/downloads/index.html>).

Modificações na JRE para cada sistema operacional específico são necessárias para que o sistema operacional possa entregar a hora do sistema à JRE. Então, se uma aplicação Java solicita a data do sistema chamando construtores relacionados a data e hora, a hora do sistema é retornada.

Exemplos de tais construtores são:

  * java.util.Date()
  * java.util.GregorianCalendar()
  *

Construtores relacionados a data e hora incluem:

  * System.currentTimeMillis()
  * System.nanoTime()
  *

Patches específicos do sistema operacional podem ser necessários para garantir que a hora correta do sistema seja entregue à JRE.

As seções a seguir descrevem técnicas de solução de problemas para configurações de fuso horário.

  * [Determinar a Versão dos Dados de Fuso Horário em Uso](<#/doc/guides/troubleshoot/time-zone-settings-jre>)

  * [Solucionar Problemas com a Ferramenta de Atualização de Fuso Horário Java](<#/doc/guides/troubleshoot/time-zone-settings-jre>)

#### Determinar a Versão dos Dados de Fuso Horário em Uso

A versão do banco de dados de fuso horário que acompanha qualquer Java runtime da Oracle é documentada nas notas de lançamento. No entanto, a versão real pode ser diferente da versão mencionada lá se o Java runtime foi corrigido usando a ferramenta de atualização de fuso horário Java chamada `tzupdater`.

Para determinar a versão atual dos dados de fuso horário do seu Java runtime usando a ferramenta `tzupdater`, execute a ferramenta com a opção `-V` conforme mostrado no exemplo a seguir:

```
    java -jar tzupdater.jar -V
    
```

Aqui está uma saída típica da execução da ferramenta `tzupdater`.

```
    tzupdater version 2.2.0-b01
    JRE tzdata version: tzdata2018g
```

Você pode baixar a ferramenta `tzupdater` desta página da web: [Ferramenta de Atualização de Fuso Horário](<http://www.oracle.com/technetwork/java/javase/tzupdater-readme-136440.html>).

#### Solucionar Problemas com a Ferramenta de Atualização de Fuso Horário Java

Às vezes, quando você executa `tzupdater`, ele encerra com a mensagem: “Não há tzdata disponível para este Java runtime." A seguir estão dois exemplos.

```
    $ java -jar tzupdater.jar -V 
    tzupdater version 2.1.1-b01 
    JRE tzdata version: tzdata2017b
    There's no tzdata available for this Java runtime.
```

A causa provável é que você está usando um Java runtime que não é da Oracle. A Oracle fornece um Java runtime para Linux (x64), Microsoft Windows (x64) e macOS (x64). A Oracle não fornece o Java runtime para outras plataformas.

A saída da execução do comando `java -version` não fornece informações suficientes para determinar o fornecedor real de um Java runtime. No entanto, executar `tzupdater` no modo de atualização com a opção `-v` imprime a propriedade `java.vendor`. O exemplo a seguir mostra o resultado da execução de `tzupdater` quando o ambiente é HP_UX da Hewlett Packard.

```
    root@my_server:/opt/java6/bin> uname -a
    HP-UX my_server B.11.23 U ia64 1114591084 unlimited-user license
    root@my_server:/opt/java6/bin> ./java -version
    java version "1.6.0.05"
    Java(TM) SE Runtime Environment (build 1.6.0.05-jinteg_14_oct_2009_01_44-b00)
    Java HotSpot(TM) Server VM (build 14.2-b01-jre1.6.0.05-rc5, mixed mode)
    root@my_server:/opt/java6/bin> ./java -jar tzupdater.jar -v -l
    java.home: /opt/java6/jre
    java.vendor: Hewlett-Packard Co.
    java.version: 1.6.0.05
    JRE tzdata version: tzdata2009i
    There's no tzdata available for this Java runtime.
    
```

No exemplo anterior, `java.vendor` está definido como “Hewlett-Packard Co." O Java runtime que você está tentando atualizar usando `tzupdater` não é suportado pela Oracle.

Uma possível solução é visitar o site do fornecedor do seu Java runtime e determinar se uma ferramenta de atualização de fuso horário está disponível.

### Determinar o Fuso Horário Padrão no Windows

Esta seção esclarece como o Java runtime determina o fuso horário padrão no Windows 10 e sistemas operacionais posteriores. Se o fuso horário esperado não for relatado, use as técnicas de solução de problemas fornecidas nas seções a seguir:

  * [Verificar o Fuso Horário Padrão Relatado pelo Java Runtime](<#/doc/guides/troubleshoot/time-zone-settings-jre>)

  * [Determinar a Configuração no Painel de Controle](<#/doc/guides/troubleshoot/time-zone-settings-jre>)

  * [Verificar Ajuste Automático do Horário de Verão](<#/doc/guides/troubleshoot/time-zone-settings-jre>)

  * [Definir o Fuso Horário Padrão nas Configurações do Windows](<#/doc/guides/troubleshoot/time-zone-settings-jre>)

  * [Verificar a Propriedade de Sistema -Duser.timezone](<#/doc/guides/troubleshoot/time-zone-settings-jre>)

  * [Ferramenta Especial no Windows](<#/doc/guides/troubleshoot/time-zone-settings-jre>)

  * [Representação Interna de Mapeamentos de Fuso Horário](<#/doc/guides/troubleshoot/time-zone-settings-jre.jre>)

#### Verificar o Fuso Horário Padrão Relatado pelo Java Runtime

Você pode escrever um programa simples para determinar qual fuso horário o JDK relata como padrão, com base em uma verificação com o sistema operacional nativo.

O programa Java no exemplo a seguir retorna o fuso horário padrão:

```java
    public class DefaultTimeZone {
        public static void main(String[] args) {
            System.out.println(java.util.TimeZone.getDefault().getID());
        }
    }
    
```

Você pode salvar o trecho de código do exemplo anterior em um arquivo chamado `DefaultTimeZone.java` e compilá-lo usando o comando `javac`. Em seguida, você pode executar a classe `DefaultTimeZone` compilada, conforme mostrado no exemplo a seguir.

```
    c:\tztest> javac DefaultTimeZone.java
    c:\tztest> java DefaultTimeZone
    Europe/Berlin
    
```

No exemplo anterior, o fuso horário padrão é Europe/Berlin. A execução do programa deve exibir seu fuso horário local. Se a saída não for o fuso horário esperado, continue com as seguintes etapas de solução de problemas.

#### Determinar a Configuração no Painel de Controle

Você pode alterar ou examinar o fuso horário padrão do sistema usando as Configurações do Windows ou o Painel de Controle do Windows. Por exemplo, você pode selecionar esta configuração de fuso horário no Windows 10:

(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna

O valor correspondente para a chave de Registro `TimeZoneKeyName` é “W. Europe Standard Time."

#### Verificar Ajuste Automático do Horário de Verão

Você pode verificar se o ajuste automático do horário de verão está habilitado através da interface gráfica do usuário (GUI) ou através do registro do Windows.

  * Método GUI: Para usar o Painel de Controle para verificar se o ajuste automático do horário de verão está habilitado:

    1. Clique no botão Iniciar do Windows e, em seguida, clique em Painel de Controle.

    2. Clique em Data e Hora.

    3. Clique no botão Alterar fuso horário.

    4. Há uma caixa de seleção rotulada “Ajustar automaticamente o relógio para o horário de verão.” Verifique se esta caixa de seleção está marcada e altere a configuração se desejar.

    5. Clique em OK. Isso o levará de volta à caixa de diálogo Data e Hora.

  * Método de Registro do Windows: Você pode executar o Editor de Registro do Windows para verificar se o ajuste automático do horário de verão está habilitado.

Nota:

É uma boa prática fazer backup do registro do Windows antes de revisá-lo ou editá-lo. Se você cometer um erro, poderá danificar o registro do Windows.

Para habilitar o ajuste automático do horário de verão a partir do registro do Windows:

    1. Clique no botão Iniciar do Windows.

    2. No campo Pesquisar programas e arquivos, digite regedit e pressione Enter para abrir o Editor de Registro.

    3. No Editor de Registro, procure pela chave DynamicDaylightTimeDisabled e observe a configuração.

Se a configuração do registro for 1, o horário de verão dinâmico estará desabilitado.

Se a configuração do registro for 0, o horário de verão dinâmico estará habilitado.

Se preferir, você pode acessar o registro do Windows a partir da janela de comando do Windows.

No exemplo a seguir, a configuração do registro é 1. Com esta configuração, o relógio não é ajustado automaticamente para o horário de verão.

```
    [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\TimeZoneInformation]
    "DynamicDaylightTimeDisabled"=dword:00000001
    
```

Se você desabilitar a opção `DynamicDaylightTimeDisabled`, o Java retornará um offset GMT (Greenwich Mean Time) e não um ID de fuso horário compatível com a convenção de nomenclatura uniforme (como "Europe/Berlin"). Por exemplo, o offset será expresso como GMT+01 e não "Europe/Berlin."

#### Definir o Fuso Horário Padrão nas Configurações do Windows

Você pode alterar ou revisar o fuso horário padrão do sistema usando as Configurações do Windows.

Para definir o fuso horário padrão do sistema a partir das Configurações do Windows:

  1. Clique no botão Iniciar do Windows.
  2. Clique em Configurações.
  3. Clique em Hora e Idioma.
  4. Na lista suspensa Fuso horário, selecione seu fuso horário preferido.

Por exemplo, você pode selecionar este fuso horário no Windows 10:

```
    (UTC)+1:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna.
    
```

O valor correspondente para a chave de Registro `TimeZoneKeyName` é “W. Europe Standard Time."

#### Verificar a Propriedade de Sistema -Duser.timezone

Você pode definir explicitamente um fuso horário padrão na linha de comando usando a propriedade de sistema Java chamada `user.timezone`. Isso ignora as configurações do sistema operacional Windows e pode ser uma solução alternativa. Por exemplo, essa configuração é útil se você deseja o horário de verão (DST) apenas para um único programa Java em execução no sistema.

O exemplo a seguir mostra a propriedade de sistema `-Duser.timezone`. Compile o programa `DefaultTimeTestZone.java` discutido em [Verificar o Fuso Horário Padrão Relatado pelo Java Runtime](<#/doc/guides/troubleshoot/time-zone-settings-jre>) a partir da janela do Prompt de Comando do Windows. Execute o seguinte comando:

`c:\tztest> java -Duser.timezone=America/New_York DefaultTimeTestZone America/New_York`

Se definir um fuso horário padrão explicitamente especificando `-Duser.timezone` funciona para o programa `DefaultTimeTestZone`, mas não funciona para o seu programa, você deve verificar se seu código sobrescreve o fuso horário Java padrão durante a execução com uma chamada de método como esta:

```java
    TimeZone.setDefault(TimeZone zone)
```

#### Ferramenta Especial no Windows

O sistema operacional Windows fornece uma ferramenta chamada `tzutil.exe`. Com esta ferramenta, você pode solicitar a abreviação do ID do fuso horário atual sem ler manualmente o registro.

Aqui está um exemplo de execução de `tzutil.exe`. A primeira linha é o comando que você digita na janela do Prompt de Comando do Windows. A segunda linha é a resposta do sistema.

```
    tzutil /g
    
    W. Europe Standard Time
```

#### Representação Interna de Mapeamentos de Fuso Horário

No Windows, o Java runtime usa um arquivo `<java-home>\lib\tzmappings` para representar o mapeamento entre os fusos horários do Windows e do Java. Cada linha no arquivo tem três tokens. O primeiro token é a chave de registro de fuso horário do Windows chamada `TimeZoneKeyName`. Consulte [Determinar a Configuração no Painel de Controle](<#/doc/guides/troubleshoot/time-zone-settings-jre>).

O segundo token é um código de país ou o código padrão `001`, que é o código UN M49 que significa "Mundo". O terceiro token representa o ID do fuso horário Java.

Se você selecionar o fuso horário chamado `(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna` no Painel de Controle do Windows, então as linhas relevantes no arquivo `tzmappings` são:

```
    W. Europe Standard Time:AD:Europe/Andorra:
    W. Europe Standard Time:AT:Europe/Vienna:
    W. Europe Standard Time:CH:Europe/Zurich:
    W. Europe Standard Time:DE:Europe/Berlin:
    W. Europe Standard Time:GI:Europe/Gibraltar:
    W. Europe Standard Time:IT:Europe/Rome:
    W. Europe Standard Time:LI:Europe/Vaduz:
    W. Europe Standard Time:LU:Europe/Luxembourg:
    W. Europe Standard Time:MC:Europe/Monaco:
    W. Europe Standard Time:MT:Europe/Malta:
    W. Europe Standard Time:NL:Europe/Amsterdam:
    W. Europe Standard Time:NO:Europe/Oslo:
    W. Europe Standard Time:SE:Europe/Stockholm:
    W. Europe Standard Time:SJ:Arctic/Longyearbyen:
    W. Europe Standard Time:SM:Europe/San_Marino:
    W. Europe Standard Time:VA:Europe/Vatican:
    W. Europe Standard Time:001:Europe/Berlin:
```

Neste exemplo, o Java runtime reconhece seu fuso horário padrão (terceiro token) com base no seu país. Por exemplo, se o código do seu país for `AD`, então seu fuso horário padrão é "Europe/Andorra".

Se não houver uma entrada de mapeamento apropriada no arquivo `tzmappings`, é possível que a Microsoft tenha introduzido um novo fuso horário em uma atualização do Windows e que o novo fuso horário não esteja disponível para o Java runtime. Nesta situação, você pode registrar um relatório de bug e solicitar uma nova entrada no arquivo `tzmappings` no [site de bugs do Oracle Java.](<http://bugs.java.com>)

Uma desconexão semelhante entre o sistema operacional e o Java runtime é possível se você executou a ferramenta `tzedit.exe`. Esta ferramenta é fornecida pela Microsoft e permite aos usuários adicionar novos fusos horários. É improvável que o Java runtime tenha um fuso horário introduzido no sistema por esta ferramenta. Novamente, a solução é registrar um bug para solicitar que uma nova entrada seja adicionada ao arquivo `tzmappings`.