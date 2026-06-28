# Pacotes

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Pacotes

# Pacotes

## Compreendendo Pacotes

Para tornar os tipos mais fáceis de encontrar e usar, para evitar conflitos de nomes e para controlar o acesso, os programadores agrupam tipos relacionados em pacotes.

> Definição: Um pacote é um agrupamento de tipos relacionados que fornece proteção de acesso e gerenciamento de namespace. Observe que tipos se refere a classes, interfaces, enumerações e tipos de anotação. Enumerações e tipos de anotação são tipos especiais de classes e interfaces, respectivamente, então os tipos são frequentemente referidos nesta seção simplesmente como classes e interfaces.

Os tipos que fazem parte da plataforma Java são membros de vários pacotes que agrupam classes por função: classes fundamentais estão em [`java.lang`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/package-summary.html>), classes para leitura e escrita (entrada e saída) estão em [`java.io`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/io/package-summary.html>), e assim por diante. Você também pode colocar seus tipos em pacotes.

Suponha que você escreva um grupo de classes que representam objetos gráficos, como círculos, retângulos, linhas e pontos. Você também escreve uma interface, `Draggable`, que as classes implementam se puderem ser arrastadas com o mouse.

Você deve agrupar essas classes e a interface em um pacote por várias razões, incluindo as seguintes:

  * Você e outros programadores podem facilmente determinar que esses tipos estão relacionados.
  * Você e outros programadores sabem onde encontrar tipos que podem fornecer funções relacionadas a gráficos.
  * Os nomes dos seus tipos não entrarão em conflito com os nomes de tipos em outros pacotes porque o pacote cria um novo namespace.
  * Você pode permitir que os tipos dentro do pacote tenham acesso irrestrito uns aos outros, mas ainda assim restringir o acesso para tipos fora do pacote.

## Criando um Pacote

Para criar um pacote, você escolhe um nome para o pacote (as convenções de nomenclatura são discutidas na próxima seção) e coloca uma declaração `package` com esse nome no topo de cada arquivo-fonte que contém os tipos (classes, interfaces, enumerações e tipos de anotação) que você deseja incluir no pacote.

A declaração `package` (por exemplo, `package graphics;`) deve ser a primeira linha no arquivo-fonte. Pode haver apenas uma declaração `package` em cada arquivo-fonte, e ela se aplica a todos os tipos no arquivo.

> Nota: Se você colocar vários tipos em um único arquivo-fonte, apenas um pode ser `public`, e ele deve ter o mesmo nome do arquivo-fonte. Por exemplo, você pode definir `public class Circle` no arquivo `Circle.java`, definir `public interface Draggable` no arquivo `Draggable.java`, definir `public enum Day` no arquivo `Day.java`, e assim por diante.
>
> Você pode incluir tipos não-public no mesmo arquivo que um tipo public (isso é fortemente desencorajado, a menos que os tipos não-public sejam pequenos e intimamente relacionados ao tipo public), mas apenas o tipo public será acessível de fora do pacote. Todos os tipos de nível superior não-public serão package private.

Se você colocar a interface e as classes gráficas listadas na seção anterior em um pacote chamado `graphics`, você precisaria de seis arquivos-fonte, assim:

Se você não usar uma declaração `package`, seu tipo acaba em um pacote sem nome. De modo geral, um pacote sem nome é apenas para aplicações pequenas ou temporárias ou quando você está apenas começando o processo de desenvolvimento. Caso contrário, classes e interfaces pertencem a pacotes nomeados.

## Nomeando um Pacote e Convenções de Nomenclatura

Com programadores em todo o mundo escrevendo classes e interfaces usando a linguagem de programação Java, é provável que muitos programadores usem o mesmo nome para tipos diferentes. De fato, o exemplo anterior faz exatamente isso: Ele define uma classe `Rectangle` quando já existe uma classe `Rectangle` no pacote [`java.awt`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.desktop/java/awt/package-summary.html>). Ainda assim, o compilador permite que ambas as classes tenham o mesmo nome se estiverem em pacotes diferentes. O nome totalmente qualificado de cada classe `Rectangle` inclui o nome do pacote. Ou seja, o nome totalmente qualificado da classe `Rectangle` no pacote `graphics` é `graphics.Rectangle`, e o nome totalmente qualificado da classe `Rectangle` no pacote [`java.awt`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.desktop/java/awt/package-summary.html>) é `java.awt.Rectangle`.

Isso funciona bem, a menos que dois programadores independentes usem o mesmo nome para seus pacotes. O que impede esse problema? Convenção.

Os nomes dos pacotes são escritos em letras minúsculas para evitar conflito com os nomes de classes ou interfaces.

