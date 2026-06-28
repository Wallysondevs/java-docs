# Keytool - Gerenciando Seu Keystore

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Segurança ](<#/doc/tutorials/jvm/tool/security>) > Keytool - Gerenciando Seu Keystore

**Tutorial Atual**

Keytool - Gerenciando Seu Keystore

➜

**Próximo na Série**

[Jarsigner - Assinando Seus JARs](<#/doc/tutorials/jvm/tool/security/jarsigner>)

**Próximo na Série:** [Jarsigner - Assinando Seus JARs](<#/doc/tutorials/jvm/tool/security/jarsigner>)

# Keytool - Gerenciando Seu Keystore

## Apresentando o Keytool

[keytool](<https://docs.oracle.com/en/java/javase/26/docs/specs/man/keytool.html>) - gerencia um keystore (banco de dados) de chaves criptográficas, cadeias de certificados X.509 e certificados confiáveis

## Sinopse

_comandos_

Os comandos para `keytool` incluem o seguinte:

  * `-certreq`: Gera uma solicitação de certificado
  * `-changealias`: Altera o alias de uma entrada
  * `-delete`: Exclui uma entrada
  * `-exportcert`: Exporta certificado
  * `-genkeypair`: Gera um par de chaves
  * `-genseckey`: Gera uma chave secreta
  * `-gencert`: Gera um certificado a partir de uma solicitação de certificado
  * `-importcert`: Importa um certificado ou uma cadeia de certificados
  * `-importpass`: Importa uma senha
  * `-importkeystore`: Importa uma ou todas as entradas de outro keystore
  * `-keypasswd`: Altera a senha da chave de uma entrada
  * `-list`: Lista entradas em um keystore
  * `-printcert`: Imprime o conteúdo de um certificado
  * `-printcertreq`: Imprime o conteúdo de uma solicitação de certificado
  * `-printcrl`: Imprime o conteúdo de um arquivo de Lista de Revogação de Certificados (CRL)
  * `-storepasswd`: Altera a senha do keystore
  * `-showinfo`: Exibe informações relacionadas à segurança

Consulte Comandos e Opções para uma descrição desses comandos com suas opções.

## Descrição

O comando `keytool` é um utilitário de gerenciamento de chaves e certificados. Ele permite que os usuários administrem seus próprios pares de chaves públicas/privadas e certificados associados para uso em autoautenticação (onde um usuário se autentica para outros usuários e serviços) ou serviços de integridade e autenticação de dados, usando assinaturas digitais. O comando `keytool` também permite que os usuários armazenem em cache as chaves públicas (na forma de certificados) de seus pares de comunicação.

Um certificado é uma declaração digitalmente assinada de uma entidade (pessoa, empresa, e assim por diante), que afirma que a chave pública (e algumas outras informações) de alguma outra entidade tem um valor particular. Quando os dados são assinados digitalmente, a assinatura pode ser verificada para checar a integridade e autenticidade dos dados. Integridade significa que os dados não foram modificados ou adulterados, e autenticidade significa que os dados vêm do indivíduo que afirma tê-los criado e assinado.

O comando `keytool` também permite que os usuários administrem chaves secretas e senhas usadas em criptografia e descriptografia simétricas (Data Encryption Standard). Ele também pode exibir outras informações relacionadas à segurança.

O comando `keytool` armazena as chaves e certificados em um keystore.

O comando `keytool` usa as propriedades de segurança `jdk.certpath.disabledAlgorithms` e `jdk.security.legacyAlgorithms` para determinar quais algoritmos são considerados um risco de segurança. Ele emite avisos quando algoritmos desabilitados ou legados estão sendo usados. As propriedades de segurança `jdk.certpath.disabledAlgorithms` e `jdk.security.legacyAlgorithms` são definidas no arquivo `java.security` (localizado no diretório `$JAVA_HOME/conf/security` do JDK).

## Notas sobre Comandos e Opções

As seguintes notas se aplicam às descrições em Comandos e Opções:

  * Todos os nomes de comandos e opções são precedidos por um sinal de hífen (`-`).
  * Apenas um comando pode ser fornecido.
  * As opções para cada comando podem ser fornecidas em qualquer ordem.
  * Existem dois tipos de opções: uma é de valor único, que deve ser fornecida apenas uma vez. Se uma opção de valor único for fornecida várias vezes, o valor da última é usado. O outro tipo é de múltiplos valores, que pode ser fornecida várias vezes e todos os valores são usados. A única opção de múltiplos valores atualmente suportada é a opção `-ext` usada para gerar extensões de certificado X.509v3.
  * Todos os itens não em itálico ou entre chaves (`{ }`) ou colchetes (`[ ]`) devem aparecer como estão.
  * Chaves envolvendo uma opção significam que um valor padrão é usado quando a opção não é especificada na linha de comando. Chaves também são usadas em torno das opções `-v`, `-rfc` e `-J`, que têm significado apenas quando aparecem na linha de comando. Elas não possuem valores padrão.
  * Colchetes envolvendo uma opção significam que o usuário é solicitado a fornecer os valores quando a opção não é especificada na linha de comando. Para a opção `-keypass`, se você não especificar a opção na linha de comando, o comando `keytool` primeiro tenta usar a senha do keystore para recuperar a chave privada/secreta. Se essa tentativa falhar, o comando `keytool` solicitará a senha da chave privada/secreta.
  * Itens em itálico (valores de opção) representam os valores reais que devem ser fornecidos. Por exemplo, aqui está o formato do comando `-printcert`:

```
keytool -printcert -file _cert_file_
```

Quando você especifica um comando `-printcert`, substitua _cert_file_ pelo nome do arquivo real, como segue: `keytool -printcert -file VScert.cer`

  * Os valores das opções devem ser colocados entre aspas quando contêm um espaço em branco.

## Comandos e Opções

Os comandos `keytool` e suas opções podem ser agrupados pelas tarefas que executam.

Comandos para Criar ou Adicionar Dados ao Keystore:

  * `-gencert`
  * `-genkeypair`
  * `-genseckey`
  * `-importcert`
  * `-importpass`

Comandos para Importar Conteúdos de Outro Keystore:

  * `-importkeystore`

Comandos para Gerar uma Solicitação de Certificado:

  * `-certreq`

Comandos para Exportar Dados:

  * `-exportcert`

Comandos para Exibir Dados:

  * `-list`
  * `-printcert`
  * `-printcertreq`
  * `-printcrl`

Comandos para Gerenciar o Keystore:

  * `-storepasswd`
  * `-keypasswd`
  * `-delete`
  * `-changealias`

Comandos para Exibir Informações Relacionadas à Segurança:

  * `-showinfo`

## Comandos para Criar ou Adicionar Dados ao Keystore

`-gencert`

As seguintes são as opções disponíveis para o comando `-gencert`:

  * `{`-rfc`}: Saída no estilo RFC (Request For Comment)
  * `{`-infile` _infile_}: Nome do arquivo de entrada
  * `{`-outfile` _outfile_}: Nome do arquivo de saída
  * `{`-alias` _alias_}: Nome do alias da entrada a ser processada
  * `{`-sigalg` _sigalg_}: Nome do algoritmo de assinatura
  * `{`-dname` _dname_}: Nome distinto
  * `{`-startdate` _startdate_}: Data e hora de início da validade do certificado
  * `{`-ext` _ext_}*: Extensão X.509
  * `{`-validity` _days_}: Número de dias de validade
  * `-keypass` _arg_ : Senha da chave
  * `{`-keystore` _keystore_}: Nome do keystore
  * `-storepass` _arg_ : Senha do keystore
  * `{`-storetype` _type_}: Tipo de keystore
  * `{`-providername` _name_}: Nome do provedor
  * `{`-addprovider` _name_ `-providerarg` _arg_}: Adiciona um provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional. O valor do provedor de segurança é o nome de um provedor de segurança que é definido em um módulo.

Por exemplo,

```
keytool -gencert -addprovider SunPKCS11 -providerarg /opt/pkcs11.cfg
```

**Nota:**

Por razões de compatibilidade, o provedor SunPKCS11 ainda pode ser carregado com `-providerclass sun.security.pkcs11.SunPKCS11` mesmo que agora esteja definido em um módulo. Este é o único módulo incluído no JDK que precisa de uma configuração e, portanto, o mais amplamente usado com a opção `-providerclass`. Para provedores de segurança legados localizados no classpath e carregados por reflection, `-providerclass` ainda deve ser usado.

  * `{`-providerclass` _class_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional.

Por exemplo, se `MyProvider` é um provedor legado carregado via reflection,

```
keytool -gencert -providerclass MyProvider -providerarg "foo bar"
```

  * `{`-providerpath` _list_}: Classpath do provedor
  * `{`-v`}: Saída detalhada
  * `{`-protected`}: Senha fornecida através de um mecanismo protegido

Use o comando `-gencert` para gerar um certificado como resposta a um arquivo de solicitação de certificado (que pode ser criado pelo comando `keytool -certreq`). O comando lê a solicitação de _infile_ ou, se omitido, da entrada padrão, assina-o usando a chave privada do alias e gera o certificado X.509 para _outfile_ ou, se omitido, para a saída padrão. Quando `-rfc` é especificado, o formato de saída é PEM codificado em Base64; caso contrário, um DER binário é criado.

O valor de `-sigalg` especifica o algoritmo que deve ser usado para assinar o certificado. O argumento _startdate_ é a hora e data de início da validade do certificado. O argumento _days_ indica o número de dias pelos quais o certificado deve ser considerado válido.

Quando _dname_ é fornecido, ele é usado como o assunto do certificado gerado. Caso contrário, é usado o da solicitação de certificado.

O valor de `-ext` mostra quais extensões X.509 serão incorporadas no certificado. Leia Opções de Comando Comuns para a gramática de `-ext`.

A opção `-gencert` permite criar cadeias de certificados. O exemplo a seguir cria um certificado, `e1`, que contém três certificados em sua cadeia de certificados.

Os seguintes comandos criam quatro pares de chaves nomeados `ca`, `ca1`, `ca2` e `e1`:

```
keytool -genkeypair -alias ca -dname "CN=ca" -keyalg RSA -keysize 2048 -validity 3650 -keypass changeit -storepass changeit
keytool -genkeypair -alias ca1 -dname "CN=ca1" -keyalg RSA -keysize 2048 -validity 3650 -keypass changeit -storepass changeit
keytool -genkeypair -alias ca2 -dname "CN=ca2" -keyalg RSA -keysize 2048 -validity 3650 -keypass changeit -storepass changeit
keytool -genkeypair -alias e1 -dname "CN=e1" -keyalg RSA -keysize 2048 -validity 3650 -keypass changeit -storepass changeit
```

Os dois comandos a seguir criam uma cadeia de certificados assinados; `ca` assina `ca1` e `ca1` assina `ca2`, todos os quais são autoemitidos:

```
keytool -certreq -alias ca1 -file ca1.csr -keypass changeit -storepass changeit
keytool -gencert -alias ca -infile ca1.csr -outfile ca1.cert -keypass changeit -storepass changeit -validity 3650
keytool -importcert -alias ca1 -file ca1.cert -keypass changeit -storepass changeit -noprompt

keytool -certreq -alias ca2 -file ca2.csr -keypass changeit -storepass changeit
keytool -gencert -alias ca1 -infile ca2.csr -outfile ca2.cert -keypass changeit -storepass changeit -validity 3650
keytool -importcert -alias ca2 -file ca2.cert -keypass changeit -storepass changeit -noprompt
```

O comando a seguir cria o certificado `e1` e o armazena no arquivo `e1.cert`, que é assinado por `ca2`. Como resultado, `e1` deve conter `ca`, `ca1` e `ca2` em sua cadeia de certificados:

```
keytool -certreq -alias e1 -file e1.csr -keypass changeit -storepass changeit
keytool -gencert -alias ca2 -infile e1.csr -outfile e1.cert -keypass changeit -storepass changeit -validity 3650
keytool -importcert -alias e1 -file e1.cert -keypass changeit -storepass changeit -noprompt
```

`-genkeypair`

As seguintes são as opções disponíveis para o comando `-genkeypair`:

  * `{`-alias` _alias_}: Nome do alias da entrada a ser processada
  * `-keyalg` _alg_ : Nome do algoritmo da chave
  * `{`-keysize` _size_}: Tamanho em bits da chave
  * `{`-groupname` _name_}: Nome do grupo. Por exemplo, um nome de Curva Elíptica.
  * `{`-sigalg` _alg_}: Nome do algoritmo de assinatura
  * `-dname` _name_ : Nome distinto
  * `{`-startdate` _date_}: Data e hora de início da validade do certificado
  * `{`-ext` _value_}*: Extensão X.509
  * `{`-validity` _days_}: Número de dias de validade
  * `-keypass` _arg_ : Senha da chave
  * `{`-keystore` _keystore_}: Nome do keystore
  * `-storepass` _arg_ : Senha do keystore
  * `{`-storetype` _type_}: Tipo de keystore
  * `{`-providername` _name_}: Nome do provedor
  * `{`-addprovider` _name_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.
  * `{`-providerclass` _class_ `-providerarg` _arg_ }: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional.
  * `{`-providerpath` _list_}: Classpath do provedor
  * `{`-v`}: Saída detalhada
  * `{`-protected`}: Senha fornecida através de um mecanismo protegido

Use o comando `-genkeypair` para gerar um par de chaves (uma chave pública e uma chave privada associada). Envolve a chave pública em um certificado autoassinado X.509 v3, que é armazenado como uma cadeia de certificados de elemento único. Esta cadeia de certificados e a chave privada são armazenadas em uma nova entrada do keystore que é identificada por seu alias.

O valor de `-keyalg` especifica o algoritmo a ser usado para gerar o par de chaves, e o valor de `-keysize` especifica o tamanho de cada chave a ser gerada. O valor de `-sigalg` especifica o algoritmo que deve ser usado para assinar o certificado autoassinado. Este algoritmo deve ser compatível com o valor de `-keyalg`.

O valor de `-groupname` especifica o grupo nomeado (por exemplo, o nome padrão ou predefinido de uma Curva Elíptica) da chave a ser gerada. Apenas um entre `-groupname` e `-keysize` pode ser especificado.

O valor de `-dname` especifica o Nome Distinto X.500 a ser associado ao valor de `-alias`, e é usado como os campos de emissor e assunto no certificado autoassinado. Se um nome distinto não for fornecido na linha de comando, o usuário será solicitado a fornecê-lo.

O valor de `-keypass` é uma senha usada para proteger a chave privada do par de chaves gerado. Se uma senha não for fornecida, o usuário será solicitado a fornecê-la. Se você pressionar a tecla **Return** no prompt, a senha da chave será definida como a mesma senha do keystore. O valor de `-keypass` deve ter pelo menos seis caracteres.

O valor de `-startdate` especifica a hora de emissão do certificado, também conhecida como o valor "Not Before" do campo Validity do certificado X.509.

O valor da opção pode ser definido em uma destas duas formas:

```
(+-_nnn_ymdHMS)+
```

```
_yyyy_` `/`_mm_` `/`_dd_` `_HH_`:`_MM_`:`_SS_
```

Com a primeira forma, a hora de emissão é deslocada pelo valor especificado a partir da hora atual. O valor é uma concatenação de uma sequência de subvalores. Dentro de cada subvalor, o sinal de mais (+) significa deslocar para frente, e o sinal de menos (-) significa deslocar para trás. O tempo a ser deslocado é _nnn_ unidades de anos, meses, dias, horas, minutos ou segundos (denotados por um único caractere de `y`, `m`, `d`, `H`, `M` ou `S`, respectivamente). O valor exato da hora de emissão é calculado usando o método `java.util.GregorianCalendar.add(int field, int amount)` em cada subvalor, da esquerda para a direita. Por exemplo, a hora de emissão pode ser especificada por:

```
keytool -genkeypair -startdate -10y+3m+2d
```

Com a segunda forma, o usuário define a hora exata de emissão em duas partes, ano/mês/dia e hora:minuto:segundo (usando o fuso horário local). O usuário pode fornecer apenas uma parte, o que significa que a outra parte é a mesma que a data (ou hora) atual. O usuário deve fornecer o número exato de dígitos mostrado na definição do formato (preenchendo com 0 quando mais curto). Quando data e hora são fornecidas, há um (e apenas um) caractere de espaço entre as duas partes. A hora deve ser sempre fornecida no formato de 24 horas.

Quando a opção não é fornecida, a data de início é a hora atual. A opção pode ser fornecida apenas uma vez.

O valor de _date_ especifica o número de dias (começando na data especificada por `-startdate`, ou na data atual quando `-startdate` não é especificado) pelos quais o certificado deve ser considerado válido.

`-genseckey`

As seguintes são as opções disponíveis para o comando `-genseckey`:

  * `{`-alias` _alias_}: Nome do alias da entrada a ser processada
  * `-keypass` _arg_ : Senha da chave
  * `-keyalg` _alg_ : Nome do algoritmo da chave
  * `{`-keysize` _size_}: Tamanho em bits da chave
  * `{`-keystore` _keystore_}: Nome do keystore
  * `-storepass` _arg_ : Senha do keystore
  * `{`-storetype` _type_}: Tipo de keystore
  * `{`-providername` _name_}: Nome do provedor
  * `{`-addprovider` _name_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.
  * `{`-providerclass` _class_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional.
  * `{`-providerpath` _list_}: Classpath do provedor
  * `{`-v`}: Saída detalhada
  * `{`-protected`}: Senha fornecida através de um mecanismo protegido

Use o comando `-genseckey` para gerar uma chave secreta e armazená-la em uma nova `KeyStore.SecretKeyEntry` identificada por `alias`.

O valor de `-keyalg` especifica o algoritmo a ser usado para gerar a chave secreta, e o valor de `-keysize` especifica o tamanho da chave que é gerada. O valor de `-keypass` é uma senha que protege a chave secreta. Se uma senha não for fornecida, o usuário será solicitado a fornecê-la. Se você pressionar a tecla **Return** no prompt, a senha da chave será definida como a mesma senha usada para o `-keystore`. O valor de `-keypass` deve conter pelo menos seis caracteres.

`-importcert`

As seguintes são as opções disponíveis para o comando `-importcert`:

  * `{`-noprompt`}: Não solicitar
  * `{`-trustcacerts`}: Confiar em certificados de cacerts
  * `{`-protected`}: Senha é fornecida através de mecanismo protegido
  * `{`-alias` _alias_}: Nome do alias da entrada a ser processada
  * `{`-file` _file_}: Nome do arquivo de entrada
  * `-keypass` _arg_ : Senha da chave
  * `{`-keystore` _keystore_}: Nome do keystore
  * `{`-cacerts`}: Acessar o keystore cacerts
  * `-storepass` _arg_ : Senha do keystore
  * `{`-storetype` _type_}: Tipo de keystore
  * `{`-providername` _name_}: Nome do provedor
  * `{`-addprovider` _name_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.
  * `{`-providerclass` _class_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional.
  * `{`-providerpath` _list_}: Classpath do provedor
  * `{`-v`}: Saída detalhada

Use o comando `-importcert` para ler o certificado ou cadeia de certificados (onde esta última é fornecida em uma resposta formatada em PKCS#7 ou em uma sequência de certificados X.509) de `-file` _file_, e armazená-lo na entrada do keystore identificada por `-alias`. Se `-file` _file_ não for especificado, o certificado ou cadeia de certificados é lido de `stdin`.

O comando `keytool` pode importar certificados X.509 v1, v2 e v3, e cadeias de certificados formatadas em PKCS#7 consistindo de certificados desse tipo. Os dados a serem importados devem ser fornecidos em formato de codificação binária ou em formato de codificação imprimível (também conhecido como codificação Base64), conforme definido pelo padrão Internet RFC 1421. Neste último caso, a codificação deve ser delimitada no início por uma string que começa com `-----BEGIN`, e delimitada no final por uma string que começa com `-----END`.

Você importa um certificado por duas razões: Para adicioná-lo à lista de certificados confiáveis, e para importar uma resposta de certificado recebida de uma autoridade de certificação (CA) como resultado do envio de uma Solicitação de Assinatura de Certificado (CSR) para essa CA. Consulte o comando `-certreq` em Comandos para Gerar uma Solicitação de Certificado.

O tipo de importação é indicado pelo valor da opção `-alias`. Se o alias não apontar para uma entrada de chave, o comando `keytool` assume que você está adicionando uma entrada de certificado confiável. Neste caso, o alias não deve já existir no keystore. Se o alias já existir, o comando `keytool` gera um erro porque um certificado confiável já existe para esse alias, e não importa o certificado. Se `-alias` apontar para uma entrada de chave, o comando `keytool` assume que você está importando uma resposta de certificado.

`-importpass`

As seguintes são as opções disponíveis para o comando `-importpass`:

  * `{`-alias` _alias_}: Nome do alias da entrada a ser processada
  * `-keypass` _arg_ : Senha da chave
  * `{`-keyalg` _alg_}: Nome do algoritmo da chave
  * `{`-keysize` _size_}: Tamanho em bits da chave
  * `{`-keystore` _keystore_}: Nome do keystore
  * `-storepass` _arg_ : Senha do keystore
  * `{`-storetype` _type_}: Tipo de keystore
  * `{`-providername` _name_}: Nome do provedor
  * `{`-addprovider` _name_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.
  * `{`-providerclass` _class_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional.
  * `{`-providerpath` _list_}: Classpath do provedor
  * `{`-v`}: Saída detalhada
  * `{`-protected`}: Senha fornecida através de um mecanismo protegido

Use o comando `-importpass` para importar uma passphrase e armazená-la em uma nova `KeyStore.SecretKeyEntry` identificada por `-alias`. A passphrase pode ser fornecida via fluxo de entrada padrão; caso contrário, o usuário será solicitado a fornecê-la. A opção `-keypass` fornece uma senha para proteger a passphrase importada. Se uma senha não for fornecida, o usuário será solicitado a fornecê-la. Se você pressionar a tecla **Return** no prompt, a senha da chave será definida como a mesma senha usada para o keystore. O valor de `-keypass` deve conter pelo menos seis caracteres.
## Comandos para Importar Conteúdos de Outro Keystore

`-importkeystore`

As seguintes são as opções disponíveis para o comando `-importkeystore`:

  * `-srckeystore` _keystore_ : Nome do keystore de origem
  * {`-destkeystore` _keystore_}: Nome do keystore de destino
  * {`-srcstoretype` _type_}: Tipo do keystore de origem
  * {`-deststoretype` _type_}: Tipo do keystore de destino
  * `-srcstorepass` _arg_ : Senha do keystore de origem
  * `-deststorepass` _arg_ : Senha do keystore de destino
  * {`-srcprotected`}: Keystore de origem protegido por senha
  * {`-destprotected`}: Keystore de destino protegido por senha
  * {`-srcprovidername` _name_}: Nome do provedor do keystore de origem
  * {`-destprovidername` _name_}: Nome do provedor do keystore de destino
  * {`-srcalias` _alias_}: Alias de origem
  * {`-destalias` _alias_}: Alias de destino
  * `-srckeypass` _arg_ : Senha da chave de origem
  * `-destkeypass` _arg_ : Senha da chave de destino
  * {`-noprompt`}: Não solicitar
  * {`-addprovider` _name_ `-providerarg` _arg_ : Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.
  * {`-providerclass` _class_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional
  * {`-providerpath` _list_}: Classpath do provedor
  * {`-v`}: Saída detalhada

**Nota:**

Esta é a primeira linha de todas as opções:

Use o comando `-importkeystore` para importar uma única entrada ou todas as entradas de um keystore de origem para um keystore de destino.

**Nota:**

Se você não especificar `-destkeystore` ao usar o comando `keytool -importkeystore`, o keystore padrão usado será `$HOME/.keystore`.

Quando a opção `-srcalias` é fornecida, o comando importa a única entrada identificada pelo alias para o keystore de destino. Se um alias de destino não for fornecido com `-destalias`, então `-srcalias` é usado como o alias de destino. Se a entrada de origem estiver protegida por uma senha, então `-srckeypass` é usado para recuperar a entrada. Se `-srckeypass` não for fornecido, o comando `keytool` tenta usar `-srcstorepass` para recuperar a entrada. Se `-srcstorepass` não for fornecido ou estiver incorreto, o usuário é solicitado a inserir uma senha. A entrada de destino é protegida com `-destkeypass`. Se `-destkeypass` não for fornecido, a entrada de destino é protegida com a senha da entrada de origem. Por exemplo, a maioria das ferramentas de terceiros exige que `storepass` e `keypass` em um keystore PKCS #12 sejam os mesmos. Para criar um keystore PKCS#12 para essas ferramentas, sempre especifique um `-destkeypass` que seja o mesmo que `-deststorepass`.

Se a opção `-srcalias` não for fornecida, todas as entradas no keystore de origem são importadas para o keystore de destino. Cada entrada de destino é armazenada sob o alias da entrada de origem. Se a entrada de origem estiver protegida por uma senha, então `-srcstorepass` é usado para recuperar a entrada. Se `-srcstorepass` não for fornecido ou estiver incorreto, o usuário é solicitado a inserir uma senha. Se um tipo de entrada do keystore de origem não for suportado no keystore de destino, ou se ocorrer um erro ao armazenar uma entrada no keystore de destino, o usuário é solicitado a pular a entrada e continuar ou a sair. A entrada de destino é protegida com a senha da entrada de origem.

Se o alias de destino já existir no keystore de destino, o usuário é solicitado a sobrescrever a entrada ou a criar uma nova entrada sob um nome de alias diferente.

Se a opção `-noprompt` for fornecida, o usuário não será solicitado a inserir um novo alias de destino. As entradas existentes são sobrescritas com o nome do alias de destino. As entradas que não podem ser importadas são ignoradas e um aviso é exibido.

## Comandos para Gerar uma Requisição de Certificado

`-certreq`

As seguintes são as opções disponíveis para o comando `-certreq`:

  * {`-alias` _alias_}: Nome do alias da entrada a ser processada
  * {`-sigalg` _alg_}: Nome do algoritmo de assinatura
  * {`-file` _file_}: Nome do arquivo de saída
  * `-keypass` _arg_ : Senha da chave
  * {`-keystore` _keystore_}: Nome do keystore
  * {`-dname` _name_}: Distinguished name
  * {`-ext` _value_}: Extensão X.509
  * `-storepass` _arg_ : Senha do keystore
  * {`-storetype` _type_}: Tipo do keystore
  * {`-providername` _name_}: Nome do provedor
  * {`-addprovider` _name_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.
  * {`-providerclass` _class_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional.
  * {`-providerpath` _list_}: Classpath do provedor
  * {`-v`}: Saída detalhada
  * {`-protected`}: Senha fornecida através de um mecanismo protegido

Use o comando `-certreq` para gerar uma Certificate Signing Request (CSR) usando o formato PKCS #10.

Uma CSR destina-se a ser enviada a uma CA. A CA autentica o solicitante do certificado (geralmente offline) e retorna um certificado ou cadeia de certificados para substituir a cadeia de certificados existente (inicialmente um certificado autoassinado) no keystore.

A chave privada associada a _alias_ é usada para criar a requisição de certificado PKCS #10. Para acessar a chave privada, a senha correta deve ser fornecida. Se `-keypass` não for fornecido na linha de comando e for diferente da senha usada para proteger a integridade do keystore, o usuário será solicitado a inseri-la. Se `-dname` for fornecido, ele será usado como o assunto na CSR. Caso contrário, o X.500 Distinguished Name associado ao alias é usado.

O valor de `-sigalg` especifica o algoritmo que deve ser usado para assinar a CSR.

A CSR é armazenada no `-file` _file_. Se um arquivo não for especificado, a CSR é enviada para `-stdout`.

Use o comando `-importcert` para importar a resposta da CA.

## Comandos para Exportar Dados

`-exportcert`

As seguintes são as opções disponíveis para o comando `-exportcert`:

  * {`-rfc`}: Saída no estilo RFC
  * {`-alias` _alias_}: Nome do alias da entrada a ser processada
  * {`-file` _file_}: Nome do arquivo de saída
  * {`-keystore` _keystore_}: Nome do keystore
  * {`-cacerts`}: Acessa o keystore cacerts
  * `-storepass` _arg_ : Senha do keystore
  * {`-storetype` _type_}: Tipo do keystore
  * {`-providername` _name_}: Nome do provedor
  * {`-addprovider` _name_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.
  * {`-providerclass` _class_ `-providerarg` _arg_ }: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional.
  * {`-providerpath` _list_}: Classpath do provedor
  * {`-v`}: Saída detalhada
  * {`-protected`}: Senha fornecida através de um mecanismo protegido

Use o comando `-exportcert` para ler um certificado do keystore que está associado a `-alias` _alias_ e armazená-lo no `-file` _file_. Quando um arquivo não é especificado, o certificado é enviado para `stdout`.

Por padrão, o certificado é enviado em codificação binária. Se a opção `-rfc` for especificada, a saída será no formato de codificação imprimível definido pelo Internet RFC 1421 Certificate Encoding Standard.

Se `-alias` se refere a um certificado confiável, então esse certificado é enviado. Caso contrário, `-alias` se refere a uma entrada de chave com uma cadeia de certificados associada. Nesse caso, o primeiro certificado na cadeia é retornado. Este certificado autentica a chave pública da entidade endereçada por `-alias`.

## Comandos para Exibir Dados

`-list`

As seguintes são as opções disponíveis para o comando `-list`:

  * {`-rfc`}: Saída no estilo RFC
  * {`-alias` _alias_}: Nome do alias da entrada a ser processada
  * {`-keystore` _keystore_}: Nome do keystore
  * {`-cacerts`}: Acessa o keystore cacerts
  * `-storepass` _arg_ : Senha do keystore
  * {`-storetype` _type_}: Tipo do keystore
  * {`-providername` _name_}: Nome do provedor
  * {`-addprovider` _name_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.
  * {`-providerclass` _class_ `-providerarg` _arg_ }: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional.
  * {`-providerpath` _list_}: Classpath do provedor
  * {`-v`}: Saída detalhada
  * {`-protected`}: Senha fornecida através de um mecanismo protegido

Use o comando `-list` para imprimir o conteúdo da entrada do keystore identificada por `-alias` para `stdout`. Se `-alias` _alias_ não for especificado, o conteúdo de todo o keystore será impresso.

Por padrão, este comando imprime o fingerprint SHA-256 de um certificado. Se a opção `-v` for especificada, o certificado será impresso em formato legível por humanos, com informações adicionais como o owner, issuer, serial number e quaisquer extensions. Se a opção `-rfc` for especificada, o conteúdo do certificado será impresso usando o formato de codificação imprimível, conforme definido pelo Internet RFC 1421 Certificate Encoding Standard.

**Nota:**

Você não pode especificar `-v` e `-rfc` no mesmo comando. Caso contrário, um erro será relatado.

`-printcert`

As seguintes são as opções disponíveis para o comando `-printcert`:

  * {`-rfc`}: Saída no estilo RFC
  * {`-file` _cert_file_}: Nome do arquivo de entrada
  * {`-sslserver` _server_`:`_port_}:: Host e porta do servidor Secure Sockets Layer (SSL)
  * {`-jarfile` _JAR_file_}: Arquivo `.jar` assinado
  * {`-keystore` _keystore_}: Nome do keystore
  * {`-trustcacerts`}: Confia em certificados de cacerts
  * `-storepass` _arg_ : Senha do keystore
  * {`-storetype` _type_}: Tipo do keystore
  * {`-providername` _name_}: Nome do provedor
  * {`-addprovider` _name_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.
  * {`-providerclass` _class_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional.
  * {`-providerpath` _list_}: Classpath do provedor
  * {`-protected`}: A senha é fornecida através de mecanismo protegido
  * {`-v`}: Saída detalhada

Use o comando `-printcert` para ler e imprimir o certificado de `-file` _cert_file_, do servidor SSL localizado em `-sslserver` _server_`:`_port_, ou do arquivo JAR assinado especificado por `-jarfile` _JAR_file_. Ele imprime seu conteúdo em um formato legível por humanos. Quando uma porta não é especificada, a porta HTTPS padrão 443 é assumida.

**Nota:**

As opções `-sslserver` e `-file` não podem ser fornecidas no mesmo comando. Caso contrário, um erro será relatado. Se você não especificar nenhuma das opções, o certificado será lido de `stdin`.

Quando `-rfc` é especificado, o comando `keytool` imprime o certificado no modo PEM conforme definido pelo Internet RFC 1421 Certificate Encoding standard.

Se o certificado for lido de um arquivo ou `stdin`, ele pode estar codificado em binário ou em formato de codificação imprimível, conforme definido pelo RFC 1421 Certificate Encoding standard.

Se o servidor SSL estiver atrás de um firewall, as opções `-J-Dhttps.proxyHost=proxyhost` e `-J-Dhttps.proxyPort=proxyport` podem ser especificadas na linha de comando para proxy tunneling.

**Nota:**

Este comando pode ser usado independentemente de um keystore. Este comando não verifica a fraqueza do algoritmo de assinatura de um certificado se ele for um certificado confiável no keystore do usuário (especificado por `-keystore`) ou no keystore `cacerts` (se `-trustcacerts` for especificado).

`-printcertreq`

As seguintes são as opções disponíveis para o comando `-printcertreq`:

  * {`-file` _file_}: Nome do arquivo de entrada
  * {`-v`}: Saída detalhada

Use o comando `-printcertreq` para imprimir o conteúdo de uma requisição de certificado no formato PKCS #10, que pode ser gerada pelo comando `keytool -certreq`. O comando lê a requisição do arquivo. Se não houver arquivo, a requisição é lida da entrada padrão.

`-printcrl`

As seguintes são as opções disponíveis para o comando `-printcrl`:

  * {`-file crl`}: Nome do arquivo de entrada
  * {`-keystore` _keystore_}: Nome do keystore
  * {`-trustcacerts`}: Confia em certificados de cacerts
  * `-storepass` _arg_ : Senha do keystore
  * {`-storetype` _type_}: Tipo do keystore
  * {`-providername` _name_}: Nome do provedor
  * {`-addprovider` _name_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.
  * {`-providerclass` _class_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional.
  * {`-providerpath` _list_}: Classpath do provedor
  * {`-protected`}: A senha é fornecida através de mecanismo protegido
  * {`-v`}: Saída detalhada

Use o comando `-printcrl` para ler a Certificate Revocation List (CRL) de `-file crl`. Uma CRL é uma lista de certificados digitais que foram revogados pela CA que os emitiu. A CA gera o arquivo `crl`.

**Nota:**

Este comando pode ser usado independentemente de um keystore. Este comando tenta verificar a CRL usando um certificado do keystore do usuário (especificado por `-keystore`) ou do keystore `cacerts` (se `-trustcacerts` for especificado), e imprimirá um aviso se não puder ser verificado.

## Comandos para Gerenciar o Keystore

`-storepasswd`

As seguintes são as opções disponíveis para o comando `-storepasswd`:

  * `-new` _arg_ : Nova senha
  * {`-keystore` _keystore_}: Nome do keystore
  * {`-cacerts`}: Acessa o keystore cacerts
  * `-storepass` _arg_ : Senha do keystore
  * {`-storetype` _type_}: Tipo do keystore
  * {`-providername` _name_}: Nome do provedor
  * {`-addprovider` _name_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.
  * {`-providerclass` _class_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional.
  * {`-providerpath` _list_}: Classpath do provedor
  * {`-v`}: Saída detalhada

Use o comando `-storepasswd` para alterar a senha usada para proteger a integridade do conteúdo do keystore. A nova senha é definida por `-new` _arg_ e deve conter pelo menos seis caracteres.

`-keypasswd`

As seguintes são as opções disponíveis para o comando `-keypasswd`:

  * {`-alias` _alias_}: Nome do alias da entrada a ser processada
  * `-keypass` _old_keypass_ : Senha da chave
  * `-new` _new_keypass_ : Nova senha
  * {`-keystore` _keystore_}: Nome do keystore
  * {`-storepass` _arg_}: Senha do keystore
  * {`-storetype` _type_}: Tipo do keystore
  * {`-providername` _name_}: Nome do provedor
  * {`-addprovider` _name_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.
  * {`-providerclass` _class_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional.
  * {`-providerpath` _list_}: Classpath do provedor
  * {`-v`}: Saída detalhada

Use o comando `-keypasswd` para alterar a senha (sob a qual as chaves privadas/secretas identificadas por `-alias` são protegidas) de `-keypass` _old_keypass_ para `-new` _new_keypass_. O valor da senha deve conter pelo menos seis caracteres.

Se a opção `-keypass` não for fornecida na linha de comando e a senha de `-keypass` for diferente da senha do keystore (`-storepass` _arg_), o usuário será solicitado a inseri-la.

Se a opção `-new` não for fornecida na linha de comando, o usuário será solicitado a inseri-la.

`-delete`

As seguintes são as opções disponíveis para o comando `-delete`:

  * `-alias` _alias_ : Nome do alias da entrada a ser processada
  * {`-keystore` _keystore_}: Nome do keystore
  * {`-cacerts`}: Acessa o keystore cacerts
  * `-storepass` _arg_ : Senha do keystore
  * {`-storetype` _type_}: Tipo do keystore
  * {`-providername` _name_}: Nome do provedor
  * {`-addprovider` _name_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.
  * {`-providerclass` _class_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional.
  * {`-providerpath` _list_}: Classpath do provedor
  * {`-v`}: Saída detalhada
  * {`-protected`}: Senha fornecida através de um mecanismo protegido

Use o comando `-delete` para excluir a entrada `-alias` _alias_ do keystore. Quando não fornecido na linha de comando, o usuário é solicitado a inserir o `alias`.

`-changealias`

As seguintes são as opções disponíveis para o comando `-changealias`:

  * {`-alias` _alias_}: Nome do alias da entrada a ser processada
  * `-destalias` _alias_ : Alias de destino
  * `-keypass` _arg_ : Senha da chave
  * {`-keystore` _keystore_}: Nome do keystore
  * {`-cacerts`}: Acessa o keystore cacerts
  * `-storepass` _arg_ : Senha do keystore
  * {`-storetype` _type_}: Tipo do keystore
  * {`-providername` _name_}: Nome do provedor
  * {`-addprovider` _name_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome (como SunPKCS11) com um argumento de configuração opcional.
  * {`-providerclass` _class_ `-providerarg` _arg_}: Adiciona provedor de segurança por nome de classe totalmente qualificado com um argumento de configuração opcional.
  * {`-providerpath` _list_}: Classpath do provedor
  * {`-v`}: Saída detalhada
  * {`-protected`}: Senha fornecida através de um mecanismo protegido

Use o comando `-changealias` para mover uma entrada de keystore existente de `-alias` _alias_ para um novo `-destalias` _alias_. Se um alias de destino não for fornecido, o comando solicitará um. Se a entrada original estiver protegida com uma senha de entrada, a senha pode ser fornecida com a opção `-keypass`. Se uma senha de chave não for fornecida, o `-storepass` (se fornecido) é tentado primeiro. Se a tentativa falhar, o usuário é solicitado a inserir uma senha.

## Comandos para Exibir Informações Relacionadas à Segurança

`-showinfo`

As seguintes são as opções disponíveis para o comando `-showinfo`:

  * {`-tls`}: Exibe informações de configuração TLS
  * {`-v`}: Saída detalhada

Use o comando `-showinfo` para exibir várias informações relacionadas à segurança. A opção `-tls` exibe configurações TLS, como a lista de protocolos e cipher suites habilitados.
## Comandos para Exibir Informações de Ajuda

Você pode usar `--help` para exibir uma lista de comandos `keytool` ou para exibir informações de ajuda sobre um comando `keytool` específico.

  * Para exibir uma lista de comandos `keytool`, digite:

  * Para exibir informações de ajuda sobre um comando `keytool` específico, digite:

## Opções Comuns de Comando

A opção `-v` pode aparecer para todos os comandos, exceto `--help`. Quando a opção `-v` aparece, ela significa modo verbose, o que significa que mais informações são fornecidas na saída.

O argumento `-J` _option_ pode aparecer para qualquer comando. Quando o `-J` _option_ é usado, a string _option_ especificada é passada diretamente para o interpretador Java. Esta opção não contém espaços. É útil para ajustar o ambiente de execução ou o uso de memória. Para uma lista de possíveis opções do interpretador, digite `java -h` ou `java -X` na linha de comando.

Estas opções podem aparecer para todos os comandos que operam em um keystore:

`-storetype` _storetype_

Este qualificador especifica o tipo de keystore a ser instanciado.

`-keystore` _keystore_

O local do keystore.

Se o `storetype` JKS for usado e um arquivo keystore ainda não existir, então certos comandos `keytool` podem resultar na criação de um novo arquivo keystore. Por exemplo, se `keytool -genkeypair` for chamado e a opção `-keystore` não for especificada, o arquivo keystore padrão chamado `.keystore` é criado no diretório home do usuário, se ele ainda não existir. Da mesma forma, se a opção `-keystore ks_file` for especificada, mas `ks_file` não existir, então ele é criado. Para mais informações sobre o `storetype` JKS, consulte a seção **KeyStore Implementation** em **KeyStore aliases**.

Observe que o input stream da opção `-keystore` é passado para o método `KeyStore.load`. Se `NONE` for especificado como a URL, então um stream nulo é passado para o método `KeyStore.load`. `NONE` deve ser especificado se o keystore não for baseado em arquivo. Por exemplo, quando o keystore reside em um dispositivo de hardware token.

`-cacerts` _cacerts_

Opera no keystore _cacerts_. Esta opção é equivalente a `-keystore` _path_to_cacerts_ `-storetype` _type_of_cacerts_. Um erro é relatado se a opção `-keystore` ou `-storetype` for usada com a opção `-cacerts`.

`-storepass` `:env` | `:file` _argument_

A senha que é usada para proteger a integridade do keystore.

Se o modificador `env` ou `file` não for especificado, então a senha tem o valor _argument_, que deve conter pelo menos seis caracteres. Caso contrário, a senha é recuperada da seguinte forma:

  * `env`: Recupera a senha da variável de ambiente nomeada _argument_.

  * `file`: Recupera a senha do arquivo nomeado _argument_.

**Nota:** Todas as outras opções que exigem senhas, como `-keypass`, `-srckeypass`, `-destkeypass`, `-srcstorepass` e `-deststorepass`, aceitam os modificadores `env` e `file`. Lembre-se de separar a opção de senha e o modificador com dois pontos (:).

A senha deve ser fornecida a todos os comandos que acessam o conteúdo do keystore. Para tais comandos, quando a opção `-storepass` não é fornecida na linha de comando, o usuário é solicitado a inseri-la.

Ao recuperar informações do keystore, a senha é opcional. Se uma senha não for especificada, a integridade das informações recuperadas não poderá ser verificada e um aviso será exibido.

`-providername` _name_

Usado para identificar o nome de um provedor de serviço criptográfico quando listado no arquivo de propriedades de segurança.

`-addprovider` _name_

Usado para adicionar um provedor de segurança por nome (como SunPKCS11).

`-providerclass` _class_

Usado para especificar o nome do arquivo de classe mestre de um provedor de serviço criptográfico quando o provedor de serviço não está listado no arquivo de propriedades de segurança.

`-providerpath` _list_

Usado para especificar o classpath do provedor.

`-providerarg` _arg_

Usado com a opção `-addprovider` ou `-providerclass` para representar um argumento de entrada de string opcional para o construtor do nome da _class_.

`-protected=true`|`false`

Especifique este valor como `true` quando uma senha deve ser especificada por meio de um caminho de autenticação protegido, como um leitor de PIN dedicado. Como há dois keystores envolvidos no comando `-importkeystore`, as duas opções a seguir, `-srcprotected` e `-destprotected`, são fornecidas para o keystore de origem e o keystore de destino, respectivamente.

`-ext` {_name_{`:critical`} {`=`_value_}}

Denota uma extensão de certificado X.509. A opção pode ser usada em `-genkeypair` e `-gencert` para incorporar extensões no certificado gerado, ou em `-certreq` para mostrar quais extensões são solicitadas na requisição de certificado. A opção pode aparecer várias vezes. O argumento _name_ pode ser um nome de extensão suportado (veja Extensões Nomeadas Suportadas) ou um número OID arbitrário. O argumento _value_, quando fornecido, denota o argumento para a extensão. Quando _value_ é omitido, o valor padrão da extensão ou a própria extensão não requer argumento. O modificador `:critical`, quando fornecido, significa que o atributo `isCritical` da extensão é `true`; caso contrário, é `false`. Você pode usar `:c` no lugar de `:critical`.

`-conf` _file_

Especifica um arquivo de opções pré-configurado.

## Arquivo de Opções Pré-configurado

Um arquivo de opções pré-configurado é um arquivo de propriedades Java que pode ser especificado com a opção `-conf`. Cada propriedade representa a(s) opção(ões) padrão para um comando keytool usando "keytool._command_name_" como nome da propriedade. Uma propriedade especial chamada "keytool.all" representa a(s) opção(ões) padrão aplicada(s) a todos os comandos. Um valor de propriedade pode incluir `${prop}`, que será expandido para a system property associada a ele. Se um valor de opção incluir espaços em branco, ele deve ser cercado por aspas (" ou '). Todos os nomes de propriedades devem estar em minúsculas.

Quando o `keytool` é iniciado com um arquivo de opções pré-configurado, o valor para "keytool.all" (se existir) é adicionado ao início da linha de comando do `keytool` primeiro, com o valor para o nome do comando (se existir) vindo em seguida, e as opções existentes na linha de comando por último. Para uma opção de valor único, isso permite que a propriedade para um comando específico sobrescreva o valor de "keytool.all", e o valor especificado na linha de comando sobrescreva ambos. Para opções de múltiplos valores, todas elas serão usadas pelo `keytool`.

Por exemplo, dado o seguinte arquivo chamado `preconfig`:

é idêntico a

é idêntico a

é idêntico a

o que é equivalente a

porque `-keyalg` é uma opção de valor único e o valor `ec` especificado na linha de comando sobrescreve o arquivo de opções pré-configurado.

## Exemplos de Valores de Opções

Os exemplos a seguir mostram os valores padrão para várias opções:

`-alias "mykey"`

`-keysize` `2048` (ao usar `-genkeypair` e `-keyalg` for `RSA`, `DSA` ou `RSASSA-PSS`) `256` (ao usar `-genkeypair` e -keyalg for `EC`) `255` (ao usar `-genkeypair` e -keyalg for `EdDSA`) `56` (ao usar `-genseckey` e -keyalg for `DES`) `168` (ao usar `-genseckey` e -keyalg for `DESede`)

`-validity 90`

`-keystore` &lt;o arquivo chamado .keystore no diretório home do usuário&gt;

`-destkeystore` &lt;o arquivo chamado .keystore no diretório home do usuário&gt;

`-storetype` &lt;o valor da propriedade "keystore.type" no arquivo de propriedades de segurança, que é retornado pelo método estático getDefaultType em java.security.KeyStore&gt;

`-file` `stdin` (se lendo) `stdout` (se escrevendo)

`-protected false`

Ao gerar um certificado ou uma requisição de certificado, o algoritmo de assinatura padrão (opção `-sigalg`) é derivado do algoritmo da chave privada subjacente para fornecer um nível apropriado de força de segurança, como segue:

  * Um algoritmo de assinatura RSASSA-PSS usa um algoritmo `MessageDigest` como seus algoritmos hash e MGF1.

  * EdDSA suporta 2 key sizes: Ed25519 e Ed448. Ao gerar um key pair EdDSA usando `-keyalg EdDSA`, um usuário pode especificar `-keysize 255` ou `-keysize 448` para gerar key pairs Ed25519 ou Ed448. Quando nenhum `-keysize` é especificado, um key pair Ed25519 é gerado. Um usuário também pode especificar diretamente `-keyalg Ed25519` ou `-keyalg Ed448` para gerar um key pair com o key size esperado.

**Nota:**

Para melhorar a segurança "out of the box", o key size padrão e os nomes dos algoritmos de assinatura são periodicamente atualizados para valores mais fortes a cada lançamento do JDK. Se a interoperabilidade com lançamentos mais antigos do JDK for importante, certifique-se de que os padrões sejam suportados por esses lançamentos. Alternativamente, você pode usar as opções `-keysize` ou `-sigalg` para sobrescrever os valores padrão por sua própria conta e risco.

## Extensões Nomeadas Suportadas

O comando `keytool` suporta estas extensões nomeadas. Os nomes não diferenciam maiúsculas de minúsculas.

`BC` ou `BasicContraints`

Valores:

A forma completa é `ca:`{`true`|`false`}`,pathlen:`_len_ ou _len_, que é a abreviação de `ca:true,pathlen:`_len_.

Quando _len_ é omitido, o valor resultante é `ca:true`.

`KU` ou `KeyUsage`

Valores:

_usage_(`,` _usage_)*

_usage_ pode ser um dos seguintes:

  * `digitalSignature`

  * `nonRepudiation` (`contentCommitment`)

  * `keyEncipherment`

  * `dataEncipherment`

  * `keyAgreement`

  * `keyCertSign`

  * `cRLSign`

  * `encipherOnly`

  * `decipherOnly`

Desde que não haja ambiguidade, o argumento _usage_ pode ser abreviado com as primeiras letras (como `dig` para `digitalSignature`) ou no estilo camel-case (como `dS` para `digitalSignature` ou `cRLS` para `cRLSign`). Os valores de _usage_ diferenciam maiúsculas de minúsculas.

`EKU` ou `ExtendedKeyUsage`

Valores:

_usage_(`,` _usage_)*

_usage_ pode ser um dos seguintes:

  * `anyExtendedKeyUsage`

  * `serverAuth`

  * `clientAuth`

  * `codeSigning`

  * `emailProtection`

  * `timeStamping`

  * `OCSPSigning`

  * Qualquer string OID

Desde que não haja ambiguidade, o argumento _usage_ pode ser abreviado com as primeiras letras ou no estilo camel-case. Os valores de _usage_ diferenciam maiúsculas de minúsculas.

`SAN` ou `SubjectAlternativeName`

Valores:

_type_`:`_value_(`,` _type_`:`_value_)*

_type_ pode ser um dos seguintes:

  * `EMAIL`

  * `URI`

  * `DNS`

  * `IP`

  * `OID`

O argumento _value_ é o valor no formato string para o _type_.

`IAN` ou `IssuerAlternativeName`

Valores:

O mesmo que `SAN` ou `SubjectAlternativeName`.

`SIA` ou `SubjectInfoAccess`

Valores:

_method_`:`_location-type_`:`_location-value_(`,` _method_`:`_location-type_`:`_location-value_)*

_method_ pode ser um dos seguintes:

  * `timeStamping`

  * `caRepository`

  * Qualquer OID

Os argumentos _location-type_ e _location-value_ podem ser qualquer _type_`:`_value_ suportado pela extensão `SubjectAlternativeName`.

`AIA` ou `AuthorityInfoAccess`

Valores:

O mesmo que `SIA` ou `SubjectInfoAccess`.

O argumento _method_ pode ser um dos seguintes:

  * `ocsp`

  * `caIssuers`

  * Qualquer OID

Quando _name_ é OID, o valor é a codificação hexadecimal Definite Encoding Rules (DER) de `extnValue` para a extensão, excluindo o tipo OCTET STRING e os bytes de comprimento. Além dos números hexadecimais padrão (0-9, a-f, A-F), quaisquer caracteres extras são ignorados na string HEX. Portanto, tanto 01:02:03:04 quanto 01020304 são aceitos como valores idênticos. Quando não há valor, a extensão tem um campo de valor vazio.

Um nome especial `honored`, usado apenas em `-gencert`, denota como as extensões incluídas na requisição de certificado devem ser honradas. O valor para este nome é uma lista separada por vírgulas de `all` (todas as extensões solicitadas são honradas), _name_{`:`critical`|`non-critical`} (a extensão nomeada é honrada, mas usa um atributo `isCritical` diferente), e `-name` (usado com `all`, denota uma exceção). As extensões solicitadas não são honradas por padrão.

Se, além da opção `-ext honored`, outra opção `-ext` nomeada ou OID for fornecida, esta extensão é adicionada às já honradas. No entanto, se este nome (ou OID) também aparecer no valor honrado, então seu valor e criticality sobrescrevem o da requisição. Se uma extensão do mesmo tipo for fornecida várias vezes através de um nome ou um OID, apenas a última extensão é usada.

A extensão `subjectKeyIdentifier` é sempre criada. Para certificados não autoassinados, o `authorityKeyIdentifier` é criado.

**CUIDADO:**

Os usuários devem estar cientes de que algumas combinações de extensões (e outros campos de certificado) podem não estar em conformidade com o padrão da Internet. Consulte Aviso de Conformidade de Certificado.

## Exemplos de Tarefas na Criação de um keystore

Os exemplos a seguir descrevem a sequência de ações na criação de um keystore para gerenciar pares de chaves públicas/privadas e certificados de entidades confiáveis.

  * Gerando o Key Pair

  * Solicitando um Certificado Assinado de uma CA

  * Importando um Certificado para a CA

  * Importando a Resposta do Certificado da CA

  * Exportando um Certificado que Autentica a Chave Pública

  * Importando o Keystore

  * Gerando Certificados para um Servidor SSL

## Gerando o Key Pair

Crie um keystore e então gere o key pair.

Você pode digitar o comando em uma única linha, como o seguinte:

O comando cria o keystore chamado `mykeystore` no diretório de trabalho (desde que ele ainda não exista), e atribui a ele a senha especificada por `-keypass`. Ele gera um key pair público/privado para a entidade cujo distinguished name é `myname`, `mygroup`, `mycompany`, e um código de país de duas letras de `mycountry`. Ele usa o algoritmo de geração de chave RSA para criar as chaves; ambas têm 2048 bits.

O comando usa o algoritmo de assinatura padrão SHA256withRSA para criar um certificado autoassinado que inclui a chave pública e as informações do distinguished name. O certificado é válido por 180 dias e está associado à chave privada em uma entrada do keystore referenciada por `-alias business`. A chave privada recebe a senha especificada por `-keypass`.

O comando é significativamente mais curto quando os padrões das opções são aceitos. Neste caso, apenas `-keyalg` é necessário, e os padrões são usados para opções não especificadas que possuem valores padrão. Você será solicitado a fornecer quaisquer valores necessários. Você poderia ter o seguinte:

Neste caso, uma entrada de keystore com o alias `mykey` é criada, com um key pair recém-gerado e um certificado válido por 90 dias. Esta entrada é colocada em seu diretório home em um keystore chamado `.keystore`. O `.keystore` é criado se ainda não existir. Você será solicitado a fornecer as informações do distinguished name, a senha do keystore e a senha da chave privada.

**Nota:**

O restante dos exemplos assume que você respondeu aos prompts com valores iguais aos especificados no primeiro comando `-genkeypair`. Por exemplo, um distinguished name de `cn=`_myname_`, ou=`_mygroup_`, o=`_mycompany_`, c=`_mycountry_).

## Solicitando um Certificado Assinado de uma CA

**Nota:**

A geração do key pair criou um certificado autoassinado; no entanto, um certificado é mais propenso a ser confiável por outros quando é assinado por uma CA.

Para obter uma assinatura de CA, complete o seguinte processo:

  1. Gere um CSR:

Isso cria um CSR para a entidade identificada pelo alias padrão `mykey` e coloca a requisição no arquivo chamado `myname.csr`.

  2. Envie `myname.csr` para uma CA, como a DigiCert.

A CA autentica você, o solicitante (geralmente offline), e retorna um certificado, assinado por ela, autenticando sua chave pública. Em alguns casos, a CA retorna uma cadeia de certificados, cada um autenticando a chave pública do signatário do certificado anterior na cadeia.

## Importando um Certificado para a CA

Para importar um certificado para a CA, complete o seguinte processo:

  1. Antes de importar a resposta do certificado de uma CA, você precisa de um ou mais certificados confiáveis, seja em seu keystore ou no arquivo keystore `cacerts`. Consulte `-importcert` em **Comandos**.

     * Se a resposta do certificado for uma cadeia de certificados, então você precisa do certificado superior da cadeia. O certificado root CA que autentica a chave pública da CA.

     * Se a resposta do certificado for um único certificado, então você precisa de um certificado para a CA emissora (aquela que o assinou). Se esse certificado não for autoassinado, então você precisa de um certificado para seu signatário, e assim por diante, até um certificado root CA autoassinado.

  2. Substitua o certificado autoassinado por uma cadeia de certificados, onde cada certificado na cadeia autentica a chave pública do signatário do certificado anterior na cadeia, até uma root CA.

Se você confia que o certificado é válido, então você pode adicioná-lo ao seu keystore digitando o seguinte comando:

Este comando cria uma entrada de certificado confiável no keystore a partir dos dados no arquivo de certificado da CA e atribui os valores do _alias_ à entrada.

## Importando a Resposta do Certificado da CA

Depois de importar um certificado que autentica a chave pública da CA para a qual você enviou sua requisição de assinatura de certificado (ou se já existe tal certificado no arquivo `cacerts`), você pode importar a resposta do certificado e substituir seu certificado autoassinado por uma cadeia de certificados.

A cadeia de certificados é uma das seguintes:

  * Retornada pela CA quando a resposta da CA é uma cadeia.

  * Construída quando a resposta da CA é um único certificado. Esta cadeia de certificados é construída usando a resposta do certificado e certificados confiáveis disponíveis no keystore onde você importa a resposta ou no arquivo keystore `cacerts`.

Por exemplo, se você enviou sua requisição de assinatura de certificado para a DigiCert, então você pode importar a resposta deles digitando o seguinte comando:

**Nota:**

Neste exemplo, o certificado retornado é nomeado `DCmyname.cer`.

## Exportando um Certificado que Autentica a Chave Pública

**Nota:**

Se você usou o comando `jarsigner` para assinar um arquivo Java Archive (JAR), então os clientes que usam o arquivo desejarão autenticar sua assinatura.

Uma maneira pela qual os clientes podem autenticá-lo é importando seu certificado de chave pública para o keystore deles como uma entrada confiável. Você pode então exportar o certificado e fornecê-lo aos seus clientes.

Por exemplo:

  1. Copie seu certificado para um arquivo chamado `myname.cer` digitando o seguinte comando:

**Nota:**

Neste exemplo, a entrada tem um alias de `mykey`.

  2. Com o certificado e o arquivo JAR assinado, um cliente pode usar o comando `jarsigner` para autenticar sua assinatura.
## Importando o Keystore

Use o comando `importkeystore` para importar um keystore inteiro para outro keystore. Isso importa todas as entradas do keystore de origem, incluindo chaves e certificados, para o keystore de destino com um único comando. Você pode usar este comando para importar entradas de um tipo diferente de keystore. Durante a importação, todas as novas entradas no keystore de destino terão os mesmos nomes de alias e senhas de proteção (para chaves secretas e chaves privadas). Se o comando `keytool` não conseguir recuperar as chaves privadas ou chaves secretas do keystore de origem, ele solicitará uma senha. Se detectar duplicação de alias, ele pedirá um novo alias, e você pode especificar um novo alias ou simplesmente permitir que o comando `keytool` sobrescreva o existente.

Por exemplo, importe entradas de um keystore típico do tipo JKS `key.jks` para um keystore baseado em hardware do tipo PKCS #11, digitando o seguinte comando:

O comando `importkeystore` também pode ser usado para importar uma única entrada de um keystore de origem para um keystore de destino. Neste caso, além das opções que você usou no exemplo anterior, você precisa especificar o alias que deseja importar. Com a opção `-srcalias` especificada, você também pode especificar o nome do alias de destino, a senha de proteção para uma chave secreta ou privada e a senha de proteção de destino que você deseja, da seguinte forma:

## Gerando Certificados para um Servidor SSL

A seguir estão os comandos `keytool` usados para gerar pares de chaves e certificados para três entidades:

  * CA Raiz (`root`)

  * CA Intermediária (`ca`)

  * Servidor SSL (`server`)

Certifique-se de armazenar todos os certificados no mesmo keystore.

## Termos

**Keystore**

Um keystore é uma facilidade de armazenamento para chaves criptográficas e certificados.

**Entradas do Keystore**

Keystores podem ter diferentes tipos de entradas. Os dois tipos de entrada mais aplicáveis para o comando `keytool` incluem o seguinte:

Entradas de chave: Cada entrada contém informações de chave criptográfica muito sensíveis, que são armazenadas em um formato protegido para evitar acesso não autorizado. Tipicamente, uma chave armazenada neste tipo de entrada é uma chave secreta, ou uma chave privada acompanhada da cadeia de certificados para a chave pública correspondente. Consulte **Cadeias de Certificados**. O comando `keytool` pode lidar com ambos os tipos de entradas, enquanto a ferramenta `jarsigner` lida apenas com o último tipo de entrada, ou seja, chaves privadas e suas cadeias de certificados associadas.

Entradas de certificado confiável: Cada entrada contém um único certificado de chave pública que pertence a outra parte. A entrada é chamada de certificado confiável porque o proprietário do keystore confia que a chave pública no certificado pertence à identidade identificada pelo `subject` (proprietário) do certificado. O `issuer` do certificado garante isso, assinando o certificado.

**Aliases do Keystore**

Todas as entradas do keystore (entradas de chave e de certificado confiável) são acessadas por meio de aliases únicos.

Um alias é especificado quando você adiciona uma entidade ao keystore com o comando `-genseckey` para gerar uma chave secreta, o comando `-genkeypair` para gerar um par de chaves (chave pública e privada), ou o comando `-importcert` para adicionar um certificado ou cadeia de certificados à lista de certificados confiáveis. Comandos `keytool` subsequentes devem usar este mesmo alias para se referir à entidade.

Por exemplo, você pode usar o alias `duke` para gerar um novo par de chaves pública/privada e envolver a chave pública em um certificado autoassinado com o seguinte comando. Consulte **Cadeias de Certificados**.

Este exemplo especifica uma `passwd` inicial exigida por comandos subsequentes para acessar a chave privada associada ao alias `duke`. Se você quiser alterar a senha da chave privada de Duke mais tarde, use um comando como o seguinte:

Isso muda a `passwd` inicial para `newpasswd`. Uma senha não deve ser especificada em uma linha de comando ou em um script, a menos que seja para fins de teste, ou você esteja em um sistema seguro. Se você não especificar uma opção de senha necessária na linha de comando, será solicitado a fornecê-la.

**Implementação de Keystore**

A classe `KeyStore` fornecida no pacote `java.security` oferece interfaces bem definidas para acessar e modificar as informações em um keystore. É possível que existam múltiplas implementações concretas diferentes, onde cada implementação é para um tipo particular de keystore.

Atualmente, duas ferramentas de linha de comando (`keytool` e `jarsigner`) utilizam implementações de keystore. Como a classe `KeyStore` é `public`, os usuários podem escrever aplicativos de segurança adicionais que a utilizam.

No JDK 9 e posterior, a implementação padrão de keystore é `PKCS12`. Este é um keystore multiplataforma baseado no Padrão de Sintaxe de Troca de Informações Pessoais RSA PKCS12. Este padrão destina-se principalmente a armazenar ou transportar chaves privadas, certificados e segredos diversos de um usuário. Existe outra implementação integrada, fornecida pela Oracle. Ela implementa o keystore como um arquivo com um tipo de keystore (formato) proprietário chamado `JKS`. Ele protege cada chave privada com sua senha individual e também protege a integridade de todo o keystore com uma senha (possivelmente diferente).

As implementações de keystore são baseadas em provedores. Mais especificamente, as interfaces de aplicativo fornecidas por `KeyStore` são implementadas em termos de uma Service Provider Interface (SPI). Ou seja, existe uma classe abstrata `KeystoreSpi` correspondente, também no pacote `java.security`, que define os métodos da Service Provider Interface que os provedores devem implementar. O termo _provedor_ refere-se a um pacote ou um conjunto de pacotes que fornecem uma implementação concreta de um subconjunto de serviços que podem ser acessados pela Java Security API. Para fornecer uma implementação de keystore, os clientes devem implementar um provedor e fornecer uma implementação de subclasse `KeystoreSpi`, conforme descrito em Steps to Implement and Integrate a Provider.

Os aplicativos podem escolher diferentes tipos de implementações de keystore de diferentes provedores, usando o método de fábrica `getInstance` fornecido na classe `KeyStore`. Um tipo de keystore define o armazenamento e o formato de dados das informações do keystore, e os algoritmos usados para proteger chaves privadas/secretas no keystore e a integridade do keystore. Implementações de keystore de diferentes tipos não são compatíveis.

O comando `keytool` funciona em qualquer implementação de keystore baseada em arquivo. Ele trata o local do keystore que é passado a ele na linha de comando como um nome de arquivo e o converte em um `FileInputStream`, do qual ele carrega as informações do keystore. Os comandos `jarsigner` podem ler um keystore de qualquer local que possa ser especificado com uma URL.

Para `keytool` e `jarsigner`, você pode especificar um tipo de keystore na linha de comando, com a opção `-storetype`.

Se você não especificar explicitamente um tipo de keystore, as ferramentas escolherão uma implementação de keystore com base no valor da propriedade `keystore.type` especificada no arquivo de propriedades de segurança. O arquivo de propriedades de segurança é chamado `java.security` e reside no diretório de propriedades de segurança:

  * **Linux e macOS:** `java.home/lib/security`
  * **Windows:** `java.home\lib\security`

Cada ferramenta obtém o valor `keystore.type` e, em seguida, examina todos os provedores atualmente instalados até encontrar um que implemente um keystore desse tipo. Em seguida, ela usa a implementação de keystore desse provedor. A classe `KeyStore` define um método estático chamado `getDefaultType` que permite que os aplicativos recuperem o valor da propriedade `keystore.type`. A seguinte linha de código cria uma instância do tipo de keystore padrão conforme especificado na propriedade `keystore.type`:

O tipo de keystore padrão é `pkcs12`, que é um keystore multiplataforma baseado no Padrão de Sintaxe de Troca de Informações Pessoais RSA PKCS12. Isso é especificado pela seguinte linha no arquivo de propriedades de segurança:

Para que as ferramentas utilizem uma implementação de keystore diferente da padrão, você pode alterar essa linha para especificar um tipo de keystore diferente. Por exemplo, se você quiser usar a implementação de keystore `jks` da Oracle, altere a linha para o seguinte:

**Nota:**

O uso de maiúsculas e minúsculas não importa nas designações de tipo de keystore. Por exemplo, `JKS` seria considerado o mesmo que `jks`.

**Certificado**

Um certificado (ou certificado de chave pública) é uma declaração assinada digitalmente de uma entidade (o `issuer`), dizendo que a chave pública e algumas outras informações de outra entidade (o `subject`) têm um valor específico. Os seguintes termos estão relacionados a certificados:

  * Chaves Públicas: São números associados a uma entidade particular e destinam-se a ser conhecidos por todos que precisam ter interações confiáveis com essa entidade. As chaves públicas são usadas para verificar assinaturas.

  * Assinado Digitalmente: Se alguns dados são assinados digitalmente, eles são armazenados com a identidade de uma entidade e uma assinatura que prova que essa entidade conhece os dados. Os dados são tornados inalteráveis pela assinatura com a chave privada da entidade.

  * Identidade: Uma forma conhecida de endereçar uma entidade. Em alguns sistemas, a identidade é a chave pública, e em outros pode ser qualquer coisa, como um endereço de e-mail para um distinguished name X.509.

  * Assinatura: Uma assinatura é calculada sobre alguns dados usando a chave privada de uma entidade. O `signer`, que no caso de um certificado também é conhecido como o `issuer`.

  * Chaves Privadas: São números, cada um dos quais deve ser conhecido apenas pela entidade particular cuja chave privada é (ou seja, deve ser mantido em segredo). Chaves privadas e públicas existem em pares em todos os sistemas de criptografia de chave pública (também referidos como sistemas criptográficos de chave pública). Em um sistema criptográfico de chave pública típico, como DSA, uma chave privada corresponde a exatamente uma chave pública. As chaves privadas são usadas para calcular assinaturas.

  * Entidade: Uma entidade é uma pessoa, organização, programa, computador, empresa, banco ou outra coisa em que você confia em algum grau.

A criptografia de chave pública requer acesso às chaves públicas dos usuários. Em um ambiente de rede em larga escala, é impossível garantir que relacionamentos anteriores entre entidades comunicantes foram estabelecidos ou que existe um repositório confiável com todas as chaves públicas usadas. Os certificados foram inventados como uma solução para este problema de distribuição de chave pública. Agora, uma Certification Authority (CA) pode atuar como um terceiro confiável. CAs são entidades como empresas que são confiáveis para assinar (emitir) certificados para outras entidades. Assume-se que as CAs apenas criam certificados válidos e confiáveis porque estão vinculadas por acordos legais. Existem muitas Certification Authorities públicas, como DigiCert, Comodo, Entrust, e assim por diante.

Você também pode operar sua própria Certification Authority usando produtos como Microsoft Certificate Server ou o produto Entrust CA para sua organização. Com o comando `keytool`, é possível exibir, importar e exportar certificados. Também é possível gerar certificados autoassinados.

O comando `keytool` atualmente lida com certificados X.509.

**Certificados X.509**

O padrão X.509 define quais informações podem ser incluídas em um certificado e descreve como escrevê-las (o formato dos dados). Todos os dados em um certificado são codificados com dois padrões relacionados chamados ASN.1/DER. Abstract Syntax Notation 1 descreve dados. As Definite Encoding Rules descrevem uma única maneira de armazenar e transferir esses dados.

Todos os certificados X.509 possuem os seguintes dados, além da assinatura:

  * Versão: Isso identifica qual versão do padrão X.509 se aplica a este certificado, o que afeta quais informações podem ser especificadas nele. Até agora, três versões são definidas. O comando `keytool` pode importar e exportar certificados v1, v2 e v3. Ele gera certificados v3.

    * A Versão 1 do X.509 está disponível desde 1988, é amplamente implantada e é a mais genérica.

    * A Versão 2 do X.509 introduziu o conceito de identificadores únicos de `subject` e `issuer` para lidar com a possibilidade de reutilização de nomes de `subject` ou `issuer` ao longo do tempo. A maioria dos documentos de perfil de certificado recomenda fortemente que os nomes não sejam reutilizados e que os certificados não utilizem identificadores únicos. Os certificados da Versão 2 não são amplamente utilizados.

    * A Versão 3 do X.509 é a mais recente (1996) e suporta a noção de extensões onde qualquer pessoa pode definir uma extensão e incluí-la no certificado. Algumas extensões comuns são: KeyUsage (limita o uso das chaves para propósitos específicos, como `signing-only`) e AlternativeNames (permite que outras identidades também sejam associadas a esta chave pública, por exemplo, nomes DNS, endereços de e-mail, endereços IP). As extensões podem ser marcadas como críticas para indicar que a extensão deve ser verificada e aplicada ou usada. Por exemplo, se um certificado tiver a extensão KeyUsage marcada como crítica e definida como `keyCertSign`, então, quando este certificado for apresentado durante a comunicação SSL, ele deverá ser rejeitado porque a extensão do certificado indica que a chave privada associada deve ser usada apenas para assinar certificados e não para uso SSL.

  * Número de série: A entidade que criou o certificado é responsável por atribuir-lhe um número de série para distingui-lo de outros certificados que ela emite. Esta informação é usada de várias maneiras. Por exemplo, quando um certificado é revogado, seu número de série é colocado em uma Certificate Revocation List (CRL).

  * Identificador do algoritmo de assinatura: Isso identifica o algoritmo usado pela CA para assinar o certificado.

  * Nome do `issuer`: O X.500 Distinguished Name da entidade que assinou o certificado. Geralmente, esta é uma CA. Usar este certificado implica confiar na entidade que o assinou. Em alguns casos, como certificados de CA raiz ou de nível superior, o `issuer` assina seu próprio certificado.

  * Período de validade: Cada certificado é válido apenas por um tempo limitado. Este período é descrito por uma data e hora de início e uma data e hora de término, e pode ser tão curto quanto alguns segundos ou quase tão longo quanto um século. O período de validade escolhido depende de vários fatores, como a força da chave privada usada para assinar o certificado, ou o valor que se está disposto a pagar por um certificado. Este é o período esperado em que as entidades podem confiar no valor público, quando a chave privada associada não foi comprometida.

  * Nome do `subject`: O nome da entidade cuja chave pública o certificado identifica. Este nome usa o padrão X.500, portanto, destina-se a ser único em toda a Internet. Este é o X.500 Distinguished Name (DN) da entidade. Por exemplo,

Estes se referem ao nome comum (`CN`), unidade organizacional (`OU`), organização (`O`) e país (`C`) do `subject`.

  * Informações da chave pública do `subject`: Esta é a chave pública da entidade nomeada com um identificador de algoritmo que especifica a qual sistema criptográfico de chave pública esta chave pertence e quaisquer parâmetros de chave associados.

**Cadeias de Certificados**

O comando `keytool` pode criar e gerenciar entradas de chave de keystore que contêm uma chave privada e uma cadeia de certificados associada. O primeiro certificado na cadeia contém a chave pública que corresponde à chave privada.

Quando as chaves são geradas pela primeira vez, a cadeia começa contendo um único elemento, um certificado autoassinado. Consulte -genkeypair em **Comandos**. Um certificado autoassinado é aquele para o qual o `issuer` (`signer`) é o mesmo que o `subject`. O `subject` é a entidade cuja chave pública está sendo autenticada pelo certificado. Sempre que o comando `-genkeypair` é chamado para gerar um novo par de chaves pública/privada, ele também envolve a chave pública em um certificado autoassinado.

Mais tarde, depois que uma Certificate Signing Request (CSR) foi gerada com o comando `-certreq` e enviada a uma Certification Authority (CA), a resposta da CA é importada com `-importcert`, e o certificado autoassinado é substituído por uma cadeia de certificados. Na parte inferior da cadeia está o certificado (resposta) emitido pela CA autenticando a chave pública do `subject`. O próximo certificado na cadeia é um que autentica a chave pública da CA.

Em muitos casos, este é um certificado autoassinado, que é um certificado da CA autenticando sua própria chave pública, e o último certificado na cadeia. Em outros casos, a CA pode retornar uma cadeia de certificados. Neste caso, o certificado inferior na cadeia é o mesmo (um certificado assinado pela CA, autenticando a chave pública da entrada de chave), mas o segundo certificado na cadeia é um certificado assinado por uma CA diferente que autentica a chave pública da CA para a qual você enviou o CSR. O próximo certificado na cadeia é um certificado que autentica a chave da segunda CA, e assim por diante, até que um certificado raiz autoassinado seja alcançado. Cada certificado na cadeia (após o primeiro) autentica a chave pública do `signer` do certificado anterior na cadeia.

Muitas CAs retornam apenas o certificado emitido, sem cadeia de suporte, especialmente quando há uma hierarquia plana (sem CAs intermediárias). Neste caso, a cadeia de certificados deve ser estabelecida a partir de informações de certificado confiáveis já armazenadas no keystore.

Um formato de resposta diferente (definido pelo padrão PKCS #7) inclui a cadeia de certificados de suporte além do certificado emitido. Ambos os formatos de resposta podem ser tratados pelo comando `keytool`.

O certificado da CA de nível superior (raiz) é autoassinado. No entanto, a confiança na chave pública da raiz não vem do próprio certificado raiz, mas de outras fontes, como um jornal. Isso ocorre porque qualquer pessoa poderia gerar um certificado autoassinado com o distinguished name de, por exemplo, a CA raiz DigiCert. A chave pública da CA raiz é amplamente conhecida. A única razão pela qual ela é armazenada em um certificado é porque este é o formato compreendido pela maioria das ferramentas, então o certificado, neste caso, é usado apenas como um veículo para transportar a chave pública da CA raiz. Antes de adicionar o certificado da CA raiz ao seu keystore, você deve visualizá-lo com a opção `-printcert` e comparar o `fingerprint` exibido com o `fingerprint` conhecido obtido de um jornal, da página da Web da CA raiz, e assim por diante.

**Arquivo de Certificados `cacerts`

Um arquivo de certificados chamado `cacerts` reside no diretório de propriedades de segurança:

  * **Linux e macOS:** `$JAVA_HOME/lib/security`
  * **Windows:** `$JAVA_HOME\lib\security`

O arquivo `cacerts` representa um keystore de todo o sistema com certificados de CA. Os administradores de sistema podem configurar e gerenciar esse arquivo com o comando `keytool` especificando `jks` como o tipo de keystore. O arquivo de keystore `cacerts` vem com um conjunto padrão de certificados de CA raiz. Para Linux, OS X e Windows, você pode listar os certificados padrão com o seguinte comando:

A senha inicial do arquivo de keystore `cacerts` é `changeit`. Os administradores de sistema devem alterar essa senha e a permissão de acesso padrão desse arquivo ao instalar o SDK.

**Nota:**

É importante verificar seu arquivo `cacerts`. Como você confia nas CAs no arquivo `cacerts` como entidades para assinar e emitir certificados para outras entidades, você deve gerenciar o arquivo `cacerts` com cuidado. O arquivo `cacerts` deve conter apenas certificados das CAs em que você confia. É sua responsabilidade verificar os certificados de CA raiz confiáveis incluídos no arquivo `cacerts` e tomar suas próprias decisões de confiança.

Para remover um certificado de CA não confiável do arquivo `cacerts`, use a opção `-delete` do comando `keytool`. Você pode encontrar o arquivo `cacerts` no diretório `$JAVA_HOME/lib/security` do JDK. Entre em contato com o administrador do sistema se você não tiver permissão para editar este arquivo.

Padrão de Codificação de Certificados Internet RFC 1421

Os certificados são frequentemente armazenados usando o formato de codificação imprimível definido pelo padrão Internet RFC 1421, em vez de sua codificação binária. Este formato de certificado, também conhecido como codificação Base64, facilita a exportação de certificados para outros aplicativos por e-mail ou por algum outro mecanismo.

Os certificados lidos pelos comandos `-importcert` e `-printcert` podem estar neste formato ou codificados em binário. O comando `-exportcert` por padrão gera um certificado em codificação binária, mas, em vez disso, gerará um certificado no formato de codificação imprimível, quando a opção `-rfc` for especificada.

O comando `-list` por padrão imprime o `fingerprint` SHA-256 de um certificado. Se a opção `-v` for especificada, o certificado é impresso em formato legível por humanos. Se a opção `-rfc` for especificada, o certificado é gerado no formato de codificação imprimível.

Em seu formato de codificação imprimível, o certificado codificado é delimitado no início e no fim pelo seguinte texto:

X.500 Distinguished Names

X.500 Distinguished Names são usados para identificar entidades, como aquelas nomeadas pelos campos `subject` e `issuer` (`signer`) de certificados X.509. O comando `keytool` suporta as seguintes subpartes:

  * commonName: O nome comum de uma pessoa, como Susan Jones.

  * organizationUnit: O nome da pequena organização (como departamento ou divisão). Por exemplo, Compras.

  * localityName: O nome da localidade (cidade), por exemplo, Palo Alto.

  * stateName: Nome do estado ou província, por exemplo, Califórnia.

  * country: Código de país de duas letras, por exemplo, CH.

Quando você fornece uma string de distinguished name como valor de uma opção `-dname`, como para o comando `-genkeypair`, a string deve estar no seguinte formato:

Todos os itens a seguir representam valores reais e as palavras-chave anteriores são abreviações para o seguinte:

Uma string de distinguished name de exemplo é:

Um comando de exemplo usando tal string é:

O uso de maiúsculas e minúsculas não importa para as abreviações das palavras-chave. Por exemplo, CN, cn e Cn são todos tratados da mesma forma.

A ordem importa; cada subcomponente deve aparecer na ordem designada. No entanto, não é necessário ter todos os subcomponentes. Você pode usar um subconjunto, por exemplo:

Se um valor de string de distinguished name contiver uma vírgula, a vírgula deve ser escapada por um caractere de barra invertida (\\) ao especificar a string na linha de comando, como em:

Nunca é necessário especificar uma string de distinguished name na linha de comando. Quando o distinguished name é necessário para um comando, mas não é fornecido na linha de comando, o usuário é solicitado para cada um dos subcomponentes. Neste caso, uma vírgula não precisa ser escapada por uma barra invertida (\\).
## Avisos

### Aviso de Importação de Certificados Confiáveis

**Importante**: Certifique-se de verificar um certificado com muito cuidado antes de importá-lo como um certificado confiável.

**Exemplo no Windows:**

Visualize o certificado primeiro com o comando `-printcert` ou o comando `-importcert` sem a opção `-noprompt`. Certifique-se de que as impressões digitais do certificado exibido correspondam às esperadas. Por exemplo, suponha que alguém lhe envie um certificado por e-mail e você o coloque em um arquivo chamado `\tmp\cert`. Antes de considerar adicionar o certificado à sua lista de certificados confiáveis, você pode executar um comando `-printcert` para visualizar suas impressões digitais, como segue:

**Exemplo no Linux:**

Visualize o certificado primeiro com o comando `-printcert` ou o comando `-importcert` sem a opção `-noprompt`. Certifique-se de que as impressões digitais do certificado exibido correspondam às esperadas. Por exemplo, suponha que alguém lhe envie um certificado por e-mail e você o coloque em um arquivo chamado `/tmp/cert`. Antes de considerar adicionar o certificado à sua lista de certificados confiáveis, você pode executar um comando `-printcert` para visualizar suas impressões digitais, como segue:

Em seguida, ligue ou entre em contato com a pessoa que enviou o certificado e compare as impressões digitais que você vê com as que ela mostra. Somente quando as impressões digitais são iguais é garantido que o certificado não foi substituído em trânsito pelo certificado de outra pessoa, como o certificado de um atacante. Se tal ataque ocorresse e você não verificasse o certificado antes de importá-lo, você estaria confiando em qualquer coisa que o atacante assinasse, por exemplo, um arquivo JAR com arquivos de classe maliciosos dentro.

**Nota:**

Não é obrigatório executar um comando `-printcert` antes de importar um certificado. Isso ocorre porque, antes de adicionar um certificado à lista de certificados confiáveis no keystore, o comando `-importcert` imprime as informações do certificado e solicita que você as verifique. Você pode então interromper a operação de importação. No entanto, você só pode fazer isso quando chama o comando `-importcert` sem a opção `-noprompt`. Se a opção `-noprompt` for especificada, não haverá interação com o usuário.

### Aviso de Senhas

A maioria dos comandos que operam em um keystore requer a senha do repositório. Alguns comandos exigem uma senha de chave privada/secreta. As senhas podem ser especificadas na linha de comando nas opções `-storepass` e `-keypass`. No entanto, uma senha não deve ser especificada na linha de comando ou em um script, a menos que seja para testes ou que você esteja em um sistema seguro. Quando você não especifica uma opção de senha necessária na linha de comando, ela é solicitada.

### Aviso de Conformidade de Certificado

[Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile](<https://tools.ietf.org/rfc/rfc5280.txt>) definiu um perfil para certificados X.509 em conformidade, que inclui quais valores e combinações de valores são válidos para campos e extensões de certificado.

O comando `keytool` não impõe todas essas regras, portanto, pode gerar certificados que não estão em conformidade com o padrão, como certificados autoassinados que seriam usados para fins de teste interno. Certificados que não estão em conformidade com o padrão podem ser rejeitados pelo JDK ou outras aplicações. Os usuários devem garantir que fornecem as opções corretas para `-dname`, `-ext`, e assim por diante.

### Importar um Novo Certificado Confiável

Antes de adicionar o certificado ao keystore, o comando `keytool` o verifica tentando construir uma cadeia de confiança desse certificado para um certificado autoassinado (pertencente a uma CA raiz), usando certificados confiáveis que já estão disponíveis no keystore.

Se a opção `-trustcacerts` foi especificada, certificados adicionais são considerados para a cadeia de confiança, ou seja, os certificados em um arquivo chamado `cacerts`.

Se o comando `keytool` falhar em estabelecer um caminho de confiança do certificado a ser importado até um certificado autoassinado (seja do keystore ou do arquivo `cacerts`), as informações do certificado são impressas e o usuário é solicitado a verificá-las comparando as impressões digitais do certificado exibido com as impressões digitais obtidas de alguma outra fonte de informação (confiável), que pode ser o proprietário do certificado. Tenha muito cuidado para garantir que o certificado seja válido antes de importá-lo como um certificado confiável. O usuário tem então a opção de interromper a operação de importação. Se a opção `-noprompt` for especificada, não haverá interação com o usuário.

### Importar uma Resposta de Certificado

Ao importar uma resposta de certificado, a resposta de certificado é validada com certificados confiáveis do keystore e, opcionalmente, os certificados configurados no arquivo `cacerts` do keystore quando a opção `-trustcacerts` é especificada.

Os métodos para determinar se a resposta de certificado é confiável são os seguintes:

  * Se a resposta for um único certificado X.509, o comando `keytool` tenta estabelecer uma cadeia de confiança, começando na resposta de certificado e terminando em um certificado autoassinado (pertencente a uma CA raiz). A resposta de certificado e a hierarquia de certificados são usadas para autenticar a resposta de certificado da nova cadeia de certificados de aliases. Se uma cadeia de confiança não puder ser estabelecida, a resposta de certificado não será importada. Neste caso, o comando `keytool` não imprime o certificado e não solicita ao usuário que o verifique, porque é muito difícil para um usuário determinar a autenticidade da resposta de certificado.

  * Se a resposta for uma cadeia de certificados formatada em PKCS #7 ou uma sequência de certificados X.509, a cadeia é ordenada com o certificado do usuário primeiro, seguido por zero ou mais certificados CA. Se a cadeia terminar com um certificado CA raiz autoassinado e a opção `-trustcacerts` foi especificada, o comando `keytool` tenta combiná-lo com qualquer um dos certificados confiáveis no keystore ou no arquivo `cacerts` do keystore. Se a cadeia não terminar com um certificado CA raiz autoassinado e a opção `-trustcacerts` foi especificada, o comando `keytool` tenta encontrar um entre os certificados confiáveis no keystore ou no arquivo `cacerts` do keystore e adicioná-lo ao final da cadeia. Se o certificado não for encontrado e a opção `-noprompt` não for especificada, as informações do último certificado na cadeia são impressas e o usuário é solicitado a verificá-lo.

Se a chave pública na resposta de certificado corresponder à chave pública do usuário já armazenada com `alias`, a antiga cadeia de certificados é substituída pela nova cadeia de certificados na resposta. A cadeia antiga só pode ser substituída com um `keypass` válido, e assim a senha usada para proteger a chave privada da entrada é fornecida. Se nenhuma senha for fornecida e a senha da chave privada for diferente da senha do keystore, o usuário será solicitado a fornecê-la.

Este comando foi nomeado `-import` em versões anteriores. Este nome antigo ainda é suportado nesta versão. O novo nome, `-importcert`, é preferido.

### Neste tutorial

Introdução ao Keytool Sinopse Descrição Notas de Comando e Opção Comandos e Opções Comandos para Criar ou Adicionar Dados ao Keystore Comandos para Importar Conteúdo de Outro Keystore Comandos para Gerar uma Solicitação de Certificado Comandos para Exportar Dados Comandos para Exibir Dados Comandos para Gerenciar o Keystore Comandos para Exibir Informações Relacionadas à Segurança Comandos para Exibir Informações de Ajuda Opções Comuns de Comando Arquivo de Opções Pré-configuradas Exemplos de Valores de Opção Extensões Nomeadas Suportadas Exemplos de Tarefas na Criação de um keystore Gerando o Par de Chaves Solicitando um Certificado Assinado de uma CA Importando um Certificado para a CA Importando a Resposta do Certificado da CA Exportando um Certificado que Autentica a Chave Pública Importando o Keystore Gerando Certificados para um Servidor SSL Termos Avisos

Última atualização: 14 de setembro de 2021

**Tutorial Atual**

Keytool - Gerenciando Seu Keystore

➜

**Próximo na Série**

[Jarsigner - Assinando Seus JARs](<#/doc/tutorials/jvm/tool/security/jarsigner>)

**Próximo na Série:** [Jarsigner - Assinando Seus JARs](<#/doc/tutorials/jvm/tool/security/jarsigner>)

[Início](<#/>) > [Tutoriais](<#/doc/tutorials/learn>) > [ As Ferramentas de Segurança ](<#/doc/tutorials/jvm/tool/security>) > Keytool - Gerenciando Seu Keystore