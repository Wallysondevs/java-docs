# Construindo uma aplicação Java no IntelliJ IDEA

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Construindo uma aplicação Java no IntelliJ IDEA

# Construindo uma aplicação Java no IntelliJ IDEA

Esta página foi contribuída por [Marit van Dijk](</author/MaritvanDijk>) sob a [UPL](<https://oss.oracle.com/licenses/upl/>)

## Visão Geral

Uma IDE (Integrated Development Environment) permite criar aplicações rapidamente, combinando um editor de código-fonte com a capacidade de compilar e executar seu código, além de integração com ferramentas de construção, teste e depuração, sistemas de controle de versão, e assim por diante. Finalmente, uma IDE permitirá que você pesquise e navegue em sua base de código de maneiras que seu sistema de arquivos não permitiria.

Um dos [ambientes de desenvolvimento integrado (IDEs) mais amplamente utilizados](<https://www.jetbrains.com/lp/devecosystem-2023/java/#java_ide>) para Java é o IntelliJ IDEA. Sua interface amigável, rico conjunto de recursos e vasto ecossistema o tornam um ambiente ideal para iniciantes aprenderem e crescerem como desenvolvedores. Neste tutorial, você aprenderá como usar alguns de seus recursos para simplificar seu processo de desenvolvimento e acelerar sua curva de aprendizado com a programação Java.

## Instalando o IntelliJ IDEA

Para instalar o IntelliJ IDEA, faça o download no [site do IntelliJ IDEA](<https://www.jetbrains.com/idea/>) e siga as instruções.

Ao instalar o IntelliJ IDEA pela primeira vez, ele virá com uma avaliação gratuita de 30 dias da assinatura Ultimate. Esta assinatura oferece recursos avançados para desenvolvimento profissional, mas estes não são necessários para este tutorial. Assim que o período de avaliação da assinatura terminar, o IntelliJ IDEA permanecerá totalmente funcional com todos os recursos básicos para desenvolvimento Java disponíveis.

Para mais informações sobre como instalar o IntelliJ IDEA em seu sistema operacional, consulte [a documentação](<https://www.jetbrains.com/help/idea/installation-guide.html#standalone>).

Ao iniciar o IntelliJ IDEA pela primeira vez, você verá a tela de **Boas-vindas**. A partir daqui, você pode criar um novo projeto, abrir um projeto existente ou obter um projeto de um sistema de controle de versão (como o GitHub).

[](<https://dev.java/assets/images/intellij-idea/welcome-screen.png>)

Para começar a trabalhar com Java, você precisará instalar um JDK. Você pode fazer isso por conta própria, conforme descrito em [Começando com Java](<https://dev.java/learn/getting-started/#setting-up-jdk>), ou pode fazê-lo no IntelliJ IDEA ao criar um novo projeto, sem precisar sair da sua IDE e de outras ferramentas (como seu navegador, sistema de arquivos, etc.) para baixar e configurar um JDK.

## Criando um novo projeto

Você pode criar um novo projeto a partir da tela de **Boas-vindas**, ou pode ir em **File | New | Project** no menu principal.

[](<https://dev.java/assets/images/intellij-idea/new-project-menu.png>)

No assistente **New Project**, certifique-se de que **Java** esteja selecionado no lado esquerdo e dê um nome ao seu projeto (por exemplo, `java-demo`). Em seguida, selecionaremos um **Build system**. O IntelliJ IDEA suporta tanto Maven quanto Gradle; os sistemas de build mais usados para Java. Uma ferramenta de build, como Maven ou Gradle, ajuda você a construir seu projeto e gerenciar quaisquer dependências (como bibliotecas adicionais) que você queira usar em seu código Java. Usar uma ferramenta de build também facilitará o compartilhamento de sua aplicação e a construção dela em uma máquina diferente. Se você não quiser usar nenhum dos dois, pode usar o sistema de build do IntelliJ. Neste tutorial, vamos criar um projeto Maven.

[](<https://dev.java/assets/images/intellij-idea/new-project.png>)

Para desenvolver uma aplicação Java, você precisará de um JDK. Se o JDK necessário já estiver definido no IntelliJ IDEA, selecione-o na lista **JDK**. Este tutorial usará Java 25.

Se o JDK estiver instalado em seu computador, mas não definido na IDE, selecione a opção **Add JDK** na lista e especifique o caminho para o diretório home do JDK (por exemplo, `/Library/Java/JavaVirtualMachines/openjdk-25.0.2.jdk`).

Se você não tiver o JDK necessário em seu computador, selecione **Download JDK**. No pop-up **Download JDK**, especifique o fornecedor do JDK (por exemplo, Oracle OpenJDK) e a versão, altere o caminho de instalação se necessário e clique em **Download**.

[](<https://dev.java/assets/images/intellij-idea/download-jdk-popup.png>)

Se você selecionar **Add sample code**, uma classe `Main` que imprime "Hello World" será adicionada ao seu projeto. Deixe-o desmarcado, para que você possa adicionar seu próprio código mais tarde.

Depois de estar satisfeito com sua entrada no pop-up **New Project**, clique em **Create**.

O IntelliJ IDEA criará um projeto para você. Se você selecionou Maven como seu sistema de build, o projeto conterá um `pom.xml` básico e uma estrutura de diretórios padrão para um projeto Maven com a pasta de origem definida. O `pom.xml` é um arquivo que contém informações sobre o projeto e detalhes de configuração usados pelo Maven para construir o projeto. Para mais informações, consulte [a documentação do Maven](<https://maven.apache.org/guides/introduction/introduction-to-the-pom.html>).

[](<https://dev.java/assets/images/intellij-idea/project.png>)

Você pode ver a estrutura do projeto na [janela de ferramentas Project](<https://www.jetbrains.com/help/idea/project-tool-window.html>) à esquerda. A pasta `.idea` contém a configuração do seu projeto. A pasta `src` contém seu código. Ao expandir essa pasta, você verá que o IntelliJ IDEA criou uma pasta `main` para seu código Java e uma pasta `test` para seus testes.

## Escrevendo e editando código

Vamos adicionar algum código. A partir do Java 25, é ainda mais fácil começar a escrever código Java. Você pode criar um arquivo-fonte compacto.

*   Na janela de ferramentas **Project** à esquerda, selecione o diretório `src/main/java`.
*   Para adicionar um novo arquivo-fonte compacto, clique com o botão direito na janela de ferramentas **Project** para abrir o menu de contexto e selecione **New | Java Compact File**.
*   Nomeie este arquivo `HelloWorld`.

[](<https://dev.java/assets/images/intellij-idea/new-java-file.png>)

Nota: Se você estiver usando uma versão do Java anterior à 25, você não terá a opção de criar um arquivo-fonte compacto. Você precisará criar uma classe Java. Selecione **New | Java Class** em vez disso.

* * *

**DICA DA IDE**

Você pode adicionar um novo arquivo Java usando o atalho **⌘N** (no macOS) ou **Alt+Insert** (no Windows/Linux) no diretório desejado na janela de ferramentas **Project**.

* * *

O ponto de entrada para executar um programa Java é o método `main`.

Se você criou um arquivo-fonte compacto, o IntelliJ IDEA terá adicionado este método `main` para você. Ele deve se parecer com isto:

```java
void main() {
}
```

Para manter as coisas simples, vamos fazer o programa imprimir `Hello World!` no console e mover o cursor para uma nova linha, adicionando `IO.println("Hello World!");` ao corpo do método:

```java
void main() {
    IO.println("Hello World!");
}
```

Recomendo que você digite o código em vez de copiar e colar, pois isso o ajudará a se familiarizar mais com a sintaxe.

Ao começar a digitar, você notará que o IntelliJ IDEA oferece [preenchimento de código](<https://www.jetbrains.com/help/idea/auto-completing-code.html>). Ele o ajudará a completar nomes de classes, métodos, campos e palavras-chave, e outros tipos de preenchimento. Use as teclas de seta para selecionar a opção desejada na lista e a tecla **Return** (no macOS) ou **Enter** (no Windows/Linux) para aplicar sua seleção.

À medida que você aprende mais sobre Java, você pode expandir seu código. Por exemplo, converter seu arquivo-fonte compacto em uma classe. O IntelliJ IDEA possui [inspeções](<https://www.jetbrains.com/help/idea/code-inspection.html>) e [correções rápidas](<https://www.jetbrains.com/help/idea/resolving-problems.html>) para ajudá-lo com isso.

Para converter o arquivo-fonte compacto em uma classe, posicione o cursor no método `main` e pressione **Alt+Enter**. Na lista de opções, selecione **Convert into a regular class**. O IntelliJ IDEA converterá o arquivo-fonte compacto em uma classe. Alternativamente, você pode usar o [preenchimento de comando](<https://www.jetbrains.com/help/idea/command-completion.html>) para executar comandos relevantes no editor. Digite dois pontos `..` após o método `main` e selecione a opção **Convert into a regular class**.

[](<https://dev.java/assets/images/intellij-idea/convert-to-class.gif>)

Nota: Se você criou uma classe Java, o IntelliJ IDEA terá criado um arquivo com uma declaração de classe. Você precisará adicionar o método `main` por conta própria. Para imprimir no console, adicione `System.out.println("Hello World!");` ao corpo do método. O programa clássico `HelloWorld` em Java se parece com isto:

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```

O IntelliJ IDEA mostrará se você digitou ou selecionou algo que não compila ou se ele vê outros problemas. Se você pressionar **Alt+Enter**, ele oferecerá opções para corrigir o problema. Você pode usar **F2** para ir para o próximo problema e **Shift+F2** para ir para o problema anterior. O IntelliJ IDEA o ajudará a garantir que sua sintaxe esteja correta e seu código possa ser compilado, oferecendo sugestões sensíveis ao contexto. **Alt+Enter** oferecerá uma lista limitada de sugestões para ajudar a corrigir quaisquer problemas, enquanto o preenchimento de comando (`..`) oferecerá todos os comandos relevantes para o contexto atual.

[](<https://dev.java/assets/images/intellij-idea/alt-enter.png>)

Para acelerar o desenvolvimento, você também pode [gerar código](<https://www.jetbrains.com/help/idea/generating-code.html>). O IntelliJ IDEA pode gerar construtores, getters e setters, métodos `toString()`, `equals()` e `hashCode()`, e muito mais.

[](<https://dev.java/assets/images/intellij-idea/generate-code.png>)

O IntelliJ IDEA gerenciará a formatação do seu código enquanto você o escreve. Se necessário, você pode reformatar explicitamente o código, usando o atalho **⌘⌥L** (no macOS) ou **Ctrl+Alt+L** (no Windows/Linux), ou digitando `..` em uma linha vazia e selecionando **Reformat Code**.

## Executando sua aplicação

Um grande benefício de usar uma IDE é que você pode executar seu código diretamente sem ter que compilá-lo manualmente na linha de comando primeiro.

Se você tiver um arquivo-fonte compacto, pode executar sua aplicação `HelloWorld` diretamente do editor, clicando no botão verde **Run** na medianiz perto da declaração do método `main`, ou usando o atalho **⌃⇧R** (no macOS) ou **Ctrl+Shift+F10** (no Windows/Linux).

Alternativamente, você pode executar sua aplicação usando o botão verde **Run** no canto superior direito ou usando o atalho **⌃R** (no macOS) ou **Ctrl+F10** (no Windows/Linux) para executar o arquivo mais recente.

[](<https://dev.java/assets/images/intellij-idea/run-file.png>)

Se você tiver uma classe, pode executar a aplicação `HelloWorld` clicando no botão verde **Run** na medianiz perto da declaração da classe ou da declaração do método `main`.

[](<https://dev.java/assets/images/intellij-idea/run.png>)

Se você quiser passar argumentos para sua aplicação, pode fazê-lo nas [Run Configurations](<https://www.jetbrains.com/help/idea/run-debug-configuration.html>).

Para editar suas configurações de execução, selecione a configuração no seletor de configuração de execução/depuração, clicando na seta para baixo ao lado da configuração atual ou nos três pontos à direita da configuração de execução, e selecione **Edit Configurations**.

[](<https://dev.java/assets/images/intellij-idea/edit-configurations.png>)

O pop-up **Run/Debug Configurations** aparece, e lá você pode modificar as opções da JVM, adicionar argumentos de programa e muito mais.

[](<https://dev.java/assets/images/intellij-idea/run-config.png>)

## Testando

Testar seu código ajuda a verificar se ele faz o que você espera. Você pode executar sua aplicação e testá-la por conta própria ou adicionar testes automatizados que podem verificar seu código para você. Pensar no que testar e como pode ajudá-lo a dividir um problema em partes menores. Isso o ajudará a obter uma solução melhor mais rapidamente!

Por exemplo, digamos que você tenha uma classe `Calculator` contendo o seguinte método que calcula a média de uma lista de valores, e você quer ter certeza de que a média é calculada corretamente:

```java
public class Calculator {
    public double average(double[] numbers) {
        if (numbers == null || numbers.length == 0) {
            return Double.NaN;
        }
        double sum = 0;
        for (double number : numbers) {
            sum += number;
        }
        return sum / numbers.length;
    }
}
```

O IntelliJ IDEA facilita a adição de testes ao seu código. Você pode navegar para o teste de uma classe específica usando o atalho **⇧⌘T** no macOS ou **Ctrl+Shift+T** no Windows/Linux. Se nenhuma classe de teste existir ainda, o IntelliJ IDEA criará uma para você. Esta classe será criada no diretório `src/test/java`. Você pode selecionar uma **Testing library** no pop-up **Create test**.

[](<https://dev.java/assets/images/intellij-idea/create-test.png>)

O IntelliJ IDEA suporta várias bibliotecas de teste, incluindo [JUnit 5](<https://junit.org/junit5/>), que é a [biblioteca de teste mais usada por desenvolvedores Java](<https://www.jetbrains.com/lp/devecosystem-2023/java/#java_unittesting>). Se o JUnit 5 ainda não fizer parte do seu projeto, o IntelliJ IDEA indicará "JUnit5 library not found in the module." Clique em **Fix** para que o IntelliJ IDEA corrija isso para você. O IntelliJ IDEA suporta os frameworks e bibliotecas mais recentes que os desenvolvedores precisam. Se você quiser usar o JUnit 6, a versão mais recente do JUnit, abra o menu suspenso para **Testing library** e selecione **JUnit 6**.

Se você estiver usando Maven como seu sistema de build, observe que a dependência JUnit `junit-jupiter` é adicionada ao `pom.xml` na seção `<dependencies>`. Para garantir que as dependências funcionem corretamente em seu projeto, **Load Maven Changes** clicando no pop-up no canto superior direito ou usando o atalho **⇧⌘I** (no macOS) ou **Ctrl+Shift+O** (no Windows/Linux).

[](<https://dev.java/assets/images/intellij-idea/junit5-dependencies.png>)

Volte ao arquivo de teste para adicionar testes. O IntelliJ IDEA pode ajudar a gerar um teste. Na classe de teste, use **Generate** (**⌘N** no macOS ou **Alt+Insert** no Windows/Linux) e selecione **Test Method** para adicionar um teste. Dê ao teste um nome que explique o comportamento pretendido e adicione o código de teste relevante.

Por exemplo, vamos garantir que o método `average()` calcule corretamente a média para um array de números positivos e retorne `0` para um array vazio. Você pode querer adicionar testes adicionais para diferentes cenários, como um array de números negativos, uma mistura de números positivos e negativos, etc.

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class CalculatorTest {

    @Test
    void averageOfPositiveNumbers() {
        Calculator calculator = new Calculator();
        double[] numbers = {1.0, 2.0, 3.0, 4.0, 5.0};
        assertEquals(3.0, calculator.average(numbers));
    }

    @Test
    void averageOfEmptyArray() {
        Calculator calculator = new Calculator();
        double[] numbers = {};
        assertEquals(0.0, calculator.average(numbers));
    }
}
```

Na classe de teste, você pode selecionar **Run All Tests** (**⌃⇧R** no macOS ou **Ctrl+Shift+F10** no Windows/Linux).

Neste exemplo, o segundo teste falha. O teste esperava obter o valor `0` como a média de um array vazio, mas obteve `NaN` (não é um número) em vez disso. Vamos descobrir o porquê, usando o depurador.

## Depurando

Você pode querer ver como seu código é executado, seja para ajudá-lo a entender como funciona e/ou quando você precisa corrigir um bug ou um teste com falha, como o acima. Você pode executar seu código através do [depurador](<https://www.jetbrains.com/help/idea/debugging-code.html>) para ver o estado de suas variáveis em diferentes momentos e a pilha de chamadas - a ordem em que os métodos são chamados quando o programa é executado. Para fazer isso, você deve primeiro adicionar um [breakpoint](<https://www.jetbrains.com/help/idea/using-breakpoints.html>) ao código.

Para adicionar um breakpoint, clique na medianiz na linha de código onde você deseja que a execução pare. Alternativamente, posicione o cursor na linha e pressione **⌘F8** (no macOS) ou **Ctrl+F8** (no Windows/Linux). Você pode executar seu teste ou aplicação usando a opção **Debug**; seja clicando com o botão direito no botão **Run** na medianiz e selecionando a opção **Debug** na lista, ou selecionando o botão **Debug** no canto superior direito.

A execução será interrompida no breakpoint, para que você possa investigar o estado da sua aplicação. Você pode ver os valores atuais das variáveis e objetos. É possível avaliar uma expressão para ver seu valor atual e observar mais detalhes. Você pode até mesmo alterar as expressões para avaliar resultados diferentes. Continue a execução, seja entrando em um método para ver o que acontece dentro de um método chamado (usando o atalho **F7**, ou o botão correspondente na janela de ferramentas **Debug**) ou pulando uma linha para ir para a próxima linha, mesmo que um método seja chamado (usando o atalho **F8**, ou o botão correspondente na janela de ferramentas **Debug**), dependendo do que você está interessado. Finalmente, você pode retomar o programa para finalizar a execução do teste.

Vamos depurar o teste com falha da seção anterior. No código, coloque um breakpoint na linha 4. Execute o teste com falha através do depurador. Avance pelo código até chegar à linha 8 e observe os valores das variáveis. Ao chegar à linha 8, selecione `sum / numbers.length`, clique com o botão direito para abrir o menu de contexto e selecione **Evaluate Expression**. Pressione **Enter** para avaliar a expressão selecionada. Você verá que `sum / numbers.length` resulta em uma `java.lang.ArithmeticException: / by zero`. O array vazio tem um comprimento de `0` e Java não permite divisão por zero. Quando você avalia `(double) sum / numbers.length`, o resultado é `NaN`. O teste esperava `0`, então ele falha.

[](<https://dev.java/assets/images/intellij-idea/debug.gif>)

Este cenário não foi considerado na implementação inicial. Você pode corrigir isso alterando o método para retornar `0` quando um array vazio for fornecido como entrada:

```java
public class Calculator {
    public double average(double[] numbers) {
        if (numbers == null || numbers.length == 0) {
            return 0; // Changed from Double.NaN to 0
        }
        double sum = 0;
        for (double number : numbers) {
            sum += number;
        }
        return sum / numbers.length;
    }
}
```

Agora, ao executar os testes, você verá que eles passam.

Para mais informações sobre depuração, consulte [Depurando em Java](<https://dev.java/learn/debugging/>).

## Refatorando código

Ao trabalhar com código, você pode querer fazer pequenas melhorias sem alterar a funcionalidade. Você pode usar [refatoração](<https://www.jetbrains.com/help/idea/refactoring-source-code.html>) para remodelar o código.

O IntelliJ IDEA oferece várias maneiras de ajudá-lo a refatorar seu código.

O [preenchimento de comando](<https://www.jetbrains.com/help/idea/command-completion.html>) oferece comandos relevantes em seu editor quando você digita `..`. Por exemplo, para renomear uma variável ou método, digite `..` após o nome da variável ou método e selecione **Rename**.

Alternativamente, você pode usar atalhos para opções de refatoração específicas. Por exemplo:

*   Renomear classes, variáveis e métodos usando **Refactor | Rename** (**⇧F6** no macOS, ou **Shift+F6** no Windows/Linux).
*   Inline variables (**⌘⌥N** no macOS, ou **Ctrl+Alt+N** no Windows/Linux), ou extract variables (**⌘⌥V** no macOS, ou **Ctrl+Alt+V** no Windows/Linux) conforme necessário.
*   Dividir métodos longos em partes menores extraindo um método (**⌘⌥M** no macOS, ou **Ctrl+Alt+M** no Windows/Linux) e dando-lhe um nome significativo.

Finalmente, você pode usar **Alt+Enter** ou o preenchimento de comando para invocar maneiras de refatorar e transformar seu código.

Abra o menu de refatoração para ver o que é possível, usando o atalho **⌃T** (no macOS) ou **Ctrl+Alt+Shift+T** (no Windows/Linux).

Todas essas opções o ajudam a refatorar seu código para um estilo mais familiar ou para usar novos idiomas e recursos da linguagem.

[](<https://dev.java/assets/images/intellij-idea/refactor.gif>)

Não se esqueça de executar novamente seus testes após a refatoração para garantir que seu código ainda funcione como esperado!
## Documentando código

Você pode adicionar documentação ao seu código. O IntelliJ IDEA oferece preenchimento para comentários de documentação, que é habilitado por padrão. Digite `/` antes de uma declaração e pressione **Enter**. O IntelliJ IDEA auto-completa o comentário de documentação para você.

O IntelliJ IDEA oferece uma maneira de você entender e ler facilmente os comentários Javadoc selecionando o _Reader Mode_. Alterne a **Rendered View** no editor usando **^⌥Q** (no macOS) ou **Ctrl+Alt+Q** (no Windows/Linux). Clique com o botão direito no ícone na medianiz para selecionar **Render All Doc Comments** se você quiser que todos os comentários sejam exibidos no modo de leitura.

Se você estiver usando Java 23 ou superior, e gostaria de transformar seu Javadoc para Markdown, o IntelliJ IDEA oferece um quick-fix para convertê-lo.

[](<https://dev.java/assets/images/intellij-idea/convert-to-markdown.gif>)

 

## Pesquisando e navegando

O IntelliJ IDEA também o ajuda fornecendo maneiras de navegar por uma base de código, por exemplo, indo para trás e para frente entre arquivos, encontrando usos e declarações, encontrando interfaces e suas implementações, visualizando arquivos e locais abertos recentemente, ou até mesmo abrindo uma janela pelo nome.

Uma maneira popular de pesquisar é [Search Everywhere](<https://www.jetbrains.com/help/idea/searching-everywhere.html>) (usando **Shift** duas vezes). O Search Everywhere permite que você pesquise seus arquivos e diretórios de projeto, bem como as configurações do seu projeto e as configurações do IntelliJ IDEA. Se você quiser restringir seus resultados de pesquisa a Classes, Files, Symbols, Actions ou Text, use a tecla **Tab** para navegar até a aba relevante.

[](<https://dev.java/assets/images/intellij-idea/search-everywhere.png>)

Outra maneira popular de pesquisar é [Find in Files](<https://www.jetbrains.com/help/idea/finding-and-replacing-text-in-project.html#find_in_project>). Abra o **Find in Files** no menu principal usando **Edit | Find | Find in Files**, ou usando o atalho **⌘⇧F** (no macOS) ou **Ctrl+Shift+F** (no Windows/Linux). Você pode restringir os resultados de **In Project** para **Module**, **Directory** ou **Scope**.

[](<https://dev.java/assets/images/intellij-idea/find-in-files.png>)

 

## Resumo

Neste artigo, vimos como o IntelliJ IDEA pode ajudá-lo com sugestões e preenchimento de código ao escrever código, executar sua aplicação, adicionar testes e usar o debugger para ajudar a descobrir como o código é executado, refatorar código e muito mais.

O IntelliJ IDEA continua a melhorar e evoluir, adicionando novos recursos e oferecendo novas integrações. Você pode aprimorar suas habilidades de codificação consultando a [documentação](<https://www.jetbrains.com/help/idea/getting-started.html>), o [blog](<https://blog.jetbrains.com/idea/>), o [canal do YouTube](<https://www.youtube.com/intellijidea>) ou o [guia](<https://www.jetbrains.com/guide/java/>).

## Mais aprendizado

### Neste tutorial

Visão geral Instalação do IntelliJ IDEA Criação de um novo projeto Escrita e edição de código Execução da sua aplicação Testes Depuração Refatoração de código Documentação de código Pesquisa e navegação Resumo Mais aprendizado

Última atualização: 2 de fevereiro de 2026

  

[Home](<#/>) > [Tutorials](<#/doc/tutorials/learn>) > Building a Java application in IntelliJ IDEA 

[Back to Tutorial List](<#/doc/tutorials/learn>)