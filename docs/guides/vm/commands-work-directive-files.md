# Comandos para Trabalhar com Arquivos de Diretivas

## Comandos para Trabalhar com Arquivos de Diretivas

Este tópico examina comandos e os efeitos de trabalhar com arquivos de diretivas concluídos.

  * [Diretivas do Compilador e a Linha de Comando](<#/doc/guides/vm/commands-work-directive-files>)

  * [Diretivas do Compilador e Comandos de Diagnóstico](<#/doc/guides/vm/commands-work-directive-files>)

  * [Como as Diretivas São Ordenadas na Pilha de Diretivas?](<#/doc/guides/vm/commands-work-directive-files>)


### Diretivas do Compilador e a Linha de Comando

Você pode usar a interface de linha de comando para adicionar e imprimir diretivas do compilador ao iniciar um programa.

Você pode especificar apenas um arquivo de diretivas na linha de comando. Todas as diretivas dentro desse arquivo são adicionadas à pilha de diretivas e ficam imediatamente ativas quando o programa inicia. Adicionar diretivas na linha de comando permite testar os efeitos de desempenho das diretivas durante os estágios iniciais de um programa. Você também pode focar na depuração e desenvolvimento do seu programa.

Adicionando Diretivas Através da Linha de Comando

A seguinte opção de linha de comando especifica um arquivo de diretivas:
```
    XX:CompilerDirectivesFile=file
```

Inclua esta opção de linha de comando ao iniciar um programa Java. O exemplo a seguir mostra esta opção, que inicia `TestProgram`:
```
    java -XX:+UnlockDiagnosticVMOptions -XX:CompilerDirectivesFile=File_A.json TestProgram
```

No exemplo:

  * `-XX:+UnlockDiagnosticVMOptions` habilita opções de diagnóstico. Você deve inserir isso antes de adicionar diretivas na linha de comando.

  * `-XX:CompilerDirectivesFile` é um tipo de opção de diagnóstico. Você pode usá-lo para especificar um arquivo de diretivas a ser adicionado à pilha de diretivas.

  * `File_A.json` é um arquivo de diretivas. O arquivo pode conter múltiplas diretivas, todas as quais são adicionadas à pilha de diretivas ativas quando o programa inicia.

  * Se `File_A.json` contiver erros de sintaxe ou diretivas malformadas, uma mensagem de erro será exibida e `TestProgram` não iniciará.


Imprimindo Diretivas Através da Linha de Comando

Você pode imprimir automaticamente a pilha de diretivas quando um programa inicia ou quando diretivas adicionais são adicionadas através de comandos de diagnóstico. A seguinte opção de linha de comando habilita este comportamento:
```
    -XX:+CompilerDirectivesPrint
```

O exemplo a seguir mostra como incluir este comando de diagnóstico na linha de comando:
```
    java -XX:+UnlockDiagnosticVMOptions -XX:+CompilerDirectivesPrint -XX:CompilerDirectivesFile=File_A.json TestProgram
```

### Diretivas do Compilador e Comandos de Diagnóstico

Você pode usar comandos de diagnóstico para gerenciar quais diretivas estão ativas em tempo de execução. Você pode adicionar ou remover diretivas sem reiniciar um programa em execução.

Criar um único arquivo de diretivas perfeito pode exigir alguma iteração e experimentação. Comandos de diagnóstico fornecem mecanismos poderosos para testar diferentes configurações de diretivas na pilha de diretivas. Comandos de diagnóstico permitem adicionar ou remover diretivas sem reiniciar a JVM de um programa em execução.

#### Obtendo o Número de Identificação do Processo Java

Para testar diretivas, você deve encontrar o número de identificação do processador (PID) do seu programa em execução.

  1. Abra um terminal.
  2. Digite o comando `jcmd`.


O comando `jcmd` retorna uma lista dos processos Java que estão em execução, juntamente com seus números PID. No exemplo a seguir, as informações retornadas sobre `TestProgram`:
```
    11084 TestProgram
```

#### Adicionando Diretivas Através de Comandos de Diagnóstico

Você pode adicionar todas as diretivas em um arquivo à pilha de diretivas através do seguinte comando de diagnóstico.

Sintaxe:
```
    jcmd pid Compiler.directives_add file
```

O exemplo a seguir mostra um comando de diagnóstico:
```
    jcmd 11084 Compiler.directives_add File_B.json
```

O terminal reporta o número de diretivas individuais adicionadas. Se o arquivo de diretivas contiver erros de sintaxe ou diretivas malformadas, uma mensagem de erro será exibida, e nenhuma diretiva do arquivo será adicionada à pilha, e nenhuma alteração será feita ao programa em execução.

#### Removendo Diretivas Através de Comandos de Diagnóstico

Você pode remover diretivas usando comandos de diagnóstico.

Para remover a diretiva individual mais acima da pilha de diretivas, digite:
```
    jcmd pid Compiler.directives_remove
```

Para limpar todas as diretivas que você adicionou à pilha de diretivas, digite:
```
    jcmd pid Compiler.directives_clear
```

Não é possível especificar um arquivo inteiro de diretivas para remover, nem há qualquer outra maneira disponível para remover diretivas em massa.

#### Imprimindo Diretivas Através de Comandos de Diagnóstico

Você pode usar comandos de diagnóstico para imprimir a pilha de diretivas de um programa em execução.

Para imprimir uma descrição detalhada da pilha de diretivas completa, digite:
```
    jcmd pid Compiler.directives_print
```

A saída de exemplo é mostrada em [O Que É a Diretiva Padrão?](<#/doc/guides/vm/understanding-directives-better>)

### Como as Diretivas São Ordenadas na Pilha de Diretivas?

A ordem das diretivas em um arquivo de diretivas, e nas diretivas, é muito importante. A diretiva mais acima e com melhor correspondência na pilha recebe prioridade e é aplicada à compilação do código.

Os exemplos a seguir ilustram a ordem dos arquivos de diretivas em uma pilha de diretivas de exemplo. Os arquivos de diretivas nos exemplos contêm as seguintes diretivas:

  * `File_A` contém `Directive 1` e `Directive 2`.

  * `File_B` contém `Directive 3`.

  * `File_C` contém `Directive 4` e `Directive 5`.


Iniciando uma Aplicação Com ou Sem Diretivas

Você pode iniciar o `TestProgram` sem especificar os arquivos de diretivas.

  * Para iniciar `TestProgram` sem adicionar nenhuma diretiva, na linha de comando, digite o seguinte comando:
`java TestProgram
```

  * `TestProgram` inicia sem nenhum arquivo de diretivas especificado.

  * A diretiva padrão é sempre a diretiva mais abaixo na pilha de diretivas. Figura 2-1 mostra a diretiva padrão como `Directive 0`. Quando você não especifica um arquivo de diretivas, a diretiva padrão também é a diretiva mais acima e recebe prioridade.


Figura 2-1 Iniciando um Programa Sem Diretivas

  
Description of "Figure 2-1 Starting a Program Without Directives"

Você pode iniciar uma aplicação e especificar diretivas.

  * Para iniciar a aplicação `TestProgram` e adicionar as diretivas de `File_A.json` à pilha de diretivas, na linha de comando, digite o seguinte comando:
`java -XX:+UnlockDiagnosticVMOptions -XX:CompilerDirectivesFile=File_A.json TestProgram
```

  * `TestProgram` inicia e as diretivas em `File_A` são adicionadas à pilha. A diretiva mais acima no arquivo de diretivas torna-se a diretiva mais acima na pilha de diretivas.

  * [Figura 2-2](<#/doc/guides/vm/commands-work-directive-files>) mostra que a ordem das diretivas na pilha, de cima para baixo, torna-se [1, 2, 0].


Figura 2-2 Iniciando um Programa com Diretivas

  
[Description of "Figure 2-2 Starting a Program with Directives"](<#/>)

Adicionando Diretivas a uma Aplicação em Execução

Você pode adicionar diretivas a uma aplicação em execução através de comandos de diagnóstico.

  * Para adicionar todas as diretivas de `File_B` à pilha de diretivas, digite o seguinte comando:
`jcmd 11084 Compiler.directives_add File_B.json
```

A diretiva em `File_B` é adicionada ao topo da pilha.

  * Figura 2-3 mostra que a ordem das diretivas na pilha torna-se [3, 1, 2, 0].


Figura 2-3 Adicionando uma Diretiva a um Programa em Execução

  
Description of "Figure 2-3 Adding a Directive to a Running Program"

Você pode adicionar arquivos de diretivas através de comandos de diagnóstico ao `TestProgram` enquanto ele está em execução:

  * Para adicionar todas as diretivas de `File_C` à pilha de diretivas, digite o seguinte comando.
`jcmd 11084 Compiler.directives_add File_C.json
```

  * [Figura 2-4](<#/doc/guides/vm/commands-work-directive-files>) mostra que a ordem das diretivas na pilha torna-se [4, 5, 3, 1, 2, 0].


Figura 2-4 Adicionando múltiplas Diretivas a um Programa em Execução

  
[Description of "Figure 2-4 Adding multiple Directives to a Running Program"](<#/>)

Removendo Diretivas da Pilha de Diretivas

Você pode remover a diretiva mais acima das pilhas de diretivas através de comandos de diagnóstico.

  * Para remover `Directive 4` da pilha, digite o seguinte comando:
`jcmd 11084 Compiler.directives_remove
```

  * Para remover mais, repita este comando de diagnóstico até que apenas a diretiva padrão permaneça. Você não pode remover a diretiva padrão.

  * Figura 2-5 mostra que a ordem das diretivas na pilha torna-se [5, 3, 1, 2, 0].


Figura 2-5 Removendo Uma Diretiva da Pilha

  
Description of "Figure 2-5 Removing One Directive from the Stack"

Você pode remover múltiplas diretivas da pilha de diretivas.

  * Para limpar a pilha de diretivas, digite o seguinte comando:
`jcmd 11084 Compiler.directives_clear
```

  * Todas as diretivas são removidas, exceto a diretiva padrão. Você não pode remover a diretiva padrão.

  * [Figura 2-6](<#/doc/guides/vm/commands-work-directive-files>) mostra que apenas `Directive 0` permanece na pilha.


Figura 2-6 Removendo Todas as Diretivas da Pilha

  
[Description of "Figure 2-6 Removing All Directives from the Stack"](<#/>)