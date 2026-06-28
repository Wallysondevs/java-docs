# Scripts

## 7 Scripts

Um script JShell é uma sequência de snippets e comandos JShell em um arquivo, um snippet ou comando por linha.

Scripts podem ser um arquivo local, ou um dos seguintes scripts predefinidos:

Nome do Script | Conteúdo do Script
---|---
DEFAULT | Inclui declarações de importação comumente necessárias. Este script é usado se nenhum outro script de inicialização for fornecido.
JAVASE | Importa a API central do Java SE definida pelo módulo `java.se`, o que causa um atraso notável na inicialização do JShell devido ao número de pacotes.
PRINTING | Define métodos JShell que redirecionam para os métodos print, println e printf em PrintStream.
TOOLING | Define métodos JShell que acessam ferramentas JDK como `javac`, `javadoc` e `javap` usando sua interface de linha de comando.

Tópicos

* [Scripts de Inicialização](<#/doc/guides/jshell/scripts>)

* [Criando e Carregando Scripts](<#/doc/guides/jshell/scripts>)

* [Acessando Ferramentas de Linha de Comando Através do JShell](<#/doc/guides/jshell/scripts>)

### Scripts de Inicialização

Scripts de inicialização contêm snippets e comandos que são carregados quando uma sessão JShell é iniciada. O script de inicialização padrão contém declarações de importação comuns. Você pode criar scripts personalizados conforme necessário.

Scripts de inicialização são carregados toda vez que a ferramenta `jshell` é reiniciada. A reinicialização ocorre durante a inicialização inicial e com os comandos `/reset`, `/reload` e `/env`. Se você não definir o script, então, o script de inicialização padrão, `DEFAULT`, é usado. Este script padrão define declarações de importação comumente necessárias.

Nota:

A linguagem Java define que o pacote `java.lang` é importado automaticamente, então este pacote não precisa ser explicitamente importado.

Para definir o script de inicialização, use o comando `/set start`:
```
    jshell> /set start mystartup.jsh

    jshell> /reset
    |  Resetting state.
```

Assim como em todos os comandos `/set`, a duração da configuração é a sessão atual, a menos que a opção `-retain` seja usada. Tipicamente, a opção `-retain` não é usada quando você testa uma configuração de script de inicialização. Quando a configuração desejada é encontrada, use a opção `-retain` para preservá-la:
```
    jshell> /set start -retain
```

O script de inicialização é então carregado na próxima vez que você iniciar a ferramenta `jshell`.

Lembre-se de que os scripts de inicialização são carregados na sessão atual apenas quando o estado é reiniciado. O conteúdo do script é armazenado, não uma referência ao script. O script é lido apenas no momento em que o comando `/set start` é executado. No entanto, scripts predefinidos são carregados por referência e podem ser atualizados com novas versões do JDK.

Scripts de inicialização também podem ser especificados com a flag de linha de comando `--startup`:
```
    % jshell --startup mystartup.jsh
```

Para experimentação, é útil ter métodos de impressão que não precisam do prefixo `System.out.`. Use o script predefinido `PRINTING` para acessar os métodos print, println e printf. Você pode especificar mais de um script de inicialização com `/set start`. O exemplo a seguir define a inicialização para carregar tanto as importações padrão quanto as definições de impressão:
```
    jshell> /set start -retain DEFAULT PRINTING

    jshell> /exit
    |  Goodbye

    % jshell
    |  Welcome to JShell -- Version 9
    |  For an introduction type: /help intro

    jshell> println("Hello World!")
    Hello World!
```

A flag `-retain` é usada para definir esses scripts predefinidos como os scripts de inicialização para futuras sessões da ferramenta `jshell`. Use `/set start` sem argumentos para ver os detalhes do que é definido por esses scripts de inicialização.

Para definir mais de um script de inicialização na linha de comando, use a flag `--startup` para cada script:
```
    % jshell --startup DEFAULT --startup PRINTING
```

### Criando e Carregando Scripts

Use scripts para configurar sua sessão JShell com declarações de importação e código que você deseja ter disponível durante a sessão.

Criando Scripts

Um script pode ser criado externamente em um editor, ou gerado a partir de itens inseridos no JShell. Use um dos seguintes comandos para criar um script a partir das entradas em uma sessão JShell:
```
    jshell> /save mysnippets.jsh

    jshell> /save -history myhistory.jsh

    jshell> /save -start mystartup.jsh
```

O primeiro comando mostrado no exemplo salva os snippets ativos atuais em `mysnippets.jsh`. O segundo comando mostrado salva o histórico de todos os snippets e comandos, tanto válidos quanto inválidos, em `myhistory.jsh`. O último comando mostrado salva o conteúdo da configuração atual do script de inicialização em `mystartup.jsh`. O nome de arquivo fornecido pode ser qualquer caminho e nome de arquivo válido.

Carregando Scripts

Scripts podem ser carregados da linha de comando quando uma sessão JShell é iniciada:
```
    % jshell mysnippets.jsh
```

Scripts também podem ser carregados dentro de uma sessão JShell usando o comando `/open`:
```
    jshell> /open PRINTING
```

### Acessando Ferramentas de Linha de Comando Através do JShell

O script predefinido `TOOLING` fornece acesso direto às ferramentas de linha de comando do JDK, como `javac`, `javadoc` e `javap`, dentro da ferramenta `jshell`. Carregue o script `TOOLING` quando a ferramenta `jshell` iniciar executando o seguinte comando:
```
    jshell TOOLING
```

Alternativamente, carregue-o dentro de uma sessão JShell com o seguinte comando:
```
    jshell> /open TOOLING
```

Uma vez que você tenha carregado o script `TOOLING`, você pode executar serviços de ferramentas observáveis que implementaram a interface `java.util.spi.ToolProvider` passando um nome e um array de argumentos para o método `run(String, String...)`. Chame `tools()` para imprimir uma lista ordenada de nomes para todas as ferramentas executáveis. Por exemplo:
```
    jshell> /open TOOLING

    jshell> tools()
    jar
    javac
    javadoc
    javap
    jdeps
    jlink
    jmod
    jpackage

    jshell> run("javac","--version")
    javac 25

```

Para ferramentas JDK bem conhecidas, o script `TOOLING` define métodos de conveniência como `javac(String... args) { run("javac", args); }`. Isso encurta a última chamada do exemplo anterior para o seguinte:
```
    jshell> javac("--version")
    javac 25

```

Além disso, o script `TOOLING` define um método `javap` que aceita um literal `class`. Com este método, você pode desmontar e imprimir uma visão geral de um tipo existente ou recém-criado sem sair da sessão JShell. Por exemplo:
```
    jshell> interface Empty {}
    |  created interface Empty

    jshell> javap(Empty.class)
    Classfile /C:/tmp/TOOLING-13600306095244067647.class
      Last modified Oct 4, 2023; size 191 bytes
      SHA-256 checksum 1e53e9d7d4549a00361937701d3b0a613b520a68854310796db7879efc08d195
      Compiled from "$JShell$22.java"
    public interface REPL.$JShell$22$Empty
      minor version: 0
      major version: 65
      flags: (0x0601) ACC_PUBLIC, ACC_INTERFACE, ACC_ABSTRACT
      this_class: #1                          // REPL/$JShell$22$Empty
      super_class: #3                         // java/lang/Object
      interfaces: 0, fields: 0, methods: 0, attributes: 3
    Constant pool:
       #1 = Class              #2             // REPL/$JShell$22$Empty
       #2 = Utf8               REPL/$JShell$22$Empty
       #3 = Class              #4             // java/lang/Object
       #4 = Utf8               java/lang/Object
       #5 = Utf8               SourceFile
       #6 = Utf8               $JShell$22.java
       #7 = Utf8               NestHost
       #8 = Class              #9             // REPL/$JShell$22
       #9 = Utf8               REPL/$JShell$22
      #10 = Utf8               InnerClasses
      #11 = Utf8               Empty
    {
    }
    SourceFile: "$JShell$22.java"
    NestHost: class REPL/$JShell$22
    InnerClasses:
      public static #11= #1 of #8;            // Empty=class REPL/$JShell$22$Empty of class REPL/$JShell$22

```

O script JShell a seguir cria um módulo chamado `com.greetings` que imprime `Greetings!`. Ele cria um JAR modular que contém o módulo `com.greetings`, então imprime sua declaração de módulo. Posteriormente, o script cria uma imagem de tempo de execução com a ferramenta `jlink` que contém o módulo `com.greetings`.

Este exemplo é baseado no exemplo descrito em [Project Jigsaw: Module System Quick-Start Guide](<https://openjdk.org/projects/jigsaw/quick-start>).
```
    /open PRINTING

    print(
        """
        -----------------------------------------------
        Project Jigsaw: Module System Quick-Start Guide
        -----------------------------------------------
        """)

    /* Create a module named com.greetings that prints "Greetings!". */

    Files.createDirectories(Path.of("src/com.greetings/com/greetings"))

    /* Create a module declaration named module-info.java */

    Files.writeString(Path.of("src/com.greetings/module-info.java"),
        """
        module com.greetings {}
        """)

    /* Create the main class */

    Files.writeString(Path.of("src/com.greetings/com/greetings/Main.java"),
        """
        package com.greetings;
        public class Main {
            public static void main(String[] args) {
                System.out.println("Greetings!");
            }
        }
        """)

    /open TOOLING

    /* Compile the source code to the directory to the directory mods/com.greetings */

    javac("-d", "mods", "--module", "com.greetings", "--module-source-path", "src")

    /* Create a modular JAR that contains the module greetings.com. */

    jar("--create", "--file=mlib/com.greetings.jar", "--main-class=com.greetings.Main", "-C", "mods/com.greetings", ".")

    /* Print the module declaration of the modular JAR com.greetings */

    jar("--describe-module", "--file=mlib/com.greetings.jar")

    /* Create a runtime image in the folder greetingsruntime that contains the module com.greetings. /*

    jlink("--module-path", "mlib", "--add-modules", "com.greetings", "--output", "greetingsruntime", "--launcher", "greet=com.greetings")

    /* You can run com.greetings.Main with this runtime as follows:
     *
     * greetingsruntime/bin/java --module com.greetings
     */

    /exit
```