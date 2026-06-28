# O Comando jpackage

## Nome

jpackage - ferramenta para empacotar aplicações Java autocontidas.

## Sinopse

`jpackage` [_options_]

_options_
     Opções de linha de comando separadas por espaços. Veja Opções do jpackage.

## Descrição

A ferramenta `jpackage` receberá como entrada uma aplicação Java e uma imagem de tempo de execução Java, e produzirá uma imagem de aplicação Java que inclui todas as dependências necessárias. Ela será capaz de produzir um pacote nativo em um formato específico da plataforma, como um exe no Windows ou um dmg no macOS. Cada formato deve ser construído na plataforma em que será executado; não há suporte multiplataforma. A ferramenta terá opções que permitem que as aplicações empacotadas sejam personalizadas de várias maneiras.

## Opções do jpackage

### Opções Genéricas:

`@`_filename_
    

Lê opções de um arquivo.

Esta opção pode ser usada múltiplas vezes.

`--type` ou `-t` _type_
    

O tipo de pacote a ser criado

Valores válidos são: {"app-image", "exe", "msi", "rpm", "deb", "pkg", "dmg"}

Se esta opção não for especificada, um tipo padrão dependente da plataforma será criado.

`--app-version` _version_
    

Versão da aplicação e/ou pacote

`--copyright` _copyright_
    

Direitos autorais (copyright) da aplicação

`--description` _description_
    

Descrição da aplicação

`--help` ou `-h`
    

Imprime o texto de uso com uma lista e descrição de cada opção válida para a plataforma atual no fluxo de saída e sai.

`--icon` _path_
    

Caminho do ícone do pacote da aplicação

(caminho absoluto ou relativo ao diretório atual)

`--name` ou `-n` _name_
    

Nome da aplicação e/ou pacote

`--dest` ou `-d` _destination_
    

Caminho onde o arquivo de saída gerado é colocado

(caminho absoluto ou relativo ao diretório atual).

O padrão é o diretório de trabalho atual.

`--resource-dir` _path_
    

Caminho para sobrescrever recursos do jpackage

(caminho absoluto ou relativo ao diretório atual)

Ícones, arquivos de modelo e outros recursos do jpackage podem ser sobrescritos adicionando recursos de substituição a este diretório.

`--temp` _directory_
    

Caminho de um diretório novo ou vazio usado para criar arquivos temporários

(caminho absoluto ou relativo ao diretório atual)

Se especificado, o diretório temporário não será removido após a conclusão da tarefa e deve ser removido manualmente.

Se não especificado, um diretório temporário será criado e removido após a conclusão da tarefa.

`--vendor` _vendor_
    

Fornecedor da aplicação

`--verbose`
    

Habilita saída detalhada (verbose).

`--version`
    

Imprime a versão do produto no fluxo de saída e sai.

### Opções para criar a imagem de tempo de execução:

`--add-modules` _module-name_ [`,`_module-name_...]
    

Uma lista de módulos a serem adicionados, separados por vírgula (",")

Esta lista de módulos, juntamente com o módulo principal (se especificado), será passada para jlink como o argumento --add-module. Se não especificado, será usado apenas o módulo principal (se --module for especificado), ou o conjunto padrão de módulos (se --main-jar for especificado).

Esta opção pode ser usada múltiplas vezes.

`--module-path` ou `-p` _module-path_ [`,`_module-path_...]
    

Uma lista de caminhos separados por File.pathSeparator

Cada caminho é um diretório de módulos ou o caminho para um jar modular, e é absoluto ou relativo ao diretório atual.

Esta opção pode ser usada múltiplas vezes.

`--jlink-options` _options_
    

Uma lista de opções separadas por espaço para passar para jlink

Se não especificado, o padrão é "--strip-native-commands --strip-debug \--no-man-pages --no-header-files"

Esta opção pode ser usada múltiplas vezes.

`--runtime-image` _directory_
    

Caminho da imagem de tempo de execução predefinida que será copiada para a imagem da aplicação

(caminho absoluto ou relativo ao diretório atual)

Se --runtime-image não for especificado, jpackage executará jlink para criar a imagem de tempo de execução usando as opções especificadas por --jlink-options.

### Opções para criar a imagem da aplicação:

`--input` ou `-i` _directory_
    

Caminho do diretório de entrada que contém os arquivos a serem empacotados

(caminho absoluto ou relativo ao diretório atual)

Todos os arquivos no diretório de entrada serão empacotados na imagem da aplicação.

`--app-content` _additional-content_ [`,`_additional-content_...]
    

