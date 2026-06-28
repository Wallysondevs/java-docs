# `exports` e `opens` Qualificados

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > `exports` e `opens` Qualificados

**Anterior na Série**

[Legibilidade Implícita com `requires transitive`](<#/doc/tutorials/modules/implied-readability>)

➜

**Tutorial Atual**

`exports` e `opens` Qualificados

➜

**Próximo na Série**

[Desacoplando Módulos com Services](<#/doc/tutorials/modules/services>)

**Anterior na Série:** [Legibilidade Implícita com `requires transitive`](<#/doc/tutorials/modules/implied-readability>)

**Próximo na Série:** [Desacoplando Módulos com Services](<#/doc/tutorials/modules/services>)

# `exports` e `opens` Qualificados

O sistema de módulos permite que módulos exportem e abram pacotes para torná-los acessíveis a códigos externos, caso em que todo módulo que lê o módulo exportador/abridor pode acessar tipos nesses pacotes. Isso significa que temos que escolher entre encapsular fortemente um pacote ou torná-lo acessível a todos o tempo todo. Para lidar com casos de uso que não se encaixam facilmente nessa dicotomia, o sistema de módulos oferece variantes qualificadas das diretivas `exports` e `opens` que concedem acesso apenas a módulos específicos.

**Nota**: Você precisa conhecer [os fundamentos do sistema de módulos](<#/doc/tutorials/modules/intro>) e [como abrir pacotes](<#/doc/tutorials/modules/opening-for-reflection>) para aproveitar ao máximo este artigo.

## Exportação/Abertura Qualificada de Pacotes

A diretiva `exports` pode ser _qualificada_ seguindo-a com `to $MODULES`, onde `$MODULES` é uma lista de nomes de módulos de destino separados por vírgulas. Para os módulos nomeados em uma diretiva `exports to`, o pacote será exatamente tão acessível quanto com uma diretiva `exports` regular. Para todos os outros módulos, o pacote será tão fortemente encapsulado como se não houvesse `exports` algum. O mesmo ocorre com a diretiva `opens`, que também pode ser qualificada com `to $MODULES` com os mesmos efeitos: Para os módulos de destino, o pacote está aberto; para todos os outros, está fortemente encapsulado.

Existem muitos exemplos de exports qualificados dentro do próprio JDK, mas vamos nos concentrar em _java.xml_, que define a _Java API for XML Processing_ (JAXP). Seis de seus pacotes internos, prefixados com `com.sun.org.apache.xml.internal` e `com.sun.org.apache.xpath.internal`, são usados por _java.xml.crypto_ (a API para criptografia XML) e, portanto, são exportados para ele (e somente para ele):

Duas pequenas notas sobre a compilação:

  * Se um módulo que declara um export/open qualificado for compilado e o módulo de destino não puder ser encontrado, o compilador emitirá um aviso. Não é um erro porque o módulo de destino é mencionado, mas não é obrigatório.
  * Não é permitido usar um pacote em uma diretiva `exports` e em uma `exports to` _ou_ em uma `opens` e em uma `opens to`. Se qualquer um dos pares de diretivas estivesse presente, a variante qualificada seria efetivamente inútil e, portanto, essa situação é interpretada como um erro de implementação e resulta em um erro de compilação.

E há dois detalhes a serem destacados:

  * Os módulos de destino podem depender do módulo exportador/abridor (de fato, _java.xml.crypto_ depende de _java.xml_), criando um ciclo. Pensando bem, a menos que a [legibilidade implícita](<#/doc/tutorials/modules/implied-readability>) seja usada, este _deve_ ser o caso - de que outra forma o módulo de destino leria o módulo exportador/abridor?
  * Sempre que um novo módulo precisar de acesso aos pacotes exportados qualificadamente, o módulo proprietário precisa ser alterado para conceder acesso a este novo módulo. Embora permitir que o módulo exportador controle quem pode acessar os pacotes seja o objetivo principal dos exports qualificados, isso ainda pode ser complicado.

## Quando Usar Exports Qualificados

Conforme explicado, o caso de uso para exports qualificados é manter o controle sobre quais módulos podem acessar os pacotes relevantes. Com que frequência isso se aplica? De modo geral, sempre que um conjunto de módulos deseja compartilhar funcionalidades entre si sem expô-las.

Isso é simétrico ao problema de ocultar classes utilitárias antes da introdução do sistema de módulos. Assim que uma classe utilitária precisa estar disponível entre pacotes, ela deve ser pública, mas antes do Java 9 isso significava que todo o outro código poderia acessá-la. O encapsulamento forte resolveu isso permitindo-nos tornar classes públicas inacessíveis fora de um módulo.

Agora estamos em uma situação semelhante, onde queremos ocultar um pacote (anteriormente, uma classe), mas assim que ele precisa estar disponível entre módulos (pacotes), ele precisa ser exportado (tornado público) e, portanto, pode ser acessado por todos os outros módulos (todas as outras classes). É aqui que os exports qualificados entram em cena. Eles permitem que os módulos compartilhem um pacote entre si sem torná-lo geralmente disponível. Isso o torna muito útil para bibliotecas e frameworks que consistem em vários módulos e desejam compartilhar código sem que os clientes possam usá-lo. Também será útil para grandes aplicações que desejam restringir dependências em APIs específicas.

Exports qualificados podem ser vistos como a elevação do encapsulamento forte de tipos de guarda em artefatos para pacotes de guarda em conjuntos de módulos.

## Quando Usar Opens Qualificados

Exports qualificados têm módulos de destino que estão sob seu controle, o que torna essas diretivas uma ferramenta importante para evitar que colegas e usuários introduzam dependências acidentais em APIs internas. Os módulos de destino para opens qualificados, por outro lado, são tipicamente frameworks e, quer você abra um pacote para reflexão para cada módulo ou apenas para o Hibernate, de qualquer forma o Spring não começará a depender dele. Como tal, o caso de uso para opens qualificados é muito menor do que para exports qualificados.

Uma desvantagem dos opens qualificados é que, até que os frameworks comecem a adotar uma abordagem baseada em `Lookup`/`VarHandle`, que permite o "encaminhamento" do acesso reflexivo, os pacotes devem sempre ser abertos para o módulo exato que faz a reflexão real. Assim, em casos onde especificações e implementações são separadas (por exemplo, JPA e Hibernate), você pode se encontrar tendo que abrir pacotes de entidades para a implementação em vez da API (por exemplo, um módulo Hibernate em vez de um módulo JPA). Se o seu projeto tenta seguir o padrão e evitar todas as menções da implementação no código, isso é lamentável.

Em conjunto, uma boa abordagem padrão para abrir pacotes para reflexão é não qualificar o acesso, a menos que seu projeto use muita reflexão sobre seu próprio código, caso em que os benefícios são semelhantes aos dos exports qualificados. Abrir apenas para frameworks parece não valer o esforço e provavelmente deve ser evitado completamente em casos onde exige o direcionamento de módulos de implementação específicos.

### Neste tutorial

*   Exportação/Abertura Qualificada de Pacotes
*   Quando Usar Exports Qualificados
*   Quando Usar Opens Qualificados

Última atualização: 14 de setembro de 2021

**Anterior na Série**

[Legibilidade Implícita com `requires transitive`](<#/doc/tutorials/modules/implied-readability>)

➜

**Tutorial Atual**

`exports` e `opens` Qualificados

➜

**Próximo na Série**

[Desacoplando Módulos com Services](<#/doc/tutorials/modules/services>)

**Anterior na Série:** [Legibilidade Implícita com `requires transitive`](<#/doc/tutorials/modules/implied-readability>)

**Próximo na Série:** [Desacoplando Módulos com Services](<#/doc/tutorials/modules/services>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Módulos ](<#/doc/tutorials/modules>) > `exports` e `opens` Qualificados