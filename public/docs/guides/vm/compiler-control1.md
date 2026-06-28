# Compiler Control

## 2 Compiler Control   
  
Compiler Control oferece uma maneira de controlar a compilação da Java Virtual Machine (JVM) através de opções de diretivas do compilador. O nível de controle é gerenciável em tempo de execução e específico do método.

Uma diretiva do compilador é uma instrução que informa à JVM como a compilação deve ocorrer. Uma diretiva oferece precisão de contexto de método no controle do processo de compilação. Você pode usar diretivas para escrever testes de compilador da JVM pequenos e contidos que podem ser executados sem reiniciar a JVM inteira. Você também pode usar diretivas para criar soluções alternativas para bugs nos compiladores da JVM.

Você pode especificar um arquivo que contém diretivas do compilador ao iniciar um programa através da linha de comando. Você também pode adicionar ou remover diretivas de um programa já em execução usando comandos de diagnóstico.

Compiler Control substitui e é retrocompatível com CompileCommand.

Tópicos:

  * [Escrevendo Diretivas](<#/doc/guides/vm/writing-directives>)
    * [Opções do Compiler Control](<#/doc/guides/vm/writing-directives>)

    * [Escrevendo um Arquivo de Diretivas](<#/doc/guides/vm/writing-directives>)

    * [Escrevendo uma Diretiva do Compilador](<#/doc/guides/vm/writing-directives>)

    * [Escrevendo um Padrão de Método em uma Diretiva do Compilador](<#/doc/guides/vm/writing-directives>)

    * [Escrevendo uma Opção de Diretiva Inline](<#/doc/guides/vm/writing-directives>)

    * [Prevenindo Duplicação com a Opção Enable](<#/doc/guides/vm/writing-directives>)




  * [Compreendendo as Diretivas](<#/doc/guides/vm/understanding-directives-better>)
    * [O Que É a Diretiva Padrão?](<#/doc/guides/vm/understanding-directives-better>)

    * [Como as Diretivas São Aplicadas ao Código?](<#/doc/guides/vm/understanding-directives-better>)

    * [Compiler Control e Retrocompatibilidade](<#/doc/guides/vm/understanding-directives-better>)




  * [Comandos para Trabalhar com Arquivos de Diretivas](<#/doc/guides/vm/commands-work-directive-files>)
    * [Diretivas do Compilador e a Linha de Comando](<#/doc/guides/vm/commands-work-directive-files>)

    * [Diretivas do Compilador e Comandos de Diagnóstico](<#/doc/guides/vm/commands-work-directive-files>)

    * [Como as Diretivas São Ordenadas na Pilha de Diretivas?](<#/doc/guides/vm/commands-work-directive-files>)