# Atualizações de Segurança

## 3 Atualizações de Segurança

Esta seção fornece detalhes sobre as atualizações de segurança nas versões do JDK.

### Atualizações de Segurança no JDK 25

A seguir estão as atualizações de segurança notáveis no JDK 25:

  * [SHAKE128-256 e SHAKE256-512 como Algoritmos MessageDigest](<https://www.oracle.com/java/technologies/javase/25-relnote-issues.html#JDK-8354305>)

Veja [O Provedor SUN](<https://docs.oracle.com/en/java/javase/25/security/oracle-providers.html#GUID-3A80CC46-91E1-4E47-AC51-CB7B782CEA7D>).

  * [Suporte para HKDF no SunPKCS11](<https://www.oracle.com/java/technologies/javase/25-relnote-issues.html#JDK-8328119>)

Veja [Algoritmos Suportados pelo Provedor SunPKCS11](<https://docs.oracle.com/en/java/javase/25/security/pkcs11-reference-guide1.html#GUID-D3EF9023-7DDC-435D-9186-D2FD05674777>).

  * [Mecanismo para Desabilitar Esquemas de Assinatura Baseados em Seu Escopo TLS](<https://www.oracle.com/java/technologies/javase/25-relnote-issues.html#JDK-8349583>)
  * [Adicionar Suporte para Exportadores de Material de Chave TLS ao JSSE e Provedor SunJSSE](<https://www.oracle.com/java/technologies/javase/25-relnote-issues.html#JDK-8341346>)

Veja [Exportadores de Material de Chave TLS](<https://docs.oracle.com/en/java/javase/25/security/java-secure-socket-extension-jsse-reference-guide.html#GUID-C3F47A8B-4B94-4953-B713-28DDAD7B0279>).

  * [Atualizar XML Security for Java para 3.0.5](<https://www.oracle.com/java/technologies/javase/25-relnote-issues.html#JDK-8344137>)
  * [Validação Aprimorada de Arquivos jar](<https://www.oracle.com/java/technologies/javase/25-relnote-issues.html#JDK-8345431>)

Veja [Notas de Lançamento](<https://www.oracle.com/java/technologies/javase/25-relnote-issues.html>) para informações adicionais sobre mudanças relacionadas à segurança.

### Atualizações de Segurança no JDK 24

A seguir estão as atualizações de segurança notáveis no JDK 24:

  * [Suporte para Inclusão de Arquivos de Propriedades de Segurança](<https://www.oracle.com/java/technologies/javase/24-relnote-issues.html#JDK-8319332>)

Veja [Incluindo um Arquivo de Propriedades de Segurança](<https://docs.oracle.com/en/java/javase/24/security/security-properties-file.html#GUID-FF09EB34-CD27-4D1B-B55B-A4A4E6A0F039>).

  * [Documentar Algoritmos Padrão de Hash e MGF para Assinatura RSASSA-PSS](<https://www.oracle.com/java/technologies/javase/24-relnote-issues.html#JDK-8248981>)

Veja [Nomes de Algoritmos Padrão de Segurança Java](<https://docs.oracle.com/en/java/javase/25/docs/specs/security/standard-names.html>).

  * [Provedor SunPKCS11 Aprimorado para Usar o Mecanismo CKM_AES_CTS Se Suportado pela Biblioteca PKCS11 Nativa](<https://www.oracle.com/java/technologies/javase/24-relnote-issues.html#JDK-8330842>)

Veja [Configuração do SunPKCS11](<https://docs.oracle.com/en/java/javase/24/security/pkcs11-reference-guide1.html#GUID-C4ABFACB-B2C9-4E71-A313-79F881488BB9>) e [Algoritmos Suportados pelo Provedor SunPKCS11](<https://docs.oracle.com/en/java/javase/24/security/pkcs11-reference-guide1.html#GUID-D3EF9023-7DDC-435D-9186-D2FD05674777>).

  * [Contagem Configurável de Novos Tickets de Sessão para TLSv1.3](<https://www.oracle.com/java/technologies/javase/24-relnote-issues.html#JDK-8328608>)

Veja a propriedade de sistema `jdk.tls.server.newSessionTicket` em [Personalizando JSSE](<https://docs.oracle.com/en/java/javase/24/security/java-secure-socket-extension-jsse-reference-guide.html#GUID-A41282C3-19A3-400A-A40F-86F4DA22ABA9>).

  * [Mecanismo para Desabilitar Conjuntos de Cifras TLS por Correspondência de Padrão](<https://www.oracle.com/java/technologies/javase/24-relnote-issues.html#JDK-8341964>)

Veja [Notas de Lançamento](<https://www.oracle.com/java/technologies/javase/24-relnote-issues.html>) para informações adicionais sobre mudanças relacionadas à segurança.

### Atualizações de Segurança no JDK 23

A seguir estão as atualizações de segurança notáveis no JDK 23:

  * [Opções de Thread e Timestamp para a Propriedade de Sistema java.security.debug](<https://www.oracle.com/java/technologies/javase/23-relnote-issues.html#JDK-8051959>)
  * [Habilitar Verificação Case-Sensitive em ccache e keytab para Pesquisa de Entrada Kerberos](<https://www.oracle.com/java/technologies/javase/23-relnote-issues.html#JDK-8331975>)
  * [Suporte para Keystore KeychainStore-ROOT](<https://www.oracle.com/java/technologies/javase/23-relnote-issues.html#JDK-8320362>)

Veja [Notas de Lançamento](<https://www.oracle.com/java/technologies/javase/23-relnote-issues.html>) para informações adicionais sobre mudanças relacionadas à segurança.

### Atualizações de Segurança no JDK 22

A seguir estão as atualizações de segurança notáveis no JDK 22:

  * [Nova Categoria de Segurança para a Opção de Lançador -XshowSettings](<https://www.oracle.com/java/technologies/javase/22-relnote-issues.html#JDK-8281658>)
  * [HSS/LMS: Mudanças em keytool e jarsigner](<https://www.oracle.com/java/technologies/javase/22-relnote-issues.html#JDK-8302233>)
  * [Atualizar XML Security for Java para 3.0.3](<https://www.oracle.com/java/technologies/javase/22-relnote-issues.html#JDK-8319124>)

Veja [Notas de Lançamento](<https://www.oracle.com/java/technologies/javase/22-relnote-issues.html>) para informações adicionais sobre mudanças relacionadas à segurança.

### Atualizações de Segurança no JDK 21

A seguir estão as atualizações de segurança notáveis no JDK 21:

  * [Nova Propriedade de Sistema para Alternar o Modo de Validação Segura de Assinatura XML](<https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8301260>)
  * [Tempos Limites Aprimorados para Busca de OCSP, Certificado e CRL](<https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8179502>)
  * [Suporte para Verificação de Assinatura HSS/LMS](<https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8298127>)
  * [Provedor SunJCE Agora Suporta SHA-512/224 e SHA-512/256 Como Digests para os Algoritmos PBES2](<https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8288050>)
  * [Suporte para Criptografia Baseada em Senha no SunPKCS11](<https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8301553>)
  * [Atualizar XML Security for Java para 3.0.2](<https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8305972>)

Veja [Notas de Lançamento](<https://www.oracle.com/java/technologies/javase/21-relnote-issues.html>) para informações adicionais sobre mudanças relacionadas à segurança.

### Atualizações de Segurança no JDK 20

A seguir estão as atualizações de segurança notáveis no JDK 20:

  * [Novo Evento JFR: jdk.InitialSecurityProperty](<https://www.oracle.com/java/technologies/javase/20-relnote-issues.html#JDK-8292177>)
  * [Novo Evento JFR: jdk.SecurityProviderService](<https://www.oracle.com/java/technologies/javase/20-relnote-issues.html#JDK-8254711>)
  * [Fornecer Intrinsic Poly1305 em plataformas x86_64 com instruções AVX512](<https://www.oracle.com/java/technologies/javase/20-relnote-issues.html#JDK-8288047>)
  * [Fornecer Intrinsics ChaCha20 em Plataformas x86_64 e aarch64](<https://www.oracle.com/java/technologies/javase/20-relnote-issues.html#JDK-8247645>)

Veja [Notas de Lançamento](<https://www.oracle.com/java/technologies/javase/20-relnote-issues.html>) para informações adicionais sobre mudanças relacionadas à segurança.

### Atualizações de Segurança no JDK 19

A seguir estão as atualizações de segurança notáveis no JDK 19:

  * [Windows KeyStore Atualizado para Incluir Acesso ao Local da Máquina Local](<https://www.oracle.com/java/technologies/javase/19-relnote-issues.html#JDK-6782021>)
  * [Dividir SEQUENCE em X509Certificate::getSubjectAlternativeNames e X509Certificate::getIssuerAlternativeNames em otherName](<https://www.oracle.com/java/technologies/javase/19-relnote-issues.html#JDK-8277976>)
  * [Esquemas de Assinatura (D)TLS](<https://www.oracle.com/java/technologies/javase/19-relnote-issues.html#JDK-8280494>)
  * [Novas Opções para ktab para Fornecer Salt Não Padrão](<https://www.oracle.com/java/technologies/javase/19-relnote-issues.html#JDK-8279064>)

Certificados Removidos

Os seguintes certificados ou opções foram removidos do Java SE 19:

  * [Implementação de Finalizer em SSLSocketImpl](<https://www.oracle.com/java/technologies/javase/19-relnote-issues.html#JDK-8212136>)
  * [Implementação ThreadLocal Alternativa das APIs Subject::current e Subject::callAs](<https://www.oracle.com/java/technologies/javase/19-relnote-issues.html#JDK-8282676>)

Veja [Notas de Lançamento](<https://www.oracle.com/java/technologies/javase/19-relnote-issues.html>) para informações adicionais sobre mudanças relacionadas à segurança.

### Atualizações de Segurança no JDK 18

A seguir estão as atualizações de segurança notáveis no JDK 18:

  * [JARs Assinados com SHA-1 Desabilitados](<https://www.oracle.com/java/technologies/javase/18-relnote-issues.html#JDK-8269039>)
  * [Alterar o Valor Padrão da Propriedade de Sistema java.security.manager para disallow](<https://www.oracle.com/java/technologies/javase/18-relnote-issues.html#JDK-8270380>)
  * [X509Certificate.get{Subject,Issuer}AlternativeNames e getExtendedKeyUsage Não Lançam CertificateParsingException se a Extensão Não Puder Ser Analisada](<https://www.oracle.com/java/technologies/javase/18-relnote-issues.html#JDK-8251468>)
  * [Corrigir Problemas com os Modos KW e KWP do Provedor SunJCE](<https://www.oracle.com/java/technologies/javase/18-relnote-issues.html#JDK-8271745>)
  * [Removidos etypes Fracos da Lista Padrão de etypes krb5](<https://www.oracle.com/java/technologies/javase/18-relnote-issues.html#JDK-8273670>)

Certificados Removidos

Os seguintes certificados ou opções foram removidos do Java SE 18:

  * [Certificado Raiz IdenTrust](<https://www.oracle.com/java/technologies/javase/18-relnote-issues.html#JDK-8225082>)
  * [Certificado Raiz GlobalSign do Google](<https://www.oracle.com/java/technologies/javase/18-relnote-issues.html#JDK-8225083>)
  * [default_checksum e safe_checksum_type de krb5.conf](<https://www.oracle.com/java/technologies/javase/18-relnote-issues.html#JDK-8273102>)

Veja [Notas de Lançamento](<https://www.oracle.com/java/technologies/javase/18-relnote-issues.html>) para informações adicionais sobre mudanças relacionadas à segurança.

### Atualizações de Segurança no JDK 17

A seguir estão as atualizações de segurança notáveis no JDK 17:

  * [Suporte para especificar um signatário no comando keytool -genkeypair](<https://www.oracle.com/java/technologies/javase/17-relnote-issues.html#JDK-8260693>)
  * [Provedor SunJCE agora suporta modos KW e KWP com cifra AES](<https://www.oracle.com/java/technologies/javase/17-relnote-issues.html#JDK-8248268>)
  * [Extensões configuráveis com propriedades de sistema](<https://www.oracle.com/java/technologies/javase/17-relnote-issues.html#JDK-8217633>)
  * [Remoção do Certificado CA Sonera Class2 da Telia Company](<https://www.oracle.com/java/technologies/javase/17-relnote-issues.html#JDK-8225081>)

Veja [Notas de Lançamento](<https://www.oracle.com/java/technologies/javase/17-relnote-issues.html>) para informações adicionais sobre mudanças relacionadas à segurança.

### Atualizações de Segurança no JDK 16

A seguir estão as atualizações de segurança notáveis no JDK 16:

  * [Suporte a JAR assinado para RSASSA-PSS e EdDSA](<https://www.oracle.com/java/technologies/javase/16-relnotes.html#JDK-8242068>)
  * [Provedores SUN, SunRsaSign e SunEC suportam algoritmos de assinatura baseados em SHA-3](<https://www.oracle.com/java/technologies/javase/16-relnotes.html#JDK-8172366>)
  * [O provedor SunPKCS11 agora suporta algoritmos relacionados a SHA-3](<https://www.oracle.com/java/technologies/javase/16-relnotes.html#JDK-8242332>)
  * [Suporte TLS para o algoritmo de assinatura EdDSA](<https://www.oracle.com/java/technologies/javase/16-relnotes.html#JDK-8166596>)

Veja [Notas de Lançamento](<https://www.oracle.com/java/technologies/javase/16-relnotes.html>) para informações adicionais sobre mudanças relacionadas à segurança.

### Atualizações de Segurança no JDK 15

A seguir estão as atualizações de segurança notáveis no JDK 15:

  * Um novo esquema de assinatura, Edwards-Curve Digital Signature Algorithm (EdDSA), foi implementado, que é um esquema de assinatura de curva elíptica moderno com várias vantagens sobre os esquemas de assinatura existentes no JDK. Este novo esquema de assinatura não substitui o ECDSA. Veja [JEP 339: Edwards-Curve Digital Signature Algorithm (EdDSA)](<https://openjdk.java.net/jeps/339>).
  * [Provedor SunJCE agora suporta algoritmos Hmac baseados em SHA-3](<https://www.oracle.com/java/technologies/javase/15-relnote-issues.html#JDK-8172680>)
  * [Novas Propriedades de Sistema para Configurar os Esquemas de Assinatura TLS](<https://www.oracle.com/java/technologies/javase/15-relnote-issues.html#JDK-8242141>)
  * [Suportar a extensão certificate_authorities](<https://www.oracle.com/java/technologies/javase/15-relnote-issues.html#JDK-8206925>)

Veja [Notas de Lançamento](<https://www.oracle.com/java/technologies/javase/15-relnote-issues.html>) para informações adicionais sobre mudanças relacionadas à segurança.

### Atualizações de Segurança no JDK 14

A seguir estão as atualizações de segurança notáveis no JDK 14:

  * [Correspondência Exata Necessária para Certificado de Servidor TLS Confiável](<https://www.oracle.com/java/technologies/javase/14-relnote-issues.html#JDK-8227758>)
  * [Novas Verificações em Certificados de Âncora de Confiança](<https://www.oracle.com/java/technologies/javase/14-relnote-issues.html#JDK-8230318>)

Veja [Notas de Lançamento](<https://www.oracle.com/java/technologies/javase/14-relnote-issues.html>) para informações adicionais sobre mudanças relacionadas à segurança.

### Atualizações de Segurança no JDK 13

Os seguintes itens foram removidos do JDK 13:

  * [Modo experimental compatível com FIPS 140 do provedor SunJSSE](<https://www.oracle.com/java/technologies/javase/13-relnote-issues.html#JDK-8217835>)
  * [Serviços RSA duplicados não são mais suportados pelo provedor SunJSSE](<https://www.oracle.com/java/technologies/javase/13-relnote-issues.html#JDK-8220016>)

Remoção de Certificados de Segurança

Os seguintes certificados raiz foram removidos do keystore no JDK 13:

  * [Certificado T-Systems Deutsche Telekom Root CA 2](<https://www.oracle.com/java/technologies/javase/13-relnote-issues.html#JDK-8222137>)
  * [Dois certificados DocuSign Root CA](<https://www.oracle.com/java/technologies/javase/13-relnote-issues.html#JDK-8223499>)
  * [Dois certificados Comodo Root CA](<https://www.oracle.com/java/technologies/javase/13-relnote-issues.html#JDK-8222136>)

### Atualizações de Segurança no JDK 11 e JDK 12

As seguintes atualizações de segurança foram feitas no JDK 11 e JDK 12:

O lançamento do JDK 11 incluiu uma implementação da especificação Transport Layer Security (TLS) 1.3 ([RFC 8446](<https://www.rfc-editor.org/info/rfc8446>)).

TLS 1.3 é a iteração mais recente (agosto de 2018) do protocolo Transport Layer Security (TLS) e é habilitado por padrão no JDK 11. Esta versão foca não apenas em melhorias de velocidade, mas também atualiza a segurança geral do protocolo, enfatizando práticas de criptografia modernas e desabilitando algoritmos criptográficos desatualizados ou fracos. (Por exemplo, troca de chaves RSA e assinaturas DSA simples não são mais permitidas.)

Vários recursos foram adicionados ao protocolo TLS 1.3 para melhorar a compatibilidade com versões anteriores, mas há várias questões das quais você precisa estar ciente. Para detalhes, veja [JEP 332](<http://openjdk.java.net/jeps/332>).

Remoção de Certificados de Segurança

O seguinte certificado raiz foi removido do keystore no JDK 12:

  * [Remoção do GTE CyberTrust Global Root](<https://www.oracle.com/java/technologies/javase/12-relnote-issues.html#JDK-8195793>)

Os seguintes certificados raiz foram removidos do truststore no JDK 11:

  * [Várias CAs Raiz da Symantec](<https://www.oracle.com/java/technologies/javase/11-relnote-issues.html#JDK-8191031>)

  * [CA de Assinatura de Código Baltimore Cybertrust](<https://www.oracle.com/java/technologies/javase/11-relnote-issues.html#JDK-8189949>)

  * [Certificado Raiz SECOM](<https://www.oracle.com/java/technologies/javase/11-relnote-issues.html#JDK-8191844>)

  * [Certificados raiz AOL e Swisscom](<https://www.oracle.com/java/technologies/javase/11-relnote-issues.html#JDK-8203230>)

Produtos que usam certificados que foram removidos podem não funcionar mais. Se esses certificados forem necessários, você deve configurar e preencher o cacerts com os certificados ausentes. Para adicionar certificados ao truststore, veja [keytool](<#/>) no guia Java Development Kit Tool Specifications.

### Atualizações de Segurança no JDK 9 e JDK 10

Alguns padrões relacionados à segurança foram alterados, a partir do JDK 9.

#### O Padrão do Arquivo de Política de Jurisdição JCE é Ilimitado

Se sua aplicação anteriormente exigia os Java Cryptography Extension (JCE) Unlimited Strength Jurisdiction Policy Files, você não precisa mais baixá-los ou instalá-los. Eles estão incluídos no JDK e são ativados por padrão.

Se seu país ou uso exigir uma política mais restritiva, os arquivos de política criptográfica Java limitados ainda estão disponíveis.

Se você tiver requisitos que não são atendidos por nenhum dos arquivos de política fornecidos por padrão, você pode personalizar esses arquivos de política para atender às suas necessidades.

Veja a propriedade de segurança `crypto.policy` no arquivo `<java-home>/conf/security/java.security`, ou [Configuração de Força Criptográfica](<#/>) no Java Platform, Standard Edition Security Developer's Guide.

Aconselha-se que você consulte seu conselheiro ou advogado de controle de exportação/importação para determinar os requisitos exatos.

#### Criar Keystores PKCS12

Recomendamos que você use o formato PKCS12 para seus keystores. Este formato, que é o tipo de keystore padrão, é baseado no padrão RSA PKCS12 Personal Information Exchange Syntax Standard.

Veja [Criando um Keystore para Usar com JSSE](<#/>) no Java Platform, Standard Edition Security Developer's Guide e [keytool](<#/>) no Java Development Kit Tool Specifications.