# Monitoramento e Gerenciamento Usando a Tecnologia JMX

## 2 Monitoramento e Gerenciamento Usando a Tecnologia JMX

A Java virtual machine (Java VM) possui instrumentação integrada que permite monitorá-la e gerenciá-la usando a tecnologia Java Management Extensions (JMX). Esses utilitários de gerenciamento integrados são frequentemente chamados de ferramentas de gerenciamento prontas para uso (out-of-the-box) para a Java VM. Você também pode monitorar quaisquer aplicações apropriadamente instrumentadas usando a JMX API.

### Configurando Propriedades do Sistema

Para habilitar e configurar o agente JMX pronto para uso, de modo que ele possa monitorar e gerenciar a Java VM, você deve definir certas propriedades do sistema ao iniciar a Java VM. Você define uma propriedade do sistema na linha de comando da seguinte forma:
```
    java -Dproperty=value ...
```

Você pode definir qualquer número de propriedades do sistema dessa forma. Se você não especificar um valor para uma propriedade de gerenciamento, a propriedade será definida com seu valor padrão. Consulte [Tabela 2-1](<#/doc/guides/management/monitoring-and-management-using-jmx-technology>) para o conjunto completo de propriedades de gerenciamento prontas para uso. Você também pode definir propriedades do sistema em um arquivo de configuração, conforme descrito na seção [Propriedades de Monitoramento e Gerenciamento Prontas para Uso](<#/doc/guides/management/monitoring-and-management-using-jmx-technology>).

Nota:

Para executar a Java VM a partir da linha de comando, você deve adicionar `JAVA_HOME/bin` ao seu path, onde `JAVA_HOME` é o diretório onde o JDK está instalado. Alternativamente, você pode inserir o caminho completo ao digitar o comando.

A sintaxe e o conjunto completo de opções de linha de comando suportadas pelas Java HotSpot VMs são descritos em [O Comando java](<#/>) nas Especificações da Ferramenta do Java Development Kit.

### Gerenciamento Pronto para Uso

Com a plataforma Java SE atual, qualquer aplicação pode ser monitorada e gerenciada localmente quando necessário através da Attach API (não é preciso especificar `-Dcom.sun.management.jmxremote`). No entanto, você precisa habilitar e configurar o monitoramento remoto.

Nota:

Em plataformas Windows, por razões de segurança, o monitoramento e gerenciamento local é suportado apenas se o seu diretório temporário padrão estiver em um sistema de arquivos que permita a configuração de permissões em arquivos e diretórios (por exemplo, em um sistema de arquivos New Technology File System (NTFS)). Não é suportado em um sistema de arquivos File Allocation Table (FAT), que oferece controles de acesso insuficientes.

#### Monitoramento e Gerenciamento Local Usando JConsole

O monitoramento local com JConsole é útil para desenvolvimento. Em ambientes de produção, tenha cautela, pois o próprio JConsole pode afetar a plataforma que está sendo monitorada.

Para realizar o monitoramento local usando JConsole, inicie a ferramenta digitando `jconsole` em um shell de comando. Ao iniciar `jconsole` sem nenhum argumento, ele detectará automaticamente todas as aplicações Java locais e exibirá uma caixa de diálogo que permite selecionar a aplicação que você deseja monitorar. Tanto o JConsole quanto a aplicação devem ser executados pelo mesmo usuário, pois o sistema de monitoramento e gerenciamento usa as permissões de arquivo do sistema operacional.

Nota:

Para executar o JConsole a partir da linha de comando, você deve adicionar `JDK_HOME/bin` ao seu path. Alternativamente, você pode inserir o caminho completo ao digitar o comando. Consulte [Usando JConsole](<#/doc/guides/management/using-jconsole>).

#### Monitoramento e Gerenciamento Remoto

RMI é o transporte para conexão remota. Por padrão, os stubs remotos para objetos remotos criados localmente que são enviados aos clientes contêm o endereço IP do host local no formato `dotted-quad`. Para que os stubs remotos sejam associados a um endereço de interface específico, a propriedade de sistema `java.rmi.server.hostname` deve ser definida para o endereço IP dessa interface.

Para habilitar o monitoramento e gerenciamento a partir de sistemas remotos, você deve definir a seguinte propriedade de sistema ao iniciar a Java VM:
```
    com.sun.management.jmxremote.port=portNum
    
```

Onde, `portNum` é o número da porta para habilitar conexões JMX RMI. Certifique-se de especificar um número de porta não utilizado. Além de publicar um conector RMI para acesso local, a definição desta propriedade publica um conector RMI adicional em um registro privado somente leitura na porta especificada usando o nome `jmxrmi`. O número da porta ao qual o conector RMI será vinculado usando a propriedade de sistema:
```
    com.sun.management.jmxremote.rmi.port
```

Certifique-se de usar um número de porta não utilizado.

Nota:

Você deve definir a propriedade de sistema anterior além de quaisquer propriedades que você possa definir para segurança.

Você também pode configurar a terceira porta que aceita conexões JMX locais usando a propriedade de sistema:
```
    com.sun.management.jmxremote.local.port
```

O monitoramento e gerenciamento remoto requer segurança para garantir que pessoas não autorizadas não possam controlar ou monitorar sua aplicação. A autenticação por senha sobre Secure Sockets Layer (SSL) e Transport Layer Security (TLS) é habilitada por padrão. Você pode desabilitar a autenticação por senha e o SSL separadamente.

Nota:

Para sistemas de produção, use ambos [certificados de cliente SSL](<#/doc/guides/management/monitoring-and-management-using-jmx-technology>) para autenticar o host cliente e autenticação por senha para gerenciamento de usuários. Consulte [Usando SSL](<#/doc/guides/management/monitoring-and-management-using-jmx-technology>) e [Usando Autenticação LDAP](<#/doc/guides/management/monitoring-and-management-using-jmx-technology>).

A plataforma Java suporta [módulos de login](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.auth/com/sun/security/auth/module/package-summary.html>) plugáveis para autenticação. Você pode conectar qualquer módulo de login dependendo da infraestrutura de autenticação em sua organização. [Usando Autenticação LDAP](<#/doc/guides/management/monitoring-and-management-using-jmx-technology>) descreve como conectar o módulo [com.sun.security.auth.module.LdapLoginModule](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.auth/com/sun/security/auth/module/LdapLoginModule.html>) para autenticação baseada em Lightweight Directory Access Protocol (LDAP).

Depois de habilitar o agente JMX para uso remoto, você pode monitorar sua aplicação usando JConsole, conforme descrito em [Monitoramento Remoto com JConsole](<#/doc/guides/management/monitoring-and-management-using-jmx-technology>). Como conectar-se ao agente de gerenciamento programaticamente é descrito em [Conectando-se ao Agente JMX Programaticamente](<#/doc/guides/management/monitoring-and-management-using-jmx-technology>).

##### Usando Autenticação por Senha

Esta seção detalha diferentes métodos de autenticação por senha.

###### Usando Autenticação por Senha Baseada em Arquivo

O mecanismo de autenticação por senha baseado em arquivo suportado pelo agente JMX armazena a senha em texto claro e destina-se apenas ao uso em desenvolvimento. Para uso em produção, é recomendado que você use [certificados de cliente SSL](<#/doc/guides/management/monitoring-and-management-using-jmx-technology>) para autenticação ou conecte uma configuração de login segura.

Nota:

Cuidado: Um problema de segurança potencial foi identificado com a autenticação por senha para conectores remotos quando o cliente obtém o conector remoto de um registro RMI inseguro (o padrão). Se um invasor iniciar um registro RMI falso no servidor de destino antes que o registro legítimo seja iniciado, o invasor poderá roubar as senhas dos clientes. Este cenário inclui o caso em que você inicia uma Java VM com gerenciamento remoto habilitado, usando a propriedade de sistema `com.sun.management.jmxremote.port=portNum`, mesmo quando o SSL está habilitado. Embora tais ataques provavelmente sejam notados, é, no entanto, uma vulnerabilidade.

Por padrão, quando você habilita o agente JMX para monitoramento remoto, ele usa autenticação por senha. Como as senhas são armazenadas em texto claro no arquivo de senha, não é aconselhável usar seu nome de usuário e senha regulares para monitoramento. Em vez disso, use os nomes de usuário especificados no arquivo de senha, como `monitorRole` e `controlRole`. Consulte [Usando Arquivos de Senha e Acesso](<#/doc/guides/management/monitoring-and-management-using-jmx-technology>).

###### Configurando o Arquivo de Senha

Você configura o arquivo de senha no diretório `JAVA_HOME/conf/management` da seguinte forma:

  1. Copie o arquivo de modelo de senha `jmxremote.password.template` para `jmxremote.password`.
  2. Defina as permissões do arquivo para que apenas o proprietário possa ler e gravar o arquivo de senha.
  3. Adicione senhas para funções como `monitorRole` e `controlRole`.

Se o JDK for usado para um único propósito ou se todas as invocações precisarem usar as mesmas funções e senhas para monitoramento, editar `jmxremote.password` no diretório `conf/management` é apropriado.

Se uma instância do JDK for executada com um arquivo `jmxremote.password` específico:

  1. Copie o modelo para `jmxremote.password` em outro local (não dentro do diretório do JDK).
  2. Defina as permissões do arquivo para que apenas o usuário que inicia a aplicação Java possa ler e gravar o arquivo de senha.
  3. Defina a seguinte propriedade de sistema ao iniciar a Java VM:
`com.sun.management.jmxremote.password.file=pwFilePath
```

Onde `pwFilePath` é o caminho para o arquivo de senha.

###### Desabilitando a Autenticação por Senha

A autenticação por senha para monitoramento remoto é habilitada por padrão. Para desabilitá-la, defina a seguinte propriedade de sistema ao iniciar a Java VM:
```
    com.sun.management.jmxremote.authenticate=false
    
```

AVISO:

Esta configuração é insegura. Qualquer usuário remoto que saiba (ou adivinhe) o número da sua porta JMX e o nome do host poderá monitorar e controlar sua aplicação e plataforma Java. Embora possa ser aceitável para desenvolvimento, não é recomendado para sistemas de produção.

Ao desabilitar a autenticação por senha, você também pode desabilitar o SSL, conforme descrito em Desabilitando a Segurança. Você também pode desabilitar senhas, mas usar autenticação de cliente SSL, conforme descrito em Habilitando a Autenticação de Cliente SSL.

###### Usando Autenticação LDAP

A implementação de JMXAuthenticator no agente JMX é baseada na tecnologia Java Authentication and Authorization Service (JAAS). A autenticação é realizada passando as credenciais do usuário para um objeto JAAS javax.security.auth.spi.LoginModule. A classe com.sun.security.auth.module.LdapLoginModule permite a autenticação usando LDAP. Você pode substituir a classe `LoginModule` padrão pela classe `LdapLoginModule`.

Crie um arquivo de configuração JAAS que funcione na organização empresarial necessária. Aqui está um exemplo de um arquivo de configuração (`ldap.config`):
```
    ExampleCompanyConfig {
        com.sun.security.auth.module.LdapLoginModule REQUIRED
            userProvider="ldap://example-ds/ou=people,dc=examplecompany,dc=com"
            userFilter="(&(uid={USERNAME})(objectClass=inetOrgPerson))"
            authzIdentity=monitorRole;
        };
```

Aqui está uma visão geral das opções mencionadas no arquivo de configuração:

  * A opção `com.sun.security.auth.module.LdapLoginModule REQUIRED` significa que a autenticação usando `LdapLoginModule` é necessária para que a autenticação geral seja bem-sucedida.
  * A opção `userProvider` identifica o servidor LDAP e a posição na árvore de diretórios onde as entradas de usuário estão localizadas.
  * A opção `userFilter` especifica o filtro de busca a ser usado para localizar uma entrada de usuário no diretório LDAP. O token `{USERNAME}` é substituído pelo nome de usuário antes que o filtro seja usado para buscar no diretório.
  * A opção `authzIdentity` especifica a função de acesso para usuários autenticados. No exemplo, os usuários autenticados terão a opção `monitorRole`. Consulte Arquivos de Acesso.

Os detalhes das opções de configuração mencionadas no exemplo de código são explicados na classe com.sun.security.auth.module.LdapLoginModule.

Inicie sua aplicação com as seguintes propriedades definidas na linha de comando:

  * `com.sun.management.jmxremote.login.config`: Esta propriedade configura o agente JMX para usar a entrada de configuração JAAS especificada.
  * `java.security.auth.login.config`: Esta propriedade especifica o caminho para o arquivo de configuração JAAS.

Aqui está uma linha de comando de exemplo:
```
    java -Dcom.sun.management.jmxremote.port=5000
         -Dcom.sun.management.jmxremote.login.config=ExampleCompanyConfig
         -Djava.security.auth.login.config=ldap.config
         -jar MyApplication.jar
    
```

##### Usando SSL

O SSL é habilitado por padrão quando você habilita o monitoramento e gerenciamento remoto, mas precisa ser configurado.

Um `keystore` é um repositório seguro de chaves criptográficas ou certificados confiáveis. Um `truststore` é onde colocamos os certificados em que confiamos. O comando `keytool` pode criar e manipular ambos `keystores` e `truststores`. Ele pode funcionar em um armazenamento padrão para o usuário, ou em um armazenamento especificado com uma opção de linha de comando.

A explicação completa da configuração e personalização do SSL está além do escopo deste documento, mas você pode consultar:

  * Visão Geral de Segurança Java
  * Guia de Referência do Java Secure Socket Extension (JSSE)

no Guia do Desenvolvedor de Segurança da Plataforma Java, Standard Edition.

Cenários de Exemplo de Configuração de SSL

Aqui estão alguns cenários de exemplo que o ajudarão a configurar o SSL.

Use um par de certificados autoassinados no agente JMX (servidor)

  1. Crie um par de certificados autoassinados no servidor JMX:
`keytool -genkeypair -dname "CN=My Name, OU=Department, O=Company, L=City, S=State,
                 C=Country" -alias jmxservercert -keyalg rsa -keystore /path/to/keystore -storepass
                 mystorepass
```

Especificar o local do `keystore` é opcional. O `keytool` usa um arquivo `keystore` padrão `.keystore` no diretório home. No entanto, é recomendado especificar o local do `keystore`, pois pode haver diferentes `keystores` para diferentes propósitos.

  2. Exporte o certificado como um arquivo. Isso exporta a chave pública do par de certificados gerado:
`keytool -export -alias jmxservercert -keystore /path/to/keystore -storepass mystorepass
                 -rfc -file exported_server_cert
```

  3. Copie o certificado exportado para o cliente (onde a ferramenta de anexação é executada) e importe para um `truststore`:
`keytool -importcert -alias jmxservercert -file exported_server_cert -storepass mystorepass
                 -keystore myTruststore
```

  4. Execute o servidor, especificando o `keystore` e a porta específica onde o JMX está habilitado:
`java -Djavax.net.ssl.keyStore=/path/to/keystore
                 -Djavax.net.ssl.keyStorePassword=mystorepass -Dcom.sun.management.jmxremote.port=<<PORTNUMBER>>
                 MyJavaApp
```

  5. Execute a ferramenta cliente, por exemplo JConsole:
`jconsole -J-Djavax.net.ssl.trustStore=myTruststore
                 -J-Djavax.net.ssl.trustStorePassword=mystorepass
```

  6. Na caixa de diálogo Nova Conexão, especifique host:port e o nome da função e senha configurados. Consulte [Usando Arquivos de Senha e Acesso](<#/doc/guides/management/monitoring-and-management-using-jmx-technology>).

Outra opção para importar o certificado do servidor no cliente é importar para o `truststore` padrão. Isso está dentro do diretório do JDK, então pode não ser apropriado se o JDK for compartilhado, mas pode ser mais fácil, pois não há necessidade de especificar um local ou senha de `truststore` ao executar o JConsole. Por exemplo:
```
    keytool -importcert -file exported_server_cert
```

Habilitando a autenticação de cliente SSL

Na seção [Use um par de certificados autoassinados no agente JMX (servidor)](<#/doc/guides/management/monitoring-and-management-using-jmx-technology>), o certificado público do servidor prova a identidade do servidor. Nesta seção, o procedimento a seguir permite a autenticação SSL bidirecional, onde adicionalmente o servidor possui um certificado público do cliente como prova de sua identidade.

Antes de começar, crie um par de certificados autoassinados no agente JMX (servidor) e importe-o para o `truststore` do cliente, conforme os passos acima. Então:

  1. No cliente, gere um par de chaves:
`keytool -genkeypair -dname "CN=My Name, OU=Department, O=Company, L=City, S=State,
                 C=Country" -alias jmxservercert -keyalg rsa -storepass mystorepass
```

  2. Exporte o par de chaves:
`keytool -export -alias jmxclientcert -storepass mystorepass -rfc -file exported_client_cert
```

  3. No servidor JMX, importe
`keytool -importcert -alias jmxclientcert -file exported_client_cert -keystore myTruststore
                 -storepass mystorepass
```

  4. Execute o servidor JMX especificando o `truststore` e a propriedade `com.sun.management.jmxremote.ssl.need.client.auth`:
`java -Djavax.net.ssl.trustStore=myTruststore
         -Djavax.net.ssl.trustStorePassword=mystorepass
         -Djavax.net.ssl.keyStore=/path/to/keystore
         -Djavax.net.ssl.keyStorePassword=mystorepass
         -Dcom.sun.management.jmxremote.port=PORTNUMBER
         -Dcom.sun.management.jmxremote.ssl.need.client.auth=true MyJavaApp
```

  5. Execute o JConsole (o cliente):
`jconsole -J-Djavax.net.ssl.trustStore=myTruststore
                 -J-Djavax.net.ssl.trustStorePassword=mystorepass
```

SSL com certificados assinados por CA

Quando um certificado é assinado por uma Certificate Authority (Autoridade Certificadora), ele pode ser verificado sem ser exportado e importado para a outra parte.

O procedimento geral para configurar o SSL é o seguinte:

  1. Se você não tiver um par de chaves e certificado configurados no servidor, execute as seguintes tarefas:
     * Gere um par de chaves com o comando `keytool -genkey`.
     * Solicite um certificado assinado de uma autoridade certificadora (CA) com o comando `keytool -certreq`. Isso cria uma Certificate Signing Request (CSR).
     * Importe o certificado para o seu keystore com o comando `keytool -import`. Consulte Importando Certificados na documentação do `keytool`.

  2. Configure o SSL no sistema do servidor. A explicação completa da configuração e personalização do SSL está além do escopo deste documento, mas você geralmente precisa definir as propriedades do sistema conforme descrito na lista a seguir: `javax.net.ssl.keyStore` | Localização do Keystore
---|---
`javax.net.ssl.keyStoreType` | Tipo de keystore padrão
`javax.net.ssl.keyStorePassword` | Senha do keystore padrão
`javax.net.ssl.trustStore` | Localização do Truststore
`javax.net.ssl.trustStoreType` | Tipo de truststore padrão
`javax.net.ssl.trustStorePassword` | Senha do truststore padrão

  3. A configuração das propriedades do sistema é detalhada na seção Configurando Propriedades do Sistema.
  4. Com este certificado no servidor, o cliente pode confiar no servidor. Da mesma forma, o cliente pode criar um par de chaves e, em seguida, um CSR para que seja assinado por uma CA. Então, o servidor pode confiar no cliente e a propriedade `com.sun.management.jmxremote.ssl.need.client.auth` pode ser definida como true.

Consulte:

  * O Comando keytool nas Especificações da Ferramenta do Java Development Kit
  * Personalizando os Keystores e Truststores Padrão, Tipos de Armazenamento e Senhas de Armazenamento no Guia do Desenvolvedor de Segurança da Plataforma Java, Standard Edition

##### Habilitando a Autenticação do Registro RMI

Ao configurar conexões para monitorar aplicações remotas, você pode opcionalmente vincular o stub do conector RMI a um registro RMI que é protegido por SSL. Isso permite que clientes com os certificados SSL apropriados obtenham o stub do conector que está registrado no registro RMI. Para proteger o registro RMI usando SSL, você deve definir a seguinte propriedade de sistema:
```
    com.sun.management.jmxremote.registry.ssl=true
    
```

Quando esta propriedade é definida como `true`, um registro RMI protegido por SSL será criado e configurado pelo agente de gerenciamento pronto para uso quando a Java VM for iniciada. O valor padrão desta propriedade é `false`. No entanto, é recomendado que você defina esta propriedade como `true`. Se esta propriedade for definida como `true`, então para ter segurança total, você também deve habilitar a autenticação de cliente SSL.

##### Habilitando a Autenticação de Cliente SSL

Para habilitar a autenticação de cliente SSL, defina a seguinte propriedade de sistema ao iniciar a Java VM:
```
    com.sun.management.jmxremote.ssl.need.client.auth=true
    
```

O SSL deve estar habilitado (o padrão é `false`) para usar a autenticação de cliente SSL. É recomendado que você defina esta propriedade como `true`. Esta configuração exige que o sistema cliente tenha um certificado digital válido. Você deve instalar um certificado e configurar o SSL no sistema cliente, conforme descrito em Usando SSL. Conforme declarado na seção anterior, se a proteção SSL do registro RMI estiver habilitada, a autenticação de cliente SSL deve ser definida como `true`.

##### Desabilitando SSL

Para desabilitar o SSL ao monitorar remotamente, você deve definir a seguinte propriedade de sistema ao iniciar a Java VM:
```
    com.sun.management.jmxremote.ssl=false
    
```

A autenticação por senha ainda será necessária, a menos que você a desabilite, conforme especificado em Desabilitando a Autenticação por Senha.

##### Desabilitando a Segurança

Para desabilitar tanto a autenticação por senha quanto o SSL (ou seja, desabilitar toda a segurança), você deve definir as seguintes propriedades de sistema ao iniciar a Java VM:
```
    com.sun.management.jmxremote.authenticate=false
    com.sun.management.jmxremote.ssl=false
    
```

AVISO:

Esta configuração é insegura; qualquer usuário remoto que saiba (ou adivinhe) o número da sua porta e o nome do host poderá monitorar e controlar suas aplicações e plataforma Java.

Consequentemente, embora desabilitar a segurança possa ser aceitável para desenvolvimento, é fortemente recomendado que você não desabilite a segurança para sistemas de produção.

##### Monitoramento Remoto com JConsole

Você pode monitorar remotamente uma aplicação usando JConsole, com ou sem segurança habilitada.

##### Monitoramento Remoto com JConsole com SSL Habilitado

Para monitorar uma aplicação remota com SSL habilitado, você precisa configurar o arquivo `truststore` no sistema onde o JConsole está sendo executado e configurar o SSL corretamente. Por exemplo, você pode criar um arquivo `keystore` e iniciar sua aplicação (chamada `Server` neste exemplo) com os seguintes comandos:
```
    % java -Djavax.net.ssl.keyStore=keystore \
      -Djavax.net.ssl.keyStorePassword=password Server
    
```

Consulte Personalizando os Keystores e Truststores Padrão, Tipos de Armazenamento e Senhas de Armazenamento no Guia do Desenvolvedor de Segurança da Plataforma Java, Standard Edition.

Se você criar o arquivo `keystore` e iniciar a aplicação `Server`, então inicie o JConsole da seguinte forma:
```
    % jconsole -J-Djavax.net.ssl.trustStore=truststore \
      -J-Djavax.net.ssl.trustStorePassword=trustword
    
```

Consulte Usando JConsole.

A configuração autentica apenas o servidor. Se a autenticação de cliente SSL estiver configurada, então você precisa fornecer um arquivo `keystore` similar para as chaves do JConsole e um arquivo `truststore` apropriado para a aplicação.

#### Usando Arquivos de Senha e Acesso

Os arquivos de senha e acesso controlam a segurança para monitoramento e gerenciamento remoto. Esses arquivos estão localizados por padrão em `JAVA_HOME/conf/management` e estão no formato padrão de arquivo de propriedades Java. Para mais informações sobre o formato, consulte a referência da API para o pacote java.util.Properties.

##### Arquivos de Senha

O arquivo de senha define as diferentes funções e suas senhas. O arquivo de controle de acesso (`jmxremote.access` por padrão) define o acesso permitido para cada função. Para ser funcional, uma função deve ter uma entrada tanto no arquivo de senha quanto no arquivo de acesso.

O JDK contém um modelo de arquivo de senha chamado `jmxremote.password.template`. Copie este arquivo para `JAVA_HOME/conf/management/jmxremote.password` em seu diretório home e adicione as senhas para as funções definidas no arquivo de acesso.

Você deve garantir que apenas o proprietário tenha permissões de leitura e gravação neste arquivo, pois ele contém as senhas em texto claro. Por razões de segurança, o sistema verifica se o arquivo é legível apenas pelo proprietário e sai com um erro se não for. Assim, em um ambiente multiusuário, você deve armazenar o arquivo de senha em um local privado, como seu diretório home.

Os nomes das propriedades são funções, e o valor associado é a senha da função. Exemplo 2-1 mostra entradas de exemplo no arquivo de senha.

Exemplo 2-1 Um Arquivo de Senha de Exemplo
```
    # specify actual password instead of the text password
    monitorRole password
    controlRole password
    
```

Em sistemas operacionais Linux ou macOS, você pode definir as permissões de arquivo para o arquivo de senha executando o seguinte comando:
```
    chmod 600 jmxremote.password
    
```

##### Arquivos de Acesso

Por padrão, o arquivo de acesso é nomeado `jmxremote.access`. Os nomes das propriedades são identidades do mesmo espaço do arquivo de senha. O valor associado deve ser `readonly` ou `readwrite`.

O arquivo de acesso define funções e seus níveis de acesso. Por padrão, o arquivo de acesso define as seguintes funções primárias:

  * `monitorRole`, que concede acesso somente leitura para monitoramento.
  * `controlRole`, que concede acesso de leitura/gravação para monitoramento e gerenciamento.

Uma entrada de controle de acesso consiste em um nome de função e um nível de acesso associado. O nome da função não pode conter espaços ou tabulações e deve corresponder a uma entrada no arquivo de senha. O nível de acesso pode ser um dos seguintes:

  * `readonly`: Concede acesso para ler os atributos do MBean. Para monitoramento, isso significa que um cliente remoto nesta função pode ler medições, mas não pode realizar nenhuma ação que altere o ambiente do programa em execução. O cliente remoto também pode ouvir notificações de MBean.
  * `readwrite`: Concede acesso para ler e gravar os atributos do MBean, e para chamar operações neles. Este acesso deve ser concedido apenas a clientes confiáveis, porque eles podem potencialmente interferir na operação de uma aplicação. O nível de acesso `readwrite` pode ser opcionalmente seguido pelas palavras-chave `create` ou `unregister`. A palavra-chave `unregister` concede acesso para desregistrar (excluir) MBeans. A palavra-chave `create` concede acesso para criar MBeans de uma classe particular ou de qualquer classe que corresponda a um padrão particular. O acesso deve ser concedido apenas para criar MBeans de classes conhecidas e confiáveis.

Uma função deve ter apenas uma entrada no arquivo de acesso. Se uma função não tiver entrada, ela não terá acesso. Se uma função tiver múltiplas entradas, a última entrada terá precedência. As funções predefinidas típicas no arquivo de acesso se assemelham ao que é mostrado no Exemplo 2-2.

Exemplo 2-2 Arquivo de Acesso de Exemplo
```
    # The "monitorRole" role has readonly access.
    # The "controlRole" role has readwrite access.
    monitorRole readonly
    controlRole readwrite
    
```

No Exemplo 2-3, a entrada concede acesso `readwrite` a `controlRole`. Ela também fornece acesso para criar MBeans da classe `javax.management.monitor.CounterMonitor` e para desregistrar qualquer MBean.

Exemplo 2-3 Exemplo usando `create` e `unregister`
```
    controlRole readwrite \
                 create javax.management.monitor.CounterMonitorMBean \
                 unregister
```

### Monitoramento Remoto com JConsole com SSL Desabilitado

Para monitorar uma aplicação remota com SSL desabilitado, inicie o JConsole com o seguinte comando:
```
    % jconsole hostName:portNum
    
```

Você também pode omitir o nome do host e o número da porta, e inseri-los na caixa de diálogo que o JConsole fornece.

### Propriedades de Monitoramento e Gerenciamento Prontas para Uso

Você pode definir propriedades de monitoramento e gerenciamento prontas para uso em um arquivo de configuração ou na linha de comando. As propriedades especificadas na linha de comando substituem as propriedades em um arquivo de configuração. O local padrão para o arquivo de configuração é `JAVA_HOME/conf/management/management.properties`. A Java VM lê este arquivo se alguma das propriedades de linha de comando estiver definida:

  * `com.sun.management.jmxremote`

ou
  * `com.sun.management.jmxremote.port`

ou
  * `com.sun.management.jmxremote.local.port`

Você pode especificar um local diferente para o arquivo de configuração com a seguinte opção de linha de comando:
```
    com.sun.management.config.file=ConfigFilePath
    
```

`ConfigFilePath` é o caminho para o arquivo de configuração.

Tabela 2-1 descreve as propriedades de monitoramento e gerenciamento prontas para uso.

Tabela 2-1 Propriedades de Monitoramento e Gerenciamento Prontas para Uso

Propriedade | Descrição | Valores
---|---|---
`com.sun.management.jmxremote` | Habilita o agente remoto JMX e o monitoramento local usando um conector JMX. Este agente é publicado em uma interface privada que é usada pelo JConsole e quaisquer outros clientes JMX locais, que usam a Attach API. O JConsole pode usar este conector se for iniciado pelo mesmo usuário que iniciou o agente. Nenhum arquivo de senha ou acesso é verificado para solicitações provenientes deste conector. | `true` / `false`. O padrão é `true`.
`com.sun.management.jmxremote.port` | Habilita o agente remoto JMX e cria um conector JMX remoto para escutar através da porta especificada. Por padrão, as propriedades de SSL, senha e arquivo de acesso são usadas para este conector. Ele também habilita o monitoramento local conforme descrito para a propriedade `com.sun.management.jmxremote`. | Número da porta. Sem padrão.
`com.sun.management.jmxremote.registry.ssl` | Vincula o stub do conector RMI a um registro RMI que é protegido por SSL. | `true` / `false`. O padrão é `false`.
`com.sun.management.jmxremote.ssl` | Habilita o monitoramento seguro usando SSL. Se o valor for `false`, então o SSL não é usado. | `true` / `false`. O padrão é `true`.
`com.sun.management.jmxremote.ssl.enabled.protocols` | Mostra uma lista de versões de protocolo SSL/TLS separadas por vírgulas para habilitar. Usado em conjunto com `com.sun.management.jmxremote.ssl`. | Versão de protocolo SSL/TLS padrão.
`com.sun.management.jmxremote.ssl.enabled.cipher.suites` | Mostra uma lista de suites de cifras SSL/TLS separadas por vírgulas para habilitar. Usado em conjunto com `com.sun.management.jmxremote.ssl`. | Suites de cifras SSL/TLS padrão.
`com.sun.management.jmxremote.ssl.need.client.auth` | Realiza autenticação de cliente se esta propriedade for `true` e a propriedade `com.sun.management.jmxremote.ssl` também for `true`. É recomendado que você defina esta propriedade como `true`. | `true` / `false`. O padrão é `false`.
`com.sun.management.jmxremote.authenticate` | Impede que o JMX use arquivos de senha ou acesso se esta propriedade for `false`. Todos os usuários recebem acesso completo. | `true` / `false`. O padrão é `true`.
`com.sun.management.jmxremote.password.file` | Especifica o local para o arquivo de senha. Se `com.sun.management.jmxremote.authenticate` for `false`, então esta propriedade, e os arquivos de senha e acesso são ignorados. Caso contrário, o arquivo de senha deve existir e estar no formato válido. Se o arquivo de senha estiver vazio ou não existir, nenhum acesso é permitido. | `JAVA_HOME/conf/management/jmxremote.password`
`com.sun.management.jmxremote.access.file` | Especifica o local para o arquivo de acesso. Se `com.sun.management.jmxremote.authenticate` for false, então esta propriedade, e os arquivos de senha e acesso, são ignorados. Caso contrário, o arquivo de acesso deve existir e estar no formato válido. Se o arquivo de acesso estiver vazio ou não existir, nenhum acesso é permitido. | `JAVA_HOME/conf/management/jmxremote.access`
`com.sun.management.jmxremote.login.config` | Especifica o nome de uma entrada de configuração de login do Java Authentication and Authorization Service (JAAS) a ser usada quando o agente JMX autentica usuários. Ao usar esta propriedade para sobrescrever a configuração de login padrão, a entrada de configuração nomeada deve estar em um arquivo que é carregado pelo JAAS. Além disso, os módulos de login especificados na configuração devem usar os callbacks de nome e senha para adquirir as credenciais do usuário. Para mais informações, consulte a documentação da API para `javax.security.auth.callback.NameCallback` e `javax.security.auth.callback.PasswordCallback`. | A configuração de login padrão é uma autenticação de senha baseada em arquivo.
`com.sun.management.jmxremote.rmi.port` | Especifica o número da porta à qual o conector RMI será vinculado. | Número da porta. Certifique-se de usar um número de porta não utilizado.
`com.sun.management.jmxremote.local.port` | Especifica o número da porta local que aceita conexões JMX locais. | Número da porta. Certifique-se de usar um número de porta não utilizado.

#### Erros de Configuração

Se ocorrerem erros durante a inicialização do servidor MBean, do registro RMI ou do conector, a JVM lançará uma exceção e será encerrada. Os erros de configuração incluem o seguinte:

  * Falha ao vincular ao número da porta

  * Arquivo de senha inválido

  * Arquivo de acesso inválido

  * Arquivo de senha é legível por usuários que não sejam o proprietário

### Conectando-se ao Agente JMX Programaticamente

Depois de habilitar o agente JMX, um cliente pode usar a seguinte URL para acessar o serviço de monitoramento:
```
    service:jmx:rmi:///jndi/rmi://hostName:portNum/jmxrmi
    
```

Um cliente pode criar um conector para o agente instanciando um objeto `javax.management.remote.JMXServiceURL` usando a URL e, em seguida, criando uma conexão usando o método `JMXConnectorFactory.connect`, conforme mostrado no Exemplo 2-3.

Exemplo 2-3 Criando uma Conexão Usando JMXConnectorFactory.connect
```
    JMXServiceURL u = new JMXServiceURL(
      "service:jmx:rmi:///jndi/rmi://" + hostName + ":" + portNum +  "/jmxrmi");
      JMXConnector c = JMXConnectorFactory.connect(u); 
    
```

### Configurando Monitoramento e Gerenciamento Programaticamente

Você pode criar um cliente JMX que usa a Attach API para habilitar monitoramento e gerenciamento prontos para uso de quaisquer aplicações iniciadas na plataforma Java SE, sem precisar configurar as aplicações para monitoramento ao iniciá-las. A Attach API fornece uma maneira para as ferramentas se anexarem e iniciarem agentes na aplicação alvo. Depois que um agente está em execução, clientes JMX (e outras ferramentas) são capazes de obter o endereço do conector JMX para esse agente usando uma lista de propriedades que é mantida pela JVM em nome dos agentes. As propriedades na lista são acessíveis a partir de ferramentas que usam a Attach API. Assim, se um agente é iniciado em uma aplicação, e se o agente cria uma propriedade para representar uma informação de configuração, então essa informação de configuração está disponível para ferramentas que se anexam à aplicação.

O agente JMX cria uma propriedade com o endereço do servidor conector JMX local. Isso permite que as ferramentas JMX se anexem e obtenham o endereço do conector de um agente, se ele estiver em execução.

Exemplo 2-4 mostra o código que pode ser usado em uma ferramenta JMX para se anexar a uma JVM alvo, obter o endereço do conector do agente JMX e conectar-se a ele.

Exemplo 2-4 Anexando uma Ferramenta JMX a um Conector e Obtendo o Endereço do Agente
```
    static final String CONNECTOR_ADDRESS =
    "com.sun.management.jmxremote.localConnectorAddress";
    
    // attach to the target application
    VirtualMachine vm = VirtualMachine.attach(id);
    
    // get the connector address
    String connectorAddress =
        vm.getAgentProperties().getProperty(CONNECTOR_ADDRESS);
    
    // no connector address, so we start the JMX agent
    if (connectorAddress == null) {
         vm.startLocalManagementAgent();
    
       // agent is started, get the connector address
       connectorAddress =
           vm.getAgentProperties().getProperty(CONNECTOR_ADDRESS);
    }
    // establish connection to connector server
    JMXServiceURL url = new JMXServiceURL(connectorAddress);
    JMXConnector jmxConnector = JMXConnectorFactory.connect(url);
    
```

Exemplo 2-4 usa o método `attach()` da classe `com.sun.tools.attach.VirtualMachine` para se anexar a uma JVM específica, de modo que possa ler as propriedades que a JVM alvo mantém em nome de quaisquer agentes em execução nela. Se um agente já estiver em execução, o método `getAgentProperties()` da classe `VirtualMachine` é chamado para obter o endereço do agente. O método `getAgentProperties()` retorna uma propriedade de string para o endereço do conector local `com.sun.management.jmxremote.localConnectorAddress`, que você pode usar para se conectar ao agente JMX local.

Se nenhum agente estiver em execução, um é carregado pela classe `VirtualMachine` e seu endereço de conector é obtido pelo método `getAgentProperties()`.

Uma conexão com o agente é então estabelecida chamando `JMXConnectorFactory.connect` em uma URL de serviço JMX que foi construída a partir deste endereço de conector.

Nota:

Antes do JDK 11, a Attach API tinha problemas para localizar JVMs em execução em contêineres Docker. Isso agora está corrigido, e `jcmd` e `jps` funcionam como esperado. No entanto, `jmc` não listará processos Java em execução em contêineres Docker separados. Não há uma maneira conhecida de fornecer explicitamente o PID do processo Java a esta ferramenta.

### Mimetizando o Gerenciamento Pronto para Uso Usando a JMX Remote API

O acesso remoto ao agente de gerenciamento pronto para uso é protegido por autenticação e autorização, e por criptografia SSL. A configuração é realizada definindo propriedades de sistema ou definindo um arquivo `management.properties`. Na maioria dos casos, usar o agente de gerenciamento pronto para uso e configurá-lo através do arquivo `management.properties` é suficiente para fornecer gerenciamento seguro de JVMs remotas. No entanto, em alguns casos, níveis maiores de segurança são exigidos e, em outros casos, certas configurações de sistema não permitem o uso de um arquivo `management.properties`. Tais casos podem envolver a exportação de objetos remotos do servidor RMI através de uma determinada porta para permitir a passagem por um firewall, ou a exportação de objetos remotos do servidor RMI usando uma interface de rede específica em sistemas multihomed. Para tais casos, o comportamento do agente de gerenciamento pronto para uso pode ser mimetizado usando a JMX Remote API diretamente para criar, configurar e implantar o agente de gerenciamento programaticamente.

#### Exemplo de Mimetização do Gerenciamento Pronto para Uso

Esta seção fornece um exemplo de como implementar um agente JMX que mimetiza identicamente um agente de gerenciamento pronto para uso. Exatamente da mesma forma que o agente de gerenciamento pronto para uso, o agente criado no Exemplo 2-5 será executado na porta 3000. Ele terá um arquivo de senha chamado `password.properties`, um arquivo de acesso chamado `access.properties`, e implementará a configuração padrão para RMI Socket Factories baseadas em SSL/TLS, exigindo apenas autenticação de servidor. Este exemplo assume que um `keystore` já foi criado, conforme descrito em Usando SSL. Informações sobre como configurar a configuração SSL são explicadas na seção Criando um Keystore para Usar com JSSE do Guia do Desenvolvedor de Segurança da Plataforma Java, Standard Edition.

Para habilitar monitoramento e gerenciamento em uma aplicação chamada `com.example.MyApp`, usando o agente JMX pronto para uso com a configuração, execute o `com.example.MyApp` com o seguinte comando:
```
    % java -Dcom.sun.management.jmxremote.port=3000 \
         -Dcom.sun.management.jmxremote.password.file=password.properties \
         -Dcom.sun.management.jmxremote.access.file=access.properties \
         -Djavax.net.ssl.keyStore=keystore \
         -Djavax.net.ssl.keyStorePassword=password \
         com.example.MyApp
    
```

Nota:

As propriedades `com.sun.management.jmxremote.*` podem ser especificadas em um arquivo `management.properties` em vez de passá-las na linha de comando. Nesse caso, a propriedade de sistema `-Dcom.sun.management.config.file=management.properties` é necessária para especificar o local do arquivo `management.properties`.

Exemplo 2-5 mostra o código que você precisa escrever para criar programaticamente um agente JMX, o que permitirá exatamente o mesmo monitoramento e gerenciamento em `com.example.MyApp` como usando o comando anterior.

Exemplo 2-5 Mimetizando um Agente JMX Pronto para Uso Programaticamente
```
    package com.example;
    
    import java.lang.management.*;
    import java.rmi.registry.*;
    import java.util.*;
    import javax.management.*;
    import javax.management.remote.*;
    import javax.management.remote.rmi.*;
    import javax.rmi.ssl.*;
    
    public class MyApp {
    
        public static void main(String[] args) throws Exception {
    
            // Ensure cryptographically strong random number generator used
            // to choose the object number - see java.rmi.server.ObjID
            //
            System.setProperty("java.rmi.server.randomIDs", "true");
    
            // Start an RMI registry on port 3000.
            //
            System.out.println("Create RMI registry on port 3000");
            LocateRegistry.createRegistry(3000);
    
            // Retrieve the PlatformMBeanServer.
            //
            System.out.println("Get the platform's MBean server");
            MBeanServer mbs = ManagementFactory.getPlatformMBeanServer();
    
            // Environment map.
            //
            System.out.println("Initialize the environment map");
            HashMap<String,Object> env = new HashMap<String,Object>();
    
            // Provide SSL-based RMI socket factories.
            //
            // The protocol and cipher suites to be enabled will be the ones
            // defined by the default JSSE implementation and only server
            // authentication will be required.
            //
            SslRMIClientSocketFactory csf = new SslRMIClientSocketFactory();
            SslRMIServerSocketFactory ssf = new SslRMIServerSocketFactory();
            env.put(RMIConnectorServer.RMI_CLIENT_SOCKET_FACTORY_ATTRIBUTE, csf);
            env.put(RMIConnectorServer.RMI_SERVER_SOCKET_FACTORY_ATTRIBUTE, ssf);
    
            // Provide the password file used by the connector server to
            // perform user authentication. The password file is a properties
            // based text file specifying username/password pairs.
            //
            env.put("jmx.remote.x.password.file", "password.properties");
    
            // Provide the access level file used by the connector server to
            // perform user authorization. The access level file is a properties
            // based text file specifying username/access level pairs where
            // access level is either "readonly" or "readwrite" access to the
            // MBeanServer operations.
            //
            env.put("jmx.remote.x.access.file", "access.properties");
    
            // Create an RMI connector server.
            //
            // As specified in the JMXServiceURL the RMIServer stub will be
            // registered in the RMI registry running in the local host on
            // port 3000 with the name "jmxrmi". This is the same name that the
            // ready-to-use management agent uses to register the RMIServer
            // stub.
            //
            System.out.println("Create an RMI connector server");
            JMXServiceURL url =
                new JMXServiceURL("service:jmx:rmi:///jndi/rmi://:3000/jmxrmi");
            JMXConnectorServer cs =
                JMXConnectorServerFactory.newJMXConnectorServer(url, env, mbs);
    
            // Start the RMI connector server.
            //
            System.out.println("Start the RMI connector server");
            cs.start();
        }
    }
    
```

Inicie esta aplicação com o seguinte comando:
```
    java -Djavax.net.ssl.keyStore=keystore \
         -Djavax.net.ssl.keyStorePassword=password \
         com.example.MyApp
    
```

A aplicação `com.example.MyApp` habilitará o agente JMX e será monitorada e gerenciada exatamente da mesma forma como se o agente de gerenciamento pronto para uso da plataforma Java tivesse sido usado. No entanto, há uma diferença sutil, mas importante, entre o registro RMI usado pelo agente de gerenciamento pronto para uso e aquele usado por um agente de gerenciamento que o mimetiza. O registro RMI usado pelo agente de gerenciamento pronto para uso é somente leitura, ou seja, uma única entrada pode ser vinculada a ele e, uma vez vinculada, esta entrada não pode ser desvinculada. Isso não é verdade com o registro RMI criado no Exemplo 2-5.

Além disso, ambos os registros RMI são inseguros, pois não usam SSL/TLS. Os registros RMI devem ser criados usando RMI socket factories baseadas em SSL/TLS que exigem autenticação de cliente. Isso evitará que um cliente envie suas credenciais para um servidor RMI mal-intencionado e também evitará que o registro RMI conceda acesso ao stub do servidor RMI a um cliente não confiável.

Registros RMI que implementam RMI socket factories SSL/TLS podem ser criados adicionando as seguintes propriedades ao seu arquivo `management.properties`:
```
    com.sun.management.jmxremote.registry.ssl=true
    com.sun.management.jmxremote.ssl.need.client.auth=true
    
```

Exemplo 2-5 mimetiza o comportamento principal do agente JMX pronto para uso, mas não replica todas as propriedades existentes no arquivo `management.properties`. No entanto, você pode adicionar outras propriedades modificando `com.example.MyApp` apropriadamente.

#### Monitorando Aplicações Através de um Firewall

O código no Exemplo 2-5 pode ser usado para monitorar aplicações através de um firewall, o que pode não ser possível se você usar a solução de monitoramento pronta para uso. A propriedade de gerenciamento `com.sun.management.jmxremote.port` especifica a porta onde o registro RMI pode ser alcançado, mas as portas onde os objetos remotos `RMIServer` e `RMIConnection` são exportados são escolhidas pela pilha RMI. Para exportar os objetos remotos (`RMIServer` e `RMIConnection`) para uma determinada porta, você precisa criar seu próprio servidor conector RMI programaticamente, conforme descrito no Exemplo 2-5. No entanto, você deve especificar `JMXServiceURL` da seguinte forma:
```
    JMXServiceURL url = new JMXServiceURL("service:jmx:rmi://localhost:" + 
          port1  + "/jndi/rmi://localhost:" + port2 + "/jmxrmi");
    
```

`port1` é o número da porta na qual os objetos remotos `RMIServer` e `RMIConnection` são exportados, e `port2` é o número da porta do Registro RMI.

#### Usando uma Classe de Agente para Instrumentar uma Aplicação

A plataforma Java SE fornece serviços que permitem que agentes da linguagem de programação Java instrumentem programas em execução na JVM. Criar um agente de instrumentação significa que você não precisa adicionar nenhum código novo à sua aplicação para permitir que ela seja monitorada. Em vez de implementar monitoramento e gerenciamento no método `main` estático da sua aplicação, você o implementa em uma classe de agente separada e inicia sua aplicação com a opção `-javaagent` especificada. Consulte a documentação de referência da API para o pacote java.lang.instrument para detalhes completos sobre como criar uma classe de agente para instrumentar suas aplicações.

##### Criando uma Classe de Agente para Instrumentar uma Aplicação

O procedimento a seguir mostra como você pode adaptar o código de `com.example.MyApp` para criar um agente para instrumentar qualquer outra aplicação para monitoramento e gerenciamento.

  1. Crie uma classe `com.example.MyAgent`.

Crie uma classe chamada `com.example.MyAgent`, declarando um método `premain` em vez de um método `main`.
```package com.example;
         
         [...]
         
         public class MyAgent {
             
             public static void premain(String args) throws Exception {
             
             [...]
         
```

O restante do código para a classe `com.example.MyAgent` é o mesmo da classe `com.example.MyApp`, conforme mostrado no Exemplo 2-5.

  2. Compile a classe `com.example.MyAgent`.
  3. Crie um arquivo de manifesto, `MANIFEST.MF`, com uma entrada `Premain-Class`.

Um agente é implantado como um arquivo Java archive (JAR). Um atributo no manifesto do arquivo JAR especifica a classe do agente que será carregada para iniciar o agente. Crie um arquivo chamado `MANIFEST.MF`, contendo a seguinte linha:
```Premain-Class: com.example.MyAgent
         
```

  4. Crie um arquivo JAR, `MyAgent.jar`.

O arquivo JAR deve conter os seguintes arquivos:

     * `META-INF/MANIFEST.MF`

     * `com/example/MyAgent.class`

  5. Inicie uma aplicação, especificando o agente para fornecer serviços de monitoramento e gerenciamento.

Você pode usar `com.example.MyAgent` para instrumentar qualquer aplicação para monitoramento e gerenciamento. Este exemplo usa a aplicação `Notepad`.
```% java -javaagent:MyAgent.jar -Djavax.net.ssl.keyStore=keystore \
               -Djavax.net.ssl.keyStorePassword=password -jar Notepad.jar
         
```

O agente `com.example.MyAgent` é especificado usando a opção `-javaagent` ao iniciar o `Notepad`. Além disso, se sua aplicação `com.example.MyAgent` replicar o mesmo código da aplicação `com.example.MyApp` mostrada no Exemplo 2-5, então forneça as informações de `keystore` e `password` porque o servidor conector RMI é protegido por SSL.