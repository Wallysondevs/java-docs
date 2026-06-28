# Termos e Definições

## Termos e Definições

A seguir estão termos de criptografia comumente usados e suas definições.

authentication
    

O processo de confirmar a identidade de uma parte com a qual se está comunicando.

certificate
    

Uma declaração assinada digitalmente que atesta a identidade e a chave pública de uma entidade (pessoa, empresa, e assim por diante). Os certificados podem ser autoassinados ou emitidos por uma Autoridade Certificadora (CA), uma entidade que é confiável para emitir certificados válidos para outras entidades. CAs conhecidas incluem Comodo, DigiCert e GoDaddy. X.509 é um formato de certificado comum que pode ser gerenciado pela ferramenta `keytool` do JDK.

cipher suite
    

Uma combinação de parâmetros criptográficos que definem os algoritmos de segurança e os tamanhos de chave usados para autenticação, acordo de chave, criptografia e proteção de integridade.

cryptographic hash function
    

Um algoritmo que é usado para produzir uma string de bits de tamanho fixo relativamente pequena (chamada de hash) a partir de um bloco arbitrário de dados. Uma função hash criptográfica é semelhante a um checksum e possui três características principais: é uma função unidirecional, o que significa que não é possível produzir os dados originais a partir do hash; uma pequena mudança nos dados originais produz uma grande mudança no hash resultante; e não requer uma chave criptográfica.

Cryptographic Service Provider (CSP)
    

Às vezes referido simplesmente como [providers](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) para abreviar, a Java Cryptography Architecture (JCA) o define como um pacote (ou conjunto de pacotes) que implementa uma ou mais classes de engine para algoritmos criptográficos específicos. Uma classe de engine define um serviço criptográfico de forma abstrata, sem uma implementação concreta.

Datagram Transport Layer Security (DTLS) Protocol
    

Um protocolo que gerencia a autenticação de cliente e servidor, integridade de dados e comunicação criptografada entre o cliente e o servidor com base em um canal de transporte não confiável, como UDP.

decryption
    

