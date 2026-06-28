# Instalação do JDK em Plataformas Microsoft Windows

## 5 Instalação do JDK em Plataformas Microsoft Windows

Este tópico inclui as seguintes seções:

  * [Requisitos de Sistema para Instalar o JDK em Plataformas Windows de 64 bits](<#/doc/guides/install/installation-jdk-microsoft-windows-platforms>)

  * [Notação das Instruções de Instalação do JDK para Windows](<#/doc/guides/install/installation-jdk-microsoft-windows-platforms>)

  * [Instruções de Instalação do JDK para Windows](<#/doc/guides/install/installation-jdk-microsoft-windows-platforms>)

  * [Começando a Usar o JDK](<#/doc/guides/install/installation-jdk-microsoft-windows-platforms>)

  * [Desinstalando o JDK no Windows](<#/doc/guides/install/installation-jdk-microsoft-windows-platforms>)

  * [Solução de Problemas na Instalação do JDK](<#/doc/guides/install/installation-jdk-microsoft-windows-platforms>)

### Requisitos de Sistema para Instalar o JDK em Plataformas Windows de 64 bits

Para processadores e navegadores suportados, consulte [Configurações de Sistemas Certificados do Oracle JDK](<https://www.oracle.com/java/technologies/javase/products-doc-jdk25certconfig.html>).

### Notação das Instruções de Instalação do JDK para Windows

Os instaladores do JDK agora suportam apenas uma versão de qualquer release de recurso Java. Você não pode instalar múltiplas versões do mesmo release de recurso.

Por exemplo, você não pode instalar `jdk-25` e `jdk-25.0.1` simultaneamente. Se você tentar instalar `jdk-25.0.1` depois que `jdk-25` estiver instalado, o instalador desinstalará `jdk-25` e instalará `jdk-25.0.1`.

Nota:

Se você instalar uma versão mais antiga de um JDK quando a versão mais recente da mesma família de recursos já existir, um erro será exibido, solicitando que você desinstale uma versão mais recente do JDK caso uma versão mais antiga precise ser instalada.

O JDK é instalado em `C:/Program Files/Java/jdk-<FEATURE>` onde `<FEATURE>` é o número do release de recurso. Por exemplo, o JDK 25.0.1 é instalado em `C:/Program Files/Java/jdk-25`.

### Instruções de Instalação do JDK para Windows

Você executa um arquivo executável auto-instalável para descompactar e instalar o JDK em computadores Windows.

Instale o JDK em computadores Windows executando as ações descritas nos seguintes tópicos:

  * [Baixando o Instalador do JDK](<#/doc/guides/install/installation-jdk-microsoft-windows-platforms>)

  * [Instalando o JDK a partir do Instalador .exe do JDK](<#/doc/guides/install/installation-jdk-microsoft-windows-platforms>)

  * [Instalando o JDK a partir do Instalador MSI Enterprise](<#/doc/guides/install/installation-jdk-microsoft-windows-platforms>)

  * [Instalando o JDK Silenciosamente](<#/doc/guides/install/installation-jdk-microsoft-windows-platforms>)

#### Baixando o Instalador do JDK

Em um navegador, vá para a página de Downloads do Java SE Development Kit 11 e clique em Aceitar Contrato de Licença. No menu Download, clique no link Download que corresponde ao `.exe` para sua versão do Windows.

Baixe o arquivo `jdk-25.interim.update.patch_windows-x64_bin.exe`.

Nota:

Verifique a conclusão bem-sucedida do download do arquivo comparando o tamanho do arquivo na página de download e em sua unidade local.

#### Instalando o JDK a partir do Instalador .exe do JDK

Você deve ter privilégios de administrador para instalar o JDK no Microsoft Windows.

Para executar o instalador do JDK:

  1. Inicie o instalador do JDK 25 clicando duas vezes no ícone ou nome do arquivo do instalador no local de download.
  2. Siga as instruções fornecidas pelo instalador.
  3. Após a conclusão da instalação, exclua o arquivo baixado para recuperar espaço em disco.

Nota:

Durante a instalação, os seguintes arquivos são copiados para o seu computador:
```
    "C:\Program Files\Common Files\Oracle\Java\javapath\java.exe"
    "C:\Program Files\Common Files\Oracle\Java\javapath\javaw.exe"
    "C:\Program Files\Common Files\Oracle\Java\javapath\javac.exe"
    "C:\Program Files\Common Files\Oracle\Java\javapath\jshell.exe"
```

Alternativamente, você pode executar esses executáveis diretamente do diretório `bin` do JDK.

#### Instalando o JDK a partir do Instalador MSI Enterprise

O Instalador MSI Enterprise do JDK é empacotado como um instalador `.msi` e é executado com diálogos mínimos. Ele suporta a instalação silenciosa do JDK e é personalizável usando parâmetros de linha de comando.

Você deve ter permissões administrativas para instalar o JDK 25.

  1. Baixe `jdk-25_windows-x64_bin.msi` da página [Java SE Downloads](<https://www.oracle.com/java/technologies/downloads/>).
  2. Clique duas vezes no arquivo `.msi` para executar o instalador.

##### Instalando o JDK a partir da Linha de Comando

Você pode instalar o JDK baixando o Instalador MSI Enterprise do Oracle JDK apropriado para o seu sistema e executando-o a partir da linha de comando.

  1. Baixe `jdk-25_windows-x64_bin.msi` da página [Java SE Downloads](<https://www.oracle.com/java/technologies/downloads/>).
  2. Abra um prompt do MS-DOS com permissões administrativas.
  3. Execute um dos seguintes comandos dependendo do tipo de instalação que você deseja realizar:
     * Modo de UI básico:
```msiexec.exe /i jdk-25_windows-x64_bin.msi
```

     * Modo silencioso:
```msiexec.exe jdk-25_windows-x64_bin.msi /qn
```

##### Criando um Arquivo de Log

Você pode usar um arquivo de log para verificar se uma instalação foi bem-sucedida.

Para criar um arquivo de log descrevendo a instalação, anexe `/L C:\path\setup.log` ao comando de instalação e role até o final do arquivo de log para verificar.

A seguir, um exemplo de criação de um arquivo de log:
```
    msiexec.exe /i installer.msi /L C:\path\setup.log
```

Neste exemplo, o log é gravado no arquivo `C:\path\setup.log`.

#### Instalando o JDK Silenciosamente

Em vez de clicar duas vezes ou abrir o instalador do JDK, você pode realizar uma instalação silenciosa, não interativa, do JDK usando argumentos de linha de comando.

Instale o JDK em modo silencioso usando o comando:
```
    jdk.exe /s
```

Nota:

  * A notação jdk representa o nome base do arquivo do instalador baixado, como `jdk-25_windows-x64_bin.exe`.
  * Você não precisa executar o comando `ADDLOCAL`, pois tudo é instalado por padrão.

### Começando a Usar o JDK

Selecione Java Development Kit no menu Iniciar do Windows para acessar informações relacionadas à Documentação de Referência.

Durante os processos de instalação e desinstalação do JDK, os itens do menu Iniciar são atualizados para que sejam associados à versão mais recente do JDK no sistema.

Nota:

O Windows 10 possui um menu Iniciar; no entanto, o menu não está disponível no Windows 8 e Windows 8.1. As informações do JDK e Java no Windows 8 e Windows 8.1 estão disponíveis no seguinte diretório Iniciar: `%ALLUSERSPROFILE%\Microsoft\Windows\Start Menu\Programs`.

### Desinstalando o JDK no Windows

Para desinstalar o JDK 25, use o utilitário Adicionar/Remover Programas no Painel de Controle do Microsoft Windows.

#### Desinstalando o JDK em Modo Silencioso

Você pode usar a linha de comando para desinstalar o JDK.

Use o seguinte comando para desinstalar o JDK em modo silencioso:
```
    MsiExec.exe/X{<UninstallString>}
```

Por exemplo, para desinstalar o JDK 18, execute o comando:
```
    MsiExec.exe /X{B1405ADC-C0CA-5E63-B1E0-51F5A9A2627C}
```

Para encontrar &lt;UninstallString&gt;, consulte [Encontrando a Chave do Registro do JDK e o Valor UninstallString](<#/doc/guides/install/installation-jdk-microsoft-windows-platforms>).

Nota:

  * Este comando pode ser executado de qualquer lugar.
  * O executável `msiexec.exe` está localizado no diretório de sistema do Windows.
  * Uma reinicialização é necessária apenas se alguns arquivos estiverem em uso durante a desinstalação; não é necessário sempre. No entanto, para suprimir manualmente a reinicialização durante a desinstalação, anexe a opção `REBOOT=R` ao comando.
  * Anexe a opção `/l "C:\<path>setup.log"` ao comando se desejar criar um arquivo de log descrevendo o status da desinstalação.

A caixa de diálogo do Windows Installer aparece solicitando sua confirmação. Clique em Sim para desinstalar o JDK.

Encontrando a Chave do Registro do JDK e o Valor UninstallString

  1. Vá para o Iniciar e digite `regedit`.
  2. No Editor do Registro, vá para `HKEY_LOCAL_MACHINE/Software/Microsoft/Windows/CurrentVersion/Uninstall`.

Na pasta `Uninstall`, você encontrará muitas entradas de registro entre chaves.

  3. Clique em Editar e depois em Localizar.

Nota:

Destaque a pasta `Uninstall` antes de realizar a busca por um registro específico.

  4. Insira a string de versão como valor para encontrar a chave de registro correspondente. Por exemplo, insira `jdk-25`.

A chave do registro é destacada no lado direito do painel e os valores de várias strings de desinstalação são exibidos no painel esquerdo.

  5. Anote o valor do UninstallString.

### Solução de Problemas na Instalação do JDK

O tópico fornece dicas para resolver problemas durante a instalação do JDK.

  * [Erro de Sistema Durante a Descompressão](<#/doc/guides/install/installation-jdk-microsoft-windows-platforms>)
  * [Caracteres Que Não Fazem Parte da Página de Código do Sistema](<#/doc/guides/install/installation-jdk-microsoft-windows-platforms>)
  * [Limpar o Registro Após uma Desinstalação Falha do JDK](<#/doc/guides/install/installation-jdk-microsoft-windows-platforms>)
  * [Corrigindo a Situação de Shim quando JDK 25 e JRE 8 Estão Instalados](<#/doc/guides/install/installation-jdk-microsoft-windows-platforms>)

#### Erro de Sistema Durante a Descompressão

Se você vir a mensagem de erro: `system error during decompression`, pode não haver espaço suficiente no disco que contém o diretório `TEMP`.

#### Caracteres Que Não Fazem Parte da Página de Código do Sistema

Um erro 1722 pode ocorrer se o diretório de instalação não fizer parte da página de código da localidade do sistema. Para evitar isso, certifique-se de que as localidades do usuário e do sistema sejam idênticas e que o caminho de instalação contenha apenas caracteres que fazem parte da página de código da localidade do sistema. As localidades do usuário e do sistema podem ser definidas no painel de controle Opções Regionais ou Configurações Regionais.

O bug associado é o 4895647.

#### Limpar o Registro Após uma Desinstalação Falha do JDK

Às vezes, tentativas de desinstalar o JDK através do programa Adicionar/Remover Programas do Windows deixam para trás algumas entradas Java no registro que não são totalmente removidas. Essas entradas de registro remanescentes podem causar problemas na instalação de uma nova versão do Java. A seguir estão os métodos para limpar as entradas do registro:

  * Solucionador de Problemas de Instalação e Desinstalação de Programas (Método Recomendado)
  * Edição Manual do Registro

Solucionador de Problemas de Instalação e Desinstalação de Programas (Método Recomendado)

Execute o [solucionador de problemas de Instalação e Desinstalação de Programas](<https://support.microsoft.com/en-us/help/17588/fix-problems-that-block-programs-from-being-installed-or-removed>) para reparar as chaves de registro corrompidas que impedem que os programas sejam completamente desinstalados ou bloqueiam novas instalações e atualizações.

Edite o registro manualmente (Use isso apenas se o utilitário Fix It não funcionar)

A edição incorreta do seu registro pode danificar gravemente o seu sistema. Você deve fazer backup de quaisquer dados valiosos do seu computador antes de fazer alterações no registro.

Para salvar a chave do registro antes de excluir, na barra de menu, selecione Arquivo e depois Exportar. Caso você tenha excluído a chave de registro errada, você pode restaurar o registro a partir do seu arquivo de backup salvo selecionando na barra de menu Arquivo e depois Importar.

Para excluir a chave do registro:

  1. Determine a Chave do Registro correta. Consulte [Encontrando a Chave do Registro do JDK e o Valor UninstallString](<#/doc/guides/install/installation-jdk-microsoft-windows-platforms>).

  2. Destaque a chave, clique com o botão direito e selecione Excluir.

  3. Clique em Sim quando solicitado.

O JDK é desinstalado.

#### Corrigindo a Situação de Shim quando JDK 25 e JRE 8 Estão Instalados

Quando você instala o JDK 25 e depois instala o JRE 8, e então executa o comando `java -version`, `1.8.0` é exibido na saída em vez de `25`. Isso ocorre porque o `javapath` é colocado antes do local do JDK 25 no caminho do ambiente do usuário.

Este é um bug do instalador do JRE 8. Para corrigir esta situação de shim, desinstale e reinstale o JDK 25.