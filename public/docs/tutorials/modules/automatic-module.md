# Modularização Incremental com Módulos Automáticos

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > Modularização Incremental com Módulos Automáticos

**Anterior na Série**

[Código no Class Path - o Módulo Não Nomeado](<#/doc/tutorials/modules/unnamed-module>)

➜

**Tutorial Atual**

Modularização Incremental com Módulos Automáticos

➜

**Próximo na Série**

[Construindo Módulos na Linha de Comando](<#/doc/tutorials/modules/building>)

**Anterior na Série:** [Código no Class Path - o Módulo Não Nomeado](<#/doc/tutorials/modules/unnamed-module>)

**Próximo na Série:** [Construindo Módulos na Linha de Comando](<#/doc/tutorials/modules/building>)

# Modularização Incremental com Módulos Automáticos

O module system exige que todas as dependências de um módulo sejam encontradas no module path (ou no runtime). Se apenas JARs modulares funcionassem no module path, todas as dependências de um projeto teriam que ser módulos antes que o próprio projeto pudesse se tornar um, e projetos maiores teriam que ser modularizados em uma única etapa. Para evitar esse esforço de modularização de baixo para cima em todo o ecossistema, bem como modularizações "big-bang" de projetos maiores, o module system também permite JARs comuns no module path, onde eles se transformam em módulos automáticos. Uma vez aplicadas algumas regras especiais, eles funcionam como todos os outros módulos. Uma regra especial é que os módulos automáticos podem ler o unnamed module, o que lhes permite servir como uma ponte do module path para o class path.

**Nota**: Você precisa conhecer [os fundamentos do module system](<#/doc/tutorials/modules/intro>), sobre [o unnamed module](<#/doc/tutorials/modules/unnamed-module>) e [legibilidade implícita](<#/doc/tutorials/modules/implied-readability>) para aproveitar ao máximo este artigo.

## Módulos Automáticos

Para cada JAR no module path que não possui um module descriptor, o module system cria um _módulo automático_. Como qualquer outro módulo, ele possui três propriedades centrais:

  * um nome: o nome de um módulo automático pode ser definido no manifest do JAR com o cabeçalho `Automatic-Module-Name` (mais sobre isso abaixo); se estiver ausente, o module system gera um nome a partir do nome do arquivo
  * dependências: um módulo automático lê todos os outros módulos que entram no grafo, incluindo o unnamed module
  * exports: um módulo automático exporta todos os seus pacotes e também [os abre para reflection](<#/doc/tutorials/modules/opening-for-reflection>)

[Serviços](<#/doc/tutorials/modules/services>) fornecidos em `META-INF/services` são disponibilizados para o `ServiceLoader`.

Módulos automáticos são módulos nomeados completos, o que significa:

  * Eles podem ser referenciados por seu nome nas declarações de outros módulos, por exemplo, para requerê-los.
  * Mesmo no Java 9 a 16, eles não estavam sujeitos à [exceção da strong encapsulation de módulos JDK](<#/doc/tutorials/modules/strong-encapsulation>).
  * Eles estão sujeitos a verificações de confiabilidade como split packages.

Para experimentar módulos automáticos, você pode colocar as duas linhas de código a seguir em uma classe que você empacota como um JAR comum:

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Module name: " + Main.class.getModule().getName());
    }
}
```

Quando lançado do class path, a saída é `Module name: null`, indicando que a classe terminou no unnamed module. Quando lançado do module path, você obtém o esperado `Module name: $JAR`, onde `$JAR` é o nome que você deu ao arquivo JAR. Se você adicionar um manifest com um cabeçalho `Automatic-Module-Name` que define um nome, você verá esse nome ao lançar o JAR do module path. Para experimentar a dependência de módulos automáticos, você pode criar um segundo projeto e adicionar um `requires $JAR` à sua declaração de módulo.

## Nomes de Módulos Automáticos - Pequeno Detalhe, Grande Impacto

O principal objetivo de transformar JARs comuns em módulos é poder requerê-los em declarações de módulos. Para isso, eles precisam de um nome, mas, na falta de module descriptors, de onde ele viria?

### Primeiro Entradas do Manifest, Depois Nome do Arquivo

Uma maneira de determinar o nome do módulo de um JAR comum depende de seu manifest, que é um arquivo `MANIFEST.MF` na pasta `META-INF` de um JAR. Se um JAR no module path não contiver um descriptor, o module system segue um processo de duas etapas para determinar o nome do módulo automático:

  1. Ele procura pelo cabeçalho `Automatic-Module-Name` no manifest. Se o encontrar, usa o valor correspondente como nome do módulo.
  2. Se o cabeçalho não estiver presente no manifest, o module system infere um nome de módulo a partir do nome do arquivo.

Ser capaz de inferir o nome do módulo a partir do manifest é preferível por uma ampla margem porque é muito mais estável - mais sobre isso abaixo. As regras exatas para inferir um nome de módulo a partir do nome do arquivo são um pouco complicadas, mas os detalhes não são excessivamente importantes - aqui está o essencial:

  * Nomes de arquivos JAR frequentemente terminam com uma string de versão (como `-2.0.5`). Estas são reconhecidas e ignoradas.
  * Cada caractere, exceto letras e dígitos, é transformado em um ponto.

Este processo pode levar a resultados infelizes, onde o nome do módulo resultante é inválido. Um exemplo é a ferramenta de manipulação de bytecode [ByteBuddy](<https://bytebuddy.net>): Ela é publicada no Maven Central como `byte-buddy-$VERSION.jar`, o que levou ao nome de módulo automático `byte.buddy` (antes de definir um nome adequado). Infelizmente, isso é ilegal, porque `byte` é, claro, uma palavra-chave Java.

### Descobrindo o Nome

Se você precisar descobrir o nome do módulo automático de um JAR comum, você pode executar `jar --describe-module --file $FILE` contra o arquivo JAR. Infelizmente, isso não informa se o nome foi escolhido da entrada do manifest ou do nome do arquivo. Para descobrir isso, você tem várias opções:

  * Extraia o manifest com `jar --file $JAR --extract META-INF/MANIFEST.MF` e examine-o manualmente.
  * No Linux, `unzip -p $JAR META-INF/MANIFEST.MF` imprime o manifest no terminal e, assim, economiza o tempo de abrir o arquivo.
  * Renomeie o arquivo e execute `jar --describe-module` novamente.

### Quando Definir `Automatic-Module-Name`

Se você está mantendo um projeto que é lançado publicamente, o que significa que seus artifacts estão disponíveis via Maven Central ou algum outro repositório público, você deve considerar cuidadosamente quando definir o `Automatic-Module-Name` no manifest. Como já mencionado, isso torna o uso do seu projeto como um módulo automático muito mais confiável, mas também vem com a promessa de que, no futuro, módulos explícitos serão substitutos diretos para os JARs atuais. Você está essencialmente dizendo: "É assim que os módulos serão, eu apenas ainda não consegui lançá-los".

O fato de definir um nome de módulo automático convida seus usuários a começar a depender dos artifacts do seu projeto como módulos, o que tem algumas implicações importantes:

  * Os nomes dos futuros módulos devem ser exatamente aqueles que você declara agora. (Caso contrário, uma configuração confiável prejudicará seus usuários porque os módulos estarão faltando.)
  * A estrutura do artifact deve permanecer a mesma, então você não pode começar a mover classes ou pacotes suportados de um JAR para outro. (Mesmo sem módulos, esta não é uma prática recomendada, mas com o class path não importa qual JAR contém uma classe, então você poderia se safar. Com o module system em jogo, por outro lado, a origem de uma classe é muito relevante porque a acessibilidade força os usuários a requerer o módulo correto.)
  * O projeto funciona razoavelmente bem no Java 9 e posterior. Se precisar de opções de linha de comando ou outras soluções alternativas, estas devem ser bem documentadas. (Caso contrário, você não pode ter certeza de que não há problemas ocultos em seu código que tornem as outras promessas irrelevantes.)

## Resolução de Módulos para Módulos Automáticos

Módulos automáticos são criados a partir de JARs comuns, então eles não têm dependências explícitas, o que levanta a questão de como eles se comportam durante a resolução. JARs tendem a depender uns dos outros e, se o module system resolvesse apenas módulos automáticos explicitamente requeridos, todos os outros módulos automáticos precisariam ser [adicionados ao grafo com `--add-modules`](<#/doc/tutorials/modules/add-modules-reads>). Imagine fazer isso para um projeto grande com centenas de dependências que você decidiu colocar todas no module path.

Para evitar essa adição manual excessiva e frágil de módulos, o module system puxa _todos_ os módulos automáticos assim que encontra _o primeiro_ que é explicitamente requerido. Em outras palavras, você obtém todos os JARs comuns como módulos automáticos (se pelo menos um for requerido ou adicionado) ou nenhum (caso contrário). Outro aspecto é que os módulos automáticos [implicam legibilidade](<#/doc/tutorials/modules/implied-readability>) em outros módulos automáticos, o que significa que qualquer módulo que lê _um_, lê _todos_ eles.

Se os módulos automáticos pudessem ler apenas outros módulos nomeados, teríamos terminado agora. Uma vez que você coloca um JAR comum no module path, todas as suas dependências diretas teriam que ir para o module path também e, em seguida, suas dependências e assim por diante, até que todas as dependências transitivas sejam tratadas como módulos, explícitos ou automáticos.

Transformar um JAR comum em um módulo automático pode não funcionar, no entanto, por causa das verificações às quais ele é exposto (por exemplo, busca por split packages). Então seria bom poder deixar JARs comuns no class path e tê-los carregados no unnamed module em vez disso. E, de fato, o module system permite exatamente isso, permitindo que módulos automáticos leiam o unnamed module, o que significa que suas dependências podem estar no class path _ou_ no module path.

Quando nos concentramos nos platform modules por um momento, vemos que um módulo automático não pode expressar dependências neles. Como consequência, o grafo de módulos pode ou não contê-los e, se não contiver, o módulo automático provavelmente falhará em tempo de execução com uma exceção devido a classes ausentes. A única maneira de contornar isso é que os mantenedores do projeto documentem publicamente quais módulos eles precisam, para que seus usuários possam garantir que os módulos necessários estejam presentes. Os usuários podem fazer isso requerendo-os explicitamente, por exemplo, no módulo que depende do módulo automático, ou com `--add-modules`.

## Dependendo de Módulos Automáticos

O único propósito dos módulos automáticos é depender de JARs comuns, tornando possível criar módulos explícitos sem ter que esperar até que todas as dependências sejam modularizadas. Há uma ressalva importante, no entanto: Se o manifest do JAR não contiver a entrada `Automatic-Module-Name`, o nome do módulo automático é inferido do nome do arquivo.

Mas, dependendo de sua configuração, diferentes projetos podem usar nomes diferentes para os mesmos JARs. Além disso, a maioria dos projetos usa um repositório local baseado em Maven, onde os arquivos JAR são nomeados `${artifactID}-$VERSION`, a partir do qual o module system provavelmente inferirá _${artifactID}_ como o nome do módulo automático. Isso é problemático porque os artifact ID's geralmente não seguem a convenção de nomenclatura de domínio reverso, o que significa que, uma vez que o projeto seja modularizado, o nome do módulo provavelmente mudará.

Considerando tudo, o mesmo JAR pode obter nomes de módulos diferentes em projetos diferentes (dependendo de sua configuração) e em momentos diferentes (antes e depois da modularização). Isso tem o potencial de causar estragos a jusante e precisa ser evitado a todo custo!

Pode parecer que o erro crítico é requerer um JAR comum por um nome de módulo baseado em seu nome de arquivo. Mas isso geralmente não é o caso - usar essa abordagem é perfeitamente aceitável para aplicações e em outros cenários onde o desenvolvedor tem controle total sobre os module descriptors que requerem tais módulos automáticos. Não, o erro é _publicar_ módulos com tais dependências em um repositório público. Somente então os usuários podem se encontrar em uma situação onde um módulo depende implicitamente de detalhes sobre os quais eles não têm controle e que podem levar a trabalho adicional ou até mesmo a divergências insolúveis.

Portanto, você nunca deve publicar (em um repositório publicamente acessível) módulos que requerem um JAR comum sem uma entrada `Automatic-Module-Name` em seu manifest. Somente com essa entrada os nomes de módulos automáticos são suficientemente estáveis para se confiar. Sim, isso pode significar que você ainda não pode publicar uma versão modularizada de sua biblioteca ou framework e deve esperar que suas dependências adicionem essa entrada. Isso é lamentável, mas fazê-lo de qualquer maneira seria um grande desserviço aos seus usuários.

### Neste tutorial

Módulos Automáticos Nomes de Módulos Automáticos - Pequeno Detalhe, Grande Impacto Resolução de Módulos para Módulos Automáticos Dependendo de Módulos Automáticos

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Código no Class Path - o Módulo Não Nomeado](<#/doc/tutorials/modules/unnamed-module>)

➜

**Tutorial Atual**

Modularização Incremental com Módulos Automáticos

➜

**Próximo na Série**

[Construindo Módulos na Linha de Comando](<#/doc/tutorials/modules/building>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > Modularização Incremental com Módulos Automáticos