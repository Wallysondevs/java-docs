# Usando os Recursos de Pré-visualização Disponíveis no JDK

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Usando os Recursos de Pré-visualização Disponíveis no JDK

# Usando os Recursos de Pré-visualização Disponíveis no JDK

## Pré-visualizando Recursos para Melhorar sua Qualidade

Com milhões de pessoas dependendo do Java em produção para cargas de trabalho críticas, o alcance do Java é global. Dada sua profundidade e amplitude, novos recursos devem ser não apenas projetados de maneira clara e completa, mas também implementados de forma confiável e de fácil manutenção. Todos os novos recursos disponibilizados aos desenvolvedores Java para uso em produção devem atingir a mais alta qualidade possível. É, portanto, fundamental fornecer aos desenvolvedores acesso preliminar a novos recursos para incentivar o feedback -- feedback que ajudará a refinar esses recursos e a atingir o nível de qualidade esperado para sua forma final e permanente.

Existem várias categorias de recursos novos e não finais:

1.  Preview (Pré-visualização), para novos recursos da plataforma Java totalmente especificados e implementados, mas ainda sujeitos a ajustes
2.  Experimental, principalmente para novos recursos na HotSpot JVM
3.  Incubating (Incubação) (também conhecidos como módulos incubadores), para APIs e ferramentas JDK potencialmente novas

Aqui estão alguns exemplos de recursos atuais que seguiram o processo descrito acima:

1.  Switch expressions é um recurso de linguagem. Foi pré-visualizado pela primeira vez no Java 12. Uma segunda versão foi pré-visualizada no Java 13. Em seguida, tornou-se um recurso permanente no Java 14.
2.  O Z garbage collector é um recurso do HotSpot. Foi experimental do Java 11 ao Java 14 e tornou-se um recurso de produção no Java 15.
3.  A HTTP/2 Client API é uma API adicionada como um recurso em incubação no Java 9 e Java 10, e foi então transformada em um recurso padrão no Java 11.

Além disso, existem outros recursos não finais que não se encaixam em nenhuma das três categorias acima, que você verá mais tarde.

## Gerenciando Novos Recursos com Propostas de Melhoria do JDK (JEPs)

Novos recursos quase sempre começam como uma Proposta de Melhoria do JDK (JEP), um mecanismo bem definido para gerenciar melhorias não triviais do JDK, como as seguintes:

1.  Um _recurso da linguagem Java_ para a _Especificação da Linguagem Java_ , como text blocks ou records.
2.  Um _recurso da API Java SE_ na plataforma Java principal, como `java.lang.Object`, `java.lang.String` ou `java.io.File`. Tal recurso de API residirá em um módulo cujo nome começa com java.
3.  Um _recurso da API JDK_ com recursos adicionais específicos do JDK, como o JDK Flight Recorder. Tal recurso de API residirá em um módulo cujo nome começa com `jdk`.
4.  Um _recurso de ferramenta JDK_ como `jshell` ou `jlink`.
5.  Um _recurso específico da HotSpot JVM_ , a implementação OpenJDK da Java Virtual Machine. Dois desses recursos são Application Class-Data Sharing e o Z Garbage Collector (ZGC).

Você pode ver as relações nesta imagem:

