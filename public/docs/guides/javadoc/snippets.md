# Snippets

## 3 Snippets

[JEP 413](<https://openjdk.java.net/jeps/413>) adiciona um recurso ao JavaDoc para melhorar o suporte a exemplos de código na documentação da API para o JDK 18 e versões posteriores. Este guia fornece informações sobre como usar o recurso, utilizando uma série de exemplos simples.

Tópicos

  * [Introdução](<#/doc/guides/javadoc/snippets>)
  * [Snippets Inline](<#/doc/guides/javadoc/snippets>)
  * [Indentação](<#/doc/guides/javadoc/snippets>)
  * [Atributos](<#/doc/guides/javadoc/snippets>)
  * [Comentários de Marcação](<#/doc/guides/javadoc/snippets>)
  * [Regiões](<#/doc/guides/javadoc/snippets>)
  * [Snippets Externos](<#/doc/guides/javadoc/snippets>)
  * [Limitações dos Comentários de Fim de Linha](<#/doc/guides/javadoc/snippets>)
  * [Snippets Híbridos](<#/doc/guides/javadoc/snippets>)
  * [Testando Snippets](<#/doc/guides/javadoc/snippets>)



### Introdução

Autores de documentação de API frequentemente incluem fragmentos de código-fonte em comentários de documentação, usando construções como `{@code ...}` para exemplos curtos ou de uma linha, ou `<pre>{@code ...}</pre>` para exemplos mais longos. A tag `{@snippet ...}` é um substituto para essas técnicas, sendo mais conveniente de usar e oferecendo mais poder e flexibilidade.

É prática comum em comentários de documentação prefixar linhas com caracteres de espaço em branco e um asterisco, como mostrado neste exemplo:
```
    /**
     * The main program.
     *
     * The code calls the following statement:
     * <pre>{@code
     *   System.out.println("Hello, World!");
     * }</pre>
     */
    public static void main(String... args) {
       ...
    }
```

Nos exemplos a seguir, as tags de snippet e os arquivos relacionados são exibidos em blocos indentados com uma borda. Para simplicidade e clareza, as tags de snippet são mostradas sem a decoração tipográfica do comentário que as envolve. (Não é obrigatório nem incorreto usar tal decoração no uso real.) Blocos sem borda são usados para exibir a saída correspondente gerada pelo Standard Doclet. A saída para todos os snippets inclui um botão "Copiar para Área de Transferência" no canto superior esquerdo.

### Snippets Inline

Em sua forma mais simples, `{@snippet ...}` pode ser usado para envolver um fragmento de texto, como código-fonte ou qualquer outra forma de texto estruturado.
```
    {@snippet :
       public static void main(String... args) {
           System.out.println("Hello, World!");
       }
    }
```

Isso aparecerá na saída gerada da seguinte forma:
```
       public static void main(String... args) {
           System.out.println("Hello, World!");
       }
    
```

Além de algumas limitações inerentes, não há restrições sobre o conteúdo de um snippet. As limitações são resultado da incorporação do snippet dentro de um comentário de documentação. As limitações para um snippet inline são:

  * o conteúdo não pode conter o par de caracteres `*/`, pois isso encerraria o comentário que o envolve
  * sequências de escape Unicode (`\uNNNN`) serão interpretadas durante a análise do código-fonte, e, portanto, não é possível distinguir entre a presença de um caractere e a sequência de escape Unicode equivalente, e
  * quaisquer caracteres de chaves (`{}` ) devem ser "balanceados", implicando um número igual de chaves de abertura e fechamento aninhadas apropriadamente, para que a chave de fechamento da tag `@snippet` possa ser determinada.



### Indentação

O conteúdo de um snippet inline é o texto entre a nova linha após os dois pontos iniciais (`:`) e a chave de fechamento final (`}`). [Espaços em branco incidentais](<https://docs.oracle.com/en/java/javase/18/text-blocks/index.html#incidental-white-space>) são removidos do conteúdo da mesma forma que com [`String.stripIndent`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/String.html#stripIndent\(\)>). Isso significa que você pode controlar a quantidade de indentação na saída gerada ajustando a indentação da chave de fechamento final.

Neste exemplo, a tag de snippet é a mesma do exemplo anterior, exceto que a indentação da chave de fechamento final é aumentada, para eliminar a indentação na saída gerada.
```
    {@snippet :
       public static void main(String... args) {
           System.out.println("Hello, World!");
       }
       }
```

Isso aparecerá na saída gerada da seguinte forma:
```
    public static void main(String... args) {
        System.out.println("Hello, World!");
    }
    
```

### Atributos

Um snippet pode ter atributos, que são pares nome=valor. Os valores podem ser citados com caracteres de aspas simples (`'`) ou aspas duplas ("). Valores simples, como identificadores ou números, não precisam ser citados. Nota: sequências de escape não são suportadas em valores de atributos.

O atributo `lang` é usado para identificar a linguagem do texto do snippet e para inferir o tipo de comentário de linha ou comentário de fim de linha que pode ser suportado nessa linguagem. O Standard Doclet reconhece `java` e `properties` como valores suportados. O valor do atributo também é passado para o HTML gerado. O atributo pode ser usado por outras ferramentas que podem ser utilizadas para analisar o texto do snippet.
```
    {@snippet lang="java" :
       public static void main(String... args) {
           System.out.println("Hello, World!");
       }
    }
```

Snippets frequentemente contêm código-fonte Java, mas não se limitam a isso. Snippets podem conter outras formas de texto estruturado, como os recursos que podem aparecer em um arquivo "properties".
```
    {@snippet lang="properties" :
       house.number=42
       house.street=Main St.
       house.town=AnyTown, USA
    }
```

Isso aparecerá na saída gerada da seguinte forma:
```
       house.number=42
       house.street=Main St.
       house.town=AnyTown, USA
    
```

O atributo `id` pode ser usado para fornecer um identificador para nomear exclusivamente um snippet individual. O Standard Doclet não utiliza o atributo, exceto para passá-lo para o HTML gerado. O atributo pode ser usado por outras ferramentas que podem ser utilizadas para analisar o texto do snippet.
```
    {@snippet id="example" :
       public static void main(String... args) {
           System.out.println("Hello, World!");
       }
    }
```

### Comentários de Marcação

Um snippet pode conter comentários de marcação, que podem ser usados para afetar o que é exibido na saída gerada. Comentários de marcação são comentários de fim de linha na linguagem declarada para o snippet e contêm uma ou mais tags de marcação. As tags de marcação geralmente têm a forma `@namearguments`. A maioria dos argumentos são pares nome=valor, caso em que os valores têm a mesma sintaxe que a dos [atributos](<https://docs.oracle.com/en/java/javase/18/code-snippet/index.html#attributes>) da tag de snippet.

Realce

Para realçar toda ou parte de uma linha em um snippet, use a tag `@highlight`. O conteúdo a ser realçado pode ser especificado como uma string literal usando um argumento `substring`, ou com uma expressão regular usando um argumento `regex`. Se nenhum for fornecido, a linha inteira é realçada.

No exemplo a seguir, uma expressão regular simples é usada para especificar que o conteúdo de um literal de string deve ser realçado.
```
    {@snippet :
       public static void main(String... args) {
           System.out.println("Hello, World!");      // @highlight regex='".*"'
       }
    }
```

Isso aparecerá na saída gerada da seguinte forma:
```
       public static void main(String... args) {
           System.out.println("Hello, World!");
       }
    
```

Vinculação

Para vincular texto a declarações de API, use a tag `@link`. O destino do link usa a mesma sintaxe e mecanismo que o usado para tags `{@link ...}` padrão em outros comentários de documentação. Em particular, o conjunto de nomes que podem ser usados em uma tag `@link` é o conjunto de nomes que são visíveis naquele ponto no código-fonte e inclui quaisquer tipos e membros importados.

No exemplo a seguir, o nome do método `println` é vinculado à declaração na documentação da plataforma.
```
    {@snippet :
       public static void main(String... args) {
           System.out.println("Hello, World!");      // @link substring="println" target="PrintStream#println(String)"
       }
    }
```

O uso simples de `PrintStream` implica que o nome é importado pelas declarações de importação no cabeçalho do arquivo-fonte. Seria igualmente correto, mas mais verboso, usar o nome totalmente qualificado da classe.

O snippet aparecerá na saída gerada da seguinte forma:
```
       public static void main(String... args) {
           System.out.println("Hello, World!");
       }
    
```

Modificando Texto

Ao apresentar exemplos, às vezes é conveniente usar uma elipse ou algum outro token para indicar ao leitor que os detalhes específicos naquela posição não importam. No entanto, tais tokens podem ser inválidos na linguagem declarada para o snippet. Para resolver esse problema, você pode usar um valor de placeholder legal no corpo do snippet e usar um comentário de marcador para especificar que o valor do placeholder deve ser substituído por um texto alternativo na saída gerada.

No exemplo a seguir, uma string vazia é usada como valor de placeholder, e a tag `@replace` é usada para especificar que ela deve ser substituída por uma elipse.
```
    {@snippet :
       public static void main(String... args) {
           var text = "";                           // @replace substring='""' replacement=" ... "
           System.out.println(text);
       }
    }
```

Na saída gerada, você pode ver que o literal de string vazia `""` foi substituído por três pontos `...` .
```
       public static void main(String... args) {
           var text =  ... ;
           System.out.println(text);
       }
    
```

Usando Expressões Regulares

Usar expressões regulares pode ser complicado quando você precisa identificar uma instância específica de uma string em uma linha ou região. Nesta situação, você pode usar uma expressão regular com [boundary matchers](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/regex/Pattern.html#bounds>) ou [zero-width lookahead ou lookbehind](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/regex/Pattern.html#special>) para ajudar a selecionar a instância desejada.

No exemplo a seguir, um limite de palavra é usado para isolar uma string que é uma substring de outra string anteriormente na linha.
```
    {@snippet :
        int x2 = x;      // @highlight regex='x\b'
        }
```

Isso aparecerá na saída gerada da seguinte forma:
```
    int x2 = x;

```

No exemplo a seguir, zero-width lookahead é usado para isolar a segunda instância de `x` na instrução. Observe que o `+` no lookahead precisa ser escapado, para evitar que o lookahead seja "um ou mais espaços".
```
    {@snippet :
        x = x + 1;      // @highlight regex='x(?= \+)'
        }
```

Isso aparecerá na saída gerada da seguinte forma:
```
    x = x + 1;
```

Você também poderia usar zero-width lookbehind, caso em que a expressão regular seria `(?!= )x`. A escolha entre usar boundary matchers, lookahead ou lookbehind é apenas uma questão de estilo.

Em geral, ao usar expressões regulares, é recomendado que você sempre verifique a documentação gerada, para garantir que as expressões regulares correspondam ao texto esperado e que a saída seja a pretendida.

### Regiões

Os comentários de marcação nos exemplos anteriores afetaram apenas o conteúdo anterior na mesma linha. No entanto, às vezes é conveniente afetar o conteúdo em um intervalo de linhas, ou região.

As regiões podem ser anônimas ou nomeadas. Para que uma tag de marcação se aplique a uma região anônima, coloque-a no início da região e use uma tag `@end` para marcar o fim da região.

O exemplo a seguir realça todas as ocorrências da palavra `text` na região especificada, bem como substitui parte do conteúdo dentro da região.
```
    {@snippet :
       public static void main(String... args) {    // @highlight region substring="text" type=highlighted
           var text = "";                           // @replace substring='""' replacement=" ... "
           System.out.println(text);
       }                                            // @end
    }
```

Isso aparecerá na saída gerada da seguinte forma:
```
       public static void main(String... args) {
           var text =  ... ;
           System.out.println(text);
       }
    
```

Se você deseja declarar explicitamente a correspondência entre o início e o fim de uma região, você pode usar uma região nomeada, dando um nome com o atributo `region`.

O exemplo a seguir é o mesmo que o anterior, exceto que a região é explicitamente nomeada, neste caso `R1`. Embora este exemplo seja pequeno e simples e não justifique por si só o uso de uma região nomeada, ele serve para ilustrar o mecanismo.
```
    {@snippet :
       public static void main(String... args) {    // @highlight region=R1 substring="text" type=highlighted
           var text = "";                           // @replace substring='""' replacement=" ... "
           System.out.println(text);
       }                                            // @end region=R1
    }
```

Nomear uma região não afeta a saída gerada, que aparecerá da seguinte forma:
```
       public static void main(String... args) {
           var text =  ... ;
           System.out.println(text);
       }
```

As regiões podem ser aninhadas. Regiões aninhadas não precisam ser nomeadas, embora você possa optar por usar regiões nomeadas para maior clareza. Embora talvez incomum, as regiões não precisam ser aninhadas e podem se sobrepor. Para regiões sobrepostas, você deve usar regiões nomeadas, para estabelecer a relação entre o início e o fim das regiões individuais.

### Snippets Externos

Nem sempre é conveniente, ou mesmo possível, usar snippets inline. Pode ser desejável mostrar diferentes partes de um único exemplo, ou incluir comentários `/* ... */`, que não podem ser representados em um snippet inline (porque tais comentários não se aninham e o `*/` final terminaria o comentário que o envolve). A sequência de caracteres `*/` também pode aparecer em literais de string, como padrões glob ou expressões regulares, com os mesmos problemas ao tentar escrever a sequência de caracteres em um comentário tradicional. Para resolver isso, você pode usar snippets externos, onde a tag de snippet referencia o código em um arquivo externo.

Arquivos externos podem ser colocados em um subdiretório `snippet-files` do pacote que contém a tag de snippet, ou em um diretório completamente separado especificado usando a opção `--snippet-path` ao executar `javadoc`. Os exemplos a seguir ilustram as duas maneiras diferentes de organizar os arquivos.

O primeiro exemplo mostra um diretório chamado `src`, contendo o código-fonte para uma classe `p.Main`, uma imagem `icon.png` no subdiretório `doc-files`, e um arquivo para snippets externos, `Snippets.java`, no diretório `snippet-files`. A presença de `doc-files/icon.png` serve apenas para mostrar a similaridade entre o uso dos diretórios `doc-files` e `snippet-files`. Nenhuma opção adicional é necessária para o Standard Doclet localizar os snippets externos neste exemplo.

  * `src`
    * `p`
      * `Main.java`
      * `doc-files`
        * `icon.png`
      * `snippet-files`
        * `Snippets.java`



Nota:

Alguns sistemas de build podem (incorretamente) tratar arquivos no diretório `snippet-files` como parte da hierarquia de pacotes que o envolve, mesmo que `snippet-files` não seja um identificador Java válido e não possa fazer parte de um nome de pacote Java. O diretório `snippet-files` local não pode ser usado nesses casos.

Neste próximo exemplo, semelhante ao anterior, o arquivo `Snippets.java` é movido para uma hierarquia de código-fonte separada. A raiz dessa hierarquia deve ser especificada com a opção `--snippet-path` ao executar `javadoc`.

  * `src`
    * `p`
      * `Main.java`
      * `doc-files`
        * `icon.png`
  * `snippet-files`
    * `Snippets.java`



Snippet Externo Básico

Você pode identificar o arquivo externo para um snippet usando um nome de classe com o atributo `class`, para um arquivo-fonte Java, ou por um nome de arquivo, usando o atributo `file`.

Aqui está um exemplo simples de um snippet externo básico referenciando uma classe chamada `HelloWorld` em um arquivo-fonte externo.
```
    {@snippet class=HelloWorld }
```

Aqui está o conteúdo do arquivo snippet-files/HelloWorld.java, enraizado no mesmo diretório de pacote que o da classe que contém o próprio snippet.
```
    public class HelloWorld {
        /**
         * The ubiquitous "Hello, World!" program.
         */
        public static void main(String... args) {
            System.out.println("Hello, World!");
        }
    }
```

Não surpreendentemente, a saída gerada se parece com o arquivo-fonte externo.
```
    public class HelloWorld {
        /**
         * The ubiquitous "Hello, World!" program.
         */
        public static void main(String... args) {
            System.out.println("Hello, World!");
        }
    }
    
```

Selecionando Parte de um Arquivo Externo

Para incluir apenas parte de um arquivo externo, defina e use uma região nomeada.

Use o atributo `region` na tag `@snippet` para nomear a região dentro do arquivo externo a ser incluída.
```
    {@snippet class=ExternalSnippets region=main }
```

No arquivo-fonte externo, defina a região com as tags `@start` e `@end`.
```
    ...
    /*                                // @start region=main
     * Prints "Hello, World!"
     */
    System.out.println("Hello, World!");
    // @end region=main
    ...
```

O resultado na saída gerada é o seguinte:
```
    /*
     * Prints "Hello, World!"
     */
    System.out.println("Hello, World!");
    
```

Um arquivo externo pode ter mais de uma região, para ser referenciada por diferentes snippets. Aqui está um exemplo de outro snippet que poderia estar no mesmo arquivo que o exemplo anterior. Ele se refere a uma região chamada `join`.
```
    {@snippet class=ExternalSnippets region=join }
```

Aqui está essa região no arquivo-fonte externo:
```
    ...
    // join a series of strings       // @start region=join
    var result = String.join(" ", args);
    // @end region=join
    ...
```

O resultado na saída gerada é o seguinte:
```
    // join a series of strings
    var result = String.join(" ", args);
    
```

Você pode misturar e combinar regiões dentro de um arquivo-fonte externo, com algumas regiões sendo usadas para definir partes do arquivo a serem referenciadas por uma tag de snippet, e outras regiões usadas em conjunto com tags de marcação para realçar ou modificar o texto a ser exibido.

Aqui está uma variação do exemplo anterior, onde a região a ser exibida contém um comentário de marcação para modificar o texto exibido.

A tag `@snippet` é essencialmente a mesma de antes.
```
    {@snippet class=ExternalSnippets region=join2 }
```

O arquivo externo combina tags para marcar a região a ser exibida e um comentário de marcação para modificar o texto exibido.
```
    ...
    // join a series of strings       // @start region=join2
    var delimiter = " " ;             // @replace substring='" "' replacement="..."
    var result = String.join(delimiter, args);
    // @end region=join2
    ...
```

O resultado na saída gerada é o seguinte:
```
    // join a series of strings
    var delimiter = ... ;
    var result = String.join(delimiter, args);
    
```

Tipos de Arquivos Externos

Snippets externos não se limitam a arquivos-fonte Java. Eles podem ser qualquer forma de texto estruturado que seja apropriada para exibição em um elemento HTML `<pre>`. Ao referenciar arquivos não-Java, use o atributo `file` para especificar o caminho do arquivo; ele deve ser relativo ao diretório `snippet-files` local ou ao caminho fornecido pela opção `--snippet-path`.

Aqui está um exemplo de um snippet externo referenciando uma região chamada `house` em um arquivo de propriedades.
```
    {@snippet file=external-snippets.properties region=house }
```

Aqui está a parte relevante desse arquivo de propriedades:
```
    ...
    # @start region=house
    house.number=42
    house.street=Main St.
    house.town=AnyTown, USA
    # @end region=house
    ...
```

O resultado na saída gerada é o seguinte:
```
    house.number=42
    house.street=Main St.
    house.town=AnyTown, USA
    
```

### Limitações dos Comentários de Fim de Linha

Embora os comentários de fim de linha sejam convenientes para usar como comentários de marcação, existem algumas limitações. Nem todas as linguagens suportam comentários de fim de linha, e pode haver restrições sobre onde você pode usar tais comentários. Por exemplo, arquivos de propriedades suportam apenas comentários de linha, onde o caractere de comentário é o primeiro caractere não-branco em uma linha. E, mesmo em arquivos-fonte Java, você não pode usar comentários de fim de linha dentro de um bloco de texto.

Existem duas maneiras de contornar essas limitações. Você pode envolver o texto apropriado com uma região e fazer com que a marcação se aplique ao conteúdo dessa região, mesmo que a região seja apenas uma única linha. Esta seria a maneira de fazer com que um comentário de marcação se aplique ao conteúdo de um bloco de texto em código-fonte Java. Além disso, existe uma sintaxe especial para comentários de marcação nesta situação: se o comentário de marcação terminar com dois pontos (`:`), ele é tratado como se fosse um comentário de fim de linha na linha seguinte.

No exemplo a seguir, uma tag `@highlight` é usada em um arquivo de propriedades para realçar algum texto na linha seguinte:
```
    {@snippet file=external-snippets.properties region=house2 }
```
```
    ...
    # @start region=house2
    house.number=42
    # @highlight substring="Main St." :
    house.street=Main St.
    house.town=AnyTown, USA
    # @end region=house2
    ...
```

O resultado na saída gerada é o seguinte:
```
    house.number=42
    house.street=Main St.
    house.town=AnyTown, USA
    
```

### Snippets Híbridos

Snippets externos são convenientes de usar, porque são relativamente fáceis de compilar e executar como parte de um regime de testes. Snippets inline são convenientes de usar, pelo menos para exemplos curtos, porque permitem ao autor-desenvolvedor ver o conteúdo do snippet no contexto do comentário que o envolve.

Snippets híbridos oferecem o melhor dos dois mundos, embora com um pequeno custo em conveniência. Um snippet híbrido é uma combinação de um snippet inline e um snippet externo. Como um snippet inline, ele tem conteúdo inline como qualquer outro snippet inline, mas como um snippet externo, ele também possui os atributos para especificar um arquivo externo e possivelmente uma região nesse arquivo.

Para evitar qualquer chance de as duas formas ficarem dessincronizadas, o Standard Doclet verifica se o resultado do processamento da tag de snippet como um snippet inline é o mesmo que o processamento como um snippet externo. Dado que isso pode ser um fardo de manutenção durante o desenvolvimento de uma API, é recomendado que o snippet seja inicialmente desenvolvido como um snippet inline ou um snippet externo, e então convertido para um snippet híbrido no final do processo de desenvolvimento, quando o código do snippet estiver estabilizado.

O exemplo a seguir combina dois dos exemplos precedentes, um para um snippet inline e outro para um snippet externo, em um único snippet híbrido. Observe que o conteúdo inline não é exatamente o mesmo que o conteúdo da região no snippet externo. O snippet externo usa uma tag `@replace` para que seja um código compilável, enquanto, por uma questão de legibilidade, o snippet inline mostra `...` diretamente.
```
    {@snippet class=ExternalSnippets region=join2 :
    // join a series of strings
    var delimiter = ... ;
    var result = String.join(delimiter, args);
    }
```

O resultado na saída gerada é o seguinte:
```
    // join a series of strings
    var delimiter = ... ;
    var result = String.join(delimiter, args);
```

### Testando Snippets

O Standard Doclet não compila nem testa snippets; em vez disso, ele suporta a capacidade de ferramentas externas e código de biblioteca para testá-los.

Snippets externos são os mais fáceis de testar porque o conteúdo do snippet é colocado em arquivos-fonte externos, onde o código pode ser compilado e executado com ferramentas padrão apropriadas para o tipo de arquivos-fonte.

Testar snippets inline é mais difícil porque você primeiro precisa localizar os snippets e, em seguida, decidir como processá-los.

Você pode localizar snippets usando uma combinação da [Compiler API](<https://docs.oracle.com/en/java/javase/25/docs/api/java.compiler/javax/tools/package-summary.html>) e da [Compiler Tree API](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.compiler/module-summary.html>) para analisar os arquivos-fonte e obter árvores de sintaxe, [escanear](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.compiler/com/sun/source/util/TreeScanner.html>) essas árvores em busca de declarações e, em seguida, [escanear](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.compiler/com/sun/source/util/DocTreeScanner.html>) as árvores de comentários de documentação associadas em busca de snippets. Você também pode localizar comentários de árvore de documentação para um [elemento](<https://docs.oracle.com/en/java/javase/25/docs/api/java.compiler/javax/lang/model/element/Element.html>), desde que o elemento tenha sido declarado em um arquivo-fonte, usando [DocTrees.getDocCommentTree](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.compiler/com/sun/source/util/DocTrees.html#getDocCommentTree\(javax.lang.model.element.Element\)>).

Após localizar um snippet, o processamento dependerá do tipo de snippet e dos objetivos do teste. Os atributos `lang` e `id` podem ajudar a identificar o tipo e a instância específica de cada snippet encontrado. Se for um snippet de código-fonte Java, com algumas heurísticas, você pode verificar se é um código sintaticamente correto, analisando-o com `javac`, talvez envolvendo-o conforme necessário para formar uma unidade de compilação. Fazer algo mais do que apenas analisar o código do snippet geralmente exigirá mais contexto, que pode ser inferido do `id` do snippet. Por exemplo, o snippet poderia ser injetado em um template que permite que o snippet seja compilado e talvez até executado.