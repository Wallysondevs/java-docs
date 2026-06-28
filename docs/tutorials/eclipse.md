# Construindo uma Aplicação Java no Eclipse IDE

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Construindo uma Aplicação Java no Eclipse IDE

# Construindo uma Aplicação Java no Eclipse IDE

Esta página foi contribuída por [Daniel Schmid](</author/DanielSchmid>) sob a [UPL](<https://oss.oracle.com/licenses/upl/>)

## Introdução e Instalação

O Eclipse IDE (ou Eclipse, para abreviar) é uma aplicação comumente usada que fornece ferramentas que ajudam os desenvolvedores a escrever, executar e depurar código Java. Este artigo descreve como começar a usar o Eclipse para desenvolver aplicações Java.

A maneira mais fácil de instalar o Eclipse é baixar e executar o instalador do Eclipse a partir [deste site](<https://www.eclipse.org/downloads/packages/installer>). Isso oferece múltiplas opções de pacotes para instalar. Na maioria dos casos, `Eclipse IDE for Java Developers` é uma boa instalação para o desenvolvimento Java.

[](<https://dev.java/assets/images/eclipse/install.png>)

Após instalar o Eclipse, você pode selecionar um workspace. O workspace é o diretório onde a maioria dos projetos está localizada.

[](<https://dev.java/assets/images/eclipse/workspace_selection.png>)

Ao selecionar um workspace, ele exibirá uma tela de Boas-vindas apresentando múltiplas opções. Por exemplo, há uma opção para iniciar um tutorial interativo que mostra como criar uma aplicação simples de Hello-World.

[](<https://dev.java/assets/images/eclipse/welcome.png>)

Este artigo mostrará como criar projetos Java manualmente, então você pode fechar esta tela de Boas-vindas clicando no botão `Hide` no canto superior direito da aba Welcome.

## Criando um Projeto Java

Após instalar o Eclipse, você deve ter um workspace vazio. Para criar um novo projeto Java, clique na barra de ferramentas `File` no canto superior esquerdo da janela do Eclipse e selecione `New` > `Java Project`.

[](<https://dev.java/assets/images/eclipse/file_create_project.png>)

Isso abrirá uma janela de diálogo que permite configurar seu projeto. Você precisará inserir um nome ao lado de `Project name:` na parte superior. Por exemplo, você pode escolher o nome `HelloWorld`. Na seção `Module` na parte inferior, desabilite a opção `Create module-info.java file`. Você pode configurar uma instalação Java personalizada (comumente referida como _JDK_ ou Java Development Kit) na caixa `JRE`.

[](<https://dev.java/assets/images/eclipse/create_java_project.gif>)

Isso cria um projeto Java que é exibido no lado esquerdo da janela do Eclipse. Ao expandir este projeto, deve haver uma pasta chamada `src`. Classes Java podem ser criadas dentro deste diretório clicando com o botão direito nele e selecionando `New` > `Class`.

[](<https://dev.java/assets/images/eclipse/create_class.png>)

Isso abre um diálogo semelhante ao diálogo de criação de projeto. Ele permite especificar várias opções sobre a classe que você deseja criar. Por enquanto, você precisará inserir um nome de classe como `HelloWorld`. Se desejar, você também pode configurar um package que pode ser usado para agrupar múltiplas classes.

[](<https://dev.java/assets/images/eclipse/java_class_creation.png>)

## Assistência de Conteúdo

O Eclipse pode ajudar você a escrever código Java completando automaticamente partes dele. Ao pressionar a combinação de teclas `Ctrl`+`Space` (ou `⌘`+`Space` no macOS ou `Alt`+`/` em sistemas chineses) enquanto edita código Java, o Eclipse sugere automaticamente maneiras de completar o código. Essas sugestões podem ser confirmadas pressionando `Enter` ou clicando duas vezes nas sugestões.

Por exemplo, digitar `main` em uma classe seguido de `Ctrl`+`Space` sugere adicionar um método `main`.

[](<https://dev.java/assets/images/eclipse/content_assist_main.png>)

Dentro dos métodos, o Eclipse pode sugerir a alteração de `sysout` para uma instrução `System.out.println();`.

[](<https://dev.java/assets/images/eclipse/content_assist_sysout.png>)

Além disso, ele pode completar nomes de classes e métodos.

[](<https://dev.java/assets/images/eclipse/content_assist_suggest_class.png>)

[](<https://dev.java/assets/images/eclipse/content_assist_suggest_method.png>)

## Executando Seu Programa

Para executar uma aplicação Java, você primeiro precisa ter uma classe com um método `main`. Você pode clicar com o botão direito na classe no package explorer ou clicar com o botão direito no editor onde você está escrevendo o código para a classe e selecionar `Run as` > `Java application`.

[](<https://dev.java/assets/images/eclipse/run_as_editor.png>)

[](<https://dev.java/assets/images/eclipse/run_as_package_explorer.png>)

Alternativamente, você pode executar a aplicação usando o botão Run [](<https://dev.java/assets/images/eclipse/run_button.png>) na barra de ferramentas. [](<https://dev.java/assets/images/eclipse/run_buttons_toolbar.png>)

Ao executar o programa, o Eclipse deve mostrar a saída do programa na view `Console`.

[](<https://dev.java/assets/images/eclipse/console_output.png>)

## Lidando com Erros de Compilação e Avisos

Quando o Eclipse detecta um erro de compilação, as linhas relevantes são sublinhadas em vermelho. Ao passar o mouse sobre a linha com o erro ou sobre o ícone de erro à esquerda da referida linha, o Eclipse fornece informações sobre o que deu errado e também sugere Quick Fixes que podem corrigir o erro. No entanto, em muitos casos, existem várias maneiras de se livrar do erro. Você precisa verificar cuidadosamente se as sugestões realmente correspondem ao que você deseja fazer. Afinal, IDEs não podem prever sua intenção.

[](<https://dev.java/assets/images/eclipse/compilation_error.png>)

Além disso, o Eclipse mostra uma lista de erros na view `Problems`. Se esta view não estiver sendo exibida, ela pode ser mostrada usando o menu `Window` > `Show View` > `Problems`.

[](<https://dev.java/assets/images/eclipse/open_problems_view.png>)

[](<https://dev.java/assets/images/eclipse/problems_view.png>)

Assim como com os Erros, o Eclipse também pode detectar código que compila, mas que provavelmente contém alguns problemas ou é inútil. Neste caso, o Eclipse exibirá um aviso (warning).

[](<https://dev.java/assets/images/eclipse/warning.png>)

[](<https://dev.java/assets/images/eclipse/problems_view_warning.png>)

## Depuração (Debugging)

Quando um programa não faz o que você espera, você pode querer depurá-lo. O processo de depuração é explicado [neste artigo](<#/doc/tutorials/debugging>). O Eclipse oferece muitas funcionalidades que facilitam a depuração de aplicações Java.

Para depurar uma aplicação, você precisa definir um breakpoint. Quando o programa chega à execução da linha com o breakpoint, ele irá parar temporariamente ("suspender"), permitindo que você inspecione seu estado atual e avance passo a passo pelo programa. Para definir um breakpoint, você precisa clicar duas vezes na área à esquerda da linha onde deseja suspender o programa. Depois de fazer isso, um ponto azul deve aparecer lá.

[](<https://dev.java/assets/images/eclipse/breakpoint.png>)

Ao executar um programa normalmente, ele ignorará todos os breakpoints. Para depuração, você precisa executar o programa no modo de depuração. Isso pode ser feito clicando no botão verde com o ícone de bug [](<https://dev.java/assets/images/eclipse/debug_button.png>) ao lado do botão de execução ou usando `Debug As` > `Java Application`.

[](<https://dev.java/assets/images/eclipse/debug_button_in_toolbar.png>)

Quando a execução do programa atinge um breakpoint no modo de depuração, o Eclipse perguntará se você deseja mudar para a perspectiva Debug. Esta perspectiva oferece mais informações sobre o programa que você está depurando, então você provavelmente desejará fazer isso e clicar no botão `Switch`.

[](<https://dev.java/assets/images/eclipse/debug_perspective_switch.png>)

Ao abrir a perspectiva de depuração, você ainda deve ver seu código no centro. No entanto, deve haver uma linha com um fundo verde ao lado do breakpoint. Isso indica a próxima linha que o programa executaria. No lado direito, você deve ver uma view `Variables` contendo uma lista de variáveis e seus valores atuais.

[](<https://dev.java/assets/images/eclipse/debug_perspective.png>)

Enquanto o programa está suspenso, você pode dizer a ele como continuar a execução usando os botões na barra de ferramentas na parte superior. [](<https://dev.java/assets/images/eclipse/debug_toolbar_buttons.png>) Você pode executar uma linha usando `Step Over` [](<https://dev.java/assets/images/eclipse/debug_step_over.png>) (`F6`), entrar em um método usando `Step Into` [](<https://dev.java/assets/images/eclipse/debug_step_into.png>) (`F5`) ou continuar executando o programa até o próximo breakpoint com `Resume` [](<https://dev.java/assets/images/eclipse/debug_resume.png>) (`F8`).

## Gerando Código

Às vezes, você pode precisar escrever código repetitivo que não contém muita lógica de negócio e pode ser gerado usando informações de código existente. Um exemplo disso são os métodos getters/setters ou `equals`/`hashCode`/`toString`, que tipicamente precisam apenas acessar alguns campos. Embora seja frequentemente preferível usar [records](<#/doc/tutorials/records>), o Eclipse vem com funcionalidades para gerar essas partes de código repetitivo.

Para fazer isso, você primeiro precisa criar uma classe com alguns campos para os quais deseja gerar esses métodos. Neste exemplo, criaremos uma classe `Person` que armazena o primeiro nome, o sobrenome e a idade de uma pessoa.

Ao clicar com o botão direito nesta classe, há uma opção chamada `Source` que oferece várias maneiras de gerar código. Aqui, podemos selecionar `Generate Getters and Setters...` para gerar métodos acessores para os campos na classe `Person`.

[](<https://dev.java/assets/images/eclipse/context_generate_getters_setters.png>)

Esta opção deve abrir uma nova janela permitindo configurar quais campos queremos gerar acessores. Para criar acessores para todos os campos, use o botão `Select All` e clique em `Generate` no canto inferior direito.

[](<https://dev.java/assets/images/eclipse/getter_setter_modal.png>)

Depois de fazer isso, a classe deve ficar assim:

Da mesma forma, é possível gerar os métodos `hashCode` e `equals` usando o menu `Source` > `Generate hashCode() and equals()...`.

[](<https://dev.java/assets/images/eclipse/context_generate_hashcode_equals.png>)

Isso também abre uma janela que permite selecionar os campos a serem incluídos nos métodos `hashCode` e `equals`.
[](<https://dev.java/assets/images/eclipse/hashcode_equals_modal.png>)

Após clicar em `Generate`, o Eclipse adiciona automaticamente esses métodos à classe.

Outro método que é frequentemente gerado é `toString()`, que retorna uma representação `String` do objeto. Para gerar esse método, selecione `Generate toString()...` no menu `Source`.

[](<https://dev.java/assets/images/eclipse/context_tostring.png>)

Como antes, isso abre uma janela permitindo especificar opções sobre como exatamente o código deve ser gerado.

[](<https://dev.java/assets/images/eclipse/tostring_options.png>)

Usando o botão `Generate`, o Eclipse gera o método `toString` como fez com os outros métodos anteriormente.

## Refatoração (Refactoring)

Ao trabalhar em aplicações Java, muitas vezes é necessário alterar o código existente de várias maneiras, preservando a funcionalidade. O Eclipse apoia os desenvolvedores a fazer isso, fornecendo várias opções de refatoração. Um exemplo disso é renomear classes, métodos ou campos. Isso pode ser feito clicando em um nome de classe, método ou variável, clicando com o botão direito e selecionando `Refactor` > `Rename`.

[](<https://dev.java/assets/images/eclipse/context_rename.png>)

É então possível alterar o nome para algo diferente e confirmá-lo usando a tecla `Enter`. Isso também atualiza todas as referências ao elemento renomeado.

[](<https://dev.java/assets/images/eclipse/rename_box.png>)

[](<https://dev.java/assets/images/eclipse/rename_different_text.png>)

## Resumo

Como você pode ver, o Eclipse IDE oferece muitas ferramentas que ajudam os desenvolvedores a escrever aplicações Java. Embora este artigo mostre algumas, o Eclipse vem com muitos outros recursos que podem ser especialmente úteis ao trabalhar em aplicações maiores. Se você estiver interessado em ler mais, consulte o [guia do usuário de Desenvolvimento Java](<https://help.eclipse.org/latest/index.jsp?nav=%2F1>).

### Neste tutorial

Introdução e Instalação Criando um Projeto Java Assistência de Conteúdo Executando Seu Programa Lidando com Erros de Compilação e Avisos Depuração (Debugging) Gerando Código Refatoração (Refactoring) Resumo

Última atualização: 22 de abril de 2024

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Construindo uma Aplicação Java no Eclipse IDE

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)