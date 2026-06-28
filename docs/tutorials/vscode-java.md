# Construindo uma aplicação Java no Visual Studio Code

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Construindo uma aplicação Java no Visual Studio Code 

# Construindo uma aplicação Java no Visual Studio Code

Uma IDE (Integrated Development Environment) permite programar aplicações rapidamente, fornecendo múltiplas utilidades para desenvolvimento de código, testes, recursos de depuração, etc. Dada a crescente popularidade do Visual Studio Code como uma IDE universal, você pode facilmente desenvolver seu primeiro projeto Java instalando a Oracle Java Platform Extension.

## Configuração

A Oracle Java Platform Extension está disponível no [Visual Studio Code Marketplace](<https://marketplace.visualstudio.com/items?itemName=Oracle.oracle-java>). Você pode instalá-la diretamente do Visual Studio Code acessando o menu `Code`: `Code > Settings > Extensions`.

Utilize a paleta de comandos para criar um novo projeto `View > Command Palette > Java: New Project` ou abra uma pasta com arquivos de projeto Maven (`pom.xml`) ou Gradle (`build.gradle`, `gradle.properties`) existentes. Vamos criar um novo projeto Maven acessando o menu `View > Command Palette >Java: New Project` e selecionando a opção `Java with Maven`. Você verá um prompt pedindo para especificar um diretório onde deseja salvar seu projeto (ex: `concatenate`) e então inserir um nome de pacote.

[](<https://dev.java/assets/images/vs-code/package-name.png>)

A extensão criará um `pom.xml` básico e uma estrutura de diretórios padrão para um projeto Maven com a pasta de origem definida. O arquivo `pom.xml` é um único arquivo de configuração que contém a maioria das informações necessárias para construir o projeto.

Se nenhum JDK estiver presente em seu sistema, a extensão pode ajudá-lo a obter um. No menu do Visual Studio Code, selecione `View > Command Palette > Download, install, and Use JDK` e escolha instalar um dos JDKs listados lá ou aponte a extensão para os binários de um JDK existente em seu sistema operacional. Esta ação atualizará suas configurações de usuário. Quando você quiser usar um JDK diferente, acesse `View > Command Palette > Preferences:Open User Settings (JSON)` e atualize manualmente a configuração `jdk.jdkhome`.

[](<https://dev.java/assets/images/vs-code/downloader.png>)

* * *

**NOTA**

A extensão requer no mínimo JDK 11.

* * *

Você pode construir, executar e depurar seu projeto com o mesmo JDK que executa a Oracle Java Platform extension. A extensão procura por um JDK nos seguintes locais:

  * `jdk.jdkhome`
  * `java.home`
  * `JDK_HOME` environment variable
  * `JAVA_HOME` environment variable
  * current system path

Em seguida, vamos explorar o projeto gerado.

## Explorador de Projeto

Você pode visualizar seu projeto no explorador do Visual Studio Code. O objetivo do projeto `concatenate` é fornecer a interseção de 2 listas. Seu programa deve receber as listas como argumentos e calcular sua interseção. Vamos adicionar o seguinte código para conseguir isso na classe `Concatenate.java`:

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Concatenate {

    public static void main(String[] args) {
        if (args.length != 2) {
            System.out.println("Usage: java Concatenate \"list1\" \"list2\"");
            return;
        }

        List<Integer> list1 = parseList(args[0]);
        List<Integer> list2 = parseList(args[1]);

        List<Integer> commonElements = extractCommonElements(list1, list2);

        System.out.println("List 1: " + list1);
        System.out.println("List 2: " + list2);
        System.out.println("Common Elements: " + commonElements);
    }

    private static List<Integer> parseList(String listString) {
        return Arrays.stream(listString.split(","))
                     .map(String::trim)
                     .map(Integer::parseInt)
                     .collect(Collectors.toList());
    }

    public static List<Integer> extractCommonElements(List<Integer> list1, List<Integer> list2) {
        return list1.stream()
                    .filter(list2::contains)
                    .collect(Collectors.toList());
    }
}
```

Além do explorador do Visual Studio Code, a Oracle Java Platform extension oferece o `Project Explorer` que contém uma visão geral da estrutura do projeto. Este recurso visa simplificar a navegação da estrutura de pacotes Java.

[](<https://dev.java/assets/images/vs-code/project-explorer.png>)

Você pode usá-lo para limpar, compilar, testar, depurar e executar seus projetos Java Maven/Gradle.

## Depurador e Configurações de Inicialização

A configuração de inicialização da Oracle Java Platform Extension suporta a depuração e execução de aplicações Java usando JDK11 ou mais recente. Você pode invocar a configuração de inicialização/depurador ao selecionar a lente de código `Run main | Debug main` ou no painel de atividades `Run and Debug`.

[](<https://dev.java/assets/images/vs-code/run-main.png>)

Ambas as configurações de inicialização e depurador suportam as seguintes ações:

  * Pausar
  * Passar por cima (Step over)
  * Entrar (Step into)
  * Sair (Step out)
  * Reiniciar
  * Parar/Desconectar

Na visualização `Run and Debug`, você pode personalizar suas configurações de inicialização escolhendo `Java+` na lista suspensa e, em seguida, clicando no ícone de execução.

[](<https://dev.java/assets/images/vs-code/launch.png>)

As configurações de inicialização padrão estão disponíveis no arquivo `launch.json`. Você pode anexar ações do depurador selecionando entre os processos disponíveis ou inserindo a porta para conectar à JVM em execução com JDWP. No sistema operacional Windows, você também pode selecionar `Attach to Shared Memory`.

[](<https://dev.java/assets/images/vs-code/attach.png>)

Vá para o painel `Run Configuration` da visualização Explorer para modificar os argumentos do programa, VM options, environment variables ou definir o working directory. Por exemplo, você pode executar sua aplicação com argumentos adicionando `"31,20,15,17" "20,19,17,45"` aos Program Arguments.

[](<https://dev.java/assets/images/vs-code/run-configuration.png>)

## Refatoração de Código

Manter uma aplicação Java geralmente envolve melhorar o código interno fazendo muitas pequenas alterações sem alterar seus requisitos funcionais. Por exemplo, se você estiver usando JDK 21 ou mais recente, você pode selecionar `.get(0)`, clicar com o botão direito em `Change all occurrences` para usar o método `getFirst()` de `SequencedCollection`.

[](<https://dev.java/assets/images/vs-code/change-all-ocurrences.png>)

Da mesma forma, você pode refatorar todas as ocorrências de `get(list1.size() - 1)` para o método `getLast()` de `SequencedCollection`. O código do método `extractCommonElements` se torna:

```java
    public static List<Integer> extractCommonElements(List<Integer> list1, List<Integer> list2) {
        // Example of using SequencedCollection methods if JDK 21 or newer
        // if (list1 instanceof SequencedCollection && list2 instanceof SequencedCollection) {
        //     System.out.println("First element of list1: " + ((SequencedCollection<Integer>) list1).getFirst());
        //     System.out.println("Last element of list1: " + ((SequencedCollection<Integer>) list1).getLast());
        // }
        return list1.stream()
                    .filter(list2::contains)
                    .collect(Collectors.toList());
    }
```

Para acelerar o desenvolvimento, você pode gerar métodos para sua classe através do menu de contexto `Source Action`.

[](<https://dev.java/assets/images/vs-code/source-action.png>)

O menu de contexto `Source Action` oferece suporte para organizar imports em fontes Java. Além disso, você pode aprimorar a estratégia de otimização de imports indo para `VSCode View > Command Palette > Preferences:Open User Settings > Extensions > Java` e procurando por `jdk` para definir as opções de `Jdk > Java > Imports`:

  * `Count For Using Star Import` - Contagem de classes para usar um star-import, com 999 como valor padrão.
  * `Count For Using Static Star Import` - Contagem de membros para usar um static star-import, com 999 como valor padrão.
  * `Groups - Groups of import statements` (especificados por seus prefixos de pacote) e sua ordem de classificação. As declarações de import dentro de um grupo são ordenadas alfabeticamente.

[](<https://dev.java/assets/images/vs-code/organize-imports.png>)

Você pode escolher a ação de organizar imports ao salvar um documento via `View > Command Palette > Preferences:Open User Settings > Extensions > Java > On Save: Organize Imports` e marcar a caixa de seleção.

Mais sugestões de refatoração estão disponíveis através da lâmpada `Show code` e do menu de contexto `Refactor`. Você pode realizar refatorações mais complexas, como alterar os parâmetros de um método através de um formulário dedicado que permite alterar, adicionar, mover e remover parâmetros de método.

[](<https://dev.java/assets/images/vs-code/change-method-params.png>)

Caso você decida mover membros de uma classe para outra, você pode fazê-lo a partir do menu de contexto `Refactor > Move`:

[](<https://dev.java/assets/images/vs-code/move-members.png>)

Além disso, a extensão também suporta as seguintes refatorações:

  * Refatoração de argumentos de construtores e métodos
  * Geração de `hashCode/equals` e `toString()`
  * Atribuição de uma expressão a uma variável local
  * Extração de uma expressão para uma variável local
  * Divisão em declaração e atribuição
  * Mover um membro de classe para cima ou para baixo
  * Inlining de uma variável redundante
  * Mover uma classe para um pacote diferente
  * Extração de uma interface/método
  * Substituição de import de uma constante/método convertendo para um static import
  * Refatoração de blocos `for/try-catch/switch()/while()`

Enquanto a refatoração é um processo que visa melhorar a qualidade do software sem quebrar a funcionalidade para os usuários finais, os testes ajudam você a ter confiança de que está construindo aplicações sem bugs.

## Código de Teste

Você pode gerar um teste através da lâmpada `Show code` e selecionar a opção `Create Test Class`.

[](<https://dev.java/assets/images/vs-code/test.png>)

A classe de teste gerada conterá métodos vazios ou falhos. Seu objetivo é ter testes que avaliem as ações em cada método de sua classe, para que você possa adicionar a anotação `@Disabled` para excluir/pular a execução de alguns desses métodos gerados. Vamos modificar um dos testes gerados para validar o método `extractCommonElements`:

```java
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class ConcatenateTest {

    @Test
    void testExtractCommonElements() {
        List<Integer> list1 = Arrays.asList(1, 2, 3, 4, 5);
        List<Integer> list2 = Arrays.asList(4, 5, 6, 7, 8);
        List<Integer> expected = Arrays.asList(4, 5);
        List<Integer> actual = Concatenate.extractCommonElements(list1, list2);
        assertEquals(expected, actual);
    }

    @Test
    void testExtractCommonElementsNoCommon() {
        List<Integer> list1 = Arrays.asList(1, 2, 3);
        List<Integer> list2 = Arrays.asList(4, 5, 6);
        List<Integer> actual = Concatenate.extractCommonElements(list1, list2);
        assertTrue(actual.isEmpty());
    }

    @Test
    void testExtractCommonElementsEmptyList() {
        List<Integer> list1 = Arrays.asList(1, 2, 3);
        List<Integer> list2 = Arrays.asList();
        List<Integer> actual = Concatenate.extractCommonElements(list1, list2);
        assertTrue(actual.isEmpty());
    }

    @Test
    @Disabled("Not yet implemented")
    void testMain() {
        // TODO: Implement test for main method
    }

    @Test
    @Disabled("Not yet implemented")
    void testParseList() {
        // TODO: Implement test for parseList method
    }
}
```

A extensão fornece a visualização `Test Explorer` que permite executar todos os testes em um projeto, examinar os resultados, ir para o código-fonte e executar um teste específico.

[](<https://dev.java/assets/images/vs-code/test-explorer.png>)

## Documentar Código

A Oracle Java Platform extension pode ajudá-lo ao escrever documentação, sugerindo a inserção de comentários JavaDoc pré-formatados e pré-preenchidos. Digite `/` acima da assinatura de um método e a IDE oferecerá para completar o JavaDoc. A ação cria um comentário JavaDoc com todos os argumentos preparados.

[](<https://dev.java/assets/images/vs-code/javadoc.png>)

O javadoc gerado será semelhante a este:

```java
    /**
     * Parses a comma-separated string into a list of integers.
     *
     * @param listString The string containing comma-separated integers.
     * @return A list of integers.
     */
    private static List<Integer> parseList(String listString) {
        return Arrays.stream(listString.split(","))
                     .map(String::trim)
                     .map(Integer::parseInt)
                     .collect(Collectors.toList());
    }
```

## Evoluindo o projeto

Caso você tenha um projeto rodando em diferentes versões Java, você pode associar um perfil para cada versão de runtime que você usa. Uma vez que o perfil é criado, você pode personalizar seu `settings.json` e definir o valor de `jdk.jdkhome`.

Assim como seus próprios projetos, a Oracle Java Platform Extension continuará a melhorar e evoluir. Como este é um projeto de código aberto, contribuições da comunidade e feedback são bem-vindos. Verifique [o guia de contribuição](<https://github.com/oracle/javavscode/blob/main/CONTRIBUTING.md>) e junte-se ao nosso esforço para oferecer uma experiência de desenvolvedor fluida com Java.

### Neste tutorial

Configuração Explorador de Projeto Depurador e Configurações de Inicialização Refatoração de Código Código de Teste Documentar Código Evoluindo um projeto

Última atualização: 22 de abril de 2024

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Construindo uma aplicação Java no Visual Studio Code 

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)