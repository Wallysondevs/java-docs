# Serviço de Autenticação e Autorização Java (JAAS): Guia do Desenvolvedor de LoginModule

## Serviço de Autenticação e Autorização Java (JAAS): Guia do Desenvolvedor de LoginModule

O JAAS fornece autorização baseada em subject sobre identidades autenticadas. Este documento foca no aspecto de autenticação do JAAS, especificamente na interface [LoginModule](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/spi/LoginModule.html>).

Tópicos

  * [Quem Deve Ler Este Documento](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>)
  * [Documentação Relacionada](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>)
  * [Introdução ao LoginModule](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>)
  * [Passos para Implementar um LoginModule](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>)



Quem Deve Ler Este Documento

Este documento é destinado a programadores experientes que precisam da capacidade de escrever um [LoginModule](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/spi/LoginModule.html>) implementando uma tecnologia de autenticação.

Documentação Relacionada

Este documento assume que você já leu o seguinte:

  * [Guia de Referência do Serviço de Autenticação e Autorização Java (JAAS)](<https://docs.oracle.com/javase/8/docs/technotes/guides/security/jaas/JAASRefGuide.html>)



Ele também discute várias classes e interfaces na API do JAAS. Consulte a documentação da API JavaDoc para a especificação da API do JAAS para informações mais detalhadas:

  * [javax.security.auth ](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/package-summary.html>)
  * [javax.security.auth.callback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/package-summary.html>)
  * [javax.security.auth.kerberos](<https://docs.oracle.com/en/java/javase/25/docs/api/java.security.jgss/javax/security/auth/kerberos/package-summary.html>)
  * [ javax.security.auth.login ](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/login/package-summary.html>)
  * [javax.security.auth.spi ](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/spi/package-summary.html>)
  * [javax.security.auth.x500 ](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/x500/package-summary.html>)



Os seguintes pacotes contêm exemplos de LoginModule suportados:

  * [com.sun.security.auth](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.auth/com/sun/security/auth/package-summary.html>)
  * [com.sun.security.auth.callback](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.auth/com/sun/security/auth/callback/package-summary.html>)
  * [com.sun.security.auth.login](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.auth/com/sun/security/auth/login/package-summary.html>)
  * [com.sun.security.auth.module](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.auth/com/sun/security/auth/module/package-summary.html>)



O [Tutorial de Autenticação JAAS](<#/doc/guides/security/jaas-authentication-tutorial>) pode ser executado por todos.

Um tutorial similar, [Tutorial de Autenticação JAAS](<#/doc/guides/security/jaas-authentication-tutorial>), demonstra o uso de um LoginModule Kerberos. Ele requer uma instalação Kerberos. Faz parte dos [Tutoriais de Introdução ao JAAS e Java GSS-API](<#/doc/guides/security/introduction-jaas-and-java-gss-api-tutorials1>) que utilizam Kerberos como tecnologia subjacente para autenticação e comunicação segura.

### Introdução ao LoginModule

Provedores de tecnologia de autenticação devem implementar a interface [LoginModule](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/spi/LoginModule.html>). Os LoginModules são conectados sob as aplicações para fornecer um tipo particular de autenticação.

Enquanto as aplicações escrevem para a Interface de Programação de Aplicações (API) [LoginContext](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/login/LoginContext.html>), os provedores de tecnologia de autenticação implementam a interface LoginModule. Uma [Configuration](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/login/Configuration.html>) especifica o(s) LoginModule(s) a ser(em) usado(s) com uma aplicação de login particular. Diferentes LoginModules podem ser conectados sob a aplicação sem exigir quaisquer modificações na própria aplicação.

O LoginContext é responsável por ler a Configuration e instanciar os LoginModules especificados. Cada LoginModule é inicializado com um [Subject](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/Subject.html>), um [CallbackHandler](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/CallbackHandler.html>), estado compartilhado do LoginModule e opções específicas do LoginModule.

O Subject representa o usuário ou serviço atualmente sendo autenticado e é atualizado por um LoginModule com [Principal](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/security/Principal.html>)s e credenciais relevantes se a autenticação for bem-sucedida. Os LoginModules usam o CallbackHandler para se comunicar com os usuários (para solicitar nomes de usuário e senhas, por exemplo), conforme descrito na descrição do método login. Observe que o CallbackHandler pode ser null. Um LoginModule que requer um CallbackHandler para autenticar o Subject pode lançar uma [LoginException](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/login/LoginException.html>) se foi inicializado com um CallbackHandler null. Os LoginModules opcionalmente usam o estado compartilhado para compartilhar informações ou dados entre si.

As opções específicas do LoginModule representam as opções configuradas para este LoginModule na Configuration de login. As opções são definidas pelo próprio LoginModule e controlam o comportamento dentro dele. Por exemplo, um LoginModule pode definir opções para suportar recursos de depuração/teste. As opções são definidas usando uma sintaxe de chave-valor, como debug=true. O LoginModule armazena as opções como um Map para que os valores possam ser recuperados usando a chave. Observe que não há limite para o número de opções que um LoginModule escolhe definir.

A aplicação chamadora vê o processo de autenticação como uma única operação invocada através de uma chamada ao método login do LoginContext. No entanto, o processo de autenticação dentro de cada LoginModule prossegue em duas fases distintas. Na primeira fase de autenticação, o método login do LoginContext invoca o método login de cada LoginModule especificado na Configuration. O método login para um LoginModule realiza a autenticação real (solicitando e verificando uma senha, por exemplo) e salva seu status de autenticação como informação de estado privado. Uma vez concluído, o método login do LoginModule retorna true (se foi bem-sucedido) ou false (se deve ser ignorado), ou lança uma LoginException para especificar uma falha. No caso de falha, o LoginModule não deve tentar novamente a autenticação ou introduzir atrasos. A responsabilidade de tais tarefas pertence à aplicação. Se a aplicação tentar novamente a autenticação, o método login de cada LoginModule será chamado novamente.

Na segunda fase, se a autenticação geral do LoginContext foi bem-sucedida (chamadas aos métodos login dos LoginModules relevantes REQUIRED, REQUISITE, SUFFICIENT e OPTIONAL foram bem-sucedidas), então o método commit para cada LoginModule é invocado. (Para uma explicação das flags do LoginModule REQUIRED, REQUISITE, SUFFICIENT e OPTIONAL, consulte a documentação da [Configuration](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/login/Configuration.html>) e o [Apêndice B: Arquivo de Configuração de Login do JAAS](<#/doc/guides/security/java-authentication-authorization-service-jaas-reference-guide>) no Guia de Referência do JAAS.) O método commit para um LoginModule verifica seu estado salvo privadamente para ver se sua própria autenticação foi bem-sucedida. Se a autenticação geral do LoginContext foi bem-sucedida e a própria autenticação do LoginModule foi bem-sucedida, então o método commit associa os Principal's relevantes (identidades autenticadas) e credenciais (dados de autenticação como chaves criptográficas) ao Subject.

Se a autenticação geral do LoginContext falhou (os métodos login dos LoginModules relevantes REQUIRED, REQUISITE, SUFFICIENT e OPTIONAL não foram bem-sucedidos), então o método abort para cada LoginModule é invocado. Neste caso, o LoginModule remove/destrói qualquer estado de autenticação originalmente salvo.

Fazer logout de um Subject envolve apenas uma fase. O LoginContext invoca o método logout do LoginModule. O método logout para o LoginModule então executa os procedimentos de logout, como remover Principal's ou credenciais do Subject, ou registrar informações de sessão.

### Passos para Implementar um LoginModule

Os seguintes são os passos necessários para implementar e testar um LoginModule:

  * [Passo 1: Entender a Tecnologia de Autenticação](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>)
  * [Passo 2: Nomear a Implementação do LoginModule](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>)
  * [Passo 3: Implementar a Interface LoginModule](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>)
  * [Passo 4: Escolher ou Escrever uma Aplicação de Exemplo](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>)
  * [Passo 5: Compilar o LoginModule e a Aplicação](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>)
  * [Passo 6: Preparar para Testes](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>)
  * [Passo 7: Testar o Uso do LoginModule](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>)
  * [Passo 8: Documentar Sua Implementação de LoginModule](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>)
  * [Passo 9: Disponibilizar o Arquivo JAR e Documentos do LoginModule](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>)



#### Passo 1: Entender a Tecnologia de Autenticação

Primeiro, entenda a tecnologia de autenticação a ser implementada pelo seu novo provedor de LoginModule e determine seus requisitos.

  1. Determine se o seu LoginModule exigirá alguma forma de interação com o usuário (recuperar um nome de usuário e senha, por exemplo). Se sim, você precisará se familiarizar com a interface [CallbackHandler](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/CallbackHandler.html>) e o pacote [javax.security.auth.callback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/package-summary.html>).

Nesse pacote, você encontrará várias implementações possíveis de Callback para usar. (Alternativamente, você pode criar suas próprias implementações de Callback.) O LoginModule invocará o CallbackHandler especificado pela própria aplicação e passado para o método initialize do LoginModule. O LoginModule passa ao CallbackHandler um array de Callbacks apropriados. Veja [Método LoginModule.login](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>) em [Passo 3: Implementar a Interface LoginModule](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>).

Nota:

É possível que implementações de LoginModule não tenham nenhuma interação com o usuário final. Tais LoginModules não precisariam acessar o pacote callback.

  2. Determine quais opções de configuração você deseja disponibilizar ao usuário, que especifica as informações de configuração na forma que a implementação atual da Configuration espera (por exemplo, em arquivos). Para cada opção, decida o nome da opção e os valores possíveis.

Por exemplo, se um LoginModule pode ser configurado para consultar um host de servidor de autenticação particular, decida o nome da chave da opção ("auth_server", por exemplo), bem como os possíveis nomes de host de servidor válidos para essa opção ("server_one.example.com" e "server_two.example.com", por exemplo).

#### Passo 2: Nomear a Implementação do LoginModule

Decida sobre o pacote e o nome de classe apropriados para o seu LoginModule.

Por exemplo, um LoginModule desenvolvido pela IBM pode ser chamado de `com.ibm.auth.Module`, onde `com.ibm.auth` é o nome do pacote e `Module` é o nome da implementação da classe LoginModule.

#### Passo 3: Implementar a Interface LoginModule

A interface LoginModule especifica cinco métodos abstratos que você deve implementar:

  * [initialize](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/spi/LoginModule.html#initialize\(javax.security.auth.Subject,javax.security.auth.callback.CallbackHandler,java.util.Map,java.util.Map\)>)

  * [login](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/spi/LoginModule.html#login\(\)>)

  * [commit](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/spi/LoginModule.html#commit\(\)>)

  * [abort](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/spi/LoginModule.html#abort\(\)>)

  * [logout](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/spi/LoginModule.html#logout\(\)>)



Além desses métodos, uma implementação de LoginModule deve fornecer um construtor público sem argumentos. Isso permite sua correta instanciação por um LoginContext. Observe que, se nenhum construtor for fornecido em sua implementação de LoginModule, um construtor padrão sem argumentos é automaticamente herdado da classe Object.

Nota:

Se você não implementar a interface LoginModule, uma LoginException será lançada quando você tentar usar seu módulo de login.

Método LoginModule.initialize
```
        public void initialize(
            Subject subject,
            CallbackHandler handler,
            Map<java.lang.String, ?> sharedState,
            Map<java.lang.String, ?> options);
```

O método `initialize` é chamado para inicializar o LoginModule com as informações de autenticação e estado relevantes.

Este método é chamado por um LoginContext imediatamente após este LoginModule ter sido instanciado, e antes de quaisquer chamadas para seus outros métodos públicos. A implementação do método deve armazenar os argumentos fornecidos para uso futuro.

O método `initialize` pode adicionalmente examinar o sharedState fornecido para determinar qual estado de autenticação adicional foi fornecido por outros LoginModules, e também pode percorrer as opções fornecidas para determinar quais opções de configuração foram especificadas para afetar o comportamento do LoginModule. Ele pode salvar valores de opções em variáveis para uso futuro.

A seguir, uma lista de opções comumente suportadas por LoginModules. Observe que o seguinte é apenas uma diretriz. Os módulos são livres para suportar um subconjunto (ou nenhuma) das seguintes opções.

  * `tryFirstPass` - Se `true`, o primeiro LoginModule na pilha salva a senha digitada, e os LoginModules subsequentes também tentam usá-la. Se a autenticação falhar, os LoginModules solicitam uma nova senha e tentam novamente a autenticação.
  * `useFirstPass` - Se `true`, o primeiro LoginModule na pilha salva a senha digitada, e os LoginModules subsequentes também tentam usá-la. Os LoginModules não solicitam uma nova senha se a autenticação falhar (a autenticação simplesmente falha).
  * `tryMappedPass` - Se `true`, o primeiro LoginModule na pilha salva a senha digitada, e os LoginModules subsequentes tentam mapeá-la para sua senha específica de serviço. Se a autenticação falhar, os LoginModules solicitam uma nova senha e tentam novamente a autenticação.
  * `useMappedPass` - Se `true`, o primeiro LoginModule na pilha salva a senha digitada, e os LoginModules subsequentes tentam mapeá-la para sua senha específica de serviço. Os LoginModules não solicitam uma nova senha se a autenticação falhar (a autenticação simplesmente falha).
  * `moduleBanner` - Se `true`, então ao invocar o CallbackHandler, o LoginModule fornece um TextOutputCallback como o primeiro Callback, que descreve o LoginModule realizando a autenticação.
  * `debug` - Se `true`, instrui um LoginModule a exibir informações de depuração.



O método `initialize` pode ignorar livremente estados ou opções que não entende, embora seria prudente registrar tal evento se ele ocorrer.

Observe que o LoginContext que invoca este LoginModule (e os outros LoginModules configurados, também), todos compartilham as mesmas referências ao Subject e sharedState fornecidos. Modificações no Subject e sharedState serão, portanto, vistas por todos.

Método LoginModule.login
```
        boolean login() throws LoginException;
```

O método `login` é chamado para autenticar um Subject. Esta é a fase 1 da autenticação.

Esta implementação de método deve realizar a autenticação real. Por exemplo, ela pode solicitar um nome de usuário e senha, e então tentar verificar a senha contra um banco de dados de senhas. Outra implementação de exemplo pode informar ao usuário para inserir o dedo em um leitor de impressão digital, e então comparar a impressão digital de entrada com um banco de dados de impressões digitais.

Se o seu LoginModule requer alguma forma de interação com o usuário (recuperar um nome de usuário e senha, por exemplo), ele não deve fazê-lo diretamente. Isso ocorre porque existem várias maneiras de se comunicar com um usuário, e é desejável que os LoginModules permaneçam independentes dos diferentes tipos de interação do usuário. Em vez disso, o método login do LoginModule deve invocar o método handle da interface [CallbackHandler](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/CallbackHandler.html>) passada para o método initialize para realizar a interação do usuário e definir resultados apropriados, como o nome de usuário e a senha. O LoginModule passa ao CallbackHandler um array de Callbacks apropriados, por exemplo, um [NameCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/NameCallback.html>) para o nome de usuário e um [PasswordCallback](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/callback/PasswordCallback.html>) para a senha, e o CallbackHandler realiza a interação do usuário solicitada e define valores apropriados nos Callbacks. Por exemplo, para processar um NameCallback, o CallbackHandler pode solicitar um nome, recuperar o valor do usuário e chamar o método setName do NameCallback para armazenar o nome.

O processo de autenticação também pode envolver comunicação em rede. Por exemplo, se esta implementação de método realiza o equivalente a um kinit em Kerberos, então ela precisaria contatar o KDC. Se uma entrada de banco de dados de senhas reside em um serviço de nomes remoto, então esse serviço de nomes precisa ser contatado, talvez via Java Naming and Directory Interface (JNDI). As implementações também podem interagir com um sistema operacional subjacente. Por exemplo, se um usuário já fez login em um sistema operacional como Linux, macOS ou Windows, este método pode simplesmente importar as informações de identidade do sistema operacional subjacente.

O método `login` deve

  1. Determinar se este LoginModule deve ou não ser ignorado. Um exemplo de quando ele deve ser ignorado é quando um usuário tenta autenticar-se sob uma identidade irrelevante para este LoginModule (se um usuário tenta autenticar-se como root usando NIS, por exemplo). Se este LoginModule deve ser ignorado, `login` deve retornar `false`. Caso contrário, ele deve fazer o seguinte:
  2. Chamar o método `handle` do CallbackHandler se a interação do usuário for necessária.
  3. Realizar a autenticação.
  4. Armazenar o resultado da autenticação (sucesso ou falha).
  5. Se a autenticação foi bem-sucedida, salvar qualquer informação de estado relevante que possa ser necessária pelo método commit.
  6. Retornar `true` se a autenticação for bem-sucedida, ou lançar uma [LoginException](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/login/LoginException.html>) como [FailedLoginException](<https://docs.oracle.com/en/java/javase/25/docs/api/java.base/javax/security/auth/login/FailedLoginException.html>) se a autenticação falhar.



Observe que a implementação do método `login` não deve associar nenhuma nova informação de Principal ou credencial ao objeto Subject salvo. Este método apenas realiza a autenticação e, em seguida, armazena o resultado da autenticação e o estado de autenticação correspondente. Este resultado e estado serão posteriormente acessados pelos métodos commit ou abort. Observe que o resultado e o estado geralmente não devem ser salvos no Map sharedState, pois não se destinam a ser compartilhados com outros LoginModules.

Um exemplo de onde este método pode achar útil armazenar informações de estado no Map sharedState é quando os LoginModules são configurados para compartilhar senhas. Neste caso, a senha digitada seria salva como estado compartilhado. Ao compartilhar senhas, o usuário digita a senha apenas uma vez e ainda pode ser autenticado em vários LoginModules. As convenções padrão para salvar e recuperar nomes e senhas do Map sharedState são as seguintes:

  * `javax.security.auth.login.name` - Use isso como a chave do mapa de estado compartilhado para salvar/recuperar um nome. O valor deve ser uma String.
  * `javax.security.auth.login.password` - Use isso como a chave do mapa de estado compartilhado para salvar/recuperar uma senha. O valor deve ser um array de char.



Se a autenticação falhar, o método `login` não deve tentar novamente a autenticação. Esta é a responsabilidade da aplicação. Múltiplas chamadas ao método `login` do LoginContext por uma aplicação são preferíveis a múltiplas tentativas de login de dentro de LoginModule.login().

Método LoginModule.commit
```
        boolean commit() throws LoginException;
```

O método `commit` é chamado para confirmar o processo de autenticação. Esta é a fase 2 da autenticação quando a fase 1 é bem-sucedida. Ele é chamado se a autenticação geral do LoginContext foi bem-sucedida (ou seja, se os LoginModules relevantes REQUIRED, REQUISITE, SUFFICIENT e OPTIONAL foram bem-sucedidos).

Este método deve acessar o resultado da autenticação e o estado de autenticação correspondente salvos pelo método login.

Se o resultado da autenticação denota que o método login falhou, então este método `commit` deve remover/destruir qualquer estado correspondente que foi originalmente salvo.

Se o resultado salvo, em vez disso, denota que o método login deste LoginModule foi bem-sucedido, então as informações de estado correspondentes devem ser acessadas para construir quaisquer informações relevantes de Principal e credencial. Tais Principals e credenciais devem então ser adicionados ao Subject armazenado pelo método initialize.

Após adicionar Principals e credenciais, campos de estado dispensáveis devem ser destruídos rapidamente. Campos prováveis a serem destruídos seriam nomes de usuário e senhas armazenados durante o processo de autenticação.

O método `commit` deve salvar o estado privado indicando se o commit foi bem-sucedido ou falhou.

O gráfico a seguir descreve o que o método `commit` de um LoginModule deve retornar. As diferentes caixas representam as diferentes situações que podem ocorrer. Por exemplo, a caixa superior esquerda descreve o que o método `commit` deve retornar se tanto a chamada anterior a `login` foi bem-sucedida quanto o próprio método `commit` foi bem-sucedido.

Tabela 6-2 Valores de Retorno do Método LoginModule.commit

Status do Login | COMMIT: SUCESSO | COMMIT: FALHA
---|---|---
LOGIN: SUCCESS | return TRUE | throw EXCEPTION
LOGIN: FAILURE | return FALSE | return FALSE

Método LoginModule.abort
```
        boolean abort() throws LoginException;
```

O método `abort` é chamado para abortar o processo de autenticação. Esta é a fase 2 da autenticação quando a fase 1 falha. Ele é chamado se a autenticação geral do LoginContext falhou.

Este método primeiro acessa o resultado da autenticação deste LoginModule e o estado de autenticação correspondente salvos pelos métodos login (e possivelmente commit), e então limpa e destrói as informações. Um exemplo de estado a ser destruído seriam nomes de usuário e senhas.

Se a tentativa de autenticação deste LoginModule falhou, então não deveria haver nenhum estado privado para limpar.

Os gráficos a seguir descrevem o que o método `abort` de um LoginModule deve retornar. Este primeiro gráfico assume que a chamada anterior a `login` foi bem-sucedida. Por exemplo, o método `abort` deve retornar TRUE se tanto a chamada anterior a `login` quanto a `commit` foram bem-sucedidas, e o próprio método `abort` também foi bem-sucedido.

Tabela 6-3 Valores de Retorno do Método LoginModule.abort: Login Bem-sucedido

Status do Login | ABORT: SUCESSO | ABORT: FALHA
---|---|---
COMMIT: SUCCESS | return TRUE | throw EXCEPTION
COMMIT: FAILURE | return TRUE | throw EXCEPTION

O segundo gráfico descreve o que o método `abort` de um LoginModule deve retornar, assumindo que a chamada anterior a `login` falhou. Por exemplo, o método `abort` deve retornar FALSE se a chamada anterior a `login` falhou, a chamada anterior a `commit` foi bem-sucedida, e o próprio método `abort` também foi bem-sucedido.

Tabela 6-4 Valores de Retorno do Método LoginModule.abort: Login Falhou

Status do Login | ABORT: SUCESSO | ABORT: FALHA
---|---|---
COMMIT: SUCCESS | return FALSE | return FALSE
COMMIT: FAILURE | return FALSE | return FALSE

Método LoginModule.logout
```
        boolean logout() throws LoginException;
```

O método `logout` é chamado para fazer logout de um Subject.

Este método remove Principals, e remove/destrói credenciais associadas ao Subject durante a operação commit. Este método não deve tocar nos Principals ou credenciais previamente existentes no Subject, ou aqueles adicionados por outros LoginModules.

Se o Subject foi marcado como somente leitura (o método `isReadOnly` do Subject retorna true), então este método deve apenas destruir as credenciais associadas ao Subject durante a operação commit (remover as credenciais não é possível). Se o Subject foi marcado como somente leitura e as credenciais associadas ao Subject durante a operação commit não são destruíveis (elas não implementam a interface Destroyable), então este método pode lançar uma LoginException.

O método `logout` deve retornar `true` se o logout for bem-sucedido, ou então lançar uma LoginException.

#### Passo 4: Escolher ou Escrever uma Aplicação de Exemplo

Escolha uma aplicação de exemplo existente para seus testes, ou escreva uma nova.

Consulte o [Guia de Referência do Serviço de Autenticação e Autorização Java (JAAS)](<https://docs.oracle.com/javase/8/docs/technotes/guides/security/jaas/JAASRefGuide.html>) para obter informações sobre os requisitos da aplicação e uma aplicação de exemplo que você pode usar para seus testes.

#### Passo 5: Compilar o LoginModule e a Aplicação

Compile seu novo LoginModule e a aplicação que você usará para testes.

#### Passo 6: Preparar para Testes

Passo 6a: Coloque Seu LoginModule e Código da Aplicação em Arquivos JAR

Coloque seu LoginModule e o código da aplicação em arquivos JAR separados. Aqui está um comando de exemplo para criar um arquivo JAR:
```
    jar cvf <JAR file name> <list of classes, separated by spaces>
    
```

Este comando cria um arquivo JAR com o nome especificado contendo as classes especificadas.

Para mais informações sobre a ferramenta jar, consulte [`jar`](<#/>).

Passo 6b: Criar uma Configuration Referenciando o LoginModule

Como o JAAS suporta uma arquitetura de autenticação plugável, seu novo LoginModule pode ser usado sem exigir modificações em aplicações existentes. Apenas a Configuration de login precisa ser atualizada para indicar o uso de um novo LoginModule.

A implementação padrão da Configuration da Oracle lê informações de configuração de arquivos de configuração, conforme descrito em [ConfigFile](<https://docs.oracle.com/en/java/javase/25/docs/api/jdk.security.auth/com/sun/security/auth/login/ConfigFile.html>).

Crie um arquivo de configuração para ser usado para testes. Por exemplo, para configurar o hipotético LoginModule da IBM mencionado anteriormente para uma aplicação, o arquivo de configuração pode ser assim:
```
        AppName {
            com.ibm.auth.Module REQUIRED debug=true;
        };
    
```

onde `AppName` deve ser o nome que a aplicação usa para se referir a esta entrada no arquivo de configuração de login. A aplicação especifica este nome como o primeiro argumento para o construtor do LoginContext.

#### Passo 7: Testar o Uso do LoginModule

Teste sua aplicação e seu uso do LoginModule. Ao executar a aplicação, especifique o arquivo de configuração de login a ser usado. Por exemplo, suponha que sua aplicação se chame `MyApp`, esteja localizada em `MyApp.jar`, e seu arquivo de configuração seja `test.conf`.

Você pode executar a aplicação e especificar o arquivo de configuração da seguinte forma:
```
    java -classpath MyApp.jar
     -Djava.security.auth.login.config=test.conf MyApp
```

Digite tudo isso em uma única linha. Múltiplas linhas são usadas aqui para legibilidade.

Você pode querer configurar o LoginModule com uma opção debug para ajudar a garantir que ele esteja funcionando corretamente.

Depure seu código e continue testando conforme necessário. Se tiver problemas, revise os passos anteriores e certifique-se de que todos foram concluídos.

Certifique-se de variar a entrada do usuário e as opções do LoginModule especificadas no arquivo de configuração.

Certifique-se também de incluir testes usando diferentes opções de instalação (por exemplo, colocando o LoginModule no class path ou module path).

#### Passo 8: Documentar Sua Implementação de LoginModule

Escreva a documentação para os clientes do seu LoginModule.

#### Passo 9: Disponibilizar o Arquivo JAR e Documentos do LoginModule

Disponibilize seu arquivo JAR do LoginModule e a documentação para os clientes.
1. Se você descobrir durante o teste que seu `LoginModule` ou aplicação precisa de modificações, faça as modificações, recompile ([Passo 5: Compile o LoginModule e a Aplicação](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>)).
2. Coloque o código atualizado em um arquivo JAR ([Passo 6a: Coloque Seu Código do LoginModule e da Aplicação em Arquivos JAR](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>)).
3. Se necessário, modifique o arquivo de configuração de login ([Passo 6b: Crie uma Configuração Referenciando o LoginModule](<#/doc/guides/security/java-authentication-and-authorization-service-jaas-loginmodule-developers-guide1>)).
4. Execute novamente a aplicação e repita estes passos conforme necessário.

#### Passo 8: Documente Sua Implementação do LoginModule

Escreva a documentação para os clientes do seu `LoginModule`.

Exemplos de documentação que você pode querer incluir são:

  * Um README ou Guia do Usuário descrevendo
    1. O processo de autenticação empregado pela sua implementação do `LoginModule`.
    2. Informações sobre como instalar o `LoginModule`.
    3. Opções de configuração aceitas pelo `LoginModule`. Para cada opção, especifique o nome da opção e os valores possíveis (ou tipos de valores), bem como o comportamento que a opção controla.
  * Um arquivo de `Configuration` de exemplo que referencia seu novo `LoginModule`.
  * Documentação da API. Colocar comentários JavaDoc em seu código-fonte enquanto você o escreve tornará a documentação da API JavaDoc fácil de gerar.

#### Passo 9: Disponibilize o Arquivo JAR do LoginModule e os Documentos

Disponibilize seu arquivo JAR do `LoginModule` e a documentação para os clientes.