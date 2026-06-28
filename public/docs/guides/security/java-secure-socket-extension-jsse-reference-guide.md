# Guia de Referência da Java Secure Socket Extension (JSSE)

## 8 Guia de Referência da Java Secure Socket Extension (JSSE)

O conteúdo do script nesta página é apenas para fins de navegação e não altera o conteúdo de forma alguma.

A Java Secure Socket Extension (JSSE) permite comunicações seguras pela Internet. Ela fornece um framework e uma implementação para uma versão Java dos protocolos TLS e DTLS e inclui funcionalidade para criptografia de dados, autenticação de servidor, integridade de mensagens e autenticação opcional de cliente.

### Introdução ao JSSE

Dados que trafegam por uma rede podem ser facilmente acessados por alguém que não seja o destinatário pretendido. Quando os dados incluem informações privadas, como senhas e números de cartão de crédito, medidas devem ser tomadas para tornar os dados ininteligíveis para partes não autorizadas. Também é importante garantir que os dados não foram modificados, intencionalmente ou não intencionalmente, durante o transporte. O protocolo Transport Layer Security (TLS) foi projetado para ajudar a proteger a privacidade e a integridade dos dados enquanto eles estão sendo transferidos por uma rede.

A Java Secure Socket Extension (JSSE) permite comunicações seguras pela Internet. Ela fornece um framework e uma implementação para uma versão Java do protocolo TLS e inclui funcionalidade para criptografia de dados, autenticação de servidor, integridade de mensagens e autenticação opcional de cliente. Usando o JSSE, os desenvolvedores podem garantir a passagem segura de dados entre um cliente e um servidor executando qualquer protocolo de aplicação (como HTTP, Telnet ou FTP) sobre TCP/IP.

Ao abstrair os complexos algoritmos de segurança subjacentes e os mecanismos de handshaking, o JSSE minimiza o risco de criar vulnerabilidades de segurança sutis, mas perigosas. Além disso, ele simplifica o desenvolvimento de aplicações, servindo como um bloco de construção que os desenvolvedores podem integrar diretamente em suas aplicações.

O JSSE fornece tanto um framework de API (Application Programming Interface) quanto uma implementação dessa API. A API JSSE complementa os serviços de rede e criptográficos centrais definidos pelos pacotes `java.security` e `java.net`, fornecendo classes de socket de rede estendidas, trust managers, key managers, contextos SSL e um framework de fábrica de sockets para encapsular o comportamento de criação de sockets. Como a classe `SSLSocket` é baseada em um modelo de I/O bloqueante, o Java Development Kit (JDK) inclui uma classe `SSLEngine` não bloqueante para permitir que as implementações escolham seus próprios métodos de I/O.

A API JSSE suporta os seguintes protocolos de segurança:

  * DTLS: versões 1.0 e 1.2

  * TLS: versão 1.0, 1.1, 1.2 e 1.3

  * SSL (Secure Socket Layer): versão 3.0

Esses protocolos de segurança encapsulam um socket de stream bidirecional normal, e a API JSSE adiciona suporte transparente para autenticação, criptografia e proteção de integridade.

O JSSE é um componente de segurança da plataforma Java SE e é baseado nos mesmos princípios de design encontrados em outras partes do framework [Java Cryptography Architecture (JCA) Reference Guide](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>). Este framework para componentes de segurança relacionados à criptografia permite que eles tenham independência de implementação e, sempre que possível, independência de algoritmo. O JSSE usa os [Cryptographic Service Providers](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) definidos pelo framework JCA.

Outros componentes de segurança na plataforma Java SE incluem o [Java Authentication and Authorization Service (JAAS) Reference Guide](<https://docs.oracle.com/javase/8/docs/technotes/guides/security/jaas/JAASRefGuide.html>) e as ferramentas de segurança Java (veja [Security Tools Summary](<#/doc/guides/security/java-security-overview1>)). O JSSE abrange muitos dos mesmos conceitos e algoritmos que os da JCA, mas os aplica automaticamente sob uma API de socket de stream simples.

A API JSSE foi projetada para permitir que outros protocolos SSL/TLS/DTLS e implementações de Public Key Infrastructure (PKI) sejam plugados de forma transparente. Os desenvolvedores também podem fornecer lógica alternativa para determinar se hosts remotos devem ser confiáveis ou qual material de chave de autenticação deve ser enviado para um host remoto.

#### Recursos e Benefícios do JSSE

O JSSE inclui os seguintes benefícios e recursos importantes:

  * Incluído como um componente padrão do JDK
  * Arquitetura extensível, baseada em provedor
  * Implementado em 100% Java puro
  * Fornece suporte de API para TLS/DTLS
  * Fornece implementações de SSL 3.0, TLS (versões 1.0, 1.1, 1.2 e 1.3) e DTLS (versões 1.0 e 1.2)
  * Inclui classes que podem ser instanciadas para criar canais seguros (`SSLSocket`, `SSLServerSocket` e `SSLEngine`)
  * Fornece suporte para negociação de cipher suite, que faz parte do handshaking TLS/DTLS usado para iniciar ou verificar comunicações seguras
  * Fornece suporte para autenticação de cliente e servidor, que faz parte do handshaking TLS/DTLS normal
  * Fornece suporte para HTTP encapsulado no protocolo TLS, que permite acesso a dados como páginas web usando HTTPS
  * Fornece APIs de gerenciamento de sessão de servidor para gerenciar sessões SSL residentes em memória
  * Fornece suporte para a extensão de solicitação de status de certificado (OCSP stapling), que economiza viagens de ida e volta e recursos de validação de certificado do cliente
  * Fornece suporte para a extensão Server Name Indication (SNI), que estende os protocolos TLS/DTLS para indicar a qual nome de servidor o cliente está tentando se conectar durante o handshaking
  * Fornece suporte para identificação de endpoint durante o handshaking, o que previne ataques man-in-the-middle
  * Fornece suporte para restrições de algoritmo criptográfico, o que fornece controle granular sobre os algoritmos negociados pelo JSSE

#### API Padrão do JSSE

A API padrão do JSSE, disponível nos pacotes `javax.net` e `javax.net.ssl`, fornece:

  * Sockets seguros adaptados para aplicações cliente e servidor.
  * Um motor não bloqueante para produzir e consumir streams de dados TLS/DTLS (`SSLEngine`).
  * Fábricas para criar sockets, sockets de servidor, sockets SSL e sockets de servidor SSL. Usando fábricas de sockets, você pode encapsular o comportamento de criação e configuração de sockets.
  * Uma classe que representa um contexto de socket seguro que atua como uma fábrica para fábricas de sockets seguros e engines.
  * Interfaces de key manager e trust manager (incluindo key managers e trust managers específicos para X.509) e fábricas que podem ser usadas para criá-los.
  * Uma classe para conexões URL HTTP seguras (HTTPS).

#### Provedor SunJSSE

A implementação da Oracle do Java SE inclui um provedor JSSE chamado SunJSSE, que vem pré-instalado e pré-registrado com a JCA. Este provedor fornece os seguintes serviços criptográficos:

  * Uma implementação dos protocolos de segurança SSL 3.0, TLS (versões 1.0, 1.1, 1.2 e 1.3) e DTLS (versões 1.0 e 1.2).
  * Uma implementação das cipher suites TLS e DTLS mais comuns. Esta implementação abrange uma combinação de autenticação, acordo de chave, criptografia e proteção de integridade.
  * Uma implementação de um key manager baseado em X.509 que escolhe chaves de autenticação apropriadas de um keystore JCA padrão.
  * Uma implementação de um trust manager baseado em X.509 que implementa regras para validação de cadeia de certificados.

Veja [O Provedor SunJSSE](<#/doc/guides/security/oracle-providers>).

#### Documentação Relacionada ao JSSE

A lista a seguir contém links para documentação online e nomes de livros sobre assuntos relacionados:

Documentação da API JSSE

  * pacote [javax.net](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/package-summary.html>)

  * pacote [javax.net.ssl](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/package-summary.html>)

Segurança Java SE

  * A página inicial [Java SE Security](<http://www.oracle.com/technetwork/java/javase/tech/index-jsp-136007.html>)

  * O caminho [Security Features in Java SE](<https://docs.oracle.com/javase/tutorial/security/>) do Tutorial Java

  * [Guia do Programador Java PKI](<#/doc/guides/security/java-pki-programmers-guide>)

  * [Inside Java 2 Platform Security, Second Edition: Architecture, API Design and Implementation](<http://www.oracle.com/technetwork/java/javaee/gong-135902.html>)

Transport Layer Security (TLS)

  * [O Protocolo TLS Versão 1.0](<http://www.ietf.org/rfc/rfc2246.txt>)

  * [O Protocolo TLS Versão 1.1](<https://www.ietf.org/rfc/rfc4346.txt>)

  * [O Protocolo TLS Versão 1.2](<https://www.ietf.org/rfc/rfc5246.txt>)

  * [O Protocolo (TLS) Versão 1.3](<https://tools.ietf.org/html/rfc8446>)

  * [Extensões do Transport Layer Security (TLS)](<https://tools.ietf.org/html/rfc6066>)

  * [HTTP Sobre TLS](<http://www.ietf.org/rfc/rfc2818.txt>)

Datagram Transport Layer Security (DTLS)

  * [O Protocolo DTLS Versão 1.0](<https://tools.ietf.org/html/rfc4347.txt>)

  * [O Protocolo DTLS Versão 1.2](<https://tools.ietf.org/html/rfc6347.txt>)

Políticas de Criptografia dos EUA

  * [Departamento de Comércio dos EUA](<https://www.commerce.gov>)

  * [Conselho de CEOs de Tecnologia](<http://www.techceocouncil.org>)

  * Políticas de exportação atuais: [Regulamentos de Criptografia e Administração de Exportação (EAR)](<https://www.bis.doc.gov/index.php/policy-guidance/encryption>)

  * [Publicações de Segurança de Computadores do NIST](<https://csrc.nist.gov/publications>)

### Classes e Interfaces do JSSE

Para se comunicar de forma segura, ambos os lados da conexão devem estar habilitados para SSL. Na API JSSE, as classes de endpoint da conexão são `SSLSocket` e `SSLEngine`. Na [Figura 8-1](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>), as principais classes usadas para criar `SSLSocket` e `SSLEngine` são dispostas em uma ordem lógica.

Figura 8-1 Classes JSSE Usadas para Criar SSLSocket e SSLEngine

[Descrição de "Figura 8-1 Classes JSSE Usadas para Criar SSLSocket e SSLEngine"](<#/>)

Um `SSLSocket` é criado por uma `SSLSocketFactory` ou por um `SSLServerSocket` aceitando uma conexão de entrada. Por sua vez, um `SSLServerSocket` é criado por uma `SSLServerSocketFactory`. Ambos os objetos `SSLSocketFactory` e `SSLServerSocketFactory` são criados por um `SSLContext`. Um `SSLEngine` é criado diretamente por um `SSLContext` e depende da aplicação para lidar com todo o I/O.

Nota:

Ao usar as classes `SSLSocket` ou `SSLEngine` "raw" (diretamente/sem abstração), você deve sempre verificar as credenciais do par antes de enviar qualquer dado. Desde o JDK 7, procedimentos de identificação/verificação de endpoint podem ser tratados durante o handshaking SSL/TLS. Veja o método [SSLParameters.setEndpointIdentificationAlgorithm](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLParameters.html#getEndpointIdentificationAlgorithm\(\)>).

Por exemplo, o nome do host deve corresponder ao nome do host nas credenciais do par. Uma aplicação poderia ser explorada com falsificação de nome de host se o nome do host não for verificado.

#### Classes e Interfaces Core do JSSE

As classes core do JSSE fazem parte dos pacotes [javax.net](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/package-summary.html>) e [javax.net.ssl](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/package-summary.html>).

#### Classes SocketFactory e ServerSocketFactory

A classe abstrata `javax.net.SocketFactory` é usada para criar sockets. Subclasses desta classe são fábricas que criam subclasses específicas de sockets e, assim, fornecem um framework geral para a adição de funcionalidade pública em nível de socket. Por exemplo, veja [Classes SSLSocketFactory e SSLServerSocketFactory](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

A classe abstrata `javax.net.ServerSocketFactory` é análoga à classe `SocketFactory`, mas é usada especificamente para criar sockets de servidor.

Fábricas de sockets são uma maneira simples de capturar uma variedade de políticas relacionadas aos sockets que estão sendo construídos, produzindo tais sockets de uma forma que não requer configuração especial do código que solicita os sockets:

  * Devido ao polimorfismo de fábricas e sockets, diferentes tipos de sockets podem ser usados pelo mesmo código de aplicação apenas passando diferentes tipos de fábricas.
  * As fábricas podem ser personalizadas com parâmetros usados na construção de sockets. Por exemplo, as fábricas poderiam ser personalizadas para retornar sockets com diferentes timeouts de rede ou parâmetros de segurança já configurados.
  * Os sockets retornados à aplicação podem ser subclasses de `java.net.Socket` (ou `javax.net.ssl.SSLSocket`), para que possam expor diretamente novas APIs para recursos como compressão, segurança, marcação de registro, coleta de estatísticas ou tunelamento de firewall.

#### Classes SSLSocketFactory e SSLServerSocketFactory

A classe `javax.net.ssl.SSLSocketFactory` atua como uma fábrica para criar sockets seguros. Esta classe é uma subclasse abstrata de [`javax.net.SocketFactory`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/SocketFactory.html>).

Fábricas de sockets seguros encapsulam os detalhes da criação e configuração inicial de sockets seguros. Isso inclui chaves de autenticação, validação de certificado do par, cipher suites habilitadas e similares.

A classe `javax.net.ssl.SSLServerSocketFactory` é análoga à classe `SSLSocketFactory`, mas é usada especificamente para criar sockets de servidor.

##### Obtendo uma SSLSocketFactory

As seguintes maneiras podem ser usadas para obter uma `SSLSocketFactory`:

  * Obtenha a fábrica padrão chamando o método estático `SSLSocketFactory.getDefault()`.
  * Receba uma fábrica como um parâmetro de API. Ou seja, o código que deve criar sockets, mas não se importa com os detalhes de como os sockets são configurados, pode incluir um método com um parâmetro `SSLSocketFactory` que pode ser chamado por clientes para especificar qual `SSLSocketFactory` usar ao criar sockets (por exemplo, `javax.net.ssl.HttpsURLConnection`).
  * Construa uma nova fábrica com comportamento especificamente configurado.

A fábrica padrão é tipicamente configurada para suportar apenas autenticação de servidor, para que os sockets criados pela fábrica padrão não vazem mais informações sobre o cliente do que um socket TCP normal faria.

Muitas classes que criam e usam sockets não precisam saber os detalhes do comportamento de criação de sockets. Criar sockets através de uma fábrica de sockets passada como parâmetro é uma boa maneira de isolar os detalhes da configuração do socket e aumenta a reutilização de classes que criam e usam sockets.

Você pode criar novas instâncias de fábrica de sockets implementando sua própria subclasse de fábrica de sockets ou usando outra classe que atua como uma fábrica para fábricas de sockets. Um exemplo de tal classe é `SSLContext`, que é fornecida com a implementação JSSE como uma classe de configuração baseada em provedor.

#### Classes SSLSocket e SSLServerSocket

A classe `javax.net.ssl.SSLSocket` é uma subclasse da classe `java.net.Socket` padrão do Java. Ela suporta todos os métodos de socket padrão e adiciona métodos específicos para sockets seguros. Instâncias desta classe encapsulam o SSLContext sob o qual foram criadas. Veja [Classe SSLContext](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>). Existem APIs para controlar a criação de sessões de socket seguras para uma instância de socket, mas o gerenciamento de confiança e chaves não é exposto diretamente.

A classe `javax.net.ssl.SSLServerSocket` é análoga à classe `SSLSocket`, mas é usada especificamente para criar sockets de servidor.

Para prevenir a falsificação de pares, você deve sempre verificar as credenciais apresentadas a um `SSLSocket`. Veja [Escolha de Cipher Suite e Verificação de Entidade Remota](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

Nota:

Devido à complexidade dos protocolos SSL e TLS, é difícil prever se os bytes de entrada em uma conexão são dados de handshaking ou de aplicação, e como esses dados podem afetar o estado atual da conexão (até mesmo fazendo com que o processo bloqueie). Na implementação JSSE da Oracle, o método `available()` no objeto obtido por `SSLSocket.getInputStream()` retorna uma contagem do número de bytes de dados de aplicação descriptografados com sucesso da conexão SSL, mas ainda não lidos pela aplicação.

##### Obtendo um SSLSocket

Instâncias de SSLSocket podem ser obtidas de uma das seguintes maneiras:

  * Um SSLSocket pode ser criado por uma instância de [SSLSocketFactory](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLSocketFactory.html>) através de um dos vários métodos `createSocket` dessa classe.
  * Um SSLSocket pode ser criado através do método `accept` da classe `SSLServerSocket`.

##### Escolha de Cipher Suite e Verificação de Entidade Remota

Os protocolos SSL/TLS definem uma série específica de etapas para garantir uma conexão protegida. No entanto, a escolha da cipher suite afeta diretamente o tipo de segurança que a conexão desfruta. Por exemplo, se uma cipher suite anônima for selecionada, a aplicação não tem como verificar a identidade do par remoto. Se uma suite sem criptografia for selecionada, a privacidade dos dados não pode ser protegida. Além disso, os protocolos SSL/TLS não especificam que as credenciais recebidas devem corresponder àquelas que o par poderia ser esperado a enviar. Se a conexão fosse de alguma forma redirecionada para um par mal-intencionado, mas as credenciais do mal-intencionado fossem aceitáveis com base no material de confiança atual, a conexão seria considerada válida.

Ao usar as classes `SSLSocket` e `SSLEngine` "raw" (diretamente/sem abstração), você deve sempre verificar as credenciais do par antes de enviar qualquer dado. As classes `SSLSocket` e `SSLEngine` não verificam automaticamente se o nome do host corresponde ao nome do host nas credenciais do par. Uma aplicação poderia ser explorada com falsificação de nome de host se o nome do host não for verificado. Desde o JDK 7, procedimentos de identificação/verificação de endpoint podem ser tratados durante o handshaking SSL/TLS. Veja o método [SSLParameters.getEndpointIdentificationAlgorithm](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLParameters.html#getEndpointIdentificationAlgorithm\(\)>).

Protocolos como HTTPS ([HTTP Over TLS](<http://www.ietf.org/rfc/rfc2818.txt>)) exigem verificação de nome de host. Desde o JDK 7, a identificação de endpoint HTTPS é imposta durante o handshaking para `HttpsURLConnection` por padrão. Veja o método [SSLParameters.getEndpointIdentificationAlgorithm](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLParameters.html#getEndpointIdentificationAlgorithm\(\)>). Alternativamente, as aplicações podem usar a interface `HostnameVerifier` para substituir as regras padrão de nome de host HTTPS. Veja [Interface HostnameVerifier](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) e [Classe HttpsURLConnection](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

#### Classe SSLEngine

Como mencionado anteriormente, TLS/DTLS são protocolos padrão para comunicações de rede seguras e estão sendo usados em uma ampla variedade de aplicações em uma ampla gama de plataformas e dispositivos de computação. Juntamente com essa popularidade, surgem demandas para usar TLS/DTLS com diferentes modelos de I/O e threading para satisfazer os requisitos de desempenho, escalabilidade, footprint e outros das aplicações. Há demandas para usá-lo com canais de I/O bloqueantes e não bloqueantes, I/O assíncrono, streams de entrada e saída arbitrários e byte buffers. Há demandas para usá-lo em ambientes altamente escaláveis e críticos em desempenho, exigindo o gerenciamento de milhares de conexões de rede.

Abstrair o mecanismo de transporte de I/O usando a classe `SSLEngine` no Java SE permite que as aplicações usem os protocolos TLS/DTLS de uma maneira independente de transporte e, assim, libera os desenvolvedores de aplicações para escolher modelos de transporte e computação que melhor atendam às suas necessidades. Essa abstração não apenas permite que as aplicações usem canais de I/O não bloqueantes e outros modelos de I/O, mas também acomoda diferentes modelos de threading. Isso efetivamente deixa as decisões de I/O e threading a cargo do desenvolvedor da aplicação. Por causa dessa flexibilidade, o desenvolvedor da aplicação deve gerenciar I/O e threading (tópicos complexos por si só), bem como ter algum entendimento dos protocolos TLS/DTLS. Como a classe `SSLEngine` requer um entendimento de SSL/TLS, I/O e modelos de threading, ela é considerada uma API avançada: iniciantes devem usar `SSLSocket`.

Usuários de outras APIs da linguagem de programação Java, como o Java Generic Security Services (Java GSS-API) e o Java Simple Authentication Security Layer (Java SASL), notarão semelhanças no fato de que a aplicação também é responsável pelo transporte de dados.

A classe core é `javax.net.ssl.SSLEngine`. Ela encapsula uma máquina de estados TLS/DTLS e opera em byte buffers de entrada e saída que são preenchidos e drenados, respectivamente, pelo usuário da classe `SSLEngine`. A [Figura 8-2](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) ilustra o fluxo de dados da aplicação, através do `SSLEngine`, para o mecanismo de transporte e vice-versa.

Figura 8-2 Fluxo de Dados Através do SSLEngine

Chamadas para `SSLEngine` produzem e consomem pacotes TLS/DTLS, que devem então ser trocados com o par. A nomenclatura para dados do `SSLEngine` é sempre da perspectiva do lado local: dados destinados ao par são chamados de dados de saída, e os dados do par para o lado local são chamados de dados de entrada. Antes que os dados da aplicação possam ser produzidos/consumidos dos buffers da aplicação, um procedimento de handshaking que negocia parâmetros de segurança deve ser concluído. Os dados de handshaking que são produzidos/consumidos são internos ao SSLEngine e devem ser trocados com o par antes que os dados da aplicação sejam produzidos/consumidos. A aplicação é responsável por todo o transporte de dados.

A aplicação, mostrada à esquerda, fornece dados de aplicação (texto simples) em um buffer de aplicação e os passa para o SSLEngine. Após o handshaking ter sido concluído e os parâmetros criptográficos terem sido negociados, o objeto `SSLEngine` consome os dados contidos no buffer de dados de aplicação de saída para produzir dados codificados TLS/DTLS e os coloca no buffer de rede fornecido pela aplicação. A aplicação é agora responsável por enviar o conteúdo do buffer de rede de saída para o par usando o mecanismo de transporte. Ao receber dados codificados TLS/DTLS de seu par (via transporte), a aplicação coloca os dados de entrada em um buffer de rede e os passa para o `SSLEngine`. O objeto `SSLEngine` processa o conteúdo do buffer de rede para produzir dados de aplicação (ou dados de handshaking, que são consumidos internamente).

Uma instância da classe `SSLEngine` pode estar em um dos seguintes estados:

Criação
    O `SSLEngine` foi criado e inicializado, mas ainda não foi usado. Durante esta fase, uma aplicação pode definir quaisquer configurações específicas do `SSLEngine` (cipher suites habilitadas, se o `SSLEngine` deve fazer handshaking em modo cliente ou servidor, e assim por diante). Uma vez que o handshaking tenha começado, no entanto, quaisquer novas configurações (exceto o modo cliente/servidor) serão usadas para o próximo handshaking.
Handshaking inicial
    O handshaking inicial é um procedimento pelo qual os dois pares trocam parâmetros de comunicação até que uma `SSLSession` seja estabelecida. Dados de aplicação não podem ser enviados durante esta fase.
Dados de aplicação
    Depois que os parâmetros de comunicação foram estabelecidos e o handshaking está completo, dados de aplicação podem fluir através do `SSLEngine`. Mensagens de aplicação de saída são criptografadas e protegidas por integridade, e mensagens de entrada revertem o processo.
Re-handshaking
    Qualquer lado pode solicitar uma renegociação da sessão a qualquer momento durante a fase de Dados de Aplicação. Novos dados de handshaking podem ser intermisturados entre os dados da aplicação. Antes de iniciar a fase de re-handshaking, a aplicação pode redefinir os parâmetros de comunicação TLS/DTLS, como a lista de cipher suites habilitadas e se deve usar autenticação de cliente, mas não pode mudar entre os modos cliente/servidor. Como antes, depois que o handshaking tiver começado, quaisquer novas configurações do `SSLEngine` não serão usadas até o próximo handshaking.
Fechamento
    Quando a conexão não for mais necessária, a aplicação deve fechar o `SSLEngine` e deve enviar/receber quaisquer mensagens restantes para o par antes de fechar o mecanismo de transporte subjacente. Uma vez que um engine é fechado, ele não é reutilizável: um novo `SSLEngine` deve ser criado.

##### Métodos do SSLEngine

Existem três tipos de métodos do SSLEngine: aqueles que inicializam o SSLEngine e iniciam o handshaking, aqueles que processam pacotes de dados para escrita ou leitura da rede, e aqueles que fecham corretamente o SSLEngine e a conexão.

Os seguintes passos descrevem o processo de handshaking em relação aos métodos do SSLEngine:

  1. Depois de ter criado o SSLEngine, chame os vários métodos `set*` para configurar todos os aspectos da conexão que está prestes a ocorrer (por exemplo, `setEnabledProtocols()`, `setEnabledCipherSuites()`, `setUseClientMode()` e `setWantClientAuth()`). Você também pode configurar a conexão com a classe `SSLParameters`, que permite definir múltiplas configurações em uma única chamada de método.
  2. Obtenha a `SSLSession` atualmente vazia para o SSLEngine, então determine os tamanhos máximos de buffer para os bytes de aplicação e de rede que poderiam ser gerados com os métodos `getApplicationBufferSize()` e `getPacketBufferSize()`. Aloque instâncias de `ByteBuffer` para buffers de aplicação e de rede de acordo.
  3. Uma vez que você tenha configurado a conexão e os buffers, chame o método `beginHandshake()`, que move o SSLEngine para o estado de handshaking inicial.
  4. Crie o mecanismo de transporte que a conexão usará com, por exemplo, as classes `SocketChannel` ou `Socket`.
  5. Chame os métodos `wrap()` e `unwrap()` para realizar o handshaking inicial. Você precisará chamar esses métodos várias vezes antes que os dados da aplicação possam ser consumidos, produzidos e devidamente protegidos por chamadas `wrap()`/`unwrap()` posteriores.

Os bytes de handshaking devem ser trocados com o par usando o mecanismo de transporte. Para mais informações sobre o mecanismo de handshaking TLS, veja um dos RFCs TLS (como [RFC 5246: The Transport Layer Security (TLS) Protocol: Version 1.2](<https://tools.ietf.org/html/rfc5246>)).

Por exemplo, se o seu SSLEngine estiver atuando como um cliente e fazendo handshaking usando TLSv1.2, então você pode ver o seguinte ocorrendo:

     1. O método `wrap()` produz uma mensagem TLS `ClientHello`, então a coloca no buffer de rede de saída. A aplicação deve enviar corretamente os bytes desta mensagem para o par.
     2. O SSLEngine deve agora processar a resposta do par (como as mensagens `ServerHello`, `Certificate` e `ServerHelloDone`) para impulsionar o handshaking. A aplicação obtém os bytes de resposta do transporte de rede e os coloca no buffer de rede de entrada. O SSLEngine processa esses bytes usando o método `unwrap()`.
     3. O SSLEngine envia mais dados de handshaking (como as mensagens `ChangeCipherSuite` e `Finished`). O `wrap()` coloca os bytes da mensagem no buffer de rede de saída. A aplicação deve enviar corretamente esses bytes para o par como antes.
     4. O SSLEngine espera pela mensagem `ChangeCipherSuite` ou `Finished` de seu par. Os bytes desta mensagem seguem o mesmo caminho que no Passo b.
  6. Uma vez que o handshaking tenha sido concluído, dados de aplicação podem agora começar a fluir. Chame o método `wrap()` para pegar os bytes do buffer de aplicação de saída, criptografá-los e protegê-los, e então colocá-los no buffer de rede para transporte ao par. Da mesma forma, chame o método `unwrap()` para descriptografar e desproteger os dados de rede de entrada. Os dados de aplicação resultantes são colocados no buffer de dados de aplicação de entrada.
  7. Uma vez que os dados tenham sido trocados entre os dois pares, feche ambos os lados de entrada e saída do SSLEngine. Chame o método `closeOutbound()` para sinalizar ao SSLEngine que a aplicação não enviará mais dados. Chame o método `closeInbound()` para sinalizar ao SSLEngine que a conexão de rede foi fechada e não haverá mais dados.

##### Entendendo os Status de Operação do SSLEngine

Para indicar o status do engine e quais ações a aplicação deve tomar, os métodos `SSLEngine.wrap()` e `SSLEngine.unwrap()` retornam uma instância de [`SSLEngineResult`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLEngineResult.html>), como mostrado no [Exemplo 8-5](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>). Este objeto `SSLEngineResult` contém duas partes de informação de status: o status geral do engine e o status do handshaking.

Os possíveis status gerais são representados pelo enum `SSLEngineResult.Status`. Os seguintes status estão disponíveis:

`OK`
    Não houve erro.
`CLOSED`
    A operação fechou o `SSLEngine` ou a operação não pôde ser concluída porque já estava fechada.
`BUFFER_UNDERFLOW`
    O buffer de entrada tinha dados insuficientes para processar, indicando que a aplicação deve obter mais dados do par (por exemplo, lendo mais dados da rede) e tentar a operação novamente.
`BUFFER_OVERFLOW`
    O buffer de saída tinha espaço insuficiente para conter o resultado, indicando que a aplicação deve limpar ou aumentar o buffer de destino e tentar a operação novamente.

O [Exemplo 8-1](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) ilustra como lidar com os status `BUFFER_UNDERFLOW` e `BUFFER_OVERFLOW` do método `SSLEngine.unwrap()`. Ele usa `SSLSession.getApplicationBufferSize()` e `SSLSession.getPacketBufferSize()` para determinar o tamanho dos byte buffers.

Os possíveis status de handshaking são representados pelo enum `SSLEngineResult.HandshakeStatus`. Eles representam se o handshaking foi concluído, se o chamador deve enviar ou receber mais dados de handshaking do par, e assim por diante. Os seguintes status de handshaking estão disponíveis:

`FINISHED`
    O `SSLEngine` acabou de concluir o handshaking.
`NEED_TASK`
    O `SSLEngine` precisa dos resultados de uma (ou mais) tarefas delegadas antes que o handshaking possa continuar.
`NEED_UNWRAP`
    O `SSLEngine` precisa receber dados do lado remoto antes que o handshaking possa continuar.
`NEED_UNWRAP_AGAIN`
    O `SSLEngine` precisa fazer unwrap antes que o handshaking possa continuar. Este valor indica que dados ainda não interpretados foram recebidos anteriormente do lado remoto e não precisam ser recebidos novamente; os dados foram trazidos para o framework JSSE, mas ainda não foram processados.
`NEED_WRAP`
    O `SSLEngine` deve enviar dados para o lado remoto antes que o handshake possa continuar, então SSLEngine.wrap() deve ser chamado.
`NOT_HANDSHAKING`
    O `SSLEngine` não está atualmente realizando o handshake.

Ter dois status por resultado permite que o SSLEngine indique que a aplicação deve realizar duas ações: uma em resposta ao handshake e outra representando o status geral dos métodos `wrap()` e `unwrap()`. Por exemplo, o engine pode, como resultado de uma única chamada `SSLEngine.unwrap()`, retornar `SSLEngineResult.Status.OK` para indicar que os dados de entrada foram processados com sucesso e `SSLEngineResult.HandshakeStatus.NEED_UNWRAP` para indicar que a aplicação deve obter mais dados codificados TLS/DTLS do peer e fornecê-los novamente para `SSLEngine.unwrap()` para que o handshake possa continuar. Como você verá, os exemplos a seguir são bastante simplificados; eles precisariam ser expandidos significativamente para lidar adequadamente com todas essas combinações de status.

[Exemplo 8-2](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) e [Exemplo 8-3](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) ilustram como processar dados de handshake verificando o status do handshake e o status geral dos métodos `wrap()` e `unwrap()`.

Exemplo 8-1 Código de Exemplo para Lidar com BUFFER_UNDERFLOW e BUFFER_OVERFLOW

O exemplo de código a seguir ilustra como lidar com o status BUFFER_UNDERFLOW e BUFFER_OVERFLOW:
```java
        SSLEngineResult res = engine.unwrap(peerNetData, peerAppData);
        switch (res.getStatus()) {
    
            case BUFFER_OVERFLOW:
                // Maybe need to enlarge the peer application data buffer if
                // it is too small, and be sure you've compacted/cleared the
                // buffer from any previous operations.
                if (engine.getSession().getApplicationBufferSize() > peerAppData.capacity()) {
                    // enlarge the peer application data buffer
                } else {
                    // compact or clear the buffer
                }
                // retry the operation
             break;
    
             case BUFFER_UNDERFLOW:
                 // Not enough inbound data to process. Obtain more network data
                 // and retry the operation. You may need to enlarge the peer
                 // network packet buffer, and be sure you've compacted/cleared
                 // the buffer from any previous operations.
                 if (engine.getSession().getPacketBufferSize() > peerNetData.capacity()) {
                     // enlarge the peer network packet buffer
                 } else {
                     // compact or clear the buffer
                 }
                 // obtain more inbound network data and then retry the operation
                 break; 
    
             // Handle other status: CLOSED, OK
             // ...
        }
```

Exemplo 8-2 Código de Exemplo para Verificar e Processar Status de Handshake e Status Gerais

O exemplo de código a seguir ilustra como processar dados de handshake verificando o status do handshake e o status geral dos métodos wrap() e unwrap(): 
```java
    void doHandshake(SocketChannel socketChannel, SSLEngine engine,
        ByteBuffer myNetData, ByteBuffer peerNetData) throws Exception {
    
        // Create byte buffers to use for holding application data
        int appBufferSize = engine.getSession().getApplicationBufferSize();
        ByteBuffer myAppData = ByteBuffer.allocate(appBufferSize);
        ByteBuffer peerAppData = ByteBuffer.allocate(appBufferSize);
    
        // Begin handshake
        engine.beginHandshake();
        SSLEngineResult.HandshakeStatus hs = engine.getHandshakeStatus();
    
        // Process handshaking message
        while (hs != SSLEngineResult.HandshakeStatus.FINISHED &&
            hs != SSLEngineResult.HandshakeStatus.NOT_HANDSHAKING) {
    
            switch (hs) {
    
            case NEED_UNWRAP:
                // Receive handshaking data from peer
                if (socketChannel.read(peerNetData) < 0) {
                    // The channel has reached end-of-stream
                }
    
                // Process incoming handshaking data
                peerNetData.flip();
                SSLEngineResult res = engine.unwrap(peerNetData, peerAppData);
                peerNetData.compact();
                hs = res.getHandshakeStatus();
    
                // Check status
                switch (res.getStatus()) {
                case OK :
                    // Handle OK status
                    break;
    
                   // Handle other status: BUFFER_UNDERFLOW, BUFFER_OVERFLOW, CLOSED
                   // ...
                }
                break;
    
            case NEED_WRAP:
                // Ensure that any previous net data in myNetData has been sent
                // to the peer (not shown here), then generate more.
    
                // Empty/clear the local network packet buffer.        
                myNetData.clear();
    
                // Generate more data to send if possible.
                res = engine.wrap(myAppData, myNetData);
                hs = res.getHandshakeStatus();
    
                // Check status
                switch (res.getStatus()) {
                case OK :
                    myNetData.flip();
    
                    // Send the handshaking data to peer
                    while (myNetData.hasRemaining()) {
                        socketChannel.write(myNetData);
                    }
                    break;
    
                    // Handle other status:  BUFFER_OVERFLOW, BUFFER_UNDERFLOW, CLOSED
                    // ...
                }
                break;
    
            case NEED_TASK :
                // Handle blocking tasks
                break;
    
                // Handle other status:  // FINISHED or NOT_HANDSHAKING
                // ...
            }
        }
    
        // Processes after handshaking
        // ...
    }
```

Exemplo 8-3 Código de Exemplo para Lidar com Status de Handshake DTLS e Status Geral

O exemplo de código a seguir ilustra como lidar com o status de handshake DTLS:
```java
    void handshake(SSLEngine engine, DatagramSocket socket,
                   SocketAddress peerAddr) throws Exception {
        boolean endLoops = false;
        // private static int MAX_HANDSHAKE_LOOPS = 60;
        int loops = MAX_HANDSHAKE_LOOPS;
        engine.beginHandshake();
        while (!endLoops && (serverException == null) && (clientException == null)) {
            if (--loops < 0) {
                throw new RuntimeException("Too many loops to produce handshake packets");
            }
            SSLEngineResult.HandshakeStatus hs = engine.getHandshakeStatus();
            if (hs == SSLEngineResult.HandshakeStatus.NEED_UNWRAP ||
                    hs == SSLEngineResult.HandshakeStatus.NEED_UNWRAP_AGAIN) {
                ByteBuffer iNet;
                ByteBuffer iApp;
                if (hs == SSLEngineResult.HandshakeStatus.NEED_UNWRAP) {
                    // receive ClientHello request and other SSL/TLS/DTLS records
                    byte[] buf = new byte[1024];
                    DatagramPacket packet = new DatagramPacket(buf, buf.length);
                    try {
                        socket.receive(packet);
                    } catch (SocketTimeoutException ste) {
                        // retransmit the packet if timeout
                        List <DatagramPacket> packets =
                            onReceiveTimeout(engine, peerAddr);
                        for (DatagramPacket p : packets) {
                            socket.send(p);
                        }
                        continue;
                    }
                    iNet = ByteBuffer.wrap(buf, 0, packet.getLength());
                    iApp = ByteBuffer.allocate(1024);
                } else {
                    iNet = ByteBuffer.allocate(0);
                    iApp = ByteBuffer.allocate(1024);
                }
                SSLEngineResult r = engine.unwrap(iNet, iApp);
                SSLEngineResult.Status rs = r.getStatus();
                hs = r.getHandshakeStatus();
                if (rs == SSLEngineResult.Status.BUFFER_OVERFLOW) {
                    // the client maximum fragment size config does not work?
                    throw new Exception("Buffer overflow: " +
                                        "incorrect client maximum fragment size");
                } else if (rs == SSLEngineResult.Status.BUFFER_UNDERFLOW) {
                    // bad packet, or the client maximum fragment size
                    // config does not work?
                    if (hs != SSLEngineResult.HandshakeStatus.NOT_HANDSHAKING) {
                        throw new Exception("Buffer underflow: " +
                                            "incorrect client maximum fragment size");
                    } // otherwise, ignore this packet
                } else if (rs == SSLEngineResult.Status.CLOSED) {
                    endLoops = true;
                }   // otherwise, SSLEngineResult.Status.OK:
                if (rs != SSLEngineResult.Status.OK) {
                    continue;
                }
            } else if (hs == SSLEngineResult.HandshakeStatus.NEED_WRAP) {
                List <DatagramPacket> packets =
                    // Call a function to produce handshake packets
                    produceHandshakePackets(engine, peerAddr);
                for (DatagramPacket p : packets) {
                    socket.send(p);
                }
            } else if (hs == SSLEngineResult.HandshakeStatus.NEED_TASK) {
                runDelegatedTasks(engine);
            } else if (hs == SSLEngineResult.HandshakeStatus.NOT_HANDSHAKING) {
                // OK, time to do application data exchange.
                endLoops = true;
            } else if (hs == SSLEngineResult.HandshakeStatus.FINISHED) {
                endLoops = true;
            }
        }
        SSLEngineResult.HandshakeStatus hs = engine.getHandshakeStatus();
        if (hs != SSLEngineResult.HandshakeStatus.NOT_HANDSHAKING) {
            throw new Exception("Not ready for application data yet");
        }
    }
```

##### SSLEngine para Protocolos TLS

Esta seção mostra como criar um objeto SSLEngine e usá-lo para gerar e processar dados TLS.

###### Criando um Objeto SSLEngine

Use o método `SSLContext.createSSLEngine()` para criar um objeto `SSLEngine`.

Antes de usar um objeto `SSLEngine`, você deve configurar o engine para atuar como um cliente ou um servidor, e definir outros parâmetros de configuração, como quais cipher suites usar e se a autenticação do cliente é necessária.

Exemplo 8-4 Código de Exemplo para Criar um Cliente SSLEngine para TLS com JKS como Keystore

O exemplo de código a seguir cria um cliente SSLEngine para TLS que usa JKS como keystore.

Nota:

Neste exemplo, o nome do servidor e o número da porta não são usados para comunicação com o servidor (todo o transporte é responsabilidade da aplicação). Eles são dicas para o provedor JSSE usar para o cache de sessão TLS.
```java
        import javax.net.ssl.*;
        import java.security.*;
    
        // Create and initialize the SSLContext with key material
        char[] passphrase = "passphrase".toCharArray();
    
        // First initialize the key and trust material
        KeyStore ksKeys = KeyStore.getInstance("JKS");
        ksKeys.load(new FileInputStream("testKeys"), passphrase);
        KeyStore ksTrust = KeyStore.getInstance("JKS");
        ksTrust.load(new FileInputStream("testTrust"), passphrase);
    
        // KeyManagers decide which key material to use
        KeyManagerFactory kmf = KeyManagerFactory.getInstance("PKIX");
        kmf.init(ksKeys, passphrase);
    
        // TrustManagers decide whether to allow connections
        TrustManagerFactory tmf = TrustManagerFactory.getInstance("PKIX");
        tmf.init(ksTrust);
    
        // Get an instance of SSLContext for TLS protocols
        sslContext = SSLContext.getInstance("TLS");
        sslContext.init(kmf.getKeyManagers(), tmf.getTrustManagers(), null);
    
        // Create the engine
        SSLEngine engine = sslContext.createSSLEngine(hostname, port);
    
        // Use as client
        engine.setUseClientMode(true);
    
```

###### Gerando e Processando Dados TLS

Os dois principais métodos de `SSLEngine` são `wrap()` e `unwrap()`. Eles são responsáveis por gerar e consumir dados de rede, respectivamente. Dependendo do estado do objeto `SSLEngine`, esses dados podem ser dados de handshake ou dados de aplicação.

Realizando Handshake TLS, Depois Processando Dados TLS, Com SSLEngine.wrap() e SSLEngine.unwrap()

Cada objeto `SSLEngine` possui várias fases durante sua vida útil. Antes que os dados da aplicação possam ser enviados ou recebidos, o protocolo TLS requer um handshake para estabelecer parâmetros criptográficos. Este handshake requer uma série de etapas de ida e volta pelo objeto `SSLEngine`. Durante o handshake inicial, os métodos `wrap()` e `unwrap()` geram e consomem dados de handshake antes de iniciar a troca de dados da aplicação.

A aplicação é responsável por transportar os dados de forma confiável (por exemplo, usando TCP) para e do peer. Ou seja, sua aplicação (e não o `SSLEngine`) deve entregar de forma confiável ao peer quaisquer dados gerados pelo método `wrap()`, e sua aplicação (e não o `SSLEngine`) deve obter dados de forma confiável do peer para que possa decodificá-los chamando o método `unwrap()`.

Cada operação `SSLEngine` gera uma instância da classe `SSLEngineResult`, na qual o campo `SSLEngineResult.HandshakeStatus` é usado para determinar qual operação deve ocorrer em seguida para que o handshake avance.

Quando o handshake estiver completo, chamadas subsequentes a `wrap()` tentarão consumir dados da aplicação e empacotá-los para transporte. O método `unwrap()` tentará o oposto.

Para enviar dados ao peer, a aplicação primeiro fornece os dados que deseja enviar via `SSLEngine.wrap()` para obter os dados codificados TLS correspondentes. A aplicação então envia os dados codificados ao peer usando seu mecanismo de transporte escolhido. Quando a aplicação recebe os dados codificados TLS do peer via mecanismo de transporte, ela fornece esses dados ao `SSLEngine` via `SSLEngine.unwrap()` para obter os dados em texto simples enviados pelo peer.

[Figura 8-3](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) mostra a máquina de estados durante um handshake TLS típico, com mensagens e status correspondentes:

Figura 8-3 Máquina de Estados durante o Handshake TLS


[Description of "Figure 8-3 State Machine during TLS Handshake"](<#/>)

Etapas para Processar Dados TLS

Suponha que você queira processar dados TLS enviados entre um cliente e um servidor. Em geral, você seguiria estas etapas:

  1. Crie instâncias de `ByteBuffer` para representar o buffer de dados da aplicação e o buffer de dados de rede no cliente e no servidor. Nos buffers de dados de aplicação de saída do cliente e do servidor, especifique os dados que você deseja criptografar e enviar pela rede para o servidor e o cliente, respectivamente.

Nota:

No método `wrap(ByteBuffer src, ByteBuffer dst)`, o parâmetro `src` é o buffer de dados da aplicação e `dst` é o buffer de dados de rede. Inversamente, no método `unwrap(ByteBuffer src, ByteBuffer dst)`, o parâmetro `src` é o buffer de dados de rede e `dst` é o buffer de dados da aplicação. Ambos `wrap()` e `unwrap()` retornam uma instância de `SSLEngineResult`, que contém um campo `SSLEngineResult.HandshakeStatus` que indica se o handshake está completo ou o que deve ocorrer em seguida para que o handshake avance.

  2. Em um loop, chame `wrap()` e `unwrap()` no cliente e no servidor da seguinte forma, até que o handshake esteja completo e tanto o cliente quanto o servidor tenham enviado seus dados de aplicação um para o outro:

     1. Chame `wrap()` no cliente e no servidor. Verifique o valor do campo `SSLEngineResult.HandshakeStatus` na instância `SSLEngineResult` que `wrap()` retorna:

        * Se o handshake não estiver completo, o parâmetro `dst` conterá dados de handshake que precisam ser enviados pela rede para o peer.
        * Se o handshake estiver completo, `dst` conterá dados de aplicação criptografados pelo `SSLEngine`, prontos para serem enviados ao peer remoto.
     2. Adicione código para lidar com o valor `SSLEngineResult.HandshakeStatus` retornado pelos métodos `wrap()` e `unwrap()`. Consulte [Understanding SSLEngine Operation Statuses](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) para mais informações.

     3. Se o método `wrap()` gerou dados no buffer de dados de rede (que pode conter dados de handshake ou dados de aplicação criptografados), então envie-os pela rede para o peer remoto.

Nota:

        * É responsabilidade da sua aplicação, e não do `SSLEngine`, enviar dados no buffer de dados de rede para o peer remoto.
        * Depois de chamar `wrap()`, você deve garantir que todos os dados no buffer de dados de rede foram enviados para o peer.

Por exemplo, [Exemplo 8-2](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) envia dados de rede para o peer remoto chamando `SocketChannel.write()`. Ele verifica se todos os dados de rede foram enviados chamando `ByteBuffer.hasRemaining()`:
```java
 while (myNetData.hasRemaining()) {
                        socketChannel.write(myNetData);
                    }
```

     4. Obtenha dados de rede enviados pela rede pelo peer remoto. Observe que é responsabilidade da sua aplicação, e não do `SSLEngine`, fazer isso. Por exemplo, [Exemplo 8-2](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) obtém dados de rede do peer remoto chamando `SocketChannel.read()`:
```java
 case NEED_UNWRAP:
                        // Receive handshaking data from peer
                        if (socketChannel.read(peerNetData) < 0) {
                            // The channel has reached end-of-stream
                        }
```

     5. Com os dados de rede obtidos do peer remoto, chame `unwrap()` no cliente e no servidor. Verifique o valor do campo `SSLEngineResult.HandshakeStatus` na instância `SSLEngineResult` que `unwrap()` retorna:

        * Se o handshake não estiver completo, o parâmetro `src` pode conter pacotes de handshake adicionais, ou mais pacotes precisarão ser obtidos do peer para continuar o handshake.
        * Se o handshake estiver completo, `dst` pode conter dados de aplicação descriptografados pelo `SSLEngine`, prontos para serem processados pela aplicação.
     6. Garanta que o cliente e o servidor lidem com o valor `SSLEngineResult.HandshakeStatus` retornado por `unwrap()`.


Exemplo 8-5 Código de Exemplo para Criar um SocketChannel Não Bloqueante

O exemplo a seguir é uma aplicação SSL que usa um `SocketChannel` não bloqueante para se comunicar com seu peer. Ele envia a string "hello" para o peer codificando-a usando o `SSLEngine` criado no [Exemplo 8-4](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>). Ele usa informações da `SSLSession` para determinar o tamanho dos buffers de bytes.

Nota:

O exemplo pode ser tornado mais robusto e escalável usando um `Selector` com o `SocketChannel` não bloqueante.
```java
        // Create a nonblocking socket channel
        SocketChannel socketChannel = SocketChannel.open();
        socketChannel.configureBlocking(false);
        socketChannel.connect(new InetSocketAddress(hostname, port));
    
        // Complete connection
        while (!socketChannel.finishedConnect()) {
            // do something until connect completed
        }
    
        // Create byte buffers for holding application and encoded data
    
        SSLSession session = engine.getSession();
        ByteBuffer myAppData = ByteBuffer.allocate(session.getApplicationBufferSize());
        ByteBuffer myNetData = ByteBuffer.allocate(session.getPacketBufferSize());
        ByteBuffer peerAppData = ByteBuffer.allocate(session.getApplicationBufferSize());
        ByteBuffer peerNetData = ByteBuffer.allocate(session.getPacketBufferSize());
    
        // Do initial handshake
        doHandshake(socketChannel, engine, myNetData, peerNetData);
    
        myAppData.put("hello".getBytes());
        myAppData.flip();
    
        while (myAppData.hasRemaining()) {
            // Generate TLS/DTLS encoded data (handshake or application data)
            SSLEngineResult res = engine.wrap(myAppData, myNetData);
    
            // Process status of call
            if (res.getStatus() == SSLEngineResult.Status.OK) {
                myAppData.compact();
    
                // Send TLS/DTLS encoded data to peer
                while(myNetData.hasRemaining()) {
                    int num = socketChannel.write(myNetData);
                    if (num == 0) {
                        // no bytes written; try again later
                    }
                }
            }
    
            // Handle other status:  BUFFER_OVERFLOW, CLOSED
            ...
        }
```

Exemplo 8-6 Código de Exemplo para Leitura de Dados de um SocketChannel Não Bloqueante

O exemplo de código a seguir ilustra como ler dados do mesmo `SocketChannel` não bloqueante e extrair os dados em texto simples dele usando o `SSLEngine` criado no [Exemplo 8-4](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>). Cada iteração deste código pode ou não produzir dados em texto simples, dependendo se o handshake está em andamento.
```java
        // Read TLS/DTLS encoded data from peer
        int num = socketChannel.read(peerNetData);
        if (num == -1) {
            // The channel has reached end-of-stream
        } else if (num == 0) {
            // No bytes read; try again ...
        } else {
            // Process incoming data
            peerNetData.flip();
            res = engine.unwrap(peerNetData, peerAppData);
    
            if (res.getStatus() == SSLEngineResult.Status.OK) {
                peerNetData.compact();
    
            if (peerAppData.hasRemaining()) {
                // Use peerAppData
            }
        }
    
        // Handle other status:  BUFFER_OVERFLOW, BUFFER_UNDERFLOW, CLOSED
        ...
```

##### SSLEngine para Protocolos DTLS

Esta seção mostra como criar um objeto SSLEngine e usá-lo para lidar com um handshake DTLS, gerar e processar dados DTLS e lidar com retransmissões em conexões DTLS.

###### Criando um Objeto SSLEngine para DTLS

Os exemplos a seguir ilustram como criar um objeto `SSLEngine` para DTLS.

Nota:

O nome do servidor e o número da porta não são usados para comunicação com o servidor (todo o transporte é responsabilidade da aplicação). Eles são dicas para o provedor JSSE usar para o cache de sessão DTLS e para implementações de cipher suite baseadas em Kerberos para determinar quais credenciais de servidor devem ser obtidas.

Exemplo 8-7 Código de Exemplo para Criar um Cliente SSLEngine para DTLS com PKCS12 como Keystore

O exemplo de código a seguir cria um cliente SSLEngine para DTLS que usa PKCS12 como keystore: 
```java
        import javax.net.ssl.*;
        import java.security.*;
    
        // Create and initialize the SSLContext with key material
        char[] passphrase = "passphrase".toCharArray();
    
        // First initialize the key and trust material
        KeyStore ksKeys = KeyStore.getInstance("PKCS12");
        ksKeys.load(new FileInputStream("testKeys"), passphrase);
        KeyStore ksTrust = KeyStore.getInstance("PKCS12");
        ksTrust.load(new FileInputStream("testTrust"), passphrase);
    
        // KeyManagers decide which key material to use
        KeyManagerFactory kmf = KeyManagerFactory.getInstance("PKIX");
        kmf.init(ksKeys, passphrase);
    
        // TrustManagers decide whether to allow connections
        TrustManagerFactory tmf = TrustManagerFactory.getInstance("PKIX");
        tmf.init(ksTrust);
    
        // Get an instance of SSLContext for DTLS protocols
        sslContext = SSLContext.getInstance("DTLS");
        sslContext.init(kmf.getKeyManagers(), tmf.getTrustManagers(), null);
    
        // Create the engine
        SSLEngine engine = sslContext.createSSLEngine(hostname, port);
    
        // Use engine as client
        engine.setUseClientMode(true);
    
```

Exemplo 8-8 Código de Exemplo para Criar um Servidor SSLEngine para DTLS com PKCS12 como Keystore

O exemplo de código a seguir cria um servidor SSLEngine para DTLS que usa PKCS12 como keystore:
```java
        import javax.net.ssl.*;
        import java.security.*;
    
        // Create and initialize the SSLContext with key material
        char[] passphrase = "passphrase".toCharArray();
    
        // First initialize the key and trust material
        KeyStore ksKeys = KeyStore.getInstance("PKCS12");
        ksKeys.load(new FileInputStream("testKeys"), passphrase);
        KeyStore ksTrust = KeyStore.getInstance("PKCS12");
        ksTrust.load(new FileInputStream("testTrust"), passphrase);
    
        // KeyManagers decide which key material to use
        KeyManagerFactory kmf = KeyManagerFactory.getInstance("PKIX");
        kmf.init(ksKeys, passphrase);
    
        // TrustManagers decide whether to allow connections
        TrustManagerFactory tmf = TrustManagerFactory.getInstance("PKIX");
        tmf.init(ksTrust);
    
        // Get an SSLContext for DTLS Protocol without authentication
        sslContext = SSLContext.getInstance("DTLS");
        sslContext.init(null, null, null);
    
        // Create the engine
        SSLEngine engine = sslContext.createSSLEngine(hostname, port);
    
        // Use the engine as server
        engine.setUseClientMode(false);
    
        // Require client authentication
        engine.setNeedClientAuth(true);
```

###### Gerando e Processando Dados DTLS

Um handshake DTLS e um handshake TLS geram e processam dados de forma semelhante. (Consulte [Gerando e Processando Dados TLS](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).) Ambos usam os métodos SSLEngine.wrap() e SSLEngine.wrap() para gerar e consumir dados de rede, respectivamente.

O diagrama a seguir mostra a máquina de estados durante um handshake DTLS típico, com mensagens e status correspondentes:

Figura 8-4 Máquina de Estados durante o Handshake DTLS


[Description of "Figure 8-4 State Machine during DTLS Handshake"](<#/>)

Exemplo 8-9 Código de Exemplo para Lidar com Status de Handshake DTLS e Status Geral

Este exemplo demonstra como lidar com o status de handshake DTLS (do método SSLEngine.getHandshakeStatus) e o status geral (do método SSLEngineResult.getStatus).
```java
    void handshake(SSLEngine engine, DatagramSocket socket, SocketAddress peerAddr) throws Exception {
        boolean endLoops = false;
        // private static int MAX_HANDSHAKE_LOOPS = 60;
        int loops = MAX_HANDSHAKE_LOOPS;
        engine.beginHandshake();
        while (!endLoops && (serverException == null) && (clientException == null)) {
            if (--loops < 0) {
                throw new RuntimeException("Too many loops to produce handshake packets");
            }
            SSLEngineResult.HandshakeStatus hs = engine.getHandshakeStatus();
            if (hs == SSLEngineResult.HandshakeStatus.NEED_UNWRAP ||
                    hs == SSLEngineResult.HandshakeStatus.NEED_UNWRAP_AGAIN) {
                ByteBuffer iNet;
                ByteBuffer iApp;
                if (hs == SSLEngineResult.HandshakeStatus.NEED_UNWRAP) {
                    // Receive ClientHello request and other SSL/TLS/DTLS records
                    byte[] buf = new byte[1024];
                    DatagramPacket packet = new DatagramPacket(buf, buf.length);
                    try {
                        socket.receive(packet);
                    } catch (SocketTimeoutException ste) {
                        // Retransmit the packet if timeout
                        List <DatagramPacket> packets = onReceiveTimeout(engine, peerAddr);
                        for (DatagramPacket p : packets) {
                            socket.send(p);
                        }
                        continue;
                    }
                    iNet = ByteBuffer.wrap(buf, 0, packet.getLength());
                    iApp = ByteBuffer.allocate(1024);
                } else {
                    iNet = ByteBuffer.allocate(0);
                    iApp = ByteBuffer.allocate(1024);
                }
                SSLEngineResult r = engine.unwrap(iNet, iApp);
                SSLEngineResult.Status rs = r.getStatus();
                hs = r.getHandshakeStatus();
                if (rs == SSLEngineResult.Status.BUFFER_OVERFLOW) {
                    // The client maximum fragment size config does not work?
                    throw new Exception("Buffer overflow: " +
                                        "incorrect client maximum fragment size");
                } else if (rs == SSLEngineResult.Status.BUFFER_UNDERFLOW) {
                    // Bad packet, or the client maximum fragment size
                    // config does not work?
                    if (hs != SSLEngineResult.HandshakeStatus.NOT_HANDSHAKING) {
                        throw new Exception("Buffer underflow: " +
                                            "incorrect client maximum fragment size");
                    } // Otherwise, ignore this packet
                } else if (rs == SSLEngineResult.Status.CLOSED) {
                    endLoops = true;
                } // Otherwise, SSLEngineResult.Status.OK
                if (rs != SSLEngineResult.Status.OK) {
                    continue;
                }
            } else if (hs == SSLEngineResult.HandshakeStatus.NEED_WRAP) {
                // Call a function to produce handshake packets
                List <DatagramPacket> packets = produceHandshakePackets(engine, peerAddr);
                for (DatagramPacket p : packets) {
                    socket.send(p);
                }
            } else if (hs == SSLEngineResult.HandshakeStatus.NEED_TASK) {
                runDelegatedTasks(engine);
            } else if (hs == SSLEngineResult.HandshakeStatus.NOT_HANDSHAKING) {
                // OK, time to do application data exchange
                endLoops = true;
            } else if (hs == SSLEngineResult.HandshakeStatus.FINISHED) {
                endLoops = true;
            }
        }
        SSLEngineResult.HandshakeStatus hs = engine.getHandshakeStatus();
        if (hs != SSLEngineResult.HandshakeStatus.NOT_HANDSHAKING) {
            throw new Exception("Not ready for application data yet");
        }
    }
```

Diferença Entre os Métodos SSLEngine.wrap() de TLS e DTLS

O método `SSLEngine.wrap()` para DTLS é diferente do TLS da seguinte forma:

  * Na implementação TLS de `SSLEngine`, o buffer de saída de `SSLEngine.wrap()` contém um ou mais registros TLS (devido à vulnerabilidade TLSv1 BEAST Cipher Block Chaining).

  * Na implementação DTLS de `SSLEngine`, o buffer de saída de `SSLEngine.wrap()` contém no máximo um registro, para que cada registro DTLS possa ser empacotado e entregue à camada de datagrama individualmente.


Nota:

Cada registro produzido por `SSLEngine.wrap()` deve estar em conformidade com a limitação de tamanho máximo de pacote conforme especificado por `SSLParameters.getMaximumPacketSize()`.


###### Lidando com Retransmissões em Conexões DTLS
Em SSL/TLS sobre uma conexão confiável, os dados têm garantia de chegar na ordem correta, e a retransmissão é desnecessária. No entanto, para DTLS, que frequentemente funciona sobre mídias não confiáveis, mensagens de handshake perdidas ou atrasadas devem ser retransmitidas.

A classe `SSLEngine` opera de maneira completamente neutra ao transporte, e a camada de aplicação realiza toda a E/S. Como a classe `SSLEngine` não é responsável pela E/S, a aplicação é, em vez disso, responsável por fornecer temporizadores e sinalizar a classe `SSLEngine` quando uma retransmissão é necessária. A camada de aplicação deve determinar o valor de timeout correto e quando acionar o evento de timeout. Durante o handshaking, se um objeto `SSLEngine` estiver no estado `HandshakeStatus.NEED_UNWRAP`, uma chamada para SSLEngine.wrap() significa que os pacotes anteriores foram perdidos e devem ser retransmitidos. Para tais casos, a implementação DTLS da classe `SSLEngine` assume a responsabilidade de empacotar as mensagens de handshaking necessárias anteriores novamente, se preciso.

Nota:

Em um engine DTLS, apenas as mensagens de handshake devem ser trocadas corretamente. Dados de aplicação podem lidar com perda de pacotes sem a necessidade de temporizadores.

###### Lidando com Retransmissão em uma Aplicação

`SSLEngine.unwrap()` e `SSLEngine.wrap()` podem ser usados juntos para lidar com a retransmissão em uma aplicação.

[Figura 8-5](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) mostra um cenário típico para lidar com a retransmissão de handshake DTLS:

Figura 8-5 Fluxo de Estado de Retransmissão de Handshake DTLS

1.  Crie e inicialize uma instância de `SSLEngine` DTLS.

Consulte [Criando um Objeto SSLEngine](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>). O processo de handshake DTLS começa.

2.  Se o status do handshake for `HandshakeStatus.NEED_UNWRAP`, aguarde dados da rede.
3.  Se o temporizador expirar, isso indica que as mensagens de handshake entregues anteriormente podem ter sido perdidas.

Nota:

Na retransmissão de handshake DTLS, o status de handshake determinado não é necessariamente `HandshakeStatus.NEED_WRAP` para a chamada a `SSLEngine.wrap()`.

4.  Chame `SSLEngine.wrap()`.
5.  Os pacotes empacotados são entregues.

###### Lidando com uma Mensagem de Handshake Armazenada em Buffer em uma Aplicação

O transporte de datagramas não exige nem fornece entrega confiável ou em ordem dos dados. Mensagens de handshake podem ser perdidas ou precisar ser reordenadas. Na implementação DTLS, uma mensagem de handshake pode precisar ser armazenada em buffer para tratamento futuro antes que todas as mensagens anteriores tenham sido recebidas.

A implementação DTLS de `SSLEngine` assume a responsabilidade de reordenar as mensagens de handshake. O armazenamento em buffer e a reordenação das mensagens de handshake são transparentes para as aplicações.

No entanto, as aplicações devem gerenciar o status `HandshakeStatus.NEED_UNWRAP_AGAIN`. Este status indica que para a próxima operação SSLEngine.unwrap() nenhum dado adicional do lado remoto é necessário.

[Figura 8-6](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) mostra um cenário típico para usar o `HandshakeStatus.NEED_UNWRAP_AGAIN`.

Figura 8-6 Máquina de Estados de Handshake DTLS Armazenado em Buffer com NEED_UNWRAP_AGAIN

1.  Crie e inicialize uma instância de `SSLEngine` DTLS.

Consulte [Criando um Objeto SSLEngine](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

2.  **Opcional:** Se o status do handshake for `HandshakeStatus.NEED_UNWRAP`, aguarde dados da rede.
3.  **Opcional:** Se você recebeu os dados da rede, chame SSLEngine.unwrap().
4.  Determine o status do handshake para o próximo processamento. O status do handshake pode ser `HandshakeStatus.NEED_UNWRAP_AGAIN`, `HandshakeStatus.NEED_UNWRAP` ou `HandshakeStatus.NEED_WRAP`.
    *   Se o status do handshake for `HandshakeStatus.NEED_UNWRAP_AGAIN`, chame SSLEngine.unwrap().

Nota:

Para o status `HandshakeStatus.NEED_UNWRAP_AGAIN`, nenhum dado adicional da rede é necessário para uma operação SSLEngine.unwrap().

5.  Determine o status do handshake para processamento posterior. O status do handshake pode ser `HandshakeStatus.NEED_UNWRAP_AGAIN`, `HandshakeStatus.NEED_UNWRAP` ou `HandshakeStatus.NEED_WRAP`.

##### Lidando com Tarefas de Bloqueio

Durante o handshake, um `SSLEngine` pode encontrar tarefas que podem bloquear ou levar muito tempo. Por exemplo, um `TrustManager` pode precisar se conectar a um serviço remoto de validação de certificado, ou um `KeyManager` pode precisar solicitar ao usuário que determine qual certificado usar como parte da autenticação do cliente. Para preservar a natureza não bloqueante do `SSLEngine`, quando o engine encontra tal tarefa, ele retornará `SSLEngineResult.HandshakeStatus.NEED_TASK`. Ao receber este status, a aplicação deve invocar `SSLEngine.getDelegatedTask()` para obter a tarefa e, em seguida, usando o modelo de threading apropriado para seus requisitos, processar a tarefa. A aplicação pode, por exemplo, obter threads de um pool de threads para processar as tarefas, enquanto a thread principal lida com outras operações de E/S.

O código a seguir executa cada tarefa em uma thread recém-criada:
```java
    if (res.getHandshakeStatus() == SSLEngineResult.HandshakeStatus.NEED_TASK) {
        Runnable task;
        while ((task = engine.getDelegatedTask()) != null) {
            new Thread(task).start();
        }
    }
    
```

O `SSLEngine` bloqueará futuras chamadas `wrap()` e `unwrap()` até que todas as tarefas pendentes sejam concluídas.

##### Encerrando uma Conexão TLS/DTLS

Para um encerramento ordenado de uma conexão TLS/DTLS, os protocolos TLS/DTLS exigem a transmissão de mensagens de fechamento. Portanto, quando uma aplicação termina com a conexão TLS/DTLS, ela deve primeiro obter as mensagens de fechamento do `SSLEngine`, em seguida transmiti-las ao peer usando seu mecanismo de transporte e, finalmente, encerrar o mecanismo de transporte. [Exemplo 8-10](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) ilustra isso.

Além de uma aplicação fechar explicitamente o `SSLEngine`, o `SSLEngine` pode ser fechado pelo peer (através do recebimento de uma mensagem de fechamento enquanto processa dados de handshake), ou pelo `SSLEngine` encontrando um erro ao processar dados de aplicação ou handshake, indicado pelo lançamento de uma `SSLException`. Nesses casos, a aplicação deve invocar `SSLEngine.wrap()` para obter a mensagem de fechamento e enviá-la ao peer até que `SSLEngine.isOutboundDone()` retorne `true` (conforme mostrado no [Exemplo 8-10](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)), ou até que `SSLEngineResult.getStatus()` retorne `CLOSED`.

Além dos encerramentos ordenados, também pode haver encerramentos inesperados quando o link de transporte é cortado antes que as mensagens de fechamento sejam trocadas. Nos exemplos anteriores, a aplicação pode receber `-1` ou `IOException` ao tentar ler do `SocketChannel` não bloqueante, ou receber `IOException` ao tentar escrever no `SocketChannel` não bloqueante. Ao chegar ao final dos seus dados de entrada, você deve chamar `engine.closeInbound()`, o que verificará com o `SSLEngine` se o peer remoto fechou de forma limpa da perspectiva TLS/DTLS. Então a aplicação ainda deve tentar encerrar de forma limpa usando o procedimento no [Exemplo 8-10](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>). Obviamente, ao contrário do `SSLSocket`, a aplicação que usa `SSLEngine` deve lidar com mais transições de estado, status e programação. Consulte [Código de Exemplo Ilustrando o Uso de um SSLEngine](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

Exemplo 8-10 Código de Exemplo para Encerrar uma Conexão SSL/TLS/DTLS

O seguinte exemplo de código ilustra como encerrar uma conexão TLS/DTLS:
```java
    // Indicate that application is done with engine
    engine.closeOutbound();
    
    while (!engine.isOutboundDone()) {
        // Get close message
        SSLEngineResult res = engine.wrap(empty, myNetData);
    
        // Check res statuses
    
        // Send close message to peer
        while(myNetData.hasRemaining()) {
            int num = socketChannel.write(myNetData);
            if (num == 0) {
                // no bytes written; try again later
            }
            myNetData().compact();
        }
    }
    
    // Close transport
    socketChannel.close();
    
```

#### SSLSession e ExtendedSSLSession

A interface `javax.net.ssl.SSLSession` representa um contexto de segurança negociado entre os dois peers de uma conexão `SSLSocket` ou `SSLEngine`. Depois que uma sessão é estabelecida, ela pode ser compartilhada por futuros objetos `SSLSocket` ou `SSLEngine` conectados entre os mesmos dois peers.

Em alguns casos, parâmetros negociados durante o handshake são necessários posteriormente no handshake para tomar decisões sobre confiança. Por exemplo, a lista de algoritmos de assinatura válidos pode restringir os tipos de certificado que podem ser usados para autenticação. A `SSLSession` pode ser recuperada durante o handshake chamando `getHandshakeSession()` em um `SSLSocket` ou `SSLEngine`. Implementações de `TrustManager` ou `KeyManager` podem usar o método `getHandshakeSession()` para obter informações sobre os parâmetros da sessão para ajudá-los a tomar decisões.

Uma `SSLSession` totalmente inicializada contém o conjunto de cifras que será usado para comunicações sobre um socket seguro, bem como uma dica não autoritativa sobre o endereço de rede do peer remoto e informações de gerenciamento, como o tempo de criação e o último uso. Uma sessão também contém um segredo mestre compartilhado negociado entre os peers que é usado para criar chaves criptográficas para criptografar e garantir a integridade das comunicações sobre uma conexão `SSLSocket` ou `SSLEngine`. O valor deste segredo mestre é conhecido apenas pela implementação subjacente do socket seguro e não é exposto através da API `SSLSession`.

`ExtendedSSLSession` estende a interface `SSLSession` para suportar atributos de sessão adicionais. A classe `ExtendedSSLSession` adiciona métodos que descrevem os algoritmos de assinatura suportados pela implementação local e pelo peer. O método `getRequestedServerNames()` chamado em uma instância de `ExtendedSSLSession` é usado para obter uma lista de objetos `SNIServerName` na [Extensão de Indicação de Nome de Servidor (SNI)](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) solicitada. O servidor deve usar os nomes de servidor solicitados para guiar sua seleção de um certificado de autenticação apropriado e/ou outros aspectos da política de segurança. O cliente deve usar os nomes de servidor solicitados para guiar sua identificação de endpoint da identidade do peer e/ou outros aspectos da política de segurança.

Chamadas aos métodos `getPacketBufferSize()` e `getApplicationBufferSize()` em `SSLSession` são usadas para determinar os tamanhos de buffer apropriados usados pelo `SSLEngine`.

Nota:

Os protocolos TLS especificam que as implementações devem produzir pacotes contendo no máximo 16 kilobytes (KB) de texto simples. No entanto, algumas implementações violam a especificação e geram registros grandes de até 32 KB. Se o código `SSLEngine.unwrap()` detectar pacotes de entrada grandes, os tamanhos de buffer retornados por `SSLSession` serão atualizados dinamicamente. As aplicações devem sempre verificar os status BUFFER_OVERFLOW e BUFFER_UNDERFLOW e aumentar os buffers correspondentes, se necessário. Consulte [Compreendendo os Status de Operação do SSLEngine](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>). O SunJSSE sempre enviará registros de 16 KB em conformidade com o padrão e permitirá registros de entrada de 32 KB. Para uma solução alternativa, consulte a propriedade de sistema `jsse.SSLEngine.acceptLargeFragments` em [Personalizando JSSE](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

##### Exportadores de Material de Chave TLS

Os exportadores de material de chave TLS permitem que as aplicações gerem material de chave adicional em nível de aplicação a partir da sessão TLS negociada de uma conexão. Isso permite o suporte para os vários algoritmos de exportação registrados na IETF Internet Assigned Numbers Authority (IANA).

Para mais informações sobre exportadores de material de chave TLS, consulte [RFC 5705: Keying Material Exporters for Transport Layer Security (TLS)](<https://datatracker.ietf.org/doc/rfc5705/>) para TLSv1 e TLSv1.2 e [seção 7.5, Exporters](<https://www.rfc-editor.org/rfc/rfc8446#section-7.5>) em [RFC 8446: The Transport Layer Security (TLS) Protocol Version 1.3](<https://www.rfc-editor.org/rfc/rfc8446>) para TLSv1.3. Consulte a seção [TLS Exporter Labels](<https://www.iana.org/assignments/tls-parameters/tls-parameters.xhtml#exporter-labels>) de [Transport Layer Security (TLS) Parameters](<https://www.iana.org/assignments/tls-parameters/tls-parameters.xhtml>) para uma lista de algoritmos de exportação registrados na IANA.

Existem dois métodos para obter o material de chave:

*   [ExtendedSSLSession.exportKeyingMaterialData(String label, byte[] context, int length)](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/ExtendedSSLSession.html#exportKeyingMaterialData\(java.lang.String,byte\[\],int\)>): Retorna um array de `byte` que contém o Material de Chave Exportado (EKM) gerado.
*   [ExtendedSSLSession.exportKeyingMaterialKey(String keyAlg, String label, byte[] context, int length)](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/ExtendedSSLSession.html#exportKeyingMaterialKey\(java.lang.String,java.lang.String,byte\[\],int\)>): Retorna uma SecretKey do tipo `keyAlg` que contém o EKM gerado. Consulte a seção [SecretKey Algorithms](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html#secretkey-algorithms>) em [Java Security Standard Algorithm Names](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html>) para informações sobre nomes padrão de algoritmos de chave secreta.

Ambos os métodos possuem estes parâmetros:

*   `String label`: Uma string de rótulo para desambiguação
*   `byte[] context`: Um valor de contexto opcional representado como um array de `byte`
*   `int length`: O número de bytes de material EKM necessário

Dependendo do mecanismo de derivação de chave subjacente, o material de chave produzido por exportKeyingMaterialData pode não ser extraível ou exportável. Se for esse o caso, use o método exportingKeyingMaterialKey.

#### Classe HttpsURLConnection

A classe `javax.net.ssl.HttpsURLConnection` estende a classe `java.net.HttpURLConnection` e adiciona suporte para recursos específicos de HTTPS.

O protocolo HTTPS é semelhante ao HTTP, mas o HTTPS primeiro estabelece um canal seguro através de sockets TLS e então verifica a identidade do peer (consulte [Escolha de Cipher Suite e Verificação de Entidade Remota](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)) antes de solicitar ou receber dados. A classe `javax.net.ssl.HttpsURLConnection` estende a classe `java.net.HttpURLConnection` e adiciona suporte para recursos específicos de HTTPS. Para saber mais sobre como as URLs HTTPS são construídas e usadas, consulte as classes [java.net.URL](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/net/URL.html>), [java.net.URLConnection](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/net/URLConnection.html>), [java.net.HttpURLConnection](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/net/HttpURLConnection.html>) e [javax.net.ssl.HttpsURLConnection](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/HttpsURLConnection.html>).

Ao obter uma instância de `HttpsURLConnection`, você pode configurar vários parâmetros HTTP e HTTPS antes de realmente iniciar a conexão de rede através do método `URLConnection.connect()`. De particular interesse são:

*   [Configurando o SSLSocketFactory Atribuído](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)
*   [Configurando o HostnameVerifier Atribuído](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)

##### Configurando o SSLSocketFactory Atribuído

Em algumas situações, é desejável especificar o `SSLSocketFactory` que uma instância de `HttpsURLConnection` usa. Por exemplo, você pode querer tunelar através de um tipo de proxy que não é suportado pela implementação padrão. O novo `SSLSocketFactory` poderia retornar sockets que já realizaram todo o tunelamento necessário, permitindo assim que `HttpsURLConnection` use proxies adicionais.

A classe `HttpsURLConnection` possui um `SSLSocketFactory` padrão que é atribuído quando a classe é carregada (este é o factory retornado pelo método `SSLSocketFactory.getDefault()`). Futuras instâncias de `HttpsURLConnection` herdarão o `SSLSocketFactory` padrão atual até que um novo `SSLSocketFactory` padrão seja atribuído à classe através do método estático `HttpsURLConnection.setDefaultSSLSocketFactory()`. Uma vez que uma instância de `HttpsURLConnection` tenha sido criada, o `SSLSocketFactory` herdado nesta instância pode ser sobrescrito com uma chamada ao método `setSSLSocketFactory()`.

Nota:

Alterar o `SSLSocketFactory` estático padrão não tem efeito nas instâncias existentes de `HttpsURLConnection`. Uma chamada ao método `setSSLSocketFactory()` é necessária para alterar as instâncias existentes.

Você pode obter o `SSLSocketFactory` por instância ou por classe fazendo uma chamada ao método `getSSLSocketFactory()` ou `getDefaultSSLSocketFactory()`, respectivamente.

##### Configurando o HostnameVerifier Atribuído

Se o nome do host não corresponder ao nome do host nas credenciais recebidas como parte do handshake TLS, então é possível que tenha ocorrido falsificação de nome de host. Se a implementação não puder determinar uma correspondência de nome de host com certeza razoável, a implementação TLS realiza um callback para o HostnameVerifier atribuído à instância para verificação adicional. O verificador de nome de host pode tomar as medidas necessárias para fazer a determinação, como realizar a correspondência de padrões de nome de host ou talvez abrir uma caixa de diálogo interativa. Uma verificação malsucedida pelo verificador de nome de host fecha a conexão. Para mais informações sobre verificação de nome de host, consulte [RFC 2818: HTTP over TLS](<http://www.ietf.org/rfc/rfc2818.txt?number=2818>).

Os métodos setHostnameVerifier() e setDefaultHostnameVerifier() operam de maneira semelhante aos métodos setSSLSocketFactory() e setDefaultSSLSocketFactory(), no sentido de que os objetos HostnameVerifier são atribuídos por instância e por classe, e os valores atuais podem ser obtidos por uma chamada aos métodos getHostnameVerifier() ou getDefaultHostnameVerifier().

#### Classes e Interfaces de Suporte

As classes e interfaces nesta seção são fornecidas para suportar a criação e inicialização de objetos `SSLContext`, que são usados para criar objetos `SSLSocketFactory`, `SSLServerSocketFactory` e `SSLEngine`. As classes e interfaces de suporte fazem parte do pacote `javax.net.ssl`.

Três das classes descritas nesta seção ([Classe SSLContext](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>), [Classe KeyManagerFactory](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>), e [Classe TrustManagerFactory](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)) são classes de engine. Uma classe de engine é uma classe de API para algoritmos específicos (ou protocolos, no caso de `SSLContext`), para os quais implementações podem ser fornecidas em um ou mais pacotes de Provedor de Serviço Criptográfico (provedor). Consulte [Princípios de Design JCA](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) e [Classes e Algoritmos de Engine](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

O provedor SunJSSE que vem padrão com o JSSE fornece implementações de `SSLContext`, `KeyManagerFactory` e `TrustManagerFactory`, bem como implementações para classes de engine na API padrão `java.security`. [Tabela 8-1](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) lista as implementações fornecidas pelo SunJSSE.

Tabela 8-1 Implementações Fornecidas pelo SunJSSE

Engine Class Implemented | Algorithm or Protocol
---|---
`KeyStore` | PKCS12
`KeyManagerFactory` | PKIX, SunX509
`TrustManagerFactory` | PKIX (X509 or SunPKIX), SunX509
`SSLContext` | SSLv3Foot 1, TLSv1, TLSv1.1, TLSv1.2, TLSv1.3, DTLSv1.0, DTLSv1.2

Nota de Rodapé 1 A partir do JDK 8u31, o protocolo SSLv3 (Secure Socket Layer) foi desativado e não está disponível por padrão. Consulte a propriedade `java.security.Security` `jdk.tls.disabledAlgorithms` no arquivo `<java_home>/conf/security/java.security`. Se o SSLv3 for absolutamente necessário, o protocolo pode ser reativado removendo `SSLv3` da propriedade `jdk.tls.disabledAlgorithms` no arquivo `java.security` ou definindo dinamicamente esta Propriedade de Segurança antes que o JSSE seja inicializado.

##### Classe SSLContext

A classe `javax.net.ssl.SSLContext` é uma classe de engine para uma implementação de um protocolo de socket seguro. Uma instância desta classe atua como uma fábrica para `SSLSocket`, `SSLServerSocket` e `SSLEngine`. Um objeto `SSLContext` contém todas as informações de estado compartilhadas entre todos os objetos criados sob esse contexto. Por exemplo, o estado da sessão é associado ao `SSLContext` quando é negociado através do protocolo de handshake por sockets criados por fábricas de sockets fornecidas pelo contexto. Essas sessões em cache podem ser reutilizadas e compartilhadas por outros sockets criados sob o mesmo contexto.

Cada instância é configurada através de seu método `init` com as chaves, cadeias de certificados e certificados de CA raiz confiáveis que ela precisa para realizar a autenticação. Esta configuração é fornecida na forma de gerenciadores de chaves e de confiança. Esses gerenciadores fornecem suporte para os aspectos de autenticação e acordo de chave dos conjuntos de cifras suportados pelo contexto.

Atualmente, apenas gerenciadores baseados em X.509 são suportados.

###### Obtendo e Inicializando a Classe SSLContext

A classe `SSLContext` é usada para criar a classe `SSLSocketFactory` ou `SSLServerSocketFactory`.

Existem duas maneiras de obter e inicializar um `SSLContext`:

*   A maneira mais simples é chamar o método estático [`SSLContext.getDefault`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLContext.html#getDefault\(\)>) em qualquer uma das classes `SSLSocketFactory` ou `SSLServerSocketFactory`. Este método cria um `SSLContext` padrão com um `KeyManager`, `TrustManager` e `SecureRandom` padrão (um gerador de números aleatórios seguro). Um `KeyManagerFactory` e `TrustManagerFactory` padrão são usados para criar o `KeyManager` e o `TrustManager`, respectivamente. O material de chave usado é encontrado no keystore e truststore padrão, conforme determinado pelas propriedades do sistema descritas em [Personalizando os Keystores e Truststores Padrão, Tipos de Armazenamento e Senhas de Armazenamento](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).
*   A abordagem que dá ao chamador o maior controle sobre o comportamento do contexto criado é chamar o método estático [`SSLContext.getDefault`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLContext.html#getDefault\(\)>) na classe `SSLContext` e, em seguida, inicializar o contexto chamando o método `init()` apropriado da instância. Uma variante do método `init()` recebe três argumentos: um array de objetos `KeyManager`, um array de objetos `TrustManager` e um objeto `SecureRandom`. Os objetos `KeyManager` e `TrustManager` são criados implementando as interfaces apropriadas ou usando as classes `KeyManagerFactory` e `TrustManagerFactory` para gerar implementações. O `KeyManagerFactory` e o `TrustManagerFactory` podem então ser inicializados com material de chave contido no `KeyStore` passado como argumento para o método `init()` das classes `TrustManagerFactory` ou `KeyManagerFactory`. Finalmente, os métodos `getTrustManagers()` (em `TrustManagerFactory`) e `getKeyManagers()` (em `KeyManagerFactory`) podem ser chamados para obter o array de gerenciadores de confiança ou gerenciadores de chaves, um para cada tipo de material de confiança ou chave.

Uma vez estabelecida uma conexão TLS, uma `SSLSession` é criada, contendo várias informações, como identidades estabelecidas e o conjunto de cifras usado. A `SSLSession` é então usada para descrever um relacionamento contínuo e informações de estado entre duas entidades. Cada conexão TLS envolve uma sessão por vez, mas essa sessão pode ser usada em muitas conexões entre essas entidades, simultaneamente ou sequencialmente.

###### Criando um Objeto SSLContext

Assim como outras classes de engine baseadas em provedor JCA, os objetos `SSLContext` são criados usando os métodos de fábrica `getInstance()` da classe `SSLContext`. Esses métodos estáticos retornam cada um uma instância que implementa pelo menos o protocolo de socket seguro solicitado. A instância retornada pode implementar outros protocolos também. Por exemplo, `getInstance("TLSv1")` pode retornar uma instância que implementa TLSv1, TLSv1.1 e TLSv1.2. O método `getSupportedProtocols()` retorna uma lista de protocolos suportados quando um `SSLSocket`, `SSLServerSocket` ou `SSLEngine` é criado a partir deste contexto. Você pode controlar quais protocolos são realmente habilitados para uma conexão SSL usando o método `setEnabledProtocols(String[] protocols)`.

Nota:

Um objeto `SSLContext` é automaticamente criado, inicializado e atribuído estaticamente à classe `SSLSocketFactory` quando você chama o método `SSLSocketFactory.getDefault()`. Portanto, você não precisa criar e inicializar diretamente um objeto SSLContext (a menos que queira sobrescrever o comportamento padrão).

Para criar um objeto `SSLContext` chamando o método de fábrica `getInstance()`, você deve especificar o nome do protocolo. Você também pode especificar qual provedor deseja que forneça a implementação do protocolo solicitado:

*   `public static SSLContext getInstance(String protocol);`
*   `public static SSLContext getInstance(String protocol, String provider);`
*   `public static SSLContext getInstance(String protocol, Provider provider);`

Se apenas um nome de protocolo for especificado, o sistema determinará se uma implementação do protocolo solicitado está disponível no ambiente. Se houver mais de uma implementação, ele determinará se há uma preferencial.

Se um nome de protocolo e um provedor forem especificados, o sistema determinará se uma implementação do protocolo solicitado está no provedor solicitado. Se não houver implementação, uma exceção será lançada.

Um protocolo é uma string (como `"TLS"`) que descreve o protocolo de socket seguro desejado. Nomes de protocolo comuns para objetos `SSLContext` são definidos em [Java Security Standard Algorithm Names](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html>).

Um `SSLContext` pode ser obtido da seguinte forma:
```java
    SSLContext sc = SSLContext.getInstance("TLS");
    
```

Um `SSLContext` recém-criado deve ser inicializado chamando o método `init`:
```java
    public void init(KeyManager[] km, TrustManager[] tm, SecureRandom random);
    
```

Se o parâmetro `KeyManager[]` for null, um `KeyManager` vazio será definido para este contexto. Se o parâmetro `TrustManager[]` for null, os provedores de segurança instalados serão pesquisados pela implementação de maior prioridade da classe TrustManagerFactory (consulte [Classe TrustManagerFactory](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)), a partir da qual um `TrustManager` apropriado será obtido. Da mesma forma, o parâmetro `SecureRandom` pode ser null, caso em que uma implementação padrão será usada.

Se o contexto padrão interno for usado (por exemplo, um `SSLContext` é criado por `SSLSocketFactory.getDefault()` ou `SSLServerSocketFactory.getDefault()`), então um [KeyManager e TrustManager padrão](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) são criados. A implementação padrão de `SecureRandom` também é escolhida.

##### Interface TrustManager

A responsabilidade principal do `TrustManager` é determinar se as credenciais de autenticação apresentadas devem ser confiáveis. Se as credenciais não forem confiáveis, a conexão será encerrada. Para autenticar a identidade remota de um peer de socket seguro, você deve inicializar um objeto `SSLContext` com um ou mais objetos `TrustManager`. Você deve passar um `TrustManager` para cada mecanismo de autenticação suportado. Se null for passado na inicialização do `SSLContext`, um gerenciador de confiança será criado para você. Tipicamente, um único gerenciador de confiança suporta autenticação baseada em certificados de chave pública X.509 (por exemplo, `X509TrustManager`). Algumas implementações de socket seguro também podem suportar autenticação baseada em chaves secretas compartilhadas, Kerberos ou outros mecanismos.

Objetos `TrustManager` são criados por um `TrustManagerFactory`, ou fornecendo uma implementação concreta da interface.

##### Classe TrustManagerFactory

O `javax.net.ssl.TrustManagerFactory` é uma classe de engine para um serviço baseado em provedor que atua como uma fábrica para um ou mais tipos de objetos `TrustManager`. Por ser baseado em provedor, fábricas adicionais podem ser implementadas e configuradas para fornecer gerenciadores de confiança adicionais ou alternativos que fornecem serviços mais sofisticados ou que implementam políticas de autenticação específicas da instalação.
###### Criando um TrustManagerFactory

Você cria uma instância desta classe de maneira similar a `SSLContext`, exceto por passar uma string de nome de algoritmo em vez de um nome de protocolo para o método `getInstance()`:
```
    TrustManagerFactory tmf = TrustManagerFactory.getInstance(String algorithm);
    TrustManagerFactory tmf = TrustManagerFactory.getInstance(String algorithm, String provider);
    TrustManagerFactory tmf = TrustManagerFactory.getInstance(String algorithm, Provider provider);
    
```

Uma chamada de exemplo é a seguinte:
```
    TrustManagerFactory tmf = TrustManagerFactory.getInstance("PKIX", "SunJSSE");
    
```

A chamada anterior cria uma instância da fábrica de trust managers PKIX do provedor SunJSSE. Esta fábrica pode ser usada para criar trust managers que fornecem verificação de validade de caminho de certificação baseada em X.509 PKIX.

Ao inicializar um `SSLContext`, você pode usar trust managers criados a partir de uma fábrica de trust managers, ou pode escrever seu próprio trust manager, por exemplo, usando a API [`CertPath` ](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/cert/CertPath.html>). Consulte o [Guia do Programador Java PKI](<#/doc/guides/security/java-pki-programmers-guide>). Você não precisa usar uma fábrica de trust managers se implementar um trust manager usando a interface [`X509TrustManager`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/X509TrustManager.html>).

Uma fábrica recém-criada deve ser inicializada chamando um dos métodos `init()`:
```
    public void init(KeyStore ks);
    public void init(ManagerFactoryParameters spec);
    
```

Chame o método `init()` que for apropriado para o `TrustManagerFactory` que você está usando. Se não tiver certeza, pergunte ao fornecedor do provedor.

Para muitas fábricas, como a `TrustManagerFactory` SunX509 do provedor SunJSSE, o `KeyStore` é a única informação necessária para inicializar o `TrustManagerFactory` e, portanto, o primeiro método `init` é o apropriado para chamar. O `TrustManagerFactory` consultará o `KeyStore` para obter informações sobre quais certificados remotos devem ser confiáveis durante as verificações de autorização.

Às vezes, parâmetros de inicialização diferentes de um `KeyStore` são necessários por um provedor. Espera-se que os usuários desse provedor passem uma implementação dos `ManagerFactoryParameters` apropriados, conforme definido pelo provedor. O provedor pode então chamar os métodos especificados na implementação de `ManagerFactoryParameters` para obter as informações necessárias.

Por exemplo, suponha que o provedor `TrustManagerFactory` exija os parâmetros de inicialização B, R e S de qualquer aplicação que deseje usar esse provedor. Como todos os provedores que exigem parâmetros de inicialização diferentes de um `KeyStore`, o provedor exige que a aplicação forneça uma instância de uma classe que implemente uma subinterface `ManagerFactoryParameters` específica. No exemplo, suponha que o provedor exija que a aplicação chamadora implemente e crie uma instância de `MyTrustManagerFactoryParams` e a passe para o segundo método `init()`. O exemplo a seguir ilustra como `MyTrustManagerFactoryParams` pode ser:
```
    public interface MyTrustManagerFactoryParams extends ManagerFactoryParameters {
      public boolean getBValue();
      public float getRValue();
      public String getSValue();
    }
    
```

Alguns trust managers podem tomar decisões de confiança sem serem explicitamente inicializados com um objeto `KeyStore` ou quaisquer outros parâmetros. Por exemplo, eles podem acessar material de confiança de um serviço de diretório local via LDAP, usar um servidor remoto de verificação de status de certificado online ou acessar material de confiança padrão de um local local padrão.

###### Verificar a Data de Expiração dos Certificados do Objeto TrustManagerFactory

O método a seguir, `filterTrustAnchors`, filtra um conjunto de trust anchors, removendo aqueles cujos certificados expirarão na data especificada, e então inicializa um objeto `TrustManagerFactory` com este conjunto.
```
        public static void filterTrustAnchors (
            String truststore, String password, String validityDate)
            throws FileNotFoundException, KeyStoreException, IOException,
                ParseException, NoSuchAlgorithmException,
                InvalidAlgorithmParameterException, CertificateException,
                KeyManagementException {
                
            FileInputStream is = new FileInputStream(truststore);
            KeyStore keystore = KeyStore.getInstance(KeyStore.getDefaultType());
            keystore.load(is, password.toCharArray());
            PKIXParameters params = new PKIXParameters(keystore);
            
            // Obtain CA root certificates        
            Set<TrustAnchor> myTrustAnchors = params.getTrustAnchors();
            
            // Create new set of CA certificates that are still valid for
            // specified date        
            Set<TrustAnchor> validTrustAnchors =
                myTrustAnchors.stream().filter(
                    ta -> {
                        try {
                            ta.getTrustedCert().checkValidity(
                                DateFormat.getDateInstance().parse(validityDate));
                        } catch (CertificateException | ParseException e) {
                            return false;
                        }
                        return true; }).collect(Collectors.toSet());
                 
            // Create PKIXBuilderParameters parameters               
            PKIXBuilderParameters pkixParams =
                new PKIXBuilderParameters(validTrustAnchors, new X509CertSelector());
        
            // Wrap PKIX parameters as trust manager parameters
            ManagerFactoryParameters trustParams =
                new CertPathTrustManagerParameters(pkixParams);
                
            // Create TrustManagerFactory for PKIX-compliant trust managers
            TrustManagerFactory factory = TrustManagerFactory.getInstance("PKIX");
    
            // Pass parameters to factory to be passed to CertPath implementation
            factory.init(trustParams);
    
            // Use factory
            SSLContext ctx = SSLContext.getInstance("TLS");
            ctx.init(null, factory.getTrustManagers(), null);              
        }
```

###### Suporte a PKIX TrustManager

O algoritmo padrão do trust manager é PKIX. Ele pode ser alterado editando a propriedade `ssl.TrustManagerFactory.algorithm` no arquivo `java.security`.

A fábrica de trust managers PKIX usa a implementação CertPath PKIX (consulte [Visão Geral do Guia do Programador PKI](<#/doc/guides/security/java-pki-programmers-guide>)) de um provedor de segurança instalado. A fábrica de trust managers pode ser inicializada usando o método `init(KeyStores)` normal, ou passando parâmetros CertPath para o trust manager PKIX usando a classe [CertPathTrustManagerParameters](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/CertPathTrustManagerParameters.html>).

[Exemplo 8-11](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) ilustra como fazer com que o trust manager use um armazenamento de certificados LDAP específico e habilite a verificação de revogação.

Se o método `TrustManagerFactory.init(KeyStore)` for usado, então os parâmetros PKIX padrão são utilizados com a exceção de que a verificação de revogação é desabilitada. Ela pode ser habilitada definindo a propriedade de sistema `com.sun.net.ssl.checkRevocation` como `true`. Esta configuração exige que a implementação CertPath possa localizar informações de revogação por si mesma. A implementação PKIX no provedor pode fazer isso em muitos casos, mas exige que a propriedade de sistema `com.sun.security.enableCRLDP` seja definida como `true`. Observe que o método `TrustManagerFactory.init(ManagerFactoryParameters)` tem a verificação de revogação habilitada por padrão.

Consulte [Classes PKIX](<#/doc/guides/security/java-pki-programmers-guide>) e [A Classe CertPath](<#/doc/guides/security/java-pki-programmers-guide>).

Exemplo 8-11 Código de Exemplo para Usar um Certificado LDAP para Habilitar a Verificação de Revogação

O exemplo a seguir ilustra como fazer com que o trust manager use um armazenamento de certificados LDAP específico e habilite a verificação de revogação:
```
        import javax.net.ssl.*;
        import java.security.cert.*;
        import java.security.KeyStore;
        import java.io.FileInputStream;
        ...
        
        // Obtain Keystore password
        char[] pass = System.console().readPassword("Password: ");
    
        // Create PKIX parameters
        KeyStore anchors = KeyStore.getInstance("JKS");
        anchors.load(new FileInputStream(anchorsFile, pass));
        PKIXBuilderParameters pkixParams = new PKIXBuilderParameters(anchors, new X509CertSelector());
        
        // Specify LDAP certificate store to use
        LDAPCertStoreParameters lcsp = new LDAPCertStoreParameters("ldap.imc.org", 389);
        pkixParams.addCertStore(CertStore.getInstance("LDAP", lcsp));
        
        // Specify that revocation checking is to be enabled
        pkixParams.setRevocationEnabled(true);
        
        // Wrap PKIX parameters as trust manager parameters
        ManagerFactoryParameters trustParams = new CertPathTrustManagerParameters(pkixParams);
        
        // Create TrustManagerFactory for PKIX-compliant trust managers
        TrustManagerFactory factory = TrustManagerFactory.getInstance("PKIX");
        
        // Pass parameters to factory to be passed to CertPath implementation
        factory.init(trustParams);
        
        // Use factory
        SSLContext ctx = SSLContext.getInstance("TLS");
        ctx.init(null, factory.getTrustManagers(), null);
    
```

##### Interface X509TrustManager

A interface `javax.net.ssl.X509TrustManager` estende a interface geral `TrustManager`. Ela deve ser implementada por um trust manager ao usar autenticação baseada em X.509.

Para suportar a autenticação X.509 de pares de socket remotos através do JSSE, uma instância desta interface deve ser passada para o método `init` de um objeto `SSLContext`.

###### Criando um X509TrustManager

Você pode implementar esta interface diretamente ou obter uma de uma `TrustManagerFactory` baseada em provedor (como a fornecida pelo provedor SunJSSE). Você também pode implementar sua própria interface que delega a um trust manager gerado pela fábrica. Por exemplo, você pode fazer isso para filtrar as decisões de confiança resultantes e consultar um usuário final através de uma interface gráfica de usuário.

Se um parâmetro `KeyStore` nulo for passado para a `TrustManagerFactory` SunJSSE PKIX ou SunX509, então a fábrica usa o seguinte processo para tentar encontrar material de confiança:

  1. Se a propriedade `javax.net.ssl.trustStore` estiver definida, então a `TrustManagerFactory` tenta encontrar um arquivo usando o nome de arquivo especificado por essa propriedade de sistema, e usa esse arquivo para o parâmetro `KeyStore`. Se a propriedade de sistema `javax.net.ssl.trustStorePassword` também estiver definida, então seu valor é usado para verificar a integridade dos dados no truststore antes de abri-lo.

Se a propriedade `javax.net.ssl.trustStore` estiver definida, mas o arquivo especificado não existir, então um `TrustManager` padrão usando um keystore vazio é criado.

  2. Se a propriedade de sistema `javax.net.ssl.trustStore` não foi especificada, então:
     * se o arquivo java-home`/lib/security/jssecacerts` existir, esse arquivo é usado;
     * se o arquivo java-home`/lib/security/cacerts` existir, esse arquivo é usado;
     * se nenhum desses arquivos existir, então a suíte de cifras TLS é anônima, não realiza nenhuma autenticação e, portanto, não precisa de um truststore.

Para saber mais sobre o que java-home se refere, consulte [Termos e Definições](<#/doc/guides/security/terms-definitions>).

A fábrica procura por um arquivo especificado através da Propriedade de Segurança `javax.net.ssl.trustStore` ou pelo arquivo `jssecacerts` antes de verificar um arquivo `cacerts`. Portanto, você pode fornecer um conjunto de certificados raiz confiáveis específicos do JSSE, separados daqueles que podem estar presentes em `cacerts` para fins de assinatura de código.

###### Criando Seu Próprio X509TrustManager

Se o comportamento do `X509TrustManager` fornecido não for adequado para sua situação, você pode criar seu próprio `X509TrustManager` criando e registrando sua própria `TrustManagerFactory` ou implementando a interface `X509TrustManager` diretamente.

[Exemplo 8-12](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) ilustra uma classe `MyX509TrustManager` que aprimora o comportamento padrão do `X509TrustManager` do SunJSSE, fornecendo lógica de autenticação alternativa quando o `X509TrustManager` padrão falha.

Depois de criar tal trust manager, atribua-o a um `SSLContext` através do método `init()`, como no exemplo a seguir. Futuras `SocketFactories` criadas a partir deste `SSLContext` usarão seu novo `TrustManager` ao tomar decisões de confiança.
```
    TrustManager[] myTMs = new TrustManager[] { new MyX509TrustManager() };
    SSLContext ctx = SSLContext.getInstance("TLS");
    ctx.init(null, myTMs, null);
    
```

Exemplo 8-12 Código de Exemplo para Criar um X509TrustManager

O exemplo de código a seguir ilustra a classe `MyX509TrustManager` que aprimora o comportamento padrão do `X509TrustManager` do SunJSSE, fornecendo lógica de autenticação alternativa quando o `X509TrustManager` padrão falha:
```
    class MyX509TrustManager implements X509TrustManager {
    
         /*
          * The default PKIX X509TrustManager9.  Decisions are delegated
          * to it, and a fall back to the logic in this class is performed
          * if the default X509TrustManager does not trust it.
          */
         X509TrustManager pkixTrustManager;
    
         MyX509TrustManager() throws Exception {
             // create a "default" JSSE X509TrustManager.
    
             KeyStore ks = KeyStore.getInstance("JKS");
             ks.load(new FileInputStream("trustedCerts"), "passphrase".toCharArray());
    
             TrustManagerFactory tmf = TrustManagerFactory.getInstance("PKIX");
             tmf.init(ks);
    
             TrustManager tms [] = tmf.getTrustManagers();
    
             /*
              * Iterate over the returned trust managers, looking
              * for an instance of X509TrustManager.  If found,
              * use that as the default trust manager.
              */
             for (int i = 0; i < tms.length; i++) {
                 if (tms[i] instanceof X509TrustManager) {
                     pkixTrustManager = (X509TrustManager) tms[i];
                     return;
                 }
             }
    
             /*
              * Find some other way to initialize, or else the
              * constructor fails.
              */
             throw new Exception("Couldn't initialize");
         }
    
         /*
          * Delegate to the default trust manager.
          */
         public void checkClientTrusted(X509Certificate[] chain, String authType)
                     throws CertificateException {
             try {
                 pkixTrustManager.checkClientTrusted(chain, authType);
             } catch (CertificateException excep) {
                 // do any special handling here, or rethrow exception.
             }
         }
    
         /*
          * Delegate to the default trust manager.
          */
         public void checkServerTrusted(X509Certificate[] chain, String authType)
                     throws CertificateException {
             try {
                 pkixTrustManager.checkServerTrusted(chain, authType);
             } catch (CertificateException excep) {
                 /*
                  * Possibly pop up a dialog box asking whether to trust the
                  * cert chain.
                  */
             }
         }
    
         /*
          * Merely pass this through.
          */
         public X509Certificate[] getAcceptedIssuers() {
             return pkixTrustManager.getAcceptedIssuers();
         }
    }
    
```

###### Atualizando o Keystore Dinamicamente

Você pode aprimorar `MyX509TrustManager` para lidar com atualizações dinâmicas do keystore. Quando um teste `checkClientTrusted` ou `checkServerTrusted` falha e não estabelece uma cadeia de certificados confiável, você pode adicionar o certificado confiável necessário ao keystore. Você deve criar um novo `pkixTrustManager` a partir da `TrustManagerFactory` inicializada com o keystore atualizado. Ao estabelecer uma nova conexão (usando o `SSLContext` previamente inicializado), o certificado recém-adicionado será usado ao tomar decisões de confiança.

##### Classe X509ExtendedTrustManager

A classe abstrata `X509ExtendedTrustManager` é uma implementação da interface `X509TrustManager` que permite a seleção de confiança sensível à conexão. Ela adiciona métodos que selecionam um alias de chave para cliente ou servidor com base no tipo de chave, emissores permitidos e no `SSLEngine` atual:

  * `public String chooseEngineClientAlias(String[] keyType, Principal[] issuers, SSLEngine engine)`
  * `public String chooseEngineServerAlias(String keyType, Principal[] issuers, SSLEngine engine)`

Se um key manager não for uma instância da classe `X509ExtendedTrustManager`, ele não funcionará com a classe `SSLEngine`.

Para provedores JSSE e implementações de trust manager, a classe `X509ExtendedTrustManager` é altamente recomendada em detrimento da interface `X509TrustManager` legada.

No TLS 1.2 e posterior, tanto o cliente quanto o servidor podem especificar quais algoritmos de hash e assinatura eles aceitarão. Para autenticar o lado remoto, as decisões de autenticação devem ser baseadas tanto nos certificados X509 quanto nos algoritmos de hash e assinatura aceitos remotamente. Os algoritmos de hash e assinatura aceitos remotamente podem ser recuperados usando o método `ExtendedSSLSession.getPeerSupportedSignatureAlgorithms()`.

Você pode criar sua própria subclasse `X509ExtendedKeyManager` de maneira similar à mostrada em [Criando Seu Próprio X509TrustManager](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

O suporte para a [Extensão Server Name Indication (SNI)](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) no lado do servidor permite que o key manager verifique o nome do servidor e selecione a chave apropriada de acordo. Por exemplo, suponha que existam três entradas de chave com certificados no keystore:

  * `cn=www.example.com`
  * `cn=www.example.org`
  * `cn=www.example.net`

Se a mensagem ClientHello solicitar a conexão com `www.example.net` na extensão SNI, então o servidor deve ser capaz de selecionar o certificado com o assunto `cn=www.example.net`.

##### Interface KeyManager

A responsabilidade principal do `KeyManager` é selecionar as credenciais de autenticação que serão eventualmente enviadas ao host remoto. Para autenticar-se (um par de socket seguro local) a um par remoto, você deve inicializar um objeto `SSLContext` com um ou mais objetos `KeyManager`. Você deve passar um `KeyManager` para cada mecanismo de autenticação diferente que será suportado. Se `null` for passado na inicialização do `SSLContext`, então um `KeyManager` vazio será criado. Se o contexto padrão interno for usado (por exemplo, um `SSLContext` criado por `SSLSocketFactory.getDefault()` ou `SSLServerSocketFactory.getDefault()`), então um `KeyManager` padrão é criado. Consulte [Personalizando os Keystores e Truststores Padrão, Tipos de Armazenamento e Senhas de Armazenamento](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>). Tipicamente, um único key manager suporta autenticação baseada em certificados de chave pública X.509. Algumas implementações de socket seguro também podem suportar autenticação baseada em chaves secretas compartilhadas, Kerberos ou outros mecanismos.

Objetos `KeyManager` são criados por uma `KeyManagerFactory`, ou fornecendo uma implementação concreta da interface.

##### Classe KeyManagerFactory

A classe `javax.net.ssl.KeyManagerFactory` é uma classe de motor para um serviço baseado em provedor que atua como uma fábrica para um ou mais tipos de objetos `KeyManager`. O provedor SunJSSE implementa uma fábrica que pode retornar um key manager X.509 básico. Por ser baseada em provedor, fábricas adicionais podem ser implementadas e configuradas para fornecer key managers adicionais ou alternativos.

###### Criando uma KeyManagerFactory

Você cria uma instância desta classe de maneira similar a `SSLContext`, exceto por passar uma string de nome de algoritmo em vez de um nome de protocolo para o método `getInstance()`:
```
    KeyManagerFactory kmf = getInstance(String algorithm);
    KeyManagerFactory kmf = getInstance(String algorithm, String provider);
    KeyManagerFactory kmf = getInstance(String algorithm, Provider provider);
    
```

Uma chamada de exemplo é a seguinte:
```
    KeyManagerFactory kmf = KeyManagerFactory.getInstance("SunX509", "SunJSSE");
    
```

A chamada anterior cria uma instância da fábrica de key managers padrão do provedor SunJSSE, que fornece chaves de autenticação básicas baseadas em X.509.

Uma fábrica recém-criada deve ser inicializada chamando um dos métodos `init`:
```
    public void init(KeyStore ks, char[] password);
    public void init(ManagerFactoryParameters spec);
    
```

Chame o método `init` que for apropriado para a `KeyManagerFactory` que você está usando. Se não tiver certeza, pergunte ao fornecedor do provedor.

Para muitas fábricas, como a `KeyManagerFactory` SunX509 padrão do provedor SunJSSE, o `KeyStore` e a senha são as únicas informações necessárias para inicializar a `KeyManagerFactory` e, portanto, o primeiro método `init` é o apropriado para chamar. A `KeyManagerFactory` consultará o `KeyStore` para obter informações sobre qual chave privada e certificados de chave pública correspondentes devem ser usados para autenticar-se a um par de socket remoto. O parâmetro `password` especifica a senha que será usada com os métodos para acessar chaves do `KeyStore`. Todas as chaves no `KeyStore` devem ser protegidas pela mesma senha.

Às vezes, parâmetros de inicialização diferentes de um `KeyStore` e senha são necessários por um provedor. Espera-se que os usuários desse provedor passem uma implementação dos `ManagerFactoryParameters` apropriados, conforme definido pelo provedor. O provedor pode então chamar os métodos especificados na implementação de `ManagerFactoryParameters` para obter as informações necessárias.

Algumas fábricas podem fornecer acesso a material de autenticação sem serem inicializadas com um objeto `KeyStore` ou quaisquer outros parâmetros. Por exemplo, elas podem acessar material de chave como parte de um mecanismo de login, como um baseado em JAAS, o Java Authentication and Authorization Service.

Conforme indicado anteriormente, o provedor SunJSSE suporta uma fábrica SunX509 que deve ser inicializada com um parâmetro `KeyStore`.

##### Interface X509KeyManager

A interface `javax.net.ssl.X509KeyManager` estende a interface geral `KeyManager`. Ela deve ser implementada por um key manager para autenticação baseada em X.509. Para suportar a autenticação X.509 para pares de socket remotos através do JSSE, uma instância desta interface deve ser passada para o método `init()` de um objeto `SSLContext`.

###### Criando um X509KeyManager

Você pode implementar esta interface diretamente ou obter uma de uma `KeyManagerFactory` baseada em provedor (como a fornecida pelo provedor SunJSSE). Você também pode implementar sua própria interface que delega a um key manager gerado pela fábrica. Por exemplo, você pode fazer isso para filtrar as chaves resultantes e consultar um usuário final através de uma interface gráfica de usuário.

###### Criando Seu Próprio X509KeyManager

Se o comportamento padrão do `X509KeyManager` não for adequado para sua situação, você pode criar seu próprio `X509KeyManager` de maneira similar à mostrada em [Criando Seu Próprio X509TrustManager](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

##### Classe X509ExtendedKeyManager

A classe abstrata `X509ExtendedKeyManager` é uma implementação da interface `X509KeyManager` que permite a seleção de chave específica da conexão. Ela adiciona dois métodos que selecionam um alias de chave para cliente ou servidor com base no tipo de chave, emissores permitidos e no `SSLEngine` atual:

  * `public String chooseEngineClientAlias(String[] keyType, Principal[] issuers, SSLEngine engine)`
  * `public String chooseEngineServerAlias(String keyType, Principal[] issuers, SSLEngine engine)`

Se um key manager não for uma instância da classe `X509ExtendedKeyManager`, ele não funcionará com a classe `SSLEngine`.

Para provedores JSSE e implementações de key manager, a classe `X509ExtendedKeyManager` é altamente recomendada em detrimento da interface `X509KeyManager` legada.

No TLS 1.2 e posterior, tanto o cliente quanto o servidor podem especificar quais algoritmos de hash e assinatura eles aceitarão. Para passar a autenticação exigida pelo lado remoto, as decisões de seleção de chave local devem ser baseadas tanto nos certificados X509 quanto nos algoritmos de hash e assinatura aceitos remotamente. Os algoritmos de hash e assinatura aceitos remotamente podem ser recuperados usando o método `ExtendedSSLSession.getPeerSupportedSignatureAlgorithms()`.

Você pode criar sua própria subclasse `X509ExtendedKeyManager` de maneira similar à mostrada em [Criando Seu Próprio X509TrustManager](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

O suporte para a [Extensão Server Name Indication (SNI)](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) no lado do servidor permite que o key manager verifique o nome do servidor e selecione a chave apropriada de acordo. Por exemplo, suponha que existam três entradas de chave com certificados no keystore:

  * `cn=www.example.com`
  * `cn=www.example.org`
  * `cn=www.example.net`

Se a mensagem ClientHello solicitar a conexão com `www.example.net` na extensão SNI, então o servidor deve ser capaz de selecionar o certificado com o assunto `cn=www.example.net`.
##### Relação Entre um TrustManager e um KeyManager

Historicamente, tem havido confusão em relação à funcionalidade de um `TrustManager` e um `KeyManager`.

Um `TrustManager` determina se as credenciais de autenticação remotas (e, portanto, a conexão) devem ser confiáveis.

Um `KeyManager` determina quais credenciais de autenticação enviar ao host remoto.

#### Classes e Interfaces de Suporte Secundário

Essas classes são fornecidas como parte da API JSSE para suportar a criação, uso e gerenciamento de sockets seguros. Elas são menos propensas a serem usadas por aplicações de sockets seguros do que as classes principais e de suporte. As classes e interfaces de suporte secundário fazem parte dos pacotes `javax.net.ssl` e `javax.security.cert`.

##### Classe SSLParameters

A classe `SSLParameters` encapsula os seguintes parâmetros que afetam uma conexão SSL/TLS/DTLS:

  * A lista de cipher suites a serem aceitas em um handshake TLS/DTLS
  * A lista de esquemas de assinatura a serem aceitos em um handshake TLS/DTLS
  * A lista de protocolos a serem permitidos
  * O algoritmo de identificação de endpoint durante o handshake TLS/DTLS
  * Os nomes de servidor e os matchers de nome de servidor (veja [Extensão Server Name Indication (SNI)](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>))
  * A preferência de cipher suite a ser usada em um handshake TLS/DTLS
  * Algoritmo durante o handshake TLS/DTLS
  * A Server Name Indication (SNI)
  * O tamanho máximo do pacote de rede
  * As restrições de algoritmo e se os servidores TLS/DTLS devem solicitar ou exigir autenticação do cliente

Você pode recuperar os `SSLParameters` atuais para um `SSLSocket` ou `SSLEngine` usando os seguintes métodos:

  * `getSSLParameters()` em um `SSLSocket`, `SSLServerSocket` e `SSLEngine`
  * `getDefaultSSLParameters()` e `getSupportedSSLParamters()` em um `SSLContext`

Você pode atribuir `SSLParameters` com o método `setSSLParameters()` em um `SSLSocket`, `SSLServerSocket` e `SSLEngine`.

Você pode definir explicitamente a indicação de nome de servidor com o método `SSLParameters.setServerNames()`. A indicação de nome de servidor no modo cliente também afeta a identificação de endpoint. Na implementação de `X509ExtendedTrustManager`, ela usa a indicação de nome de servidor recuperada pelo método `ExtendedSSLSession.getRequestedServerNames()`. Veja [Exemplo 8-14](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

Exemplo 8-14 Código de Exemplo para Definir a Indicação de Nome de Servidor

Este exemplo usa o nome do host na indicação de nome de servidor (`www.example.com`) para fazer a identificação de endpoint contra a identidade do par apresentada no certificado X.509 da entidade final.
```
        SSLSocketFactory factory = ...
        SSLSocket sslSocket = factory.createSocket("172.16.10.6", 443);
        // SSLEngine sslEngine = sslContext.createSSLEngine("172.16.10.6", 443);

        SNIHostName serverName = new SNIHostName("www.example.com");
        List<SNIServerName> serverNames = new ArrayList<>(1);
        serverNames.add(serverName);

        SSLParameters params = sslSocket.getSSLParameters();
        params.setServerNames(serverNames);
        sslSocket.setSSLParameters(params);
        // sslEngine.setSSLParameters(params);

```

###### Preferência de Cipher Suite

Durante o handshake TLS, o cliente solicita negociar uma cipher suite de uma lista de opções criptográficas que ele suporta, começando com sua primeira preferência. Em seguida, o servidor seleciona uma única cipher suite da lista de cipher suites solicitadas pelo cliente. A seleção honra a preferência do servidor por padrão, que é a configuração mais segura. No entanto, o servidor pode optar por honrar a preferência do cliente em vez de sua própria preferência, invocando o método SSLParameters.setUseCipherSuitesOrder(false).

##### Interface SSLSessionContext

A interface `javax.net.ssl.SSLSessionContext` é um agrupamento de objetos [SSLSession](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) associados a uma única entidade. Por exemplo, ela poderia ser associada a um servidor ou cliente que participa de muitas sessões concorrentemente. Os métodos nesta interface permitem a enumeração de todas as sessões em um contexto e permitem a busca de sessões específicas através de seus IDs de sessão.

Um `SSLSessionContext` pode ser opcionalmente obtido de um `SSLSession` chamando o método `getSessionContext()` de SSLSession. O contexto pode estar indisponível em alguns ambientes, caso em que o método `getSessionContext()` retorna null.

##### Interface SSLSessionBindingListener

A interface `javax.net.ssl.SSLSessionBindingListener` é implementada por objetos que são notificados quando estão sendo vinculados ou desvinculados de um [SSLSession](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

##### Classe SSLSessionBindingEvent

A classe `javax.net.ssl.SSLSessionBindingEvent` define o evento comunicado a um SSLSessionBindingListener (veja [Interface SSLSessionBindingListener](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)) quando ele é vinculado ou desvinculado de um SSLSession (veja [SSLSession e ExtendedSSLSession](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)).

##### Interface HandShakeCompletedListener

A interface `javax.net.ssl.HandShakeCompletedListener` é uma interface implementada por qualquer classe que é notificada da conclusão de um handshake de protocolo SSL em uma dada conexão `SSLSocket`.

##### Classe HandShakeCompletedEvent

A classe `javax.net.ssl.HandShakeCompletedEvent` define o evento comunicado a um HandShakeCompletedListener (veja [Interface HandShakeCompletedListener](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)) após a conclusão de um handshake de protocolo SSL em uma dada conexão `SSLSocket`.

##### Interface HostnameVerifier

Se a lógica padrão de verificação de nome de host da implementação SSL/TLS falhar, então a implementação chama o método `verify()` da classe que implementa esta interface e é atribuída a esta instância de `HttpsURLConnection`. Se a classe de callback puder determinar que o nome do host é aceitável dados os parâmetros, ela reporta que a conexão deve ser permitida. Uma resposta inaceitável faz com que a conexão seja encerrada. Veja [Exemplo 8-15](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

Veja [`HttpsURLConnection`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/HttpsURLConnection.html>) para mais informações sobre como atribuir o `HostnameVerifier` ao `HttpsURLConnection`.

Exemplo 8-15 Código de Exemplo para Implementar a Interface HostnameVerifier

O exemplo a seguir ilustra uma classe que implementa a interface `HostnameVerifier`:
```
        public class MyHostnameVerifier implements HostnameVerifier {

            public boolean verify(String hostname, SSLSession session) {
                // pop up an interactive dialog box
                // or insert additional matching logic
                if (good_address) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        //...deleted...

        HttpsURLConnection urlc = (HttpsURLConnection)
          (new URL("https://www.example.com/")).openConnection();
        urlc.setHostnameVerifier(new MyHostnameVerifier());

```

##### Classe X509Certificate

Muitos protocolos de socket seguro realizam autenticação usando certificados de chave pública, também chamados de certificados X.509. Este é o mecanismo de autenticação padrão para o protocolo TLS.

A classe abstrata `java.security.cert.X509Certificate` fornece uma maneira padrão de acessar os atributos de certificados X.509.

Nota:

A classe `javax.security.cert.X509Certificate` é suportada apenas para compatibilidade retroativa com versões anteriores (1.0.x e 1.1.x) do JSSE. Novas aplicações devem usar a classe `java.security.cert.X509Certificate` em vez disso.

##### Interface AlgorithmConstraints

A interface `java.security.AlgorithmConstraints` é usada para controlar algoritmos criptográficos permitidos. `AlgorithmConstraints` define três métodos `permits()`. Esses métodos informam se um nome de algoritmo ou uma chave é permitido para certas funções criptográficas. As funções criptográficas são representadas por um conjunto de `CryptoPrimitive`, que é uma enumeração contendo campos como `STREAM_CIPHER`, `MESSAGE_DIGEST` e `SIGNATURE`.

Assim, uma implementação de `AlgorithmConstraints` pode responder a perguntas como: Posso usar esta chave com este algoritmo para o propósito de uma operação criptográfica?

Um objeto `AlgorithmConstraints` pode ser associado a um objeto `SSLParameters` usando o novo método `setAlgorithmConstraints()`. O objeto `AlgorithmConstraints` atual para um objeto `SSLParameters` é recuperado usando o método `getAlgorithmConstraints()`.

##### Classe StandardConstants

A classe `StandardConstants` é usada para representar definições de constantes padrão no JSSE.

`StandardConstants.SNI_HOST_NAME` representa um nome de host de servidor de nome de domínio (DNS) em uma extensão [Server Name Indication (SNI)](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>), que pode ser usado ao instanciar um objeto `SNIServerName` ou `SNIMatcher`.

##### Classe SNIServerName

Uma instância da classe abstrata `SNIServerName` representa um nome de servidor na extensão [Server Name Indication (SNI)](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>). Ela é instanciada usando o tipo e o valor codificado do nome de servidor especificado.

Você pode usar os métodos `getType()` e `getEncoded()` para retornar o tipo de nome de servidor e uma cópia do valor codificado do nome de servidor, respectivamente. O método `equals()` pode ser usado para verificar se algum outro objeto é "igual" a este nome de servidor. O método `hashCode()` retorna um valor de hash code para este nome de servidor. Para obter uma representação em string do nome de servidor (incluindo o tipo de nome de servidor e o valor codificado do nome de servidor), use o método `toString()`.

##### Classe SNIMatcher

Uma instância da classe abstrata `SNIMatcher` realiza operações de correspondência em um objeto `SNIServerName`. Servidores podem usar informações da extensão [Server Name Indication (SNI)](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) para decidir se um `SSLSocket` ou `SSLEngine` específico deve aceitar uma conexão. Por exemplo, quando múltiplos servidores "virtuais" ou "baseados em nome" são hospedados em um único endereço de rede subjacente, a aplicação do servidor pode usar as informações SNI para determinar se este servidor é o servidor exato que o cliente deseja acessar. Instâncias desta classe podem ser usadas por um servidor para verificar os nomes de servidor aceitáveis de um tipo particular, como nomes de host.

A classe `SNIMatcher` é instanciada usando o tipo de nome de servidor especificado no qual as operações de correspondência serão realizadas. Para corresponder a um dado `SNIServerName`, use o método `matches()`. Para retornar o tipo de nome de servidor do objeto `SNIMatcher` dado, use o método `getType()`.

##### Classe SNIHostName

Uma instância da classe `SNIHostName` (que estende a classe `SNIServerName`) representa um nome de servidor do tipo "host_name" (veja [Classe StandardConstants](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)) na [Extensão Server Name Indication (SNI)](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>). Para instanciar um `SNIHostName`, especifique o nome de host DNS totalmente qualificado do servidor (conforme entendido pelo cliente) como um argumento `String`. O argumento é inválido nos seguintes casos:

  * O argumento está vazio.
  * O argumento termina com um ponto final.
  * O argumento não é um Internationalized Domain Name (IDN) válido em conformidade com a especificação RFC 3490.

Você também pode instanciar um `SNIHostName` especificando o valor do nome de host codificado como um array de bytes. Este método é tipicamente usado para analisar o valor do nome codificado em uma extensão SNI solicitada. Caso contrário, use o construtor `SNIHostName(String hostname)`. O argumento `encoded` é inválido nos seguintes casos:

  * O argumento está vazio.
  * O argumento termina com um ponto final.
  * O argumento não é um Internationalized Domain Name (IDN) válido em conformidade com a especificação RFC 3490.
  * O argumento não está codificado em UTF-8 ou US-ASCII.

Nota:

O array de bytes `encoded` passado como argumento é clonado para proteger contra modificações subsequentes.

Para retornar o nome de host de um objeto `SNIHostName` em codificação US-ASCII, use o método `getAsciiName()`. Para comparar um nome de servidor com outro objeto, use o método `equals()` (a comparação não diferencia maiúsculas de minúsculas). Para retornar um valor de hash code de um `SNIHostName`, use o método `hashCode()`. Para retornar uma representação em string de um `SNIHostName`, incluindo o nome de host DNS, use o método `toString()`.

Você pode criar um objeto `SNIMatcher` para um objeto `SNIHostName` passando uma expressão regular que representa um ou mais nomes de host para corresponder ao método `createSNIMatcher()`.

### Personalizando o JSSE

O JSSE inclui uma implementação padrão que pode ser personalizada conectando diferentes implementações ou especificando o keystore padrão, e assim por diante.

[Tabela 8-2](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) e [Tabela 8-3](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) resumem quais aspectos podem ser personalizados, quais são os padrões e quais mecanismos são usados para fornecer a personalização.

Algumas das personalizações são feitas definindo valores de propriedades de sistema ou de Propriedades de Segurança. As seções seguintes à tabela explicam como definir esses valores de propriedade.

Nota:

Muitas das propriedades mostradas nesta tabela são atualmente usadas pela implementação JSSE, mas não há garantia de que continuarão a ter os mesmos nomes e tipos (sistema ou segurança) ou mesmo que existirão em futuras versões. Todas essas propriedades são marcadas com um asterisco (*). Elas são documentadas aqui para sua conveniência para uso com a implementação JSSE.

[Tabela 8-2](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) mostra os itens que são personalizados definindo a propriedade `java.security.Security`. Veja [Como Especificar uma Propriedade java.security.Security](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)

Tabela 8-2 Propriedades de Segurança e Itens Personalizados

Propriedade de Segurança | Item Personalizado | Valor Padrão | Notas
---|---|---|---
`cert.provider.x509v1` | [Personalizando a Implementação X509Certificate](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | Implementação X509Certificate da Oracle | Nenhuma
[Algoritmos de criptografia JCE usados pelo provedor SunJSSE](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | Dê aos provedores de algoritmo JCE alternativos uma ordem de preferência maior do que o provedor SunJCE | Implementações SunJCE | Nenhuma
`jdk.certpath.disabledAlgorithms`* | Algoritmos criptográficos de verificação de certificado desabilitados (veja [Algoritmos Criptográficos Desabilitados e Restritos](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)) | MD2, MD5, SHA1 jdkCA & usage TLSServer, RSA keySize < 1024, DSA keySize < 1024, EC keySize < 224, SHA1 usage SignedJAR & denyAfter 2019-01-01Foot 2 | Nenhuma
`jdk.crypto.disabledAlgorithms`* | [Algoritmos Criptográficos Desabilitados e Restritos](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | Nenhuma | Você pode substituir o valor desta Propriedade de Segurança definindo o valor da propriedade de sistema de mesmo nome. Isso permite que você reative algoritmos para aplicações que os exigem.
`jdk.tls.disabledAlgorithms`* | [Algoritmos Criptográficos Desabilitados e Restritos](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | SSLv3, TLSv1, TLSv1.1, DTLSv1.0, RC4, DES, MD5withRSA, DH keySize < 1024, EC keySize < 224, 3DES_EDE_CBC, anon, NULL, ECDH, TLS_RSA_*, rsa_pkcs1_sha1 usage HandshakeSignature, ecdsa_sha1 usage HandshakeSignature, dsa_sha1 usage HandshakeSignatureFoot 2 | Desabilita algoritmos específicos (versões de protocolos, cipher suites, mecanismos de troca de chaves, etc.) que não serão negociados para conexões TLS/DTLS, mesmo que estejam explicitamente habilitados em uma aplicação
`jdk.tls.keyLimits`* | [Limitando a Quantidade de Dados que Algoritmos Podem Criptografar com um Conjunto de Chaves](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | AES/GCM/NoPadding KeyUpdate 2^37, ChaCha20-Poly1305 KeyUpdate 2^3 | Limita a quantidade de dados que um algoritmo pode criptografar com um conjunto específico de chaves; uma vez atingido este limite, uma mensagem KeyUpdate pós-handshake é enviada, que solicita que o conjunto atual de chaves seja atualizado.
`jdk.tls.legacyAlgorithms`* | [Algoritmos Criptográficos Legados](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | NULL, anon, RC4, DES, 3DES_EDE_CBCFoot 2 | Especifica quais algoritmos são considerados algoritmos legados, que não são negociados durante a negociação de parâmetros de segurança TLS/DTLS, a menos que não haja outros candidatos.
`jdk.tls.server.defaultDHEParameters` | Grupos Diffie-Hellman | Grupos Diffie-Hellman de primos seguros na implementação OpenJDK TLS/DTLS | Define parâmetros efêmeros (DHE) Diffie-Hellman de campo finito padrão para processamento de (Datagram) Transport Layer Security ((D)TLS)
`ocsp.enable`* | [OCSP Orientado ao Cliente e OCSP Stapling](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | `false` | Habilita o Online Certificate Status Protocol (OCSP) orientado ao cliente. Você também deve habilitar a verificação de revogação; veja [Configurando um Cliente Java para usar OCSP Orientado ao Cliente](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).
`security.provider.n` | Provedor de serviço criptográfico; veja [Personalizando a Implementação do Provedor](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) e [Personalizando os Provedores de Algoritmos de Criptografia](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | Os cinco primeiros provedores em ordem de prioridade são:

  1. SUN
  2. SunRsaSign
  3. SunEC
  4. SunJSSE
  5. SunJCE

| Especifique o provedor na linha `security.provider.n=` no arquivo de propriedades de segurança, onde `n` é um inteiro cujo valor é igual ou maior que 1.
`ssl.KeyManagerFactory.algorithm` | Nome do algoritmo padrão da fábrica de key manager (veja [Personalizando os Key Managers e Trust Managers Padrão](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)) | SunX509 | Nenhuma
`ssl.ServerSocketFactory.provider`* | Implementação padrão de `SSLServerSocketFactory` | Implementação de `SSLServerSocketFactory` da Oracle | Nenhuma
`ssl.SocketFactory.provider`* | Implementação padrão de `SSLSocketFactory` | Implementação de `SSLSocketFactory` da Oracle | Nenhuma
`ssl.TrustManagerFactory.algorithm` | Nome do algoritmo padrão da fábrica de trust manager (veja [Personalizando os Key Managers e Trust Managers Padrão](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)) | PKIX | Nenhuma

Nota de rodapé 2 A lista de algoritmos restritos, desabilitados e legados especificados nestas Propriedades de Segurança pode mudar; consulte o arquivo `java.security` em sua instalação do JDK para os valores mais recentes.

* Esta Propriedade de Segurança é atualmente usada pela implementação JSSE, mas não há garantia de que será examinada e usada por outras implementações. Se for examinada por outra implementação, então essa implementação deve tratá-la da mesma maneira que a implementação JSSE. Não há garantia de que a propriedade continuará a existir ou será do mesmo tipo (sistema ou segurança) em futuras versões.

[Tabela 8-3](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) mostra os itens que são personalizados definindo a propriedade `java.lang.System`. Veja [Como Especificar uma Propriedade java.lang.System](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

Tabela 8-3 Propriedades de Sistema e Itens Personalizados

Propriedade de Sistema | Item Personalizado | Padrão | Notas
---|---|---|---
`com.sun.net.ssl.checkRevocation`* | Verificação de revogação | `false` | Você deve habilitar a verificação de revogação para habilitar o OCSP orientado ao cliente; veja [OCSP Orientado ao Cliente e OCSP Stapling](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).
Personalizar via campo `port` na URL HTTPS.* | Porta HTTPS padrão | `443` | Nenhuma
`https.cipherSuites`* | Cipher suites padrão para conexões HTTPS | Determinado pela fábrica de sockets. | Contém uma lista de nomes de cipher suites separada por vírgulas, especificando quais cipher suites habilitar para uso nesta `HttpsURLConnection`. Veja o método [`SSLSocket.setEnabledCipherSuites(String[])`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLSocket.html#setEnabledCipherSuites\(java.lang.String\[\]\)>). Observe que este método define a ordem de preferência das cipher suites do ClientHello diretamente do array de String passado a ele.
`https.protocols`* | Protocolos de handshake padrão para conexões HTTPS | Determinado pela fábrica de sockets. | Contém uma lista de nomes de suites de protocolo separada por vírgulas, especificando quais suites de protocolo habilitar nesta `HttpsURLConnection`. Veja [`SSLSocket.setEnabledProtocols(String[])`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLSocket.html#setEnabledCipherSuites\(java.lang.String\[\]\)>)
`https.proxyHost`* | Host proxy padrão | Nenhuma | Nenhuma
`https.proxyPort`* | Porta proxy padrão | `80` | Nenhuma
`java.protocol.handler.pkgs` | [Especificando uma Implementação Alternativa de Protocolo HTTPS](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | Implementação da Oracle | Nenhuma
`javax.net.ssl.keyStore`* | Keystore padrão; veja [Personalizando os Keystores e Truststores Padrão, Tipos de Armazenamento e Senhas de Armazenamento](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | Nenhuma | O valor `NONE` pode ser especificado. Esta configuração é apropriada se o keystore não for baseado em arquivo (por exemplo, reside em um token de hardware)
`javax.net.ssl.keyStorePassword`* | Senha do keystore padrão; veja [Personalizando os Keystores e Truststores Padrão, Tipos de Armazenamento e Senhas de Armazenamento](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | Nenhuma | Não é aconselhável especificar a senha de uma forma que a exponha à descoberta por outros usuários. Por exemplo, especificando a senha na linha de comando. Para manter a senha segura, faça com que a aplicação solicite a senha, ou especifique a senha em um arquivo de opções devidamente protegido
`javax.net.ssl.keyStoreProvider`* | Provedor de keystore padrão; veja [Personalizando os Keystores e Truststores Padrão, Tipos de Armazenamento e Senhas de Armazenamento](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | Nenhuma | Nenhuma
`javax.net.ssl.keyStoreType`* | Tipo de keystore padrão; veja [Personalizando os Keystores e Truststores Padrão, Tipos de Armazenamento e Senhas de Armazenamento](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | `KeyStore.getDefaultType()` | Nenhuma
`javax.net.ssl.sessionCacheSize` | Valor padrão para o número máximo de entradas no cache de sessão SSL | `20480` | O tamanho do cache de sessão pode ser definido chamando o método `SSLSessionContext.setSessionCacheSize` ou definindo a propriedade de sistema `javax.net.ssl.sessionCachSize`. Se o tamanho do cache não for definido, o valor padrão é usado.
`javax.net.ssl.trustStore`* | Truststore padrão; veja [Personalizando os Keystores e Truststores Padrão, Tipos de Armazenamento e Senhas de Armazenamento](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | `jssecacerts`, se existir. Caso contrário, `cacerts` | O valor `NONE` pode ser especificado. Esta configuração é apropriada se o truststore não for baseado em arquivo (por exemplo, reside em um token de hardware).
`javax.net.ssl.trustStorePassword`* | Senha do truststore padrão; veja [Personalizando os Keystores e Truststores Padrão, Tipos de Armazenamento e Senhas de Armazenamento](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | Nenhuma | Não é aconselhável especificar a senha de uma forma que a exponha à descoberta por outros usuários. Por exemplo, especificando a senha na linha de comando. Para manter a senha segura, faça com que a aplicação solicite a senha, ou especifique a senha em um arquivo de opções devidamente protegido
`javax.net.ssl.trustStoreProvider`* | Provedor de truststore padrão; veja [Personalizando os Keystores e Truststores Padrão, Tipos de Armazenamento e Senhas de Armazenamento](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | Nenhuma | Nenhuma
`javax.net.ssl.trustStoreType`* | Tipo de truststore padrão; veja [Personalizando os Keystores e Truststores Padrão, Tipos de Armazenamento e Senhas de Armazenamento](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | KeyStore.getDefaultType() | Nenhuma
`jdk.crypto.disabledAlgorithms`* | [Algoritmos Criptográficos Desabilitados e Restritos](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | Nenhuma | Você pode substituir o valor da Propriedade de Segurança `jdk.crypto.disabledAlgorithms` definindo o valor desta propriedade de sistema. Isso permite que você reative algoritmos para aplicações que os exigem.
`jdk.tls.acknowledgeCloseNotify`* | [Especificando Que o Alerta `close_notify` É Enviado Quando Um É Recebido](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | `false` | Se `true`, então quando o cliente ou servidor recebe um alerta `close_notify`, ele envia um alerta `close_notify` correspondente e a conexão é fechada em duplex.
`jdk.tls.allowUnsafeServerCertChange`* | Define se a alteração insegura de certificado de servidor em uma renegociação SSL/TLS deve ser restrita ou não; veja [Permitir Alteração Insegura de Certificado de Servidor em Renegociações SSL/TLS](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | `false` | Cuidado: Não defina esta propriedade de sistema como `true` a menos que seja realmente necessário, pois isso restabeleceria a vulnerabilidade de alteração insegura de certificado de servidor.
`jdk.tls.client.cipherSuites`* | Conjuntos de cifras padrão habilitados no lado do cliente; veja [Especificando Conjuntos de Cifras Padrão Habilitados](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | Veja [Conjuntos de Cifras SunJSSE](<#/doc/guides/security/oracle-providers>) para uma lista dos conjuntos de cifras SunJSSE atualmente implementados para esta versão do JDK, ordenados por preferência | Cuidado: Estas propriedades de sistema podem ser usadas para configurar conjuntos de cifras fracos, ou os conjuntos de cifras configurados podem se tornar fracos no futuro. Não é recomendado usar estas propriedades de sistema sem compreender os riscos.
`jdk.tls.client.disableExtensions`* | [Configurando Extensões Padrão](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | Nenhum | Bloqueia extensões usadas no lado do cliente.
`jdk.tls.client.enableCAExtension`* | [Habilitando a Extensão `certificate_authorities` para Seleção de Certificado de Servidor](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | `false` | Se o cliente ou servidor confiar em mais CAs de modo que exceda o limite de tamanho da extensão (menos de 2^16 bytes), então a extensão não será habilitada. Além disso, algumas implementações de servidor não permitem que mensagens de handshake excedam 2^14 bytes. Assim, pode haver problemas de interoperabilidade se `jdk.tls.client.enableCAExtension` for definido como `true` e o cliente confiar em mais CAs de modo que exceda o limite da implementação do servidor.
`jdk.tls.client.enableSessionTicketExtension`* | [Retomando a Sessão Sem Estado no Lado do Servidor](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | `true` | Se `true`, o cliente enviará uma extensão de ticket de sessão no `ClientHello` para TLS 1.2 e anteriores. Esta extensão permite que o cliente aceite o estado de sessão do servidor para retomada de sessão TLS sem estado no lado do servidor (RFC 5077).
`jdk.tls.client.maxInboundCertificateChainLength`* | [Definindo o Comprimento Máximo da Cadeia de Certificados Aceita do Cliente ou Servidor Durante o Handshaking TLS/DTLS](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | Nenhum | Se você definir a propriedade de sistema `jdk.tls.client.maxInboundCertificateChainLength` para um valor igual ou maior que 0, então este valor será o comprimento máximo de uma cadeia de certificados de servidor aceita por um cliente. Caso contrário, se você tiver definido a propriedade de sistema `jdk.tls.maxCertificateChainLength` para um valor igual ou maior que 0, então este valor será o comprimento máximo da cadeia de certificados de servidor. Se você não tiver definido nenhuma das propriedades, então o valor padrão 10 será o comprimento máximo da cadeia de certificados de servidor.
`jdk.tls.client.protocols`* | Protocolos de handshaking padrão para clientes TLS/DTLS. Veja [O Provedor SunJSSE](<#/doc/guides/security/oracle-providers>) | Nenhum | Para habilitar protocolos `SunJSSE` específicos no cliente, especifique-os em uma lista separada por vírgulas entre aspas; todos os outros protocolos suportados não são habilitados no cliente. Por exemplo, * Se `jdk.tls.client.protocols=`"TLSv1,TLSv1.1"`, então as configurações de protocolo padrão no cliente para TLSv1 e TLSv1.1 são habilitadas, enquanto SSLv3, TLSv1.2, TLSv1.3 e SSLv2Hello não são habilitados * Se `jdk.tls.client.protocols="DTLSv1.2"`, então a configuração de protocolo no cliente para DTLS1.2 é habilitada, enquanto DTLS1.0 não é habilitado.
`jdk.tls.client.SignatureSchemes`* | [Especificando Esquemas de Assinatura Que Podem Ser Usados sobre os Protocolos TLS/DTLS](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>). | Se esta propriedade de sistema não for definida ou o valor estiver vazio, então os esquemas de assinatura e preferências padrão da implementação serão usados. | Isso contém uma lista separada por vírgulas de nomes de esquemas de assinatura suportados que especifica os esquemas de assinatura que poderiam ser usados para conexões TLS no lado do cliente. Por exemplo: `jdk.tls.client.SignatureSchemes="ecdsa_secp521r1_sha512,rsa_pkcs1_sha512,rsa_pss_pss_sha512"` Nomes de esquemas de assinatura não reconhecidos ou não suportados especificados na propriedade são ignorados. Os nomes não diferenciam maiúsculas de minúsculas. Para uma lista de nomes de esquemas de assinatura, veja a seção [Signature Schemes](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html#signature-schemes>) na Especificação de Nomes de Algoritmos Padrão de Segurança Java.
`jdk.tls.ephemeralDHKeySize`* | [Personalizando o Tamanho das Chaves Ephemeral Diffie-Hellman](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | 2048 bits | Nenhum
`jdk.tls.maxCertificateChainLength`* | [Definindo o Comprimento Máximo da Cadeia de Certificados Aceita do Cliente ou Servidor Durante o Handshaking TLS/DTLS](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | * 8: Comprimento máximo da cadeia de certificados do cliente aceita por um servidor * 10: Comprimento máximo da cadeia de certificados do servidor aceita por um cliente | Especifica o comprimento máximo permitido da cadeia de certificados no handshaking TLS/DTLS. Um serviço pode funcionar tanto como servidor quanto como cliente TLS/DTLS. Quando o serviço atua como servidor, ele impõe um comprimento máximo da cadeia de certificados aceita dos clientes. Quando o serviço atua como cliente, ele impõe um comprimento máximo da cadeia de certificados aceita dos servidores. Se a propriedade de sistema `jdk.tls.server.maxInboundCertificateChainLength` ou `jdk.tls.client.maxInboundCertificateChainLength` for definida para um valor igual ou maior que 0, então este valor substituirá o valor de `jdk.tls.maxCertificateChainLength`.
`jdk.tls.maxHandshakeMessageSize`* | [Definindo o Comprimento Máximo da Cadeia de Certificados Aceita do Cliente ou Servidor Durante o Handshaking TLS/DTLS](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | 32768 (32 kilobytes) | Especifica o tamanho máximo permitido, em bytes, para a mensagem de handshake no handshaking TLS/DTLS.
`jdk.tls.namedGroups`* | [Personalizando os Grupos Nomeados Suportados para Troca de Chaves TLS/DTLS](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | Se esta propriedade de sistema não for definida ou o valor estiver vazio, então os grupos e preferências padrão da implementação serão usados. | Isso contém uma lista separada por vírgulas, entre aspas, de grupos nomeados habilitados em ordem de preferência. Por exemplo: `jdk.tls.namedGroups=“X25519MLKEM768,secp521r1,secp256r1,ffdhe2048"` A lista padrão de grupos nomeados de troca de chaves é definida na seção [Named Groups](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html#named-groups>) da Especificação de Nomes de Algoritmos Padrão de Segurança Java.
`jdk.tls.rejectClientInitiatedRenegotiation`* | Rejeita a renegociação iniciada pelo cliente no lado do servidor. Se esta propriedade de sistema for `true`, então o servidor não aceitará renegociações iniciadas pelo cliente e falhará com um alerta fatal de `handshake_failure`. Rejeita a renegociação iniciada pelo cliente no lado do servidor. | `false` | Nenhum
`jdk.tls.server.cipherSuites`* | Conjuntos de cifras padrão habilitados no lado do servidor. Veja [Especificando Conjuntos de Cifras Padrão Habilitados](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | Veja [Conjuntos de Cifras SunJSSE](<#/doc/guides/security/oracle-providers>) para determinar quais conjuntos de cifras são habilitados por padrão | Cuidado: Estas propriedades de sistema podem ser usadas para configurar conjuntos de cifras fracos, ou os conjuntos de cifras configurados podem se tornar fracos no futuro. Não é recomendado usar estas propriedades de sistema sem compreender os riscos.
`jdk.tls.server.disableExtensions`* | [Configurando Extensões Padrão](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | Nenhum | Bloqueia extensões usadas no lado do servidor.
`jdk.tls.server.enableSessionTicketExtension`* | [Retomando a Sessão Sem Estado no Lado do Servidor](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | `true` | Se `true`, o servidor fornecerá tickets de sessão sem estado, se o cliente suportar, conforme descrito na RFC 5077 (Retomada de Sessão TLS Sem Estado no Lado do Servidor) para TLS 1.2 e anteriores e RFC 8446 para TLS 1.3. Um ticket de sessão sem estado contém o estado criptografado do servidor, o que economiza recursos do servidor.
`jdk.tls.server.maxInboundCertificateChainLength`* | [Definindo o Comprimento Máximo da Cadeia de Certificados Aceita do Cliente ou Servidor Durante o Handshaking TLS/DTLS](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | Nenhum | Se você definir a propriedade de sistema `jdk.tls.server.maxInboundCertificateChainLength` para um valor igual ou maior que 0, então este valor será o comprimento máximo de uma cadeia de certificados de cliente aceita por um servidor. Caso contrário, se você tiver definido a propriedade de sistema `jdk.tls.maxCertificateChainLength` para um valor igual ou maior que 0, então este valor será o comprimento máximo da cadeia de certificados de cliente. Se você não tiver definido nenhuma das propriedades, então o valor padrão 8 será o comprimento máximo da cadeia de certificados de cliente.
`jdk.tls.server.newSessionTicket`* | Especifica o número de tickets de retomada TLSv1.3 enviados por um servidor JSSE por sessão. | `1` | O valor desta propriedade é um número inteiro entre 0 e 10.
`jdk.tls.server.protocols`* | Protocolos de handshaking padrão para servidores TLS/DTLS. Veja [O Provedor SunJSSE](<#/doc/guides/security/oracle-providers>) | Nenhum | Para configurar o conjunto de protocolos padrão habilitado no lado do servidor de um provedor SunJSSE, especifique os protocolos em uma lista separada por vírgulas entre aspas. Os protocolos nesta lista são nomes de protocolo SSL padrão, conforme descrito em [Java Security Standard Algorithm Names](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html>). Observe que esta Propriedade de Sistema afeta apenas o conjunto de protocolos padrão (`SSLContext` dos algoritmos SSL, TLS e DTLS). Se uma aplicação usar um `SSLContext` específico da versão (SSLv3, TLSv1, TLSv1.1, TLSv1.2, TLSv1.3, DTLSv1.0 ou DTLSv1.2), ou definir explicitamente a versão do protocolo habilitado, esta Propriedade de Sistema não terá impacto.
`jdk.tls.server.sessionTicketTimeout`* | Especifica por quanto tempo uma sessão no cache do servidor ou tickets de retomada sem estado estão disponíveis para uso | 86400 segundos (24 horas) | Você pode modificar o valor definido com esta propriedade durante o tempo de execução com o método `SSLSessionContext.setSessionTimeout()`.
`jdk.tls.server.SignatureSchemes`* | [Especificando Esquemas de Assinatura Que Podem Ser Usados sobre os Protocolos TLS/DTLS](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>). | Se esta propriedade de sistema não for definida ou estiver vazia, então o padrão específico do provedor é usado. | Esta é uma lista separada por vírgulas de nomes de esquemas de assinatura suportados que especifica os esquemas de assinatura que poderiam ser usados para conexões TLS no lado do servidor. Por exemplo: `jdk.tls.server.SignatureSchemes="ecdsa_secp521r1_sha512,rsa_pkcs1_sha512,rsa_pss_pss_sha512"` Nomes de esquemas de assinatura não reconhecidos ou não suportados especificados na propriedade são ignorados. Os nomes não diferenciam maiúsculas de minúsculas. Para uma lista de nomes de esquemas de assinatura, veja a seção [Signature Schemes](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html#signature-schemes>) na Especificação de Nomes de Algoritmos Padrão de Segurança Java.
`jsse.enableFFDHE`* | Habilita ou desabilita parâmetros Finite Field Diffie-Hellman Ephemeral (FFDHE) para troca de chaves TLS/DTLS | `true` | FFDHE é uma extensão TLS/DTLS definida na [RFC 7919](<https://tools.ietf.org/html/rfc7919>). Ela permite que conexões TLS/DTLS usem grupos Diffie-Hellman de campo finito conhecidos. Alguns fornecedores TLS muito antigos podem não ser capazes de lidar com extensões TLS. Neste caso, defina esta propriedade como `false` para desabilitar a extensão FFDHE.
`jsse.enableMFLNExtension`* | [Personalizando a Extensão de Negociação de Comprimento Máximo de Fragmento (MFLN)](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | `false` | Nenhum
`jsse.enableSNIExtension`* | Opção Server Name Indication | `true` | Server Name Indication (SNI) é uma extensão TLS, definida na [RFC 6066](<https://tools.ietf.org/html/rfc6066>). Ela permite conexões TLS a servidores virtuais, nos quais múltiplos servidores para diferentes nomes de rede são hospedados em um único endereço de rede subjacente. Alguns fornecedores TLS muito antigos podem não ser capazes de lidar com extensões TLS. Neste caso, defina esta propriedade como `false` para desabilitar a extensão SNI.
`jsse.SSLEngine.acceptLargeFragments`* | Buffers de dimensionamento padrão para pacotes TLS grandes | Nenhum | Definindo esta propriedade de sistema como `true`, `SSLSession` dimensionará os buffers para lidar com [grandes pacotes de dados](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) por padrão. Isso pode fazer com que as aplicações aloquem buffers `SSLEngine` desnecessariamente grandes. Em vez disso, as aplicações devem [verificar dinamicamente as condições de estouro de buffer](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) e redimensionar os buffers conforme apropriado.
`sun.security.ssl.allowLegacyHelloMessages`* | Permite mensagens Hello legadas; veja [Modos de Interoperabilidade de Renegociação SunJSSE](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | `true` | Definir esta propriedade de sistema como `true` permite que o par realize o handshake sem exigir as mensagens RFC 5746 apropriadas. Esta propriedade de sistema está obsoleta e pode ser removida em uma futura versão do JDK.
`sun.security.ssl.allowUnsafeRenegotiation`* | Permite renegociações SSL/TLS inseguras; veja [Modos de Interoperabilidade de Renegociação SunJSSE](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) | `false` | Definir esta propriedade de sistema como `true` permite a renegociação legada completa (insegura). Esta propriedade de sistema está obsoleta e pode ser removida em uma futura versão do JDK.

* Esta propriedade de sistema é atualmente usada pela implementação JSSE, mas não há garantia de que será examinada e usada por outras implementações. Se for examinada por outra implementação, então essa implementação deve tratá-la da mesma maneira que a implementação JSSE. Não há garantia de que a propriedade continuará a existir ou será do mesmo tipo (de sistema ou de segurança) em futuras versões.

#### Como Especificar uma Propriedade `java.lang.System`

Você pode personalizar alguns aspectos do JSSE definindo propriedades de sistema. Existem várias maneiras de definir essas propriedades:

*   Para definir uma propriedade de sistema estaticamente, use a opção `-D` do comando `java`. Por exemplo, para executar uma aplicação chamada `MyApp` e definir a propriedade de sistema `javax.net.ssl.trustStore` para especificar um truststore chamado `MyCacertsFile`. Veja [truststore](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>). Digite o seguinte:
```
java -Djavax.net.ssl.trustStore=MyCacertsFile MyApp
```

*   Para definir uma propriedade de sistema dinamicamente, chame o método `java.lang.System.setProperty()` em seu código:
```
System.setProperty("propertyName", "propertyValue");
```

Por exemplo, uma chamada `setProperty()` correspondente ao exemplo anterior para definir a propriedade de sistema `javax.net.ssl.trustStore` para especificar um truststore chamado "`MyCacertsFile`" seria:
```
System.setProperty("javax.net.ssl.trustStore", "MyCacertsFile");
```

#### Como Especificar uma Propriedade `java.security.Security`

Você pode personalizar alguns aspectos do JSSE definindo Propriedades de Segurança. Você pode definir uma Propriedade de Segurança estaticamente ou dinamicamente:

*   Para definir uma Propriedade de Segurança estaticamente, adicione uma linha ao arquivo de propriedades de segurança. O arquivo de propriedades de segurança está localizado em `java-home/conf/security/java.security`

`java-home`
    Veja [Termos e Definições](<#/doc/guides/security/terms-definitions>)

Para especificar um valor de Propriedade de Segurança no arquivo de propriedades de segurança, adicione uma linha do seguinte formato:
```
propertyName=propertyValue
```

Por exemplo, suponha que você queira especificar um nome de algoritmo de fábrica de gerenciador de chaves diferente do padrão `SunX509`. Você faz isso especificando o nome do algoritmo como o valor de uma Propriedade de Segurança chamada `ssl.KeyManagerFactory.algorithm`. Por exemplo, para definir o valor como `MyKeyFactoryAlgorithm`, adicione a seguinte linha ao arquivo de propriedades de segurança:
```
ssl.KeyManagerFactory.algorithm=MyKeyFactoryAlgorithm
```

Nota:

As propriedades no arquivo `java.security` são tipicamente analisadas apenas uma vez. Se você modificou alguma propriedade neste arquivo, reinicie suas aplicações para garantir que as alterações sejam refletidas corretamente.

*   Para definir uma Propriedade de Segurança dinamicamente, chame o método `java.security.Security.setProperty` em seu código:
```
Security.setProperty("propertyName," "propertyValue");
```

Por exemplo, uma chamada ao método `setProperty()` correspondente ao exemplo anterior para especificar o nome do algoritmo da fábrica de gerenciador de chaves seria:
```
Security.setProperty("ssl.KeyManagerFactory.algorithm", "MyX509");
```

#### Personalizando a Implementação `X509Certificate`

A implementação `X509Certificate` retornada pelo método `X509Certificate.getInstance()` é por padrão a implementação da implementação JSSE.

Para fazer com que uma implementação diferente seja retornada:

Especifique o nome (e pacote) da classe da outra implementação como o valor de uma [Como Especificar uma Propriedade `java.security.Security`](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) chamada `cert.provider.x509v1`.

Por exemplo, se a classe for chamada `MyX509CertificateImpl` e aparecer no pacote `com.cryptox`, então você deve adicionar a seguinte linha ao arquivo de propriedades de segurança:
```
cert.provider.x509v1=com.cryptox.MyX509CertificateImpl
```

#### Especificando Conjuntos de Cifras Padrão Habilitados

Você pode especificar os conjuntos de cifras padrão habilitados em sua aplicação ou com as propriedades de sistema `jdk.tls.client.cipherSuites` e `jdk.tls.server.cipherSuites`.

Nota:

O uso real de conjuntos de cifras habilitados é restrito por restrições de algoritmo.

O conjunto de conjuntos de cifras a serem habilitados por padrão é determinado por uma das seguintes maneiras, nesta ordem de preferência:

*   Definido explicitamente pela aplicação
*   Especificado por propriedade de sistema
*   Especificado pelos padrões do provedor JSSE

Por exemplo, definir explicitamente os conjuntos de cifras padrão habilitados em sua aplicação substitui as configurações especificadas em `jdk.tls.client.cipherSuites` ou `jdk.tls.server.cipherSuites`, bem como os padrões do provedor JSSE.

Definido Explicitamente pela Aplicação

Você pode definir quais conjuntos de cifras são habilitados com um dos seguintes métodos:

*   [SSLSocket.setEnabledCipherSuites(String[])](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLSocket.html#setEnabledCipherSuites\(java.lang.String\[\]\)>)
*   [SSLEngine.setEnabledCipherSuites(String[])](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLEngine.html#setEnabledCipherSuites\(java.lang.String\[\]\)>)
*   [SSLServerSocket.setEnabledCipherSuites(String[])](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLServerSocket.html#setEnabledCipherSuites\(java.lang.String\[\]\)>)
*   [SSLParameters(String[] cipherSuites)](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLParameters.html#%3Cinit%3E\(java.lang.String%5B%5D\)>)
*   [SSLParameters(String[] cipherSuites, String[] protocols)](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLParameters.html#%3Cinit%3E\(java.lang.String%5B%5D,java.lang.String%5B%5D\)>)
*   [SSLParameters.setCipherSuites(String[])](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLParameters.html#setCipherSuites\(java.lang.String%5B%5D\)>)
*   Propriedade de sistema `https.cipherSuites` para [HttpsURLConnection](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/HttpsURLConnection.html>)

Especificado por Propriedade de Sistema

A propriedade de sistema `jdk.tls.client.cipherSuites` especifica os conjuntos de cifras padrão habilitados no lado do cliente; `jdk.tls.server.cipherSuites` especifica aqueles no lado do servidor.

A sintaxe do valor dessas duas propriedades de sistema é uma lista separada por vírgulas de nomes de conjuntos de cifras suportados. Nomes de conjuntos de cifras não reconhecidos ou não suportados que são especificados nessas propriedades são ignorados. Veja [Java Security Standard Algorithms](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html>) para nomes de conjuntos de cifras JSSE padrão.

Nota:

Estas propriedades de sistema são atualmente suportadas pelo Oracle JDK e OpenJDK. Não há garantia de que serão suportadas por outras implementações JDK.

Cuidado:

Estas propriedades de sistema podem ser usadas para configurar conjuntos de cifras fracos, ou os conjuntos de cifras configurados podem se tornar fracos no futuro. Não é recomendado usar estas propriedades de sistema sem compreender os riscos.

Especificado pelos Padrões do Provedor JSSE

Cada provedor JSSE tem seus próprios conjuntos de cifras padrão habilitados. Veja [O Provedor SunJSSE](<#/doc/guides/security/oracle-providers>) na [Documentação dos Provedores JDK](<#/doc/guides/security/oracle-providers>) para os nomes dos conjuntos de cifras suportados pelo provedor SunJSSE e quais são habilitados por padrão.

#### Especificando uma Implementação Alternativa de Protocolo HTTPS

Você pode se comunicar de forma segura com um servidor web habilitado para SSL usando o esquema de URL HTTPS para a classe `java.net.URL`. O JDK fornece uma implementação de URL HTTPS padrão.

Se você deseja que uma implementação alternativa de protocolo HTTPS seja usada, defina a propriedade `java.protocol.handler.pkgs` [Como Especificar uma Propriedade `java.lang.System`](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) para incluir o novo nome da classe. Esta ação faz com que as classes especificadas sejam encontradas e carregadas antes das classes padrão do JDK. Veja a classe [URL](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/net/URL.html>) para detalhes.

#### Personalizando a Implementação do Provedor

O JDK vem com um Provedor de Serviço Criptográfico JSSE, ou provedor para abreviar, chamado SunJSSE. Provedores são essencialmente pacotes que implementam uma ou mais classes de motor para algoritmos criptográficos específicos.

As classes de motor JSSE são `SSLContext`, `KeyManagerFactory` e `TrustManagerFactory`. Veja o [Guia de Referência da Arquitetura de Criptografia Java (JCA)](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide> "A Arquitetura de Criptografia Java \(JCA\) é uma parte importante da plataforma, e contém uma arquitetura de "provedor" e um conjunto de APIs para assinaturas digitais, resumos de mensagens \(hashes\), certificados e validação de certificados, criptografia \(cifras de bloco/fluxo simétricas/assimétricas\), geração e gerenciamento de chaves, e geração segura de números aleatórios, para citar alguns.") para saber mais sobre provedores e classes de motor.

Antes de poder ser usado, um provedor deve ser registrado, seja estaticamente ou dinamicamente. Você não precisa registrar o provedor SunJSSE porque ele já está pré-registrado. Se você quiser usar outros provedores, leia as seções a seguir para ver como registrá-los.

#### Registrando o Provedor Criptográfico Estaticamente

Registre um provedor estaticamente adicionando uma linha do seguinte formato ao arquivo de propriedades de segurança, `<java-home>/conf/security/java.security`:
```
security.provider.n=provName|className
```

Isso declara um provedor e especifica sua ordem de preferência `n`. A ordem de preferência é a ordem em que os provedores são pesquisados por algoritmos solicitados quando nenhum provedor específico é solicitado. A ordem é baseada em 1; 1 é o mais preferido, seguido por 2, e assim por diante.

`provName` é o nome do provedor e `className` é o nome de classe totalmente qualificado do provedor.

Provedores de segurança padrão são automaticamente registrados para você no arquivo de propriedades de segurança `java.security`.

Para usar outro provedor JSSE, adicione uma linha registrando o outro provedor, dando-lhe a ordem de preferência que você preferir.
Você pode ter mais de um provedor JSSE registrado ao mesmo tempo. Os provedores registrados podem incluir diferentes implementações para diferentes algoritmos para diferentes classes de engine, ou podem ter suporte para alguns ou todos os mesmos tipos de algoritmos e classes de engine. Quando uma implementação de classe de engine particular para um algoritmo particular é procurada, se nenhum provedor específico for especificado para a busca, então os provedores são procurados em ordem de preferência e a implementação do primeiro provedor que fornece uma implementação para o algoritmo especificado é usada.

Veja [Passo 8.1: Configurar o Provedor](<#/doc/guides/security/howtoimplaprovider>) em [Passos para Implementar e Integrar um Provedor](<#/doc/guides/security/howtoimplaprovider>).

#### Registrando o Provedor de Serviço Criptográfico Dinamicamente

Em vez de registrar um provedor estaticamente, você pode adicionar o provedor dinamicamente em tempo de execução chamando o método `addProvider` ou `insertProviderAt` na classe `Security`.

Veja [Passo 8.1: Configurar o Provedor](<#/doc/guides/security/howtoimplaprovider>) em [Passos para Implementar e Integrar um Provedor](<#/doc/guides/security/howtoimplaprovider>).

#### Configuração do Provedor

Alguns provedores podem exigir configuração. Isso é feito usando o método `configure` da classe `Provider`, antes de chamar o método `addProvider` da classe `Security`. Veja [Configuração SunPKCS11](<#/doc/guides/security/pkcs11-reference-guide1>) para um exemplo. O método `Provider.configure()` é novo no Java SE 9.

#### Configurando o Provedor Preferencial para Algoritmos Específicos

Especifique o provedor preferencial para um algoritmo específico na Propriedade de Segurança `jdk.security.provider.preferred`. Ao especificar um provedor preferencial, você pode configurar provedores que oferecem ganhos de desempenho para algoritmos específicos, mas não são o provedor de melhor desempenho para outros algoritmos. A lista de provedores ordenada especificada usando a propriedade `security.provider.n` não é suficiente para ordenar provedores que oferecem ganhos de desempenho para algoritmos específicos, mas não são o provedor de melhor desempenho para outros algoritmos. Mais flexibilidade é necessária para configurar a ordenação da lista de provedores para alcançar ganhos de desempenho.

A Propriedade de Segurança `jdk.security.provider.preferred` permite que algoritmos específicos, ou tipos de serviço, sejam selecionados de um conjunto preferencial de provedores antes de acessar a lista de provedores registrados. Veja [Como Especificar uma Propriedade de Segurança java.security](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

A Propriedade de Segurança `jdk.security.provider.preferred` não registra os provedores. A lista de provedores ordenada deve ser [Registrando o Provedor Criptográfico Estaticamente](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) usando a propriedade `security.provider.n`. Qualquer provedor que não esteja registrado é ignorado.

Especificando o Provedor Preferencial para um Algoritmo

A sintaxe para especificar a string de provedores preferenciais na Propriedade de Segurança `jdk.security.provider.preferred` é uma lista separada por vírgulas de `ServiceType.Algorithm:Provider`

Nesta sintaxe:

ServiceType
    O nome do tipo de serviço (por exemplo: `"MessageDigest"`). ServiceType é opcional. Se não for especificado, então o algoritmo se aplica a todos os tipos de serviço.

Algorithm
    O nome padrão do algoritmo. Veja [Nomes de Algoritmos Padrão de Segurança Java](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html>). Algoritmos podem ser especificados como nome padrão completo, (AES/CBC/PKCS5Padding) ou como parcial (AES, AES/CBC, AES//PKCS5Padding).

Provider
    O nome do provedor. Qualquer provedor que não esteja listado na lista registrada é ignorado. Veja [Provedores JDK](<#/doc/guides/security/oracle-providers>).

Entradas contendo erros, como erros de parsing, são ignoradas. Use o comando `java -Djava.security.debug=jca` para depurar erros.

Provedores Preferenciais e FIPS

Se você adicionar um provedor FIPS à propriedade `security.provider.n` e especificar a ordenação de provedores preferenciais na propriedade `jdk.security.provider.preferred`, então os provedores preferenciais especificados em `jdk.security.provider.preferred` são selecionados primeiro.

Portanto, é recomendado que você não configure a propriedade `jdk.security.provider.preferred` para configurações de provedores FIPS.

Valores Padrão de jdk.security.provider.preferred

A propriedade `jdk.security.provider.preferred` não é definida por padrão e é usada apenas para ajuste de desempenho de aplicações.

Exemplo 8-16 Exemplo de Propriedade jdk.security.provider.preferred

A sintaxe para especificar a propriedade `jdk.security.provider.preferred` é a seguinte:

```
jdk.security.provider.preferred=AES/GCM/NoPadding:SunJCE, MessageDigest.SHA-256:SUN
```

Nesta sintaxe:

ServiceType
    MessageDigest
Algorithm
    AES/GCM/NoPadding, SHA-256
Provider
    SunJCE, SUN

#### Personalizando os Keystores e Truststores Padrão, Tipos de Armazenamento e Senhas de Armazenamento

Sempre que um `SSLSocketFactory` ou `SSLServerSocketFactory` padrão é criado (através de uma chamada para `SSLSocketFactory.getDefault` ou `SSLServerSocketFactory.getDefault`), e este `SSLSocketFactory` (ou `SSLServerSocketFactory`) padrão vem da implementação de referência JSSE, um `SSLContext` padrão é associado à fábrica de sockets. (A fábrica de sockets padrão virá da implementação JSSE.)

Este `SSLContext` padrão é inicializado com um `KeyManager` padrão e um `TrustManager` padrão. Se um keystore for especificado pela propriedade de sistema `javax.net.ssl.keyStore` e uma propriedade de sistema `javax.net.ssl.keyStorePassword` apropriada (veja [Como Especificar uma Propriedade de Sistema java.lang](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)), então o `KeyManager` criado pelo `SSLContext` padrão será uma implementação de `KeyManager` para gerenciar o keystore especificado. (A implementação real será conforme especificado em [Personalizando os Key Managers e Trust Managers Padrão](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).) Se nenhuma propriedade de sistema for especificada, então o keystore gerenciado pelo `KeyManager` será um novo keystore vazio.

Geralmente, o par atuando como servidor no handshake precisará de um keystore para seu KeyManager a fim de obter credenciais para autenticação ao cliente. No entanto, se uma das cipher suites anônimas for selecionada, então o keystore do `KeyManager` do servidor não é necessário. E, a menos que o servidor exija autenticação do cliente, o par atuando como cliente não precisa de um keystore `KeyManager`. Assim, nestas situações, pode ser aceitável se nenhum valor para a propriedade de sistema `javax.net.ssl.keyStore` for definido.

Similarmente, se um truststore for especificado pela propriedade de sistema `javax.net.ssl.trustStore`, então o `TrustManager` criado pelo `SSLContext` padrão será uma implementação de `TrustManager` para gerenciar o truststore especificado. Neste caso, se tal propriedade existir, mas o arquivo que ela especifica não, então nenhum truststore é usado. Se nenhuma propriedade `javax.net.ssl.trustStore` existir, então um truststore padrão é procurado. Se um truststore chamado `java-home/lib/security/jssecacerts` for encontrado, ele é usado. Caso contrário, um truststore chamado `java-home/lib/security/cacerts` é procurado e usado (se existir). Finalmente, se um truststore ainda não for encontrado, então o truststore gerenciado pelo `TrustManager` será um novo truststore vazio.

Nota:

O JDK é fornecido com um número limitado de certificados raiz confiáveis no arquivo `java-home/lib/security/cacerts`. Conforme documentado em [`keytool`](<#/>) nas Especificações da Ferramenta do Java Development Kit, é sua responsabilidade manter (ou seja, adicionar e remover) os certificados contidos neste arquivo se você o usar como um truststore.

Dependendo da configuração de certificado dos servidores que você contata, pode ser necessário adicionar certificados raiz adicionais. Obtenha os certificados raiz específicos necessários do fornecedor apropriado.

Se as propriedades de sistema `javax.net.ssl.keyStoreType` e/ou `javax.net.ssl.keyStorePassword` também forem especificadas, então elas são tratadas como o tipo e a senha padrão do keystore do `KeyManager`, respectivamente. Se nenhum tipo for especificado, então o tipo padrão é o retornado pelo método `KeyStore.getDefaultType()`, que é o valor da Propriedade de Segurança `keystore.type`, ou "jks" se nenhuma Propriedade de Segurança for especificada. Se nenhuma senha de keystore for especificada, então ela é assumida como uma string vazia "".

Similarmente, se as propriedades de sistema `javax.net.ssl.trustStoreType` e/ou `javax.net.ssl.trustStorePassword` também forem especificadas, então elas são tratadas como o tipo e a senha padrão do truststore, respectivamente. Se nenhum tipo for especificado, então o tipo padrão é o retornado pelo método `KeyStore.getDefaultType()`. Se nenhuma senha de truststore for especificada, então ela é assumida como uma string vazia "".

Nota:

Esta seção descreve o comportamento atual da implementação de referência JSSE. As propriedades de sistema descritas nesta seção não têm garantia de continuar a ter os mesmos nomes e tipos (de sistema ou segurança) ou mesmo de existir em futuras versões. Elas também não têm garantia de serem examinadas e usadas por quaisquer outras implementações JSSE. Se forem examinadas por uma implementação, então essa implementação deve tratá-las da mesma maneira que a implementação de referência JSSE faz, conforme descrito aqui.

#### Personalizando os Key Managers e Trust Managers Padrão

Conforme observado em [Personalizando os Keystores e Truststores Padrão, Tipos de Armazenamento e Senhas de Armazenamento](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>), sempre que um `SSLSocketFactory` ou `SSLServerSocketFactory` padrão é criado, e este `SSLSocketFactory` (ou `SSLServerSocketFactory`) padrão vem da implementação de referência JSSE, um `SSLContext` padrão é associado à fábrica de sockets.

Este `SSLContext` padrão é inicializado com um `KeyManager` e um `TrustManager`. O `KeyManager` e/ou `TrustManager` fornecido ao `SSLContext` padrão será uma implementação para gerenciar o keystore ou truststore especificado, conforme descrito na seção mencionada.

A implementação de `KeyManager` escolhida é determinada examinando primeiro a [Propriedade de Segurança](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) `ssl.KeyManagerFactory.algorithm`. Se tal valor de propriedade for especificado, então uma implementação de `KeyManagerFactory` para o algoritmo especificado é procurada. A implementação do primeiro provedor que fornece uma implementação é usada. Seu método `getKeyManagers()` é chamado para determinar o `KeyManager` a ser fornecido ao `SSLContext` padrão. Tecnicamente, `getKeyManagers()` retorna um array de objetos `KeyManager`, um `KeyManager` para cada tipo de material de chave. Se nenhum valor de Propriedade de Segurança for especificado, então o valor padrão de SunX509 é usado para realizar a busca.

Nota:

Uma implementação de `KeyManagerFactory` para o algoritmo SunX509 é fornecida pelo provedor SunJSSE. O `KeyManager` que ele especifica é uma implementação `javax.net.ssl.X509KeyManager`.

Similarmente, a implementação de `TrustManager` escolhida é determinada examinando primeiro a Propriedade de Segurança `ssl.TrustManagerFactory.algorithm`. Se tal valor de propriedade for especificado, então uma implementação de `TrustManagerFactory` para o algoritmo especificado é procurada. A implementação do primeiro provedor que fornece uma implementação é usada. Seu método `getTrustManagers()` é chamado para determinar o `TrustManager` a ser fornecido ao `SSLContext` padrão. Tecnicamente, `getTrustManagers()` retorna um array de objetos `TrustManager`, um `TrustManager` para cada tipo de material de confiança. Se nenhum valor de Propriedade de Segurança for especificado, então o valor padrão de PKIX é usado para realizar a busca.

Nota:

Uma implementação de `TrustManagerFactory` para o algoritmo PKIX é fornecida pelo provedor SunJSSE. O `TrustManager` que ele especifica é uma implementação `javax.net.ssl.X509TrustManager`.

Nota:

Esta seção descreve o comportamento atual da implementação de referência JSSE. As propriedades de sistema descritas nesta seção não têm garantia de continuar a ter os mesmos nomes e tipos (de sistema ou segurança) ou mesmo de existir em futuras versões. Elas também não têm garantia de serem examinadas e usadas por quaisquer outras implementações JSSE. Se forem examinadas por uma implementação, então essa implementação deve tratá-las da mesma maneira que a implementação de referência JSSE faz, conforme descrito aqui.

#### Algoritmos Criptográficos Desabilitados e Restritos

Em alguns ambientes, certos algoritmos ou tamanhos de chave podem ser indesejáveis ao usar TLS/DTLS. O Oracle JDK usa as Propriedades de Segurança `jdk.certpath.disabledAlgorithms` e `jdk.tls.disabledAlgorithm` para desabilitar algoritmos durante a negociação do protocolo TLS/DTLS, incluindo negociação de versão, seleção de cipher suites, autenticação de pares e mecanismos de troca de chaves. Observe que essas Propriedades de Segurança não têm garantia de serem usadas por outras implementações JDK. Consulte o arquivo `<java-home>/conf/security/java.security` para obter informações sobre a sintaxe dessas Propriedades de Segurança e seus valores ativos atuais.

  * Propriedade `jdk.certpath.disabledAlgorithms`: O código CertPath usa a Propriedade de Segurança `jdk.certpath.disabledAlgorithms` para determinar quais algoritmos não devem ser permitidos durante a verificação do CertPath. Por exemplo, quando um servidor TLS envia uma cadeia de certificados de identificação, um TrustManager de cliente que usa uma implementação CertPath para verificar a cadeia recebida não permitirá as condições declaradas. Por exemplo, a seguinte linha bloqueia qualquer certificado baseado em MD2, bem como certificados SHA1 TLSServer que se encadeiam a âncoras de confiança pré-instaladas no keystore `cacaerts`. Da mesma forma, esta linha bloqueia qualquer chave RSA menor que 1024 bits.
```
jdk.certpath.disabledAlgorithms=MD2, SHA1 jdkCA & usage TLSServer, RSA keySize < 1024
```

  * Propriedade `jdk.tls.disabledAlgorithms`: O código SunJSSE usa a Propriedade de Segurança `jdk.tls.disabledAlgorithms` para desabilitar protocolos TLS/DTLS, cipher suites, chaves e assim por diante. A sintaxe é semelhante à Propriedade de Segurança `jdk.certpath.disabledAlgorithms`. Por exemplo, a seguinte linha desabilita o algoritmo SSLv3 e todas as cipher suites TLS_*_RC4_*:
```
jdk.tls.disabledAlgorithms=SSLv3, RC4
```

Nota:

As restrições de algoritmo especificadas por essas Propriedades de Segurança não se aplicam a âncoras de confiança ou certificados autoassinados.

Se você precisar de uma condição particular, pode reativá-la removendo o valor associado na Propriedade de Segurança no arquivo `java.security` ou definindo dinamicamente a Propriedade de Segurança apropriada antes que o JSSE seja inicializado.

Nota:

Entre em contato com seu arquiteto de segurança antes de modificar essas Propriedades de Segurança ou habilitar uma cipher suite que não tenha sido habilitada; isso permite o uso de cipher suites com proteções mais fracas.

Observe que essas Propriedades de Segurança criam efetivamente um terceiro conjunto de cipher suites, Desabilitadas. A lista a seguir descreve esses três conjuntos:

  * Desabilitadas: Se uma cipher suite contiver quaisquer componentes (por exemplo, RC4) na lista de desabilitados (por exemplo, `RC4` é especificado na Propriedade de Segurança `jdk.tls.disabledAlgorithms`), então essa cipher suite é desabilitada e não será considerada para um handshake de conexão.

  * Habilitadas: Uma lista de cipher suites específicas que serão consideradas para uma conexão.

  * Não Habilitadas: Uma lista de cipher suites não desabilitadas que não serão consideradas para uma conexão. Para reabilitar essas cipher suites, chame os métodos `setEnabledCipherSuites()` ou `setSSLParameters()` apropriados.

Se qualquer aplicação tentar reabilitar uma cipher suite, que foi desabilitada pela Propriedade de Segurança `jdk.tls.disabledAlgorithms`, através dos métodos `setEnabledCipherSuites()` ou `setSSLParameters()`, então o JSSE permite a chamada do método, mas não permite o uso da cipher suite desabilitada durante o handshaking.

Veja [Cipher Suites SunJSSE](<#/doc/guides/security/oracle-providers>) para uma lista das cipher suites SunJSSE atualmente implementadas para esta versão do JDK.

#### Algoritmos Criptográficos Legados

Em alguns ambientes, um certo algoritmo pode ser indesejável, mas não pode ser desabilitado devido ao seu uso em aplicações legadas. Algoritmos legados ainda podem ser suportados, mas as aplicações não devem usá-los, pois a força de segurança dos algoritmos legados geralmente não é forte o suficiente. Durante a negociação de parâmetros de segurança TLS/DTLS, algoritmos legados não são negociados a menos que não haja outros candidatos. A Propriedade de Segurança `jdk.tls.legacyAlgorithms` especifica quais algoritmos o Oracle JDK considera como algoritmos legados. arquivo `<java-home>/conf/security/java.security` para a sintaxe desta Propriedade de Segurança.

Nota:

  * Se um algoritmo legado também for restrito através da propriedade `jdk.tls.disabledAlgorithms` ou da API `java.security.AlgorithmConstraints` (veja o método [`javax.net.ssl.SSLParameters.setAlgorithmConstraints`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLParameters.html#setAlgorithmConstraints\(java.security.AlgorithmConstraints\)>)), então o algoritmo é completamente desabilitado e não será negociado.

  * Se sua aplicação usa um algoritmo especificado na Propriedade de Segurança `jdk.tls.legacyAlgorithms`, use um algoritmo alternativo o mais rápido possível; uma futura versão do JDK pode especificar um algoritmo legado como um algoritmo restrito.

#### Personalizando os Provedores de Algoritmos de Criptografia

O provedor SunJSSE usa a implementação SunJCE para todas as suas necessidades criptográficas. Embora seja recomendado que você deixe o provedor em sua posição regular, você pode usar implementações de outros provedores JCA ou JCE registrando-os antes do provedor SunJCE.

O mecanismo JCA padrão (veja [Como as Implementações de Provedores São Solicitadas e Fornecidas](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)) pode ser usado para configurar provedores, seja estaticamente via o arquivo de propriedades de segurança `<java-home>/conf/security/java.security`, ou dinamicamente via o método `addProvider()` ou `insertProviderAt()` na classe `java.security.Security`.

#### Personalizando o Tamanho das Chaves Ephemeral Diffie-Hellman

Em conexões TLS/DTLS, chaves Diffie-Hellman (DH) efêmeras podem ser usadas internamente durante o handshaking. O provedor SunJSSE oferece uma abordagem flexível para personalizar a força do tamanho da chave DH efêmera durante o handshaking TLS/DTLS.

Chaves Diffie-Hellman (DH) com tamanhos menores que 2048 bits foram descontinuadas devido à sua força insuficiente. Você pode personalizar o tamanho da chave DH efêmera com a propriedade de sistema `jdk.tls.ephemeralDHKeySize`. Esta propriedade de sistema não afeta os tamanhos das chaves DH em mensagens `ServerKeyExchange` para cipher suites exportáveis. Ela afeta apenas as cipher suites baseadas em DHE_RSA, DHE_DSS e DH_anon no provedor JSSE Oracle.

Nota:

A menos que a propriedade de sistema `jdk.tls.ephemeralDHKeySize` seja definida como `legacy`, a implementação SunJSSE tentará primeiro negociar um grupo DH comum usando FFDHE, que é uma extensão TLS definida pela RFC 7919. Se a implementação SunJSSE conseguir negociar um grupo, então ela usará o tamanho definido por esse grupo. Caso contrário, ela voltará a usar um tamanho de chave conforme descrito nesta seção. FFDHE é habilitado por padrão, mas você pode desabilitá-lo definindo a propriedade de sistema `jsse.enableFFDHE` como `false`.

Você pode especificar um dos seguintes valores para esta propriedade:

  * Indefinido: Uma chave DH de 2048 bits será sempre usada para cipher suites não exportáveis. Este é o valor padrão para esta propriedade.

  * `legacy`: O provedor JSSE Oracle preserva o comportamento legado (por exemplo, usando chaves DH efêmeras de 512 bits e 768 bits) do JDK 7 e versões anteriores.

  * `matched`:

    * Para cipher suites anônimas não exportáveis, o tamanho da chave DH nas mensagens `ServerKeyExchange` é de 2048 bits.

    * Para autenticação baseada em certificado X.509 (de cipher suites não exportáveis), o tamanho da chave DH correspondente à chave de autenticação é usado, exceto que um tamanho fixo de 1024 bits é usado para qualquer chave menor que 1024 bits, e um tamanho fixo de 2048 bits é usado para qualquer chave maior que 2048 bits.

Por exemplo, se o tamanho da chave pública de um certificado de autenticação for de 2048 bits, então o tamanho da chave DH efêmera é de 2048 bits, a menos que a cipher suite seja exportável. Este esquema de dimensionamento de chaves mantém a força criptográfica consistente entre chaves de autenticação e chaves de troca de chaves.

  * Um inteiro válido entre 1024 e 8192 em múltiplos de 64, inclusive: Um tamanho de chave DH efêmera fixo do valor especificado, em bits, será usado para cipher suites não exportáveis.

A tabela a seguir resume os tamanhos mínimos e máximos aceitáveis de chaves DH para cada um dos valores possíveis para a propriedade de sistema `jdk.tls.ephemeralDHKeySize`:

Tabela 8-4 Tamanhos de Chave DH para a Propriedade de Sistema `jdk.tls.ephemeralDHKeySize`

| Valor de jdk.tls.ephemeralDHKeySize | Indefinido | legacy | matched | Valor inteiro (fixo) |
|---|---|---|---|---|
| Tamanho da chave DH exportável | 512 | 512 | 512 | 512 |
| Cipher suites anônimas não exportáveis | 2048 | 768 | 2048 | Um inteiro válido entre 1024 e 8192 em múltiplos de 64, inclusive: Um tamanho de chave DH efêmera fixo do valor especificado, em bits, será usado para cipher suites não exportáveis. |
| Certificado de autenticação | 2048 | 768 | O tamanho da chave é o mesmo do certificado de autenticação, a menos que a chave seja menor que 1024 bits ou maior que 2048 bits. Se a chave for menor que 1024 bits, então uma chave DH de 1024 bits é usada. Se a chave for maior que 2048 bits, então uma chave DH de 2048 bits é usada. Consequentemente, você pode usar apenas os valores 1024 ou 2048. | O tamanho fixo da chave é especificado por um valor de propriedade inteiro válido, que deve estar entre 1024 e 8192 em múltiplos de 64, inclusive. |

#### Personalizando a Extensão de Negociação de Comprimento Máximo de Fragmento (MFLN)

A fim de negociar comprimentos máximos de fragmento menores, os clientes têm a opção de incluir uma extensão do tipo `max_fragment_length` na mensagem ClientHello. Uma propriedade de sistema `jsse.enableMFLNExtension` pode ser usada para habilitar ou desabilitar a extensão MFLN para TLS/DTLS.

Negociação de Comprimento Máximo de Fragmento

Pode ser desejável para clientes TLS/DTLS com restrições negociar um comprimento máximo de fragmento menor devido a limitações de memória ou largura de banda. A fim de negociar comprimentos máximos de fragmento menores, os clientes têm a opção de incluir uma extensão do tipo `max_fragment_length` na mensagem ClientHello (estendida). Veja [RFC 6066](<https://tools.ietf.org/html/rfc6066>).

Uma vez que um comprimento máximo de fragmento tenha sido negociado com sucesso, o cliente e o servidor TLS/DTLS podem imediatamente começar a fragmentar mensagens (incluindo mensagens de handshake) para garantir que nenhum fragmento maior que o comprimento negociado seja enviado.

Propriedade de Sistema jsse.enableMFLNExtension

Uma propriedade de sistema `jsse.enableMFLNExtension` é definida para habilitar ou desabilitar a extensão MFLN. A `jsse.enableMFLNExtension` é desabilitada por padrão.

O valor da propriedade de sistema pode ser definido da seguinte forma:

Tabela 8-5 Propriedade de sistema jsse.enableMFLNExtension

| Propriedade de Sistema | Descrição |
|---|---|
| `jsse.enableMFLNExtension=true` | Habilita a extensão MFLN. Se o valor retornado de `SSLParameters.getMaximumPacketSize()` for menor que (212 + tamanho do cabeçalho), a extensão de negociação de comprimento máximo de fragmento seria habilitada. |
| `jsse.enableMFLNExtension=false` | Desabilita a extensão MFLN. |

#### Configurando o Tamanho Máximo e Mínimo do Pacote

Defina o tamanho máximo esperado do pacote de rede em bytes para um registro TLS/DTLS com o método [SSLParameters.setMaximumPacketSize](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLParameters.html#setMaximumPacketSize\(int\)>).

É recomendado que o tamanho do pacote não seja inferior a 256 bytes para que pequenas mensagens de handshake, como HelloVerifyRequests, não sejam fragmentadas.

#### Limitando a Quantidade de Dados que Algoritmos Podem Criptografar com um Conjunto de Chaves

Você pode especificar um limite na quantidade de dados que um algoritmo pode criptografar com um conjunto específico de chaves com a Propriedade de Segurança `jdk.tls.keyLimits`. Uma vez atingido este limite, uma mensagem de pós-handshake KeyUpdate é enviada, que solicita que o conjunto atual de chaves seja atualizado. Esta Propriedade de Segurança é apenas para cifras simétricas com TLS 1.3.

A sintaxe para esta propriedade é a seguinte:
```
    jdk.tls.keyLimits=KeyLimit { , KeyLimit }
```

KeyLimit
```
    AlgorithmName KeyUpdate Length
```

AlgorithmName
    Uma transformação de algoritmo completa
Length
    A quantidade de dados criptografados em uma sessão antes que uma mensagem KeyUpdate seja enviada. Este valor pode ser um valor inteiro em bytes ou como uma potência de dois, por exemplo, `2^37`.

Por exemplo, o seguinte especifica que uma mensagem KeyUpdate é enviada uma vez que o algoritmo AES/GCM/NoPadding tenha criptografado 237 bytes:
```
    jdk.tls.keyLimits=AES/GCM/NoPadding KeyUpdate 2^37
```

#### Retomando a Sessão Sem Estado do Lado do Servidor

O recurso de retomada de sessão sem estado do lado do servidor permite que o lado do servidor do JSSE opere sem estado. Conforme descrito na RFC 5077 (TLS Session Resumption Without Server-Side State) para TLS 1.2 e anteriores e na RFC 8446 para TLS 1.3, o servidor TLS envia informações internas da sessão na forma de um ticket de sessão criptografado para um cliente que suporta operação sem estado. Esse ticket de sessão é apresentado ao servidor durante o handshake TLS para retomar a sessão. Isso deve melhorar o desempenho e o uso de memória do servidor TLS sob grandes cargas de trabalho, pois o cache de sessão raramente será usado. No entanto, com menos informações de sessão em cache, algumas informações de sessão podem não estar disponíveis. Este recurso é habilitado por padrão; você pode desativá-lo definindo duas propriedades de sistema:

  * `jdk.tls.client.enableSessionTicketExtension`: Alterna a extensão do ticket de sessão na mensagem ClientHello no lado do cliente para TLS 1.2 e anteriores. Um valor `true` (valor padrão) envia a extensão, `false` não.
  * `jdk.tls.server.enableSessionTicketExtension`: Permite que um servidor use tickets de sessão sem estado se o cliente o suportar. Clientes que não suportam tickets de sessão sem estado usam o cache em vez disso. Um valor `true` (valor padrão) habilita o uso de tickets de sessão sem estado e retomada de sessão sem estado: a mensagem NewSessionTicket inclui todas as informações da sessão (em um formato criptografado). Um valor `false` desabilita o uso de tickets de sessão sem estado, o que significa que a retomada da sessão é com estado: a mensagem NewSessionTicket contém apenas uma chave que é usada pelo servidor durante a retomada da sessão para acessar as informações da sessão de seu cache de sessão.

Nota:

Para TLS 1.3, tickets sem estado usam a extensão de retomada de chave pré-compartilhada (PSK) existente (veja [Retomada de Sessão com uma Chave Pré-Compartilhada](<#/doc/guides/security/transport-layer-security-tls-protocol-overview>)). Portanto, a retomada de sessão sem estado do lado do servidor não requer essas duas propriedades. No entanto, o conteúdo dos tickets sem estado, em particular, o conteúdo de uma mensagem NewSessionTicket, depende do valor de `jdk.tls.server.enableSessionTicketExtension`: Se `jdk.tls.server.enableSessionTicketExtension` for `true`, então a mensagem NewSessionTicket contém o estado de sessão criptografado. Se `false`, então o estado de sessão é armazenado em cache com a extensão de retomada PSK.

Para TLS 1.2, tickets de sessão sem estado são usados apenas se forem suportados pelo cliente.

#### Especificando Que o Alerta close_notify É Enviado Quando Um É Recebido

Se a propriedade de sistema `jdk.tls.acknowledgeCloseNotify` for definida como `true`, então quando o cliente ou servidor recebe um alerta close_notify, ele envia um alerta close_notify correspondente e a conexão é fechada em duplex.

TLS 1.2 e versões anteriores usam uma política de fechamento duplex. No entanto, TLS 1.3 usa uma política de meio-fechamento, o que significa que os alertas close_notify de entrada e saída são independentes. Ao atualizar para TLS 1.3, um comportamento inesperado pode ocorrer se sua aplicação encerrar a conexão TLS/DTLS usando apenas um dos métodos `SSLEngine.closeInbound()` ou `SSLEngine.closeOutbound()`, mas não ambos em cada lado da conexão. Se sua aplicação travar ou expirar inesperadamente quando o transporte TLS/DTLS subjacente não estiver fechado em duplex, você pode precisar definir esta propriedade como `true`.

Observe que, quando uma conexão TLS/DTLS não é mais necessária, as aplicações cliente e servidor devem fechar ambos os lados de suas respectivas conexões.

#### Habilitando a Extensão certificate_authorities para Seleção de Certificado do Servidor

A extensão `certificate_authorities` é uma extensão opcional introduzida no TLS 1.3. Ela é usada para indicar as autoridades de certificação (CAs) que um endpoint suporta e deve ser usada pelo endpoint receptor para guiar a seleção de certificados.

Esta extensão está sempre presente para seleção de certificado do cliente, enquanto é opcional para seleção de certificado do servidor.

Habilite esta extensão para seleção de certificado do servidor definindo a propriedade de sistema `jdk.tls.client.enableCAExtension` como `true`. O valor padrão da propriedade é `false`.

Nota:

Se o cliente ou servidor confiar em mais CAs de modo que exceda o limite de tamanho da extensão (menos de 2^16 bytes), então a extensão não é habilitada. Além disso, algumas implementações de servidor não permitem que mensagens de handshake excedam 2^14 bytes. Assim, pode haver problemas de interoperabilidade se `jdk.tls.client.enableCAExtension` for definido como `true` e o cliente confiar em mais CAs de modo que exceda o limite da implementação do servidor.

#### Modos de Interoperabilidade de Renegociação SunJSSE

A implementação SunJSSE reabilita as renegociações por padrão para conexões com pares compatíveis com a RFC 5746. Ou seja, tanto o cliente quanto o servidor devem suportar a RFC 5746 para renegociar com segurança. (A RFC 5746 aborda uma falha que foi descoberta nos protocolos SSL/TLS.) O SunJSSE oferece alguns modos de interoperabilidade para conexões com pares que não foram atualizados, mas os usuários são fortemente encorajados a atualizar suas implementações de cliente e servidor o mais rápido possível.

O SunJSSE possui três modos de interoperabilidade de renegociação. Cada modo suporta totalmente [RFC 5746: Extensão de Indicação de Renegociação de Transport Layer Security (TLS)](<https://www.ietf.org/rfc/rfc5746.txt>), mas possui estas semânticas adicionais ao se comunicar com um par que não foi atualizado:
*   **Modo estrito:** Exige que tanto o cliente quanto o servidor sejam atualizados para o RFC 5746 e enviem as mensagens RFC 5746 apropriadas. Caso contrário, o handshake inicial (ou subsequente) falhará e a conexão será encerrada.

*   **Modo interoperável (padrão):** O uso das mensagens RFC 5746 apropriadas é opcional; no entanto, as renegociações legadas (especificações originais SSL/TLS) são desabilitadas se as mensagens apropriadas não forem usadas. Conexões legadas iniciais ainda são permitidas, mas as renegociações legadas são desabilitadas. Esta é a melhor combinação de segurança e interoperabilidade, e é a configuração padrão.

*   **Modo inseguro:** Permite renegociação legada completa. Mais interoperável com pares legados, mas vulnerável ao ataque MITM original.

As três distinções de modo afetam apenas uma conexão com um par que não foi atualizado. Idealmente, o modo estrito (RFC 5746 completo) deve ser usado para todos os clientes e servidores; no entanto, levará algum tempo para que todas as implementações SSL/TLS implantadas suportem o RFC 5746, porque o modo interoperável é o padrão atual.

A tabela a seguir contém informações de interoperabilidade sobre os modos para vários casos em que o cliente e/ou servidor são atualizados para suportar o RFC 5746 ou não.

Tabela 8-6 Informações de Interoperabilidade

Cliente | Servidor | Modo
---|---|---
Atualizado | Atualizado | Renegociação segura em todos os modos.
LegadoFoot 3 | Atualizado |

  * Estrito Se os clientes não enviarem as mensagens RFC 5746 apropriadas, as conexões iniciais serão imediatamente encerradas pelo servidor (`SSLHandshakeException` ou `handshake_failure`).
  * Interoperável Conexões iniciais de clientes legados são permitidas (mensagens RFC 5746 ausentes), mas renegociações não serão permitidas pelo servidor. Foot 4Foot 5
  * Inseguro Conexões e renegociações com clientes legados são permitidas, mas são vulneráveis ao ataque MITM original.

Atualizado | Legado Foot 3 |

  * Estrito Se o servidor não responder com as mensagens RFC 5746 apropriadas, o cliente encerrará imediatamente a conexão (`SSLHandshakeException` ou `handshake_failure`).
  * Interoperável Conexões iniciais de servidores legados são permitidas (mensagens RFC 5746 ausentes), mas renegociações não serão permitidas pelo servidor. Foot 4Foot 5
  * Inseguro Conexões e renegociações com servidores legados são permitidas, mas são vulneráveis ao ataque MITM original.

Legado Foot 3 | Legado Foot 3 | Comportamento SSL/TLS existente, vulnerável ao ataque MITM.

Nota de Rodapé 3 "Legado" significa as especificações originais SSL/TLS (ou seja, não o RFC 5746).

Nota de Rodapé 4 Se as renegociações forem reativadas, elas serão tratadas como "Legado" pelo par que está em conformidade com o RFC 5746, porque não enviam as mensagens RFC 5746 apropriadas.

Nota de Rodapé 5 Em SSL/TLS, as renegociações podem ser iniciadas por qualquer um dos lados. Aplicações que se comunicam com um par que não foi atualizado no modo Interoperável e que tentam iniciar uma renegociação (via `SSLSocket.startHandshake()` ou `SSLEngine.beginHandshake()`) receberão uma `SSLHandshakeException` (`IOException`) e a conexão será encerrada (`handshake_failure`). Aplicações que recebem uma solicitação de renegociação de um par que não foi atualizado responderão de acordo com o tipo de conexão em vigor:

  * TLSv1 Uma mensagem de alerta de aviso do tipo `no_renegotiation(100)` será enviada ao par e a conexão permanecerá aberta. Versões mais antigas do SunJSSE encerrarão a conexão quando um alerta `no_renegotiation` for recebido.
  * SSLv3 A aplicação receberá uma `SSLHandshakeException`, e a conexão será fechada (`handshake_failure`). O alerta `no_renegotiation` não está definido na especificação SSLv3.

Defina o modo com as seguintes propriedades de sistema (consulte [Como Especificar uma Propriedade de Sistema java.lang](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)):

  * `sun.security.ssl.allowUnsafeRenegotiation` controla se renegociações legadas (inseguras) são permitidas.
  * `sun.security.ssl.allowLegacyHelloMessages` permite que o par execute o processo de handshake sem exigir as mensagens RFC 5746 apropriadas.

Nota:

As propriedades de sistema `sun.security.ssl.allowUnsafeRenegotiation` e `sun.security.ssl.allowLegacyHelloMessages` estão obsoletas e podem ser removidas em uma futura versão do JDK.

Tabela 8-7 Valores das Propriedades de Sistema para Definir o Modo de Interoperabilidade

Modo | allowLegacyHelloMessages | allowUnsafeRenegotiation
---|---|---
Estrito | `false` | `false`
Interoperável (padrão) | `true` | `false`
Inseguro | `true` | `true`

Cuidado:

Não reative a renegociação SSL/TLS insegura, pois isso restabeleceria a vulnerabilidade que foi descoberta nos protocolos SSL/TLS.

##### Soluções Alternativas e Alternativas à Renegociação SSL/TLS

Todos os pares devem ser atualizados para uma implementação compatível com o RFC 5746 o mais rápido possível. Mesmo com esta correção do RFC 5746, as comunicações com pares que não foram atualizados serão afetadas se uma renegociação for necessária. Aqui estão algumas opções sugeridas:

  * Reestruture o par para não exigir renegociação.

As renegociações são tipicamente usadas por servidores web que inicialmente permitem a navegação anônima de clientes, mas que mais tarde exigem clientes autenticados por SSL/TLS, ou que podem inicialmente permitir suites de cifras fracas, mas que mais tarde precisam de suites mais fortes. A alternativa é exigir autenticação de cliente ou suites de cifras fortes durante a negociação inicial. Existem algumas opções para fazer isso:

    * Se uma aplicação tem um modo de navegação até que um certo ponto seja atingido e uma renegociação seja necessária, então você pode reestruturar o servidor para eliminar o modo de navegação e exigir que todas as conexões iniciais sejam fortes.

    * Divida o servidor em duas entidades, com o modo de navegação ocorrendo em uma entidade, e usando uma segunda entidade para o modo mais seguro. Quando o ponto de renegociação for atingido, transfira qualquer informação relevante entre os servidores.

Ambas as opções exigem uma quantidade considerável de trabalho, mas não reabrirão a falha de segurança original.

  * Defina o modo de interoperabilidade de renegociação para "insecure" usando as propriedades de sistema.

Consulte [Modos de Interoperabilidade de Renegociação do SunJSSE](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

##### Permitir Alteração Insegura de Certificado de Servidor em Renegociações SSL/TLS

A alteração do certificado do servidor em uma renegociação SSL/TLS pode ser insegura se todas as seguintes condições se aplicarem:

  * A identificação de endpoint não está habilitada em um handshake SSL/TLS.
  * O handshake anterior é um handshake inicial abreviado de retomada de sessão.
  * As identidades representadas por ambos os certificados podem ser consideradas diferentes. Os seguintes passos são seguidos para determinar se dois certificados representam a mesma identidade:
    1. Se os nomes alternativos de assunto de endereço IP estiverem presentes em ambos os certificados, então eles são idênticos.
    2. Caso contrário, se os nomes alternativos de assunto de nome DNS estiverem presentes em ambos os certificados, então eles são idênticos.
    3. Caso contrário, se os campos de assunto estiverem presentes em ambos os certificados, então os assuntos e emissores dos certificados são idênticos.

A alteração insegura do certificado do servidor em renegociações SSL/TLS não é permitida por padrão. Use a propriedade de sistema `jdk.tls.allowUnsafeServerCertChange` para definir se a alteração insegura do certificado do servidor em uma renegociação SSL/TLS deve ser restrita ou não. O valor padrão desta propriedade de sistema é `false`.

Cuidado:

Não defina a propriedade de sistema como `true` a menos que seja realmente necessário, pois isso restabeleceria a vulnerabilidade de alteração insegura do certificado do servidor.

#### OCSP Impulsionado pelo Cliente e OCSP Stapling

Use o Online Certificate Status Protocol (OCSP) para determinar o status de revogação do certificado X.509 durante o handshake do Transport Layer Security (TLS).

Certificados X.509 usados em TLS podem ser revogados pela Autoridade Certificadora (CA) emissora se houver razão para acreditar que um certificado foi comprometido. Você pode verificar o status de revogação de certificados durante o handshake TLS usando uma das seguintes abordagens.

  * Lista de Revogação de Certificados (CRL): Uma CRL é uma lista simples de certificados revogados. A aplicação que recebe um certificado obtém a CRL de um servidor CRL e verifica se o certificado recebido está na lista. Existem duas desvantagens no uso de CRLs que significam que um certificado pode ser revogado:

    * CRLs podem se tornar muito grandes, o que pode causar um aumento substancial no tráfego de rede.

    * Muitas CRLs são criadas com períodos de validade mais longos, o que aumenta a possibilidade de um certificado ser revogado dentro desse período de validade e não aparecer até a próxima atualização da CRL.

Consulte [Classes de Armazenamento de Certificados/CRLs](<#/doc/guides/security/java-pki-programmers-guide>) no [Guia do Programador Java PKI](<#/doc/guides/security/java-pki-programmers-guide>).

  * OCSP impulsionado pelo cliente: No OCSP impulsionado pelo cliente, o cliente usa o OCSP para contatar um respondedor OCSP para verificar o status de revogação do certificado. A quantidade de dados necessária é geralmente menor do que a de uma CRL, e o respondedor OCSP provavelmente estará mais atualizado com o status de revogação do que uma CRL. Cada cliente que se conecta a um servidor requer uma resposta OCSP para cada certificado sendo verificado. Se o servidor for popular e muitos clientes estiverem usando o OCSP impulsionado pelo cliente, essas solicitações OCSP podem ter um efeito negativo no desempenho do respondedor OCSP.

  * OCSP stapling: O OCSP stapling permite que o servidor, em vez do cliente, faça a solicitação ao respondedor OCSP. O servidor "grampeia" (staples) a resposta OCSP ao certificado e a retorna ao cliente durante o handshake TLS. Essa abordagem permite que o apresentador do certificado, em vez da CA emissora, suporte o custo de recursos para fornecer respostas OCSP. Também permite que o servidor armazene em cache as respostas OCSP e as forneça a todos os clientes. Isso reduz significativamente a carga no respondedor OCSP porque a resposta pode ser armazenada em cache e atualizada periodicamente pelo servidor, em vez de por cada cliente.

##### OCSP Impulsionado pelo Cliente e Revogação de Certificados

O Online Certificate Status Protocol (OCSP) impulsionado pelo cliente permite que o cliente verifique o status de revogação do certificado conectando-se a um respondedor OCSP durante o handshake do Transport Layer Security (TLS).

A solicitação OCSP impulsionada pelo cliente ocorre durante o handshake TLS logo após o cliente receber o certificado do servidor e validá-lo.

Handshake TLS com OCSP Impulsionado pelo Cliente

O OCSP impulsionado pelo cliente é usado durante o handshake TLS entre o cliente e o servidor para verificar o status de revogação do certificado do servidor. Após o cliente receber o certificado, ele realiza a validação do certificado. Se a validação for bem-sucedida, o cliente verifica se o certificado não foi revogado pelo emissor. Isso é feito enviando uma solicitação OCSP a um respondedor OCSP. Após receber a resposta OCSP, o cliente verifica essa resposta antes de completar o handshake TLS.

Geralmente, o cliente encontra a URL do respondedor OCSP procurando na extensão Authority Information Access (AIA) do certificado, mas ela pode ser definida para uma URL estática através do uso de uma propriedade de sistema.

###### Configurando um Cliente Java para usar OCSP Impulsionado pelo Cliente

O OCSP impulsionado pelo cliente é habilitado ativando a verificação de revogação e ativando o OCSP.

Para configurar um cliente Java para usar OCSP impulsionado pelo cliente, o cliente Java já deve estar configurado para se conectar a um servidor usando TLS.

  1. Habilite a verificação de revogação. Você pode fazer isso de duas maneiras diferentes.
     * Defina a propriedade de sistema `com.sun.net.ssl.checkRevocation` como `true`.
     * Use o método `setRevocationEnabled` em `PKIXParameters`. Consulte [A Classe PKIXParameters](<#/doc/guides/security/java-pki-programmers-guide>).
  2. Habilite o OCSP impulsionado pelo cliente:

Defina a Propriedade de Segurança `ocsp.enable` como `true`.

Ambos os passos são necessários. A configuração `ocsp.enable` não tem efeito a menos que a verificação de revogação esteja habilitada.

##### OCSP Stapling e Revogação de Certificados

O Online Certificate Status Protocol (OCSP) stapling permite que o apresentador de um certificado, em vez da Autoridade Certificadora (CA) emissora, suporte o custo de recursos para fornecer as respostas OCSP que contêm o status de revogação do certificado.

Handshake TLS com OCSP Stapling

O OCSP stapling é usado durante o handshake do Transport Layer Security (TLS) entre o cliente e o servidor para verificar o status de revogação do certificado do servidor. O servidor faz a solicitação OCSP ao respondedor OCSP e "grampeia" (staples) as respostas OCSP aos certificados retornados ao cliente. Ao fazer com que o servidor faça a solicitação ao respondedor OCSP, as respostas podem ser armazenadas em cache e, em seguida, usadas várias vezes para muitos clientes.

O cliente que recebe os certificados com respostas OCSP "grampeadas" valida cada certificado e, em seguida, verifica as respostas OCSP antes de continuar com o handshake. Se, da perspectiva do cliente, a resposta OCSP "grampeada" do servidor para um certificado estiver ausente, o cliente tentará usar o OCSP impulsionado pelo cliente ou Listas de Revogação de Certificados (CRLs) para obter informações de revogação se as seguintes condições forem verdadeiras:

  * O flag RevocationEnabled está definido como `true` através do método [PKIXParameters.setRecovcationEnabled](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/cert/PKIXParameters.html#setRevocationEnabled\(boolean\)>).

  * A verificação OCSP é habilitada definindo a Propriedade de Segurança `ocsp.enable` como `true`.

A verificação OCSP funciona em conjunto com as CRLs durante a verificação de revogação. Consulte [Apêndice C: Suporte OCSP](<#/doc/guides/security/java-pki-programmers-guide>) no [Guia do Programador Java PKI](<#/doc/guides/security/java-pki-programmers-guide>).

Solicitação de Status Versus Múltiplas Solicitações de Status

O recurso OCSP stapling implementa a extensão TLS Certificate Status Request (seção 8 do [RFC 6066](<https://datatracker.ietf.org/doc/html/rfc6066>)) e a Multiple Certificate Status Request Extension ([RFC 6961](<https://datatracker.ietf.org/doc/html/rfc6961>)).

A extensão TLS Certificate Status Request solicita informações de revogação apenas para o certificado do servidor na cadeia de certificados, enquanto a Multiple Certificate Status Request Extension solicita informações de revogação para todos os certificados na cadeia de certificados. No caso em que apenas as informações de revogação do certificado do servidor são enviadas ao cliente, outros certificados na cadeia podem ser verificados usando as Listas de Revogação de Certificados (CRLs) ou OCSP impulsionado pelo cliente (mas o cliente precisará ser configurado para fazer isso).

Embora o TLS permita que o servidor também solicite o certificado do cliente, não há nenhuma provisão no OCSP stapling que permita ao cliente contatar o respondedor OCSP apropriado e "grampear" a resposta ao certificado enviado ao servidor.

A Solicitação e Resposta OCSP

As mensagens de solicitação e resposta OCSP são geralmente enviadas via HTTP não criptografado. A resposta é assinada pela CA.

Se necessário, as respostas "grampeadas" podem ser obtidas no código do cliente chamando o método `getStatusResponses` no objeto `ExtendedSSLSession`. A assinatura do método é:
```
    public List<byte[]> getStatusResponses();
```

A resposta OCSP é codificada usando as Distinguished Encoding Rules (DER) em um formato descrito pelo ASN.1 encontrado no [RFC 6960](<https://datatracker.ietf.org/doc/html/rfc6960>).

###### Configurando um Cliente Java para Usar OCSP Stapling

O Online Certificate Status Protocol (OCSP) stapling é habilitado no lado do cliente definindo a propriedade de sistema `jdk.tls.client.enableStatusRequestExtension` como `true` (seu valor padrão).

Para configurar um cliente Java para usar a resposta OCSP "grampeada" ao certificado retornado por um servidor, o cliente Java já deve estar configurado para se conectar a um servidor usando TLS, e o servidor deve estar configurado para "grampear" uma resposta OCSP ao certificado que ele retorna como parte do handshake TLS.

  1. Habilite o OCSP stapling no cliente:

Se necessário, defina a propriedade de sistema `jdk.tls.client.enableStatusRequestExtension` como `true`.

  2. Habilite a verificação de revogação. Você pode fazer isso de duas maneiras diferentes.
     * Defina a propriedade de sistema `com.sun.net.ssl.checkRevocation` como `true`. Você pode fazer isso pela linha de comando ou no código.
     * Use o método `setRevocationEnabled` na classe `PKIXParameters`. Consulte [A Classe PKIXParameters](<#/doc/guides/security/java-pki-programmers-guide>).

Para que o cliente inclua as respostas "grampeadas" recebidas do servidor na validação do certificado, a verificação de revogação deve ser definida como `true`. Se a verificação de revogação não for definida como `true`, a conexão será permitida a prosseguir independentemente da presença ou status das informações de revogação.

###### Configurando um Servidor Java para Usar OCSP Stapling

O Online Certificate Status Protocol (OCSP) stapling é habilitado no servidor definindo a propriedade de sistema `jdk.tls.server.enableStatusRequestExtension` como `true`. (Ele é definido como `false` por padrão.)

Os seguintes passos podem ser usados para configurar um servidor Java para se conectar a um respondedor OCSP e "grampear" a resposta OCSP ao certificado a ser retornado ao cliente. O servidor Java já deve estar configurado para responder a clientes usando TLS.

  1. Habilite o OCSP stapling no servidor:

Defina a propriedade de sistema `jdk.tls.server.enableStatusRequestExtension` como `true`.

  2. **Opcional:** Defina outras propriedades conforme necessário. Consulte [Propriedades de Configuração do OCSP Stapling](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) para uma lista das propriedades válidas.

##### Propriedades de Configuração do OCSP Stapling

Este tópico lista os efeitos da configuração de várias propriedades ao usar o Online Certificate Status Protocol (OCSP). Ele mostra as propriedades usadas tanto no OCSP impulsionado pelo cliente quanto no OCSP stapling.

Propriedades do Lado do Servidor

A maioria das propriedades é lida no momento da instanciação do `SSLContext`. Isso significa que, se você definir uma propriedade, deverá obter um novo objeto `SSLContext` para que um objeto `SSLSocket` ou `SSLEngine` obtido desse objeto `SSLContext` reflita a configuração da propriedade. A única exceção é a propriedade `jdk.tls.stapling.responseTimeout`. Essa propriedade é avaliada quando o objeto `ServerHandshaker` é criado (essencialmente ao mesmo tempo em que um objeto `SSLSocket` ou `SSLEngine` é criado).

Tabela 8-8 Propriedades de OCSP stapling do Lado do Servidor

Propriedade | Descrição | Valor Padrão
---|---|---
`jdk.tls.server.enableStatusRequestExtension` | Habilita o suporte do lado do servidor para OCSP stapling. | False
`jdk.tls.stapling.responseTimeout` | Controla a quantidade máxima de tempo que o servidor usará para obter respostas OCSP, seja do cache ou contatando um respondedor OCSP. As respostas já recebidas serão enviadas em uma mensagem `CertificateStatus`, se aplicável com base no tipo de stapling que está sendo feito. | 5000 (valor inteiro em milissegundos)
`jdk.tls.stapling.cacheSize` | Controla o tamanho máximo do cache em entradas. Se o cache estiver cheio e uma nova resposta precisar ser armazenada em cache, a entrada de cache menos recentemente usada será substituída pela nova. Um valor zero ou menor para esta propriedade significa que o cache não terá um limite superior no número de respostas que pode conter. | 256 objetos
`jdk.tls.stapling.cacheLifetime` | Controla a vida útil máxima de uma resposta em cache. É possível que as respostas tenham vidas úteis mais curtas do que o valor definido com esta propriedade se a resposta tiver um campo nextUpdate que expira antes da vida útil do cache. Um valor zero ou menor para esta propriedade desabilita a vida útil do cache. Se um objeto não tiver valor nextUpdate e as vidas úteis do cache estiverem desabilitadas, a resposta não será armazenada em cache. | 3600 segundos (1 hora)
`jdk.tls.stapling.responderURI` | Permite ao administrador definir uma URI padrão caso os certificados usados para TLS não tenham a extensão Authority Info Access (AIA). Não substituirá o valor da extensão Authority Info Access a menos que a propriedade `jdk.tls.stapling.responderOverride` esteja definida. | Não definido
`jdk.tls.stapling.responderOverride` | Permite que uma URI fornecida através da propriedade `jdk.tls.stapling.responderURI` substitua qualquer valor de extensão AIA. | False
`jdk.tls.stapling.ignoreExtensions` | Desabilita o encaminhamento de extensões OCSP especificadas nas extensões TLS `status_request` ou `status_request_v2`. | False

Configurações do Lado do Cliente

Tabela 8-9 Configurações do Lado do Cliente Usadas no OCSP Stapling

PKIXBuilderParameters | Propriedade checkRevocation | PKIXRevocationChecker | Resultado
---|---|---|---
Padrão | Padrão | Padrão | A verificação de revogação está desabilitada.
Padrão | True | Padrão | A verificação de revogação está habilitada.[1](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)
Instanciado | Padrão | Padrão | A verificação de revogação está habilitada.[1](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)
Instanciado | Padrão | Instanciado, adicionado ao objeto `PKIXBuilderParameters`. | A verificação de revogação está habilitada[1](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)e se comportará de acordo com as configurações do `PKIXRevocationChecker`.

Nota de Rodapé 1 Observe que o fallback OCSP do lado do cliente ocorrerá apenas se a Propriedade de Segurança `ocsp.enable` estiver definida como `true`.

Os desenvolvedores têm alguma flexibilidade em como lidar com as respostas fornecidas através do OCSP stapling. O OCSP stapling não faz alterações nas metodologias atuais envolvidas na verificação do caminho do certificado e na verificação de revogação. Isso significa que é possível que tanto o cliente quanto o servidor afirmem as extensões `status_request`, obtenham respostas OCSP através da mensagem `CertificateStatus` e forneçam flexibilidade ao usuário sobre como reagir às informações de revogação, ou à falta delas.

Se nenhum `PKIXBuilderParameters` for fornecido pelo chamador, a verificação de revogação será desabilitada. Se o chamador criar um objeto `PKIXBuilderParameters` e usar o método `setRevocationEnabled` para habilitar a verificação de revogação, as respostas OCSP "grampeadas" serão avaliadas. Este também é o caso se a propriedade `com.sun.net.ssl.checkRevocation` estiver definida como `true`.

#### Configurando Extensões Padrão

Algumas implementações TLS podem não lidar com extensões desconhecidas corretamente. Como resultado, você pode encontrar problemas inesperados de interoperabilidade quando o JDK introduz novas extensões. Duas propriedades de sistema permitem personalizar as extensões padrão:

  * `jdk.tls.client.disableExtensions`: Bloqueia extensões usadas no lado do cliente.
  * `jdk.tls.server.disableExtensions`: Bloqueia extensões usadas no lado do servidor.

Se uma extensão for desabilitada, ela não será produzida nem processada nas mensagens de handshake.

O valor dessas propriedades de sistema é uma lista de nomes de extensões TLS padrão separados por vírgulas. Consulte [Extensões de Transport Layer Security (TLS)](<https://www.iana.org/assignments/tls-extensiontype-values/tls-extensiontype-values.xhtml>) para uma lista desses nomes. Os nomes das extensões diferenciam maiúsculas de minúsculas, e nomes desconhecidos, não suportados, mal escritos e duplicados são ignorados.

Nota:

Embora existam propriedades de sistema que habilitam e desabilitam extensões TLS específicas, como `jsse.enableMFLNExtension`, `jsse.enableSNIExtension` e `jsse.enableSNIExtension`, uma extensão não será habilitada se for desabilitada através de `jdk.tls.client.disableExtensions` ou `jdk.tls.server.disableExtensions`, mesmo que pudesse ser habilitada através da propriedade de sistema correspondente.

#### Especificando Esquemas de Assinatura que Podem Ser Usados sobre os Protocolos TLS/DTLS

Esquemas de assinatura são os algoritmos usados nas assinaturas digitais de conexões TLS/DTLS. A propriedade de sistema `jdk.tls.server.SignatureSchemes` contém uma lista de nomes de esquemas de assinatura suportados, separados por vírgulas, que especifica os esquemas de assinatura que poderiam ser usados para conexões TLS/DTLS no lado do servidor. A propriedade `jdk.tls.client.SignatureSchemes` contém o mesmo, exceto que é para conexões no lado do cliente.

Para uma lista de nomes de esquemas de assinatura, consulte a seção [Esquemas de Assinatura](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html#signature-schemes>) na Especificação de Nomes de Algoritmos Padrão de Segurança Java.

Uma aplicação pode definir os esquemas de assinatura com o método [javax.net.ssl.SSLParameters.setSignatureSchemes(String[])](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLParameters.html#setSignatureSchemes\(\)>). Consulte o método [javax.net.ssl.SSLParameters.getSignatureSchemes()](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLParameters.html#getSignatureSchemes\(\)>) para detalhes específicos sobre como os esquemas de assinatura são usados em conexões SSL/TLS/DTLS.

#### Personalizando os Grupos Nomeados Suportados para Troca de Chaves TLS/DTLS

Grupos nomeados são parâmetros criptográficos predefinidos para troca de chaves. A propriedade de sistema `jdk.tls.namedGroups` contém uma lista de grupos nomeados habilitados, separados por vírgulas e entre aspas, em ordem de preferência.

A lista padrão de grupos nomeados de troca de chaves é definida na seção [Grupos Nomeados](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html#named-groups>) da Especificação de Nomes de Algoritmos Padrão de Segurança Java.

Chame [javax.net.ssl.SSLParameters.getNamedGroups()](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLParameters.html#getNamedGroups\(\)>) para obter um array priorizado de nomes de grupos nomeados de troca de chaves que podem ser usados sobre os protocolos TLS/DTLS. Você pode chamar [javax.net.ssl.SSLParameters.setNamedGroups(String[])](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLParameters.html#setNamedGroups\(\)>) para especificar um array priorizado de nomes de grupos nomeados de troca de chaves.

#### Definindo o Comprimento Máximo da Cadeia de Certificados Aceita do Cliente ou Servidor Durante o Handshake TLS/DTLS

Você pode definir o comprimento máximo permitido da cadeia de certificados aceita do cliente ou servidor durante o handshake TLS/DTLS com as propriedades de sistema `jdk.tls.server.maxInboundCertificateChainLength` e `jdk.tls.client.maxInboundCertificateChainLength`.

Um serviço pode funcionar tanto como servidor quanto como cliente TLS/DTLS. Quando o serviço atua como servidor, ele impõe um comprimento máximo de cadeia de certificados aceita de clientes. Quando o serviço atua como cliente, ele impõe um comprimento máximo de cadeia de certificados aceita de servidores.

Se você definir um valor para as propriedades de sistema `jdk.tls.server.maxInboundCertificateChainLength` e `jdk.tls.client.maxInboundCertificateChainLength`, então elas sobrescrevem a propriedade de sistema existente `jdk.tls.maxCertificateChainLength` da seguinte forma:

  * Se você definir a propriedade de sistema `jdk.tls.server.maxInboundCertificateChainLength` para um valor igual ou maior que 0, então este valor é o comprimento máximo de uma cadeia de certificados de cliente aceita por um servidor. Caso contrário, se você tiver definido a propriedade de sistema `jdk.tls.maxCertificateChainLength` para um valor igual ou maior que 0, então este valor é o comprimento máximo da cadeia de certificados de cliente. Se você não tiver definido nenhuma das propriedades, então o valor padrão 8 é o comprimento máximo da cadeia de certificados de cliente.
  * Se você definir a propriedade de sistema `jdk.tls.client.maxInboundCertificateChainLength` para um valor igual ou maior que 0, então este valor é o comprimento máximo de uma cadeia de certificados de servidor aceita por um cliente. Caso contrário, se você tiver definido a propriedade de sistema `jdk.tls.maxCertificateChainLength` para um valor igual ou maior que 0, então este valor é o comprimento máximo da cadeia de certificados de servidor. Se você não tiver definido nenhuma das propriedades, então o valor padrão 10 é o comprimento máximo da cadeia de certificados de servidor.

### Aceleração de Hardware e Suporte a Smartcards

A Java Cryptography Architecture (JCA) é um conjunto de pacotes que fornece uma estrutura e implementações para criptografia, geração e acordo de chaves, e algoritmos de código de autenticação de mensagem (MAC). (Consulte [Guia de Referência da Java Cryptography Architecture (JCA)](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide> "A Java Cryptography Architecture (JCA) é uma parte importante da plataforma e contém uma arquitetura de "provedor" e um conjunto de APIs para assinaturas digitais, resumos de mensagens (hashes), certificados e validação de certificados, criptografia (cifras de bloco/fluxo simétricas/assimétricas), geração e gerenciamento de chaves, e geração de números aleatórios seguros, para citar alguns.")). O provedor SunJSSE usa JCA exclusivamente para todas as suas operações criptográficas e pode aproveitar automaticamente os recursos e aprimoramentos do JCE, incluindo o suporte do JCA para RSA PKCS#11. Este suporte permite que o provedor SunJSSE use aceleradores criptográficos de hardware para melhorias significativas de desempenho e use smartcards como keystores para maior flexibilidade no gerenciamento de chaves e confiança.

O uso de aceleradores criptográficos de hardware é automático se o JCA tiver sido configurado para usar o provedor Oracle PKCS#11, que por sua vez foi configurado para usar o hardware acelerador subjacente. O provedor deve ser configurado antes de quaisquer outros provedores JCA na lista de provedores. Para detalhes sobre como configurar o provedor Oracle PKCS#11, consulte [Guia de Referência PKCS#11](<#/doc/guides/security/pkcs11-reference-guide1>).

#### Configurando o JSSE para Usar Smartcards como Keystores e Truststores

O suporte para PKCS#11 no JCA também permite o acesso a smartcards como um keystore. Para detalhes sobre como configurar o tipo e a localização dos keystores a serem usados pelo JSSE, consulte [Personalizando o JSSE](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>). Para usar um smartcard como keystore ou truststore, defina as propriedades de sistema `javax.net.ssl.keyStoreType` e `javax.net.ssl.trustStoreType`, respectivamente, como `pkcs11`, e defina as propriedades de sistema `javax.net.ssl.keyStore` e `javax.net.ssl.trustStore`, respectivamente, como `NONE`. Para especificar o uso de um provedor específico, use as propriedades de sistema `javax.net.ssl.keyStoreProvider` e `javax.net.ssl.trustStoreProvider` (por exemplo, defina-as como `SunPKCS11-joe`). Usando essas propriedades, você pode configurar uma aplicação que anteriormente dependia dessas propriedades para acessar um keystore baseado em arquivo para usar um keystore de smartcard sem alterações na aplicação.
Algumas aplicações solicitam o uso de keystores programaticamente. Essas aplicações podem continuar a usar as APIs existentes para instanciar um `Keystore` e passá-lo para seu key manager e trust manager. Se a instância de `Keystore` se referir a um keystore PKCS#11 apoiado por um Smartcard, então a aplicação JSSE terá acesso às chaves no smartcard.

#### Keystores Múltiplos e Dinâmicos

Smartcards (e outros tokens removíveis) têm requisitos adicionais para um `X509KeyManager`. Diferentes smartcards podem estar presentes em um leitor de smartcard durante o tempo de vida de uma aplicação Java, e eles podem ser protegidos usando senhas diferentes.

A classe [`KeyStore.Builder`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/KeyStore.Builder.html>) abstrai a construção e inicialização de um objeto `KeyStore`. Ela suporta o uso de `CallbackHandler` para solicitação de senha, e suas subclasses podem ser usadas para suportar recursos adicionais conforme desejado por uma aplicação. Por exemplo, é possível implementar um `Builder` que permite que entradas individuais de `KeyStore` sejam protegidas com senhas diferentes. A classe [`KeyStoreBuilderParameters`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/KeyStoreBuilderParameters.html>) pode então ser usada para inicializar um `KeyManagerFactory` usando um ou mais desses objetos `Builder`.

Uma implementação de `X509KeyManager` no provedor SunJSSE chamada NewSunX509 suporta esses parâmetros. Se múltiplos certificados estiverem disponíveis, ela tenta escolher um certificado com o uso de chave apropriado e prefere certificados válidos a expirados.

[Exemplo 8-17](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) ilustra como instruir o JSSE a usar tanto um keystore PKCS#11 (que por sua vez pode usar um smartcard) quanto um keystore baseado em arquivo PKCS#12.

Exemplo 8-17 Exemplo de Código para Usar Keystore Baseado em Arquivo PKCS#11 e PKCS#12
```
    import javax.net.ssl.*;
    import java.security.KeyStore.*;
    // ...
    
    // Specify keystore builder parameters for PKCS#11 keystores
    Builder scBuilder = Builder.newInstance("PKCS11", null,
        new CallbackHandlerProtection(myGuiCallbackHandler));
    
    // Specify keystore builder parameters for a specific PKCS#12 keystore
    Builder fsBuilder = Builder.newInstance("PKCS12", null,
        new File(pkcsFileName), new PasswordProtection(pkcsKsPassword));
    
    // Wrap them as key manager parameters
    ManagerFactoryParameters ksParams = new KeyStoreBuilderParameters(
        Arrays.asList(new Builder[] { scBuilder, fsBuilder }) );
    
    // Create KeyManagerFactory
    KeyManagerFactory factory = KeyManagerFactory.getInstance("NewSunX509");
    
    // Pass builder parameters to factory
    factory.init(ksParams);
    
    // Use factory
    SSLContext ctx = SSLContext.getInstance("TLS");
    ctx.init(factory.getKeyManagers(), null, null);
    
```

### O Formato de Keystore PKCS12

O [PKCS#12 (Personal Information Exchange Syntax Standard)](<https://www.rfc-editor.org/rfc/rfc7292.html>) especifica um formato portátil para armazenamento e/ou transporte de chaves privadas, certificados, segredos diversos e outros itens de um usuário. O provedor SunJSSE fornece uma implementação completa do formato PKCS12 `java.security.KeyStore` para leitura e escrita de arquivos PKCS12. Este formato também é suportado por outros kits de ferramentas e aplicações para importação e exportação de chaves e certificados, como Mozilla Firefox, Microsoft Internet Explorer e OpenSSL. Por exemplo, essas implementações podem exportar certificados e chaves de cliente para um arquivo usando a extensão de nome de arquivo .p12.

Com o provedor SunJSSE, você pode acessar chaves PKCS12 através da API `KeyStore` com um tipo de keystore PKCS12. Além disso, você pode listar as chaves instaladas e os certificados associados usando o comando `keytool` com a opção `-storetype` definida como `pkcs12`. Consulte [`keytool`](<#/>) em Java Development Kit Tool Specifications.

Várias propriedades de segurança permitem configurar como os keystores PKCS12 são criados. Essas propriedades começam com o prefixo `keystore.pkcs12`. Consulte o arquivo `java.security` para mais informações.

### Extensão Server Name Indication (SNI)

A extensão SNI é um recurso que estende o protocolo TLS/DTLS para indicar a qual nome de servidor o cliente está tentando se conectar durante o handshaking. Servidores podem usar informações de indicação de nome de servidor para decidir se instâncias específicas de `SSLSocket` ou `SSLEngine` devem aceitar uma conexão. Por exemplo, quando múltiplos servidores virtuais ou baseados em nome são hospedados em um único endereço de rede subjacente, a aplicação do servidor pode usar informações SNI para determinar se este servidor é o servidor exato que o cliente deseja acessar. Instâncias desta classe podem ser usadas por um servidor para verificar os nomes de servidor aceitáveis de um tipo particular, como nomes de host. Consulte a seção 3 de [TLS Extensions (RFC 6066)](<http://www.ietf.org/rfc/rfc6066.txt>).

Desenvolvedores de aplicações cliente podem definir explicitamente a indicação de nome de servidor usando o método `SSLParameters.setServerNames(List<SNIServerName> serverNames)`. Consulte [Exemplo 8-18](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

Desenvolvedores de aplicações servidor podem usar a classe `SNIMatcher` para decidir como reconhecer a indicação de nome de servidor. [Exemplo 8-19](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) e [Exemplo 8-20](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) ilustram essa funcionalidade:

Exemplo 8-18 Exemplo de Código para Definir a Indicação de Nome de Servidor

O exemplo de código a seguir ilustra como definir a indicação de nome de servidor usando o método SSLParameters.setServerNames(List&lt;SNIServerName&gt; serverNames):
```
    SSLSocketFactory factory = ...
    SSLSocket sslSocket = factory.createSocket("172.16.10.6", 443);
    // SSLEngine sslEngine = sslContext.createSSLEngine("172.16.10.6", 443);
    
    SNIHostName serverName = new SNIHostName("www.example.com");
    List<SNIServerName> serverNames = new ArrayList<>(1);
    serverNames.add(serverName);
    
    SSLParameters params = sslSocket.getSSLParameters();
    params.setServerNames(serverNames);
    sslSocket.setSSLParameters(params);
    // sslEngine.setSSLParameters(params);
```

Exemplo 8-19 Exemplo de Código Usando a Classe SSLSocket para Reconhecer SNI

O exemplo de código a seguir ilustra como as aplicações servidor podem usar a classe `SNIMatcher` para decidir como reconhecer a indicação de nome de servidor:
```
    SSLSocket sslSocket = sslServerSocket.accept();
    
    SNIMatcher matcher = SNIHostName.createSNIMatcher("www\\.example\\.(com|org)");
    Collection<SNIMatcher> matchers = new ArrayList<>(1);
    matchers.add(matcher);
    
    SSLParameters params = sslSocket.getSSLParameters();
    params.setSNIMatchers(matchers);
    sslSocket.setSSLParameters(params);
    
```

Exemplo 8-20 Exemplo de Código Usando a Classe SSLServerSocket para Reconhecer SNI

O exemplo de código a seguir ilustra como as aplicações servidor podem usar a classe `SNIMatcher` para decidir como reconhecer a indicação de nome de servidor:
```
     
    SSLServerSocket sslServerSocket = ...;
    
    SNIMatcher matcher = SNIHostName.createSNIMatcher("www\\.example\\.(com|org)");
    Collection<SNIMatcher> matchers = new ArrayList<>(1);
    matchers.add(matcher);
    
    SSLParameters params = sslServerSocket.getSSLParameters();
    params.setSNIMatchers(matchers);
    sslServerSocket.setSSLParameters(params);
    
    SSLSocket sslSocket = sslServerSocket.accept();
    
```

A lista a seguir fornece exemplos do comportamento do `SNIMatcher` ao receber várias solicitações de indicação de nome de servidor na mensagem ClientHello:

  * Matcher configurado para `www\\.example\\.com`:
    * Se o nome de host solicitado for `www.example.com`, ele será aceito e uma confirmação será enviada na mensagem ServerHello.
    * Se o nome de host solicitado for `www.example.org`, ele será rejeitado com um erro fatal `unrecognized_name`.
    * Se não houver nome de host solicitado ou ele estiver vazio, a solicitação será aceita, mas nenhuma confirmação será enviada na mensagem ServerHello.
  * Matcher configurado para `www\\.invalid\\.com`:
    * Se o nome de host solicitado for `www.example.com`, ele será rejeitado com um erro fatal `unrecognized_name`.
    * Se o nome de host solicitado for `www.example.org`, ele será aceito e uma confirmação será enviada na mensagem ServerHello.
    * Se não houver nome de host solicitado ou ele estiver vazio, a solicitação será aceita, mas nenhuma confirmação será enviada na mensagem ServerHello.
  * Matcher não configurado:

Qualquer nome de host solicitado será aceito, mas nenhuma confirmação será enviada na mensagem ServerHello.

Para descrições de novas classes que implementam a extensão SNI, consulte:

  * [StandardConstants Class](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)
  * [SNIServerName Class](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)
  * [SNIMatcher Class](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)
  * [SNIHostName Class](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)

Para exemplos, consulte [Using the Server Name Indication (SNI) Extension](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

### TLS Application Layer Protocol Negotiation

Negocie um protocolo de aplicação para uma conexão TLS com Application Layer Protocol Negotiation (ALPN).

O que é ALPN?

Algumas aplicações podem querer ou precisar negociar um valor de nível de aplicação compartilhado antes que um handshake TLS seja concluído. Por exemplo, HTTP/2 usa o mecanismo de Application Layer Protocol Negotiation para ajudar a estabelecer qual versão HTTP ("h2", "spdy/3", "http/1.1") pode ou será usada em uma porta TCP ou UDP específica. ALPN ([RFC 7301](<https://www.rfc-editor.org/rfc/rfc7301.txt>)) faz isso sem adicionar viagens de ida e volta na rede entre o cliente e o servidor. No caso do HTTP/2, o protocolo deve ser estabelecido antes que a conexão seja negociada, já que cliente e servidor precisam saber qual versão do HTTP usar antes de começarem a se comunicar. Sem ALPN, não seria possível ter os protocolos de aplicação HTTP/1 e HTTP/2 na mesma porta.

O cliente usa a extensão ALPN no início do handshake TLS para enviar uma lista de protocolos de aplicação suportados ao servidor como parte do `ClientHello`. O servidor lê a lista de protocolos de aplicação suportados no `ClientHello` e determina qual dos protocolos suportados ele prefere. Ele então envia uma mensagem `ServerHello` de volta ao cliente com o resultado da negociação. A mensagem pode conter o nome do protocolo que foi escolhido ou que nenhum protocolo foi escolhido.

A negociação do protocolo de aplicação pode, assim, ser realizada dentro do handshake TLS, sem adicionar viagens de ida e volta na rede, e permite que o servidor associe um certificado diferente a cada protocolo de aplicação, se desejado.

Ao contrário de muitas outras extensões TLS, esta extensão não estabelece propriedades da sessão, apenas da conexão. É por isso que você encontrará os valores negociados no `SSLSocket`/`SSLEngine`, e não no `SSLSession`. Quando a retomada de sessão ou tickets de sessão são usados (consulte [TLS Session Resumption without Server-Side State](<http://www.rfc-editor.org/rfc/rfc5077.txt>)), os valores previamente negociados são irrelevantes, e apenas os valores nas novas mensagens de handshake são considerados.

#### Configurando ALPN no Cliente

Configure os valores de Application Layer Protocol Negotiation (ALPN) suportados pelo cliente para enviar ao servidor chamando o método `SSLParameters.setApplicationProtocols(String[])`, seguido pelo método `setSSLParameters` de `SSLSocket` ou `SSLEngine`. Durante o handshake com o servidor, o servidor lerá a lista de protocolos de aplicação do cliente e determinará qual é o mais adequado.

Exemplo 8-21 Exemplo de Código para Definir e Obter Valores ALPN em um Cliente Java

Por exemplo, aqui estão os passos para definir os valores ALPN de `"three"` e `"two"` no cliente.

Para executar o código, a propriedade `javax.net.ssl.trustStore` deve ser definida para um certificado raiz válido. (Isso pode ser feito na linha de comando).
```
    import java.io.*;
    import java.util.*;
    import javax.net.ssl.*;
    public class SSLClient {
        public static void main(String[] args) throws Exception {
    
            // Code for creating a client side SSLSocket
            SSLSocketFactory sslsf = (SSLSocketFactory) SSLSocketFactory.getDefault();
            SSLSocket sslSocket = (SSLSocket) sslsf.createSocket("localhost", 9999);
    
            // Get an SSLParameters object from the SSLSocket
            SSLParameters sslp = sslSocket.getSSLParameters();
    
            // Populate SSLParameters with the ALPN values
            // On the client side the order doesn't matter as
            // when connecting to a JDK server, the server's list takes priority
            String[] clientAPs = {"three", "two"};
            sslp.setApplicationProtocols(clientAPs);
    
            // Populate the SSLSocket object with the SSLParameters object
            // containing the ALPN values
            sslSocket.setSSLParameters(sslp);
    
            sslSocket.startHandshake();
    
            // After the handshake, get the application protocol that has been negotiated
            String ap = sslSocket.getApplicationProtocol();
            System.out.println("Application Protocol client side: \"" + ap + "\"");
    
            // Do simple write/read
            InputStream sslIS = sslSocket.getInputStream();
            OutputStream sslOS = sslSocket.getOutputStream();
            sslOS.write(280);
            sslOS.flush();
            sslIS.read();
            sslSocket.close();
        }
    }
```

Quando este código é executado, ele envia uma mensagem `ClientHello` para um servidor Java que definiu os valores ALPN `one`, `two` e `three`. O código imprime a seguinte saída:
```
    Application Protocol client side: two
```

Também é possível verificar os resultados da negociação durante o handshaking. Consulte [Determining Negotiated ALPN Value during Handshaking](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

#### Configurando ALPN Padrão no Servidor

Use o mecanismo ALPN padrão para determinar um protocolo de aplicação adequado definindo valores ALPN no servidor.

Para usar o mecanismo padrão para ALPN no servidor, preencha um objeto `SSLParameters` com os valores ALPN que você deseja definir e, em seguida, use este objeto `SSLParameters` para preencher o objeto `SSLSocket` ou o objeto `SSLEngine` com esses parâmetros, como você fez ao configurar o ALPN no cliente (consulte a seção [Setting up ALPN on the Client](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)). O primeiro valor dos valores ALPN definidos no servidor que corresponder a qualquer um dos valores ALPN contidos no `ClientHello` será escolhido e retornado ao cliente como parte do `ServerHello`.

Exemplo 8-22 Exemplo de Código para Negociação de Valor ALPN Padrão no Servidor

Aqui está o código para um servidor Java que usa a abordagem padrão para negociação de protocolo. Para executar o código, a propriedade `javax.net.ssl.keyStore` deve ser definida para um keystore válido. (Isso pode ser feito na linha de comando, consulte [Creating a Keystore to Use with JSSE](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)).
```
    import java.util.*;
    import javax.net.ssl.*;
    public class SSLServer {
        public static void main(String[] args) throws Exception {
    
            // Code for creating a server side SSLSocket
            SSLServerSocketFactory sslssf =
                (SSLServerSocketFactory) SSLServerSocketFactory.getDefault();
            SSLServerSocket sslServerSocket =
                (SSLServerSocket) sslssf.createServerSocket(9999);
            SSLSocket sslSocket = (SSLSocket) sslServerSocket.accept();
    
            // Get an SSLParameters object from the SSLSocket
            SSLParameters sslp = sslSocket.getSSLParameters();
    
            // Populate SSLParameters with the ALPN values
            // As this is server side, put them in order of preference
            String[] serverAPs ={ "one", "two", "three" };
            sslp.setApplicationProtocols(serverAPs);
    
            // If necessary at any time, get the ALPN values set on the
            // SSLParameters object with:
            // String serverAPs = sslp.setApplicationProtocols();
    
            // Populate the SSLSocket object with the ALPN values
            sslSocket.setSSLParameters(sslp);
    
            sslSocket.startHandshake();
    
            // After the handshake, get the application protocol that
            // has been negotiated
    
            String ap = sslSocket.getApplicationProtocol();
            System.out.println("Application Protocol server side: \"" + ap + "\"");
    
            // Continue with the work of the server
            InputStream sslIS = sslSocket.getInputStream();
            OutputStream sslOS = sslSocket.getOutputStream();
            sslIS.read();
            sslOS.write(85);
            sslOS.flush();
            sslSocket.close();
        }
    }
```

Quando este código é executado e um cliente Java envia um `ClientHello` com os valores ALPN `three` e `two`, a saída é:
```
    Application Protocol server side: two
```

Também é possível verificar os resultados da negociação durante o handshaking. Consulte [Determining Negotiated ALPN Value during Handshaking](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

#### Configurando ALPN Personalizado no Servidor

Use o mecanismo ALPN personalizado para determinar um protocolo de aplicação adequado configurando um método de callback.

Se você não quiser usar o protocolo de negociação padrão do servidor, você pode usar o método `setHandshakeApplicationProtocolSelector` de `SSLEngine` ou `SSLSocket` para registrar um callback `BiFunction` (lambda) que pode examinar o estado do handshake até o momento e, em seguida, fazer sua seleção com base na lista de protocolos de aplicação do cliente e em qualquer outra informação relevante. Por exemplo, você pode considerar usar a suíte de cifras sugerida, ou a Server Name Indication (SNI) ou quaisquer outros dados que você possa obter ao fazer a escolha. Se a negociação personalizada for usada, os valores definidos pelo método `setApplicationProtocols` (negociação padrão) serão ignorados.

Exemplo 8-23 Exemplo de Código para Negociação de Valor ALPN Personalizado no Servidor

Aqui está o código para um servidor Java que usa o mecanismo personalizado para negociação de protocolo. Para executar o código, a propriedade `javax.net.ssl.keyStore` deve ser definida para um certificado válido. (Isso pode ser feito na linha de comando, consulte [Creating a Keystore to Use with JSSE](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)).
```
    import java.util.*;
    import javax.net.ssl.*;
    
    public class SSLServer {
        public static void main(String[] args) throws Exception {
    
            // Code for creating a server side SSLSocket
    
            SSLServerSocketFactory sslssf =
                (SSLServerSocketFactory) SSLServerSocketFactory.getDefault();
            SSLServerSocket sslServerSocket =
                (SSLServerSocket) sslssf.createServerSocket(9999);
            SSLSocket sslSocket = (SSLSocket) sslServerSocket.accept();
    
            // Code to set up a callback function
            // Pass in the current SSLSocket to be inspected and client AP values
    
            sslSocket.setHandshakeApplicationProtocolSelector(
                (serverSocket, clientProtocols) -> {
                    SSLSession handshakeSession = serverSocket.getHandshakeSession();
    
                    // callback function called with current SSLSocket and client AP values
                    // plus any other useful information to help determine appropriate
                    // application protocol. Here the protocol and ciphersuite are also
                    // passed to the callback function.
    
                    return chooseApplicationProtocol(
                        serverSocket,
                        clientProtocols,
                        handshakeSession.getProtocol(),
                        handshakeSession.getCipherSuite());
             });
    
            sslSocket.startHandshake();
    
            // After the handshake, get the application protocol that has been
            // returned from the callback method.
    
            String ap = sslSocket.getApplicationProtocol();
            System.out.println("Application Protocol server side: \"" + ap + "\"");
    
            // Continue with the work of the server
    
            InputStream sslIS = sslSocket.getInputStream();
            OutputStream sslOS = sslSocket.getOutputStream();
            sslIS.read();
            sslOS.write(85);
            sslOS.flush();
            sslSocket.close();
        }
    
        // The callback method. Note how the parameters match the call within
        // the setHandshakeApplicationProtocolSelector method.
    
        public static String chooseApplicationProtocol(SSLSocket serverSocket,
                List<String> clientProtocols, String protocol, String cipherSuite ) {
            // For example, check the cipher suite and return an application protocol
            // value based on that.
            if (cipherSuite.equals("<--a_particular_ciphersuite-->")) {
                return "three";
            } else {
                return "";
            }
        }
    }
```

Se a suíte de cifras corresponder àquela que você especifica na declaração de condição quando este código é executado, então o valor `three` será retornado. Caso contrário, uma string vazia será retornada.

Observe que o valor de retorno do objeto `BiFunction` é uma `String`, que será o nome do protocolo de aplicação, ou null para indicar que nenhum dos nomes anunciados é aceitável. Se o valor de retorno for uma `String` vazia, as indicações de protocolo de aplicação não serão usadas. Se o valor de retorno for null (nenhum valor escolhido) ou for um valor que não foi anunciado pelo par, o protocolo subjacente determinará qual ação tomar. (Por exemplo, o código do servidor enviará um alerta "no_application_protocol" e encerrará a conexão.)

Após a conclusão do handshaking tanto no cliente quanto no servidor, você pode verificar o resultado da negociação chamando o método `getApplicationProtocol` no objeto `SSLSocket` ou no objeto `SSLEngine`.

#### Determinando o Valor ALPN Negociado durante o Handshaking

Para determinar o valor ALPN que foi negociado durante o handshaking, crie uma classe `KeyManager` ou `TrustManager` personalizada e inclua nesta classe personalizada uma chamada para o método `getHandshakeApplicationProtocol`.

Existem alguns casos de uso em que os valores ALPN e SNI selecionados afetarão as escolhas feitas por um `KeyManager` ou `TrustManager`. Por exemplo, uma aplicação pode querer selecionar diferentes conjuntos de certificados/chaves privadas dependendo dos atributos do servidor e dos valores ALPN/SNI/ciphersuite escolhidos.

O exemplo de código fornecido ilustra como chamar o método `getHandshakeApplicationProtocol` de dentro de um `X509ExtendedKeyManager` personalizado que você cria e registra como o objeto `KeyManager`.

Exemplo 8-24 Exemplo de Código para um KeyManager Personalizado

Este exemplo mostra o código completo para um `KeyManager` personalizado que estende `X509ExtendedKeyManager`. A maioria dos métodos simplesmente retorna o valor retornado da classe `KeyManager` que está sendo encapsulada por esta classe `MyX509ExtendedKeyManager`. No entanto, o método `chooseServerAlias` chama o `getHandshakeApplicationProtocol` no objeto `SSLSocket` e, portanto, pode determinar o valor ALPN negociado atual.
```
    
    import java.net.Socket;
    import java.security.*;
    import javax.net.ssl.*;
    
    public class MyX509ExtendedKeyManager extends X509ExtendedKeyManager {
    
        // X509ExtendedKeyManager is an abstract class so your new class 
        // needs to implement all the abstract methods in this class. 
        // The easiest way to do this is to wrap an existing KeyManager
        // and call its methods for each of the methods you need to implement.   
    
        X509ExtendedKeyManager akm;
        
        public MyX509ExtendedKeyManager(X509ExtendedKeyManager akm) {
            this.akm = akm;
        }
    
        @Override
        public String[] getClientAliases(String keyType, Principal[] issuers) {
            return akm.getClientAliases(keyType, issuers);
        }
    
        @Override
        public String chooseClientAlias(String[] keyType, Principal[] issuers, 
            Socket socket) {
            return akm.chooseClientAlias(keyType, issuers, socket);
        }
    
        @Override
        public String chooseServerAlias(String keyType, Principal[] issuers, 
            Socket socket) {
            
            // This method has access to a Socket, so it is possible to call the
            // getHandshakeApplicationProtocol method here. Note the cast from 
            // a Socket to an SSLSocket
            String ap = ((SSLSocket) socket).getHandshakeApplicationProtocol();
            System.out.println("In chooseServerAlias, ap is: " + ap);
            return akm.chooseServerAlias(keyType, issuers, socket);
        }
    
        @Override
        public String[] getServerAliases(String keyType, Principal[] issuers) {
            return akm.getServerAliases(keyType, issuers);
        }
    
        @Override
        public X509Certificate[] getCertificateChain(String alias) {
            return akm.getCertificateChain(alias);
        }
    
        @Override
        public PrivateKey getPrivateKey(String alias) {
            return akm.getPrivateKey(alias);
        }
    }
```

Quando este código é registrado como o `KeyManager` para um servidor Java e um cliente Java envia um `ClientHello` com valores ALPN, a saída será:
```
        In chooseServerAlias, ap is: <negotiated value>
```

Exemplo 8-25 Exemplo de Código para Usar um KeyManager Personalizado em um Servidor Java

Este exemplo mostra um servidor Java simples que usa a estratégia de negociação ALPN padrão e o `KeyManager` personalizado, `MyX509ExtendedKeyManager`, mostrado no exemplo de código anterior.
```
    import java.io.*;
    import java.util.*;
    import javax.net.ssl.*;
    import java.security.KeyStore;
    
    public class SSLServerHandshake {
        
        public static void main(String[] args) throws Exception {
            SSLContext ctx = SSLContext.getInstance("TLS");
    
            // You need to explicitly create a create a custom KeyManager
    
            // Keystores
            KeyStore keyKS = KeyStore.getInstance("PKCS12");
            keyKS.load(new FileInputStream("serverCert.p12"), 
                "password".toCharArray());
    
            // Generate KeyManager
            KeyManagerFactory kmf = KeyManagerFactory.getInstance("PKIX");
            kmf.init(keyKS, "password".toCharArray());
            KeyManager[] kms = kmf.getKeyManagers();
    
            // Code to substitute MyX509ExtendedKeyManager
            if (!(kms[0] instanceof X509ExtendedKeyManager)) {
                throw new Exception("kms[0] not X509ExtendedKeyManager");
            }
    
            // Create a new KeyManager array and set the first index 
            // of the array to an instance of MyX509ExtendedKeyManager.
            // Notice how creating this object is done by passing in the 
            // existing default X509ExtendedKeyManager 
            kms = new KeyManager[] { 
                new MyX509ExtendedKeyManager((X509ExtendedKeyManager) kms[0])};
    
            // Initialize SSLContext using the new KeyManager
            ctx.init(kms, null, null);
    
            // Instead of using SSLServerSocketFactory.getDefault(), 
            // get a SSLServerSocketFactory based on the SSLContext
            SSLServerSocketFactory sslssf = ctx.getServerSocketFactory();
            SSLServerSocket sslServerSocket = 
                (SSLServerSocket) sslssf.createServerSocket(9999);
            SSLSocket sslSocket = (SSLSocket) sslServerSocket.accept();
            SSLParameters sslp = sslSocket.getSSLParameters();
            String[] serverAPs ={"one","two","three"};
            sslp.setApplicationProtocols(serverAPs);
            sslSocket.setSSLParameters(sslp);
            sslSocket.startHandshake();
    
            String ap = sslSocket.getApplicationProtocol();
            System.out.println("Application Protocol server side: \"" + ap + "\"");
    
            InputStream sslIS = sslSocket.getInputStream();
            OutputStream sslOS = sslSocket.getOutputStream();
            sslIS.read();
            sslOS.write(85);
            sslOS.flush();
    
            sslSocket.close();
            sslServerSocket.close();
        }
    }
```

Com o `X509ExtendedKeyManager` personalizado em vigor, quando `chooseServerAlias` é chamado durante o handshaking, o `KeyManager` tem a oportunidade de examinar o valor do protocolo de aplicação negociado. No caso do exemplo mostrado, este valor é exibido no console.

Por exemplo, quando este código é executado e um cliente Java envia um `ClientHello` com os valores ALPN `three` e `two`, a saída será:
```
    Application Protocol server side: two
```

#### Lendo e Escrevendo Valores ALPN com o Provedor SunJSSE

ALPN transporta dados com byte arrays, o que significa que ele espera que o texto seja codificado com codificações de caracteres de byte único, como US-ASCII. As APIs Java ALPN usam a classe String para texto, mas antes do Java SE 16/11.0.2/8u301, o provedor SunJSSE convertia instâncias de String para byte arrays com UTF-8. No entanto, UTF-8 é uma codificação de caracteres de largura variável. Ele codifica caracteres acima de U+007F com mais de um byte, o que pode não ser esperado por um par ALPN.

No Java SE 16/11.0.2/8u301 e posterior, o provedor SunJSSE codifica e decodifica caracteres String como caracteres ISO_8859_1/LATIN-1 de 8 bits.

Os valores ALPN agora são representados usando a representação de byte de rede esperada pelo par, o que não deve exigir modificação para instâncias de String baseadas em ASCII de 7 bits padrão.

Os métodos em `javax.net.ssl.SSLSocket` e `javax.net.ssl.SSLEngine` retornam valores de String ApplicationProtocol na representação de byte de rede enviada pelo par.
No entanto, se você tiver dados Unicode com caracteres acima de U+007F, então sua aplicação deve codificá-los ou decodificá-los corretamente para arrays de bytes antes de enviá-los ou recebê-los, em vez de depender do provedor SunJSSE para codificar ou decodificar automaticamente caracteres Unicode. Alternativamente, você pode definir a propriedade de segurança `jdk.tls.alpnCharset` para UTF-8 para reverter ao comportamento anterior.

Para comparar valores ALPN com seus valores esperados, você pode convertê-los para arrays de bytes e então compará-los.

Os valores ALPN esperados no exemplo a seguir são a string `http/1.1` e a string codificada em UTF-8 (em hexadecimal) `0xABCD0xABCE0xABCF` (que são as letras Meetei Mayek "HUK UN I"). O exemplo converte o valor ALPN para um array de bytes com ISO-8859-1, converte `http/1.1` para um array de bytes com UTF-8 e especifica manualmente a representação em array de bytes de `0xABCD0xABCE0xABCF`.
```java
        // Get the ALPN value negotiated by the TLS handshake currently
        // in progress
    
        String networkString = sslEngine.getHandshakeApplicationProtocol();
        
        // Encode the ALPN value into a byte array with the ISO-8859-1
        // character encoding
            
        byte[] bytes = networkString.getBytes(StandardCharsets.ISO_8859_1);
      
        String HTTP1_1 = "http/1.1";
        
        // Encode the String "http/1.1" into a byte array with the
        // UTF-8 character set
        
        byte[] HTTP1_1_BYTES = HTTP1_1.getBytes(StandardCharsets.UTF_8);
        
        // Create a byte array representing the Unicode characters 0xABCD,
        // 0xABCE, and 0xABCF, which are the Meetei Mayek letters "HUK UN I"
    
        byte[] HUK_UN_I_BYTES = new byte[] {
            (byte) 0xab, (byte) 0xcd,
            (byte) 0xab, (byte) 0xce,
            (byte) 0xab, (byte) 0xcf};
            
        // Test whether the APLN value is equal to "http/1.1" or
        // 0xABCD0xABCE0xABCF
    
        if ((Arrays.compare(bytes, HTTP1_1_BYTES) == 0 ) ||
            Arrays.compare(bytes, HUK_UN_I_BYTES) == 0) {
            // ...
        }
```

Alternativamente, você pode comparar valores ALPN com o método `String.equals()` se souber que o valor ALPN foi codificado a partir de uma String usando um determinado conjunto de caracteres, por exemplo, UTF-8. Você deve decodificar o valor ALPN para uma String Unicode antes de compará-lo.
```java
        String unicodeString = new String(bytes, StandardCharsets.UTF_8);
        if (unicodeString.equals(HTTP1_1) ||
            unicodeString.equals("\uabcd\uabce\uabcf")) {
            // ...
        }
```

Para o método `javax.net.ssl.SSLParameters.setApplicationProtocols(String[] protocols)`, você deve converter seus argumentos `String` para a representação de byte de rede esperada pelo peer. Por exemplo, se o peer espera valores ALPN em UTF-8, você deve convertê-lo para um array de bytes com UTF-8 e então armazená-lo como uma String orientada a bytes:
```java
    // Convert Meetei Mayek letters "HUK UN I" (in hexadecimal, 0xABCD0xABCE0xABCF)
    // to a byte array with UTF-8
    byte[] bytes = "\uabcd\uabce\uabcf".getBytes(StandardCharsets.UTF_8);
    
    // Create a byte-oriented String with ISO-8859-1
    String HUK_UN_I = new String(bytes, StandardCharsets.ISO_8859_1);
    
    // GREASE value {0x8A, 0x8A}
    String rfc7301Grease8A = "\u008A\u008A";
    SSLParameters p = sslSocket.getSSLParameters();
    p.setApplicationProtocols(new String[] {"h2", "http/1.1", rfc7301Grease8A, HUK_UN_I});
    sslSocket.setSSLParameters(p);
```

No início do handshake TLS, o cliente envia uma lista de valores ALPN para o servidor, e o servidor seleciona quais valores ele pode usar e ignora aqueles que não reconhece. No entanto, uma implementação TLS falha pode, em vez disso, rejeitar valores ALPN não reconhecidos, o que pode impedir o handshake de prosseguir, mas desenvolvedores ou administradores podem não notar essa falha porque ela ainda permitirá que clientes e servidores cujos valores ALPN ela reconhece se conectem.

Consequentemente, a especificação TLS introduziu os valores GREASE (Generate Random Extensions And Sustain Extensibility): um conjunto reservado de valores de protocolo TLS que uma implementação TLS pode anunciar aleatoriamente para garantir que os peers lidem corretamente com valores não reconhecidos.

No exemplo anterior, um dos valores passados para o método `setApplicationProtocols`, `rfc7301Grease8A`, é um valor GREASE. O peer deve ignorá-lo em vez de rejeitá-lo.

#### Classes e Métodos Relacionados ao ALPN

Essas classes e métodos são usados ao trabalhar com Application Layer Protocol Negotiation (ALPN).

Classes e Métodos a Usar

`SSLEngine` e `SSLSocket` contêm os mesmos métodos relacionados ao ALPN e possuem a mesma funcionalidade.

| Classe | Método | Propósito |
|---|---|---|
| `SSLParameters` | `public String[] getApplicationProtocols();` | Lado do cliente e lado do servidor: use o método para retornar um array de `String` contendo cada protocolo definido. |
| `SSLParameters` | `public void setApplicationProtocols([] protocols);` | Lado do cliente: use o método para definir os protocolos que podem ser escolhidos pelo servidor. Lado do servidor: use o método para definir os protocolos que o servidor pode usar. O array de String deve conter os protocolos em ordem de preferência. |
| `SSLEngine`SSLSocket` | `public String getApplicationProtocol();` | Lado do cliente e lado do servidor: use o método após a conclusão da negociação do protocolo TLS para retornar uma `String` contendo o protocolo que foi escolhido para a conexão. |
| `SSLEngine`SSLSocket` | `public String getHandshakeApplicationProtocol();` | Lado do cliente e lado do servidor: use o método durante o handshake para retornar uma `String` contendo o protocolo que foi escolhido para a conexão. Se este método for chamado antes ou depois do handshake, ele retornará null. Consulte [Determining Negotiated ALPN Value during Handshaking](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) para obter instruções sobre como chamar este método. |
| `SSLEngine`SSLSocket` | `public void setHandshakeApplicationProtocolSelector(BiFunction,String> selector)` | Lado do servidor: use o método para registrar uma função de callback. O valor do protocolo da aplicação pode então ser definido no callback com base em qualquer informação disponível, por exemplo, o protocolo ou a suíte de cifras. Consulte [Setting up Custom ALPN on the Server](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) para obter instruções sobre como usar este método. |

### Solução de Problemas do JSSE

Esta seção contém informações para solucionar problemas do JSSE. Primeiro, ela fornece alguns [Problemas de Configuração](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) comuns e maneiras de resolvê-los, e então descreve [Utilitários de Depuração](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) úteis.

#### Problemas de Configuração

Soluções para alguns problemas comuns de configuração.

##### SSLHandshakeException: Nenhum Esquema de Autenticação Disponível, Falha no Handshake

Problema: O servidor lança esta exceção:
```java
    javax.net.ssl.SSLHandshakeException: No available authentication scheme
```

O cliente então recebe um alerta fatal:
```java
    javax.net.ssl.SSLHandshakeException: Received fatal alert: handshake_failure
```

Causa: O servidor lança esta `SSLHandshakeException` se TLSv1.3 for escolhido como a versão do protocolo e apenas certificados DSA estiverem disponíveis no keymanager do servidor. Verifique isso com o comando `keytool`; altere `testkeys.dsa` para o nome do seu keystore:
```java
    keytool -list -keystore testkeys.dsa -v
    
    Enter keystore password:
    Keystore type: PKCS12
    Keystore provider: SUN
    
    Your keystore contains 1 entry
    
    Alias name: localhost
    Creation date: Sep 19, 2018
    Entry type: PrivateKeyEntry
    Certificate chain length: 1
    Certificate[1]: Owner: CN=localhost, OU=Widget, O=Ficticious, L=Sunnyvale, ST=CA, C=US Issuer: CN=localhost, OU=Widget, O=Ficticious, L=Sunnyvale, ST=CA, C=US
    
    ...deleted...
    
    Signature algorithm name: SHA256withDSA
    Subject Public Key Algorithm: 2048-bit DSA key
    
    ...deleted...
    
```

Solução: Atualize seus certificados para que eles contenham chaves públicas RSA ou EC.

##### CertificateException Durante o Handshake

Problema: Ao negociar uma conexão TLS/DTLS, o cliente ou servidor lança uma `CertificateException`.

Causa 1: Isso geralmente é causado pelo lado remoto enviando um certificado que é desconhecido para o lado local.

Solução 1: A melhor maneira de depurar este tipo de problema é ativar a depuração (consulte [Utilitários de Depuração](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)) e observar quando os certificados são carregados e quando os certificados são recebidos pela conexão de rede. Muito provavelmente, o certificado recebido é desconhecido para o mecanismo de confiança porque o arquivo de confiança errado foi carregado.

Consulte as seguintes seções:

  * [Classes e Interfaces JSSE](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)
  * [Interface TrustManager](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)
  * [Interface KeyManager](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)

Causa 2: O relógio do sistema não está configurado corretamente. Neste caso, o tempo percebido pode estar fora do período de validade de um dos certificados, e a menos que o certificado possa ser substituído por um válido de um truststore, o sistema deve assumir que o certificado é inválido e, portanto, lançar a exceção.

Solução 2: Corrija a hora do relógio do sistema.

##### Exceção de Tempo de Execução: Serviço SSL Não Disponível

Problema: Ao executar um programa que usa JSSE, ocorre uma exceção indicando que um serviço SSL não está disponível. Por exemplo, uma exceção semelhante a uma das seguintes é lançada:
```java
        Exception in thread "main" java.net.SocketException:
            no SSL Server Sockets
        
        Exception in thread "main":
            SSL implementation not available
    
```

Causa: Houve um problema com a inicialização do `SSLContext`, por exemplo, devido a uma senha incorreta em um keystore ou um keystore corrompido (um fornecedor de JDK uma vez enviou um keystore em um formato desconhecido, e isso causou este tipo de erro).

Solução: Verifique os parâmetros de inicialização. Certifique-se de que quaisquer keystores especificados sejam válidos e que as senhas especificadas estejam corretas. Uma maneira de verificar isso é tentando usar o `keytool` para examinar os keystores e os conteúdos relevantes. Consulte [`keytool`](<#/>) nas Especificações da Ferramenta do Java Development Kit.

##### Exceção de Tempo de Execução: "Nenhum certificado disponível correspondente às suítes de cifras SSL que estão habilitadas"

Problema: Ao tentar executar um programa de servidor SSL simples, a seguinte exceção é lançada:
```java
        Exception in thread "main" javax.net.ssl.SSLException:
            No available certificate corresponding to the SSL cipher suites which are enabled...
    
```

Causa: Várias suítes de cifras exigem certos tipos de material de chave. Por exemplo, se uma suíte de cifras RSA estiver habilitada, então um `keyEntry` RSA deve estar disponível no keystore. Se nenhuma chave desse tipo estiver disponível, então esta suíte de cifras não poderá ser usada. Esta exceção é lançada se não houver entradas de chave disponíveis para todas as suítes de cifras habilitadas.

Solução: Crie entradas de chave para os vários tipos de suíte de cifras, ou use uma suíte anônima. As suítes de cifras anônimas são inerentemente perigosas porque são vulneráveis a ataques MITM (man-in-the-middle). Consulte [RFC 5246: The Transport Layer Security (TLS) Protocol, Version 1.2](<https://tools.ietf.org/html/rfc5246>).

Consulte as seguintes seções para aprender como passar o keystore e os certificados corretos:

  * [Classes e Interfaces JSSE](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)
  * [Personalizando os Keystores e Truststores Padrão, Tipos de Armazenamento e Senhas de Armazenamento](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)
  * [O Formato de Keystore PKCS12](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)

##### Exceção de Tempo de Execução: Nenhuma Suíte de Cifras em Comum

Problema 1: Durante o handshake, o cliente e/ou o servidor lançam esta exceção.

Causa 1: Ambos os lados de uma conexão TLS devem concordar em uma suíte de cifras comum. Se a interseção do conjunto de suítes de cifras do cliente com o conjunto de suítes de cifras do servidor estiver vazia, você verá esta exceção.

Solução 1: Configure as suítes de cifras habilitadas para incluir suítes de cifras comuns e certifique-se de fornecer um `keyEntry` apropriado para suítes de cifras assimétricas. Consulte também [Exceção de Tempo de Execução: "Nenhum certificado disponível correspondente às suítes de cifras SSL que estão habilitadas"](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) nesta seção.

Problema 2: Ao usar Mozilla Firefox ou Microsoft Internet Explorer para acessar arquivos em um servidor que possui apenas certificados baseados em DSA, ocorre uma exceção de tempo de execução indicando que não há suítes de cifras em comum.

Causa 2: Por padrão, os `keyEntries` criados com `keytool` usam chaves públicas DSA. Se apenas `keyEntries` DSA existirem no keystore, então apenas suítes de cifras baseadas em DSA podem ser usadas. Por padrão, Firefox e Internet Explorer enviam apenas suítes de cifras baseadas em RSA. Como a interseção dos conjuntos de suítes de cifras do cliente e do servidor está vazia, esta exceção é lançada.

Solução 2: Para interagir com Firefox ou Internet Explorer, você deve criar certificados que usem chaves baseadas em RSA. Para fazer isso, especifique a opção `-keyalg RSA` ao usar `keytool`. Por exemplo:
```java
    keytool -genkeypair -alias duke -keystore testkeys -keyalg rsa
    
```

##### Socket Desconectado Após Enviar Mensagem ClientHello

Problema: Um socket tenta se conectar, envia uma mensagem ClientHello e é imediatamente desconectado.

Causa: Alguns servidores TLS se desconectarão se uma mensagem ClientHello for recebida em um formato que eles não entendem ou com um número de versão de protocolo que eles não suportam.

Solução: Tente ajustar os protocolos habilitados no lado do cliente. Isso envolve modificar ou invocar algumas das seguintes propriedades e métodos do sistema:

  * Propriedade do sistema [`https.protocols`](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) para a classe `[`HttpsURLConnection`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/HttpsURLConnection.html>)`
  * Propriedade do sistema [jdk.tls.client.protocols](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)
  * Método [`SSLContext.getInstance`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLContext.html#getInstance\(java.lang.String\)>)
  * Método [`SSLEngine.setEnabledProtocols`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLEngine.html#setEnabledProtocols\(java.lang.String\[\]\)>)
  * Método [`SSLSocket.setEnabledProtocols`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLSocket.html#setEnabledProtocols\(java.lang.String\[\]\)>)
  * Métodos [`SSLParameters.setProtocols`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLParameters.html#setProtocols\(java.lang.String\[\]\)>) e [`SSLEngine.setSSLParameters`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLEngine.html#setSSLParameters\(javax.net.ssl.SSLParameters\)>)
  * Métodos [`SSLParameters.setProtocols`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLParameters.html#setProtocols\(java.lang.String\[\]\)>) e [`SSLSocket.setSSLParameters`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLSocket.html#setSSLParameters\(javax.net.ssl.SSLParameters\)>)

Para compatibilidade retroativa, algumas implementações TLS (como SunJSSE) podem enviar mensagens TLS ClientHello encapsuladas no formato SSLv2 ClientHello. O provedor SunJSSE suporta este recurso. Se você quiser usar este recurso, adicione o protocolo "SSLv2Hello" à lista de protocolos habilitados, se necessário. (Consulte Protocolos em [Provedores JDK](<#/doc/guides/security/oracle-providers>), que lista os protocolos que são habilitados por padrão para o provedor SunJSSE.)

Os padrões RFC do TLS exigem que as implementações negociem para a versão mais recente que ambos os lados suportam, mas algumas implementações não conformes simplesmente desligam se apresentadas com uma versão que não entendem. Por exemplo, algumas implementações de servidor mais antigas que falam apenas SSLv3 serão encerradas se TLSv1.2 for solicitado. Nesta situação, considere usar um esquema de fallback de versão TLS:

  1. Faça fallback de TLSv1.2 para TLSv1.1 se o servidor não entender TLSv1.2.
  2. Faça fallback de TLSv1.1 para TLSv1.0 se a etapa anterior não funcionar.

Por exemplo, se a lista de protocolos habilitados no cliente for TLSv1, TLSv1.1 e TLSv1.2, um esquema típico de fallback de versão TLS pode ser:

  1. Tente conectar-se ao servidor. Se o servidor rejeitar a solicitação de conexão TLS imediatamente, vá para a etapa 2.
  2. Tente o esquema de fallback de versão removendo a versão de protocolo mais alta (por exemplo, TLSv1.2 para a primeira falha) na lista de protocolos habilitados.
  3. Tente conectar-se ao servidor novamente. Se o servidor rejeitar a conexão, vá para a etapa 2, a menos que não haja versão para a qual o servidor possa fazer fallback.
  4. Se a conexão falhar e SSLv2Hello não estiver na lista de protocolos habilitados, restaure a lista de protocolos habilitados e habilite SSLv2Hello. (Por exemplo, a lista de protocolos habilitados deve ser SSLv2Hello, TLSv1, TLSv1.1 e TLSv1.2.) Comece novamente da etapa 1.

Nota:

Um fallback para uma versão anterior normalmente significa uma degradação da força de segurança para um protocolo mais fraco. Não é sugerido usar um esquema de fallback a menos que seja realmente necessário, e você saiba claramente que o servidor não suporta uma versão de protocolo superior.

Nota:

Como parte da desativação do SSLv3, alguns servidores também desativaram o SSLv2Hello, o que significa que as comunicações com clientes SSLv2Hello-ativos (JDK 6u95) falharão. A partir do JDK 7, o SSLv2Hello é desativado por padrão nos clientes, e habilitado nos servidores.

##### SunJSSE Não Consegue Encontrar um Provedor JCA Que Suporte um Algoritmo Necessário e Causa uma NoSuchAlgorithmException

Problema: Um handshake é tentado e falha quando não consegue encontrar um algoritmo necessário. Exemplos podem incluir:
```java
    Exception in thread ...deleted...
        ...deleted...
        Caused by java.security.NoSuchAlgorithmException: Cannot find any
            provider supporting RSA/ECB/PKCS1Padding
    
```

ou
```java
    Caused by java.security.NoSuchAlgorithmException: Cannot find any
        provider supporting AES/CBC/NoPadding
    
```

Causa: O SunJSSE usa JCE para todos os seus algoritmos criptográficos. Se o provedor SunJCE tiver sido desregistrado do mecanismo `Provider` e uma implementação alternativa do JCE não estiver disponível, então esta exceção será lançada.

Solução: Certifique-se de que o SunJCE esteja disponível verificando se o provedor está registrado com a interface `Provider`. Tente executar o seguinte código no contexto de sua conexão SSL:
```java
    import javax.crypto.*;
    
    System.out.println("=====Where did you get AES=====");
    Cipher c = Cipher.getInstance("AES/CBC/NoPadding");
    System.out.println(c.getProvider());
    
```

##### Exceção Lançada ao Obter Recursos da Aplicação de um Servidor Web de Host Virtual Que Requer uma Extensão SNI

Problema: Se você receber uma `Exception` ao tentar obter recursos da aplicação de seu servidor web via TLS, e seu servidor web for implementado como um host virtual que requer uma extensão Server Name Indication (SNI) válida (como o Apache HTTP Server) para distinguir o host virtual, então o servidor web pode não estar configurado corretamente.

Causa: Como o Java SE suporta a extensão SNI no cliente JSSE, o nome do host solicitado do servidor virtual é incluído na primeira mensagem enviada do cliente para o servidor durante o handshake TLS. O servidor pode negar a solicitação de conexão do cliente se o nome do host solicitado (a indicação do nome do servidor) não corresponder ao nome do servidor esperado, que deve ser especificado na configuração do host virtual. Isso dispara um alerta de nome não reconhecido no handshake TLS, o que resulta no lançamento de uma `Exception`.

Solução: Se a causa do problema for `javax.net.ssl.SSLProtocolException: handshake alert: unrecognized_name`, é provável que a configuração do host virtual para SNI esteja incorreta. Se você estiver usando o Apache HTTP Server, consulte [Name-based Virtual Host Support](<https://httpd.apache.org/docs/trunk/vhosts/name-based.html>) sobre como configurar hosts virtuais. Em particular, certifique-se de que a diretiva `ServerName` esteja configurada corretamente em um bloco `<VirtualHost>`.

Consulte o seguinte:

  * [SSL with Virtual Hosts Using SNI](<https://wiki.apache.org/httpd/NameBasedSSLVHostsWithSNI>) do [Apache HTTP Server Wiki](<https://cwiki.apache.org/confluence/display/HTTPD/Home>)
  * [SSL/TLS Strong Encryption: FAQ](<https://httpd.apache.org/docs/trunk/ssl/ssl_faq.html>) da [Documentação do Apache HTTP Server](<https://httpd.apache.org/docs/>)
  * [RFC 3546, Transport Layer Security (TLS) Extensions](<https://www.ietf.org/rfc/rfc3546.txt>)
  * [Bug 7194590: SSL handshaking error caused by virtual server misconfiguration](<http://bugs.java.com/bugdatabase/view_bug.do?bug_id=7194590>)

##### IllegalArgumentException Quando Suítes de Cifras RC4 São Configuradas para DTLS

Problema: Uma exceção `IllegalArgumentException` é lançada quando o algoritmo de suíte de cifras RC4 é especificado no método `SSLEngine.setEnabledCipherSuites(String[] suites)` e o `SSLEngine` é um motor DTLS.
```java
    sslContext = SSLContext.getInstance("DTLS");
    
    // Create the engine
    SSLEngine engine = sslContext.createSSLengine(hostname, port);
    
    String enabledSuites[] = { "SSL_RSA_WITH_RC4_128_SHA" };
    engine.setEnabledCipherSuites(enabledSuites);
```

Causa: De acordo com [DTLS Version 1.0](<https://datatracker.ietf.org/doc/html/rfc4347>) e [DTLS Version 1.2](<https://datatracker.ietf.org/doc/html/rfc6347>), as suítes de cifras RC4 não devem ser usadas com DTLS.

Solução: Não use suítes de cifras baseadas em RC4 para conexões DTLS. Consulte "JSSE Cipher Suite Names" em [Java Security Standard Algorithm Names](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html>).

#### Utilitários de Depuração

O provedor SunJSSE suporta rastreamento de depuração dinâmico. Isso é semelhante ao mecanismo que depura problemas de biblioteca de segurança. O suporte genérico de rastreamento de depuração dinâmico Java é acessado com a propriedade de sistema `java.security.debug`, enquanto o suporte de rastreamento de depuração dinâmico específico do JSSE é acessado com a propriedade de sistema `javax.net.debug`.

Nota:

Atualmente, o provedor SunJSSE usa o utilitário de depuração. Não há garantia de que outros provedores usem o utilitário de depuração. Se outros provedores suportarem o utilitário de depuração, a implementação e a saída podem ser diferentes. Não há garantia de que o utilitário de depuração continuará a existir ou será o mesmo (por exemplo, terá as mesmas opções ou formato de saída) em futuras versões.

Para visualizar as opções do utilitário de depuração dinâmico JSSE, use a seguinte opção de linha de comando no comando `java`, onde `MyApp` é uma aplicação Java existente:
```bash
    java -Djavax.net.debug=help MyApp
```

Nota:

  * A aplicação `MyApp` não será executada depois que as informações de ajuda de depuração forem impressas, pois o código de ajuda faz com que a aplicação seja encerrada.

  * Se você especificar o valor `help` com qualquer utilitário de depuração dinâmico ao executar um programa que não usa nenhuma classe que o utilitário foi projetado para depurar, você não obterá as opções de depuração.

As opções atuais para a propriedade de sistema `javax.net.debug` são:

  * `all`: Ativa toda a depuração
  * `ssl`: Ativa a depuração SSL; todas as informações de depuração SSL são impressas, exceto aquelas geradas pelas opções `data`, `packet` e `plaintext`
  * Sem valor: Se você não especificar nenhum valor para a propriedade de sistema `javax.net.debug`, as bibliotecas de depuração JSSE registrarão em uma instância de [System.Logger](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/System.Logger.html>) chamada `javax.net.ssl`.

O seguinte pode ser usado com a opção `ssl` para selecionar qual tipo de informação de depuração imprimir:

  * `defaultctx`: Imprime a inicialização SSL padrão
  * `handshake`: Imprime cada mensagem de handshake
  * `keygen`: Imprime dados de geração de chave
  * `keymanager`: Imprime o rastreamento do gerenciador de chaves
  * `pluggability`: Imprime o rastreamento de pluggability
  * `record`: Habilita o rastreamento por registro
  * `respmgr`: Imprime o rastreamento do gerenciador de resposta de status
  * `session`: Imprime a atividade da sessão
  * `sessioncache`: Imprime o rastreamento do cache de sessão
  * `sslctx`: Imprime o rastreamento de `SSLContext`
  * `trustmanager`: Imprime o rastreamento do gerenciador de confiança

As mensagens geradas pela opção `handshake` podem ser expandidas com estas opções:

  * `data`: Dump hexadecimal de cada mensagem de handshake
  * `verbose`: Impressão verbosa da mensagem de handshake

As mensagens geradas pela opção `record` podem ser expandidas com estas opções:

  * `plaintext`: Dump hexadecimal do texto simples do registro
  * `packet`: Imprime pacotes SSL/TLS brutos

Para habilitar o rastreamento de depuração dinâmico específico do JSSE, defina o valor da propriedade de sistema `javax.net.debug` (consulte [Como Especificar uma Propriedade java.security.Security](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)) para `all` ou `ssl`. Para a opção `ssl`, para especificar opções adicionais, especifique-as após a opção `ssl`. Você não precisa de um separador entre as opções, embora um separador como dois pontos (`:`) ou uma vírgula (`,`) ajude na legibilidade. Não importa quais separadores você usa, e a ordem das palavras-chave das opções também não é importante.

Para uma introdução à leitura dessas informações de depuração, consulte [Depurando Conexões TLS](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

A seguir estão exemplos de uso da propriedade de sistema `javax.net.debug`:

  * Para visualizar todas as mensagens de depuração:
```bash
 java -Djavax.net.debug=all MyApp        
```

  * Para visualizar os dumps hexadecimais de cada mensagem de handshake (os dois pontos são opcionais):
```bash
 java -Djavax.net.debug=ssl:handshake:data MyApp
```

  * Para visualizar os dumps hexadecimais de cada mensagem de handshake e imprimir o rastreamento do gerenciador de confiança (as vírgulas são opcionais):
```bash
 java -Djavax.net.debug=ssl,handshake,data,trustmanager MyApp
```

##### Depurando Conexões TLS

Entender problemas de conexão TLS pode ser difícil às vezes, especialmente quando não está claro quais mensagens estão sendo realmente enviadas e recebidas. O JSSE possui um recurso de depuração integrado e é ativado pela propriedade de sistema `javax.net.debug`. Para saber mais sobre a propriedade de sistema `javax.net.debug`, consulte [Utilitários de Depuração](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

Esta seção fornece uma breve visão geral da saída de depuração do handshake TLS 1.3 básico. Para saber mais sobre o protocolo TLS, consulte [RFC 8446: The Transport Layer Security (TLS) Protocol Version 1.3](<https://tools.ietf.org/html/rfc8446>).

Nota:

  * As informações de saída de depuração sobre todas as possíveis combinações e protocolos de handshake TLS estão além do escopo deste guia. Em vez disso, consulte o RFC relevante para obter informações mais detalhadas sobre uma versão específica do TLS. Consulte [Protocolos TLS e DTLS](<#/doc/guides/security/java-security-overview1>) para obter uma lista de protocolos SSL/TLS/DTLS suportados e links para seus respectivos RFCs.

  * A saída não é padrão e pode mudar de uma versão para outra.

Este exemplo usa o `JSSE X509KeyManager` e `X509TrustManager` padrão, que também imprime informações de depuração sobre as chaves e certificados confiáveis usados durante uma conexão. Ele usa as aplicações de exemplo `ClassFileServer` e `SSLSocketClientWithClientAuth` de [Código de Exemplo JSSE](<https://docs.oracle.com/javase/8/docs/technotes/guides/security/jsse/samples/index.html>) na documentação do Java SE 8. `ClassFileServer` é um servidor HTTPS simples que pode exigir autenticação de cliente. `SSLSocketClientWithClientAuth` demonstra como usar a classe `SSLSocket` como cliente para enviar uma solicitação HTTP e obter uma resposta de um servidor HTTPS. Para simplificar, tanto `ClassFileServer` quanto `SSLSocketClientWithClientAuth` são executados no mesmo host.

Executar ClassFileServer no localhost

O comando a seguir executa a aplicação `ClassFileServer` no `localhost`, porta 2002:
```bash
    java \
      -Djavax.net.ssl.trustStore=/my_home_directory/jssesamples/samples/samplecacerts \
      -Djavax.net.ssl.trustStorePassword=changeit \
      ClassFileServer 2002 \
      /my_home_directory/jssesamples/samples/ \
      TLS true
```

Executar SSLSocketClientWithClientAuth no localhost

O comando a seguir executa a aplicação `SSLSocketClientWithClientAuth` no `localhost`, porta 2002. A aplicação se conecta ao servidor HTTPS que você iniciou com o comando anterior. Ela envia uma solicitação HTTPS para o servidor e recebe a resposta. Observe que o comando define o valor da propriedade de sistema `javax.net.debug` como `all`, o que ativa toda a depuração.
```bash
    java -Djavax.net.debug=all -Djavax.net.ssl.trustStore=/my_home_directory/jssesamples/samples/samplecacerts SSLSocketClientWithClientAuth localhost 2002 /index.html
```

Formato da Saída de Depuração

Cada linha da saída de depuração contém as seguintes informações; cada campo é separado por uma barra vertical (`|`):

  * Nome do Logger (`System.getLogger("javax.net.ssl")`)
  * Nível de Depuração (`System.Logger.Level`)
  * ID da Thread (`Thread.currentThread().getId()`)
  * Nome da Thread (`Thread.currentThread().getName()`)
  * Data e hora
  * Chamador (local da chamada de log)
  * Mensagem

Determinar Suítes de Cifras Habilitadas no Lado do Cliente e do Servidor

Os valores das propriedades de sistema `jdk.tls.client.cipherSuites` e `jdk.tls.server.cipherSuites` são verificados para determinar as suítes de cifras habilitadas padrão; consulte [Especificando Suítes de Cifras Habilitadas Padrão](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) para obter mais informações sobre essas propriedades de sistema.
```bash
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:46.990 EDT|SSLContextImpl.java:427|System property jdk.tls.client.cipherSuites is set to 'null'
```
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.026 EDT|SSLContextImpl.java:427|System property jdk.tls.server.cipherSuites is set to 'null'
    ...
```

Os valores dessas propriedades de sistema são nulos, então os conjuntos de cifras habilitados por padrão são aqueles que o provedor SunJSSE habilita por padrão; veja O Provedor SunJSSE na Documentação dos Provedores JDK.

O valor de `jdk.tls.keyLimits` é verificado para determinar o limite da quantidade de dados que um algoritmo pode criptografar com um conjunto específico de chaves; veja Limitando a Quantidade de Dados que Algoritmos Podem Criptografar com um Conjunto de Chaves.
```
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.124 EDT|SSLCipher.java:436|jdk.net.keyLimits:  entry = AES/GCM/NoPadding KeyUpdate 2^37. AES/GCM/NOPADDING:KEYUPDATE = 137438953472
    ...
```

A saída de depuração lista os conjuntos de cifras não suportados e desabilitados:
```
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.150 EDT|SSLContextImpl.java:401|Ignore disabled cipher suite: TLS_ECDHE_ECDSA_WITH_3DES_EDE_CBC_SHA
    javax.net.ssl|ALL|01|main|2018-08-18 01:04:47.150 EDT|SSLContextImpl.java:410|Ignore unsupported cipher suite: TLS_ECDHE_ECDSA_WITH_3DES_EDE_CBC_SHA
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.152 EDT|SSLContextImpl.java:401|Ignore disabled cipher suite: TLS_ECDHE_RSA_WITH_3DES_EDE_CBC_SHA
    ...
```

Inicializar X509KeyManager

O X509KeyManager é inicializado. Ele descobre que há uma `keyEntry` no `KeyStore` fornecido para um assunto chamado "duke". Se esta aplicação deseja se autenticar, então o X509KeyManager procura em sua lista de `keyEntries` por uma credencial apropriada.
```
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.224 EDT|SunX509KeyManagerImpl.java:164|found key for : duke (
      "certificate" : {
        "version"            : "v1",
        "serial number"      : "3B 0A FA 66",
        "signature algorithm": "MD5withRSA",
        "issuer"             : "CN=Duke, OU=Java Software, O="Sun Microsystems, Inc.", L=Cupertino, ST=CA, C=US",
        "not before"         : "2001-05-22 19:46:46.000 EDT",
        "not  after"         : "2011-05-22 19:46:46.000 EDT",
        "subject"            : "CN=Duke, OU=Java Software, O="Sun Microsystems, Inc.", L=Cupertino, ST=CA, C=US",
        "subject public key" : "RSA"}
    )
    ...
```

Inicializar um TrustManager

Um TrustManager é inicializado e encontra no `truststore` vários certificados de diversas Autoridades Certificadoras (CAs). Ele também encontra um certificado autoassinado com um nome distinto “localhost”. Um servidor que apresenta credenciais válidas (certificados) que se encadeiam de volta a um certificado confiável no `truststore` será ele próprio confiável.
```
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.229 EDT|TrustStoreManager.java:112|trustStore is: /my_home_directory/jssesamples/samples/samplecacerts
    trustStore type is: pkcs12
    trustStore provider is: 
    the last modified time is: Tue Dec 11 06:43:38 EST 2012
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.229 EDT|TrustStoreManager.java:311|Reload the trust store
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.264 EDT|TrustStoreManager.java:318|Reload trust certs
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.266 EDT|TrustStoreManager.java:323|Reloaded 32 trust certs
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.322 EDT|X509TrustManagerImpl.java:79|adding as trusted certificates (
      "certificate" : {
        "version"            : "v1",
        "serial number"      : "00 9B 7E 06 49 A3 3E 62 B9 D5 EE 90 48 71 29 EF 57",
        "signature algorithm": "SHA1withRSA",
        "issuer"             : "CN=VeriSign Class 3 Public Primary Certification Authority - G3, OU="(c) 1999 VeriSign, Inc. - For authorized use only", OU=VeriSign Trust Network, O="VeriSign, Inc.", C=US",
        "not before"         : "1999-09-30 20:00:00.000 EDT",
        "not  after"         : "2036-07-16 19:59:59.000 EDT",
        "subject"            : "CN=VeriSign Class 3 Public Primary Certification Authority - G3, OU="(c) 1999 VeriSign, Inc. - For authorized use only", OU=VeriSign Trust Network, O="VeriSign, Inc.", C=US",
        "subject public key" : "RSA"},
      "certificate" : {
        "version"            : "v1",
        "serial number"      : "61 70 CB 49 8C 5F 98 45 29 E7 B0 A6 D9 50 5B 7A",
        "signature algorithm": "SHA1withRSA",
        "issuer"             : "CN=VeriSign Class 2 Public Primary Certification Authority - G3, OU="(c) 1999 VeriSign, Inc. - For authorized use only", OU=VeriSign Trust Network, O="VeriSign, Inc.", C=US",
        "not before"         : "1999-09-30 20:00:00.000 EDT",
        "not  after"         : "2036-07-16 19:59:59.000 EDT",
        "subject"            : "CN=VeriSign Class 2 Public Primary Certification Authority - G3, OU="(c) 1999 VeriSign, Inc. - For authorized use only", OU=VeriSign Trust Network, O="VeriSign, Inc.", C=US",
        "subject public key" : "RSA"},
    ...
      "certificate" : {
        "version"            : "v1",
        "serial number"      : "41 00 44 46",
        "signature algorithm": "MD5withRSA",
        "issuer"             : "CN=localhost, OU=Widget Development Group, O="Ficticious Widgets, Inc.", L=Sunnyvale, ST=CA, C=US",
        "not before"         : "2004-07-22 18:48:38.000 EDT",
        "not  after"         : "2011-05-22 18:48:38.000 EDT",
        "subject"            : "CN=localhost, OU=Widget Development Group, O="Ficticious Widgets, Inc.", L=Sunnyvale, ST=CA, C=US",
        "subject public key" : "RSA"},
    ...
```

Realizar Inicialização Adicional

O exemplo executa código de inicialização adicional e então se conecta ao servidor.
```
    javax.net.ssl|ALL|01|main|2018-08-18 01:04:47.326 EDT|SSLContextImpl.java:115|trigger seeding of SecureRandom
    javax.net.ssl|ALL|01|main|2018-08-18 01:04:47.524 EDT|SSLContextImpl.java:119|done seeding of SecureRandom
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.562 EDT|HandshakeContext.java:291|Ignore unsupported cipher suite: TLS_AES_128_GCM_SHA256 for TLS12
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.563 EDT|HandshakeContext.java:291|Ignore unsupported cipher suite: TLS_AES_256_GCM_SHA384 for TLS12
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.577 EDT|HandshakeContext.java:291|Ignore unsupported cipher suite: TLS_AES_128_GCM_SHA256 for TLS11
    ...
```

A saída de depuração também o notifica sobre extensões e algoritmos de assinatura desabilitados, não suportados ou indisponíveis:
```
    javax.net.ssl|WARNING|01|main|2018-08-18 01:04:47.695 EDT|ServerNameExtension.java:255|Unable to indicate server name
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.695 EDT|SSLExtensions.java:235|Ignore, context unavailable extension: server_name
    javax.net.ssl|WARNING|01|main|2018-08-18 01:04:47.703 EDT|SignatureScheme.java:282|Signature algorithm, ed25519, is not supported by the underlying providers
    javax.net.ssl|WARNING|01|main|2018-08-18 01:04:47.704 EDT|SignatureScheme.java:282|Signature algorithm, ed448, is not supported by the underlying providers
    javax.net.ssl|ALL|01|main|2018-08-18 01:04:47.724 EDT|SignatureScheme.java:358|Ignore disabled signature sheme: rsa_md5
    javax.net.ssl|INFO|01|main|2018-08-18 01:04:47.724 EDT|AlpnExtension.java:161|No available application protocols
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.724 EDT|SSLExtensions.java:235|Ignore, context unavailable extension: application_layer_protocol_negotiation
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.725 EDT|SSLExtensions.java:235|Ignore, context unavailable extension: cookie
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.763 EDT|SSLExtensions.java:235|Ignore, context unavailable extension: renegotiation_info
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.763 EDT|PreSharedKeyExtension.java:606|No session to resume.
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.763 EDT|SSLExtensions.java:235|Ignore, context unavailable extension: pre_shared_key
    ...
```

Enviar Mensagem ClientHello

O cliente envia uma mensagem ClientHello ao servidor. Esta mensagem especifica o seguinte:

  * Versão do cliente: Para TLS 1.3, este campo tem um valor fixo, TLSv1.2; o TLS 1.3 usa a extensão `supported_versions` e não este campo para negociar a versão do protocolo

  * Random: Um valor aleatório usado para inicializar os algoritmos criptográficos

  * ID de Sessão: Versões anteriores do TLS usam este ID para suportar um recurso de retomada de sessão

  * Cipher Suites: A lista de conjuntos de cifras que o cliente solicita; dependendo dos conjuntos de cifras habilitados, pode haver uma ampla mistura de nomes de conjuntos de cifras, alguns dos quais são apenas para TLSv1.3, enquanto outros são para TLSv1.2 e anteriores

  * Métodos de compressão: Para TLS 1.3, este campo deve ter o valor 0

  * Extensões:

    * `status_request`: O cliente solicita OCSP; veja OCSP Orientado pelo Cliente e OCSP Stapling para determinar o status de revogação do certificado X.509 durante o handshake do Transport Layer Security \(TLS\).")

    * `supported_groups`: Lista os grupos nomeados que o cliente suporta para troca de chaves. Esses grupos nomeados incluem grupos de curva elíptica (ECDHE) e grupos de campo finito (DHE). A mensagem ClientHello deve incluir esta mensagem se estiver usando troca de chaves ECDHE ou DHE.

    * `ec_point_formats`: Lista os formatos de ponto de curva elíptica que o cliente pode analisar; neste exemplo, o cliente pode analisar apenas formatos de ponto não compactados. Outros formatos incluem `compressed` e `ansiX962_compressed_prime`.

    * algoritmos de assinatura: Lista quais algoritmos de assinatura podem ser usados em mensagens CertificateVerify

    * `signature_algorithms_cert`: Lista quais algoritmos de assinatura podem ser usados em assinaturas digitais

    * `status_request_v2`: Permite que os clientes especifiquem e suportem vários métodos de status de certificado. Observe que esta extensão está obsoleta para TLS 1.3.

    * `extended_master_secret`: No TLS 1.2 e anteriores, esta extensão solicita que ambos os lados digiram partes maiores da transcrição do handshake no `master secret` do que a versão original do protocolo; veja RFC 7627. A extensão é incluída em handshakes TLS 1.3 caso um handshake TLS 1.2 seja negociado.

    * `supported_versions`: Lista quais versões do TLS o cliente suporta. Em particular, se o cliente solicita TLS 1.3, então o campo de versão do cliente tem o valor TLSv1.2 e esta extensão contém o valor TLSv1.3; se o cliente solicita TLS 1.2, então o campo de versão do cliente tem o valor TLSv1.2 e esta extensão ou não existe ou contém o valor TLSv1.2, mas não o valor TLSv1.3.

    * `psk_key_exchange_modes`: Lista quais modos de troca de chaves podem ser usados com chaves pré-compartilhadas (PSKs); neste exemplo, o cliente suporta PSK com estabelecimento de chave (EC)DHE (`psk_dhe_ke`). Neste modo, o cliente e o servidor devem fornecer valores para a extensão `key_share`.

    * `key_share`: Lista parâmetros criptográficos para troca de chaves. Contém um campo chamado `client_shares` que contém esta lista. Cada item desta lista contém dois campos: `group` e `key_exchange`. Este exemplo contém informações de troca de chaves para a curva elíptica `secp256r1`.

```
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.769 EDT|ClientHello.java:633|Produced ClientHello handshake message (
    "ClientHello": {
      "client version"      : "TLSv1.2",
      "random"              : "64 CF 68 A1 CF AB B1 6F 43 F6 DE 1B 49 49 DE 5A 42 9A 71 DD CB 9A E3 9F 32 00 E8 87 7A 00 DA C6",
      "session id"          : "02 0D BE 1B A4 5F F2 E8 B6 31 9D A4 EF F3 22 84 C3 58 0B 5C C0 57 0F A5 6D 8A 83 EB DC DA B1 B6",
      "cipher suites"       : "[TLS_AES_128_GCM_SHA256(0x1301), TLS_AES_256_GCM_SHA384(0x1302), TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384(0xC02C), TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256(0xC02B), TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384(0xC030), TLS_RSA_WITH_AES_256_GCM_SHA384(0x009D), TLS_ECDH_ECDSA_WITH_AES_256_GCM_SHA384(0xC02E), TLS_ECDH_RSA_WITH_AES_256_GCM_SHA384(0xC032), TLS_DHE_RSA_WITH_AES_256_GCM_SHA384(0x009F), TLS_DHE_DSS_WITH_AES_256_GCM_SHA384(0x00A3), TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256(0xC02F), TLS_RSA_WITH_AES_128_GCM_SHA256(0x009C), TLS_ECDH_ECDSA_WITH_AES_128_GCM_SHA256(0xC02D), TLS_ECDH_RSA_WITH_AES_128_GCM_SHA256(0xC031), TLS_DHE_RSA_WITH_AES_128_GCM_SHA256(0x009E), TLS_DHE_DSS_WITH_AES_128_GCM_SHA256(0x00A2), TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384(0xC024), TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384(0xC028), TLS_RSA_WITH_AES_256_CBC_SHA256(0x003D), TLS_ECDH_ECDSA_WITH_AES_256_CBC_SHA384(0xC026), TLS_ECDH_RSA_WITH_AES_256_CBC_SHA384(0xC02A), TLS_DHE_RSA_WITH_AES_256_CBC_SHA256(0x006B), TLS_DHE_DSS_WITH_AES_256_CBC_SHA256(0x006A), TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA(0xC00A), TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA(0xC014), TLS_RSA_WITH_AES_256_CBC_SHA(0x0035), TLS_ECDH_ECDSA_WITH_AES_256_CBC_SHA(0xC005), TLS_ECDH_RSA_WITH_AES_256_CBC_SHA(0xC00F), TLS_DHE_RSA_WITH_AES_256_CBC_SHA(0x0039), TLS_DHE_DSS_WITH_AES_256_CBC_SHA(0x0038), TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256(0xC023), TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256(0xC027), TLS_RSA_WITH_AES_128_CBC_SHA256(0x003C), TLS_ECDH_ECDSA_WITH_AES_128_CBC_SHA256(0xC025), TLS_ECDH_RSA_WITH_AES_128_CBC_SHA256(0xC029), TLS_DHE_RSA_WITH_AES_128_CBC_SHA256(0x0067), TLS_DHE_DSS_WITH_AES_128_CBC_SHA256(0x0040), TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA(0xC009), TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA(0xC013), TLS_RSA_WITH_AES_128_CBC_SHA(0x002F), TLS_ECDH_ECDSA_WITH_AES_128_CBC_SHA(0xC004), TLS_ECDH_RSA_WITH_AES_128_CBC_SHA(0xC00E), TLS_DHE_RSA_WITH_AES_128_CBC_SHA(0x0033), TLS_DHE_DSS_WITH_AES_128_CBC_SHA(0x0032), TLS_EMPTY_RENEGOTIATION_INFO_SCSV(0x00FF)]",
      "compression methods" : "00",
      "extensions"          : [
        "status_request (5)": {
          "certificate status type": ocsp
          "OCSP status request": {
            "responder_id": <empty>
            "request extensions": {
              <empty>
            }
          }
        },
        "supported_groups (10)": {
          "versions": [secp256r1, secp384r1, secp521r1, sect283k1, sect283r1, sect409k1, sect409r1, sect571k1, sect571r1, secp256k1, ffdhe2048, ffdhe3072, ffdhe4096, ffdhe6144, ffdhe8192]
        },
        "ec_point_formats (11)": {
          "formats": [uncompressed]
        },
        "signature_algorithms (13)": {
          "signature schemes": [ecdsa_secp256r1_sha256, ecdsa_secp384r1_sha384, ecdsa_secp512r1_sha512, rsa_pss_rsae_sha256, rsa_pss_rsae_sha384, rsa_pss_rsae_sha512, rsa_pss_pss_sha256, rsa_pss_pss_sha384, rsa_pss_pss_sha512, rsa_pkcs1_sha256, rsa_pkcs1_sha384, rsa_pkcs1_sha512, dsa_sha256, ecdsa_sha1, rsa_pkcs1_sha1, dsa_sha1]
        },
        "signature_algorithms_cert (50)": {
          "signature schemes": [ecdsa_secp256r1_sha256, ecdsa_secp384r1_sha384, ecdsa_secp512r1_sha512, rsa_pss_rsae_sha256, rsa_pss_rsae_sha384, rsa_pss_rsae_sha512, rsa_pss_pss_sha256, rsa_pss_pss_sha384, rsa_pss_pss_sha512, rsa_pkcs1_sha256, rsa_pkcs1_sha384, rsa_pkcs1_sha512, dsa_sha256, ecdsa_sha1, rsa_pkcs1_sha1, dsa_sha1]
        },
        "status_request_v2 (17)": {
          "cert status request": {
            "certificate status type": ocsp_multi
            "OCSP status request": {
              "responder_id": <empty>
              "request extensions": {
                <empty>
              }
            }
          }
        },
        "extended_master_secret (23)": {
          <empty>
        },
        "supported_versions (43)": {
          "versions": [TLSv1.3, TLSv1.2, TLSv1.1, TLSv1]
        },
        "psk_key_exchange_modes (45)": {
          "ke_modes": [psk_dhe_ke]
        },
        "key_share (51)": {
          "client_shares": [  
            {
              "named group": secp256r1
              "key_exchange": {
                0000: 04 1F 80 50 D9 C6 03 45   7B 59 0F A7 B6 9E AE 39  ...P...E.Y.....9
                0010: 37 BE B0 5B 09 D8 91 37   72 5D 2B 8E 01 0A 84 56  7..[...7r]+....V
                0020: 99 0D 37 49 8F 92 61 A9   D6 54 E1 3B EE D1 E8 D2  ..7I..a..T.;....
                0030: 92 22 F9 17 CE A7 F8 51   47 C9 1E 5C D6 59 0F 4F  .".....QG..\.Y.O
                0040: 55 
              }
            },
          ]
        }
      ]
    }
    )
    ...
```

Mostrar Dados Reais Enviados e Lidos

A saída de depuração mostra os dados reais enviados para o objeto de saída bruta (neste caso, um OutputStream):
```
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.770 EDT|SSLSocketOutputRecord.java:217|WRITE: TLS13 handshake, length = 405
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.774 EDT|SSLSocketOutputRecord.java:231|Raw write (
      0000: 16 03 03 01 95 01 00 01   91 03 03 64 CF 68 A1 CF  ...........d.h..
      0010: AB B1 6F 43 F6 DE 1B 49   49 DE 5A 42 9A 71 DD CB  ..oC...II.ZB.q..
      0020: 9A E3 9F 32 00 E8 87 7A   00 DA C6 20 02 0D BE 1B  ...2...z... ....
    ...
```

Em seguida, a saída de depuração mostra os dados brutos lidos do dispositivo de entrada (InputStream) antes que qualquer processamento tenha sido realizado:
```
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.862 EDT|SSLSocketInputRecord.java:215|READ: TLSv1.2 handshake, length = 155
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.863 EDT|SSLSocketInputRecord.java:474|Raw read (
      0000: 02 00 00 97 03 03 66 24   0F F6 6D 4A 0C 5A A1 23  ......f$..mJ.Z.#
      0010: F6 5D 4B 87 B1 6E AC 13   BB 4D C1 A4 0F F0 2C EF  .]K..n...M....,.
      0020: D7 4F 03 11 19 B1 20 02   0D BE 1B A4 5F F2 E8 B6  .O.... ....._...
    ...
```

Sempre que o cliente envia ou lê uma mensagem, a saída de depuração mostra os dados brutos enviados ou lidos e como quaisquer mensagens (e suas extensões) foram processadas. As seções a seguir omitem essas partes da saída de depuração.

Ler Mensagem ServerHello

Neste ponto do handshake, o TLS 1.3 foi negociado. O servidor seleciona a versão do TLS e responde usando uma combinação da versão do servidor e da extensão `supported_versions`. Neste caso, um protocolo TLSv1.3 foi indicado.

A mensagem ServerHello especifica o seguinte:

  * Versão do servidor: Para TLS 1.3, este campo deve ter o valor TLSv1.2; o TLS 1.3 usa a extensão `supported_versions` e não este campo para indicar a versão do protocolo negociada

  * Random: Também usado para inicializar os algoritmos criptográficos

  * ID de Sessão: Para TLS 1.3, este campo tem o mesmo valor que o campo correspondente da mensagem ClientHello

  * Cipher suite: O conjunto de cifras selecionado; neste exemplo, é TLS_AES_128_GCM_SHA256

  * Métodos de compressão: Para TLS 1.3, este campo deve ter o valor 0

  * Extensões

    * `supported_versions`: Especifica qual versão do TLS o servidor usa. Observe que para TLS 1.3, o servidor deve usar o valor da extensão `supported_versions` da mensagem ClientHello para negociação de versão, em vez do valor do campo de versão do cliente.

    * `key_share`: Os valores de grupo nomeado e chave para uma troca de chaves ECDHE

```
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.863 EDT|SSLSocketInputRecord.java:251|READ: TLSv1.2 handshake, length = 155
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.867 EDT|ServerHello.java:862|Consuming ServerHello handshake message (
    "ServerHello": {
      "server version"      : "TLSv1.2",
      "random"              : "66 24 0F F6 6D 4A 0C 5A A1 23 F6 5D 4B 87 B1 6E AC 13 BB 4D C1 A4 0F F0 2C EF D7 4F 03 11 19 B1",
      "session id"          : "02 0D BE 1B A4 5F F2 E8 B6 31 9D A4 EF F3 22 84 C3 58 0B 5C C0 57 0F A5 6D 8A 83 EB DC DA B1 B6",
      "cipher suite"        : "TLS_AES_128_GCM_SHA256(0x1301)",
      "compression methods" : "00",
      "extensions"          : [
        "supported_versions (43)": {
          "selected version": [TLSv1.3]
        },
        "key_share (51)": {
          "server_share": {
            "named group": secp256r1
            "key_exchange": {
              0000: 04 DE 5B 20 0E FD EB 6E   DA 70 C2 D0 FA 0D 4C 53  ..[ ...n.p....LS
              0010: 6D E1 9E 67 77 65 36 AF   B5 EB E6 D2 88 92 9B EE  m..gwe6.........
              0020: E4 97 A3 B3 C1 FB D8 29   3B 92 87 D2 B3 9E 3D AA  .......);.....=.
              0030: 14 99 1E 84 8F C2 E9 E3   E1 AC 9A 12 95 F0 26 B5  ..............&.
              0040: 88 
            }
          },
        }
      ]
    }
    )
    ...
```

A sessão é inicializada:
```
    javax.net.ssl|ALL|01|main|2018-08-18 01:04:47.873 EDT|SSLSessionImpl.java:203|Session initialized:  Session(1534568687873|TLS_AES_128_GCM_SHA256)
    ...
```

Ler Mensagem EncryptedExtensions

Neste ponto do handshake, informações criptográficas suficientes foram trocadas, e o restante do handshake será realizado de forma criptografada.

A mensagem EncryptedExtensions contém respostas às extensões ClientHello que não são necessárias para determinar os parâmetros criptográficos, além daqueles que são específicos para certificados individuais; neste exemplo, ela retorna a lista de grupos nomeados que o cliente suporta para troca de chaves.
```
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.942 EDT|EncryptedExtensions.java:171|Consuming EncryptedExtensions handshake message (
    "EncryptedExtensions": [
      "supported_groups (10)": {
        "versions": [secp256r1, secp384r1, secp521r1, sect283k1, sect283r1, sect409k1, sect409r1, sect571k1, sect571r1, secp256k1, ffdhe2048, ffdhe3072, ffdhe4096, ffdhe6144, ffdhe8192]
      }
    ]
    )
    ...
```

Ler Mensagem CertificateRequest do Servidor

O servidor envia a mensagem CertificateRequest se a autenticação de cliente baseada em certificado for desejada. Esta mensagem contém os parâmetros desejados para esse certificado. Ela especifica o seguinte:

  * `certificate_request_context`: Uma string que identifica a solicitação de certificado; o valor deste campo tem comprimento zero, a menos que esteja sendo usado para autenticação pós-handshake

  * Extensões: As duas extensões a seguir indicam quais algoritmos de assinatura podem ser usados em assinaturas digitais:

    * `signature_algorithms`: Originalmente aparecendo no TLS 1.2, aplica-se a assinaturas em mensagens CertificateVerify

    * `signature_algorithms_cert`: Aplica-se a assinaturas em certificados

```
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.947 EDT|CertificateRequest.java:864|Consuming CertificateRequest handshake message (
    "CertificateRequest": {
      "certificate_request_context": "",
      "extensions": [
        "signature_algorithms (13)": {
          "signature schemes": [ecdsa_secp256r1_sha256, ecdsa_secp384r1_sha384, ecdsa_secp512r1_sha512, rsa_pss_rsae_sha256, rsa_pss_rsae_sha384, rsa_pss_rsae_sha512, rsa_pss_pss_sha256, rsa_pss_pss_sha384, rsa_pss_pss_sha512, rsa_pkcs1_sha256, rsa_pkcs1_sha384, rsa_pkcs1_sha512, dsa_sha256, ecdsa_sha1, rsa_pkcs1_sha1, dsa_sha1]
        },
        "signature_algorithms_cert (50)": {
          "signature schemes": [ecdsa_secp256r1_sha256, ecdsa_secp384r1_sha384, ecdsa_secp512r1_sha512, rsa_pss_rsae_sha256, rsa_pss_rsae_sha384, rsa_pss_rsae_sha512, rsa_pss_pss_sha256, rsa_pss_pss_sha384, rsa_pss_pss_sha512, rsa_pkcs1_sha256, rsa_pkcs1_sha384, rsa_pkcs1_sha512, dsa_sha256, ecdsa_sha1, rsa_pkcs1_sha1, dsa_sha1]
        }
      ]
    }
    )
    ...
```

Ler Mensagem Certificate do Servidor

A mensagem Certificate contém o certificado de autenticação e quaisquer outros certificados de suporte na cadeia de certificados. Ela especifica o seguinte:

  * `certificate_request_context`: Para autenticação de servidor, este campo está vazio
  * `certificate_list`: Contém uma cadeia de certificados assinada por um algoritmo de assinatura anunciado pelo cliente. No entanto, neste exemplo, um certificado autoassinado (um certificado cujo assunto e nome do emissor são idênticos) foi recebido. Este mesmo certificado autoassinado foi descoberto anteriormente durante a inicialização, então ele será confiável quando o TrustManager for realmente chamado para verificar o certificado recebido.

Existem muitas maneiras diferentes de estabelecer confiança, então se o X509TrustManager padrão não estiver realizando os tipos de gerenciamento de confiança que você precisa, você pode fornecer seu próprio X509TrustManager para o SSLContext.
```
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:47.964 EDT|CertificateMessage.java:1148|Consuming server Certificate handshake message (
    "Certificate": {
      "certificate_request_context": "",
      "certificate_list": [  
      {
        "certificate" : {
          "version"            : "v1",
          "serial number"      : "41 00 44 46",
          "signature algorithm": "MD5withRSA",
          "issuer"             : "CN=localhost, OU=Widget Development Group, O="Ficticious Widgets, Inc.", L=Sunnyvale, ST=CA, C=US",
          "not before"         : "2004-07-22 18:48:38.000 EDT",
          "not  after"         : "2011-05-22 18:48:38.000 EDT",
          "subject"            : "CN=localhost, OU=Widget Development Group, O="Ficticious Widgets, Inc.", L=Sunnyvale, ST=CA, C=US",
          "subject public key" : "RSA"}
        "extensions": {
          <no extension>
        }
      },
    ]
    }
    )
    ...
```

O cliente reconhece este certificado e pode confiar nele.
```
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:48.165 EDT|X509TrustManagerImpl.java:242|Found trusted certificate (
      "certificate" : {
        "version"            : "v1",
        "serial number"      : "41 00 44 46",
        "signature algorithm": "MD5withRSA",
        "issuer"             : "CN=localhost, OU=Widget Development Group, O="Ficticious Widgets, Inc.", L=Sunnyvale, ST=CA, C=US",
        "not before"         : "2004-07-22 18:48:38.000 EDT",
        "not  after"         : "2011-05-22 18:48:38.000 EDT",
        "subject"            : "CN=localhost, OU=Widget Development Group, O="Ficticious Widgets, Inc.", L=Sunnyvale, ST=CA, C=US",
        "subject public key" : "RSA"}
    )
    ...
```

Ler Mensagem CertificateVerify do Servidor

O certificado enviado pelo servidor é verificado pela mensagem CertificateVerify. A mensagem é usada para fornecer prova explícita de que o servidor possui a chave privada correspondente ao seu certificado. Esta mensagem especifica o seguinte:

  * Algoritmo de assinatura: O algoritmo de assinatura usado; neste exemplo, é `rsa_pss_rsae_sha256`.

  * Assinatura: A assinatura sobre todo o handshake usando a chave privada correspondente à chave pública na mensagem Certificate

```
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:48.194 EDT|CertificateVerify.java:1128|Consuming CertificateVerify handshake message (
    "CertificateVerify": {
      "signature algorithm": rsa_pss_rsae_sha256
      "signature": {
        0000: 0F 25 DD 62 03 6B 8C 8F   22 C7 8D 46 A2 A6 45 39  .%.b.k.."..F..E9
        0010: 08 8D 51 1E 48 52 66 A4   F8 28 D3 FD 18 93 70 C6  ..Q.HRf..(....p.
        0020: 32 74 C1 CC 0A C4 60 41   50 AF 7C DA 0C DB 92 F9  2t....`AP.......
        0030: 14 CB EF 15 7F 3E 52 16   F7 CC 8A 7C C9 1F 42 CA  .....>R.......B.
        0040: 90 8D FA B7 F2 3A 46 7E   F7 9F 43 CE C6 AA 15 59  .....:F...C....Y
        0050: EE AD 34 10 FF B7 BC FD   A2 F7 F3 1A FA 7F 26 61  ..4...........&a
        0060: 80 2B 50 3A 8A 9E 5C 0E   4C A6 24 DA E6 3D 71 FA  .+P:..\.L.$..=q.
        0070: AE 78 79 D2 DA 36 DE C1   A6 BC 18 46 04 CE 03 4E  .xy..6.....F...N
      }
    }
    )
    ...
```

Ler Mensagem Finished do Servidor

O servidor envia uma mensagem Finished. Esta mensagem contém um Código de Autenticação de Mensagem (MAC) sobre todo o handshake.
```
    javax.net.ssl|DEBUG|01|main|2018-08-17 01:56:26.764 EDT|Finished.java:860|Consuming server Finished handshake message (
    "Finished": {
      "verify data": {
        0000: CA 7B 74 A6 79 36 ED 62   A7 0E 14 9D 9F D0 4A 0F  ..t.y6.b......J.
        0010: 02 4C 78 BB E2 89 A2 C6   E8 BD 28 CA E7 D9 DB 68  .Lx.......(....h
      }'}
    )
    ...
    
```

Enviar Mensagem Certificate

O cliente envia uma mensagem Certificate porque o servidor solicitou autenticação de cliente através de uma mensagem CertificateRequest. A mensagem de certificado especifica informações semelhantes às da mensagem Certificate do servidor. O cliente precisa enviar credenciais de volta ao servidor, então seu X509KeyManager é consultado. O cliente procura uma correspondência entre a lista de emissores aceitos e os certificados que estão no KeyStore. Neste caso, há uma correspondência: o cliente possui as credenciais para "duke". Agora cabe ao X509TrustManager do servidor decidir se aceita essas credenciais.
```
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:48.222 EDT|CertificateMessage.java:1116|Produced client Certificate message (
    "Certificate": {
      "certificate_request_context": "",
      "certificate_list": [  
      {
        "certificate" : {
          "version"            : "v1",
          "serial number"      : "3B 0A FA 66",
          "signature algorithm": "MD5withRSA",
          "issuer"             : "CN=Duke, OU=Java Software, O="Sun Microsystems, Inc.", L=Cupertino, ST=CA, C=US",
          "not before"         : "2001-05-22 19:46:46.000 EDT",
          "not  after"         : "2011-05-22 19:46:46.000 EDT",
          "subject"            : "CN=Duke, OU=Java Software, O="Sun Microsystems, Inc.", L=Cupertino, ST=CA, C=US",
          "subject public key" : "RSA"}
        "extensions": {
          <no extension>
        }
      },
    ]
    }
    )
    ...
```

Enviar Mensagem CertificateVerify

Assim como na mensagem CertificateVerify enviada pelo servidor, o certificado enviado pelo cliente é verificado pela mensagem CertificateVerify. A mensagem é usada para fornecer prova explícita de que o cliente possui a chave privada correspondente ao seu certificado.
```
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:48.268 EDT|CertificateVerify.java:1097|Produced client CertificateVerify handshake message (
    "CertificateVerify": {
      "signature algorithm": rsa_pss_rsae_sha256
      "signature": {
        0000: 91 C2 F7 5D 8D 90 B4 82   E4 BA C6 23 08 E2 B4 DD  ...].......#....
        0010: 8D 95 8F 9F 31 4F 26 F3   97 3B FB 5B 10 4D AE F6  ....1O&..;.[.M..
        0020: 71 78 FB 7B 3A 4F F6 1B   BF D2 E3 FB BE 53 F6 70  qx..:O.......S.p
        0030: 7E 73 83 F4 9A 5E 08 19   63 C1 97 4C 10 B1 C7 3F  .s...^..c..L...?
        0040: 4A 7D EF 4A 30 44 15 9F   D0 F2 8B C4 D1 45 69 B1  J..J0D.......Ei.
        0050: D9 DB 45 83 C4 11 91 B3   81 5E 69 F4 5C 2A CF 69  ..E......^i.\*.i
        0060: D3 A6 7E 75 B4 C9 30 FB   5B AC BA 9F A3 C5 0C FD  ...u..0.[.......
        0070: 9A 62 A4 DA 5A 80 6B 72   CD F5 A5 53 AD 14 74 1C  .b..Z.kr...S..t.
      }
    }
    )
```

Enviar Mensagem Finished

O cliente então envia sua mensagem Finished ao servidor:
```
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:48.271 EDT|Finished.java:658|Produced client Finished handshake message (
    "Finished": {
      "verify data": {
        0000: 93 04 B5 23 8F 48 3A CF   4A 85 35 9E 5F E0 1D 4C  ...#.H:.J.5._..L
        0010: 9C 65 06 D4 E8 B4 ED 8F   01 6B 1E A2 DD 18 BD 78  .e.......k.....x
      }'}
    )
    ...
```

O cliente e o servidor verificaram as mensagens Finished que receberam de seus pares. Ambos os lados podem agora enviar e receber dados de aplicação pela conexão.

Trocar Dados de Aplicação, Cliente Envia Comando GET

O servidor e o cliente estão prontos para trocar dados de aplicação. O cliente envia um comando "GET /index.html HTTP1.0".
```
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:48.375 EDT|SSLCipher.java:2019|Plaintext before ENCRYPTION (
      0000: 47 45 54 20 2F 69 6E 64   65 78 2E 68 74 6D 6C 20  GET /index.html 
      0010: 48 54 54 50 2F 31 2E 30   0D 0A 0D 0A 17 00 00 00  HTTP/1.0........
      0020: 00 00 00 00 00 00 00 00   00 00 00 00 00           .............
    )
    ...
```

Observe que os dados transmitidos são criptografados:
```
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:48.385 EDT|SSLSocketOutputRecord.java:295|Raw write (
      0000: 17 03 03 00 3D 90 BF D1   81 E6 A3 E7 DA 50 A9 8B  ....=........P..
      0010: 18 F5 4B 30 AE 59 41 81   25 C4 9E 3E 70 29 5D C6  ..K0.YA.%..>p)].
      0020: 64 49 0B 4A 0E 93 E3 8F   DC 42 BA B5 21 42 38 88  dI.J.....B..!B8.
      0030: 62 4D 0C 86 FE 9A 8C B9   95 EF 89 93 61 3C 13 69  bM..........a<.i
      0040: 6C 45                                              lE
    )
    ...
```

Ler Mensagem NewSessionTicket

Depois que o servidor recebe a mensagem Finished do cliente, ele pode enviar uma mensagem NewSessionTicket a qualquer momento, que contém um ticket PSK que o cliente pode usar para acelerar futuros handshakes.
```
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:48.517 EDT|NewSessionTicket.java:330|Consuming NewSessionTicket message (
    "NewSessionTicket": {
      "ticket_lifetime"      : "86,400",
      "ticket_age_add"       : "<omitted>",
      "ticket_nonce"         : "01",
      "ticket"               : "A5 30 8C B6 AD 95 79 E8 2A D1 95 C0 F0 2F 6F AA 9E 97 58 AA 3D 19 82 2D 2C 47 C0 ED BF 64 48 AB",
      "extensions"           : [
        <no extension>
      ]
    }
    )
    
```

Uma SSLSession duplicada é criada com as informações PSK recém-geradas anexadas.
```
    javax.net.ssl|ALL|01|main|2018-08-18 01:04:48.517 EDT|SSLSessionImpl.java:203|Session initialized:  Session(1534568687873|TLS_AES_128_GCM_SHA256)
    ...
```

Trocar Dados da Aplicação, Servidor Envia Cabeçalho e Dados HTTPS

O cliente recebe dados da aplicação do servidor, primeiro o cabeçalho HTTPS, depois os dados reais.
```
    javax.net.ssl|ALL|01|main|2018-08-18 01:04:48.517 EDT|SSLSessionImpl.java:203|Session initialized:  Session(1534568687873|TLS_AES_128_GCM_SHA256)
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:48.617 EDT|SSLSocketInputRecord.java:474|Raw read (
      0000: 17 03 03 00 63                                     ....c
    )
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:48.618 EDT|SSLSocketInputRecord.java:215|READ: TLSv1.2 application_data, length = 99
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:48.618 EDT|SSLSocketInputRecord.java:474|Raw read (
      0000: 65 87 0E 1E 78 F7 AC C4   F7 C6 4D 55 91 6F 72 CC  e...x.....MU.or.
      0010: 18 2D 74 C3 B6 7B 2A F9   EB 2B F4 A8 C7 FD 09 FA  .-t...*..+......
      0020: 7E 36 9D F7 88 E7 44 DD   60 AF EB B0 F8 CF E1 64  .6....D.`......d
      0030: 0D 9B F4 B0 24 C2 BC B1   BF F7 F2 B6 CB E4 2E 39  ....$..........9
      0040: 78 B8 73 09 91 65 7A 0F   4C 49 DE 9A 7F 7B 42 86  x.s..ez.LI....B.
      0050: CA 33 87 DB 0D B2 E5 61   3C 70 6F F9 6A 15 A9 74  .3.....a<po.j..t
      0060: 64 E0 B0                                           d..
    )
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:48.619 EDT|SSLSocketInputRecord.java:251|READ: TLSv1.2 application_data, length = 99
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:48.621 EDT|SSLCipher.java:1914|Plaintext after DECRYPTION (
      0000: 48 54 54 50 2F 31 2E 30   20 32 30 30 20 4F 4B 0D  HTTP/1.0 200 OK.
      0010: 0A 43 6F 6E 74 65 6E 74   2D 4C 65 6E 67 74 68 3A  .Content-Length:
      0020: 20 32 35 37 37 0D 0A 43   F6 6E 74 65 6E 74 2D 54   2577..Content-T
      0030: 79 70 65 3A 20 74 65 78   74 2F 68 74 6D 6C 0D 0A  ype: text/html..
      0040: 0D 0A                                              ..
    )
    ...
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:48.626 EDT|SSLSocketInputRecord.java:215|READ: TLSv1.2 application_data, length = 2610
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:48.628 EDT|SSLSocketInputRecord.java:474|Raw read (
      0000: 69 8D F9 A3 E9 25 09 87   F0 E0 A1 63 12 9D 81 DF  i....%.....c....
      0010: 42 FC FA 7A 03 74 FD D5   ED 47 6C 5F 61 F2 BB 39  B..z.t...Gl_a..9
      0020: CF 64 0B B2 10 14 24 99   A3 66 8B D2 13 C9 66 FD  .d....$..f....f.
    ...
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:48.642 EDT|SSLSocketInputRecord.java:251|READ: TLSv1.2 application_data, length = 2610
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:48.647 EDT|SSLCipher.java:1914|Plaintext after DECRYPTION (
      0000: 3C 21 44 4F 43 54 59 50   45 20 68 74 6D 6C 20 50  <!DOCTYPE html P
      0010: 55 42 4C 49 43 20 22 2D   2F 2F 57 33 43 2F 2F 44  UBLIC "-//W3C//D
      0020: 54 44 20 58 48 54 4D 4C   20 31 2E 30 20 54 72 61  TD XHTML 1.0 Tra
      0030: 6E 73 69 74 69 6F 6E 61   6C 2F 2F 45 4E 22 0A 20  nsitional//EN". 
    ...
```

Ler Mensagem de Alerta do Servidor

O servidor envia um alerta close_notify, que notifica o cliente de que não enviará mais mensagens nesta conexão.
```
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:48.658 EDT|Alert.java:232|Received alert message (
    "Alert": {
      "level"      : "warning",
      "description": "close_notify"
    }
    )
```

Fechar a Conexão

O servidor fecha o socket e, em seguida, a conexão TLS.
```
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:48.661 EDT|SSLSocketImpl.java:1161|close the underlying socket
    javax.net.ssl|DEBUG|01|main|2018-08-18 01:04:48.661 EDT|SSLSocketImpl.java:921|close the ssl connection (passive)
    javax.net.ssl|ALL|01|main|2018-08-18 01:04:48.661 EDT|SSLSocketImpl.java:658|Closing input stream
    javax.net.ssl|ALL|01|main|2018-08-18 01:04:48.661 EDT|SSLSocketImpl.java:728|Closing output stream
```

### Riscos de Compatibilidade e Problemas Conhecidos

Melhorias no JSSE podem introduzir problemas de compatibilidade e outros problemas conhecidos, que são descritos nesta seção.

TLS 1.3 Não é Diretamente Compatível com Versões Anteriores

O TLS 1.3 não é diretamente compatível com versões anteriores. Embora o TLS 1.3 possa ser implementado com um modo de compatibilidade retroativa, ainda existem vários riscos de compatibilidade a serem considerados ao atualizar para o TLS 1.3:

  * O TLS 1.3 usa uma política de half-close, enquanto o TLS 1.2 e anteriores usam uma política de duplex-close. Para aplicações que dependem da política de duplex-close, pode haver problemas de compatibilidade ao atualizar para o TLS 1.3.

  * A extensão signature_algorithms_cert exige que algoritmos de assinatura predefinidos sejam usados para autenticação de certificado. Na prática, no entanto, uma aplicação pode usar algoritmos de assinatura não suportados.

  * O algoritmo de assinatura DSA não é suportado no TLS 1.3. Se um servidor estiver configurado para usar apenas certificados DSA, ele não poderá negociar uma conexão TLS 1.3.

  * As cipher suites suportadas para TLS 1.3 não são as mesmas do TLS 1.2 e anteriores. Se uma aplicação codificar cipher suites que não são mais suportadas, ela pode não conseguir usar o TLS 1.3 sem modificações em seu código, por exemplo TLS_AES_128_GCM_SHA256 (1.3 e posterior) versus TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA (1.2 e anterior).

  * Os comportamentos de retomada de sessão e atualização de chave do TLS 1.3 são diferentes do TLS 1.2 e anteriores. O impacto na compatibilidade deve ser mínimo, mas pode ser um risco se uma aplicação depender dos detalhes do handshake dos protocolos TLS.

### Exemplos de Código

Os seguintes exemplos de código estão incluídos nesta seção:

Tópicos

  * Convertendo um Socket Não Seguro para um Socket Seguro

  * Executando o Código de Exemplo do JSSE

  * Criando um Keystore para Usar com JSSE

  * Usando a Extensão Server Name Indication (SNI)

#### Convertendo um Socket Não Seguro para um Socket Seguro

Exemplo 8-26 mostra um código de exemplo que pode ser usado para configurar a comunicação entre um cliente e um servidor usando sockets não seguros. Este código é então modificado no Exemplo 8-27 para usar JSSE para configurar a comunicação de socket seguro.

Exemplo 8-26 Exemplo de Socket Sem SSL

Os exemplos a seguir demonstram código do lado do servidor e do lado do cliente para configurar uma conexão de socket não segura.

Em um programa Java que atua como um servidor e se comunica com um cliente usando sockets, a comunicação do socket é configurada com um código semelhante ao seguinte:
```
        import java.io.*;
        import java.net.*;
        
        . . .
        
        int port = availablePortNumber;
        
        ServerSocket s;
        
        try {
            s = new ServerSocket(port);
            Socket c = s.accept();
        
            OutputStream out = c.getOutputStream();
            InputStream in = c.getInputStream();
        
            // Send messages to the client through
            // the OutputStream
            // Receive messages from the client
            // through the InputStream
        } catch (IOException e) { }
    
```

O código do cliente para configurar a comunicação com um servidor usando sockets é semelhante ao seguinte:
```
        import java.io.*;
        import java.net.*;
        
        . . .
        
        int port = availablePortNumber;
        String host = "hostname";
        
        try {
            s = new Socket(host, port);
        
            OutputStream out = s.getOutputStream();
            InputStream in = s.getInputStream();
        
            // Send messages to the server through
            // the OutputStream
            // Receive messages from the server
            // through the InputStream
        } catch (IOException e) { }
    
```

Exemplo 8-27 Exemplo de Socket com SSL

Os exemplos a seguir demonstram código do lado do servidor e do lado do cliente para configurar uma conexão de socket seguro.

Em um programa Java que atua como um servidor e se comunica com um cliente usando sockets seguros, a comunicação do socket é configurada com um código semelhante ao seguinte. As diferenças entre este programa e o de comunicação usando sockets não seguros são destacadas em negrito.
```
        import java.io.*;
        import javax.net.ssl.*;
        
        . . .
        
        int port = availablePortNumber;
        
        SSLServerSocket s;
        
        try {
            SSLServerSocketFactory sslSrvFact =
                (SSLServerSocketFactory)SSLServerSocketFactory.getDefault();
            s = (SSLServerSocket)sslSrvFact.createServerSocket(port);
        
            SSLSocket c = (SSLSocket)s.accept();
        
            OutputStream out = c.getOutputStream();
            InputStream in = c.getInputStream();
        
            // Send messages to the client through
            // the OutputStream
            // Receive messages from the client
            // through the InputStream
        }
        
        catch (IOException e) {
        }
    
```

O código do cliente para configurar a comunicação com um servidor usando sockets seguros é semelhante ao seguinte, onde as diferenças com a versão não segura são destacadas em negrito:
```
        import java.io.*;
        import javax.net.ssl.*;
        
        . . .
        
        int port = availablePortNumber;
        String host = "hostname";
        
        try {
            SSLSocketFactory sslFact =
                (SSLSocketFactory)SSLServerSocketFactory.getDefault();
            SSLSocket s = (SSLSocket)sslFact.createSocket(host, port);
        
            OutputStream out = s.getOutputStream();
            InputStream in = s.getInputStream();
        
            // Send messages to the server through
            // the OutputStream
            // Receive messages from the server
            // through the InputStream
        }
        
        catch (IOException e) {
        }
    
```

#### Executando o Código de Exemplo do JSSE

Os programas de exemplo do JSSE ilustram como usar o JSSE.

Nota:

Ao usar o código de exemplo, esteja ciente de que os programas de exemplo são projetados para ilustrar como usar o JSSE. Eles não são projetados para serem aplicações robustas.

A configuração de comunicações seguras envolve algoritmos complexos. Os programas de exemplo não fornecem feedback durante o processo de configuração. Ao executar os programas, seja paciente: você pode não ver nenhuma saída por um tempo. Se você executar os programas com a propriedade de sistema `javax.net.debug` definida como `all`, você verá mais feedback. Para uma introdução à leitura dessas informações de depuração, consulte Depurando Conexões TLS.

Esta seção contém os seguintes tópicos:

  * Onde Encontrar o Código de Exemplo
  * Certificados e Chaves de Exemplo
  * Os seguintes tópicos descrevem os exemplos:
    * Código de Exemplo Ilustrando uma Conexão de Socket Seguro Entre um Cliente e um Servidor
    * Código de Exemplo Ilustrando Conexões HTTPS
    * Código de Exemplo Ilustrando uma Conexão RMI Segura
    * Código de Exemplo Ilustrando o Uso de um SSLEngine
  * Solução de Problemas do Código de Exemplo do JSSE

Onde Encontrar o Código de Exemplo

Código de Exemplo do JSSE na documentação do Java SE 8 lista todos os arquivos de código de exemplo e arquivos de texto. Essa página também fornece um link para um arquivo ZIP que você pode baixar para obter todos os arquivos de código de exemplo.

Certificados e Chaves de Exemplo

Os exemplos do JSSE usam os seguintes arquivos keystore de certificado para autenticar os clientes e servidores:

  * `*/testkeys`

Esses arquivos são usados pelos exemplos de código como a fonte de material de chave pública/privada e certificado. Nos diretórios do programa cliente, os arquivos `testkeys` contêm a entrada de certificado para o mascote Java `Duke`. Nos diretórios do programa servidor (`./sockets/server` e `rmi`), o arquivo contém uma entrada de certificado para o servidor `localhost`.

O código de exemplo espera que o arquivo `testkeys` esteja no diretório de trabalho atual.

Nota:

Estes são certificados muito simples e não são apropriados para um ambiente de produção, mas devem ser suficientes para executar os exemplos aqui.

A senha para esses keystores é: `passphrase`

  * `samplecacerts`

Este arquivo truststore é muito semelhante ao arquivo `cacerts` padrão do JDK, pois contém certificados de confiança de vários fornecedores. Ele também contém os certificados confiáveis de Duke e localhost.

A senha para este keystore é `changeit`

Consulte a documentação do seu provedor para saber como configurar o local do seu arquivo de certificado confiável.

Nota:

Usuários do JDK podem especificar o local do truststore usando um dos seguintes métodos:

    1. Propriedades de sistema:
```
 java -Djavax.net.ssl.trustStore=samplecacerts \
                -Djavax.net.ssl.trustStorePassword=changeit Application
```

    2. Instale o arquivo em:
```
 <java-home>/lib/security/jssecacerts
```

    3. Instale o arquivo em:
```
 <java-home>/lib/security/cacerts
```

Se você escolher (2) ou (3), certifique-se de substituir este arquivo por um arquivo `cacerts` de produção antes da implantação.

O utilitário `keytool` pode ser usado para gerar certificados e arquivos keystore alternativos.

Nota:

Certifique-se de verificar seu arquivo `cacerts`. Uma vez que você confia nas CAs no arquivo `cacerts` como entidades para assinar e emitir certificados para outras entidades, você deve gerenciar o arquivo `cacerts` cuidadosamente. O arquivo `cacerts` deve conter apenas certificados das entidades e CAs em que você confia. É sua responsabilidade verificar os certificados CA raiz confiáveis incluídos no arquivo `cacerts` e tomar suas próprias decisões de confiança. Para remover um certificado CA não confiável do arquivo `cacerts`, use o comando `-delete` do utilitário `keytool` com a opção `-cacerts`. Entre em contato com o administrador do sistema se você não tiver permissão para editar este arquivo.

Alternativamente, você pode usar seus próprios arquivos truststore e keystore. Consulte Criando um Keystore para Usar com JSSE.

Código de Exemplo Ilustrando uma Conexão de Socket Seguro Entre um Cliente e um Servidor

Os programas de exemplo no diretório `samples/sockets` ilustram como configurar uma conexão de socket seguro entre um cliente e um servidor.

Ao executar os programas cliente de exemplo, você pode se comunicar com um servidor existente, como um servidor web, ou pode se comunicar com o programa servidor de exemplo, `ClassFileServer`. Você pode executar o cliente de exemplo e os programas servidor de exemplo em máquinas diferentes conectadas à mesma rede, ou pode executá-los ambos em uma única máquina, mas a partir de diferentes janelas de terminal.

Todos os programas de exemplo `SSLSocketClient*` no diretório samples/sockets/client (e programas `URLReader*` descritos em Código de Exemplo Ilustrando Conexões HTTPS) podem ser executados com o programa servidor de exemplo `ClassFileServer`. Um exemplo de como fazer isso é mostrado em Executando SSLSocketClientWithClientAuth com ClassFileServer. Você pode fazer alterações semelhantes para executar `URLReader`, `SSLSocketClient` ou `SSLSocketClientWithTunneling` com `ClassFileServer`.

Se ocorrer um erro de autenticação durante a comunicação entre o cliente e o servidor (seja usando um servidor web ou `ClassFileServer`), é muito provável que as chaves necessárias não estejam no truststore (banco de dados de chaves de confiança). Consulte Termos e Definições. Por exemplo, o `ClassFileServer` usa um keystore chamado `testkeys` contendo a chave privada para `localhost` conforme necessário durante o handshake SSL. O keystore `testkeys` está incluído no mesmo diretório `samples/sockets/server` que o código fonte do `ClassFileServer`. Se o cliente não conseguir encontrar um certificado para a chave pública correspondente de `localhost` no truststore que ele consulta, ocorrerá um erro de autenticação. Certifique-se de usar o truststore `samplecacerts` (que contém a chave pública e o certificado do `localhost`), conforme descrito na próxima seção.

Requisitos de Configuração

Ao executar os programas de exemplo que criam uma conexão de socket seguro entre um cliente e um servidor, você precisará disponibilizar o arquivo de certificados (truststore) apropriado. Para os programas cliente e servidor, você deve usar o arquivo de certificados `samplecacerts` do diretório `samples`. O uso deste arquivo de certificados permitirá que o cliente autentique o servidor. O arquivo contém todos os certificados de Autoridade Certificadora (CA) comuns fornecidos com o JDK (no arquivo cacerts), além de um certificado para `localhost` necessário para o cliente autenticar `localhost` ao se comunicar com o servidor de exemplo `ClassFileServer`. O `ClassFileServer` usa um keystore contendo a chave privada para `localhost` que corresponde à chave pública em `samplecacerts`.

Para tornar o arquivo `samplecacerts` disponível tanto para o cliente quanto para o servidor, você pode copiá-lo para o arquivo `<java-home>/lib/security/jssecacerts`, renomeá-lo para cacerts e usá-lo para substituir o arquivo `<java-home>/lib/security/cacerts`, ou adicionar a seguinte opção à linha de comando ao executar o comando `java` para o cliente e o servidor:
```
    -Djavax.net.ssl.trustStore=path_to_samplecacerts_file
    
```

Para saber mais sobre `<java-home>`, consulte Termos e Definições.

A senha para o truststore `samplecacerts` é `changeit`. Você pode substituir seus próprios certificados nos exemplos usando o utilitário `keytool`.

Se você usar um navegador, como Mozilla Firefox ou Microsoft Internet Explorer, para acessar o servidor SSL de exemplo fornecido no exemplo `ClassFileServer`, uma caixa de diálogo pode aparecer com a mensagem de que ele não reconhece o certificado. Isso é normal porque o certificado usado com os programas de exemplo é autoassinado e é apenas para testes. Você pode aceitar o certificado para a sessão atual. Após testar o servidor SSL, você deve sair do navegador, o que exclui o certificado de teste do namespace do navegador.

Para autenticação de cliente, um certificado `duke` separado está disponível nos diretórios apropriados. A chave pública e o certificado também são armazenados no arquivo `samplecacerts`.

Executando SSLSocketClient

O programa `SSLSocketClient.java` em Código de Exemplo do JSSE na documentação do Java SE 8 demonstra como criar um cliente que usa um `SSLSocket` para enviar uma requisição HTTP e obter uma resposta de um servidor HTTPS. A saída deste programa é o código fonte HTML para `https://www.verisign.com/index.html`.

Você não deve estar atrás de um firewall para executar este programa como fornecido. Se você executá-lo de trás de um firewall, receberá uma `UnknownHostException` porque o JSSE não consegue encontrar um caminho através do seu firewall para `www.verisign.com`. Para criar um cliente equivalente que possa ser executado de trás de um firewall, configure o proxy tunneling conforme ilustrado no programa de exemplo `SSLSocketClientWithTunneling`.

Executando SSLSocketClientWithTunneling

O programa `SSLSocketClientWithTunneling.java` em Código de Exemplo do JSSE na documentação do Java SE 8 ilustra como fazer proxy tunneling para acessar um servidor web seguro de trás de um firewall. Para executar este programa, você deve definir as seguintes propriedades de sistema Java para os valores apropriados:
```
    java -Dhttps.proxyHost=webproxy
    -Dhttps.proxyPort=ProxyPortNumber
    SSLSocketClientWithTunneling
    
```

Nota:

As especificações de proxy com as opções `-D` são opcionais. Substitua `webproxy` pelo nome do seu host proxy e `ProxyPortNumber` pelo número da porta apropriado.

O programa retornará o arquivo fonte HTML de `https://www.verisign.com/index.html`.

Executando SSLSocketClientWithClientAuth

O programa `SSLSocketClientWithClientAuth.java` em Código de Exemplo do JSSE na documentação do Java SE 8 mostra como configurar um key manager para fazer autenticação de cliente, se exigido por um servidor. Este programa também assume que o cliente não está fora de um firewall. Você pode modificar o programa para conectar de dentro de um firewall seguindo o exemplo em `SSLSocketClientWithTunneling`.

Para executar este programa, você deve especificar três parâmetros: nome do host, número da porta e caminho do arquivo solicitado. Para espelhar os exemplos anteriores, você pode executar este programa sem autenticação de cliente definindo o host como `www.verisign.com`, a porta como `443` e o caminho do arquivo solicitado como `https://www.verisign.com/`. A saída ao usar esses parâmetros é o HTML para o site `https://www.verisign.com/`.

Para executar `SSLSocketClientWithClientAuth` para fazer autenticação de cliente, você deve acessar um servidor que solicite autenticação de cliente. Você pode usar o programa de exemplo `ClassFileServer` como este servidor. Isso é descrito nas seções a seguir.

Executando ClassFileServer

O programa aqui referido como `ClassFileServer` é composto por dois arquivos: `ClassFileServer.java` e `ClassServer.java` em Código de Exemplo do JSSE na documentação do Java SE 8.

Para executá-los, execute `ClassFileServer.class`, que requer os seguintes parâmetros:

  * `port` pode ser qualquer número de porta não utilizado disponível, por exemplo, você pode usar o número `2001`.
  * `docroot` indica o diretório no servidor que contém o arquivo que você deseja recuperar. Por exemplo, no Linux, você pode usar `/home/userid/` (onde `userid` se refere ao seu UID particular), enquanto no Windows, você pode usar `c:\`.
  * `TLS` é um parâmetro opcional que indica que o servidor deve usar SSL ou TLS.
  * `true` é um parâmetro opcional que indica que a autenticação de cliente é necessária. Este parâmetro é consultado apenas se o parâmetro TLS estiver definido.

Nota:

Os parâmetros `TLS` e `true` são opcionais. Se você os omitir, indicando que um servidor de arquivos comum (não TLS) deve ser usado, sem autenticação, então nada acontece. Isso ocorre porque um lado (o cliente) está tentando negociar com TLS, enquanto o outro (o servidor) não está, então eles não podem se comunicar.

O servidor espera requisições GET no formato `GET /path_to_file`.

Executando SSLSocketClientWithClientAuth com ClassFileServer

Você pode usar os programas de exemplo `SSLSocketClientWithClientAuth.java` e `ClassFileServer` em Código de Exemplo do JSSE na documentação do Java SE 8 para configurar a comunicação autenticada, onde o cliente e o servidor são autenticados um ao outro. Você pode executar ambos os programas de exemplo em máquinas diferentes conectadas à mesma rede, ou pode executá-los ambos em uma única máquina, mas a partir de diferentes janelas de terminal ou janelas de prompt de comando. Para configurar tanto o cliente quanto o servidor, faça o seguinte:

  1. Execute o programa `ClassFileServer` de uma máquina ou janela de terminal.

Consulte Executando ClassFileServer.

  2. Execute o programa `SSLSocketClientWithClientAuth` em outra máquina ou janela de terminal. `SSLSocketClientWithClientAuth` requer os seguintes parâmetros:
     * `host` é o nome do host da máquina que você está usando para executar `ClassFileServer`.
     * `port` é a mesma porta que você especificou para `ClassFileServer`.
     * `requestedfilepath` indica o caminho para o arquivo que você deseja recuperar do servidor. Você deve fornecer este parâmetro como `/filepath`. Barras inclinadas para a frente são necessárias no caminho do arquivo porque ele é usado como parte de uma instrução GET, que requer barras inclinadas para a frente, independentemente do tipo de sistema operacional que você está executando. A instrução é formada da seguinte maneira:
```
 "GET " + requestedfilepath + " HTTP/1.0"
           
```

Nota:

Você pode modificar os comandos `GET` de outras aplicações `SSLClient*` para conectar a uma máquina local executando `ClassFileServer`.

Código de Exemplo Ilustrando Conexões HTTPS

Existem duas APIs primárias para acessar comunicações seguras através do JSSE. Uma maneira é através de uma API de nível de socket que pode ser usada para comunicações seguras arbitrárias, como ilustrado pelos programas de exemplo `SSLSocketClient`, `SSLSocketClientWithTunneling` e `SSLSocketClientWithClientAuth` (com e sem `ClassFileServer`).

Uma segunda maneira, e muitas vezes mais simples, é através da API URL padrão do Java. Você pode se comunicar de forma segura com um servidor web habilitado para SSL usando o protocolo ou esquema URL HTTPS com a classe `java.net.URL`.

O suporte para esquemas de URL HTTPS é implementado em muitos dos navegadores comuns, o que permite o acesso a comunicações seguras sem a necessidade da API de nível de socket fornecida com o JSSE.

Um exemplo de URL é `https://www.verisign.com`.

O gerenciamento de confiança e chaves para a implementação de URL HTTPS é específico do ambiente. A implementação do JSSE fornece uma implementação de URL HTTPS. Para usar uma implementação de protocolo HTTPS diferente, defina `java.protocol.handler.pkgs`. Consulte Como Especificar uma Propriedade de Sistema java.lang para o nome do pacote. Consulte a documentação da classe `java.net.URL` para obter detalhes.

Os exemplos que você pode baixar com o JSSE incluem dois programas de exemplo que ilustram como criar uma conexão HTTPS. Ambos os programas de exemplo (`URLReader.java` e `URLReaderWithOptions.java`) estão no diretório `samples/urls`.

Executando URLReader

O programa `URLReader.java` em Código de Exemplo do JSSE na documentação do Java SE 8 ilustra o uso da classe URL para acessar um site seguro. A saída deste programa é o código fonte HTML para `https://www.verisign.com/`. Por padrão, a implementação do protocolo HTTPS incluída com o JSSE é usada. Para usar uma implementação diferente, defina o valor da propriedade de sistema `java.protocol.handler.pkgs` para ser o nome do pacote que contém a implementação.

Se você estiver executando o código de exemplo atrás de um firewall, então você deve definir as propriedades de sistema `https.proxyHost` e `https.proxyPort`. Por exemplo, para usar o host proxy "webproxy" na porta 8080, você pode usar as seguintes opções para o comando `java`:
```
    -Dhttps.proxyHost=webproxy
    -Dhttps.proxyPort=8080
    
```

Alternativamente, você pode definir as propriedades de sistema dentro do código fonte com o método `setProperty()` de `java.lang.System`. Por exemplo, em vez de usar as opções de linha de comando, você pode incluir as seguintes linhas em seu programa:
```
    System.setProperty("java.protocol.handler.pkgs", "com.ABC.myhttpsprotocol");
    System.setProperty("https.proxyHost", "webproxy");
    System.setProperty("https.proxyPort", "8080");
    
```

Executando URLReaderWithOptions

O programa `URLReaderWithOptions.java` em Código de Exemplo do JSSE na documentação do Java SE 8 é essencialmente o mesmo que o programa `URLReader.java`, exceto que ele permite que você insira opcionalmente qualquer ou todas as seguintes propriedades de sistema como argumentos para o programa ao executá-lo:

  * `java.protocol.handler.pkgs`
  * `https.proxyHost`
  * `https.proxyPort`
  * `https.cipherSuites`

Para executar `URLReaderWithOptions`, digite o seguinte comando:
```
    java URLReaderWithOptions [-h proxyhost -p proxyport] [-k protocolhandlerpkgs] [-c ciphersarray]
    
```

Nota:

Múltiplos protocol handlers podem ser incluídos no argumento `protocolhandlerpkgs` como uma lista com itens separados por barras verticais. Múltiplos nomes de cipher suite SSL podem ser incluídos no argumento `ciphersarray` como uma lista com itens separados por vírgulas. Os nomes de cipher suite possíveis são os mesmos retornados pelo método `SSLSocket.getSupportedCipherSuites()`. Os nomes das suites são retirados das especificações dos protocolos SSL e TLS.

Você precisa de um argumento `protocolhandlerpkgs` apenas se quiser usar uma implementação de protocol handler HTTPS diferente da padrão fornecida pela Oracle.

Se você estiver executando o código de exemplo atrás de um firewall, então você deve incluir argumentos para o host proxy e a porta proxy.

Além disso, você pode incluir uma lista de cipher suites para habilitar.
Aqui está um exemplo de execução de `URLReaderWithOptions` e especificação do host proxy "webproxy" na porta 8080:
```
    java URLReaderWithOptions -h webproxy -p 8080
    
```

Exemplo de Código Ilustrando uma Conexão RMI Segura

O código de exemplo no diretório `samples/rmi` ilustra como criar uma conexão segura de Java Remote Method Invocation (RMI). O código de exemplo é basicamente um exemplo "Hello World" modificado para instalar e usar uma fábrica de sockets RMI personalizada.

Exemplo de Código Ilustrando o Uso de um SSLEngine

`SSLEngine` oferece aos desenvolvedores de aplicativos flexibilidade ao escolher estratégias de I/O e computação. Em vez de vincular a implementação SSL/TLS a uma abstração de I/O específica (como `SSLSockets` de thread único), `SSLEngine` remove as restrições de I/O e computação da implementação SSL/TLS.

Como mencionado anteriormente, `SSLEngine` é uma API avançada e não é apropriada para uso casual. Alguns códigos de exemplo introdutórios são fornecidos aqui para ajudar a ilustrar seu uso. A primeira demonstração remove a maioria dos problemas de I/O e threading, e foca em muitos dos métodos do SSLEngine. A segunda demonstração é um exemplo mais realista mostrando como `SSLEngine` pode ser combinado com Java NIO para criar um servidor HTTP/HTTPS rudimentar.

Executando SSLEngineSimpleDemo

O programa `SSLEngineSimpleDemo.java` em JSSE Sample Code na documentação do Java SE 8 é uma aplicação muito simples que foca na operação do `SSLEngine` enquanto simplifica os problemas de I/O e threading. Esta aplicação cria dois objetos `SSLEngine` que trocam mensagens SSL/TLS via objetos `ByteBuffer` comuns. Um único loop executa serialmente todas as operações do engine e demonstra como uma conexão segura é estabelecida (handshaking), como os dados da aplicação são transferidos e como o engine é fechado.

O `SSLEngineResult` fornece uma grande quantidade de informações sobre o estado atual do `SSLEngine`. Este exemplo não examina todos os estados. Ele simplifica os problemas de I/O e threading a ponto de não ser um bom exemplo para um ambiente de produção; no entanto, é útil para demonstrar a função geral do `SSLEngine`.

Solução de Problemas do Código de Exemplo JSSE

Um dos problemas mais comuns que as pessoas enfrentam ao usar o JSSE é quando o JSSE recebe um certificado que é desconhecido para o mecanismo que toma decisões de confiança. Se um certificado desconhecido for recebido, o mecanismo de confiança lançará uma exceção dizendo que o certificado não é confiável. Certifique-se de que o trust store correto está sendo usado e que o JSSE está instalado e configurado corretamente.

Se você estiver usando as credenciais "localhost" ou "duke", certifique-se de ter especificado corretamente o local do arquivo samplecacerts, caso contrário, sua aplicação não funcionará. (Consulte Sample Certificates and Keys para mais informações.)

O mecanismo de depuração SSL pode ser usado para investigar tais problemas de confiança. Consulte a documentação de implementação para mais informações sobre este assunto.

#### Criando um Keystore para Usar com JSSE

Esta seção demonstra como você pode usar o utilitário `keytool` para criar um keystore PKCS12 simples adequado para uso com JSSE.

Primeiro, você cria um `keyEntry` (com chaves públicas e privadas) no keystore, e então você cria um `trustedCertEntry` correspondente (apenas chaves públicas) em um truststore. Para autenticação de cliente, você segue um processo similar para os certificados do cliente.

Nota:

Está além do escopo deste exemplo explicar cada etapa em detalhes. Consulte The keytool Command em Java Development Kit Tool Specifications para mais informações.

A entrada do usuário é mostrada em negrito.

  1. Crie um novo keystore e certificado autoassinado com as chaves públicas e privadas correspondentes.
``` % keytool -genkeypair -alias duke -keyalg RSA -validity 7 -keystore keystore 
             
             Enter keystore password:  <password>
             What is your first and last name?
             [Unknown]:  Duke
             What is the name of your organizational unit?
             [Unknown]:  Java Software
             What is the name of your organization?
             [Unknown]:  Oracle, Inc.
             What is the name of your City or Locality?
             [Unknown]:  Palo Alto
             What is the name of your State or Province?
             [Unknown]:  CA
             What is the two-letter country code for this unit?
             [Unknown]:  US
             Is CN=Duke, OU=Java Software, O="Oracle, Inc.",
             L=Palo Alto, ST=CA, C=US correct?
             [no]:  yes
         
```

  2. Examine o keystore. Observe que o tipo de entrada é `PrivatekeyEntry`, o que significa que esta entrada tem uma chave privada associada a ela).
``` % keytool -list -v -keystore keystore
             
             Enter keystore password:  <password>
             
             Keystore type: PKCS12
             Keystore provider: SUN
         
             Your keystore contains 1 entry
         
             Alias name: duke
             Creation date: Jul 25, 2016
             Entry type: PrivateKeyEntry
             Certificate chain length: 1
             Certificate[1]:
             Owner: CN=Duke, OU=Java Software, O="Oracle, Inc.", L=Palo Alto, ST=CA, C=US
             Issuer: CN=Duke, OU=Java Software, O="Oracle, Inc.", L=Palo Alto, ST=CA, C=US
             Serial number: 210cccfc
             Valid from: Mon Jul 25 10:33:27 IST 2016 until: Mon Aug 01 10:33:27 IST 2016
             Certificate fingerprints:
                  SHA1: 80:E5:8A:47:7E:4F:5A:70:83:97:DD:F4:DA:29:3D:15:6B:2A:45:1F
                  SHA256: ED:3C:70:68:4E:86:35:9C:63:CC:B9:59:35:58:94:1F:7E:B8:B0:EE:D2:
             4B:9D:80:31:67:8A:D4:B4:7A:B5:12
             Signature algorithm name: SHA256withRSA
             Subject Public Key Algorithm: RSA (2048)
             Version: 3
         
             Extensions:
         
            #1: ObjectId: 2.5.29.14 Criticality=false
            SubjectKeyIdentifier [
            KeyIdentifier [
            0000: 7F C9 95 48 42 8D 68 91   BA 1E E6 5C 2C 6B FF 75  ...HB.h....\,k.u
            0010: 5F 19 78 43                                        _.xC
            ]
            ]
```

  3. Exporte e examine o certificado autoassinado.
``` % keytool -export -alias duke -keystore keystore -rfc -file duke.cer
             Enter keystore password:  <password>
             Certificate stored in file <duke.cer>
             % cat duke.cer
             -----BEGIN CERTIFICATE-----
             MIIDdzCCAl+gAwIBAgIEIQzM/DANBgkqhkiG9w0BAQsFADBsMQswCQYDVQQGEwJV
             UzELMAkGA1UECBMCQ0ExEjAQBgNVBAcTCVBhbG8gQWx0bzEVMBMGA1UEChMMT3Jh
             Y2xlLCBJbmMuMRYwFAYDVQQLEw1KYXZhIFNvZnR3YXJlMQ0wCwYDVQQDEwREdWtl
             MB4XDTE2MDcyNTA1MDMyN1oXDTE2MDgwMTA1MDMyN1owbDELMAkGA1UEBhMCVVMx
             CzAJBgNVBAgTAkNBMRIwEAYDVQQHEwlQYWxvIEFsdG8xFTATBgNVBAoTDE9yYWNs
             ZSwgSW5jLjEWMBQGA1UECxMNSmF2YSBTb2Z0d2FyZTENMAsGA1UEAxMERHVrZTCC
             ASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJ7+Yeu6HDZgWwkGlG4iKH9w
             vGKrxXVR57FaFyheMevrgj1ovVnQVFhfdMvjPkjWmpqLg6rfTqU4bKbtoMWV6+Rn
             uQrCw2w9xNC93hX9PxRa20UKrSRDKnUSvi1wjlaxfj0KUKuMwbbY9S8x/naYGeTL
             lwbHiiMvkoFkP2kzhVgeqHjIwSz4HRN8vWHCwgIDFWX/ZlS+LbvB4TSZkS0ZcQUV
             vJWTocOd8RB90W3bkibWkWq166XYGE1Nq1L4WIhrVJwbav6ual69yJsEpVcshVkx
             E1WKzJg7dGb03to4agbReb6+aoCUwb2vNUudNWasSrxoEFArVFGD/ZkPT0esfqEC
             AwEAAaMhMB8wHQYDVR0OBBYEFH/JlUhCjWiRuh7mXCxr/3VfGXhDMA0GCSqGSIb3
             DQEBCwUAA4IBAQAmcTm2ahsIJLayajsvm8yPzQsHA7kIwWfPPHCoHmNbynG67oHB
             fleaNvrgm/raTT3TrqQkg0525qI6Cqaoyy8JA2fAp3i+hmyoGHaIlo14bKazaiPS
             RCCqk0J8vwY3CY9nVal1XlHJMEcYV7X1sxKbuAKFoAJ29E/p6ie0JdHtQe31M7X9
             FNLYzt8EpJYUtWo13B9Oufz/Guuex9PQ7aC93rbO32MxtnnCGMxQHlaHLLPygc/x
             cffGz5Xe5s+NEm78CY7thgN+drI7icBYmv4navsnr2OQaD3AfnJ4WYSQyyUUCPxN
             zuk+B0fbLn7PCCcQspmqfgzIpgbEM9M1/yav
             -----END CERTIFICATE-----    
         
```

Alternativamente, você pode gerar uma Certificate Signing Request (CSR) com o comando `-certreq` e enviá-la para uma Certificate Authority (CA) para assinatura. Consulte Requesting a Signed Certificate from a CA em The keytool Command para um exemplo.

  4. Importe o certificado para um novo truststore.
``` % keytool -import -alias dukecert -file duke.cer -keystore truststore
             Enter keystore password:  <password>
             Re-enter new password:
             Owner: CN=Duke, OU=Java Software, O="Oracle, Inc.", L=Palo Alto, ST=CA, C=US
             Issuer: CN=Duke, OU=Java Software, O="Oracle, Inc.", L=Palo Alto, ST=CA, C=US
             Serial number: 210cccfc
             Valid from: Mon Jul 25 10:33:27 IST 2016 until: Mon Aug 01 10:33:27 IST 2016
             Certificate fingerprints:
                  SHA1: 80:E5:8A:47:7E:4F:5A:70:83:97:DD:F4:DA:29:3D:15:6B:2A:45:1F
                  SHA256: ED:3C:70:68:4E:86:35:9C:63:CC:B9:59:35:58:94:1F:7E:B8:B0:EE:D2:
             4B:9D:80:31:67:8A:D4:B4:7A:B5:12
             Signature algorithm name: SHA256withRSA
             Subject Public Key Algorithm: RSA (2048)
             Version: 3
         
             Extensions:
         
             #1: ObjectId: 2.5.29.14 Criticality=false
             SubjectKeyIdentifier [
             KeyIdentifier [
             0000: 7F C9 95 48 42 8D 68 91   BA 1E E6 5C 2C 6B FF 75  ...HB.h....\,k.u
             0010: 5F 19 78 43                                        _.xC
             ]
             ]
         
             Trust this certificate? [no]:  yes
             Certificate was added to keystore
         
             
         
```

  5. Examine o truststore. Observe que o tipo de entrada é `trustedCertEntry`, o que significa que uma chave privada não está disponível para esta entrada. Isso também significa que este arquivo não é adequado como um keystore do `KeyManager`.
``` % keytool -list -v -keystore truststore
             Enter keystore password:  <password>
             
             Keystore type: PKCS12
             Keystore provider: SUN
             
             Your keystore contains 1 entry
         
             Alias name: dukecert
             Creation date: Jul 25, 2016
             Entry type: trustedCertEntry
         
             Owner: CN=Duke, OU=Java Software, O="Oracle, Inc.", L=Palo Alto, ST=CA, C=US
             Issuer: CN=Duke, OU=Java Software, O="Oracle, Inc.", L=Palo Alto, ST=CA, C=US
             Serial number: 210cccfc
             Valid from: Mon Jul 25 10:33:27 IST 2016 until: Mon Aug 01 10:33:27 IST 2016
             Certificate fingerprints:
                  SHA1: 80:E5:8A:47:7E:4F:5A:70:83:97:DD:F4:DA:29:3D:15:6B:2A:45:1F
                  SHA256: ED:3C:70:68:4E:86:35:9C:63:CC:B9:59:35:58:94:1F:7E:B8:B0:EE:D2:
             4B:9D:80:31:67:8A:D4:B4:7A:B5:12
             Signature algorithm name: SHA256withRSA
             Subject Public Key Algorithm: RSA (2048)
             Version: 3
         
             Extensions:
         
             #1: ObjectId: 2.5.29.14 Criticality=false
             SubjectKeyIdentifier [
             KeyIdentifier [
             0000: 7F C9 95 48 42 8D 68 91   BA 1E E6 5C 2C 6B FF 75  ...HB.h....\,k.u
             0010: 5F 19 78 43                                        _.xC
             ]
             ]
         
         
         
             *******************************************
             *******************************************
         
```

  6. Agora execute suas aplicações com os keystores apropriados. Como este exemplo assume que os `X509KeyManager` e `X509TrustManager` padrão são usados, você seleciona os keystores usando as propriedades do sistema descritas em Customizing JSSE.
``` % java -Djavax.net.ssl.keyStore=keystore -Djavax.net.ssl.keyStorePassword=password Server
         % java -Djavax.net.ssl.trustStore=truststore -Djavax.net.ssl.trustStorePassword=trustword Client
```

Nota:

Este exemplo autenticou apenas o servidor. Para autenticação de cliente, forneça um keystore similar para as chaves do cliente e um truststore apropriado para o servidor.

#### Usando a Extensão Server Name Indication (SNI)

Estes exemplos ilustram como você pode usar a Extensão Server Name Indication (SNI) para aplicações cliente e servidor, e como ela pode ser aplicada a uma infraestrutura virtual.

Para todos os exemplos nesta seção, para aplicar os parâmetros depois de configurá-los, chame o método `setSSLParameters(SSLParameters)` no objeto `SSLSocket`, `SSLEngine` ou `SSLServerSocket` correspondente.

##### Exemplos Típicos de Uso no Lado do Cliente

A seguir está uma lista de casos de uso que exigem a compreensão da extensão SNI para o desenvolvimento de uma aplicação cliente:

  * Caso 1. O cliente deseja acessar `www.example.com`.

Defina o nome do host explicitamente:
``` SNIHostName serverName = new SNIHostName("www.example.com");
            sslParameters.setServerNames(Collections.singletonList(serverName)); 
```

O cliente deve sempre especificar o nome do host explicitamente.

  * Caso 2. O cliente não deseja usar SNI porque o servidor não o suporta.

Desabilite o SNI com uma lista vazia de nomes de servidor:
``` sslParameters.setServerNames(Collections.emptyList());        
        
```

  * Caso 3. O cliente deseja acessar a URL `https://www.example.com`.

Os provedores Oracle definirão o nome do host na extensão SNI por padrão, mas provedores de terceiros podem não suportar a indicação de nome de servidor padrão. Para manter sua aplicação independente de provedor, sempre defina o nome do host explicitamente.

  * Caso 4. O cliente deseja alternar um socket do modo servidor para o modo cliente.

Primeiro, alterne o modo com o seguinte método: `sslSocket.setUseClientMode(true)`. Em seguida, redefina os parâmetros de indicação de nome de servidor no socket.

##### Exemplos Típicos de Uso no Lado do Servidor

A seguir está uma lista de casos de uso que exigem a compreensão da extensão SNI para o desenvolvimento de uma aplicação servidor:

  * Caso 1. O servidor deseja aceitar todos os tipos de indicação de nome de servidor.

Se você não tiver nenhum código lidando com a extensão SNI, o servidor ignorará todos os tipos de indicação de nome de servidor.

  * Caso 2. O servidor deseja negar todas as indicações de nome de servidor do tipo `host_name`.

Defina um padrão de nome de servidor inválido para `host_name`:
``` SNIMatcher matcher = SNIHostName.createSNIMatcher("");
            Collection<SNIMatcher> matchers = new ArrayList<>(1);
            matchers.add(matcher);
            sslParameters.setSNIMatchers(matchers);        
        
```

Outra forma é criar uma subclasse de `SNIMatcher` com um método `matches()` que sempre retorna `false`:
``` class DenialSNIMatcher extends SNIMatcher {
                DenialSNIMatcher() {
                    super(StandardConstants.SNI_HOST_NAME);
                }
            
                @Override
                public boolean matches(SNIServerName serverName) {
                    return false;
                }
            }
            
            SNIMatcher matcher = new DenialSNIMatcher();
            Collection<SNIMatcher> matchers = new ArrayList<>(1);
            matchers.add(matcher);
            sslParameters.setSNIMatchers(matchers);        
        
```

  * Caso 3. O servidor deseja aceitar conexões para quaisquer nomes de host no domínio `example.com`.

Defina o nome de servidor reconhecível para `host_name` como um padrão que inclui todos os endereços `*.example.com`:
``` SNIMatcher matcher = SNIHostName.createSNIMatcher("(.*\\.)*example\\.com");
            Collection<SNIMatcher> matchers = new ArrayList<>(1);
            matchers.add(matcher);
            sslParameters.setSNIMatchers(matchers);
        
```

  * Caso 4. O servidor deseja alternar um socket do modo cliente para o modo servidor.

Primeiro, alterne o modo com o seguinte método: `sslSocket.setUseClientMode(false)`. Em seguida, redefina os parâmetros de indicação de nome de servidor no socket.

##### Trabalhando com Infraestruturas Virtuais

Esta seção descreve como usar a extensão Server Name Indication (SNI) dentro de uma infraestrutura virtual. Ela ilustra como criar um parser para mensagens ClientHello a partir de um socket, fornece exemplos de dispatchers de servidor virtual usando `SSLSocket` e `SSLEngine`, descreve o que acontece quando a extensão SNI não está disponível e demonstra como criar um `SSLContext` de failover.

Preparando o Parser ClientHello

As aplicações devem implementar uma API para analisar as mensagens ClientHello de um socket. Os exemplos a seguir ilustram as classes `SSLCapabilities` e `SSLExplorer` que podem executar essas funções.

SSLSocketClient.java encapsula as capacidades de segurança TLS/DTLS durante o handshaking (ou seja, a lista de cipher suites a serem aceitas em um handshake TLS/DTLS, a versão do registro, a versão do hello e a indicação do nome do servidor). Ele pode ser recuperado explorando os dados de rede de uma conexão TLS/DTLS através do método `SSLExplorer.explore()`.

SSLExplorer.java explora a mensagem ClientHello inicial de um cliente TLS, mas não inicia o handshaking nem consome dados de rede. O método `SSLExplorer.explore()` analisa a mensagem ClientHello e recupera os parâmetros de segurança em `SSLCapabilities`. O método deve ser chamado antes que o handshaking ocorra em qualquer conexão TLS.

Dispatcher de Servidor Virtual Baseado em SSLSocket

Esta seção descreve o procedimento para usar um dispatcher de servidor virtual baseado em `SSLSocket`.

  1. Registre o handler de nome de servidor.

Nesta etapa, a aplicação pode criar diferentes objetos `SSLContext` para diferentes indicações de nome de servidor, ou vincular uma determinada indicação de nome de servidor a uma máquina virtual ou sistema distribuído especificado.

Por exemplo, se o nome do servidor for `www.example.org`, então o handler de nome de servidor registrado pode ser para um serviço web de hospedagem virtual local. O serviço web de hospedagem virtual local usará o `SSLContext` especificado. Se o nome do servidor for `www.example.com`, então o handler de nome de servidor registrado pode ser para uma máquina virtual hospedada em `10.0.0.36`. O handler pode mapear esta conexão para a máquina virtual.

  2. Crie um `ServerSocket` e aceite a nova conexão.
``` ServerSocket serverSocket = new ServerSocket(serverPort);
         Socket socket = serverSocket.accept();
         
```

  3. Leia e armazene bytes do stream de entrada do socket, e então explore os bytes armazenados.
``` InputStream ins = socket.getInputStream();
         byte[] buffer = new byte[0xFF];
         int position = 0;
         SSLCapabilities capabilities = null;
             
         // Read the header of TLS record
         while (position < SSLExplorer.RECORD_HEADER_SIZE) {
             int count = SSLExplorer.RECORD_HEADER_SIZE - position;
             int n = ins.read(buffer, position, count);
             if (n < 0) {
                 throw new Exception("unexpected end of stream!");
             }
             position += n;
         }
             
         // Get the required size to explore the SSL capabilities
         int recordLength = SSLExplorer.getRequiredSize(buffer, 0, position);
         if (buffer.length < recordLength) {
             buffer = Arrays.copyOf(buffer, recordLength);
         }
             
         while (position < recordLength) {
             int count = recordLength - position;
             int n = ins.read(buffer, position, count);
             if (n < 0) {
                 throw new Exception("unexpected end of stream!");
             }
             position += n;
         }
             
         // Explore
         capabilities = SSLExplorer.explore(buffer, 0, recordLength);
         if (capabilities != null) {
             System.out.println("Record version: " + capabilities.getRecordVersion());
             System.out.println("Hello version: " + capabilities.getHelloVersion());
         }
```

  4. Obtenha o nome de servidor solicitado a partir das capacidades exploradas.
``` List<SNIServerName> serverNames = capabilities.getServerNames();
         
```

  5. Procure o handler de nome de servidor registrado para esta indicação de nome de servidor.

Se o serviço do nome do host residir em uma máquina virtual ou outro sistema distribuído, a aplicação deve encaminhar a conexão para o destino. A aplicação precisará ler e escrever os dados brutos da internet, em vez da aplicação SSL do stream do socket.
``` Socket destinationSocket = new Socket(serverName, 443);
         // Forward buffered bytes and network data from the current socket to the destinationSocket.
         
```

Se o serviço do nome do host residir no mesmo processo, e o serviço de nome do host puder usar o `SSLSocket` diretamente, então a aplicação precisará definir a instância do `SSLSocket` para o servidor:
``` // Get service context from registered handler
         // or create the context
         SSLContext serviceContext = ...
         
         SSLSocketFactory serviceSocketFac = serviceContext.getSSLSocketFactory();
         
         // wrap the buffered bytes
         ByteArrayInputStream bais = new ByteArrayInputStream(buffer, 0, position);
         SSLSocket serviceSocket = (SSLSocket)serviceSocketFac.createSocket(socket, bais, true);
         
         // Now the service can use serviceSocket as usual.
         
```

Dispatcher de Servidor Virtual Baseado em SSLEngine

Esta seção descreve o procedimento para usar um dispatcher de servidor virtual baseado em `SSLEngine`.

  1. Registre o handler de nome de servidor.

Nesta etapa, a aplicação pode criar diferentes objetos `SSLContext` para diferentes indicações de nome de servidor, ou vincular uma determinada indicação de nome de servidor a uma máquina virtual ou sistema distribuído especificado.

Por exemplo, se o nome do servidor for `www.example.org`, então o handler de nome de servidor registrado pode ser para um serviço web de hospedagem virtual local. O serviço web de hospedagem virtual local usará o `SSLContext` especificado. Se o nome do servidor for `www.example.com`, então o handler de nome de servidor registrado pode ser para uma máquina virtual hospedada em `10.0.0.36`. O handler pode mapear esta conexão para a máquina virtual.

  2. Crie um `ServerSocket` ou `ServerSocketChannel` e aceite a nova conexão.
``` ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
         serverSocketChannel.bind(...);
         ...
         SocketChannel socketChannel = serverSocketChannel.accept();
         
```

  3. Leia e armazene bytes do stream de entrada do socket, e então explore os bytes armazenados.
``` ByteBuffer buffer = ByteBuffer.allocate(0xFF);
         SSLCapabilities capabilities = null;
         while (true) {
             // ensure the capacity
             if (buffer.remaining() == 0) {
                 ByteBuffer oldBuffer = buffer;
                 buffer = ByteBuffer.allocate(buffer.capacity() + 0xFF);
                 buffer.put(oldBuffer);
             }
         
             int n = sc.read(buffer);
             if (n < 0) {
                 throw new Exception("unexpected end of stream!");
             }
         
             int position = buffer.position();
             buffer.flip();
             capabilities = explorer.explore(buffer);
             buffer.rewind();
             buffer.position(position);
             buffer.limit(buffer.capacity());
             if (capabilities != null) {
                 System.out.println("Record version: " +
                     capabilities.getRecordVersion());
                 System.out.println("Hello version: " +
                     capabilities.getHelloVersion());
                 break;
             }
         }
         
         buffer.flip();  // reset the buffer position and limitation 
```

  4. Obtenha o nome de servidor solicitado a partir das capacidades exploradas.
``` List<SNIServerName> serverNames = capabilities.getServerNames();
         
```

  5. Procure o handler de nome de servidor registrado para esta indicação de nome de servidor.

Se o serviço do nome do host residir em uma máquina virtual ou outro sistema distribuído, a aplicação deve encaminhar a conexão para o destino. A aplicação precisará ler e escrever os dados brutos da internet, em vez da aplicação SSL do stream do socket.
``` Socket destinationSocket = new Socket(serverName, 443);
         // Forward buffered bytes and network data from the current socket to the destinationSocket.
         
```

Se o serviço do nome do host residir no mesmo processo, e o serviço de nome do host puder usar o `SSLEngine` diretamente, então a aplicação simplesmente alimentará os dados de rede para a instância do `SSLEngine`:
``` // Get service context from registered handler
         // or create the context
         SSLContext serviceContext = ...
             
         SSLEngine serviceEngine = serviceContext.createSSLEngine();
         // Now the service can use the buffered bytes and other byte buffer as usual.
         
```

Extensão SNI Não Disponível

Se não houver indicação de nome de servidor em uma mensagem ClientHello, não há como selecionar o serviço apropriado de acordo com o SNI. Para tais casos, a aplicação pode precisar especificar um serviço padrão, para que a conexão possa ser delegada a ele se não houver indicação de nome de servidor.

SSLContext de Failover

O método `SSLExplorer.explore()` não verifica a validade do conteúdo TLS/DTLS. Se o formato do registro não estiver em conformidade com a especificação TLS/DTLS, ou se o método `explore()` for invocado após o início do handshaking, o método pode lançar uma `IOException` e ser incapaz de produzir dados de rede. Nesses casos, trate a exceção lançada por `SSLExplorer.explore()` usando um `SSLContext` de failover, que não é usado para negociar uma conexão TLS/DTLS, mas para fechar a conexão com a mensagem de alerta apropriada. O exemplo a seguir ilustra um `SSLContext` de failover. Você pode encontrar um exemplo da classe `DenialSNIMatcher` no Caso 2 em Typical Server-Side Usage Examples.
```
    byte[] buffer = ...       // dados de rede armazenados em buffer
    boolean failed = true;    // SSLExplorer.explore() lança uma exceção
    
    SSLContext context = SSLContext.getInstance("TLS");
    // o SSLContext de failover
        
    context.init(null, null, null);
    SSLSocketFactory sslsf = context.getSocketFactory();
    ByteArrayInputStream bais = new ByteArrayInputStream(buffer, 0, position);
    SSLSocket sslSocket = (SSLSocket)sslsf.createSocket(socket, bais, true);
    
    SNIMatcher matcher = new DenialSNIMatcher();
    Collection<SNIMatcher> matchers = new ArrayList<>(1);
    matchers.add(matcher);
    SSLParameters params = sslSocket.getSSLParameters();
    params.setSNIMatchers(matchers);    // nenhum nome de servidor reconhecível
    sslSocket.setSSLParameters(params);
    
    try {
        InputStream sslIS = sslSocket.getInputStream();
        sslIS.read();
    } catch (Exception e) {
        System.out.println("Server exception " + e);
    } finally {
        sslSocket.close();
    }
    
```

### Plugabilidade de Provedores

O JSSE é totalmente plugável e não restringe de forma alguma o uso de provedores JSSE de terceiros.