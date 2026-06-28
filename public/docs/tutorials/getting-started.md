# Começando com Java

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Começando com Java

# Começando com Java

## Elementos de uma Aplicação Java

Se você está realmente, realmente impaciente para executar seu primeiro código Java, então você pode simplesmente experimentar o Java Playground disponível neste site. Você pode testar quase qualquer trecho de código nele. Por exemplo, você pode imprimir `Hello World!`, que é, claro, a primeira coisa que você quer tentar. Você não precisa instalar nada, basta digitar algum código Java, clicar em executar, e pronto! Você pode tentar mais dessas declarações abaixo.

Eu entendo que você está ansioso para digitar algum código em seu editor e executá-lo para ver sua primeira aplicação Java em ação! Não se preocupe, sua expectativa será atendida até o final deste tutorial. Mas antes de prosseguirmos, gostaria de abordar vários elementos que você precisa conhecer para entender completamente o que está fazendo.

Mesmo que você esteja familiarizado com alguma outra linguagem de programação, saiba sobre compilação, saiba o que é um arquivo executável, você pode se interessar pelo seguinte, pois Java funciona de uma maneira que difere de C ou C++.

## O Ciclo de Compilação e Execução em Java

Existem várias etapas que você precisa seguir para criar uma aplicação Java. Este tutorial mostra como criar um programa Java muito simples. Se você precisar criar uma aplicação corporativa, o processo de criação é mais complexo, mas em sua essência você encontrará estas etapas simples.

A primeira dessas etapas é escrever algum código Java em um editor de texto.

Então este código precisa ser transformado em outro formato, que pode ser executado pelo seu computador. Esta transformação é conduzida por uma peça de software especial chamada um _compilador_. Algumas linguagens não possuem um compilador; Java possui. Cada compilador é específico para uma linguagem.

O arquivo produzido por um compilador é frequentemente chamado de arquivo binário ou arquivo executável. Enquanto você pode ler um código-fonte e entendê-lo, arquivos binários ou executáveis não são feitos para serem lidos por uma pessoa humana. Apenas seu computador pode entendê-lo.

Este código Java compilado contém códigos binários especiais chamados _bytecode_. Este é um termo técnico que você pode encontrar. A descrição precisa do que é este _bytecode_ está além do escopo deste tutorial.

Compilar algum código pode falhar; seu código precisa estar correto para que o compilador produza uma versão executável dele. Não se preocupe, esta página fornece o código que você irá compilar. Tudo o que você precisa fazer é copiá-lo e colá-lo em seu editor de texto.

Uma vez que o compilador produziu o arquivo binário que você precisa, você pode executar este arquivo binário. Executar este arquivo binário executa seu programa.

> Estas duas etapas: compilação e execução, requerem duas peças de software específicas que fazem parte do Java Development Kit, também conhecido como JDK. Você verá como baixar o JDK gratuitamente e como instalá-lo mais adiante neste tutorial.

Observe que, a partir do Java SE 11, você também pode mesclar essas duas etapas em uma, executando um arquivo `.java` diretamente. A partir do Java SE 22, seu programa pode até ser distribuído entre vários arquivos.

## Criando um Primeiro Programa Java

O primeiro passo que você precisa saber é que o código Java que você está escrevendo é salvo em arquivos de texto simples. Neste tutorial, sua aplicação será escrita em um único arquivo de texto. Aplicações maiores podem exigir milhares de tais arquivos.

Então, o primeiro passo consiste em criar um arquivo e dar um nome a ele. A seguir, assumiremos que este nome é `MyFirstJavaApp.java`, mas você pode dar a ele qualquer nome, desde que mantenha a extensão `.java`.

Existem também restrições quanto ao primeiro caractere deste arquivo. Para simplificar, você pode usar apenas uma letra como primeiro caractere. Existe uma convenção em Java: o nome de um arquivo Java deve começar com uma letra maiúscula. Isso não é obrigatório, mas todos os desenvolvedores Java seguem esta convenção. Quando você se tornar um desenvolvedor Java experiente, ver uma classe que não segue esta convenção parecerá estranho para você.

