# Visão Geral e Tutorial da API de Assinatura Digital XML

## 11 Visão Geral e Tutorial da API de Assinatura Digital XML

A Java XML Digital Signature API é uma API Java padrão para gerar e validar XML Signatures. Esta API foi definida sob o Java Community Process como [JSR 105](<http://www.jcp.org/en/jsr/detail?id=105>).

XML Signatures podem ser aplicadas a dados de qualquer tipo, XML ou binários (veja [XML Signature Syntax and Processing](<http://www.w3.org/TR/xmldsig-core/>)). A assinatura resultante é representada em XML. Uma XML Signature pode ser usada para proteger seus dados e fornecer integridade de dados, autenticação de mensagem e autenticação do signatário.

Após fornecer uma breve visão geral das XML Signatures e da XML Digital Signature API, este documento apresenta dois exemplos que demonstram como usar a API para validar e gerar uma XML Signature. Este documento assume que você tem um conhecimento básico de criptografia e assinaturas digitais.

A API foi projetada para suportar todos os recursos exigidos ou recomendados da W3C Recommendation para XML-Signature Syntax and Processing. A API é extensível e plugável e é baseada na Java Cryptography Service Provider Architecture; veja [Java Cryptography Architecture (JCA) Reference Guide](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide> "The Java Cryptography Architecture \(JCA\) is a major piece of the platform, and contains a "provider" architecture and a set of APIs for digital signatures, message digests \(hashes\), certificates and certificate validation, encryption \(symmetric/asymmetric block/stream ciphers\), key generation and management, and secure random number generation, to name a few."). A API foi projetada para dois tipos de desenvolvedores:

  * Desenvolvedores que desejam usar a XML Digital Signature API para gerar e validar XML signatures
  * Desenvolvedores que desejam criar uma implementação concreta da XML Digital Signature API e registrá-la como um serviço criptográfico de um JCA provider (veja [The Provider Class](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide>)).

### Hierarquia de Pacotes

Os seis pacotes a seguir, que estão contidos no módulo [java.xml.crypto](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/module-summary.html>), compõem a XML Digital Signature API:

  * javax.xml.crypto
  * javax.xml.crypto.dsig
  * javax.xml.crypto.dsig.keyinfo
  * javax.xml.crypto.dsig.spec
  * javax.xml.crypto.dom
  * javax.xml.crypto.dsig.dom

O pacote [javax.xml.crypto](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/package-summary.html>) contém classes comuns que são usadas para realizar operações criptográficas XML, como gerar uma XML signature ou criptografar dados XML. Duas classes notáveis neste pacote são a classe [KeySelector](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/KeySelector.html>), que permite aos desenvolvedores fornecer implementações que localizam e opcionalmente validam chaves usando as informações contidas em um objeto KeyInfo, e a classe [URIDereferencer](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/URIDereferencer.html>), que permite aos desenvolvedores criar e especificar suas próprias implementações de dereferenciamento de URI.

O pacote [javax.xml.crypto.dsig](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/package-summary.html>) inclui interfaces que representam os elementos centrais definidos na especificação de assinatura digital XML do W3C. De importância primária é a classe [XMLSignature](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/XMLSignature.html>), que permite assinar e validar uma assinatura digital XML. A maioria das estruturas ou elementos de assinatura XML são representados por uma interface correspondente (exceto pelas estruturas KeyInfo, que estão incluídas em seu próprio pacote e são discutidas no próximo parágrafo). Essas interfaces incluem: [SignedInfo](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/SignedInfo.html>), [CanonicalizationMethod](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/CanonicalizationMethod.html>), [SignatureMethod](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/SignatureMethod.html>), [Reference](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/Reference.html>), [Transform](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/Transform.html>), [DigestMethod](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/DigestMethod.html>), [XMLObject](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/XMLObject.html>), [Manifest](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/Manifest.html>), [SignatureProperty](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/SignatureProperty.html>), e [SignatureProperties](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/SignatureProperties.html>). A classe [XMLSignatureFactory](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/XMLSignatureFactory.html>) é uma factory abstrata que é usada para criar objetos que implementam essas interfaces.

O pacote [javax.xml.crypto.dsig.keyinfo](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/keyinfo/package-summary.html>) contém interfaces que representam a maioria das estruturas KeyInfo definidas na recomendação de assinatura digital XML do W3C, incluindo [KeyInfo](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/keyinfo/KeyInfo.html>), [KeyName](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/keyinfo/KeyName.html>), [KeyValue](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/keyinfo/KeyValue.html>), [X509Data](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/keyinfo/X509Data.html>), [X509IssuerSerial](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/keyinfo/X509IssuerSerial.html>), [RetrievalMethod](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/keyinfo/RetrievalMethod.html>), e [PGPData](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/keyinfo/PGPData.html>). A classe [KeyInfoFactory](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/keyinfo/KeyInfoFactory.html>) é uma factory abstrata que é usada para criar objetos que implementam essas interfaces.

O pacote [javax.xml.crypto.dsig.spec](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/spec/package-summary.html>) contém interfaces e classes que representam parâmetros de entrada para os algoritmos de digest, signature, transform ou canonicalization usados no processamento de XML signatures.

Finalmente, os pacotes [javax.xml.crypto.dom](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dom/package-summary.html>) e [javax.xml.crypto.dsig.dom](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/dom/package-summary.html>) contêm classes específicas de DOM para os pacotes [javax.xml.crypto](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/package-summary.html>) e [javax.xml.crypto.dsig](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/package-summary.html>), respectivamente. Apenas desenvolvedores e usuários que estão criando ou usando uma implementação de [XMLSignatureFactory](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/XMLSignatureFactory.html>) ou [KeyInfoFactory](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/keyinfo/KeyInfoFactory.html>) baseada em DOM precisarão fazer uso direto desses pacotes.

### Provedores de Serviço

Uma Java XML Signature é uma implementação concreta das classes abstratas [XMLSignatureFactory](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/XMLSignatureFactory.html>) e [KeyInfoFactory](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/keyinfo/KeyInfoFactory.html>) e é responsável por criar objetos e algoritmos que analisam, geram e validam XML Signatures e estruturas KeyInfo. Uma implementação concreta de XMLSignatureFactory deve fornecer suporte para cada um dos algoritmos exigidos conforme especificado pela recomendação do W3C para XML Signatures. Opcionalmente, pode suportar outros algoritmos conforme definidos pela recomendação do W3C ou outras especificações.

A Java XML Digital Signature API aproveita o modelo de provedor JCA para registrar e carregar implementações de XMLSignatureFactory e KeyInfoFactory.

Cada implementação concreta de XMLSignatureFactory ou KeyInfoFactory suporta um tipo de mecanismo XML específico que identifica o mecanismo de processamento XML que uma implementação usa internamente para analisar e gerar estruturas de XML signature e KeyInfo. Este JSR suporta um tipo padrão, DOM. A implementação do provedor XML Digital Signature que é empacotada com o JDK suporta o mecanismo DOM.

Uma implementação da XML Digital Signature API deve usar classes de engine JCA subjacentes, como [java.security.Signature](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/Signature.html>) e [java.security.MessageDigest](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/MessageDigest.html>), para realizar operações criptográficas.

Além das classes XMLSignatureFactory e KeyInfoFactory, o JSR 105 suporta uma interface de provedor de serviço para algoritmos de transform e canonicalization. A classe [TransformService](<https://docs.oracle.com/en/java/javase/25/docs/api/java.xml.crypto/javax/xml/crypto/dsig/TransformService.html>) permite desenvolver e conectar uma implementação de um algoritmo específico de transform ou canonicalization para um tipo de mecanismo XML particular. A classe TransformService usa o modelo de provedor JCA padrão para registrar e carregar implementações. Cada implementação JSR 105 deve usar a classe TransformService para encontrar um provedor que suporte algoritmos de transform e canonicalization em XML Signatures que está gerando ou validando.

### Introdução às XML Signatures

Você pode usar uma XML Signature para assinar quaisquer dados arbitrários, sejam eles XML ou binários. Os dados são identificados via URIs em um ou mais elementos Reference. XML Signatures são descritas em uma ou mais de três formas: detached, enveloping ou enveloped. Uma assinatura detached é sobre dados que são externos, ou fora do próprio elemento signature. Assinaturas enveloping são assinaturas sobre dados que estão dentro do elemento signature, e uma assinatura enveloped é uma assinatura que está contida dentro dos dados que está assinando.

#### Exemplo de uma XML Signature

A maneira mais fácil de descrever o conteúdo de uma XML Signature é mostrar um exemplo real e descrever cada componente em mais detalhes. [Exemplo 11-3](<#/doc/guides/security/java-xml-digital-signature-api-overview-and-tutorial>) é uma XML Signature enveloped gerada sobre o conteúdo de um documento XML. O elemento raiz, `Envelop`, contém um elemento `Signature`:
```
    <Envelope xmlns="urn:envelope">
      <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
        <!-- ... -->
      </Signature>
    </Envelope> 
```

Este elemento `Signature` foi inserido dentro do conteúdo que está assinando, tornando-o assim uma assinatura enveloped. O elemento `SignedInfo` obrigatório contém as informações que são realmente assinadas:
```
    <Envelope xmlns="urn:envelope">
      <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
        <SignedInfo>
          <CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments"/>
          <SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
          <Reference URI="">
            <Transforms>
              <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
            </Transforms>
            <DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
            <DigestValue>/juoQ4bDxElf1M+KJauO20euW+QAvvPP0nDCruCQooM=</DigestValue>
          </Reference>
        </SignedInfo>
        <!-- ... -->
      </Signature>
    </Envelope> 
```

O elemento `CanonicalizationMethod` obrigatório define o algoritmo usado para canonicalizar o elemento `SignedInfo` antes que ele seja assinado ou validado. Canonicalization é o processo de converter conteúdo XML para uma forma canônica, para levar em conta mudanças que podem invalidar uma assinatura sobre esses dados. Canonicalization é necessária devido à natureza do XML e à forma como é analisado por diferentes processadores e intermediários, o que pode alterar os dados de tal forma que a assinatura não seja mais válida, mas os dados assinados ainda sejam logicamente equivalentes.

O elemento `SignatureMethod` obrigatório define o algoritmo de assinatura digital usado para gerar a assinatura, neste caso RSA com SHA-256.

Um ou mais elementos `Reference` identificam os dados que são digeridos. Cada elemento `Reference` identifica os dados via um URI. Neste exemplo, o valor do URI é a String vazia (""), o que indica a raiz do documento. O elemento `Transforms` opcional contém uma lista de um ou mais elementos `Transform`, cada um dos quais descreve um algoritmo de transformação usado para transformar os dados antes de serem digeridos. Neste exemplo, há um elemento Transform para o algoritmo de transformação enveloped. A transformação enveloped é necessária para assinaturas enveloped para que o próprio elemento signature seja removido antes de calcular o valor da assinatura. O elemento `DigestMethod` obrigatório define o algoritmo usado para digerir os dados, neste caso SHA-256. Finalmente, o elemento `DigestValue` obrigatório contém o valor digerido real codificado em base64.

O elemento `SignatureValue` obrigatório contém o valor da assinatura codificado em base64 da assinatura sobre o elemento `SignedInfo`.

O elemento `KeyInfo` opcional contém informações sobre a chave que é necessária para validar a assinatura:
```
        <KeyInfo>
          <KeyValue>
            <RSAKeyValue>
              <Modulus>
    9hSmAKw/4TTw/1l1u1pYzdFm6lOjRB/5NfdGWl/fB8iAa/tiK0f1u/VWoK6SMtogYgSDKqQThbAu
    9dy9rRnOWRGY2He1JtpOvGh0WCmIFUEs2P22HvEf+JGKVEpkoP4hv53ucT69T+7nKGK3/bjxgp+T
    C7fbnVj651+jAHuDFlC8Txt1R8ZymfN5cUeHIH96dvNFrtai/uwZDbVMfhV9chL//+Vyhx4O5nHv
    jfS+0So9Qi52YAbEyLu6+BLdu8wnMWapC88CfXsRwrpx8b6aCU0e6QSZyOvdgXWz3+9ifVTBDIxE
    kjhL5OASx0qjvc+dPUOMvq7fJE05RRZLyb0YJw==
              </Modulus>
              <Exponent>AQAB</Exponent>
            </RSAKeyValue>
          </KeyValue>
        </KeyInfo>
```

Este elemento `KeyInfo` contém um elemento `KeyValue`, que por sua vez contém um elemento `RSAKeyValue` consistindo na chave pública necessária para validar a assinatura. `KeyInfo` pode conter vários conteúdos, como certificados X.509 e identificadores de chave PGP. Veja [The `KeyInfo` Element](<http://www.w3.org/TR/xmldsig-core/#sec-KeyInfo>) em [XML Signature Syntax and Processing](<https://www.w3.org/TR/xmldsig-core/>) para mais informações sobre os diferentes tipos de `KeyInfo`.

### Modo de Validação Segura de XML Signature

O modo de validação segura de XML Signature pode protegê-lo de XML Signatures que podem conter construções potencialmente hostis que podem causar ataques de denial-of-service ou outros tipos de problemas de segurança.

O modo de validação segura de XML Signature é habilitado por padrão.

Se necessário, e por sua conta e risco, você pode desabilitar o modo de validação segura de XML Signature definindo a system property `org.jcp.xml.dsig.secureValidation` como `false` ou definindo a propriedade `org.jcp.xml.dsig.secureValidation` como `Boolean.FALSE` com o método `DOMValidateContext.setProperty()`. A system property substitui o valor da propriedade da API.

Quando o modo de validação segura de XML Signature está habilitado, as XML Signatures são processadas de forma mais segura. Limites são definidos em várias construções de XML Signature para evitar condições como ataques de denial-of-service. Por padrão, ele impõe as seguintes restrições:

  * Proíbe o uso de XSLT transforms
  * Restringe o número de elementos `Reference` de `SignedInfo` ou `Manifest` a 30 ou menos
  * Restringe o número de transforms de `Reference` a 5 ou menos
  * Proíbe o uso de assinaturas MD5 ou SHA-1 ou algoritmos MD5 MAC
  * Garante que os IDs de `Reference` sejam únicos para ajudar a prevenir ataques de signature wrapping
  * Proíbe URIs de `Reference` do tipo `http`, `https` ou `file`
  * Não permite que um elemento `RetrievalMethod` referencie outro elemento `RetrievalMethod`
  * Proíbe chaves RSA ou DSA com menos de 1024 bits
  * Proíbe chaves EC com menos de 224 bits

Além disso, você pode usar a Security Property `jdk.xml.dsig.secureValidationPolicy` para controlar e ajustar as restrições listadas anteriormente ou adicionar restrições adicionais. Consulte a definição desta Security Property no arquivo `java.security` para mais informações.

### Exemplos da XML Digital Signature API

As seções a seguir descrevem dois exemplos que mostram como usar a XML Digital Signature API:

#### Exemplo de Validação

Para compilar e executar o exemplo, execute os seguintes comandos:
```
    $ javac Validate.java 
    $ java Validate signature.xml
```

O programa de exemplo validará a assinatura no arquivo `signature.xml` no diretório de trabalho atual.

Exemplo 11-1 Validate.java
```
    import javax.xml.crypto.*;
    import javax.xml.crypto.dsig.*;
    import javax.xml.crypto.dom.*;
    import javax.xml.crypto.dsig.dom.DOMValidateContext;
    import javax.xml.crypto.dsig.keyinfo.*;
    import java.io.FileInputStream;
    import java.security.*;
    import java.util.Collections;
    import java.util.Iterator;
    import java.util.List;
    import javax.xml.parsers.DocumentBuilderFactory;
    import org.w3c.dom.Document;
    import org.w3c.dom.NodeList;
    
    /**
     * This is a simple example of validating an XML Signature using
     * the XML Signature API. It assumes the key needed to validate
     * the signature is contained in a KeyValue KeyInfo.
     */
    public class Validate {
    
        //
        // Synopsis: java Validate [document]
        //
        //    where "document" is the name of a file containing the XML document
        //    to be validated.
        //
        public static void main(String[] args) throws Exception {
    
            // Instantiate the document to be validated
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            dbf.setNamespaceAware(true);
            Document doc = null;
            try (FileInputStream fis = new FileInputStream(args[0])) {
                doc = dbf.newDocumentBuilder().parse(fis);
            }
    
            // Find Signature element
            NodeList nl =
                doc.getElementsByTagNameNS(XMLSignature.XMLNS, "Signature");
            if (nl.getLength() == 0) {
                throw new Exception("Cannot find Signature element");
            }
    
            // Create a DOM XMLSignatureFactory that will be used to unmarshal the
            // document containing the XMLSignature
            XMLSignatureFactory fac = XMLSignatureFactory.getInstance("DOM");
    
            // Create a DOMValidateContext and specify a KeyValue KeySelector
            // and document context
            DOMValidateContext valContext = new DOMValidateContext
                (new KeyValueKeySelector(), nl.item(0));
    
            // unmarshal the XMLSignature
            XMLSignature signature = fac.unmarshalXMLSignature(valContext);
    
            // Validate the generated XMLSignature
            boolean coreValidity = signature.validate(valContext);
    
            // Check core validation status
            if (coreValidity == false) {
                System.err.println("Signature failed core validation");
                boolean sv = signature.getSignatureValue().validate(valContext);
                System.out.println("signature validation status: " + sv);
                // check the validation status of each Reference
                Iterator<Reference> i =
                    signature.getSignedInfo().getReferences().iterator();
                for (int j=0; i.hasNext(); j++) {
                    boolean refValid = i.next().validate(valContext);
                    System.out.println("ref["+j+"] validity status: " + refValid);
                }
            } else {
                System.out.println("Signature passed core validation");
            }
        }
    
        /**
         * KeySelector which retrieves the public key out of the
         * KeyValue element and returns it.
         * NOTE: If the key algorithm doesn't match signature algorithm,
         * then the public key will be ignored.
         */
        private static class KeyValueKeySelector extends KeySelector {
            public KeySelectorResult select(KeyInfo keyInfo,
                                            KeySelector.Purpose purpose,
                                            AlgorithmMethod method,
                                            XMLCryptoContext context)
                throws KeySelectorException {
                if (keyInfo == null) {
                    throw new KeySelectorException("Null KeyInfo object!");
                }
                SignatureMethod sm = (SignatureMethod) method;
                List<XMLStructure> list = keyInfo.getContent();
    
                for (int i = 0; i < list.size(); i++) {
                    XMLStructure xmlStructure = list.get(i);
                    if (xmlStructure instanceof KeyValue) {
                        PublicKey pk = null;
                        try {
                            pk = ((KeyValue)xmlStructure).getPublicKey();
                        } catch (KeyException ke) {
                            throw new KeySelectorException(ke);
                        }
                        // make sure algorithm is compatible with method
                        if (algEquals(sm.getAlgorithm(), pk.getAlgorithm())) {
                            return new SimpleKeySelectorResult(pk);
                        }
                    }
                }
                throw new KeySelectorException("No KeyValue element found!");
            }
    
            static boolean algEquals(String algURI, String algName) {
                if (algName.equalsIgnoreCase("DSA") &&
                    algURI.equalsIgnoreCase("http://www.w3.org/2009/xmldsig11#dsa-sha256")) {
                    return true;
                } else if (algName.equalsIgnoreCase("RSA") &&
                           algURI.equalsIgnoreCase("http://www.w3.org/2001/04/xmldsig-more#rsa-sha256")) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    
        private static class SimpleKeySelectorResult implements KeySelectorResult {
            private PublicKey pk;
            SimpleKeySelectorResult(PublicKey pk) {
                this.pk = pk;
            }
    
            public Key getKey() { return pk; }
        }
    }
    
```

Exemplo 11-2 envelope.xml
```
    <Envelope xmlns="urn:envelope">
    </Envelope>
```

Exemplo 11-3 signature.xml

Este arquivo foi indentado e formatado para legibilidade.
```
    <?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <Envelope xmlns="urn:envelope">
      <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
        <SignedInfo>
          <CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments"/>
          <SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
          <Reference URI="">
            <Transforms>
              <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
            </Transforms>
            <DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
            <DigestValue>/juoQ4bDxElf1M+KJauO20euW+QAvvPP0nDCruCQooM=</DigestValue>
          </Reference>
        </SignedInfo>
        <SignatureValue>
    Vorr4nABCD7eWOjh4jn8pdM5iseGJPt4BmlgjEbxr05TsR9ObHq7WLVOBOtJfb3M6pXv6NnTucpH
    e/97zHbuUMaNeGxCs/gN7YDUGOkQE1Gs4HAbGwXuTcif3pw+066ZW4uxyzapwS6lZHmqIm7PRl8I
    NIQXVL4dezLe+rx77Kh+rZRheVe4UlTTP+TmIOaBZo93GQ5FudreMhSiuIC0Nx2SP7mAkt6+8kVH
    luZouFbqriSvyhzIxDgyOXpm/PHCuuPU2scCokwjEZBtlZXDOl6lIWGllnyrptWntQ6F/ngQObI5
    c2+npgCshq1svGuS/xx18MAFHGWi98Vj+07QCg==
        </SignatureValue>
        <KeyInfo>
          <KeyValue>
            <RSAKeyValue>
              <Modulus>
    9hSmAKw/4TTw/1l1u1pYzdFm6lOjRB/5NfdGWl/fB8iAa/tiK0f1u/VWoK6SMtogYgSDKqQThbAu
    9dy9rRnOWRGY2He1JtpOvGh0WCmIFUEs2P22HvEf+JGKVEpkoP4hv53ucT69T+7nKGK3/bjxgp+T
    C7fbnVj651+jAHuDFlC8Txt1R8ZymfN5cUeHIH96dvNFrtai/uwZDbVMfhV9chL//+Vyhx4O5nHv
    jfS+0So9Qi52YAbEyLu6+BLdu8wnMWapC88CfXsRwrpx8b6aCU0e6QSZyOvdgXWz3+9ifVTBDIxE
    kjhL5OASx0qjvc+dPUOMvq7fJE05RRZLyb0YJw==
              </Modulus>
              <Exponent>AQAB</Exponent>
            </RSAKeyValue>
          </KeyValue>
        </KeyInfo>
      </Signature>
    </Envelope>
```

##### Validando uma XML Signature

Este exemplo mostra como validar uma XML Signature usando a Java XML Digital Signature API. O exemplo usa DOM (o Document Object Model) para analisar um documento XML contendo um elemento Signature e uma implementação DOM para validar a assinatura.

##### Instanciando o Documento que Contém a Assinatura

Primeiro, usamos uma JAXP DocumentBuilderFactory para analisar o documento XML contendo a Signature. Uma aplicação obtém a implementação padrão para DocumentBuilderFactory chamando a seguinte linha de código:
```
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
```

Também devemos tornar a factory namespace-aware:
```
        dbf.setNamespaceAware(true);
```

Em seguida, usamos a factory para obter uma instância de um DocumentBuilder, que é usado para analisar o documento:
```
        Document doc = null;
        try (FileInputStream fis = new FileInputStream(args[0])) {
            doc = dbf.newDocumentBuilder().parse(fis);
        }
```

##### Especificando o Elemento Signature a Ser Validado

Precisamos especificar o elemento Signature que queremos validar, já que pode haver mais de um no documento. Usamos o método DOM Document.getElementsByTagNameNS, passando a ele o namespace URI da XML Signature e o nome da tag do elemento Signature, como mostrado:
```
        NodeList nl =
            doc.getElementsByTagNameNS(XMLSignature.XMLNS, "Signature");
        if (nl.getLength() == 0) {
            throw new Exception("Cannot find Signature element");
        } 
```

Isso retorna uma lista de todos os elementos Signature no documento. Neste exemplo, há apenas um elemento Signature.

##### Criando um Contexto de Validação

Criamos uma instância de XMLValidateContext contendo parâmetros de entrada para validar a assinatura. Como estamos usando DOM, instanciamos uma instância de DOMValidateContext (uma subclasse de XMLValidateContext), e passamos a ela dois parâmetros, um objeto KeyValueKeySelector e uma referência ao elemento Signature a ser validado (que é a primeira entrada da NodeList que geramos anteriormente):
```
        DOMValidateContext valContext = new DOMValidateContext
            (new KeyValueKeySelector(), nl.item(0));
```

O KeyValueKeySelector é explicado em mais detalhes em [Usando KeySelectors](<#/doc/guides/security/java-xml-digital-signature-api-overview-and-tutorial>).

##### Desserializando a XML Signature

Extraímos o conteúdo do elemento Signature para um objeto XMLSignature. Este processo é chamado de desserialização. O elemento Signature é desserializado usando um objeto XMLSignatureFactory. Uma aplicação pode obter uma implementação DOM de XMLSignatureFactory chamando a seguinte linha de código:
```
        XMLSignatureFactory fac = XMLSignatureFactory.getInstance("DOM");
```

Em seguida, invocamos o método unmarshalXMLSignature da factory para desserializar um objeto XMLSignature, e passamos a ele o contexto de validação que criamos anteriormente:
```
        XMLSignature signature = fac.unmarshalXMLSignature(valContext);
```

##### Validando a XML Signature

Agora estamos prontos para validar a assinatura. Fazemos isso invocando o método validate no objeto XMLSignature, e passamos a ele o contexto de validação da seguinte forma:
```
        boolean coreValidity = signature.validate(valContext);
```

O método validate retorna "true" se a assinatura for validada com sucesso de acordo com as regras de validação core na W3C XML Signature Recommendation, e false caso contrário.

###### E Se a XML Signature Falhar na Validação?

Se o método XMLSignature.validate retornar false, podemos tentar identificar a causa da falha. Existem duas fases na validação core de XML Signature:

  * Validação da assinatura (a verificação criptográfica da assinatura)
  * Validação da Reference (a verificação do digest de cada reference na assinatura)

Cada fase deve ser bem-sucedida para que a assinatura seja válida. Para verificar se a assinatura falhou na validação criptográfica, podemos verificar o status, da seguinte forma:
```
        boolean sv = signature.getSignatureValue().validate(valContext);
        System.out.println("signature validation status: " + sv);
```

Também podemos iterar sobre as references e verificar o status de validação de cada uma, da seguinte forma:
```
        Iterator<Reference> i =
            signature.getSignedInfo().getReferences().iterator();
        for (int j=0; i.hasNext(); j++) {
            boolean refValid = i.next().validate(valContext);
            System.out.println("ref["+j+"] validity status: " + refValid);
        }
```

##### Usando KeySelectors

KeySelectors são usados para encontrar e selecionar chaves que são necessárias para validar uma XMLSignature. Anteriormente, quando criamos um objeto DOMValidateContext, passamos um objeto `KeyValueKeySelector` como primeiro argumento:
```
        DOMValidateContext valContext = new DOMValidateContext
            (new KeyValueKeySelector(), nl.item(0));
```

Alternativamente, poderíamos ter passado uma PublicKey como primeiro argumento se já soubéssemos qual chave é necessária para validar a assinatura. No entanto, muitas vezes não sabemos.

A classe `KeyValueKeySelector` é uma implementação concreta da classe abstrata KeySelector. A implementação `KeyValueKeySelector` tenta encontrar uma chave de validação apropriada usando os dados contidos nos elementos KeyValue do elemento KeyInfo de uma XMLSignature. Ela não determina se a chave é confiável. Esta é uma implementação KeySelector muito simples, projetada para ilustração em vez de uso no mundo real. Um exemplo mais prático de um KeySelector é um que pesquisa um KeyStore por chaves confiáveis que correspondem às informações X509Data (por exemplo, elementos X509SubjectName, X509IssuerSerial, X509SKI ou X509Certificate) contidas em um KeyInfo.

A implementação da classe `KeyValueKeySelector` é a seguinte:
```java
        private static class KeyValueKeySelector extends KeySelector {
            public KeySelectorResult select(KeyInfo keyInfo,
                                            KeySelector.Purpose purpose,
                                            AlgorithmMethod method,
                                            XMLCryptoContext context)
                throws KeySelectorException {
                if (keyInfo == null) {
                    throw new KeySelectorException("Null KeyInfo object!");
                }
                SignatureMethod sm = (SignatureMethod) method;
                List<XMLStructure> list = keyInfo.getContent();
    
                for (int i = 0; i < list.size(); i++) {
                    XMLStructure xmlStructure = list.get(i);
                    if (xmlStructure instanceof KeyValue) {
                        PublicKey pk = null;
                        try {
                            pk = ((KeyValue)xmlStructure).getPublicKey();
                        } catch (KeyException ke) {
                            throw new KeySelectorException(ke);
                        }
                        // make sure algorithm is compatible with method
                        if (algEquals(sm.getAlgorithm(), pk.getAlgorithm())) {
                            return new SimpleKeySelectorResult(pk);
                        }
                    }
                }
                throw new KeySelectorException("No KeyValue element found!");
            }
    
            static boolean algEquals(String algURI, String algName) {
                if (algName.equalsIgnoreCase("DSA") &&
                    algURI.equalsIgnoreCase("http://www.w3.org/2009/xmldsig11#dsa-sha256")) {
                    return true;
                } else if (algName.equalsIgnoreCase("RSA") &&
                           algURI.equalsIgnoreCase("http://www.w3.org/2001/04/xmldsig-more#rsa-sha256")) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    
        private static class SimpleKeySelectorResult implements KeySelectorResult {
            private PublicKey pk;
            SimpleKeySelectorResult(PublicKey pk) {
                this.pk = pk;
            }
    
            public Key getKey() { return pk; }
        }
```

#### Exemplo GenEnveloped

Para compilar e executar este exemplo, execute o seguinte comando:
```
    $ javac GenEnveloped.java
    $ java GenEnveloped envelope.xml envelopedSignature.xml
```

O programa de exemplo irá gerar uma assinatura envelopada do documento no arquivo `envelope.xml` e armazená-la no arquivo `envelopedSignature.xml` no diretório de trabalho atual.

Exemplo 11-4 GenEnveloped.java
```java
    import javax.xml.crypto.dsig.*;
    import javax.xml.crypto.dsig.dom.DOMSignContext;
    import javax.xml.crypto.dsig.keyinfo.*;
    import javax.xml.crypto.dsig.spec.*;
    import java.io.FileInputStream;
    import java.io.FileOutputStream;
    import java.io.OutputStream;
    import java.security.*;
    import java.util.List;
    import javax.xml.parsers.DocumentBuilderFactory;
    import javax.xml.transform.*;
    import javax.xml.transform.dom.DOMSource;
    import javax.xml.transform.stream.StreamResult;
    import org.w3c.dom.Document;
    
    /**
     * This is a simple example of generating an Enveloped XML
     * Signature using the Java XML Digital Signature API. The
     * resulting signature will look like (key and signature
     * values will be different):
     *
     * <pre><code>
     *<Envelope xmlns="urn:envelope">
     * <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
     *   <SignedInfo>
     *     <CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>
     *     <SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
     *     <Reference URI="">
     *       <Transforms>
     *         <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
     *       </Transforms>
     *       <DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
     *       <DigestValue>/juoQ4bDxElf1M+KJauO20euW+QAvvPP0nDCruCQooM=<DigestValue>
     *     </Reference>
     *   </SignedInfo>
     *   <SignatureValue>
     *     YeS+F0uiYv0h946M69Q9pKFNnD6dxUwLA8QT3GX/0H3cSPKRnNFyZiR4RPgaA1ir/ztb4rt6Lqb8
     *     hgwPERIa5qhoGUJyHDfUTcQ0Xqn1jYCVoC3ho+oUgJPXNVgtMAtpvOgxcWXUPATYdyimO6RrHF8+
     *     JXDkeICI9BPA4NKN1i77CAy6JJbaA87aNIpMJPImwJf8CM7mYsXremZz+RsafNE2cXXRzAoNOynC
     *     pi4oPYpE7CBLzhd23gf7zYRoyT06/bVIj4j3qOlVY1TQofsQ20NtAz6PbqAs7QkNoDzkX1CYlDSJ
     *     U8cGHuwXpul/UIpOiL6MZF8I/YI4ZlJn+O8Mvg==
     *   </SignatureValue>
     *   <KeyInfo>
     *     <KeyValue>
     *       <RSAKeyValue>
     *         <Modulus>
     *           mH0S/iw2K2tFTFHI75BtB67pzjR52HvQ8K7Xi5UX3NJm0oA+KX2mm0IrVcUuv609vbAAyQoW7CWm
     *           4kswVgStCm68dlw36309cxrEmPhG+PKBmUaGuBmRzwityjXRyRZJ6yaLenE8SJO/DC5ntQvmHqQQ
     *           qeOJYvz2Cbi2bi6x9XwmpqOfZCE5iTvYwioEsrglhP1uLG9fiXyNR2PXUTyLqD91HLhZFj1CEiU7
     *           aE++WfkKaowIx5p8e3F6hQ+VFRNXjtemK5aajuL0gwU+Oujg9ijgbyMh19vBoI8LruJoMOBrYFNN
     *           2boQJ3wP0Ek7CPIqAzQB5MnmvKc9jICKiiZVZw==
     *         </Modulus>
     *         <Exponent>AQAB</Exponent>
     *       </RSAKeyValue>
     *     </KeyValue>
     *   </KeyInfo>
     * </Signature>
     *</Envelope>
     * </code></pre>
     */
    public class GenEnveloped {
    
        //
        // Synopsis: java GenEnveloped [document] [output]
        //
        //    where "document" is the name of a file containing the XML document
        //    to be signed, and "output" is the name of the file to store the
        //    signed document. The 2nd argument is optional - if not specified,
        //    standard output will be used.
        //
        public static void main(String[] args) throws Exception {
        	
            // Instantiate the document to be signed
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            dbf.setNamespaceAware(true);
            Document doc = null;
            try (FileInputStream fis = new FileInputStream(args[0])) {
                doc = dbf.newDocumentBuilder().parse(fis);
            }
            
            // Create a RSA KeyPair
            KeyPairGenerator kpg = KeyPairGenerator.getInstance("RSA");
            kpg.initialize(2048);
            KeyPair kp = kpg.generateKeyPair();
            
            // Create a DOMSignContext and specify the RSA PrivateKey and
            // location of the resulting XMLSignature's parent element
            DOMSignContext dsc = new DOMSignContext
                (kp.getPrivate(), doc.getDocumentElement());
          
            // Create a DOM XMLSignatureFactory that will be used to generate the
            // enveloped signature
            XMLSignatureFactory fac = XMLSignatureFactory.getInstance("DOM");
    
            // Create a Reference to the enveloped document (in this case we are
            // signing the whole document, so a URI of "" signifies that) and
            // also specify the SHA256 digest algorithm and the ENVELOPED Transform.
            Reference ref = fac.newReference
                ("", fac.newDigestMethod(DigestMethod.SHA256, null),
                 List.of
                  (fac.newTransform
                    (Transform.ENVELOPED, (TransformParameterSpec) null)),
                 null, null);
    
            // Create the SignedInfo
            SignedInfo si = fac.newSignedInfo
                (fac.newCanonicalizationMethod
                 (CanonicalizationMethod.INCLUSIVE_WITH_COMMENTS,
                  (C14NMethodParameterSpec) null),
                 fac.newSignatureMethod("http://www.w3.org/2001/04/xmldsig-more#rsa-sha256", null),
                 List.of(ref));
    
            // Create a KeyValue containing the RSA PublicKey that was generated
            KeyInfoFactory kif = fac.getKeyInfoFactory();
            KeyValue kv = kif.newKeyValue(kp.getPublic());
    
            // Create a KeyInfo and add the KeyValue to it
            KeyInfo ki = kif.newKeyInfo(List.of(kv));
    
            // Create the XMLSignature (but don't sign it yet)
            XMLSignature signature = fac.newXMLSignature(si, ki);
    
            // Marshal, generate (and sign) the enveloped signature
            signature.sign(dsc);
    
            // output the resulting document
            OutputStream os;
            if (args.length > 1) {
               os = new FileOutputStream(args[1]);
            } else {
               os = System.out;
            }
    
            TransformerFactory tf = TransformerFactory.newInstance();
            Transformer trans = tf.newTransformer();
            trans.transform(new DOMSource(doc), new StreamResult(os));
        }
    }
```

Exemplo 11-5 envelope.xml
```xml
    <Envelope xmlns="urn:envelope">
    </Envelope>
    
```

##### Gerando uma Assinatura XML

Este exemplo mostra como gerar uma Assinatura XML usando a API XML Digital Signature. Mais especificamente, o exemplo gera uma Assinatura XML envelopada de um documento XML. Uma assinatura envelopada é uma assinatura que está contida dentro do conteúdo que ela está assinando. O exemplo usa DOM (o Document Object Model) para analisar o documento XML a ser assinado e uma implementação DOM para gerar a assinatura resultante.

Um conhecimento básico de Assinaturas XML e seus diferentes componentes é útil para entender esta seção. Consulte [XML Signature Syntax and Processing Version 1.1](<https://www.w3.org/TR/xmldsig-core/>) para mais informações.

##### Instanciando o Documento a Ser Assinado

Primeiro, usamos um JAXP DocumentBuilderFactory para analisar o documento XML que queremos assinar. Uma aplicação obtém a implementação padrão para DocumentBuilderFactory chamando a seguinte linha de código:
```java
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
```

Também devemos tornar a factory ciente de namespaces:
```java
        dbf.setNamespaceAware(true);
```

Em seguida, usamos a factory para obter uma instância de um DocumentBuilder, que é usado para analisar o documento:
```java
        Document doc = null;
        try (FileInputStream fis = new FileInputStream(args[0])) {
            doc = dbf.newDocumentBuilder().parse(fis);
        }
```

##### Criando um Par de Chaves Públicas

Geramos um par de chaves públicas. Mais tarde no exemplo, usaremos a chave privada para gerar a assinatura. Criamos o par de chaves com um KeyPairGenerator. Neste exemplo, criaremos um KeyPair RSA com um comprimento de 2048 bytes:
```java
        KeyPairGenerator kpg = KeyPairGenerator.getInstance("RSA");
        kpg.initialize(2048);
        KeyPair kp = kpg.generateKeyPair();
```

Na prática, a chave privada é geralmente gerada previamente e armazenada em um arquivo KeyStore com um certificado de chave pública associado.

##### Criando um Contexto de Assinatura

Criamos um XMLSignContext contendo parâmetros de entrada para gerar a assinatura. Como estamos usando DOM, instanciamos um DOMSignContext (uma subclasse de XMLSignContext), e passamos a ele dois parâmetros, a chave privada que será usada para assinar o documento e a raiz do documento a ser assinado:
```java
        DOMSignContext dsc = new DOMSignContext
            (kp.getPrivate(), doc.getDocumentElement());
```

##### Montando a Assinatura XML

Montamos as diferentes partes do elemento Signature em um objeto XMLSignature. Esses objetos são todos criados e montados usando um objeto XMLSignatureFactory. Uma aplicação obtém uma implementação DOM de XMLSignatureFactory chamando a seguinte linha de código:
```java
        XMLSignatureFactory fac = XMLSignatureFactory.getInstance("DOM");
```

Em seguida, invocamos vários métodos de fábrica para criar as diferentes partes do objeto XMLSignature. Criamos um objeto Reference, passando a ele o seguinte:

  * O URI do objeto a ser assinado (Especificamos um URI de "", o que implica a raiz do documento.)
  * O DigestMethod (usamos SHA256)
  * Uma única Transform, a Transform envelopada, que é necessária para assinaturas envelopadas para que a própria assinatura seja removida antes de calcular o valor da assinatura

```java
        Reference ref = fac.newReference
            ("", fac.newDigestMethod(DigestMethod.SHA256, null),
             List.of
              (fac.newTransform
                (Transform.ENVELOPED, (TransformParameterSpec) null)),
             null, null);
```

Em seguida, criamos o objeto SignedInfo, que é o objeto que é realmente assinado. Ao criar o SignedInfo, passamos como parâmetros:

  * O CanonicalizationMethod (usamos inclusivo e preservamos comentários)
  * O SignatureMethod (usamos RSA)
  * Uma lista de References (neste caso, apenas uma)

```java
        SignedInfo si = fac.newSignedInfo
            (fac.newCanonicalizationMethod
             (CanonicalizationMethod.INCLUSIVE_WITH_COMMENTS,
              (C14NMethodParameterSpec) null),
             fac.newSignatureMethod("http://www.w3.org/2001/04/xmldsig-more#rsa-sha256", null),
             List.of(ref));
```

Em seguida, criamos o objeto KeyInfo opcional, que contém informações que permitem ao destinatário encontrar a chave necessária para validar a assinatura. Neste exemplo, adicionamos um objeto KeyValue contendo a chave pública. Para criar KeyInfo e seus vários subtipos, usamos um objeto KeyInfoFactory, que pode ser obtido invocando o método getKeyInfoFactory do XMLSignatureFactory, da seguinte forma:
```java
        KeyInfoFactory kif = fac.getKeyInfoFactory();
```

Em seguida, usamos o KeyInfoFactory para criar o objeto KeyValue e adicioná-lo a um objeto KeyInfo:
```java
        KeyValue kv = kif.newKeyValue(kp.getPublic());
        KeyInfo ki = kif.newKeyInfo(List.of(kv));
```

Finalmente, criamos o objeto XMLSignature, passando como parâmetros os objetos SignedInfo e KeyInfo que criamos anteriormente:
```java
        XMLSignature signature = fac.newXMLSignature(si, ki);
```

Observe que ainda não geramos a assinatura; faremos isso na próxima etapa.

##### Gerando a Assinatura XML

Agora estamos prontos para gerar a assinatura, o que fazemos invocando o método sign no objeto XMLSignature, e passamos a ele o contexto de assinatura da seguinte forma:
```java
        signature.sign(dsc);
```

O documento resultante agora contém uma assinatura, que foi inserida como o último elemento filho do elemento raiz.

##### Imprimindo ou Exibindo o Documento Resultante

Você pode usar o seguinte código para imprimir o documento assinado resultante em um arquivo ou na saída padrão:
```java
        OutputStream os;
        if (args.length > 1) {
           os = new FileOutputStream(args[1]);
        } else {
           os = System.out;
        }
    
        TransformerFactory tf = TransformerFactory.newInstance();
        Transformer trans = tf.newTransformer();
        trans.transform(new DOMSource(doc), new StreamResult(os));
```