Veja [encryption/decryption](<#/doc/guides/security/terms-definitions>).

digital signature
    

Um equivalente digital de uma assinatura manuscrita. É usado para garantir que os dados transmitidos por uma rede foram enviados por quem afirma tê-los enviado e que os dados não foram modificados em trânsito. Por exemplo, uma assinatura digital baseada em RSA é calculada primeiro computando um hash criptográfico dos dados e, em seguida, criptografando o hash com a chave privada do remetente.

encryption/decryption
    

Criptografia é o processo de usar um algoritmo complexo para converter uma mensagem original (texto claro) em uma mensagem codificada (texto cifrado) que é ininteligível a menos que seja descriptografada. Descriptografia é o processo inverso de produzir texto claro a partir de texto cifrado.

Os algoritmos usados para criptografar e descriptografar dados geralmente se enquadram em duas categorias: criptografia de chave secreta (simétrica) e criptografia de chave pública (assimétrica).

endpoint identification
    

Um endereço IPv4 ou IPv6 usado para identificar um endpoint na rede.

Os procedimentos de identificação de endpoint são tratados durante o handshake SSL/TLS.

handshake protocol
    

A fase de negociação durante a qual os dois pares de socket concordam em usar uma sessão nova ou existente. O handshake protocol é uma série de mensagens trocadas sobre o record protocol. Ao final do handshake, novas chaves de criptografia e proteção de integridade específicas da conexão são geradas com base nos segredos de acordo de chave na sessão.

java-home
    

Variável de espaço reservado usada em todo este documento para se referir ao diretório onde o Java Development Kit (JDK) está instalado.

key agreement
    

Um método pelo qual duas partes cooperam para estabelecer uma chave comum. Cada lado gera alguns dados, que são trocados. Essas duas partes de dados são então combinadas para gerar uma chave. Somente aqueles que possuem os dados de inicialização privados adequados podem obter a chave final. Diffie-Hellman (DH) é o exemplo mais comum de um algoritmo de key agreement.

Key Encapsulation Mechanism (KEM)
    

Uma técnica de criptografia para proteger chaves simétricas usando criptografia de chave pública. No processo de encapsulamento, o remetente lê a chave pública do receptor e gera uma chave secreta e uma mensagem de encapsulamento de chave. A mensagem de encapsulamento de chave é enviada ao receptor. No processo de decapsulamento, o receptor usa sua própria chave privada para recuperar a mesma chave secreta da mensagem de encapsulamento de chave.

key exchange
    

Um método pelo qual as chaves são trocadas. Um lado gera uma chave privada e a criptografa usando a chave pública do par (tipicamente RSA). Os dados são transmitidos ao par, que descriptografa a chave usando a chave privada correspondente.

key manager/trust manager
    

Key managers e trust managers usam keystores para seu material de chave. Um key manager gerencia um keystore e fornece chaves públicas a outros conforme necessário (por exemplo, para uso na autenticação do usuário para outros). Um trust manager decide em quem confiar com base nas informações no truststore que ele gerencia.

Keyed-Hash Message Code (HMAC)
    Um tipo específico de message authentication code que envolve uma função hash criptográfica e uma chave criptográfica secreta.
Keyed-Hash Message Code (HMAC)-based Extract-and-Expand Key Derivation Function (HKDF)
    Uma função usada para geração e validação de chaves.
keystore/truststore
    

Um keystore é um banco de dados de material de chave. O material de chave é usado para uma variedade de propósitos, incluindo autenticação e integridade de dados. Vários tipos de keystores estão disponíveis, incluindo PKCS12 e o macOS KeychainStore.

De modo geral, as informações do keystore podem ser agrupadas em duas categorias: entradas de chave e entradas de certificado confiável. Uma entrada de chave consiste na identidade de uma entidade e sua chave privada, e pode ser usada para uma variedade de propósitos criptográficos. Em contraste, uma entrada de certificado confiável contém apenas uma chave pública, além da identidade da entidade. Assim, uma entrada de certificado confiável não pode ser usada onde uma chave privada é necessária, como em um `javax.net.ssl.KeyManager`. Na implementação JDK de PKCS12, um keystore pode conter tanto entradas de chave quanto entradas de certificado confiável.

Um truststore é um keystore que é usado ao tomar decisões sobre o que confiar. Se você recebe dados de uma entidade em que já confia, e se você pode verificar que a entidade é quem ela afirma ser, então você pode assumir que os dados realmente vieram dessa entidade.

Uma entrada só deve ser adicionada a um truststore se o usuário confiar nessa entidade. Ao gerar um par de chaves ou ao importar um certificado, o usuário concede confiança a essa entrada. Qualquer entrada no truststore é considerada uma entrada confiável.

Pode ser útil ter dois arquivos keystore diferentes: um contendo apenas suas entradas de chave, e o outro contendo suas entradas de certificado confiável, incluindo certificados CA. O primeiro contém informações privadas, enquanto o último não. Usar dois arquivos em vez de um único arquivo keystore fornece uma separação mais limpa da distinção lógica entre seus próprios certificados (e chaves privadas correspondentes) e os certificados de outros. Para fornecer mais proteção para suas chaves privadas, armazene-as em um keystore com acesso restrito e forneça os certificados confiáveis em um keystore mais publicamente acessível, se necessário.

message authentication code (MAC)
    

Fornece uma maneira de verificar a integridade das informações transmitidas ou armazenadas em um meio não confiável, com base em uma chave secreta. Tipicamente, MACs são usados entre duas partes que compartilham uma chave secreta para validar informações transmitidas entre essas partes.

Um mecanismo MAC que é baseado em funções hash criptográficas é referido como HMAC.

public-key cryptography
    

Um sistema criptográfico que usa um algoritmo de criptografia no qual duas chaves são produzidas. Uma chave é tornada pública, enquanto a outra é mantida privada. A chave pública e a chave privada são inversas criptográficas; o que uma chave criptografa, somente a outra chave pode descriptografar. A public-key cryptography também é chamada de criptografia assimétrica.

Record Protocol
    

Um protocolo que empacota todos os dados (seja em nível de aplicação ou como parte do processo de handshake) em registros discretos de dados, muito parecido com um socket de stream TCP que converte um fluxo de bytes de aplicação em pacotes de rede. Os registros individuais são então protegidos pelas chaves de criptografia e proteção de integridade atuais.

secret-key cryptography
    

Um sistema criptográfico que usa um algoritmo de criptografia no qual a mesma chave é usada tanto para criptografar quanto para descriptografar os dados. A secret-key cryptography também é chamada de criptografia simétrica.

Secure Sockets Layer (SSL) Protocol
    

Um protocolo que gerencia a autenticação de cliente e servidor, integridade de dados e comunicação criptografada entre o cliente e o servidor. O SSL foi renomeado para Transport Layer Security (TLS).

session
    

Uma coleção nomeada de informações de estado, incluindo identidade de par autenticado, cipher suite e segredos de key agreement que são negociados através de um handshake de socket seguro e que podem ser compartilhados entre múltiplas instâncias de socket seguro.

Transport Layer Security (TLS) Protocol
    

Um protocolo que gerencia a autenticação de cliente e servidor, integridade de dados e comunicação criptografada entre o cliente e o servidor com base em um canal de transporte confiável, como TCP.

trust manager
    

Veja ["key manager/trust manager"](<#/doc/guides/security/terms-definitions>).

truststore
    

Veja ["keystore/truststore"](<#/doc/guides/security/terms-definitions>).