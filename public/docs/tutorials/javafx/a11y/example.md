# Construa uma Aplicação JavaFX Acessível

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Acessibilidade em JavaFX ](<#/doc/tutorials/javafx/a11y>) > Construa uma Aplicação JavaFX Acessível

**Anterior na Série**

[Introdução à API de Acessibilidade do JavaFX](<#/doc/tutorials/javafx/a11y/intro>)

➜

**Tutorial Atual**

Construa uma Aplicação JavaFX Acessível

➜

Este é o fim da série!

**Anterior na Série:** [Introdução à API de Acessibilidade do JavaFX](<#/doc/tutorials/javafx/a11y/intro>)

# Construa uma Aplicação JavaFX Acessível

Com os fundamentos da API de Acessibilidade do JavaFX abordados, este tutorial irá guiá-lo sobre como implementar esses conceitos em uma aplicação JavaFX simples. A aplicação é um sistema JavaFX baseado em formulário com a seguinte funcionalidade:

  * Usuários podem inserir um nome e ajustar um slider.
  * Para melhor visibilidade, usuários podem alternar o modo de alto contraste.
  * Um painel de pré-visualização reflete visualmente a opacidade definida através de um valor de slider.
  * Uma ação "Salvar" atualiza uma mensagem de status.
  * Todos os elementos são acessíveis via teclado e leitores de tela.

[](<https://dev.java/assets/images/javafx/high-contrast-app.png>)

## Pré-requisitos

Antes de construir o exemplo, certifique-se de que seu ambiente corresponda às suposições usadas ao longo deste guia. Use JDK 21 ou mais recente (os trechos deste artigo usam sintaxe Java 26 e valores de namespace JavaFX 26), e certifique-se de ter acesso ao diretório `lib` do JavaFX SDK que contém os JARs modulares de tempo de execução (`javafx.base`, `javafx.graphics`, `javafx.controls`, `javafx.fxml`).

* * *

**NOTA** : As versões de Java e JavaFX devem estar alinhadas. Misturar versões principais é uma fonte comum de problemas de inicialização e resolução de módulos.

* * *

Como os requisitos funcionais abrangem diferentes camadas da aplicação, a implementação segue um design JavaFX modular:

  * Defina dependências explícitas (`javafx.controls`, `javafx.fxml`) em `module-info.java` e abra o pacote do controller para FXML. Esta abordagem suporta a segurança da aplicação, manutenibilidade e escalabilidade à medida que o sistema evolui.
  * Todo o estilo visual está presente em arquivos CSS (`base.css`, `high-contrast.css`), separadamente da lógica, tornando fácil alternar temas (por exemplo, alto contraste).
  * O arquivo FXML `accessible-view.fxml` é responsável por manter a estrutura da interface do usuário de forma declarativa, incluindo layout e associações de rótulos.
  * Lide com a inicialização, carregamento de FXML, anexação de CSS e configuração da cena na classe `AccessibleFxApplication` que estende [`javafx.application.Application`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/application/Application.html>).
  * O controller `AccessibleFxController` contém toda a lógica de comportamento e acessibilidade (manuseio de teclado, papéis acessíveis, alternância de alto contraste).

## Defina a Interface do Usuário Declarativamente

Um bom design de interface do usuário acessível começa separando o layout do comportamento. Por essa razão, o exemplo de aplicação JavaFX neste guia tem seu layout em `accessible-view.fxml` que se parece com o trecho abaixo.

O layout é dividido em duas áreas: uma seção de formulário para entrada e uma seção de pré-visualização para saída. Isso espelha como os usuários interagem com a aplicação e mantém o scene graph fácil de entender. Elementos relacionados são aninhados em contêineres [`VBox`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/VBox.html>) e [`HBox`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/layout/HBox.html>), e cada entrada tem um rótulo visível. As associações `labelFor` conectam o significado do rótulo ao nome acessível do controle. Leitores de tela anunciarão o rótulo junto com o controle associado (por exemplo, para um campo de texto ou um slider).

## Design para Acessibilidade Visual

Uma vez definida a estrutura da interface, a próxima preocupação a ser abordada é a apresentação. A acessibilidade frequentemente requer representações visuais alternativas, mas essas variações não devem complicar a lógica da aplicação. Por essa razão, o estilo visual é externalizado para uma folha de estilo base (`base.css`) como a que se segue.

Separar o estilo padrão em uma folha de estilo dedicada serve a dois propósitos. Primeiro, mantém as preocupações de apresentação fora do controller e do layout FXML. Segundo, estabelece uma linha de base limpa que pode ser posteriormente sobrescrita quando modos de acessibilidade forem necessários.

## Conecte o Ponto de Entrada da Aplicação

Com a estrutura e o estilo definidos, o próximo passo é conectar essas peças em uma aplicação funcional. Essa tarefa pertence ao ponto de entrada da aplicação (`AccessibleFxApplication.java`), cuja responsabilidade é carregar o FXML, aplicar a folha de estilo base, inicializar a cena e expor a cena ao controller.

À medida que a aplicação cresce, também é melhor declarar as dependências explicitamente em um descritor de módulo (`module-info.java`).

Embora isso não afete diretamente a acessibilidade, reforça os limites arquitetônicos e garante que o carregamento de FXML e o acesso ao controller se comportem de forma previsível em tempo de execução:

  * `requires javafx.controls;` dá acesso aos controles de UI padrão.
  * `requires javafx.fxml;` habilita o carregamento de FXML.
  * `opens ... to javafx.fxml;` permite que o carregador FXML acesse campos e métodos do controller.
  * `exports ...;` expõe o pacote da aplicação.

## Adicione Rótulos e Ajuda Acessível

Até este ponto, o desenvolvimento da aplicação focou na estrutura e apresentação. O próximo passo é introduzir comportamento via `AccessibleFxController.java`.

Em uma aplicação JavaFX, o controller é o local que lida com as interações do usuário, coordena o comportamento dinâmico para os componentes da interface do usuário e aplica metadados de acessibilidade a eles. Por exemplo, dentro de `AccessibleFxController.java` você pode atribuir ajuda contextual, texto acessível e tooltips como mostrado abaixo.

A interface do usuário oferece orientação através de canais visuais e não visuais, mas o faz de maneiras apropriadas para cada modelo de interação. Tooltips são úteis para interação baseada em ponteiro, particularmente para usuários que dependem do mouse ou desejam dicas visuais rápidas. [`accessibleHelp`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/Node.html#accessibleHelpProperty>), por outro lado, fornece contexto extra para tecnologias assistivas como leitores de tela. Manter essas definições próximas no controller facilita garantir que ambas as formas de orientação permaneçam alinhadas.

## Torne Nós Não Padrão Acessíveis

Neste ponto, os controles padrão já carregam grande parte de seu comportamento de acessibilidade automaticamente, porque o JavaFX atribui papéis apropriados a controles embutidos como botões, sliders e campos de texto.

Mas nós personalizados (como [`Rectangle`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/shape/Rectangle.html>)) ainda carecem de significado semântico. Visualmente, o usuário pode inferir que ele reflete o valor do slider. Um leitor de tela, no entanto, vê apenas uma forma, a menos que a semântica seja adicionada. Para resolver isso, o controller atribui um papel apropriado e metadados descritivos:

Cada propriedade contribui com um aspecto diferente de significado. O papel acessível informa à tecnologia assistiva que tipo de componente o nó deve ser tratado. A descrição do papel refina essa classificação quando o papel genérico sozinho é muito amplo. O texto acessível comunica o que o elemento representa, e a ajuda acessível fornece explicação adicional. Finalmente, [`setFocusTraversable(true)`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/Node.html##setFocusTraversable\(boolean\)>) garante que o nó possa participar da navegação por teclado se for destinado a ser interativo.

## Adicione Navegação por Teclado e Atalhos

Uma vez que a semântica tenha sido atribuída, a interação deve ser tornada igualmente acessível. O suporte a teclado é essencial não apenas para usuários com deficiências motoras, mas também para usuários de leitores de tela, que frequentemente dependem de padrões de navegação baseados em teclado. Por essa razão, a aplicação precisa fornecer tanto aceleradores padrão quanto acesso significativo por teclado a elementos interativos personalizados.

Neste exemplo, o controller `AccessibleFxController.java` aborda ambas as preocupações. Ele registra `Ctrl+S` como um acelerador para a ação de salvar, e anexa o manuseio de teclado a `previewRectangle`:

Os controles embutidos já participam da travessia de foco normal e da interação por teclado, então nenhum trabalho extra é necessário ali. O retângulo de pré-visualização, no entanto, não é um controle, então ele requer tanto suporte à travessia de foco quanto um manipulador de teclas. Este é um bom exemplo de uma regra mais ampla na acessibilidade do JavaFX: nós personalizados não herdam comportamento de interação significativo automaticamente, então se eles são importantes para o usuário, esse comportamento precisa ser adicionado intencionalmente.

## Implemente o Comportamento de Alternância de Alto Contraste

Muitos usuários com deficiência visual preferem o modo de alto contraste porque ele aumenta o contraste entre as cores de primeiro plano e de fundo, tornando o texto e os elementos da interface do usuário mais fáceis de distinguir. A implementação mais simples é manter sua folha de estilo normal para a aparência padrão e, em seguida, adicionar uma segunda folha de estilo de alto contraste (`high-contrast.css`) que sobrescreve esses estilos quando o usuário habilita o modo.

Uma vez definida a folha de estilo de alto contraste como uma camada visual separada, o próximo passo é tornar essa capacidade disponível ao usuário em tempo de execução. Isso acontece no controller, onde o estado da caixa de seleção é observado e usado para adicionar ou remover a folha de estilo de alto contraste da cena.

O controller não sabe nada sobre valores de cores individuais ou regras de estilo. Ele simplesmente reage à intenção do usuário e liga ou desliga a folha de estilo relevante. Isso mantém o controller focado no comportamento, permitindo que o CSS permaneça a única fonte de verdade para a aparência visual.

## Vincule a Opacidade e Exponha Atualizações de Status

A última parte é conectar o comportamento visível da pré-visualização ao slider e garantir que as atualizações de status permaneçam acessíveis. O slider deve atualizar a opacidade da pré-visualização em tempo real, e as ações do usuário (como Salvar ou ativação por teclado) devem ser refletidas no rótulo de status.

Vincular o slider à pré-visualização garante feedback visual imediato: a opacidade da pré-visualização é derivada do valor numérico do slider. Atualizar `accessibleText` juntamente com as mudanças visíveis garante que as tecnologias assistivas recebam a mesma informação.

## Junte Tudo

Nesta fase, todas as partes da aplicação estão conectadas:

  * o FXML define a estrutura da interface,
  * CSS define os estados visuais padrão e de alto contraste,
  * `AccessibleFxApplication` é responsável por inicializar a cena,
  * e `AccessibleFxController` centraliza o comportamento e a lógica de acessibilidade.
  * O que mais importa aqui não é o tamanho do exemplo, mas a consistência do design. O nome do pacote, a declaração `fx:controller` e os caminhos dos recursos precisam corresponder à mesma estrutura `org.example.accessibility`, caso contrário, o carregamento de recursos falhará em tempo de execução. Uma vez que essas convenções estejam alinhadas, estender o projeto se torna muito mais fácil porque cada nova funcionalidade segue o mesmo padrão: declare a estrutura em FXML, defina a apresentação em CSS e anexe o comportamento no controller.

O código dentro de `AccessibleFxController` deve, portanto, se parecer com o trecho abaixo.

E você pode executar toda a configuração com o seguinte comando:

* * *

**NOTA** : Ao compor valores de module-path em comandos, lembre-se que o separador de caminho difere por sistema operacional: use `:` no macOS/Linux e `;` no Windows.

* * *

A aplicação deve abrir em seu tema padrão, suportar interação por teclado e permitir a alternância para alto contraste em tempo de execução.

[](<https://dev.java/assets/images/javafx/default-accessible-app.png>)

## Dicas Finais

Uma estrutura modular JavaFX que combina FXML (layout), CSS (estilo) e um controller (comportamento + metadados de acessibilidade) mantém as preocupações separadas e torna as melhorias de acessibilidade mais fáceis de implementar e manter à medida que a interface do usuário evolui. Para levar essa abordagem adiante em sua aplicação, tenha estas dicas em mente:

  * Use rótulos visíveis e conecte-os às entradas (via [`labelFor`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.controls/javafx/scene/control/Label.html#labelForProperty>)) para que as tecnologias assistivas anunciem o contexto correto.
  * Adicione metadados de acessibilidade (papel, descrição, texto, ajuda) quando os controles embutidos não fornecerem semântica suficiente, especialmente para nós personalizados.
  * Garanta que todos os elementos interativos sejam alcançáveis por teclado ([`setFocusTraversable(true)`](<https://download.java.net/java/GA/javafx26/docs/api/javafx.graphics/javafx/scene/Node.html##setFocusTraversable\(boolean\)>)) e se comportem de forma previsível com teclas padrão.
  * Forneça atalhos de teclado para ações comuns (por exemplo, `Ctrl+S` para salvar) para suportar fluxos de trabalho eficientes apenas com teclado.
  * Ofereça uma opção de alto contraste alternando folhas de estilo em tempo de execução, em vez de misturar a lógica do tema no código da interface do usuário.
  * Quando o estado da interface do usuário muda (como atualizações de status), reflita-o tanto visualmente quanto no texto acessível para que a saída do leitor de tela permaneça precisa.

Antes de finalizar, faça uma revisão rápida para confirmar que os pontos essenciais foram abordados: prefira controles JavaFX embutidos onde eles se encaixam, teste se a interface do usuário completa é utilizável apenas com navegação por teclado, certifique-se de que quaisquer componentes personalizados exponham texto e ajuda claros, e garanta que o estado e o significado sejam comunicados de mais de uma maneira (não apenas visualmente).

### Neste tutorial

Pré-requisitos Defina a Interface do Usuário Declarativamente Design para Acessibilidade Visual Conecte o Ponto de Entrada da Aplicação Adicione Rótulos e Ajuda Acessível Torne Nós Não Padrão Acessíveis Adicione Navegação por Teclado e Atalhos Implemente o Comportamento de Alternância de Alto Contraste Vincule a Opacidade e Exponha Atualizações de Status Junte Tudo Dicas Finais

Última atualização: 25 de março de 2026

**Anterior na Série**

[Introdução à API de Acessibilidade do JavaFX](<#/doc/tutorials/javafx/a11y/intro>)

➜

**Tutorial Atual**

Construa uma Aplicação JavaFX Acessível

➜

Este é o fim da série!

**Anterior na Série:** [Introdução à API de Acessibilidade do JavaFX](<#/doc/tutorials/javafx/a11y/intro>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Acessibilidade em JavaFX ](<#/doc/tutorials/javafx/a11y>) > Construa uma Aplicação JavaFX Acessível