Uma lista de caminhos separados por vírgula para arquivos e/ou diretórios a serem adicionados ao payload da aplicação.

Esta opção pode ser usada mais de uma vez.

### Opções para criar o(s) lançador(es) da aplicação:

`--add-launcher` _name_ =_path_
    

Nome do lançador e um caminho para um arquivo Properties que contém uma lista de pares chave-valor

(caminho absoluto ou relativo ao diretório atual)

As chaves "module", "main-jar", "main-class", "description", "arguments", "java-options", "icon", "launcher-as-service", "win-console", "win-shortcut", "win-menu" e "linux-shortcut" podem ser usadas.

Estas opções são adicionadas ou usadas para sobrescrever as opções originais da linha de comando para construir um lançador alternativo adicional. O lançador principal da aplicação será construído a partir das opções da linha de comando. Lançadores alternativos adicionais podem ser construídos usando esta opção, e esta opção pode ser usada múltiplas vezes para construir múltiplos lançadores adicionais.

`--arguments` _arguments_
    

Argumentos de linha de comando para passar para a classe principal se nenhum argumento de linha de comando for fornecido ao lançador

Esta opção pode ser usada múltiplas vezes.

O valor pode conter substrings que serão expandidas em tempo de execução. Dois tipos de substrings são suportados: variáveis de ambiente e os tokens "APPDIR", "BINDIR" e "ROOTDIR".

Uma substring expansível deve ser delimitada entre o caractere cifrão ($) e o primeiro caractere não alfanumérico seguinte. Alternativamente, pode ser delimitada entre as substrings "${" e "}".

Substrings expansíveis diferenciam maiúsculas de minúsculas no Unix e não diferenciam no Windows. Nenhuma expansão de string ocorre se a variável de ambiente referenciada não estiver definida.

Variáveis de ambiente com os nomes "APPDIR", "BINDIR" e "ROOTDIR" serão ignoradas, e estas substrings expansíveis serão substituídas por valores calculados pelo lançador da aplicação.

Prefixe o caractere cifrão com o caractere barra invertida (\\) para evitar a expansão da substring.

`--java-options` _options_
    

Opções para passar para o tempo de execução Java

Esta opção pode ser usada múltiplas vezes.

O valor pode conter substrings que serão substituídas em tempo de execução, como para a opção --arguments.

`--main-class` _class-name_
    

Nome qualificado da classe principal da aplicação a ser executada

Esta opção só pode ser usada se --main-jar for especificado.

`--main-jar` _main-jar_
    

O JAR principal da aplicação; contendo a classe principal (especificado como um caminho relativo ao caminho de entrada)

A opção --module ou --main-jar pode ser especificada, mas não ambas.

`--module` ou `-m` _module-name_[/_main-class_]
    

O módulo principal (e opcionalmente a classe principal) da aplicação

Este módulo deve estar localizado no module path.

Quando esta opção é especificada, o módulo principal será vinculado na imagem de tempo de execução Java. A opção --module ou --main-jar pode ser especificada, mas não ambas.

### Opções dependentes da plataforma para criar o lançador da aplicação:

#### Opções da plataforma Windows (disponíveis apenas ao executar no Windows):

`--win-console`
    

Cria um lançador de console para a aplicação, deve ser especificado para aplicações que requerem interações de console

#### Opções da plataforma macOS (disponíveis apenas ao executar no macOS):

`--mac-package-identifier` _identifier_
    

Um identificador que identifica unicamente a aplicação para macOS

O padrão é o nome da classe principal.

Pode usar apenas caracteres alfanuméricos (A-Z,a-z,0-9), hífen (-) e ponto (.).

`--mac-package-name` _name_
    

Nome da aplicação como aparece na Barra de Menus

Isso pode ser diferente do nome da aplicação.

Este nome deve ter menos de 16 caracteres e ser adequado para exibição na barra de menus e na janela de Informações da aplicação. O padrão é o nome da aplicação.

`--mac-package-signing-prefix` _prefix_
    

Ao assinar o pacote da aplicação, este valor é prefixado a todos os componentes que precisam ser assinados e que não possuem um identificador de pacote existente.

`--mac-sign`
    

Solicita que o pacote ou a imagem de aplicação predefinida seja assinada.

`--mac-signing-keychain` _keychain-name_
    

Nome do keychain para procurar a identidade de assinatura

Se não especificado, os keychains padrão são usados.

`--mac-signing-key-user-name` _name_
    

Parte do nome da equipe ou usuário em identidades de assinatura Apple

`--mac-app-store`
    

Indica que a saída do jpackage é destinada à Mac App Store.

