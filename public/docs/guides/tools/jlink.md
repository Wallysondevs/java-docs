# O Comando jlink

## Nome

jlink - monta e otimiza um conjunto de módulos e suas dependências em uma imagem de tempo de execução personalizada

## Sinopse

`jlink` [_opções_] `--module-path` _caminho_do_modulo_ `--add-modules` _modulo_[,_modulo_...]

_opções_
     Opções de linha de comando separadas por espaços. Veja Opções do jlink.
_caminho_do_modulo_
     O caminho onde a ferramenta `jlink` descobre módulos observáveis. Esses módulos podem ser arquivos JAR modulares, arquivos JMOD ou módulos explodidos.
_modulo_
     Os nomes dos módulos a serem adicionados à imagem de tempo de execução. A ferramenta `jlink` adiciona esses módulos e suas dependências transitivas.

## Descrição

A ferramenta `jlink` vincula um conjunto de módulos, juntamente com suas dependências transitivas, para criar uma imagem de tempo de execução personalizada.

**Nota:**

Os desenvolvedores são responsáveis por atualizar suas imagens de tempo de execução personalizadas.

## Opções do jlink

`--add-modules` _mod_[`,`_mod_...]
     Adiciona os módulos nomeados, _mod_, ao conjunto padrão de módulos raiz. O conjunto padrão de módulos raiz é vazio.
`--bind-services`
     Vincula módulos de provedores de serviço e suas dependências.
`-c ={0|1|2}` ou `--compress={0|1|2}`
    

Habilita a compressão de recursos:

  * `0`: Sem compressão
  * `1`: Compartilhamento de string constante
  * `2`: ZIP


`--disable-plugin` _pluginname_
     Desabilita o plug-in especificado. Veja Plug-ins do jlink para a lista de plug-ins suportados.
`--endian` {`little`|`big`}
     Especifica a ordem de bytes da imagem gerada. O valor padrão é o formato da arquitetura do seu sistema.
`-h` ou `--help`
     Imprime a mensagem de ajuda.
`--ignore-signing-information`
     Suprime um erro fatal quando JARs modulares assinados são vinculados na imagem de tempo de execução. Os arquivos relacionados à assinatura dos JARs modulares assinados não são copiados para a imagem de tempo de execução.
`--launcher` _comando_`=`_modulo_ ou `--launcher` _comando_`=`_modulo_`/`_main_
     Especifica o nome do comando do launcher para o módulo ou o nome do comando para o módulo e a classe principal (os nomes do módulo e da classe principal são separados por uma barra (`/`)).
`--limit-modules` _mod_[`,`_mod_...]
     Limita o universo de módulos observáveis àqueles no fechamento transitivo dos módulos nomeados, `mod`, mais o módulo principal, se houver, mais quaisquer outros módulos especificados na opção `--add-modules`.
`--list-plugins`
     Lista os plug-ins disponíveis, que você pode acessar através de opções de linha de comando; veja Plug-ins do jlink.
`-p` ou `--module-path` _caminho_do_modulo_
    

Especifica o caminho do módulo.

Se esta opção não for especificada, o caminho do módulo padrão é `$JAVA_HOME/jmods`. Este diretório contém o módulo `java.base` e os outros módulos padrão e JDK. Se esta opção for especificada, mas o módulo `java.base` não puder ser resolvido a partir dela, o comando `jlink` anexa `$JAVA_HOME/jmods` ao caminho do módulo.

`--no-header-files`
     Exclui arquivos de cabeçalho.
`--no-man-pages`
     Exclui páginas man.
`--output` _caminho_
     Especifica o local da imagem de tempo de execução gerada.
`--save-opts` _nome_do_arquivo_
     Salva as opções do `jlink` no arquivo especificado.
`--suggest-providers` [_nome_`,` ...]
     Sugere provedores que implementam os tipos de serviço fornecidos a partir do caminho do módulo.
`--version`
     Imprime informações de versão.
`@`_nome_do_arquivo_
    

Lê opções do arquivo especificado.

Um arquivo de opções é um arquivo de texto que contém as opções e valores que você normalmente inseriria em um prompt de comando. As opções podem aparecer em uma linha ou em várias linhas. Você não pode especificar variáveis de ambiente para nomes de caminho. Você pode comentar linhas prefixando um símbolo de hash (`#`) no início da linha.

O exemplo a seguir é um arquivo de opções para o comando `jlink`:
```
    #Wed Dec 07 00:40:19 EST 2016
    --module-path mlib
    --add-modules com.greetings
    --output greetingsapp
```

## Plug-ins do jlink

**Nota:**

Plug-ins não listados nesta seção não são suportados e estão sujeitos a alterações.

Para opções de plug-in que exigem uma _lista-de-padrões_, o valor é uma lista de elementos separados por vírgulas, com cada elemento usando uma das seguintes formas:

  * _padrão-glob_
  * `glob:`_padrão-glob_
  * `regex:`_padrão-regex_
  * `@`_nome_do_arquivo_
    * _nome_do_arquivo_ é o nome de um arquivo que contém padrões a serem usados, um padrão por linha.



Para uma lista completa de todos os plug-ins disponíveis, execute o comando `jlink --list-plugins`.

### Plug-in `compress`

Opções
     `--compress=`{`0`|`1`|`2`}[`:filter=`_lista-de-padrões_]
