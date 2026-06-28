# Javap - o Desmontador

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas Principais do JDK ](<#/doc/tutorials/jvm/tools/core>) > Javap - o Desmontador 

**Anterior na Série**

[Javac - o Compilador](<#/doc/tutorials/jvm/tools/core/javac>)

➜

**Tutorial Atual**

Javap - o Desmontador

➜

**Próximo na Série**

[Javadoc - o Gerador de Documentação](<#/doc/tutorials/jvm/tools/core/javadoc>)

**Anterior na Série:** [Javac - o Compilador](<#/doc/tutorials/jvm/tools/core/javac>)

**Próximo na Série:** [Javadoc - o Gerador de Documentação](<#/doc/tutorials/jvm/tools/core/javadoc>)

# Javap - o Desmontador

 

## Apresentando o Javap

[javap](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/javap.html>) \- desmonta um ou mais arquivos de classe

**options** Especifica as opções de linha de comando. Veja [Opções](<#/doc/tutorials/jvm/tools/core/javap>) para o javap.

**classes** Especifica uma ou mais classes separadas por espaços a serem processadas para anotações. Você pode especificar uma classe que pode ser encontrada no classpath pelo seu nome de arquivo, URL, ou pelo seu nome de classe totalmente qualificado.

Aqui estão alguns exemplos para a especificação de classes. 

 

## Descrição

O comando `javap` desmonta um ou mais arquivos de classe. A saída depende das opções utilizadas. Quando nenhuma opção é usada, o comando `javap` imprime os campos e métodos package private, protected e public das classes passadas a ele.

O comando `javap` não é compatível com JARs multirelease. Usar a forma de classpath do comando resulta na visualização da entrada base em todos os arquivos JAR, multirelease ou não. Usando a forma de URL, você pode usar a forma de URL de um argumento para especificar uma versão específica de uma classe a ser desmontada.

O comando `javap` imprime sua saída para `stdout`.

 

## Opções

`help, --help, or -?` Imprime uma mensagem de ajuda para o comando javap.

`-version` Imprime informações de lançamento.

`-verbose or -v` Imprime informações adicionais sobre a classe selecionada.

`-l` Imprime tabelas de linha e de variáveis locais.

`-public` Mostra apenas classes e membros public.

`-protected` Mostra apenas classes e membros protected e public.

`-package` Mostra classes e membros package/protected/public (padrão).

`-private` or `-p` Mostra todas as classes e membros.

`-c` Imprime o código desmontado, por exemplo, as instruções que compõem os bytecodes Java, para cada um dos métodos na classe.

`-s` Imprime assinaturas de tipo internas.

`-sysinfo` Mostra informações do sistema (caminho, tamanho, data, hash MD5) da classe sendo processada.

`-constants` Mostra constantes static final.

`--module module` or `-m module` Especifica o módulo contendo classes a serem desmontadas.

`--module-path path` Especifica onde encontrar módulos de aplicação.

`--system jdk` Especifica onde encontrar módulos do sistema.

`--class-path path`, `-classpath` path, or `-cp path` Especifica o caminho que o comando javap usa para encontrar arquivos de classe do usuário. Ele sobrescreve o padrão ou a variável de ambiente CLASSPATH quando definida.

`-bootclasspath path` Sobrescreve a localização dos arquivos de classe bootstrap.

`-Joption` Passa a opção especificada para a JVM. Por exemplo:

 

## Exemplos

Compile a seguinte classe HelloWorldFrame:

A saída do comando javap `HelloWorldFrame.class` produz o seguinte:

A saída do comando `javap -c HelloWorldFrame.class` produz o seguinte:

### Neste tutorial

Apresentando o Javap Descrição Opções Exemplos

  


Última atualização: 14 de setembro de 2021

  


**Anterior na Série**

[Javac - o Compilador](<#/doc/tutorials/jvm/tools/core/javac>)

➜

**Tutorial Atual**

Javap - o Desmontador

➜

**Próximo na Série**

[Javadoc - o Gerador de Documentação](<#/doc/tutorials/jvm/tools/core/javadoc>)

**Anterior na Série:** [Javac - o Compilador](<#/doc/tutorials/jvm/tools/core/javac>)

**Próximo na Série:** [Javadoc - o Gerador de Documentação](<#/doc/tutorials/jvm/tools/core/javadoc>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas Principais do JDK ](<#/doc/tutorials/jvm/tools/core>) > Javap - o Desmontador