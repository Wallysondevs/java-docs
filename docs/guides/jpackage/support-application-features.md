# Suporte aos Requisitos da Aplicação

## 3 Suporte aos Requisitos da Aplicação

A ferramenta de empacotamento oferece suporte a requisitos de aplicação, como argumentos padrão, opções da JVM, associações de arquivo, múltiplos launchers e assinatura.

Tópicos:

  * [Definir Argumentos de Linha de Comando Padrão](<#/doc/guides/jpackage/support-application-features>)

  * [Definir Opções da JVM](<#/doc/guides/jpackage/support-application-features>)

  * [Definir Associações de Arquivo](<#/doc/guides/jpackage/support-application-features>)

  * [Adicionar Launchers](<#/doc/guides/jpackage/support-application-features>)

  * [Assinar o Pacote da Aplicação (macOS)](<#/doc/guides/jpackage/support-application-features>)




### Definir Argumentos de Linha de Comando Padrão

Se sua aplicação aceita argumentos de linha de comando, use a opção `--arguments` para definir valores padrão. Os usuários podem sobrescrever esses valores ao iniciar a aplicação.

Se você empacotar sua aplicação com argumentos de linha de comando padrão, esses valores são passados para a classe principal quando o usuário inicia sua aplicação sem fornecer argumentos. A seção `[ArgOptions]` do arquivo `app-name.cfg` no diretório `/app` da imagem da aplicação gerada por `jpackage` mostra quaisquer argumentos padrão que foram definidos. Você pode verificar este arquivo para garantir que os valores estão definidos corretamente.

Os exemplos a seguir mostram algumas das maneiras de configurar argumentos padrão:

  * Definir o valor padrão para um único argumento.

O comando a seguir define o valor para um único argumento para a aplicação MyApp.
` jpackage --name MyApp --input samples/myapp --main-jar MyApp.jar \
           --arguments arg1 
```

  * Definir o valor padrão para mais de um argumento.

Use um espaço para separar os argumentos e coloque a string inteira entre aspas, ou use múltiplas instâncias da opção `--arguments`. Os comandos a seguir mostram maneiras alternativas de definir três argumentos de linha de comando padrão para a aplicação MyApp.
` jpackage --name MyApp --input samples/myapp --main-jar MyApp.jar \
           --arguments "arg1 arg2 arg3" 
        
        jpackage --name MyApp --input samples/myapp --main-jar MyApp.jar \
           --arguments "arg1 arg2 arg3" 
        
        jpackage --name MyApp --input samples/myapp --main-jar MyApp.jar \
           --arguments arg1 --arguments arg2 --arguments arg3 
```

  * Definir um valor padrão que contém espaços.

Se um argumento contém um espaço, são necessários dois conjuntos de aspas para garantir que `jpackage` trate os espaços como parte do valor e não como delimitadores entre valores. Coloque o argumento entre aspas simples, ou aspas duplas precedidas pelo caractere de escape, e então coloque a string entre aspas. Os comandos a seguir mostram maneiras alternativas de definir dois argumentos que contêm espaços.
` jpackage --name MyApp --input samples/myapp --main-jar MyApp.jar \
           --arguments "\"String 1\" \"String 2\"" 
        
        jpackage --name MyApp --input samples/myapp --main-jar MyApp.jar \
           --arguments "\"String 1\"" --arguments "\"String 2\"" 
        
        jpackage --name MyApp --input samples/myapp --main-jar MyApp.jar \
           --arguments "'String 1'" --arguments "'String 2'" 
```




### Definir Opções da JVM

Se você deseja que opções sejam passadas para a JVM quando sua aplicação for iniciada, use a opção `--java-options` ao empacotar sua aplicação. Os usuários não podem fornecer opções da JVM para a aplicação.

Para configurar a JVM conforme necessário para executar sua aplicação, defina as opções da JVM a serem passadas quando um usuário iniciar sua aplicação. Use a macro `$APPDIR` para referenciar recursos incluídos com a aplicação. O arquivo de recurso deve estar no diretório de entrada quando a aplicação for empacotada.

A seção [JavaOptions] do arquivo `app-name.cfg` no diretório `/app` da imagem da aplicação gerada por `jpackage` mostra quaisquer argumentos padrão que foram definidos. Você pode verificar este arquivo para garantir que os valores estão definidos corretamente.

Os exemplos a seguir mostram algumas das maneiras de passar opções da JVM para sua aplicação:

  * Definir uma única opção da JVM.

O comando a seguir define o tamanho inicial da heap para a aplicação MyApp para 2 megabytes.
` jpackage --name MyApp --input samples/myapp --main-jar MyApp.jar \
           --java-options Xms2m 
```

  * Definir mais de uma opção da JVM.

Para fornecer mais de uma opção da JVM, use um espaço para separar os argumentos e coloque a string inteira entre aspas, ou use múltiplas instâncias da opção `--jvm-options`. Os comandos a seguir mostram maneiras alternativas de definir o tamanho inicial e o tamanho máximo para a heap.
` jpackage --name MyApp --input samples/myapp --main-jar MyApp.jar \
           --java-options "Xms2m Xmx10m"
        
        jpackage --name MyApp --input samples/myapp --main-jar MyApp.jar \
           --java-options Xms2m  --java-options Xmx10m
```

  * Definir uma opção da JVM que contém um espaço.

Se uma opção da JVM contém um espaço, são necessários dois conjuntos de aspas para garantir que `jpackage` trate os espaços como parte da opção e não como delimitadores entre opções. Coloque o argumento entre aspas simples, ou aspas duplas precedidas pelo caractere de escape, e então coloque a string entre aspas. Os comandos a seguir mostram maneiras alternativas de definir uma opção que contém espaços.
` jpackage --name MyApp --input samples/myapp --main-jar MyApp.jar \
           --java-options "\"-DAppOption=text string\""
        
        jpackage --name MyApp --input samples/myapp --main-jar MyApp.jar \
           --java-options "'-DAppOption=text string'"
```

  * Definir uma opção da JVM que contém aspas.

Se uma opção da JVM contém aspas, caracteres de escape devem ser usados para as aspas. O comando a seguir passa a opção da JVM `-XX:OnError="userdump.exe %p"` para `jpackage`.
` jpackage --name MyApp --input samples/myapp --main-jar MyApp.jar \
           --java-options "-XX:OnError=\"\\\"userdump.exe %p\\\"\""
```

  * Usar a macro $APPDIR com uma opção da JVM.

Para usar a imagem `myAppSplash.jpg` do diretório da aplicação como tela de splash para sua aplicação, use a macro `$APPDIR` conforme mostrado no exemplo a seguir. O arquivo de imagem deve estar no diretório de entrada quando a aplicação for empacotada. Observe que em alguns shells o cifrão precisa ser escapado, por exemplo, `\$APPDIR`.
` jpackage --name MyApp --input samples/myapp --main-jar MyApp.jar \
           --java-options "-splash:\$APPDIR/myAppSplash.jpg"
```




#### Definir Classpath e Modulepath

Por padrão, a ferramenta `jpackage` gera um classpath padrão que contém o caminho para cada arquivo JAR especificado na opção `--input`. No entanto, um classpath que você especifica com a opção `-cp`, `-classpath` ou `-Djava.class.path` através da opção `--java-options` sobrescreve o classpath padrão.

Se você estiver usando `--java-options` para especificar o classpath, certifique-se de incluir o caminho para cada um dos seus arquivos JAR de entrada nele. Por exemplo, se sua aplicação contém apenas um arquivo JAR, `myapp.jar`, mas você deseja incluir as classes no subdiretório `classes` no classpath, adicione o seguinte ao comando `jpackage`:
```
    --java-options "-cp \$APPDIR/myapp.jar:\$APPDIR/classes"
```

Para uma aplicação modular, o modulepath padrão que `jpackage` gera é `$APPDIR/mods`. No entanto, se você especificar um modulepath com a opção `--module-path` através de `--java-options`, então seu modulepath é anexado após o modulepath padrão; ele não substitui o padrão.

### Definir Associações de Arquivo

Se você deseja que sua aplicação seja iniciada quando um usuário abrir um tipo específico de arquivo, use a opção `--file-associations` ao empacotar sua aplicação.

Para que sua aplicação seja iniciada quando um usuário abrir um arquivo que sua aplicação pode manipular, defina as associações de arquivo que você deseja criar quando a aplicação for instalada. As associações são definidas em arquivos de propriedades que são passados para `jpackage`. Para cada associação, um arquivo separado e uma instância separada da opção `--file-associations` são necessários. As seguintes propriedades definem uma associação, que deve incluir `mime-type` ou `extension`:

  * `mime-type` - Tipo MIME para arquivos que sua aplicação pode processar.

  * `extension` - Extensão de arquivo para arquivos que sua aplicação pode processar.

  * `icon` - Ícone a ser usado para o tipo de arquivos que sua aplicação pode processar. O ícone deve estar no diretório de entrada quando a aplicação for empacotada. Se nenhum ícone for especificado, o ícone padrão é usado.

  * `description` - Breve descrição da associação.




Para configurar associações de arquivo, primeiro crie os arquivos de propriedades. Os dois arquivos a seguir configuram uma associação para arquivos JavaScript e para arquivos Groovy.
```
    FAjavascript.properties:
    
    mime-type=text/javascript
    extension=js
    description=JavaScript Source
    
    FAgroovy.properties:
    
    mime-type=text/x-groovy
    extension=groovy
    description=Groovy Source
```

O comando a seguir empacota a aplicação FADemo e configura as associações de arquivo usando os arquivos de propriedades recém-criados. Quando um usuário abre um arquivo `.js` ou `.groovy`, FADemo é iniciado.
```
    jpackage --name FADemo --input FADemo \
       --main-jar ScriptRunnerApplication.jar \
       --file-associations FAjavascript.properties \
       --file-associations FAgroovy.properties
```

### Adicionar Launchers

Se você tem mais de uma maneira de iniciar sua aplicação, use a opção `--add-launcher` para descrever os launchers adicionais que você deseja criar.

Você pode querer um launcher adicional se sua aplicação tiver valores padrão diferentes para argumentos ou puder ser executada com ou sem o console do Windows, ou se você empacotar múltiplas aplicações juntas para compartilhar um runtime. O formato para a opção é `--add-launcher launcher-name=properties-file`, onde launcher-name é o nome usado para o launcher adicional. Use aspas se o nome contiver espaços.

Os launchers são definidos em arquivos de propriedades que são passados para `jpackage`. Para cada launcher, um arquivo separado e uma instância separada da opção `--add-launcher` são necessários. As seguintes propriedades definem um launcher, pelo menos uma opção deve ser definida:

  * `module` - Nome do módulo que contém a classe principal para o launcher. Se o módulo principal não identificar a classe principal, inclua-o no formato `module=main-module/class`.

  * `main-jar` - Nome do arquivo JAR que contém a classe principal para o launcher.

  * `main-class` - Nome da classe principal.

  * `arguments` - Argumentos padrão, separados por espaços. Se um argumento contém espaços, coloque o argumento entre aspas, por exemplo, `arguments=arg1 "arg 2" arg3`

  * `app-version` - Número da versão.

  * `java-options` - Opções a serem passadas para a JVM, separadas por espaços. Se um argumento contém espaços, coloque o argumento entre aspas.

  * `icon` - Ícone usado para o launcher adicional

  * `win-console` - Defina como `true` para iniciar o console com a aplicação.




Para definir launchers adicionais, primeiro crie os arquivos de propriedades. Os exemplos a seguir mostram algumas das maneiras de configurar um launcher:

  * Adicionar um launcher com diferentes argumentos de aplicação.

Crie os seguintes arquivos de propriedades que definem diferentes argumentos padrão a serem usados quando a aplicação for iniciada. O primeiro arquivo define 3 argumentos a serem passados. O segundo arquivo define dois argumentos a serem passados.
` MLAppArgs1.properties:
        
        arguments=arg1 arg2 arg3
        
        MLAppArgs2.properties:
        
        arguments="String 1" "String 2"
```

O comando a seguir empacota a aplicação MyApp com dois launchers adicionais usando os arquivos de propriedades recém-criados.
` jpackage --name MyApp --input samples/myapp --main-jar MyApp.jar \
           --add-launcher MyApp1=MLAppArgs1.properties \
           --add-launcher MyApp2=MLAppArgs2.properties
```

  * Adicionar um launcher para iniciar o console do Windows.

Para fornecer ao usuário a opção de executar sua aplicação com ou sem o console, crie o seguinte arquivo de propriedades que define um launcher que usa o console do Windows.
` MLConsole.properties:
        
        win-console=true
```

O comando a seguir empacota a aplicação HelloWorld com um launcher adicional que executa a aplicação com o console do Windows.
` jpackage --name HelloWorld --input helloworld \
           --main-jar HelloWorld.jar \
           --add-launcher HWConsole=MLConsole.properties 
```

  * Adicionar um launcher para um segundo ponto de entrada.

Quando mais de uma aplicação é incluída no mesmo pacote, cada aplicação pode ser iniciada independentemente adicionando launchers adicionais. Se as aplicações FADemo e Dynamic Tree forem empacotadas juntas e o launcher principal for para a aplicação FADemo, crie o seguinte arquivo de propriedades para definir um launcher adicional para a aplicação Dynamic Tree.
` MLDynamicTree.properties
        
        main-jar=DynamicTree.jar
        main-class=webstartComponentArch.DynamicTreePanel
        icon=DTDemo.ico
```

O comando a seguir empacota as duas aplicações juntas e configura o launcher adicional usando o arquivo de propriedades recém-criado.
` jpackage --name MLDemo --input MLDemo \
           --main-jar ScriptRunnerApplication.jar \
           --add-launcher "Dynamic Tree"=MLDynamicTree.properties
```




### Assinar o Pacote da Aplicação (macOS)

Para uma aplicação que roda no macOS, use a opção `--mac-sign` e opções de suporte ao empacotar sua aplicação. Uma imagem de disco (`.dmg`) ou pacote (`.pkg`) que contém uma imagem de aplicação assinada (`.app`) pode ser notarizada.

As opções `jpackage` necessárias dependem se você deseja ou não distribuir sua aplicação através da Mac App Store.

Certificados Necessários

Se você deseja distribuir sua aplicação fora da Mac App Store, então você precisará dos certificados "Developer ID Application: &lt;nome do usuário ou equipe&gt;" e "Developer ID Installer: &lt;nome do usuário ou equipe&gt;".

Se você deseja implantar sua aplicação através da Mac App Store, então você precisará dos certificados "3rd Party Mac Developer Application: &lt;nome do usuário ou equipe&gt;" e "3rd Party Mac Developer Installer: &lt;nome do usuário ou equipe&gt;".

Opções para Assinar o Pacote da Aplicação macOS

Para assinar um pacote de aplicação macOS, inclua as seguintes opções `jpackage`:

  * `--mac-sign`: Solicita que o bundle seja assinado para macOS.

  * `--mac-signing-key-user-name user_or_team_name`: O nome do usuário ou equipe da chave, que é a parte do nome nas identidades de assinatura da Apple.




Além disso, você pode precisar das seguintes opções

  * `--mac-package-signing-prefix prefix`: Ao assinar o bundle da aplicação, este valor é prefixado a todos os componentes que precisam ser assinados e que não possuem um identificador de bundle existente. Se você não especificar esta opção, o prefixo será o nome da classe principal (não qualificado) seguido por um ponto (`.`).

  * `--mac-signing-keychain keychain_name`: Se um keychain diferente do keychain padrão for usado, especifique o nome do keychain conforme mostrado no aplicativo Acesso às Chaves. O nome deve terminar em `.keychain`.

  * `--type type`: Se você deseja criar uma imagem de aplicação (`.app`), especifique `app-image`; se você deseja criar um pacote (`.pkg`), especifique `pkg`. Se você não especificar esta opção, ela criará uma imagem de disco (`.dmg`).

  * `--mac-entitlements path`: Caminho para o arquivo contendo os entitlements a serem usados ao assinar executáveis e bibliotecas no bundle.

Se você não especificar a opção `--mac-entitlements` nem a opção `--mac-app-store`, então `jpackage` usa o arquivo de entitlements `default.plist`, que é um recurso embutido (veja [Recursos Usados no Empacotamento](<#/doc/guides/jpackage/override-jpackage-resources>)). Ele contém entitlements que permitem que sua aplicação assinada execute o JDK.




O comando a seguir gera uma imagem de disco (`.dmg`) contendo uma imagem de aplicação assinada com o certificado "Developer ID Application: developer.example.com". A imagem de disco é gerada com o prefixo `com.example.developer.OurApp.` e o nome da equipe developer.example.com.
```
    jpackage --name DynamicTreeDemo --input myApps --main-jar DynamicTree.jar \
       --mac-sign --mac-package-signing-prefix com.example.developer.OurApp. \
       --mac-signing-key-user-name "developer.example.com"
```

O comando a seguir gera um pacote (`.pkg`) contendo uma imagem de aplicação assinada com o certificado "Developer ID Installer: developer.example.com". O pacote é gerado com o prefixo `com.example.developer.OurApp.` e o nome da equipe developer.example.com.
```
    jpackage --type pkg --name DynamicTreeDemo --input myApps \
       --main-jar DynamicTree.jar --mac-sign --mac-package-signing-prefix com.example.developer.OurApp. \
       --mac-signing-key-user-name "developer.example.com"
```

Opções para Assinar o Pacote da Aplicação para a Mac App Store

Para assinar um pacote de aplicação para a Mac App Store, inclua também as seguintes opções `jpackage`:

  * `--mac-app-store`: Indica que a saída de `jpackage` é destinada à Mac App Store.

  * `--mac-entitlements path`: Caminho para o arquivo contendo os entitlements a serem usados ao assinar executáveis e bibliotecas no bundle. Este arquivo deve habilitar o App Sandbox Entitlement, que restringe sua aplicação a recursos do sistema e dados do usuário. É obrigatório para aplicações distribuídas através da Mac App Store.

Se você não especificar a opção `--mac-entitlements` mas especificar a opção `--mac-app-store`, então `jpackage` usa o arquivo de entitlements `sandbox.plist`, que é um recurso embutido (veja [Recursos Usados no Empacotamento](<#/doc/guides/jpackage/override-jpackage-resources>)). Ele contém `<key>com.apple.security.app-sandbox</key><true/>`, que habilita o App Sandbox Entitlement.

  * `--mac-app-category category`: Especifica a categoria que melhor descreve o pacote da sua aplicação para a Mac App Store. A ferramenta `jpackage` define o valor de LSApplicationCategoryType para o valor desta opção no arquivo `.plist` da sua aplicação. O valor padrão desta opção é `utilities`. Consulte [LSApplicationCategoryType](<https://developer.apple.com/documentation/bundleresources/information_property_list/lsapplicationcategorytype>) na Documentação do Desenvolvedor Apple para uma lista de categorias válidas.