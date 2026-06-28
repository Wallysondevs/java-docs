# Prefácio

## Prefácio

Este documento mostra como usar a API Flight Recorder para um monitoramento de aplicação mais abrangente; você pode analisar com maior detalhe eventos gerados por aplicações, pela JVM e pelo sistema operacional. Além disso, você pode criar seus próprios eventos, registrar seus próprios dados e visualizar e analisar as gravações. Adicionalmente, este documento mostra como usar a API de streaming de eventos do Flight Recorder, que permite consumir dados do Flight Recorder continuamente.

### Público-alvo

Este documento é destinado a usuários experientes do Flight Recorder que desejam monitorar suas aplicações com maior detalhe.

### Acessibilidade da Documentação

Para informações sobre o compromisso da Oracle com a acessibilidade, visite o site do Programa de Acessibilidade da Oracle em [http://www.oracle.com/pls/topic/lookup?ctx=acc&id=docacc](<#/>).

Acesso ao Suporte Oracle

O acesso e uso dos serviços de suporte Oracle por parte dos clientes Oracle serão de acordo com os termos e condições especificados em seu pedido Oracle para os serviços aplicáveis.

### Diversidade e Inclusão

A Oracle está totalmente comprometida com a diversidade e inclusão. A Oracle respeita e valoriza ter uma força de trabalho diversa que aumenta a liderança de pensamento e a inovação. Como parte de nossa iniciativa para construir uma cultura mais inclusiva que impacte positivamente nossos funcionários, clientes e parceiros, estamos trabalhando para remover termos insensíveis de nossos produtos e documentação. Também estamos cientes da necessidade de manter a compatibilidade com as tecnologias existentes de nossos clientes e da necessidade de garantir a continuidade do serviço à medida que as ofertas da Oracle e os padrões da indústria evoluem. Devido a essas restrições técnicas, nosso esforço para remover termos insensíveis é contínuo e levará tempo e cooperação externa.

### Documentos Relacionados

  * [O Comando jfr](<#/>) nas Especificações da Ferramenta do Java Development Kit
  * O módulo [jdk.jfr](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.jfr/module-summary.html>)

### Convenções

As seguintes convenções de texto são usadas neste documento:

Convenção | Significado
---|---
negrito | O tipo negrito indica elementos da interface gráfica do usuário associados a uma ação, ou termos definidos no texto ou no glossário.
itálico | O tipo itálico indica títulos de livros, ênfase ou variáveis de espaço reservado para as quais você fornece valores específicos.
`monospace` | O tipo monospace indica comandos dentro de um parágrafo, URLs, código em exemplos, texto que aparece na tela ou texto que você insere.