[](<https://dev.java/assets/images/preview-experimental-incubating.jpg>)

E a importância? Se houver uma alta demanda por uma melhoria, se ela impactar o JDK ou os processos e a infraestrutura pelos quais o próprio JDK é desenvolvido (como mover o repositório de código-fonte do JDK para o GitHub), ou simplesmente porque requer um investimento considerável de engenharia, então ela não é trivial.

A descontinuação de recursos e a melhoria de recursos existentes também passam pelo processo JEP.

A introdução da maioria dos recursos maiores utiliza uma abordagem de duas fases que emprega JEPs, começando com uma fase de acesso preliminar seguida por uma fase de ativação. Pode haver uma ou várias iterações da fase de acesso preliminar durante as quais você tem acesso a recursos não finais. Durante a fase (ou fases) de acesso preliminar, você é encorajado a usar ativamente e ganhar experiência com recursos não finais para fornecer feedback.

Se o feedback que você fornecer destacar oportunidades de melhoria, a próxima iteração poderá abordá-las. Este feedback também pode levar a melhorias na documentação, como um guia do programador que frequentemente acompanha novos recursos de linguagem, os exemplos Javadoc para uma nova API, ou uma página de FAQ.

Finalmente, quando um novo recurso for considerado pronto, uma fase final fará a transição desse novo recurso para um permanente na plataforma Java.

Quem deve oferecer feedback? Bem, os engenheiros agradecem o feedback de vocês, desenvolvedores Java (como sobre uma nova API), de fornecedores de ferramentas (como sobre uma nova ferramenta JDK), etc. No final, todo feedback construtivo e acionável é bem-vindo.

Se você planeja fornecer feedback, faça-o pelos canais oficiais. Comentários postados em redes sociais podem ser interessantes, mas também podem desaparecer muito rapidamente para serem vistos pelas pessoas certas. É por isso que cada JEP designa claramente uma lista de e-mails para coletar feedback. Por exemplo, [JEP 384: Records (Second Preview)](<https://openjdk.org/jeps/384>) (este recurso foi finalizado no JDK 16 em [JEP 395: Records](<https://openjdk.org/jeps/395>)) solicitou feedback usando a [lista de e-mails amber-dev](<https://mail.openjdk.org/mailman/listinfo/amber-dev>).

Em essência, os engenheiros Java estão buscando experiência do mundo real e feedback acionável sobre novos recursos, tornando-os acessíveis precocemente em uma forma não final e realizando quaisquer ajustes necessários antes que esses recursos se tornem partes finais e permanentes da plataforma Java.

## Recursos de Pré-visualização

Recursos da linguagem Java e recursos da API Java têm muita exposição, e qualquer erro em seu design pode ter consequências negativas. Para evitar tal risco, uma JEP específica ([JEP 12: Preview Features](<https://openjdk.org/jeps/12>)) (juntamente com [JEP 8300604: JEP draft: Preview Features: A Look Back, and A Look Ahead](<https://openjdk.org/jeps/8300604>)), oferece a capacidade de pré-visualizar novos recursos da linguagem Java e da API Java.

Um recurso de pré-visualização é aquele que se acredita estar totalmente especificado e implementado, mas que ainda pode mudar antes de ser incluído na plataforma Java de forma final e permanente. Seu feedback será avaliado e usado para fazer eventuais ajustes antes que um recurso se torne permanente.

Por exemplo, o [Project Amber](<https://openjdk.org/projects/amber/>) é um projeto OpenJDK cujo objetivo é melhorar a produtividade do desenvolvedor através de evoluções da linguagem Java. O Amber está aproveitando o mecanismo de recursos de pré-visualização para entregar gradualmente recursos permanentes padrão na plataforma Java. A tabela abaixo mostra as versões do Java no eixo X e os recursos do Amber no eixo Y. Você provavelmente pode ver que duas rodadas de pré-visualização geralmente são adequadas para coletar feedback acionável sobre novos recursos antes de torná-los permanentes, mas nem sempre.

[](<https://dev.java/assets/images/evolution/amber_in_action_24.png>)

Muitos outros recursos serão lançados pelo projeto Amber, você pode verificá-los na [página do Project Amber](<https://openjdk.org/projects/amber/>). Poderiam existir recursos ou mudanças menores do Amber que não usariam JEPs, já que as JEPs são apenas para recursos que exigem um esforço de engenharia significativo.

Para aprofundar, considere a switch expression, que se desenvolveu sob o guarda-chuva do Project Amber e foi pré-visualizada no [Java 12](<https://openjdk.org/projects/jdk/12/>) ([JEP 325: Switch Expressions (Preview)](<https://openjdk.org/jeps/325>)) e no [Java 13](<https://openjdk.org/projects/jdk/13/>) ([JEP 354: Switch Expressions (Second Preview)](<https://openjdk.org/jeps/354>)) antes de ser transformada em um recurso de linguagem padrão no [Java 14](<https://openjdk.org/projects/jdk/14/>) ([JEP 361: Switch Expressions](<https://openjdk.org/jeps/361>)).

No [Java 12](<https://openjdk.org/projects/jdk/12/>), a palavra-chave `break` era usada para produzir um valor para uma switch expression. Seu feedback sugeriu que esse uso de `break` era confuso. Em resposta, ela foi substituída pela palavra-chave [`yield`](<https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.21>).

A switch expression final no [Java 14](<https://openjdk.org/projects/jdk/14/>) manteve a abordagem `yield` pré-visualizada no [Java 13](<https://openjdk.org/projects/jdk/13/>). Embora um recurso de pré-visualização seja destinado a ser muito próximo do final, mudanças ainda são possíveis. Apenas a versão final da switch expression no [Java 14](<https://openjdk.org/projects/jdk/14/>) está sujeita às regras de compatibilidade de longo prazo.

## Recursos Experimentais

Um recurso experimental é um mecanismo de bancada de testes usado para coletar feedback sobre melhorias não triviais do HotSpot. Ao contrário da [JEP 12: Preview Features](<https://openjdk.org/jeps/12>) para recursos de pré-visualização, não há uma JEP que governe os recursos experimentais; o processo para recursos experimentais é mais uma convenção estabelecida do HotSpot do que um processo formal.

Vamos pegar o Z Garbage Collector como exemplo. O ZGC oferece um tempo de pausa de garbage collection de baixa latência, abaixo de 10 ms, mas tipicamente em torno de 2 ms, independentemente do tamanho do heap, mesmo que o heap seja tão pequeno quanto alguns megabytes, ou tão grande quanto múltiplos terabytes.

A equipe do ZGC aproveitou o mecanismo de recursos experimentais várias vezes, com o ZGC inicialmente introduzido no JDK 11 como um recurso experimental limitado ao Linux x64 ([JEP 333: ZGC: A Scalable Low-Latency Garbage Collector (Experimental)](<https://openjdk.org/jeps/333>)). Desde então, melhorias adicionais foram adicionadas ao ZGC (por exemplo, descarregamento de classes concorrente, descomprometimento de memória e plataformas adicionais), enquanto outras capacidades do ZGC foram aprimoradas.

O feedback geral e a experiência coletados durante essas iterações permitiram que o ZGC fosse gradualmente solidificado a ponto de agora ter a alta qualidade esperada para um recurso do HotSpot. Consequentemente, a [JEP 377: ZGC: A Scalable Low-Latency Garbage Collector (Production)](<https://openjdk.org/jeps/377>) formalmente transformou o ZGC em um recurso de produção regular do HotSpot no [Java 15](<https://openjdk.org/projects/jdk/15/>).

## Módulos Incubadores

A [JEP 11: Incubator Modules](<https://openjdk.org/jeps/11>) introduz a noção de incubação para permitir a inclusão de APIs JDK e ferramentas JDK que, um dia, após melhorias e estabilizações, poderão ser incluídas e suportadas na plataforma Java ou no JDK.

Por exemplo, a HTTP/2 Client API esteve em incubação, como uma API específica do JDK no JDK 9 e no JDK 10 via [JEP 110: HTTP/2 Client (Incubator)](<https://openjdk.org/jeps/110>), para finalmente deixar essa fase de incubação e ser incluída como uma API Java padrão no [Java 11](<https://openjdk.org/projects/jdk/11/>) ([JEP 321: HTTP Client](<https://openjdk.org/jeps/321>)).

## Usando Recursos de Pré-visualização

Salvaguardas importantes impedem que os desenvolvedores usem recursos não finais acidentalmente. Isso é necessário porque um recurso não final pode ser bem diferente quando se tornar final e permanente em uma versão futura do Java. Além disso, apenas recursos finais e permanentes estão sujeitos às rigorosas regras de compatibilidade retroativa do Java.

Portanto, para evitar o uso não intencional, os recursos de pré-visualização e experimentais são desativados por padrão, e a documentação do JDK avisa inequivocamente sobre a natureza não final desses recursos e de quaisquer de suas APIs associadas.

Os recursos de pré-visualização são específicos para uma determinada versão de recurso do Java e exigem o uso de flags especiais tanto em tempo de compilação quanto em tempo de execução.

O exemplo abaixo mostra como usar recursos de pré-visualização com base em um recurso que estava em pré-visualização no [Java 16](<https://openjdk.org/projects/jdk/16/>).

Suponha que você esteja usando o JDK 16 e precise avaliar a [JEP 397: Sealed Classes (Second Preview)](<https://openjdk.org/jeps/397>). (Nota: Sealed Classes tornou-se um recurso permanente do JDK 17, conforme [JEP 409: Sealed Classes](<https://openjdk.org/jeps/409>))

Vamos criar a seguinte interface `Shape` sealed.

```java
sealed interface Shape permits Circle, Square { }
```

Você precisa de uma primeira classe `Square` obrigatória, que você precisa armazenar no mesmo pacote ou módulo que a interface `Shape`.

```java
final class Square implements Shape { }
```

E uma segunda classe `Circle` obrigatória.

```java
final class Circle implements Shape { }
```

Se você compilar essas classes com o comando clássico a seguir:

```bash
javac Shape.java Square.java Circle.java
```

Você receberá a seguinte mensagem de erro:

```
Shape.java:1: error: 'sealed' is a preview feature and is disabled by default.
sealed interface Shape permits Circle, Square { }
^
  (use --enable-preview to enable preview features)
1 error
```

Você recebe esta mensagem porque a palavra-chave `permits` não existe no Java 16. Para compilar esta classe, você precisa declarar que deseja ativar os recursos de pré-visualização para que isso funcione. O comando correto é o seguinte, assumindo que você esteja usando um JDK 16.

```bash
javac --enable-preview --release 16 Shape.java Square.java Circle.java
```

A compilação então será bem-sucedida, com a seguinte mensagem que o alerta sobre o uso dos recursos de pré-visualização.

```
Note: Shape.java uses preview language features.
Note: Recompile with -Xlint:preview for details.
```

Vamos criar a seguinte classe que usa essas classes.

```java
public class Main {
    public static void main(String[] args) {
        Shape shape = new Square();
        if (shape instanceof Square s) {
            System.out.println("It's a square!");
        } else if (shape instanceof Circle c) {
            System.out.println("It's a circle!");
        }
    }
}
```

Depois de compilá-lo usando Java 16 com os recursos de pré-visualização ativados, você pode digitar o seguinte para executar esta classe:

```bash
java --enable-preview --release 16 Main
```

As seguintes linhas serão impressas no console.

```
It's a square!
```

A maioria das IDEs suporta o uso de recursos de pré-visualização, o que não apenas permite que você use recursos de pré-visualização em sua IDE favorita, mas também ajuda essas IDEs a suportar esses recursos logo após se tornarem permanentes e finais.

A propósito, artefatos que exigem recursos não finais não devem ser distribuídos. Por exemplo, não distribua um artefato que utilize um recurso de pré-visualização no Maven Central porque o artefato será executado apenas em uma versão específica do Java.

## Usando Recursos Experimentais

Recursos experimentais são recursos da JVM e são desativados por padrão; a flag `-XX:+UnlockExperimentalVMOptions` instrui o HotSpot a permitir recursos experimentais. O recurso experimental real pode então ser ativado por meio de flags específicas. Por exemplo, antes do Java 15, quando o ZGC ainda era um recurso experimental, você poderia usar `-XX:+UseZGC` para ativá-lo.

## Usando Módulos Incubadores

Finalmente, os módulos incubadores também são protegidos contra uso acidental porque a incubação só pode ser feita no namespace `jdk.incubator`. Portanto, uma aplicação no classpath deve usar a opção de linha de comando `--add-modules` para solicitar explicitamente a resolução de um recurso em incubação. Alternativamente, uma aplicação modular deve especificar dependências `requires` ou `requires transitive` diretamente em um recurso em incubação.

## Avaliando Projetos com as Builds de Acesso Antecipado

[Loom](<https://openjdk.org/projects/loom/>), [Panama](<https://openjdk.org/projects/panama/>) e [Valhalla](<https://wiki.openjdk.org/display/valhalla/>) são exemplos de projetos de longo prazo do OpenJDK. O objetivo desses projetos é conduzir investigações fundamentais em áreas específicas para melhorar drasticamente (ou reformular completamente) certos aspectos da plataforma Java. Por exemplo, o objetivo do Loom é trazer maior concorrência para a plataforma Java, tornando as threads mais leves e fáceis de usar.

Dado o seu escopo ambicioso, esses projetos entregarão iterativamente, ao longo de várias versões de recursos do Java, múltiplos recursos que, juntos, abordam a área em questão. Para conseguir isso, várias investigações serão conduzidas, diferentes protótipos serão desenvolvidos para experimentar soluções potenciais, e algumas abordagens podem ser abandonadas ou reimaginadas.

Como seria de esperar, este trabalho leva tempo e exige esforços consideráveis de engenharia. Recursos inovadores desenvolvidos sob os auspícios desses projetos não conseguem aproveitar os mecanismos regulares de feedback; porque estão simplesmente inacabados, não possuem a estabilidade esperada. Isso não significa que o feedback de uso não seria valioso. Pelo contrário, o feedback inicial pode potencialmente informar algumas das discussões de design e validar protótipos iniciais.

Para coletar tal feedback precocemente, às vezes existem builds de acesso antecipado específicas para recursos inovadores enquanto eles estão sendo projetados e desenvolvidos. O objetivo único de tais builds de acesso antecipado (EA) do JDK, específicas para recursos ocasionais, é apenas permitir que usuários experientes testem recursos inovadores específicos precocemente.

Dada a audiência-alvo altamente qualificada, mas limitada, das builds EA, os líderes de projeto têm a capacidade de flexibilizar algumas regras (por exemplo, em termos de compatibilidade) ou impor restrições (por exemplo, para permitir que alguns aspectos de um recurso inovador estejam parcialmente ausentes). Por exemplo, a primeira build EA do Loom apareceu em julho de 2019; a segunda build EA veio seis meses depois. Esta segunda build foi, nas palavras do líder do projeto, "um afastamento drástico da API na primeira build EA", demonstrando que os recursos de acesso antecipado não estão sujeitos a nenhuma regra de compatibilidade. Isso também reafirma que uma build EA deve ser usada apenas por usuários experientes para testar um recurso inovador dentro do escopo daquela build EA específica.

As builds de Acesso Antecipado do JDK estão disponíveis em `jdk.java.net`. Além de definir o escopo de uma build EA e documentar limitações e problemas conhecidos, a página de download também designa a lista de e-mails apropriada para fornecer feedback. Com o tempo, o feedback e a experiência coletados para recursos inovadores contribuem para remodelá-los e refiná-los. Uma vez que um determinado recurso atinge o nível de estabilidade e qualidade esperado, ele é então capaz de aproveitar os mecanismos regulares, como JEPs com ou sem mecanismos de feedback, com o objetivo final de se tornar um recurso permanente da plataforma Java.

## Mais Aprendizado

### Neste tutorial

Pré-visualizando Recursos para Melhorar sua Qualidade Gerenciando Novos Recursos com Propostas de Melhoria do JDK (JEPs) Recursos de Pré-visualização Recursos Experimentais Módulos Incubadores Usando Recursos de Pré-visualização Usando Recursos Experimentais Usando Módulos Incubadores Avaliando Projetos com as Builds de Acesso Antecipado Mais Aprendizado

Última atualização: 1º de dezembro de 2023

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > Usando os Recursos de Pré-visualização Disponíveis no JDK

[Voltar para a Lista de Tutoriais](<#/doc/tutorials/learn>)