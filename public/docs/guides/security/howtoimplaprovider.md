# Como Implementar um Provedor na Arquitetura de Criptografia Java

## 3 Como Implementar um Provedor na Arquitetura de Criptografia Java

Este documento descreve o que você precisa fazer para integrar seu provedor ao Java SE, de modo que algoritmos e outros serviços possam ser encontrados quando clientes da Java Security API os solicitarem.

### Quem Deve Ler Este Documento

Programadores que precisam apenas usar as Java Security APIs (veja [Classes e Interfaces Principais](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) no [Guia de Referência da Arquitetura de Criptografia Java (JCA)](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide> "A Arquitetura de Criptografia Java (JCA) é uma parte importante da plataforma e contém uma arquitetura de "provedor" e um conjunto de APIs para assinaturas digitais, resumos de mensagens (hashes), certificados e validação de certificados, criptografia (cifras de bloco/fluxo simétricas/assimétricas), geração e gerenciamento de chaves, e geração segura de números aleatórios, para citar alguns.")) para acessar algoritmos de criptografia existentes e outros serviços não precisam ler este documento.

Este documento é destinado a programadores experientes que desejam criar seus próprios pacotes de provedores fornecendo implementações de serviços criptográficos. Ele documenta o que você precisa fazer para integrar seu provedor ao Java, de modo que seus algoritmos e outros serviços possam ser encontrados quando clientes da Java Security API os solicitarem.

### Notas sobre Terminologia

Ao longo deste documento, o termo JCA por si só se refere à estrutura JCA. Sempre que este documento mencionar um provedor JCA específico, ele será referido explicitamente pelo nome do provedor.

  * Antes do JDK 1.4, o JCE era um produto não empacotado e, como tal, o JCA e o JCE eram regularmente referidos como componentes separados e distintos. Como o JCE agora está empacotado no JDK, a distinção está se tornando menos aparente. Uma vez que o JCE usa a mesma arquitetura que o JCA, o JCE deve ser mais propriamente considerado como um subconjunto do JCA.
  * O JCA dentro do JDK inclui dois componentes de software:
    * a estrutura que define e suporta serviços criptográficos para os quais os provedores fornecem implementações. Esta estrutura inclui pacotes como `java.security`, `javax.crypto`, `javax.crypto.spec` e `javax.crypto.interfaces`.
    * os provedores reais, como Sun, SunRsaSign, SunJCE, que contêm as implementações criptográficas reais.
  * O JCE consiste nos pacotes `javax.crypto.*` e no provedor SunJCE.

### Introdução à Implementação de Provedores

A plataforma Java define um conjunto de APIs que abrangem as principais áreas de segurança, incluindo criptografia, infraestrutura de chave pública, autenticação, comunicação segura e controle de acesso. Essas APIs permitem que os desenvolvedores integrem facilmente a segurança em seu código de aplicação. Elas foram projetadas com base nos seguintes princípios:

  * Independência de implementação: As aplicações não precisam implementar a segurança por si mesmas. Em vez disso, elas podem solicitar serviços de segurança da plataforma Java. Os serviços de segurança são implementados em provedores, que são conectados à plataforma Java por meio de uma interface padrão. Uma aplicação pode depender de múltiplos provedores independentes para funcionalidades de segurança.

  * Interoperabilidade de implementação: Os provedores são interoperáveis entre aplicações. Especificamente, uma aplicação não está vinculada a um provedor específico, e um provedor não está vinculado a uma aplicação específica.

  * Extensibilidade de algoritmo: A plataforma Java inclui vários provedores integrados que implementam um conjunto básico de serviços de segurança amplamente utilizados hoje. No entanto, algumas aplicações podem depender de padrões emergentes ainda não implementados, ou de serviços proprietários. A plataforma Java suporta a instalação de provedores personalizados que implementam tais serviços.

Um Provedor de Serviço Criptográfico (provedor) refere-se a um pacote (ou um conjunto de pacotes) que fornece uma implementação concreta de um subconjunto dos aspectos de criptografia da JDK Security API.

