# Visão Geral da Segurança Java

## Visão Geral da Segurança Java

A segurança Java inclui um grande conjunto de APIs, ferramentas e implementações de algoritmos, mecanismos e protocolos de segurança comumente usados. As APIs de segurança Java abrangem uma ampla gama de áreas, incluindo criptografia, infraestrutura de chave pública, comunicação segura, autenticação e controle de acesso. A tecnologia de segurança Java fornece ao desenvolvedor um framework de segurança abrangente para escrever aplicações, e também fornece ao usuário ou administrador um conjunto de ferramentas para gerenciar aplicações de forma segura.

### Introdução à Segurança Java

O JDK é projetado com forte ênfase em segurança. Em sua essência, a própria linguagem Java é type-safe e oferece garbage collection automático, aumentando a robustez do código da aplicação. Um mecanismo seguro de carregamento e verificação de classes garante que apenas código Java legítimo seja executado. A arquitetura de segurança Java inclui um grande conjunto de interfaces de programação de aplicações (APIs), ferramentas e implementações de algoritmos, mecanismos e protocolos de segurança comumente usados.

As APIs de segurança Java abrangem uma ampla gama de áreas. Interfaces de criptografia e infraestrutura de chave pública (PKI) fornecem a base subjacente para o desenvolvimento de aplicações seguras.

As APIs permitem múltiplas implementações interoperáveis de algoritmos e outros serviços de segurança. Os serviços são implementados em providers, que são conectados ao JDK através de uma interface padrão que facilita para as aplicações obterem serviços de segurança sem precisar saber nada sobre suas implementações. Isso permite que os desenvolvedores se concentrem em como integrar a segurança em suas aplicações, em vez de como realmente implementar mecanismos de segurança complexos.

O JDK inclui vários providers que implementam um conjunto central de serviços de segurança. Ele também permite que providers personalizados adicionais sejam instalados. Isso permite que os desenvolvedores estendam a plataforma com novos mecanismos de segurança.

O JDK é dividido em módulos. Módulos que contêm APIs de segurança incluem o seguinte:

Tabela 1-1 Módulos que Contêm APIs de Segurança

