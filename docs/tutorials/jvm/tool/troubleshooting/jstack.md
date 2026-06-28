# Jstack - Imprimindo Stack Traces Java

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Solução de Problemas ](<#/doc/tutorials/jvm/tool/troubleshooting>) > Jstack - Imprimindo Stack Traces Java

**Anterior na Série**

[Jmap - Imprimindo Detalhes de um Processo](<#/doc/tutorials/jvm/tool/troubleshooting/jmap>)

➜

**Tutorial Atual**

Jstack - Imprimindo Stack Traces Java

➜

Este é o fim da série!

**Anterior na Série:** [Jmap - Imprimindo Detalhes de um Processo](<#/doc/tutorials/jvm/tool/troubleshooting/jmap>)

# Jstack - Imprimindo Stack Traces Java

## Apresentando jstack

[jstack](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/jstack.html>) \- imprime stack traces Java de threads Java para um processo Java especificado

## Sinopse

**Nota:** Este comando é experimental e não suportado.

_options_

Isso representa as opções de linha de comando do `jstack`. Veja Opções para o Comando jstack.

_pid_

O ID do processo para o qual o stack trace é impresso. O processo deve ser um processo Java. Para obter uma lista de processos Java em execução em uma máquina, use o comando `ps` ou, se os processos JVM não estiverem sendo executados em uma instância docker separada.

## Descrição

O comando `jstack` imprime stack traces Java de threads Java para um processo Java especificado. Para cada frame Java, o nome completo da classe, nome do método, índice de bytecode (BCI) e número da linha, quando disponíveis, são impressos. Nomes C++ "mangled" não são "demangled". Para "demangle" nomes C++, a saída deste comando pode ser direcionada para `c++filt`. Quando o processo especificado está sendo executado em uma JVM de 64 bits, pode ser necessário especificar a opção `-J-d64`, por exemplo: `jstack -J-d64` _pid_.

**Nota:**

Este comando não é suportado e pode não estar disponível em futuras versões do JDK. Em Sistemas Windows onde o arquivo `dbgeng.dll` não está presente, as Ferramentas de Depuração para Windows (Debugging Tools for Windows) devem ser instaladas para que essas ferramentas funcionem. A variável de ambiente `PATH` precisa conter o local da `jvm.dll` que é usada pelo processo de destino, ou o local de onde o arquivo de core dump foi produzido.

## Opções para o Comando jstack

`-l`

A opção de listagem longa imprime informações adicionais sobre locks.

`-h` ou `-help`

Imprime uma mensagem de ajuda.

### Neste tutorial

Apresentando Jstack Sinopse Descrição Opções para o Comando jstack

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Jmap - Imprimindo Detalhes de um Processo](<#/doc/tutorials/jvm/tool/troubleshooting/jmap>)

➜

**Tutorial Atual**

Jstack - Imprimindo Stack Traces Java

➜

Este é o fim da série!

**Anterior na Série:** [Jmap - Imprimindo Detalhes de um Processo](<#/doc/tutorials/jvm/tool/troubleshooting/jmap>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Solução de Problemas ](<#/doc/tutorials/jvm/tool/troubleshooting>) > Jstack - Imprimindo Stack Traces Java