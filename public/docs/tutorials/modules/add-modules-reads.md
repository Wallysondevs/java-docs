# Estendendo o Grafo de Módulos com `--add-modules` e `--add-reads`

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > Estendendo o Grafo de Módulos com `--add-modules` e `--add-reads`

**Anterior na Série**

[Contornando a Encapsulação Forte com `--add-exports` e `--add-opens`](<#/doc/tutorials/modules/add-exports-opens>)

➜

**Tutorial Atual**

Estendendo o Grafo de Módulos com `--add-modules` e `--add-reads`

➜

Este é o fim da série!

**Anterior na Série:** [Contornando a Encapsulação Forte com `--add-exports` e `--add-opens`](<#/doc/tutorials/modules/add-exports-opens>)

# Estendendo o Grafo de Módulos com `--add-modules` e `--add-reads`

Começando com um conjunto inicial de módulos raiz, o sistema de módulos calcula todas as suas dependências e constrói um grafo, onde os módulos são nós e suas relações de legibilidade são arestas direcionadas. Este grafo de módulos pode ser estendido com as flags de linha de comando `--add-modules` e `--add-reads`, que adicionam módulos (e suas dependências) e arestas de legibilidade, respectivamente. A primeira tem alguns casos de uso, a segunda é muito específica, mas de qualquer forma, é bom conhecê-las.

**Nota**: Você precisa conhecer [os fundamentos do sistema de módulos](<#/doc/tutorials/modules/intro>) e [como construir e iniciar a partir da linha de comando](<#/doc/tutorials/modules/building>) para aproveitar ao máximo este artigo.

## Adicionando Módulos Raiz com `--add-modules`

A opção `--add-modules $MODULES`, que está disponível em `javac`, `jlink` e `java` e aceita uma lista de módulos separada por vírgulas, os adiciona ao conjunto de módulos raiz. (Módulos raiz formam o conjunto inicial de módulos a partir do qual a resolução de módulos começa.) Isso permite adicionar módulos (e suas dependências) ao grafo de módulos que, de outra forma, não apareceriam porque o módulo inicial não depende deles (direta ou indiretamente).

A opção `--add-modules` possui três valores especiais:

  * `ALL-DEFAULT` é o conjunto de módulos que é escolhido como módulos raiz ao [iniciar código a partir do classpath](<#/doc/tutorials/modules/unnamed-module>). Isso é útil quando a aplicação é um contêiner que hospeda outras aplicações que, por sua vez, podem depender de módulos não exigidos pelo próprio contêiner.
  * `ALL-SYSTEM` adiciona todos os [módulos do sistema](<#/doc/tutorials/jlink>) ao conjunto raiz, o que às vezes é necessário para estruturas de teste. Esta opção fará com que muitos módulos sejam resolvidos; em geral, `ALL-DEFAULT` deve ser preferido.
  * `ALL-MODULE-PATH` adiciona todos os módulos encontrados no module path ao conjunto raiz. Isso é fornecido para uso por ferramentas de construção como Maven, que já garantem que todos os módulos no module path são necessários. É também um meio conveniente de adicionar módulos automáticos ao conjunto raiz.

Os dois primeiros funcionam apenas em tempo de execução e são usados para casos muito específicos que este artigo não discute. O último pode ser bastante útil, no entanto: Com ele, todos os módulos no module path se tornam módulos raiz e, portanto, todos eles entram no grafo de módulos.

O espaço após `--add-modules` pode ser substituído por um sinal de igual `=`, o que ajuda em algumas configurações de ferramentas: `--add-modules=...`.

### Casos de Uso para Adicionar Módulos

Um caso de uso para `--add-modules` é adicionar [dependências opcionais](<#/doc/tutorials/modules/optional-dependencies>) que não são exigidas de outra forma e, portanto, não entrariam no grafo de módulos. Como exemplo, vamos imaginar um projeto que tem uma dependência opcional de _java.sql_, mas o módulo não é exigido de outra forma:

Outro é definir o conjunto de módulos raiz ao [criar imagens de tempo de execução com `jlink`](<#/doc/tutorials/jlink>).

Ao adicionar módulos, pode ser necessário permitir que outros módulos os leiam, então vamos fazer isso a seguir.

## Adicionando Arestas de Legibilidade com `--add-reads`

A opção de compilador e tempo de execução `--add-reads $MODULE=$TARGETS` adiciona arestas de legibilidade de _$MODULE_ para todos os módulos na lista separada por vírgulas _$TARGETS_. Isso permite que _$MODULE_ acesse todos os tipos públicos em pacotes exportados por esses módulos, mesmo que _$MODULE_ não tenha cláusulas `requires` mencionando-os. Se _$TARGETS_ for definido como `ALL-UNNAMED`, _$MODULE_ pode até ler o módulo sem nome.

O espaço após `--add-reads` pode ser substituído por um sinal de igual `=`, o que ajuda em algumas configurações de ferramentas: `--add-reads=.../...`.

### Exemplo de Adição de Legibilidade

Vamos retornar ao exemplo anterior, onde o código usava _java.sql_, mas não queria depender sempre dele. Uma abordagem alternativa para dependências opcionais seria não listar a dependência e adicioná-la apenas com `--add-modules` e `--add-reads` (isso raramente é útil e geralmente não é recomendado - apenas um exemplo):

### Neste tutorial

Adicionando Módulos Raiz com `--add-modules` Adicionando Arestas de Legibilidade com `--add-reads`

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Contornando a Encapsulação Forte com `--add-exports` e `--add-opens`](<#/doc/tutorials/modules/add-exports-opens>)

➜

**Tutorial Atual**

Estendendo o Grafo de Módulos com `--add-modules` e `--add-reads`

➜

Este é o fim da série!

**Anterior na Série:** [Contornando a Encapsulação Forte com `--add-exports` e `--add-opens`](<#/doc/tutorials/modules/add-exports-opens>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > Estendendo o Grafo de Módulos com `--add-modules` e `--add-reads`