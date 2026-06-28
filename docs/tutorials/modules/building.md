# Construindo Módulos na Linha de Comando

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > Construindo Módulos na Linha de Comando

**Anterior na Série**

[Modularização Incremental com Módulos Automáticos](<#/doc/tutorials/modules/automatic-module>)

➜

**Tutorial Atual**

Construindo Módulos na Linha de Comando

➜

**Próximo na Série**

[Encapsulamento Forte (de Internos do JDK)](<#/doc/tutorials/modules/strong-encapsulation>)

**Anterior na Série:** [Modularização Incremental com Módulos Automáticos](<#/doc/tutorials/modules/automatic-module>)

**Próximo na Série:** [Encapsulamento Forte (de Internos do JDK)](<#/doc/tutorials/modules/strong-encapsulation>)

# Construindo Módulos na Linha de Comando

Ao usar o sistema de módulos para criar módulos para seu código, você provavelmente fará isso em um projeto que usa uma ferramenta de build e, portanto, é tarefa dela fazer as coisas corretamente. Mas ajuda tremendamente entender o que é "correto" e como configurar `javac`, `jar` e `java` para compilar, empacotar e executar sua aplicação. Isso lhe dará uma melhor compreensão do sistema de módulos e ajudará a depurar problemas caso a ferramenta de build não faça as coisas corretamente.

**Nota**: Você precisa conhecer [os fundamentos do sistema de módulos](<#/doc/tutorials/modules/intro>) para aproveitar ao máximo este artigo. Você também pode querer verificar [a descrição das ferramentas principais do JDK](<#/doc/tutorials/jvm/tools/core>).

## Uma Build Básica

Dado um projeto com alguns arquivos-fonte, uma declaração de módulo e algumas dependências, é assim que você pode compilá-lo, empacotá-lo e executá-lo da maneira mais simples:

Há um monte de placeholders (marcadores de posição) aqui:

  * `$DEPS` é a lista de dependências. Estes são tipicamente caminhos para arquivos JAR separados por `:` (Unix) ou `;` (Windows), mas no module path, isso também pode ser apenas nomes de pastas (sem o truque `/*` que é exigido no class path).
  * `$CLASS_FOLDER` é o caminho para a pasta onde os arquivos `*.class` serão gravados.
  * `$SOURCES` é a lista de arquivos `*.java` e deve incluir `module-info.java`.
  * `$JAR` é o caminho para o arquivo JAR que será criado.
  * `$CLASSES` é a lista de arquivos `*.class` que foi criada durante a compilação (portanto, encontrada em `$CLASS_FOLDER`) e deve incluir `module-info.class`.
  * `$MODULE_NAME/$MAIN_CLASS` é o nome do módulo inicial (ou seja, aquele onde a resolução de módulos começa) seguido pelo nome da classe que contém o método `main` da aplicação.

Para um projeto simples no estilo "Hello World" com a estrutura comum `src/main/java`, apenas um único arquivo-fonte, dependências em uma pasta `deps`, e usando a pasta `target` do Maven, ficaria assim:

## Definindo uma Classe Principal

A opção `jar` `--main-class $MAIN_CLASS` incorpora `$MAIN_CLASS` como a classe que contém o método `main` no descritor do módulo, o que permite iniciar um módulo sem ter que nomear a classe principal:

Note que é possível sobrescrever essa classe e iniciar outra, simplesmente nomeando-a como antes:

## Contornando o Encapsulamento Forte

O sistema de módulos é [muito rigoroso quanto ao acesso a APIs internas](<#/doc/tutorials/modules/strong-encapsulation>): Se o pacote não for exportado ou aberto, o acesso será negado. Mas um pacote não pode ser apenas exportado ou aberto pelo autor de um módulo - existem também as flags de linha de comando `--add-exports` e `--add-opens`, que permitem ao _usuário_ do módulo fazer isso também.

Como exemplo, veja este código que tenta criar uma instância da classe interna `sun.util.BuddhistCalendar`:

Para compilá-lo e executá-lo, precisamos usar `--add-exports`:

Se o acesso for reflexivo...

... a compilação funcionará sem configuração adicional, mas precisamos adicionar `--add-opens` ao executar o código:

Detalhes sobre [encapsulamento forte](<#/doc/tutorials/modules/strong-encapsulation>) e [como contorná-lo com `add-exports` e `add-opens`](<#/doc/tutorials/modules/add-exports-opens>).

## Estendendo o Grafo de Módulos

Começando com um conjunto inicial de módulos raiz, o sistema de módulos calcula todas as suas dependências e constrói um grafo, onde os módulos são nós e suas relações de legibilidade são arestas direcionadas. Este [grafo de módulos pode ser estendido](<#/doc/tutorials/modules/add-modules-reads>) com as flags de linha de comando `--add-modules` e `--add-reads`, que adicionam módulos (e suas dependências) e arestas de legibilidade, respectivamente.

Como exemplo, vamos imaginar um projeto que tem [uma dependência opcional](<#/doc/tutorials/modules/optional-dependencies>) em _java.sql_, mas o módulo não é de outra forma exigido. Isso significa que ele não é adicionado ao grafo de módulos sem uma pequena ajuda:

Uma abordagem alternativa para dependências opcionais seria não listar a dependência de forma alguma e apenas adicioná-la com `--add-modules` e `--add-reads` (isso raramente é útil e geralmente não é recomendado - apenas um exemplo):

Detalhes sobre [estender o grafo de módulos com `--add-modules` e `--add-reads`](<#/doc/tutorials/modules/add-modules-reads>).

### Neste tutorial

Uma Build Básica Definindo uma Classe Principal Contornando o Encapsulamento Forte Estendendo o Grafo de Módulos

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Modularização Incremental com Módulos Automáticos](<#/doc/tutorials/modules/automatic-module>)

➜

**Tutorial Atual**

Construindo Módulos na Linha de Comando

➜

**Próximo na Série**

[Encapsulamento Forte (de Internos do JDK)](<#/doc/tutorials/modules/strong-encapsulation>)

**Anterior na Série:** [Modularização Incremental com Módulos Automáticos](<#/doc/tutorials/modules/automatic-module>)

**Próximo na Série:** [Encapsulamento Forte (de Internos do JDK)](<#/doc/tutorials/modules/strong-encapsulation>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > Construindo Módulos na Linha de Comando