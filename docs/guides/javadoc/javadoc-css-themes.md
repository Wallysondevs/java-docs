# Temas CSS do JavaDoc

## 2 Temas CSS do JavaDoc

A documentação da API gerada pelo JavaDoc vem com uma folha de estilo CSS padrão (veja [página inicial de Cascading Style Sheets](<https://www.w3.org/Style/CSS/Overview.en.html>)) que define suas propriedades visuais, como fontes, cores e espaçamento. Embora a folha de estilo padrão seja construída com os objetivos de acessibilidade e apelo ao público mais amplo possível, pode haver projetos que prefiram um estilo personalizado que estenda ou substitua a folha de estilo padrão. Este documento fornece informações sobre como conseguir isso, incluindo um exemplo de folha de estilo para um tema CSS escuro.

Tópicos

  * [Opções de Linha de Comando](<#/doc/guides/javadoc/javadoc-css-themes>)
  * [Estrutura da Documentação Gerada](<#/doc/guides/javadoc/javadoc-css-themes>)
  * [Propriedades Personalizadas](<#/doc/guides/javadoc/javadoc-css-themes>)
  * [Criando e Aplicando um Tema Personalizado](<#/doc/guides/javadoc/javadoc-css-themes>)

### Opções de linha de comando

A ferramenta `javadoc` oferece duas opções de linha de comando para personalizar folhas de estilo para a documentação gerada.

  * A opção [`--add-stylesheet`](<https://docs.oracle.com/en/java/javase/25/docs/specs/man/javadoc.html#option-add-stylesheet>) adiciona uma folha de estilo à documentação gerada, além da folha de estilo padrão. As regras na folha de estilo adicionada substituem as regras correspondentes na folha de estilo padrão, então esta opção pode ser usada para definir estilos que alteram seletivamente os estilos na folha de estilo padrão.
  * A opção [`--main-stylesheet`](<https://docs.oracle.com/en/java/javase/25/docs/specs/man/javadoc.html#option-main-stylesheet>) substitui a folha de estilo padrão pela fornecida como argumento para a opção de linha de comando. Isso significa que a folha de estilo personalizada é a única responsável pelo estilo da documentação. É aconselhável usar a folha de estilo padrão como ponto de partida para a folha de estilo personalizada.

Para este guia, usaremos a opção `--add-stylesheet`, porque queremos construir sobre a folha de estilo integrada, substituindo apenas as propriedades que desejamos alterar. É claro que substituir a folha de estilo padrão abre mais possibilidades, mas é muito mais complexo e está além do escopo deste guia.

### Estrutura da Documentação Gerada

A saída da documentação gerada pelo JavaDoc Standard Doclet é descrita em [Saída JavaDoc Gerada pelo Standard Doclet](<https://docs.oracle.com/en/java/javase/25/docs/specs/javadoc/std-doclet-output.html>), que inclui uma lista de [classes CSS](<https://docs.oracle.com/en/java/javase/25/docs/specs/javadoc/std-doclet-output.html#css-classes>) usadas na documentação da API gerada. Embora isso possa servir como referência para aqueles que desejam escrever sua própria folha de estilo JavaDoc do zero, é provavelmente suficiente e muito mais simples personalizar estilos usando as propriedades personalizadas descritas abaixo.

### Propriedades Personalizadas

Propriedades Personalizadas CSS (veja [Usando propriedades personalizadas CSS (variáveis)](<https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties>)) são uma maneira conveniente de definir valores CSS em um só lugar e usá-los em qualquer parte da folha de estilo. A folha de estilo padrão do JavaDoc usa propriedades personalizadas CSS para todas as fontes e cores, tornando possível criar um tema CSS completo simplesmente fornecendo uma folha de estilo contendo propriedades personalizadas redefinidas.

Os nomes das propriedades personalizadas CSS sempre começam com um hífen duplo (`--`). Para serem utilizáveis por todos os elementos da página, a folha de estilo do JavaDoc define suas propriedades personalizadas na pseudo-classe `:root`. O exemplo a seguir mostra como definir o tamanho da fonte do corpo para 15 px.
```
    :root {   --body-font-size: 15px;}
```

O número de propriedades personalizadas na folha de estilo padrão foi intencionalmente mantido pequeno, e muitas das variáveis são usadas em mais de um lugar. Embora isso torne mais simples criar temas consistentes, também limita a liberdade de escolher estilos específicos para elementos individuais da página. Esta é uma escolha deliberada; a limitação pode ser contornada substituindo diretamente as regras CSS subjacentes.

As subseções a seguir documentam as propriedades personalizadas usadas na folha de estilo padrão.

Famílias de fontes

As propriedades a seguir definem as famílias de fontes usadas para vários tipos de texto na página.

`--body-font-family`
    Define a família de fontes base para a página
`--block-font-family`
    Define a família de fontes usada para blocos de documentação
`--code-font-family`
    Define a família de fontes usada para exibir código de programa

Tamanhos de fontes

As propriedades personalizadas a seguir definem os tamanhos de fonte para o texto básico na página. Observe que os tamanhos de fonte para elementos específicos, como títulos e links de navegação, são derivados dessas propriedades personalizadas:

`--body-font-size`
    Define o tamanho da fonte base para texto normal
`--code-font-size`
    Define o tamanho da fonte base para código de programa

Cores de fundo

As propriedades personalizadas a seguir definem as cores de fundo para vários elementos genéricos da página.

`--body-background-color`
    Define a cor de fundo principal da página
`--section-background-color`
    Define a cor de fundo das seções primárias da página
`--detail-background-color`
    Define a cor de fundo da seção de detalhes
`--navbar-background-color`
    Define a cor de fundo da barra de navegação principal e dos botões de aba inativos
`--subnav-background-color`
    Define a cor de fundo da barra de navegação secundária e dos cabeçalhos de tabela
`--selected-background-color`
    Define a cor de fundo dos itens de navegação selecionados e dos botões de aba
`--even-row-color`
    Define a cor de fundo das linhas de tabela de número par em tabelas de resumo
`--odd-row-color`
    Define a cor de fundo das linhas de tabela de número ímpar em tabelas de resumo

Cores de texto

As propriedades personalizadas a seguir definem as cores de texto de vários elementos genéricos da página.

`--body-text-color`
    Define a cor de texto principal da página
`--block-text-color`
    Define a cor de texto para blocos de texto
`--navbar-text-color`
    Define a cor de texto para as barras de navegação
`--selected-text-color`
    Define a cor de texto para itens de navegação selecionados e botões de aba
`--selected-link-color`
    Define a cor de texto para links em itens de navegação selecionados e botões de aba
`--title-color`
    Define a cor de texto para o título da página
`--link-color`
    Define a cor de texto para links
`--link-color-active`
    Define a cor de texto para links ativos

Cores para recursos específicos

As propriedades personalizadas a seguir definem as cores de fundo e de texto para vários elementos específicos na página.

`--snippet-background-color`
    Define a cor de fundo para trechos de código
`--snippet-text-color`
    Define a cor de texto para trechos de código
`--snippet-highlight-color`
    Define a cor de texto para destaques em trechos de código
`--border-color`
    Define a cor para bordas de caixas de seção
`--table-border-color`
    Define a cor para borda de tabelas
`--search-input-background-color`
    Define a cor de fundo para o campo de busca
`--search-input-text-color`
    Define a cor de texto para o campo de busca
`--search-input-placeholder-color`
    Define a cor de texto para o texto de placeholder do campo de busca
`--search-tag-highlight-color`
    Define a cor de fundo para tags de busca destacadas
`--copy-icon-brightness`
    Define o brilho para o ícone de copiar para a área de transferência
`--copy-button-background-color-active`
    Define o fundo para o botão de copiar para a área de transferência
`--invalid-tag-background-color`
    Define a cor de fundo para notificações de tag inválida
`--invalid-tag-text-color`
    Define a cor de texto para notificações de tag inválida

### Criando e Aplicando um Tema Personalizado

O exemplo a seguir mostra como criar uma folha de estilo personalizada que substitui algumas das propriedades personalizadas usadas pela folha de estilo do JavaDoc para criar um tema CSS escuro.

Como precisamos criar alguns arquivos, é uma boa ideia começar com um novo diretório vazio. Em uma janela de Terminal, crie um diretório chamado `javadoc-style` ou algo similar e entre nele.

A primeira coisa de que precisamos é de algum código Java para documentar, então criaremos uma classe de teste simples. Crie um arquivo chamado `Test.java` em seu novo diretório de trabalho vazio com o conteúdo abaixo.
```java
    /**
     * A test class.
     */
    public class Test {
    
        /** 
         * Constructor.
         */
        public Test() {}
    
        /** 
         * Constructor.
         * @param s a string
         */
        public Test(String s) {}
        
        /** 
         * A simple method.
         * @param s a string
         */
        public void hello(String s) {}
    
        /**
         * A method.
         */
        public void foo() {}
    
        /**
         * Another method.
         */
        public void bar() {}
    }
```

O único outro arquivo de que precisamos é um arquivo CSS contendo nosso estilo personalizado. Crie um arquivo chamado `dark-theme.css` em seu diretório de trabalho atual com o seguinte conteúdo:
```css
    :root {
        --body-text-color: #e0e0e3;
        --block-text-color: #e6e7ef;
        --body-background-color: #404040;
        --section-background-color: #484848;
        --detail-background-color: #404040;
        --navbar-background-color: #505076;
        --navbar-text-color: #ffffff;
        --subnav-background-color: #303030;
        --selected-background-color: #f8981d;
        --selected-text-color: #253441;
        --selected-link-color: #1f389c;
        --even-row-color: #484848;
        --odd-row-color: #383838;
        --title-color: #ffffff;
        --link-color: #a0c0f8;
        --link-color-active: #ffb863;
        --snippet-background-color: #383838;
        --snippet-text-color: var(--block-text-color);
        --snippet-highlight-color: #f7c590;
        --border-color: #383838;
        --table-border-color: #000000;
        --search-input-background-color: #000000;
        --search-input-text-color: #ffffff;
        --search-input-placeholder-color: #909090;
        --search-tag-highlight-color: #ffff00;
        --copy-icon-brightness: 250%;
        --copy-button-background-color-active: rgba(168, 168, 176, 0.3);
        --invalid-tag-background-color: #ffe6e6;
        --invalid-tag-text-color: #000000;
    }
```

Em seguida, invocamos a ferramenta `javadoc` com nossa classe Java como argumento principal. Nossa folha de estilo é passada usando a opção [`--add-stylesheet`](<https://docs.oracle.com/en/java/javase/25/docs/specs/man/javadoc.html#option-add-stylesheet>), e a opção `-d` é usada para colocar a documentação gerada em um subdiretório chamado `docs`.
```bash
        javadoc -d docs --add-stylesheet dark-theme.css Test.java
```

Observação:

Os binários JDK apropriados devem estar no seu `PATH` para que isso funcione. Alternativamente, você pode invocar a ferramenta `javadoc` especificando o nome do caminho completo.

Se a invocação de `javadoc` terminar com sucesso, ela criará um diretório chamado `docs` contendo a documentação da API gerada. Se você abrir o arquivo `docs/Test.html` em seu navegador, ele deverá ser semelhante à página mostrada abaixo.

Figura 2-1 Documentação da API usando um tema escuro

[Descrição de "Figura 2-1 Documentação da API usando um tema escuro"](<#/>)

Deve ser simples adaptar a invocação ao seu projeto e sistema de build, e é claro que você pode modificar o tema ao seu gosto ou criar um novo tema do zero. O tema personalizado será usado em cada arquivo HTML que faz parte da documentação gerada.