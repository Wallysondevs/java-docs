# Visão Geral do Protocolo Transport Layer Security (TLS)

## Visão Geral do Protocolo Transport Layer Security (TLS)

Transport Layer Security (TLS) é o protocolo mais amplamente utilizado para implementar criptografia na web. O TLS usa uma combinação de processos criptográficos para fornecer comunicação segura em uma rede. Esta seção oferece uma introdução ao TLS e aos processos criptográficos que ele utiliza.

O TLS fornece um aprimoramento seguro ao protocolo padrão de sockets TCP/IP usado para comunicações na Internet. Conforme mostrado na [Tabela 8-10](<#/doc/guides/security/transport-layer-security-tls-protocol-overview>), a camada de sockets seguros é adicionada entre a camada de transporte e a camada de aplicação na pilha de protocolos TCP/IP padrão. A aplicação mais comumente usada com TLS é o Hypertext Transfer Protocol (HTTP), o protocolo para páginas web da Internet. Outras aplicações, como Net News Transfer Protocol (NNTP), Telnet, Lightweight Directory Access Protocol (LDAP), Interactive Message Access Protocol (IMAP) e File Transfer Protocol (FTP), também podem ser usadas com TLS.

Tabela 8-10 Pilha de Protocolos TCP/IP com TLS

Camada TCP/IP | Protocolo
---|---
Camada de Aplicação | HTTP, NNTP, Telnet, FTP, e assim por diante
Transport Layer Security | TLS
Transmission Control Protocol | TCP
Internet Layer | IP

O Secure Socket Layer (SSL) foi desenvolvido pela Netscape em 1994 e, com a contribuição da comunidade da Internet, evoluiu para se tornar um padrão. Atualmente, está sob o controle da organização internacional de padrões, a Internet Engineering Task Force (IETF). A IETF renomeou o SSL para TLS e lançou a primeira especificação, versão 1.0, em janeiro de 1999. O TLS 1.0 é uma atualização modesta para a versão mais recente do SSL, versão 3.0. Esta atualização corrigiu defeitos em versões anteriores e proibiu o uso de algoritmos fracos conhecidos. O TLS 1.1 foi lançado em abril de 2006, o TLS 1.2 em agosto de 2008 e o TLS 1.3 em agosto de 2018. O TLS 1.3 é uma grande revisão do protocolo TLS e oferece melhorias significativas de segurança e desempenho em relação às versões anteriores.

### Como o TLS Funciona

Uma das razões pelas quais o TLS é eficaz é que ele usa vários processos criptográficos diferentes. O TLS usa criptografia de chave pública para fornecer autenticação e criptografia de chave secreta com funções hash para fornecer privacidade e integridade de dados. Antes de você poder entender o TLS, é útil compreender esses processos criptográficos.

### Processos Criptográficos

O objetivo principal da criptografia é dificultar que um terceiro não autorizado acesse e compreenda a comunicação privada entre duas partes. Nem sempre é possível restringir todo o acesso não autorizado aos dados, mas os dados privados podem ser tornados ininteligíveis para partes não autorizadas através do processo de criptografia. A criptografia usa algoritmos complexos para converter a mensagem original (texto claro) em uma mensagem codificada (texto cifrado). Os algoritmos usados para criptografar e descriptografar dados transferidos por uma rede geralmente se enquadram em duas categorias: criptografia de chave secreta e criptografia de chave pública.

Tanto a criptografia de chave secreta quanto a criptografia de chave pública dependem do uso de uma chave criptográfica ou par de chaves acordado. Uma chave é uma sequência de bits que é usada pelo algoritmo ou algoritmos criptográficos durante o processo de criptografia e descriptografia dos dados. Uma chave criptográfica é como uma chave para uma fechadura; somente com a chave certa você pode abrir a fechadura.

Transmitir uma chave com segurança entre duas partes comunicantes não é uma questão trivial. Um certificado de chave pública permite que uma parte transmita sua chave pública com segurança, ao mesmo tempo em que fornece garantia ao receptor da autenticidade da chave pública. Consulte [Certificados de Chave Pública](<#/doc/guides/security/transport-layer-security-tls-protocol-overview>).

As descrições dos processos criptográficos em criptografia de chave secreta e criptografia de chave pública seguem convenções amplamente utilizadas pela comunidade de segurança: as duas partes comunicantes são rotuladas com os nomes Alice e Bob. O terceiro não autorizado, também conhecido como atacante, é chamado Charlie.

#### Criptografia de Chave Secreta

Com a criptografia de chave secreta, ambas as partes comunicantes, Alice e Bob, usam a mesma chave para criptografar e descriptografar as mensagens. Antes que quaisquer dados criptografados possam ser enviados pela rede, Alice e Bob devem ter a chave e devem concordar com o algoritmo criptográfico que usarão para criptografia e descriptografia.

Um dos principais problemas da criptografia de chave secreta é a questão logística de como obter a chave de uma parte para a outra sem permitir o acesso a um atacante. Se Alice e Bob estão protegendo seus dados com criptografia de chave secreta, e se Charlie obtiver acesso à chave deles, então Charlie poderá entender quaisquer mensagens secretas que ele interceptar entre Alice e Bob. Charlie não só pode descriptografar as mensagens de Alice e Bob, mas também pode fingir que é Alice e enviar dados criptografados para Bob. Bob não saberá que a mensagem veio de Charlie, e não de Alice.

Depois que o problema da distribuição de chaves secretas é resolvido, a criptografia de chave secreta pode ser uma ferramenta valiosa. Os algoritmos fornecem excelente segurança e criptografam dados relativamente rápido. A maioria dos dados sensíveis enviados em uma sessão TLS é enviada usando criptografia de chave secreta.

A criptografia de chave secreta também é chamada de criptografia simétrica porque a mesma chave é usada para criptografar e descriptografar os dados. Algoritmos criptográficos de chave secreta bem conhecidos incluem Advanced Encryption Standard (AES), Triple Data Encryption Standard (3DES) e Rivest Cipher 4 (RC4).

#### Criptografia de Chave Pública

A criptografia de chave pública resolve o problema logístico da distribuição de chaves usando tanto uma chave pública quanto uma chave privada. A chave pública pode ser enviada abertamente pela rede, enquanto a chave privada é mantida em segredo por uma das partes comunicantes. As chaves pública e privada são inversas criptográficas uma da outra; o que uma chave criptografa, a outra chave descriptografa.

Suponha que Bob queira enviar uma mensagem secreta para Alice usando criptografia de chave pública. Alice tem uma chave pública e uma chave privada, então ela mantém sua chave privada em um local seguro e envia sua chave pública para Bob. Bob criptografa a mensagem secreta para Alice usando a chave pública de Alice. Alice pode posteriormente descriptografar a mensagem com sua chave privada.

Se Alice criptografa uma mensagem usando sua chave privada e envia a mensagem criptografada para Bob, então Bob pode ter certeza de que os dados que ele recebe vêm de Alice; se Bob pode descriptografar os dados com a chave pública de Alice, a mensagem deve ter sido criptografada por Alice com sua chave privada, e somente Alice tem a chave privada de Alice. O problema é que qualquer outra pessoa também pode ler a mensagem porque a chave pública de Alice é pública. Embora este cenário não permita a comunicação segura de dados, ele fornece a base para assinaturas digitais. Uma assinatura digital é um dos componentes de um certificado de chave pública e é usada em TLS para autenticar um cliente ou um servidor. Consulte [Certificados de Chave Pública](<#/doc/guides/security/transport-layer-security-tls-protocol-overview>) e [Assinaturas Digitais](<#/doc/guides/security/transport-layer-security-tls-protocol-overview>).

A criptografia de chave pública também é chamada de criptografia assimétrica porque diferentes chaves são usadas para criptografar e descriptografar os dados. Um algoritmo criptográfico de chave pública bem conhecido frequentemente usado com TLS é o algoritmo Rivest Shamir Adleman (RSA). Outro algoritmo de chave pública usado com TLS que é projetado especificamente para troca de chave secreta é o algoritmo Diffie-Hellman (DH). A criptografia de chave pública requer computações extensas, tornando-a muito lenta. Portanto, ela é tipicamente usada apenas para criptografar pequenas partes de dados, como chaves secretas, em vez de para a maior parte das comunicações de dados criptografados.

#### Comparação Entre Criptografia de Chave Secreta e Chave Pública

Tanto a criptografia de chave secreta quanto a criptografia de chave pública têm pontos fortes e fracos. Com a criptografia de chave secreta, os dados podem ser criptografados e descriptografados rapidamente, mas como ambas as partes comunicantes devem compartilhar as mesmas informações de chave secreta, a logística da troca da chave pode ser um problema. Com a criptografia de chave pública, a troca de chaves não é um problema porque a chave pública não precisa ser mantida em segredo, mas os algoritmos usados para criptografar e descriptografar dados exigem computações extensas e, portanto, são muito lentos.

#### Certificados de Chave Pública

Um certificado de chave pública fornece uma maneira segura para uma entidade transmitir sua chave pública para ser usada em criptografia assimétrica. O certificado de chave pública evita a seguinte situação: se Charlie criar sua própria chave pública e chave privada, ele pode alegar que é Alice e enviar sua chave pública para Bob. Bob poderá se comunicar com Charlie, mas Bob pensará que está enviando seus dados para Alice.

Um certificado de chave pública pode ser considerado o equivalente digital de um passaporte. Ele é emitido por uma organização confiável e fornece identificação para o portador. Uma organização confiável que emite certificados de chave pública é conhecida como Autoridade Certificadora (CA). A CA pode ser comparada a um tabelião. Para obter um certificado de uma CA, é preciso fornecer prova de identidade. Uma vez que a CA está confiante de que o solicitante representa a organização que diz representar, a CA assina o certificado atestando a validade das informações contidas no certificado.

Um certificado de chave pública contém os seguintes campos:

Issuer
     A CA que emitiu o certificado. Se um usuário confia na CA que emitiu o certificado, e se o certificado é válido, então o usuário pode confiar no certificado.
Period of validity
    Um certificado tem uma data de expiração. Esta data deve ser verificada ao validar a validade de um certificado.
Subject
    Inclui informações sobre a entidade que o certificado representa.
Subject's public key
    A principal informação que o certificado fornece é a chave pública do sujeito. Todos os outros campos são fornecidos para garantir a validade desta chave.
Signature
    O certificado é assinado digitalmente pela CA que emitiu o certificado. A assinatura é criada usando a chave privada da CA e garante a validade do certificado. Como apenas o certificado é assinado, e não os dados enviados na transação TLS, o TLS não oferece não-repúdio.

Se Bob aceitar a chave pública de Alice como válida apenas quando ela a enviar em um certificado de chave pública, então Bob não será enganado a enviar informações secretas para Charlie quando Charlie se passar por Alice.

Vários certificados podem ser vinculados em uma cadeia de certificados. Quando uma cadeia de certificados é usada, o primeiro certificado é sempre o do remetente. O próximo é o certificado da entidade que emitiu o certificado do remetente. Se houver mais certificados na cadeia, cada um é o da autoridade que emitiu o certificado anterior. O certificado final na cadeia é o certificado de uma CA raiz. Uma CA raiz é uma Autoridade Certificadora pública amplamente confiável. As informações para várias CAs raiz são tipicamente armazenadas no navegador de Internet do cliente. Esta informação inclui a chave pública da CA. CAs bem conhecidas incluem Comodo, DigiCert e GoDaddy.

#### Funções Hash Criptográficas

Ao enviar dados criptografados, o TLS tipicamente usa uma função hash criptográfica para garantir a integridade dos dados. A função hash impede que Charlie adultere os dados que Alice envia para Bob.

Uma função hash criptográfica é semelhante a um checksum. A principal diferença é que, enquanto um checksum é projetado para detectar alterações acidentais nos dados, uma função hash criptográfica é projetada para detectar alterações deliberadas. Quando os dados são processados por uma função hash criptográfica, uma pequena sequência de bits, conhecida como hash, é gerada. A menor alteração na mensagem tipicamente causa uma grande alteração no hash resultante. Uma função hash criptográfica não requer uma chave criptográfica. Uma função hash frequentemente usada com TLS é o Secure Hash Algorithm (SHA). O SHA foi proposto pelo [Instituto Nacional de Padrões e Tecnologia dos EUA (NIST)](<http://www.nist.gov/index.html>).

#### Código de Autenticação de Mensagem

Um código de autenticação de mensagem (MAC) é semelhante a um hash criptográfico, exceto que ele é baseado em uma chave secreta. Quando informações de chave secreta são incluídas com os dados que são processados por uma função hash criptográfica, o hash resultante é conhecido como um HMAC.

Se Alice quiser ter certeza de que Charlie não adultera sua mensagem para Bob, ela pode calcular um HMAC para sua mensagem e anexar o HMAC à sua mensagem original. Ela pode então criptografar a mensagem mais o HMAC usando uma chave secreta que ela compartilha com Bob. Quando Bob descriptografa a mensagem e calcula o HMAC, ele será capaz de dizer se a mensagem foi modificada em trânsito. Com o TLS, um HMAC é usado na transmissão de dados seguros.

#### Assinaturas Digitais

Uma vez que um hash criptográfico é criado para uma mensagem, o hash é criptografado com a chave privada do remetente. Este hash criptografado é chamado de assinatura digital.

### O Handshake TLS 1.3

A comunicação usando TLS 1.3 inicia o handshake TLS. Esta é uma negociação inicial entre o cliente e o servidor que estabelece os parâmetros de suas interações subsequentes dentro do TLS. Consiste em três fases: troca de chaves, parâmetros do servidor e autenticação:

  1. Key Exchange (Troca de Chaves): Esta fase estabelece material de chaveamento compartilhado, como a qual grupo nomeado a chave compartilhada pode pertencer (Elliptic Curve Groups (ECDHE) ou Finite Field Groups (DHE)), e seleciona parâmetros criptográficos, como opções de cifra simétrica.

  2. Server Parameters (Parâmetros do Servidor): Esta fase estabelece outros parâmetros do handshake, como se a autenticação de cliente baseada em certificado é desejada.

  3. Authentication (Autenticação): Esta fase autentica o servidor (e opcionalmente o cliente) e fornece confirmação de chave e integridade do handshake.

#### O Protocolo TLS 1.3

A figura a seguir mostra a sequência de mensagens para o handshake TLS completo.

Figura 8-7 Handshake TLS 1.3

  1. Troca de chaves:

     1. O cliente envia uma mensagem `ClientHello` para o servidor.

     2. O servidor processa a mensagem `ClientHello` e determina os parâmetros criptográficos apropriados para a conexão. Em seguida, ele responde com sua própria mensagem `ServerHello`, que indica os parâmetros de conexão negociados. Para TLS 1.3, a mensagem `ServerHello` determina apenas as opções de chave e cifra. Outros parâmetros do handshake podem ser determinados posteriormente.

  2. Parâmetros do servidor: O servidor envia duas mensagens para estabelecer os parâmetros do servidor:

     * `EncryptedExtensions`: Esta mensagem contém respostas para extensões `ClientHello` que não são necessárias para determinar os parâmetros criptográficos, além daqueles que são específicos para certificados individuais.

     * `CertificateRequest` (opcional): Se a autenticação de cliente baseada em certificado for desejada, o servidor envia esta mensagem, que contém os parâmetros desejados para esse certificado. Esta mensagem é omitida se a autenticação de cliente não for desejada.

  3. Autenticação:

     1. O servidor envia estas mensagens de autenticação:

        * `Certificate` (opcional): Esta mensagem contém o certificado de autenticação e quaisquer outros certificados de suporte na cadeia de certificados. Esta mensagem é omitida se o servidor não estiver autenticando com um certificado.

Nota:

A mensagem `Certificate` pode conter uma chave bruta em vez de um certificado.

        * `CertificateVerify` (opcional): Esta mensagem contém uma assinatura sobre todo o handshake usando a chave privada correspondente à chave pública na mensagem `Certificate`. Esta mensagem é omitida se o servidor não estiver autenticando com um certificado.

        * `Finished`: um MAC (Message Authentication Code) sobre todo o handshake.

     2. O cliente responde com suas próprias mensagens `Certificate`, `CertificateVerify` e `Finished`. A mensagem `Certificate` é omitida se o servidor não enviou uma mensagem `CertificateRequest`. A mensagem `CertificateVerify` é omitida se o cliente não estiver autenticando com um certificado.

O cliente e o servidor agora podem enviar dados de aplicação com segurança um para o outro.

##### Troca de Chaves

As mensagens de troca de chaves, `ClientHello` e `ServerHello`, determinam as capacidades de segurança do cliente e do servidor e estabelecem segredos compartilhados, incluindo as chaves de tráfego usadas para proteger o restante do handshake e os dados da aplicação.

ClientHello

O handshake TLS começa com o cliente enviando uma mensagem `ClientHello` para o servidor. Esta mensagem contém os seguintes campos:

Nota:

As mensagens TLS podem conter campos adicionais além dos listados aqui; consulte a [especificação TLS 1.3](<https://www.rfc-editor.org/rfc/rfc8446>) para detalhes completos sobre as mensagens TLS e seus campos.

  * `cipher_suites`: Este campo contém uma lista das opções de cifra simétrica suportadas pelo cliente, especificamente o algoritmo de proteção de registro (incluindo o comprimento da chave secreta) e um hash a ser usado com Keyed-Hash Message Code (HMAC)-based Extract-and-Expand Key Derivation Function (HKDF).

  * `extensions`: As extensões facilitam a adição de novos recursos ao protocolo TLS com impacto mínimo nos clientes existentes. As extensões que a mensagem `ClientHello` pode conter, mas não se limitam a, são as seguintes:

    * `supported_versions`: Esta extensão indica quais versões do TLS o cliente suporta. A mensagem `ClientHello` deve conter esta mensagem.

    * `status_request`: Esta extensão indica que o cliente deseja usar um protocolo de status de certificado; o servidor pode não concordar em usá-lo. Um exemplo de protocolo de status de certificado é o Online Certificate Status Protocol (OCSP). Consulte [OCSP Dirigido pelo Cliente e OCSP Stapling](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

    * `supported_groups`: Esta extensão indica os grupos nomeados que o cliente suporta para troca de chaves. Esses grupos nomeados incluem grupos de curva elíptica (ECDHE) e grupos de campo finito (DHE). A mensagem `ClientHello` deve incluir esta mensagem se estiver usando troca de chaves ECDHE ou DHE.

    * `key_share`: Esta extensão contém uma lista de parâmetros criptográficos para troca de chaves. Ela contém um campo chamado `client_shares` que contém esta lista. Cada item nesta lista contém os seguintes campos:

      * `group`: O nome do grupo no qual o método criptográfico de troca de chaves é baseado. Consulte [O Provedor SunJSSE](<#/doc/guides/security/oracle-providers>) na [Documentação dos Provedores JDK](<#/doc/guides/security/oracle-providers>).

      * `key_exchange`: Informações de troca de chaves, que são determinadas pelo valor do campo `group`.

    * `pre_shared_key`: Uma chave pré-compartilhada (PSK) é um segredo compartilhado que foi previamente compartilhado entre as duas partes usando algum canal seguro antes de precisar ser usado. PSKs podem ser estabelecidas em uma conexão anterior e então usadas para estabelecer uma nova conexão. Uma vez que um handshake foi concluído, o servidor pode enviar ao cliente uma identidade PSK que corresponde a uma chave única derivada do handshake inicial. Consulte [Retomada de Sessão com uma Chave Pré-Compartilhada](<#/doc/guides/security/transport-layer-security-tls-protocol-overview>).

    * `cookie`: Quando um servidor envia uma mensagem `HelloRetryRequest`, ele pode incluir esta extensão para o cliente. (O servidor envia uma mensagem `HelloRetryRequest` em resposta a uma mensagem `ClientHello` se ele puder encontrar um conjunto aceitável de parâmetros, mas a mensagem `ClientHello` não tiver informações suficientes para prosseguir com o handshake.) Um propósito desta extensão é permitir que o servidor force o cliente a demonstrar alcançabilidade em seu endereço de rede aparente (o que fornece alguma proteção contra ataques de negação de serviço (DoS)). Quando o cliente envia uma nova mensagem `ClientHello`, ele deve copiar o conteúdo recebido no `HelloRetryRequest` para uma extensão `cookie` nesta nova mensagem `ClientHello`.

    * `server_name`: O TLS 1.3 não fornece um mecanismo para um cliente informar a um servidor o nome do servidor com o qual está entrando em contato. Os clientes podem usar esta extensão para fornecer esta informação para facilitar conexões com servidores que hospedam múltiplos servidores virtuais em um único endereço de rede. Observe que alguns servidores podem exigir que os clientes enviem esta extensão.

ServerHello

O servidor responde à mensagem `ClientHello` do cliente com uma mensagem `ServerHello` se for capaz de negociar um conjunto aceitável de parâmetros de handshake. Esta mensagem contém os seguintes campos:

  * `cipher_suite`: Este campo contém a única suíte de cifras selecionada pelo servidor da lista no campo `ClientHello.cipher_suites`.

  * `extensions`: Este campo contém extensões que são necessárias para estabelecer o contexto criptográfico e negociar a versão do protocolo. As extensões que o `ServerHello` pode conter incluem o seguinte:

    * `supported_versions`: Indica qual versão do TLS está sendo usada. A mensagem `ServerHello` deve conter esta extensão.

    * `key_share`: Esta extensão contém uma lista de parâmetros criptográficos para troca de chaves.

    * `pre_shared_key`: Esta extensão contém a chave pré-compartilhada que o servidor concordou em usar. Consulte [Retomada de Sessão com uma Chave Pré-Compartilhada](<#/doc/guides/security/transport-layer-security-tls-protocol-overview>) para informações sobre chaves pré-compartilhadas.

O servidor envia outras extensões separadamente na mensagem `EncryptedExtensions`.

##### Parâmetros do Servidor

Depois que o servidor envia uma mensagem `ServerHello` para o cliente, ele envia duas mensagens para estabelecer os parâmetros do servidor: `EncryptedExtensions` e `CertificateRequest`:

  * `EncryptedExtensions`: Esta mensagem contém respostas para extensões `ClientHello` que não são necessárias para determinar parâmetros criptográficos, além daqueles que são específicos para certificados individuais.

  * `CertificateRequest`: Se a autenticação de cliente baseada em certificado for desejada, esta mensagem é enviada. Ela contém parâmetros para um certificado solicitado do cliente. Inclui os seguintes campos:

    * `certificate_request_context`: Este campo contém um identificador que identifica a solicitação de certificado.

    * `extensions`: Este campo contém extensões que descrevem os parâmetros do certificado solicitado. Pode conter as seguintes extensões:

    * `signature_algorithms`: Esta extensão indica quais algoritmos de assinatura podem ser usados nas mensagens `CertificateVerify`. A mensagem `ServerHello` deve conter esta extensão.

    * `signature_algorithms_cert`: Esta extensão indica quais algoritmos de assinatura podem ser usados em assinaturas digitais. Se esta mensagem não for enviada, ela usa os valores especificados na extensão `signature_algorithms`.

    * `certificate_authorities`: Esta extensão indica quais autoridades certificadoras o servidor aceita.

    * `supported_groups`: Esta mensagem contém grupos nomeados que o servidor prefere. O cliente pode usar esta informação para alterar quais grupos ele usa em sua extensão `key_share` em conexões subsequentes.

##### Autenticação

As últimas três mensagens que o servidor e o cliente enviam um para o outro em um handshake TLS são `Certificate`, `CertificateVerify` e `Finished`.

Certificate

Esta mensagem contém o certificado de autenticação e quaisquer outros certificados de suporte na cadeia de certificados. O servidor deve enviar esta mensagem se o método de troca de chaves usar certificados para autenticação. O cliente deve enviá-la se e somente se o servidor solicitou autenticação de cliente por meio de uma mensagem `CertificateRequest`. A mensagem de certificado inclui os seguintes campos:

  * `certificate_list`: Este campo contém uma sequência de estruturas `CertificateEntry`, cada uma contendo um único certificado e um conjunto de extensões.

  * `extensions`: As extensões que a mensagem `Certificate` pode conter incluem o seguinte:

    * `status_request`: Consulte [OCSP Dirigido pelo Cliente e OCSP Stapling](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)

    * `signed_certificate_timestamp`: Clientes TLS não aceitarão certificados a menos que sejam registrados. Quando um certificado válido é enviado a um log, o log deve retornar um Signed Certificate Timestamp (SCT); consulte [RFC 6962: Certificate Transparency](<https://tools.ietf.org/html/rfc6962>).

CertificateVerify

Esta mensagem contém uma assinatura sobre todo o handshake usando a chave privada correspondente à chave pública na mensagem `Certificate`. Ela fornece prova de que o cliente ou o servidor possui a chave privada correspondente ao seu certificado. Esta mensagem inclui os seguintes campos:

  * `algorithm`: Este campo contém o algoritmo de assinatura usado. Consulte [O Provedor SunJSSE](<#/doc/guides/security/oracle-providers>) na [Documentação dos Provedores JDK](<#/doc/guides/security/oracle-providers>) para algoritmos suportados.

  * `signature`: Este campo contém a assinatura digital usando o algoritmo.

Finished

Esta mensagem contém um Message Authentication Code (MAC) sobre todo o handshake. Uma vez que o cliente e o servidor verificaram as mensagens `Finished` que receberam de seus pares, ambos os lados podem enviar e receber dados de aplicação pela conexão.

#### Retomada de Sessão com uma Chave Pré-Compartilhada

Uma chave pré-compartilhada (PSK) é um segredo compartilhado que foi previamente compartilhado entre as duas partes usando algum canal seguro antes de precisar ser usado. Você pode estabelecer uma PSK durante um handshake TLS e então usá-la para estabelecer uma nova conexão em outro handshake; isso é chamado de retomada de sessão com uma PSK. A PSK corresponde a uma chave única derivada do handshake inicial. Se o servidor aceitar a PSK ao estabelecer uma nova conexão, então o contexto de segurança desta conexão é criptograficamente vinculado à conexão original, e a chave derivada do handshake inicial é usada para inicializar o estado criptográfico em vez do handshake TLS completo.

As figuras a seguir mostram dois handshakes, o primeiro estabelece uma PSK e o segundo a utiliza.

Figura 8-8 Handshake TLS 1.3 que Estabelece uma PSK

Figura 8-9 Handshake TLS 1.3 que Usa uma PSK

  1. O cliente envia uma mensagem `ClientHello` com uma extensão `key_share` para o servidor. Esta extensão lista quais métodos criptográficos de troca de chaves o cliente suporta.

  2. O servidor responde com uma mensagem `ServerHello` com uma extensão `key_share`. Esta extensão contém o método criptográfico que ele deseja usar para a troca de chaves.

  3. O servidor envia seus parâmetros de servidor para o cliente.

  4. Tanto o servidor quanto o cliente trocam mensagens de autenticação.

  5. O servidor envia uma mensagem `NewSessionTicket` para o cliente, que contém uma PSK que o cliente pode então usar para futuros handshakes, incluindo-a na extensão `pre_shared_key` em sua mensagem `ClientHello`.

  6. O cliente e o servidor agora podem trocar dados de aplicação criptografados.

  7. Em um handshake futuro, o cliente envia ao servidor uma mensagem `ClientHello` com as extensões `key_share` e `pre_shared_key`. A extensão `pre_shared_key` contém uma PSK enviada em uma mensagem `NewSessionTicket`.

  8. O servidor responde com uma mensagem `ServerHello` com as extensões `pre_shared_key` e `key_share`. A extensão `pre_shared_key` contém a PSK que o servidor concordou em usar.

  9. O servidor envia seus parâmetros para o cliente.

  10. O servidor e o cliente enviam mensagens `Finished` um para o outro. Eles não realizam a fase de autenticação, pois o contexto de segurança desta conexão está criptograficamente vinculado à conexão original.

  11. O cliente e o servidor agora podem trocar dados de aplicação criptografados.

Nota:

Os seguintes itens não são suportados no JDK 11:

  * Retomada usando apenas PSK: Você deve usar PSKs com troca de chaves (EC)DHE, que fornece sigilo de encaminhamento em combinação com chaves compartilhadas. A retomada usando apenas PSK é menos segura em relação ao sigilo de encaminhamento e retroativo.

  * Zero Round Trip Time Resumption (0-RTT): Isso permite que o cliente e o servidor enviem dados de aplicação nas primeiras mensagens (`ClientHello` e `ServerHello`) um para o outro. O cliente usa uma PSK para criptografar os dados de aplicação que ele envia inicialmente com o `ClientHello` e para autenticar o servidor. Isso tem os problemas de segurança da retomada usando apenas PSK e algum potencial para ataques de repetição.

  * PSKs de servidor sem estado: [RFC5077: Transport Layer Security (TLS) Session Resumption without Server-Site State](<https://tools.ietf.org/html/rfc5077>) descreve um mecanismo que permite ao servidor retomar sessões e evitar manter o estado de sessão por cliente. Este mecanismo reduziria o uso de memória do servidor à custa do sigilo de encaminhamento para retomada usando apenas PSK.

  * Estabelecimento de PSK fora de banda: Isso significa a produção de PSKs por outros meios que não as mensagens `NewSessionTicket`.

#### Mensagens Pós-Handshake

O cliente e o servidor podem enviar outras mensagens após o handshake: mensagem de novo ticket de sessão, autenticação pós-handshake e atualização de chave.

##### Mensagem de Novo Ticket de Sessão

A mensagem `NewSessionTicket`, enviada pelo servidor após receber a mensagem `Finished`, contém uma chave pré-compartilhada que o cliente pode então usar para futuros handshakes. Consulte [Retomada de Sessão com uma Chave Pré-Compartilhada](<#/doc/guides/security/transport-layer-security-tls-protocol-overview>).
##### Autenticação Pós-Handshake

Se o cliente enviou a extensão `post_handshake_auth`, o servidor pode solicitar a autenticação do cliente a qualquer momento após o handshake, enviando uma mensagem `CertificateRequest`. Se o cliente se autenticar, ele deve enviar as mensagens `Certificate`, `CertificateVerify` e `Finished`. Se o cliente recusar, ele deve enviar uma mensagem `Certificate` que não contenha certificados e a mensagem `Finished`.

##### Mensagem KeyUpdate

A mensagem de handshake `KeyUpdate` é usada para indicar que o remetente está atualizando suas chaves criptográficas de envio. Ela substitui a mensagem `ChangeCipherSpec` no TLS 1.2.

Você pode especificar um limite na quantidade de dados que um algoritmo pode criptografar com um conjunto específico de chaves usando a Propriedade de Segurança `jdk.tls.keyLimits`. Consulte [Limitando a Quantidade de Dados que Algoritmos Podem Criptografar com um Conjunto de Chaves](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

#### Riscos de Compatibilidade e Problemas Conhecidos

Melhorias no JSSE podem introduzir problemas de compatibilidade e outros problemas conhecidos, que são descritos nesta seção.

TLS 1.3 Não é Diretamente Compatível com Versões Anteriores

O TLS 1.3 não é diretamente compatível com versões anteriores. Embora o TLS 1.3 possa ser implementado com um modo de compatibilidade retroativa, ainda existem vários riscos de compatibilidade a serem considerados ao atualizar para o TLS 1.3:

  * O TLS 1.3 usa uma política de half-close, enquanto o TLS 1.2 e anteriores usam uma política de duplex-close. Para aplicações que dependem da política de duplex-close, pode haver problemas de compatibilidade ao atualizar para o TLS 1.3.

  * A extensão `signature_algorithms_cert` exige que algoritmos de assinatura predefinidos sejam usados para autenticação de certificado. Na prática, no entanto, uma aplicação pode usar algoritmos de assinatura não suportados.

  * O algoritmo de assinatura DSA não é suportado no TLS 1.3. Se um servidor estiver configurado para usar apenas certificados DSA, ele não poderá negociar uma conexão TLS 1.3.

  * As cipher suites suportadas para TLS 1.3 não são as mesmas do TLS 1.2 e anteriores. Se uma aplicação codificar cipher suites que não são mais suportadas, ela pode não conseguir usar o TLS 1.3 sem modificações em seu código, por exemplo `TLS_AES_128_GCM_SHA256` (1.3 e posterior) versus `TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA` (1.2 e anterior).

  * Os comportamentos de retomada de sessão e atualização de chave do TLS 1.3 são diferentes do TLS 1.2 e anteriores. O impacto na compatibilidade deve ser mínimo, mas pode ser um risco se uma aplicação depender dos detalhes do handshake dos protocolos TLS.

### O Handshake TLS 1.2

A comunicação usando SSL começa com uma troca de informações entre o cliente e o servidor. Essa troca de informações é chamada de handshake SSL. O handshake SSL inclui as seguintes etapas:

  1. Negociação da cipher suite

A sessão SSL começa com uma negociação entre o cliente e o servidor sobre qual cipher suite eles usarão. Uma cipher suite é um conjunto de algoritmos criptográficos e tamanhos de chave que um computador pode usar para criptografar dados. A cipher suite inclui informações sobre os algoritmos de troca de chave pública ou algoritmos de acordo de chave, e funções hash criptográficas. O cliente informa ao servidor quais cipher suites ele tem disponíveis, e o servidor escolhe a melhor cipher suite mutuamente aceitável.

  2. Autenticação da identidade do servidor (opcional)

No SSL, a etapa de autenticação é opcional, mas no exemplo de uma transação de e-commerce pela web, o cliente geralmente desejará autenticar o servidor. Autenticar o servidor permite que o cliente tenha certeza de que o servidor representa a entidade que o cliente acredita que o servidor representa.

Para provar que um servidor pertence à organização que ele afirma representar, o servidor apresenta seu certificado de chave pública ao cliente. Se este certificado for válido, o cliente pode ter certeza da identidade do servidor.

O cliente e o servidor trocam informações que lhes permitem concordar com a mesma chave secreta. Por exemplo, com RSA, o cliente usa a chave pública do servidor, obtida do certificado de chave pública, para criptografar as informações da chave secreta. O cliente envia as informações da chave secreta criptografada para o servidor. Somente o servidor pode descriptografar esta mensagem porque a chave privada do servidor é necessária para esta descriptografia.

  3. Acordo sobre mecanismos de criptografia

Tanto o cliente quanto o servidor agora têm acesso à mesma chave secreta. Com cada mensagem, eles usam a função hash criptográfica, escolhida na primeira etapa do handshake, e informações secretas compartilhadas, para calcular um HMAC que eles anexam à mensagem. Eles então usam a chave secreta e o algoritmo de chave secreta negociado na primeira etapa do handshake para criptografar os dados seguros e o HMAC. O cliente e o servidor agora podem se comunicar com segurança usando seus dados criptografados e com hash.

#### O Protocolo TLS 1.2

[O Handshake TLS 1.2](<#/doc/guides/security/transport-layer-security-tls-protocol-overview>) fornece uma descrição de alto nível do handshake SSL, que é a troca de informações entre o cliente e o servidor antes de enviar a mensagem criptografada. [A Figura 8-10](<#/doc/guides/security/transport-layer-security-tls-protocol-overview>) fornece mais detalhes. Ela mostra a sequência de mensagens que são trocadas no handshake SSL. Mensagens que são enviadas apenas em certas situações são indicadas como opcionais. Cada uma das mensagens SSL é descrita em detalhes a seguir.

Figura 8-10 O Handshake SSL/TLS

As mensagens SSL são enviadas na seguinte ordem:

  1. Client hello: O cliente envia ao servidor informações incluindo a versão mais alta de SSL que ele suporta e uma lista das cipher suites que ele suporta (TLS 1.0 é indicado como SSL 3.1). As informações da cipher suite incluem algoritmos criptográficos e tamanhos de chave.
  2. Server hello: O servidor escolhe a versão mais alta de SSL e a melhor cipher suite que tanto o cliente quanto o servidor suportam e envia esta informação ao cliente.
  3. (Opcional) Certificate: O servidor envia ao cliente um certificado ou uma cadeia de certificados. Uma cadeia de certificados tipicamente começa com o certificado de chave pública do servidor e termina com o certificado raiz da autoridade de certificação. Esta mensagem é opcional, mas é usada sempre que a autenticação do servidor é necessária.
  4. (Opcional) Certificate request: Se o servidor precisar autenticar o cliente, ele envia ao cliente uma solicitação de certificado. Em aplicações de Internet, esta mensagem raramente é enviada.
  5. (Opcional) Server key exchange: O servidor envia ao cliente uma mensagem de troca de chave do servidor se as informações da chave pública do `Certificate` não forem suficientes para a troca de chave. Por exemplo, em cipher suites baseadas em Diffie-Hellman (DH), esta mensagem contém a chave pública DH do servidor.
  6. Server hello done: O servidor informa ao cliente que ele terminou suas mensagens de negociação iniciais.
  7. (Opcional) Certificate: Se o servidor solicitar um `Certificate` do cliente, o cliente envia sua cadeia de certificados, assim como o servidor fez anteriormente.

Nota:

Apenas algumas aplicações de servidor de Internet solicitam um certificado do cliente.

  8. Client key exchange: O cliente gera informações usadas para criar uma chave a ser usada para criptografia simétrica. Para RSA, o cliente então criptografa essas informações de chave com a chave pública do servidor e as envia para o servidor. Para cipher suites baseadas em DH, esta mensagem contém a chave pública DH do cliente.
  9. (Opcional) Certificate verify: Esta mensagem é enviada pelo cliente quando o cliente apresenta um certificado, conforme explicado anteriormente. Seu propósito é permitir que o servidor complete o processo de autenticação do cliente. Quando esta mensagem é usada, o cliente envia informações que ele assina digitalmente usando uma função hash criptográfica. Quando o servidor descriptografa esta informação com a chave pública do cliente, o servidor é capaz de autenticar o cliente.
  10. Change cipher spec: O cliente envia uma mensagem informando ao servidor para mudar para o modo criptografado.
  11. Finished: O cliente informa ao servidor que está pronto para o início da comunicação segura de dados.
  12. Change cipher spec: O servidor envia uma mensagem informando ao cliente para mudar para o modo criptografado.
  13. Finished: O servidor informa ao cliente que está pronto para o início da comunicação segura de dados. Este é o fim do handshake SSL.
  14. Dados criptografados: O cliente e o servidor se comunicam usando o algoritmo de criptografia simétrica e a função hash criptográfica negociados durante o `client hello` e o `server hello`, e usando a chave secreta que o cliente enviou ao servidor durante o `client key exchange`. O handshake pode ser renegociado neste momento. Consulte [Renegociação do Handshake](<#/doc/guides/security/transport-layer-security-tls-protocol-overview>).
  15. Mensagens de Fechamento: Ao final da conexão, cada lado envia um alerta `close_notify` para informar ao par que a conexão foi fechada.

Se os parâmetros gerados durante uma sessão SSL forem salvos, esses parâmetros podem às vezes ser reutilizados para futuras sessões SSL. Salvar os parâmetros da sessão SSL permite que a comunicação criptografada comece muito mais rapidamente.

##### Renegociação do Handshake

Uma vez que o handshake inicial é concluído e os dados da aplicação estão fluindo, qualquer um dos lados está livre para iniciar um novo handshake a qualquer momento. Uma aplicação pode querer usar uma cipher suite mais forte para operações especialmente críticas, ou uma aplicação de servidor pode querer exigir autenticação do cliente.

Independentemente do motivo, o novo handshake ocorre sobre a sessão criptografada existente, e os dados da aplicação e as mensagens de handshake são intercalados até que uma nova sessão seja estabelecida.

Sua aplicação pode iniciar um novo handshake usando um dos seguintes métodos:

  * `SSLSocket.startHandshake()`
  * `SSLEngine.beginHandshake()`

##### Escolha da Cipher Suite e Verificação de Entidade Remota

Os protocolos SSL/TLS definem uma série específica de etapas para garantir uma conexão protegida. No entanto, a escolha da cipher suite afeta diretamente o tipo de segurança que a conexão desfruta. Por exemplo, se uma cipher suite anônima for selecionada, a aplicação não terá como verificar a identidade do par remoto. Se uma suite sem criptografia for selecionada, a privacidade dos dados não poderá ser protegida. Além disso, os protocolos SSL/TLS não especificam que as credenciais recebidas devem corresponder àquelas que o par poderia ser esperado enviar. Se a conexão fosse de alguma forma redirecionada para um par mal-intencionado, mas as credenciais do mal-intencionado fossem aceitáveis com base no material de confiança atual, então a conexão seria considerada válida.

Ao usar as classes `SSLSocket` e `SSLEngine` brutas, você deve sempre verificar as credenciais do par antes de enviar quaisquer dados. As classes `SSLSocket` e `SSLEngine` não verificam automaticamente se o nome do host corresponde ao nome do host nas credenciais do par. Uma aplicação poderia ser explorada com falsificação de nome de host se o nome do host não for verificado. Desde o JDK 7, os procedimentos de identificação/verificação de endpoint podem ser tratados durante o handshake SSL/TLS. Consulte o método [SSLParameters.getEndpointIdentificationAlgorithm](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLParameters.html#getEndpointIdentificationAlgorithm\(\)>).

Protocolos como HTTPS ([HTTP Sobre TLS](<http://www.ietf.org/rfc/rfc2818.txt>)) exigem verificação de nome de host. Desde o JDK 7, a identificação de endpoint HTTPS é imposta durante o handshake para `HttpsURLConnection` por padrão. Consulte o método [SSLParameters.getEndpointIdentificationAlgorithm](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLParameters.html#getEndpointIdentificationAlgorithm\(\)>). Alternativamente, as aplicações podem usar a interface `HostnameVerifier` para substituir as regras padrão de nome de host HTTPS. Consulte [Interface HostnameVerifier](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) e [Classe HttpsURLConnection](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

### Protocolo Datagram Transport Layer Security (DTLS)

O protocolo Datagram Transport Layer Security (DTLS) é projetado para construir tráfego "TLS sobre datagrama" que não exige nem fornece entrega confiável ou em ordem de dados. A API Java Secure Socket Extension (JSSE) e o provedor de segurança SunJSSE suportam o protocolo DTLS.

Como o TLS requer um canal de transporte confiável transparente, como o TCP, ele não pode ser usado para proteger o tráfego de datagramas não confiáveis. DTLS é uma variante do TLS compatível com datagramas.

A API JSSE agora suporta [DTLS Versão 1.0](<https://datatracker.ietf.org/doc/html/rfc4347>) e [DTLS Versão 1.2](<https://datatracker.ietf.org/doc/html/rfc6347>) juntamente com os protocolos Secure Socket Layer (SSL) e Transport Layer Security (TLS).

O modelo de programação [`javax.net.ssl.SSLEngine`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLEngine.html>) é usado pela API JSSE para DTLS.

#### O Handshake DTLS

Antes que os dados da aplicação possam ser enviados ou recebidos, o protocolo DTLS requer um handshake para estabelecer parâmetros criptográficos. Este handshake requer uma série de mensagens de ida e volta entre o cliente e o servidor pelo objeto `SSLEngine`.

O handshake DTLS exige que todas as mensagens sejam recebidas corretamente. Assim, em tráfego de datagramas não confiável, pacotes perdidos ou atrasados devem ser retransmitidos. Como [`javax.net.ssl.SSLEngine`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/SSLEngine.html>) não é responsável pelas operações de I/O, cabe à aplicação fornecer temporizadores e sinalizar ao `SSLEngine` quando uma retransmissão é necessária. É importante que você implemente um temporizador e uma estratégia de retransmissão para sua aplicação. Consulte [Lidando com Retransmissões em Conexões DTLS](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>).

O handshake DTLS inclui as seguintes etapas:

  1. Negociação da cipher suite

A sessão DTLS começa com uma negociação entre o cliente e o servidor sobre qual cipher suite eles usarão. Uma cipher suite é um conjunto de algoritmos criptográficos e tamanhos de chave que um computador pode usar para criptografar dados. A cipher suite inclui informações sobre os algoritmos de troca de chave pública ou algoritmos de acordo de chave, e funções hash criptográficas. O cliente informa ao servidor quais cipher suites ele tem disponíveis, e o servidor escolhe a melhor cipher suite mutuamente aceitável.

Um cookie é trocado entre o cliente e o servidor juntamente com a cipher suite para prevenir ataques de negação de serviço (DoS).

  2. Autenticação da identidade do servidor (opcional)

A etapa de autenticação é opcional, mas no exemplo de uma transação de e-commerce pela web, o cliente escolhe autenticar o servidor. Autenticar o servidor permite que o cliente tenha certeza de que o servidor representa a entidade que o cliente acredita que o servidor representa.

Para provar que um servidor pertence à organização que ele afirma representar, o servidor apresenta seu certificado de chave pública ao cliente. Se este certificado for válido, o cliente pode ter certeza da identidade do servidor.

O cliente e o servidor trocam informações que lhes permitem concordar com a mesma chave secreta. Por exemplo, com RSA, o cliente usa a chave pública do servidor, obtida do certificado de chave pública, para criptografar as informações da chave secreta. O cliente envia as informações da chave secreta criptografada para o servidor. Somente o servidor pode descriptografar esta mensagem porque a chave privada do servidor é necessária para esta descriptografia.

  3. Acordo sobre mecanismos de criptografia

Tanto o cliente quanto o servidor agora têm acesso à mesma chave secreta. Com cada mensagem, eles usam a função hash criptográfica, escolhida na primeira etapa do handshake, e informações secretas compartilhadas, para calcular um HMAC que eles anexam à mensagem. Eles então usam a chave secreta e o algoritmo de chave secreta negociado na primeira etapa do handshake para criptografar os dados seguros e o HMAC. O cliente e o servidor agora podem se comunicar com segurança usando seus dados criptografados e com hash.

##### Troca de Mensagens do Handshake DTLS

Em um handshake DTLS, uma série de mensagens de ida e volta são trocadas entre o cliente e o servidor pelo objeto `SSLEngine`.

[A Figura 8-11](<#/doc/guides/security/transport-layer-security-tls-protocol-overview>) mostra a sequência de mensagens que são trocadas no handshake DTLS. Mensagens que são enviadas apenas em certas situações são indicadas como opcionais. Cada mensagem é descrita após a figura.

Para saber mais sobre as mensagens de handshake DTLS, consulte [DTLS Versão 1.0](<https://datatracker.ietf.org/doc/html/rfc4347>) e [DTLS Versão 1.2](<https://datatracker.ietf.org/doc/html/rfc6347>).

Figura 8-11 Handshake DTLS

[Descrição da "Figura 8-11 Handshake DTLS"](<#/>)

As seguintes mensagens de handshake são trocadas entre o cliente e o servidor durante o handshake DTLS:

  1. ClientHello:

O cliente envia ao servidor informações incluindo a versão mais alta de DTLS que ele suporta e uma lista das cipher suites que ele suporta. As informações da cipher suite incluem algoritmos criptográficos e tamanhos de chave.

  2. HelloVerifyRequest:

O servidor responde à mensagem `ClientHello` do cliente com um cookie.

  3. ClientHello:

O cliente envia uma segunda mensagem `ClientHello` ao servidor com a versão mais alta de DTLS que ele suporta e uma lista das cipher suites que ele suporta. O cookie recebido no `HelloVerifyRequest` é enviado de volta ao servidor.

  4. ServerHello:

O servidor escolhe a versão mais alta de DTLS e a melhor cipher suite que tanto o cliente quanto o servidor suportam e envia esta informação ao cliente.

  5. (Opcional) Certificate:

O servidor envia ao cliente um certificado ou uma cadeia de certificados. Uma cadeia de certificados tipicamente começa com o certificado de chave pública do servidor e termina com o certificado raiz da autoridade de certificação. Esta mensagem é opcional, mas é usada sempre que a autenticação do servidor é necessária.

  6. (Opcional) CertificateRequest:

Se o servidor precisar autenticar o cliente, ele envia ao cliente uma solicitação de certificado. Em aplicações de Internet, esta mensagem raramente é enviada.

  7. (Opcional) ServerKeyExchange:

O servidor envia ao cliente uma mensagem de troca de chave do servidor se as informações da chave pública do `Certificate` não forem suficientes para a troca de chave. Por exemplo, em cipher suites baseadas em Diffie-Hellman (DH), esta mensagem contém a chave pública DH do servidor.

  8. ServerHelloDone:

O servidor informa ao cliente que ele terminou suas mensagens de negociação iniciais.

  9. (Opcional) Certificate:

Se o servidor solicitar um `Certificate` do cliente, o cliente envia sua cadeia de certificados, assim como o servidor fez anteriormente.

Nota:

Apenas algumas aplicações de servidor de Internet solicitam um certificado do cliente.

  10. ClientKeyExchange:

O cliente gera informações usadas para criar uma chave a ser usada para criptografia simétrica. Para RSA, o cliente então criptografa essas informações de chave com a chave pública do servidor e as envia para o servidor. Para cipher suites baseadas em DH, esta mensagem contém a chave pública DH do cliente.

  11. (Opcional) CertificateVerify:

Esta mensagem é enviada pelo cliente quando o cliente apresenta um certificado, conforme explicado anteriormente. Seu propósito é permitir que o servidor complete o processo de autenticação do cliente. Quando esta mensagem é usada, o cliente envia informações que ele assina digitalmente usando uma função hash criptográfica. Quando o servidor descriptografa esta informação com a chave pública do cliente, o servidor é capaz de autenticar o cliente.

  12. ChangeCipherSpec:

O cliente envia uma mensagem informando ao servidor que os dados subsequentes serão protegidos sob a `CipherSpec` e chaves recém-negociadas e que os dados estão criptografados.

  13. Finished:

O cliente informa ao servidor que está pronto para o início da comunicação segura de dados.

  14. ChangeCipherSpec:

O servidor envia uma mensagem informando ao cliente que os dados subsequentes serão protegidos sob a `CipherSpec` e chaves recém-negociadas e que os dados estão criptografados.

  15. Finished:

O servidor informa ao cliente que está pronto para o início da comunicação segura de dados. Este é o fim do handshake DTLS.

##### Renegociação do Handshake

Uma vez que o handshake inicial é concluído e os dados da aplicação estão fluindo, qualquer um dos lados está livre para iniciar um novo handshake a qualquer momento. Uma aplicação pode querer usar uma cipher suite mais forte para operações especialmente críticas, ou uma aplicação de servidor pode querer exigir autenticação do cliente.

Independentemente do motivo, o novo handshake ocorre sobre a sessão criptografada existente, e os dados da aplicação e as mensagens de handshake são intercalados até que uma nova sessão seja estabelecida.

Sua aplicação pode iniciar um novo handshake usando o método `SSLEngine.beginHandshake()`.