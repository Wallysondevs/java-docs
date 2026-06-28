# Ferramenta JavaDoc

## 1 Ferramenta JavaDoc

A ferramenta JavaDoc é um programa que lê arquivos fonte Java e arquivos de classe em um formato que pode ser analisado por um *back end* plugável, chamado *doclet*.

Para usar a ferramenta JavaDoc, você deve:

  * Usar código fonte que contenha comentários de documentação Java.

  * Executar a ferramenta `javadoc` com um *doclet* para analisar os comentários de documentação e quaisquer outras *tags* especiais. Se você não especificar um *doclet* no comando, o *Standard Doclet* é usado por padrão.

O conteúdo de quaisquer arquivos gerados é específico do *doclet*. O *Standard Doclet* gera saída HTML, mas um *doclet* diferente poderia gerar outra saída, como um relatório de palavras com erros de ortografia ou erros gramaticais.

Se você especificar um *doclet* diferente do *Standard Doclet*, as descrições neste guia podem não se aplicar à operação desse *doclet* ou aos arquivos (se houver) que são gerados.

Além das descrições neste guia, os usuários da ferramenta JavaDoc e os desenvolvedores de conteúdo devem usar a seguinte documentação:

  * Para autores que escrevem documentação de API de conteúdo: [Documentation Comment Tag Specification for the Standard Doclet](<https://docs.oracle.com/en/java/javase/25/docs/specs/javadoc/doc-comment-spec.html>)

  * Para usuários que executam a ferramenta para gerar documentação de API: [The javadoc Command](<https://docs.oracle.com/en/java/javase/25/docs/specs/man/javadoc.html>)

  * Para leitores de documentação de API (usuários finais): A página de Ajuda, em qualquer documentação gerada. O conteúdo da página de Ajuda será personalizado para o conteúdo da API e o comando usado para gerar a documentação. Por exemplo, veja a [ página de Ajuda](<https://docs.oracle.com/en/java/javase/25/docs/api/help-doc.html#overview>) para a especificação da API Java SE e JDK.

### Recursos do JavaDoc

Os recursos do JavaDoc incluem suporte aprimorado para exemplos de código, pesquisa, páginas de resumo, sistema de módulos, Doclet API, suporte HTML e DocLint.

Suporte Aprimorado para Exemplos de Código

O *Standard Doclet* oferece suporte aprimorado para exemplos de código, conforme descrito em [JEP 413: Code Snippets in Java API Documentation](<https://openjdk.java.net/jeps/413>). Veja [Snippets](<#/doc/guides/javadoc/snippets>) para informações detalhadas.

Pesquisa

Quando a ferramenta JavaDoc executa o *Standard Doclet*, ela gera uma saída que permite aos usuários pesquisar na documentação gerada por elementos e frases-chave adicionais definidas na documentação da API gerada. Os resultados da pesquisa incluem caracteres correspondentes de qualquer posição na *string* de pesquisa. O recurso de Pesquisa também pode fornecer redirecionamento de página com base na seleção do usuário.

Nota:

O recurso de Pesquisa usa JavaScript. Se você desabilitar o JavaScript em seu navegador, não poderá usar o recurso de Pesquisa. No entanto, todas as informações do recurso de Pesquisa também estão disponíveis no Índice A-Z presente em qualquer documentação de API gerada. O Índice A-Z está em HTML simples e não requer o uso de JavaScript. Veja [Javadoc Search Specification](<https://docs.oracle.com/en/java/javase/25/docs/specs/javadoc/javadoc-search-spec.html>) para informações detalhadas sobre o uso da Pesquisa.

Páginas de Resumo

O *Standard Doclet* pode gerar várias páginas de resumo adicionais com base em descrições detalhadas de declarações individuais contidas na API. Essas páginas incluem informações sobre novas APIs, APIs descontinuadas (*deprecated*), valores constantes e formas serializadas. Encontre links para essas páginas na barra de navegação principal no topo de cada página ou no Índice A-Z.

Sistema de Módulos

A ferramenta `javadoc` suporta comentários de documentação em declarações de módulo. Algumas opções de linha de comando do JavaDoc permitem que você especifique o conjunto de módulos a serem documentados e gere uma página de resumo para quaisquer módulos que estejam sendo documentados. Veja [The javadoc Command](<https://docs.oracle.com/en/java/javase/25/docs/specs/man/javadoc.html>) para informações detalhadas.

Doclet API

A Doclet API suporta todos os recursos de linguagem mais recentes. Veja o módulo [ jdk.javadoc](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.javadoc/module-summary.html>) para informações detalhadas.

Suporte HTML

O *Standard Doclet* usa os padrões web atuais para gerar documentação.

Nota:

O *Standard Doclet* não repara ou corrige quaisquer erros de HTML em comentários de documentação. Erros de HTML podem fazer com que a documentação da API gerada falhe na validação por um verificador de conformidade.

DocLint

DocLint é um recurso fornecido pela ferramenta JavaDoc, bem como pelo compilador Java do JDK, `javac`, para detectar e relatar problemas em comentários de documentação que podem fazer com que a saída não seja como o autor pretendia. Os problemas incluem comentários ausentes, referências a itens não declarados (talvez devido a um erro de ortografia), erros de acessibilidade, HTML malformado e erros de sintaxe. Dependendo da gravidade de cada problema, ele pode ser relatado como um aviso (*warning*) ou um erro (*error*). Veja [The javadoc Command](<https://docs.oracle.com/en/java/javase/25/docs/specs/man/javadoc.html>) para mais informações sobre DocLint.

Nota:

Embora recursos como o DocLint possam ser úteis na detecção de problemas, é fortemente recomendado que os autores sempre verifiquem e revisem a documentação da API gerada, para garantir que ela esteja conforme o pretendido.