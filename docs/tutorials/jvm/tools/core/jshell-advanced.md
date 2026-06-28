# Uso Avançado do JShell

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas Essenciais do JDK ](<#/doc/tutorials/jvm/tools/core>) > Uso Avançado do JShell

**Anterior na Série**

[JShell - A Ferramenta Shell do Java](<#/doc/tutorials/jvm/tools/core/jshell>)

➜

**Tutorial Atual**

Uso Avançado do JShell

➜

**Próximo na Série**

[Jar - a Ferramenta de Arquivo](<#/doc/tutorials/jvm/tools/core/jar>)

**Anterior na Série:** [JShell - A Ferramenta Shell do Java](<#/doc/tutorials/jvm/tools/core/jshell>)

**Próximo na Série:** [Jar - a Ferramenta de Arquivo](<#/doc/tutorials/jvm/tools/core/jar>)

# Uso Avançado do JShell

## Visão Geral

Você pode usar o [jshell](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jshell.html>) para avaliar código usando as APIs padrão do Java, mas também pode prototipar programas que exigem dependências externas, definir uma sequência de snippets e comandos `jshell` em um arquivo e passá-lo para a ferramenta.

Este tutorial aborda como trabalhar com JavaFX no `jshell`, usando scripts predefinidos ou criando os seus próprios, e finalmente como produzir um arquivo `jar` dentro de uma sessão `jshell`.

## Carregar Bibliotecas Externas no JShell

Em uma sessão `jshell` você pode prototipar código que precisa de bibliotecas externas, e você pode definir o acesso a elas através do classpath (`--class-path`). Para ilustrar como você pode conseguir isso, vamos construir em uma sessão `jshell` uma ferramenta visual que avalia o tipo de expressões Java usando JavaFX e a [JShell API](<https://docs.oracle.com/en/java/javase/26/docs/api/jdk.jshell/module-summary.html>). Você precisará de um JavaFX SDK para realizar os próximos passos neste tutorial, então certifique-se de verificar a [seção de download](<#/doc/tutorials/javafx/install>) da [série JavaFX](<#/doc/tutorials/javafx>) e descobrir como você pode obter um.

JavaFX é um componente autônomo e é construído sobre um Java Development Kit e você pode usar seus componentes em uma sessão `jshell` adicionando cada um ao classpath:

```bash
jshell --class-path /path/to/javafx-sdk/lib/javafx.base.jar:/path/to/javafx-sdk/lib/javafx.controls.jar:/path/to/javafx-sdk/lib/javafx.graphics.jar:/path/to/javafx-sdk/lib/javafx.fxml.jar:/path/to/javafx-sdk/lib/javafx.media.jar:/path/to/javafx-sdk/lib/javafx.swing.jar:/path/to/javafx-sdk/lib/javafx.web.jar
```

ou em uma sessão `jshell` existente você pode executar:

```java
/env --class-path /path/to/javafx-sdk/lib/javafx.base.jar:/path/to/javafx-sdk/lib/javafx.controls.jar:/path/to/javafx-sdk/lib/javafx.graphics.jar:/path/to/javafx-sdk/lib/javafx.fxml.jar:/path/to/javafx-sdk/lib/javafx.media.jar:/path/to/javafx-sdk/lib/javafx.swing.jar:/path/to/javafx-sdk/lib/javafx.web.jar
```

No entanto, a partir do Java 9 você pode importar JavaFX como módulos através da opção `--module-path`:

```bash
jshell --module-path /path/to/javafx-sdk/lib --add-modules javafx.controls,javafx.fxml
```

Ou, em uma sessão `jshell` existente, basta invocar:

```java
/env --module-path /path/to/javafx-sdk/lib --add-modules javafx.controls,javafx.fxml
```

Vamos criar a ferramenta visual com JavaFX usando o editor `jshell`:

```java
/edit
```

e copie e cole o seguinte código:

```java
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import jdk.jshell.JShell;
import jdk.jshell.Snippet;
import jdk.jshell.SnippetEvent;
import java.util.List;

public class VisualJShell extends Application {

    private JShell jshell;
    private Label resultLabel;

    @Override
    public void start(Stage primaryStage) {
        jshell = JShell.create();

        VBox root = new VBox(10);
        TextField inputField = new TextField();
        resultLabel = new Label("Type: ");

        inputField.setOnAction(event -> {
            String expression = inputField.getText();
            if (!expression.trim().isEmpty()) {
                List<SnippetEvent> events = jshell.eval(expression);
                for (SnippetEvent e : events) {
                    if (e.status() == Snippet.Status.VALID) {
                        resultLabel.setText("Type: " + e.snippet().kind().name() + " - " + e.value());
                    } else {
                        resultLabel.setText("Error: " + e.exception().getMessage());
                    }
                }
            }
        });

        root.getChildren().addAll(new Label("Enter Java Expression:"), inputField, resultLabel);
        Scene scene = new Scene(root, 400, 200);
        primaryStage.setTitle("Visual JShell");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    @Override
    public void stop() {
        if (jshell != null) {
            jshell.close();
        }
    }

    public static void main(String[] args) {
        launch(args);
    }
}
```

O código acima permite que você insira uma expressão (ex: `Boolean.TRUE`) e veja seu tipo ao pressionar ENTER no seu teclado. No editor visual, clique em `Accept` e depois em `Exit`. Na sua linha de comando você observará a seguinte mensagem:

```
|  created snippet VisualJShell
```

Tudo o que resta a fazer para experimentar a ferramenta é instanciá-la:

```java
VisualJShell vjshell = new VisualJShell();
```

e chamar seu método `main`:

```java
vjshell.main(new String[]{});
```

Você deverá ver uma aplicação similar a:

[](<https://dev.java/assets/images/tools/jshell/vjshell.png>)

Em seguida, vamos ver como você pode salvar seu trabalho em uma sessão `jshell` e reutilizá-lo no futuro.

## Criar e Carregar Scripts JShell Personalizados

Na sua sessão `jshell`, você pode optar por salvar os snippets ativos atuais:

```java
/save setup-visual-jshell.jsh
```

O conteúdo do seu script `setup-visual-jshell.jsh` seria semelhante a:

```java
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import jdk.jshell.JShell;
import jdk.jshell.Snippet;
import jdk.jshell.SnippetEvent;
import java.util.List;

public class VisualJShell extends Application {

    private JShell jshell;
    private Label resultLabel;

    @Override
    public void start(Stage primaryStage) {
        jshell = JShell.create();

        VBox root = new VBox(10);
        TextField inputField = new TextField();
        resultLabel = new Label("Type: ");

        inputField.setOnAction(event -> {
            String expression = inputField.getText();
            if (!expression.trim().isEmpty()) {
                List<SnippetEvent> events = jshell.eval(expression);
                for (SnippetEvent e : events) {
                    if (e.status() == Snippet.Status.VALID) {
                        resultLabel.setText("Type: " + e.snippet().kind().name() + " - " + e.value());
                    } else {
                        resultLabel.setText("Error: " + e.exception().getMessage());
                    }
                }
            }
        });

        root.getChildren().addAll(new Label("Enter Java Expression:"), inputField, resultLabel);
        Scene scene = new Scene(root, 400, 200);
        primaryStage.setTitle("Visual JShell");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    @Override
    public void stop() {
        if (jshell != null) {
            jshell.close();
        }
    }

    public static void main(String[] args) {
        launch(args);
    }
}
```

Agora você pode sair da sua sessão `jshell` com:

```java
/exit
```

O `jshell` possui uma série de scripts predefinidos, conforme detalhado em [seus comandos](<#/doc/tutorials/jvm/tools/core/jshell>). Você pode definir esses scripts padrão na inicialização da sua sessão `jshell`:

```bash
jshell --startup DEFAULT
```

ou invocá-los enquanto estiver em uma sessão `jshell` ativa:

```java
/open DEFAULT
```

No entanto, você pode optar por salvar todo o histórico dos snippets e comandos, tanto válidos quanto inválidos, executando o seguinte comando:

```java
/save -history my-history.jsh
```

Como existe um script `setup-visual-jshell.jsh` salvo, você pode carregá-lo ao iniciar uma nova sessão `jshell` executando:

```bash
jshell setup-visual-jshell.jsh
```

Como resultado da execução do(s) comando(s) anterior(es), você poderá iniciar novamente a ferramenta visual e modificá-la, se necessário.

> ⚠️ **Tenha cuidado ao executar scripts remotos no `jshell`: você só deve carregar um script remoto de um site em que confia!**

Finalmente, vamos criar um arquivo jar em uma sessão `jshell` e executá-lo sempre que precisar.

## Como Usar Ferramentas JDK Dentro do JShell

Uma série de ferramentas do JDK estão disponíveis em uma sessão `jshell` invocando o script `TOOLING`:

```java
/open TOOLING
```

Para verificar quais ferramentas estão disponíveis, você pode invocar o método `tools()`:

```java
tools()
```

e sua saída seria semelhante a:

```
|  Tooling methods:
|    run(String toolName, String... args)
|    javac(String... args)
|    jar(String... args)
|    javap(String... args)
|    jlink(String... args)
|    jmod(String... args)
|    jpackage(String... args)
|    jdb(String... args)
|    jfr(String... args)
|    jcmd(String... args)
|    jinfo(String... args)
|    jmap(String... args)
|    jps(String... args)
|    jstack(String... args)
|    jstat(String... args)
|    keytool(String... args)
|    rmic(String... args)
|    serialver(String... args)
|    jarsigner(String... args)
|    jdeps(String... args)
|    jhsdb(String... args)
|    jimage(String... args)
|    jdeprscan(String... args)
|    jjs(String... args)
|    jrunscript(String... args)
|    jshell(String... args)
|    jconsole(String... args)
|    jvisualvm(String... args)
|    pack200(String... args)
|    unpack200(String... args)
```

No `jshell`, você pode executar uma ferramenta arbitrária passando seu nome e argumentos de linha de comando para o método `run(String, String...)`:

```java
run("javac", "-version")
```

Você também pode executar uma ferramenta usando seu método wrapper dedicado (ex: `javac(String...)`) e passando argumentos de linha de comando:

```java
javac("-version")
```

Para criar um arquivo jar executável a partir do código anterior, vamos criar a seguinte hierarquia de diretórios localmente:

```
src/
└── example/
    └── VisualJShell.java
```

Em seguida, vamos redefinir o histórico e o estado atuais:

```java
/reset
```

e então pedir ao `jshell` para entrar no modo de edição:

```java
/edit
```

E mais uma vez copie e cole nosso código `VisualJShell`:

```java
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import jdk.jshell.JShell;
import jdk.jshell.Snippet;
import jdk.jshell.SnippetEvent;
import java.util.List;

public class VisualJShell extends Application {

    private JShell jshell;
    private Label resultLabel;

    @Override
    public void start(Stage primaryStage) {
        jshell = JShell.create();

        VBox root = new VBox(10);
        TextField inputField = new TextField();
        resultLabel = new Label("Type: ");

        inputField.setOnAction(event -> {
            String expression = inputField.getText();
            if (!expression.trim().isEmpty()) {
                List<SnippetEvent> events = jshell.eval(expression);
                for (SnippetEvent e : events) {
                    if (e.status() == Snippet.Status.VALID) {
                        resultLabel.setText("Type: " + e.snippet().kind().name() + " - " + e.value());
                    } else {
                        resultLabel.setText("Error: " + e.exception().getMessage());
                    }
                }
            }
        });

        root.getChildren().addAll(new Label("Enter Java Expression:"), inputField, resultLabel);
        Scene scene = new Scene(root, 400, 200);
        primaryStage.setTitle("Visual JShell");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    @Override
    public void stop() {
        if (jshell != null) {
            jshell.close();
        }
    }

    public static void main(String[] args) {
        launch(args);
    }
}
```

e então salve seu trabalho no arquivo `src/example/VisualJShell.java` executando:

```java
/save -file src/example/VisualJShell.java
```

De acordo com [JEP 220: Modular Run-Time Images](<https://openjdk.org/jeps/220>), um snippet não pode declarar um package ou module. No entanto, você usará ferramentas do JDK que precisam dessa declaração de package, então você deve adicioná-la em um editor de texto:

```java
package example;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import jdk.jshell.JShell;
import jdk.jshell.Snippet;
import jdk.jshell.SnippetEvent;
import java.util.List;

public class VisualJShell extends Application {

    private JShell jshell;
    private Label resultLabel;

    @Override
    public void start(Stage primaryStage) {
        jshell = JShell.create();

        VBox root = new VBox(10);
        TextField inputField = new TextField();
        resultLabel = new Label("Type: ");

        inputField.setOnAction(event -> {
            String expression = inputField.getText();
            if (!expression.trim().isEmpty()) {
                List<SnippetEvent> events = jshell.eval(expression);
                    for (SnippetEvent e : events) {
                        if (e.status() == Snippet.Status.VALID) {
                            resultLabel.setText("Type: " + e.snippet().kind().name() + " - " + e.value());
                        } else {
                            resultLabel.setText("Error: " + e.exception().getMessage());
                        }
                    }
            }
        });

        root.getChildren().addAll(new Label("Enter Java Expression:"), inputField, resultLabel);
        Scene scene = new Scene(root, 400, 200);
        primaryStage.setTitle("Visual JShell");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    @Override
    public void stop() {
        if (jshell != null) {
            jshell.close();
        }
    }

    public static void main(String[] args) {
        launch(args);
    }
}
```

Este exercício visa criar um arquivo jar para uma aplicação modular, então você precisará de um arquivo `module-info.java` na sua pasta `src/` com o seguinte conteúdo:

```java
module visual.jshell {
    requires javafx.controls;
    requires javafx.fxml;
    requires jdk.jshell;

    exports example;
}
```

Como a sessão `jshell` foi redefinida, você deve abrir novamente o script `TOOLING` para usar as ferramentas do JDK disponíveis:

```java
/open TOOLING
```

Vamos compilar nossos `VisualJShell.java` e `module-info.java`:

```java
javac("--module-path", "/path/to/javafx-sdk/lib", "--add-modules", "javafx.controls,javafx.fxml", "-d", "out", "src/example/VisualJShell.java", "src/module-info.java")
```

Agora você pode criar o arquivo `jar` que usará para executar a aplicação:

```java
jar("--create", "--file", "visual-jshell.jar", "--main-class", "example.VisualJShell", "--module-version", "1.0", "-C", "out", ".", "-C", "src", "module-info.java")
```

Para testar o resultado dos seus esforços, vá para outra janela de terminal e execute o seguinte comando:

```bash
java --module-path /path/to/javafx-sdk/lib:visual-jshell.jar --add-modules javafx.controls,javafx.fxml -m visual.jshell/example.VisualJShell
```

Parabéns! Agora você tem um jar executável que você pode executar sempre que precisar.

## Mais Aprendizado

### Neste tutorial

Visão Geral Carregar Bibliotecas Externas no JShell Criar e Carregar Scripts JShell Personalizados Como Usar Ferramentas JDK Dentro do JShell Mais Aprendizado

Última atualização: 13 de agosto de 2024

**Anterior na Série**

[JShell - A Ferramenta Shell do Java](<#/doc/tutorials/jvm/tools/core/jshell>)

➜

**Tutorial Atual**

Uso Avançado do JShell

➜

**Próximo na Série**

[Jar - a Ferramenta de Arquivo](<#/doc/tutorials/jvm/tools/core/jar>)

**Anterior na Série:** [JShell - A Ferramenta Shell do Java](<#/doc/tutorials/jvm/tools/core/jshell>)

**Próximo na Série:** [Jar - a Ferramenta de Arquivo](<#/doc/tutorials/jvm/tools/core/jar>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas Essenciais do JDK ](<#/doc/tutorials/jvm/tools/core>) > Uso Avançado do JShell