Empresas usam o nome de domínio da Internet invertido para iniciar os nomes de seus pacotes — por exemplo, `com.example.mypackage` para um pacote chamado `mypackage` criado por um programador em `example.com`.

Colisões de nomes que ocorrem dentro de uma única empresa precisam ser tratadas por convenção dentro dessa empresa, talvez incluindo a região ou o nome do projeto após o nome da empresa (por exemplo, `com.example.region.mypackage`).

Pacotes na própria linguagem Java começam com `java.` ou `javax.`

Em alguns casos, o nome de domínio da internet pode não ser um nome de pacote válido. Isso pode ocorrer se o nome de domínio contiver um hífen ou outro caractere especial, se o nome do pacote começar com um dígito ou outro caractere que seja ilegal para usar como início de um nome Java, ou se o nome do pacote contiver uma palavra-chave Java reservada, como `int`. Neste caso, a convenção sugerida é adicionar um sublinhado. Por exemplo:

Domain Name | Package Name Prefix
---|---
`hyphenated-name.example.org` | `org.example.hyphenated_name`
`example.int` | `int_.example`
`123name.example.com` | `com.example._123name`

## Usando Membros de Pacote

Os tipos que compõem um pacote são conhecidos como membros do pacote.

Para usar um membro `public` de um pacote de fora de seu pacote, você deve fazer uma das seguintes ações:

  * Referir-se ao membro pelo seu nome totalmente qualificado
  * Importar o membro do pacote
  * Importar o pacote inteiro do membro

Cada um é apropriado para diferentes situações, conforme explicado nas seções seguintes.

### Referindo-se a um Membro de Pacote pelo Seu Nome Qualificado

Até agora, a maioria dos exemplos neste tutorial se referiu a tipos por seus nomes simples, como `Rectangle` e `StackOfInts`. Você pode usar o nome simples de um membro de pacote se o código que você está escrevendo estiver no mesmo pacote que esse membro ou se esse membro tiver sido importado.

No entanto, se você estiver tentando usar um membro de um pacote diferente e esse pacote não tiver sido importado, você deve usar o nome totalmente qualificado do membro, que inclui o nome do pacote. Aqui está o nome totalmente qualificado para a classe `Rectangle` declarada no pacote `graphics` no exemplo anterior.

Você poderia usar este nome qualificado para criar uma instância de `graphics.Rectangle`:

Nomes qualificados são aceitáveis para uso infrequente. Quando um nome é usado repetidamente, no entanto, digitar o nome várias vezes torna-se tedioso e o código se torna difícil de ler. Como alternativa, você pode importar o membro ou seu pacote e então usar seu nome simples.

### Importando um Membro de Pacote

Para importar um membro específico para o arquivo atual, coloque uma declaração `import` no início do arquivo antes de quaisquer definições de tipo, mas depois da declaração `package`, se houver uma. Veja como você importaria a classe `Rectangle` do pacote `graphics` criado na seção anterior.

Agora você pode se referir à classe `Rectangle` pelo seu nome simples.

Esta abordagem funciona bem se você usar apenas alguns membros do pacote `graphics`. Mas se você usar muitos tipos de um pacote, você deve importar o pacote inteiro.

### Importando um Pacote Inteiro

Para importar todos os tipos contidos em um pacote específico, use a declaração `import` com o caractere curinga asterisco (`*`).

Agora você pode se referir a qualquer classe ou interface no pacote `graphics` pelo seu nome simples.

O asterisco na declaração `import` pode ser usado apenas para especificar todas as classes dentro de um pacote, como mostrado aqui. Ele não pode ser usado para corresponder a um subconjunto das classes em um pacote. Por exemplo, o seguinte não corresponde a todas as classes no pacote `graphics` que começam com `A`.

Em vez disso, ele gera um erro de compilador. Com a declaração `import`, você geralmente importa apenas um único membro de pacote ou um pacote inteiro.

> Nota: Outra forma menos comum de `import` permite importar as classes aninhadas `public` de uma classe envolvente. Por exemplo, se a classe `graphics.Rectangle` contivesse classes aninhadas úteis, como `Rectangle.DoubleWide` e `Rectangle.Square`, você poderia importar `Rectangle` e suas classes aninhadas usando as duas declarações a seguir.

> Esteja ciente de que a segunda declaração `import` não importará `Rectangle`.
>
> Outra forma menos comum de `import`, a declaração _static import_, será discutida no final desta seção.

Por conveniência, o compilador Java importa automaticamente dois pacotes inteiros para cada arquivo-fonte:

  1. o pacote [`java.lang`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/package-summary.html>) e
  2. o pacote atual (o pacote para o arquivo atual).

### Hierarquias Aparentes de Pacotes

