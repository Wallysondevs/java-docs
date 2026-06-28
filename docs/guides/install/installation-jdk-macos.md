# Instalação do JDK no macOS

## 4 Instalação do JDK no macOS

O JDK suporta computadores Mac baseados em Intel (x64) e Apple Silicon (AArch64).

Este tópico inclui as seguintes seções:

  * [Requisitos do Sistema para Instalar o JDK no macOS](<#/doc/guides/install/installation-jdk-macos>)

  * [Notação das Instruções de Instalação do JDK para macOS](<#/doc/guides/install/installation-jdk-macos>)

  * [Determinando a Versão Padrão do JDK no macOS](<#/doc/guides/install/installation-jdk-macos>)

  * [Instalando o JDK no macOS](<#/doc/guides/install/installation-jdk-macos>)

  * [Desinstalando o JDK no macOS](<#/doc/guides/install/installation-jdk-macos>)

  * [FAQ de Instalação para macOS](<#/doc/guides/install/installation-jdk-macos>)




### Requisitos do Sistema para Instalar o JDK no macOS

Para processadores e navegadores suportados, consulte [Configurações de Sistemas Certificados Oracle JDK](<https://www.oracle.com/java/technologies/javase/products-doc-jdk25certconfig.html>).

### Notação das Instruções de Instalação do JDK para macOS

Os instaladores do JDK agora suportam apenas uma versão de qualquer release de recurso do Java. Você não pode instalar múltiplas versões do mesmo release de recurso.

Por exemplo, você não pode instalar `jdk-25` e `jdk-25.0.1` simultaneamente. Se você tentar instalar `jdk-25.0.1` depois que `jdk-25` estiver instalado, o instalador desinstalará `jdk-25` e instalará `jdk-25.0.1`.

Nota:

Se você instalar uma versão mais antiga de um JDK quando a versão mais recente da mesma família de recursos já existir, um erro será exibido, solicitando que você desinstale uma versão mais recente do JDK caso uma versão mais antiga precise ser instalada.

O JDK é instalado em `/Library/Java/JavaVirtualMachines/jdk-<FEATURE>.jdk` onde `<FEATURE>` é o número do release de recurso. Por exemplo, o JDK 25.0.1 é instalado em `/Library/Java/JavaVirtualMachines/jdk-25.jdk`.

Sistemas macOS x64:

  * `jdk-<FEATURE>_macos-x64_bin.dmg`

OU

  * `jdk-<FEATURE>_macos-x64_bin.tar.gz`



Esta string se torna:
```
    jdk-25_macos-x64_bin.dmg
```

OU
```
    jdk-25_macos-x64_bin.tar.gz
```

Sistemas macOS aarch64 (ARM de 64 bits):

  * `jdk-<FEATURE>_macos-aarch64_bin.dmg`

OU

  * `jdk-<FEATURE>_macos-aarch64_bin.tar.gz`



Esta string se torna:
```
    jdk-25_macos-aarch64_bin.dmg
```

OU
```
    jdk-25_macos-aarch64_bin.tar.gz
```

### Determinando a Versão Padrão do JDK no macOS

Ao iniciar uma aplicação Java pela linha de comando, o sistema usa o JDK padrão.

Pode haver múltiplos JDKs instalados no sistema macOS.

Você pode determinar qual versão do JDK é a padrão digitando `java -version` em uma janela do Terminal. Se a versão instalada for 25 Interim 0, Update 0 e Patch 0, então você verá uma string que inclui o texto `25`. Por exemplo:
```
    $ java -version
    java version "25"
    Java(TM) SE Runtime Environment (build 25)
    Java HotSpot(TM) 64-Bit Server VM (build 23.2-b04, mixed mode)
```

Para executar uma versão diferente do Java, especifique o caminho completo ou use a ferramenta `java_home`. Por exemplo:

`$ /usr/libexec/java_home -v 25 --exec javac -version`

### Instalando o JDK no macOS

Para instalar o JDK no macOS:

  1. [Baixe](<https://www.oracle.com/java/technologies/downloads/>) o arquivo `.dmg` ou `.tar.gz` do JDK necessário na página:

     * Sistemas macOS x64: `jdk-<FEATURE>_macos-x64_bin.dmg` OU `jdk-<FEATURE>_macos-x64_bin.tar.gz`
     * Sistemas macOS aarch64 (ARM de 64 bits): `jdk-<FEATURE>_macos-aarch64_bin.dmg` OU `jdk-<FEATURE>_macos-aarch64_bin.tar.gz`

Clique em Aceitar Acordo de Licença.

  2. Na janela de Downloads do navegador ou no explorador de arquivos, clique duas vezes no arquivo `.dmg` para iniciá-lo.

Uma janela do Finder aparece contendo um ícone de uma caixa aberta e o nome do arquivo `.pkg`.

  3. Clique duas vezes no ícone `JDK 25.pkg` para iniciar a aplicação de instalação.

A aplicação de instalação exibe a janela de Introdução.

  4. Clique em Continuar.

A janela Tipo de Instalação aparece.

  5. Clique em Instalar.

Uma janela aparece exibindo a mensagem: O instalador está tentando instalar um novo software. Digite sua senha para permitir isso.

  6. Digite o nome de usuário e a senha do Administrador e clique em Instalar Software.

O software é instalado e uma janela de confirmação é exibida.




Após a instalação do software, você pode excluir o arquivo `.dmg` ou `.tar.gz` se desejar economizar espaço em disco.

### Desinstalando o JDK no macOS

Para desinstalar o JDK no macOS:

Você deve ter privilégios de Administrador.

Nota:

Não tente desinstalar o Java removendo as ferramentas Java de `/usr/bin`. Este diretório faz parte do software do sistema e quaisquer alterações serão redefinidas pela Apple na próxima vez que você realizar uma atualização do SO.

  1. Vá para `/Library/Java/JavaVirtualMachines`.
  2. Remova o diretório cujo nome corresponde ao seguinte formato, executando o comando `rm` como usuário root ou usando a ferramenta `sudo`:

`/Library/Java/JavaVirtualMachines/jdk-25.interim.update.patch.jdk`

Por exemplo, para desinstalar 25 Interim 0 Update 0 Patch 0:

`$ rm -rf jdk-25.jdk`




### FAQ de Instalação para macOS

Este tópico fornece respostas para as seguintes perguntas frequentes sobre a instalação do JDK em computadores macOS.

1.  Como descubro qual versão do Java é a padrão do sistema?

Quando você executa uma aplicação Java pela linha de comando, ela usa o JDK padrão. Se você não desenvolve aplicações Java, então não precisa se preocupar com isso. Consulte [Determinando a Versão Padrão do JDK no macOS](<#/doc/guides/install/installation-jdk-macos>).

2.  Como desinstalo o Java?

Consulte [Desinstalando o JDK no macOS](<#/doc/guides/install/installation-jdk-macos>).

3.  Após instalar o Java para macOS 2012-006, posso continuar a usar o Java 6 da Apple junto com o JDK do macOS para Java 25?

Se você deseja continuar a desenvolver com Java 6 usando a linha de comando, pode modificar o script de inicialização para o seu ambiente de comando favorito. Para bash, use isto:

`$ export JAVA_HOME=`/usr/libexec/java_home -v 25`

Algumas aplicações usam `/usr/bin/java` para chamar o Java. Após instalar o Java para macOS 2012-006, `/usr/bin/java` encontrará o JDK mais recente instalado e o usará para todas as ferramentas de linha de comando relacionadas ao Java em `/usr/bin`. Você pode precisar modificar essas aplicações para encontrar o Java 6, ou entrar em contato com o desenvolvedor para uma versão mais recente da aplicação.

4.  O que aconteceu com o aplicativo Java Preferences em Utilitários de Aplicações?

O aplicativo Java Preferences fazia parte da instalação do Java da Apple e não é usado pelo Oracle Java. Portanto, os releases do macOS da Apple que não incluem o Java da Apple não incluirão o Java Preferences.