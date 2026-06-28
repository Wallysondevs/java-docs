# Markdown em Comentários de Documentação

## 4 Markdown em Comentários de Documentação

Markdown é uma linguagem de marcação amplamente utilizada para criar documentos simples. É fácil de ler, escrever e pode ser facilmente convertida para HTML.

[JEP 467 ](<https://openjdk.org/jeps/467>) permite que os comentários de documentação JavaDoc sejam escritos em Markdown, em vez de apenas em uma mistura de HTML e tags `@` do JavaDoc. Este novo recurso está disponível no JDK 23 e posterior.

Tópicos

  * [Introdução](<#/doc/guides/javadoc/using-markdown-documentation-comments>)
  * [Links](<#/doc/guides/javadoc/using-markdown-documentation-comments>)
  * [Tabelas](<#/doc/guides/javadoc/using-markdown-documentation-comments>)
  * [Tags JavaDoc](<#/doc/guides/javadoc/using-markdown-documentation-comments>)
  * [Exemplos de Código](<#/doc/guides/javadoc/using-markdown-documentation-comments>)
  * [Títulos](<#/doc/guides/javadoc/using-markdown-documentation-comments>)
  * [HTML](<#/doc/guides/javadoc/using-markdown-documentation-comments>)
  * [Arquivos Markdown Autônomos](<#/doc/guides/javadoc/using-markdown-documentation-comments>)
  * [Erros](<#/doc/guides/javadoc/using-markdown-documentation-comments>)

### Introdução

O doclet padrão para a ferramenta `javadoc` suporta o uso da variante [CommonMark](<https://spec.commonmark.org/0.31.2/>) do Markdown em comentários de documentação, juntamente com extensões para [Tags JavaDoc](<#/doc/guides/javadoc/using-markdown-documentation-comments>) e [Links](<#/doc/guides/javadoc/using-markdown-documentation-comments>) para elementos de programa.

Para escrever um comentário de documentação usando Markdown, use uma série de comentários de fim de linha adjacentes (veja [JLS: 3.7 Comments](<https://docs.oracle.com/javase/specs/jls/se25/html/jls-3.html#jls-3.7>)), cada um começando com três barras (`///`). O conteúdo do comentário é então determinado da seguinte forma:

  * Qualquer espaço em branco inicial e os três caracteres de barra (`/`) iniciais são removidos de cada linha.

  * As linhas são então deslocadas para a esquerda, removendo caracteres de espaço em branco iniciais, até que a linha não em branco com o menor número de caracteres de espaço em branco iniciais não tenha mais caracteres de espaço em branco iniciais.

  * Caracteres de espaço em branco iniciais adicionais e quaisquer caracteres de espaço em branco finais em cada linha são preservados.

A série de linhas deve ser contígua. Para que uma linha em branco seja incluída no comentário, ela deve começar com qualquer espaço em branco opcional e depois `///`. Uma linha completamente em branco fará com que qualquer comentário precedente e seguinte seja tratado como comentários separados. Nesse caso, todos os comentários, exceto o último, serão descartados, e apenas o último comentário será considerado como um comentário de documentação para qualquer declaração que possa seguir.

Por exemplo,
```
    /// This is the traditional "Hello World!" program.
    public class HelloWorld {
        public static void main(String... args) {
            System.out.println("Hello World!");
        }
    }
    
```

Em tal comentário, você pode usar formatação inline simples do Markdown. Por exemplo,
```
    /// This is the traditional _"Hello World!"_ program.
```

gerará a seguinte saída:
```
    <p>This is the traditional <em>"Hello World!"</em> program.</p>
```

### Links

Para criar um link para um elemento declarado em outro lugar na sua API, você pode usar uma forma estendida de um [link de referência](<https://spec.commonmark.org/0.31.2/#reference-link>) do Markdown, no qual o rótulo para a referência é derivado de uma [referência](<https://docs.oracle.com/en/java/javase/25/docs/specs/javadoc/doc-comment-spec.html#references>) ao próprio elemento.

Para criar um link cujo texto é derivado da identidade do elemento, coloque uma referência ao elemento entre colchetes. Por exemplo, para linkar para `java.util.List`, escreva `[java.util.List]`, ou apenas `[List]` se houver uma declaração `import` para `java.util.List` no código. O texto do link será exibido em fonte monoespaçada. O link é equivalente ao uso da tag JavaDoc padrão `{@link ...}`.

Você pode linkar para qualquer tipo de elemento de programa, como mostrado nos exemplos a seguir:
```
    /// * a module [java.base/]
    /// * a package [java.util]
    /// * a class [String]
    /// * a field [String#CASE_INSENSITIVE_ORDER]
    /// * a method [String#chars()]
```

Para criar um link com texto alternativo, use o formato `[texto][elemento]`. Por exemplo, para criar um link para `java.util.List` com o texto `uma lista`, escreva `[uma lista][List]`. O link será exibido na fonte atual, embora você possa usar detalhes de formatação dentro do texto fornecido. O link é equivalente ao uso da tag JavaDoc padrão `{@linkplain ...}`.

Por exemplo,
```
    /// * [the `java.base` module][java.base/]
    /// * [the `java.util` package][java.util]
    /// * [a class][String]
    /// * [a field][String#CASE_INSENSITIVE_ORDER]
    /// * [a method][String#chars()]
```

Para criar um link de referência para um método que possui parâmetros de array, você deve escapar os colchetes dentro da referência. Por exemplo, aqui está um link de referência para o método `String.copyValueOf(char[])`:
```
    [String#copyValueOf(char\[\])]
```

Para criar um link para IDs definidos pelo usuário e implicitamente definidos na documentação gerada, use a notação `##`. Por exemplo, a classe Java SE [MemoryLayout](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/foreign/MemoryLayout.html#access-mode-restrictions>) tem um título Access mode restrictions com uma âncora correspondente access-mode-restrictions. O exemplo a seguir mostra um link para essa âncora:
```
    /// link to [access mode restrictions][MemoryLayout##access-mode-restrictions]
```

Você também pode usar outras formas de links Markdown; no entanto, links para outros elementos de programa são geralmente os mais comuns.

### Tabelas

Tabelas simples são suportadas usando a sintaxe definida na [GitHub Flavored Markdown Spec](<https://github.github.com/gfm/>). Por exemplo, uma tabela simples pode ser escrita da seguinte forma:
```
    /// | Latin | Greek |
    /// |-------|-------|
    /// | a     | alpha |
    /// | b     | beta  |
    /// | c     | gamma |
```

Legendas e outros recursos que podem ser necessários para acessibilidade não são suportados. Em tais situações, o uso de tabelas HTML ainda é recomendado.

### Tags JavaDoc

As tags JavaDoc, tanto [tags inline](<https://docs.oracle.com/en/java/javase/25/docs/specs/javadoc/doc-comment-spec.html#inline-tags>) (como `{@inheritDoc}`) quanto [tags de bloco](<https://docs.oracle.com/en/java/javase/25/docs/specs/javadoc/doc-comment-spec.html#block-tags>) (como `@param` e `@return`), podem ser usadas em comentários de documentação Markdown, embora nenhuma delas possa ser usada dentro de texto literal, como em um [code span](<https://spec.commonmark.org/0.31.2/#code-span>), que é texto inline entre crases, ou um code block, que é um bloco de texto que é um [bloco de código indentado](<https://spec.commonmark.org/0.31.2/#indented-code-block>) ou cercado por [fences](<https://spec.commonmark.org/0.31.2/#fenced-code-block>), como três crases (`) ou três til (`~~~`).

Por exemplo, o seguinte mostra como as tags JavaDoc podem ser misturadas com Markdown:
```
    /// {@inheritDoc}
    /// In addition, this methods calls [#wait()].
    ///
    /// @param i the index
    public void m(int i) ...
```

Os exemplos a seguir ilustram que as sequências de caracteres `@...` e `{@...}` não têm significado especial dentro de code spans e code blocks:
```
    /// The following code span contains literal text, and not a JavaDoc tag:
    /// `{@inheritDoc}`
    ///
    /// In the following indented code block, `@Override` is an annotation,
    /// and not a JavaDoc tag:
    ///
    ///     @Override
    ///     public void m() ...
    ///
    /// Likewise, in the following fenced code block, `@Override` is an annotation,
    /// and not a JavaDoc tag:
    ///
    /// ```
    /// @Override
    /// public void m() ...
    /// ```
```

Para aquelas tags que podem conter texto com marcação, em um comentário de documentação Markdown, essa marcação também estará no formato Markdown.

Por exemplo, o seguinte mostra o uso de Markdown dentro de uma tag JavaDoc `@param`:

` /// @param the list, or `null` if no list is available`

A tag [`{@inheritDoc}`](<https://docs.oracle.com/en/java/javase/25/docs/specs/javadoc/doc-comment-spec.html#inheritdoc>) é usada para incluir documentação para um método de um ou mais supertipos. O formato do comentário contendo a tag não precisa ser o mesmo que o formato do comentário contendo a documentação a ser herdada.

Por exemplo,
```
    interface Base {
        /** A method. */
        void m()
    }
    
    class Derived implements Base {
        /// {@inheritDoc}
        public void m() { }
    }
```

Tags JavaDoc definidas pelo usuário podem ser usadas em comentários de documentação Markdown, assim como as tags JavaDoc padrão. Por exemplo, na documentação do JDK, `{@jls ...}` é usado e definido como uma forma abreviada para links para a Java Language Specification (JLS). Além disso, tags de bloco como `@implSpec` e `@implNote` introduzem seções de informações específicas.
```
    /// For more information on comments, see {@jls 3.7 Comments}.
    ///
    /// @implSpec
    /// This implementation does nothing.
    public void doSomething() { }
```

### Exemplos de Código

Exemplos de código podem ser incluídos em um comentário de documentação usando code spans ou code blocks do Markdown, ou usando tags [`{@snippet …}`](<https://docs.oracle.com/en/java/javase/25/docs/specs/javadoc/doc-comment-spec.html#snippet>). Embora code spans e code blocks sejam simples e familiares, as tags snippet fornecem funcionalidade adicional, como linkar para outros elementos de programa dentro da documentação gerada.

Em contraste com o uso de comentários tradicionais (veja [JLS: 3.7 Comments](<https://docs.oracle.com/javase/specs/jls/se25/html/jls-3.html#jls-3.7>)), não há restrições sobre os caracteres que podem aparecer após o `///` em cada linha. Em particular, não há restrições sobre o uso de `*/` em comentários de fim de linha.

Por exemplo, você pode incluir qualquer tipo de comentário em exemplos de código-fonte:
```
    /// Here is an example of how to use this method.
    /// 
    /// /* get the next random number */
    /// var i = rgen.nextInt(); 
    /// 
    int nextInt();
```

ou
```
    /// Here is an example of how to use this method.
    /// 
    /// // get the next random number
    /// var i = rgen.nextInt(); 
    /// 
    int nextInt();
```

Os caracteres `*/` também podem aparecer em exemplos contendo expressões regulares:
```
    /// 
    /// // Find all strings ending in '.*/'
    /// return strings.stream().filter(s-> s.matches(".*/"));
    /// 
```

Esses caracteres também podem aparecer em exemplos contendo expressões `glob`:
```
    /// ```
    /// // Find all paths for .txt files in home directories.
    /// return Files.newDirectoryStream(dir, "/home/*/*.txt");
    /// ```
```

### Títulos

Tanto os títulos [setext](<https://spec.commonmark.org/0.31.2/#setext-heading>) quanto os [ATX](<https://spec.commonmark.org/0.31.2/#atx-headings>) são suportados em comentários de documentação Markdown. Os títulos devem começar no nível 1 e aumentar a partir daí. O nível será ajustado automaticamente conforme apropriado quando o conteúdo do comentário for incluído na documentação gerada.
```
    /// Introductory paragraph.
    ///
    /// # Additional details
    /// Here are some additional details
    /// 
    /// # Summary
    /// Here is a summary of the important details.
```

### HTML

Markdown permite o uso cuidadoso de HTML para marcação que não é diretamente suportada pelo Markdown. Markdown diferencia entre [HTML inline](<https://spec.commonmark.org/0.31.2/#raw-html>) (como para `<span ...>...</span>` ou `<sup>...</sup>`) e [blocos HTML](<https://spec.commonmark.org/0.31.2/#html-blocks>) (como para tabelas e listas de definição).
```
    /// This is the traditional <span id="hw">Hello World!</span> program.
```

Você também pode usar entidades HTML para caracteres fora do conjunto de caracteres usado para o código-fonte:
```
    /// This is the traditional &ldquo;Hello World!&rdquo; program.
```

Observe que a sintaxe Markdown não é reconhecida dentro de blocos HTML, embora você possa usar a sintaxe Markdown em parágrafos ou outros blocos entre blocos HTML. Para mais detalhes, consulte as seções [HTML blocks](<https://spec.commonmark.org/0.31.2/#html-blocks>) e [Raw HTML](<https://spec.commonmark.org/0.31.2/#raw-html>) na especificação CommonMark. As tags JavaDoc são suportadas em blocos HTML.

### Arquivos Markdown Autônomos

Arquivos Markdown em subdiretórios `doc-files` são processados apropriadamente, de maneira similar aos arquivos HTML em tais diretórios. As tags JavaDoc em tais arquivos serão processadas. O título da página será inferido do primeiro título. Metadados YAML, como os suportados pelo processador Markdown do Pandoc (veja a seção [Pandoc's Markdown](<https://pandoc.org/MANUAL.html#pandocs-markdown>) no Guia do Usuário do Pandoc), não são suportados.

O arquivo contendo o conteúdo para a página de nível superior ("overview") gerada também pode ser um arquivo Markdown.

### Erros

Exceto por qualquer uso de tags JavaDoc, qualquer outra sequência de caracteres em um comentário de documentação Markdown é um documento CommonMark válido. Em outras palavras, nenhum erro será relatado para qualquer sequência de caracteres que um autor possa considerar uma construção Markdown malformada. Tipicamente, qualquer sequência de caracteres aparecerá na saída gerada como texto literal simples.

Quaisquer problemas encontrados no uso de tags JavaDoc em um comentário de documentação Markdown podem resultar em mensagens de diagnóstico relatadas no console ou conteúdo distintivo, como o seguinte, colocado na documentação gerada:

HTML Source | Rendered HTML
---|---
`<span style="border:1px solid black; background-color:#ffe6e6; padding: 2px">&#x25B6; invalid @code</span>` |

Assim como nos comentários de documentação tradicionais (não-Markdown), é recomendado que os autores revisem cuidadosamente a documentação gerada pelo `javadoc` a partir de seus comentários de documentação para garantir que a saída gerada seja a pretendida.