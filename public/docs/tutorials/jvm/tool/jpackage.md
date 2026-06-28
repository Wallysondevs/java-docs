# JPackage

[Home](<#/>) > [Tutorials](<#/doc/tutorials/learn>) > JPackage

# JPackage

## Apresentando Jpackage

[jpackage](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jpackage.html>) - empacota uma aplicação Java autocontida

## Sinopse

`options` Opções de linha de comando separadas por espaços. Veja as Opções de [`jpackage`](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jpackage.html>).

## Descrição

A ferramenta [`jpackage`](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jpackage.html>) receberá como entrada uma aplicação Java e uma imagem de tempo de execução Java, e produzirá uma imagem de aplicação Java que inclui todas as dependências necessárias. Ela será capaz de produzir um pacote nativo em um formato específico da plataforma, como um exe no Windows ou um dmg no macOS. Cada formato deve ser construído na plataforma em que será executado, não há suporte multiplataforma. A ferramenta terá opções que permitem que as aplicações empacotadas sejam personalizadas de várias maneiras.

## Opções

### Opções Genéricas

`@filename` Lê opções de um arquivo. Esta opção pode ser usada várias vezes.

`--type or -t type` O tipo de pacote a ser criado. Os valores válidos são: {"app-image", "exe", "msi", "rpm", "deb", "pkg", "dmg"}.

Se esta opção não for especificada, um tipo padrão dependente da plataforma será criado.

`--app-version version` Versão da aplicação e/ou pacote.

`--copyright copyright` Direitos autorais da aplicação.

`--description description` Descrição da aplicação.

`--help or -h` Imprime o texto de uso com uma lista e descrição de cada opção válida para a plataforma atual no stream de saída e sai.

`--icon path` Caminho do ícone do pacote da aplicação (caminho absoluto ou relativo ao diretório atual).

`--name or -n name` Nome da aplicação e/ou pacote.

`--dest or -d destination` Caminho onde o arquivo de saída gerado é colocado (caminho absoluto ou relativo ao diretório atual). O padrão é o diretório de trabalho atual.

`--resource-dir path` Caminho para sobrescrever os recursos de [`jpackage`](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jpackage.html>) (caminho absoluto ou relativo ao diretório atual). Ícones, arquivos de modelo e outros recursos de [`jpackage`](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jpackage.html>) podem ser sobrescritos adicionando recursos de substituição a este diretório.

`--temp directory` Caminho de um diretório novo ou vazio usado para criar arquivos temporários (caminho absoluto ou relativo ao diretório atual).

Se especificado, o diretório temporário não será removido após a conclusão da tarefa e deve ser removido manualmente.

Se não especificado, um diretório temporário será criado e removido após a conclusão da tarefa.

`--vendor vendor` Fornecedor da aplicação.

`--verbose` Habilita a saída detalhada.

`--version` Imprime a versão do produto no stream de saída e sai.

### Opções para criar a imagem de tempo de execução

`--add-modules module-name [,module-name...]` Uma lista de módulos a serem adicionados, separada por vírgulas (",").

Se especificada, esta lista de módulos, juntamente com o módulo principal, será passada para [`jlink`](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jlink.html>) como o argumento `--add-module`.

Se não especificada, é usado apenas o módulo principal (se `--module` for especificado) ou o conjunto padrão de módulos (se `--main-jar` for especificado).

Esta opção pode ser usada várias vezes.

`--module-path or -p module-path [,module-path...]` Uma lista de caminhos separada por [`File.pathSeparator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/File.html#pathSeparator>). Cada caminho é um diretório de módulos ou o caminho para um JAR modular, e é absoluto ou relativo ao diretório atual.

Esta opção pode ser usada várias vezes.

`--jlink-options options` Uma lista de opções separadas por espaços para passar para [`jlink`](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jlink.html>).

Se não especificado, o padrão é "--strip-native-commands --strip-debug --no-man-pages --no-header-files".

Esta opção pode ser usada várias vezes.

`--runtime-image directory` Caminho da imagem de tempo de execução predefinida que será copiada para a imagem da aplicação (caminho absoluto ou relativo ao diretório atual).

Se `--runtime-image` não for especificado, [`jpackage`](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jpackage.html>) executará [`jlink`](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jlink.html>) para criar a imagem de tempo de execução usando as opções especificadas por `--jlink-options`.

### Opções para criar a imagem da aplicação

`--input` or `-i` directory Caminho do diretório de entrada que contém os arquivos a serem empacotados (caminho absoluto ou relativo ao diretório atual). Todos os arquivos no diretório de entrada serão empacotados na imagem da aplicação.

`--app-content additional-content [,additional-content...]` Uma lista de caminhos para arquivos e/ou diretórios a serem adicionados à carga útil da aplicação, separada por vírgulas.

Esta opção pode ser usada mais de uma vez.

Nota para macOS: O valor deve ser um diretório com o subdiretório "Resources" (ou qualquer outro diretório válido no diretório "Contents" do pacote da aplicação). Caso contrário, [`jpackage`](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jpackage.html>) pode produzir um pacote de aplicação inválido que pode falhar na assinatura de código e/ou notarização.

### Opções para criar o(s) inicializador(es) da aplicação

`--add-launcher name=path` Nome do inicializador e um caminho para um arquivo [`Properties`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Properties.html>) que contém uma lista de pares chave-valor (caminho absoluto ou relativo ao diretório atual).

As chaves "module", "main-jar", "main-class", "description", "arguments", "java-options", "icon", "launcher-as-service", "win-console", "win-shortcut", "win-menu" e "linux-shortcut" podem ser usadas.

Essas opções são adicionadas ou usadas para sobrescrever as opções originais da linha de comando para construir um inicializador alternativo adicional. O inicializador principal da aplicação será construído a partir das opções da linha de comando. Inicializadores alternativos adicionais podem ser construídos usando esta opção, e esta opção pode ser usada várias vezes para construir múltiplos inicializadores adicionais.

`--arguments arguments` Argumentos de linha de comando para passar para a classe principal se nenhum argumento de linha de comando for fornecido ao inicializador.

O valor pode conter substrings que serão expandidas em tempo de execução. Dois tipos de tais substrings são suportados: variáveis de ambiente e os tokens "APPDIR", "BINDIR" e "ROOTDIR".

Uma substring expansível deve ser delimitada entre o caractere cifrão ($) e o primeiro caractere não alfanumérico seguinte. Alternativamente, pode ser delimitada entre as substrings "${" e "}".

As substrings expansíveis diferenciam maiúsculas de minúsculas no Unix e não diferenciam maiúsculas de minúsculas no Windows. Nenhuma expansão de string ocorre se a variável de ambiente referenciada não estiver definida.

Variáveis de ambiente com os nomes "APPDIR", "BINDIR" e "ROOTDIR" serão ignoradas, e essas substrings expansíveis serão substituídas por valores calculados pelo inicializador da aplicação.

Prefixe o caractere cifrão com o caractere barra invertida (\) para evitar a expansão da substring.

Esta opção pode ser usada várias vezes.

`--java-options options` Opções para passar para o tempo de execução Java.

O valor pode conter substrings que serão substituídas em tempo de execução, como para a opção `--arguments`.

Esta opção pode ser usada várias vezes.

`--main-class class-name` Nome qualificado da classe principal da aplicação a ser executada. Esta opção só pode ser usada se `--main-jar` for especificado.

`--main-jar main-jar` O JAR principal da aplicação; contendo a classe principal (especificado como um caminho relativo ao caminho de entrada).

A opção `--module` ou `--main-jar` pode ser especificada, mas não ambas.

`--module or -m module-name[/main-class]` O módulo principal (e opcionalmente a classe principal) da aplicação. Este módulo deve estar localizado no caminho do módulo. Quando esta opção é especificada, o módulo principal será vinculado na imagem de tempo de execução Java.

A opção `--module` ou `--main-jar` pode ser especificada, mas não ambas.

### Opção dependente da plataforma para criar o inicializador da aplicação

#### Opções da plataforma Windows (disponíveis apenas ao executar no Windows)

`--win-console` Cria um inicializador de console para a aplicação, deve ser especificado para aplicações que exigem interações de console.

#### Opções da plataforma macOS (disponíveis apenas ao executar no macOS)

`--mac-package-identifier identifier` Um identificador que identifica unicamente a aplicação para macOS. O padrão é o nome da classe principal. Pode usar apenas caracteres alfanuméricos (A-Z,a-z,0-9), hífen (-) e ponto (.).

`--mac-package-name name` Nome da aplicação como aparece na Barra de Menus. Isso pode ser diferente do nome da aplicação. Este nome deve ter menos de 16 caracteres e ser adequado para exibição na barra de menus e na janela de informações da aplicação. O padrão é o nome da aplicação.

`--mac-package-signing-prefix prefix` Ao assinar o pacote da aplicação, este valor é prefixado a todos os componentes que precisam ser assinados e que não possuem um identificador de pacote existente.

`--mac-sign` Solicita que o pacote ou a imagem de aplicação predefinida seja assinada.

`--mac-signing-keychain keychain-name` Nome do chaveiro a ser pesquisado para a identidade de assinatura. Se não especificado, os chaveiros padrão são usados.

`--mac-signing-key-user-name name` Parte do nome da equipe ou usuário nas identidades de assinatura da Apple.

`--mac-app-store` Indica que a saída de [`jpackage`](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jpackage.html>) é destinada à Mac App Store.

`--mac-entitlements path` Caminho para o arquivo contendo os direitos a serem usados ao assinar executáveis e bibliotecas no pacote.

`--mac-app-category category` String usada para construir LSApplicationCategoryType no arquivo plist da aplicação. O valor padrão é "utilities".

### Opções para criar o pacote da aplicação

`--about-url url` URL da página inicial da aplicação.

`--app-image directory` Localização da imagem de aplicação predefinida que é usada para construir um pacote instalável (em todas as plataformas) ou para ser assinada (no macOS) (caminho absoluto ou relativo ao diretório atual).

`--file-associations path` Caminho para um arquivo [`Properties`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Properties.html>) que contém uma lista de pares chave-valor (caminho absoluto ou relativo ao diretório atual). As chaves "extension", "mime-type", "icon" e "description" podem ser usadas para descrever a associação.

Esta opção pode ser usada várias vezes.

`--install-dir path` Caminho absoluto do diretório de instalação da aplicação (no macOS ou Linux), ou subcaminho relativo do diretório de instalação, como "Program Files" ou "AppData" (no Windows).

`--license-file path` Caminho para o arquivo de licença (caminho absoluto ou relativo ao diretório atual).

`--runtime-image path` Caminho da imagem de tempo de execução predefinida a ser instalada (caminho absoluto ou relativo ao diretório atual).

A opção é obrigatória ao criar um instalador de tempo de execução.

`--launcher-as-service` Solicita a criação de um instalador que registrará o inicializador principal da aplicação como um aplicativo tipo serviço em segundo plano.

### Opções dependentes da plataforma para criar o pacote da aplicação

#### Opções da plataforma Windows (disponíveis apenas ao executar no Windows)

`--win-dir-chooser` Adiciona uma caixa de diálogo para permitir que o usuário escolha um diretório no qual o produto será instalado.

`--win-help-url url` URL onde o usuário pode obter mais informações ou suporte técnico.

`--win-menu` Solicita a adição de um atalho no Menu Iniciar para esta aplicação.

`--win-menu-group menu-group-name` Grupo do Menu Iniciar onde esta aplicação é colocada.

`--win-per-user-install` Solicita a realização de uma instalação por usuário.

`--win-shortcut` Solicita a criação de um atalho na área de trabalho para esta aplicação.

`--win-shortcut-prompt` Adiciona uma caixa de diálogo para permitir que o usuário escolha se os atalhos serão criados pelo instalador.

`--win-update-url url` URL de informações de atualização da aplicação disponíveis.

`--win-upgrade-uuid id` UUID associado a atualizações para este pacote.

#### Opções da plataforma Linux (disponíveis apenas ao executar no Linux)

`--linux-package-name name` Nome para o pacote Linux. O padrão é o nome da aplicação.

`--linux-deb-maintainer email-address` Mantenedor para o pacote `.deb`.

`--linux-menu-group menu-group-name` Grupo de menu onde esta aplicação é colocada.

`--linux-package-deps package-dep-string` Pacotes ou capacidades necessárias para a aplicação.

`--linux-rpm-license-type type` Tipo da licença ("License: value" do arquivo `.spec` do RPM).

`--linux-app-release release` Valor de release do arquivo `<name>.spec` do RPM ou valor de revisão Debian do arquivo de controle DEB.

`--linux-app-category category-value` Valor de grupo do arquivo `<name>.spec` do RPM ou valor de seção do arquivo de controle DEB.

`--linux-shortcut` Cria um atalho para a aplicação.

#### Opções da plataforma macOS (disponíveis apenas ao executar no macOS)

`--mac-dmg-content additional-content [,additional-content...]` Inclui todo o conteúdo referenciado no dmg.

Esta opção pode ser usada mais de uma vez.

## Exemplos

### Gerar um pacote de aplicação adequado para o sistema host.

Para uma aplicação modular:

Para uma aplicação não modular:

A partir de uma imagem de aplicação pré-construída:

Gerar uma imagem de aplicação:

Para uma aplicação modular:

Para uma aplicação não modular:

Para fornecer suas próprias opções para [`jlink`](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jlink.html>), execute [`jlink`](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jlink.html>) separadamente:

Gerar um pacote de tempo de execução Java:

Assinar a imagem de aplicação predefinida (no macOS):

Nota: as únicas opções adicionais permitidas neste modo são: o conjunto de opções adicionais de assinatura mac e --verbose

### jpackage e jlink

[`jpackage`](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jpackage.html>) usará [`jlink`](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jlink.html>) para criar o Java Runtime, a menos que a opção `--runtime-image` seja usada. A imagem do Java Runtime criada no Windows incluirá bibliotecas de tempo de execução MS empacotadas com o JDK. Se bibliotecas de tempo de execução MS de uma versão diferente forem necessárias para a aplicação, o usuário precisará adicioná-las/substituí-las por conta própria.

### Diretório de recursos do jpackage

Ícones, arquivos de modelo e outros recursos de [`jpackage`](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jpackage.html>) podem ser sobrescritos adicionando recursos de substituição a este diretório. [`jpackage`](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jpackage.html>) procurará arquivos por nomes específicos no diretório de recursos.

#### Arquivos do diretório de recursos considerados apenas ao executar no Linux

`<launcher-name>.png` Ícone do inicializador da aplicação. O recurso padrão é JavaApp.png.

`<launcher-name>.desktop` Um arquivo desktop a ser usado com o comando `xdg-desktop-menu`. Considerado com inicializadores de aplicação registrados para associações de arquivo e/ou que possuem um ícone. O recurso padrão é `template.desktop`.

#### Arquivos do diretório de recursos considerados apenas ao construir o instalador Linux DEB/RPM

`<package-name>-<launcher-name>.service` Arquivo de unidade systemd para o inicializador da aplicação registrado como um aplicativo tipo serviço em segundo plano. O recurso padrão é `unit-template.service`.

#### Arquivos do diretório de recursos considerados apenas ao construir o instalador Linux RPM:

`<package-name>.spec` Arquivo .spec do RPM. O recurso padrão é `template.spec`.

#### Arquivos do diretório de recursos considerados apenas ao construir o instalador Linux DEB:

`control` Arquivo de controle. O recurso padrão é `template.control`.

`copyright` Arquivo de direitos autorais. O recurso padrão é `template.copyright`.

`preinstall` Script shell de pré-instalação. O recurso padrão é `template.preinstall`.

`prerm` Script shell de pré-remoção. O recurso padrão é `template.prerm`.

`postinstall` Script shell de pós-instalação. O recurso padrão é `template.postinstall`.

`postrm` Script shell de pós-remoção. O recurso padrão é `template.postrm`.

### Arquivos do diretório de recursos considerados apenas ao executar no Windows

`<launcher-name>.ico` Ícone do inicializador da aplicação. O recurso padrão é `JavaApp.ico`.

`<launcher-name>.properties` Arquivo de propriedades para o executável do inicializador da aplicação. O recurso padrão é `WinLauncher.template`.

#### Arquivos do diretório de recursos considerados apenas ao construir o instalador Windows MSI/EXE

`<application-name>-post-image.wsf` Um Windows Script File (WSF) para executar após a construção da imagem da aplicação.

`main.wxs` Arquivo de projeto WiX principal. O recurso padrão é `main.wxs`.

`overrides.wxi` Arquivo de projeto WiX de substituições. O recurso padrão é `overrides.wxi`.

`service-installer.exe` Executável do instalador de serviço. Considerado se alguns inicializadores de aplicação estiverem registrados como aplicativos tipo serviço em segundo plano.

`<launcher-name>-service-install.wxi` Arquivo de projeto WiX do instalador de serviço. Considerado se alguns inicializadores de aplicação estiverem registrados como aplicativos tipo serviço em segundo plano. O recurso padrão é `service-install.wxi`.

`<launcher-name>-service-config.wxi` Arquivo de projeto WiX do instalador de serviço. Considerado se alguns inicializadores de aplicação estiverem registrados como aplicativos tipo serviço em segundo plano. O recurso padrão é `service-config.wxi`.

`InstallDirNotEmptyDlg.wxs` Arquivo de projeto WiX para a caixa de diálogo da UI do instalador que verifica se o diretório de instalação não existe ou está vazio. O recurso padrão é `InstallDirNotEmptyDlg.wxs`.

`ShortcutPromptDlg.wxs` Arquivo de projeto WiX para a caixa de diálogo da UI do instalador que configura atalhos. O recurso padrão é `ShortcutPromptDlg.wxs`.

`bundle.wxf` Arquivo de projeto WiX com a hierarquia de componentes da imagem da aplicação. O recurso padrão é `bundle.wxf`.

`ui.wxf` Arquivo de projeto WiX para a UI do instalador. O recurso padrão é `ui.wxf`.

`os-condition.wxf` Arquivo de projeto WiX com a condição para bloquear a instalação em versões mais antigas do Windows. O recurso padrão é `os-condition.wxf`.

`wix-conv.xsl` Conversor de código-fonte WiX. Usado para converter fontes WiX do esquema WiX v3 para v4 quando o WiX v4 ou mais recente é usado. O recurso padrão é `wix3-to-wix4-conv.xsl`.

`ShortcutPromptDlg.wxs` Arquivo de projeto WiX para a caixa de diálogo da UI do instalador que configura atalhos. O recurso padrão é `ShortcutPromptDlg.wxs`.

`bundle.wxf` Arquivo de projeto WiX com a hierarquia de componentes da imagem da aplicação.

`ui.wxf` Arquivo de projeto WiX para a UI do instalador.

`os-condition.wxf` Arquivo de projeto WiX com a condição para bloquear a instalação em versões mais antigas do Windows. O recurso padrão é `os-condition.wxf`.

`wix-conv.xsl` Conversor de código-fonte WiX. Usado para converter fontes WiX do esquema WiX v3 para v4 quando o WiX v4 ou mais recente é usado. O recurso padrão é `wix3-to-wix4-conv.xsl`.

#### Arquivos do diretório de recursos considerados apenas ao construir o instalador Windows EXE

`WinInstaller.properties` Arquivo de propriedades para o executável do instalador. O recurso padrão é `WinInstaller.template`.

`<package-name>-post-msi.wsf` Um Windows Script File (WSF) para executar após a construção do instalador MSI incorporado para o instalador EXE.

`installer.exe` Wrapper executável para o instalador MSI. O recurso padrão é `msiwrapper.exe`.

### Arquivos do diretório de recursos considerados apenas ao executar no macOS

`<launcher-name>.icns` Ícone do inicializador da aplicação. O recurso padrão é `JavaApp.icns`.

`Info.plist` Arquivo plist de propriedades da aplicação. O recurso padrão é `Info-lite.plist.template`.

`Runtime-Info.plist` Arquivo plist de propriedades do Java Runtime. O recurso padrão é `Runtime-Info.plist.template`.

`<application-name>.entitlements` Arquivo plist de propriedades de direitos de assinatura. O recurso padrão é `sandbox.plist`.

#### Arquivos do diretório de recursos considerados apenas ao construir o instalador macOS PKG/DMG

`<package-name>-post-image.sh` Script shell para executar após a construção da imagem da aplicação.

#### Arquivos do diretório de recursos considerados apenas ao construir o instalador macOS PKG

`uninstaller` Script shell de desinstalador. Considerado se alguns inicializadores de aplicação estiverem registrados como aplicativos tipo serviço em segundo plano. O recurso padrão é `uninstall.command.template`.

`preinstall` Script shell de pré-instalação. O recurso padrão é `preinstall.template`.

`postinstall` Script shell de pós-instalação. O recurso padrão é `postinstall.template`.

`services-preinstall` Script shell de pré-instalação para o pacote de serviços. Considerado se alguns inicializadores de aplicação estiverem registrados como aplicativos tipo serviço em segundo plano. O recurso padrão é `services-preinstall.template`.

`services-postinstall` Script shell de pós-instalação para o pacote de serviços. Considerado se alguns inicializadores de aplicação estiverem registrados como aplicativos tipo serviço em segundo plano. O recurso padrão é `services-postinstall.template`.

`<package-name>-background.png` Imagem de fundo. O recurso padrão é `background_pkg.png`.

`<package-name>-background-darkAqua.png` Imagem de fundo escura. O recurso padrão é `background_pkg.png`.

`product-def.plist` Arquivo plist de propriedades do pacote. O recurso padrão é `product-def.plist`.

`<package-name>-<launcher-name>.plist` Arquivo plist de propriedades do launchd para o inicializador da aplicação registrado como um aplicativo tipo serviço em segundo plano. O recurso padrão é `launchd.plist.template`.

#### Arquivos do diretório de recursos considerados apenas ao construir o instalador macOS DMG

`<package-name>-dmg-setup.scpt` Script AppleScript de configuração. O recurso padrão é `DMGsetup.scpt`.

`<package-name>-license.plist` Arquivo plist de propriedades de licença. O recurso padrão é `lic_template.plist`.

`<package-name>-background.tiff` Imagem de fundo. O recurso padrão é `background_dmg.tiff`.

`<package-name>-volume.icns` Ícone de volume. O recurso padrão é `JavaApp.icns`.

### Neste tutorial

Apresentando Jpackage Sinopse Descrição Opções Exemplos

Última atualização: 20 de maio de 2026

[Home](<#/>) > [Tutorials](<#/doc/tutorials/learn>) > JPackage