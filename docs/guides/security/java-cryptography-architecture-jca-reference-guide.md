# Guia de Referência da Java Cryptography Architecture (JCA)

## 2 Guia de Referência da Java Cryptography Architecture (JCA)

A Java Cryptography Architecture (JCA) é uma parte importante da plataforma e contém uma arquitetura de "provedor" e um conjunto de APIs para assinaturas digitais, message digests (hashes), certificados e validação de certificados, criptografia (cifras de bloco/stream simétricas/assimétricas), geração e gerenciamento de chaves, e geração segura de números aleatórios, para citar alguns.

### Introdução à Java Cryptography Architecture

A plataforma Java enfatiza fortemente a segurança, incluindo segurança da linguagem, criptografia, infraestrutura de chave pública, autenticação e comunicação segura.

A JCA é uma parte importante da plataforma e contém uma arquitetura de "provedor" e um conjunto de APIs para assinaturas digitais, message digests (hashes), certificados e validação de certificados, criptografia (cifras de bloco/stream simétricas/assimétricas), geração e gerenciamento de chaves, e geração segura de números aleatórios, para citar alguns. Essas APIs permitem que os desenvolvedores integrem facilmente a segurança em seu código de aplicação. A arquitetura foi projetada em torno dos seguintes princípios:

  * Independência de implementação: As aplicações não precisam implementar algoritmos de segurança. Em vez disso, elas podem solicitar serviços de segurança da plataforma Java. Os serviços de segurança são implementados em providers (veja [Cryptographic Service Providers](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)), que são conectados à plataforma Java por meio de uma interface padrão. Uma aplicação pode depender de múltiplos providers independentes para funcionalidades de segurança.

  * Interoperabilidade de implementação: Os providers são interoperáveis entre aplicações. Especificamente, uma aplicação não está vinculada a um provider específico, e um provider não está vinculado a uma aplicação específica.

  * Extensibilidade de algoritmo: A plataforma Java inclui vários providers integrados que implementam um conjunto básico de serviços de segurança amplamente utilizados hoje. No entanto, algumas aplicações podem depender de padrões emergentes ainda não implementados, ou de serviços proprietários. A plataforma Java suporta a instalação de providers personalizados que implementam tais serviços.

