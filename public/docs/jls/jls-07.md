# Pacotes e Módulos

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Especificações Java SE](<#/>) > [Especificação da Linguagem Java](<#/doc/jls/jls-01>)

Capítulo 7. Pacotes e Módulos
---
[Anterior](<#/doc/jls/jls-06>) | | [Próximo](<#/doc/jls/jls-08>)
  
* * *

# Capítulo 7. Pacotes e Módulos

**Sumário**

[7.1. Membros do Pacote](<#/doc/jls/jls-07>)
[7.2. Suporte do Host para Módulos e Pacotes](<#/doc/jls/jls-07>)
[7.3. Unidades de Compilação](<#/doc/jls/jls-07>)
[7.4. Declarações de Pacote](<#/doc/jls/jls-07>)
    

[7.4.1. Pacotes Nomeados](<#/doc/jls/jls-07>)
[7.4.2. Pacotes Sem Nome](<#/doc/jls/jls-07>)
[7.4.3. Observabilidade e Visibilidade de Pacotes](<#/doc/jls/jls-07>)
[7.5. Declarações de Importação](<#/doc/jls/jls-07>)
    

[7.5.1. Declarações de Importação de Tipo Único](<#/doc/jls/jls-07>)
[7.5.2. Declarações de Importação de Tipo Sob Demanda](<#/doc/jls/jls-07>)
[7.5.3. Declarações de Importação Estática Única](<#/doc/jls/jls-07>)
[7.5.4. Declarações de Importação Estática Sob Demanda](<#/doc/jls/jls-07>)
[7.5.5. Declarações de Importação de Módulo Único](<#/doc/jls/jls-07>)
[7.6. Declarações de Classes e Interfaces de Nível Superior](<#/doc/jls/jls-07>)
[7.7. Declarações de Módulo](<#/doc/jls/jls-07>)
    

[7.7.1. Dependências](<#/doc/jls/jls-07>)
[7.7.2. Pacotes Exportados e Abertos](<#/doc/jls/jls-07>)
[7.7.3. Consumo de Serviço](<#/doc/jls/jls-07>)
[7.7.4. Provisão de Serviço](<#/doc/jls/jls-07>)
[7.7.5. Módulos Sem Nome](<#/doc/jls/jls-07>)
[7.7.6. Observabilidade de um Módulo](<#/doc/jls/jls-07>)

Programas são organizados como conjuntos de pacotes. Os membros de um pacote ([§7.1](<#/doc/jls/jls-07>)) são classes e interfaces, que são declaradas em unidades de compilação do pacote, e subpacotes, que podem conter unidades de compilação e subpacotes próprios.

Cada pacote tem seu próprio conjunto de nomes para classes e interfaces, o que ajuda a prevenir conflitos de nomes. A estrutura de nomenclatura para pacotes é hierárquica.

Se um conjunto de pacotes for suficientemente coeso, então os pacotes podem ser agrupados em um módulo. Um módulo categoriza alguns ou todos os seus pacotes como _exportados_, o que significa que suas classes e interfaces podem ser acessadas por código fora do módulo. Se um pacote não for exportado por um módulo, então apenas o código dentro do módulo pode acessar suas classes e interfaces. Além disso, se o código em um módulo deseja acessar os pacotes exportados por outro módulo, então o primeiro módulo deve depender explicitamente do segundo módulo. Assim, um módulo controla como seus pacotes usam outros módulos (especificando dependências) e controla como outros módulos usam seus pacotes (especificando quais de seus pacotes são exportados).

Módulos e pacotes podem ser armazenados em um sistema de arquivos ou em um banco de dados ([§7.2](<#/doc/jls/jls-07>)). Módulos e pacotes que são armazenados em um sistema de arquivos podem ter certas restrições na organização de suas unidades de compilação para permitir que uma implementação simples encontre declarações de módulos, classes e interfaces facilmente.

O código em uma unidade de compilação tem acesso automaticamente a todas as classes e interfaces declaradas em seu pacote e também importa automaticamente todas as classes e interfaces `public` declaradas no pacote predefinido `java.lang`.

Uma classe ou interface de nível superior é acessível ([§6.6](<#/doc/jls/jls-06>)) fora do pacote que a declara somente se a classe ou interface for declarada `public`. Uma classe ou interface de nível superior é acessível fora do módulo que a declara somente se a classe ou interface for declarada `public` e for membro de um pacote exportado. Uma classe ou interface que é declarada `public` mas não é membro de um pacote exportado é acessível apenas ao código dentro do módulo.

Para programas pequenos e desenvolvimento casual, um pacote pode ser sem nome ([§7.4.2](<#/doc/jls/jls-07>)) ou ter um nome simples, mas se o código for distribuído amplamente, nomes de pacotes únicos devem ser escolhidos usando nomes qualificados. Isso pode prevenir os conflitos que de outra forma ocorreriam se dois grupos de desenvolvimento escolhessem o mesmo nome de pacote e esses pacotes fossem posteriormente usados em um único programa.

## 7.1. Membros do Pacote

Os membros de um pacote são seus subpacotes e todas as classes de nível superior ([§8 (_Classes_)](<#/doc/jls/jls-08>)) e interfaces de nível superior ([§9 (_Interfaces_)](<#/doc/jls/jls-09>)) declaradas em todas as unidades de compilação ([§7.3](<#/doc/jls/jls-07>)) do pacote.

Por exemplo, na API da Plataforma Java SE:

  * O pacote `java` tem os subpacotes `awt`, `applet`, `io`, `lang`, `net` e `util`, mas nenhuma unidade de compilação.

  * O pacote `java.awt` tem um subpacote chamado `image`, bem como várias unidades de compilação contendo declarações de classes e interfaces.

Se o nome totalmente qualificado ([§6.7](<#/doc/jls/jls-06>)) de um pacote é `P`, e `Q` é um subpacote de `P`, então `P.Q` é o nome totalmente qualificado do subpacote, e além disso denota um pacote.

Um pacote não pode conter dois membros com o mesmo nome, ou um erro em tempo de compilação resulta.

Aqui estão alguns exemplos:

  * Como o pacote `java.awt` tem um subpacote `image`, ele não pode (e não contém) uma declaração de uma classe ou interface chamada `image`.

  * Se houver um pacote chamado `mouse` e uma classe membro `Button` nesse pacote (que então poderia ser referida como `mouse.Button`), então não pode haver nenhum pacote com o nome totalmente qualificado `mouse.Button` ou `mouse.Button.Click`.

  * Se `com.nighthacks.java.jag` é o nome totalmente qualificado de uma classe, então não pode haver nenhum pacote cujo nome totalmente qualificado seja `com.nighthacks.java.jag` ou `com.nighthacks.java.jag.scrabble`.

É possível, no entanto, que membros de pacotes diferentes tenham o mesmo nome simples. Por exemplo, é possível declarar um pacote:
```java
    
    package vector;
    public class Vector { Object[] vec; }
    
    
```

que tem como membro uma classe `public` chamada `Vector`, embora o pacote `java.util` também declare uma classe chamada `Vector`. Essas duas classes são diferentes, refletido pelo fato de terem nomes totalmente qualificados diferentes ([§6.7](<#/doc/jls/jls-06>)). O nome totalmente qualificado deste exemplo `Vector` é `vector.Vector`, enquanto `java.util.Vector` é o nome totalmente qualificado da classe `Vector` incluída na Plataforma Java SE. Como o pacote `vector` contém uma classe chamada `Vector`, ele não pode ter também um subpacote chamado `Vector`.

A estrutura de nomenclatura hierárquica para pacotes destina-se a ser conveniente para organizar pacotes relacionados de maneira convencional, mas não tem significado em si mesma, além da proibição de um pacote ter um subpacote com o mesmo nome simples de uma classe ou interface de nível superior ([§7.6](<#/doc/jls/jls-07>)) declarada nesse pacote.

Por exemplo, não há relação de acesso especial entre um pacote chamado `oliver` e outro pacote chamado `oliver.twist`, ou entre pacotes chamados `evelyn.wood` e `evelyn.waugh`. Ou seja, o código em um pacote chamado `oliver.twist` não tem melhor acesso às classes e interfaces declaradas dentro do pacote `oliver` do que o código em qualquer outro pacote.

## 7.2. Suporte do Host para Módulos e Pacotes

Cada sistema host determina como módulos, pacotes e unidades de compilação são criados e armazenados.

Cada sistema host determina quais unidades de compilação são _observáveis_ em uma compilação específica ([§7.3](<#/doc/jls/jls-07>)). Cada sistema host também determina quais unidades de compilação observáveis estão _associadas a_ um módulo. A observabilidade das unidades de compilação associadas a um módulo determina quais módulos são observáveis ([§7.7.6](<#/doc/jls/jls-07>)) e quais pacotes são visíveis dentro desses módulos ([§7.4.3](<#/doc/jls/jls-07>)).

O sistema host é livre para determinar que uma unidade de compilação que contém uma declaração de módulo não é, de fato, observável, e, portanto, não está associada ao módulo declarado nela. Isso permite que um compilador escolha qual diretório em um `modulesourcepath` é "realmente" a incorporação de um determinado módulo. No entanto, se o sistema host determinar que uma unidade de compilação que contém uma declaração de módulo _é_ observável, então [§7.4.3](<#/doc/jls/jls-07>) exige que a unidade de compilação seja associada ao módulo declarado nela, e não a qualquer outro módulo.

O sistema host é livre para determinar que uma unidade de compilação que contém uma declaração de classe ou interface é (primeiro) observável e (segundo) associada a um módulo sem nome ou a um módulo automático - apesar de não existir nenhuma declaração de módulo sem nome ou automático em qualquer unidade de compilação, observável ou não.

Em implementações simples da Plataforma Java SE, pacotes e unidades de compilação podem ser armazenados em um sistema de arquivos local. Outras implementações podem armazená-los usando um sistema de arquivos distribuído ou alguma forma de banco de dados.

Se um sistema host armazena pacotes e unidades de compilação em um banco de dados, então o banco de dados não deve impor as restrições opcionais ([§7.6](<#/doc/jls/jls-07>)) em unidades de compilação permitidas em implementações baseadas em arquivos.

Por exemplo, um sistema que usa um banco de dados para armazenar pacotes pode não impor um máximo de uma classe ou interface pública por unidade de compilação.

Sistemas que usam um banco de dados devem, no entanto, fornecer uma opção para converter um programa para uma forma que obedeça às restrições, para fins de exportação para implementações baseadas em arquivos.

Como um exemplo extremamente simples de armazenamento de pacotes em um sistema de arquivos, todos os pacotes e código-fonte e binário em um projeto podem ser armazenados em um único diretório e seus subdiretórios. Cada subdiretório imediato deste diretório representaria um pacote de nível superior, ou seja, um cujo nome totalmente qualificado consiste em um único nome simples. Cada nível adicional de subdiretório representaria um subpacote do pacote representado pelo diretório contendo, e assim por diante.

O diretório pode conter os seguintes subdiretórios imediatos:
```
    com
    gls
    jag
    java
    wnj
    
```

onde o diretório `java` conteria os pacotes da Plataforma Java SE; os diretórios `jag`, `gls` e `wnj` poderiam conter pacotes que três dos autores desta especificação criaram para uso pessoal e para compartilhar entre si dentro deste pequeno grupo; e o diretório `com` conteria pacotes adquiridos de empresas que usaram as convenções descritas em [§6.1](<#/doc/jls/jls-06>) para gerar nomes únicos para seus pacotes.

Continuando o exemplo, o diretório `java` conteria, entre outros, os seguintes subdiretórios:
```
    applet
    awt
    io
    lang
    net
    util
    
```

correspondendo aos pacotes `java.applet`, `java.awt`, `java.io`, `java.lang`, `java.net` e `java.util` que são definidos como parte da API da Plataforma Java SE.

Ainda continuando o exemplo, se olhássemos dentro do diretório `util`, poderíamos ver os seguintes arquivos:
```
    BitSet.java        Observable.java
    BitSet.class       Observable.class
    Date.java          Observer.java
    Date.class         Observer.class
    ...
    
```

onde cada um dos arquivos `.java` contém o código-fonte para uma unidade de compilação ([§7.3](<#/doc/jls/jls-07>)) que contém a definição de uma classe ou interface cuja forma binária compilada está contida no arquivo `.class` correspondente.

Sob esta organização simples de pacotes, uma implementação da Plataforma Java SE transformaria um nome de pacote em um nome de caminho concatenando os componentes do nome do pacote, colocando um separador de nome de arquivo (indicador de diretório) entre componentes adjacentes.

Por exemplo, se esta organização simples fosse usada em um sistema operacional onde o separador de nome de arquivo é `/`, o nome do pacote:
```
    jag.scrabble.board
    
```

seria transformado no nome do diretório:
```
    jag/scrabble/board
    
```

Um componente de nome de pacote ou nome de classe pode conter um caractere que não pode aparecer corretamente no nome de diretório comum de um sistema de arquivos host, como um caractere Unicode em um sistema que permite apenas caracteres ASCII em nomes de arquivos. Por convenção, o caractere pode ser escapado usando, por exemplo, o caractere `@` seguido por quatro dígitos hexadecimais que fornecem o valor numérico do caractere, como no escape `\u _xxxx_` ([§3.3](<#/doc/jls/jls-03>)).

Sob esta convenção, o nome do pacote:
```
    children.activities.crafts.papierM\u00e2ch\u00e9
    
```

que também pode ser escrito usando Unicode completo como:
```
    children.activities.crafts.papierMache
    
```

poderia ser mapeado para o nome do diretório:
```
    children/activities/crafts/papierM@00e2ch@00e9
    
```

Se o caractere `@` não for um caractere válido em um nome de arquivo para um determinado sistema de arquivos host, então algum outro caractere que não seja válido em um identificador poderia ser usado em seu lugar.

## 7.3. Unidades de Compilação

`CompilationUnit` é o símbolo objetivo ([§2.1](<#/doc/jls/jls-02>)) para a gramática sintática ([§2.3](<#/doc/jls/jls-02>)) de programas Java. É definido pela seguinte produção:

CompilationUnit:

[OrdinaryCompilationUnit](<#/doc/jls/jls-07>)   
[CompactCompilationUnit](<#/doc/jls/jls-07>)   
[ModularCompilationUnit](<#/doc/jls/jls-07>)

OrdinaryCompilationUnit:

[[PackageDeclaration](<#/doc/jls/jls-07>)] {[ImportDeclaration](<#/doc/jls/jls-07>)} {[TopLevelClassOrInterfaceDeclaration](<#/doc/jls/jls-07>)}

CompactCompilationUnit:

{[ImportDeclaration](<#/doc/jls/jls-07>)} {[ClassMemberDeclarationNoMethod](<#/doc/jls/jls-07>)} [MethodDeclaration](<#/doc/jls/jls-08>) {[ClassMemberDeclaration](<#/doc/jls/jls-08>)}

ClassMemberDeclarationNoMethod:

[FieldDeclaration](<#/doc/jls/jls-08>)   
[ClassDeclaration](<#/doc/jls/jls-08>)   
[InterfaceDeclaration](<#/doc/jls/jls-09>)   
`;`

ModularCompilationUnit:

{[ImportDeclaration](<#/doc/jls/jls-07>)} [ModuleDeclaration](<#/doc/jls/jls-07>)

Uma _unidade de compilação ordinária_ consiste em três partes, cada uma das quais é opcional:

  * Uma declaração `package` ([§7.4](<#/doc/jls/jls-07>)), fornecendo o nome totalmente qualificado ([§6.7](<#/doc/jls/jls-06>)) do pacote ao qual a unidade de compilação pertence.

Uma unidade de compilação que não possui declaração `package` faz parte de um pacote sem nome ([§7.4.2](<#/doc/jls/jls-07>)).

  * Declarações `import` ([§7.5](<#/doc/jls/jls-07>)) que permitem que classes e interfaces de outros pacotes, e membros `static` de classes e interfaces, sejam referidos usando seus nomes simples.

  * Declarações de nível superior de classes e interfaces ([§7.6](<#/doc/jls/jls-07>)).

Uma _unidade de compilação compacta_ consiste em uma sequência não vazia de declarações de membros de classe, pelo menos uma das quais deve ser uma declaração de método ([§8.4](<#/doc/jls/jls-08>)), opcionalmente precedida por declarações `import`. Declarações de métodos, campos, classes e interfaces são permitidas em qualquer ordem após as declarações `import` (se houver), como seriam em um corpo de classe ([§8.1.7](<#/doc/jls/jls-08>)).

Isso significa que a seguinte unidade de compilação é inequivocamente uma unidade de compilação ordinária:
```java
    
    import java.util.Vector;
    class Test { ... }
    
    
```

enquanto a seguinte é inequivocamente uma unidade de compilação compacta:
```java
    
    import java.util.Vector;
    static void main(){ ... }
    class Test { ... }
    
    
```

Uma unidade de compilação compacta declara implicitamente uma classe de nível superior ([§7.6](<#/doc/jls/jls-07>)) cujos membros são os métodos, campos, classes e interfaces declarados na unidade de compilação compacta. Os detalhes da classe são especificados em [§8.1.8](<#/doc/jls/jls-08>).

Uma _unidade de compilação modular_ consiste em uma declaração `module` ([§7.7](<#/doc/jls/jls-07>)), opcionalmente precedida por declarações `import`. As declarações `import` permitem que classes e interfaces de pacotes neste módulo e em outros módulos, bem como membros `static` de classes e interfaces, sejam referidos usando seus nomes simples dentro da declaração `module`.

Cada unidade de compilação importa implicitamente cada classe ou interface `public` declarada no pacote predefinido `java.lang`, como se a declaração `import java.lang.*;` aparecesse no início de cada unidade de compilação imediatamente após qualquer declaração `package`. Como resultado, os nomes de todas essas classes e interfaces estão disponíveis como nomes simples em cada unidade de compilação.

Cada unidade de compilação compacta importa implicitamente todas as classes e interfaces `public` de nível superior dos pacotes exportados pelo módulo `java.base`, como se a declaração `import module java.base;` aparecesse no início de cada unidade de compilação compacta ([§7.5.5](<#/doc/jls/jls-07>)). Como resultado, os nomes de todas essas classes e interfaces estão disponíveis como nomes simples em cada unidade de compilação compacta.

O sistema host determina quais unidades de compilação são _observáveis_, exceto pelas unidades de compilação no pacote predefinido `java` e seus subpacotes `lang` e `io`, que são sempre observáveis.

Cada unidade de compilação observável pode ser _associada_ a um módulo, da seguinte forma:

  * O sistema host pode determinar que uma unidade de compilação ordinária observável está associada a um módulo escolhido pelo sistema host, exceto por (i) as unidades de compilação ordinárias no pacote predefinido `java` e seus subpacotes `lang` e `io`, que estão todas associadas ao módulo `java.base`, e (ii) qualquer unidade de compilação ordinária em um pacote sem nome, que está associada a um módulo conforme especificado em [§7.4.2](<#/doc/jls/jls-07>).

  * O sistema host deve determinar que uma unidade de compilação modular observável está associada ao módulo declarado pela unidade de compilação modular.

A observabilidade de uma unidade de compilação influencia a observabilidade de seu pacote ([§7.4.3](<#/doc/jls/jls-07>)), enquanto a associação de uma unidade de compilação observável a um módulo influencia a observabilidade desse módulo ([§7.7.6](<#/doc/jls/jls-07>)).

Ao compilar as unidades de compilação modulares e ordinárias associadas a um módulo `M`, o sistema host deve respeitar as dependências especificadas na declaração de `M`. Especificamente, o sistema host deve limitar as unidades de compilação ordinárias que de outra forma seriam observáveis, apenas àquelas que são _visíveis para `M`_. As unidades de compilação ordinárias que são visíveis para `M` são as unidades de compilação ordinárias observáveis associadas aos módulos que são _lidos por `M`_. Os módulos lidos por `M` são dados pelo resultado da _resolução_, conforme descrito na especificação do pacote `java.lang.module`, com `M` como o único módulo raiz. O sistema host deve realizar a resolução para determinar os módulos lidos por `M`; é um erro em tempo de compilação se a resolução falhar por qualquer um dos motivos descritos na especificação do pacote `java.lang.module`.

A relação de legibilidade é reflexiva, então `M` lê a si mesmo, e assim todas as unidades de compilação modulares e ordinárias associadas a `M` são visíveis para `M`.

Os módulos lidos por `M` impulsionam os pacotes que são unicamente visíveis para `M` ([§7.4.3](<#/doc/jls/jls-07>)), o que por sua vez impulsiona tanto os pacotes de nível superior no escopo quanto o significado dos nomes de pacotes para o código nas unidades de compilação modulares e ordinárias associadas a `M` ([§6.3](<#/doc/jls/jls-06>), [§6.5.3](<#/doc/jls/jls-06>), [§6.5.5](<#/doc/jls/jls-06>)).

As regras acima garantem que os nomes de pacotes e tipos usados em anotações em uma unidade de compilação modular (em particular, anotações aplicadas à declaração do módulo) são interpretados como se aparecessem em uma unidade de compilação ordinária associada ao módulo.

Classes e interfaces declaradas em diferentes unidades de compilação ordinárias podem se referir umas às outras, circularmente. Um compilador Java deve providenciar a compilação de todas essas classes e interfaces ao mesmo tempo.
## 7.4. Declarações de Pacote

Uma declaração `package` aparece dentro de uma unidade de compilação comum para indicar o pacote ao qual a unidade de compilação pertence.

### 7.4.1. Pacotes Nomeados

Uma _declaração de pacote_ em uma unidade de compilação comum especifica o nome ([§6.2](<#/doc/jls/jls-06>)) do pacote ao qual a unidade de compilação pertence.

PackageDeclaration:

{[PackageModifier](<#/doc/jls/jls-07>)} `package` [Identifier](<#/doc/jls/jls-03>) {`.` [Identifier](<#/doc/jls/jls-03>)} `;`

PackageModifier:

[Annotation](<#/doc/jls/jls-09>)

O nome do pacote mencionado em uma declaração `package` deve ser o nome totalmente qualificado do pacote ([§6.7](<#/doc/jls/jls-06>)).

O escopo e o sombreamento de uma declaração de pacote são especificados em [§6.3](<#/doc/jls/jls-06>) e [§6.4](<#/doc/jls/jls-06>).

As regras relativas aos modificadores de anotação para uma declaração de pacote são especificadas em [§9.7.4](<#/doc/jls/jls-09>) e [§9.7.5](<#/doc/jls/jls-09>).

É permitida no máximo uma declaração `package` anotada para um dado pacote.

A maneira pela qual essa restrição é imposta deve, por necessidade, variar de implementação para implementação. O esquema a seguir é fortemente recomendado para implementações baseadas em sistema de arquivos: A única declaração `package` anotada, se existir, é colocada em um arquivo de código-fonte chamado `package-info.java` no diretório que contém os arquivos de código-fonte para o pacote. Este arquivo não contém o código-fonte para uma classe chamada `package-info`; de fato, seria ilegal fazê-lo, pois `package-info` não é um identificador legal. Tipicamente, `package-info.java` contém apenas uma declaração `package`, precedida imediatamente pelas anotações no pacote. Embora o arquivo pudesse tecnicamente conter o código-fonte para uma ou mais classes com acesso de pacote, seria uma prática muito ruim.

Recomenda-se que `package-info.java`, se presente, substitua `package.html` para `javadoc` e outros sistemas similares de geração de documentação. Se este arquivo estiver presente, a ferramenta de geração de documentação deve procurar o comentário de documentação do pacote imediatamente antes da declaração `package` (possivelmente anotada) em `package-info.java`. Dessa forma, `package-info.java` se torna o único repositório para anotações e documentação em nível de pacote. Se, no futuro, for desejável adicionar qualquer outra informação em nível de pacote, este arquivo deve se mostrar um local conveniente para essa informação.

### 7.4.2. Pacotes Sem Nome

Uma unidade de compilação compacta, ou uma unidade de compilação comum que não possui uma declaração `package` mas possui pelo menos outro tipo de declaração, faz parte de um _pacote sem nome_.

Pacotes sem nome são fornecidos pela Plataforma Java SE principalmente para conveniência ao desenvolver aplicações pequenas ou temporárias ou ao iniciar o desenvolvimento.

Um pacote sem nome não pode ter subpacotes, pois a sintaxe de uma declaração `package` sempre inclui uma referência a um pacote de nível superior nomeado.

Uma implementação da Plataforma Java SE deve suportar pelo menos um pacote sem nome. Uma implementação pode suportar mais de um pacote sem nome, mas não é obrigada a fazê-lo. Quais unidades de compilação comuns estão em cada pacote sem nome é determinado pelo sistema hospedeiro.

O sistema hospedeiro deve associar unidades de compilação comuns em um pacote sem nome a um módulo sem nome ([§7.7.5](<#/doc/jls/jls-07>)), e não a um módulo nomeado.

**Exemplo 7.4.2-1. Pacote Sem Nome**

A unidade de compilação:
```
    class FirstCall {
        public static void main(String[] args) {
            System.out.println("Mr. Watson, come here. "
                               + "I want you.");
        }
    }
    
```

define uma unidade de compilação muito simples como parte de um pacote sem nome.

Em implementações da Plataforma Java SE que usam um sistema de arquivos hierárquico para armazenar pacotes, uma estratégia típica é associar um pacote sem nome a cada diretório; apenas um pacote sem nome é observável por vez, ou seja, aquele que está associado ao "diretório de trabalho atual". O significado preciso de "diretório de trabalho atual" depende do sistema hospedeiro.

### 7.4.3. Observabilidade e Visibilidade de Pacotes

Um pacote é _observável_ se e somente se pelo menos uma das seguintes condições for verdadeira:

*   Uma unidade de compilação comum contendo uma declaração do pacote é observável ([§7.3](<#/doc/jls/jls-07>)).

*   Um subpacote do pacote é observável.

Os pacotes `java`, `java.lang` e `java.io` são sempre observáveis.

Pode-se concluir isso a partir da regra acima e das regras de unidades de compilação observáveis, da seguinte forma. O pacote predefinido `java.lang` declara a classe `Object`, então a unidade de compilação para `Object` é sempre observável ([§7.3](<#/doc/jls/jls-07>)). Consequentemente, o pacote `java.lang` é observável, e o pacote `java` também. Além disso, como `Object` é observável, o tipo de array `Object`[]` existe implicitamente. Sua superinterface `java.io.Serializable` ([§10.1](<#/doc/jls/jls-10>)) também existe, portanto, o pacote `java.io` é observável.

Um pacote é _visível para um módulo `M`_ se e somente se uma unidade de compilação comum contendo uma declaração do pacote for visível para `M`.

A visibilidade de pacote significa que um pacote é observável de uma maneira útil para um dado módulo. Geralmente não é útil saber que o pacote P é observável meramente porque um subpacote P.Q é observável. Por exemplo, suponha que P.Q seja observável (no módulo M1) e P.R seja observável (no módulo M2); então, P é observável, mas onde? Em M1, ou M2, ou ambos? A pergunta é redundante; durante a compilação do módulo N que requer apenas M1, importa que P.Q seja observável, mas não importa que P seja observável.

Um pacote é _unicamente visível para um módulo `M`_ se e somente se uma das seguintes condições for verdadeira:

*   Uma unidade de compilação comum associada a `M` contém uma declaração do pacote, e `M` não lê nenhum outro módulo que exporte o pacote para `M`.

*   Nenhuma unidade de compilação comum associada a `M` contém uma declaração do pacote, e `M` lê exatamente um outro módulo que exporta o pacote para `M`.

## 7.5. Declarações de Importação

Uma _declaração de importação_ permite que uma classe, interface ou membro `static` nomeado seja referido por um nome simples ([§6.2](<#/doc/jls/jls-06>)) que consiste em um único identificador.

Sem o uso de uma declaração de importação apropriada, uma referência a uma classe ou interface declarada em outro pacote, ou uma referência a um membro `static` de outra classe ou interface, normalmente precisaria usar um nome totalmente qualificado ([§6.7](<#/doc/jls/jls-06>)).

ImportDeclaration:

[SingleTypeImportDeclaration](<#/doc/jls/jls-07>)   
[TypeImportOnDemandDeclaration](<#/doc/jls/jls-07>)   
[SingleStaticImportDeclaration](<#/doc/jls/jls-07>)   
[StaticImportOnDemandDeclaration](<#/doc/jls/jls-07>)   
[SingleModuleImportDeclaration](<#/doc/jls/jls-07>)

*   Uma declaração de importação de tipo único ([§7.5.1](<#/doc/jls/jls-07>)) importa uma única classe ou interface nomeada, mencionando seu nome canônico ([§6.7](<#/doc/jls/jls-06>)).

*   Uma declaração de importação de tipo sob demanda ([§7.5.2](<#/doc/jls/jls-07>)) importa todas as classes e interfaces acessíveis de um pacote, classe ou interface nomeado conforme necessário, mencionando o nome canônico do pacote, classe ou interface.

*   Uma declaração de importação estática única ([§7.5.3](<#/doc/jls/jls-07>)) importa todos os membros `static` acessíveis com um dado nome de uma classe ou interface, fornecendo seu nome canônico.

*   Uma declaração de importação estática sob demanda ([§7.5.4](<#/doc/jls/jls-07>)) importa todos os membros `static` acessíveis de uma classe ou interface nomeada conforme necessário, mencionando o nome canônico da classe ou interface.

*   Uma declaração de importação de módulo único ([§7.5.5](<#/doc/jls/jls-07>)) importa todas as classes e interfaces acessíveis dos pacotes exportados por um módulo nomeado, conforme necessário.

O escopo e o sombreamento de uma classe, interface ou membro importado por essas declarações são especificados em [§6.3](<#/doc/jls/jls-06>) e [§6.4](<#/doc/jls/jls-06>).

Uma declaração `import` torna classes, interfaces ou membros disponíveis por seus nomes simples apenas dentro da unidade de compilação que realmente contém a declaração `import`. O escopo da(s) classe(s), interface(s) ou membro(s) introduzido(s) por uma declaração `import` especificamente não inclui outras unidades de compilação no mesmo pacote, outras declarações `import` na unidade de compilação atual, ou uma declaração `package` na unidade de compilação atual (exceto pelas anotações de uma declaração `package`).

### 7.5.1. Declarações de Importação de Tipo Único

Uma _declaração de importação de tipo único_ importa uma única classe ou interface fornecendo seu nome canônico, tornando-a disponível sob um nome simples nas declarações de módulo, classe e interface da unidade de compilação em que a declaração de importação de tipo único aparece.

SingleTypeImportDeclaration:

`import` [TypeName](<#/doc/jls/jls-06>) `;`

O _TypeName_ deve ser o nome canônico de uma classe ou interface ([§6.7](<#/doc/jls/jls-06>)).

A classe ou interface deve ser um membro de um pacote nomeado, ou um membro de uma classe ou interface cuja declaração de classe ou interface lexicamente envolvente mais externa ([§8.1.3](<#/doc/jls/jls-08>)) é um membro de um pacote nomeado, ou ocorre um erro em tempo de compilação.

É um erro em tempo de compilação se a classe ou interface nomeada não for acessível ([§6.6](<#/doc/jls/jls-06>)).

Se duas declarações de importação de tipo único na mesma unidade de compilação tentarem importar classes ou interfaces com o mesmo nome simples, então ocorre um erro em tempo de compilação, a menos que as duas classes ou interfaces sejam as mesmas, caso em que a declaração duplicada é ignorada.

Se a classe ou interface importada pela declaração de importação de tipo único for declarada como uma classe ou interface de nível superior ([§7.6](<#/doc/jls/jls-07>)) na unidade de compilação que contém a declaração `import`, então a declaração `import` é ignorada.

Se uma declaração de importação de tipo único importa uma classe ou interface cujo nome simples é `x`, e a unidade de compilação também declara uma classe ou interface de nível superior cujo nome simples é `x`, ocorre um erro em tempo de compilação.

Se uma unidade de compilação contém tanto uma declaração de importação de tipo único que importa uma classe ou interface cujo nome simples é `x`, quanto uma declaração de importação estática única ([§7.5.3](<#/doc/jls/jls-07>)) que importa uma classe ou interface cujo nome simples é `x`, ocorre um erro em tempo de compilação, a menos que as duas classes ou interfaces sejam as mesmas, caso em que a declaração duplicada é ignorada.

**Exemplo 7.5.1-1. Importação de Tipo Único**
```
    
    import java.util.Vector;
    
    
```

faz com que o nome simples `Vector` esteja disponível dentro das declarações de classe e interface em uma unidade de compilação. Assim, o nome simples `Vector` refere-se à declaração de classe `Vector` no pacote `java.util` em todos os lugares onde não é sombreado ([§6.4.1](<#/doc/jls/jls-06>)) ou obscurecido ([§6.4.2](<#/doc/jls/jls-06>)) por uma declaração de um campo, parâmetro, variável local ou declaração de classe ou interface aninhada com o mesmo nome.

Observe que a declaração real de `java.util.Vector` é genérica ([§8.1.2](<#/doc/jls/jls-08>)). Uma vez importado, o nome `Vector` pode ser usado sem qualificação em um tipo parametrizado como `Vector<String>`, ou como o tipo raw `Vector`. Uma limitação relacionada da declaração `import` é que uma classe ou interface membro declarada dentro de uma declaração de classe ou interface genérica pode ser importada, mas seu tipo externo é sempre apagado.

**Exemplo 7.5.1-2. Declarações de Classe Duplicadas**

Este programa:
```
    
    import java.util.Vector;
    class Vector { Object[] vec; }
    
    
```

causa um erro em tempo de compilação devido à declaração duplicada de `Vector`, assim como:
```
    
    import java.util.Vector;
    import myVector.Vector;
    
    
```

onde `myVector` é um pacote contendo a unidade de compilação:
```
    
    package myVector;
    public class Vector { Object[] vec; }
    
    
```

**Exemplo 7.5.1-3. Nenhuma Importação de um Subpacote**

Observe que uma declaração `import` não pode importar um subpacote, apenas uma classe ou interface.

Por exemplo, não funciona tentar importar `java.util` e então usar o nome `util.Random` para se referir ao tipo `java.util.Random`:
```
    
    import java.util;
    class Test { util.Random generator; }
      // incorreto: erro em tempo de compilação
    
    
```

**Exemplo 7.5.1-4. Importando um Nome de Tipo que também é um Nome de Pacote**

Nomes de pacotes e nomes de tipos são geralmente diferentes sob as convenções de nomenclatura descritas em [§6.1](<#/doc/jls/jls-06>). No entanto, em um exemplo artificial onde há um pacote `Vector` nomeado de forma não convencional, que declara uma classe pública cujo nome é `Mosquito`:
```
    package Vector;
    public class Mosquito { int capacity; }
    
```

e então a unidade de compilação:
```
    package strange;
    import java.util.Vector;
    import Vector.Mosquito;
    class Test {
        public static void main(String[] args) {
            System.out.println(new Vector().getClass());
            System.out.println(new Mosquito().getClass());
        }
    }
    
```

a declaração de importação de tipo único que importa a classe `Vector` do pacote `java.util` não impede que o nome do pacote `Vector` apareça e seja corretamente reconhecido em declarações `import` subsequentes. O exemplo compila e produz a saída:
```
    class java.util.Vector
    class Vector.Mosquito
    
```

### 7.5.2. Declarações de Importação de Tipo Sob Demanda

Uma _declaração de importação de tipo sob demanda_ permite que todas as classes e interfaces acessíveis de um pacote, classe ou interface nomeado sejam importadas conforme necessário.

TypeImportOnDemandDeclaration:

`import` [PackageOrTypeName](<#/doc/jls/jls-06>) `.` `*` `;`

O _PackageOrTypeName_ deve ser o nome canônico ([§6.7](<#/doc/jls/jls-06>)) de um pacote, uma classe ou uma interface.

Se o _PackageOrTypeName_ denota uma classe ou interface ([§6.5.4](<#/doc/jls/jls-06>)), então a classe ou interface deve ser um membro de um pacote nomeado, ou um membro de uma classe ou interface cuja declaração de classe ou interface lexicamente envolvente mais externa ([§8.1.3](<#/doc/jls/jls-08>)) é um membro de um pacote nomeado, ou ocorre um erro em tempo de compilação.

É um erro em tempo de compilação se o pacote nomeado não for unicamente visível para o módulo atual ([§7.4.3](<#/doc/jls/jls-07>)), ou se a classe ou interface nomeada não for acessível ([§6.6](<#/doc/jls/jls-06>)).

Não é um erro em tempo de compilação nomear `java.lang` ou o pacote nomeado da unidade de compilação atual em uma declaração de importação de tipo sob demanda. A declaração de importação de tipo sob demanda é ignorada em tais casos.

Duas ou mais declarações de importação de tipo sob demanda na mesma unidade de compilação podem nomear o mesmo pacote, classe ou interface. Todas, exceto uma dessas declarações, são consideradas redundantes; o efeito é como se esse tipo fosse importado apenas uma vez.

Se uma unidade de compilação contém tanto uma declaração de importação de tipo sob demanda quanto uma declaração de importação estática sob demanda ([§7.5.4](<#/doc/jls/jls-07>)) que nomeiam a mesma classe ou interface, o efeito é como se as classes e interfaces membro `static` dessa classe ou interface ([§8.5](<#/doc/jls/jls-08>), [§9.5](<#/doc/jls/jls-09>)) fossem importadas apenas uma vez.

**Exemplo 7.5.2-1. Importação de Tipo Sob Demanda**
```
    
    import java.util.*;
    
    
```

faz com que os nomes simples de todas as classes e interfaces `public` declaradas no pacote `java.util` estejam disponíveis dentro das declarações de classe e interface da unidade de compilação. Assim, o nome simples `Vector` refere-se à classe `Vector` do pacote `java.util` em todos os lugares na unidade de compilação onde essa declaração de classe não é sombreada ([§6.4.1](<#/doc/jls/jls-06>)) ou obscurecida ([§6.4.2](<#/doc/jls/jls-06>)).

A declaração pode ser sombreada por uma declaração de importação de tipo único de uma classe ou interface cujo nome simples é `Vector`; por uma classe ou interface nomeada `Vector` e declarada no pacote ao qual a unidade de compilação pertence; ou quaisquer classes ou interfaces aninhadas.

A declaração pode ser obscurecida por uma declaração de um campo, parâmetro ou variável local nomeado `Vector`.

(Seria incomum que qualquer uma dessas condições ocorresse.)

### 7.5.3. Declarações de Importação Estática Única

Uma _declaração de importação estática única_ importa todos os membros `static` acessíveis com um dado nome simples de uma classe ou interface. Isso torna esses membros `static` disponíveis sob seu nome simples nas declarações de módulo, classe e interface da unidade de compilação em que a declaração de importação estática única aparece.

SingleStaticImportDeclaration:

`import` `static` [TypeName](<#/doc/jls/jls-06>) `.` [Identifier](<#/doc/jls/jls-03>) `;`

O _TypeName_ deve ser o nome canônico ([§6.7](<#/doc/jls/jls-06>)) de uma classe ou interface.

A classe ou interface deve ser um membro de um pacote nomeado, ou um membro de uma classe ou interface cuja declaração de classe ou interface lexicamente envolvente mais externa ([§8.1.3](<#/doc/jls/jls-08>)) é um membro de um pacote nomeado, ou ocorre um erro em tempo de compilação.

É um erro em tempo de compilação se a classe ou interface nomeada não for acessível ([§6.6](<#/doc/jls/jls-06>)).

O _Identifier_ deve nomear pelo menos um membro `static` da classe ou interface nomeada. É um erro em tempo de compilação se não houver nenhum membro `static` com esse nome, ou se todos os membros nomeados não forem acessíveis.

É permitido que uma declaração de importação estática única importe vários campos, classes ou interfaces com o mesmo nome, ou vários métodos com o mesmo nome e assinatura. Isso ocorre quando a classe ou interface nomeada herda múltiplos campos, classes membro, interfaces membro ou métodos, todos com o mesmo nome, de seus próprios supertipos.

Se duas declarações de importação estática única na mesma unidade de compilação tentarem importar classes ou interfaces com o mesmo nome simples, então ocorre um erro em tempo de compilação, a menos que as duas classes ou interfaces sejam as mesmas, caso em que a declaração duplicada é ignorada.

Se uma declaração de importação estática única importa uma classe ou interface cujo nome simples é `x`, e a unidade de compilação também declara uma classe ou interface de nível superior ([§7.6](<#/doc/jls/jls-07>)) cujo nome simples é `x`, ocorre um erro em tempo de compilação.

Se uma unidade de compilação contém tanto uma declaração de importação estática única que importa uma classe ou interface cujo nome simples é `x`, quanto uma declaração de importação de tipo único ([§7.5.1](<#/doc/jls/jls-07>)) que importa uma classe ou interface cujo nome simples é `x`, ocorre um erro em tempo de compilação, a menos que as duas classes ou interfaces sejam as mesmas, caso em que a declaração duplicada é ignorada.

### 7.5.4. Declarações de Importação Estática Sob Demanda

Uma _declaração de importação estática sob demanda_ permite que todos os membros `static` acessíveis de uma classe ou interface nomeada sejam importados conforme necessário.

StaticImportOnDemandDeclaration:

`import` `static` [TypeName](<#/doc/jls/jls-06>) `.` `*` `;`

O _TypeName_ deve ser o nome canônico ([§6.7](<#/doc/jls/jls-06>)) de uma classe ou interface.

A classe ou interface deve ser um membro de um pacote nomeado, ou um membro de uma classe ou interface cuja declaração de classe ou interface lexicamente envolvente mais externa ([§8.1.3](<#/doc/jls/jls-08>)) é um membro de um pacote nomeado, ou ocorre um erro em tempo de compilação.

É um erro em tempo de compilação se a classe ou interface nomeada não for acessível ([§6.6](<#/doc/jls/jls-06>)).

Duas ou mais declarações de importação estática sob demanda na mesma unidade de compilação podem nomear a mesma classe ou interface; o efeito é como se houvesse exatamente uma dessas declarações.

Duas ou mais declarações de importação estática sob demanda na mesma unidade de compilação podem nomear o mesmo membro; o efeito é como se o membro fosse importado exatamente uma vez.

É permitido que uma declaração de importação estática sob demanda importe vários campos, classes ou interfaces com o mesmo nome, ou vários métodos com o mesmo nome e assinatura. Isso ocorre quando a classe ou interface nomeada herda múltiplos campos, classes membro, interfaces membro ou métodos, todos com o mesmo nome, de seus próprios supertipos.

Se uma unidade de compilação contém tanto uma declaração de importação estática sob demanda quanto uma declaração de importação de tipo sob demanda ([§7.5.2](<#/doc/jls/jls-07>)) que nomeiam a mesma classe ou interface, o efeito é como se as classes e interfaces membro `static` dessa classe ou interface ([§8.5](<#/doc/jls/jls-08>), [§9.5](<#/doc/jls/jls-09>)) fossem importadas apenas uma vez.

### 7.5.5. Declarações de Importação de Módulo Único

Uma _declaração de importação de módulo único_ permite que todas as classes e interfaces `public` de nível superior dos pacotes exportados por um módulo nomeado sejam importadas conforme necessário.

SingleModuleImportDeclaration:

`import` `module` [ModuleName](<#/doc/jls/jls-06>) `;`

Uma declaração de importação de módulo único importa, sob demanda, todas as classes e interfaces `public` de nível superior nos seguintes pacotes:

1.  Os pacotes exportados pelo módulo _ModuleName_ para o módulo atual.

2.  Os pacotes exportados pelos módulos que são lidos pelo módulo atual devido à leitura do módulo _ModuleName_. Isso permite que um programa use a API de um módulo, que pode se referir a classes e interfaces de outros módulos, sem ter que importar todos esses outros módulos.

É um erro em tempo de compilação se o módulo _ModuleName_ não for lido pelo módulo atual ([§7.3](<#/doc/jls/jls-07>)).

Os módulos lidos pelo módulo atual são dados pelo resultado da resolução, conforme descrito na especificação do pacote `java.lang.module` ([§7.3](<#/doc/jls/jls-07>)).

Duas ou mais declarações de importação de módulo único na mesma unidade de compilação podem nomear o mesmo módulo. Todas, exceto uma dessas declarações, são consideradas redundantes; o efeito é como se esse módulo fosse importado apenas uma vez.

Uma declaração de importação de módulo único pode ser usada em qualquer arquivo de código-fonte. Não é necessário que o arquivo de código-fonte faça parte de um módulo. Por exemplo, os módulos `java.base` e `java.sql` fazem parte do runtime padrão do Java, então eles podem ser importados por programas que não são desenvolvidos como módulos.

Às vezes, é útil importar um módulo que não exporta nenhum pacote. Isso ocorre porque o módulo pode requerer transitivamente outros módulos que exportam pacotes. Por exemplo, o módulo `java.se` não exporta nenhum pacote, mas requer vários módulos transitivamente, então o efeito da declaração de importação de módulo único `import module java.se;` é importar os pacotes que são exportados por esses módulos (e assim por diante, recursivamente).

**Exemplo 7.5.5-1. Importação de Módulo Único em Unidades de Compilação Comuns**

Módulos permitem que um conjunto de pacotes seja agrupado para reutilização sob um único nome, e os pacotes exportados de um módulo são destinados a formar uma API coesa e coerente. Declarações de importação de módulo único permitem que o desenvolvedor importe todos os pacotes exportados por um módulo de uma só vez, simplificando a reutilização de bibliotecas modulares. Por exemplo:
```

    import module java.xml;


```

faz com que os nomes simples das classes e interfaces `public` de nível superior declaradas em todos os pacotes exportados pelo módulo `java.xml` estejam disponíveis dentro das declarações de classe e interface da unidade de compilação. Assim, o nome simples `XPath` refere-se à interface `XPath` do pacote `javax.xml.xpath` exportado pelo módulo `java.xml` em todos os lugares na unidade de compilação onde essa declaração de classe não é sombreada ou obscurecida.

Assuma a seguinte unidade de compilação associada ao módulo `M0`:
```

    package q;
    import module M1;   // What does this import?
    class C { ... }


```

onde o módulo `M0` tem a seguinte declaração:
```

    module M0 { requires M1; }


```

O significado da declaração de importação de módulo único `import module M1;` depende das exportações de `M1` e de quaisquer módulos que `M1` requeira transitivamente. Considere como exemplo:
```

    module M1 {
        exports p1;
        exports p2 to M0;
        exports p3 to M3;
        requires transitive M4;
        requires M5;
    }

    module M3 { ... }

    module M4 { exports p10; }

    module M5 { exports p11; }


```

O efeito da declaração de importação de módulo único `import module M1;` é então:

1.  Importar as classes e interfaces `public` de nível superior do pacote `p1`, já que `M1` exporta `p1` para todos;

2.  Importar as classes e interfaces `public` de nível superior do pacote `p2`, já que `M1` exporta `p2` para `M0`, o módulo ao qual a unidade de compilação está associada; e

3.  Importar as classes e interfaces `public` de nível superior do pacote `p10`, já que `M1` requer _transitiva_mente `M4`, que exporta `p10`.

Nada dos pacotes `p3` ou `p11` é importado pela unidade de compilação.

Declarações de importação de módulo único podem aparecer em um arquivo de código-fonte contendo apenas uma declaração de pacote. Tais arquivos são tipicamente chamados de `package-info.java` e são usados como o único repositório para anotações e documentação em nível de pacote ([§7.4.1](<#/doc/jls/jls-07>)).

**Exemplo 7.5.5-2. Importação de Módulo Único em Unidades de Compilação Modulares**

Declarações de importação também podem aparecer em uma unidade de compilação modular. A seguinte unidade de compilação modular usa uma declaração de importação de módulo único, permitindo que o nome simples da interface `Driver` associada ao módulo `java.sql` seja usado na diretiva `provides`:
```

    import module java.sql;
    module com.myDB.core {
        exports ...
        requires transitive java.sql;
        provides Driver with com.myDB.greatDriver;
    }


```

É possível que uma unidade de compilação modular que declara um módulo também importe esse módulo. No exemplo a seguir, isso significa que o nome simples de uma classe `C` pode ser usado em uma diretiva `uses`:
```

    import module M;
    module M {
        ...
        exports p;
        ...
        uses C;
        ...
    }


```

onde o pacote `p` exportado pelo módulo `M` é declarado da seguinte forma:
```

    package p;
    class C { ... }


```

Sem a declaração de importação de módulo único, o nome qualificado da classe `C` precisaria ser usado na diretiva `uses`.

Suponha uma declaração de módulo da seguinte forma:
```

    module M2 {
        requires java.se;
        exports p2;
        ...
    }


```

onde o pacote `p2` exportado por `M2` é declarado da seguinte forma:
```

    package p2;
    import module java.xml;
    class MyClass {
        ...
    }


```

Mesmo que o módulo `M2` não expresse diretamente uma dependência no módulo `java.xml`, a importação do módulo `java.xml` ainda está correta, pois o processo de resolução determinará que o módulo `java.xml` é lido pelo módulo `M2`.

**Exemplo 7.5.5-3. Importações Ambíguas**

Claramente, importar múltiplos módulos pode levar a ambiguidades de nome, por exemplo:
```

    import module java.base;
    import module java.desktop;

    ...
    List l = ...        // Error - Ambiguous name!
    ...


```

O módulo `java.base` exporta o pacote `java.util`, que possui uma interface `List` `public`. O módulo `java.desktop` exporta o pacote `java.awt`, que possui uma classe `List` `public`. Tendo importado ambos os módulos, o uso do nome simples `List` é claramente ambíguo e resulta em um erro em tempo de compilação.

No entanto, apenas importar um único módulo também pode levar a uma ambiguidade de nome, por exemplo:
```

    import module java.desktop;

    ...
    Element e = ...     // Error - Ambiguous name!
    ...


```

O módulo `java.desktop` exporta os pacotes `javax.swing.text` e `javax.swing.text.html.parser`, que possuem uma interface `Element` `public` e uma classe `Element` `public`, respectivamente. Assim, o uso do nome simples `Element` é ambíguo e resulta em um erro em tempo de compilação.

Uma declaração de importação de tipo único pode ser usada para resolver uma ambiguidade de nome. O exemplo anterior onde o nome simples `List` é ambíguo pode ser resolvido da seguinte forma:
```

    import module java.base;
    import module java.desktop;

    import java.util.List;  // Resolving the ambiguity
                            // of the simple name List

    ...
    List l = ...            // Ok - List is resolved to
                            // java.util.List
    ...


```
## 7.6. Declarações de Classes e Interfaces de Nível Superior

Uma _declaração de classe ou interface de nível superior_ declara uma classe de nível superior ([§8.1](<#/doc/jls/jls-08>)) ou uma interface de nível superior ([§9.1](<#/doc/jls/jls-09>)).

TopLevelClassOrInterfaceDeclaration:

[ClassDeclaration](<#/doc/jls/jls-08>)
[InterfaceDeclaration](<#/doc/jls/jls-09>)
`;`

Tokens "`;`" extras que aparecem no nível de declarações de classes e interfaces em uma unidade de compilação não têm efeito sobre o significado da unidade de compilação. Ponto e vírgulas perdidos são permitidos na linguagem de programação Java unicamente como uma concessão a programadores C++ que estão acostumados a colocar "`;`" após uma declaração de classe. Eles não devem ser usados em código Java novo.

Uma classe de nível superior também pode ser implicitamente declarada ([§8.1.8](<#/doc/jls/jls-08>)) por uma unidade de compilação compacta.

Na ausência de um modificador de acesso, uma classe ou interface de nível superior tem acesso de pacote: ela é acessível apenas dentro de unidades de compilação ordinárias do pacote no qual é declarada ([§6.6.1](<#/doc/jls/jls-06>)). Uma classe ou interface pode ser declarada `public` para conceder acesso à classe ou interface a partir de código em outros pacotes do mesmo módulo, e potencialmente a partir de código em pacotes de outros módulos.

É um erro em tempo de compilação se uma declaração de classe ou interface de nível superior contiver qualquer um dos seguintes modificadores de acesso: `protected`, `private` ou `static`.

É um erro em tempo de compilação se o nome de uma classe ou interface de nível superior aparecer como o nome de qualquer outra classe ou interface de nível superior declarada no mesmo pacote.

O escopo e o sombreamento de uma classe ou interface de nível superior são especificados em [§6.3](<#/doc/jls/jls-06>) e [§6.4](<#/doc/jls/jls-06>).

O nome totalmente qualificado de uma classe ou interface de nível superior é especificado em [§6.7](<#/doc/jls/jls-06>).

**Exemplo 7.6-1. Declarações Conflitantes de Classes e Interfaces de Nível Superior**
```
    package test;
    import java.util.Vector;
    class Point {
        int x, y;
    }
    interface Point {  // compile-time error #1
        int getR();
        int getTheta();
    }
    class Vector { Point[] pts; }  // compile-time error #2

```

Aqui, o primeiro erro em tempo de compilação é causado pela declaração duplicada do nome `Point` como uma classe e uma interface no mesmo pacote. Um segundo erro em tempo de compilação é a tentativa de declarar o nome `Vector` tanto por uma declaração de classe quanto por uma declaração de importação de tipo único.

Observe, no entanto, que não é um erro para o nome em uma declaração de classe se sobrepor a uma classe ou interface que, de outra forma, poderia ser importada por uma declaração de importação de tipo sob demanda ([§7.5.2](<#/doc/jls/jls-07>)) na mesma unidade de compilação. Assim, neste programa:
```
    package test;
    import java.util.*;
    class Vector {}  // not a compile-time error

```

a declaração da classe `Vector` é permitida, mesmo que também exista uma classe `java.util.Vector`. Dentro desta unidade de compilação, o nome simples `Vector` refere-se à classe `test.Vector`, e não a `java.util.Vector` (que ainda pode ser referenciada por código dentro da unidade de compilação, mas apenas por seu nome totalmente qualificado).

**Exemplo 7.6-2. Escopo de Classes e Interfaces de Nível Superior**
```
    package points;
    class Point {
        int x, y;           // coordinates
        PointColor color;   // color of this point
        Point next;         // next point with this color
        static int nPoints;
    }
    class PointColor {
        Point first;        // first point with this color
        PointColor(int color) { this.color = color; }
        private int color;  // color components
    }

```

Este programa define duas classes que se usam mutuamente nas declarações de seus membros de classe. Como as classes `Point` e `PointColor` têm todas as declarações de classe no pacote `points`, incluindo todas as da unidade de compilação atual, como seu escopo, este programa compila corretamente. Ou seja, a referência antecipada não é um problema.

**Exemplo 7.6-3. Nomes Totalmente Qualificados**
```

    class Point { int x, y; }


```

Neste código, a classe `Point` é declarada em uma unidade de compilação sem declaração de `package`, e, portanto, `Point` é seu nome totalmente qualificado, enquanto no código:
```

    package vista;
    class Point { int x, y; }


```

o nome totalmente qualificado da classe `Point` é `vista.Point`. (O nome do pacote `vista` é adequado para uso local ou pessoal; se o pacote fosse destinado a ser amplamente distribuído, seria melhor dar-lhe um nome de pacote único ([§6.1](<#/doc/jls/jls-06>)).)

Uma implementação da Java SE Platform deve manter o controle de classes e interfaces dentro de pacotes pela combinação de seus nomes de módulos envolventes e seus nomes binários ([§13.1](<#/doc/jls/jls-13>)). Múltiplas formas de nomear uma classe ou interface devem ser expandidas para nomes binários para garantir que tais nomes sejam entendidos como referindo-se à mesma classe ou interface.

Por exemplo, se uma unidade de compilação contiver a declaração de importação de tipo único ([§7.5.1](<#/doc/jls/jls-07>)):
```

    import java.util.Vector;


```

então, dentro dessa unidade de compilação, o nome simples `Vector` e o nome totalmente qualificado `java.util.Vector` referem-se à mesma classe.

Se e somente se os pacotes forem armazenados em um sistema de arquivos ([§7.2](<#/doc/jls/jls-07>)), o sistema hospedeiro pode optar por impor a restrição de que é um erro em tempo de compilação se uma classe ou interface não for encontrada em um arquivo sob um nome composto pelo nome da classe ou interface mais uma extensão (como `.java` ou `.jav`) se qualquer uma das seguintes condições for verdadeira:

*   A classe ou interface é referenciada por código em outras unidades de compilação ordinárias do pacote no qual a classe ou interface é declarada.

*   A classe ou interface é declarada `public` (e, portanto, é potencialmente acessível a partir de código em outros pacotes).

Esta restrição implica que deve haver no máximo uma classe ou interface desse tipo por unidade de compilação. Esta restrição facilita para um compilador Java encontrar uma classe ou interface nomeada dentro de um pacote. Na prática, muitos programadores optam por colocar cada classe ou interface em sua própria unidade de compilação, seja ela `public` ou referenciada por código em outras unidades de compilação.

Por exemplo, o código-fonte para uma classe `public` `wet.sprocket.Toad` seria encontrado em um arquivo `Toad.java` no diretório `wet/sprocket`, e o código objeto correspondente seria encontrado no arquivo `Toad.class` no mesmo diretório.

## 7.7. Declarações de Módulo

Uma declaração de módulo especifica um novo módulo nomeado. Um módulo nomeado especifica _dependências_ em outros módulos para definir o universo de classes e interfaces disponíveis para seu próprio código; e especifica quais de seus pacotes são _exportados_ ou _abertos_ para popular o universo de classes e interfaces disponíveis para outros módulos que especificam uma dependência nele.

Uma "dependência" é o que é expresso por uma diretiva `requires`, independentemente de um módulo existir com o nome especificado pela diretiva. Uma "dependência resolvida" é o módulo observável enumerado pela resolução (conforme descrito na especificação do pacote `java.lang.module`) para uma dada diretiva `requires`. Geralmente, as regras da linguagem de programação Java estão mais interessadas nas dependências (as declarações) do que nas dependências resolvidas (os módulos resultantes).

ModuleDeclaration:

{[Annotation](<#/doc/jls/jls-09>)} [`open`] `module` [Identifier](<#/doc/jls/jls-03>) {`.` [Identifier](<#/doc/jls/jls-03>)} `{` {[ModuleDirective](<#/doc/jls/jls-07>)} `}`

Uma declaração de módulo introduz um nome de módulo que pode ser usado em outras declarações de módulo para expressar relacionamentos entre módulos. Um nome de módulo consiste em um ou mais identificadores Java ([§3.8](<#/doc/jls/jls-03>)) separados por tokens "`.`".

Existem dois tipos de módulos: _módulos normais_ e _módulos abertos_. O tipo de um módulo determina a natureza do acesso aos tipos do módulo e aos membros desses tipos, para código fora do módulo.

Um módulo normal, sem o modificador `open`, concede acesso em tempo de compilação e tempo de execução a tipos apenas nos pacotes que são explicitamente exportados.

Um módulo aberto, com o modificador `open`, concede acesso em tempo de compilação a tipos apenas nos pacotes que são explicitamente exportados, mas concede acesso em tempo de execução a tipos em todos os seus pacotes, como se todos os pacotes tivessem sido exportados.

Para código fora de um módulo (seja o módulo normal ou aberto), o acesso concedido em tempo de compilação ou tempo de execução a tipos nos pacotes exportados do módulo é especificamente aos tipos `public` e `protected` nesses pacotes, e aos membros `public` e `protected` desses tipos ([§6.6](<#/doc/jls/jls-06>)). Nenhum acesso é concedido em tempo de compilação ou tempo de execução a tipos, ou seus membros, em pacotes que não são exportados. O código dentro do módulo pode acessar tipos `public` e `protected`, e os membros `public` e `protected` desses tipos, em todos os pacotes do módulo, tanto em tempo de compilação quanto em tempo de execução.

Distinto do acesso em tempo de compilação e acesso em tempo de execução, a Java SE Platform fornece _acesso reflexivo_ via Core Reflection API ([§1.4](<#/doc/jls/jls-01>)). Um módulo normal concede acesso reflexivo a tipos apenas nos pacotes que são explicitamente exportados ou explicitamente abertos (ou ambos). Um módulo aberto concede acesso reflexivo a tipos em todos os seus pacotes, como se todos os pacotes tivessem sido abertos.

Para código fora de um módulo normal, o acesso reflexivo concedido a tipos nos pacotes exportados (e não abertos) do módulo é especificamente aos tipos `public` e `protected` nesses pacotes, e aos membros `public` e `protected` desses tipos. O acesso reflexivo concedido a tipos nos pacotes abertos do módulo (sejam exportados ou não) é a todos os tipos nesses pacotes, e a todos os membros desses tipos. Nenhum acesso reflexivo é concedido a tipos, ou seus membros, em pacotes que não são exportados ou abertos. O código dentro do módulo desfruta de acesso reflexivo a todos os tipos, e a todos os seus membros, em todos os pacotes do módulo.

Para código fora de um módulo aberto, o acesso reflexivo concedido a tipos nos pacotes abertos do módulo (ou seja, todos os pacotes do módulo) é a todos os tipos nesses pacotes, e a todos os membros desses tipos. O código dentro do módulo desfruta de acesso reflexivo a todos os tipos, e a todos os seus membros, em todos os pacotes do módulo.

As _diretivas_ de uma declaração de módulo especificam as dependências do módulo em outros módulos (via `requires`, [§7.7.1](<#/doc/jls/jls-07>)), os pacotes que ele disponibiliza para outros módulos (via `exports` e `opens`, [§7.7.2](<#/doc/jls/jls-07>)), os serviços que ele consome (via `uses`, [§7.7.3](<#/doc/jls/jls-07>)), e os serviços que ele fornece (via `provides`, [§7.7.4](<#/doc/jls/jls-07>)).

ModuleDirective:

`requires` {[RequiresModifier](<#/doc/jls/jls-07>)} [ModuleName](<#/doc/jls/jls-06>) `;`
`exports` [PackageName](<#/doc/jls/jls-06>) [`to` [ModuleName](<#/doc/jls/jls-06>) {`,` [ModuleName](<#/doc/jls/jls-06>)}] `;`
`opens` [PackageName](<#/doc/jls/jls-06>) [`to` [ModuleName](<#/doc/jls/jls-06>) {`,` [ModuleName](<#/doc/jls/jls-06>)}] `;`
`uses` [TypeName](<#/doc/jls/jls-06>) `;`
`provides` [TypeName](<#/doc/jls/jls-06>) `with` [TypeName](<#/doc/jls/jls-06>) {`,` [TypeName](<#/doc/jls/jls-06>)} `;`

RequiresModifier:

(um de)
`transitive` `static`

Se e somente se os pacotes forem armazenados em um sistema de arquivos ([§7.2](<#/doc/jls/jls-07>)), o sistema hospedeiro pode optar por impor a restrição de que é um erro em tempo de compilação se uma declaração de módulo não for encontrada em um arquivo sob um nome composto por `module-info` mais uma extensão (como `.java` ou `.jav`).

Para auxiliar a compreensão, é costumeiro, embora não obrigatório, que uma declaração de módulo agrupe suas diretivas, de modo que as diretivas `requires` que se referem a módulos sejam visualmente distintas das diretivas `exports` e `opens` que se referem a pacotes, e das diretivas `uses` e `provides` que se referem a serviços. Por exemplo:
```
    module com.example.foo {
        requires com.example.foo.http;
        requires java.logging;

        requires transitive com.example.foo.network;

        exports com.example.foo.bar;
        exports com.example.foo.internal to com.example.foo.probe;

        opens com.example.foo.quux;
        opens com.example.foo.internal to com.example.foo.network,
                                          com.example.foo.probe;

        uses com.example.foo.spi.Intf;
        provides com.example.foo.spi.Intf with com.example.foo.Impl;
    }

```

As diretivas `opens` podem ser evitadas se o módulo for aberto:
```
    open module com.example.foo {
        requires com.example.foo.http;
        requires java.logging;

        requires transitive com.example.foo.network;

        exports com.example.foo.bar;
        exports com.example.foo.internal to com.example.foo.probe;

        uses com.example.foo.spi.Intf;
        provides com.example.foo.spi.Intf with com.example.foo.Impl;
    }

```

Ferramentas de desenvolvimento para a linguagem de programação Java são encorajadas a destacar as diretivas `requires` `transitive` e as diretivas `exports` não qualificadas, pois estas formam a API primária de um módulo.

### 7.7.1. Dependências

A diretiva `requires` especifica o nome de um módulo do qual o módulo atual tem uma dependência.

Uma diretiva `requires` não deve aparecer na declaração do módulo `java.base`, ou ocorrerá um erro em tempo de compilação, porque ele é o módulo primordial e não possui dependências ([§8.1.4](<#/doc/jls/jls-08>)).

Se a declaração de um módulo não expressar uma dependência no módulo `java.base`, e o módulo não for o próprio `java.base`, então o módulo tem uma dependência implicitamente declarada no módulo `java.base`.

A palavra-chave `requires` pode ser seguida pelo modificador `transitive`. Isso faz com que qualquer módulo que `requires` o módulo atual tenha uma dependência implicitamente declarada no módulo especificado pela diretiva `requires` `transitive`.

A palavra-chave `requires` pode ser seguida pelo modificador `static`. Isso especifica que a dependência, embora obrigatória em tempo de compilação, é opcional em tempo de execução.

É um erro em tempo de compilação se o mesmo modificador aparecer mais de uma vez após a palavra-chave `requires`.

Se a declaração de um módulo expressar uma dependência no módulo `java.base`, e o módulo não for o próprio `java.base`, então é um erro em tempo de compilação se o modificador `static` aparecer após a palavra-chave `requires`.

É um erro em tempo de compilação se mais de uma diretiva `requires` em uma declaração de módulo especificar o mesmo nome de módulo.

É um erro em tempo de compilação se a resolução, conforme descrito na especificação do pacote `java.lang.module`, com o módulo atual como o único módulo raiz, falhar por qualquer um dos motivos descritos na especificação do pacote `java.lang.module`.

Por exemplo, se uma diretiva `requires` especificar um módulo que não é observável, ou se o módulo atual direta ou indiretamente expressar uma dependência em si mesmo.

Se a resolução for bem-sucedida, seu resultado especifica os módulos que são lidos pelo módulo atual. Os módulos lidos pelo módulo atual determinam quais unidades de compilação ordinárias são visíveis para o módulo atual ([§7.3](<#/doc/jls/jls-07>)). Os tipos declarados nessas unidades de compilação ordinárias (e _apenas_ nessas unidades de compilação ordinárias) podem ser acessíveis ao código no módulo atual ([§6.6](<#/doc/jls/jls-06>)).

A Java SE Platform distingue entre módulos nomeados que são explicitamente declarados (ou seja, com uma declaração de módulo) e módulos nomeados que são implicitamente declarados (ou seja, módulos automáticos). No entanto, a linguagem de programação Java não expõe essa distinção: as diretivas `requires` referem-se a módulos nomeados sem considerar se são explicitamente declarados ou implicitamente declarados.

Embora os módulos automáticos sejam convenientes para a migração, eles são não confiáveis no sentido de que seus nomes e pacotes exportados podem mudar quando seus autores os convertem em módulos explicitamente declarados. Um compilador Java é encorajado a emitir um aviso se uma diretiva `requires` se referir a um módulo automático. Um aviso especialmente forte é recomendado se o modificador `transitive` aparecer na diretiva.

**Exemplo 7.1.1-1. Resolução de diretivas `requires` `transitive`

Suponha que existam quatro declarações de módulo como segue:
```
    module m.A {
        requires m.B;
    }


```
```
    module m.B {
        requires transitive m.C;
    }


```
```
    module m.C {
        requires transitive m.D;
    }


```
```
    module m.D {
        exports p;
    }


```

onde o pacote `p` exportado por `m.D` é declarado como segue:
```
    package p;
    public class Point {}


```

e onde um pacote `client` no módulo `m.A` se refere ao tipo `public` `Point` no pacote exportado `p`:
```
    package client;
    import p.Point;
    public class Test {
        public static void main(String[] args) {
            System.out.println(new Point());
        }
    }


```

Os módulos podem ser compilados como segue, assumindo que o diretório atual tem um subdiretório por módulo, nomeado após o módulo que ele contém:
```
    javac --module-source-path . -d . --module m.D
    javac --module-source-path . -d . --module m.C
    javac --module-source-path . -d . --module m.B
    javac --module-source-path . -d . --module m.A

```

O programa `client.Test` pode ser executado como segue:
```
    java --module-path . --module m.A/client.Test

```

A referência do código em `m.A` ao tipo `public` exportado `Point` em `m.D` é legal porque `m.A` lê `m.D`, e `m.D` exporta o pacote contendo `Point`. A resolução determina que `m.A` lê `m.D` da seguinte forma:

*   `m.A` `requires` `m.B` e, portanto, lê `m.B`.

*   Como `m.A` lê `m.B`, e como `m.B` `requires` `transitive` `m.C`, a resolução determina que `m.A` lê `m.C`.

*   Então, como `m.A` lê `m.C`, e como `m.C` `requires` `transitive` `m.D`, a resolução determina que `m.A` lê `m.D`.

Na prática, um módulo pode ler outro módulo através de múltiplos níveis de dependência, a fim de suportar quantidades arbitrárias de refatoração. Uma vez que um módulo é lançado para alguém reutilizar (via `requires`), o autor do módulo se comprometeu com seu nome e API, mas é livre para refatorar seu conteúdo em outros módulos que o módulo original reutiliza (via `requires` `transitive`) para o benefício dos consumidores. No exemplo acima, o pacote `p` pode ter sido originalmente exportado por `m.B` (assim, `m.A` `requires` `m.B`), mas a refatoração fez com que parte do conteúdo de `m.B` fosse movida para `m.C` e `m.D`. Ao usar uma cadeia de diretivas `requires` `transitive`, a família de `m.B`, `m.C` e `m.D` pode preservar o acesso ao pacote `p` para o código em `m.A` sem forçar quaisquer mudanças nas diretivas `requires` de `m.A`. Note que o pacote `p` em `m.D` não é "reexportado" por `m.C` e `m.B`; em vez disso, `m.A` é feito para ler `m.D` diretamente.

### 7.7.2. Pacotes Exportados e Abertos

A diretiva `exports` especifica o nome de um pacote a ser exportado pelo módulo atual. Para código em outros módulos, isso concede acesso em tempo de compilação e tempo de execução aos tipos `public` e `protected` no pacote, e aos membros `public` e `protected` desses tipos ([§6.6](<#/doc/jls/jls-06>)). Também concede acesso reflexivo a esses tipos e membros para código em outros módulos.

A diretiva `opens` especifica o nome de um pacote a ser aberto pelo módulo atual. Para código em outros módulos, isso concede acesso em tempo de execução, mas não em tempo de compilação, aos tipos `public` e `protected` no pacote, e aos membros `public` e `protected` desses tipos. Também concede acesso reflexivo a todos os tipos no pacote, e a todos os seus membros, para código em outros módulos.

É um erro em tempo de compilação se o pacote especificado por `exports` não for declarado por uma unidade de compilação associada ao módulo atual ([§7.3](<#/doc/jls/jls-07>)).

É permitido que `opens` especifique um pacote que não é declarado por uma unidade de compilação associada ao módulo atual. (Se o pacote for declarado por uma unidade de compilação observável associada a outro módulo, a diretiva `opens` não tem efeito sobre esse outro módulo.)

É um erro em tempo de compilação se mais de uma diretiva `exports` em uma declaração de módulo especificar o mesmo nome de pacote.

É um erro em tempo de compilação se mais de uma diretiva `opens` em uma declaração de módulo especificar o mesmo nome de pacote.

É um erro em tempo de compilação se uma diretiva `opens` aparecer na declaração de um módulo aberto.

Se uma diretiva `exports` ou `opens` tiver uma cláusula `to`, então a diretiva é _qualificada_; caso contrário, é _não qualificada_. Para uma diretiva qualificada, os tipos `public` e `protected` no pacote, e seus membros `public` e `protected`, são acessíveis exclusivamente ao código nos módulos especificados na cláusula `to`. Os módulos especificados na cláusula `to` são referidos como _amigos_ do módulo atual. Para uma diretiva não qualificada, esses tipos e seus membros são acessíveis ao código em qualquer módulo.

É permitido que a cláusula `to` de uma diretiva `exports` ou `opens` especifique um módulo que não é observável ([§7.7.6](<#/doc/jls/jls-07>)).

É um erro em tempo de compilação se a cláusula `to` de uma dada diretiva `exports` especificar o mesmo nome de módulo mais de uma vez.

É um erro em tempo de compilação se a cláusula `to` de uma dada diretiva `opens` especificar o mesmo nome de módulo mais de uma vez.

### 7.7.3. Consumo de Serviço

A diretiva `uses` especifica um _serviço_ para o qual o código no módulo atual pode descobrir provedores via `java.util.ServiceLoader`.

É um erro em tempo de compilação se uma diretiva `uses` especificar uma classe enum ([§8.9](<#/doc/jls/jls-08>)).

O serviço pode ser declarado no módulo atual ou em outro módulo. Se o serviço não for declarado no módulo atual, então o serviço deve ser acessível ao código no módulo atual ([§6.6](<#/doc/jls/jls-06>)), ou ocorrerá um erro em tempo de compilação.

É um erro em tempo de compilação se mais de uma diretiva `uses` em uma declaração de módulo especificar o mesmo serviço.

### 7.7.4. Provisão de Serviço

A diretiva `provides` especifica um serviço para o qual a cláusula `with` especifica um ou mais _provedores de serviço_ para `java.util.ServiceLoader`.

É um erro em tempo de compilação se uma diretiva `provides` especificar uma classe enum ([§8.9](<#/doc/jls/jls-08>)) como o serviço.

O serviço pode ser declarado no módulo atual ou em outro módulo. Se o serviço não for declarado no módulo atual, então o serviço deve ser acessível ao código no módulo atual ([§6.6](<#/doc/jls/jls-06>)), ou ocorrerá um erro em tempo de compilação.

Todo provedor de serviço deve ser uma classe ou interface `public` que seja de nível superior ou `static`, ou ocorrerá um erro em tempo de compilação.

Todo provedor de serviço deve ser declarado no módulo atual, ou ocorrerá um erro em tempo de compilação.

Se um provedor de serviço declarar explicitamente um construtor `public` sem parâmetros formais, ou declarar implicitamente um construtor padrão `public` ([§8.8.9](<#/doc/jls/jls-08>)), então esse construtor é chamado de _construtor provedor_.

Se um provedor de serviço declarar explicitamente um método `public` `static` chamado `provider` sem parâmetros formais, então esse método é chamado de _método provedor_.

Se um provedor de serviço tiver um método provedor, então seu tipo de retorno deve (i) ser declarado no módulo atual, ou ser declarado em outro módulo e ser acessível ao código no módulo atual; e (ii) ser um subtipo do serviço especificado na diretiva `provides`; ou ocorrerá um erro em tempo de compilação.

Embora um provedor de serviço especificado por uma diretiva `provides` deva ser declarado no módulo atual, seu método provedor pode ter um tipo de retorno que é declarado em _outro_ módulo. Além disso, observe que quando um provedor de serviço declara um método provedor, o próprio provedor de serviço não precisa ser um subtipo do serviço.

Se um provedor de serviço não tiver um método provedor, então esse provedor de serviço deve ter um construtor provedor e deve ser um subtipo do serviço especificado na diretiva `provides`, ou ocorrerá um erro em tempo de compilação.

É um erro em tempo de compilação se mais de uma diretiva `provides` em uma declaração de módulo especificar o mesmo serviço.

É um erro em tempo de compilação se a cláusula `with` de uma dada diretiva `provides` especificar o mesmo provedor de serviço mais de uma vez.

### 7.7.5. Módulos Sem Nome

Uma unidade de compilação ordinária observável que o sistema hospedeiro não associa a um módulo nomeado ([§7.3](<#/doc/jls/jls-07>)) é associada a um _módulo sem nome_.

Módulos sem nome são fornecidos pela Java SE Platform em reconhecimento ao fato de que programas desenvolvidos antes do Java SE 9 não podiam declarar módulos nomeados. Além disso, as razões para a Java SE Platform fornecer pacotes sem nome ([§7.4.2](<#/doc/jls/jls-07>)) são amplamente aplicáveis a módulos sem nome.

Uma implementação da Java SE Platform deve suportar pelo menos um módulo sem nome. Uma implementação pode suportar mais de um módulo sem nome, mas não é obrigada a fazê-lo. Quais unidades de compilação ordinárias são associadas a cada módulo sem nome é determinado pelo sistema hospedeiro.

O sistema hospedeiro pode associar unidades de compilação ordinárias em um pacote nomeado a um módulo sem nome.

As regras para módulos sem nome são projetadas para maximizar sua interoperabilidade com módulos nomeados, da seguinte forma:

*   Um módulo sem nome lê todo módulo observável ([§7.7.6](<#/doc/jls/jls-07>)).

Em virtude do fato de que uma unidade de compilação ordinária associada a um módulo sem nome é observável, o módulo sem nome associado é observável. Assim, se a implementação da Java SE Platform suportar mais de um módulo sem nome, todo módulo sem nome é observável; e cada módulo sem nome lê todo módulo sem nome, incluindo a si mesmo.

No entanto, é importante perceber que as unidades de compilação ordinárias de um módulo sem nome nunca são _visíveis_ para um módulo nomeado ([§7.3](<#/doc/jls/jls-07>)) porque nenhuma diretiva `requires` pode fazer com que um módulo nomeado leia um módulo sem nome. A Core Reflection API da Java SE Platform pode ser usada para fazer com que um módulo nomeado leia um módulo sem nome em tempo de execução.

*   Um módulo sem nome exporta todo pacote cujas unidades de compilação ordinárias estão associadas a esse módulo sem nome.

*   Um módulo sem nome abre todo pacote cujas unidades de compilação ordinárias estão associadas a esse módulo sem nome.

### 7.7.6. Observabilidade de um Módulo

Um módulo é observável se pelo menos uma das seguintes condições for verdadeira:

*   Uma unidade de compilação modular contendo a declaração do módulo é observável ([§7.3](<#/doc/jls/jls-07>)).

*   Uma unidade de compilação ordinária associada ao módulo é observável.

* * *

[Anterior](<#/doc/jls/jls-06>) | | [Próximo](<#/doc/jls/jls-08>)
---|---|---
Capítulo 6. Nomes | [Início](<#/doc/jls/jls-01>) | Capítulo 8. Classes

* * *

[ Aviso Legal ](<#/>)