# Introdução

[Java SE](<https://docs.oracle.com/en/java/javase/25/>) > [Java SE Specifications](<#/>) > [Java Virtual Machine Specification](<#/doc/jvms/jvms-01>)

Capítulo 1. Introdução  
---  
[Prev](<#/doc/jvms/jvms-01>)  |   |  [Next](<#/doc/jvms/jvms-02>)  
  
* * *

# Capítulo 1. Introdução 

**Sumário**

[1.1. Um Pouco de História](<#/doc/jvms/jvms-01>)
[1.2. A Java Virtual Machine](<#/doc/jvms/jvms-01>)
[1.3. Organização da Especificação](<#/doc/jvms/jvms-01>)
[1.4. Notação](<#/doc/jvms/jvms-01>)
[1.5. Recursos de Pré-visualização](<#/doc/jvms/jvms-01>)
    

[1.5.1. Restrições ao Uso de Recursos de Pré-visualização](<#/doc/jvms/jvms-01>)
[1.5.2. Recursos Atuais de Pré-visualização da VM](<#/doc/jvms/jvms-01>)
[1.6. Feedback](<#/doc/jvms/jvms-01>)

## 1.1. Um Pouco de História 

A linguagem de programação Java® é uma linguagem de propósito geral, concorrente e orientada a objetos. Sua sintaxe é semelhante à de C e C++, mas omite muitos dos recursos que tornam C e C++ complexos, confusos e inseguros. A plataforma Java foi inicialmente desenvolvida para resolver os problemas de construção de software para dispositivos de consumo em rede. Ela foi projetada para suportar múltiplas arquiteturas de host e permitir a entrega segura de componentes de software. Para atender a esses requisitos, o código compilado tinha que sobreviver ao transporte através de redes, operar em qualquer cliente e garantir ao cliente que era seguro executar. 

A popularização da World Wide Web tornou esses atributos muito mais interessantes. Navegadores web permitiram que milhões de pessoas navegassem na Net e acessassem conteúdo rico em mídia de maneiras simples. Finalmente, havia um meio onde o que você via e ouvia era essencialmente o mesmo, independentemente da máquina que você estava usando e se ela estava conectada a uma rede rápida ou a um modem lento. 

Entusiastas da Web logo descobriram que o conteúdo suportado pelo formato de documento HTML da Web era muito limitado. Extensões HTML, como formulários, apenas destacavam essas limitações, ao mesmo tempo em que deixavam claro que nenhum navegador poderia incluir todos os recursos que os usuários desejavam. A extensibilidade era a resposta. 

O navegador HotJava foi o primeiro a demonstrar as propriedades interessantes da linguagem de programação e plataforma Java, tornando possível incorporar programas dentro de páginas HTML. Os programas são baixados transparentemente para o navegador junto com as páginas HTML em que aparecem. Antes de serem aceitos pelo navegador, os programas são cuidadosamente verificados para garantir que são seguros. Assim como as páginas HTML, os programas compilados são independentes de rede e de host. Os programas se comportam da mesma maneira, independentemente de onde vêm ou do tipo de máquina em que estão sendo carregados e executados. 

Um navegador Web que incorpora a plataforma Java não está mais limitado a um conjunto predeterminado de capacidades. Visitantes de páginas Web que incorporam conteúdo dinâmico podem ter a certeza de que suas máquinas não podem ser danificadas por esse conteúdo. Programadores podem escrever um programa uma vez, e ele será executado em qualquer máquina que forneça um ambiente de execução Java. 

## 1.2. A Java Virtual Machine 

A Java Virtual Machine é a pedra angular da plataforma Java. É o componente da tecnologia responsável pela sua independência de hardware e sistema operacional, pelo pequeno tamanho do seu código compilado e pela sua capacidade de proteger os usuários contra programas maliciosos. 

A Java Virtual Machine é uma máquina de computação abstrata. Como uma máquina de computação real, ela possui um conjunto de instruções e manipula várias áreas de memória em tempo de execução. É razoavelmente comum implementar uma linguagem de programação usando uma máquina virtual; a máquina virtual mais conhecida pode ser a máquina P-Code do UCSD Pascal. 

A primeira implementação protótipo da Java Virtual Machine, feita na Sun Microsystems, Inc., emulou o conjunto de instruções da Java Virtual Machine em software hospedado por um dispositivo portátil que se assemelhava a um Personal Digital Assistant (PDA) contemporâneo. As implementações atuais da Oracle emulam a Java Virtual Machine em dispositivos móveis, desktops e servidores, mas a Java Virtual Machine não assume nenhuma tecnologia de implementação particular, hardware de host ou sistema operacional de host. Ela não é inerentemente interpretada, mas pode muito bem ser implementada compilando seu conjunto de instruções para o de uma CPU de silício. Ela também pode ser implementada em microcódigo ou diretamente em silício. 

A Java Virtual Machine não sabe nada sobre a linguagem de programação Java, apenas sobre um formato binário particular, o formato de arquivo `class`. Um arquivo `class` contém instruções da Java Virtual Machine (ou _bytecodes_) e uma tabela de símbolos, bem como outras informações auxiliares. 

Por questões de segurança, a Java Virtual Machine impõe fortes restrições sintáticas e estruturais ao código em um arquivo `class`. No entanto, qualquer linguagem com funcionalidade que possa ser expressa em termos de um arquivo `class` válido pode ser hospedada pela Java Virtual Machine. Atraídos por uma plataforma geralmente disponível e independente de máquina, implementadores de outras linguagens podem recorrer à Java Virtual Machine como um veículo de entrega para suas linguagens. 

O formato de arquivo `class` é versionado: cada arquivo `class` declara um número de versão, na forma _major_._minor_, que indica a dependência do arquivo em uma versão específica do Java SE e influencia a interpretação do arquivo pela Java Virtual Machine. 

A Java Virtual Machine especificada aqui é compatível com Java SE 25 e suporta a linguagem de programação Java especificada em _The Java Language Specification, Java SE 25 Edition_. Ela suporta arquivos `class` com números de versão major de 45 a 69, inclusive. 

Ferramentas que geram arquivos `class` tipicamente adotarão o número de versão major mais recente para aproveitar os recursos mais recentes; mas um arquivo `class` com um número de versão major mais antigo geralmente pode esperar ser suportado em futuras versões da Java Virtual Machine. 

Para referência, a tabela a seguir mostra os números de versão major de arquivo `class` suportados por cada versão do Java SE, até Java SE 25. A terceira coluna, "Earliest" (Mais Antiga), mostra o número de versão major de arquivo `class` mais antigo suportado pela Java Virtual Machine nessa versão. A quarta coluna, "Latest" (Mais Recente), mostra o número de versão major de arquivo `class` mais recente suportado pela Java Virtual Machine nessa versão. (Para versões muito antigas, a versão do JDK é mostrada em vez da versão do Java SE.) 

**Tabela 1.2-A. Versões do Java SE e versões major de arquivo `class`

Java SE | Lançado | Mais Antiga | Mais Recente  
---|---|---|---  
1.0.2 | May 1996 | 45 | 45  
1.1 | February 1997 | 45 | 45  
1.2 | December 1998 | 45 | 46  
1.3 | May 2000 | 45 | 47  
1.4 | February 2002 | 45 | 48  
5.0 | September 2004 | 45 | 49  
6 | December 2006 | 45 | 50  
7 | July 2011 | 45 | 51  
8 | March 2014 | 45 | 52  
9 | September 2017 | 45 | 53  
10 | March 2018 | 45 | 54  
11 | September 2018 | 45 | 55  
12 | March 2019 | 45 | 56  
13 | September 2019 | 45 | 57  
14 | March 2020 | 45 | 58  
15 | September 2020 | 45 | 59  
16 | March 2021 | 45 | 60  
17 | September 2021 | 45 | 61  
18 | March 2022 | 45 | 62  
19 | September 2022 | 45 | 63  
20 | March 2023 | 45 | 64  
21 | September 2023 | 45 | 65  
22 | March 2024 | 45 | 66  
23 | September 2024 | 45 | 67  
24 | March 2025 | 45 | 68  
25 | September 2025 | 45 | 69  
  
  


## 1.3. Organização da Especificação 

O Capítulo 2 apresenta uma visão geral da arquitetura da Java Virtual Machine. 

O Capítulo 3 introduz a compilação de código escrito na linguagem de programação Java para o conjunto de instruções da Java Virtual Machine. 

O Capítulo 4 especifica o formato de arquivo `class`, o formato binário independente de hardware e sistema operacional usado para representar classes e interfaces compiladas. 

O Capítulo 5 especifica a inicialização da Java Virtual Machine e o carregamento, ligação e inicialização de classes e interfaces. 

O Capítulo 6 especifica o conjunto de instruções da Java Virtual Machine, apresentando as instruções em ordem alfabética de mnemônicos de opcode. 

O Capítulo 7 apresenta uma tabela de mnemônicos de opcode da Java Virtual Machine indexados pelo valor do opcode. 

Na Segunda Edição de _The Java® Virtual Machine Specification_, o Capítulo 2 forneceu uma visão geral da linguagem de programação Java que se destinava a apoiar a especificação da Java Virtual Machine, mas não era em si uma parte da especificação. Em _The Java Virtual Machine Specification, Java SE 25 Edition_, o leitor é remetido a _The Java Language Specification, Java SE 25 Edition_ para informações sobre a linguagem de programação Java. 

Na Segunda Edição de _The Java® Virtual Machine Specification_, o Capítulo 8 detalhou as ações de baixo nível que explicavam a interação dos threads da Java Virtual Machine com uma memória principal compartilhada. Em _The Java Virtual Machine Specification, Java SE 25 Edition_, o leitor é remetido ao Capítulo 17 de _The Java Language Specification, Java SE 25 Edition_ para informações sobre threads e locks. O Capítulo 17 reflete _The Java Memory Model and Thread Specification_ produzido pelo Grupo de Especialistas JSR 133. 

## 1.4. Notação 

Ao longo desta especificação, nos referimos a classes e interfaces provenientes da API da Plataforma Java SE. Sempre que nos referimos a uma classe ou interface (que não as declaradas em um exemplo) usando um único identificador `N`, a referência pretendida é à classe ou interface nomeada `N` no pacote `java.lang`. Usamos o nome totalmente qualificado para classes ou interfaces de pacotes diferentes de `java.lang`. 

Sempre que nos referimos a uma classe ou interface que é declarada no pacote `java` ou em qualquer um de seus subpacotes, a referência pretendida é a essa classe ou interface conforme carregada pelo bootstrap class loader ([§5.3.1](<#/doc/jvms/jvms-05>)). 

Sempre que nos referimos a um subpacote de um pacote nomeado `java`, a referência pretendida é a esse subpacote conforme determinado pelo bootstrap class loader. 

Uma referência cruzada dentro desta especificação é mostrada como (§x.y). Ocasionalmente, nos referimos a conceitos em _The Java Language Specification, Java SE 25 Edition_ por meio de referências cruzadas na forma (JLS §x.y). 

O uso de fontes nesta especificação é o seguinte: 

  * Uma fonte `fixed width` é usada para tipos de dados da Java Virtual Machine, exceções, erros, estruturas de arquivo `class`, código Prolog e fragmentos de código Java. 

  * _Itálico_ é usado para a "linguagem assembly" da Java Virtual Machine, seus opcodes e operandos, bem como itens nas áreas de dados de tempo de execução da Java Virtual Machine. Também é usado para introduzir novos termos e simplesmente para dar ênfase. 




Texto não normativo, projetado para esclarecer o texto normativo desta especificação, é apresentado em texto menor e recuado. 

Este é um texto não normativo. Ele fornece intuição, justificativa, conselhos, exemplos, etc. 

## 1.5. Recursos de Pré-visualização 

Um _recurso de pré-visualização_ é: 

  * um novo recurso da linguagem de programação Java ("recurso de linguagem de pré-visualização"), ou 

  * um novo recurso da Java Virtual Machine ("recurso de VM de pré-visualização"), ou 

  * um novo módulo, pacote, classe, interface, campo, método, construtor ou constante enum no namespace `java.*` ou `javax.*` ("API de pré-visualização") 




que é totalmente especificado, totalmente implementado e, no entanto, impermanente. Ele está disponível em implementações de uma determinada versão da Plataforma Java SE para provocar feedback de desenvolvedores com base no uso no mundo real; isso pode levar a que se torne permanente em uma futura versão da Plataforma Java SE. 

Os recursos de pré-visualização definidos por uma determinada versão da Plataforma Java SE são enumerados na Especificação da Plataforma Java SE para essa versão. Os recursos de pré-visualização são especificados da seguinte forma: 

  * Recursos de linguagem de pré-visualização são especificados em documentos autônomos que indicam alterações ("diffs") em _The Java® Language Specification_ para essa versão. As especificações dos recursos de linguagem de pré-visualização são incorporadas a _The Java® Language Specification_ por referência, e tornam-se parte dela, se e somente se os recursos de pré-visualização estiverem habilitados em tempo de compilação. 

  * Recursos de VM de pré-visualização são especificados em documentos autônomos que indicam alterações ("diffs") em _The Java® Virtual Machine Specification_ para essa versão. As especificações dos recursos de VM de pré-visualização são incorporadas a _The Java® Virtual Machine Specification_ por referência, e tornam-se parte dela, se e somente se os recursos de pré-visualização estiverem habilitados em tempo de execução. 

  * APIs de pré-visualização são especificadas dentro da Especificação da API Java SE para essa versão. 




### 1.5.1. Restrições ao Uso de Recursos de Pré-visualização 

As implementações da Plataforma Java SE desabilitam, tanto em tempo de compilação quanto em tempo de execução, os recursos de pré-visualização definidos por uma determinada versão, a menos que o usuário indique via sistema host, tanto em tempo de compilação quanto em tempo de execução, que os recursos de pré-visualização estão habilitados. As implementações não fornecem uma maneira de habilitar apenas alguns dos recursos de pré-visualização da versão dada. 

Um arquivo `class` _depende dos recursos de pré-visualização do Java SE`N`_ (`N` ≥ 12) se: 

  * o número de versão major do arquivo `class` for o número de versão major mais recente suportado pelo Java SE `N` na [Tabela 1.2-A](<#/doc/jvms/jvms-01>), e 

  * o número de versão minor do arquivo `class` for 65535 




Por exemplo, um arquivo `class` com número de versão 66.65535 depende dos recursos de pré-visualização do Java SE 22, porque 66 é o número de versão major mais recente suportado pelo Java SE 22. 

Compiladores podem precisar emitir arquivos `class` que dependem dos recursos de pré-visualização de uma determinada versão, mesmo que os arquivos `class` não usem nenhum recurso de VM de pré-visualização. Por exemplo, um arquivo fonte Java que usa um recurso de linguagem de pré-visualização da versão deve ser compilado para um arquivo `class` que depende dos recursos de pré-visualização da versão. 

Em tempo de execução, as regras para carregar um arquivo `class` que depende dos recursos de pré-visualização de uma determinada versão da Plataforma Java SE são especificadas em [§4.1](<#/doc/jvms/jvms-04>). Tal arquivo `class` está vinculado a essa versão da Plataforma Java SE e não pode ser carregado em nenhuma outra versão (mesmo que os recursos de pré-visualização estejam habilitados) porque os recursos de pré-visualização dos quais ele depende podem ser diferentes ou ausentes na outra versão. 

### 1.5.2. Recursos Atuais de Pré-visualização da VM 

Java SE 25 não define nenhum recurso de VM de pré-visualização. 

## 1.6. Feedback 

Os leitores são convidados a relatar erros técnicos e ambiguidades em _The Java® Virtual Machine Specification_ para `jls-jvms-spec-comments@openjdk.org`. 

Perguntas sobre a geração e manipulação de arquivos `class` por `javac` (o compilador de referência para a linguagem de programação Java) podem ser enviadas para `compiler-dev@openjdk.org`. 

* * *

[Prev](<#/doc/jvms/jvms-01>)  |   |  [Next](<#/doc/jvms/jvms-02>)  
---|---|---  
The Java® Virtual Machine Specification  | [Início](<#/doc/jvms/jvms-01>) |  Capítulo 2. A Estrutura da Java Virtual Machine  
  
* * *

[ Aviso Legal ](<#/>)