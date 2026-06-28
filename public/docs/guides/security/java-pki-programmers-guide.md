# Guia do Programador Java PKI

## 9 Guia do Programador Java PKI

A Java Certification Path API consiste em classes e interfaces para lidar com caminhos de certificação, que também são chamados de cadeias de certificação. Se um caminho de certificação atende a certas regras de validação, ele pode ser usado para estabelecer com segurança o mapeamento de uma chave pública para um sujeito.

Tópicos

[Visão Geral do Guia do Programador PKI](<#/doc/guides/security/java-pki-programmers-guide>)

[Classes e Interfaces Principais](<#/doc/guides/security/java-pki-programmers-guide>)

[Implementando um Provedor de Serviço](<#/doc/guides/security/java-pki-programmers-guide>)

[Apêndice A: Nomes Padrão](<#/doc/guides/security/java-pki-programmers-guide>)

[Apêndice B: A Implementação CertPath no Provedor SUN](<#/doc/guides/security/java-pki-programmers-guide>)

[Apêndice C: Suporte OCSP](<#/doc/guides/security/java-pki-programmers-guide>)

[Apêndice D: Implementação CertPath no Provedor JdkLDAP](<#/doc/guides/security/java-pki-programmers-guide>)

[Apêndice E: Desabilitando Algoritmos Criptográficos](<#/doc/guides/security/java-pki-programmers-guide>)

### Visão Geral do Guia do Programador PKI

A Java Certification Path API define interfaces e classes abstratas para criar, construir e validar caminhos de certificação. As implementações podem ser conectadas usando uma interface baseada em provedor.

Esta API é baseada na arquitetura [Cryptographic Service Providers](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>), descrita no Java Cryptography Architecture Reference Guide, e inclui classes específicas de algoritmo para construir e validar caminhos de certificação X.509 de acordo com os padrões PKIX. Os padrões PKIX foram desenvolvidos pelo [grupo de trabalho PKIX da IETF](<http://datatracker.ietf.org/wg/pkix/charter/>).

Esta API foi originalmente especificada usando o programa [Java Community Process](<http://jcp.org/en/home/index>) como Java Specification Request (JSR) 000055. A API foi incluída no Java SDK, a partir do Java SE Development Kit (JDK) 1.4. Consulte [JSR 55: Certification Path API](<http://jcp.org/en/jsr/detail?id=55>).

Quem Deve Ler Este Documento

Este documento é destinado a dois tipos de desenvolvedores experientes:

  1. Aqueles que desejam projetar aplicações seguras que constroem ou validam caminhos de certificação.

  2. Aqueles que desejam escrever uma implementação de provedor de serviço para construir ou validar caminhos de certificação.

Este documento pressupõe que você já leu [Cryptographic Service Providers](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

#### Introdução aos Certificados de Chave Pública

Os usuários de aplicações e sistemas de chave pública devem estar confiantes de que a chave pública de um sujeito é genuína, ou seja, que a chave privada associada é de propriedade do sujeito. Certificados de chave pública são usados para estabelecer essa confiança.

Um certificado de chave pública (ou identidade) é uma ligação de uma chave pública a uma identidade, que é assinada digitalmente pela chave privada de outra entidade, frequentemente chamada de Autoridade Certificadora (CA). Para o restante desta seção, o termo CA é usado para se referir a uma entidade que assina um certificado.

Se o usuário não possui uma cópia confiável da chave pública da CA que assinou o certificado de chave pública do sujeito, então outro certificado de chave pública que ateste a CA assinante é necessário. Essa lógica pode ser aplicada recursivamente, até que uma cadeia de certificados (ou um caminho de certificação) seja descoberta a partir de uma âncora de confiança ou de uma CA mais confiável para o sujeito alvo (comumente referido como a entidade final). A CA mais confiável é geralmente especificada por um certificado emitido para uma CA em que o usuário confia diretamente. Em geral, um caminho de certificação é uma lista ordenada de certificados, geralmente composta pelo certificado de chave pública da entidade final e zero ou mais certificados adicionais. Um caminho de certificação tipicamente possui uma ou mais codificações, permitindo que seja transmitido com segurança através de redes e para diferentes arquiteturas de sistema operacional.

A figura a seguir ilustra um caminho de certificação da chave pública de uma CA mais confiável (CA 1) para o sujeito alvo (Alice). O caminho de certificação estabelece confiança na chave pública de Alice através de uma CA intermediária chamada CA2.

Figura 9-1 Caminho de Certificação da Chave Pública da CA (CA 1) para o Sujeito Alvo

[Descrição de "Figura 9-1 Caminho de Certificação da Chave Pública da CA (CA 1) para o Sujeito Alvo"](<#/>)

Um caminho de certificação deve ser validado antes que possa ser confiável para estabelecer a confiança na chave pública de um sujeito. A validação pode consistir em várias verificações nos certificados contidos no caminho de certificação, como verificar as assinaturas e checar se cada certificado não foi revogado. Os padrões PKIX definem um algoritmo para validar caminhos de certificação consistindo em certificados X.509.

Frequentemente, um usuário pode não ter um caminho de certificação de uma CA mais confiável para o sujeito. Fornecer serviços para construir ou descobrir caminhos de certificação é uma característica importante de sistemas habilitados para chave pública. [RFC 2587](<http://www.ietf.org/rfc/rfc2587.txt>) define uma definição de esquema LDAP (Lightweight Directory Access Protocol) que facilita a descoberta de caminhos de certificação X.509 usando o protocolo de serviço de diretório LDAP.

Construir e validar caminhos de certificação é uma parte importante de muitos protocolos de segurança padrão, como SSL/TLS/DTLS, S/MIME e IPsec. A Java Certification Path API fornece um conjunto de classes e interfaces para desenvolvedores que precisam integrar essa funcionalidade em suas aplicações. Esta API beneficia dois tipos de desenvolvedores: aqueles que precisam escrever implementações de provedores de serviço para um algoritmo específico de construção ou validação de caminho de certificação; e aqueles que precisam acessar algoritmos padrão para criar, construir e validar caminhos de certificação de maneira independente da implementação.

#### Certificados X.509 e Listas de Revogação de Certificados (CRLs)

Um certificado de chave pública é uma declaração assinada digitalmente por uma entidade dizendo que a chave pública e algumas outras informações de outra entidade têm um valor específico.

A tabela a seguir define alguns dos termos-chave:

Public Keys
    São números associados a uma entidade específica e destinam-se a ser conhecidos por todos que precisam ter interações confiáveis com essa entidade. Chaves públicas são usadas para verificar assinaturas.
Digitally Signed
    Se alguns dados são assinados digitalmente, eles foram armazenados com a "identidade" de uma entidade e uma assinatura que prova que essa entidade conhece os dados. Os dados são tornados inalteráveis pela assinatura com a chave privada da entidade.
Identity
    Uma forma conhecida de endereçar uma entidade. Em alguns sistemas, a identidade é a chave pública; em outros, pode ser qualquer coisa, desde um UNIX UID a um endereço de e-mail ou um X.509 Distinguished Name.
Signature
    Uma assinatura é calculada sobre alguns dados usando a chave privada de uma entidade (o signatário).
Private Keys
    São números, cada um dos quais deve ser conhecido apenas pela entidade específica cuja chave privada é (ou seja, deve ser mantido em segredo). Chaves privadas e públicas existem em pares em todos os sistemas de criptografia de chave pública (também referidos como "sistemas criptográficos de chave pública"). Em um sistema criptográfico de chave pública típico, como DSA, uma chave privada corresponde a exatamente uma chave pública. Chaves privadas são usadas para calcular assinaturas.
Entity
    Uma entidade é uma pessoa, organização, programa, computador, empresa, banco ou algo mais em que você confia em algum grau.

Basicamente, a criptografia de chave pública requer acesso às chaves públicas dos usuários. Em um ambiente de rede em larga escala, é impossível garantir que relacionamentos anteriores entre entidades comunicantes tenham sido estabelecidos ou que exista um repositório confiável com todas as chaves públicas usadas. Os certificados foram inventados como uma solução para esse problema de distribuição de chave pública. Agora, uma Autoridade Certificadora (CA) pode atuar como uma Terceira Parte Confiável. CAs são entidades (por exemplo, empresas) que são confiáveis para assinar (emitir) certificados para outras entidades. Presume-se que as CAs criarão apenas certificados válidos e confiáveis, pois estão vinculadas por acordos legais. Existem muitas Autoridades Certificadoras públicas, como Comodo, DigiCert e GoDaddy.

Quais Aplicações usam Certificados?

Provavelmente a aplicação mais visível de certificados X.509 hoje está nos navegadores web (como Mozilla Firefox e Microsoft Internet Explorer) que suportam o protocolo TLS. TLS (Transport Layer Security) é um protocolo de segurança que fornece privacidade e autenticação para o seu tráfego de rede. Esses navegadores só podem usar este protocolo com servidores web que suportam TLS.

Outras tecnologias que dependem de certificados X.509 incluem:

  * Vários esquemas de assinatura de código, como Java ARchives assinados e Microsoft Authenticode.
  * Vários padrões de e-mail seguro, como PEM e S/MIME.

Como Obter um Certificado?

Existem duas técnicas básicas usadas para obter certificados:

  * Você pode criar um você mesmo (usando as ferramentas certas, como `keytool`).
  * Você pode pedir a uma Autoridade Certificadora para emitir um para você (diretamente ou usando uma ferramenta como `keytool` para gerar a solicitação).

As principais entradas para o processo de criação de certificado são:

  * Chaves públicas e privadas correspondentes, geradas usando algumas ferramentas especiais (como `keytool`) ou um navegador. Apenas a chave pública é mostrada a qualquer outra pessoa. A chave privada é usada para assinar dados; se alguém souber sua chave privada, poderá se passar por você... talvez forjando documentos legais atribuídos a você!
  * Você precisa fornecer informações sobre a entidade que está sendo certificada (por exemplo, você). Isso normalmente inclui informações como seu nome e endereço organizacional. Se você pedir a uma CA para emitir um certificado para você, normalmente precisará fornecer provas para demonstrar a correção das informações.

Se você está pedindo a uma CA para emitir um certificado para você, você fornece sua chave pública e algumas informações sobre você. Você usará uma ferramenta (como `keytool` ou um navegador que suporte a geração de Certificate Signing Request) para assinar digitalmente essas informações e enviá-las à CA. A CA então gerará o certificado e o retornará.

Se você estiver gerando o certificado por conta própria, você pegará as mesmas informações, adicionará um pouco mais (datas durante as quais o certificado é válido, um número de série) e simplesmente criará o certificado usando alguma ferramenta (como `keytool`). Nem todos aceitarão certificados autoassinados; uma parte do valor fornecido por uma CA é servir como um serviço de introdução neutro e confiável, baseado em parte em seus requisitos de verificação, que são publicados abertamente em suas Práticas de Serviço de Certificação (CSP).

O que há dentro de um Certificado X.509?

O padrão X.509 define quais informações podem ser incluídas em um certificado e descreve como escrevê-las (o formato dos dados). Todos os certificados X.509 possuem os seguintes dados, além da assinatura:

Version
    Isso identifica qual versão do padrão X.509 se aplica a este certificado, o que afeta quais informações podem ser especificadas nele. Até agora, três versões são definidas.
Serial Number
    A entidade que criou o certificado é responsável por atribuir-lhe um número de série para distingui-lo de outros certificados que ela emite. Esta informação é usada de várias maneiras, por exemplo, quando um certificado é revogado, seu número de série é colocado em uma Certificate Revocation List (CRL).
Signature Algorithm Identifier
    Isso identifica o algoritmo usado pela CA para assinar o certificado.
Issuer Name
    O nome X.500 da entidade que assinou o certificado. Normalmente, esta é uma CA. Usar este certificado implica confiar na entidade que o assinou. (Note que em alguns casos, como certificados de CA raiz ou de nível superior, o emissor assina seu próprio certificado.)
Validity Period
    Cada certificado é válido apenas por um período limitado de tempo. Este período é descrito por uma data e hora de início e uma data e hora de término, e pode ser tão curto quanto alguns segundos ou quase tão longo quanto um século. O período de validade escolhido depende de vários fatores, como a força da chave privada usada para assinar o certificado ou o valor que se está disposto a pagar por um certificado. Este é o período esperado em que as entidades podem confiar no valor público, se a chave privada associada não tiver sido comprometida.
Subject Name
    O nome da entidade cuja chave pública o certificado identifica. Este nome usa o padrão X.500, portanto, destina-se a ser único em toda a Internet. Este é o Distinguished Name (DN) da entidade, por exemplo,
```
    CN=Java Duke, OU=Java Software Division, O=Sun Microsystems Inc, C=US

```

(Estes se referem ao Common Name, Organizational Unit, Organization e Country do sujeito.)
Subject Public Key Information
    Esta é a chave pública da entidade nomeada, juntamente com um identificador de algoritmo que especifica a qual sistema criptográfico de chave pública esta chave pertence e quaisquer parâmetros de chave associados.

A versão 1 do X.509 está disponível desde 1988, é amplamente implantada e é a mais genérica.

A versão 2 do X.509 introduziu o conceito de identificadores únicos de sujeito e emissor para lidar com a possibilidade de reutilização de nomes de sujeito e/ou emissor ao longo do tempo. A maioria dos documentos de perfil de certificado recomenda fortemente que os nomes não sejam reutilizados e que os certificados não utilizem identificadores únicos. Os certificados da versão 2 não são amplamente utilizados.

A versão 3 do X.509 é a mais recente (1996) e suporta a noção de extensões, onde qualquer pessoa pode definir uma extensão e incluí-la no certificado. Algumas extensões comuns em uso hoje são: KeyUsage (limita o uso das chaves para propósitos específicos, como "apenas assinatura") e AlternativeNames (permite que outras identidades também sejam associadas a esta chave pública, por exemplo, nomes DNS, endereços de e-mail, endereços IP). As extensões podem ser marcadas como críticas para indicar que a extensão deve ser verificada e aplicada/usada. Por exemplo, se um certificado tiver a extensão KeyUsage marcada como crítica e definida como "keyCertSign", então, se este certificado for apresentado durante a comunicação SSL, ele deve ser rejeitado, pois a extensão do certificado indica que a chave privada associada deve ser usada apenas para assinar certificados e não para uso SSL.

Todos os dados em um certificado são codificados usando dois padrões relacionados chamados ASN.1/DER. Abstract Syntax Notation 1 descreve dados. As Distinguished Encoding Rules descrevem uma única maneira de armazenar e transferir esses dados.

Qual API Java Pode Ser Usada para Acessar e Gerenciar Certificados?

A Certificate API, encontrada no pacote [`java.security.cert`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/cert/package-summary.html>), inclui o seguinte:

  * A classe `CertificateFactory` define a funcionalidade de uma fábrica de certificados, que é usada para gerar objetos de certificado, lista de revogação de certificado (CRL) e caminho de certificação a partir de sua codificação.
  * A classe `Certificate` é uma classe abstrata para gerenciar uma variedade de certificados. É uma abstração para certificados que possuem diferentes formatos, mas usos comuns importantes. Por exemplo, diferentes tipos de certificados, como X.509 e PGP, compartilham funcionalidades gerais de certificado (como codificação e verificação) e alguns tipos de informações, como chave pública.
  * A classe `CRL` é uma classe abstrata para gerenciar uma variedade de Certificate Revocation Lists (CRLs).
  * A classe `X509Certificate` é uma classe abstrata para Certificados X.509. Ela fornece uma maneira padrão de acessar todos os atributos de um certificado X.509.
  * A interface `X509Extension` é uma interface para uma extensão X.509. As extensões definidas para certificados X.509 v3 e CRLs v2 (Certificate Revocation Lists) fornecem mecanismos para associar atributos adicionais a usuários ou chaves públicas, como para gerenciar a hierarquia de certificação e para gerenciar a distribuição de CRL.
  * A classe `X509CRL` é uma classe abstrata para uma X.509 Certificate Revocation List (CRL). Uma CRL é uma lista com carimbo de data/hora que identifica certificados revogados. Ela é assinada por uma Certification Authority (CA) e disponibilizada gratuitamente em um repositório público.
  * A classe `X509CRLEntry` é uma classe abstrata para uma entrada de CRL.

Qual Ferramenta Java Pode Gerar, Exibir, Importar e Exportar Certificados X.509?

Existe uma ferramenta chamada [`keytool`](<#/>) que pode ser usada para criar pares de chaves públicas/privadas e certificados X.509 v3, e para gerenciar keystores. Chaves e certificados são usados para assinar digitalmente suas aplicações e applets Java (consulte [`jarsigner`](<#/>)).

Um keystore é um banco de dados protegido que armazena chaves e certificados. O acesso a um keystore é protegido por uma senha (definida no momento em que o keystore é criado, pela pessoa que o cria, e alterável apenas mediante a apresentação da senha atual). Além disso, cada chave privada em um keystore pode ser protegida por sua própria senha.

Usando `keytool`, é possível exibir, importar e exportar certificados X.509 v1, v2 e v3 armazenados como arquivos, e gerar novos certificados v3. Para exemplos, consulte [`keytool`](<#/>) nas Java Development Kit Tool Specifications.

### Classes e Interfaces Principais

As classes principais da Java Certification Path API consistem em interfaces e classes que suportam a funcionalidade de caminho de certificação de maneira independente de algoritmo e implementação.

A API se baseia e estende o pacote `java.security.cert` existente para lidar com certificados. As classes principais podem ser divididas em 4 categorias de classes: Básicas, Validação, Construção e Armazenamento:

  * [Classes Básicas de Caminho de Certificação](<#/doc/guides/security/java-pki-programmers-guide>)

    * `CertPath`, `CertificateFactory` e `CertPathParameters`

  * [Classes de Validação de Caminho de Certificação](<#/doc/guides/security/java-pki-programmers-guide>)

    * `CertPathValidator`, `CertPathValidatorResult` e `CertPathChecker`

  * [Classes de Construção de Caminho de Certificação](<#/doc/guides/security/java-pki-programmers-guide>)

    * `CertPathBuilder` e `CertPathBuilderResult`

  * [Classes de Armazenamento de Certificados/CRLs](<#/doc/guides/security/java-pki-programmers-guide>)

    * `CertStore`, `CertStoreParameters`, `CertSelector` e `CRLSelector`

A Java Certification Path API também inclui um conjunto de classes específicas de algoritmo modeladas para uso com o algoritmo de validação de caminho de certificação PKIX definido na [RFC 5280](<http://www.ietf.org/rfc/rfc5280.txt>): Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile. As [Classes PKIX](<#/doc/guides/security/java-pki-programmers-guide>) são:

  * `TrustAnchor`

  * `PKIXParameters`

  * `PKIXCertPathValidatorResult`

  * `PKIXBuilderParameters`

  * `PKIXCertPathBuilderResult`

  * `PKIXCertPathChecker`

  * `PKIXRevocationChecker`

A documentação de referência completa para as classes relevantes da Certification Path API pode ser encontrada em [`java.security.cert` ](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/cert/package-summary.html>).

A maioria das classes e interfaces na CertPath API não são thread-safe. No entanto, existem algumas exceções, que serão observadas neste guia e na especificação da API. Múltiplas threads que precisam acessar um único objeto não thread-safe concorrentemente devem sincronizar entre si e fornecer o bloqueio necessário. Múltiplas threads, cada uma manipulando objetos separados, não precisam sincronizar.

Tópicos

[Classes Básicas de Caminho de Certificação](<#/doc/guides/security/java-pki-programmers-guide>)

[Classes de Validação de Caminho de Certificação](<#/doc/guides/security/java-pki-programmers-guide>)

[Classes de Construção de Caminho de Certificação](<#/doc/guides/security/java-pki-programmers-guide>)

[Classes de Armazenamento de Certificados/CRLs](<#/doc/guides/security/java-pki-programmers-guide>)

[Classes PKIX](<#/doc/guides/security/java-pki-programmers-guide>)

#### Classes Básicas de Caminho de Certificação

As classes básicas de caminho de certificação fornecem funcionalidade fundamental para codificar e representar caminhos de certificação. A principal classe básica na Java Certification Path API é `CertPath`, que encapsula os aspectos universais compartilhados por todos os tipos de caminhos de certificação. Uma aplicação usa uma instância da classe `CertificateFactory` para criar um objeto `CertPath`.

Tópicos

[A Classe CertPath](<#/doc/guides/security/java-pki-programmers-guide>)

[A Classe CertificateFactory](<#/doc/guides/security/java-pki-programmers-guide>)

[A Interface CertPathParameters](<#/doc/guides/security/java-pki-programmers-guide>)

##### A Classe CertPath

A classe `CertPath` é uma classe abstrata para caminhos de certificação. Ela define a funcionalidade compartilhada por todos os objetos de caminho de certificação. Vários tipos de caminho de certificação podem ser implementados por meio de subclasses da classe `CertPath`, mesmo que possam ter conteúdos e esquemas de ordenação diferentes.

Todos os objetos `CertPath` são `Serializable`, imutáveis e thread-safe e compartilham as seguintes características:

  * Um tipo

Isso corresponde ao tipo dos certificados no caminho de certificação, por exemplo: X.509. O tipo de um `CertPath` é obtido usando o método:
` public String getType()

```

Para tipos de certificado padrão, consulte CertificateFactory Types.

  * Uma lista de certificados

O método `getCertificates` retorna a lista de certificados no caminho de certificação:
` public abstract List<? extends Certificate> getCertificates()

```

Este método retorna uma `List` de zero ou mais objetos `java.security.cert.Certificate`. A `List` retornada e os `Certificates` contidos nela são imutáveis, a fim de proteger o conteúdo do objeto `CertPath`. A ordenação dos certificados retornados depende do tipo. Por convenção, os certificados em um objeto `CertPath` do tipo X.509 são ordenados começando com o certificado alvo e terminando com um certificado emitido pela âncora de confiança. Ou seja, o emissor de um certificado é o sujeito do seguinte. O certificado que representa o `TrustAnchor` não deve ser incluído no caminho de certificação. `CertPath`s X.509 não validados podem não seguir esta convenção. `[CertPathValidator](<#/doc/guides/security/java-pki-programmers-guide>)`s PKIX detectarão qualquer desvio dessas convenções que cause a invalidação do caminho de certificação e lançarão uma `CertPathValidatorException`.
  * Uma ou mais codificações

Cada objeto `CertPath` suporta uma ou mais codificações. Estas são formas codificadas externas para o caminho de certificação, usadas quando uma representação padrão do caminho é necessária fora da Java Virtual Machine (como ao transmitir o caminho por uma rede para outra parte). Cada caminho pode ser codificado em um formato padrão, cujos bytes são retornados usando o método:
` public abstract byte[] getEncoded()

```

Alternativamente, o método `getEncoded(String)` retorna uma codificação específica suportada, especificando o formato de codificação como uma `String` (ex: "PKCS7"). Para formatos de codificação padrão, consulte CertPath Encodings.
`public abstract byte[] getEncoded(String encoding)

```

Além disso, o método `getEncodings` retorna um iterador sobre as `String`s de formato de codificação suportadas (o formato de codificação padrão é retornado primeiro):
`public abstract Iterator&lt;String&gt; getEncodings()

```

Todos os objetos `CertPath` também são `Serializable`. Os objetos `CertPath` são resolvidos em um objeto `CertPath.CertPathRep` alternativo durante a serialização. Isso permite que um objeto `CertPath` seja serializado em uma representação equivalente, independentemente de sua implementação subjacente.

Objetos `CertPath` são gerados a partir de um array de bytes codificado ou lista de `Certificate`s usando uma `CertificateFactory`. Alternativamente, um `CertPathBuilder` pode ser usado para tentar encontrar um `CertPath` de uma CA mais confiável para um sujeito específico. Uma vez que um objeto `CertPath` tenha sido criado, ele pode ser validado passando-o para o método `validate` de `CertPathValidator`. Cada um desses conceitos é explicado em mais detalhes nas seções subsequentes.

##### A Classe CertificateFactory

A classe `CertificateFactory` é uma classe de motor que define a funcionalidade de uma fábrica de certificados. Ela é usada para gerar objetos `Certificate`, `CRL` e `CertPath`.

Uma `CertificateFactory` não deve ser confundida com um `CertPathBuilder`. Um `CertPathBuilder` (discutido posteriormente) é usado para descobrir ou encontrar um caminho de certificação quando um não existe. Em contraste, uma `CertificateFactory` é usada quando um caminho de certificação já foi descoberto e o chamador precisa instanciar um objeto `CertPath` a partir de seu conteúdo, que existe em uma forma diferente, como um array de bytes codificado ou um array de `Certificate`s.

Criando um Objeto CertificateFactory

Consulte a seção CertificateFactory a partir de sua codificação.") no Java Cryptography Architecture Reference Guide para obter os detalhes da criação de um objeto `CertificateFactory`.

Gerando Objetos CertPath

Uma instância de `CertificateFactory` gera objetos `CertPath` a partir de uma `List` de objetos `Certificate` ou de um `InputStream` que contém a forma codificada de um `CertPath`. Assim como um `CertPath`, cada `CertificateFactory` suporta um formato de codificação padrão para caminhos de certificação (ex: PKCS#7). Para gerar um objeto `CertPath` e inicializá-lo com os dados lidos de um fluxo de entrada (no formato de codificação padrão), use o método `generateCertPath`:
```
    public final CertPath generateCertPath(InputStream inStream)
```

ou a partir de um formato de codificação específico:
```
        public final CertPath generateCertPath(InputStream inStream,
```
                                               String encoding)

Para descobrir quais formatos de codificação são suportados, use o método `getCertPathEncodings` (a codificação padrão é retornada primeiro):
```
    public final Iterator<String> getCertPathEncodings()
```

Para gerar um objeto de caminho de certificação a partir de uma `List` de objetos `Certificate`, use o seguinte método:
```
    public final CertPath generateCertPath(List<? extends Certificate> certificates)
```

Uma `CertificateFactory` sempre retorna objetos `CertPath` que consistem em `Certificates` do mesmo tipo da fábrica. Por exemplo, uma `CertificateFactory` do tipo X.509 retorna objetos `CertPath` que consistem em certificados que são uma instância de `java.security.cert.X509Certificate`.

O seguinte exemplo de código ilustra a geração de um caminho de certificação a partir de uma resposta de certificado codificada em PKCS#7 armazenada em um arquivo:
```
        // open an input stream to the file
        FileInputStream fis = new FileInputStream(filename);
        // instantiate a CertificateFactory for X.509
        CertificateFactory cf = CertificateFactory.getInstance("X.509");
        // extract the certification path from
        // the PKCS7 SignedData structure
        CertPath cp = cf.generateCertPath(fis, "PKCS7");
        // print each certificate in the path
        List<Certificate> certs = cp.getCertificates();
        for (Certificate cert : certs) {
            System.out.println(cert);
        }
```

Aqui está outro exemplo de código que busca uma cadeia de certificados de um `KeyStore` e a converte para um `CertPath` usando uma `CertificateFactory`:
```
        // instantiate a KeyStore with type JKS
        KeyStore ks = KeyStore.getInstance("JKS");
        // load the contents of the KeyStore
        ks.load(new FileInputStream("./keystore"),
            "password".toCharArray());
        // fetch certificate chain stored with alias "sean"
        Certificate[] certArray = ks.getCertificateChain("sean");
        // convert chain to a List
        List certList = Arrays.asList(certArray);
        // instantiate a CertificateFactory for X.509
        CertificateFactory cf = CertificateFactory.getInstance("X.509");
        // extract the certification path from
        // the List of Certificates
        CertPath cp = cf.generateCertPath(certList);
```

Observe que existe um método existente em `CertificateFactory` chamado `generateCertificates` que analisa uma sequência de `Certificates`. Para codificações que consistem em múltiplos certificados, use `generateCertificates` quando quiser analisar uma coleção de certificados possivelmente não relacionados. Caso contrário, use `generateCertPath` quando quiser gerar um `CertPath` e subsequentemente validá-lo com um `CertPathValidator` (discutido posteriormente).

##### A Interface CertPathParameters

A interface `CertPathParameters` é uma representação transparente do conjunto de parâmetros usados com um construtor de caminho de certificação ou algoritmo de validação específico.

Seu principal objetivo é agrupar (e fornecer segurança de tipo para) todas as especificações de parâmetros de caminho de certificação. A interface `CertPathParameters` estende a interface `Cloneable` e define um método `clone()` que não lança uma exceção. Todas as implementações concretas desta interface devem implementar e sobrescrever o método `Object.clone()`, se necessário. Isso permite que as aplicações clonem qualquer objeto `CertPathParameters`.

Objetos que implementam a interface `CertPathParameters` são passados como argumentos para métodos das classes `CertPathValidator` e `CertPathBuilder`. Tipicamente, uma implementação concreta da interface `CertPathParameters` conterá um conjunto de parâmetros de entrada específicos para um determinado algoritmo de construção ou validação de caminho de certificação. Por exemplo, a classe `PKIXParameters` é uma implementação da interface `CertPathParameters` que contém um conjunto de parâmetros de entrada para o algoritmo de validação de caminho de certificação PKIX. Um desses parâmetros é o conjunto de CAs mais confiáveis que o chamador confia para ancorar o processo de validação. Este parâmetro, entre outros, é discutido em mais detalhes na seção que discute a classe `PKIXParameters`.

#### Classes de Validação de Caminho de Certificação

A API Java Certification Path inclui classes e interfaces para validar caminhos de certificação. Uma aplicação usa uma instância da classe `CertPathValidator` para validar um objeto `CertPath`. Se bem-sucedido, o resultado do algoritmo de validação é retornado em um objeto que implementa a interface `CertPathValidatorResult`.

Tópicos

A Classe CertPathValidator

A Interface CertPathValidatorResult

##### A Classe CertPathValidator

A classe `CertPathValidator` é uma classe de motor usada para validar um caminho de certificação.

Criando um Objeto CertPathValidator

Assim como em todas as classes de motor, a maneira de obter um objeto `CertPathValidator` para um algoritmo de validação específico é chamar um dos métodos de fábrica estáticos `getInstance` na classe `CertPathValidator`:
```
            public static CertPathValidator getInstance(String algorithm)
            public static CertPathValidator getInstance(String algorithm, 
                                                        String provider)
            public static CertPathValidator getInstance(String algorithm, 
                                                        Provider provider)
    
```

O parâmetro `algorithm` é o nome de um algoritmo de validação de caminho de certificação (por exemplo, "PKIX"). Nomes de algoritmos `CertPathValidator` padrão estão listados em Java Security Standard Algorithm Names.

Validando um Caminho de Certificação

Uma vez que um objeto `CertPathValidator` é criado, os caminhos podem ser validados chamando o método `validate`, passando a ele o caminho de certificação a ser validado e um conjunto de parâmetros específicos do algoritmo:
```
            public final CertPathValidatorResult 
                    validate(CertPath certPath, CertPathParameters params)
                    throws CertPathValidatorException, 
                           InvalidAlgorithmParameterException
    
```

Se o algoritmo de validação for bem-sucedido, o resultado é retornado em um objeto que implementa a interface `CertPathValidatorResult`. Caso contrário, uma `CertPathValidatorException` é lançada. A `CertPathValidatorException` contém métodos que retornam o `CertPath` e, se relevante, o índice do certificado que causou a falha do algoritmo e a exceção raiz ou causa da falha.

Observe que o `CertPath` e os `CertPathParameters` passados para o método `validate` devem ser de um tipo suportado pelo algoritmo de validação. Caso contrário, uma `InvalidAlgorithmParameterException` é lançada. Por exemplo, uma instância de `CertPathValidator` que implementa o algoritmo PKIX valida objetos `CertPath` do tipo X.509 e `CertPathParameters` que são uma instância de `PKIXParameters`.

##### A Interface CertPathValidatorResult

A interface `CertPathValidatorResult` é uma representação transparente do resultado bem-sucedido ou saída de um algoritmo de validação de caminho de certificação.

O principal objetivo desta interface é agrupar e fornecer segurança de tipo para todos os resultados de validação. Semelhante à interface `CertPathParameters`, `CertPathValidatorResult` estende `Cloneable` e define um método `clone()` que não lança uma exceção. Isso permite que as aplicações clonem qualquer objeto `CertPathValidatorResult`.

Objetos que implementam a interface `CertPathValidatorResult` são retornados pelo método `validate` da interface `CertPathValidatorResult` quando bem-sucedidos. Se não for bem-sucedido, uma `CertPathValidatorException` é lançada com uma descrição da falha. Tipicamente, uma implementação concreta da interface `CertPathValidatorResult` conterá um conjunto de parâmetros de saída específicos para um determinado algoritmo de validação de caminho de certificação. Por exemplo, a classe `PKIXCertPathValidatorResult` é uma implementação da interface `CertPathValidatorResult`, que contém métodos para obter os parâmetros de saída do algoritmo de validação de caminho de certificação PKIX. Um desses parâmetros é a árvore de políticas válida. Este parâmetro, entre outros, é discutido em mais detalhes na seção que discute a classe `PKIXCertPathValidatorResult`.

O seguinte exemplo de código mostra como criar um `CertPathValidator` e usá-lo para validar um caminho de certificação. O exemplo assume que os objetos `CertPath` e `CertPathParameters` que são passados para o método `validate` foram criados anteriormente; um exemplo mais completo será ilustrado na seção que descreve as classes PKIX.
```
        // create CertPathValidator that implements the "PKIX" algorithm
        CertPathValidator cpv = null;
        try {
            cpv = CertPathValidator.getInstance("PKIX");
        } catch (NoSuchAlgorithmException nsae) {
            System.err.println(nsae);
            System.exit(1);
        }
        // validate certification path ("cp") with specified parameters ("params")
        try {
            CertPathValidatorResult cpvResult = cpv.validate(cp, params);
        } catch (InvalidAlgorithmParameterException iape) {
            System.err.println("validation failed: " + iape);
            System.exit(1);
        } catch (CertPathValidatorException cpve) {
            System.err.println("validation failed: " + cpve);
            System.err.println("index of certificate that caused exception: "
                    + cpve.getIndex());
            System.exit(1);
        }
    
```

#### Classes de Construção de Caminho de Certificação

A API Java Certification Path inclui classes para construir (ou descobrir) caminhos de certificação. Uma aplicação usa uma instância da classe `CertPathBuilder` para construir um objeto `CertPath`. Se bem-sucedido, o resultado da construção é retornado em um objeto que implementa a interface `CertPathBuilderResult`.

Tópicos

A Classe CertPathBuilder

A Interface CertPathBuilderResult

##### A Classe CertPathBuilder

A classe `CertPathBuilder` é uma classe de motor usada para construir um caminho de certificação.

Criando um Objeto CertPathBuilder

Assim como em todas as classes de motor, a maneira de obter um objeto `CertPathBuilder` para um algoritmo de construção específico é chamar um dos métodos de fábrica estáticos `getInstance` na classe `CertPathBuilder`:
```
            public static CertPathBuilder getInstance(String algorithm)
            public static CertPathBuilder getInstance(String algorithm, 
                                                      String provider)
            public static CertPathBuilder getInstance(String algorithm, 
                                                      Provider provider)
    
```

O parâmetro `algorithm` é o nome de um algoritmo de construção de caminho de certificação (por exemplo, "PKIX"). Nomes de algoritmos `CertPathBuilder` padrão estão listados em Java Security Standard Algorithm Names.

Construindo um Caminho de Certificação

Uma vez que um objeto `CertPathBuilder` é criado, os caminhos podem ser construídos chamando o método `build`, passando a ele uma especificação de parâmetro específica do algoritmo:
```
            public final CertPathBuilderResult build(CertPathParameters params)
                    throws CertPathBuilderException, 
                           InvalidAlgorithmParameterException
    
```

Se o algoritmo de construção for bem-sucedido, o resultado é retornado em um objeto que implementa a interface `CertPathBuilderResult`. Caso contrário, uma `CertPathBuilderException` é lançada contendo informações sobre a falha; por exemplo, a exceção subjacente (se houver) e uma mensagem de erro.

Observe que os `CertPathParameters` passados para o método `build` devem ser de um tipo suportado pelo algoritmo de construção. Caso contrário, uma `InvalidAlgorithmParameterException` é lançada.

##### A Interface CertPathBuilderResult

A interface `CertPathBuilderResult` é uma representação transparente do resultado ou saída de um algoritmo de construção de caminho de certificação.

Esta interface contém um método para retornar o caminho de certificação que foi construído com sucesso:
```
            public CertPath getCertPath()
    
```

O propósito da interface `CertPathBuilderResult` é agrupar (e fornecer segurança de tipo para) todos os resultados de construção. Assim como a interface `CertPathValidatorResult`, `CertPathBuilderResult` estende `Cloneable` e define um método `clone()` que não lança uma exceção. Isso permite que as aplicações clonem qualquer objeto `CertPathBuilderResult`.

Objetos que implementam a interface `CertPathBuilderResult` são retornados pelo método `build` de `CertPathBuilder`.

O seguinte exemplo de código mostra como criar um `CertPathBuilder` e usá-lo para construir um caminho de certificação. O exemplo assume que o objeto `CertPathParameters` que é passado para o método `build` foi criado anteriormente; um exemplo mais completo será ilustrado na seção que descreve as classes PKIX.
```
        // create CertPathBuilder that implements the "PKIX" algorithm
        CertPathBuilder cpb = null;
        try {
            cpb = CertPathBuilder.getInstance("PKIX");
        } catch (NoSuchAlgorithmException nsae) {
            System.err.println(nsae);
            System.exit(1);
        }
        // build certification path using specified parameters ("params")
        try {
            CertPathBuilderResult cpbResult = cpb.build(params);
            CertPath cp = cpbResult.getCertPath();
            System.out.println("build passed, path contents: " + cp);
        } catch (InvalidAlgorithmParameterException iape) {
            System.err.println("build failed: " + iape);
            System.exit(1);
        } catch (CertPathBuilderException cpbe) {
            System.err.println("build failed: " + cpbe);
            System.exit(1);
        }
    
```

#### Classes de Armazenamento de Certificados/CRLs

A API Java Certification Path inclui a classe `CertStore` para recuperar certificados e CRLs de um repositório.

Esta classe permite que um chamador especifique o repositório que uma implementação de `CertPathValidator` ou `CertPathBuilder` deve usar para encontrar certificados e CRLs. Consulte o método `addCertStores` da classe `PKIXParameters`.

Uma implementação de `CertPathValidator` pode usar o objeto `CertStore` que o chamador especifica como um mecanismo de callback para buscar CRLs para realizar verificações de revogação. Da mesma forma, um `CertPathBuilder` pode usar o `CertStore` como um mecanismo de callback para buscar certificados e, se estiver realizando verificações de revogação, CRLs.

Tópicos

A Classe CertStore.")

A Interface CertStoreParameters

As Interfaces CertSelector e CRLSelector

##### A Classe CertStore

A classe `CertStore` é uma classe de motor usada para fornecer a funcionalidade de um repositório de certificados e lista de revogação de certificados (CRL).

Esta classe pode ser usada por implementações de `CertPathBuilder` e `CertPathValidator` para encontrar certificados e CRLs, ou como um mecanismo de recuperação de certificados e CRLs de propósito geral.

Ao contrário da classe `java.security.KeyStore`, que fornece acesso a um cache de chaves privadas e certificados confiáveis, um `CertStore` é projetado para fornecer acesso a um repositório potencialmente vasto de certificados e CRLs não confiáveis. Por exemplo, uma implementação LDAP de `CertStore` fornece acesso a certificados e CRLs armazenados em um ou mais diretórios usando o protocolo LDAP.

Todos os métodos públicos de objetos `CertStore` são thread-safe. Ou seja, múltiplas threads podem invocar esses métodos concorrentemente em um único objeto `CertStore` (ou mais de um) sem efeitos adversos. Isso permite que um `CertPathBuilder` procure por uma CRL enquanto simultaneamente procura por outros certificados, por exemplo.

Criando um Objeto CertStore

Assim como em todas as classes de motor, a maneira de obter um objeto `CertStore` para um tipo de repositório específico é chamar um dos métodos de fábrica estáticos `getInstance` na classe `CertStore`:
```
            public static CertStore getInstance(String type, 
                    CertStoreParameters params)
            public static CertStore getInstance(String type,
                    CertStoreParameters params, String provider)
            public static CertStore getInstance(String type,
                    CertStoreParameters params, Provider provider)
    
```

O parâmetro `type` é o nome de um tipo de repositório de certificados (por exemplo, "LDAP"). Tipos `CertStore` padrão estão listados em Java Security Standard Algorithm Names.

Os parâmetros de inicialização (`params`) são específicos para o tipo de repositório. Por exemplo, os parâmetros de inicialização para um repositório baseado em servidor podem incluir o nome do host e a porta do servidor. Uma `InvalidAlgorithmParameterException` é lançada se os parâmetros forem inválidos para este tipo de `CertStore`. O método `getCertStoreParameters` retorna os `CertStoreParameters` que foram usados para inicializar um `CertStore`:
```
            public final CertStoreParameters getCertStoreParameters()
    
```

Recuperando Certificados

Depois de criar um objeto `CertStore`, você pode recuperar certificados do repositório usando o método `getCertificates`. Este método recebe um objeto `CertSelector` (discutido em mais detalhes posteriormente) como argumento, que especifica um conjunto de critérios de seleção para determinar quais certificados devem ser retornados:
```
            public final Collection<? extends Certificate> getCertificates(CertSelector selector) 
                    throws CertStoreException
    
```

Este método retorna uma `Collection` de objetos `java.security.cert.Certificate` que satisfazem os critérios de seleção. Uma `Collection` vazia é retornada se não houver correspondências. Uma `CertStoreException` é geralmente lançada se uma condição de erro inesperada for encontrada, como uma falha de comunicação com um repositório remoto.

Para algumas implementações de `CertStore`, pode não ser viável pesquisar todo o repositório por certificados ou CRLs que correspondam aos critérios de seleção especificados. Nestes casos, a implementação de `CertStore` pode usar informações especificadas nos seletores para localizar certificados e CRLs. Por exemplo, um `CertStore` LDAP pode não pesquisar todas as entradas no diretório. Em vez disso, ele pode pesquisar apenas entradas que provavelmente contêm os certificados que está procurando. Se o `CertSelector` fornecido não fornecer informações suficientes para o `CertStore` LDAP determinar em quais entradas ele deve procurar, o `CertStore` LDAP pode lançar uma `CertStoreException`.

Recuperando CRLs

Você também pode recuperar CRLs do repositório usando o método `getCRLs`. Este método recebe um objeto `CRLSelector` (discutido em mais detalhes posteriormente) como argumento, que especifica um conjunto de critérios de seleção para determinar quais CRLs devem ser retornadas:
```
            public final Collection<? extends CRL> getCRLs(CRLSelector selector) 
                    throws CertStoreException
    
```

Este método retorna uma `Collection` de objetos `java.security.cert.CRL` que satisfazem os critérios de seleção. Uma `Collection` vazia é retornada se não houver correspondências.

##### A Interface CertStoreParameters

A interface `CertStoreParameters` é uma representação transparente do conjunto de parâmetros usados com um `CertStore` específico.

O principal objetivo desta interface é agrupar e fornecer segurança de tipo para todas as especificações de parâmetros de armazenamento de certificados. A interface `CertStoreParameters` estende a interface `Cloneable` e define um método `clone` que não lança uma exceção. As implementações desta interface devem implementar e sobrescrever o método `Object.clone()`, se necessário. Isso permite que as aplicações clonem qualquer objeto `CertStoreParameters`.

Objetos que implementam a interface `CertStoreParameters` são passados como argumentos para o método `getInstance` da classe `CertStore`. Duas classes que implementam a interface `CertStoreParameters` são definidas nesta API: a classe `LDAPCertStoreParameters` e a classe `CollectionCertStoreParameters`.

A Classe LDAPCertStoreParameters

A classe `LDAPCertStoreParameters` é uma implementação da interface `CertStoreParameters` e contém um conjunto de parâmetros de inicialização mínimos (host e número da porta do servidor de diretório) para recuperar certificados e CRLs de um `CertStore` do tipo LDAP.

Consulte ``LDAPCertStoreParameters``.

A Classe CollectionCertStoreParameters

A classe `CollectionCertStoreParameters` é uma implementação da interface `CertStoreParameters` e contém um conjunto de parâmetros de inicialização para recuperar certificados e CRLs de um `CertStore` do tipo Collection.

Consulte ``CollectionCertStoreParameters``.

##### As Interfaces CertSelector e CRLSelector

As interfaces `CertSelector` e `CRLSelector` são uma especificação do conjunto de critérios para selecionar certificados e CRLs de uma coleção ou grande grupo de certificados e CRLs.

As interfaces agrupam e fornecem segurança de tipo para todas as especificações de seletor. Cada interface de seletor estende `Cloneable` e define um método `clone()` que não lança uma exceção. Isso permite que as aplicações clonem qualquer objeto `CertSelector` ou `CRLSelector`.

As interfaces `CertSelector` e `CRLSelector` cada uma define um método chamado `match`. O método `match` recebe um objeto `Certificate` ou `CRL` como argumento e retorna `true` se o objeto satisfaz os critérios de seleção. Caso contrário, ele retorna `false`. O método `match` para a interface `CertSelector` é definido da seguinte forma:
```
            public boolean match(Certificate cert)
    
```

e para a interface `CRLSelector`:
```
            public boolean match(CRL crl)
    
```

Tipicamente, objetos que implementam essas interfaces são passados como parâmetros para os métodos `getCertificates` e `getCRLs` da classe `CertStore`. Esses métodos retornam uma `Collection` de `Certificate`s ou `CRL`s do repositório `CertStore` que correspondem aos critérios de seleção especificados. `CertSelector`s também podem ser usados para especificar as restrições de validação em um certificado de destino ou de entidade final em um caminho de certificação (veja, por exemplo, o método ` PKIXParameters.setTargetCertConstraints`).

###### A Classe X509CertSelector

A classe `X509CertSelector` é uma implementação da interface `CertSelector` que define um conjunto de critérios para selecionar certificados X.509.

Um objeto `X509Certificate` deve corresponder a todos os critérios especificados para ser selecionado pelo método `match`. Os critérios de seleção são projetados para serem usados por uma implementação de `CertPathBuilder` para descobrir certificados potenciais enquanto constrói um caminho de certificação X.509.

Por exemplo, o método `setSubject` de `X509CertSelector` permite que um `CertPathBuilder` PKIX filtre `X509Certificate`s que não correspondem ao nome do emissor do `X509Certificate` precedente em uma cadeia parcialmente completa. Ao definir este e outros critérios em um objeto `X509CertSelector`, um `CertPathBuilder` é capaz de descartar certificados irrelevantes e encontrar mais facilmente um caminho de certificação X.509 que atenda aos requisitos especificados no objeto `CertPathParameters`.

Consulte RFC 5280 para definições das extensões de certificado X.509 mencionadas nesta seção.

Criando um Objeto X509CertSelector

Um objeto `X509CertSelector` é criado chamando o construtor padrão:
```
            public X509CertSelector()
    
```

Nenhum critério é definido inicialmente (qualquer `X509Certificate` corresponderá).

Definindo Critérios de Seleção

Os critérios de seleção permitem que um chamador faça a correspondência em diferentes componentes de um certificado X.509. Alguns dos métodos para definir critérios de seleção são descritos aqui. Consulte ``X509CertSelector``.

Os métodos `setIssuer` definem o critério de emissor:
```
            public void setIssuer(X500Principal issuer)
            public void setIssuer(String issuerDN)
            public void setIssuer(byte[] issuerDN)
    
```

O nome distinto especificado (em `X500Principal`, String RFC 2253 ou formato codificado ASN.1 DER) deve corresponder ao nome distinto do emissor no certificado. Se nulo, qualquer nome distinto do emissor servirá. Observe que o uso de um `X500Principal` para representar um nome distinto é preferível porque é mais eficiente e adequadamente tipado.

Da mesma forma, os métodos `setSubject` definem o critério de assunto:
```
            public void setSubject(X500Principal subject)
            public void setSubject(String subjectDN)
            public void setSubject(byte[] subjectDN)
    
```

O nome distinto especificado (em `X500Principal`, String RFC 2253 ou formato codificado ASN.1 DER) deve corresponder ao nome distinto do assunto no certificado. Se nulo, qualquer nome distinto do assunto servirá.

O método `setSerialNumber` define o critério serialNumber:
```
            public void setSerialNumber(BigInteger serial)
    
```

O número de série especificado deve corresponder ao número de série do certificado no certificado. Se nulo, qualquer número de série do certificado servirá.

O método `setAuthorityKeyIdentifier` define o critério authorityKeyIdentifier:
```
            public void setAuthorityKeyIdentifier(byte[] authorityKeyID)
    
```

O certificado deve conter uma extensão Authority Key Identifier que corresponda ao valor especificado. Se nulo, nenhuma verificação será feita no critério authorityKeyIdentifier.

O método `setCertificateValid` define o critério certificateValid:
```
            public void setCertificateValid(Date certValid)
    
```

A data especificada deve estar dentro do período de validade do certificado. Se nulo, qualquer data é válida.

O método `setKeyUsage` define o critério keyUsage:
```
            public void setKeyUsage(boolean[] keyUsage)
    
```

A extensão Key Usage do certificado deve permitir os valores de uso de chave especificados (aqueles que estão definidos como true). Se nulo, nenhuma verificação de keyUsage será feita.

Obtendo Critérios de Seleção

Os valores atuais para cada um dos critérios de seleção podem ser recuperados usando um método `get` apropriado. Consulte ``X509CertSelector``.

Aqui está um exemplo de recuperação de certificados X.509 de um `CertStore` LDAP com a classe `X509CertSelector`.

Primeiro, criamos o objeto `LDAPCertStoreParameters` que usaremos para inicializar o objeto `CertStore` com o nome do host e a porta do servidor LDAP:
```
            LDAPCertStoreParameters lcsp = new 
                    LDAPCertStoreParameters("ldap.sun.com", 389);
    
```

Em seguida, criamos o objeto `CertStore.")`, e passamos a ele o objeto `LDAPCertStoreParameters`, como na seguinte declaração:
```
            CertStore cs = CertStore.getInstance("LDAP", lcsp);
    
```

Esta chamada cria um objeto `CertStore` que recupera certificados e CRLs de um repositório LDAP usando o esquema definido na RFC 2587.

O seguinte bloco de código estabelece um `X509CertSelector` para recuperar todos os certificados de entidade final não expirados (a partir da data e hora atuais) emitidos para um assunto específico com 1) um uso de chave que permite assinaturas digitais, e 2) um nome alternativo de assunto com um endereço de e-mail específico:
```java
            X509CertSelector xcs = new X509CertSelector();
    
            // select only unexpired certificates
            xcs.setCertificateValid(new Date());
    
            // select only certificates issued to
            // 'CN=alice, O=xyz, C=us'
            xcs.setSubject(new X500Principal("CN=alice, O=xyz, C=us"));
    
            // select only end-entity certificates
            xcs.setBasicConstraints(-2);
    
            // select only certificates with a digitalSignature
            // keyUsage bit set (set the first entry in the
            // boolean array to true)
            boolean[] keyUsage = {true};
            xcs.setKeyUsage(keyUsage);
    
            // select only certificates with a subjectAltName of
            // 'alice@xyz.example.com' (1 is the integer value of 
            // an RFC822Name)
            xcs.addSubjectAlternativeName(1, "alice@xyz.example.com");
    
```

Em seguida, passamos o seletor para o método `getCertificates` do nosso objeto `CertStore` que criamos anteriormente:
```java
            Collection<Certificate> certs = cs.getCertificates(xcs);
    
```

Um `CertPathBuilder` PKIX pode usar um código semelhante para ajudar a descobrir e classificar certificados potenciais, descartando aqueles que não atendem às restrições de validação ou outros critérios.

###### A Classe X509CRLSelector

A classe `X509CRLSelector` é uma implementação da interface `CRLSelector` que define um conjunto de critérios para selecionar CRLs X.509.

Um objeto `X509CRL` deve corresponder a todos os critérios especificados para ser selecionado pelo método `match`. Os critérios de seleção são projetados para serem úteis para uma implementação de `CertPathValidator` ou `CertPathBuilder` que deve recuperar CRLs de um repositório para verificar o status de revogação de certificados em um caminho de certificação X.509.

Por exemplo, o método `setDateAndTime` de `X509CRLSelector` permite que um `CertPathValidator` PKIX filtre `X509CRL`s que foram emitidos após ou expiram antes do tempo indicado. Ao definir este e outros critérios em um objeto `X509CRLSelector`, ele permite que o `CertPathValidator` descarte CRLs irrelevantes e verifique mais facilmente se um certificado foi revogado.

Consulte RFC 5280 para definições dos campos e extensões de CRL X.509 mencionados nesta seção.

Criando um Objeto X509CRLSelector

Um objeto `X509CRLSelector` é criado chamando o construtor padrão:
```java
            public X509CRLSelector()
    
```

Nenhum critério é definido inicialmente (qualquer `X509CRL` corresponderá).

Definindo Critérios de Seleção

Os critérios de seleção permitem que um chamador faça a correspondência em diferentes componentes de uma CRL X.509. A maioria dos métodos para definir critérios de seleção é descrita aqui. Consulte a documentação da API da ``Classe X509CRLSelector`` para detalhes sobre os métodos restantes.

Os métodos `setIssuers` e `setIssuerNames` definem o critério `issuerNames`:
```java
            public void setIssuers(Collection<X500Principal> issuers)
            public void setIssuerNames(Collection<?> names)
    
```

O nome distinto do emissor na CRL deve corresponder a pelo menos um dos nomes distintos especificados. O método `setIssuers` é preferível, pois o uso de `X500Principal`s para representar nomes distintos é mais eficiente e tipado de forma adequada. Para o método `setIssuerNames`, cada entrada do argumento `names` é uma `String` ou um `byte array` (representando o nome, na forma codificada RFC 2253 ou ASN.1 DER, respectivamente). Se for `null`, qualquer nome distinto do emissor servirá.

Os métodos `setMinCRLNumber` e `setMaxCRLNumber` definem o critério `minCRLNumber` e `maxCRLNumber`:
```java
            public void setMinCRLNumber(BigInteger minCRL)
            public void setMaxCRLNumber(BigInteger maxCRL)
    
```

A CRL deve ter uma extensão CRL Number cujo valor seja maior ou igual ao valor especificado se o método `setMinCRLNumber` for chamado, e menor ou igual ao valor especificado se o método `setMaxCRLNumber` for chamado. Se o valor passado para um desses métodos for `null`, a verificação correspondente não será realizada.

O método `setDateAndTime` define o critério `dateAndTime`:
```java
            public void setDateAndTime(Date dateAndTime)
    
```

A data especificada deve ser igual ou posterior ao valor do componente `thisUpdate` da CRL e anterior ao valor do componente `nextUpdate`. Se for `null`, nenhuma verificação de `dateAndTime` será realizada.

O método `setCertificateChecking` define o certificado cujo status de revogação está sendo verificado:
```java
            public void setCertificateChecking(X509Certificate cert)
    
```

Este não é um critério. Em vez disso, é uma informação opcional que pode ajudar um `CertStore` a encontrar CRLs que seriam relevantes ao verificar a revogação para o certificado especificado. Se `null` for especificado, nenhuma informação opcional será fornecida. Uma aplicação deve sempre chamar este método ao verificar a revogação para um certificado específico, pois ele pode fornecer ao `CertStore` mais informações para encontrar as CRLs corretas e filtrar as irrelevantes.

Obtendo Critérios de Seleção

Os valores atuais para cada um dos critérios de seleção podem ser recuperados usando um método `get` apropriado. Consulte a documentação da API da ``Classe X509CRLSelector`` para mais detalhes sobre esses métodos.

Criar um `X509CRLSelector` para recuperar CRLs de um repositório LDAP é semelhante ao exemplo de `X509CertSelector`. Suponha que queremos recuperar todas as CRLs atuais (a partir da data e hora atuais) emitidas por uma CA específica e com um número de CRL mínimo. Primeiro, criamos um objeto `X509CRLSelector` e chamamos os métodos apropriados para definir os critérios de seleção:
```java
            X509CRLSelector xcrls = new X509CRLSelector();
            // select CRLs satisfying current date and time
            xcrls.setDateAndTime(new Date());
            // select CRLs issued by 'O=xyz, C=us'
            xcrls.addIssuerName("O=xyz, C=us");
            // select only CRLs with a CRL number at least '2'
            xcrls.setMinCRLNumber(new BigInteger("2"));
    
```

Em seguida, passamos o seletor para o método `getCRLs` do nosso objeto `CertStore` (criado no exemplo de `X509CertSelector`):
```java
            Collection<CRL> crls = cs.getCRLs(xcrls);
    
```

#### Classes PKIX

A API Java Certification Path inclui um conjunto de classes específicas de algoritmo modeladas para uso com o algoritmo de validação de caminho de certificação PKIX.

O algoritmo de validação de caminho de certificação PKIX é definido na RFC 5280: Perfil de Certificado e Lista de Revogação de Certificados (CRL) da Infraestrutura de Chave Pública X.509 da Internet.

Tópicos

A Classe TrustAnchor

A Classe PKIXParameters

A Interface CertPathValidatorResult

A Interface PolicyNode e a Classe PolicyQualifierInfo

A Classe PKIXBuilderParameters

A Classe PKIXCertPathBuilderResult

A Classe PKIXCertPathChecker

Usando PKIXCertPathChecker na Validação de Caminho de Certificado

##### A Classe TrustAnchor

A classe `TrustAnchor` representa uma "CA mais confiável", que é usada como uma âncora de confiança para validar caminhos de certificação X.509.

Um `TrustAnchor` inclui a chave pública da CA, o nome da CA e quaisquer restrições no conjunto de caminhos que podem ser validados usando esta chave. Esses parâmetros podem ser especificados na forma de um `X509Certificate` confiável ou como parâmetros individuais.

Todos os objetos `TrustAnchor` são imutáveis e thread-safe. Ou seja, múltiplas threads podem invocar concorrentemente os métodos definidos nesta classe em um único objeto `TrustAnchor` (ou mais de um) sem efeitos adversos. Exigir que os objetos `TrustAnchor` sejam imutáveis e thread-safe permite que eles sejam passados para várias partes do código sem se preocupar em coordenar o acesso.

Nota:

Embora esta classe seja descrita como uma classe PKIX, ela pode ser usada com outros algoritmos de validação de caminho de certificação X.509.

Criando um Objeto TrustAnchor

Para instanciar um objeto `TrustAnchor`, um chamador deve especificar "a CA mais confiável" como um `X509Certificate` confiável ou um par de chave pública e nome distinto. O chamador também pode, opcionalmente, especificar restrições de nome que são aplicadas à âncora de confiança pelo algoritmo de validação durante a inicialização. Observe que o suporte para restrições de nome em âncoras de confiança não é exigido pelo algoritmo PKIX, portanto, um `CertPathValidator` ou `CertPathBuilder` PKIX pode optar por não suportar este parâmetro e, em vez disso, lançar uma exceção. Use um dos seguintes construtores para criar um objeto `TrustAnchor`:
```java
            public TrustAnchor(X509Certificate trustedCert, 
                    byte[] nameConstraints)
            public TrustAnchor(X500Principal caPrincipal, PublicKey pubKey, 
                    byte[] nameConstraints)
            public TrustAnchor(String caName, PublicKey pubKey, 
                    byte[] nameConstraints)
    
```

O parâmetro `nameConstraints` é especificado como um `byte array` contendo a codificação ASN.1 DER de uma extensão `NameConstraints`. Uma `IllegalArgumentException` é lançada se as restrições de nome não puderem ser decodificadas (não estiverem formatadas corretamente).

Obtendo Valores de Parâmetros

Cada um dos parâmetros pode ser recuperado usando um método `get` correspondente:
```java
            public final X509Certificate getTrustedCert()
            public final X500Principal getCA()
            public final String getCAName()
            public final PublicKey getCAPublicKey()
            public final byte[] getNameConstraints()
    
```

Nota:

O método `getTrustedCert` retorna `null` se a âncora de confiança foi especificada como um par de chave pública e nome. Da mesma forma, os métodos `getCA`, `getCAName` e `getCAPublicKey` retornam `null` se a âncora de confiança foi especificada como um `X509Certificate`.

##### A Classe PKIXParameters

A classe `PKIXParametersClass` especifica o conjunto de parâmetros de entrada definidos pelo algoritmo de validação de caminho de certificação PKIX. Ela também inclui alguns parâmetros úteis adicionais.

Esta classe implementa a interface `CertPathParameters`.

Um objeto `CertPath` X.509 e um objeto `PKIXParameters` são passados como argumentos para o método `validate` de uma instância de `CertPathValidator` que implementa o algoritmo PKIX. O `CertPathValidator` usa os parâmetros para inicializar o algoritmo de validação de caminho de certificação PKIX.

Criando um Objeto PKIXParameters

Para instanciar um objeto `PKIXParameters`, um chamador deve especificar "a(s) CA(s) mais confiável(eis)" conforme definido pelo algoritmo de validação PKIX. As CAs mais confiáveis podem ser especificadas usando um de dois construtores:
```java
            public PKIXParameters(Set<TrustAnchor> trustAnchors) 
                throws InvalidAlgorithmParameterException
            public PKIXParameters(KeyStore keystore)
                throws KeyStoreException, InvalidAlgorithmParameterException
    
```

O primeiro construtor permite que o chamador especifique as CAs mais confiáveis como um `Set` de objetos `TrustAnchor`. Alternativamente, um chamador pode usar o segundo construtor e especificar uma instância de `KeyStore` contendo entradas de certificado confiáveis, cada uma das quais será considerada uma CA mais confiável.

Definindo Valores de Parâmetros

Depois que um objeto `PKIXParameters` é criado, um chamador pode definir (ou substituir o valor atual de) vários parâmetros. Alguns dos métodos para definir parâmetros são descritos aqui. Consulte a documentação da API ` PKIXParameters ` para detalhes sobre os outros métodos.

O método `setInitialPolicies` define os identificadores de política iniciais, conforme especificado pelo algoritmo de validação PKIX. Os elementos do `Set` são identificadores de objeto (OIDs) representados como uma `String`. Se o parâmetro `initialPolicies` for `null` ou não for definido, qualquer política é aceitável:
```java
            public void setInitialPolicies(Set<String> initialPolicies)
    
```

O método `setDate` define o tempo para o qual a validade do caminho deve ser determinada. Se o parâmetro `date` não for definido ou for `null`, a data atual é usada:
```java
            public void setDate(Date date)
    
```

O método `setPolicyMappingInhibited` define o valor do flag de inibição de mapeamento de política. O valor padrão para o flag, se não especificado, é `false`:
```java
            public void setPolicyMappingInhibited(boolean val)
    
```

O método `setExplicitPolicyRequired` define o valor do flag de política explícita requerida. O valor padrão para o flag, se não especificado, é `false`:
```java
            public void setExplicitPolicyRequired(boolean val)
    
```

O método `setAnyPolicyInhibited` define o valor do flag de inibição de qualquer política. O valor padrão para o flag, se não especificado, é `false`:
```java
            public void setAnyPolicyInhibited(boolean val)
    
```

O método `setTargetCertConstraints` permite que o chamador defina restrições no certificado de destino ou de entidade final. Por exemplo, o chamador pode especificar que o certificado de destino deve conter um nome de assunto específico. As restrições são especificadas como um objeto `CertSelector`. Se o parâmetro `selector` for `null` ou não for definido, nenhuma restrição será definida no certificado de destino:
```java
            public void setTargetCertConstraints(CertSelector selector)
    
```

O método `setCertStores` permite que um chamador especifique uma `List` de objetos `CertStore` que serão usados por uma implementação PKIX de `CertPathValidator` para encontrar CRLs para validação de caminho. Isso fornece um mecanismo extensível para especificar onde localizar CRLs. O método `setCertStores` recebe uma `List` de objetos `CertStore` como parâmetro. Os primeiros `CertStore`s na lista podem ser preferidos em relação aos que aparecem mais tarde.
```java
            public void setCertStores(List<CertStore> stores)
    
```

O método `setCertPathCheckers` permite que um chamador estenda o algoritmo de validação PKIX criando verificadores de caminho de certificação específicos da implementação. Por exemplo, este mecanismo pode ser usado para processar extensões de certificado privadas. O método `setCertPathCheckers` recebe uma lista de objetos `PKIXCertPathChecker` (discutidos posteriormente) como parâmetro:
```java
            public void setCertPathCheckers(List<PKIXCertPathChecker> checkers)
    
```

O método `setRevocationEnabled` permite que um chamador desabilite a verificação de revogação. A verificação de revogação é habilitada por padrão, pois é uma verificação exigida pelo algoritmo de validação PKIX. No entanto, o PKIX não define como a revogação deve ser verificada. Uma implementação pode usar CRLs ou OCSP, por exemplo. Este método permite que o chamador desabilite o mecanismo de verificação de revogação padrão da implementação se não for apropriado. Um mecanismo de verificação de revogação diferente pode então ser especificado chamando o método `setCertPathCheckers` e passando-lhe um `PKIXCertPathChecker` que implementa o mecanismo alternativo.
```java
            public void setRevocationEnabled(boolean val)
    
```

O método `setPolicyQualifiersRejected` permite que um chamador habilite ou desabilite o processamento de qualificadores de política. Quando um objeto `PKIXParameters` é criado, este flag é definido como `true`. Esta configuração reflete a estratégia mais comum (e mais simples) para processar qualificadores de política. Aplicações que desejam usar uma política mais sofisticada devem definir este flag como `false`.
```java
            public void setPolicyQualifiersRejected(boolean qualifiersRejected)
    
```

Obtendo Valores de Parâmetros

Os valores atuais para cada um dos parâmetros podem ser recuperados usando um método `get` apropriado. Consulte a documentação da API da ``Classe PKIXParameters`` para mais detalhes sobre esses métodos.

##### A Classe PKIXCertPathValidatorResult

A classe `PKIXCertPathValidatorResult` representa o resultado do algoritmo de validação de caminho de certificação PKIX.

Esta classe implementa a interface `CertPathValidatorResult`. Ela contém a árvore de políticas válida e a chave pública do assunto resultantes do algoritmo de validação, e inclui métodos (`getPolicyTree()` e `getPublicKey()`) para retorná-los. Instâncias de `PKIXCertPathValidatorResult` são retornadas pelo método `validate` de objetos `CertPathValidator` que implementam o algoritmo PKIX.

Consulte a documentação da API ``PKIXCertPathValidatorResult`` para obter informações mais detalhadas sobre esta classe.

##### A Interface PolicyNode e a Classe PolicyQualifierInfo

O algoritmo de validação PKIX define várias saídas relacionadas ao processamento de políticas de certificado. A maioria das aplicações não precisará usar essas saídas, mas todos os provedores que implementam o algoritmo de validação ou construção PKIX devem suportá-las.

A interface `PolicyNode` representa um nó de uma árvore de políticas válida resultante de uma execução bem-sucedida da validação de caminho de certificação PKIX. Uma aplicação pode obter a raiz de uma árvore de políticas válida usando o método `getPolicyTree` de `PKIXCertPathValidatorResult`. Árvores de Políticas são discutidas em mais detalhes na RFC 5280.

O método `getPolicyQualifiers` de `PolicyNode` retorna um `Set` de objetos `PolicyQualifierInfo`, cada um dos quais representa um qualificador de política contido na extensão `Certificate Policies` do certificado relevante ao qual esta política se aplica.

A maioria das aplicações não precisará examinar a árvore de políticas válida e os qualificadores de política. Elas podem atingir seus objetivos de processamento de política definindo os parâmetros relacionados à política em `PKIXParameters`. No entanto, a árvore de políticas válida está disponível para aplicações mais sofisticadas, especialmente aquelas que processam qualificadores de política.

Consulte a documentação da API ``Interface PolicyNode`` e ``PolicyQualifierInfo`` para obter informações mais detalhadas sobre essas classes.

Exemplo 9-1 Exemplo de Validação de um Caminho de Certificação usando o algoritmo PKIX

Este é um exemplo de validação de um caminho de certificação com o algoritmo de validação PKIX. O exemplo ignora a maior parte do tratamento de exceções e assume que o caminho de certificação e a chave pública da âncora de confiança já foram criados.

Primeiro, crie o `CertPathValidator`, como na linha a seguir:
```java
        CertPathValidator cpv = CertPathValidator.getInstance("PKIX");
    
```

O próximo passo é criar um objeto `TrustAnchor`. Este será usado como uma âncora para validar o caminho de certificação. Neste exemplo, a CA mais confiável é especificada como um par de chave pública e nome (restrições de nome não são aplicadas e são especificadas como `null`):
```java
        TrustAnchor anchor = new TrustAnchor("O=xyz,C=us", pubkey, null);
    
```

O próximo passo é criar um objeto `PKIXParameters`. Este será usado para preencher os parâmetros utilizados pelo algoritmo PKIX. Neste exemplo, passamos ao construtor um `Set` contendo um único elemento - o `TrustAnchor` que criamos na etapa anterior:
```java
        PKIXParameters params = new PKIXParameters(Collections.singleton(anchor));
    
```

Em seguida, preenchemos o objeto de parâmetros com restrições ou outros parâmetros usados pelo algoritmo de validação. Neste exemplo, habilitamos o flag `explicitPolicyRequired` e especificamos um conjunto de OIDs de política inicial (o conteúdo do conjunto não é mostrado):
```java
        // set other PKIX parameters here
        params.setExplicitPolicyRequired(true);
        params.setInitialPolicies(policyIds);
    
```

O passo final é validar o caminho de certificação usando o conjunto de parâmetros de entrada que criamos:
```java
        try {
            PKIXCertPathValidatorResult result =
                (PKIXCertPathValidatorResult) cpv.validate(certPath, params);
            PolicyNode policyTree = result.getPolicyTree();
            PublicKey subjectPublicKey = result.getPublicKey();
        } catch (CertPathValidatorException cpve) {
            System.out.println("Validation failure, cert[" 
                + cpve.getIndex() + "] :" + cpve.getMessage());
        }
    
```

Se o algoritmo de validação for bem-sucedido, a árvore de políticas e a chave pública do assunto resultantes do algoritmo de validação são obtidas usando os métodos `getPolicyTree` e `getPublicKey` de `PKIXCertPathValidatorResult`.

Caso contrário, uma `CertPathValidatorException` é lançada e o chamador pode capturar a exceção e imprimir alguns detalhes sobre a falha, como a mensagem de erro e o índice do certificado que causou a falha.

##### A Classe PKIXBuilderParameters

A classe `PKIXBuilderParameters` especifica o conjunto de parâmetros a serem usados com a classe `CertPathBuilder`.

Esta classe (que estende a classe `PKIXParameters`) especifica o conjunto de parâmetros a serem usados com a classe CertPathBuilder que constrói caminhos de certificação validados contra o algoritmo de validação de caminho de certificação PKIX.

Um objeto `PKIXBuilderParameters` é passado como argumento para o método `build` de uma instância de `CertPathBuilder` que implementa o algoritmo PKIX. Todos os `CertPathBuilder`s PKIX devem retornar caminhos de certificação que foram validados de acordo com o algoritmo de validação de caminho de certificação PKIX.

Observe que o mecanismo que um `CertPathBuilder` PKIX usa para validar um caminho construído é um detalhe de implementação. Por exemplo, uma implementação pode tentar primeiro construir um caminho com validação mínima e depois validá-lo completamente usando uma instância de um `CertPathValidator` PKIX, enquanto uma implementação mais eficiente pode validar mais do caminho à medida que o constrói, e retroceder para estágios anteriores se encontrar falhas de validação ou becos sem saída.

Criando um Objeto PKIXBuilderParameters

Criar um objeto `PKIXBuilderParameters` é semelhante a criar um objeto `PKIXParameters`. No entanto, um chamador deve especificar restrições no certificado de destino ou de entidade final ao criar um objeto `PKIXBuilderParameters`. Essas restrições devem fornecer ao `CertPathBuilder` informações suficientes para encontrar o certificado de destino. As restrições são especificadas como um objeto `CertSelector`. Use um dos seguintes construtores para criar um objeto `PKIXBuilderParameters`:
```java
            public PKIXBuilderParameters(Set<TrustAnchor> trustAnchors, 
                    CertSelector targetConstraints)
                    throws InvalidAlgorithmParameterException
            public PKIXBuilderParameters(KeyStore keystore, 
                    CertSelector targetConstraints) 
                    throws KeyStoreException, InvalidAlgorithmParameterException
                                                    
    
```

Obtendo/Definindo Valores de Parâmetros

A classe `PKIXBuilderParameters` herda todos os parâmetros que podem ser definidos na classe `PKIXParameters`. Além disso, o método `setMaxPathLength` pode ser chamado para definir um limite no número máximo de certificados em um caminho de certificação:
```java
            public void setMaxPathLength(int maxPathLength)
    
```

O parâmetro `maxPathLength` especifica o número máximo de certificados intermediários não autoemitidos que podem existir em um caminho de certificação. Uma instância de `CertPathBuilder` que implementa o algoritmo PKIX não deve construir caminhos mais longos do que o comprimento especificado. Se o valor for 0, o caminho pode conter apenas um único certificado. Se o valor for -1, o comprimento do caminho é irrestrito (ou seja, não há máximo). O comprimento máximo padrão do caminho, se não especificado, é 5. Este método é útil para evitar que o `CertPathBuilder` gaste recursos e tempo construindo caminhos longos que podem ou não atender aos requisitos do chamador.

Se algum dos certificados CA no caminho contiver uma extensão `Basic Constraints`, o valor do componente `pathLenConstraint` da extensão substitui o valor do parâmetro `maxPathLength` sempre que o resultado for um caminho de certificação de menor comprimento. Há também um método `getMaxPathLength` correspondente para recuperar este parâmetro:
```java
            public int getMaxPathLength()
    
```

Além disso, o método `setCertStores` (herdado da classe `PKIXParameters`) é tipicamente usado por uma implementação PKIX de `CertPathBuilder` para encontrar Certificados para construção de caminho, bem como para encontrar CRLs para validação de caminho. Isso fornece um mecanismo extensível para especificar onde localizar Certificados e CRLs.

##### A Classe PKIXCertPathBuilderResult

A classe `PKIXCertPathBuilderResult` representa o resultado bem-sucedido do algoritmo de construção de caminho de certificação PKIX.

Esta classe estende a classe `PKIXCertPathValidatorResult` e implementa a interface `CertPathBuilder`. Instâncias de `PKIXCertPathBuilderResult` são retornadas pelo método `build` de objetos `CertPathBuilder` que implementam o algoritmo PKIX.

O método `getCertPath` de uma instância de `PKIXCertPathBuilderResult` sempre retorna um objeto `CertPath` validado usando o algoritmo de validação de caminho de certificação PKIX. O objeto `CertPath` retornado não inclui o certificado da CA mais confiável que pode ter sido usado para ancorar o caminho. Em vez disso, use o método `getTrustAnchor` para obter o `Certificate` da CA mais confiável.

Consulte a documentação da API ``PKIXCertPathBuilderResult`` para obter informações mais detalhadas sobre esta classe.

Exemplo 9-2 Exemplo de Construção de um Caminho de Certificação usando o algoritmo PKIX

Este é um exemplo de construção de um caminho de certificação validado contra o algoritmo PKIX. Alguns detalhes foram omitidos, como o tratamento de exceções e a criação das âncoras de confiança e certificados para preencher o `CertStore`.

Primeiro, crie o `CertPathBuilder`, como no exemplo a seguir:
```java
        CertPathBuilder cpb = CertPathBuilder.getInstance("PKIX");
    
```

Esta chamada cria um objeto `CertPathBuilder` que retorna caminhos validados contra o algoritmo PKIX.

O próximo passo é criar um objeto `PKIXBuilderParameters`. Este será usado para preencher os parâmetros PKIX utilizados pelo `CertPathBuilder`:
```java
        // Create parameters object, passing it a Set of
        // trust anchors for anchoring the path
        // and a target subject DN.
        X509CertSelector targetConstraints = new X509CertSelector();
        targetConstraints.setSubject("CN=alice,O=xyz,C=us");
        PKIXBuilderParameters params = 
            new PKIXBuilderParameters(trustAnchors, targetConstraints);
    
```

O próximo passo é especificar o `CertStore` que o `CertPathBuilder` usará para procurar certificados e CRLs. Para este exemplo, preencheremos um `CertStore` de Coleção com os certificados e CRLs:
```java
        CollectionCertStoreParameters ccsp = 
            new CollectionCertStoreParameters(certsAndCrls);
        CertStore store = CertStore.getInstance("Collection", ccsp);
        params.addCertStore(store);
```
O próximo passo é construir o caminho de certificação usando o conjunto de parâmetros de entrada que criamos:
```java
        try {
            PKIXCertPathBuilderResult result = 
                (PKIXCertPathBuilderResult) cpb.build(params);
            CertPath cp = result.getCertPath();
        } catch (CertPathBuilderException cpbe) {
            System.out.println("build failed: " + cpbe.getMessage());
        }
    
```

Se o `CertPathBuilder` não conseguir construir um caminho que atenda aos parâmetros fornecidos, ele lançará uma `CertPathBuilderException`. Caso contrário, o caminho de certificação validado pode ser obtido do `PKIXCertPathBuilderResult` usando o método `getCertPath`.

##### A Classe PKIXCertPathChecker

A classe `PKIXCertPathChecker` permite que um usuário estenda uma implementação PKIX de `CertPathValidator` ou `CertPathBuilder`. Este é um recurso avançado que a maioria dos usuários não precisará entender. No entanto, qualquer pessoa que implemente um provedor de serviço PKIX deve ler esta seção.

A classe `PKIXCertPathChecker` é uma classe abstrata que executa uma ou mais verificações em um certificado X.509. Os desenvolvedores devem criar implementações concretas da classe `PKIXCertPathChecker` quando for necessário estender dinamicamente uma implementação PKIX de `CertPathValidator` ou `CertPathBuilder` em tempo de execução. A seguir estão alguns exemplos de quando uma implementação de `PKIXCertPathChecker` é útil:

  * Se o mecanismo de revogação fornecido por uma implementação PKIX de `CertPathValidator` ou `CertPathBuilder` não for adequado: Por exemplo, você pode usar o `PKIXRevocationChecker` (introduzido no JDK 8; veja Verificar o Status de Revogação de Certificados com a Classe PKIXRevocationChecker ou Certificate Revocation Lists (CRLs).")) para ter mais controle sobre o mecanismo de revogação, ou você pode implementar seu próprio `PKIXCertPathChecker` para verificar se os certificados não foram revogados.

  * Se o usuário quiser reconhecer certificados contendo uma extensão privada crítica. Como a extensão é privada, ela não será reconhecida pela implementação PKIX de `CertPathValidator` ou `CertPathBuilder` e uma `CertPathValidatorException` será lançada. Neste caso, um desenvolvedor pode implementar um `PKIXCertPathChecker` que reconhece e processa a extensão privada crítica.

  * Se o desenvolvedor quiser registrar informações sobre cada certificado processado para fins de depuração ou exibição.

  * Se o usuário quiser rejeitar certificados com certos qualificadores de política.

O método `setCertPathCheckers` da classe `PKIXParameters` permite que um usuário passe uma `List` de objetos `PKIXCertPathChecker` para uma implementação PKIX de `CertPathValidator` ou `CertPathBuilder`. Cada um dos objetos `PKIXCertPathChecker` será chamado por sua vez, para cada certificado processado pela implementação PKIX de `CertPathValidator` ou `CertPathBuilder`.

Criando e usando um Objeto PKIXCertPathChecker

A classe `PKIXCertPathChecker` não possui um construtor público. Isso é intencional, pois a criação de uma instância de `PKIXCertPathChecker` é uma questão específica da implementação. Por exemplo, o construtor para uma implementação de `PKIXCertPathChecker` que usa OCSP para verificar o status de revogação de um certificado pode exigir o nome do host e a porta do servidor OCSP:
```java
            PKIXCertPathChecker checker = new OCSPChecker("ocsp.sun.com", 1321);
```

Uma vez que o verificador tenha sido instanciado, ele pode ser adicionado como um parâmetro usando o método `addCertPathChecker` da classe `PKIXParameters`:
```java
            params.addCertPathChecker(checker);
```

Alternativamente, uma `List` de verificadores pode ser adicionada usando o método `setCertPathCheckers` da classe `PKIXParameters`.

Implementando um Objeto PKIXCertPathChecker

A classe `PKIXCertPathChecker` é abstrata. Ela possui quatro métodos (`check`, `getSupportedExtensions`, `init` e `isForwardCheckingSupported`) que todas as subclasses concretas devem implementar.

Implementar um `PKIXCertPathChecker` pode ser trivial ou complexo. Uma implementação de `PKIXCertPathChecker` pode ser sem estado (stateless) ou com estado (stateful). Uma implementação sem estado não mantém o estado entre chamadas sucessivas do método `check`. Por exemplo, um `PKIXCertPathChecker` que verifica se cada certificado contém um qualificador de política específico é sem estado. Em contraste, uma implementação com estado mantém o estado entre chamadas sucessivas do método `check`. O método `check` de uma implementação com estado geralmente depende do conteúdo de certificados anteriores no caminho de certificação. Por exemplo, um `PKIXCertPathChecker` que processa a extensão `NameConstraints` é com estado.

Além disso, a ordem em que os certificados processados por uma implementação de provedor de serviço são apresentados (passados) a um `PKIXCertPathChecker` é muito importante, especialmente se a implementação for com estado. Dependendo do algoritmo usado pelo provedor de serviço, os certificados podem ser apresentados em ordem inversa ou direta. Uma ordenação inversa significa que os certificados são ordenados do CA mais confiável (se presente) para o sujeito alvo, enquanto uma ordenação direta significa que os certificados são ordenados do sujeito alvo para o CA mais confiável. A ordem deve ser informada à implementação de `PKIXCertPathChecker`, para que ela saiba como processar certificados consecutivos.

Inicializando um Objeto PKIXCertPathChecker

O método `init` inicializa o estado interno do verificador:
```java
            public abstract void init(boolean forward)
```

Todas as implementações com estado devem limpar ou inicializar qualquer estado interno no verificador. Isso impede que uma implementação de provedor de serviço chame um verificador que esteja em um estado não inicializado. Também permite que verificadores com estado sejam reutilizados em operações subsequentes sem reinstanciá-los. O parâmetro `forward` indica a ordem dos certificados apresentados ao `PKIXCertPathChecker`. Se `forward` for `true`, os certificados são apresentados do alvo para a âncora de confiança; se `false`, da âncora de confiança para o alvo.

Verificação Direta (Forward Checking)

O método `isForwardCheckingSupported` retorna um `boolean` que indica se o `PKIXCertPathChecker` suporta verificação direta:
```java
            public abstract boolean isForwardCheckingSupported()
```

Todas as implementações de `PKIXCertPathChecker` devem suportar verificação inversa. Uma implementação de `PKIXCertPathChecker` pode suportar verificação direta.

Suportar a verificação direta melhora a eficiência dos `CertPathBuilder`s que constroem para frente, pois permite que os caminhos sejam verificados à medida que são construídos. No entanto, alguns `PKIXCertPathChecker`s com estado podem achar difícil ou impossível suportar a verificação direta.

Extensões Suportadas

O método `getSupportedExtensions` retorna um `Set` imutável de `String`s OID para as extensões X.509 que a implementação de `PKIXCertPathChecker` suporta (ou seja, reconhece, é capaz de processar):
```java
            public abstract Set<String> getSupportedExtensions()
```

O método deve retornar `null` se nenhuma extensão for processada. Todas as implementações devem retornar o `Set` de `String`s OID que o método `check` pode processar.

Um `CertPathBuilder` pode usar esta informação para identificar certificados com extensões críticas não reconhecidas, mesmo ao realizar uma construção direta com um `PKIXCertPathChecker` que não suporta verificação direta.

Executando a Verificação

O método a seguir executa uma verificação no certificado:
```java
            public abstract void 
                    check(Certificate cert, Collection<String> unresolvedCritExts)
                    throws CertPathValidatorException
```

O parâmetro `unresolvedCritExts` contém uma coleção de OIDs como `String`s. Esses OIDs representam o conjunto de extensões críticas no certificado que ainda não foram resolvidas pelo algoritmo de validação do caminho de certificação. Implementações concretas do método `check` devem remover quaisquer extensões críticas que ele processe do parâmetro `unresolvedCritExts`.

Se o certificado não passar na(s) verificação(ões), uma `CertPathValidatorException` deve ser lançada.

Clonando um PKIXCertPathChecker

A classe `PKIXCertPathChecker` implementa a interface `Cloneable`. Todas as implementações com estado de `PKIXCertPathChecker` devem sobrescrever o método `clone` se necessário. A implementação padrão do método `clone` chama o método `Object.clone`, que realiza um clone simples copiando todos os campos do objeto original para o novo objeto. Uma implementação sem estado não deve sobrescrever o método `clone`. No entanto, todas as implementações com estado devem garantir que o método `clone` padrão esteja correto e sobrescrevê-lo se necessário. Por exemplo, um `PKIXCertPathChecker` que armazena estado em um array deve sobrescrever o método `clone` para fazer uma cópia do array, em vez de apenas uma referência ao array.

A razão pela qual os objetos `PKIXCertPathChecker` são `Cloneable` é para permitir que uma implementação PKIX de `CertPathBuilder` faça um *backtrack* eficiente e tente outro caminho quando um caminho de certificação potencial atinge um beco sem saída ou ponto de falha. Neste caso, a implementação é capaz de restaurar estados de validação de caminho anteriores restaurando os objetos clonados.

Exemplo 9-3 Código de Exemplo para Verificar uma Extensão Privada

Este é um exemplo de uma implementação sem estado de `PKIXCertPathChecker`. Ele verifica se uma extensão privada existe em um certificado e a processa de acordo com algumas regras.
```java
            import java.security.cert.Certificate;
            import java.security.cert.X509Certificate;
            import java.util.Collection;
            import java.util.Collections;
            import java.util.Set;
            import java.security.cert.PKIXCertPathChecker;
            import java.security.cert.CertPathValidatorException;
    
            public class MyChecker extends PKIXCertPathChecker {
                private static Set supportedExtensions =
                    Collections.singleton("2.16.840.1.113730.1.1");
    
                /*
                 * Initialize checker
                 */
                public void init(boolean forward) 
                    throws CertPathValidatorException {
                    // nothing to initialize
                }
    
                public Set getSupportedExtensions() {        
                    return supportedExtensions;
                }
    
                public boolean isForwardCheckingSupported() {
                    return true;
                }
    
                /*
                 * Check certificate for presence of Netscape's
                 * private extension
                 * with OID "2.16.840.1.113730.1.1"
                 */
                public void check(Certificate cert, 
                                  Collection unresolvedCritExts)
                    throws CertPathValidatorException 
                {
                    X509Certificate xcert = (X509Certificate) cert;
                    byte[] ext = 
                        xcert.getExtensionValue("2.16.840.1.113730.1.1");
                    if (ext == null)
                        return;
    
                    //
                    // process private extension according to some 
                    // rules - if check fails, throw a 
                    // CertPathValidatorException ...
                    // {insert code here}
    
                    // remove extension from collection of unresolved 
                    // extensions (if it exists)
                    if (unresolvedCritExts != null)
                        unresolvedCritExts.remove("2.16.840.1.113730.1.1");
                }
            }
```

Como uma implementação de Provedor de Serviço PKIX deve usar um PKIXCertPathChecker

Cada objeto `PKIXCertPathChecker` deve ser inicializado por uma implementação de provedor de serviço antes de iniciar o algoritmo de construção ou validação, por exemplo:
```java
            List<PKIXCertPathChecker> checkers = params.getCertPathCheckers();
            for (PKIXCertPathChecker checker : checkers) {
                checker.init(false);
            }
```

Para cada certificado que ele valida, a implementação do provedor de serviço deve chamar o método `check` de cada objeto `PKIXCertPathChecker` por sua vez, passando-lhe o certificado e quaisquer extensões críticas não resolvidas restantes:
```java
            for (PKIXCertPathChecker checker : checkers) {
                checker.check(cert, unresolvedCritExts);
            }
```

Se qualquer uma das verificações lançar uma `CertPathValidatorException`, uma implementação de `CertPathValidator` deve encerrar o procedimento de validação. No entanto, uma implementação de `CertPathBuilder` pode simplesmente registrar a falha e continuar a procurar outros caminhos potenciais. Se todas as verificações forem bem-sucedidas, a implementação do provedor de serviço deve verificar se todas as extensões críticas foram resolvidas e, se não, considerar que a validação falhou. Por exemplo:
```java
            if (unresolvedCritExts != null &&
                !unresolvedCritExts.isEmpty())
            {
                // Note that a CertPathBuilder may have an enclosing
                // try block to catch the exception and continue on error
                throw new CertPathValidatorException
                    ("Unrecognized Critical Extension");
            }
```

Conforme discutido na seção anterior, uma implementação de `CertPathBuilder` pode precisar fazer um *backtrack* quando um caminho de certificação potencial atinge um beco sem saída ou ponto de falha. O *backtracking* neste contexto implica retornar ao certificado anterior no caminho e procurar outros caminhos potenciais. Se a implementação de `CertPathBuilder` estiver validando o caminho à medida que o constrói, ela precisará restaurar o estado anterior de cada `PKIXCertPathChecker`. Ela pode fazer isso criando clones dos objetos `PKIXCertPathChecker` antes que cada certificado seja processado, por exemplo:
```java
            /* clone checkers */
            List newList = new ArrayList(checkers);
            ListIterator li = newList.listIterator();
            while (li.hasNext()) {   
                PKIXCertPathChecker checker = (PKIXCertPathChecker) li.next();
                li.set(checker.clone());
            }
```

##### Usando PKIXCertPathChecker na Validação de Caminho de Certificado

Usar um `PKIXCertPathChecker` para personalizar a validação de caminho de certificado é relativamente simples.

Validação Básica de Caminho de Certificação

Primeiro, considere o código que valida um caminho de certificado:
```java
    Set<TrustAnchor> trustAnchors = getTrustAnchors();
    CertPath cp = getCertPath();
    
    PKIXParameters pkixp = new PKIXParameters(trustAnchors);
    pkixp.setRevocationEnabled(false);
    
    CertPathValidator cpv = CertPathValidator.getInstance("PKIX");
    PKIXCertPathValidatorResult pcpvr =
        (PKIXCertPathValidatorResult)cpv.validate(cp, pkixp);
    
```

Se a validação falhar, o método `validate()` lança uma exceção.

Os passos fundamentais são os seguintes:

  1. Obtenha os certificados raiz da CA e o caminho de certificação a ser validado.
  2. Crie um `PKIXParameters` com as âncoras de confiança.
  3. Use um `CertPathValidator` para validar o caminho de certificado.

Neste exemplo, `getTrustAnchors()` e `getCertPath()` são os métodos que obtêm os certificados raiz da CA e o caminho de certificação.

O método `getTrustAnchors()` no exemplo deve retornar um `Set` de `TrustAnchor`s que representam os certificados raiz da CA que você deseja usar para validação. Aqui está uma implementação simples que carrega um único certificado raiz da CA de um arquivo:
```java
    public Set<TrustAnchor> getTrustAnchors()
        throws IOException, CertificateException {
    
      CertificateFactory cf = CertificateFactory.getInstance("X.509");
    
      X509Certificate c;
      try (InputStream in = new FileInputStream("x509_ca-certificate.cer")) {
        c = (X509Certificate)cf.generateCertificate(in);
      }
    
      TrustAnchor anchor = new TrustAnchor(c, null);
      return Collections.singleton(anchor);
    }
    
```

Da mesma forma, aqui está uma implementação simples de `getCertPath()` que carrega um caminho de certificado de um arquivo:
```java
    public CertPath getCertPath() throws IOException, CertificateException {
      CertificateFactory cf = CertificateFactory.getInstance("X.509");
    
      CertPath cp;
      try (InputStream in = new FileInputStream("certpath.pkcs7")) {     
        cp = cf.generateCertPath(in, "PKCS7");
      }   
      return cp;
    }
    
```

Observe que o PKCS#7 não exige uma ordem específica para os certificados no arquivo, então este código funciona apenas para validação de caminho de certificação quando os certificados são ordenados começando pela entidade a ser validada e progredindo de volta para a raiz da CA. Se os certificados não estiverem na ordem correta, você precisará fazer algum processamento adicional. `CertificateFactory` possui um método `generateCertPath()` que aceita uma `Collection`, o que é útil para este tipo de processamento.

Adicionando um `PKIXCertPathChecker`

Para personalizar a validação do caminho de certificação, adicione um `PKIXCertPathChecker` da seguinte forma. Neste exemplo, `SimpleChecker` é uma subclasse de `PKIXCertPathChecker`. As novas linhas são mostradas em negrito.
```java
    Set<TrustAnchor> trustAnchors = getTrustAnchors();
    CertPath cp = getCertPath();
    
    PKIXParameters pkixp = new PKIXParameters(trustAnchors);
    pkixp.setRevocationEnabled(false);
    
    SimpleChecker sc = new SimpleChecker();
    pkixp.addCertPathChecker(sc);
    
    CertPathValidator cpv = CertPathValidator.getInstance("PKIX");
    PKIXCertPathValidatorResult pcpvr =
        (PKIXCertPathValidatorResult)cpv.validate(cp, pkixp);
    
```

`SimpleChecker` é uma subclasse rudimentar de `PKIXCertPathChecker`. Seu método `check()` é chamado para cada certificado no caminho de certificação que está sendo validado. `SimpleChecker` usa uma implementação de `AlgorithmConstraints` para examinar o algoritmo de assinatura e a chave pública de cada certificado.
```java
    import java.security.AlgorithmConstraints;
    import java.security.CryptoPrimitive;
    import java.security.Key;
    import java.security.cert.*;
    import java.util.*;
    
    public class SimpleChecker extends PKIXCertPathChecker {
      private final static Set<CryptoPrimitive> SIGNATURE_PRIMITIVE_SET =
          EnumSet.of(CryptoPrimitive.SIGNATURE);
      
      public void init(boolean forward) throws CertPathValidatorException {}
      
      public boolean isForwardCheckingSupported() { return true; }
      
      public Set<String> getSupportedExtensions() { return null; }
      
      public void check(Certificate cert,
          Collection<String> unresolvedCritExts)
          throws CertPathValidatorException {
        X509Certificate c = (X509Certificate)cert;
        String sa = c.getSigAlgName();
        Key key = c.getPublicKey();
        
        AlgorithmConstraints constraints = new SimpleConstraints();
        
        if (constraints.permits(SIGNATURE_PRIMITIVE_SET, sa, null) == false)
          throw new CertPathValidatorException("Forbidden algorithm: " + sa);
    
        if (constraints.permits(SIGNATURE_PRIMITIVE_SET, key) == false)
          throw new CertPathValidatorException("Forbidden key: " + key);
      }
    }
    
```

Finalmente, `SimpleConstraints` é uma implementação de `AlgorithmConstraints` que exige RSA 2048.
```java
    import java.security.AlgorithmConstraints;
    import java.security.AlgorithmParameters;
    import java.security.CryptoPrimitive;
    import java.security.Key;
    import java.security.interfaces.RSAKey;
    import java.util.Set;
    
    public class SimpleConstraints implements AlgorithmConstraints {
      public boolean permits(Set<CryptoPrimitive> primitives,
          String algorithm, AlgorithmParameters parameters) {
        return permits(primitives, algorithm, null, parameters);
      }
    
      public boolean permits(Set<CryptoPrimitive> primitives, Key key) {
        return permits(primitives, null, key, null);
      }
      
      public boolean permits(Set<CryptoPrimitive> primitives,
          String algorithm, Key key, AlgorithmParameters parameters) {
        if (algorithm == null) algorithm = key.getAlgorithm();
        
        if (algorithm.indexOf("RSA") == -1) return false;
        
        if (key != null) {
          RSAKey rsaKey = (RSAKey)key;
          int size = rsaKey.getModulus().bitLength();
          if (size < 2048) return false;
        }
    
        return true;
      }
    }
    
```

###### Verificar o Status de Revogação de Certificados com a Classe PKIXRevocationChecker

Uma instância de `PKIXRevocationChecker` verifica o status de revogação de certificados com o Online Certificate Status Protocol (OCSP) ou Certificate Revocation Lists (CRLs).

O `PKIXRevocationChecker` (introduzido no JDK 8), que é uma subclasse de `PKIXCertPathChecker`, verifica o status de revogação de certificados com o algoritmo PKIX.

Uma instância de `PKIXRevocationChecker` verifica o status de revogação de certificados com o Online Certificate Status Protocol (OCSP) ou Certificate Revocation Lists (CRLs). OCSP é descrito na RFC 2560 e é um protocolo de rede para determinar o status de um certificado. Uma CRL é uma lista com carimbo de data/hora que identifica certificados revogados, e a RFC 5280 descreve um algoritmo para determinar o status de revogação de certificados usando CRLs.

Cada instância de PKIX `CertPathValidator` e `CertPathBuilder` fornece uma implementação de revogação padrão que é habilitada por padrão. Se você quiser mais controle sobre as configurações de revogação usadas por essa implementação, use a classe `PKIXRevocationChecker`.

Siga estes passos gerais para verificar o status de revogação de um caminho de certificado com a classe `PKIXRevocationChecker`:

  1. Obtenha uma instância de `PKIXRevocationChecker` chamando o método `getRevocationChecker` de uma instância PKIX de `CertPathValidator` ou `CertPathBuilder`.

  2. Defina parâmetros e opções adicionais específicos para a revogação de certificados com métodos contidos na classe `PKIXRevocationChecker`. Esses métodos incluem `setOCSPResponder(URI)`, que define o URI que identifica a localização do respondedor OCSP (embora normalmente o URI esteja incluído no certificado e não precise ser definido) e `setOptions(Set<PKIXRevocationChecker.Option>)`, que define as opções de revogação. `PKIXRevocationChecker.Option` é um tipo enumerado usado para especificar as seguintes opções:

     * `ONLY_END_ENTITY`: Verifica apenas o status de revogação de certificados de entidade final.
     * `PREFER_CRLS`: Por padrão, OCSP é o mecanismo preferencial para verificar o status de revogação, com CRLs como mecanismo de fallback. Alterne esta preferência para CRLs com esta opção.
     * `SOFT_FAIL`: Ignora falhas de rede.
  3. Após obter uma instância de `PKIXRevocationChecker`, adicione-a a um objeto `PKIXParameters` ou `PKIXBuilderParameters` com o método `addCertPathChecker` ou `setCertPathCheckers`.

  4. Siga um destes passos, dependendo se você está usando uma instância PKIX de `CertPathValidator` ou `CertPathBuilder`:

     * Se você estiver usando uma instância PKIX de `CertPathValidator`, chame o método `validate` usando como argumentos o caminho de certificado que você deseja validar e o objeto `PKIXParameters` que contém um verificador de revogação.

     * Se você estiver usando uma instância PKIX de `CertPathBuilder`, chame o método `build` usando como argumentos o objeto `PKIXBuilderParameters` que contém um verificador de revogação.

  5. Chame o método `validate` da instância PKIX de `CertPathValidator` ou `CertPathBuilder` usando como argumentos o caminho de certificado que você deseja validar e o objeto `PKIXParameters` ou `PKIXBuilderParameters` que contém um verificador de revogação.

O trecho a seguir verifica o status de revogação de certificados contidos em um caminho de certificado. O objeto `CertPath` `path` é o caminho de certificado, e `params` é um objeto do tipo `PKIXParameters`:
```java
        CertPathValidator cpv = CertPathValidator.getInstance("PKIX");
        PKIXRevocationChecker rc = (PKIXRevocationChecker)cpv.getRevocationChecker();
        rc.setOptions(EnumSet.of(Option.SOFT_FAIL));
        params.addCertPathChecker(rc);
        params.setRevocationEnabled(false);
        CertPathValidatorResult res = cpv.validate(path, params);
    
```

Neste trecho, a opção `SOFT_FAIL` faz com que o verificador de revogação ignore quaisquer falhas de rede (como falha ao estabelecer uma conexão com o servidor OCSP) ao verificar o status de revogação.

### Implementando um Provedor de Serviço

Programadores experientes podem criar seus próprios pacotes de provedores fornecendo implementações de serviço de caminho de certificação.

Esta seção assume que você leu o Guia de Referência da Java Cryptography Architecture (JCA) é uma parte importante da plataforma e contém uma arquitetura de "provedor" e um conjunto de APIs para assinaturas digitais, resumos de mensagens (hashes), certificados e validação de certificados, criptografia (cifras de bloco/fluxo simétricas/assimétricas), geração e gerenciamento de chaves, e geração segura de números aleatórios, para citar alguns.").

As seguintes classes de *engine* são definidas na API de Caminho de Certificação Java:

  * `CertPathValidator` - usado para validar caminhos de certificação

  * `CertPathBuilder` - usado para construir caminhos de certificação

  * `CertStore` - usado para recuperar certificados e CRLs de um repositório

Além disso, a classe de *engine* `CertificateFactory` pré-existente também suporta a geração de caminhos de certificação.

As interfaces de aplicação fornecidas por uma classe de *engine* são implementadas em termos de uma "Service Provider Interface" (SPI). O nome de cada classe SPI é o mesmo da classe de *engine* correspondente, seguido por "Spi". Por exemplo, a classe SPI correspondente à classe de *engine* `CertPathValidator` é a classe `CertPathValidatorSpi`. Cada classe SPI é abstrata. Para fornecer a implementação de um tipo específico de serviço, para um algoritmo ou tipo específico, um provedor deve subclassificar a classe SPI correspondente e fornecer implementações para todos os métodos abstratos. Por exemplo, a classe `CertStore` fornece acesso à funcionalidade de recuperação de certificados e CRLs de um repositório. A implementação real fornecida em uma subclasse `CertStoreSpi` seria para um tipo específico de repositório de certificados, como LDAP.

#### Passos para Implementar e Integrar um Provedor

Ao implementar e integrar um provedor para os serviços de caminho de certificação, você deve garantir que certas informações sejam fornecidas.

Os desenvolvedores devem seguir os Passos para Implementar e Integrar um Provedor. Aqui estão algumas regras adicionais a seguir para certas etapas:

Passo 3: Escreva sua "Classe Mestra", uma subclasse de Provider

No Passo 3: Escreva Sua Classe Mestra, uma Subclasse de Provider, estas são as propriedades que devem ser definidas para os serviços de caminho de certificação, onde o nome do algoritmo é substituído por algName, e o tipo de certstore por storeType:

  * `CertPathValidator`.algName

  * `CertPathBuilder`.algName

  * `CertStore`.storeType

Consulte Nomes de Algoritmos Padrão de Segurança Java para os nomes padrão que são definidos para algName e storeType. O valor de cada propriedade deve ser o nome totalmente qualificado da classe que implementa o algoritmo especificado, ou o tipo de certstore. Ou seja, deve ser o nome do pacote seguido pelo nome da classe, onde os dois são separados por um ponto. Por exemplo, um provedor define a propriedade `CertPathValidator.PKIX` para ter o valor `"sun.security.provider.certpath.PKIXCertPathValidator"` da seguinte forma:
```java
    put("CertPathValidator.PKIX", "sun.security.provider.certpath.PKIXCertPathValidator")
    
```

Além disso, atributos de serviço podem ser definidos para os serviços de caminho de certificação. Esses atributos podem ser usados como filtros para selecionar provedores de serviço. Consulte o Apêndice A para a definição de alguns atributos de serviço padrão. Por exemplo, um provedor pode definir o atributo de serviço `ValidationAlgorithm` para o nome de uma RFC ou especificação que define o algoritmo de validação PKIX:
```java
    put("CertPathValidator.PKIX ValidationAlgorithm", "RFC5280");
    
```

Passo 11: Documente seu Provedor e Seus Serviços Suportados

No Passo 12: Documente Seu Provedor e Seus Serviços Suportados, os provedores de serviço de caminho de certificação devem documentar as seguintes informações para cada SPI:

Fábricas de Certificados

Um provedor deve documentar quais tipos de caminhos de certificação (e os números de versão dos certificados no caminho, se relevante) podem ser criados pela fábrica. Um provedor deve descrever a ordenação dos certificados no caminho de certificação, bem como o conteúdo.

Um provedor deve documentar a lista de formatos de codificação suportados. Isso não é tecnicamente necessário, pois o cliente pode solicitá-los chamando o método `getCertPathEncodings`. No entanto, a documentação deve descrever cada formato de codificação com mais detalhes e referenciar quaisquer padrões quando aplicável.

Validadores de Caminho de Certificação

Um provedor deve documentar qualquer informação relevante sobre a implementação de `CertPathValidator`, incluindo os tipos de caminhos de certificação que ela valida. Em particular, uma implementação PKIX de `CertPathValidator` deve documentar as seguintes informações:

  * A RFC ou especificação com a qual é compatível.
  * O mecanismo que usa para verificar se os certificados não foram revogados.
  * Quaisquer extensões opcionais de certificado ou CRL que reconhece e como as processa.

Construtores de Caminho de Certificação

Um provedor deve documentar qualquer informação relevante sobre a implementação de `CertPathBuilder`, incluindo os tipos de caminhos de certificação que ela cria e se são validados ou não. Em particular, uma implementação PKIX de `CertPathBuilder` deve documentar as seguintes informações:

  * A RFC ou especificação com a qual é compatível.
  * O mecanismo que usa para verificar se os certificados não foram revogados.
  * Quaisquer extensões opcionais de certificado ou CRL que reconhece e como as processa.
  * Detalhes sobre o algoritmo que usa para encontrar caminhos de certificação. Ex: profundidade-primeiro, largura-primeiro, direto (ou seja, do alvo para a(s) âncora(s) de confiança), inverso (ou seja, da(s) âncora(s) de confiança para o alvo).
* O algoritmo que ele usa para selecionar e ordenar certificados potenciais. Por exemplo, dados dois certificados que são candidatos potenciais para o próximo certificado no caminho, quais critérios são usados para selecionar um antes do outro? Quais critérios são usados para rejeitar um certificado?
* Se aplicável, o algoritmo que ele usa para retroceder ou construir outro caminho (ou seja, quando caminhos potenciais não atendem às restrições).
* Os tipos de implementações de `CertStore` que foram testados. A implementação deve ser projetada para funcionar com qualquer tipo de `CertStore`, mas esta informação ainda pode ser útil.

Todas as implementações de `CertPathBuilder` devem fornecer suporte adicional de depuração, a fim de analisar e corrigir potenciais problemas de construção de caminho. Detalhes sobre como acessar esta informação de depuração devem ser documentados.

Armazenamentos de Certificados/CRLs

Um provedor deve documentar quais tipos de certificados e CRLs (e os números de versão, se relevante) são recuperados pelo `CertStore`.

Um provedor também deve documentar qualquer informação relevante sobre a implementação do `CertStore` (como protocolos usados ou formatos suportados). Por exemplo, uma implementação de `CertStore` LDAP deve descrever quais versões de LDAP são suportadas e quais atributos padrão são usados para encontrar certificados e CRLs. Também deve documentar se a implementação armazena resultados em cache e por quanto tempo (ou seja, sob quais condições eles são atualizados).

Se a implementação retornar os certificados e CRLs em uma ordem particular, ela deve descrever o algoritmo de ordenação. Uma implementação também deve documentar quaisquer parâmetros de inicialização adicionais ou padrão. Finalmente, uma implementação deve documentar se e como ela usa informações nos objetos `CertSelector` ou `CRLSelector` para encontrar certificados e CRLs.

##### Interdependências de Serviço

Tipos comuns de interdependências de algoritmo em implementações de serviço de caminho de certificação.

A seguir estão alguns tipos comuns de interdependências de algoritmo em implementações de serviço de caminho de certificação:

* Validação de Caminho de Certificação e Algoritmos de Assinatura

Uma implementação de `CertPathValidator` frequentemente requer o uso de um algoritmo de assinatura para verificar a assinatura digital de cada certificado. O método setSigProvider da classe `PKIXParameters` permite que um usuário especifique um provedor `Signature` específico.

* Construtores de Caminho de Certificação e Fábricas de Certificados

Uma implementação de `CertPathBuilder` frequentemente utilizará uma `CertificateFactory` para gerar um caminho de certificação a partir de uma lista de certificados.

* CertStores e Fábricas de Certificados

Uma implementação de `CertStore` frequentemente utilizará uma `CertificateFactory` para gerar certificados e CRLs a partir de suas codificações. Por exemplo, uma implementação de `CertStore` LDAP pode usar uma `CertificateFactory` X.509 para gerar certificados X.509 e CRLs a partir de sua forma codificada em ASN.1.

##### Interfaces de Especificação de Parâmetros de Caminho de Certificação

A API de Caminho de Certificação contém duas interfaces que representam especificações transparentes de parâmetros, as interfaces `CertPathParameters` e `CertStoreParameters`.

Duas implementações da interface `CertPathParameters` estão incluídas, as classes `PKIXParameters` e `PKIXBuilderParameters`. Se você estiver trabalhando com validação de caminho de certificação PKIX e parâmetros de algoritmo, você pode utilizar essas classes. Se você precisar de parâmetros para um algoritmo diferente, você precisará fornecer sua própria implementação de `CertPathParameters` para esse algoritmo.

Duas implementações da interface `CertStoreParameters` estão incluídas, as classes `LDAPCertStoreParameters` e `CollectionCertStoreParameters`. Essas classes devem ser usadas com implementações de `CertStore` LDAP e Collection, respectivamente. Se você precisar de parâmetros para um tipo de repositório diferente, você precisará fornecer sua própria implementação de `CertStoreParameters` para esse tipo.

As interfaces `CertPathParameters` e `CertStoreParameters` definem cada uma um método `clone` que as implementações devem sobrescrever. Uma implementação típica realizará uma cópia "profunda" do objeto, de modo que alterações subsequentes na cópia não afetarão o original (e vice-versa). No entanto, este não é um requisito absoluto para implementações de `CertStoreParameters`. Uma implementação de `clone` de cópia superficial é mais apropriada para aplicações que precisam manter uma referência a um parâmetro contido nos `CertStoreParameters`. Por exemplo, como CertStore.getInstance faz um clone dos `CertStoreParameters` especificados, um `clone` de cópia superficial permite que uma aplicação mantenha uma referência e posteriormente libere os recursos de um parâmetro de inicialização `CertStore` particular, em vez de esperar pelo mecanismo de garbage collection. Isso deve ser feito com o máximo cuidado, pois o `CertStore` ainda pode estar em uso por outras threads.

##### Interfaces de Especificação de Resultado de Caminho de Certificação

A API de Caminho de Certificação contém duas interfaces que representam especificações transparentes de resultados, as interfaces `CertPathValidatorResult` e `CertPathBuilderResult`.

Uma implementação para cada uma das interfaces está incluída: as classes `PKIXCertPathValidatorResult` e `PKIXCertPathBuilderResult`. Se você estiver implementando provedores de serviço de caminho de certificação PKIX, você pode utilizar essas classes. Se você precisar de resultados de caminho de certificação para um algoritmo diferente, você precisará fornecer sua própria implementação de `CertPathValidatorResult` ou `CertPathBuilderResult` para esse algoritmo.

Uma implementação PKIX de um `CertPathValidator` ou um `CertPathBuilder` pode achar útil armazenar informações adicionais no `PKIXCertPathValidatorResult` ou `PKIXCertPathBuilderResult`, como rastreamentos de depuração. Nesses casos, a implementação deve implementar uma subclasse da classe de resultado apropriada com métodos para recuperar as informações relevantes. Essas classes devem ser fornecidas com as classes do provedor, por exemplo, como parte do arquivo JAR do provedor.

##### Classes de Exceção de Caminho de Certificação

A API de Caminho de Certificação contém um conjunto de classes de exceção para tratamento de erros. `CertPathValidatorException, CertPathBuilderException` e `CertStoreException` são subclasses de `GeneralSecurityException`.

Você pode precisar estender essas classes em sua implementação de provedor de serviço.

Por exemplo, uma implementação de `CertPathBuilder` pode fornecer informações adicionais, como rastreamentos de depuração, quando uma `CertPathBuilderException` é lançada. A implementação pode lançar uma subclasse de `CertPathBuilderException` que contém essas informações. Da mesma forma, uma implementação de `CertStore` pode fornecer informações adicionais quando ocorre uma falha, lançando uma subclasse de `CertStoreException`. Além disso, você pode querer implementar uma subclasse de `CertPathValidatorException` para descrever um modo de falha particular de sua implementação de `CertPathValidator`.

Em cada caso, as novas classes de exceção devem ser fornecidas com as classes do provedor, por exemplo, como parte do arquivo JAR do provedor. Cada provedor deve documentar as subclasses de exceção.

### Apêndice A: Nomes Padrão

A API de Caminho de Certificação Java requer e utiliza um conjunto de nomes padrão para algoritmos de validação de caminho de certificação, codificações e tipos de armazenamento de certificados.

Os nomes padrão anteriormente encontrados aqui no Apêndice A e nas outras especificações de segurança (JCA/JSSE/etc.) foram combinados no Java Security Standard Algorithm Names. Informações específicas do provedor podem ser encontradas nos JDK Providers.

Observe que um provedor de serviço pode optar por definir um novo nome para um algoritmo proprietário ou não padrão que não é mencionado no documento Nomes Padrão. No entanto, para evitar colisões de nomes, é recomendado que o nome seja prefixado com o nome de domínio da Internet reverso da organização do provedor (por exemplo: `com.sun.MyCertPathValidator`).

### Apêndice B: A Implementação de CertPath no Provedor SUN

O provedor "SUN" suporta os seguintes algoritmos, tipos e codificações padrão:

* `CertificateFactory`: tipo `CertPath` X.509 com codificações PKCS7 e PkiPath
* `CertPathValidator`: algoritmo PKIX
* `CertPathBuilder`: algoritmo PKIX
* `CertStore`: tipo `CertStore` Collection

A seguir, discute-se cada uma dessas implementações de interface de provedor de serviço:

CertificateFactory

O provedor "SUN" para a classe de motor `CertificateFactory` suporta a geração de objetos `CertPath` X.509. As codificações PKCS7 e PkiPath são suportadas. A implementação PKCS#7 suporta um subconjunto do RFC 2315 (apenas o tipo SignedData ContentInfo é suportado). Os certificados no `CertPath` são ordenados na direção direta (do alvo para a âncora de confiança). Cada certificado no `CertPath` é do tipo `java.security.cert.X509Certificate`, e as versões 1, 2 e 3 são suportadas.

CertPathValidator

O provedor "SUN" fornece uma implementação PKIX da classe de motor `CertPathValidator`. A implementação valida `CertPath`s do tipo X.509 e implementa o algoritmo de validação de caminho de certificação definido no RFC 5280: Perfil de Certificado e CRL PKIX. Esta implementação define o atributo de serviço `ValidationAlgorithm` como "RFC5280".

Algoritmos criptográficos fracos podem ser desabilitados no provedor "SUN" usando a Propriedade de Segurança `jdk.certpath.disabledAlgorithms`. Consulte Apêndice E: Desabilitando Algoritmos Criptográficos contendo qualquer um desses algoritmos ou tamanhos de chave serão bloqueados durante a construção e validação do caminho de certificação. Esta propriedade é usada pela implementação PKIX da Oracle, outras implementações podem não examiná-la e usá-la.") para uma descrição e exemplos desta propriedade.

O Perfil de Certificado e CRL PKIX possui muitos recursos opcionais. O provedor "SUN" implementa suporte para as extensões de mapeamento de política, acesso a informações de autoridade e certificado de ponto de distribuição de CRL, a extensão CRL de ponto de distribuição de emissão, e as extensões de código de razão e entrada CRL de emissor de certificado. Ele não implementa suporte para as extensões de certificado de CRL mais recente ou acesso a informações de assunto. Também não inclui suporte para as extensões CRL de CRL mais recente e Indicador de CRL delta e as extensões de entrada CRL de data de invalidade e código de instrução de retenção.

A implementação suporta um mecanismo de verificação de revogação de CRL que está em conformidade com a seção 6.3 do Perfil de Certificado e CRL PKIX. OCSP (RFC 2560) também é atualmente suportado como um mecanismo de verificação de revogação integrado. Consulte Apêndice C: Suporte a OCSP conforme definido no RFC 2560 é suportado.") para mais detalhes sobre a implementação e configuração e como ela funciona em conjunto com CRLs.

A implementação não suporta o parâmetro `nameConstraints` da classe `TrustAnchor` e o método `validate` lança uma `InvalidAlgorithmParameterException` se for especificado.

CertPathBuilder

O provedor "SUN" fornece uma implementação PKIX da classe de motor `CertPathBuilder`. A implementação constrói `CertPath`s do tipo X.509. Cada `CertPath` é validado de acordo com o algoritmo PKIX definido no RFC 5280: Perfil de Certificado e Lista de Revogação de Certificados (CRL) da Infraestrutura de Chave Pública X.509 da Internet. Esta implementação define o atributo de serviço `ValidationAlgorithm` como "RFC5280".

A implementação exige que o parâmetro `targetConstraints` de um objeto `PKIXBuilderParameters` seja uma instância de `X509CertSelector` e que o critério de assunto seja definido para um valor não nulo. Caso contrário, o método `build` lança uma `InvalidAlgorithmParameterException`.

A implementação constrói objetos `CertPath` em uma direção direta usando um algoritmo de busca em profundidade. Ela retrocede para estados anteriores e tenta caminhos alternativos quando um caminho potencial é determinado como inválido ou excede o parâmetro `maxPathLength` de `PKIXBuilderParameters`.

A validação do caminho é realizada da mesma maneira que a implementação de `CertPathValidator`. A implementação valida a maior parte do caminho enquanto ele está sendo construído, a fim de eliminar caminhos inválidos mais cedo no processo. As verificações de validação que não podem ser executadas em certificados ordenados em uma direção direta são atrasadas e executadas no caminho depois que ele foi construído (mas antes de ser retornado à aplicação).

Assim como com `CertPathValidator`, a Propriedade de Segurança `jdk.certpath.disabledAlgorithms` pode ser usada para excluir algoritmos criptográficos que não são considerados seguros.

Quando dois ou mais certificados potenciais são descobertos que podem levar a encontrar um caminho que atenda às restrições especificadas, a implementação usa os seguintes critérios na ordem listada para priorizar os certificados:

1. O identificador de chave do assunto corresponde ao identificador de chave de autoridade do certificado atual.
2. O DN do emissor corresponde ao DN do assunto de uma âncora de confiança.
3. O DN do emissor está no mesmo namespace que uma âncora de confiança, ordenado pela maioria dos RDNs em comum, a menos que o único RDN em comum seja geográfico (por exemplo, `C=US`). Por exemplo, se a âncora de confiança tiver um DN de assunto de `OU=D, OU=C, O=B, C=US`, então a implementação prioriza os seguintes certificados com esses DNs de emissor na ordem listada:
   1. `OU=G, OU=C, O=B, C=US` - contém três RDNs em comum
   2. `OU=H, O=B, C=US` - contém dois RDNs em comum
   3. `OU=H, O=D, C=US` - ignorado e não priorizado porque o único ancestral comum, C=US, é geográfico
4. Qualquer outro certificado que não atenda aos critérios anteriores.

O suporte à depuração pode ser ativado definindo a propriedade `java.security.debug` como `certpath`. Por exemplo:
```
    java -Djava.security.debug=certpath BuildCertPath
```

Isso imprimirá informações adicionais de depuração para o erro padrão.

Collection CertStore

O provedor SUN suporta a implementação Collection da classe de motor `CertStore`.

A implementação Collection `CertStore` pode conter quaisquer objetos que sejam uma instância de `java.security.cert.Certificate` ou `java.security.cert.CRL`.

Os certificados e CRLs não são retornados em nenhuma ordem particular e não conterão duplicatas.

Suporte para a Extensão de Pontos de Distribuição de CRL

O suporte para a extensão de Pontos de Distribuição de CRL está disponível. Ele é desabilitado por padrão para compatibilidade e pode ser habilitado definindo a propriedade de sistema `com.sun.security.enableCRLDP` para o valor true.

Se definido como true, a implementação PKIX da Oracle usa as informações na extensão de Pontos de Distribuição de CRL de um certificado (além dos `CertStores` especificados) para encontrar a CRL, desde que o ponto de distribuição seja um nome distinto X.500 ou um URI do tipo ldap, http ou ftp.

Nota:

Dependendo da sua configuração de rede e firewall, pode ser necessário também configurar seus servidores proxy de rede.

Suporte para a Extensão de Acesso a Informações de Autoridade (AIA)

O suporte para o método de acesso `caIssuers` da extensão de Acesso a Informações de Autoridade (AIA) está disponível. Ele é desabilitado por padrão para compatibilidade e pode ser habilitado definindo a propriedade de sistema `com.sun.security.enableAIAcaIssuers` para o valor `true`.

Se definido como true, a implementação PKIX da Oracle de CertPathBuilder usa as informações na extensão AIA de um certificado (além das instâncias de CertStore especificadas) para encontrar o certificado CA emissor, desde que seja um URI do tipo `ldap`, `http` ou `ftp`.

Nota:

Dependendo da sua configuração de rede e firewall, pode ser necessário também configurar seus servidores proxy de rede.

A propriedade de sistema e segurança `com.sun.security.allowedAIALocations` permite definir uma ou mais regras de filtragem a serem aplicadas a URIs obtidas da extensão AIA em certificados X.509. Essas regras de filtro são aplicadas especificamente ao método de acesso de emissores de CA. Quaisquer URIs de emissores de CA em certificados X.509 são seguidos apenas quando a propriedade de sistema `com.sun.security.enableAIAcaIssuers` está habilitada e o filtro permite o URI.

Para definir as regras, você deve definir a propriedade de segurança `com.sun.security.allowedAIALocations` ou a propriedade de sistema com o mesmo nome. Se a propriedade de sistema tiver um valor, ela substituirá a propriedade de segurança. Por padrão, a propriedade está em branco, o que implementa um conjunto de regras de negação total.

Consulte o arquivo `java.security` para mais informações sobre como definir esta propriedade.

Tempos Limites Máximos de Conexão de Rede e Leitura para Recuperações de CRL e OCSP

As seguintes propriedades de sistema definem valores de tempo limite em segundos ou milissegundos. Um número por si só ou anexado por `s` representa um valor em segundos. Por exemplo, `10` e `10s` ambos representam 10 segundos. Um número anexado por `ms` representa um valor em milissegundos. Por exemplo, `1000ms` representa 1000 milissegundos ou 1 segundo. Se uma propriedade não foi definida, ou se seu valor é negativo, ela é definida para o valor padrão de 15 segundos. Um valor de 0 significa um tempo limite infinito.

Tabela 9-1 Tempos Limites Máximos de Conexão de Rede e Leitura para Recuperações de CRL e OCSP

| Propriedade de Sistema | Descrição | Duração Padrão do Tempo Limite |
|---|---|---|
| `com.sun.security.cert.timeout` | Define o tempo limite máximo para estabelecer uma conexão TCP quando especificado na extensão AuthorityInfoAccess de um certificado X.509. | 15 segundos |
| `com.sun.security.cert.readtimeout` | Define o tempo limite máximo para ler dados uma vez que uma conexão TCP tenha sido estabelecida quando especificado na extensão AuthorityInfoAccess de um certificado X.509. | 15 segundos |
| `com.sun.security.crl.timeout` | Define o tempo limite máximo de conexão para recuperações de CRL. | 15 segundos |
| `com.sun.security.crl.readtimeout` | Define o tempo limite máximo de leitura para recuperações de CRL. O tempo limite de leitura impede que um download de CRL demore muito quando uma conexão é estabelecida. | 15 segundos |
| `com.sun.security.ocsp.timeout` | Define o tempo limite máximo para estabelecer uma conexão TCP. | 15 segundos |
| `com.sun.security.ocsp.readtimeout` | Define o tempo limite máximo para ler dados uma vez que uma conexão TCP tenha sido estabelecida. | O valor de `com.sun.security.ocsp.timeout` |

### Apêndice C: Suporte a OCSP

O suporte do lado do cliente para o Protocolo de Status de Certificado Online (OCSP), conforme definido no RFC 2560, é suportado.

A verificação OCSP é controlada pelas seguintes Propriedades de Segurança:

| Nome da Propriedade | Descrição |
|---|---|
| `ocsp.enable` | O valor desta propriedade é true ou false. Se true, a verificação OCSP é habilitada ao fazer a verificação de revogação de certificado; se false ou não definida, a verificação OCSP é desabilitada. |
| `ocsp.responderURL` | O valor desta propriedade é uma URL que identifica a localização do respondedor OCSP. Aqui está um exemplo<br>```<br>    ocsp.responderURL=http://ocsp.example.net:80<br>```<br>Por padrão, a localização do respondedor OCSP é determinada implicitamente a partir do certificado que está sendo validado. A propriedade é usada quando a extensão Authority Information Access (definida no RFC 5280) está ausente do certificado ou quando requer sobrescrita. |
| `ocsp.responderCertSubjectName` | O valor desta propriedade é o nome do assunto do certificado do respondedor OCSP. Aqui está um exemplo<br>```<br>    ocsp.responderCertSubjectName="CN=OCSP Responder, O=XYZ Corp"<br>```<br>Por padrão, o certificado do respondedor OCSP é o do emissor do certificado que está sendo validado. Esta propriedade identifica o certificado do respondedor OCSP quando o padrão não se aplica. Seu valor é um nome distinto de string (definido no RFC 2253) que identifica um certificado no conjunto de certificados fornecidos durante a validação do caminho do certificado. Nos casos em que o nome do assunto sozinho não é suficiente para identificar unicamente o certificado, então ambas as propriedades `ocsp.responderCertIssuerName` e `ocsp.responderCertSerialNumber` devem ser usadas em vez disso. Quando esta propriedade é definida, essas duas propriedades são ignoradas. |
| `ocsp.responderCertIssuerName` | O valor desta propriedade é o nome do emissor do certificado do respondedor OCSP. Aqui está um exemplo<br>```<br>    ocsp.responderCertIssuerName="CN=Enterprise CA, O=XYZ Corp"<br>```<br>Por padrão, o certificado do respondedor OCSP é o do emissor do certificado que está sendo validado. Esta propriedade identifica o certificado do respondedor OCSP quando o padrão não se aplica. Seu valor é um nome distinto de string (definido no RFC 2253) que identifica um certificado no conjunto de certificados fornecidos durante a validação do caminho do certificado. Quando esta propriedade é definida, a propriedade `ocsp.responderCertSerialNumber` também deve ser definida. Observe que esta propriedade é ignorada quando a propriedade `ocsp.responderCertSubjectName` foi definida. |
| `ocsp.responderCertSerialNumber` | O valor desta propriedade é o número de série do certificado do respondedor OCSP. Aqui está um exemplo<br>```<br>    ocsp.responderCertSerialNumber=2A:FF:00<br>```<br>Por padrão, o certificado do respondedor OCSP é o do emissor do certificado que está sendo validado. Esta propriedade identifica o certificado do respondedor OCSP quando o padrão não se aplica. Seu valor é uma string de dígitos hexadecimais (separadores de dois pontos ou espaço podem estar presentes) que identifica um certificado no conjunto de certificados fornecidos durante a validação do caminho do certificado. Quando esta propriedade é definida, a propriedade `ocsp.responderCertIssuerName` também deve ser definida. Observe que esta propriedade é ignorada quando a propriedade `ocsp.responderCertSubjectName` foi definida. |

Essas propriedades podem ser definidas estaticamente no arquivo `<java_home>/conf/security/java.security` do ambiente de execução Java, ou dinamicamente usando o método java.security.Security.setProperty().

Por padrão, a verificação OCSP não está habilitada. Ela é habilitada definindo a propriedade `ocsp.enable` como `"true"`. O uso das propriedades restantes é opcional. Observe que habilitar a verificação OCSP só tem efeito se a verificação de revogação também tiver sido habilitada. A verificação de revogação é habilitada através do método PKIXParameters.setRevocationEnabled().

A verificação OCSP funciona em conjunto com as Listas de Revogação de Certificados (CRLs) durante a verificação de revogação. A seguir, um resumo da interação de OCSP e CRLs. O failover para CRLs ocorre apenas se um problema OCSP for encontrado. O failover não ocorre se o respondedor OCSP confirmar que o certificado foi revogado ou que não foi revogado.

| PKIXParameters RevocationEnabled (padrão=true) | `ocsp.enable` (padrão=false) | Comportamento |
|---|---|---|
| true | true | Verificação de revogação usando OCSP, failover para uso de CRLs |
| true | false | Verificação de revogação usando apenas CRLs |
| false | true | Nenhuma verificação de revogação |
| false | false | Nenhuma verificação de revogação |

#### Habilitar Extensão Nonce do OCSP

A extensão nonce do OCSP vincula criptograficamente uma requisição e uma resposta para prevenir ataques de repetição. A propriedade de sistema `jdk.security.certpath.ocspNonce` permite especificar se a classe PKIXRevocationChecker inclui a extensão nonce do OCSP:

* Se `jdk.security.certpath.OCSPNonce` for `false` e a aplicação fornecer a extensão nonce do OCSP, então a classe PKIXRevocationChecker usa o nonce fornecido pela aplicação na requisição OCSP.
* Se `jdk.security.certpath.OCSPNonce` for `true` e a aplicação não fornecer a extensão nonce, então a classe PKIXRevocationChecker inclui um nonce de 16 bytes em cada requisição OCSP.
* Se `jdk.security.certpath.OCSPNonce` for `true` e a aplicação também fornecer a extensão nonce, então a classe `PKIXRevocationChecker` lança uma exceção.

Por padrão, `jdk.security.certpath.OCSPNonce` é `false`.

#### Desvio Máximo de Relógio Permitido

Você pode encontrar falhas de conexão durante a verificação de revogação porque a rede está lenta ou o relógio do sistema está desajustado em alguma quantidade. Defina o desvio máximo de relógio permitido (a diferença de tempo entre o tempo de resposta e o tempo local), em segundos, usado para verificações de revogação com a propriedade de sistema `com.sun.security.ocsp.clockskew`. Se a propriedade não foi definida, ou se seu valor é negativo, ela é definida para o valor padrão de 900 segundos (15 minutos).

#### Opção de Fallback para Requisições OCSP Apenas POST

Requisições OCSP baseadas em HTTP podem usar o método GET ou POST para enviar suas requisições. Por padrão, o cliente OCSP usa requisições GET para requisições pequenas, que são aquelas com menos de 255 bytes após a codificação. Ele usa requisições POST para todo o resto.

No entanto, se seus respondedores OCSP estiverem encontrando problemas com requisições GET, você pode desabilitar as requisições OCSP GET com a propriedade de sistema do JDK `-Dcom.sun.security.ocsp.useget=false`. O valor padrão desta propriedade é `true`.

### Apêndice D: Implementação de CertPath no Provedor JdkLDAP

O provedor JdkLDAP suporta a implementação LDAP da classe de motor `CertStore`.

LDAP CertStore

A implementação de `CertStore` LDAP recupera certificados e CRLs de um diretório LDAP usando o esquema LDAP definido no RFC 2587.

O atributo de serviço LDAPSchema é definido como "RFC2587".

A implementação busca certificados de diferentes locais, dependendo dos valores dos critérios de seleção de assunto, emissor e basicConstraints especificados no `X509CertSelector`. Ela executa o máximo possível das seguintes operações:

1. Assunto não nulo, basicConstraints <= -1

Procura por certificados no atributo "userCertificate" do DN do assunto.

2. Assunto não nulo, basicConstraints >= -1

Procura por certificados no elemento forward do atributo "crossCertificatePair" do DN do assunto E no atributo "caCertificate" do assunto.

3. Emissor não nulo, basicConstraints >= -1

Procura por certificados no elemento reverse do atributo "crossCertificatePair" do DN do emissor E no atributo "caCertificate" do DN do emissor.

Em cada caso, os certificados são verificados usando X509CertSelector.match() antes de adicioná-los à coleção resultante.

Se nenhuma das condições especificadas anteriormente se aplicar, uma exceção é lançada para indicar que foi impossível buscar certificados usando os critérios fornecidos. Observe que, mesmo que uma ou mais das condições se apliquem, a Collection retornada ainda pode estar vazia se não houver certificados no diretório.

A implementação busca CRLs dos DNs de emissor especificados nos métodos setCertificateChecking, addIssuerName ou setIssuerNames da classe `X509CRLSelector`. Se nenhum DN de emissor tiver sido especificado usando um desses métodos, a implementação lança uma exceção indicando que foi impossível buscar CRLs usando os critérios fornecidos. Caso contrário, as CRLs são pesquisadas da seguinte forma:

1. A implementação primeiro cria uma lista de nomes de emissores. Se um certificado foi especificado no método setCertificateChecking, ela usa o emissor desse certificado. Caso contrário, ela usa os nomes de emissores especificados usando os métodos addIssuerName ou setIssuerNames.

2. Em seguida, a implementação itera pela lista de nomes de emissores. Para cada nome de emissor, ela pesquisa primeiro no atributo `"authorityRevocationList"` do emissor e, então, se nenhuma CRL correspondente for encontrada lá, no atributo `"certificateRevocationList"` do emissor. Uma exceção é que, se o nome do emissor foi obtido do certificado especificado no método setCertificateChecking, ela verifica o atributo `"authorityRevocationList"` do emissor apenas se o certificado especificado for um certificado CA.

3. Todas as CRLs são verificadas usando X509CRLSelector.match() antes de adicioná-las à coleção resultante.

4. Se nenhuma CRL que satisfaça os critérios de seleção puder ser encontrada, uma Collection vazia é retornada.

Cache

Por padrão, cada instância de LDAP CertStore armazena em cache as pesquisas por um máximo de 30 segundos. A vida útil do cache pode ser alterada definindo a propriedade de sistema `sun.security.certpath.ldap.cache.lifetime` para um valor em segundos. Um valor de `0` desabilita o cache completamente. Um valor de `-1` significa vida útil ilimitada.

### Apêndice E: Desabilitando Algoritmos Criptográficos

A Propriedade de Segurança `jdk.certpath.disabledAlgorithms` contém uma lista de algoritmos criptográficos e restrições de tamanho de chave que são considerados fracos ou quebrados. Certificados e outros dados (CRLs, OCSPResponses) contendo qualquer um desses algoritmos ou tamanhos de chave serão bloqueados durante a construção e validação do caminho de certificação. Esta propriedade é usada pela implementação PKIX da Oracle, outras implementações podem não examiná-la e usá-la.

A sintaxe exata da Propriedade de Segurança `jdk.certpath.disabledAlgorithms` é descrita no arquivo `java.security`. Consulte Algoritmos Criptográficos Desabilitados e Restritos para mais informações sobre esta propriedade.

Administradores ou usuários podem modificar o valor da propriedade `jdk.certpath.disabledAlgorithms` para atender a requisitos de segurança adicionais. No entanto, remover qualquer um dos algoritmos ou tamanhos de chave atuais não é recomendado.

Nota:

As restrições de algoritmo especificadas por esta Propriedade de Segurança não se aplicam a âncoras de confiança ou certificados autoassinados.