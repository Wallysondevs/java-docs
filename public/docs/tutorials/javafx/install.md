# Download e Configuração do JavaFX

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Download e Configuração do JavaFX

# Download e Configuração do JavaFX

JavaFX é uma plataforma de aplicação cliente de próxima geração, de código aberto, para sistemas desktop, móveis e embarcados construída em Java. Ela fornece uma API para projetar aplicações GUI que rodam em todos os dispositivos suportados por Java.

Este tutorial irá guiá-lo através do processo de instalação do JavaFX em seu sistema operacional.

## Download do JavaFX

JavaFX é um componente autônomo e é construído sobre um Java Development Kit. Portanto, você deve considerar a instalação de um Java Development Kit (JDK) que funcione com a versão do JavaFX que você planeja usar, por exemplo, JavaFX 21 requer a instalação prévia do JDK 21. Você pode descobrir como instalar um JDK seguindo a seção [configurando um Java Development Kit](<#/doc/tutorials/getting-started>) do tutorial [Começando com Java](<#/doc/tutorials/getting-started>).

Existe uma página centralizada que sempre se refere à versão mais recente do JavaFX e do JDK: <https://jdk.java.net/>. Selecionar a versão mais recente "Pronta para uso" do JavaFX leva você a uma página onde você pode baixar a versão do JDK que precisa. A partir desta página, você pode escolher a forma de trabalhar com JavaFX:

  * Use JavaFX como um SDK para compilar e executar aplicações JavaFX.
  * Baixe o arquivo contendo uma série de arquivos jmod e use-os com jlink para criar um JDK que inclua os módulos JavaFX e, opcionalmente, sua aplicação modular.

Você deve baixar o JavaFX com base no seu sistema operacional:

  * Linux/x64
  * macOS/x64
  * macOS/AArch64
  * Windows/x64

Esta página fornece builds de código aberto do JavaFX prontos para produção, sob a GNU General Public License, versão 2, com a Classpath Exception.

## Configurando um JavaFX SDK para Windows/x64

Se você optar por usar o JavaFX SDK para Windows/x64, baixe e descompacte-o em um local desejado. Nesta seção, você usará o JavaFX 21.0.1.

Adicione uma variável de ambiente apontando para o diretório lib do runtime:

```bash
set PATH_TO_FX="C:\path\to\javafx-sdk-21.0.1\lib"
```

Agora você pode compilar e executar aplicações JavaFX a partir da linha de comando usando o runtime JavaFX. Vamos testar isso escrevendo uma classe simples `HelloWorldFX.java`:

```java
package com.example;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.stage.Stage;

public class HelloWorldFX extends Application {

    @Override
    public void start(Stage stage) {
        String javaVersion = System.getProperty("java.version");
        String javafxVersion = System.getProperty("javafx.version");
        Label l = new Label("Hello, JavaFX " + javafxVersion + ", running on Java " + javaVersion + ".");
        Scene scene = new Scene(l, 640, 480);
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }

}
```

Primeiro, você irá compilá-lo com:

```bash
javac --module-path %PATH_TO_FX% --add-modules javafx.controls HelloWorldFX.java
```

Ao compilar a aplicação, você precisa adicionar os módulos necessários (`javafx.controls`). Os módulos necessários (`javafx.controls`) resolvem a dependência dos transitivamente necessários (`javafx.graphics`). Caso sua aplicação esteja declarando componentes via [`FXML`](<>), você também deve adicionar o módulo `javafx.fxml`:

```bash
javac --module-path %PATH_TO_FX% --add-modules javafx.controls,javafx.fxml HelloWorldFX.java
```

Agora execute a aplicação com o seguinte comando:

```bash
java --module-path %PATH_TO_FX% --add-modules javafx.controls HelloWorldFX
```

## Configurando um JavaFX SDK para Linux/x64

Caso você opte por usar o JavaFX SDK para Linux/x64, baixe e extraia/descompacte-o em um local desejado. Nesta seção, você usará o JavaFX 21.0.1.

Adicione uma variável de ambiente apontando para o diretório lib do runtime:

```bash
export PATH_TO_FX=/path/to/javafx-sdk-21.0.1/lib
```

Agora você pode compilar e executar aplicações JavaFX a partir da linha de comando usando o runtime JavaFX. Vamos testar isso escrevendo uma classe simples `HelloWorldFX.java`:

```java
package com.example;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.stage.Stage;

public class HelloWorldFX extends Application {

    @Override
    public void start(Stage stage) {
        String javaVersion = System.getProperty("java.version");
        String javafxVersion = System.getProperty("javafx.version");
        Label l = new Label("Hello, JavaFX " + javafxVersion + ", running on Java " + javaVersion + ".");
        Scene scene = new Scene(l, 640, 480);
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }

}
```

Primeiro, você irá compilá-lo com:

```bash
javac --module-path $PATH_TO_FX --add-modules javafx.controls HelloWorldFX.java
```

Ao compilar a aplicação, você precisa adicionar os módulos necessários (`javafx.controls`). Os módulos necessários (`javafx.controls`) resolvem a dependência dos transitivamente necessários (`javafx.graphics`). Caso sua aplicação esteja declarando componentes via [`FXML`](<>), você também deve adicionar o módulo `javafx.fxml`:

```bash
javac --module-path $PATH_TO_FX --add-modules javafx.controls,javafx.fxml HelloWorldFX.java
```

Agora execute a aplicação com o seguinte comando:

```bash
java --module-path $PATH_TO_FX --add-modules javafx.controls HelloWorldFX
```

## Configurando um JavaFX SDK para macOS

Caso você opte por usar o JavaFX SDK para macOS, baixe e extraia/descompacte-o em um local desejado. Nesta seção, você usará o JavaFX 21.0.1.

Adicione uma variável de ambiente apontando para o diretório lib do runtime:

```bash
export PATH_TO_FX=/path/to/javafx-sdk-21.0.1/lib
```

Agora você pode compilar e executar aplicações JavaFX a partir da linha de comando usando o runtime JavaFX. Vamos testar isso escrevendo uma classe simples `HelloWorldFX.java`:

```java
package com.example;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.stage.Stage;

public class HelloWorldFX extends Application {

    @Override
    public void start(Stage stage) {
        String javaVersion = System.getProperty("java.version");
        String javafxVersion = System.getProperty("javafx.version");
        Label l = new Label("Hello, JavaFX " + javafxVersion + ", running on Java " + javaVersion + ".");
        Scene scene = new Scene(l, 640, 480);
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }

}
```

Primeiro, você irá compilá-lo com:

```bash
javac --module-path $PATH_TO_FX --add-modules javafx.controls HelloWorldFX.java
```

Ao compilar a aplicação, você precisa adicionar os módulos necessários (`javafx.controls`). Os módulos necessários (`javafx.controls`) resolvem a dependência dos transitivamente necessários (`javafx.graphics`). Caso sua aplicação esteja declarando componentes via [`FXML`](<>), você também deve adicionar o módulo `javafx.fxml`:

```bash
javac --module-path $PATH_TO_FX --add-modules javafx.controls,javafx.fxml HelloWorldFX.java
```

Agora execute a aplicação com o seguinte comando:

```bash
java --module-path $PATH_TO_FX --add-modules javafx.controls HelloWorldFX
```

## Trabalhando com Imagens de Runtime do JavaFX

Você também pode executar sua aplicação JavaFX usando o conjunto de arquivos jmod disponíveis na página de lançamento do JavaFX. Comece baixando o arquivo apropriado para o seu sistema operacional:

  * Linux/x64
  * macOS/x64
  * macOS/AArch64
  * Windows/x64

Caso seu sistema operacional seja Linux/x64 ou macOS, descompacte o arquivo baixado e adicione a variável de ambiente apontando para o diretório jmods resultante:

```bash
export PATH_TO_FX_JMODS=/path/to/javafx-jmods-21.0.1
```

Se você é um usuário de sistema operacional Windows, descompacte o arquivo baixado e adicione a variável de ambiente apontando para o diretório jmods resultante:

```bash
set PATH_TO_FX_JMODS="C:\path\to\javafx-jmods-21.0.1"
```

Para usar o conjunto de arquivos jmod, precisamos tornar a aplicação `HelloWorldFX.java` parte de um módulo. Primeiramente, você precisa adicionar uma declaração de pacote à classe:

```java
package com.example;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.stage.Stage;

public class HelloWorldFX extends Application {

    @Override
    public void start(Stage stage) {
        String javaVersion = System.getProperty("java.version");
        String javafxVersion = System.getProperty("javafx.version");
        Label l = new Label("Hello, JavaFX " + javafxVersion + ", running on Java " + javaVersion + ".");
        Scene scene = new Scene(l, 640, 480);
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }

}
```

Em segundo lugar, você deve criar um `module-info.java` onde você declara os módulos necessários para executar a aplicação:

```java
module helloworldfx {
    requires javafx.controls;
    exports com.example;
}
```

Em seguida, você pode compilar a aplicação `HelloWorldFX.java` com os arquivos jmod do JavaFX:

  * para Linux/x64, macOS/x64, macOS/AArch64

    ```bash
    javac --module-path $PATH_TO_FX_JMODS --add-modules javafx.controls -d mods src/com/example/HelloWorldFX.java src/module-info.java
    ```

  * para Windows

    ```bash
    javac --module-path %PATH_TO_FX_JMODS% --add-modules javafx.controls -d mods src/com/example/HelloWorldFX.java src/module-info.java
    ```

Como o `helloworldfx` é um projeto modular, você pode usar `jlink` para criar uma imagem de runtime personalizada usando os jmods do JavaFX:

  * em Linux/x64, macOS/x64, macOS/AArch64

    ```bash
    jlink --module-path $PATH_TO_FX_JMODS:mods --add-modules helloworldfx --output helloworldfx-runtime
    ```

  * em Windows

    ```bash
    jlink --module-path %PATH_TO_FX_JMODS%;mods --add-modules helloworldfx --output helloworldfx-runtime
    ```

Após a imagem ser construída, você pode executá-la usando o seguinte comando:

  * em Linux/x64, macOS/x64, macOS/AArch64

    ```bash
    ./helloworldfx-runtime/bin/java --module helloworldfx/com.example.HelloWorldFX
    ```

  * em Windows

    ```bash
    .\helloworldfx-runtime\bin\java --module helloworldfx/com.example.HelloWorldFX
    ```

## Palavras finais

Parabéns por baixar, instalar e usar o JavaFX com sucesso!

Para leitura adicional, consulte [Fundamentos do JavaFX](<#/doc/tutorials/javafx>).

### Neste tutorial

Download do JavaFX Configurando um JavaFX SDK para Windows/x64 Configurando um JavaFX SDK para Linux/x64 Configurando um JavaFX SDK para macOS Trabalhando com Imagens de Runtime do JavaFX Palavras finais

Última atualização: 15 de novembro de 2023

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Download e Configuração do JavaFX