Descrição
    

Comprime todos os recursos na imagem de saída.

  * Nível 0: Sem compressão
  * Nível 1: Compartilhamento de string constante
  * Nível 2: ZIP



Um filtro opcional de _lista-de-padrões_ pode ser especificado para listar o padrão de arquivos a serem incluídos.

### Plug-in `include-locales`

Opções
     `--include-locales=`_langtag_[`,`_langtag_]*
Descrição
    

Inclui a lista de locales onde _langtag_ é uma tag de idioma BCP 47. Esta opção suporta a correspondência de locale conforme definido no RFC 4647. Certifique-se de adicionar o módulo jdk.localedata ao usar esta opção.

Exemplo:

> `--add-modules jdk.localedata --include-locales=en,ja,*-IN`

### Plug-in `order-resources`

Opções
     `--order-resources=`_lista-de-padrões_
Descrição
    

Ordena os caminhos especificados em ordem de prioridade. Se `@`_nome_do_arquivo_ for especificado, cada linha na _lista-de-padrões_ deve ser uma correspondência exata para os caminhos a serem ordenados.

Exemplo:

> `--order-resources=/module-info.class,@classlist,/java.base/java/lang/`

### Plug-in `strip-debug`

Opções
     `--strip-debug`
Descrição
     Remove informações de depuração da imagem de saída.

### Plug-in `generate-cds-archive`

Opções
     `--generate-cds-archive`
Descrição
     Gera o arquivo CDS se a imagem de tempo de execução suportar o recurso CDS.

## Exemplos do jlink

O comando a seguir cria uma imagem de tempo de execução no diretório `greetingsapp`. Este comando vincula o módulo `com.greetings`, cuja definição de módulo está contida no diretório `mlib`.
```
    jlink --module-path mlib --add-modules com.greetings --output greetingsapp
```

O comando a seguir lista os módulos na imagem de tempo de execução `greetingsapp`:
```
    greetingsapp/bin/java --list-modules
    com.greetings
    java.base@11
    java.logging@11
    org.astro@1.0
```

O comando a seguir cria uma imagem de tempo de execução no diretório compressedrt que tem os símbolos de depuração removidos, usa compressão para reduzir o espaço e inclui informações de locale do idioma francês:
```
    jlink --add-modules jdk.localedata --strip-debug --compress=2 --include-locales=fr --output compressedrt
```

O exemplo a seguir compara o tamanho da imagem de tempo de execução `compressedrt` com `fr_rt`, que não tem os símbolos de depuração removidos e não usa compressão:
```
    jlink --add-modules jdk.localedata --include-locales=fr --output fr_rt
    
    du -sh ./compressedrt ./fr_rt
    23M     ./compressedrt
    36M     ./fr_rt
```

O exemplo a seguir lista os provedores que implementam `java.security.Provider`:
```
    jlink --suggest-providers java.security.Provider
    
    Suggested providers:
      java.naming provides java.security.Provider used by java.base
      java.security.jgss provides java.security.Provider used by java.base
      java.security.sasl provides java.security.Provider used by java.base
      java.smartcardio provides java.security.Provider used by java.base
      java.xml.crypto provides java.security.Provider used by java.base
      jdk.crypto.cryptoki provides java.security.Provider used by java.base
      jdk.crypto.ec provides java.security.Provider used by java.base
      jdk.crypto.mscapi provides java.security.Provider used by java.base
      jdk.security.jgss provides java.security.Provider used by java.base
```

O exemplo a seguir cria uma imagem de tempo de execução personalizada chamada `mybuild` que inclui apenas `java.naming` e `jdk.crypto.cryptoki` e suas dependências, mas nenhum outro provedor. Observe que essas dependências devem existir no module path:
```
    jlink --add-modules java.naming,jdk.crypto.cryptoki --output mybuild
```

O comando a seguir é semelhante ao que cria uma imagem de tempo de execução chamada `greetingsapp`, exceto que ele vinculará os módulos resolvidos a partir dos módulos raiz com vinculação de serviço; veja o método [`Configuration.resolveAndBind`](<#/>).
```
    jlink --module-path mlib --add-modules com.greetings --output greetingsapp --bind-services
```

O comando a seguir lista os módulos na imagem de tempo de execução greetingsapp criada por este comando:
```
    greetingsapp/bin/java --list-modules
    com.greetings
    java.base@11
    java.compiler@11
    java.datatransfer@11
    java.desktop@11
    java.logging@11
    java.management@11
    java.management.rmi@11
    java.naming@11
    java.prefs@11
    java.rmi@11
    java.security.jgss@11
    java.security.sasl@11
    java.smartcardio@11
    java.xml@11
    java.xml.crypto@11
    jdk.accessibility@11
    jdk.charsets@11
    jdk.compiler@11
    jdk.crypto.cryptoki@11
    jdk.crypto.ec@11
    jdk.crypto.mscapi@11
    jdk.internal.opt@11
    jdk.jartool@11
    jdk.javadoc@11
    jdk.jdeps@11
    jdk.jfr@11
    jdk.jlink@11
    jdk.localedata@11
    jdk.management@11
    jdk.management.jfr@11
    jdk.naming.dns@11
    jdk.naming.rmi@11
    jdk.security.auth@11
    jdk.security.jgss@11
    jdk.zipfs@11
    org.astro@1.0
```