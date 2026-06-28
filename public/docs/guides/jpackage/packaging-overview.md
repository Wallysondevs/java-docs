# Visão Geral de Empacotamento

## 1 Visão Geral de Empacotamento

A ferramenta de empacotamento `jpackage` permite gerar pacotes instaláveis para aplicações Java modulares e não modulares. Pacotes específicos de plataforma para Linux, macOS e Windows oferecem aos seus usuários uma maneira familiar de instalar e iniciar suas aplicações.

A forma mais simples de empacotamento recebe uma aplicação Java pré-construída como entrada e gera um pacote instalável em um formato padrão dependente da plataforma. A ferramenta de empacotamento gera um runtime para sua aplicação usando o comando `jlink`.

Para aplicações que exigem recursos mais avançados, opções de linha de comando estão disponíveis para funcionalidades como as seguintes:

  * Fornecer um ícone personalizado
  * Instalar a aplicação em um local específico
  * Especificar opções da JVM e argumentos da aplicação a serem usados ao iniciar a aplicação
  * Configurar associações de arquivo para iniciar a aplicação quando um tipo de arquivo associado for aberto
  * Iniciar a aplicação a partir de um grupo de menu específico da plataforma
  * Configurar múltiplos launchers para a aplicação
  * Assinar o pacote (somente macOS)