Outras bibliotecas de comunicação criptográfica disponíveis no JDK usam a arquitetura de provider da JCA, mas são descritas em outro lugar. Os componentes JSSE fornecem acesso a implementações de Secure Socket Layer (SSL), Transport Layer Security (TLS) e Datagram Transport Layer Security (DTLS); veja [Guia de Referência da Java Secure Socket Extension (JSSE)](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>). Você pode usar as APIs Java Generic Security Services (JGSS) (via Kerberos) e Simple Authentication and Security Layer (SASL) para trocar mensagens de forma segura entre aplicações comunicantes; veja [Introdução aos Tutoriais JAAS e Java GSS-API](<#/doc/guides/security/introduction-jaas-and-java-gss-api-tutorials1>) e [Guia de Programação e Implantação da API Java SASL](<#/doc/guides/security/java-sasl-api-programming-and-deployment-guide1>).

Notas sobre Terminologia

  * Antes do JDK 1.4, o JCE era um produto não empacotado e, como tal, o JCA e o JCE eram regularmente referidos como componentes separados e distintos. Como o JCE agora está empacotado no JDK, a distinção está se tornando menos aparente. Uma vez que o JCE usa a mesma arquitetura que o JCA, o JCE deve ser mais propriamente considerado como parte do JCA.

  * A JCA dentro do JDK inclui dois componentes de software:

    * O framework que define e suporta serviços criptográficos para os quais os providers fornecem implementações. Este framework inclui pacotes como `java.security`, `javax.crypto`, `javax.crypto.spec` e `javax.crypto.interfaces`.
    * Os providers reais, como `Sun`, `SunRsaSign`, `SunJCE`, que contêm as implementações criptográficas reais.

Sempre que um provider JCA específico for mencionado, ele será referido explicitamente pelo nome do provider.

AVISO:

A JCA facilita a incorporação de recursos de segurança em sua aplicação. No entanto, este documento não cobre a teoria de segurança/criptografia além de uma introdução elementar aos conceitos necessários para discutir as APIs. Este documento também não cobre os pontos fortes/fracos de algoritmos específicos, nem cobre o design de protocolos. Criptografia é um tópico avançado e deve-se consultar uma referência sólida, preferencialmente recente, para fazer o melhor uso dessas ferramentas.

Você deve sempre entender o que está fazendo e por quê: NÃO copie simplesmente código aleatório e espere que ele resolva completamente seu cenário de uso. Muitas aplicações foram implantadas contendo problemas significativos de segurança ou desempenho porque a ferramenta ou algoritmo errado foi selecionado.

#### Princípios de Design da JCA

A JCA foi projetada em torno destes princípios:

  * Independência e interoperabilidade de implementação
  * Independência e extensibilidade de algoritmo

A independência de implementação e a independência de algoritmo são complementares; você pode usar serviços criptográficos, como assinaturas digitais e message digests, sem se preocupar com os detalhes de implementação ou mesmo com os algoritmos que formam a base desses conceitos. Embora a independência completa de algoritmo não seja possível, a JCA fornece APIs padronizadas e específicas de algoritmo. Quando a independência de implementação não é desejável, a JCA permite que os desenvolvedores indiquem uma implementação específica.

A independência de algoritmo é alcançada definindo tipos de "engines" (serviços) criptográficos e definindo classes que fornecem a funcionalidade desses engines criptográficos. Essas classes são chamadas de engine classes, e exemplos são as classes [MessageDigest](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/MessageDigest.html>), [Signature](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/Signature.html>), [KeyFactory](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/KeyFactory.html>), [KeyPairGenerator](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/KeyPairGenerator.html>) e [Cipher](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/Cipher.html>).

A independência de implementação é alcançada usando uma arquitetura baseada em "provider". O termo Cryptographic Service Provider (CSP), que é usado de forma intercambiável com o termo "provider", (veja [Cryptographic Service Providers](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)) refere-se a um pacote ou conjunto de pacotes que implementam um ou mais serviços criptográficos, como algoritmos de assinatura digital, algoritmos de message digest e serviços de conversão de chaves. Um programa pode simplesmente solicitar um tipo particular de objeto (como um objeto `Signature`) implementando um serviço particular (como o algoritmo de assinatura DSA) e obter uma implementação de um dos providers instalados. Se desejado, um programa pode, em vez disso, solicitar uma implementação de um provider específico. Os providers podem ser atualizados de forma transparente para a aplicação, por exemplo, quando versões mais rápidas ou mais seguras estiverem disponíveis.

A interoperabilidade de implementação significa que várias implementações podem funcionar umas com as outras, usar as chaves umas das outras ou verificar as assinaturas umas das outras. Isso significaria, por exemplo, que para os mesmos algoritmos, uma chave gerada por um provider seria utilizável por outro, e uma assinatura gerada por um provider seria verificável por outro.

A extensibilidade de algoritmo significa que novos algoritmos que se encaixam em uma das engine classes suportadas podem ser adicionados facilmente.

#### Arquitetura de Provider

Os providers contêm um pacote (ou um conjunto de pacotes) que fornecem implementações concretas para os algoritmos criptográficos anunciados.

##### Cryptographic Service Providers

`java.security.Provider` é a classe base para todos os providers de segurança. Cada CSP contém uma instância desta classe que contém o nome do provider e lista todos os serviços/algoritmos de segurança que ele implementa. Quando uma instância de um algoritmo particular é necessária, o framework JCA consulta o banco de dados do provider e, se uma correspondência adequada for encontrada, a instância é criada.

Os providers contêm um pacote (ou um conjunto de pacotes) que fornecem implementações concretas para os algoritmos criptográficos anunciados. Cada instalação do JDK possui um ou mais providers instalados e configurados por padrão. Providers adicionais podem ser adicionados estática ou dinamicamente. Os clientes podem configurar seu ambiente de tempo de execução para especificar a ordem de preferência do provider. A ordem de preferência é a ordem em que os providers são pesquisados para serviços solicitados quando nenhum provider específico é solicitado.

Para usar a JCA, uma aplicação simplesmente solicita um tipo particular de objeto (como um `MessageDigest`) e um algoritmo ou serviço particular (como o algoritmo "SHA-256"), e obtém uma implementação de um dos providers instalados. Por exemplo, a seguinte instrução solicita um message digest SHA-256 de um provider instalado:
```java
    md = MessageDigest.getInstance("SHA-256");
```

Alternativamente, o programa pode solicitar os objetos de um provider específico. Cada provider tem um nome usado para se referir a ele. Por exemplo, a seguinte instrução solicita um message digest SHA-256 do provider chamado ProviderC:
```java
    md = MessageDigest.getInstance("SHA-256", "ProviderC");
```

As figuras a seguir ilustram a solicitação de uma implementação de message digest SHA-256. Elas mostram três providers diferentes que implementam vários algoritmos de message digest (SHA-256, SHA-384 e SHA-512). Os providers são ordenados por preferência da esquerda para a direita (1-3). Na [Figura 2-1](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>), uma aplicação solicita uma implementação do algoritmo SHA-256 sem especificar um nome de provider. Os providers são pesquisados na ordem de preferência e a implementação do primeiro provider que fornece esse algoritmo particular, ProviderB, é retornada. Na [Figura 2-2](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>), a aplicação solicita a implementação do algoritmo SHA-256 de um provider específico, ProviderC. Desta vez, a implementação de ProviderC é retornada, mesmo que um provider com uma ordem de preferência maior, ProviderB, também forneça uma implementação SHA-256.

Figura 2-1 Solicitar Implementação de Message Digest SHA-256 Sem Especificar Provider

[Descrição de "Figura 2-1 Solicitar Implementação de Message Digest SHA-256 Sem Especificar Provider"](<#/>)

Figura 2-2 Solicitar Message Digest SHA-256 com ProviderC

[Descrição de "Figura 2-2 Solicitar Message Digest SHA-256 com ProviderC"](<#/>)

As implementações criptográficas no JDK são distribuídas por meio de vários providers diferentes (`Sun`, `SunJSSE`, `SunJCE`, `SunRsaSign`) principalmente por razões históricas, mas em menor grau pelo tipo de funcionalidade e algoritmos que fornecem. Outros ambientes de tempo de execução Java podem não conter necessariamente esses providers, portanto, as aplicações não devem solicitar uma implementação específica de provider, a menos que se saiba que um provider específico estará disponível.

A JCA oferece um conjunto de APIs que permitem aos usuários consultar quais providers estão instalados e quais serviços eles suportam.

Esta arquitetura também facilita para os usuários finais adicionar providers adicionais. Muitas implementações de providers de terceiros já estão disponíveis. Veja [A Classe Provider](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) para mais informações sobre como os providers são escritos, instalados e registrados.

##### Como os Providers São Realmente Implementados

A independência de algoritmo é alcançada definindo uma Application Programming Interface (API) genérica de alto nível que todas as aplicações usam para acessar um tipo de serviço. A independência de implementação é alcançada fazendo com que todas as implementações de provider estejam em conformidade com interfaces bem definidas. Instâncias de engine classes são, portanto, "apoiadas" por classes de implementação que possuem as mesmas assinaturas de método. As chamadas da aplicação são roteadas através da engine class e entregues à implementação de apoio subjacente. A implementação lida com a solicitação e retorna os resultados apropriados.

Os métodos da API da aplicação em cada engine class são roteados para as implementações do provider através de classes que implementam a Service Provider Interface (SPI) correspondente. Ou seja, para cada engine class, existe uma classe SPI abstrata correspondente que define os métodos que o algoritmo de cada cryptographic service provider deve implementar. O nome de cada classe SPI é o mesmo da engine class correspondente, seguido por `Spi`. Por exemplo, a engine class `Signature` fornece acesso à funcionalidade de um algoritmo de assinatura digital. A implementação real do provider é fornecida em uma subclasse de `SignatureSpi`. As aplicações chamam os métodos da API da engine class, que por sua vez chamam os métodos SPI na implementação real.

Cada classe SPI é abstrata. Para fornecer a implementação de um tipo particular de serviço para um algoritmo específico, um provider deve criar uma subclasse da classe SPI correspondente e fornecer implementações para todos os métodos abstratos.

Para cada engine class na API, as instâncias de implementação são solicitadas e instanciadas chamando o método de fábrica getInstance() na engine class. Um método de fábrica é um método estático que retorna uma instância de uma classe. As engine classes usam o mecanismo de seleção de provider do framework descrito anteriormente para obter a implementação de apoio real (SPI) e, em seguida, criam o objeto engine real. Cada instância da engine class encapsula (como um campo privado) a instância da classe SPI correspondente, conhecida como objeto SPI. Todos os métodos da API de um objeto API são declarados final e suas implementações invocam os métodos SPI correspondentes do objeto SPI encapsulado.

Para tornar isso mais claro, revise o [Exemplo 2-1](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) e a [Figura 2-3](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>):

Exemplo 2-1 Código de Exemplo para Obter uma Instância de uma Engine Class
```java
    Cipher c = Cipher.getInstance("AES");
    c.init(ENCRYPT_MODE, key);
```

Figura 2-3 Aplicação Recupera Instância de Cipher “AES”

[Descrição de "Figura 2-3 Aplicação Recupera Instância de Cipher “AES”"](<#/>)

Aqui, uma aplicação deseja uma instância `javax.crypto.Cipher` "AES" e não se importa com qual provider é usado. A aplicação chama os métodos de fábrica `getInstance()` da engine class `Cipher`, que por sua vez pede ao framework JCA para encontrar a primeira instância de provider que suporte "AES". O framework consulta cada provider instalado e obtém a instância da classe `Provider` do provider. (Lembre-se que a classe `Provider` é um banco de dados de algoritmos disponíveis.) O framework pesquisa cada provider, finalmente encontrando uma entrada adequada em CSP3. Esta entrada de banco de dados aponta para a classe de implementação `com.foo.AESCipher` que estende `CipherSpi`, e é, portanto, adequada para uso pela engine class `Cipher`. Uma instância de `com.foo.AESCipher` é criada e encapsulada em uma instância recém-criada de `javax.crypto.Cipher`, que é retornada à aplicação. Quando a aplicação agora executa a operação init() na instância `Cipher`, a engine class `Cipher` roteia a solicitação para o método de apoio engineInit() correspondente na classe `com.foo.AESCipher`.

[Nomes de Algoritmos Padrão de Segurança Java](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html>) lista os Nomes Padrão definidos para o ambiente Java. Outros providers de terceiros podem definir suas próprias implementações desses serviços, ou mesmo serviços adicionais.

##### Keystores

Um banco de dados chamado "keystore" pode ser usado para gerenciar um repositório de chaves e certificados. Keystores estão disponíveis para aplicações que precisam de dados para fins de autenticação, criptografia ou assinatura.

As aplicações podem acessar um keystore por meio de uma implementação da classe `KeyStore`, que está no pacote `java.security`. A partir do JDK 9, o tipo (formato) de keystore padrão e recomendado é "pkcs12", que é baseado no padrão RSA PKCS12 Personal Information Exchange Syntax. Anteriormente, o tipo de keystore padrão era "jks", que é um formato proprietário. Outros formatos de keystore estão disponíveis, como "jceks", que é um formato de keystore proprietário alternativo, e "pkcs11", que é baseado no padrão RSA PKCS11 e suporta acesso a tokens criptográficos como módulos de segurança de hardware e smartcards.

As aplicações podem escolher diferentes implementações de keystore de diferentes providers, usando o mesmo mecanismo de provider descrito anteriormente. Veja [Gerenciamento de Chaves](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide> "Um banco de dados chamado "keystore" pode ser usado para gerenciar um repositório de chaves e certificados. \(Um certificado é uma declaração assinada digitalmente por uma entidade, dizendo que a chave pública de alguma outra entidade tem um valor particular.\)").

#### Engine Classes e Algoritmos

Uma engine class fornece a interface para um tipo específico de serviço criptográfico, independente de um algoritmo criptográfico ou provider particular.

As engine classes fornecem um dos seguintes:

  * operações criptográficas (por exemplo, criptografia, assinaturas digitais e message digests),
  * geradores ou conversores de material criptográfico (chaves e parâmetros de algoritmo), ou
  * objetos (keystores ou certificados) que encapsulam os dados criptográficos e podem ser usados em camadas de abstração mais altas.

As seguintes engine classes estão disponíveis:

  * [`SecureRandom`](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>): Usado para gerar números aleatórios ou pseudoaleatórios.
  * [`MessageDigest`](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>): Usado para calcular o message digest (hash) de dados especificados.
  * [`Signature`](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>): Inicializados com chaves, são usados para assinar dados e verificar assinaturas digitais.
  * [`Cipher`](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>): Inicializados com chaves, são usados para criptografar/descriptografar dados. Existem vários tipos de algoritmos: criptografia de bloco simétrica (por exemplo, AES), criptografia assimétrica (por exemplo, RSA) e criptografia baseada em senha (por exemplo, PBE).
  * [`Mac`](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>): Assim como os `MessageDigest`s, os Message Authentication Codes (MACs) também geram valores hash, mas são primeiro inicializados com chaves para proteger a integridade das mensagens.
  * [KEM](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>): Usado por duas partes para derivar uma chave secreta compartilhada a partir de um par de chaves privada/pública.
  * [`KeyFactory`](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>): Usado para converter chaves criptográficas opacas existentes do tipo [`Key`](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) em especificações de chave (representações transparentes do material de chave subjacente) e vice-versa.
  * [`SecretKeyFactory`](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>): Usado para converter chaves criptográficas opacas existentes do tipo [`SecretKey`](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) em especificações de chave (representações transparentes do material de chave subjacente) e vice-versa. `SecretKeyFactory`s são `KeyFactory`s especializados que criam apenas chaves secretas (simétricas).
  * [`KeyPairGenerator`](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>): Usado para gerar um novo par de chaves públicas e privadas adequadas para uso com um algoritmo especificado.
  * [`KeyGenerator`](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>): Usado para gerar novas chaves secretas para uso com um algoritmo especificado.
  * [`KeyAgreement`](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>): Usado por duas ou mais partes para concordar e estabelecer uma chave específica para usar em uma operação criptográfica particular.
  * [`AlgorithmParameters`](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>): Usado para armazenar os parâmetros de um algoritmo particular, incluindo codificação e decodificação de parâmetros.
  * [`AlgorithmParameterGenerator`](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>): Usado para gerar um conjunto de AlgorithmParameters adequado para um algoritmo especificado.
  * [`KeyStore`](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>): Usado para criar e gerenciar um keystore. Um keystore é um banco de dados de chaves. Chaves privadas em um keystore têm uma cadeia de certificados associada a elas, que autentica a chave pública correspondente. Um keystore também contém certificados de entidades confiáveis.
  * [`CertificateFactory`](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>): Usado para criar certificados de chave pública e Certificate Revocation Lists (CRLs).
  * [`CertPathBuilder`](<#/doc/guides/security/java-pki-programmers-guide>): Usado para construir cadeias de certificados (também conhecidas como caminhos de certificação).
  * [`CertPathValidator`](<#/doc/guides/security/java-pki-programmers-guide>): Usado para validar cadeias de certificados.
  * [`CertStore`](<#/doc/guides/security/java-pki-programmers-guide>): Usado para recuperar `Certificate`s e `CRL`s de um repositório.

Nota:

Um gerador cria objetos com conteúdo totalmente novo, enquanto uma fábrica cria objetos a partir de material existente (por exemplo, uma codificação).

### Classes e Interfaces Principais

As seguintes são as classes e interfaces principais fornecidas na JCA.

  * `Provider` e `Security`
  * `SecureRandom`, `MessageDigest`, `Signature`, `Cipher`, `Mac`, `KDF`, `KEM`, `KeyFactory`, `SecretKeyFactory`, `KeyPairGenerator`, `KeyGenerator`, `KeyAgreement`, `AlgorithmParameter`, `AlgorithmParameterGenerator`, `KeyStore` e `CertificateFactory` engine classes
  * Interfaces e classes `Key`, `KeyPair`
  * `AlgorithmParameterSpec Interface`, `AlgorithmParameters`, `AlgorithmParameterGenerator` e interfaces e classes de especificação de parâmetros de algoritmo nos pacotes `java.security.spec` e `javax.crypto.spec`.
  * `KeySpec Interface`, `EncodedKeySpec`, `PKCS8EncodedKeySpec` e `X509EncodedKeySpec`.
  * DEREncodable, PEMEncoder, PEMDecoder e PEMRecord.

Nota:

Veja as engine classes `CertPathBuilder`, `CertPathValidator` e `CertStore` no [Guia do Programador Java PKI](<#/doc/guides/security/java-pki-programmers-guide>).

O guia cobrirá primeiro as classes de alto nível mais úteis (Provider, Security, SecureRandom, MessageDigest, Signature, Cipher, Mac e KEM), e depois se aprofundará nas várias classes de suporte. Por enquanto, é suficiente dizer que as Chaves (públicas, privadas e secretas) são geradas e representadas pelas várias classes JCA, e são usadas pelas classes de alto nível como parte de sua operação.

Esta seção mostra as assinaturas dos principais métodos em cada classe e interface. Exemplos para algumas dessas classes (MessageDigest, Signature, KeyPairGenerator, SecureRandom, KeyFactory e classes de especificação de chave) são fornecidos nas seções correspondentes de [Exemplos de Código](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

A documentação de referência completa para os pacotes relevantes da Security API pode ser encontrada nos resumos dos pacotes:

  * [`java.security`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/package-summary.html>)
  * [`javax.crypto`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/package-summary.html>)
  * [`java.security.cert`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/cert/package-summary.html>)
  * [`java.security.spec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/package-summary.html>)
  * [`javax.crypto.spec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/spec/package-summary.html>)
  * [`java.security.interfaces`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/interfaces/package-summary.html>)
  * [`javax.crypto.interfaces`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/interfaces/package-summary.html>)

#### A Classe Provider

O termo "Cryptographic Service Provider" (usado de forma intercambiável com "provider" neste documento) refere-se a um pacote ou conjunto de pacotes que fornecem uma implementação concreta de um subconjunto dos recursos de criptografia da JDK Security API. A classe `Provider` é a interface para tal pacote ou conjunto de pacotes. Ela possui métodos para acessar o nome do provider, número da versão e outras informações. Observe que, além de registrar implementações de serviços criptográficos, a classe `Provider` também pode ser usada para registrar implementações de outros serviços de segurança que possam ser definidos como parte da JDK Security API ou de uma de suas extensões.

Para fornecer implementações de serviços criptográficos, uma entidade (por exemplo, um grupo de desenvolvimento) escreve o código de implementação e cria uma subclasse da classe `Provider`. O construtor da subclasse `Provider` define os valores de várias propriedades; a JDK Security API usa esses valores para procurar os serviços que o provider implementa. Em outras palavras, a subclasse especifica os nomes das classes que implementam os serviços.

Figura 2-4 Classe Provider

[Descrição de "Figura 2-4 Classe Provider"](<#/>)

Existem vários tipos de serviços que podem ser implementados por pacotes de provider; Veja [Engine Classes e Algoritmos](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

As diferentes implementações podem ter características distintas. Algumas podem ser baseadas em software, enquanto outras podem ser baseadas em hardware. Algumas podem ser independentes de plataforma, enquanto outras podem ser específicas de plataforma. Alguns códigos-fonte de provider podem estar disponíveis para revisão e avaliação, enquanto outros podem não estar. A JCA permite que tanto usuários finais quanto desenvolvedores decidam quais são suas necessidades.

Você pode encontrar informações sobre como os usuários finais instalam as implementações de criptografia que atendem às suas necessidades e como os desenvolvedores solicitam as implementações que atendem às suas.

Nota:

Para implementar um provider, veja [Passos para Implementar e Integrar um Provider](<#/doc/guides/security/howtoimplaprovider>).

##### Como as Implementações de Provider São Solicitadas e Fornecidas

Para cada engine class (veja [Engine Classes e Algoritmos](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)) na API, uma instância de implementação é solicitada e instanciada chamando um dos métodos getInstance na engine class, especificando o nome do algoritmo desejado e, opcionalmente, o nome do provider (ou da classe `Provider`) cuja implementação é desejada.
```java
    static EngineClassName getInstance(String algorithm)
        throws NoSuchAlgorithmException
    
    static EngineClassName getInstance(String algorithm, String provider)
        throws NoSuchAlgorithmException, NoSuchProviderException
    
    static EngineClassName getInstance(String algorithm, Provider provider)
        throws NoSuchAlgorithmException
```

onde

EngineClassName

é o tipo de engine desejado (por exemplo, Signature, MessageDigest ou Cipher). Por exemplo:
```java
        Signature sig = Signature.getInstance("SHA256withRSA");
        KeyAgreement ka = KeyAgreement.getInstance("DH");
```

retornam uma instância dos objetos Signature "SHA256withRSA" e KeyAgreement "DH", respectivamente.

[Nomes de Algoritmos Padrão de Segurança Java](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html>) contém a lista de nomes que foram padronizados para uso com o ambiente Java. Alguns provedores podem optar por incluir também nomes de alias que se referem ao mesmo algoritmo. Por exemplo, o algoritmo "SHA256" pode ser referido como "SHA-256". As aplicações devem usar nomes padrão em vez de um alias, pois nem todos os provedores podem usar alias para nomes de algoritmos da mesma forma.

Nota:

O nome do algoritmo não diferencia maiúsculas de minúsculas. Por exemplo, todas as chamadas a seguir são equivalentes:
```java
    Signature.getInstance("SHA256withRSA")
    Signature.getInstance("sha256withrsa")
    Signature.getInstance("Sha256WithRsa")
```

Se nenhum provedor for especificado, `getInstance` pesquisa os provedores registrados por uma implementação do serviço criptográfico solicitado associado ao algoritmo nomeado. Em qualquer Java Virtual Machine (JVM) específica, os provedores são instalados em uma determinada ordem de preferência, a ordem na qual a lista de provedores é pesquisada se um provedor específico não for solicitado. (Consulte [Instalando Provedores](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).) Por exemplo, suponha que existam dois provedores instalados em uma JVM, `PROVIDER_1` e `PROVIDER_2`. Assuma que:

  * `PROVIDER_1` implementa SHA256withRSA e AES. `PROVIDER_1` tem ordem de preferência 1 (a mais alta prioridade).
  * `PROVIDER_2` implementa SHA256withRSA, SHA256withDSA e RC5. `PROVIDER_2` tem ordem de preferência 2.

Agora, vamos analisar três cenários:

  1. Estamos procurando por uma implementação SHA256withRSA: Ambos os provedores fornecem tal implementação. A implementação de `PROVIDER_1` é retornada, pois `PROVIDER_1` tem a maior prioridade e é pesquisado primeiro.
  2. Estamos procurando por uma implementação SHA256withDSA: `PROVIDER_1` é pesquisado primeiro por ela. Nenhuma implementação é encontrada, então `PROVIDER_2` é pesquisado. Como uma implementação é encontrada, ela é retornada.
  3. Estamos procurando por uma implementação SHA256withECDSA: Como nenhum provedor instalado a implementa, uma `NoSuchAlgorithmException` é lançada.

Os métodos getInstance que incluem um argumento de provedor são para desenvolvedores que desejam especificar de qual provedor eles querem um algoritmo. Uma agência federal, por exemplo, desejará usar uma implementação de provedor que tenha recebido certificação federal. Vamos assumir que `PROVIDER_1` não recebeu tal certificação, enquanto `PROVIDER_2` a recebeu.

Um programa de agência federal teria então a seguinte chamada, especificando `PROVIDER_2`, já que ele possui a implementação certificada:
```java
    Signature s = Signature.getInstance("SHA256withRSA", "PROVIDER_2");
```

Neste caso, se `PROVIDER_2` não estivesse instalado, uma `NoSuchProviderException` seria lançada, mesmo que outro provedor instalado implementasse o algoritmo solicitado.

Um programa também tem a opção de obter uma lista de todos os provedores instalados (usando o método getProviders na classe [The Security Class](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)) e escolher um da lista.

Nota:

Aplicações de propósito geral NÃO DEVEM solicitar serviços criptográficos de provedores específicos. Caso contrário, as aplicações ficam vinculadas a provedores específicos que podem não estar disponíveis em outras implementações Java. Elas também podem não conseguir aproveitar provedores otimizados disponíveis (por exemplo, aceleradores de hardware via PKCS11 ou implementações nativas de SO, como o MSCAPI da Microsoft) que têm uma ordem de preferência mais alta do que o provedor específico solicitado.

##### Instalando Provedores

Para ser usado, um provedor criptográfico deve primeiro ser instalado e depois registrado estática ou dinamicamente. Existem vários provedores Sun fornecidos com esta versão, por exemplo, `SUN`, `SunJCE`, `SunJSSE` e `SunRsaSign`, que já estão instalados e registrados. As seções a seguir descrevem como instalar e registrar provedores adicionais.

Todos os provedores JDK já estão instalados e registrados. No entanto, se você precisar de provedores de terceiros, consulte [Etapa 8: Preparar para Teste](<#/doc/guides/security/howtoimplaprovider>) de [Etapas para Implementar e Integrar um Provedor](<#/doc/guides/security/howtoimplaprovider>) para obter informações sobre como adicionar provedores ao classpath ou module path e registrar provedores, estática ou dinamicamente.

##### Métodos da Classe Provider

Cada instância da classe `Provider` possui um nome (atualmente sensível a maiúsculas e minúsculas), um número de versão e uma descrição em string do provedor e seus serviços.

Você pode consultar a instância `Provider` para obter essas informações chamando os seguintes métodos:
```java
    public String getName()
    public double getVersion()
    public String getInfo()
```

#### A Classe Security

A classe Security gerencia provedores instalados e propriedades de segurança em todo o sistema. Ela contém apenas métodos estáticos e nunca é instanciada.

##### Gerenciando Provedores

As tabelas a seguir resumem os métodos na classe `Security` que você pode usar para consultar quais `Provider`s estão instalados, bem como para instalar ou remover provedores em tempo de execução.

Consultando Provedores

Método | Descrição
---|---
`static Provider[] getProviders()` | Retorna um array contendo todos os provedores instalados (tecnicamente, a subclasse `Provider` para cada provedor de pacote). A ordem dos `Provider`s no array é a sua ordem de preferência.
`static Provider getProvider (String providerName)` | Retorna o `Provider` nomeado `providerName`. Retorna `null` se o `Provider` não for encontrado.

Adicionando Provedores

Método | Descrição
---|---
`static int addProvider(Provider provider)` | Adiciona um `Provider` ao final da lista de `Provider`s instalados. Retorna a posição de preferência na qual o `Provider` foi adicionado, ou `-1` se o `Provider` não foi adicionado porque já estava instalado.
`static int insertProviderAt (Provider provider, int position)` | Adiciona um novo `Provider` em uma posição especificada. Se o provedor fornecido for instalado na posição solicitada, o provedor anteriormente nessa posição e todos os provedores com uma posição maior que `position` são deslocados uma posição para cima (em direção ao final da lista). Este método retorna a posição de preferência na qual o `Provider` foi adicionado, ou `-1` se o `Provider` não foi adicionado porque já estava instalado.

Removendo Provedores

Método | Descrição
---|---
`static void removeProvider(String name)` | Remove o `Provider` com o nome especificado. Retorna silenciosamente se o provedor não estiver instalado. Quando o provedor especificado é removido, todos os provedores localizados em uma posição maior do que onde o provedor especificado estava são deslocados uma posição para baixo (em direção ao início da lista de provedores instalados).

Nota:

Se você deseja alterar a posição de preferência de um provedor, deve primeiro removê-lo e depois inseri-lo novamente na nova posição de preferência.

##### Propriedades de Segurança

A classe `Security` mantém uma lista de Propriedades de Segurança em todo o sistema. Essas propriedades são semelhantes às propriedades `System`, mas são relacionadas à segurança. Essas propriedades podem ser definidas estaticamente (através do arquivo `<java-home>/conf/security/java.security`) ou dinamicamente (usando uma API). Consulte [Etapa 8.1: Configurar o Provedor](<#/doc/guides/security/howtoimplaprovider>) de [Etapas para Implementar e Integrar um Provedor](<#/doc/guides/security/howtoimplaprovider>) para um exemplo de registro de um provedor estaticamente com a Propriedade de Segurança `security.provider.n`. Se você deseja definir propriedades dinamicamente, os programas podem usar os seguintes métodos:
```java
    static String getProperty(String key)
    static void setProperty(String key, String datum)
```

Nota:

A lista de provedores de segurança é estabelecida durante a inicialização da VM; portanto, os métodos descritos anteriormente devem ser usados para alterar a lista de provedores.

#### A Classe SecureRandom

A classe SecureRandom é uma classe de motor (consulte [Classes de Motor e Algoritmos](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)) que fornece números aleatórios criptograficamente fortes, seja acessando um gerador de números pseudoaleatórios (PRNG), um algoritmo determinístico que produz uma sequência pseudoaleatória a partir de um valor de semente inicial, ou lendo uma fonte nativa de aleatoriedade (por exemplo, `/dev/random` ou um gerador de números aleatórios verdadeiros). Um exemplo de PRNG é o Deterministic Random Bits Generator (DRBG), conforme especificado em [NIST SP 800-90Ar1](<https://csrc.nist.gov/publications/detail/sp/800-90a/rev-1/final>). Outras implementações podem produzir números aleatórios verdadeiros, e ainda outras podem usar uma combinação de ambas as técnicas. Um número aleatório criptograficamente forte cumpre minimamente os testes estatísticos de gerador de números aleatórios especificados em [FIPS 140-2, Requisitos de Segurança para Módulos Criptográficos](<https://csrc.nist.gov/publications/detail/fips/140/2/final>), seção 4.9.1.

Todas as implementações Java SE devem indicar a implementação mais forte (mais aleatória) de SecureRandom que fornecem na propriedade `securerandom.strongAlgorithms` da classe `java.security.Security`. Esta implementação pode ser usada quando um valor aleatório particularmente forte é necessário.

A propriedade `securerandom.drbg.config` é usada para especificar a configuração e as implementações do DRBG `SecureRandom` no provedor SUN. A `securerandom.drbg.config` é uma propriedade da classe `java.security.Security`. Outras implementações DRBG também podem usar a propriedade `securerandom.drbg.config`.

Figura 2-5 Classe SecureRandom

[Descrição de "Figura 2-5 Classe SecureRandom"](<#/>)

##### Criando um Objeto SecureRandom

Existem várias maneiras de obter uma instância de `SecureRandom`:

  * Todas as implementações Java SE fornecem um `SecureRandom` padrão usando o construtor sem argumentos: `new SecureRandom()`. Este construtor percorre a lista de provedores de segurança registrados, começando pelo provedor mais preferido, e então retorna um novo objeto SecureRandom do primeiro provedor que suporta um algoritmo de gerador de números aleatórios (RNG) `SecureRandom`. Se nenhum dos provedores suportar um algoritmo RNG, ele retorna um objeto SecureRandom que usa SHA1PRNG do provedor SUN.

  * Para obter uma implementação específica de `SecureRandom`, use um dos [Como as Implementações de Provedores são Solicitadas e Fornecidas](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

  * Use o método `getInstanceStrong()` para obter uma implementação `SecureRandom` forte, conforme definido pela propriedade `securerandom.strongAlgorithms` da classe `java.security.Security`. Esta propriedade lista implementações de plataforma que são adequadas para gerar valores importantes.

##### Semeando ou Resemeando o Objeto SecureRandom

O objeto SecureRandom é inicializado com uma semente aleatória, a menos que a chamada para getInstance() seja seguida por uma chamada para um dos seguintes métodos setSeed.
```java
        void setSeed(byte[] seed)
        void setSeed(long seed)
```

Você deve chamar setSeed antes da primeira chamada nextBytes para evitar qualquer aleatoriedade ambiental.

A aleatoriedade dos bits produzidos pelo objeto SecureRandom depende da aleatoriedade dos bits da semente.

A qualquer momento, um objeto `SecureRandom` pode ser resemeado usando um dos métodos `setSeed` ou `reseed`. A semente fornecida para `setSeed` complementa, em vez de substituir, a semente existente; portanto, chamadas repetidas garantem que a aleatoriedade nunca será reduzida.

##### Usando um Objeto SecureRandom

Para obter bytes aleatórios, um chamador simplesmente passa um array de qualquer comprimento, que é então preenchido com bytes aleatórios:
```java
        void nextBytes(byte[] bytes)
```

##### Gerando Bytes de Semente

Se desejado, é possível invocar o método generateSeed para gerar um determinado número de bytes de semente (para semear outros geradores de números aleatórios, por exemplo):
```java
    byte[] generateSeed(int numBytes)
```

#### A Classe MessageDigest

A classe `MessageDigest` é uma classe de motor (consulte [Classes de Motor e Algoritmos](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)) projetada para fornecer a funcionalidade de resumos de mensagens criptograficamente seguros, como SHA-256 ou SHA-512. Um resumo de mensagem criptograficamente seguro recebe uma entrada de tamanho arbitrário (um array de bytes) e gera uma saída de tamanho fixo, chamada de digest ou hash.

Figura 2-6 Classe MessageDigest

[Descrição de "Figura 2-6 Classe MessageDigest"](<#/>)

Por exemplo, o algoritmo SHA-256 produz um digest de 32 bytes, e o SHA-512 produz um de 64 bytes.

Um digest possui duas propriedades:

  * Deve ser computacionalmente inviável encontrar duas mensagens que resultem no mesmo valor de hash.
  * O digest não deve revelar nada sobre a entrada que foi usada para gerá-lo.

Os digests de mensagens são usados para produzir identificadores de dados únicos e confiáveis. Eles são às vezes chamados de "checksums" ou "impressões digitais" dos dados. Alterações em apenas um bit da mensagem devem produzir um valor de digest diferente.

Os digests de mensagens têm muitos usos e podem determinar quando os dados foram modificados, intencionalmente ou não. Ao selecionar um algoritmo de digest, deve-se sempre consultar uma referência recente para determinar seu status e adequação para a tarefa em questão.

##### Criando um Objeto MessageDigest

Procedimento para criar um objeto `MessageDigest`.

  * Para calcular um digest, crie uma instância de message digest. Os objetos `MessageDigest` são obtidos usando um dos métodos getInstance() na classe `MessageDigest`. Consulte [Como as Implementações de Provedores são Solicitadas e Fornecidas](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

O método de fábrica retorna um objeto message digest inicializado. Assim, ele não precisa de mais inicialização.

##### Atualizando um Objeto Message Digest

Procedimento para atualizar o objeto Message Digest.

  * Para calcular o digest de alguns dados, você deve fornecer os dados ao objeto message digest inicializado. Eles podem ser fornecidos de uma vez, ou em partes. As partes podem ser alimentadas ao message digest chamando um dos métodos `update`:
```java
void update(byte input)
        void update(byte[] input)
        void update(byte[] input, int offset, int len)
```

##### Calculando o Digest

Procedimento para calcular o digest usando diferentes tipos de métodos digest().

Os blocos de dados devem ser fornecidos por chamadas ao método `update`. Consulte [Atualizando um Objeto Message Digest](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

  * O digest é calculado usando uma chamada para um dos métodos `digest`:
```java
byte[] digest()
        byte[] digest(byte[] input)
        int digest(byte[] buf, int offset, int len)
```

    1. O método `byte[] digest()` retorna o digest calculado.
    2. O método `byte[] digest(byte[] input)` faz um `update(input)` final com o array de bytes de entrada antes de chamar `digest()`, que retorna o array de bytes do digest.
    3. O método `int digest(byte[] buf, int offset, int len)` armazena o digest calculado no buffer `buf` fornecido, começando em `offset`. `len` é o número de bytes em `buf` alocados para o digest, o método retorna o número de bytes realmente armazenados em `buf`. Se não houver espaço suficiente no buffer, o método lançará uma exceção.

Consulte [Calculando um Objeto MessageDigest](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

#### A Classe Signature

A classe `Signature` é uma classe de motor (consulte [Classes de Motor e Algoritmos](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)) projetada para fornecer a funcionalidade de um algoritmo de assinatura digital criptográfica, como SHA256withDSA ou SHA512withRSA. Um algoritmo de assinatura criptograficamente seguro recebe uma entrada de tamanho arbitrário e uma chave privada e gera uma string de bytes relativamente curta (geralmente de tamanho fixo), chamada de assinatura, com as seguintes propriedades:

  * Apenas o proprietário de um par de chaves privada/pública é capaz de criar uma assinatura. Deve ser computacionalmente inviável para qualquer pessoa que possua apenas a chave pública e um número de assinaturas recuperar a chave privada.
  * Dada a chave pública correspondente à chave privada usada para gerar a assinatura, deve ser possível verificar a autenticidade e a integridade da entrada.

Figura 2-7 Classe Signature

[Descrição de "Figura 2-7 Classe Signature"](<#/>)

Um objeto Signature é inicializado para assinatura com uma Private Key e recebe os dados a serem assinados. Os bytes da assinatura resultante são tipicamente mantidos com os dados assinados. Quando a verificação é necessária, outro objeto Signature é criado e inicializado para verificação e recebe a Public Key correspondente. Os dados e os bytes da assinatura são alimentados ao objeto de assinatura, e se os dados e a assinatura corresponderem, o objeto Signature reporta sucesso.

Embora uma assinatura pareça semelhante a um message digest, elas têm propósitos muito diferentes no tipo de proteção que fornecem. Na verdade, algoritmos como "SHA256WithRSA" usam o message digest "SHA256" para inicialmente "comprimir" grandes conjuntos de dados em uma forma mais gerenciável, e então assinam o message digest resultante de 32 bytes com o algoritmo "RSA".

Para um exemplo de assinatura e verificação de dados, consulte [Gerando e Verificando uma Assinatura Usando Chaves Geradas](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

##### Estados do Objeto Signature

Objetos `Signature` são objetos modais. Isso significa que um objeto `Signature` está sempre em um determinado estado, onde ele pode realizar apenas um tipo de operação.

Os estados são representados como constantes inteiras finais definidas em suas respectivas classes.

Os três estados que um objeto `Signature` pode ter são:

  * `UNINITIALIZED`
  * `SIGN`
  * `VERIFY`

Quando é criado pela primeira vez, um objeto `Signature` está no estado `UNINITIALIZED`. A classe `Signature` define dois métodos de inicialização, `initSign` e `initVerify`, que alteram o estado para `SIGN` e `VERIFY`, respectivamente.

##### Criando um Objeto Signature

O primeiro passo para assinar ou verificar uma assinatura é criar uma instância `Signature`.

Objetos `Signature` são obtidos usando um dos métodos de fábrica estáticos `Signature` getInstance(). Consulte [Como as Implementações de Provedores são Solicitadas e Fornecidas](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

##### Inicializando um Objeto Signature

Um objeto `Signature` deve ser inicializado antes de ser usado. O método de inicialização depende se o objeto será usado para assinatura ou para verificação.

Se for usado para assinatura, o objeto deve primeiro ser inicializado com a chave privada da entidade cuja assinatura será gerada. Esta inicialização é feita chamando o método:
```java
    final void initSign(PrivateKey privateKey)
```

Este método coloca o objeto `Signature` no estado `SIGN`. Se, em vez disso, o objeto `Signature` for usado para verificação, ele deve primeiro ser inicializado com a chave pública da entidade cuja assinatura será verificada. Esta inicialização é feita chamando um destes métodos:
```java
        final void initVerify(PublicKey publicKey)

        final void initVerify(Certificate certificate)
```

Este método coloca o objeto `Signature` no estado `VERIFY`.

##### Assinando com um Objeto Signature

Se o objeto `Signature` foi inicializado para assinatura (se estiver no estado `SIGN`), os dados a serem assinados podem então ser fornecidos ao objeto. Isso é feito realizando uma ou mais chamadas a um dos métodos `update`:
```java
    final void update(byte b)
    final void update(byte[] data)
    final void update(byte[] data, int off, int len)
```

As chamadas ao(s) método(s) `update` devem ser feitas até que todos os dados a serem assinados tenham sido fornecidos ao objeto `Signature`.

Para gerar a assinatura, basta chamar um dos métodos `sign`:
```java
    final byte[] sign()
    final int sign(byte[] outbuf, int offset, int len)
```

O primeiro método retorna o resultado da assinatura em um array de bytes. O segundo armazena o resultado da assinatura no buffer `outbuf` fornecido, começando em `offset`. `len` é o número de bytes em `outbuf` alocados para a assinatura. O método retorna o número de bytes realmente armazenados.

A codificação da assinatura é específica do algoritmo. Consulte [Nomes de Algoritmos Padrão de Segurança Java](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html>) para saber mais sobre o uso da codificação ASN.1 na Arquitetura de Criptografia Java.

Uma chamada a um método `sign` redefine o objeto de assinatura para o estado em que estava quando foi previamente inicializado para assinatura via uma chamada a `initSign`. Ou seja, o objeto é redefinido e está disponível para gerar outra assinatura com a mesma chave privada, se desejado, via novas chamadas a `update` e `sign`.

Alternativamente, uma nova chamada pode ser feita a `initSign` especificando uma chave privada diferente, ou a `initVerify` (para inicializar o objeto `Signature` para verificar uma assinatura).

##### Verificando com um Objeto Signature

Se o objeto `Signature` foi inicializado para verificação (se estiver no estado `VERIFY`), ele pode então verificar se uma suposta assinatura é de fato a assinatura autêntica dos dados associados a ela. Para iniciar o processo, os dados a serem verificados (em oposição à própria assinatura) são fornecidos ao objeto. Os dados são passados ao objeto chamando um dos métodos `update`:
```java
    final void update(byte b)
    final void update(byte[] data)
    final void update(byte[] data, int off, int len)
```

As chamadas ao(s) método(s) `update` devem ser feitas até que todos os dados a serem verificados tenham sido fornecidos ao objeto `Signature`. A assinatura pode agora ser verificada chamando um dos métodos `verify`:
```java
    final boolean verify(byte[] signature)

    final boolean verify(byte[] signature, int offset, int length)
```

O argumento deve ser um array de bytes contendo a assinatura. Este array de bytes conteria os bytes da assinatura que foram retornados por uma chamada anterior a um dos métodos `sign`.

O método `verify` retorna um `boolean` indicando se a assinatura codificada é ou não a assinatura autêntica dos dados fornecidos ao(s) método(s) `update`.

Uma chamada ao método `verify` redefine o objeto de assinatura para o seu estado quando foi inicializado para verificação via uma chamada a `initVerify`. Ou seja, o objeto é redefinido e está disponível para verificar outra assinatura da identidade cuja chave pública foi especificada na chamada a `initVerify`.

Alternativamente, uma nova chamada pode ser feita a `initVerify` especificando uma chave pública diferente (para inicializar o objeto `Signature` para verificar uma assinatura de uma entidade diferente), ou a `initSign` (para inicializar o objeto `Signature` para gerar uma assinatura).

#### A Classe SignedObject

Esta classe é um bloco de construção essencial para outras primitivas de segurança. SignedObject contém outro objeto Serializable, o objeto (a ser) assinado e sua assinatura. Se a assinatura não for nula, ela contém uma assinatura digital válida do objeto assinado. Isso é ilustrado na [Figura 2-8](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Figura 2-8 Conteúdo do Objeto Assinado

O algoritmo de assinatura subjacente é definido através de um objeto Signature como um parâmetro para a chamada do método `sign`, e o algoritmo pode ser, entre outros, o padrão NIST DSA, usando DSA e SHA-256. O algoritmo é especificado usando a mesma convenção para assinaturas, como "SHA/DSA".

O objeto assinado é uma "cópia profunda" (em forma serializada) de um objeto original. Uma vez que a cópia é feita, manipulações posteriores do objeto original não têm efeito colateral na cópia. Um objeto assinado é imutável.

Um exemplo típico de criação de um objeto assinado é o seguinte:
```java
    Signature signingEngine = Signature.getInstance(algorithm;
    SignedObject so = new SignedObject(myobject, signingKey, signingEngine);
```

Um exemplo típico de verificação é o seguinte (tendo recebido SignedObject `so`), onde a primeira linha não é necessária se o nome do algoritmo for conhecido:
```java
    String algorithm = so.getAlgorithm();
    Signature verificationEngine = Signature.getInstance(algorithm);
    so.verify(verificationEngine);
```

Aplicações potenciais de SignedObject incluem:

  * Pode ser usado internamente em qualquer ambiente de aplicação Java como um token de autorização inalterável – um que pode ser passado sem o medo de que o token possa ser modificado maliciosamente sem ser detectado.
  * Pode ser usado para assinar e serializar dados/objetos para armazenamento fora do tempo de execução Java (por exemplo, armazenar dados críticos de controle de acesso em disco).
  * SignedObjects aninhados podem ser usados para construir uma sequência lógica de assinaturas, assemelhando-se a uma cadeia de autorização e delegação.

Pretende-se que esta classe possa ser estendida no futuro para permitir múltiplas assinaturas no mesmo objeto assinado. Nesse caso, as chamadas de método existentes nesta classe base serão totalmente compatíveis em semântica. Em particular, qualquer método `get` retornará o valor único se houver apenas uma assinatura, e retornará um arbitrário do conjunto de assinaturas se houver mais de uma assinatura.

#### A Classe Cipher

A classe `Cipher` fornece a funcionalidade de um cifrador criptográfico usado para criptografia e descriptografia. Criptografia é o processo de pegar dados (chamados de cleartext) e uma chave, e produzir dados (ciphertext) sem sentido para um terceiro que não conhece a chave. Descriptografia é o processo inverso: o de pegar ciphertext e uma chave e produzir cleartext.

Figura 2-9 A Classe Cipher

[Descrição de "Figura 2-9 A Classe Cipher"](<#/>)

Criptografia Simétrica Versus Assimétrica

Existem dois tipos principais de criptografia: simétrica (também conhecida como chave secreta) e assimétrica (ou criptografia de chave pública). Na criptografia simétrica, a mesma chave secreta é usada para criptografar e descriptografar os dados. Manter a chave privada é crítico para manter a confidencialidade dos dados. Por outro lado, a criptografia assimétrica usa um par de chaves pública/privada para criptografar dados. Dados criptografados com uma chave são descriptografados com a outra. Um usuário primeiro gera um par de chaves pública/privada e, em seguida, publica a chave pública em um banco de dados confiável que qualquer pessoa pode acessar. Um usuário que deseja se comunicar de forma segura com esse usuário criptografa os dados usando a chave pública recuperada. Apenas o detentor da chave privada será capaz de descriptografar. Manter a chave privada confidencial é crítico para este esquema.

Algoritmos assimétricos (como RSA) são geralmente muito mais lentos que os simétricos. Esses algoritmos não são projetados para proteger eficientemente grandes quantidades de dados. Na prática, algoritmos assimétricos são usados para trocar chaves secretas menores que são usadas para inicializar algoritmos simétricos.

Cifradores de Fluxo versus Cifradores de Bloco

Existem dois tipos principais de cifradores: de bloco e de fluxo. Cifradores de bloco processam blocos inteiros de cada vez, geralmente com muitos bytes de comprimento. Se não houver dados suficientes para formar um bloco de entrada completo, os dados devem ser preenchidos (padded): ou seja, antes da criptografia, bytes fictícios devem ser adicionados para formar um múltiplo do tamanho do bloco do cifrador. Esses bytes são então removidos durante a fase de descriptografia. O preenchimento pode ser feito pela aplicação, ou inicializando um cifrador para usar um tipo de preenchimento como "PKCS5PADDING". Em contraste, cifradores de fluxo processam os dados de entrada uma pequena unidade (tipicamente um byte ou mesmo um bit) por vez. Isso permite que os cifradores processem uma quantidade arbitrária de dados sem preenchimento.

Modos de Operação

Ao criptografar usando um cifrador de bloco simples, dois blocos idênticos de texto simples sempre produzirão um bloco idêntico de texto cifrado. Criptoanalistas tentando quebrar o texto cifrado terão um trabalho mais fácil se notarem blocos de texto repetidos. Um modo de operação de cifrador torna o texto cifrado menos previsível com alterações de bloco de saída baseadas na posição do bloco ou nos valores de outros blocos de texto cifrado. O primeiro bloco precisará de um valor inicial, e esse valor é chamado de vetor de inicialização (IV). Como o IV simplesmente altera os dados antes de qualquer criptografia, o IV deve ser aleatório, mas não precisa necessariamente ser mantido em segredo. Existem uma variedade de modos, como CBC (Cipher Block Chaining), CFB (Cipher Feedback Mode) e OFB (Output Feedback Mode). ECB (Electronic Codebook Mode) é um modo no qual não há influência da posição do bloco ou de outros blocos de texto cifrado. Como os textos cifrados ECB são os mesmos se usarem o mesmo texto simples/chave, este modo não é tipicamente adequado para aplicações criptográficas e não deve ser usado.

Alguns algoritmos como AES e RSA permitem chaves de diferentes comprimentos, mas outros são fixos, como 3DES. A criptografia usando uma chave mais longa geralmente implica uma resistência mais forte à recuperação da mensagem. Como de costume, há uma troca entre segurança e tempo, então escolha o comprimento da chave apropriadamente.

A maioria dos algoritmos usa chaves binárias. A maioria dos humanos não tem a capacidade de lembrar longas sequências de números binários, mesmo quando representados em hexadecimal. Senhas de caracteres são muito mais fáceis de lembrar. Como as senhas de caracteres são geralmente escolhidas de um pequeno número de caracteres (por exemplo, [a-zA-Z0-9]), protocolos como "Password-Based Encryption" (PBE) foram definidos para pegar senhas de caracteres e gerar chaves binárias fortes. A fim de tornar a tarefa de obter a chave a partir da senha muito demorada para um atacante (através dos chamados "ataques de tabela arco-íris" ou "ataques de dicionário pré-computados" onde mapeamentos comuns de palavra de dicionário->valor são pré-computados), a maioria das implementações PBE misturará um número aleatório, conhecido como salt, para reduzir a utilidade das tabelas pré-computadas.

Modos de cifragem mais recentes, como Criptografia Autenticada com Dados Associados (AEAD) (por exemplo, Galois/Counter Mode (GCM)), criptografam dados e autenticam a mensagem resultante simultaneamente. Dados Associados Adicionais (AAD) podem ser usados durante o cálculo da tag AEAD resultante (MAC), mas esses dados AAD não são produzidos como ciphertext. (Por exemplo, alguns dados podem não precisar ser mantidos confidenciais, mas devem figurar no cálculo da tag para detectar modificações.) Os métodos Cipher.updateAAD() podem ser usados para incluir AAD nos cálculos da tag.
Usando uma Cifra AES com Modo GCM

A cifra AES com GCM é uma cifra AEAD que possui padrões de uso diferentes das cifras não-AEAD. Além dos dados regulares, ela também aceita AAD, que é opcional para criptografia/descriptografia, mas o AAD deve ser fornecido antes dos dados para criptografia/descriptografia. Além disso, para usar GCM de forma segura, os chamadores não devem reutilizar combinações de chave e IV para criptografia. Isso significa que o objeto Cipher deve ser explicitamente reinicializado com um conjunto diferente de parâmetros a cada operação de criptografia.

Exemplo 2-2 Código de Exemplo para Usar uma Cifra AES com Modo GCM
```java
    SecretKey myKey = ...
    byte[] myAAD = ...
    byte[] plainText = ...
    int myTLen = ... 
    byte[] myIv = ...
    
    GCMParameterSpec myParams = new GCMParameterSpec(myTLen, myIv);
    Cipher c = Cipher.getInstance("AES/GCM/NoPadding");
    c.init(Cipher.ENCRYPT_MODE, myKey, myParams);
    
    // AAD é opcional, se presente, deve ser fornecido antes de qualquer chamada update/doFinal.
    c.updateAAD(myAAD);  // se AAD não for nulo
    byte[] cipherText = new byte[c.getOutputSize(plainText.length)];
    
    // conclusão da operação de criptografia
    int actualOutputLen = c.doFinal(plainText, 0, plainText.length, cipherText);
     
    // Para descriptografar, os mesmos parâmetros AAD e GCM devem ser fornecidos
    c.init(Cipher.DECRYPT_MODE, myKey, myParams);
    c.updateAAD(myAAD);
    byte[] recoveredText = c.doFinal(cipherText, 0, actualOutputLen);
    
    // DEVE MUDAR O VALOR DO IV se a mesma chave for usada novamente para criptografia
    byte[] newIv = ...;
    myParams = new GCMParameterSpec(myTLen, newIv);
```

Criando um Objeto Cipher

Objetos `Cipher` são obtidos usando um dos métodos estáticos de fábrica `Cipher` getInstance(). Consulte [Como as Implementações de Provedores são Solicitadas e Fornecidas](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>). Aqui, o nome do algoritmo é ligeiramente diferente do que com outras classes de engine, pois especifica não apenas um nome de algoritmo, mas uma "transformação". Uma transformação é uma string que descreve a operação (ou conjunto de operações) a ser realizada na entrada fornecida para produzir alguma saída. Uma transformação sempre inclui o nome de um algoritmo criptográfico (por exemplo, `AES`), e pode ser seguido por um modo e um esquema de preenchimento (padding scheme).

Uma transformação tem a forma:

  * "algorithm/mode/padding" ou
  * "algorithm"

Por exemplo, as seguintes são transformações válidas:
```java
    "AES/CBC/PKCS5Padding"
    "AES"
```

Se apenas um nome de transformação for especificado, o sistema determinará se há uma implementação da transformação solicitada disponível no ambiente e, se houver mais de uma, retornará se houver uma preferencial.

Se um nome de transformação e um provedor de pacote forem especificados, o sistema determinará se há uma implementação da transformação solicitada no pacote solicitado e lançará uma exceção caso não haja.

Recomenda-se usar uma transformação que especifique completamente o algoritmo, o modo e o preenchimento (padding). Ao não fazer isso, o provedor usará um padrão. Por exemplo, os provedores SunJCE e SunPKCS11 usam ECB como modo padrão e PKCS5Padding como preenchimento padrão para muitas cifras simétricas.

Isso significa que, no caso do provedor `SunJCE`:
```java
    Cipher c1 = Cipher.getInstance("AES/ECB/PKCS5Padding");
```

e
```java
    Cipher c1 = Cipher.getInstance("AES");
```

são declarações equivalentes.

Nota:

O modo ECB é o modo de cifra de bloco mais fácil de usar e é o modo de cifra padrão. O ECB funciona bem para blocos únicos de dados e pode ser paralelizado, mas geralmente não deve ser usado para criptografar múltiplos blocos de dados devido às características do modo. Isso pode resultar na divulgação trivial e completa de dados confidenciais. Embora este modo esteja disponível para uso, ele só deve ser usado com uma compreensão dos riscos criptográficos envolvidos.

Usando modos como CFB e OFB, as cifras de bloco podem criptografar dados em unidades menores do que o tamanho real do bloco da cifra. Ao solicitar tal modo, você pode opcionalmente especificar o número de bits a serem processados por vez, anexando este número ao nome do modo, como mostrado nas transformações "AES/CFB8/NoPadding" e "AES/OFB32/PKCS5Padding". Se nenhum número for especificado, um padrão específico do provedor é usado. (Por exemplo, o provedor `SunJCE` usa um padrão de 256 bits para AES.) Assim, as cifras de bloco podem ser transformadas em cifras de fluxo orientadas a bytes usando um modo de 8 bits como CFB8 ou OFB8.

[Nomes de Algoritmos Padrão de Segurança Java](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html>) contém uma lista de nomes padrão que podem ser usados para especificar os componentes de nome de algoritmo, modo e esquema de preenchimento de uma transformação.

Os objetos retornados pelos métodos de fábrica não são inicializados e devem ser inicializados antes de se tornarem utilizáveis.

Inicializando um Objeto Cipher

Um objeto Cipher obtido através de `getInstance` deve ser inicializado para um dos quatro modos, que são definidos como constantes inteiras finais na classe `Cipher`. Os modos podem ser referenciados por seus nomes simbólicos:

ENCRYPT_MODE
    Criptografia de dados.
DECRYPT_MODE
    Descriptografia de dados.
WRAP_MODE
    Empacotar (Wrapping) uma `java.security.Key` em bytes para que a chave possa ser transportada com segurança.
UNWRAP_MODE
    Desempacotar (Unwrapping) uma chave previamente empacotada em um objeto `java.security.Key`.

Cada um dos métodos de inicialização do Cipher recebe um parâmetro de modo operacional (`opmode`) e inicializa o objeto Cipher para esse modo. Outros parâmetros incluem a chave (`key`) ou certificado contendo a chave (`certificate`), parâmetros de algoritmo (`params`) e uma fonte de aleatoriedade (`random`).

Para inicializar um objeto Cipher, chame um dos seguintes métodos `init`:
```java
    public void init(int opmode, Key key);
    
    public void init(int opmode, Certificate certificate);
    
    public void init(int opmode, Key key, SecureRandom random);
    
    public void init(int opmode, Certificate certificate,
                     SecureRandom random);
    
    public void init(int opmode, Key key,
                     AlgorithmParameterSpec params);
    
    public void init(int opmode, Key key,
                     AlgorithmParameterSpec params, SecureRandom random);
    
    public void init(int opmode, Key key,
                     AlgorithmParameters params);
    
    public void init(int opmode, Key key,
                     AlgorithmParameters params, SecureRandom random);
```

Se um objeto Cipher que requer parâmetros (por exemplo, um vetor de inicialização) for inicializado para criptografia, e nenhum parâmetro for fornecido ao método `init`, a implementação da cifra subjacente deve fornecer os parâmetros necessários por si mesma, seja gerando parâmetros aleatórios ou usando um conjunto de parâmetros padrão, específico do provedor.

No entanto, se um objeto Cipher que requer parâmetros for inicializado para descriptografia, e nenhum parâmetro for fornecido ao método `init`, uma exceção `InvalidKeyException` ou `InvalidAlgorithmParameterException` será lançada, dependendo do método `init` que foi usado.

Consulte [Gerenciando Parâmetros de Algoritmo](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Os mesmos parâmetros que foram usados para criptografia devem ser usados para descriptografia.

Observe que, quando um objeto Cipher é inicializado, ele perde todo o estado adquirido anteriormente. Em outras palavras, inicializar um Cipher é equivalente a criar uma nova instância desse Cipher e inicializá-lo. Por exemplo, se um Cipher for primeiro inicializado para descriptografia com uma determinada chave, e depois inicializado para criptografia, ele perderá qualquer estado adquirido enquanto estava no modo de descriptografia.

Criptografando e Descriptografando Dados

Os dados podem ser criptografados ou descriptografados em uma única etapa (operação de parte única) ou em múltiplas etapas (operação de múltiplas partes). Uma operação de múltiplas partes é útil se você não souber de antemão o tamanho dos dados, ou se os dados forem muito longos para serem armazenados na memória de uma só vez.

Para criptografar ou descriptografar dados em uma única etapa, chame um dos métodos `doFinal`:
```java
    public byte[] doFinal(byte[] input);
    
    public byte[] doFinal(byte[] input, int inputOffset, int inputLen);
    
    public int doFinal(byte[] input, int inputOffset,
                       int inputLen, byte[] output);
    
    public int doFinal(byte[] input, int inputOffset,
                       int inputLen, byte[] output, int outputOffset)
```

Para criptografar ou descriptografar dados em múltiplas etapas, chame um dos métodos `update`:
```java
    public byte[] update(byte[] input);
    
    public byte[] update(byte[] input, int inputOffset, int inputLen);
    
    public int update(byte[] input, int inputOffset, int inputLen,
                      byte[] output);
    
    public int update(byte[] input, int inputOffset, int inputLen,
                      byte[] output, int outputOffset)
```

Uma operação de múltiplas partes deve ser encerrada por um destes métodos `doFinal` (se ainda houver dados de entrada restantes para a última etapa), ou por um dos seguintes métodos `doFinal` (se não houver dados de entrada restantes para a última etapa):
```java
    public byte[] doFinal();
    
    public int doFinal(byte[] output, int outputOffset);
```

Todos os métodos `doFinal` cuidam de qualquer preenchimento (padding) ou des-preenchimento (unpadding) necessário, se o preenchimento (ou des-preenchimento) tiver sido solicitado como parte da transformação especificada.

Uma chamada para `doFinal` redefine o objeto Cipher para o estado em que estava quando inicializado através de uma chamada para `init`. Ou seja, o objeto Cipher é redefinido e fica disponível para criptografar ou descriptografar (dependendo do modo de operação que foi especificado na chamada para `init`) mais dados.

Empacotando e Desempacotando Chaves

Empacotar uma chave (wrapping) permite a transferência segura da chave de um lugar para outro.

Os métodos `wrap` e unwrap tornam mais conveniente escrever código, pois eles trabalham diretamente com objetos de chave. Esses métodos também possibilitam a transferência segura de chaves baseadas em hardware.

Para empacotar uma Key, primeiro inicialize o objeto Cipher para WRAP_MODE e, em seguida, chame o seguinte:
```java
    public final byte[] wrap(Key key);
```

Se você estiver fornecendo os bytes da chave empacotada (o resultado da chamada `wrap`) para outra pessoa que irá desempacotá-los, certifique-se de também enviar informações adicionais que o destinatário precisará para realizar o `unwrap`:

  * O nome do algoritmo da chave.
  * O tipo da chave empacotada (um de `Cipher.SECRET_KEY`, `Cipher.PRIVATE_KEY` ou `Cipher.PUBLIC_KEY`).

O nome do algoritmo da chave pode ser determinado chamando o método `getAlgorithm` da interface Key:
```java
    public String getAlgorithm();
```

Para desempacotar os bytes retornados por uma chamada anterior a `wrap`, primeiro inicialize um objeto Cipher para UNWRAP_MODE e, em seguida, chame o seguinte:
```java
    public final Key unwrap(byte[] wrappedKey,
                            String wrappedKeyAlgorithm,
                            int wrappedKeyType));
```

Aqui, `wrappedKey` são os bytes retornados da chamada anterior a wrap, `wrappedKeyAlgorithm` é o algoritmo associado à chave empacotada, e `wrappedKeyType` é o tipo da chave empacotada. Este deve ser um de `Cipher.SECRET_KEY`, `Cipher.PRIVATE_KEY` ou `Cipher.PUBLIC_KEY`.

Gerenciando Parâmetros de Algoritmo

Os parâmetros sendo usados pela implementação subjacente do Cipher, que foram explicitamente passados para o método `init` pela aplicação ou gerados pela própria implementação subjacente, podem ser recuperados do objeto Cipher chamando seu método `getParameters`, que retorna os parâmetros como um objeto `java.security.AlgorithmParameters` (ou `null` se nenhum parâmetro estiver sendo usado). Se o parâmetro for um vetor de inicialização (IV), ele também pode ser recuperado chamando o método `getIV`.

No exemplo a seguir, um objeto Cipher que implementa criptografia baseada em senha (PBE) é inicializado apenas com uma chave e sem parâmetros. No entanto, o algoritmo selecionado para criptografia baseada em senha requer dois parâmetros - um salt e uma contagem de iterações. Esses serão gerados pela própria implementação do algoritmo subjacente. A aplicação pode recuperar os parâmetros gerados do objeto Cipher, consulte [Exemplo 2-3](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Os mesmos parâmetros que foram usados para criptografia devem ser usados para descriptografia. Eles podem ser instanciados a partir de sua codificação e usados para inicializar o objeto Cipher correspondente para descriptografia, consulte [Exemplo 2-4](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Se você não especificou nenhum parâmetro ao inicializar um objeto Cipher, e não tem certeza se a implementação subjacente usa ou não algum parâmetro, você pode descobrir simplesmente chamando o método `getParameters` do seu objeto Cipher e verificando o valor retornado. Um valor de retorno `null` indica que nenhum parâmetro foi usado.

Os seguintes algoritmos de cifra implementados pelo provedor `SunJCE` usam parâmetros:

  * AES, DES-EDE e Blowfish, quando usados no modo de feedback (ou seja, CBC, CFB, OFB ou PCBC), usam um vetor de inicialização (IV). A classe `javax.crypto.spec.IvParameterSpec` pode ser usada para inicializar um objeto Cipher com um IV fornecido. Além disso, os modos CTR e GCM requerem um IV.
  * Os algoritmos de cifra PBE usam um conjunto de parâmetros, compreendendo um salt e uma contagem de iterações. A classe `javax.crypto.spec.PBEParameterSpec` pode ser usada para inicializar um objeto Cipher que implementa um algoritmo PBE (por exemplo: PBEWithHmacSHA256AndAES_256) com um salt e uma contagem de iterações fornecidos.

Observe que você não precisa se preocupar em armazenar ou transferir quaisquer parâmetros de algoritmo para uso pela operação de descriptografia se usar a classe SealedObject. Esta classe anexa os parâmetros usados para selagem (criptografia) ao conteúdo do objeto criptografado e usa os mesmos parâmetros para desselagem (descriptografia).

Exemplo 2-3 Código de Exemplo para Recuperar Parâmetros do Objeto Cipher

A aplicação pode recuperar os parâmetros gerados para criptografia do objeto Cipher da seguinte forma:
```java
    // obter objeto cipher para criptografia baseada em senha
    Cipher c = Cipher.getInstance("PBEWithHmacSHA256AndAES_256");
    
    // inicializar cipher para criptografia, sem fornecer
    // quaisquer parâmetros. Aqui, "myKey" é assumido como referindo-se
    // a uma chave AES secreta já gerada.
    c.init(Cipher.ENCRYPT_MODE, myKey);
    
    // criptografar alguns dados e armazenar o texto cifrado
    // para descriptografia posterior
    byte[] cipherText = c.doFinal("This is just an example".getBytes());
    
    // recuperar parâmetros gerados pela implementação da cifra
    // subjacente
    AlgorithmParameters algParams = c.getParameters();
    
    // obter codificação do parâmetro e armazená-la
    byte[] encodedAlgParams = algParams.getEncoded();
```

Exemplo 2-4 Código de Exemplo para Inicializar o Objeto Cipher para Descriptografia

Os mesmos parâmetros que foram usados para criptografia devem ser usados para descriptografia. Eles podem ser instanciados a partir de sua codificação e usados para inicializar o objeto Cipher correspondente para descriptografia da seguinte forma:
```java
    // obter objeto de parâmetro para criptografia baseada em senha
    AlgorithmParameters algParams;
    algParams = AlgorithmParameters.getInstance("PBEWithHmacSHA256AndAES_256");
    
    // inicializar com a codificação do parâmetro do exemplo anterior
    algParams.init(encodedAlgParams);
    
    // obter objeto cipher para criptografia baseada em senha
    Cipher c = Cipher.getInstance("PBEWithHmacSHA256AndAES_256");
    
    // inicializar cipher para descriptografia, usando um dos
    // métodos init() que aceita um objeto AlgorithmParameters,
    // e passar a ele o objeto algParams do exemplo anterior
    c.init(Cipher.DECRYPT_MODE, myKey, algParams);
```

Considerações sobre a Saída do Cipher

Alguns dos métodos `update` e `doFinal` de Cipher permitem que o chamador especifique o buffer de saída no qual criptografar ou descriptografar os dados. Nesses casos, é importante passar um buffer que seja grande o suficiente para conter o resultado da operação de criptografia ou descriptografia.

O seguinte método em Cipher pode ser usado para determinar o tamanho do buffer de saída:
```java
    public int getOutputSize(int inputLen)
```

#### Outras Classes Baseadas em Cipher

Existem algumas classes auxiliares que usam `Cipher`s internamente para fornecer acesso fácil a usos comuns de cifras.

Tópicos

[As Classes de Stream de Cifra](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)

[A Classe SealedObject](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)

##### As Classes de Stream de Cifra

As classes `CipherInputStream` e `CipherOutputStream` são classes de stream de cifra.

A Classe CipherInputStream

Esta classe é um `FilterInputStream` que criptografa ou descriptografa os dados que passam por ele. É composto por um `InputStream`. CipherInputStream representa um stream de entrada seguro no qual um objeto Cipher foi interposto. Os métodos `read` de CipherInputStream retornam dados que são lidos do InputStream subjacente, mas que foram adicionalmente processados pelo objeto Cipher incorporado. O objeto Cipher deve ser totalmente inicializado antes de ser usado por um CipherInputStream.

Por exemplo, se o Cipher incorporado foi inicializado para descriptografia, o CipherInputStream tentará descriptografar os dados que lê do InputStream subjacente antes de retorná-los à aplicação.

Esta classe adere estritamente à semântica, especialmente à semântica de falha, de suas classes ancestrais `java.io.FilterInputStream` e `java.io.InputStream`. Esta classe possui exatamente os métodos especificados em suas classes ancestrais e os sobrescreve todos, de modo que os dados são adicionalmente processados pela cifra incorporada. Além disso, esta classe captura todas as exceções que não são lançadas por suas classes ancestrais. Em particular, o método `skip(long)` ignora apenas dados que foram processados pelo Cipher.

É crucial para um programador que usa esta classe não usar métodos que não são definidos ou sobrescritos nesta classe (como um novo método ou construtor que é adicionado posteriormente a uma das superclasses), porque o design e a implementação desses métodos provavelmente não consideraram o impacto na segurança em relação ao CipherInputStream. Consulte [Exemplo 2-5](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) para seu uso, suponha que `cipher1` tenha sido inicializado para criptografia. O programa lê e criptografa o conteúdo do arquivo `/tmp/a.txt` e então armazena o resultado (os bytes criptografados) em `/tmp/b.txt`.

[Exemplo 2-6](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) demonstra como conectar facilmente várias instâncias de `CipherInputStream` e `FileInputStream`. Neste exemplo, suponha que `cipher1` e `cipher2` tenham sido inicializados para criptografia e descriptografia (com as chaves correspondentes), respectivamente. O programa copia o conteúdo do arquivo `/tmp/a.txt` para `/tmp/b.txt`, exceto que o conteúdo é primeiro criptografado e depois descriptografado de volta quando é lido de `/tmp/a.txt`. Claro que, como este programa simplesmente criptografa texto e o descriptografa imediatamente, ele não é muito útil, exceto como uma maneira simples de ilustrar o encadeamento de `CipherInputStreams`.

Observe que os métodos de leitura do `CipherInputStream` bloquearão até que os dados sejam retornados da cifra subjacente. Se uma cifra de bloco for usada, um bloco completo de texto cifrado terá que ser obtido do `InputStream` subjacente.

Exemplo 2-5 Código de Exemplo para Usar CipherInputStream e FileInputStream

O código a seguir demonstra como usar um `CipherInputStream` contendo essa cifra e um `FileInputStream` para criptografar dados de um stream de entrada:
```java
    try (FileInputStream fis = new FileInputStream("/tmp/a.txt");
            CipherInputStream cis = new CipherInputStream(fis, cipher1);
            FileOutputStream fos = new FileOutputStream("/tmp/b.txt")) {
        byte[] b = new byte[8];
        int i = cis.read(b);
        while (i != -1) {
            fos.write(b, 0, i);
            i = cis.read(b);
        }
    }
```

Exemplo 2-6 Código de Exemplo para Conectar CipherInputStream e FileInputStream

O exemplo a seguir demonstra como conectar facilmente várias instâncias de CipherInputStream e FileInputStream. Neste exemplo, suponha que `cipher1` e `cipher2` tenham sido inicializados para criptografia e descriptografia (com as chaves correspondentes), respectivamente:
```java
    try (FileInputStream fis = new FileInputStream("/tmp/a.txt");
            CipherInputStream cis1 = new CipherInputStream(fis, cipher1);
            CipherInputStream cis2 = new CipherInputStream(cis1, cipher2);
            FileOutputStream fos = new FileOutputStream("/tmp/b.txt")) {
        byte[] b = new byte[8];
        int i = cis2.read(b);
        while (i != -1) {
            fos.write(b, 0, i);
            i = cis2.read(b);
        }
    }  
```

A Classe CipherOutputStream

Esta classe é um `FilterOutputStream` que criptografa ou descriptografa os dados que passam por ele. É composto por um `OutputStream`, ou uma de suas subclasses, e um `Cipher`. CipherOutputStream representa um stream de saída seguro no qual um objeto Cipher foi interposto. Os métodos `write` de CipherOutputStream primeiro processam os dados com o objeto Cipher incorporado antes de escrevê-los para o OutputStream subjacente. O objeto Cipher deve ser totalmente inicializado antes de ser usado por um CipherOutputStream.

Por exemplo, se o Cipher incorporado foi inicializado para criptografia, o `CipherOutputStream` criptografará seus dados antes de escrevê-los para o stream de saída subjacente.

Esta classe adere estritamente à semântica, especialmente à semântica de falha, de suas classes ancestrais `java.io.OutputStream` e `java.io.FilterOutputStream`. Esta classe possui exatamente os métodos especificados em suas classes ancestrais e os sobrescreve todos, de modo que todos os dados são adicionalmente processados pela cifra incorporada. Além disso, esta classe captura todas as exceções que não são lançadas por suas classes ancestrais.

É crucial para um programador que usa esta classe não usar métodos que não são definidos ou sobrescritos nesta classe (como um novo método ou construtor que é adicionado posteriormente a uma das superclasses), porque o design e a implementação desses métodos provavelmente não consideraram o impacto na segurança em relação ao `CipherOutputStream`.

Consulte [Exemplo 2-7](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>), para seu uso, suponha que `cipher1` tenha sido inicializado para criptografia. O programa lê o conteúdo do arquivo `/tmp/a.txt`, então criptografa e armazena o resultado (os bytes criptografados) em `/tmp/b.txt`.

[Exemplo 2-7](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) demonstra como conectar facilmente várias instâncias de `CipherOutputStream` e `FileOutputStream`. Neste exemplo, suponha que `cipher1` e `cipher2` tenham sido inicializados para descriptografia e criptografia (com as chaves correspondentes), respectivamente. O programa copia o conteúdo do arquivo `/tmp/a.txt` para `/tmp/b.txt`, exceto que o conteúdo é primeiro criptografado e depois descriptografado de volta antes de ser escrito em `/tmp/b.txt`.

Uma coisa a ter em mente ao usar algoritmos de cifra de bloco é que um bloco completo de dados de texto simples (plaintext) deve ser fornecido ao `CipherOutputStream` antes que os dados sejam criptografados e enviados para o stream de saída subjacente.

Há outra diferença importante entre os métodos `flush` e `close` desta classe, que se torna ainda mais relevante se o objeto Cipher encapsulado implementar um algoritmo de cifra de bloco com preenchimento (padding) ativado:

  * `flush` descarrega o OutputStream subjacente forçando a escrita de quaisquer bytes de saída armazenados em buffer que já foram processados pelo objeto Cipher encapsulado. Quaisquer bytes armazenados em buffer pelo objeto Cipher encapsulado e aguardando processamento não serão escritos.
  * `close` fecha o OutputStream subjacente e libera quaisquer recursos do sistema associados a ele. Ele invoca o método `doFinal` do objeto Cipher encapsulado, fazendo com que quaisquer bytes armazenados em buffer por ele sejam processados e escritos no stream subjacente chamando seu método `flush`.

Exemplo 2-7 Código de Exemplo para Usar CipherOutputStream e FileOutputStream

O código demonstra como usar um `CipherOutputStream` contendo essa cifra e um `FileOutputStream` para criptografar dados a serem escritos em um stream de saída:
```java
    try (FileInputStream fis = new FileInputStream("/tmp/a.txt");
            FileOutputStream fos = new FileOutputStream("/tmp/b.txt");
            CipherOutputStream cos = new CipherOutputStream(fos, cipher1)) {
        byte[] b = new byte[8];
        int i = fis.read(b);
        while (i != -1) {
            cos.write(b, 0, i);
            i = fis.read(b);
        }
        cos.flush();
    }
```

Exemplo 2-8 Código de Exemplo para Conectar CipherOutputStream e FileOutputStream

O código demonstra como conectar facilmente várias instâncias de CipherOutputStream e FileOutputStream. Neste exemplo, suponha que `cipher1` e `cipher2` tenham sido inicializados para descriptografia e criptografia (com as chaves correspondentes), respectivamente:
```java
    try (FileInputStream fis = new FileInputStream("/tmp/a.txt");
            FileOutputStream fos = new FileOutputStream("/tmp/b.txt");
            CipherOutputStream cos1 = new CipherOutputStream(fos, cipher1);
            CipherOutputStream cos2 = new CipherOutputStream(cos1, cipher2)) {
        byte[] b = new byte[8];
        int i = fis.read(b);
        while (i != -1) {
            cos2.write(b, 0, i);
            i = fis.read(b);
        }
        cos2.flush();
    }
```

##### A Classe SealedObject

Esta classe permite que um programador crie um objeto e proteja sua confidencialidade com um algoritmo criptográfico.

Dado qualquer objeto que implemente a interface `java.io.Serializable`, pode-se criar um `SealedObject` que encapsula o objeto original, em formato serializado (ou seja, uma "cópia profunda"), e sela (criptografa) seu conteúdo serializado, usando um algoritmo criptográfico como AES, para proteger sua confidencialidade. O conteúdo criptografado pode ser posteriormente descriptografado (com o algoritmo correspondente usando a chave de descriptografia correta) e desserializado, resultando no objeto original.

Um uso típico é ilustrado no seguinte segmento de código: Para selar um objeto, você cria um `SealedObject` a partir do objeto a ser selado e um objeto `Cipher` totalmente inicializado que criptografará o conteúdo serializado do objeto. Neste exemplo, a String "This is a secret" é selada usando o algoritmo AES. Observe que quaisquer parâmetros de algoritmo que possam ser usados na operação de selagem são armazenados dentro de `SealedObject`:
```java
        // criar objeto Cipher
        // NOTA: sKey é assumido como referindo-se a uma chave AES secreta já gerada.
        Cipher c = Cipher.getInstance("AES");
        c.init(Cipher.ENCRYPT_MODE, sKey);
    
        // realizar a selagem
        SealedObject so = new SealedObject("This is a secret", c);
    
```

O objeto original que foi selado pode ser recuperado de duas maneiras diferentes:

  * usando um objeto `Cipher` que foi inicializado com o mesmo algoritmo, chave, esquema de preenchimento, etc., que foram usados para selar o objeto:
```java
c.init(Cipher.DECRYPT_MODE, sKey);
            try {
                String s = (String)so.getObject(c);
            } catch (Exception e) {
                // fazer algo
            };
        
```

Esta abordagem tem a vantagem de que a parte que dessela o objeto selado não requer conhecimento da chave de descriptografia. Por exemplo, depois que uma parte inicializou o objeto cifra com a chave de descriptografia necessária, ela poderia entregar o objeto cifra a outra parte que então dessela o objeto selado.

  * usando a chave de descriptografia apropriada (já que AES é um algoritmo de criptografia simétrica, usamos a mesma chave para selagem e desselagem):
```java
try {
                String s = (String)so.getObject(sKey);
            } catch (Exception e) {
                // fazer algo
            };
        
```

Nesta abordagem, o método `getObject` cria um objeto cifra para o algoritmo de descriptografia apropriado e o inicializa com a chave de descriptografia fornecida e os parâmetros do algoritmo (se houver) que foram armazenados no objeto selado. Esta abordagem tem a vantagem de que a parte que dessela o objeto não precisa acompanhar os parâmetros (por exemplo, o IV) que foram usados para selar o objeto.

#### A Classe KEM

A classe `KEM` é uma classe de engine (consulte [Classes de Engine e Algoritmos](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)) que fornece a funcionalidade de um Mecanismo de Encapsulamento de Chave (KEM).

Você pode usar o KEM para proteger chaves simétricas usando criptografia assimétrica ou de chave pública entre duas partes. O remetente chama o método encapsulate para gerar uma chave secreta e uma mensagem de encapsulamento de chave, e o receptor chama o método decapsulate para recuperar a mesma chave secreta da mensagem de encapsulamento de chave.

Preparação

O receptor precisa criar um par de chaves usando um KeyPairGenerator. A chave pública é publicada e disponibilizada ao remetente, e a chave privada é mantida em segredo.

Criando Objetos KEM

Cada parte precisa criar um objeto KEM. Objetos KEM são criados usando um dos métodos estáticos de fábrica KEM getInstance(). Consulte [Como as Implementações de Provedores são Solicitadas e Fornecidas](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Criando um Encapsulador e um Decapsulador

No lado do remetente, chame um dos métodos newEncapsulator do objeto KEM para criar um encapsulador. A chave pública do receptor é usada no processo. No lado do receptor, chame um dos métodos newDecapsulator do objeto KEM para criar um decapsulador. A chave privada do receptor é usada no processo.

Encapsulamento e Desencapsulamento

O remetente chama um dos métodos encapsulate no objeto KEM.Encapsulator recém-criado, que retorna um objeto KEM.Encapsulated. A chave secreta dentro do objeto KEM.Encapsulated é mantida em segredo, e a mensagem de encapsulamento de chave dentro dele é enviada ao receptor.

O receptor passa a mensagem de encapsulamento de chave do remetente para um dos métodos decapsulate no objeto KEM.Decapsulator recém-criado, que retorna um objeto SecretKey. Esta chave secreta é idêntica à chave secreta do lado do remetente.

O remetente pode usar a chave para futuras comunicações seguras com o receptor.

Consulte [Encapsulando e Desencapsulando Chaves](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) para um exemplo de código.

#### A Classe Mac

Semelhante a um `MessageDigest`, um Código de Autenticação de Mensagem (MAC) fornece uma maneira de verificar a integridade das informações transmitidas ou armazenadas em um meio não confiável, mas inclui uma chave secreta no cálculo.

Apenas alguém com a chave apropriada será capaz de verificar a mensagem recebida. Tipicamente, códigos de autenticação de mensagem são usados entre duas partes que compartilham uma chave secreta para validar informações transmitidas entre essas partes.

Figura 2-10 A Classe Mac

[Descrição de "Figura 2-10 A Classe Mac"](<#/>)

Um mecanismo MAC que é baseado em funções hash criptográficas é referido como HMAC. HMAC pode ser usado com qualquer função hash criptográfica, por exemplo, SHA-256, em combinação com uma chave secreta compartilhada.
A classe `Mac` fornece a funcionalidade de um Message Authentication Code (MAC). Veja [Exemplo de HMAC-SHA256](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Criando um Objeto Mac

Objetos `Mac` são obtidos usando um dos métodos estáticos de fábrica `Mac` getInstance(). Veja [Como as Implementações de Provedores São Solicitadas e Fornecidas](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Inicializando um Objeto Mac

Um objeto Mac é sempre inicializado com uma chave (secreta) e pode, opcionalmente, ser inicializado com um conjunto de parâmetros, dependendo do algoritmo MAC subjacente.

Para inicializar um objeto Mac, chame um de seus métodos `init`:
```java
        public void init(Key key);
    
        public void init(Key key, AlgorithmParameterSpec params);
```

Você pode inicializar seu objeto Mac com qualquer objeto de chave (secreta) que implemente a interface `javax.crypto.SecretKey`. Este pode ser um objeto retornado por `javax.crypto.KeyGenerator.generateKey()`, ou um que seja o resultado de um protocolo de acordo de chave, como retornado por `javax.crypto.KeyAgreement.generateSecret()`, ou uma instância de `javax.crypto.spec.SecretKeySpec`.

Com alguns algoritmos MAC, o algoritmo da chave (secreta) associado ao objeto de chave (secreta) usado para inicializar o objeto Mac não importa (este é o caso com as implementações HMAC-MD5 e HMAC-SHA1 do provedor `SunJCE`). Com outros, no entanto, o algoritmo da chave (secreta) importa, e uma `InvalidKeyException` é lançada se um objeto de chave (secreta) com um algoritmo de chave (secreta) inapropriado for usado.

Calculando um MAC

Um MAC pode ser calculado em uma única etapa (operação de parte única) ou em múltiplas etapas (operação de múltiplas partes). Uma operação de múltiplas partes é útil se você não souber antecipadamente o tamanho dos dados, ou se os dados forem muito longos para serem armazenados na memória de uma só vez.

Para calcular o MAC de alguns dados em uma única etapa, chame o seguinte método `doFinal`:
```java
        public byte[] doFinal(byte[] input);
```

Para calcular o MAC de alguns dados em múltiplas etapas, chame um dos métodos `update`:
```java
        public void update(byte input);
    
        public void update(byte[] input);
    
        public void update(byte[] input, int inputOffset, int inputLen);
```

Uma operação de múltiplas partes deve ser encerrada pelo método `doFinal` (se ainda houver dados de entrada para a última etapa), ou por um dos seguintes métodos `doFinal` (se não houver dados de entrada para a última etapa):
```java
        public byte[] doFinal();
    
        public void doFinal(byte[] output, int outOffset);
```

#### Interfaces de Chave

A interface `java.security.Key` é a interface de nível superior para todas as chaves opacas. Ela define a funcionalidade compartilhada por todos os objetos de chave opaca.

Até este ponto, focamos nos usos de alto nível da JCA sem nos perdermos nos detalhes do que são as chaves e como elas são geradas/representadas. Agora é hora de voltar nossa atenção para as chaves.

Uma representação de chave opaca é aquela em que você não tem acesso direto ao material da chave que a constitui. Em outras palavras: "opaca" lhe dá acesso limitado à chave — apenas os três métodos definidos pela interface `Key`: `getAlgorithm`, `getFormat` e `getEncoded`.

Isso contrasta com uma representação transparente, na qual você pode acessar cada valor de material de chave individualmente, através de um dos métodos `get` definidos na interface `KeySpec` correspondente (veja [A Interface KeySpec](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)).

Todas as chaves opacas possuem três características:

Um Algoritmo
    O algoritmo da chave para aquela chave. O algoritmo da chave é geralmente um algoritmo de criptografia ou operação assimétrica (como `AES`, `DSA` ou `RSA`), que funcionará com esses algoritmos e com algoritmos relacionados (como `SHA256withRSA`). O nome do algoritmo de uma chave é obtido usando este método:
```java
    String getAlgorithm()
    
```

Uma Forma Codificada
    A forma codificada externa para a chave usada quando uma representação padrão da chave é necessária fora da Java Virtual Machine, como ao transmitir a chave para outra parte. A chave é codificada de acordo com um formato padrão (como X.509 ou PKCS8), e é retornada usando o método:
```java
    byte[] getEncoded()
    
```

Um Formato
    O nome do formato da chave codificada. É retornado pelo método:
```java
    String getFormat()
    
```

As chaves são geralmente obtidas através de geradores de chaves, como a classe `KeyGenerator` e a classe `KeyPairGenerator`, certificados, especificações de chave (veja [A Interface KeySpec](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)) usando uma `KeyFactory`, ou uma implementação de `Keystore` acessando um banco de dados de keystore usado para gerenciar chaves. É possível analisar chaves codificadas, de maneira dependente do algoritmo, usando uma `KeyFactory`.

Também é possível analisar certificados, usando uma `CertificateFactory`.

Aqui está uma lista de interfaces que estendem a interface `Key` nos pacotes `java.security.interfaces` e `javax.crypto.interfaces`:

  * [SecretKey](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/SecretKey.html>)
    * [PBEKey](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/interfaces/PBEKey.html>)
  * [AsymmetricKey](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/AsymmetricKey.html>)
    * [PrivateKey](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/PrivateKey.html>)
      * [DHPrivateKey](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/interfaces/DHPrivateKey.html>)
      * [DSAPrivateKey](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/interfaces/DSAPrivateKey.html>)
      * [ECPrivateKey](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/interfaces/ECPrivateKey.html>)
      * [EdECPrivateKey](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/interfaces/EdECPrivateKey.html>)
      * [RSAMultiPrimePrivateCrtKey](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/interfaces/RSAMultiPrimePrivateCrtKey.html>)
      * [RSAPrivateCrtKey](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/interfaces/RSAPrivateCrtKey.html>)
      * [RSAPrivateKey](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/interfaces/RSAPrivateKey.html>)
      * [XECPrivateKey](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/interfaces/XECPrivateKey.html>)
    * [PublicKey](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/PublicKey.html>)
      * [DHPublicKey](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/interfaces/DHPublicKey.html>)
      * [DSAPublicKey](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/interfaces/DSAPublicKey.html>)
      * [ECPublicKey](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/interfaces/ECPublicKey.html>)
      * [EdECPublicKey](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/interfaces/EdECPublicKey.html>)
      * [RSAPublicKey](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/interfaces/RSAPublicKey.html>)
      * [XECPublicKey](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/interfaces/XECPublicKey.html>)

A Interface AsymmetricKey

A interface `AsymmetricKey` contém métodos que são comuns a uma chave pública ou a uma chave privada.

As Interfaces PublicKey e PrivateKey

As interfaces `PublicKey` e `PrivateKey` (que ambas estendem a interface `Key`) são interfaces sem métodos, usadas para segurança e identificação de tipo.

#### A Classe KeyPair

A classe `KeyPair` é um simples contêiner para um par de chaves (uma chave pública e uma chave privada).

Ela possui dois métodos públicos, um para retornar a chave privada e outro para retornar a chave pública:
```java
    PrivateKey getPrivate()
    PublicKey getPublic()
    
```

#### Interfaces e Classes de Especificação de Chave

Objetos `Key` e especificações de chave (`KeySpec`s) são duas representações diferentes de dados de chave. `Cipher`s usam objetos `Key` para inicializar seus algoritmos de criptografia, mas as chaves podem precisar ser convertidas para um formato mais portátil para transmissão ou armazenamento.

Uma representação transparente de chaves significa que você pode acessar cada valor de material de chave individualmente, através de um dos métodos `get` definidos na classe de especificação correspondente. Por exemplo, `DSAPrivateKeySpec` define os métodos `getX`, `getP`, `getQ` e `getG`, para acessar a chave privada `x`, e os parâmetros do algoritmo DSA usados para calcular a chave: o primo `p`, o sub-primo `q` e a base `g`. Se a chave for armazenada em um dispositivo de hardware, sua especificação pode conter informações que ajudam a identificar a chave no dispositivo.

Esta representação contrasta com uma representação opaca, conforme definida pela interface [Interfaces de Chave](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>), na qual você não tem acesso direto aos campos de material da chave. Em outras palavras, uma representação "opaca" lhe dá acesso limitado à chave — apenas os três métodos definidos pela interface `Key`: `getAlgorithm`, `getFormat` e `getEncoded`.

Uma chave pode ser especificada de forma dependente do algoritmo, ou em um formato de codificação independente do algoritmo (como ASN.1). Por exemplo, uma chave privada DSA pode ser especificada por seus componentes `x`, `p`, `q` e `g` (veja [`DSAPrivateKeySpec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/DSAPrivateKeySpec.html>)), ou pode ser especificada usando sua codificação DER (veja [`PKCS8EncodedKeySpec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/PKCS8EncodedKeySpec.html>)).

As classes `KeyFactory` e `SecretKeyFactory` podem ser usadas para converter entre representações de chave opacas e transparentes (ou seja, entre `Key`s e `KeySpec`s, assumindo que a operação seja possível. (Por exemplo, chaves privadas em smart cards podem não ser capazes de sair do cartão. Tais `Key`s não são conversíveis.)

Nas seções seguintes, discutiremos as interfaces e classes de especificação de chave no pacote `java.security.spec`.

##### A Interface KeySpec

Esta interface não contém métodos ou constantes. Seu único propósito é agrupar e fornecer segurança de tipo para todas as especificações de chave. Todas as especificações de chave devem implementar esta interface.

##### As Subinterfaces KeySpec

Assim como a interface `Key`, existe um conjunto similar de interfaces `KeySpec`.

  * [`SecretKeySpec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/spec/SecretKeySpec.html>)
  * [`EncodedKeySpec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/EncodedKeySpec.html>)
    * [`PKCS8EncodedKeySpec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/PKCS8EncodedKeySpec.html>)
    * [`X509EncodedKeySpec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/X509EncodedKeySpec.html>)
  * [`DESKeySpec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/spec/DESKeySpec.html>)
  * [`DESedeKeySpec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/spec/DESedeKeySpec.html>)
  * [`PBEKeySpec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/spec/PBEKeySpec.html>)
  * [`DHPrivateKeySpec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/spec/DHPrivateKeySpec.html>)
  * [`DSAPrivateKeySpec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/DSAPrivateKeySpec.html>)
  * [`ECPrivateKeySpec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/ECPrivateKeySpec.html>)
  * [`RSAPrivateKeySpec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/RSAPrivateKeySpec.html>)
    * [`RSAMultiPrimePrivateCrtKeySpec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/RSAMultiPrimePrivateCrtKeySpec.html>)
    * [`RSAPrivateCrtKeySpec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/RSAPrivateCrtKeySpec.html>)
  * [`DHPublicKeySpec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/spec/DHPublicKeySpec.html>)
  * [`DSAPublicKeySpec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/DSAPublicKeySpec.html>)
  * [`ECPublicKeySpec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/ECPublicKeySpec.html>)
  * [`RSAPublicKeySpec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/RSAPublicKeySpec.html>)

##### A Classe EncodedKeySpec

Esta classe abstrata (que implementa a interface [A Interface KeySpec](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)) representa uma chave pública ou privada em formato codificado. Seu método `getEncoded` retorna a chave codificada:
```java
    abstract byte[] getEncoded();
    
```

e seu método `getFormat` retorna o nome do formato de codificação:
```java
    abstract String getFormat();
    
```

Veja as próximas seções para as implementações concretas `PKCS8EncodedKeySpec` e `X509EncodedKeySpec`.

###### A Classe PKCS8EncodedKeySpec

Esta classe, que é uma subclasse de `EncodedKeySpec`, representa a codificação DER de uma chave privada, de acordo com o formato especificado no padrão PKCS8.

Seu método `getEncoded` retorna os bytes da chave, codificados de acordo com o padrão PKCS8. Seu método `getFormat` retorna a string "PKCS#8".

###### A Classe X509EncodedKeySpec

Esta classe, que é uma subclasse de `EncodedKeySpec`, representa a codificação DER de uma chave pública, de acordo com o formato especificado no padrão X.509.

Seu método `getEncoded` retorna os bytes da chave, codificados de acordo com o padrão X.509. Seu método `getFormat` retorna a string "X.509".

#### Geradores e Fábricas

Novatos em Java e nas APIs JCA em particular às vezes não compreendem a distinção entre geradores e fábricas.

Figura 2-11 Geradores e Fábricas

[Description of "Figure 2-11 Generators and Factories"](<#/>)

Geradores são usados para gerar objetos totalmente novos. Geradores podem ser inicializados de maneira dependente ou independente do algoritmo. Por exemplo, para criar um par de chaves Diffie-Hellman (DH), uma aplicação poderia especificar os valores P e G necessários, ou o gerador poderia simplesmente ser inicializado com o comprimento de chave apropriado, e o gerador selecionaria valores P e G apropriados. Em ambos os casos, o gerador produzirá chaves totalmente novas com base nos parâmetros.

Por outro lado, fábricas são usadas para converter dados de um tipo de objeto existente para outro. Por exemplo, uma aplicação pode ter disponíveis os componentes de uma chave privada DH e pode empacotá-los como uma [A Interface KeySpec](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>), mas precisa convertê-los em um objeto [PrivateKey](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) que pode ser usado por um objeto `KeyAgreement`, ou vice-versa. Ou eles podem ter o array de bytes de um certificado, mas precisam usar uma `CertificateFactory` para convertê-lo em um objeto `X509Certificate`. As aplicações usam objetos de fábrica para fazer a conversão.

##### A Classe KeyFactory

A classe `KeyFactory` é uma [Classes e Algoritmos de Engine](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) projetada para realizar conversões entre [Interfaces de Chave](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) criptográficas opacas e [Interfaces e Classes de Especificação de Chave](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) (representações transparentes do material de chave subjacente).

Figura 2-12 Classe KeyFactory

[Description of "Figure 2-12 KeyFactory Class"](<#/>)

As fábricas de chaves são bidirecionais. Elas permitem que você construa um objeto de chave opaca a partir de uma dada especificação de chave (material de chave), ou recupere o material de chave subjacente de um objeto de chave em um formato adequado.

Múltiplas especificações de chave compatíveis podem existir para a mesma chave. Por exemplo, uma chave pública DSA pode ser especificada por seus componentes `y`, `p`, `q` e `g` (veja `java.security.spec.DSAPublicKeySpec`), ou pode ser especificada usando sua codificação DER de acordo com o padrão X.509 (veja [A Classe X509EncodedKeySpec](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)).

Uma fábrica de chaves pode ser usada para traduzir entre especificações de chave compatíveis. A análise de chaves pode ser alcançada através da tradução entre especificações de chave compatíveis, por exemplo, quando você traduz de `X509EncodedKeySpec` para `DSAPublicKeySpec`, você basicamente analisa a chave codificada em seus componentes. Para um exemplo, veja o final da seção [Gerando/Verificando Assinaturas Usando Especificações de Chave e KeyFactory](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Criando um Objeto KeyFactory

Objetos `KeyFactory` são obtidos usando um dos métodos estáticos de fábrica `KeyFactory`getInstance(). Veja [Como as Implementações de Provedores São Solicitadas e Fornecidas](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Convertendo Entre uma Especificação de Chave e um Objeto de Chave

Se você tiver uma especificação de chave para uma chave pública, você pode obter um objeto `PublicKey` opaco a partir da especificação usando o método `generatePublic`:
```java
    PublicKey generatePublic(KeySpec keySpec)
    
```

Similarmente, se você tiver uma especificação de chave para uma chave privada, você pode obter um objeto `PrivateKey` opaco a partir da especificação usando o método `generatePrivate`:
```java
    PrivateKey generatePrivate(KeySpec keySpec)
    
```

Convertendo Entre um Objeto de Chave e uma Especificação de Chave

Se você tiver um objeto `Key`, você pode obter um objeto de especificação de chave correspondente chamando o método `getKeySpec`:
```java
    KeySpec getKeySpec(Key key, Class keySpec)
    
```

`keySpec` identifica a classe de especificação na qual o material da chave deve ser retornado. Poderia, por exemplo, ser `DSAPublicKeySpec.class`, para indicar que o material da chave deve ser retornado em uma instância da classe `DSAPublicKeySpec`. Veja [Gerando/Verificando Assinaturas Usando Especificações de Chave e KeyFactory](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

##### A Classe SecretKeyFactory

A classe `SecretKeyFactory` representa uma fábrica para chaves secretas. Ao contrário da classe `KeyFactory` (veja [A Classe KeyFactory](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)), um objeto `javax.crypto.SecretKeyFactory` opera apenas em chaves secretas (simétricas), enquanto um objeto `java.security.KeyFactory` processa os componentes de chave pública e privada de um par de chaves.

Figura 2-13 Classe SecretKeyFactory

[Description of "Figure 2-13 SecretKeyFactory Class"](<#/>)

As fábricas de chaves são usadas para converter [Interfaces de Chave](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) (chaves criptográficas opacas do tipo `java.security.Key`) em [Interfaces e Classes de Especificação de Chave](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) (representações transparentes do material de chave subjacente em um formato adequado), e vice-versa.

Objetos do tipo `java.security.Key`, dos quais `java.security.PublicKey`, `java.security.PrivateKey` e `javax.crypto.SecretKey` são subclasses, são objetos de chave opacos, porque você não pode dizer como eles são implementados. A implementação subjacente é dependente do provedor e pode ser baseada em software ou hardware. As fábricas de chaves permitem que os provedores forneçam suas próprias implementações de chaves criptográficas.

Por exemplo, se você tiver uma especificação de chave para uma chave pública Diffie-Hellman, consistindo no valor público `y`, no módulo primo `p` e na base `g`, e você alimentar a mesma especificação para fábricas de chaves Diffie-Hellman de diferentes provedores, os objetos `PublicKey` resultantes provavelmente terão implementações subjacentes diferentes.

Um provedor deve documentar as especificações de chave suportadas por sua fábrica de chaves secretas. Por exemplo, a `SecretKeyFactory` para chaves DES fornecida pelo provedor `SunJCE` suporta `DESKeySpec` como uma representação transparente de chaves DES, a `SecretKeyFactory` para chaves DES-EDE suporta `DESedeKeySpec` como uma representação transparente de chaves DES-EDE, e a `SecretKeyFactory` para PBE suporta `PBEKeySpec` como uma representação transparente da senha subjacente.

O seguinte é um exemplo de como usar uma `SecretKeyFactory` para converter dados de chave secreta em um objeto `SecretKey`, que pode ser usado para uma operação `Cipher` subsequente:
```java
        // Note the following bytes are not realistic secret key data
        // bytes but are simply supplied as an illustration of using data
        // bytes (key material) you already have to build a DESedeKeySpec.
    
        byte[] desEdeKeyData = getKeyData();
        DESedeKeySpec desEdeKeySpec = new DESedeKeySpec(desEdeKeyData);
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DESede");
        SecretKey secretKey = keyFactory.generateSecret(desEdeKeySpec);
    
```

Neste caso, a implementação subjacente de `SecretKey` é baseada no provedor de `KeyFactory`.

Uma maneira alternativa e independente de provedor de criar um objeto `SecretKey` funcionalmente equivalente a partir do mesmo material de chave é usar a classe `javax.crypto.spec.SecretKeySpec`, que implementa a interface `javax.crypto.SecretKey`:
```java
        byte[] aesKeyData = getKeyData();
        SecretKeySpec secretKey = new SecretKeySpec(aesKeyData, "AES");
```

Criando um Objeto SecretKeyFactory

Objetos `SecretKeyFactory` são obtidos usando um dos métodos estáticos de fábrica `SecretKeyFactory` getInstance(). Veja [Como as Implementações de Provedores São Solicitadas e Fornecidas](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Convertendo Entre uma Especificação de Chave e um Objeto de Chave Secreta

Se você tiver uma especificação de chave para uma chave secreta, você pode obter um objeto `SecretKey` opaco a partir da especificação usando o método `generateSecret`:
```java
    SecretKey generateSecret(KeySpec keySpec)
```

Convertendo Entre um Objeto de Chave Secreta e uma Especificação de Chave

Se você tiver um objeto `SecretKey`, você pode obter um objeto de especificação de chave correspondente chamando o método `getKeySpec`:
```java
    KeySpec getKeySpec(Key key, Class keySpec)
```

`keySpec` identifica a classe de especificação na qual o material da chave deve ser retornado. Poderia, por exemplo, ser `DESKeySpec.class`, para indicar que o material da chave deve ser retornado em uma instância da classe `DESKeySpec`.

##### A Classe KeyPairGenerator

A classe `KeyPairGenerator` é uma classe de engine (veja [Classes e Algoritmos de Engine](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)) usada para gerar pares de chaves públicas e privadas.

Figura 2-14 Classe KeyPairGenerator

[Description of "Figure 2-14 KeyPairGenerator Class"](<#/>)

Existem duas maneiras de gerar um par de chaves: de maneira independente do algoritmo e de maneira específica do algoritmo. A única diferença entre as duas é a inicialização do objeto.

Veja [Gerando um Par de Chaves](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) para exemplos de chamadas aos métodos de `KeyPairGenerator`.

Criando um KeyPairGenerator

Toda geração de par de chaves começa com um `KeyPairGenerator`. Objetos `KeyPairGenerator` são obtidos usando um dos métodos estáticos de fábrica `KeyPairGenerator` getInstance(). Veja [Como as Implementações de Provedores São Solicitadas e Fornecidas](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Inicializando um KeyPairGenerator

Um gerador de par de chaves para um algoritmo particular cria um par de chaves pública/privada que pode ser usado com este algoritmo. Ele também associa parâmetros específicos do algoritmo a cada uma das chaves geradas.

Um gerador de par de chaves precisa ser inicializado antes que possa gerar chaves. Na maioria dos casos, a inicialização independente do algoritmo é suficiente. Mas em outros casos, a inicialização específica do algoritmo pode ser usada.

Inicialização Independente do Algoritmo

Todos os geradores de par de chaves compartilham os conceitos de tamanho de chave (`keysize`) e uma fonte de aleatoriedade. O tamanho da chave é interpretado de forma diferente para diferentes algoritmos. Por exemplo, no caso do algoritmo DSA, o tamanho da chave corresponde ao comprimento do módulo. (Veja [Nomes de Algoritmos Padrão de Segurança Java](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html>) para informações sobre os tamanhos de chave para algoritmos específicos.)

Um método `initialize` aceita dois tipos de argumentos universalmente compartilhados:
```java
    void initialize(int keysize, SecureRandom random)
```

Outro método `initialize` aceita apenas um argumento `keysize`; ele usa uma fonte de aleatoriedade fornecida pelo sistema:
```java
    void initialize(int keysize)
```

Como nenhum outro parâmetro é especificado quando você chama esses métodos `initialize` independentes do algoritmo, cabe ao provedor decidir o que fazer com os parâmetros específicos do algoritmo (se houver) a serem associados a cada uma das chaves.

Se o algoritmo for um algoritmo "DSA", e o tamanho do módulo (`keysize`) for 512, 768, 1024, 2048 ou 3072, então o provedor `SUN` usa um conjunto de valores pré-calculados para os parâmetros `p`, `q` e `g`. Se o tamanho do módulo não for um desses valores, o provedor `SUN` cria um novo conjunto de parâmetros. Outros provedores podem ter conjuntos de parâmetros pré-calculados para mais do que apenas os três tamanhos de módulo mencionados anteriormente. Ainda outros podem não ter uma lista de parâmetros pré-calculados e, em vez disso, sempre criar novos conjuntos de parâmetros.

Inicialização Específica do Algoritmo

Para situações em que um conjunto de parâmetros específicos do algoritmo já existe (como "parâmetros da comunidade" em DSA), existem dois métodos `initialize` que possuem um argumento [A Interface AlgorithmParameterSpec](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>). Um também possui um argumento `SecureRandom`, enquanto a fonte de aleatoriedade é fornecida pelo sistema para o outro:
```java
    void initialize(AlgorithmParameterSpec params,
                    SecureRandom random)
    
    void initialize(AlgorithmParameterSpec params)
```

Veja [Gerando um Par de Chaves](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Gerando um Par de Chaves

O procedimento para gerar um par de chaves é sempre o mesmo, independentemente da inicialização (e do algoritmo). Você sempre chama o seguinte método de `KeyPairGenerator`:
```java
    KeyPair generateKeyPair()
```

Múltiplas chamadas a `generateKeyPair` produzirão pares de chaves diferentes.

##### A Classe KeyGenerator

Um gerador de chaves é usado para gerar chaves secretas para algoritmos simétricos.

Figura 2-15 A Classe KeyGenerator

[Description of "Figure 2-15 The KeyGenerator Class"](<#/>)

Criando um `KeyGenerator`

Objetos `KeyGenerator` são obtidos usando um dos métodos estáticos de fábrica `KeyGenerator` getInstance(). Veja [Como as Implementações de Provedores São Solicitadas e Fornecidas](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Inicializando um Objeto KeyGenerator

Um gerador de chaves para um algoritmo de chave simétrica particular cria uma chave simétrica que pode ser usada com esse algoritmo. Ele também associa parâmetros específicos do algoritmo (se houver) à chave gerada.

Existem duas maneiras de gerar uma chave: de maneira independente do algoritmo e de maneira específica do algoritmo. A única diferença entre as duas é a inicialização do objeto:

  * Inicialização Independente do Algoritmo

Todos os geradores de chaves compartilham os conceitos de tamanho de chave (`keysize`) e uma fonte de aleatoriedade. Existe um método `init` que aceita esses dois tipos de argumentos universalmente compartilhados. Há também um que aceita apenas um argumento `keysize` e usa uma fonte de aleatoriedade fornecida pelo sistema, e um que aceita apenas uma fonte de aleatoriedade:
```java
 public void init(SecureRandom random);
        
            public void init(int keysize);
        
            public void init(int keysize, SecureRandom random);
```

Como nenhum outro parâmetro é especificado quando você chama esses métodos `init` independentes do algoritmo, cabe ao provedor decidir o que fazer com os parâmetros específicos do algoritmo (se houver) a serem associados à chave gerada.
* Inicialização Específica do Algoritmo

Para situações em que um conjunto de parâmetros específicos do algoritmo já existe, há dois métodos `init` que possuem um argumento `AlgorithmParameterSpec`. Um também possui um argumento `SecureRandom`, enquanto a fonte de aleatoriedade é fornecida pelo sistema para o outro:
```java
 public void init(AlgorithmParameterSpec params);
        
            public void init(AlgorithmParameterSpec params, SecureRandom random);
```

Caso o cliente não inicialize explicitamente o KeyGenerator (através de uma chamada a um método `init`), cada provedor deve fornecer (e documentar) uma inicialização padrão.

Criando uma Chave

O método a seguir gera uma chave secreta:
```java
        public SecretKey generateKey();
```

#### A Classe KDF

A classe KDF fornece a funcionalidade de uma Função de Derivação de Chave (KDF), que usa entradas criptográficas para criar novo material de chave criptograficamente forte.

Para mais informações sobre a API de Função de Derivação de Chave, consulte [JEP 510](<https://openjdk.org/jeps/510>).

Essas entradas criptográficas incluem material de chave de entrada, um salt opcional e outros parâmetros dependendo da implementação da KDF. Para criar uma ou mais chaves, use este material, uma instância da classe KDF e um algoritmo criptográfico. Uma chave é representada como um objeto SecretKey com o algoritmo especificado ou como um array de bytes de dados brutos.

Com uma KDF, você pode criar chaves que são seguras e reproduzíveis por você e por outra parte que compartilhe o conhecimento das entradas. Derivar chaves com uma KDF é semelhante a fazer hash de senhas. Uma KDF usa um hash com chave juntamente com entropia adicional de suas outras entradas para extrair novo material de chave ou expandir valores de forma segura em um fluxo maior de material de chave.

O provedor SunJCE inclui implementações de KDF da Função de Derivação de Chave de Extração e Expansão Baseada em HMAC (HKDF), [RFC 5869](<https://www.rfc-editor.org/rfc/rfc5869>).

O Algoritmo HKDF

O algoritmo HKDF consiste em duas funções: HKDF-Extract e HKDF-Expand:

  * HKDF-Extract: Esta função recebe material de chave de entrada (IKM), como segredos compartilhados trocados através de um Diffie-Hellman key exchange, e um salt opcional, que é um valor aleatório. A função produz uma chave criptográfica chamada chave pseudoaleatória (PRK).
  * HKDF-Expand: Esta função recebe uma PRK e "info" e gera material de chave criptograficamente forte de um comprimento especificado. "Info" são dados específicos de um contexto ou aplicação que podem incluir, por exemplo, um número de protocolo, um identificador de algoritmo ou uma identidade de usuário. Ao variar o parâmetro info, você pode criar múltiplos materiais de chave que usam o mesmo IKM, mas estão vinculados a diferentes aplicações ou contextos.

Especifique os parâmetros do algoritmo HKDF através da interface HKDFParameterSpec, que estende a interface AlgorithmParameterSpec.

Usando a Classe KDF

A classe KDF possui duas operações fundamentais:

  * Instanciação e inicialização, que cria a KDF e a inicializa com os parâmetros apropriados.
  * Derivação, que aceita material de chave e outras entradas opcionais, bem como parâmetros para descrever a saída, e então gera a chave ou dados derivados.

Instanciando uma KDF e Inicializando Seus Parâmetros

Para inicializar uma KDF, chame um dos métodos `getInstance` da classe KDF e especifique o algoritmo de derivação de chave a ser usado e quaisquer outros parâmetros. O exemplo a seguir inicializa uma KDF com o algoritmo HKDF-SHA256:
```java
    KDF hkdf = KDF.getInstance("HKDF-SHA256");
```

Esses métodos `getInstance` instanciam uma instância de KDF e inicializam seu algoritmo. Consulte a seção [KDF Algorithms](<#/>) na especificação Java Security Standard Algorithm Names para obter informações sobre nomes de algoritmos KDF padrão.

Derivando uma Chave

A classe KDF define dois métodos para derivar chaves:

  * `deriveData(AlgorithmParameterSpec spec)` deriva uma chave usando os parâmetros especificados e a retorna como um array de bytes, que pode ser usado para entropia ou se o material da chave for necessário como um array de bytes.
  * `deriveKey(String alg, AlgorithmParameterSpec spec)` deriva uma chave usando os parâmetros especificados e a retorna como um objeto SecretKey com o algoritmo especificado.

Use o algoritmo HKDF para derivar chaves com esses dois métodos. Especifique os parâmetros para este algoritmo chamando métodos de `HKDFParameterSpec.Builder`. Inicialize um objeto Builder chamando `HKDFParameterSpec.ofExtract()`. Alternativamente, especifique os parâmetros para o algoritmo HKDF chamando métodos de `HKDFParameterSpec.Expand`. Inicialize um objeto Expand chamando `HKDFParameterSpec.expandOnly()`.

Após especificar os parâmetros para o algoritmo HKDF, chame um dos seguintes métodos:

  * `HKDFParameterSpec.Builder.thenExpand(byte[] info, int length)`: Cria um objeto `HKDFParameterSpec.ExtractThenExpand`, que contém os parâmetros necessários para executar as funções HKDF-Extract e HKDF-Expand.
  * `HKDFParameterSpec.Builder.extractOnly()`: Cria um objeto `HKDFParameterSpec.Extract`, que contém os parâmetros necessários para executar apenas a função HKDF-Extract.

Ambos `HKDFParameterSpec.ExtractThenExpand` e `HKDFParameterSpec.Extract` são subclasses de `HKDFParameterSpec`.

Derive uma chave, representada como um objeto SecretKey, chamando `KDF.deriveKey` com o algoritmo e a instância `HKDFParameterSpec`. Alternativamente, derive material de chave, representado como um array de bytes, chamando `KDF.deriveData` com a instância `HKDFParameterSpec`.

O exemplo a seguir cria uma SecretKey com o algoritmo de derivação de chave HKDF-SHA256 e o algoritmo criptográfico AES:
```java
    public SecretKey createKeyWithKDF(byte[] salt, byte[] initialKeyMaterial,
                                      byte[] info, int keyMaterialLength)
        throws NoSuchAlgorithmException, InvalidAlgorithmParameterException {
                
        KDF hkdf = KDF.getInstance("HKDF-SHA256"); 
        AlgorithmParameterSpec params =
            HKDFParameterSpec.ofExtract()
                             .addIKM(initialKeyMaterial)
                             .addSalt(salt)
                             .thenExpand(info, keyMaterialLength);
        return hkdf.deriveKey("AES", params);
    }
```

Implementando Provedores KDF

Para implementar um provedor KDF, estenda a classe abstrata `javax.crypto.KDFSpi`.

Alguns algoritmos KDF derivam múltiplas chaves criptográficas em uma única operação de derivação. Se você estiver implementando tal algoritmo, é recomendado que você forneça uma subclasse SecretKey com métodos que forneçam acesso a cada chave, ou retorne todas as chaves em um único array de bytes e documente como separá-las.

Consulte [Como Implementar um Provedor na Arquitetura de Criptografia Java](<#/doc/guides/security/howtoimplaprovider>).

#### A Classe KeyAgreement

Acordo de chave é um protocolo pelo qual 2 ou mais partes podem estabelecer as mesmas chaves criptográficas, sem precisar trocar nenhuma informação secreta.

Figura 2-16 A Classe KeyAgreement

[Descrição de "Figura 2-16 A Classe KeyAgreement"](<#/>)

Cada parte inicializa seu objeto de acordo de chave com sua chave privada e, em seguida, insere as chaves públicas para cada parte que participará da comunicação. Na maioria dos casos, há apenas duas partes, mas algoritmos como Diffie-Hellman permitem que múltiplas partes (3 ou mais) participem. Quando todas as chaves públicas tiverem sido inseridas, cada objeto `KeyAgreement` gerará (concordará sobre) a mesma chave.

A classe KeyAgreement fornece a funcionalidade de um protocolo de acordo de chave. As chaves envolvidas no estabelecimento de um segredo compartilhado são criadas por um dos geradores de chave (`KeyPairGenerator` ou `KeyGenerator`), uma `KeyFactory`, ou como resultado de uma fase intermediária do protocolo de acordo de chave.

Criando um Objeto KeyAgreement

Cada parte envolvida no acordo de chave deve criar um objeto KeyAgreement. Objetos `KeyAgreement` são obtidos usando um dos métodos de fábrica estáticos `getInstance()` de `KeyAgreement`. Consulte [Como as Implementações de Provedores São Solicitadas e Fornecidas](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Inicializando um Objeto KeyAgreement

Você inicializa um objeto KeyAgreement com suas informações privadas. No caso de Diffie-Hellman, você o inicializa com sua chave privada Diffie-Hellman. Informações adicionais de inicialização podem conter uma fonte de aleatoriedade e/ou um conjunto de parâmetros de algoritmo. Observe que, se o algoritmo de acordo de chave solicitado exigir a especificação de parâmetros de algoritmo, e apenas uma chave, mas nenhum parâmetro for fornecido para inicializar o objeto KeyAgreement, a chave deve conter os parâmetros de algoritmo necessários. (Por exemplo, o algoritmo Diffie-Hellman usa um módulo primo `p` e um gerador base `g` como seus parâmetros.)

Para inicializar um objeto KeyAgreement, chame um de seus métodos `init`:
```java
        public void init(Key key);
    
        public void init(Key key, SecureRandom random);
    
        public void init(Key key, AlgorithmParameterSpec params);
    
        public void init(Key key, AlgorithmParameterSpec params,
                         SecureRandom random);
    
```

Executando uma Fase de KeyAgreement

Todo protocolo de acordo de chave consiste em várias fases que precisam ser executadas por cada parte envolvida no acordo de chave.

Para executar a próxima fase no acordo de chave, chame o método `doPhase`:
```java
        public Key doPhase(Key key, boolean lastPhase);
    
```

O parâmetro `key` contém a chave a ser processada por essa fase. Na maioria dos casos, esta é a chave pública de uma das outras partes envolvidas no acordo de chave, ou uma chave intermediária que foi gerada por uma fase anterior. `doPhase` pode retornar uma chave intermediária que você pode ter que enviar às outras partes deste acordo de chave, para que elas possam processá-la em uma fase subsequente.

O parâmetro `lastPhase` especifica se a fase a ser executada é ou não a última no acordo de chave: Um valor `FALSE` indica que esta não é a última fase do acordo de chave (há mais fases a seguir), e um valor `TRUE` indica que esta é a última fase do acordo de chave e o acordo de chave está completo, ou seja, `generateSecret` pode ser chamado em seguida.

No exemplo de [Troca de Chaves Diffie-Hellman entre Duas Partes](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) , você chama `doPhase` uma vez, com `lastPhase` definido como `TRUE`. No exemplo de Diffie-Hellman entre três partes, você chama `doPhase` duas vezes: a primeira vez com `lastPhase` definido como `FALSE`, a segunda vez com `lastPhase` definido como `TRUE`.

Gerando o Segredo Compartilhado

Depois que cada parte executou todas as fases necessárias do acordo de chave, ela pode calcular o segredo compartilhado chamando um dos métodos `generateSecret`:
```java
        public byte[] generateSecret();
    
        public int generateSecret(byte[] sharedSecret, int offset);
    
        public SecretKey generateSecret(String algorithm);
    
```

#### Gerenciamento de Chaves

Um banco de dados chamado "keystore" pode ser usado para gerenciar um repositório de chaves e certificados. (Um certificado é uma declaração digitalmente assinada de uma entidade, afirmando que a chave pública de alguma outra entidade tem um valor particular.)

Localização do Keystore

O keystore do usuário é, por padrão, armazenado em um arquivo chamado `.keystore` no diretório home do usuário, conforme determinado pela propriedade de sistema `user.home`, cujo valor padrão depende do sistema operacional:

  * Linux e macOS: `/home/username/`
  * Windows: `C:\Users\username\`

É claro que os arquivos de keystore podem ser localizados conforme desejado. Em alguns ambientes, pode fazer sentido que existam múltiplos keystores. Por exemplo, um keystore pode conter as chaves privadas de um usuário, e outro pode conter certificados usados para estabelecer relações de confiança.

Além do keystore do usuário, o JDK também mantém um keystore em todo o sistema que é usado para armazenar certificados confiáveis de uma variedade de Autoridades Certificadoras (CA's). Esses certificados CA podem ser usados para ajudar a tomar decisões de confiança. Por exemplo, em SSL/TLS/DTLS, quando o provedor `SunJSSE` recebe certificados de um par remoto, o trustmanager padrão consultará um dos seguintes arquivos para determinar se a conexão deve ser confiável:

  * Linux e macOS: `<java-home>/lib/security/cacerts`
  * Windows: `<java-home>\lib\security\cacerts`

Em vez de usar o keystore `cacerts` de todo o sistema, as aplicações podem configurar e usar seus próprios keystores, ou até mesmo usar o keystore do usuário descrito anteriormente.

Implementação de Keystore

A classe `KeyStore` fornece interfaces bem definidas para acessar e modificar as informações em um keystore. É possível que existam múltiplas implementações concretas diferentes, onde cada implementação é para um tipo particular de keystore.

Atualmente, existem duas ferramentas de linha de comando que utilizam `KeyStore`: `keytool` e `jarsigner`. Como `KeyStore` é publicamente disponível, os usuários do JDK podem escrever aplicações de segurança adicionais que o utilizam.

As aplicações podem escolher diferentes tipos de implementações de keystore de diferentes provedores, usando o método de fábrica `getInstance` na classe `KeyStore`. Um tipo de keystore define o formato de armazenamento e dados das informações do keystore, e os algoritmos usados para proteger chaves privadas no keystore e a integridade do próprio keystore. Implementações de keystore de diferentes tipos não são compatíveis.

A implementação padrão de keystore é "pkcs12". Este é um keystore multiplataforma baseado no Padrão de Sintaxe de Troca de Informações Pessoais RSA PKCS12. Este padrão destina-se principalmente a armazenar ou transportar chaves privadas, certificados e segredos diversos de um usuário. Atributos arbitrários podem ser associados a entradas individuais em um keystore PKCS12.
```
    keystore.type=pkcs12
```

Para que ferramentas e outras aplicações usem uma implementação de keystore padrão diferente, você pode alterar essa linha para especificar um tipo diferente.

Algumas aplicações, como `keytool`, também permitem que você substitua o tipo de keystore padrão (via o parâmetro de linha de comando `-storetype`).

Nota:

As designações de tipo de keystore não diferenciam maiúsculas de minúsculas. Por exemplo, "jks" seria considerado o mesmo que "JKS".

PKCS12 é o tipo de keystore padrão e recomendado. No entanto, existem outros três tipos de keystores que vêm com a implementação do JDK.

  1. "jceks" é um formato de keystore proprietário alternativo a "jks" que usa Criptografia Baseada em Senha com Triple-DES.

A implementação "jceks" pode analisar e converter um arquivo de keystore "jks" para o formato "jceks". Você pode atualizar seu keystore do tipo "jks" para um keystore do tipo "jceks" alterando a senha de uma entrada de chave privada em seu keystore e especificando `"-storetype jceks"` como o tipo de keystore. Para aplicar a proteção de chave criptograficamente forte (ou mais forte) fornecida a uma chave privada chamada "signkey" em seu keystore padrão, use o seguinte comando, que solicitará as senhas antiga e nova da chave:
```
keytool -keypass -alias signkey -storetype jceks
```

Consulte [`keytool`](<#/>) em Java Development Kit Tool Specifications .
  2. "jks" é outra opção. Ele implementa o keystore como um arquivo, utilizando um tipo (formato) de keystore proprietário. Ele protege cada chave privada com sua própria senha individual, e também protege a integridade de todo o keystore com uma senha (possivelmente diferente).
  3. "dks" é um keystore de domínio. É uma coleção de keystores apresentados como um único keystore lógico. Os keystores que compõem um determinado domínio são especificados por dados de configuração cuja sintaxe é descrita em [`DomainLoadStoreParameter`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/DomainLoadStoreParameter.html>).

As implementações de keystore são baseadas em provedores. Se você deseja escrever suas próprias implementações de KeyStore, consulte [Como Implementar um Provedor na Arquitetura de Criptografia Java](<#/doc/guides/security/howtoimplaprovider>).

##### A Classe KeyStore

A classe `KeyStore` fornece interfaces bem definidas para acessar e modificar as informações em um keystore.

A classe `KeyStore` é uma [Classe e Algoritmos de Engine](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Figura 2-17 Classe KeyStore

[Descrição de "Figura 2-17 Classe KeyStore"](<#/>)

Esta classe representa uma coleção em memória de chaves e certificados. `KeyStore` gerencia dois tipos de entradas:

  * Entrada de Chave: Este tipo de entrada de keystore contém informações de chave criptográfica muito sensíveis, que devem ser protegidas contra acesso não autorizado. Tipicamente, uma chave armazenada neste tipo de entrada é uma chave secreta, ou uma chave privada acompanhada pela cadeia de certificados que autentica a chave pública correspondente.

Chaves privadas e cadeias de certificados são usadas por uma determinada entidade para autoautenticação usando assinaturas digitais. Por exemplo, organizações de distribuição de software assinam digitalmente arquivos JAR como parte do lançamento e/ou licenciamento de software.

  * Entrada de Certificado Confiável: Este tipo de entrada contém um único certificado de chave pública pertencente a outra parte. É chamado de certificado confiável porque o proprietário do keystore confia que a chave pública no certificado realmente pertence à identidade identificada pelo sujeito (proprietário) do certificado.

Este tipo de entrada pode ser usado para autenticar outras partes.

Cada entrada em um keystore é identificada por uma string "alias". No caso de chaves privadas e suas cadeias de certificados associadas, essas strings distinguem entre as diferentes formas pelas quais a entidade pode se autenticar. Por exemplo, a entidade pode se autenticar usando diferentes autoridades certificadoras, ou usando diferentes algoritmos de chave pública.

Se os keystores são persistentes, e os mecanismos usados pelo keystore se ele for persistente, não são especificados aqui. Esta convenção permite o uso de uma variedade de técnicas para proteger chaves sensíveis (por exemplo, privadas ou secretas). Cartões inteligentes ou outros motores criptográficos integrados (SafeKeyper) são uma opção, e mecanismos mais simples, como arquivos, também podem ser usados (em uma variedade de formatos).

O seguinte descreve os principais métodos de `KeyStore`.

Criando um Objeto KeyStore

Objetos KeyStore são obtidos usando um dos métodos `getInstance()` de KeyStore. Consulte [Como as Implementações de Provedores São Solicitadas e Fornecidas](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Carregando um Keystore Específico na Memória

Antes que um objeto `KeyStore` possa ser usado, os dados reais do keystore devem ser carregados na memória através do método `load`:
```java
    final void load(InputStream stream, char[] password)
```

A senha opcional é usada para verificar a integridade dos dados do keystore. Se nenhuma senha for fornecida, nenhuma verificação de integridade é realizada.

Para criar um keystore vazio, você passa `null` como argumento `InputStream` para o método `load`.

Um keystore DKS é carregado passando um [`DomainLoadStoreParameter`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/DomainLoadStoreParameter.html>) para o método `load` alternativo:
```java
    final void load(KeyStore.LoadStoreParameter param)
```

Obtendo uma Lista dos Aliases do Keystore

Todas as entradas do keystore são acessadas via aliases únicos. O método `aliases` retorna uma enumeração dos nomes de alias no keystore:
```java
    final Enumeration aliases()
```

Determinando Tipos de Entrada do Keystore

Conforme declarado na classe KeyStore, existem dois tipos diferentes de entradas em um keystore. Os métodos a seguir determinam se a entrada especificada pelo alias fornecido é uma entrada de chave/certificado ou uma entrada de certificado confiável, respectivamente:
```java
    final boolean isKeyEntry(String alias)
    final boolean isCertificateEntry(String alias)
```

Adicionando/Definindo/Excluindo Entradas do Keystore

O método `setCertificateEntry` atribui um certificado a um alias especificado:
```java
    final void setCertificateEntry(String alias, Certificate cert)
```

Se `alias` não existir, uma entrada de certificado confiável com esse alias é criada. Se `alias` existir e identificar uma entrada de certificado confiável, o certificado associado a ela é substituído por `cert`.

Os métodos `setKeyEntry` adicionam (se `alias` ainda não existir) ou definem entradas de chave:
```java
    final void setKeyEntry(String alias,
                           Key key,
                           char[] password,
                           Certificate[] chain)
    
    final void setKeyEntry(String alias,
                           byte[] key,
                           Certificate[] chain)
```

No método com `key` como um array de bytes, são os bytes para uma chave em formato protegido. Por exemplo, na implementação de keystore fornecida pelo provedor `SUN`, o array de bytes `key` é esperado para conter uma chave privada protegida, codificada como um `EncryptedPrivateKeyInfo` conforme definido no padrão PKCS8. No outro método, a `password` é a senha usada para proteger a chave.

O método `deleteEntry` exclui uma entrada:
```java
    final void deleteEntry(String alias)
```

Keystores PKCS #12 suportam entradas contendo atributos arbitrários. Use a classe [`PKCS12Attribute`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/PKCS12Attribute.html>) para criar os atributos. Ao criar a nova entrada do keystore, use um método construtor que aceite atributos. Finalmente, use o seguinte método para adicionar a entrada ao keystore:
```java
    final void setEntry(String alias, Entry entry, 
                        ProtectionParameter protParam)
```

Obtendo Informações do Keystore

O método `getKey` retorna a chave associada ao alias fornecido. A chave é recuperada usando a senha fornecida:
```java
    final Key getKey(String alias, char[] password)
```

Os métodos a seguir retornam o certificado, ou a cadeia de certificados, respectivamente, associados ao alias fornecido:
```java
    final Certificate getCertificate(String alias)
    final Certificate[] getCertificateChain(String alias)
```

Você pode determinar o nome (`alias`) da primeira entrada cujo certificado corresponde a um determinado certificado através do seguinte:
```java
    final String getCertificateAlias(Certificate cert)
```

Keystores PKCS #12 suportam entradas contendo atributos arbitrários. Use o seguinte método para recuperar uma entrada que pode conter atributos:
```java
    final Entry getEntry(String alias, ProtectionParameter protParam)
```

e então use o método [`KeyStore.Entry.getAttributes`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/KeyStore.Entry.html#getAttributes\(\)>) para extrair tais atributos e use os métodos da interface [`KeyStore.Entry.Attribute`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/KeyStore.Entry.Attribute.html>) para examiná-los.

Salvando o Keystore

O keystore em memória pode ser salvo através do método `store`:
```java
    final void store(OutputStream stream, char[] password)
```

A senha é usada para calcular um checksum de integridade dos dados do keystore, que é anexado aos dados do keystore.

Um keystore DKS é armazenado passando um [`DomainLoadStoreParameter`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/DomainLoadStoreParameter.html>) para o método `store` alternativo:
```java
    final void store(KeyStore.LoadStoreParameter param)
```

#### A Interface DEREncodable

Nota:

Esta é uma *preview feature*. Uma *preview feature* é um recurso cujo design, especificação e implementação estão completos, mas não é permanente. Uma *preview feature* pode existir em uma forma diferente ou não existir em futuras versões do Java SE. Para compilar e executar código que contém *preview features*, você deve especificar opções adicionais de linha de comando. Consulte [Recursos de Linguagem e VM em Preview](<#/>).

Para mais informações sobre a interface DEREncodable, as classes PEMEncoder e PEMDecoder, os métodos EncryptedPrivateKeyInfo.encryptKey e EncryptedPrivateKeyInfo.getKey, e a classe PEMRecord, todos os quais fazem parte da *preview feature* PEM Encodings of Cryptographic Objects, consulte [JEP 470](<https://openjdk.org/jeps/470>).

Se uma instância de uma classe ou interface JCA implementa ou estende a interface [DEREncodable](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/DEREncodable.html>), então você pode convertê-las de e para arrays de bytes no formato [Distinguished Encoding Rules (DER)](<https://en.wikipedia.org/wiki/X.690#DER_encoding>). DER é um formato de serialização (uma forma de converter uma estrutura de dados em bytes e vice-versa) para o formato Abstract Syntax Notation One (ASN.1), que é um formato de codificação padrão, independente de algoritmo, amplamente utilizado em criptografia.

A interface DEREncodable é `sealed` e permite as seguintes classes e interfaces:

  * [AsymmetricKey](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/AsymmetricKey.html>): Esta interface contém métodos que são comuns a uma chave pública ou a uma chave privada.
  * [EncryptedPrivateKeyInfo](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/EncryptedPrivateKeyInfo.html>): Esta classe implementa o tipo EncryptedPrivateKeyInfo conforme definido nos Padrões de Criptografia de Chave Pública (PKCS) #8. Você pode usar uma instância desta classe para descriptografar e produzir um objeto PrivateKey.
  * [KeyPair](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/KeyPair.html>): Esta classe é um simples contêiner para um par de chaves (uma chave pública e uma chave privada). Consulte [A Classe KeyPair](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).
  * [PEMRecord](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/PEMRecord.html>): Esta classe implementa a interface DEREncodable e representa dados Privacy-Enhanced Mail (PEM) por seu tipo e forma Base64. As classes PEMEncoder e PEMDecoder usam PEMRecord quando a representação dos dados como um objeto criptográfico não é desejada ou o tipo não possui DEREncodable.
  * [PKCS8EncodedKeySpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/PKCS8EncodedKeySpec.html>): Esta classe representa a codificação DER de uma chave privada de acordo com o formato especificado no padrão PKCS #8. Consulte [A Classe PKCS8EncodedKeySpec](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)."
  * [X509EncodedKeySpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/X509EncodedKeySpec.html>): Esta classe representa a codificação DER de uma chave pública ou privada, de acordo com o formato especificado no padrão X.509. Consulte [A Classe X509EncodedKeySpec](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)."
  * [X509Certificate](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/cert/X509Certificate.html>): Esta classe abstrata fornece uma maneira padrão de acessar os atributos de certificados X.509. Consulte [Classe X509Certificate](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)."
  * [X509CRL](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/cert/X509CRL.html>): Esta é uma classe abstrata para uma Lista de Revogação de Certificados (CRL) X.509. Consulte [A Classe CertificateFactory](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)."

Embora muitos padrões de criptografia usem DER para serializar objetos criptográficos, alguns sistemas suportam apenas ASCII ao enviar e receber dados. Esses sistemas tipicamente usam o formato de transporte Privacy-Enhanced Mail (PEM), um formato textual para dados binários. Uma instância de uma classe que implementa a interface DEREncodable pode ser codificada para e decodificada do formato PEM com as classes [PEMEncoder](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/PEMEncoder.html>) e [PEMDecoder](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/PEMDecoder.html>).

##### O Formato de Transporte Privacy-Enhanced Mail (PEM)

O formato de transporte Privacy-Enhanced Mail (PEM) é um formato textual para dados binários. Aplicações frequentemente usam este formato para enviar e receber representações de objetos criptográficos porque alguns sistemas, como e-mail, suportam apenas ASCII.

Muitos padrões de criptografia usam DER para serializar objetos criptográficos. Instâncias de classes que implementam a interface DEREncodable podem ser codificadas neste formato. No entanto, como este é um formato binário, este formato é frequentemente codificado para, e decodificado de, o formato PEM.

A seguir estão exemplos de como o formato PEM é usado:

  * Autoridades certificadoras emitem cadeias de certificados no formato PEM.
  * Bibliotecas criptográficas como OpenSSL fornecem operações para gerar e converter objetos criptográficos codificados em PEM.
  * Aplicações sensíveis à segurança, como OpenSSH, armazenam chaves de comunicação no formato PEM.
  * Dispositivos de autenticação de hardware como Yubikeys ingerem e dispensam objetos criptográficos codificados em PEM.

Para codificar para e decodificar do formato PEM, use as classes [PEMEncoder](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/PEMEncoder.html>) e [PEMDecoder](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/PEMDecoder.html>).

##### A Classe PEMEncoder

Use uma instância da classe [PEMEncoder](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/PEMEncoder.html>) para codificar um objeto [DEREncodable](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/DEREncodable.html>) para o formato PEM.

O exemplo a seguir codifica uma PrivateKey para um array de bytes formatado em PEM:
```java
    byte[] encodePrivateKeyToPEM(PrivateKey privateKey) {
        PEMEncoder pe = PEMEncoder.of();
        return pe.encode(privateKey);
    }
```

Você pode reutilizar a instância de PEMEncoder retornada pelo método de fábrica `PEMEncoder.of()`.

O exemplo a seguir codifica uma PrivateKey para uma string formatada em PEM:
```java
    String encodePrivateKeyToString(PEMEncoder pe, PrivateKey privateKey) {
        return pe.encodeToString(privateKey);
    }
```

O exemplo a seguir codifica um par de chaves pública/privada em uma string:
```java
    String encodeKeyPairToString(PEMEncoder pe, PublicKey pub, PrivateKey priv) {
        return pe.encodeToString(new KeyPair(pub, priv));
    }
```

Se você estiver codificando uma PrivateKey, então você pode criptografá-la (consulte “Textual Encoding of PKCS #8 Encrypted Private Key Info” em [RFC 7468, “Textual Encodings of PKIX, PKCS, and CMS Structures](<https://www.rfc-editor.org/info/rfc7468>)) com o método `PEMEncoder.withEncryption(char[])`, que recebe uma senha e retorna uma nova instância imutável de PEMEncoder configurada para criptografar a chave com essa senha. O exemplo a seguir consiste em dois métodos. O primeiro método, `encryptEPMEncoder`, retorna um PEMEncoder configurado para criptografar uma chave com a senha fornecida. O segundo método, `decodePrivateKeyWithPasswrd`, descriptografa a PrivateKey que foi codificada por `encryptEPMEncoder`:
```java
    PEMEncoder encryptedPEMEncoder(String password) {
        return PEMEncoder.of().withEncryption(password.toCharArray());
    }
        
    PrivateKey decodePrivateKeyWithPassword(
        String encryptedPrivateKey, String password) {
        return (PrivateKey) PEMDecoder.of()
            .withDecryption(password.toCharArray())
            .decode(encryptedPrivateKey);
    }
```

O método PEMDecoder.decode(String) lança uma IllegalArgumentException se houver um erro de decodificação ou se os dados PEM não forem suportados. Consulte [A Classe PEMDecoder](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) para mais informações sobre a decodificação de objetos formatados em PEM.

##### A Classe PEMDecoder

Use uma instância da classe [PEMDecoder](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/PEMDecoder.html>) para decodificar um objeto [DEREncodable](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/DEREncodable.html>) a partir de dados formatados em PEM:
```java
    DEREncodable der = PEMDecoder.of().decode(pem);
```

Você pode reutilizar a instância de PEMDecoder retornada pelo método de fábrica PEMDecoder.of().

Você pode determinar o tipo de um `DEREncodable` com pattern matching usando `instanceof` ou `switch`; consulte [Pattern Matching](<#/>) em Java Platform, Standard Edition Java Language Updates:
```java
    PEMDecoder pd = PEMDecoder.of();
    switch (pd.decode(pem)) {
        case PublicKey publicKey -> ...;
        case PrivateKey privateKey -> ...;
        default -> throw new IllegalArgumentException(...);
    }
```

Se você souber o tipo do `DEREncodable`, pode especificá-lo como um argumento para PEMDecoder.decode(InputStream, Class) ou PEMDecoder.decode(String, Class), por exemplo:
```java
    RSAPrivateKey decodedRSAPrivateKey = pd.decode(privateKeyPEM, RSAPrivateKey.class);
```

Conforme mencionado em [A Classe PEMEncoder](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>), se você estiver codificando uma PrivateKey, então pode criptografá-la com o método PEMEncoder.withEncryption(char[]), que recebe uma senha e retorna uma nova instância imutável de PEMEncoder configurada para criptografar a chave com essa senha. Você pode então descriptografá-la com o método PEMDecoder.withDecryption(char[]), que recebe uma senha e retorna um novo PEMDecoder imutável configurado para criptografar a chave com essa senha. Por exemplo:
```java
    PrivateKey decodePrivateKeyWithPassword(
        String encryptedPrivateKey, String password) {
        return (PrivateKey) PEMDecoder.of()
            .withDecryption(password.toCharArray())
            .decode(encryptedPrivateKey);
    }
```

Em vez de fazer um cast do resultado de decode para o tipo de dado esperado, você pode especificá-lo como um argumento:
```java
    RSAPrivateKey decodeRSAPrivateKeyWithPassword(
        String encryptedPrivateKey, String password) {
        return PEMDecoder.of()
            .withDecryption(password.toCharArray())
            .decode(encryptedPrivateKey, RSAPrivateKey.class);
    }
```

Às vezes, você pode precisar de um provedor criptográfico específico para decodificar dados formatados em PEM. Você pode chamar o método PEMDecoder.withFactory(Provider), que retorna uma nova instância de PEMDecoder que usa o provedor especificado para produzir objetos criptográficos. O exemplo a seguir decodifica um Certificate com um provedor hipotético chamado `org.example.MyProvider` (que é criado chamando seu construtor, `MyProvider()`):
```java
    // Dynamically register the org.example.MyProvider provider
    Security.addProvider(new MyProvider());
    // Create a PEMDecoder that uses MyProvider 
    PEMDecoder d = pd.withFactory(Security.getProvider("MyProvider"));
    // Decode the Certificate
    Certificate c = d.decode(pem, X509Certificate.class);
```

##### A Classe EncryptedPrivateKeyInfo

A classe [EncryptedPrivateKeyInfo](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/EncryptedPrivateKeyInfo.html>) representa uma chave privada criptografada.

O método estático EncryptedPrivateKeyInfo.encryptKey(PrivateKey key, char[] password) criptografa a `PrivateKey` fornecida com a senha fornecida.

Com o método estático EncryptedPrivateKeyInfo.encryptKey(PrivateKey key, char[] password, String algorithm, AlgorithmParameterSpec params, Provider p) você pode especificar qual algoritmo de criptografia baseada em senha (PBE) e parâmetros associados usar para criptografar a `PrivateKey`. Consulte [Cipher Algorithms](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html#cipher-algorithms>) em Java Security Standard Algorithm Names para informações sobre o formato da string do algoritmo PBE. Consulte [O Provedor SunJCE](<#/doc/guides/security/oracle-providers> "Conforme descrito brevemente em O Provedor SUN, as regulamentações de exportação dos EUA na época restringiam o tipo de funcionalidade criptográfica que poderia estar disponível no JDK. Uma API separada e uma implementação de referência foram desenvolvidas que permitiam que os aplicativos criptografassem/descriptografassem dados. A Java Cryptographic Extension \(JCE\) foi lançada como um "Pacote Opcional" separado \(também brevemente conhecido como "Extensão Padrão"\), e estava disponível para JDK 1.2x e 1.3x. Durante o desenvolvimento do JDK 1.4, as regulamentações foram relaxadas o suficiente para que o JCE \(e o SunJSSE\) pudessem ser empacotados como parte do JDK.") para uma lista de algoritmos PBE suportados pelo provedor SunJCE. Consulte [Interfaces e Classes de Especificação de Parâmetros de Algoritmo](<#/doc/guides/security/howtoimplaprovider>) para informações sobre como especificar parâmetros criptográficos, incluindo aqueles para a classe [PBEParameterSpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/spec/PBEParameterSpec.html>). Consulte [Usando Criptografia Baseada em Senha](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) para um exemplo que usa a classe [PBEParameterSpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/spec/PBEParameterSpec.html>).

O exemplo a seguir criptografa uma chave privada com EncryptedPrivateKeyInfo.encryptKey, então usa a instância EncryptedPrivateKeyInfo retornada para codificá-la em texto formatado em PEM:
```java
    String password = ...;
    var epki = EncryptedPrivateKeyInfo.encryptKey(privateKey, password.toCharArray());
    String pemEncyptedPrivateKey = PEMEncoder.of().encodeToString(epki);
```

Os métodos PrivateKey.getKey descriptografam a chave privada em uma instância de EncryptedPrivateKeyInfo. O exemplo a seguir descriptografa uma PrivateKey formatada em PEM, então usa a instância EncryptedPrivateKeyInfo retornada para decodificá-la em uma PrivateKey:
```java
    EncryptedPrivateKeyInfo epkiDecoded =
        PEMDecoder.of().decode(pemEncyptedPrivateKey, EncryptedPrivateKeyInfo.class);
    PrivateKey key = epkiDecoded.getKey(password.toCharArray());
```

Nota:

O algoritmo de criptografia baseada em senha (PBE) padrão usado ao criptografar uma PrivateKey com PEMEncoder ou EncryptedPrivateKeyInfo é definido no arquivo de propriedades de segurança mestre padrão (consulte [O Arquivo de Propriedades de Segurança](<#/doc/guides/security/security-properties-file>)) na propriedade de segurança `jdk.epkcs8.defaultAlgorithm`. O algoritmo padrão pode mudar no futuro, mas isso não afetará o texto PEM criado agora porque os dados codificados nesse texto contêm o nome do algoritmo e todos os outros parâmetros necessários para a descriptografia.

##### A Classe PEMRecord

Use a classe [PEMRecord](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/PEMRecord.html>), que implementa a interface DEREncodable, para codificar e decodificar textos PEM que representam objetos criptográficos para os quais não existe uma API da Plataforma Java, por exemplo, solicitações de certificação PKCS #10.

Uma instância de PEMDecoder decodifica texto PEM em um objeto PEMRecord quando não há uma API da Plataforma Java para o tipo do texto PEM. O exemplo a seguir decodifica texto PEM armazenado em um arquivo, mas lança uma IllegalArgumentException se o tipo do texto PEM for PEMRecord:
```java
    DEREncodable decodeFile(File f) throws IOException, IllegalArgumentException {
        DEREncodable d = null;
        try (InputStream is = new FileInputStream(f)) {
            d = PEMDecoder.of().decode(is);
            if (d instanceof PEMRecord pr) {
                throw new IllegalArgumentException(
                    "Unhandled PEM type: " + pr.type()
                    + "\nData: " + pr.pem());
            }
        }
        return d;            
    }
```

Se você quiser acessar os dados iniciais de um texto PEM ou manipular o conteúdo do texto PEM por conta própria, então você pode solicitar especificamente um PEMRecord ao decodificar:
```java
    PEMRecord pr = PEMDecoder.of().decode(pem, PEMRecord.class);
```

Uma instância de PEMEncoder codifica um objeto PEMRecord em texto PEM sem validar seu conteúdo.

#### Classes de Parâmetros de Algoritmo

Assim como `Key`s e `Keyspec`s, os parâmetros de inicialização de um algoritmo são representados por `AlgorithmParameter`s ou `AlgorithmParameterSpec`s.

Dependendo da situação de uso, os algoritmos podem usar os parâmetros diretamente, ou os parâmetros podem precisar ser convertidos em um formato mais portátil para transmissão ou armazenamento.

Uma representação transparente de um conjunto de parâmetros (através de `AlgorithmParameterSpec`) significa que você pode acessar cada valor de parâmetro no conjunto individualmente. Você pode acessar esses valores através de um dos métodos `get` definidos na classe de especificação correspondente (por exemplo, `DSAParameterSpec` define os métodos `getP`, `getQ` e `getG`, para acessar `p`, `q` e `g`, respectivamente).

Em contraste, a classe AlgorithmParameters fornece uma representação opaca, na qual você não tem acesso direto aos campos de parâmetro. Você só pode obter o nome do algoritmo associado ao conjunto de parâmetros (através de `getAlgorithm`) e algum tipo de codificação para o conjunto de parâmetros (através de `getEncoded`).

##### A Interface AlgorithmParameterSpec

`AlgorithmParameterSpec` é uma interface para uma especificação transparente de parâmetros criptográficos. Esta interface não contém métodos ou constantes. Seu único propósito é agrupar (e fornecer segurança de tipo para) todas as especificações de parâmetros. Todas as especificações de parâmetros devem implementar esta interface.

A seguir estão as interfaces e classes de especificação de parâmetros de algoritmo nos pacotes `java.security.spec` e `javax.crypto.spec`:

  * [DHParameterSpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/spec/DHParameterSpec.html>)
  * [DHGenParameterSpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/spec/DHGenParameterSpec.html>)
  * [DSAParameterSpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/DSAParameterSpec.html>)
  * [ECGenParameterSpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/ECGenParameterSpec.html>)
  * [ECParameterSpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/ECParameterSpec.html>)
  * [GCMParameterSpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/spec/GCMParameterSpec.html>)
  * [HKDFParameterSpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/spec/HKDFParameterSpec.html>)
  * [IvParameterSpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/spec/IvParameterSpec.html>)
  * [MGF1ParameterSpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/MGF1ParameterSpec.html>)
  * [OAEPParameterSpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/spec/OAEPParameterSpec.html>)
  * [OAEPParameterSpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/spec/OAEPParameterSpec.html>)
  * [PSSParameterSpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/PSSParameterSpec.html>)
  * [RC2ParameterSpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/spec/RC2ParameterSpec.html>)
  * [RC5ParameterSpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/spec/RC5ParameterSpec.html>)
  * [RSAKeyGenParameterSpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/RSAKeyGenParameterSpec.html>)

##### A Classe AlgorithmParameters

A classe `AlgorithmParameters` é uma classe de motor que fornece uma representação opaca de parâmetros criptográficos. Você pode inicializar a classe `AlgorithmParameters` usando um objeto `AlgorithmParameterSpec` específico, ou codificando os parâmetros em um formato reconhecido. Você pode recuperar a especificação resultante com o método getParameterSpec.

Criando um Objeto AlgorithmParameters

Objetos `AlgorithmParameters` são obtidos usando um dos métodos de fábrica estáticos `AlgorithmParameters` getInstance(). Para mais informações, consulte [Como as Implementações de Provedores são Solicitadas e Fornecidas](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Inicializando um Objeto AlgorithmParameters

Uma vez que um objeto `AlgorithmParameters` é instanciado, ele deve ser inicializado através de uma chamada para `init`, usando uma especificação de parâmetro apropriada ou codificação de parâmetro:
```java
    void init(AlgorithmParameterSpec paramSpec)
    void init(byte[] params)
    void init(byte[] params, String format)
```

Nestes métodos `init`, `params` é um array contendo os parâmetros codificados, e `format` é o nome do formato de decodificação. No método `init` com um argumento `params` mas sem argumento `format`, o formato de decodificação primário para parâmetros é usado. O formato de decodificação primário é ASN.1, se existir uma especificação ASN.1 para os parâmetros.

Obtendo os Parâmetros Codificados

Uma codificação de bytes dos parâmetros representados em um objeto `AlgorithmParameters` pode ser obtida através de uma chamada para `getEncoded`:
```java
    byte[] getEncoded()
```

Este método retorna os parâmetros em seu formato de codificação primário. O formato de codificação primário para parâmetros é ASN.1, se existir uma especificação ASN.1 para este tipo de parâmetros.

Se você quiser que os parâmetros sejam retornados em um formato de codificação especificado, use
```java
    byte[] getEncoded(String format)
```

Se `format` for null, o formato de codificação primário para parâmetros é usado, como no outro método getEncoded.

Convertendo um Objeto AlgorithmParameters para uma Especificação Transparente

Uma especificação de parâmetro transparente para os parâmetros do algoritmo pode ser obtida de um objeto `AlgorithmParameters` através de uma chamada para `getParameterSpec`:
```java
    AlgorithmParameterSpec getParameterSpec(Class paramSpec)
```

`paramSpec` identifica a classe de especificação na qual os parâmetros devem ser retornados. A classe de especificação poderia ser, por exemplo, `DSAParameterSpec.class` para indicar que os parâmetros devem ser retornados em uma instância da classe `DSAParameterSpec`. (Esta classe está no pacote `java.security.spec`.)

##### A Classe AlgorithmParameterGenerator

A classe `AlgorithmParameterGenerator` é uma [Classe de Motor e Algoritmos](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) usada para gerar um conjunto de parâmetros totalmente novos adequados para um determinado algoritmo (o algoritmo é especificado quando uma instância de `AlgorithmParameterGenerator` é criada). Este objeto é usado quando você não tem um conjunto existente de parâmetros de algoritmo e deseja gerar um do zero.

Criando um Objeto AlgorithmParameterGenerator

Objetos `AlgorithmParameterGenerator` são obtidos usando um dos métodos de fábrica estáticos `AlgorithmParameterGenerator` getInstance(). Consulte [Como as Implementações de Provedores são Solicitadas e Fornecidas](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Inicializando um Objeto AlgorithmParameterGenerator

O objeto `AlgorithmParameterGenerator` pode ser inicializado de duas maneiras diferentes: de forma independente do algoritmo ou de forma específica do algoritmo.

A abordagem independente do algoritmo usa o fato de que todos os geradores de parâmetros compartilham o conceito de "tamanho" e uma fonte de aleatoriedade. A medida de tamanho é universalmente compartilhada por todos os parâmetros de algoritmo, embora seja interpretada de forma diferente para algoritmos diferentes. Por exemplo, no caso de parâmetros para o algoritmo DSA, "tamanho" corresponde ao tamanho do módulo primo, em bits. (Consulte [Nomes de Algoritmos Padrão de Segurança Java](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html>) para saber mais sobre os tamanhos para algoritmos específicos.) Ao usar esta abordagem, os valores de geração de parâmetros específicos do algoritmo — se houver — assumem alguns valores padrão. Um método `init` que recebe esses dois tipos de argumentos universalmente compartilhados:
```java
    void init(int size, SecureRandom random);
    
```

Outro método `init` recebe apenas um argumento `size` e usa uma fonte de aleatoriedade fornecida pelo sistema:
```java
    void init(int size)
    
```

Uma terceira abordagem inicializa um objeto gerador de parâmetros usando semânticas específicas do algoritmo, que são representadas por um conjunto de valores de geração de parâmetros específicos do algoritmo fornecidos em um objeto `AlgorithmParameterSpec`:
```java
    void init(AlgorithmParameterSpec genParamSpec,
                              SecureRandom random)
    
    void init(AlgorithmParameterSpec genParamSpec)
    
```

Para gerar parâmetros de sistema Diffie-Hellman, por exemplo, os valores de geração de parâmetros geralmente consistem no tamanho do módulo primo e no tamanho do expoente aleatório, ambos especificados em número de bits.

Gerando Parâmetros de Algoritmo

Uma vez que você tenha criado e inicializado um objeto AlgorithmParameterGenerator, você pode usar o método generateParameters para gerar os parâmetros do algoritmo:

`AlgorithmParameters generateParameters()`

#### A Classe CertificateFactory

A classe `CertificateFactory` define a funcionalidade de uma fábrica de certificados, que é usada para gerar objetos de certificado e lista de revogação de certificados (CRL) a partir de sua codificação.

A classe `CertificateFactory` é uma [Classe de Motor e Algoritmos](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Uma fábrica de certificados para X.509 deve retornar certificados que são uma instância de `java.security.cert.X509Certificate`, e CRLs que são uma instância de `java.security.cert.X509CRL`.

Criando um Objeto CertificateFactory

Objetos `CertificateFactory` são obtidos usando um dos métodos de fábrica estáticos `getInstance()`. Para mais informações, consulte [Como as Implementações de Provedores são Solicitadas e Fornecidas](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Gerando Objetos de Certificado

Para gerar um objeto de certificado e inicializá-lo com os dados lidos de um fluxo de entrada, use o método `generateCertificate`:
```java
    final Certificate generateCertificate(InputStream inStream)
    
```

Para retornar uma visualização de coleção (possivelmente vazia) dos certificados lidos de um determinado fluxo de entrada, use o método `generateCertificates`:
```java
    final Collection generateCertificates(InputStream inStream)
    
```

Gerando Objetos CRL

Para gerar um objeto de lista de revogação de certificados (CRL) e inicializá-lo com os dados lidos de um fluxo de entrada, use o método `generateCRL`:
```java
    final CRL generateCRL(InputStream inStream)
    
```

Para retornar uma visualização de coleção (possivelmente vazia) das CRLs lidas de um determinado fluxo de entrada, use o método `generateCRLs`:
```java
    final Collection generateCRLs(InputStream inStream)
    
```

Gerando Objetos CertPath

O construtor e validador de caminho de certificado para PKIX é definido pelo Perfil de Certificado e CRL da Infraestrutura de Chave Pública X.509 da Internet, [RFC 5280](<http://www.ietf.org/rfc/rfc5280.txt>).

Uma implementação de armazenamento de certificados para recuperar certificados e CRLs de diretórios Collection e LDAP, usando o Esquema PKIX LDAP V2, também está disponível no IETF como [RFC 2587](<http://www.ietf.org/rfc/rfc2587.txt>).

Para gerar um objeto `CertPath` e inicializá-lo com dados lidos de um fluxo de entrada, use um dos seguintes métodos `generateCertPath` (com ou sem especificar a codificação a ser usada para os dados):
```java
    final CertPath generateCertPath(InputStream inStream)
    
    final CertPath generateCertPath(InputStream inStream,
                                    String encoding)
    
```

Para gerar um objeto `CertPath` e inicializá-lo com uma lista de certificados, use o seguinte método:
```java
    final CertPath generateCertPath(List certificates)
    
```

Para recuperar uma lista das codificações `CertPath` suportadas por esta fábrica de certificados, você pode chamar o método `getCertPathEncodings`:
```java
    final Iterator getCertPathEncodings()
    
```

A codificação padrão será listada primeiro.

### Nomes Padrão

O documento Nomes Padrão contém informações sobre as especificações de algoritmo.

[Nomes de Algoritmos Padrão de Segurança Java](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html>) descreve os nomes padrão para algoritmos, tipos de certificado e keystore que a API de Segurança do JDK exige e usa. Ele também contém mais informações sobre as especificações de algoritmo. Informações específicas do provedor podem ser encontradas em [Documentação dos Provedores do JDK](<#/doc/guides/security/oracle-providers>).

As implementações criptográficas no JDK são distribuídas através de vários provedores diferentes principalmente por razões históricas (`Sun`, `SunJSSE`, `SunJCE`, `SunRsaSign`). Note que esses provedores podem não estar disponíveis em todas as implementações do JDK e, portanto, aplicativos verdadeiramente portáteis devem chamar getInstance() sem especificar provedores específicos. Aplicativos que especificam um provedor particular podem não ser capazes de aproveitar os provedores nativos ajustados para um ambiente operacional subjacente (como PKCS ou CAPI da Microsoft).

O provedor `SunPKCS11` em si não contém nenhum algoritmo criptográfico, mas, em vez disso, direciona as solicitações para uma implementação PKCS11 subjacente. Consulte o [Guia de Referência PKCS#11](<#/doc/guides/security/pkcs11-reference-guide1>) e a implementação PKCS11 subjacente para determinar se um algoritmo desejado estará disponível através do provedor PKCS11. Da mesma forma, em sistemas Windows, o provedor `SunMSCAPI` não fornece nenhuma funcionalidade criptográfica, mas, em vez disso, roteia as solicitações para o sistema operacional subjacente para tratamento.

### Como o JCA Pode Ser Usado em uma Implementação SSL/TLS

Com uma compreensão das classes JCA, considere como essas classes podem ser combinadas para implementar um protocolo de rede avançado como SSL/TLS.

A seção Visão Geral de SSL/TLS nos [Protocolos TLS e DTLS](<#/doc/guides/security/java-security-overview1>) descreve em alto nível como os protocolos funcionam. Como as operações de cifra assimétrica (chave pública) são muito mais lentas do que as operações simétricas (chave secreta), a criptografia de chave pública é usada para estabelecer chaves secretas que são então usadas para proteger os dados reais do aplicativo. De forma muito simplificada, o handshake SSL/TLS envolve a troca de dados de inicialização, a realização de algumas operações de chave pública para chegar a uma chave secreta e, em seguida, o uso dessa chave para criptografar o tráfego futuro.

Nota:

Os detalhes apresentados aqui simplesmente mostram como algumas dessas classes podem ser empregadas. Esta seção não apresentará informações suficientes para construir uma implementação SSL/TLS. Para mais informações, consulte [Guia de Referência da Java Secure Socket Extension (JSSE)](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) e [RFC 5246: The Transport Layer Security (TLS) Protocol, Version 1.2](<https://tools.ietf.org/html/rfc5246>).

Suponha que esta implementação SSL/TLS será disponibilizada como um provedor JSSE. Uma implementação concreta da classe `Provider` é escrita primeiro e será eventualmente registrada na lista de provedores da classe `Security`. Este provedor principalmente fornece um mapeamento de nomes de algoritmos para classes de implementação reais. (ou seja: "SSLContext.TLS"->"com.foo.TLSImpl") Quando um aplicativo solicita uma instância "TLS" (via `SSLContext.getInstance("TLS")`), a lista do provedor é consultada para o algoritmo solicitado, e uma instância apropriada é criada.

Antes de discutir os detalhes do handshake real, é necessária uma rápida revisão da arquitetura do JSSE. O coração da arquitetura JSSE é o `SSLContext`. O contexto eventualmente cria objetos finais (`SSLSocket` e `SSLEngine`) que realmente implementam o protocolo SSL/TLS. Os `SSLContext`s são inicializados com duas classes de callback, `KeyManager` e `TrustManager`, que permitem que os aplicativos primeiro selecionem o material de autenticação a ser enviado e, segundo, verifiquem as credenciais enviadas por um par.

Um `KeyManager` do JSSE é responsável por escolher quais credenciais apresentar a um par. Muitos algoritmos são possíveis, mas uma estratégia comum é manter um par de chaves públicas/privadas RSA ou DSA junto com um `X509Certificate` em um `KeyStore` apoiado por um arquivo em disco. Quando um objeto `KeyStore` é inicializado e carregado do arquivo, os bytes brutos do arquivo são convertidos em objetos `PublicKey` e `PrivateKey` usando um `KeyFactory`, e os bytes de uma cadeia de certificados são convertidos usando um `CertificateFactory`. Quando uma credencial é necessária, o `KeyManager` simplesmente consulta este objeto `KeyStore` e determina quais credenciais apresentar.

O conteúdo de um `KeyStore` pode ter sido originalmente criado usando um utilitário como `keytool`. O `keytool` cria um `KeyPairGenerator` RSA ou DSA e o inicializa com um `keysize` apropriado. Este gerador é então usado para criar um `KeyPair` que o `keytool` armazenaria junto com o certificado recém-criado no `KeyStore`, que é eventualmente gravado em disco.

Um `TrustManager` do JSSE é responsável por verificar as credenciais recebidas de um par. Existem muitas maneiras de verificar credenciais: uma delas é criar um objeto `CertPath` e deixar que a estrutura de Infraestrutura de Chave Pública (PKI) integrada do JDK lide com a validação. Internamente, a implementação do CertPath pode criar um objeto `Signature` e usá-lo para verificar se cada uma das assinaturas na cadeia de certificados.

Com este entendimento básico da arquitetura, podemos analisar algumas das etapas do handshake SSL/TLS. O cliente começa enviando uma mensagem ClientHello para o servidor. O servidor seleciona uma ciphersuite para usar e a envia de volta em uma mensagem ServerHello, e começa a criar objetos JCA com base na seleção da suite. Usaremos autenticação apenas do servidor nos exemplos a seguir.

Figura 2-18 Mensagens SSL/TLS

[Descrição de "Figura 2-18 Mensagens SSL/TLS"](<#/>)

A autenticação apenas do servidor é descrita nos exemplos a seguir. Os exemplos são muito simplificados, mas dão uma ideia de como as classes JSSE podem ser combinadas para criar um protocolo de nível superior:

Exemplo 2-9 Servidor SSL/TLS Usa uma ciphersuite Baseada em RSA, como TLS_RSA_WITH_AES_128_CBC_SHA

O `KeyManager` do servidor é consultado e retorna uma entrada RSA apropriada. As credenciais do servidor (ou seja: certificado/chave pública) são enviadas na mensagem Certificate do servidor. O `TrustManager` do cliente verifica o certificado do servidor e, se aceito, o cliente gera alguns bytes aleatórios usando um objeto `SecureRandom`. Isso é então criptografado usando um objeto `Cipher` RSA assimétrico de criptografia que foi inicializado com a `PublicKey` encontrada no certificado do servidor. Esses dados criptografados são enviados em uma mensagem Client Key Exchange. O servidor usaria sua `PrivateKey` correspondente para recuperar os bytes usando um `Cipher` semelhante no modo de descriptografia. Esses bytes são então usados para estabelecer as chaves de criptografia reais.

Exemplo 2-10 Escolha um Algoritmo de Acordo de Chave Diffie-Hellman Efêmero Junto com o Algoritmo de Assinatura DSA, como TLS_DHE_DSS_WITH_AES_128_CBC_SHA

Os dois lados devem estabelecer um novo par de chaves públicas/privadas DH temporárias usando um `KeyPairGenerator`. Cada gerador cria chaves DH que podem então ser convertidas em partes usando as classes `KeyFactory` e `DHPublicKeySpec`. Cada lado então cria um objeto `KeyAgreement` e o inicializa com suas respectivas `PrivateKey`s DH. O servidor envia suas partes de chave pública em uma mensagem `ServerKeyExchange` (protegida pelo algoritmo de assinatura DSA, e o cliente envia sua chave pública em uma mensagem ClientKeyExchange. Quando as chaves públicas são remontadas usando outra `KeyFactory`, elas são alimentadas nos objetos de acordo. Os objetos `KeyAgreement` então geram bytes acordados que são então usados para estabelecer as chaves de criptografia reais.

Uma vez que as chaves de criptografia reais tenham sido estabelecidas, a chave secreta é usada para inicializar um objeto `Cipher` simétrico, e esta cifra é usada para proteger todos os dados em trânsito. Para ajudar a determinar se os dados foram modificados, um `MessageDigest` é criado e recebe uma cópia dos dados destinados à rede. Quando o pacote está completo, o digest (hash) é anexado aos dados, e o pacote inteiro é criptografado pelo `Cipher`. Se uma cifra de bloco como AES for usada, os dados devem ser preenchidos para formar um bloco completo. No lado remoto, as etapas são simplesmente invertidas.

### Configuração da Força Criptográfica

Você pode configurar a força criptográfica da arquitetura Java Cryptography Extension (JCE) usando arquivos de política de jurisdição (consulte [Formato do Arquivo de Política de Jurisdição](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)) e o arquivo de propriedades de segurança.

Antes do Oracle Java JDK 9, a força criptográfica padrão permitida pelas implementações da Oracle era "forte, mas limitada" (por exemplo, chaves AES limitadas a 128 bits). Para remover essa restrição, os administradores podiam baixar e instalar um pacote separado de "arquivos de política de jurisdição de força ilimitada". O mecanismo de Arquivo de Política de Jurisdição foi reformulado para o JDK 9. Ele agora permite uma configuração muito mais flexível. O Oracle JDK agora vem com um valor padrão de "ilimitado" em vez de "limitado". Como sempre, administradores e usuários devem continuar a seguir todas as diretrizes de importação/exportação para suas localizações geográficas. A força criptográfica ativa agora é determinada usando uma Propriedade de Segurança (tipicamente definida no arquivo de propriedades `java.security`), em combinação com os arquivos de política de jurisdição encontrados no diretório de configuração.

Todos os arquivos de política JCE necessários para fornecer força criptográfica ilimitada ou força criptográfica forte, mas limitada, são empacotados com o JDK.

Configurações de Força Criptográfica

Cada diretório sob `<java_home>/conf/security/policy` representa um conjunto de configurações de política definidas pelos arquivos de política de jurisdição que eles contêm. Você ativa uma configuração de força criptográfica particular representada pelos arquivos de política em um diretório definindo a Propriedade de Segurança `crypto.policy` (configurada no arquivo `<java_home>/conf/security/java.security`) para apontar para esse diretório.
Nota:

As propriedades no arquivo `java.security` são tipicamente analisadas apenas uma vez. Se você modificou qualquer propriedade neste arquivo, reinicie suas aplicações para garantir que as alterações sejam refletidas corretamente.

O JDK vem empacotado com dois diretórios, `limited` e `unlimited`, cada um contendo vários arquivos de política. Por padrão, a propriedade de segurança `crypto.policy` é definida como:
```
    crypto.policy = unlimited
```

O valor geral é a interseção dos arquivos contidos no diretório. Essas configurações de arquivos de política são válidas para toda a VM e afetam todas as aplicações em execução nesta VM. Se você deseja substituir a força criptográfica no nível da aplicação, consulte [Como Tornar Aplicações Isentas de Restrições Criptográficas](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Conteúdo do Diretório Unlimited

O diretório `unlimited` contém os seguintes arquivos de política:

  * `<java_home>/conf/security/unlimited/default_US_export.policy`
``` // Default US Export policy file.  
        grant {     
        // There is no restriction to any algorithms.
             permission javax.crypto.CryptoAllPermission;
        };
```

Nota:

Como não há restrições atuais à exportação de criptografia dos Estados Unidos, o arquivo `default_US_export.policy` é configurado sem restrições.

  * `<java_home>/conf/security/unlimited/default_local.policy`
```// Country specific policy file for countries with no limits on crypto strength.  
        grant {     
        // There is no restriction to any algorithms.
             permission javax.crypto.CryptoAllPermission;
        };
```

Nota:

Dependendo do país, pode haver restrições locais, mas como este arquivo de política está localizado no diretório `unlimited`, não há restrições listadas aqui.

Para selecionar força criptográfica ilimitada conforme definido nestes dois arquivos, defina `crypto.policy = unlimited` no arquivo `<java_home>/conf/security/java.security`.

Conteúdo do Diretório Limited

O diretório `limited` atualmente contém os seguintes arquivos de política:

  * `<java_home>/conf/security/limited/default_US_export.policy`
```// Default US Export policy file.  
        grant {     
        // There is no restriction to any algorithms.
             permission javax.crypto.CryptoAllPermission;
        };
```

Nota:

Embora este esteja no diretório `limited`, como não há restrições atuais à exportação de criptografia dos Estados Unidos, o arquivo `default_US_export.policy` é configurado sem restrições.

  * `<java_home>/conf/security/limited/default_local.policy`
```// Some countries have import limits on crypto strength. This policy file
        // is worldwide importable.
        
        grant {
            permission javax.crypto.CryptoPermission "DES", 64;
            permission javax.crypto.CryptoPermission "DESede", *;
            permission javax.crypto.CryptoPermission "RC2", 128, 
                                             "javax.crypto.spec.RC2ParameterSpec", 128;
            permission javax.crypto.CryptoPermission "RC4", 128;
            permission javax.crypto.CryptoPermission "RC5", 128, 
                  "javax.crypto.spec.RC5ParameterSpec", *, 12, *;
            permission javax.crypto.CryptoPermission "RSA", *;
            permission javax.crypto.CryptoPermission *, 128;
        };
```

Nota:

Este arquivo de política local mostra as restrições padrão. Ele deve ser permitido por qualquer país, incluindo aqueles que têm restrições de importação, mas por favor, obtenha orientação legal.

  * `<java_home>/conf/security/limited/exempt_local.policy`
```// Some countries have import limits on crypto strength, but may allow for
        // these exemptions if the exemption mechanism is used.
        
        grant {
            // There is no restriction to any algorithms if KeyRecovery is enforced.
            permission javax.crypto.CryptoPermission *, "KeyRecovery"; 
        
            // There is no restriction to any algorithms if KeyEscrow is enforced.
            permission javax.crypto.CryptoPermission *, "KeyEscrow"; 
        
            // There is no restriction to any algorithms if KeyWeakening is enforced. 
            permission javax.crypto.CryptoPermission *, "KeyWeakening";
        };
```

Nota:

Países que têm restrições de importação devem usar "limited", mas essas restrições podem ser flexibilizadas se o mecanismo de isenção puder ser empregado. Consulte [Como Tornar Aplicações Isentas de Restrições Criptográficas](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>). Por favor, obtenha orientação legal para sua situação.

Configurações Personalizadas de Força Criptográfica

Para configurar restrições à força criptográfica que sejam diferentes das configurações nos arquivos de política nos diretórios `limited` ou `unlimited`, você pode criar um novo diretório, paralelo a `limited` e `unlimited`, e colocar seus arquivos de política lá. Por exemplo, você pode criar um diretório chamado `custom`. Neste diretório `custom`, você inclui os arquivos `default_*export.policy` e/ou `exempt_*local.policy`.

Para selecionar a força criptográfica conforme definida nos arquivos do diretório `custom`, defina `crypto.policy = custom` no arquivo `<java_home>/conf/security/java.security`.

### Formato do Arquivo de Política de Jurisdição

A JCA representa seus arquivos de política de jurisdição como arquivos de política no estilo Java com declarações de permissão correspondentes. Conforme descrito em [Configuração de Força Criptográfica](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>), um arquivo de política Java especifica quais permissões são permitidas para código de fontes de código especificadas. Uma permissão representa acesso a um recurso do sistema. No caso da JCA, os "recursos" são algoritmos de criptografia, e as fontes de código não precisam ser especificadas, porque as restrições criptográficas se aplicam a todo o código.

Um arquivo de política de jurisdição consiste em uma "entrada de concessão" muito básica contendo uma ou mais "entradas de permissão".
```
    grant {
        <permission entries>;
    };
    
```

O formato de uma entrada de permissão em um arquivo de política de jurisdição é:
```
    permission <crypto permission class name>
        [<alg_name>
            [
                [, <exemption mechanism name>]
                [, <maxKeySize>
                    [, <AlgorithmParameterSpec class name>,
                           <parameters for constructing an AlgorithmParameterSpec object>
                    ]
                ]
            ]
        ];
    
```

Um exemplo de arquivo de política de jurisdição que inclui a restrição do algoritmo AES a tamanhos máximos de chave de 128 bits é:
```
        grant {
            permission javax.crypto.CryptoPermission "AES", 128;
            // ...
        };
    
```

Uma entrada de permissão deve começar com a palavra `permission`. Os itens que aparecem em uma entrada de permissão devem aparecer na ordem especificada. Uma entrada é terminada com um ponto e vírgula. A distinção entre maiúsculas e minúsculas é irrelevante para os identificadores (`grant`, `permission`), mas é significativa para o `<crypto permission class name>` ou para qualquer string que seja passada como valor. Um asterisco (`*`) pode ser usado como curinga para qualquer opção de entrada de permissão. Por exemplo, um asterisco para uma opção `<alg_name>` significa "todos os algoritmos".

A tabela a seguir descreve as opções de uma entrada de permissão:

Tabela 2-1 Opções de Entrada de Permissão

Opção | Descrição
---|---
`<crypto permission class name>` | Nome específico da classe de permissão, como `javax.crypto.CryptoPermission`. Obrigatório. Uma classe de permissão criptográfica reflete a capacidade de uma aplicação de usar certos algoritmos com certos tamanhos de chave em certos ambientes. Existem duas classes de permissão criptográfica: `CryptoPermission` e `CryptoAllPermission`. A classe especial `CryptoAllPermission` implica todas as permissões relacionadas à criptografia, ou seja, especifica que não há restrições relacionadas à criptografia.
`<alg_name> ` | String entre aspas especificando o nome padrão de um algoritmo de criptografia, como "AES" ou "RSA". Opcional.
`<exemption mechanism name>` | String entre aspas indicando um mecanismo de isenção que, se aplicado, permite uma redução nas restrições criptográficas. Opcional. Nomes de mecanismos de isenção que podem ser usados incluem "KeyRecovery", "KeyEscrow" e "KeyWeakening".
`<maxKeySize>` | Inteiro especificando o tamanho máximo da chave (em bits) permitido para o algoritmo especificado. Opcional.
`<AlgorithmParameterSpec class name>` | Nome da classe que especifica a força do algoritmo. Opcional. Para alguns algoritmos, pode não ser suficiente especificar a força do algoritmo apenas em termos de tamanho de chave. Por exemplo, no caso do algoritmo "RC5", o número de rounds também deve ser considerado. Para algoritmos cuja força precisa ser expressa como mais do que um tamanho de chave, use esta opção para especificar o nome da classe `AlgorithmParameterSpec` que faz isso (como `javax.crypto.spec.RC5ParameterSpec` para o algoritmo "RC5").
`<parameters for constructing an AlgorithmParameterSpec object>` | Lista de parâmetros para construir o objeto `AlgorithmParameterSpec` especificado. Obrigatório se ` <AlgorithmParameterSpec class name>` foi especificado e requer parâmetros.

### Como Tornar Aplicações Isentas de Restrições Criptográficas

Atenção:

Esta seção deve ser ignorada pela maioria dos desenvolvedores de aplicações. Ela é apenas para pessoas cujas aplicações podem ser exportadas para aqueles poucos países cujos governos impõem restrições criptográficas, se for desejado que tais aplicações tenham menos restrições criptográficas do que as impostas.

Por padrão, uma aplicação pode usar algoritmos criptográficos de qualquer força. No entanto, devido a restrições de controle de importação pelos governos de alguns países, você pode ter que limitar a força desses algoritmos. O framework JCA inclui a capacidade de impor restrições quanto às forças máximas de algoritmos criptográficos disponíveis para aplicações em diferentes contextos de jurisdição (locais). Você especifica essas restrições em arquivos de política de jurisdição. Para mais informações sobre arquivos de política de jurisdição e como criá-los e configurá-los, consulte [Configuração de Força Criptográfica](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

É possível que os governos de alguns ou todos esses países permitam que certas aplicações se tornem isentas de algumas ou todas as restrições criptográficas. Por exemplo, eles podem considerar certos tipos de aplicações como "especiais" e, portanto, isentas. Ou eles podem isentar qualquer aplicação que utilize um "mecanismo de isenção", como recuperação de chave. Aplicações consideradas isentas poderiam ter acesso a criptografia mais forte do que a permitida para aplicações não isentas em tais países.

Para que uma aplicação seja reconhecida como "isenta" em tempo de execução, ela deve atender às seguintes condições:

  * Deve ter um arquivo de política de permissão empacotado com ela em um arquivo JAR. O arquivo de política de permissão especifica quais permissões relacionadas à criptografia a aplicação possui e sob quais condições (se houver).
  * O arquivo JAR contendo a aplicação e o arquivo de política de permissão deve ter sido assinado usando um certificado de assinatura de código emitido após a aplicação ter sido aceita como isenta.

A seguir estão os passos de exemplo necessários para tornar uma aplicação isenta de algumas restrições criptográficas. Este é um esboço básico que inclui informações sobre o que é exigido pela JCA para reconhecer e tratar aplicações como isentas. Você precisará conhecer os requisitos de isenção do país ou países específicos nos quais você gostaria que sua aplicação pudesse ser executada, mas cujos governos exigem restrições criptográficas. Você também precisará conhecer os requisitos de um fornecedor de framework JCA que tenha um processo em vigor para lidar com aplicações isentas. Consulte tal fornecedor para obter mais informações.

Nota:

O provedor `SunJCE` não fornece uma implementação da classe `ExemptionMechanismSpi`.

  1. Escreva e Compile o Código da Sua Aplicação
  2. Crie um Arquivo de Política de Permissão Concedendo Permissões Criptográficas Apropriadas
  3. Prepare-se para Testar
     1. Solicite Aprovação Governamental do Governo que Impõe Restrições.
     2. Obtenha um Certificado de Assinatura de Código
     3. Empacote a Aplicação e o Arquivo de Política de Permissão em um arquivo JAR
     4. [Passo 7.1: Obtenha um Certificado de Assinatura de Código](<#/doc/guides/security/howtoimplaprovider>)
     5. Configure Seu Ambiente Como o de um Usuário em um País Restrito
     6. (apenas para aplicações que usam mecanismos de isenção) Instale um Provedor Implementando o Mecanismo de Isenção Especificado pela entrada no Arquivo de Política de Permissão
  4. Teste Sua Aplicação
  5. Solicite Aprovação de Exportação do Governo dos EUA, se Necessário
  6. Implante Sua Aplicação

Requisitos Especiais de Código para Aplicações que Usam Mecanismos de Isenção

Quando uma aplicação tem um arquivo de política de permissão associado a ela (no mesmo arquivo JAR) e esse arquivo de política de permissão especifica um mecanismo de isenção, então, quando o método `getInstance` do Cipher é chamado para instanciar um Cipher, o código JCA procura nos provedores instalados por um que implemente o mecanismo de isenção especificado. Se encontrar tal provedor, a JCA instancia um objeto API `ExemptionMechanism` associado à implementação do provedor e, em seguida, associa o objeto `ExemptionMechanism` ao Cipher retornado por `getInstance`.

Após instanciar um Cipher, e antes de inicializá-lo (através de uma chamada ao método `init` do Cipher), seu código deve chamar o seguinte método do Cipher:
```
        public ExemptionMechanism getExemptionMechanism()
    
```

Esta chamada retorna o objeto `ExemptionMechanism` associado ao Cipher. Você deve então inicializar a implementação do mecanismo de isenção chamando o seguinte método no `ExemptionMechanism` retornado:
```
        public final void init(Key key)
    
```

O argumento que você fornece deve ser o mesmo que o argumento dos mesmos tipos que você fornecerá subsequentemente a um método `init` do Cipher.

Uma vez que você tenha inicializado o `ExemptionMechanism`, você pode prosseguir como de costume para inicializar e usar o Cipher.

Arquivos de Política de Permissão

Para que uma aplicação seja reconhecida em tempo de execução como "isenta" de algumas ou todas as restrições criptográficas, ela deve ter um arquivo de política de permissão empacotado com ela em um arquivo JAR. O arquivo de política de permissão especifica quais permissões relacionadas à criptografia a aplicação possui e sob quais condições (se houver).

O formato de uma entrada de permissão em um arquivo de política de permissão que acompanha uma aplicação isenta é o mesmo que o formato para um arquivo de política de jurisdição baixado com o JDK, que é:
```
    permission <crypto permission class name>
        [<alg_name>
            [
                [, <exemption mechanism name>]
                [, <maxKeySize>
                    [, <AlgorithmParameterSpec class name>,
                           <parameters for constructing an AlgorithmParameterSpec object>
                    ]
                ]
            ]
        ];
    
```

Consulte [Formato do Arquivo de Política de Jurisdição](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Arquivos de Política de Permissão para Aplicações Isentas

Algumas aplicações podem ser permitidas a serem completamente irrestritas. Assim, o arquivo de política de permissão que acompanha tal aplicação geralmente precisa apenas conter o seguinte:
```
    grant {
        // There are no restrictions to any algorithms.
        permission javax.crypto.CryptoAllPermission;
    };
    
```

Se uma aplicação usa apenas um único algoritmo (ou vários algoritmos específicos), então o arquivo de política de permissão poderia simplesmente mencionar esse algoritmo (ou algoritmos) explicitamente, em vez de conceder `CryptoAllPermission`.

Por exemplo, se uma aplicação usa apenas o algoritmo Blowfish, o arquivo de política de permissão não precisa conceder `CryptoAllPermission` a todos os algoritmos. Ele poderia apenas especificar que não há restrição criptográfica se o algoritmo Blowfish for usado. Para fazer isso, o arquivo de política de permissão seria semelhante ao seguinte:
```
    grant {
        permission javax.crypto.CryptoPermission "Blowfish";
    };
    
```

Arquivos de Política de Permissão para Aplicações Isentas Devido a Mecanismos de Isenção

Se uma aplicação for considerada "isenta" se um mecanismo de isenção for aplicado, então o arquivo de política de permissão que acompanha a aplicação deve especificar um ou mais mecanismos de isenção. Em tempo de execução, a aplicação será considerada isenta se qualquer um desses mecanismos de isenção for aplicado. Cada mecanismo de isenção deve ser especificado em uma entrada de permissão que se parece com o seguinte:
```
        // No algorithm restrictions if specified
        // exemption mechanism is enforced.
        permission javax.crypto.CryptoPermission *,
            "<ExemptionMechanismName>";
    
```

onde `<ExemptionMechanismName>` especifica o nome de um mecanismo de isenção. A lista de nomes possíveis de mecanismos de isenção inclui:

  * `KeyRecovery`
  * `KeyEscrow`
  * `KeyWeakening`

Como exemplo, suponha que sua aplicação seja isenta se a recuperação de chave ou o escrow de chave for aplicado. Então seu arquivo de política de permissão deve conter o seguinte:
```
    grant {
        // No algorithm restrictions if KeyRecovery is enforced.
        permission javax.crypto.CryptoPermission *, "KeyRecovery";
    
        // No algorithm restrictions if KeyEscrow is enforced.
        permission javax.crypto.CryptoPermission *, "KeyEscrow";
    };
    
```

Nota:

Entradas de permissão que especificam mecanismos de isenção não devem também especificar tamanhos máximos de chave. Os tamanhos de chave permitidos são realmente determinados a partir dos arquivos de política de jurisdição isentos instalados, conforme descrito na próxima seção.

Como os Arquivos de Política de Permissão Empacotados Afetam as Permissões Criptográficas

Em tempo de execução, quando uma aplicação instancia um Cipher (através de uma chamada ao seu método `getInstance`) e essa aplicação possui um arquivo de política de permissão associado, a JCA verifica se o arquivo de política de permissão possui uma entrada que se aplica ao algoritmo especificado na chamada `getInstance`. Se sim, e a entrada concede `CryptoAllPermission` ou não especifica que um mecanismo de isenção deve ser aplicado, significa que não há restrição criptográfica para este algoritmo em particular.

Se o arquivo de política de permissão tiver uma entrada que se aplica ao algoritmo especificado na chamada `getInstance` e a entrada especificar que um mecanismo de isenção deve ser aplicado, então os arquivos de política de jurisdição isentos são examinados. Se as permissões isentas incluírem uma entrada para o algoritmo e mecanismo de isenção relevantes, e essa entrada for implicada pelas permissões no arquivo de política de permissão empacotado com a aplicação, e se houver uma implementação do mecanismo de isenção especificado disponível em um dos provedores registrados, então o tamanho máximo da chave e os valores dos parâmetros do algoritmo para o Cipher são determinados a partir da entrada de permissão isenta.

Se não houver uma entrada de permissão isenta implicada pela entrada relevante no arquivo de política de permissão empacotado com a aplicação, ou se não houver uma implementação do mecanismo de isenção especificado disponível em nenhum dos provedores registrados, então a aplicação só terá as permissões criptográficas padrão.

### Empacotando Sua Aplicação

Você pode empacotar uma aplicação em três tipos diferentes de módulos:

  * Módulo nomeado ou explícito: Um módulo que aparece no `module path` e contém informações de configuração do módulo no arquivo `module-info.class`.

  * Módulo automático: Um módulo que aparece no `module path`, mas não contém informações de configuração do módulo em um arquivo `module-info.class` (essencialmente um arquivo JAR "regular").

  * Módulo sem nome: Um módulo que aparece no `class path`. Ele pode ou não ter um arquivo `module-info.class`; este arquivo é ignorado.

É recomendado que você empacote suas aplicações em módulos nomeados, pois eles fornecem melhor desempenho, encapsulamento mais forte e configuração mais simples. Eles também oferecem maior flexibilidade; você pode usá-los com JDKs não modulares ou mesmo como módulos sem nome, especificando-os no `class path` de um JDK modular.

Para mais informações sobre módulos, consulte [The State of the Module System](<http://openjdk.java.net/projects/jigsaw/spec/sotms/>) e [JEP 261: Module System](<http://openjdk.java.net/jeps/261>)

### Exemplos de Código JCA Adicionais

Estes exemplos ilustram o uso de vários mecanismos JCA. Veja também [Programas de Exemplo para Troca de Chaves Diffie-Hellman, AES/GCM e HMAC-SHA256](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)

Tópicos

[Calculando um Objeto MessageDigest](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)

[Gerando um Par de Chaves](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)

[Gerando e Verificando uma Assinatura Usando Chaves Geradas](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)

[Gerando/Verificando Assinaturas Usando Especificações de Chave e KeyFactory](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)

[Determinando Se Duas Chaves São Iguais](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)

[Lendo Certificados Codificados em Base64](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)

[Analisando uma Resposta de Certificado](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)

[Usando Criptografia](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)

[Usando Criptografia Baseada em Senha](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)

#### Calculando um Objeto MessageDigest

Estes passos descrevem o procedimento para calcular um objeto `MessageDigest`.

  1. Crie o objeto `MessageDigest`, como no exemplo a seguir:
```MessageDigest sha = MessageDigest.getInstance("SHA-256");
```

Esta chamada atribui um objeto `message digest` devidamente inicializado à variável `sha`. A implementação implementa o Secure Hash Algorithm (SHA-256), conforme definido no documento [FIPS 180-4](<https://csrc.nist.gov/publications/detail/fips/180/4/final>) do National Institute for Standards and Technology (NIST).

  2. Suponha que temos três arrays de bytes, `i1`, `i2` e `i3`, que formam a entrada total cujo `message digest` queremos calcular. Este `digest` (ou "hash") poderia ser calculado através das seguintes chamadas:
```sha.update(i1);
         sha.update(i2);
         sha.update(i3);
         byte[] hash = sha.digest();
```

  3. **Opcional:** Uma série alternativa equivalente de chamadas seria:
```sha.update(i1);
         sha.update(i2);
         byte[] hash = sha.digest(i3);
```

Após o `message digest` ter sido calculado, o objeto `message digest` é automaticamente resetado e pronto para receber novos dados e calcular seu `digest`. Todo o estado anterior (ou seja, os dados fornecidos às chamadas `update`) é perdido.

Exemplo 2-11 Implementações de Hash Através de Clonagem

Algumas implementações de hash podem suportar hashes intermediários através de clonagem. Suponha que queremos calcular hashes separados para:

  * `i1`
  * `i1` e `i2`
  * `i1`, `i2` e `i3`

A seguir está uma maneira de calcular esses hashes; no entanto, este código funciona apenas se a implementação SHA-256 for clonável:
```
    /* compute the hash for i1 */
    sha.update(i1);
    byte[] i1Hash = sha.clone().digest();
    
    /* compute the hash for i1 and i2 */
    sha.update(i2);
    byte[] i12Hash = sha.clone().digest();
    
    /* compute the hash for i1, i2 and i3 */
    sha.update(i3);
    byte[] i123hash = sha.digest();
```

Exemplo 2-12 Determinar se a Implementação de Hash é Clonável ou Não Clonável

Algumas implementações de `message digests` são clonáveis, outras não. Para determinar se a clonagem é possível ou não, tente clonar o objeto `MessageDigest` e capture a exceção potencial da seguinte forma:
```
    try {
        // try and clone it
        /* compute the hash for i1 */
        sha.update(i1);
        byte[] i1Hash = sha.clone().digest();
        // ...
        byte[] i123hash = sha.digest();
    } catch (CloneNotSupportedException cnse) {
        // do something else, such as the code in the section
        // "Compute Intermediate Digests if the Hash Implementation is not Cloneable"
    }
```

Exemplo 2-13 Calcular Digests Intermediários se a Implementação de Hash não for Clonável

Se um `message digest` não for clonável, a outra maneira, menos elegante, de calcular `digests` intermediários é criar vários `digests`. Neste caso, o número de `digests` intermediários a serem calculados deve ser conhecido antecipadamente:
```
    MessageDigest md1 = MessageDigest.getInstance("SHA-256");
    MessageDigest md2 = MessageDigest.getInstance("SHA-256");
    MessageDigest md3 = MessageDigest.getInstance("SHA-256");
    
    byte[] i1Hash = md1.digest(i1);
    
    md2.update(i1);
    byte[] i12Hash = md2.digest(i2);
    
    md3.update(i1);
    md3.update(i2);
    byte[] i123Hash = md3.digest(i3);
```

#### Gerando um Par de Chaves

Neste exemplo, geraremos um par de chaves pública-privada para o algoritmo chamado "DSA" (Digital Signature Algorithm) e usaremos este par de chaves em exemplos futuros. Geraremos chaves com um módulo de 2048 bits. Não nos importa qual provedor fornece a implementação do algoritmo.

Criando o Gerador de Par de Chaves

O primeiro passo é obter um objeto gerador de par de chaves para gerar chaves para o algoritmo DSA:
```
    	KeyPairGenerator keyGen = KeyPairGenerator.getInstance("DSA");
```

Inicializando o Gerador de Par de Chaves

O próximo passo é inicializar o gerador de par de chaves. Na maioria dos casos, a inicialização independente do algoritmo é suficiente, mas em alguns casos, a inicialização específica do algoritmo é usada.

Inicialização Independente do Algoritmo

Todos os geradores de par de chaves compartilham os conceitos de um tamanho de chave (`keysize`) e uma fonte de aleatoriedade. Os métodos de inicialização da classe `KeyPairGenerator` precisam, no mínimo, de um `keysize`. Se a fonte de aleatoriedade não for explicitamente fornecida, uma implementação `SecureRandom` do provedor instalado de maior prioridade será usada. Assim, para gerar chaves com um `keysize` de 2048, basta chamar:
```
        keyGen.initialize(2048);
```

O código a seguir ilustra como usar um objeto `SecureRandom` específico, adicionalmente semeado:
```
        SecureRandom random = SecureRandom.getInstance("DRBG", "SUN");
        random.setSeed(userSeed);
        keyGen.initialize(2048, random);
```

Como nenhum outro parâmetro é especificado ao chamar esses métodos de inicialização independentes do algoritmo, cabe ao provedor decidir o que fazer com os parâmetros específicos do algoritmo (se houver) a serem associados a cada uma das chaves. O provedor pode usar valores de parâmetros pré-calculados ou pode gerar novos valores.

Inicialização Específica do Algoritmo

Para situações em que um conjunto de parâmetros específicos do algoritmo já existe (como "parâmetros da comunidade" em DSA), existem dois métodos `initialize` que possuem um argumento `AlgorithmParameterSpec`. Suponha que seu gerador de par de chaves seja para o algoritmo "DSA", e você tenha um conjunto de parâmetros específicos de DSA, `p`, `q` e `g`, que você gostaria de usar para gerar seu par de chaves. Você poderia executar o seguinte código para inicializar seu gerador de par de chaves (lembre-se que `DSAParameterSpec` é um `AlgorithmParameterSpec`):
```
        DSAParameterSpec dsaSpec = new DSAParameterSpec(p, q, g);
        keyGen.initialize(dsaSpec);
```

Gerando o Par de Chaves

O passo final é realmente gerar o par de chaves. Não importa qual tipo de inicialização foi usado (independente do algoritmo ou específico do algoritmo), o mesmo código é usado para gerar o `KeyPair`:
```
        KeyPair pair = keyGen.generateKeyPair();
```

#### Gerando e Verificando uma Assinatura Usando Chaves Geradas

Exemplos de geração e verificação de uma assinatura usando chaves geradas.

Os exemplos a seguir de geração e verificação de assinatura usam o `KeyPair` gerado em [Gerando um Par de Chaves](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Gerando uma Assinatura

Primeiro criamos um objeto da classe `Signature`:
```
        Signature dsa = Signature.getInstance("SHA256withDSA");
    
```

Em seguida, usando o par de chaves gerado no exemplo de par de chaves, inicializamos o objeto com a chave privada e, em seguida, assinamos um array de bytes chamado `data`.
```
       /* Initializing the object with a private key */
        PrivateKey priv = pair.getPrivate();
        dsa.initSign(priv);
    
       /* Update and sign the data */
        dsa.update(data);
        byte[] sig = dsa.sign();
    
```

Verificando uma Assinatura

Verificar a assinatura é simples. (Note que aqui também usamos o par de chaves gerado no exemplo de par de chaves.)
```
       /* Initializing the object with the public key */
       PublicKey pub = pair.getPublic();
       dsa.initVerify(pub);
    
       /* Update and verify the data */
       dsa.update(data);
       boolean verifies = dsa.verify(sig);
       System.out.println("signature verifies: " + verifies);
    
```

#### Gerando/Verificando Assinaturas Usando Especificações de Chave e KeyFactory

Suponha que, em vez de ter um par de chaves pública/privada (como, por exemplo, foi gerado na seção [Gerando um Par de Chaves](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)), você simplesmente tenha os componentes da sua chave privada DSA: `x` (a chave privada), `p` (o primo), `q` (o sub-primo) e `g` (a base).

Além disso, suponha que você queira usar sua chave privada para assinar digitalmente alguns dados, que estão em um array de bytes chamado `someData`. Você faria os seguintes passos, que também ilustram a criação de uma especificação de chave e o uso de uma `key factory` para obter uma `PrivateKey` da especificação de chave (`initSign` requer uma `PrivateKey`):
```
        DSAPrivateKeySpec dsaPrivKeySpec = new DSAPrivateKeySpec(x, p, q, g);
    
        KeyFactory keyFactory = KeyFactory.getInstance("DSA");
        PrivateKey privKey = keyFactory.generatePrivate(dsaPrivKeySpec);
    
        Signature sig = Signature.getInstance("SHA256withDSA");
        sig.initSign(privKey);
        sig.update(someData);
        byte[] signature = sig.sign();
    
```

Suponha que Alice queira usar os dados que você assinou. Para que ela possa fazer isso e verificar sua assinatura, você precisa enviar a ela três coisas:

  1. Os dados
  2. A assinatura
  3. A chave pública correspondente à chave privada que você usou para assinar os dados

Você pode armazenar os bytes de `someData` em um arquivo e os bytes de `signature` em outro, e enviá-los para Alice.

Para a chave pública, suponha, como no exemplo de assinatura anterior, que você tenha os componentes da chave pública DSA correspondente à chave privada DSA usada para assinar os dados. Então você pode criar uma `DSAPublicKeySpec` a partir desses componentes:
```java
        DSAPublicKeySpec dsaPubKeySpec = new DSAPublicKeySpec(y, p, q, g);
    
```

Você ainda precisa extrair os bytes da chave para que possa colocá-los em um arquivo. Para fazer isso, você pode primeiro chamar o método `generatePublic` na fábrica de chaves DSA já criada no exemplo anterior: 
```java
      
        PublicKey pubKey = keyFactory.generatePublic(dsaPubKeySpec);
    
```

Então você pode extrair os bytes da chave (codificados) da seguinte forma: 
```java
        byte[] encKey = pubKey.getEncoded();
    
```

Agora você pode armazenar esses bytes em um arquivo e enviá-lo para Alice junto com os arquivos contendo os dados e a assinatura.

Agora, suponha que Alice tenha recebido esses arquivos, e ela copiou os bytes de dados do arquivo de dados para um array de bytes chamado `data`, os bytes de assinatura do arquivo de assinatura para um array de bytes chamado `signature`, e os bytes da chave pública codificada do arquivo de chave pública para um array de bytes chamado `encodedPubKey`. 

Alice pode agora executar o seguinte código para verificar a assinatura. O código também ilustra como usar uma fábrica de chaves para instanciar uma chave pública DSA a partir de sua codificação (`initVerify` requer uma `PublicKey`). 
```java
        X509EncodedKeySpec pubKeySpec = new X509EncodedKeySpec(encodedPubKey);
    
        KeyFactory keyFactory = KeyFactory.getInstance("DSA");
        PublicKey pubKey = keyFactory.generatePublic(pubKeySpec);
    
        Signature sig = Signature.getInstance("SHA256withDSA");
        sig.initVerify(pubKey);
        sig.update(data);
        sig.verify(signature);
    
```

Nota:

No exemplo anterior, Alice precisava gerar uma `PublicKey` a partir dos bits da chave codificada, já que `initVerify` requer uma `PublicKey`. Uma vez que ela tenha uma `PublicKey`, ela também poderia usar o método `getKeySpec` da `KeyFactory` para convertê-la em uma `DSAPublicKeySpec` para que ela possa acessar os componentes, se desejado, como em: 
```java 
        DSAPublicKeySpec dsaPubKeySpec =
            (DSAPublicKeySpec)keyFactory.getKeySpec(pubKey, DSAPublicKeySpec.class);
```

Agora ela pode acessar os componentes da chave pública DSA `y`, `p`, `q` e `g` através dos métodos "get" correspondentes na classe `DSAPublicKeySpec` (`getY`, `getP`, `getQ` e `getG`). 

#### Gerando Números Aleatórios

O exemplo de código a seguir ilustra a geração de números aleatórios configurados com diferentes níveis de força de segurança usando uma implementação DRBG da classe SecureRandom: 
```java 
        SecureRandom drbg;
        byte[] buffer = new byte[32];
    
        // Any DRBG can be provided 
        drbg = SecureRandom.getInstance("DRBG");
        drbg.nextBytes(buffer);
    
        SecureRandomParameters params = drbg.getParameters();
        if (params instanceof DrbgParameters.Instantiation) {
            DrbgParameters.Instantiation ins = (DrbgParameters.Instantiation) params;
            if (ins.getCapability().supportsReseeding()) {
                drbg.reseed();
            }
        } 
    
        // The following call requests a weak DRBG instance. It is only
        // guaranteed to support 112 bits of security strength.
        drbg = SecureRandom.getInstance("DRBG",
            DrbgParameters.instantiation(112, NONE, null));
    
        // Both the next two calls will likely fail, because drbg could be
        // instantiated with a smaller strength with no prediction resistance
        // support.
        drbg.nextBytes(buffer,
            DrbgParameters.nextBytes(256, false, "more".getBytes()));
        drbg.nextBytes(buffer,
            DrbgParameters.nextBytes(112, true, "more".getBytes()));
    
        // The following call requests a strong DRBG instance, with a
        // personalization string. If it successfully returns an instance,
        // that instance is guaranteed to support 256 bits of security strength
        // with prediction resistance available.
        drbg = SecureRandom.getInstance("DRBG", DrbgParameters.instantiation(
            256, PR_AND_RESEED, "hello".getBytes()));
    
        // Prediction resistance is not requested in this single call,
        // but an additional input is used.
        drbg.nextBytes(buffer,
            DrbgParameters.nextBytes(-1, false, "more".getBytes()));
    
        // Same for this call.
        drbg.reseed(DrbgParameters.reseed(false, "extra".getBytes()));
```

#### Determinando Se Duas Chaves São Iguais

Exemplo de código para determinar se duas chaves são iguais.

Em muitos casos, você gostaria de saber se duas chaves são iguais; no entanto, o método padrão `java.lang.Object.equals` pode não fornecer o resultado desejado. A abordagem mais independente de provedor é comparar as chaves codificadas. Se essa comparação não for apropriada (por exemplo, ao comparar uma `RSAPrivateKey` e uma `RSAPrivateCrtKey`), você deve comparar cada componente. 

O código a seguir demonstra essa ideia:
```java
       static boolean keysEqual(Key key1, Key key2) {
           if (key1.equals(key2)) {
              return true;
           }
    
           if (Arrays.equals(key1.getEncoded(), key2.getEncoded())) {
              return true;
           }
    
        // More code for different types of keys here.
        // For example, the following code can check if
        // an RSAPrivateKey and an RSAPrivateCrtKey are equal:
        // if ((key1 instanceof RSAPrivateKey) &&
        //     (key2 instanceof RSAPrivateKey)) {
        //     if ((key1.getModulus().equals(key2.getModulus())) &&
        //         (key1.getPrivateExponent().equals(
        //                                      key2.getPrivateExponent()))) {
        //         return true;
        //     }
        // }
    
            return false;
        }
    
```

#### Lendo Certificados Codificados em Base64

O exemplo a seguir lê um arquivo com certificados codificados em Base64, cada um delimitado no início por
```
    -----BEGIN CERTIFICATE-----
    
```

e no final por 
```
    -----END CERTIFICATE-----
    
```

Convertemos o `FileInputStream` (que não suporta `mark` e `reset`) para um `ByteArrayInputStream` (que suporta esses métodos), para que cada chamada a `generateCertificate` consuma apenas um certificado, e a posição de leitura do stream de entrada seja posicionada para o próximo certificado no arquivo: 
```java
        try (FileInputStream fis = new FileInputStream(filename);
            BufferedInputStream bis = new BufferedInputStream(fis)) {
            CertificateFactory cf = CertificateFactory.getInstance("X.509");
            while (bis.available() > 0) {
                Certificate cert = cf.generateCertificate(bis); 
                System.out.println(cert.toString());
            }
       }
```

#### Analisando uma Resposta de Certificado

O exemplo a seguir analisa uma resposta de certificado formatada em PKCS7 armazenada em um arquivo e extrai todos os certificados dela:
```java
       try (FileInputStream fis = new FileInputStream(filename)) {
          CertificateFactory cf = CertificateFactory.getInstance("X.509");
    
          Collection<? extends Certificate> c = cf.generateCertificates(fis);
          for (Certificate cert : c) {
              System.out.println(cert);
          }
    
          // Alternatively, use this aggregate operation instead of a for-loop:
          // c.stream().forEach(e -> System.out.println(e));
       }
```

#### Usando Criptografia

Esta seção guia o usuário pelo processo de geração de uma chave, criação e inicialização de um objeto cipher, criptografia de um arquivo e, em seguida, sua descriptografia. Ao longo deste exemplo, usamos o Advanced Encryption Standard (AES).

Gerando uma Chave

Para criar uma chave AES, precisamos instanciar um KeyGenerator para AES. Não especificamos um provedor, porque não nos importamos com uma implementação particular de geração de chave AES. Como não inicializamos o KeyGenerator, uma fonte de aleatoriedade fornecida pelo sistema e um tamanho de chave padrão serão usados para criar a chave AES: 
```java
    KeyGenerator keygen = KeyGenerator.getInstance("AES");
    SecretKey aesKey = keygen.generateKey();
```

Após a chave ter sido gerada, o mesmo objeto KeyGenerator pode ser reutilizado para criar outras chaves.

Criando um Cipher

O próximo passo é criar uma instância de Cipher. Para fazer isso, usamos um dos métodos de fábrica `getInstance` da classe Cipher. Devemos especificar o nome da transformação solicitada, que inclui os seguintes componentes, separados por barras (/): 

  * o nome do algoritmo
  * o modo (opcional)
  * o esquema de preenchimento (opcional)



Neste exemplo, criamos um cipher AES no modo Cipher Block Chaining, com preenchimento estilo PKCS5. Não especificamos um provedor, porque não nos importamos com uma implementação particular da transformação solicitada.

O nome padrão do algoritmo para AES é "AES", o nome padrão para o modo Cipher Block Chaining é "CBC", e o nome padrão para o preenchimento estilo PKCS5 é "PKCS5Padding":
```java
    Cipher aesCipher;
    
    // Create the cipher
    aesCipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
```

Usamos a `aesKey` gerada anteriormente para inicializar o objeto Cipher para criptografia: 
```java
    // Initialize the cipher for encryption
    aesCipher.init(Cipher.ENCRYPT_MODE, aesKey);
    
    // Our cleartext
    byte[] cleartext = "This is just an example".getBytes();
    
    // Encrypt the cleartext
    byte[] ciphertext = aesCipher.doFinal(cleartext);
    
    // Retrieve the parameters used during encryption to properly  
    // initialize the cipher for decryption
    AlgorithmParameters params = aesCipher.getParameters();
    
    // Initialize the same cipher for decryption
    aesCipher.init(Cipher.DECRYPT_MODE, aesKey, params);
    
    // Decrypt the ciphertext
    byte[] cleartext1 = aesCipher.doFinal(ciphertext);
```

`cleartext` e `cleartext1` são idênticos. 

#### Usando Criptografia Baseada em Senha

Neste exemplo, solicitamos ao usuário uma senha a partir da qual derivamos uma chave de criptografia.

Pareceria lógico coletar e armazenar a senha em um objeto do tipo `java.lang.String`. No entanto, aqui está a ressalva: Objetos do tipo `String` são imutáveis, ou seja, não há métodos definidos que permitam alterar (sobrescrever) ou zerar o conteúdo de uma `String` após o uso. Essa característica torna os objetos `String` inadequados para armazenar informações sensíveis à segurança, como senhas de usuário. Você deve sempre coletar e armazenar informações sensíveis à segurança em um array de caracteres (char array) em vez disso. Por essa razão, a classe `javax.crypto.spec.PBEKeySpec` aceita (e retorna) uma senha como um array de caracteres. 

Para usar a Criptografia Baseada em Senha (PBE) conforme definido em PKCS5, precisamos especificar um salt e uma contagem de iterações. O mesmo salt e contagem de iterações usados para criptografia devem ser usados para descriptografia. Algoritmos PBE mais recentes usam uma contagem de iterações de pelo menos 1000. 
```java
        PBEKeySpec pbeKeySpec;
        PBEParameterSpec pbeParamSpec;
        SecretKeyFactory keyFac;
    
        // Salt
        byte[] salt = new SecureRandom().nextBytes(salt);
    
        // Iteration count
        int count = 1000;
    
        // Create PBE parameter set
        pbeParamSpec = new PBEParameterSpec(salt, count);
    
        // Prompt user for encryption password.
        // Collect user password as char array, and convert
        // it into a SecretKey object, using a PBE key
        // factory.
        char[] password = System.console.readPassword("Enter encryption password: ");
        pbeKeySpec = new PBEKeySpec(password);
        keyFac = SecretKeyFactory.getInstance("PBEWithHmacSHA256AndAES_256");
        SecretKey pbeKey = keyFac.generateSecret(pbeKeySpec);
    
        // Create PBE Cipher
        Cipher pbeCipher = Cipher.getInstance("PBEWithHmacSHA256AndAES_256");
    
        // Initialize PBE Cipher with key and parameters
        pbeCipher.init(Cipher.ENCRYPT_MODE, pbeKey, pbeParamSpec);
    
        // Our cleartext
        byte[] cleartext = "This is another example".getBytes();
    
        // Encrypt the cleartext
        byte[] ciphertext = pbeCipher.doFinal(cleartext);
    
    
```

#### Encapsulando e Desencapsulando Chaves

Consulte [A Classe KEM](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) para mais informações sobre encapsulamento e desencapsulamento de chaves. 
```java
        // Receiver side
        var kpg = KeyPairGenerator.getInstance("X25519");
        var kp = kpg.generateKeyPair();
    
        // Sender side
        var kem1 = KEM.getInstance("DHKEM");
        var sender = kem1.newEncapsulator(kp.getPublic());
        var encapsulated = sender.encapsulate();
        var k1 = encapsulated.key();
    
        // Receiver side
        var kem2 = KEM.getInstance("DHKEM");
        var receiver = kem2.newDecapsulator(kp.getPrivate());
        var k2 = receiver.decapsulate(encapsulated.encapsulation());
    
        assert Arrays.equals(k1.getEncoded(), k2.getEncoded());
```

### Programas de Exemplo para Troca de Chaves Diffie-Hellman, AES/GCM e HMAC-SHA256

A seguir estão programas de exemplo para troca de chaves Diffie-Hellman, AES/GCM e HMAC-SHA256.

Tópicos

[Troca de Chaves Diffie-Hellman entre Duas Partes](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)

[Troca de Chaves Diffie-Hellman entre Três Partes](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)

[Exemplo de AES/GCM](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)

[Exemplo de HMAC-SHA256](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)

#### Troca de Chaves Diffie-Hellman entre Duas Partes

O programa executa o protocolo de acordo de chaves Diffie-Hellman entre duas partes.
```java 
    import java.io.*;
    import java.math.BigInteger;
    import java.security.*;
    import java.security.spec.*;
    import java.security.interfaces.*;
    import javax.crypto.*;
    import javax.crypto.spec.*;
    import javax.crypto.interfaces.*;
    import com.sun.crypto.provider.SunJCE;
    
    public class DHKeyAgreement2 {
        private DHKeyAgreement2() {}
        public static void main(String argv[]) throws Exception {
            
            /*
             * Alice cria seu próprio par de chaves DH com tamanho de chave de 2048 bits
             */
            System.out.println("ALICE: Generate DH keypair ...");
            KeyPairGenerator aliceKpairGen = KeyPairGenerator.getInstance("DH");
            aliceKpairGen.initialize(2048);
            KeyPair aliceKpair = aliceKpairGen.generateKeyPair();
            
            // Alice cria e inicializa seu objeto DH KeyAgreement
            System.out.println("ALICE: Initialization ...");
            KeyAgreement aliceKeyAgree = KeyAgreement.getInstance("DH");
            aliceKeyAgree.init(aliceKpair.getPrivate());
            
            // Alice codifica sua chave pública e a envia para Bob.
            byte[] alicePubKeyEnc = aliceKpair.getPublic().getEncoded();
            
            /*
             * Vamos passar para Bob. Bob recebeu a chave pública de Alice
             * em formato codificado.
             * Ele instancia uma chave pública DH a partir do material da chave codificada.
             */
            KeyFactory bobKeyFac = KeyFactory.getInstance("DH");
            X509EncodedKeySpec x509KeySpec = new X509EncodedKeySpec(alicePubKeyEnc);
    
            PublicKey alicePubKey = bobKeyFac.generatePublic(x509KeySpec);
    
            /*
             * Bob obtém os parâmetros DH associados à chave pública de Alice.
             * Ele deve usar os mesmos parâmetros ao gerar seu próprio par de chaves.
             */
            DHParameterSpec dhParamFromAlicePubKey = ((DHPublicKey)alicePubKey).getParams();
    
            // Bob cria seu próprio par de chaves DH
            System.out.println("BOB: Generate DH keypair ...");
            KeyPairGenerator bobKpairGen = KeyPairGenerator.getInstance("DH");
            bobKpairGen.initialize(dhParamFromAlicePubKey);
            KeyPair bobKpair = bobKpairGen.generateKeyPair();
    
            // Bob cria e inicializa seu objeto DH KeyAgreement
            System.out.println("BOB: Initialization ...");
            KeyAgreement bobKeyAgree = KeyAgreement.getInstance("DH");
            bobKeyAgree.init(bobKpair.getPrivate());
    
            // Bob codifica sua chave pública e a envia para Alice.
            byte[] bobPubKeyEnc = bobKpair.getPublic().getEncoded();
            
            /*
             * Alice usa a chave pública de Bob para a primeira (e única) fase
             * de sua versão do protocolo DH.
             * Antes que ela possa fazer isso, ela precisa instanciar uma chave pública DH
             * a partir do material da chave codificada de Bob.
             */
            KeyFactory aliceKeyFac = KeyFactory.getInstance("DH");
            x509KeySpec = new X509EncodedKeySpec(bobPubKeyEnc);
            PublicKey bobPubKey = aliceKeyFac.generatePublic(x509KeySpec);
            System.out.println("ALICE: Execute PHASE1 ...");
            aliceKeyAgree.doPhase(bobPubKey, true);
    
            /*
             * Bob usa a chave pública de Alice para a primeira (e única) fase
             * de sua versão do protocolo DH.
             */
            System.out.println("BOB: Execute PHASE1 ...");
            bobKeyAgree.doPhase(alicePubKey, true);
    
            /*
             * Nesta fase, Alice e Bob completaram o protocolo de acordo de chaves DH.
             * Ambos geram o (mesmo) segredo compartilhado.
             */
            try {
                byte[] aliceSharedSecret = aliceKeyAgree.generateSecret();
                int aliceLen = aliceSharedSecret.length;
                byte[] bobSharedSecret = new byte[aliceLen];
                int bobLen;
            } catch (ShortBufferException e) {
                System.out.println(e.getMessage());
            }        // fornece buffer de saída do tamanho necessário
            bobLen = bobKeyAgree.generateSecret(bobSharedSecret, 0);
            System.out.println("Alice secret: " +
                    toHexString(aliceSharedSecret));
            System.out.println("Bob secret: " +
                    toHexString(bobSharedSecret));
            if (!java.util.Arrays.equals(aliceSharedSecret, bobSharedSecret))
                throw new Exception("Shared secrets differ");
            System.out.println("Shared secrets are the same");
    
            /*
             * Agora vamos criar um objeto SecretKey usando o segredo compartilhado
             * e usá-lo para criptografia. Primeiro, geramos SecretKeys para o
             * algoritmo "AES" (baseado nos dados brutos do segredo compartilhado) e
             * então usamos AES no modo CBC, que requer um parâmetro de vetor de inicialização
             * (IV). Observe que você deve usar o mesmo IV
             * para criptografia e descriptografia: Se você usar um IV diferente para
             * descriptografia do que usou para criptografia, a descriptografia falhará.
             *
             * Se você não especificar um IV ao inicializar o objeto Cipher
             * para criptografia, a implementação subjacente gerará
             * um aleatório, que você deve recuperar usando o
             * método javax.crypto.Cipher.getParameters(), que retorna uma
             * instância de java.security.AlgorithmParameters. Você precisa transferir
             * o conteúdo desse objeto (por exemplo, em formato codificado, obtido através
             * do método AlgorithmParameters.getEncoded()) para a parte que fará
             * a descriptografia. Ao inicializar o Cipher para descriptografia,
             * o objeto AlgorithmParameters (reinstanciado) deve ser explicitamente
             * passado para o método Cipher.init().
             */
            System.out.println("Use shared secret as SecretKey object ...");
            SecretKeySpec bobAesKey = new SecretKeySpec(bobSharedSecret, 0, 16, "AES");
            SecretKeySpec aliceAesKey = new SecretKeySpec(aliceSharedSecret, 0, 16, "AES");
    
            /*
             * Bob criptografa, usando AES no modo CBC
             */
            Cipher bobCipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            bobCipher.init(Cipher.ENCRYPT_MODE, bobAesKey);
            byte[] cleartext = "This is just an example".getBytes();
            byte[] ciphertext = bobCipher.doFinal(cleartext);
    
            // Recupera o parâmetro que foi usado e o transfere para Alice em
            // formato codificado
            byte[] encodedParams = bobCipher.getParameters().getEncoded();
    
            /*
             * Alice descriptografa, usando AES no modo CBC
             */
    
            // Instancia o objeto AlgorithmParameters a partir da codificação de parâmetros
            // obtida de Bob
            AlgorithmParameters aesParams = AlgorithmParameters.getInstance("AES");
            aesParams.init(encodedParams);
            Cipher aliceCipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            aliceCipher.init(Cipher.DECRYPT_MODE, aliceAesKey, aesParams);
            byte[] recovered = aliceCipher.doFinal(ciphertext);
            if (!java.util.Arrays.equals(cleartext, recovered))
                throw new Exception("AES in CBC mode recovered text is " +
                        "different from cleartext");
            System.out.println("AES in CBC mode recovered text is "
                    "same as cleartext");
        }
    
        /*
         * Converte um byte em dígito hexadecimal e escreve no buffer fornecido
         */
        private static void byte2hex(byte b, StringBuffer buf) {
            char[] hexChars = { '0', '1', '2', '3', '4', '5', '6', '7', '8',
                    '9', 'A', 'B', 'C', 'D', 'E', 'F' };
            int high = ((b & 0xf0) >> 4);
            int low = (b & 0x0f);
            buf.append(hexChars[high]);
            buf.append(hexChars[low]);
        }
    
        /*
         * Converte um array de bytes em string hexadecimal
         */
        private static String toHexString(byte[] block) {
            StringBuffer buf = new StringBuffer();
            int len = block.length;
            for (int i = 0; i < len; i++) {
                byte2hex(block[i], buf);
                if (i < len-1) {
                    buf.append(":");
                }
            }
            return buf.toString();
        }
    }
```

#### Troca de Chaves Diffie-Hellman entre Três Partes

O programa executa o protocolo de acordo de chaves Diffie-Hellman entre 3 partes.
```java 
    import java.security.*;
    import java.security.spec.*;
    import javax.crypto.*;
    import javax.crypto.spec.*;
    import javax.crypto.interfaces.*;
       /*
        * Este programa executa o protocolo de acordo de chaves Diffie-Hellman entre
        * 3 partes: Alice, Bob e Carol usando um parâmetro DH compartilhado de 2048 bits.
        */
        public class DHKeyAgreement3 {
            private DHKeyAgreement3() {}
            public static void main(String argv[]) throws Exception {
            // Alice cria seu próprio par de chaves DH com tamanho de chave de 2048 bits
                System.out.println("ALICE: Generate DH keypair ...");
                KeyPairGenerator aliceKpairGen = KeyPairGenerator.getInstance("DH");
                aliceKpairGen.initialize(2048);
                KeyPair aliceKpair = aliceKpairGen.generateKeyPair();
            // Estes parâmetros DH também podem ser construídos criando um
            // objeto DHParameterSpec usando valores acordados
                DHParameterSpec dhParamShared = ((DHPublicKey)aliceKpair.getPublic()).getParams();
            // Bob cria seu próprio par de chaves DH usando os mesmos parâmetros
                System.out.println("BOB: Generate DH keypair ...");
                KeyPairGenerator bobKpairGen = KeyPairGenerator.getInstance("DH");
                bobKpairGen.initialize(dhParamShared);
                KeyPair bobKpair = bobKpairGen.generateKeyPair();
            // Carol cria seu próprio par de chaves DH usando os mesmos parâmetros
                System.out.println("CAROL: Generate DH keypair ...");
                KeyPairGenerator carolKpairGen = KeyPairGenerator.getInstance("DH");
                carolKpairGen.initialize(dhParamShared);
                KeyPair carolKpair = carolKpairGen.generateKeyPair();
            // Alice inicializa
                System.out.println("ALICE: Initialize ...");
                KeyAgreement aliceKeyAgree = KeyAgreement.getInstance("DH");
                aliceKeyAgree.init(aliceKpair.getPrivate());
            // Bob inicializa
                System.out.println("BOB: Initialize ...");
                KeyAgreement bobKeyAgree = KeyAgreement.getInstance("DH");
                bobKeyAgree.init(bobKpair.getPrivate());
            // Carol inicializa
                System.out.println("CAROL: Initialize ...");
                KeyAgreement carolKeyAgree = KeyAgreement.getInstance("DH");
                carolKeyAgree.init(carolKpair.getPrivate());
            // Alice usa a chave pública de Carol
                Key ac = aliceKeyAgree.doPhase(carolKpair.getPublic(), false);
            // Bob usa a chave pública de Alice
                Key ba = bobKeyAgree.doPhase(aliceKpair.getPublic(), false);
            // Carol usa a chave pública de Bob
                Key cb = carolKeyAgree.doPhase(bobKpair.getPublic(), false);
            // Alice usa o resultado de Carol, cb
                aliceKeyAgree.doPhase(cb, true);
            // Bob usa o resultado de Alice, ac
                bobKeyAgree.doPhase(ac, true);
            // Carol usa o resultado de Bob, ba
                carolKeyAgree.doPhase(ba, true);
            // Alice, Bob e Carol calculam seus segredos
                byte[] aliceSharedSecret = aliceKeyAgree.generateSecret();
                System.out.println("Alice secret: " + toHexString(aliceSharedSecret));
                byte[] bobSharedSecret = bobKeyAgree.generateSecret();
                System.out.println("Bob secret: " + toHexString(bobSharedSecret));
                byte[] carolSharedSecret = carolKeyAgree.generateSecret();
                System.out.println("Carol secret: " + toHexString(carolSharedSecret));
            // Compara Alice e Bob
                if (!java.util.Arrays.equals(aliceSharedSecret, bobSharedSecret))
                    throw new Exception("Alice and Bob differ");
                System.out.println("Alice and Bob are the same");
            // Compara Bob e Carol
                if (!java.util.Arrays.equals(bobSharedSecret, carolSharedSecret))
                    throw new Exception("Bob and Carol differ");
                System.out.println("Bob and Carol are the same");
            }
        /*
         * Converte um byte em dígito hexadecimal e escreve no buffer fornecido
         */
            private static void byte2hex(byte b, StringBuffer buf) {
                char[] hexChars = { '0', '1', '2', '3', '4', '5', '6', '7', '8',
                                    '9', 'A', 'B', 'C', 'D', 'E', 'F' };
                int high = ((b & 0xf0) >> 4);
                int low = (b & 0x0f);
                buf.append(hexChars[high]);
                buf.append(hexChars[low]);
            }
        /*
         * Converte um array de bytes em string hexadecimal
         */
            private static String toHexString(byte[] block) {
                StringBuffer buf = new StringBuffer();
                int len = block.length;
                for (int i = 0; i < len; i++) {
                    byte2hex(block[i], buf);
                    if (i < len-1) {
                        buf.append(":");
                    }
                }
                return buf.toString();
            }
        }
    
```

#### Exemplo de AES/GCM

A seguir está um programa de exemplo para demonstrar o uso de AES/GCM para criptografar/descriptografar dados. 
```java
    import java.security.AlgorithmParameters;
    import java.util.Arrays;
    import javax.crypto.*;
    
    public class AESGCMTest {
    
        public static void main(String[] args) throws Exception {
            // Ligeiramente maior que 1 bloco AES (128 bits) para mostrar que o PADDING
            // é "tratado" por GCM.
            byte[] data = {
                0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
                0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
                0x10};
    
            // Cria uma chave AES de 128 bits.
            KeyGenerator kg = KeyGenerator.getInstance("AES");
            kg.init(128);
            SecretKey key = kg.generateKey();
    
            // Obtém um cipher AES/GCM para realizar a cifragem. Deve obter
            // e usar os Parâmetros para uma descriptografia bem-sucedida.
            Cipher encCipher = Cipher.getInstance("AES/GCM/NOPADDING");
            encCipher.init(Cipher.ENCRYPT_MODE, key);
            byte[] enc = encCipher.doFinal(data);
            AlgorithmParameters ap = encCipher.getParameters();
    
            // Obtém um cipher similar e usa os parâmetros.
            Cipher decCipher = Cipher.getInstance("AES/GCM/NOPADDING");
            decCipher.init(Cipher.DECRYPT_MODE, key, ap);
            byte[] dec = decCipher.doFinal(enc);
    
            if (Arrays.compare(data, dec) != 0) {
                throw new Exception("Original data != decrypted data");
            }
        }
    }
```

#### Exemplo de HMAC-SHA256

A seguir está um programa de exemplo que demonstra como gerar um objeto de chave secreta para HMAC-SHA256 e inicializar um objeto HMAC-SHA256 com ele.

Exemplo 2-14 Gerar um Objeto de Chave Secreta para HMAC-SHA256
```java
    import java.security.*;
    import javax.crypto.*;
    
        /**
         * Este programa demonstra como gerar um objeto de chave secreta para
         * HMACSHA256, e inicializar um objeto HMACSHA256 com ele.
         */
    
        public class initMac {
    
            public static void main(String[] args) throws Exception {
    
                // Gera chave secreta para HmacSHA256
                KeyGenerator kg = KeyGenerator.getInstance("HmacSHA256");
                SecretKey sk = kg.generateKey();
    
                // Obtém instância do objeto Mac implementando HmacSHA256, e
                // o inicializa com a chave secreta, sk
                Mac mac = Mac.getInstance("HmacSHA256");
                mac.init(sk);
                byte[] result = mac.doFinal("Hi There".getBytes());
            }
        }
    
```