Você pode agora abrir este arquivo em um editor de texto. Apenas um aviso: você deve usar um editor de texto simples para criar e salvar este arquivo. Usar um processador de texto não funcionará.

Depois de abrir o arquivo `MyFirstJavaApp.java`, você pode simplesmente copiar e colar o seguinte código nele.

Como você deve saber, existe uma longa tradição na ciência da computação, que é escrever um programa que imprime "Hello, World!" no console de sua aplicação. Então, vamos fazer isso!

## Preparando a Execução do Seu Primeiro Programa

A compilação e a execução de programas simples são apenas uma única etapa que segue a criação do seu primeiro programa.

Até agora, a única ferramenta que você tem usado é um editor de texto simples. Executar este programa requer outra ferramenta; algo que você pode não ter em seu computador. Felizmente, você pode baixar este compilador e usá-lo gratuitamente. Deixe-me guiá-lo através deste processo.

Atualmente, baixar "Java" significa baixar o Java Development Kit, também conhecido como JDK. O JDK contém muitas ferramentas e entre elas estão as que você usará para compilar e executar uma aplicação Java. Ele é distribuído oficialmente pelo projeto OpenJDK e pela Oracle.

Você pode ter ouvido falar de outros elementos, também chamados de "Java".

O JRE significa Java Runtime Environment. É um subconjunto do JDK que não é mais distribuído pelo OpenJDK ou Oracle. Ele continha apenas as ferramentas necessárias para executar uma aplicação Java. Você não pode compilar seu código com as ferramentas fornecidas no JRE.

Você também pode ter ouvido falar de J2EE, Java EE ou Jakarta EE. Todos esses acrônimos se referem ao Java Enterprise Edition. É um conjunto de ferramentas e bibliotecas para criar aplicações de nível empresarial. Java EE é diferente do JDK e está fora do escopo deste tutorial. Você não precisa do Java EE para compilar e executar a aplicação simples que estamos criando neste tutorial.

## Configurando um Java Development Kit

Você pode baixar o JDK de diferentes lugares. Existe uma página central que sempre se refere à versão mais recente do JDK: <https://jdk.java.net/>. Selecionar a versão mais recente do JDK "Pronto para uso" leva você a uma página onde você pode baixar a versão do JDK que precisa.

Nesta página você pode baixar cinco versões:

  * Linux/AArch64
  * Linux/x64
  * macOS/x64
  * macOS/AArch64
  * Windows/x64

Esta página fornece builds de código aberto prontos para produção do Java Development Kit, uma implementação da Plataforma Java SE sob a Licença Pública Geral GNU, versão 2, com a Exceção de Classpath.

### Configurando um JDK para Windows/x64

Vamos baixar a versão para Windows. O que você obtém é um arquivo ZIP de cerca de 200MB que você pode abrir com qualquer software utilitário de ZIP. Este arquivo ZIP contém o JDK. Você pode descompactar o conteúdo deste arquivo em qualquer lugar do seu computador.

