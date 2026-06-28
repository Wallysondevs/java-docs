# Compreendendo as Diretivas

## Compreendendo as Diretivas

Os tópicos a seguir examinam como as diretivas se comportam e interagem.

Tópicos:

  * [O Que É a Diretiva Padrão?](<#/doc/guides/vm/understanding-directives-better>)

  * [Como as Diretivas São Aplicadas ao Código?](<#/doc/guides/vm/understanding-directives-better>)

  * [Compiler Control e Compatibilidade Retroativa](<#/doc/guides/vm/understanding-directives-better>)

### O Que É a Diretiva Padrão?

A diretiva padrão é uma diretiva do compilador que contém valores padrão para todas as opções de diretiva possíveis. É a diretiva mais inferior na pilha e corresponde a cada método enviado para compilação.

Ao projetar uma nova diretiva do compilador, você especifica como a nova diretiva difere da diretiva padrão. A diretiva padrão se torna um modelo para guiar suas decisões de design.

Valores das Opções de Diretiva na Diretiva Padrão

Você pode imprimir uma pilha de diretivas vazia para revelar os critérios de correspondência e os valores para todas as opções de diretiva na diretiva padrão do compilador:
```
    Directive: (default)
     matching: *.*
     c1 directives:
      inline: -
      Enable:true Exclude:false BreakAtExecute:false BreakAtCompile:false Log:false PrintAssembly:false PrintInlining:false PrintNMethods:false BackgroundCompilation:true ReplayInline:false DumpReplay:false DumpInline:false CompilerDirectivesIgnoreCompileCommands:false DisableIntrinsic: BlockLayoutByFrequency:true PrintOptoAssembly:false PrintIntrinsics:false TraceOptoPipelining:false TraceOptoOutput:false TraceSpilling:false Vectorize:false VectorizeDebug:0 CloneMapDebug:false IGVPrintLevel:0 MaxNodeLimit:80000
    
     c2 directives:
      inline: -
      Enable:true Exclude:false BreakAtExecute:false BreakAtCompile:false Log:false PrintAssembly:false PrintInlining:false PrintNMethods:false BackgroundCompilation:true ReplayInline:false DumpReplay:false DumpInline:false CompilerDirectivesIgnoreCompileCommands:false DisableIntrinsic: BlockLayoutByFrequency:true PrintOptoAssembly:false PrintIntrinsics:false TraceOptoPipelining:false TraceOptoOutput:false TraceSpilling:false Vectorize:false VectorizeDebug:0 CloneMapDebug:false IGVPrintLevel:0 MaxNodeLimit:80000
    
```

Nota:

Certas opções são aplicáveis exclusivamente ao compilador `c2`. Para uma lista completa, consulte [Tabela 2-2](<#/doc/guides/vm/writing-directives>).

Valores das Opções de Diretiva em Novas Diretivas

Em uma nova diretiva, você deve especificar como a diretiva difere da diretiva padrão. Se você não especificar uma opção de diretiva, essa opção manterá o valor da diretiva padrão.

Exemplo:
```
    [
        {
            match: ["*Concurrent.*"],
            c2: {
                MaxNodeLimit: 1000,
            },
            Exclude:true,
        },
    ]
```

Quando você adiciona uma nova diretiva à pilha de diretivas, a diretiva padrão se torna a diretiva mais inferior na pilha. Consulte [Como as Diretivas São Ordenadas na Pilha de Diretivas?](<#/doc/guides/vm/commands-work-directive-files>) para uma descrição deste processo. Para este exemplo, quando você imprime a pilha de diretivas, ela mostra como as opções de diretiva especificadas na nova diretiva diferem dos valores na diretiva padrão:
```
    Directive:
     matching: *Concurrent.*
     c1 directives:
      inline: -
      Enable:true Exclude:true BreakAtExecute:false BreakAtCompile:false Log:false PrintAssembly:false PrintInlining:false PrintNMethods:false BackgroundCompilation:true ReplayInline:false DumpReplay:false DumpInline:false CompilerDirectivesIgnoreCompileCommands:false DisableIntrinsic: BlockLayoutByFrequency:true PrintOptoAssembly:false PrintIntrinsics:false TraceOptoPipelining:false TraceOptoOutput:false TraceSpilling:false Vectorize:false VectorizeDebug:0 CloneMapDebug:false IGVPrintLevel:0 MaxNodeLimit:80000 
    
     c2 directives:
      inline: -
      Enable:true Exclude:true BreakAtExecute:false BreakAtCompile:false Log:false PrintAssembly:false PrintInlining:false PrintNMethods:false BackgroundCompilation:true ReplayInline:false DumpReplay:false DumpInline:false CompilerDirectivesIgnoreCompileCommands:false DisableIntrinsic: BlockLayoutByFrequency:true PrintOptoAssembly:false PrintIntrinsics:false TraceOptoPipelining:false TraceOptoOutput:false TraceSpilling:false Vectorize:false VectorizeDebug:0 CloneMapDebug:false IGVPrintLevel:0 MaxNodeLimit:1000 
    
    
    Directive: (default)
     matching: *.*
     c1 directives:
      inline: -
      Enable:true Exclude:false BreakAtExecute:false BreakAtCompile:false Log:false PrintAssembly:false PrintInlining:false PrintNMethods:false BackgroundCompilation:true ReplayInline:false DumpReplay:false DumpInline:false CompilerDirectivesIgnoreCompileCommands:false DisableIntrinsic: BlockLayoutByFrequency:true PrintOptoAssembly:false PrintIntrinsics:false TraceOptoPipelining:false TraceOptoOutput:false TraceSpilling:false Vectorize:false VectorizeDebug:0 CloneMapDebug:false IGVPrintLevel:0 MaxNodeLimit:80000 
    
     c2 directives:
      inline: -
      Enable:true Exclude:false BreakAtExecute:false BreakAtCompile:false Log:false PrintAssembly:false PrintInlining:false PrintNMethods:false BackgroundCompilation:true ReplayInline:false DumpReplay:false DumpInline:false CompilerDirectivesIgnoreCompileCommands:false DisableIntrinsic: BlockLayoutByFrequency:true PrintOptoAssembly:false PrintIntrinsics:false TraceOptoPipelining:false TraceOptoOutput:false TraceSpilling:false Vectorize:false VectorizeDebug:0 CloneMapDebug:false IGVPrintLevel:0 MaxNodeLimit:80000 
```

### Como as Diretivas São Aplicadas ao Código?

Uma diretiva é aplicada ao código com base em um processo de correspondência de métodos. Cada método enviado para compilação é correspondido com uma diretiva na pilha de diretivas.

O processo de correspondência de um método com uma diretiva na pilha de diretivas é realizado pelo CompilerBroker.

O Processo de Correspondência de Métodos

Quando um método é enviado para compilação, o nome totalmente qualificado do método é comparado com os critérios de correspondência na pilha de diretivas. A primeira diretiva na pilha que corresponde é aplicada ao método. As diretivas restantes na pilha são ignoradas. Se nenhuma correspondência for encontrada, a diretiva padrão é aplicada.

Este processo é repetido para todos os métodos em uma compilação. Mais de uma diretiva pode ser aplicada em uma compilação, mas apenas uma diretiva é aplicada a cada método. Todas as diretivas na pilha são consideradas ativas porque são potencialmente aplicáveis. As principais diferenças entre diretivas ativas e aplicadas são:

  * Uma diretiva é ativa se estiver presente na pilha de diretivas.

  * Uma diretiva é aplicada se estiver afetando o código.

Exemplo 2-1 Quando uma Correspondência É Encontrada

O exemplo a seguir mostra um método enviado para compilação:
```
    public int exampleMethod(int x){
    	return x;
    }
```

Com base nos critérios de correspondência de métodos, a `Directive 2` é aplicada a partir da seguinte pilha de diretivas de exemplo:
```
    Directive 2:
     matching: *.*example*
    Directive 1:
     matching: *.*exampleMethod*
    Directive 0: (default)
     matching: *.*
```

Exemplo 2-2 Quando Nenhuma Correspondência É Encontrada

O exemplo a seguir mostra um método enviado para compilação:
```
    public int otherMethod(int y){
    	return y;
    }
```

Com base nos critérios de correspondência de métodos, a `Directive 0` (a diretiva padrão) é aplicada a partir da seguinte pilha de diretivas de exemplo:
```
    Directive 2:
     matching: *.*example*
    Directive 1:
     matching: *.*exampleMethod*
    Directive 0: (default)
     matching: *.*
```

Diretrizes para Escrever uma Nova Diretiva

  * Nenhum mecanismo de feedback é fornecido para verificar qual diretiva é aplicada a um determinado método. Em vez disso, um profiler como o Java Management Extensions (JMX) é usado para medir os efeitos cumulativos das diretivas aplicadas.

  * O CompilerBroker ignora opções de diretiva que criam código ruim, como forçar instruções de hardware em uma plataforma que não oferece suporte. Uma mensagem de aviso é exibida.

  * As opções de diretiva têm as mesmas limitações que as flags típicas de linha de comando. Por exemplo, as instruções para inline de código são seguidas apenas se a Intermediate Representation (IR) não se tornar muito grande.

### Compiler Control e Compatibilidade Retroativa

CompileCommand e flags de linha de comando podem ser usados juntamente com as diretivas do Compiler Control.

Embora o Compiler Control possa substituir o CompileCommand, a compatibilidade retroativa é fornecida. É possível utilizar ambos ao mesmo tempo. O Compiler Control recebe prioridade. Os conflitos são tratados com base na seguinte priorização:

  1. Compiler Control

  2. CompileCommand

  3. Flags de linha de comando

  4. Valores padrão

Exemplo 2-3 Misturando Compiler Control e CompileCommand

A lista a seguir mostra um pequeno número de opções e valores de compilação:

  * Compiler Control:

    * `Exclude: true`

    * `BreakAtExecute: false`

  * CompileCommand:

    * `BreakAtExecute: true`

    * `BreakAtCompile: true`

  * Valores padrão:

    * `Exclude: false`

    * `BreakAtExecute: false`

    * `BreakAtCompile: false`

    * `Log: false`

Para as opções e valores neste exemplo, a compilação resultante é determinada usando as regras para lidar com conflitos de compatibilidade retroativa:
  * `Exclude: true`

  * `BreakAtExecute: false`

  * `BreakAtCompile: true`

  * `Log: false`