A classe java.security.Provider encapsula a noção de um provedor de segurança na plataforma Java. Ela especifica o nome do provedor e lista os serviços de segurança que ele implementa. Múltiplos provedores podem ser configurados ao mesmo tempo e são listados em ordem de preferência. Quando um serviço de segurança é solicitado, o provedor de maior prioridade que implementa esse serviço é selecionado. Veja [Provedores de Segurança](<#/doc/guides/security/java-security-overview1>), que ilustra como um provedor seleciona um serviço de segurança solicitado.

### Classes de Motor e Classes de Interface de Provedor de Serviço Correspondentes

Uma classe de motor define um serviço criptográfico de forma abstrata (sem uma implementação concreta). Um serviço criptográfico está sempre associado a um algoritmo ou tipo específico.

Um serviço criptográfico ou fornece operações criptográficas (como as para assinaturas digitais ou resumos de mensagens, cifras ou protocolos de acordo de chave); gera ou fornece o material criptográfico (chaves ou parâmetros) necessário para operações criptográficas; ou gera objetos de dados (keystores ou certificados) que encapsulam chaves criptográficas (que podem ser usadas em uma operação criptográfica) de forma segura.

A Arquitetura de Criptografia Java abrange as classes que compõem o pacote Security que se relacionam à criptografia, incluindo as classes de motor. Usuários da API solicitam e utilizam instâncias das classes de motor para realizar as operações correspondentes. O JDK define as seguintes classes de motor:

  * `AlgorithmParameterGenerator` - usado para gerar um conjunto de parâmetros adequados para um algoritmo especificado.
  * `AlgorithmParameters` - usado para gerenciar os parâmetros para um algoritmo particular, incluindo codificação e decodificação de parâmetros.
  * `CertificateFactory` - usado para criar certificados de chave pública e Listas de Revogação de Certificados (CRLs).
  * `CertPathBuilder` - usado para criar certificados de chave pública e Listas de Revogação de Certificados (CRLs).
  * `CertPathValidator` - usado para validar cadeias de certificados.
  * `CertStore` - usado para recuperar Certificados e CRLs de um repositório.
  * `Cipher` - usado para criptografar ou descriptografar dados especificados. Ele fornece acesso à funcionalidade de um algoritmo de criptografia (como AES).
  * `ExemptionMechanism` - usado para fornecer a funcionalidade de um mecanismo de isenção, como recuperação de chave, custódia de chave, enfraquecimento de chave, ou qualquer outro mecanismo de isenção (personalizado). Aplicações que usam um mecanismo de isenção podem receber capacidades de criptografia mais fortes do que aquelas que não o fazem. No entanto, observe que as restrições criptográficas não são mais exigidas para a maioria dos países, e, portanto, os mecanismos de isenção podem ser úteis apenas nos poucos países cujos governos impõem restrições.
  * KDF - usado para fornecer a funcionalidade de uma Função de Derivação de Chave (KDF), que usa entradas criptográficas para criar novo material de chave criptograficamente forte.
  * KEM - usado para fornecer a funcionalidade de um Mecanismo de Encapsulamento de Chave (KEM). Um KEM pode ser usado para proteger chaves simétricas usando criptografia assimétrica ou de chave pública entre duas partes. O remetente chama o método encapsulate para gerar uma chave secreta e uma mensagem de encapsulamento de chave, e o receptor chama o método decapsulate para recuperar a mesma chave secreta da mensagem de encapsulamento de chave.
  * `KeyAgreement` - usado para executar um protocolo de acordo de chave (troca de chave) entre duas ou mais partes. Ele fornece acesso à funcionalidade de um protocolo de acordo de chave (como Diffie-Hellman)
  * `KeyFactory` - usado para converter chaves criptográficas opacas do tipo `Key` em especificações de chave (representações transparentes do material de chave subjacente), e vice-versa. Uma classe `KeyFactory` DSA fornece uma chave privada ou pública DSA (a partir de sua codificação ou especificação transparente) em um formato utilizável pelos métodos initSign ou initVerify, respectivamente, de um objeto DSA Signature.
  * `KeyGenerator` - usado para gerar uma chave secreta (simétrica) adequada para um algoritmo especificado.
  * `KeyPairGenerator` - usado para gerar um par de chaves públicas e privadas adequado para um algoritmo especificado.
  * `KeyStore` - usado para criar e gerenciar um keystore. Um keystore é um banco de dados de chaves. Chaves privadas em um keystore têm uma cadeia de certificados associada a elas, que autentica a chave pública correspondente. Um keystore também contém certificados de entidades confiáveis.
  * `Mac`: usado para calcular o código de autenticação de mensagem de alguns dados especificados.
  * `MessageDigest` - usado para calcular o resumo da mensagem (hash) de dados especificados.
  * `SecretKeyFactory` - usado para converter chaves criptográficas opacas do tipo `SecretKey` em especificações de chave (representações transparentes do material de chave subjacente), e vice-versa.
  * `SecureRandom` - usado para gerar números aleatórios ou pseudoaleatórios.
  * `Signature` - usado para assinar dados e verificar assinaturas digitais. Ele fornece acesso à funcionalidade de um algoritmo de assinatura digital.

Nota:

Um gerador cria objetos com conteúdo totalmente novo, enquanto uma fábrica cria objetos a partir de material existente (por exemplo, uma codificação).

Uma classe de motor fornece a interface para a funcionalidade de um tipo específico de serviço criptográfico (independente de um algoritmo criptográfico particular). Ela define métodos de Interface de Programação de Aplicações (API) que permitem às aplicações acessar o tipo específico de serviço criptográfico que ela fornece. As implementações reais (de um ou mais provedores) são aquelas para algoritmos específicos. Por exemplo, a classe de motor Signature fornece acesso à funcionalidade de um algoritmo de assinatura digital. A implementação real fornecida em uma subclasse `SignatureSpi` (veja o próximo parágrafo) seria para um tipo específico de algoritmo de assinatura, como SHA256withDSA ou SHA512withRSA.

As interfaces de aplicação fornecidas por uma classe de motor são implementadas em termos de uma Interface de Provedor de Serviço (SPI). Ou seja, para cada classe de motor, existe uma classe SPI abstrata correspondente, que define os métodos da Interface de Provedor de Serviço que os provedores de serviço criptográfico devem implementar.

Figura 3-1 Classes de Motor

[Descrição de "Figura 3-1 Classes de Motor"](<#/>)

Uma instância de uma classe de motor, o "objeto API", encapsula (como um campo privado) uma instância da classe SPI correspondente, o "objeto SPI". Todos os métodos API de um objeto API são declarados "final", e suas implementações invocam os métodos SPI correspondentes do objeto SPI encapsulado. Uma instância de uma classe de motor (e de sua classe SPI correspondente) é criada por uma chamada ao método de fábrica getInstance da classe de motor.

O nome de cada classe SPI é o mesmo da classe de motor correspondente, seguido por "Spi". Por exemplo, a classe SPI correspondente à classe de motor Signature é a classe `SignatureSpi`.

Cada classe SPI é abstrata. Para fornecer a implementação de um tipo particular de serviço e para um algoritmo específico, um provedor deve criar uma subclasse da classe SPI correspondente e fornecer implementações para todos os métodos abstratos.

Outro exemplo de classe de motor é a classe `MessageDigest`, que fornece acesso a um algoritmo de resumo de mensagem. Suas implementações, em subclasses `MessageDigestSpi`, podem ser as de vários algoritmos de resumo de mensagem, como SHA-256 ou SHA-384.

Como exemplo final, a classe de motor `KeyFactory` suporta a conversão de chaves opacas para especificações de chave transparentes, e vice-versa. Veja [Interfaces e Classes de Especificação de Chave Exigidas por Fábricas de Chaves](<#/doc/guides/security/howtoimplaprovider>). A implementação real fornecida em uma subclasse `KeyFactorySpi` seria para um tipo específico de chaves, como chaves públicas e privadas DSA.

### Passos para Implementar e Integrar um Provedor

Siga estes passos para implementar um provedor e integrá-lo à estrutura JCA:

  * [Passo 1: Escreva seu Código de Implementação de Serviço](<#/doc/guides/security/howtoimplaprovider>)
  * [Passo 2: Dê um Nome ao seu Provedor](<#/doc/guides/security/howtoimplaprovider>)
  * [Passo 3: Escreva sua Classe Mestra, uma Subclasse de Provider](<#/doc/guides/security/howtoimplaprovider>)
  * [Passo 4: Crie uma Declaração de Módulo para seu Provedor](<#/doc/guides/security/howtoimplaprovider>)
  * [Passo 5: Compile seu Código](<#/doc/guides/security/howtoimplaprovider>)
  * [Passo 6: Coloque seu Provedor em um Arquivo JAR](<#/doc/guides/security/howtoimplaprovider>)
  * [Passo 7: Assine seu Arquivo JAR, se Necessário](<#/doc/guides/security/howtoimplaprovider>)
  * [Passo 8: Prepare-se para Testes](<#/doc/guides/security/howtoimplaprovider>)
  * [Passo 9: Escreva e Compile seus Programas de Teste](<#/doc/guides/security/howtoimplaprovider>)
  * [Passo 10: Execute seus Programas de Teste](<#/doc/guides/security/howtoimplaprovider>)
  * [Passo 11: Solicite Aprovação de Exportação do Governo dos EUA, se Necessário](<#/doc/guides/security/howtoimplaprovider>)
  * [Passo 12: Documente seu Provedor e seus Serviços Suportados](<#/doc/guides/security/howtoimplaprovider>)
  * [Passo 13: Disponibilize seus Arquivos de Classe e Documentação para Clientes](<#/doc/guides/security/howtoimplaprovider>)

#### Passo 1: Escreva seu Código de Implementação de Serviço

A primeira coisa que você precisa fazer é escrever o código que fornece implementações específicas de algoritmo dos serviços criptográficos que você deseja suportar. Seu provedor pode fornecer implementações de serviços criptográficos já disponíveis em um ou mais dos componentes de segurança do JDK.

Para serviços criptográficos não definidos na JCA (por exemplo, assinaturas e resumos de mensagens), veja [Classes de Motor e Algoritmos](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Para cada serviço criptográfico que você deseja implementar, crie uma subclasse da classe SPI apropriada. A JCA define as seguintes classes de motor:

  * `AlgorithmParameterGeneratorSpi`
  * `AlgorithmParametersSpi`
  * `CertificateFactorySpi`
  * `CipherSpi`
  * `ExemptionMechanismSpi`
  * KDFSpi
  * KEMSpi
  * `KeyAgreementSpi`
  * `KeyFactorySpi`
  * `KeyGeneratorSpi`
  * `KeyPairGeneratorSpi`
  * `KeyStoreSpi`
  * `MacSpi`
  * `MessageDigestSpi`
  * `SecretKeyFactorySpi`
  * `SecureRandomSpi`
  * `SignatureSpi`

Para saber mais sobre a JCA e outras classes criptográficas, veja [Classes de Motor e Classes de Interface de Provedor de Serviço Correspondentes](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Na subclasse, você precisa:

  1. Fornecer implementações para os métodos abstratos, cujos nomes geralmente começam com `engine`. Veja [Mais Detalhes e Requisitos de Implementação](<#/doc/guides/security/howtoimplaprovider>).
  2. Dependendo de como você escreve seu provedor e registra seus algoritmos (usando objetos String ou a classe Provider.Service), o provedor:
     * Garantir que haja um construtor público sem argumentos. Eis o porquê: Quando um de seus serviços é solicitado, o Java Security procura a subclasse que implementa esse serviço, conforme especificado por uma propriedade em sua "classe mestra" (veja [Passo 3: Escreva sua Classe Mestra, uma Subclasse de Provider](<#/doc/guides/security/howtoimplaprovider>)). O Java Security então cria o objeto `Class` associado à sua subclasse e cria uma instância de sua subclasse chamando o método `newInstance` nesse objeto `Class`. `newInstance` exige que sua subclasse tenha um construtor público sem parâmetros. (Um construtor padrão sem argumentos será gerado automaticamente se sua subclasse não tiver nenhum construtor. Mas se sua subclasse definir quaisquer construtores, você deve definir explicitamente um construtor público sem argumentos.)
     * Sobrescrever o método newInstance() no Provider.Service registrado. Este é o mecanismo preferido no JDK 9 e posterior.

##### Passo 1.1: Considere Requisitos e Recomendações Adicionais do Provedor JCA para Implementações de Criptografia

Ao instanciar a implementação (classe) de um provedor de um `Cipher`, KDF, KEM, `KeyAgreement`, `KeyGenerator`, `MAC` ou `SecretKeyFactory`, a estrutura determinará a base de código do provedor (arquivo JAR) e verificará sua assinatura. Dessa forma, o JCA autentica o provedor e garante que apenas provedores assinados por uma entidade confiável possam ser conectados ao JCA. Assim, um requisito para provedores de criptografia é que eles devem ser assinados, conforme descrito em passos posteriores.

Para que as classes do provedor se tornem inutilizáveis se instanciadas diretamente por uma aplicação, ignorando o JCA, os provedores devem implementar o seguinte:

  * Todas as classes de implementação SPI em um pacote de provedor devem ser declaradas `final` (para que não possam ser estendidas), e seus métodos de implementação (SPI) devem ser declarados `protected`.
  * Todas as classes auxiliares relacionadas à criptografia em um pacote de provedor devem ter escopo package-private, para que não possam ser acessadas de fora do pacote do provedor.

Para provedores que podem ser exportados para fora dos EUA, as implementações de `CipherSpi` devem incluir uma implementação do método `engineGetKeySize` que, dada uma `Key`, retorna o tamanho da chave. Se houver restrições na força criptográfica disponível especificadas nos arquivos de política de jurisdição, cada método de inicialização `Cipher` chama `engineGetKeySize` e então compara o resultado com o tamanho máximo de chave permitido para o local e as circunstâncias particulares da aplicação em execução. Se o tamanho da chave for muito grande, o método de inicialização lança uma exceção.

Recursos opcionais adicionais que os provedores podem implementar são:

  * **Opcional:** Os métodos `engineWrap` e `engineUnwrap` de `CipherSpi`. Envolver uma chave (wrapping) permite a transferência segura da chave de um lugar para outro. Veja o método [wrap](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/Cipher.html#wrap\(java.security.Key\)>) para mais informações sobre envolver e desenrolar chaves.
  * **Opcional:** Um ou mais mecanismos de isenção. Um mecanismo de isenção é algo como recuperação de chave, custódia de chave ou enfraquecimento de chave que, se implementado e aplicado, pode permitir restrições criptográficas reduzidas para uma aplicação que o utiliza. Para saber mais sobre os requisitos para aplicações que utilizam mecanismos de isenção, veja [Como Tornar Aplicações Isentas de Restrições Criptográficas](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

#### Passo 2: Dê um Nome ao seu Provedor

Decida um nome único para seu provedor. Este é o nome a ser usado pelas aplicações cliente para se referir ao seu provedor, e ele não deve entrar em conflito com nenhum outro nome de provedor.

#### Passo 3: Escreva sua Classe Mestra, uma Subclasse de Provider

Crie uma subclasse da classe `java.security.Provider`. Esta é essencialmente uma tabela de consulta que anuncia os algoritmos que seu provedor implementa.

Você pode usar os seguintes estilos de codificação para criar uma subclasse da classe Provider:

  * Crie um provedor que registra seus serviços com objetos String para armazenar nomes de algoritmos e seus nomes de classe de implementação associados. Estes são armazenados na superclasse Hashtable<Object,Object> de java.security.Provider.

  * Crie um provedor que usa a classe Provider.Service, que utiliza um método diferente para armazenar nomes de algoritmos e criar novos objetos. A classe Provider.Service permite personalizar como a estrutura JCA solicita serviços do seu provedor, como a forma como a estrutura cria novas instâncias dos serviços do seu provedor. Este estilo de codificação é recomendado, especialmente ao usar módulos.

Um provedor pode usar qualquer um dos estilos, ou até mesmo usar ambos os estilos ao mesmo tempo. Independentemente do estilo que você escolher, sua subclasse deve ser `final`.

##### Passo 3.1: Crie um Provedor que Usa Objetos String para Registrar seus Serviços

O seguinte é um exemplo de um provedor que usa objetos String para armazenar nomes de algoritmos implementados:
```java
    package p;
    public final class MyProvider extends Provider {
        public MyProvider() {
            super("MyProvider", "1.0",
                "Some info about my provider and which algorithms it supports");
            // com.my.crypto.provider.MyCipher extends CipherSPI
            put("Cipher.MyCipher", "com.my.crypto.provider.MyCipher");
        }
    }
```

Para criar um provedor com este estilo de codificação, faça o seguinte:

  * Chame `super`, especificando o nome do provedor (veja [Passo 2: Dê um Nome ao seu Provedor](<#/doc/guides/security/howtoimplaprovider>)), o número da versão e uma string de informações sobre o provedor e os algoritmos que ele suporta.
```java
super("MyProvider", "1.0",
              "Some info about my provider and which algorithms it supports");
```

  * Defina os valores de várias propriedades que são necessárias para a Java Security API procurar os serviços criptográficos implementados pelo provedor.

Para cada serviço implementado pelo provedor, deve haver uma propriedade cujo nome é o tipo de serviço seguido por um ponto e o nome do algoritmo ao qual o serviço se aplica. O valor da propriedade deve especificar o nome totalmente qualificado da classe que implementa o serviço.

Por exemplo, a seguinte instrução define uma propriedade chamada `Cipher.MyCypher` cujo valor é `com.my.crypto.provider.MyCipher`, uma classe que estende `CipherSPI`:
```java
put("Cipher.MyCipher", "com.my.crypto.provider.MyCipher");
```

A lista a seguir mostra os vários tipos de serviços JCA, onde o nome real do algoritmo é substituído por `algName`:

    * `AlgorithmParameterGenerator.algName`
    * `AlgorithmParameters.algName`
    * `CertificateFactory.algName`
    * `Cipher.algName`

Nota:

`algName` pode, na verdade, representar uma transformação e pode ser composto por um nome de algoritmo, um modo particular e um esquema de preenchimento (padding scheme). Veja [Nomes de Algoritmos Padrão de Segurança Java](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html>).

    * `ExemptionMechanism.algName`:

Nota:

`algName` refere-se ao nome do mecanismo de isenção, que pode ser um dos seguintes: `KeyRecovery`, `KeyEscrow` ou `KeyWeakening`. O uso de maiúsculas/minúsculas não importa.

    * `KDF.algName`
    * `KEM.algName`
    * `KeyAgreement.algName`
    * `KeyFactory.algName`
    * `KeyGenerator.algName`
    * `KeyPairGenerator.algName`
    * `KeyStore.algName`
    * `Mac.algName`
    * `MessageDigest.algName`
    * `SecretKeyFactory.algName`
    * `SecureRandom.algName`
    * `Signature.algName`

Em todos estes, exceto `ExemptionMechanism` e `Cipher`, `algName` é o nome "padrão" do algoritmo, tipo de certificado ou tipo de keystore. Veja [Nomes de Algoritmos Padrão de Segurança Java](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html>) para os nomes padrão que devem ser usados.

O valor de cada propriedade deve ser o nome totalmente qualificado da classe que implementa o algoritmo, tipo de certificado ou tipo de keystore especificado. Ou seja, deve ser o nome do pacote seguido pelo nome da classe, onde os dois são separados por um ponto.

Como exemplo, o provedor padrão chamado SUN implementa o Algoritmo de Assinatura Digital (cujo nome padrão é `SHA256withDSA`) em uma classe chamada `DSA` no pacote `sun.security.provider`. Sua subclasse de `Provider` (que é a classe Sun no pacote `sun.security.provider`) define a propriedade `Signature.SHA256withDSA` para ter o valor `sun.security.provider.DSA` através do seguinte:
```java
put("Signature.SHA256withDSA", "sun.security.provider.DSA");
```

A lista a seguir mostra mais propriedades que podem ser definidas para os vários tipos de serviços, onde o nome real do algoritmo é substituído por algName, o tipo de certificado por certType, o tipo de keystore por storeType e o nome do atributo por attrName:

    * `AlgorithmParameterGenerator.algName attrName`
    * `AlgorithmParameters.algName attrName`
    * `CertificateFactory.certType attrName`
    * `Cipher.algName attrName`
    * `ExemptionMechanism.algName attrName`
    * `KDF.algName attrName`
    * `KEM.algName attrName`
    * `KeyAgreement.algName attrName`
    * `KeyFactory.algName attrName`
    * `KeyGenerator.algName attrName`
    * `KeyPairGenerator.algName attrName`
    * `KeyStore.storeType attrName`
    * `Mac.algName attrName`
    * `MessageDigest.algName attrName`
    * `SecretKeyFactory.algName attrName`
    * `SecureRandom.algName attrName`
    * `Signature.algName attrName`

Em cada um destes, `attrName` é o nome "padrão" do algoritmo, tipo de certificado, tipo de keystore ou atributo. (Veja [Nomes de Algoritmos Padrão de Segurança Java](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html>) para os nomes padrão que devem ser usados.)

Para uma propriedade neste formato, o valor da propriedade deve ser o valor para o atributo correspondente. (Veja [Nomes de Algoritmos Padrão de Segurança Java](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html>) para a definição de cada atributo padrão.)

Para mais exemplos de configuração de propriedades de classe mestra, veja o código-fonte do JDK para as classes [sun.security.provider.Sun](<#/>) e [com.sun.crypto.provider.SunJCE](<#/>). Elas mostram como os provedores Sun e SunJCE definem propriedades.

Como exemplo, o provedor padrão chamado SUN implementa o Algoritmo de Assinatura Digital `SHA256withDSA` em software. A classe sun.security.provider.Sun chama o método SunEntries.putEntries, que define as propriedades para o provedor SUN, incluindo a definição da propriedade `Signature.SHA256withDSA ImplementedIn` para ter o valor `Software`:
```java
put("Signature.SHA256withDSA ImplementedIn", "Software");
```

Nota:

Para exemplos deste estilo de codificação, veja o código-fonte das classes sun.security.provider.Sun e sun.security.provider.SunEntries.

##### Passo 3.2: Crie um Provedor que Usa Provider.Service

O seguinte é um exemplo de um provedor que usa uma classe Provider.Service:
```java
    package p;
     
    public final class MyProvider extends Provider {
         
        public MyProvider() {
            super("MyProvider", "1.0",
                "Some info about my provider and which algorithms it supports");
            putService(new ProviderService(this, "Cipher", "MyCipher", "p.MyCipher"));
        }
         
        private static final class ProviderService extends Provider.Service {
            ProviderService(Provider p, String type, String algo, String cn) {
                super(p, type, algo, cn, null, null);
            }
             
            @Override
            public Object newInstance(Object ctrParamObj)
                throws NoSuchAlgorithmException {
                String type = getType();
                String algo = getAlgorithm();
                try {
                    if (type.equals("Cipher")) {
                        if (algo.equals("MyCipher")) {
                            return new MyCipher();
                        }
                    }
                } catch (Exception ex) {
                    throw new NoSuchAlgorithmException(
                        "Error constructing " + type + " for "
                        + algo + " using MyProvider", ex);
                }
                throw new ProviderException("No impl for " + algo + " " + type);
            }
        }
    }
```

Para criar um provedor com este estilo de codificação, faça o seguinte:

  * Para cada algoritmo que seu provedor suporta, chame putService com uma instância de Provider.Service; os argumentos do construtor de Provider.Service representam um algoritmo suportado.

A seguinte instrução adiciona um serviço chamado `MyCipher` do tipo `Cipher`; o nome da classe que implementa este serviço é `p.MyCipher`. O argumento de `putService` é uma subclasse de Provider.Service:
```java
putService(new ProviderService(this, "Cipher", "MyCipher", "p.MyCipher"));
```

Este exemplo usa uma subclasse de Provider.Service chamada `ProviderService` (em vez de Provider.Service em si), pois ela personaliza como a estrutura JCA instancia os serviços. Se você não precisar personalizar o comportamento de Provider.Service, então você pode chamar o construtor de Provider.Service diretamente:
```java
public final class MyProvider extends Provider {   
            public MyProvider() {
                super("MyProvider", "1.0",
                    "Some info about my provider and which algorithms it supports");
```
```java
                putService(new Provider.Service(
                    this, "Cipher", "MyCipher", "p.MyCipher", null, null));
            }
        }
```

Observe que este exemplo é essencialmente o mesmo que o exemplo descrito em [Passo 3.1: Criar um Provedor que Usa Objetos String para Registrar Seus Serviços](<#/doc/guides/security/howtoimplaprovider>).

  * Substitua qualquer método em Provider.Service, como newInstance, para personalizar como o framework JCA lida com os serviços em seu provedor.

O exemplo no início desta seção sobrescreve o método Provider.Service.newInstance. O método retorna uma instância de `MyCipher` somente se o serviço solicitado for `MyCipher`. Caso contrário, ele lança uma `NoSuchAlgorithmException` e uma `ProviderException`.

Para mais informações sobre outros métodos que você pode sobrescrever, consulte [A Classe Provider.Service](<#/doc/guides/security/howtoimplaprovider>).

Nota:

Para exemplos deste estilo de codificação, consulte o código-fonte do JDK contido no pacote [sun.security.mscapi](<#/>).

##### Passo 3.3: Especificar Informações Adicionais para Implementações de Cipher

Como mencionado anteriormente, no caso de uma propriedade `Cipher`, algName pode realmente representar uma transformação. Uma transformação é uma string que descreve a operação (ou conjunto de operações) a ser realizada por um objeto `Cipher` em alguma entrada fornecida. Uma transformação sempre inclui o nome de um algoritmo criptográfico (por exemplo, AES), e pode ser seguido por um modo e um esquema de preenchimento (padding).

Uma transformação tem a forma:

  * algorithm/mode/padding, ou
  * algorithm

(Neste último caso, são utilizados valores padrão específicos do provedor para o modo e o esquema de preenchimento). Por exemplo, a seguir está uma transformação válida:
```java
        Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
```

Ao solicitar um block cipher no modo stream cipher (por exemplo; `AES` nos modos `CFB` ou `OFB`), um cliente pode opcionalmente especificar o número de bits a serem processados por vez, anexando este número ao nome do modo, conforme mostrado nas seguintes transformações de exemplo:
```java
        Cipher c1 = Cipher.getInstance("AES/CFB8/NoPadding");
        Cipher c2 = Cipher.getInstance("AES/OFB32/PKCS5Padding");
```

Se um número não seguir um modo stream cipher, um padrão específico do provedor é usado. (Por exemplo, o provedor SunJCE usa um padrão de 128 bits.)

Um provedor pode fornecer uma classe separada para cada combinação de algorithm/mode/padding. Alternativamente, um provedor pode decidir fornecer classes mais genéricas representando sub-transformações correspondentes a algorithm ou algorithm/mode ou algorithm//padding (observe as barras duplas); neste caso, o modo e/ou padding solicitados são definidos automaticamente pelos métodos `getInstance` de `Cipher`, que invocam os métodos `engineSetMode` e `engineSetPadding` da subclasse `CipherSpi` do provedor.

Ou seja, uma propriedade `Cipher` em uma classe mestre de provedor pode ter um dos formatos mostrados na tabela a seguir:

Tabela 3-1 Formato da Propriedade Cipher

`Cipher` Property Format | Descrição
---|---
`Cipher.`algName | Uma subclasse de `CipherSpi` de um provedor implementa algName com modo e padding plugáveis
`Cipher.`algName/mode | Uma subclasse de `CipherSpi` de um provedor implementa algName no modo especificado, com padding plugável
`Cipher.`algName//padding | Uma subclasse de `CipherSpi` de um provedor implementa algName com o padding especificado, com modo plugável
`Cipher.`algName/mode/padding | Uma subclasse de `CipherSpi` de um provedor implementa algName com o modo e padding especificados

(Consulte [Java Security Standard Algorithm Names](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html>) para os nomes de algoritmos padrão, modos e esquemas de preenchimento que devem ser usados.)

Por exemplo, um provedor pode fornecer uma subclasse de `CipherSpi` que implementa AES/ECB/PKCS5Padding, uma que implementa AES/CBC/PKCS5Padding, uma que implementa AES/CFB/PKCS5Padding, e ainda outra que implementa AES/OFB/PKCS5Padding. Esse provedor teria as seguintes propriedades `Cipher` em sua classe mestre:

  * `Cipher.AES/ECB/PKCS5Padding`
  * `Cipher.AES/CBC/PKCS5Padding`
  * `Cipher.AES/CFB/PKCS5Padding`
  * `Cipher.AES/OFB/PKCS5Padding`

Outro provedor pode implementar uma classe para cada um desses modos (por exemplo, uma classe para ECB, uma para CBC, uma para CFB e uma para OFB), uma classe para PKCS5Padding, e uma classe AES genérica que é subclasse de `CipherSpi`. Esse provedor teria as seguintes propriedades `Cipher` em sua classe mestre:

  * `Cipher.AES`
  * `Cipher.AES SupportedModes`
    * Exemplo: `"ECB|CBC|CFB|OFB"`

  * `Cipher.AES SupportedPaddings`
    * Exemplo: `"NOPADDING|PKCS5Padding"`

O método de fábrica `getInstance` da classe de engine `Cipher` segue estas regras para instanciar a implementação de `CipherSpi` de um provedor para uma transformação na forma "algorithm":

  1. Verifique se o provedor registrou uma subclasse de `CipherSpi` para o "algorithm" especificado.
     * Se a resposta for SIM, instancie esta classe, para cujo modo e esquema de preenchimento são usados valores padrão (fornecidos pelo provedor).
     * Se a resposta for NÃO, lance uma exceção `NoSuchAlgorithmException`.
  2. O método de fábrica `getInstance` da classe de engine `Cipher` segue estas regras para instanciar a implementação de `CipherSpi` de um provedor para uma transformação na forma "algorithm/mode/padding":
     1. Verifique se o provedor registrou uma subclasse de `CipherSpi` para a transformação "algorithm/mode/padding" especificada.

        * Se a resposta for SIM, instancie-a.

        * Se a resposta for NÃO, vá para o próximo passo.

     2. Verifique se o provedor registrou uma subclasse de `CipherSpi` para a sub-transformação "algorithm/mode".

        * Se a resposta for SIM, instancie-a e chame `engineSetPadding(padding)` na nova instância.

        * Se a resposta for NÃO, vá para o próximo passo.

     3. Verifique se o provedor registrou uma subclasse de `CipherSpi` para a sub-transformação "algorithm//padding" (observe as barras duplas)

        * Se a resposta for SIM, instancie-a e chame `engineSetMode(mode)` na nova instância.

        * Se a resposta for NÃO, vá para o próximo passo.

     4. Verifique se o provedor registrou uma subclasse de `CipherSpi` para a sub-transformação "algorithm".

        * Se a resposta for SIM, instancie-a e chame `engineSetMode(mode)` e `engineSetPadding(padding)` na nova instância.

        * Se a resposta for NÃO, lance uma exceção `NoSuchAlgorithmException`.

#### Passo 4: Criar uma Declaração de Módulo para Seu Provedor

Este passo é opcional, mas recomendado; ele permite que você empacote seu provedor em um módulo nomeado. Um JDK modular pode então localizar seu provedor no module path em vez do class path. O sistema de módulos pode verificar mais detalhadamente as dependências em módulos no module path. Observe que você pode usar módulos nomeados em um JDK não modular; a declaração do módulo será ignorada. Além disso, você ainda pode empacotar seus provedores em módulos não nomeados ou automáticos.

Crie uma declaração de módulo para seu provedor e salve-a em um arquivo chamado `module-info.java`. Esta declaração de módulo inclui o seguinte:

  * O nome do seu módulo.

  * Qualquer módulo do qual seu provedor depende.

  * Uma diretiva `provides` se seu módulo fornece uma implementação de serviço.

O exemplo de declaração de módulo a seguir define um módulo chamado `com.foo.MyProvider`. `p.MyProvider` é o nome de classe totalmente qualificado de uma implementação de serviço. Suponha que, neste exemplo, `p.MyProvider` usa API no pacote javax.security.auth.kerberos, que está no módulo java.security.jgss. Assim, a diretiva `requires java.security.jgss` aparece na declaração do módulo.
```java
    module com.foo.MyProvider {
        provides java.security.Provider with p.MyProvider;
        requires java.security.jgss;
        }
```

Você pode empacotar um provedor em três tipos diferentes de módulos:

  * Módulo nomeado ou explícito: Um módulo que aparece no module path e contém informações de configuração do módulo no arquivo `module-info.class`.

O framework JCA pode usar a classe [ServiceLoader](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/ServiceLoader.html>) (que simplifica a configuração do provedor) para procurar provedores em módulos explícitos sem quaisquer alterações adicionais ao módulo. Consulte [Passo 8.1: Configurar o Provedor](<#/doc/guides/security/howtoimplaprovider>) e [Passo 10: Executar Seus Programas de Teste](<#/doc/guides/security/howtoimplaprovider>).

  * Módulo automático: Um módulo que aparece no module path, mas não contém informações de configuração do módulo em um arquivo `module-info.class` (essencialmente um arquivo JAR "regular").

  * Módulo não nomeado: Um módulo que aparece no class path. Ele pode ou não ter um arquivo `module-info.class`; este arquivo é ignorado.

É recomendado que você empacote seus provedores em módulos nomeados, pois eles oferecem melhor desempenho, encapsulamento mais forte, configuração mais simples e maior flexibilidade.

Você tem muita flexibilidade quando se trata de empacotar e configurar seus provedores. No entanto, isso afeta como você inicia as aplicações que os utilizam. Por exemplo, você pode ter que especificar opções adicionais `--add-exports` ou `--add-modules`. Módulos nomeados, em geral, exigem menos dessas opções adicionais. Além disso, módulos nomeados oferecem mais flexibilidade. Você pode usá-los com JDKs não modulares ou mesmo como módulos não nomeados, especificando-os no class path de um JDK modular. Para mais informações sobre módulos, consulte [The State of the Module System](<http://openjdk.java.net/projects/jigsaw/spec/sotms/>) e [JEP 261: Module System](<http://openjdk.java.net/jeps/261>).

#### Passo 5: Compilar Seu Código

Depois de ter criado seu código de implementação ([Passo 1: Escrever Seu Código de Implementação de Serviço](<#/doc/guides/security/howtoimplaprovider>)), dado um nome ao seu provedor ([Passo 2: Dar um Nome ao Seu Provedor](<#/doc/guides/security/howtoimplaprovider>)), criado a classe mestre ([Passo 3: Escrever Sua Classe Mestre, uma Subclasse de Provider](<#/doc/guides/security/howtoimplaprovider>)), e criado uma declaração de módulo ([Passo 4: Criar uma Declaração de Módulo para Seu Provedor](<#/doc/guides/security/howtoimplaprovider>)), use o compilador Java para compilar seus arquivos.

#### Passo 6: Colocar Seu Provedor em um Arquivo JAR

Adicionar o Arquivo java.security.Provider para Usar a Classe ServiceLoader para Procurar Provedores

Se seu provedor estiver empacotado em um módulo automático ou não nomeado (você não criou uma declaração de módulo conforme descrito em [Passo 4: Criar uma Declaração de Módulo para Seu Provedor](<#/doc/guides/security/howtoimplaprovider>)) e você deseja usar o java.util.ServiceLoader para procurar seus provedores, então adicione o arquivo `META-INF/services/java.security.Provider` ao arquivo JAR e certifique-se de que o arquivo contenha o nome de classe totalmente qualificado da sua implementação de provedor.

O mecanismo de carregamento de provedores de segurança usa a classe [ServiceLoader](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/ServiceLoader.html>) para procurar provedores antes de consultar o class path.

Por exemplo, se o nome de classe totalmente qualificado do seu provedor for `p.Provider` e todo o código compilado do seu provedor estiver no diretório `classes`, então crie um arquivo chamado `classes/META-INF/services/java.security.Provider` que contenha a seguinte linha:
```
    p.MyProvider
```

Executar o Comando jar para Criar um Arquivo JAR

O comando a seguir cria um arquivo JAR chamado `MyProvider.jar`. Todo o código compilado para o arquivo JAR do módulo está no diretório `classes`. Além disso, o descritor do módulo, `module-info.class`, está no diretório `classes`:
```bash
    jar --create --file MyProvider.jar --module-version 1.0 -C classes
```

Nota:

O arquivo `module-info.class` e a opção `--module-version` são opcionais. No entanto, o arquivo `module-info.class` é necessário se você quiser criar um arquivo JAR modular. (Um arquivo JAR modular é um arquivo JAR regular que possui um arquivo `module-info.class` em seu diretório de nível superior.)

Consulte [`jar`](<#/>) nas Especificações da Ferramenta do Java Development Kit.

#### Passo 7: Assinar Seu Arquivo JAR, Se Necessário

Se seu provedor estiver fornecendo algoritmos de criptografia através das classes Cipher, KDF, KEM, KeyAgreement, KeyGenerator, Mac ou SecretKeyFactory, você deve assinar seu arquivo JAR para que o JCA possa autenticar o código em tempo de execução; consulte [Passo 1.1: Considerar Requisitos e Recomendações Adicionais do Provedor JCA para Implementações de Criptografia](<#/doc/guides/security/howtoimplaprovider>). Se você não estiver fornecendo uma implementação deste tipo, então você pode pular este passo.

##### Passo 7.1: Obter um Certificado de Assinatura de Código

O próximo passo é solicitar um certificado de assinatura de código para que você possa usá-lo para assinar seu provedor antes do teste. O certificado será válido tanto para testes quanto para produção. Ele será válido por 5 anos.

A seguir estão os passos que você deve usar para obter um certificado de assinatura de código. Consulte [`keytool`](<#/>) nas Especificações da Ferramenta do Java Development Kit.

  1. Use keytool para gerar um par de chaves RSA de 2048 bits:
```bash
keytool -genkeypair -alias <alias> \
                 -keyalg RSA -keysize 2048 \
                 -dname "cn=<Company Name>, \
                 ou=Java Software Code Signing, \
                 o=Oracle Corporation" \
                 -keystore <keystore file name> \  
                 -storepass <keystore password>
```

Isso gera um par de chaves RSA de 2048 bits (uma chave pública e uma chave privada associada) e o armazena em uma entrada no keystore especificado. A chave pública é armazenada em um certificado autoassinado. A entrada do keystore pode ser acessada posteriormente usando o alias especificado.

Nota:

É recomendado que você crie um par de chaves que use RSA ou DSA com 2048 ou mais bits.

Os valores das opções entre colchetes angulares (`<` e `>`) representam os valores reais que devem ser fornecidos. Por exemplo, `<alias>` deve ser substituído por qualquer nome de alias que você deseje usar para se referir à entrada do keystore recém-gerada no futuro, e `<keystore file name>` deve ser substituído pelo nome do keystore a ser usado.

Dica:

Não envolva os valores reais com colchetes angulares. Por exemplo, se você quiser que seu alias seja `myTestAlias`, especifique a opção `-alias` da seguinte forma:
```bash
-alias myTestAlias
```

Se você especificar um keystore que ainda não existe, ele será criado.

Nota:

Se as linhas de comando que você digita não puderem ser tão longas quanto o comando `keytool -genkeypair` que você deseja executar (por exemplo, se você estiver digitando em um prompt do DOS do Microsoft Windows), você pode criar e executar um arquivo batch de texto simples contendo o comando. Ou seja, crie um novo arquivo de texto que contenha apenas o comando `keytool -genkeypair` completo. (Lembre-se de digitá-lo todo em uma única linha.) Salve o arquivo com a extensão .bat. Então, na sua janela do DOS, digite o nome do arquivo (com seu caminho, se necessário). Isso fará com que o comando no arquivo batch seja executado.

  2. Use keytool para gerar uma Solicitação de Assinatura de Certificado (CSR):
```bash
keytool -certreq -alias <alias> \
                 -file <csr file name> \
                 -keystore <keystore file name> \
                 -storepass <keystore password> 
```

Aqui, `<alias>` é o alias para a entrada do par de chaves RSA criada no passo anterior. Este comando gera um CSR, usando o formato PKCS#10. Ele armazena o CSR no arquivo cujo nome é especificado em `<csr file name>`.

  3. Solicite um certificado de assinatura de código JCE enviando seu CSR, suas informações de contato e outra documentação necessária para a Autoridade de Certificação de Assinatura de Código JCA. Consulte [JCA Code Signing Certification Authority](<http://www.oracle.com/technetwork/java/javase/tech/getcodesigningcertificate-361306.html#jcacodesigning>) para mais informações.
  4. Assim que a Autoridade de Certificação de Assinatura de Código JCE receber sua solicitação, ela a validará e realizará uma verificação de antecedentes. Se esta verificação for aprovada, eles criarão e assinarão um certificado de assinatura de código JCE válido por 5 anos. Você receberá uma mensagem de e-mail contendo dois certificados de texto: o certificado de assinatura de código e o certificado JCE CA, que autentica a chave pública do certificado de assinatura de código.
  5. Importe os certificados que você recebeu da Autoridade de Certificação de Assinatura de Código JCA para seu keystore com o comando keytool.

Primeiro, importe o certificado da CA como um "trusted certificate":
```bash
keytool -import -alias <alias for the CA cert> \
                 -file <CA cert file name> \
                 -keystore <keystore file name> \
                 -storepass <keystore password>
         
```

Em seguida, importe o certificado de assinatura de código:
```bash
keytool -import -alias <alias> \
                 -file <code-signing cert file name> \
                 -keystore <keystore file name> \
                 -storepass <keystore password>
         
```

`<alias>` é o mesmo alias que você criou no [Passo 1](<#/doc/guides/security/howtoimplaprovider>) onde você gerou um par de chaves RSA. Este comando substitui o certificado autoassinado na entrada do keystore especificada por `<alias>` pelo assinado pela Autoridade de Certificação de Assinatura de Código JCA.

Agora que você tem em seu keystore um certificado de uma entidade confiável pelo JCA (a Autoridade de Certificação de Assinatura de Código JCA), você pode colocar seu código de provedor em um arquivo JAR ([Passo 6: Colocar Seu Provedor em um Arquivo JAR](<#/doc/guides/security/howtoimplaprovider>)) e então usar esse certificado para assinar o arquivo JAR ([Passo 7.2: Assinar Seu Provedor](<#/doc/guides/security/howtoimplaprovider>)).

##### Passo 7.2: Assinar Seu Provedor

Assine o arquivo JAR criado no [Passo 6: Colocar Seu Provedor em um Arquivo JAR](<#/doc/guides/security/howtoimplaprovider>) com o certificado de assinatura de código obtido no [Passo 7.1: Obter um Certificado de Assinatura de Código](<#/doc/guides/security/howtoimplaprovider>). Consulte [`jarsigner`](<#/>) nas Especificações da Ferramenta do Java Development Kit.
```bash
    jarsigner -keystore <keystore file name> \
        -storepass <keystore password> \
        <JAR file name> <alias>
```

Aqui, `<alias>` é o alias no keystore para a entrada que contém o certificado de assinatura de código recebido da Autoridade de Certificação de Assinatura de Código JCA (o mesmo alias especificado nos comandos em [Passo 7.1: Obter um Certificado de Assinatura de Código](<#/doc/guides/security/howtoimplaprovider>)).

Você pode testar a verificação da assinatura da seguinte forma:
```bash
    jarsigner -verify <JAR file name>
```

O texto `jar verified` será exibido se a verificação for bem-sucedida.

Nota:

  * Você também pode usar a API [jdk.security.jarsigner](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.jartool/jdk/security/jarsigner/package-summary.html>) para assinar arquivos JAR.
  * Se você incluir um provedor JCE assinado com sua aplicação e também quiser que o arquivo JAR seja assinado para implementar outras políticas de assinatura de código, você precisará aplicar múltiplas assinaturas ao JAR do provedor JCE usando os certificados/chaves apropriados. A assinatura JCE é para aceitação do JAR do provedor pelo framework JCA, as outras assinaturas podem ser usadas para tomar decisões de política. Consulte [`jarsigner`](<#/>) nas Especificações da Ferramenta do Java Development Kit para aplicar múltiplas assinaturas a um arquivo JAR.
  * Você não pode empacotar provedores assinados em arquivos JMOD.
  * Apenas provedores que fornecem instâncias de Cipher, KDF, KEM, KeyAgreement, KeyGenerator, Mac ou SecretKeyFactory devem ser assinados. Se seu provedor fornecer apenas outras instâncias, como SecureRandom, MessageDigest, Signature e KeyStore, então o provedor não precisa ser assinado.
  * Você pode vincular um provedor em uma imagem de tempo de execução personalizada com o comando `jlink`, desde que ele não tenha uma implementação de Cipher, KEM, KeyAgreement, KeyGenerator ou Mac.

#### Passo 8: Preparar para Teste

Os próximos passos descrevem como instalar e configurar seu novo provedor para que ele esteja disponível via JCA.

##### Passo 8.1: Configurar o Provedor

Registre seu provedor para que o framework JCA possa encontrá-lo, seja com a classe ServiceLoader ou no class path ou module path.

  1. Abra o arquivo `java.security` em um editor:

     * Linux ou macOS: `<java-home>/conf/security/java.security`

     * Windows: `<java-home>\conf\security\java.security`

  2. No arquivo `java.security`, encontre a seção onde provedores padrão como SUN, SunRsaSign e SunJCE são configurados como provedores estáticos; ela se parece com o seguinte:
```ini
security.provider.1=SUN
         security.provider.2=SunRsaSign
         security.provider.3=SunEC
         security.provider.4=SunJSSE
         security.provider.5=SunJCE
         security.provider.6=SunJGSS
         security.provider.7=SunSASL
         security.provider.8=XMLDSig
         security.provider.9=SunPCSC
         security.provider.10=JdkLDAP
         security.provider.11=JdkSASL
         security.provider.12=SunMSCAPI
         security.provider.13=SunPKCS11
```

Cada linha nesta seção tem a seguinte forma:
```ini
security.provider.n=provName|className 
```

Isso declara um provedor e especifica sua ordem de preferência `n`. A ordem de preferência é a ordem em que os provedores são procurados por algoritmos solicitados quando nenhum provedor específico é solicitado. A ordem é baseada em 1; 1 é o mais preferido, seguido por 2, e assim por diante.

`provName` é o nome do provedor e `className` é o nome de classe totalmente qualificado do provedor. Você pode usar qualquer um desses dois nomes.

  3. Registre seu provedor adicionando ao arquivo `java.security` uma linha com a forma `security.provider.n=provName|className`.

Se você configurou seu provedor para que a classe [ServiceLoader](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/ServiceLoader.html>) possa procurá-lo (porque você empacotou o provedor em um módulo nomeado conforme descrito em [Passo 4: Criar uma Declaração de Módulo para Seu Provedor](<#/doc/guides/security/howtoimplaprovider>) ou adicionou um arquivo `java.security.Provider` conforme descrito em [Adicionar o Arquivo java.security.Provider para Usar a Classe ServiceLoader para Procurar Provedores](<#/doc/guides/security/howtoimplaprovider>)), então especifique apenas o nome do provedor.

Se você não configurou seu provedor para que a classe ServiceLoader possa procurá-lo, o que significa que o framework JCA o procurará no class path ou module path, então especifique o nome de classe totalmente qualificado do seu provedor.

Por exemplo, a linha destacada registra o provedor `MyProvider` (cujo nome de classe totalmente qualificado é `p.MyProvider` e foi configurado para que a classe ServiceLoader possa procurá-lo) como o 14º provedor preferencial:
```ini
# ...
         security.provider.11=JdkSASL
         security.provider.12=SunMSCAPI
         security.provider.13=SunPKCS11
         security.provider.14=MyProvider
```

Se você não tiver certeza se o mecanismo ServiceLoader será usado, ou se você estará implantando em um sistema não modular, então você também pode registrar o provedor novamente, desta vez usando o nome de classe completo:
```ini
security.provider.15=p.MyProvider
```

Nota:

As propriedades no arquivo `java.security` são tipicamente analisadas apenas uma vez. Se você modificou qualquer propriedade neste arquivo, reinicie suas aplicações para garantir que as alterações sejam refletidas corretamente.

Alternativamente, você pode registrar provedores dinamicamente. Para fazer isso, um programa (como seu programa de teste, a ser escrito no [Passo 9: Escrever e Compilar Seus Programas de Teste](<#/doc/guides/security/howtoimplaprovider>)) chama o método `addProvider` ou `insertProviderAt` na classe `Security`:
```java
    ServiceLoader<Provider> sl = ServiceLoader.load(java.security.Provider.class);
    for (Provider p : sl) {
        System.out.println(p);
        if (p.getName().equals("MyProvider")) {
            Security.addProvider(p);
        }
    }
```

#### Passo 9: Escrever e Compilar Seus Programas de Teste

Escreva e compile um ou mais programas de teste que testem a incorporação do seu provedor na API de Segurança, bem como a correção de seu(s) algoritmo(s). Crie quaisquer arquivos de suporte necessários, como aqueles para dados de teste a serem criptografados.

  1. Os primeiros testes que seu programa deve realizar são para garantir que seu provedor seja encontrado e que seu nome, número de versão e informações adicionais estejam conforme o esperado.

Para fazer isso, você poderia escrever um código como o seguinte, substituindo o nome do seu provedor por `MyPro`:
```java
Provider p = Security.getProvider("MyPro");
         System.out.println("MyPro provider name is " + p.getName());
         System.out.println("MyPro provider version # is " + p.getVersion());
         System.out.println("MyPro provider info is " + p.getInfo());
```

  2. Você deve garantir que seus serviços sejam encontrados.

Por exemplo, se você implementou o algoritmo de criptografia AES, você poderia verificar se ele é encontrado quando solicitado usando o seguinte código (novamente substituindo o nome do seu provedor por "MyPro"):
```java
Cipher c = Cipher.getInstance("AES", "MyPro");
         System.out.println("My Cipher algorithm name is " + c.getAlgorithm());
```

  3. **Opcional:** Se você não especificar um nome de provedor na chamada para `getInstance`, todos os provedores registrados serão pesquisados, em ordem de preferência (consulte [Passo 8.1: Configurar o Provedor](<#/doc/guides/security/howtoimplaprovider>)), até que um que implemente o algoritmo seja encontrado.
  4. **Opcional:** Se seu provedor implementar um mecanismo de isenção, você deve escrever uma aplicação de teste que use o mecanismo de isenção. Tal aplicação também precisa ser assinada e ter um "permission policy file" empacotado com ela.

Consulte [Como Tornar Aplicações Isentas de Restrições Criptográficas](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>) para informações completas sobre como criar e testar tal aplicação.

#### Passo 10: Executar Seus Programas de Teste

Ao executar suas aplicações de teste, as opções de comando `java` necessárias variarão dependendo de fatores como se você empacotou seu provedor como um módulo nomeado, automático ou não nomeado e se você o configurou para que a classe ServiceLoader possa procurá-lo.

Se você empacotou seu provedor como um módulo nomeado e o configurou para que a classe ServiceLoader possa procurá-lo (registrando-o com seu nome no `java.security` conforme descrito em [Passo 8.1: Configurar o Provedor](<#/doc/guides/security/howtoimplaprovider>)), então execute seu programa de teste com o seguinte comando:
```bash
    java --module-path "jars" <other java options>
```

O diretório `jars` contém seu provedor.

Você pode precisar de mais opções dependendo do estilo de código do seu provedor (consulte [Passo 3.1: Criar um Provedor que Usa Objetos String para Registrar Seus Serviços](<#/doc/guides/security/howtoimplaprovider>) e [Passo 3.2: Criar um Provedor que Usa Provider.Service](<#/doc/guides/security/howtoimplaprovider>)), se você empacotou seu provedor em um tipo diferente de módulo, ou se você não o configurou para a classe ServiceLoader. A tabela a seguir descreve essas opções.

Para os comandos `java`, o nome do provedor é `MyProvider`, seu nome de classe totalmente qualificado é `p.MyProvider`, e ele é empacotado no arquivo `com.foo.MyProvider.jar`, que está no diretório `jars`.
Table 3-2 Opções de Tempo de Execução Java Esperadas para Vários Estilos de Implementação de Provedor

Module Type | Provider Code Style | Configured for ServiceLoader Class? | Provider Name Used in java.security File | java Command
---|---|---|---|---
Unnamed | String objects or Provider.Service | Não | Nome de classe totalmente qualificado | `java -cp "jars/com.foo.MyProvider.jar" <other java options>`
Unnamed | String objects or Provider.Service | Sim | Nome de classe totalmente qualificado ou nome do provedor | `java -cp "jars/com.foo.MyProvider.jar" <other java options>`
Automatic | String objects or Provider.Service | Não | Nome de classe totalmente qualificado | `java --module-path "jars/com.foo.MyProvider.jar" --add-modules=com.foo.MyProvider <other java options>`
Automatic | String objects or Provider.Service | Sim | Nome de classe totalmente qualificado ou nome do provedor | `java --module-path "jars/com.foo.MyProvider.jar" <other java options>`
Named | String objects or Provider.Service | Não | Nome de classe totalmente qualificado | `java --module-path "jars" --add-modules=com.foo.MyProvider --add-exports=com.foo.MyProvider/p=java.base <other java options>`Você pode remover a opção `--add-exports` se adicionar `exports p` na declaração do módulo.
Named | String objects | Sim | Nome de classe totalmente qualificado | `java --module-path "jars" --add-exports=com.foo.MyProvider/p=java.base <other java options>`Você pode remover a opção `--add-exports` se adicionar `exports p` na declaração do módulo.
Named | String objects | Sim | Nome do provedor | `java --module-path "jars" --add-exports=com.foo.MyProvider/p=java.base <other java options>`Você pode remover a opção `--add-exports` se adicionar `exports p` na declaração do módulo.
Named | Provider.Service | Sim | Nome de classe totalmente qualificado | `java --module-path "jars" --add-exports=com.foo.MyProvider/p=java.base<other java options>`Você pode remover a opção `--add-exports` se adicionar `exports p` na declaração do módulo.
Named | Provider.Service | Sim | Nome do provedor | `java --module-path "jars" <other java options>`

Depois de determinar as opções `java` apropriadas para seus programas de teste, execute-os. Depure seu código e continue testando conforme necessário. Se o tempo de execução Java não conseguir encontrar um de seus algoritmos, revise as etapas anteriores e certifique-se de que todas foram concluídas.

Certifique-se de incluir testes de seus programas usando diferentes opções de instalação, por exemplo, configurados para usar a classe ServiceLoader ou para serem encontrados no classpath ou module path.

1.  **Opcional:** Se você descobrir durante o teste que seu código precisa de modificação, faça as alterações e recompile [Etapa 5: Compile Seu Código](<#/doc/guides/security/howtoimplaprovider>).
2.  Coloque o código do provedor atualizado em um arquivo JAR ([Etapa 6: Coloque Seu Provedor em um Arquivo JAR](<#/doc/guides/security/howtoimplaprovider>)).
3.  Assine o arquivo JAR ([Etapa 7: Assine Seu Arquivo JAR, Se Necessário](<#/doc/guides/security/howtoimplaprovider>)).
4.  Reconfigure o provedor ([Etapa 8.1: Configure o Provedor](<#/doc/guides/security/howtoimplaprovider>)).
5.  Execute seus programas.
6.  **Opcional:** Se necessário, repita as etapas 1 a 5.

#### Etapa 11: Solicite Aprovação de Exportação do Governo dos EUA, Se Necessário

Todos os fornecedores dos EUA cujos provedores possam ser exportados para fora dos EUA devem solicitar aprovação de exportação ao Bureau of Industry and Security no Departamento de Comércio dos EUA.

Consulte seu advogado de exportação para obter mais informações.

Nota:

Se seu provedor chamar `Cipher.getInstance()` e o objeto `Cipher` retornado precisar realizar criptografia forte, independentemente da força criptográfica permitida pelos arquivos de política de jurisdição baixados pelo usuário, você deve incluir uma cópia do arquivo de política de permissão `cryptoPerms` que você pretende empacotar no arquivo JAR para seu provedor e que especifica uma permissão apropriada para a força criptográfica exigida. A necessidade deste arquivo é semelhante à exigência de que aplicativos "isentos" de restrições criptográficas devem incluir um arquivo de política de permissão `cryptoPerms` em seu arquivo JAR. Consulte [Como Tornar Aplicativos Isentos de Restrições Criptográficas](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>).

Aqui estão duas URLs que podem ser úteis:

*   [US Department of Commerce](<https://www.commerce.gov/>)
*   [Bureau of Industry and Security](<https://www.bis.doc.gov/>)

#### Etapa 12: Documente Seu Provedor e Seus Serviços Suportados

O próximo passo é escrever a documentação para seus clientes. No mínimo, você precisa especificar:

*   O nome que os programas devem usar para se referir ao seu provedor.

Nota:

No momento desta redação, as pesquisas de nomes de provedores diferenciam maiúsculas de minúsculas. Ou seja, se sua classe mestre especificar o nome do seu provedor como "CryptoX", mas um usuário solicitar "CRYPTOx", seu provedor não será encontrado. Este comportamento pode mudar no futuro, mas por enquanto, certifique-se de avisar seus clientes para usar a grafia exata que você especificar.

*   Os tipos de algoritmos e outros serviços implementados pelo seu provedor.
*   Instruções para instalar o provedor, semelhantes às fornecidas em [Etapa 8.1: Configure o Provedor](<#/doc/guides/security/howtoimplaprovider>), exceto que as informações e exemplos devem ser específicos para o seu provedor.

Além disso, sua documentação deve especificar qualquer outra coisa de interesse para os clientes, como quaisquer parâmetros de algoritmo padrão.

##### Etapa 12.1: Indique Se Sua Implementação é Clonável para Message Digests e MACs

Para cada algoritmo Message Digest e MAC, indique se sua implementação é clonável ou não. Isso não é tecnicamente necessário, mas pode economizar tempo e codificação para os clientes, informando se Message Digests ou MACs intermediários podem ser possíveis através da clonagem.

Clientes que não sabem se uma implementação de `MessageDigest` ou `Mac` é clonável podem descobrir tentando clonar o objeto e capturando a exceção potencial, conforme ilustrado pelo exemplo a seguir:
```java
        try {
            // try and clone it
            /* compute the MAC for i1 */
            mac.update(i1);
            byte[] i1Mac = mac.clone().doFinal();
    
            /* compute the MAC for i1 and i2 */
            mac.update(i2);
            byte[] i12Mac = mac.clone().doFinal();
    
            /* compute the MAC for i1, i2 and i3 */
            mac.update(i3);
            byte[] i123Mac = mac.doFinal();
        } catch (CloneNotSupportedException cnse) {
            // have to use an approach not involving cloning
        } 
    
```

Onde,

`mac`
    Indica o objeto MAC que eles receberam quando solicitaram um através de uma chamada para `Mac.getInstance`
`i1`, `i2` e `i3`
     Indica arrays de bytes de entrada, e eles querem calcular hashes separados para:

*   `i1`
*   `i1` e `i2`
*   `i1`, `i2` e `i3`

Geradores de Par de Chaves

Para um algoritmo de gerador de par de chaves, caso o cliente não inicialize explicitamente o gerador de par de chaves (através de uma chamada para um método `initialize`), cada provedor deve fornecer e documentar uma inicialização padrão.

Por exemplo, o gerador de par de chaves Diffie-Hellman fornecido pelo provedor SunJCE usa um tamanho de módulo primo padrão (`keysize`) de 2048 bits.

Fábricas de Chaves

Um provedor deve documentar todas as especificações de chave suportadas por sua fábrica de chaves (secretas).

Geradores de Parâmetros de Algoritmo

Caso o cliente não inicialize explicitamente o gerador de parâmetros de algoritmo (através de uma chamada para um método `init` na classe de motor `AlgorithmParameterGenerator`), cada provedor deve fornecer e documentar uma inicialização padrão.

Por exemplo, o provedor SunJCE usa um tamanho de módulo primo padrão (`keysize`) de 2048 bits para a geração de parâmetros Diffie-Hellman, e o provedor Sun usa um tamanho de módulo primo padrão de 2048 bits para a geração de parâmetros DSA.

Algoritmos de Assinatura

Se você implementar um algoritmo de assinatura, você deve documentar o formato em que a assinatura (gerada por um dos métodos `sign`) é codificada.

Por exemplo, o algoritmo de assinatura SHA256withDSA fornecido pelo provedor "SUN" codifica a assinatura como uma `ASN.1 SEQUENCE` padrão de dois inteiros, `r` e `s`.

Algoritmos de Geração de Números Aleatórios (SecureRandom)

Para um algoritmo de geração de números aleatórios, forneça informações sobre o quão "aleatórios" são os números gerados e a qualidade da semente quando o gerador de números aleatórios é auto-semeador. Observe também o que acontece quando um objeto `SecureRandom` (e seu objeto de implementação `SecureRandomSpi` encapsulado) é desserializado: Se chamadas subsequentes ao método `nextBytes` (que invoca o método `engineNextBytes` do objeto `SecureRandomSpi` encapsulado) do objeto restaurado produzirem os mesmos bytes (aleatórios) exatos que o objeto original produziria, então informe aos usuários que, se este comportamento for indesejável, eles devem semear o objeto aleatório restaurado chamando seu método `setSeed`.

Fábricas de Certificados

Um provedor deve documentar quais tipos de certificados (e seus números de versão, se relevante) podem ser criados pela fábrica.

Keystores

Um provedor deve documentar qualquer informação relevante sobre a implementação do keystore, como seu formato de dados subjacente.

#### Etapa 13: Disponibilize Seus Arquivos de Classe e Documentação para Clientes

Depois de escrever, configurar, testar, instalar e documentar seu software de provedor, disponibilize a documentação para seus clientes.

### Mais Detalhes e Requisitos de Implementação

Esta seção fornece informações adicionais sobre nomes de alias, interdependências de serviço, geradores de parâmetros de algoritmo e parâmetros de algoritmo.

#### Nomes de Alias

No JDK, o esquema de aliasing permite que os clientes usem aliases ao se referir a algoritmos ou tipos, em vez dos nomes padrão.

Para muitos algoritmos e tipos criptográficos, existe um único "nome padrão" oficial definido em [Java Security Standard Algorithm Names](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html>).

Por exemplo, "SHA-256" é o nome padrão para o algoritmo SHA-256 Message Digest definido em [FIPS PUB 180-4: Secure Hash Standard (SHS)](<https://csrc.nist.gov/pubs/fips/180-4/upd1/final>). `DiffieHellman` é o padrão para o algoritmo de acordo de chave Diffie-Hellman definido em PKCS#3.

No JDK, existe um esquema de aliasing que permite que os clientes usem aliases ao se referir a algoritmos ou tipos, em vez de seus nomes padrão.

Por exemplo, a classe mestre do provedor "SUN" (`Sun.java`) define o alias `"SHA1/DSA"` para o algoritmo cujo nome padrão é `"SHA1withDSA"`. Assim, as seguintes declarações são equivalentes:
```java
    Signature sig = Signature.getInstance("SHA1withDSA", "SUN");
    Signature sig = Signature.getInstance("SHA1/DSA", "SUN");
```

Aliases podem ser definidos em sua "classe mestre" (consulte [Etapa 3: Escreva Sua Classe Mestre, uma Subclasse de Provider](<#/doc/guides/security/howtoimplaprovider>)). Para definir um alias, crie uma propriedade chamada
```
    Alg.Alias.engineClassName.aliasName
```

onde engineClassName é o nome de uma classe de motor (por exemplo, `Signature`), e aliasName é o seu nome de alias. O valor da propriedade deve ser o nome padrão do algoritmo (ou tipo) para o algoritmo (ou tipo) que está sendo apelidado.

Como exemplo, o provedor "SUN" define o alias `"SHA1/DSA"` para o algoritmo de assinatura cujo nome padrão é `"SHA1withDSA"` definindo uma propriedade chamada `Alg.Alias.Signature.SHA1/DSA` para ter o valor `SHA1withDSA` através do seguinte:
```java
    put("Alg.Alias.Signature.SHA1/DSA", "SHA1withDSA");
```

Nota:

Os aliases definidos por um provedor estão disponíveis apenas para esse provedor e não para quaisquer outros provedores. Assim, os aliases definidos pelo provedor SunJCE estão disponíveis apenas para o provedor SunJCE.

#### Interdependências de Serviço

Alguns algoritmos exigem o uso de outros tipos de algoritmos. Por exemplo, um algoritmo PBE geralmente precisa usar um algoritmo de resumo de mensagem para transformar uma senha em uma chave.

Se você estiver implementando um tipo de algoritmo que exige outro, você pode fazer uma das seguintes opções:

*   Forneça suas próprias implementações para ambos.

*   Deixe sua implementação de um algoritmo usar uma instância do outro tipo de algoritmo, conforme fornecido pelo provedor Sun padrão que está incluído em cada instalação da Plataforma Java SE. Por exemplo, se você estiver implementando um algoritmo PBE que exige um algoritmo de resumo de mensagem, você pode obter uma instância de uma classe que implementa o algoritmo de resumo de mensagem SHA-256 chamando:
```java
MessageDigest.getInstance("SHA-256", "SUN")
```

*   Deixe sua implementação de um algoritmo usar uma instância do outro tipo de algoritmo, conforme fornecido por outro provedor específico. Isso é apropriado apenas se você tiver certeza de que todos os clientes que usarão seu provedor também terão o outro provedor instalado.

*   Deixe sua implementação de um algoritmo usar uma instância do outro tipo de algoritmo, conforme fornecido por outro provedor (não especificado). Ou seja, você pode solicitar um algoritmo por nome, mas sem especificar nenhum provedor em particular, como em:
```java
MessageDigest.getInstance("SHA-256")
```

Isso é apropriado apenas se você tiver certeza de que haverá pelo menos uma implementação do algoritmo solicitado (neste caso, SHA-256) instalada em cada plataforma Java onde seu provedor será usado.

Aqui estão alguns tipos comuns de interdependências de algoritmo:

Algoritmos de Assinatura e Message Digest

Um algoritmo de assinatura frequentemente requer o uso de um algoritmo de resumo de mensagem. Por exemplo, o algoritmo de assinatura SHA256withDSA requer o algoritmo de resumo de mensagem SHA-256.

Algoritmos de Assinatura e Geração de Números (Pseudo-)Aleatórios

Um algoritmo de assinatura frequentemente requer o uso de um algoritmo de geração de números (pseudo-)aleatórios. Por exemplo, tal algoritmo é necessário para gerar uma assinatura DSA.

Algoritmos de Geração de Par de Chaves e Message Digest

Um algoritmo de geração de par de chaves frequentemente requer o uso de um algoritmo de resumo de mensagem. Por exemplo, as chaves DSA são geradas usando o algoritmo de resumo de mensagem SHA-256.

Algoritmos de Geração de Parâmetros de Algoritmo e Message Digest

Um gerador de parâmetros de algoritmo frequentemente requer o uso de um algoritmo de resumo de mensagem. Por exemplo, os parâmetros DSA são gerados usando o algoritmo de resumo de mensagem SHA-256.

Keystores e Algoritmos de Message Digest

Uma implementação de keystore frequentemente utilizará um algoritmo de resumo de mensagem para calcular hashes com chave (onde a chave é uma senha fornecida pelo usuário) para verificar a integridade de um keystore e garantir que o keystore não foi adulterado.

Algoritmos de Geração de Par de Chaves e Geradores de Parâmetros de Algoritmo

Um algoritmo de geração de par de chaves às vezes precisa gerar um novo conjunto de parâmetros de algoritmo. Ele pode gerar os parâmetros diretamente ou usar um gerador de parâmetros de algoritmo.

Geração de Par de Chaves, Geração de Parâmetros de Algoritmo e Algoritmos de Geração de Números (Pseudo-)Aleatórios

Um algoritmo de geração de par de chaves pode exigir uma fonte de aleatoriedade para gerar um novo par de chaves e possivelmente um novo conjunto de parâmetros associados às chaves. Essa fonte de aleatoriedade é representada por um objeto SecureRandom. A implementação do algoritmo de geração de par de chaves pode gerar os parâmetros da chave por si mesma, ou pode usar um gerador de parâmetros de algoritmo para gerá-los, caso em que pode ou não inicializar o gerador de parâmetros de algoritmo com uma fonte de aleatoriedade.

Geradores de Parâmetros de Algoritmo e Parâmetros de Algoritmo

O método `engineGenerateParameters` de um gerador de parâmetros de algoritmo deve retornar uma instância de `AlgorithmParameters`.

Algoritmos de Assinatura e Geração de Par de Chaves ou Fábricas de Chaves

Se você estiver implementando um algoritmo de assinatura, os métodos `engineInitSign` e `engineInitVerify` de sua implementação exigirão chaves passadas que sejam válidas para o algoritmo subjacente (por exemplo, chaves DSA para o algoritmo DSS). Você pode fazer uma das seguintes opções:

*   Também crie suas próprias classes implementando interfaces apropriadas (por exemplo, classes implementando as interfaces `DSAPrivateKey` e `DSAPublicKey` do pacote `java.security.interfaces`), e crie seu próprio gerador de par de chaves e/ou fábrica de chaves retornando chaves desses tipos. Exija que as chaves passadas para `engineInitSign` e `engineInitVerify` sejam dos tipos de chaves que você implementou, ou seja, chaves geradas a partir de seu gerador de par de chaves ou fábrica de chaves. Ou você pode,

*   Aceitar chaves de outros geradores de par de chaves ou outras fábricas de chaves, desde que sejam instâncias de interfaces apropriadas que permitam que sua implementação de assinatura obtenha as informações de que precisa (como as chaves privada e pública e os parâmetros da chave). Por exemplo, o método `engineInitSign` para uma classe `DSS Signature` poderia aceitar quaisquer chaves privadas que sejam instâncias de `java.security.interfaces.DSAPrivateKey`.

Keystores e Fábricas de Chaves e Certificados

Uma implementação de keystore frequentemente utilizará uma fábrica de chaves para analisar as chaves armazenadas no keystore, e uma fábrica de certificados para analisar os certificados armazenados no keystore.

#### Inicialização Padrão

Caso o cliente não inicialize explicitamente um gerador de par de chaves ou um gerador de parâmetros de algoritmo, cada provedor de tal serviço deve fornecer (e documentar) uma inicialização padrão.

Por exemplo, o provedor `SUN` usa um tamanho de chave padrão de 2048 bits para a geração de pares de chaves e parâmetros DSA. Consulte [Documentação dos Provedores JDK](<#/doc/guides/security/oracle-providers>) para obter informações sobre os tamanhos de chave padrão para outros provedores.

#### Requisitos de Parâmetros Padrão do Gerador de Par de Chaves

Se você implementar um gerador de par de chaves, sua implementação deve fornecer parâmetros padrão que são usados quando os clientes não especificam parâmetros.

A documentação que você fornece ([Etapa 12: Documente Seu Provedor e Seus Serviços Suportados](<#/doc/guides/security/howtoimplaprovider>)) deve indicar quais são os parâmetros padrão.

Por exemplo, o gerador de par de chaves DSA no provedor SUN fornece um conjunto de valores padrão p, q e g pré-calculados para a geração de pares de chaves em todos os tamanhos de chave suportados.

O exemplo a seguir obtém os valores p, q e g para o gerador de par de chaves DSA do provedor preferencial (conforme especificado no arquivo `java.security`), bem como o nome do provedor e o tamanho de chave padrão:
```java
        static void printDSA() throws Exception {
            KeyPairGenerator kpgen = KeyPairGenerator.getInstance("DSA");
            Provider prov = kpgen.getProvider();
            System.out.println("Current provider: " + prov.getName());
            
            KeyPair kp = kpgen.genKeyPair();
            DSAPublicKey pubKey = (DSAPublicKey) kp.getPublic();
    
            DSAParams params = pubKey.getParams();
            BigInteger p = params.getP();
            BigInteger q = params.getQ();
            BigInteger g = params.getG();
            
            System.out.println("Bit length of p: " + p.bitLength());
            System.out.printf("p: %x\n", p);
            System.out.printf("q: %x\n", q);
            System.out.printf("g: %x\n", g);
        }
```

Este exemplo imprime uma saída semelhante à seguinte (quebras de linha e espaços foram adicionados para clareza):
```
    Current provider: SUN
    Bit length of p: 2048
    p: 8f7935d9 b9aae9bf abed887a cf4951b6 f32ec59e 3baf3718 e8eac496 1f3efd36
       06e74351 a9c41833 39b809e7 c2ae1c53 9ba7475b 85d011ad b8b47987 75498469
       5cac0e8f 14b33608 28a22ffa 27110a3d 62a99345 3409a0fe 696c4658 f84bdd20
       819c3709 a01057b1 95adcd00 233dba54 84b6291f 9d648ef8 83448677 979cec04
       b434a6ac 2e75e998 5de23db0 292fc111 8c9ffa9d 8181e733 8db792b7 30d7b9e3
       49592f68 09987215 3915ea3d 6b8b4653 c633458f 803b32a4 c2e0f272 90256e4e
       3f8a3b08 38a1c450 e4e18c1a 29a37ddf 5ea143de 4b66ff04 903ed5cf 1623e158
       d487c608 e97f211c d81dca23 cb6e3807 65f822e3 42be484c 05763939 601cd667
    q: baf696a6 8578f7df dee7fa67 c977c785 ef32b233 bae580c0 bcd5695d
    g: 16a65c58 20485070 4e7502a3 9757040d 34da3a34 78c154d4 e4a5c02d 242ee04f
       96e61e4b d0904abd ac8f37ee b1e09f31 82d23c90 43cb642f 88004160 edf9ca09
       b32076a7 9c32a627 f2473e91 879ba2c4 e744bd20 81544cb5 5b802c36 8d1fa83e
       d489e94e 0fa0688e 32428a5c 78c478c6 8d0527b7 1c9a3abb 0b0be12c 44689639
       e7d3ce74 db101a65 aa2b87f6 4c6826db 3ec72f4b 5599834b b4edb02f 7c90e9a4
       96d3a55d 535bebfc 45d4f619 f63f3ded bb873925 c2f224e0 7731296d a887ec1e
       4748f87e fb5fdeb7 5484316b 2232dee5 53ddaf02 112b0d1f 02da3097 3224fe27
       aeda8b9d 4b2922d9 ba8be39e d9e103a6 3c52810b c688b7e2 ed4316e1 ef17dbde
```

#### A Classe Provider.Service

A classe `Provider.Service` oferece uma maneira alternativa para os provedores anunciarem seus serviços e suporta recursos adicionais.

Desde sua introdução, os provedores de segurança têm publicado suas informações de serviço por meio de pares de String chave-valor formatados apropriadamente que eles colocam em suas entradas de `Hashtable`. Embora esse mecanismo seja simples e conveniente, ele limita a quantidade de personalização possível. Como resultado, o JDK 5.0 introduziu uma segunda opção, a classe `Provider.Service`. Ela oferece uma maneira alternativa para os provedores anunciarem seus serviços e suporta recursos adicionais. Observe que esta adição é totalmente compatível com o método mais antigo de usar entradas de `Hashtable` com valores String. Um provedor no JDK 5.0 pode escolher qualquer método que preferir, ou até mesmo usar ambos ao mesmo tempo.

Um objeto `Provider.Service` encapsula todas as informações sobre um serviço. Este é o provedor que oferece o serviço, seu tipo (por exemplo, `MessageDigest` ou `Signature`), o nome do algoritmo e o nome da classe que implementa o serviço. Opcionalmente, ele também inclui uma lista de nomes de algoritmos alternativos para este serviço (aliases) e atributos, que são um mapa de pares de String (nome, valor). Além disso, ele define os métodos `newInstance()` e `supportsParameter()`. Eles têm implementações padrão, mas podem ser substituídos por provedores, se necessário, como pode ser o caso de provedores que interagem com tokens de segurança de hardware.

O método `newInstance()` é usado pelo framework de segurança quando ele precisa construir novas instâncias de implementação. A implementação padrão usa reflexão para invocar o construtor padrão para o respectivo tipo de serviço. Para todos os serviços padrão, exceto `CertStore`, este é o construtor sem argumentos. O `constructorParameter` para `newInstance()` deve ser nulo nesses casos. Para serviços do tipo `CertStore`, o construtor que recebe um objeto `CertStoreParameters` é invocado, e `constructorParameter` deve ser uma instância não nula de `CertStoreParameters`. Um provedor de segurança pode substituir o método `newInstance()` para implementar a instanciação conforme apropriado para essa implementação. Ele poderia usar invocação direta ou chamar um construtor que passa informações adicionais específicas para a instância do `Provider` ou token. Por exemplo, se vários leitores de Smartcard estiverem presentes no sistema, ele pode passar informações sobre qual leitor o serviço recém-criado deve ser associado. No entanto, apesar da personalização, todas as implementações devem seguir as convenções sobre `constructorParameter` descritas anteriormente.

O `supportsParameter()` testa se o Serviço pode usar o parâmetro especificado. Ele retorna `false` se este serviço não puder usar o parâmetro. Ele retorna `true` se este serviço puder usar o parâmetro, se um teste rápido for inviável, ou se o status for desconhecido. Ele é usado pelo framework de segurança com alguns tipos de serviços para excluir rapidamente implementações não correspondentes da consideração. Atualmente, ele é definido apenas para os seguintes serviços padrão: `Signature`, `Cipher`, `Mac` e `KeyAgreement`. O `parameter` deve ser uma instância de `Key` nesses casos. Por exemplo, para serviços `Signature`, o framework testa se o serviço pode usar a `Key` fornecida antes de instanciar o serviço. A implementação padrão examina os atributos `SupportedKeyFormats` e `SupportedKeyClasses`. Novamente, um provedor pode substituir esses métodos para implementar testes adicionais.

O atributo `SupportedKeyFormats` é uma lista dos formatos suportados para chaves codificadas (conforme retornado por `key.getFormat()`) separados pelo caractere "|" (pipe). Por exemplo, `X.509|PKCS#8`. O atributo `SupportedKeyClasses` é uma lista dos nomes de classes de interfaces separadas pelo caractere "|". Um objeto de chave é considerado aceitável se for atribuível a pelo menos uma dessas classes ou interfaces nomeadas. Em outras palavras, se a classe do objeto de chave for uma subclasse de uma das classes listadas (ou a própria classe) ou se ela implementar a interface listada. Um valor de exemplo é `"java.security.interfaces.RSAPrivateKey|java.security.interfaces.RSAPublicKey"`.

Quatro métodos foram adicionados à classe `Provider` para adicionar e pesquisar Serviços. Como mencionado anteriormente, a implementação desses métodos e também dos métodos `Properties` existentes foram especificamente projetadas para garantir a compatibilidade com as subclasses `Provider` existentes. Isso é alcançado da seguinte forma:

Se métodos `Properties` legados forem usados para adicionar entradas, a classe `Provider` garante que as strings de propriedade sejam analisadas em objetos `Service` equivalentes antes da pesquisa via `getService()`. Da mesma forma, se o método `putService()` for usado, strings de propriedade equivalentes são colocadas na `hashtable` do provedor ao mesmo tempo. Se uma implementação de provedor substituir qualquer um dos métodos na classe `Provider`, ela deve garantir que sua implementação não interfira com esta conversão. Para evitar problemas, recomendamos que as implementações não substituam nenhum dos métodos na classe `Provider`.

#### Formatos de Assinatura

O algoritmo de assinatura deve especificar o formato em que a assinatura é codificada.

Se você implementar um algoritmo de assinatura, a documentação que você fornece ([Etapa 12: Documente Seu Provedor e Seus Serviços Suportados](<#/doc/guides/security/howtoimplaprovider>)) deve especificar o formato em que a assinatura (gerada por um dos métodos `sign`) é codificada.

Por exemplo, o algoritmo de assinatura SHA1withDSA fornecido pelo provedor Sun codifica a assinatura como uma sequência ASN.1 padrão de dois valores `ASN.1 INTEGER`: `r` e `s`, nessa ordem:
```
    SEQUENCE ::= {
            r INTEGER,
            s INTEGER }
    
```

#### Interfaces DSA e Suas Implementações Necessárias

A API de Segurança Java contém interfaces (no pacote `java.security.interfaces`) para a conveniência de programadores que implementam serviços DSA.

A API de Segurança Java contém as seguintes interfaces:

*   `DSAKey`
*   `DSAKeyPairGenerator`
*   `DSAParams`
*   `DSAPrivateKey`
*   `DSAPublicKey`

As seções a seguir discutem os requisitos para implementações dessas interfaces.

DSAKeyPairGenerator

A interface `DSAKeyPairGenerator` está obsoleta. Ela costumava ser necessária para permitir que os clientes fornecessem parâmetros específicos de DSA a serem usados em vez dos parâmetros padrão fornecidos por sua implementação. No entanto, não é mais necessária. O método `KeyPairGenerator.initialize` que recebe um parâmetro `AlgorithmParameterSpec` permite que os clientes indiquem parâmetros específicos do algoritmo.

Implementação de DSAParams

Se você estiver implementando um gerador de par de chaves DSA, você precisa de uma classe que implemente `DSAParams` para armazenar e retornar os parâmetros p, q e g.

Uma implementação de `DSAParams` também é necessária se você implementar as interfaces `DSAPrivateKey` e `DSAPublicKey`. `DSAPublicKey` e `DSAPrivateKey` ambas estendem a interface `DSAKey`, que contém um método `getParams` que deve retornar um objeto `DSAParams`.

Nota:

Existe uma implementação de `DSAParams` integrada ao JDK: a classe `java.security.spec.DSAParameterSpec`.

Implementações de DSAPrivateKey e DSAPublicKey

Se você implementar um gerador de par de chaves DSA ou uma fábrica de chaves, você precisa criar classes que implementem as interfaces `DSAPrivateKey` e `DSAPublicKey`.

Se você implementar um gerador de par de chaves DSA, seu método `generateKeyPair` (em sua subclasse `KeyPairGeneratorSpi`) retornará instâncias de suas implementações dessas interfaces.

Se você implementar uma fábrica de chaves DSA, seu método `engineGeneratePrivate` (em sua subclasse `KeyFactorySpi`) retornará uma instância de sua implementação `DSAPrivateKey`, e seu método `engineGeneratePublic` retornará uma instância de sua implementação `DSAPublicKey`.

Além disso, seus métodos `engineGetKeySpec` e `engineTranslateKey` esperarão que a chave passada seja uma instância de uma implementação `DSAPrivateKey` ou `DSAPublicKey`. O método `getParams` fornecido pelas implementações da interface é útil para obter e extrair os parâmetros das chaves e, em seguida, usar os parâmetros, por exemplo, como parâmetros para o construtor `DSAParameterSpec` chamado para criar uma especificação de parâmetro a partir de valores de parâmetro que poderiam ser usados para inicializar um objeto `KeyPairGenerator` para DSA.

Se você implementar um algoritmo de assinatura DSA, seu método `engineInitSign` (em sua subclasse `SignatureSpi`) esperará receber uma `DSAPrivateKey` e seu método `engineInitVerify` esperará receber uma `DSAPublicKey`.

Observe: As interfaces `DSAPublicKey` e `DSAPrivateKey` definem uma interface muito genérica e independente de provedor para chaves públicas e privadas DSA, respectivamente. Os métodos `engineGetKeySpec` e `engineTranslateKey` (em sua subclasse `KeyFactorySpi`) poderiam adicionalmente verificar se a chave passada é realmente uma instância da própria implementação do provedor de `DSAPrivateKey` ou `DSAPublicKey`, por exemplo, para aproveitar detalhes de implementação específicos do provedor. O mesmo se aplica aos métodos `engineInitSign` e `engineInitVerify` do algoritmo de assinatura DSA (em sua subclasse `SignatureSpi`).

Para ver quais métodos precisam ser implementados por classes que implementam as interfaces `DSAPublicKey` e `DSAPrivateKey`, observe primeiro as seguintes assinaturas de interface:

No pacote `java.security.interfaces`:
```java
    public interface DSAPrivateKey extends DSAKey, PrivateKey
    public interface DSAPublicKey extends DSAKey, PublicKey
    public interface DSAKey
```

No pacote `java.security`:
```java
    public interface PrivateKey extends Key
    public interface PublicKey extends Key
    public interface Key extends Serializable
```

Para implementar as interfaces `DSAPrivateKey` e `DSAPublicKey`, você deve implementar os métodos que elas definem, bem como aqueles definidos pelas interfaces que elas estendem, direta ou indiretamente.

Assim, para chaves privadas, você precisa fornecer uma classe que implemente:

*   O método `getX` da interface `DSAPrivateKey`.
*   O método `getParams` da interface `DSAKey` porque `DSAPrivateKey` estende `DSAKey`.

Nota:

O método `getParams` retorna um objeto `DSAParams`, então você também deve ter uma implementação de `DSAParams`.

*   Os métodos `getAlgorithm`, `getEncoded` e `getFormat` da interface `Key` porque `DSAPrivateKey` estende `java.security.PrivateKey`, e `PrivateKey` estende `Key`.

Da mesma forma, para chaves públicas DSA, você precisa fornecer uma classe que implemente:

*   O método `getY` da interface `DSAPublicKey`.
*   O método `getParams` da interface `DSAKey` porque `DSAPublicKey` estende `DSAKey`.

Nota:

O método `getParams` retorna um objeto `DSAParams`, então você também deve ter uma implementação de `DSAParams`.

*   Os métodos `getAlgorithm`, `getEncoded` e `getFormat` da interface `Key` porque `DSAPublicKey` estende `java.security.PublicKey`, e `PublicKey` estende `Key`.

#### Interfaces RSA e Suas Implementações Necessárias

A API de Segurança Java contém as interfaces (no pacote `java.security.interfaces`) para a conveniência de programadores que implementam serviços RSA.
* RSAPrivateKey
* RSAPrivateCrtKey
* RSAPublicKey

As seções a seguir discutem os requisitos para implementações dessas interfaces.

Implementações de RSAPrivateKey, RSAPrivateCrtKey e RSAPublicKey

Se você implementar um gerador de par de chaves RSA ou uma key factory, você precisará criar classes que implementem as interfaces RSAPublicKey (e/ou RSAPrivateCrtKey) e RSAPublicKey. (`RSAPrivateCrtKey` é a interface para uma chave privada RSA, usando a representação do Teorema do Resto Chinês (CRT).)

Se você implementar um gerador de par de chaves RSA, seu método `generateKeyPair` (na sua subclasse `KeyPairGeneratorSpi`) retornará instâncias das suas implementações dessas interfaces.

Se você implementar uma key factory RSA, seu método `engineGeneratePrivate` (na sua subclasse `KeyFactorySpi`) retornará uma instância da sua implementação de `RSAPrivateKey` (ou `RSAPrivateCrtKey`), e seu método `engineGeneratePublic` retornará uma instância da sua implementação de `RSAPublicKey`.

Além disso, seus métodos `engineGetKeySpec` e `engineTranslateKey` esperarão que a chave passada seja uma instância de uma implementação de `RSAPrivateKey`, `RSAPrivateCrtKey` ou `RSAPublicKey`.

Se você implementar um algoritmo de signature RSA, seu método `engineInitSign` (na sua subclasse `SignatureSpi`) esperará receber uma `RSAPrivateKey` ou uma `RSAPrivateCrtKey`, e seu método `engineInitVerify` esperará receber uma `RSAPublicKey`.

Por favor, note: As interfaces `RSAPublicKey`, `RSAPrivateKey` e `RSAPrivateCrtKey` definem uma interface muito genérica e independente de provider para chaves públicas e privadas RSA. Os métodos `engineGetKeySpec` e `engineTranslateKey` (na sua subclasse `KeyFactorySpi`) poderiam adicionalmente verificar se a chave passada é realmente uma instância da própria implementação do provider de `RSAPrivateKey`, `RSAPrivateCrtKey` ou `RSAPublicKey`, por exemplo, para aproveitar detalhes de implementação específicos do provider. O mesmo se aplica aos métodos `engineInitSign` e `engineInitVerify` do algoritmo de signature RSA (na sua subclasse `SignatureSpi`).

Para ver quais métodos precisam ser implementados por classes que implementam as interfaces `RSAPublicKey`, `RSAPrivateKey` e `RSAPrivateCrtKey`, observe primeiro as seguintes assinaturas de interface:

No pacote `java.security.interfaces`:
```java
    public interface RSAPrivateKey extends PrivateKey
    public interface RSAPrivateCrtKey extends RSAPrivateKey
    public interface RSAPublicKey extends PublicKey
```

No pacote `java.security`:
```java
    public interface PrivateKey extends Key
    public interface PublicKey extends Key
    public interface Key extends Serializable
```

Para implementar as interfaces `RSAPrivateKey`, `RSAPrivateCrtKey` e `RSAPublicKey`, você deve implementar os métodos que elas definem, bem como aqueles definidos pelas interfaces que elas estendem, direta ou indiretamente.

Assim, para chaves privadas RSA, você precisa fornecer uma classe que implemente:

*   Os métodos `getModulus` e `getPrivateExponent` da interface RSAPrivateKey.
*   Os métodos `getAlgorithm`, `getEncoded` e `getFormat` da interface Key porque `RSAPrivateKey` estende `java.security.PrivateKey`, e `PrivateKey` estende `Key`.

Similarmente, para chaves privadas RSA usando a representação do Teorema do Resto Chinês (CRT), você precisa fornecer uma classe que implemente:

*   Todos os métodos listados anteriormente para chaves privadas RSA porque `RSAPrivateCrtKey` estende `java.security.interfaces.RSAPrivateKey`.
*   Os métodos `getPublicExponent`, `getPrimeP`, `getPrimeQ`, `getPrimeExponentP`, `getPrimeExponentQ` e `getCrtCoefficient` da interface RSAPrivateKey.

Para chaves públicas RSA, você precisa fornecer uma classe que implemente:

*   Os métodos `getModulus` e `getPublicExponent` da interface RSAPublicKey.
*   Os métodos `getAlgorithm`, `getEncoded` e `getFormat` da interface Key porque `RSAPublicKey` estende `java.security.PublicKey`, e `PublicKey` estende `Key`.

O JCA contém várias implementações de `AlgorithmParameterSpec` para os parâmetros de algoritmo de cipher e key agreement mais frequentemente usados. Se você estiver operando com parâmetros de algoritmo que deveriam ser para um tipo diferente de algoritmo não fornecido pelo JCA, você precisará fornecer sua própria implementação de `AlgorithmParameterSpec` apropriada para esse tipo de algoritmo.

#### Interfaces Diffie-Hellman e suas Implementações Requeridas

O JCA contém interfaces (no pacote `javax.crypto.interfaces`) para a conveniência de programadores que implementam serviços Diffie-Hellman.

*   DHPublicKey
*   DHKey
*   DHPrivateKey

As seções a seguir discutem os requisitos para implementações dessas interfaces.

Implementações de DHPrivateKey e DHPublicKey

Se você implementar um gerador de par de chaves Diffie-Hellman ou uma key factory, você precisará criar classes que implementem as interfaces DHPrivateKey e DHPublicKey.

Se você implementar um gerador de par de chaves Diffie-Hellman, seu método `generateKeyPair` (na sua subclasse `KeyPairGeneratorSpi`) retornará instâncias das suas implementações dessas interfaces.

Se você implementar uma key factory Diffie-Hellman, seu método `engineGeneratePrivate` (na sua subclasse `KeyFactorySpi`) retornará uma instância da sua implementação de `DHPrivateKey`, e seu método `engineGeneratePublic` retornará uma instância da sua implementação de `DHPublicKey`.

Além disso, seus métodos `engineGetKeySpec` e `engineTranslateKey` esperarão que a chave passada seja uma instância de uma implementação de `DHPrivateKey` ou `DHPublicKey`. O método `getParams` fornecido pelas implementações da interface é útil para obter e extrair os parâmetros das chaves. Você pode então usar os parâmetros, por exemplo, como parâmetros para o construtor `DHParameterSpec` chamado para criar uma especificação de parâmetro a partir de valores de parâmetro usados para inicializar um objeto `KeyPairGenerator` para Diffie-Hellman.

Se você implementar o algoritmo de key agreement Diffie-Hellman, seu método `engineInit` (na sua subclasse `KeyAgreementSpi`) esperará receber uma `DHPrivateKey` e seu método `engineDoPhase` esperará receber uma `DHPublicKey`.

Nota:

As interfaces `DHPublicKey` e `DHPrivateKey` definem uma interface muito genérica e independente de provider para chaves públicas e privadas Diffie-Hellman, respectivamente. Os métodos `engineGetKeySpec` e `engineTranslateKey` (na sua subclasse KeyFactorySpi) poderiam adicionalmente verificar se a chave passada é realmente uma instância da própria implementação do provider de `DHPrivateKey` ou `DHPublicKey`, por exemplo, para aproveitar detalhes de implementação específicos do provider. O mesmo se aplica aos métodos `engineInit` e `engineDoPhase` do algoritmo Diffie-Hellman (na sua subclasse `KeyAgreementSpi`).

Para ver quais métodos precisam ser implementados por classes que implementam as interfaces `DHPublicKey` e `DHPrivateKey`, observe primeiro as seguintes assinaturas de interface:

No pacote `javax.crypto.interfaces`:
```java
    public interface DHPrivateKey extends DHKey, PrivateKey
    public interface DHPublicKey extends DHKey, jPublicKey
    public interface DHKey
```

No pacote `java.security`:
```java
    public interface PrivateKey extends Key
    public interface PublicKey extends Key
    public interface Key extends Serializable
```

Para implementar as interfaces `DHPrivateKey` e `DHPublicKey`, você deve implementar os métodos que elas definem, bem como aqueles definidos pelas interfaces que elas estendem, direta ou indiretamente.

Assim, para chaves privadas, você precisa fornecer uma classe que implemente:

*   O método `getX` da interface DHPrivateKey.
*   O método `getParams` da interface DHKey porque `DHPrivateKey` estende `DHKey`.
*   Os métodos `getAlgorithm`, `getEncoded` e `getFormat` da interface Key porque `DHPrivateKey` estende `java.security.PrivateKey`, e `PrivateKey` estende `Key`.

Similarmente, para chaves públicas Diffie-Hellman, você precisa fornecer uma classe que implemente:

*   O método `getY` da interface DHPublicKey.
*   O método `getParams` da interface DHKey porque `DHPublicKey` estende `DHKey`.
*   Os métodos `getAlgorithm`, `getEncoded` e `getFormat` da interface Key porque `DHPublicKey` estende `java.security.PublicKey`, e `PublicKey` estende `Key`.

#### Interfaces para Outros Tipos de Algoritmo

Como observado anteriormente, a Java Security API contém interfaces para a conveniência de programadores que implementam serviços como DSA, RSA e ECC. Se houver serviços sem suporte de API, você precisará definir suas próprias APIs.

Se você estiver implementando um gerador de par de chaves para um algoritmo diferente, você deve criar uma interface com um ou mais métodos `initialize` que os clientes podem chamar quando desejam fornecer parâmetros específicos do algoritmo a serem usados, em vez dos parâmetros padrão que sua implementação fornece. Sua subclasse de `KeyPairGeneratorSpi` deve implementar esta interface.

Para algoritmos sem suporte direto de API, é recomendado que você crie interfaces semelhantes e forneça classes de implementação. Sua interface de chave pública deve estender a interface PublicKey. Similarmente, sua interface de chave privada deve estender a interface PrivateKey.

#### Interfaces e Classes de Especificação de Parâmetros de Algoritmo

Uma especificação de parâmetro de algoritmo é uma representação transparente dos conjuntos de parâmetros usados com um algoritmo.

Uma representação transparente de parâmetros significa que você pode acessar cada valor individualmente, através de um dos métodos get definidos na classe de especificação correspondente (por exemplo, `DSAParameterSpec` define os métodos `getP`, `getQ` e `getG`, para acessar os parâmetros p, q e g, respectivamente).

Isso contrasta com uma representação opaca, como fornecida pela classe engine `AlgorithmParameters`, na qual você não tem acesso direto aos valores do key material; você só pode obter o nome do algoritmo associado ao conjunto de parâmetros (via `getAlgorithm`) e algum tipo de encoding para o conjunto de parâmetros (via `getEncoded`).

Se você fornecer uma implementação de `AlgorithmParametersSpi`, `AlgorithmParameterGeneratorSpi` ou `KeyPairGeneratorSpi`, você deve utilizar a interface `AlgorithmParameterSpec`, já que cada uma dessas classes contém métodos que recebem um parâmetro `AlgorithmParameterSpec`. Tais métodos precisam determinar qual implementação real dessa interface foi passada e agir de acordo.

O JCA contém várias implementações de `AlgorithmParameterSpec` para os parâmetros de algoritmo de signature, cipher e key agreement mais frequentemente usados. Se você estiver operando com parâmetros de algoritmo que deveriam ser para um tipo diferente de algoritmo não fornecido pelo JCA, você precisará fornecer sua própria implementação de `AlgorithmParameterSpec` apropriada para esse tipo de algoritmo.

Java define as seguintes interfaces e classes de especificação de parâmetros de algoritmo nos pacotes `java.security.spec` e `javax.crypto.spec`:

A Interface AlgorithmParameterSpec

`AlgorithmParameterSpec` é uma interface para uma especificação transparente de parâmetros criptográficos.

Esta interface não contém métodos ou constantes. Seu único propósito é agrupar (e fornecer segurança de tipo para) todas as especificações de parâmetros. Todas as especificações de parâmetros devem implementar esta interface.

A Classe DSAParameterSpec

Esta classe (que implementa as interfaces `AlgorithmParameterSpec` e `DSAParams`) especifica o conjunto de parâmetros usados com o algoritmo DSA. Ela possui os seguintes métodos:
```java
        public BigInteger getP()
    
        public BigInteger getQ()
    
        public BigInteger getG()
    
```

Esses métodos retornam os parâmetros do algoritmo DSA: o prime `p`, o sub-prime `q` e a base `g`.

Muitos tipos de serviços DSA acharão esta classe útil - por exemplo, ela é utilizada pelas classes de signature DSA, key pair generator, algorithm parameter generator e algorithm parameters implementadas pelo provider Sun. Como exemplo específico, uma implementação de algorithm parameters deve incluir uma implementação para o método `getParameterSpec`, que retorna um `AlgorithmParameterSpec`. A implementação de algorithm parameters DSA fornecida pela Sun retorna uma instância da classe `DSAParameterSpec`.

A Classe IvParameterSpec

Esta classe (que implementa a interface `AlgorithmParameterSpec`) especifica o initialization vector (IV) usado com um cipher em feedback mode.

Tabela 3-3 Método em `IvParameterSpec`

Método | Descrição
---|---
`byte[] getIV()` | Retorna o initialization vector (IV).

A Classe OAEPParameterSpec

Esta classe especifica o conjunto de parâmetros usados com OAEP Padding, conforme definido no padrão PKCS #1.

Tabela 3-4 Métodos em `OAEPParameterSpec`

Método | Descrição
---|---
`String getDigestAlgorithm()` | Retorna o nome do algoritmo de message digest.
`String getMGFAlgorithm()` | Retorna o nome do algoritmo da função de geração de máscara.
`AlgorithmParameterSpec getMGFParameters()` | Retorna os parâmetros para a função de geração de máscara.
`PSource getPSource()` | Retorna a fonte de entrada de encoding P.

A Classe PBEParameterSpec

Esta classe (que implementa a interface `AlgorithmParameterSpec`) especifica o conjunto de parâmetros usados com um algoritmo de password-based encryption (PBE).

Tabela 3-5 Métodos em `PBEParameterSpec`

Método | Descrição
---|---
`int getIterationCount()` | Retorna o iteration count.
`byte[] getSalt()` | Retorna o salt.

A Classe RC2ParameterSpec

Esta classe (que implementa a interface `AlgorithmParameterSpec`) especifica o conjunto de parâmetros usados com o algoritmo RC2.

Tabela 3-6 Métodos em `RC2ParameterSpec`

Método | Descrição
---|---
`boolean equals(Object obj)` | Testa a igualdade entre o objeto especificado e este objeto.
`int getEffectiveKeyBits()` | Retorna o tamanho efetivo da chave em bits.
`byte[] getIV()` | Retorna o IV ou null se este conjunto de parâmetros não contiver um IV.
`int hashCode()` | Calcula um valor de hash code para o objeto.

A Classe RC5ParameterSpec

Esta classe (que implementa a interface `AlgorithmParameterSpec`) especifica o conjunto de parâmetros usados com o algoritmo RC5.

Tabela 3-7 Métodos em `RC5ParameterSpec`

Método | Descrição
---|---
`boolean equals(Object obj)` | Testa a igualdade entre o objeto especificado e este objeto.
`byte[] getIV()` | Retorna o IV ou null se este conjunto de parâmetros não contiver um IV.
`int getRounds()` | Retorna o número de rounds.
`int getVersion()` | Retorna a version.
`int getWordSize()` | Retorna o word size em bits.
`int hashCode()` | Calcula um valor de hash code para o objeto.

A Classe DHParameterSpec

Esta classe (que implementa a interface `AlgorithmParameterSpec`) especifica o conjunto de parâmetros usados com o algoritmo Diffie-Hellman.

Tabela 3-8 Métodos em DHParameterSpec

Método | Descrição
---|---
`BigInteger getG()` | Retorna o base generator `g`.
`int getL()` | Retorna o tamanho em bits, `l`, do random exponent (private value).
`BigInteger getP()` | Retorna o prime modulus `p`.

Muitos tipos de serviços Diffie-Hellman acharão esta classe útil; por exemplo, ela é usada pelas classes de key agreement Diffie-Hellman, key pair generator, algorithm parameter generator e algorithm parameters implementadas pelo provider "SunJCE". Como exemplo específico, uma implementação de algorithm parameters deve incluir uma implementação para o método `getParameterSpec`, que retorna um `AlgorithmParameterSpec`. A implementação de algorithm parameters Diffie-Hellman fornecida pelo "SunJCE" retorna uma instância da classe `DHParameterSpec`.

#### Interfaces e Classes de Especificação de Chave Requeridas por Key Factories

Uma key factory fornece conversões bidirecionais entre chaves opacas (do tipo `Key`) e key specifications. Se você implementar uma key factory, você precisará, portanto, entender e utilizar key specifications. Em alguns casos, você também precisará implementar suas próprias key specifications.

Key specifications são representações transparentes do key material que constitui uma chave. Se a chave for armazenada em um hardware device, sua especificação pode conter informações que ajudam a identificar a chave no device.

Uma representação transparente de chaves significa que você pode acessar cada valor de key material individualmente, através de um dos métodos get definidos na classe de especificação correspondente. Por exemplo, `java.security.spec.DSAPrivateKeySpec` define os métodos `getX`, `getP`, `getQ` e `getG`, para acessar a chave privada `x`, e os parâmetros do algoritmo DSA usados para calcular a chave: o prime `p`, o sub-prime `q` e a base `g`.

Isso contrasta com uma representação opaca, conforme definida pela interface Key, na qual você não tem acesso direto aos campos de parâmetro. Em outras palavras, uma representação "opaca" lhe dá acesso limitado à chave - apenas os três métodos definidos pela interface Key: `getAlgorithm`, `getFormat` e `getEncoded`.

Uma chave pode ser especificada de forma algoritmo-específica, ou em um formato de encoding independente de algoritmo (como ASN.1). Por exemplo, uma chave privada DSA pode ser especificada por seus componentes `x`, `p`, `q` e `g` (veja [`DSAPrivateKeySpec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/DSAPrivateKeySpec.html>)), ou pode ser especificada usando seu encoding DER (veja [`PKCS8EncodedKeySpec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/PKCS8EncodedKeySpec.html>)).

Java define as seguintes interfaces e classes de key specification nos pacotes `java.security.spec` e `javax.crypto.spec`:

A Interface `KeySpec`

Esta interface não contém métodos ou constantes. Seu único propósito é agrupar (e fornecer segurança de tipo para) todas as key specifications. Todas as key specifications devem implementar esta interface.

Java fornece várias classes que implementam a interface KeySpec:

*   [DSAPrivateKeySpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/DSAPrivateKeySpec.html>)
*   [DSAPublicKeySpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/DSAPublicKeySpec.html>)
*   [RSAPrivateKeySpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/RSAPrivateKeySpec.html>)
*   [RSAPublicKeySpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/RSAPublicKeySpec.html>)
*   [EncodedKeySpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/EncodedKeySpec.html>)
*   [PKCS8EncodedKeySpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/PKCS8EncodedKeySpec.html>)
*   [X509EncodedKeySpec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/spec/X509EncodedKeySpec.html>)

Se seu provider usa tipos de chave (por exemplo, `Your_PublicKey_type` e `Your_PrivateKey_type`) para os quais o JDK ainda não fornece classes `KeySpec` correspondentes, existem dois cenários possíveis, um dos quais exige que você implemente suas próprias key specifications:

1.  Se seus usuários nunca precisarem acessar valores específicos de key material do seu tipo de chave, você não precisará fornecer nenhuma classe `KeySpec` para seu tipo de chave.

Neste cenário, seus usuários sempre criarão chaves `Your_PublicKey_type` e `Your_PrivateKey_type` através do `KeyPairGenerator` apropriado fornecido pelo seu provider para aquele tipo de chave. Se eles quiserem armazenar as chaves geradas para uso posterior, eles recuperam os encodings das chaves (usando o método `getEncoded` da interface `Key`). Quando eles quiserem criar uma chave `Your_PublicKey_type` ou `Your_PrivateKey_type` a partir do encoding (por exemplo, para inicializar um objeto Signature para assinatura ou verificação), eles criam uma instância de `X509EncodedKeySpec` ou `PKCS8EncodedKeySpec` a partir do encoding, e a fornecem à `KeyFactory` apropriada fornecida pelo seu provider para aquele algoritmo, cujos métodos `generatePublic` e `generatePrivate` retornarão o objeto `PublicKey` (uma instância de `Your_PublicKey_type`) ou `PrivateKey` (uma instância de `Your_PrivateKey_type`) solicitado, respectivamente.

2.  Se você antecipa a necessidade de os usuários acessarem valores específicos de key material do seu tipo de chave, ou de construir uma chave do seu tipo de chave a partir de key material e valores de parâmetros associados, em vez de seu encoding (como no caso anterior), você deve especificar novas classes `KeySpec` (classes que implementam a interface `KeySpec`) com os métodos construtores e métodos get apropriados para retornar campos de key material e valores de parâmetros associados para seu tipo de chave. Você especificará essas classes de maneira semelhante à forma como é feito pelas classes `DSAPrivateKeySpec` e `DSAPublicKeySpec`. Você precisa enviar essas classes junto com suas classes de provider, por exemplo, como parte do seu arquivo JAR do provider.

A Classe DSAPrivateKeySpec

Esta classe (que implementa a Interface `KeySpec`) especifica uma chave privada DSA com seus parâmetros associados. Ela possui os seguintes métodos:

Tabela 3-9 Métodos em DSAPrivateKeySpec

Método em DSAPrivateKeySpec | Descrição
---|---
`public BigInteger getX()` | Retorna a chave privada x.
`public BigInteger getP()` | Retorna o prime p.
`public BigInteger getQ()` | Retorna o sub-prime q.
`public BigInteger getG()` | Retorna a base g.

Esses métodos retornam a chave privada `x`, e os parâmetros do algoritmo DSA usados para calcular a chave: o prime `p`, o sub-prime `q` e a base `g`.

A Classe DSAPublicKeySpec

Esta classe (que implementa a Interface `KeySpec`) especifica uma chave pública DSA com seus parâmetros associados. Ela possui os seguintes métodos:

Tabela 3-10 Métodos em DSAPublicKeySpec

Método em DSAPublicKeySpec | Descrição
---|---
`public BigInteger getY()` | retorna a chave pública y.
`public BigInteger getP()` | Retorna o prime p.
`public BigInteger getQ()` | Retorna o sub-prime q.
`public BigInteger getG()` | Retorna a base g.

A Classe RSAPrivateKeySpec

Esta classe (que implementa a Interface `KeySpec`) especifica uma chave privada RSA. Ela possui os seguintes métodos:

Tabela 3-11 Métodos em RSAPrivateKeySpec

Método em RSAPrivateKeySpec | Descrição
---|---
`public BigInteger getModulus()` | Retorna o modulus.
`public BigInteger getPrivateExponent()` | Retorna o private exponent.

Esses métodos retornam os valores do modulus RSA `n` e do private exponent `d` que constituem a chave privada RSA.

A Classe RSAPrivateCrtKeySpec

Esta classe (que estende a classe `RSAPrivateKeySpec`) especifica uma chave privada RSA, conforme definido no padrão PKCS#1, usando os valores de informação do Teorema do Resto Chinês (CRT). Ela possui os seguintes métodos (além dos métodos herdados de sua superclass `RSAPrivateKeySpec`):

Tabela 3-12 Métodos em RSAPrivateCrtKeySpec

Método em RSAPrivateCrtKeySpec | Descrição
---|---
`public BigInteger getPublicExponent()` | Retorna o public exponent.
`public BigInteger getPrimeP()` | Retorna o prime P.
`public BigInteger getPrimeQ()` | Retorna o prime Q.
`public BigInteger getPrimeExponentP()` | Retorna o primeExponentP.
`public BigInteger getPrimeExponentQ()` | Retorna o primeExponentQ.
`public BigInteger getCrtCoefficient()` | Retorna o crtCoefficient.

Esses métodos retornam o public exponent `e` e os inteiros de informação CRT: o prime factor `p` do modulus `n`, o prime factor `q` de `n`, o exponent `d mod (p-1)`, o exponent `d mod (q-1)`, e o Chinese Remainder Theorem coefficient `(inverso de q) mod p`.

Uma chave privada RSA consiste logicamente apenas no modulus e no private exponent. A presença dos valores CRT é destinada à eficiência.

A Classe RSAPublicKeySpec

Esta classe (que implementa a Interface `KeySpec`) especifica uma chave pública RSA. Ela possui os seguintes métodos:

Tabela 3-13 Métodos em RSAPublicKeySpec

Método em RSAPublicKeySpec | Descrição
---|---
`public BigInteger getModulus()` | Retorna o modulus.
`public BigInteger getPublicExponent()` | Retorna o public exponent.

A Classe EncodedKeySpec

Esta classe abstrata (que implementa a Interface `KeySpec`) representa uma chave pública ou privada em formato encoded.

Tabela 3-14 Métodos em EncodedKeySpec

Método em EncodedKeySpec | Descrição
---|---
`public abstract byte[] getEncoded()` | Retorna a chave encoded.
`public abstract String getFormat()` | Retorna o nome do formato de encoding.

O JDK fornece duas classes que implementam a interface `EncodedKeySpec`: `PKCS8EncodedKeySpec` e `X509EncodedKeySpec`. Se desejar, você pode fornecer suas próprias implementações de `EncodedKeySpec` para esses ou outros tipos de key encodings.

A Classe PKCS8EncodedKeySpec

Esta classe, que é uma subclasse de `EncodedKeySpec`, representa o encoding DER de uma chave privada, de acordo com o formato especificado no padrão PKCS #8.

Seu método `getEncoded` retorna os bytes da chave, encoded de acordo com o padrão PKCS #8. Seu método `getFormat` retorna a string "PKCS#8".

A Classe X509EncodedKeySpec

Esta classe, que é uma subclasse de `EncodedKeySpec`, representa o encoding DER de uma chave pública ou privada, de acordo com o formato especificado no padrão X.509.

Seu método `getEncoded` retorna os bytes da chave, encoded de acordo com o padrão X.509. Seu método `getFormat` retorna a string "X.509".`DHPrivateKeySpec`, `DHPublicKeySpec`, `DESKeySpec`, `DESedeKeySpec`, `PBEKeySpec` e `SecretKeySpec`.

A Classe DHPrivateKeySpec

Esta classe (que implementa a interface `KeySpec`) especifica uma chave privada Diffie-Hellman com seus parâmetros associados.

Tabela 3-15 Métodos em DHPrivateKeySpec

Método em DHPrivateKeySpec | Descrição
---|---
`BigInteger getG()` | Retorna o base generator `g`.
`BigInteger getP()` | Retorna o prime modulus `p`.
`BigInteger getX()` | Retorna o private value `x`.

A Classe DHPublicKeySpec

Tabela 3-16 Métodos em DHPublicKeySpec

Método em DHPublicKeySpec | Descrição
---|---
`BigInteger getG()` | Retorna o base generator `g`.
`BigInteger getP()` | Retorna o prime modulus `p`.
`BigInteger getY()` | Retorna o public value `y`.

A Classe DESKeySpec

Esta classe (que implementa a interface `KeySpec`) especifica uma chave DES.

Tabela 3-17 Métodos em DESKeySpec

Método em DESKeySpec | Descrição
---|---
`byte[] getKey()` | Retorna os bytes da chave DES.
`static boolean isParityAdjusted(byte[] key, int offset)` | Verifica se o key material DES fornecido está parity-adjusted.
`static boolean isWeak(byte[] key, int offset)` | Verifica se o key material DES fornecido é weak ou semi-weak.

A Classe DESedeKeySpec

Esta classe (que implementa a interface `KeySpec`) especifica uma chave DES-EDE (Triple DES).

Tabela 3-18 Métodos em DESedeKeySpec

Método em DESedeKeySpec | Descrição
---|---
`byte[] getKey()` | Retorna a chave DES-EDE.
`static boolean isParityAdjusted(byte[] key, int offset)` | Verifica se a chave DES-EDE fornecida está parity-adjusted.

A Classe PBEKeySpec

Esta classe implementa a interface `KeySpec`. Uma password escolhida pelo usuário pode ser usada com password-based encryption (PBE); a password pode ser vista como um tipo de raw key material. Um mecanismo de encryption que usa esta classe pode derivar uma chave criptográfica do raw key material.

Tabela 3-19 Métodos em PBEKeySpec

Método em PBEKeySpec | Descrição
---|---
`void clearPassword` | Limpa a cópia interna da password.
`int getIterationCount` | Retorna o iteration count ou 0 se não especificado.
`int getKeyLength` | Retorna o key length a ser derivado ou 0 se não especificado.
`char[] getPassword` | Retorna uma cópia da password.
`byte[] getSalt` | Retorna uma cópia do salt ou null se não especificado.

A Classe SecretKeySpec

Esta classe implementa a interface `KeySpec`. Como ela também implementa a interface `SecretKey`, ela pode ser usada para construir um objeto `SecretKey` de forma independente de provider, ou seja, sem ter que passar por uma `SecretKeyFactory` baseada em provider.

Tabela 3-20 Métodos em SecretKeySpec

Método em SecretKeySpec | Descrição
---|---
`boolean equals (Object obj)` | Indica se algum outro objeto é "igual a" este.
`String getAlgorithm()` | Retorna o nome do algoritmo associado a esta secret key.
`byte[] getEncoded()` | Retorna o key material desta secret key.
`String getFormat()` | Retorna o nome do formato de encoding para esta secret key.
`int hashCode()` | Calcula um valor de hash code para o objeto.

#### Geração de Secret-Key

Se você fornecer um secret-key generator (subclasse de `javax.crypto.KeyGeneratorSpi`) para um algoritmo de secret-key específico, você pode retornar o objeto secret-key gerado.

O objeto secret-key gerado (que deve ser uma instância de `javax.crypto.SecretKey`, veja [engineGenerateKey](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/KeyGeneratorSpi.html#engineGenerateKey\(\)>)) pode ser retornado de uma das seguintes maneiras:

*   Você implementa uma classe cujas instâncias representam secret-keys do algoritmo associado ao seu key generator. Sua implementação de key generator retorna instâncias dessa classe. Essa abordagem é útil se as chaves geradas pelo seu key generator tiverem propriedades específicas do provider.
*   Seu key generator retorna uma instância de [`SecretKeySpec`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/crypto/spec/SecretKeySpec.html>), que já implementa a interface `javax.crypto.SecretKey`. Você passa os bytes da chave (raw) e o nome do algoritmo de secret-key associado ao seu key generator para o construtor `SecretKeySpec`. Essa abordagem é útil se os bytes da chave (raw) subjacentes puderem ser representados como um array de bytes e não tiverem key-parameters associados a eles.

#### Adicionando Novos Object Identifiers

As informações a seguir se aplicam a providers que fornecem um algoritmo que não está listado como um dos algoritmos padrão em [Java Security Standard Algorithm Names](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html>).

Mapeamento de OID para Nome

Às vezes, o JCA precisa instanciar uma implementação de algoritmo criptográfico a partir de um algorithm identifier (por exemplo, como encoded em um certificate), que por definição inclui o object identifier (OID) do algoritmo. Por exemplo, para verificar a signature em um certificate X.509, o JCA determina o signature algorithm a partir do signature algorithm identifier que está encoded no certificate, instancia um objeto Signature para esse algoritmo e inicializa o objeto Signature para verificação.

Para que o JCA encontre seu algoritmo, você deve fornecer o object identifier do seu algoritmo como uma entrada de alias para seu algoritmo no provider master file.
```java
        put("Alg.Alias.<engine_type>.1.2.3.4.5.6.7.8",
            "<algorithm_alias_name>");
```

Note que se seu algoritmo for conhecido por mais de um object identifier, você precisa criar uma entrada de alias para cada object identifier pelo qual ele é conhecido.

Um exemplo de onde o JCA precisa realizar este tipo de mapeamento é quando seu algoritmo ("`Foo`") é um signature algorithm e os usuários executam o comando `keytool` e especificam seu alias de algoritmo (de signature).
```
        % keytool -genkeypair -sigalg 1.2.3.4.5.6.7.8 -keyalg foo 
```

Neste caso, seu provider master file deve conter as seguintes entradas:
```java
        put("Signature.Foo", "com.xyz.MyFooSignatureImpl");
        put("Alg.Alias.Signature.1.2.3.4.5.6.7.8", "Foo");
        put("KeyPairGenerator.Foo", "com.xyz.MyFooKeyPairGeneratorImpl");
```

Outros exemplos de onde este tipo de mapeamento é realizado são (1) quando seu algoritmo é um keytype algorithm e seu programa analisa um certificate (usando a implementação X.509 do provider SUN) e extrai a public key do certificate para inicializar um objeto Signature para verificação, e (2) quando usuários do `keytool` tentam acessar uma private key do seu keytype (por exemplo, para realizar uma digital signature) após terem gerado o keypair correspondente. Nesses casos, seu provider master file deve conter as seguintes entradas:
```java
        put("KeyFactory.Foo", "com.xyz.MyFooKeyFactoryImpl");
```
        put("Alg.Alias.KeyFactory.1.2.3.4.5.6.7.8", "Foo");
```

Mapeamento de Nome para OID

Se o JCA precisar realizar o mapeamento inverso (ou seja, do nome do seu algoritmo para o OID associado), você precisa fornecer uma entrada de alias do seguinte formato para um dos OIDs sob os quais seu algoritmo deve ser conhecido:
```
        put("Alg.Alias.Signature.OID.1.2.3.4.5.6.7.8", "MySigAlg");
```

Se o seu algoritmo for conhecido por mais de um identificador de objeto, prefixe o preferido com "OID."

Um exemplo de onde o JCA precisa realizar esse tipo de mapeamento é quando os usuários executam `keytool` em qualquer modo que aceite uma opção `-sigalg`. Por exemplo, quando os comandos `-genkeypair` e `-certreq` são invocados, o usuário pode especificar seu algoritmo (de assinatura) com a opção `-sigalg`.

#### Garantindo a Exportabilidade

Uma característica fundamental do JCA é a exportabilidade do framework JCA e das implementações de criptografia do provedor, se certas condições forem atendidas.

Por padrão, uma aplicação pode usar algoritmos criptográficos de qualquer força. No entanto, devido a regulamentações de importação em alguns países, você pode ter que limitar a força desses algoritmos. Você faz isso com arquivos de política de jurisdição; consulte Configuração de Força Criptográfica. O framework JCA aplicará as restrições especificadas nos arquivos de política de jurisdição instalados.

Como observado em outro lugar, você pode escrever apenas uma versão do seu software de provedor, implementando criptografia de força máxima. Cabe ao JCA, e não ao seu provedor, impor quaisquer restrições impostas por arquivos de política de jurisdição em relação aos algoritmos criptográficos e às forças criptográficas máximas disponíveis para applets/aplicações em diferentes locais.

As condições que devem ser atendidas pelo seu provedor para que ele possa ser conectado ao JCA são as seguintes:

  * O código do provedor deve ser escrito de forma que as classes do provedor se tornem inutilizáveis se instanciadas diretamente por uma aplicação, ignorando o JCA. Consulte Etapa 1: Escreva o Código de Implementação do Seu Serviço de um Cipher, KDF, KEM, KeyAgreement, KeyGenerator, MAC ou SecretKeyFactory de um provedor, o framework determinará a base de código do provedor \(arquivo JAR\) e verificará sua assinatura. Dessa forma, o JCA autentica o provedor e garante que apenas provedores assinados por uma entidade confiável possam ser conectados ao JCA. Assim, um requisito para provedores de criptografia é que eles devem ser assinados, conforme descrito nas etapas posteriores.") em Etapas para Implementar e Integrar um Provedor.
  * O pacote do provedor deve ser assinado por uma entidade confiável pelo framework JCA. (Consulte Etapa 7.1: Obtenha um Certificado de Assinatura de Código até Etapa 7.2: Assine Seu Provedor.) Fornecedores dos EUA cujos provedores podem ser exportados para fora dos EUA precisam primeiro solicitar a aprovação de exportação do governo dos EUA. (Consulte Etapa 11: Solicite Aprovação de Exportação do Governo dos EUA, se Necessário.)

### Código de Exemplo para MyProvider

A seguir está o código-fonte completo para um provedor de exemplo, MyProvider. É um provedor portátil; você pode especificá-lo em um classpath ou module path. Ele consiste em dois módulos:

  * `com.example.MyProvider`: Contém um provedor de exemplo que demonstra como escrever um provedor com o mecanismo Provider.Service. Você deve compilar, empacotar e assinar o provedor, e então especificá-lo em seu classpath ou module path conforme descrito em Etapas para Implementar e Integrar um Provedor.

  * `com.example.MyApp`: Contém uma aplicação de exemplo que usa o provedor MyProvider. Ela encontra e carrega este provedor com o mecanismo ServiceLoader, e então o registra dinamicamente com o método Security.addProvider().

Este exemplo consiste nos seguintes arquivos:

  * `src/com.example.MyProvider/module-info.java`
  * `src/com.example.MyProvider/com/example/MyProvider/MyProvider.java`
  * `src/com.example.MyProvider/com/example/MyProvider/MyCipher.java`
  * `src/com.example.MyProvider/META-INF/services/java.security.Provider`
  * `src/com.example.MyApp/module-info.java`
  * `src/com.example.MyApp/com/example/MyApp/MyApp.java`
  * `RunTest.sh`

src/com.example.MyProvider/module-info.java

Consulte Etapa 4: Crie uma Declaração de Módulo para Seu Provedor para obter informações sobre a declaração do módulo, que é especificada em module-info.java.
```
    module com.example.MyProvider {
        provides java.security.Provider with com.example.MyProvider.MyProvider;
    }
```

src/com.example.MyProvider/com/example/MyProvider/MyProvider.java

A classe MyProvider é um exemplo de provedor que usa a classe Provider.Service. Consulte Etapa 3.2: Crie um Provedor Que Use Provider.Service.
```
    package com.example.MyProvider;
    
    import java.security.*;
    import java.util.*;
    
    /**
     * Test JCE provider.
     *
     * Registers services using Provider.Service and overrides newInstance().
     */
    public final class MyProvider extends Provider {
    
        public MyProvider() {
            super("MyProvider", "1.0", "My JCE provider");
    
            final Provider p = this;
            
            putService(
                new ProviderService(
                    p, "Cipher", "MyCipher", "com.example.MyProvider.MyCipher"));
        }
    
        private static final class ProviderService extends Provider.Service {
    
            ProviderService(Provider p, String type, String algo, String cn) {
                super(p, type, algo, cn, null, null);
            }
    
            ProviderService(Provider p, String type, String algo, String cn,
                    String[] aliases, HashMap<String, String> attrs) {
                super(p, type, algo, cn,
                        (aliases == null ? null : Arrays.asList(aliases)), attrs);
            }
    
            @Override
            public Object newInstance(Object ctrParamObj)
                    throws NoSuchAlgorithmException {
    
                String type = getType();
                if (ctrParamObj != null) {
                    throw new InvalidParameterException(
                            "constructorParameter not used with " + type
                            + " engines");
                }
                String algo = getAlgorithm();
                try {
                    if (type.equals("Cipher")) {
                        if (algo.equals("MyCipher")) {
                            return new MyCipher();
                        }
                    }
                } catch (Exception ex) {
                    throw new NoSuchAlgorithmException(
                            "Error constructing " + type + " for "
                            + algo + " using SunMSCAPI", ex);
                }
                throw new ProviderException("No impl for " + algo
                        + " " + type);
            }
        }
    
        @Override
        public String toString() {
            return "MyProvider [getName()=" + getName()
                    + ", getVersionStr()=" + getVersionStr() + ", getInfo()="
                    + getInfo() + "]";
        }
    }
```

src/com.example.MyProvider/com/example/MyProvider/MyCipher.java

A classe MyCipher estende a CipherSPI, que é uma Server Provider Interface (SPI). Cada serviço criptográfico que um provedor implementa possui uma subclasse da SPI apropriada. Consulte Etapa 1: Escreva o Código de Implementação do Seu Serviço de um Cipher, KDF, KEM, KeyAgreement, KeyGenerator, MAC ou SecretKeyFactory de um provedor, o framework determinará a base de código do provedor \(arquivo JAR\) e verificará sua assinatura. Dessa forma, o JCA autentica o provedor e garante que apenas provedores assinados por uma entidade confiável possam ser conectados ao JCA. Assim, um requisito para provedores de criptografia é que eles devem ser assinados, conforme descrito nas etapas posteriores.").

Nota:

Este código é apenas um provedor stub que demonstra como escrever um provedor; ele está faltando a implementação real do algoritmo criptográfico. A classe `MyCipher` conteria uma implementação real do algoritmo criptográfico se MyProvider fosse um provedor de segurança real.
```
    package com.example.MyProvider;
    
    import java.security.*;
    import java.security.spec.*;
    import javax.crypto.*;
    
    /**
     * Implementation represents a test Cipher.
     *
     * All are stubs.
     */
    public class MyCipher extends CipherSpi {
    
        @Override
        protected byte[] engineDoFinal(byte[] input, int inputOffset, int inputLen)
                throws IllegalBlockSizeException, BadPaddingException {
            return null;
        }
    
        @Override
        protected int engineDoFinal(byte[] input, int inputOffset, int inputLen,
                byte[] output, int outputOffset) throws ShortBufferException,
                IllegalBlockSizeException, BadPaddingException {
            return 0;
        }
    
        @Override
        protected int engineGetBlockSize() {
            return 0;
        }
    
        @Override
        protected byte[] engineGetIV() {
            return null;
        }
    
        @Override
        protected int engineGetOutputSize(int inputLen) {
            return 0;
        }
    
        @Override
        protected AlgorithmParameters engineGetParameters() {
            return null;
        }
    
        @Override
        protected void engineInit(int opmode, Key key, SecureRandom random)
                throws InvalidKeyException {
        }
    
        @Override
        protected void engineInit(int opmode, Key key,
                AlgorithmParameterSpec params, SecureRandom random)
                throws InvalidKeyException, InvalidAlgorithmParameterException {
        }
    
        @Override
        protected void engineInit(int opmode, Key key, AlgorithmParameters params,
                SecureRandom random) throws InvalidKeyException,
                InvalidAlgorithmParameterException {
        }
    
        @Override
        protected void engineSetMode(String mode) throws NoSuchAlgorithmException {
        }
    
        @Override
        protected void engineSetPadding(String padding)
                throws NoSuchPaddingException {
        }
    
        @Override
        protected int engineGetKeySize(Key key)
                throws InvalidKeyException {
            return 0;
        }
    
        @Override
        protected byte[] engineUpdate(byte[] input, int inputOffset, int inputLen) {
            return null;
        }
    
        @Override
        protected int engineUpdate(byte[] input, int inputOffset, int inputLen,
                byte[] output, int outputOffset) throws ShortBufferException {
            return 0;
        }
    }
```

src/com.example.MyProvider/META-INF/services/java.security.Provider

O arquivo `java.security.Provider` permite que módulos automáticos ou não nomeados usem a classe ServiceLoader para procurar seus provedores. Consulte Etapa 6: Coloque Seu Provedor em um Arquivo JAR.
```
    com.example.MyProvider.MyProvider
```

src/com.example.MyApp/module-info.java

Este arquivo contém uma diretiva `uses`, que especifica um serviço que o módulo requer. Esta diretiva ajuda o sistema de módulos a localizar provedores e garantir que eles funcionem de forma confiável. Este é o complemento da diretiva `provides` na definição do módulo `MyProvider`.
```
    module com.example.MyApp {
        uses java.security.Provider;
    }
```

src/com.example.MyApp/com/example/MyApp/MyApp.java
```
    package com.example.MyApp;
    
    import java.util.*;
    import java.security.*;
    import javax.crypto.*;
    
    /**
     * A simple JCE test client to access a simple test Provider/Cipher
     * implementation in a signed modular jar.
     */
    public class MyApp {
    
        private static final String PROVIDER = "MyProvider";
        private static final String CIPHER = "MyCipher";
    
        public static void main(String[] args) throws Exception {
    
            /*
             * Registers MyProvider dynamically.
             *
             * Could do statically by editing the java.security file.
             * Use the first form if using ServiceLoader ("uses" or
             * META-INF/service), the second if using the traditional class
             * lookup method.  Both if provider could be deployed to either.
             *
             * security.provider.14=MyProvider
             * security.provider.15=com.example.MyProvider.MyProvider
             */
            ServiceLoader<Provider> sl =
                ServiceLoader.load(java.security.Provider.class);
            for (Provider p : sl) {
                if (p.getName().equals(PROVIDER)) {
                    System.out.println("Registering the Provider");
                    Security.addProvider(p);
                }
            }
    
            /*
             * Get a MyCipher from MyProvider and initialize it.
             */
            Cipher cipher = Cipher.getInstance(CIPHER, PROVIDER);
            cipher.init(Cipher.ENCRYPT_MODE, (Key) null);
    
            /*
             * What Provider did we get?
             */
            Provider p = cipher.getProvider();
            Class c = p.getClass();
            Module m = c.getModule();
            System.out.println(p.getName() + ": version "
                + p.getVersionStr() + "\n"
                + p.getInfo() + "\n    "
                + ((m.getName() == null) ? "<UNNAMED>" : m.getName())
                + "/" + c.getName());
        }
    }
```

RunTest.sh
```
    #!/bin/sh
    
    #
    # A simple example to show how a JCE provider could be developed in a
    # modular JDK, for deployment as either Named/Unnamed modules.
    #
    
    #
    # Edit as appropriate
    #
    JDK_DIR=d:/java/jdk9
    KEYSTORE=YourKeyStore
    STOREPASS=YourStorePass
    SIGNER=YourAlias
    
    echo "-----------"
    echo "Clean/Init"
    echo "-----------"
    rm -rf mods jars
    mkdir mods jars
    
    echo "--------------------"
    echo "Compiling MyProvider"
    echo "--------------------"
    ${JDK_DIR}/bin/javac.exe \
        --module-source-path src \
        -d mods \
        $(find src/com.example.MyProvider -name '*.java' -print)
    
    echo "------------------------------------"
    echo "Packaging com.example.MyProvider.jar"
    echo "------------------------------------"
    ${JDK_DIR}/bin/jar.exe --create \
        --file jars/com.example.MyProvider.jar \
        --verbose \
        --module-version=1.0 \
        -C mods/com.example.MyProvider . \
        -C src/com.example.MyProvider META-INF/services
    
    echo "----------------------------------"
    echo "Signing com.example.MyProvider.jar"
    echo "----------------------------------"
    ${JDK_DIR}/bin/jarsigner.exe \
        -keystore ${KEYSTORE} \
        -storepass ${STOREPASS} \
        jars/com.example.MyProvider.jar ${SIGNER}
    
    echo "---------------"
    echo "Compiling MyApp"
    echo "---------------"
    ${JDK_DIR}/bin/javac.exe \
        --module-source-path src \
        -d mods \
        $(find src/com.example.MyApp -name '*.java' -print)
    
    echo "-------------------------------"
    echo "Packaging com.example.MyApp.jar"
    echo "-------------------------------"
    ${JDK_DIR}/bin/jar.exe --create \
        --file jars/com.example.MyApp.jar \
        --verbose \
        --module-version=1.0 \
        -C mods/com.example.MyApp .
    
    echo "------------------------"
    echo "Test1                   "
    echo "Named Provider/Named App"
    echo "------------------------"
    ${JDK_DIR}/bin/java.exe \
        --module-path 'jars' \
        -m com.example.MyApp/com.example.MyApp.MyApp
    
    echo "--------------------------"
    echo "Test2                     "
    echo "Named Provider/Unnamed App"
    echo "--------------------------"
    ${JDK_DIR}/bin/java.exe \
        --module-path 'jars/com.example.MyProvider.jar' \
        --class-path 'jars/com.example.MyApp.jar' \
        com.example.MyApp.MyApp
    
    echo "--------------------------"
    echo "Test3                     "
    echo "Unnamed Provider/Named App"
    echo "--------------------------"
    ${JDK_DIR}/bin/java.exe \
        --module-path 'jars/com.example.MyApp.jar' \
        --class-path 'jars/com.example.MyProvider.jar' \
        -m com.example.MyApp/com.example.MyApp.MyApp
    
    echo "----------------------------"
    echo "Test4                       "
    echo "Unnamed Provider/Unnamed App"
    echo "----------------------------"
    ${JDK_DIR}/bin/java.exe \
        --class-path \
            'jars/com.example.MyProvider.jar;jars/com.example.MyApp.jar' \
        com.example.MyApp.MyApp