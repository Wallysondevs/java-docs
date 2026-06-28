# O Arquivo de Propriedades de Segurança

## O Arquivo de Propriedades de Segurança

Um arquivo de propriedades de segurança é um arquivo de texto que contém nomes de propriedades de segurança e seus valores. Você pode personalizar certos aspectos da segurança Java definindo essas propriedades.

Ao iniciar uma aplicação Java a partir de um JDK localizado em `$JAVA_HOME`, por padrão, a JVM definirá as propriedades de segurança para os valores especificados em `$JAVA_HOME/conf/security/java.security`, que é conhecido como o arquivo mestre de propriedades de segurança. É possível especificar outro arquivo de propriedades de segurança; veja [Especificando um Arquivo de Propriedades de Segurança Alternativo](<#/doc/guides/security/security-properties-file>).

Uma propriedade de segurança definida em um arquivo de propriedades de segurança é definida estaticamente. Você pode definir propriedades de segurança dinamicamente definindo seus valores no código da sua aplicação. Veja [Definindo Estaticamente uma Propriedade de Segurança em um Arquivo de Propriedades de Segurança](<#/doc/guides/security/security-properties-file>) e [Definindo Dinamicamente uma Propriedade de Segurança no Código da Aplicação](<#/doc/guides/security/security-properties-file>).

Veja [Solução de Problemas de Propriedades de Segurança](<#/doc/guides/security/security-properties-file>) para informações sobre como habilitar o log para propriedades de segurança e visualizá-las.

Você pode incluir arquivos de texto contendo configurações de propriedades de segurança no arquivo mestre de propriedades de segurança ou em qualquer outro arquivo de propriedades de segurança. Ao incluir um arquivo, todas as suas configurações de propriedades de segurança são adicionadas como se estivessem definidas naquele ponto. Veja [Incluindo um Arquivo de Propriedades de Segurança](<#/doc/guides/security/security-properties-file>).

Por padrão, o arquivo mestre de propriedades de segurança define propriedades de segurança que personalizam certos aspectos do Java, que incluem o seguinte:

  * Registro de um provedor de segurança: Um provedor de segurança é um pacote ou conjunto de pacotes que fornecem uma implementação concreta de um subconjunto dos aspectos de criptografia da Java Security API. O arquivo mestre de propriedades de segurança define várias propriedades de segurança no formato `security.provider.n`, onde `n` é a ordem de preferência do provedor. A ordem de preferência é a ordem em que os provedores são pesquisados para algoritmos solicitados (quando nenhum provedor específico é solicitado).

Veja [Passo 8.1: Configurar o Provedor](<#/doc/guides/security/howtoimplaprovider>) para mais informações.

  * Restrições de algoritmo: Isso abrange algoritmos restritos e legados para validação de caminho de certificado, TLS, arquivos JAR assinados e validações de assinatura XML. Por exemplo, `jdk.certpath.disabledAlgorithms` e `jdk.tls.disabledAlgorithm` listam quais algoritmos desabilitar durante a validação de caminho de certificação e a negociação de protocolo TLS/DTLS.
  * Java Secure Socket Extension (JSSE): JSSE permite comunicações seguras pela Internet. Ele fornece um framework e uma implementação para uma versão Java dos protocolos TLS e DTLS e inclui funcionalidade para criptografia de dados, autenticação de servidor, integridade de mensagem e autenticação opcional de cliente. As propriedades de segurança relacionadas incluem:

    * `jdk.tls.keyLimits`, que limita a quantidade de dados que os algoritmos podem criptografar com um conjunto de chaves
    * `ssl.KeyManagerFactory` e `ssl.TrustManagerFactory`, que especificam os algoritmos padrão de fábrica de gerenciamento de chaves e confiança para o pacote `javax.net.ssl`

Veja [Personalizando JSSE](<#/doc/guides/security/java-secure-socket-extension-jsse-reference-guide>) para mais informações.

  * Outros aspectos da segurança Java: Isso inclui o tipo de keystore padrão, configuração de implementações SecureRandom e Kerberos.

### Especificando um Arquivo de Propriedades de Segurança Alternativo

Você pode especificar um arquivo de propriedades `java.security` alternativo a partir da linha de comando com a propriedade de sistema `java.security.properties=<URL>`. Este arquivo de propriedades é anexado ao arquivo mestre de propriedades de segurança. Se você especificar um arquivo de propriedades com `java.security.properties==<URL>` (usando dois sinais de igual), então esse arquivo de propriedades substituirá completamente o arquivo mestre de propriedades de segurança.

### Definindo Estaticamente uma Propriedade de Segurança em um Arquivo de Propriedades de Segurança

Para definir estaticamente um valor de propriedade de segurança em um arquivo de propriedades de segurança, adicione ou modifique uma linha existente no seguinte formato:
```
    propertyName=propertyValue
```

Por exemplo, suponha que você queira especificar um nome de algoritmo de fábrica de gerenciador de chaves diferente do padrão SunX509. Você faz isso especificando o nome do algoritmo como o valor de uma propriedade de segurança chamada `ssl.KeyManagerFactory.algorithm`. Por exemplo, para definir o valor como MyX509, adicione a seguinte linha:
```
    ssl.KeyManagerFactory.algorithm=MyX509
```

Para comentar uma linha em um arquivo de propriedades de segurança, o que significa que a JVM a ignora ao definir propriedades de segurança a partir de um arquivo de propriedades de segurança, insira o sinal de número (`#`) no início da linha.

Por padrão, o arquivo mestre de propriedades de segurança contém muitos comentários que descrevem em detalhes as propriedades de segurança especificadas nele. Às vezes, essas próprias propriedades de segurança são comentadas. Essas propriedades de segurança comentadas podem ter um valor especificado ou nenhum valor.

Nota:

Uma propriedade de segurança que foi definida sem valor é definida como uma string vazia. Uma propriedade de segurança que foi comentada é definida como um valor nulo. Neste caso, a propriedade de segurança pode receber um valor padrão. Os comentários no arquivo mestre de propriedades de segurança devem especificar se uma propriedade de segurança tem um valor padrão.

### Definindo Dinamicamente uma Propriedade de Segurança no Código da Aplicação

Para definir uma propriedade de segurança dinamicamente no código da aplicação, chame o método `java.security.Security.setProperty`:
```
    Security.setProperty("propertyName," "propertyValue");
```

Por exemplo, uma chamada para o método `setProperty()` correspondente ao exemplo anterior para especificar o nome do algoritmo da fábrica do gerenciador de chaves seria:
```
    Security.setProperty("ssl.KeyManagerFactory.algorithm", "MyX509");
```

Nota:

Algumas propriedades de segurança não podem ser definidas dinamicamente se já foram lidas de um arquivo de propriedades de segurança e armazenadas em cache, o que acontece quando a classe `java.security.Security` é inicializada. Nenhuma exceção será lançada se seu código tentar fazer isso.

### Solução de Problemas de Propriedades de Segurança

Habilite o log para propriedades de segurança especificando a opção de linha de comando `-Djava.security.debug=properties`. Mensagens prefixadas por `properties` contêm os valores finais para todas as propriedades de segurança e informações sobre como as diretivas `include` foram processadas. Veja [A Propriedade de Sistema java.security.debug](<#/doc/guides/security/troubleshooting-security>).

A opção de linha de comando `-XshowSettings:security` imprime uma visão geral das configurações de segurança que estão em vigor no JDK. Veja [A Opção java -XshowSettings:security](<#/doc/guides/security/troubleshooting-security>).

Você pode usar o evento Java Flight Recorder (JFR) `jdk.InitialSecurityProperty` para obter os valores iniciais das propriedades de segurança em um JDK em execução.

### Incluindo um Arquivo de Propriedades de Segurança

Para incluir um arquivo de propriedades de segurança em outro arquivo de propriedades de segurança, use uma diretiva `include`. Este recurso permite que as propriedades de segurança sejam definidas em vários arquivos e pode facilitar o gerenciamento centralizado de perfis de segurança em vários JDKs.

Por exemplo, no Linux e macOS, para incluir o arquivo de propriedades de segurança `/usr/lib/jvm/jdk-25/conf/security/extra.security` em outro arquivo de propriedades de segurança, adicione a seguinte diretiva `include`:
```
    include /usr/lib/jvm/jdk-25/conf/security/extra.security
```

No Windows, para incluir o arquivo de propriedades de segurança `C:\Java\jdk-25\conf\security\extra.security` em outro arquivo de propriedades de segurança, adicione a seguinte diretiva `include`:
```
    include C:\\Java\\jdk-25\\conf\\security\\extra.security
```

Um caminho de sistema de arquivos em uma diretiva `include` pode ser absoluto, como nos exemplos anteriores, ou relativo. Quando é um caminho relativo, a localização do arquivo que contém a diretiva `include` é usada como base. Você não pode usar um caminho relativo se a diretiva `include` estiver em um stream de URL. Por exemplo, se você especificar a seguinte opção na linha de comando ao iniciar uma aplicação Java, o arquivo de propriedades de segurança `extra.java.security` não poderá conter nenhuma diretiva `include` que especifique um caminho relativo:
```
    -Djava.security.properties=https://example.com/extra.java.security
```

No Linux e macOS, barras (`/`) são suportadas.

No Windows, barras invertidas duplas (`\\`), barras simples (`/`) e caminhos UNC são suportados. Por exemplo:
```
    include C:\\Program Files\\Java\\jdk-25\\java.config
    include C:/Program Files/Java/jdk-25/additional.java.config
    include \\\\WindowsHost\\Share\\unc.path.java.config
```

Caminhos de arquivo URL (por exemplo, aqueles que começam com `file://`) não são suportados.

As diretivas `include` suportam expansão de propriedades. Isso é semelhante à expansão de variáveis em um shell. Quando uma string como `${some.property}` aparece em uma diretiva `include`, ela será expandida para o valor da propriedade de sistema. Por exemplo:
```
    include ${java.home}/extra.security
```

Isso expandirá `${java.home}` para usar o valor da propriedade de sistema `java.home`. Se o valor dessa propriedade for `/usr/lib/jvm/jdk-25`, então o exemplo anterior é equivalente a:
```
    include /usr/lib/jvm/jdk-25/conf/security/extra.security
```

Para auxiliar em arquivos de política independentes de plataforma, você também pode usar a notação especial de `${/}`, que é um atalho para `${file.separator}`. Isso permite diretivas como a seguinte:
```
    include ${java.home}${/}extra.security
```

Nota:

Se uma propriedade de sistema em uma diretiva `include` estiver indefinida, ela será substituída por uma string vazia em vez de a JVM gerar um erro.

Quando a JVM encontra uma diretiva `include`, ela a processa imediatamente, independentemente de ocorrências anteriores ou subsequentes. Sua posição no arquivo pode afetar os valores das propriedades de segurança, conforme descrito em [Ordem das Diretivas include em Arquivos de Propriedades de Segurança](<#/doc/guides/security/security-properties-file>). No entanto, as diretivas `include` não interferem umas nas outras; a JVM sempre as processa. Por outro lado, as propriedades de segurança definidas posteriormente em um arquivo de propriedades de segurança ou trazidas por uma inclusão subsequente sobrescreveriam uma definição anterior se seus nomes fossem os mesmos.

A JVM gera um erro se um arquivo não puder ser incluído. Isso pode acontecer se o arquivo não puder ser resolvido, não existir, for um diretório, tiver permissões insuficientes para a JVM lê-lo, for incluído recursivamente mais de uma vez, ou por qualquer outro motivo.

Arquivos de propriedades de segurança incluídos podem incluir outros recursivamente, desde que não levem a um ciclo. Por exemplo, suponha que `java.security` inclua o arquivo de propriedades de segurança `A.security`, e `A.security` inclua o arquivo de propriedades de segurança `B.security`. O arquivo de propriedades de segurança `B.security` não pode incluir `A.security`, pois isso criaria um ciclo.

#### Ordem das Diretivas include em Arquivos de Propriedades de Segurança

Ao incluir um arquivo de propriedades de segurança com uma diretiva `include`, as propriedades definidas no arquivo incluído podem ser adicionadas ao mapa de propriedades de segurança ou substituir as existentes se seus nomes forem os mesmos. Assim, o efeito de uma diretiva `include` pode depender de sua posição no arquivo de propriedades. Consequentemente, você pode especificar propriedades de segurança sobrescritas definindo-as antes de uma diretiva `include`, e especificar propriedades de segurança não sobrescritas definindo-as após uma diretiva `include`.

#### Considerações de Segurança e Diretivas include em Arquivos de Propriedades de Segurança

É importante que o layout dos seus arquivos de propriedades de segurança permita que os administradores de sistema compreendam clara e facilmente o motivo pelo qual as propriedades de segurança foram definidas e sobrescritas. É uma boa prática verificar o mapa final de propriedades de segurança no JDK com os métodos descritos em [Solução de Problemas de Propriedades de Segurança](<#/doc/guides/security/security-properties-file>).

Nota:

Ao incluir um arquivo de propriedades de segurança, é fortemente recomendado verificar se ele vem de uma fonte confiável e verificar as permissões de escrita não apenas para o arquivo incluído, mas também para toda a cadeia de diretórios pai, começando na raiz do sistema de arquivos. Qualquer usuário que tenha capacidade de modificar um arquivo incluído pode degradar a segurança do JDK, substituindo um arquivo de propriedades de segurança ou adicionando novos que causem a sobrescrita dos valores das propriedades de segurança. Qualquer usuário que possa renomear um diretório na cadeia de diretórios pai pode ser capaz de se passar pelo arquivo incluído com uma versão maliciosa, levando a uma degradação na segurança do JDK. Como regra geral, um arquivo incluído e sua cadeia de diretórios pai devem ter permissões iguais ou mais restritivas do que o arquivo que contém sua diretiva `include`.

Quando placeholders são usados em caminhos de sistema de arquivos e propriedades de sistema são passadas conforme descrito em [Perfis de Segurança](<#/doc/guides/security/security-properties-file>), vale a pena notar o impacto de um erro de digitação: Se o erro de digitação estiver no nome da propriedade, o placeholder será ignorado. Se o erro de digitação estiver no valor da propriedade, um erro será lançado porque os arquivos incluídos devem existir. Sempre verifique as propriedades de sistema em placeholders e argumentos quanto a erros de digitação.

#### Exemplos de Uso de Diretivas include

##### Perfis de Segurança

Administradores de sistema frequentemente precisam impor perfis de segurança em aplicações Java em múltiplas implantações de JDK para endurecimento de segurança, conformidade regulatória ou preservação da compatibilidade retroativa. As propriedades de segurança especificadas nesses perfis de segurança devem ser adicionais às especificadas por implantações individuais de JDK. Frequentemente, os administradores de sistema precisam impor diferentes perfis de segurança dependendo do ambiente, como desenvolvimento ou produção. Eles também devem ser capazes de gerenciar perfis de segurança em um local centralizado.

Para implementar este cenário, defina múltiplos perfis de segurança globais através de arquivos de propriedades de segurança separados. Um perfil de segurança global especifica propriedades de segurança que são exigidas em cada implantação de JDK. Defina um arquivo de ponte (bridge file), que contém uma diretiva `include` que especifica o perfil de segurança global imposto por padrão. Inclua este arquivo de ponte no arquivo mestre de propriedades de segurança de cada implantação de JDK. Para alterar o perfil padrão, modifique a diretiva `include` no arquivo de ponte.

Para ilustrar este conceito de gerenciamento de múltiplos perfis de segurança globais através de um arquivo de ponte, considere o seguinte layout de arquivos de propriedades de segurança e suas diretivas `include`:

  * Diretório `/global/profiles`
    * Arquivo `profile-.security` (arquivo de ponte):
`include profile-prod.security
```

    * Arquivo `profile-custom.security` (perfil de segurança global)
    * Arquivo `profile-dev.security` (perfil de segurança global)
    * Arquivo `profile-prod.security` (perfil de segurança global, que é imposto por padrão)
  * Implantação JDK A: diretório `$JAVA_HOME_DEPLOYMENT_A/conf/security`
    * Arquivo `java.security`:
`include /global/profiles/profile-${securityProfile}.security
```

  * Implantação JDK B: diretório `$JAVA_HOME_DEPLOYMENT_B/conf/security`
    * Arquivo `java.security`:
`include /global/profiles/profile-${securityProfile}.security
```

Neste layout de exemplo, `profile-.security` é o arquivo de ponte que contém uma diretiva `include` que especifica o perfil de segurança global imposto por padrão, `profile-prod.security`. Um administrador de sistema pode alterar o perfil de segurança global padrão modificando a diretiva `include` no arquivo de ponte e referenciando qualquer uma das políticas no diretório `/global/profiles` (`profile-custom.security`, `profile-dev.security` ou `profile-prod.security`).

Em algumas ocasiões, as aplicações exigem um perfil de segurança diferente do imposto por padrão. Neste exemplo, as diretivas `include` nas implantações JDK A e B usam o sufixo de placeholder `securityProfile`. Quando a propriedade de sistema `securityProfile` está indefinida, este placeholder é substituído por uma string vazia, o que resulta nas implantações JDK A e B usando o arquivo de ponte `profile-.security`. Quando a propriedade de sistema `securityProfile` é definida para um dos valores disponíveis (`custom`, `dev` ou `prod`), o respectivo perfil de segurança global é selecionado. Por exemplo, se você iniciar uma aplicação Java com a opção de linha de comando `-DsecurityProfile=dev`, o perfil de segurança global `profile-dev.security` seria aplicado em ambas as implantações JDK A e B, independentemente do perfil imposto por padrão.

Um layout no qual o arquivo `profile-.security` não existe impede uma escolha padrão e força a definição de `securityProfile`.

Nota:

As propriedades de segurança são processadas quando a classe `java.security.Security` é inicializada. Se a propriedade de sistema de um placeholder for definida programaticamente após este ponto (chamando o método `java.lang.System.setProperty(String key, String value)`) para especificar um perfil de segurança global, isso não terá efeito.

Você pode estender este exemplo para incluir perfis de segurança específicos para uma versão do JDK, criando arquivos de propriedades de segurança nomeados `profile-.25.security` e `profile-prod.25.security`. Neste caso, o arquivo de propriedades de segurança `java.security` para o JDK 25 deve incluir tanto os arquivos de ponte globais quanto os específicos da versão, além do perfil global atual. Ter um perfil específico da versão pode ser útil quando o mapa de propriedades de segurança não é o mesmo em todas as versões do JDK.

O JDK não fornece perfis de segurança curados nem favorece nenhuma estrutura particular para sua organização. É importante manter os perfis atualizados e optar por padrões seguros sempre que possível. Também é recomendado analisar como os perfis se aplicam a cada versão do JDK em termos da disponibilidade de propriedades de segurança.