Feito isso, você precisa criar uma variável de ambiente chamada `JAVA_HOME` que aponte para o diretório onde você descompactou o JDK. Primeiro, você precisa abrir um prompt do DOS. Se você descompactou um arquivo ZIP do JDK 26 no diretório `D:\jdk\`, então o comando que você precisa digitar neste prompt do DOS é o seguinte:

```bash
> set JAVA_HOME=D:\jdk\jdk-26
```

Observe que, neste exemplo e em todos os outros, o `>` inicial está lá para mostrar que você precisa digitar este comando ou colá-lo em um prompt. Você não deve digitar este caractere ou colá-lo, pois ele não faz parte do comando `set`.

Você pode verificar se a variável `JAVA_HOME` foi configurada corretamente digitando o seguinte código:

```bash
> echo %JAVA_HOME%
```

Este comando deve imprimir o seguinte:

```bash
D:\jdk\jdk-26
```

Você então precisa atualizar sua variável de ambiente `PATH` para adicionar o diretório `bin` do seu diretório JDK a ela. Isso pode ser feito com o seguinte comando:

```bash
> set PATH=%PATH%;%JAVA_HOME%\bin
```

Você precisa ser muito cauteloso ao configurar essas duas variáveis, pois um único erro, como um espaço em branco adicionado ou um ponto e vírgula ausente, resultará em falha.

Não feche este prompt de comando. Se você fechá-lo e abri-lo novamente, precisará criar essas duas variáveis novamente.

### Configurando um JDK para Linux/x64

Vamos baixar a versão para Linux. O que você obtém é um arquivo compactado com a extensão `.tar.gz` que você precisa expandir.

Para expandi-lo, você precisa copiá-lo ou movê-lo para o diretório correto. Você pode então digitar o seguinte comando:

```bash
$ tar -xvf *.tar.gz
```

Observe que, neste exemplo e em todos os outros, o `$` inicial está lá para mostrar que você precisa digitar este comando ou colá-lo em um prompt. Você não deve digitar este caractere ou colá-lo, pois ele não faz parte do comando `tar`.

Este comando expande todos os arquivos com a extensão `.tar.gz` que você tem no diretório atual. Você pode usar o nome exato deste arquivo se precisar apenas expandi-lo.

A execução deste comando pode levar vários segundos ou mais, dependendo do seu sistema. Ele cria um novo diretório no diretório atual com o conteúdo do JDK dentro.

Feito isso, você precisa criar uma variável de ambiente chamada `JAVA_HOME` que aponte para o diretório onde você expandiu o JDK. Se você expandiu um arquivo compactado do JDK 26 no diretório `/home/javauser/jdk`, então o comando que você precisa digitar neste prompt de shell é o seguinte:

```bash
$ export JAVA_HOME=/home/javauser/jdk/jdk-26
```

O diretório exato depende do arquivo de distribuição que você expandiu.

Você pode verificar se a variável `JAVA_HOME` foi configurada corretamente digitando o seguinte código:

```bash
$ echo $JAVA_HOME
```

Este comando deve imprimir o seguinte:

```bash
/home/javauser/jdk/jdk-26
```

Então você precisa atualizar sua variável `PATH` para adicionar o diretório `bin` do seu diretório JDK a ela. Isso pode ser feito com o seguinte comando:

```bash
$ export PATH=$PATH:$JAVA_HOME/bin
```

Você precisa ser muito cauteloso ao configurar essas duas variáveis, pois um único erro, como um espaço em branco adicionado ou um ponto e vírgula ausente, resultará em falha.

Não feche este prompt de shell. Se você fechá-lo e abri-lo novamente, precisará criar essas duas variáveis novamente.

Você pode verificar se está tudo ok digitando o seguinte comando:

```bash
$ which java
```

Seu shell deve imprimir o caminho completo para o arquivo executável `java` no diretório `bin` da distribuição que você acabou de expandir. Neste exemplo, ele imprimirá:

```bash
/home/javauser/jdk/jdk-26/bin/java
```

### Configurando um JDK para macOS

Vamos baixar a versão para macOS. O que você obtém é um arquivo compactado com a extensão `.tar.gz` que você precisa expandir.

Para expandi-lo, você precisa copiá-lo ou movê-lo para o diretório correto. Você pode então digitar o seguinte comando:

```bash
$ tar -xvf *.tar.gz
```

Observe que, neste exemplo e em todos os outros, o `$` inicial está lá para mostrar que você precisa digitar este comando ou colá-lo em um prompt. Você não deve digitar este caractere ou colá-lo, pois ele não faz parte do comando `tar`.

Este comando expande todos os arquivos com a extensão `.tar.gz` que você tem no diretório atual. Você pode usar o nome exato deste arquivo se precisar apenas expandi-lo.

A execução deste comando pode levar vários segundos ou mais, dependendo do seu sistema. Ele cria um novo diretório no diretório atual com o conteúdo do JDK dentro. Este diretório tem a extensão `.jdk`.

Feito isso, você precisa criar uma variável de ambiente chamada `JAVA_HOME` que aponte para o diretório onde você expandiu o JDK. Se você expandiu um arquivo compactado do JDK 26 no diretório `/Users/javauser/jdk`, então o comando que você precisa digitar neste prompt de shell é o seguinte:

```bash
$ export JAVA_HOME=/Users/javauser/jdk/jdk-26.jdk/Contents/Home
```

O diretório exato depende do arquivo de distribuição que você expandiu.

Você pode verificar se a variável `JAVA_HOME` foi configurada corretamente digitando o seguinte código:

```bash
$ echo $JAVA_HOME
```

Este comando deve imprimir o seguinte:

```bash
/Users/javauser/jdk/jdk-26.jdk/Contents/Home
```

Você então precisa atualizar sua variável `PATH` para adicionar o diretório `bin` do seu diretório JDK a ela. Isso pode ser feito com o seguinte comando:

```bash
$ export PATH=$PATH:$JAVA_HOME/bin
```

Você precisa ser muito cauteloso ao configurar essas duas variáveis, pois um único erro, como um espaço em branco adicionado ou um ponto e vírgula ausente, resultará em falha.

Não feche este prompt de shell. Se você fechá-lo e abri-lo novamente, precisará criar essas duas variáveis novamente.

Você pode verificar se está tudo ok digitando o seguinte comando:

```bash
$ which java
```

Seu shell deve imprimir o caminho completo para o arquivo executável `java` no diretório `bin` da distribuição que você acabou de expandir. Neste exemplo, ele imprimirá:

```bash
/Users/javauser/jdk/jdk-26.jdk/Contents/Home/bin/java
```

## Compilando e Executando Seu Primeiro Programa Java

Uma vez que você tenha configurado corretamente seu JDK, a variável `JAVA_HOME` e a variável `PATH`, você estará pronto para executar seu primeiro programa.

Todos os comandos que você digitará agora devem ser digitados no mesmo prompt que você usou para configurar essas duas variáveis.

Seja você seguiu o caminho do Windows, do Linux ou do macOS, o restante é o mesmo.

  1. Mude para o diretório onde você salvou sua primeira classe `MyFirstJavaApp.java`. Você pode verificar se está no diretório correto digitando `dir`. Ele mostrará os arquivos que você tem neste diretório. Você deve ver seu arquivo `MyFirstJavaApp.java`.
  2. Verifique se o Java está acessível a partir deste diretório digitando o seguinte. Este comando é o mesmo, esteja você no Windows ou Linux.

```bash
> java -version
```

Ele deve informar qual versão do Java você está usando atualmente. Se ele apresentar uma mensagem de erro, então você precisa verificar suas variáveis `JAVA_HOME` e `PATH`, pois provavelmente há algo errado com elas.

  3. Agora você está pronto para executar seu primeiro programa. Você pode digitar o seguinte.

```bash
> javac MyFirstJavaApp.java
> java MyFirstJavaApp
```

Duas coisas podem acontecer neste ponto. Você pode receber mensagens de erro informando que o compilador não pode compilar seu código devido a erros em seu código Java. Você precisará corrigi-los antes de ver qualquer execução.

Se o compilador permanecer em silêncio e não reclamar de nada e imprimir `Hello World!` : parabéns! Isso significa que seu programa Java foi compilado e executado corretamente.

## Tornando Seu Programa Interativo

Vamos levar seu programa para o próximo nível e pedir o nome do usuário. Basta copiar e colar o seguinte em seu arquivo `MyFirstJavaApp.java`.

```java
import java.util.Scanner;