À primeira vista, os pacotes parecem ser hierárquicos, mas não são. Por exemplo, a API Java inclui um pacote [`java.awt`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.desktop/java/awt/package-summary.html>), um pacote [`java.awt.color`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.desktop/java/awt/color/package-summary.html>), um pacote [`java.awt.font`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.desktop/java/awt/font/package-summary.html>), e muitos outros que começam com [`java.awt`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.desktop/java/awt/package-summary.html>). No entanto, o pacote [`java.awt.color`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.desktop/java/awt/color/package-summary.html>), o pacote [`java.awt.font`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.desktop/java/awt/font/package-summary.html>), e outros pacotes `java.awt.xxxx` não estão incluídos no pacote [`java.awt`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.desktop/java/awt/package-summary.html>). O prefixo [`java.awt`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.desktop/java/awt/package-summary.html>) (o Java Abstract Window Toolkit) é usado para vários pacotes relacionados para tornar a relação evidente, mas não para mostrar inclusão.

Importar `java.awt.*` importa todos os tipos no pacote [`java.awt`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.desktop/java/awt/package-summary.html>), mas não importa [`java.awt.color`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.desktop/java/awt/color/package-summary.html>), [`java.awt.font`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.desktop/java/awt/font/package-summary.html>), ou quaisquer outros pacotes `java.awt.xxxx`. Se você planeja usar as classes e outros tipos em [`java.awt.color`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.desktop/java/awt/color/package-summary.html>) assim como aqueles em [`java.awt`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.desktop/java/awt/package-summary.html>), você deve importar ambos os pacotes com todos os seus arquivos:

### Ambigüidades de Nomes

Se um membro em um pacote compartilha seu nome com um membro em outro pacote e ambos os pacotes são importados, você deve se referir a cada membro pelo seu nome qualificado. Por exemplo, o pacote `graphics` definiu uma classe chamada `Rectangle`. O pacote [`java.awt`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.desktop/java/awt/package-summary.html>) também contém uma classe `Rectangle`. Se `graphics` e [`java.awt`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.desktop/java/awt/package-summary.html>) foram importados, o seguinte é ambíguo.

Em tal situação, você deve usar o nome totalmente qualificado do membro para indicar exatamente qual classe `Rectangle` você deseja. Por exemplo,

### A Declaração Static Import

Existem situações em que você precisa de acesso frequente a campos `static final` (constantes) e métodos `static` de uma ou duas classes. Prefixar o nome dessas classes repetidamente pode resultar em código poluído. A declaração _static import_ oferece uma maneira de importar as constantes e os métodos `static` que você deseja usar, para que você não precise prefixar o nome de sua classe.

A classe [`java.lang.Math`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html>) define a constante [`PI`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/lang/Math.html#PI>) e muitos métodos `static`, incluindo métodos para calcular senos, cossenos, tangentes, raízes quadradas, máximos, mínimos, expoentes e muitos mais. Por exemplo,

Normalmente, para usar esses objetos de outra classe, você prefixa o nome da classe, como segue.

Você pode usar a declaração `static import` para importar os membros `static` de `java.lang.Math` para que você não precise prefixar o nome da classe, `Math`. Os membros `static` de `Math` podem ser importados individualmente:

ou como um grupo:

Uma vez importados, os membros `static` podem ser usados sem qualificação. Por exemplo, o trecho de código anterior se tornaria:

Obviamente, você pode escrever suas próprias classes que contêm constantes e métodos `static` que você usa frequentemente, e então usar a declaração `static import`. Por exemplo,

> Nota: Use `static import` com muita moderação. O uso excessivo de `static import` pode resultar em código difícil de ler e manter, porque os leitores do código não saberão qual classe define um objeto `static` específico. Usado corretamente, `static import` torna o código mais legível, removendo a repetição do nome da classe.

## Concluindo sobre Pacotes

Para criar um pacote para um tipo, coloque uma declaração `package` como a primeira declaração no arquivo-fonte que contém o tipo (classe, interface, enumeração ou tipo de anotação).

Para usar um tipo `public` que está em um pacote diferente, você tem três escolhas:

  1. usar o nome totalmente qualificado do tipo,
  2. importar o tipo, ou
  3. importar o pacote inteiro do qual o tipo é membro.

Os nomes de caminho para os arquivos-fonte e de classe de um pacote espelham o nome do pacote.

Você pode ter que configurar seu `CLASSPATH` para que o compilador e a JVM possam encontrar os arquivos `.class` para seus tipos.

### Neste tutorial

Compreendendo Pacotes Criando um Pacote Nomeando um Pacote e Convenções de Nomenclatura Usando Membros de Pacote Concluindo sobre Pacotes

Última atualização: 14 de setembro de 2021

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Pacotes

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)