`--mac-entitlements` _path_
    

Caminho para o arquivo contendo entitlements a serem usados ao assinar executáveis e bibliotecas no bundle

`--mac-app-category` _category_
    

String usada para construir LSApplicationCategoryType no plist da aplicação

O valor padrão é "utilities".

### Opções para criar o pacote da aplicação:

`--about-url` _url_
    

URL da página inicial da aplicação

`--app-image` _directory_
    

Localização da imagem de aplicação predefinida que é usada para construir um pacote instalável (em todas as plataformas) ou para ser assinada (no macOS)

(caminho absoluto ou relativo ao diretório atual)

`--file-associations` _path_
    

Caminho para um arquivo Properties que contém uma lista de pares chave-valor

(caminho absoluto ou relativo ao diretório atual)

As chaves "extension", "mime-type", "icon" e "description" podem ser usadas.

Esta opção pode ser usada múltiplas vezes.

`--install-dir` _path_
    

Caminho absoluto do diretório de instalação da aplicação (no macOS ou Linux), ou subcaminho relativo do diretório de instalação, como "Program Files" ou "AppData" (no Windows)

`--license-file` _path_
    

Caminho para o arquivo de licença

(caminho absoluto ou relativo ao diretório atual)

`--runtime-image` _path_
    

Caminho da imagem de tempo de execução predefinida a ser instalada

(caminho absoluto ou relativo ao diretório atual)

A opção é obrigatória ao criar um instalador de tempo de execução.

`--launcher-as-service`
    

Solicita a criação de um instalador que registrará o lançador principal da aplicação como uma aplicação de tipo serviço em segundo plano.

### Opções dependentes da plataforma para criar o pacote da aplicação:

#### Opções da plataforma Windows (disponíveis apenas ao executar no Windows):

`--win-dir-chooser`
    

Adiciona uma caixa de diálogo para permitir ao usuário escolher um diretório onde o produto será instalado.

`--win-help-url` _url_
    

URL onde o usuário pode obter mais informações ou suporte técnico

`--win-menu`
    

Solicita a adição de um atalho no Menu Iniciar para esta aplicação

`--win-menu-group` _menu-group-name_
    

Grupo do Menu Iniciar onde esta aplicação é colocada

`--win-per-user-install`
    

Solicita a realização de uma instalação por usuário

`--win-shortcut`
    

Solicita a criação de um atalho na área de trabalho para esta aplicação

`--win-shortcut-prompt`
    

Adiciona uma caixa de diálogo para permitir ao usuário escolher se os atalhos serão criados pelo instalador

`--win-update-url` _url_
    

URL de informações de atualização da aplicação disponíveis

`--win-upgrade-uuid` _id_
    

UUID associado a atualizações para este pacote

#### Opções da plataforma Linux (disponíveis apenas ao executar no Linux):

`--linux-package-name` _name_
    

Nome para o pacote Linux

O padrão é o nome da aplicação.

`--linux-deb-maintainer` _email-address_
    

Mantenedor para o bundle .deb

`--linux-menu-group` _menu-group-name_
    

Grupo de menu onde esta aplicação é colocada

`--linux-package-deps` _package-dep-string_
    

Pacotes ou capacidades necessárias para a aplicação

`--linux-rpm-license-type` _type_
    

Tipo da licença ("License: _value_ " do .spec do RPM)

`--linux-app-release` _release_
    

Valor de release do arquivo &lt;name&gt;.spec do RPM ou valor de revisão Debian do arquivo de controle DEB

`--linux-app-category` _category-value_
    

Valor de grupo do arquivo &lt;name&gt;.spec do RPM ou valor de seção do arquivo de controle DEB

`--linux-shortcut`
    

Cria um atalho para a aplicação.

#### Opções da plataforma macOS (disponíveis apenas ao executar no macOS):

`--mac-dmg-content` _additional-content_ [`,`_additional-content_...]
    

Inclui todo o conteúdo referenciado no dmg.

Esta opção pode ser usada mais de uma vez.