public class MyFirstJavaApp {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("What is your name?");
        String name = scanner.nextLine();
        System.out.println("Hello " + name + "!");
        scanner.close();
    }
}
```

Você pode executá-lo da mesma forma que anteriormente.

Ele deve perguntar seu nome e então imprimir o seguinte.

```bash
What is your name?
John Doe
Hello John Doe!
```

Parabéns, você está agora pronto para aplicações complexas!

## Problemas Comuns e Suas Soluções

### Problemas do Compilador

#### Mensagens de Erro Comuns em Sistemas Microsoft Windows

Se você receber este erro, o Windows não consegue encontrar o compilador [`javac`](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/javac.html>).

Aqui está uma maneira de dizer ao Windows onde encontrar `javac`. Suponha que você instalou o JDK em `C:\jdk26`. No prompt, você digitaria o seguinte comando e pressionaria Enter:

```bash
C:\jdk26\bin\javac HelloWorldApp.java
```

Se você escolher esta opção, terá que preceder seus comandos `javac` e `java` com `C:\jdk26\bin\` toda vez que compilar ou executar um programa. Para evitar essa digitação extra, você pode adicionar esta informação à sua variável `PATH`. Você pode consultar a seção [Configurando um Java Development Kit](<#/doc/tutorials/getting-started>) nesta página para mais informações.

Se você receber este erro, esqueceu de incluir o sufixo `.java` ao compilar o programa. Lembre-se, o comando é `javac HelloWorldApp.java` e não `javac HelloWorldApp`.

#### Mensagens de Erro Comuns em Sistemas UNIX

Se você receber este erro, o UNIX não consegue encontrar o compilador, [`javac`](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/javac.html>).

Aqui está uma maneira de dizer ao UNIX onde encontrar javac. Suponha que você instalou o JDK em `/usr/local/jdk26`. No prompt, você digitaria o seguinte comando e pressionaria Return:

```bash
/usr/local/jdk26/javac HelloWorldApp.java
```

Nota: Se você escolher esta opção, toda vez que compilar ou executar um programa, terá que preceder seus comandos `javac` e `java` com `/usr/local/jdk26/`. Para evitar essa digitação extra, você pode adicionar esta informação à sua variável `PATH`. Você pode consultar a seção [Configurando um Java Development Kit](<#/doc/tutorials/getting-started>) nesta página para mais informações.

Se você receber este erro, esqueceu de incluir o sufixo `.java` ao compilar o programa. Lembre-se, o comando é `javac HelloWorldApp.java` e não `javac HelloWorldApp`.

#### Erros de Sintaxe (Todas as Plataformas)

Se você digitar incorretamente parte de um programa, o compilador pode emitir um erro de sintaxe. A mensagem geralmente exibe o tipo do erro, o número da linha onde o erro foi detectado, o código nessa linha e a posição do erro dentro do código. Aqui está um erro causado pela omissão de um ponto e vírgula (`;`) no final de uma declaração:

```java
public class HelloWorldApp {
    public static void main(String[] args) {
        System.out.println("Hello World!")
    }
}
```

Se você vir quaisquer erros do compilador, então seu programa não compilou com sucesso, e o compilador não criou um arquivo `.class`. Verifique cuidadosamente o programa, corrija quaisquer erros que você detectar e tente novamente.

#### Erros Semânticos

Além de verificar se seu programa está sintaticamente correto, o compilador verifica outras corretudes básicas. Por exemplo, o compilador avisa você toda vez que você usa uma variável que não foi inicializada:

```java
public class HelloWorldApp {
    public static void main(String[] args) {
        int foo;
        System.out.println(foo);
    }
}
```

Novamente, seu programa não compilou com sucesso, e o compilador não criou um arquivo `.class`. Corrija o erro e tente novamente.

### Problemas de Tempo de Execução

#### Mensagens de Erro em Sistemas Microsoft Windows

Se você receber este erro, `java` não consegue encontrar seu arquivo bytecode, `HelloWorldApp.class`.

Um dos lugares onde `java` tenta encontrar seu arquivo `.class` é seu diretório atual. Então, se seu arquivo `.class` estiver em `C:\java`, você deve mudar seu diretório atual para lá. Para mudar seu diretório, digite o seguinte comando no prompt e pressione Enter:

```bash
C:\> cd java
```

O prompt deve mudar para `C:\java>`. Se você digitar `dir` no prompt, você deve ver seus arquivos `.java` e `.class`. Agora digite `java HelloWorldApp` novamente.

Se você ainda tiver problemas, pode ser necessário alterar sua variável `CLASSPATH`. Para ver se isso é necessário, tente sobrescrever o classpath com o seguinte comando.

```bash
C:\java> set CLASSPATH=
```

Agora digite `java HelloWorldApp` novamente. Se o programa funcionar agora, você terá que alterar sua variável `CLASSPATH`. Para definir esta variável, consulte a seção _Atualizando a variável PATH_ nas instruções de instalação do JDK. A variável `CLASSPATH` é definida da mesma maneira.

Um erro comum cometido por programadores iniciantes é tentar executar o launcher `java` no arquivo `.class` que foi criado pelo compilador. Por exemplo, você receberá este erro se tentar executar seu programa com `java HelloWorldApp.class` em vez de `java HelloWorldApp`. Lembre-se, o argumento é o nome da classe que você deseja usar, não o nome do arquivo.

A JVM Java exige que a classe que você executa com ela tenha um método `main` para iniciar a execução de sua aplicação. Uma Análise Mais Detalhada da seção [Tornando Seu Programa Interativo](<#/doc/tutorials/getting-started>) discute o método main em detalhes.

#### Mensagens de Erro em Sistemas UNIX

Se você receber este erro, `java` não consegue encontrar seu arquivo bytecode, `HelloWorldApp.class`.

Um dos lugares onde java tenta encontrar seu arquivo bytecode é seu diretório atual. Então, por exemplo, se seu arquivo bytecode estiver em `/home/jdoe/java`, você deve mudar seu diretório atual para lá. Para mudar seu diretório, digite o seguinte comando no prompt e pressione Return:

```bash
% cd /home/jdoe/java
```

Se você digitar `pwd` no prompt, você deve ver `/home/jdoe/java`. Se você digitar `ls` no prompt, você deve ver seus arquivos `.java` e `.class`. Agora digite `java HelloWorldApp` novamente.

Se você ainda tiver problemas, pode ser necessário alterar sua variável de ambiente `CLASSPATH`. Para ver se isso é necessário, tente sobrescrever o classpath com o seguinte comando.

```bash
% unset CLASSPATH
```

Agora digite `java HelloWorldApp` novamente. Se o programa funcionar agora, você terá que alterar sua variável `CLASSPATH` da mesma maneira que a variável `PATH` acima.

Um erro comum cometido por programadores iniciantes é tentar executar o launcher java no arquivo `.class` que foi criado pelo compilador. Por exemplo, você receberá este erro se tentar executar seu programa com `java HelloWorldApp.class` em vez de `java HelloWorldApp`. Lembre-se, o argumento é o nome da classe que você deseja usar, não o nome do arquivo.

A JVM Java exige que a classe que você executa com ela tenha um método main para iniciar a execução de sua aplicação. Uma Análise Mais Detalhada da seção [Tornando Seu Programa Interativo](<#/doc/tutorials/getting-started>) discute o método main em detalhes.
## Indo Além

Este primeiro programa Java mostrou os passos básicos que todo desenvolvedor Java segue para executar uma aplicação.

  1. Crie um código-fonte em um conjunto de arquivos de texto `.java`
  2. Compile esses arquivos para produzir um conjunto de arquivos binários `.class` correspondentes
  3. Execute-os juntos como uma aplicação.

Desenvolvedores que trabalham em grandes aplicações não usam editores de texto simples para gerenciar seu código-fonte; eles usam Ambientes de Desenvolvimento Integrados. IDEs são aplicações de software complexas, especializadas em desenvolvimento de software. Essas aplicações lidam com a compilação do seu código-fonte automaticamente, podem ajudar a rastrear erros na sintaxe do seu código Java e a identificar bugs em sua execução, entre outras coisas.

Algumas dessas ferramentas são de código aberto e gratuitas para usar.

  * [`a fundação Eclipse mantém o Eclipse`](<https://www.eclipseide.org/>),
  * [`a fundação Apache mantém o NetBeans`](<https://netbeans.apache.org/>),
  * A JetBrains publica o [`IntelliJ IDEA Community Edition`](<https://www.jetbrains.com/idea/>) que é gratuito para uso em desenvolvimento pessoal e comercial.

## Mais Aprendizado

### Neste tutorial

Elementos de uma Aplicação Java O Ciclo de Compilação e Execução em Java Criando um Primeiro Programa Java Preparando a Execução do Seu Primeiro Programa Configurando um Java Development Kit Compilando e Executando Seu Primeiro Programa Tornando Seu Programa Interativo Problemas Comuns e Suas Soluções Indo Além Mais Aprendizado

Última atualização: 26 de março de 2024

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Começando com Java

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)