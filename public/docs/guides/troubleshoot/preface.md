# Prefácio

## Prefácio

Este documento ajuda você a solucionar problemas com aplicações Java Platform, Standard Edition (Java SE). Este documento fornece uma descrição das ferramentas e opções de linha de comando disponíveis que podem ajudar a analisar problemas. Este documento também oferece orientação sobre a depuração de problemas de bibliotecas principais e de cliente e descreve alguns problemas gerais, como travamentos (crashes), congelamentos (hangs) e vazamentos de memória (memory leaks). Finalmente, este documento fornece instruções para coleta de dados e preparação de relatórios de bugs.

### Público-alvo

O público-alvo para este documento inclui desenvolvedores e mantenedores de aplicações que utilizam o Java Development Kit (JDK), que é a implementação da Oracle do Java SE. A maior parte das informações neste documento pode ser aplicada a versões atuais e anteriores.

Este documento é destinado a leitores com um entendimento de alto nível dos componentes da Java HotSpot VM, bem como algum entendimento de conceitos como garbage collection, threads e bibliotecas nativas. Também se assume que o leitor é razoavelmente proficiente com o sistema operacional onde a aplicação Java é desenvolvida e executada.

### Acessibilidade da Documentação

Para informações sobre o compromisso da Oracle com a acessibilidade, visite o site do Programa de Acessibilidade da Oracle em [http://www.oracle.com/pls/topic/lookup?ctx=acc&id=docacc](<#/>).

Acesso ao Suporte Oracle

O acesso e uso dos serviços de suporte Oracle por parte dos clientes Oracle estarão de acordo com os termos e condições especificados em seu pedido Oracle para os serviços aplicáveis.

### Diversidade e Inclusão

A Oracle está totalmente comprometida com a diversidade e inclusão. A Oracle respeita e valoriza ter uma força de trabalho diversa que aumenta a liderança de pensamento e a inovação. Como parte de nossa iniciativa para construir uma cultura mais inclusiva que impacte positivamente nossos funcionários, clientes e parceiros, estamos trabalhando para remover termos insensíveis de nossos produtos e documentação. Também estamos cientes da necessidade de manter a compatibilidade com as tecnologias existentes de nossos clientes e da necessidade de garantir a continuidade do serviço à medida que as ofertas da Oracle e os padrões da indústria evoluem. Devido a essas restrições técnicas, nosso esforço para remover termos insensíveis é contínuo e levará tempo e cooperação externa.

### Documentos Relacionados

Para mais informações sobre Java SE e tecnologias relevantes, visite [Java SE em um Relance.](<https://www.oracle.com/java/technologies/java-se-glance.html>)

### Convenções

As seguintes convenções de texto são usadas neste documento:

Convenção | Significado
---|---
negrito | O tipo negrito indica elementos da interface gráfica do usuário associados a uma ação, ou termos definidos no texto ou no glossário.
itálico | O tipo itálico indica títulos de livros, ênfase ou variáveis de espaço reservado para as quais você fornece valores específicos.
`monospace` | O tipo monospace indica comandos dentro de um parágrafo, URLs, código em exemplos, texto que aparece na tela ou texto que você insere.