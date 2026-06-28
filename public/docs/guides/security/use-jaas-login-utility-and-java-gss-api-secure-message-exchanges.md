# Uso do Utilitário de Login JAAS e Java GSS-API para Trocas Seguras de Mensagens

## Uso do Utilitário de Login JAAS e Java GSS-API para Trocas Seguras de Mensagens

Este tutorial apresenta duas aplicações de exemplo para demonstrar o uso da Java GSS-API. Esta API permite trocas seguras de mensagens entre aplicações comunicantes. Aqui estão as aplicações cliente e servidor de exemplo que você precisará para este tutorial:

  * [`SampleClient.java`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>)
  * [`SampleServer.java`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>)

Note:

Este tutorial usa as mesmas aplicações cliente e servidor do tutorial [Uso da Java GSS-API para Trocas Seguras de Mensagens Sem Programação JAAS](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>). Nesse tutorial, a programação JAAS (Java Authentication and Authorization Service) não é necessária. Em vez disso, você permite que o mecanismo subjacente decida como obter as credenciais.

Este tutorial usa um arquivo de configuração de login mais complexo.

Tópicos

  * [Antes de Começar: Leitura Recomendada](<#/doc/guides/security/use-jaas-login-utility-and-java-gss-api-secure-message-exchanges>)
  * [Visão Geral das Aplicações Cliente e Servidor](<#/doc/guides/security/use-jaas-login-utility-and-java-gss-api-secure-message-exchanges>)
  * [Nomes de Principal de Usuário e Serviço Kerberos](<#/doc/guides/security/use-jaas-login-utility-and-java-gss-api-secure-message-exchanges>)
  * [O Arquivo de Configuração de Login](<#/doc/guides/security/use-jaas-login-utility-and-java-gss-api-secure-message-exchanges>)
  * [Executando os Programas SampleClient e SampleServer](<#/doc/guides/security/use-jaas-login-utility-and-java-gss-api-secure-message-exchanges>)

### Antes de Começar: Leitura Recomendada

Neste tutorial da Java GSS-API, o primeiro passo é a autenticação JAAS. Tutoriais anteriores demonstraram o uso do JAAS para autenticação de usuário e apresentaram exemplos de arquivos de configuração de login (especificando a tecnologia de autenticação subjacente a ser usada) que o JAAS requer. As aplicações no tutorial introdutório do JAAS, [Autenticação JAAS](<#/doc/guides/security/jaas-authentication>), fizeram chamadas diretas aos métodos JAAS. O tutorial [Uso do Utilitário de Login JAAS](<#/doc/guides/security/use-jaas-login-utility>) mostrou o uso de um programa utilitário que libera a aplicação de ter que fazer isso. As aplicações cliente e servidor no tutorial atual também usam o mesmo programa utilitário, então recomendamos que você leia o tutorial do utilitário de login primeiro.

Assim como em todos os tutoriais desta série, a tecnologia subjacente usada para suportar a autenticação e a comunicação segura para as aplicações neste tutorial é o Kerberos. Consulte [Requisitos do Kerberos](<#/doc/guides/security/kerberos-requirements>).

### Visão Geral das Aplicações Cliente e Servidor

As aplicações para este tutorial são nomeadas `SampleClient` e `SampleServer`.

Cada uma é invocada executando o utilitário Login fornecido com este tutorial e passando como argumentos o nome da aplicação (`SampleClient` ou `SampleServer`), seguido pelos argumentos necessários pela aplicação. O utilitário Login usa um JAAS LoginContext para autenticar o usuário usando Kerberos. Finalmente, o utilitário Login invoca o método `main` da classe da aplicação, em nosso caso `SampleClient` ou `SampleServer`, e passa os argumentos para a aplicação.

Aqui está um resumo da execução das aplicações `SampleClient` e `SampleServer`:

  1. Execute a aplicação `SampleServer` executando o utilitário Login e passando como argumentos o nome "`SampleServer`" seguido pelos argumentos para o programa `SampleServer`. O utilitário Login solicitará a senha para o principal sob o qual `SampleServer` deve ser executado. (Consulte [Nomes de Principal de Usuário e Serviço Kerberos](<#/doc/guides/security/use-jaas-login-utility-and-java-gss-api-secure-message-exchanges>).) Após a autenticação ser concluída, `SampleServer` é executado:
     1. Lê seu argumento, o número da porta na qual deve escutar por conexões de cliente.
     2. Cria um ServerSocket para escutar por conexões de cliente nessa porta.
     3. Escuta por uma conexão.
  2. Execute a aplicação `SampleClient` (possivelmente em uma máquina diferente), executando o utilitário Login e passando como argumentos o nome "`SampleClient`" seguido pelos argumentos para o programa `SampleClient`. O utilitário Login solicitará seu nome de usuário e senha Kerberos. Após a autenticação ser concluída, `SampleClient` é executado. Ele:
     1. Lê seus argumentos: (1) O nome do principal Kerberos que representa `SampleServer`. (Consulte [Nomes de Principal de Usuário e Serviço Kerberos](<#/doc/guides/security/use-jaas-login-utility-and-java-gss-api-secure-message-exchanges>).), (2) o nome do host (máquina) no qual `SampleServer` está sendo executado, e (3) o número da porta na qual `SampleServer` escuta por conexões de cliente.
     2. Tenta uma conexão de socket com o `SampleServer`, usando o host e a porta que foram passados como argumentos.
  3. A conexão de socket é aceita por `SampleServer` e ambas as aplicações inicializam um DataInputStream e um DataOutputStream a partir dos fluxos de entrada e saída do socket, para serem usados em futuras trocas de dados.
  4. `SampleClient` e `SampleServer` instanciam um GSSContext e estabelecem um contexto compartilhado que permitirá trocas seguras de dados subsequentes.
  5. `SampleClient` e `SampleServer` agora podem trocar mensagens de forma segura.
  6. Quando `SampleClient` e `SampleServer` terminam de trocar mensagens, eles realizam operações de limpeza.

Note:

Consulte a seção [O Código SampleClient e SampleServer](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>) do tutorial [Uso da Java GSS-API para Trocas Seguras de Mensagens Sem Programação JAAS](<#/doc/guides/security/use-java-gss-api-secure-message-exchanges-without-jaas-programming>) para uma discussão completa do código usado neste tutorial.

### Nomes de Principal de Usuário e Serviço Kerberos

Como a tecnologia subjacente de autenticação e comunicação segura usada por este tutorial é o Kerberos V5, usamos nomes de principal no estilo Kerberos sempre que um usuário ou serviço é solicitado (consulte [Principais](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>)).

Por exemplo, ao executar `SampleClient`, você é solicitado a fornecer seu nome de usuário. Seu nome de usuário no estilo Kerberos é simplesmente o nome de usuário que lhe foi atribuído para autenticação Kerberos. Ele consiste em um nome de usuário base (como `mjones`) seguido por um "`@`" e seu realm (como `mjones@KRBNT-OPERATIONS.EXAMPLE.COM`).

Um programa de servidor como `SampleServer` é tipicamente considerado para oferecer um "serviço" e para ser executado em nome de um "principal de serviço" específico. Um nome de principal de serviço para `SampleServer` é necessário em vários lugares:

  * Ao executar `SampleServer`, você deve fazer login como o principal de serviço apropriado. O arquivo de configuração de login para este tutorial realmente especifica o nome do principal de serviço (como uma opção para o Krb5LoginModule), então a autenticação JAAS (feita pelo utilitário Login) apenas pede para você especificar a senha para esse principal de serviço. Se você especificar a senha correta, a autenticação é bem-sucedida, um Subject é criado contendo um Principal com o nome do principal de serviço. O código executado subsequentemente (o código `SampleServer`) é considerado executado em nome do principal especificado.
  * Ao executar `SampleClient`, um dos argumentos é o nome do principal de serviço. Isso é necessário para que `SampleClient` possa iniciar o estabelecimento de um contexto de segurança com o serviço apropriado.

Ao longo deste documento, e no arquivo de configuração de login que o acompanha, `service_principal@your_realm` é usado como um placeholder a ser substituído pelo nome real a ser usado em seu ambiente. Qualquer principal Kerberos pode ser usado para o nome do principal de serviço. Então, para os propósitos de experimentar este tutorial, você poderia usar seu nome de usuário como o nome de usuário do cliente e o nome do principal de serviço.

Em um ambiente de produção, os administradores de sistema geralmente preferem que os servidores sejam executados apenas como principais específicos e podem atribuir um nome particular a ser usado. Frequentemente, o nome do principal de serviço no estilo Kerberos atribuído é da forma
```
    service_name/machine_name@realm; 
```

Por exemplo, um serviço nfs executado em uma máquina chamada "raven" no realm chamado `KRBNT-OPERATIONS.EXAMPLE.COM` poderia ter o nome do principal de serviço
```
    nfs/raven@KRBNT-OPERATIONS.EXAMPLE.COM
```

No entanto, nomes de múltiplos componentes não são obrigatórios. Nomes de componente único, assim como os de principais de usuário, podem ser usados. Por exemplo, uma instalação pode usar o mesmo principal de serviço ftp `ftp@realm` para todos os servidores ftp nesse realm, enquanto outra instalação pode ter diferentes principais ftp para diferentes servidores ftp, como `ftp/host1@realm` e `ftp/host2@realm` nas máquinas `host1` e `host2`, respectivamente.

#### Quando o Realm é Necessário em Nomes de Principal

Se o realm de um nome de principal de usuário ou serviço for o realm padrão (consulte [Requisitos do Kerberos](<#/doc/guides/security/kerberos-requirements>)), você pode omitir o realm ao fazer login no Kerberos (ou seja, quando for solicitado seu nome de usuário). Assim, por exemplo, se seu nome de usuário for `mjones@KRBNT-OPERATIONS.EXAMPLE.COM`, e você executar `SampleClient`, quando ele solicitar seu nome de usuário, você poderia apenas especificar `mjones`, omitindo o realm. O nome é interpretado no contexto de ser um nome de principal Kerberos e o realm padrão é anexado, conforme necessário.

Você também pode omitir o realm se um nome de principal for convertido para um GSSName por um método `createName` do GSSManager. Por exemplo, ao executar `SampleClient`, um dos argumentos é o nome do principal de serviço do servidor. Você pode especificar o nome sem incluir o realm, porque `SampleClient` passa o nome para tal método `createName`, que anexa o realm padrão conforme necessário.

É recomendado que você sempre inclua realms quando nomes de principal são usados em arquivos de configuração de login, pois o comportamento dos parsers para tais arquivos pode ser dependente da implementação. Eles podem ou não anexar o realm padrão antes que tais nomes sejam utilizados e ações subsequentes podem falhar se não houver realm no nome.

### O Arquivo de Configuração de Login

Sempre que o JAAS é usado, uma configuração de login é necessária para especificar a tecnologia de autenticação desejada. (Consulte [Apêndice B: Arquivo de Configuração de Login JAAS](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>) para mais informações sobre o que é um arquivo de configuração de login.) Tanto `SampleClient` quanto `SampleServer` podem usar o mesmo arquivo de configuração de login, se esse arquivo contiver duas entradas, uma entrada para o lado do cliente e outra para o lado do servidor.

O arquivo de configuração de login [`csLogin.conf`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>) usado para este tutorial é o seguinte:
```
    SampleClient {
      com.sun.security.auth.module.Krb5LoginModule required;
    };
    
    SampleServer {
      com.sun.security.auth.module.Krb5LoginModule required storeKey=true 
        principal="service_principal@your_realm";
    };
    
```

Observe que o nome de cada entrada corresponde aos respectivos nomes de classe para nossas duas aplicações de nível superior, `SampleClient` e `SampleServer`. Lembre-se de que este é também o nome que é passado para o utilitário Login que executa operações JAAS para a aplicação. Esse utilitário espera que o nome da entrada a ser pesquisada em seu arquivo de configuração de login seja o mesmo nome que lhe é passado.

Ambas as entradas especificam que o Krb5LoginModule do Kerberos V5 da Oracle deve ser usado para autenticar o usuário com sucesso. O Krb5LoginModule só é bem-sucedido se a tentativa de login no KDC Kerberos como uma entidade especificada for bem-sucedida. No caso de `SampleClient`, o usuário será solicitado a fornecer seu nome e senha. No caso de `SampleServer`, um nome já é fornecido neste arquivo de configuração de login (o principal especificado) e o usuário que executa `SampleServer` é apenas solicitado a fornecer a senha para a entidade especificada por esse nome. Eles devem especificar a senha correta para que a autenticação seja bem-sucedida.

A entrada `SampleServer` `storeKey=true` indica que uma chave secreta deve ser calculada a partir da senha fornecida durante o login e deve ser armazenada nas credenciais privadas do Subject criado como resultado do login. Esta chave é subsequentemente utilizada durante a autenticação mútua ao estabelecer um contexto de segurança entre `SampleClient` e `SampleServer`.

O Krb5LoginModule possui uma opção `principal` que pode ser usada para especificar que apenas o principal (entidade/usuário) especificado deve ser logado para o programa dado. Aqui, a entrada `SampleClient` não especifica um principal (embora pudesse, se desejado), então o usuário é solicitado a fornecer um nome de usuário e senha e qualquer pessoa com um nome de usuário e senha válidos pode executar `SampleClient`. `SampleServer`, por outro lado, indica um principal específico porque os administradores de sistema geralmente preferem que os servidores sejam executados apenas como principais específicos. Neste caso, o usuário que executa `SampleServer` é solicitado a fornecer a senha desse principal e deve fornecer a correta para que a autenticação seja bem-sucedida.

Observe que você deve substituir `service_principal@your_realm` pelo nome do principal de serviço que representa `SampleServer`. (Consulte [Nomes de Principal de Usuário e Serviço Kerberos](<#/doc/guides/security/use-jaas-login-utility-and-java-gss-api-secure-message-exchanges>).)

Se o servidor tiver um arquivo keytab contendo chaves secretas, use a seguinte entrada de login JAAS:
```
    SampleServer {
      com.sun.security.auth.module.Krb5LoginModule required
      principal="service_principal@your_realm"
      storeKey=true useKeyTab=true keyTab=keytab.file.name
      isInitiator=false;
      };
```

Como o arquivo keytab já fornece as chaves, você não será solicitado a fornecer uma senha. Se o arquivo keytab contiver chaves para mais de um principal de serviço e o servidor for projetado para atuar como todos esses principais de serviço, então você pode definir a entrada principal para o seguinte:
```
      principal=*
```

Consulte a documentação da API JavaDoc do [Krb5LoginModule](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.auth/com/sun/security/auth/module/Krb5LoginModule.html>) para obter informações sobre todas as opções possíveis que podem ser passadas para o Krb5LoginModule.

### Executando os Programas SampleClient e SampleServer

Para executar os programas `SampleClient` e `SampleServer`, faça o seguinte:

  * [Preparar SampleServer para Execução](<#/doc/guides/security/use-jaas-login-utility-and-java-gss-api-secure-message-exchanges>)
  * [Preparar SampleClient para Execução](<#/doc/guides/security/use-jaas-login-utility-and-java-gss-api-secure-message-exchanges>)
  * [Executar SampleServer](<#/doc/guides/security/use-jaas-login-utility-and-java-gss-api-secure-message-exchanges>)
  * [Executar SampleClient](<#/doc/guides/security/use-jaas-login-utility-and-java-gss-api-secure-message-exchanges>)

#### Preparar SampleServer para Execução

Para preparar `SampleServer` para execução, faça o seguinte:

  1. Copie os seguintes arquivos para um diretório acessível pela máquina na qual você executará `SampleServer`:
     * O arquivo fonte [`Login.java`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>).
     * O arquivo fonte [`SampleServer.java`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>).
     * O arquivo de configuração de login [`csLogin.conf`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>).
  2. Substitua `service_principal@your_realm` em `csLogin.conf` pelo nome do principal de serviço que representa `SampleServer` (consulte [Nomes de Principal de Usuário e Serviço Kerberos](<#/doc/guides/security/use-jaas-login-utility-and-java-gss-api-secure-message-exchanges>)).
  3. Compile `Login.java` e `SampleServer.java`:
```
javac Login.java SampleServer.java
```

Observe que `Login.java` contém duas classes e, portanto, compilar `Login.java` cria `Login.class` e `MyAction.class`.

  4. Crie um arquivo JAR chamado `Login.jar` contendo `Login.class` e `MyAction.class`:
```
jar -cvf Login.jar Login.class MyAction.class
```

  5. Crie um arquivo JAR chamado `SampleServer.jar` contendo `SampleServer.class`:
```
jar -cvf SampleServer.jar SampleServer.class
```

#### Preparar SampleClient para Execução

Para preparar `SampleClient` para execução, faça o seguinte:

  1. Copie os seguintes arquivos para um diretório acessível pela máquina na qual você executará `SampleClient`:
     * O arquivo fonte [`Login.java`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>).
     * O arquivo fonte [`SampleClient.java`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>).
     * O arquivo de configuração de login [`csLogin.conf`](<#/doc/guides/security/source-code-jaas-java-gss-api-tutorials>).
  2. Compile `Login.java` e `SampleClient.java`:
```
javac Login.java SampleClient.java
```

  3. Crie um arquivo JAR chamado `Login.jar` contendo `Login.class` e `MyAction.class`:
```
jar -cvf Login.jar Login.class MyAction.class
```

  4. Crie um arquivo JAR chamado `SampleClient.jar` contendo `SampleClient.class`:
```
jar -cvf SampleClient.jar SampleClient.class
```

#### Executar SampleServer

É importante executar `SampleServer` antes de `SampleClient` porque `SampleClient` tentará fazer uma conexão de socket com `SampleServer` e isso falhará se `SampleServer` ainda não estiver em execução e aceitando conexões de socket.

Para executar `SampleServer`, certifique-se de executá-lo na máquina em que se espera que ele seja executado. Este nome de máquina (nome do host) é especificado como um argumento para `SampleClient`. O nome do principal de serviço aparece em vários lugares, incluindo o arquivo de configuração de login.

Vá para o diretório no qual você preparou `SampleServer` para execução. Execute a classe `Login`, especificando

  * Uma cláusula `-classpath` apropriada para que as classes sejam pesquisadas nos arquivos JAR `Login.jar` e `SampleServer.jar`
  * `-Djava.security.krb5.realm=<your_realm>` que seu realm Kerberos é o especificado. Por exemplo, se seu realm for `KRBNT-OPERATIONS.EXAMPLE.COM`, você colocaria `-Djava.security.krb5.realm=KRBNT-OPERATIONS.EXAMPLE.COM`.
  * `-Djava.security.krb5.kdc=<your_kdc>` que seu KDC Kerberos é o especificado. Por exemplo, se seu KDC for `samplekdc.example.com`, você colocaria `-Djava.security.krb5.kdc=samplekdc.example.com`.
  * `-Djava.security.auth.login.config=csLogin.conf` que o arquivo de configuração de login a ser usado é `csLogin.conf`

Note:

Se você usar um único sinal de igual (`=`) com a propriedade de sistema `java.security.auth.login.config` (em vez de um sinal de igual duplo (`==`)), então as configurações especificadas por esta propriedade de sistema e pelo arquivo `java.security` serão usadas.

Você passa o nome da sua aplicação (neste caso, `SampleServer`) como um argumento para Login. Em seguida, você adiciona como argumentos quaisquer argumentos exigidos pela sua aplicação, que no caso de `SampleServer` é um único argumento especificando o número da porta a ser usada para escutar por conexões de cliente. Escolha um número de porta alto, improvável de ser usado para qualquer outra coisa. Um exemplo seria algo como 4444.

A seguir estão os comandos completos a serem usados para Windows, Linux e macOS. A única diferença é que no Windows você usa ponto e vírgula para separar os itens do classpath, enquanto no Linux e macOS você usa dois pontos para essa finalidade.

Note:

Nestes comandos, você deve substituir `<port_number>` por um número de porta apropriado, `<your_realm>` pelo seu realm Kerberos e `<your_kdc>` pelo seu KDC Kerberos.

Aqui está o comando para Windows:
```
    java -classpath Login.jar;SampleServer.jar 
     -Djava.security.krb5.realm=<your_realm> 
     -Djava.security.krb5.kdc=<your_kdc> 
     -Djava.security.auth.login.config=csLogin.conf 
     Login SampleServer <port_number>
```

Aqui está o comando para Linux e macOS:
```
    java -classpath Login.jar:SampleServer.jar 
     -Djava.security.krb5.realm=<your_realm>
     -Djava.security.krb5.kdc=<your_kdc> 
     -Djava.security.auth.login.config=csLogin.conf 
     Login SampleServer <port_number>
```

Digite o comando completo em uma única linha. Múltiplas linhas são usadas aqui para legibilidade. Se o comando for muito longo para o seu sistema, você pode precisar colocá-lo em um arquivo `.bat` (para Windows) ou um arquivo `.sh` (para Linux e macOS) e então executar esse arquivo para executar o comando.

Você será solicitado a fornecer a senha Kerberos para o principal de serviço. O mecanismo de autenticação Kerberos subjacente especificado no arquivo de configuração de login fará o login do principal de serviço no Kerberos. Uma vez que a autenticação seja concluída com sucesso, o código `SampleServer` será executado em nome do principal de serviço. Ele escutará por conexões de socket na porta especificada.

Para sugestões de solução de problemas de login, consulte [Solução de Problemas de Logins](<#/doc/guides/security/troubleshooting-jgss>).

#### Executar SampleClient

Para executar `SampleClient`, vá para o diretório no qual você preparou `SampleClient` para execução. Em seguida, execute a classe `Login`, especificando

  * Uma cláusula `-classpath` apropriada para que as classes sejam pesquisadas nos arquivos JAR `Login.jar` e `SampleClient.jar`
  * `-Djava.security.krb5.realm=<your_realm>` que seu realm Kerberos é o especificado.
  * `-Djava.security.krb5.kdc=<your_kdc>` que seu KDC Kerberos é o especificado.
  * `-Djava.security.auth.login.config=csLogin.conf` que o arquivo de configuração de login a ser usado é `csLogin.conf`.

Passe para Login o nome da sua aplicação (`SampleClient`) seguido pelos argumentos exigidos por `SampleClient`. Os argumentos de `SampleClient` são (1) o nome Kerberos do principal de serviço que representa `SampleServer` (consulte [Nomes de Principal de Usuário e Serviço Kerberos](<#/doc/guides/security/use-jaas-login-utility-and-java-gss-api-secure-message-exchanges>), (2) o nome do host (máquina) no qual `SampleServer` está sendo executado, e (3) o número da porta na qual `SampleServer` está escutando por conexões de cliente.

A seguir estão os comandos completos a serem usados para Windows, Linux e macOS.

Note:

Importante: Nestes comandos, você deve substituir `<service_principal>`, `<host>`, `<port_number>`, `<your_realm>` e `<your_kdc>` por valores apropriados (e observe que o número da porta deve ser o mesmo que o número da porta passado como argumento para `SampleServer`). Esses valores não precisam ser colocados entre aspas.

Aqui está o comando para Windows:
```
    java -classpath Login.jar;SampleClient.jar 
     -Djava.security.krb5.realm=<your_realm> 
     -Djava.security.krb5.kdc=<your_kdc> 
     -Djava.security.auth.login.config=csLogin.conf 
     Login SampleClient <service_principal> <host> <port_number>
```

Aqui está o comando para Linux e macOS:
```
    java -classpath Login.jar:SampleClient.jar 
     -Djava.security.krb5.realm=<your_realm> 
     -Djava.security.krb5.kdc=<your_realm> 
     -Djava.security.auth.login.config=csLogin.conf 
     Login SampleClient <service_principal> <host> <port_number>
```

Digite o comando completo em uma única linha. Múltiplas linhas são usadas aqui para legibilidade. Assim como no comando para executar `SampleServer`, se o comando for muito longo para ser digitado diretamente na sua janela de comando, coloque-o em um arquivo `.bat` (Windows) ou um arquivo `.sh` (Linux e macOS) e então execute esse arquivo.

Quando solicitado, digite seu nome de usuário e senha Kerberos. O mecanismo de autenticação Kerberos subjacente especificado no arquivo de configuração de login fará o seu login no Kerberos. Uma vez que a autenticação seja concluída com sucesso, o código `SampleClient` será executado em seu nome. Ele solicitará uma conexão de socket com `SampleServer`. Uma vez que `SampleServer` aceite a conexão, `SampleClient` e `SampleServer` estabelecem um contexto compartilhado e então trocam mensagens conforme descrito neste tutorial.

Para sugestões de solução de problemas de login, consulte [Solução de Problemas de Logins](<#/doc/guides/security/troubleshooting-jgss>).

### Usando Credenciais Delegadas do Cliente

O tipo mais completo de impersonificação de cliente é possível se o cliente delegar suas credenciais ao servidor.

Lembre-se que, antes do estabelecimento do contexto com o aceitador de contexto (o servidor em nosso tutorial anterior), o iniciador de contexto (o cliente) define várias opções de contexto. Se o iniciador chamar o método `requestCredDeleg` no objeto `context` com um argumento `true`, como em
```
    context.requestCredDeleg(true);
```

então isso solicita que as credenciais do iniciador sejam delegadas ao aceitador durante o estabelecimento do contexto.

A delegação de credenciais do iniciador para o aceitador permite que o aceitador se autentique como um agente ou delegado do iniciador.

Primeiro, após o estabelecimento do contexto, o aceitador deve determinar se a delegação de credenciais realmente ocorreu. Ele faz isso chamando o método `getCredDelegState`:
```
    boolean delegated = context.getCredDelegState();
```

Se as credenciais foram delegadas, o aceitador pode obtê-las chamando o método `getDelegCr`:
```
    GSSCredential clientCr = context.getDelegCred();
```

O objeto GSSCredential resultante pode então ser usado para iniciar contextos GSS-API subsequentes como um "delegado" do iniciador. Por exemplo, o servidor poderia autenticar-se como o cliente para um servidor de backend que se importa mais com quem era o cliente original do que com quem é o servidor intermediário.

Atuando como o cliente, o servidor pode estabelecer uma conexão com o servidor de backend, estabelecer um contexto de segurança conjunto e trocar mensagens basicamente da mesma maneira que o cliente e o servidor fizeram.

Uma maneira de fazer isso é que, quando o servidor chama o método `createContext` de um GSSManager, ele poderia passar para `createContext` as credenciais delegadas em vez de passar um `null`.

Delegação Restrita

Se a delegação restrita estiver configurada em um servidor KDC, então, no lado do servidor, a chamada `getCredDelegState()` ainda pode retornar `true` e `getDelegCred()` retornaria credenciais delegadas, dependendo das configurações do KDC, mesmo que o cliente não tenha chamado `requestCredDeleg(true)`.