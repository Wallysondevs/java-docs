# Escrevendo Diretivas

## Escrevendo Diretivas

Este tópico examina as opções de Compiler Control e as etapas para escrever diretivas a partir dessas opções.

Tópicos:

  * [Opções de Compiler Control](<#/doc/guides/vm/writing-directives>)

  * [Escrevendo um Arquivo de Diretivas](<#/doc/guides/vm/writing-directives>)

  * [Escrevendo uma Diretiva de Compilador](<#/doc/guides/vm/writing-directives>)

  * [Escrevendo um Padrão de Método em uma Diretiva de Compilador](<#/doc/guides/vm/writing-directives>)

  * [Escrevendo uma Opção de Diretiva inline](<#/doc/guides/vm/writing-directives>)

  * [Evitando Duplicação com a Opção Enable](<#/doc/guides/vm/writing-directives>)

### Opções de Compiler Control

Opções são instruções para compilação. As opções fornecem precisão no contexto do método. As opções disponíveis variam de acordo com o compilador e exigem tipos de valores específicos.

Tabela 2-1 Opções Comuns

Option | Descrição | Tipo de Valor | Valor Padrão
---|---|---|---
`Enable` | Oculta uma diretiva e a torna incompatível se for definida como `false`. Esta opção é útil para evitar a duplicação de opções. Consulte [Evitando Duplicação com a Opção Enable](<#/doc/guides/vm/writing-directives>). | `bool` | `true`
`Exclude` | Exclui métodos da compilação. | `bool` | `false`
`BreakAtExecute` | Define um breakpoint para interromper a execução no início dos métodos especificados ao depurar a JVM. | `bool` | `false`
`BreakAtCompile` | Define um breakpoint para interromper a compilação no início dos métodos especificados ao depurar a JVM. | `bool` | `false`
`Log` | Coloca apenas os métodos especificados em um log. Você deve primeiro definir a opção de linha de comando `-XX:+LogCompilation`. O valor padrão `false` coloca todos os métodos compilados em um log. | `bool` | `false`
`PrintAssembly` | Imprime o código assembly para métodos bytecode e nativos usando a biblioteca externa `disassembler.so`. | `bool` | `false`
`PrintInlining` | Imprime quais métodos são inlined, e onde. | `bool` | `false`
`PrintNMethods` | Imprime nmethods à medida que são gerados. | `bool` | `false`
`BackgroundCompilation` | Compila métodos como uma tarefa em segundo plano. Os métodos são executados no modo interpretador até que a compilação em segundo plano seja concluída. O valor `false` compila métodos como uma tarefa em primeiro plano. | `bool` | `true`
`ReplayInline` | Habilita a mesma funcionalidade `CIReplay` que a opção global correspondente, mas por método. | `bool` | `false`
`DumpReplay` | Habilita a mesma funcionalidade `CIReplay` que a opção global correspondente, mas por método. | `bool` | `false`
`DumpInline` | Habilita a mesma funcionalidade `CIReplay` que a opção global correspondente, mas por método. | `bool` | `false`
`CompilerDirectivesIgnoreCompileCommands` | Ignora todos os CompileCommands. | `bool` | `false`
`DisableIntrinsic` | Desabilita o uso de intrinsics com base em critérios de correspondência de método. | `ccstr` | Sem valor padrão.
`inline` | Força ou impede o inlining de um método com base em critérios de correspondência de método. Consulte [Escrevendo uma Opção de Diretiva inline](<#/doc/guides/vm/writing-directives>). | `ccstr[]` | Sem valor padrão.

Tabela 2-2 Opções Exclusivas do C2

Option | Descrição | Tipo de Valor | Valor Padrão
---|---|---|---
`BlockLayoutByFrequency` | Move ramificações de execução infrequentes do caminho quente. | `bool` | `true`
`PrintOptoAssembly` | Imprime o código assembly gerado após a compilação usando a biblioteca externa `disassembler.so`. Isso requer uma build de depuração da JVM. | `bool` | `false`
`PrintIntrinsics` | Imprime quais métodos intrinsic são usados, e onde. | `bool` | `false`
`TraceOptoPipelining` | Rastreia informações de pipelining, semelhante à opção global correspondente, mas por método. Isso é destinado a builds de depuração lentas e rápidas. | `bool` | `false`
`TraceOptoOutput` | Rastreia informações de pipelining, semelhante à opção global correspondente, mas por método. Isso é destinado a builds de depuração lentas e rápidas. | `bool` | `false`
`TraceSpilling` | Rastreia o derramamento de variáveis (variable spilling). | `bool` | `false`
`Vectorize` | Realiza cálculos em paralelo, através de registradores vetoriais. | `bool` | `false`
`VectorizeDebug` | Realiza cálculos em paralelo, através de registradores vetoriais. Isso requer uma build de depuração da JVM. | `intx` | `0`
`CloneMapDebug` | Permite examinar o `CloneMap` gerado a partir da vetorização. Isso requer uma build de depuração da JVM. | `bool` | `false`
`IGVPrintLevel` | Especifica os pontos onde o grafo do compilador é impresso no Hotspot Ideal Graphic Visualizer (IGV) da Oracle. Um valor mais alto significa maior granularidade. | `intx` | `0`
`MaxNodeLimit` | Define o número máximo de nós a serem usados durante a compilação de um único método. | `intx` | `80000`

Um tipo de valor `ccstr` é um padrão de método. Consulte [Escrevendo um Padrão de Método em uma Diretiva de Compilador](<#/doc/guides/vm/writing-directives>).

A diretiva padrão fornece valores padrão para as opções do compilador. Consulte [O Que É a Diretiva Padrão?](<#/doc/guides/vm/understanding-directives-better>)

### Escrevendo um Arquivo de Diretivas

Diretivas de compilador individuais são escritas em um arquivo de diretivas. Apenas arquivos de diretivas, e não diretivas individuais, podem ser adicionados à pilha de diretivas ativas.

  1. Crie um arquivo com a extensão `.json`. Arquivos de diretivas são escritos usando um subconjunto da sintaxe JSON com pequenas adições e desvios.
  2. Adicione a seguinte sintaxe como um modelo a partir do qual você pode trabalhar:
`[  //Array of Directives
             {   //Directive Block
                 //Directive 1
             },
             {   //Directive Block
                 //Directive 2
             },
         ]
```

Os componentes deste modelo são:

Array de Diretivas
     * Um arquivo de diretivas armazena um array de blocos de diretivas, denotado por um par de colchetes (`[]`).

     * Os colchetes são opcionais se o arquivo contiver apenas um único bloco de diretivas.

Bloco de Diretivas
     * Um bloco é denotado por um par de chaves (`{}`).

     * Um bloco contém uma diretiva individual.

     * Um arquivo de diretivas pode conter qualquer número de blocos de diretivas.

     * Os blocos são separados por uma vírgula (`,`).

     * Uma vírgula é opcional após o último bloco no array.

Diretiva
     * Cada diretiva deve estar dentro de um bloco de diretivas.

     * Um arquivo de diretivas pode conter múltiplas diretivas quando contém múltiplos blocos de diretivas.

Comentários
     * Comentários de linha única são precedidos por duas barras (`//`).

     * Comentários de múltiplas linhas não são permitidos.

  3. Adicione ou remova blocos de diretivas do modelo para corresponder ao número de diretivas que você deseja no arquivo de diretivas.
  4. Em cada bloco de diretivas, escreva uma diretiva de compilador. Consulte Escrevendo uma Diretiva de Compilador.
  5. Reordene os blocos de diretivas, se necessário. A ordem das diretivas em um arquivo é significativa. Diretivas escritas mais próximas do início do array recebem maior prioridade. Para mais informações, consulte Como as Diretivas São Ordenadas na Pilha de Diretivas? e Como as Diretivas São Aplicadas ao Código?.

O exemplo a seguir mostra um arquivo de diretivas completo que contém duas diretivas de compilador:
```
    [  //Array of directives
        {   //Directive Block
            //Directive 1
            match: ["java*.*", "oracle*.*"],
            c1: {
                Enable: true,
                Exclude: true,
                BreakAtExecute: true,
            },
            c2: {
                Enable: false,
                MaxNodeLimit: 1000,
            },
            BreakAtCompile: true,
            DumpReplay: true,
        },
        {   //Directive Block
            //Directive 2
            match: ["*Concurrent.*"],
            c2: {
                Exclude:true,
            },
        },
    ]
```

### Escrevendo uma Diretiva de Compilador

Você deve escrever uma diretiva de compilador dentro de um arquivo de diretivas. Você pode repetir as seguintes etapas para cada diretiva de compilador individual que deseja escrever em um arquivo de diretivas.

Uma diretiva de compilador individual é escrita dentro de um bloco de diretivas em um arquivo de diretivas. Consulte Escrevendo um Arquivo de Diretivas.

  1. Insira o seguinte bloco de código, como um modelo a partir do qual você pode trabalhar, para escrever uma diretiva de compilador individual. Este bloco de código é um bloco de diretivas.
`{
                 match: [],
                 c1: {
                     //c1 directive options
                 },
                 c2: {
                     //c2 directive options
                 },
                 //Directive options applicable to all compilers
             },
```

  2. Forneça o atributo `match` com um array de padrões de método. Consulte [Escrevendo um Padrão de Método em uma Diretiva de Compilador](<#/doc/guides/vm/writing-directives>).

Por exemplo:
`match: ["java*.*", "oracle*.*"],
```

  3. Forneça o atributo `c1` com um bloco de opções de diretiva separadas por vírgulas. Certifique-se de que essas opções sejam válidas para o compilador c1.

Por exemplo:
`c1: {
                     Enable: true,
                     Exclude: true,
                     BreakAtExecute: true,
                 },
```

  4. Forneça o atributo `c2` com um bloco de opções de diretiva separadas por vírgulas. Este bloco pode conter uma mistura de opções de compilador comuns e exclusivas do c2.

Por exemplo:
`c2: {
                     Enable: false,
                     MaxNodeLimit: 1000,
                 },
```

  5. Forneça, ao final da diretiva, as opções que você deseja que sejam aplicáveis a todos os compiladores. Essas opções são consideradas escritas dentro do escopo do bloco comum. As opções são separadas por vírgulas.

Por exemplo:
`BreakAtCompile: true,
                 DumpReplay: true,
```

  6. Limpe o arquivo completando as seguintes etapas.
     1. Verifique a duplicação de opções de diretiva. Se ocorrer um conflito, a última ocorrência de uma opção tem prioridade. Conflitos geralmente ocorrem entre o bloco comum e os blocos c1 ou c2, não entre os blocos c1 e c2.
     2. Evite escrever opções de diretiva exclusivas do c2 no bloco comum. Embora o bloco comum possa aceitar uma mistura de opções comuns e exclusivas do c2, é inútil estruturar uma diretiva dessa forma porque as opções exclusivas do c2 no bloco comum não têm efeito no compilador c1. Escreva as opções exclusivas do c2 dentro do bloco c2.
     3. Se o atributo `c1` ou `c2` não tiver opções de diretiva correspondentes, omita a sintaxe atributo-valor para esse compilador.

O exemplo a seguir mostra a diretiva resultante, baseada em exemplos anteriores:
```
        {
            match: ["java*.*", "oracle*.*"],
            c1: {
                Enable: true,
                Exclude: true,
                BreakAtExecute: true,
            },
            c2: {
                Enable: false,
                MaxNodeLimit: 1000,
            },
            BreakAtCompile: true,
            DumpReplay: true,
        },
```

O formato JSON dos arquivos de diretivas permite os seguintes desvios na sintaxe:

  * Vírgulas extras no final são opcionais em arrays e objetos.

  * Atributos são strings e são opcionalmente colocados entre aspas.

  * Se um array contiver apenas um elemento, os colchetes são opcionais.

Portanto, o exemplo a seguir mostra uma diretiva de compilador válida:
```
        {
           "match": "*Concurrent.*",
            c2: {
                "Exclude": true,
            }
        },
```

### Escrevendo um Padrão de Método em uma Diretiva de Compilador

Um `ccstr` é um padrão de método que você pode escrever com precisão ou generalizar com caracteres curinga. Você pode especificar qual código Java de melhor correspondência deve ter opções de diretiva acompanhantes aplicadas, ou qual código Java deve ser inlined.

Para escrever um padrão de método:

  1. Use a seguinte sintaxe para escrever seu padrão de método: `package/class.method(parameter_list)`. Para generalizar um padrão de método com caracteres curinga, consulte a Etapa 2.

O exemplo a seguir mostra um padrão de método que usa esta sintaxe:
`java/lang/String.indexOf()
```

Outros estilos de formatação estão disponíveis. Isso garante compatibilidade retroativa com formas anteriores de correspondência de métodos, como CompileCommand. Alternativas de formatação válidas para o exemplo anterior incluem:
     * `java/lang/String.indexOf()`
     * `java/lang/String,indexOf()`
     * `java/lang/String indexOf()`
     * `java.lang.String::indexOf()`
O último estilo de formatação corresponde à saída do HotSpot.

  2. Insira um caractere curinga (`*`) onde você deseja generalizar parte do padrão de método.

Os exemplos a seguir são generalizações válidas do exemplo de padrão de método na Etapa 1:
     * `java/lang/String.indexOf*`
     * `*lang/String.indexOf*`
     * `*va/lang*.*dex*`
     * `java/lang/String.*`
     * `*.*`

O aumento da generalização leva à diminuição da precisão. Mais código Java se torna uma correspondência potencial com o padrão de método. Portanto, é importante usar o caractere curinga (`*`) com critério.

  3. Modifique a porção da assinatura do padrão de método, de acordo com as Especificações Java. Uma correspondência de assinatura deve ser exata, caso contrário, a assinatura assume como padrão um caractere curinga (`*`). Assinaturas omitidas também assumem como padrão um caractere curinga. Assinaturas não podem conter o caractere curinga.
  4. **Opcional:** Se você escrever um padrão de método para acompanhar a opção de diretiva `inline`, então você deve prefixar o padrão de método com caracteres adicionais. Consulte Escrevendo uma Opção de Diretiva inline.

### Escrevendo uma Opção de Diretiva inline

O atributo para uma opção de diretiva `inline` requer um array de padrões de método com comandos especiais prefixados. Isso indica quais padrões de método devem ou não devem ser inlined.

  1. Escreva `inline: ` no bloco comum, bloco c1 ou bloco c2 de uma diretiva.
  2. Adicione um array de padrões de método cuidadosamente ordenados. O comando prefixado no primeiro padrão de método correspondente é executado. Os padrões de método restantes no array são ignorados.
  3. Prefixe um `+` para forçar o inlining de qualquer código Java correspondente.
  4. Prefixe um `-` para impedir o inlining de qualquer código Java correspondente.
  5. **Opcional:** Se você precisar que o comportamento de inlining seja aplicado a múltiplos padrões de método, então repita as Etapas 1 a 4 para escrever múltiplas declarações `inline`. Não escreva um único array que contenha múltiplos padrões de método.

Os exemplos a seguir mostram as opções de diretiva `inline`:

  * `inline: ["+java/lang*.*", "-sun*.*"]`
  * `inline: "+java/lang*.*"`

### Evitando Duplicação com a Opção Enable

Você pode usar a opção `Enable` para ocultar aspectos de diretivas e evitar duplicação entre diretivas.

No exemplo a seguir, o atributo `c1` das diretivas do compilador são idênticos:
```
    [
        {
            match: ["java*.*"],
            c1: {
                BreakAtExecute: true,
                BreakAtCompile: true,
                DumpReplay: true,
                DumpInline: true,
            },
            c2: {
                MaxNodeLimit: 1000,
            },
        },
        {
            match: ["oracle*.*"],
            c1: {
                BreakAtExecute: true,
                BreakAtCompile: true,
                DumpReplay: true,
                DumpInline: true,
            },
            c2: {
                MaxNodeLimit: 2000,
            },
        },
    ]
```

O exemplo a seguir mostra como a duplicação de código indesejável é resolvida com a opção `Enable`. `Enable` oculta os blocos de diretivas e os torna incompatíveis.
```
    [
        {
            match: ["java*.*"],
            c1: {
                Enable: false,
            },
            c2: {
                MaxNodeLimit: 1000,
            },
        },
        {
            match: ["oracle*.*"],
            c1: {
                Enable: false,
            },
            c2: {
                MaxNodeLimit: 2000,
            },
        },
        {
            match: ["java*.*", "oracle*.*"],
            c1: {
                BreakAtExecute: true,
                BreakAtCompile: true,
                DumpReplay: true,
                DumpInline: true,
            },
            c2: {
                //Unreachable code
            },
        },
    ]
```

Tipicamente, a primeira diretiva correspondente é aplicada à compilação de um método. A opção `Enable` fornece uma exceção a esta regra. Um método que normalmente seria compilado por `c1` na primeira ou segunda diretiva é agora compilado com o bloco `c1` da terceira diretiva. O bloco `c2` da terceira diretiva é inalcançável porque os blocos `c2` na primeira e segunda diretivas têm prioridade.