## Exemplos do jpackage
```
    Gera um pacote de aplicação adequado para o sistema host:
```
```
    Para uma aplicação modular:
        jpackage -n name -p modulePath -m moduleName/className
    Para uma aplicação não modular:
        jpackage -i inputDir -n name \
            --main-class className --main-jar myJar.jar
    A partir de uma imagem de aplicação pré-construída:
        jpackage -n name --app-image appImageDir
```
```
    Gera uma imagem de aplicação:
```
```
    Para uma aplicação modular:
        jpackage --type app-image -n name -p modulePath \
            -m moduleName/className
    Para uma aplicação não modular:
        jpackage --type app-image -i inputDir -n name \
            --main-class className --main-jar myJar.jar
    Para fornecer suas próprias opções ao jlink, execute jlink separadamente:
        jlink --output appRuntimeImage -p modulePath \
            --add-modules moduleName \
            --no-header-files [<additional jlink options>...]
        jpackage --type app-image -n name \
            -m moduleName/className --runtime-image appRuntimeImage
```
```
    Gera um pacote de tempo de execução Java:
```
```
    jpackage -n name --runtime-image <runtime-image>
```
```
    Assina a imagem de aplicação predefinida (no macOS):
```
```
    jpackage --type app-image --app-image <app-image> \
        --mac-sign [<additional signing options>...]
    
    Nota: as únicas opções adicionais permitidas neste modo são:
          o conjunto de opções adicionais de assinatura mac e --verbose
```

## jpackage e jlink

jpackage usará jlink para criar o Java Runtime, a menos que a opção `--runtime-image` seja usada. A imagem Java Runtime criada no Windows incluirá as bibliotecas de tempo de execução MS empacotadas com o JDK. Se bibliotecas de tempo de execução MS de uma versão diferente forem necessárias para a aplicação, o usuário precisará adicioná-las/substituí-las por conta própria.

## Diretório de recursos do jpackage

Ícones, arquivos de modelo e outros recursos do jpackage podem ser sobrescritos adicionando recursos de substituição a este diretório. jpackage procurará arquivos por nomes específicos no diretório de recursos.

### Arquivos do diretório de recursos considerados apenas ao executar no Linux:

`<launcher-name>.png`
    

Ícone do lançador da aplicação

O recurso padrão é _JavaApp.png_

`<launcher-name>.desktop`
    

Um arquivo desktop a ser usado com o comando `xdg-desktop-menu`

Considerado com lançadores de aplicação registrados para associações de arquivo e/ou que possuem um ícone

O recurso padrão é _template.desktop_

#### Arquivos do diretório de recursos considerados apenas ao construir o instalador Linux DEB/RPM:

`<package-name>-<launcher-name>.service`
    

Arquivo de unidade systemd para lançador de aplicação registrado como uma aplicação de tipo serviço em segundo plano

O recurso padrão é _unit-template.service_

#### Arquivos do diretório de recursos considerados apenas ao construir o instalador Linux RPM:

`<package-name>.spec`
    

Arquivo .spec do RPM

O recurso padrão é _template.spec_

#### Arquivos do diretório de recursos considerados apenas ao construir o instalador Linux DEB:

`control`
    

Arquivo de controle

O recurso padrão é _template.control_

`copyright`
    

Arquivo de direitos autorais (copyright)

O recurso padrão é _template.copyright_

`preinstall`
    

Script shell de pré-instalação

O recurso padrão é _template.preinstall_

`prerm`
    

Script shell de pré-remoção

O recurso padrão é _template.prerm_

`postinstall`
    

Script shell de pós-instalação

O recurso padrão é _template.postinstall_

`postrm`
    

Script shell de pós-remoção

O recurso padrão é _template.postrm_

### Arquivos do diretório de recursos considerados apenas ao executar no Windows:

`<launcher-name>.ico`
    

Ícone do lançador da aplicação

O recurso padrão é _JavaApp.ico_

`<launcher-name>.properties`
    

Arquivo Properties para o executável do lançador da aplicação

O recurso padrão é _WinLauncher.template_

#### Arquivos do diretório de recursos considerados apenas ao construir o instalador Windows MSI/EXE:

`<application-name>-post-image.wsf`
    

Um arquivo de script do Windows (WSF) para executar após a construção da imagem da aplicação

`main.wxs`
    

Arquivo de projeto principal do WiX

O recurso padrão é _main.wxs_

`overrides.wxi`
    

Arquivo de projeto de sobrescritas do WiX

O recurso padrão é _overrides.wxi_

`service-installer.exe`
    

Executável do instalador de serviço

Considerado se alguns lançadores de aplicação são registrados como aplicações de tipo serviço em segundo plano

`<launcher-name>-service-install.wxi`
    

Arquivo de projeto WiX do instalador de serviço

Considerado se alguns lançadores de aplicação são registrados como aplicações de tipo serviço em segundo plano

O recurso padrão é _service-install.wxi_

`<launcher-name>-service-config.wxi`
    

Arquivo de projeto WiX do instalador de serviço

Considerado se alguns lançadores de aplicação são registrados como aplicações de tipo serviço em segundo plano

