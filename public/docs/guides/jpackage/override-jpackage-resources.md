# Sobrescrever Recursos do jpackage

## 6 Sobrescrever Recursos do jpackage

A personalização avançada do pacote gerado é possível sobrescrevendo recursos usados pelo `jpackage`, como imagens de fundo e arquivos de template para propriedades e scripts. A opção `--resource-dir` é usada para fornecer as sobrescritas à ferramenta.

Se os recursos padrão que o `jpackage` usa ao empacotar uma aplicação não atenderem às suas necessidades, crie um diretório e adicione seus arquivos personalizados a ele. Se você sobrescrever um arquivo, seu arquivo personalizado deve conter todas as propriedades que o padrão contém. Passe o caminho para o diretório para o `jpackage` usando a opção `--resource-dir`. O caminho pode ser absoluto ou relativo ao diretório atual.

Nota:

Recursos como ícones, versão da aplicação, descrição da aplicação, direitos autorais e outros podem ser sobrescritos a partir da linha de comando. O uso das opções de linha de comando é recomendado quando disponíveis.

Os tópicos a seguir descrevem os recursos que você pode sobrescrever e explicam como você pode descobrir quais são os padrões.

Tópicos:

  * [Recursos Usados no Empacotamento](<#/doc/guides/jpackage/override-jpackage-resources>)

  * [Visualizar Recursos](<#/doc/guides/jpackage/override-jpackage-resources>)

### Recursos Usados no Empacotamento

A ferramenta de empacotamento possui templates padrão e outros recursos que ela usa ao gerar o pacote para sua aplicação.

Os recursos variam por plataforma e são descritos nas seções a seguir. Na maioria dos casos, os recursos sobrescritos com opções de linha de comando têm precedência sobre os recursos no diretório de recursos. Para sobrescrever recursos que não podem ser sobrescritos a partir da linha de comando, adicione seus arquivos personalizados ao diretório de recursos que você passa para o `jpackage`. Use a opção `--verbose` descrita em [Visualizar Recursos](<#/doc/guides/jpackage/override-jpackage-resources>) para verificar o nome do arquivo de sobrescrita para cada recurso.

Linux (todas as versões)

  * Arquivo de ícone, `launcher.png`, para o launcher principal e quaisquer launchers adicionais. Cada launcher pode ter um ícone separado. O nome do arquivo deve corresponder ao nome da aplicação ou ao nome de um launcher. Se um arquivo de ícone não for fornecido para um launcher, o ícone padrão é usado.

  * Arquivo de atalho de desktop, `launcher.desktop`, para o launcher principal e quaisquer launchers adicionais. O nome do arquivo deve corresponder ao nome da aplicação ou ao nome de um launcher.

Linux DEB

  * Template de controle, `control`. Arquivo que contém informações sobre a aplicação.

  * Script de pré-instalação, `preinst`. Script que é executado antes da instalação da aplicação.

  * Script de pré-remoção, `prerm`. Script que é executado antes da desinstalação da aplicação.

  * Script de pós-instalação, `postinst`. Script que é executado após a conclusão da instalação.

  * Script de pós-remoção, `postrm`. Script que é executado após a desinstalação da aplicação.

  * Arquivo de direitos autorais, `copyright`. Arquivo que contém informações de direitos autorais e licença.

Linux RPM

  * Especificação para empacotamento, `package-name.spec`. Instruções para empacotar a aplicação.

macOS (todos os formatos)

  * Arquivo de ícone, `launcher.icns`, para o launcher principal e quaisquer launchers adicionais. Mais de um arquivo pode ser fornecido. O nome do arquivo deve corresponder ao nome da aplicação ou ao nome de um launcher. Se um arquivo de ícone não for fornecido para um launcher, o ícone padrão é usado.

  * Lista de propriedades de tempo de execução, `Runtime-Info.plist`.

  * Lista de propriedades de informação, `Info.plist`.

  * Arquivo de entitlements padrão, `application-name.entitlements`.

  * Script pós-imagem, `application-name-post-image.sh`. Script personalizado que é executado após a criação da imagem da aplicação e antes da construção do instalador DMG ou PKG. Nenhum script padrão é fornecido.

macOS DMG

  * Script de configuração DMG, `application-name-dmg-setup.scpt`.

  * Lista de propriedades de licença de aplicações, `application-name-license.plist`.

  * Arquivo de fundo, `application-name-background.tiff`.

  * Ícone da unidade, `application-name-volume.icns`.

macOS PKG

  * Script de pré-instalação, `preinstall`. Script que é executado antes da instalação da aplicação.

  * Script de pós-instalação, `postinstall`. Script que é executado após a conclusão da instalação.

  * Imagem de fundo para o Modo Claro, `application-name-background.png`.

  * Imagem de fundo para o Modo Escuro, `application-name-background-darkAqua.png`.

Windows

  * Script pós-imagem, `application-name-post-image.wsf`. Script personalizado que é executado após a criação da imagem da aplicação e antes da construção do instalador MSI para pacotes `.msi` e `.exe`. Nenhum script padrão é fornecido.

  * Arquivo fonte principal do WiX, `main.wxs`.

  * Arquivo fonte WiX com sobrescritas de variáveis WiX, `overrides.wxi`. Os valores neste arquivo sobrescrevem os valores no arquivo WiX principal.

  * Arquivo de ícone, `launcher.ico`, para o launcher principal e quaisquer launchers adicionais. Mais de um arquivo pode ser fornecido. O nome do arquivo deve corresponder ao nome da aplicação ou ao nome de um launcher. Se um arquivo de ícone não for fornecido para um launcher, o ícone padrão é usado.

  * Arquivo de propriedades do launcher, `launcher.properties`.

### Visualizar Recursos

Você pode usar as opções `--verbose` e `--temp` para o `jpackage` para obter informações sobre os recursos usados para empacotar sua aplicação.

Para decidir se você precisa sobrescrever os recursos do `jpackage`, revise os padrões atuais:

  * Use a opção `--verbose` para ver o que está sendo usado atualmente.

A opção `--verbose` fornece informações detalhadas sobre o processo de criação do pacote. As informações também incluem instruções para personalizar o recurso, como o nome do arquivo a ser adicionado ao diretório de recursos.

O exemplo a seguir mostra o comando `jpackage` executado no Windows para empacotar a aplicação Dynamic Tree, seguido por trechos da saída da opção `--verbose` que mostram os recursos padrão usados. Observe que para sobrescrever o recurso `WinLauncher.template`, é necessário um arquivo chamado `DynamicTree.properties`; para sobrescrever o recurso `main.wxs`, é necessário um arquivo chamado `main.wxs`
```
jpackage --input DynamicTree --main-jar DynamicTree.jar --verbose
        WARNING: Using incubator modules: jdk.incubator.jpackage
        Running [candle.exe, /?]
        Running [C:\Program Files (x86)\WiX Toolset v3.11\bin\candle.exe, /?]
        Windows Installer XML Toolset Compiler version 3.11.1.2318
        
           ...
        
        Using default package resource java48.ico [icon] (add DynamicTree.ico to the resource-dir to customize).
        Using default package resource WinLauncher.template [Template for creating executable properties file] 
        (add DynamicTree.properties to the resource-dir to customize).
        
           ...
        
        Using default package resource main.wxs [Main WiX project file] (add main.wxs to the resource-dir to 
        customize).
        Using default package resource overrides.wxi [Overrides WiX project file] (add overrides.wxi to the 
        resource-dir to customize).
        
           ...
        
```

  * Use a opção `--temp` para manter arquivos temporários para revisão.

A opção `--temp` fornece ao `jpackage` o nome de um diretório novo ou vazio onde os arquivos temporários são gravados durante o processo de empacotamento. O caminho passado para o `jpackage` pode ser absoluto ou relativo ao diretório atual. Quando esta opção é usada, o diretório não é excluído ao final do processo.

Revise este diretório para ver os recursos que foram usados para empacotar sua aplicação. Revise cada arquivo para identificar as propriedades e valores que você pode querer sobrescrever. Se você sobrescrever um arquivo, seu arquivo personalizado deve conter todas as propriedades que o padrão contém.

O exemplo a seguir mostra o diretório criado no Windows. O diretório `config` contém recursos que você pode sobrescrever.
```
jpackage --input DynamicTree --main-jar DynamicTree.jar \
           --temp DTtempfiles
        
        \DTtempfiles
           \config
              DynamicTree.ico
              DynamicTree.properties
              main.wxs
              MsiInstallerStrings_en.wxl
              MsiInstallerStrings_ja.wxl
              MsiInstallerStrings_zh.wxl
              overrides.wxi
           \images
           \wixobj
```