Para uma descrição de `jpackage` e suas opções, consulte [The jpackage Command](<#/>) nas Especificações da Ferramenta do Java Development Kit.

Tópicos:

  * [Pré-requisitos de Empacotamento](<#/doc/guides/jpackage/packaging-overview>)

  * [Preparação da Aplicação](<#/doc/guides/jpackage/packaging-overview>)

  * [Requisitos do Java Runtime](<#/doc/guides/jpackage/packaging-overview>)

### Pré-requisitos de Empacotamento

Pacotes de aplicação devem ser construídos na plataforma de destino. O sistema usado para empacotamento deve conter a aplicação, um JDK e o software necessário pela ferramenta de empacotamento.

Para empacotar sua aplicação para múltiplas plataformas, você deve executar a ferramenta de empacotamento em cada plataforma. Se você deseja mais de um formato para uma plataforma, você deve executar a ferramenta uma vez para cada formato.

As seguintes plataformas e formatos são suportados com o software necessário:

  * Linux: `deb`, `rpm`:

    * Para Red Hat Linux, o pacote `rpm-build` é necessário.

    * Para Ubuntu Linux, o pacote `fakeroot` é necessário.

  * macOS: `pkg`, `app` em um `dmg`

As ferramentas de linha de comando do Xcode são necessárias quando a opção `--mac-sign` é usada para solicitar que o pacote seja assinado, e quando a opção `--icon` é usada para personalizar a imagem DMG.

  * Windows: `exe`, `msi`

WiX 3.0 ou posterior é necessário.

### Preparação da Aplicação

Para empacotar sua aplicação, você deve primeiro construí-la e criar os arquivos JAR ou de módulo necessários. Os recursos necessários pela sua aplicação também devem estar disponíveis no sistema usado para empacotamento.

As seguintes informações e recursos relacionados à aplicação são usados para empacotamento:

  * Arquivos JAR ou de módulo para a aplicação
  * Metadados da aplicação, por exemplo, nome, versão, descrição, copyright, arquivo de licença
  * Opções de instalação, por exemplo, atalho, grupo de menu, launchers adicionais, associações de arquivo
  * Opções de inicialização, por exemplo, argumentos da aplicação, opções da JVM

Como parte do processo de empacotamento, uma imagem da aplicação baseada nos arquivos do diretório de entrada é criada. Esta imagem é descrita em [Imagem da Aplicação Gerada](<#/doc/guides/jpackage/packaging-overview>). Para testar sua aplicação antes de criar um pacote instalável, use a opção `--type app-image ` para criar apenas a imagem da aplicação.

#### Imagem da Aplicação Gerada

A ferramenta de empacotamento cria uma imagem da aplicação baseada na entrada da ferramenta.

O exemplo a seguir mostra a imagem da aplicação criada para uma aplicação Hello World simples para cada plataforma. Arquivos que são considerados detalhes de implementação estão sujeitos a alterações e não são mostrados.

  * Linux:
```
myapp/
          bin/              // Application launchers
            HelloWorld
          lib/
            app/
              HelloWorld.cfg     // Configuration info, created by jpackage
              HelloWorld.jar     // JAR file, copied from the --input directory
            runtime/             // Java runtime image
```

  * macOS:
```
HelloWorld.app/
          Contents/
            Info.plist
            MacOS/               // Application launchers
              HelloWorld
            Resources/           // Icons, etc.
            app/
              HelloWorld.cfg     // Configuration info, created by jpackage
              HelloWorld.jar     // JAR file, copied from the --input directory
            runtime/             // Java runtime image
```

  * Windows:
```
HelloWorld/
          HelloWorld.exe       // Application launchers
          app/
            HelloWorld.cfg     // Configuration info, created by jpackage
            HelloWorld.jar     // JAR file, copied from the --input directory
          runtime/             // Java runtime image
```

A imagem da aplicação gerada pela ferramenta funciona para a maioria das aplicações. No entanto, você pode fazer alterações antes de empacotar a imagem para distribuição, se necessário.

### Requisitos do Java Runtime

Para eliminar a necessidade de os usuários instalarem um Java runtime, um é empacotado com suas aplicações. A ferramenta de empacotamento gera uma imagem de runtime baseada nos pacotes ou módulos que sua aplicação precisa.

Se nenhuma imagem de Java runtime for passada para a ferramenta de empacotamento, então `jpackage` usa a ferramenta `jlink` para criar um runtime para a aplicação. Imagens de runtime criadas pela ferramenta de empacotamento não contêm símbolos de depuração, os comandos JDK usuais, páginas man, o arquivo `src.zip` ou service bindings (consulte a classe [Configuration](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/module/Configuration.html>)).

Para aplicações não modulares compostas por arquivos JAR, a imagem de runtime gerada contém o mesmo conjunto de módulos JDK que é fornecido a aplicações de classpath no módulo sem nome pelo launcher `java` regular. O exemplo a seguir cria uma aplicação Java autocontida composta por um arquivo JAR:
```
    jpackage --name DynamicTreeDemo \
             --input . --main-jar DynamicTreeDemo.jar \
             --module-path $JAVA_HOME/jmods
```

Para aplicações modulares compostas por arquivos JAR modulares e arquivos JMOD, a imagem de runtime gerada contém o módulo principal da aplicação e o fechamento transitivo de todas as suas dependências. O exemplo a seguir cria uma aplicação Java autocontida composta por um módulo:
```
    jpackage --name Hello --module-path mods \
             --module com.greetings/com.greetings.Main
```

Para adicionar módulos adicionais, use a opção `--add-modules`. Os exemplos a seguir adicionam o módulo `java.logging`:
```
    jpackage --name DynamicTreeDemo \
             --input . --main-jar DynamicTreeDemo.jar \
             --module-path $JAVA_HOME/jmods \
             --add-modules java.logging
```
```
    jpackage --name Hello --module-path "mods:$JAVA_HOME/jmods" \
             --module com.greetings/com.greetings.Main \
             --add-modules java.logging
```

No JDK 25 e posterior, a imagem de runtime gerada não inclui service bindings. Você pode adicioná-los com a opção `--jlink-options` e passando a opção `jlink` `--bind-services`:
```
    jpackage --name DynamicTreeDemo \
             --input . --main-jar DynamicTreeDemo.jar \
             --jlink-options --bind-services
```
```
    jpackage --name Hello --module-path mods \
             --module com.greetings/com.greetings.Main \
             --jlink-options --bind-services
```

Nota:

  * Se você não especificar a opção `--jlink-options`, então, por padrão, a ferramenta `jpackage` adiciona estas opções `jlink`: `--strip-native-commands`, `--strip-debug`, `--no-man-pages` e `--no-header-files`.

  * No JDK 25 e posterior, `jpackage` não inclui mais service bindings na imagem de runtime que ele cria. Antes do JDK 25, `jpackage` os incluiria. Como resultado, as imagens de runtime geradas por `jpackage` no JDK 25 e posterior podem não incluir o mesmo conjunto de módulos que incluíam em versões anteriores do JDK.

Para incluir o mesmo conjunto de módulos na imagem de runtime gerada como nas versões anteriores do JDK, use a opção `--jlink-options` e passe a opção `jlink` `--bind-services` além das opções `jlink` padrão que `jpackage` usa:
```
 jpackage [...] --jlink-options --strip-native-commands --strip-debug \
                       --no-man-pages --no-header-files --bind-services
```

A imagem de runtime gerada pela ferramenta funciona para a maioria das aplicações. No entanto, você pode criar um runtime personalizado para empacotar com sua aplicação, se necessário.