O recurso padrão é _service-config.wxi_

`InstallDirNotEmptyDlg.wxs`
    

Arquivo de projeto WiX para a caixa de diálogo da UI do instalador que verifica se o diretório de instalação não existe ou está vazio

O recurso padrão é _InstallDirNotEmptyDlg.wxs_

`ShortcutPromptDlg.wxs`
    

Arquivo de projeto WiX para a caixa de diálogo da UI do instalador que configura atalhos

O recurso padrão é _ShortcutPromptDlg.wxs_

`bundle.wxf`
    

Arquivo de projeto WiX com a hierarquia de componentes da imagem da aplicação

`ui.wxf`
    

Arquivo de projeto WiX para a UI do instalador

`os-condition.wxf`
    

Arquivo de projeto WiX com a condição para bloquear a instalação em versões mais antigas do Windows

O recurso padrão é _os-condition.wxf_

`wix-conv.xsl`
    

Conversor de código-fonte WiX. Usado para converter fontes WiX do esquema WiX v3 para v4 quando WiX v4 ou mais recente é usado

O recurso padrão é _wix3-to-wix4-conv.xsl_

#### Arquivos do diretório de recursos considerados apenas ao construir o instalador Windows EXE:

`WinInstaller.properties`
    

Arquivo Properties para o executável do instalador

O recurso padrão é _WinInstaller.template_

`<package-name>-post-msi.wsf`
    

Um arquivo de script do Windows (WSF) para executar após a construção do instalador MSI incorporado para o instalador EXE

`installer.exe`
    

Wrapper executável para o instalador MSI

O recurso padrão é _msiwrapper.exe_

### Arquivos do diretório de recursos considerados apenas ao executar no macOS:

`<launcher-name>.icns`
    

Ícone do lançador da aplicação

O recurso padrão é _JavaApp.icns_

`Info.plist`
    

Arquivo de lista de propriedades da aplicação

O recurso padrão é _Info-lite.plist.template_

`Runtime-Info.plist`
    

Arquivo de lista de propriedades do Java Runtime

O recurso padrão é _Runtime-Info.plist.template_

`<application-name>.entitlements`
    

Arquivo de lista de propriedades de entitlements de assinatura

O recurso padrão é _sandbox.plist_

#### Arquivos do diretório de recursos considerados apenas ao construir o instalador macOS PKG/DMG:

`<package-name>-post-image.sh`
    

Script shell para executar após a construção da imagem da aplicação

#### Arquivos do diretório de recursos considerados apenas ao construir o instalador macOS PKG:

`uninstaller`
    

Script shell de desinstalador

Considerado se alguns lançadores de aplicação são registrados como aplicações de tipo serviço em segundo plano

O recurso padrão é _uninstall.command.template_

`preinstall`
    

Script shell de pré-instalação

O recurso padrão é _preinstall.template_

`postinstall`
    

Script shell de pós-instalação

O recurso padrão é _postinstall.template_

`services-preinstall`
    

Script shell de pré-instalação para pacote de serviços

Considerado se alguns lançadores de aplicação são registrados como aplicações de tipo serviço em segundo plano

O recurso padrão é _services-preinstall.template_

`services-postinstall`
    

Script shell de pós-instalação para pacote de serviços

Considerado se alguns lançadores de aplicação são registrados como aplicações de tipo serviço em segundo plano

O recurso padrão é _services-postinstall.template_

`<package-name>-background.png`
    

Imagem de fundo

O recurso padrão é _background_pkg.png_

`<package-name>-background-darkAqua.png`
    

Imagem de fundo escura

O recurso padrão é _background_pkg.png_

`product-def.plist`
    

Arquivo de lista de propriedades do pacote

O recurso padrão é _product-def.plist_

`<package-name>-<launcher-name>.plist`
    

Arquivo de lista de propriedades launchd para lançador de aplicação registrado como uma aplicação de tipo serviço em segundo plano

O recurso padrão é _launchd.plist.template_

#### Arquivos do diretório de recursos considerados apenas ao construir o instalador macOS DMG:

`<package-name>-dmg-setup.scpt`
    

Script AppleScript de configuração

O recurso padrão é _DMGsetup.scpt_

`<package-name>-license.plist`
    

Arquivo de lista de propriedades de licença

O recurso padrão é _lic_template.plist_

`<package-name>-background.tiff`
    

Imagem de fundo

O recurso padrão é _background_dmg.tiff_

`<package-name>-volume.icns`
    

Ícone de volume

O recurso padrão é _JavaApp.icns_