# Fundamentos de Assinaturas Digitais e Certificados em Java

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos de Segurança usando Bibliotecas JDK ](<#/doc/tutorials/security>) > Fundamentos de Assinaturas Digitais e Certificados em Java

**Anterior na Série**

[Introdução à Criptografia/Descriptografia Java](<#/doc/tutorials/security/intro>)

➜

**Tutorial Atual**

Fundamentos de Assinaturas Digitais e Certificados em Java

➜

**Próximo na Série**

[Monitorando a Segurança de Aplicações Java com ferramentas JDK e Eventos JFR](<#/doc/tutorials/security/monitor>)

**Anterior na Série:** [Introdução à Criptografia/Descriptografia Java](<#/doc/tutorials/security/intro>)

**Próximo na Série:** [Monitorando a Segurança de Aplicações Java com ferramentas JDK e Eventos JFR](<#/doc/tutorials/security/monitor>)

# Fundamentos de Assinaturas Digitais e Certificados em Java

Ter acesso online a quase tudo e poder interagir uns com os outros faz parte da nossa rotina diária. No entanto, viver no mundo online significa que você precisa questionar a legitimidade dos dados: cada e-mail é confiável? Ao fazer login no seu site favorito, como você sabe que ele é confiável? A atualização de software que você deseja instalar é autêntica, ou é um vírus disfarçado esperando para infectar seu dispositivo?

Neste artigo, veremos mais de perto como você pode verificar assinaturas digitais e inspecionar certificados em seu código Java.

## Implementando Assinaturas Digitais com Java

Você deve usar assinaturas digitais se precisar de um mecanismo para validar:

  * Autenticidade: a identidade do autor da mensagem é precisa.
  * Integridade: a mensagem não foi alterada durante a transmissão.
  * Não-repúdio: a mensagem transferida foi enviada e recebida pelas partes que afirmam tê-la enviado e aceitado.

Para enviar uma mensagem usando uma assinatura digital, você primeiro precisa gerar um par de chaves assimétricas usando um algoritmo, por exemplo `Ed25519`:

```java
public static KeyPair generateKeyPair() throws NoSuchAlgorithmException {
    KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("Ed25519");
    return keyPairGenerator.generateKeyPair();
}
```

Em seguida, você deve alimentar a mensagem no objeto de assinatura e chamar o método `sign`:

```java
public static byte[] generateDigitalSignature(String message, PrivateKey privateKey)
        throws NoSuchAlgorithmException, InvalidKeyException, SignatureException {
    Signature signature = Signature.getInstance("Ed25519");
    signature.initSign(privateKey);
    signature.update(message.getBytes());
    return signature.sign();
}
```

No método `generateDigitalSignature`, você obtém uma instância do objeto `Signature` passando o algoritmo de assinatura `Ed25519`, um algoritmo de assinatura de curva elíptica usando `EdDSA` e `Curve25519`. Em seguida, você inicializa a assinatura com uma chave privada, passa a mensagem e finaliza a operação de assinatura armazenando-a como um array de bytes.

Para verificar uma assinatura, você cria novamente uma instância de `Signature`, desta vez passando a mensagem de texto e a chave pública, como no método `verifyDigitalSignature`:

```java
public static boolean verifyDigitalSignature(String message, byte[] digitalSignature, PublicKey publicKey)
        throws NoSuchAlgorithmException, InvalidKeyException, SignatureException {
    Signature signature = Signature.getInstance("Ed25519");
    signature.initVerify(publicKey);
    signature.update(message.getBytes());
    return signature.verify(digitalSignature);
}
```

Finalmente, você pode verificar a assinatura invocando o método `verify` nela.

Você pode experimentar os métodos anteriores executando o seguinte trecho de código no `jshell`:

```java
/open DigitalSignature.java

KeyPair keyPair = generateKeyPair();
String message = "Hello, World!";
byte[] digitalSignature = generateDigitalSignature(message, keyPair.getPrivate());
boolean isSignatureValid = verifyDigitalSignature(message, digitalSignature, keyPair.getPublic());
System.out.println("Is the digital signature valid? " + isSignatureValid);
```

Na seção seguinte, vamos investigar mais sobre certificados digitais e como eles podem ajudar você a vincular a propriedade da chave pública à entidade que a possui.

## Fundamentos de Certificados Digitais em Java

Em criptografia, certificados representam documentos eletrônicos que unem algumas informações, como a identidade de um usuário e sua chave pública. Uma terceira parte confiável - Autoridade Certificadora (CA) - emite certificados digitais para verificar a identidade do titular do certificado.

_Figura 1: Parte de um certificado da saída de `keytool -printcert -sslserver oracle.com/java`_

Um certificado digital contém:

  * Número de série usado para identificar unicamente um certificado, o indivíduo ou a entidade determinada pelo certificado.
  * Datas de expiração (não antes e não depois)
  * Nome do titular do certificado (assunto).
  * Cópia da chave pública do titular do certificado. Você precisa disso para descriptografar mensagens e assinaturas digitais.
  * Assinatura Digital da autoridade emissora do certificado.

Para obter uma melhor compreensão das assinaturas digitais e certificados, consulte a tabela abaixo:

Característica | Assinatura Digital | Certificado Digital
---|---|---
Propósito | Verificar autenticidade, integridade, não-repúdio. | Verificar a identidade do remetente e do receptor.
Processo | Aplicar o algoritmo criptográfico na mensagem com uma chave privada para gerar uma assinatura digital única. | Uma Autoridade Certificadora (CA) o gera: Geração de Chaves, Registro, Verificação, Criação.
Padrão | Padrão de Assinatura Digital ([DSS](<https://nvlpubs.nist.com/nistpubs/FIPS/NIST.FIPS.186-5.pdf>)) | [Formato Padrão X.509](<https://www.itu.int/rec/T-REC-X.509/en>)

Certificados não emitidos por uma Autoridade Certificadora conhecida, mas sim pelo servidor que hospeda o certificado, são chamados de autoassinados. Você pode gerar um certificado autoassinado válido por 365 dias usando `keytool` executando o seguinte comando em uma janela de terminal:

```bash
keytool -genkeypair -alias mykey -keyalg Ed25519 -keystore mykeystore -storepass jkspass -dname "CN=server.company.com, OU=My Company, O=My Company, C=NL" -validity 365
```

O comando anterior executa várias operações:

  * cria o keystore chamado `mykeystore` e atribui a ele a senha `jkspass`.
  * gera um par de chaves pública/privada para a entidade cujo "nome distinto" tem um nome comum de "server.company.com", unidade organizacional de "My Company", organização de "My Company" e código de país de duas letras de "NL".
  * usa o algoritmo de geração de chaves `Ed25519` padrão para criar as chaves.
  * cria um certificado autoassinado que inclui a chave pública e as informações do nome distinto. Este certificado será válido por 365 dias e está associado à chave privada em uma entrada de keystore referenciada pelo alias `mykey`.

Você pode ler o certificado associado ao alias do keystore e armazená-lo em um arquivo `mycert.pem` no formato de codificação imprimível via:

```bash
keytool -exportcert -alias mykey -keystore mykeystore -storepass jkspass -file mycert.pem
```

Para analisar e gerenciar este certificado, trabalhar com caminhos de certificação e listas de revogação de certificados (CRLs), você pode usar `keytool` ou as classes do pacote `java.security.cert`. Por exemplo, você pode gerar um [`java.security.cert.Certificate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/security/cert/Certificate.html>) e convertê-lo para [`java.security.cert.X509Certificate`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/security/cert/X509Certificate.html>) usando o certificado autoassinado criado anteriormente:

```java
import java.io.FileInputStream;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;

public class CertificateParser {
    public static void main(String[] args) throws Exception {
        FileInputStream fis = new FileInputStream("mycert.pem");
        CertificateFactory cf = CertificateFactory.getInstance("X.509");
        X509Certificate cert = (X509Certificate) cf.generateCertificate(fis);
        System.out.println("Certificate Subject: " + cert.getSubjectX500Principal());
        System.out.println("Certificate Issuer: " + cert.getIssuerX500Principal());
        System.out.println("Certificate Valid From: " + cert.getNotBefore());
        System.out.println("Certificate Valid Until: " + cert.getNotAfter());
        fis.close();
    }
}
```

Enquanto `java.security.cert.Certificate` é uma abstração para certificados que possuem diferentes formatos, a classe `java.security.cert.X509Certificate` fornece uma maneira padrão de acessar todos os atributos de um certificado `X.509`. Se você precisar validar caminhos de certificação `X.509`, deve usar [`java.security.cert.TrustAnchor`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/security/cert/TrustAnchor.html>) e [`java.security.cert.CertPathValidator`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/security/cert/CertPathValidator.html>) para cadeias de certificados.

Ao trabalhar com certificados digitais, você tem uma maneira rápida de localizar um certificado específico no armazenamento de credenciais do seu sistema usando uma impressão digital de certificado (thumbprint). A impressão digital de um certificado é o identificador único do certificado e pode ajudar você a comparar certificados. Você pode facilmente calcular a impressão digital de um certificado usando [`java.security.MessageDigest`](<https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/security/MessageDigest.html>) sobre o objeto `java.security.cert.X509Certificate`:

```java
import java.io.FileInputStream;
import java.security.MessageDigest;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.util.Base64;

public class CertificateThumbprint {
    public static void main(String[] args) throws Exception {
        FileInputStream fis = new FileInputStream("mycert.pem");
        CertificateFactory cf = CertificateFactory.getInstance("X.509");
        X509Certificate cert = (X509Certificate) cf.generateCertificate(fis);
        fis.close();

        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] der = cert.getEncoded();
        md.update(der);
        byte[] digest = md.digest();
        String thumbprint = Base64.getEncoder().encodeToString(digest);
        System.out.println("Certificate Thumbprint (SHA-256): " + thumbprint);
    }
}
```

Parabéns, você aprendeu sobre as diferenças entre assinaturas digitais e certificados digitais e como interagir com eles em Java usando a API de Segurança Java.

## Links Úteis:

  * [Oracle JDK Cryptographic Roadmap](<https://www.java.com/en/jre-jdk-cryptoroadmap.html>)
  * [Java Security Standard Algorithm Names Specification](<https://docs.oracle.com/en/java/javase/26/docs/specs/security/standard-names.html>)
  * [DSS](<https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf>)
  * [T-REC-X.509](<https://www.itu.int/rec/T-REC-X.509/en>)
  * [RFC-8032](<https://tools.ietf.org/html/rfc8032>)

## Mais Aprendizado

### Neste tutorial

Implementando Assinaturas Digitais com Java Fundamentos de Certificados Digitais em Java Links Úteis Mais Aprendizado

Última atualização: Invalid DateTime

**Anterior na Série**

[Introdução à Criptografia/Descriptografia Java](<#/doc/tutorials/security/intro>)

➜

**Tutorial Atual**

Fundamentos de Assinaturas Digitais e Certificados em Java

➜

**Próximo na Série**

[Monitorando a Segurança de Aplicações Java com ferramentas JDK e Eventos JFR](<#/doc/tutorials/security/monitor>)

**Anterior na Série:** [Introdução à Criptografia/Descriptografia Java](<#/doc/tutorials/security/intro>)

**Próximo na Série:** [Monitorando a Segurança de Aplicações Java com ferramentas JDK e Eventos JFR](<#/doc/tutorials/security/monitor>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ Fundamentos de Segurança usando Bibliotecas JDK ](<#/doc/tutorials/security>) > Fundamentos de Assinaturas Digitais e Certificados em Java