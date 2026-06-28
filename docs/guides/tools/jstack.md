# O Comando jstack

## Nome

jstack - imprime rastreamentos de pilha Java de threads Java para um processo Java especificado

## Sinopse

**Nota:** Este comando é experimental e não suportado.

`jstack` [_options_] _pid_

_options_
     Representa as opções de linha de comando do `jstack`. Veja Opções para o Comando jstack.
_pid_
     O ID do processo para o qual o rastreamento de pilha é impresso. O processo deve ser um processo Java. Para obter uma lista de processos Java em execução em uma máquina, use o comando `ps` ou, se os processos da JVM não estiverem sendo executados em uma instância docker separada, o comando [jps](<#/doc/guides/tools/jps>).

## Descrição

O comando `jstack` imprime rastreamentos de pilha Java de threads Java para um processo Java especificado. Para cada frame Java, o nome completo da classe, nome do método, índice de bytecode (BCI) e número da linha, quando disponíveis, são impressos. Nomes C++ *mangled* não são *demangled*. Para *demangle* nomes C++, a saída deste comando pode ser direcionada para `c++filt`. Quando o processo especificado está sendo executado em uma JVM de 64 bits, pode ser necessário especificar a opção `-J-d64`, por exemplo: `jstack -J-d64` _pid_.

**Nota:**

Este comando não é suportado e pode não estar disponível em futuras versões do JDK. Em sistemas Windows onde o arquivo `dbgeng.dll` não está presente, as Ferramentas de Depuração para Windows devem ser instaladas para que essas ferramentas funcionem. A variável de ambiente `PATH` precisa conter o local do `jvm.dll` que é usado pelo processo de destino, ou o local de onde o arquivo de *core dump* foi produzido.

## Opções para o Comando jstack

`-l`
     A opção de listagem longa imprime informações adicionais sobre *locks*.
`-h` ou `-help`
     Imprime uma mensagem de ajuda.