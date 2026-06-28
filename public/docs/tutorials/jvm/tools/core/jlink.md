# Jlink - Montar e Otimizar um Conjunto de Módulos

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas Principais do JDK ](<#/doc/tutorials/jvm/tools/core>) > Jlink - Montar e Otimizar um Conjunto de Módulos

**Anterior na Série**

[Jar - a Ferramenta de Arquivo](<#/doc/tutorials/jvm/tools/core/jar>)

➜

**Tutorial Atual**

Jlink - Montar e Otimizar um Conjunto de Módulos

➜

**Próximo na Série**

[Jmod - Criar arquivos JMOD](<#/doc/tutorials/jvm/tools/core/jmod>)

**Anterior na Série:** [Jar - a Ferramenta de Arquivo](<#/doc/tutorials/jvm/tools/core/jar>)

**Próximo na Série:** [Jmod - Criar arquivos JMOD](<#/doc/tutorials/jvm/tools/core/jmod>)

# Jlink - Montar e Otimizar um Conjunto de Módulos

## Apresentando jlink

[jlink](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jlink.html>) - monta e otimiza um conjunto de módulos e suas dependências em uma imagem de tempo de execução personalizada. Este artigo fornece uma referência; para um tutorial sobre como usá-lo na prática, [veja aqui](<#/doc/tutorials/jlink>).

## Sinopse

`options` Opções de linha de comando separadas por espaços. Veja Opções de `jlink`.

`modulepath` O caminho onde a ferramenta `jlink` descobre módulos observáveis. Esses módulos podem ser arquivos JAR modulares, arquivos `JMOD` ou módulos explodidos.

`module` Os nomes dos módulos a serem adicionados à imagem de tempo de execução. A ferramenta jlink adiciona esses módulos e suas dependências transitivas.

## Descrição

A ferramenta `jlink` vincula um conjunto de módulos, juntamente com suas dependências transitivas, para criar uma imagem de tempo de execução personalizada.

`--add-modules mod[, mod...]` Adiciona os módulos nomeados, mod, ao conjunto padrão de módulos raiz. O conjunto padrão de módulos raiz está vazio.

`--bind-services` Vincula módulos de provedores de serviço e suas dependências.

`--compress=zip-[0-9]` Configura a compressão da imagem; quanto maior o valor, maior a compressão. Exemplos de níveis de compressão:

  * `zip-0`: Sem compressão
  * `zip-1`: Compressão mais rápida
  * `zip-6`: Padrão
  * `zip-9`: Compressão máxima

`--endian {little|big}` Especifica a ordem de bytes da imagem gerada. O valor padrão é o formato da arquitetura do seu sistema.

`-h` ou `--help` Imprime a mensagem de ajuda.

`--ignore-signing-information` Suprime um erro fatal quando JARs modulares assinados são vinculados na imagem de tempo de execução. Os arquivos relacionados à assinatura dos JARs modulares assinados não são copiados para a imagem de tempo de execução.

`--launcher command=module` ou `--launcher command=module/main` Especifica o nome do comando do launcher para o módulo ou o nome do comando para o módulo e a classe principal (o módulo e os nomes das classes principais são separados por uma barra `/`).

`--limit-modules mod[, mod...]` Limita o universo de módulos observáveis àqueles no fechamento transitivo dos módulos nomeados, mod, mais o módulo principal, se houver, mais quaisquer outros módulos especificados na opção --add-modules.

`--list-plugins` Lista os plug-ins disponíveis, que você pode acessar através de opções de linha de comando. Veja Plug-ins de `jlink`.

`-p` ou `--module-path modulepath` Especifica o module path.

Se esta opção não for especificada, o module path padrão é `$JAVA_HOME/jmods`. Este diretório contém o módulo `java.base` e os outros módulos padrão e do JDK. Se esta opção for especificada, mas o módulo `java.base` não puder ser resolvido a partir dela, o comando `jlink` anexa `$JAVA_HOME/jmods` ao module path.

`--no-header-files` Exclui arquivos de cabeçalho.

`--no-man-pages` Exclui páginas man.

`--output path` Especifica o local da imagem de tempo de execução gerada.

`--save-opts filename` Salva as opções de `jlink` no arquivo especificado.

`--suggest-providers [name, ...]` Sugere provedores que implementam os tipos de serviço fornecidos a partir do module path.

`--version` Imprime informações de versão.

`@filename` Lê opções do arquivo especificado.

Um arquivo de opções é um arquivo de texto que contém as opções e valores que você normalmente inseriria em um prompt de comando. As opções podem aparecer em uma ou várias linhas. Você não pode especificar variáveis de ambiente para nomes de caminho. Você pode comentar linhas prefixando um símbolo de hash `#` no início da linha.

O seguinte é um exemplo de um arquivo de opções para o comando `jlink`:

## Opções

Para opções de plug-in que exigem uma lista de padrões (pattern-list), o valor é uma lista de elementos separados por vírgulas, com cada elemento usando uma das seguintes formas:

  * glob-pattern
  * glob:glob-pattern
  * regex:regex-pattern
  * @filename
    * filename é o nome de um arquivo que contém padrões a serem usados, um padrão por linha.

## Plug-ins

Para uma lista completa de todos os plug-ins disponíveis, execute o comando `jlink --list-plugins`.

**compress** Opções:

Descrição:

**include-locales** Opções:

Descrição:

Exemplo:

**order-resources**

Opções:

Descrição:

Exemplo:

**strip-debug**

Opções:

Descrição:

## Exemplos

O comando a seguir cria uma imagem de tempo de execução no diretório `greetingsapp`. Este comando vincula o módulo `com.greetings`, cuja definição de módulo está contida no diretório `mlib`.

O comando a seguir lista os módulos na imagem de tempo de execução `greetingsapp`:

O comando a seguir cria uma imagem de tempo de execução no diretório compressedrt que tem os símbolos de depuração removidos (stripped of debug symbols), usa compressão para reduzir espaço e inclui informações de localidade do idioma francês:

O exemplo a seguir compara o tamanho da imagem de tempo de execução `compressedrt` com `fr_rt`, que não tem os símbolos de depuração removidos e não usa compressão:

O exemplo a seguir lista os provedores que implementam `java.security.Provider`:

O exemplo a seguir cria uma imagem de tempo de execução personalizada chamada `mybuild` que inclui apenas `java.naming` e `jdk.crypto.cryptoki` e suas dependências, mas nenhum outro provedor. Observe que essas dependências devem existir no module path:

O comando a seguir é semelhante ao que cria uma imagem de tempo de execução chamada `greetingsapp`, exceto que ele vinculará os módulos resolvidos a partir de módulos raiz com service binding:

O comando a seguir lista os módulos na imagem de tempo de execução greetingsapp criada por este comando:

## Mais Aprendizado

### Neste tutorial

Apresentando jlink Sinopse Descrição Opções Plug-ins Exemplos Mais Aprendizado

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Jar - a Ferramenta de Arquivo](<#/doc/tutorials/jvm/tools/core/jar>)

➜

**Tutorial Atual**

Jlink - Montar e Otimizar um Conjunto de Módulos

➜

**Próximo na Série**

[Jmod - Criar arquivos JMOD](<#/doc/tutorials/jvm/tools/core/jmod>)

**Anterior na Série:** [Jar - a Ferramenta de Arquivo](<#/doc/tutorials/jvm/tools/core/jar>)

**Próximo na Série:** [Jmod - Criar arquivos JMOD](<#/doc/tutorials/jvm/tools/core/jmod>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas Principais do JDK ](<#/doc/tutorials/jvm/tools/core>) > Jlink - Montar e Otimizar um Conjunto de Módulos