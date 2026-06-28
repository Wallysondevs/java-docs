# Guia de Programação e Implantação da API Java SASL

## 10 Guia de Programação e Implantação da API Java SASL

Simple Authentication and Security Layer, ou SASL, é um padrão da Internet ([RFC 2222](<http://www.ietf.org/rfc/rfc2222.txt>)) que especifica um protocolo para autenticação e estabelecimento opcional de uma camada de segurança entre aplicações cliente e servidor. O SASL define como os dados de autenticação devem ser trocados, mas não especifica o conteúdo desses dados. É uma estrutura na qual mecanismos de autenticação específicos, que especificam o conteúdo e a semântica dos dados de autenticação, podem se encaixar.

O SASL é usado por protocolos, como o [Lightweight Directory Access Protocol, versão 3 (LDAP v3)](<http://www.ietf.org/rfc/rfc2251.txt>), e o [Internet Message Access Protocol, versão 4 (IMAP v4)](<http://www.ietf.org/rfc/rfc2060.txt>) para permitir autenticação plugável. Em vez de incorporar um método de autenticação diretamente no protocolo, o LDAP v3 e o IMAP v4 usam o SASL para realizar a autenticação, permitindo assim a autenticação por meio de vários mecanismos SASL.

Existem vários mecanismos SASL padrão definidos pela comunidade da Internet para vários níveis de segurança e cenários de implantação. Estes variam de nenhuma segurança (por exemplo, autenticação anônima) a alta segurança (por exemplo, autenticação Kerberos) e níveis intermediários.

A API Java SASL

A API Java SASL define classes e interfaces para aplicações que usam mecanismos SASL. Ela é definida para ser neutra em relação ao mecanismo: a aplicação que usa a API não precisa ser codificada para usar nenhum mecanismo SASL específico. A API suporta tanto aplicações cliente quanto servidor. Ela permite que as aplicações selecionem o mecanismo a ser usado com base nos recursos de segurança desejados, como se são suscetíveis a ataques de dicionário passivos ou se aceitam autenticação anônima.

A API Java SASL também permite que os desenvolvedores usem seus próprios mecanismos SASL personalizados. Os mecanismos SASL são instalados usando a Java Cryptography Architecture (JCA); veja [Java Cryptography Architecture (JCA) Reference Guide](<#/doc/guides/security/java-cryptography-architecture-jca-reference-guide> "A Java Cryptography Architecture \(JCA\) é uma parte importante da plataforma e contém uma arquitetura de "provedor" e um conjunto de APIs para assinaturas digitais, resumos de mensagens \(hashes\), certificados e validação de certificados, criptografia \(cifras de bloco/fluxo simétricas/assimétricas\), geração e gerenciamento de chaves e geração segura de números aleatórios, para citar alguns.").

Quando Usar SASL

O SASL fornece uma camada de autenticação e segurança plugável para aplicações de rede. Existem outros recursos no Java SE que fornecem funcionalidade semelhante, incluindo Java Secure Socket Extension (JSSE) (veja [Java Secure Socket Extension (JSSE) Reference Guide](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>)) e o [Java Generic Security Service](<http://www.ietf.org/rfc/rfc2853.txt>). O JSSE fornece uma estrutura e uma implementação para uma versão em linguagem Java dos protocolos SSL, TLS e DTLS. O Java GSS são as ligações da linguagem Java para a [Generic Security Service Application Programming Interface (GSS-API)](<http://www.ietf.org/rfc/rfc2743.txt>). O único mecanismo atualmente suportado por esta API no Java SE é o Kerberos v5.

Com exceção da definição e construção de protocolos do zero, a definição do protocolo é frequentemente o maior fator que determina qual API usar. Quando comparado com JSSE e Java GSS, o SASL é relativamente leve e popular entre alguns protocolos. Ele também tem a vantagem de que vários mecanismos SASL populares e leves (em termos de suporte de infraestrutura) foram definidos. Os mecanismos primários do JSSE e Java GSS, por outro lado, possuem mecanismos relativamente pesados que exigem infraestruturas mais elaboradas (Public Key Infrastructure e Kerberos, respectivamente).

SASL, JSSE e Java GSS são frequentemente usados juntos. Por exemplo, um padrão comum é uma aplicação usar JSSE para estabelecer um canal seguro e usar SASL para autenticação baseada em cliente, nome de usuário/senha. Existem também mecanismos SASL em camadas sobre mecanismos GSS-API; um exemplo popular é um mecanismo SASL GSS-API/Kerberos v5 que é usado com LDAP.

Com exceção da definição e construção de protocolos do zero, a definição do protocolo é frequentemente o maior fator na determinação de qual API usar. Por exemplo, LDAP e IMAP são definidos para usar SASL, então o software relacionado a esses protocolos deve usar a API Java SASL. Ao construir aplicações e serviços Kerberos, a API a ser usada é Java GSS. Ao construir aplicações e serviços que usam SSL/TLS como seu protocolo, a API a ser usada é JSSE.

### Visão Geral da API Java SASL

O SASL é um protocolo de desafio-resposta. O servidor emite um desafio para o cliente, e o cliente envia uma resposta baseada no desafio. Essa troca continua até que o servidor esteja satisfeito e não emita mais desafios. Esses desafios e respostas são tokens binários de comprimento arbitrário. O protocolo encapsulador (como LDAP ou IMAP) especifica como esses tokens são codificados e trocados. Por exemplo, o LDAP especifica como os tokens SASL são encapsulados em requisições e respostas de bind do LDAP.

A API Java SASL é modelada de acordo com este estilo de interação e uso. Ela possui interfaces, `SaslClient` e `SaslServer`, que representam mecanismos do lado do cliente e do lado do servidor, respectivamente. A aplicação interage com os mecanismos por meio de arrays de bytes que representam os desafios e as respostas. O mecanismo do lado do servidor itera, emitindo desafios e processando respostas, até estar satisfeito, enquanto o mecanismo do lado do cliente itera, avaliando desafios e emitindo respostas, até que o servidor esteja satisfeito. A aplicação que está usando o mecanismo impulsiona cada iteração. Ou seja, ela extrai o desafio ou a resposta de um pacote de protocolo e o fornece ao mecanismo, e então coloca a resposta ou o desafio retornado pelo mecanismo em um pacote de protocolo e o envia ao par.

#### Criando os Mecanismos

O código cliente e servidor que usa os mecanismos SASL não é codificado para usar mecanismos específicos. Em muitos protocolos que usam SASL, o servidor anuncia (estática ou dinamicamente) uma lista de mecanismos SASL que ele suporta. O cliente então seleciona um deles com base em seus requisitos de segurança.

A classe [Sasl](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html>) é usada para criar instâncias de [SaslClient](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/SaslClient.html>) e [SaslServer](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/SaslServer.html>). Aqui está um exemplo de como uma aplicação cria um mecanismo cliente SASL usando uma lista de possíveis mecanismos SASL.
```java
        String[] mechanisms = new String[]{"DIGEST-MD5", "PLAIN"}; 
        SaslClient sc = Sasl.createSaslClient(
            mechanisms, authzid, protocol, serverName, props, callbackHandler);
    
```

Com base na disponibilidade dos mecanismos suportados pela plataforma e outras informações de configuração fornecidas por meio dos parâmetros, o framework Java SASL seleciona um dos mecanismos listados e retorna uma instância de [SaslClient](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/SaslClient.html>).

O nome do mecanismo selecionado é geralmente transmitido ao servidor por meio do protocolo da aplicação. Ao receber o nome do mecanismo, o servidor cria um objeto [SaslServer](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/SaslServer.html>) correspondente para processar as respostas enviadas pelo cliente. Aqui está um exemplo de como o servidor criaria uma instância de [SaslServer](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/SaslServer.html>).
```java
        SaslServer ss = Sasl.createSaslServer(
            mechanism, protocol, myName, props, callbackHandler);
    
```

#### Passando Entrada para os Mecanismos

Como a API Java SASL é um framework geral, ela deve ser capaz de acomodar muitos tipos diferentes de mecanismos. Cada mecanismo precisa ser inicializado com entrada e pode precisar de entrada para progredir. A API fornece três meios pelos quais uma aplicação fornece entrada a um mecanismo:

1.  Parâmetros de entrada comuns: A aplicação usa parâmetros predefinidos para fornecer informações que são definidas pela especificação SASL e comumente exigidas pelos mecanismos. Para mecanismos [SaslClient](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/SaslClient.html>), os parâmetros de entrada são id de autorização, id de protocolo e nome do servidor. Para mecanismos [SaslServer](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/SaslServer.html>), os parâmetros de entrada comuns são id de protocolo e (seu próprio nome de servidor totalmente qualificado).

2.  Parâmetro de propriedades: A aplicação usa o parâmetro de propriedades, um mapeamento de nomes de propriedades para valores de propriedades (possivelmente não-string), para fornecer informações de configuração. A API Java SASL define algumas propriedades padrão, como [Sasl.QOP](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#QOP>) (qualidade de proteção), [Sasl.STRENGTH](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#STRENGTH>) (força da cifra) e [Sasl.MAX_BUFFER](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#MAX_BUFFER>) (tamanho máximo do buffer). O parâmetro também pode ser usado para passar propriedades não-padrão que são específicas para mecanismos particulares.

3.  Callbacks: A aplicação usa o parâmetro [CallbackHandler](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/CallbackHandler.html>) para fornecer entrada que não pode ser predeterminada ou pode não ser comum entre os mecanismos. Quando um mecanismo requer dados de entrada, ele usa o manipulador de callback fornecido pela aplicação para coletar os dados, possivelmente do usuário final da aplicação. Por exemplo, um mecanismo pode exigir que o usuário final da aplicação forneça um nome e uma senha.

Os mecanismos podem usar os callbacks definidos no pacote [javax.security.auth.callback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/package-summary.html>); estes são callbacks genéricos úteis para construir aplicações que realizam autenticação. Os mecanismos também podem precisar de callbacks específicos do SASL, como aqueles para coletar informações de realm e autorização, ou até mesmo callbacks específicos do mecanismo (não padronizados). A aplicação deve ser capaz de acomodar uma variedade de mecanismos. Consequentemente, seu manipulador de callback deve ser capaz de atender a todos os callbacks que os mecanismos possam solicitar. Isso não é possível em geral para mecanismos arbitrários, mas geralmente é viável devido ao número limitado de mecanismos que são tipicamente implantados e usados.

#### Usando os Mecanismos

Uma vez que a aplicação tenha criado um mecanismo, ela o usa para obter tokens SASL para trocar com o par. O cliente tipicamente indica ao servidor, por meio do protocolo da aplicação, qual mecanismo usar. Alguns protocolos permitem que o cliente acompanhe a requisição com uma resposta inicial opcional para mecanismos que possuem uma resposta inicial. Este recurso pode ser usado para diminuir o número de trocas de mensagens necessárias para a autenticação. Aqui está um exemplo de como um cliente pode usar [SaslClient](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/SaslClient.html>) para autenticação.
```java
        // Get optional initial response
        byte[] response = 
            (sc.hasInitialResponse() ? sc.evaluateChallenge(new byte[]) : null);
    
        String mechanism = sc.getMechanismName();
    
        // Send selected mechanism name and optional initial response to server
        send(mechanism, response);
    
        // Read response
        msg = receive();
        while (!sc.isComplete() && (msg.status == CONTINUE || msg.status == SUCCESS)) {
            // Evaluate server challenge
            response = sc.evaluateChallenge(msg.contents);
    
            if (msg.status == SUCCESS) {
                // done; server doesn't expect any more SASL data
                 if (response != null) {
                    throw new IOException(
                        "Protocol error: attempting to send response after completion");
                } 
                break;
            } else {
                send(mechanism, response);
                msg = receive();
            }
        }  
    
```

A aplicação cliente itera por cada etapa da autenticação usando o mecanismo (`sc`) para avaliar o desafio obtido do servidor e para obter uma resposta para enviar de volta ao servidor. Ela continua este ciclo até que o mecanismo ou o protocolo de nível de aplicação indique que a autenticação foi concluída, ou se o mecanismo não puder avaliar um desafio. Se o mecanismo não puder avaliar o desafio, ele lança uma exceção para indicar o erro e encerra a autenticação. A discordância entre o mecanismo e o protocolo sobre o estado de conclusão deve ser tratada como um erro porque pode indicar um comprometimento da troca de autenticação.

Aqui está um exemplo de como um servidor pode usar [SaslServer](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/SaslServer.html>).
```java
        // Read request that contains mechanism name and optional initial response
        msg.receive();
    
        // Obtain a SaslServer to perform authentication
        SaslServer ss = Sasl.createSaslServer(msg.mechanism, 
            protocol, myName, props, callbackHandler);
    
        // Perform authentication steps until done
        while (!ss.isComplete()) {
            try {
                // Process response
                byte[] challenge = sc.evaluateResponse(msg.contents);
    
                if (ss.isComplete()) {
                    send(mechanism, challenge, SUCCESS);
                } else {
                    send(mechanism, challenge, CONTINUE);
                    msg.receive();
                } 
            } catch (SaslException e) {
                send(ERROR);
                sc.dispose();
                break;
            }
        }
    
```

A aplicação servidor itera por cada etapa da autenticação, fornecendo a resposta do cliente ao mecanismo (`ss`) para processar. Se a resposta estiver incorreta, o mecanismo indica o erro lançando uma [SaslException](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/SaslException.html>) para que o servidor possa relatar o erro e encerrar a autenticação. Se a resposta estiver correta, o mecanismo retorna dados de desafio a serem enviados ao cliente e indica se a autenticação está completa. Observe que os dados de desafio podem acompanhar uma indicação de "sucesso". Isso pode ser usado, por exemplo, para instruir o cliente a finalizar algum estado negociado.

#### Usando a Camada de Segurança Negociada

Alguns mecanismos SASL suportam apenas autenticação, enquanto outros suportam o uso de uma camada de segurança negociada após a autenticação. O recurso de camada de segurança frequentemente não é usado quando a aplicação utiliza outros meios, como SSL/TLS, para se comunicar de forma segura com o par.

Quando uma camada de segurança foi negociada, toda a comunicação subsequente com o par deve ocorrer usando a camada de segurança. Para determinar se uma camada de segurança foi negociada, obtenha a propriedade [`Sasl.QOP`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#QOP>) negociada do mecanismo. Aqui está um exemplo de como determinar se uma camada de segurança foi negociada.
```java
    String qop = (String) sc.getNegotiatedProperty(Sasl.QOP);
    boolean hasSecurityLayer = (qop != null && 
        (qop.equals("auth-int") || qop.equals("auth-conf")));
    
```

Uma camada de segurança foi negociada se a propriedade [`Sasl.QOP`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#QOP>) indicar que integridade e/ou confidencialidade foram negociadas.

Para se comunicar com o par usando a camada negociada, a aplicação primeiro usa o método [`wrap`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/SaslClient.html#unwrap\(byte%5B%5D,int,int\)>) para codificar os dados a serem enviados ao par e produzir um buffer "envolvido" (wrapped). Em seguida, ela transfere um campo de comprimento representando o número de octetos no buffer envolvido, seguido pelo conteúdo do buffer envolvido, para o par. O par que recebe o fluxo de octetos passa o buffer (sem o campo de comprimento) para [`unwrap`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/SaslClient.html#unwrap\(byte\[\],int,int\)>) para obter os bytes decodificados enviados pelo par. Detalhes deste protocolo são descritos na [RFC 2222](<http://www.ietf.org/rfc/rfc2222.txt>). [Exemplo 10-1](<#/doc/guides/security/java-sasl-api-programming-and-deployment-guide1>) ilustra como uma aplicação cliente envia e recebe dados de aplicação usando uma camada de segurança.

Exemplo 10-1 Código de Exemplo para Envio e Recebimento de Dados do Cliente SASL
```java
    // Send outgoing application data to peer
    byte[] outgoing = ...;
    byte[] netOut = sc.wrap(outgoing, 0, outgoing.length);
    
    send(netOut.length, netOut);   // send to peer
    
    // Receive incoming application data from peer
    byte[] netIn = receive();      // read length and ensuing bytes from peer
    
    byte[] incoming = sc.unwrap(netIn, 0, netIn.length);
    
```

### Como os Mecanismos SASL são Instalados e Selecionados

As implementações de mecanismos SASL são fornecidas por provedores de segurança SASL. Cada provedor pode suportar um ou mais mecanismos SASL e é registrado no JCA.

Por padrão, o provedor SunSASL é automaticamente registrado como um provedor JCA. Para removê-lo ou reordenar sua prioridade como provedor JCA, altere a linha
```
    security.provider.7=SunSASL
```

no arquivo de propriedades de segurança Java (`java-home/conf/security/java.security`).

Para adicionar ou remover um provedor SASL, você adiciona ou remove a linha correspondente no arquivo de propriedades de segurança. Por exemplo, se você deseja adicionar um provedor SASL e fazer com que seus mecanismos sejam escolhidos em vez dos mesmos implementados pelo provedor SunSASL, então você adicionaria uma linha ao arquivo de propriedades de segurança com um número menor.
```
    security.provider.7=com.example.MyProvider
    security.provider.8=SunSASL
```

Alternativamente, você pode adicionar programaticamente seu próprio provedor usando a classe `java.security.Security`. Por exemplo, o seguinte código de exemplo registra o `com.example.MyProvider` na lista de provedores de segurança SASL disponíveis.
```java
    Security.addProvider(new com.example.MyProvider());
    
```

Veja [Step 8: Prepare for Testing](<#/doc/guides/security/howtoimplaprovider>) em [Steps to Implement and Integrate a Provider](<#/doc/guides/security/howtoimplaprovider>) para mais informações sobre como adicionar provedores ao arquivo de propriedades de segurança e adicionar programaticamente seus próprios provedores.

Quando uma aplicação solicita um mecanismo SASL fornecendo um ou mais nomes de mecanismo, o framework SASL procura por provedores SASL registrados que suportam esse mecanismo, percorrendo, em ordem, a lista de provedores registrados. Os provedores devem então determinar se o mecanismo solicitado corresponde às propriedades da política de seleção em [`Sasl`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html>) e, se sim, retornar uma implementação para o mecanismo.

As propriedades da política de seleção especificam os aspectos de segurança de um mecanismo, como sua suscetibilidade a certos ataques. Estas são características do mecanismo (definição), e não de sua implementação, então todos os provedores devem chegar à mesma conclusão sobre um mecanismo particular. Por exemplo, o mecanismo PLAIN é suscetível a ataques de texto simples, independentemente de como é implementado. Se nenhuma propriedade de política de seleção for fornecida, não há restrições sobre o mecanismo selecionado. Usando essas propriedades, uma aplicação pode garantir que não use mecanismos inadequados que possam ser implantados no ambiente de execução. Por exemplo, uma aplicação pode usar o seguinte código de exemplo se não quiser permitir o uso de mecanismos suscetíveis a ataques de texto simples.
```java
        Map<String, String> props = new HashMap<>();
        props.put(Sasl.POLICY_NOPLAINTEXT, "true");
        SaslClient sc = Sasl.createSaslClient(
            mechanisms, authzid, protocol, serverName, props, callbackHandler);
    
```

### O Provedor SunSASL

O provedor SunSASL suporta os seguintes mecanismos cliente e servidor:

*   Mecanismos Cliente
    *   PLAIN ([RFC 2595](<http://www.ietf.org/rfc/rfc2595.txt>)). Este mecanismo suporta autenticação de nome de usuário/senha em texto claro.
    *   CRAM-MD5 ([RFC 2195](<http://www.ietf.org/rfc/rfc2195.txt>)). Este mecanismo suporta um esquema de autenticação de nome de usuário/senha com hash.
    *   DIGEST-MD5 ([RFC 2831](<http://www.ietf.org/rfc/rfc2831.txt>)). Este mecanismo define como a Autenticação Digest HTTP pode ser usada como um mecanismo SASL.
    *   EXTERNAL ([RFC 2222](<http://www.ietf.org/rfc/rfc2222.txt>)). Este mecanismo obtém informações de autenticação de um canal externo (como TLS ou IPsec).
    *   NTLM. Este mecanismo suporta autenticação NTLM.
*   Mecanismos Servidor
    *   CRAM-MD5
    *   DIGEST-MD5
    *   NTLM

#### Mecanismos Cliente do Provedor SunSASL

O provedor SunSASL suporta vários mecanismos cliente SASL usados em protocolos populares como LDAP, IMAP e SMTP.

A tabela a seguir resume os mecanismos cliente e suas entradas necessárias.

Tabela 10-1 Mecanismos Cliente do Provedor SunSASL

| Nome do Mecanismo Cliente | Parâmetros/Entrada | Callbacks | Propriedades de Configuração | Política de Seleção |
|---|---|---|---|---|
| [CRAM-MD5](<#/doc/guides/security/java-sasl-api-programming-and-deployment-guide1>) | authorization id (as default user name) | [PasswordCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/PasswordCallback.html>) [NameCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/NameCallback.html>) | None | [Sasl.POLICY_NOANONYMOUS](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#POLICY_NOANONYMOUS>) [Sasl.POLICY_NOPLAINTEXT](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#POLICY_NOPLAINTEXT>) |
| [DIGEST-MD5](<#/doc/guides/security/java-sasl-api-programming-and-deployment-guide1>) | authorization id protocol id server name | [NameCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/NameCallback.html>) [PasswordCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/PasswordCallback.html>) [RealmCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/RealmCallback.html>) [RealmChoiceCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/RealmChoiceCallback.html>) | [Sasl.QOP](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#QOP>) [Sasl.STRENGTH](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#STRENGTH>) [Sasl.MAX_BUFFER](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#MAX_BUFFER>) [Sasl.SERVER_AUTH](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#SERVER_AUTH>) `javax.security.sasl.sendmaxbuffer` `com.sun.security.sasl.digest.cipher` | [Sasl.POLICY_NOANONYMOUS](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#POLICY_NOANONYMOUS>) [Sasl.POLICY_NOPLAINTEXT](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#POLICY_NOPLAINTEXT>) |
| EXTERNAL | authorization id external channel | None | None | [Sasl.POLICY_NOPLAINTEXT](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#POLICY_NOPLAINTEXT>) [Sasl.POLICY_NOACTIVE](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#POLICY_NOACTIVE>) [Sasl.POLICY_NODICTIONARY](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#POLICY_NODICTIONARY>) |
| [NTLM](<#/doc/guides/security/java-sasl-api-programming-and-deployment-guide1>) | authzId (as default user name) serverName (as default domain) | [RealmCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/RealmCallback.html>) [NameCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/NameCallback.html>) [PasswordCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/PasswordCallback.html>) | [Sasl.QOP](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#QOP>) `com.sun.security.sasl.ntlm.version` `com.sun.security.sasl.ntlm.random` `com.sun.security.sasl.ntlm.hostname` | [Sasl.POLICY_NOANONYMOUS](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#POLICY_NOANONYMOUS>) [Sasl.POLICY_NOPLAINTEXT](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#POLICY_NOPLAINTEXT>) |
| PLAIN | authorization id | [`NameCallback`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/NameCallback.html>) [PasswordCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/PasswordCallback.html>) | None | [`Sasl.POLICY_NOANONYMOUS`](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#POLICY_NOANONYMOUS>) |

Uma aplicação que usa esses mecanismos do provedor SunSASL deve fornecer os parâmetros, callbacks e propriedades necessários. As propriedades têm valores padrão razoáveis e só precisam ser definidas se a aplicação quiser substituir os padrões. A maioria dos parâmetros, callbacks e propriedades são descritos na documentação da API. As seções a seguir descrevem comportamentos e parâmetros específicos do mecanismo que ainda não foram abordados pela documentação da API.

Cram-MD5

O mecanismo cliente Cram-MD5 usa o parâmetro `authorization id`, se fornecido, como o nome de usuário padrão no `NameCallback` para solicitar à aplicação/usuário final o id de autenticação. O `authorization id` não é usado de outra forma pelo mecanismo Cram-MD5; apenas o id de autenticação é trocado com o servidor.

Digest-MD5

O mecanismo Digest-MD5 é usado para autenticação digest e estabelecimento opcional de uma camada de segurança. Ele especifica as seguintes cifras para uso com a camada de segurança: Triple DES, DES e RC4 (128, 56 e 40 bits). O mecanismo Digest-MD5 pode suportar apenas cifras que estão disponíveis na plataforma. Por exemplo, se a plataforma não suporta as cifras RC4, então o mecanismo Digest-MD5 não usará essas cifras.

A propriedade `Sasl.STRENGTH` suporta as configurações `high`, `medium` e `low`; seu padrão é `high,medium,low`. As cifras são mapeadas para as configurações de força da seguinte forma:

Tabela 10-2 Força da Cifra

| Força | Cifra | Id da Cifra |
|---|---|---|
| high | Triple DES RC4 128 bits | 3des rc4 |
| medium | DES RC4 56 bits | des rc4-56 |
| low | RC4 40 bits | rc4-40 |

Quando há mais de uma escolha para uma determinada força, a cifra selecionada depende da disponibilidade das cifras na plataforma subjacente. Para nomear explicitamente a cifra a ser usada, defina a propriedade `com.sun.security.sasl.digest.cipher` para o id da cifra correspondente. Observe que esta configuração de propriedade deve ser compatível com `Sasl.STRENGTH` e as cifras disponíveis na plataforma subjacente. Por exemplo, `Sasl.STRENGTH` definido como `low` e `com.sun.security.sasl.digest.cipher` definido como `3des` são incompatíveis. A propriedade `com.sun.security.sasl.digest.cipher` não tem valor padrão.

A propriedade `javax.security.sasl.sendmaxbuffer` especifica (a representação em string de) o tamanho máximo do buffer de envio em bytes. O padrão é 65536. O número máximo real de bytes será o mínimo entre este número e o tamanho máximo do buffer de recebimento do par.

NTLM

Nota:

Esta seção se aplica tanto ao mecanismo cliente NTLM quanto ao mecanismo servidor NTLM.

NT LAN Manager (NTLM) é um protocolo de segurança da Microsoft usado para acessar seus vários serviços, como IIS Web Server e Exchange Mail Server. Como um mecanismo SASL, ele pode ser usado para acessar o Microsoft Exchange Server. Também é útil para autenticação HTTP com o esquema NTLM.

O mecanismo NTLM é usado para autenticação NTLM. Ele não fornece uma camada de segurança. Isso significa que você só pode definir a propriedade de ambiente `javax.security.sasl.qop` como `auth`.

Se o valor do registro `LMCompatibilityLevel` for definido como um valor alto no servidor, certas requisições de baixo valor não são suportadas. No entanto, não há protocolo para o servidor informar o cliente para usar uma versão superior, então o usuário deve escolher manualmente a versão correta no lado do cliente.

Defina a propriedade de sistema `ntlm.debug` para qualquer valor para ativar a depuração.

Forneça as seguintes informações na criação do mecanismo ou por meio de callbacks:

Tabela 10-3 Informações Necessárias para NTLM

| Informação | Tipo | Obrigatório ou Opcional | Descrição |
|---|---|---|---|
| Name | String | Required | Provided through [NameCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/NameCallback.html>) with the authzid input argument as the default value |
| Password | char[] | Required | Provided through [PasswordCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/PasswordCallback.html>)If the password contains non-ASCII characters, the original LM version might fail. In this case, do not choose LM as the version. |
| Domain | String | Optional | Provided through [RealmCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/RealmCallback.html>) with the serverName input argument as the default value. The domain provided on the client side is used to create the Type 1 message. The negotiated property `com.sun.security.sasl.ntlm.domain` is determined by the server's Type 2 message. |
| NTLM version | String | Optional | Specifies a specific version to use. Provided through the `com.sun.security.sasl.ntlm.version` property. It can have one of the following values: <br> * `LM/NTLM`: Original NTLM v1 <br> * `LM`: Original NTLM v1, LM only <br> * `NTLM`: Original NTLM v1, NTLM only |
*   `NTLM2`: NTLM v1 com Desafio do Cliente
*   `LMv2/NTLMv2`: NTLM v2
*   `LMv2`: NTLM v2, apenas LM
*   `NTLMv2`: NTLM v2, apenas NTLM

Se não for fornecido, a propriedade de sistema `ntlm.version` é usada. Se ainda não for fornecido, o valor `LMv2/NTLMv2` é usado, e no lado do servidor, todos os valores são aceitos. Nota: esses tipos são diferentes apenas no lado do cliente. No lado do servidor, como a autenticação é bem-sucedida se apenas um dos LM (ou LMv2) ou NTLM (ou NTLMv2) for verificado, os três primeiros tipos são efetivamente os mesmos; isso também é verdade para os três últimos tipos.
Nome do host | String | Opcional | Fornecido através da propriedade `com.sun.security.sasl.ntlm.hostname`, que será enviada ao servidor. Se não for fornecido, o sistema derivará automaticamente um nome de host. Esta propriedade é usada apenas no lado do cliente.
Fonte aleatória | java.util.Random | Opcional | Usada como fonte aleatória para derivar bytes nonce. Fornecida através da propriedade `com.sun.security.sasl.ntlm.random`. Se não for fornecido, um objeto `java.util.Random` interno é usado.

Após a autenticação, o cliente receberá uma propriedade negociada chamada `com.sun.security.sasl.html.domain`, que é fornecida pelo servidor, e o servidor receberá uma propriedade negociada chamada `com.sun.security.sasl.ntlm.hostname`, que é o nome do host que o cliente usou para acessar este servidor.

#### Mecanismos de Servidor do Provedor SunSASL

O provedor SunSASL suporta vários mecanismos de servidor SASL usados em protocolos populares como LDAP, IMAP e SMTP.

A tabela a seguir resume os mecanismos de servidor e a entrada necessária:

Tabela 10-4 Mecanismos de Servidor

Nome do Mecanismo de Servidor | Parâmetros/Entrada | Callbacks | Propriedades de Configuração | Política de Seleção
---|---|---|---|---
[CRAM-MD5](<#/doc/guides/security/java-sasl-api-programming-and-deployment-guide1>) | nome do servidor | [AuthorizeCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/AuthorizeCallback.html>) [NameCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/NameCallback.html>) [PasswordCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/PasswordCallback.html>) | Nenhum | [Sasl.POLICY_NOANONYMOUS](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#POLICY_NOANONYMOUS>) [Sasl.POLICY_NOPLAINTEXT](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#POLICY_NOPLAINTEXT>)
[DIGEST-MD5](<#/doc/guides/security/java-sasl-api-programming-and-deployment-guide1>) | id do protocolo nome do servidor | [AuthorizeCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/AuthorizeCallback.html>) [NameCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/NameCallback.html>) [PasswordCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/PasswordCallback.html>) [RealmCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/RealmCallback.html>) | [Sasl.QOP](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#QOP>) [Sasl.STRENGTH](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#STRENGTH>) [Sasl.MAX_BUFFER](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#MAX_BUFFER>) `javax.security.sasl.sendmaxbuffer` `com.sun.security.sasl.digest.realm` `com.sun.security.sasl.digest.utf8` | [Sasl.POLICY_NOANONYMOUS](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#POLICY_NOANONYMOUS>) [Sasl.POLICY_NOPLAINTEXT](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#POLICY_NOPLAINTEXT>)
[NTLM](<#/doc/guides/security/java-sasl-api-programming-and-deployment-guide1>) | `serverName` (como domínio, pode ser substituído por propriedades) | [RealmCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/RealmCallback.html>), fornecendo o domínio do usuário da requisição [NameCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/NameCallback.html>), fornecendo o nome do usuário da requisição [PasswordCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/PasswordCallback.html>) | [Sasl.QOP](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#QOP>) `com.sun.security.sasl.ntlm.random` `com.sun.security.sasl.ntlm.version` `com.sun.security.sasl.ntlm.domain` | [Sasl.POLICY_NOANONYMOUS](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#POLICY_NOANONYMOUS>) [Sasl.POLICY_NOPLAINTEXT](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#POLICY_NOPLAINTEXT>)

Uma aplicação que usa esses mecanismos do provedor SunSASL deve fornecer os parâmetros, callbacks e propriedades necessários. As propriedades têm valores padrão razoáveis e só precisam ser definidas se a aplicação desejar substituir os padrões.

Todos os usuários de mecanismos de servidor devem ter um `callback handler` que lide com o `AuthorizeCallback`. Isso é usado pelos mecanismos para determinar se o usuário autenticado tem permissão para agir em nome do ID de autorização solicitado, e também para obter o nome canônico do usuário autorizado (se a canonicalização for aplicável).

A maioria dos parâmetros, callbacks e propriedades são descritos na documentação da API. As seções a seguir descrevem comportamentos e parâmetros específicos do mecanismo que ainda não foram abordados pela documentação da API.

Cram-MD5

O mecanismo de servidor Cram-MD5 usa `NameCallback` e `PasswordCallback` para obter a senha necessária para verificar a resposta do cliente SASL. O `callback handler` deve usar `NameCallback.getDefaultName()` como chave para buscar a senha.

Digest-MD5

O mecanismo de servidor Digest-MD5 usa `RealmCallback`, `NameCallback` e `PasswordCallback` para obter a senha necessária para verificar a resposta do cliente SASL. O `callback handler` deve usar `RealmCallback.getDefaultText()` e `NameCallback.getDefaultName()` como chaves para buscar a senha.

A propriedade `javax.security.sasl.sendmaxbuffer` especifica (a representação em string de) o tamanho máximo do buffer de envio em bytes. O padrão é 65536. O número máximo real de bytes será o mínimo entre este número e o tamanho máximo do buffer de recebimento do par.

A propriedade `com.sun.security.sasl.digest.realm` é usada para especificar uma lista de nomes de realm separados por espaço que o servidor suporta. A lista é enviada ao cliente como parte do desafio. Se esta propriedade não tiver sido definida, o realm padrão é o nome do servidor (fornecido como parâmetro).

A propriedade `com.sun.security.sasl.digest.utf8` é usada para especificar a codificação de caracteres a ser usada. O valor `true` significa usar codificação UTF-8; o valor `false` significa usar ISO Latin 1 (ISO-8859-1). O valor padrão é `true`.

### O Provedor JdkSASL

O provedor JdkSASL suporta os seguintes mecanismos de cliente e servidor:

  * Mecanismos de Cliente
    * GSSAPI ([RFC 2222](<http://www.ietf.org/rfc/rfc2222.txt>)). Este mecanismo usa o [GSSAPI](<http://www.ietf.org/rfc/rfc2078.txt>) para obter informações de autenticação. Ele suporta autenticação Kerberos v5.
  * Mecanismos de Servidor
    * GSSAPI (Kerberos v5)

#### Mecanismo de Cliente do Provedor JdkSASL

O provedor JdkSASL suporta o mecanismo de cliente GSSAPI usado em protocolos populares como LDAP, IMAP e SMTP.

A tabela a seguir resume o mecanismo de cliente GSSAPI e sua entrada necessária.

Tabela 10-5 Mecanismo de Cliente do Provedor JdkSASL

Nome do Mecanismo de Cliente | Parâmetros/Entrada | Callbacks | Propriedades de Configuração | Política de Seleção
---|---|---|---|---
[GSSAPI](<#/doc/guides/security/java-sasl-api-programming-and-deployment-guide1>) | `JAAS Subject` id de autorização id do protocolo nome do servidor | Nenhum | [Sasl.QOP](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#QOP>) [Sasl.MAX_BUFFER](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#MAX_BUFFER>) [Sasl.SERVER_AUTH](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#SERVER_AUTH>) `javax.security.sasl.sendmaxbuffer` `com.sun.security.jgss.inquiretype.type_name` | [Sasl.POLICY_NOACTIVE](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#POLICY_NOACTIVE>) [Sasl.POLICY_NOANONYMOUS](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#POLICY_NOANONYMOUS>) [Sasl.POLICY_NOPLAINTEXT](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#POLICY_NOPLAINTEXT>)

Uma aplicação que usa o mecanismo GSSAPI do provedor JdkSASL deve fornecer os parâmetros, callbacks e propriedades necessários. As propriedades têm valores padrão razoáveis e só precisam ser definidas se a aplicação desejar substituir os padrões. A maioria dos parâmetros, callbacks e propriedades são descritos na documentação da API. A seção a seguir descreve outros comportamentos e parâmetros GSSAPI não abordados pela documentação da API.

GSSAPI

Nota:

O mecanismo de servidor GSSAPI tem os mesmos requisitos que o mecanismo de cliente GSSAPI em termos de credenciais Kerberos e da propriedade `javax.security.sasl.sendmaxbuffer`.

O mecanismo GSSAPI é usado para autenticação Kerberos v5 e estabelecimento opcional de uma camada de segurança. O mecanismo espera que o `Subject` da thread chamadora contenha as credenciais Kerberos do cliente ou que as credenciais possam ser obtidas fazendo login implicitamente no Kerberos. Para obter as credenciais Kerberos do cliente, use o Java Authentication and Authorization Service (JAAS) para fazer login usando o módulo de login Kerberos. Consulte [Introdução aos Tutoriais JAAS e Java GSS-API](<#/doc/guides/security/introduction-jaas-and-java-gss-api-tutorials1>) para detalhes e exemplos. Após usar a autenticação JAAS para obter as credenciais Kerberos, você coloca o código que usa o mecanismo SASL GSSAPI dentro de `Subject.callAs(Subject, Callable<T>)`.
```
    LoginContext lc = new LoginContext("JaasSample", new TextCallbackHandler());
    lc.login();
    lc.getSubject().callAs(new SaslAction());
    
    class SaslAction implements java.util.concurrent.Callable<Void> {
        public Void call() {
            // ...
            String[] mechanisms = new String[]{"GSSAPI"};
            SaslClient sc = Sasl.createSaslClient(
                mechanisms, authzid, protocol, serverName, props, callbackHandler);
            // ...
        }
    }
```

Para obter credenciais Kerberos sem fazer programação JAAS explícita, consulte [Uso da API Java GSS para Trocas Seguras de Mensagens Sem Programação JAAS](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>). Ao usar esta abordagem, não há necessidade de envolver o código dentro de `Subject.callAs(Subject, Callable<T>)`.

A propriedade `javax.security.sasl.sendmaxbuffer` especifica (a representação em string de) o tamanho máximo do buffer de envio em bytes. O padrão é 65536. O número máximo real de bytes será o mínimo entre este número e o tamanho máximo do buffer de recebimento do par.

A propriedade negociada `com.sun.security.jgss.inquiretype.type_name` contém o valor retornado pelo método [ExtendedGSSContext.inquireSecContext(InquireType)](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.jgss/com/sun/security/jgss/ExtendedGSSContext.html#inquireSecContext\(com.sun.security.jgss.InquireType\)>), onde `type_name` é a forma de string do parâmetro enum [InquireType](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.jgss/com/sun/security/jgss/InquireType.html>) em letras minúsculas.

#### Mecanismo de Servidor do Provedor JdkSASL

O provedor JdkSASL suporta o mecanismo GSSAPI usado em protocolos populares como LDAP, IMAP e SMTP.

A tabela a seguir resume o mecanismo de servidor GSSAPI e a entrada necessária:

Tabela 10-6 Mecanismo de servidor

Nome do Mecanismo de Servidor | Parâmetros/Entrada | Callbacks | Propriedades de Configuração | Política de Seleção
---|---|---|---|---
[GSSAPI](<#/doc/guides/security/java-sasl-api-programming-and-deployment-guide1>) | [Subject](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/Subject.html>) id do protocolo nome do servidor | [AuthorizeCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/AuthorizeCallback.html>) | [Sasl.QOP](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#QOP>) [Sasl.MAX_BUFFER](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#MAX_BUFFER>) `javax.security.sasl.sendmaxbuffer` | [Sasl.POLICY_NOACTIVE](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#POLICY_NOACTIVE>) [Sasl.POLICY_NOANONYMOUS](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#POLICY_NOANONYMOUS>) [Sasl.POLICY_NOPLAINTEXT](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.sasl/javax/security/sasl/Sasl.html#POLICY_NOPLAINTEXT>)

Uma aplicação que usa o mecanismo GSSAPI do provedor JdkSASL deve fornecer os parâmetros, callbacks e propriedades necessários. As propriedades têm valores padrão razoáveis e só precisam ser definidas se a aplicação desejar substituir os padrões.

Todos os usuários do mecanismo de servidor devem ter um `callback handler` que lide com o `AuthorizeCallback`. Isso é usado pelo mecanismo para determinar se o usuário autenticado tem permissão para agir em nome do ID de autorização solicitado, e também para obter o nome canônico do usuário autorizado (se a canonicalização for aplicável).

A maioria dos parâmetros, callbacks e propriedades são descritos na documentação da API.

### Depuração e Monitoramento

Os provedores SunSASL e JdkSASL usam as APIs de Logging para fornecer saída de log da implementação. Esta saída pode ser controlada usando o arquivo de configuração de log e a API programática ([java.util.logging](<https://docs.oracle.com/en/java/javase/25/docs/api/java.logging/java/util/logging/package-summary.html>)). O nome do logger usado pelo provedor SunSASL é `javax.security.sasl`. Aqui está um exemplo de arquivo de configuração de log que habilita o nível de log `FINEST` para o provedor SunSASL:
```
    javax.security.sasl.level=FINEST
    handlers=java.util.logging.ConsoleHandler
    java.util.logging.ConsoleHandler.level=FINEST
    
```

[Tabela 10-7](<#/doc/guides/security/java-sasl-api-programming-and-deployment-guide1>) mostra os mecanismos e a saída de log que eles geram:

Tabela 10-7 Saída de Log

Mecanismo | Nível de Log | Informações Registradas
---|---|---
CRAM-MD5 | [FINE](<https://docs.oracle.com/en/java/javase/25/docs/api/java.logging/java/util/logging/Level.html#FINE>) | Propriedades de configuração; mensagens de desafio/resposta
DIGEST-MD5 | [INFO](<https://docs.oracle.com/en/java/javase/25/docs/api/java.logging/java/util/logging/Level.html#INFO>) | Mensagem descartada devido a problema de codificação (por exemplo, MACs incompatíveis, preenchimento incorreto)
DIGEST-MD5 | [FINE](<https://docs.oracle.com/en/java/javase/25/docs/api/java.logging/java/util/logging/Level.html#FINE>) | Propriedades de configuração; mensagens de desafio/resposta
DIGEST-MD5 | [FINER](<https://docs.oracle.com/en/java/javase/25/docs/api/java.logging/java/util/logging/Level.html#FINER>) | Informações mais detalhadas sobre mensagens de desafio/resposta
DIGEST-MD5 | [FINEST](<https://docs.oracle.com/en/java/javase/25/docs/api/java.logging/java/util/logging/Level.html#FINEST>) | Buffers trocados na camada de segurança
GSSAPI | [FINE](<https://docs.oracle.com/en/java/javase/25/docs/api/java.logging/java/util/logging/Level.html#FINE>) | Propriedades de configuração; mensagens de desafio/resposta
GSSAPI | [FINER](<https://docs.oracle.com/en/java/javase/25/docs/api/java.logging/java/util/logging/Level.html#FINER>) | Informações mais detalhadas sobre mensagens de desafio/resposta
GSSAPI | [FINEST](<https://docs.oracle.com/en/java/javase/25/docs/api/java.logging/java/util/logging/Level.html#FINEST>) | Buffers trocados na camada de segurança

### Implementando um Provedor de Segurança SASL

Existem três etapas básicas na implementação de um provedor de segurança SASL:

  1.  Escreva uma classe que implemente a interface `SaslClient` ou `SaslServer`.

    Isso envolve fornecer uma implementação para o mecanismo SASL. Para implementar um mecanismo de cliente, você precisa implementar os métodos declarados na interface `SaslClient`. Da mesma forma, para um mecanismo de servidor, você precisa implementar os métodos declarados na interface `SaslServer`. Para os propósitos desta discussão, suponha que você esteja desenvolvendo uma implementação para o mecanismo de cliente "SAMPLE-MECH", implementado pela classe `com.example.SampleMechClient`. Você deve decidir quais entradas são necessárias pelo mecanismo e como a implementação irá coletá-las. Por exemplo, se o mecanismo for baseado em nome de usuário/senha, a implementação provavelmente precisaria coletar essas informações através do parâmetro `callback handler`.

  2.  Escreva uma classe de fábrica (que implementa `SaslClientFactory` ou `SaslServerFactory`) que cria instâncias da classe.

    Isso envolve fornecer uma classe de fábrica que criará instâncias de `com.example.SampleMechClient`. A fábrica precisa determinar as características do mecanismo que ela suporta (conforme descrito pelas propriedades `Sasl.POLICY_*`) para que possa retornar uma instância do mecanismo quando o usuário da API o solicitar usando propriedades de política compatíveis. A fábrica também pode verificar a validade dos parâmetros antes de criar o mecanismo. Para os propósitos desta discussão, suponha que a classe de fábrica seja nomeada `com.example.MySampleClientFactory`. Embora nossa fábrica de exemplo seja responsável por apenas um mecanismo, uma única fábrica pode ser responsável por qualquer número de mecanismos.

  3.  Escreva um provedor JCA que registre a fábrica.

    Isso envolve a criação de um provedor JCA. As etapas para criar um provedor JCA são descritas em detalhes em [Etapas para Implementar e Integrar um Provedor](<#/doc/guides/security/howtoimplaprovider>). As fábricas de cliente SASL são registradas usando nomes de propriedade no formato `SaslClientFactory.`mechName, enquanto as fábricas de servidor SASL são registradas usando nomes de propriedade no formato `SaslServerFactory.`mechName.

    `mechName` é o nome do mecanismo SASL. É isso que é retornado por `SaslClient.getMechanismName()` e `SaslServer.getMechanismName()`. Continuando com nosso exemplo, aqui está como o provedor registraria o mecanismo "SAMPLE-MECH".
`put("SaslClientFactory.SAMPLE-MECH", "com.example.MySampleClientFactory");
         
```

Um único provedor SASL pode ser responsável por muitos mecanismos. Portanto, ele pode ter muitas invocações de `put` para registrar as fábricas relevantes. O provedor SASL concluído pode então ser disponibilizado para aplicações usando as instruções descritas em Como os Mecanismos SASL são Instalados e Selecionados.