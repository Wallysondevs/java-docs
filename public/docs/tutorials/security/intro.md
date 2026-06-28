# Introdução à Criptografia/Descriptografia em Java

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos de Segurança usando Bibliotecas JDK ](<#/doc/tutorials/security>) > Introdução à Criptografia/Descriptografia em Java

**Tutorial Atual**

Introdução à Criptografia/Descriptografia em Java

➜

**Próximo na Série**

[Fundamentos de Assinaturas Digitais e Certificados em Java](<#/doc/tutorials/security/digital-signature>)

**Próximo na Série:** [Fundamentos de Assinaturas Digitais e Certificados em Java](<#/doc/tutorials/security/digital-signature>)

# Introdução à Criptografia/Descriptografia em Java

## Introdução à Criptografia

Criptografia é **um método de proteção de dados e comunicações usando códigos e chaves digitais** para garantir que a informação seja entregue intacta ao remetente pretendido para processamento posterior.

Compreender as ideias centrais da criptografia, como criptografia e descriptografia, é fundamental para um desenvolvedor, pois você pode se encontrar trabalhando em funcionalidades relacionadas a:

  * **Assinaturas Digitais** : Uma assinatura digital é um meio criptográfico através do qual se pode verificar a origem de um documento, a identidade do remetente, a hora e a data em que um documento foi assinado ou enviado, etc. Assinaturas digitais funcionam como um selo de autenticação criptografado na informação.
  * **Transações Eletrônicas** : O uso de criptografia em sistemas de dinheiro eletrônico pode proteger dados de transações convencionais, como detalhes de conta e valores de transação. Assinaturas digitais podem substituir assinaturas manuscritas ou autorizações de cartão de crédito, e a criptografia de chave pública pode fornecer confidencialidade.
  * **Criptografia/Descriptografia** em sistemas de e-mail.
  * **Carimbo de Tempo** para certificar que um documento eletrônico específico existiu ou foi entregue em um determinado momento. Contratos de manuseio eletrônico ou arquivos com informações altamente sensíveis são exemplos válidos do mundo real.

Como a criptografia opera com dados, estes podem estar em **texto simples** (_cleartext_) ou **texto cifrado** (_cryptogram_). Dados em texto simples significam que a mensagem está em formato natural, legível para um atacante. Dados em texto cifrado significam que a mensagem está em um formato ilegível para o atacante, mas legível para o destinatário pretendido.

Você pode converter a mensagem de texto simples para texto cifrado usando o processo de **criptografia**. Da mesma forma, você pode converter texto cifrado em texto simples via **descriptografia** usando um algoritmo criptográfico e uma chave usados para criar a mensagem original. Geralmente, os processos de criptografia ou descriptografia são baseados em algoritmos publicamente disponíveis, mas o controle dos dados é obtido usando uma **chave** segura.

Você pode usar uma função de **hash** para mapear um conjunto de bytes de tamanho arbitrário em um conjunto de bytes de tamanho finito e relativamente único. Uma função de hash criptográfica bem projetada deve usar **salt**, uma string de bits aleatórios (ou pseudoaleatórios) concatenada com uma chave ou senha. Você pode aumentar a segurança introduzindo uma variância criptográfica adicional usando um **vetor de inicialização (IV)** para a criptografia de uma sequência de BLOCOS de texto simples.

> **_NOTA:_** Os trechos de código apresentados neste artigo têm como objetivo ilustrar como as APIs Java funcionam em um nível alto. No interesse da clareza, eles são às vezes simplificados. A segurança pode ser um tópico complexo e sempre único para suas necessidades específicas, então você deve sempre consultar seus especialistas em segurança sobre seus requisitos específicos.

## Padrões de Criptografia Disponíveis no JDK

A criptografia Java é baseada em padrões que são [padrões internacionais](<https://docs.oracle.com/en/java/javase/26/docs/specs/security/standard-names.html>) bem definidos que permitem que várias plataformas operem. Entre esses padrões estão:

  * TLS (Transport Layer Security) v1.2, v1.3 – [RFC 5246](<https://www.ietf.org/rfc/rfc5246.html>), [RFC 8446](<https://www.ietf.org/rfc/rfc8446.html>)
  * RSA Cryptography Specifications PKCS #1 – [RFC 8017](<https://www.ietf.org/rfc/rfc8017.html>)
  * Cryptographic Token Interface Standard (PKCS#11)
  * Os algoritmos de assinatura ECDSA conforme definidos em [ANSI X9.62](<https://standards.globalspec.com/std/1955141/ANSI%20X9.62>), etc.

O cenário de segurança evolui continuamente, por exemplo, algoritmos mais fortes são introduzidos enquanto os mais antigos são considerados menos seguros. O Oracle JDK é atualizado regularmente para lidar com essas mudanças e manter a plataforma Java segura. O [Roteiro Criptográfico do Oracle JDK](<https://www.java.com/en/jre-jdk-cryptoroadmap.html>) reflete as últimas e futuras mudanças aplicadas aos provedores de segurança fornecidos pela Oracle no Oracle JDK.

A [Java Cryptography Architecture (JCA)](<https://docs.oracle.com/en/java/javase/26/security/java-cryptography-architecture-jca-reference-guide.html>) é a estrutura para trabalhar com criptografia usando a linguagem de programação Java e faz parte da Java Security API. Seus objetivos são oferecer independência e extensibilidade de algoritmos criptográficos, interoperabilidade e uma implementação agnóstica de provedores de segurança.

A JCA engloba classes de motor que interagem com um tipo específico de serviço criptográfico via:

  * operações criptográficas como criptografia, assinaturas digitais, resumos de mensagens (message digests), etc.
  * chaves e parâmetros de algoritmo
  * keystores ou certificados que encapsulam os dados criptográficos e podem ser usados em camadas de abstração mais altas.

O JDK contém as implementações criptográficas reais para uma série de provedores, como `Sun`, `SunRSASign`, `SunJCE`, etc. Para usar a JCA, um aplicativo solicita um tipo particular de objeto (como um [MessageDigest](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/security/MessageDigest.html>)) e um algoritmo ou serviço particular (como o algoritmo `SHA-256`) e obtém uma implementação de um dos provedores instalados. Ou você pode solicitar os objetos de um provedor específico (como `ProviderC` da imagem abaixo).

[](<https://dev.java/assets/images/security/java_security_overview.png>)

_Figura 1: Solicitar objetos para ProviderC`provider.MessageDigest.getInstance("SHA-256", "ProviderC")`_

Fonte: [Visão Geral de Segurança Java](<https://docs.oracle.com/en/java/javase/26/security/java-security-overview1.html>)

Se você deseja obter a lista de provedores instalados, basta chamar [`java.security.Security.getProviders()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/security/Security.html#getProviders\(\)>). Você pode copiar o trecho de código abaixo no [JShell](<#/doc/tutorials/jshell-tool>) para imprimir a lista de algoritmos criptográficos disponíveis para cada provedor encontrado no JDK:

```java
for (java.security.Provider provider : java.security.Security.getProviders()) {
    System.out.println(provider.getName());
    for (java.security.Provider.Service service : provider.getServices()) {
        System.out.println("\t" + service.getType() + ": " + service.getAlgorithm());
    }
}
```

Alguns exemplos populares de provedores incluem: `SunPKCS11`, `SunMSCAPI (Windows)`, `BouncyCastle`, `RSA JSAFE`, `SafeNet`. Se o provedor que você gostaria de usar não estiver entre os listados, você também pode registrá-lo seguindo os passos abaixo:

  1. Coloque as classes do provedor no `CLASSPATH`.
  2. Registre o provedor de uma das seguintes formas:
     * Estaticamente, modificando o arquivo de configuração _conf/security/java.security_, por exemplo, `security.provider.5=SunJCEII`. Esteja ciente de que no JDK 8 o arquivo `java.security` está em _java.home/lib/security/java.security_.
     * Dinamicamente, invocando [`Security.addProvider(java.security.Provider)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/security/Security.html#addProvider\(java.security.Provider\)>) e [`Security.insertProviderAt(java.security.Provider,int)`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/security/Security.html#insertProviderAt\(java.security.Provider,int\)>).
  3. A ordem de preferência para um provedor é declarada por meio de uma simples ordenação numérica.

Agora, vamos inspecionar mais detalhadamente como usar criptografia/descriptografia em Java.

## Criptografia/Descriptografia Básica em Java

Ao trabalhar com criptografia de dados, você pode usar este mecanismo de controle de segurança para proteger três tipos de estados de dados:

  * **Dados em repouso** são informações que não estão se movendo ativamente entre dispositivos ou redes, armazenadas em um banco de dados ou mantidas em um disco.
  * **Dados em trânsito** representam informações viajando de um ponto da rede para outro.
  * **Dados em uso** referem-se a informações carregadas na memória, ativamente acessadas e processadas por usuários.

A criptografia é importante para todos os três estados de dados para oferecer uma camada extra de proteção contra ataques. Existem dois métodos de criptografia: criptografia simétrica e assimétrica.

### Implementando Criptografia/Descriptografia Simétrica Básica

A criptografia simétrica ou de chave compartilhada é um método onde ambas as partes compartilham uma chave, mantida em segredo por ambas as partes. Por exemplo, o remetente `A` pode criptografar uma mensagem com uma chave compartilhada, então o receptor `B` pode descriptografar a mensagem criptografada apenas com essa chave.

[](<https://dev.java/assets/images/security/symmetric_encryption.png>) _Figura 2: Criptografia simétrica_

Para implementar a criptografia simétrica com Java, você primeiro precisa gerar uma chave compartilhada. Você pode fazer isso usando o seguinte trecho:

```java
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;

public class SymmetricEncryption {

    public SecretKey generateSecretKey() throws NoSuchAlgorithmException {
        KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
        keyGenerator.init(128); // 128-bit key size
        return keyGenerator.generateKey();
    }
}
```

No exemplo anterior, você começa instanciando um gerador de chave secreta que usa o algoritmo `AES`. Em seguida, você inicializa o gerador de chave secreta para um tamanho de chave de 128 bits e exigindo bytes aleatórios. A partir do JDK 19, o tamanho padrão para o algoritmo `AES` foi aumentado de 128 bits para 256 bits (se permitido pela política criptográfica), caso contrário, o padrão retorna para 128 bits. E finalmente gera uma chave secreta.

Para aprimorar o mecanismo de criptografia/descriptografia, você pode inicializar um vetor (IV) com um valor arbitrário:

```java
import javax.crypto.spec.IvParameterSpec;
import java.security.SecureRandom;

public class SymmetricEncryption {

    public IvParameterSpec generateIv() {
        byte[] iv = new byte[16];
        new SecureRandom().nextBytes(iv);
        return new IvParameterSpec(iv);
    }
}
```

Como a criptografia simétrica transforma um bloco de dados de texto simples de comprimento fixo em um bloco de texto cifrado, ela pode usar vários modos em Block cipher:

  * `ECB (Electronic Code Book Mode)`
  * `CBC (Cipher Block Chain Mode)`
  * `CCM (Counter/CBC Mode)`
  * `CFB (Cipher Feedback Mode)`
  * `OFB/OFBx (Output Feedback)`
  * `CTR (Counter mode)`
  * `GCM (Galois/Counter Mode)`
  * `KW (Key Wrap Mode)`
  * `KWP (Key Wrap Padding Mode)`
  * `PCBC (Propagating Cipher Block Chaining)`

Você pode verificar todos os modos e transformações suportadas na [Seção Cipher](<https://docs.oracle.com/en/java/javase/26/docs/specs/security/standard-names.html#cipher-algorithms>) da `Java Security Standard Algorithm Names Specification`. Em seguida, você precisa especificar o Block cipher no método de criptografia, ao obter uma instância da classe `Cipher`:

```java
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.NoSuchAlgorithmException;

public class SymmetricEncryption {

    public byte[] encrypt(String algorithm, String input, SecretKey key,
                          IvParameterSpec iv) throws NoSuchPaddingException, NoSuchAlgorithmException,
            InvalidAlgorithmParameterException, InvalidKeyException,
            BadPaddingException, IllegalBlockSizeException {
        Cipher cipher = Cipher.getInstance(algorithm);
        cipher.init(Cipher.ENCRYPT_MODE, key, iv);
        return cipher.doFinal(input.getBytes());
    }
}
```

Para converter o texto cifrado de volta ao texto simples original, você deve usar o mesmo Block cipher, chave e IV:

```java
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.NoSuchAlgorithmException;

public class SymmetricEncryption {

    public String decrypt(String algorithm, byte[] cipherText, SecretKey key,
                          IvParameterSpec iv) throws NoSuchPaddingException, NoSuchAlgorithmException,
            InvalidAlgorithmParameterException, InvalidKeyException,
            BadPaddingException, IllegalBlockSizeException {
        Cipher cipher = Cipher.getInstance(algorithm);
        cipher.init(Cipher.DECRYPT_MODE, key, iv);
        return new String(cipher.doFinal(cipherText));
    }
}
```

O método [`doFinal()`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/javax/crypto/Cipher.html#doFinal\(\)>) invocado no cipher criptografa ou descriptografa dados em uma operação de parte única, ou finaliza uma operação de múltiplas partes e retorna um array de bytes. Então, vamos juntar esses métodos para criptografar e descriptografar uma mensagem:

```java
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class SymmetricEncryptionExample {

    public static void main(String[] args) throws Exception {
        SymmetricEncryption symmetricEncryption = new SymmetricEncryption();

        SecretKey key = symmetricEncryption.generateSecretKey();
        IvParameterSpec iv = symmetricEncryption.generateIv();

        String algorithm = "AES/CBC/PKCS5Padding";
        String plainText = "This is a secret message!";

        byte[] cipherText = symmetricEncryption.encrypt(algorithm, plainText, key, iv);
        String decryptedText = symmetricEncryption.decrypt(algorithm, cipherText, key, iv);

        System.out.println("Original Text: " + plainText);
        System.out.println("Encrypted Text: " + Base64.getEncoder().encodeToString(cipherText));
        System.out.println("Decrypted Text: " + decryptedText);
    }
}
```

A criptografia simétrica é uma opção válida se você precisa de um método de criptografia computacionalmente barato, pois requer a criação de uma única chave curta (40-512 bits) disponível tanto para o remetente quanto para o receptor. Se você está procurando uma opção que usa chaves diferentes e mais longas para criptografia e descriptografia, então continue lendo sobre criptografia e descriptografia assimétricas.

### Implementando Criptografia/Descriptografia Assimétrica Básica

A criptografia assimétrica usa um par de chaves matematicamente relacionadas, uma para criptografia e outra para descriptografia. No exemplo abaixo, `Key1` é usada para criptografia e `Key2` é usada para descriptografia.

[](<https://dev.java/assets/images/security/asymmetric_encryption.png>) _Figura 3: Criptografia assimétrica_

Em tal sistema, `A` pode criptografar uma mensagem usando a chave pública de `B`, mas apenas a chave privada de `B` pode decodificar a mensagem. Em um par de chaves, a chave pública é visível para todos. A chave privada é a chave secreta e é usada principalmente para descriptografia ou para criptografia com assinaturas digitais.

Para implementar a criptografia assimétrica em Java, você primeiro precisa gerar um par de chaves (pública, privada) obtendo uma instância de [`KeyPairGenerator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/security/KeyPairGenerator.html>) (para o algoritmo RSA neste caso). Dado o algoritmo selecionado, o objeto [`KeyPairGenerator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/security/KeyPairGenerator.html>) usa um tamanho de chave de 3072 bits e um número aleatório inicializado via a classe [`SecureRandom`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/security/KeyPairGenerator.html>):

```java
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class AsymmetricEncryption {

    public KeyPair generateKeyPair() throws NoSuchAlgorithmException {
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
        keyPairGenerator.initialize(3072, new SecureRandom());
        return keyPairGenerator.generateKeyPair();
    }
}
```

Se você estiver usando o JDK 19 ou posterior, deve estar ciente de que os algoritmos `RSA`, `RSASSA-PSS` e `DH` tiveram seu tamanho de chave padrão aumentado de 2048 bits para 3072 bits. Em seguida, vamos implementar o método de criptografia que converte o texto simples em texto cifrado usando uma chave pública:

```java
import javax.crypto.Cipher;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

public class AsymmetricEncryption {

    public byte[] encrypt(String plainText, PublicKey publicKey) throws NoSuchAlgorithmException,
            NoSuchPaddingException, InvalidKeyException,
            IllegalBlockSizeException, BadPaddingException {
        Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        return cipher.doFinal(plainText.getBytes());
    }
}
```

Para converter o texto cifrado de volta ao texto simples original, você pode usar a chave privada:

```java
import javax.crypto.Cipher;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

public class AsymmetricEncryption {

    public String decrypt(byte[] cipherText, PrivateKey privateKey) throws NoSuchAlgorithmException,
            NoSuchPaddingException, InvalidKeyException,
            IllegalBlockSizeException, BadPaddingException {
        Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        return new String(cipher.doFinal(cipherText));
    }
}
```

Usando os métodos anteriores, você pode escrever um pequeno programa para simular como a criptografia e descriptografia assimétricas funcionam:

```java
import java.security.KeyPair;
import java.util.Base64;

public class AsymmetricEncryptionExample {

    public static void main(String[] args) throws Exception {
        AsymmetricEncryption asymmetricEncryption = new AsymmetricEncryption();

        KeyPair keyPair = asymmetricEncryption.generateKeyPair();
        String plainText = "This is a secret message!";

        byte[] cipherText = asymmetricEncryption.encrypt(plainText, keyPair.getPublic());
        String decryptedText = asymmetricEncryption.decrypt(cipherText, keyPair.getPrivate());

        System.out.println("Original Text: " + plainText);
        System.out.println("Encrypted Text: " + Base64.getEncoder().encodeToString(cipherText));
        System.out.println("Decrypted Text: " + decryptedText);
    }
}
```

Você pode garantir tanto o remetente quanto a integridade da mensagem transmitida por um canal inseguro, fazendo o hash da mensagem usando [`MessageDigest`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/security/MessageDigest.html>). Para implementar isso, você deve criar o resumo (digest) da mensagem e criptografá-lo com a chave privada:

```java
import java.security.MessageDigest;
import java.security.PrivateKey;
import java.security.Signature;
import java.util.Base64;

public class DigitalSignature {

    public byte[] createDigitalSignature(String plainText, PrivateKey privateKey) throws Exception {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] messageHash = md.digest(plainText.getBytes());

        Signature signature = Signature.getInstance("SHA256withRSA");
        signature.initSign(privateKey);
        signature.update(messageHash);
        return signature.sign();
    }
}
```

Este resumo é chamado de assinatura digital que pode ser descriptografado apenas pelo receptor que possui a chave pública do remetente. Para validar a autenticidade da mensagem e do remetente, você deve usar a chave pública:

```java
import java.security.MessageDigest;
import java.security.PublicKey;
import java.security.Signature;

public class DigitalSignature {

    public boolean verifyDigitalSignature(String plainText, byte[] digitalSignature, PublicKey publicKey) throws Exception {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] messageHash = md.digest(plainText.getBytes());

        Signature signature = Signature.getInstance("SHA256withRSA");
        signature.initVerify(publicKey);
        signature.update(messageHash);
        return signature.verify(digitalSignature);
    }
}
```

Abaixo você pode encontrar uma chamada de exemplo que faria uso dos métodos acima:

```java
import java.security.KeyPair;

public class DigitalSignatureExample {

    public static void main(String[] args) throws Exception {
        AsymmetricEncryption asymmetricEncryption = new AsymmetricEncryption();
        DigitalSignature digitalSignature = new DigitalSignature();

        KeyPair keyPair = asymmetricEncryption.generateKeyPair();
        String plainText = "This is a secret message!";

        byte[] signature = digitalSignature.createDigitalSignature(plainText, keyPair.getPrivate());
        boolean isValid = digitalSignature.verifyDigitalSignature(plainText, signature, keyPair.getPublic());

        System.out.println("Message: " + plainText);
        System.out.println("Signature valid: " + isValid);
    }
}
```

Parabéns, você aprendeu como a JCA suporta o trabalho com criptografia em Java e como você pode implementar mecanismos básicos de criptografia e descriptografia usando a Java Security API.

## Links Úteis:

  * [Oracle JDK Cryptographic Roadmap](<https://www.java.com/en/jre-jdk-cryptoroadmap.html>)
  * [Java Security Standard Algorithm Names Specification](<https://docs.oracle.com/en/java/javase/26/docs/specs/security/standard-names.html>)
  * [RFC5246](<https://www.ietf.org/rfc/rfc5246.html>)
  * [RFC8446](<https://www.ietf.org/rfc/rfc8446.html>)
  * [RFC8017](<https://www.ietf.org/rfc/rfc8017.html>)

## Mais Aprendizado

Neste tutorial

Introdução à Criptografia
Padrões de Criptografia no JDK
Criptografia/Descriptografia Básica em Java
Links Úteis
Mais Aprendizado

Última atualização: 10 de fevereiro de 2023

**Tutorial Atual**

Introdução à Criptografia/Descriptografia em Java

➜

**Próximo na Série**

[Fundamentos de Assinaturas Digitais e Certificados em Java](<#/doc/tutorials/security/digital-signature>)

**Próximo na Série:** [Fundamentos de Assinaturas Digitais e Certificados em Java](<#/doc/tutorials/security/digital-signature>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos de Segurança usando Bibliotecas JDK ](<#/doc/tutorials/security>) > Introdução à Criptografia/Descriptografia em Java