# Introdução à API de Acessibilidade do JavaFX

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Acessibilidade no JavaFX ](<#/doc/tutorials/javafx/a11y>) > Introdução à API de Acessibilidade do JavaFX

**Tutorial Atual**

Introdução à API de Acessibilidade do JavaFX

➜

**Próximo na Série**

[Construa uma Aplicação JavaFX Acessível](<#/doc/tutorials/javafx/a11y/example>)

**Próximo na Série:** [Construa uma Aplicação JavaFX Acessível](<#/doc/tutorials/javafx/a11y/example>)

# Introdução à API de Acessibilidade do JavaFX

## O que é Acessibilidade de Software?

Acessibilidade é a medida em que um produto pode ser usado pelo maior número possível de pessoas, incluindo aquelas com deficiência. Em software, isso significa projetar aplicações que possam ser percebidas, compreendidas e operadas independentemente de limitações visuais, auditivas, motoras ou cognitivas.

Software acessível deve considerar um amplo espectro de necessidades dos usuários, incluindo deficiências visuais, limitações auditivas, desafios de mobilidade e diferenças cognitivas. Sistemas operacionais modernos suportam tecnologias assistivas como leitores de tela, modos de alto contraste e ferramentas de zoom.

Usuários interagem com aplicações de maneiras muito diferentes. Alguns dependem de leitores de tela como VoiceOver (macOS), Narrator (Windows) ou JAWS. Outros dependem da navegação por teclado em vez de um mouse. Muitos se beneficiam de visuais de alto contraste ou layouts simplificados. Para que essas ferramentas funcionem corretamente, as aplicações devem expor informações significativas através de suas interfaces de usuário.

Em essência, a acessibilidade define o que precisa ser alcançado para ter um software que funcione para todos os usuários, enquanto plataformas como JavaFX fornecem as construções para implementar isso.

## Acessibilidade no JavaFX

Historicamente, a acessibilidade chegou relativamente tarde no JavaFX. A plataforma teve que equilibrar APIs Java portáteis com sistemas de acessibilidade nativos muito diferentes, ao mesmo tempo em que suportava uma ampla gama de controles e comportamentos. Essa combinação apresentou alguns desafios de implementação, pois a acessibilidade exigia uma API voltada para JavaFX portátil, integrações nativas específicas da plataforma e coordenação entre várias camadas do JavaFX, como controles e skins.

JavaFX abordou essas questões através do seguinte:

  * Fornecer uma API de Acessibilidade mínima, mas completa, que se integra com os sistemas de acessibilidade nativos da plataforma.
  * Implementar acessibilidade para todos os controles JavaFX integrados.
  * Permitir que os desenvolvedores tornem seus próprios controles personalizados acessíveis.

JavaFX armazena informações de acessibilidade no próprio grafo de cena, em vez de manter uma hierarquia paralela de sombra. Isso torna o modelo mais amigável a CSS e FXML e evita a duplicação de dados. A plataforma também mantém a sobrecarga de tempo de execução baixa, ativando o mecanismo de acessibilidade apenas quando um leitor de tela está ativo. Então, vamos explorar os conceitos fundamentais da API de Acessibilidade do JavaFX!

## Fundamentos da API de Acessibilidade do JavaFX

Aplicações JavaFX são executadas sobre sistemas operacionais que já fornecem ferramentas de acessibilidade. Essas ferramentas dependem de informações semânticas sobre os componentes da sua aplicação:

  * Que tipo de controle é este?
  * O que ele faz?
  * Como ele deve ser descrito ao usuário?

JavaFX expõe essas informações através de um conjunto de APIs que atribuem significado aos elementos da interface do usuário e resolvem os casos de uso mais comuns.

### A Propriedade Accessible Role

[`AccessibleRole`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/AccessibleRole.html>) é uma propriedade de enumeração em [`Node`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/Node.html#accessibleRoleProperty>) e comunica às tecnologias assistivas sobre que tipo de elemento de UI elas estão lidando.

Controles JavaFX padrão como [`Button`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/Button.html>) ou [`TextField`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/TextField.html>) já definem seus papéis. Mas para seus elementos personalizados, você deve definir um explicitamente.

Se você criar um elemento interativo personalizado, atribuir um papel garante que os leitores de tela o reconheçam como algo significativo. Para nós que não são um controle, escolha o papel mais próximo correspondente do conjunto de enums.

### A Propriedade Accessible Role Description

Às vezes, os papéis integrados não são descritivos o suficiente, pois não há papéis definidos pelo usuário no enum [`AccessibleRole`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/AccessibleRole.html>). No entanto, você ainda pode guiar a compreensão de um leitor de tela definindo a descrição do papel acessível em um [`Node`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/Node.html#accessibleRoleDescriptionProperty>).

Esta propriedade permite que você mantenha um papel válido enquanto dá ao leitor de tela uma descrição mais específica. Para controles JavaFX integrados, a propriedade [`Node.accessibleRoleDescription`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/Node.html#accessibleRoleDescriptionProperty>) é sempre null, então o leitor de tela comunica ao usuário a descrição nativa desse componente. No entanto, ao definir um valor para ela, você pode refinar o que um leitor de tela entende sem quebrar os papéis padrão da plataforma.

### A Propriedade Accessible Text

A propriedade [`Node.accessibleText`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/Node.html#accessibleTextProperty>) informa ao leitor de tela o que deve ser lido como o conteúdo de um nó.

Por padrão, os controles JavaFX integrados têm a propriedade [`Node.accessibleText`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/Node.html#accessibleTextProperty>) definida como null, mas você pode personalizá-la na criação. Por exemplo, um botão pode ler o texto de seu rótulo, e um campo de texto pode ler seu conteúdo esperado.

### A Propriedade Accessible Help

A propriedade [`Node.accessibleHelp`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/Node.html#accessibleHelpProperty>) fornece uma descrição mais longa de como um controle funciona ou qual ação ele executa. Isso é útil quando o propósito de um controle não é óbvio apenas a partir de seu rótulo.

Para controles JavaFX integrados, a propriedade [`Node.accessibleHelp`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/Node.html#accessibleHelpProperty>) é null. Se não for explicitamente definida e o nó tiver uma dica de ferramenta (tooltip), a plataforma fornece o texto da dica de ferramenta ao leitor de tela.

### Associações de Rótulos

A propriedade [`Label.labelFor`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/Label.html#labelForProperty>) conecta rótulos a controles.

Por padrão, o valor desta propriedade é null, mas você pode personalizá-la. Você pode usar esta propriedade para aprimorar a descrição de objetos [`TextField`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/TextField.html>) e [`ComboBox`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/ComboBox.html>). Ao fornecer um rótulo, você melhora a saída do leitor de tela e ajuda os usuários a entender o que cada controle representa, especialmente em formulários.

## Conclusão

A acessibilidade deve fazer parte do design da aplicação. Ao fornecer papéis acessíveis, descrições significativas e rotulagem adequada, você cria aplicações que não apenas estão em conformidade com os padrões de acessibilidade, mas são genuinamente melhores para todos.

### Neste tutorial

O que é Acessibilidade de Software? Acessibilidade no JavaFX Fundamentos da API de Acessibilidade do JavaFX Conclusão

Última atualização: 25 de março de 2026

**Tutorial Atual**

Introdução à API de Acessibilidade do JavaFX

➜

**Próximo na Série**

[Construa uma Aplicação JavaFX Acessível](<#/doc/tutorials/javafx/a11y/example>)

**Próximo na Série:** [Construa uma Aplicação JavaFX Acessível](<#/doc/tutorials/javafx/a11y/example>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Acessibilidade no JavaFX ](<#/doc/tutorials/javafx/a11y>) > Introdução à API de Acessibilidade do JavaFX