Módulo | Descrição
---|---
[java.base](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/module-summary.html>) | Define as APIs fundamentais do Java SE. Os pacotes contidos incluem [java.security](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/package-summary.html>), [javax.crypto](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/package-summary.html>), [javax.net.ssl](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/net/ssl/package-summary.html>) e [javax.security.auth](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/package-summary.html>).
[java.security.jgss](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.jgss/module-summary.html>) | Define a ligação Java da API de Serviços de Segurança Genéricos (GSS-API) da IETF. Este módulo também contém mecanismos GSS-API, incluindo Kerberos v5 e SPNEGO.
[java.security.sasl](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/module-summary.html>) | Define o suporte Java para a Camada de Autenticação e Segurança Simples (SASL) da IETF. Este módulo também contém mecanismos SASL, incluindo DIGEST-MD5, CRAM-MD5 e NTLM,
[java.smartcardio](<https://docs.oracle.com/en/java/javase/25/docs/api/java.smartcardio/module-summary.html>) | Define a API Java Smart Card I/O.
[java.xml.crypto](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/module-summary.html>) | Define a API para criptografia XML.
[jdk.jartool](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.jartool/jdk/security/jarsigner/package-summary.html>) | Define APIs para assinar arquivos JAR.
[jdk.security.auth](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.auth/module-summary.html>) | Fornece implementações das interfaces javax.security.auth.* e vários módulos de autenticação.
[jdk.security.jgss](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.jgss/module-summary.html>) | Define extensões Java para a GSS-API e uma implementação do mecanismo SASL GSS-API.

### Segurança da Linguagem Java e Verificação de Bytecode

A linguagem Java é projetada para ser type-safe e fácil de usar. Ela fornece gerenciamento automático de memória, garbage collection e verificação de limites em arrays. Isso reduz a carga geral de programação imposta aos desenvolvedores, levando a menos erros de programação sutis e a um código mais seguro e robusto.

Um compilador traduz programas Java para uma representação de bytecode independente de máquina. Um verificador de bytecode é invocado para garantir que apenas bytecodes legítimos sejam executados no runtime Java. Ele verifica se os bytecodes estão em conformidade com a Especificação da Linguagem Java e não violam as regras da linguagem Java ou restrições de namespace. O verificador também verifica violações de gerenciamento de memória, underflows ou overflows de pilha e typecasts de dados ilegais. Uma vez que os bytecodes tenham sido verificados, o runtime Java os prepara para execução.

Além disso, a linguagem Java define diferentes modificadores de acesso que podem ser atribuídos a classes, métodos e campos Java, permitindo que os desenvolvedores restrinjam o acesso às suas implementações de classe conforme apropriado. A linguagem define quatro níveis de acesso distintos:

*   `private`: O modificador mais restritivo; o acesso não é permitido fora da classe particular na qual o membro private (um método, por exemplo) é definido.

*   `protected`: Permite acesso a qualquer subclasse ou a outras classes dentro do mesmo pacote.

*   Package-private: Se não especificado, este é o nível de acesso padrão; permite acesso a classes dentro do mesmo pacote.

*   `public`: Não garante mais que o elemento seja acessível em todos os lugares; a acessibilidade depende se o pacote que contém esse elemento é exportado por seu módulo definidor e se esse módulo é legível pelo módulo que contém o código que está tentando acessá-lo.

### Arquitetura Básica de Segurança

O JDK define um conjunto de APIs que abrangem as principais áreas de segurança, incluindo criptografia, infraestrutura de chave pública, autenticação e comunicação segura. As APIs permitem que os desenvolvedores integrem facilmente a segurança em seu código de aplicação.

As APIs são projetadas em torno dos seguintes princípios:

Independência de implementação
    As aplicações não precisam implementar a segurança por si mesmas. Em vez disso, elas podem solicitar serviços de segurança do JDK. Os serviços de segurança são implementados em providers (consulte a seção [Security Providers](<#/doc/guides/security/java-security-overview1>)), que são conectados ao JDK por meio de uma interface padrão. Uma aplicação pode depender de múltiplos providers independentes para funcionalidade de segurança.
Interoperabilidade de implementação
    

Providers são interoperáveis entre aplicações. Especificamente, uma aplicação não está vinculada a um provider específico se não depender de valores padrão do provider.

Extensibilidade de algoritmo
    O JDK inclui vários providers embutidos que implementam um conjunto básico de serviços de segurança amplamente utilizados hoje. No entanto, algumas aplicações podem depender de padrões emergentes ainda não implementados, ou de serviços proprietários. O JDK suporta a instalação de providers personalizados que implementam tais serviços.

#### Providers de Segurança

A classe `java.security.Provider` encapsula a noção de um provider de segurança na plataforma Java. Ela especifica o nome do provider e lista os serviços de segurança que ele implementa. Múltiplos providers podem ser configurados ao mesmo tempo e são listados em ordem de preferência. Quando um serviço de segurança é solicitado, o provider de maior prioridade que implementa esse serviço é selecionado.

As aplicações dependem do método `getInstance` relevante para solicitar um serviço de segurança de um provider subjacente.

Por exemplo, a criação de message digest representa um tipo de serviço disponível em providers. Para solicitar uma implementação de um algoritmo de message digest específico, chame o método java.security.MessageDigest.getInstance. A seguinte instrução solicita uma implementação de message digest SHA-256 sem especificar um nome de provider:
```java
        MessageDigest md = MessageDigest.getInstance("SHA-256");
```

A figura a seguir ilustra como esta instrução obtém uma implementação de message digest SHA-256. Os providers são pesquisados em ordem de preferência, e a implementação do primeiro provider que fornece esse algoritmo específico, `ProviderB`, é retornada.

Figura 1-1 Solicitar Implementação de Message Digest SHA-256 Sem Especificar o Provider

[Descrição de "Figura 1-1 Solicitar Implementação de Message Digest SHA-256 Sem Especificar o Provider"](<#/>)

Você pode opcionalmente solicitar uma implementação de um provider específico, especificando o nome do provider. A seguinte instrução solicita uma implementação de message digest SHA-256 de um provider específico, `ProviderC`:
```java
        MessageDigest md = MessageDigest.getInstance("SHA-256", "ProviderC");
```

A figura a seguir ilustra como esta instrução solicita uma implementação de message digest SHA-256 de um provider específico, `ProviderC`. Neste caso, a implementação desse provider é retornada, mesmo que um provider com uma ordem de preferência maior, `ProviderB`, também forneça uma implementação SHA-256.

Figura 1-2 Solicitar Implementação de Message Digest SHA-256 de um Provider Específico

[Descrição de "Figura 1-2 Solicitar Implementação de Message Digest SHA-256 de um Provider Específico"](<#/>)

Para mais informações sobre serviços criptográficos, como algoritmos de message digest, consulte a seção [Java Cryptography](<#/doc/guides/security/java-security-overview1>).

A implementação da plataforma Java da Oracle inclui vários providers padrão embutidos que implementam um conjunto básico de serviços de segurança que podem ser usados por aplicações. Note que outras implementações de fornecedores da plataforma Java podem incluir diferentes conjuntos de providers que encapsulam conjuntos de serviços de segurança específicos do fornecedor. O termo built-in default providers refere-se aos providers disponíveis na implementação da Oracle.

### Criptografia Java

A arquitetura de criptografia Java é um framework para acessar e desenvolver funcionalidades criptográficas para a plataforma Java.

Ela inclui APIs para uma grande variedade de serviços criptográficos, incluindo o seguinte:

*   Algoritmos de message digest
*   Algoritmos de assinatura digital
*   Criptografia simétrica em massa e de stream
*   Criptografia assimétrica
*   Criptografia baseada em senha (PBE)
*   Criptografia de Curva Elíptica (ECC)
*   Algoritmos de acordo de chave
*   Funções de Derivação de Chave (KDFs)
*   Geradores de chave
*   Mecanismos de Encapsulamento de Chave (KEMs)
*   Códigos de Autenticação de Mensagem (MACs)
*   Geradores de Números Aleatórios Seguros

Por razões históricas (controle de exportação), as APIs de criptografia são organizadas em dois pacotes distintos:

*   Os pacotes `java.security` e `java.security.*` contêm classes que não estão sujeitas a controles de exportação (como `Signature` e `MessageDigest`)
*   O pacote `javax.crypto` contém classes que estão sujeitas a controles de exportação (como Cipher, KeyAgreement e `KEM`)

As interfaces criptográficas são baseadas em provider, permitindo múltiplas e interoperáveis implementações de criptografia. Alguns providers podem realizar operações criptográficas em software; outros podem realizar as operações em um token de hardware (por exemplo, em um dispositivo smart card ou em um acelerador criptográfico de hardware). Providers que implementam serviços controlados por exportação devem ser assinados digitalmente por um certificado emitido pela Autoridade Certificadora JCE da Oracle.

A plataforma Java inclui providers embutidos para muitos dos algoritmos criptográficos mais comumente usados, incluindo os algoritmos de assinatura RSA, DSA e ECDSA, o algoritmo de criptografia AES, os algoritmos de message digest SHA-2, e os algoritmos de acordo de chave Diffie-Hellman (DH) e Elliptic Curve Diffie-Hellman (ECDH). A maioria dos providers embutidos implementa algoritmos criptográficos em código Java.

A plataforma Java também inclui um provider embutido que atua como uma ponte para um token PKCS#11 (v2.x) nativo. Este provider, chamado `SunPKCS11`, permite que aplicações Java acessem serviços criptográficos localizados em tokens compatíveis com PKCS#11 de forma transparente.

No Windows, a plataforma Java inclui um provider embutido que atua como uma ponte para a CryptoAPI nativa da Microsoft. Este provider, chamado `SunMSCAPI`, permite que aplicações Java acessem serviços criptográficos no Windows de forma transparente através da CryptoAPI.

### Infraestrutura de Chave Pública

Infraestrutura de Chave Pública (PKI) é um termo usado para um framework que permite a troca segura de informações baseada em criptografia de chave pública. Ela permite que identidades (de pessoas, organizações, etc.) sejam vinculadas a certificados digitais e fornece um meio de verificar a autenticidade dos certificados. A PKI engloba chaves, certificados, criptografia de chave pública e Autoridades Certificadoras (CAs) confiáveis que geram e assinam digitalmente certificados.

A plataforma Java inclui APIs e suporte a provider para certificados digitais X.509 e Listas de Revogação de Certificados (CRLs), bem como construção e validação de caminho de certificação compatível com PKIX. As classes relacionadas à PKI estão localizadas nos pacotes `java.security` e `java.security.cert`.

#### Armazenamento de Chaves e Certificados

A plataforma Java oferece armazenamento persistente de longo prazo de chaves e certificados criptográficos por meio de key stores e certificate stores. Especificamente, a classe `java.security.KeyStore` representa um key store, um repositório seguro de chaves criptográficas e/ou certificados confiáveis (a serem usados, por exemplo, durante a validação do caminho de certificação), e a classe `java.security.cert.CertStore` representa um certificate store, um repositório público e potencialmente vasto de certificados não relacionados e tipicamente não confiáveis. Um `CertStore` também pode armazenar CRLs.

As implementações de `KeyStore` e `CertStore` são distinguidas por tipos. A plataforma Java inclui os tipos de key store padrão PKCS11 e PKCS12 (cujas implementações são compatíveis com as especificações PKCS correspondentes da Internet Engineering Task Force (IETF)). Ela também contém um tipo de key store proprietário baseado em arquivo chamado JKS (que significa Java Key Store), e um tipo chamado DKS (Domain Key Store) que é uma coleção de keystores apresentados como um único keystore lógico.

A plataforma Java inclui um key store embutido especial, `cacerts`, que contém vários certificados para CAs conhecidas e confiáveis. O utilitário keytool é capaz de listar os certificados incluídos em `cacerts`. Consulte [`keytool`](<#/>) nas Especificações de Ferramentas do Java Development Kit.

O provider SunPKCS11 mencionado na seção [Java Cryptography](<#/doc/guides/security/java-security-overview1>) inclui uma implementação de `KeyStore` PKCS11. Isso significa que chaves e certificados residentes em hardware seguro (como um smart card) podem ser acessados e usados por aplicações Java via API `KeyStore`. Note que as chaves de smart card podem não ter permissão para sair do dispositivo. Nesses casos, o objeto `java.security.Key` retornado pela API `KeyStore` pode ser simplesmente uma referência à chave (ou seja, não conteria o material da chave real). Tal objeto `Key` só pode ser usado para realizar operações criptográficas no dispositivo onde a chave real reside.

A plataforma Java também inclui um tipo de certificate store LDAP (para acessar certificados armazenados em um diretório LDAP), bem como um tipo de certificate store Collection em memória (para acessar certificados gerenciados em um objeto `java.util.Collection`).

A plataforma Java suporta tipos de keystore nativos do Microsoft Windows. Consulte os nomes dos algoritmos para a classe do motor KeyStore em [The SunMSCAPI Provider](<#/doc/guides/security/oracle-providers>). A plataforma Java também inclui uma implementação de KeyStore que fornece acesso ao Keychain do macOS. Consulte os nomes dos algoritmos para a classe do motor KeyStore em [The Apple Provider](<#/doc/guides/security/oracle-providers>)."

#### Ferramentas de Infraestrutura de Chave Pública

Existem duas ferramentas embutidas para trabalhar com chaves, certificados e key stores:

*   `keytool` cria e gerencia key stores. Use-o para realizar as seguintes tarefas:

    *   Criar pares de chaves públicas/privadas
    *   Exibir, importar e exportar certificados X.509 v1, v2 e v3 armazenados como arquivos
    *   Criar certificados X.509
    *   Emitir solicitações de certificado (PKCS#10) para serem enviadas a CAs
    *   Criar certificados com base em solicitações de certificado
    *   Importar respostas de certificado (obtidas das CAs para as quais foram enviadas solicitações de certificado)
    *   Designar certificados de chave pública como confiáveis
    *   Aceitar uma senha e armazená-la de forma segura como uma chave secreta
*   `jarsigner` assina arquivos JAR e verifica assinaturas em arquivos JAR assinados. O formato de arquivo Java ARchive (JAR) permite o empacotamento de múltiplos arquivos em um único arquivo. Tipicamente, um arquivo JAR contém os arquivos de classe e recursos auxiliares associados a applets e aplicações.

Para assinar digitalmente o código, execute o seguinte:

1.  Use `keytool` para gerar ou importar chaves e certificados apropriados para o seu key store (se ainda não estiverem lá).

2.  Use a ferramenta `jar` para empacotar o código em um arquivo JAR.

3.  Use a ferramenta `jarsigner` (ou a API [jdk.security.jarsigner](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.jartool/jdk/security/jarsigner/package-summary.html>)) para assinar o arquivo JAR. A ferramenta `jarsigner` acessa um key store para encontrar quaisquer chaves e certificados necessários para assinar um arquivo JAR ou para verificar a assinatura de um arquivo JAR assinado.

Nota:

`jarsigner` pode opcionalmente gerar assinaturas que incluem um timestamp. Sistemas que verificam assinaturas de arquivos JAR podem verificar o timestamp e aceitar um arquivo JAR que foi assinado enquanto o certificado de assinatura era válido, em vez de exigir que o certificado esteja atual. (Certificados tipicamente expiram anualmente, e não é razoável esperar que os criadores de arquivos JAR re-assinem arquivos JAR implantados anualmente.)

Consulte [`keytool`](<#/>) e [`jarsigner`](<#/>) nas Especificações de Ferramentas do Java Development Kit.

### Autenticação

Autenticação é o processo de determinar a identidade de um usuário. No contexto do ambiente de runtime Java, é o processo de identificar o usuário de um programa Java em execução. Em certos casos, este processo pode depender dos serviços descritos na seção [Java Cryptography](<#/doc/guides/security/java-security-overview1>).

A plataforma Java fornece APIs que permitem que uma aplicação realize a autenticação de usuário via módulos de login plugáveis. As aplicações chamam a classe `LoginContext` (no pacote `javax.security.auth.login`), que por sua vez referencia uma configuração. A configuração especifica qual módulo de login (uma implementação da interface `javax.security.auth.spi.LoginModule`) deve ser usado para realizar a autenticação real.

Como as aplicações se comunicam apenas com a API `LoginContext` padrão, elas podem permanecer independentes dos módulos plug-in subjacentes. Módulos novos ou atualizados podem ser conectados a uma aplicação sem a necessidade de modificar a própria aplicação. A figura a seguir ilustra a independência entre aplicações e módulos de login subjacentes:

Figura 1-3 Módulos de Login de Autenticação Conectando-se ao Framework de Autenticação

[Descrição de "Figura 1-3 Módulos de Login de Autenticação Conectando-se ao Framework de Autenticação"](<#/>)

É importante notar que, embora os módulos de login sejam componentes plugáveis que podem ser configurados na plataforma Java, eles não são conectados via providers de segurança. Portanto, eles não seguem o modelo de busca de provider conforme descrito na seção [Security Providers](<#/doc/guides/security/java-security-overview1>). Em vez disso, como mostrado na [Figura 1-3](<#/doc/guides/security/java-security-overview1>), os módulos de login são administrados por sua própria configuração única.

A plataforma Java fornece os seguintes módulos de login embutidos, todos no pacote `com.sun.security.auth.module`:

*   `JndiLoginModule` para autenticação de nome de usuário/senha usando bancos de dados LDAP ou NIS
*   `KeyStoreLoginModule` para login em qualquer tipo de key store, incluindo um key store de token PKCS#11
*   `Krb5LoginModule` para autenticação usando protocolos Kerberos
*   `LdapLoginModule` para autenticação baseada em LDAP
*   `NTLoginModule` para autenticação usando as informações de segurança do Windows NT de um usuário
*   UnixLoginModule para autenticação usando as informações de Principal UNIX de um usuário

A autenticação também pode ser alcançada durante o processo de estabelecimento de um canal de comunicação seguro entre dois pares. A plataforma Java fornece implementações de vários protocolos de comunicação padrão, que são discutidos na seção [Secure Communication](<#/doc/guides/security/java-security-overview1>).

### Comunicação Segura

Os dados que trafegam por uma rede podem ser acessados por alguém que não é o destinatário pretendido. Quando os dados incluem informações privadas, como senhas e números de cartão de crédito, medidas devem ser tomadas para tornar os dados ininteligíveis para partes não autorizadas. Também é importante garantir que você está enviando os dados para a parte apropriada e que os dados não foram modificados, intencionalmente ou não, durante o transporte.

A criptografia forma a base necessária para a comunicação segura; consulte a seção [Java Cryptography](<#/doc/guides/security/java-security-overview1>). A plataforma Java também fornece suporte a API e implementações de provider para vários protocolos de comunicação segura padrão.

#### Protocolos TLS e DTLS

Transport Layer Security (TLS) e seu predecessor, Secure Sockets Layer (SSL), são protocolos criptográficos que fornecem um canal seguro entre dois pares de comunicação. O TLS usa uma combinação de processos criptográficos, fornecendo propriedades de autenticação, confidencialidade e integridade para comunicação em uma rede não confiável ou potencialmente hostil. O TLS é executado sobre um canal de transporte confiável e orientado a stream, tipicamente o Transmission Control Protocol (TCP). O TLS é independente do protocolo de aplicação. Protocolos de nível superior, por exemplo, Hypertext Transfer Protocol (HTTP), podem se sobrepor ao TLS de forma transparente.

Os protocolos Datagram Transport Layer Security (DTLS) são baseados nos protocolos TLS orientados a stream e destinam-se a fornecer propriedades de segurança semelhantes para transporte de datagramas, como o User Datagram Protocol (UDP), que não oferece entrega confiável ou em ordem de dados.

O JDK fornece APIs e uma implementação dos protocolos SSL, TLS e DTLS que inclui funcionalidade para criptografia de dados, integridade de mensagens e autenticação de servidor e cliente. As aplicações podem usar (D)TLS para fornecer a passagem segura de dados entre dois pares sobre qualquer protocolo de aplicação, como HTTP sobre TCP/IP.

A classe `javax.net.ssl.SSLSocket` representa um socket de rede que encapsula o suporte TLS sobre um socket de stream normal (`java.net.Socket`). Algumas aplicações podem querer usar abstrações de transporte de dados alternativas (por exemplo, New-I/O); a classe `javax.net.ssl.SSLEngine` está disponível para produzir e consumir pacotes TLS/DTLS.

O JDK também inclui APIs que suportam a noção de key managers e trust managers plugáveis (baseados em provider). Um key manager é encapsulado pela classe `javax.net.ssl.KeyManager` e gerencia as chaves usadas para realizar a autenticação. Um trust manager é encapsulado pela classe `TrustManager` (no mesmo pacote) e toma decisões sobre em quem confiar com base nos certificados no key store que ele gerencia.

O JDK inclui um provider embutido que implementa os protocolos SSL/TLS/DTLS:

*   [SSL 3.0](<https://www.rfc-editor.org/rfc/rfc6101.txt>)
*   [TLS 1.0](<http://www.ietf.org/rfc/rfc2246.txt>)
*   [TLS 1.1](<https://www.ietf.org/rfc/rfc4346.txt>)
*   [TLS 1.2](<https://www.ietf.org/rfc/rfc5246.txt>)
*   [TLS 1.3](<https://tools.ietf.org/html/rfc8446>)
*   [DTLS 1.0](<https://tools.ietf.org/html/rfc4347.txt>)
*   [DTLS 1.2](<https://tools.ietf.org/html/rfc6347.txt>)

#### Camada de Autenticação e Segurança Simples (SASL)

Simple Authentication and Security Layer (SASL) é um padrão da Internet que especifica um protocolo para autenticação e estabelecimento opcional de uma camada de segurança entre aplicações cliente e servidor. O SASL define como os dados de autenticação devem ser trocados, mas não especifica o conteúdo desses dados. É um framework no qual mecanismos de autenticação específicos que especificam o conteúdo e a semântica dos dados de autenticação podem se encaixar. Existem vários mecanismos SASL padrão definidos pela comunidade da Internet para vários níveis de segurança e cenários de implantação.

A API Java SASL, que está no módulo [java.security.sasl](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/module-summary.html>), define classes e interfaces para aplicações que usam mecanismos SASL. Ela é definida para ser neutra em relação ao mecanismo; uma aplicação que usa a API não precisa ser codificada para usar um mecanismo SASL específico. As aplicações podem selecionar o mecanismo a ser usado com base nos recursos de segurança desejados. A API suporta tanto aplicações cliente quanto servidor. A classe `javax.security.sasl.Sasl` é usada para criar objetos `SaslClient` e `SaslServer`.

As implementações de mecanismo SASL são fornecidas em pacotes de provider. Cada provider pode suportar um ou mais mecanismos SASL e é registrado e invocado via arquitetura de provider padrão.

A plataforma Java inclui um provider embutido que implementa os seguintes mecanismos SASL:

*   Mecanismos cliente CRAM-MD5, DIGEST-MD5, EXTERNAL, GSSAPI, NTLM e PLAIN
*   Mecanismos servidor CRAM-MD5, DIGEST-MD5, GSSAPI e NTLM

#### API de Serviço de Segurança Genérico e Kerberos

A plataforma Java contém uma API com as ligações da linguagem Java para a Generic Security Service Application Programming Interface (GSS-API), que está no módulo `[java.security.jgss](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.jgss/module-summary.html>)`. A GSS-API oferece aos programadores de aplicações acesso uniforme a serviços de segurança sobre uma variedade de mecanismos de segurança subjacentes. A GSS-API Java atualmente requer o uso de um mecanismo Kerberos v5, e a plataforma Java inclui uma implementação embutida deste mecanismo. Atualmente, não é possível conectar mecanismos adicionais.

Nota:

O `Krb5LoginModule` mencionado na seção [Authentication](<#/doc/guides/security/java-security-overview1>) pode ser usado em conjunto com o mecanismo GSS Kerberos.

A plataforma Java também inclui uma implementação embutida do mecanismo GSS-API Simple and Protected GSS-API Negotiation Mechanism (SPNEGO).

Antes que duas aplicações possam usar a GSS-API para trocar mensagens de forma segura entre elas, elas devem estabelecer um contexto de segurança conjunto. O contexto encapsula informações de estado compartilhado que podem incluir, por exemplo, chaves criptográficas. Ambas as aplicações criam e usam um objeto `org.ietf.jgss.GSSContext` para estabelecer e manter as informações compartilhadas que compõem o contexto de segurança. Uma vez que um contexto de segurança tenha sido estabelecido, ele pode ser usado para preparar mensagens seguras para troca.

As APIs Java GSS estão no pacote `org.ietf.jgss`. A plataforma Java também define classes básicas do Kerberos, como `KerberosPrincipal`, `KerberosTicket`, `KerberosKey` e `KeyTab`, que estão localizadas no pacote `javax.security.auth.kerberos`.

### Assinatura XML

A API Java XML Digital Signature é uma API Java padrão para gerar e validar Assinaturas XML.

Assinaturas XML podem ser aplicadas a dados de qualquer tipo, XML ou binário (consulte [XML Signature Syntax and Processing](<http://www.w3.org/TR/xmldsig-core/>)). A assinatura resultante é representada em XML. Uma Assinatura XML pode ser usada para proteger seus dados e fornecer integridade de dados, autenticação de mensagem e autenticação do signatário.

A API é projetada para suportar todos os recursos exigidos ou recomendados da Recomendação W3C para XML-Signature Syntax and Processing. A API é extensível e plugável e é baseada na Arquitetura de Provider de Serviço de Criptografia Java.

A API Java XML Digital Signature, que está no módulo [java.xml.crypto](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/module-summary.html>), consiste em seis pacotes:

*   `javax.xml.crypto`
*   `javax.xml.crypto.dsig`
*   `javax.xml.crypto.dsig.keyinfo`
*   `javax.xml.crypto.dsig.spec`
*   `javax.xml.crypto.dom`
*   `javax.xml.crypto.dsig.dom`

### API Java para Processamento XML (JAXP)

A API Java para Processamento XML (JAXP) é para processar dados XML usando aplicações Java. Ela inclui suporte para parsers Simple API for XML (SAX), Document Object Models (DOM) e Streaming API for XML (StAX), Validação de Esquema XML e Transformações de Linguagem de Folha de Estilo Extensível (XSLT). Além disso, o JAXP fornece recursos de processamento seguro que podem ajudar a proteger suas aplicações e sistema contra ataques relacionados a XML. Consulte o [Guia de Segurança da API Java para Processamento XML (JAXP)](<#/doc/guides/security/java-api-xml-processing-jaxp-security-guide>).
Nota:

[Secure Coding Guidelines for Java SE](<http://www.oracle.com/technetwork/java/seccodeguide-139067.html>) contém recomendações adicionais que podem ajudar a defender contra ataques relacionados a XML.

### Resumo das Ferramentas de Segurança

As tabelas a seguir descrevem as ferramentas de segurança Java e relacionadas ao Kerberos.

Tabela 1-2 Ferramentas de Segurança Java

Tool | Uso
---|---
[`jar`](<#/>) | Cria arquivos Java Archive (JAR)
[`jarsigner`](<#/>) | Assina e verifica assinaturas em arquivos JAR
[`keytool`](<#/>) | Cria e gerencia keystores

Existem também três ferramentas relacionadas ao Kerberos que são fornecidas com o JDK para Windows. Funcionalidade equivalente é fornecida em ferramentas de mesmo nome que fazem parte automaticamente do Linux e macOS.

Tabela 1-3 Ferramentas relacionadas ao Kerberos

Tool | Uso
---|---
[`kinit`](<#/>) | Obtém e armazena em cache tickets de concessão de tickets Kerberos
[`klist`](<#/>) | Lista entradas no cache de credenciais Kerberos local e na tabela de chaves
[`ktab`](<#/>) | Gerencia os nomes e chaves de serviço armazenados na tabela de chaves Kerberos local

#### A Ferramenta de Assinatura e Verificação de JAR

A ferramenta [`jarsigner`](<#/>) pode ser usada para assinar digitalmente arquivos Java Archive (JAR), e para verificar tais assinaturas. Esta ferramenta depende do keystore que é gerenciado por [`keytool`](<#/>).

Nota:

Você também pode usar a API [jdk.security.jarsigner](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.jartool/jdk/security/jarsigner/package-summary.html>) para assinar arquivos JAR.

#### A Ferramenta de Gerenciamento de Chaves e Certificados

[`keytool`](<#/>) é um utilitário de gerenciamento de chaves e certificados. Ele permite que os usuários administrem seus próprios pares de chaves públicas/privadas e certificados associados para uso em autoautenticação (onde o usuário se autentica para outros usuários/serviços) ou serviços de integridade e autenticação de dados, usando assinaturas digitais. As informações de autenticação incluem tanto uma sequência (cadeia) de certificados X.509, quanto uma chave privada associada, que pode ser referenciada por um chamado "alias". Esta ferramenta também gerencia certificados (que são "confiáveis" pelo usuário), que são armazenados no mesmo banco de dados que as informações de autenticação, e podem ser referenciados por um "alias".

`keytool` armazena as chaves e certificados em um chamado keystore. A implementação padrão do keystore implementa o keystore como um arquivo. Ele protege chaves privadas com uma senha.

As cadeias de certificados X.509 são fornecidas por organizações chamadas Certification Authorities, ou CAs. Identidades (incluindo CAs) usam suas chaves privadas para autenticar sua associação com objetos (como com canais que são protegidos usando SSL), com arquivos de código que assinaram, ou (para CAs) com certificados X.509 que emitiram. Como uma ferramenta de bootstrapping, certificados gerados usando a opção `-gencert` podem ser usados até que uma Certification Authority retorne uma cadeia de certificados.

As chaves privadas neste banco de dados são sempre armazenadas de forma criptografada, para dificultar a divulgação inadequada dessas chaves privadas. Uma senha é necessária para acessar ou modificar o banco de dados. Essas chaves privadas são criptografadas usando a "senha", que deve ter várias palavras de comprimento. Se a senha for perdida, essas chaves de autenticação não poderão ser recuperadas.

Na verdade, cada chave privada no keystore pode ser protegida usando sua própria senha individual, que pode ou não ser a mesma senha que protege a integridade geral do keystore.

Esta ferramenta é (atualmente) destinada a ser usada a partir da linha de comando, onde se digita simplesmente `keytool` como um prompt de shell. `keytool` é um script que executa as classes Java apropriadas e é construído juntamente com o SDK.

As opções de linha de comando para cada comando podem ser fornecidas em qualquer ordem. Digitar uma opção incorreta ou digitar `keytool -help` fará com que o uso da ferramenta seja resumido no dispositivo de saída (como uma janela de shell).

### Provedores Integrados

A implementação Java SE da Oracle inclui vários pacotes de provedores integrados. Consulte [Documentação dos Provedores do JDK](<#/doc/guides/security/oracle-providers>).