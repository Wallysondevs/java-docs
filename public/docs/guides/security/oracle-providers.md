# Documentação dos Provedores JDK

## 4 Documentação dos Provedores JDK

O conteúdo do script nesta página é apenas para fins de navegação e não altera o conteúdo de forma alguma.

Este documento contém os detalhes técnicos dos provedores incluídos no JDK. Presume-se que os leitores tenham um forte entendimento da Java Cryptography Architecture e da Provider Architecture.

Nota:

O [Java Security Standard Algorithm Names](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html>) contém mais informações sobre os nomes padrão usados neste documento.

Tópicos

[Introdução aos Provedores JDK](<#/doc/guides/security/oracle-providers>)

[Limites de Importação em Algoritmos Criptográficos](<#/doc/guides/security/oracle-providers>)

[Transformações de Cifra](<#/doc/guides/security/oracle-providers>)

[Implementações de SecureRandom](<#/doc/guides/security/oracle-providers>)

[O Provedor SunPKCS11](<#/doc/guides/security/oracle-providers>)

[O Provedor SUN](<#/doc/guides/security/oracle-providers>)

[O Provedor SunRsaSign](<#/doc/guides/security/oracle-providers>)

[O Provedor SunJSSE](<#/doc/guides/security/oracle-providers>)

[O Provedor SunJCE](<#/doc/guides/security/oracle-providers>)

[O Provedor SunJGSS](<#/doc/guides/security/oracle-providers>)

[O Provedor SunSASL](<#/doc/guides/security/oracle-providers>)

[O Provedor XMLDSig](<#/doc/guides/security/oracle-providers>)

[O Provedor SunPCSC](<#/doc/guides/security/oracle-providers>)

[O Provedor SunMSCAPI](<#/doc/guides/security/oracle-providers>)

[O Provedor SunEC](<#/doc/guides/security/oracle-providers>)

[O Provedor Apple](<#/doc/guides/security/oracle-providers>)

[O Provedor JdkLDAP](<#/doc/guides/security/oracle-providers>)

[O Provedor JdkSASL](<#/doc/guides/security/oracle-providers>)

### Introdução aos Provedores JDK

A plataforma Java define um conjunto de APIs que abrangem as principais áreas de segurança, incluindo criptografia, infraestrutura de chave pública, autenticação e comunicação segura. Essas APIs permitem que os desenvolvedores integrem facilmente mecanismos de segurança em seu código de aplicação.

A [Java Cryptography Architecture (JCA)](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) e sua [Provider Architecture](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) são conceitos centrais do Java Development Kit (JDK). Presume-se que os leitores tenham um sólido entendimento desta arquitetura.

Lembrete: As implementações criptográficas no JDK são distribuídas através de vários provedores diferentes ("SUN", "SunJSSE", "SunJCE", "SunRsaSign") tanto por razões históricas quanto pelos tipos de serviços fornecidos. Aplicações de propósito geral NÃO DEVEM solicitar serviços criptográficos de provedores específicos. Ou seja:
```
    getInstance("...", "SunJCE");  // não recomendado
```

versus
```
    getInstance("...");            // recomendado
```

Caso contrário, as aplicações ficam vinculadas a provedores específicos que podem não estar disponíveis em outras implementações Java. Elas também podem não conseguir aproveitar os provedores otimizados disponíveis (por exemplo, aceleradores de hardware via PKCS11 ou implementações nativas do sistema operacional, como o MSCAPI da Microsoft) que têm uma ordem de preferência mais alta do que o provedor específico solicitado.

A tabela a seguir lista os módulos e os Java Cryptographic Service Providers suportados:

Tabela 4-1 Módulos e os Java Cryptographic Service Providers

Module | Provider(s)
---|---
java.base | SUN, SunRsaSign, SunJSSE, SunJCE, Apple
java.naming | JdkLDAP
java.security.jgss | SunJGSS
java.security.sasl | SunSASL
java.smartcardio | SunPCSC
java.xml.crypto | XMLDSig
jdk.crypto.cryptoki | SunPKCS11
jdk.crypto.ec | SunEC
jdk.crypto.mscapi | SunMSCAPI
jdk.security.jgss | JdkSASL

### Limites de Importação em Algoritmos Criptográficos

Por padrão, uma aplicação pode usar algoritmos criptográficos de qualquer força. No entanto, devido a regulamentações de importação em alguns locais, pode ser necessário limitar a força desses algoritmos. O JDK fornece dois conjuntos diferentes de arquivos de política de jurisdição no diretório `<java-home>/conf/security/policy` que determinam a força dos algoritmos criptográficos. Informações sobre os arquivos de política de jurisdição e como ativá-los estão disponíveis em [Configuração da Força Criptográfica](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Consulte seu advogado ou consultor de controle de exportação/importação para determinar os requisitos exatos para sua localização.

Para a configuração "limitada", a tabela a seguir lista os tamanhos máximos de chave permitidos pelo conjunto "limitado" de arquivos de política de jurisdição:

Tabela 4-2 Tamanho Máximo de Chave de Algoritmos Criptográficos

Algorithm | Maximum Keysize
---|---
DES | 64
DESede | *
RC2 | 128
RC4 | 128
RC5 | 128
RSA | *
all others | 128

### Transformações de Cifra

O método de fábrica `javax.crypto.Cipher.getInstance(String transformation)` gera objetos `Cipher` usando transformações do formato algorithm/mode/padding. Se o mode/padding forem omitidos, os provedores SunJCE e SunPKCS11 usam ECB como modo padrão e PKCS5Padding como preenchimento padrão para muitas cifras simétricas.

Recomenda-se usar transformações que especifiquem completamente o algoritmo, modo e preenchimento, em vez de depender dos padrões. Os padrões são específicos do provedor e podem variar entre os provedores.

Nota:

O modo ECB é o modo de cifra de bloco mais fácil de usar e é o modo de cifra padrão. O ECB funciona bem para blocos únicos de dados e pode ser paralelizado, mas geralmente não deve ser usado para criptografar múltiplos blocos de dados devido às características do modo. Isso pode resultar na divulgação trivial e completa de dados confidenciais. Embora este modo esteja disponível para uso, ele só deve ser usado com uma compreensão dos riscos criptográficos envolvidos.

### Implementações de SecureRandom

A tabela a seguir lista a ordem de preferência padrão das implementações de `SecureRandom` disponíveis.

Tabela 4-3 Implementações Padrão de SecureRandom

OS | Algorithm Name | Provider Name
---|---|---
Linux | 1. NativePRNGFoot 1 | SUN
2. DRBG | SUN
3. SHA1PRNG Foot 1 | SUN
4. NativePRNGBlocking | SUN
5. NativePRNGNonBlocking | SUN
macOS | 1. NativePRNGFoot 1 | SUN
2. DRBG | SUN
3. SHA1PRNGFoot 1 | SUN
4. NativePRNGBlocking | SUN
5. NativePRNGNonBlocking | SUN
Windows | 1. DRBG | SUN
2. SHA1PRNG | SUN
3. Windows-PRNGFoot 2 | SunMSCAPI

Nota de Rodapé 1 No Linux e macOS, se o dispositivo de coleta de entropia em `java.security` estiver definido como `file:/dev/urandom` ou `file:/dev/random`, então NativePRNG é preferido a SHA1PRNG. Caso contrário, SHA1PRNG é preferido.

Nota de Rodapé 2 Atualmente não há NativePRNG no Windows. O acesso à funcionalidade equivalente é feito através do provedor SunMSCAPI.

### O Provedor SunPKCS11

O Padrão de Interface de Token Criptográfico ([PKCS#11](<https://docs.oasis-open.org/pkcs11/pkcs11-base/v3.0/pkcs11-base-v3.0.html>)) fornece interfaces de programação nativas para mecanismos criptográficos, como aceleradores criptográficos de hardware e Smart Cards. Quando configurado corretamente, o provedor `SunPKCS11` permite que as aplicações usem as APIs JCA/JCE padrão para acessar bibliotecas PKCS#11 nativas. O provedor `SunPKCS11` em si não contém funcionalidade criptográfica, é simplesmente um conduto entre o ambiente Java e os provedores PKCS#11 nativos. O [PKCS#11 Reference Guide](<#/doc/guides/security/pkcs11-reference-guide1>) possui um tratamento muito mais detalhado deste provedor.

### O Provedor SUN

Algoritmos

Os seguintes algoritmos estão disponíveis no provedor `SUN`:

Tabela 4-4 Algoritmos no provedor SUN

Engine | Algorithm Names
---|---
`AlgorithmParameterGenerator` | DSA
`AlgorithmParameters` | DSA
`CertificateFactory` | X.509
`CertPathBuilder` | PKIX
`CertPathValidator` | PKIX
`CertStore` | Collection
`Configuration` | JavaLoginConfig
`KeyFactory` | DSA HSS/LMSFoot 3 ML-DSA ML-DSA-44 ML-DSA-65 ML-DSA-87
`KeyPairGenerator` | DSAFoot 4 ML-DSAFoot 5 ML-DSA-44 ML-DSA-65 ML-DSA-87
`KeyStore` | PKCS12Foot 6 JKS DKS CaseExactJKS
`MessageDigest` | MD2 MD5 SHA-1 SHA-224 SHA-256 SHA-384 SHA-512 SHA-512/224 SHA-512/256 SHA3-224 SHA3-256 SHA3-384 SHA3-512SHAKE128-256 SHAKE256-512
`SecureRandom` | DRBG (Os seguintes mecanismos e algoritmos são suportados: Hash_DRBG e HMAC_DRBG com SHA-224, SHA-512/224, SHA-256, SHA-512/256, SHA-384 e SHA-512. CTR_DRBG (ambos usam função de derivação e não usam) com AES-128, AES-192 e AES-256. Resistência à predição e reseeding suportados para cada combinação, e a força de segurança pode ser solicitada de 112 até a maior força que um suporta.) SHA1PRNG (A semeadura inicial é atualmente feita através de uma combinação de atributos do sistema e do dispositivo de coleta de entropia `java.security`.) NativePRNG (`nextBytes()` usa `/dev/urandom`, `generateSeed()` usa `/dev/random`) NativePRNGBlocking (`nextBytes()` e `generateSeed()` usam `/dev/random`) NativePRNGNonBlocking (`nextBytes()` e `generateSeed()` usam `/dev/urandom`)
`Signature` | HSS/LMSFoot 7 ML-DSA ML-DSA-44 ML-DSA-65 ML-DSA-87 NONEwithDSA SHA1withDSA SHA224withDSA SHA256withDSA SHA384withDSA SHA512withDSA NONEwithDSAinP1363Format SHA1withDSAinP1363Format SHA224withDSAinP1363Format SHA256withDSAinP1363Format SHA384withDSAinP1363Format SHA512withDSAinP1363Format SHA3-224withDSA SHA3-256withDSA SHA3-384withDSA SHA3-512withDSA SHA3-224withDSAinP1363Format SHA3-256withDSAinP1363Format SHA3-384withDSAinP1363Format SHA3-512withDSAinP1363Format Nota:Para geração de assinatura, se a força de segurança do algoritmo de digest for mais fraca do que a força de segurança da chave usada para assinar a assinatura (por exemplo, usando chaves DSA de (2048, 256)-bit com a assinatura SHA1withDSA), então a operação falhará com a mensagem de erro: "The security strength of SHA1 digest algorithm is not sufficient for this key size."

Nota de Rodapé 3 A implementação KeyFactory de HSS/LMS suporta apenas o gerenciamento de chaves públicas. Uma InvalidKeySpecException é lançada se o método generatePrivate for chamado ou se os métodos getKeySpec e translateKey forem chamados com uma chave privada.

Nota de Rodapé 4 Se o KeyPairGenerator gerar um par de chaves com o algoritmo DSA, e o tamanho da chave (tamanho do módulo) for 512, 768, 1024 ou 2048, então o provedor `SUN` usa um conjunto de valores pré-calculados para os parâmetros p, q e g. Se o tamanho do módulo não for um desses valores, então o provedor `SUN` cria um novo conjunto de parâmetros.

Nota de Rodapé 5 O algoritmo ML-DSA KeyPairGenerator pode ser inicializado com os parâmetros ML-DSA-44, ML-DSA-65 ou ML-DSA-87. Se você inicializar o algoritmo ML-DSA KeyPairGenerator sem nenhum parâmetro, por padrão ele usará os parâmetros ML-DSA-65. Consulte [ParameterSpec Names](<#/>) em [Java Security Standard Algorithm Names](<#/>).

Nota de Rodapé 6 A implementação PKCS12 KeyStore não suporta o tipo KeyBag. Você pode criar um arquivo keystore PKCS12 sem senha chamando o método KeyStore.store() com uma senha nula. Os certificados neste keystore são armazenados sem criptografia, e nenhum MacData é adicionado. Este keystore pode ser carregado com qualquer senha (incluindo nula). Observe que as chaves em um keystore são sempre armazenadas criptografadas.

Nota de Rodapé 7 A implementação Signature de HSS/LMS suporta apenas a verificação de assinatura. Uma InvalidKeyException é lançada se o método initSign for chamado com uma chave privada.

Identificadores de Objeto Associados a SHA Message Digests e DSA Signatures

A tabela a seguir lista os identificadores de objeto (OIDs) associados a SHA Message Digests:

Tabela 4-5 OIDs associados a SHA Message Digests

SHA Message Digest | OID
---|---
SHA-224 | 2.16.840.1.101.3.4.2.4
SHA-256 | 2.16.840.1.101.3.4.2.1
SHA-384 | 2.16.840.1.101.3.4.2.2
SHA-512 | 2.16.840.1.101.3.4.2.3
SHA-512/224 | 2.16.840.1.101.3.4.2.5
SHA-512/256 | 2.16.840.1.101.3.4.2.6
SHA3-224 | 2.16.840.1.101.3.4.2.7
SHA3-256 | 2.16.840.1.101.3.4.2.8
SHA3-384 | 2.16.840.1.101.3.4.2.9
SHA3-512 | 2.16.840.1.101.3.4.2.10

A tabela a seguir lista os OIDs associados a DSA Signatures:

Tabela 4-6 OIDs associados a DSA Signatures

DSA Signature | OID
---|---
ML-DSA-44 | 2.16.840.1.101.3.4.3.17
ML-DSA-65 | 2.16.840.1.101.3.4.3.18
ML-DSA-87 | 2.16.840.1.101.3.4.3.19
SHA1withDSA | 1.2.840.10040.4.3 1.3.14.3.2.13 1.3.14.3.2.27
SHA224withDSA | 2.16.840.1.101.3.4.3.1
SHA256withDSA | 2.16.840.1.101.3.4.3.2
SHA384withDSA | 2.16.840.1.101.3.4.3.3
SHA512withDSA | 2.16.840.1.101.3.4.3.4
SHA3-224withDSA | 2.16.840.1.101.3.4.3.5
SHA3-256withDSA | 2.16.840.1.101.3.4.3.6
SHA3-384withDSA | 2.16.840.1.101.3.4.3.7
SHA3-512withDSA | 2.16.840.1.101.3.4.3.8

Restrições de Tamanho de Chave

O provedor `SUN` usa os seguintes tamanhos de chave padrão (em bits) e impõe as seguintes restrições:

Tabela 4-7 Restrições de Tamanho de Chave do Algoritmo KeyPairGenerator

Algorithm Name | Default Keysize | Restrictions/Comments
---|---|---
DSA | 2048 | Keysize must be a multiple of 64, ranging from 512 to 1024, plus 2048 and 3072.

Tabela 4-8 Restrições de Tamanho de Chave do Algoritmo AlgorithmParameterGenerator

Algorithm Name | Default Keysize | Restrictions/Comments
---|---|---
DSA | 2048 | Keysize must be a multiple of 64, ranging from 512 to 1024, plus 2048 and 3072.

Implementações de CertificateFactory/CertPathBuilder/CertPathValidator/CertStore

Consulte [Apêndice B: Implementação de CertPath no Provedor SUN](<#/doc/guides/security/java-pki-programmers-guide>) no Guia do Programador Java PKI para detalhes das implementações do provedor `SUN` para `CertificateFactory`, `CertPathBuilder`, `CertPathValidator` e `CertStore`.

### O Provedor SunRsaSign

Algoritmos

Os seguintes algoritmos estão disponíveis no provedor `SunRsaSign`:

Tabela 4-9 Nomes de Algoritmos do Provedor SunRsaSign para Classes de Engine

Engine | Algorithm Names
---|---
`AlgorithmParameters` | RSASSA-PSS
`KeyFactory` | RSA RSASSA-PSS
`KeyPairGenerator` | RSA RSASSA-PSS
`Signature` | MD2withRSA MD5withRSA SHA1withRSA SHA224withRSA SHA256withRSA SHA384withRSA SHA512withRSA SHA512/224withRSA SHA512/256withRSA SHA3-224withRSA SHA3-256withRSA SHA3-384withRSA SHA3-512withRSA RSASSA-PSSFoot 8

Nota de Rodapé 8 A implementação de assinatura RSASSA-PSS suporta a função de geração de máscara MGF1 e as famílias de algoritmos de digest SHA-1, SHA-2 e SHA-3. Consulte [RFC 8017: PKCS #1: RSA Cryptography Specifications Version 2.2, Apêndice A.2.3, "RSASSA-PSS"](<https://datatracker.ietf.org/doc/html/rfc8017#appendix-A.2.3>).

Restrições de Tamanho de Chave

O provedor `SunRsaSign` usa o seguinte tamanho de chave padrão (em bits) e impõe a seguinte restrição:

Tabela 4-10 Restrições de Tamanho de Chave do Provedor SunRsaSign

Alg. Name | Default Keysize | Restrictions/Comments
---|---|---
RSA and RSASSA-PSS | 3072 | Keysize must range between 512 and 16384 bits. If the key size exceeds 3072, then the public exponent length cannot exceed 64 bits.

### O Provedor SunJSSE

Algoritmos

Os seguintes algoritmos estão disponíveis no provedor `SunJSSE`:

Tabela 4-11 Algoritmos no Provedor SunJSSE

Engine | Algorithm Name(s)
---|---
`KeyManagerFactory` | PKIX: Uma fábrica para instâncias `X509ExtendedKeyManager` que gerenciam pares de chaves baseados em certificados X.509 para autenticação do lado local de acordo com as regras definidas pelo grupo de trabalho IETF PKIX no [RFC 5280](<http://www.ietf.org/rfc/rfc5280.txt>). Esta `KeyManagerFactory` atualmente suporta inicialização usando um objeto `KeyStore` ou `javax.net.ssl.KeyStoreBuilderParameters`. SunX509: Uma fábrica para instâncias `X509ExtendedKeyManager` que gerenciam pares de chaves baseados em certificados X.509 para autenticação do lado local, mas com verificação menos rigorosa de uso/validade de certificado e verificação de cadeia. Esta `KeyManagerFactory` suporta inicialização usando um objeto `Keystore`, mas atualmente não suporta inicialização usando a classe `javax.net.ssl.ManagerFactoryParameters`. Nota: A fábrica SunX509 é para compatibilidade retroativa com versões mais antigas e não deve mais ser usada.
`KeyStore` | PKCS12 Nota: O provedor SunJSSE é para compatibilidade retroativa com versões mais antigas e não deve mais ser usado para `KeyStore`.
`SSLContext` | SSL SSLv3 TLS TLSv1 TLSv1.1 TLSv1.2 TLSv1.3 DTLS DTLSv1.0 DTLSv1.2
`TrustManagerFactory` | PKIX: Uma fábrica para instâncias `X509ExtendedTrustManager` que validam cadeias de certificados de acordo com as regras definidas pelo grupo de trabalho IETF PKIX no [RFC 5280](<http://www.ietf.org/rfc/rfc5280.txt>). Esta `TrustManagerFactory` atualmente suporta inicialização usando um objeto `KeyStore` ou `javax.net.ssl.CertPathTrustManagerParameters`. SunX509: Uma fábrica para instâncias `X509ExtendedTrustManager` que validam cadeias de certificados, mas com verificação menos rigorosa de uso/validade de certificado e verificação de cadeia. Esta `TrustManagerFactory` suporta inicialização usando um objeto `Keystore`, mas atualmente não suporta inicialização usando a classe `javax.net.ssl.ManagerFactoryParameters`. Nota: A fábrica SunX509 é para compatibilidade retroativa com versões mais antigas e não deve mais ser usada.

Parâmetros de Protocolo do Provedor SunJSSE

O provedor `SunJSSE` suporta os parâmetros de `protocol` listados na [Tabela 4-12](<#/doc/guides/security/oracle-providers>).

Tabela 4-12 Versões de Protocolo do Provedor SunJSSE

Protocol Version | Enabled by Default for Client | Enabled by Default for Server
---|---|---
SSLv3 | No | No
TLSv1Foot 9 | Yes | Yes
TLSv1.1Foot 9 | Yes | Yes
TLSv1.2 | Yes | Yes
TLSv1.3 | Yes | Yes
SSLv2Hello | No | No
DTLSv1.0 | Yes | Yes
DTLSv1.2 | Yes | Yes

Nota de Rodapé 9 TLS 1.0 e 1.1 são versões do protocolo TLS que não são mais consideradas seguras e foram substituídas por versões mais seguras e modernas (TLS 1.2 e 1.3). Essas versões foram agora desabilitadas por padrão. Se você encontrar problemas, pode, por sua própria conta e risco, reativar as versões removendo `TLSv1` ou `TLSv1.1` da Propriedade de Segurança `jdk.tls.disabledAlgorithms` no arquivo de configuração `java.security`.

Nota:

Os protocolos disponíveis por padrão em uma versão do JDK mudam à medida que novos protocolos são desenvolvidos e protocolos antigos são considerados menos eficazes do que se pensava anteriormente. O JDK usa dois mecanismos para restringir a disponibilidade desses protocolos:

  * A Propriedade de Segurança `jdk.tls.disabledAlgorithms`: Isso desabilita categorias de protocolos e cipher suites. Por exemplo, se esta Propriedade de Segurança contiver `SSLv3`, então o protocolo SSLv3 seria desabilitado. Consulte [Algoritmos Criptográficos Desabilitados e Restritos](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) para obter informações sobre esta Propriedade de Segurança.
  * Mover o protocolo para a lista de protocolos não habilitados por padrão, conforme indicado na [Tabela 4-12](<#/doc/guides/security/oracle-providers>).

As versões de protocolo habilitadas de uma implementação SSLContext podem diferir dos valores padrão na tabela anterior, dependendo do algoritmo e de seu modo (cliente ou servidor). As tabelas a seguir listam as versões de protocolo habilitadas para implementações SSLContext que diferem do padrão:

Tabela 4-13 Versões de Protocolo Habilitadas para Implementações Específicas de SSLContext no Modo Cliente

SSLContext Algorithm | SSL/TLS/DTLS Protocol Version
---|---
SSLv2Hello | SSLv3 | TLSv1 | TLSv1.1 | TLSv1.2 | TLSv1.3 | DTLSv1.0 | DTLSv1.2
SSLv3 | No | No | Yes | No | No | No | N/A | N/A
TLSv1 | No | No | Yes | No | No | No | N/A | N/A
TLSv1.1 | No | No | Yes | Yes | No | No | N/A | N/A
TLSv1.2 | No | No | Yes | Yes | Yes | No | N/A | N/A
TLSv1.3 | No | No | Yes | Yes | Yes | Yes | N/A | N/A
Default | No | No | Yes | Yes | Yes | Yes | N/A | N/A
TLS | No | No | Yes | Yes | Yes | Yes | N/A | N/A
SSL | No | No | Yes | Yes | Yes | Yes | N/A | N/A
DTLSv1.0 | N/A | N/A | N/A | N/A | N/A | N/A | Yes | No
DTLSv1.2 | N/A | N/A | N/A | N/A | N/A | N/A | Yes | Yes
DTLS | N/A | N/A | N/A | N/A | N/A | N/A | Yes | Yes

Tabela 4-14 Versões de Protocolo Habilitadas para Implementações Específicas de SSLContext no Modo Servidor

SSLContext Algorithm | SSL/TLS/DTLS Protocol Version
---|---
SSLv2Hello | SSLv3 | TLSv1 | TLSv1.1 | TLSv1.2 | TLSv1.3 | DTLSv1.0 | DTLSv1.2
SSLv3 | No | No | Yes | Yes | Yes | Yes | N/A | N/A
TLSv1 | No | No | Yes | Yes | Yes | Yes | N/A | N/A
TLSv1.1 | No | No | Yes | Yes | Yes | Yes | N/A | N/A
TLSv1.2 | No | No | Yes | Yes | Yes | Yes | N/A | N/A
TLSv1.3 | No | No | Yes | Yes | Yes | Yes | N/A | N/A
Default | No | No | Yes | Yes | Yes | Yes | N/A | N/A
TLS | No | No | Yes | Yes | Yes | Yes | N/A | N/A
SSL | No | No | Yes | Yes | Yes | Yes | N/A | N/A
DTLSv1.0 | N/A | N/A | N/A | N/A | N/A | N/A | Yes | Yes
DTLSv1.2 | N/A | N/A | N/A | N/A | N/A | N/A | Yes | Yes
DTLS | N/A | N/A | N/A | N/A | N/A | N/A | Yes | Yes

Cipher Suites do SunJSSE

A seguir estão os cipher suites do SunJSSE atualmente implementados para esta versão do JDK, ordenados por preferência. Nem todos esses cipher suites estão disponíveis para uso por padrão. Consulte [JSSE Cipher Suite Names](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html#jsse-cipher-suite-names>) em Java Security Standard Algorithm Names para determinar quais protocolos cada cipher suite suporta.

  * TLS_AES_128_GCM_SHA256
  * TLS_AES_256_GCM_SHA384
  * TLS_CHACHA20_POLY1305_SHA256
  * TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384
  * TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256
  * TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256
  * TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
  * TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256
  * TLS_RSA_WITH_AES_256_GCM_SHA384
  * TLS_ECDH_ECDSA_WITH_AES_256_GCM_SHA384
  * TLS_ECDH_RSA_WITH_AES_256_GCM_SHA384
  * TLS_DHE_RSA_WITH_AES_256_GCM_SHA384
  * TLS_DHE_RSA_WITH_CHACHA20_POLY1305_SHA256
  * TLS_DHE_DSS_WITH_AES_256_GCM_SHA384
  * TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
  * TLS_RSA_WITH_AES_128_GCM_SHA256
  * TLS_ECDH_ECDSA_WITH_AES_128_GCM_SHA256
  * TLS_ECDH_RSA_WITH_AES_128_GCM_SHA256
  * TLS_DHE_RSA_WITH_AES_128_GCM_SHA256
  * TLS_DHE_DSS_WITH_AES_128_GCM_SHA256
  * TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384
  * TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384
  * TLS_RSA_WITH_AES_256_CBC_SHA256
  * TLS_ECDH_ECDSA_WITH_AES_256_CBC_SHA384
  * TLS_ECDH_RSA_WITH_AES_256_CBC_SHA384
  * TLS_DHE_RSA_WITH_AES_256_CBC_SHA256
  * TLS_DHE_DSS_WITH_AES_256_CBC_SHA256
  * TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA
  * TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA
  * TLS_RSA_WITH_AES_256_CBC_SHA
  * TLS_ECDH_ECDSA_WITH_AES_256_CBC_SHA
  * TLS_ECDH_RSA_WITH_AES_256_CBC_SHA
  * TLS_DHE_RSA_WITH_AES_256_CBC_SHA
  * TLS_DHE_DSS_WITH_AES_256_CBC_SHA
  * TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256
  * TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256
  * TLS_RSA_WITH_AES_128_CBC_SHA256
  * TLS_ECDH_ECDSA_WITH_AES_128_CBC_SHA256
  * TLS_ECDH_RSA_WITH_AES_128_CBC_SHA256
  * TLS_DHE_RSA_WITH_AES_128_CBC_SHA256
  * TLS_DHE_DSS_WITH_AES_128_CBC_SHA256
  * TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA
  * TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA
  * TLS_RSA_WITH_AES_128_CBC_SHA
  * TLS_ECDH_ECDSA_WITH_AES_128_CBC_SHA
  * TLS_ECDH_RSA_WITH_AES_128_CBC_SHA
  * TLS_DHE_RSA_WITH_AES_128_CBC_SHA
  * TLS_DHE_DSS_WITH_AES_128_CBC_SHA
  * TLS_ECDHE_ECDSA_WITH_3DES_EDE_CBC_SHA
  * TLS_ECDHE_RSA_WITH_3DES_EDE_CBC_SHA
  * SSL_RSA_WITH_3DES_EDE_CBC_SHA
  * TLS_ECDH_ECDSA_WITH_3DES_EDE_CBC_SHA
  * TLS_ECDH_RSA_WITH_3DES_EDE_CBC_SHA
  * SSL_DHE_RSA_WITH_3DES_EDE_CBC_SHA
  * SSL_DHE_DSS_WITH_3DES_EDE_CBC_SHA
  * TLS_EMPTY_RENEGOTIATION_INFO_SCSV
  * TLS_DH_anon_WITH_AES_256_GCM_SHA384
  * TLS_DH_anon_WITH_AES_128_GCM_SHA256
  * TLS_DH_anon_WITH_AES_256_CBC_SHA256
  * TLS_ECDH_anon_WITH_AES_256_CBC_SHA
  * TLS_DH_anon_WITH_AES_256_CBC_SHA
  * TLS_DH_anon_WITH_AES_128_CBC_SHA256
  * TLS_ECDH_anon_WITH_AES_128_CBC_SHA
  * TLS_DH_anon_WITH_AES_128_CBC_SHA
  * TLS_ECDH_anon_WITH_3DES_EDE_CBC_SHA
  * SSL_DH_anon_WITH_3DES_EDE_CBC_SHA
  * TLS_ECDHE_ECDSA_WITH_RC4_128_SHA
  * TLS_ECDHE_RSA_WITH_RC4_128_SHA
  * SSL_RSA_WITH_RC4_128_SHA
  * TLS_ECDH_ECDSA_WITH_RC4_128_SHA
  * TLS_ECDH_RSA_WITH_RC4_128_SHA
  * SSL_RSA_WITH_RC4_128_MD5
  * TLS_ECDH_anon_WITH_RC4_128_SHA
  * SSL_DH_anon_WITH_RC4_128_MD5
  * SSL_RSA_WITH_DES_CBC_SHA
  * SSL_DHE_RSA_WITH_DES_CBC_SHA
  * SSL_DHE_DSS_WITH_DES_CBC_SHA
  * SSL_DH_anon_WITH_DES_CBC_SHA
  * SSL_RSA_EXPORT_WITH_DES40_CBC_SHA
  * SSL_DHE_RSA_EXPORT_WITH_DES40_CBC_SHA
  * SSL_DHE_DSS_EXPORT_WITH_DES40_CBC_SHA
  * SSL_DH_anon_EXPORT_WITH_DES40_CBC_SHA
  * SSL_RSA_EXPORT_WITH_RC4_40_MD5
  * SSL_DH_anon_EXPORT_WITH_RC4_40_MD5
  * TLS_RSA_WITH_NULL_SHA256
  * TLS_ECDHE_ECDSA_WITH_NULL_SHA
  * TLS_ECDHE_RSA_WITH_NULL_SHA
  * SSL_RSA_WITH_NULL_SHA
  * TLS_ECDH_ECDSA_WITH_NULL_SHA
  * TLS_ECDH_RSA_WITH_NULL_SHA
  * TLS_ECDH_anon_WITH_NULL_SHA
  * SSL_RSA_WITH_NULL_MD5

Nota:

  * A ordem de preferência do cipher suite pode mudar em futuras versões.
  * TLS_EMPTY_RENEGOTIATION_INFO_SCSV é um pseudo-cipher suite que suporta o RFC 5746.

Os cipher suites disponíveis por padrão em uma versão do JDK mudam à medida que novos algoritmos são desenvolvidos e algoritmos antigos são considerados menos eficazes do que se pensava anteriormente. O Oracle JDK usa dois mecanismos para restringir a disponibilidade desses algoritmos:

  * A Propriedade de Segurança `jdk.tls.disabledAlgorithms`, que desabilita categorias de cipher suites. Por exemplo, se esta Propriedade de Segurança contiver `RC4`, então todos os cipher suites baseados em RC4 seriam desabilitados.
  * Mover o cipher suite para a lista de suites não habilitados por padrão.

Consulte [Algoritmos Criptográficos Desabilitados e Restritos](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) para obter informações sobre a Propriedade de Segurança `jdk.tls.disabledAlgorithms`.

Determinando a Lista Atual de Protocolos e Cipher Suites Disponíveis por Padrão

Para obter a lista atual de protocolos e cipher suites que estão disponíveis por padrão, execute um dos seguintes comandos:
```
    keytool -showinfo -tls
    java -XshowSettings:security:tls
```

Observe que a lista gerada por esses comandos não inclui suites que a Propriedade de Segurança `jdk.tls.disabledAlgorithms` desabilitou.

Verificação Mais Rigorosa dos Números de Versão de EncryptedPreMasterSecret

Antes do lançamento do JDK 7, a implementação SSL/TLS não verificava o número de versão em PreMasterSecret, e o cliente SSL/TLS não enviava o número de versão correto por padrão. A menos que a propriedade de sistema `com.sun.net.ssl.rsaPreMasterSecretFix` esteja definida como `true`, o cliente TLS envia a versão negociada ativa, mas não a versão máxima esperada suportada pelo cliente.

Para compatibilidade, este comportamento é preservado para SSL versão 3.0 e TLS versão 1.0. No entanto, para TLS versão 1.1 ou posterior, a implementação intensifica a verificação dos números de versão de PreMasterSecret conforme exigido pelo [RFC 5246](<http://www.ietf.org/rfc/rfc5246.txt>). Os clientes sempre enviam o número de versão correto, e os servidores verificam o número de versão estritamente. A propriedade de sistema, `com.sun.net.ssl.rsaPreMasterSecretFix`, não é usada em TLS 1.1 ou posterior.

### O Provedor SunJCE

Conforme descrito brevemente em O Provedor SUN, as regulamentações de exportação dos EUA na época restringiam o tipo de funcionalidade criptográfica que poderia estar disponível no JDK. Uma API separada e uma implementação de referência foram desenvolvidas que permitiam que as aplicações criptografassem/descriptografassem dados. A Java Cryptographic Extension (JCE) foi lançada como um “Pacote Opcional” separado (também brevemente conhecido como “Extensão Padrão”), e estava disponível para JDK 1.2x e 1.3x. Durante o desenvolvimento do JDK 1.4, as regulamentações foram relaxadas o suficiente para que a JCE (e SunJSSE) pudesse ser incluída como parte do JDK.
Os seguintes algoritmos estão disponíveis no provedor SunJCE:

Tabela 4-15 Nomes de Algoritmos do Provedor SunJCE para Classes de Motor

Motor | Nomes de Algoritmos
---|---
`AlgorithmParameterGenerator` | DiffieHellman
`AlgorithmParameters` | AES Blowfish ChaCha20-Poly1305 DES DESede DiffieHellman GCM OAEP PBE PBES2 PBEWithHmacSHA1AndAES_128 PBEWithHmacSHA224AndAES_128 PBEWithHmacSHA256AndAES_128 PBEWithHmacSHA384AndAES_128 PBEWithHmacSHA512AndAES_128 PBEWithHmacSHA512/224AndAES_128 PBEWithHmacSHA512/256AndAES_128 PBEWithHmacSHA1AndAES_256 PBEWithHmacSHA224AndAES_256 PBEWithHmacSHA256AndAES_256 PBEWithHmacSHA384AndAES_256 PBEWithHmacSHA512/224AndAES_256 PBEWithHmacSHA512/256AndAES_256 PBEWithHmacSHA512AndAES_256 PBEWithMD5AndDES PBEWithMD5AndTripleDES PBEWithSHA1AndDESede PBEWithSHA1AndRC2_40 PBEWithSHA1AndRC2_128 PBEWithSHA1AndRC4_40 PBEWithSHA1AndRC4_128 RC2
`Cipher` | Consulte [Tabela 4-16](<#/doc/guides/security/oracle-providers>)
`KDF` | HKDF-SHA256 HKDF-SHA384 HKDF-SHA512
KEM | ML-KEM ML-KEM-512 ML-KEM-768 ML-KEM-1024 DHKEMFoot 10
`KeyAgreement` | DiffieHellman
`KeyFactory` | DiffieHellman ML-KEM ML-KEM-512 ML-KEM-768 ML-KEM-1024
`KeyGenerator` | AES ARCFOUR Blowfish ChaCha20 DES DESede HmacMD5 HmacSHA1 HmacSHA224 HmacSHA256 HmacSHA384 HmacSHA512 HmacSHA512/224 HmacSHA512/256 HmacSHA3-224 HmacSHA3-256 HmacSHA3-384 HmacSHA3-512 RC2
`KeyPairGenerator` | DiffieHellman ML-KEM Foot 11 ML-KEM-512 ML-KEM-768 ML-KEM-1024
`KeyStore` | JCEKS
`Mac` | HmacMD5 HmacSHA1 HmacSHA224 HmacSHA256 HmacSHA384 HmacSHA512 HmacSHA512/224 HmacSHA512/256 HmacSHA3-224 HmacSHA3-256 HmacSHA3-384 HmacSHA3-512 HmacPBESHA1 HmacPBESHA224 HmacPBESHA256 HmacPBESHA384 HmacPBESHA512 HmacPBESHA512/224 HmacPBESHA512/256 PBEWithHmacSHA1 PBEWithHmacSHA224 PBEWithHmacSHA256 PBEWithHmacSHA384 PBEWithHmacSHA512 PBEWithHmacSHA512/224 PBEWithHmacSHA512/256
`SecretKeyFactory` | DES DESede PBEWithMD5AndDES PBEWithMD5AndTripleDES PBEWithSHA1AndDESede PBEWithSHA1AndRC2_40 PBEWithSHA1AndRC2_128 PBEWithSHA1AndRC4_40 PBEWithSHA1AndRC4_128 PBEWithHmacSHA1AndAES_128 PBEWithHmacSHA224AndAES_128 PBEWithHmacSHA256AndAES_128 PBEWithHmacSHA384AndAES_128 PBEWithHmacSHA512AndAES_128 PBEWithHmacSHA512/224AndAES_128 PBEWithHmacSHA512/256AndAES_128 PBEWithHmacSHA1AndAES_256 PBEWithHmacSHA224AndAES_256 PBEWithHmacSHA256AndAES_256 PBEWithHmacSHA384AndAES_256 PBEWithHmacSHA512/224AndAES_256 PBEWithHmacSHA512/256AndAES_256 PBEWithHmacSHA512AndAES_256 PBKDF2WithHmacSHA1 PBKDF2WithHmacSHA224 PBKDF2WithHmacSHA256 PBKDF2WithHmacSHA384 PBKDF2WithHmacSHA512 PBKDF2WithHmacSHA512/224 PBKDF2WithHmacSHA512/256

Nota de Rodapé 10 O algoritmo DHKEM aceita chaves EC nas curvas secp256r1, secp384r1 e secp521r1 e chaves XDH nas curvas Curve25519 e Curve448.

Nota de Rodapé 11 O algoritmo ML-KEM KeyPairGenerator pode ser inicializado com parâmetros ML-KEM-512, ML-KEM-768 ou ML-KEM-1024. Se você inicializar o algoritmo ML-KEM KeyPairGenerator sem nenhum parâmetro, por padrão ele usará parâmetros ML-KEM-768. Consulte [Nomes de ParameterSpec](<#/>) em [Nomes de Algoritmos Padrão de Segurança Java](<#/>)

A tabela a seguir lista as transformações de cifra disponíveis no provedor SunJCE.

Tabela 4-16 As Transformações de Cifra do Provedor SunJCE

Nomes de Algoritmos | Modos | Preenchimentos
---|---|---
AES | ECB, CBC, PCBC, CFBFoot 12, CFB8..CFB128, OFBFoot 12, OFB8..OFB128 | NoPadding, PKCS5Padding, ISO10126PaddingFoot 13
AES | CTR, CTS, GCM | NoPadding
AES_128, AES_192, AES_256 | ECB, CBC, OFB, CFB, GCM | NoPadding
AESWrap | ECB | NoPadding
AESWrap_128 | ECB | NoPadding
AESWrap_192 | ECB | NoPadding
AESWrap_256 | ECB | NoPadding
ARCFOUR | ECB | NoPadding
Blowfish, DES, DESede, RC2 | ECB, CBC, PCBC, CTR, CTS, CFBFoot 12, CFB8..CFB64, OFBFoot 12, OFB8..OFB64 | NoPadding, PKCS5Padding, ISO10126Padding
ChaCha20 | None | NoPadding
ChaCha20-Poly1305 | None | NoPadding
DESedeWrap | CBC | NoPadding
PBEWithHmacSHA1AndAES_128, PBEWithHmacSHA224AndAES_128, PBEWithHmacSHA256AndAES_128, PBEWithHmacSHA384AndAES_128, PBEWithHmacSHA512AndAES_128, PBEWithHmacSHA512/224AndAES_128, PBEWithHmacSHA512/256AndAES_128, PBEWithHmacSHA1AndAES_256, PBEWithHmacSHA224AndAES_256, PBEWithHmacSHA256AndAES_256, PBEWithHmacSHA384AndAES_256, PBEWithHmacSHA512/224AndAES_256, PBEWithHmacSHA512/256AndAES_256, PBEWithHmacSHA512AndAES_256, PBEWithMD5AndDES, PBEWithMD5AndTripleDESFoot 14, PBEWithSHA1AndDESede, PBEWithSHA1AndRC2_40, PBEWithSHA1AndRC2_128, PBEWithSHA1AndRC4_40, PBEWithSHA1AndRC4_128 | CBC | PKCS5Padding
RSA | ECB | NoPadding, PKCS1Padding, OAEPPadding, OAEPWithMD5AndMGF1Padding, OAEPWithSHA‑1AndMGF1Padding, OAEPWithSHA‑1AndMGF1Padding, OAEPWithSHA‑224AndMGF1Padding, OAEPWithSHA‑256AndMGF1Padding, OAEPWithSHA‑384AndMGF1Padding, OAEPWithSHA‑512AndMGF1Padding, OAEPWithSHA‑512/224AndMGF1Padding, OAEPWithSHA‑512/256AndMGF1Padding

Nota de Rodapé 12 CFB/OFB sem valor especificado assume o tamanho de bloco padrão do algoritmo. (ou seja, AES é 128; Blowfish, DES, DESede e RC2 são 64.)

Nota de Rodapé 13 Embora o padrão não especifique ou exija que os bytes de preenchimento sejam aleatórios, a implementação ISO10126Padding do Java SE preenche com bytes aleatórios (até o último byte, que fornece o comprimento do preenchimento, conforme especificado).

Nota de Rodapé 14 PBEWithMD5AndTripleDES é um algoritmo proprietário que não foi padronizado.

Restrições de Tamanho de Chave

O provedor SunJCE usa os seguintes tamanhos de chave padrão (em bits) e impõe as seguintes restrições:

KeyGenerator

Tabela 4-17 Restrições de Tamanho de Chave do Provedor SunJCE

Nome do Algoritmo | Tamanho de Chave Padrão | Restrições/Comentários
---|---|---
AES | 256 se permitido pela política criptográfica (consulte [Limites de Importação em Algoritmos Criptográficos](<#/doc/guides/security/oracle-providers>)), 128 caso contrário | O tamanho da chave deve ser igual a 128, 192 ou 256.
ARCFOUR (RC4) | 128 | O tamanho da chave deve variar entre 40 e 1024 (inclusive).
Blowfish | 128 | O tamanho da chave deve ser um múltiplo de 8, variando de 32 a 448 (inclusive).
ChaCha20 | 256 | O tamanho da chave deve ser igual a 256.
DES | 56 | O tamanho da chave deve ser igual a 56.
DESede (Triple DES) | 168 | O tamanho da chave deve ser igual a 112 ou 168. Um tamanho de chave de 112 gerará uma chave Triple DES com 2 chaves intermediárias, e um tamanho de chave de 168 gerará uma chave Triple DES com 3 chaves intermediárias. Devido ao problema "Meet-In-The-Middle", embora 112 ou 168 bits de material de chave sejam usados, o tamanho efetivo da chave é de 80 ou 112 bits, respectivamente.
HmacMD5 | 512 | Sem restrição de tamanho de chave.
HmacSHA1 | 512 | Sem restrição de tamanho de chave.
HmacSHA224 | 224 | Sem restrição de tamanho de chave.
HmacSHA256 | 256 | Sem restrição de tamanho de chave.
HmacSHA384 | 384 | Sem restrição de tamanho de chave.
HmacSHA512 | 512 | Sem restrição de tamanho de chave.
RC2 | 128 | O tamanho da chave deve variar entre 40 e 1024 (inclusive).

Nota:

Os vários algoritmos de Criptografia Baseada em Senha (PBE) usam diversos algoritmos para gerar dados de chave e, em última análise, dependem do algoritmo Cipher alvo. Por exemplo, PBEWithMD5AndDES sempre gerará chaves de 56 bits.

Tabela 4-18 KeyPairGenerator

Nome do Algoritmo | Tamanho de Chave Padrão | Restrições/Comentários
---|---|---
Diffie-Hellman (DH) | 3072 | O tamanho da chave deve ser um múltiplo de 64, variando de 512 a 1024, mais 1536, 2048, 3072, 4096, 6144, 8192.

Tabela 4-19 AlgorithmParameterGenerator

Nome do Algoritmo | Tamanho de Chave Padrão | Restrições/Comentários
---|---|---
Diffie-Hellman (DH) | 3072 | O tamanho da chave deve ser um múltiplo de 64, variando de 512 a 1024, mais 2048 e 3072.

### O Provedor SunJGSS

Algoritmos

Os seguintes algoritmos estão disponíveis no provedor SunJGSS:

Tabela 4-20 Nomes de Algoritmos do Provedor SunJGSS

OID | Nome
---|---
`1.2.840.113554.1.2.2` | Kerberos v5
`1.3.6.1.5.5.2` | SPNEGO

### O Provedor SunSASL

Algoritmos

Os seguintes algoritmos estão disponíveis no provedor `SunSASL`:

Tabela 4-21 Nomes de Algoritmos do Provedor SunSASL para Classes de Motor

Motor | Nomes de Algoritmos
---|---
`SaslClient` | CRAM-MD5 DIGEST-MD5 EXTERNAL NTLM PLAIN
`SaslServer` | CRAM-MD5 DIGEST-MD5 NTLM

### O Provedor XMLDSig

Algoritmos

Os seguintes algoritmos estão disponíveis no provedor `XMLDSig`:

Tabela 4-22 Nomes de Algoritmos do Provedor XMLDSig para Classes de Motor

Motor | Nomes de Algoritmos
---|---
`KeyInfoFactory` | DOM
`TransformService` |
  * http://www.w3.org/TR/2001/REC-xml-c14n-20010315
    * CanonicalizationMethod.INCLUSIVE
  * http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments
    * CanonicalizationMethod.INCLUSIVE_WITH_COMMENTS
  * http://www.w3.org/2001/10/xml-exc-c14n#
    * CanonicalizationMethod.EXCLUSIVE
  * http://www.w3.org/2001/10/xml-exc-c14n#WithComments
    * CanonicalizationMethod.EXCLUSIVE_WITH_COMMENTS
  * http://www.w3.org/2000/09/xmldsig#base64
    * Transform.BASE64
  * http://www.w3.org/2000/09/xmldsig#enveloped-signature
    * Transform.ENVELOPED
  * http://www.w3.org/TR/1999/REC-xpath-19991116
    * Transform.XPATH
  * http://www.w3.org/2002/06/xmldsig-filter2
    * `Transform.XPATH2`
  * http://www.w3.org/TR/1999/REC-xslt-19991116
    * `Transform.XSLT`

`XMLSignatureFactory` | DOM

### O Provedor SunPCSC

O provedor SunPCSC permite que aplicativos usem a [API Java Smart Card I/O](<https://docs.oracle.com/en/java/javase/25/docs/api/java.smartcardio/javax/smartcardio/package-summary.html>) para interagir com a pilha de Smart Card PC/SC do sistema operacional subjacente. Consulte a documentação do seu sistema operacional para obter detalhes.

No Linux, o SunPCSC acessa a pilha PC/SC através da biblioteca `libpcsclite.so`. Ele procura por esta biblioteca nos diretórios `/usr/$LIBISA` e `/usr/local/$LIBISA`, onde `$LIBISA` é expandido para `lib64` em Linux de 64 bits. A propriedade de sistema `sun.security.smartcardio.library` também pode ser definida para o nome de arquivo completo de uma implementação alternativa de `libpcsclite.so`. No Windows, o SunPCSC sempre chama `winscard.dll` e nenhuma configuração em nível de Java é necessária ou possível.

Se o PC/SC estiver disponível na plataforma host, a implementação SunPCSC pode ser obtida via `TerminalFactory.getDefault()` e `TerminalFactory.getInstance("PC/SC")`. Se o PC/SC não estiver disponível ou não estiver configurado corretamente, uma chamada `getInstance()` falhará com uma `NoSuchAlgorithmException` e `getDefault()` retornará uma implementação embutida do JDK que não suporta nenhum terminal.

Algoritmos

Os seguintes algoritmos estão disponíveis no provedor `SunPCSC`:

Tabela 4-23 Nomes de Algoritmos do Provedor SunPCSC para Classes de Motor

Motor | Nomes de Algoritmos
---|---
`TerminalFactory` | PC/SC

### O Provedor SunMSCAPI

O provedor `SunMSCAPI` permite que aplicativos usem as APIs JCA/JCE padrão para acessar as bibliotecas criptográficas nativas, armazenamentos de certificados e contêineres de chaves no Windows. O provedor `SunMSCAPI` em si não contém funcionalidade criptográfica; ele é simplesmente um conduto entre o ambiente Java e os serviços criptográficos nativos no Windows.

Algoritmos

Os seguintes algoritmos estão disponíveis no provedor `SunMSCAPI`:

Tabela 4-24 Nomes de Algoritmos do SunMSCAPI para Classes de Motor

Motor | Nomes de Algoritmos
---|---
`Cipher` | RSA RSA/ECB/PKCS1Padding only
`KeyPairGenerator` | RSA
`KeyStore` | Windows-MY-CURRENTUSER (também conhecido como Windows-MY): O tipo de keystore que identifica o keystore nativo Microsoft Windows MY. Ele contém os certificados pessoais do usuário e as chaves privadas associadas que são acessíveis apenas à conta de usuário atual. Windows-ROOT-CURRENTUSER (também conhecido como Windows-ROOT): O tipo de keystore que identifica o keystore nativo Microsoft Windows ROOT. Ele contém os certificados de autoridades de certificação raiz e outros certificados confiáveis autoassinados que são acessíveis apenas à conta de usuário atual. Windows-MY-LOCALMACHINE: O tipo de keystore que identifica o keystore nativo Microsoft Windows MY. Ele contém certificados e chaves privadas associadas que são acessíveis a todas as contas no sistema. Windows-ROOT-LOCALMACHINE: O tipo de keystore que identifica o keystore nativo Microsoft Windows ROOT. Ele contém os certificados de autoridades de certificação raiz e outros certificados confiáveis autoassinados que são acessíveis a todas as contas no sistema.
`SecureRandom` | Windows-PRNG : O nome do algoritmo nativo de geração de números pseudoaleatórios (PRNG).
`Signature` | MD5withRSA MD2withRSA NONEwithRSA SHA1withRSA SHA256withRSA SHA384withRSA SHA512withRSA RSASSA-PSS SHA1withECDSA SHA224withECDSA SHA256withECDSA SHA384withECDSA SHA512withECDSA

Restrições de Tamanho de Chave

O provedor SunMSCAPI usa os seguintes tamanhos de chave padrão (em bits) e impõe as seguintes restrições:

KeyGenerator

Tabela 4-25 Restrições de Tamanho de Chave do Provedor SunMSCAPI

Nome do Alg. | Tamanho de Chave Padrão | Restrições/Comentários
---|---|---
RSA | 2048 | O tamanho da chave varia de 512 bits a 16.384 bits (dependendo do provedor de serviço criptográfico subjacente do Microsoft Windows).

### O Provedor SunEC

O provedor `SunEC` implementa Criptografia de Curva Elíptica (ECC). Comparado a criptossistemas tradicionais como RSA, o ECC oferece segurança equivalente com tamanhos de chave menores, o que resulta em computações mais rápidas, menor consumo de energia e economia de memória e largura de banda. Os aplicativos podem usar as APIs JCA/JCE padrão para acessar a funcionalidade ECC sem a dependência de bibliotecas ECC externas (através de `SunPKCS11`).

Algoritmos

Os seguintes algoritmos estão disponíveis no provedor `SunEC`:

Tabela 4-26 Nomes do Provedor SunEC para Classes de Motor

Motor | Nome(s) do Algoritmo
---|---
`AlgorithmParameters` | EC
`KeyAgreement` | ECDH X25519 X448 XDH
`KeyFactory` | EC Ed25519 Ed448 EdDSA X25519 X448 XDH
`KeyPairGenerator` | EC Ed25519 Ed448 EdDSAFoot 15 X25519 X448 XDH Foot 16
`Signature` | Ed25519 Ed448 EdDSA NONEwithECDSA SHA1withECDSA SHA224withECDSA SHA256withECDSA SHA384withECDSA SHA512withECDSA NONEwithECDSAinP1363Format SHA1withECDSAinP1363Format SHA224withECDSAinP1363Format SHA256withECDSAinP1363Format SHA384withECDSAinP1363Format SHA512withECDSAinP1363Format SHA3-224withECDSA SHA3-256withECDSA SHA3-384withECDSA SHA3-512withECDSA SHA3-224withECDSAinP1363Format SHA3-256withECDSAinP1363Format SHA3-384withECDSAinP1363Format SHA3-512withECDSAinP1363Format

Nota de Rodapé 15 O algoritmo EdDSA KeyPairGenerator pode ser inicializado com parâmetros Ed25519 ou Ed448. Se você inicializar o algoritmo EdDSA KeyPairGenerator sem nenhum parâmetro, por padrão ele usará parâmetros Ed25519. Todas as variantes EdDSA — pura, pré-hash e contexto — são suportadas. Consulte [Nomes de ParameterSpec](<#/>) em [Nomes de Algoritmos Padrão de Segurança Java](<#/>).

Nota de Rodapé 16 O algoritmo XDH KeyPairGenerator pode ser inicializado com parâmetros X25519 ou X448. Se você inicializar o algoritmo XDH KeyPairGenerator sem nenhum parâmetro, por padrão ele usará parâmetros X25519. Consulte [Nomes de ParameterSpec](<#/>) em [Nomes de Algoritmos Padrão de Segurança Java](<#/>).

Restrições de Tamanho de Chave

O provedor SunEC usa os seguintes tamanhos de chave padrão (em bits) e impõe as seguintes restrições:

Tabela 4-27 Restrições de Tamanho de Chave do Provedor SunEC

Nome do Algoritmo KeyPairGenerator | Tamanho de Chave Padrão | Restrições/Comentários
---|---|---
EC | 384 | O tamanho da chave deve ser 256, 384 ou 521
Ed25519 | 255 | O tamanho da chave deve ser 255
Ed448 | 448 | O tamanho da chave deve ser 448
EdDSA | 255 | O tamanho da chave deve ser 255 ou 448
X25519 | 255 | O tamanho da chave deve ser 255
X448 | 448 | O tamanho da chave deve ser 448
XDH | 255 | O tamanho da chave deve ser 255 ou 448

Nomes de Curvas Elípticas Suportadas

O provedor `SunEC` inclui implementações de várias curvas elípticas para uso com os algoritmos EC, Elliptic-Curve Diffie-Hellman (ECDH) e Elliptic Curve Digital Signature Algorithm (ECDSA). Algumas dessas curvas foram implementadas usando fórmulas e técnicas modernas que são valiosas para prevenir ataques de canal lateral. As outras são curvas legadas que podem ser mais vulneráveis a ataques e não devem ser usadas. As tabelas a seguir listam as curvas que se enquadram em cada uma dessas categorias.

Nas tabelas a seguir, a primeira coluna, Nome da Curva, lista o nome que o `SunEC` implementa. A segunda coluna, Identificador de Objeto, especifica o identificador de objeto do nome EC. A terceira coluna, Nomes/Aliases Adicionais, especifica quaisquer nomes ou aliases adicionais para essa curva. (Um valor de N/A significa que não há nomes adicionais.) Todas as strings que aparecem em uma linha se referem à mesma curva. Por exemplo, as strings `secp256r1`, `1.2.840.10045.3.1.7`, `NIST P-256` e `X9.62 prime256v1` se referem à mesma curva. Você pode usar os nomes das curvas para criar especificações de parâmetros para a geração de parâmetros EC com a classe [ECGenParameterSpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/ECGenParameterSpec.html>) ou a classe [NamedParameterSpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/NamedParameterSpec.html>).

Curvas Recomendadas

A tabela a seguir lista as curvas elípticas fornecidas pelo provedor `SunEC` e implementadas usando fórmulas e técnicas modernas.

Tabela 4-28 Curvas Recomendadas Fornecidas pelo Provedor SunEC

Nome da Curva | Identificador de Objeto | Nomes/Aliases Adicionais
---|---|---
Ed25519 | 1.3.101.112 | N/A
Ed448 | 1.3.101.113 | N/A
secp256r1 | 1.2.840.10045.3.1.7 | NIST P-256, X9.62 prime256v1
secp384r1 | 1.3.132.0.34 | NIST P-384
secp521r1 | 1.3.132.0.35 | NIST P-521
X25519 | 1.3.101.110 | N/A
X448 | 1.3.101.111 | N/A

Identificadores de Objeto Associados a Assinaturas ECDSA

A tabela a seguir lista os identificadores de objeto (OIDs) associados às Assinaturas ECDSA:

Tabela 4-29 OIDs associados a Assinaturas ECDSA

Assinatura ECDSA | OID
---|---
SHA1withECDSA | 1.2.840.10045.4.1
SHA224withECDSA | 1.2.840.10045.4.3.1
SHA256withECDSA | 1.2.840.10045.4.3.2
SHA384withECDSA | 1.2.840.10045.4.3.3
SHA512withECDSA | 1.2.840.10045.4.3.4
SHA3-224withECDSA | 2.16.840.1.101.3.4.3.9
SHA3-256withECDSA | 2.16.840.1.101.3.4.3.10
SHA3-384withECDSA | 2.16.840.1.101.3.4.3.11
SHA3-512withECDSA | 2.16.840.1.101.3.4.3.12

### O Provedor Apple

O provedor `Apple` implementa um `java.security.KeyStore` que fornece acesso ao Keychain do macOS.

Algoritmos

Os seguintes algoritmos estão disponíveis no provedor `Apple`:

Tabela 4-30 Nome do Algoritmo do Provedor Apple para Classes de Motor

Motor | Nome(s) do Algoritmo
---|---
`KeyStore` | KeychainStore: Contém chaves privadas e certificados para o keychain atual do usuário KeychainStore-ROOT: Contém certificados do keychain de certificados raiz do sistema

### O Provedor JdkLDAP

O provedor `JdkLDAP` substitui a implementação do LDAP CertStore no provedor `SUN`.

Algoritmos

Os seguintes algoritmos estão disponíveis no provedor `JdkLDAP`:

Tabela 4-31 Nomes de Algoritmos do Provedor JdkLDAP para Classes de Motor

Motor | Nomes de Algoritmos
---|---
`CertStore` | LDAP

### O Provedor JdkSASL

Algoritmos

Os seguintes algoritmos estão disponíveis no provedor `JdkSASL`:

Tabela 4-32 Nomes de Algoritmos do Provedor JdkSASL para Classes de Motor

Motor | Nomes de Algoritmos
---|---
`SaslClient` | GSSAPI
`SaslServer` | GSSAPI