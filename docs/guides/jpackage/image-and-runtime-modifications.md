# Modificações de Imagem e Runtime

## 5 Modificações de Imagem e Runtime

A imagem da aplicação e o runtime Java gerados pela ferramenta de empacotamento funcionam bem para a maioria das aplicações. No entanto, você pode fazer alterações na imagem e no runtime para quaisquer requisitos personalizados que possa ter e, em seguida, usar a versão modificada ao empacotar sua aplicação.

Tópicos:

  * [Modificações da Imagem da Aplicação](<#/doc/guides/jpackage/image-and-runtime-modifications>)

  * [Modificações do Runtime Java](<#/doc/guides/jpackage/image-and-runtime-modifications>)

### Modificações da Imagem da Aplicação

Se necessário, você pode modificar a imagem da aplicação que a ferramenta de empacotamento cria e, em seguida, empacotar a imagem modificada para distribuição.

As possíveis razões para modificar a imagem incluem: adicionar ou remover arquivos, adicionar recursos ou alterar o runtime. Se você precisar modificar a imagem, execute a ferramenta de empacotamento duas vezes da seguinte forma:

  1. Crie apenas a imagem da aplicação com a opção `--type app-image`. Por exemplo:
` jpackage --type app-image --name HelloWorld --module-path myModApps \
             --module modhw/modhw.HelloWorldMod
```

Neste exemplo, um diretório chamado `HelloWorld` é criado no diretório atual. O diretório `HelloWorld` contém a imagem da aplicação, que contém a aplicação modular no diretório `myModApps` cuja classe principal está no módulo `modhw/modhw.HelloWorldMod`. Um pacote instalável não é criado.

  2. Depois de fazer as alterações necessárias na imagem da aplicação, execute a ferramenta de empacotamento novamente para criar um pacote instalável com a imagem modificada. Por exemplo:
` jpackage --type msi --app-image HelloWorld --name HelloWorld
```

Nota:

  * A opção `--name` é obrigatória ao empacotar uma imagem de aplicação.

  * A opção `--runtime-image` não é permitida com `--app-image`. Você receberá o seguinte erro:
` Error: Mutually exclusive options [--runtime-image] and [--app-image]
```

Se você quiser usar um runtime diferente, especifique-o na primeira vez que executar `jpackage` para criar a imagem da aplicação. Por exemplo:
` jpackage --type app-image --name HelloWorld \
            --runtime-image myCustomJRE --module-path myModApps \
            --module modhw/modhw.HelloWorldMod
```

### Modificações do Runtime Java

Quando você deseja mais controle sobre o runtime Java que é empacotado com sua aplicação, você pode criar um runtime personalizado.

Para criar uma imagem de runtime Java personalizada para sua aplicação, execute `jlink` antes de empacotar sua aplicação. Em seguida, passe a imagem produzida para a ferramenta de empacotamento usando a opção `--runtime-image`. Razões pelas quais você pode querer usar uma imagem de runtime personalizada:

  * Ter mais controle sobre as opções usadas para criar o runtime
  * Empacotar sua aplicação com uma versão diferente do Java da versão usada para executar `jpackage`
  * Usar o mesmo runtime para mais de uma aplicação.

Por exemplo, os seguintes comandos criam um runtime JDK 14 que inclui módulos JavaFX 13 e, em seguida, empacotam esse runtime com uma aplicação:
```
    jlink --output jdk-14+fx --module path javafx-jmods-13 \
       --add modules javafx.web,javafx.media,javafx.fxml,java.logging
    
    jpackage --name myapp --input lib --main-jar myApp.jar \
       --runtime-image jdk-14+fx
```

Se você estiver empacotando uma aplicação que requer uma versão anterior do runtime Java, use a opção `--runtime-image`. O seguinte comando empacota o runtime JDK 11 com sua aplicação:
```
    jpackage --name myapp --input lib --main-jar myApp.jar \
       --runtime-image jdk-11.0.5
```

Se sua aplicação requer um runtime personalizado baseado em uma versão anterior do JDK, use a versão anterior para executar `jlink` e criar a imagem do runtime. Em seguida, use o JDK atual para executar `jpackage` e passe a ele o runtime personalizado. Os seguintes comandos criam um runtime personalizado usando JDK 11.0.5 e o empacotam usando JDK 14:
```
    c:\Program Files\Java\jdk-11.0.5\bin\jlink output my-jdk11 \
       --add-modules java.desktop,java.datatransfer 
    
    c:\Program Files\Java\jdk-14\bin\jpackage --name myapp --input lib \
       --main-jar myApp.jar --runtime-image my-jdk11
```